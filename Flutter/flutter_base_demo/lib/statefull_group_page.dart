


import 'package:flutter/material.dart';

class StatefullGroup extends StatefulWidget {
  const StatefullGroup({Key? key}) : super(key: key);

  @override
  _StatefullGroupState createState() => _StatefullGroupState();
}

class _StatefullGroupState extends State<StatefullGroup> {

  int _currentIndex = 0;
  @override
  Widget build(BuildContext context) {
    TextStyle textStyle = TextStyle(fontSize: 20);

    return MaterialApp(
      title: "StateFulWidget 与基础组件",
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('StateFulWidget 与基础组件'),
        ),
        bottomNavigationBar: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: (index) {
            setState(() {
              _currentIndex = index;
            });
          },
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
            )
          ],),
          floatingActionButton: FloatingActionButton(
            onPressed: null,
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
                      Image.network('https://www.devio.org/img/avatar.png',
                        width: 100, height: 100,),
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
                      )
                    ],
                  ),
                )
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

  _item(String s, Color deepPurple) {
    return Container(
      alignment: Alignment.center,
      decoration: BoxDecoration(color: deepPurple),
      child: Text(
        s,
        style: TextStyle(fontSize: 22, color: Colors.white),
      ),
    );
  }
}
