import 'package:flutter/material.dart';

class NewsDetailPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('详情'),
      ),
      body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
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
                Navigator.pop(context);
              },
            )
          ]),
    );
  }
}
