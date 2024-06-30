/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-07-01 03:29:17
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-07-01 03:30:50
 * @FilePath: /study/Go/180/container/queue/queueentry/main.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package main

import (
	"180/container/queue"
	"fmt"
)

func main() {
	q := queue.Queue{1}

	q.Push(2)
	q.Push(3)

	fmt.Println(q.Pop())
	fmt.Println(q.Pop())
	fmt.Println(q.IsEmpty())
	fmt.Println(q.Pop())
	fmt.Println(q.IsEmpty())

}
