import 'package:flutter/material.dart';

class CreateNewsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: RaisedButton(
        child: Text('保存'),
        onPressed: () {
          showModalBottomSheet(
              context: context,
              builder: (BuildContext context) {
                return Center(
                  child: Text('这是一个弹出层'),
                );
              });
        },
      ),
    );
  }
}
