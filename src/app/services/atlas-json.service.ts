import { Injectable } from '@angular/core';
import { AtlasJsonInterface } from '../interfaces/atlas-json-interface';
import { flatten } from 'ramda';
@Injectable({
    providedIn: 'root'
})
export class AtlasJsonService {
    atlasJson: AtlasJsonInterface;
    atlasPuro: Array<any> = [];
    constructor() { }

    generateAtlas(imageObject) {
        this.atlasPuro = [];
        if (imageObject.length >= 1) {
            imageObject.map((yO, y, arrayY) => {
                this.atlasPuro[y] = [];
                yO.map((xO, x) => {
                    this.atlasPuro[y][x] = {
                        'filename': xO.name,
                        'frame': {
                            'x': (typeof (this.atlasPuro[y][x - 1]) === 'undefined') ?
                                0 :
                                this.atlasPuro[y][x - 1].frame.x + this.atlasPuro[y][x - 1].frame.w,
                            'y': (typeof (this.atlasPuro[y - 1]) === 'undefined') ?
                                0 :
                                this.atlasPuro[y - 1][x].frame.y + this.atlasPuro[y - 1][x].frame.h,
                            'w': xO.width,
                            'h': xO.height
                        },
                        'anchor': {
                            'x': 0.5,
                            'y': 0.5
                        }
                    };
                });
            });

            this.atlasJson = { 'frames': flatten(this.atlasPuro) };
        }
    }

    getAtlas() {
        return this.atlasJson;
    }
}
