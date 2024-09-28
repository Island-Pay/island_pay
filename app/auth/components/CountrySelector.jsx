import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Animated } from 'react-native';
import { theme } from "../../../constants/theme";
import { hp, wp } from "../../../helpers/common";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const countries = [
  { name: "Nigeria", code: "+234" },
  { name: "Kenya", code: "+254" },
  { name: "Ghana", code: "+233" },
  { name: "United States", code: "+1" },
];

const CountrySelector = ({ selectedCountry, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const handleSelect = (country) => {
    onSelect(country);
    closeModal();
  };

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const modalTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal} style={styles.selector}>
        <Text style={styles.selectorText}>
          {selectedCountry ? selectedCountry.name : "Select Country"}
        </Text>
        <MaterialCommunityIcons name="chevron-down" size={24} color={theme.colors.grey_deep_2} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal} activeOpacity={1}>
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: modalTranslateY }] },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Select Country</Text>
              <TouchableOpacity onPress={closeModal}>
                <MaterialCommunityIcons name="close" size={24} color={theme.colors.white} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={countries}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.countryName}>{item.name}</Text>
                  <Text style={styles.countryCode}>{item.code}</Text>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(3),
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.grey_deep,
    borderRadius: 12,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
  },
  selectorText: {
    color: theme.colors.white,
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.black,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    paddingTop: hp(2),
    maxHeight: hp(70),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey_deep,
  },
  modalHeaderText: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(2.5),
    paddingHorizontal: wp(5),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey_deep,
  },
  countryName: {
    color: theme.colors.white,
    fontSize: 18,
  },
  countryCode: {
    color: theme.colors.grey_deep_2,
    fontSize: 16,
  },
});

export default CountrySelector;