import styled from "styled-components";
import colors from "../styles/colors";
import { useState, useEffect } from "react";
import SelectButton from "../components/SelectForm/SelectButton";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import TextHeader from "../components/common/TextHeader";
import { useLocale } from "../context/LanguageContext";
import axiosInstance from "../api/axiosInstance";
import Button from "../components/common/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 1rem 0 1rem;
  width: 100%;
`;

const AnswerWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 한 줄에 2개
  gap: 0.75rem;
  margin-top: 2rem;
`;

const SkinTestWrapper = styled.div`
  display: flex;
  margin-top: 3rem;
  font-size: 0.75rem;
  color: ${colors.mediumGrey};
  text-decoration: underline;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 2rem 1rem;
`;

export default function SettingSkinType() {
  const { t } = useLocale();
  const [selected, setSelected] = useState<string>("");
  const [memberInfo, setMemberInfo] = useState<{ skinType?: string }>();
  const [isChanged, setIsChanged] = useState(false);

  interface SkinTypeOption {
    id: number;
    option: string;
    value: string;
  }

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const response = await axiosInstance.get("/member");
      const result = response.data.result;
      setMemberInfo(result);
      setSelected(result.skinType);
    };
    fetchMemberInfo();
  }, []);

  useEffect(() => {
    if (memberInfo?.skinType) {
      setSelected(memberInfo.skinType);
    }
  }, [memberInfo]);

  console.log(memberInfo?.skinType);

  const goSave = () => {
    const editSkinType = async () => {
      try {
        await axiosInstance.patch("/member", {
          skinType: selected,
        });
        console.log("저장에 성공했습니다");
      } catch (error) {
        console.log("error", error);
      }
    };
    editSkinType();
    setIsChanged(false);
  };

  console.log(memberInfo);

  return (
    <>
      <Header />
      <TextHeader pageName={t.mypage.skinType.pageTitle} />
      <Wrapper>
        <AnswerWrapper>
          {t.mypage.skinType.options.map((item: SkinTypeOption) => (
            <SelectButton
              key={item.id}
              size="large"
              buttonName={item.option}
              isActivated={selected === item.value}
              onClick={() => {
                setSelected(item.value);
                setIsChanged(item.value !== memberInfo?.skinType);
              }}
            />
          ))}
        </AnswerWrapper>
        <SkinTestWrapper>
          <Link to="">
            {t.mypage.skinType.goTest}
            <SkinTestWrapper></SkinTestWrapper>
          </Link>
        </SkinTestWrapper>
      </Wrapper>
      <ButtonWrapper onClick={goSave}>
        <Button label={t.save} disabled={!isChanged} />
      </ButtonWrapper>
    </>
  );
}
