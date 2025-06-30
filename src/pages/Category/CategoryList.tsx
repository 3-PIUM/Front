import styled from "styled-components";
const VirtualRowWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  box-sizing: border-box;
  margin: 0 auto;

  @media (max-width: 450px) {
    gap: 2.4rem;
  }
  @media (max-width: 390px) {
    gap: 1.3rem;
  }

  @media (max-width: 375px) {
    gap: 0.8rem;
  }
`;
import Header from "../../components/common/Header";
import TextIconHeader from "../../components/common/TextIconHeader ";
import { useNavigate, useParams } from "react-router-dom";
import colors from "../../styles/colors";
import { useEffect, useRef, useState } from "react";
import { VscChevronDown } from "react-icons/vsc";
import SortedModal from "../../components/modal/SortedModal";
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
  width: 100%;
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

  if (topClicked) {
    sessionStorage.setItem("topClicked", topClicked);
  }

  if (categoryName) {
    sessionStorage.setItem("categoryName", categoryName);
  }

  if (subcategoryName) {
    sessionStorage.setItem("subcategoryName", subcategoryName);
  }

  const Category = categoryName || "";
  const Subcategory = subcategoryName || "";

  const selectedCategory = t.category.categoryname.find(
    (cat: { name: string; items: string[] }) => cat.name === Category
  );

  const [items, setItems] = useState<ItemType[]>([]);

  const navigate = useNavigate();

  const [selectedSort, setSelectedSort] = useState<string>("");

  const [openModal, setOpenModal] = useState(false);
  const [skinIssue, setSkinIssue] = useState<string>("전체");
  const [isLoading, setIsLoading] = useState(true);

  const handleShowSorts = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        const endpoint = isVegan
          ? `item/vegan/list/${Subcategory}`
          : `item/list/${Subcategory}`;

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

        setTimeout(() => setIsLoading(false), 500);
      } catch (error) {
        console.log("서브카테고리 불러오기 실패", error);
      }
    };

    fetchSubcategory();
  }, [skinIssue, selectedSort]);

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
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0 });
    }
  }, [skinIssue, selectedSort, Subcategory]);

  const containerRef = useRef<HTMLDivElement>(null);

  const ROW_HEIGHT = 180;
  const rowCount = Math.ceil(items.length / 3);
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => containerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 1,
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
      <MainWrap ref={containerRef}>
        <div
          style={{
            position: "relative",
            height: rowCount * ROW_HEIGHT,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const startIndex = virtualRow.index * 3;
            const visibleItems = items.slice(startIndex, startIndex + 3);

            console.log(
              `렌더링되는 row ${virtualRow.index}:`,
              visibleItems.map((item) => item.itemName)
            );

            return (
              <VirtualRowWrapper
                key={virtualRow.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
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
                    isLoading={isLoading}
                  />
                ))}
              </VirtualRowWrapper>
            );
          })}
        </div>
      </MainWrap>
    </Wrap>
  );
}
