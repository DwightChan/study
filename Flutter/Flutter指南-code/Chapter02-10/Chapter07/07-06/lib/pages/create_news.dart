import 'package:flutter/material.dart';

class CreateNewsPage extends StatefulWidget {
  final Function addNews;
  CreateNewsPage(this.addNews);
  @override
  State<StatefulWidget> createState() {
    return _CreateNewsPageState();
  }
}

class _CreateNewsPageState extends State<CreateNewsPage> {
  String _title = '';
  String _description = '';
  double _score = 0.0;
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
                  _title = value;
                });
              },
            ),
          ),
          Container(
            margin: EdgeInsets.all(10.0),
            child: TextField(
              decoration: InputDecoration(labelText: '资讯描述'),
              maxLines: 5,
              onChanged: (String value) {
                _description = value;
              },
            ),
          ),
          Container(
            margin: EdgeInsets.all(10.0),
            child: TextField(
              decoration: InputDecoration(labelText: '资讯分数'),
              keyboardType: TextInputType.number,
              onChanged: (String value) {
                _score = double.parse(value);
              },
            ),
          ),
          SizedBox(
            height: 10,
          ),
          SwitchListTile(
            title: Text('接受条款'),
            value: true,
            onChanged: (value) {},
          ),
          RaisedButton(
            color: Theme.of(context).accentColor,
            textColor: Colors.white,
            child: Text('创建'),
            onPressed: () {
              Map<String, dynamic> news = {
                'title': _title,
                'image': 'assets/news1.jpg',
                'description': _description,
                'score': _score
              };
              widget.addNews(news);
              Navigator.pushReplacementNamed(context, '/');
            },
          )
        ],
      ),
    );
  }
}
