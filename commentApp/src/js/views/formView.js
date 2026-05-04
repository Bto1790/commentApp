import View from "./view.js";

class FormView extends View {
  standBy() {
    `
    <div class="row gx-2"></div>
    <div class="col gy-2"></div>
    `;
  }

  generateMarkup() {
    let template = `
    <div id="formContainer">
    <div id="formViewContainer" class="container text-center">

    <div class="row gx-2">
    <h4 class="mb-1">BCL - PII</h4>
    </div>

    <div class="row gx-2">
    <div class="col gy-2">
    <input type="checkbox" class="btn-check" id="name"  value="name" autocomplete="off" data-state="formView.bclPII.name">
    <label class="btn btn-outline-secondary w-100" for="name" data-lang="formView.bclPII.name">Name</label>
    </div>
    <div class="col gy-2">
    <input type="checkbox" class="btn-check" id="address" value="address" autocomplete="off" data-state="formView.bclPII.address">
    <label class="btn btn-outline-secondary w-100" for="address" data-lang="formView.bclPII.address">Address</label>
    </div>
    </div>

    <div class="row gx-2">
    <div class="col gy-2">
    <input type="checkbox" class="btn-check" id="dbs"  value="dbs" autocomplete="off" data-state="formView.bclPII.dbs">
    <label class="btn btn-outline-secondary w-100" for="dbs" data-lang="formView.bclPII.dbs">Date of Birth</label>
    </div>
    <div class="col gy-2">
    <input type="checkbox" class="btn-check" id="sin" value="sin" autocomplete="off" data-state="formView.bclPII.sin">
    <label class="btn btn-outline-secondary w-100" for="sin" data-lang="formView.bclPII.sin">SIN</label>
    </div>
    </div>

    <div class="row gx-2">
    <div class="col gy-2">
    <input type="checkbox" class="btn-check" id="phone"  value="phone" autocomplete="off" data-state="formView.bclPII.phone">
    <label class="btn btn-outline-secondary w-100" for="phone" data-lang="formView.bclPII.phone">Telephone</label>
    </div>
    <div class="col gy-2">
    <input type="checkbox" class="btn-check" id="sin3rd" value="sin3rd" autocomplete="off" data-state="formView.bclPII.sin3rd">
    <label class="btn btn-outline-secondary w-100" for="sin3rd" data-lang="formView.bclPII.sin3rd">SIN 3rd party file</label>
    </div>
    </div>

    <div class="row gx-2">
    <div class="col gy-2">
    <input type="checkbox" class="btn-check" id="mirror"  value="mirror" autocomplete="off" data-state="formView.bclPII.mirror">
    <label class="btn btn-outline-secondary w-100" for="mirror" data-lang="formView.bclPII.mirror">Mirror</label>
    </div>
    <div class="col gy-2">
    <input type="checkbox" class="btn-check" id="password" value="password" autocomplete="off" data-state="formView.bclPII.password">
    <label class="btn btn-outline-secondary w-100" for="password" data-lang="formView.bclPII.password">Password</label>
    </div>
    </div>

    <div class="row gx-2">
    <div class="col gy-2">
    <input type="checkbox" class="btn-check" id="email"  value="email" autocomplete="off" data-state="formView.bclPII.email">
    <label class="btn btn-outline-secondary w-100" for="email">Email</label>
    </div>
    <div class="col gy-2">
    <input type="checkbox" class="btn-check" id="free" value="free" autocomplete="off" data-state="formView.bclPII.free">
    <label class="btn btn-outline-secondary w-100" for="free" data-lang="formView.bclPII.free">Free product</label>
    </div>
    </div>
   
    <div class="row gx-2">
    <div class="col gy-2">
    <div class="input-group input-group-custom-width">
    <span class="input-group-text" data-lang="formView.bclPII.fraudAddress">Fraud Address</span>
    <input type="text" id="fraudAddress" class="form-control" data-plh="formView.bclPII.fraudAddress" placeholder="Address" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" data-state="formView.bclPII.fraudAddress">
    </div>
    </div>
    </div>
   
    <div class="row gx-2">
    <div class="col gy-2">
    <div class="input-group input-group-custom-width">
    <span class="input-group-text" data-lang="formView.bclPII.oldAddress">Old Address</span>
    <input type="text" class="form-control" id="oldAddress"  data-plh="formView.bclPII.oldAddress" placeholder="Address" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" data-state="formView.bclPII.oldAddress">
    </div>
    </div>
    </div>
    
    <div class="row gx-2">
    <div class="col gy-2">
    <div class="input-group input-group-custom-width">
    <span class="input-group-text" data-lang="formView.bclPII.oldtelephone">Old Telephone</span>
    <input type="text" class="form-control" id="oldtelephone" data-plh="formView.bclPII.oldtelephone" placeholder="Telephone" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" data-state="formView.bclPII.oldtelephone">
    </div>
    </div>
    </div>
    
    <div class="row gx-2">
    <div class="col gy-2">
    <div class="input-group input-group-custom-width">
    <span class="input-group-text" id="multipleIN" data-lang="formView.bclPII.multipleFiles">Multiple Files</span>
    <input type="text" class="form-control" id="multipleFiles" placeholder="UN/CID #'s" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" data-state="formView.bclPII.multipleFiles">
    </div>
    </div>
    </div>

    <div class="row gx-2">
    <div class="col gy-2">
    <h4 class="mb-1 mt-4">BCL - Employment</h5>
    </div>
    </div>

    <div class="row gx-2">
    <div class="col gy-2">
    <div>
    <input type="checkbox" class="btn-check" id="emp" value="emp" autocomplete="off" data-state="formView.bclEmp.emp">
    <label class="btn btn-outline-secondary w-100" for="emp" data-lang="formView.bclEmp.emp">Employment</label>
    </div>
    </div>
    </div>


    <div class="row gx-2">
    <div class="col gy-2">
    <div class="input-group input-group-custom-width">
    <span class="input-group-text" id="ali" data-lang="formView.bclEmp.fraudEmp">Fraud ES</span>
    <input type="text" class="form-control" id="fraudEmp" data-plh="formView.bclEmp.fraudEmp" placeholder="Employment" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" data-state="formView.bclEmp.fraudEmp">
    </div>
    </div>
    </div>
    
    <div class="row gx-2">
    <div class="col gy-2">
    <h4 class="mb-1 mt-4">BCL - Consumer Statement</h5>
    </div>
    </div>

    <div class="row gx-2 btn-group" style="width: 100%">
    <div class="col gy-2">
    <input type="checkbox" class="btn-check" id="changeAlert" value="changeAlert" autocomplete="off" data-state="formView.bclConSta.changeAlert">
    <label class="btn btn-outline-secondary w-100" for="changeAlert" data-lang="formView.bclConSta.changeAlert">Lost-ID to Fraud Alert</label>
    </div>
    <div class="col gy-2">
    <input type="checkbox" class="btn-check" id="conSta" value="conSta" autocomplete="off" data-state="formView.bclConSta.conSta">
    <label class="btn btn-outline-secondary w-100" for="conSta" data-lang="formView.bclConSta.conSta">Consumer Statement</label>
    </div>
    </div>

    <div class="row gx-2 btn-group" style="width: 100%">
    <div class="col gy-2">
    <input type="checkbox" class="btn-check" id="phnAlert" value="phnAlert" autocomplete="off" data-state="formView.bclConSta.phnAlert">
    <label class="btn btn-outline-secondary w-100" for="phnAlert" data-lang="formView.bclConSta.phnAlert">Alert Telephone</label>
    </div>
    </div>

    <div class="row gx-2">
    <div class="col gy-2">
    <h4 class="mb-1 mt-4">Canada - PII</h5>
    </div>
    </div>

    <div class="row gx-2">
    <div class="col gy-2">
    <div class="input-group input-group-custom-width">
    <span class="input-group-text" data-lang="formView.canMixed.mixed">Mixed File</span>
    <input type="text" class="form-control" id="mixed" placeholder="S - Ticket #" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" data-state="formView.canMixed.mixed">
    </div>
    </div>
    </div>

    <div class="row gx-2">
    <div class="col gy-2">
    <div class="input-group input-group-custom-width">
    <span class="input-group-text" data-lang="formView.canSecNot.secNotOne">Security Notice 1</span>
    <input type="text" class="form-control" id="secNotOne" placeholder="Salesforce Case #" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" data-state="formView.canSecNot.secNotOne">
    </div>
    </div>
    </div>

    <div class="row gx-2">
    <div class="col gy-2">
    <div class="input-group input-group-custom-width">
    <span class="input-group-text" data-lang="formView.canSecNot.secNotTwo">Security Notice 2</span>
    <input type="text" class="form-control" id="secNotTwo"  placeholder="Salesforce Case #" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" data-state="formView.canSecNot.secNotTwo">
    </div>
    </div>
    </div>


    <div class="row gx-2 btn-group" style="width: 100%">
    <div class="col gy-2">
    <div>
    <input type="checkbox" class="btn-check" id="minSin" value="minSin" autocomplete="off" data-state="formView.canMinSin.minSin">
    <label class="btn btn-outline-secondary w-100" for="minSin" data-lang="formView.canMinSin.minSin">Minor SIN Protection</label>
    </div>
    </div>
    </div>

    <div class="row gx-2">
    <div class="col gy-2">
    <h4 class="mb-1 mt-4">Canada - Consumer Statement</h5>
    </div>
    </div>

    <div class="row gx-2 btn-group" style="width: 100%">
    <div class="col gy-2">
    <input type="checkbox" class="btn-check" id="addLock" value="addLock" autocomplete="off" data-state="formView.canConSta.addLock">
    <label class="btn btn-outline-secondary w-100" for="addLock" data-lang="formView.canConSta.addLock">Activate Lock</label>
    </div>
    <div class="col gy-2">
    <input type="checkbox" class="btn-check" id="removeLock" value="removeLock" autocomplete="off" data-state="formView.canConSta.removeLock">
    <label class="btn btn-outline-secondary w-100" for="removeLock" data-lang="formView.canConSta.removeLock">Remove Lock</label>
    </div>
    <div class="col gy-2">
    <input type="checkbox" class="btn-check" id="minAlert" value="minAlert" autocomplete="off" data-state="formView.canConSta.minAlert">
    <label class="btn btn-outline-secondary w-100" for="minAlert" data-lang="formView.canConSta.minAlert">Alert Minor</label>
    </div>
    </div>



    </div>

    <hr class="border border-primary border-2 opacity-75 mt-4 mb-4" style="border-color: #004d66 !important;">
    <div id="cardArea"></div>
    </div>
    `;
    return template;
  }

  cardMarkUp(id, title, header) {
    let card = ` 
     <div id="${id}" class="card border-primary mb-3" style="max-width: 100%;">
        <div class="card-header">
            <div class="flex_horizontal d-flex align-items-center">
                <h6 class="cardTitle d-flex align-items-center mb-0" >${title}</h6>
                <div class="cardIcons" style="display: flex; flex-direction: row">
               <div>
<button type="button" id="copyButton" class="btn btn-secondary" data-lang="sinView.submit">Copier</button>
               <input type="checkbox" class="btn-check urgentIcon" id="${id}urgentIcon" autocomplete="off">
<label class="btn btn-outline-danger" for="${id}urgentIcon" >Urgent</label>
  </div>
                </div>
            </div>
        </div>
        <div id="cardBody" class="card-body" style="text-align: justify">
          <p class="card-text">
            <i><span id="urgentMessage" ></span></i>
            <span id="cardHeader">${header}</span>
            <ul class="formElements"></ul>
          </p>
        </div>`;

    return card;
  }

  createNewFormCard(cardObject) {
    let cardArea = document.getElementById("cardArea");
    cardArea.insertAdjacentHTML(
      "beforeend",
      this.cardMarkUp(cardObject.id, cardObject.title, cardObject.header)
    );
    let newCard = document.getElementById(cardObject.id);
    let cardHeader = newCard.querySelector("#cardHeader");
    cardHeader.innerHTML = cardObject.header;
    this.addCardElements(cardObject);
  }

  addCardElements(object) {
    let cardObject = object;
    let card = document.getElementById(cardObject.id);
    let cardElementsArea = card.querySelector("ul.formElements");
    let checkBoxArray = cardObject.checkBox;
    let inputArray = cardObject.input;

    cardElementsArea.innerHTML = "";
    checkBoxArray.forEach((el) => {
      cardElementsArea.insertAdjacentHTML("beforeend", el.text);
    });
    inputArray.forEach((el) => {
      cardElementsArea.insertAdjacentHTML("beforeend", el.text);
      let element = document.getElementById(el.id);
      element.insertAdjacentHTML("beforeend", el.value);
    });
    let iconUrgent = card.querySelector("input.urgentIcon");
    iconUrgent.addEventListener("click", (el) => {
      this.cardUrgency(el, card);
    });
    let copyButton = card.querySelector("#copyButton");
    copyButton.addEventListener("click", () => {
      let text = card.querySelector("#cardBody");
      this.copyCardContent(card);
    });
  }

  cardUrgency(element, cardElement) {
    let card = element.target;
    let urgentMessage = cardElement.querySelector("span#urgentMessage");
    card.checked
      ? (urgentMessage.innerHTML = `<p>**URGENT**</p>`)
      : (urgentMessage.innerHTML = "");
  }

  copyCardContent(element) {
    let card = element;
    let text = card.querySelector("#cardBody");
    navigator.clipboard.writeText(text.innerText);
  }

  removeExistingCard(cardID) {
    let card = document.getElementById(cardID);
    card ? card.remove() : null;
  }

  checkIfCardAlreadyExist(cardID) {
    let card = document.getElementById(cardID);
    if (card) return true;
    if (!card) return false;
  }
}

export default new FormView();
