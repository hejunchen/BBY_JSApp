/**
 * Created by HOME on 1/12/2015.
 */

app.service('ApiJsonDataAccessService', ['$http','$q',function($http,$q){

    //Due to the 'Access-Control-Allow-Origin' restriction, unable to launch this application outside of www.bestbuy.ca domain
    //had to extract all json data and save them into individual .json file.

    var GetAllCategories = function(){

        var deferred = $q.defer();
        var categories = [];
        var url;// = "http://www.bestbuy.ca/api/v2/json/category/Departments?callback=JSON_CALLBACK";
        url = 'json/AllCategories.json';
        console.log('URL: ' + url.toString());

        $http.get(url)
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


    }

    var GetProductsByCategoryId = function(categoryId){
        var deferred = $q.defer();
        var param = '';
        if (categoryId == null)
            param = 'departments.json';
        else
            param = categoryId + '.json';

        var products = [];
        var url; // = "http://www.bestbuy.ca/api/v2/json/search?categoryid=" + param;
        url = 'json/' + param;
        console.log('URL: ' + url.toString());
        $http.get(url)
            .success(function(data){
                products = data;
                deferred.resolve(products);
            });
        return deferred.promise;
    }

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
