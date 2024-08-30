//
//  DeceNumberView.swift
//  DwSwiftLibrary
//
//  Created by dwight on 7/18/24.
//

import SwiftUI


class DiceNumberManager: ObservableObject {
    // 添加需要的属性
    @Published var no: String = "0"
    let action = ((indexPath: IndexPath) -> ()).self
    @Published var actived: Bool = false 
    {
        didSet {
            showImags = actived ? selectedImags : normalImags
        }
    }
    @Published var indexPath: IndexPath = IndexPath(row: 0, section: 0)
    @Published var className: String = ""
    @Published var image: UIImage = UIImage(named: "dice_00_nor")!
    /// 显示的图片
    @Published var showImags: [UIImage] = []
    // normal 的图片
    @Published var normalImags: [UIImage] = []
    // 选中的图片
    @Published var selectedImags: [UIImage] = []
    
    @Published var itemSize: CGSize = CGSize(width: 40, height: 40)
    
    init(no: String = "1",
         actived: Bool = false,
         itemSize: CGSize = CGSize(width: 40, height: 40),
         indexPath: IndexPath = IndexPath(row: 0, section: 0),
         className: String = "") {
        self.no = no
        self.indexPath = indexPath
        self.className = className
        self.itemSize = itemSize
        // 字符串分个字符
        no.forEach { (char) in
            
            if char == "*" {
                normalImags.append(UIImage(named: "dice_00_nor")!)
                selectedImags.append(UIImage(named: "dice_00_sel")!)
            } else {
                normalImags.append(UIImage(named: "dice_0\(char)_nor")!)
                selectedImags.append(UIImage(named: "dice_0\(char)_sel")!)
            }
        }
        // 设置选择的图片
        self.actived = actived
    }
}

struct DiceNumberView: View {
    
    @ObservedObject var manager: DiceNumberManager
    
    init(_ manager: DiceNumberManager = DiceNumberManager()) {
        self.manager = manager
    }
    /**
     {
             no == '1' && <div><span onClick={() => action(no, index)} className={`one ${className} ${actived && 'actived'}`} /></div>
           }
           {
             no == '2' && <div><span onClick={() => action(no, index)} className={`two ${className} ${actived && 'actived'}`} /></div>
           }
           {
             no == '3' && <div><span onClick={() => action(no, index)} className={`three ${className} ${actived && 'actived'}`} /></div>
           }
           {
             no == '4' && <div><span onClick={() => action(no, index)} className={`four ${className} ${actived && 'actived'}`} /></div>
           }
           {
             no == '5' && <div><span onClick={() => action(no, index)} className={`five ${className} ${actived && 'actived'}`} /></div>
           }
           {
             no == '6' && <div><span onClick={() => action(no, index)} className={`six ${className} ${actived && 'actived'}`} /></div>
           }
           {
             no == '11*' &&
             <div className='pointer' onClick={() => action('1')}>
               <span className={`one-line any ${actived && 'actived'}`} />
               <span className={`one ${actived && 'actived'}`} />
               <span className={`one ${actived && 'actived'}`} />
               <div>11*</div>
             </div>
           }
           {
             no == '22*' &&
             <div className='pointer' onClick={() => action('2')}>
               <span className={`one-line any ${actived && 'actived'}`} />
               <span className={`two ${actived && 'actived'}`} />
               <span className={`two ${actived && 'actived'}`} />
               <div>22*</div>
             </div>
           }
           {
             no == '33*' &&
             <div className='pointer' onClick={() => action('3')}>
               <span className={`one-line any ${actived && 'actived'}`} />
               <span className={`three ${actived && 'actived'}`} />
               <span className={`three ${actived && 'actived'}`} />
               <div>3*</div>
             </div>
           }
           {
             no == '44*' &&
             <div className='pointer' onClick={() => action('4')}>
               <span className={`one-line any ${actived && 'actived'}`} />
               <span className={`four ${actived && 'actived'}`} />
               <span className={`four ${actived && 'actived'}`} />
               <div>44*</div>
             </div>
           }
           {
             no == '55*' &&
             <div className='pointer' onClick={() => action('5')}>
               <span className={`one-line any ${actived && 'actived'}`} />
               <span className={`five ${actived && 'actived'}`} />
               <span className={`five ${actived && 'actived'}`} />
               <div>55*</div>
             </div>
           }
           {
             no == '66*' &&
             <div className='pointer' onClick={() => action('6')}>
               <span className={`one-line any ${actived && 'actived'}`} />
               <span className={`six ${actived && 'actived'}`} />
               <span className={`six ${actived && 'actived'}`} />
               <div>66*</div>
             </div>
           }
           {
             no == '111' &&
             <div className='pointer' onClick={() => action('1')}>
               <span className={`one-line one ${actived && 'actived'}`} />
               <span className={`one ${actived && 'actived'}`} />
               <span className={`one ${actived && 'actived'}`} />
               <div>111</div>
             </div>
           }
           {
             no == '222' &&
             <div className='pointer' onClick={() => action('2')}>
               <span className={`one-line two ${actived && 'actived'}`} />
               <span className={`two ${actived && 'actived'}`} />
               <span className={`two ${actived && 'actived'}`} />
               <div>222</div>
             </div>
           }
           {
             no == '333' &&
             <div className='pointer' onClick={() => action('3')}>
               <span className={`one-line three ${actived && 'actived'}`} />
               <span className={`three ${actived && 'actived'}`} />
               <span className={`three ${actived && 'actived'}`} />
               <div>333</div>
             </div>
           }
           {
             no == '444' &&
             <div className='pointer' onClick={() => action('4')}>
               <span className={`one-line four ${actived && 'actived'}`} />
               <span className={`four ${actived && 'actived'}`} />
               <span className={`four ${actived && 'actived'}`} />
               <div>444</div>
             </div>
           }
           {
             no == '555' &&
             <div className='pointer' onClick={() => action('5')}>
               <span className={`one-line five ${actived && 'actived'}`} />
               <span className={`five ${actived && 'actived'}`} />
               <span className={`five ${actived && 'actived'}`} />
               <div>555</div>
             </div>
           }
           {
             no == '666' &&
             <div className='pointer' onClick={() => action('6')}>
               <span className={`one-line six ${actived && 'actived'}`} />
               <span className={`six ${actived && 'actived'}`} />
               <span className={`six ${actived && 'actived'}`} />
               <div>666</div>
             </div>
           }

           {
             no == '123' &&
             <div className='pointer' onClick={() => action('6')}>
               <span className={`one-line one ${actived && 'actived'}`} />
               <span className={`two ${actived && 'actived'}`} />
               <span className={`three ${actived && 'actived'}`} />
               <div>123</div>
             </div>
           }
           {
             no == '234' &&
             <div className='pointer' onClick={() => action('6')}>
               <span className={`one-line two ${actived && 'actived'}`} />
               <span className={`three ${actived && 'actived'}`} />
               <span className={`four ${actived && 'actived'}`} />
               <div>234</div>
             </div>
           }
           {
             no == '345' &&
             <div className='pointer' onClick={() => action('6')}>
               <span className={`one-line three ${actived && 'actived'}`} />
               <span className={`four ${actived && 'actived'}`} />
               <span className={`five ${actived && 'actived'}`} />
               <div>345</div>
             </div>
           }
           {
             no == '456' &&
             <div className='pointer' onClick={() => action('6')}>
               <span className={`one-line four ${actived && 'actived'}`} />
               <span className={`five ${actived && 'actived'}`} />
               <span className={`six ${actived && 'actived'}`} />
               <div>456</div>
             </div>
           }
           {
             no == '11' &&
             <div className='pointer' onClick={() => action('1', index)}>
               <span className={`one ${actived && 'actived'}`} />
               <span className={`one ${actived && 'actived'}`} />
             </div>
           }
           {
             no == '22' &&
             <div className='pointer' onClick={() => action('2', index)}>
               <span className={`two ${actived && 'actived'}`} />
               <span className={`two ${actived && 'actived'}`} />
             </div>
           }
           {
             no == '33' &&
             <div className='pointer' onClick={() => action('3', index)}>
               <span className={`three ${actived && 'actived'}`} />
               <span className={`three ${actived && 'actived'}`} />
             </div>
           }
           {
             no == '44' &&
             <div className='pointer' onClick={() => action('4', index)}>
               <span className={`four ${actived && 'actived'}`} />
               <span className={`four ${actived && 'actived'}`} />
             </div>
           }
           {
             no == '55' &&
             <div className='pointer' onClick={() => action('5', index)}>
               <span className={`five ${actived && 'actived'}`} />
               <span className={`five ${actived && 'actived'}`} />
             </div>
           }
           {
             no == '66' &&
             <div className='pointer' onClick={() => action('6', index)}>
               <span className={`six ${actived && 'actived'}`} />
               <span className={`six ${actived && 'actived'}`} />
             </div>
           }
     */

    
    var body: some View {
        VStack {
            switch manager.no.count {
            case 1:
                ForEach(manager.showImags, id: \.self) { image in
                    Image(uiImage: image)
                        .resizable()
                        .frame(width: manager.itemSize.width, height: manager.itemSize.height)
                }
            case 2:
                HStack {
                    ForEach(manager.showImags, id: \.self) { image in
                        Image(uiImage: image)
                            .resizable()
                            .frame(width: manager.itemSize.width, height: manager.itemSize.height)
                    }
                }
            case 3:
                // 如果 no 是3个字符 并且 3个字符 都一样
                // 如果 no 是3个字符 并且 3个字符 都不一样
                // 如果 no 是3个字符 并且 2个字符 一摸一样，不一样
                // 使用正则表达式，写出上面的逻辑判断
                // 123  234 345 456
                // 111 222 333 444 555 666
                // 11* 22* 33* 44* 55* 66*
                if manager.no.contains("*") {
                    Image(uiImage: manager.showImags[2])
                        .resizable()
                        .frame(width: manager.itemSize.width, height: manager.itemSize.height)
                    HStack {
                        Image(uiImage: manager.showImags[0])
                            .resizable()
                            .frame(width: manager.itemSize.width, height: manager.itemSize.height)
                        Image(uiImage: manager.showImags[1])
                            .resizable()
                            .frame(width: manager.itemSize.width, height: manager.itemSize.height)
                    }
                } else {
                    Image(uiImage: manager.showImags[0])
                        .resizable()
                        .frame(width: manager.itemSize.width, height: manager.itemSize.height)
                    HStack {
                        Image(uiImage: manager.showImags[1])
                            .resizable()
                            .frame(width: manager.itemSize.width, height: manager.itemSize.height)
                        Image(uiImage: manager.showImags[2])
                            .resizable()
                            .frame(width: manager.itemSize.width, height: manager.itemSize.height)
                    }
                }
            default:
                ForEach(manager.showImags, id: \.self) { image in
                    Image(uiImage: image)
                        .resizable()
                        .frame(width: manager.itemSize.width, height: manager.itemSize.height)
                }
            }
        }
        // 点击了之后的操作
        .onTapGesture {
            manager.actived.toggle()
        }

    }

}

// Preview
struct DeceNumberView_Previews: PreviewProvider {
    static var previews: some View {
        VStack {
            DiceNumberView(DiceNumberManager(no: "1", actived: true))
            DiceNumberView(DiceNumberManager(no: "2"))
            DiceNumberView(DiceNumberManager(no: "11", actived: true))
            DiceNumberView(DiceNumberManager(no: "222"))
            DiceNumberView(DiceNumberManager(no: "11*", actived: true, itemSize: CGSize(width: 30, height: 30)))
            DiceNumberView(DiceNumberManager(no: "123"))
            DiceNumberView(DiceNumberManager(no: "3"))
        }
    }
}
