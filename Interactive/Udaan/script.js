// Pixel calibration measured directly from udaan.jpg (1400x920)
const IMG_W = 1400;
const IMG_H = 920;
const BASELINE_Y = 793.5; // pixel y of the value-0 axis line
const PX_PER_UNIT = 472 / 900; // vertical pixels per $1M, derived from the 0-900 gridline span

// Left/right pixel edges of each bar, measured from the image
const BAR_X_RANGES = [
  [149, 260], // 2016
  [277, 389], // 2018
  [406, 517], // 2019
  [535, 646], // 2021
  [664, 775], // 2022
  [792, 907], // 2023
  [924, 1036], // 2024
  [1053, 1164], // 2025
  [1182, 1293], // 2026
];

const FUNDING_DATA = [
  {
    year: '2016',
    segments: [
      { round: 'Series A', amount: 10, desc: 'Founded in Bengaluru' },
    ],
  },
  {
    year: '2018',
    segments: [
      { round: 'Series B', amount: 50, desc: 'Became a unicorn' },
      { round: 'Series C', amount: 225, desc: 'Became a unicorn' },
    ],
  },
  {
    year: '2019',
    segments: [
      { round: 'Venture round', amount: 300, desc: 'Pharma category and Udaancapital launched' },
      { round: 'Series D', amount: 585, desc: 'Pharma category and Udaancapital launched' },
    ],
  },
  {
    year: '2021',
    segments: [
      { round: 'Series D extension', amount: 280, desc: 'Vaibhav Gupta named CEO. IPO promised. Open marketplace model closed down' },
    ],
  },
  {
    year: '2022',
    segments: [
      { round: 'Debt financing', amount: 250, desc: 'Funding winter hits. First major layoffs' },
      { round: 'Venture round', amount: 120, desc: 'Funding winter hits. First major layoffs' },
      { round: 'Convertible notes raised', amount: 35, desc: 'Funding winter hits. First major layoffs' },
    ],
  },
  {
    year: '2023',
    segments: [
      { round: 'Series E down-round', amount: 340, desc: 'Revenue collapses 43% to Rs 5,609 crore. 120 employees laid off' },
    ],
  },
  {
    year: '2024',
    segments: [
      { round: 'Debt financing', amount: 35.6, desc: 'The equity market remains hostile' },
    ],
  },
  {
    year: '2025',
    segments: [
      { round: 'Series G', amount: 114, desc: 'Revenue falls 20% to Rs 4,561 crore. Shopkirana acquired' },
    ],
  },
  {
    year: '2026',
    segments: [
      { round: 'Corporate debt', amount: 160, desc: 'FMCG vertical scaled down, merged with "essentials"' },
      { round: 'Blackrock private credit', amount: 45, desc: 'Singapore insolvency proceedings filed, debt restructuring agreement' },
    ],
  },
];

function buildHoverLayer() {
  const layer = document.getElementById('hoverLayer');

  FUNDING_DATA.forEach((group, i) => {
    const [x0, x1] = BAR_X_RANGES[i];
    let cumulative = 0;

    group.segments.forEach((seg) => {
      const bottomY = BASELINE_Y - cumulative * PX_PER_UNIT;
      cumulative += seg.amount;
      const topY = BASELINE_Y - cumulative * PX_PER_UNIT;

      const el = document.createElement('div');
      el.className = 'segment';
      el.style.left = `${(x0 / IMG_W) * 100}%`;
      el.style.width = `${((x1 - x0) / IMG_W) * 100}%`;
      el.style.top = `${(topY / IMG_H) * 100}%`;
      el.style.height = `${((bottomY - topY) / IMG_H) * 100}%`;
      el.tabIndex = 0;
      el.setAttribute('role', 'button');
      el.setAttribute(
        'aria-label',
        `${group.year} ${seg.round}: $${seg.amount} million. ${seg.desc}`
      );
      el.dataset.year = group.year;
      el.dataset.round = seg.round;
      el.dataset.amount = seg.amount;
      el.dataset.desc = seg.desc;
      layer.appendChild(el);
    });
  });
}

function setupTooltip() {
  const tooltip = document.getElementById('tooltip');
  const ttRound = document.getElementById('ttRound');
  const ttAmount = document.getElementById('ttAmount');
  const ttDesc = document.getElementById('ttDesc');
  let activeSegment = null;

  function showTooltip(segment, x, y) {
    if (activeSegment) activeSegment.classList.remove('active');
    activeSegment = segment;
    segment.classList.add('active');

    ttRound.textContent = `${segment.dataset.year} — ${segment.dataset.round}`;
    ttAmount.textContent = `$${segment.dataset.amount} million`;
    ttDesc.textContent = segment.dataset.desc;

    tooltip.classList.add('visible');
    tooltip.setAttribute('aria-hidden', 'false');
    positionTooltip(x, y);
  }

  const MOBILE_BREAKPOINT = 430;

  function positionTooltip(x, y) {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      tooltip.style.left = '50%';
      tooltip.style.top = '50%';
      tooltip.style.transform = 'translate(-50%, -50%)';
      return;
    }

    const rect = tooltip.getBoundingClientRect();
    const margin = 12;
    let left = x;
    let top = y - rect.height - 16;

    left = Math.max(rect.width / 2 + margin, Math.min(left, window.innerWidth - rect.width / 2 - margin));
    if (top < margin) top = y + 20;

    tooltip.style.transform = 'translate(-50%, -8px)';
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  function hideTooltip() {
    if (activeSegment) activeSegment.classList.remove('active');
    activeSegment = null;
    tooltip.classList.remove('visible');
    tooltip.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.segment').forEach((segment) => {
    // Hover (enter/move/leave) is mouse-only — touch taps are handled entirely
    // by the click listener below, since touch synthesizes enter/leave around
    // the tap and would otherwise show then immediately hide the tooltip.
    segment.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return;
      showTooltip(segment, e.clientX, e.clientY);
    });
    segment.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'mouse') positionTooltip(e.clientX, e.clientY);
    });
    segment.addEventListener('pointerleave', (e) => {
      if (e.pointerType !== 'mouse') return;
      hideTooltip();
    });

    segment.addEventListener('focus', () => {
      // Skip when focus lands here as a side effect of a mouse/touch click —
      // that path is handled by the click listener below. Only keyboard
      // (tab) navigation should trigger the tooltip from focus directly.
      if (!segment.matches(':focus-visible')) return;
      const rect = segment.getBoundingClientRect();
      showTooltip(segment, rect.left + rect.width / 2, rect.top);
    });
    segment.addEventListener('blur', hideTooltip);

    segment.addEventListener('click', (e) => {
      if (activeSegment === segment) {
        hideTooltip();
      } else {
        showTooltip(segment, e.clientX, e.clientY);
      }
    });
  });

  document.addEventListener('scroll', hideTooltip, true);
  window.addEventListener('resize', hideTooltip);
}

buildHoverLayer();
setupTooltip();
