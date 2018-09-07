import { Component, OnInit } from '@angular/core';
import { ImgFilesService } from '../../../services/img-files.service';

declare var $: any;
declare var multiRE: any;
declare var html2canvas: any;
declare var readMultipleFiles: any;

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    imagesFiles: Array<Object>;
    spritePerRow: Number = 3;
    constructor(public imgFilesService: ImgFilesService) {}

    // Agrega nuevos sprites
    uploadAddFilesMulti(files) {
        const Files = Array.from(files.target.files);
        const outputFiles = [];

        Files.map(async (x, i) => {
            const resultado = await readMultipleFiles(x);
            outputFiles.push(resultado);
            if (Files.length - 1 === i) {
                this.imgFilesService.insertNewSprites(outputFiles);
                this.ngOnInit();
            }
        });
    }

    generatePNGJSON(): void {
        html2canvas($('#output'), {
            backgroundColor: 'rgba(0, 0, 0, 0)'
        }).then((canvas) => {
            const a = document.createElement('a');
            a.href = canvas.toDataURL();
            a.download = `test.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }

    ngOnInit() {
        this.imagesFiles = multiRE(this.imgFilesService.getImages(), this.spritePerRow);
    }

}
