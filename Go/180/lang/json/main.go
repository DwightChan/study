/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-08-29 11:01:29
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-08-29 11:08:29
 * @FilePath: /180/lang/json/main.go
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"
)

type OrderItem struct {
	ID    string  `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

type Order struct {
	// ID is the unique identifier of the order.
	ID string `json:"id"`
	// json:"items" means the field name in json is "items".
	// 输出的时候 json:"items" 表示输出的时候这个字段名是 "items"
	Items []OrderItem `json:"items"`
	// TotalPrice is the total price of the order.
	TotalPrice float64 `json:"total_price"`
	// 输出的时候 json:"-" 表示不输出这个字段
	// CreatedAt time.Time `json:"-"`
	CreateAt time.Time `json:"-"`
}

func main() {
	marshal()
	unmarshal()
	parseNLP()
}

func marshal() {

	o := Order{
		ID: "123",
		Items: []OrderItem{
			OrderItem{
				ID:    "1",
				Name:  "item1",
				Price: 12.3,
			},
			OrderItem{
				ID:    "2",
				Name:  "item2",
				Price: 21.3,
			},
		},
	}

	b, err := json.Marshal(o)
	if err != nil {
		log.Print(err)
		panic(err)
	}
	fmt.Printf("%s\n", b)
}

func unmarshal() {
	s := `{"id":"123","items":[{"id":"1","name":"item1","price":12.3},{"id":"2","name":"item2","price":21.3}],"total_price":0}`
	var o Order

	err := json.Unmarshal([]byte(s), &o)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", o)
}

func parseNLP() {
	res := `
		{
			"data": [
				{
					"synonym":"",
					"weight":"0.6",
					"word": "真丝",
					"tag":"材质"
				},
				{
					"synonym":"",
					"weight":"0.8",
					"word": "韩都衣舍",
					"tag":"品牌"
				},
				{
					"synonym":"连身裙;联衣裙",
					"weight":"1.0",
					"word": "连衣裙",
					"tag":"品类"
				}
			]
		}
	`
	// m := make(map[string]interface{})
	// err := json.Unmarshal([]byte(res), &m)
	// if err != nil {
	// 	panic(err)
	// }
	// //fmt.Printf("%+v\n", m)
	// // 这里有两个 强转换, 第一个是 m["data"] 是一个数组, 第二个是数组里面的元素是一个 map
	// fmt.Printf("%+v\n", m["data"].([]interface{})[2].(map[string]interface{})["synonym"])
	m := struct {
		Data []struct {
			Synonym string `json:"synonym"`
			Tag     string `json:"tag"`
		} `json:"data"`
	}{}

	err := json.Unmarshal([]byte(res), &m)
	if err != nil {
		panic(err)
	}
/	// 这里的 %+v 是格式化输出, 会输出结构体的字段名

	fmt.Printf("%+v, %+v\n", m.Data[2].Synonym, m.Data[2].Tag)
}
