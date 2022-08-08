// JS打包入口文件

// 1. 在 React 学习中，需要安装 两个包 react  react-dom
// 1.1 react 这个包，是专门用来创建React组件、组件生命周期等这些东西的；
// 1.2 react-dom 里面主要封装了和 DOM 操作相关的包，比如，要把 组件渲染到页面上
import React from 'react'
import ReactDOM from 'react-dom'

// 2. 在react 中, 如果要创建 DOM 元素了, 只能使用 React 提供的js api 来创建, 不能 [直接] 像vue 中的那样, 手写 html 元素
// React.createElement() 方法, 用于创建 虚拟 DOM 对象, 他接收 3个及以上的参数
// 参数1: 是个字符串类型的参数, 表示创建的元素类型
// 参数2: 是个一个属性对象, 表示创建的这个元素上, 有哪些属性
// 参数3: 从第三个参数的位置开始, 后面的可以放好多多的虚拟对象, 这些参数, 表示当前元素的字节点
/* <div title="this is a div" id="mydiv">这是一个div</div> */

// var myH1 = React.createElement('h1', null, '这是一个大大的H1')
// var myDiv = React.createElement('div', '{title: '
//     this is a div ', id: '
//     mydiv '}', '这是一个div', myH1)

// ReactDOM.render('要渲染的虚拟DOM元素', '要渲染到页面上的哪个位置中')
// 注意： ReactDOM.render() 方法的第二个参数，和vue不一样，不接受 "#app" 这样的字符串，而是需要传递一个 原生的 DOM 对象
// ReactDOM.render( <div>我是div hello world </div>, document.getElementById('app'))
ReactDOM.render(<div>

</div>, document.getElementById('app'))