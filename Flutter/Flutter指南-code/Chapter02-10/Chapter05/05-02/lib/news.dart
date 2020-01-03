import 'package:flutter/material.dart';

class News extends StatelessWidget {
  final List<String> news;
  News([this.news = const []]);

  @override
  Widget build(BuildContext context) {
    Widget _buildNewItem(context, index) {
      // 构建列表中元素的方法
      return Card(
        // 返回构建的Card小部件
        child: Column(
          children: <Widget>[
            Image.asset('assets/news1.jpg'), // Card中的图片
            Text(news[index])
          ], // Card中的文字
        ),
      );
    }

    return Expanded(
      child: ListView.builder(
        itemBuilder: _buildNewItem,
        itemCount: news.length,
      ),
    );
  }
}
