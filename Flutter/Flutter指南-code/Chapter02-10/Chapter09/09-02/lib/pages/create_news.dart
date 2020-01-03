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
  final GlobalKey<FormState> _formkey = GlobalKey<FormState>();
  Widget buildTitleTextField() {
    return TextFormField(
      autovalidate:true,
      validator: (String value){
        if(value.trim().length == 0){
          return '资讯标题不能为空';
        }
        return null;
      },
      onSaved: (String value) {
        setState(() {
          _title = value;
        });
      },
      decoration: InputDecoration(labelText: '资讯标题'),

      // autofocus: true,
    );
  }

  Widget buildDescTextField() {
    return TextFormField(
      onSaved: (String value) {
        setState(() {
          _description = value;
        });
      },
      decoration: InputDecoration(labelText: '资讯描述'),
      // autofocus: true,
      maxLength: 5,
      maxLines: 8,
    );
  }

  Widget buildScoreTextField() {
    return TextFormField(
       onSaved: (String value) {
        setState(() {
          _score =double.parse(value);
        });
      },
      decoration: InputDecoration(labelText: '资讯分数'),
      keyboardType: TextInputType.number,
      // autofocus: true,
    );
  }

  void _submitForm() {
    _formkey.currentState.save();
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
    final double deviceWidth = MediaQuery.of(context).size.width;
    final targetWidth = deviceWidth > 768.0 ? 500.0 : deviceWidth * 0.8;
    final targetPadding = (deviceWidth - targetWidth) / 2;
    return Scaffold(
      body: Container(
        width: targetWidth,
        margin: EdgeInsets.all(10),
        child: Form(
          key: _formkey,
          child: ListView(
            padding: EdgeInsets.symmetric(horizontal: targetPadding),
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
              // GestureDetector(
              //   onTap: _submitForm,
              //   child: Container(
              //     padding: EdgeInsets.all(5.0),
              //     color: Theme.of(context).accentColor,
              //     child: Text('创建'),
              //   ),
              // ),

              RaisedButton(
                color: Theme.of(context).accentColor,
                textColor: Colors.white,
                child: Text('创建'),
                onPressed: _submitForm,
              )
            ],
          ),
        ),
      ),
    );
  }
}
