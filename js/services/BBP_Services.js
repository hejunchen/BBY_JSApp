/**
 * Created by HOME on 1/12/2015.
 */

app.service('ApiJsonDataAccessService', ['$http','$q',function($http,$q){

    var GetAllCategories = function(lang){

        var deferred = $q.defer();
        var categories = [];
        var url = "http://www.bestbuy.ca/api/v2/json/category/Departments?lang=" + lang + "&callback=?";
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

    var GetProductsByCategoryId = function(categoryId, pageNo, lang){

        var deferred = $q.defer();

        var param = '';
        if (categoryId === null)
            param = 'All';
        else
            param = categoryId.toString();

        param = 'categoryid=' + param + '&page=' + pageNo + "&lang=" + lang + "&callback=?";

        var products = [];
        var url = "http://www.bestbuy.ca/api/v2/json/search?" + param;
        console.log('URL: ' + url.toString());
        $.getJSON(url)
            .success(function(data){
                products = data;
                deferred.resolve(products);
            });

        return deferred.promise;
    };

    var GetStaffPriceBySku = function(sku) {

        var price = '';
        var deferred = $q.defer();

        var url = 'http://portal.bestbuycanada.ca/portal/page?_pageid=433,822192&_dad=portal&_schema=PORTAL&l_skuid1='+sku+'&l_brand=bby';

        console.log("start querying staff price");

        $.get(url, function(data, results) {
            if (results != 'success' || $(data).find('td[width="20%"]').length < 3) {
                price = "N/A";
                console.log("Not Found Staff Price");
                deferred.resolve(price);
            } else {
                price = $(data).find('td[width="20%"]:last').text();
                console.log("Found Staff Price: " + price.toString());
                deferred.resolve(price);
            }
        });

        return deferred.promise;

    };

    return {
            getAllCategories: GetAllCategories
        ,   getProductsByCategoryId: GetProductsByCategoryId
        ,   getStaffPriceBySku: GetStaffPriceBySku
    };

}]);
