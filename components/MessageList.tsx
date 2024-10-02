// components/
import React from "react";
import { View } from "react-native";
import { useGlobalContext } from "../context/GlobalProvider";
import MessageCard from "./MessageCard";

const MessageList = () => {
  const { user } = useGlobalContext();

  const messages = [
    {
      text: "Je suis le message",
      avatar: user?.avatar,
      user: user?.firstName,
      link: "messages/user",
    },
    {
      text: "Je suis le message",
      avatar: user?.avatar,
      user: user?.firstName,
      link: "messages/user",
    },
    {
      text: "Je suis le message",
      avatar: user?.avatar,
      user: user?.firstName,
      link: "messages/user",
    },
    {
      text: "Je suis le message",
      avatar: user?.avatar,
      user: user?.firstName,
      link: "messages/user",
    },
  ];
  return (
    <View className="flex flex-col mt-2.5">
      {messages.map((message, index) => (
        <MessageCard
          key={index}
          text={message.text}
          avatar={message.avatar}
          user={message.user}
          link={message.link}
          otherStyles="mt-4"
        />
      ))}
    </View>
  );
};

export default MessageList;
