(function (){
    angular.module('AssignmentModule',[])
    .controller('ToBuyController',ToBuyController)
    .controller('BoughtController',BoughtController)
    .provider('MainService',MainServiceProvider);

    ToBuyController.$inject = ['MainService'];
    function ToBuyController(MainService){
        this.list = MainService.fetch();
        
        this.addToCart = function(index){
            try{
                    MainService.add(index); 
                }
                catch(error){
                    this.msg = error.message;
                }
            
        };
    }
    BoughtController.$inject = ['MainService'];
    function BoughtController(MainService){
        this.list = MainService.fetch2();
    }
    function MainService(){

        var items=
        [
            {
                name:"Flour",
                qty:10
            },
            {
                name:"Cinnamonne",
                qty:15
            },
            {
                name:"Clove",
                qty:5
            },
            {
                name:"Ginger",
                qty:1
            },
            {
                name:"Corriender",
                qty:12
            }
        ];
        var items2=[];
        this.fetch = function(){
            return items;
        }
        
        this.fetch2 = function(){
            return items2;
        }
        
        this.add = function(index){
            items2.push(items[index]);
            items.splice(index,1);
            if(items.length==0)
                throw new Error("Everything is bought!");
        };
    }
    function MainServiceProvider(){
        this.defaults = {
            max : 10
        }
        this.$get = function(){
        var provide = new MainService(this.defaults.max);
        return provide;
        };
    }

})();