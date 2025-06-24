import { lazy, Suspense } from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { useLocale } from "../../context/LanguageContext";
import axiosInstance from "../../api/axiosInstance";
const TextHeader = lazy(() => import("../../components/common/TextHeader"));
const Header = lazy(() => import("../../components/common/Header"));

const ChatPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeaderWrapper = styled.div`
  flex-shrink: 0;
  background-color: #fff;
  z-index: 100;
`;

const DateText = styled.div`
  text-align: center;
  font-size: 0.875rem;
  margin-bottom: 0.3rem;
  color: #666;
`;

const ChatContent = styled.div`
  flex: 1;
  padding: 4rem 1rem 2rem;
  overflow-y: auto;
  background-color: #fefefe;
  position: relative;
  height: 0;
  min-height: 0;
`;

const MessageRow = styled.div<{ $isUser: boolean }>`
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
  flex-direction: ${({ $isUser }) => ($isUser ? "row-reverse" : "column")};
`;

const BotRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* margin-left: 1rem; */
`;

const BotImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const BotName = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #e91e63;
  margin-top: 4px;
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  background-color: ${({ $isUser }) => ($isUser ? "#d2e3fc" : "#f2f2f2")};
  color: #000;
  padding: 10px 14px;
  border-radius: 14px;
  max-width: 260px;
  font-size: 14px;
  white-space: pre-line;
`;

const TimeText = styled.div`
  font-size: 12px;
  color: #999;
  margin-left: 0.4rem;
  align-self: flex-end;
`;

const InputContainer = styled.form`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 0.75rem 1rem;
  border-top: 1px solid #e5e7eb;
  background-color: #fff;
  z-index: 999;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #e91e63;
  }
`;

const SendButton = styled.button`
  background: none;
  border: none;
  margin-left: 0.5rem;
  color: #f43f5e;
  font-size: 1.5rem;
  cursor: pointer;
`;

interface Message {
  sender: "user" | "bot";
  text: string;
  time: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { t } = useLocale();

  const [mode, setMode] = useState<"default" | "compare" | "recommend">(
    "default"
  );
  const [selectedCompareItems, setSelectedCompareItems] = useState<number[]>(
    []
  );

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishItems, setWishItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axiosInstance.get("/cart/items");
        const items = res.data?.result?.items || [];
        setCartItems(
          items.map((item: any) => ({
            id: item.cartItemId,
            name: item.itemName,
            brand: item.brand,
            price: `${item.salePrice.toLocaleString()}원`,
            image: item.mainImageUrl,
            checked: false,
          }))
        );
      } catch (err) {
        console.error("장바구니 불러오기 실패", err);
      }
    };

    const fetchWishItems = async () => {
      try {
        const res = await axiosInstance.get("/wishlist/items");
        const items = res.data?.result || [];
        setWishItems(
          items.map((entry: any) => ({
            id: entry.item.itemId,
            name: entry.item.itemName,
            brand: entry.item.brand,
            price: `${entry.item.salePrice.toLocaleString()}원`,
            image: entry.item.mainImageUrl,
            checked: false,
          }))
        );
      } catch (err) {
        console.error("찜 목록 불러오기 실패", err);
      }
    };

    fetchCartItems();
    fetchWishItems();
  }, []);

  const sendChatMessage = async (userInput: string) => {
    const sessionId = "user-session-id"; // 실제 필요에 따라 고유값으로 대체

    // ✅ 선택된 비교 상품 ID와 메시지 로그 출력
    console.log("📦 선택된 비교 상품 ID 목록:", selectedCompareItems);
    console.log("📝 입력 메시지:", userInput);
    try {
      const res = await axiosInstance.post("http://52.79.241.142:8000/chat", {
        message: userInput,
        lang: "KR",
        item_ids: selectedCompareItems,
        session_id: sessionId,
      });

      const output = res.data.output || t.chatbot.response.default;
      const itemList = res.data.itemList || [];

      setMessages((prev) => [
        ...prev,
        {
          sender: "user",
          text: userInput,
          time: getTime(),
        },
        {
          sender: "bot",
          text: output,
          time: getTime(),
        },
      ]);

      console.log("추천된 아이템 목록:", itemList);
    } catch (err) {
      console.error("챗봇 API 실패", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "user",
          text: userInput,
          time: getTime(),
        },
        {
          sender: "bot",
          text: t.chatbot.response.default,
          time: getTime(),
        },
      ]);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: t.chatbot.welcome,
        time: getTime(),
      },
    ]);
  }, [t]);
  const [input, setInput] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const today = new Date();
  const dayLabel = t.chatbot.response.days?.[today.getDay()] ?? "";
  const formattedDate = `${today.getFullYear()}.${String(
    today.getMonth() + 1
  ).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")} ${dayLabel}`;

  const botReply = (message: string): string => {
    const lower = message.toLowerCase();

    const productKeywords = t.chatbot?.keywords?.product || [];
    const budgetKeywords = t.chatbot?.keywords?.budget || [];
    const diagnosisKeywords = t.chatbot?.keywords?.diagnosis || [];

    if (productKeywords.some((k: string) => lower.includes(k))) {
      return t.chatbot.response.product;
    }
    if (budgetKeywords.some((k: string) => lower.includes(k))) {
      return t.chatbot.response.budget;
    }
    if (diagnosisKeywords.some((k: string) => lower.includes(k))) {
      return t.chatbot.response.diagnosis;
    }
    return t.chatbot.response.default;
  };
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [compareModeStarted, setCompareModeStarted] = useState(false);

  const getTime = () => {
    const now = new Date();
    return (
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0")
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendChatMessage(input.trim());
    setInput("");
    if (mode === "compare") {
      setCompareModeStarted(true);
    }
  };

  return (
    <ChatPageContainer>
      <ChatHeaderWrapper>
        <Header />
        <TextHeader pageName={t.chatbot.pageTitle} />
      </ChatHeaderWrapper>
      <ChatContent>
        <DateText>{formattedDate}</DateText>
        {messages.map((msg, idx) =>
          msg.sender === "bot" ? (
            <MessageRow key={idx} $isUser={false}>
              <BotRow>
                <BotImage src="images/CharacterImg/surveyImage.png" alt="bot" />
                <BotName>{t.chatbot.botName}</BotName>
              </BotRow>
              <BotRow>
                <MessageBubble $isUser={false}>{msg.text}</MessageBubble>
                <TimeText>{msg.time}</TimeText>
              </BotRow>
            </MessageRow>
          ) : (
            <MessageRow
              key={idx}
              $isUser={true}
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              <MessageBubble $isUser={true}>{msg.text}</MessageBubble>
              <TimeText style={{ marginRight: "0.4rem" }}>{msg.time}</TimeText>
            </MessageRow>
          )
        )}

        {mode === "default" && messages.length === 1 && (
          <div
            style={{
              display: "flex",
              gap: "1rem",
              margin: "1rem 0",
              justifyContent: "center",
            }}
          >
            <div
              onClick={() => {
                const userInput = t.chatbot.suggestions.recommend;
                sendChatMessage(userInput); // ✅ 자동 메시지 전송
                setMode("recommend");
                setInput("");
              }}
              style={{
                border: "1px solid #eee",
                borderRadius: "12px",
                padding: "1rem 0.3rem",
                backgroundColor: "#fff0f5",
                cursor: "pointer",
                flex: 1,
                textAlign: "center",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              {t.chatbot.suggestions.recommend}
            </div>
            <div
              onClick={() => {
                const userInput = t.chatbot.suggestions.compare;
                sendChatMessage(userInput);
                setMode("compare");
                setCompareModeStarted(false);
                setInput("");
              }}
              style={{
                border: "1px solid #eee",
                borderRadius: "12px",
                padding: "1rem 0.3rem",
                backgroundColor: "#fff0f5",
                cursor: "pointer",
                flex: 1,
                textAlign: "center",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              {t.chatbot.suggestions.compare}
            </div>
          </div>
        )}

        {mode === "compare" && compareModeStarted && (
          <>
            <div
              style={{
                background: "#f9f9f9",
                borderRadius: "16px",
                padding: "0.7rem",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginBottom: "0.7rem",
                }}
              >
                장바구니 목록
              </div>
              {cartItems
                .filter((item) => selectedCompareItems.includes(item.id))
                .map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <img
                      src={item.image}
                      alt="item"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "12px",
                        marginRight: "1rem",
                        objectFit: "cover",
                        backgroundColor: "#eee",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                        {item.name}
                      </div>
                      <div
                        style={{
                          color: "#666",
                          fontSize: "14px",
                          marginTop: "4px",
                        }}
                      >
                        {item.brand}
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 500 }}>
                        {item.price}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div
              style={{
                background: "#f9f9f9",
                borderRadius: "16px",
                padding: "0.7rem",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginBottom: "0.7rem",
                }}
              >
                찜 목록
              </div>
              {wishItems
                .filter((item) => selectedCompareItems.includes(item.id))
                .map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <img
                      src={item.image}
                      alt="item"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "12px",
                        marginRight: "1rem",
                        objectFit: "cover",
                        backgroundColor: "#eee",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                        {item.name}
                      </div>
                      <div
                        style={{
                          color: "#666",
                          fontSize: "14px",
                          marginTop: "4px",
                        }}
                      >
                        {item.brand}
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 500 }}>
                        {item.price}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}

        {mode === "compare" && !compareModeStarted && (
          <>
            <div
              style={{
                backgroundColor: "#f2f2f2",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "12px",
                fontSize: "14px",
                lineHeight: "1.6",
              }}
            >
              {t.chatbot.compareIntro[0]}
              <br />
              {t.chatbot.compareIntro[1]}
              <br />
              {t.chatbot.compareIntro[2]}
            </div>
            <div
              style={{
                background: "#f6f6f6",
                padding: "1rem",
                borderRadius: "12px",
                marginTop: "1rem",
                maxHeight: "300px",
                overflowY: "auto",
                scrollbarWidth: "none", // for Firefox
                msOverflowStyle: "none", // for IE/Edge
              }}
            >
              <style>
                {`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>
              <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>
                {t.compare.cartList}
              </div>
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    borderBottom:
                      index !== cartItems.length - 1
                        ? "1px solid #ddd"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.7rem",
                      padding: "0.5rem 0",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCompareItems.includes(item.id)}
                      onChange={() => {
                        setSelectedCompareItems((prev) =>
                          prev.includes(item.id)
                            ? prev.filter((i) => i !== item.id)
                            : [...prev, item.id]
                        );
                      }}
                    />
                    <img
                      src={item.image}
                      alt="item"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "8px",
                        objectFit: "cover",
                        backgroundColor: "#eee",
                      }}
                    />
                    <div style={{ fontSize: "14px" }}>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div
                        style={{
                          color: "#444",
                          fontSize: "13px",
                          marginTop: "2px",
                        }}
                      >
                        {item.brand}
                      </div>
                      <div style={{ color: "#000", marginTop: "4px" }}>
                        {item.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: "#f6f6f6",
                padding: "1rem",
                borderRadius: "12px",
                marginTop: "1rem",
                maxHeight: "300px",
                overflowY: "auto",
                scrollbarWidth: "none", // for Firefox
                msOverflowStyle: "none", // for IE/Edge
              }}
            >
              <style>
                {`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>
              <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>
                {t.compare.wishlist}
              </div>
              {wishItems.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    borderBottom:
                      index !== wishItems.length - 1
                        ? "1px solid #ddd"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.7rem",
                      padding: "0.4rem 0",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCompareItems.includes(item.id)}
                      onChange={() => {
                        setSelectedCompareItems((prev) =>
                          prev.includes(item.id)
                            ? prev.filter((i) => i !== item.id)
                            : [...prev, item.id]
                        );
                      }}
                    />
                    <img
                      src={item.image}
                      alt="item"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "8px",
                        objectFit: "cover",
                        backgroundColor: "#eee",
                      }}
                    />
                    <div style={{ fontSize: "14px" }}>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div
                        style={{
                          color: "#444",
                          fontSize: "13px",
                          marginTop: "2px",
                        }}
                      >
                        {item.brand}
                      </div>
                      <div style={{ color: "#000", marginTop: "4px" }}>
                        {item.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </ChatContent>

      <div>
        <InputContainer onSubmit={handleSubmit}>
          <ChatInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.chatbot.placeholder}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <SendButton type="submit" onClick={handleSubmit}>
            <FiSend />
          </SendButton>
        </InputContainer>

        {showSuggestionModal && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              padding: "1rem",
              boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                marginBottom: "1rem",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              원하는 기능을 선택해주세요
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => {
                  const userInput = t.chatbot.suggestions.recommend;
                  sendChatMessage(userInput);
                  setMode("recommend");
                  setInput("");
                  setShowSuggestionModal(false);
                }}
                style={{
                  flex: 1,
                  padding: "0.8rem 1rem",
                  fontSize: "13px",
                  backgroundColor: "#fce4ec",
                  borderRadius: "16px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {t.chatbot.suggestions.recommend}
              </button>
              <button
                onClick={() => {
                  const userInput = t.chatbot.suggestions.compare;
                  sendChatMessage(userInput);
                  setMode("compare");
                  setInput("");
                  setShowSuggestionModal(false);
                }}
                style={{
                  flex: 1,
                  padding: "0.8rem 1rem",
                  fontSize: "13px",
                  backgroundColor: "#fce4ec",
                  borderRadius: "16px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {t.chatbot.suggestions.compare}
              </button>
            </div>
            <button
              onClick={() => setShowSuggestionModal(false)}
              style={{
                marginTop: "1rem",
                display: "block",
                width: "100%",
                textAlign: "center",
                color: "#888",
                background: "none",
                border: "none",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              닫기
            </button>
          </div>
        )}
      </div>
    </ChatPageContainer>
  );
}
