(function () {
    
    angular.module('Assignment',[])
    .controller('DataController',DataController);

    DataController.$inject=['$scope'];

    function DataController($scope){

        $scope.data_items = "";
        $scope.message = "";
        $scope.color = "black";
        $scope.checkInput = function () {
            
            var arr = $scope.data_items.split(",");

            var ctr = 0;
            for(var i=0;i<arr.length;i++)
            {
                if(arr[i].trim()!="")
                    ctr++;
            }
            $scope.borderdata = "2px solid ";
            if(ctr==0)
            {
                $scope.message = "Please Enter Data First!";
                $scope.borderdata += "Crimson";
                $scope.color = "Crimson";
                $scope.data_items = "";
            }
            else if(ctr>0 && ctr<3){
                $scope.message = "Enjoy!";
                $scope.borderdata += "Green";
                $scope.color = "green";
            }
            else{
                $scope.message = "Too Much!";
                $scope.borderdata += "Limegreen";
                $scope.color = "green";
            }
        };
    }
})();