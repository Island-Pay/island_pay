import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser"; // Correct import
import { theme } from "../../constants/theme";
import { wp, hp } from "../../helpers/common";
import { useGetDepositLink } from "../apiCall/apiCall";
import { router } from "expo-router";

const countries = [
  { name: "Nigeria", code: "NGN", symbol: "₦", flag: "🇳🇬" },
  { name: "Kenya", code: "KES", symbol: "KSh", flag: "🇰🇪" },
  { name: "Ghana", code: "GHS", symbol: "₵", flag: "🇬🇭" },
  { name: "United States", code: "USD", symbol: "$", flag: "🇺🇸" },
];

const AddFunds = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(countries[0]);
  const [amount, setAmount] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [depositLink, setDepositLink] = useState(null);

  const depositLinkMutation = useGetDepositLink();

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setModalVisible(false);
  };

  const handleAddFunds = async () => {
    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      const result = await depositLinkMutation.mutateAsync({
        currency: selectedCurrency.code,
        amount: parseFloat(amount),
      });
      setDepositLink(result.RedirectURl);
      openWebBrowser(result.RedirectURl);
    } catch (error) {
      alert(`Error creating deposit link: ${error.message}`);
    }
  };

  const openWebBrowser = async (url) => {
    try {
      const result = await WebBrowser.openBrowserAsync(url); // Correct usage
      if (result.type === "cancel") {
        // User closed the browser
        console.log("Browser closed");
      } else {
        // Handle completion (this might not be triggered depending on the payment flow)
        handleDepositCompletion(result);
        router.push("dashboard");
      }
    } catch (error) {
      console.error("Error opening web browser:", error);
    }
  };

  const handleDepositCompletion = (result) => {
    // Check the result URL for success or failure indicators
    if (result.url.includes("success")) {
      alert("Deposit successful!");
      router.push("dashboard");
    } else if (result.url.includes("failure")) {
      alert("Deposit failed. Please try again.");
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
      <Text style={styles.title}>Add Funds</Text>

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

      <TouchableOpacity
        style={[
          styles.addButton,
          depositLinkMutation.isLoading && styles.addButtonDisabled,
        ]}
        onPress={handleAddFunds}
        disabled={depositLinkMutation.isLoading}
      >
        {depositLinkMutation.isLoading ? (
          <ActivityIndicator size="small" color={theme.colors.white} />
        ) : (
          <Text style={styles.addButtonText}>Add Funds</Text>
        )}
      </TouchableOpacity>

      {depositLinkMutation.isError && (
        <Text style={styles.errorText}>
          Error: {depositLinkMutation.error.message}
        </Text>
      )}

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
              data={countries}
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
  addButton: {
    backgroundColor: theme.colors.purple,
    padding: wp(4),
    borderRadius: theme.radius.md,
    width: wp(80),
    alignItems: "center",
  },
  addButtonText: {
    color: theme.colors.white,
    fontSize: wp(4.5),
    fontWeight: theme.fontWeights.bold,
  },
  addButtonDisabled: {
    backgroundColor: theme.colors.grey_deep,
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
  errorText: {
    color: theme.colors.red,
    marginTop: hp(2),
    textAlign: "center",
  },
});

export default AddFunds;
