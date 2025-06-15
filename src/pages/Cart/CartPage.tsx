import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OptionModal from "../../components/model/OptionModal";
import { useLocale } from "../../context/LanguageContext";
import TextHeader from "../../components/common/TextHeader";
import axios from "axios";

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
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [showOptionFor, setShowOptionFor] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useLocale();

  const getKey = (id: string) => `${id}`;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCartItems = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        if (!token) {
          console.error("❗토큰이 없습니다. 로그인 상태를 확인하세요.");
          return;
        }
        console.log("🛠️ fetchCartItems 시작 - token:", token);

        const res = await axios.get("http://localhost:8080/cart/items", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("✅ 서버 응답 전체:", res);
        console.log("🧪 res.data.result.items:", res.data.result?.items);

        const itemsFromServer = (res.data.result?.items || []).map(
          (item: any) => ({
            id: item.cartItemId,
            name: item.itemName,
            brand: "브랜드명",
            imageUrl: item.mainImageUrl,
            discountedPrice: item.salePrice,
            discountRate: item.discountRate,
            quantity: item.quantity,
            option: item.optionInfo?.selectOption || "",
            availableOptions: item.optionInfo?.options || [],
          })
        );
        setCartItems(itemsFromServer);
      } catch (err: any) {
        console.error("🛒 장바구니 불러오기 실패 axios error:", err);
        if (err.response) {
          console.error("🔴 서버 응답 코드:", err.response.status);
          console.error("📦 err.response.data:", err.response.data);
        } else {
          console.error("⚠️ 응답 없음 또는 네트워크 에러:", err.message);
        }
      }
    };
    fetchCartItems();
  }, []);

  const toggleSelect = (id: string) => {
    const key = getKey(id);
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const allSelected =
    cartItems.length > 0 && selectedKeys.length === cartItems.length;

  const toggleAll = () => {
    if (allSelected) setSelectedKeys([]);
    else setSelectedKeys(cartItems.map((item) => getKey(item.id)));
  };

  const handleDelete = async (id: string) => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return;
    await axios.delete(`http://localhost:8080/cart/items/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedKeys((prev) => prev.filter((key) => key !== getKey(id)));
  };

  const handleDeleteSelected = async () => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return;

    for (const key of selectedKeys) {
      await axios.delete(`http://localhost:8080/cart/items/${key}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    setCartItems((prev) =>
      prev.filter((item) => !selectedKeys.includes(getKey(item.id)))
    );
    setSelectedKeys([]);
  };

  const handleIncrease = async (id: string) => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return;
    await axios.patch(
      `http://localhost:8080/cart/items/${id}/increase`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = async (id: string) => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return;
    await axios.patch(
      `http://localhost:8080/cart/items/${id}/decrease`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleOptionChange = async (
    id: string,
    prevOption: string,
    newOption: string
  ) => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return;
    await axios.patch(
      `http://localhost:8080/cart/items/${id}/updateOption`,
      { changeOption: newOption },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, option: newOption } : item
      )
    );
    setShowOptionFor(null);
  };

  const totalPrice = cartItems
    .filter((item) => selectedKeys.includes(getKey(item.id)))
    .reduce((sum, item) => {
      const price =
        typeof item.discountedPrice === "number" ? item.discountedPrice : 0;
      const qty = typeof item.quantity === "number" ? item.quantity : 0;
      return sum + price * qty;
    }, 0);

  const handleSubmit = async () => {
    if (selectedKeys.length === 0) {
      alert("선택된 상품이 없습니다.");
      return;
    }
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) return;
      // QR 생성 응답 이후
      const res = await axios.post(
        "http://localhost:8080/cart/qr",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const qrUrls: string[] = res.data.result;

      const selectedItems = cartItems.filter((item) =>
        selectedKeys.includes(getKey(item.id))
      );
      const purchaseHistory = JSON.parse(
        localStorage.getItem("purchaseHistory") || "[]"
      );
      const newRecord = {
        date: new Date().toISOString().slice(0, 10),
        imgUrlList: selectedItems.map((item, i) => qrUrls[i] || item.imageUrl),
      };
      localStorage.setItem(
        "purchaseHistory",
        JSON.stringify([newRecord, ...purchaseHistory])
      );

      // 페이지 이동
      navigate("/qr", {
        state: {
          qrUrls,
          selectedItems,
        },
      });
    } catch (err) {
      console.error("QR 생성 실패", err);
    }
  };

  return (
    <PageWrapper>
      <TextHeader pageName={t.cart.pageTitle} />
      <HeaderControlBar>
        <SelectAll onClick={toggleAll}>
          {t.cart.selected} ({selectedKeys.length}/{cartItems.length})
        </SelectAll>
        <DeleteAll onClick={allSelected ? handleDeleteSelected : toggleAll}>
          {allSelected ? t.cart.deleteAll : t.cart.selectAll}
        </DeleteAll>
      </HeaderControlBar>

      {cartItems.map(
        (item) => (
          console.log(
            "🧪 할인율 확인:",
            item.id,
            item.name,
            "할인율:",
            item.discountRate,
            "타입:",
            typeof item.discountRate
          ),
          (
            <ProductCard key={getKey(item.id)}>
              <TopRow>
                <Checkbox
                  type="checkbox"
                  checked={selectedKeys.includes(getKey(item.id))}
                  onChange={() => toggleSelect(item.id)}
                />
                <Image src={item.imageUrl} alt={item.name} />
                <InfoArea>
                  <UpperInfo>
                    <TitleBlock>
                      <Title>{item.name}</Title>
                      <DeleteButton onClick={() => handleDelete(item.id)}>
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
                    onClick={() => setShowOptionFor(getKey(item.id))}
                  >
                    {t.cart.changeOption}
                  </OptionButton>
                  <QuantityControl>
                    <Button onClick={() => handleDecrease(item.id)}>-</Button>
                    <Count>{item.quantity}</Count>
                    <Button onClick={() => handleIncrease(item.id)}>+</Button>
                  </QuantityControl>
                </LeftRow>
                <RightColumn>
                  <PriceBox>
                    <Discount>{item.discountRate}%</Discount>
                    <Price>
                      {item.discountedPrice.toLocaleString()}
                      {t.cart.won}
                    </Price>
                  </PriceBox>
                </RightColumn>
              </LowerInfo>
            </ProductCard>
          )
        )
      )}

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
        <SubmitButton onClick={handleSubmit}>{t.cart.qrCode}</SubmitButton>
      </StickyBottom>

      {showOptionFor && (
        <OptionModal
          options={
            cartItems.find((item) => getKey(item.id) === showOptionFor)
              ?.availableOptions || []
          }
          onSelect={async (newOption) => {
            const id = showOptionFor;
            if (id) {
              const prevOption =
                cartItems.find((item) => item.id === id)?.option || "";
              await handleOptionChange(id, prevOption, newOption);
            }
          }}
          onClose={() => setShowOptionFor(null)}
        />
      )}
    </PageWrapper>
  );
};

export default CartPage;
