import * as helper from "./helpers.js";
import iconView from "./views/iconView.js";

export function extractFormDataFromState() {
  let cardDataObjects = [];

  Object.keys(state.formView).forEach((key) => {
    let subKey = state.formView[key];
    let cardDataObject = {
      id: subKey.header.id,
      title: subKey.header.form,
      header: subKey.header.html,
      checkBox: [],
      input: [],
    };

    Object.keys(subKey).forEach((el) => {
      switch (subKey[el].type) {
        case "checkBox":
          if (subKey[el].value == true) {
            cardDataObject.checkBox.push({
              id: subKey[el].id,
              text: subKey[el].form,
            });
          }
          break;

        case "input":
          if (subKey[el].value !== "") {
            cardDataObject.input.push({
              id: subKey[el].id,
              text: subKey[el].form,
              value: subKey[el].value,
            });
            break;
          }
        default:
          null;
          break;
      }
    });
    cardDataObjects.push(cardDataObject);
  });
  return cardDataObjects;
}

export function generateStatePathFromString(pathString) {
  let modelState = state;
  let dataArray = pathString.split(".");
  let dataState = dataArray.reduce((obj, key) => obj[key], modelState);
  return dataState;
}

export function updateInputsState(path, eventTarget, eventType) {
  let stateElement = generateStatePathFromString(path);
  switch (eventType) {
    case "checkbox":
      stateElement.value = eventTarget.checked;
      break;

    default:
      stateElement.value = eventTarget.value;
      break;
  }
}

export function extractSectionDataFromStateFraudNotHis(
  initialPath,
  submitType
) {
  let file = initialPath.selectFile.value;
  let language = initialPath.invLanguage.value;
  let contact = initialPath.results.value;
  let typePii = initialPath.typePii.value;
  let typePubRec = initialPath.typePubRec.value;
  let typeSofInq = initialPath.typeSofInq.value;
  let info = initialPath.investigate.value;
  let infoCreditor = initialPath.investigatePubRec.creditor.value;
  let infoDigits = initialPath.investigatePubRec.lastFourDigits.value;
  let infoObject = {
    file: file,
    contact: contact,
  };

  switch (submitType) {
    case "invPII":
      infoObject["language"] = language;
      infoObject["typePii"] = typePii;
      infoObject["info"] = info;
      return infoObject;

    case "invEmp":
      infoObject["language"] = language;
      infoObject["info"] = info;
      return infoObject;

    case "invTrade":
      infoObject["info"] = info;
      return infoObject;

    case "invPubRec":
      infoObject["typePubRec"] = typePubRec;
      infoObject["infoCreditor"] = infoCreditor;
      infoObject["infoDigits"] = infoDigits;
      return infoObject;

    case "invHard":
      infoObject["info"] = info;
      return infoObject;

    case "invSoft":
      infoObject["language"] = language;
      infoObject["info"] = info;
      infoObject["typeSofInq"] = typeSofInq;
      return infoObject;
  }
}

export function saveStringInvestigationOnState(obj, type, pathString) {
  let path = generateStatePathFromString(pathString);

  switch (type) {
    case "newObject":
      path.push(obj);
      break;

    case "addToObject":
      let objectKey = Object.keys(path[0]);
      path[0][objectKey].textArray.push(obj);
      break;
  }
}
export function extractSpecificArrayFromState(obj) {
  let results = [];

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      if ((key === "fraud" || key === "notHis") && Array.isArray(obj[key])) {
        results.push(...obj[key]);
      } else {
        results = results.concat(extractSpecificArrayFromState(obj[key]));
      }
    }
  }
  return results;
}

export function removeSpecificFraudNosHisInvestigation(objArray) {
  let path = generateStatePathFromString(objArray[0]);
  let indice = path.findIndex((obj) => obj.hasOwnProperty(objArray[1]));
  path.splice(indice, 1);
}

export function clearValues(obj) {
  if (Array.isArray(obj)) {
    obj.forEach((item) => clearValues(item));
  } else if (obj !== null && typeof obj === "object") {
    for (let key in obj) {
      if (key === "value") {
        obj[key] = "";
      } else {
        clearValues(obj[key]);
      }
    }
  }
}

export function extractDataForCallLogOrSp(path) {
  let callLogArray = [];

  for (let key in path) {
    let secondayArray = [];
    let main = helper.generateCallLogElement(path[key]);
    if (path[key].templates) {
      for (let subkey in path[key].templates) {
        let secondary = helper.generateCallLogElement(
          path[key].templates[subkey]
        );
        if (secondary !== "" && secondary !== undefined)
          secondayArray.push(secondary);
      }
    }
    if (main !== "" && main !== undefined) {
      let template;
      if (secondayArray.length > 0) {
        template = `${main}  (${secondayArray.join(", ")}) `;
      } else {
        template = main;
      }
      callLogArray.push(template);
    }
  }

  return callLogArray;
}

export function extractMixFileData() {
  let data = state.mixedFile;
  let dataArray = [
    data.mixedFilesUN.value,
    data.currentPII.name.value,
    data.currentPII.address.value,
    data.currentPII.dateOfBirth.value,
    data.currentPII.sin.value,
    data.currentPII.phoneNumber.value,
    data.currentPII.emp.value,
    data.previousPII.names.value,
    data.previousPII.address.value,
    data.previousPII.sin.value,
    data.previousPII.phone.value,
    data.others.aTicket.value,
    data.others.rush.value,
    data.others.sf.value,
  ];

  let accountArray = data.accounts.accountArray;
  let hardArray = data.accounts.hardArray;

  return [dataArray, accountArray, hardArray];
}

export function modifyStateTicketValue(type, value) {
  let ticketObject = state.spView.tickets;
  switch (type) {
    case "bcl":
      ticketObject.bcl.normal.push(value);
      break;
    case "bclUrgent":
      ticketObject.bcl.urgent.push(value);
      break;
    default:
      null;
      break;
  }
  ticketObject.value.push(value);
}

export function stringifyBCLData() {
  let data = state.spView.tickets.bcl;
  let jsonString = JSON.stringify(data);
  return jsonString;
}

export function extractFraudNotHisSection() {
  let section = state.fraudNotHisView.sectionFile.value;
  return section;
}

export const state = {
  sideBarView: {
    welcome:{lang: { en: "Welcome!!", fr: "¡Bienvenue!" }},
    dashboard: { lang: { en: "Dashboard", fr: "Tableau de bord" } },
    form: { lang: { en: "Form", fr: "Formulaire" } },
    dispute: {
      lang: {
        en: `Dispute  ${iconView.caretDown()}`,
        fr: `Enquête  ${iconView.caretDown()}`,
      },
    },
    sinAlert: { lang: { en: "SIN/Alert", fr: "NAS/Alerte " } },
    sinAlertIcon: { lang: { en: "SIN", fr: "NAS" } },
    sp: { lang: { en: "SP Comment", fr: "SP Commentaire " } },
    summary: { lang: { en: "Summary", fr: "Résumé" } },
    settings: {
      lang: {
        en: `Settings ${iconView.caretDown()}`,
        fr: `Paramètres ${iconView.caretDown()}`,
      },
    },
    erase: { lang: { en: "Erase", fr: "Effacer" } },
    new: { lang: { en: "New", fr: "Nouveau" } },
    langueDesc: { lang: { en: "Français", fr: "English" } },
  },
  notepad: {
    formBCL: { lang: { en: "Form BCL", fr: "Formulaire BCL" } },
    formBCLUrgent: {
      lang: { en: "Form BCL URGENT**", fr: "Formulaire BCL URGENT**" },
    },
  },
  formView: {
    bclPII: {
      header: {
        type: "title",
        form: "PII (BCL)",
        id: "bclPii",
        html: `<i><span>**Assistel case, please DO NOT TOUCH**</i></br>
          Consumer will send documents to:`,
      },
      name: {
        lang: { en: "Name", fr: "Nom" },
        type: "checkBox",
        value: false,
        form: `<li id="li_name">-Update Name</li>`,
        id: `li_name`,
      },
      address: {
        lang: { en: "Address", fr: "Adresse" },
        type: "checkBox",
        value: false,
        form: `<li id="li_address">-Update Address</li>`,
        id: `li_address`,
      },
      dbs: {
        lang: { en: "Date of Birth", fr: "Date de naissance" },
        type: "checkBox",
        value: false,
        form: `<li id="li_dbs">-Update Date of birth</li>`,
        id: `li_dbs`,
      },
      sin: {
        lang: { en: "SIN", fr: "NAS" },
        type: "checkBox",
        value: false,
        form: `<li id="li_sin">-Update Social Insurance Number</li>`,
        id: `li_sin`,
      },
      phone: {
        lang: { en: "Telephone", fr: "Téléphone" },
        type: "checkBox",
        value: false,
        form: `<li id="li_phone">-Update Telephone</li>`,
        id: `li_phone`,
      },
      sin3rd: {
        lang: { en: "SIN 3rd Party File", fr: "NAS dossier tiers" },
        type: "checkBox",
        value: false,
        form: `<li id="li_sin3rd">-Cx call  because his/her SIN XXX-XXX-XXX is showing in UN XXXXXXXXXX all other info is not his. Remove it and place it in the consumer’s file UN XXXXXXXXXX</li>`,
        id: `li_sin3rd`,
      },
      mirror: {
        lang: { en: "Mirror", fr: "Miroir" },
        type: "checkBox",
        value: false,
        form: `<li id="li_mirror">-Mirror SF</li>`,
        id: `li_mirror`,
      },
      password: {
        lang: { en: "Password", fr: "Mot de passe" },
        type: "checkBox",
        value: false,
        form: `<li id="li_password">-Receive Forgot Password Link</li>`,
        id: `li_password`,
      },
      email: {
        lang: { en: "Email", fr: "Courriel" },
        type: "checkBox",
        value: false,
        form: `<li id="li_email">-Change/Update Email</li>`,
        id: `li_email`,
      },
      free: {
        lang: { en: "Free Product", fr: "Produit gratuit" },
        type: "checkBox",
        value: false,
        form: `<li id="li_free">-Activate Free Product</li>`,
        id: `li_free`,
      },
      fraudAddress: {
        lang: { en: "Fraud Address", fr: "Adresse frauduleuse" },
        type: "input",
        value: "",
        form: `<li id="li_fraudAddress">-Remove Fraudulent Address: </li>`,
        id: `li_fraudAddress`,
        placeholder: { en: "Address", fr: "Adresse" },
      },
      oldAddress: {
        lang: { en: "Old Address", fr: "Ancienne adresse" },
        type: "input",
        value: "",
        form: `<li id="li_oldAddress">-Remove Old Address: </li>`,
        id: `li_oldAddress`,
        placeholder: { en: "Address", fr: "Adresse" },
      },
      oldtelephone: {
        lang: { en: "Old Telephone", fr: "Ancien téléphone" },
        type: "input",
        value: "",
        form: `<li id="li_oldtelephone">-Remove Old Telephone: </li>`,
        id: `li_oldtelephone`,
        placeholder: { en: "Telephone", fr: "Téléphone" },
      },
      multipleFiles: {
        lang: { en: "Multiple Files", fr: "Dossiers Multiples" },
        type: "input",
        value: "",
        form: `<li id="li_multipleFiles">-Merge Multiple Files: </li>`,
        id: `li_multipleFiles`,
      },
    },
    bclEmp: {
      header: {
        type: "title",
        form: "Employment (BCL)",
        id: "bclEmp",
        html: ` <i><span>**Assistel case, please DO NOT TOUCH**</i></br>
      Consumer will send documents to:`,
      },
      emp: {
        lang: { en: "Employment", fr: "Emploi" },
        type: "checkBox",
        value: false,
        form: `<li id="li_emp">-Update Employment</li>`,
        id: `li_emp`,
      },
      fraudEmp: {
        lang: { en: "Fraud ES", fr: "Fraude ES" },
        type: "input",
        value: "",
        form: `<li id="li_fraudEmp">-Remove Fraud Employment: </li>`,
        id: `li_fraudEmp`,
        placeholder: { en: "Employment", fr: "Emploi" },
      },
    },
    bclConSta: {
      header: {
        type: "title",
        form: "Consumer Statement (BCL)",
        id: "bclConSta",
        html: ` <i><span>**Assistel case, please DO NOT TOUCH**</i></br>
          Consumer will send documents to:`,
      },
      conSta: {
        lang: { en: "Consumer Statement", fr: "Déclaration consomateur" },
        type: "checkBox",
        value: false,
        form: `<li id="li_conSta">-Add Consumer Statement</li>`,
        id: `li_conSta`,
      },
      changeAlert: {
        lang: { en: "Lost-ID to Fraud Alert", fr: "Alerte Lost-ID  à Fraude" },
        type: "checkBox",
        value: false,
        form: `<li id="li_changeAlert">-Change Lost-ID to Fraud Alert</li>`,
        id: `li_changeAlert`,
      },
      phnAlert: {
        lang: { en: "Alert Telephone", fr: "Téléphone Alerte" },
        type: "checkBox",
        value: false,
        form: `<li id="li_phnAlert">-Update Telephone in Alert</li>`,
        id: `li_phnAlert`,
      },
    },
    canMixed: {
      header: {
        type: "title",
        form: "PII (Mixed File)",
        id: "canMixed",
        html: "",
      },
      mixed: {
        lang: { en: "Mixed File", fr: "Mixed File" },
        type: "input",
        value: "",
        form: `<li id="li_mixed">Do Not Touch -Mixed File Case. I advised cx to send in Documents/IDs -</li>`,
        id: `li_mixed`,
      },
    },
    canSecNot: {
      header: {
        type: "title",
        form: "PII (Salesforce)",
        id: "canSecNot",
        html: "",
      },
      secNotOne: {
        lang: { en: "Security Notice 1", fr: "Security Notice 1" },
        type: "input",
        value: "",
        form: `<li id="li_secNotOne">Security notice 1: Cx confirmed salesforce profile belongs to them. Cx needs to send proof of ID, salesforce account is locked. Case #: </li>`,
        id: `li_secNotOne`,
      },
      secNotTwo: {
        lang: { en: "Security Notice 2", fr: "Security Notice 2" },
        type: "input",
        value: "",
        form: `<li id="li_secNotTwo">Security notice 2: Cx confirmed salesforce does not belong to them. Cx needs to send proof of ID, salesforce account is locked. Case #: </li>`,
        id: `li_secNotTwo`,
      },
    },
    canMinSin: {
      header: {
        type: "title",
        form: "PII (Empty)",
        id: "canMinSin",
        html: `Consumer will send documents to:`,
      },
      minSin: {
        lang: { en: "Minor SIN Protection", fr: "Protection NAS Mineur" },
        type: "checkBox",
        value: false,
        form: `<li id="li_minSin">-Add Minor SIN protection</li>`,
        id: `li_minSin`,
      },
    },
    canConSta: {
      header: {
        type: "title",
        form: "Consumer Statement (Empty)",
        id: "canConSta",
        html: `Consumer will send documents to:`,
      },
      addLock: {
        lang: { en: "Activate Lock", fr: "Verrouiller" },
        type: "checkBox",
        value: false,
        form: `<li id="li_addLock">-Add Credit Lock</li>`,
        id: `li_addLock`,
      },
      removeLock: {
        lang: { en: "Remove Lock", fr: "Déverrouiller" },
        type: "checkBox",
        value: false,
        form: `<li id="li_removeLock">-Remove Credit Lock</li>`,
        id: `li_removeLock`,
      },
      minAlert: {
        lang: { en: "Alert Minor", fr: "Alerte mineure" },
        type: "checkBox",
        value: false,
        form: `<li id="li_minAlert">-Add Minor Alert</li>`,
        id: `li_minAlert`,
      },
    },
  },
  fraudNotHisView: {
    titleFraud: {
      lang: { en: "Fraud Investigation", fr: "Enquête de la Fraude" },
      type: "title",
    },
    titleNotHis: {
      lang: { en: "Not-His Investigation", fr: "Enquête Not-His" },
      type: "title",
    },
    selectFile: {
      lang: { en: "Select File", fr: "Sélectionner un Dossier" },
      type: "select",
      value: "mainFile",
      files: {
        mainFile: {
          lang: { en: "Main File", fr: "Dossier Principal" },
        },
      },
    },

    invLanguage: {
      lang: { en: "Language", fr: "Langue" },
      type: "radio",
      name: "invLanguage",
      value: "",
    },
    results: {
      lang: { en: "Send Results to", fr: "Envoyer les résultats à" },
      type: "input",
      value: "",
      placeholder: {
        en: "Email or Post Address",
        fr: "Adresse e-mail ou postale",
      },
    },
    sectionFile: {
      lang: { en: "Section of file", fr: "Section du Dossier" },
      type: "radio",
      name: "section",
      value: "",
      section: {
        radioPii: {
          lang: { en: "Personal Information", fr: "Information Personnelle" },
        },
        radioEmp: {
          lang: { en: "Employment", fr: "Emploi" },
        },
        radioTrades: {
          lang: { en: "Trades", fr: "Opérations commerciales" },
        },
        radioPubRec: {
          lang: { en: "Public Records", fr: "Dossiers Publics" },
        },
        radioHard: {
          lang: { en: "Hard Inquiries", fr: "Interrogation de Credit" },
        },
        radioSoft: {
          lang: { en: "Soft Inquiries", fr: "Consultations" },
        },
      },
    },
    typePii: {
      lang: {
        en: "Type of Personal Information",
        fr: "Type Information Personnelle",
      },
      type: "radio",
      name: "invPiiElements",
      value: "",
      radios: {
        name: { lang: { en: "AKA/Name", fr: "AKA/Nom" } },
        address: { lang: { en: "Address", fr: "Adresse" } },
        telephone: { lang: { en: "Telephone", fr: "Téléphone" } },
      },
    },
    investigate: {
      lang: { en: "Enter Information", fr: "Saisir les informations" },
      type: "input",
      value: "",
    },
    typePubRec: {
      lang: { en: "Type of Public Record", fr: "Type de Dossier Public" },
      type: "radio",
      name: "typePublicRecord",
      value: "",
      radios: {
        bankrupcy: { lang: { en: "Bankrupcy", fr: "Requête en Faillite" } },
        conDeb: {
          lang: { en: "Consolidated Debt", fr: "Consolidation de Dettes" },
        },
        judgment: { lang: { en: "Judgements", fr: "Jugements" } },
        debRec: {
          lang: { en: "Debt Recovery", fr: "Recouvrement de créances" },
        },
        collection: {
          lang: { en: "Collections", fr: "Recouvrement" },
        },
      },
    },
    typeSofInq: {
      lang: { en: "Type of Soft Inquiry", fr: "Type de Consultation" },
      type: "radio",
      name: "sofInquiries",
      value: "",
      radios: {
        invNormalSoft: { lang: { en: "Normal", fr: "Normal" } },
        invBorrowell: { lang: { en: "Borrowell", fr: "Borrowell" } },
      },
    },
    investigatePubRec: {
      lang: { en: "Enter Information", fr: "Saisir les informations" },
      type: "input",
      creditor: {
        type: "input",
        value: "",
        placeholder: {
          en: "Creditor",
          fr: "Créancier",
        },
      },
      lastFourDigits: {
        type: "input",
        value: "",
        placeholder: {
          en: "Last 4 digits",
          fr: "4 derniers chiffres",
        },
      },
    },
    record: {
      mainFile: {
        invPII: {
          invAKA: { fraud: [], notHis: [] },
          invAddress: { fraud: [], notHis: [] },
          invTelephone: { fraud: [], notHis: [] },
        },
        invEmp: { fraud: [], notHis: [] },
        invTrade: { fraud: [], notHis: [] },
        invPubRec: {
          invBankrupcy: { fraud: [], notHis: [] },
          invConsolidatedDebt: { fraud: [], notHis: [] },
          invJudgements: { fraud: [], notHis: [] },
          invDebtRecovery: { fraud: [], notHis: [] },
          invCollections: { fraud: [], notHis: [] },
        },
        invHard: { fraud: [], notHis: [] },
        invSoft: {
          invNormalSoft: { fraud: [], notHis: [] },
          invBorrowell: { fraud: [], notHis: [] },
        },
      },
      multipleOne: {
        invPII: {
          invAKA: { fraud: [], notHis: [] },
          invAddress: { fraud: [], notHis: [] },
          invTelephone: { fraud: [], notHis: [] },
        },
        invEmp: { fraud: [], notHis: [] },
        invTrade: { fraud: [], notHis: [] },
        invPubRec: {
          invBankrupcy: { fraud: [], notHis: [] },
          invConsolidatedDebt: { fraud: [], notHis: [] },
          invJudgements: { fraud: [], notHis: [] },
          invDebtRecovery: { fraud: [], notHis: [] },
          invCollections: { fraud: [], notHis: [] },
        },
        invHard: { fraud: [], notHis: [] },
        invSoft: {
          invNormalSoft: { fraud: [], notHis: [] },
          invBorrowell: { fraud: [], notHis: [] },
        },
      },
      multipleTwo: {
        invPII: {
          invAKA: { fraud: [], notHis: [] },
          invAddress: { fraud: [], notHis: [] },
          invTelephone: { fraud: [], notHis: [] },
        },
        invEmp: { fraud: [], notHis: [] },
        invTrade: { fraud: [], notHis: [] },
        invPubRec: {
          invBankrupcy: { fraud: [], notHis: [] },
          invConsolidatedDebt: { fraud: [], notHis: [] },
          invJudgements: { fraud: [], notHis: [] },
          invDebtRecovery: { fraud: [], notHis: [] },
          invCollections: { fraud: [], notHis: [] },
        },
        invHard: { fraud: [], notHis: [] },
        invSoft: {
          invNormalSoft: { fraud: [], notHis: [] },
          invBorrowell: { fraud: [], notHis: [] },
        },
      },
      multipleThree: {
        invPII: {
          invAKA: { fraud: [], notHis: [] },
          invAddress: { fraud: [], notHis: [] },
          invTelephone: { fraud: [], notHis: [] },
        },
        invEmp: { fraud: [], notHis: [] },
        invTrade: { fraud: [], notHis: [] },
        invPubRec: {
          invBankrupcy: { fraud: [], notHis: [] },
          invConsolidatedDebt: { fraud: [], notHis: [] },
          invJudgements: { fraud: [], notHis: [] },
          invDebtRecovery: { fraud: [], notHis: [] },
          invCollections: { fraud: [], notHis: [] },
        },
        invHard: { fraud: [], notHis: [] },
        invSoft: {
          invNormalSoft: { fraud: [], notHis: [] },
          invBorrowell: { fraud: [], notHis: [] },
        },
      },
      multipleFour: {
        invPII: {
          invAKA: { fraud: [], notHis: [] },
          invAddress: { fraud: [], notHis: [] },
          invTelephone: { fraud: [], notHis: [] },
        },
        invEmp: { fraud: [], notHis: [] },
        invTrade: { fraud: [], notHis: [] },
        invPubRec: {
          invBankrupcy: { fraud: [], notHis: [] },
          invConsolidatedDebt: { fraud: [], notHis: [] },
          invJudgements: { fraud: [], notHis: [] },
          invDebtRecovery: { fraud: [], notHis: [] },
          invCollections: { fraud: [], notHis: [] },
        },
        invHard: { fraud: [], notHis: [] },
        invSoft: {
          invNormalSoft: { fraud: [], notHis: [] },
          invBorrowell: { fraud: [], notHis: [] },
        },
      },
      multipleFive: {
        invPII: {
          invAKA: { fraud: [], notHis: [] },
          invAddress: { fraud: [], notHis: [] },
          invTelephone: { fraud: [], notHis: [] },
        },
        invEmp: { fraud: [], notHis: [] },
        invTrade: { fraud: [], notHis: [] },
        invPubRec: {
          invBankrupcy: { fraud: [], notHis: [] },
          invConsolidatedDebt: { fraud: [], notHis: [] },
          invJudgements: { fraud: [], notHis: [] },
          invDebtRecovery: { fraud: [], notHis: [] },
          invCollections: { fraud: [], notHis: [] },
        },
        invHard: { fraud: [], notHis: [] },
        invSoft: {
          invNormalSoft: { fraud: [], notHis: [] },
          invBorrowell: { fraud: [], notHis: [] },
        },
      },
    },
  },
  mixedFile: {
    mixedFilesUN: {
      value: "",
      type: "input",
    },
    currentPII: {
      lang: {
        en: "Current PII (provided by the consumer on the phone, NOT the PII on file)",
        fr: "PII actuelles (fournies par le consommateur par téléphone, et NON celles figurant dans le dossier)",
      },
      name: {
        type: "input",
        lang: {
          en: "Name :",
          fr: "Nom :",
        },
        value: "",
        placeholder: {
          en: "Last Name, First Name, Middle name(s)",
          fr: "Nom, prénom, deuxième prénom",
        },
      },
      address: {
        type: "input",
        lang: {
          en: "Address :",
          fr: "Adresse :",
        },
        value: "",
        placeholder: {
          en: "Including unit/apt # if any",
          fr: "En indiquant le numéro d'appartement, le cas échéant",
        },
      },
      dateOfBirth: {
        type: "input",
        lang: {
          en: "Date of birth :",
          fr: "Date de naissance :",
        },
        value: "",
        placeholder: {
          en: "YYYY/MM/DD",
          fr: "AAAA/MM/JJ",
        },
      },
      sin: {
        type: "input",
        lang: {
          en: "SIN :",
          fr: "NAS :",
        },
        value: "",
        placeholder: {
          en: "Last 3-digits",
          fr: "3 derniers chiffres",
        },
      },
      phoneNumber: {
        type: "input",
        lang: {
          en: "Phone number :",
          fr: "Numéro de téléphone :",
        },
        value: "",
      },
      emp: {
        type: "input",
        lang: {
          en: "Employment :",
          fr: "Emploi :",
        },
        value: "",
      },
    },
    previousPII: {
      lang: {
        en: "Previous or Other PII if any (provided by the consumer on the phone, NOT the PII on file)",
        fr: "PII antérieures ou autres, le cas échéant (fournies par le consommateur par téléphone, et NON celles figurant dans le dossier)",
      },
      names: {
        type: "input",
        lang: {
          en: "Other names :",
          fr: "Autres noms :",
        },
        value: "",
        placeholder: {
          en: "Nicknames, married/divorce names, legal name changes",
          fr: "Surnoms, noms de mariée/de veuve, changements de nom officiels",
        },
      },
      address: {
        type: "input",
        lang: {
          en: "Other addresses :",
          fr: "Autres adresses :",
        },
        value: "",
        placeholder: {
          en: "Previous or temporary",
          fr: "Précédent ou temporaire",
        },
      },
      sin: {
        type: "input",
        lang: {
          en: "Previous SIN :",
          fr: "NAS précédent :",
        },
        value: "",
        placeholder: {
          en: "Last 3-digits",
          fr: "3 derniers chiffres",
        },
      },
      phone: {
        type: "input",
        lang: {
          en: "Phone number :",
          fr: "Numéro de téléphone :",
        },
        value: "",
      },
    },
    accounts: {
      accountArray: [],
      hardArray: [],
      lang: {
        en: "Accounts, Public Records and Hard Inquires that DO NOT BELONG to the consumer (confirmed over the phone)",
        fr: "Comptes, dossiers publics et Interrogations de Credit qui NE CONCERNENT PAS le consommateur (confirmé par téléphone)",
      },
      title1: {
        lang: {
          en: "Accounts and Public Records",
          fr: "Comptes et archives publiques",
        },
      },
      title2: {
        lang: {
          en: "Hard Inquires",
          fr: "Interrogation de Credit",
        },
      },
      creditor: {
        type: "input",
        value: "",
        placeholder: {
          en: "Institution Name",
          fr: "Nom de l'institution",
        },
      },
      digits: {
        type: "input",
        value: "",
        placeholder: {
          en: "Last 4 Digits",
          fr: "4 derniers chiffres",
        },
      },
      creditor2: {
        type: "input",
        value: "",
        placeholder: {
          en: "Institution Name",
          fr: "Nom de l'institution",
        },
      },
      date: {
        type: "input",
        value: "",
      },
    },
    others: {
      title: {
        lang: { en: "Other details :", fr: "Autres détails :" },
      },
      aTicket: {
        type: "input",
        value: "",
        placeholder: {
          en: "In case you request ID's",
          fr: "Au cas où vous demanderiez des ID's",
        },
      },
      rush: {
        type: "input",
        value: "",
        placeholder: {
          en: "Consumer is applying for a loan or credit",
          fr: "Le consommateur fait une demande de prêt ou de crédit",
        },

        lang: {
          en: "Is this a rush request? :",
          fr: "Demande urgente? :",
        },
      },
      sf: {
        type: "input",
        lang: {
          en: "Salesforce profile? :",
          fr: "Profil Salesforce? :",
        },
        value: "",
        placeholder: {
          en: "Provide phone number for SF account",
          fr: "Indiquez téléphone associé à SF",
        },
      },
    },
    submit: {
      lang: {
        en: "Copy Mix File Template",
        fr: "Copier Mix File Template",
      },
    },
  },
  sinView: {
    title: {
      lang: {
        en: "SIN Protection | Alert Email",
        fr: "Protection NAS | Alerte Courriel",
      },
    },
    subtitle1: {
      lang: {
        en: "Choose type of action:",
        fr: "Choisissez le type d'action:",
      },
    },
    subtitle2: {
      lang: {
        en: "Complete required Information",
        fr: "Complétez les informations requises",
      },
    },
    protectionRadio: {
      value: "",
      type: "radio",
      name: "protections",
      bothProtection: {
        lang: {
          en: "SIN Protection + Alert Email",
          fr: "Protection NAS + Alerte Courriel",
        },
      },
      onlyNAS: {
        lang: {
          en: "SIN Protection",
          fr: "Protection NAS",
        },
      },
      onlyAlert: {
        lang: {
          en: "Alert Email",
          fr: "Alerte Courriel",
        },
      },
    },
    submit: {
      lang: {
        en: "Copy",
        fr: "Copier",
      },
    },
    typeAlert: {
      lang: {
        en: "Alert Type:",
        fr: "Type d'alerte:",
      },
      type: "radio",
      name: "typeAlert",
      value: "",
    },
    telephone: {
      lang: {
        en: "Telephone Number :",
        fr: "Numéro de téléphone :",
      },
      type: "input",
      value: "",
    },
    sin: {
      lang: {
        en: "SIN: XXX XXX",
        fr: "NAS: XXX XXX",
      },
      type: "input",
      value: "",
      placeholder: {
        en: "Last 3 Digits",
        fr: "3 derniers chiffres",
      },
    },
    communication: {
      lang: {
        en: "Communication Language :",
        fr: "Langue de communication :",
      },
      type: "radio",
      value: "",
      name: "commLang",
    },
    contact: {
      lang: {
        en: "Contact Method",
        fr: "Mode de contact",
      },
      type: "input",
      value: "",
      placeholder: {
        en: "Email Address / Mailing Address",
        fr: "Adresse Courriel / Adresse Postale",
      },
    },
  },
  spView: {
    title: { lang: { en: "SP Comment", fr: "Commentaire SP" } },
    reasonForCall: {
      lang: { en: "Reason for call", fr: "Motif de l'appel" },
      value: "",
      type: "input",
    },
    actionsTaken: {
      lang: { en: "Actions Taken", fr: "Mesures Prises" },
      checkBox1: {
        lang: { en: "Added Lost-ID Alert", fr: "Ajout d'une Alerte Lost-ID" },
        type: "checkBox",
        value: "",
      },
      checkBox2: {
        lang: { en: "Added Fraud Alert", fr: "Ajout d'une Alerte à la Fraude" },
        type: "checkBox",
        value: "",
      },
      checkBox3: {
        lang: { en: "Added Credit Lock", fr: "Verrouillage du crédit activé" },
        type: "checkBox",
        value: "",
      },
      checkBox4: {
        lang: { en: "Added SIN Protection", fr: "Protection du NAS" },
        type: "checkBox",
        value: "",
      },
      checkBox5: {
        lang: { en: "EWP form sent", fr: "Formulaire EWP envoyé" },
        type: "checkBox",
        value: "",
      },
      checkBox6: {
        lang: {
          en: "Fraudulent Investigation started",
          fr: "Enquête pour fraude ouverte",
        },
        type: "checkBox",
        value: "",
      },
      checkBox7: {
        lang: {
          en: "Regular Investigation started",
          fr: "Enquête régulière ouverte",
        },
        type: "checkBox",
        value: "",
      },
      checkBox8: {
        lang: {
          en: "Escalated to CCE",
          fr: "Escaladé vers CCE",
        },
        type: "input",
        value: "",
        placeholder: { en: "Template's Name", fr: "Nom du Template" },
      },
      checkBox9: {
        lang: {
          en: "Double files combined UN",
          fr: "Doublons combinées UN",
        },
        type: "input",
        value: "",
        placeholder: { en: "Add UN's", fr: "Ajouter UN's" },
      },
      checkBox10: {
        lang: {
          en: "Double files not combined UN",
          fr: "Doublons pas combinées UN",
        },
        type: "input",
        value: "",
        placeholder: { en: "Add UN's", fr: "Ajouter UN's" },
      },
      checkBox11: {
        lang: {
          en: "Performed manual AUTH",
          fr: "AUTH manuelle effectuée",
        },
        type: "input",
        value: "",
        options: {
          sub1: {
            lang: {
              en: "REVOLVING - S. CARTES DESJARDINS",
              fr: "RENOUVELABLE - S. CARTES DESJARDINS",
            },
          },
          sub2: {
            lang: {
              en: "REVOLVING - ",
              fr: "RENOUVELABLE - ",
            },
          },
          sub3: {
            lang: {
              en: "INSTALLMENT - ",
              fr: "À TEMPÉRAMENT - ",
            },
          },
          sub4: {
            lang: {
              en: "MORTGAGE - ",
              fr: "HYPOTHÈQUE - ",
            },
          },
          sub5: {
            lang: {
              en: "LINE OF CREDIT - ",
              fr: "MARGE DE CRÉDIT - ",
            },
          },
          sub6: {
            lang: {
              en: "OPEN - ",
              fr: "OUVERT - ",
            },
          },
        },
      },
      checkBox12: {
        lang: {
          en: "Personal Information Updated on (EWP)",
          fr: "Informations personnelles mises à jour (EWP)",
        },
        type: "checkBox",
        value: "",
        templates: {
          sub1: {
            type: "checkBox",
            value: "",
            lang: {
              en: "Name",
              fr: "Nom",
            },
          },
          sub2: {
            type: "checkBox",
            value: "",
            lang: {
              en: "Switch Name with AKA",
              fr: "Switch le nom par un AKA",
            },
          },
          sub3: {
            type: "checkBox",
            value: "",
            lang: {
              en: "Address",
              fr: "Adresse",
            },
          },
          sub4: {
            type: "checkBox",
            value: "",
            lang: {
              en: "DOB",
              fr: "DOB",
            },
          },
          sub5: {
            type: "checkBox",
            value: "",
            lang: {
              en: "Phone Number : Added",
              fr: "Numéro de téléphone : ajouté",
            },
          },
          sub6: {
            type: "checkBox",
            value: "",
            lang: {
              en: "Phone Number : Removed",
              fr: "Numéro de téléphone : Supprimé",
            },
          },
          sub7: {
            type: "checkBox",
            value: "",
            lang: {
              en: "SIN",
              fr: "NAS",
            },
          },
          sub8: {
            type: "checkBox",
            value: "",
            lang: {
              en: "Email",
              fr: "Courriel",
            },
          },
          sub9: {
            type: "checkBox",
            value: "",
            lang: {
              en: "Employment",
              fr: "Emploi",
            },
          },
          sub10: {
            type: "checkBox",
            value: "",
            lang: {
              en: "Switch ES and EF",
              fr: "Switch ES et EF",
            },
          },
        },
      },
    },
    title2: { lang: { en: "Other details", fr: "Autres détails" } },
    button: { lang: { en: "Copy SP", fr: "Copier SP" } },
    tickets: {
      title: {
        lang: {
          en: "Direct form(s) to sheets",
          fr: "Transférer formulaire(s) vers sheets",
        },
      },
      send: {
        lang: {
          en: `Send ${iconView.planeSend()}`,
          fr: `Envoyer ${iconView.planeSend()}`,
        },
      },
      close: {
        lang: {
          en: `Close`,
          fr: `Fermer`,
        },
      },
      agent: { lang: { en: "Agent Name", fr: "Nom de l'agent" } },
      choose: { lang: { en: "Choose your name", fr: "Choisissez votre nom" } },
      value: [],
      bcl: { value: "Alberto Saborio", normal: [], urgent: [] },
    },
    otherDetails: {
      type: "input",
      value: "",
    },
    select: {
      type: "select",
      value: "normal",
    },
    buttonExcel: {
      lang: {
        en: `Send BCL Form(s) to Sheets ${iconView.planeSend()}`,
        fr: `Envoyer formulaire(s) BCL vers Sheets ${iconView.planeSend()}`,
      },
    },
  },
  callLogView: {
    dispositionCode: {
      label: { lang: { en: "Disposition Code", fr: "Code de disposition" } },
      type: "select",
      value: "Fraud Alert - Add",
      options: {
        dispositionCode1: {
          lang: { en: "Fraud Alert - Add", fr: "Alerte à la fraude - Ajouter" },
        },
        dispositionCode2: {
          lang: {
            en: "Fraud Alert - Consumer Inquiry",
            fr: "Alerte à la fraude - Demande de renseignements des consommateurs",
          },
        },
        dispositionCode3: {
          lang: {
            en: "Fraud Alert - Remove",
            fr: "Alerte à la fraude - Supprimer",
          },
        },
        dispositionCode4: {
          lang: {
            en: "Fraud Alert - Complaint",
            fr: "Alerte à la fraude - Réclamation",
          },
        },
        dispositionCode5: {
          lang: {
            en: "Promotional Code - Activation Support",
            fr: "Code promotionnel - Aide à l'activation",
          },
        },
        dispositionCode6: {
          lang: {
            en: "Promotional Code - Website Navigation Support",
            fr: "Code promotionnel - Aide à la navigation sur le site",
          },
        },
        dispositionCode7: {
          lang: {
            en: "Promotional Code - Consumer Inquiry",
            fr: "Code promotionnel - Demande de renseignements des consommateurs",
          },
        },
        dispositionCode8: {
          lang: {
            en: "Promotional Code - Complaint",
            fr: "Code promotionnel - Réclamation",
          },
        },
        dispositionCode9: {
          lang: {
            en: "Lost id alert - Add",
            fr: "Alerte lost-ID -Ajouter",
          },
        },
      },
    },
    authenticationStatus: {
      label: {
        lang: { en: "Authentication Status", fr: "État de l'authentification" },
      },
      type: "select",
      value: "Auth process passed",
      options: {
        authenticationStatus1: {
          lang: {
            en: "Auth process passed",
            fr: "Authentification réussie",
          },
        },
        authenticationStatus2: {
          lang: {
            en: "Auth process failed",
            fr: "Échec de l'authentification",
          },
        },
      },
    },
    FMT: {
      type: "select",
      value: "FMT: CONSUMER RECOGNIZED ALL ATTRIBUTES ON SALESFORCE PROFILE",
      options: {
        FMT1: {
          lang: {
            en: "FMT: CONSUMER RECOGNIZED ALL ATTRIBUTES ON SALESFORCE PROFILE",
            fr: "FMT: LE CONSOMMATEUR A RECONNU TOUTES LES CARACTÉRISTIQUES DU PROFIL SALESFORCE",
          },
        },
        FMT2: {
          lang: {
            en: "FMT: CONSUMER DID NOT RECOGNIZED ALL ATTRIBUTES ON SALESFORCE PROFILE",
            fr: "FMT: LE CONSOMMATEUR N'A PAS RECONNU TOUS LES ATRIBUTS DU PROFIL SALESFORCE",
          },
        },
      },
    },
    firstResolution: {
      label: {
        lang: {
          en: "1st Resolution",
          fr: "1ère résolution",
        },
      },
      type: "select",
      value: "Added fraud alert",
      options: {
        firstResolution1: {
          lang: {
            en: "Added fraud alert",
            fr: "Alerte à la fraude activée",
          },
        },
        firstResolution2: {
          lang: {
            en: "Added Lost ID alert",
            fr: "Alerte Lost ID activée",
          },
        },
        firstResolution3: {
          lang: {
            en: "Investigation Started",
            fr: "Ouverture d'une enquête",
          },
        },
        firstResolution4: {
          lang: {
            en: "Investigation Follow up",
            fr: "Suivi de l'enquête",
          },
        },
        firstResolution5: {
          lang: {
            en: "Account Recovery Successfull",
            fr: "Récupération du compte réussie",
          },
        },
        firstResolution6: {
          lang: {
            en: "Account Recovery unsuccessfull",
            fr: "Échec de la récupération du compte",
          },
        },
        firstResolution7: {
          lang: {
            en: "Call Transferred",
            fr: "Appel transféré",
          },
        },
        firstResolution8: {
          lang: {
            en: "Free credit report and score activated",
            fr: "Rapport de crédit gratuit et pointage activés",
          },
        },
        firstResolution9: {
          lang: {
            en: "Requested documents",
            fr: "Documents demandés",
          },
        },
        firstResolution10: {
          lang: {
            en: "Unlocked MyEquifax for cx",
            fr: "MyEquifax débloqué pour cx",
          },
        },
        firstResolution11: {
          lang: {
            en: "Updated PII on SF per internal policy/Cx request",
            fr: "Mise à jour PII sur SF conformément à la politique interne/Demande du client",
          },
        },
        firstResolution12: {
          lang: {
            en: "Verified docs on file",
            fr: "Documents vérifiés en dossier",
          },
        },
        firstResolution13: {
          lang: {
            en: "END -No add resolution",
            fr: "FIN -Pas de résolution d'ajout",
          },
        },
      },
    },
    secondResolution: {
      label: {
        lang: {
          en: "2nd Resolution",
          fr: "2e résolution",
        },
      },
      type: "select",
      value: "Added fraud alert",
    },
    thirdResolution: {
      label: {
        lang: {
          en: "3rd Resolution",
          fr: "3e résolution",
        },
      },
      type: "select",
      value: "Added fraud alert",
    },
    checkBox1: {
      lang: { en: "Added Lost-ID Alert", fr: "Ajout d'une Alerte Lost-ID" },
      type: "checkBox",
      value: "",
    },
    checkBox2: {
      lang: { en: "Added Fraud Alert", fr: "Ajout d'une Alerte à la Fraude" },
      type: "checkBox",
      value: "",
    },
    checkBox3: {
      lang: { en: "Added Credit Lock", fr: "Verrouillage du crédit activé" },
      type: "checkBox",
      value: "",
    },
    checkBox4: {
      lang: { en: "Added SIN Protection", fr: "Protection du NAS" },
      type: "checkBox",
      value: "",
    },
    checkBox5: {
      lang: { en: "EWP form sent", fr: "Formulaire EWP envoyé" },
      type: "checkBox",
      value: "",
    },
    checkBox6: {
      lang: {
        en: "Consumer guided to download the form",
        fr: "Consommateur guidé pour télécharger le formulaire",
      },
      type: "checkBox",
      value: "",
    },
    checkBox7: {
      lang: {
        en: "Fraudulent Investigation started",
        fr: "Enquête pour fraude ouverte",
      },
      type: "checkBox",
      value: "",
    },
    checkBox8: {
      lang: {
        en: "Regular Investigation started",
        fr: "Enquête régulière ouverte",
      },
      type: "checkBox",
      value: "",
    },
    checkBox9: {
      lang: {
        en: "Escalated to Jira ticket",
        fr: "Escaladé vers le ticket Jira",
      },
      type: "checkBox",
      value: "",
      templates: {
        sub1: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Different UN, previous UN... new UN...",
            fr: "UN différent, UN précédent... UN nouveau...",
          },
        },
      },
    },
    checkBox10: {
      lang: {
        en: "Free Copy Activated",
        fr: "Copie gratuite activée",
      },
      type: "checkBox",
      value: "",
    },
    checkBox11: {
      lang: {
        en: "Escalated to CCE",
        fr: "Escaladé vers CCE",
      },
      type: "input",
      value: "",
      placeholder: { en: "Template's Name", fr: "Nom du Template" },
    },
    checkBox12: {
      lang: {
        en: "Promo code activated",
        fr: "Code promotionnel activé",
      },
      type: "input",
      value: "",
      placeholder: { en: "Add Code", fr: "Ajouter code" },
    },
    checkBox13: {
      lang: {
        en: "Password reset link sent",
        fr: "Lien de reset du mot de passe envoyé",
      },
      type: "checkBox",
      value: "",
    },
    checkBox14: {
      lang: {
        en: "Consumer guided to reset password",
        fr: "Consommateur guidé pour réinitialiser mot de passe",
      },
      type: "checkBox",
      value: "",
    },
    checkBox15: {
      lang: {
        en: "Double files combined UN",
        fr: "Doublons combinées UN",
      },
      type: "input",
      value: "",
      placeholder: { en: "Add UN's", fr: "Ajouter UN's" },
    },
    checkBox16: {
      lang: {
        en: "Double files not combined UN",
        fr: "Doublons pas combinées UN",
      },
      type: "input",
      value: "",
      placeholder: { en: "Add UN's", fr: "Ajouter UN's" },
    },
    checkBox17: {
      lang: {
        en: "Performed manual AUTH",
        fr: "AUTH manuelle effectuée",
      },
      type: "input",
      value: "",
      options: {
        sub1: {
          lang: {
            en: "REVOLVING - S. CARTES DESJARDINS",
            fr: "RENOUVELABLE - S. CARTES DESJARDINS",
          },
        },
        sub2: {
          lang: {
            en: "REVOLVING - ",
            fr: "RENOUVELABLE - ",
          },
        },
        sub3: {
          lang: {
            en: "INSTALLMENT - ",
            fr: "À TEMPÉRAMENT - ",
          },
        },
        sub4: {
          lang: {
            en: "MORTGAGE - ",
            fr: "HYPOTHÈQUE - ",
          },
        },
        sub5: {
          lang: {
            en: "LINE OF CREDIT - ",
            fr: "MARGE DE CRÉDIT - ",
          },
        },
        sub6: {
          lang: {
            en: "OPEN - ",
            fr: "OUVERT - ",
          },
        },
      },
    },
    checkBox18: {
      lang: {
        en: "Personal Information Updated on (EWP or SF)",
        fr: "Informations personnelles mises à jour (EWP ou SF)",
      },
      type: "checkBox",
      value: "",
      templates: {
        sub1: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Name",
            fr: "Nom",
          },
        },
        sub2: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Switch Name with AKA",
            fr: "Switch le nom par un AKA",
          },
        },
        sub3: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Address",
            fr: "Adresse",
          },
        },
        sub4: {
          type: "checkBox",
          value: "",
          lang: {
            en: "DOB",
            fr: "DOB",
          },
        },
        sub5: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Phone Number : Added",
            fr: "Numéro de téléphone : ajouté",
          },
        },
        sub6: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Phone Number : Removed",
            fr: "Numéro de téléphone : Supprimé",
          },
        },
        sub7: {
          type: "checkBox",
          value: "",
          lang: {
            en: "SIN",
            fr: "NAS",
          },
        },
        sub8: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Email",
            fr: "Courriel",
          },
        },
        sub9: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Employment",
            fr: "Emploi",
          },
        },
        sub10: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Switch ES and EF",
            fr: "Switch ES et EF",
          },
        },
      },
    },
    checkBox19: {
      lang: {
        en: "Consumer will send docs to update email",
        fr: "Le consommateur enverra documents pour mis à jour email",
      },
      type: "checkBox",
      value: "",
    },
    checkBox20: {
      lang: {
        en: "Dropped call",
        fr: "Coupure d'appel",
      },
      type: "checkBox",
      value: "",
    },
    checkBox21: {
      lang: {
        en: "Case was escalated to Tier 3",
        fr: "Le dossier a été transmis au niveau 3",
      },
      type: "checkBox",
      value: "",
    },
    checkBox22: {
      lang: {
        en: "BCL EWP form sent",
        fr: "Formulaire BCL EWP envoyé",
      },
      type: "input",
      value: "",
      templates: {
        sub1: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Update Address",
            fr: "Mis à jour de l'adresse",
          },
        },
        sub2: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Remove Fraudulent Adddress",
            fr: "Supprimer l'adresse frauduleuse",
          },
        },
        sub3: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Remove old Adddress",
            fr: "Supprimer l'ancienne adresse",
          },
        },
        sub4: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Update Name",
            fr: "Mis à jour du nom",
          },
        },
        sub5: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Remove Fraudulent Name",
            fr: "Supprimer le nom frauduleux",
          },
        },
        sub6: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Update date of birth",
            fr: "Mis à jour de la DOB",
          },
        },
        sub7: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Remove fraudulent DOB",
            fr: "Supprimer DOB frauduleuse",
          },
        },
        sub8: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Update SIN",
            fr: "Mis à jour du NAS",
          },
        },
        sub9: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Update Phone Number",
            fr: "Mis à jour du numéro de téléphone",
          },
        },
        sub10: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Remove Old Phone Number",
            fr: "Supprimer l'ancien numéro de téléphone",
          },
        },
        sub11: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Update phone number on security alert",
            fr: "Mis à jour du téléphone dans l'alerte de sécurité",
          },
        },
        sub12: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Update ES",
            fr: "Mise à jour ES",
          },
        },
        sub13: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Remove Fraudulent ES",
            fr: "Supprimer le ES frauduleux",
          },
        },
        sub14: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Salesforce Mirror",
            fr: "Salesforce Mirroir",
          },
        },
        sub15: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Change lost Id to Fraud alert",
            fr: "Remplacer Alerte Lost-ID par Fraude",
          },
        },
        sub16: {
          type: "input",
          value: "",
          lang: {
            en: "Merge Files",
            fr: "Fusionner des dossiers",
          },
          placeholder: {
            en: "Add UN's",
            fr: "Ajouter UN's",
          },
        },
        sub17: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Add Consumer statement",
            fr: "Ajouter une déclaration du consommateur",
          },
        },
        sub18: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Change Email",
            fr: "Modifier l'adresse e-mail",
          },
        },
        sub19: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Send Email for Password change",
            fr: "Courriel pour modifier le mot de passe",
          },
        },
        sub20: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Add Credit Lock",
            fr: "Activer le verrouillage de crédit",
          },
        },
      },
    },
    checkBox23: {
      lang: {
        en: "EWP form sent",
        fr: "Formulaire EWP envoyé",
      },
      type: "input",
      value: "",
      templates: {
        sub1: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Add Minor Alert",
            fr: "Ajouter alerte de mineure",
          },
        },
        sub2: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Add Minor SIN protection",
            fr: "Ajouter protection NAS mineurs",
          },
        },
        sub3: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Remove Credit Lock",
            fr: "Supprimer le verrouillage de crédit",
          },
        },
        sub4: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Remove Security Notice",
            fr: "Supprimer Security Notice",
          },
        },
        sub5: {
          type: "checkBox",
          value: "",
          lang: {
            en: "Update an account (trade/public record)",
            fr: "Mis à jour du compte (operation commercial/public)",
          },
        },
      },
    },
    submit: {
      lang: {
        en: "Copy Call Log",
        fr: "Copier Call Log",
      },
    },
  },
  summaryView: {
    title: {
      lang: { en: "Summary", fr: "Résumé" },
    },
    submit: {
      lang: { en: "Copy Summary", fr: "Copier le résumé" },
    },
  },
};


