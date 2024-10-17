/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-10-17 23:04:33
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-10-17 23:26:31
 * @FilePath: /flutter_base_demo/lib/gesture_page.dart
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import 'package:flutter/material.dart';

class Gesturepage extends StatefulWidget {
  const Gesturepage({super.key});

  @override
  State<Gesturepage> createState() => _GesturepageState();
}

class _GesturepageState extends State<Gesturepage> {

  String printString = '';
  double moveX = 0, moveY = 0;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('如何检测用户手势以及处理点击事件？'),
          leading: GestureDetector(
            onTap: () {
              Navigator.pop(context);
            },
            child: Icon(Icons.arrow_back),
          ),
        ),
        body: FractionallySizedBox(
          widthFactor: 1,
          child: Stack(
            children: [
              Column(
                children: [
                  GestureDetector(
                    onTap: () => _printMsg('点击'),
                    onDoubleTap: () => _printMsg('双击'),
                    onLongPress: () => _printMsg('长按'),
                    onTapCancel: () => _printMsg('取消'),
                    onTapUp: (e) => _printMsg('松开'),
                    onTapDown: (e) => _printMsg('按下'),
                    child: Container(
                      padding: EdgeInsets.all(60),
                      decoration: BoxDecoration(color: Colors.blue),
                      child: Text('点我', style: TextStyle(fontSize: 36, color: Colors.white)),
                    ),
                  ),
                  Text(printString),
                ],
              ),
              Positioned(
                left: moveX,
                top: moveY,
                child: GestureDetector(
                  onPanUpdate: (e) => _doMove(e),
                  child: Container(
                    width: 72,
                    height: 72,
                    decoration: BoxDecoration(color: Colors.amber, borderRadius: BorderRadius.circular(36)),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );

  }


  _printMsg(String msg) {
    setState(() {
      printString += ' , $msg';
    });
  }
  _doMove(DragUpdateDetails e) {
    setState(() {
      moveX += e.delta.dx;
      moveY += e.delta.dy;
    });
  }
  


}