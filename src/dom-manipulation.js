const getInputValue = id => document.getElementById(id).value;

const getRemainingIds = () =>
  Array.from(document.getElementById("thesisIdLst").children).map(
    selection => selection.value
  );

const getChosenIds = () =>
  Array.from(document.getElementById("stdThesisIdLst").children).map(
    selection => selection.value
  );
