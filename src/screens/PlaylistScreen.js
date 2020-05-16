/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {usePlaybackState} from 'react-native-track-player/lib/hooks';
import BottomSheet from 'reanimated-bottom-sheet';

import Player from '../components/Player';

const PlaylistScreen = () => {
  const playbackState = usePlaybackState();

  useEffect(() => {
    TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_JUMP_FORWARD,
        TrackPlayer.CAPABILITY_JUMP_BACKWARD,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SEEK_TO,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
      jumpInterval: 10,
    });
  }, []);

  const togglePlayback = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      await TrackPlayer.reset();
      // await TrackPlayer.add(playlistData);
      await TrackPlayer.add({
        id: 'randomTrackId',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        title: 'How To Survive the Apocalypse',
        artist: 'Lucy',
        // artwork: 'https://picsum.photos/200',
      });
      await TrackPlayer.play();
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <View style={styles.container}>
        <BottomSheet
          initialSnap={1}
          snapPoints={[300, 50]}
          renderContent={() => (
            <View style={{borderTopColor: 'black', borderTopWidth: 2}}>
              <Player
                onForward={onFastForward}
                style={styles.player}
                onBack={onRewind}
                onTogglePlayback={togglePlayback}
              />
            </View>
          )}
          renderHeader={() => <Text style={styles.state}>{getStateName(playbackState)}</Text>}
        />
    </View>
  );
};

function getStateName(state) {
  switch (state) {
    case TrackPlayer.STATE_NONE:
      return 'None';
    case TrackPlayer.STATE_PLAYING:
      return 'Playing';
    case TrackPlayer.STATE_PAUSED:
      return 'Paused';
    case TrackPlayer.STATE_STOPPED:
      return 'Stopped';
    case TrackPlayer.STATE_BUFFERING:
      return 'Buffering';
  }
}

const onRewind = async () => {
  try {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position - 10);
  } catch (_) {}
};

const onFastForward = async () => {
  try {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 10);
  } catch (_) {}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  description: {
    width: '80%',
    marginTop: 20,
    textAlign: 'center',
  },
  player: {
    marginTop: 40,
  },
  state: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default PlaylistScreen;
