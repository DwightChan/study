/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-07-01 02:35:41
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-07-11 05:10:11
 * @FilePath: /study/Go/180/container/tree/traversal.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package tree

import "fmt"

func (node *Node) Traverse() {
	node.TraverseFunc(func(n *Node) {
		n.Print()
	})
	fmt.Println()
}

func (node *Node) TraverseFunc(f func(*Node)) {
	if node == nil {
		return
	}

	node.Left.TraverseFunc(f)
	f(node)
	node.Right.TraverseFunc(f)
}

// 使用 channel 遍历
func (node *Node) TraverseWithChannel() chan *Node {

	out := make(chan *Node)
	go func() {
		node.TraverseFunc(func(node *Node) {
			out <- node
		})
		close(out)
	}()
	return out
}
