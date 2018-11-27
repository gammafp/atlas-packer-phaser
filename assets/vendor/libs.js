const _$ = (x) => document.querySelector(x);

// funcion creada por Lottie
const clearString = string => {
    const chars = {
        'á': 'a',
        'é': 'e',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
        'ñ': 'n',
        ' ': '_',
        ',': ''
    };
    return ((string.toLowerCase()).replace(/[áéíóúñ, ]/g, m => chars[m])).split(".png")[0];
};

// Creado por Lottie y refactorizado por gammafp
const deleteSpriteInArray = (objectName, objectsSprite) => {
    return objectsSprite.filter(
        (x) =>
        (('name' in objectsSprite)) ? x.name != objectName : x.key != objectName
    );
}

const readMultipleFiles = (files) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (x) => {
            const result = x.target.result;
            let img = new Image;
            img.onload = () => {
                resolve({
                    // TODO: Si hay un png limpiarlo de lo contrario mandar error
                    name: clearString(files.name),
                    width: img.width,
                    height: img.height,
                    result: result
                });
            }
            img.src = result;
        }
        reader.readAsDataURL(files);
    });

const readJSONFiles = (files) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (x) => {
            const result = x.target.result;
            resolve(result);
        }
        reader.readAsText(files);
    });

// re
const multiRE = (f, n) => (n === 0 ?
    n = 1 :
    n,
    f.length < 1 ?
    '' : [f.slice(0, n), ...multiRE(f.slice(n), n)]);

// Canvas
class NacatamalON {

    constructor() {}

    addImage(imgSrc, x, y) {
        // const img = new Image();
        // img.src = imgSrc;

        // this.canvas.width = img.width;
        // this.canvas.height = img.height;

        // this.ctx.clearRect(0, 0, img.width, img.height);
        // this.ctx.drawImage(img, x, y);
    }
    getSizeImage(src) {
        const img = new Image();
        img.src = src;
        return {
            x: img.width,
            y: img.height
        }
    }
    cutSpriteSheet(nameSpritesheet) {
        // Ramda
        return (src, grid, cutX, cutY) =>
            grid.map((y, yi) =>
                y.map((x, xi, x_array) => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext("2d");
                    const img = new Image();
                    img.src = src;
                    canvas.width = cutX;
                    canvas.height = cutY;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, -(xi * cutX), -(yi * cutY));
                    const output = {
                        "name": `${nameSpritesheet}_${(x_array.length*yi+xi)}`,
                        "result": canvas.toDataURL(),
                        "width": cutX,
                        "height": cutY
                    };
                    return output;
                })
            );
    }

    getLinesOfAtlas(atlas) {
        return atlas.frames.reduce((prev, current) =>
            (atlas.frames[0].frame.y === current.frame.y) ? prev + 1 : prev + 0, 0);
    }

    cutAtlasSheet(src, atlas) {
        return atlas.frames.map((x) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext("2d");
            const img = new Image();

            img.src = src.result;
            canvas.width = x.frame.w;
            canvas.height = x.frame.h;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, -(x.frame.x), -(x.frame.y));
            const output = {
                "name": x.filename,
                "result": canvas.toDataURL(),
                "xy": x.frame,
                "width": x.frame.w,
                "height": x.frame.h,
                "anchor": x.anchor
            };
            return output;

        });


    }
}


// Data convert
const b64toBlob = (b64DataIn, contentType, sliceSize) => {
    let b64Data = b64DataIn.replace(/^data:(\w*\/\w*;)base64,/, '');
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {
        type: contentType
    });
    return blob;
}
