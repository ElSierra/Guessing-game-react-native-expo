import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Platform
} from "react-native";
import Lottie from "lottie-react-native";

import PrimaryButton from "../../components/ui/PrimaryButton";

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
  const { width, height } = useWindowDimensions();

  let content = (
    <>
      <Lottie
        ref={lottieRef}
        style={{
          width: width > 500 ? "50%" : "100%",
          padding: 60,
          marginTop: width > 500 ? 30 : 0,
          paddingHorizontal: 50,
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
    </>
  );

  if (width > 500) {
    content = (
      <View style={style.landScape}>
        <Lottie
          ref={lottieRef}
          style={{
            width: width > 500 ? "50%" : "100%",
            padding: 60,
            paddingHorizontal: 50,
          }}
          source={require("../../assets/end.json")}
          autoPlay
          loop
        />
        <View
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <View style={style.bottomView}>
            <Text style={style.summary}>
              Your Phone needed <Text style={style.x}>{roundsNumber}</Text>{" "}
              rounds
            </Text>
            <Text style={style.summary}>
              to guess the number <Text style={style.y}>{guessedNumber}</Text>
            </Text>
          </View>
          <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </View>
      </View>
    );
  }
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
      {content}
    </View>
  );
}

const style = StyleSheet.create({
  landScape: {
    flex: 1,
    flexDirection: "row",
  },
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
