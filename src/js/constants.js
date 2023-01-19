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
  referrer: "https://student.guc.edu.eg/External/Thesis/ChooseThesis.aspx",
  referrerPolicy: "no-referrer-when-downgrade",
  method: "POST"
};
