import { styled } from "styled-components";
import { useLocale } from "../context/LanguageContext";
import colors from "../styles/colors";

const Wrapper = styled.div`
  height: 88vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CharacterImg = styled.img`
  display: flex;
  width: 40%;
`;

const LoadingText = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.mainPink};

  &::after {
    content: ".";
    animation: dots 1.2s steps(4, end) infinite;
  }

  @keyframes dots {
    0% {
      content: "";
    }
    25% {
      content: ".";
    }
    50% {
      content: "..";
    }
    75% {
      content: "...";
    }
    100% {
      content: "";
    }
  }
`;

export default function Loading() {
  const { t } = useLocale();
  return (
    <Wrapper>
      <CharacterImg src="/images/CharacterImg/loadingImage.png" />
      <LoadingText>{t.loading}</LoadingText>
    </Wrapper>
  );
}
