import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TextHeader from "../components/TextHeader";

const mockPurchases = JSON.parse(
  localStorage.getItem("purchaseHistory") || "[]"
);

const Wrapper = styled.div`
  padding: 4rem 1rem;
`;

const TopList = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 13rem;
`;

const PurchaseItem = styled.div`
  margin-bottom: 1rem;
`;

const DateText = styled.h4`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ImageList = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ProductImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 8px;
`;

const DetailButton = styled.div`
  text-align: right;
  font-size: 14px;
  color: #888;
  cursor: pointer;
`;

export default function PurchaseListPage() {
  const navigate = useNavigate();

  return (
    <>
      <TextHeader pageName="구매 내역" />
      <Wrapper>
        {mockPurchases.map((purchase: any, idx: number) => (
          <PurchaseItem key={idx}>
            <TopList>
              <DateText>{purchase.date.replace(/-/g, ".")}</DateText>
              <DetailButton
                onClick={() =>
                  navigate("/purchase-detail", { state: { purchase } })
                }
              >
                주문상세 &gt;
              </DetailButton>
            </TopList>

            <ImageList>
              {purchase.items.map((item: any, i: number) => (
                <ProductImage key={i} src={item.imageUrl} />
              ))}
            </ImageList>
          </PurchaseItem>
        ))}
      </Wrapper>
    </>
  );
}
