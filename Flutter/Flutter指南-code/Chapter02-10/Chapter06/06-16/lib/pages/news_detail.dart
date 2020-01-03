import 'package:flutter/material.dart';

class NewsDetailPage extends StatelessWidget {
  final String title;
  final String imageUrl;
  NewsDetailPage({this.title, this.imageUrl});

  _showDialogWarning(BuildContext context) {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
              title: Text('确定吗'),  
              content: Text('删除后不可以撤销！'),  
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
              ]);
        });
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () {
        Navigator.pop(context, false);  
        return Future.value(false); 
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
                onPressed: () =>_showDialogWarning(context),
              )
            ]),
      ),
    );
  }
}
