import 'package:flutter/material.dart';

class News extends StatelessWidget {
  final List<String> news;
  News([this.news = const[]]);
  @override
  Widget build(BuildContext context) {
    return Expanded(
          child: ListView(
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
    );
  }
}
