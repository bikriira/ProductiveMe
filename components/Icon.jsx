import { Image, TouchableOpacity } from "react-native";
import { icons } from "../constants";

const Icon = ({ name, moreStyles, invertColor }) => {
    return (
        // <TouchableOpacity activeOpacity={0.4}>
        <Image
            source={icons[name]}
            className={`w-[24px] h-[24px] ${moreStyles}`}
            style={{ tintColor: invertColor }}
            resizeMode="contain"
        />
        /* </TouchableOpacity> */
    );
};

export default Icon;
