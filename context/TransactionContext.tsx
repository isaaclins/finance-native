import React, { createContext, useState, useContext, ReactNode } from "react";
import { Transaction } from "../constants/AppConstants";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { format } from "date-fns";

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  exportToCSV: () => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // Add a new transaction
  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(), // Simple ID generation
    };

    setTransactions([newTransaction, ...transactions]);
  };

  // Export to CSV
  const exportToCSV = async () => {
    try {
      // Create CSV header
      let csvContent = "Date,Description,Amount,Type,Category\n";

      // Add transaction data
      transactions.forEach((transaction) => {
        const formattedDate = format(transaction.date, "yyyy-MM-dd");
        csvContent += `${formattedDate},"${transaction.description}",${transaction.amount},${transaction.type},${transaction.category}\n`;
      });

      // Create temporary file
      const fileUri = FileSystem.documentDirectory + "finance_export.csv";
      await FileSystem.writeAsStringAsync(fileUri, csvContent);

      // Share the file
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        alert("Sharing is not available on this device");
      }
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        totalIncome,
        totalExpense,
        balance,
        exportToCSV,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }
  return context;
};
