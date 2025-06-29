import styled from "styled-components";

interface Item {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: string;
  checked: boolean;
}

interface ChatItemListProps {
  title: string;
  items: Item[];
  selectedIds: number[];
  onToggle?: (id: number | undefined) => void;
}

const ListWrapper = styled.div`
  background: rgb(242, 242, 242);
  border-radius: 1rem;
  padding: 0.7rem;
  margin-top: 1rem;
  overflow: hidden;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.7rem;
`;

const ItemRow = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
  overflow: hidden;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 1px solid #cecece;
  border-radius: 50%;
  background-color: white;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    background-color: #f23477;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:checked::before {
    opacity: 1;
  }
`;

const ItemImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 0.75rem;
  margin-right: 1rem;
  object-fit: cover;
  background-color: #eee;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: bold;
  font-size: 0.875rem;
`;

const ItemBrand = styled.div`
  color: #666;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const ItemPrice = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.25rem;
`;

const ChatItemList = ({
  title,
  items,
  selectedIds,
  onToggle,
}: ChatItemListProps) => {
  return (
    <ListWrapper>
      <Title>{title}</Title>
      {items.map((item) => {
        const isChecked = selectedIds.includes(item.id);
        return (
          <ItemRow key={item.id}>
            {onToggle && (
              <Checkbox
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                  onToggle?.(item.id);
                }}
              />
            )}
            <ItemImage src={item.image} alt={item.name} />
            <ItemInfo>
              <ItemName>{item.name}</ItemName>
              <ItemBrand>{item.brand}</ItemBrand>
              <ItemPrice>{item.price}</ItemPrice>
            </ItemInfo>
          </ItemRow>
        );
      })}
    </ListWrapper>
  );
};

export default ChatItemList;
