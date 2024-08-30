//
//  Temp.swift
//  DwSwiftLibrary
//
//  Created by dwight on 7/23/24.
//

import Foundation


import SwiftUI

struct Temp: View {
    var body: some View {
        VStack(spacing: 8) { // CSS 中的 .r 类，marginTop: 0.5rem，转换为 VStack 的 spacing
            HStack(spacing: 0) { // CSS 中的 .cell 类
                ChipView(color: .red, borderWidth: 1, isFlickering: false)
                ChipView(color: .green, borderWidth: 1, isFlickering: false)
                ChipView(color: .blue, borderWidth: 1, isFlickering: false)
                ChipView(color: Color(red: 146/255, green: 152/255, blue: 158/255), borderWidth: 1, isFlickering: false)
            }
        }
    }
}

struct ChipView: View {
    var color: Color
    var borderWidth: CGFloat
    var isFlickering: Bool
    
    var body: some View {
        Circle()
            .strokeBorder(color, lineWidth: borderWidth)
            .background(Circle().fill(Color.clear))
            .frame(width: 77, height: 77) // 直接使用点数作为尺寸
            .overlay(
                isFlickering ? FlickeringView() : nil
            )
    }
}

struct FlickeringView: View {
    @State private var isVisible = true
    
    var body: some View {
        Rectangle()
            .opacity(isVisible ? 1.0 : 0.0)
            .animation(Animation.linear(duration: 2).repeatForever(autoreverses: true), value: isVisible)
            .onAppear {
                isVisible.toggle()
            }
    }
}


struct TempView_Previews: PreviewProvider {
    static var previews: some View {
        VStack {
//            Temp()
//            FlickeringView()
            ChipView(color: .red, borderWidth: 1, isFlickering: true)
            
        }
        
  
    }
}
