import AsyncStorage from "@react-native-async-storage/async-storage";

let tasks;
const getData = async () => {
    console.log("getData Called");
    try {
        tasks = await AsyncStorage.getItem("my-key");
        console.log(tasks);
        return tasks != null ? "JSON.parse(tasks)" : null;
    } catch (e) {
        return undefined;
    }
};

export default getData;
