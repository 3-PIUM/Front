import styled from "styled-components";
import Header from "../../components/common/Header";
import TextIconHeader from "../../components/common/TextIconHeader ";
import { useNavigate, useParams } from "react-router-dom";
import colors from "../../styles/colors";
import { useEffect, useState } from "react";
import { VscChevronDown } from "react-icons/vsc";
import SortedModal from "../../components/model/SortedModal";
import { useLocale } from "../../context/LanguageContext";
import SelectMenu from "./SelectMenu";
import axios from "axios";
import ItemCard from "../../components/product/ItemCard";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

const SubCategoryWrap = styled.div`
  margin: 0 1rem;
  margin-top: 44px;
  position: fixed;
  background-color: ${colors.white};
  z-index: 60;
`;

const SubCategoryList = styled.div`
  overflow-x: auto;
  width: 100%;
  font-size: 0.875rem;

  // 스크롤바 안 보이게
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const SubCategoryUl = styled.ul`
  display: flex;
  width: max-content;
  margin-top: 0.5rem;
  flex-wrap: nowrap;
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
  padding-top: 5.5rem;
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

export default function CategoryList() {
  const { t } = useLocale();
  const { categoryName, subcategoryName } = useParams();
  const [pages, setPages] = useState(0);
  const [items, setItems] = useState([]);

  const Category = categoryName || "";
  const Subcategory = subcategoryName || "";

  const selectedCategory = t.category.categoryname.find(
    (cat: { name: string; items: string[] }) => cat.name === Category
  );

  const navigate = useNavigate();

  const [selectedSort, setSelectedSort] = useState(
    t.category.sorted.recommended ?? "Recommended"
  );
  const [openModal, setOpenModal] = useState(false);

  const handleShowSorts = () => {
    setOpenModal(true);
  };

  const fetchSubcategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/item/list/${Subcategory}`,
        {
          params: {
            page: pages,
          },
        }
      );
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

  console.log(items);

  return (
    <Wrap>
      <Header />
      <TextIconHeader pageName={Category} />
      <SubCategoryWrap>
        <SubCategoryList>
          <SubCategoryUl>
            {selectedCategory?.items.map(
              (item: { label: string; value: string }) => (
                <SubCategoryLi
                  $selected={item.value === Subcategory}
                  onClick={() =>
                    navigate(
                      `/category/${encodeURIComponent(
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
          {items.map(
            (item: {
              itemImage: string;
              itemName: string;
              salePrice: number;
              id: number;
              originalPrice: number;
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
              />
            )
          )}
        </ItemWrap>
      </MainWrap>
    </Wrap>
  );
}
