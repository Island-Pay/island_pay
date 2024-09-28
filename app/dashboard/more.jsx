import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import { wp, hp } from "../../helpers/common";
import { useRouter } from "expo-router";
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const OptionItem = ({ icon, title, onPress, isLast }) => (
  <TouchableOpacity
    style={[styles.optionItem, isLast && styles.lastOptionItem]}
    onPress={onPress}
  >
    <View style={styles.iconContainer}>
      <MaterialIcons name={icon} size={24} color={theme.colors.white} />
    </View>
    <Text style={styles.optionText}>{title}</Text>
    <MaterialIcons name="chevron-right" size={24} color={theme.colors.grey_clean} />
  </TouchableOpacity>
);

const SectionHeader = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const More = () => {
  const router = useRouter();

  const handleNavigation = (route) => {
    router.push(route);
  };

  const handleLogout = () => {
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: 'Logout',
      textBody: 'Are you sure you want to logout?',
      button: 'Logout',
      onPressButton: () => {
        // Implement logout logic here
        console.log('User logged out');
        // After logout, you might want to navigate to the login screen
        // router.push('/login');
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>More</Text>

        <View style={styles.section}>
          <SectionHeader title="Account" />
          <OptionItem icon="person" title="Your Profile" onPress={() => handleNavigation("/profile")} />
          <OptionItem icon="verified-user" title="Account Verification" onPress={() => handleNavigation("/verification")} />
          <OptionItem icon="notifications" title="Notifications" onPress={() => handleNavigation("/notifications")} isLast />
        </View>

        <View style={styles.section}>
          <SectionHeader title="Finances" />
          <OptionItem icon="attach-money" title="Transaction Limits" onPress={() => handleNavigation("/transaction-limits")} isLast />
        </View>

        <View style={styles.section}>
          <SectionHeader title="Security" />
          <OptionItem icon="lock" title="Change Password" onPress={() => handleNavigation("/change-password")} />
          <OptionItem icon="security" title="Two-Factor Authentication" onPress={() => handleNavigation("/two-factor")} />
          <OptionItem icon="dialpad" title="Change Your PIN" onPress={() => handleNavigation("/change-pin")} isLast />
        </View>

        <View style={styles.section}>
          <SectionHeader title="Others" />
          <OptionItem icon="help" title="Help & Support" onPress={() => handleNavigation("/support")} />
          <OptionItem icon="description" title="Terms & Conditions" onPress={() => handleNavigation("/terms")} />
          <OptionItem icon="privacy-tip" title="Privacy Policy" onPress={() => handleNavigation("/privacy")} />
          <OptionItem icon="info" title="About Us" onPress={() => handleNavigation("/about")} />
          <OptionItem icon="star" title="Rate the App" onPress={() => {/* Implement app rating logic */ }} />
          <OptionItem icon="logout" title="Log Out" onPress={handleLogout} isLast />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: wp(5),
    paddingBottom: hp(5), // Add padding to the bottom
  },
  title: {
    fontSize: wp(8),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.white,
    marginBottom: hp(4),
    marginTop: hp(6),
  },
  section: {
    marginBottom: hp(4),
    backgroundColor: theme.colors.grey_deep,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
  },
  sectionHeader: {
    fontSize: wp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.grey_clean,
    marginBottom: hp(2),
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey_deep_2,
  },
  lastOptionItem: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    backgroundColor: theme.colors.purple,
    borderRadius: wp(5),
    padding: wp(2),
    marginRight: wp(3),
  },
  optionText: {
    flex: 1,
    fontSize: wp(4),
    color: theme.colors.white,
    fontWeight: theme.fontWeights.medium,
  },
});

export default More;
