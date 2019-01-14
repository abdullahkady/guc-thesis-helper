const addThesisRequest = id =>
  fetch("http://student.guc.edu.eg/External/Thesis/ChooseThesis.aspx", {
    ...REQUEST_CONFIG,
    body: generateChooseThesisBody(id)
  });

const removeThesisRequest = id =>
  fetch("http://student.guc.edu.eg/External/Thesis/ChooseThesis.aspx", {
    ...REQUEST_CONFIG,
    body: generateRemoveThesisBody(id)
  });

const clearChosenTheses = async () => {
  const shouldDelete = confirm(
    "This will remove every single entry you currently have, are you sure?"
  );

  if (!shouldDelete) return;
  const chosen = getChosenIds();
  toggleSpinner();
  for (let i = 0; i < chosen.length; i++) {
    await removeThesisRequest(chosen[i]);
    updateProgress(i + 1, chosen.length);
  }
  toggleSpinner();
  alert("Cleared successfully :)");
};

const addTheses = async ids => {
  toggleSpinner();
  for (let i = 0; i < ids.length; i++) {
    await addThesisRequest(ids[i]);
    updateProgress(i + 1, ids.length);
  }
  alert("All done !");
};
