import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Messages = () => {
  return (
    <SafeAreaView className="py-6 bg-primary h-full px-6">
      <Text className="text-2xl text-white font-psemibold">Messages</Text>
    </SafeAreaView>
  );
};

export default Messages;
