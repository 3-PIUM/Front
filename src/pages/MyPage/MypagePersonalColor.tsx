import styled from "styled-components";
import Header from "../../components/common/Header";
import TextHeader from "../../components/common/TextHeader";
import PersonalColorButton from "../../components/SelectForm/PersonalColorButton";
import { useEffect, useState } from "react";
import { useLocale } from "../../context/LanguageContext";
import Button from "../../components/common/Button";
import axiosInstance from "../../api/axiosInstance";
import colors from "../../styles/colors";
import { useNavigate } from "react-router-dom";

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

const ModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: ${colors.white};
  opacity: 1;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  width: 100%;
  margin: 1rem;
  padding: 3rem 1rem;
  text-align: center;
  border-radius: 1rem;
`;

const ModalButton = styled.button`
  padding: 1rem;
  font-size: 0.825rem;
  background-color: ${colors.mainPink};
  color: ${colors.white};
  border: none;
  border-radius: 3rem;
`;

export default function SettingPersonalColor() {
  const { t } = useLocale();
  const [memberInfo, setMemberInfo] = useState<MemberInfo>();
  const [selected, setSelected] = useState<string>("");
  const [isChanged, setIsChanged] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  interface personalProps {
    id: number;
    option: string;
    value: string;
    colors: string[];
  }

  interface MemberInfo {
    personalType?: string;
  }

  // useEffect(() => {
  //   const fetchMemberInfo = async () => {
  //     const response = await axiosInstance.get("/member");
  //     const result = response.data.result;
  //     setMemberInfo(result);
  //     setSelected(result.personalType);
  //   };
  //   fetchMemberInfo();
  // }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("memberInfo");
    if (stored) {
      const parsed = JSON.parse(stored);
      setMemberInfo(parsed);
      setSelected(parsed.personalType || "");
    }
  }, []);

  const goSave = () => {
    const savePersonalColor = async () => {
      console.log("선택된 personalType:", selected);
      try {
        await axiosInstance.patch("/member", {
          personalType: selected,
        });

        const stored = sessionStorage.getItem("memberInfo");
        if (stored) {
          const updated = JSON.parse(stored);
          updated.personalType = selected;
          sessionStorage.setItem("memberInfo", JSON.stringify(updated));
          setMemberInfo(updated);
        }
        setShowModal(true);
      } catch (error) {
        console.log("error:", error);
      }
    };
    savePersonalColor();
    setIsChanged(false);
  };

  console.log("선택된 personalType:", selected);

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
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <div>정보가 성공적으로 수정되었습니다</div>
            <ModalButton onClick={() => navigate("/mypage")}>확인</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
