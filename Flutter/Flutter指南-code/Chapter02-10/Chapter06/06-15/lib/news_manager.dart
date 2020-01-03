import 'package:flutter/material.dart';
import './news.dart';
import './news_control.dart';

class NewsManager extends StatelessWidget {
  final List<Map<String, dynamic>> news;
  final Function addNews;
  final Function deleteNews;
  NewsManager(this.news, this.addNews, this.deleteNews);
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        NewsControl(addNews),
        News(
          news: news,
          deleteNews: deleteNews,
        )
      ],
    );
  }
}
