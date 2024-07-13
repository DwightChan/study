//
//  DWCircularProgressView.swift
//  DwSwiftLibrary
//
//  Created by dwight on 2/28/24.
//

import SwiftUI
import Combine

class DWTimerManager: ObservableObject {
    @Published var waitTime: Int = 0 // 倒计时时间 秒
    @Published var allWaitTime: Int = 0 // 倒计时时间 秒
    @Published var timeText: String = "00:00" // 显示的时间文本
    @Published var foregroundColor: Color = .green // 显示的时间文本颜色
    @Published var progress: CGFloat = 1 // 进度条的进度
    
    private var timer: Timer.TimerPublisher?
    /// 使用 combine 处理
    private var cancellables: Set<AnyCancellable> = []
    
    init(waitTime: Int = 40, allWaitTime: Int = 60) {
        self.waitTime = waitTime
        self.allWaitTime = allWaitTime
    }
    
    
    func showTimeText() {
//        let hours = self.timeRemaining / 3600
        let minutes = (self.waitTime % 3600) / 60
        let seconds = self.waitTime % 60
        timeText = String(format: "%02d:%02d", minutes, seconds)
        progress = CGFloat(waitTime) / CGFloat(allWaitTime) // 根据剩余时间更新进度条
        foregroundColor = progress > 0.667 ? .green : progress > 0.333 ? .orange : .red
    }
    func countdown() {
        if waitTime > 0 {
            waitTime -= 1
            showTimeText()
        } else {
            waitTime = 0
            timeText = "支付时间已过"
        }
    }
    
    func startTimer() {
        stopTimer()
        showTimeText()
        if timer == nil {
            timer = Timer.publish(every: 1, on: .main, in: .common)
            timer?.autoconnect().sink(receiveValue: { _ in
                self.countdown()
            })
            .store(in: &cancellables)
        }
    }
    func stopTimer() {
        timer?.connect().cancel()
    }
    
}

struct DWCircularProgressView: View {
    
    @ObservedObject var timerManager: DWTimerManager
//    @State private var progress: CGFloat = 1 // 初始进度为 50%
//    @State private var showTimeText: String = "00:00"
//    @State private var foregroundColor: Color = .green
//    private var timer: Timer.TimerPublisher = Timer.publish(every: 1, on: .main, in: .common)
    init(_ timerManager: DWTimerManager = DWTimerManager()) {
        self.timerManager = timerManager
    }

    let circleWidth: CGFloat = (120) // 圆环的宽度
    
    var body: some View {
        VStack {
            ZStack {
                if timerManager.waitTime > 0 {
                    Circle()
                        .stroke(lineWidth: 4.0)
                        .opacity(0.3)
                        .frame(width: circleWidth)
                        .foregroundColor(Color.gray)
                    
                    Circle()
                    .trim(from: 1 - timerManager.progress, to: 1)
                        .stroke(style: StrokeStyle(lineWidth: 4.0, lineCap: .round, lineJoin: .round))
                        .fill(AngularGradient(gradient: Gradient(colors: [timerManager.foregroundColor]), center: .center, angle: .degrees(180)))
                        .foregroundColor(Color.blue)
                        .frame(width: circleWidth)
                        .rotationEffect(Angle(degrees: -90.0)) // 从顶部开始绘制
                    
                    Circle()
                        .stroke(lineWidth: 2.0) // 空心圆的线宽
                        .frame(width: 8.0, height: 8.0, alignment: .center) // 空心圆的大小
                        .foregroundColor(timerManager.foregroundColor) // 小圆点的颜色
                        .offset(x: circleWidth * 0.5, y: 0) // 根据进度条的路径调整小圆点的位置
                        .rotationEffect(.degrees(360.0 * (1  - timerManager.progress) - 90.0)) // 根据进度调整小圆点的旋转角度
                }
                if timerManager.allWaitTime > 0 {
                    Text("\(timerManager.timeText)") // 显示剩余时间
                        .font(.system(size: 20, weight: .medium))
                        .fontWeight(.semibold)
                        .foregroundColor(timerManager.foregroundColor)
//                            .onReceive(Timer.publish(every: 1, on: .main, in: .common).autoconnect(), perform: { _ in
//                                timerManager.countdown()
//                            })
                    }
                }
//            .foregroundColor(.clear)
//            .padding(40.0)
            .onDisappear(perform: {
                timerManager.stopTimer()
            })
            .onAppear(perform: {
                timerManager.startTimer()
            })
            
        }
    }
    
}

struct DWCircularProgressView_Previews: PreviewProvider {
    static var previews: some View {
        DWCircularProgressView(DWTimerManager())
    }
}
