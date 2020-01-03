import 'package:flutter/material.dart';
import './news.dart';
import './news_control.dart';

class NewsManager extends StatefulWidget {
  final Map startingNews;
  NewsManager({this.startingNews});
  _NewsManagerState createState() => _NewsManagerState();
}

class _NewsManagerState extends State<NewsManager> {
  List<Map<String, String>> _news = [];

  @override
  void initState() {
    super.initState();
    if (widget.startingNews != null) {
      _news.add(widget.startingNews);
    }
  }

  void _addNews(Map news) {
    setState(() {
      _news.add(news);
    });
  }

  void _deleteNews(int index) {
    setState(() {
      _news.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        NewsControl(_addNews),
        News(
          news: _news,
          deleteNews: _deleteNews,
        )
      ],
    );
  }
}
