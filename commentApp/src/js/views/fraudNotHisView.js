import iconView from "./iconView.js";
import View from "./view.js";

class FraudNotHisView extends View {
  page = "";

  generateMarkup() {
    let fraudTitle = `<h5 class="mb-4 text-center" data-lang="fraudNotHisView.titleFraud">Fraud Investigation</h5>`;
    let notHisTitle = `<h5 class="mb-4 text-center" data-lang="fraudNotHisView.titleNotHis">Not-His Investigation</h5>`;

    let template = `
     <div id="investigateContainer">
     <form id="investigationForm">
        ${this.page == "fraud" ? fraudTitle : notHisTitle}
        <div class="mb-3">
            <div class="row gx-2">
            <div class="col">
                <label for="formFileSm" class="form-label" data-lang="fraudNotHisView.selectFile">Select File</label>
                <select class="form-select" aria-label="Default select example" data-state="fraudNotHisView.selectFile" required>
                    <option id="mainFile" value="mainFile" selected data-lang="fraudNotHisView.selectFile.files.mainFile">Main File</option>
                    <option id="multipleOne" value="multipleOne">Multiple File #1</option>
                    <option id="multipleTwo" value="multipleTwo">Multiple File #2</option>
                    <option id="multipleThree" value="multipleThree">Multiple File #3</option>
                    <option id="multipleFour" value="multipleFour">Multiple File #4</option>
                    <option id="multipleFive" value="multipleFive">Multiple File #5</option>
                </select>
            </div>
            <div class="col">
                <label class="form-label" data-lang="fraudNotHisView.invLanguage">Language</label>
                <div class="row gx-2">
                    <div class="col">
                        <input type="radio" class="btn-check"  id="invFR" name="invLanguage" autocomplete="off" value="French" required data-state="fraudNotHisView.invLanguage">
                        <label class="btn btn-outline-secondary w-100" for="invFR">FR</label>
                        </div>
                        <div class="col">
                            <input type="radio" class="btn-check"  id="invEN" name="invLanguage" autocomplete="off" value="English" data-state="fraudNotHisView.invLanguage">
                            <label class="btn btn-outline-secondary w-100" for="invEN">EN</label>
                        </div>
                    </div>   
            </div>
        </div>
          </div>
          <div class="mb-3">
            
                <label class="form-label" data-lang="fraudNotHisView.results">Send Results to</label>
                <input type="text" class="form-control" data-plh="fraudNotHisView.results" placeholder="Email or Post Address" aria-label="Text input with checkbox" required data-state="fraudNotHisView.results">       
          </div>
        <div class="mb-3" id="sectionToInvestigate">
            <label class="form-label" data-lang="fraudNotHisView.sectionFile">Section of file</label>
            <div class="row gx-2">
                <div class="col gy-2">
                    <input type="radio" class="btn-check"  id="invPII" name="section" autocomplete="off" required value="invPII" data-state="fraudNotHisView.sectionFile">
                    <label class="btn btn-outline-secondary w-100" for="invPII" data-lang="fraudNotHisView.sectionFile.section.radioPii">Personal Information</label>
                    </div>
                    <div class="col gy-2">
                        <input type="radio" class="btn-check" id="invEmp" name="section" autocomplete="off" required value="invEmp" data-state="fraudNotHisView.sectionFile">
                        <label class="btn btn-outline-secondary w-100" for="invEmp" data-lang="fraudNotHisView.sectionFile.section.radioEmp">Employment</label>
                    </div>
                </div>
            <div class="row gx-2">
                <div class="col gy-2">
                    <input type="radio" class="btn-check" id="invTrade" name="section" autocomplete="off" required value="invTrade" data-state="fraudNotHisView.sectionFile">
                    <label class="btn btn-outline-secondary w-100" for="invTrade" data-lang="fraudNotHisView.sectionFile.section.radioTrades">Trades</label>
                    </div>
                    <div class="col gy-2">
                        <input type="radio" class="btn-check" id="invPubRec" name="section" autocomplete="off" required value="invPubRec" data-state="fraudNotHisView.sectionFile">
                        <label class="btn btn-outline-secondary w-100" for="invPubRec" data-lang="fraudNotHisView.sectionFile.section.radioPubRec">Public Records</label>
                    </div>
                </div>
            <div class="row gx-2">
                <div class="col gy-2">
                    <input type="radio" class="btn-check" id="invHard" name="section" autocomplete="off" required value="invHard" data-state="fraudNotHisView.sectionFile">
                    <label class="btn btn-outline-secondary w-100" for="invHard" data-lang="fraudNotHisView.sectionFile.section.radioHard">Hard Inquiries</label>
                    </div>
                    <div class="col gy-2">
                        <input type="radio" class="btn-check" id="invSoft" name="section" autocomplete="off" required value="invSoft" data-state="fraudNotHisView.sectionFile">
                        <label class="btn btn-outline-secondary w-100" for="invSoft" data-lang="fraudNotHisView.sectionFile.section.radioSoft">Soft Inquiries</label>
                    </div>
                </div>
          </div>
          <div class="mb-3" id="invPendingDivOne"></div>
          <div class="mb-3" id="invPendingDivTwo"></div>      
        <hr class="border border-primary border-2 opacity-75 mt-4 mb-4" style="border-color: #004d66 !important;">
    
    <ul class="list-group" id="cardInvArea">
  
</ul>
    
    </div>
    `;
    return template;
  }

  pendingMarkUp() {
    let pendingTemplatesArray = [
      `
    <div class="mb-3">
            <label class="form-label" data-lang="fraudNotHisView.typePii">Type of Personal Information</label>
            <div class="row gx-2">
                <div class="col gy-2">
                    <input type="radio" class="btn-check"  id="invAKA" name="invPiiElements" autocomplete="off" required value="invAKA" data-state="fraudNotHisView.typePii">
                    <label class="btn btn-outline-secondary w-100" for="invAKA" data-lang="fraudNotHisView.typePii.radios.name">AKA/Name</label>
                    </div>
                    <div class="col gy-2">
                        <input type="radio" class="btn-check" id="invAddress" name="invPiiElements" autocomplete="off" required value="invAddress" data-state="fraudNotHisView.typePii">
                        <label class="btn btn-outline-secondary w-100" for="invAddress" data-lang="fraudNotHisView.typePii.radios.address">Address</label>
                    </div>
                    <div class="col gy-2">
                        <input type="radio" class="btn-check" id="invTelephone" name="invPiiElements" autocomplete="off" required value="invTelephone" data-state="fraudNotHisView.typePii">
                        <label class="btn btn-outline-secondary w-100" for="invTelephone" data-lang="fraudNotHisView.typePii.radios.telephone">Telephone</label>
                    </div>
                </div>
          </div>`,

      `<!-- Public Records -->
          <div class="mb-3">
            <label class="form-label" data-lang="fraudNotHisView.typePubRec">Type of Public Record</label>
            <div class="row gx-2">
                <div class="col gy-2">
                    <input type="radio" class="btn-check"  id="invBankrupcy" value="invBankrupcy" name="typePublicRecord" autocomplete="off" required data-state="fraudNotHisView.typePubRec">
                    <label class="btn btn-outline-secondary w-100" for="invBankrupcy" data-lang="fraudNotHisView.typePubRec.radios.bankrupcy">Bankruptcy</label>
                    </div>
                    <div class="col gy-2">
                        <input type="radio" class="btn-check" id="invConsolidatedDebt" value="invConsolidatedDebt" name="typePublicRecord" autocomplete="off" required data-state="fraudNotHisView.typePubRec">
                        <label class="btn btn-outline-secondary w-100" for="invConsolidatedDebt" data-lang="fraudNotHisView.typePubRec.radios.conDeb">Consolidated Debt</label>
                    </div>
                </div>
            <div class="row gx-2">
                <div class="col gy-2">
                    <input type="radio" class="btn-check" id="invJudgements" value="invJudgements" name="typePublicRecord" autocomplete="off" required data-state="fraudNotHisView.typePubRec">
                    <label class="btn btn-outline-secondary w-100" for="invJudgements" data-lang="fraudNotHisView.typePubRec.radios.judgment">Judgements</label>
                    </div>
                    <div class="col gy-2">
                        <input type="radio" class="btn-check" id="invDebtRecovery" value="invDebtRecovery" name="typePublicRecord" autocomplete="off" required data-state="fraudNotHisView.typePubRec">
                        <label class="btn btn-outline-secondary w-100" for="invDebtRecovery" data-lang="fraudNotHisView.typePubRec.radios.debRec">Debt Recovery</label>
                    </div>
                </div>
            <div class="row gx-2">
                    <div class="col gy-2">
                        <input type="radio" class="btn-check" id="invCollections"  value="invCollections" name="typePublicRecord" autocomplete="off" required data-state="fraudNotHisView.typePubRec">
                        <label class="btn btn-outline-secondary w-100" for="invCollections" data-lang="fraudNotHisView.typePubRec.radios.collection">Collections</label>
                        </div>
                </div>
          </div>`,

      `<!-- Type of Soft -->
          <div class="mb-3">
            <label class="form-label" data-lang="fraudNotHisView.typeSofInq">Type of Soft Inquiry</label>
            <div class="row gx-2">
                <div class="col gy-2">
                    <input type="radio" class="btn-check" id="invNormalSoft" value="invNormalSoft" name="sofInquiries" autocomplete="off" required data-state="fraudNotHisView.typeSofInq">
                    <label class="btn btn-outline-secondary w-100" for="invNormalSoft" data-lang="fraudNotHisView.typeSofInq.radios.invNormalSoft">Normal</label>
                    </div>
                    <div class="col gy-2">
                        <input type="radio" class="btn-check" id="invBorrowell" value="invBorrowell" name="sofInquiries" autocomplete="off" required data-state="fraudNotHisView.typeSofInq">
                        <label class="btn btn-outline-secondary w-100" for="invBorrowell" data-lang="fraudNotHisView.typeSofInq.radios.invBorrowell">Borrowell</label>
                    </div>
                </div>
          </div>`,

      `<!-- Enter information -->
            <div class="mb-3">
                <label class="form-label" data-lang="fraudNotHisView.investigate">Enter Information</label>
                <div class="input-group mb-3">
                    <textarea id="infoText" class="form-control" aria-label="With textarea" placeholder="Information" data-state="fraudNotHisView.investigate" required></textarea>
                    <button class="btn btn-primary" id="submitInv" type="submit">${iconView.floppy()}</button>
                  </div>
            </div>
            </form>`,

      `<!-- Enter information -->
            <div class="mb-3">
                <label class="form-label" data-lang="fraudNotHisView.investigatePubRec">Enter Information</label>
                <div class="input-group">
                    <input type="text" aria-label="First name" data-plh="fraudNotHisView.investigatePubRec.creditor" id="creditorText" placeholder="Creditor" class="form-control" required data-state="fraudNotHisView.investigatePubRec.creditor">
                    <input type="text" aria-label="Last name" data-plh="fraudNotHisView.investigatePubRec.lastFourDigits" id="digitsText" placeholder="Last 4 digits" class="form-control" required data-state="fraudNotHisView.investigatePubRec.lastFourDigits">
                    <button class="btn btn-outline-secondary" id="submitInv" type="submit">${iconView.floppy()}</button>
                  </div>
            </div>
            </form>`,
    ];

    return pendingTemplatesArray;
  }

  createListTemplate(key, path, title, text) {
    let listItem = `
          <li id="${key}" data-path="${path}" class="list-group-item" style="display: flex; flex-direction: row; justify-content: space-between; gap: 1rem;">
            <div class="textDiv">
                <h6>${title}</h6>
                <span class="textInv">${text}</span>
            </div>
            <div class="d-flex flex-column justify-content-center align-items-center" >
                <button type="button" class="copy btn btn-light btn-sm  d-flex justify-content-center align-items-center border-dark mb-1" style="height:3rem;width:3rem; padding:0;border-radius:50%">${iconView.copy()}</button>
                <button type="button" class="delete btn btn-light btn-sm d-flex justify-content-center align-items-center border-dark" style="height:3rem;width:3rem; padding:0;border-radius:50%">${iconView.scissorsDispute()}</button>
            </div>
        </li>`;

    return listItem;
  }

  addHandlerSectionEvent(handler) {
    let sections = document.querySelectorAll(
      'input[type="radio"][name="section"]'
    );
    sections.forEach((el) => el.addEventListener("change", handler));
  }

  displayTemplates(numberOne, numberTwo) {
    let pendingtemplates = this.pendingMarkUp();
    let emptyDivOne = document.getElementById("invPendingDivOne");
    let emptyDivTwo = document.getElementById("invPendingDivTwo");

    numberOne !== ""
      ? (emptyDivOne.innerHTML = pendingtemplates[numberOne])
      : (emptyDivOne.innerHTML = "");

    emptyDivTwo.innerHTML = pendingtemplates[numberTwo];
  }

  addHandlerButtonEvents(handler, handlerCopy) {
    let area = document.getElementById("cardInvArea");
    let buttonsErase = area.querySelectorAll("button.delete");
    let buttonsCopy = area.querySelectorAll("button.copy");
    buttonsErase.forEach((el) =>
      el.addEventListener("dblclick", (e) => {
        handler(e);
      })
    );
    buttonsCopy.forEach((el) =>
      el.addEventListener("click", (e) => {
        handlerCopy(e);
      })
    );
  }

  generateInvestigationUI(liObject) {
    let investigationArea = document.getElementById("cardInvArea");
    let key = Object.keys(liObject);

    investigationArea.insertAdjacentHTML(
      "afterbegin",
      this.createListTemplate(
        key,
        liObject[key].path,
        liObject[key].title,
        liObject[key].text
      )
    );
    liObject[key].textArray.forEach((el) => {
      investigationArea
        .querySelector(`#ul${key[0]}`)
        .insertAdjacentHTML("beforeend", el);
    });

    this.eraseSubmitInfo();
  }

  clearInvestigationAreaUI() {
    let investigationArea = document.getElementById("cardInvArea");
    investigationArea.innerHTML = "";
  }

  retrieveButtonInformation(event) {
    let target = event.target;
    let buttonKey = target.closest("li").id;
    let buttonPath = target.closest("li").dataset.path;

    return [buttonPath, buttonKey];
  }

  eraseContent(e) {
    let target = e.target;
    let liTarget = target.closest("li");
    liTarget.remove();
  }

  copyContentButton(e) {
    let target = e.target;
    let liTarget = target.closest("li");
    let spanDiv = liTarget.querySelector("div.textDiv");
    let textSpan = spanDiv.querySelector("span.textInv");
    navigator.clipboard.writeText(textSpan.innerText);
  }

  eraseSubmitInfo() {
    let info = document.getElementById("infoText");
    let creditor = document.getElementById("creditorText");
    let digits = document.getElementById("digitsText");
    if (info) info.value = "";
    if (creditor) creditor.value = "";
    if (digits) digits.value = "";
  }
}

export default new FraudNotHisView();
