// src/components/chatbot/ChatRecommendList.tsx
import React from "react";

interface RecommendItem {
  itemId: number;
  itemName: string;
  itemImage: string | null;
  discountPrice: number;
}

interface Props {
  items: RecommendItem[];
}

const ChatRecommendList: React.FC<Props> = ({ items }) => {
  return (
    <div
      style={{
        display: "flex",
        overflowX: "scroll",
        gap: "0.75rem",
        padding: "1rem 0",
      }}
    >
      {items.map((item) => {
        return (
          <div key={item.itemId} style={{ width: "140px", flexShrink: 0 }}>
            <div
              style={{
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                fontWeight: "bold",
                lineHeight: 1.2,
              }}
            >
              {item.itemName}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#333" }}>
              {item.discountPrice.toLocaleString()}원
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatRecommendList;
