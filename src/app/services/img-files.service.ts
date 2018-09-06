import { Injectable } from '@angular/core';
import * as R from 'ramda';

@Injectable({
    providedIn: 'root'
})
export class ImgFilesService {
    imgsFiles: Array<any> = [];

    constructor() { }

    setImages(value) {
        this.imgsFiles = R.clone(value);
    }
    getImages() {
        return this.imgsFiles;
    }
}
