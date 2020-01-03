import 'package:flutter/material.dart';
import './news_manager.dart';
import './pages/home.dart';
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
      home: HomePage()
    );
  }
}
