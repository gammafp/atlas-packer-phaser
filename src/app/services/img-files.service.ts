import { Injectable } from '@angular/core';
import * as R from 'ramda';

@Injectable({
    providedIn: 'root'
})
export class ImgFilesService {
    imgsFiles: Array<any> = [];

    constructor() { }
    insertNewSprites(values) {
        this.imgsFiles.push(...values);
        console.log('agregar más sprites SERVICIO');
    }
    setImages(value) {
        this.imgsFiles = R.clone(value);
    }
    getImages() {
        return this.imgsFiles;
    }
}
