import styled from "styled-components";
import colors from "../styles/colors";
import { useState } from "react";

interface Store {
  name: string;
  distance: string;
  imageUrl: string;
  status: string;
  hours: string;
}

interface StoreModalProps {
  onClose: () => void;
  onSelect: (store: Store) => void;
  stores: Store[];
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const ModalContainer = styled.div`
  position: fixed;
  bottom: 4.5rem;
  width: 100%;
  max-height: auto;
  background-color: ${colors.white};
  border-radius: 16px 16px 0 0;
  padding: 1rem;
  z-index: 1000;
`;

const Title = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const StoreList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 50vh;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

const StoreItem = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  cursor: pointer;

  background-color: ${({ $selected }) =>
    $selected ? "#fff0f5" : "transparent"};
  border: 1px solid ${({ $selected }) => ($selected ? "#F23477" : "#ddd")};
`;

const StoreImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 0.5rem;
  object-fit: cover;
`;

const StoreDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const StoreName = styled.div`
  font-weight: 600;
`;

const StoreInfo = styled.div`
  font-size: 0.875rem;
`;

export default function StoreModal({
  onClose,
  onSelect,
  stores,
}: StoreModalProps) {
  const [selectedStoreName, setSelectedStoreName] = useState<string | null>(
    null
  );

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>내 주변 매장 찾기</Title>
        <StoreList>
          {stores.map((store, index) => (
            <StoreItem
              key={index}
              $selected={selectedStoreName === store.name}
              onClick={() => {
                setSelectedStoreName(store.name);
                onSelect(store);
                onClose();
              }}
            >
              <StoreImage src={store.imageUrl} alt={store.name} />
              <StoreDetails>
                <StoreName>{store.name}</StoreName>
                <StoreInfo>
                  {store.status} · {store.hours}
                </StoreInfo>
                <StoreInfo>{store.distance}</StoreInfo>
              </StoreDetails>
            </StoreItem>
          ))}
        </StoreList>
      </ModalContainer>
    </Overlay>
  );
}
