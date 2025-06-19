import styled from "styled-components";
import Header from "../../components/common/Header";
import TextHeader from "../../components/common/TextHeader";
import Button from "../../components/common/Button";
import colors from "../../styles/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UploadWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const UploadTitle = styled.label`
  display: flex;
  margin-top: 6rem;
  padding: 0.7rem 2rem;
  background-color: ${colors.subPink};
  color: ${colors.mainPink};
  border-radius: 1.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
`;

const UploadInput = styled.input`
  display: none;
`;

const PreviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewImage = styled.img`
  display: flex;
  margin-top: 2rem;
  max-width: 60%;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 2rem 1rem;
`;

export default function PersonalTest() {
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handleGoResult = () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    navigate("/personal-result");
  };

  return (
    <Wrap>
      <Header />
      <TextHeader pageName="퍼스널 진단" />
      <ContentWrapper>
        <UploadWrapper>
          <UploadTitle htmlFor="personalimg">이미지 업로드하기</UploadTitle>
          <UploadInput
            type="file"
            accept="image/*"
            id="personalimg"
            onChange={handleFileSelect}
            style={{ width: "min-content" }}
          />
        </UploadWrapper>
        {preview && (
          <PreviewWrapper>
            <PreviewImage src={preview} alt="미리보기" />
          </PreviewWrapper>
        )}
      </ContentWrapper>
      <ButtonWrapper>
        <Button
          label="결과 보기"
          onClick={() => {
            handleGoResult;
          }}
        />
      </ButtonWrapper>
    </Wrap>
  );
}
