//
//  ViewController.swift
//  DwSwiftLibrary
//
//  Created by D. K. on 2023/11/19.
//

import UIKit
import SwiftUI

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.

        /// 将 swift ui 添加进来
        let swiftUIVC = UIHostingController(rootView: ContentView())
        /// 设置 frame 为全屏
        swiftUIVC.view.frame = self.view.bounds
        self.view.addSubview(swiftUIVC.view)
    }


}

