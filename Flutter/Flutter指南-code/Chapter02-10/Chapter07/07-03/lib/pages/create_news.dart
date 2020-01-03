import 'package:flutter/material.dart';

class CreateNewsPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _CreateNewsPageState();
  }
}

class _CreateNewsPageState extends State<CreateNewsPage> {
  String title = '';
  String description = '';
  double score = 0.0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView(
        children: <Widget>[
          Container(
            margin: EdgeInsets.all(10.0),
            child: TextField(
              decoration: InputDecoration(labelText: '资讯标题'),
              onChanged: (String value) {
                setState(() {
                  title = value;
                });
              },
            ),
          ),
          Container(
            margin: EdgeInsets.all(10.0),
            child: TextField(
              decoration: InputDecoration(labelText: '资讯描述'),
              maxLines: 15,
              onChanged: (String value) {
                description = value;
              },
            ),
          ),
          Container(
            margin: EdgeInsets.all(10.0),
            child: TextField(
              decoration: InputDecoration(labelText: '资讯分数'),
              keyboardType: TextInputType.number,
              onChanged: (String value) {
                score = double.parse(value);
              },
            ),
          ),
        ],
      ),
    );
  }
}
