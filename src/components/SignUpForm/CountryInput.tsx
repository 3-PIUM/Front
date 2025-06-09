import styled from "styled-components";
import { useLocale } from "../../context/LanguageContext";
import dummyCountry from "../../data/dummyCountry.json";

const FieldName = styled.div`
  display: flex;
  font-size: 1rem;
`;

interface CountryProps {
  country: string | null;
  setCountry: (value: string | null) => void;
  countryText: string | null;
  setCountryText: (value: string | null) => void;
}

export default function CountryInput({
  country,
  setCountry,
  countryText,
  setCountryText,
}: CountryProps) {
  const { t, language } = useLocale();

  const selectedCountry = dummyCountry.find((c) => c.code == country);
  const selectedCountryName = selectedCountry
    ? selectedCountry.name[language as keyof typeof selectedCountry.name]
    : "";

  return (
    <>
      <FieldName>{t.signup.country} </FieldName>
      <select
        style={{
          height: "3rem",
          borderRadius: "1rem",
          fontSize: "1rem",
          padding: "0 1rem",
          appearance: "none",
          tabSize: "1",
        }}
        onChange={(e) => {
          setCountry(e.target.value);
        }}
        value={country || ""}
      >
        <option value="" disabled selected>
          {t.signup.countryPlaceholder}
        </option>
        {dummyCountry.map((country) => (
          <option key={country.code} value={country.code}>
            {country.flag}{" "}
            {
              country.name[
                language === "한국어"
                  ? "한국어"
                  : language === "日本語"
                  ? "日本語"
                  : "English"
              ]
            }
          </option>
        ))}
      </select>
    </>
  );
}
