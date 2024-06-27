import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function RootLayout() {
    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="w-full px-4 flex-col gap-0 border-b-2 border-b-gray-400 mt-5">
                    <View className="flex-row items-center pr-1">
                        <Text className="flex-grow text-xl font-bold text-title">
                            Studying Figma
                        </Text>
                        <Icon name="checkbox-blank-outline" size={25} />
                    </View>
                    <View className="flex-row items-center">
                        <Text className="flex-grow text-detail">
                            10:00 - 11:00 due to{" "}
                            <Text className="text-blue-100">+20min</Text>
                        </Text>
                        <Icon name="dots-horizontal" size={30} />
                    </View>
                </View>
                <View className="w-full px-4 flex-col gap-0 border-b-2 border-b-gray-400 mt-5">
                    <View className="flex-row items-center pr-1">
                        <Text className="flex-grow text-xl font-bold text-title">
                            Debug my website’s server
                        </Text>
                        <Icon name="checkbox-blank-outline" size={25} />
                    </View>
                    <View className="flex-row items-center">
                        <Text className="flex-grow text-detail">
                            12:00 - 15:00 due to{" "}
                            <Text className="text-blue">+20min</Text>
                        </Text>
                        <Icon name="dots-horizontal" size={30} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
