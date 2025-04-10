export const CATEGORIES = [
  "Housing",
  "Food",
  "Transportation",
  "Entertainment",
  "Healthcare",
  "Education",
  "Personal",
  "Investments",
  "Salary",
  "Freelancing",
  "Gifts",
  "Other",
];

export const COLORS = {  // Primary system colors
  primary: "#007AFF", // iOS blue
  secondary: "#5856D6", // iOS purple
  
  // Semantic colors
  success: "#34C759", // iOS green
  danger: "#FF3B30", // iOS red
  warning: "#FF9500", // iOS orange
  info: "#5AC8FA", // iOS light blue
  
  // Backgrounds
  background: "#FFFFFF", // iOS white background
  cardBackground: "#FFFFFF",
  modalBackground: "rgba(242, 242, 247, 0.9)",
  
  // UI Elements
  separator: "#C6C6C8",
  opaqueSeparator: "#38383A",
  
  // Text
  text: "#000000",
  secondaryText: "#3C3C43",
  tertiaryText: "#8E8E93",
  labelText: "#8E8E93",
  lightText: "#8E8E93", // Added missing lightText definition
  
  // Specialized
  income: "#34C759",
  expense: "#FF3B30",
  incomeFaded: "rgba(52, 199, 89, 0.15)",
  expenseFaded: "rgba(255, 59, 48, 0.15)",
  
  // Elements
  border: "#E5E5EA",
  shadow: "rgba(0, 0, 0, 0.1)",
  overlay: "rgba(0, 0, 0, 0.4)",
  
  // Light/Dark specific
  light: "#F2F2F7",
  dark: "#1C1C1E",
};

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
}
