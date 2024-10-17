package com.itheima.controller;

import com.itheima.pojo.Emp;
import com.itheima.pojo.PageBean;
import com.itheima.pojo.Result;
import com.itheima.service.EmpService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@Slf4j
@RestController
@RequestMapping("/emps")
public class EmpController {


    @Autowired
    private EmpService empService;

    @GetMapping
    public Result page(@RequestParam(defaultValue = "1") Integer page,
                       @RequestParam(defaultValue = "10") Integer pageSize,
                       String name,
                       Short gender,
                       @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate begin,
                       @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate end) {
        // 记录日志
        log.info("分页查询参数， {}, {}, {}, {}, {}, {} ", page, pageSize, name, gender, begin, end);
        // 调用业务层分页查询功能；
        PageBean pageBean = empService.page(page, pageSize, name, gender, begin, end);
        // 响应
        return Result.success(pageBean);
    }

    @DeleteMapping("/{ids}")
    public Result delete(@PathVariable List<Integer> ids) {
        log.info("批量删除 操作，ids：{}", ids);
        empService.delete(ids);
        return Result.success();
    }


    @PostMapping
    public Result save(@RequestBody Emp emp) {
        // 记录日志
        log.info("新增员工，emp: {}", emp);
        // 调用业务层新增功能
        empService.save(emp);
        // 响应
        return Result.success();
    }
}
