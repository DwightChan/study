/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-07-03 04:05:14
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-07-03 04:44:02
 * @FilePath: /180/container/nonrepeatingsubstr/nonrepeating_test.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package main

import "testing"

// TestSubstr 用于测试非重复子串
// 运行测试并生成覆盖率报告：
// 指令终端输出 go test -coverprofile=c.out
// 生成 HTML 报告：
// 指令终端输出 go tool cover -html=c.out
func TestSubstr(t *testing.T) {
	tests := []struct {
		s   string
		ans int
	}{
		// Normal cases
		{"abcabcbb", 3},
		{"pwwkew", 3},

		// Edge cases
		{"", 0},
		{"b", 1},
		{"bbbbbb", 1},
		{"abcabcabcd", 4},

		// Chinese support
		{"这里是慕课网", 6},
		{"一二三二一", 3},
		{"黑化肥挥发发灰会花飞灰化肥挥发发黑会飞花", 8},
	}

	for _, tt := range tests {
		if actual := lengthOfNonRepeatingSubStr(tt.s); actual != tt.ans {
			t.Errorf("Got %d for input %s; expected %d", actual, tt.s, tt.ans)
		}
	}
}

// BenchmarkSubstr 用于测试性能
// 指令终端输出 go test -bench .
// 通过 -bench 参数可以指定要运行的测试函数
// 指令终端输出 go test -bench Substr
// 通过 -bench 参数可以指定要运行的测试函数
// 指令终端输出 go test -bench Substr -cpuprofile cpu.out
// 需要安装 graphviz 才能生成图片 go tool pprof cpu.out --pdf
// 安装 graphviz 指令终端输出 brew install graphviz
// 通过 go tool pprof cpu.out 可以查看 CPU 信息文件
// 通过 -cpuprofile 参数可以生成 CPU 信息文件
// 指令终端输出 go tool pprof cpu.out
// 指令终端输出 top
// 通过 top 可以查看 CPU 信息文件
// 指令终端输出 list lengthOfNonRepeatingSubStr
func BenchmarkSubstr(b *testing.B) {
	s, ans := "黑化肥挥发发灰会花飞灰化肥挥发发黑会飞花", 8

	for i := 0; i < 13; i++ {
		s = s + s
	}
	b.Logf("len(s) = %d", len(s))
	// 重置计时器
	// 重置计时器是因为在执行 BenchmarkSubstr 函数之前，testing 包会执行一次 BenchmarkSubstr 函数，以便计算执行时间
	b.ResetTimer()

	// b.N 会根据函数的运行时间取一个合适的值
	for i := 0; i < b.N; i++ {
		if actual := lengthOfNonRepeatingSubStr(s); actual != ans {
			b.Errorf("Got %d for input %s; expected %d", actual, s, ans)
		}
	}
}
