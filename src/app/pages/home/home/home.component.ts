import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImgFilesService } from '../../../services/img-files.service';

declare var readMultipleFiles: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    outputFiles: Array<any> = [];
    constructor(private router: Router, public imgFilesService: ImgFilesService) { }

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

    filesCharged() {
        // console.log(this.outputFiles);
        console.log('Mostrar swall');
        this.imgFilesService.setImages(this.outputFiles);
        this.router.navigate(['editor']);
    }

    ngOnInit() {
    }

}
