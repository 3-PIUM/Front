import styled from "styled-components";
import colors from "../../styles/colors";
import { createPortal } from "react-dom";
import { useLocale } from "../../context/LanguageContext";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
`;

const ModalBox = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 100%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: fit-content;
  background-color: ${colors.white};
  padding: 1.5rem 1rem;
  z-index: 10001;
  border-radius: 2rem 2rem 0 0;
  animation: slideUp 0.4s ease-out forwards;

  @keyframes slideUp {
    from {
      transform: translate(-50%, 100%);
    }
    to {
      transform: translate(-50%, 0%);
    }
  }
`;

const SortedBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const Sorted = styled.div<{ $selected: boolean }>`
  padding: 1rem 0;
  font-size: 1rem;
  font-weight: ${({ $selected }) => ($selected ? 700 : 500)};
  color: ${({ $selected }) => ($selected ? colors.mainPink : colors.black)};
`;

interface ModalProps {
  selectedSort: string | undefined;
  onSelectedSort: (sort: string) => void;
  closeModal: () => void;
}

function ModalContent({
  selectedSort,
  onSelectedSort,
  closeModal,
}: ModalProps) {
  const { t } = useLocale();
  const [sortValue, setSortValue] = useState<string | undefined>(selectedSort);

  useEffect(() => {
    if (!selectedSort) {
      const savedSort = sessionStorage.getItem("selectedSort");
      if (savedSort) {
        setSortValue(savedSort);
        onSelectedSort(savedSort);
      }
    }
  }, [selectedSort]);

  useEffect(() => {
    if (sortValue) {
      sessionStorage.setItem("selectedSort", sortValue);
    }
  }, [sortValue]);

  const handleSelect = (value: string) => {
    setSortValue(value);
    sessionStorage.setItem("selectedSort", value);
    onSelectedSort(value);
  };

  return (
    <Wrapper onClick={closeModal}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <SortedBox>
          {(t.category.sorted as { name: string; value: string }[]).map(
            (sort) => (
              <Sorted
                key={sort.value}
                $selected={sortValue === sort.value}
                onClick={() => handleSelect(sort.value)}
              >
                {sort.name}
              </Sorted>
            )
          )}
        </SortedBox>
      </ModalBox>
    </Wrapper>
  );
}

export default function SortedModal(props: ModalProps) {
  return createPortal(<ModalContent {...props} />, document.body);
}
