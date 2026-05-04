import View from "./view.js";
import iconView from "./iconView.js";

class spView extends View {
  generateMarkup() {
    let template = `
        <form id="spArea">
<h4 class="mb-4 text-center" data-lang="spView.title">Commentaire SP</h4>
<div class="input-group mb-2">
    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-lang="spView.reasonForCall">Motif de l'appel</button>
    <ul class="dropdown-menu" id="dropdownReason">
      <li><a class="dropdown-item"  data-value="Fraud">Fraud</a></li>
      <li><a class="dropdown-item" data-value="Lost-ID">Lost-ID</a></li>
      <li><a class="dropdown-item" data-value="Mixed File">Mixed File</a></li>
      <li><a class="dropdown-item" data-value="Login Help">Login Help</a></li>
    </ul>
    <input type="text" id="reasonInput" class="form-control" aria-label="Text input with dropdown button" data-state="spView.reasonForCall">
  </div>

  <h6 class="mb-2 mt-4" data-lang="spView.actionsTaken">Mesures Prises</h6>
  
  <div class="input-group mb-2">
    <input type="checkbox" class="btn-check" id="checkBox1"  autocomplete="off" value="Added Lost-ID Alert" data-state="spView.actionsTaken.checkBox1">
    <label class="btn btn-outline-secondary text-center rounded" for="checkBox1" style="width: 100%" data-lang="spView.actionsTaken.checkBox1">Ajout d'une alerte lost ID</label>
    </div>

    <div class="input-group mb-2">
        <input type="checkbox" class="btn-check" id="checkBox2"  autocomplete="off" value="Added Fraud Alert" data-state="spView.actionsTaken.checkBox2">
        <label class="btn btn-outline-secondary text-center rounded" for="checkBox2" style="width: 100%" data-lang="spView.actionsTaken.checkBox2">Ajout d'une Alerte à la fraude</label>
        </div>

        <div class="input-group mb-2">
            <input type="checkbox" class="btn-check" id="checkBox3"  autocomplete="off" value="Added Credit Lock" data-state="spView.actionsTaken.checkBox3">
            <label class="btn btn-outline-secondary text-center rounded" for="checkBox3" style="width: 100%" data-lang="spView.actionsTaken.checkBox3">Verrouillage du crédit activé</label>
            </div>

            <div class="input-group mb-2">
                <input type="checkbox" class="btn-check" id="checkBox4"  autocomplete="off" value="Added SIN Protection" data-state="spView.actionsTaken.checkBox4">
                <label class="btn btn-outline-secondary text-center rounded" for="checkBox4" style="width: 100%" data-lang="spView.actionsTaken.checkBox4">Protection du NAS</label>
                </div>

                <div class="input-group mb-2">
                    <input type="checkbox" class="btn-check" id="checkBox5"  autocomplete="off" value="EWP form sent" data-state="spView.actionsTaken.checkBox5">
                    <label class="btn btn-outline-secondary text-center rounded" for="checkBox5" style="width: 100%" data-lang="spView.actionsTaken.checkBox5">Formulaire EWP envoyé</label>
                    </div>
                
                    <div class="input-group mb-2">
                        <input type="checkbox" class="btn-check" id="checkBox7"  autocomplete="off" value="Fraudulent Investigation started" data-state="spView.actionsTaken.checkBox6">
                        <label class="btn btn-outline-secondary text-center rounded" for="checkBox7" style="width: 100%" data-lang="spView.actionsTaken.checkBox6">Enquête pour fraude ouverte</label>
                        </div>

                        <div class="input-group mb-2">
                            <input type="checkbox" class="btn-check" id="checkBox8"  autocomplete="off" value="Regular Investigation started" data-state="spView.actionsTaken.checkBox7">
                            <label class="btn btn-outline-secondary text-center rounded" for="checkBox8" style="width: 100%" data-lang="spView.actionsTaken.checkBox7">Enquête régulière ouverte</label>
                            </div>

                            <div class="input-group mb-2">
                                <span class="input-group-text" data-lang="spView.actionsTaken.checkBox8">Escaladé vers CCE</span>
                                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Nom du Template" data-plh="spView.actionsTaken.checkBox8" data-state="spView.actionsTaken.checkBox8">
                              </div>
                              <div class="input-group mb-2">
                                <span class="input-group-text" data-lang="spView.actionsTaken.checkBox9">Doublons combinées UN</span>
                                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Ajouter UN's" data-plh="spView.actionsTaken.checkBox9" data-state="spView.actionsTaken.checkBox9">
                              </div>
                              <div class="input-group mb-2">
                                <span class="input-group-text" data-lang="spView.actionsTaken.checkBox10">Doublons pas combinées UN</span>
                                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Ajouter UN's" data-plh="spView.actionsTaken.checkBox10" data-state="spView.actionsTaken.checkBox10">
                              </div>

                              <div class="input-group mb-2">
                                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-lang="spView.actionsTaken.checkBox11">AUTH manuelle effectuée</button>
                                <ul class="dropdown-menu" id="dropdownAUTH">
                                  <li><a class="dropdown-item" data-lang="spView.actionsTaken.checkBox11.options.sub1" data-value="REVOLVING - S. CARTES DESJARDINS">RENOUVELABLE - S. CARTES DESJARDINS</a></li>
                                  <li><a class="dropdown-item" data-lang="spView.actionsTaken.checkBox11.options.sub2" data-value="REVOLVING - ">RENOUVELABLE -</a></li>
                                  <li><a class="dropdown-item" data-lang="spView.actionsTaken.checkBox11.options.sub3" data-value="INSTALLMENT - ">À TEMPÉRAMENT -</a></li>
                                  <li><a class="dropdown-item" data-lang="spView.actionsTaken.checkBox11.options.sub4" data-value="MORTGAGE - ">HYPOTHÈQUE - </a></li>
                                  <li><a class="dropdown-item" data-lang="spView.actionsTaken.checkBox11.options.sub5" data-value="LINE OF CREDIT - ">MARGE DE CRÉDIT - </a></li>
                                  <li><a class="dropdown-item" data-lang="spView.actionsTaken.checkBox11.options.sub6" data-value="OPEN - ">OUVERT - </a></li>
                                </ul>
                                <input type="text" id="dropdownManAuth" class="form-control" aria-label="Text input with dropdown button" data-state="spView.actionsTaken.checkBox11">
                              </div>
                              <div>
                                <div class="input-group mb-2">
                               <input type="checkbox" class="btn-check" id="checkBox18"  autocomplete="off" value="Personal Information Updated on (EWP)" data-state="spView.actionsTaken.checkBox12">
                               <label class="btn btn-outline-secondary text-center rounded" for="checkBox18" style="width: 100%" data-lang="spView.actionsTaken.checkBox12">Informations personnelles mises à jour (EWP)</label>
                               </div>
                               <div id="areaCheckBox12"></div>
                               </div>

                               <h6 class="mb-2 mt-4" data-lang="spView.title2">Autres détails</h6>
                               <div class="input-group mb-3">
                                <label class="input-group-text" for="inputGroupSelect02">Ticket</label>
                                <select class="form-select" id="inputGroupSelect02" data-state="spView.select">
                                  <option value="normal" selected>Ticket</option>
                                  <option value="bcl" >BCL</option>
                                  <option value="bclUrgent" >BCL Urgent</option>
                                </select>
                                <input id="spTicketInputId" type="text" class="form-control" aria-label="Text input with segmented dropdown button" data-state="spView.otherDetails" >
                                <button id="spTicketButton" class="btn btn-primary" type="button">${iconView.arrowDown()}</button>
                              </div>
                              <hr class="border border-primary border-2 opacity-75 mt-5" style="border-color: #004d66 !important;">
<div id="spText"></div>
<hr class="border border-primary border-2 opacity-75 mb-5" style="border-color: #004d66 !important;">
<div class="d-grid">
<button type="submit" class="btn btn-primary btn-lg mb-2" data-lang="spView.button">Copier SP</button>
<button type="button" id="sheetsButton" class="btn btn-success btn-lg" data-lang="spView.buttonExcel" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Envoyer formulaire(s) BCL vers Sheets ${iconView.planeSend()}</button>
</div>
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel" data-lang="spView.tickets.title">Transférer formulaire(s) vers sheets</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="modalBody">
        ...
      </div>
      <div class="modal-footer">
       <button type="submit" id="sendButton" class="btn btn-success" data-lang="spView.tickets.send">Send${iconView.planeSend()}</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" data-lang="spView.tickets.close">Close</button>
      </div>
    </div>
  </div>
</div>
</form>`;

    return template;
  }

  checkBox12PendingTemplates() {
    let template = `
<div class="container">
<div class="row">
 <div class="col-auto d-flex justify-content-center align-items-center">
 ${iconView.arrowReturn()}
    </div>
    <div class="col">
     <div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox18Sub1"  autocomplete="off" value="Name" data-state="spView.actionsTaken.checkBox12.templates.sub1">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub1" style="width: 100%" data-lang="spView.actionsTaken.checkBox12.templates.sub1">Nom</label>
</div>
    </div>
 </div>
</div>

<div class="container">
<div class="row">
 <div class="col-auto d-flex justify-content-center align-items-center">
 ${iconView.arrowReturn()}
    </div>
    <div class="col">
     <div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox18Sub2"  autocomplete="off" value="Switch Name with AKA" data-state="spView.actionsTaken.checkBox12.templates.sub2">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub2" style="width: 100%" data-lang="spView.actionsTaken.checkBox12.templates.sub2">Switch le nom par un AKA</label>
</div>
    </div>
 </div>
</div>

<div class="container">
<div class="row">
 <div class="col-auto d-flex justify-content-center align-items-center">
 ${iconView.arrowReturn()}
    </div>
    <div class="col">
     <div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox18Sub3"  autocomplete="off" value="Address" data-state="spView.actionsTaken.checkBox12.templates.sub3">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub3" style="width: 100%" data-lang="spView.actionsTaken.checkBox12.templates.sub3">Adresse</label>
</div>
    </div>
 </div>
</div>

<div class="container">
<div class="row">
 <div class="col-auto d-flex justify-content-center align-items-center">
 ${iconView.arrowReturn()}
    </div>
    <div class="col">
     <div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox18Sub4"  autocomplete="off" value="DOB" data-state="spView.actionsTaken.checkBox12.templates.sub4">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub4" style="width: 100%">DOB</label>
</div>
    </div>
 </div>
</div>

<div class="container">
<div class="row">
 <div class="col-auto d-flex justify-content-center align-items-center">
 ${iconView.arrowReturn()}
    </div>
    <div class="col">
     <div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox18Sub5"  autocomplete="off" value="Phone Number : Added" data-state="spView.actionsTaken.checkBox12.templates.sub5">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub5" style="width: 100%" data-lang="spView.actionsTaken.checkBox12.templates.sub5">Numéro de téléphone : ajouté</label>
</div>
    </div>
 </div>
</div>

<div class="container">
<div class="row">
 <div class="col-auto d-flex justify-content-center align-items-center">
 ${iconView.arrowReturn()}
    </div>
    <div class="col">
     <div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox18Sub6"  autocomplete="off" value="Phone Number : Removed" data-state="spView.actionsTaken.checkBox12.templates.sub6">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub6" style="width: 100%" data-lang="spView.actionsTaken.checkBox12.templates.sub6">Numéro de téléphone : Supprimé</label>
</div>
    </div>
 </div>
</div>

<div class="container">
<div class="row">
 <div class="col-auto d-flex justify-content-center align-items-center">
 ${iconView.arrowReturn()}
    </div>
    <div class="col">
     <div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox18Sub7"  autocomplete="off" value="SIN" data-state="spView.actionsTaken.checkBox12.templates.sub7">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub7" style="width: 100%" data-lang="spView.actionsTaken.checkBox12.templates.sub7">NAS</label>
</div>
    </div>
 </div>
</div>

<div class="container">
<div class="row">
 <div class="col-auto d-flex justify-content-center align-items-center">
 ${iconView.arrowReturn()}
    </div>
    <div class="col">
     <div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox18Sub8"  autocomplete="off" value="Email" data-state="spView.actionsTaken.checkBox12.templates.sub8">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub8" style="width: 100%" data-lang="spView.actionsTaken.checkBox12.templates.sub8">Courriel</label>
</div>
    </div>
 </div>
</div>
<div class="container">
<div class="row">
 <div class="col-auto d-flex justify-content-center align-items-center">
 ${iconView.arrowReturn()}
    </div>
    <div class="col">
     <div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox18Sub9"  autocomplete="off" value="Employment" data-state="spView.actionsTaken.checkBox12.templates.sub9">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub9" style="width: 100%" data-lang="spView.actionsTaken.checkBox12.templates.sub9">Emploi</label>
</div>
    </div>
 </div>
</div>
<div class="container">
<div class="row">
 <div class="col-auto d-flex justify-content-center align-items-center">
 ${iconView.arrowReturn()}
    </div>
    <div class="col">
     <div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox18Sub10"  autocomplete="off" value="Switch ES and EF" data-state="spView.actionsTaken.checkBox12.templates.sub10">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub10" style="width: 100%" data-lang="spView.actionsTaken.checkBox12.templates.sub10">Switch ES et EF</label>
</div>
    </div>
 </div>
</div>
    `;
    return template;
  }

  createSPMainTemplate(reason, actions, details) {
    let template = `
    Reason for call: ${reason}<br>
    Actions Taken: ${actions}<br>
    Other details: ${details}
 `;
    return template;
  }

  extractTicketInfo() {
    let input = document.getElementById("spTicketInputId");
    let type = document.getElementById("inputGroupSelect02");
    return [input, type];
  }

  modifySheetButton(value) {
    document.getElementById("sheetsButton").disabled = value;
  }

  correctModalFocus() {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.addEventListener("hide.bs.modal", () => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      });
    });
  }

  modifyModalBody(normal, urgent) {
    let area = document.getElementById("modalBody");
    let select = this.selectAgents();
    let template = `
    <div id="messageArea"></div>
    <p>${select}</p>
    <p><b>Normal: </b>${normal.length > 0 ? normal.join(", ") : "None"}</p>
    <p><b>Urgent: </b>${urgent.length > 0 ? urgent.join(", ") : "None"}</p>
    `;
    area.innerHTML = template;
  }

  selectAgents() {
    let template = `
    <div class="input-group">
    <span class="input-group-text" data-lang="spView.tickets.agent">Agent Name</span>
    <select id="selectAgent" class="form-select" aria-label="Default select example" data-state="spView.tickets.bcl" required>
  <option value="Alberto Saborio" selected>Alberto Saborio</option>
  <option value="Bryan Ortega">Bryan ortega</option>
  <option value="Cristel Monge">Cristel Monge</option>
  <option value="George Gomez">George Gomez</option>
  <option value="Jaison Sarmiento">Jaison Sarmiento</option>
  <option value="Katherin Araya">Katherin Araya</option>
  <option value="Keylor Calderon">Keylor Calderon</option>
  <option value="Manuel Corrales">Manuel Corrales</option>
  <option value="Marcelo Vargas">Marcelo Vargas</option>
  <option value="Natalia Duran">Natalia Duran</option>
  <option value="Tatiana Portilla">Tatiana portilla</option>
  <option value="Valery Arrata">Valery Arrata</option>
</select>
</div>
<div id="errorArea"></div>`;
    return template;
  }

  focusInput() {
    let input = document.getElementById("selectAgent");
    input.focus();
  }

  loadingTemplate(){
    let template=`<div class="spinner-grow text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-secondary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-success" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-danger" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-warning" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-info" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-light" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`
return template
  }

  modifyMessageArea(type, msg) {
    let area = document.getElementById("messageArea");

    switch (type) {
      case "loading":
        area.innerHTML = `${this.loadingTemplate()}`;
        break;
      case "succes":
        area.innerHTML = `${iconView.check()} Success: ${msg}`;
        break;
      case "error":
        area.innerHTML = `${iconView.x()} Error: ${msg}`;
        break;
    }
  }
}

export default new spView();
