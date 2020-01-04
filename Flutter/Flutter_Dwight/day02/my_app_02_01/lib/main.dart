// 有 import '引入文件';
// 表示可以分模块去写代码;
import 'dart:developer';

import 'package:flutter/material.dart';

main() {
  runApp(Myapp());
}

// 如果是自己定义的类 必须要集成 dart 的类
// 引入 package:flutter/material.dart
// 就可以使用 StatelessWidget 这个类;
// class Myapp extends StatelessWidget {
class Myapp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _MyappState();
  }
}

class _MyappState extends State<Myapp> {
  // List<String> news = ['first', 'second', 'third'];
  List<String> news = ['first'];
  // bulid 方法是必须的, 相当于 iOS 中 init 的方法;
  // 其中 参数: context 包含很多信息, 包括 位置/尺寸/navigater/等等;
  // bulid 方法中一定会返回一个小部件, 知道 material 的小部件为止;
  // Widget 类型, 是返回数据类型
  // BuildContext 是形参类型
  // context 是形参
  // build(context) { // 写法一
  @override
  Widget build(BuildContext context) {
    // 写法二
    // MaterialApp 没有括号在后面表示一个类,
    // 有小括号,表示一个类创建的对象;
    return MaterialApp(
      // home 传递的是一个小部件 Scaffold 小部件
      // Scaffold 会被绘制到屏幕上, 默认的是白色背景
      home: Scaffold(
        // appBar: 是顶部导航栏
        appBar: AppBar(
          // 文本标题
          // Text 是接收一个文本的小部件类型;
          title: Text('资讯标题'),
        ),
        body: Column(
          children: <Widget>[
            Container(
              // 四周添加相同的预留边距
              margin: EdgeInsets.all(10.0),
              child: RaisedButton(
                child: Text('添加资讯112'),
                // 点击事件
                onPressed: () {
                  log("我被点击了");
                  // news.add("forth");
                },
              ),
            ),
            Column(
              children: news
                  .map((element) => Card(
                          child: Column(
                        children: <Widget>[
                          Image.asset('assets/news1.jpg'),
                          Text('news1')
                        ],
                      )))
                  .toList(),
            ),
          ],
        ),
      ),
    );
  }
}
