export default class View {
  #parentElement = document.getElementById("main_content");

  render() {
    this.clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", this.generateMarkup());
  }

  clear() {
    this.#parentElement.innerHTML = "";
  }
}
