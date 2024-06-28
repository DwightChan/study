/*
 * @Author: hqxc-Dwight hqxc.dwight@gmail.com
 * @Date: 2024-06-28 18:08:56
 * @LastEditors: hqxc-Dwight hqxc.dwight@gmail.com
 * @LastEditTime: 2024-06-28 18:17:30
 * @FilePath: /study/Go/180/loop/loop.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func convertToBin(n int) string {
	result := ""
	for ; n > 0; n /= 2 {
		lsb := n % 2
		result = strconv.Itoa(lsb) + result
	}
	return result
}

func printFile(filename string) {
	file, err := os.Open(filename)
	if err != nil {
		panic(err)
	}

	scanner := bufio.NewScanner(file)

	// 一行行 读，这里省略了初始条件和递增条件
	for scanner.Scan() {
		fmt.Println(scanner.Text())
	}
}

func forever() {
	// 什么都不加的时候 就是死循环
	for {
		fmt.Println("abc")
	}
}

func main() {
	fmt.Println(
		convertToBin(5),  // 101
		convertToBin(13), // 1101
		convertToBin(72387885),
		convertToBin(0),
	)

	printFile("abc.txt")

	forever()
}
