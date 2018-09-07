const $ = (x) => document.querySelector(x);

// TODO: crear mejor herramienta
const readMultipleFiles = function (files) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = (x) => {
            const result = x.target.result;
            let img = new Image;
            img.onload = () => {
                resolve({
                    // TODO: Si hay un png limpiarlo de lo contrario mandar error
                    name: files.name.split(".png")[0],
                    width: img.width,
                    height: img.height,
                    result: result
                });
            }
            img.src = result;
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
