import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../constants/theme';
import { hp, wp } from '../../helpers/common';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, { FadeInLeft, FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import useUserStore from '../../store/userStore';

const FinalSignUp = () => {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = () => {
    const userData = {
      dateOfBirth,
      address,
      city,
      state,
      country,
      zipCode,
    };
    // Here you would typically send this data to your backend
    console.log(userData);
    // Update the global state
    setUser(userData);
    router.push('auth/setupPin');
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Animated.Image
          entering={FadeInLeft.duration(700)}
          source={require('../../assets/images/!slandPay.png')}
          style={styles.title}
        />
        <View style={styles.formCon}>
          <Animated.Text
            entering={FadeInLeft.duration(900)}
            style={styles.header}
          >
            Just One More Step
          </Animated.Text>
          <Animated.Text
            entering={FadeInLeft.duration(1000)}
            style={styles.subHeader}
          >
            Please provide the following details to complete your registration
          </Animated.Text>

          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <Text style={styles.dateText}>{dateOfBirth.toDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter your address"
              placeholderTextColor={theme.colors.grey_deep_2}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={setCity}
              placeholder="Enter your city"
              placeholderTextColor={theme.colors.grey_deep_2}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>State</Text>
            <TextInput
              style={styles.input}
              value={state}
              onChangeText={setState}
              placeholder="Enter your state"
              placeholderTextColor={theme.colors.grey_deep_2}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Country</Text>
            <TextInput
              style={styles.input}
              value={country}
              onChangeText={setCountry}
              placeholder="Enter your country"
              placeholderTextColor={theme.colors.grey_deep_2}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Zip Code</Text>
            <TextInput
              style={styles.input}
              value={zipCode}
              onChangeText={setZipCode}
              placeholder="Enter your zip code"
              placeholderTextColor={theme.colors.grey_deep_2}
              keyboardType="numeric"
            />
          </View>

          <Animated.View
            style={{ width: '100%' }}
            entering={FadeInUp.duration(1600)}
          >
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
            >
              <MaterialCommunityIcons
                name="check-circle"
                size={24}
                color={theme.colors.white}
                style={styles.submitIcon}
              />
              <Text style={styles.submitText}>Complete Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(3),
  },
  title: {
    width: wp(30),
    height: wp(30),
    resizeMode: 'contain',
    marginBottom: hp(4),
  },
  formCon: {
    width: wp(80),
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    color: theme.colors.white,
    marginBottom: hp(2),
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 16,
    color: theme.colors.grey_clean,
    marginBottom: hp(4),
    textAlign: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: hp(2),
  },
  label: {
    color: theme.colors.white,
    marginBottom: hp(1),
  },
  input: {
    width: '100%',
    padding: hp(1.5),
    backgroundColor: theme.colors.grey_deep,
    borderRadius: theme.radius.sm,
    color: theme.colors.white,
    borderColor: '#454545',
    borderWidth: 1,
    fontSize: 16,
  },
  dateText: {
    color: theme.colors.white,
    fontSize: 16,
    padding: hp(1.5),
    backgroundColor: theme.colors.grey_deep,
    borderRadius: theme.radius.sm,
    borderColor: '#454545',
    borderWidth: 1,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.purple,
    paddingVertical: hp(2),
    borderRadius: theme.radius.md,
    marginTop: hp(2),
    width: '100%',
  },
  submitIcon: {
    marginRight: wp(2),
  },
  submitText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FinalSignUp;