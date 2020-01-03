import 'package:flutter/material.dart';

class EditNewsPage extends StatefulWidget {
  final Map<String, dynamic> news;
  final Function addNews;
  final Function updateNews;
  final int index;
  EditNewsPage({this.addNews, this.news, this.updateNews,this.index});
  @override
  State<StatefulWidget> createState() {
    return _EditNewsPageState();
  }
}

class _EditNewsPageState extends State<EditNewsPage> {
  bool _accept = false;
  final Map<String, dynamic> _formData = {
    'title': null,
    'description': null,
    'score': null,
    'image': 'assets/news1.jpg',
  };
  final GlobalKey<FormState> _formkey = GlobalKey<FormState>();
  Widget buildTitleTextField() {
    return TextFormField(
      initialValue: widget.news == null ? '' : widget.news['title'],
      // autovalidate:true,
      validator: (String value) {
        if (value.trim().length == 0 || value.length < 5) {
          return '资讯标题不能为空,而且不能少于5个字';
        }
        return null;
      },
      onSaved: (String value) {
        _formData['title'] = value;
      },
      decoration: InputDecoration(labelText: '资讯标题'),

      // autofocus: true,
    );
  }

  Widget buildDescTextField() {
    return TextFormField(
      initialValue: widget.news == null ? '' : widget.news['description'],
      onSaved: (String value) {
        _formData['description'] = value;
      },
      decoration: InputDecoration(labelText: '资讯描述'),
      // autofocus: true,
      maxLength: 5,
      maxLines: 8,
    );
  }

  Widget buildScoreTextField() {
    return TextFormField(
      initialValue: widget.news == null ? '' : widget.news['score'].toString(),
      validator: (String value) {
        if (value.isEmpty ||
            !RegExp(r'^(?:[1-9]\d*|0)?(?:\.\d+)?$').hasMatch(value)) {
          return '不能为空';
        }
        return null;
      },
      onSaved: (String value) {
        _formData['score'] = double.parse(value);
      },
      decoration: InputDecoration(labelText: '资讯分数'),
      keyboardType: TextInputType.number,
      // autofocus: true,
    );
  }

  void _submitForm() {
    if (!_formkey.currentState.validate()) {
      return;
    }
    _formkey.currentState.save();

    if (widget.news == null) {
      widget.addNews(_formData);
    }else{
       widget.updateNews(widget.index,_formData);
    }

    Navigator.pushReplacementNamed(context, '/home');
  }

  @override
  Widget build(BuildContext context) {
    final double deviceWidth = MediaQuery.of(context).size.width;
    final targetWidth = deviceWidth > 768.0 ? 500.0 : deviceWidth * 0.8;
    final targetPadding = (deviceWidth - targetWidth) / 2;
    final Widget pageContent = GestureDetector(
      onTap: () {
        FocusScope.of(context).requestFocus(FocusNode());
      },
      child: Container(
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

    return widget.news == null
        ? Scaffold(body: pageContent)
        : Scaffold(
            appBar: AppBar(
              title: Text('编辑资讯'),
            ),
            body: pageContent);
  }
}
