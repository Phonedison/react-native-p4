import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Routes } from "./src/utils/routes";
import React from "react";

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
