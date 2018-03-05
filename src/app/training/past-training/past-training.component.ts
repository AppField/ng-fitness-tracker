import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import 'rxjs/add/operator/takeUntil';
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort;
  @ViewChild(MatPaginator) paginator;
  private destroy$ = new Subject<boolean>();

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.trainingService.finishedExercisesChanged
      .takeUntil(this.destroy$)
      .subscribe((exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      });
    this.trainingService.fetchAllExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
