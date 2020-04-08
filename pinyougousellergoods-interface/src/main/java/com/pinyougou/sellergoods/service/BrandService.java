package com.pinyougou.sellergoods.service;

import com.pinyougou.pojo.TbBrand;
import entity.PageResult;

import java.util.List;

//品牌接口
public interface BrandService {
//    List<TbBrand> findAll();//查询所有品牌

    /**
     * 品牌分页
     * @param pageNum     当前页
     * @param pageSize      每页记录数
     * @return
     */
//    PageResult findPage(int pageNum,int pageSize);

    /**
     * 查询
     * @param brand       查询条件的参数
     * @param pageNum     当前页
     * @param pageSize      每页记录数
     * @return
     */
    PageResult findPage(TbBrand brand ,int pageNum,int pageSize);


    void addBrand(TbBrand brand);//添加品牌

    TbBrand findOneById(long id);//根据id查询

    void updateBrand(TbBrand brand);//修改品牌

    void delteBrand(Long[] ids);




}
