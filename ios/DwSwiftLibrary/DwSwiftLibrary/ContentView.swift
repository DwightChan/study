//
//  ContentView.swift
//  DwSwiftLibrary
//
//  Created by D. K. on 2023/11/5.
//

import SwiftUI
import Contacts
import Photos

struct ContentView: View {
    

    
    lazy var myContactStore: CNContactStore = {
        let cn: CNContactStore = CNContactStore()
        return cn
    }()
    

    var body: some View {
        VStack {
            
            DWCircularProgressView()
                .frame(width: 120, height: 120)
                .padding(.top, 20)
                .padding(.bottom, 20)
            DWLinearGradient()
            DWAngularGradient()
            DWSphere(DWShereManager(width: 200, height: 200))
            
        }
        /// 并设置到父组件的左右两边间距 为15 用margin
        .padding()
        //        .padding(15)
        .onAppear {
            
            
        }
        .onDisappear {
            
        }
    }
}

//#PreviewContentView {
//    ContentView()
//}

/// 预览
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
