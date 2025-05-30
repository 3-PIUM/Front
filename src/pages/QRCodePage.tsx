import styled from "styled-components";
import QRCode from "react-qr-code";
import TextHeader from "../components/TextHeader";
import { useNavigate } from "react-router-dom";

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
  const qrValue = "https://example.com/pay"; // 실제 결제 링크 혹은 주문 ID 사용 가능

  return (
    <PageWrapper>
      <TextHeader pageName="QR 코드" />
      <QRBox>
        <QRCode value={qrValue} size={200} />
      </QRBox>
      <InfoText>
        해당 QR 코드를 카운터에 보여주시면
        <br />
        빠르게 결제 도와드리겠습니다
      </InfoText>
    </PageWrapper>
  );
};

export default QRCodePage;
