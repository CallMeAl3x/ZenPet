import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Loader } from "../../components";

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext() as {
    loading: boolean;
    isLogged: boolean;
  };

  if (!loading && isLogged) return <Redirect href="/alimentation" />;

  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <Loader isLoading={loading} />
      <StatusBar style="light" />
    </>
  );
};

export default AuthLayout;
