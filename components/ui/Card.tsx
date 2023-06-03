import { ImageBackground, StyleSheet } from "react-native";
import { Colors } from "../../util/colors";
import { ReactNode } from "react";

export default function Card({children}: {children: ReactNode}) {
  return (
    <ImageBackground
      style={[styles.inputContainer]}
      resizeMode="cover"
      imageStyle={styles.imageBg}
      source={require("../../assets/images/dice-bg.png")}
    >
      {children}
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  imageBg: {
    borderRadius: 16,
    opacity: 0.1,
  },
  inputContainer: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
    marginHorizontal: 24,
    borderRadius: 16,
    elevation: 30,

    backgroundColor: Colors.primary800,

    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,

    shadowOpacity: 0.25,
  },
});
