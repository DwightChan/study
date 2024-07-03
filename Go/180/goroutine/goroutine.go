/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-07-04 02:59:42
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-07-04 03:18:00
 * @FilePath: /180/goroutine/goroutine.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

package main

import (
	"fmt"
	"time"
)

func main() {
	for i := 0; i < 100; i++ {
		go func(i int) { // race condition
			for {
				fmt.Printf("Hello from goroutine %d\n", i)
			}
		}(i)
	}
	time.Sleep(time.Minute)
}
