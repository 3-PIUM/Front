import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import cardMachine from "../../assets/card/card_machine.png"; // 경로는 실제 위치에 맞게 조정

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

const LeftSide = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MessageBox = styled.div`
  background: #f3f6fc;
  color: #1a1a1a;
  padding: 1rem 1.5rem;
  font-size: 20px;
  border: 2px solid #9bb1d1;
  margin-bottom: 2rem;
  font-weight: bold;
`;

const CardImage = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 1rem;
`;

const CompleteText = styled.h2`
  font-size: 22px;
  margin-top: 2rem;
  font-weight: bold;
`;

const RightSide = styled.div`
  flex: 1.2;
  padding: 1.5rem 2rem;
  border-left: 2px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #333;
  font-size: 17px;
  text-align: right;
`;

const BrandInfo = styled.div`
  color: #d32f2f;
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 0.3rem;
  line-height: 1.2;
`;

const UserInfo = styled.div`
  color: #d32f2f;
  font-size: 16px;
  margin-bottom: 1.2rem;
  line-height: 1.2;
`;

const PointSection = styled.div`
  border-bottom: 2px solid #ddd;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
`;

const PointRow = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 0.4rem;
  display: flex;
  justify-content: space-between;
`;

const PaymentSection = styled.div`
  font-weight: bold;
  font-size: 20px;
  line-height: 1.5;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 900;
  font-size: 22px;
  margin-top: 1.5rem;
`;

const PaymentCompletePage = () => {
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState<any[]>(
    location.state?.selectedItems || []
  );

  const totalQty = selectedItems.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );
  const totalPrice = selectedItems.reduce(
    (sum: number, item: any) => sum + item.quantity * item.discountedPrice,
    0
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowApproved(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const [showApproved, setShowApproved] = useState(false);

  return (
    <PageWrapper>
      <LeftSide>
        {showApproved ? (
          <>
            <MessageBox>승인이 완료 되었습니다. 카드를 가져가세요</MessageBox>
            <CardImage src={cardMachine} alt="카드리더기" />
            <CompleteText>승인이 완료 되었습니다.</CompleteText>
          </>
        ) : (
          <>
            <MessageBox>카드를 카드리더기에 꽂아주세요</MessageBox>
            <CardImage src={cardMachine} alt="카드리더기" />
          </>
        )}
      </LeftSide>

      <RightSide>
        <BrandInfo>올리브영 명동점</BrandInfo>

        <PointSection></PointSection>

        <PaymentSection>
          <DetailRow>
            <span>결제 금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </DetailRow>
          <DetailRow>
            <span>수량</span>
            <span>{totalQty}개</span>
          </DetailRow>
          <DetailRow>
            <span>총 결제 금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </DetailRow>
          <TotalRow>
            <span>결제 금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </TotalRow>
        </PaymentSection>
      </RightSide>
    </PageWrapper>
  );
};

export default PaymentCompletePage;
