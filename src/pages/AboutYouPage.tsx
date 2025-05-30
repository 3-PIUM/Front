import WelcomeImage from "../assets/images/surveyImage.png";
import styled from "styled-components";
import colors from "../styles/colors";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Wrap = styled.div`
  padding: 0 1rem;
`;

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
  const nickname = "겸손한 치타";
  const navigate = useNavigate();

  const goSurvey = () => {
    navigate("/survey");
  };

  return (
    <>
      <Wrap>
        <Header />
        <SkipWrapper>
          <Link to="/welcome">
            <SkipText>건너뛰기</SkipText>
          </Link>
        </SkipWrapper>
        <MainText>
          <Text>
            <HighLight>{nickname}</HighLight>님에
          </Text>
          <Text>대해 알려주세요!</Text>
        </MainText>
        <SubText>
          <Text>몇 가지 정보만 등록하면 맞춤 추천이 시작돼요.</Text>
          <Text>내 피부에 꼭 맞는 뷰티템을 알려드릴게요.</Text>
        </SubText>
        <ImageWrap>
          <Image src={WelcomeImage} alt="환영하는 캐릭터 이미지" />
        </ImageWrap>
      </Wrap>
      <ButtonWrapper>
        <Button label="정보 등록하러 가기" onClick={goSurvey} />
      </ButtonWrapper>
    </>
  );
}
