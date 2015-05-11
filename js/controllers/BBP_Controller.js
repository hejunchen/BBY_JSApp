/**
 * Created by HOME on 1/12/2015.
 */


app.controller("ApplicationController", ['$scope', '$http', '$q', 'ApiJsonDataAccessService',
        function ($scope, $http, $q, ApiJsonDataAccessService) {

            //define the init() function
            $scope.init = function () {

                console.log('ApplicationController Init() - start');

                $scope.ShowLoadingAnimation = false;    //variable to control the loading animation on UI
                $scope.AllowStaffPrice = true;         //a switch to turn on/off the Staff Price for Current Product.
                $scope.AllCategories = null;            //this is the list of categories that will always be loaded at page load
                $scope.CurrentCategory = null;          //the instance of selected category, this = null when page gets its initial load
                $scope.CurrentCategoryProducts = null;  //the instance of category with its products, or all products for all categories
                $scope.CurrentProduct = null;           //the instance of currently selected product (by sku)
                //$scope.CurrentProductStaffPrice = null; //the staff price of current product
                $scope.UrlDomainPortion = 'http://www.bestbuy.ca';

                $scope.IsFirstPage = true;
                $scope.IsLastPage = false;


                $scope.ShowLoadingAnimation = true;

                //pre-load all categories during the initialization
                ApiJsonDataAccessService.getAllCategories().then(function (data) {
                    $scope.AllCategories = data;
                    $scope.ShowLoadingAnimation = false;
                });

                console.log('ApplicationController Init() - end');

            };


            //get category products by querying the category id. If no category is selected, query all products for all categories
            $scope.SetCurrentCategory = function (category, pageNo) {

                var page = pageNo;
                if (isNaN(page))
                    page = 1;

                $scope.CurrentCategory = category;
                //$scope.CurrentCategoryProducts = null;

                var id = null;
                if (category != null) {
                    console.log('ApplicationController SetCurrentCategory() - start [category: ' + category.toString() + ']');
                    id = category.id;
                }
                else {
                    console.log('ApplicationController SetCurrentCategory() - start [category: undefined]');
                }


                $scope.ShowLoadingAnimation = true;

                //if the id = null, we are querying for all the products of all categories
                ApiJsonDataAccessService.getProductsByCategoryId(id, page).then(function (data) {
                    $scope.CurrentCategoryProducts = data;      //load the products into variable
                    $scope.IsFirstPage = (page == 1? true : false);
                    $scope.IsLastPage = (page == $scope.CurrentCategoryProducts.totalPages? true : false);
                    $scope.ShowLoadingAnimation = false;
                });

                console.log('ApplicationController SetCurrentCategory() - end');

            };

            $scope.SetCurrentProduct = function (product) {
                console.log('ApplicationController SetCurrentProduct() - start [sku: ' + product.sku.toString() + ']');
                $scope.CurrentProduct = product;
                console.log('ApplicationController SetCurrentProduct() - end');
            };


            $scope.SetCurrentProductStaffPrice = function(product){

                $scope.CurrentProduct.StaffPrice = undefined;

                if ($scope.AllowStaffPrice)
                {
                    ApiJsonDataAccessService.getStaffPriceBySku(product.sku).then(function (data){
                        console.log('ApplicationController SetCurrentProductStaffPrice() - start [sku: ' + product.sku.toString() + ']');
                        $scope.CurrentProduct.StaffPrice = data;
                        console.log('ApplicationController SetCurrentProductStaffPrice() - end');
                    });
                }

            };



            $scope.GetFullUrl = function (imagePath) {
                if (imagePath != null && imagePath.length > 0)
                    return $scope.UrlDomainPortion + imagePath;
                else
                    return '';
            };




            //execute the init() function
            $scope.init();
            $scope.SetCurrentCategory(null);

        }]
);