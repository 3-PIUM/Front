// import React from "react";
import styled from "styled-components";
import ItemCard from "../product/ItemCard";

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

// const CloseBtn = styled.div`
//   position: absolute;
//   top: 1rem;
//   right: 1rem;
//   font-size: 1.2rem;
//   cursor: pointer;
// `;

const RecommendModal = ({
  items,
  onClose,
  addedItemImage,
}: {
  items: any[];
  onClose: () => void;
  addedItemImage?: string;
}) => {
  const firstImage =
    addedItemImage ||
    (() => {
      const lastItem = items[items.length - 1];
      if (!lastItem?.itemImage) return "";
      if (
        typeof lastItem.itemImage === "string" &&
        lastItem.itemImage.startsWith("[")
      ) {
        try {
          const parsed = JSON.parse(lastItem.itemImage);
          return Array.isArray(parsed) ? parsed[0] : "";
        } catch {
          return "";
        }
      }
      return lastItem.itemImage;
    })();

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
            <span style={{ fontSize: "0.95rem", color: "#555" }}>
              <strong style={{ color: "#222" }}>장바구니</strong>에 상품을
              담았어요
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
            바로가기 &gt;
          </div>
        </div>
        {/* <CloseBtn onClick={onClose}>✕</CloseBtn> */}
        <Header>같이 구매하면 좋은 상품</Header>
        <ItemsWrapper>
          {items.map((item) => {
            let imageUrl = item.itemImage;
            if (typeof imageUrl === "string" && imageUrl.startsWith("[")) {
              try {
                const parsed = JSON.parse(imageUrl);
                if (Array.isArray(parsed)) {
                  imageUrl = parsed[0];
                }
              } catch {
                imageUrl = "";
              }
            }
            return (
              <ItemCard
                key={item.itemId}
                itemId={item.itemId}
                itemName={item.itemName}
                imageSource={imageUrl}
                discountRate={item.discountRate || 0}
                price={item.discountPrice}
              />
            );
          })}
        </ItemsWrapper>
      </Modal>
    </>
  );
};

export default RecommendModal;
