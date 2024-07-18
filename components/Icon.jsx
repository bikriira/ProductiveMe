import { Image, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

const Icon = ({ name, moreStyles, invertColor, handlePress }) => {

  return (
    <View>
      <TouchableOpacity activeOpacity={0.4} onPress={handlePress} disabled={!handlePress}>

        <Image
          source={icons[name]}
          className={`w-[24px] h-[24px] ${moreStyles}`}
          style={{ tintColor: invertColor }}
          resizeMode="contain"

        />
      </TouchableOpacity>
    </View>
  );
};

export default Icon;
