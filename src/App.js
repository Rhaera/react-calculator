import { Container, Content, Row } from "./styles";
import Button from "./components/button";
import Input from "./components/input";
import { useState } from "react";

const App = () => {
  const [currentExpression, setCurrentExpression] = useState('0');
  const handleAddNumber = (number) => {
    if (isNaN(currentExpression.charAt(currentExpression.length - 1)) && currentExpression.charAt(currentExpression.length - 1) !== '.') {
      setCurrentExpression(`${currentExpression} ${number}`);
      return;
    }
    if (currentExpression === '0') {
      setCurrentExpression(number);
      return;
    }  
    // if (number === '0' && currentExpression.length >= 2 && currentExpression.charAt(currentExpression.length - 2) === '/') return;
    if (currentExpression.length >= 2 && currentExpression.charAt(currentExpression.length - 1) === '0' && currentExpression.charAt(currentExpression.length - 2) === ' ')
      return;
    setCurrentExpression(`${currentExpression}${number}`);
  }
  const handleSignal = (signal) => signal !== '.' ?
                                  isNaN(currentExpression.trimEnd()
                                                          .charAt(currentExpression.trimEnd()
                                                          .length - 1)) ? setCurrentExpression(currentExpression) :
                                                          ((signal === ' - ' || signal === ' + ') ? setCurrentExpression(currentExpression.concat(signal)) :
                                                          (currentExpression.length >= 1 ? setCurrentExpression(currentExpression.concat(signal)) :
                                                          setCurrentExpression(currentExpression))) :
                                                          (currentExpression.lastIndexOf('.') === -1 && currentExpression.charAt(currentExpression.length - 1) !== ' ' ?
                                                          setCurrentExpression(currentExpression.concat(signal)) :
                                                          handleLastFloating());
  const handleLastFloating = () => {
    if ((currentExpression.lastIndexOf(' ') === -1 && currentExpression.lastIndexOf('.') === -1) || 
        (currentExpression.lastIndexOf(' ') > currentExpression.lastIndexOf('.') && currentExpression.charAt(currentExpression.length - 1) !== ' ')) {
      setCurrentExpression(currentExpression.concat('.'));
      return;
    }
    setCurrentExpression(currentExpression);
  }
  const handleEquals = () => {
    if (currentExpression.charAt(currentExpression.length - 1) === '.' ||
        currentExpression.charAt(currentExpression.length - 1) === ' ' ||
        currentExpression.charAt(currentExpression.length - 1) === '+' ||
        currentExpression.charAt(currentExpression.length - 1) === '-' ||
        currentExpression.charAt(currentExpression.length - 1) === 'x' ||
        currentExpression.charAt(currentExpression.length - 1) === '/' ||
        currentExpression.lastIndexOf(' ') === -1) 
      return;
    const currentArray = currentExpression.split(' ');
    if (currentArray[currentArray.length - 1] === '0' && currentExpression.length >= 2 && currentExpression.charAt(currentExpression.length - 3) === '/')
      return;
    let total = Number(currentArray[0]);
    for (let i = 0; i < currentArray.length; i++) {
      if (currentArray[i] === '+') total += Number(currentArray[i + 1]);
      if (currentArray[i] === '-') total -= Number(currentArray[i + 1]);
      if (currentArray[i] === 'x') total *= Number(currentArray[i + 1]);
      if (currentArray[i] === '/') total /= Number(currentArray[i + 1]);
    }
    setCurrentExpression(`${total}`);
  }
  const handleOnClear = () => currentExpression.length === 1 ? setCurrentExpression(currentExpression) :
                              (currentExpression.charAt(currentExpression.length - 1) !== ' ' ? 
                              setCurrentExpression(currentExpression.slice(0, currentExpression.length - 1)) :
                              setCurrentExpression(currentExpression.trimEnd()
                                                                    .slice(0, currentExpression.trimEnd()
                                                                                                .length - 2)));
  const handleAllClear = () => setCurrentExpression('0');
  return (
    <Container>
      <Content>
        <Input value={currentExpression}/>
        <Row>
          <Button label="0" onClick={() => handleAddNumber('0')}/>
          <Button label="." onClick={() => handleSignal('.')}/>
          <Button label="C" onClick={() => handleAllClear()}/>
          <Button label="+" onClick={() => handleSignal(' + ')}/>
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')}/>
          <Button label="2" onClick={() => handleAddNumber('2')}/>
          <Button label="3" onClick={() => handleAddNumber('3')}/>
          <Button label="-" onClick={() => handleSignal(' - ')}/>
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')}/>
          <Button label="5" onClick={() => handleAddNumber('5')}/>
          <Button label="6" onClick={() => handleAddNumber('6')}/>
          <Button label="x" onClick={() => handleSignal(' x ')}/>
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')}/>
          <Button label="8" onClick={() => handleAddNumber('8')}/>
          <Button label="9" onClick={() => handleAddNumber('9')}/>
          <Button label="/" onClick={() => handleSignal(' / ')}/>
        </Row>
        <Row>
          <Button label="=" onClick={handleEquals}/>
          <Button label="X" onClick={handleOnClear}/>
        </Row>
      </Content>      
    </Container>
  );
}

export default App;