/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-07-02 03:27:38
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-07-02 03:50:01
 * @FilePath: /180/errhandling/defer/defer.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package main

import (
	"180/functional/fib"
	"bufio"
	"fmt"
	"os"
)

func tryDefer() {

	// defer 是在函数结束之前执行的
	// 属于延迟执行
	// 一般用于释放资源
	// 释放资源的时候, 一般是先打开资源, 然后在函数结束的时候关闭资源
	// 但是如果在打开资源的时候出现了错误, 那么就需要在打开资源的时候就关闭资源
	// 这时候就需要使用 defer
	// defer 会在函数结束的时候执行, 无论函数是否出现错误
	// defer 会按照先进后出的顺序执行
	// defer 会把参数的值保存起来, 在函数结束的时候执行
	// defer println(1)
	// defer println(2)
	// println(3)

	for i := 0; i < 100; i++ {
		defer fmt.Println(i)
		if i == 30 {
			panic("printed too many")
		}
	}
}

func writeFile(filename string) {
	file, err := os.OpenFile(
		filename,
		os.O_RDWR|os.O_CREATE|os.O_TRUNC,
		0666,
	)
	// OpenFile(name, O_RDWR|O_CREATE|O_TRUNC, 0666)
	// file, err := os.Create(filename)
	if err != nil {
		if pathError, ok := err.(*os.PathError); !ok {
			fmt.Println("Error: ", err.Error())
			panic(err)
		} else {
			fmt.Printf("%s, %s, %s\n",
				pathError.Op,
				pathError.Path,
				pathError.Err)
		}
		return
	}
	defer file.Close()

	writer := bufio.NewWriter(file)
	defer writer.Flush()

	f := fib.Fibonacci()
	for i := 0; i < 20; i++ {
		fmt.Fprintln(writer, f())
	}

}

func main() {
	writeFile("fib.txt")
	// tryDefer()
}
