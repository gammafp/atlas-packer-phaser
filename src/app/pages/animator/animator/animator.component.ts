import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService, SharedStorage } from 'ngx-store';
import { AnimatordbService } from '../../../services/animatordb.service';
import { map } from 'ramda';

declare var swal: any;
declare var clearString: any;
declare var deleteSpriteInArray: any;

@Component({
    selector: 'app-animator',
    templateUrl: './animator.component.html',
    styleUrls: ['./animator.component.scss']
})
export class AnimatorComponent implements OnInit {
    atlasDB: any;
    imagesFiles: Array<any> = []; // Spritesheet to print
    anims: Array<any> = [];
    actualKey: String = '';

    constructor(public localStorage: LocalStorageService, public animatorService: AnimatordbService, public router: Router) {
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
    }

    addRemoveKey(value) {
        console.log('Se ha clicado con doble click');
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
                        this.anims.push({ key: clearString(result.value) });
                        this.actualKey = result.value;
                    }

                }
            });
        } else if (value === 'remove') {
            this.anims = deleteSpriteInArray(this.actualKey, this.anims);
            this.actualKey = (this.anims[this.anims.length - 1] !== undefined) ? this.anims[this.anims.length - 1].key : '';
            console.log('Animación actual: ', this.anims);
            console.log('última animacion: ', this.actualKey);
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
                            console.log('Entra');
                            x.key = result.value;
                        }
                        return x;
                    }, this.anims);
                    console.log(this.anims);
                    // this.anims.push({ key: clearString(result.value) });
                    this.actualKey = result.value;
                }

            }
        });
    }
    changeActualKey(valueKey) {
        this.actualKey = valueKey;
    }

}
