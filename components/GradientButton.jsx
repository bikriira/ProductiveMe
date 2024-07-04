import { LinearGradient } from "expo-linear-gradient";
import Icon from "../components/Icon";
import { Text } from "react-native";

const GradientButton = ({ iconName, iconStyle, text, textStyle, outerStyles, danger }) => {
  return (
    <LinearGradient
      className={`w-[49px] h-[49px] bg-blue-100 items-center justify-center ${outerStyles}`}
      colors={danger ? ['#FF6B6B', '#FF8E8E', '#FF6B6B'] : ["#424C68", "#6E74B1", "#565F8A"]}
      start={{ x: 0.07, y: 1 }}
      end={{ x: 0.95, y: 0 }}
      locations={[0, 0.47, 1]}
    >
      {iconName ? <Icon name={iconName} moreStyles={iconStyle} /> : <Text className={`${textStyle}`}>{text}</Text>}
    </LinearGradient>
  );
};

export default GradientButton;
