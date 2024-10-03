import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import { wp, hp } from "../../helpers/common";
import { useSendMoney } from "../apiCall/apiCall";

const currencies = [
  { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬", symbol: "₦" },
  { code: "USD", name: "US Dollar", flag: "🇺🇸", symbol: "$" },
  { code: "KES", name: "Kenyan Shilling", flag: "🇰🇪", symbol: "KSh" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦", symbol: "R" },
  { code: "GHS", name: "Ghanaian Cedi", flag: "🇬🇭", symbol: "₵" },
  { code: "XOF", name: "West African CFA franc", flag: "🌍", symbol: "CFA" },
  { code: "XAF", name: "Central African CFA franc", flag: "🌍", symbol: "CFA" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", symbol: "£" },
];

const SendThroughIsland = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [pin, setPin] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPinModalVisible, setPinModalVisible] = useState(false);
  const [isConvertLoading, setConvertLoading] = useState(false);

  const sendMoneyMutation = useSendMoney();

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setModalVisible(false);
  };

  const handleSend = async () => {
    if (!amount || isNaN(amount) || !receiver) {
      Alert.alert("Error", "Please enter all required fields");
      return;
    }
    setPinModalVisible(true);
  };

  const handlePinSubmit = async () => {
    if (!pin) {
      Alert.alert("Error", "Please enter your PIN");
      return;
    }

    setConvertLoading(true);

    try {
      console.log("me the receiver:", receiver);
      await sendMoneyMutation.mutateAsync({
        currency: selectedCurrency.code,
        amount: parseFloat(amount),
        receiver,
        pin: parseInt(pin, 10),
      });
      Alert.alert("Success", "Money sent successfully");
      setPinModalVisible(false);
    } catch (error) {
      Alert.alert("Error", `${error.response.data.Error}`);
      console.log(error.response.data);
    } finally {
      setConvertLoading(false);
    }
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
      <Text style={styles.title}>Send Money</Text>

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

      <View style={styles.amountContainer}>
        <Text style={styles.currencySymbol}>{selectedCurrency.symbol}</Text>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter amount"
          placeholderTextColor={theme.colors.grey_clean}
        />
      </View>

      <TextInput
        style={styles.input}
        value={receiver}
        onChangeText={setReceiver}
        placeholder="Receiver's username"
        placeholderTextColor={theme.colors.grey_clean}
      />

      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>Send Money</Text>
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
              placeholder=""
              placeholderTextColor={theme.colors.grey_clean}
              maxLength={4}
            />
            <TouchableOpacity
              style={[styles.submitButton, !pin && styles.disabledButton]}
              onPress={handlePinSubmit}
              disabled={!pin || isConvertLoading}
            >
              {isConvertLoading ? (
                <ActivityIndicator size="small" color={theme.colors.white} />
              ) : (
                <Text style={styles.submitButtonText}>Submit</Text>
              )}
            </TouchableOpacity>
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
  input: {
    borderWidth: 1,
    borderColor: theme.colors.grey_deep,
    borderRadius: theme.radius.md,
    padding: wp(3),
    fontSize: wp(4.5),
    color: theme.colors.white,
    width: wp(80),
    backgroundColor: theme.colors.grey_deep_2,
    marginBottom: hp(3),
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
  pinModalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: theme.colors.neutral(0.5),
  },
  pinModalContent: {
    backgroundColor: theme.colors.grey_deep,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    padding: wp(5),
    width: "100%",
    alignItems: "center",
  },
  pinInput: {
    borderWidth: 1,
    borderColor: theme.colors.grey_deep,
    borderRadius: theme.radius.md,
    padding: wp(3),
    fontSize: 24,
    color: theme.colors.white,
    backgroundColor: theme.colors.grey_deep_2,
    width: wp(70),
    marginBottom: hp(3),
    textAlign: "center",
    letterSpacing: 10,
    fontWeight: theme.fontWeights.bold,
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
  disabledButton: {
    backgroundColor: theme.colors.grey_deep,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: hp(3),
  },
});

export default SendThroughIsland;
