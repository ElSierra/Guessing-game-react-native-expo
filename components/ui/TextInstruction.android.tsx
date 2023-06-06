import { StyleProp, StyleSheet } from "react-native";
import { Text } from "react-native";
import { Colors } from "../../util/colors";

export const TextInstruction = ({
  text,
  style,
}: {
  text: string;
  style?: StyleProp<any>;
}) => {
  return <Text style={[styles.instText, style ? style : null]}>{text}</Text>;
};

const styles = StyleSheet.create({
  instText: {
    fontFamily: "buncit",
    color: 'white',
    fontWeight: "600",
    fontSize: 30,
  },
});
