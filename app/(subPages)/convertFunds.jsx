import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import { wp, hp } from "../../helpers/common";

const currencies = [
  { name: "Nigeria", code: "NGN", symbol: "₦", flag: "🇳🇬" },
  { name: "Kenya", code: "KES", symbol: "KSh", flag: "🇰🇪" },
  { name: "Ghana", code: "GHS", symbol: "₵", flag: "🇬🇭" },
  { name: "United States", code: "USD", symbol: "$", flag: "🇺🇸" },
  { name: "South Africa", code: "ZAR", symbol: "R", flag: "🇿🇦" },
  { name: "United Kingdom", code: "GBP", symbol: "£", flag: "🇬🇧" },
  { name: "West African CFA", code: "XOF", symbol: "CFA", flag: "🇨🇮" },
  { name: "Central African CFA", code: "XAF", symbol: "CFA", flag: "🇨🇲" },
];

const convertFunds = () => {
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [isFromModalVisible, setFromModalVisible] = useState(false);
  const [isToModalVisible, setToModalVisible] = useState(false);
  const [isPinModalVisible, setPinModalVisible] = useState(false);

  const handleCurrencySelect = (currency, type) => {
    if (type === "from") {
      setFromCurrency(currency);
      setFromModalVisible(false);
    } else {
      setToCurrency(currency);
      setToModalVisible(false);
    }
  };

  const handleConvert = () => {
    setPinModalVisible(true);
  };

  const renderCurrencyItem = ({ item }, type) => (
    <TouchableOpacity
      style={styles.currencyItem}
      onPress={() => handleCurrencySelect(item, type)}
    >
      <Text style={styles.currencyItemText}>
        {item.flag} {item.name} ({item.code})
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Convert Funds</Text>

      <TouchableOpacity
        style={styles.currencySelector}
        onPress={() => setFromModalVisible(true)}
      >
        <Text style={styles.currencySelectorText}>
          {fromCurrency.flag} {fromCurrency.code}
        </Text>
        <MaterialIcons
          name="arrow-drop-down"
          size={24}
          color={theme.colors.white}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.currencySelector}
        onPress={() => setToModalVisible(true)}
      >
        <Text style={styles.currencySelectorText}>
          {toCurrency.flag} {toCurrency.code}
        </Text>
        <MaterialIcons
          name="arrow-drop-down"
          size={24}
          color={theme.colors.white}
        />
      </TouchableOpacity>

      <View style={styles.amountContainer}>
        <Text style={styles.currencySymbol}>{fromCurrency.symbol}</Text>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter amount"
          placeholderTextColor={theme.colors.grey_clean}
        />
      </View>

      <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
        <Text style={styles.convertButtonText}>Convert</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isFromModalVisible}
        onRequestClose={() => setFromModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select From Currency</Text>
            <FlatList
              data={currencies}
              renderItem={(item) => renderCurrencyItem(item, "from")}
              keyExtractor={(item) => item.code}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isToModalVisible}
        onRequestClose={() => setToModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select To Currency</Text>
            <FlatList
              data={currencies}
              renderItem={(item) => renderCurrencyItem(item, "to")}
              keyExtractor={(item) => item.code}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isPinModalVisible}
        onRequestClose={() => setPinModalVisible(false)}
      >
        <View style={styles.pinModalContainer}>
          <View style={styles.pinModalContent}>
            <Image
              source={require("../../assets/images/pass.png")}
              style={styles.image}
            />
            <Text style={styles.modalTitle}>Enter PIN</Text>
            <TextInput
              style={styles.pinInput}
              value={pin}
              onChangeText={setPin}
              keyboardType="numeric"
              secureTextEntry={true}
              placeholder="Enter your PIN"
              placeholderTextColor={theme.colors.grey_clean}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => setPinModalVisible(false)}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default convertFunds;

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
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(3),
    width: wp(80),
  },
  currencySymbol: {
    fontSize: wp(6),
    color: theme.colors.white,
    marginRight: wp(2),
  },
  amountInput: {
    borderWidth: 1,
    borderColor: theme.colors.grey_deep,
    borderRadius: theme.radius.md,
    padding: wp(3),
    fontSize: wp(4.5),
    color: theme.colors.white,
    flex: 1,
    backgroundColor: theme.colors.grey_deep_2,
  },
  convertButton: {
    backgroundColor: theme.colors.purple,
    padding: wp(4),
    borderRadius: theme.radius.md,
    width: wp(80),
    alignItems: "center",
  },
  convertButtonText: {
    color: theme.colors.white,
    fontSize: wp(4.5),
    fontWeight: theme.fontWeights.bold,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: theme.colors.neutral(0.5),
    width: "100%", // Full screen width
  },
  modalContent: {
    backgroundColor: theme.colors.grey_deep,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    padding: wp(5),
    maxHeight: hp(50),
    width: "100%", // Full screen width
  },
  modalTitle: {
    fontSize: wp(5),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.white,
    marginBottom: hp(2),
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: hp(2),
    marginLeft: 10,
    alignSelf: "center", // Center the image
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
  pinModalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: theme.colors.neutral(0.5),
    width: "100%", // Full screen width
  },
  pinModalContent: {
    backgroundColor: theme.colors.grey_deep,
    borderRadius: theme.radius.lg,
    padding: wp(5),
    width: "100%", // Full screen width
    alignItems: "center",
  },

  pinInput: {
    borderWidth: 1,
    borderColor: theme.colors.grey_deep,
    borderRadius: theme.radius.md,
    padding: wp(3),
    fontSize: wp(4.5),
    color: theme.colors.white,
    backgroundColor: theme.colors.grey_deep_2,
    width: wp(70),
    marginBottom: hp(3),
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: theme.colors.purple,
    padding: wp(4),
    borderRadius: theme.radius.md,
    width: wp(70),
    alignItems: "center",
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: wp(4.5),
    fontWeight: theme.fontWeights.bold,
  },
});
