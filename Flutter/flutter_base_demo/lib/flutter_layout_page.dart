
import 'dart:ffi';

import 'package:flutter/material.dart';

class FlutterLayoutPage extends StatefulWidget {
  const FlutterLayoutPage({Key? key}) : super(key: key);

  @override
  State<FlutterLayoutPage> createState() => _FlutterLayoutPageState();
}

class _FlutterLayoutPageState extends State<FlutterLayoutPage> {

  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    TextStyle textStyle = TextStyle(fontSize: 20);

    return MaterialApp(
      title: '如何进行Flutter布局开发',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('如何进行Flutter布局开发'),
          leading: GestureDetector(
            onTap: () {
              Navigator.pop(context);
            },
            child: Icon(Icons.arrow_back),
          ),
        ),
        bottomNavigationBar: BottomNavigationBar(
          items: [
            BottomNavigationBarItem(
              icon: Icon(Icons.home, color: Colors.grey,),
              activeIcon: Icon(Icons.home, color: Colors.blue),
              label: '首页',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.list, color: Colors.grey,),
              activeIcon: Icon(Icons.list, color: Colors.blue),
              label: '列表',
            ),
          ]),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            print('FloatingActionButton');
          },
          child: Text('点我'),
        ),
        body: _currentIndex == 0 ? RefreshIndicator(
          child: ListView(
            children: <Widget>[
              Container(
                decoration: BoxDecoration(color: Colors.white),
                alignment: Alignment.center,
                child: Column(
                  children: <Widget>[
                    Row(
                      children: [
                        ClipOval(
                          child: SizedBox(
                            width: 100,
                            height: 100,
                            child: Image.network('https://www.devio.org/img/avatar.png'),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.all(10),
                          child: ClipRRect(
                            borderRadius: BorderRadius.all(Radius.circular(10)),
                            child: Opacity(
                              opacity: 0.6,
                              child: Image.network('https://www.devio.org/img/avatar.png',
                                width: 100, height: 100,),
                            ),
                          ),
                        ),
                      ]
                    ),
                    TextField(
                      decoration: InputDecoration(
                        contentPadding: EdgeInsets.all(10),
                        hintText: '请输入',
                        hintStyle: TextStyle(fontSize: 15)
                      ),
                    ),
                    Container(
                      height: 100,
                      margin: EdgeInsets.only(top: 10),
                      decoration: BoxDecoration(color: Colors.lightBlueAccent),
                      child: PageView(
                        children: <Widget>[
                          _item('Page1', Colors.deepPurple),
                          _item('Page2', Colors.green),
                          _item('Page3', Colors.red),
                        ],
                      ),
                    ),
                    Column(
                      children: <Widget>[
                        FractionallySizedBox(
                          widthFactor: 1,
                          child: Container(
                            decoration: BoxDecoration(color: Colors.green),
                            child: Text('宽度撑满'),
                          ),
                        )
                      ],
                    ),
                  ],
                ),
              ),
              Stack(
                children: <Widget>[
                  Image.network('https://www.devio.org/img/avatar.png',
                    width: 100, height: 100,),
                  Positioned(
                    left: 0,
                    bottom: 0,
                    child: Image.network('https://www.devio.org/img/avatar.png',
                      width: 36, height: 36,),
                  )
                ],
              ),
              Wrap(
                spacing: 8,
                runSpacing: 6,
                children: <Widget>[
                  _chip('Flutter', Colors.blue),
                  _chip('进阶', Colors.red),
                  _chip('实战', Colors.orange),
                  _chip('携程', Colors.green),
                  _chip('APP', Colors.purple),
                ],
              ),
            ],
          ),
          onRefresh: _handleRefresh,
        ) : Text('列表'),
      ),
    );

  }

  Future<Null> _handleRefresh() async {
    await Future.delayed(Duration(milliseconds: 200));
    return null;
  }
  _item(String title, Color color) {
    return Container(
      alignment: Alignment.center,
      decoration: BoxDecoration(color: color),
      child: Text(
        title,
        style: TextStyle(fontSize: 22, color: Colors.white),
      ),
    );
  }

  _chip(String label, Color color) {
    return Chip(
      label: Text(label),
      backgroundColor: color,
    );
  }
}
