import React, {useEffect, useRef, useState} from 'react';
import {Animated, PanResponder, StyleSheet, View} from 'react-native';

const thumbWidth = 20;
const widthBox = 100;

interface Props {
  children: React.ReactElement;
}

export default ({children}: Props) => {
  const amination = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(widthBox);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(width - thumbWidth);

  const startRef = useRef(start);
  const endRef = useRef(end);
  const widthRef = useRef(width);
  const lastDxRef = useRef(0);

  const panResponderStart = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // start vẫn là 0 chỉ thay đổi chiều dài
        const value = gestureState.dx;
        const newValue = value - lastDxRef.current;
        console.log(
          lastDxRef.current,
          newValue,
          '===gestureState.moveX=== start',
        );
        if (newValue > 0) {
          // thu nhỏ về bên trái
          widthRef.current = widthRef.current - newValue;
        } else {
          // mở rông về bên trái
          widthRef.current = widthRef.current + Math.abs(newValue);
        }
        endRef.current = widthRef.current;
        setEnd(endRef.current);
        setWidth(widthRef.current);
        lastDxRef.current = value;
        amination.setValue(lastDxRef.current);
      },
      onPanResponderEnd: () => {
        lastDxRef.current = 0;
        amination.setValue(lastDxRef.current);
      },
      // onPanResponderGrant: (evt, gestureState) => {
      //   console.log(gestureState.moveX, '=====gestureState=== start');
      // },
    }),
  ).current;

  const panResponderEnd = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        // start vẫn là 0 chỉ thay đổi chiều dài
        const value = gestureState.dx;
        const newValue = value - lastDxRef.current;
        // console.log(lastDxRef.current, newValue, '===lastDxRef.current=== end');
        widthRef.current = widthRef.current + newValue;
        endRef.current = widthRef.current;
        setEnd(endRef.current);
        setWidth(widthRef.current);
        lastDxRef.current = value;
      },
      onPanResponderEnd: () => {
        lastDxRef.current = 0;
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[
        styles.container,
        {width: width, transform: [{translateX: amination}]},
      ]}>
      <View
        style={[styles.edge, {left: start}]}
        {...panResponderStart.panHandlers}
      />
      {children}
      <View
        style={[styles.edge, {left: end - thumbWidth}]}
        {...panResponderEnd.panHandlers}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  edge: {
    position: 'absolute',
    width: thumbWidth,
    backgroundColor: 'gray',
    height: '100%',
    zIndex: 10,
    opacity: 0.5,
  },
  container: {
    position: 'relative',
    height: 50,
    backgroundColor: 'red',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
