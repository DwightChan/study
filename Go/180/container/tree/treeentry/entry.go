/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-07-01 02:43:35
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-07-01 02:54:09
 * @FilePath: /study/Go/180/container/tree/treeentry/entry.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package main

import (
	"180/container/tree"
	"fmt"
)

type myTreeNode struct {
	node *tree.Node
}

func (myNode *myTreeNode) postOrder() {
	if myNode == nil || myNode.node == nil {
		return
	}

	left := myTreeNode{myNode.node.Left}
	right := myTreeNode{myNode.node.Right}

	left.postOrder()
	right.postOrder()
	myNode.node.Print()
}

func testSparse() {
	// s := intsets.Sparse{}

	// s.Insert(1)
	// s.Insert(1000)
	// s.Insert(1000000)
	// fmt.Println(s.Has(1000))
	// fmt.Println(s.Has(10000))
}

func main() {
	var root tree.Node

	root = tree.Node{Value: 3}
	root.Left = &tree.Node{}
	root.Right = &tree.Node{5, nil, nil}
	root.Right.Left = new(tree.Node)
	root.Left.Right = tree.CreateNode(2)
	root.Right.Left.SetValue(4)

	root.Traverse()
	fmt.Println()
	myRoot := myTreeNode{&root}
	myRoot.postOrder()
	fmt.Println()

	testSparse()
}
