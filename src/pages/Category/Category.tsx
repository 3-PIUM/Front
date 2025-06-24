import styled from "styled-components";
import Header from "../../components/common/Header";
import colors from "../../styles/colors";
import { useRef, useState, useEffect } from "react";
import { VscChevronRight } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useLocale } from "../../context/LanguageContext";
import React from "react";
import { FaLeaf } from "react-icons/fa";

const HeaderWrap = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  height: 3.5rem;
  background-color: ${colors.white};
  z-index: 100;
`;

const TopWrapper = styled.div<{ $isSelected: boolean }>`
  display: flex;
  width: 50%;
  line-height: 3.5rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: ${({ $isSelected }) =>
    $isSelected ? colors.mainPink : colors.lightGrey};
  border-bottom: ${({ $isSelected }) =>
    $isSelected ? "1px solid #F23477" : "none"};
`;

const IconWrapper = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  svg {
    color: ${({ selected }) => (selected ? "#6DBE45" : colors.lightGrey)};
  }
`;

const PageName = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 3.5rem;
  text-align: center;
`;

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
  margin-top: 60px;
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
  const defaultCategory = t?.category?.categoryname?.[0]?.name ?? "";
  const [clicked, setClicked] = useState(defaultCategory);
  const [topClicked, setTopClicked] = useState<string>("카테고리");

  const isVegan = topClicked === "비건 카테고리";

  const categoryList = isVegan
    ? t.category.veganCategoryname
    : t.category.categoryname;

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
    const base = isVegan ? "/vegan" : "/category";
    navigate(`${base}/${categoryName}/${subcategoryName}`);
  };

  useEffect(() => {
    const getTopClicked = sessionStorage.getItem("topClicked");
    const getCategoryName = sessionStorage.getItem("categoryName");

    if (getTopClicked) {
      if (getTopClicked === "vegan") {
        setTopClicked("비건 카테고리");
      } else {
        setTopClicked("카테고리");
      }
    }

    if (getCategoryName) {
      setTimeout(() => {
        setClicked(getCategoryName);
        const el = refMap.current[getCategoryName];
        if (el) {
          const top = el.offsetTop - 90;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 0);
    }
  }, []);

  return (
    <Wrap>
      <Header />
      <HeaderWrap>
        <TopWrapper
          $isSelected={topClicked === "카테고리"}
          onClick={() => {
            setTopClicked("카테고리");
            setClicked(categoryList?.[0]?.name);
          }}
        >
          <PageName>{t.category.pageTitle}</PageName>
        </TopWrapper>
        <TopWrapper
          $isSelected={topClicked === "비건 카테고리"}
          onClick={() => {
            setTopClicked("비건 카테고리");
            setClicked(categoryList?.[0]?.name);
          }}
        >
          <IconWrapper selected={isVegan}>
            <FaLeaf />
          </IconWrapper>
          <PageName>{t.category.veganTitle}</PageName>
        </TopWrapper>
      </HeaderWrap>
      <Line />
      <CategoryWrapper>
        <CategoryItemList>
          <ul>
            {t.category.categoryname.map(
              (item: { id: number; name: string; value?: string }) => (
                <React.Fragment key={item.id}>
                  <CategoryItem
                    $selected={clicked === item.name}
                    onClick={() => handleCategoryClick(item.name)}
                  >
                    {item.name}
                  </CategoryItem>
                </React.Fragment>
              )
            )}
          </ul>
        </CategoryItemList>
        <SubCategoryItemList>
          {t.category.categoryname.map(
            (
              item: {
                id: number;
                name: string;
                items: { label: string; value: string }[];
              },
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
                    key={subcategory.value}
                    onClick={() =>
                      handleSubCategoryClick(item.name, subcategory.value)
                    }
                  >
                    {subcategory.label}
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
