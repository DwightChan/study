import 'package:flutter/material.dart';
import 'package:flutter_news/pages/edit_news.dart';

class MyNewsPage extends StatelessWidget {
  final List<Map<String, dynamic>> news;
  final Function updateNews;
  MyNewsPage(this.news, this.updateNews);

  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
      body: ListView.builder(
        itemBuilder: (BuildContext context, int index) {
          Key key = Key(news[index]['title']);
          return Dismissible(
            background: Container(color:Colors.red),
            key: key,
            child: Column(
              children: <Widget>[
                ListTile(
                  leading: CircleAvatar(
                    backgroundImage: AssetImage(news[index]['image']),
                  ),
                  title: Text(news[index]['title']),
                  subtitle: Text('${news[index]['score']}'),
                  trailing: IconButton(
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
                  ),
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
