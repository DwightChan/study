/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-10-17 21:15:05
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-10-17 21:23:40
 * @FilePath: /flutter_base_demo/lib/less_group_page.dart
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class LessGroupPage extends StatelessWidget {
  const LessGroupPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    TextStyle textStyle = TextStyle(fontSize: 20);

    return MaterialApp(
        title: 'StatelessWidget与基础组件',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: Scaffold(
          appBar: AppBar(
            title: Text('StatelessWidget与基础组件'),
          ),
          body: Container(
            decoration: BoxDecoration(color: Colors.white),
            alignment: Alignment.center,
            child: Column(
              children: <Widget>[
                Text('I am Text', style: textStyle),
                Icon(Icons.android, size: 50, color: Colors.red),
                CloseButton(),
                BackButton(),
                Chip(
                  avatar: Icon(Icons.people),
                  label: Text('StatelessWidget与基础组件'),
                ),
                Divider(
                  height: 10, // 容器高度，不是线的高度
                  indent: 10, // 左侧间距
                  color: Colors.orange,
                ),
                Card(
                  color: Colors.blue,
                  elevation: 5,
                  margin: EdgeInsets.all(10),
                  child: Container(
                    padding: EdgeInsets.all(10),
                    child: Text('I am Card',
                        style: textStyle),
                  ),
                ),
                AlertDialog(
                  title: Text('盘他'),
                  content: Text('你这个糟老头子坏的很'),
                )
              ],
            ),
          ),

        )
    );
  }
}
