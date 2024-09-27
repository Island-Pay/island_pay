import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withClamp,
  runOnJS,
} from "react-native-reanimated";

const MODAL_HEIGHT = 400;

const DashboardScreen = () => {
  const router = useRouter();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState("Nigerian Account");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const accounts = [
    "Nigerian Account",
    "USD Account",
    "EUR Account",
    "GBP Account",
  ];

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

  return (
    <View style={styles.container}>
      <ScrollView>
        {Platform.OS !== "web" && (
          <StatusBar style="light" backgroundColor={theme.colors.purple} />
        )}

        <View style={styles.profileContainer}>
          <TouchableOpacity style={styles.profileCircle}>
            <Image
              source={{ uri: "https://via.placeholder.com/40" }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.accountContainer}>
          <TouchableOpacity style={styles.accountSelector} onPress={showModal}>
            <Text style={styles.accountSelectorText}>{selectedAccount}</Text>
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
                {isBalanceVisible ? "$5,000.00" : "********"}
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
              { icon: "wallet", text: "Account", active: true },
              { icon: "add-circle", text: "Add" },
              { icon: "arrow-up-circle", text: "Send" },
              { icon: "swap-horizontal", text: "Convert" },
            ].map((item, index) => (
              <View key={index} style={styles.actionButtonWrapper}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    item.active && styles.activeActionButton,
                  ]}
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
            <Text style={styles.transactionsTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.transactionItem}>
            <Ionicons name="arrow-down" size={24} color={theme.colors.red} />
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>Netflix Subscription</Text>
              <Text style={styles.transactionSubtext}>Debit • 22 Sep 2023</Text>
            </View>
            <Text style={styles.transactionAmount}>
              {isBalanceVisible ? "-$12.99" : "****"}
            </Text>
          </View>
        </View>

        <View style={styles.recommendedContainer}>
          <Text style={styles.recommendedTitle}>Recommended</Text>
          <View style={styles.servicesGrid}>
            {[
              "Invoices",
              "Bills & Airtime",
              "Gift Cards",
              "Analytics",
              "Payment Links",
              "Pouch",
            ].map((service, index) => (
              <TouchableOpacity key={index} style={styles.serviceItem}>
                <Ionicons
                  name="cube-outline"
                  size={24}
                  color={theme.colors.purple}
                />
                <Text style={styles.serviceText}>{service}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
            {accounts.map((account, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalItem}
                onPress={() => handleAccountSelect(account)}
              >
                <Text style={styles.modalItemText}>{account}</Text>
              </TouchableOpacity>
            ))}
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
    color: theme.colors.red,
    fontSize: 16,
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
    padding: hp(2),
    backgroundColor: theme.colors.grey_deep_2,
    marginVertical: hp(1),
    borderRadius: 10,
    color: theme.colors.white,
    // borderBottomWidth: 1,
    // borderBottomColor: theme.colors.grey_clean,
  },
  modalItemText: {
    color: theme.colors.white,
    fontSize: 16,
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
