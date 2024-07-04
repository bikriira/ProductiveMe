import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import Icon from "../components/Icon";
import { getTasks } from "../constants/";
import TaskView from "../components/TaskView";

export default function RootLayout() {
  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="bg-white h-full"
      >
        <LinearGradient
          style={{ paddingTop: Constants.statusBarHeight + 20 }}
          className="flex-col p-4"
          colors={["#6E74B1", "#424C68"]}
          start={{ x: 0.2, y: 0.2 }}
          end={{ x: 1, y: 1 }}
          locations={[0.49, 1]}
        >
          <View className="flex-row items-center">
            <View className="flex-grow">
              <Text className="text-xl text-white font-psemibold">
                Today
              </Text>
            </View>
            <View className="flex-row">
              <Icon name="search" moreStyles="mr-2" />
              <Icon name="filter" moreStyles="mr-2" />
              <Icon name="date" />
            </View>
          </View>
          <View>
            <Text className="text-[15px] text-[#EEEEEE]">
              Completed: 1/6
            </Text>
          </View>
        </LinearGradient>
        <LinearGradient
          className="-mt-[2px] h-[2px]"
          colors={["#FFFFFF", "#817E7E"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          locations={[0, 1]}
        />
        <View>
          {
            getTasks() == null &&
            getTasks().map((task, index) => (
              <TaskView
                key={index}
                title={task.title}
                deadlineText={task.deadlineText}
                timeRemaining={task.timeRemaining}
                done={task.done}
              />
            ))
          }
          <View className="px-7 mt-20">
            <Text className="text-lg font-pmedium text-title">
              Your list is jealous:{"\n"}It wants some company!
            </Text>
            <Text className="text-4xl text-black font-pbold mt-3">Add a new task.</Text>
          </View>
        </View>
        <View className="absolute bottom-[36px] right-[20px]">
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-[68px] h-[68px] rounded-full bg-[#565F8A] items-center justify-center"
            style={{
              shadowColor: "#424C68",
              shadowOffset: { width: 8, height: 8 },
              shadowOpacity: 0.5,
              shadowRadius: 12,
              elevation: 16,
            }}

            onPress={() => router.push("./addTask")}
          >
            <LinearGradient
              className="w-[64px] h-[64px] rounded-full items-center justify-center"
              colors={["#6E74B1", "#4E5580"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View className="w-[60px] h-[60px] rounded-full bg-[#565F8A] items-center justify-center">
                <Icon
                  name="add"
                  moreStyles="w-[34px] h-[34px]"
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </>
  );
}
