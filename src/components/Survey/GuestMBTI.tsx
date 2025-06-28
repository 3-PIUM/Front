import { styled } from "styled-components";
import { useLocale } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
`;

const Character = styled.img`
  display: flex;
  width: 17.5rem;
`;

const Button = styled.button`
  display: flex;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  border: 1px solid black;
  font-weight: 700;
  background-color: #a6ff83;
`;

export default function GuestMBTI() {
  const { t } = useLocale();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Title>
        <div>{t.mbti.guestTitle.prefix}</div>
        <div>{t.mbti.guestTitle.suffix}</div>
      </Title>
      <Character src="images/CharacterImg/testImage.png" alt="mbti 캐릭터" />
      <Button onClick={() => navigate("/mbti/question")}>
        {t.mypage.goLogin}
      </Button>
    </Wrapper>
  );
}
