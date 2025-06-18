import { useLocation, useNavigate } from "react-router-dom";
import TextHeader from "../../components/common/TextHeader";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import A from "../../assets/images/MBTICharacters/A.png";
import B from "../../assets/images/MBTICharacters/B.png";
import E from "../../assets/images/MBTICharacters/E.png";
import F from "../../assets/images/MBTICharacters/F.png";
import N from "../../assets/images/MBTICharacters/N.png";
import O from "../../assets/images/MBTICharacters/O.png";
import S from "../../assets/images/MBTICharacters/S.png";
import W from "../../assets/images/MBTICharacters/W.png";
import R from "../../assets/images/MBTICharacters/R.png";

import Button from "../../components/common/Button";

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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
`;

const CharacterWrapper = styled.div`
  display: flex;
  padding: 0 1rem;
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

export default function MbtiResult() {
  const location = useLocation();
  const { moisture, pigment, reactivity, skinType } = location.state || {};
  const final = `${skinType}${pigment}${moisture}${reactivity}`;
  const navigate = useNavigate();
  const [getSkin, setGetSkin] = useState<string>("");

  useEffect(() => {
    if (skinType === null) {
      const fetchGetMember = async () => {
        try {
          const response = await axiosInstance.get("/member");
          setGetSkin(response.data.result.skinType);
        } catch {}
      };
      fetchGetMember();
    }

    const fetchUpdateMember = async () => {
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

    fetchUpdateMember(); // 비동기 함수 호출

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

  console.log("location.state", location.state);
  console.log(skinType, pigment, moisture, reactivity);
  console.log("final", final);
  console.log(getSkin);

  let firstCharImage = null;

  if (final[0] != null) {
    if (final[0] === "O") {
      firstCharImage = <CItem src={O} />;
    } else if (final[0] === "N") {
      firstCharImage = <CItem src={N} />;
    } else {
      firstCharImage = <CItem src={A} />;
    }
  } else {
    if (getSkin === "복합성") {
      firstCharImage = <CItem src={N} />;
    } else if (getSkin === "건성") {
      firstCharImage = <CItem src={A} />;
    } else {
      firstCharImage = <CItem src={O} />;
    }
  }

  return (
    <>
      <Wrap>
        <TextHeader pageName="MBTI 결과" bgColor="transparent" />
        <ContentWrapper>
          <Title>당신의 MBTI는?</Title>
          <CharacterWrapper>
            {firstCharImage}
            {pigment === "B" ? <CItem src={B} /> : <CItem src={E} />}
            {moisture === "F" ? <CItem src={F} /> : <CItem src={S} />}
            {reactivity === "W" ? <CItem src={W} /> : <CItem src={R} />}
          </CharacterWrapper>

          <div>{final}</div>
        </ContentWrapper>
      </Wrap>
      <ButtonWrapper>
        <Button
          label="홈으로 돌아가기"
          onClick={() => {
            navigate("/home");
          }}
        />
      </ButtonWrapper>
    </>
  );
}
