import { Component, OnInit } from '@angular/core';
import { ImgFilesService } from '../../../services/img-files.service';
import { AtlasJsonService } from '../../../services/atlas-json.service';

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
    elementOutput: any;
    imagesFiles: Array<Object>;
    spritePerRow: Number = 1;
    zoomScale = 1;

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

    generatePNGJSON(): void {
        // PNG export
        const oldScale = this.elementOutput.getBoundingClientRect().width / this.elementOutput.offsetWidth;
        this.elementOutput.style.transform = 'scale(1)';
        const a = document.createElement('a');

        // JSON export
        const jsonAtlasAnchor = document.createElement('a');
        const dataStr = 'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(this.atlasJsonService.getAtlas(), null, '    ') );

        html2canvas($('#output'), {
            backgroundColor: 'rgba(0, 0, 0, 0)'
        }).then((canvas) => {
            a.href = canvas.toDataURL();
            a.download = `test.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            this.elementOutput.style.transform = `scale(${oldScale})`;

            jsonAtlasAnchor.href = dataStr;
            jsonAtlasAnchor.download = 'atlas.json';

            document.body.appendChild(jsonAtlasAnchor);
            jsonAtlasAnchor.click();
            document.body.removeChild(jsonAtlasAnchor);
        });

    }


}
