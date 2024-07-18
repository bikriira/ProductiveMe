import { View, Text } from "react-native";
import { SplashScreen, Tabs } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "../components/GradientButton";

import Icon from "../components/Icon";
import CustomHeader from '../components/CustomHeader';
import { TasksProvider } from "../contexts/TasksContext";

SplashScreen.preventAutoHideAsync();

function TabIcon({ iconName, focused, name }) {
  return (
    <View
      className={`items-center justify-center gap-2 ${focused && "relative mb-11"
        }`}
    >
      {focused ? (
        <View className="w-[69px] h-[69px] bg-white justify-center items-center rounded-full">
          <GradientButton
            iconName={iconName}
            outerStyles="rounded-full"
            iconStyle="w-[34px] h-[34px]"
          />
        </View>
      ) : (
        <Icon name={iconName} moreStyles="w-[24px] h-[24px]" />
      )}
      <Text className="text-white text-[12px] font-pmedium">{name}</Text>
    </View>
  );
}
const tabBarBackground = () => {
  return (
    <LinearGradient
      className="h-full"
      colors={["#424C68", "#565F8A", "#6E74B1"]}
      start={{ x: 0.07, y: 1 }}
      end={{ x: 0.95, y: 0 }}
      locations={[0, 0.47, 1]}
    >
      <LinearGradient
        className="-mt-[2px] h-[2px]"
        colors={["#FFFFFF", "#817E7E"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 1]}
      />
    </LinearGradient>
  );
};
export default function RootLayout() {
  const [fontsLoaded, FontError] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });
  useEffect(() => {
    if (FontError) throw FontError;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, FontError]);

  if (!fontsLoaded && !FontError) return null;


  return (
    <TasksProvider>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarBackground: tabBarBackground,
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 70,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                iconName="tasks"
                focused={focused}
                name="Tasks"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="routines"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                iconName="habit"
                focused={focused}
                name="Routines"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                iconName="category"
                focused={focused}
                name="Categories"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="timer"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                iconName="timer"
                focused={focused}
                name="Timer"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                iconName="account"
                focused={focused}
                name="Account"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="addTask"
          options={{
            header: () => <CustomHeader title="New Task" />,
            href: null,
            tabBarStyle: { display: "none" }
          }}
        />
      </Tabs>
    </TasksProvider>
  );
}
