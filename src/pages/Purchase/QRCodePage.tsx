import styled from "styled-components";
import QRCode from "react-qr-code";
import TextHeader from "../../components/common/TextHeader";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLocale } from "../../context/LanguageContext";

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
  const navigate = useNavigate();
  const location = useLocation();

  const selectedCartItems = location.state?.selectedItems;

  useEffect(() => {
    if (!selectedCartItems) {
      alert("잘못된 접근입니다.");
      navigate("/cart");
      return;
    }

    const purchaseData = {
      date: new Date().toISOString().slice(0, 10),
      items: selectedCartItems,
    };

    const previous = JSON.parse(
      localStorage.getItem("purchaseHistory") || "[]"
    );
    const updated = [...previous, purchaseData];
    localStorage.setItem("purchaseHistory", JSON.stringify(updated));
  }, [selectedCartItems, navigate]);

  const qrValue = "https://example.com/pay";
  const { t } = useLocale();

  return (
    <PageWrapper>
      <TextHeader pageName={t.qrPage.title} />
      <QRBox>
        <QRCode value={qrValue} size={200} />
      </QRBox>
      <InfoText>{t.qrPage.instruction}</InfoText>
    </PageWrapper>
  );
};

export default QRCodePage;
