import 'package:flutter/material.dart';
import './news.dart';

class NewsManager extends StatefulWidget {
  final String startingNews;
  NewsManager(this.startingNews);
  _NewsManagerState createState() => _NewsManagerState();
}

class _NewsManagerState extends State<NewsManager> {
  List<String> news = ['first'];
  @override
  void initState() {
    super.initState();
    news.add(widget.startingNews);
  }
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Container(
          margin: EdgeInsets.all(10.0),
          child: RaisedButton(
            color: Theme.of(context).primaryColor,
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
