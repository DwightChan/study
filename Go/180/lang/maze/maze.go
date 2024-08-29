/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-08-20 11:08:13
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-08-22 14:53:31
 * @FilePath: /180/lang/maze/maze.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package main

import (
	"os"
	"fmt"
)

func readMaze(filename string) [][]int {
	// 打开文件
	file, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	
	var row, col int
	// 读取文件的行和列
	// 读取文件的内容 第一行 内容 放到 row 和 col 中
	fmt.Fscanf(file, "%d %d", &row, &col)
	fmt.Println("row: ", row, "col: ", col)	
	// 创建一个二维数组
	// 二维数组的长度是 row
	maze := make([][]int, row)
	// 读取文件的内容
	for i := range maze {
		// 一维数组的长度是 col
		maze[i] = make([]int, col)
		// 读取文件的内容
		for j := range maze[i] {
			// 读取文件的内容 放到 maze[i][j] 中
			fmt.Fscanf(file, "%d", &maze[i][j])
		}
	}
	
	return maze
}

type point struct {
	i, j int
}

var dirs = [4]point{{-1, 0}, {0, -1}, {1, 0}, {0, 1}}
func (p point) add (r point) point {
	return point{p.i + r.i, p.j + r.j}
}
func (p point) at(grid [][]int) (int, bool) {
	if p.i < 0 || p.i >= len(grid) {
		return 0, false
	}
	if p.j < 0 || p.j >= len(grid[p.i]) {
		return 0, false
	}
	return grid[p.i][p.j], true
}

func walk(maze [][]int, 
	start, end point) [][]int {
	steps := make([][]int, len(maze))

	for i := range steps {
		steps[i] = make([]int, len(maze[i]))
	}
	// 创建一个队列 Q
	Q := []point{ start }

	for len(Q) > 0 {
		cur := Q[0]

		Q = Q[1:]

		if cur == end {
			break
		}

		for _, dir := range dirs {
			next := cur.add(dir)

			val, ok := next.at(maze)
			if !ok || val == 1 {
				continue
			}

			val, ok = next.at(steps)
			if !ok || val != 0 {
				continue
			}

			if next == start {
				continue
			}

			curSteps, _ := cur.at(steps)
			steps[next.i][next.j] = curSteps + 1

			Q = append(Q, next)
		}
	}

	return steps
}


func main()  {
	
	maze := readMaze("maze.in")

	for _, row := range maze {
		for _, val := range row {
			fmt.Printf("%3d ", val)
		}
		fmt.Println()
	}

	fmt.Println("-------------------")

	steps := walk(maze, point{0, 0},
		point{len(maze) - 1, len(maze[0]) - 1})

	for _, row := range steps {
		for _, val := range row {
			// %3d 表示占3个字符的宽度
			fmt.Printf("%3d ", val)
		}
		// 换行
		fmt.Println()
	}
	
}