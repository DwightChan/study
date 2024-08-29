/*
 * @Author: Dwight dwight@gmail.com
 * @Date: 2024-07-01 01:29:18
 * @LastEditors: Dwight dwight@gmail.com
 * @LastEditTime: 2024-07-01 01:48:28
 * @FilePath: /study/Go/180/container/maps/maps.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package main

import (
	"fmt"
)

func main() {

	m := map[string]string{
		"name":    "ccmouse",
		"course":  "golang",
		"site":    "imooc",
		"quality": "notbad",
	}

	m2 := make(map[string]int) // m2 == empty map

	var m3 map[string]int // m3 == nil

	fmt.Println(m, m2, m3)

	fmt.Println("traversing map")

	for k, v := range m {
		fmt.Println(k, v)
	}

	fmt.Println("Getting values")
	courseName, ok := m["course"]
	fmt.Println(courseName, ok)
	if causeName, ok := m["cause"]; ok {
		fmt.Printf("causeName=== %s\n", causeName)
	} else {
		fmt.Println("causeName=== ", causeName)
		fmt.Println("key does not exist")
	}

	fmt.Println("Deleting values")
	name, ok := m["name"]
	fmt.Println(name, ok)

	delete(m, "name")
	// 第一次是 定义变量 可以使用 冒号等于 := ，第二次是给变量赋值 是等于 =
	name, ok = m["name"]
	fmt.Println(name, ok)

}
