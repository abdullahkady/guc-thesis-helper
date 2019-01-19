/*
  The file contains what deals with interacting
  with the DOM to capture input dynamically
*/

const getInputValue = id => document.getElementById(id).value;

const getRemainingNodes = () =>
  Array.from(document.getElementById("thesisIdLst").children);

const getChosenIds = () =>
  Array.from(document.getElementById("stdThesisIdLst").children).map(
    selection => selection.value
  );
