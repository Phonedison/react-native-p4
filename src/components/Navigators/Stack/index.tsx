import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { MembersScreen } from "../../../screens/Members";
import { SearchScreen } from "../../../screens/Search";
import { whiteColor } from "../../../utils/globalStyles";
import { TabRoutes } from "../BottomTabs";
import { Climate } from "../../../screens/climate";

export type RootStackParamList = {
  MainTabs: undefined;
  HomePage: undefined;
  SearchPage: undefined;
  WeatherDatailsPage: { localId: number; nomeCidade: string; latitude: number; longitude: number; temperatura?: number;};
  MembersPage: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const screenStyle: StackNavigationOptions = {
  headerTransparent: true,
  headerTintColor: whiteColor,
  headerTitleStyle: {
    fontWeight: "400",
    fontSize: 24,
  },
  headerShadowVisible: false,
};

export const StackRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="MainTabs" screenOptions={screenStyle}>
      <Stack.Screen
        name="MainTabs"
        component={TabRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchPage"
        component={SearchScreen}
        options={{
          title: "Buscar Local",
          headerBackTitle: "Voltar",
          headerTransparent: true,
          headerShown: true,
          presentation: "modal",
          animation: "slide_from_left",
        }}
      />
      <Stack.Screen
        name="MembersPage"
        component={MembersScreen}
        options={{
          title: "Página de Membros",
          headerBackTitleStyle: {},
          headerBackTitle: "Voltar",
          headerTransparent: true,
          headerShown: true,
          presentation: "transparentModal",
          animation: "slide_from_left",
        }}
      />
      <Stack.Screen
        name="WeatherDatailsPage"
        component={Climate}
        options={{ title: "Página de clima",
          headerBackTitleStyle: {},
          headerBackTitle: "Voltar",
          headerTransparent: true,
          headerShown: true,
          presentation: "transparentModal",
          animation: "slide_from_left", }}
      />
    </Stack.Navigator>
  );
};
