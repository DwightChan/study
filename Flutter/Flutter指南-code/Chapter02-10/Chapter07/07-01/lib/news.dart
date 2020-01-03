import 'package:flutter/material.dart';
import './pages/news_detail.dart';

class News extends StatelessWidget {
  final List<Map<String, String>> news;
  final Function deleteNews;
  News({this.news,this.deleteNews});

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
                onPressed: () => Navigator.pushNamed<bool>(context, '/news/'+index.toString()
                ).then((value){
                  print(value);
                  if(value){
                    deleteNews(index);
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
    if (news.length > 0) {
      newsCard = ListView.builder(
        itemBuilder: _buildNewItem,
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
    return Expanded(
      child: buildNewsList(),
    );
  }
}
