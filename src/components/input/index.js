import { InputContainer } from "./styles";

const Input = ({value, placeholder}) => {
    return (
      <InputContainer>
        <input placeholder={placeholder} disabled value={value}/>
      </InputContainer>
    );
  }
  
export default Input;
