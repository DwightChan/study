package com.itheima.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.itheima.mapper.EmpMapper;
import com.itheima.pojo.Emp;
import com.itheima.pojo.PageBean;
import com.itheima.service.EmpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class EmpServiceImpl implements EmpService {

    @Autowired
    private EmpMapper empMapper;

    @Override
    public PageBean page(Integer page, Integer pageSize, String name, Short gender, LocalDate begin, LocalDate end) {

//        //1、获取总记录数
//        Long count = empMapper.count();
//
//        //2、获取分页查询结果列表
//        Integer start = (page - 1) * pageSize; //计算起始索引 , 公式: (页码-1)*页大小
//        List<Emp> empList = empMapper.page(start, pageSize);
//
//        //3、封装PageBean对象
//        PageBean pageBean = new PageBean(count , empList);
//        return pageBean;

        //1. 设置分页参数
        PageHelper.startPage(page,pageSize);

        //2. 执行查询
        List<Emp> empList = empMapper.list(name, gender, begin, end);
//        Page<Emp> p = (Page<Emp>) empList;
        // 3. 使用 PageInfo 包装查询结果，提供分页信息
        PageInfo<Emp> p = new PageInfo<>(empList);

        //3. 封装PageBean对象
        PageBean pageBean = new PageBean(p.getTotal(), p.getList());
        return pageBean;

    }

    @Override
    public void delete(List<Integer> ids) {
        empMapper.delete(ids);
    }

    @Override
    public void save(Emp emp) {
        //设置创建时间和更新时间
        emp.setCreateTime(LocalDateTime.now());
        emp.setUpdateTime(LocalDateTime.now());
        //保存员工信息
        empMapper.insert(emp);
    }
}
