//
//  Color+DW.swift
//  DwSwiftLibrary
//
//  Created by dwight on 3/12/24.
//

import SwiftUI


extension Color {
    //    // 定义颜色扩展以接受16进制颜色码
    //    init(hex: String) {
    //        let scanner = Scanner(string: hex)
    //        _ = scanner.scanLocation // ignore the '#'
    //        var rgb: UInt64 = 0
    //
    //        scanner.scanHexInt64(&rgb)
    //
    //        self.init(
    //            .sRGB,
    //            red: Double((rgb & 0xFF0000) >> 16) / 255.0,
    //            green: Double((rgb & 0x00FF00) >> 8) / 255.0,
    //            blue: Double(rgb & 0x0000FF) / 255.0
    //        )
    //    }
}

extension Color {
    // 定义颜色扩展以接受16进制颜色码和不透明度
    init(hex: String, opacity: Double = 1) {
        var hexSanitized = hex.trimmingCharacters(in: .whitespacesAndNewlines)
        hexSanitized = hexSanitized.replacingOccurrences(of: "#", with: "")
        
        // 检查十六进制颜色码长度是否有效
        guard hexSanitized.count == 6 || hexSanitized.count == 8 else {
            self.init(.sRGB, red: 0, green: 0, blue: 0, opacity: opacity)
            return
        }
        
        var rgb: UInt64 = 0
        
        guard Scanner(string: hexSanitized).scanHexInt64(&rgb) else {
            self.init(.sRGB, red: 0, green: 0, blue: 0, opacity: opacity)
            return
        }
        
        // 提取颜色值
        let red = Double((rgb & 0xFF0000) >> 16) / 255.0
        let green = Double((rgb & 0x00FF00) >> 8) / 255.0
        let blue = Double(rgb & 0x0000FF) / 255.0
        
        // 创建Color实例
        self.init(
            .sRGB,
            red: red,
            green: green,
            blue: blue,
            opacity: opacity
        )
    }

}
