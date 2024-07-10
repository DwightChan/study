/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-07-11 05:11:16
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-07-11 05:54:53
 * @FilePath: /180/channel/select/select.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func generator() chan int {
	out := make(chan int)
	go func() {
		i := 0
		for {
			time.Sleep(
				time.Duration(rand.Intn(1500)) *
					time.Millisecond)
			out <- i
			i++
		}
	}()
	return out
}

func worker(id int, c chan int) {
	for n := range c {
		time.Sleep(time.Second)
		fmt.Printf("Worker %d received %d\n",
			id, n)
	}
}

func createWorker(id int) chan<- int {
	c := make(chan int)
	go worker(id, c)
	return c
}

func main() {

	var c1, c2 = generator(), generator() // c1 and c2 = nil

	worker := createWorker(0)
	n := 0

	var values []int

	// 这里使用了 time.After 函数
	// time.After 函数会返回一个 channel
	tm := time.After(10 * time.Second)
	// 这里使用了 time.Tick 函数
	// time.Tick 函数会返回一个 channel
	// 这个 channel 每隔一个时间段会发送一个数据
	tick := time.Tick(time.Second)

	for {

		var activeWorker chan<- int
		var activeValue int
		if len(values) > 0 {
			activeWorker = worker
			activeValue = values[0]
		}

		// 这里使用了 select 语法
		// select 语法可以同时处理多个 channel
		// 如果多个 channel 同时准备好
		// 那么 select 会随机选择一个执行
		select {
		case n = <-c1:
			// 如果 c1 准备好了
			// 那么执行这里
			// 这里的 n 是从 c1 里面取出的数据
			// 这里的 n 是 int 类型
			// fmt.Println("Received from c1:", n)
			values = append(values, n)
		case n = <-c2:
			values = append(values, n)
		case activeWorker <- activeValue:
			values = values[1:]

		// 注意 这里 的 case <-time.After(800 * time.Millisecond):
		// 和 case <-tick: 是不一样的
		// time.After 函数会返回一个 channel
		// 这个 channel 会在指定的时间后发送一个数据
		// 而 time.Tick 函数会返回一个 channel
		// 这个 channel 每隔一个时间段会发送一个数据
		// 因此这里的 case <-time.After(800 * time.Millisecond):
		// 只会执行一次
		// 而 case <-tick: 会每隔一个时间段执行一次
		// 而且 tick 调用可能影响 select 的执行
		// 因为 select 会随机选择一个 case 执行 可能 跳过掉 time.After(800 * time.Millisecond)
		// 定时器
		case <-time.After(800 * time.Millisecond):
			fmt.Println("timeout")
		case <-tick:
			fmt.Println("queue len =", len(values))
		case <-tm:
			fmt.Println("bye")
			return
		}
	}
}
