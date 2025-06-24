import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #ffe7f0;
  padding: 2rem 1rem;
  border-radius: 24px;
  text-align: center;
`;

const FlowerImg = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 15px;
  color: #e6005a;
  margin-bottom: 1.2rem;
  line-height: 1.4;
  font-weight: 500;
`;

const RegisterButton = styled.button`
  background-color: #ff4081;
  color: #fff;
  padding: 0.8rem 1.6rem;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 999px;
  cursor: pointer;
`;

export default function SkinTypePrompt({
  onRegister,
}: {
  onRegister: () => void;
}) {
  return (
    <Wrapper>
      <FlowerImg src="images/CharacterImg/surveyImage.png" alt="bot" />
      <Text>
        지금 피부 타입을 등록하고
        <br />
        맞춤 추천을 받아보세요!
      </Text>
      <RegisterButton onClick={onRegister}>피부 타입 등록하기</RegisterButton>
    </Wrapper>
  );
}
