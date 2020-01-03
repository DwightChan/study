import 'package:flutter/material.dart';

class CreateNewsPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _CreateNewsPageState();
  }
}

class _CreateNewsPageState extends State<CreateNewsPage>{
  String title = '';
  String description = '';
  double score = 0.0;
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
            maxLength: 5,
            onChanged: (String value) {
              description = value;
            },
          ),
          TextField(
            keyboardType: TextInputType.number,
            onChanged: (String value) {
              score = double.parse(value);
            },
          ),
        ],
      ),
    );
  }
}
