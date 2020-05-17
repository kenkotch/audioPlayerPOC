# audioPlayerPOC

when adding `react-native`track-player` to your own project, you will need to update your podfile as follows:

add: 
```
# Post Install for audioPlayer
def audio_post_install(installer)
  installer.pods_project.targets.each do |target|
    if ['react-native-track-player'].include? target.name
      target.build_configurations.each do |config|
        config.build_settings['SWIFT_VERSION'] = '5'
      end
    end
  end
end
```
and in `post_install do |installer|` add:
```
audio_post_install(installer)
```

then you need to add a dummy.swift file as noted here: https://react-native-track-player.js.org/install/#troubleshooting
