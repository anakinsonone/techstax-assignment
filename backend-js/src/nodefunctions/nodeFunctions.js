import Papa from "papaparse";

const startFunction = (results) => {
  return results;
};

const endFunction = (results) => {
  return results;
};

const filterDataFunction = (results) => {
  console.log(results.file.originalname);
  const csvFile = results.file ? results.file.buffer.toString("utf-8") : "";
  const { data } = Papa.parse(csvFile);
  const typedData = data;
  for (let i = 1; i < typedData.length; i++) {
    typedData[i][0] = typedData[i][0].toLowerCase();
  }
  return { ...results, csv: typedData };
};

const waitFunction = async (results) => {
  await setTimeout(() => {}, results.timeOut);
  return results;
};

const convertFormatFunction = (results) => {
  const typedCsv = results.csv;
  const json = Papa.unparse(typedCsv);
  return { ...results, json };
};

const sendPostReqFunction = (results) => {
  console.log("sending post request...");
  fetch(postURL, {
    method: "POST",
    body: JSON.stringify(results.json),
  }).then((res) => console.log(res));
};

const nodes = {
  startFunction,
  endFunction,
  filterDataFunction,
  waitFunction,
  convertFormatFunction,
  sendPostReqFunction,
};

export default nodes;
