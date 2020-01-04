import 'package:flutter/material.dart';

// runApp方法 的参数, 必须是一个小部件
// void 表示方法没有返回值
// void 可以不写
void main() {
  runApp(Myapp());
}

class Myapp extends StatelessWidget {
  // @override 表示重写这个方法;
  @override
  // Widget 类型, 是返回数据类型
  // BuildContext 是形参类型
  // context 是形参
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('资讯标题'),
        ),
      ),
    );
  }
}
