import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { useGetWalletDetails } from "../apiCall/apiCall";

const MODAL_HEIGHT = 400;

const DashboardScreen = () => {
  const router = useRouter();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data, error, isLoading, refetch } = useGetWalletDetails();

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    if (data) {
      const newAccounts = [
        {
          name: "Nigerian Account",
          currency: "₦",
          flag: "🇳🇬",
          balance: data.Balance.Wallet.Ngn,
        },
        {
          name: "USD Account",
          currency: "$",
          flag: "🇺🇸",
          balance: data.Balance.Wallet.Usd,
        },
        {
          name: "KES Account",
          currency: "KSh",
          flag: "🇰🇪",
          balance: data.Balance.Wallet.Kes,
        },
        {
          name: "ZAR Account",
          currency: "R",
          flag: "🇿🇦",
          balance: data.Balance.Wallet.Zar,
        },
        {
          name: "GHS Account",
          currency: "₵",
          flag: "🇬🇭",
          balance: data.Balance.Wallet.Ghs,
        },
        {
          name: "XOF Account",
          currency: "CFA",
          flag: "🇨🇮",
          balance: data.Balance.Wallet.Xof,
        },
        {
          name: "XAF Account",
          currency: "CFA",
          flag: "🇨🇲",
          balance: data.Balance.Wallet.Xaf,
        },
        {
          name: "GBP Account",
          currency: "£",
          flag: "🇬🇧",
          balance: data.Balance.Wallet.Gbp,
        },
      ];
      setAccounts(newAccounts);
      setSelectedAccount(newAccounts[0]); // Set the first account as default
    }
  }, [data]);

  const modalY = useSharedValue(MODAL_HEIGHT);

  const toggleBalanceVisibility = () => setIsBalanceVisible(!isBalanceVisible);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
    modalY.value = withSpring(0, {
      damping: 15,
      stiffness: 80,
      mass: 1,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    });
  }, []);

  const hideModal = useCallback(() => {
    modalY.value = withTiming(MODAL_HEIGHT, {}, () => {
      runOnJS(setIsModalVisible)(false);
    });
  }, []);

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
    hideModal();
  };

  const modalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: Math.max(0, modalY.value) }],
    };
  });

  const recommendedServices = [
    { name: "Invoices", icon: "receipt-outline" },
    { name: "Bills & Airtime", icon: "cellular-outline" },
    { name: "Gift Cards", icon: "gift-outline" },
    { name: "Analytics", icon: "stats-chart-outline" },
    { name: "Payment Links", icon: "link-outline" },
    { name: "Pouch", icon: "wallet-outline" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {Platform.OS !== "web" && (
          <StatusBar style="light" backgroundColor={theme.colors.purple} />
        )}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.purple} />
          </View>
        )}
        {error && <Text>Error: {error.message}</Text>}

        {data && selectedAccount && (
          <>
            <View style={styles.profileContainer}>
              <TouchableOpacity style={styles.profileCircle}>
                <Image
                  source={{ uri: "https://via.placeholder.com/40" }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.accountContainer}>
              <TouchableOpacity
                style={styles.accountSelector}
                onPress={showModal}
              >
                <Text style={styles.accountSelectorText}>
                  {selectedAccount.flag} {selectedAccount.name}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={theme.colors.white}
                />
              </TouchableOpacity>

              <View style={styles.balanceRow}>
                <View>
                  <Text style={styles.balanceLabel}>Balance</Text>
                  <Text style={styles.balanceAmount}>
                    {isBalanceVisible
                      ? `${
                          selectedAccount.currency
                        }${selectedAccount.balance.toFixed(2)}`
                      : "********"}
                  </Text>
                </View>
                <TouchableOpacity onPress={toggleBalanceVisibility}>
                  <Ionicons
                    name={isBalanceVisible ? "eye-off" : "eye"}
                    size={24}
                    color={theme.colors.white}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.actionButtonsContainer}>
                {[
                  {
                    icon: "arrow-up-circle",
                    text: "Withdraw",
                    // active: true,
                    to: "/withdraw",
                  },
                  {
                    icon: "add-circle",
                    text: "Deposit",
                    to: "/addFunds",
                  },
                  { icon: "arrow-up-circle", text: "Send", to: "sendFunds" },
                  {
                    icon: "swap-horizontal",
                    text: "Convert",
                    to: "convertFunds",
                  },
                ].map((item, index) => (
                  <View key={index} style={styles.actionButtonWrapper}>
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        item.active && styles.activeActionButton,
                      ]}
                      onPress={() => router.push(item.to)}
                    >
                      <Ionicons
                        name={item.icon}
                        size={24}
                        color={theme.colors.white}
                      />
                    </TouchableOpacity>

                    <Text
                      style={[
                        styles.actionButtonText,
                        item.active && styles.activeActionButtonText,
                      ]}
                    >
                      {item.text}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.transactionsContainer}>
              <View style={styles.transactionsHeader}>
                <Text style={styles.transactionsTitle}>
                  Recent Transactions
                </Text>
                <TouchableOpacity>
                  <Text
                    style={styles.seeAllText}
                    onPress={() => router.push("dashboard/history")}
                  >
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              {data?.Balance?.Transactions?.length > 0 ? (
                <View style={styles.transactionItem}>
                  <Ionicons
                    name={
                      data?.Balance?.Transactions[0]?.type === "Credit"
                        ? "arrow-up"
                        : "arrow-down"
                    }
                    size={24}
                    color={
                      data?.Balance?.Transactions[0]?.type === "Credit"
                        ? "green"
                        : "red"
                    }
                  />
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionName}>
                      {data?.Balance?.Transactions[0]?.naration}
                    </Text>
                    <Text style={styles.transactionSubtext}>
                      {data?.Balance?.Transactions[0]?.type} •{" "}
                      {new Date(
                        data?.Balance?.Transactions[0]?.createdAt
                      ).toLocaleString()}
                    </Text>
                  </View>
                  <Text style={styles.transactionAmount}>
                    {isBalanceVisible
                      ? `${data?.Balance?.Transactions[0]?.amount.toFixed(2)}`
                      : "****"}
                  </Text>
                </View>
              ) : (
                <Text style={styles.transactionSubtext}>No transactions</Text>
              )}
            </View>

            <View style={styles.recommendedContainer}>
              <Text style={styles.recommendedTitle}>Recommended</Text>
              <View style={styles.servicesGrid}>
                {recommendedServices.map((service, index) => (
                  <TouchableOpacity key={index} style={styles.serviceItem}>
                    <Ionicons
                      name={service.icon}
                      size={24}
                      color={theme.colors.purple}
                    />
                    <Text style={styles.serviceText}>{service.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {isModalVisible && (
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={hideModal}
        >
          <Animated.View style={[styles.modalContent, modalStyle]}>
            <View style={styles.modalLine}></View>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Account</Text>
              <TouchableOpacity onPress={hideModal}>
                <Ionicons name="close" size={24} color={theme.colors.white} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {accounts.map((account, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalItem}
                  onPress={() => handleAccountSelect(account)}
                >
                  <Text style={styles.modalItemText}>
                    {account.flag} {account.name}
                  </Text>
                  <Text style={styles.modalItemBalance}>
                    {account.currency}
                    {account.balance.toFixed(2)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    padding: wp(5),
    marginTop: hp(4),
  },
  profileCircle: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  accountContainer: {
    padding: wp(5),
    backgroundColor: theme.colors.grey_deep,
    borderRadius: theme.radius.md,
    marginHorizontal: wp(5),
    marginBottom: hp(2),
  },
  accountSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp(60),
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    backgroundColor: theme.colors.black,
    borderRadius: theme.radius.sm,
    marginBottom: hp(2),
  },
  accountSelectorText: {
    color: theme.colors.white,
    fontSize: 16,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceLabel: {
    color: theme.colors.grey_clean,
    fontSize: 14,
  },
  balanceAmount: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(3),
  },
  actionButtonWrapper: {
    alignItems: "center",
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
  },
  activeActionButton: {
    backgroundColor: theme.colors.purple,
  },
  actionButtonText: {
    color: theme.colors.white,
    marginTop: hp(1),
    fontSize: 12,
  },
  activeActionButtonText: {
    color: theme.colors.white,
  },
  transactionsContainer: {
    padding: wp(5),
    backgroundColor: theme.colors.grey_deep,
    borderRadius: theme.radius.md,
    marginHorizontal: wp(5),
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(2),
  },
  transactionsTitle: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllText: {
    color: theme.colors.purple,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionDetails: {
    flex: 1,
    marginLeft: wp(3),
  },
  transactionName: {
    color: theme.colors.white,
    fontSize: 16,
  },
  transactionSubtext: {
    color: theme.colors.grey_clean,
    fontSize: 12,
  },
  transactionAmount: {
    color: theme.colors.grey_clean,
    fontSize: 12,
    fontWeight: "bold",
  },
  recommendedContainer: {
    padding: wp(5),
    marginTop: hp(3),
  },
  recommendedTitle: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: hp(2),
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceItem: {
    width: "30%",
    alignItems: "center",
    backgroundColor: theme.colors.grey_deep,
    borderRadius: theme.radius.md,
    padding: wp(3),
    marginBottom: hp(2),
  },
  serviceText: {
    color: theme.colors.white,
    marginTop: hp(1),
    textAlign: "center",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: theme.colors.grey_deep,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    padding: wp(5),
    height: MODAL_HEIGHT,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
  },
  modalTitle: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: hp(2),
    backgroundColor: theme.colors.grey_deep_2,
    marginVertical: hp(1),
    borderRadius: 10,
  },
  modalItemText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  modalItemBalance: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  modalLine: {
    backgroundColor: theme.colors.white,
    height: 4,
    width: wp(20),
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 4,
    marginBottom: 30,
  },
});

export default DashboardScreen;
