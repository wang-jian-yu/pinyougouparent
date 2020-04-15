app.service('uploadService',function ($http) {

        //上传文件
        this.uploadFile=function(){
            var formdata=new FormData();
            formdata.append('file',file.files[0]);//第一个参数固定，第二个是文件上传框的名字

            return $http({
                url:'../upload.do',
                method:'post',
                data:formdata,
                headers:{ 'Content-Type':undefined },//指定上传类型，否则默认是json格式
                transformRequest: angular.identity//表单二进制序列化
            });

        }

})