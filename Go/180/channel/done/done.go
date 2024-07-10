/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-07-11 04:41:12
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-07-11 04:58:22
 * @FilePath: /180/channel/done/done.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package main

import (
	"fmt"
	"sync"
)

func doWork(id int,
	w worker) {
	for n := range w.in {
		fmt.Printf("Worker %d received %c\n",
			id, n)
		// 这里使用了 w.done() 这个函数
		w.done()
	}
}

type worker struct {
	in   chan int
	done func()
	// 这里的
	// wg *sync.WaitGroup
}

// 创建一个 worker
// 这里的 id 是一个 int 类型的参数
// wg 是一个 *sync.WaitGroup 类型的参数
func createWorker(
	id int, wg *sync.WaitGroup) worker {
	w := worker{
		in: make(chan int),
		done: func() {
			wg.Done()
		},
	}
	go doWork(id, w)
	return w
}

func chanDemo() {
	// 创建一个 WaitGroup
	// wg 是一个 *sync.WaitGroup 类型的变量
	// 这里使用了 sync.WaitGroup 的 Add 方法
	// 传入了 20 作为参数
	var wg sync.WaitGroup

	var workers [10]worker
	for i := 0; i < 10; i++ {
		workers[i] = createWorker(i, &wg)
	}
	// 这里使用了 sync.WaitGroup 的 Add 方法
	wg.Add(20)
	for i, worker := range workers {
		worker.in <- 'a' + i
	}
	for i, worker := range workers {
		worker.in <- 'A' + i
	}

	// 这里使用了 sync.WaitGroup 的 Wait 方法
	// 等待所有的协程执行完毕
	wg.Wait()
}

func main() {
	chanDemo()
}
