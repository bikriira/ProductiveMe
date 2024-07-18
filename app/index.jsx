import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useContext } from 'react';

import Icon from "../components/Icon";
import TaskView from "../components/TaskView";
import { TasksContext } from "../contexts/TasksContext";

export default function Index() {
  const { tasks, setTasks } = useContext(TasksContext);
  const undoneTasks = tasks.filter(task => !task.done);
  const doneTasks = tasks.filter(task => task.done);

  return (
    <View className="h-full bg-white">
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
            Completed: {tasks.filter(task => task.done).length}/{tasks.length}
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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="bg-white h-full"
      >

        <View className=" pb-[120px]">
          {tasks.every(task => task.done) &&
            <View className="px-7 mt-32 mb-32">
              <Text className="text-lg font-pmedium text-title">
                Zero tasks,
              </Text>
              <Text className="text-4xl text-black font-pbold mt-0">
                maximum chill.
              </Text>
            </View>}
          {
            tasks.length > 0 ? (
              <>
                {
                  undoneTasks.map((undoneTask, index) => (
                    <TaskView
                      key={undoneTask.id}
                      task={undoneTask}
                    />
                  ))
                }
                {doneTasks.map((doneTask, index) => (
                  <TaskView
                    key={doneTask.id}
                    task={doneTask}
                  />
                ))}
              </>
            ) :
              <View className="px-7 mt-20">
                <Text className="text-lg font-pmedium text-title">
                  Your list is jealous:{"\n"}It wants some company!
                </Text>
                <Text className="text-4xl text-black font-pbold mt-3">Add a new task.</Text>
              </View>
          }
        </View>
      </ScrollView>
      <View className="absolute bottom-[36px] right-[20px]">
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-[68px] h-[68px] rounded-full bg-[#565F8A] items-center justify-center"
          style={{
            shadowColor: "#000000",
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
      <StatusBar style="light" />
    </View>
  );
}
