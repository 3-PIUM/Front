import styled from "styled-components";
import { useLocation } from "react-router-dom";
import TextHeader from "../components/TextHeader";

const PageWrapper = styled.div`
  padding: 1rem;
  background-color: #fff;
`;

const ProductBox = styled.div`
  display: flex;
  margin: 1rem 0;
  gap: 1rem;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

const Info = styled.div`
  flex: 1;
`;

const Price = styled.p`
  font-weight: bold;
  color: #e6005a;
`;

const Total = styled.div`
  padding-top: 1rem;
  border-top: 1px solid #eee;
  text-align: right;
  font-weight: bold;
  font-size: 18px;
  color: #e6005a;
`;

export default function PurchaseDetailPage() {
  const { state } = useLocation();
  const { purchase } = state;

  const total = purchase.items.reduce(
    (acc: number, item: any) =>
      acc + item.originalPrice * (1 - item.discountRate / 100),
    0
  );

  return (
    <PageWrapper>
      <TextHeader pageName="구매 내역" />
      <h4>{purchase.date}</h4>
      {purchase.items.map((item: any, idx: number) => (
        <ProductBox key={idx}>
          <Image src={item.imageUrl} />
          <Info>
            <div>{item.name}</div>
            <div>{item.option || ""}</div>
            <Price>
              {item.discountRate}% {item.originalPrice.toLocaleString()}원
            </Price>
          </Info>
        </ProductBox>
      ))}
      <Total>총 금액 {Math.round(total).toLocaleString()}원</Total>
    </PageWrapper>
  );
}
