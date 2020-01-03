import 'package:flutter/material.dart';

import './my_news.dart';
import './edit_news.dart';

class ManageNews extends StatelessWidget {
  final Function addNews;
  final Function deleteNews;
  final Function updateNews;
  final List<Map<String,dynamic>> news;
  ManageNews(this.addNews,this.deleteNews,this.news,this.updateNews);

  Widget buildDrawer(BuildContext context){
    return Drawer(
          child: Column(
            children: <Widget>[
              AppBar(
                automaticallyImplyLeading: false,
                title: Text('选择'),
              ),
              ListTile(
                leading: Icon(Icons.list),
                title: Text('资讯列表'),
                onTap: () {
                  Navigator.pushReplacementNamed(context, '/home');
                  // Navigator.push(
                  //   context,
                  //   MaterialPageRoute(builder: (context) {
                  //     return NewsListPage();
                  //   }),
                  // );
                },
              )
            ],
          ),
        );
  }
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        drawer: buildDrawer(context),
        appBar: AppBar(
          bottom: TabBar(
            tabs: <Widget>[
              Tab(
                text: '创建资讯',
                icon: Icon(Icons.create),
              ),
              Tab(
                text: '我的资讯',
                icon: Icon(Icons.mail),
              )
            ],
          ),
          title: Text('管理资讯'),
        ),
        body: TabBarView(
          children: <Widget>[EditNewsPage(addNews:addNews), MyNewsPage(news,updateNews,deleteNews)],
        ),
      ),
    );
  }
}
