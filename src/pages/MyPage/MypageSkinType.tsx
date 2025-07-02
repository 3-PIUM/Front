import styled from "styled-components";
import colors from "../../styles/colors";
import { useState, useEffect } from "react";
import SelectButton from "../../components/SelectForm/SelectButton";
import { useNavigate } from "react-router-dom";
import TextHeader from "../../components/common/TextHeader";
import { useLocale } from "../../context/LanguageContext";
import axiosInstance from "../../api/axiosInstance";
import Button from "../../components/common/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4.5rem 1rem 0 1rem;
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

export default function SettingSkinType() {
  const { t } = useLocale();
  const [selected, setSelected] = useState<string>("");
  const [memberInfo, setMemberInfo] = useState<{ skinType?: string }>();
  const [isChanged, setIsChanged] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  interface SkinTypeOption {
    id: number;
    option: string;
    value: string;
  }

  useEffect(() => {
    const stored = sessionStorage.getItem("memberInfo");
    if (stored) {
      const parsed = JSON.parse(stored);
      setMemberInfo(parsed);
      setSelected(parsed.skinType);
    }
  }, []);

  const goSave = () => {
    const editSkinType = async () => {
      try {
        await axiosInstance.patch("/member", {
          skinType: selected,
        });
        setShowModal(true);
        const stored = sessionStorage.getItem("memberInfo");
        if (stored) {
          const updated = JSON.parse(stored);
          updated.skinType = selected;
          sessionStorage.setItem("memberInfo", JSON.stringify(updated));
          setMemberInfo(updated);
        }
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
      </Wrapper>
      <ButtonWrapper onClick={goSave}>
        <Button label={t.save} disabled={!isChanged} />
      </ButtonWrapper>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <div>{t.mypage.updateSuccess}</div>
            <ModalButton onClick={() => navigate("/mypage")}>
              {" "}
              {t.welcome.btn}
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
