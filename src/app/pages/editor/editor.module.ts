import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor/editor.component';
import { FormsModule } from '@angular/forms';
import { WebStorageModule } from 'ngx-store';

@NgModule({
  imports: [
    CommonModule,
    EditorRoutingModule,
    FormsModule,
    WebStorageModule
  ],
  declarations: [EditorComponent]
})
export class EditorModule { }
