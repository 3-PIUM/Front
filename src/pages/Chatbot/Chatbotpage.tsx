import { useState, useEffect } from "react";
import { useLocale } from "../../context/LanguageContext";
import axiosInstance from "../../api/axiosInstance";
import ChatMessage from "../../components/chatbot/ChatMessage";
import ChatSuggestions from "../../components/chatbot/ChatSuggestions";
import ChatItemList from "../../components/chatbot/ChatItemList";
import ChatInputBox from "../../components/chatbot/ChatInputBox";
import styled from "styled-components";
import Header from "../../components/common/Header";
import TextHeader from "../../components/common/TextHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";

interface Message {
  sender: "user" | "bot";
  text: string;
  time: string;
}

const ChatPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const ChatContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 3rem 1rem 2.5rem;
`;
const DateText = styled.div`
  text-align: center;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  color: #666;
`;
const MessageWrapper = styled.div`
  margin-bottom: 1rem;
`;

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
  const [input, setInput] = useState("");
  const [compareModeStarted, setCompareModeStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getTime = () => {
    const now = new Date();
    return (
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0")
    );
  };

  const today = new Date();
  const dayLabel = t.chatbot.response.days?.[today.getDay()] ?? "";
  const formattedDate = `${today.getFullYear()}.${String(
    today.getMonth() + 1
  ).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")} ${dayLabel}`;

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
            checked: selectedCompareItems.includes(item.cartItemId),
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
            checked: selectedCompareItems.includes(entry.item.itemId),
          }))
        );
      } catch (err) {
        console.error("찜 목록 불러오기 실패", err);
      }
    };
    fetchCartItems();
    fetchWishItems();
  }, [selectedCompareItems]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setMessages([
        {
          sender: "bot",
          text: t.chatbot.welcome,
          time: getTime(),
        },
      ]);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [t]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sendChatMessage = async (userInput: string) => {
    const sessionId = "user-session-id";
    const lang = t.lang || "KR";
    setIsLoading(true); // Show spinner before network call
    try {
      const res = await axiosInstance.post("/chat/message", {
        message: userInput,
        lang: lang,
        item_ids: selectedCompareItems,
        session_id: sessionId,
      });
      const output = res.data.result.output || t.chatbot.response.default;
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
      if (mode === "compare" && !compareModeStarted) {
        setCompareModeStarted(true);
      }
    } catch (err) {
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
    } finally {
      setIsLoading(false); // Hide spinner after response
    }
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

  const handleSuggestionClick = (type: "recommend" | "compare") => {
    const userInput = t.chatbot.suggestions[type];
    sendChatMessage(userInput);
    setMode(type);
    setInput("");
    if (type === "compare") setCompareModeStarted(false);
  };

  const handleCompareSelect = (itemId: number) => {
    setSelectedCompareItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const compareIntro = (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "0.75rem",
        fontSize: "0.875rem",
        lineHeight: "1.6",
      }}
    >
      {t.chatbot.compareIntro[0]}
      <br />
      {t.chatbot.compareIntro[1]}
      <br />
      {t.chatbot.compareIntro[2]}
    </div>
  );

  return (
    <ChatPageContainer>
      <Header />
      <TextHeader pageName={t.chatbot.pageTitle} />
      <ChatContent>
        <DateText>{formattedDate}</DateText>

        {/* 1. 기본 안내 메시지 */}
        {messages[0] && (
          <MessageWrapper>
            <ChatMessage
              sender={messages[0].sender}
              text={messages[0].text}
              time={messages[0].time}
              botName={t.chatbot.botName}
            />
          </MessageWrapper>
        )}

        {/* 2. 사용자 입력 메시지 (예: "상품 비교하기") */}
        {messages[1] && (
          <MessageWrapper>
            <ChatMessage
              sender={messages[1].sender}
              text={messages[1].text}
              time={messages[1].time}
              botName={t.chatbot.botName}
            />
          </MessageWrapper>
        )}

        {/* {messages[2] && (
          <MessageWrapper>
            <ChatMessage
              sender={messages[2].sender}
              text={messages[2].text}
              time={messages[2].time}
              botName={t.chatbot.botName}
            />
          </MessageWrapper>
        )} */}

        {/* 3. 선택된 장바구니/찜 항목 (항상 유지) */}
        {mode === "compare" && (
          <>
            <ChatItemList
              title="장바구니 목록"
              items={cartItems.filter((item) =>
                selectedCompareItems.includes(item.id)
              )}
              selectedIds={selectedCompareItems}
              onToggle={handleCompareSelect}
            />
            <ChatItemList
              title="찜 목록"
              items={wishItems.filter((item) =>
                selectedCompareItems.includes(item.id)
              )}
              selectedIds={selectedCompareItems}
              onToggle={handleCompareSelect}
            />
          </>
        )}

        {mode === "compare" && !compareModeStarted && (
          <>
            {compareIntro}
            <ChatItemList
              title={t.compare.cartList}
              items={cartItems}
              selectedIds={selectedCompareItems}
              onToggle={handleCompareSelect}
            />
            <ChatItemList
              title={t.compare.wishlist}
              items={wishItems}
              selectedIds={selectedCompareItems}
              onToggle={handleCompareSelect}
            />
          </>
        )}

        {/* 4. 이후 메시지 (가격 비교해줘 등) */}
        {messages.slice(2).map((msg, idx) => (
          <MessageWrapper key={idx + 2}>
            <ChatMessage
              sender={msg.sender}
              text={msg.text}
              time={msg.time}
              botName={t.chatbot.botName}
            />
          </MessageWrapper>
        ))}

        {mode === "default" && messages.length === 1 && (
          <ChatSuggestions
            recommendLabel={t.chatbot.suggestions.recommend}
            compareLabel={t.chatbot.suggestions.compare}
            onSelect={handleSuggestionClick}
          />
        )}
      </ChatContent>
      <ChatInputBox
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onSubmit={handleSubmit}
      />
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(255, 255, 255, 0.6)",
            zIndex: 999,
            pointerEvents: "none",
          }}
        >
          <LoadingSpinner text={t.loading} />
        </div>
      )}
    </ChatPageContainer>
  );
}
