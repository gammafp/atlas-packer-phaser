const $ = (x) => document.querySelector(x);

const lectorMultiple = function (files) {
    const salida = {
        nombre: files.name
    }
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = (x) => {
            salida.result = x.target.result;

            let img = new Image;
            img.onload = () => {
                salida.width = img.width;
                salida.height = img.height;
                resolve(salida);
            }
            img.src = salida.result;

        }
        reader.readAsDataURL(files);
    });
}

// Reto

// Magdiel
const multiMAGDIEL = (arr, n, out = []) => {
    if (arr.length < 1) return out;
    out.push(arr.slice(0, n));
    return multiMAGDIEL(arr.slice(n, arr.length), n, out);
}

// re
const multiRE = (f, n) => (n === 0 ? n = 1 : n, f.length < 1 ? '' : [f.slice(0, n), ...multiRE(f.slice(n), n)]);

// Multi lottie
const multiLOTTIE = (obj, col) => {
    if (col > obj.length) {
        col = obj.length
    }

    let m = []
    let f = Math.ceil(obj.length / col);

    for (i = 0; i < col; i++) {
        m[i] = obj.splice(0, f)
    }

    return m
}