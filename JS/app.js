(function (){
    angular.module('myFirstPage',[])
    .controller('MyFirstController',function($scope){
        $scope.name = "";
        $scope.total = 0;
        $scope.calculateSize = function () {
            $scope.total = getTotal($scope.name); 
        };
        function getTotal(string)
        {
            var total = 0;
            for(var i=0;i<string.length;i++){
                total+=string.charCodeAt(i);
            }
            return total;
        }
    })
    .controller('ToUpperController',makeUpper);

    function makeUpper($scope, $filter) {
        
        $scope.quantity = [
            {
                name:"Ram",
                quantity: "10"
            },
            {
                name:"Shyam",
                quantity: "20"
            }
        ];
        $scope.upper = function(){
            var toupper = $filter('uppercase');
            $scope.upperData = toupper($scope.upperData);
    };
}

})();