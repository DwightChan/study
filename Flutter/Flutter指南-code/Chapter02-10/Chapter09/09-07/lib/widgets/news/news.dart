import 'package:flutter/material.dart';
import '../../pages/news_detail.dart';
import './score.dart';
import './news_card.dart';

class News extends StatelessWidget {
  final List<Map<String, dynamic>> news;
  News({this.news});


  Widget buildNewsList() {
    Widget newsCard;
    if (news.length > 0) {
      newsCard = ListView.builder(
        itemBuilder: (BuildContext context ,int index){
          return NewsCard(news[index],index);
        },
        itemCount: news.length,
      );
    } else {
      newsCard = Center(child: Text('没有找到news'));
      // newsCard = Container();
    }
    return newsCard;
  }

  @override
  Widget build(BuildContext context) {
    return  buildNewsList();
  }
}
