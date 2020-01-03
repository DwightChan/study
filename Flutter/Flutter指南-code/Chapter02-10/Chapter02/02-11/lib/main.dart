import 'package:flutter/material.dart';

main() => runApp(Myapp());

class Myapp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _MyappState();
  }
}

class _MyappState extends State<Myapp> {
  List<String> news = ['first'];
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('资讯标题'),
        ),
        body: Column(
          children: <Widget>[
            Container(
              margin: EdgeInsets.all(10.0),
              child: RaisedButton(
                child: Text('添加资讯'),
                onPressed: () {},
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
