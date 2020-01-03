import 'package:flutter/material.dart';
import './news.dart';
import './news_control.dart';

class NewsManager extends StatefulWidget {
  final String startingNews;
  NewsManager({this.startingNews = 'third'});
  _NewsManagerState createState() => _NewsManagerState();
}

class _NewsManagerState extends State<NewsManager> {
  List<String> _news = [];

  @override
  void initState() {
    super.initState();
    if (widget.startingNews != null) {
      _news.add(widget.startingNews);
    }
  }

  void _addNews(String news) {
    setState(() {
      _news.add(news);
      print(_news);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[NewsControl(_addNews), News(_news)],
    );
  }
}
