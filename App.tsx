import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FavoritosProvider } from "./src/contexts/FavoritosContext";
import { Routes } from "./src/utils/routes";

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <FavoritosProvider>
          <Routes />
        </FavoritosProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}