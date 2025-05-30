import styled from "styled-components";
import InputField from "./InputField";

const Wrap = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: ${({ width }) => width || "100%"};
`;

const FieldName = styled.div`
  display: flex;
  font-size: 1rem;
`;

interface TextFieldProps {
  fieldName: string;
  width?: string;
  type: "password" | "text";
}

export default function TextField({ fieldName, width, type }: TextFieldProps) {
  return (
    <>
      <Wrap>
        <FieldName>{fieldName}</FieldName>
        <InputField width={width} type={type} />
      </Wrap>
    </>
  );
}
