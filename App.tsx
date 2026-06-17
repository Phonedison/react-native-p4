import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Home } from "./src/screens/Home";
import { styles } from "./src/screens/Home/styles";

export default function App() {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}
