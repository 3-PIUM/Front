import styled from "styled-components";
import { useLocale } from "../../context/LanguageContext";

const Wrapper = styled.div`
  padding: 2rem 1rem;
  border-radius: 24px;
  text-align: center;
`;

const FlowerImg = styled.img`
  width: 160px;
  height: auto;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 16px;
  color: #e6005a;
  margin-bottom: 1.2rem;
  line-height: 1.4;
  font-weight: 500;
`;

export default function PurchaseNot() {
  const { t } = useLocale();
  return (
    <Wrapper>
      <FlowerImg src="images/purchaseNot.png" alt="구매내역 없음 이미지" />
      <Text>{t.purchaseNot}</Text>
    </Wrapper>
  );
}
