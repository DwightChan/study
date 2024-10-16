/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-10-17 20:47:35
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-10-18 11:02:02
 * @FilePath: /flutter_base_demo/lib/main.dart
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import 'package:flutter/material.dart';
import 'package:flutter_base_demo/flutter_layout_page.dart';
import 'package:flutter_base_demo/gesture_page.dart';
import 'package:flutter_base_demo/launch_page.dart';
import 'package:flutter_base_demo/less_group_page.dart';
import 'package:flutter_base_demo/photo_app_page.dart';
import 'package:flutter_base_demo/plugin_use.dart';
import 'package:flutter_base_demo/res_page.dart';
import 'package:flutter_base_demo/statefull_group_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('如何创建和使用Flutter 的路由和导航？')
        ),
        body: RouteNavigator(),
      ),
      routes: <String, WidgetBuilder>{
        'plugin': (BuildContext context) => PluginUse(),
        'less': (BuildContext context) => LessGroupPage(),
        'ful': (BuildContext context) => StatefullGroup(),
        'layout': (BuildContext context) => FlutterLayoutPage(),
        'gesture': (BuildContext context) => Gesturepage(),
        'res': (BuildContext context) => ResPage(),
        'launch': (BuildContext context) => Launchpage(),
        'photo': (BuildContext context) => PhotoApp(),
      },

    );
  }
}

class RouteNavigator extends StatefulWidget {
  @override
  State<RouteNavigator> createState() => _RouteNavigatorState();
}

class _RouteNavigatorState extends State<RouteNavigator> {

  bool byName = false;

  @override
  Widget build(BuildContext context) {
  
    return Container(
      child: Column(
        children: <Widget>[
          SwitchListTile(
            title: Text("${byName ? '' : '不'}通过路由名跳转"),
            value: byName,
            onChanged: (value) {
              setState(() {
                byName = value;
              });
            }),
          _item('如何使用Flutter包和插件？', PluginUse(), 'plugin'),
          _item('如何检测用户手势以及处理点击事件？', Gesturepage(), 'gesture'),
          _item('StateFulWidget 与基础组件', StatefullGroup(), 'ful'),
          _item('如何进行Flutter布局开发', FlutterLayoutPage(), 'layout'),
          _item('如何导入和使用Flutter的资源文件？', ResPage(), 'res'),
          _item('如何打开第三方应用？', Launchpage(), 'launch'),
          _item('【实战尝鲜】拍照app开发', PhotoApp(), 'photo'),
        ],
      ),
    );
  }

  _item(String title, page, String routeName) {
    return Container(
      child: ElevatedButton(
        onPressed: () {
          if (byName) {
            Navigator.pushNamed(context, routeName);
          } else {
            Navigator.push(context, MaterialPageRoute(builder: (context) => page));
          }
        },
        child: Text(title),
      ),
    );
  }
}
