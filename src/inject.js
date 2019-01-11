const sectionThingy = document.querySelectorAll(
  "#Table2 > tbody > tr:nth-child(2) > td:nth-child(2)"
)[1];

sectionThingy.appendChild(document.createElement("br"));

const clearAllButton = document.createElement("button");
clearAllButton.innerText = "Clear all!";
clearAllButton.style.color = "red";
sectionThingy.appendChild(clearAllButton);
clearAllButton.addEventListener("click", event => {
  event.preventDefault();
  console.log("Started clearing theses, please wait ...");
  // TODO: Spinners :D
  clearChosenTheses();
});

const spacingNode = document.createTextNode(`\u00A0`.repeat(110)); // This is the kind of shit they're using, sorry ~_~
sectionThingy.appendChild(spacingNode);

const submitCustomAddition = document.createElement("button");
submitCustomAddition.innerText = "Custom submit";
submitCustomAddition.style.color = "green";
sectionThingy.appendChild(submitCustomAddition);
submitCustomAddition.addEventListener("click", event => {
  event.preventDefault();

  clearChosenTheses();
});
