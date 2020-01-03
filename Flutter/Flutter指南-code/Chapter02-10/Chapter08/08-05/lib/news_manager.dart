import 'package:flutter/material.dart';

import './news.dart';

class NewsManager extends StatelessWidget {
  final List<Map<String,dynamic>> news;

  NewsManager(this.news);
  @override
  Widget build(BuildContext context) {
    print('news manager的build');
    return Column(
      children: <Widget>[
        News(
          news: news,
        ),
      ],
    );
  }
}
