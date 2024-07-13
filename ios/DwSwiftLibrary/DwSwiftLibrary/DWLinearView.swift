//
//  DWLinearView.swift
//  DwSwiftLibrary
//
//  Created by dwight on 5/22/24.
//

import SwiftUI

import SwiftUI


class DWLinearGradientManager: ObservableObject {
    @Published var colors = [Color]()
    @Published var startPoint: UnitPoint = .top
    @Published var endPoint: UnitPoint = .bottom

    
    init(_ colors: [Color] = [
        .blue,
        .red
    ].map({ Color($0) }),
         startPoint: UnitPoint = .top,
         endPoint: UnitPoint = .bottom
    ) {
        self.colors = colors
        self.startPoint = startPoint
        self.endPoint = endPoint
    }
}

struct DWLinearGradient: View {

    @ObservedObject var manager: DWLinearGradientManager
    
    init(_ manager: DWLinearGradientManager = DWLinearGradientManager()) {
        self.manager = manager
    }
    
    var body: some View {
        // 创建渐变背景
        LinearGradient(gradient: Gradient(colors: manager.colors),
                       startPoint: manager.startPoint,
                       endPoint: manager.endPoint)
            .edgesIgnoringSafeArea(.horizontal)
    }
}

/// 视图预览效果
struct DWLinearGradient_Previews: PreviewProvider {
    static var previews: some View {
        DWLinearGradient()
    }
}


