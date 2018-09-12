import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImgFilesService } from '../../../services/img-files.service';
import { flatten } from 'ramda';

declare var readMultipleFiles: any;
declare var swal: any;
declare var $: any;
declare var _$: any;
declare var NacatamalON: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    outputFiles: Array<any> = [];

    // Spritesheet cut
    nameSpriteSheet: String = '';
    printSpriteSheet: String = '';

    spriteSheetWidth: any = 16;
    spriteSheetHeight: any = 16;

    cutterLines: Array<any>;

    canvasSize: any;

    // Motor nacatamalon
    nc: any;

    constructor(private router: Router, public imgFilesService: ImgFilesService) {
        this.nc = new NacatamalON();
        this.canvasSize = {
            width: 0,
            height: 0
        };
    }

    uploadFilesMulti(files) {
        const Files = Array.from(files.target.files);

        Files.map(async (x, i) => {
            const resultado = await readMultipleFiles(x);
            this.outputFiles.push(resultado);
            if (Files.length - 1 === i) {
                this.filesCharged();
            }
        });
    }

    // Spritesheet tool
    async uploadSpritesheet(files) {
        const spriteSheet = await readMultipleFiles(files.target.files[0]);
        this.printSpriteSheet = spriteSheet.result;
        this.nameSpriteSheet = spriteSheet.name;

        this.changeSizeGridCut();

        $('#modalSpriteSheet').modal('show');
    }

    // Update grid
    changeSizeGridCut() {
        const sizeImage = this.nc.getSizeImage(this.printSpriteSheet);

        const width = new Array(Math.floor(sizeImage.x / this.spriteSheetWidth)).fill(0);
        const height = new Array(Math.floor(sizeImage.y / this.spriteSheetHeight)).fill(0);

        this.cutterLines = height.map(() =>
            width.map(() => []));

        this.canvasSize.width = sizeImage.x;
        this.canvasSize.height = sizeImage.y;
    }
    // Cut images
    cutSpritesheet() {
        const cutSprite = this.nc.cutSpriteSheet(this.nameSpriteSheet);
        const cutSpriteOut = flatten(cutSprite(this.printSpriteSheet, this.cutterLines, this.spriteSheetWidth, this.spriteSheetHeight));
        this.filesCharged(cutSpriteOut, this.cutterLines[0].length);
    }

    filesCharged(files = this.outputFiles, isSpritesheet = 1) {
        this.imgFilesService.setImages(files, isSpritesheet);
        swal(
            'Good job!',
            'Your image/s are uploaded',
            'success'
        ).then(() => {
            $('#modalSpriteSheet').modal('hide');
            this.router.navigate(['editor']);
        });
    }

    ngOnInit() {
    }

}
