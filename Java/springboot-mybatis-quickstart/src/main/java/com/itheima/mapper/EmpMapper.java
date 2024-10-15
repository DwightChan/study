package com.itheima.mapper;


import com.itheima.pojo.Emp;
import org.apache.ibatis.annotations.*;

@Mapper
public interface EmpMapper {

    // 根据ID删除数据
    /*
    * 返回影响的数据数量 n ， 表示 删除 n 条数据
    * */
    @Delete("delete from emp where id=#{id}")
    public int delete(Integer id);

    /**
     * 插入数据
     * @param enp
     */
    @Options(useGeneratedKeys = true, keyProperty = "id")
    @Insert("insert  into  emp(username, name, gender, image, job, entrydate, dept_id, create_time, update_time)" +
            " values (#{username},#{name},#{gender},#{image},#{job},#{entrydate},#{deptId},#{createTime},#{updateTime})")
    public void insert(Emp enp);


    /*
    * 更新数据的方法
    * */
    @Update("update emp set username= #{username}, name = #{name}, gender = #{gender}, image = #{image}, job= #{job}, entrydate = #{entrydate}, dept_id = #{deptId}, update_time = #{updateTime} where id = #{id};")
    public void update(Emp emp);


//    @Select("select id, username, password, name, gender, image, job, entrydate, dept_id AS deptId, create_time AS createTime, update_time AS updateTime from emp where id = #{id}")
//    public Emp getById(Integer id);

//    @Results({
//            @Result(column = "dept_id", property = "deptId"),
//            @Result(column = "create_time", property = "createTime"),
//            @Result(column = "update_time", property = "updateTime")
//    })
    @Select("select id, username, password, name, gender, image, job, entrydate, dept_id , create_time, update_time from emp where id = #{id}")
    public Emp getById(Integer id);


//    @Select("select * from emp " +
//            "where name like '%${name}%' " +
//            "and gender = #{gender} " +
//            "and entrydate between #{begin} and #{end} " +
//            "order by update_time desc")
//    public List<Emp> list(String name, Short gender, LocalDate begin, LocalDate end);

    @Select("select * from emp " +
            "where name like concat('%',#{name},'%') " +
            "and gender = #{gender} " +
            "and entrydate between #{begin} and #{end} " +
            "order by update_time desc")
    public List<Emp> list(String name, Short gender, LocalDate begin, LocalDate end);
}
