import 'package:flutter/material.dart';
import '../pages/news_list.dart';

class ManageNews extends StatelessWidget {
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
                title: Text('资讯列表'),
                onTap: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) {
                        return NewsListPage();
                      },
                    ),
                  );
                }),
          ],
        ),
      ),
      appBar: AppBar(
        title: Text('管理资讯'),
      ),
      body: Center(
        child: Text('资讯管理页面'),
      ),
    );
  }
}
