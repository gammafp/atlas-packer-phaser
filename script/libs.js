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