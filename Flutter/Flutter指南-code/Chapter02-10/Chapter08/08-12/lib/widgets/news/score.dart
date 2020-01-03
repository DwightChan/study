import 'package:flutter/material.dart';

class Score extends StatelessWidget{
  final String score;
  Score(this.score);
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Container(
                  padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2.5),
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(5.0),
                      color: Theme.of(context).accentColor),
                  child: Text(
                    '\$ $score',
                    style: TextStyle(color: Colors.white),
                  ),
                );
  }
}