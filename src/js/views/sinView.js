import View from "./view.js";

class FraudNotHisView extends View {
  generateMarkup() {
    let template = `
     <div>
        <form id="sinViewArea">
            <h4 class="mb-4 text-center" data-lang='sinView.title'>Protection NAS | Alerte Courriel</h4>
            <div class="container g-0">
  <div class="row">
  <h6 class="mt-4 mb-2" data-lang="sinView.subtitle1">Choose Protection: </h6>
  <div class="col g-2">
      <input type="radio" class="btn-check" name="protections" id="sinProAleEma" autocomplete="off" value="both" data-state="sinView.protectionRadio" required>
<label class="btn btn-outline-secondary w-100" for="sinProAleEma" data-lang='sinView.protectionRadio.bothProtection'>Protection NAS + Alerte Courriel</label>
    </div>
   </div>
  <div class="row">
    <div class="col g-2 w-100">
      <input type="radio" class="btn-check" name="protections" id="sinProtection" autocomplete="off" value="onlyNAS" data-state="sinView.protectionRadio" required>
<label class="btn btn-outline-secondary w-100" for="sinProtection" data-lang='sinView.protectionRadio.onlyNAS'>Protection NAS</label>
    </div>
    <div class="col g-2 w-100">
      <input type="radio" class="btn-check" name="protections" id="alertEmail" autocomplete="off" value="onlyAlert" data-state="sinView.protectionRadio" required>
<label class="btn btn-outline-secondary w-100" for="alertEmail" data-lang='sinView.protectionRadio.onlyAlert'>Alerte Courriel</label>
    </div>
  </div>
  <div id="templateAreaSin" class="mt-5"></div>

</form>
</div>`;

    return template;
  }

  templateSinProtectionAlertEmail() {
    let template = `
    <h6 class="mt-4 mb-2" data-lang="sinView.subtitle2">Complétez les informations requises</h6>
     <div class="container g-0 w-100" mt-5>
         <div class="row mb-3 w-100">
            <div class="col container w-100">
                    <div class="row d-flex justify-content-start text-center ">
                      <div class="col-auto d-flex text-center justify-content-start">
                        <span class="form-label text-center justify-content-start w-100" style="display: flex;
                        justify-content: center;
                        align-items: center; flex-grow: 1;          
                        margin: 0;" data-lang='sinView.typeAlert'>Type d'alerte:</span>
                      </div>
                      <div class="col g-2">
<input type="radio" class="btn-check" name="typeAlert" id="typeAlertFraud" autocomplete="off" data-state="sinView.typeAlert" value="Fraud" required>
<label class="btn btn-outline-secondary w-100" for="typeAlertFraud">Fraud</label>
</div>

                      <div class="col g-2">
                      <input type="radio" class="btn-check" name="typeAlert" id="typeAlertLostID" value="Lost-ID" autocomplete="off" data-state="sinView.typeAlert" required>
<label class="btn btn-outline-secondary w-100" for="typeAlertLostID">Lost-ID</label>
                      </div>
                    </div>       
            </div>
        </div>
    <div class="row mb-2 w-100">
        <div class="col">
            <div class="input-group">
                <span class="input-group-text" id="sinProtPhoneNum" data-lang="sinView.telephone">Numéro de téléphone :</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="sinProtPhoneNum" data-state="sinView.telephone" required>
              </div>
        </div>
    </div>
    <div class="row mb-2 w-100">
        <div class="col">
            <div class="input-group">
                <span class="input-group-text" id="sinDigits" data-lang="sinView.sin">NAS: XXX XXX</span>
                <input type="text" maxlength="3" class="form-control" aria-label="Sizing example input" aria-describedby="sinDigits" placeholder="3 derniers chiffres" style=" field-sizing: content;" data-state="sinView.sin" data-plh="sinView.sin" required>
              </div>
        </div>
    </div>

 <div class="row mb-3 w-100">
            <div class="col container w-100">
                    <div class="row d-flex justify-content-start text-center ">
                      <div class="col-auto d-flex text-center justify-content-start">
                        <span class="form-label text-center justify-content-start w-100" style="display: flex;
                        justify-content: center;
                        align-items: center; flex-grow: 1;          
                        margin: 0;" data-lang='sinView.communication'>Langue de communication :</span>
                      </div>
                      <div class="col g-2">
<input type="radio" class="btn-check" name="commLang" id="commLanEN" value="English" autocomplete="off" data-state="sinView.communication" required>
<label class="btn btn-outline-secondary w-100" for="commLanEN">EN</label>
</div>
                      <div class="col g-2">
                      <input type="radio" class="btn-check" name="commLang" id="commLanFR" value="French" autocomplete="off" data-state="sinView.communication" required>
<label class="btn btn-outline-secondary w-100" for="commLanFR">FR</label>
                      </div>
                    </div>       
            </div>
        </div>
    <div class="row mb-2 w-100">
        <div class="col">
            <div class="input-group">
                <span class="input-group-text" data-lang='sinView.contact'>Mode de contact</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="sinDigits" placeholder="Adresse Courriel / Adresse Postale" data-plh='sinView.contact' data-state='sinView.contact' required>
              </div>
        </div>
    </div>
    </div>
    <hr class="border border-primary border-2 opacity-75 mt-5" style="border-color: #004d66 !important;">
<div id="displayTemplate"></div>
<hr class="border border-primary border-2 opacity-75 mb-5" style="border-color: #004d66 !important;">
<button type="submit" class="btn btn-primary btn-lg" data-lang='sinView.submit' style="width: 100%;">Copier</button>
</div>`;

    return template;
  }

  templateSinProtection() {
    let template = `
     <div class="container g-0 w-100 mt-5">  
<div class="row mb-2 w-100">
        <div class="col">
            <div class="input-group">
                <span class="input-group-text" id="sinDigits" data-lang="sinView.sin">NAS: XXX XXX</span>
                <input type="text" maxlength="3" class="form-control" aria-label="Sizing example input" aria-describedby="sinDigits" placeholder="3 derniers chiffres" style=" field-sizing: content;" data-state="sinView.sin" data-plh="sinView.sin" required>
              </div>
        </div>
    </div>
    </div> 
    <hr class="border border-primary border-2 opacity-75 mt-5" style="border-color: #004d66 !important;">
<div id="displayTemplate"></div>
<hr class="border border-primary border-2 opacity-75 mb-5" style="border-color: #004d66 !important;">
<button type="submit" class="btn btn-primary btn-lg" data-lang='sinView.submit' style="width: 100%;">Copier</button>
</div> `;
    return template;
  }

  templateAlertEmail() {
    let template = `
       <div class="container g-0 w-100 mt-5">
         <div class="row mb-3 w-100">
            <div class="col container w-100">
                    <div class="row d-flex justify-content-start text-center ">
                      <div class="col-auto d-flex text-center justify-content-start">
                        <span class="form-label text-center justify-content-start w-100" style="display: flex;
                        justify-content: center;
                        align-items: center; flex-grow: 1;          
                        margin: 0;" data-lang='sinView.typeAlert'>Type d'alerte:</span>
                      </div>
                      <div class="col g-2">
<input type="radio" class="btn-check" name="typeAlert" id="typeAlertFraud" autocomplete="off" data-state="sinView.typeAlert" value="Fraud" required>
<label class="btn btn-outline-secondary w-100" for="typeAlertFraud">Fraud</label>
</div>

                      <div class="col g-2">
                      <input type="radio" class="btn-check" name="typeAlert" id="typeAlertLostID" value="Lost-ID" autocomplete="off" data-state="sinView.typeAlert" required>
<label class="btn btn-outline-secondary w-100" for="typeAlertLostID">Lost-ID</label>
                      </div>
                    </div>       
            </div>
        </div>
    <div class="row mb-2 w-100">
        <div class="col">
            <div class="input-group">
                <span class="input-group-text" id="sinProtPhoneNum" data-lang="sinView.telephone">Numéro de téléphone :</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="sinProtPhoneNum" data-state="sinView.telephone" required> 
              </div>
        </div>
    </div>
     <div class="row mb-3 w-100">
            <div class="col container w-100">
                    <div class="row d-flex justify-content-start text-center ">
                      <div class="col-auto d-flex text-center justify-content-start">
                        <span class="form-label text-center justify-content-start w-100" style="display: flex;
                        justify-content: center;
                        align-items: center; flex-grow: 1;          
                        margin: 0;" data-lang='sinView.communication'>Langue de communication :</span>
                      </div>
                      <div class="col g-2">
<input type="radio" class="btn-check" name="commLang" id="commLanEN" value="English" autocomplete="off" data-state="sinView.communication" required>
<label class="btn btn-outline-secondary w-100" for="commLanEN">EN</label>
</div>
                      <div class="col g-2">
                      <input type="radio" class="btn-check" name="commLang" id="commLanFR" value="French" autocomplete="off" data-state="sinView.communication" required>
<label class="btn btn-outline-secondary w-100" for="commLanFR">FR</label>
                      </div>
                    </div>       
            </div>
        </div>
    <div class="row mb-2 w-100">
        <div class="col">
            <div class="input-group">
                <span class="input-group-text" data-lang='sinView.contact'>Mode de contact</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="sinDigits" placeholder="Adresse Courriel / Adresse Postale" data-plh='sinView.contact' data-state='sinView.contact' required>
              </div>
        </div>
    </div>
    </div>
    <hr class="border border-primary border-2 opacity-75 mt-5" style="border-color: #004d66 !important;">
<div id="displayTemplate"></div>
<hr class="border border-primary border-2 opacity-75 mb-5" style="border-color: #004d66 !important;">
<button type="submit" class="btn btn-primary btn-lg" data-lang='sinView.submit' style="width: 100%;">Copier</button>
</div>`;
    return template;
  }

  outputSinProtectionAlertEmail(alertType, phone, sin, language, contact) {
    let template = `
Alert added as per cx request.<br>
Please add SIN in Safescan and send letter to cx:<br>
Alert Type: ${alertType}<br>
Phone Number: ${phone}<br>
SIN: XXX XXX ${sin}<br>
Communication Language: ${language}<br>
Customer Contact Method: ${contact}
    `;
    return template;
  }

  outputSinProtection(sin) {
    let template = `
Please add SIN in Safescan:<br>
SIN: XXX XXX ${sin}
    `;
    return template;
  }

  outputAlertEmail(alertType, phone, language, contact) {
    let template = `
Alert added as per cx request<br>
Please send letter to cx:<br>
Alert Type: ${alertType}<br>
Phone Number: ${phone}<br>
Communication Language: ${language}<br>
Customer Contact Method: ${contact} 
    `;
    return template;
  }

  addHandlerTypeOfAction(handler) {
    let inputs = document.querySelectorAll('input[name="protections"]');
    inputs.forEach((el) => el.addEventListener("click", handler));
  }
}

export default new FraudNotHisView();
