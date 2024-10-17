/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-10-18 00:31:24
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-10-18 00:42:56
 * @FilePath: /flutter_base_demo/lib/launch_page.dart
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

/// 如何打开第三方应用
class Launchpage extends StatefulWidget {
  const Launchpage({super.key});

  @override
  State<Launchpage> createState() => _LaunchpageState();
}

class _LaunchpageState extends State<Launchpage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('如何打开第三方应用'),
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
          children: <Widget>[
            ElevatedButton(
              onPressed: () => _openMap(),
              child: Text('打开地图'),
            ),
            ElevatedButton(
              onPressed: () => _launchURL(),
              child: Text('打开浏览器'),
            ),
          ],
        ),
      ),
    );
  }

  _launchURL() async {
    const url = 'https://www.baidu.com';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  _openMap() async {
    // android 
    const url = 'geo:52.32,4.917'; // APP提供者提供的schema
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      // ios
      const url = 'http://maps.apple.com/?ll=52.32,4.917';
      if (await canLaunch(url)) {
        await launch(url);
      } else {
        throw 'Could not launch $url';
      }
    }
  }
}