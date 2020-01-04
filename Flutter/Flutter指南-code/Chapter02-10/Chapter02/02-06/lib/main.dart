import 'package:flutter/material.dart';

main() {
  runApp(Myapp());
}

class Myapp extends StatelessWidget {
  build(context) {
    // MaterialApp 需要参数
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
      ),
    );
  }
}
