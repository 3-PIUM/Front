import styled from "styled-components";
import { useCartStore } from "../../store/useCartStore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OptionModal from "../../components/model/OptionModal";
import { useLocale } from "../../context/LanguageContext";
import TextHeader from "../../components/common/TextHeader";

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
  padding-top: 4rem;
`;

const SelectAll = styled.span`
  cursor: pointer;
`;

const DeleteAll = styled.span`
  cursor: pointer;
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
  accent-color: #f23477;
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
  gap: 0.7rem;
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
  margin-top: 0.2rem;
  flex: 1;
  word-break: keep-all;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #ccc;
  cursor: pointer;
  margin-bottom: 1.4rem;
`;

const Brand = styled.p`
  font-size: 12px;
  color: #e6005a;
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

const TotalAndButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem 3rem;
`;

const TotalLabel = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #222;
`;

const TotalPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #e6005a;
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
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [showOptionFor, setShowOptionFor] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useLocale();

  const getKey = (id: string, option?: string) => `${id}__${option ?? ""}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mergedItems = Object.values(
    items.reduce((acc, item) => {
      const key = getKey(item.id, item.option);
      if (!acc[key]) acc[key] = { ...item };
      else acc[key].quantity += item.quantity;
      return acc;
    }, {} as { [key: string]: (typeof items)[0] })
  );

  const toggleSelect = (id: string, option?: string) => {
    const key = getKey(id, option);
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const isSelected = (id: string, option?: string) =>
    selectedKeys.includes(getKey(id, option));

  const allSelected =
    mergedItems.length > 0 && selectedKeys.length === mergedItems.length;

  const toggleAll = () => {
    if (allSelected) setSelectedKeys([]);
    else
      setSelectedKeys(mergedItems.map((item) => getKey(item.id, item.option)));
  };

  const handleDeleteSelected = () => {
    selectedKeys.forEach((key) => {
      const [id, option] = key.split("__");
      removeItem(id, option || undefined);
    });
    setSelectedKeys([]);
  };

  const totalPrice = mergedItems
    .filter((item) => selectedKeys.includes(getKey(item.id, item.option)))
    .reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);

  const handleOptionChange = (
    id: string,
    prevOption: string,
    newOption: string
  ) => {
    useCartStore.getState().updateOption(id, prevOption, newOption);
    setShowOptionFor(null);
  };

  return (
    <PageWrapper>
      <TextHeader pageName={t.cart.pageTitle} />

      <HeaderControlBar>
        <SelectAll onClick={toggleAll}>
          {t.cart.selected} ({selectedKeys.length}/{mergedItems.length})
        </SelectAll>
        <DeleteAll onClick={allSelected ? handleDeleteSelected : toggleAll}>
          {allSelected ? t.cart.deleteAll : t.cart.selectAll}
        </DeleteAll>
      </HeaderControlBar>

      {mergedItems.map((item) => (
        <ProductCard key={getKey(item.id, item.option)}>
          <TopRow>
            <Checkbox
              type="checkbox"
              checked={isSelected(item.id, item.option)}
              onChange={() => toggleSelect(item.id, item.option)}
            />
            <Image src={item.imageUrl} alt={item.name} />
            <InfoArea>
              <UpperInfo>
                <TitleBlock>
                  <Title>{item.name}</Title>
                  <DeleteButton
                    onClick={() => removeItem(item.id, item.option)}
                  >
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
              <OptionButton
                onClick={() => setShowOptionFor(getKey(item.id, item.option))}
              >
                {t.cart.changeOption}
              </OptionButton>
              <QuantityControl>
                <Button onClick={() => decreaseQuantity(item.id, item.option)}>
                  -
                </Button>
                <Count>{item.quantity}</Count>
                <Button onClick={() => increaseQuantity(item.id, item.option)}>
                  +
                </Button>
              </QuantityControl>
            </LeftRow>
            <RightColumn>
              <PriceBox>
                <Discount>{item.discountRate}%</Discount>
                <Price>
                  {item.originalPrice.toLocaleString()}
                  {t.cart.won}
                </Price>
              </PriceBox>
            </RightColumn>
          </LowerInfo>
        </ProductCard>
      ))}

      <TotalAndButton>
        <TotalRow>
          <TotalLabel>{t.cart.totalAmount}</TotalLabel>
          <TotalPrice>
            {totalPrice.toLocaleString()}
            {t.cart.won}
          </TotalPrice>
        </TotalRow>
      </TotalAndButton>

      <StickyBottom>
        <SubmitButton
          onClick={() => {
            if (selectedKeys.length === 0) {
              alert("선택된 상품이 없습니다.");
              return;
            }
            navigate("/qr", {
              state: {
                selectedItems: mergedItems.filter((item) =>
                  selectedKeys.includes(getKey(item.id, item.option))
                ),
              },
            });
          }}
        >
          {t.cart.qrCode}
        </SubmitButton>
      </StickyBottom>

      {showOptionFor && (
        <OptionModal
          options={
            mergedItems.find(
              (item) => getKey(item.id, item.option) === showOptionFor
            )?.availableOptions || []
          }
          onSelect={(newOption) => {
            const [id, option] = showOptionFor.split("__");
            handleOptionChange(id, option, newOption);
          }}
          onClose={() => setShowOptionFor(null)}
        />
      )}
    </PageWrapper>
  );
};

export default CartPage;
