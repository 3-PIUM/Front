import { useEffect, useState } from "react";
import styled from "styled-components";
import TextHeader from "../../components/common/TextHeader";
import ImageUploadList from "../../components/review/ImageUploadList";
import { useNavigate, useLocation } from "react-router-dom";
import TermsToggle from "../../components/common/TermsToggle";
import Header from "../../components/common/Header";
import { useLocale } from "../../context/LanguageContext";
import ReviewSurveySelector from "../../components/review/ReviewSurveySelector";
import axiosInstance from "../../api/axiosInstance";

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
  margin-top: 0.5rem;
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

const SurveySection = styled.div`
  margin-bottom: 2rem;
`;

const ReviewWritePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLocale();

  const editingReview = location.state?.editReview;
  const itemId = new URLSearchParams(location.search).get("itemId");

  const [rating, setRating] = useState(editingReview?.rating || 0);
  const [text, setText] = useState(editingReview?.content || "");
  const [images, setImages] = useState<(string | undefined)[]>(
    editingReview?.images?.length
      ? [...editingReview.images, undefined, undefined, undefined].slice(0, 4)
      : [undefined, undefined, undefined, undefined]
  );
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, string>>(
    editingReview?.surveyAnswers || {}
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  interface Question {
    id: string;
    title: string;
    options: string[];
  }

  const [surveyQuestions, setSurveyQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (!itemId) return;
    const fetchSurvey = async () => {
      try {
        const res = await axiosInstance.get(`/review/${itemId}/option`);
        const list: any[] = res.data.result.reviewOptionList;
        setSurveyQuestions(
          list.map((q) => ({
            id: q.name,
            title: q.name,
            options: q.options,
          }))
        );
      } catch (err) {
        console.error("설문 질문 불러오기 실패", err);
      }
    };
    fetchSurvey();
  }, [itemId]);

  const buildFormData = () => {
    const formData = new FormData();

    // Build reviewImages for edit, otherwise ignore
    const reviewImages = images
      .map((img, idx) => {
        if (!img) return null;
        if (editingReview?.images?.includes(img)) {
          return { type: "exist", url: img };
        }
        if (imageFiles[idx]) {
          return { type: "new" };
        }
        return null;
      })
      .filter((item): item is { type: string; url?: string } => item !== null);

    const payload: any = {
      content: text,
      rating,
      selectOptions: surveyQuestions
        .filter((q) => surveyAnswers[q.id])
        .map((q) => ({
          name: q.id,
          selectOption: surveyAnswers[q.id],
        })),
      ...(editingReview && { reviewImages }),
    };

    // Use correct key for data/editData
    const key = editingReview ? "editData" : "data";
    formData.append(key, JSON.stringify(payload));

    // For edit, use newImages; for register, use images
    imageFiles.forEach((file) => {
      if (file instanceof File) {
        const formKey = editingReview ? "newImages" : "images";
        formData.append(formKey, file);
      }
    });
    return formData;
  };

  const handleReviewEdit = async () => {
    const token = sessionStorage.getItem("accessToken");
    const reviewId = editingReview?.reviewId;
    if (!reviewId) return alert("리뷰 ID가 없습니다.");
    try {
      const res = await axiosInstance.patch(
        `/review/${reviewId}/edit`,
        buildFormData(),
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );
      const result = res.data.result;
      navigate(`/product-detail?itemId=${itemId}`, {
        state: { newReview: { ...result, isMyReview: true } },
      });
    } catch (err) {
      console.error("리뷰 수정 실패", err);
      alert("리뷰 수정 중 문제가 발생했습니다.");
    }
  };

  const handleReviewRegister = async () => {
    const token = sessionStorage.getItem("accessToken");
    try {
      await axiosInstance.post(`/review/${itemId}/create`, buildFormData(), {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      navigate(`/product-detail?itemId=${itemId}`);
    } catch (err) {
      console.error("리뷰 등록 실패", err);
      alert("리뷰 등록 중 문제가 발생했습니다.");
    }
  };

  const handleImageSelect = (file: File, index: number) => {
    const reader = new FileReader();
    reader.onload = () => {
      const newImages = [...images];
      newImages[index] = reader.result as string;
      setImages(newImages);

      const newFiles = [...imageFiles];
      newFiles[index] = file;
      setImageFiles(newFiles);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = undefined;
    setImages(newImages);

    const newFiles = [...imageFiles];
    newFiles[index] = null;
    setImageFiles(newFiles);
  };

  const handleSubmit = () => {
    if (!itemId) return alert("itemId가 없습니다");
    if (!text.trim()) return alert("리뷰 내용을 입력해주세요.");
    if (!rating) return alert("별점을 선택해주세요.");
    if (editingReview) {
      handleReviewEdit();
    } else {
      handleReviewRegister();
    }
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

        <SurveySection>
          <ReviewSurveySelector
            questions={surveyQuestions}
            onChange={setSurveyAnswers}
            initialAnswers={editingReview?.surveyAnswers || {}}
          />
        </SurveySection>

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
        <SubmitButton onClick={handleSubmit}>
          {editingReview ? "수정하기" : t.review.submit}
        </SubmitButton>
      </StickyFooter>
    </PageWrapper>
  );
};

export default ReviewWritePage;
