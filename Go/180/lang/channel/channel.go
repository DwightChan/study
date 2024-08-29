/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-07-04 03:31:03
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-07-11 04:35:00
 * @FilePath: /180/channel/channel.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package main

import (
	"fmt"
	"time"
)

func worker(id int, c chan int) {

	// fort {
	// 	n, ok := <-c
	// 	if !ok {
	// 		break
	// 	}
	// 	fmt.Printf("Worker %d received %c\n", id, n)
	// }

	// 这里使用了 range c
	for n := range c {
		// fmt.Printf("Worker %d received %c\n",
		// id, n)
		fmt.Printf("Worker %d received %d\n",
			id, n)
	}
}

// 创建一个 worker
// 返回一个 channel
// 这个 channel 只能往里面发送数据 因为是 chan<- int 或者 <-chan int
func createWorker(id int) chan<- int {
	c := make(chan int)
	// go 协程 的概念 不会马上执行 会等待主线程执行完毕
	go worker(id, c)
	return c
}

func chanDemo() {
	// 如果这里使用 箭头 chan<- int
	// 表示只能往 channel 里面发送数据
	var channels [10]chan<- int
	for i := 0; i < 10; i++ {
		channels[i] = createWorker(i)
	}

	for i := 0; i < 10; i++ {
		channels[i] <- 'a' + i
		// 上面使用了 chan<- int
		// 因此这里不能在使用 <-channels[i] 收数据
		// fmt.Printf("Worker %d received %c\n",
	}

	for i := 0; i < 10; i++ {
		channels[i] <- 'A' + i
	}

	time.Sleep(time.Millisecond)
}

func bufferedChannel() {
	// 这里设置了 channel 的缓冲区为 3
	// 因此可以发送 3 个数据
	// 但是如果发送第 4 个数据的时候
	// 会阻塞
	// 因为 channel 的缓冲区已经满了
	// 但是如果在 channel 里面有数据被取走
	// 那么就可以继续发送数据
	c := make(chan int, 3)
	// 这里创建了一个 worker
	// 这个 worker 会一直等待 channel 里面的数据
	// 然后打印出来
	// 这里使用了 range c
	// 表示只要 channel 里面还有数据
	// 就会一直循环
	// 直到 channel 里面的数据被取完
	// 那么就会退出循环
	// 但是如果 channel 里面的数据还没有被取完
	// 那么就会一直等待
	// 直到 channel 里面的数据被取完
	// 才会退出循环
	go worker(0, c)
	c <- 'a'
	c <- 'b'
	c <- 'c'
	c <- 'd'
	time.Sleep(time.Millisecond)
}

// channel close and range
// 如果 channel 里面的数据被取完了
// 那么就会退出循环
// 但是如果 channel 里面的数据还没有被取完
// 那么就会一直等待
// 直到 channel 里面的数据被取完
// 才会退出循环
func channelClose() {
	c := make(chan int)
	go worker(0, c)
	c <- 'a'
	c <- 'b'
	c <- 'c'
	c <- 'd'
	// 表示 channel 里面的数据已经被取完了
	// 那么就会退出循环
	close(c)
	time.Sleep(time.Millisecond)
}

func main() {
	fmt.Println("Channel as first-class citizen")
	chanDemo()
	fmt.Println("Buffered channel")
	bufferedChannel()
	fmt.Println("Channel close and range")
	channelClose()
}
