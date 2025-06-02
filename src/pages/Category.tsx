import styled from "styled-components";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import colors from "../styles/colors";
import categories from "../data/categories.json";
import { useRef, useState, useEffect } from "react";
import { VscChevronRight } from "react-icons/vsc";

console.log(categories);

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
`;

const Line = styled.hr`
  display: flex;
  border: none;
  background-color: ${colors.lightGrey};
  height: 0.5px;
  margin-top: 44px;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex: 1;
  margin-left: 35%;
`;

const CategoryItemList = styled.div`
  width: 35%;
  height: 100%;
  background-color: #f9f9f9;
  padding-bottom: 100px;
  position: fixed;
  left: 0;
`;

const CategoryItem = styled.li<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  height: 3.5rem;
  line-height: 3.5rem;
  font-family: ${({ $selected }) => ($selected ? 700 : 400)};
  color: ${({ $selected }) => ($selected ? colors.black : colors.mediumGrey)};
  font-size: 0.875rem;
  padding: 0 1rem;
  background-color: ${({ $selected }) =>
    $selected ? colors.white : "#f9f9f9"};
`;

const SubCategoryItemList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 1rem;
  gap: 1rem;
  padding-bottom: 100px;
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
  line-height: 3.5rem;
`;

const Title = styled.div`
  display: flex;
  font-weight: 700;
  font-size: 1rem;
`;

const Icon = styled.div`
  display: flex;
`;

const SubCategoryItem = styled.li`
  display: flex;
  height: 3rem;
  line-height: 3rem;
  font-size: 0.875rem;
`;

export default function Category() {
  const [clicked, setClicked] = useState("스킨케어");
  const selected = categories.find((c) => c.name === clicked);

  const refMap = useRef<Record<string, HTMLDivElement | null>>({});

  // ✅ 스크롤 위치 기준으로 화면 중앙과 가장 가까운 블록 찾기
  useEffect(() => {
    const onScroll = () => {
      const middle = window.innerHeight * 0.3;

      let closestCategory = clicked;
      let minDistance = Infinity;

      categories.forEach((cat) => {
        const el = refMap.current[cat.name];
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top - middle);

          if (distance < minDistance) {
            minDistance = distance;
            closestCategory = cat.name;
          }
        }
      });

      if (closestCategory !== clicked) {
        setClicked(closestCategory);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [clicked]);

  return (
    <Wrap>
      <Header />
      <PageTitle pageName="카테고리" />
      <Line />
      <CategoryWrapper>
        <CategoryItemList>
          <ul>
            {categories.map((category) => (
              <>
                <CategoryItem
                  key={category.id}
                  $selected={clicked === category.name}
                  onClick={() => setClicked(category.name)}
                >
                  {category.name}
                </CategoryItem>
              </>
            ))}
          </ul>
        </CategoryItemList>
        <SubCategoryItemList>
          {categories.map((category) => (
            <div
              key={category.id}
              ref={(el) => {
                if (el) {
                  refMap.current[category.name] = el;
                }
              }}
            >
              <Label>
                <Title>{category.name}</Title>
                <Icon>
                  <VscChevronRight fontSize={"1.5rem"} />
                </Icon>
              </Label>
              {category.items.map((item) => (
                <SubCategoryItem key={item}>{item}</SubCategoryItem>
              ))}
            </div>
          ))}
        </SubCategoryItemList>
      </CategoryWrapper>
    </Wrap>
  );
}
