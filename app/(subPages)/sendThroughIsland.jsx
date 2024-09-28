import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import { wp, hp } from "../../helpers/common";

const currencies = [
  { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬" },
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "KES", name: "Kenyan Shilling", flag: "🇰🇪" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦" },
  { code: "GHS", name: "Ghanaian Cedi", flag: "🇬🇭" },
  { code: "XOF", name: "West African CFA franc", flag: "🌍" },
  { code: "XAF", name: "Central African CFA franc", flag: "🌍" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
];

const SendThroughIsland = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [pin, setPin] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setModalVisible(false);
  };

  const handleSend = () => {
    // Implement send logic here
    alert(`Sending ${amount} ${selectedCurrency.code} to ${receiver}`);
  };

  const renderCurrencyItem = ({ item }) => (
    <TouchableOpacity
      style={styles.currencyItem}
      onPress={() => handleCurrencySelect(item)}
    >
      <Text style={styles.currencyItemText}>
        {item.flag} {item.name} ({item.code})
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Through Island</Text>

      <TouchableOpacity
        style={styles.currencySelector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.currencySelectorText}>
          {selectedCurrency.flag} {selectedCurrency.code}
        </Text>
        <MaterialIcons
          name="arrow-drop-down"
          size={24}
          color={theme.colors.white}
        />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Enter amount"
        placeholderTextColor={theme.colors.grey_clean}
      />

      <TextInput
        style={styles.input}
        value={receiver}
        onChangeText={setReceiver}
        placeholder="Receiver's name or ID"
        placeholderTextColor={theme.colors.grey_clean}
      />

      <TextInput
        style={styles.input}
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
        placeholder="Enter PIN"
        placeholderTextColor={theme.colors.grey_clean}
        secureTextEntry
      />

      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Currency</Text>
            <FlatList
              data={currencies}
              renderItem={renderCurrencyItem}
              keyExtractor={(item) => item.code}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.black,
    padding: wp(5),
  },
  title: {
    fontSize: wp(6),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.white,
    marginBottom: hp(3),
  },
  currencySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: theme.colors.grey_deep,
    borderRadius: theme.radius.md,
    padding: wp(3),
    marginBottom: hp(3),
    width: wp(80),
    backgroundColor: theme.colors.grey_deep_2,
  },
  currencySelectorText: {
    fontSize: wp(4.5),
    color: theme.colors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.grey_deep,
    borderRadius: theme.radius.md,
    padding: wp(3),
    fontSize: wp(4.5),
    color: theme.colors.white,
    width: wp(80),
    marginBottom: hp(3),
    backgroundColor: theme.colors.grey_deep_2,
  },
  sendButton: {
    backgroundColor: theme.colors.purple,
    padding: wp(4),
    borderRadius: theme.radius.md,
    width: wp(80),
    alignItems: "center",
  },
  sendButtonText: {
    color: theme.colors.white,
    fontSize: wp(4.5),
    fontWeight: theme.fontWeights.bold,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: theme.colors.neutral(0.5),
  },
  modalContent: {
    backgroundColor: theme.colors.grey_deep,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    padding: wp(5),
    maxHeight: hp(50),
  },
  modalTitle: {
    fontSize: wp(5),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.white,
    marginBottom: hp(2),
  },
  currencyItem: {
    padding: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey_deep_2,
  },
  currencyItemText: {
    fontSize: wp(4),
    color: theme.colors.white,
  },
});

export default SendThroughIsland;
