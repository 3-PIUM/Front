import { lazy, Suspense } from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { useLocale } from "../../context/LanguageContext";
const TextHeader = lazy(() => import("../../components/common/TextHeader"));
const Header = lazy(() => import("../../components/common/Header"));

const ChatPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 93vh;
`;

const DateText = styled.div`
  text-align: center;
  font-size: 0.875rem;
  margin-bottom: 0.3rem;
  color: #666;
`;

const ChatContent = styled.div`
  flex: 1;
  padding: 4rem 1rem;
  overflow-y: auto;
  background-color: #fefefe;
`;

const MessageRow = styled.div<{ isUser: boolean }>`
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
  flex-direction: ${({ isUser }) => (isUser ? "row-reverse" : "column")};
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

const MessageBubble = styled.div<{ isUser: boolean }>`
  background-color: ${({ isUser }) => (isUser ? "#d2e3fc" : "#f2f2f2")};
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
  display: flex;
  padding: 0.75rem 1rem;
  border-top: 1px solid #e5e7eb;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 1rem;
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

  const dummyCartItems = [
    {
      id: 1,
      name: "물앤더 쥬시 래스팅 틴트",
      brand: "톤앤",
      price: "18,000원",
      image:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0015/A00000015062402ko.jpg?l=ko",
      checked: true,
    },
    {
      id: 2,
      name: "쿨앤 더 쥬시 래스팅 틴트",
      brand: "톤앤",
      price: "18,000원",
      image:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0015/A00000015062402ko.jpg?l=ko",
      checked: false,
    },
    {
      id: 3,
      name: "쿨앤 더 쥬시 래스팅 틴트",
      brand: "톤앤",
      price: "18,000원",
      image:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0015/A00000015062402ko.jpg?l=ko",
      checked: false,
    },
    {
      id: 4,
      name: "쿨앤 더 쥬시 래스팅 틴트",
      brand: "톤앤",
      price: "18,000원",
      image:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0015/A00000015062402ko.jpg?l=ko",
      checked: false,
    },
  ];

  const dummyWishItems = [
    {
      id: 5,
      name: "선샤인 글로우 틴트",
      brand: "톤앤",
      price: "18,000원",
      image:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0015/A00000015062402ko.jpg?l=ko",
      checked: false,
    },
    {
      id: 6,
      name: "레드벨벳 틴트",
      brand: "톤앤",
      price: "18,000원",
      image:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0015/A00000015062402ko.jpg?l=ko",
      checked: false,
    },
    {
      id: 7,
      name: "모브베리 글로시 립",
      brand: "톤앤",
      price: "18,000원",
      image:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0015/A00000015062402ko.jpg?l=ko",
      checked: false,
    },
    {
      id: 8,
      name: "코랄핑크 워터틴트",
      brand: "톤앤",
      price: "18,000원",
      image:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0015/A00000015062402ko.jpg?l=ko",
      checked: false,
    },
  ];
  const [selectedCompareItems, setSelectedCompareItems] = useState<number[]>(
    []
  );

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

    const userMessage: Message = {
      sender: "user",
      text: input,
      time: getTime(),
    };

    const response: Message = {
      sender: "bot",
      text: botReply(input),
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMessage, response]);
    setInput("");
  };

  return (
    <ChatPageContainer>
      <Suspense fallback={null}>
        <Header />
        <TextHeader pageName={t.chatbot.pageTitle} />
      </Suspense>
      <ChatContent>
        <DateText>{formattedDate}</DateText>
        {messages.map((msg, idx) => (
          <MessageRow key={idx} isUser={msg.sender === "user"}>
            {msg.sender === "bot" && (
              <BotRow>
                <BotImage src="images/CharacterImg/surveyImage.png" alt="bot" />
                <BotName>{t.chatbot.botName}</BotName>
              </BotRow>
            )}
            <BotRow>
              <MessageBubble isUser={msg.sender === "user"}>
                {msg.text}
              </MessageBubble>
              <TimeText>{msg.time}</TimeText>
            </BotRow>
          </MessageRow>
        ))}

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
                setMode("recommend");
                setMessages((prev) => [
                  ...prev,
                  {
                    sender: "bot",
                    text: `${t.chatbot.recommendText[0]}\n${t.chatbot.recommendText[1]}`,
                    time: getTime(),
                  },
                ]);
              }}
              style={{
                border: "1px solid #eee",
                borderRadius: "12px",
                padding: "1rem",
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
                setMode("compare");
                setMessages((prev) => [
                  ...prev,
                  {
                    sender: "bot",
                    text: t.chatbot.compareText,
                    time: getTime(),
                  },
                ]);
              }}
              style={{
                border: "1px solid #eee",
                borderRadius: "12px",
                padding: "1rem",
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

        {mode === "compare" && (
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
              {dummyCartItems.map((item, index) => (
                <div
                  style={{
                    borderBottom:
                      index !== dummyCartItems.length - 1
                        ? "1px solid #ddd"
                        : "none",
                  }}
                >
                  <div
                    key={item.id}
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
              {dummyWishItems.map((item, index) => (
                <div
                  style={{
                    borderBottom:
                      index !== dummyWishItems.length - 1
                        ? "1px solid #ddd"
                        : "none",
                  }}
                >
                  <div
                    key={item.id}
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

      <InputContainer onSubmit={handleSubmit}>
        <ChatInput
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.chatbot.placeholder}
        />
        <SendButton type="submit" onClick={handleSubmit}>
          <FiSend />
        </SendButton>
      </InputContainer>
    </ChatPageContainer>
  );
}
