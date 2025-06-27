import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocale } from "../../context/LanguageContext";

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3.5rem 1rem;
  gap: 1rem;
`;

const EmptyImage = styled.img`
  width: 120px;
  height: auto;
`;

const EmptyText = styled.div`
  font-size: 0.95rem;
  line-height: 1.4;
  color: #333;
`;

const BoldText = styled.div`
  font-weight: bold;
`;

const ExploreButton = styled.button`
  padding: 0.5rem 1.25rem;
  font-size: 0.85rem;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 999px;
  background-color: white;
  cursor: pointer;
`;

export default function EmptyWishView() {
  const navigate = useNavigate();
  const { t } = useLocale();
  return (
    <EmptyWrapper>
      <EmptyImage src="images/wishListImage.png" alt="찜한 상품 없음" />
      <div>
        <BoldText>{t.wishlistEmpty.title}</BoldText>
        <EmptyText>{t.wishlistEmpty.subtitle}</EmptyText>
      </div>
      <ExploreButton onClick={() => navigate("/home")}>
        {t.wishlistEmpty.button}
      </ExploreButton>
    </EmptyWrapper>
  );
}
