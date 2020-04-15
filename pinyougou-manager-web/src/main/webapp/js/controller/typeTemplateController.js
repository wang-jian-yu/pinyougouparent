//控制层
app.controller('typeTemplateController' ,function($scope,$controller   ,typeTemplateService,brandService,specificationService){

	$controller('baseController',{$scope:$scope});//继承

	//读取列表数据绑定到表单中
	$scope.findAll=function(){
		typeTemplateService.findAll().success(
			function(response){
				$scope.list=response;
			}
		);
	}

	//分页
	$scope.findPage=function(page,rows){
		typeTemplateService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}
		);
	}

	//查询实体
	$scope.findOne=function(id){
		typeTemplateService.findOne(id).success(
			function(response){
				$scope.entity= response;
				//转换字符串为json对象（集合）
				$scope.entity.brandIds=  JSON.parse( $scope.entity.brandIds);
				$scope.entity.specIds= JSON.parse($scope.entity.specIds);
				$scope.entity.customAttributeItems = JSON.parse($scope.entity.customAttributeItems);

			}
		);
	}

	//保存
	$scope.save=function(){
		if($scope.entity.id!=null){//如果有ID
			var entityOne = $scope.entity;
			var entityArr = [];
			entityArr.push(entityOne);
			var entityJson =JSON.stringify(entityArr);
			$.ajax({//请求登录页处理
				url: "../typeTemplate/update.do",
				dataType: "json",
				data: {"typeTemplateStr": entityJson},//传送请求数据
				success:function(data) {
					$scope.reloadList();//重新加载
				}
			});
			$scope.reloadList();//重新加载
		}else{
			var entityOne = $scope.entity;
			var entityArr = [];
			entityArr.push(entityOne);
			//console.log(entityArr);
			var entityJson =JSON.stringify(entityArr);
			//console.log(entityJson);
			$.ajax({//请求登录页处理
				url: "../typeTemplate/add.do",
				dataType: "json",
				data: {"typeTemplateStr": entityJson},//传送请求数据
				success:function(data) {
					$scope.reloadList();//重新加载
				}
				});

		}

	}


	//批量删除
	$scope.dele=function(){
		//获取选中的复选框
		typeTemplateService.dele( $scope.selectIds ).success(
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
		typeTemplateService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}
		);
	}

	$scope.brandList={data:[]};//品牌列表

	//读取品牌列表
	$scope.findBrandList=function(){
		brandService.selectOptionList().success(
			function(response){
				$scope.brandList={data:response};
			}
		);
	}

	$scope.specList={data:[]};//规格列表

	//读取规格列表
	$scope.findSpecList=function(){
		specificationService.selectOptionList().success(
			function(response){
				$scope.specList={data:response};
			}
		);
	}

	//增加扩展属性行
	$scope.addTableRow=function(){
		$scope.entity.customAttributeItems.push({});
	}
	//删除扩展属性行
	$scope.deleTableRow=function(index){
		$scope.entity.customAttributeItems.splice( index,1);
	}

});	
