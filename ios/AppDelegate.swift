//
//  AppDelegate.swift
//  Soundboard
//
//  Created by sylvain on 21/09/2023.
//

import Foundation
import AVKit
import AVFoundation

let staticAssetsPath = Bundle.main.resourcePath!+"/assets/src/assets"

class PlaySound {
  var player = AVAudioPlayer()
  var filemanagerAssetsPath = try? FileManager.default.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: false)

  func startSound(sound: String){
    var soundPath = "\(staticAssetsPath)/\(sound).mp3"
    if (!FileManager.default.fileExists(atPath: soundPath)) {
      guard filemanagerAssetsPath != nil else {
        return
      }
      
      soundPath = filemanagerAssetsPath!.appendingPathComponent("\(sound).mp3").path
    }

    do{
      player = try AVAudioPlayer(contentsOf: URL(string: "file://"+soundPath)!)
 
      player.numberOfLoops = 0
      player.volume = 1
      player.prepareToPlay()
      try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default, options: [])
      try AVAudioSession.sharedInstance().setActive(true)
       
      player.play()
    }
    catch{
    }
  }
}

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?
  var bridge: RCTBridge!
  var player: PlaySound?
  // var avPlayer = AVAudioPlayer()
  
  func getPlayer() -> PlaySound {
    if (player == nil) {
      player = PlaySound()
      
    }

    return player!
  }
  
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    let jsCodeLocation: URL
    jsCodeLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    let rootView = RCTRootView(bundleURL: jsCodeLocation, moduleName: "Soundboard", initialProperties: nil, launchOptions: launchOptions)
    let rootViewController = UIViewController()
    rootViewController.view = rootView
    self.window = UIWindow(frame: UIScreen.main.bounds)
    self.window?.rootViewController = rootViewController
    self.window?.makeKeyAndVisible()

    return true
  }
  
  func parseUserInfos(infos: [AnyHashable : Any]?) -> [String: String] {
    guard let userInfo = infos as? NSDictionary else {return [:]}

    return userInfo as! [String: String]
  }
  
  func playSound(sound: String) {
    getPlayer().startSound(sound: sound)
  }

  func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    let userInfo = parseUserInfos(infos: userActivity.userInfo)
    self.playSound(sound: userInfo["name"]!)
    
    return true
  }
}
