package com.pinyougou.manager.controller;

import java.util.List;
import java.util.Map;

import entity.Result;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import entity.PageResult;
import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.TbBrand;
import com.pinyougou.sellergoods.service.BrandService;



@RestController
@RequestMapping("/brand")
public class    BrandController {

    @Reference(timeout = 10000)
    private BrandService brandService;

//    @RequestMapping("/findAll")//查询所有品牌
//    public List<TbBrand> findAll(){
//        return brandService.findAll();
//    }

//    @RequestMapping("/findPage")
//    public PageResult findPage(int pageNum,int pageSize) {
//        return brandService.findPage(pageNum,pageSize);
//
//    }
    @RequestMapping("/add")
    public Result addBrand(@RequestBody  TbBrand brand){
        try {
            brandService.addBrand(brand);
            return  new Result(true,"添加成功");
        }catch (Exception e){
            e.printStackTrace();
            return  new Result(true,"添加成功");
        }
    }
    @RequestMapping("/findOne")
    public TbBrand findOneById(long id) {
      return  brandService.findOneById(id);
    }


    @RequestMapping("/update")
    public Result updateBrand(@RequestBody  TbBrand brand){
        try {
            brandService.updateBrand(brand);
            return  new Result(true,"修改成功");
        }catch (Exception e){
            e.printStackTrace();
            return  new Result(true,"修改成功");
        }
    }

    @RequestMapping("/delete")
    public Result delteBrand(Long[] ids) {
        try {
            brandService.delteBrand(ids);
            return  new Result(true,"删除成功");
        }catch (Exception e){
            e.printStackTrace();
            return  new Result(true,"删除成功");
    }
}
    @RequestMapping("/search")
    public PageResult search(@RequestBody  TbBrand brand,int pageNum,int pageSize){
        return  brandService.findPage(brand,pageNum,pageSize);
    }

    @RequestMapping("/selectOptionList")
    public List<Map> selectOptionList() {
        return brandService.selectOptionList();
    }
}
