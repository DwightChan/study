/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-08-15 12:17:11
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-08-15 12:20:42
 * @FilePath: /180/basic/atomic/atomic.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package main


import (
	"fmt"
	"sync"
	"time"
)


type atomicInt struct {
	value int
	lock sync.Mutex
}

func (a *atomicInt) increment() {

	fmt.Println("safe increment")
	func() {
		a.lock.Lock()
		defer a.lock.Unlock()
		a.value++
	}()
}

func (a *atomicInt) get() int {
	a.lock.Lock()
	defer a.lock.Unlock()
	return a.value
}

func main() {

	var a atomicInt
	a.increment()
	go func() {
		a.increment()
	}()
	time.Sleep(time.Millisecond)
	fmt.Println(a.get())
}