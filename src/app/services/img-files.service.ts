import { Injectable } from '@angular/core';
import * as R from 'ramda';

declare var deleteSpriteInArray: any;


@Injectable({
    providedIn: 'root'
})
export class ImgFilesService {
    imgsFiles: Array<any> = [];

    constructor() { }
    insertNewSprites(values) {
        this.imgsFiles.push(...values);
    }
    setImages(value) {
        this.imgsFiles = R.clone(value);
    }
    deleteOneSprite(spriteName) {
        this.setImages(deleteSpriteInArray(spriteName, this.getImages()));
    }
    getImages() {
        return this.imgsFiles;
    }
}
