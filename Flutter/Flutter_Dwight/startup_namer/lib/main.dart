
import 'package:english_words/english_words.dart';
import 'package:flutter/material.dart';
// 在lib/main.dart 中引入 english_words
// import 'package:flutter/english_words';

// main.dart 文件是 项目启动入口文件, 不能随意修改名称;
// main() => runApp(new MyApp()); 是入口函数, 必须得写, 不能随意更改;
// 
void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // final wordPair = new WordPair.random();
    return new MaterialApp(
      // 一定要给 title 设置值
      // title 的值可以和其他类的值一样,
      // 一般是使用 类名做为title 的值
      title: 'Welcome to Flutter',
      theme: new ThemeData(
        primaryColor: Colors.black26,
      ),
      // 更新MyApp的build方法。从MyApp中删除Scaffold和AppBar实例。 
      // 这些将由RandomWordsState管理，这使得用户在下一步中从一个屏幕导航到另一个屏幕时， 
      // 可以更轻松地更改导航栏中的的路由名称。
      // home: new Scaffold(
      //   appBar: new AppBar(
      //     title: new Text('Welcome to hot change Demo'),
      //   ),
      //   body: new Center(
      //     // child: new Text("hellow world"),
      //     // child: new Text(wordPair.asPascalCase),
      //     child: new RandomWords(),
      //   ),
      // ),
      home: new RandomWords(),
    );
  }
}
class RandomWords extends StatefulWidget {
  @override
  createState() => new RandomWordsState();
}
class RandomWordsState extends State<RandomWords> {
  // 向RandomWordsState类中添加一个_suggestions列表以保存建议的单词对。 
  // 该变量以下划线（_）开头，在Dart语言中使用下划线前缀标识符，会强制其变成私有的。
  final _suggestions = <WordPair>[];
  // 保存数据 做Set 集合
  // final _saved = new Set<WordPair>();
  final _saved = new Set<WordPair>();
  final _biggerFont = const TextStyle(fontSize: 10.0);
  @override
  Widget build(BuildContext context) {
    // final wordPair = new WordPair.random();
    // return new Text(wordPair.asPascalCase);
    return new Scaffold(
      appBar: new AppBar(
        // 导航栏 title 
        title: new Text("Startup Name Generator"),
        actions: <Widget>[
          new IconButton(icon: new Icon(Icons.list), onPressed: _pushSaved,)
        ],
      ),
      body: _buildSuggestions(),
    );
  }
  void _pushSaved() {
    Navigator.of(context).push(
      new MaterialPageRoute(
        builder: (context) {
          final tiles = _saved.map(
            (pair) {
              return new ListTile(
                title: new Text(
                  pair.asPascalCase,
                  style: _biggerFont,
                ),
              );
            },
          );
          final divided = ListTile
            .divideTiles(
              context: context,
              tiles: tiles,
            )
            .toList();
            return new Scaffold(
              appBar: new AppBar(
                title: new Text('Saved Suggestions'),
              ),
              body: new ListView(children: divided),
            );
        },
      ),
    );
  }
  Widget _buildSuggestions() {
    return new ListView.builder(
      padding: const EdgeInsets.all(0.0),
      // 对于每个建议的单词对都会调用一次itemBuilder，然后将单词对添加到ListTile行中
      // 在偶数行，该函数会为单词对添加一个ListTile row.
      // 在奇数行，该函数会添加一个分割线widget，来分隔相邻的词对。
      // 注意，在小屏幕上，分割线看起来可能比较吃力。
      itemBuilder: (context, i) {
        // 在每一列之前，添加一个1像素高的分隔线widget
        if (i.isOdd) return new Divider();
      
        // 语法 "i ~/ 2" 表示i除以2，但返回值是整形（向下取整），比如i为：1, 2, 3, 4, 5
        // 时，结果为0, 1, 1, 2, 2， 这可以计算出ListView中减去分隔线后的实际单词对数量
        final index = i ~/ 2;
        // 如果是建议列表中最后一个单词对
        if (index >= _suggestions.length) {
          // ...接着再生成10个单词对，然后添加到建议列表
          _suggestions.addAll(generateWordPairs().take(10));
        }
        return _buildRow(_suggestions[index]);  
      }
    );
  }
  // Widget _buildRow(WordPair pair) {
  //   return new ListTile(
  //     title: new Text(
  //       pair.asPascalCase,
  //       style: _biggerFont,
  //     ),
  //   );
  // }
  Widget _buildRow(WordPair pair) {
    final alreadySaved = _saved.contains(pair);
    return new ListTile(
      title: new Text(
        pair.asPascalCase,
        style: _biggerFont,
      ),
      trailing: new Icon(
        alreadySaved ? Icons.favorite : Icons.favorite_border,
        color: alreadySaved ? Colors.red : null,
      ),
      onTap: () {
        setState(() {
          if (alreadySaved) {
            _saved.remove(pair);
          }else {
            _saved.add(pair);
          }
        });
      },
    );
  }
}