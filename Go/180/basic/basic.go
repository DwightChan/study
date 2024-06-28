/*
 * @Author: hqxc-Dwight hqxc.dwight@gmail.com
 * @Date: 2024-06-28 15:33:08
 * @LastEditors: hqxc-Dwight hqxc.dwight@gmail.com
 * @LastEditTime: 2024-06-28 15:47:39
 * @FilePath: /study/Go/180/basic/basic.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

package main

import "fmt"

// var aa = 3
// // 在包内变量不能使用 := 省略 var
// ss := "kkk"
// bb = true

// 设置包内变量，可以用括号包裹 省略 多个 var
var (
	aa = 3
	ss = "kkk"
	bb = true
)

func variableZeroValue() {

	var a int
	var s string
	fmt.Printf("%d, %q---\n", a, s)
}

func variableInitialValue() {

	var a, b int = 2, 4
	var s string = "abc"
	fmt.Println(a, b, s)
}
func variableTypeDeduction() {
	// 这里省略了类型推导
	var a, b, c, s = 3, 4, true, "def"
	fmt.Println(a, b, c, s)
}

func variableShorter() {
	// 第一次定义变量的时候可以直接用 :=
	// 这样可以减少 var 的使用
	a, b, c, s := 3, 4, true, "def"
	b = 5
	fmt.Println(a, b, c, s)
}

func main() {

	fmt.Println("hello world")
	variableZeroValue()
	variableInitialValue()
	variableTypeDeduction()
	variableShorter()
}
