/*
 * @Author: Dwight dwight@gmail.com
 * @Date: 2024-06-28 17:44:15
 * @LastEditors: Dwight dwight@gmail.com
 * @LastEditTime: 2024-06-28 18:14:23
 * @FilePath: /study/Go/180/branch/branch.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package main

import (
	"fmt"
	"io/ioutil"
)

func grade(score int) string {
	g := ""
	switch {
	case score < 0 || score > 100:
		// panic 会中断代码执行
		panic(fmt.Sprintf(
			"Wrong score: %d", score))
	case score < 60:
		g = "F"
	case score < 80:
		g = "C"
	case score < 90:
		g = "B"
	case score <= 100:
		g = "A"
	}
	return g
}

func main() {

	const filename = "Go/180/branch/abc.txt"

	// 这读写文件可能出错 ，建议使用 file, err := os.Open(filename)
	if contents, err := ioutil.ReadFile(filename); err != nil {
		fmt.Println(err)
	} else {
		fmt.Printf("%s\n", contents)
	}

	fmt.Println(
		grade(0),
		grade(59),
		grade(60),
		grade(82),
		grade(99),
		grade(100),
		// grade(-3),
	)
}
