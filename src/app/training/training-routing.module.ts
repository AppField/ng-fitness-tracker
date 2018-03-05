import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { AuthGuard } from '../auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TrainingRoutingModule {
}
