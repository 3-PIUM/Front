import TextField from "../components/TextField";
import TextHeader from "../components/TextHeader";

export default function Login() {
  return (
    <div>
      {/* <div>홈 페이지입니다</div> */}
      {/* <Button label="로그인하기" /> */}
      <TextHeader pageName="회원가입" />
      <TextField fieldName="비밀번호" />
    </div>
  );
}
