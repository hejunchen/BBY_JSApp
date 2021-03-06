/**
 * Created by HOME on 1/12/2015.
 */


app.controller("ApplicationController", ['$scope', '$http', '$q', 'ApiJsonDataAccessService',
        function ($scope, $http, $q, ApiJsonDataAccessService) {

            //define the init() function
            $scope.init = function () {

                console.log('ApplicationController Init() - start');

                $scope.ShowLoadingAnimation = false;    //variable to control the loading animation on UI
                $scope.AllowStaffPrice = false;         //a switch to turn on/off the Staff Price for Current Product.
                $scope.AllCategories = null;            //this is the list of categories that will always be loaded at page load
                $scope.CurrentCategory = null;          //the instance of selected category, this = null when page gets its initial load
                $scope.CurrentCategoryProducts = null;  //the instance of category with its products, or all products for all categories
                $scope.CurrentProduct = null;           //the instance of currently selected product (by sku)
                $scope.UrlDomainPortion = 'http://www.bestbuy.ca';
                $scope.Language = "en";

                $scope.IsFirstPage = true;
                $scope.IsLastPage = false;

                //pre-load all categories during the initialization
                $scope.GetAllCategories($scope.Language);

                console.log('ApplicationController Init() - end');

            };

            $scope.GetAllCategories = function(lang){
                $scope.ShowLoadingAnimation = true;
                ApiJsonDataAccessService.getAllCategories(lang).then(function (data) {
                    $scope.AllCategories = data;
                    $scope.ShowLoadingAnimation = false;
                });
            }

            $scope.SetCurrentCategory = function(category, pageNo) {

                var page = pageNo;
                if (isNaN(page))
                    page = 1;

                $scope.CurrentCategory = category;

                var id = null;
                if (category != null) {
                    console.log('ApplicationController SetCurrentCategory() - start [category: ' + category.name.toString() + ']');
                    id = category.id;
                }
                else {
                    console.log('ApplicationController SetCurrentCategory() - start [category: undefined]');
                }

                $scope.ShowLoadingAnimation = true;
                //if the id = null, we are querying for all the products of all categories
                ApiJsonDataAccessService.getProductsByCategoryId(id, page, $scope.Language).then(function (data) {
                    $scope.CurrentCategoryProducts = data;      //load the products into variable
                    $scope.IsFirstPage = (page == 1? true : false);
                    $scope.IsLastPage = (page == $scope.CurrentCategoryProducts.totalPages? true : false);
                    $scope.ShowLoadingAnimation = false;
                });

                console.log('ApplicationController SetCurrentCategory() - end');

            };

            $scope.SetCurrentProduct = function(product) {
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

            $scope.GetFullUrl = function(path) {
                if (path != null && path.length > 0)
                    return $scope.UrlDomainPortion + path;
                else
                    return '';
            };

            $scope.ToggleStaffPriceSwitch = function() {
                $scope.AllowStaffPrice = !$scope.AllowStaffPrice;
                console.log('Staff Price status is changed to: ' + $scope.AllowStaffPrice.toString());
            }

            //execute the init() function
            $scope.init();
            $scope.SetCurrentCategory(null);

        }]
);