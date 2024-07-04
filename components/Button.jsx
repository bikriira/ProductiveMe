import { View, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";

import Icon from "./Icon";


const Button = ({ color = "primary", iconista, iconName, text, iconStyle, fullRound, maxSize, handlePress }) => {
  const colorsMode = {
    primary: { gradient: ["#8a8dbd", "#4E5580"], filler: "#565F8A" },
    danger: { gradient: ['#f88379', '#e34234'], filler: "#e34234" },
  }

  const gradientStart = color === "danger" ? { x: 1, y: 1 } : { x: 0, y: 0 };
  const gradientEnd = color === "danger" ? { x: 0, y: 0 } : { x: 1, y: 1 };
  const roundness = fullRound ? "rounded-full" : "rounded-2xl"

  const getIconPadding = (iconista, maxSize) => {
    if (iconista) {
      return `p-${Math.max(0, maxSize - 4)}`;
    }
    return 'p-[2px]';
  };
  const paddingClass = getIconPadding(iconista, maxSize);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`${paddingClass} ${roundness} bg-[${colorsMode[color].filler}] items-center justify-center w-[34%]`}
      style={{
        backgroundColor: colorsMode[color].filler,
        shadowColor: "#424C68",
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 8,
      }}
      onPress={handlePress}

    >
      <LinearGradient
        className={`${paddingClass} ${roundness} items-center justify-center w-full`}
        colors={colorsMode[color].gradient}
        start={gradientStart}
        end={gradientEnd}
      >
        <View className={`${paddingClass + ' ' + roundness} items-center justify-center w-full`} style={{ backgroundColor: colorsMode[color].filler }}>
          {iconista ? <Icon name={iconName} moreStyles={iconStyle} /> : <Text className="text-white font-psemibold text-[18px]">{text}</Text>}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default Button