const chart = document.querySelector("#chart").getContext("2d");

new Chart(chart, {
  type: "line",
  data: {
    labels: [
      "Jan",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
    ],
    datasets: [
      {
        label: "BTC",
        data: [
          29374, 33537, 49631, 59095, 57828, 36684, 33572, 39974, 48847, 48116,
          61004,
        ],
        borderColor: "red",
        borderWidth: 2,
      },
      {
        label: "ETh",
        data: [
          31500, 41000, 88800, 26000, 46000, 32698, 5000, 3000, 18656, 24832,
          36844,
        ],
        borderColor: "blue",
        borderWidth: 2,
      },
    ],
  },
  option: {
    responsive: true,
  },
});

const menuBtn = document.querySelector("#menuBtn");
const closeBtn = document.querySelector("#closeBtn");
const sideBar = document.querySelector("aside");

menuBtn.addEventListener("click", () => {
  sideBar.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sideBar.style.display = "none";
});

const themeBtn = document.querySelector(".themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  const light = themeBtn.querySelector(".light");
  const dark = themeBtn.querySelector(".dark");

  if (light.classList.contains("active")) {
    light.classList.remove("active");
    dark.classList.add("active");
  } else {
    light.classList.add("active");
    dark.classList.remove("active");
  }
});

function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function fetchData() {
  try {
    const response = await fetch(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    document.querySelector("#btc").textContent =
      "$" +
      formatWithCommas(
        Math.round(parseFloat(data.bpi.USD.rate.replace(/,/g, "")))
      );
    document.querySelector("#gbp").textContent =
      "$" +
      formatWithCommas(
        Math.round(parseFloat(data.bpi.GBP.rate.replace(/,/g, "")))
      );
    document.querySelector("#eur").textContent =
      "$" +
      formatWithCommas(
        Math.round(parseFloat(data.bpi.EUR.rate.replace(/,/g, "")))
      );
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

fetchData();

const profilePic = document.querySelector(".profilePhoto");
const previewArea = document.getElementById("previewArea");

console.log(profilePic, previewArea);

profilePic.addEventListener("click", function () {
  previewArea.classList.remove("hidden");
});

document.querySelector(".closeDp").addEventListener("click", function () {
  previewArea.classList.add("hidden");
});

const today = new Date();
const formattedDate = today.toISOString().split("T")[0];
document.getElementById("date").value = formattedDate;