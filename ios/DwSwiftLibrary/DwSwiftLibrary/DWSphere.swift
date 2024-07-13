//
//  DWSphere.swift
//  DwSwiftLibrary
//
//  Created by dwight on 7/13/24.
//

import SwiftUI
import SceneKit

struct DWSceneView: UIViewRepresentable {
    
    @ObservedObject var manager: DWShereManager
    
    init(_ manager: DWShereManager = DWShereManager()) {
        self.manager = manager
    }

        
    func makeUIView(context: Context) -> SCNView {
        let scnView = SCNView()
        scnView.scene = setupScene()
        scnView.allowsCameraControl = manager.allowsCameraControl
        scnView.autoenablesDefaultLighting = false
        return scnView
    }
    
    func updateUIView(_ scnView: SCNView, context: Context) {
        // 更新相机控制权限
        scnView.allowsCameraControl = manager.allowsCameraControl
        // 调整球体的尺寸以匹配当前宽度和高度
        if let sphereNode = scnView.scene?.rootNode.childNode(withName: "sphereNode", recursively: true) {
            let widthScale = Float(manager.width / manager.originWidth)  // 假设初始宽度为30
            let heightScale = Float(manager.height / manager.originHeight)  // 假设初始高度为30
            sphereNode.scale = SCNVector3(widthScale, heightScale,1) // z轴按照宽度缩放保持形状一致
            sphereNode.position = SCNVector3(x: 0, y: 0, z: 1)
        }
        
        if let cameraNode = scnView.scene?.rootNode.childNode(withName: "cameraNode", recursively: true) {
            let distance: Float = 3.0
            cameraNode.position = SCNVector3(x: 0, y: 0, z: distance)
        }
        // 更新视图大小
        scnView.frame = CGRect(x: 0, y: 0, width: Double(manager.width), height: Double(manager.height))
    }
    
    private func setupScene() -> SCNScene {
        let scene = SCNScene()
        scene.rootNode.addChildNode(createSphere(1))
        scene.rootNode.addChildNode(createCamera(10)) // 相机距离取决于球体的大小
        scene.rootNode.addChildNode(createLight(50))
        return scene
    }
    
    private func createSphere(_ radius: CGFloat) -> SCNNode {
        let sphere = SCNSphere(radius: radius)
        let material = SCNMaterial()
        material.diffuse.contents = UIImage(named: "gradient")
        sphere.materials = [material]
        
        let node = SCNNode(geometry: sphere)
        node.name = "sphereNode" // 设置名称以便之后引用
        node.position = SCNVector3(x: 0, y: 0, z: 1)
        return node
    }
    
    private func createCamera(_ distance: CGFloat) -> SCNNode {
        let cameraNode = SCNNode()
        cameraNode.camera = SCNCamera()
        cameraNode.position = SCNVector3(x: 0, y: 0, z: Float(distance))
        cameraNode.name = "cameraNode"
        return cameraNode
    }
    
    private func createLight(_ distance: CGFloat) -> SCNNode {
        let light = SCNLight()
        light.type = .omni
        light.intensity = 1000
        light.color = manager.lightColor
        
        let lightNode = SCNNode()
        lightNode.light = light
        lightNode.position = SCNVector3(x: -0.4 * Float(distance),
                                        y: 0.4 * Float(distance),
                                        z: Float(distance))
        lightNode.name = "lightNode"
        
        return lightNode
    }
}

class DWShereManager: ObservableObject {
    // 添加需要的属性
    @Published var sphereColor: Color = .white//Color(hex: "#4B2A16", opacity: 0.5)
    @Published var width: CGFloat = 300
    @Published var height: CGFloat = 300
    @Published var radius: CGFloat = 300
    @Published var lightColor: UIColor = UIColor.white
    @Published var allowsCameraControl: Bool = true
    
    var originWidth: CGFloat = 300
    var originHeight: CGFloat = 300
    
    init(sphereColor: Color = .white,
         width: CGFloat = 300,
         height: CGFloat = 300,
         radius: CGFloat = 300,
         lightColor: UIColor = UIColor.white,
         allowsCameraControl: Bool = true) {
        self.sphereColor = sphereColor
        self.width = width
        self.height = height
        self.radius = radius
        self.lightColor = lightColor
        self.allowsCameraControl = allowsCameraControl
        self.originWidth = width
        self.originHeight = height
    }
}

struct DWSphere: View {
    
    @ObservedObject var manager: DWShereManager
    
    init(_ manager: DWShereManager = DWShereManager()) {
        self.manager = manager
    }
    
    var body: some View {
        VStack {
            DWSceneView(manager)
                .frame(width: manager.width, height: manager.height) // 根据需要设置尺寸
                .cornerRadius(manager.radius) // 设置圆角以创建圆形外观
            // 超出部分 裁剪
                .clipped()
//                .rotation3DEffect(
//                    .degrees(-90),
//                    axis: (x: 0.0, y: 0.0, z: 1.0)
//                )
            //            .padding()
            // 设置透明图 0.6
            
            // 控制按钮
            HStack {
                Button("增大宽度") {
                    manager.width += 10
                }
                .padding()
                .background(Color.blue)
                .foregroundColor(.white)
                .cornerRadius(10)

                Button("减少宽度") {
                    manager.width -= 10
                }
                .padding()
                .background(Color.red)
                .foregroundColor(.white)
                .cornerRadius(10)
            }
            // 控制按钮
            HStack {
                Button("增大高度") {
                    manager.height += 10
                }
                .padding()
                .background(Color.blue)
                .foregroundColor(.white)
                .cornerRadius(10)

                Button("减少高度") {
                    manager.height -= 10
                }
    
                .padding()
                .background(Color.red)
                .foregroundColor(.white)
                .cornerRadius(10)
            }
            Toggle("Enable Rotation", isOn: $manager.allowsCameraControl)
                            .padding()

        }
    }
}

/// 视图预览效果
struct DWSphere_Previews: PreviewProvider {
    static var previews: some View {
        DWSphere(DWShereManager(width: 300, height: 300))
            // 旋转 180 度
            
//        Sphere(ShereManager(width: 30, height: 30))
            // 设置背景颜色
            .background(.black)
        
    }
}
