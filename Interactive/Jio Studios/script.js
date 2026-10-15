/* ============================================================
   BOLLY BLING — Movie Poster Chart
   Data & Rendering Logic
   ============================================================ */

"use strict";

/* ─── DATA ────────────────────────────────────────────────── */

const CHART_DATA = [
  {
    year: "2026",
    label: "2026",
    sublabel: "(Jan–Mar)",
    colorClass: "y2026",
    movies: [
      {
        name: "Dhurandhar: The Revenge",
        gross: "1,273",
        studios: ["Jio Studios", "B62 Studios"],
        poster: "Posters/Dhurandhar The Revenge.jpg"
      },
      {
        name: "Border 2",
        gross: "379",
        studios: ["T-Series Films", "J.P. Films"],
        poster: "Posters/Border 2.jpg"
      },
      {
        name: "O Romeo",
        gross: "78",
        studios: ["Nadiadwala Grandson Entertainment"],
        poster: "Posters/O Romeo.jpg"
      }
    ]
  },
  {
    year: "2025",
    label: "2025",
    sublabel: null,
    colorClass: "y2025",
    movies: [
      {
        name: "Dhurandhar",
        gross: "950",
        studios: ["Jio Studios", "B62 Studios"],
        poster: "Posters/Dhurandhar.jpg"
      },
      {
        name: "Chhaava",
        gross: "675",
        studios: ["Maddock Films"],
        poster: "Posters/Chhaava.jpg"
      },
      {
        name: "Saiyaara",
        gross: "396",
        studios: ["YRF"],
        poster: "Posters/Saiyaara.jpg"
      },
      {
        name: "Kantara: A Legend Chapter 1*",
        gross: "249",
        studios: ["Hombale Films"],
        poster: "Posters/Kantara A Legend Chapter 1_.jpg"
      },
      {
        name: "Mahavatar Narsimha",
        gross: "227",
        studios: ["Kleem Productions", "Hombale Films"],
        poster: "Posters/Mahavatar Narsimha.jpg"
      },
      {
        name: "War 2",
        gross: "213",
        studios: ["YRF"],
        poster: "Posters/War 2.jpg"
      },
      {
        name: "Sitaare Zameen Par",
        gross: "200",
        studios: ["Aamir Khan Productions"],
        poster: "Posters/Sitaare Zameen Par.jpg"
      },
      {
        name: "Housefull 5",
        gross: "200",
        studios: ["Nadiadwala Grandson Entertainment"],
        poster: "Posters/Housefull 5.jpg"
      },
      {
        name: "Raid 2",
        gross: "199",
        studios: ["T-Series Films", "Panorama Studios"],
        poster: "Posters/Raid 2.jpg"
      },
      {
        name: "Thamma",
        gross: "152",
        studios: ["Maddock Films"],
        poster: "Posters/Thamma.jpg"
      }
    ]
  },
  {
    year: "2024",
    label: "2024",
    sublabel: null,
    colorClass: "y2024",
    movies: [
      {
        name: "Pushpa 2: The Rule*",
        gross: "889",
        studios: ["Sukumar Writings"],
        poster: "Posters/Pushpa 2 The Rule_.jpg"
      },
      {
        name: "Stree 2",
        gross: "698",
        studios: ["Jio Studios", "Maddock Films"],
        poster: "Posters/Stree 2.jpg"
      },
      {
        name: "Kalki 2898 AD*",
        gross: "348",
        studios: ["Vyjayanthi Movies"],
        poster: "Posters/Kalki 2898 AD_.jpg"
      },
      {
        name: "Bhool Bhulaiyaa 3",
        gross: "311",
        studios: ["T-Series Films", "Cine1 Studios", "AA Films"],
        poster: "Posters/Bhool Bhulaiyaa 3.jpg"
      },
      {
        name: "Singham Again",
        gross: "297",
        studios: ["Jio Studios", "Reliance Entertainment", "Rohit Shetty Picturez"],
        poster: "Posters/Singham Again.jpg"
      },
      {
        name: "Fighter",
        gross: "243",
        studios: ["Marflix Pictures", "Viacom18 Studios"],
        poster: "Posters/Fighter.jpg"
      },
      {
        name: "Shaitaan",
        gross: "178",
        studios: ["Jio Studios", "Devgn Films", "Panorama Studios"],
        poster: "Posters/Shaitaan.jpg"
      },
      {
        name: "Munjya",
        gross: "122",
        studios: ["Maddock Films"],
        poster: "Posters/Munjya.jpg"
      },
      {
        name: "Teri Baaton Mein Aisa Uljha Jiya",
        gross: "99",
        studios: ["Maddock Films", "Jio Studios"],
        poster: "Posters/Teri Baaton Mein Aisa Uljha Jiya.jpg"
      },
      {
        name: "Crew",
        gross: "98",
        studios: ["Balaji Motion Pictures", "Anil Kapoor Films"],
        poster: "Posters/Crew.jpg"
      }
    ]
  },
  {
    year: "2023",
    label: "2023",
    sublabel: null,
    colorClass: "y2023",
    movies: [
      {
        name: "Jawan",
        gross: "673",
        studios: ["Red Chillies", "YRF"],
        poster: "Posters/Jawan.jpg"
      },
      {
        name: "Gadar 2",
        gross: "619",
        studios: ["Zee Studios"],
        poster: "Posters/Gadar 2.jpg"
      },
      {
        name: "Pathaan",
        gross: "617",
        studios: ["YRF"],
        poster: "Posters/Pathaan.jpg"
      },
      {
        name: "Animal",
        gross: "590",
        studios: ["T-Series Films", "Cine1 Studios"],
        poster: "Posters/Animal.jpg"
      },
      {
        name: "Tiger 3",
        gross: "313",
        studios: ["YRF"],
        poster: "Posters/Tiger 3.jpg"
      },
      {
        name: "The Kerala Story",
        gross: "265",
        studios: ["Sunshine Pictures"],
        poster: "Posters/The Kerala Story.jpg"
      },
      {
        name: "Dunki",
        gross: "252",
        studios: ["Jio Studios", "Red Chillies", "Rajkumar Hirani Films"],
        poster: "Posters/Dunki.jpg"
      },
      {
        name: "Salaar Part 1: Ceasefire*",
        gross: "190",
        studios: ["Hombale Films"],
        poster: "Posters/Salaar Part 1 Ceasefire_.jpg"
      },
      {
        name: "Rocky Aur Rani Kii Prem Kahaani",
        gross: "177",
        studios: ["Dharma", "Viacom18 Studios"],
        poster: "Posters/Rocky Aur Rani Kii Prem Kahaani.jpg"
      },
      {
        name: "OMG 2",
        gross: "175",
        studios: ["Viacom18 Studios"],
        poster: "Posters/OMG 2.jpg"
      }
    ]
  }
];

/* ─── RENDER ──────────────────────────────────────────────── */

function buildPosterCard(movie) {
  const card = document.createElement("div");
  card.className = "poster-card";
  card.setAttribute("role", "img");
  card.setAttribute("aria-label", `${movie.name} — ₹${movie.gross} cr`);

  /* poster image */
  const img = document.createElement("img");
  img.className = "poster-img";
  img.src = movie.poster;
  img.alt = movie.name;
  img.loading = "lazy";
  img.onerror = function () {
    this.style.display = "none";
    card.style.background = "#c8c2b8";
  };
  card.appendChild(img);

  /* overlay */
  const overlay = document.createElement("div");
  overlay.className = "poster-overlay";

  const title = document.createElement("div");
  title.className = "overlay-title";
  title.textContent = movie.name;
  overlay.appendChild(title);

  const row = document.createElement("div");
  row.className = "overlay-row";

  /* gross */
  const grossStat = document.createElement("div");
  grossStat.className = "overlay-stat";
  grossStat.innerHTML = `<span class="stat-label">Box office</span>
    <span class="overlay-gross-val">₹${movie.gross} cr</span>`;
  row.appendChild(grossStat);

  /* studios */
  const studioStat = document.createElement("div");
  studioStat.className = "overlay-stat";
  studioStat.innerHTML = `<span class="stat-label">Studio(s)</span>
    <span class="overlay-studios">${movie.studios.join(", ")}</span>`;
  row.appendChild(studioStat);

  overlay.appendChild(row);
  card.appendChild(overlay);

  return card;
}

function buildYearSection(yearData) {
  const section = document.createElement("div");
  section.className = "year-section";
  section.setAttribute("data-year", yearData.year);

  /* year header */
  const labelCol = document.createElement("div");
  labelCol.className = "year-label-col";

  const yearLabel = document.createElement("div");
  yearLabel.className = `year-label ${yearData.colorClass}`;
  yearLabel.textContent = yearData.label;
  labelCol.appendChild(yearLabel);

  if (yearData.sublabel) {
    const sub = document.createElement("div");
    sub.className = "year-sub";
    sub.textContent = yearData.sublabel;
    labelCol.appendChild(sub);
  }

  section.appendChild(labelCol);

  /* posters grid */
  const grid = document.createElement("div");
  grid.className = "posters-grid";

  yearData.movies.forEach(movie => {
    grid.appendChild(buildPosterCard(movie));
  });

  section.appendChild(grid);

  return section;
}

function renderChart() {
  const chartBody = document.getElementById("chart-body");
  if (!chartBody) return;

  CHART_DATA.forEach(yearData => {
    chartBody.appendChild(buildYearSection(yearData));
  });
}

/* ─── TOUCH / CLICK TOGGLE (mobile) ──────────────────────── */
function initTouchSupport() {
  const isTouchDevice = window.matchMedia("(hover: none)").matches;
  if (!isTouchDevice) return;

  document.addEventListener("click", (e) => {
    const card = e.target.closest(".poster-card");

    document.querySelectorAll(".poster-card.touched").forEach(c => {
      if (c !== card) c.classList.remove("touched");
    });

    if (card) {
      card.classList.toggle("touched");
      e.stopPropagation();
    }
  });
}

/* ─── INIT ────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  renderChart();
  initTouchSupport();
});
