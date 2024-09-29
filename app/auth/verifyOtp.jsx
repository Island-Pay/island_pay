import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSendOtp, useVerifyOtp } from '../apiCall/apiCall';
import { useQueryClient } from '@tanstack/react-query';
import { theme } from '../../constants/theme';
import { hp, wp } from '../../helpers/common';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const VerifyOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(['user']);
  const { mutate: sendOtp, isLoading: isSending } = useSendOtp();
  const { mutate: verifyOtp, isLoading: isVerifying } = useVerifyOtp();

  useEffect(() => {
    if (userData?.UserDetails?.email) {
      sendOtp({ email: userData.UserDetails.email });
      setIsLoading(false);
    } else {
      const unsubscribe = queryClient.getQueryCache().subscribe(() => {
        const updatedUserData = queryClient.getQueryData(['user']);
        if (updatedUserData?.UserDetails?.email) {
          sendOtp({ email: updatedUserData.UserDetails.email });
          setIsLoading(false);
          unsubscribe();
        }
      });

      return () => unsubscribe();
    }
  }, []);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      this[`otpInput${index + 2}`].focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length !== 4) {
      Alert.alert('Invalid OTP', 'Please enter a 4-digit OTP');
      return;
    }

    verifyOtp(
      { email: userData.UserDetails.email, otp: otpString },
      {
        onSuccess: (data) => {
          if (data.Access && data.Verified) {
            router.push('/auth/finalSignup');
          } else {
            Alert.alert('Verification Failed', data.Error || 'Please try again');
          }
        },
        onError: (error) => {
          Alert.alert('Error', 'Failed to verify OTP. Please try again.');
        },
      }
    );
  };

  const handleResendOtp = () => {
    sendOtp({ email: userData.UserDetails.email });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.purple} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(1000)} style={styles.contentContainer}>
        <Animated.Text entering={FadeInUp.duration(1000).delay(300)} style={styles.title}>
          Verify Your Email
        </Animated.Text>
        <Animated.Text entering={FadeInUp.duration(1000).delay(500)} style={styles.subtitle}>
          Enter the 4-digit code sent to {userData ? userData.UserDetails.email : 'your email'}
        </Animated.Text>
        <Animated.View entering={FadeInUp.duration(1000).delay(700)} style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={[styles.otpInput, digit && styles.otpInputFilled]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              keyboardType="numeric"
              maxLength={1}
              ref={(input) => {
                this[`otpInput${index + 1}`] = input;
              }}
            />
          ))}
        </Animated.View>
        <Animated.View entering={FadeInUp.duration(1000).delay(900)} style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={handleVerify}
            disabled={isVerifying}
          >
            <MaterialCommunityIcons name="check-circle" size={24} color={theme.colors.white} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>
              {isVerifying ? 'Verifying...' : 'Verify OTP'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInUp.duration(1000).delay(1100)}>
          <TouchableOpacity style={styles.resendButton} onPress={handleResendOtp} disabled={isSending}>
            <Text style={styles.resendText}>
              {isSending ? 'Sending...' : 'Resend OTP'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    width: wp(90),
    backgroundColor: theme.colors.grey_deep,
    padding: wp(10),
    borderRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.grey_clean,
    marginBottom: hp(4),
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: hp(4),
  },
  otpInput: {
    width: wp(15),
    height: wp(15),
    borderWidth: 2,
    borderColor: theme.colors.grey_clean,
    borderRadius: theme.radius.md,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: theme.colors.grey_deep,
    color: theme.colors.white,
  },
  otpInputFilled: {
    borderColor: theme.colors.purple,
    backgroundColor: theme.colors.grey_deep,
  },
  buttonContainer: {
    width: '100%',
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.purple,
    paddingVertical: hp(2),
    borderRadius: theme.radius.md,
    marginBottom: hp(2),
  },
  buttonIcon: {
    marginRight: wp(2),
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendButton: {
    padding: hp(1),
  },
  resendText: {
    color: theme.colors.purple_light,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.black,
  },
  loadingText: {
    marginTop: hp(2),
    fontSize: 16,
    color: theme.colors.white,
  },
});

export default VerifyOtp;