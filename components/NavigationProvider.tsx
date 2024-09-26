// NavigationProvider.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "expo-router";

// Define the type for the context value
interface NavigationContextType {
  history: string[];
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
  canGoBack: boolean;
  isGoingBack: boolean;
  setIsGoingBack: React.Dispatch<React.SetStateAction<boolean>>; // Ajouter le setter ici
}

// Create the context with a default value
const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const [history, setHistory] = useState<string[]>([]);
  const [isGoingBack, setIsGoingBack] = useState<boolean>(false);
  const pathname = usePathname();

  const canGoBack = history.length > 1;

  useEffect(() => {
    setHistory((prevHistory) => [...prevHistory, pathname]);
    setIsGoingBack(false); // Réinitialiser à chaque nouvelle navigation
  }, [pathname]);

  return (
    <NavigationContext.Provider
      value={{ history, setHistory, canGoBack, isGoingBack, setIsGoingBack }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationHistory = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error(
      "useNavigationHistory must be used within a NavigationProvider"
    );
  }
  return context;
};
