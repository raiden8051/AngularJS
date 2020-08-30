(function(){
    angular.module('Service',[])
    .controller('AddingController',AddingController)
    .provider('MainService',MainServiceProvider)
    .config(Config)
    .directive('listItem',ListItem);

    function ListItem(){
        var ddo={
            templateUrl:"data.html",
            scope:{
                list:"<",
                title:"@",
                remove:'='
            },
            controller:newCtrl,
            controllerAs:"nctrl",
            bindToController: true,
            link: LinkFunction
        }
        return ddo;
    }

    function LinkFunction(scope,element,attr,controller){
        scope.$watch("nctrl.check()",(newValue,oldValue)=>{
            console.log(newValue,oldValue);
            if(newValue===true)
                display();
            else
                dontdisplay();
        });
        function display(){
            var e = element.find("h4");
            e.slideDown(900);
        }
        function dontdisplay(){
            var e = element.find("h4");
            e.slideUp(900);
        }
    }

    function newCtrl(){
        this.check = ()=>{
            for(var i=0;i<this.list.length;i++){
                var val = this.list[i].name;
                if(val.indexOf("porn")!==-1)
                    return true;
            }
            return false;
        }
    }

    Config.$inject=['MainServiceProvider'];
    function Config(MainServiceProvider){
        MainServiceProvider.defaults.max=5;
    }

    AddingController.$inject=['MainService'];

    function AddingController(MainService){
        this.name = "";
        this.quantity = "";
        this.add = function(){
            
        try{
            MainService.add(this.name, this.quantity);
            this.title="Quantity("+this.list.length+")";
        }
        catch(error){this.error=error.message}
        };

        this.list =  MainService.fetch();
        this.title="Quantity("+this.list.length+")";

        this.remove = function(item){
            MainService.remove(item);
            this.title="Quantity("+this.list.length+")";
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