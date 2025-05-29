import styled from "styled-components";
import { useRef } from "react";

interface ImageUploadBoxProps {
  onImageSelect: (file: File, index: number) => void;
  onDeleteImage: (index: number) => void;
  index: number;
  imageUrl?: string;
}

const Box = styled.div`
  width: 80px;
  height: 80px;
  background-color: #cfd3d7;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

const PlusIcon = styled.div`
  color: white;
  font-size: 24px;
`;

const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HiddenInput = styled.input`
  display: none;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -0px;
  right: 1px;
  width: 20px;
  height: 20px;
  background-color: #ff4081;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const ImageUploadBox = ({
  onImageSelect,
  onDeleteImage,
  index,
  imageUrl,
}: ImageUploadBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onImageSelect(e.target.files[0], index);
    }
  };

  return (
    <>
      <Box onClick={!imageUrl ? handleClick : undefined}>
        {imageUrl ? (
          <>
            <Preview src={imageUrl} />
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation();
                onDeleteImage(index);
              }}
            >
              ×
            </DeleteButton>
          </>
        ) : (
          <PlusIcon>＋</PlusIcon>
        )}
      </Box>
      <HiddenInput
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleChange}
      />
    </>
  );
};

export default ImageUploadBox;
