import View from "./view.js";
import * as helper from "../helpers.js";
import iconView from "./iconView.js";

class MixedFileView extends View {
  generateMarkup() {
    let template = ` <form id="mixFileContainer">
        <h4 class="mb-4 text-center">Mixed File</h4>
        <div class="input-group mb-2">
            <span class="input-group-text" id="inputGroup-sizing-default">Mixed files UN :</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" data-state="mixedFile.mixedFilesUN" required>
          </div>
          <h6 class="mb-2 mt-5 mb-4" data-lang="mixedFile.currentPII">PII actuelles (fournies par le consommateur par téléphone, et NON celles figurant dans le dossier)</h6>

          <div class="input-group mb-2">
            <span class="input-group-text" data-lang="mixedFile.currentPII.name">Nom :</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Nom, prénom, deuxième prénom" data-plh="mixedFile.currentPII.name" data-state="mixedFile.currentPII.name" required>
          </div>

          <div class="input-group mb-2">
            <span class="input-group-text" data-lang="mixedFile.currentPII.address">Adresse :</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="En indiquant le numéro d'appartement, le cas échéant" data-plh="mixedFile.currentPII.address" data-state="mixedFile.currentPII.address" required>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text" data-lang="mixedFile.currentPII.dateOfBirth">Date de naissance :</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="AAAA/MM/JJ" data-plh="mixedFile.currentPII.dateOfBirth" data-state="mixedFile.currentPII.dateOfBirth" required>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text" data-lang="mixedFile.currentPII.sin">NAS :</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="3 derniers chiffres" data-plh="mixedFile.currentPII.sin" data-state="mixedFile.currentPII.sin" required>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text" data-lang="mixedFile.currentPII.phoneNumber">Numéro de téléphone :</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" data-state="mixedFile.currentPII.phoneNumber" required>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text" data-lang="mixedFile.currentPII.emp">Emploi :</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" data-state="mixedFile.currentPII.emp" required>
          </div>
          <h6 class="mb-2 mt-5 mb-4" data-lang="mixedFile.previousPII">PII antérieures ou autres, le cas échéant (fournies par le consommateur par téléphone, et NON celles figurant dans le dossier)</h6>

          <div class="input-group mb-2">
            <span class="input-group-text" data-lang="mixedFile.previousPII.names">Autres noms :</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Surnoms, noms de mariée/de veuve, changements de nom officiels" data-plh="mixedFile.previousPII.names" data-state="mixedFile.previousPII.names" required>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text" data-lang="mixedFile.previousPII.address">Autres adresses :</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Previous or temporary" data-plh="mixedFile.previousPII.address" data-state="mixedFile.previousPII.address" required>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text" data-lang="mixedFile.previousPII.sin">NAS précédent :</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="3 derniers chiffres" data-plh="mixedFile.previousPII.sin" data-state="mixedFile.previousPII.sin" required>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text" data-lang="mixedFile.previousPII.phone">Numéro de téléphone :</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" data-state="mixedFile.previousPII.phone" required>
          </div>
          <h6 class="mb-2 mt-5" data-lang="mixedFile.accounts">Comptes, dossiers publics et Interrogations de Credit qui NE CONCERNENT PAS le consommateur (confirmé par téléphone)</h6>
          <h6 class="mb-2 mt-4" data-lang="mixedFile.accounts.title1">Comptes et archives publiques</h6>
          <div class="input-group mb-3">
            <input type="text" id="accountCreditor" aria-label="First name" class="form-control" placeholder="Nom de l'institution" data-plh="mixedFile.accounts.creditor" data-state="mixedFile.accounts.creditor">

            <input type="text" id="accountDigits" aria-label="Last name" class="form-control" placeholder="4 derniers chiffres" data-plh="mixedFile.accounts.digits" data-state="mixedFile.accounts.digits">
            <button class="btn btn-primary" type="button" id="buttonAccounts" data-type="account">${iconView.arrowDown()}</button>
          </div>
          <ul id="accountsMixedFile"></ul>

          <h6 class="mb-2 mt-4" data-lang="mixedFile.accounts.title2">Interrogation de Credit</h6>
          <div class="input-group mb-3">
            <input type="text" id="creditorNameHard" aria-label="First name" class="form-control" placeholder="Nom de l'institution" data-plh="mixedFile.accounts.creditor2" data-state="mixedFile.accounts.creditor2">

            <input type="text" id="dateHard" aria-label="Last name" class="form-control" placeholder="Date" data-state="mixedFile.accounts.date">

            <button class="btn btn-primary" type="button" id="buttonHard" data-type="hard">${iconView.arrowDown()}</button>
          </div>
          <ul id="hardInquiryMixedFile"></ul>

            <h6 class="mb-2 mt-5 mb-4" data-lang="mixedFile.others.title">Autres détails</h6>
          <div class="input-group mb-2">
            <span class="input-group-text">A-Ticket :</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Au cas où vous demanderiez des ID's" data-plh="mixedFile.others.aTicket" data-state="mixedFile.others.aTicket" required>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text" data-lang="mixedFile.others.rush">Demande urgente? :</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Le consommateur fait une demande de prêt ou de crédit" data-plh="mixedFile.others.rush" data-state="mixedFile.others.rush" required>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text" data-lang="mixedFile.others.sf">Profil Salesforce? :</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Indiquez téléphone associé à SF" data-plh="mixedFile.others.sf" data-state="mixedFile.others.sf" required>
          </div>
         
          <button type="submit" id="submitMixFile" class="btn btn-primary btn-lg mt-4" data-lang="mixedFile.submit" style="width: 100%;">Copier Mix File Template</button>
       
    </form>`;

    return template;
  }

  markUpNewAccountPubRec(uniqueKey, text, dataset) {
    let template = `
    <div class="mb-1" id="${uniqueKey}" style="display: flex;                
      flex-direction: row;       
      justify-content: space-between; 
      align-items: center;">         
        <span>${text}</span>
        <button type="button" class="arrow btn btn-danger"text-center btn-sm" data-path="${dataset}">${iconView.trash()}</button>
    </div>`;
    return template;
  }

  addMixFileAccountPubRec(text, areaID, type = "new") {
    let uniqueKey;
    type == "new" ? (uniqueKey = helper.createUniqueKey()) : (uniqueKey = type);
    let dataset;
    areaID == "accountsMixedFile"
      ? (dataset = "mixedFile.accounts.accountArray")
      : (dataset = "mixedFile.accounts.hardArray");

    let template = this.markUpNewAccountPubRec(uniqueKey, text, dataset);

    let area = document.getElementById(areaID);
    area.insertAdjacentHTML("afterbegin", template);

    return { [uniqueKey]: text };
  }

  addHandlerEraseButton(handler) {
    let inputArea = document.getElementById("mixFileContainer");
    let scissors = inputArea.querySelectorAll("button.arrow");
    scissors.forEach((el) => el.addEventListener("dblclick", handler));
  }

  eraseParent(element) {
    element.remove();
  }

  createMixFileTemplate(obj, accounts, hards) {
    let template = `
Mixed files UN ${obj[0]}
Hi Team, here is the information gathered from the consumer:

Current PII (provided by the consumer on the phone, NOT the PII on file)
Name:  ${obj[1]} 
Address:  ${obj[2]}
Date of birth:  ${obj[3]}
SIN:  ${obj[4]}
Phone number:  ${obj[5]}
Employment:  ${obj[6]}

Previous or Other PII if any (provided by the consumer on the phone, NOT the PII on file) 
Other names:  ${obj[7]}
Other addresses (previous or temporary):  ${obj[8]}
Previous SIN:  ${obj[9]}
Phone number:  ${obj[10]}

Accounts, Public Records and Hard Inquires that DO NOT BELONG to the consumer (confirmed over the phone)
Accounts and Public Records:
${accounts.join("\n")}

Hard Inquires:
${hards.join("\n")}

Other details
A-Ticket number in case you request ID’s: ${obj[11]}
Is this a rush request? ${obj[12]}
Does the cx have a Salesforce profile? ${obj[13]}
    `;
    navigator.clipboard.writeText(template);
  }
}

export default new MixedFileView();
