import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ServiceOption from "../../components/ServiceOption";
import { serviceOptions } from "../(utils)/serviceOptions";

const Services = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
      }}
      className="w-full bg-primary h-full"
    >
      <SafeAreaView className="py-6 px-6">
        <Text className="text-4xl text-left text-white font-rbold -mt-3">
          Comment on peut vous aider ?
        </Text>
        {serviceOptions.map((option, index) => (
          <ServiceOption
            key={index}
            texte={option.texte}
            style={option.style}
            background={option.background}
            link={option.link}
          />
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};

export default Services;
