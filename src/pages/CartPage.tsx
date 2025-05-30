import styled from "styled-components";
import { useCartStore } from "../store/useCartStore";
import TextHeader from "../components/TextHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 120px;
`;

const HeaderControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem 0.5rem;
  font-size: 14px;
  color: #666;
`;

const SelectAll = styled.span`
  cursor: pointer;
`;

const DeleteAll = styled.span`
  cursor: pointer;
  /* color: #aaa; */
`;

const ProductCard = styled.div`
  padding: 1rem;
  border-bottom: 0.2rem solid #f8f8f8;
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  flex-wrap: nowrap;
`;

const Checkbox = styled.input`
  margin-top: 4px;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

const InfoArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const UpperInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const LowerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 0.6rem;
`;

const LeftRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.6rem;
  width: 94%;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TitleBlock = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

const Title = styled.h4`
  font-size: 13px;
  font-weight: bold;
  margin-top: 0.5rem;
  flex: 1;
  word-break: keep-all;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #ccc;
  cursor: pointer;
`;

const Brand = styled.p`
  font-size: 12px;
  color: #e6005a;
  border-radius: 6px;
`;

const OptionButton = styled.button`
  flex: 1;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
`;

const QuantityControl = styled.div`
  flex: 1;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
`;

const Button = styled.button`
  border: none;
  background: none;
  font-size: 20px;
  font-weight: normal;
  cursor: pointer;
  padding: 0 1rem;
`;

const Count = styled.span`
  font-size: 14px;
`;

const PriceBox = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-top: 0.6rem;
`;

const Discount = styled.span`
  color: #e6005a;
  font-weight: bold;
  font-size: 14px;
`;

const Price = styled.span`
  font-size: 15px;
  font-weight: bold;
`;

const StickyBottom = styled.div`
  position: fixed;
  bottom: 6rem;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.05);
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #ff4081;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 1rem;
  border: none;
  border-radius: 8px;
`;

const CartPage = () => {
  const { items, removeItem, increaseQuantity, decreaseQuantity } =
    useCartStore();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const navigate = useNavigate();

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const isSelected = (id: string) => selectedIds.includes(id);
  const allSelected = selectedIds.length === items.length;

  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : items.map((item) => item.id));
  };

  const handleDeleteSelected = () => {
    selectedIds.forEach((id) => removeItem(id));
    setSelectedIds([]);
  };

  return (
    <PageWrapper>
      <TextHeader pageName="장바구니" />

      <HeaderControlBar>
        <SelectAll onClick={toggleAll}>
          선택 ({selectedIds.length}/{items.length})
        </SelectAll>
        <DeleteAll onClick={handleDeleteSelected}>전체 삭제</DeleteAll>
      </HeaderControlBar>

      {items.map((item) => (
        <ProductCard key={item.id}>
          <TopRow>
            <Checkbox
              type="checkbox"
              checked={isSelected(item.id)}
              onChange={() => toggleSelect(item.id)}
            />
            <Image src={item.imageUrl} alt={item.name} />
            <InfoArea>
              <UpperInfo>
                <TitleBlock>
                  <Title>{item.name}</Title>
                  <DeleteButton onClick={() => removeItem(item.id)}>
                    ✕
                  </DeleteButton>
                </TitleBlock>
                <Brand>
                  [{item.brand}] {item.option}
                </Brand>
              </UpperInfo>
            </InfoArea>
          </TopRow>

          <LowerInfo>
            <LeftRow>
              <OptionButton>옵션 변경</OptionButton>
              <QuantityControl>
                <Button onClick={() => decreaseQuantity(item.id)}>-</Button>
                <Count>{item.quantity}</Count>
                <Button onClick={() => increaseQuantity(item.id)}>+</Button>
              </QuantityControl>
            </LeftRow>

            <RightColumn>
              <PriceBox>
                <Discount>{item.discountRate}%</Discount>
                <Price>{item.originalPrice.toLocaleString()}원</Price>
              </PriceBox>
            </RightColumn>
          </LowerInfo>
        </ProductCard>
      ))}

      <StickyBottom>
        <SubmitButton
          onClick={() => {
            if (selectedIds.length === 0) {
              alert("선택된 상품이 없습니다.");
              return;
            }
            navigate("/qr");
          }}
        >
          결제 QR 코드 생성하기
        </SubmitButton>
      </StickyBottom>
    </PageWrapper>
  );
};

export default CartPage;
