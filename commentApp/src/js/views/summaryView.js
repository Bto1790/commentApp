import View from "./view.js";

class SummaryView extends View {
  generateMarkup() {
    let template = `
    <form id="summaryContainer">
    <h5 class="mb-3">Salesforce</h5>
    <div class="text-center mb-2">
      ${this.createCopyGroup("BCL VERIFICATION REVIEW", "bclVerRev")}
    </div>
    <div class="text-center mb-4">
     ${this.createCopyGroup("MyEquifax CAN Fraud", "myEquCanFra")}
    </div>
     <h5 class="mb-3">BackOffice</h5>
    <div class="text-center mb-2">
      ${this.createCopyGroup("BCL BO VERIFICATION REVIEW", "bclBoVerRev")}
    </div>
    <div class="text-center mb-2">
     ${this.createCopyGroup("001AA12244", "freBoCod")}
    </div>
    <div class="text-center mb-4">
     ${this.createCopyGroup("001AA12253", "engBoCod")}
    </div>
     <h5 class="mb-3" data-lang="summaryView.title">Résumé</h5>
    <div class="input-group mb-2">
        <span class="input-group-text" id="fileUN">UN: </span>
        <input id="unSummary" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="fileUN" required>
      </div>
    <div class="input-group mb-2">
        <span class="input-group-text" id="callID">CALL ID: </span>
        <input type="text" id="callIDSummary" class="form-control" aria-label="Sizing example input" aria-describedby="callID" required>
      </div>
      <h6 class="mb-2 mt-5">--NOTES--</h6>
      ${this.extractNotePadText()}
      <button type="submit" class="btn btn-primary btn-lg  mt-5 text-center" data-lang="summaryView.submit" style="width:100%">Copier le résumé</button>
      </form>
    `;
    return template;
  }

  createCopyGroup(text, buttonID){
    let template = `<div class="input-group">
  <label class="input-group-text" for="inputGroupSelect01">${text}</label>
  <button type="button" id="${buttonID}" class="btn btn-primary copyPaste"><span><svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
</svg></span></button>
</div>`;
return template
  };

  addHandlerCopyPaste(handler){
    let buttons = document.querySelectorAll('button.copyPaste');
    buttons.forEach(el => el.addEventListener("click", handler))
  }

  extractNotePadText() {
    let notepad = document.getElementById("notePadTextArea");
    let template = notepad.value;
    return template;
  }

  summaryTemplate() {
    let template = `
**************************************************************
UN: ${document.getElementById("unSummary").value}
CALLID: ${document.getElementById("callIDSummary").value}
DATE: ${new Date().toLocaleDateString()}

--NOTES--

${this.extractNotePadText()}   
**************************************************************`;
    navigator.clipboard.writeText(template);
  }
}

export default new SummaryView();
