import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../util/colors";

export default function NumberContainer({ children }: { children: ReactNode }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary500,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
   
    borderRadius: 6,
    margin: 24,
  },
  text: {
    color: Colors.textColor,
    fontSize: 24,
    fontFamily: "hbear",
  },
});
