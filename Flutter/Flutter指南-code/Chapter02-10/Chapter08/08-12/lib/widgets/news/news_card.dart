import 'package:flutter/material.dart';
import './score.dart';
import '../ui_element/title_default.dart';
import './address.dart';
class NewsCard extends StatelessWidget{
  final Map<String,dynamic> news;
  final int index;
  NewsCard(this.news,this.index);

  @override
  Widget build(BuildContext context) {
    
    Widget buildTitleScoreRow(){
      return Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              TitleDefault(news['title']),
              SizedBox(
                width: 10,
              ),
              Score(
                news['score'].toString(),
              )
            ],
          );
    }

    Widget buildActionButtons(){
      return ButtonBar(
            alignment: MainAxisAlignment.center,
            children: <Widget>[
              IconButton(
                color: Colors.red,
                icon: Icon(Icons.details),
                onPressed: () {
                  Navigator.pushNamed<bool>(
                      context, '/news/' + index.toString());
                },
              ),
              IconButton(
                color: Colors.red,
                icon: Icon(Icons.favorite_border),
                onPressed: () {
                  Navigator.pushNamed<bool>(
                      context, '/news/' + index.toString());
                },
              )
            ],
          );
    }
    return Card(
      child: Column(
        children: <Widget>[
          Image.asset('assets/news1.jpg'),
          // SizedBox(height: 10,),
          
          buildTitleScoreRow(),
          Address('北京朝阳'),
          buildActionButtons()
        ],
      ),
    );
  }
}