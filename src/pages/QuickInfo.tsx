import WelcomeImage from "../assets/images/welcomeImage.png";
import styled from "styled-components";
import colors from "../styles/colors";
import Button from "../components/Button";

const Wrap = styled.div`
  padding: 0 1rem;
`;

const Header = styled.div`
  align-items: end;
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
  margin-top: auto;
`;

export default function QuickInfo() {
  const nickname = "겸손한 치타";

  return (
    <>
      <Wrap>
        <Header>
          <SkipText>건너뛰기</SkipText>
        </Header>
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
        <ButtonWrapper>
          <Button label="정보 등록하러 가기" />
        </ButtonWrapper>
      </Wrap>
    </>
  );
}
