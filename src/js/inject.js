/*
  The file contains what deals with content displayed in the
  HTML (injected in the DOM), thus it must run as the last script
*/

const estimateTime = ids => {
  let totalSeconds = Number(ids) * 12;
  let totalMinutes = 0;
  if (totalSeconds > 60) {
    totalMinutes = parseInt(totalSeconds / 60);
    totalSeconds -= totalMinutes * 60;
  }
  return totalMinutes
    ? `${totalMinutes} minutes${totalSeconds ? ", " : ""}`
    : "" + `${totalSeconds} seconds`;
};

const originalThesesContainer = document.querySelectorAll(
  "#Table2 > tbody > tr:nth-child(2) > td:nth-child(2)"
)[1];

originalThesesContainer.appendChild(document.createElement("br"));

/* ============================================= */
/* ==================CLEAR ALL================== */
const clearAllButton = document.createElement("button");
clearAllButton.innerText = "Clear all";
clearAllButton.classList = "button button-danger";
originalThesesContainer.appendChild(clearAllButton);
clearAllButton.addEventListener("click", async event => {
  event.preventDefault();

  const chosenIds = getChosenIds();
  if (!chosenIds || chosenIds.length === 0) {
    alert("You don't have any chosen (registered in the system) theses.");
    return;
  }

  if (
    confirm(
      `This will remove every single entry you currently have (${
        chosenIds.length
      } topic), are you sure?`
    )
  ) {
    alert(`Estimated: up to ${estimateTime(chosenIds.length)}`);
    toggleSpinner();
    await clearIds(chosenIds);
    toggleSpinner();
    alert(
      `All cleared \\_0_/\nThe page will reload now to sync with the system.`
    );
    window.location.reload();
  }
});

// This is the kind of shit they're using, sorry ~_~
const spacingNode = document.createTextNode(`\u00A0`.repeat(77));
originalThesesContainer.appendChild(spacingNode);

/* ============================================= */
/* ================ADD REMAINING================ */
const addRemainingButton = document.createElement("button");
addRemainingButton.innerText = "Add remaining";
addRemainingButton.classList = "button button-primary";
originalThesesContainer.appendChild(addRemainingButton);
addRemainingButton.addEventListener("click", async event => {
  event.preventDefault();
  const remainingIds = getRemainingIds();

  if (!remainingIds || remainingIds.length === 0) {
    alert("You have no more remaining theses :-)");
    return;
  }

  if (
    confirm(
      `This will add the rest of the unselected theses (${
        remainingIds.length
      } topic) to your selection, their order will be as seen, with the first one having the highest priority, are you sure?`
    )
  ) {
    alert(`Estimated: up to ${estimateTime(remainingIds.length)}`);
    toggleSpinner();
    await addTheses(remainingIds);
    toggleSpinner();
    alert(
      `Added remaining ${
        remainingIds.length
      } successfully.\nThe page will reload now to sync with the system.`
    );
    window.location.reload();
  }
});

/* ============================================= */
/* ==================SELECTION================== */
const sortableThesesListNode = document.createElement("ul");
sortableThesesListNode.className = "sortable";
const sortableThesesList = new Sortable(sortableThesesListNode);
originalThesesContainer.appendChild(sortableThesesListNode);

/* ============================================= */
/* ================ADD  SELECTED================ */
const addSelectedThesesButton = document.createElement("button");
addSelectedThesesButton.innerText = "Add selected";
addSelectedThesesButton.classList = "button button-success";
addSelectedThesesButton.addEventListener("click", async event => {
  event.preventDefault();
  let ids = sortableThesesList.toArray();
  if (!ids || ids.length === 0) {
    alert("Sorry, you need to choose some topics first");
    return;
  }
  if (
    confirm(
      `This will submit the currently selected theses: ${
        ids.length
      } topic, are you sure?`
    )
  ) {
    alert(`Estimated: up to ${estimateTime(ids.length)}`);
    toggleSpinner();
    await addTheses(ids);
    toggleSpinner();
    alert(
      `All selected ${
        ids.length
      } topic have been added successfully.\nThe page will reload now to sync with the system.`
    );
    window.location.reload();
  }
});
originalThesesContainer.appendChild(addSelectedThesesButton);

// ============================================= //

/*
  This is done just to remove the old event listener, it's ugly and bad :')
*/
const selectionList = document.getElementById("thesisIdLst");
const selectionListClone = selectionList.cloneNode(true);
selectionList.parentNode.appendChild(selectionListClone);
selectionList.parentNode.removeChild(selectionList);

selectionListClone.addEventListener("change", event => {
  const node = event.target.selectedOptions[0];
  const id = "SO__" + node.value;
  const sortableEntry = document.createElement("li");
  sortableEntry.id = id;
  sortableEntry.textContent = node.textContent;
  sortableThesesListNode.appendChild(sortableEntry);
  selectionListClone.removeChild(node);
});
