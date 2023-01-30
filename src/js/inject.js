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

  let output;
  if (totalMinutes > 0) {
    output = `${totalMinutes} minutes`;
    if (totalSeconds > 0) {
      output += `, and ${totalSeconds} seconds`;
    }
  } else {
    output = `${totalSeconds} seconds`;
  }
  return output;
};

const originalThesesContainer = document.querySelectorAll(
  "#Table2 > tbody > tr:nth-child(2) > td:nth-child(2)"
)[1];

originalThesesContainer.appendChild(document.createElement("br"));

/* ============================================= */
/* ==================CLEAR ALL================== */
const clearAllButton = document.createElement("button");
clearAllButton.title =
  "Clears all topics submitted in the system (the blue box above).";
clearAllButton.innerText = "Clear all registered topics";
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
    sortableThesesList.toArray().length > 0 &&
    !confirm(
      "This will discard all the added topics in the sortable list below, are you sure?"
    )
  ) {
    return;
  }

  if (
    confirm(
      `This will remove every single entry registered on the system, you currently have (${
        chosenIds.length
      } topics), are you sure?`
    )
  ) {
    if (
      !confirm(
        `Estimated: up to ${estimateTime(
          chosenIds.length
        )}\nDON'T INTERRUPT UNTIL FINISHED.\nReady to start?`
      )
    ) {
      return;
    }
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
addRemainingButton.innerText = "Add remaining to sortable list";
addRemainingButton.title =
  "Adds all the topics remaining above to the sortable list, their order will be maintained (appended to the current list). Clicking will not submit to the system";
addRemainingButton.classList = "button button-primary";
originalThesesContainer.appendChild(addRemainingButton);

/* ============================================= */
/* ==================SELECTION================== */
const sortableThesesListNode = document.createElement("ul");
sortableThesesListNode.className = "sortable";
const sortableThesesList = new Sortable(sortableThesesListNode);
const header = document.createElement("h1");
header.innerText = "Sortable list";
header.style.textAlign = "center";
originalThesesContainer.appendChild(header);
originalThesesContainer.appendChild(sortableThesesListNode);

/* ============================================= */
/* ================ADD  SELECTED================ */
const addSelectedThesesButton = document.createElement("button");
addSelectedThesesButton.title =
  "Adds topics in the list above to your selected topics on the system, this will not finalize your submission to the system (you will still need to commit to the system at the end)";
addSelectedThesesButton.innerText = "Submit batch";
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
    if (
      !confirm(
        `Estimated: up to ${estimateTime(
          ids.length
        )}\nDON'T INTERRUPT UNTIL FINISHED.\nReady to start?`
      )
    ) {
      return;
    }
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

// Remove the postback method causing random refreshes on selecting an item from the list.
let myScript = document.createElement('script');
myScript.setAttribute('type', 'text/javascript');
myScript.textContent = `oldDoPostBack = __doPostBack; __doPostBack = function(target, args) {
  if(target == 'thesisIdLst') return;
  else oldDoPostBack(target, args);
};`;
(document.head||document.documentElement).appendChild(myScript);

// ================ADDITION LISTENERS================ //

const addToSortableList = node => {
  const id = "SO__" + node.value;
  const sortableEntry = document.createElement("li");
  sortableEntry.id = id;
  sortableEntry.textContent = node.textContent;
  sortableThesesListNode.appendChild(sortableEntry);
  sortableEntry.originalNode = node;
  selectionListClone.removeChild(node);
  addRemoveButton(sortableEntry);
};

const addRemoveButton = (sortableEntry) => {
  const button = document.createElement("span");
  button.className = 'removeButton';
  button.onclick = (ev) => {
    selectionListClone.appendChild(sortableEntry.originalNode);
    sortableThesesListNode.removeChild(sortableEntry);
  };
  button.textContent = "Remove";
  sortableEntry.appendChild(button);
};

selectionListClone.addEventListener("change", event => {
  const node = event.target.selectedOptions[0];
  addToSortableList(node);
});

addRemainingButton.addEventListener("click", async event => {
  event.preventDefault();
  const remaining = getRemainingNodes();

  if (!remaining || remaining.length === 0) {
    alert("You have no more remaining theses :-)");
    return;
  }

  if (
    confirm(
      `This will add the rest of the unselected theses (${
        remaining.length
      } topic) to your selection (sortable list), their order will be as seen, with the first one having the highest priority, are you sure?`
    )
  ) {
    remaining.forEach(addToSortableList);
  }
});
