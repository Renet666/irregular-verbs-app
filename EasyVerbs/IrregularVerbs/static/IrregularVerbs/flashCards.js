const btnStudy = document.querySelector('.button-study')
const flashCardBox = document.querySelector('#cards-container')

const cardWrapper = document.querySelector('#wrapper')

const nextBtn = document.getElementById("carousel-button-next");
const slides = document.getElementById("slides");
const firstSlide = document.querySelector(".slide");
firstSlide.dataset.active= 'true'
const lastSlide = document.querySelector("li:last-child");
const slidesNum = slides?.children.length;
const inputVerbs = document.querySelectorAll(".input-verb");
const pastInput = document.getElementById("past");
const participleInput = document.getElementById("participle");
const checkPast = document.getElementById("span-past");
const checkParticiple = document.getElementById("span-participle");
const scoresBox = document.getElementById("score-box");
const playAgainBtn = document.getElementById("play-again-btn");
const endBox = document.getElementById("end-box");
let scores = 0;


  window.addEventListener("load", () => {
    // localStorage.getItem("study-mode")
    //   ? (cardWrapper.style.display = "none")
    //   : (cardWrapper.style.display = "block");
  
    // firstSlide.dataset.active = "true";
    // flashCardBox.style.display = 'flex'
    updateScores();
  });

btnStudy.addEventListener("click", () => {
    cardWrapper.style.display = "none";
    flashCardBox.style.display = 'flex'
    localStorage.setItem("study-mode", true);
});
  nextBtn.addEventListener("click", () => {
    moveCard();
  });
function updateScores() {
    scoresBox.textContent = `${scores}/${slidesNum - 1}`;
  }

function moveCard(index = 1) {
    pastInput.focus();
    updateScores();
    const currentSlide = document.querySelector("[data-active]");
    const currentindex = [...slides.children].indexOf(currentSlide);
    const nextSlide = slides.children[currentindex + index];
    const delta = currentindex + index;
  
    slides.style.setProperty("--current-slide", delta);
  
    if (delta + 1 === slidesNum) {
      updateLastSlide();
      nextBtn.style.display = "none";
      setTimeout(() => {
        pastInput.style.display = participleInput.style.display = "none";
      }, 600);
      return;
    }
  
    nextSlide.dataset.active = true;
    delete currentSlide.dataset.active;
  }

    function checkInput(input) {
    const inputType = input.dataset.type;
    const inputValue = input.value.trim().toLowerCase();
    const spanCheck = input.nextElementSibling;
    const currentSlide = document.querySelector("[data-active]");
    const correctVerbs = currentSlide.dataset[inputType].split("/");
    const match = correctVerbs.some((verb) => {
      if (verb === inputValue) {
        spanCheck.style.opacity = 1;
        input.dataset[inputType] = true;
        moveCursor();
        if (
          pastInput.dataset.past &&
          participleInput.dataset.participle === "true"
        ) {
          setTimeout(() => {
            scores++;
            moveCard();
            cleanInputs();
          }, 300);
        }
      } else {
        spanCheck.style.opacity = 0;
        input.dataset[inputType] = false;
      }
      return verb.startsWith(inputValue);
    });
    match === true
      ? (input.style.color = "#568203")
      : (input.style.color = "red");
  }
  
  function moveCursor() {
    const nextInput1 = document.querySelector('[data-past="false"]');
    const nextInput2 = document.querySelector('[data-participle="false"]');
    nextInput1?.focus();
    nextInput2?.focus();
  }
    inputVerbs.forEach((input) => {
    input.addEventListener("keyup", (e) => {
      const input = e.target;
      checkInput(input);
    });
  });
  function cleanInputs(input, type) {
    inputVerbs.forEach((input) => {
      input.value = "";
      input.style.color = "auto";
      if (input.dataset.past) {
        input.dataset.past = "false";
      }
      if (input.dataset.participle) {
        input.dataset.participle = "false";
      }
      checkPast.style.opacity = 0;
      checkParticiple.style.opacity = 0;
    });
  }
  
  function updateLastSlide() {
    if (endBox.querySelector(".result-box") === null) {
      const resultBox = document.createElement("div");
      resultBox.classList.add("result-box");
      resultBox.textContent = `Your score is ${Math.round(
        (scores * 100) / (slidesNum - 1)
      )}%`;
      endBox.appendChild(resultBox);
    }
  }
  
  playAgainBtn.addEventListener("click", () => {
    firstSlide.dataset.active = "true";
    slides.style.display = "none";
    slides.style.setProperty("--current-slide", 0);
    scores = 0;
    updateScores()
    setTimeout(() => {
      slides.style.display = "flex";
      pastInput.style.display = participleInput.style.display = "inline";
      nextBtn.style.display = "inline";
    }, 600);
 
    pastInput.focus();
  });






// // btnStudy.addEventListener("click", () => {
// //     console.log("was clicked");
// //     cardWrapper.style.display = "none";
// //     flashCardBox.style.display = 'flex'
// //     // localStorage.setItem("study-mode", true);
// //   });
  
//   window.addEventListener("load", () => {
//     localStorage.getItem("study-mode")
//       ? (cardWrapper.style.display = "none")
//       : (cardWrapper.style.display = "block");
  
//     firstSlide.dataset.active = "true";
//     updateScores();
//   });
  

  
//   function updateScores() {
//     scoresBox.textContent = `${scores}/${slidesNum - 1}`;
//   }
  
//   function moveCard(index = 1) {
//     pastInput.focus();
//     updateScores();
//     const currentSlide = document.querySelector("[data-active]");
//     const currentindex = [...slides.children].indexOf(currentSlide);
//     const nextSlide = slides.children[currentindex + index];
//     const delta = currentindex + index;
  
//     slides.style.setProperty("--current-slide", delta);
  
//     if (delta + 1 === slidesNum) {
//       updateLastSlide();
//       nextBtn.style.display = "none";
//       setTimeout(() => {
//         pastInput.style.display = participleInput.style.display = "none";
//       }, 600);
//       return;
//     }
  
//     nextSlide.dataset.active = true;
//     delete currentSlide.dataset.active;
//   }
  
//   inputVerbs.forEach((input) => {
//     input.addEventListener("keyup", (e) => {
//       const input = e.target;
//       checkInput(input);
//     });
//   });
  
//   function checkInput(input) {
//     const inputType = input.dataset.type;
//     const inputValue = input.value.trim().toLowerCase();
//     const spanCheck = input.nextElementSibling;
//     const currentSlide = document.querySelector("[data-active]");
//     const correctVerbs = currentSlide.dataset[inputType].split("/");
//     const match = correctVerbs.some((verb) => {
//       if (verb === inputValue) {
//         spanCheck.style.opacity = 1;
//         input.dataset[inputType] = true;
//         moveCursor();
//         if (
//           pastInput.dataset.past &&
//           participleInput.dataset.participle === "true"
//         ) {
//           setTimeout(() => {
//             scores++;
//             moveCard();
//             cleanInputs();
//           }, 300);
//         }
//       } else {
//         spanCheck.style.opacity = 0;
//         input.dataset[inputType] = false;
//       }
//       return verb.startsWith(inputValue);
//     });
//     match === true
//       ? (input.style.color = "#568203")
//       : (input.style.color = "red");
//   }
  
//   function moveCursor() {
//     const nextInput1 = document.querySelector('[data-past="false"]');
//     const nextInput2 = document.querySelector('[data-participle="false"]');
//     nextInput1?.focus();
//     nextInput2?.focus();
//   }
  
//   function cleanInputs(input, type) {
//     inputVerbs.forEach((input) => {
//       input.value = "";
//       input.style.color = "auto";
//       if (input.dataset.past) {
//         input.dataset.past = "false";
//       }
//       if (input.dataset.participle) {
//         input.dataset.participle = "false";
//       }
//       checkPast.style.opacity = 0;
//       checkParticiple.style.opacity = 0;
//     });
//   }
  
//   function updateLastSlide() {
//     if (endBox.querySelector(".result-box") === null) {
//       const resultBox = document.createElement("div");
//       resultBox.classList.add("result-box");
//       resultBox.textContent = `Your score is ${Math.round(
//         (scores * 100) / (slidesNum - 1)
//       )}%`;
//       endBox.appendChild(resultBox);
//     }
//   }
  
//   playAgainBtn.addEventListener("click", () => {
//     firstSlide.dataset.active = "true";
//     slides.style.display = "none";
//     slides.style.setProperty("--current-slide", 0);
//     setTimeout(() => {
//       slides.style.display = "flex";
//       pastInput.style.display = participleInput.style.display = "inline";
//       nextBtn.style.display = "inline";
//     }, 600);
//     scores = 0;
//     pastInput.focus();
//   });
  