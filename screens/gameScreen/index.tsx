import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from "react-native";
import Title from "../../components/ui/Title";
import { Colors } from "../../util/colors";
import { useEffect, useState } from "react";
import { generateRandomBetween } from "../../util/generate";
import NumberContainer from "../../components/game/NumberContainer";
import PrimaryButton from "../../components/ui/PrimaryButton";
import AlertModal from "../../components/ui/AlertModal";
import Card from "../../components/ui/Card";
import { TextInstruction } from "../../components/ui/TextInstruction.ios";
import { Ionicons } from "@expo/vector-icons";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import LogGuessTitle from "../../components/ui/LogGuessTitle";
import IncDecButton from "../../components/ui/IncDecButton";
//import { BlurView } from "@react-native-community/blur";

type Direction = "lower" | "higher";
let min = 1;
let max = 100;
export default function GameScreen({
  userGuess,
  gameOverHandler,
}: {
  userGuess: string;
  gameOverHandler: (number: number) => void;
}) {
  const initialGuess = generateRandomBetween(1, 100, Number(userGuess));
  const [CurrentGuess, setCurrentGuess] = useState(initialGuess);
  const [showAlert, setShowAlert] = useState(false);
  const { width, height } = useWindowDimensions();
  const [roundsArray, setRoundsArray] = useState([
    { guess: initialGuess, id: uuid() },
  ]);

  const nextGuess = (direction: Direction) => {
    if (CurrentGuess) {
      if (
        (direction === "lower" && CurrentGuess < Number(userGuess)) ||
        (direction === "higher" && CurrentGuess > Number(userGuess))
      ) {
        setShowAlert(true);
        return;
      }

      if (direction === "lower") {
        max = CurrentGuess + 1;
      } else {
        min = CurrentGuess;
      }
      console.log(min, max);
      const newRndNumber = generateRandomBetween(min, max, CurrentGuess);
      console.log(
        "🚀 ~ file: index.tsx:50 ~ nextguess ~ newRndNumber:",
        newRndNumber
      );
      if (newRndNumber !== undefined) {
        setCurrentGuess(newRndNumber);
        setRoundsArray((prev) => {
          return [{ guess: newRndNumber, id: uuid() }, ...prev];
        });
      }
    }
  };
  useEffect(() => {
    console.log(
      "🚀 ~ file: index.tsx:49 ~ useEffect ~ CurrentGuess:",
      CurrentGuess
    );
    if (CurrentGuess === Number(userGuess)) {
      gameOverHandler(roundsArray.length);
    }
  }, [CurrentGuess, userGuess, gameOverHandler]);
  useEffect(() => {
    min = 1;
    max = 100;
  }, []);
  const handlePressedCancel = () => {
    setShowAlert(false);
  };

  const roundLength = roundsArray.length;
  let content = (
    <>
      <NumberContainer>{CurrentGuess}</NumberContainer>
      <Card>
        <TextInstruction text="Higher or lower" style={styles.instText} />
        <View style={styles.buttonGroup}>
          <View style={styles.buttonContainer}>
            <IncDecButton onPress={nextGuess.bind(null, "higher")}>
              <Text>+</Text>
            </IncDecButton>
          </View>
          <View style={styles.buttonContainer}>
            <IncDecButton onPress={nextGuess.bind(null, "lower")}>
              {/* <Ionicons name="remove" size={24} /> */}
              <Text>-</Text>
            </IncDecButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.containerWide}>
          <View style={styles.buttonContainer}>
            <IncDecButton onPress={nextGuess.bind(null, "higher")}>
              <Text>+</Text>
            </IncDecButton>
          </View>
          <NumberContainer>{CurrentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <IncDecButton onPress={nextGuess.bind(null, "lower")}>
              {/* <Ionicons name="remove" size={24} /> */}
              <Text>-</Text>
            </IncDecButton>
          </View>
        </View>
      </>
    );
  }
  return (
    <View style={styles.screen}>
      <AlertModal
        showAlert={showAlert}
        onCancelPressed={handlePressedCancel}
        title="Don't lie"
      />
      {/* <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      /> */}
      <Title>Opponent's Guess</Title>

      {content}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={roundsArray}
        style={{ width: "80%", marginBottom: 20 }}
        renderItem={({ item, index }) => (
          <>
            <LogGuessTitle
              roundNumber={`# ${roundLength - index}`}
              roundGuess={`My guess: ${item.guess?.toString()}` || ""}
            />
          </>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
  },
  buttonGroup: {
    paddingHorizontal: 80,
    flexDirection: "row",
    width: "100%",
  },
  instText: {
    marginBottom: 12,
  },
  buttonContainer: { flex: 1 },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary300,
    borderRadius: 10,
    textAlign: "center",
    borderWidth: 2,
    padding: 12,
    borderColor: Colors.primary300,
  },
  listContainer: {
    backgroundColor: "red",

    alignSelf: "stretch",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",

    marginHorizontal: 24,
    borderRadius: 16,
    elevation: 30,
  },
  listText: {
    fontFamily: "hbear",
  },
  containerWide: {
    flexDirection: "row",
    marginHorizontal: 80,
    alignItems: "center",
  },
});
