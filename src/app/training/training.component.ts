import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TrainingService } from './training.service';
import 'rxjs/add/operator/takeUntil';
import { Exercise } from './exercise.model';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  private destroy$ = new Subject<boolean>();

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.trainingService.exerciseChange
      .takeUntil(this.destroy$)
      .subscribe((exercise: Exercise) => {
        if (exercise) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }

      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
