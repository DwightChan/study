package com.itheima;

import com.itheima.mapper.DeptMapper;
import com.itheima.pojo.Dept;
import com.itheima.service.DeptService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.util.Lists.list;

@Slf4j
@SpringBootTest
class TliasWebManagementApplicationTests {

    @Test
    void contextLoads() {
    }

//    @Autowired
//    private DeptMapper deptMapper;
//
//    @Autowired
//    private DeptService deptService;
//
//    @Test
//    void testList() {
//        List<Dept> list = deptService.list();
//        log.info("查询到底数据，{}", list);
//    }
}
