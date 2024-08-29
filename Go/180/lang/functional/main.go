/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-07-02 03:00:09
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-07-02 03:22:27
 * @FilePath: /180/functional/main.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package main

import (
	"180/functional/fib"
	"bufio"
	"fmt"
	"io"
	"strings"
)

type intGen func() int

func adder() func(int) int {
	sum := 0
	return func(v int) int {
		sum += v
		return sum
	}
}

func (g intGen) Read(p []byte) (n int, err error) {
	next := g()
	s := fmt.Sprintf("%d\n", next)
	return strings.NewReader(s).Read(p)
}
func printFileContents(reader io.Reader) {
	scanner := bufio.NewScanner(reader)
	for i := 0; i < 15 && scanner.Scan(); i++ {
		fmt.Println(scanner.Text())
	}
}

func main() {
	var f intGen = fib.Fibonacci()
	printFileContents(f)
}
