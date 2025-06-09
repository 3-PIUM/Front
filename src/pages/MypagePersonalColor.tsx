import styled from "styled-components";
import Header from "../components/Header";
import TextHeader from "../components/TextHeader";
import PersonalColorButton from "../components/SelectForm/PersonalColorButton";
import { useEffect, useState } from "react";
import { useLocale } from "../context/LanguageContext";
import Button from "../components/Button";
import axiosInstance from "../api/axiosInstance";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 1rem 0 1rem;
  width: 100%;
`;

const AnswerWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 2rem;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 2rem 1rem;
`;

export default function SettingPersonalColor() {
  const { t } = useLocale();
  const [memberInfo, setMemberInfo] = useState<MemberInfo>();
  const [selected, setSelected] = useState<string>("");
  const [isChanged, setIsChanged] = useState(false);

  interface personalProps {
    id: number;
    option: string;
    value: string;
    colors: string[];
  }

  interface MemberInfo {
    personalType?: string;
  }

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const response = await axiosInstance.get("/member");
      const result = response.data.result;
      setMemberInfo(result);
      setSelected(result.personalType);
    };
    fetchMemberInfo();
  }, []);

  const goSave = () => {
    const savePersonalColor = async () => {
      try {
        await axiosInstance.patch("/member", {
          personalType: selected,
        });
      } catch (error) {
        console.log("error:", error);
      }
    };
    savePersonalColor();
    setIsChanged(false);
  };

  return (
    <>
      <Header />
      <TextHeader pageName={t.mypage.personalColor.pageTitle} />
      <Wrapper>
        <AnswerWrapper>
          {t.mypage.personalColor.options.map((item: personalProps) => (
            <PersonalColorButton
              key={item.id}
              buttonName={item.option}
              isActivated={selected === item.value}
              colors={item.colors}
              onClick={() => {
                setSelected(item.value);
                setIsChanged(item.value !== memberInfo?.personalType);
              }}
            />
          ))}
        </AnswerWrapper>
      </Wrapper>
      <ButtonWrapper>
        <Button label={t.save} onClick={goSave} disabled={!isChanged} />
      </ButtonWrapper>
    </>
  );
}
