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
		// go 协程 的概念 
		// 
		go func(i int) { // race condition!
			for {
				fmt.Printf("Hello from goroutine %d\n", i)
			}
		}(i)
	}
	time.Sleep(time.Minute)
}

/**
协程和线程都是用于并发执行代码的方式，但它们在实现和使用上有许多区别。下面是协程和线程的主要区别：

### 协程 (Goroutine)

1. **轻量级**：协程非常轻量级，创建和销毁的开销很低。一个 Go 程序可以轻松地运行成千上万个协程，而不会有明显的性能影响。

2. **用户态管理**：协程在用户态管理，不需要内核态的上下文切换，因此它们的上下文切换非常快。

3. **协作式多任务**：协程使用协作式多任务模型。一个协程主动让出 CPU 使用权，另一个协程才能运行。这意味着协程在某些操作上需要显式的 `await` 或 `yield`。

4. **调度器**：Go 语言有内建的协程调度器，自动将协程映射到操作系统线程上运行。Go 的运行时系统会处理所有协程的调度工作，使得开发者无需显式地管理线程。

5. **低内存占用**：每个协程的初始内存栈很小（例如几 KB），并且可以根据需要动态增长。

6. **无竞争条件**：协程之间通常不会互相竞争资源，因为它们在用户空间被调度，降低了锁竞争和死锁的风险。

### 线程

1. **重量级**：线程相对来说比较重量级，创建和销毁的开销较高。运行大量线程时会占用更多的系统资源，尤其是在涉及大量线程的情况下。

2. **内核态管理**：线程由操作系统的内核管理，需要内核态的上下文切换，这会带来额外的性能开销。

3. **抢占式多任务**：线程使用抢占式多任务模型，操作系统会根据时间片自动调度线程，这样会导致频繁的上下文切换。

4. **调度器**：操作系统内核负责线程的调度工作。开发者可以利用多线程库（如 `pthread`）来管理线程，但最终还是由操作系统来进行实际的线程调度。

5. **高内存占用**：每个线程的内存栈比较大（例如几 MB），并且是固定大小的。

6. **竞争条件**：线程之间可能会竞争资源，例如访问共享数据时，需要使用锁（mutex）等同步原语来避免竞争条件和死锁问题。

### 比较总结

| 特性              | 协程 (Goroutine)             | 线程 (Thread)                  |
|-----------------|--------------------------|----------------------------|
| 管理方式          | 用户态管理                     | 内核态管理                       |
| 调度方式          | 协作式多任务                     | 抢占式多任务                       |
| 创建/销毁开销      | 低                          | 高                            |
| 上下文切换         | 快                          | 慢                            |
| 内存栈大小         | 小且可动态增长                   | 大且固定大小                      |
| 竞争条件          | 少                          | 多，需使用同步原语避免竞争               |
| 数量              | 支持大量协程运行                  | 支持的线程数量有限                  |

### 实际应用

- **协程**：适用于 I/O 密集型和高并发的场景，例如 web 服务器、网络爬虫、并发数据库查询等。Go 语言的协程 (`goroutine`) 和通道 (`channel`) 提供了简单高效的并发编程模型。

- **线程**：适用于 CPU 密集型任务以及需要并行处理的任务，例如图像处理、大数据计算、多媒体处理等。线程模型在需要利用多核 CPU 并行计算时非常有用，但需要仔细处理线程同步和竞争条件问题。

### 示例代码

**协程示例** (Go)：

```go
package main

import (
    "fmt"
    "time"
)

func printNumbers() {
    for i := 1; i <= 5; i++ {
        fmt.Println(i)
        time.Sleep(100 * time.Millisecond)
    }
}

func main() {
    go printNumbers()  // 启动一个新的协程
    go printNumbers()  // 启动另一个新的协程

    // 等待所有协程完成
    time.Sleep(1 * time.Second)
}
```

**线程示例** (Python)：

```python
import threading
import time

def print_numbers():
    for i in range(1, 6):
        print(i)
        time.sleep(0.1)

thread1 = threading.Thread(target=print_numbers)
thread2 = threading.Thread(target=print_numbers)

thread1.start()
thread2.start()

thread1.join()
thread2.join()
```

通过上述比较和示例代码，希望能够帮助你更好地理解协程和线程之间的区别以及它们在实际应用中的使用场景。
*/