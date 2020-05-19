# Este proyecto está obsoleto ya que se ha actualizado a un mejor atlas-packer
Puedes acceder a la nueva versión del atlas packer accediendo acá: 
[CLICAME](https://gammafp.com/tools/)

---

# Atlas Packer Phaser (APP)
Un software simple para empaquetar grupo de imágenes y crearnos un atlas para Phaser.

# [DEMO](https://gammafp.github.io/atlas-packer-phaser/)

![](https://i.gyazo.com/c50e2880f201d11fbd6b6d974af8f64f.png)

## Instalación: 
- Solo basta con descargar el repositorio y hacer npm install, no se ha usado ningún server pero estaría recomendable usar visual studio code con liveserver.
- Usar node v8.11.4 o superior.
- Se ha usado Angular 6.

Para iniciar el servidor es en la consola haciendo 
```ng serve```

### Comandos útiles: 
Generacion de páginas lazyload (ejemplo): 
```
ng g m pages/home --routing true --spec false
ng g c pages/home/home --spec false
```

Una vez creada la página hay que editar el routing y agregar el componente principal: 
```javascript
import { EditorComponent } from './editor/editor.component';
...
const routes: Routes = [{
    path: '',
    component: EditorComponent
}];

```
Luego agregarlo a la ruta como siempre.

---

## Proyecto en desarrollo
