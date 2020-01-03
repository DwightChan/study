import 'package:flutter/material.dart';

class MyNewsPage extends StatelessWidget {
  final List<Map<String, dynamic>> news;
  MyNewsPage(this.news);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView.builder(
        itemBuilder: (BuildContext context, int index) {
          return ListTile(
            leading: Image.asset(news[index]['image']),
            title: Text(news[index]['title']),
            trailing: IconButton(
              icon: Icon(Icons.edit),
              onPressed: () {},
            ),
          );
        },
        itemCount: news.length,
      ),
    );
  }
}
