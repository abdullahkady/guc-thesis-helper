const originalContent = sectionThingy.firstElementChild;
const loadingContent = document.createElement("div");
const progress = document.createElement("h2");
progress.style.textAlign = "center";
loadingContent.appendChild(progress);
const spinnerContainer = document.createElement("div");
spinnerContainer.className = "spinner";
const childArray = ["1", "2", "3", "4", "5"].map(index => {
  const innerDiv = document.createElement("div");
  innerDiv.className = "rect" + index;
  return innerDiv;
});

childArray.forEach(child => spinnerContainer.appendChild(child));
loadingContent.appendChild(spinnerContainer);
loadingContent.hidden = true;
sectionThingy.append(loadingContent);

let isSpinning = false;

const updateProgress = (currentRequest, totalRequests) => {
  const percentage = (
    (Number(currentRequest) / Number(totalRequests)) *
    100
  ).toFixed(2);
  progress.textContent = `${currentRequest} / ${totalRequests} - ${percentage}%`;
};

const toggleSpinner = () => {
  if (!isSpinning) {
    loadingContent.hidden = false;
    originalContent.hidden = true;
  } else {
    loadingContent.hidden = true;
    originalContent.hidden = false;
  }
  isSpinning = !isSpinning;
};
