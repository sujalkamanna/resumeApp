import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Platform,
} from "react-native";

export default function Name_Social() {
  const socialLinks = [
    {
      text: "+91 - 9325309121",
      onPress: () => Linking.openURL("tel:+919325309121"),
    },
    {
      text: "sujalkamanna2003@gmail.com",
      onPress: () => Linking.openURL("mailto:sujalkamanna2003@gmail.com"),
    },
    {
      text: "LinkedIn: sujalkamanna",
      onPress: () =>
        Linking.openURL("https://www.linkedin.com/in/sujalkamanna"),
    },
    {
      text: "GitHub: sujalkamanna",
      onPress: () => Linking.openURL("https://github.com/sujalkamanna"),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>SUJAL KAMANNA</Text>
      <Text style={styles.subtitleText}>Software Developer | Data Analyst</Text>
      
      <View style={styles.linksRow}>
        {socialLinks.map((link, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity onPress={link.onPress} style={styles.socialLink}>
              <Text style={styles.linkText}>{link.text}</Text>
            </TouchableOpacity>
            {index < socialLinks.length - 1 && (
              <Text style={styles.separator}>|</Text>
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 15,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    letterSpacing: 1,
    color: "#1f2937",
    ...Platform.select({
      ios: {
        fontFamily: "System",
      },
      android: {
        fontFamily: "Roboto",
      },
    }),
  },
  subtitleText: {
    fontSize: 14,
    color: "#6b7280",
    fontStyle: "italic",
    marginBottom: 10,
    textAlign: "center",
    ...Platform.select({
      ios: {
        fontFamily: "System",
      },
      android: {
        fontFamily: "Roboto",
      },
    }),
  },
  linksRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  socialLink: {
    marginHorizontal: 5,
  },
  linkText: {
    color: "#007AFF",
    fontSize: 13,
    textAlign: "center",
    ...Platform.select({
      ios: {
        fontFamily: "System",
      },
      android: {
        fontFamily: "Roboto",
      },
    }),
  },
  separator: {
    color: "#9ca3af",
    marginHorizontal: 5,
  },
});