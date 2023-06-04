import { ReactNode } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Colors } from "../../util/colors";

export default function Title({ children }: { children: ReactNode }) {
  return (
    <View style={styles.title}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    fontSize: 30,

    backgroundColor: "#9A092B51",
    borderRadius: 10,
    textAlign: "center",
    borderWidth: 2,
    padding: 12,
    maxWidth: '70%',
    width: 300,
    borderColor: Colors.primary300,
  },
  titleText: {
    fontFamily: "dino-jumps",
    fontSize: 30,
    textAlign: 'center',
    color: "white",
  },
});
