import styled from "styled-components";
import { useLocation } from "react-router-dom";
import TextHeader from "../../components/common/TextHeader";
import { useLocale } from "../../context/LanguageContext";

const PageWrapper = styled.div`
  padding: 4rem 1rem;
`;

const DateText = styled.h4`
  font-weight: bold;
  font-size: 16px;
  color: #222;
`;

const ProductWrapper = styled.div`
  position: relative;
`;

const ProductBox = styled.div`
  display: flex;
  margin-top: 0.6rem;
`;

const Image = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 1rem;
`;

const Name = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #222;
  line-height: 1.4;
`;

const Quantity = styled.span`
  font-size: 13px;
  color: #999;
  margin-top: 4px;
`;

const PriceBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  white-space: nowrap;
  align-self: flex-end;
  /* margin-top: 0.5rem; */
  gap: 0.25rem;
  margin-left: 14rem;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 15px;
  color: #222;
  display: flex;
  align-self: flex-end;
`;

const Discount = styled.span`
  font-weight: bold;
  font-size: 15px;
  color: #e6005a;
  display: flex;
  align-self: flex-end;
`;

const TotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1.5px solid #eee;
  padding: 1rem 0;
  margin-top: 0.8rem;
`;

const TotalLabel = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #222;
`;

const TotalPrice = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #e6005a;
`;
const Option = styled.span`
  font-size: 13px;
  color: #e6005a;
  margin-bottom: 2px;
`;

export default function PurchaseDetailPage() {
  const { state } = useLocation();
  const { purchase } = state;
  const { t } = useLocale();

  const formattedDate = purchase.date.replace(/-/g, ".");

  const total = purchase.items.reduce(
    (acc: number, item: any) =>
      acc + item.originalPrice * (1 - item.discountRate / 100),
    0
  );

  return (
    <>
      <TextHeader pageName={t.order.detaiTitle} />
      <PageWrapper>
        <DateText>{formattedDate}</DateText>

        {purchase.items.map((item: any, idx: number) => (
          <ProductWrapper key={idx}>
            <ProductBox>
              <Image src={item.imageUrl} />
              <InfoWrapper>
                <Name>{item.name}</Name>
                {item.option && <Option>{item.option}</Option>}
                <Quantity>
                  {item.quantity || 1}{" "}
                  {item.quantity === 1
                    ? t.order.quantityNumber.one
                    : t.order.quantityNumber.more}
                </Quantity>
              </InfoWrapper>
            </ProductBox>
            <PriceBox>
              <Discount>{item.discountRate}%</Discount>
              <Price>
                {item.originalPrice.toLocaleString()}
                {t.order.won}
              </Price>
            </PriceBox>
          </ProductWrapper>
        ))}

        <TotalWrapper>
          <TotalLabel>{t.order.totalAmount}</TotalLabel>
          <TotalPrice>
            {Math.round(total).toLocaleString()}
            {t.order.won}
          </TotalPrice>
        </TotalWrapper>
      </PageWrapper>
    </>
  );
}
