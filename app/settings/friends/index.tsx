import { View, Text, SafeAreaView } from "react-native";

const Friends = () => {
  return (
    <SafeAreaView className='bg-primary h-screen px-5'>
      <View className='ml-3 mt-1'>
        <View className='mt-4'>
          <Text className='text-white text-xl font-rsemibold'>Friends</Text>
          <Text className='text-4xl font-rbold mt-6 text-white'>TO DO //</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Friends;
