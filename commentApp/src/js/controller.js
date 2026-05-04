import iconView from "./views/iconView.js";
import * as model from "./model.js";
import * as helper from "./helpers.js";
import sideBarView from "./views/sideBarView.js";
import formView from "./views/formView.js";
import fraudNotHisView from "./views/fraudNotHisView.js";
import callLogView from "./views/callLogView.js";
import mixedFileView from "./views/mixedFileView.js";
import sinView from "./views/sinView.js";
import spView from "./views/spView.js";
import summaryView from "./views/summaryView.js";

function controlLanguageChange() {
  switch (sideBarView.getLanguage()) {
    case "en":
      sideBarView.setLanguage("fr");
      break;
    case "fr":
      sideBarView.setLanguage("en");
      break;
  }
  controlLanguage();
}

function controlLanguage() {
  let [elements, placeholders] = sideBarView.getAllElementsToTranslate();
  let element;
  let langPath;
  let plhPath;
  elements.forEach((el) => {
    langPath = el.dataset.lang;
    element = model.generateStatePathFromString(langPath);
    sideBarView.modifyInnerHTML(el, element.lang[sideBarView.getLanguage()]);
  });
  placeholders.forEach((el) => {
    plhPath = el.dataset.plh;
    element = model.generateStatePathFromString(plhPath);
    sideBarView.modifyPlaceholder(
      el,
      element.placeholder[sideBarView.getLanguage()]
    );
  });
}

/**
 *When the user navigates to different sections, this function updates the input fields (checkbox: checked or unchecked; text field: empty or containing a value) to reflect the value of each field in the state
 * @param {string} areaID id of section container
 * @returns {undefined}
 */
function controlUIInputsState(areaID) {
  let allInputs = helper.selectAllInputsOnContainer(areaID);
  allInputs.forEach((el) => {
    let stringDataState = el.dataset.state;
    let statePath = model.generateStatePathFromString(stringDataState);
    switch (statePath.type) {
      case "checkBox":
        statePath.value == true ? helper.modifyUICheckBox(el) : null;
        break;
      case "radio":
        statePath.value !== ""
          ? helper.modifyUISelect(statePath.name, statePath.value)
          : null;
        break;
      default:
        statePath.value !== ""
          ? helper.modifyUIDefaultElement(el, statePath.value)
          : null;
        break;
    }
  });
}

/**
 *Receives UI input field data and sends the data to the state to modify the value
 * @param {event} event change event
 * @returns {undefined}
 */
function controlDataTransferFromInputToState(event) {
  let eventTarget = event.target;
  let eventTargetType = event.target.type;
  let eventTargetDataSet = eventTarget.dataset.state;
  let coordinates = [eventTargetDataSet, eventTarget, eventTargetType];
  model.updateInputsState(...coordinates);
}

/**
 * Validates if a form submission is valid or invalid
 * @param {event} event submit event
 * @param {function | variable} nextAction defines the following action if the form validation is valid
 * @param {string} [type="function"] it can have the value of "function" (default) or "other"
 * @returns {undefined}
 */
function controlFormValidation(event, nextAction, type = "function") {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  switch (event.currentTarget.checkValidity()) {
    case true:
      type == "other" ? nextAction : nextAction();
      break;
    case false:
      event.currentTarget.reportValidity();
      break;
  }
}

function controlNotePadButtons(event) {
  let button = event.currentTarget.id;
  if (button == "notes") {
    controleNotesButton();
  }
  if (button == "closeButton") {
    sideBarView.reduceHeightNotePad();
  }
}

function controleNotesButton() {
  let currentState = sideBarView.getNotePadState();
  switch (currentState) {
    case "inactive":
      sideBarView.increaseHeightNotePad();
      helper.addHandlerClick("notePadTicketButton", () => {
        controlNotesTicketSubmit();
      });
      break;
    case "active":
      sideBarView.reduceHeightNotePad();
      break;
  }
}

/**
 *Controls the creation/edit/removal of cards in the form section depending on the information in the state
 * @param {object} cardArrays object with recopilation of form data from the state
 * @returns {undefined}
 */
function controlFormCards(cardArrays) {
  let cards = cardArrays;
  cards.forEach((el) => {
    switch (el.checkBox.length == 0 && el.input.length == 0) {
      case true:
        formView.removeExistingCard(el.id);
        break;
      case false:
        let cardExists = formView.checkIfCardAlreadyExist(el.id);
        switch (cardExists) {
          case true:
            formView.addCardElements(el);
            break;

          case false:
            formView.createNewFormCard(el);
            break;
        }
        break;
    }
  });
}

/**
 *Controls wich templates/inputs are inserted in DOM depending on the section the user chooses
 * @param {string} section section of the file chosen by user
 * @returns {undefined}
 */
function controlFraudNotHisSections(section) {
  switch (section) {
    case "invPII":
      fraudNotHisView.displayTemplates(0, 3);
      break;
    case "invTrade":
      fraudNotHisView.displayTemplates("", 3);
      break;
    case "invHard":
      fraudNotHisView.displayTemplates("", 3);
      break;
    case "invEmp":
      fraudNotHisView.displayTemplates("", 3);
      break;
    case "invPubRec":
      fraudNotHisView.displayTemplates(1, 4);
      break;
    case "invSoft":
      fraudNotHisView.displayTemplates(2, 3);
      break;
    default:
      break;
  }
  controlLanguage();
}

/**
 * Controls the investigation cards creation/edit/removal depending on the state information
 */
function controlFraudNotHisInvestigation() {
  let section = model.extractFraudNotHisSection();
  let page = helper.fraudOrNotHisPage();
  let data;
  let convertedData;
  switch (section) {
    case "invPII":
      data = model.extractSectionDataFromStateFraudNotHis(
        model.state.fraudNotHisView,
        "invPII"
      );
      data["page"] = page.id;
      convertedData = helper.createPiiInvestigationTemplate(data);
      model.saveStringInvestigationOnState(...convertedData);
      break;
    case "invEmp":
      data = model.extractSectionDataFromStateFraudNotHis(
        model.state.fraudNotHisView,
        "invEmp"
      );
      data["page"] = page.id;
      convertedData = helper.createEmploymentInvestigationTemplate(data);
      model.saveStringInvestigationOnState(...convertedData);
      break;
    case "invTrade":
      data = model.extractSectionDataFromStateFraudNotHis(
        model.state.fraudNotHisView,
        "invTrade"
      );
      data["page"] = page.id;
      convertedData = helper.createTradeInvestigationTemplate(data);
      model.saveStringInvestigationOnState(...convertedData);
      break;
    case "invPubRec":
      data = model.extractSectionDataFromStateFraudNotHis(
        model.state.fraudNotHisView,
        "invPubRec"
      );
      data["page"] = page.id;
      convertedData = helper.createPubRecInvestigationTemplate(data);
      model.saveStringInvestigationOnState(...convertedData);
      break;
    case "invHard":
      data = model.extractSectionDataFromStateFraudNotHis(
        model.state.fraudNotHisView,
        "invHard"
      );
      data["page"] = page.id;
      convertedData = helper.createHardInquiryInvestigationTemplate(data);
      model.saveStringInvestigationOnState(...convertedData);
      break;
    case "invSoft":
      data = model.extractSectionDataFromStateFraudNotHis(
        model.state.fraudNotHisView,
        "invSoft"
      );
      data["page"] = page.id;
      convertedData = helper.createSoftInquiryInvestigationTemplate(data);
      model.saveStringInvestigationOnState(...convertedData);
      break;
  }
  let pathToExtractData = model.generateStatePathFromString(
    "fraudNotHisView.record"
  );
  let extractInfo = model.extractSpecificArrayFromState(pathToExtractData);
  fraudNotHisView.clearInvestigationAreaUI();
  extractInfo.forEach((el) => fraudNotHisView.generateInvestigationUI(el));
  fraudNotHisView.addHandlerButtonEvents(
    (e) => {
      let buttonInfo = fraudNotHisView.retrieveButtonInformation(e);
      model.removeSpecificFraudNosHisInvestigation(buttonInfo);
      fraudNotHisView.eraseContent(e);
    },
    (e) => {
      fraudNotHisView.copyContentButton(e);
    }
  );
}

function controlCallLogTemplates() {
  let state = model.state.callLogView;
  let template;
  if (state.checkBox9.value !== "") {
    template = callLogView.checkBox9PendingTemplates();
    helper.modifyInnerHTMLContent("areaCheckBox9", template);
  }
  if (state.checkBox9.value == "") {
    helper.modifyInnerHTMLContent("areaCheckBox9");
    state.checkBox9.templates.sub1.value = "";
  }

  if (state.checkBox18.value !== "") {
    template = callLogView.checkBox18PendingTemplates();
    helper.modifyInnerHTMLContent("areaCheckBox18", template);
  }
  if (state.checkBox18.value == "") {
    helper.modifyInnerHTMLContent("areaCheckBox18");
    model.clearValues(state.checkBox18.templates);
  }
  if (state.checkBox22.value !== "") {
    template = callLogView.checkBox22PendingTemplates();
    helper.modifyInnerHTMLContent("areaCheckBox22", template);
  }
  if (state.checkBox22.value == "") {
    helper.modifyInnerHTMLContent("areaCheckBox22");
    model.clearValues(state.checkBox22.templates);
  }

  if (state.checkBox23.value !== "") {
    template = callLogView.checkBox23PendingTemplates();
    helper.modifyInnerHTMLContent("areaCheckBox23", template);
  }
  if (state.checkBox23.value == "") {
    helper.modifyInnerHTMLContent("areaCheckBox23");
    model.clearValues(state.checkBox23.templates);
  }
  controlLanguage();
}

function controlCallLog() {
  let extractData = model.extractDataForCallLogOrSp(model.state.callLogView);
  let callLog = extractData.join(" / ");
  helper.modifyInnerTextContent("callLogText", callLog);
}

function controlSubmitCallLog(event) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  helper.copyTextToClipboard("callLogText");
}

function controlMixedFileArrows(e) {
  let event = e.currentTarget;
  let type = event.dataset.type;

  switch (type) {
    case "account":
      let creditor = model.state.mixedFile.accounts.creditor.value;
      let digits = model.state.mixedFile.accounts.digits.value;
      if (creditor !== "" && digits !== "") {
        let objAccount = mixedFileView.addMixFileAccountPubRec(
          `<li>- ${creditor} ${digits}</li>`,
          "accountsMixedFile"
        );
        model.state.mixedFile.accounts.accountArray.push(objAccount);
        helper.modifyInputValueDispatchEvent("accountCreditor", "");
        helper.modifyInputValueDispatchEvent("accountDigits", "");
        mixedFileView.addHandlerEraseButton((e) => {
          controlMixFileErasure(e);
        });
      }
      break;

    case "hard":
      let creditorHard = model.state.mixedFile.accounts.creditor2.value;
      let date = model.state.mixedFile.accounts.date.value;

      if (creditorHard !== "" && date !== "") {
        let hardAccount = mixedFileView.addMixFileAccountPubRec(
          `<li>- ${creditorHard} ${date}</li>`,
          "hardInquiryMixedFile"
        );
        model.state.mixedFile.accounts.hardArray.push(hardAccount);
        helper.modifyInputValueDispatchEvent("creditorNameHard", "");
        helper.modifyInputValueDispatchEvent("dateHard", "");
        mixedFileView.addHandlerEraseButton((e) => {
          controlMixFileErasure(e);
        });
      }
      break;
  }
}

function controlMixFileInvUI() {
  let pathAccounts = model.state.mixedFile.accounts.accountArray;
  let pathHards = model.state.mixedFile.accounts.hardArray;

  pathAccounts.forEach((el) => {
    let array = Object.values(el);
    let key = Object.keys(el);
    mixedFileView.addMixFileAccountPubRec(
      array[0],
      "accountsMixedFile",
      key[0]
    );
  });

  pathHards.forEach((el) => {
    let array = Object.values(el);
    let key = Object.keys(el);
    mixedFileView.addMixFileAccountPubRec(
      array[0],
      "hardInquiryMixedFile",
      key[0]
    );
  });
}

function controlMixFileErasure(event) {
  let target = event.currentTarget;
  let parent = target.parentElement;
  let keyToRemove = target.parentElement.id;
  let path = model.generateStatePathFromString(target.dataset.path);

  let index = path.findIndex((obj) => obj.hasOwnProperty(keyToRemove));

  if (index !== -1) {
    path.splice(index, 1);
    mixedFileView.eraseParent(parent);
  }
}

function controlMixFileComment() {
  let data = model.extractMixFileData();
  let info = data[0];
  let allAccounts = data[1].flatMap((obj) => Object.values(obj));
  let Accounts = allAccounts.map((str) => str.replace(/<\/?li>/g, ""));
  let allHards = data[2].flatMap((obj) => Object.values(obj));
  let Hards = allHards.map((str) => str.replace(/<\/?li>/g, ""));
  mixedFileView.createMixFileTemplate(info, Accounts, Hards);
}

function controlSinViewOptions() {
  let action = model.state.sinView.protectionRadio.value;
  let template;

  switch (action) {
    case "both":
      template = sinView.templateSinProtectionAlertEmail();
      helper.modifyInnerHTMLContent("templateAreaSin", template);
      break;

    case "onlyNAS":
      template = sinView.templateSinProtection();
      helper.modifyInnerHTMLContent("templateAreaSin", template);
      break;

    case "onlyAlert":
      template = sinView.templateAlertEmail();
      helper.modifyInnerHTMLContent("templateAreaSin", template);
      break;
  }
  controlLanguage();
}

function controlSinDisplay() {
  let action = model.state.sinView.protectionRadio.value;
  let alertType = model.state.sinView.typeAlert.value;
  let phone = model.state.sinView.telephone.value;
  let sin = model.state.sinView.sin.value;
  let language = model.state.sinView.communication.value;
  let contact = model.state.sinView.contact.value;
  let display;
  switch (action) {
    case "both":
      display = sinView.outputSinProtectionAlertEmail(
        alertType,
        phone,
        sin,
        language,
        contact
      );
      helper.modifyInnerHTMLContent("displayTemplate", display);
      break;

    case "onlyNAS":
      display = sinView.outputSinProtection(sin);
      helper.modifyInnerHTMLContent("displayTemplate", display);
      break;

    case "onlyAlert":
      display = sinView.outputAlertEmail(alertType, phone, language, contact);
      helper.modifyInnerHTMLContent("displayTemplate", display);
      break;
  }
}

function controlSPUI() {
  let state = model.state.spView.actionsTaken;
  let template;
  if (state.checkBox12.value !== "") {
    template = spView.checkBox12PendingTemplates();
    helper.modifyInnerHTMLContent("areaCheckBox12", template);
  }
  if (state.checkBox12.value == "") {
    helper.modifyInnerHTMLContent("areaCheckBox12");
    state.checkBox12.value = "";
    model.clearValues(state.checkBox12.templates);
  }
  controlLanguage();
}

function controlSpDisplay() {
  let extractActions = model.extractDataForCallLogOrSp(
    model.state.spView.actionsTaken
  );
  let actions = extractActions.join(" / ");
  let reason = model.state.spView.reasonForCall.value;
  let detailsArray = model.state.spView.tickets.value;
  let details = detailsArray.join(", ");

  let template = spView.createSPMainTemplate(reason, actions, details);
  helper.modifyInnerHTMLContent("spText", template);
}

function controlTicketSubmit() {
  let inputData = spView.extractTicketInfo();
  let ticket = inputData[0].value;
  let type = inputData[1].value;
  if (ticket) {
    model.modifyStateTicketValue(type, ticket);
    helper.modifyInputValueDispatchEvent("spTicketInputId", "");
  }
}
function controlNotesTicketSubmit() {
  let [input,type] = sideBarView.extractTicketInfo();
  let emailFraudNotHis = model.generateStatePathFromString("fraudNotHisView.results");
  let emailSIN = model.generateStatePathFromString("sinView.contact");
  let spArea = document.getElementById("spArea");
  let fraudNotHisArea = document.getElementById("investigateContainer");
  let sinArea = document.getElementById("sinViewArea");

   if (input.value){
  switch (type.value) {
    case "Email":
        emailFraudNotHis.value = input.value;
        emailSIN.value = input.value;
        fraudNotHisArea ? controlUIInputsState("investigateContainer") : null;
        sinArea ? controlUIInputsState("sinViewArea") : null;
      break;
    case "Ticket":
       model.modifyStateTicketValue("", input.value);
      break;
    case "BCL":
        model.modifyStateTicketValue("bcl", input.value);
      break;
    case "BCL Urgent":
        model.modifyStateTicketValue("bclUrgent", input.value);
      break;
  }
helper.modifyInputValueDispatchEvent("NoteTicketInputId", "");
spArea ? controlSpDisplay() & controlButtonDisabled() : null;
}
}

function controlButtonDisabled() {
  let formBCL = model.state.spView.tickets.bcl.normal;
  let formBCLUgent = model.state.spView.tickets.bcl.urgent;
  if (formBCL.length !== 0 || formBCLUgent.length !== 0) {
    spView.modifySheetButton(false);
  } else {
    spView.modifySheetButton(true);
  }
}

function controlModalBody() {
  let bclForm = model.state.spView.tickets.bcl.normal;
  let bclFormUrgent = model.state.spView.tickets.bcl.urgent;
  spView.modifyModalBody(bclForm, bclFormUrgent);
}

function controlModalBodyTwo() {
  let language = sideBarView.getLanguage();
  let domElements = sideBarView.modifyModalBodyTwo();

  switch (language) {
    case "fr":
      sideBarView.modifyModalBodyTwoFR(domElements);
      break;

    case "en":
      sideBarView.modifyModalBodyTwoEN(domElements);
      break;
  }
}

function refreshPage() {
  
   sideBarView.eraseContentLoading();
    google.script.run
      .withSuccessHandler(function (url) {
        window.top.location.replace(url);
      })
      .getWebAppUrl();
}

function controlOpenNewTab() {
 
    google.script.run
      .withSuccessHandler(function (url) {
        sideBarView.openNewTab(url);
      })
      .getWebAppUrl();
}

/**
 * Receives BCL form information and starts backend function to record data in sheets
 */
function controlTransferInfoToSheets() {
  spView.modifyMessageArea("loading");
   let data = model.stringifyBCLData();
    google.script.run
      .withSuccessHandler((msg) => spView.modifyMessageArea("succes", msg))
      .withFailureHandler((err) => spView.modifyMessageArea("error", err.message))
      .processDataObject(data);
}

const init = function () {
  helper.addHandlerClick("dashboardButton", () => {
    sideBarView.modifySideBarSize();
  });
  sideBarView.addHandlerNotePadButtons((e) => {
    controlNotePadButtons(e);
  });
  helper.addHandlerClick("languageButton", () => {
    controlLanguageChange();
  });
  helper.addHandlerClick("formButton", () => {
    sideBarView.styleClickedButton("formButton");
    formView.render();
    controlLanguage();
    controlUIInputsState("formViewContainer");
    helper.addHandlerChange("formViewContainer", (e) => {
      controlDataTransferFromInputToState(e);
      let formCards = model.extractFormDataFromState();
      controlFormCards(formCards);
    });
    let formCards = model.extractFormDataFromState();
    controlFormCards(formCards);
  });

  helper.addHandlerClick("fraudButton", () => {
    sideBarView.styleClickedButton("fraudButton");
    fraudNotHisView.page = "fraud";
    fraudNotHisView.render();
    controlLanguage();
    let section = model.extractFraudNotHisSection();
    controlFraudNotHisSections(section);
    controlUIInputsState("investigateContainer");
    helper.addHandlerSubmit("investigationForm", (e) => {
      let nextAction = controlFraudNotHisInvestigation;
      controlFormValidation(e, nextAction);
    });
    fraudNotHisView.addHandlerSectionEvent((e) => {
      controlFraudNotHisSections(e.target.id);
      helper.addHandlerSubmit("investigationForm", (e) => {
        let nextAction = controlFraudNotHisInvestigation;
        controlFormValidation(e, nextAction);
      });
    });
    helper.addHandlerChange("investigationForm", (e) => {
      controlDataTransferFromInputToState(e);
    });

    let extractInfo = model.extractSpecificArrayFromState(
      model.state.fraudNotHisView.record
    );
    extractInfo.forEach((el) => fraudNotHisView.generateInvestigationUI(el));
    fraudNotHisView.addHandlerButtonEvents(
      (e) => {
        let buttonInfo = fraudNotHisView.retrieveButtonInformation(e);
        model.removeSpecificFraudNosHisInvestigation(buttonInfo);
        fraudNotHisView.eraseContent(e);
      },
      (e) => {
        fraudNotHisView.copyContentButton(e);
      }
    );
  });

  helper.addHandlerClick("notHisButton", () => {
    sideBarView.styleClickedButton("notHisButton");
    fraudNotHisView.page = "notHis";
    fraudNotHisView.render();
    controlLanguage();
    let section = model.extractFraudNotHisSection();
    controlFraudNotHisSections(section);
    controlUIInputsState("investigateContainer");
    helper.addHandlerSubmit("investigationForm", (e) => {
      let nextAction = controlFraudNotHisInvestigation;
      controlFormValidation(e, nextAction);
    });
    fraudNotHisView.addHandlerSectionEvent((e) => {
      controlFraudNotHisSections(e.target.id);
      helper.addHandlerSubmit("investigationForm", (e) => {
        let nextAction = controlFraudNotHisInvestigation;
        controlFormValidation(e, nextAction);
      });
    });
    helper.addHandlerChange("investigationForm", (e) => {
      controlDataTransferFromInputToState(e);
    });
    let extractInfo = model.extractSpecificArrayFromState(
      model.state.fraudNotHisView.record
    );
    extractInfo.forEach((el) => fraudNotHisView.generateInvestigationUI(el));
    fraudNotHisView.addHandlerButtonEvents(
      (e) => {
        let buttonInfo = fraudNotHisView.retrieveButtonInformation(e);
        model.removeSpecificFraudNosHisInvestigation(buttonInfo);
        fraudNotHisView.eraseContent(e);
      },
      (e) => {
        fraudNotHisView.copyContentButton(e);
      }
    );
  });
  helper.addHandlerClick("callLogButton", () => {
    sideBarView.styleClickedButton("callLogButton");
    callLogView.render();
    controlLanguage();
    controlCallLogTemplates();
    controlUIInputsState("callLogContainer");
    controlCallLog();
    helper.addHandlerChange("callLogContainer", (e) => {
      controlDataTransferFromInputToState(e);
      controlCallLogTemplates();
      controlUIInputsState("callLogContainer");
      controlCallLog();
    });
    helper.addHandlerSubmit("callLogContainer", (e) => {
      controlSubmitCallLog(e);
    });
    helper.addHandlerDropdown("dropdownAUTH", (e) => {
      let text = e.target.dataset.value;
      helper.modifyInputValueDispatchEvent("dropdownInput", text);
    });
  });

  helper.addHandlerClick("mixFileButton", () => {
    sideBarView.styleClickedButton("mixFileButton");
    mixedFileView.render();
    controlLanguage();
    controlUIInputsState("mixFileContainer");
    controlMixFileInvUI();
    helper.addHandlerChange("mixFileContainer", (e) => {
      controlDataTransferFromInputToState(e);
      controlUIInputsState("mixFileContainer");
    });
    helper.addHandlerClick("buttonAccounts", (e) => {
      controlMixedFileArrows(e);
    });
    helper.addHandlerClick("buttonHard", (e) => {
      controlMixedFileArrows(e);
    });
    mixedFileView.addHandlerEraseButton((e) => {
      controlMixFileErasure(e);
    });
    helper.addHandlerSubmit("mixFileContainer", (e) => {
      let nextAction = controlMixFileComment;
      controlFormValidation(e, nextAction);
    });
  });

  helper.addHandlerClick("nasAlertButton", () => {
    sideBarView.styleClickedButton("nasAlertButton");
    sinView.render();
    controlSinViewOptions();
    controlSinDisplay();
    controlUIInputsState("sinViewArea");
    sinView.addHandlerTypeOfAction((e) => {
      controlDataTransferFromInputToState(e);
      controlSinViewOptions();
    });
    helper.addHandlerChange("sinViewArea", (e) => {
      controlDataTransferFromInputToState(e);
      controlUIInputsState("sinViewArea");
      controlSinDisplay();
    });
    helper.addHandlerSubmit("sinViewArea", (e) => {
      let nextAction = helper.copyTextToClipboard("displayTemplate");
      controlFormValidation(e, nextAction, "other");
    });
  });

  helper.addHandlerClick("spButton", () => {
    sideBarView.styleClickedButton("spButton");
    spView.render();
    controlLanguage();
    controlSPUI();
    controlUIInputsState("spArea");
    controlSpDisplay();
    controlButtonDisabled();
    helper.addHandlerChange("spArea", (e) => {
      controlDataTransferFromInputToState(e);
      controlSPUI();
      controlUIInputsState("spArea");
      controlSpDisplay();
      controlButtonDisabled();
    });
    helper.addHandlerDropdown("dropdownReason", (e) => {
      let text = e.target.dataset.value;
      helper.modifyInputValueDispatchEvent("reasonInput", text);
    });
    helper.addHandlerDropdown("dropdownAUTH", (e) => {
      let text = e.target.dataset.value;
      helper.modifyInputValueDispatchEvent("dropdownManAuth", text);
    });
    helper.addHandlerClick("spTicketButton", () => {
      controlTicketSubmit();
      controlSpDisplay();
    });
    helper.addHandlerClick("sheetsButton", (e) => {
      spView.correctModalFocus();
      model.state.spView.tickets.bcl.value = "Alberto Saborio";
      controlModalBody();
      controlLanguage();
    });
    helper.addHandlerClick("sendButton", (e) => {
      controlTransferInfoToSheets();
    });
    helper.addHandlerSubmit("spArea", (e) => {
      let nextAction = helper.copyTextToClipboard("spText");
      controlFormValidation(e, nextAction, "other");
    });
  });
  helper.addHandlerClick("summaryButton", () => {
    sideBarView.styleClickedButton("summaryButton");
    summaryView.render();
    controlLanguage();
    summaryView.addHandlerCopyPaste((e)=>{
      helper.getSiblingLabel(e.currentTarget);
    })
    helper.addHandlerSubmit("summaryContainer", (e) => {
      let nextAction = summaryView.summaryTemplate();
      controlFormValidation(e, nextAction, "other");
    });
  });
  helper.addHandlerClick("eraseContentButton", (e) => {
    spView.correctModalFocus();
    controlModalBodyTwo();
    helper.addHandlerClick("modalEraseButtonTwo", refreshPage);
  });
  helper.addHandlerClick("newPageButton", (e) => {
    controlOpenNewTab();
  });
};

document.addEventListener('DOMContentLoaded', () => {
init();
controlLanguageChange()
});

