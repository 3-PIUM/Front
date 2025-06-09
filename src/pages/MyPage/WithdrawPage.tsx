import { useState } from "react";
import styled from "styled-components";
import TextHeader from "../../components/TextHeader";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

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

  const handleWithdrawal = () => {
    if (!selectedReason) return alert("탈퇴 사유를 선택해주세요");
    if (selectedReason === "기타" && !customReason.trim()) {
      return alert("기타 사유를 입력해주세요");
    }
    setShowModal(true);
  };

  const confirmWithdrawal = () => {
    setShowModal(false);
    alert("회원 탈퇴가 완료되었습니다.");
    // 예: localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <TextHeader pageName="회원 탈퇴" />
      <PageWrapper>
        <Question>탈퇴하시려는 이유를 선택해주세요.</Question>
        <OptionList>
          {[
            "원하는 제품이 없어서",
            "잦은 오류, 장애가 발생해서",
            "다른 계정으로 재가입하려고",
            "기타",
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
          {selectedReason === "기타" && (
            <Textarea
              placeholder="탈퇴 사유를 입력해주세요"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
            />
          )}
        </OptionList>
      </PageWrapper>

      <FixedBottom>
        <Button label="탈퇴하기" onClick={handleWithdrawal} />
      </FixedBottom>

      {showModal && (
        <>
          <Overlay onClick={() => setShowModal(false)} />
          <Modal>
            <ModalTitle>잠시만요, 중요한 안내가 있어요</ModalTitle>
            <ModalDesc>
              탈퇴 시 모든 정보가 삭제되며
              <br />
              복구가 불가능합니다.
              <br />
              탈퇴를 진행하시겠습니까?
            </ModalDesc>
            <ButtonBox>
              <ModalButton label="탈퇴하기" onClick={confirmWithdrawal} />
              <CancelButton onClick={() => setShowModal(false)}>
                취소
              </CancelButton>
            </ButtonBox>
          </Modal>
        </>
      )}
    </>
  );
}
