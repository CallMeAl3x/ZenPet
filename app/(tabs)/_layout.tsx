import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { icons } from "../../constants";
import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import Header from "../../components/Header";

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${
          focused ? "font-psemibold" : "font-pregular"
        } text-[10px]`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Header />
      <Tabs
        screenOptions={{
          header: () => null,
          tabBarActiveTintColor: "#013927",
          tabBarInactiveTintColor: "#A8D5BA",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#FFFFFF",
            height: 70,
          },
        }}
      >
        <Tabs.Screen
          name="accueil"
          options={{
            title: "Accueil",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Accueil"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="services"
          options={{
            title: "Services",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.services}
                color={color}
                name="Services"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="alimentation"
          options={{
            title: "Alimentation",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.alimentation}
                color={color}
                name="Alimentation"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: "Messages",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.messages}
                color={color}
                name="Messages"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="compte"
          options={{
            title: "Compte",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.compte}
                color={color}
                name="Compte"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      <Loader isLoading={loading} />
      <StatusBar style="light" />
    </>
  );
};

export default TabLayout;
