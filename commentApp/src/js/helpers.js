import fraudNotHisView from "./views/fraudNotHisView.js";
import * as model from "./model.js";

export function addHandlerClick(elementID, handler) {
  document.getElementById(elementID).addEventListener("click", handler);
}

export function addHandlerChange(elementID, handler) {
  document.getElementById(elementID).addEventListener("change", handler);
}

export function addHandlerSubmit(elementID, handler) {
  let inputArea = document.getElementById(elementID);
  inputArea.addEventListener("submit", handler);
}

export function addHandlerDropdown(dropDownID, handler) {
  let auth = document.getElementById(dropDownID);
  let a = auth.querySelectorAll("a");
  a.forEach((el) => el.addEventListener("click", handler));
}

export function modifyInputValueDispatchEvent(inputID, text) {
  let input = document.getElementById(inputID);
  input.value = text;
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

export function modifyInnerHTMLContent(areaID, template = "") {
  let area = document.getElementById(areaID);
  area.innerHTML = template;
}
export function modifyInnerTextContent(areaID, template = "") {
  let area = document.getElementById(areaID);
  area.innerText = template;
}

export function copyTextToClipboard(areaID) {
  let area = document.getElementById(areaID);
  navigator.clipboard.writeText(area.innerText);
}

export function selectAllInputsOnContainer(containerID) {
  let container = document.getElementById(containerID);
  let allInputs = container.querySelectorAll("select,input,textarea");
  return allInputs;
}

export function modifyUICheckBox(inputCheckBox) {
  inputCheckBox.checked = true;
}

export function modifyUIDefaultElement(element, value) {
  element.value = value;
}

export function modifyUISelect(name, value) {
  document.querySelector(`input[name=${name}][value=${value}]`).checked = true;
}

export function createUniqueKey() {
  let uniqueKey = Math.random().toString(36).substring(2, 10);
  return uniqueKey;
}

function generateFileNumberStringFromID(string) {
  let fileName = "";

  switch (string) {
    case "mainFile":
      fileName = "Main File";
      break;
    case "multipleOne":
      fileName = "Multiple File #1";
      break;
    case "multipleTwo":
      fileName = "Multiple File #2";
      break;
    case "multipleThree":
      fileName = "Multiple File #3";
      break;
    case "multipleFour":
      fileName = "Multiple File #4";
      break;
    case "multipleFive":
      fileName = "Multiple File #5";
      break;
  }

  return fileName;
}

function generatePIIStringFromID(string) {
  let fileName = "";

  switch (string) {
    case "invAKA":
      fileName = "name/AKA";
      break;
    case "invAddress":
      fileName = "address";
      break;
    case "invTelephone":
      fileName = "telephone";
      break;
  }

  return fileName;
}

function extractTradeInfoFromString(string) {
  let parrafo = string;
  let lineas = parrafo.split(/\r?\n/);
  let palabra = "Member Name";
  let index = lineas[1].indexOf(palabra);
  let match = parrafo.match(/Account Number.*?(\d{4})(?!\d)/);
  let creditor = "";
  let lastFour = "";

  if (index !== -1) {
    creditor = lineas[1].substring(index + palabra.length);
  }
  if (match) {
    lastFour = match[1];
  }

  return [lineas[0], creditor, lastFour];
}

function extractInquiryInfoFromString(string) {
  let trimStart = string.trimStart();
  let trimEnd = trimStart.trimEnd();
  let str = trimEnd.replace(/\s+/g, " ");
  const firstSpaceIndex = str.indexOf(" ");
  if (firstSpaceIndex === -1) {
    return [str];
  }
  const secondSpaceIndex = str.indexOf(" ", firstSpaceIndex + 1);
  if (secondSpaceIndex === -1) {
    let string = [
      str.slice(firstSpaceIndex + 1),
      str.slice(0, firstSpaceIndex),
    ];
    return string.join(" ");
  }
  let arrayString = [
    str.slice(secondSpaceIndex + 1),
    str.slice(0, firstSpaceIndex),
  ];
  return arrayString.join(" ");
}

function extractBorrowellDatesFromString(string) {
  const dateRegex = /(?:\d{1,2}[-\/]){2}\d{4}|\d{4}(?:[-\/]\d{1,2}){2}/g;
  let borrowellArray = string.match(dateRegex);
  return borrowellArray.join(", ");
}

export function fraudOrNotHisPage() {
  let typeInvestigation = {
    id: "",
    title: "",
    text: "",
  };

  if (fraudNotHisView.page == "fraud") {
    typeInvestigation.id = "fraud";
    typeInvestigation.title = "Fraud";
    typeInvestigation.text = "Fraud Investigation";
  } else {
    typeInvestigation.id = "notHis";
    typeInvestigation.title = "Not His";
    typeInvestigation.text = "Not His Investigation";
  }
  return typeInvestigation;
}

export function createTradeInvestigationTemplate(obj) {
  let uniqueKey = createUniqueKey();
  let typeInvestigation = fraudOrNotHisPage();
  let tradeInfo = extractTradeInfoFromString(obj.info);
  let pathString = `fraudNotHisView.record.${obj.file}.invTrade.${typeInvestigation.id}`;
  let objectForState;

  objectForState = {
    [uniqueKey]: {
      path: pathString,
      title: `${generateFileNumberStringFromID(obj.file)}: ${
        typeInvestigation.title
      } - Account`,
      text: `${typeInvestigation.text}<ul id="ul${uniqueKey}"></ul>
      Please send confirmation to: ${obj.contact}`,
      textArray: [
        `<li>${tradeInfo[0]} - ${tradeInfo[1]} - ${tradeInfo[2]}</li>`,
      ],
    },
  };

  return [objectForState, "newObject", pathString];
}

export function createPiiInvestigationTemplate(obj) {
  let uniqueKey = createUniqueKey();
  let typeInvestigation = fraudOrNotHisPage();
  let pathString = `fraudNotHisView.record.${obj.file}.invPII.${obj.typePii}.${obj.page}`;
  let path = model.generateStatePathFromString(pathString);
  let objectForState;

  switch (path.length === 0) {
    case true:
      objectForState = {
        [uniqueKey]: {
          path: pathString,
          title: `${generateFileNumberStringFromID(obj.file)}: ${
            typeInvestigation.title
          } - ${generatePIIStringFromID(obj.typePii)}`,
          text: `${
            typeInvestigation.title
          } - Please remove ${generatePIIStringFromID(
            obj.typePii
          )}: <ul id="ul${uniqueKey}"></ul>
          Please send the confirmation in ${obj.language} to ${obj.contact}`,
          textArray: [`<li>-${obj.info}</li>`],
        },
      };

      return [objectForState, "newObject", pathString];

    case false:
      return [`<li>-${obj.info}</li>`, "addToObject", pathString];
  }
}

export function createEmploymentInvestigationTemplate(obj) {
  let uniqueKey = createUniqueKey();
  let typeInvestigation = fraudOrNotHisPage();
  let pathString = `fraudNotHisView.record.${obj.file}.invEmp.${obj.page}`;
  let path = model.generateStatePathFromString(pathString);
  let objectForState;

  switch (path.length === 0) {
    case true:
      objectForState = {
        [uniqueKey]: {
          path: pathString,
          title: `${generateFileNumberStringFromID(obj.file)}: ${
            typeInvestigation.title
          } - Employment`,
          text: `${typeInvestigation.title} - Please remove employment: 
          <ul id="ul${uniqueKey}"></ul>
          Please send the confirmation in ${obj.language} to ${obj.contact}`,
          textArray: [`<li>-${obj.info}</li>`],
        },
      };

      return [objectForState, "newObject", pathString];

    case false:
      return [`<li>-${obj.info}</li>`, "addToObject", pathString];
  }
}

export function createPubRecInvestigationTemplate(obj) {
  let uniqueKey = createUniqueKey();
  let typeInvestigation = fraudOrNotHisPage();
  let pathString = `fraudNotHisView.record.${obj.file}.invPubRec.${obj.typePubRec}.${obj.page}`;
  let objectForState;

  let namePubRec =
    obj.typePubRec === "invBankrupcy"
      ? "Bankruptcy"
      : obj.typePubRec === "invConsolidatedDebt"
      ? "Consolidated Debt"
      : obj.typePubRec === "invJudgements"
      ? "Judgement"
      : obj.typePubRec === "invDebtRecovery"
      ? "Debt recovery"
      : obj.typePubRec === "invCollections"
      ? "Collection"
      : _;

  objectForState = {
    [uniqueKey]: {
      path: pathString,
      title: `${generateFileNumberStringFromID(obj.file)}: ${
        typeInvestigation.title
      } - Public Records`,
      text: `${typeInvestigation.text}<ul id="ul${uniqueKey}"></ul>
      Please send confirmation to: ${obj.contact}`,
      textArray: [
        `<li>${namePubRec} - ${obj.infoCreditor} - ${obj.infoDigits}</li>`,
      ],
    },
  };

  return [objectForState, "newObject", pathString];
}

export function createHardInquiryInvestigationTemplate(obj) {
  let uniqueKey = createUniqueKey();
  let typeInvestigation = fraudOrNotHisPage();
  let pathString = `fraudNotHisView.record.${obj.file}.invHard.${obj.page}`;
  let objectForState;

  objectForState = {
    [uniqueKey]: {
      path: pathString,
      title: `${generateFileNumberStringFromID(obj.file)}: ${
        typeInvestigation.title
      } - Hard Inquiry`,
      text: `<div class="d-flex">${typeInvestigation.text}.&nbsp;<ul id="ul${uniqueKey}"></ul></div>
      Please send confirmation to: ${obj.contact}`,
      textArray: [`<li>${extractInquiryInfoFromString(obj.info)}</li>`],
    },
  };

  return [objectForState, "newObject", pathString];
}

export function createSoftInquiryInvestigationTemplate(obj) {
  let uniqueKey = createUniqueKey();
  let typeInvestigation = fraudOrNotHisPage();
  let pathString = `fraudNotHisView.record.${obj.file}.invSoft.${obj.typeSofInq}.${obj.page}`;
  let path = model.generateStatePathFromString(pathString);
  let objectForState;

  switch (obj.typeSofInq) {
    case "invNormalSoft":
      switch (path.length === 0) {
        case true:
          objectForState = {
            [uniqueKey]: {
              path: pathString,
              title: `${generateFileNumberStringFromID(obj.file)}: ${
                typeInvestigation.title
              } - Soft Inquiry`,
              text: `${typeInvestigation.title} - Please remove soft Inquiries: 
          <div id="ul${uniqueKey}"></div>
          Please send confirmation in ${obj.language} to: ${obj.contact}`,
              textArray: [
                `<span>${extractInquiryInfoFromString(obj.info)}</span>`,
              ],
            },
          };
          return [objectForState, "newObject", pathString];
        case false:
          return [
            `<span> | ${extractInquiryInfoFromString(obj.info)}</span>`,
            "addToObject",
            pathString,
          ];
      }

    case "invBorrowell":
      objectForState = {
        [uniqueKey]: {
          path: pathString,
          title: `${generateFileNumberStringFromID(obj.file)}: ${
            typeInvestigation.title
          } - Borrowell`,
          text: `${typeInvestigation.title} - Please remove Borrowell Inquiries: 
    <div id="ul${uniqueKey}"></div>
    Please send confirmation in ${obj.language} to: ${obj.contact}`,
          textArray: [
            `<span>${extractBorrowellDatesFromString(obj.info)}</span>`,
          ],
        },
      };
      return [objectForState, "newObject", pathString];
  }
}

export function generateCallLogElement(element) {
  let template;
  switch (element.type) {
    case "select":
      if (element.value !== "") {
        template = element.value;
        return template;
      }
      break;
    case "checkBox":
      if (element.value == true) {
        template = element.lang.en;
        return template;
      }
      break;
    case "input":
      if (element.value !== "") {
        template = `${element.lang.en} : ${element.value}`;
        return template;
      }
      break;

    default:
      null;
      break;
  }
}

export function getSiblingLabel(event){
let target = event;
let label = target.previousElementSibling;
navigator.clipboard.writeText(label.innerText);
}