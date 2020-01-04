
// 有 import '引入文件';
// 表示可以分模块去写代码;
import 'package:flutter/material.dart';
main(){

}
// 如果是自己定义的类 必须要集成 dart 的类
// 引入 package:flutter/material.dart 
// 就可以使用 StatelessWidget 这个类;
class Myapp extends StatelessWidget{
  // bulid 方法是必须的, 相当于 iOS 中 init 的方法;
  // 其中 参数: context 包含很多信息, 包括 位置/尺寸/navigater/等等;
  // bulid 方法中一定会返回一个小部件, 知道 material 的小部件为止;
  build(context) {
    // MaterialApp 没有括号在后面表示一个类,
    // 有小括号,表示一个类创建的对象;
    return MaterialApp();
  }
}