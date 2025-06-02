import Header from "../components/Header";
import TextHeader from "../components/TextHeader";
import styled from "styled-components";
import mbtiCharacter from "../assets/images/testImage.png";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  background-image: linear-gradient(to bottom right, #ffb199, #ebd7f5),
    linear-gradient(to top right, #ffd3ad, #fbd6e5);
  background-blend-mode: lighten;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

const Character = styled.img`
  display: flex;
  width: 17.5rem;
`;

const Button = styled.div``;

export default function MbtiTest() {
  return (
    <Wrap>
      <Header />
      <TextHeader pageName="피부 MBTI 진단" />
      <Wrapper>
        <Title>
          <div>나의 피부 MBTI</div>
          <div>테스트하러 가기!</div>
        </Title>
        <Character src={mbtiCharacter} alt="mbti 캐릭터" />
        <Button>테스트하러 가기</Button>
      </Wrapper>
    </Wrap>
  );
}
