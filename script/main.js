const myApp = angular.module("miApp", []);

myApp.controller("mainCtrl", ["$scope", ($scope) => {

    $scope.archivos = [];

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
            $scope.archivos.push(...salida);
            console.log($scope.archivos);
            $scope.$apply();
        }


    }

    // Salida de imágen final
    $scope.obtenerImagen = function () {
        const objetoSalia = $('#output');
        // objetoSalia.style.transform = "scale(1)";
        html2canvas(objetoSalia, {
            backgroundColor: 'rgba(0, 0, 0, 0)'
        }).then((canvas) => {
            const a = document.createElement('a');
            a.href = canvas.toDataURL();
            a.download = `prueba.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            // objetoSalia.style.transform = "scale(4)";
        });
    }
}]);

myApp.directive('fileOnChange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.fileOnChange);
            element.bind('change', onChangeHandler);
        }
    };
});