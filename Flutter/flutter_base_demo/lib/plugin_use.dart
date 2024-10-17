import 'package:flutter/material.dart';
import 'package:flutter_color_plugin/flutter_color_plugin.dart';

// 如何使用flutter 饱和插件？
class PluginUse extends StatefulWidget {
  @override
  _PluginUseState createState() => _PluginUseState();
}

class _PluginUseState extends State<PluginUse> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('如何使用Flutter包和插件？'),
        leading: GestureDetector(
          onTap: () {
            Navigator.pop(context);
          },
          child: Icon(Icons.arrow_back),
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget> [
             Text(
              '你点击了这个按钮这么多次:',
              style: TextStyle(color: ColorUtil.color('#333333')),
             ),
          ],
        ),
      ),
    );
  }
}
