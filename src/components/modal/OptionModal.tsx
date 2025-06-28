import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 1rem;
  border-radius: 1.5rem;
  width: 90%;
  max-width: 320px;
  max-height: 55vh;
  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const OptionItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background-color: #f8f8f8;
  }
`;

interface OptionModalProps {
  options: string[];
  onSelect: (option: string) => void;
  onClose: () => void;
}

const OptionModal = ({ options, onSelect, onClose }: OptionModalProps) => {
  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        {options.map((opt) => (
          <OptionItem key={opt} onClick={() => onSelect(opt)}>
            {opt}
          </OptionItem>
        ))}
      </Modal>
    </Overlay>
  );
};

export default OptionModal;
