import styled from "styled-components";
import colors from "../../styles/colors";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import { useLocale } from "../../context/LanguageContext";

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
  margin-top: 8rem;
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

export default function Welcome() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  const { t } = useLocale();

  return (
    <>
      <Wrap>
        <Header />
        <MainText>
          <HighLight>{t.welcome.text}</HighLight>
        </MainText>
        <ImageWrap>
          <Image
            src="/images/CharacterImg/welcomeImage.png"
            alt="환영하는 캐릭터 이미지"
          />
        </ImageWrap>
      </Wrap>
      <ButtonWrapper>
        <Button label={t.welcome.btn} onClick={goHome} />
      </ButtonWrapper>
    </>
  );
}
