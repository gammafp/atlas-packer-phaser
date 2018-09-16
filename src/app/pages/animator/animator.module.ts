import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimatorRoutingModule } from './animator-routing.module';
import { AnimatorComponent } from './animator/animator.component';

import { WebStorageModule } from 'ngx-store';

@NgModule({
    imports: [
        WebStorageModule,
        CommonModule,
        AnimatorRoutingModule
    ],
    declarations: [AnimatorComponent]
})
export class AnimatorModule { }
