import { styled } from "styled-components";

const RecommandTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 600;
  font-size: 1.3rem;
  letter-spacing: 0.1rem;
`;

export default function ItemListTitle({ title }: { title: string }) {
  return (
    <>
      <RecommandTitle>{title}</RecommandTitle>
    </>
  );
}
