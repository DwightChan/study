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
  bool accept = false;
  double _score = 0.0;

  Widget buildTitleTextField() {
    return TextField(
      // style: ,
      decoration: InputDecoration(labelText: '标题'),
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
      decoration: InputDecoration(labelText: '描述'),
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
      decoration: InputDecoration(labelText: '分数'),
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
    widget.addNews({
      'title': _title,
      'description': _description,
      'score': _score,
      'image': 'assets/news1.jpg'
    });
    Navigator.pushReplacementNamed(context, '/home');
  }

  @override
  Widget build(BuildContext context) {
    final double deviceWidth = MediaQuery.of(context).size.width;
    final targetWidth = deviceWidth > 768.0 ? 500 : deviceWidth * 0.8;
    final targetPadding = deviceWidth - targetWidth;
    return Container(
      // width: targetWidth,
      margin: EdgeInsets.all(10),
      child: ListView(
        padding: EdgeInsets.symmetric(horizontal: targetPadding / 2),
        children: <Widget>[
          buildTitleTextField(),
          buildDescTextField(),
          buildScoreTextField(),
          SizedBox(
            height: 10,
          ),
          GestureDetector(
            onTap: _submitForm,
            child: Container(
              color: Colors.red,
              padding: EdgeInsets.all(5),
              child: Text('创建'),
            ),
          )

          // RaisedButton(
          //   color: Theme.of(context).accentColor,
          //   textColor: Colors.white,
          //   child: Text('创建'),
          //   onPressed: _submitForm,
          // ),
        ],
      ),
    );
  }
}
