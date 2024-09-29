import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  FadeIn,
  Easing,
} from 'react-native-reanimated';

const Loading = ({ message = 'Loading...' }) => {
  const dotScale = useSharedValue(0);
  const dotOpacity = useSharedValue(0);
  const messageOpacity = useSharedValue(0);

  useEffect(() => {
    const animationSequence = () => {
      dotScale.value = withSequence(
        withTiming(1, { duration: 300, easing: Easing.bounce }),
        withTiming(0.8, { duration: 200 }),
        withTiming(1, { duration: 200 }),
        withDelay(1000, withTiming(0, { duration: 300 }))
      );
      dotOpacity.value = withSequence(
        withTiming(1, { duration: 300 }),
        withDelay(1500, withTiming(0, { duration: 300 }))
      );
    };

    const interval = setInterval(animationSequence, 2400);
    animationSequence();

    messageOpacity.value = withDelay(1000, withTiming(1, { duration: 1000 }));

    return () => clearInterval(interval);
  }, []);

  const dotStyle = (delay) => useAnimatedStyle(() => ({
    opacity: dotOpacity.value,
    transform: [{ scale: withDelay(delay, dotScale.value) }],
  }));

  const messageStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        {[0, 100, 200].map((delay, index) => (
          <Animated.View key={index} style={[styles.dot, dotStyle(delay)]} />
        ))}
      </View>
      <Animated.Text style={[styles.message, messageStyle]}>
        {message}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.black,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    backgroundColor: theme.colors.white,
    marginHorizontal: wp(2),
  },
  message: {
    marginTop: hp(4),
    color: theme.colors.white,
    fontSize: wp(4.5),
    fontWeight: theme.fontWeights.medium,
    textAlign: 'center',
  },
});

export default Loading;