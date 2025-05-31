import styled from "styled-components";
import LogoHeader from "../components/LogoHeader";
import colors from "../styles/colors";
import OilySkin from "../assets/images/SkinType/oily.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PersonalInfo = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f0e8ba;
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  justify-content: space-between;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 500;
  padding: 1rem 0;
`;

const UserSkin = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.125rem;
`;

const SkinType = styled.div`
  display: flex;
`;

const Highlight = styled.div`
  color: ${colors.mainPink};
`;

const RecommendInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecommendTitle = styled.div`
  display: flex;
  font-size: 0.875rem;
`;

const Ingredients = styled.div`
  display: flex;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${colors.mainPink};
`;

const CharacterBox = styled.div`
  display: flex;
`;

const CharacterImg = styled.img`
  width: 10rem;
`;

const RecommandListWrap = styled.div``;

export default function Home() {
  const nickname = "겸손한 치타";
  const skinType = "지성";

  return (
    <Wrapper>
      <LogoHeader />
      <PersonalInfo>
        <TextInfo>
          <UserSkin>
            <div>{nickname}님은</div>
            <SkinType>
              <Highlight>{skinType} 피부</Highlight> 입니다
            </SkinType>
          </UserSkin>
          <RecommendInfo>
            <RecommendTitle>추천 성분</RecommendTitle>
            <Ingredients>히알루론산, 글리세린</Ingredients>
          </RecommendInfo>
        </TextInfo>
        <CharacterBox>
          <CharacterImg src={OilySkin} alt="지성 피부" />
        </CharacterBox>
      </PersonalInfo>
      <RecommandListWrap></RecommandListWrap>
    </Wrapper>
  );
}
