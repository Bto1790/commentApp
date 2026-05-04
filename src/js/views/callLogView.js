import iconView from "./iconView.js";
import View from "./view.js";

class CallLogView extends View {
  generateMarkup() {
    let template = `
<form id="callLogContainer">
<h5 class="mb-4 text-center">Call Log</h5>
<div class="input-group mb-2">
<span id="dispCodLabel" for="dispositionCode" class="input-group-text" data-lang="callLogView.dispositionCode.label">Code de disposition</span>
<select id="dispositionCode" class="form-select" style="text-align: center;" aria-label="Small select example" data-state="callLogView.dispositionCode">
  <option value="Fraud Alert - Add" data-lang="callLogView.dispositionCode.options.dispositionCode1">Alerte à la fraude - Ajouter</option>
  <option value="Fraud Alert - Consumer Inquiry" data-lang="callLogView.dispositionCode.options.dispositionCode2">Alerte à la fraude - Demande de renseignements des consommateurs</option>
  <option value="Fraud Alert - Remove" data-lang="callLogView.dispositionCode.options.dispositionCode3">Alerte à la fraude - Supprimer</option>
  <option value="Fraud Alert - Complaint" data-lang="callLogView.dispositionCode.options.dispositionCode4">Alerte à la fraude - Réclamation</option>
  <option value="Promotional Code - Activation Support" data-lang="callLogView.dispositionCode.options.dispositionCode5">Code promotionnel - Aide à l'activation</option>
  <option value="Promotional Code - Website Navigation Support" data-lang="callLogView.dispositionCode.options.dispositionCode6">Code promotionnel - Aide à la navigation sur le site</option>
  <option value="Promotional Code - Consumer Inquiry" data-lang="callLogView.dispositionCode.options.dispositionCode7">Code promotionnel - Demande de renseignements des consommateurs</option>
  <option value="Promotional Code - Complaint" data-lang="callLogView.dispositionCode.options.dispositionCode8">Code promotionnel - Réclamation</option>
  <option value="Lost id alert - Add" data-lang="callLogView.dispositionCode.options.dispositionCode9">Alerte lost-ID - Ajouter</option>
</select>
</div>

<div class="input-group mb-2">
<span id="authenticathionStatusLabel" class="input-group-text" data-lang="callLogView.authenticationStatus.label">État de l'authentification</span>
<select id="authenticationStatus" class="form-select" style="text-align: center;" aria-label="Small select example" data-state="callLogView.authenticationStatus">
  <option value="Auth process passed" data-lang="callLogView.authenticationStatus.options.authenticationStatus1">Authentification réussie</option>
  <option value="Auth process failed" data-lang="callLogView.authenticationStatus.options.authenticationStatus2">Échec de l'authentification</option>
</select>
</div>

<div class="input-group mb-2">
<span class="input-group-text">FMT</span>
<select id="FMT" class="form-select" style="text-align: center;" aria-label="Small select example" data-state="callLogView.FMT">
  <option value="FMT: CONSUMER RECOGNIZED ALL ATTRIBUTES ON SALESFORCE PROFILE" data-lang="callLogView.FMT.options.FMT1">FMT: LE CONSOMMATEUR A RECONNU TOUTES LES CARACTÉRISTIQUES DU PROFIL SALESFORCE</option>
  <option value="FMT: CONSUMER DID NOT RECOGNIZED ALL ATTRIBUTES ON SALESFORCE PROFILE" data-lang="callLogView.FMT.options.FMT2">FMT: LE CONSOMMATEUR N'A PAS RECONNU TOUS LES ATRIBUTS DU PROFIL SALESFORCE</option>
</select>
</div>

<div class="input-group mb-2">
<span class="input-group-text" data-lang="callLogView.firstResolution.label">1ère résolution</span>
<select id="firstResolution" class="form-select" style="text-align: center;" aria-label="Small select example" data-state="callLogView.firstResolution">
  <option value="Added fraud alert" data-lang="callLogView.firstResolution.options.firstResolution1">Alerte à la fraude activée</option>
  <option value="Added Lost ID alert" data-lang="callLogView.firstResolution.options.firstResolution2">Alerte Lost ID activée</option>
  <option value="Investigation Started" data-lang="callLogView.firstResolution.options.firstResolution3">Ouverture d'une enquête</option>
  <option value="Investigation Follow up" data-lang="callLogView.firstResolution.options.firstResolution4">Suivi de l'enquête</option>
  <option value="Account Recovery Successfull" data-lang="callLogView.firstResolution.options.firstResolution5">Récupération du compte réussie</option>
  <option value="Account Recovery unsuccessfull" data-lang="callLogView.firstResolution.options.firstResolution6">Échec de la récupération du compte</option>
  <option value="Call Transferred" data-lang="callLogView.firstResolution.options.firstResolution7">Appel transféré</option>
  <option value="Free credit report and score activated" data-lang="callLogView.firstResolution.options.firstResolution8">Rapport de crédit gratuit et pointage activés</option>
  <option value="Requested documents" data-lang="callLogView.firstResolution.options.firstResolution9">Documents demandés</option>
  <option value="Unlocked MyEquifax for cx" data-lang="callLogView.firstResolution.options.firstResolution10">MyEquifax débloqué pour cx</option>
  <option value="Updated PII on SF per internal policy/Cx request" data-lang="callLogView.firstResolution.options.firstResolution11">Mise à jour PII sur SF conformément à la politique interne/Demande du client</option>
  <option value="Verified docs on file" data-lang="callLogView.firstResolution.options.firstResolution12">Documents vérifiés en dossier</option>
  <option value="END - No add resolution" data-lang="callLogView.firstResolution.options.firstResolution13">FIN - Pas de résolution d'ajout</option>
</select>
</div>

<div class="input-group mb-2">
<span class="input-group-text" data-lang="callLogView.secondResolution.label">2e résolution</span>
<select id="secondResolution" class="form-select" style="text-align: center;" aria-label="Small select example" data-state="callLogView.secondResolution">
  <option value="Added fraud alert" data-lang="callLogView.firstResolution.options.firstResolution1">Alerte à la fraude activée</option>
  <option value="Added Lost ID alert" data-lang="callLogView.firstResolution.options.firstResolution2">Alerte Lost ID activée</option>
  <option value="Investigation Started" data-lang="callLogView.firstResolution.options.firstResolution3">Ouverture d'une enquête</option>
  <option value="Investigation Follow up" data-lang="callLogView.firstResolution.options.firstResolution4">Suivi de l'enquête</option>
  <option value="Account Recovery Successfull" data-lang="callLogView.firstResolution.options.firstResolution5">Récupération du compte réussie</option>
  <option value="Account Recovery unsuccessfull" data-lang="callLogView.firstResolution.options.firstResolution6">Échec de la récupération du compte</option>
  <option value="Call Transferred" data-lang="callLogView.firstResolution.options.firstResolution7">Appel transféré</option>
  <option value="Free credit report and score activated" data-lang="callLogView.firstResolution.options.firstResolution8">Rapport de crédit gratuit et pointage activés</option>
  <option value="Requested documents" data-lang="callLogView.firstResolution.options.firstResolution9">Documents demandés</option>
  <option value="Unlocked MyEquifax for cx" data-lang="callLogView.firstResolution.options.firstResolution10">MyEquifax débloqué pour cx</option>
  <option value="Updated PII on SF per internal policy/Cx request" data-lang="callLogView.firstResolution.options.firstResolution11">Mise à jour PII sur SF conformément à la politique interne/Demande du client</option>
  <option value="Verified docs on file" data-lang="callLogView.firstResolution.options.firstResolution12">Documents vérifiés en dossier</option>
  <option value="END - No add resolution" data-lang="callLogView.firstResolution.options.firstResolution13">FIN - Pas de résolution d'ajout</option>
</select>
</div>

<div class="input-group mb-2">
<span class="input-group-text" data-lang="callLogView.thirdResolution.label">3e résolution</span>
<select id="thirdResolution" class="form-select" style="text-align: center;" aria-label="Small select example" data-state="callLogView.thirdResolution">
  <option value="Added fraud alert" data-lang="callLogView.firstResolution.options.firstResolution1">Alerte à la fraude activée</option>
  <option value="Added Lost ID alert" data-lang="callLogView.firstResolution.options.firstResolution2">Alerte Lost ID activée</option>
  <option value="Investigation Started" data-lang="callLogView.firstResolution.options.firstResolution3">Ouverture d'une enquête</option>
  <option value="Investigation Follow up" data-lang="callLogView.firstResolution.options.firstResolution4">Suivi de l'enquête</option>
  <option value="Account Recovery Successfull" data-lang="callLogView.firstResolution.options.firstResolution5">Récupération du compte réussie</option>
  <option value="Account Recovery unsuccessfull" data-lang="callLogView.firstResolution.options.firstResolution6">Échec de la récupération du compte</option>
  <option value="Call Transferred" data-lang="callLogView.firstResolution.options.firstResolution7">Appel transféré</option>
  <option value="Free credit report and score activated" data-lang="callLogView.firstResolution.options.firstResolution8">Rapport de crédit gratuit et pointage activés</option>
  <option value="Requested documents" data-lang="callLogView.firstResolution.options.firstResolution9">Documents demandés</option>
  <option value="Unlocked MyEquifax for cx" data-lang="callLogView.firstResolution.options.firstResolution10">MyEquifax débloqué pour cx</option>
  <option value="Updated PII on SF per internal policy/Cx request" data-lang="callLogView.firstResolution.options.firstResolution11">Mise à jour PII sur SF conformément à la politique interne/Demande du client</option>
  <option value="Verified docs on file" data-lang="callLogView.firstResolution.options.firstResolution12">Documents vérifiés en dossier</option>
  <option value="END - No add resolution" data-lang="callLogView.firstResolution.options.firstResolution13">FIN - Pas de résolution d'ajout</option>
</select>
</div>

<hr class="border border-primary border-2 opacity-75" style="border-color: #004d66 !important;">

<div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox1"  autocomplete="off" value="Added Lost-ID Alert" data-state="callLogView.checkBox1">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox1" style="width: 100%" data-lang="callLogView.checkBox1">Ajout d'une alerte lost ID</label>
</div>

<div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox2"  autocomplete="off" value="Added Fraud Alert" data-state="callLogView.checkBox2">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox2" style="width: 100%" data-lang="callLogView.checkBox2">Ajout d'une Alerte à la fraude</label>
</div>

<div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox3"  autocomplete="off" value="Added Credit Lock" data-state="callLogView.checkBox3">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox3" style="width: 100%" data-lang="callLogView.checkBox3">Verrouillage du crédit activé</label>
</div>

<div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox4"  autocomplete="off" value="Added SIN Protection" data-state="callLogView.checkBox4">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox4" style="width: 100%" data-lang="callLogView.checkBox4">Protection du NAS</label>
</div>

<div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox5"  autocomplete="off" value="EWP form sent" data-state="callLogView.checkBox5">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox5" style="width: 100%" data-lang="callLogView.checkBox5">Formulaire EWP envoyé</label>
</div>

<div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox6"  autocomplete="off" value="Consumer guided to download the form" data-state="callLogView.checkBox6">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox6" style="width: 100%" data-lang="callLogView.checkBox6">Consommateur guidé pour télécharger le formulaire</label>
</div>

<div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox7"  autocomplete="off" value="Fraudulent Investigation started" data-state="callLogView.checkBox7">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox7" style="width: 100%" data-lang="callLogView.checkBox7">Enquête pour fraude ouverte</label>
</div>

<div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox8"  autocomplete="off" value="Regular Investigation started" data-state="callLogView.checkBox8">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox8" style="width: 100%" data-lang="callLogView.checkBox8">Enquête régulière ouverte</label>
</div>

<div>
<div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox9"  autocomplete="off" value="Escalated to Jira ticket"- data-state="callLogView.checkBox9">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox9" style="width: 100%" data-lang="callLogView.checkBox9">Escaladé vers le ticket Jira</label>
</div>
<div id="areaCheckBox9"></div>
</div>
 <div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox10"  autocomplete="off" value="Free Copy Activated" data-state="callLogView.checkBox10">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox10" style="width: 100%" data-lang="callLogView.checkBox10">Copie gratuite activée</label>
</div>
<div class="input-group mb-2">
  <span class="input-group-text" data-lang="callLogView.checkBox11">Escaladé vers CCE</span>
  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Nom du Template" data-plh="callLogView.checkBox11" data-state="callLogView.checkBox11">
</div>
<div class="input-group mb-2">
  <span class="input-group-text" data-lang="callLogView.checkBox12">Code promotionnel activé</span>
  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Ajouter code" data-plh="callLogView.checkBox12" data-state="callLogView.checkBox12">
</div>
 <div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox13"  autocomplete="off" value="Password reset link sent" data-state="callLogView.checkBox13">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox13" style="width: 100%" data-lang="callLogView.checkBox13">Lien de reset du mot de passe envoyé</label>
</div>

 <div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox14"  autocomplete="off" value="Consumer guided to reset password" data-state="callLogView.checkBox14">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox14" style="width: 100%" data-lang="callLogView.checkBox14">Consommateur guidé pour réinitialiser mot de passe</label>
</div>
<div class="input-group mb-2">
  <span class="input-group-text" data-lang="callLogView.checkBox15">Doublons combinées UN</span>
  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Ajouter UN's" data-plh="callLogView.checkBox15" data-state="callLogView.checkBox15">
</div>
<div class="input-group mb-2">
  <span class="input-group-text" data-lang="callLogView.checkBox16">Doublons pas combinées UN</span>
  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Ajouter UN's" data-plh="callLogView.checkBox16" data-state="callLogView.checkBox16">
</div>
<div>

<div class="input-group mb-2">
  <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-lang="callLogView.checkBox17">AUTH manuelle effectuée</button>
  <ul class="dropdown-menu" id="dropdownAUTH">
    <li><a class="dropdown-item" data-lang="callLogView.checkBox17.options.sub1" data-value="REVOLVING - S. CARTES DESJARDINS">RENOUVELABLE - S. CARTES DESJARDINS</a></li>
    <li><a class="dropdown-item" data-lang="callLogView.checkBox17.options.sub2" data-value="REVOLVING - ">RENOUVELABLE -</a></li>
    <li><a class="dropdown-item" data-lang="callLogView.checkBox17.options.sub3" data-value="INSTALLMENT - ">À TEMPÉRAMENT -</a></li>
    <li><a class="dropdown-item" data-lang="callLogView.checkBox17.options.sub4" data-value="MORTGAGE - ">HYPOTHÈQUE - </a></li>
    <li><a class="dropdown-item" data-lang="callLogView.checkBox17.options.sub5" data-value="LINE OF CREDIT - ">MARGE DE CRÉDIT - </a></li>
    <li><a class="dropdown-item" data-lang="callLogView.checkBox17.options.sub6" data-value="OPEN - ">OUVERT - </a></li>
  </ul>
  <input type="text" id="dropdownInput" class="form-control" aria-label="Text input with dropdown button" data-state="callLogView.checkBox17">
</div>
<div>
 <div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox18"  autocomplete="off" value="Personal Information Updated on (EWP or SF)" data-state="callLogView.checkBox18">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18" style="width: 100%" data-lang="callLogView.checkBox18">Informations personnelles mises à jour (EWP ou SF)</label>
</div>
<div id="areaCheckBox18"></div>
</div>
<div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox19"  autocomplete="off" value="Consumer will send docs to update email" data-state="callLogView.checkBox19">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox19" style="width: 100%" data-lang="callLogView.checkBox19">Le consommateur enverra documents pour mis à jour email</label>
</div>
<div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox20"  autocomplete="off" value="Dropped call" data-state="callLogView.checkBox20">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox20" style="width: 100%" data-lang="callLogView.checkBox20">Coupure d'appel</label>
</div>
<div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox21"  autocomplete="off" value="Case was escalated to Tier 3" data-state="callLogView.checkBox21">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox21" style="width: 100%" data-lang="callLogView.checkBox21">Le dossier a été transmis au niveau 3</label>
</div>
<div>
<div class="input-group mb-2">
  <span class="input-group-text" data-lang="callLogView.checkBox22">Formulaire BCL EWP envoyé</span>
  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Ticket" data-state="callLogView.checkBox22">
</div>
<div id="areaCheckBox22"></div>
</div>
<div>
<div class="input-group mb-2">
  <span class="input-group-text" data-lang="callLogView.checkBox23">Formulaire EWP envoyé :</span>
  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Ticket" data-state="callLogView.checkBox23">
</div>
<div id="areaCheckBox23"></div>
</div>
<hr class="border border-primary border-2 opacity-75 mt-5" style="border-color: #004d66 !important;">
<div id="callLogText"></div>
<hr class="border border-primary border-2 opacity-75 mb-5" style="border-color: #004d66 !important;">
<div class="d-grid">
<button type="submit" class="btn btn-primary btn-lg" data-lang="callLogView.submit">Copier Call Log</button>
</div>
</form>`;
    return template;
  }

  checkBox9PendingTemplates() {
    let template = `
<div class="container">
<div class="row">
 <div class="col-auto d-flex justify-content-center align-items-center">
${iconView.arrowReturn()}
  </div>
    <div class="col">
     <div class="input-group mb-2">
<input type="checkbox" data-state="callLogView.checkBox9.templates.sub1" class="btn-check" id="checkBox9Sub1"  autocomplete="off" value="Different UN, previous UN... new UN...">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox9Sub1" style="width: 100%" data-lang="callLogView.checkBox9.templates.sub1">UN différent, UN précédent... UN nouveau...</label>
</div>
    </div>
 </div>
</div>
    `;
    return template;
  }

  checkBox18PendingTemplates() {
    let template = `
<div class="container">
<div class="row">
 <div class="col-auto d-flex justify-content-center align-items-center">
${iconView.arrowReturn()}
    </div>
    <div class="col">
     <div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox18Sub1"  autocomplete="off" value="Name" data-state="callLogView.checkBox18.templates.sub1">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub1" style="width: 100%" data-lang="callLogView.checkBox18.templates.sub1">Nom</label>
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
<input type="checkbox" class="btn-check" id="checkBox18Sub2"  autocomplete="off" value="Switch Name with AKA" data-state="callLogView.checkBox18.templates.sub2">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub2" style="width: 100%" data-lang="callLogView.checkBox18.templates.sub2">Switch le nom par un AKA</label>
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
<input type="checkbox" class="btn-check" id="checkBox18Sub3"  autocomplete="off" value="Address" data-state="callLogView.checkBox18.templates.sub3">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub3" style="width: 100%" data-lang="callLogView.checkBox18.templates.sub3">Adresse</label>
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
<input type="checkbox" class="btn-check" id="checkBox18Sub4"  autocomplete="off" value="DOB" data-state="callLogView.checkBox18.templates.sub4">
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
<input type="checkbox" class="btn-check" id="checkBox18Sub5"  autocomplete="off" value="Phone Number : Added" data-state="callLogView.checkBox18.templates.sub5">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub5" style="width: 100%" data-lang="callLogView.checkBox18.templates.sub5">Numéro de téléphone : ajouté</label>
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
<input type="checkbox" class="btn-check" id="checkBox18Sub6"  autocomplete="off" value="Phone Number : Removed" data-state="callLogView.checkBox18.templates.sub6">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub6" style="width: 100%" data-lang="callLogView.checkBox18.templates.sub6">Numéro de téléphone : Supprimé</label>
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
<input type="checkbox" class="btn-check" id="checkBox18Sub7"  autocomplete="off" value="SIN" data-state="callLogView.checkBox18.templates.sub7">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub7" style="width: 100%" data-lang="callLogView.checkBox18.templates.sub7">NAS</label>
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
<input type="checkbox" class="btn-check" id="checkBox18Sub8"  autocomplete="off" value="Email" data-state="callLogView.checkBox18.templates.sub8">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub8" style="width: 100%" data-lang="callLogView.checkBox18.templates.sub8">Courriel</label>
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
<input type="checkbox" class="btn-check" id="checkBox18Sub9"  autocomplete="off" value="Employment" data-state="callLogView.checkBox18.templates.sub9">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub9" style="width: 100%" data-lang="callLogView.checkBox18.templates.sub9">Emploi</label>
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
<input type="checkbox" class="btn-check" id="checkBox18Sub10"  autocomplete="off" value="Switch ES and EF" data-state="callLogView.checkBox18.templates.sub10">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox18Sub10" style="width: 100%" data-lang="callLogView.checkBox18.templates.sub10">Switch ES et EF</label>
</div>
    </div>
 </div>
</div>
    `;
    return template;
  }

  checkBox22PendingTemplates() {
    let template = `
    
<div class="container">
<div class="row">
 <div class="col-auto d-flex justify-content-center align-items-center">
${iconView.arrowReturn()}
    </div>
    <div class="col">
     <div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox22Sub1"  autocomplete="off" value="Update Address" data-state="callLogView.checkBox22.templates.sub1">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub1" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub1">Mis à jour de l'adresse</label>
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
<input type="checkbox" class="btn-check" id="checkBox22Sub2"  autocomplete="off" value="Remove Fraudulent Adddress" data-state="callLogView.checkBox22.templates.sub2">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub2" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub2">Supprimer l'adresse frauduleuse</label>
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
<input type="checkbox" class="btn-check" id="checkBox22Sub3"  autocomplete="off" value="Remove old Adddress" data-state="callLogView.checkBox22.templates.sub3">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub3" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub3">Supprimer l'ancienne adresse</label>
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
<input type="checkbox" class="btn-check" id="checkBox22Sub4"  autocomplete="off" value="Update Name" data-state="callLogView.checkBox22.templates.sub4">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub4" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub4">Mis à jour du nom</label>
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
<input type="checkbox" class="btn-check" id="checkBox22Sub5"  autocomplete="off" value="Remove Fraudulent Name" data-state="callLogView.checkBox22.templates.sub5">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub5" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub5">Supprimer le nom frauduleux</label>
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
<input type="checkbox" class="btn-check" id="checkBox22Sub6"  autocomplete="off" value="Update date of birth" data-state="callLogView.checkBox22.templates.sub6">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub6" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub6">Mis à jour de la DOB</label>
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
<input type="checkbox" class="btn-check" id="checkBox22Sub7"  autocomplete="off" value="Remove fraudulent DOB" data-state="callLogView.checkBox22.templates.sub7">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub7" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub7">Supprimer DOB frauduleuse</label>
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
<input type="checkbox" class="btn-check" id="checkBox22Sub8"  autocomplete="off" value="Update SIN" data-state="callLogView.checkBox22.templates.sub8">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub8" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub8">Mis à jour du NAS</label>
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
<input type="checkbox" class="btn-check" id="checkBox22Sub9"  autocomplete="off" value="Update Phone Number" data-state="callLogView.checkBox22.templates.sub9">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub9" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub9">Mis à jour du numéro de téléphone</label>
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
<input type="checkbox" class="btn-check" id="checkBox22Sub10"  autocomplete="off" value="Update Phone Number" data-state="callLogView.checkBox22.templates.sub10">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub10" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub10">Supprimer l'ancien numéro de téléphone</label>
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
<input type="checkbox" class="btn-check" id="checkBox22Sub11"  autocomplete="off" value="Update phone number on security alert" data-state="callLogView.checkBox22.templates.sub11">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub11" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub11">Mis à jour du téléphone dans l'alerte de sécurité</label>
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
<input type="checkbox" class="btn-check" id="checkBox22Sub12"  autocomplete="off" value="Update ES" data-state="callLogView.checkBox22.templates.sub12">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub12" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub12">Mise à jour ES</label>
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
<input type="checkbox" class="btn-check" id="checkBox22Sub13"  autocomplete="off" value="Remove Fraudulent ES" data-state="callLogView.checkBox22.templates.sub13">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub13" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub13">Supprimer le ES frauduleux</label>
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
<input type="checkbox" class="btn-check" id="checkBox22Sub14"  autocomplete="off" value="Salesforce Mirror" data-state="callLogView.checkBox22.templates.sub14">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub14" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub14">Salesforce Mirroir</label>
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
<input type="checkbox" class="btn-check" id="checkBox22Sub15"  autocomplete="off" value="Change lost Id to Fraud alert" data-state="callLogView.checkBox22.templates.sub15">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub15" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub15">Remplacer Alerte Lost-ID par Fraude</label>
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
  <span class="input-group-text" data-lang="callLogView.checkBox22.templates.sub16">Fusionner des dossiers</span>
  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Ajouter UN's" data-plh="callLogView.checkBox22.templates.sub16" data-state="callLogView.checkBox22.templates.sub16">
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
<input type="checkbox" class="btn-check" id="checkBox22Sub17"  autocomplete="off" value="Add Consumer statement" data-state="callLogView.checkBox22.templates.sub17">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub17" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub17">Ajouter une déclaration du consommateur</label>
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
<input type="checkbox" class="btn-check" id="checkBox22Sub18"  autocomplete="off" value="Change Email" data-state="callLogView.checkBox22.templates.sub18">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub18" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub18">Modifier l'adresse e-mail</label>
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
<input type="checkbox" class="btn-check" id="checkBox22Sub19"  autocomplete="off" value="Send Email for Password change" data-state="callLogView.checkBox22.templates.sub19">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub19" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub19">Courriel pour modifier le mot de passe</label>
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
<input type="checkbox" class="btn-check" id="checkBox22Sub20"  autocomplete="off" value="Add Credit Lock" data-state="callLogView.checkBox22.templates.sub20">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox22Sub20" style="width: 100%" data-lang="callLogView.checkBox22.templates.sub20">Activer le verrouillage de crédit</label>
</div>
    </div>
 </div>
</div>

    `;
    return template;
  }

  checkBox23PendingTemplates() {
    let template = `
<div class="container">
<div class="row">
 <div class="col-auto d-flex justify-content-center align-items-center">
${iconView.arrowReturn()}
    </div>
    <div class="col">
     <div class="input-group mb-2">
<input type="checkbox" class="btn-check" id="checkBox23Sub1"  autocomplete="off" value="Add Minor Alert" data-state="callLogView.checkBox23.templates.sub1">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox23Sub1" style="width: 100%" data-lang="callLogView.checkBox23.templates.sub1">Ajouter alerte de mineure</label>
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
<input type="checkbox" class="btn-check" id="checkBox23Sub2"  autocomplete="off" value="Add Minor SIN protection" data-state="callLogView.checkBox23.templates.sub2">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox23Sub2" style="width: 100%" data-lang="callLogView.checkBox23.templates.sub2">Ajouter protection NAS mineurs</label>
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
<input type="checkbox" class="btn-check" id="checkBox23Sub3"  autocomplete="off" value="Remove Credit Lock" data-state="callLogView.checkBox23.templates.sub3">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox23Sub3" style="width: 100%" data-lang="callLogView.checkBox23.templates.sub3">Supprimer le verrouillage de crédit</label>
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
<input type="checkbox" class="btn-check" id="checkBox23Sub4"  autocomplete="off" value="Remove Security Notice" data-state="callLogView.checkBox23.templates.sub4">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox23Sub4" style="width: 100%" data-lang="callLogView.checkBox23.templates.sub4">Supprimer Security Notice</label>
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
<input type="checkbox" class="btn-check" id="checkBox23Sub5"  autocomplete="off" value="Update an account (trade/public record)" data-state="callLogView.checkBox23.templates.sub5">
<label class="btn btn-outline-secondary text-center rounded" for="checkBox23Sub5" style="width: 100%" data-lang="callLogView.checkBox23.templates.sub5">Mis à jour du compte (operation commercial/public)</label>
</div>
    </div>
 </div>
</div>
    `;
    return template;
  }
}

export default new CallLogView();
