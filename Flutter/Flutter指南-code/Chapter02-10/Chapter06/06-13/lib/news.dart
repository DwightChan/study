import 'package:flutter/material.dart';
import './pages/news_detail.dart';

class News extends StatelessWidget {
  final List<Map<String, dynamic>> news;
  final Function deleteNews;
  News({this.news, this.deleteNews});
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
                onPressed: () => Navigator.push<bool>(context,
                    MaterialPageRoute(builder: (context) {
                  // 创建路径
                  return NewsDetailPage(
                    title: news[index]['title'],
                    imageUrl: news[index]['iamge'],
                  );
                })).then((value) {
                  if (value) {
                    // 判断value的值
                    deleteNews(index); // 如果为true，在列表页删除这条记录
                  }
                }),
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
