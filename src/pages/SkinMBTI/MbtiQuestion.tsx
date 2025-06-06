import TextHeader from "../../components/TextHeader";
import styled from "styled-components";
import mbtiCharacter from "../../assets/images/testImage.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(to bottom right, #ffb199, #ebd7f5),
    linear-gradient(to top right, #ffd3ad, #fbd6e5);
  background-blend-mode: lighten;
  padding-top: 44px;
`;

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

export default function MbtiQuestion() {
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.getElementById("root");
    const originalBg = root?.style.backgroundColor;
    const originalTop = root?.style.paddingTop;
    const originalBottom = root?.style.paddingBottom;

    if (root) {
      root.style.backgroundColor = "transparent";
      root.style.paddingTop = "0";
      root.style.paddingBottom = "0";
    }

    return () => {
      if (root) {
        root.style.backgroundColor = originalBg || "";
        root.style.paddingTop = originalTop || "";
        root.style.paddingBottom = originalBottom || "";
      }
    };
  }, []);

  return (
    <Wrap>
      <TextHeader pageName="피부 MBTI 진단" bgColor="transparent" />
      <Wrapper></Wrapper>
    </Wrap>
  );
}
