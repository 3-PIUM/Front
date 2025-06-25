import React from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const scrollContainerStyle: React.CSSProperties = {
    display: "flex",
    overflowX: "auto",
    gap: "1rem",
    padding: "1rem 0",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  };

  return (
    <>
      <style>
        {`
          .chat-recommend-scroll::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div className="chat-recommend-scroll" style={scrollContainerStyle}>
        {items.map((item) => (
          <div
            key={item.itemId}
            onClick={() => navigate(`/product-detail?itemId=${item.itemId}`)}
            style={{
              cursor: "pointer",
              maxWidth: "140px",
              fontSize: "0.75rem",
              flexDirection: "column",
              alignItems: "center",
              padding: "0.5rem 0rem",
              borderRadius: "0.75rem",
              backgroundColor: "#f5f5f5",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "90%",
                height: "120px",
                // backgroundColor: "#cacaca",
                borderRadius: "0.5rem",
                // overflow: "hidden",
                marginBottom: "0.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={
                  item.itemImage ??
                  "https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0017/A00000017330210ko.jpg"
                }
                alt={item.itemName}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                }}
              />
            </div>
            <div
              style={{
                color: "#000",
                fontSize: "1rem",
                fontWeight: "bold",
                textAlign: "center",
                alignSelf: "center",
                marginBottom: "0.25rem",
              }}
            >
              {item.discountPrice.toLocaleString()}원
            </div>
            <div
              style={{
                fontWeight: "normal",
                maxWidth: "117px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                // lineHeight: 1.3,
                // textAlign: "left",
                alignSelf: "flex-start",
              }}
              title={item.itemName}
            >
              {item.itemName}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatRecommendList;
