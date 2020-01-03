import 'package:flutter/material.dart';
// import 'package:flutter/rendering.dart';

import './pages/manage_news.dart';
import './pages/news_list.dart';
import './pages/news_detail.dart';
import './pages/auth.dart';

void main() {
  runApp(Myapp());
  // debugPaintSizeEnabled = true;
  // debugPaintBaselinesEnabled = true;
  // debugPaintPointersEnabled = true;
}

class Myapp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _MyappState();
  }
}

class _MyappState extends State<Myapp>{
  List<Map<String,dynamic>> _news = [];
  void _addNews(Map<String,dynamic> news) {
    setState(() {
      _news.add(news);
    });
  }
  void _deleteNews(int index){
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
      // home: AuthPage(),
      routes: {
        '/admin': (context) {
          return ManageNewsPage(_addNews,_deleteNews);
        },
        '/home': (context) {
          return NewsListPage(_news);
        },
        '/': (context) {
          return AuthPage();
        }
      },
      onGenerateRoute: (RouteSettings settings) {
        final List<String> paths = settings.name.split('/');

        if (paths[0] != '') {
          return null;
        }

        if (paths[1] == 'news') {
          final int index = int.parse(paths[2]);
          return MaterialPageRoute<bool>(builder: (context) {
            return NewsPage(_news[index]['title'], _news[index]['image']);
          });
        }

        return null;
      },
      onUnknownRoute: (RouteSettings settings) {
        return MaterialPageRoute(builder: (context) {
          return NewsListPage(_news);
        });
      },
    );
  }
}
