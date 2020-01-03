import 'package:flutter/material.dart';
import 'package:news/pages/create_news.dart';
import 'package:news/pages/my_news.dart';
import '../pages/news_list.dart';

class ManageNews extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
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
                      Navigator.pushReplacementNamed(context, '/');
                    }),
              ],
            ),
          ),
          appBar: AppBar(
            title: Text('管理资讯'),
            bottom: TabBar(
              tabs: <Widget>[
                Tab(
                  text: '创建资讯',
                  icon: Icon(Icons.create),
                ),
                Tab(
                  text: '我的资讯',
                  icon: Icon(Icons.edit),
                )
              ],
            ),
          ),
          body: TabBarView(
            children: <Widget>[CreateNewsPage(), MyNewsPage()],
          )),
    );
  }
}
