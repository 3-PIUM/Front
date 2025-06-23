import styled from "styled-components";
import Header from "../../components/common/Header";
import TextIconHeader from "../../components/common/TextIconHeader ";
import { useNavigate, useParams } from "react-router-dom";
import colors from "../../styles/colors";
import { useEffect, useRef, useState } from "react";
import { VscChevronDown } from "react-icons/vsc";
import SortedModal from "../../components/model/SortedModal";
import { useLocale } from "../../context/LanguageContext";
import SelectMenu from "./SelectMenu";
import ItemCard from "../../components/product/ItemCard";
import axiosInstance from "../../api/axiosInstance";
import { useVirtualizer } from "@tanstack/react-virtual";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

const SubCategoryWrap = styled.div`
  padding: 0 1rem;
  margin-top: 44px;
  position: fixed;
  background-color: ${colors.white};
  z-index: 60;

  overflow-x: auto;
  width: 100%;
  flex-wrap: wrap;
  font-size: 0.875rem;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SubCategoryList = styled.div`
  margin-right: 1rem;
`;

const SubCategoryUl = styled.ul`
  display: flex;
  width: max-content;
  margin-top: 0.5rem;
  flex-wrap: nowrap;
  &::after {
    content: "";
    flex: 0 0 1rem;
  }
`;

const SubCategoryLi = styled.li<{ $selected: boolean }>`
  width: max-content;
  display: flex;
  flex-wrap: nowrap;
  padding: 0.5rem;
  border-bottom: ${({ $selected }) => ($selected ? "2px solid black" : "none")};
  font-weight: ${({ $selected }) => ($selected ? 700 : 400)};
`;

const MenuWrap = styled.div`
  display: flex;
  margin-top: 5.5rem;
`;

const MainWrap = styled.div`
  padding: 0 1rem;
`;

const SortWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 1.5rem 1rem 1rem 1rem;
  position: sticky;
  top: 8rem;
  background-color: ${colors.white};
  z-index: 70;
  height: 2rem;
  align-items: center;
`;

const SortOptions = styled.div`
  display: flex;

  gap: 0.5rem;
`;

const SortValue = styled.div`
  font-size: 0.875rem;
  color: ${colors.darkGrey};
`;

const ItemWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 1rem;
  gap: 0.5rem;
`;

interface ItemType {
  itemImage: string;
  itemName: string;
  salePrice: number;
  id: number;
  originalPrice: number;
  wishStatus: boolean;
}

export default function CategoryList() {
  const { t } = useLocale();
  const { topClicked, categoryName, subcategoryName } = useParams();
  const isVegan = topClicked === "vegan";

  const Category = categoryName || "";
  const Subcategory = subcategoryName || "";

  const selectedCategory = t.category.categoryname.find(
    (cat: { name: string; items: string[] }) => cat.name === Category
  );

  const [items, setItems] = useState<ItemType[]>([]);
  // const [sortedItems, setSortedItems] = useState<ItemType[]>([]);

  const navigate = useNavigate();

  const [selectedSort, setSelectedSort] = useState<string>("");

  const [openModal, setOpenModal] = useState(false);
  const [skinIssue, setSkinIssue] = useState<string>("전체");

  const handleShowSorts = () => {
    setOpenModal(true);
  };

  // const sortItems = (items: any[], sortType: string) => {
  //   if (sortType === t.category.sorted.lowPrice) {
  //     return [...items].sort((a, b) => a.salePrice - b.salePrice);
  //   }

  //   if (sortType === t.category.sorted.highDiscount) {
  //     return [...items].sort((a, b) => {
  //       const discountA = a.originalPrice
  //         ? (1 - a.salePrice / a.originalPrice) * 100
  //         : 0;
  //       const discountB = b.originalPrice
  //         ? (1 - b.salePrice / b.originalPrice) * 100
  //         : 0;
  //       return discountB - discountA;
  //     });
  //   }

  //   return items; // 추천순 (기본)
  // };

  // const fetchSubcategory = async () => {
  //   try {
  //     const endpoint = isVegan
  //       ? `item/vegan/list/${Subcategory}` // 비건용 API
  //       : `item/list/${Subcategory}`; // 일반 API

  //     const params: any = {};
  //     if (skinIssue !== "전체") {
  //       params.skinIssue = skinIssue;
  //     }

  //     if (selectedSort !== "") {
  //       params.priceSort = selectedSort;
  //     }

  //     const response = await axiosInstance.get(endpoint, {
  //       params,
  //     });

  //     const data = response.data.result;
  //     const item = data.itemSearchInfoDTOs;
  //     setItems(item);
  //   } catch (error) {
  //     console.log("서브카테고리 불러오기 실패", error);
  //   }
  // };

  console.log(skinIssue);

  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        const endpoint = isVegan
          ? `item/vegan/list/${Subcategory}` // 비건용 API
          : `item/list/${Subcategory}`; // 일반 API

        const params: any = {};
        if (skinIssue !== "전체") {
          params.skinIssue = skinIssue;
        }

        if (selectedSort !== "") {
          params.priceSort = selectedSort;
        }

        const response = await axiosInstance.get(endpoint, {
          params,
        });

        const data = response.data.result;
        const item = data.itemSearchInfoDTOs;
        setItems(item);
      } catch (error) {
        console.log("서브카테고리 불러오기 실패", error);
      }
    };

    fetchSubcategory();
  }, [skinIssue, selectedSort]);

  // useEffect(() => {
  //   const newSorted = sortItems(items, selectedSort);
  //   setSortedItems(newSorted);
  // }, [items, selectedSort]);

  const subListRef = useRef<HTMLDivElement | null>(null);
  const selectedSubRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const listEl = subListRef.current;
    const selectedEl = selectedSubRef.current;

    if (listEl && selectedEl) {
      const listRect = listEl.getBoundingClientRect();
      const selectedRect = selectedEl.getBoundingClientRect();

      const offset =
        selectedEl.offsetLeft -
        listEl.offsetLeft -
        listRect.width / 2 +
        selectedRect.width / 2;

      listEl.scrollTo({
        left: offset,
        behavior: "smooth",
      });
    }
  }, [Subcategory]);

  useEffect(() => {
    // 스크롤 위치 초기화
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0 });
    }
  }, [skinIssue, selectedSort, Subcategory]);

  const containerRef = useRef<HTMLDivElement>(null); // 스크롤 영역

  //useVirtualizer 훅
  const rowVirtualizer = useVirtualizer({
    count: items.length, // 전체 아이템 개수
    getScrollElement: () => containerRef.current, // 스크롤 대상
    estimateSize: () => 180, // 아이템 하나의 높이
    overscan: 5,
  });

  return (
    <Wrap>
      <Header />
      <TextIconHeader
        pageName={Category}
        isVegan={topClicked === "vegan"}
        backPath="/category"
      />
      <SubCategoryWrap ref={subListRef}>
        <SubCategoryList>
          <SubCategoryUl>
            {selectedCategory?.items.map(
              (item: { label: string; value: string }) => (
                <SubCategoryLi
                  ref={item.value === Subcategory ? selectedSubRef : null}
                  $selected={item.value === Subcategory}
                  onClick={() =>
                    navigate(
                      `/${topClicked}/${encodeURIComponent(
                        Category
                      )}/${encodeURIComponent(item.value)}`
                    )
                  }
                  key={item.label}
                >
                  {item.label}
                </SubCategoryLi>
              )
            )}
          </SubCategoryUl>
        </SubCategoryList>
      </SubCategoryWrap>
      <MenuWrap>
        <SelectMenu onSelect={(name) => setSkinIssue(name)} />
      </MenuWrap>
      <SortWrap>
        <SortOptions onClick={handleShowSorts}>
          <SortValue>
            {t.category.sorted.find(
              (option: { value: string }) => option.value === selectedSort
            )?.name ?? t.category.sorted[0]?.name}
          </SortValue>
          <VscChevronDown fontSize={"1.2rem"} />
        </SortOptions>
      </SortWrap>

      {openModal && (
        <SortedModal
          closeModal={() => setOpenModal(false)}
          selectedSort={selectedSort}
          onSelectedSort={(sort) => {
            setSelectedSort(sort);
            setOpenModal(false);
          }}
        />
      )}
      <MainWrap
        ref={containerRef}
        style={{ overflowY: "auto", height: "40rem", gap: "1rem" }}
      >
        <div
          style={{
            position: "relative",
            height: rowVirtualizer.getTotalSize(),
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const startIndex = virtualRow.index * 3;
            const visibleItems = items.slice(startIndex, startIndex + 3);

            return (
              <div
                key={virtualRow.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "0.5rem",
                }}
              >
                {visibleItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    imageSource={item.itemImage}
                    itemName={item.itemName}
                    price={item.salePrice}
                    itemId={item.id}
                    discountRate={
                      item.originalPrice
                        ? Math.round(
                            (1 - item.salePrice / item.originalPrice) * 100
                          )
                        : 0
                    }
                    wishStatus={item.wishStatus}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </MainWrap>
    </Wrap>
  );
}
