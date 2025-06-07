import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import KR from "../data/language/kr.json";
import EN from "../data/language/en.json";
import JP from "../data/language/jp.json";

const resources: Record<string, any> = {
  한국어: KR,
  English: EN,
  日本語: JP,
};

const languageCodeMap: Record<string, "KR" | "EN" | "JP"> = {
  한국어: "KR",
  English: "EN",
  日本語: "JP",
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: any;
  languageCode: "KR" | "EN" | "JP";
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // const [language, setLanguage] = useState<string>(() => {
  //   const stored = localStorage.getItem("language");
  //   return stored ? JSON.parse(stored) : "한국어";
  // });

  const [language, setLanguage] = useState<string>(() => {
    try {
      const stored = localStorage.getItem("language");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          parsed === "한국어" ||
          parsed === "English" ||
          parsed === "日本語"
        ) {
          return parsed;
        }
      }
    } catch {}
    return "한국어";
  });

  const t = resources[language] || KR;
  const languageCode = languageCodeMap[language] || "KR";

  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(language));
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, languageCode }}
    >
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
