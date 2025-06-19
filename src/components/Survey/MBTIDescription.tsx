import styled from "styled-components";
import colors from "../../styles/colors";
import { useLocale } from "../../context/LanguageContext";

interface MBTIDescriptionProps {
  typeKey: string;
  label: string;
  features: string[];
  tips: string[];
}

const DescriptionItem = styled.div`
  margin: 1rem 0;
`;

const Alphabet = styled.div`
  display: flex;
  gap: 0.5rem;
  font-family: 700;
  font-size: 1.3rem;
  font-weight: 700;
  justify-content: center;
  color: ${colors.mainPink};
  padding: 1rem 0;
  border-bottom: 1px solid #f23477;
`;

const DescriptionText = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeatureAndTips = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 2rem;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  line-height: 1.2rem;
  background-color: ${colors.white};
  border-radius: 1rem;
  padding: 1rem;
  gap: 0.5rem;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  line-height: 1.2rem;
  background-color: ${colors.white};
  border-radius: 1rem;
  padding: 1rem;
  gap: 0.5rem;
`;

const ContentTitle = styled.div`
  display: flex;
  font-weight: 700;
  font-size: 1rem;
`;

const SubTitle = styled.div`
  display: flex;
  font-weight: 700;
  font-size: 1.1rem;
`;

export default function MBTIDescription({
  typeKey,
  label,
  features,
  tips,
}: MBTIDescriptionProps) {
  const { t } = useLocale();

  return (
    <>
      <DescriptionItem>
        <Alphabet>
          <SubTitle>{typeKey}</SubTitle>
          <SubTitle>{label}</SubTitle>
        </Alphabet>
        <DescriptionText>
          <FeatureAndTips>
            <Top>
              <ContentTitle>{t.mbti.feature}</ContentTitle>
              {features.map((item) => {
                return (
                  <>
                    <li key={item}>{item}</li>
                  </>
                );
              })}
            </Top>
            <Bottom>
              <ContentTitle>{t.mbti.tip}</ContentTitle>
              {tips.map((tip) => {
                return (
                  <>
                    <li key={tip}>{tip}</li>
                  </>
                );
              })}
            </Bottom>
          </FeatureAndTips>
        </DescriptionText>
      </DescriptionItem>
    </>
  );
}
