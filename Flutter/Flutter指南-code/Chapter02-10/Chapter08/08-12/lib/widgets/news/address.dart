import 'package:flutter/material.dart';

class Address extends StatelessWidget{
  final String address;
  Address(this.address);
  @override
  Widget build(BuildContext context) {
    return Container(
            padding: EdgeInsets.symmetric(horizontal: 6.0),
            decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(5.0),
                border: Border.all(color: Colors.grey, width: 1.0)),
            child: Text(address),
          );
  }
}