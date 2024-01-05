const RESULT_MAX_CHARS = 16;
function isNumeric(string)
{
  if (typeof string != "string")
    return 0;
  if (isNaN(string))
    return 0;
  if (isNaN(parseFloat(string)))
    return 0;
  return 1;
}
function handleButtonClick() {
  const result = document.querySelector("#result");
  if (isNumeric(this.textContent))
  {
    if (result.textContent == 0)
      result.textContent = this.textContent;
    else if (result.textContent.length < RESULT_MAX_CHARS)
      result.textContent += this.textContent;
  }
  else if (this.textContent == "AC")
    result.textContent = 0;
}
document
  .querySelectorAll("button")
  .forEach(button => {
    button.addEventListener("click", handleButtonClick);
  });

