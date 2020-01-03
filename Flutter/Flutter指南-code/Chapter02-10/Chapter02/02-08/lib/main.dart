import 'package:flutter/material.dart';

main() =>runApp(Myapp());


class Myapp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('资讯标题'),
        ),
        body: Card(child: Column(children: <Widget>[
          Image.asset('assets/news1.jpg'),
          Text('news1')
        ],),),
      ),
    );
  }
}
