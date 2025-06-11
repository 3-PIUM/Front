import styled from "styled-components";
import Header from "../../components/common/Header";
import PageTitle from "../../components/common/PageTitle";
import colors from "../../styles/colors";
import categories from "../../data/categories.json";
import { useRef, useState, useEffect } from "react";
import { VscChevronRight } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useLocale } from "../../context/LanguageContext";

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
  font-weight: ${({ $selected }) => ($selected ? 700 : 400)};
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

const Divider = styled.hr`
  display: flex;
  border: none;
  background-color: ${colors.lightGrey};
  height: 0.5px;
  margin: 0.5rem 0;
  width: 100%;
`;

export default function Category() {
  const { t } = useLocale();
  const [clicked, setClicked] = useState(t.category.categoryname[0].name);

  const selected = t.category.categoryname.find(
    (c: { id: number; name: string; items: string[] }) => c.name === clicked
  );

  const refMap = useRef<Record<string, HTMLDivElement | null>>({});

  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const categoryList = t.category.categoryname;
      const scrollTop = window.scrollY;
      const scrollBottom = scrollTop + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      if (scrollTop === 0) {
        const first = categoryList[0];
        if (first && clicked !== first.name) {
          setClicked(first.name);
        }
        return;
      }

      if (scrollBottom >= pageHeight - 1) {
        const last = categoryList[categoryList.length - 1];
        if (last && clicked !== last.name) {
          setClicked(last.name);
        }
        return;
      }

      const middle = window.innerHeight * 0.3;
      let currentCategory = clicked;
      let minDistance = Infinity;

      for (let i = 0; i < categoryList.length; i++) {
        const cat = categoryList[i];
        const el = refMap.current[cat.name];
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top - middle);

          if (distance < minDistance) {
            minDistance = distance;
            currentCategory = cat.name;
          }
        }
      }

      if (currentCategory !== clicked) {
        setClicked(currentCategory);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [clicked, t]);

  const handleCategoryClick = (categoryName: string) => {
    setClicked(categoryName);
    const el = refMap.current[categoryName];
    if (el) {
      const top = el.offsetTop - 90;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  const handleSubCategoryClick = (
    categoryName: string,
    subcategoryName: string
  ) => {
    const encodedCategory = encodeURIComponent(categoryName);
    const encodedSubCategory = encodeURIComponent(subcategoryName);
    navigate(`/category/${encodedCategory}/${encodedSubCategory}`);
  };

  return (
    <Wrap>
      <Header />
      <PageTitle pageName={t.category.pageTitle} />
      <Line />
      <CategoryWrapper>
        <CategoryItemList>
          <ul>
            {t.category.categoryname.map(
              (item: { id: number; name: string; items: string[] }) => (
                <>
                  <CategoryItem
                    key={item.name}
                    $selected={clicked === item.name}
                    onClick={() => {
                      setClicked(item.name);
                      handleCategoryClick(item.name);
                    }}
                  >
                    {item.name}
                  </CategoryItem>
                </>
              )
            )}
          </ul>
        </CategoryItemList>
        <SubCategoryItemList>
          {t.category.categoryname.map(
            (
              item: { id: number; name: string; items: string[] },
              index: number
            ) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) {
                    refMap.current[item.name] = el;
                  }
                }}
              >
                <Label>
                  <Title>{item.name}</Title>
                  <Icon>
                    <VscChevronRight fontSize={"1.5rem"} />
                  </Icon>
                </Label>
                {item.items.map((subcategory) => (
                  <SubCategoryItem
                    key={subcategory}
                    onClick={() => {
                      handleSubCategoryClick(item.name, subcategory);
                      refMap.current[item.name]?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    {subcategory}
                  </SubCategoryItem>
                ))}
                {index !== t.category.categoryname.length - 1 && <Divider />}
              </div>
            )
          )}
        </SubCategoryItemList>
      </CategoryWrapper>
    </Wrap>
  );
}
