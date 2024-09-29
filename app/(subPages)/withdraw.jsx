import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { theme } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { getBanks } from "../apiCall/apiCall"; // Adjust the import path as needed
import { wp, hp } from "../../helpers/common"; // Assuming these are for responsive width/height

const countries = [
  { name: "Nigeria", code: "NGN", flag: "🇳🇬" },
  { name: "Kenya", code: "KES", flag: "🇰🇪" },
  { name: "South Africa", code: "ZAR", flag: "🇿🇦" },
  { name: "United States", code: "USD", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GBP", flag: "🇬🇧" },
];

const Withdraw = () => {
  const [country, setCountry] = useState(countries[0]);
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [amount, setAmount] = useState("");
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isBankModalVisible, setIsBankModalVisible] = useState(false);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const banksData = await getBanks(country.code);
        setBanks(banksData);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, [country]);

  const handleWithdraw = () => {
    if (!selectedBank || !amount) {
      alert("Please select a bank and enter an amount.");
      return;
    }

    alert(`Withdrawing ${amount} to ${selectedBank}`);
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setCountry(item);
        setIsCountryModalVisible(false);
      }}
    >
      <Text style={styles.modalItemText}>
        {item.flag} {item.name} ({item.code})
      </Text>
    </TouchableOpacity>
  );

  const renderBankItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setSelectedBank(item.name);
        setIsBankModalVisible(false);
      }}
    >
      <Text style={styles.modalItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet Payout</Text>
      <Text style={styles.subtitle}>This is where you withdraw your funds</Text>

      {/* Country Selector */}
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsCountryModalVisible(true)}
      >
        <Text style={styles.selectorText}>
          {country.flag} {country.code}
        </Text>
        <Ionicons name="chevron-down" size={24} color={theme.colors.white} />
      </TouchableOpacity>

      {/* Bank Selector */}
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsBankModalVisible(true)}
      >
        <Text style={styles.selectorText}>{selectedBank || "Select Bank"}</Text>
        <Ionicons name="chevron-down" size={24} color={theme.colors.white} />
      </TouchableOpacity>

      {/* Amount Input */}
      <View style={styles.amountContainer}>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter amount"
          placeholderTextColor={theme.colors.grey_clean}
        />
      </View>

      {/* Withdraw Button */}
      <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
        <Text style={styles.withdrawButtonText}>Withdraw</Text>
      </TouchableOpacity>

      {/* Country Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCountryModalVisible}
        onRequestClose={() => setIsCountryModalVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setIsCountryModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <ScrollView>
                {countries.map((item) => renderCountryItem({ item }))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Bank Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBankModalVisible}
        onRequestClose={() => setIsBankModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsBankModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Bank</Text>
              <ScrollView>
                {banks.length > 0 ? (
                  banks.map((item) => renderBankItem({ item }))
                ) : (
                  <Text style={styles.noBanksText}>No banks available</Text>
                )}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
  subtitle: {
    fontSize: wp(4),
    color: theme.colors.grey_clean,
    marginBottom: hp(2),
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: theme.colors.grey_deep,
    borderRadius: theme.radius.md,
    padding: wp(3),
    marginBottom: hp(2),
    width: wp(80),
    backgroundColor: theme.colors.grey_deep_2,
  },
  selectorText: {
    fontSize: wp(4.5),
    color: theme.colors.white,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(3),
    width: wp(80),
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
  withdrawButton: {
    backgroundColor: theme.colors.purple,
    padding: wp(4),
    borderRadius: theme.radius.md,
    width: wp(80),
    alignItems: "center",
  },
  withdrawButtonText: {
    color: theme.colors.white,
    fontSize: wp(4.5),
    fontWeight: theme.fontWeights.bold,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end", // Align modal to the bottom
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background effect
  },
  modalContent: {
    backgroundColor: theme.colors.grey_deep,
    borderRadius: theme.radius.lg,
    padding: wp(5),
    width: wp(90), // Adjust width for modal content
    maxHeight: hp(50),
  },
  modalTitle: {
    fontSize: wp(5),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.white,
    marginBottom: hp(2),
  },
  modalItem: {
    padding: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey_deep_2,
  },
  modalItemText: {
    fontSize: wp(4),
    color: theme.colors.white,
  },
  noBanksText: {
    textAlign: "center",
    color: theme.colors.grey_clean,
    padding: wp(5),
  },
});

export default Withdraw;
