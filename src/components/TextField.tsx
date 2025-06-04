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
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextField({
  fieldName,
  width,
  type,
  value,
  onChange,
}: TextFieldProps) {
  return (
    <>
      <Wrap>
        <FieldName>{fieldName}</FieldName>
        <InputField
          width={width}
          type={type}
          value={value}
          onChange={onChange}
        />
      </Wrap>
    </>
  );
}
