import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const QRImage = styled.div`
  width: 180px;
  height: 180px;
  background-color: #ccc;
  margin: 1rem 0;
`;

const Description = styled.p`
  font-size: 16px;
  color: #444;
  text-align: center;
  line-height: 1.4;
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

// QRPOSPage에서 사용할 더미 데이터 예시
export const dummyPOSData = [
  {
    id: 1,
    name: "[정정보송] 차앤박(CNP) 더마 쉴드 선스틱 SPF50+ 18g",
    quantity: 2,
    discountedPrice: 14900,
  },
  {
    id: 2,
    name: "[울영특가] 메디큐브 부스터 프로 쿠로미 에디션",
    quantity: 1,
    discountedPrice: 339000,
  },
  {
    id: 3,
    name: "[한정수량] 닥터지 레드 블레미쉬 수딩크림 70ml",
    quantity: 3,
    discountedPrice: 19800,
  },
];

// 총 수량과 총 금액 계산 함수
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
  const navigate = useNavigate();
  const selectedItems = location.state?.selectedItems || dummyPOSData;

  const totalQuantity = selectedItems.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );
  const totalPrice = selectedItems.reduce(
    (sum: number, item: any) => sum + item.quantity * item.discountedPrice,
    0
  );

  return (
    <PageWrapper>
      <LeftPanel>
        <h2 style={{ color: "#222", fontWeight: "bold" }}>
          상품의 QR코드를 스캔해주세요
        </h2>
        <QRImage />
        <Description>
          QR코드를 스캔하면 상품이 오른쪽 목록에 추가됩니다.
          <br />
          결제 버튼을 눌러 결제를 진행하세요.
        </Description>
      </LeftPanel>

      <RightPanel>
        <ItemList>
          {selectedItems.map((item: any, idx: number) => (
            <ItemRow key={idx}>
              <span>
                {item.name} X {item.quantity}개
              </span>

              <span></span>
              <span>
                {(item.quantity * item.discountedPrice).toLocaleString()}원
              </span>
            </ItemRow>
          ))}
        </ItemList>

        <TotalArea>
          <TotalLine>
            <span>총 수량</span>
            <span>{totalQuantity}개</span>
          </TotalLine>
          <TotalLine>
            <span>총 결제 금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </TotalLine>
          <PayButton onClick={() => navigate("/payment-complete")}>
            결제하기
          </PayButton>
        </TotalArea>
      </RightPanel>
    </PageWrapper>
  );
};

export default QRPOSPage;
