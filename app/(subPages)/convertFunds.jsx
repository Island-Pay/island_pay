import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import { wp, hp } from "../../helpers/common";
import {
  useGetRate,
  useConvertMoney,
  useGetWalletDetails,
} from "../apiCall/apiCall";
import { router } from "expo-router";

const ConvertFunds = () => {
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [amount, setAmount] = useState(0);
  const [pin, setPin] = useState("");
  const [isFromModalVisible, setFromModalVisible] = useState(false);
  const [isToModalVisible, setToModalVisible] = useState(false);
  const [isPinModalVisible, setPinModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  const {
    data: walletData,
    isLoading: isWalletLoading,
    isError: isWalletError,
  } = useGetWalletDetails();

  const {
    data: rateData,
    refetch: fetchRate,
    isLoading: isRateLoading,
  } = useGetRate(fromCurrency?.code, toCurrency?.code);
  const { mutate: convertMoney, isLoading: isConvertLoading } =
    useConvertMoney();

  useEffect(() => {
    if (walletData && walletData.Balance && walletData.Balance.Wallet) {
      const newCurrencies = [
        {
          name: "Nigerian Account",
          code: "NGN",
          currency: "₦",
          flag: "🇳🇬",
          balance: walletData.Balance.Wallet.Ngn,
        },
        {
          name: "USD Account",
          code: "USD",
          currency: "$",
          flag: "🇺🇸",
          balance: walletData.Balance.Wallet.Usd,
        },
        {
          name: "KES Account",
          code: "KES",
          currency: "KSh",
          flag: "🇰🇪",
          balance: walletData.Balance.Wallet.Kes,
        },
        {
          name: "ZAR Account",
          code: "ZAR",
          currency: "R",
          flag: "🇿🇦",
          balance: walletData.Balance.Wallet.Zar,
        },
        {
          name: "GHS Account",
          code: "GHS",
          currency: "₵",
          flag: "🇬🇭",
          balance: walletData.Balance.Wallet.Ghs,
        },
        {
          name: "XOF Account",
          code: "XOF",
          currency: "CFA",
          flag: "🇨🇮",
          balance: walletData.Balance.Wallet.Xof,
        },
        {
          name: "XAF Account",
          code: "XAF",
          currency: "CFA",
          flag: "🇨🇲",
          balance: walletData.Balance.Wallet.Xaf,
        },
        {
          name: "GBP Account",
          code: "GBP",
          currency: "£",
          flag: "🇬🇧",
          balance: walletData.Balance.Wallet.Gbp,
        },
      ];
      setCurrencies(newCurrencies);
      setFromCurrency(newCurrencies[0]);
      setToCurrency(newCurrencies[1]);
    }
  }, [walletData]);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetchRate();
    }
  }, [fromCurrency, toCurrency]);

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

  const handlePinSubmit = () => {
    setIsLoading(true);
    convertMoney(
      {
        from: fromCurrency.code,
        to: toCurrency.code,
        pin,
        amount: amount,
      },
      {
        onSuccess: (data) => {
          if (data.Access && data.Converted) {
            alert("Conversion successful!");
          } else {
            alert("Conversion failed: " + data.Error);
          }
          setPinModalVisible(false);
          setIsLoading(false);
          router.push("dashboard");
        },
        onError: (error) => {
          alert(error.response.data.Error);
          setIsLoading(false);
        },
      }
    );
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const renderCurrencyItem = ({ item }, type) => (
    <TouchableOpacity
      style={styles.currencyItem}
      onPress={() => handleCurrencySelect(item, type)}
    >
      <Text style={styles.currencyItemText}>
        {item.flag} {item.name} ({item.code})
      </Text>
      <Text style={styles.balanceText}>
        Balance: {item.currency} {item.balance.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );

  if (isWalletLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.purple} />
      </View>
    );
  }

  if (isWalletError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Error loading wallet data. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Convert Funds</Text>

      <View style={styles.currencyContainer}>
        <TouchableOpacity
          style={styles.currencySelector}
          onPress={() => setFromModalVisible(true)}
        >
          <Text style={styles.currencySelectorText}>
            {fromCurrency?.flag} {fromCurrency?.code}
          </Text>
          <MaterialIcons
            name="arrow-drop-down"
            size={24}
            color={theme.colors.white}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.swapButton} onPress={swapCurrencies}>
          <MaterialIcons
            name="swap-horiz"
            size={24}
            color={theme.colors.orange}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.currencySelector}
          onPress={() => setToModalVisible(true)}
        >
          <Text style={styles.currencySelectorText}>
            {toCurrency?.flag} {toCurrency?.code}
          </Text>
          <MaterialIcons
            name="arrow-drop-down"
            size={24}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.currencySymbol}>{fromCurrency?.currency}</Text>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder={`Enter Amount, minimum amount is ${(
            1 / Math.abs(rateData?.Rate)
          ).toFixed(2)} ${fromCurrency?.code}`}
          placeholderTextColor={theme.colors.grey_clean}
        />
      </View>

      {isRateLoading ? (
        <ActivityIndicator size="large" color={theme.colors.purple} />
      ) : (
        rateData && (
          <>
            <Text style={styles.rateText}>
              Conversion Rate: {rateData.Rate}
            </Text>

            {amount !== "" && (
              <Text style={styles.rateText}>
                You'll Get {toCurrency?.currency}{" "}
                {(rateData.Rate * parseFloat(amount)).toFixed(2)}
              </Text>
            )}
          </>
        )
      )}

      <TouchableOpacity
        style={[
          styles.convertButton,
          (!amount || isLoading) && styles.disabledButton,
        ]}
        onPress={handleConvert}
        disabled={!amount || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={theme.colors.white} />
        ) : (
          <Text style={styles.convertButtonText}>Convert</Text>
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isFromModalVisible || isToModalVisible}
        onRequestClose={() => {
          setFromModalVisible(false);
          setToModalVisible(false);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setFromModalVisible(false);
            setToModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  Select {isFromModalVisible ? "From" : "To"} Currency
                </Text>
                <FlatList
                  data={currencies}
                  renderItem={(item) =>
                    renderCurrencyItem(item, isFromModalVisible ? "from" : "to")
                  }
                  keyExtractor={(item) => item.code}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isPinModalVisible}
        onRequestClose={() => setPinModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setPinModalVisible(false)}>
          <View style={styles.pinModalContainer}>
            <TouchableWithoutFeedback>
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
                  disabled={!pin || isLoading}
                >
                  {isConvertLoading ? (
                    <ActivityIndicator
                      size="small"
                      color={theme.colors.white}
                    />
                  ) : (
                    <Text style={styles.submitButtonText}>Submit</Text>
                  )}
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ConvertFunds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.black,
    padding: wp(5),
  },
  title: {
    fontSize: wp(8),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.white,
    marginBottom: hp(5),
  },
  currencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp(90),
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
    width: wp(38),
    backgroundColor: theme.colors.grey_deep_2,
  },
  currencySelectorText: {
    fontSize: wp(4.5),
    color: theme.colors.white,
  },
  swapButton: {
    backgroundColor: theme.colors.grey_deep_2,
    padding: wp(2),
    borderRadius: theme.radius.xl,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(3),
    width: wp(90),
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
    fontSize: wp(3.5),
    color: theme.colors.white,
    flex: 1,
    backgroundColor: theme.colors.grey_deep_2,
  },
  rateText: {
    fontSize: wp(4.5),
    color: theme.colors.white,
    marginBottom: hp(1),
  },
  convertButton: {
    backgroundColor: theme.colors.purple,
    padding: wp(4),
    borderRadius: theme.radius.md,
    width: wp(90),
    alignItems: "center",
    marginTop: hp(3),
  },
  disabledButton: {
    backgroundColor: theme.colors.grey_deep,
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
  },
  modalContent: {
    backgroundColor: theme.colors.grey_deep,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    padding: wp(5),
    maxHeight: hp(60),
  },
  modalTitle: {
    fontSize: wp(6),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.white,
    marginBottom: hp(2),
    textAlign: "center",
  },
  image: {
    width: wp(25),
    height: wp(25),
    marginBottom: hp(2),
    alignSelf: "center",
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
  balanceText: {
    fontSize: wp(3.5),
    color: theme.colors.grey_clean,
    marginTop: hp(1),
  },
  errorText: {
    fontSize: wp(4),
    color: theme.colors.red,
    textAlign: "center",
  },
});
