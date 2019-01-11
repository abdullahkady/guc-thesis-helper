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
  method: "POST",
  mode: "cors"
};

const getInputValue = id => document.getElementById(id).value;


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

