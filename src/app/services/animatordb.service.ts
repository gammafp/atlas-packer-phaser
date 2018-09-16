import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AnimatordbService {
    atlas: any;
    constructor() { }

    setAtlas(value) {
        this.atlas = value;
    }
    getAtlas() {
        return this.atlas;
    }

}
