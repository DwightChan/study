/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-08-16 11:50:39
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-08-19 12:21:50
 * @FilePath: /180/channel/pattern/main.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

package main

import (
	"fmt"
	"time"
	"math/rand"
)


// 这里的 name 是一个 string 类型的参数
// 这里的 done 是一个 chan struct{} 类型的参数, 这里的 chan struct{} 是一个空的 channel
// struct{} 是一个空的结构体 比 bool 更省空间
func msgGen(name string, done chan struct{}) chan string {
	c := make(chan string)
	go func() {
		i := 0
		for {

			select {
				case <-time.After(time.Duration(rand.Intn(1500)) * time.Millisecond):
					c <- fmt.Sprintf("service %s: message %d", name, i)
				case <-done:
					fmt.Println("service", name, "shutting down")
					time.Sleep(2 * time.Second)
					fmt.Println("service", name, "shut down")
					// close(c)
					done <- struct{}{}
					return
			}
			// time.Sleep(time.Millisecond * time.Duration(rand.Intn(5000)))
			// // c <- "hello"
			// // fmt.Sprintf 是格式化输出
			// c <- fmt.Sprintf("service %s: message %d", name, i)
			i++
		}
	}()
	return c
}

func fanIn(chs ...<-chan string) <-chan string {
	out := make(chan string)
	for _, ch := range chs {
		// 注意这里的参数是 ch
		// 这里的 ch 是一个 chan string 类型的参数
		// 这里的 ch 是一个只读的 channel
		go func(c <-chan string) {
			for {
				out <- <-c
			}
		}(ch)
	}
	return out
}

// func fanInBySelect(chs ...<-chan string) <-chan string {
// 	out := make(chan string)
// 	for _, ch := range chs {
// 		go func(c <-chan string) {
// 			for {
// 				select {
// 				case m := <-c:
// 					out <- m
// 				}
// 			}
// 		}(ch)
// 	}
// 	return out
// }

func fanInBySelect(c1, c2 chan string) chan string {
	c := make(chan string)
	go func() {
		for {
			select {
			case m := <-c1:
				c <- m
			case m := <-c2:
				c <- m
			}
		}
	}()
	return c
}

// 非阻塞的 channel
func nonBlockingWait(c chan string) (string , bool) {
	select {
	case m := <-c:
		return m, true
	default:
		return "", false
	}
}

func timeoutWait(c chan string, timeout time.Duration) (string, bool) {
	select {
	case m := <-c:
		return m, true
	case <-time.After(timeout):
		return "", false
	}
}


func main() {

	// m1 := msgGen("service1")
	// m2 := msgGen("service2")

	// // m := fanInBySelect(m1, m2)
	// for {
	// 	// fmt.Println(<-m)
	// 	// m<-"hello world"
	// 	fmt.Println(<-m1)

	// 	if m, ok := nonBlockingWait(m2); ok {
	// 		fmt.Println(m)
	// 	} else {
	// 		fmt.Println("no message from service2")
	// 	}
	// }

	// m1 := msgGen("service1")
	// for {
	// 	if m, ok := timeoutWait(m1, 2 * time.Second); ok {
	// 		fmt.Println(m)
	// 	} else {
	// 		fmt.Println("time out no message from service1")
	// 	}
	// }

	// m1 := msgGen("service1")
	// // 只做 5 次循环 用于测试
	// for i := 0; i < 5; i++ {
	// 	if m, ok := timeoutWait(m1, 2 * time.Second); ok {
	// 		fmt.Println(m)
	// 	} else {
	// 		fmt.Println("time out no message from service1")
	// 	}
	// }
	// 执行完之后会发现程序退出


	done := make(chan struct{})
	m1 := msgGen("service1", done)
	for i := 0; i < 5; i++ {
		if m, ok := timeoutWait(m1, 2 * time.Second); ok {
			fmt.Println(m)
		} else {
			fmt.Println("time out no message from service1")
		}
	}
	// 这里关闭了 channel , 发送一个空的 struct{} 类型的数据
	done <- struct{}{}
	// // 这里关闭了 channel
	// time.Sleep(time.Second)

	// 这里接收一个空的 struct{} 类型的数据, 收到之后会退出
	<-done
}
