import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  SafeAreaView,
  Platform,
} from "react-native";
import { COLORS } from "../../constants/AppConstants";
import Icon from "react-native-vector-icons/Ionicons";
import { useTransactions } from "../../context/TransactionContext";

export default function SettingsScreen() {
  const { exportToCSV, transactions } = useTransactions();

  const handleExport = async () => {
    if (transactions.length === 0) {
      Alert.alert(
        "No Transactions",
        "You don't have any transactions to export.",
        [{ text: "OK" }]
      );
      return;
    }

    await exportToCSV();
  };

  const sections = [
    {
      title: "Data Management",
      items: [
        {
          icon: "download-outline",
          label: "Export to CSV",
          action: handleExport,
          rightIcon: "chevron-forward-outline",
        },
      ],
    },
    {
      title: "App Information",
      items: [
        {
          icon: "information-circle-outline",
          label: "Version",
          info: "1.0.0",
        },
        {
          icon: "code-outline",
          label: "Developer",
          info: "Isaac",
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {sections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    itemIndex === section.items.length - 1
                      ? styles.lastItem
                      : null,
                  ]}
                  onPress={item.action}
                  disabled={!item.action}
                >
                  <View style={styles.settingLeft}>
                    <View style={styles.iconContainer}>
                      <Icon name={item.icon} size={22} color={COLORS.primary} />
                    </View>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                  </View>
                  <View style={styles.settingRight}>
                    {item.info && (
                      <Text style={styles.settingInfo}>{item.info}</Text>
                    )}
                    {item.rightIcon && (
                      <Icon
                        name={item.rightIcon}
                        size={18}
                        color={COLORS.lightText}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Finance Tracker App</Text>
          <Text style={styles.copyright}>
            © {new Date().getFullYear()} All rights reserved
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  headerContainer: {
    padding: 16,
    paddingTop: Platform.OS === "ios" ? 50 : 25,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.lightText,
    marginBottom: 8,
    marginLeft: 12,
    textTransform: "uppercase",
  },
  sectionContent: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.light,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingInfo: {
    fontSize: 16,
    color: COLORS.lightText,
    marginRight: 8,
  },
  footer: {
    marginTop: 24,
    marginBottom: 48,
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  copyright: {
    fontSize: 14,
    color: COLORS.lightText,
    marginTop: 8,
  },
});
