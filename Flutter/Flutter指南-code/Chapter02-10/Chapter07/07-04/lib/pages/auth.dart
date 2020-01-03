import 'package:flutter/material.dart';
import 'package:flutter_news/pages/news_list.dart';

class AuthPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('登录'),
      ),
      body: Center(
        child: RaisedButton(
          child: Text('登录'),
          onPressed: () {
             
          },
        ),
      ),
    );
  }
}
