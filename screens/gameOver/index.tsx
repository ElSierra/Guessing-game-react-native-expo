import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Lottie from "lottie-react-native";
import Title from "../../components/ui/Title";
import { Colors } from "../../util/colors";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { Audio } from "expo-av";
import AnimatedLottieView from "lottie-react-native";

export default function GameOver({
  guessedNumber,
  roundsNumber,
  onStartNewGame,
}: {
  guessedNumber: string;
  roundsNumber: string;
  onStartNewGame: () => void;
}) {
  const lottieRef = useRef<AnimatedLottieView>(null);
  useEffect(() => {
    setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.play();
      }
    }, 1);
  }, [lottieRef.current]);

  return (
    <View style={style.root}>
      {/* <Text>Game is Over</Text> */}

      <Lottie
        ref={lottieRef}
        style={{
          width: "100%",
          padding: 60,
        }}
        source={require("../../assets/end.json")}
        autoPlay
        loop
      />
      <View style={style.bottomView}>
        <Text style={style.summary}>
          Your Phone needed <Text style={style.x}>{roundsNumber}</Text> rounds
        </Text>
        <Text style={style.summary}>
          to guess the number <Text style={style.y}>{guessedNumber}</Text>
        </Text>
      </View>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  );
}

const style = StyleSheet.create({
  root: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  summary: {
    fontFamily: "rain",
    lineHeight: 40,
    fontSize: 23,

    textAlign: "center",
    color: "white",
  },
  x: {
    fontFamily: "hbear",
  },
  y: {
    fontFamily: "hbear",
  },
  bottomView: {
    marginVertical: 20,
  },
});
