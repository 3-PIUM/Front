import { useState } from "react";
import styled from "styled-components";
import TextHeader from "../../components/common/TextHeader";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useLocale } from "../../context/LanguageContext";
import Header from "../../components/common/Header";
import axiosInstance from "../../api/axiosInstance";

const PageWrapper = styled.div`
  padding: 4rem 1.2rem 8rem;
  background-color: #fff;
`;

const Question = styled.p`
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 16px;
  color: #222;
`;

const Radio = styled.input`
  accent-color: #e6005a;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 0.75rem;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  box-sizing: border-box;
  margin-top: -1rem;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Modal = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 2rem 1.5rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  z-index: 1000;
`;

const ModalTitle = styled.p`
  color: #e6005a;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const ModalDesc = styled.p`
  text-align: center;
  font-size: 14px;
  color: #444;
  line-height: 1.4;
  margin-bottom: 2rem;
`;

const ModalButton = styled(Button)`
  margin-top: 0;
`;

const CancelButton = styled.button`
  font-weight: 700;
  padding: 0.9rem;
  background-color: #fff;
  color: #222;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 1.25rem;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const FixedBottom = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 0;
  width: 100%;
  padding: 1rem;
  z-index: 100;
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export default function WithdrawalPage() {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useLocale();

  const handleWithdrawal = () => {
    if (!selectedReason) return alert(t.withdrawal.alert.selectReason);
    if (selectedReason === t.withdrawal.reasons.etc && !customReason.trim()) {
      return alert(t.withdrawal.alert.fillEtc);
    }
    setShowModal(true);
  };

  const confirmWithdrawal = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await axiosInstance.delete("/member", {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });

      console.log("탈퇴 성공", response.status);
      alert(t.withdrawal.alert.complete);
      sessionStorage.removeItem("accessToken");
      navigate("/");
    } catch (error) {
      console.error("탈퇴 실패", error);
      alert(t.withdrawal.alert.fail || "탈퇴 요청 중 오류가 발생했습니다.");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      <Header />
      <TextHeader pageName={t.withdrawal.pageTitle} />
      <PageWrapper>
        <Question>{t.withdrawal.question}</Question>
        <OptionList>
          {[
            t.withdrawal.reasons.noProduct,
            t.withdrawal.reasons.error,
            t.withdrawal.reasons.rejoin,
            t.withdrawal.reasons.etc,
          ].map((reason) => (
            <Option key={reason}>
              <Radio
                type="radio"
                name="reason"
                value={reason}
                checked={selectedReason === reason}
                onChange={(e) => setSelectedReason(e.target.value)}
              />
              {reason}
            </Option>
          ))}
          {selectedReason === t.withdrawal.reasons.etc && (
            <Textarea
              placeholder={t.withdrawal.textareaPlaceholder}
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
            />
          )}
        </OptionList>
      </PageWrapper>

      <FixedBottom>
        <Button label={t.withdrawal.submit} onClick={handleWithdrawal} />
      </FixedBottom>

      {showModal && (
        <>
          <Overlay onClick={() => setShowModal(false)} />
          <Modal>
            <ModalTitle>{t.withdrawal.modal.title}</ModalTitle>
            <ModalDesc>{t.withdrawal.modal.desc}</ModalDesc>
            <ButtonBox>
              <ModalButton
                label={t.withdrawal.submit}
                onClick={confirmWithdrawal}
              />
              <CancelButton onClick={() => setShowModal(false)}>
                {t.withdrawal.modal.cancel}
              </CancelButton>
            </ButtonBox>
          </Modal>
        </>
      )}
    </>
  );
}
