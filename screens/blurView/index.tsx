import React, { Component, ReactNode } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";

export default function Menu({ children }: { children: ReactNode }) {
  return (
    <View style={styles.container}>
      {children}
      {/* in terms of positioning and zIndex-ing everything before the BlurView will be blurred */}
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  absolute: {
    position: "absolute",
    top: 0,

    left: 0,
    bottom: 0,
    right: 0,
  },
});
