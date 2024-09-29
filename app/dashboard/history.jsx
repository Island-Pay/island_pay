import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import { useGetWalletDetails } from "../apiCall/apiCall";

const getIconName = (process) => {
  switch (process) {
    case "Successfull":
      return "check-circle";
    case "Pending":
      return "clock";
    case "Failed":
      return "exclamation-circle";
    default:
      return "question-circle";
  }
};

const getCurrencySymbol = (currency) => {
  switch (currency) {
    case "NGN":
      return "₦";
    case "USD":
      return "$";
    case "KES":
      return "KSh";
    case "ZAR":
      return "R";
    case "GHS":
      return "₵";
    case "XOF":
    case "XAF":
      return "CFA";
    case "GBP":
      return "£";
    default:
      return "";
  }
};

const TransactionItem = ({ item, onPress }) => (
  <TouchableOpacity
    onPress={() => onPress(item)}
    style={styles.transactionItem}
  >
    <View
      style={[
        styles.transactionIcon,
        {
          borderColor: item.type === "Credit" ? "green" : "red",
        },
      ]}
    >
      <FontAwesome5
        name={item.type === "Credit" ? "arrow-down" : "arrow-up"}
        size={16}
        color={item.type === "Credit" ? "green" : "red"}
      />
    </View>
    <View style={styles.transactionDetails}>
      <Text style={styles.transactionType}>
        {/* {item.type === "Credit" ? "Received" : "Sent"} */}
        {item.naration}
      </Text>
      <Text style={styles.transactionParty}>
        {item.type === "Credit" ? `From ${item.from}` : `To ${item.to}`}
      </Text>
      <Text style={styles.transactionDate}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>
    </View>
    <View style={styles.transactionAmount}>
      <Text
        style={[
          styles.amount,
          {
            color: item.type === "Credit" ? "green" : "red",
          },
        ]}
      >
        {item.type === "Credit" ? "+" : "-"}
        {getCurrencySymbol(item.type === "Credit" ? item.to : item.from)}
        {item.amount.toFixed(2)}
      </Text>
      <MaterialCommunityIcons
        name={getIconName(item.process)}
        size={16}
        color={
          item.process === "Successfull"
            ? "green"
            : item.process === "Pending"
            ? theme.colors.orange
            : "red"
        }
      />
    </View>
  </TouchableOpacity>
);

const TransactionDetailsModal = ({ isVisible, onClose, transaction }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={isVisible}
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Transaction Details</Text>
        {transaction && (
          <>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Type:</Text>
              <Text style={styles.modalValue}>{transaction.type}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Amount:</Text>
              <Text style={styles.modalValue}>
                {getCurrencySymbol(
                  transaction.type === "Credit"
                    ? transaction.to
                    : transaction.from
                )}
                {transaction.amount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Charges:</Text>
              <Text style={styles.modalValue}>
                {getCurrencySymbol(
                  transaction.type === "Credit"
                    ? transaction.to
                    : transaction.from
                )}
                {transaction.charges.toFixed(2)}
              </Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Narration:</Text>
              <Text style={styles.modalValue}>{transaction.naration}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>From:</Text>
              <Text style={styles.modalValue}>{transaction.from}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>To:</Text>
              <Text style={styles.modalValue}>{transaction.to}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Status:</Text>
              <Text
                style={[
                  styles.modalValue,
                  {
                    color:
                      transaction.process === "Successfull"
                        ? "green"
                        : transaction.process === "Pending"
                        ? theme.colors.orange
                        : theme.colors.red,
                  },
                ]}
              >
                {transaction.process}
              </Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Date:</Text>
              <Text style={styles.modalValue}>
                {new Date(transaction.createdAt).toLocaleString()}
              </Text>
            </View>
          </>
        )}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const History = () => {
  const { data, error, isLoading } = useGetWalletDetails();
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (data && data.Balance && data.Balance.Transactions) {
      setTransactions(data.Balance.Transactions);
    }
  }, [data]);

  const handleTransactionPress = (transaction) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTransaction(null);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.purple} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching transactions</Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.black}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Transaction History</Text>
        <TouchableOpacity style={styles.filterButton}>
          <FontAwesome5 name="filter" size={16} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <TransactionItem item={item} onPress={handleTransactionPress} />
        )}
        keyExtractor={(item) => item.id}
        style={styles.transactionList}
        contentContainerStyle={styles.transactionListContent}
        showsVerticalScrollIndicator={false}
      />
      <TransactionDetailsModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
      />
    </SafeAreaView>
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
    backgroundColor: theme.colors.black,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.black,
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.red,
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: theme.colors.grey_clean,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey_deep,
  },
  headerText: {
    fontSize: 24,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.white,
  },
  filterButton: {
    padding: 10,
    backgroundColor: theme.colors.purple,
    borderRadius: 10,
  },
  transactionList: {
    flex: 1,
  },
  transactionListContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.grey_deep,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.black,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderWidth: 2,
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
    marginTop: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: theme.colors.grey_deep_2,
    marginTop: 4,
  },
  transactionAmount: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: theme.fontWeights.semibold,
    marginBottom: 4,
    color: theme.colors.grey_deep,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: theme.colors.grey_deep,
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.white,
    marginBottom: 20,
    textAlign: "center",
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  modalLabel: {
    fontSize: 16,
    color: theme.colors.grey_clean,
  },
  modalValue: {
    fontSize: 16,
    color: theme.colors.white,
    fontWeight: theme.fontWeights.medium,
  },
  closeButton: {
    backgroundColor: theme.colors.purple,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  closeButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: theme.fontWeights.semibold,
  },
});

export default History;
