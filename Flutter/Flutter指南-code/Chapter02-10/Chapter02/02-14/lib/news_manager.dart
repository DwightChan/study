import 'package:flutter/material.dart';
import './news.dart';

class NewsManager extends StatefulWidget {
  _NewsManagerState createState() => _NewsManagerState();
}

class _NewsManagerState extends State<NewsManager> {
  List<String> news = ['first'];
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Container(
          margin: EdgeInsets.all(10.0),
          child: RaisedButton(
            child: Text('添加资讯'),
            onPressed: () {
              setState(() {
                news.add('second');
              });
            },
          ),
        ),
        News(news)
      ],
    );
  }
}
