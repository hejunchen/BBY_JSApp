/**
 * Created by HOME on 1/12/2015.
 */

app.service('ApiJsonDataAccessService', ['$http','$q',function($http,$q){

      var GetAllCategories = function(){

        var deferred = $q.defer();
        var categories = [];
        var url = "http://www.bestbuy.ca/api/v2/json/category/Departments?callback=?";
        //url = 'json/AllCategories.json';
        console.log('URL: ' + url.toString());

        $.getJSON(url)
            .success(function(data){
                categories = data;
                deferred.resolve(categories);
            })
            .error(function(data){
                alert('error: ' + JSON.stringify(data));
                categories = data;
                deferred.resolve(categories);
            });
        return deferred.promise;


    };

    var GetProductsByCategoryId = function(categoryId, pageNo){

        var deferred = $q.defer();

        var param = '';
        if (categoryId === null)
            param = 'All';
        else
            param = categoryId.toString();

        param = 'categoryid=' + param + '&page=' + pageNo + "&callback=?";

        var products = [];
        var url = "http://www.bestbuy.ca/api/v2/json/search?" + param;
        //url = 'json/' + param;
        console.log('URL: ' + url.toString());
        $.getJSON(url)
            .success(function(data){
                products = data;
                deferred.resolve(products);
            });

        return deferred.promise;
    };

    //var GetProductDetailsBySku = function(sku){
    //    var deferred = $q.defer();
    //    var details = [];
    //    var url = "http://www.bestbuy.ca/api/v2/json/product/" + sku;
    //
    //    console.log('URL: ' + url.toString());
    //    $http.get(url)
    //        .success(function(data){
    //            details = data;
    //            deferred.resolve(details);
    //        });
    //    return deferred.promise;
    //}

    return {
            getAllCategories: GetAllCategories
        ,   getProductsByCategoryId: GetProductsByCategoryId
        //, getProductDetailsBySku: GetProductDetailsBySku
    };

}]);
