 //控制层 
app.controller('itemCatController' ,function($scope,$controller   ,itemCatService,typeTemplateService){
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		itemCatService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		itemCatService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体
	$scope.findOne=function(id){				
		itemCatService.findOne(id).success(
			function(response){
				$scope.entity= response;
			}
		);				
	}
	
	//保存 
	$scope.save=function(){

		$scope.entity.typeId=$scope.pojo.name.id;

		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=itemCatService.update( $scope.entity ); //修改  
		}else{
			$scope.entity.parentId=$scope.parentId;
			serviceObject=itemCatService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	//$scope.reloadList();//重新加载
					$scope.finParentById($scope.parentId);//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}

	$scope.grade=0;//导航条级别
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		itemCatService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
				//	$scope.reloadList();//刷新列表
					console.log($scope.grade);
					$scope.finParentById($scope.grade);
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		itemCatService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}

	//根据上级分类查询商品
	$scope.finParentById=function (id) {
		$scope.parentId=id;
		itemCatService.finParentById(id).success(function (data) {
			$scope.list=data;
		})
	}


	$scope.setGrade=function (value) {
		$scope.grade=value;
	}

	$scope.selectList=function (p_entity) {
		if($scope.grade==1){
			$scope.entity1=null;
			$scope.entity2=null;
		}
		if($scope.grade==2){
			$scope.entity1=p_entity;
			$scope.entity2=null;
		}
		if($scope.grade==3){
			$scope.entity2=p_entity;
		}
		$scope.finParentById(p_entity.id);
	}

	$scope.TypeList={data:[]};//规格列表
	$scope.findTypeList=function(){
		typeTemplateService.selectOptionList().success(
			function(response){
				$scope.TypeList={data:response};
			}
		);
	}


});	
