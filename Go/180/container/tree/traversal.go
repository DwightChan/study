/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-07-01 02:35:41
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-07-01 02:35:48
 * @FilePath: /study/Go/180/container/tree/traversal.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package tree

func (node *Node) Traverse() {
	if node == nil {
		return
	}

	node.Left.Traverse()
	node.Print()
	node.Right.Traverse()
}
