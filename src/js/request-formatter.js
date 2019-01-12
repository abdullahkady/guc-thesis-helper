/*
  The file contains all the encoding/mapping required for a valid
  request.
*/

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
