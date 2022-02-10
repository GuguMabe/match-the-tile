const jsdom = require("jsdom");
const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");
const { JSDOM } = jsdom;
const { document } = new JSDOM(index).window;
const DOMCustomMatchers = require("jasmine-dom-custom-matchers");
(global.document = document), DOMCustomMatchers;
const { showCard, setTo2x2, UI } = require("../src/script");

let angularIcon1 = document.querySelector(".angular-image1");
let gridButton = document.querySelector("#twoByTwo");

let event;

describe("index.html file", () => {
  beforeAll(function () {
    jasmine.addMatchers(DOMCustomMatchers);
    this.title = document.querySelector("title");
    this.heading = document.querySelector("h1");
  });
  it("should not be empty", function () {
    expect(this.title).not.toBeEmpty();
  });
  it("to have heading h1", function () {
    expect(this.heading).not.toBeEmpty();
  });
});

describe("showCard function works as intended", () => {
  beforeEach(() => {
    UI.angularCard1.addEventListener("click", showCard);
    event = document.createEvent("CustomEvent");
    event.initEvent("click", true, true);
    UI.angularCard1.dispatchEvent(event);
  });
  it("should have class name show in its classList  and show its image after the card is clicked", () => {
    expect(angularIcon1.classList[2]).toBe("show");
  });
});

describe("grid configuration", () => {
  gridButton.addEventListener("click", setTo2x2);
  event = document.createEvent("CustomEvent");
  event.initEvent("click", true, true);
  gridButton.dispatchEvent(event);

  it("should not have classname remove in the classList after the button is clicked", () => {
    expect(UI.angularCard1.classList[2]).toBe(undefined);
  });
});

describe("Timer feature", () => {
  gridButton.addEventListener("click", setTo2x2);
  event = document.createEvent("CustomEvent");
  event.initEvent("click", true, true);
  gridButton.dispatchEvent(event);

  it("timer increments",  async () => {
    function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve,ms))
    }
    await timeout(1000)
    expect(UI.timer.innerHTML).not.toBe(`0 minute/s and 0 second/s `)
})  
});

describe("count flips/moves feature", () => {
  event = document.createEvent("CustomEvent");
  event.initEvent("click", true, true);
  UI.angularCard1.dispatchEvent(event);

  it("the flips count should increment when a cards is clicked on", () => {
      expect(UI.moves.innerHTML).not.toBe('0 moves');
  });
});

