import React from "react";
import { View, Text, StyleSheet, Button, Pressable, Image } from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";

const CongratsScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../../assets/images/check.png")} />
        <Text></Text>
        <Text></Text>
        <Pressable onPress={() => router.push("signIn")}></Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
});

export default CongratsScreen;
