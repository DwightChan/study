import 'package:flutter/material.dart';
import './score.dart';

class NewsCard extends StatelessWidget {
  final Map<String, dynamic> news;
  final int index;
  NewsCard(this.news, this.index);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: <Widget>[
          Image.asset(news['image']),
          // SizedBox(
          //   height: 10.0,
          // ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Container(
                margin: EdgeInsets.only(top: 10.0),
                child: Text(
                  news['title'],
                ),
              ),
              SizedBox(
                width: 10,
              ),
              Score(news['score'].toString())
            ],
          ),

          ButtonBar(
            alignment: MainAxisAlignment.center,
            children: <Widget>[
              IconButton(
                icon: Icon(
                  Icons.favorite_border,
                  size: 20,
                  color: Colors.red,
                ),
                onPressed: () => Navigator.pushNamed<bool>(
                        context, '/news/' + index.toString())
                    .then((value) {}),
              ),
            ],
          )
        ],
      ),
    );
  }
}
