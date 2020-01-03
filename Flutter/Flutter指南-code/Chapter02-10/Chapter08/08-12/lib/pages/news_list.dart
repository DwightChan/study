import 'package:flutter/material.dart';

import '../widgets/news/news.dart';
import 'manage_news.dart';

class NewsListPage extends StatelessWidget {
  final List<Map<String, dynamic>> news;

  NewsListPage(this.news);

  Widget buildDrawer(BuildContext context){
    return Drawer(
        child: Column(
          children: <Widget>[
            AppBar(
              
              automaticallyImplyLeading: false,
              title: Text('选择'),
            ),
            ListTile(
              leading: Icon(Icons.edit),
              title: Text('管理资讯'),
              onTap: () {
                Navigator.pushReplacementNamed(context, '/admin');
                // Navigator.pushReplacement(
                //     context, MaterialPageRoute(builder: (context) {
                //       return ManageNewsPage();
                //     }));
              },
            )
          ],
        ),
      );
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: buildDrawer(context),
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
