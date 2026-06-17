import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { StatusBar } from "react-native";
import { HomeScreen } from "../../screens/Home";
import { SearchScreen } from "../../screens/Search";

export type RootStackParamList = {
  HomePage: undefined;
  SearchPage: undefined;
  WeatherDatailsPage: { localId: number; latitude: number; longitude: number };
  AlertsPage: { localId?: number; latitude?: number; longitude?: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const screenStyle: StackNavigationOptions = {
  headerTransparent: true,
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "400",
    fontSize: 24,
  },
  headerShadowVisible: false,
};

export const Routes = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />

      <Stack.Navigator initialRouteName="HomePage" screenOptions={screenStyle}>
        <Stack.Screen
          name="HomePage"
          component={HomeScreen}
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="SearchPage"
          component={SearchScreen}
          options={{
            title: "Buscar Local",
            headerBackTitle: "Voltar",
            headerTransparent: true,
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
