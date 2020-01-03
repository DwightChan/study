import 'package:flutter/material.dart';

import '../news_manager.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('资讯标题'),
      ),
      body: NewsManager(),
    );
  }
}
