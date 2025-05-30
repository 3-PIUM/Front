import styled from "styled-components";
import colors from "../styles/colors";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  gap: 1rem;
  justify-content: center;
  height: 1.875rem;
  padding-right: 1rem;
  margin-top: 2rem;
`;

interface StepProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepProps) {
  return (
    <Wrapper>
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          style={{
            width: "0.625rem",
            height: "0.625rem",
            borderRadius: "50%",
            backgroundColor:
              currentStep >= index + 1 ? colors.mainPink : colors.lightGrey,
          }}
        />
      ))}
    </Wrapper>
  );
}
