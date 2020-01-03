import 'package:flutter/material.dart';
import './news_list.dart';

class AuthPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _AuthPageState();
  }
}

class _AuthPageState extends State<AuthPage> {
  String _username;
  String _password;
  bool _accept = false;
  DecorationImage buildBackgroundImage() {
    return DecorationImage(
      colorFilter:
          ColorFilter.mode(Colors.black.withOpacity(0.5), BlendMode.dstATop),
      fit: BoxFit.cover,
      image: AssetImage('assets/bg.jpg'),
    );
  }

  TextField buildUsernameTextField() {
    return TextField(
      keyboardType: TextInputType.emailAddress,
      decoration: InputDecoration(
          labelText: '用户名', filled: true, fillColor: Colors.white),
      onChanged: (value) {
        setState(() {
          _username = value;
        });
      },
    );
  }

  TextField buildPasswordTextField() {
    return TextField(
      obscureText: true,
      decoration: InputDecoration(
          labelText: '密码', filled: true, fillColor: Colors.white),
      onChanged: (value) {
        setState(() {
          _password = value;
        });
      },
    );
  }

  SwitchListTile buildAccept() {
    return SwitchListTile(
      title: Text('接受条款'),
      value: _accept,
      onChanged: (bool value) {
        setState(() {
          _accept = value;
        });
      },
    );
  }

  void submit() {
    Navigator.pushReplacementNamed(context, '/home');
  }

  @override
  Widget build(BuildContext context) {
final double deviceWidth = MediaQuery.of(context).size.width;
final targetWidth = deviceWidth > 768.0 ? 500.0:deviceWidth * 0.8;

    return Scaffold(
      appBar: AppBar(
        title: Text('登录'),
      ),
      body: Container(
        padding: EdgeInsets.all(10),
        decoration: BoxDecoration(
          image: buildBackgroundImage(),
        ),
        child: Container(
          alignment: Alignment.center,
          child: SingleChildScrollView(
            child: Container(
              width:targetWidth,
              child: Column(
                children: <Widget>[
                  buildUsernameTextField(),
                  SizedBox(
                    height: 10,
                  ),
                  buildPasswordTextField(),
                  buildAccept(),
                  RaisedButton(
                    textColor: Colors.white,
                    color: Theme.of(context).accentColor,
                    child: Text('登录'),
                    onPressed: submit,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
