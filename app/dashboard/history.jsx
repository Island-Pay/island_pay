import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../../constants/theme";

// Dummy data for transactions
const transactions = [
  {
    id: "1",
    type: "Received",
    amount: "+$50.00",
    date: "2024-09-25",
    from: "John Doe",
  },
  {
    id: "2",
    type: "Sent",
    amount: "-$30.00",
    date: "2024-09-24",
    to: "Jane Smith",
  },
  {
    id: "3",
    type: "Received",
    amount: "+$100.00",
    date: "2024-09-23",
    from: "Bob Johnson",
  },
  // Add more transactions as needed
];

const TransactionItem = ({ item }) => (
  <View style={styles.transactionItem}>
    <View style={styles.transactionIcon}>
      <FontAwesome5
        name={item.type === "Received" ? "arrow-down" : "arrow-up"}
        size={20}
        color={
          item.type === "Received" ? theme.colors.purple : theme.colors.red
        }
      />
    </View>
    <View style={styles.transactionDetails}>
      <Text style={styles.transactionType}>{item.type}</Text>
      <Text style={styles.transactionParty}>{item.from || item.to}</Text>
    </View>
    <View style={styles.transactionAmount}>
      <Text
        style={[
          styles.amount,
          {
            color:
              item.type === "Received" ? theme.colors.purple : theme.colors.red,
          },
        ]}
      >
        {item.amount}
      </Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  </View>
);

const History = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Transactions</Text>
        <TouchableOpacity style={styles.filterButton}>
          <FontAwesome5 name="filter" size={12} color={theme.colors.white} />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={transactions}
        renderItem={({ item }) => <TransactionItem item={item} />}
        keyExtractor={(item) => item.id}
        style={styles.transactionList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    // borderBottomColor: theme.colors.grey_clean,sss
  },
  headerText: {
    fontSize: 24,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.white,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.purple,
    borderRadius: 10,
    padding: 10,
  },
  filterButtonText: {
    marginLeft: 5,
    color: theme.colors.white,
    fontWeight: theme.fontWeights.medium,
    fontSize: 15,
  },
  transactionList: {
    flex: 1,
    backgroundColor: theme.colors.grey_deep,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  transactionItem: {
    flexDirection: "row",
    padding: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: theme.colors.grey_clean,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.black,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.white,
  },
  transactionParty: {
    fontSize: 14,
    color: theme.colors.grey_clean,
  },
  transactionAmount: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: theme.fontWeights.semibold,
  },
  date: {
    fontSize: 12,
    color: theme.colors.grey_deep_2,
  },
});

export default History;
