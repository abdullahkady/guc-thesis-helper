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

const clearIds = async ids => {
  for (let i = 0; i < ids.length; i++) {
    await removeThesisRequest(ids[i]);
    updateProgress(i + 1, ids.length);
  }
};

const addTheses = async ids => {
  for (let i = 0; i < ids.length; i++) {
    await addThesisRequest(ids[i]);
    updateProgress(i + 1, ids.length);
  }
};
