import 'package:flutter/material.dart';
import 'package:flutter_news/pages/news_list.dart';

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
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('登录'),
      ),
      body: Container(
        padding: EdgeInsets.all(10),
        decoration: BoxDecoration(
          image: DecorationImage(
            colorFilter: ColorFilter.mode(
                Colors.black.withOpacity(0.5), BlendMode.dstATop),
            fit: BoxFit.cover,
            image: AssetImage('assets/bg.jpg'),
          ),
        ),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              children: <Widget>[
                TextField(
                  decoration: InputDecoration(
                      labelText: '用户名', filled: true, fillColor: Colors.white),
                  onChanged: (value) {
                    setState(() {
                      _username = value;
                    });
                  },
                ),
                SizedBox(
                  height: 10,
                ),
                TextField(
                  obscureText: true,
                  decoration: InputDecoration(
                      labelText: '密码', filled: true, fillColor: Colors.white),
                  onChanged: (value) {
                    setState(() {
                      _password = value;
                    });
                  },
                ),
                SwitchListTile(
                  title: Text('接受条款'),
                  value: _accept,
                  onChanged: (bool value) {
                    setState(() {
                      _accept = value;
                    });
                  },
                ),
                Center(
                  child: RaisedButton(
                    child: Text('登录'),
                    onPressed: () {
                      Navigator.pushReplacementNamed(context, '/home');
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
