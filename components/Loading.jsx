import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';
import LottieView from 'lottie-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  FadeIn
} from 'react-native-reanimated';

const Loading = ({ message = 'Loading...' }) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );

    rotation.value = withRepeat(
      withTiming(360, { duration: 2000 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotateZ: `${rotation.value}deg` }
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.lottieContainer, animatedStyle]}>
        <LottieView
          source={require('../assets/animations/loading-animation.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </Animated.View>
      <Animated.Text
        entering={FadeIn.duration(1000).delay(500)}
        style={styles.message}
      >
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
  lottieContainer: {
    width: wp(50),
    height: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: '100%',
    height: '100%',
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