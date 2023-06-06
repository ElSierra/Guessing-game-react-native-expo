import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  SafeAreaView,

} from "react-native";
import StartGameScreen from "./screens/startGame";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import GameScreen from "./screens/gameScreen";
import GameOver from "./screens/gameOver";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Audio } from "expo-av";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState<string | null>();
  const [gameOver, setGameOver] = useState(true);
  const [roundsNumber, setRoundsNumber] = useState(0);
  const startGameHandler = (pickedNumber: string) => {
    setUserNumber(pickedNumber);
    setGameOver(false);
  };
  const gameOverHandler = (number: number) => {
    setGameOver(true);
    setRoundsNumber(number);
    playSound();
  };

  const [sound, setSound] = useState<Audio.Sound>();
  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/sound/lose.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const gameStartNew = () => {
    setGameOver(true);
    setUserNumber(null);
  };

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "dino-jumps": require("./assets/fonts/DinoJumps-PersonalUse.otf"),
    buncit: require("./assets/fonts/hello.ttf"),
    hbear: require("./assets/fonts/hbear.ttf"),
    kiddyPlay: require("./assets/fonts/KiddyPlay.ttf"),
    rain: require("./assets/fonts/AYearWithoutRain.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  let screen = <StartGameScreen start={startGameHandler} />;
  if (userNumber) {
    screen = (
      <GameScreen userGuess={userNumber} gameOverHandler={gameOverHandler} />
    );
  }
  if (gameOver && userNumber) {
    screen = (
      <GameOver
        guessedNumber={userNumber}
        roundsNumber={roundsNumber.toString()}
        onStartNewGame={gameStartNew}
      />
    );
  }

  return (
    <LinearGradient
      colors={["#2F071F", "#E8110A"]}
      style={styles.rootScreen}
      onLayout={onLayoutRootView}
    >
       <StatusBar
            animated={true}
            style="light"
            backgroundColor="transparent"
           
   
          />
      <ImageBackground
        resizeMode="cover"
        style={styles.rootScreen}
        source={require("./assets/images/bg.png")}
        imageStyle={styles.imageBg}
      >
        <SafeAreaView style={styles.rootScreen}>
         
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  imageBg: {
    opacity: 0.5,
  },
});
