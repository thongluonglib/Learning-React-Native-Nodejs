import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TrackPlayer, { State, useTrackPlayerEvents, Event } from 'react-native-track-player';
import { WebView } from 'react-native-webview';
const myHtmlFile = require('./AudioPage.html');
type Props = {}
const track1 = {
    url: require('../audio/001.mp3'), // Load media from the app bundle
    title: 'Coelacanth I',
    artist: 'deadmau5',
    artwork: require('../audio/001.mp3'), // Load artwork from the app bundle
    duration: 166
};

const Home = (props: Props) => {
    async function onPress() {
        await TrackPlayer.setupPlayer()
        await TrackPlayer.add([track1]);
        TrackPlayer.play();
        // const state = await TrackPlayer.getState();
        // if (state === State.Playing) {
        //     console.log('The player is playing');
        // };
    }
    // const [trackTitle, setTrackTitle] = useState<string>();

    // do initial setup, set initial trackTitle..

    // useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    //     if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
    //         const track = await TrackPlayer.getTrack(event.nextTrack);
    //         const { title } = track || {};
    //         setTrackTitle(title);
    //     }
    // });
    return (
        <View style={{ flex: 1 }}>
            {/* <Text>{trackTitle}</Text> */}
            <WebView
                originWhitelist={['*']}
                style={{ height: 500 }}
                source={myHtmlFile}
                onMessage={(event) => {
                }}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})