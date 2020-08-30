(()=>{
    angular.module('main',[])
    .controller('Ctrl',Ctrl)
    .directive('myTag',MyTag);

    function Ctrl(){
        this.list = "fdf";
    }

    function MyTag(){
        var ddo={
            restrict:'AE',
            templateUrl:"data.html"
        }
        return ddo;
    }

})();