import { useEffect, useState } from "react";
import styled from "styled-components";
import TextHeader from "../../components/common/TextHeader";
import ImageUploadList from "../../components/review/ImageUploadList";
import { useNavigate, useLocation } from "react-router-dom";
import TermsToggle from "../../components/common/TermsToggle";
import Header from "../../components/common/Header";
import { useLocale } from "../../context/LanguageContext";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-top: 4rem;
`;

const StickyFooter = styled.div`
  position: sticky;
  bottom: 5rem;
  padding: 1rem 1rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 0.5rem 0 1rem;
`;

const StarRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 32px;
  color: #ccc;
  margin-bottom: 1.5rem;
`;

const Star = styled.span<{ active: boolean }>`
  color: ${({ active }) => (active ? "#FFD700" : "#ccc")};
  cursor: pointer;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
  font-size: 14px;
  margin-bottom: 1.2rem;
`;

const InfoText = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 0.5rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #ff4081;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  padding: 1rem;
  border: none;
  border-radius: 1.25rem;
  margin-top: 2rem;
`;

const ReviewWritePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLocale();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const editingReview = location.state?.editReview;

  const [rating, setRating] = useState(editingReview?.rating || 0);
  const [text, setText] = useState(editingReview?.content || "");
  const [images, setImages] = useState<(string | undefined)[]>(
    editingReview?.images?.length
      ? [...editingReview.images, undefined, undefined, undefined].slice(0, 4)
      : [undefined, undefined, undefined, undefined]
  );

  const handleSubmit = () => {
    if (rating && text) {
      const review = {
        username: "나**",
        date: new Date().toISOString().split("T")[0],
        rating,
        content: text,
        images: images.filter(Boolean) as string[],
        likes: editingReview?.likes || 0,
        isMyReview: true,
      };
      navigate("/product-detail", { state: { newReview: review } });
    } else {
      alert(t.review.alert);
    }
  };

  const handleImageSelect = (file: File, index: number) => {
    const reader = new FileReader();
    reader.onload = () => {
      const newImages = [...images];
      newImages[index] = reader.result as string;
      setImages(newImages);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = undefined;
    setImages(newImages);
  };

  return (
    <PageWrapper>
      <Header />
      <TextHeader pageName={t.review.writePageTitle} />

      <ContentWrapper>
        <StarRow>
          {[1, 2, 3, 4, 5].map((n) => (
            <Star key={n} active={n <= rating} onClick={() => setRating(n)}>
              ★
            </Star>
          ))}
        </StarRow>

        <Label>{t.review.reviewLabel}</Label>
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.review.reviewPlaceholder}
        />

        <Label>{t.review.photoLabel}</Label>
        <ImageUploadList
          images={images}
          onImageSelect={handleImageSelect}
          onDeleteImage={handleDeleteImage}
        />
        <InfoText>{t.review.photoInfo}</InfoText>
        <Divider />
        <TermsToggle />
      </ContentWrapper>

      <StickyFooter>
        <SubmitButton onClick={handleSubmit}>{t.review.submit}</SubmitButton>
      </StickyFooter>
    </PageWrapper>
  );
};

export default ReviewWritePage;
