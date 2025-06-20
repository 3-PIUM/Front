import { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../../styles/colors";
import { useLocale } from "../../context/LanguageContext";
import SkinTypePrompt from "../SkinTypePrompt";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

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
  width: 100%;
`;

const Tab = styled.div<{ active: boolean }>`
  flex: 1;
  text-align: center;
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
interface IngredientWarningSummaryProps {
  itemId: number;
}
export default function IngredientWarningSummary({
  itemId,
}: IngredientWarningSummaryProps) {
  const { t } = useLocale();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);
  const [activeTab, setActiveTab] = useState<"sensitive" | "mySkin">(
    "sensitive"
  );
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isSkinRegistered, setIsSkinRegistered] = useState<boolean>(true);

  // Show all tags state
  const [showAll, setShowAll] = useState(false);

  // 사용자 피부 정보 조회
  useEffect(() => {
    const fetchUserSkin = async () => {
      try {
        const res = await axiosInstance.get("/member");
        const skinType = res.data.result.skinType;
        console.log("📌 [fetchUserSkin] 추출된 skinType:", skinType);
        if (!skinType) {
          setIsSkinRegistered(false);
        }
      } catch (err) {
        console.error("사용자 피부 정보 조회 실패", err);
        setIsSkinRegistered(false);
      }
    };
    if (activeTab === "mySkin") fetchUserSkin();
  }, [activeTab]);

  // 성분 API 호출
  useEffect(() => {
    const fetchIngredients = async () => {
      if (!itemId) return;
      try {
        const res = await axiosInstance.get(`/item/${itemId}/caution`);
        const data = res.data.result.cautionIngredients;

        if (activeTab === "sensitive") {
          // 모든 성분을 하나로 묶고 중복 제거
          const flat: Ingredient[] = data.map((d: any) => ({
            name: d.ingredientName,
            risks: d.cautionSkinType,
          }));
          setIngredients(flat);
        } else if (activeTab === "mySkin") {
          const res2 = await axiosInstance.get("/member");
          const mySkin = res2.data.result.skinType;

          if (!mySkin) return;

          const filtered = data
            .filter((d: any) => d.cautionSkinType.includes(mySkin))
            .map((d: any) => ({
              name: d.ingredientName,
              risks: d.cautionSkinType,
            }));

          setIngredients(filtered);
        }
      } catch (err) {
        console.error("주의 성분 불러오기 실패", err);
      }
    };
    fetchIngredients();
  }, [itemId, activeTab]);

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
        <>
          <TagContainer>
            {ingredients
              .slice(0, showAll ? ingredients.length : 6)
              .map((item, idx) => (
                <Tag key={idx} onClick={() => setSelectedIngredient(item)}>
                  {item.name}
                </Tag>
              ))}
          </TagContainer>
          {ingredients.length > 6 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "0rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "1px",
                  backgroundColor: "#ddd",
                  width: "100%",
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  zIndex: 0,
                }}
              />
              <button
                onClick={() => setShowAll(!showAll)}
                style={{
                  background: "#fff",
                  borderRadius: "50%",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                  border: "none",
                  width: "34px",
                  height: "34px",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "1",
                    color: "#F23477",
                  }}
                >
                  {showAll ? "▲" : "▼"}
                </span>
              </button>
            </div>
          )}
        </>
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
