import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import FormField from "../components/FormField";
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';

import Button from "../components/Button";

const AddTask = ({ navigation }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: new Date(),
    fromTime: new Date(),
    toTime: new Date(),
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [showToTimePicker, setShowToTimePicker] = useState(false);

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

  const handleSubmit = () => {
    // Handle submit logic here
    console.log('Form submitted:', form);
  };

  const handleCancel = () => {
    navigation.goBack();
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
        <Button text="Cancel" color="danger" handlePress={() => router.back()} />
        <Button text="Save" />
      </View></>
  );
}; 7

export default AddTask;
