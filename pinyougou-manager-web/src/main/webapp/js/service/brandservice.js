//品牌服务层
app.service("brandService",function ($http) {
    this.findOne=function(id){
        return $http.get('../brand/findOne.do?id='+id)
    };

    this.add=function (entity) {
        return $http.post('../brand/add.do',entity)
    };
    this.update=function (entity) {
        return $http.post('../brand/update.do',entity)
    };
    this.deleteBrands=function (ids) {
        return $http.get('../brand/delete.do?ids='+ids);
    };
    this.search=function(pageNum,pageSize,searchEntity){
        return $http.post('../brand/search.do?pageNum='+pageNum+'&pageSize='+pageSize,searchEntity)
    }
    //下拉列表数据
    this.selectOptionList=function(){
        return $http.get('../brand/selectOptionList.do');
    }
});
