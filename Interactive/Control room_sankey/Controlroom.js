google.charts.load("current", { packages: ["sankey"] });
google.charts.setOnLoadCallback(drawChart);

// ── Tooltip helper ──
function tip(from, to) {
  return `<div class="gc-tooltip">
    <div class="tt-flow">
      <span class="tt-from">${from}</span>
      <span class="tt-arrow">→</span>
      <span class="tt-to">${to}</span>
    </div>
  </div>`;
}
function tip2(companies) 
{
  return `<div class="gc-tooltip">
    <div class="tt-flow">
      <span class="tt-from">${companies}</span>
    </div>
  </div>`;
}

function drawChart() {
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'From');
  data.addColumn('string', 'To');
  data.addColumn('number', 'Weight');
  data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });

  data.addRows([
    // ── Step 0 → Step 1: Category to segment ──
    ['Content',       'Film & TV production',       6, tip('Content',       'Film & TV production')],
    ['Content',       'Music ownership',            6, tip('Content',       'Music ownership')],
    ['Distribution',  'Theatrical distribution',    5, tip('Distribution',  'Theatrical distribution')],
    ['Distribution',  'OTT platform or licensing',  1, tip('Distribution',  'OTT platform or licensing')],
    ['Distribution',  'TV channels',                1, tip('Distribution',  'TV channels')],
    ['Distribution',  'Music streaming',            1, tip('Distribution',  'Music streaming')],
    ['Distribution',  'News and digital media',     1, tip('Distribution',  'News and digital media')],
    ['Delivery pipe', 'Telecom network',            1, tip('Delivery pipe', 'Telecom network')],
    ['Delivery pipe', 'Devices',                    1, tip('Delivery pipe', 'Devices')],

    // ── Step 1 → Step 2: Film & TV production ──
    ['Film & TV production', 'Reliance',     1, tip2('Jio Studios, Viacom18 Studios, Network18')],
    ['Film & TV production', 'YRF',          1, tip2('YRF, YRF Entertainment')],
    ['Film & TV production', 'Dharma',       1, tip2('Dharma, Dharmatic Entertainment')],
    ['Film & TV production', 'Red Chillies', 1, tip2('Red Chillies')],
    ['Film & TV production', 'Excel',        1, tip2('Excel')],
    ['Film & TV production', 'T-Series',     1, tip2('T-Series Films')],

    // ── Step 1 → Step 2: Music ownership ──
    ['Music ownership', 'Reliance',     1, tip2('JioSaavn')],
    ['Music ownership', 'YRF',          1, tip2('YRF Music')],
    ['Music ownership', 'Dharma',       1, tip2('IP only')],
    ['Music ownership', 'Red Chillies', 1, tip2('IP only')],
    ['Music ownership', 'Excel',        1, tip2('UMG partnership')],
    ['Music ownership', 'T-Series',     1, tip2('T-Series')],

    // ── Step 1 → Step 2: Theatrical distribution ──
    ['Theatrical distribution', 'Reliance',     1, tip2('Fully-owned')],
    ['Theatrical distribution', 'YRF',          1, tip2('Fully-owned')],
    ['Theatrical distribution', 'Dharma',       1, tip2('Fully-owned')],
    ['Theatrical distribution', 'Red Chillies', 1, tip2('Self & via YRF, Pen Studios)')],
    ['Theatrical distribution', 'T-Series',     1, tip2('Fully-owned')],

    // ── Step 1 → Step 2: Reliance-only segments ──
    ['OTT platform or licensing', 'Reliance', 1, tip2('Jio Hotstar, external')],
    ['TV channels',               'Reliance', 1, tip2('JioStar, Network18')],
    ['Music streaming',           'Reliance', 1, tip2('JioSaavn')],
    ['News and digital media',    'Reliance', 1, tip2('Network18')],
    ['Telecom network',           'Reliance', 1, tip2('Reliance Jio')],
    ['Devices',                   'Reliance', 1, tip2('JioPhone, JioBharat, JioFiber, JioAirFiber')],
  ]);

  const container = document.getElementById('sankey_chart');
  const isMobile  = window.innerWidth < 768;
  const w = container.offsetWidth;
  const h = Math.max(isMobile ? 400 : 520, Math.round(w * (isMobile ? 0.9 : 0.48)));

  // ── Node color array ──
  // 18 unique nodes in first-appearance order:
  //  0: Content                   → #3B82F6  (Ken Blue)
  //  1: Film & TV production      → #2563EB  (deeper blue – flows from Content)
  //  2: Music ownership           → #8B5CF6  (Ken Purple)
  //  3: Distribution              → #F59E0B  (Ken Amber)
  //  4: Theatrical distribution   → #F97316  (Dark Orange – flows from Distribution)
  //  5: OTT platform or licensing → #FACC15  (Ken Yellow)
  //  6: TV channels               → #EF4444  (Ken Red-light)
  //  7: Music streaming           → #EC4899  (Ken Pink)
  //  8: News and digital media    → #10B981  (Ken Emerald)
  //  9: Delivery pipe             → #0EA5E9  (Sky Blue)
  // 10: Telecom network           → #06B6D4  (Cyan – flows from Delivery pipe)
  // 11: Devices                   → #14B8A6  (Light Teal)
  // 12: Reliance                  → #1D4ED8  (Dark Blue – dominant)
  // 13: YRF                       → #F97316  (Orange)
  // 14: Dharma                    → #7C3AED  (Ken Purple)
  // 15: Red Chillies              → #E63946  (Ken Red)
  // 16: Excel                     → #22C55E  (Ken Green)
  // 17: T-Series                  → #FACC15  (Yellow)

  const options = {
    width:   w,
    height:  h,
    tooltip: { isHtml: true },
    sankey: {
      iterations: 0,           // preserve insertion order within each column
      node: {
        label: {
          fontName: 'GT America Light',
          fontSize: isMobile ? 10 : 14,
          color:    '#1A1A1A',
          bold:     false,
        },
        nodePadding: isMobile ? 8 : 12,
        width:       isMobile ? 5 : 8,
     
         colors: [
          '#3070d8',  //  0: Content
          '#4625eb',  //  1: Film & TV production
          '#8B5CF6',  //  2: Music ownership
          '#F59E0B',  //  3: Distribution
          '#F97316',  //  4: Theatrical distribution
          '#FACC15',  //  5: OTT platform or licensing
          '#EF4444',  //  6: TV channels
          '#EC4899',  //  7: Music streaming
          '#10B981',  //  8: News and digital media
          '#0EA5E9',  //  9: Delivery pipe
          '#06B6D4',  // 10: Telecom network
          '#14B8A6',  // 11: Devices
          '#1D4ED8',  // 12: Reliance  (dark blue — dominant)
          '#ababab',  // 13: YRF
          '#ababab',  // 14: Dharma
          '#ababab',  // 15: Red Chillies
          '#ababab',  // 16: Excel
          '#ababab',  // 17: T-Series
        ],
      },
      link: {
        colorMode: 'target',    // links take the destination node color; grey for non-Reliance, dark blue for Reliance
      },
    },
  };

  const chart = new google.visualization.Sankey(container);
  chart.draw(data, options);
}

// ── Redraw on resize (debounced) ──
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(drawChart, 200);
});
