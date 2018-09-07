import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImgFilesService } from '../../../services/img-files.service';

declare var readMultipleFiles: any;
declare var swal: any;

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
        this.imgFilesService.setImages(this.outputFiles);
        swal(
            'Good job!',
            'Your image/s are uploaded',
            'success'
        ).then(() => {
            this.router.navigate(['editor']);
        });
    }

    ngOnInit() {
    }

}
