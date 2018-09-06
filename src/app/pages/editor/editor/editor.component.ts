import { Component, OnInit } from '@angular/core';
import { ImgFilesService } from '../../../services/img-files.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  constructor(public imgFilesService: ImgFilesService) { }

  ngOnInit() {
      console.log(this.imgFilesService.getImages());
  }

}
