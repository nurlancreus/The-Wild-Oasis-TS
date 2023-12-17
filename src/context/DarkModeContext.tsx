import { ReactNode, createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";

interface IDarkModeContext {
  isDarkModeOn: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<IDarkModeContext | null>(null);

type DarkModeContextProviderProps = {
  children: ReactNode;
};

function DarkModeProvider({ children }: DarkModeContextProviderProps) {
  const [isDarkModeOn, setIsDarkModeOn] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkModeOn"
  );

  useEffect(() => {
    const rootEl = document.documentElement;

    if (isDarkModeOn) rootEl.className = "dark-mode";
    if (!isDarkModeOn) rootEl.className = "light-mode";
  }, [isDarkModeOn]);

  const toggleDarkMode = () => {
    setIsDarkModeOn((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkModeOn, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDarkModeContext = () => {
  const contextValue = useContext(DarkModeContext);

  if (contextValue == null)
    throw new Error("Component is outside of the provider");

  return contextValue;
};

export default DarkModeProvider;
