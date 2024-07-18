import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import Icon from "../components/Icon";
import { useState, useEffect } from "react";
import { useContext } from 'react';
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";

import { TasksContext } from "../contexts/TasksContext";
import { updateStorage } from "../constants";

function formatTime(toTime, now) {
  const diff = (new Date(toTime) - new Date(now)) / 1000; // difference in seconds
  // console.log("Mydiff:", now, diff);
  const isNegative = diff < 0;
  const absDiff = Math.abs(diff);

  const months = Math.floor(absDiff / (30.44 * 24 * 60 * 60)); // Approximate average month length
  const days = Math.floor((absDiff % (30.44 * 24 * 60 * 60)) / (24 * 60 * 60));
  const hours = Math.floor((absDiff % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((absDiff % 3600) / 60);

  let timeString = '';

  if (months > 0) {
    timeString = `${months}m`;
    if (days > 0) timeString += ` ${days}d`;
  } else if (days > 0) {
    timeString = `${days}d`;
    if (hours > 0) timeString += ` ${hours}h`;
  } else if (hours > 0) {
    timeString = `${hours}h`;
    if (minutes > 0) timeString += ` ${minutes}min`;
  } else {
    timeString = `${minutes === NaN ? 0 : minutes}min`;
    // console.log("minutes", minutes);
  }

  return (isNegative ? "-" : "+") + timeString;
}

function formatDateAndTime(dateTimeString) {
  const now = new Date();
  const isToday = new Date(dateTimeString).toDateString() === now.toDateString()
  const date = new Date(dateTimeString);

  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (isToday) {
    return timeString;
  } else {
    const dateString = date.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
    return `${dateString} ${timeString}`;
  }
}

const TaskView = ({ task, onEdit, onDelete }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [doneTime, setDoneTime] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeRemaining(formatTime(task.toTime, now));
      setDoneTime(formatTime(now, task.doneTime));
    };
    updateTime();
    const intervalId = setInterval(updateTime, 60000);
    return () => clearInterval(intervalId);
  }, [task.toTime, task.doneTime]);

  const toggleTaskDone = (taskId) => {
    setTasks((currentTasks) => {
      const updatedTasks = currentTasks.map((myTask) =>
        myTask.id === taskId ? { ...myTask, done: !myTask.done, doneTime: new Date() } : myTask
      );
      updateStorage(updatedTasks);
      return updatedTasks;
    });
  };

  const handleMorePress = () => {
    setDropdownVisible(true);
  };


  const navigation = useNavigation()
  const handleEdit = () => {
    setDropdownVisible(false);
    navigation.navigate("addTask", { task: task })
  };

  const handleDelete = () => {
    setDropdownVisible(false);
    setTasks((currentTasks) => {
      const updatedTasks = currentTasks.filter((t) => t.id !== task.id);
      updateStorage(updatedTasks);
      return updatedTasks;
    });
  };

  return (
    <View
      className={`w-full px-4 flex-col gap-0 border-b-2 border-b-[#CECECE] pt-5 ${task.done ? "bg-[#858aba91]" : ""
        }`}
    >
      <View className="flex-row items-center pr-1">
        <TouchableOpacity className="flex-grow" onPress={() => { navigation.navigate("addTask", { task: task }) }} activeOpacity={0.7}>
          <Text className="text-[17px] font-psemibold text-title" numberOfLines={1} ellipsizeMode="tail" textBreakStrategy="balanced">
            {task.title}
          </Text>
        </TouchableOpacity>
        {task.done ? (
          <Icon
            name="done"
            moreStyles="w-[30px] h-[30px]"
            invertColor="#0B4FFF"
            handlePress={() => toggleTaskDone(task.id)}
          />
        ) : (
          <Icon
            name="checkBox"
            size={25}
            inverted={true}
            invertColor="black"
            handlePress={() => toggleTaskDone(task.id)}
          />
        )}
      </View>
      <View className="flex-row items-center">
        <Text className="flex-grow text-detail text-[12px] font-pmedium">
          {task.done ? (
            `Completed ${doneTime.replace('+', '')} ago`
          ) : (
            <>
              <Text>
                {`${formatDateAndTime(task.fromTime)} - ${formatDateAndTime(task.toTime)}`}
              </Text>
              <Text> • </Text>
              <Text
                className={
                  timeRemaining.startsWith('+') ? "text-blue-100" : "text-[#FF0B0B]"
                }
              >
                {timeRemaining}
              </Text>
            </>
          )}
        </Text>
        <TouchableOpacity onPress={handleMorePress}>
          <Icon
            name="more"
            moreStyles="w-[30px] h-[30px]"
            invertColor="black"
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={dropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <Pressable
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onPress={() => setDropdownVisible(false)}
        >
          <View className="bg-white rounded-lg shadow-lg w-40">
            <TouchableOpacity onPress={handleEdit} className="px-4 py-3 border-b border-gray-200">
              <Text className="text-base">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} className="px-4 py-3">
              <Text className="text-base text-red-500">Delete</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default TaskView;