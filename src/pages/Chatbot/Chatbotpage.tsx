import styled from "styled-components";
import { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import TextHeader from "../../components/common/TextHeader";
import profileImg from "../../assets/images/surveyImage.png";
import { useLocale } from "../../context/LanguageContext";

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

const SuggestionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SuggestionButton = styled.button`
  background-color: #ffe4ec;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  color: #111;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  align-items: center;
  justify-content: center;
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
      <TextHeader pageName={t.chatbot.pageTitle} />
      <ChatContent>
        <DateText>{formattedDate}</DateText>
        {messages.map((msg, idx) => (
          <MessageRow key={idx} isUser={msg.sender === "user"}>
            {msg.sender === "bot" && (
              <BotRow>
                <BotImage src={profileImg} alt="bot" />
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
                    text: `원하시는 제품을 추천해드릴게요!
피부 타입이나 고민, 원하는 제품 타입을 알려주세요 😊`,
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
              추천 받기
            </div>
            <div
              onClick={() => {
                setMode("compare");
                setMessages((prev) => [
                  ...prev,
                  {
                    sender: "bot",
                    text: "피부비교 챗봇",
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
              상품 비교하기
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
              안녕하세요, 피움 챗봇입니다 💕 <br />
              장바구니와 찜 목록의 상품을 간편하게 비교해보세요.
              <br />
              항목: 가격, 성분, 비건 여부, 브랜드, 리뷰
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
                장바구니 목록
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
                찜 목록
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
          placeholder="메시지를 입력하세요"
        />
        <SendButton type="submit" onClick={handleSubmit}>
          <FiSend />
        </SendButton>
      </InputContainer>
    </ChatPageContainer>
  );
}
