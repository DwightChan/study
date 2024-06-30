/*
 * @Author: Dwight dwight@gmail.com
 * @Date: 2024-06-28 18:57:06
 * @LastEditors: Dwight dwight@gmail.com
 * @LastEditTime: 2024-07-01 01:12:53
 * @FilePath: /study/Go/180/container/arrays/arrays.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package main

import "fmt"

// []int 在 go中是切片
// [5]int 是数组
// 注意 这里的数组 和其他语言不通，
// 这里是 拷贝 ，进行值传递
// 因此 go 语言 通常不直接使用数组
// go 语言中 通常使用的是切片
func printArray(arr [5]int) {
	arr[0] = 100
	// range 关键字 解包 出 索引 和 值
	for i, v := range arr {
		fmt.Println(i, v)
	}
}

func main() {

	var arr1 [5]int
	// 定义数组 数量3个
	arr2 := [3]int{1, 3, 5}
	// 定义数组，容量有编译器来处理
	arr3 := [...]int{2, 4, 6, 8, 10}
	// 4行5列的数据
	var grid [4][5]int

	// for i := 0; i < len(arr3); i++ {
	// 	fmt.Println(arr3[i])
	// }
	for i, v := range arr3 {
		fmt.Println(i, v)
	}

	fmt.Println(arr1, arr2, arr3)
	fmt.Println(grid)

	fmt.Println("printArray(arr1)")
	printArray(arr1)

	/// 这里是 arr2 不是同一个类型 [5]int 因此不一致
	// printArray([5]int(arr2))

	fmt.Println("printArray(arr3)")
	printArray(arr3)

	fmt.Println("arr1 and arr3")
	fmt.Println(arr1, arr3)
}
