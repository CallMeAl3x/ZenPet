import { Text, View } from "react-native";
import { SetStateAction, useState } from "react";
import TabItem from "../../components/TabItem";
import MessageList from "../../components/MessageList";
import { SafeAreaView } from "react-native-safe-area-context";

const Messages = () => {
  const [activeTab, setActiveTab] = useState("messages");

  const handleTabChange = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <SafeAreaView className="py-6 bg-primary h-full px-6">
      <View className="flex flex-row justify-center items-center">
        <TabItem
          title="Messages"
          isActive={activeTab === "messages"}
          onPress={() => handleTabChange("messages")}
          notificationCount={1}
        />
        <TabItem
          title="Notifications"
          isActive={activeTab === "notifications"}
          onPress={() => handleTabChange("notifications")}
          notificationCount={2}
          otherStyle="ml-6"
        />
      </View>

      {activeTab === "messages" ? (
        <MessageList />
      ) : (
        <View className="flex flex-col items-center justify-center h-full">
          <Text className="text-white text-lg font-rbold">Notifications</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Messages;
