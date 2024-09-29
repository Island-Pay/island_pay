import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import { wp, hp } from "../../helpers/common";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const SendFunds = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/!slandPay.png")}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <View style={styles.header}>
        <Text style={styles.title}>Send Funds</Text>
        <Text style={styles.subtitle}>Choose your preferred method</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("sendThroughIsland")}
        >
          <LinearGradient
            colors={[theme.colors.purple, theme.colors.darkerPurple]}
            style={styles.gradient}
          >
            <MaterialIcons
              name="send"
              size={wp(8)}
              color={theme.colors.white}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Send Through Island</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <LinearGradient
            colors={[theme.colors.grey_clean, theme.colors.purple]}
            style={styles.gradient}
          >
            <MaterialIcons
              name="account-balance"
              size={wp(8)}
              color={theme.colors.white}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Send Via Account</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: theme.colors.black,
    padding: wp(5),
  },
  logoImage: {
    width: wp(50),
    height: hp(20),
    marginTop: hp(5),
    marginBottom: hp(3),
  },
  header: {
    alignItems: "center",
    marginBottom: hp(5),
  },
  title: {
    fontSize: wp(8),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.white,
    marginBottom: hp(1),
  },
  subtitle: {
    fontSize: wp(4),
    color: theme.colors.lightGrey,
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    marginBottom: hp(3),
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    elevation: 5,
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: wp(5),
  },
  icon: {
    marginRight: wp(3),
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: wp(5),
    fontWeight: theme.fontWeights.semiBold,
  },
});

export default SendFunds;
