/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-07-02 01:15:30
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-07-02 01:19:18
 * @FilePath: /study/Go/180/retriever/real/retriever.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package real

import (
	"net/http"
	"net/http/httputil"
	"time"
)

type Retriever struct {
	UserAgent string
	TimeOut   time.Duration
}

func (r *Retriever) Get(url string) string {
	resp, err := http.Get(url)
	if err != nil {
		panic(err)
	}

	result, err := httputil.DumpResponse(
		resp, true)

	resp.Body.Close()

	if err != nil {
		panic(err)
	}

	return string(result)
}
