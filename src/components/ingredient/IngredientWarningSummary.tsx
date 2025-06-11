import styled from "styled-components";
import { useState } from "react";
import colors from "../../styles/colors";
import { useLocale } from "../../context/LanguageContext";
import SkinTypePrompt from "../SkinTypePrompt";
import { useNavigate } from "react-router-dom";

// 스타일 정의
const Wrapper = styled.div`
  background-color: white;
  padding-top: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
`;

const Tab = styled.div<{ active: boolean }>`
  font-weight: bold;
  font-size: 15px;
  color: ${({ active }) => (active ? colors.mainPink : "#aaa")};
  border-bottom: ${({ active }) =>
    active ? `2px solid ${colors.mainPink}` : "none"};
  padding-bottom: 4px;
  cursor: pointer;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.div`
  padding: 0.4rem 0.9rem;
  background: #fff;
  border-radius: 999px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  font-size: 0.85rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  white-space: nowrap;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  width: 90%;
  max-width: 360px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.div`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const RiskItem = styled.div`
  font-size: 0.875rem;
  padding: 0.25rem 0;
  color: #333;
`;

const ModalClose = styled.div`
  margin-top: 1rem;
  font-size: 0.875rem;
  text-align: right;
  color: ${colors.mainPink};
  cursor: pointer;
`;

interface Ingredient {
  name: string;
  risks: string[];
}

export default function IngredientWarningSummary() {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);

  const [activeTab, setActiveTab] = useState<"sensitive" | "mySkin">(
    "sensitive"
  );
  const isSkinRegistered = localStorage.getItem("skinRegistered") === "true";

  const tabDataMap: Record<"sensitive" | "mySkin", Ingredient[]> = {
    sensitive: [
      { name: "호르몬 교란 가능성", risks: ["성분 A", "성분 B"] },
      { name: "알레르기", risks: ["성분 A", "성분 B"] },
      { name: "민감성", risks: ["성분 A", "성분 B"] },
      { name: "과민성", risks: ["성분 A", "성분 B"] },
      { name: "유당 불내증", risks: ["성분 A", "성분 B"] },
      { name: "모공 막힘", risks: ["성분 A", "성분 B"] },
    ],
    mySkin: [
      { name: "자극 유발", risks: ["성분 A", "성분 B"] },
      { name: "여드름 유발", risks: ["성분 A", "성분 B"] },
      { name: "색소침착 가능성", risks: ["성분 A", "성분 B"] },
    ],
  };

  const ingredients = tabDataMap[activeTab];

  return (
    <Wrapper>
      <Header>
        <Tabs>
          {(["mySkin", "sensitive"] as const).map((key) => (
            <Tab
              key={key}
              active={activeTab === key}
              onClick={() => setActiveTab(key)}
            >
              {t.ingredient.tab[key]}
            </Tab>
          ))}
        </Tabs>
      </Header>

      {/* 👇 조건 분기: "mySkin" 탭이고 isSkinRegistered가 false이면 SkinTypePrompt 표시 */}
      {activeTab === "mySkin" && !isSkinRegistered ? (
        <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
          <SkinTypePrompt
            onRegister={() => {
              localStorage.setItem("skinRegistered", "true");
              navigate("/mypage/skintype");
            }}
          />
        </div>
      ) : (
        <TagContainer>
          {ingredients.map((item, idx) => (
            <Tag key={idx} onClick={() => setSelectedIngredient(item)}>
              {item.name}
            </Tag>
          ))}
        </TagContainer>
      )}

      {selectedIngredient && (
        <ModalBackground onClick={() => setSelectedIngredient(null)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalTitle>
              {selectedIngredient.name}
              {t.ingredient.modalTitleSuffix}
            </ModalTitle>
            {selectedIngredient.risks.length > 0 ? (
              selectedIngredient.risks.map((risk, i) => (
                <RiskItem key={i}>- {risk}</RiskItem>
              ))
            ) : (
              <RiskItem>{t.ingredient.noRisks}</RiskItem>
            )}
            <ModalClose onClick={() => setSelectedIngredient(null)}>
              {t.ingredient.close}
            </ModalClose>
          </ModalBox>
        </ModalBackground>
      )}
    </Wrapper>
  );
}
