import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class TrainingService {
  exerciseChange = new Subject<Exercise>();
  exercisesChange = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;

  constructor(private db: AngularFirestore) {
  }

  fetchAvailableExercises(): void {
    this.db
      .collection('availableExercises')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          } as Exercise;
        });
      })
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChange.next([...this.availableExercises]);
      });
  }

  startExercise(id: string): void {
    this.runningExercise = this.availableExercises.find((exercise: Exercise) => exercise.id === id);
    this.exerciseChange.next({ ...this.runningExercise } as Exercise);
  }

  completeExercise(): void {
    this.addDataToFirebase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  cancelExercise(progress: number): void {
    this.addDataToFirebase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  getRunningExercise(): Exercise {
    return { ...this.runningExercise };
  }

  fetchAllExercises(): void {
    this.db.collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises);
      });
  }

  private addDataToFirebase(exercise: Exercise): void {
    this.db.collection('finishedExercises').add(exercise);
  }

}
