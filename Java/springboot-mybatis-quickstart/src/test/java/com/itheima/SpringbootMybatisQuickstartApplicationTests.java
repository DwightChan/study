package com.itheima;

import com.itheima.mapper.EmpMapper;
import com.itheima.mapper.UserMapper;
import com.itheima.pojo.Emp;
import com.itheima.pojo.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
class SpringbootMybatisQuickstartApplicationTests {

	@Test
	void contextLoads() {
	}


	@Autowired
	private UserMapper userMapper;

	@Test
	public  void  testListUser() {
		List<User> userList = userMapper.list();
		userList.stream().forEach(user -> {
			System.out.println(user);
		});
	}

	@Autowired
	public EmpMapper empMapper;

	@Test
	public void testDelete() {
		int num = empMapper.delete(17);
		System.out.println("删除了" + num + "条数据");
	}

	@Test
	public void testInsert() {
		//创建员工对象
		Emp emp = new Emp();
		emp.setUsername("jack");
		emp.setName("杰克");
		emp.setImage("1.jpg");
		emp.setGender((short)1);
		emp.setJob((short)1);
		emp.setEntrydate(LocalDate.of(2000,1,1));
		emp.setCreateTime(LocalDateTime.now());
		emp.setUpdateTime(LocalDateTime.now());
		emp.setDeptId(1);
		empMapper.insert(emp);

		System.out.println(emp.getId());
	}

	@Test
	public void testUpdate() {
		//要修改的员工信息
		Emp emp = new Emp();
		emp.setId(19);
		emp.setUsername("songdaxia");
		emp.setPassword(null);
		emp.setName("老宋");
		emp.setImage("2.jpg");
		emp.setGender((short)1);
		emp.setJob((short)2);
		emp.setEntrydate(LocalDate.of(2012,1,1));
		emp.setCreateTime(null);
		emp.setUpdateTime(LocalDateTime.now());
		emp.setDeptId(2);
		// 调用方法，修改员工数据
		empMapper.update(emp);
	}

	@Test
	public void testGetById() {
		Emp emp = empMapper.getById(1);
		System.out.println(emp);
	}


	//根据条件查询员工
	@Test
	public void testList(){
		List<Emp> empList = empMapper.list("张", (short) 1, LocalDate.of(2010, 1, 1), LocalDate.of(2020, 1, 1));
		//List<Emp> empList = empMapper.list("张", null, null, null);
		//List<Emp> empList = empMapper.list("张", (short)1, null, null);
		//List<Emp> empList = empMapper.list(null, (short)1, null, null);
//		List<Emp> empList = empMapper.list(null, null, null, null);
		System.out.println(empList);
	}

	@Test
	public void testUpdate2() {
		// 构造员工对象
		Emp emp = new Emp();
		emp.setId(19);
		emp.setUsername("Tom2222233");

		// 执行更新员工操作
		empMapper.update2(emp);
	}

	@Test
	public void testDeleteByIds() {
		List<Integer> ids = Arrays.asList(13,14, 15);
		empMapper.deleteByIds(ids);
	}
}
