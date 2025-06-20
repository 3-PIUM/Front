import { Suspense, lazy } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useLocale } from "../../context/LanguageContext";
const Header = lazy(() => import("../../components/common/Header"));
const TextHeader = lazy(() => import("../../components/common/TextHeader"));
import axiosInstance from "../../api/axiosInstance";

interface PurchaseDetailItem {
  itemId: number;
  itemName: string;
  imgUrl: string;
  price: number;
  quantity: number;
  itemOption: string;
  discountRate: number;
}

interface PurchaseDetailResponse {
  detailInfoList: PurchaseDetailItem[];
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
  margin-top: 1rem;
  align-items: flex-start;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 1rem;
  min-width: 0;
  overflow: hidden;
`;

const Name = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #222;
  line-height: 1.4;
  word-break: break-word;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
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
  margin-top: 0.3rem;
  gap: 0.25rem;
  justify-content: flex-end;
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

  const [detailData, setDetailData] = useState<PurchaseDetailResponse | null>(
    null
  );

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axiosInstance.get("/purchase-history/detail", {
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
      <Suspense fallback={null}>
        <Header />
        <TextHeader pageName={t.order.detaiTitle} />
      </Suspense>
      <PageWrapper>
        <DateText>{formattedDate}</DateText>

        {(detailData?.detailInfoList || []).map((item, idx) => (
          <ProductWrapper key={idx}>
            <ProductBox
              style={{
                borderBottom:
                  idx !== (detailData?.detailInfoList?.length ?? 0) - 1
                    ? "1px solid #eee"
                    : "none",
              }}
            >
              <Image src={item.imgUrl} />
              <InfoWrapper>
                <Name>{item.itemName}</Name>
                {item.itemOption && item.itemOption !== "default" && (
                  <Option>{item.itemOption}</Option>
                )}
                <Quantity>
                  {item.quantity || 1}{" "}
                  {item.quantity === 1
                    ? t.order.quantityNumber.one
                    : t.order.quantityNumber.more}
                </Quantity>
                <PriceBox>
                  <Discount>{item.discountRate}%</Discount>
                  <Price>
                    {(item.price || 0).toLocaleString()}
                    {t.order.won}
                  </Price>
                </PriceBox>
              </InfoWrapper>
            </ProductBox>
          </ProductWrapper>
        ))}

        <TotalWrapper>
          <TotalLabel>{t.order.totalAmount}</TotalLabel>
          <TotalPrice>
            {(detailData?.totalPrice || 0).toLocaleString()}
            {t.order.won}
          </TotalPrice>
        </TotalWrapper>
      </PageWrapper>
    </>
  );
}
