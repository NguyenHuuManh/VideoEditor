/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {
  Animated,
  PanResponder,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ResizeBox from './components/ResizeBox';
import {DragResizeBlock} from 'react-native-drag-resize';
const thumbWidth = 20;

const FrameList = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
    <View
      style={{
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderStyle: 'solid',
      }}
      key={item}>
      <Text>{item}</Text>
    </View>
  ));
};

function App(): JSX.Element {
  const videoDuration = 500;
  const endPositionAnimation = useRef(new Animated.Value(0)).current;
  const startPositionAnimation = useRef(new Animated.Value(0)).current;
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(videoDuration);

  const panResponderStart = useRef(
    PanResponder.create({
      // onStartShouldSetPanResponder: (evt, gestureState) => true,
      // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      // onMoveShouldSetPanResponder: (evt, gestureState) => true,
      // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        console.log(gestureState.moveX, '===gestureState.moveX=== start');
        // startPositionAnimation.setValue(gestureState.dx);
        setStart(gestureState.moveX);
      },
      onPanResponderGrant: (evt, gestureState) => {
        console.log(gestureState.moveX, '=====gestureState=== start');
      },
    }),
  ).current;

  const panResponderEnd = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        console.log(gestureState.moveX, '===gestureState.moveX=== end');
        endPositionAnimation.setValue(gestureState.dx);
      },
      onPanResponderGrant: (evt, gestureState) => {
        console.log(gestureState.moveX, '=====gestureState=== grand');
      },
    }),
  ).current;
  const endAnimation = {
    transform: [{translateX: endPositionAnimation}],
  };

  const startAnimation = {
    transform: [{translateX: startPositionAnimation}],
  };

  const [enableScroll, setEnableScroll] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ResizeBox>
        <FrameList />
      </ResizeBox>
      {/* <ResizeBox /> */}
      {/* <ScrollView horizontal>
        <View style={{flexDirection: 'row'}}>
          <ResizeBox />
          <ResizeBox />
        </View>
      </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'row',
  },
  trackContrainer: {
    height: 50,
    backgroundColor: '#FFFF',
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
    zIndex: 1,
  },
  thumb: {
    height: '100%',
    width: thumbWidth,
    backgroundColor: 'blue',
    position: 'absolute',
    zIndex: 10,
  },
});

export default App;
