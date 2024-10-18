
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class PhotoApp extends StatefulWidget {
  const PhotoApp({super.key});

  @override
  State<PhotoApp> createState() => _PhotoAppState();
}

class _PhotoAppState extends State<PhotoApp> {

  List<XFile> _images = [];
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('如何使用Flutter实现拍照和相册选取照片？'),
        leading: GestureDetector(
          onTap: () => {
            Navigator.pop(context)
          },
          child: Icon(Icons.arrow_back),
        ),
      ),
      body: Center(
        child: Wrap(
          spacing: 5,
          runSpacing: 5,
          children: _getImages(),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _pickImage,
        child: Icon(Icons.add_a_photo),
      ),
    );
  }

  Future getImage(bool isTakePhoto) async {
    Navigator.pop(context);
    var image = await ImagePicker().pickImage(source: isTakePhoto ? ImageSource.camera : ImageSource.gallery);
    if (image == null) return;
    setState(() {
      _images.add(image);
    });
  }

  _pickImage() {
    showModalBottomSheet(
      context: context, 
      builder: (context) => Container(
        height: 160,
        child: Column(
          children: <Widget>[
            _item('拍照', true),
            _item('相册', false),
          ],
        ),
    ));
  }

  _item(String title, bool isTakePhoto) {
    return GestureDetector(
      child: ListTile(
        leading: Icon(isTakePhoto ? Icons.camera_alt : Icons.photo_library),
        title: Text(title),
        // onTap: () => getImage(isTakePhoto),
      ),
      onTap: () => getImage(isTakePhoto),
    );
  }

  _getImages() {
    return _images.map((file) {
      return Stack(
        children: <Widget> [
          ClipRRect(
            borderRadius: BorderRadius.circular(5),
            child: Image.file(File(file.path), width: 120, height: 90, fit: BoxFit.fill),
          ),
          Positioned(
            right: 5,
            top: 5,
            child: GestureDetector(
              onTap: () => {
                setState(() {
                  _images.remove(file);
                })
              },
              child: ClipOval(
                // 圆角 删除按钮
                child: Container(
                  padding: EdgeInsets.all(3),
                  decoration: BoxDecoration(color: Colors.black45),
                  child: Icon(Icons.close, color: Colors.white, size: 18),
                )
              ),
            ),
          )
        ],
      );
    }).toList();
  }
}