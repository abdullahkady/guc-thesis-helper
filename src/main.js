const HEADERS = {
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "Accept-language": "en,en-US;q=0.9,ar;q=0.8",
  "Cache-control": "no-cache",
  "Content-type": "application/x-www-form-urlencoded",
  Pragma: "no-cache",
  "Upgrade-Insecure-Requests": "1"
};

const REQUEST_CONFIG = {
  credentials: "include",
  headers: HEADERS,
  referrer: "http://student.guc.edu.eg/External/Thesis/ChooseThesis.aspx",
  referrerPolicy: "no-referrer-when-downgrade",
  method: "POST"
};

const getInputValue = id => document.getElementById(id).value;

const getRemainingIds = () =>
  Array.from(document.getElementById("thesisIdLst").children).map(
    selection => selection.value
  );

const getChosenIds = () =>
  Array.from(document.getElementById("stdThesisIdLst").children).map(
    selection => selection.value
  );

const captureTokenizedInputs = () => ({
  viewState: getInputValue("__VIEWSTATE"),
  viewStateGenerator: getInputValue("__VIEWSTATEGENERATOR"),
  eventValidation: getInputValue("__EVENTVALIDATION")
});

const captureHiddenInputs = () => ({
  mjrIdHdn: getInputValue("mjrIdHdn"),
  fltIdHdn: getInputValue("fltIdHdn"),
  sgIdHdn: getInputValue("sgIdHdn"),
  prtTxt: getInputValue("prtTxt")
});

const formatPayload = ({
  eventTarget = "",
  tokenizedInputs = {
    viewState,
    viewStateGenerator,
    eventValidation
  },
  hidden = {
    mjrIdHdn,
    fltIdHdn,
    sgIdHdn,
    prtTxt
  },
  thesisId,
  stdThesisIdLst
}) =>
  `__EVENTTARGET=${eventTarget}&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=${encodeURIComponent(
    tokenizedInputs.viewState
  )}&__VIEWSTATEGENERATOR=${encodeURIComponent(
    tokenizedInputs.viewStateGenerator
  )}&__EVENTVALIDATION=${encodeURIComponent(
    tokenizedInputs.eventValidation
  )}&mjrIdHdn=${hidden.mjrIdHdn}&fltIdHdn=${hidden.fltIdHdn}&sgIdHdn=${
    hidden.sgIdHdn
  }&${
    stdThesisIdLst
      ? `stdThesisIdLst=${stdThesisIdLst}&rmvBtn=Remove+Thesis`
      : `thesisIdLst=${thesisId}`
  }&prtTxt=${hidden.prtTxt}`;

const generateChooseThesisBody = thesisId =>
  formatPayload({
    eventTarget: "thesisIdLst",
    tokenizedInputs: captureTokenizedInputs(),
    hidden: captureHiddenInputs(),
    thesisId
  });

const generateRemoveThesisBody = stdThesisIdLst =>
  formatPayload({
    tokenizedInputs: captureTokenizedInputs(),
    hidden: captureHiddenInputs(),
    stdThesisIdLst
  });

const addThesis = id =>
  fetch("http://student.guc.edu.eg/External/Thesis/ChooseThesis.aspx", {
    ...REQUEST_CONFIG,
    body: generateChooseThesisBody(id)
  });

const removeThesis = id =>
  fetch("http://student.guc.edu.eg/External/Thesis/ChooseThesis.aspx", {
    ...REQUEST_CONFIG,
    body: generateRemoveThesisBody(id)
  });

const clearChosenTheses = async () => {
  const shouldDelete = confirm(
    "This will remove every single entry you currently have, are you sure?"
  );

  if (!shouldDelete) return;
  await Promise.all(getChosenIds().map(removeThesis));
  alert("Cleared successfully :)");
};

const addRemaining = async () => {
  // Just for testing, should have a bulk selection -hopefully-
  const count = Number(prompt("Please enter how many you wanna add"));
  const remaining = getRemainingIds();
  for (let i = 0; i < count; i++) {
    await addThesis(remaining[i]);
    console.log("One has been added");
  }
  alert("All done !");
};
