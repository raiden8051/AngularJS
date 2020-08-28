(function () {
    angular.module('main', [])
        .controller('httpCtrl', httpCtrl)
        .service('Service', Service)
        .constant('path','http://davids-restaurant.herokuapp.com');

    httpCtrl.$inject = ['Service'];
    function httpCtrl(Service) {
        
        var promise = Service.getData();
        promise.then((response)=> {
                this.list = response.data;
            })
            .catch((error) => {
                console.log(error);
            });

        this.filterData = (value)=>{
            var promise = Service.getFilterData(value);
            promise.then((response) =>{
                console.log(response.data);
            })
            .catch((Error)=>{
                console.log(Error);
            });   
        }
    }
    Service.$inject = ['$http','path'];
    function Service($http,path) {
        this.getData = () => {
            var response = $http({
                method: "GET",
                url: (path+"/categories.json")
            })
            return response;
        };
        this.getFilterData = (value) =>{
            
            var response = $http({
                method: "GET",
                url: (path+"/menu_items.json"),
                params:{
                    category: value
                }
            });
            return response;
        }
    }
})();