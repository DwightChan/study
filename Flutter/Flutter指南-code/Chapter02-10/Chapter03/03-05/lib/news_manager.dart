import 'package:flutter/material.dart';
import './news.dart';
import './news_control.dart';

class NewsManager extends StatefulWidget {
  final String startingNews;
  NewsManager({this.startingNews = 'third'});
  _NewsManagerState createState() => _NewsManagerState();
}

class _NewsManagerState extends State<NewsManager> {
  List<String> news = ['first'];
  void _addNews(String _news) {
    setState(() {
      news.add(_news);
      print(_news);
    });
  }

  @override
  void initState() {
    super.initState();
    news.add(widget.startingNews);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[NewsControl(_addNews), News(news)],
    );
  }
}
