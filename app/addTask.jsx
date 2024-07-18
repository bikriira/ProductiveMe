import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import FormField from "../components/FormField";
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
// import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button";
import { TasksContext } from "../contexts/TasksContext";
import { updateStorage } from "../constants";
import { useRoute } from "@react-navigation/native";

const AddTask = () => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [showToTimePicker, setShowToTimePicker] = useState(false);

  const route = useRoute();
  const passedTask = route.params?.task;
  const [isEditMode, setIsEditMode] = useState(false);

  const [form, setForm] = useState({
    id: 0,
    title: '',
    description: '',
    date: new Date(),
    fromTime: new Date(),
    toTime: new Date(),
  });

  useEffect(() => {
    if (passedTask) {
      console.log("data passed = true", passedTask);
      setIsEditMode(true);
      setForm({
        id: passedTask.id,
        title: passedTask.title,
        description: passedTask.description,
        date: new Date(passedTask.date),
        fromTime: new Date(passedTask.fromTime),
        toTime: new Date(passedTask.toTime),
      });
    }
  }, [passedTask]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setForm((form) => ({ ...form, date: selectedDate }));
    }
  };

  const handleFromTimeChange = (event, selectedTime) => {
    setShowFromTimePicker(false);
    if (selectedTime) {
      setForm((form) => ({ ...form, fromTime: selectedTime }));
    }
  };

  const handleToTimeChange = (event, selectedTime) => {
    setShowToTimePicker(false);
    if (selectedTime) {
      setForm((form) => ({ ...form, toTime: selectedTime }));
    }
  };

  const getRandomId = (min, max) => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString();
  };

  const isIdExists = (id) => {
    return tasks.some(task => task.id === id);
  };

  const handleSubmit = () => {
    let newTaskId;
    if (isEditMode) {
      newTaskId = passedTask.id;
    } else {
      do {
        newTaskId = getRandomId(1, 180);
      } while (isIdExists(newTaskId));
    }

    const newTask = {
      ...form,
      id: newTaskId,
      date: form.date.toISOString(),
      fromTime: form.fromTime.toISOString(),
      toTime: form.toTime.toISOString(),
    };

    setTasks((currentTasks) => {
      let updatedTasks;
      if (isEditMode) {
        updatedTasks = currentTasks.map(task =>
          task.id === passedTask.id ? newTask : task
        );
      } else {
        updatedTasks = [...currentTasks, newTask];
      }
      updateStorage(updatedTasks);
      return updatedTasks;
    });

    console.log('Form submitted:', newTask);
    resetFormAndGoBack();
  };

  const resetFormAndGoBack = () => {
    router.back();
  };

  return (
    <>
      <ScrollView>
        <View className="h-[100vh]">
          <View className="mt-5 px-6">
            <FormField
              title="Title"
              value={form.title}
              placeholder="Enter task title"
              handleChange={(title) => setForm((form) => ({ ...form, title }))}
              otherStyle="mt-7"
            />
            <FormField
              title="Description"
              value={form.description}
              placeholder="Enter task description"
              handleChange={(description) =>
                setForm((form) => ({ ...form, description }))
              }
              otherStyle="mt-7"
            />
            <View className="mt-8">
              <Text className="text-base text-gray-500 font-pmedium ml-1 mb-2.5">Date *</Text>
              <TouchableOpacity activeOpacity={0.7}
                onPress={() => setShowDatePicker(true)}
                className="border-2 border-[#595959] w-full h-12 px-4 bg-black-100 rounded-2xl justify-center"
              >
                <Text className="text-[#606060] font-psemibold text-base">
                  {form.date.toDateString()}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={form.date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
            <View className="flex-row justify-between">
              <View className="w-[45%]">
                <Text className="text-base text-gray-500 font-pmedium mt-6 ml-1 mb-2.5">From</Text>
                <TouchableOpacity activeOpacity={0.7}
                  onPress={() => setShowFromTimePicker(true)}
                  className="border-2 border-[#595959] w-full h-12 px-4 bg-black-100 rounded-2xl justify-center"
                >
                  <Text className="text-[#595959] font-psemibold text-base">
                    {form.fromTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </Text>
                </TouchableOpacity>
                {showFromTimePicker && (
                  <DateTimePicker
                    value={form.fromTime}
                    mode="time"
                    display="default"
                    onChange={handleFromTimeChange}
                  />
                )}
              </View>
              <View className="w-[45%]">
                <Text className="text-base text-gray-500 font-pmedium mt-6 ml-1 mb-2.5">To</Text>
                <TouchableOpacity activeOpacity={0.7}
                  onPress={() => setShowToTimePicker(true)}
                  className="border-2 border-[#595959] w-full h-12 px-4 bg-black-100 rounded-2xl justify-center"
                >
                  <Text className="text-[#606060] font-psemibold text-base">
                    {form.toTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </Text>
                </TouchableOpacity>
                {showToTimePicker && (
                  <DateTimePicker
                    value={form.toTime}
                    mode="time"
                    display="default"
                    onChange={handleToTimeChange}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="flex-row  w-full justify-between p-5 bg-gray-200 absolute bottom-0">
        <Button text="Cancel" color="danger" handlePress={resetFormAndGoBack} />
        <Button text={isEditMode ? "Update" : "Save"} handlePress={handleSubmit} />
      </View>
    </>
  );
};

export default AddTask;