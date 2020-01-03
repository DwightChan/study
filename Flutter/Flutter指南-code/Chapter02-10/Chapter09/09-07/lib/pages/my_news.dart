import 'package:flutter/material.dart';
import 'package:flutter_news/pages/edit_news.dart';

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
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (BuildContext context){
                      return EditNewsPage(news:news[index]);
                    }
                  ),
                );
              },
            ),
          );
        },
        itemCount: news.length,
      ),
    );
  }
}
