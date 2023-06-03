import { ReactNode, useEffect, useState } from "react";

import {
  View,
  Text,
  Pressable,
  GestureResponderEvent,
  StyleSheet,
} from "react-native";
import { Colors } from "../../util/colors";
import { Audio } from "expo-av";

export default function IncDecButton({
  children,
  onPress,
}: {
  children: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
}) {
  const [sound, setSound] = useState<Audio.Sound>();
  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sound/click.wav")
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
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) => {
          return pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer;
        }}
        onPress={(e) => {
          onPress(e);
          playSound();
        }}
        android_ripple={{ color: Colors.primary100 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 8,
    margin: 4,
    
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingBottom: 10,

   
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    
    fontFamily: "buncit",
    fontSize: 60,
  },
  pressed: {
    opacity: 0.75,
  },
});
