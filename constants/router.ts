import { usePathname } from "expo-router";

export const getRedirectPath = (): string | null => {
  const pathname = usePathname();

  if (pathname.startsWith("/settings") && pathname.split("/").length > 2) {
    return "/compte";
  }

  if (pathname.startsWith("/services") && pathname.split("/").length > 2) {
    return "/services";
  }

  return null;
};
