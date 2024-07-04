import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from "expo-constants";
import Icon from './Icon';
import { LinearGradient } from 'expo-linear-gradient';

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    // <View >
    // </View>

    <>
      <LinearGradient
        style={{ paddingTop: Constants.statusBarHeight }}
        className="flex-row items-center justify-between bg-[#424C68] h-24"
        colors={["#6E74B1", "#424C68"]}
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        locations={[0.49, 1]}
      >

        <TouchableOpacity onPress={() => navigation.goBack()} className="w-14 items-center">
          <Icon name="back" moreStyles="w-[34px] h-[30px]" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-psemibold">{title}</Text>
        <View className="w-14" />
      </LinearGradient>
      <LinearGradient
        className="-mt-[2px] h-[2px]"
        colors={["#FFFFFF", "#817E7E"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        locations={[0, 1]}
      /></>
  );
};

export default CustomHeader;