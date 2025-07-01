import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocale } from "../../context/LanguageContext";
import axiosInstance from "../../api/axiosInstance";

const PageWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #f6f6f6;
  overflow: hidden;
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 2px solid #ddd;
  background-color: #fff0ec;
  padding: 2rem;
  box-sizing: border-box;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 2rem;
  box-sizing: border-box;
`;

const Description = styled.p`
  font-size: 16px;
  color: #444;
  text-align: center;
  line-height: 1.4;
`;
const ItemName = styled.span`
  max-width: 16rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  vertical-align: bottom;
`;

const ItemList = styled.div`
  flex: 1;
  overflow-y: auto;
  border: 1px solid #eee;
  padding: 1rem;
  background: #fafafa;
  max-height: 400px;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px dashed #ddd;
  font-size: 14px;
  line-height: 1.4;
  word-break: break-word;
`;

const TotalArea = styled.div`
  border-top: 2px solid #000;
  padding-top: 1rem;
  padding-bottom: 2rem;
`;

const TotalLine = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin: 0.3rem 0;
  font-size: 16px;
`;

const PayButton = styled.button`
  background-color: #ff2d55;
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  width: 100%;
  margin-top: 1rem;
`;

export const calculatePOSTotal = (
  items: any[]
): { totalQuantity: number; totalPrice: number } => {
  return items.reduce(
    (acc, item: any) => {
      acc.totalQuantity += item.quantity;
      acc.totalPrice += item.quantity * item.discountedPrice;
      return acc;
    },
    { totalQuantity: 0, totalPrice: 0 }
  );
};

const QRPOSPage = () => {
  const location = useLocation();
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const query = new URLSearchParams(location.search);
  const cartItemIdsFromQuery = query.get("cartItemIds");
  const tokenFromQuery = query.get("token");
  const { t } = useLocale();

  useEffect(() => {
    const fetchCartItems = async () => {
      console.log("✅ useEffect 진입");
      console.log("📡 API 호출 시작: /cart/item/details");
      console.log("➡️ cartIds param:", cartItemIdsFromQuery);
      if (!cartItemIdsFromQuery) return;

      try {
        const res = await axiosInstance.get(`/cart/item/details`, {
          params: {
            cartIds: cartItemIdsFromQuery,
          },
        });
        console.log("📥 API 응답:", res);
        const items = res.data.result?.items || [];
        console.log("🧾 받은 items:", items);
        const selected = items
          .filter((item: any) =>
            cartItemIdsFromQuery.split(",").includes(String(item.cartItemId))
          )
          .map((item: any) => ({
            id: item.cartItemId,
            name: item.itemName,
            quantity: item.quantity,
            discountedPrice: item.salePrice,
          }));
        console.log("✅ 필터된 selectedItems:", selected);
        setSelectedItems(selected);
      } catch (err) {
        console.error("❗장바구니 항목 불러오기 실패", err);
      }
    };

    fetchCartItems();
  }, [cartItemIdsFromQuery, tokenFromQuery]);

  const totalQuantity = selectedItems.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );
  const totalPrice = selectedItems.reduce(
    (sum: number, item: any) => sum + item.quantity * item.discountedPrice,
    0
  );

  const handlePay = async () => {
    try {
      const token = sessionStorage.getItem("accessToken") || tokenFromQuery;
      const idsToUse = cartItemIdsFromQuery;
      if (!token || !idsToUse) {
        console.warn("❌ 토큰이나 장바구니 ID 없음");
        return;
      }

      const response = await axiosInstance.post(
        `/cart/pay/${memberId}?cartItemIds=${idsToUse}`
      );

      console.log("✅ 결제 성공 응답:", response);
      console.log("📦 Navigating to payment complete");
      navigate("/payment-complete", { state: { selectedItems } });
    } catch (err) {
      console.error("💥 결제 실패:", err);
      alert("결제 중 문제가 발생했습니다.");
    }
  };

  return (
    <PageWrapper>
      <LeftPanel>
        <h2 style={{ color: "#222", fontWeight: "bold" }}>{t.pos.title}</h2>
        <img
          src="/images/QRCode.png"
          alt="QR Code"
          style={{
            width: "180px",
            height: "180px",
            margin: "1rem 0",
          }}
        />
        <Description>
          {t.pos.description[0]}
          <br />
          {t.pos.description[1]}
        </Description>
      </LeftPanel>

      <RightPanel>
        <ItemList>
          {selectedItems.map((item: any, idx: number) => (
            <ItemRow key={idx}>
              <ItemName>{item.name}</ItemName>
              <span>
                {item.quantity || 1}{" "}
                {item.quantity === 1
                  ? t.order.quantityNumber.one
                  : t.order.quantityNumber.more}
                &nbsp;X&nbsp;
                {(item.quantity * item.discountedPrice).toLocaleString()}
                {t.pos.won}
              </span>
            </ItemRow>
          ))}
        </ItemList>

        <TotalArea>
          <TotalLine>
            <span>{t.pos.totalQuantity}</span>
            <span>
              {totalQuantity}
              {totalQuantity === 1
                ? t.pos.quantityNumber.one
                : t.pos.quantityNumber.more}{" "}
            </span>
          </TotalLine>
          <TotalLine>
            <span>{t.pos.totalPrice}</span>
            <span>
              {totalPrice.toLocaleString()}
              {t.pos.won}
            </span>
          </TotalLine>
          <PayButton onClick={handlePay}>{t.pos.payButton}</PayButton>
        </TotalArea>
      </RightPanel>
    </PageWrapper>
  );
};

export default QRPOSPage;
