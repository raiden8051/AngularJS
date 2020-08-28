(function(){
    angular.module('PromiseModule',[])
    .controller('MainController',MainController)
    .service('MainService',MainService)
    .service('PromiseService',PromiseService);

    MainController.$inject = ['MainService'];
    function MainController(MainService){

        this.itemName = "";
        this.addItem = function(){
            MainService.add(this.itemName);
        }
        this.list = MainService.getList();
    }
    MainService.$inject = ['$q','PromiseService'];
    function MainService($q,PromiseService){
        var items = [];

        this.add = function(item){
            var promise = PromiseService.checkData(item);

            promise
            .then(function(response){
                items.push(item);
            })
            .catch(function(eResponse){
                console.log(eResponse);
            });
        };

        this.getList = function(){
            return items;
        };
    }
    PromiseService.$inject = ['$q','$timeout'];
    function PromiseService($q,$timeout){
        this.checkData = function(data){
            var deffered = $q.defer();

            var msg = "";

            $timeout(function(){
                if(data.indexOf('porn')===-1)
                    deffered.resolve(msg);
                else{
                    msg = "Strong Word Not Allowed!!";
                    deffered.reject(msg);
                }
            },1000);

            return deffered.promise;

        };
    } 

})();