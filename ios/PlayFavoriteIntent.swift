//
//  PlayFavoriteIntent.swift
//  Soundboard
//
//  Created by sylvain on 06/01/2024.
//

import Foundation
import AppIntents
import AVKit
import AVFoundation

let defaultSounds: [Sound] = [
  Sound(id: UUID(uuidString: "00000000-0000-0000-0000-aaaaaaaaaaaa").unsafelyUnwrapped, image: "😲", name: "ah"),
  Sound(id: UUID(uuidString: "00000000-0000-0000-aaaa-000000000000").unsafelyUnwrapped, image: "🤬", name: "antoine_daniel_tg"),
  Sound(id: UUID(uuidString: "00000000-0000-aaaa-0000-000000000000").unsafelyUnwrapped, image: "💥", name: "ca_va_peter"),
  Sound(id: UUID(uuidString: "00000000-aaaa-0000-0000-000000000000").unsafelyUnwrapped, image: "🧙‍♂️", name: "cependant"),
  Sound(id: UUID(uuidString: "aaaaaaaa-0000-0000-0000-000000000000").unsafelyUnwrapped, image: "🙅‍♂️", name: "cest_non"),
  Sound(id: UUID(uuidString: "00000000-0000-0000-0000-bbbbbbbbbbbb").unsafelyUnwrapped, image: "🦸‍♂️", name: "cheh"),
  Sound(id: UUID(uuidString: "00000000-0000-0000-bbbb-000000000000").unsafelyUnwrapped, image: "🍆", name: "coucou"),
  Sound(id: UUID(uuidString: "00000000-0000-bbbb-0000-000000000000").unsafelyUnwrapped, image: "👋", name: "coucou_miss"),
  Sound(id: UUID(uuidString: "00000000-bbbb-0000-0000-000000000000").unsafelyUnwrapped, image: "👩‍🍳", name: "couisine"),
  Sound(id: UUID(uuidString: "bbbbbbbb-0000-0000-0000-000000000000").unsafelyUnwrapped, image: "🤷‍♂️", name: "david_goodenough"),
  Sound(id: UUID(uuidString: "00000000-0000-0000-0000-cccccccccccc").unsafelyUnwrapped, image: "👁", name: "deja_vu"),
  Sound(id: UUID(uuidString: "00000000-0000-0000-cccc-000000000000").unsafelyUnwrapped, image: "🤓", name: "enorme"),
  Sound(id: UUID(uuidString: "00000000-0000-cccc-0000-000000000000").unsafelyUnwrapped, image: "👨‍🦲", name: "etchebest"),
  Sound(id: UUID(uuidString: "00000000-cccc-0000-0000-000000000000").unsafelyUnwrapped, image: "💇‍♂️", name: "feur"),
  Sound(id: UUID(uuidString: "cccccccc-0000-0000-0000-000000000000").unsafelyUnwrapped, image: "🧙‍♂️", name: "harry_potter"),
  Sound(id: UUID(uuidString: "00000000-0000-0000-0000-dddddddddddd").unsafelyUnwrapped, image: "🚁", name: "helicopter"),
  Sound(id: UUID(uuidString: "00000000-0000-0000-dddd-000000000000").unsafelyUnwrapped, image: "🍷", name: "honteux"),
  Sound(id: UUID(uuidString: "00000000-0000-dddd-0000-000000000000").unsafelyUnwrapped, image: "💪", name: "john_cena"),
  Sound(id: UUID(uuidString: "00000000-dddd-0000-0000-000000000000").unsafelyUnwrapped, image: "🎅", name: "joyeux_noel_encule"),
  Sound(id: UUID(uuidString: "dddddddd-0000-0000-0000-000000000000").unsafelyUnwrapped, image: "🕵️", name: "koba_la_D"),
  Sound(id: UUID(uuidString: "00000000-0000-0000-0000-eeeeeeeeeeee").unsafelyUnwrapped, image: "🐺", name: "mechant"),
  Sound(id: UUID(uuidString: "00000000-0000-0000-eeee-000000000000").unsafelyUnwrapped, image: "🥊", name: "minecraft_hurt"),
  Sound(id: UUID(uuidString: "00000000-0000-eeee-0000-000000000000").unsafelyUnwrapped, image: "🎱", name: "motus"),
  Sound(id: UUID(uuidString: "00000000-eeee-0000-0000-000000000000").unsafelyUnwrapped, image: "👨‍🦲", name: "ouais_mais_cest_pas_toi_qui_decide"),
  Sound(id: UUID(uuidString: "eeeeeeee-0000-0000-0000-000000000000").unsafelyUnwrapped, image: "💸", name: "pauvres"),
  Sound(id: UUID(uuidString: "00000000-0000-0000-0000-ffffffffffff").unsafelyUnwrapped, image: "😤", name: "plein_le_cul"),
  Sound(id: UUID(uuidString: "00000000-0000-0000-ffff-000000000000").unsafelyUnwrapped, image: "🍆", name: "pornhub"),
  Sound(id: UUID(uuidString: "00000000-0000-ffff-0000-000000000000").unsafelyUnwrapped, image: "💨", name: "prout_reverb"),
  Sound(id: UUID(uuidString: "00000000-ffff-0000-0000-000000000000").unsafelyUnwrapped, image: "💨", name: "prout"),
  Sound(id: UUID(uuidString: "ffffffff-0000-0000-0000-000000000000").unsafelyUnwrapped, image: "🤣", name: "rire_de_droite"),
  Sound(id: UUID(uuidString: "00000000-0000-0000-0000-111111111111").unsafelyUnwrapped, image: "🙄", name: "sarkozy"),
  Sound(id: UUID(uuidString: "00000000-0000-0000-1111-000000000000").unsafelyUnwrapped, image: "👨‍🦲", name: "ta_gueule"),
  Sound(id: UUID(uuidString: "00000000-0000-1111-0000-000000000000").unsafelyUnwrapped, image: "🚗", name: "tut_tut_fils_de_pute"),
  Sound(id: UUID(uuidString: "00000000-1111-0000-0000-000000000000").unsafelyUnwrapped, image: "🚙", name: "tut_tut_grosse_pute"),
  Sound(id: UUID(uuidString: "11111111-0000-0000-0000-000000000000").unsafelyUnwrapped, image: "🎻", name: "violons"),
  Sound(id: UUID(uuidString: "00000000-0000-0000-0000-222222222222").unsafelyUnwrapped, image: "🪄", name: "wingardium_leviosa"),
  Sound(id: UUID(uuidString: "00000000-0000-0000-2222-000000000000").unsafelyUnwrapped, image: "🤩", name: "wow"),
]

class SoundRetriever {
  var filemanagerAssetsPath = try? FileManager.default.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: false)

  func getSoundsList() -> [Sound] {
    var sounds: [Sound] = []

    do {
      var jsonPath = "\(staticAssetsPath)/indexer.json"
      if (!FileManager.default.fileExists(atPath: jsonPath)) {
      guard filemanagerAssetsPath != nil else {
          return sounds
      }

        jsonPath = filemanagerAssetsPath!.appendingPathComponent("indexer.json").path
      }

      if FileManager.default.fileExists(atPath: jsonPath) {
        let data = try Data(contentsOf: URL(filePath: jsonPath))
        do {
          sounds = try JSONDecoder().decode([Sound].self, from: data)
        } catch {
            print("error: \(error)")
        }
      }
    } catch {
      print("error: \(error)")
    }

    return sounds
  }
}

struct Sound: Equatable, Hashable, Codable, AppEntity {
    typealias DefaultQueryType = SoundQuery
    static var defaultQuery: SoundQuery = SoundQuery()

    static var typeDisplayRepresentation = TypeDisplayRepresentation(name: "Sound")
    var displayRepresentation: DisplayRepresentation {
        DisplayRepresentation(title: .init(stringLiteral: image + " " + name))
    }

    var id: UUID
    var name: String
    var image: String

    init(from decoder: Decoder) {
      id = UUID()
      self.name = ""
      self.image = ""

      do {
        let container = try decoder.container(keyedBy: CodingKeys.self)

        let decodedId = try container.decodeIfPresent(String.self, forKey: .id)
        if decodedId != nil {
          self.id = UUID(uuidString: decodedId.unsafelyUnwrapped) ?? UUID()
        }
        self.name = try container.decodeIfPresent(String.self, forKey: .name).unsafelyUnwrapped
        self.image = try container.decodeIfPresent(String.self, forKey: .image).unsafelyUnwrapped
      } catch {}
    }

    init(id: UUID, image: String, name: String) {
      self.id = id
      self.name = name
      self.image = image
    }
}

func getList() -> [Sound] {
  return (defaultSounds + SoundRetriever().getSoundsList()).sorted { $1.name > $0.name }
}

struct SoundQuery: EntityStringQuery {
  typealias Entity = Sound
  func entities(matching string: String) -> [Sound] {
    return getList()
  }

  func entities(for identifiers: [UUID]) -> [Sound] {
    return getList()
  }
}

private struct SoundOptionsProvider: DynamicOptionsProvider {
    func results() -> [Sound] {
      return getList()
    }
}

@available(iOS 16, *)
struct PlayFavoriteIntent: AudioPlaybackIntent {
  static let title: LocalizedStringResource = "Play specific sound"
  static let authenticationPolicy: IntentAuthenticationPolicy = .alwaysAllowed
  static var parameterSummary: some ParameterSummary {
      Summary("Play \(\.$sound).")
  }

  @Parameter(title: "Sound", description: "Select the sound to play", optionsProvider: SoundOptionsProvider())
  var sound: Sound


  static var bridge: RCTBridge!
  static var player: PlaySound?

  func getPlayer() -> PlaySound {
    if (PlayFavoriteIntent.player == nil) {
      PlayFavoriteIntent.player = PlaySound()
    }

    return PlayFavoriteIntent.player!
  }

  func playSound(sound: String) {
    getPlayer().startSound(sound: sound)
  }

  func perform() -> some IntentResult {
    self.playSound(sound: sound.name)

    return .result()
  }
}
