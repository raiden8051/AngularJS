(() => {
    angular.module('main', [])
        .controller('Ctrl', Ctrl)
        .service('Service', Service)
        .constant('ApiPath', 'https://davids-restaurant.herokuapp.com')
        .directive('foundItems', FoundItems);

    Ctrl.$inject = ["Service"];
    function Ctrl(Service) {
        this.list;
        this.getData = () => {
            var promise = Service.getDataService();
            promise.then((response) => {
                this.l = response.data;
                this.list = filterData(this.l, this.serachValue);
            })
                .catch(function (error) {
                    this.error = error;
                });
        }
        this.remove = (index) => {
            this.list = Service.removedata(this.list, index);
        }
    }

    function FoundItems() {
        var ddo = {
            templateUrl: "data.html",
            scope: {
                ctrl: '<',
                remove: '<'
            }
        }
        return ddo;
    }

    function filterData(data, serachValue) {
        var items = [];
        if (serachValue === "")
            return items.splice(0,items.length);
        else {
            for (var i = 0; i < data.menu_items.length; i++) {
                var d = data.menu_items[i].description;
                if (d.indexOf(serachValue) !== -1)
                    items.push(data.menu_items[i]);
            }
            return items;
        }
    }

    Service.$inject = ["$http", "ApiPath"];
    function Service($http, ApiPath) {

        this.getDataService = () => {
            var response = $http({
                method: "GET",
                url: (ApiPath + "/menu_items.json")
            });
            return response;
        }
        this.removedata = (list, index) => {
            list.splice(index, 1);
            return list;
        }
    }
})();