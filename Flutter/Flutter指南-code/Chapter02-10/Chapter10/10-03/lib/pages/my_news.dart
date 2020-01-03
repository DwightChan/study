import 'package:flutter/material.dart';
import 'package:flutter_news/pages/edit_news.dart';

class MyNewsPage extends StatelessWidget {
  final List<Map<String, dynamic>> news;
  final Function updateNews;
  final Function deleteNews;
  MyNewsPage(this.news, this.updateNews, this.deleteNews);

  Widget _buildEditButton(BuildContext context, int index) {
    return IconButton(
      icon: Icon(Icons.edit),
      onPressed: () {
        Navigator.of(context).push(
          MaterialPageRoute(builder: (BuildContext context) {
            return EditNewsPage(
              news: news[index],
              index: index,
              updateNews: updateNews,
            );
          }),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView.builder(
        itemBuilder: (BuildContext context, int index) {
          Key key = Key(news[index]['title']);
          return Dismissible(
            onDismissed: (DismissDirection direction) {
              if (direction == DismissDirection.endToStart) {
                deleteNews(index);
              }
            },
            background: Container(color: Colors.red),
            key: key,
            child: Column(
              children: <Widget>[
                ListTile(
                  leading: CircleAvatar(
                    backgroundImage: AssetImage(news[index]['image']),
                  ),
                  title: Text(news[index]['title']),
                  subtitle: Text('${news[index]['score']}'),
                  trailing: _buildEditButton(context, index),
                ),
                Divider()
              ],
            ),
          );
        },
        itemCount: news.length,
      ),
    );
  }
}
