//
//  LottieView.swift
//  DwSwiftLibrary
//
//  Created by dwight on 7/18/24.
//

import SwiftUI
import Lottie

struct LottieView: UIViewRepresentable {
    var filename: String
    var loopMode: LottieLoopMode = .loop

    func makeUIView(context: Context) -> UIView {
        let view = UIView(frame: .zero)

        let animationView = LottieAnimationView()
        let animation = LottieAnimation.named(filename)
        animationView.animation = animation
        animationView.contentMode = .scaleAspectFit
        animationView.loopMode = loopMode
        animationView.play()

        animationView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(animationView)

        NSLayoutConstraint.activate([
            animationView.heightAnchor.constraint(equalTo: view.heightAnchor),
            animationView.widthAnchor.constraint(equalTo: view.widthAnchor)
        ])

        return view
    }

    func updateUIView(_ uiView: UIView, context: Context) {
        // 更新视图时的逻辑（如果需要）
    }
}


struct LottieViewContentView: View {
    
    var filename: String = "loudou.json"
    init(_ filename: String = "loudou.json") {
        self.filename = filename
    }
    
    var body: some View {
        VStack {
            LottieView(filename: filename)
//                .frame(width: 200, height: 200)
//                .frame(width: 50, height: 50)
//                .background(Color.black)
        }
    }
}

struct LottieViewContentView_Previews: PreviewProvider {
    static var previews: some View {
        LottieViewContentView()
    }
}
