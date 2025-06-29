import styled from "styled-components";
import Header from "../../components/common/Header";
import TextHeader from "../../components/common/TextHeader";
import Button from "../../components/common/Button";
import colors from "../../styles/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocale } from "../../context/LanguageContext";

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
  margin-top: 7rem;
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

const InfoWrapper = styled.img`
  display: flex;
  margin-top: 3rem;
  max-width: 70%;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 2rem 1rem;
`;

export default function PersonalTest() {
  const { t } = useLocale();
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isValidType =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isValidType) {
        alert("JPG 또는 PNG 형식의 이미지 파일만 업로드할 수 있습니다.");
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setSelectedFile(file);
    }
  };

  const handleGoResult = () => {
    const fetchTestPersonalColor = async () => {
      try {
        if (!selectedFile) {
          alert("이미지를 먼저 업로드해주세요.");
          return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await axios.post(
          "http://52.79.241.142:8000/predict-season",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const resultData = response.data;
        navigate("/personal-result", { state: resultData });
      } catch (err) {
        console.log("퍼스널컬러 api 연동에 실패했습니다", err);
      }
    };
    fetchTestPersonalColor();
    console.log("클릭됨");
  };

  return (
    <Wrap>
      <Header />
      <TextHeader pageName={t.colorTest.testTitle} />
      <ContentWrapper>
        <UploadWrapper>
          <UploadTitle htmlFor="personalimg">
            {t.colorTest.uploadImg}
          </UploadTitle>
          <UploadInput
            type="file"
            accept="image/jpeg, image/png"
            id="personalimg"
            onChange={handleFileSelect}
            style={{ width: "min-content" }}
          />
        </UploadWrapper>
        {preview ? (
          <PreviewWrapper>
            <PreviewImage src={preview} alt="미리보기" />
          </PreviewWrapper>
        ) : (
          <PreviewWrapper>
            <InfoWrapper
              src="/images/CharacterImg/testImage.png"
              alt="미리보기"
            />
          </PreviewWrapper>
        )}
      </ContentWrapper>
      <ButtonWrapper>
        <Button
          label={t.colorTest.goResult}
          onClick={() => {
            handleGoResult();
          }}
        />
      </ButtonWrapper>
    </Wrap>
  );
}
