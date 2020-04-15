
app.controller("indexController",function( $scope,loginService){
    $scope.showLoginName=function () {//显示当前登录的用户名
        loginService.loginName().success(function (data) {
            $scope.loginName=data.loginName;
        })
    }

})