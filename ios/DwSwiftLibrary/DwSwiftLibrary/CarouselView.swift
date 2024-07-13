//
//  CarouselView.swift
//  DwSwiftLibrary
//
//  Created by dwight on 3/26/24.
//

import SwiftUI

struct CarouselView: View {
    let images: [String] // 存储图片名称或URLs
    @State private var selectedIndex = 0
    let timer = Timer.publish(every: 3, on: .main, in: .common).autoconnect() // 每3秒轮播一次

    var body: some View {
        TabView(selection: $selectedIndex) {
            ForEach(0..<images.count, id: \.self) { index in
                // 如果是本地图片，使用Image(images[index])，如果是网络图片，可以使用自定义的网络图片视图
                Image(images[index])
                    .resizable()
                    .scaledToFit()
                    .tag(index)
            }
        }
        .tabViewStyle(PageTabViewStyle()) // 使用分页样式
        .frame(height: 300)
        .onReceive(timer) { _ in
            withAnimation {
                selectedIndex = (selectedIndex + 1) % images.count // 循环轮播
            }
        }
    }
}

//struct ContentView: View {
//    var body: some View {
//        CarouselView(images: ["yourImage1", "yourImage2", "yourImage3"]) // 替换为你的图片资源
//    }
//}

struct CarouselView_Previews: PreviewProvider {
    static var previews: some View {
        CarouselView(images: ["yourImage1", "yourImage2", "yourImage3"]) // 替换为你的图片资源
    }
}
