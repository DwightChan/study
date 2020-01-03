import 'package:flutter/material.dart';
import 'package:news/pages/auth.dart';
import 'package:news/pages/manage_news.dart';
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
  List<String> news = ['first'];
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
        // 命名路径
        '/admin': (context) {
          // 路径的key
          return ManageNews(); //路径的value,通过builder返回对应的页面
        },
        '/': (context) {
          //	登录页面的导航路径
          return AuthPage(); //  登录页面
        }
      },
      // home: AuthPage(),
    );
  }
}
