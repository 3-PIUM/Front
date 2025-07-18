import styled from "styled-components";
import TextHeader from "../../components/common/TextHeader";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLocale } from "../../context/LanguageContext";
import Header from "../../components/common/Header";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  background-color: #fff;
`;

const QRBox = styled.div`
  margin: 8rem 0 2rem;
  display: flex;
  justify-content: center;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #000;
  text-align: center;
  line-height: 1.5;
`;

const QRCodePage = () => {
  const memberId = localStorage.getItem("memberId") || "";
  const location = useLocation();
  const { selectedItems, cartItemIds, qrUrls } = location.state || {};
  const navigate = useNavigate();
  const { t } = useLocale();

  useEffect(() => {
    if (!selectedItems) {
      alert("잘못된 접근입니다.");
      navigate("/cart");
      return;
    }

    const purchaseData = {
      date: new Date().toISOString().slice(0, 10),
      items: selectedItems,
      cartItemIds: cartItemIds,
    };

    const previous = JSON.parse(
      localStorage.getItem("purchaseHistory") || "[]"
    );
    const updated = [...previous, purchaseData];
    localStorage.setItem("purchaseHistory", JSON.stringify(updated));
  }, [selectedItems, memberId, navigate]);

  const qrValue = qrUrls;

  return (
    <PageWrapper>
      <Header />
      <TextHeader pageName={t.qrPage.title} />
      <QRBox>
        <img src={`data:image/png;base64,${qrValue}`} />
      </QRBox>
      <InfoText>{t.qrPage.instruction[0]}</InfoText>
      <InfoText>{t.qrPage.instruction[1]}</InfoText>
    </PageWrapper>
  );
};

export default QRCodePage;
