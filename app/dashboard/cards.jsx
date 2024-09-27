import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "../../constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";

const Cards = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/CardsP.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>Get your instant prepaid debit card</Text>
        <View style={styles.listContainer}>
          <View style={styles.listItem}>
            <View style={styles.iconContainer}>
              <FontAwesome5
                name="credit-card"
                size={12}
                color={theme.colors.white}
              />
            </View>
            <Text style={styles.listItemText}>
              Faster international payments
            </Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="globe" size={12} color={theme.colors.white} />
            </View>
            <Text style={styles.listItemText}>Globally accepted</Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.iconContainer}>
              <FontAwesome5
                name="shopping-bag"
                size={12}
                color={theme.colors.white}
              />
            </View>
            <Text style={styles.listItemText}>
              Works on all your favourite stores
            </Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.iconContainer}>
              <FontAwesome5
                name="shield-alt"
                size={12}
                color={theme.colors.white}
              />
            </View>
            <Text style={styles.listItemText}>Heavily secure</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    justifyContent: "space-around",
  },
  imageContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  image: {
    width: "80%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.white,
    marginBottom: 20,
    textAlign: "start",
    maxWidth: 230,
  },
  listContainer: {
    marginBottom: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: theme.colors.purple,
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  listItemText: {
    fontSize: 16,
    color: theme.colors.white,
    flex: 1,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: theme.colors.purple,
    padding: 15,
    borderRadius: theme.radius.md,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: theme.fontWeights.semibold,
  },
});

export default Cards;
