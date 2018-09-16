import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimatorComponent } from './animator/animator.component';

const routes: Routes = [{
    path: '',
    component: AnimatorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimatorRoutingModule { }
