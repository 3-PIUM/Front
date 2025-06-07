import WelcomeImage from "../../assets/images/surveyImage.png";
import styled from "styled-components";
import colors from "../../styles/colors";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useLocale } from "../../context/LanguageContext";
import SkipHeader from "../../components/Survey/SkipHeader";

const Wrap = styled.div`
  padding: 0 1rem;
`;

const MainText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
`;

const SubText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  color: ${colors.mediumGrey};
  justify-content: center;
  align-items: center;
  margin-top: 0.625rem;
`;

const Text = styled.div`
  display: flex;
  text-align: center;
`;

const HighLight = styled.div`
  color: ${colors.mainPink};
`;

const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4.75rem;
`;

const Image = styled.img`
  width: 17.5rem;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  width: 100%;
  padding: 2rem 1rem;
  bottom: 0;
`;

export default function QuickInfo() {
  const navigate = useNavigate();

  const { t, language } = useLocale();

  const storedDataString = sessionStorage.getItem("signupData");
  if (!storedDataString) return;
  const storedData = JSON.parse(storedDataString);

  const renderTitleLine = (
    line: { prefix: string; highlight: string; suffix: string },
    key: string
  ) => {
    return (
      <Text key={key}>
        {line.prefix}
        {line.highlight && language === "en" ? " " : null}
        {line.highlight ? <HighLight>{storedData.nickname}</HighLight> : null}
        {line.suffix && language === "en" ? " " : null}
        {line.suffix}
      </Text>
    );
  };

  const goSurvey = () => {
    navigate("/survey");
  };

  return (
    <>
      <Wrap>
        <Header />
        <SkipHeader />
        <MainText>
          {renderTitleLine(t.aboutYou.mainTitle.line1, "line1")}
          {t.aboutYou.mainTitle.line2 &&
            renderTitleLine(t.aboutYou.mainTitle.line2, "line2")}
        </MainText>
        <SubText>
          {t.aboutYou.subTitle.map((text: string, index: number) => (
            <Text key={index}>{text}</Text>
          ))}
        </SubText>
        <ImageWrap>
          <Image src={WelcomeImage} alt="환영하는 캐릭터 이미지" />
        </ImageWrap>
      </Wrap>
      <ButtonWrapper>
        <Button label={t.aboutYou.btn} onClick={goSurvey} />
      </ButtonWrapper>
    </>
  );
}
