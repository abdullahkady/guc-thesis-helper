const addThesisRequest = id =>
  fetch("https://student.guc.edu.eg/External/Thesis/ChooseThesis.aspx", {
    ...REQUEST_CONFIG,
    body: generateChooseThesisBody(id)
  });

const removeThesisRequest = id =>
  fetch("https://student.guc.edu.eg/External/Thesis/ChooseThesis.aspx", {
    ...REQUEST_CONFIG,
    body: generateRemoveThesisBody(id)
  });

const clearIds = async ids => {
  for (let i = 0; i < ids.length; i++) {
    updateProgress(i + 1, ids.length);
    await removeThesisRequest(ids[i]);
  }
};

const addTheses = async ids => {
  for (let i = 0; i < ids.length; i++) {
    updateProgress(i + 1, ids.length);
    await addThesisRequest(ids[i]);
  }
};
