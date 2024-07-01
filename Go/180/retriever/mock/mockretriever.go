/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-07-02 01:12:02
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-07-02 02:05:23
 * @FilePath: /study/Go/180/retriever/mock/mockretriever.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package mock

import "fmt"

type Retriever struct {
	Contents string
}

func (r *Retriever) String() string {
	return fmt.Sprintf(
		"Retriever: {Contents=%s}", r.Contents)
}

func (r *Retriever) Post(url string,
	form map[string]string) string {
	r.Contents = form["contents"]
	return "ok"
}

func (r *Retriever) Get(url string) string {
	return r.Contents
}
