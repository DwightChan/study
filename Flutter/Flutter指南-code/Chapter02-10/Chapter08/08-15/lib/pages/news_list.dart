import 'package:flutter/material.dart';
import '../widgets/news/news.dart';

class NewsListPage extends StatelessWidget {
  final List<Map<String, dynamic>> news;

  NewsListPage(this.news);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: Drawer(
        child: Column(
          children: <Widget>[
            AppBar(
              automaticallyImplyLeading: false,
              title: Text('选择'),
            ),
            ListTile(
              leading: Icon(Icons.list),
              title: Text('管理资讯'),
              onTap: () {
                Navigator.pushReplacementNamed(context, '/admin');
              },
            )
          ],
        ),
      ),
      appBar: AppBar(
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.favorite),
            onPressed: () {},
          )
        ],
        title: Text('资讯标题'),
      ),
      body: News(news:news),
    );
  }
}
