import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService, SharedStorage } from 'ngx-store';
import { AnimatordbService } from '../../../services/animatordb.service';
import { map } from 'ramda';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver/FileSaver';

declare var swal: any;
declare var clearString: any;
declare var deleteSpriteInArray: any;
declare var Phaser: any;
declare var b64toBlob: any;
declare var $: any;
declare var html2canvas: any;

@Component({
    selector: 'app-animator',
    templateUrl: './animator.component.html',
    styleUrls: ['./animator.component.scss']
})
export class AnimatorComponent implements OnInit {
    atlasDB: any; // DB de spritesheet
    imagesFiles: Array<any> = []; // Spritesheet to print
    anims: Array<any> = []; // Output keyObject
    actualKey: String = ''; // Actual key selected
    actualFrames: Array<any>; // Actual key selected

    // Controls
    repeatControl: Number = -1;
    frameRateControl: Number = 24; // default 24

    constructor(
        public localStorage: LocalStorageService,
        public animatorService: AnimatordbService,
        public router: Router,
        public elementRef: ElementRef
        ) {
        // Set atlasDB
        if (localStorage.get('atlasDB') != null || animatorService.getAtlas() !== undefined) {
            this.atlasDB = (animatorService.getAtlas() !== undefined) ?
                (localStorage.set('atlasDB', animatorService.getAtlas()), animatorService.getAtlas()) :
                localStorage.get('atlasDB');
            this.imagesFiles = this.atlasDB[0].spritesheet_array;
        } else {
            // Redireccionar al inicio.
            swal({
                title: 'No se ha agregado ningún spritesheet',
                text: 'No se ha agregado ningún spritesheet y atlas, por favor agregalo',
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: '¡Ok!'
            }).then((result) => {
                if (result.value) {
                    this.router.navigate(['/']);
                }
            });

        }
    }

    ngOnInit() {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#1A2226';
        this.phaserCharge();
    }

    phaserCharge() {
        $('#container_phaser canvas').remove();

        const actualKey = this.actualKey;
        const atlas = {
            name: this.atlasDB[0].name,
            spritesheet: URL.createObjectURL(b64toBlob(this.atlasDB[0].spritesheet)),
            atlas: URL.createObjectURL(new Blob([JSON.stringify(this.atlasDB[0].atlas)]))
        };
        const anims = this.anims; // global Anim


        const canvasSize = this.atlasDB[0].spritesheet_array.reduce((prev, act) => {
            return {
                width: (prev.width < act[0].width) ? act[0].width : prev.width,
                height: (prev.height < act[0].height) ? act[0].height : prev.width
            };
        }, { width: 0, height: 0 });
        const configPhaser = {
            width: canvasSize.width,
            height: canvasSize.height,
            // width: 300,
            // height: 200,
            type: Phaser.CANVAS,
            parent: 'container_phaser',
            backgroundColor: '#0984e3',
            pixelArt: true,
            scene: { preload, create }
        };
        let game = new Phaser.Game(configPhaser);
        function preload() {
            this.load.atlas(atlas.name, atlas.spritesheet, atlas.atlas);
        }
        function create() {
            // create anim
            const sprite = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, atlas.name);
            if (anims.length > 0) {
                const animation = anims.filter((x) => x.key === actualKey);
                if (animation[0]['frames'].length > 0) {
                    this.anims.fromJSON({ anims: animation });
                    sprite.play(actualKey);
                }
            }
        }

    }
    addRemoveKey(value) {
        if (value === 'add') {
            swal({
                title: 'Key name',
                input: 'text',
                inputPlaceholder: 'Key name',
            }).then((result) => {
                if (result.value) {
                    if (this.anims.some((x) => x.key === result.value)) {
                        swal({
                            title: 'El key name ya existe',
                            text: 'Ya está en uso ese nombre',
                            type: 'warning',
                            confirmButtonText: 'Ok'
                        });
                    } else {
                        this.anims.push({ key: clearString(result.value), type: 'frames', repeat: -1, frameRate: 12, frames: [] });
                        this.changeActualKey(result.value);
                    }
                }
            });
        } else if (value === 'remove') {
            this.anims = deleteSpriteInArray(this.actualKey, this.anims);
            this.actualKey = (this.anims[this.anims.length - 1] !== undefined) ? this.anims[this.anims.length - 1].key : '';
            this.updateActualFrames();
        }
    }

    changeKeyName(valueKey) {
        swal({
            title: 'Editor del key name',
            input: 'text',
            inputPlaceholder: valueKey,
        }).then((result) => {
            if (result.value) {
                if (this.anims.some((x) => x.key === result.value)) {
                    swal({
                        title: 'El key name ya existe',
                        text: 'Ya está en uso ese nombre',
                        type: 'warning',
                        confirmButtonText: 'Ok'
                    });
                } else {
                    this.anims = map((x) => {
                        if (x.key === valueKey) {
                            x.key = result.value;
                        }
                        return x;
                    }, this.anims);
                    // this.anims.push({ key: clearString(result.value) });
                    this.changeActualKey(result.value);
                }

            }
        });
    }
    changeActualKey(valueKey) {
        this.actualKey = valueKey;
        this.updateActualFrames();
    }
    updateActualFrames() {

        this.actualFrames = this.anims.filter((x) => x.key === this.actualKey)[0].frames;
        this.anims.map((x) => {
            if (x.key === this.actualKey) {
                this.repeatControl = x.repeat;
                this.frameRateControl = x.frameRate;
            }
        });
        this.phaserCharge();
    }

    updateAnimsControls() {
        this.anims = this.anims.map((x) => {
            if (x.key === this.actualKey) {
                x.repeat = this.repeatControl;
                x.frameRate = this.frameRateControl;
            }
            return x;
        });
        this.phaserCharge();
    }

    addSprite(valueSprite) {
        if (this.actualKey !== '' && this.actualKey !== undefined && this.actualKey !== ' ') {
            this.anims = this.anims.map((x) => {
                if (x.key === this.actualKey) {
                    x.frames.push({ key: this.atlasDB[0].name, frame: valueSprite.name, result: valueSprite.result });
                }
                return x;
            });
            this.updateActualFrames();
            this.phaserCharge();
        } else {
            console.log('No has seleccionado el key');
        }
    }
    removeSprite(valueSprite) {
        this.anims = this.anims.map((y) => {
            y.frames = y.frames.filter((x) => {
                return (x.frame !== valueSprite);
            });
            return y;
        });
        this.updateActualFrames();
        this.phaserCharge();
    }
    generateAnim() {
        const zip = new JSZip();
        const nameFiles = clearString(this.atlasDB[0].name);

        // Clear base64 from JSON
        const animationsJSON = this.anims.map((x) =>
            (x.frames = x.frames.map((y) => (delete y.result, y)),
            x)
        );

        // // JSON export
        const dataStr = JSON.stringify(this.atlasDB[0].atlas, null, '    ');
        const animStr = JSON.stringify({anims: animationsJSON}, null, '    ');

        console.log(this.anims);

        zip.file(`${nameFiles}_atlas.json`, dataStr);
        zip.file(`${nameFiles}_anim.json`, animStr);
        //     // Generate zip
        zip.file(`${nameFiles}.png`, this.atlasDB[0].spritesheet.replace('data:image/png;base64,', ''), { base64: true });
        zip.generateAsync({ type: 'blob' })
            .then(function (content) {
                saveAs(content, `PP3.zip`);
            });
        //     // End generate zip
    }

}
