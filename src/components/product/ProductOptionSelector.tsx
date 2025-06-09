import { useState } from "react";
import styled from "styled-components";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { useLocale } from "../../context/LanguageContext";

interface ProductOption {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
}

interface ProductOptionSelectorProps {
  options: ProductOption[];
  onChange: (id: string) => void;
}

const Wrapper = styled.div`
  margin: 0 1rem 0.5rem;
`;

const SelectBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 0.6rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
`;

const OptionList = styled.ul`
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
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
    setSelected(id);
    onChange(id);
    setOpen(false);
  };

  const selectedOption = options.find((item) => item.id === selected);

  return (
    <Wrapper>
      <SelectBox
        onClick={toggle}
        style={{ borderColor: selected ? "#ff4081" : "#ddd" }}
      >
        {selectedOption ? (
          <span style={{ color: "#111" }}>{selectedOption.name}</span>
        ) : (
          <span style={{ color: "#aaa" }}>{t.productDetail.selectProduct}</span>
        )}
        {open ? <MdExpandLess size={15} /> : <MdExpandMore size={15} />}
      </SelectBox>

      {open && (
        <OptionList>
          {options.map((option) => (
            <OptionItem
              key={option.id}
              onClick={() => handleSelect(option.id)}
              style={{
                backgroundColor: option.id === selected ? "#f0f0f0" : "#fff",
                pointerEvents: option.id === selected ? "none" : "auto",
                opacity: option.id === selected ? 0.6 : 1,
              }}
            >
              <OptionImage src={option.imageUrl} alt={option.name} />
              <OptionInfo>
                <OptionName>{option.name}</OptionName>
              </OptionInfo>
              <Price>
                {option.price.toLocaleString()}
                {t.productDetail.won}
              </Price>
            </OptionItem>
          ))}
        </OptionList>
      )}
    </Wrapper>
  );
}
