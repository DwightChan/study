import 'package:flutter/material.dart';

class News extends StatelessWidget {
  final List<String> news;
  News([this.news = const []]);
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

  @override
  Widget build(BuildContext context) {
    if (news.length > 0) {						// 如果news的长度大于0
      return Expanded(
              child: ListView.builder(				// 返回builder构建的列表
          itemBuilder: _buildNewItem,
          itemCount: news.length,
        ),
      );
    } else {
      return Center(child: Text('没有找到news'));	// 居中的文字
    }

  }
}
