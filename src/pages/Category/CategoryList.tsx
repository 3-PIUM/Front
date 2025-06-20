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
  padding: 0 1rem;
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
  const [pages, setPages] = useState(0);

  const Category = categoryName || "";
  const Subcategory = subcategoryName || "";

  const selectedCategory = t.category.categoryname.find(
    (cat: { name: string; items: string[] }) => cat.name === Category
  );

  const [items, setItems] = useState<ItemType[]>([]);
  const [sortedItems, setSortedItems] = useState<ItemType[]>([]);

  const navigate = useNavigate();

  const [selectedSort, setSelectedSort] = useState(
    t.category.sorted.recommended ?? "Recommended"
  );
  const [openModal, setOpenModal] = useState(false);

  const handleShowSorts = () => {
    setOpenModal(true);
  };

  const sortItems = (items: any[], sortType: string) => {
    if (sortType === t.category.sorted.lowPrice) {
      return [...items].sort((a, b) => a.salePrice - b.salePrice);
    }

    if (sortType === t.category.sorted.highDiscount) {
      return [...items].sort((a, b) => {
        const discountA = a.originalPrice
          ? (1 - a.salePrice / a.originalPrice) * 100
          : 0;
        const discountB = b.originalPrice
          ? (1 - b.salePrice / b.originalPrice) * 100
          : 0;
        return discountB - discountA;
      });
    }

    return items; // 추천순 (기본)
  };

  const fetchSubcategory = async () => {
    try {
      const endpoint = isVegan
        ? `item/vegan/list/${Subcategory}` // 비건용 API
        : `item/list/${Subcategory}`; // 일반 API

      const response = await axiosInstance.get(endpoint, {
        params: {
          page: pages,
        },
      });

      const data = response.data.result;
      const item = data.itemSearchInfoDTOs;
      setItems(item);
    } catch (error) {
      console.log("서브카테고리 불러오기 실패", error);
    }
  };

  useEffect(() => {
    fetchSubcategory();
  }, [pages]);

  useEffect(() => {
    const newSorted = sortItems(items, selectedSort);
    setSortedItems(newSorted);
  }, [items, selectedSort]);

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

  console.log(items);

  return (
    <Wrap>
      <Header />
      <TextIconHeader pageName={Category} isVegan={topClicked === "vegan"} />
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
        <SelectMenu />
      </MenuWrap>
      <SortWrap>
        <SortOptions onClick={handleShowSorts}>
          <SortValue>{selectedSort}</SortValue>
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
      <MainWrap>
        <ItemWrap>
          {sortedItems.map(
            (item: {
              itemImage: string;
              itemName: string;
              salePrice: number;
              id: number;
              originalPrice: number;
              wishStatus: boolean;
            }) => (
              <ItemCard
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
            )
          )}
        </ItemWrap>
      </MainWrap>
    </Wrap>
  );
}
