angular.module('app.controllers', [])
        .controller('sliderCtrl', ['$scope', '$stateParams', '$state', '$ionicSlideBoxDelegate', '$ionicSideMenuDelegate', '$window', '$ionicLoading', '$http', '$rootScope', 'BASE',
            function ($scope, $stateParams, $state, $ionicSlideBoxDelegate, $ionicSideMenuDelegate, $window, $ionicLoading, $http, $rootScope, BASE) {
                $scope.$on('$ionicView.enter', function () {
                    $ionicSideMenuDelegate.canDragContent(false);
                });
                if ($window.localStorage.getItem('UserData'))
                    if (JSON.parse($window.localStorage.getItem('UserData')).plan_id == 0 && JSON.parse($window.localStorage.getItem('UserData')).active_plan == 0)
                        $state.go('menu.subscription');
                    else
                        $state.go('menu.nearestRestaurants', {id: JSON.parse($window.localStorage.getItem('UserData')).plan_id})

                var fbLoginSuccess = function (successdata) {
                    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 10000});
                    //alert(JSON.stringify(successdata))
                    //alert("hello");

                    facebookConnectPlugin.api('/me?fields=id,email,name&access_token=' + successdata.authResponse.accessToken, null,
                            function (profileresponse) {
                                $rootScope.profilepic = "http://graph.facebook.com/" + profileresponse.id + "/picture?type=large"
                                //alert($rootScope.profilepic);
                                //alert(1);
                                //alert(JSON.stringify(profileresponse));
                                $ionicLoading.hide();
                                $scope.randomid = Math.floor(Math.random() * 15252522555);
                                $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 10000});
                                $http.post(BASE + 'api/users/fblogin.json', profileresponse, $rootScope.cntype).success(function (response)
                                {
                                    //alert(JSON.stringify(response));
                                    $rootScope.id = response.response.data.id;
                                    if (response.response.plan)
                                        $scope.expires = response.response.plan.expireon.substr(0, 10);
                                    else
                                        $scope.expires = null;
                                    //localStorage.setItem('UserData', JSON.stringify({user_id:k.response.data.id,email:k.response.data.email,uniqueID:$scope.randomid,fname:k.response.data.fname,lname:k.response.data.lname,image:k.response.data.image,phone:k.response.data.phone,plan_id:k.response.data.subscription_plan_id,active_plan:k.response.data.is_activeplan,expires:$scope.expires,rcode:k.response.data.use_r_code,mine:k.response.data.my_r_code}));
                                    $scope.randomid = Math.floor(Math.random() * 15252522555);
                                    localStorage.setItem('UserData', JSON.stringify({user_id: response.response.data.id, email: profileresponse.email, uniqueID: $scope.randomid, fname: response.response.data.fname, lname: response.response.data.lname, image: $rootScope.profilepic, phone: response.response.data.phone, plan_id: response.response.data.subscription_plan_id, expires: $scope.expires, active_plan: response.response.data.is_activeplan, rcode: response.response.data.use_r_code, mine: response.response.data.my_r_code}));
                                    if ($window.localStorage.getItem('UserData'))
                                        if (JSON.parse($window.localStorage.getItem('UserData')).plan_id == 0 && JSON.parse($window.localStorage.getItem('UserData')).active_plan == 0)
                                            $state.go('menu.subscription');
                                        else
                                            $state.go('menu.nearestRestaurants', {id: JSON.parse($window.localStorage.getItem('UserData')).plan_id})

                                    $ionicLoading.hide();
                                    // $window.location.reload();
                                })


                            },
                            function (errorres) {
                                info.reject(response);
                            }
                    );
                };

                $scope.facebookSignIn = function () {
                    //alert("Signing in");
                    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 3000});
                    facebookConnectPlugin.login(["email", "public_profile"], fbLoginSuccess,
                            function loginError(error) {
                                //alert(JSON.stringify(error))
                            });
                };

                $scope.startApp = function () {

                    $state.go('main');

                };

                $scope.next = function () {

                    $ionicSlideBoxDelegate.next();

                };

                $scope.previous = function () {

                    $ionicSlideBoxDelegate.previous();

                };



                // Called each time the slide changes

                $scope.slideChanged = function (index) {

                    $scope.slideIndex = index;

                };
								
				
			 link = BASE + 'api/staticpages/index.json';
                $http.post(link, {StaticPages: {pos: "homecon"}}, $rootScope.cntype)
                        .success(function (response) {
                            console.log(response);
                            $scope.static = response.staticpages[0];
                        });

            }])

        .controller('createProfileCtrl', ['$scope', '$stateParams', '$http', 'BASE', '$ionicLoading', '$state', '$ionicPopup', '$ionicModal', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

// You can include any angular dependencies as parameters for this function

// TIP: Access Route Parameters for your page via $stateParams.parameterName

            function ($scope, $stateParams, $http, BASE, $ionicLoading, $state, $ionicPopup, $ionicModal) {
                
                
                // privacy policy model
                
                $ionicModal.fromTemplateUrl('templates/privicy_p.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                  }).then(function(modal) {
                    $scope.modal = modal;
                  });
                  $scope.openModal = function() {
                    $scope.modal.show();
                  };
                  $scope.closeModal = function() {
                    $scope.modal.hide();
                  };
                // privacy policy model end

                $scope.data = [];
                $scope.register = function () {
                    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 3000});
                    $scope.data = {User: {fname: $scope.data.fname,
                            username: $scope.data.email,
                            lname: $scope.data.lname,
                            email: $scope.data.email,
                            password: $scope.data.password,
                            phone: $scope.data.phone}};
                    $http.post(BASE + 'api/users/add.json', $scope.data, {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    }).success(function (responseData) {
                        console.log(responseData);
                        $ionicLoading.hide();
                        console.log(responseData.response.isSucess);
                        if (responseData.response.isSucess == "true")
                        {
                            $ionicPopup.alert({
                                title: 'Success',
                                template: "Registration successful"
                            });
                            $state.go('menu.signin');
                        }
                        else if (responseData.response.isSucess == "false")
                        {
                            $ionicPopup.alert({
                                title: 'Oops!',
                                template: "Unable to register"
                            });
                        }
                        else
                        {
                            $ionicPopup.alert({
                                title: 'Oops!',
                                template: responseData.response.msg
                            });
                        }
                    }).error(function (error) {
                        console.log(error);
                    });

                }

            }])

        .controller('menuCtrl', ['$scope', '$stateParams', '$window', '$state', '$ionicLoading', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

// You can include any angular dependencies as parameters for this function

// TIP: Access Route Parameters for your page via $stateParams.parameterName

            function ($scope, $stateParams, $window, $state, $ionicLoading, $timeout) {
                $scope.$on('$ionicView.beforeEnter', function () {
                    if ($window.localStorage.getItem('UserData'))
                    {

                        $scope.User = JSON.parse($window.localStorage.getItem('UserData'));
                        console.log($scope.User);
                        $scope.id = $scope.User.user_id;
                        $scope.plan_id = $scope.User.plan_id;
                        $scope.expires = $scope.User.expires;
                        if ($scope.plan_id == 0)
                            $scope.plan = "Not Subscribed yet!";
                        else if ($scope.plan_id == 1)
                            $scope.plan = "LifeStyle";
                        else if ($scope.plan_id == 2)
                            $scope.plan = "LifeStlye PLUS";
                        else if ($scope.plan_id == 3)
                            $scope.plan = "Private";
                        document.getElementById('plan').innerHTML = $scope.plan;
                        $ionicLoading.hide();
                    }
                })


                $scope.logout = function () {
                    $window.localStorage.clear();
                    $state.go('menu.slider');
//$window.localStorage.setItem('UserData',null);
                    //$window.location.reload();
                }

                $scope.website = function (url) {
                    // alert(url);
                    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 5000});
                    var ref = cordova.InAppBrowser.open(url, '_blank', 'location=no');
// some time later...
                    ref.show();
                }

            }])


        .controller('nearestRestaurantsCtrl', ['$scope', '$stateParams', '$ionicModal', '$ionicSlideBoxDelegate', '$window', '$http', 'BASE', '$ionicPopup', '$ionicLoading', '$rootScope', '$ionicPopup', '$ionicHistory','$state',
            function ($scope, $stateParams, $ionicModal, $ionicSlideBoxDelegate, $window, $http, BASE, $ionicPopup, $ionicLoading, $rootScope, $ionicPopup, $ionicHistory,$state) {
                $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 10000});
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
                $scope.plan_id = JSON.parse($window.localStorage.getItem('UserData')).plan_id;
                $scope.user_id = JSON.parse($window.localStorage.getItem('UserData')).user_id;
                $scope.dinnertime = [];
                $scope.all = [];
                $scope.activeplan = JSON.parse($window.localStorage.getItem('UserData')).active_plan;
                $scope.tocart = $stateParams;
                if ($stateParams.id == "3")
                    $scope.show = true;
                console.log("active plan:", $scope.plan_id);
                if ($stateParams.id == $scope.plan_id && $scope.activeplan == 1)
                    $scope.showSelection = true;
                console.log($scope.showSelection);
                $scope.data = {};

                $scope.lunch = function (dayname, pid) {
                    var type = 'lunch-' + dayname;
                    k[type] = pid;
                    console.log("lunch" + k);
                    localStorage.setItem('all', JSON.stringify(k));
                }
                var k = {};
                $scope.dinner = function (dayname, pid) {
                    var type = 'dinner-' + dayname;
                    k[type] = pid;
                    console.log("dinner" + type);
                    localStorage.setItem('all', JSON.stringify(k));
                }
                $scope.data = [];
                $scope.create_order = function ()
                {
                    $scope.quantity = {};
                    // if (localStorage.getItem('all')) {
                    $scope.all = JSON.parse(localStorage.getItem('all'));
//                        if (localStorage.getItem('lunch'))
//                            $scope.llunch = JSON.parse(localStorage.getItem('lunch'));
//                        if (localStorage.getItem('dinner'))
//                            $scope.ddinner = JSON.parse(localStorage.getItem('dinner'));
//                        if ($scope.all.lunch == null)
//                            $scope.quantity.lunch = 0;
//                        else
//                            $scope.quantity.lunch = 1;
//                        if ($scope.all.dinner == null)
//                            $scope.quantity.dinner = 0;
//                        else
//                            $scope.quantity.dinner = 1;
//                    }
//                    if ($scope.llunch)
//                        if ($scope.all.lunch == $scope.llunch.id)
//                            $scope.lcustom = $scope.llunch.lunch;
//                        else
//                            $scope.lcustom = null;
//                    console.log($scope.ddinner);
//                    if ($scope.ddinner)
//                        if ($scope.all.dinner == $scope.ddinner.id)
//                            $scope.dcustom = $scope.ddinner.dinner;
//                        else
//                            $scope.dcustom = null;
                    // $scope.day = localStorage.getItem('day');
                    $scope.mytimeslot = JSON.parse(localStorage.getItem('mytimeslot'));
                    $scope.myaddress = JSON.parse(localStorage.getItem('myaddress'));
                    $scope.all = {uid: $scope.user_id, food: $scope.all, address: $scope.myaddress, timeslot: $scope.mytimeslot};
                    console.log($scope.all);
                    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 10000});
                    $http.post(BASE + 'api/Users/changeschedule.json', $scope.all, $rootScope.cntype).success(function (response) {
                        console.log(response);
                        $rootScope.dayarray = [];
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Success',
                            template: "Schedule for the day is updated Successfully"
                        });
                    });
                }
                $scope.lunchtime = [];
                $http.post(BASE + 'api/Timeslots/index.json').success(function (response)
                {
                    for (var i = 0; i < response.timeslots.length; i++)
                    {
                        if (response.timeslots[i].category_id == 8)
                            $scope.lunchtime.push(response.timeslots[i]);
                        if (response.timeslots[i].category_id == 9)
                            $scope.dinnertime.push(response.timeslots[i]);
                    }
                    var o = {};
                    if ($scope.lunchtime[1].timeslot) {
                        var type = 'lunch-' + localStorage.getItem('day');
                        o[type] = $scope.lunchtime[1].timeslot;
                    } else {
                        var type = 'dinner-' + localStorage.getItem('day');
                        o[type] = $scope.dinnertime[1].timeslot;
                    }
                    console.log("mytimeslot" + type);
                    localStorage.setItem('mytimeslot', JSON.stringify(o));
                });
                var m = {};
                $scope.timechangedinner = function (tmeslt) {

                    var type = 'dinner-' + localStorage.getItem('day');
                    m[type] = tmeslt;
                    console.log("mytimeslot" + type);
                    localStorage.setItem('mytimeslot', JSON.stringify(m));
                }
               // var n = {};
                $scope.timechangelunch = function (tmeslt) {

                    var type = 'lunch-' + localStorage.getItem('day');
                    m[type] = tmeslt;
                    console.log("mytimeslot" + type);
                    localStorage.setItem('mytimeslot', JSON.stringify(m));
                }

                $scope.addresses = [];
                $http.post(BASE + 'api/addresses/viewall.json', {Address: {user_id: $scope.user_id}}, $rootScope.cntype).success(function (response)
                {
                    console.log(response);
                    for (var i = 0; i < response.response.data.length; i++)
                        $scope.addresses.push(response.response.data[i])
                    var k = {};
                    if ($scope.addresses[1].id) {
                        var type = 'lunch-' + localStorage.getItem('day');
                        k[type] = $scope.addresses[1].id;
                    } else {
                        var type = 'dinner-' + localStorage.getItem('day');
                        k[type] = $scope.addresses[0].id;
                    }
                    console.log("myaddress" + type);
                    localStorage.setItem('myaddress', JSON.stringify(k));

                    // $scope.data.laddress_id = $scope.addresses[1].id;
                    //$scope.data.daddress_id = $scope.addresses[0].id;
                });
                var p = {};
                $scope.addressdinner = function (addr) {
                    var type = 'dinner-' + localStorage.getItem('day');
                    p[type] = addr;
                    console.log("mytimeslot" + type);
                    localStorage.setItem('myaddress', JSON.stringify(p));
                }
                //var q = {};
                $scope.addresslunch = function (addr) {

                    var type = 'lunch-' + localStorage.getItem('day');
                    p[type] = addr;
                    console.log("mytimeslot" + type);
                    localStorage.setItem('myaddress', JSON.stringify(p));
                }

                $ionicModal.fromTemplateUrl('templates/search.html', {
                    scope: $scope,
                    animation: 'slide-in-up',
                }).then(function (modal) {

                    $scope.modal = modal;

                });



                $scope.openModal = function () {

                    $scope.modal.show();

                };



                $scope.closeModal = function () {

                    $scope.modal.hide();
                    $rootScope.locations = [];
                    $scope.data.address = [];

                };



                //Cleanup the modal when we're done with it!

                $scope.$on('$destroy', function () {

                    $scope.modal.remove();

                });



                // Execute action on hide modal

                $scope.$on('modal.hidden', function () {

                    // Execute action

                });



                // Execute action on remove modal

                $scope.$on('modal.removed', function () {

                    // Execute action

                });



                // For Filtr Tab

                $ionicModal.fromTemplateUrl('templates/customize.html', {
                    scope: $scope,
                    animation: 'slide-in-up',
                }).then(function (modal) {

                    $scope.modal1 = modal;

                });

                $scope.openModal1 = function (pid, name, day, type) {
                    $scope.name = name;
                    $rootScope.pid = pid;
                    $rootScope.type = type;
                    console.log(pid, name, day, type);
                    $scope.modal1.show();
                    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 10000});
                    $http.post(BASE + 'api/AssoProducts/view.json', {pid: pid}, $rootScope.cntype).success(function (response) {
                        console.log(response);
                        var cat = [];
                        $scope.asso[0] = [];
                        cat[0] = response.Assoproduct.asso[0].asso_category_id;
                        $ionicLoading.hide();
                        for (var i = 0; i < response.Assoproduct.asso.length; i++)
                        {
                            console.log(cat);
                            console.log(in_array(cat, response.Assoproduct.asso[i].asso_category_id));
                            if (in_array(cat, response.Assoproduct.asso[i].asso_category_id) === false)
                            {
                                cat.push(response.Assoproduct.asso[i].asso_category_id);
                                index = in_array(cat, response.Assoproduct.asso[i].asso_category_id)
                                console.log("index1:", index)
                                $scope.asso[index] = [];
                                $scope.asso[index].push(response.Assoproduct.asso[i]);
                            }
                            else
                            {
                                index = in_array(cat, response.Assoproduct.asso[i].asso_category_id);
                                console.log("index2:", index)
                                $scope.asso[index].push(response.Assoproduct.asso[i]);
                            }
                        }
                        console.log($scope.asso);

                    })
                };

                $scope.closeModal1 = function () {

                    $scope.modal1.hide();

                };
                $scope.asso = [];

                $rootScope.customize = {};

                function in_array(a, k)
                {
                    for (var m = 0; m < a.length; m++)
                        if (a[m] == k)
                            return m;
                    return false;
                }
                function ain_array(a, k)
                {
                    for (var m = 0; m < a.length; m++)
                        if (a[m] == k)
                            return true;
                    return false;
                }
                $scope.custom = function (type, pid, id)
                {
                    console.log(type, pid, id);
                    if (type == 'lunch')
                    {
                        if ($rootScope.customize.lunch == undefined)
                            $rootScope.customize.lunch = [];
                        if (!ain_array($rootScope.customize.lunch, id))
                            $rootScope.customize.lunch.push(id);
                        else
                        {
                            var index = $rootScope.customize.lunch.indexOf(id);
                            $rootScope.customize.lunch.splice(index, 1);
                        }
                        console.log($rootScope.customize.lunch);
                        localStorage.setItem('lunch', JSON.stringify({lunch: $rootScope.customize.lunch, id: pid}));
                    }
                    if (type == 'dinner')
                    {
                        if ($rootScope.customize.dinner == undefined)
                            $rootScope.customize.dinner = [];
                        if (!ain_array($rootScope.customize.dinner, id))
                            $rootScope.customize.dinner.push(id);
                        else
                        {
                            var index = $rootScope.customize.dinner.indexOf(id);
                            $rootScope.customize.dinner.splice(index, 1);
                        }
                        console.log($rootScope.customize.dinner);
                        localStorage.setItem('dinner', JSON.stringify({dinner: $rootScope.customize.dinner, id: pid}));
                    }
                    console.log($rootScope.customize);
                    //localStorage.setItem('customize',$rootScope.customize);
                }
                $scope.day = "SUNDAY";
                localStorage.setItem('day', "Sunday");
                $scope.slideHasChanged = function (index) {
                    localStorage.removeItem('all');
                    localStorage.setItem('all', JSON.stringify({lunch: null, dinner: null}));
                    localStorage.setItem('customize', JSON.stringify({lunch: null, dinner: null}));
                    switch (index) {

                        case 0:

                            $scope.day = "SUNDAY"
                            localStorage.setItem('day', "Sunday");
                            break;

                        case 1:

                            $scope.day = "MONDAY"
                            localStorage.setItem('day', "Monday");
                            break;

                        case 2:

                            $scope.day = "TUESDAY"
                            localStorage.setItem('day', "Tuesday");
                            break;

                        case 3:

                            $scope.day = "WEDNESDAY"
                            localStorage.setItem('day', "Wednesday");
                            break;

                        case 4:

                            $scope.day = "THRUSDAY"
                            localStorage.setItem('day', "Thursday");
                            break;

                        case 5:

                            $scope.day = "FRIDAY"
                            localStorage.setItem('day', "Friday");
                            break;

                        case 6:

                            $scope.day = "SATURDAY"
                            localStorage.setItem('day', "Saturday");
                            break;

                    }

                }





                // Called to navigate to the main app

                $scope.startApp = function () {

                    $state.go('main');

                };

                $scope.next = function () {

                    $ionicSlideBoxDelegate.next();

                };

                $scope.previous = function () {

                    $ionicSlideBoxDelegate.previous();

                };



                // Called each time the slide changes

                $scope.slideChanged = function (index) {

                    $scope.slideIndex = index;

                };
                $scope.getproducts = function (plan, lat, lng, uid) {
                    $scope.ldata =
                            {
                                Plan: {
                                    id: plan
                                }, lat: lat, long: lng, uid: uid};

                    console.log($scope.ldata);

                    $http.post(BASE + 'api/products/view.json', $scope.ldata, $rootScope.cntype).success(function (response) {
                        console.log(response);
                        $scope.dan = response.products.pro;
                        $scope.schedule = response.products.schedule;
                        if ($scope.dan != null) {
                            for (var i = 0; i < $scope.dan.length; i++)
                            {
                                $scope.dan[i][0] = [];
                                $scope.dan[i][1] = [];
                                for (var j = 0; j < $scope.dan[i].products.length; j++)
                                {
                                    for (var k = 0; k < $scope.schedule.length; k++)
                                        if ($scope.schedule[k].product_id === $scope.dan[i].products[j].id)
                                        {
                                            $scope.dan[i].products[j].checked = true;
                                            console.log($scope.dan[i].products[j]);
                                        }

                                    if ($scope.dan[i].products[j].category_id == 8)
                                        $scope.dan[i][0].push($scope.dan[i].products[j]);
                                    else if ($scope.dan[i].products[j].category_id == 9)
                                        $scope.dan[i][1].push($scope.dan[i].products[j]);
                                }
                            }
                            // console.log("here"+$scope.dan);
                            $scope.days = $scope.dan;
                        } else {
                        var alertPopup=    $ionicPopup.alert({
                                title: 'Error',
//                                subTitle: 'Oops',
                                template: "<b>Oops !</b><br/> Unfortunately,we do not Plait in the area you’ve selected just yet let us know if you’d like us to deliver your area ",
                                cssClass: 'opps',
                                buttons: [
      { text: '<b>Cancel</b>' },
      {
        text: '<b>OK</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
           $state.go('menu.contactus');
          } else {
            return $scope.data.wifi;
          }
        }
      }
    ]
                            });
//                            alertPopup.then(function(res) {
//                             $state.go('menu.contactus');
//                          });
//                           alertPopup.then(function(res) {
//     if(res) {
//       console.log('You are sure');
//     } else {
//       console.log('You are not sure');
//     }
//   });
                            
                        }
                        console.log($scope.da);
                        $ionicLoading.hide();
                    });
                }
                $scope.shew = function (k, l) {
                    if (k && l)
                        return true;
                    else
                        return false;
                }
                var onSuccess = function (position) {

                    // alert("success");
                    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 3000});
                    ;
                    console.log(position);
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    localStorage.setItem('lat', JSON.stringify(lat));
                    localStorage.setItem('lng', JSON.stringify(lng));
                    console.log(lat);
                    console.log(lng);
                    var geocoder = new google.maps.Geocoder();
                    var latlng = new google.maps.LatLng(lat, lng);
                    $scope.userid = JSON.parse($window.localStorage.getItem('UserData')).user_id;
                    $scope.getproducts($stateParams.id, lat, lng, $scope.userid);
                    var request = {
                        latLng: latlng
                    };

                    geocoder.geocode(request, function (data, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (data[0] != null) {
                                //alert("address is: " + data[0].formatted_address);
                                document.getElementById('place').innerHTML = data[0].formatted_address;
                            } else {
                                alert("No address available");
                            }
                        }
                    })
                    console.log(position);
                };
                function onError(error) {
                    $scope.days = [];
                    $ionicPopup.alert({
                        title: 'Error',
                        template: "Unable to take your location! please turn on your Gps and try again "
                    });
                    $ionicLoading.hide();
                }
                $scope.location = function ()
                {   // alert("location");
                    var posOptions = {timeout: 10000, enableHighAccuracy: false};
                    navigator.geolocation.getCurrentPosition(onSuccess, onError, posOptions);
                }

                if (localStorage.getItem('lat') && localStorage.getItem('lng')) {
                    var lat = localStorage.getItem('lat');
                    var lng = localStorage.getItem('lng');
                    var geocoder = new google.maps.Geocoder();
                    var latlng = new google.maps.LatLng(lat, lng);
                    $scope.userid = JSON.parse($window.localStorage.getItem('UserData')).user_id;
                    $scope.getproducts($stateParams.id, lat, lng, $scope.userid);
                    var request = {
                        latLng: latlng
                    };

                    geocoder.geocode(request, function (data, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (data[0] != null) {
                                //alert("address is: " + data[0].formatted_address);
                                document.getElementById('place').innerHTML = data[0].formatted_address;
                            } else {
                                alert("No address available");
                            }
                        }
                    })
                }
                else {
                    $scope.location();
                }


            }])




        .controller('historyCtrl', ['$scope', '$stateParams', 'BASE', '$http', '$rootScope', '$ionicPopup', '$ionicLoading',
            function ($scope, $stateParams, BASE, $http, $rootScope, $ionicPopup, $ionicLoading) {
                $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 10000});
                $scope.showConfirm = function () {
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Rating',
                        template: '<div class="ratng"> <h4> How did you love our catering experience?</h4><span class="star_icons1"> <i class="ion-android-star"> </i><i class="ion-android-star"> </i><i class="ion-android-star"> </i><i class="ion-android-star"> </i><i class="ion-android-star-outline"> </i></span></div><div class="input_hst"><span class="comments_pop">Comments </span> <textarea placeholder="Comments"> </textarea> </div>',
                        cssClass: 'custombutton3',
                    });
                    confirmPopup.then(function (res) {
                        if (res) {
                            console.log('You are sure');
                            $state.go('menu.checkout');
                        } else {
                            console.log('You are not sure');
                        }
                    });
                };


                $http.post(BASE + 'api/orders/history.json', $scope.data, $rootScope.cntype).success(function (response) {
                    $ionicLoading.hide();
                    console.log(response);
                    $scope.orders = response.order.data;
                    console.log($scope.orders);
                });


            }])


        .controller('profileCtrl', ['$scope', '$stateParams', '$window', 'BASE', '$http', '$rootScope', '$ionicPopup', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

// You can include any angular dependencies as parameters for this function

// TIP: Access Route Parameters for your page via $stateParams.parameterName

            function ($scope, $stateParams, $window, BASE, $http, $rootScope, $ionicPopup, $ionicLoading) {
                $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 10000});
                $scope.point = function () {
                    $ionicPopup.alert({
                        title: 'How Referral works',
                        template: "Refer someone and You will be awarded points.Highest point result in "
                    });
                }
                $scope.user = JSON.parse(localStorage.getItem('UserData')).user_id;
                $http.post(BASE + 'api/users/wallet.json', {uid: $scope.user}, $rootScope.cntype).success(function (response) {
                    console.log(response);
                    $ionicLoading.hide();
                    $scope.points = response.data[0].points * 1;
                })
                if (JSON.parse($window.localStorage.getItem('UserData')))
                {
                    $scope.User = JSON.parse($window.localStorage.getItem('UserData'));
                    console.log($scope.User);
                }
                $scope.share = function () {
                    var options = {
                        //message: 'share this', // not supported on some apps (Facebook, Instagram)
                        subject: 'the subject', // fi. for email
                        //files: ['', ''], // an array of filenames either locally or remotely
                        url: 'https://www.website.com/foo/#bar?a=b',
                        chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
                    }

                    var onSuccess = function (result) {
                        console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
                        console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
                    }

                    var onError = function (msg) {
                        console.log("Sharing failed with message: " + msg);
                    }

                    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
                }
            }])


        .controller('menuFoodCtrl', ['$scope', '$stateParams', '$http', 'BASE', '$rootScope', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

// You can include any angular dependencies as parameters for this function

// TIP: Access Route Parameters for your page via $stateParams.parameterName

            function ($scope, $stateParams, $http, BASE, $rootScope, $ionicLoading) {
                $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 5000});
                $scope.one = $stateParams;
                $scope.alergy = '';
                console.log($scope.one);
                $http.post(BASE + 'api/products/alergy.json', {pid: $stateParams.id}, $rootScope.cntype).success(function (k)
                {
                    $ionicLoading.hide();
                    console.log(k);
                    for (var i = 0; i < k.alergy.alergy.length; i++)
                    {
                        $scope.alergy += k.alergy.alergy[i].name + '  ';
                    }
                });

            }])


        .controller('cart2Ctrl', ['$scope', '$stateParams', 'BASE', '$http', '$rootScope', '$ionicPopup',
            function ($scope, $stateParams, BASE, $http, $rootScope, $ionicPopup) {
                $scope.hide = false;
                $scope.cart = $stateParams;
                $scope.data = [];
                $scope.showr = JSON.parse(localStorage.getItem('UserData')).rcode;
                $scope.uid = JSON.parse(localStorage.getItem('UserData')).user_id;
                $scope.showr = JSON.parse(localStorage.getItem('UserData')).rcode;
                $scope.promocode = function () {
                    console.log({promocode: $scope.data.promo, uid: $scope.uid});
                    $http.post(BASE + 'api/Promocodes/applypcode.json', {promocode: $scope.data.promo, uid: $scope.uid}, $rootScope.cntype).success(function (response) {
                        console.log(response);

                        $ionicPopup.alert({
                            title: 'Success',
                            template: response.pr.msg
                        });
                        if (response.pr.subtotal) {
                            localStorage.setItem('cartDetails', JSON.stringify(response.pr.subtotal));
                            //showDiscount=true;
                            document.getElementById('subtotal').innerHTML = response.pr.subtotal.subtotal;
                            document.getElementById('discount').innerHTML = "-" + ((response.pr.subtotal.total * 1) - (response.pr.subtotal.subtotal * 1));
                        }
                    })
                }
                $http.post(BASE + 'api/Users/cart.json', {pid: $stateParams.id, uid: $scope.uid}, $rootScope.cntype).success(function (response) {
                    console.log(response);
                    localStorage.setItem('cartDetails', JSON.stringify(response.cart));
                })
                $scope.refer = function () {
                    $http.post(BASE + 'api/Users/referral.json', {refer: $scope.data.refer, uid: $scope.uid}, $rootScope.cntype).success(function (response) {
                        console.log(response);
                        console.log(response.data.points);
                        if (response.data.points)
                        {
                            $scope.user = JSON.parse(localStorage.getItem('UserData'));
                            $scope.user.rcode = true;
                            console.log($scope.user);
                            localStorage.setItem('UserData', JSON.stringify($scope.user));
                        }

                        $ionicPopup.alert({
                            title: 'Success',
                            template: response.data.msg
                        });
                    })
                }
            }])

        .controller('paymentCtrl', ['$scope', '$stateParams', 'BASE', '$http', '$rootScope', '$state',
            function ($scope, $stateParams, BASE, $http, $rootScope, $state) {


                $scope.make_payment = function ()
                {
                    $scope.cartDetails = JSON.parse(localStorage.getItem('cartDetails'));
                    //alert(JSON.stringify($scope.cartDetails));
                    var ref = cordova.InAppBrowser.open(BASE + "payment2/index.php?cart_id=" + $scope.cartDetails.id + "&sendit=1", '_blank', 'hidden=yes,toolbar=no,location=no');
                    ref.show();
                    ref.addEventListener('loadstart', function (event) {
                        if (event.url.match(BASE + "confirmation")) {
                            ref.close();
                            $state.go('menu.confirmation');
                        }
                    });
                }

            }])


        .controller('confirmationCtrl', ['$scope', '$stateParams', '$http', '$rootScope', '$ionicLoading', 'BASE', '$window', '$ionicHistory',
            function ($scope, $stateParams, $http, $rootScope, $ionicLoading, BASE, $window, $ionicHistory) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
                $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 10000});
                ;
                $scope.uid = JSON.parse(localStorage.getItem('UserData')).user_id;
                console.log($scope.uid);
                $http.post(BASE + 'api/Users/confirmation.json', {uid: $scope.uid}, $rootScope.cntype).success(function (response) {
                    $ionicLoading.hide();
                    console.log(response);
                    if (response.confirm.status == true) {
                        $scope.randomid = Math.floor(Math.random() * 15252522555);
                        $rootScope.id = response.confirm.data.user.id;
                        $scope.address_id = JSON.parse(localStorage.getItem('address_id'));
                        localStorage.setItem('UserData', JSON.stringify({user_id: response.confirm.data.user.id, email: response.confirm.data.user.email, uniqueID: $scope.randomid, fname: response.confirm.data.user.fname, lname: response.confirm.data.user.lname, image: 'http://plait.co.za/webroot/user/' + response.confirm.data.user.image, phone: response.confirm.data.user.phone, plan_id: response.confirm.data.user.subscription_plan_id, active_plan: response.confirm.data.user.is_activeplan, expires: response.confirm.plan.expireon.substr(0, 10), rcode: response.confirm.data.user.use_r_code, mine: response.confirm.data.user.my_r_code}));
                        if (response.confirm.data.user.subscription_plan_id == 1)
                            $scope.plan_name = "LifeStlye";
                        else if (response.confirm.data.user.subscription_plan_id == 2)
                            $scope.plan_name = "LifeStlye PLUS";
                        else if (response.confirm.data.user.subscription_plan_id == 3)
                            $scope.plan_name = "Private";
                        $scope.pay = response.confirm.data.payment;
                    }
                    $http.post(BASE + 'api/Users/weeklyschedule.json', {uid: $scope.uid, plan_id: response.confirm.data.user.subscription_plan_id, address_id: $scope.address_id}, $rootScope.cntype).success(function (response) {
                        console.log(response);
                    })
                });

            }])





        .controller('editinfoCtrl', ['$scope', '$stateParams', '$window', '$ionicLoading', '$http', 'URL', '$ionicPopup', '$state', '$rootScope', 'BASE', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

// You can include any angular dependencies as parameters for this function

// TIP: Access Route Parameters for your page via $stateParams.parameterName

            function ($scope, $stateParams, $window, $ionicLoading, $http, URL, $ionicPopup, $state, $rootScope, BASE) {

                $scope.data = [];

                $scope.User = JSON.parse($window.localStorage.getItem('UserData'));
                console.log($scope.User);
                $scope.data.fname = $scope.User.fname;
                $scope.data.lname = $scope.User.lname;
                $scope.data.phone = $scope.User.phone * 1;


                $scope.edit = function ()
                {
                    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 3000});
                    ;
                    $scope.userid = JSON.parse($window.localStorage.getItem('UserData')).user_id;
                    $scope.cdata = {User: {id: $scope.userid, phone: $scope.data.phone, fname: $scope.data.fname, lname: $scope.data.lname}};
                    console.log($scope.cdata);
                    $http.post(BASE + 'api/users/edit.json', $scope.cdata, $rootScope.cntype).success(function (k)
                    {
                        console.log(k);
                        //$scope.detail=k.response.data;
                        if (k.response.msg = "success")
                        {
                            $scope.User = JSON.parse($window.localStorage.getItem('UserData'));
                            $scope.User.fname = $scope.data.fname = k.response.data.fname;
                            $scope.User.lname = $scope.data.lname = k.response.data.lname;
                            $scope.User.phone = $scope.data.phone = k.response.data.phone;
                            $window.localStorage.setItem('UserData', JSON.stringify($scope.User));
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'Success',
                                template: "Profile is Successfully Updated"
                            });
                            $state.go('menu.profile');
                            $window.location.reload();
                        }
                    });
                }
                $scope.getPicture = function (options) {

                    function onSuccess(imageData) {

                        $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 3000});
                        ;
                        $rootScope.dataImg = imageData;
                        $scope.userid = JSON.parse($window.localStorage.getItem('UserData')).user_id;
                        $scope.profiledata = {User: {id: $scope.userid, image: $rootScope.dataImg}};
                        $http.post(BASE + 'api/users/updateimage.json', $scope.profiledata, $rootScope.cntype).success(function (k)
                        {
                            //alert(JSON.stringify(k));
                            $ionicLoading.hide();
                            if (k.response.isSucess == "true")
                            {
                                $scope.User = JSON.parse($window.localStorage.getItem('UserData'));
                                $scope.User.image = k.response.data.image;
                                $window.localStorage.setItem('UserData', JSON.stringify($scope.User));
                                $ionicPopup.alert({
                                    title: 'Success',
                                    template: k.response.msg
                                });
                                $state.go('menu.profile');
                                $window.location.reload();
                            }
                            else {
                                $ionicPopup.alert({
                                    title: 'Oops',
                                    template: 'Some error occured'
                                });
                            }
                        }).error(function (error) {
                            // alert(JSON.stringify(error));
                            $ionicLoading.hide();
                        });
                    }

                    function onError() {
                        alert("Some error occured");
                    }
                    var options = {
                        quality: 60,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: 0,
                        allowEdit: true,
                        encodingType: Camera.EncodingType.JPEG,
                        popoverOptions: CameraPopoverOptions,
                        saveToPhotoAlbum: false,
                        correctOrientation: true
                    };
                    navigator.camera.getPicture(onSuccess, onError, options);

                }



            }])


        .controller('changepasswordCtrl', ['$scope', '$stateParams', '$ionicLoading', 'BASE', '$http', '$window', '$ionicPopup', '$state', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

// You can include any angular dependencies as parameters for this function

// TIP: Access Route Parameters for your page via $stateParams.parameterName

            function ($scope, $stateParams, $ionicLoading, BASE, $http, $window, $ionicPopup, $state, $rootScope) {
                $scope.data = [];
                $scope.changepassword = function ()
                {
                    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 3000});
                    $scope.userid = JSON.parse($window.localStorage.getItem('UserData')).user_id;
                    $scope.fdata = {
                        User: {
                            id: $scope.userid,
                            old_password: $scope.data.opass,
                            new_password: $scope.data.npass
                        }
                    };
                    $http.post(BASE + 'api/users/changepassword.json', $scope.fdata, $rootScope.cntype).success(function (k) {
                        console.log(k);
                        $ionicLoading.hide();
                        if (k.response.isSucess == "true")
                        {
                            $ionicPopup.alert({
                                title: 'Success!',
                                template: "Password Updated Successfully"
                            });
                            $state.go('menu.profile')
                        }
                        else if (k.response.isSucess == "false")
                        {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Oops!',
                                template: k.response.msg
                            });
                        }

                    })
                }

            }])

        .controller('subscriptionCtrl', ['$scope', '$stateParams', '$ionicLoading', '$http', 'BASE', '$rootScope', '$state', '$ionicHistory',
            function ($scope, $stateParams, $ionicLoading, $http, BASE, $rootScope, $state, $ionicHistory) {
                //alert(localStorage.getItem('UserData'));
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
                $ionicLoading.show();
                $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 3000});
                $http.post(BASE + 'api/SubscriptionPlans/view.json').success(function (response)
                {
                    console.log(response);
                    $scope.splans = response.splans;
                    $ionicLoading.hide();
                });
                $scope.plans = function (id, plan, k, price, image) {
                    $state.go('menu.classic', {id: id, plan: plan, desc: k});
                }
            }])



        .controller('classicCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

// You can include any angular dependencies as parameters for this function

// TIP: Access Route Parameters for your page via $stateParams.parameterName

            function ($scope, $stateParams) {

                console.log($stateParams);

                $scope.splan = $stateParams;

            }])







        .controller('customizeCtrl', ['$scope', '$stateParams', '$http', 'BASE', '$rootScope', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

// You can include any angular dependencies as parameters for this function

// TIP: Access Route Parameters for your page via $stateParams.parameterName

            function ($scope, $stateParams, $http, BASE, $rootScope, $ionicLoading) {
                $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 10000});
                $scope.asso = [];
                $scope.name = $stateParams.name;
                $rootScope.customize = {};

                function in_array(a, k)
                {
                    for (var m = 0; m < a.length; m++)
                        if (a[m] == k)
                            return m;
                    return false;
                }
                function ain_array(a, k)
                {
                    for (var m = 0; m < a.length; m++)
                        if (a[m] == k)
                            return true;
                    return false;
                }
                $scope.custom = function (id)
                {
                    if ($stateParams.type == 'lunch')
                    {
                        if ($rootScope.customize.lunch == undefined)
                            $rootScope.customize.lunch = [];
                        if (!ain_array($rootScope.customize.lunch, id))
                            $rootScope.customize.lunch.push(id);
                        else
                        {
                            var index = $rootScope.customize.lunch.indexOf(id);
                            $rootScope.customize.lunch.splice(index, 1);
                        }
                        console.log($rootScope.customize.lunch);
                        localStorage.setItem('lunch', JSON.stringify({lunch: $rootScope.customize.lunch, id: $stateParams.pid}));
                    }
                    if ($stateParams.type == 'dinner')
                    {
                        if ($rootScope.customize.dinner == undefined)
                            $rootScope.customize.dinner = [];
                        if (!ain_array($rootScope.customize.dinner, id))
                            $rootScope.customize.dinner.push(id);
                        else
                        {
                            var index = $rootScope.customize.dinner.indexOf(id);
                            $rootScope.customize.dinner.splice(index, 1);
                        }
                        console.log($rootScope.customize.dinner);
                        localStorage.setItem('dinner', JSON.stringify({dinner: $rootScope.customize.dinner, id: $stateParams.pid}));
                    }
                    console.log($rootScope.customize);
                    //localStorage.setItem('customize',$rootScope.customize);
                }




                $http.post(BASE + 'api/AssoProducts/view.json', {pid: $stateParams.pid}, $rootScope.cntype).success(function (response) {
                    console.log(response);
                    var cat = [];
                    $scope.asso[0] = [];
                    cat[0] = response.Assoproduct.asso[0].asso_category_id;
                    $ionicLoading.hide();
                    for (var i = 0; i < response.Assoproduct.asso.length; i++)
                    {
                        console.log(cat);
                        console.log(in_array(cat, response.Assoproduct.asso[i].asso_category_id));
                        if (in_array(cat, response.Assoproduct.asso[i].asso_category_id) === false)
                        {
                            cat.push(response.Assoproduct.asso[i].asso_category_id);
                            index = in_array(cat, response.Assoproduct.asso[i].asso_category_id)
                            console.log("index1:", index)
                            $scope.asso[index] = [];
                            $scope.asso[index].push(response.Assoproduct.asso[i]);
                        }
                        else
                        {
                            index = in_array(cat, response.Assoproduct.asso[i].asso_category_id);
                            console.log("index2:", index)
                            $scope.asso[index].push(response.Assoproduct.asso[i]);
                        }
                    }
                    console.log($scope.asso);

                })



            }])



        .controller('changeaddress2Ctrl', ['$scope', '$stateParams', '$http', '$window', 'BASE', '$ionicLoading', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

// You can include any angular dependencies as parameters for this function

// TIP: Access Route Parameters for your page via $stateParams.parameterName

            function ($scope, $stateParams, $http, $window, BASE, $ionicLoading, $rootScope) {

                $scope.viewall = function () {
                    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 3000});
                    ;
                    $scope.userid = JSON.parse($window.localStorage.getItem('UserData')).user_id;
                    $scope.address = {
                        Address: {
                            user_id: $scope.userid
                        }
                    }
                    console.log($scope.address);
                    $http.post(BASE + '/api/addresses/viewall.json', $scope.address, $rootScope.cntype).success(function (response) {
                        $ionicLoading.hide();
                        console.log(response);
                        if (response.response.isSucess == "true")
                            $scope.addres = response.response.data;
                    });

                }
                $scope.viewall();
                $scope.delete = function (id) {
                    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 3000});
                    ;
                    $scope.address = {
                        Address: {
                            id: id
                        }
                    }
                    $http.post(BASE + 'api/addresses/delete.json', $scope.address, $rootScope.cntype).success(function (response) {
                        console.log(response);
                        $ionicLoading.hide();
                        $scope.viewall();
                    })
                }
            }])


        .controller('newaddresses2Ctrl', ['$scope', '$stateParams', '$window', '$http', 'BASE', '$ionicLoading', '$ionicPopup', '$state', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

// You can include any angular dependencies as parameters for this function

// TIP: Access Route Parameters for your page via $stateParams.parameterName

            function ($scope, $stateParams, $window, $http, BASE, $ionicLoading, $ionicPopup, $state, $rootScope) {
                $scope.data = [];
                $scope.add = function () {
                    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 3000});
                    ;
                    $scope.User = JSON.parse($window.localStorage.getItem('UserData'));
                    $scope.data = {
                        Address: {
                            user_id: $scope.User.user_id
                            , addresstype: $scope.data.type
                            , first_name: $scope.data.fname
                            , last_name: $scope.data.lname
                            , email: $scope.User.email
                            , phone: $scope.data.phone
                            , address1: $scope.data.street
                            , address2: ''
                            , state: ''
                            , city: $scope.data.city
                            , country: 'South Africa'
                            , zip: ''
                        }
                    };
                    console.log($scope.data);
                    $http.post(BASE + 'api/addresses/add.json', $scope.data, $rootScope.cntype).success(function (response) {
                        console.log(response);
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Success!',
                            template: "Your address is Successfully added"
                        });
                        $state.go('menu.checkout3');
                    })

                }

            }])



        .controller('checkout3Ctrl', ['$scope', '$stateParams', '$ionicLoading', '$http', '$window', 'BASE', '$rootScope',
            function ($scope, $stateParams, $ionicLoading, $http, $window, BASE, $rootScope) {

                $ionicLoading.show({showDelay: 5000});
                $scope.userid = JSON.parse($window.localStorage.getItem('UserData')).user_id;
                $scope.address = {
                    Address: {
                        user_id: $scope.userid
                    }
                }
                console.log($scope.address);
                $http.post(BASE + 'api/addresses/viewall.json', $scope.address, $rootScope.cntype).success(function (response) {
                    $ionicLoading.hide();
                    console.log(response);
                    if (response.response.isSucess == "true")
                        $rootScope.addres = response.response.data;
                });



            }])



        .controller('SignInCtrl', ['$scope', '$stateParams', '$ionicLoading', '$http', '$window', '$state', 'BASE', '$rootScope', '$ionicPopup',
            function ($scope, $stateParams, $ionicLoading, $http, $window, $state, BASE, $rootScope, $ionicPopup) {

                $scope.data = [];
                $scope.login = function ()
                {
                    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 10000});
                    $scope.ldata = {
                        User: {
                            username: $scope.data.email,
                            password: $scope.data.password
                        }};
                    console.log($scope.ldata);


                    $http.post(BASE + 'api/users/login.json', $scope.ldata, $rootScope.cntype).success(function (k)
                    {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Success!',
                            template: k.response.msg
                        });
                        console.log(k);
                        if (k.response.isSucess == "true")
                        {
                            $scope.randomid = Math.floor(Math.random() * 15252522555);
                            $rootScope.id = k.response.data.id;
                            if (k.response.plan)
                                $scope.expires = k.response.plan.expireon.substr(0, 10);
                            else
                                $scope.expires = null;
                            $window.localStorage.setItem('UserData', JSON.stringify({user_id: k.response.data.id, email: k.response.data.email, uniqueID: $scope.randomid, fname: k.response.data.fname, lname: k.response.data.lname, image: k.response.data.image, phone: k.response.data.phone, plan_id: k.response.data.subscription_plan_id, active_plan: k.response.data.is_activeplan, expires: $scope.expires, rcode: k.response.data.use_r_code, mine: k.response.data.my_r_code}));
                            if ($window.localStorage.getItem('UserData'))
                                if (JSON.parse($window.localStorage.getItem('UserData')).plan_id == 0 && JSON.parse($window.localStorage.getItem('UserData')).active_plan == 0)
                                    $state.go('menu.subscription');
                                else
                                    $state.go('menu.nearestRestaurants', {id: JSON.parse($window.localStorage.getItem('UserData')).plan_id})


                            console.log($rootScope.id);
                        }

                    }).error(function (error)
                    {
                        $ionicLoading.hide();
                        console.log(error);
                    });
                }
                /*$http.post('http://rajdeep.crystalbiltech.com/ecasnik'+'/api/users/loginwork', $scope.ldata,$rootScope.cntype).success(function(response) 
                 {
                 $ionicLoading.hide();
                 $ionicPopup.alert({
                 title: 'Success!',
                 template: response.msg
                 });
                 console.log(response);
                 if(response.status == true)
                 {
                 $scope.randomid = Math.floor(Math.random() * 15252522555);
                 $rootScope.id=response.id;
                 $window.localStorage.setItem('UserData', JSON.stringify({user_id:response.id,email:response.name.email,uniqueID:$scope.randomid,fname:response.name.name,lname:response.name.name,image:response.name.image,phone:response.name.phone}));
                 $state.go('menu.subscription');
                 $window.location.reload();
                 console.log($rootScope.id);
                 }
                 
                 }).error(function(error)
                 {
                 $ionicLoading.hide();
                 console.log(error);
                 });
                 }*/


            }])

        .controller('editaddrCtrl', ['$scope', '$stateParams', '$ionicLoading', '$http', '$ionicPopup', '$window', 'BASE', '$rootScope', '$state',
            function ($scope, $stateParams, $ionicLoading, $http, $ionicPopup, $window, BASE, $rootScope, $state) {
                $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 3000});
                console.log($stateParams.id);
                $scope.data = [];
                $scope.address = {
                    Address: {
                        id: $stateParams.id
                    }
                }
                $http.post(BASE + 'api/addresses/view.json', $scope.address, $rootScope.cntype).success(function (response) {
                    console.log(response);
                    $ionicLoading.hide();
                    $scope.data.fname = response.address.first_name;
                    $scope.data.lname = response.address.last_name;
                    $scope.data.street = response.address.address1;
                    $scope.data.city = response.address.city;
                    $scope.data.phone = (response.address.phone * 1);
                    $scope.data.zip = response.address.zip;
                    $scope.data.country = response.address.country;
                    $scope.data.type = response.address.addresstype;
                })

                $scope.edit = function () {

                    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 3000});
                    ;
                    $scope.User = JSON.parse($window.localStorage.getItem('UserData'));
                    $scope.data = {
                        Address: {
                            id: $stateParams.id
                            , user_id: $scope.User.user_id
                            , addresstype: $scope.data.type
                            , first_name: $scope.data.fname
                            , last_name: $scope.data.lname
                            , email: $scope.User.email
                            , phone: $scope.data.phone
                            , address1: $scope.data.street
                            , address2: ''
                            , state: ''
                            , city: $scope.data.city
                            , country: 'South Africa'
                            , zip: ''
                        }
                    };
                    console.log($scope.data);
                    $http.post(BASE + 'api/addresses/edit.json', $scope.data, $rootScope.cntype).success(function (response) {
                        console.log(response);
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Success!',
                            template: "Your address is Successfully added"
                        });
                        $state.go('menu.checkout3');
                    })

                }



            }])
        .controller('forgetPasswordCtrl', ['$scope', '$stateParams', 'BASE', '$http', '$ionicPopup', '$ionicLoading', '$rootScope',
            function ($scope, $stateParams, BASE, $http, $ionicPopup, $ionicLoading, $rootScope) {
                $scope.data = [];
                $scope.forgetpass = function ()
                {
                    $ionicLoading.show();
                    $scope.user = {
                        email: $scope.data.email
                    };
                    $http.post(BASE + 'users/apiforgetpassword.json', $scope.user, $rootScope.cntype).success(function (response) {
                        console.log(response);
                        $ionicPopup.alert({
                            title: 'Info!',
                            template: response.response.msg
                        });
                        $ionicLoading.hide();
                    })
                }



            }])


        .controller('addaddrCtrl', ['$scope', '$stateParams', '$http', '$ionicLoading', '$ionicPopup', '$rootScope', '$window', 'BASE', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

// You can include any angular dependencies as parameters for this function

// TIP: Access Route Parameters for your page via $stateParams.parameterName

            function ($scope, $stateParams, $http, $ionicLoading, $ionicPopup, $rootScope, $window, BASE, $state) {

                $scope.data = [];
                $scope.add = function () {
                    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 3000});
                    ;
                    $scope.User = JSON.parse($window.localStorage.getItem('UserData'));
                    $scope.data = {
                        Address: {
                            user_id: $scope.User.user_id
                            , addresstype: $scope.data.type
                            , first_name: $scope.data.fname
                            , last_name: $scope.data.lname
                            , email: $scope.User.email
                            , phone: $scope.data.phone
                            , address1: $scope.data.street
                            , address2: ''
                            , state: ''
                            , city: $scope.data.city
                            , country: 'South Africa'
                            , zip: ''
                        }
                    };
                    console.log($scope.data);
                    $http.post(BASE + 'api/addresses/add.json', $scope.data, $rootScope.cntype).success(function (response) {
                        console.log(response);
                        localStorage.setItem('address_id', JSON.stringify(response.response.data.id));
                        $state.go('menu.payment');
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Success!',
                            template: "Your address is Successfully added"
                        });

                    })

                }

            }])

        .controller('searchCtrl', ['$scope', '$stateParams', '$ionicLoading', '$http', '$ionicPopup', '$rootScope', '$window', 'BASE', '$state',
            function ($scope, $stateParams, $ionicLoading, $http, $ionicPopup, $rootScope, $window, BASE, $state) {

                $scope.to = $stateParams;
                $scope.autocompleteOptions = {
                    componentRestrictions: {country: 'ZA'},
                    types: ['geocode']};

                $scope.$on('g-places-autocomplete:select', function (event, param) {

                    console.log(event.targetScope.model.formatted_address);
                    var res = event.targetScope.model.formatted_address.replace(" ", "");
                    console.log(res);
                    $http.post('https://maps.googleapis.com/maps/api/geocode/json?address=(' + res + ')').success(function (rest)
                    {
                        console.log(rest);
                        if (rest.status != "ZERO_RESULTS")
                        {
                            var lat = rest.results[0].geometry.location.lat;
                            var lng = rest.results[0].geometry.location.lng;
                            console.log(rest.results[0].geometry.location.lat);
                            console.log(rest.results[0].geometry.location.lng);
                            localStorage.setItem('lat', JSON.stringify(lat));
                            localStorage.setItem('lng', JSON.stringify(lng));
                            $state.go("menu.nearestRestaurants", {id: $scope.to.id});
                        }
                        else
                        {
                            alert("Unable to find your location");
                        }

                    })
                });
                var onSuccess = function (position)
                {
                    // alert("success");
                    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 3000});
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    console.log(lat);
                    console.log(lng);
                    var geocoder = new google.maps.Geocoder();
                    var latlng = new google.maps.LatLng(lat, lng);
                    $scope.userid = JSON.parse($window.localStorage.getItem('UserData')).user_id;
                    //var lat=-26.199174;
                    //var lng=30.981896;
                    localStorage.setItem('lat', JSON.stringify(lat));
                    localStorage.setItem('lng', JSON.stringify(lng));
                    $state.go("menu.nearestRestaurants", {id: $scope.to.id});
                };
                function onError(error) {
                    $scope.days = [];

                    $ionicPopup.alert({
                        title: 'Error',
                        template: "Unable to take your location! please turn on your Gps and try again "
                    });
                    $ionicLoading.hide();
                }
                $scope.location = function ()
                {
                    // alert("location");
                    var posOptions = {timeout: 10000, enableHighAccuracy: false};
                    navigator.geolocation.getCurrentPosition(onSuccess, onError, posOptions);
                }
                $scope.data = [];
                $scope.place = function ()
                {

                    console.log($scope.data.address.formatted_address);
                    var res = $scope.data.address.formatted_address.replace(" ", "");
                    console.log(res);
                    $http.post('https://maps.googleapis.com/maps/api/geocode/json?address=(' + res + ')').success(function (rest)
                    {
                        console.log(rest);
                        if (rest.status != "ZERO_RESULTS")
                        {
                            var lat = rest.results[0].geometry.location.lat;
                            var lng = rest.results[0].geometry.location.lng;
                            console.log(rest.results[0].geometry.location.lat);
                            console.log(rest.results[0].geometry.location.lng);
                            localStorage.setItem('lat', JSON.stringify(lat));
                            localStorage.setItem('lng', JSON.stringify(lng));
                            $state.go("menu.nearestRestaurants", {id: $scope.to.id});
                        }
                        else
                        {
                            alert("Unable to find your location");
                        }

                    })
                }

            }])
        .controller('aboutCtrl', ['$scope', '$stateParams', 'BASE', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

// You can include any angular dependencies as parameters for this function

// TIP: Access Route Parameters for your page via $stateParams.parameterName

            function ($scope, $stateParams, BASE, $http) {




            }])
        .controller('invitefriendsCtrl', ['$scope', '$stateParams', 'BASE', '$http', '$window', function ($scope, $stateParams, BASE, $http, $window) {


                $scope.mydata = JSON.parse($window.localStorage.getItem('UserData'));
                // console.log("sss"+$scope.mydata.mine);
                $scope.share = function () {
                    var options = {
                        //message: 'share this', // not supported on some apps (Facebook, Instagram)
                        subject: 'the subject', // fi. for email
                        //files: ['', ''], // an array of filenames either locally or remotely
                        url: $scope.mydata.mine,
                        chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
                    }

                    var onSuccess = function (result) {
                        console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
                        console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
                    }

                    var onError = function (msg) {
                        console.log("Sharing failed with message: " + msg);
                    }

                    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
                }


            }])
        .controller('aboutusCtrl', ['$scope', '$stateParams', 'BASE', '$http', '$rootScope', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

// You can include any angular dependencies as parameters for this function

// TIP: Access Route Parameters for your page via $stateParams.parameterName

            function ($scope, $stateParams, BASE, $http, $rootScope, $ionicLoading) {
                $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 10000});
                link = BASE + 'api/staticpages/index.json';
                $http.post(link, {StaticPages: {pos: "aboutus"}}, $rootScope.cntype)
                        .success(function (response) {
                            console.log(response);
                            $scope.static = response.staticpages[0];
                        });




            }])
        .controller('contactusCtrl', ['$scope', '$stateParams', 'BASE', '$http', '$rootScope', '$ionicLoading', '$ionicPopup',



            function ($scope, $stateParams, BASE, $http, $rootScope, $ionicLoading,$ionicPopup) {
                $scope.data = {};
                $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 10000});
                link = BASE + 'api/staticpages/contact.json';
                $scope.contact = function() {
                $http.post(link, {StaticPages: {name: $scope.data.name,email:$scope.data.email,comnt:$scope.data.comment}}, $rootScope.cntype)
                        .success(function (response) {
                            console.log(response);
                           $ionicPopup.alert({
                            title: 'Contact Us',
                            template: "Message Sent successfully"
                        });
                        });

                }

            }])
        .controller('faqCtrl', ['$scope', '$stateParams', 'BASE', '$http', '$rootScope', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

// You can include any angular dependencies as parameters for this function

// TIP: Access Route Parameters for your page via $stateParams.parameterName

            function ($scope, $stateParams, BASE, $http, $rootScope, $ionicLoading) {
                $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 10000});
                link = BASE + 'api/staticpages/index.json';
                $http.post(link, {StaticPages: {pos: "faq"}}, $rootScope.cntype)
                        .success(function (response) {
                            console.log(response);
                            $scope.static = response.staticpages[0];
                        });




            }])
        .controller('dpCtrl', ['$scope', '$stateParams', 'BASE', '$http', '$rootScope', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

// You can include any angular dependencies as parameters for this function

// TIP: Access Route Parameters for your page via $stateParams.parameterName

            function ($scope, $stateParams, BASE, $http, $rootScope, $ionicLoading) {
                $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 10000});
                link = BASE + 'api/staticpages/index.json';
                $http.post(link, {StaticPages: {pos: "deliverypolicy"}}, $rootScope.cntype)
                        .success(function (response) {
                            console.log(response);
                            $scope.static = response.staticpages[0];
                        });




            }]).controller('ppCtrl', ['$scope', '$stateParams', 'BASE', '$http', '$rootScope', '$ionicLoading',
    function ($scope, $stateParams, BASE, $http, $rootScope, $ionicLoading) {
        $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 10000});
        link = BASE + 'api/staticpages/index.json';
        $http.post(link, {StaticPages: {pos: "privacypolicy"}}, $rootScope.cntype)
                .success(function (response) {
                    console.log(response);
                    $scope.static = response.staticpages[0];
                });




    }])

        .controller('weeklyCtrl', ['$scope', '$stateParams', '$ionicLoading', 'BASE', '$http', '$rootScope', '$ionicPopup',
            function ($scope, $stateParams, $ionicLoading, BASE, $http, $rootScope, $ionicPopup) {
                $scope.gh = JSON.parse(localStorage.getItem('UserData')).active_plan;
                $scope.weeklyschedule = function () {
                    $ionicLoading.show();
                    $scope.k = [];
                    $scope.id = JSON.parse(localStorage.getItem('UserData')).user_id;
                    console.log($rootScope.cntype);
                    var link = BASE + 'api/orders/schedules.json';
                    $http.post(link, {User: {id: $scope.id}}, $rootScope.cntype)
                            .success(function (response) {
                                console.log(response);

                                var weekly = response.order.data;
                                for (var i = 0; i < 7; i++)
                                {
                                    $scope.k[i] = [];
                                }

                                for (var i = 0; i < weekly.length; i++)
                                {
                                    if (weekly[i].dayname == "Sunday")
                                    {

                                        $scope.k[0].push(weekly[i]);
                                    }

                                    else if (weekly[i].dayname == "Monday")
                                    {

                                        $scope.k[1].push(weekly[i]);
                                    }

                                    else if (weekly[i].dayname == "Tuesday")
                                    {
                                        $scope.k[2].push(weekly[i]);
                                    }

                                    else if (weekly[i].dayname == "Wednesday") {

                                        $scope.k[3].push(weekly[i]);
                                    }

                                    else if (weekly[i].dayname == "Thursday")
                                    {

                                        $scope.k[4].push(weekly[i]);
                                    }

                                    else if (weekly[i].dayname == "Friday")
                                    {
                                        $scope.k[5].push(weekly[i]);
                                    }

                                    else if (weekly[i].dayname == "Saturday")
                                    {
                                        $scope.k[6].push(weekly[i]);
                                    }
                                }
                                console.log($scope.k);
                            })
                }
                $scope.weeklyschedule();
                $scope.cancel = function (id)
                {
                    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 3000});
                    $http.post(BASE + "api/orders/cancel.json", {id: id}, $rootScope.cntype).success(function (response) {
                        console.log(response);
                        $scope.weeklyschedule();
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Success',
                            template: "Your order has been cancelled Successfully"
                        });
                    })
                }
            }])


        .controller('rankCtrl', ['$scope', '$stateParams', '$ionicLoading', 'BASE', '$http', '$rootScope', '$ionicPopup', function ($scope, $stateParams, $ionicLoading, BASE, $http, $rootScope, $ionicPopup) {


                $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>', duration: 3000});
                $http.post(BASE + "api/users/rank.json").success(function (response) {
                    console.log(response);
                    $scope.ranks = response.data;
                }).error(function (error) {
                    console.log(error);
                });

            }])
        .controller('calculatorCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
                $scope.active = ['Sedentary', 'Light Active', 'Moderately Active', 'Very Active', 'Extra Active']
                var cneed;
                var fneed;
                var crneed;
                var pneed;
                var aneed;
                var fd;
                $scope.cc = function ()
                {
                    var wtype = "kg";
                    var age = parseInt(document.getElementById("age").value);
                    var cm = document.getElementById("cen").value;
                    var weight = document.getElementById("weight").value;
                    var gen = document.getElementById("gen").checked;
                    if (age != '' && cm != '' && weight != '') {
                        if (wtype == "kg")
                        {
                            weight = parseInt(weight);
                            weight = Math.round(weight);
                        }
                        var loa = document.getElementById("loa").value;
                        if (document.getElementById("gen").checked)
                        {
                            fd = (10 * weight) + (6.25 * cm) - (5 * age) + 5;
                        }
                        else
                        {
                            fd = (10 * weight) + (6.25 * cm) - (5 * age) - 161;
                        }
                        switch (loa)
                        {
                            case "1":
                                cneed = fd * 1.2;
                                break;
                            case "2":
                                cneed = fd * 1.375
                                break;
                            case "3":
                                cneed = fd * 1.53;
                                break;
                            case "4":
                                cneed = fd * 1.725;
                                break;
                            case "5":
                                cneed = fd * 1.9;
                                break;
                        }
                        cneed = Math.floor(cneed);
                        fneed = Math.floor((cneed * 0.25) / 9);   
                        pneed=Math.floor((cneed*0.25)/4);
                        crneed=Math.floor((cneed*0.25)/4);
                        aneed=Math.floor((cneed*0.25)/7);
                        document.getElementById("rc").value = " "  + cneed;
                        document.getElementById("rf").value = " " + fneed;
                        document.getElementById("rp").value = " " + pneed;
                        document.getElementById("rh").value = " " + crneed;
                        document.getElementById("ra").value = " " + aneed;
                      
                        if (caltype == 'kg') {
                            fat2 = fneed / 1000;
                       pro2 = pneed / 1000;
                       car2 = crneed / 1000;
                       alh2 = aneed / 1000;
                       fat2=fat2.toFixed(3);
                       pro2 = pro2.toFixed(3);
                       car2 = car2.toFixed(3);
                       alh2 = alh2.toFixed(3);
                    document.getElementById("rf").value=" "+fat2;
                    document.getElementById("rp").value=" "+pro2;
                    document.getElementById("rh").value=" "+car2;
                    document.getElementById("ra").value=" "+alh2;
              

                        }
           

                    }
                    else {
                        alert("Please fill your details properly!");
                    }
                }


            }])