
import 'package:flutter/cupertino.dart';
// 常用数据类型
class DataType extends StatefulWidget {
  //
  const DataType({Key? key}) : super(key: key);

  @override
  _DataTypeState createState() => _DataTypeState();
}

class _DataTypeState extends State<DataType> {
  @override
  Widget build(BuildContext context) {
    _numType();
    return Container(Text("常用数据类型， 请查看控制台数据"));
  }

  // 数字类型
  void _numType() {
    num num1 = -1.0; // 是数字类型的父类
    num num2 = 2; // 是数字类型的父类
    int int1 = 3; // 只能是整数
    double d1 = 1.68; // 双精度
    print("num: $num1 num:$num2 int:$int1 double: d1");
  }
}
