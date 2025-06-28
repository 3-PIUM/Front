import { useState } from "react";
import styled from "styled-components";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { useLocale } from "../../context/LanguageContext";

interface ProductOption {
  id: string;
  imageUrl: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
}

interface ProductOptionSelectorProps {
  options: ProductOption[];
  onChange: (id: string, name: string) => void;
}

const Wrapper = styled.div`
  margin: 0 1rem 0.5rem;
  position: relative;
`;

const SelectBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 0.6rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
`;

const OptionList = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  max-height: 55vh;
  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const OptionItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  background: #fff;

  &:hover {
    background-color: #f8f8f8;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const OptionImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 1rem;
`;

const OptionInfo = styled.div`
  flex: 1;
`;

const OptionName = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #222;
`;

const Price = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

export default function ProductOptionSelector({
  options,
  onChange,
}: ProductOptionSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  const toggle = () => setOpen((prev) => !prev);
  const handleSelect = (id: string) => {
    const option = options.find((opt) => opt.id === id);
    if (option) {
      setSelected(id);
      onChange(id, option.name);
      setOpen(false);
    }
  };

  const selectedOption = options.find((item) => item.id === selected);

  return (
    <Wrapper>
      <SelectBox
        onClick={options.length === 0 ? undefined : toggle}
        style={{
          borderColor: selected ? "#ff4081" : "#ddd",
          backgroundColor: options.length === 0 ? "#f5f5f5" : "#fff",
          color: options.length === 0 ? "#ccc" : "#333",
          cursor: options.length === 0 ? "not-allowed" : "pointer",
        }}
      >
        {selectedOption ? (
          <span style={{ color: "#111" }}>{selectedOption.name}</span>
        ) : (
          <span style={{ color: options.length === 0 ? "#ccc" : "#aaa" }}>
            {t.productDetail.selectProduct}
          </span>
        )}
        {open && options.length > 0 ? (
          <MdExpandLess size={15} />
        ) : (
          <MdExpandMore size={15} />
        )}
      </SelectBox>

      {open && options.length > 0 && (
        <OptionList>
          {options.map((option) => (
            <OptionItem
              key={option.id}
              onClick={() => handleSelect(option.id)}
              style={{
                backgroundColor: option.id === selected ? "#ffe6f0" : "#fff",
                fontWeight: option.id === selected ? "bold" : "normal",
              }}
            >
              <OptionImage src={option.imageUrl} alt={option.name} />
              <OptionInfo>
                <OptionName>{option.name}</OptionName>
              </OptionInfo>
              <Price>
                {option.discountRate > 0 && (
                  <>
                    <span style={{ color: "#ff4081", marginRight: "6px" }}>
                      {option.discountRate}%
                    </span>
                    {option.discountedPrice.toLocaleString()}
                    {t.productDetail.won}
                  </>
                )}
                {option.discountRate === 0 && (
                  <>
                    {option.discountedPrice.toLocaleString()}
                    {t.productDetail.won}
                  </>
                )}
              </Price>
            </OptionItem>
          ))}
        </OptionList>
      )}
    </Wrapper>
  );
}
