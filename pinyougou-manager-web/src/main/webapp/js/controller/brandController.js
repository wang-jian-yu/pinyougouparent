//品牌控制层
app.controller('brandController',function ($scope,$controller,$http,brandService) {
    $controller('baseController',{$scope:$scope});//继承baseController控制器；伪继承；就是传递@scope
    // //查询品牌列表
    // $scope.findAll=function(){
    // 	$http.get('../brand/findAll.do').success(
    // 			function(data){
    // 				$scope.list=data;
    // 			});
    // }



    // $scope.findPage=function(pageNum,pageSize){
    // 	$http.get('../brand/findPage.do?pageNum='+pageNum+'&pageSize='+pageSize).success(
    // 			function(data){
    // 				$scope.list=data.rows;//当前页的数据
    // 				$scope.paginationConf.totalItems=data.total;
    // 			});
    // };

    //增加品牌
    $scope.save=function(){
        var object=null;
        if($scope.entity.id!=null){
            object=brandService.update($scope.entity);
        }else{
            object=brandService.add($scope.entity);
        }
        object.success(
            function (data) {
                if (data.success){
                    $scope.reloadList();//重新加载
                    alert(data.message)
                }else{
                    alert(data.message)
                }
            });
    };
    //查找数据回显示--跟新
    $scope.findOne=function(id){
        brandService.findOne(id).success(
            function(data){
                $scope.entity=data;
            }
        );
    };
    //向后台发送删除请求
    //删除
    $scope.deleteBrands=function(){
        if(confirm('确定要删除吗？')){
            brandService.deleteBrands($scope.selectIds).success(
                function(response){
                    if(response.success){
                        $scope.reloadList();//刷新
                    }else{
                        alert(response.message);
                    }
                }
            );
        }

    };

    //查询
    $scope.searchEntity={};
    $scope.search=function (pageNum,pageSize) {
        brandService.search(pageNum,pageSize,$scope.searchEntity).success(
            function(data){
                $scope.list=data.rows;//当前页的数据
                $scope.paginationConf.totalItems=data.total;
            });
    }
});