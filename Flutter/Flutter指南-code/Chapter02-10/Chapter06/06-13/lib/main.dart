import 'package:flutter/material.dart';
import 'package:news/pages/auth.dart';
import 'package:news/pages/manage_news.dart';
import 'package:news/pages/news_detail.dart';
import 'package:news/pages/news_list.dart';
import './news_manager.dart';

// import 'package:flutter/rendering.dart';

main() {
// debugProfilePaintsEnabled = true;
  runApp(Myapp());
}

class Myapp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _MyappState();
  }
}

class _MyappState extends State<Myapp> {
  List<Map<String, dynamic>> _news = [];
  void _addNews(Map<String, dynamic> news) {
    setState(() {
      _news.add(news);
    });
  }

  void _deleteNews(int index) {
    setState(() {
      _news.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        // debugShowMaterialGrid: true,
        theme: ThemeData(
          primaryColor: Colors.deepOrange,
          accentColor: Colors.deepOrange,
          brightness: Brightness.light,
        ),
        routes: {
          '/admin': (context) {
            return ManageNews();
          },
          '/': (context) {
            return NewsListPage(_news, _addNews, _deleteNews);
          }
        },
        onGenerateRoute: (RouteSettings settings) {
          final List<String> paths = settings.name.split('/');
          // 路径生成器
          if (paths[0] != '') {
            // 导航路径中的第一个元素
            return null; // 不加载任何页面
          }

          if (paths[1] == 'news') {
            final int index = int.parse(paths[2]);
            return MaterialPageRoute<bool>(builder: (context) {
              return NewsDetailPage(
                  title: _news[index]['title'],
                  imageUrl: _news[index]['image']);
            });
          }
        }

        // home: AuthPage(),
        );
  }
}
