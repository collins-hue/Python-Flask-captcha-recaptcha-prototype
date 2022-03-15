// save user

const registerBtn = document.getElementById("submit-btn");
const $userId = document.getElementById("uid");
const $randImage = document.getElementById("rand-img");
const $userInput = document.getElementById("uinput");
const $submitBtn = document.getElementById("submit-btn");

registerBtn.addEventListener("click", (event) => {
  console.log('clicked');
  event.preventDefault();
  let userId = $userId.value;
  let imgPath = $randImage.src;
  let userInput = $userInput.value;

  if (userId && userInput) {
    //const details = {userId, imgPath, userInput}
    submitForm({userId, imgPath, userInput});
    $userId.value = "";
    $userInput.disabled = true;
    $randImage.src = `../static/input/${getRandomImg()}`;
  } else {
    alert("One of the fields is empty!");
  }
});

function submitForm({ userId, imgPath, userInput }) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, imgPath, userInput }),
  };
  console.log(options);

  fetch("/register", options)
    .then((data) => {
      if (!data.ok) {
        alert("Failed to save UserId or userInput exists ");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function getRandomImg() {
  const randomIndex = Math.floor(Math.random() * 43);
  const imgNames = [
    "1629831477.png",
    "1629831484.png",
    "1629831527.png",
    "1629831534.png",
    "1629831540.png",
    "1629831547.png",
    "1629831553.png",
    "1629831560.png",
    "1629831566.png",
    "1629831572.png",
    "1629831578.png",
    "1629831584.png",
    "1629831591.png",
    "1629831597.png",
    "1629831603.png",
    "1629831610.png",
    "1629831616.png",
    "1629831622.png",
    "1629831628.png",
    "1629831635.png",
    "1629831641.png",
    "1629831647.png",
    "1629831654.png",
    "1629831660.png",
    "1629831666.png",
    "1629831672.png",
    "1629831679.png",
    "1629831685.png",
    "1629831691.png",
    "1629831698.png",
    "1629831704.png",
    "1629831710.png",
    "1629831716.png",
    "1629831723.png",
    "1629831729.png",
    "1629831735.png",
    "1629831742.png",
    "1629831748.png",
    "1629831754.png",
    "1629831761.png",
    "1629831767.png",
    "1629831773.png",
    "1629831779.png",
    "1629831786.png",
    "1629831792.png",
  ];
  return imgNames[randomIndex];
}
