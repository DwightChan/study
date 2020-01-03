import 'package:flutter/material.dart';
import '../news_manager.dart';

class NewsListPage extends StatelessWidget {
  final List<Map<String,dynamic>> news;
  final Function addNews;
  final Function deleteNews;
  NewsListPage(this.news,this.addNews,this.deleteNews);
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
              title: Text('管理资讯'),
              onTap: () {
                Navigator.pushReplacementNamed(context, '/admin');
              },
            )
          ],
        ),
      ),
      appBar: AppBar(
        title: Text('资讯标题'),
      ),
      body: NewsManager(news,addNews,deleteNews),
    );
  }
}
