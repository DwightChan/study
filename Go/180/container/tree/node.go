/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-07-01 02:27:15
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-07-01 02:33:28
 * @FilePath: /study/Go/180/container/tree/node.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package tree

import "fmt"

type Node struct {
	Value       int
	Left, Right *Node
}

// 这里可以接收值 node 对象
// 如果传的是指针接收者则从指针中取出值 传过来
func (node Node) Print() {
	fmt.Print(node.Value, " ")
}

// 值传递 是拷贝 ，修改之后 不影响原来对象的元素值
// 注意这里如果需要修改 接收者 node对象 中的元素值
// 这里需要 使用指针接收者 * 星号；
func (node *Node) SetValue(value int) {
	if node == nil {
		fmt.Println("Setting Value to nil " +
			"node. Ignored.")
		return
	}
	node.Value = value
}

func CreateNode(value int) *Node {
	return &Node{Value: value}
}
