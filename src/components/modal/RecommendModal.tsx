import styled from "styled-components";
import ItemCard from "../product/ItemCard";
import { useLocale } from "../../context/LanguageContext";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const Modal = styled.div`
  position: fixed;
  bottom: 4rem;
  width: 100%;
  height: 320px;
  background: #fff;
  border-radius: 20px 20px 0 0;
  padding: 1rem;
  z-index: 1000;
  overflow: hidden;
`;

const Header = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const ItemsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface RecommendModalProps {
  itemId: number;
  onClose: () => void;
  recommendItems: any[];
  addedItemImage: string;
  isLoading: boolean;
}

const RecommendModal = ({
  onClose,
  recommendItems,
  addedItemImage,
  isLoading,
}: RecommendModalProps) => {
  const { t } = useLocale();
  const items = recommendItems;
  const firstImage = addedItemImage || null;

  return (
    <>
      <Overlay onClick={onClose} />
      <Modal>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "0.75rem",
            borderBottom: "1px solid #eee",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            {isLoading ? (
              <div
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "50%",
                  backgroundColor: "#f0f0f0",
                  animation: "pulse 1.5s infinite",
                }}
              />
            ) : (
              firstImage && (
                <img
                  src={firstImage}
                  alt="담은 상품 이미지"
                  style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )
            )}
            <span style={{ fontSize: "0.95rem", color: "#555" }}>
              {t.cartModal.messagePrefix}&nbsp;
              <strong style={{ color: "#222" }}>
                {t.cartModal.messageMiddle}
              </strong>
              {t.cartModal.messageLast}
            </span>
          </div>
          <div
            onClick={() => (window.location.href = "/cart")}
            style={{
              color: "#007aff",
              fontSize: "0.9rem",
              fontWeight: 500,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {t.cartModal.shortcut}
          </div>
        </div>
        <Header>{t.cartModal.recommendation}</Header>
        <ItemsWrapper>
          {isLoading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: "100px",
                    minWidth: "100px",
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "0.25rem 0",
                  }}
                >
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "10px",
                      marginBottom: "0.2rem",
                      animation: "pulse 1.5s infinite",
                    }}
                  />
                  <div
                    style={{
                      width: "100px",
                      height: "14px",
                      backgroundColor: "#f0f0f0",
                      marginBottom: "4px",
                      borderRadius: "4px",
                      animation: "pulse 1.5s infinite",
                    }}
                  />
                  <div
                    style={{
                      width: "60px",
                      height: "14px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "4px",
                      animation: "pulse 1.5s infinite",
                    }}
                  />
                </div>
              ))
            : items.map((item) => (
                <ItemCard
                  key={item.itemId}
                  itemId={item.itemId}
                  itemName={item.itemName}
                  imageSource={item.itemImage}
                  discountRate={item.discountRate || 0}
                  price={item.salePrice}
                  wishStatus={item.wishStatus}
                  isLoading={false}
                />
              ))}
        </ItemsWrapper>
      </Modal>
    </>
  );
};

export default RecommendModal;
