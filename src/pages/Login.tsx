import ItemCard from "../components/ItemCard";
import PersonalColorButton from "../components/PersonalColorButton";
import TextField from "../components/TextField";
import TextHeader from "../components/TextHeader";

export default function Login() {
  return (
    <div>
      {/* <div>홈 페이지입니다</div> */}
      {/* <Button label="로그인하기" /> */}
      <TextHeader pageName="회원가입" />
      <TextField fieldName="비밀번호" />
      <ItemCard
        imageSource={
          "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0022/A00000022465410ko.jpg?l=ko"
        }
        itemName={
          "[5/26하루특가] [올영단독] 메디큐브 부스터프로 쿠로미 에디션(+쿠로미헤드케이스+세안밴드+디바이스클리너+스티커2종)"
        }
        discountRate={19}
        price={339000}
      />
      <PersonalColorButton
        buttonName="봄 웜"
        colors={["#FFC0A9", "#FFD8A9", "#FFE6CC"]}
      ></PersonalColorButton>
    </div>
  );
}
