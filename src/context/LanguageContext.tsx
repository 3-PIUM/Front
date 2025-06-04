import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import kr from "../data/language/kr.json";
import en from "../data/language/en.json";
import jp from "../data/language/jp.json";

const resources: Record<string, any> = {
  한국어: kr,
  English: en,
  日本語: jp,
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<string>(() => {
    const stored = localStorage.getItem("language");
    return stored ? JSON.parse(stored) : "한국어";
  });

  const t = resources[language] || kr;

  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(language));
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLocale must be used within a LanguageProvider");
  return context;
}
