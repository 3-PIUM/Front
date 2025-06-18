import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../styles/colors";
import Oily from "../../assets/images/SkinType/oily.png";
import Combination from "../../assets/images/SkinType/combination.png";
import Dry from "../../assets/images/SkinType/dry.png";
import Button from "../../components/common/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.div`
  height: 2.75rem;
  color: ${colors.black};
  font-size: 1.125rem;
  font-weight: 700;
  color: ${colors.black};
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8rem;
`;

const ResultImg = styled.img`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResultText = styled.span`
  display: flex;
  margin-top: 2rem;
  font-size: 1.2rem;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 2rem 1rem;
`;

export default function SkinTypeResult() {
  const location = useLocation();
  const result = location.state?.result;

  const lang = localStorage.getItem("language");
  const navigate = useNavigate();

  console.log(result); // "건성", "지성" 등

  return (
    <>
      <Wrapper>
        <header />
        <HeaderText>피부 타입 결과</HeaderText>
        <ImgWrapper>
          {result === "건성" ? (
            <ResultImg src={Dry} alt="건성 피부" />
          ) : result === "지성" ? (
            <ResultImg src={Oily} alt="지성 피부" />
          ) : result === "복합성" ? (
            <ResultImg src={Combination} alt="복합성 피부" />
          ) : null}
        </ImgWrapper>
        <TextWrapper>
          {lang === "한국어" ? (
            <ResultText>
              당신의 피부 타입은&nbsp;
              <span style={{ fontWeight: 700, color: colors.mainPink }}>
                {result}
              </span>
              입니다!
            </ResultText>
          ) : lang === "English" ? (
            <ResultText>
              Your skin type is&nbsp;
              <div style={{ fontWeight: 700, color: colors.mainPink }}>
                {result}
              </div>
            </ResultText>
          ) : (
            <ResultText>
              あなたの肌タイプは
              <div style={{ fontWeight: 700, color: colors.mainPink }}>
                {result}
              </div>
              です
            </ResultText>
          )}
        </TextWrapper>
      </Wrapper>
      <ButtonWrapper>
        <Button label="설문지로 돌아가기" onClick={() => navigate("/survey")} />
      </ButtonWrapper>
    </>
  );
}
