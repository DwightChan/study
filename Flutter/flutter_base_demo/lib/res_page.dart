/*
 * @Author: Dwight Dwight@gmail.com
 * @Date: 2024-10-17 23:31:24
 * @LastEditors: Dwight Dwight@gmail.com
 * @LastEditTime: 2024-10-17 23:44:22
 * @FilePath: /flutter_base_demo/lib/res_page.dart
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import 'package:flutter/material.dart';

/// 如何导入和使用Flutter的资源文件？
class ResPage extends StatefulWidget {
  const ResPage({super.key});

  @override
  State<ResPage> createState() => _ResPageState();
}

class _ResPageState extends State<ResPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('如何导入和使用Flutter的资源文件？'),
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
          children: [
            Image(
              image: AssetImage('images/avatar.png'),
              width: 100,
              height: 100,
            ),
          ],
        ),
      ),
    );
  }
}