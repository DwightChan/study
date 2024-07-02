/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-07-03 02:35:52
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-07-03 03:48:20
 * @FilePath: /180/errhandling/filelistingserver/filelisting/handler.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package filelisting

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
)

const prefix = "/list/"

type userError string

func (e userError) Error() string {
	return e.Message()
}

func (e userError) Message() string {
	return string(e)
}

func HandleFileList(writer http.ResponseWriter,
	request *http.Request) error {

	fmt.Println("request.URL.Path: ", request.URL.Path)
	index := strings.Index(request.URL.Path, prefix)
	fmt.Println("index: ", index)
	if index != 0 {
		return userError("path must start " +
			"with " + prefix)
	}
	path := request.URL.Path[len(prefix):]
	file, err := os.Open(path)
	if err != nil {
		return err
	}
	defer file.Close()

	all, err := ioutil.ReadAll(file)
	if err != nil {
		return err
	}

	writer.Write(all)
	return nil
}
