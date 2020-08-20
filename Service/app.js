(function(){
    angular.module('Service',[])
    .controller('AddingController',AddingController)
    .provider('MainService',MainServiceProvider)
    .config(Config);

    Config.$inject=['MainServiceProvider'];
    function Config(MainServiceProvider){
        MainServiceProvider.defaults.max=1;
    }

    AddingController.$inject=['MainService'];

    function AddingController(MainService){
        this.name = "";
        this.quantity = "";
        this.add = function(){
            
        try{
            MainService.add(this.name, this.quantity);
        }
        catch(error){this.error=error.message}
        };

        this.list =  MainService.fetch();

        this.remove = function(item){
            MainService.remove(item);
        };

    }
    function MainService(val){
        var items = [];
        
        this.add = function(itemname,quantity){
            if(items.length<val)
        {
            var item = {
                name:itemname,
                quantity:quantity
                }
            items.push(item);
            //console.log(items);
        }
        else
            throw new Error("Exceeded!!");
        };
    
        this.fetch = function(){
            return items;
        };
        this.remove = function(item){
            items.splice(item,1);
        };
    } 
    function MainServiceProvider(){

        this.defaults = {
            max : 3
        };

        this.$get = function(){
            var pro  =  new MainService(this.defaults.max);
            return pro;
        };
    }

})();