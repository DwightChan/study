// js 打包入口文件
import $ from 'jquery'
// 发布思路: 
// 1. bundle.js 中存放自己的代码;
// 2. 第三方包的代码, 则全部抽屉到另外的 js 中

import './css/index.scss'

$(function() {
    $('li:odd').css('backgroundColor', 'pink')
    $('li:even').css('backgroundColor', 'lightblue')
})

class Person {
    static info = {
        name: 'zs'
    }
}

console.log(Person.info)