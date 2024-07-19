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
    @Published var indexPath: IndexPath = IndexPath(row: 0, section: 0)
    @Published var className: String = ""
    @Published var image: UIImage = UIImage(named: "dice_00_nor")!
    @Published var imgs: [UIImage] = []
    
    @Published var itemSize: CGSize = CGSize(width: 20, height: 20)
    
    init(no: String = "1",
         actived: Bool = false,
         indexPath: IndexPath = IndexPath(row: 0, section: 0),
         className: String = "") {
        self.no = no
        self.actived = actived
        self.indexPath = indexPath
        self.className = className
        
        // 字符串分个字符
        no.forEach { (char) in
            if char == "*" {
                let img = UIImage(named: "dice_00_nor")!
                imgs.append(img)
            } else {
                let img = UIImage(named: "dice_0\(char)_nor")!
                imgs.append(img)
            }
        }
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
                ForEach(manager.imgs, id: \.self) { image in
                    Image(uiImage: image)
                        .resizable()
                        .frame(width: manager.itemSize.width, height: manager.itemSize.height)
                }
            case 2:
                HStack {
                    ForEach(manager.imgs, id: \.self) { image in
                        Image(uiImage: image)
                            .resizable()
                            .frame(width: manager.itemSize.width, height: manager.itemSize.height)
                    }
                }
            case 3:
                HStack {
                    ForEach(manager.imgs, id: \.self) { image in
                        Image(uiImage: image)
                            .resizable()
                            .frame(width: manager.itemSize.width, height: manager.itemSize.height)
                    }
                }
            default:
                ForEach(manager.imgs, id: \.self) { image in
                    Image(uiImage: image)
                        .resizable()
                        .frame(width: manager.itemSize.width, height: manager.itemSize.height)
                }
            }
        }

    }

}

// Preview
struct DeceNumberView_Previews: PreviewProvider {
    static var previews: some View {
        VStack {
            DiceNumberView(DiceNumberManager(no: "1"))
            DiceNumberView(DiceNumberManager(no: "2"))
            DiceNumberView(DiceNumberManager(no: "3"))
            DiceNumberView(DiceNumberManager(no: "4"))
            DiceNumberView(DiceNumberManager(no: "5"))
            DiceNumberView(DiceNumberManager(no: "6"))
            DiceNumberView(DiceNumberManager(no: "11"))
            DiceNumberView(DiceNumberManager(no: "22"))
            DiceNumberView(DiceNumberManager(no: "3"))
            DiceNumberView(DiceNumberManager(no: "4"))
            DiceNumberView(DiceNumberManager(no: "5"))
            DiceNumberView(DiceNumberManager(no: "6"))
        }
    }
}
