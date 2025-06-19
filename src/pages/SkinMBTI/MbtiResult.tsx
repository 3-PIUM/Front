import { useLocation, useNavigate } from "react-router-dom";
import TextHeader from "../../components/common/TextHeader";
import { styled } from "styled-components";
import { useEffect, useState, useMemo } from "react";
import axiosInstance from "../../api/axiosInstance";
import MBTIResultKO from "../../data/MBTILanguage/KoMBTI.json";
import MBTIResultEN from "../../data/MBTILanguage/EnMBTI.json";
import MBTIResultJP from "../../data/MBTILanguage/JpMBTI.json";
import Button from "../../components/common/Button";
import colors from "../../styles/colors";
import MBTIDescription from "../../components/Survey/MBTIDescription";
import { useLocale } from "../../context/LanguageContext";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to bottom right, #ffb199, #ebd7f5),
    linear-gradient(to top right, #ffd3ad, #fbd6e5);
  background-blend-mode: lighten;
  padding-top: 44px;
  height: 100vh;
`;

const HeaderWrapper = styled.div`
  padding-top: 44px;
  position: fixed;
  top: 0;
  left: 0;
  height: 44px;
  width: 100%;
  z-index: 999;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 1rem 2rem 1rem;
  max-height: calc(100vh - 120px);
  flex: 1;
  overflow-y: auto;
  margin-top: 3rem;
  margin-bottom: 6rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
`;

const CharacterWrapper = styled.div`
  display: flex;
  margin-top: 3rem;
`;

const CItem = styled.img`
  display: flex;
  width: 25%;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 2rem 1rem;
`;

const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 1rem;
`;

const Keyword = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.9rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Circle = styled.div`
  display: flex;
  border-radius: 1rem;
  background-color: ${colors.white};
  padding: 0.4rem;
  color: ${colors.mainPink};
  text-align: center;
`;

const ResultDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  text-align: center;
  line-height: 1.4rem;
  font-size: 0.9rem;
`;

const PersonalDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

export default function MbtiResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { moisture, pigment, reactivity, skinType } = location.state || {};
  const [getSkin, setGetSkin] = useState<string>("");
  const { t } = useLocale();

  // 1) skinType이 없을 때 서버 값(getSkin)을 가져온다
  useEffect(() => {
    if (!skinType) {
      axiosInstance.get("/member").then((res) => {
        setGetSkin(res.data.result.skinType);
      });
    }
  }, [skinType]);

  // 2) 파생된 피부타입 글자(A/N/O)는 계산으로만 얻기
  const derivedSkin =
    skinType === "건성"
      ? "A"
      : skinType === "복합성"
      ? "N"
      : skinType === "지성"
      ? "O"
      : getSkin === "건성"
      ? "A"
      : getSkin === "복합성"
      ? "N"
      : "O";

  const language = localStorage.getItem("language");
  const MBTIResults =
    language === "English"
      ? MBTIResultEN
      : language === "日本語"
      ? MBTIResultJP
      : MBTIResultKO;

  // 4) 최종 MBTI 코드
  const mbti = `${derivedSkin}${pigment}${moisture}${reactivity}`;
  const finalResult = MBTIResults.mbti.find((item) => item.code === mbti);

  console.log(derivedSkin);
  console.log(mbti);

  const skinKey = mbti[0] as "A" | "N" | "O";
  const skinInfo = MBTIResults.skinTypes[skinKey];
  const pigKey = mbti[1] as "B" | "E";
  const pigInfo = MBTIResults.pigment[pigKey];
  const moiKey = mbti[2] as "F" | "S";
  const moiInfo = MBTIResults.moisture[moiKey];
  const reactKey = mbti[3] as "R" | "W";
  const reactInfo = MBTIResults.Reactivity[reactKey];

  console.log(skinKey);

  console.log(skinInfo);

  // 5) 회원 정보 업데이트
  useEffect(() => {
    const updateMember = async () => {
      try {
        const data = {
          ...(skinType !== null && { skinType }),
          pigmentType: pigment,
          moistureType: moisture,
          reactivityType: reactivity,
        };
        await axiosInstance.patch("/member", data);
      } catch (error) {
        console.error("회원 정보 업데이트 실패", error);
      }
    };

    updateMember();

    // 배경 설정
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
    <>
      <Wrap>
        <HeaderWrapper>
          <TextHeader
            pageName={t.mbti.mbtiResult}
            bgColor="linear-gradient(to bottom right, #ffb199, #ebd7f5), linear-gradient(to top right, #ffd3ad, #fbd6e5)"
          />
        </HeaderWrapper>

        <ContentWrapper>
          <Title>{t.mbti.resultTitle}</Title>
          <CharacterWrapper>
            <CItem src={`/images/MBTICharacters/${skinKey}.png`} />
            <CItem src={`/images/MBTICharacters/${pigKey}.png`} />
            <CItem src={`/images/MBTICharacters/${moiKey}.png`} />
            <CItem src={`/images/MBTICharacters/${reactKey}.png`} />
          </CharacterWrapper>
          <ResultContent>
            <Keyword>
              <Circle>{finalResult?.title.blue}</Circle>
              <Circle>{finalResult?.title.purple}</Circle>
              <Circle>{finalResult?.title.green}</Circle>
              <Circle>{finalResult?.title.yellow}</Circle>
            </Keyword>
            <ResultDescription>
              <div>{finalResult?.description}</div>
            </ResultDescription>
          </ResultContent>
          <PersonalDescription>
            <MBTIDescription
              typeKey={skinKey}
              label={skinInfo.label}
              features={skinInfo.features}
              tips={skinInfo.tips}
            />
            <MBTIDescription
              typeKey={pigKey}
              label={pigInfo.label}
              features={pigInfo.features}
              tips={pigInfo.tips}
            />
            <MBTIDescription
              typeKey={moiKey}
              label={moiInfo.label}
              features={moiInfo.features}
              tips={moiInfo.tips}
            />
            <MBTIDescription
              typeKey={reactKey}
              label={reactInfo.label}
              features={reactInfo.features}
              tips={reactInfo.tips}
            />
          </PersonalDescription>
        </ContentWrapper>
      </Wrap>
      <ButtonWrapper>
        <Button
          label={t.mbti.goHome}
          onClick={() => {
            navigate("/home");
          }}
        />
      </ButtonWrapper>
    </>
  );
}
