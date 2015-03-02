/**
 * Created by HOME on 1/12/2015.
 */


app.controller("ApplicationController",['$scope','$http','$q','ApiJsonDataAccessService',
        function($scope,$http,$q,ApiJsonDataAccessService){

            //define the init() function
            $scope.init = function(){

                console.log('ApplicationController Init() - start');

                $scope.ShowLoadingAnimation = false;    //variable to control the loading animation on UI
                $scope.AllCategories = null;            //this is the list of categories that will always be loaded at page load
                $scope.CurrentCategory = null;          //the instance of selected category, this = null when page gets its initial load
                $scope.CurrentCategoryProducts = null;  //the instance of category with its products, or all products for all categories
                $scope.CurrentProduct = null;           //the instance of currently selected product (by sku)
                $scope.UrlDomainPortion = 'http://www.bestbuy.ca';

                //pre-load all categories during the initialization
                ApiJsonDataAccessService.getAllCategories().then(function(data){
                    $scope.ShowLoadingAnimation = true;
                    $scope.AllCategories = data;
                    $scope.ShowLoadingAnimation = false;
                });

                console.log('ApplicationController Init() - end');

            }


            //get category products by querying the category id. If no category is selected, query all products for all categories
            $scope.SetCurrentCategory = function(category){

                $scope.CurrentCategory = category;
                //$scope.CurrentCategoryProducts = null;

                var id = null;
                if (category != null)
                {
                    console.log('ApplicationController SetCurrentCategory() - start [category: '+ category.toString() + ']');
                    id = category.id;
                }
                else
                {
                    console.log('ApplicationController SetCurrentCategory() - start [category: undefined]');
                }


                //if the id = null, we are querying for all the products of all categories
                ApiJsonDataAccessService.getProductsByCategoryId(id).then(function(data){
                    $scope.ShowLoadingAnimation = true;
                    $scope.CurrentCategoryProducts = data;      //load the products into variable
                    $scope.ShowLoadingAnimation = false;
                });

                console.log('ApplicationController SetCurrentCategory() - end');

            }

            $scope.SetCurrentProduct = function(product){

                console.log('ApplicationController SetCurrentProduct() - start [sku: '+ product.sku.toString() + ']');

                $scope.CurrentProduct = product;

                //ApiJsonDataAccessService.getProductDetailsBySku(sku).then(function(data){
                //    $scope.ShowLoadingAnimation = true;
                //    $scope.CurrentSelectedProduct = data;
                //    $scope.ShowLoadingAnimation = false;
                //});

                console.log('ApplicationController SetCurrentProduct() - end');

            }

            $scope.GetFullUrl = function(imagePath){
                if(imagePath != null && imagePath.length > 0)
                    return $scope.UrlDomainPortion + imagePath;
                else
                    return '';
            }





            //execute the init() function
            $scope.init();
            $scope.SetCurrentCategory(null);

        }]
);









