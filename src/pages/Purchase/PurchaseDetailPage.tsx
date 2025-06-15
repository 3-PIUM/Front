import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import TextHeader from "../../components/common/TextHeader";
import { useLocale } from "../../context/LanguageContext";

interface PurchaseDetailUser {
  nickname: string;
  profileImg: string;
  email: string;
  birth: string;
  gender: string;
  skinType: string;
  personalType: string;
  mbtiCode: string;
  area: string;
  language: string;
}

interface PurchaseDetailResponse {
  detailInfoList: PurchaseDetailUser[];
  totalPrice: number;
}

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
  const purchase = state?.purchase;
  const { t } = useLocale();

  const formattedDate = purchase?.date?.replace(/-/g, ".") || "";

  const total = (purchase?.items || []).reduce((acc: number, item: any) => {
    const rawPrice = item.originalPrice ?? item.price ?? 0;
    const discountRate = item.discountRate ?? 0;
    const quantity = item.quantity ?? 1;
    const price = rawPrice * (1 - discountRate / 100);
    return acc + price * quantity;
  }, 0);

  const [detailData, setDetailData] = useState<PurchaseDetailResponse | null>(
    null
  );

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get("/purchase-history/detail", {
          params: { date: purchase.date },
        });
        setDetailData(res.data.result);
      } catch (err) {
        console.error("상세 구매내역 불러오기 실패", err);
      }
    };

    fetchDetail();
  }, [purchase.date]);

  return (
    <>
      <TextHeader pageName={t.order.detaiTitle} />
      <PageWrapper>
        <DateText>{formattedDate}</DateText>
        {detailData?.detailInfoList.length ? (
          <div style={{ marginBottom: "1rem", color: "#555" }}>
            구매자: {detailData.detailInfoList[0].nickname}
          </div>
        ) : null}

        {(purchase?.items || []).map((item: any, idx: number) => (
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
