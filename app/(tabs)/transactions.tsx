import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { useTransactions } from "../../context/TransactionContext";
import { format } from "date-fns";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../constants/AppConstants";

export default function TransactionsScreen() {
  const { transactions, exportToCSV } = useTransactions();

  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionHeader}>
        <View style={styles.dateCategory}>
          <Text style={styles.date}>{format(item.date, "dd.MM.yyyy")}</Text>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{item.category}</Text>
          </View>
        </View>
        <Text
          style={[
            styles.amount,
            { color: item.type === "income" ? COLORS.income : COLORS.expense },
          ]}
        >
          {item.type === "income" ? "+" : "-"} €{item.amount.toFixed(2)}
        </Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Transaction History</Text>
          <TouchableOpacity style={styles.exportButton} onPress={exportToCSV}>
            <Icon name="download-outline" size={22} color={COLORS.primary} />
            <Text style={styles.exportText}>Export CSV</Text>
          </TouchableOpacity>
        </View>

        {transactions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="receipt-outline" size={60} color={COLORS.lightText} />
            <Text style={styles.emptyText}>No transactions yet</Text>
            <Text style={styles.emptySubText}>
              Your transactions will appear here
            </Text>
          </View>
        ) : (
          <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.light,
    paddingTop: Platform.OS === 'android' ? 25 : 0, // Add padding for Android
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 4,
    marginTop: Platform.OS === 'ios' ? 50 : 10, // Add margin for iOS header overlap
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text,
  },
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  exportText: {
    color: COLORS.primary,
    fontWeight: "500",
    marginLeft: 6,
    fontSize: 14,
  },
  transactionItem: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  dateCategory: {
    flexDirection: "column",
  },
  date: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 4,
  },
  categoryContainer: {
    backgroundColor: COLORS.light,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  category: {
    fontSize: 12,
    color: COLORS.lightText,
  },
  amount: {
    fontSize: 17,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: COLORS.text,
    marginTop: 4,
  },
  listContainer: {
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.lightText,
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.lightText,
    marginTop: 8,
  },
});
