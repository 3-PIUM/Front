import styled from "styled-components";
import { useLocale } from "../../context/LanguageContext";
import dummyCountry from "../../data/dummyCountry.json";
import colors from "../../styles/colors";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonInputWrap = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;

const FieldName = styled.div`
  display: flex;
  font-size: 1rem;
`;

const ErrorText = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
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

  return (
    <Wrapper>
      <FieldName>{t.signup.country} </FieldName>
      <ButtonInputWrap>
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
            setCountryText("");
          }}
          value={country || ""}
        >
          <option value="" disabled>
            {t.signup.countryPlaceholder}
          </option>
          {dummyCountry.map((country) => (
            <option key={country.code} value={country.code}>
              {country.flag}
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
        {countryText && (
          <ErrorText style={{ color: colors.mainPink }}>
            {countryText}
          </ErrorText>
        )}
      </ButtonInputWrap>
    </Wrapper>
  );
}
