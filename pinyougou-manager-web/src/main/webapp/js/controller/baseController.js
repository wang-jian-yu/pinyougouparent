app.controller('baseController',function($scope){
    //分页插件
    $scope.paginationConf = {
        currentPage: 1,<!--当前页-->
        totalItems: 10,<!--总记录数-->
        itemsPerPage: 10,<!--每页记录数-->
        perPageOptions: [10, 20, 30, 40, 50],<!--分页选项-->
        onChange: function(){//当页码变后自动触发的方法
            $scope.reloadList();//重新加载
        }
    };

    $scope.reloadList=function(){//刷新列表
        $scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage)
    };

    //收集要删除的id
    $scope.selectIds=[];//记录勾选的id
    $scope.updateSelectIds=function($event,id){
        if($event.target.checked){
            $scope.selectIds.push(id);//向集合添加元素
        }else {
            var index=$scope.selectIds.indexOf(id);//查找当前取消勾选id的位置
            $scope.selectIds.splice(index,1);//将取消勾选的id从数组中移除

        }
    };

    $scope.jsonToString=function(jsonString,key){

        var json= JSON.parse(jsonString);
        var value="";

        for(var i=0;i<json.length;i++){
            if(i>0){
                value+=",";
            }
            value +=json[i][key];
        }

        return value;
    }
});