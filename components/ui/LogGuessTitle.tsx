import { ReactNode } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Colors } from "../../util/colors";

export default function LogGuessTitle({
  roundNumber,
  roundGuess,
}: {
  roundNumber: string;
  roundGuess: string;
}) {
  return (
    <View style={styles.title}>
      <Text style={styles.titleText}>{roundNumber}</Text>
      <Text style={styles.titleText}>{roundGuess}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 30,

    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "#9A092B",
    borderRadius: 10,
    borderWidth: 2,
    width: "100%",
    justifyContent: "space-between",
    borderColor: Colors.primary300,
  },
  titleText: {
    fontFamily: "buncit",
    lineHeight: 40,
    paddingHorizontal: 10,
    fontSize: 30,
    color: "white",
  },
});
