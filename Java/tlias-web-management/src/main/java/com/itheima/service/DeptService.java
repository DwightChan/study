package com.itheima.service;

import com.itheima.pojo.Dept;

import java.util.List;

public interface DeptService {

    /*
    * 查询所有的部门的数据
    * @return 存储dept 对象的集合
    * */
    List<Dept> list();

    /*
    * 删除部门
    * 通过不萌ID
    * */
    Integer delete(Integer id);

    void add(Dept dept);
}
