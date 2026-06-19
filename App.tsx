import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Routes } from "./src/utils/routes";

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
