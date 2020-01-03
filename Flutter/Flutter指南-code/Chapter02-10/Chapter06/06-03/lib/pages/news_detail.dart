import 'package:flutter/material.dart';

class NewsDetailPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('详情'),
      ),
      body: Column(children: <Widget>[
        Center(
          child: Text('资讯详情页'),
        ),
        RaisedButton(
          child: Text('返回'),
          onPressed: () {
            Navigator.pop(context);
          },
        )
      ]),
    );
  }
}
