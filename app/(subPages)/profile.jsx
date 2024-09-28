import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { wp, hp } from '../../helpers/common';
import { useRouter } from 'expo-router';

const ProfileSection = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const ProfileItem = ({ icon, title, value, onPress }) => (
  <TouchableOpacity style={styles.profileItem} onPress={onPress}>
    <MaterialIcons name={icon} size={24} color={theme.colors.purple} style={styles.itemIcon} />
    <View style={styles.itemContent}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemValue}>{value}</Text>
    </View>
    {onPress && <MaterialIcons name="chevron-right" size={24} color={theme.colors.grey_clean} />}
  </TouchableOpacity>
);

const Profile = () => {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleEditProfile = () => {
    router.push('/edit-profile');
  };

  const handleVerification = () => {
    router.push('/verification');
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>johndoe@example.com</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <ProfileSection title="Personal Information">
        <ProfileItem icon="person" title="Full Name" value="John Doe" />
        <ProfileItem icon="cake" title="Date of Birth" value="January 1, 1990" />
        <ProfileItem icon="phone" title="Phone Number" value="+1 (555) 123-4567" />
        <ProfileItem icon="location-on" title="Address" value="123 Main St, City, Country" />
      </ProfileSection>

      <ProfileSection title="Account Information">
        <ProfileItem icon="account-balance" title="Account Type" value="Premium" />
        <ProfileItem
          icon="verified-user"
          title="Account Verification"
          value="Verified"
          onPress={handleVerification}
        />
        <ProfileItem icon="credit-card" title="Linked Cards" value="2 cards" onPress={() => router.push('/linked-cards')} />
      </ProfileSection>

      <ProfileSection title="Security">
        <ProfileItem icon="lock" title="Change Password" value="" onPress={() => router.push('/change-password')} />
        <ProfileItem icon="fingerprint" title="Biometric Authentication" value="Enabled" onPress={() => router.push('/biometric-settings')} />
        <View style={styles.profileItem}>
          <Ionicons name="notifications" size={24} color={theme.colors.purple} style={styles.itemIcon} />
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>Push Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: theme.colors.grey_deep, true: theme.colors.purple }}
            thumbColor={notificationsEnabled ? theme.colors.white : theme.colors.grey_clean}
          />
        </View>
      </ProfileSection>

      <ProfileSection title="App Settings">
        <ProfileItem icon="language" title="Language" value="English" onPress={() => router.push('/language-settings')} />
        <ProfileItem icon="color-lens" title="Theme" value="Dark" onPress={() => router.push('/theme-settings')} />
      </ProfileSection>

      <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/logout')}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  contentContainer: {
    paddingTop: hp(8),
    paddingBottom: hp(10),
  },
  header: {
    alignItems: 'center',
    paddingVertical: hp(4),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey_deep,
    marginBottom: hp(4),
  },
  profileImage: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
    marginBottom: hp(2),
  },
  name: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: hp(1),
  },
  email: {
    fontSize: wp(4),
    color: theme.colors.grey_clean,
    marginBottom: hp(2),
  },
  editButton: {
    backgroundColor: theme.colors.purple,
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.5),
    borderRadius: theme.radius.md,
  },
  editButtonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: wp(3.5),
  },
  section: {
    marginTop: hp(4),
    paddingHorizontal: wp(5),
  },
  sectionTitle: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: hp(2.5),
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(2.5),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey_deep,
  },
  itemIcon: {
    marginRight: wp(4),
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: wp(4),
    color: theme.colors.white,
    marginBottom: hp(0.5),
  },
  itemValue: {
    fontSize: wp(3.5),
    color: theme.colors.grey_clean,
  },
  logoutButton: {
    backgroundColor: theme.colors.red,
    marginHorizontal: wp(5),
    marginTop: hp(6),
    paddingVertical: hp(2.5),
    borderRadius: theme.radius.md,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: wp(4),
  },
});

export default Profile;