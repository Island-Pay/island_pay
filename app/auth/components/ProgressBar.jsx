import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { theme } from "../../../constants/theme";
import { wp, hp } from "../../../helpers/common";

const ProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <View style={styles.container}>
      {[...Array(totalSteps)].map((_, index) => (
        <View key={index} style={styles.stepContainer}>
          <Animated.View
            style={[
              styles.step,
              index < currentStep ? styles.completedStep : null,
            ]}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(6),
  },
  stepContainer: {
    flex: 1,
    height: 6,
    backgroundColor: theme.colors.grey_deep,
    borderRadius: 3,
    marginHorizontal: 2,
    overflow: 'hidden',
  },
  step: {
    height: '100%',
    width: '0%',
    backgroundColor: theme.colors.purple,
    borderRadius: 3,
  },
  completedStep: {
    width: '100%',
  },
});

export default ProgressBar;