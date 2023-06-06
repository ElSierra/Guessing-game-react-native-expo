import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Text,
  ImageBackground,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Button } from "@rneui/themed";
import AwesomeAlert from "react-native-awesome-alerts";

import { useState } from "react";
import { Colors } from "../../util/colors";
import PrimaryButton from "../../components/ui/PrimaryButton";
import AlertModal from "../../components/ui/AlertModal";
import Title from "../../components/ui/Title";
import Card from "../../components/ui/Card";
import { TextInstruction } from "../../components/ui/TextInstruction";
export default function StartGameScreen({
  start,
}: {
  start: (text: string) => void;
}) {
  const [enteredNumber, setEnteredNumber] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { width, height } = useWindowDimensions();
  const handleNumberChange = (text: string) => {
    setEnteredNumber(text);
  };

  const handleReset = () => {
    setEnteredNumber("");
  };
  const handleConfirm = () => {
    if (enteredNumber.length > 0) {
      const parsedNumber = parseInt(enteredNumber);
      if (parsedNumber <= 0 || isNaN(parsedNumber) || parsedNumber > 99) {
        setShowAlert(true);
        return;
      }
      start(enteredNumber);
      console.log(parseInt(enteredNumber));
      return;
    }
    setShowAlert(true);
  };

  const handlePressedCancel = () => {
    setShowAlert(false);
    setEnteredNumber("");
  };
  const marginTopState = height < 400 ? 30 : 100;
  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.root, { marginTop: marginTopState }]}>
          <AlertModal
            showAlert={showAlert}
            onCancelPressed={handlePressedCancel}
            title='"Invalid Number Entered!, Number has to be between 0 and 99"'
          />
          <Title>{"Guess My number"}</Title>
          <Card>
            <TextInstruction text="Enter a number" />
            <TextInput
              blurOnSubmit={true}
              selectionColor={"red"}
              maxLength={2}
              onChangeText={handleNumberChange}
              inputMode="numeric"
              value={enteredNumber}
              style={styles.inputText}
            />
            <View style={styles.buttonGroup}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={handleReset}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={handleConfirm}>Confirm</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  screen: {
    flex: 1,
  },
  buttonGroup: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  buttonContainer: { flex: 1 },
  inputText: {
    height: 80,
    width: 100,
    fontFamily: "hbear",
    textAlign: "center",
    borderRadius: 8,
    backgroundColor: "#9F0E44",
    fontSize: 32,
    color: Colors.textColor,
    marginVertical: 8,
  },
});
