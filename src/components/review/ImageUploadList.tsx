// ImageUploadList.tsx
import styled from "styled-components";
import ImageUploadBox from "./ImageUploadBox";

interface ImageUploadListProps {
  images: (string | undefined)[];
  onImageSelect: (file: File, index: number) => void;
  onDeleteImage: (index: number) => void;
}

const Container = styled.div`
  display: flex;
  gap: 12px;
`;

const ImageUploadList = ({
  images,
  onImageSelect,
  onDeleteImage,
}: ImageUploadListProps) => {
  return (
    <Container>
      {images.map((img, idx) => (
        <ImageUploadBox
          key={idx}
          index={idx}
          imageUrl={img}
          onImageSelect={onImageSelect}
          onDeleteImage={onDeleteImage}
        />
      ))}
    </Container>
  );
};

export default ImageUploadList;
