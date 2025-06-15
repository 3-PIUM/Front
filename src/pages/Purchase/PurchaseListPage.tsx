import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TextHeader from "../../components/common/TextHeader";
import { useLocale } from "../../context/LanguageContext";
import axios from "axios";

interface Purchase {
  date: string;
  imgUrlList: string[];
}

const Wrapper = styled.div`
  padding: 4rem 1rem;
`;

const TopList = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  object-fit: cover;
`;

const DetailButton = styled.div`
  text-align: right;
  font-size: 14px;
  color: #888;
  cursor: pointer;
`;

export default function PurchaseListPage() {
  const navigate = useNavigate();
  const { t } = useLocale();
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const res = await axios.get("http://localhost:8080/purchase-history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("서버 응답:", res.data);
        const rawList = res.data.result.dateInfoList;
        const formatted = rawList.map((entry: any) => ({
          date: entry.date,
          imgUrlList: entry.imgUrlList ?? [], // 안전하게 처리
        }));
        setPurchases(formatted);
      } catch (err) {
        console.error("구매내역 불러오기 실패", err);
      }
    };

    fetchPurchaseHistory();
  }, []);

  return (
    <>
      <TextHeader pageName={t.order.history} />
      <Wrapper>
        {purchases.length === 0 ? (
          <div>{t.order.noHistory || "구매내역이 없습니다."}</div>
        ) : (
          purchases.map((purchase, idx) => (
            <PurchaseItem key={idx}>
              <TopList>
                <DateText>{purchase.date.replace(/-/g, ".")}</DateText>
                <DetailButton
                  onClick={() =>
                    navigate("/purchase-detail", { state: { purchase } })
                  }
                >
                  {t.order.detail} &gt;
                </DetailButton>
              </TopList>

              <ImageList>
                {(purchase.imgUrlList || []).map((url, i) => (
                  <ProductImage key={i} src={url} />
                ))}
              </ImageList>
            </PurchaseItem>
          ))
        )}
      </Wrapper>
    </>
  );
}
