import 'package:flutter/material.dart';
import './news.dart';
import './news_manager.dart';

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
        body: NewsManager(),
      ),
    );
  }
}
