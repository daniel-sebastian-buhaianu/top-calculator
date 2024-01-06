const DISPLAY_MAX_CHARS = 15;
function lastChar(string)
{
  return string.charAt(string.length - 1);
}
function calculateResult(string, operator)
{
  const parts = string.split(operator);
  const firstNumber = parts.length == 2
                      ? parseFloat(parts[0])
                      : parseFloat(parts[1]) * (-1);
  const secondNumber = parseFloat(parts[parts.length - 1]);
  let result;
  switch (operator)
  {
    case '+':
      result = firstNumber + secondNumber;
      break;
    case '-':
      result = firstNumber - secondNumber;
      break;
    case '*':
      result = firstNumber * secondNumber;
      break;
    case '/':
      result = firstNumber / secondNumber;
      break;
    case '%':
      result = firstNumber % secondNumber;
      break;
    default:
      result = "NaN";
  }
  return result.toString().slice(0, DISPLAY_MAX_CHARS);
}
let operator;
function handleButtonClick() {
  const displayElement = document.querySelector("#display span");
  const displayText = displayElement.textContent;
  const buttonText = this.textContent;
  switch (buttonText)
  {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      if (displayText == 0 && !displayText.includes('.'))
        displayElement.textContent = buttonText;
      else if (displayText.length < DISPLAY_MAX_CHARS)
        displayElement.textContent += buttonText;
      else
        alert("Reached maximum character limit");
      break;
    case "AC":
      operator = undefined;
      displayElement.textContent = 0;
      break;
    case "+/-":
      if (!operator)
        displayElement.textContent = parseFloat(displayText)*(-1);
      break;
    case '.':
      if (operator)
      {
        const parts = displayText.split(operator);
        const secondNumber = parts[parts.length-1];
        if (secondNumber != "" && !secondNumber.includes('.'))
          displayElement.textContent += '.';
      }
      else if (!displayText.includes('.'))
        displayElement.textContent += '.';
      break;
    case '=':
      if (operator && lastChar(displayText) != operator
          && lastChar(displayText) != '-')
        displayElement.textContent = calculateResult(displayText, operator);
      else
        alert("Please provide a valid expression");
      break;
    default:
      if (operator)
      {
        if ((operator == '%' || operator == '/' || operator == '*')
            && lastChar(displayText) == operator && buttonText == '-')
          displayElement.textContent += buttonText;
      }
      else
      {
        displayElement.textContent += buttonText;
        operator = buttonText;
      }
  }
}
document
  .querySelectorAll("button")
  .forEach(button => {
    button.addEventListener("click", handleButtonClick);
  });

