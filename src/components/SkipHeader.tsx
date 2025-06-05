import styled from "styled-components";
import colors from "../styles/colors";
import { useNavigate } from "react-router-dom";
import { useLocale } from "../context/LanguageContext";
import axios from "axios";

const SkipWrapper = styled.div`
  align-items: end;
  width: 100%;
  height: 2rem;
  font-size: 0.875rem;
  color: ${colors.darkGrey};
`;

const SkipText = styled.div`
  display: flex;
  justify-content: end;
  font-weight: 700;
`;

export default function SkipHeader() {
  const { t } = useLocale();
  const navigate = useNavigate();

  const storedDataString = sessionStorage.getItem("signupData");
  if (!storedDataString) return;
  const storedData = JSON.parse(storedDataString);
  console.log(storedData);

  const handleSkip = async () => {
    try {
      const response = await axios.post("http://localhost:8080/member/join", {
        nickname: storedData.nickname,
        birth: storedData.birth,
        email: storedData.email,
        password: storedData.password,
        gender: storedData.gender,
        area: storedData.area,
        language: storedData.lang,
        skinType: "",
        personalType: "",
      });
      console.log("성공");
      console.log(response);
      sessionStorage.removeItem("signupData");
      sessionStorage.removeItem("language");
      navigate("/");
    } catch {
      console.log("실패");
    }
  };

  return (
    <SkipWrapper>
      <SkipText onClick={handleSkip}>{t.aboutYou.skipBtn}</SkipText>
    </SkipWrapper>
  );
}
