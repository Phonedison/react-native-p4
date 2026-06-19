import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { StackRoutes } from "../../components/Navigators/Stack";

export const Routes = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />
      <StackRoutes />
    </NavigationContainer>
  );
};
