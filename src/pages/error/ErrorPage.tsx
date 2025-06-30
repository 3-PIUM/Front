import styled from "styled-components";
import { useLocale } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  text-align: center;
  padding: 0 1rem;
  background: linear-gradient(to bottom, #ffe4f1, #ffffff);
`;

const ErrorImage = styled.img`
  max-width: 300px;
  margin-bottom: 1rem;
  margin-top: 2rem;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const HomeButton = styled.button`
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background-color: #e91e63;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ErrorPage = () => {
  const { t } = useLocale();
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <Container>
      <ErrorImage src="/images/error.png" alt="404 Not Found" />
      <Title>{t.error}</Title>
      <HomeButton onClick={handleGoHome}>{t.mbti.goHome}</HomeButton>
    </Container>
  );
};

export default ErrorPage;
