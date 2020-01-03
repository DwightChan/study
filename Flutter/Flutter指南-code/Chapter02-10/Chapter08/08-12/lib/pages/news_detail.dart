import 'package:flutter/material.dart';
import 'dart:async';
import '../widgets/ui_element/title_default.dart';

class NewsPage extends StatelessWidget {
  final String title;
  final String imageUrl;
  NewsPage(this.title, this.imageUrl);

  _showDialogWarning(BuildContext context){
    showDialog(context: context, builder: (BuildContext context) {
                  return AlertDialog(
                    title: Text('确定吗？'),
                    content: Text('删除不可以撤销！'),
                    actions: <Widget>[
                      FlatButton(
                        child: Text('删除'),
                        onPressed: () {
                           Navigator.pop(context);
                           Navigator.pop(context, true);
                        },
                      ),
                      FlatButton(
                        child: Text('取消'),
                        onPressed: () {
                          Navigator.pop(context);
                        },
                      )
                    ],
                  );
                });
  }
  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () {
        Navigator.pop(context, false);
        print('返回按钮被点击');
        return Future.value(false);
      },
      child: Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Image.asset(imageUrl),
            Container(
              padding: EdgeInsets.all(10),
              child: TitleDefault('$title')
            ),
            RaisedButton(
              child: Text('删除'),
              color: Theme.of(context).accentColor,
              onPressed: ()=> _showDialogWarning(context),
            )
          ],
        ),
      ),
    );
  }
}
