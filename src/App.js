import { Container, Content, Row } from "./styles";
import Button from "./components/button";
import Input from "./components/input";
import { useState } from "react";

const App = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState('0');
  const [operation, setOperation] = useState('');
  const handleAddNumber = (number) => {
    setCurrentNumber(former => `${former === '0' ? '' : former}${number}`);
  }
  const handleSumNumber = () => {
    if (firstNumber === '0') {
      setFirstNumber(currentNumber);
      setCurrentNumber('0');
      setOperation('+');
      return;
    }
    setCurrentNumber(String(Number(firstNumber) + Number(currentNumber)));
    setOperation('');
  }
  const handleOperationSwitcher = (op) => {
    switch (op) {
      case '+':
        handleSumNumber();
        break;
      default:
        break;
    }
    setFirstNumber('0');
  }
  const handleEquals = () => {
    if (firstNumber !== 0 && operation !== '' && currentNumber !== '0') 
      handleOperationSwitcher(operation);
  }
  const handleOnClear = () => setCurrentNumber('0');
  return (
    <Container>
      <Content>
        <Input value={currentNumber} placeholder={'Write an operation'}/>
        <Row>
          <Button label="x"/>
          <Button label="/"/>
          <Button label="C" onClick={() => handleOnClear()}/>
          <Button label="X"/>
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')}/>
          <Button label="2" onClick={() => handleAddNumber('2')}/>
          <Button label="3" onClick={() => handleAddNumber('3')}/>
          <Button label="+" onClick={() => handleSumNumber()}/>
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')}/>
          <Button label="5" onClick={() => handleAddNumber('5')}/>
          <Button label="6" onClick={() => handleAddNumber('6')}/>
          <Button label="-"/>
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')}/>
          <Button label="8" onClick={() => handleAddNumber('8')}/>
          <Button label="9" onClick={() => handleAddNumber('9')}/>
          <Button label="=" onClick={handleEquals}/>
        </Row>
      </Content>
    </Container>
  );
}

export default App;
