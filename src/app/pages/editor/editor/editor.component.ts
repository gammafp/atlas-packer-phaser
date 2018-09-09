import { Component, OnInit } from '@angular/core';
import { ImgFilesService } from '../../../services/img-files.service';
import { AtlasJsonService } from '../../../services/atlas-json.service';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver/FileSaver';

declare var $: any;
declare var multiRE: any;
declare var html2canvas: any;
declare var readMultipleFiles: any;
declare var clearString: any;

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

    constructor(public imgFilesService: ImgFilesService, public atlasJsonService: AtlasJsonService) {}

    ngOnInit() {
        this.elementOutput = $('#output');
        this.imagesFiles = multiRE(this.imgFilesService.getImages(), this.spritePerRow);
        this.atlasJsonService.generateAtlas(this.imagesFiles);
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
                this.ngOnInit();
            }
        });
    }

    zoom(type): void {
        this.zoomScale = (type === 'zoomIn') ?
            ((this.zoomScale + 1 >= 4) ? 4 : this.zoomScale + 1)
            : ((this.zoomScale - 1 <= 1) ? 1 : this.zoomScale - 1);

        this.elementOutput.style.transform = `scale(${this.zoomScale})`;
    }

    deleteSprite(deleteSpriteName) {
        this.imgFilesService.deleteOneSprite(deleteSpriteName);
        this.ngOnInit();
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

        html2canvas($('#output'), {
            backgroundColor: 'rgba(0, 0, 0, 0)'
        }).then((canvas) => {
            // Generate zip
            zip.file(`${nameFiles}.png`, canvas.toDataURL().replace('data:image/png;base64,', ''), {base64: true});
            zip.generateAsync({type: 'blob'})
            .then(function(content) {
                saveAs(content, `PP3.zip`);
            });
            // End generate zip
            this.elementOutput.style.transform = `scale(${oldScale})`;
        });
    }
}
