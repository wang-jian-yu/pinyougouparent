 //控制层 
app.controller('goodsController' ,function($scope,$controller   ,goodsService,uploadService){
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		goodsService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		goodsService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		goodsService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.add=function(){
		$scope.entity.goodsDesc.introduction=editor.html();
		var entityOne = $scope.entity;
		var entityArr = [];
		entityArr.push(entityOne);
		//console.log(entityArr);
		var entityJson =JSON.stringify(entityArr);
		//console.log(entityJson);
		$.ajax({//请求登录页处理
			url: "../goods/add.do",
			dataType: "json",
			data: {"jsonstr": entityJson},//传送请求数据
			success:function(data) {
							alert("新增成功");
							$scope.entity={};
							editor.html("");//清空富文本编辑器
			}
		});
		// goodsService.add($scope.entity).success(
		// 	function(response){
		// 		if(response.success){
		// 			console.log($scope.entity);
		// 			alert("新增成功");
		// 			$scope.entity={};
		// 			editor.html("");//清空富文本编辑器
		// 		}else{
		// 			alert(response.message);
		// 		}
		// 	}
		// );
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		goodsService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		goodsService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
    	$scope.uploadFile=function () {
			uploadService.uploadFile().success(function (data) {
				if(data.success){
					$scope.image_entity.url=data.message;
				}else {
					alert(data.message)
				}
			})
		}
	$scope.entity={ goodsDesc:{itemImages:[]}  };
	//将当前上传的图片实体存入图片列表
	$scope.add_image_entity=function(){
		$scope.entity.goodsDesc.itemImages.push($scope.image_entity);
	}

	//删除图片
	$scope.remove_image_entity=function(index){
		$scope.entity.goodsDesc.itemImages.splice(index,1)
	}
});	
