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
  ActivityIndicator,
  Alert,
} from "react-native";
import { theme } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import {
  getBanks,
  getMobileMoney,
  resolveBank,
  resolveMobileMoney,
  disburseToBank,
  disburseToMobileMoney,
} from "../apiCall/apiCall";
import { wp, hp } from "../../helpers/common";

const countries = [
  { name: "Nigeria", code: "NGN", flag: "🇳🇬", quc: "NG" },
  { name: "Kenya", code: "KES", flag: "🇰🇪", quc: "KE" },
  { name: "South Africa", code: "ZAR", flag: "🇿🇦", quc: "ZA" },
  { name: "United States", code: "USD", flag: "🇺🇸", quc: "US" },
  { name: "United Kingdom", code: "GBP", flag: "🇬🇧", quc: "GB" },
  { name: "Ghana", code: "GHS", flag: "🇬🇭", quc: "GH" },
];
const countries2 = [
  { name: "Kenya", code: "KES", flag: "🇰🇪", quc: "KE" },
  {
    name: "XOF Account",
    code: "XOF",
    currency: "CFA",
    flag: "🇨🇮",
    quc: "CI",
  },
  {
    name: "XAF Account",
    code: "XAF",
    currency: "CFA",
    flag: "🇨🇲",
    quc: "CM",
  },
  { name: "Ghana", code: "GHS", flag: "🇬🇭", quc: "GH" },
];

const Withdraw = () => {
  const [country, setCountry] = useState(countries[0]);
  const [country2, setCountry2] = useState(countries2[0]);
  const [withdrawalMethod, setWithdrawalMethod] = useState("bank");
  const [banks, setBanks] = useState([]);
  const [mobileMoney, setMobileMoney] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedMobileMoney, setSelectedMobileMoney] = useState(null);
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [narration, setNarration] = useState("");
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isBankModalVisible, setIsBankModalVisible] = useState(false);
  const [isMobileMoneyModalVisible, setIsMobileMoneyModalVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resolvedAccount, setResolvedAccount] = useState(null);

  useEffect(() => {
    fetchBanksOrMobileMoney();
  }, [country, withdrawalMethod]);

  const fetchBanksOrMobileMoney = async () => {
    setIsLoading(true);
    try {
      if (withdrawalMethod === "bank") {
        const banksData = await getBanks(country.quc);
        setBanks(banksData);
      } else {
        const mobileMoneyData = await getMobileMoney(country2.quc);
        setMobileMoney(mobileMoneyData);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response.data);
      Alert.alert("Error", "Failed to fetch banks or mobile money operators.");
    }
    setIsLoading(false);
  };

  const handleResolveAccount = async () => {
    setIsLoading(true);
    try {
      let resolvedData;
      if (withdrawalMethod === "bank") {
        resolvedData = await resolveBank(
          country.code,
          selectedBank.code,
          accountNumber
        );

        setResolvedAccount(resolvedData.data.Details);
        console.log("na me:,", resolvedData);
        setIsLoading(false);
      } else {
        resolvedData = await resolveMobileMoney(
          country.code,
          selectedMobileMoney.code,
          phoneNumber
        );
      }
    } catch (error) {
      console.error("Error resolving account:", error.response.data);
      Alert.alert("Error", "Failed to resolve account details.");
    }
    setIsLoading(false);
  };

  const handleWithdraw = async () => {
    if (!resolvedAccount || !amount || !pin) {
      Alert.alert(
        "Error",
        "Please fill in all required fields and resolve the account."
      );
      return;
    }

    setIsLoading(true);
    try {
      let response;
      if (withdrawalMethod === "bank") {
        response = await disburseToBank({
          bankCode: selectedBank.code,
          account: accountNumber,
          pin,
          amount: parseFloat(amount),
          currency: country.code,
          narration,
          accountName: resolvedAccount.account_name,
        });
      } else {
        response = await disburseToMobileMoney({
          mobileMoneySlug: selectedMobileMoney.slug,
          account: phoneNumber,
          pin,
          amount: parseFloat(amount),
          currency: country.code,
          narration,
        });
      }

      if (response.Access && response.Sent) {
        Alert.alert(
          "Success",
          `Withdrawal of ${amount} ${country.code} was successful`
        );
        // Reset form fields
        setAmount("");
        setAccountNumber("");
        setPhoneNumber("");
        setPin("");
        setNarration("");
        setResolvedAccount(null);
      } else {
        Alert.alert(
          "Error",
          response.Error || "Withdrawal failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during withdrawal:", error.response.data);
      Alert.alert(
        "Error",
        "An error occurred during withdrawal. Please try again."
      );
    }
    setIsLoading(false);
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
        setSelectedBank(item);
        setIsBankModalVisible(false);
      }}
    >
      <Text style={styles.modalItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderMobileMoneyItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setSelectedMobileMoney(item);
        setIsMobileMoneyModalVisible(false);
      }}
    >
      <Text style={styles.modalItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

      {/* Withdrawal Method Selector */}
      <View style={styles.methodContainer}>
        <TouchableOpacity
          style={[
            styles.methodButton,
            withdrawalMethod === "bank" && styles.methodButtonActive,
          ]}
          onPress={() => setWithdrawalMethod("bank")}
        >
          <Text style={styles.methodButtonText}>Bank Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.methodButton,
            withdrawalMethod === "mobileMoney" && styles.methodButtonActive,
          ]}
          onPress={() => setWithdrawalMethod("mobileMoney")}
        >
          <Text style={styles.methodButtonText}>Mobile Money</Text>
        </TouchableOpacity>
      </View>

      {/* Bank or Mobile Money Selector */}
      {withdrawalMethod === "bank" ? (
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setIsBankModalVisible(true)}
        >
          <Text style={styles.selectorText}>
            {selectedBank ? selectedBank.name : "Select Bank"}
          </Text>
          <Ionicons name="chevron-down" size={24} color={theme.colors.white} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setIsMobileMoneyModalVisible(true)}
        >
          <Text style={styles.selectorText}>
            {selectedMobileMoney
              ? selectedMobileMoney.name
              : "Select Mobile Money"}
          </Text>
          <Ionicons name="chevron-down" size={24} color={theme.colors.white} />
        </TouchableOpacity>
      )}

      {/* Account Number or Phone Number Input */}
      <TextInput
        style={styles.input}
        value={withdrawalMethod === "bank" ? accountNumber : phoneNumber}
        onChangeText={(text) =>
          withdrawalMethod === "bank"
            ? setAccountNumber(text)
            : setPhoneNumber(text)
        }
        keyboardType="numeric"
        placeholder={
          withdrawalMethod === "bank"
            ? "Enter account number"
            : "Enter phone number"
        }
        placeholderTextColor={theme.colors.grey_clean}
      />

      {/* Resolve Account Button */}
      <TouchableOpacity
        style={styles.resolveButton}
        onPress={handleResolveAccount}
      >
        <Text style={styles.resolveButtonText}>Resolve Account</Text>
      </TouchableOpacity>

      {/* Resolved Account Details */}
      {resolvedAccount && (
        <View style={styles.resolvedAccountContainer}>
          <Text style={styles.resolvedAccountText}>
            Account Name: {resolvedAccount.account_name}
          </Text>
          <Text style={styles.resolvedAccountText}>
            {withdrawalMethod === "bank" ? "Bank" : "Mobile Money"}:{" "}
            {resolvedAccount.bank_name || resolvedAccount.mobile_money_operator}
          </Text>
        </View>
      )}

      {/* Amount Input */}
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Enter amount"
        placeholderTextColor={theme.colors.grey_clean}
      />

      {/* PIN Input */}
      <TextInput
        style={styles.input}
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
        placeholder="Enter PIN"
        placeholderTextColor={theme.colors.grey_clean}
        secureTextEntry
      />

      {/* Narration Input */}
      <TextInput
        style={styles.input}
        value={narration}
        onChangeText={setNarration}
        placeholder="Enter narration (optional)"
        placeholderTextColor={theme.colors.grey_clean}
      />

      {/* Withdraw Button */}
      <TouchableOpacity
        style={styles.withdrawButton}
        onPress={handleWithdraw}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={theme.colors.white} />
        ) : (
          <Text style={styles.withdrawButtonText}>Withdraw</Text>
        )}
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

      {/* Mobile Money Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMobileMoneyModalVisible}
        onRequestClose={() => setIsMobileMoneyModalVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setIsMobileMoneyModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Mobile Money</Text>
              <ScrollView>
                {mobileMoney.length > 0 ? (
                  mobileMoney.map((item) => renderMobileMoneyItem({ item }))
                ) : (
                  <Text style={styles.noBanksText}>
                    No mobile money options available
                  </Text>
                )}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  methodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(80),
    marginBottom: hp(2),
  },
  methodButton: {
    flex: 1,
    padding: wp(3),
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.grey_deep_2,
    alignItems: "center",
    marginHorizontal: wp(1),
  },
  methodButtonActive: {
    backgroundColor: theme.colors.purple,
  },
  methodButtonText: {
    color: theme.colors.white,
    fontSize: wp(4),
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.grey_deep,
    borderRadius: theme.radius.md,
    padding: wp(3),
    marginBottom: hp(2),
    width: wp(80),
    fontSize: wp(4.5),
    color: theme.colors.white,
    backgroundColor: theme.colors.grey_deep_2,
  },
  resolveButton: {
    backgroundColor: theme.colors.purple,
    padding: wp(3),
    borderRadius: theme.radius.md,
    width: wp(80),
    alignItems: "center",
    marginBottom: hp(2),
  },
  resolveButtonText: {
    color: theme.colors.white,
    fontSize: wp(4),
    fontWeight: theme.fontWeights.bold,
  },
  resolvedAccountContainer: {
    backgroundColor: theme.colors.grey_deep_2,
    padding: wp(3),
    borderRadius: theme.radius.md,
    width: wp(80),
    marginBottom: hp(2),
  },
  resolvedAccountText: {
    color: theme.colors.white,
    fontSize: wp(4),
    marginBottom: hp(1),
  },
  withdrawButton: {
    backgroundColor: theme.colors.purple,
    padding: wp(4),
    borderRadius: theme.radius.md,
    width: wp(80),
    alignItems: "center",
    marginTop: hp(2),
  },
  withdrawButtonText: {
    color: theme.colors.white,
    fontSize: wp(4.5),
    fontWeight: theme.fontWeights.bold,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: theme.colors.grey_deep,
    borderRadius: theme.radius.lg,
    padding: wp(5),
    width: wp(90),
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
