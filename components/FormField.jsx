import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "../components/Icon";
import { useState } from "react";

const FormField = ({ title, value, placeholder, handleChange, otherstyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherstyles}`}>
      <Text className="text-base text-gray-400 font-psemibold mt-8 ml-1">
        {title} *
      </Text>
      <View
        className="border-b-2 border-detail 
                 w-[full] h-10 px-1.5 bg-black-100 
                 focus:border-secondary items-center  flex-row"
      >
        <TextInput
          className="flex-1 text-title font-psemibold text-base mb-0.5"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#595959"
          onChangeText={handleChange}
        />
      </View>
    </View>
  );
};

export default FormField;
