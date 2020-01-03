import 'package:flutter/material.dart';

class CreateNewsPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _CreateNewsPageState();
  }
}

class _CreateNewsPageState extends State<CreateNewsPage>{
  String title = '';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: <Widget>[
          TextField(
            onChanged: (String value) {
              setState(() {
                title = value;
              });
            },
          ),
          TextField(
            onChanged: (String value) {
            },
          ),
          TextField(
            onChanged: (String value) {
            },
          ),
          Text(title)
        ],
      ),
    );
  }
}
