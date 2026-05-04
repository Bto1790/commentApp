import View from "./view.js";

class SideBarView extends View {
  #dashboard = false;
  #notePadState = "inactive";
  #language = "fr";

  getLanguage() {
    return this.#language;
  }
  setLanguage(newValue) {
    this.#language = newValue;
  }

  getNotePadState() {
    return this.#notePadState;
  }
  setNotePadState(newValue) {
    this.#notePadState = newValue;
  }

  #modifySideBarElements(sidebarWidth, navigationJustify) {
    let sidebar = document.getElementById("sidebar");
    let navLink = Array.from(sidebar.querySelectorAll(".nav-link"));
    sidebar.style.width = sidebarWidth;
    navLink.forEach((el) => {
      el.style.justifyContent = navigationJustify;
    });
  }

  modifySideBarSize() {
    let sidebar = document.getElementById("sidebar");
    let description = Array.from(sidebar.querySelectorAll(".description"));
    switch (this.#dashboard) {
      case true:
        this.#dashboard = false;
        this.#modifySideBarElements("200px", "flex-start");
        setTimeout(() => {
          description.forEach((el) => {
            el.style.display = "block";
          });
        }, 200);
        break;
      case false:
        this.#dashboard = true;
        this.#modifySideBarElements("60px", "center");
        description.forEach((el) => {
          el.style.display = "none";
        });
        break;
    }
  }

  modifyInnerHTML(element, template) {
    element.innerHTML = template;
  }

  modifyPlaceholder(element, placeholder) {
    element.placeholder = placeholder;
  }

  getAllElementsToTranslate() {
    let elements = document.querySelectorAll("[data-lang]");
    let placeholders = document.querySelectorAll("[data-plh]");

    return [elements, placeholders];
  }

  increaseHeightNotePad() {
    let activeBlock = document.getElementById("notesBottom");
    let bottomNote = document.getElementById("bottomNote");
    this.#notePadState = "active";
    activeBlock.style.display = "block";
    bottomNote.style.height = "400px";
  }
  reduceHeightNotePad() {
    let bottomNote = document.getElementById("bottomNote");
    this.#notePadState = "inactive";
    bottomNote.style.height = "0px";
  }

  addHandlerNotePadButtons(handler) {
    let buttons = document.querySelectorAll("#notes, #closeButton");
    buttons.forEach((el) => el.addEventListener("click", handler));
  }

  extractTicketInfo() {
    let input = document.getElementById("NoteTicketInputId");
    let type = document.getElementById("inputGroupSelect01");
    return [input, type];
  }

  modifyModalBodyTwo() {
    let text = document.getElementById("modalBodyTwo");
    let title = document.getElementById("staticBackdropLabelTwo");
    let close = document.getElementById("modalCloseButtonTwo");
    let erase = document.getElementById("modalEraseButtonTwo");
    return [text, title, close, erase];
  }

  modifyModalBodyTwoFR(obj) {
    obj[0].innerText =
      " Êtes-vous sûr de vouloir supprimer ce contenu ? Toutes les données seront perdues...";
    obj[1].innerText = "Supprimer tout le contenu";
    obj[2].innerText = "Fermer";
    obj[3].innerText = "Supprimer";
  }
  modifyModalBodyTwoEN(obj) {
    obj[0].innerText =
      "Are you shure you wish to delete content? All data will be lost...";
    obj[1].innerText = "Delete all content";
    obj[2].innerText = "Close";
    obj[3].innerText = "Delete";
  }

  openNewTab(url) {
    window.open(url, "_blank");
  }

  styleClickedButton(idButton){
    let menuButtons = document.querySelectorAll("#formButton, #nasAlertButton, #spButton, #callLogButton, #fraudButton, #notHisButton, #mixFileButton, #summaryButton");
    let selectedButton = document.getElementById(idButton);
    menuButtons.forEach((el) => el.classList.remove("sideBarClicked"));
    selectedButton.classList.add('sideBarClicked');
  }

  eraseContentLoading(){
    let area= document.getElementById("loadingSpiner");
    area.innerHTML = `<button class="btn btn-primary" type="button" disabled>
  <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
  <span role="status">Loading...</span>
</button>`
  }
}

export default new SideBarView();
