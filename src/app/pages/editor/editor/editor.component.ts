import { Component, OnInit, ElementRef } from '@angular/core';
import { ImgFilesService } from '../../../services/img-files.service';
import { AtlasJsonService } from '../../../services/atlas-json.service';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver/dist/FileSaver';
import { Router } from '@angular/router';
import { AnimatordbService } from '../../../services/animatordb.service';
import { flatten } from 'ramda';

declare var _$: any;
declare var $: any;
declare var NacatamalON: any;
declare var multiRE: any;
declare var html2canvas: any;
declare var readMultipleFiles: any;
declare var clearString: any;
declare var swal: any;
declare var PerfectScrollbar: any;

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    elementOutput: any;
    nombreSprite: String = 'Atlas name';
    imagesFiles: Array<Object>;
    spritePerRow: Number = 1;
    zoomScale = 1;
    zip: JSZip;

    // Spritesheet cut
    canvasSize: any;
    nc: any;
    nameSpriteSheet: String = '';
    printSpriteSheet: String = '';

    spriteSheetWidth: any = 16;
    spriteSheetHeight: any = 16;
    cutterLines: Array<any>;

    constructor(
        public imgFilesService: ImgFilesService,
        public atlasJsonService: AtlasJsonService,
        public router: Router,
        public animatorService: AnimatordbService,
        private elementRef: ElementRef
    ) {
        this.spritePerRow = this.imgFilesService.getSpritesheetRow();
        this.nc = new NacatamalON();
        this.canvasSize = {
            width: 0,
            height: 0
        };
    }

    ngOnInit() {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#1A2226';
        this.refresh();

    }

    refresh() {
        this.elementOutput = _$('#output');
        this.imagesFiles = multiRE(this.imgFilesService.getImages(), this.spritePerRow);
        this.atlasJsonService.generateAtlas(this.imagesFiles);

        // start tooltips system
        $(() => {
            $('[data-toggle="tooltip"]').tooltip();
        });

        this.scrollBar();
    }

    // Agrega nuevos sprites
    uploadAddFilesMulti(files) {
        const Files = Array.from(files.target.files);
        const outputFiles = [];

        Files.map(async (x, i) => {
            const resultado = await readMultipleFiles(x);
            outputFiles.push(resultado);
            if (Files.length - 1 === i) {
                this.imgFilesService.insertNewSprites(outputFiles);
                this.refresh();
            }
        });
    }
    // Add new spritesheet
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
            width.map(() => 0));

        this.canvasSize.width = sizeImage.x;
        this.canvasSize.height = sizeImage.y;
    }
    // Cut images
    cutSpritesheet() {
        const cutSprite = this.nc.cutSpriteSheet(this.nameSpriteSheet);
        const cutSpriteOut = flatten(cutSprite(this.printSpriteSheet, this.cutterLines, this.spriteSheetWidth, this.spriteSheetHeight));

        this.filesCharged(cutSpriteOut, this.cutterLines[0].length);
    }


    filesCharged(files, isSpritesheet = 1) {
        this.imgFilesService.insertNewSprites(files);
        $('#modalSpriteSheet').modal('hide');
        this.refresh();
    }

    // Fin spritesheet add
    zoom(type): void {
        this.zoomScale = (type === 'zoomIn') ?
            ((this.zoomScale + 1 >= 4) ? 4 : this.zoomScale + 1)
            : ((this.zoomScale - 1 <= 1) ? 1 : this.zoomScale - 1);

        // Fix scroll
        const differenceScaleWith = ((this.elementOutput.offsetWidth * this.zoomScale) - (_$('.outputIMG').offsetWidth)) / 4;
        const differenceScaleHeight = ((this.elementOutput.offsetHeight * this.zoomScale) - (_$('.outputIMG').offsetHeight)) / 4;
        const transformElement = ((this.elementOutput.offsetWidth * this.zoomScale) > (_$('.outputIMG').offsetWidth)) ?
            `scale(${this.zoomScale})
            translate(${differenceScaleWith}px, ${differenceScaleHeight}px)`
            : `scale(${this.zoomScale})`;

        this.elementOutput.style.transform = transformElement;
        this.scrollBar();
    }

    scrollBar() {
        const ps = new PerfectScrollbar('.outputIMG');
        ps.update();
    }

    deleteSprite(deleteSpriteName) {
        this.imgFilesService.deleteOneSprite(deleteSpriteName);
        this.refresh();
    }

    generatePNGJSON(): void {
        const zip = new JSZip();
        const nameFiles = clearString(this.nombreSprite);
        // PNG export
        const oldScale = this.elementOutput.getBoundingClientRect().width / this.elementOutput.offsetWidth;
        this.elementOutput.style.transform = 'scale(1)';

        // JSON export
        const dataStr = JSON.stringify(this.atlasJsonService.getAtlas(), null, '    ');
        zip.file(`${nameFiles}_atlas.json`, dataStr);

        html2canvas(_$('#output'), {
            backgroundColor: 'rgba(0, 0, 0, 0)'
        }).then((canvas) => {
            // Generate zip
            zip.file(`${nameFiles}.png`, canvas.toDataURL().replace('data:image/png;base64,', ''), { base64: true });
            zip.generateAsync({ type: 'blob' })
                .then(function (content) {
                    saveAs(content, `PP3.zip`);
                });
            // End generate zip
            this.elementOutput.style.transform = `scale(${oldScale})`;
        });
    }
    // Go to page animator
    animate() {
        this.elementOutput.style.transform = 'scale(1)';
        swal({
            title: '¿Estas seguro?',
            text: 'Saldrás de esta página, ¿estás seguro?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, ¡vamos a animar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                html2canvas(_$('#output'), {
                    backgroundColor: 'rgba(0, 0, 0, 0)'
                }).then((canvas) => {
                    this.animatorService.setAtlas([{
                        'name': clearString(this.nombreSprite),
                        'spritesheet_array': this.imagesFiles,
                        'spritesheet': canvas.toDataURL(),
                        'atlas': this.atlasJsonService.getAtlas()
                    }]);
                    this.router.navigate(['animator']);
                });

            }
        });
    }

    anchorEditor() {
        console.log('Editor del ancla');
    }

}
