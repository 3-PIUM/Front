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
import { useNavigate } from "react-router-dom";
import ChatRecommendList from "../../components/chatbot/ChatRecommendList";

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
  const navigate = useNavigate();
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
  const [showExitModal, setShowExitModal] = useState(false);
  const [recommendList, setRecommendList] = useState<any[]>([]);

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const handleBrowserNav = (_e: PopStateEvent) => {
    setShowExitModal(true);
    history.pushState(null, "", location.href);
  };

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
        const processedItems = items.map((item: any) => ({
          id: item.itemId,
          name: item.itemName,
          brand: item.brand,
          price: `${item.salePrice.toLocaleString()}${t.productDetail.won}`,
          image: item.mainImageUrl,
          checked: false,
        }));
        setCartItems(processedItems);
      } catch (err) {
        console.error("장바구니 불러오기 실패", err);
      }
    };
    const fetchWishItems = async () => {
      try {
        const res = await axiosInstance.get("/wishlist/items");
        const items = res.data?.result || [];
        const processedWish = items.map((entry: any) => ({
          id: entry.item.itemId,
          name: entry.item.itemName,
          brand: entry.item.brand,
          price: `${entry.item.salePrice.toLocaleString()}${
            t.productDetail.won
          }`,
          image: entry.item.mainImageUrl,
          checked: false,
        }));
        setWishItems(processedWish);
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
      const welcomeMsg: Message = {
        sender: "bot",
        text: t.chatbot.welcome,
        time: getTime(),
      };
      setMessages([welcomeMsg]);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [t]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBrowserNav);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleBrowserNav);
    };
  }, []);

  const resetChat = () => {
    setMessages([
      {
        sender: "bot",
        text: t.chatbot.welcome,
        time: getTime(),
      },
    ]);
    setSelectedCompareItems([]);
    setMode("default");
    setCompareModeStarted(false);
  };

  const sendChatMessage = async (userInput: string) => {
    const sessionId = "user-session-id";
    const lang = t.lang || "KR";
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/chat/message", {
        message: userInput,
        lang: lang,
        item_ids: selectedCompareItems,
        session_id: sessionId,
      });
      const output = res.data.result.output || t.chatbot.response.default;
      const itemList = res.data.result.itemList || [];
      setRecommendList(itemList);
      console.log(output);

      setMessages((prev) => {
        const updated: Message[] = [
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
        ];
        return updated;
      });
      if (mode === "compare" && !compareModeStarted) {
        setCompareModeStarted(true);
      }
    } catch (err) {
      setMessages((prev) => {
        const updated: Message[] = [
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
        ];
        return updated;
      });
    } finally {
      setIsLoading(false);
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
    const botMessage: Message = {
      sender: "bot",
      text: userInput,
      time: getTime(),
    };
    setMessages((prev) => [...prev, botMessage]);
    setMode(type);
    setInput("");
    if (type === "compare") setCompareModeStarted(false);
  };

  const handleCompareSelect = (itemId: number | undefined) => {
    if (itemId === undefined) return;
    setSelectedCompareItems((prev) => {
      const updated = prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId];
      console.log("✅ 상품 선택 토글됨:", itemId);
      console.log("🆕 업데이트된 선택 목록:", updated);
      return updated;
    });
  };

  useEffect(() => {
    console.log("🛒 선택된 상품 ID 목록:", selectedCompareItems);
  }, [selectedCompareItems]);

  useEffect(() => {
    if (mode === "default" && messages.length === 1) {
      console.log("✅ t.chatbot.suggestions: ", t.chatbot.suggestions);
    }
  }, [mode, messages, t]);

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
      {t.chatbot.compareIntro[1]}
      <br />
      {t.chatbot.compareIntro[2]}
    </div>
  );

  const recommendIntro = (
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
      {t.chatbot.recommendIntro[0]}
      <br />
      {t.chatbot.recommendIntro[1]}
      <br />
      {t.chatbot.recommendIntro[2]}
    </div>
  );

  return (
    <ChatPageContainer>
      <>
        <Header />
        <TextHeader pageName={t.chatbot.pageTitle} />
        <button
          onClick={resetChat}
          style={{
            position: "fixed",
            right: "0.7rem",
            padding: "0.4rem 0.75rem",
            backgroundColor: "transparent",
            color: "#F23477",
            borderRadius: "999px",
            border: "1px solid #F23477",
            fontSize: "0.75rem",
            fontWeight: 500,
            lineHeight: 1,
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          {t.chatbot.Replay}
        </button>
      </>
      <ChatContent>
        <DateText>{formattedDate}</DateText>

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

        {mode === "compare" && compareModeStarted && (
          <>
            <ChatItemList
              title={t.compare.cartList}
              items={cartItems.filter((item) =>
                selectedCompareItems.includes(item.id)
              )}
              selectedIds={selectedCompareItems}
              onToggle={handleCompareSelect}
            />
            <ChatItemList
              title={t.compare.wishlist}
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

        {messages.slice(2).map((msg, idx) => (
          <MessageWrapper key={idx + 2}>
            <ChatMessage
              sender={msg.sender}
              text={msg.text.replace(
                /\*\*(.*?)\*\*/g,
                (_, boldText) => `${boldText}`
              )}
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

        {mode === "recommend" && recommendList.length === 0 && recommendIntro}
        {mode === "recommend" && recommendList.length > 0 && (
          <ChatRecommendList items={recommendList} />
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
      {showExitModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "1rem",
              textAlign: "center",
              maxWidth: "90%",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
          >
            <p style={{ marginBottom: "1rem" }}>
              {t.chatbot.response.leavePage[0]}
              <br />
              {t.chatbot.response.leavePage[1]}
            </p>
            <button
              onClick={() => setShowExitModal(false)}
              style={{
                backgroundColor: "#ccc",
                color: "black",
                border: "none",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                marginRight: "0.5rem",
                minWidth: "100px",
                fontWeight: "bold",
              }}
            >
              {t.chatbot.response.cancel}
            </button>
            <button
              onClick={() => {
                setShowExitModal(false);
                window.removeEventListener("beforeunload", handleBeforeUnload);
                navigate("/");
              }}
              style={{
                backgroundColor: "#F23477",
                color: "white",
                border: "none",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                minWidth: "100px",
                fontWeight: "bold",
              }}
            >
              {t.chatbot.response.confirm}
            </button>
          </div>
        </div>
      )}
    </ChatPageContainer>
  );
}
