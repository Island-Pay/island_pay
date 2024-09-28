import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import { wp, hp } from "../../helpers/common";
import Animated from "react-native-reanimated";
import { router } from "expo-router";

const sendFunds = () => {
  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/images/!slandPay.png")}
        style={styles.Imgtitle}
      />
      <Text style={styles.title}>Send Funds</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("sendThroughIsland")}
      >
        <MaterialIcons
          name="send"
          size={wp(5)}
          color={theme.colors.white}
          style={styles.icon}
        />
        <Text style={styles.addButtonText}>Send Through Island</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton}>
        <MaterialIcons
          name="add"
          size={wp(5)}
          color={theme.colors.white}
          style={styles.icon}
        />
        <Text style={styles.addButtonText}>Send Via Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "start",
    backgroundColor: theme.colors.black,
    padding: wp(5),
    paddingTop: hp(20), // Add padding to avoid overlap with the image
  },
  title: {
    fontSize: wp(6),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.white,
    marginBottom: hp(3),
  },
  Imgtitle: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
    marginTop: hp(10),
    marginBottom: hp(2),
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: theme.colors.purple,
    padding: wp(4),
    borderRadius: theme.radius.md,
    width: wp(80),
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp(2),
  },
  icon: {
    marginRight: wp(2),
  },
  addButtonText: {
    color: theme.colors.white,
    fontSize: wp(4.5),
    fontWeight: theme.fontWeights.bold,
  },
});

export default sendFunds;
