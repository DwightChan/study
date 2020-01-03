import 'package:flutter/material.dart';

class NewsDetailPage extends StatelessWidget {
  final String title;
  final String imageUrl;
  NewsDetailPage({this.title, this.imageUrl});

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () {
        Navigator.pop(context, false); // 执行弹出内容
        return Future.value(false); // 返回Future<bool>的值
      },
      child: Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: Column(
            // mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Image.asset('assets/news1.jpg'),
              Center(
                child: Container(
                  padding: EdgeInsets.all(10),
                  child: Text('资讯详情页'),
                ),
              ),
              RaisedButton(
                color: Theme.of(context).accentColor,
                child: Text('返回'),
                onPressed: () {
                  Navigator.pop(context, true);
                },
              )
            ]),
      ),
    );
  }
}
