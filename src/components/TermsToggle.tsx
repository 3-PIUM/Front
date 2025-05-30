import { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Wrapper = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Label = styled.h4`
  font-size: 1rem;
  font-weight: bold;
  /* margin-top: 0.3rem; */
`;

const Content = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: #555;
  margin-top: 1rem;
  line-height: 1.6;
  /* background-color: #f2f2f2; */
`;

const Bullet = styled.li`
  margin-bottom: 0.5rem;
`;

const TermsToggle = () => {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      <Header onClick={() => setOpen((prev) => !prev)}>
        <Label>이용안내</Label>
        {open ? <IoIosArrowUp size={22} /> : <IoIosArrowDown size={22} />}
      </Header>

      {open && (
        <Content>
          <Bullet>게시된 리뷰의 권리와 책임은 게시당사자에게 있으며...</Bullet>
          <Bullet>
            작성된 리뷰에 따라 매월 “도움이 돼요” 수 X5P가 지급됩니다...
          </Bullet>
          <Bullet>결제금액 2,000원 미만은 포인트 미지급...</Bullet>
          <Bullet>
            리뷰 삭제는 작성 후 3일 안에 가능 (마이페이지 &gt; 리뷰)
          </Bullet>
          <Bullet>
            [식품 등의 표시‧광고법]을 위반하는 표현은 블라인드 처리됩니다.
          </Bullet>
          <Bullet>
            체험단/마케팅 등 이해관계가 있는 경우 반드시 명시해야 합니다.
          </Bullet>
        </Content>
      )}
    </Wrapper>
  );
};

export default TermsToggle;
