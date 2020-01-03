import 'package:flutter/material.dart';

class NewsControl extends StatelessWidget{
  final Function addNews;
  NewsControl(this.addNews);

  @override
  Widget build(BuildContext context) {
    return Container(
          margin: EdgeInsets.all(10.0),
          child: RaisedButton(
            color: Theme.of(context).primaryColor,
            child: Text('添加资讯'),
            onPressed: () {
             addNews({'title':'other','image':'assets/news1.jpg'});
            },
          ),
        );
  }
}