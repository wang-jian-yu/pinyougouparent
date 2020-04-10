package com.pinyougou.sellergoods.service.impl;
import java.util.List;
import java.util.Map;

import com.pinyougou.mapper.TbSpecificationOptionMapper;
import com.pinyougou.pojo.TbSpecificationOption;
import com.pinyougou.pojo.TbSpecificationOptionExample;
import com.pinyougou.pojogroup.Specification;
import org.springframework.beans.factory.annotation.Autowired;
import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pinyougou.mapper.TbSpecificationMapper;
import com.pinyougou.pojo.TbSpecification;
import com.pinyougou.pojo.TbSpecificationExample;
import com.pinyougou.pojo.TbSpecificationExample.Criteria;
import com.pinyougou.sellergoods.service.SpecificationService;

import entity.PageResult;

/**
 * 服务实现层
 * @author Administrator
 *
 */
@Service
public class SpecificationServiceImpl implements SpecificationService {

	@Autowired
	private TbSpecificationMapper specificationMapper;
	@Autowired
	private TbSpecificationOptionMapper specificationOptionMapper;


	/**
	 * 查询全部
	 */
	@Override
	public List<TbSpecification> findAll() {
		return specificationMapper.selectByExample(null);
	}

	/**
	 * 按分页查询
	 */
	@Override
	public PageResult findPage(int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);		
		Page<TbSpecification> page=   (Page<TbSpecification>) specificationMapper.selectByExample(null);
		return new PageResult(page.getTotal(), page.getResult());
	}

	/**
	 * 增加
	 */
	@Override
	public void add(Specification specification) {
		TbSpecification tbspecification = specification.getSpecification();//获取 规格实体
		specificationMapper.insert(tbspecification);

		//获取规格选项集合
		List<TbSpecificationOption> tbSpecificationOptionList = specification.getSpecificationOptionList();
		for(TbSpecificationOption tbSpecificationOption:tbSpecificationOptionList){
			tbSpecificationOption.setSpecId(tbspecification.getId());//设置新增规格id
			specificationOptionMapper.insert(tbSpecificationOption);//新增规格
		}
	}

	
	/**
	 * 修改
	 */
	@Override
	public void update(Specification specification){
		//specificationOptionMapper
		TbSpecification tbSpecification=specification.getSpecification();
		specificationMapper.updateByPrimaryKey(tbSpecification);

		//先将原来的删除，在增加------------>等于跟新
		TbSpecificationOptionExample SOExample = new TbSpecificationOptionExample();
		TbSpecificationOptionExample.Criteria criteria = SOExample.createCriteria();
		criteria.andSpecIdEqualTo(tbSpecification.getId());
		specificationOptionMapper.deleteByExample(SOExample);

		List<TbSpecificationOption> tbSpecificationOptionList = specification.getSpecificationOptionList();
		for(TbSpecificationOption tbSpecificationOption:tbSpecificationOptionList){
			tbSpecificationOption.setSpecId(tbSpecification.getId());//设置新增规格id
			specificationOptionMapper.insert(tbSpecificationOption);//新增规格
			 }
	}	
	
	/**
	 * 根据ID获取实体
	 * @param id
	 * @return
	 */
	@Override
	public Specification findOne(Long id){
		Specification specification = new Specification();
		specification.setSpecification(specificationMapper.selectByPrimaryKey(id));//规格实体

		TbSpecificationOptionExample SOExample = new TbSpecificationOptionExample();
		TbSpecificationOptionExample.Criteria criteria = SOExample.createCriteria();
		criteria.andSpecIdEqualTo(id);
		List<TbSpecificationOption> SOList = specificationOptionMapper.selectByExample(SOExample);
		specification.setSpecificationOptionList(SOList);
		return   specification;//组合实体类
	}

	/**
	 * 批量删除
	 */
	@Override
	public void delete(Long[] ids) {
		for(Long id:ids){
			//删除规格表
			specificationMapper.deleteByPrimaryKey(id);
			//删除规格选项表
			TbSpecificationOptionExample SOExample = new TbSpecificationOptionExample();
			TbSpecificationOptionExample.Criteria criteria = SOExample.createCriteria();
			criteria.andSpecIdEqualTo(id);
			specificationOptionMapper.deleteByExample(SOExample);
		}		
	}
	
	
		@Override
	public PageResult findPage(TbSpecification specification, int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		
		TbSpecificationExample example=new TbSpecificationExample();
		Criteria criteria = example.createCriteria();

		if(specification!=null){			
						if(specification.getSpecName()!=null && specification.getSpecName().length()>0){
				criteria.andSpecNameLike("%"+specification.getSpecName()+"%");
			}
	
		}
		
		Page<TbSpecification> page= (Page<TbSpecification>)specificationMapper.selectByExample(example);		
		return new PageResult(page.getTotal(), page.getResult());
	}

	@Override
	public List<Map> selectOptionList() {
		return specificationMapper.selectOptionList();
	}

}
