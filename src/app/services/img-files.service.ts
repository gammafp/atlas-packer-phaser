import { Injectable } from '@angular/core';
import * as R from 'ramda';

declare var deleteSpriteInArray: any;

@Injectable({
    providedIn: 'root'
})
export class ImgFilesService {
    imgsFiles: Array<any> = [];
    spritePerRow: Number = 1;

    constructor() { }
    insertNewSprites(values) {
        this.imgsFiles.push(...values);
    }
    setImages(value, spritesheetRow = 1) {
        this.imgsFiles = R.clone(value);
        this.spritePerRow = spritesheetRow;
    }
    deleteOneSprite(spriteName) {
        this.setImages(deleteSpriteInArray(spriteName, this.getImages()));
    }
    getImages() {
        return this.imgsFiles;
    }
    getSpritesheetRow() {
        return this.spritePerRow;
    }
}
