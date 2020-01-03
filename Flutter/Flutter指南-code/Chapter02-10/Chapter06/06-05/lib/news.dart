import 'package:flutter/material.dart';
import './pages/news_detail.dart';

class News extends StatelessWidget {
  final List<Map<String, String>> news; //	News小部件中的属性
  News([this.news = const []]);
  Widget _buildNewItem(context, index) {
    return Card(
      child: Column(
        children: <Widget>[
          Image.asset('assets/news1.jpg'),
          Text(
            news[index]['title'],
          ),
          ButtonBar(
            alignment: MainAxisAlignment.center,
            children: <Widget>[
              FlatButton(
                child: Text('详情'),
                onPressed: () => Navigator.push(context,
                    MaterialPageRoute(builder: (context) {
                  // 创建路径
                  return NewsDetailPage(title: news[index]['title'],					// 传入标题
	  imageUrl: news[index]['iamge'],		
);
                })),
              ),
            ],
          )
        ],
      ),
    );
  }

  Widget buildNewsList() {
    Widget newsCard;
    newsCard = Center(child: Text('没有找到news'));
    if (news.length > 0) {
      newsCard = Expanded(
        child: ListView.builder(
          itemBuilder: _buildNewItem,
          itemCount: news.length,
        ),
      );
    }
    return newsCard;
  }

  @override
  Widget build(BuildContext context) {
    return buildNewsList();
  }
}
