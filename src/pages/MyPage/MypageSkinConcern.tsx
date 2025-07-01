import styled from "styled-components";
import SelectButton from "../../components/SelectForm/SelectButton";
import { useEffect, useState } from "react";
import TextHeader from "../../components/common/TextHeader";
import { useLocale } from "../../context/LanguageContext";
import axiosInstance from "../../api/axiosInstance";
import colors from "../../styles/colors";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  padding: 4.5rem 1rem 0 1rem;
  width: 100%;
  padding-right: 1rem;
`;

const AnswerWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

export default function SettingSkinConcern() {
  const { t } = useLocale();
  const [selected, setSelected] = useState<number[]>([]);
  const [memberInfo, setMemberInfo] = useState<any>(null);
  const [isChanged, setIsChanged] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("memberInfo");
    if (stored) {
      const parsed = JSON.parse(stored);
      setMemberInfo(parsed);
      setSelected(parsed.skinIssue);
    }
  }, []);

  const goSave = () => {
    const saveSkinConcern = async () => {
      try {
        await axiosInstance.patch("/member", {
          skinIssue: selected,
        });
        console.log("보낸 값", selected);

        const stored = sessionStorage.getItem("memberInfo");
        if (stored) {
          const updated = JSON.parse(stored);
          updated.skinIssue = selected;
          sessionStorage.setItem("memberInfo", JSON.stringify(updated));
          setMemberInfo(updated);
        }
        setShowModal(true);
      } catch (error) {
        setShowModal(false);
        console.log("error:", error);
      }
    };
    saveSkinConcern();
    setIsChanged(false);
  };

  console.log(selected);

  useEffect(() => {
    if (!memberInfo) return;
    const original = memberInfo.skinIssue ?? [];
    const changed = selected;

    const isSame =
      original.length === changed.length &&
      original.every((val: number) => changed.includes(val));

    setIsChanged(!isSame);
    console.log(selected);
  }, [selected, memberInfo]);

  console.log(memberInfo);

  const toggleSelection = (id: number) => {
    if (selected?.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  interface ItemProps {
    id: number;
    name: string;
    value: string;
  }

  return (
    <>
      <TextHeader pageName={t.mypage.skinConcerns} />
      <Wrapper>
        <AnswerWrapper>
          {t.mypage.skinConcernsItem.map((item: ItemProps) => (
            <SelectButton
              key={item.id}
              buttonName={item.name}
              size="small"
              isActivated={selected.includes(item.id)}
              onClick={() => toggleSelection(item.id)}
            />
          ))}
        </AnswerWrapper>
      </Wrapper>
      <ButtonWrapper>
        <Button
          label={t.save}
          onClick={() => {
            goSave();
          }}
          disabled={!isChanged}
        />
      </ButtonWrapper>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <div>{t.mypage.updateSuccess}</div>
            <ModalButton
              onClick={() => {
                navigate("/mypage");
                setShowModal(false);
              }}
            >
              {t.welcome.btn}
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
