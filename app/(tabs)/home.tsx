import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Animated,
} from "react-native";
import { CATEGORIES, COLORS } from "../../constants/AppConstants";
import { useTransactions } from "../../context/TransactionContext";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  const { addTransaction, totalIncome, totalExpense, balance } =
    useTransactions();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [type, setType] = useState("expense");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const handleSubmit = () => {
    if (!description || !amount) {
      alert("Please fill in all fields");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    addTransaction({
      date,
      description,
      amount: parsedAmount,
      type: type as "income" | "expense",
      category,
    });

    // Reset form
    setDescription("");
    setAmount("");
    setType("expense");
    setDate(new Date());
    setCategory(CATEGORIES[0]);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Balance Card */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceAmount}>€{balance.toFixed(2)}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View
                style={[styles.statDot, { backgroundColor: COLORS.income }]}
              />
              <Text style={styles.statLabel}>Income</Text>
              <Text style={styles.statValue}>€{totalIncome.toFixed(2)}</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <View
                style={[styles.statDot, { backgroundColor: COLORS.expense }]}
              />
              <Text style={styles.statLabel}>Expenses</Text>
              <Text style={styles.statValue}>€{totalExpense.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Add Transaction Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Add Transaction</Text>

          {/* Type Toggle */}
          <View style={styles.segmentContainer}>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                type === "expense" ? styles.segmentButtonActive : null,
              ]}
              onPress={() => setType("expense")}
            >
              <Icon
                name="arrow-down-outline"
                size={18}
                color={type === "expense" ? "#FFF" : COLORS.secondaryText}
              />
              <Text
                style={[
                  styles.segmentButtonText,
                  type === "expense" ? styles.segmentButtonTextActive : null,
                ]}
              >
                Expense
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.segmentButton,
                type === "income" ? styles.segmentButtonActive : null,
              ]}
              onPress={() => setType("income")}
            >
              <Icon
                name="arrow-up-outline"
                size={18}
                color={type === "income" ? "#FFF" : COLORS.secondaryText}
              />
              <Text
                style={[
                  styles.segmentButtonText,
                  type === "income" ? styles.segmentButtonTextActive : null,
                ]}
              >
                Income
              </Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="create-outline"
                size={20}
                color={COLORS.labelText}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="What was this for?"
                placeholderTextColor={COLORS.labelText}
              />
            </View>
          </View>

          {/* Amount */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Amount</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.currencySymbol}>€</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor={COLORS.labelText}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Date Picker */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Date</Text>
            <TouchableOpacity
              style={styles.inputWrapper}
              onPress={() => setShowDatePicker(true)}
            >
              <Icon
                name="calendar-outline"
                size={20}
                color={COLORS.labelText}
                style={styles.inputIcon}
              />
              <Text style={styles.dateText}>
                {format(date, "dd MMMM yyyy")}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="inline"
                onChange={onDateChange}
                style={styles.datePicker}
                textColor={COLORS.text}
              />
            )}
          </View>

          {/* Category Picker */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Category</Text>
            <TouchableOpacity
              style={styles.inputWrapper}
              onPress={() => setShowCategoryPicker(!showCategoryPicker)}
            >
              <Icon
                name="pricetag-outline"
                size={20}
                color={COLORS.labelText}
                style={styles.inputIcon}
              />
              <Text style={styles.categoryText}>{category}</Text>
              <View style={styles.dropdownIconContainer}>
                <Icon
                  name={showCategoryPicker ? "chevron-up" : "chevron-down"}
                  size={16}
                  color={COLORS.labelText}
                />
              </View>
            </TouchableOpacity>

            {showCategoryPicker && (
              <View style={styles.categoryList}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={styles.categoryItem}
                    onPress={() => {
                      setCategory(cat);
                      setShowCategoryPicker(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.categoryItemText,
                        cat === category && styles.categoryItemTextSelected,
                      ]}
                    >
                      {cat}
                    </Text>
                    {cat === category && (
                      <Icon name="checkmark" size={18} color={COLORS.primary} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Add Transaction</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingTop: 120,
    paddingBottom: 30,
  },
  balanceContainer: {
    marginHorizontal: 20,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.04)",
      },
    }),
  },
  balanceLabel: {
    fontSize: 16,
    color: COLORS.secondaryText,
    marginBottom: 8,
    opacity: 0.7,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.separator,
  },
  statItem: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  statDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.separator,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.secondaryText,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.text,
  },
  formContainer: {
    marginHorizontal: 20,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.04)",
      },
    }),
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 24,
    color: COLORS.text,
  },
  segmentContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.light,
    borderRadius: 10,
    marginBottom: 24,
    padding: 4,
  },
  segmentButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  segmentButtonActive: {
    backgroundColor: (type) =>
      type === "expense" ? COLORS.expense : COLORS.income,
  },
  segmentButtonText: {
    fontWeight: "600",
    fontSize: 15,
    color: COLORS.secondaryText,
  },
  segmentButtonTextActive: {
    color: "#FFFFFF",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: COLORS.labelText,
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.light,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  currencySymbol: {
    fontSize: 17,
    color: COLORS.text,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: COLORS.text,
    padding: 0,
  },
  dateText: {
    fontSize: 17,
    color: COLORS.text,
  },
  categoryText: {
    flex: 1,
    fontSize: 17,
    color: COLORS.text,
  },
  dropdownIconContainer: {
    padding: 4,
  },
  categoryList: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.separator,
    maxHeight: 200,
    overflow: "scroll",
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.05)",
      },
    }),
  },
  categoryItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.separator,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryItemText: {
    fontSize: 17,
    color: COLORS.text,
  },
  categoryItemTextSelected: {
    color: COLORS.primary,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 17,
  },
  datePicker: {
    marginTop: 10,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
  },
});
