angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,MapService) {
  $scope.map = null;
  $scope.heatmapOverlay = null;
  $scope.init = function(){
    // init Map obj
    $scope.map = new BMap.Map("container");          // 创建地图实例
    var point = new BMap.Point(116.418261, 39.921984);
    $scope.map.centerAndZoom(point, 15);             // 初始化地图，设置中心点坐标和地图级别
    $scope.map.enableScrollWheelZoom(); // 允许滚轮缩放

    // init Heatmap obj
    $scope.heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
    $scope.map.addOverlay($scope.heatmapOverlay);
  };
  $scope.showHeatData = function(){
    if(null==$scope.heatData){
      var points = MapService.getHeatData();
      $scope.heatmapOverlay.setDataSet({data:points,max:100});
    }
    $scope.heatmapOverlay.show();
  };
  $scope.hideHeatData = function(){
    $scope.heatmapOverlay.hide();
  };

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
  .controller('LoginCtrl', function($scope,$state) {
    $scope.loginName = '';
    $scope.loginPassword = '';
    $scope.init = function(){};
    $scope.login = function(){
      console.log($scope.loginName);
      console.log($scope.loginPassword);
      if($scope.loginName =='admin'&&$scope.loginPassword =='admin'){
        $state.go("tab.dash");
      }
    }
  })

  .controller('SetupCtrl', function($scope) {
    //TODO
  })

;
