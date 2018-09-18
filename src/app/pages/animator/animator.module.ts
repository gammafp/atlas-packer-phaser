import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimatorRoutingModule } from './animator-routing.module';
import { AnimatorComponent } from './animator/animator.component';
import { FormsModule } from '@angular/forms';
import { WebStorageModule } from 'ngx-store';

@NgModule({
    imports: [
        WebStorageModule,
        CommonModule,
        AnimatorRoutingModule,
        FormsModule
    ],
    declarations: [AnimatorComponent]
})
export class AnimatorModule { }
