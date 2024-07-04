import { View, Text } from "react-native";
import Icon from "../components/Icon";

function secsToTime(seconds) {
    const isNegative = seconds < 0;
    seconds = Math.abs(Math.round(seconds));
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    let timeString = minutes;
    if (hours > 0) {
        const paddedHours = hours.toString().padStart(2, "0");
        const paddedMinutes = minutes.toString().padStart(2, "0");
        timeString = `${paddedHours}:${paddedMinutes}`;
    }
    if (isNegative) {
        timeString = "-" + timeString;
    } else {
        timeString = "+" + timeString;
    }

    return timeString;
}

const TaskView = ({ title, deadlineText, timeRemaining, done }) => {
    return (
        <View
            className={`w-full px-4 flex-col gap-0 border-b-2 border-b-[#CECECE] pt-5 ${
                done && "bg-[#858aba91]"
            }`}
        >
            <View className="flex-row items-center pr-1">
                <Text className="flex-grow text-[17px] font-psemibold text-title">
                    {title}
                </Text>
                {done ? (
                    <Icon
                        name="done"
                        moreStyles="w-[30px] h-[30px]"
                        invertColor="#0B4FFF"
                    />
                ) : (
                    <Icon
                        name="checkBox"
                        size={25}
                        inverted={true}
                        invertColor="black"
                    />
                )}
            </View>

            <View className="flex-row items-center">
                <Text className="flex-grow text-detail text-[12px] font-pmedium">
                    {done ? (
                        "completed"
                    ) : (
                        <>
                            {deadlineText}
                            <Text
                                className={`${
                                    timeRemaining > 0
                                        ? "text-blue-100"
                                        : "text-[#FF0B0B]"
                                }`}
                            >
                                {" "}
                                {secsToTime(timeRemaining)}min
                            </Text>
                        </>
                    )}
                </Text>
                <Icon
                    name="more"
                    moreStyles="w-[30px] h-[30px]"
                    invertColor="black"
                />
            </View>
        </View>
    );
};

export default TaskView;
