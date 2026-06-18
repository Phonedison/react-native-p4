import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { HomeScreen } from "../../../screens/Home";
import { MembersScreen } from "../../../screens/Members";
import {
  backgroundColorNavegation,
  colorNavegationInactive,
  whiteColor,
} from "../../../utils/globalStyles";

export type TabParamList = {
  HomeTab: undefined;
  MembersTab: undefined;
};

const icon: { uri: string }[] = [
  { uri: "https://cdn-icons-png.flaticon.com/512/1946/1946488.png" },
  { uri: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png" },
];

const Tab = createBottomTabNavigator<TabParamList>();

export const TabRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: backgroundColorNavegation,
          height: 65,
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          marginTop: 2,
          fontSize: 12,
        },
        tabBarActiveTintColor: whiteColor,
        tabBarInactiveTintColor: colorNavegationInactive,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={icon[0]}
              style={{
                width: size,
                height: size,
                resizeMode: "contain",
                tintColor: focused ? whiteColor : colorNavegationInactive,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MembersTab"
        component={MembersScreen}
        options={{
          title: "Membros",
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={icon[1]}
              style={{
                width: size,
                height: size,
                resizeMode: "contain",
                tintColor: focused ? whiteColor : colorNavegationInactive,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
