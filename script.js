/* ============================================================
   Chart catalogue
   To add a new chart later: add one entry below (folder path is
   relative to this file) and it will appear in the grid automatically.
   ============================================================ */
// thumbContentHeight: the chart's real rendered height (px) at
// THUMB_LOGICAL_WIDTH — measure it once (load the chart alone, shrink the
// window until it just scrolls, read window.innerHeight) so the crop below
// never reveals blank canvas past the real content. Omit it on a new entry
// to fall back to DEFAULT_THUMB_CONTENT_HEIGHT (a reasonable guess).
// thumbZoom: how far to zoom in past a plain edge-to-edge fit (1 = none).
// thumbFocusY: 0-1, which part of the chart to center vertically in the
// square (0 = very top, 0.5 = middle, 1 = very bottom). Both optional.
const CHARTS = [
  {
    title: "Choke the engine",
    category: "Automotive · Bar chart",
    path: "./Interactive/CAFE Emission Chart/chart.html",
    thumbContentHeight: 1050,
    thumbZoom: 1.25,
    thumbFocusY: 0.6,
  },
  {
    title: "Control room",
    category: "Media · Sankey diagram",
    path: "./Interactive/Control room_sankey/index.html",
    thumbContentHeight: 876,
    thumbZoom: 1.2,
    thumbFocusY: 0.55,
  },
  {
    title: "Post-booking bill",
    category: "Aviation · Bar chart",
    path: "./Interactive/Indigo chart/chart.html",
    thumbContentHeight: 878,
    thumbZoom: 1.25,
    thumbFocusY: 0.58,
  },
  {
    title: "Bolly bling",
    category: "Entertainment · Interactive grid",
    path: "./Interactive/Jio Studios/index.html",
    thumbContentHeight: 875,
    thumbZoom: 1.3,
    thumbFocusY: 0.56,
  },
  {
    title: "Breaks Undersea",
    category: "Infrastructure · Annotated map",
    path: "./Interactive/Undersea/undersea.html",
    thumbContentHeight: 902,
    thumbZoom: 1.1,
    thumbFocusY: 0.5,
  },
  {
    title: "Choosing right",
    category: "Personal finance · Interactive infographic",
    path: "./Interactive/wealth/index.html",
    thumbContentHeight: 626,
    thumbZoom: 1.15,
    thumbFocusY: 0.5,
  },
  {
    title: "Smuggling routes",
    category: "Drones · Interactive map",
    path: "./Interactive/DJI/index.html",
    thumbContentHeight: 1196,
    thumbZoom: 1.1,
    thumbFocusY: 0.5,
  },
  {
    title: "State of affairs",
    category: "Startups · Funding timeline",
    path: "./Interactive/Udaan/index.html",
    thumbContentHeight: 639,
    thumbZoom: 1.1,
    thumbFocusY: 0.5,
  },
];

/* ============================================================
   Static image collages
   To add an image later: drop it in the folder and add its file
   name to the matching list below.
   ============================================================ */
const STATIC_CHARTS = {
  folder: "charts",
  files: [

    "protein (1).gif",
    "Bharti Enterprises 2.jpg",
    "DELHI POLICE1.jpg",
    
    "Avendus.jpg",
    "PVR.jpg",
    "tesla.jpg",
    "EPFO copy.jpg",
    "burger king.jpg",
    "IVF.jpg",
    "GCCs.jpg",
    "IPOs in US.jpg",
    
    "airIndiaSingapore2.jpg",
    "drone.jpg",
    "lenskart1.jpg",
    "L&S-7thJuly_NEWFONT.jpg",
    ,
  ],
};

const ILLUSTRATIONS = {
  folder: "illustrations",
  files: [
    "APPS STORY.jpg",
    "Alc-bev.gif",
    "Arya.arg.JPG",
    "Bain_Gold 2.jpg",
    "Bms.jpg",
    "Cancer_Drug_Pricing.jpg",
    "Flipkart.jpg",
    "Founders share.gif",
    "Innovation_Centres.jpg",
    "Jlp.jpg",
    "K12.jpg",
    "LG (2).gif",
    "Lendingkart 2.jpg",
    "Matcha 2.jpg",
    "Microfinance.jpg",
    "Open-weight_Models.jpg",
    "Razorpay 2.jpg",
    "Sri_Fund_.jpg",
    "Toothsi.jpg",
    "Wealth_Management 2.jpg",
    "Zero_Sugar.gif",
  ],
};

const DEFAULT_THUMB_ZOOM = 1.2;
const DEFAULT_THUMB_FOCUS_Y = 0.5;
const DEFAULT_THUMB_CONTENT_HEIGHT = 900;

// Logical width (px) each chart is rendered at before being scaled +
// cropped down to fit the square card.
const THUMB_LOGICAL_WIDTH = 1400;

const grid = document.getElementById("chartGrid");
const modalOverlay = document.getElementById("modalOverlay");
const modalPanel = modalOverlay.querySelector(".modal-panel");
const modalIframe = document.getElementById("modalIframe");
const modalImage = document.getElementById("modalImage");
const modalHeader = modalPanel.querySelector(".modal-header");
const modalFrameWrap = modalPanel.querySelector(".modal-frame-wrap");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalClose = document.getElementById("modalClose");

let lastFocusedEl = null;
let modalChart = null; // the interactive chart currently open, if any

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function buildCard(chart) {
  const card = document.createElement("article");
  card.className = "chart-card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Open ${chart.title} chart`);

  const thumb = document.createElement("div");
  thumb.className = "chart-thumb";

  const contentHeight = chart.thumbContentHeight ?? DEFAULT_THUMB_CONTENT_HEIGHT;

  const frame = document.createElement("div");
  frame.className = "thumb-frame";
  frame.style.width = `${THUMB_LOGICAL_WIDTH}px`;
  frame.style.height = `${contentHeight}px`;

  const iframe = document.createElement("iframe");
  iframe.src = encodeURI(chart.path);
  iframe.title = `${chart.title} preview`;
  iframe.loading = "lazy";
  iframe.tabIndex = -1;
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.width = `${THUMB_LOGICAL_WIDTH}px`;
  iframe.style.height = `${contentHeight}px`;

  frame.appendChild(iframe);
  thumb.appendChild(frame);

  const overlay = document.createElement("div");
  overlay.className = "chart-overlay";
  overlay.innerHTML = `
    <p class="chart-category">${chart.category}</p>
    <p class="chart-title">${chart.title}</p>
    <p class="chart-view-hint">Click to explore →</p>
  `;

  card.appendChild(thumb);
  card.appendChild(overlay);
  grid.appendChild(card);

  const zoom = chart.thumbZoom ?? DEFAULT_THUMB_ZOOM;
  const focusY = chart.thumbFocusY ?? DEFAULT_THUMB_FOCUS_Y;

  // Scale + crop the fixed-size thumbnail iframe so the chart sits centred
  // and zoomed in, filling the square card edge-to-edge. The crop window is
  // capped at min(width, contentHeight) so it can never extend past the
  // chart's real content and reveal blank canvas.
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const cardSize = entry.contentRect.width;
      const visible = Math.min(THUMB_LOGICAL_WIDTH, contentHeight) / zoom;
      const scale = cardSize / visible;

      const originX = clamp(0.5 * THUMB_LOGICAL_WIDTH - visible / 2, 0, THUMB_LOGICAL_WIDTH - visible);
      const originY = clamp(focusY * contentHeight - visible / 2, 0, contentHeight - visible);

      frame.style.transform = `translate(${-originX * scale}px, ${-originY * scale}px) scale(${scale})`;
    }
  });
  resizeObserver.observe(thumb);

  const open = () => openModal(chart);
  card.addEventListener("click", open);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  });
}

// "Avendus.jpg" -> "Avendus", "Bain_Gold 2.jpg" -> "Bain Gold 2"
function labelFromFile(file) {
  return file.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim();
}

function buildCollage(containerId, { folder, files }) {
  const container = document.getElementById(containerId);
  files.forEach((file) => {
    const src = encodeURI(`${folder}/${file}`);
    const label = labelFromFile(file);

    const item = document.createElement("button");
    item.type = "button";
    item.className = "collage-item";
    item.setAttribute("aria-label", `View ${label} full size`);

    const img = document.createElement("img");
    img.src = src;
    img.alt = label;
    img.loading = "lazy";
    img.decoding = "async";

    item.appendChild(img);
    item.addEventListener("click", () => openImageModal(src, label));
    container.appendChild(item);
  });
}

function showModal() {
  modalOverlay.classList.add("is-open");
  modalOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

// Render the chart at THUMB_LOGICAL_WIDTH x its real content height (the
// same size the thumbnails use), then scale it down so the whole chart fits
// inside the viewport with no scrolling.
function fitModalChart() {
  if (!modalChart) return;
  const contentHeight = modalChart.thumbContentHeight ?? DEFAULT_THUMB_CONTENT_HEIGHT;
  const pad = parseFloat(getComputedStyle(modalOverlay).paddingLeft) || 0;
  const availW = window.innerWidth - pad * 2;

  modalIframe.style.width = `${THUMB_LOGICAL_WIDTH}px`;
  modalIframe.style.height = `${contentHeight}px`;

  // Two passes: the header's height depends on the panel width (its text
  // can wrap), and the panel width depends on the scale.
  let scale = 1;
  for (let i = 0; i < 2; i++) {
    const availH = window.innerHeight - pad * 2 - modalHeader.offsetHeight;
    scale = Math.min(availW / THUMB_LOGICAL_WIDTH, availH / contentHeight, 1);
    modalFrameWrap.style.width = `${THUMB_LOGICAL_WIDTH * scale}px`;
    modalFrameWrap.style.height = `${contentHeight * scale}px`;
  }
  modalIframe.style.transform = `scale(${scale})`;
}

function resetModalChartSize() {
  modalChart = null;
  modalPanel.classList.remove("is-chart");
  modalFrameWrap.style.width = modalFrameWrap.style.height = "";
  modalIframe.style.width = modalIframe.style.height = modalIframe.style.transform = "";
}

window.addEventListener("resize", fitModalChart);

function openImageModal(src, label) {
  lastFocusedEl = document.activeElement;
  resetModalChartSize();
  modalPanel.classList.add("is-image");
  modalImage.src = src;
  modalImage.alt = label;
  modalImage.hidden = false;
  showModal();
}

function openModal(chart) {
  lastFocusedEl = document.activeElement;
  modalPanel.classList.remove("is-image");
  modalPanel.classList.add("is-chart");
  modalImage.hidden = true;
  modalTitle.textContent = chart.title;
  modalMeta.textContent = chart.category;
  modalIframe.src = encodeURI(chart.path);
  modalChart = chart;
  fitModalChart();
  showModal();
}

function closeModal() {
  modalOverlay.classList.remove("is-open");
  modalOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  modalIframe.src = ""; // stop chart scripts/animations from running in the background
  modalImage.removeAttribute("src");
  if (lastFocusedEl) lastFocusedEl.focus();
}

modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("is-open")) {
    closeModal();
  }
});

// "Back" button: prefer real browser history, fall back to the href
// (point that href at your main portfolio homepage).
document.getElementById("backBtn").addEventListener("click", (e) => {
  if (window.history.length > 1 && document.referrer) {
    e.preventDefault();
    window.history.back();
  }
});

/* ============================================================
   Tabs: Charts / Interactive / Illustrations
   The active tab is mirrored in the URL hash (#charts etc.) so a
   link can open straight to one section.
   ============================================================ */
const tabs = Array.from(document.querySelectorAll(".tab-btn"));

function selectTab(tab, { focus = false, updateHash = true } = {}) {
  tabs.forEach((t) => {
    const active = t === tab;
    t.classList.toggle("is-active", active);
    t.setAttribute("aria-selected", String(active));
    t.tabIndex = active ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !active;
  });
  if (focus) tab.focus();
  if (updateHash) history.replaceState(null, "", `#${tab.id.replace("tab-", "")}`);
}

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (e) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    selectTab(tabs[(i + step + tabs.length) % tabs.length], { focus: true });
  });
});

const initialTab = document.getElementById(`tab-${location.hash.slice(1)}`);
if (initialTab && tabs.includes(initialTab)) selectTab(initialTab, { updateHash: false });

buildCollage("chartsCollage", STATIC_CHARTS);
buildCollage("illustrationsCollage", ILLUSTRATIONS);
CHARTS.forEach(buildCard);
