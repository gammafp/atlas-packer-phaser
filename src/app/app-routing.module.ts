import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: './pages/home/home.module#HomeModule'
    },
    {
        path: 'editor',
        loadChildren: './pages/editor/editor.module#EditorModule'
    },
    {
        path: 'animator',
        loadChildren: './pages/animator/animator.module#AnimatorModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
