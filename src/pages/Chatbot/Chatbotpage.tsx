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
  padding: 1rem;
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

  // Utility: get time string
  const getTime = () => {
    const now = new Date();
    return (
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0")
    );
  };

  // Date for chat
  const today = new Date();
  const dayLabel = t.chatbot.response.days?.[today.getDay()] ?? "";
  const formattedDate = `${today.getFullYear()}.${String(
    today.getMonth() + 1
  ).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")} ${dayLabel}`;

  // Fetch cart and wish items
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

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: t.chatbot.welcome,
        time: getTime(),
      },
    ]);
  }, [t]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Send chat message
  const sendChatMessage = async (userInput: string) => {
    const sessionId = "user-session-id"; // 실제 필요에 따라 고유값으로 대체
    try {
      const res = await axiosInstance.post("http://52.79.241.142:8000/chat", {
        message: userInput,
        lang: "KR",
        item_ids: selectedCompareItems,
        session_id: sessionId,
      });
      const output = res.data.output || t.chatbot.response.default;
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
    }
  };

  // Handle input submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendChatMessage(input.trim());
    setInput("");
    if (mode === "compare") {
      setCompareModeStarted(true);
    }
  };

  // Handle suggestion click (for recommend/compare)
  const handleSuggestionClick = (type: "recommend" | "compare") => {
    const userInput = t.chatbot.suggestions[type];
    sendChatMessage(userInput);
    setMode(type);
    setInput("");
    if (type === "compare") setCompareModeStarted(false);
  };

  // Handle select for compare items
  const handleCompareSelect = (itemId: number) => {
    setSelectedCompareItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Compare intro text
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
        {/* Render all messages */}
        {messages.map((msg, idx) => (
          <MessageWrapper key={idx}>
            <ChatMessage
              sender={msg.sender}
              text={msg.text}
              time={msg.time}
              botName={t.chatbot.botName}
            />
          </MessageWrapper>
        ))}

        {/* Initial suggestions */}
        {mode === "default" && messages.length === 1 && (
          <ChatSuggestions
            recommendLabel={t.chatbot.suggestions.recommend}
            compareLabel={t.chatbot.suggestions.compare}
            onSelect={handleSuggestionClick}
          />
        )}

        {/* Compare mode: intro and checklist */}
        {mode === "compare" && !compareModeStarted && (
          <>
            {compareIntro}
            <ChatItemList
              title={t.compare.cartList}
              items={cartItems.map((item) => ({
                ...item,
                checked: selectedCompareItems.includes(item.id),
              }))}
              selectedIds={selectedCompareItems}
              onToggle={handleCompareSelect}
            />
            <ChatItemList
              title={t.compare.wishlist}
              items={wishItems.map((item) => ({
                ...item,
                checked: selectedCompareItems.includes(item.id),
              }))}
              selectedIds={selectedCompareItems}
              onToggle={handleCompareSelect}
            />
          </>
        )}
      </ChatContent>
      <ChatInputBox
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onSubmit={handleSubmit}
      />
    </ChatPageContainer>
  );
}
