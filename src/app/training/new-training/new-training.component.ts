import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  exercises: Exercise[];

  constructor(public trainingService: TrainingService) {
  }

  ngOnInit() {
    this.trainingService.exercisesChange
      .takeUntil(this.destroy$)
      .subscribe((exercises: Exercise[]) => this.exercises = exercises);

    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value['exercise']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
