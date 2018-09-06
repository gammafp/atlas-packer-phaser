const myApp = angular.module("miApp", []);

myApp.controller("mainCtrl", ["$scope", ($scope) => {

    $scope.archivos = [];
    $scope.styleOut = {};
    $scope.zoom = 1;

    // Primera carga de las imágenes
    $scope.onFileChange = async function (e) {
        const file = e.target.files;
        const array = Array.from(file);

        let salida = [];

        array.map( async (x, i) => {
            const resultado = await lectorMultiple(x);
            salida.push(resultado);
            if(array.length-1 === i) {
                mostrar();
            }
        });

        function mostrar() {
            $scope.archivos = multiRE(salida, 2);
            console.log($scope.archivos);
            $scope.$apply();
        }
    }

    $scope.zoomFunction = (zoomType) => {

        if(zoomType === 'zoomIn') {
            $scope.zoom++;
        } else {
            $scope.zoom--;
        }
        $scope.styleOut.transform = `scale(${$scope.zoom})`;
    }
    $scope.editarImage = (imagen) => {
        console.log(imagen);
    }

    // Salida de imágen final
    $scope.obtenerImagen = function () {
        const objetoSalia = $('#output');
        objetoSalia.style.transform = "scale(1)";
        $(".uno").style.border = "none";
        html2canvas(objetoSalia, {
            backgroundColor: 'rgba(0, 0, 0, 0)'
        }).then((canvas) => {
            const a = document.createElement('a');
            a.href = canvas.toDataURL();
            a.download = `prueba.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            objetoSalia.style.transform = `scale(${$scope.zoom})`;
        });
    }
}]);


// Directiva para cargar imágenes en tiempo real (no se usa en Angular 6)
myApp.directive('fileOnChange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.fileOnChange);
            element.bind('change', onChangeHandler);
        }
    };
});
