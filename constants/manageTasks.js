import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async () => {
    console.log("getData Called");
    try {
        const tasks = await AsyncStorage.getItem("my-key");
        return tasks != null ? JSON.parse(tasks) : [];
    } catch (e) {
        console.error("Error reading data", e);
        return [];
    }
};

export default getData;

export const updateStorage = async (updatedTasks) => {
    try {
        const jsonTasks = JSON.stringify(updatedTasks);
        await AsyncStorage.setItem("my-key", jsonTasks);
        console.log("Data updated successfully");
    } catch (e) {
        console.error("Error updating data", e);
    }
};
