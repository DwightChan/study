/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-07-01 03:26:26
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-07-01 03:28:22
 * @FilePath: /study/Go/180/container/queue/queue.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package queue

type Queue []int

func (q *Queue) Push(v int) {
	*q = append(*q, v)
}

func (q *Queue) Pop() int {
	head := (*q)[0]
	*q = (*q)[1:]
	return head
}

func (q *Queue) IsEmpty() bool {
	return len(*q) == 0
}
