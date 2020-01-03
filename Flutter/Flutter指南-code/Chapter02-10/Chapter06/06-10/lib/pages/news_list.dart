import 'package:flutter/material.dart';
import 'package:news/pages/manage_news.dart';

import '../news_manager.dart';

class NewsListPage extends StatelessWidget {
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
                Navigator.pushReplacement(
                  // 导航到资讯管理页面
                  context,
                  MaterialPageRoute(
                    // 导航的路径
                    builder: (context) {
                      return ManageNews(); // 资讯管理页面
                    },
                  ),
                );
              },
            )
          ],
        ),
      ),
      appBar: AppBar(
        title: Text('资讯标题'),
      ),
      body: NewsManager(),
    );
  }
}
