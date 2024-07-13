//
//  DWAngularGradient.swift
//  DwSwiftLibrary
//
//  Created by dwight on 5/22/24.
//

import SwiftUI

class DWAngularGradientManager: ObservableObject {
    
    @Published var colors = [Color]()
    @Published var startAngle: Angle = .degrees(90 + 45)
    @Published var endAngle: Angle = .degrees(360 + 90 + 45)
    @Published var center: UnitPoint = .center

    
    init(_ colors: [Color] = [
        .blue,
        .red
    ].map({ Color($0) }),
         startAngle: Angle = .degrees(90 + 45),
         endAngle: Angle = .degrees(360 + 90 + 45),
         center: UnitPoint = .center
    ) {
        self.colors = colors
        self.startAngle = startAngle
        self.endAngle = endAngle
        self.center = center
    }
}

struct DWAngularGradient: View {

    
    @ObservedObject var manager: DWAngularGradientManager
    
    init(_ manager: DWAngularGradientManager = DWAngularGradientManager()) {
        self.manager = manager
    }

    
    var body: some View {
        // 创建渐变背景

        AngularGradient(gradient: Gradient(colors: manager.colors),
                        center: manager.center,
                        startAngle: manager.startAngle,
                        endAngle: manager.endAngle)
    }
}

/// 视图预览效果
struct DWAngularGradient_Previews: PreviewProvider {
    static var previews: some View {
        DWAngularGradient()
    }
}
