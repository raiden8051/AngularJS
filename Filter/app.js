(function(){

    angular.module('filterModule',[])
    .controller('ModuleController',ModuleController)
    .filter('change hg',ChangeFilter);

    ModuleController.$inject=['$scope'];

    function ModuleController($scope){
        $scope.msg = "Hello";
        $scope.saymsg = function(){
            return "Raiden";
        };
    };

    function ChangeFilter(){
        return function(input,target,val){
            input = input.replace(target,val);
            return input;
        }
    };
})();