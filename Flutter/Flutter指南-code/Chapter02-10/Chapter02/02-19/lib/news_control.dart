import 'package:flutter/material.dart';

class NewsControl extends StatelessWidget {
 Function addNews;					// 定义方法属性
  NewsControl(this.addNews);	// 在构造器中接收方法引用


  @override
  Widget build(BuildContext context) {
    return Container(
    margin: EdgeInsets.all(10.0),			
    child: RaisedButton(				
      color: Theme.of(context).primaryColor,	
      child: Text('添加资讯'),		
      onPressed: () {					
        addNews('third');	
      },
    ),
  );

  }
}