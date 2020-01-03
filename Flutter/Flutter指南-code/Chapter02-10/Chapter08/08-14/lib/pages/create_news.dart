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
  bool _accept = false;

  Widget buildTitleTextField() {
    return TextField(
      // style: ,
      decoration: InputDecoration(labelText: '资讯标题'),
      // autofocus: true,
      onChanged: (String value) {
        setState(() {
          _title = value;
        });
      },
    );
  }

  Widget buildDescTextField() {
    return TextField(
      decoration: InputDecoration(labelText: '资讯描述'),
      // autofocus: true,
      maxLength: 5,
      maxLines: 8,
      onChanged: (String value) {
        setState(() {
          _description = value;
        });
      },
    );
  }

  Widget buildScoreTextField() {
    return TextField(
      decoration: InputDecoration(labelText: '资讯分数'),
      keyboardType: TextInputType.number,
      // autofocus: true,
      onChanged: (String value) {
        setState(() {
          _score = double.parse(value);
        });
      },
    );
  }

  void _submitForm() {
    Map<String, dynamic> news = {
      'title': _title,
      'image': 'assets/news1.jpg',
      'description': _description,
      'score': _score
    };
    widget.addNews(news);
    Navigator.pushReplacementNamed(context, '/home');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        margin: EdgeInsets.all(10),
        child: ListView(
          children: <Widget>[
            buildTitleTextField(),
            buildDescTextField(),
            buildScoreTextField(),
            SwitchListTile(
              title: Text('接受条款'),
              value: _accept,
              onChanged: (value) {
                setState(() {
                  _accept = value;
                });
              },
            ),
            RaisedButton(
              color: Theme.of(context).accentColor,
              textColor: Colors.white,
              child: Text('创建'),
              onPressed: _submitForm,
            )
          ],
        ),
      ),
    );
  }
}
