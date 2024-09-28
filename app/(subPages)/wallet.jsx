import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../constants/theme";
import { wp, hp } from "../../helpers/common";

const currencyData = {
  Ngn: { symbol: "₦", flag: "🇳🇬" },
  Usd: { symbol: "$", flag: "🇺🇸" },
  Kes: { symbol: "KSh", flag: "🇰🇪" },
  Zar: { symbol: "R", flag: "🇿🇦" },
  Ghs: { symbol: "₵", flag: "🇬🇭" },
  Xof: { symbol: "CFA", flag: "🇸🇳" },
  Xaf: { symbol: "FCFA", flag: "🇨🇲" },
  Gbp: { symbol: "£", flag: "🇬🇧" },
};

const Wallet = () => {
  const [balance, setBalance] = useState({
    Wallet: {
      Ngn: 1000,
      Usd: 200,
      Kes: 3000,
      Zar: 400,
      Ghs: 500,
      Xof: 6000,
      Xaf: 7000,
      Gbp: 800,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Balance</Text>
      <View style={styles.balanceContainer}>
        {Object.entries(balance.Wallet).map(([currency, amount]) => (
          <View key={currency} style={styles.balanceItem}>
            <Text style={styles.currency}>
              {currencyData[currency].flag} {currency}
            </Text>
            <Text style={styles.amount}>
              {currencyData[currency].symbol}
              {amount}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Wallet;

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
    textShadowColor: theme.colors.grey,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  balanceContainer: {
    width: wp(80),
    backgroundColor: theme.colors.grey_deep_2,
    borderRadius: theme.radius.md,
    padding: wp(5),
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  balanceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(1),
    borderBottomWidth: 1,
    // borderBottomColor: theme.colors.grey,
    paddingBottom: hp(1),
  },
  currency: {
    fontSize: wp(4.5),
    color: theme.colors.white,
    fontWeight: "600",
  },
  amount: {
    fontSize: wp(4.5),
    color: theme.colors.white,
    fontWeight: "600",
  },
});
