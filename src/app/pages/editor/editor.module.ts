import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor/editor.component';

@NgModule({
  imports: [
    CommonModule,
    EditorRoutingModule
  ],
  declarations: [EditorComponent]
})
export class EditorModule { }
