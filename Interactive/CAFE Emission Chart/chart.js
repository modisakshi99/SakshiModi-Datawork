Chart.register(ChartDataLabels);

// ── Data ──
const companies = [
  'Maruti Suzuki',
  'Hyundai',
  'M&M',
  'Tata Motors',
  'Toyota Kirloskar',
  'Volkswagen',
  'Honda',
  'Renault',
  'Nissan',
];

const co2Emissions = [101, 121, 132, 83, 118, 125, 133, 115, 124];

const cafe2Values = [-6, 6, -13, -39, -10, 6, 22, 13, 17];
const cafe3Values = [20, 32, 13, -13, 15, 32, 48, 38, 43];

const CAFE2_TARGET = 113;
const CAFE3_TARGET = 113; // tightened under Cafe-3 (still mapped against same base for visual comparison)

// ── Colors ──
const RED   = '#925CB6';
const GREEN = '#F6CB50';

// ── Label sizes ──
function labelSize() {
  const w = window.innerWidth;
  if (w <= 480) return 9;
  if (w <= 768) return 10;
  return 12;
}

function tickSize() {
  const w = window.innerWidth;
  if (w <= 480) return 9;
  if (w <= 768) return 10;
  return 12;
}

// ── Build scatter dataset from raw arrays ──
function buildDataset(values) {
  return values.map((val, i) => ({
    x: co2Emissions[i],
    y: val,
    company: companies[i],
    co2: co2Emissions[i],
    deviation: val,
  }));
}

function pointColors(values) {
  return values.map(v => (v >= 0 ? RED : GREEN));
}

// ── Initial state ──
let activeChart = 'cafe2';

const cafe2Data   = buildDataset(cafe2Values);
const cafe3Data   = buildDataset(cafe3Values);
const cafe2Colors = pointColors(cafe2Values);
const cafe3Colors = pointColors(cafe3Values);

// ── Tooltip element ──
const tooltipEl = document.getElementById('chartjs-tooltip');

// ── Chart init ──
const ctx = document.getElementById('scatterChart').getContext('2d');

// Zero-line annotation plugin (drawn manually as a scale callback isn't great for this)
const zerolinePlugin = {
  id: 'zeroline',
  afterDraw(chart) {
    const { ctx: c, scales: { x, y } } = chart;
    const yZero = y.getPixelForValue(0);
    c.save();
    c.beginPath();
    c.strokeStyle = '#AAAAAA';
    c.lineWidth = 1;
    c.setLineDash([4, 4]);
    c.moveTo(x.left, yZero);
    c.lineTo(x.right, yZero);
    c.stroke();
    c.restore();
  }
};

Chart.register(zerolinePlugin);

const scatterChart = new Chart(ctx, {
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Under Cafe-2',
      data: cafe2Data,
      pointBackgroundColor: cafe2Colors,
      pointBorderColor: cafe2Colors,
      pointRadius: function() {
        const w = window.innerWidth;
        return w <= 480 ? 6 : w <= 768 ? 7 : 9;
      },
      pointHoverRadius: function() {
        const w = window.innerWidth;
        return w <= 480 ? 9 : w <= 768 ? 10 : 13;
      },
      pointHoverBorderColor: '#FFFFFF',
      pointHoverBorderWidth: 2,
    }]
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,

    animation: {
      duration: 350,
      easing: 'easeInOutQuart',
    },

    layout: {
      padding: { top: 36, bottom: 8, left: 8, right: 20 }
    },

    interaction: {
      mode: 'nearest',
      intersect: true,
    },

    plugins: {
      legend: { display: false },

      // ── Custom HTML tooltip ──
      tooltip: {
        enabled: false,
        external: function(context) {
          const model = context.tooltip;

          if (model.opacity === 0) {
            tooltipEl.classList.remove('visible');
            return;
          }

          const raw = model.dataPoints[0].raw;
          const deviationSign = raw.deviation >= 0 ? '+' : '';
          const label = activeChart === 'cafe2' ? 'Cafe-2 deviation' : 'Cafe-3 deviation';

          tooltipEl.innerHTML = `
            <div class="tt-company">${raw.company}</div>
            <div class="tt-row">
              <span class="tt-label">CO2 emission:</span>
              <span class="tt-value">${raw.co2} g/km</span>
            </div>
        
          `;

          const canvasRect = context.chart.canvas.getBoundingClientRect();
          tooltipEl.style.left = (canvasRect.left + window.scrollX + model.caretX) + 'px';
          tooltipEl.style.top  = (canvasRect.top  + window.scrollY + model.caretY) + 'px';
          tooltipEl.classList.add('visible');
        }
      },

      // ── Data labels — company names ──
      datalabels: {
        // Hide on small mobile — too many points, not enough space
        display: function() {
          return window.innerWidth > 480;
        },
        formatter: function(value) {
          return value.company;
        },
        font: function() {
          return {
            family: 'GT America Light, Helvetica Neue, Arial, sans-serif',
            size: labelSize(),
            weight: '400',
          };
        },
        color: '#333333',
        align: function(context) {
          return context.dataset.data[context.dataIndex].y >= 0 ? 'top' : 'bottom';
        },
        anchor: function(context) {
          return context.dataset.data[context.dataIndex].y >= 0 ? 'end' : 'start';
        },
        offset: 4,
        clip: false,
      }
    },

    scales: {
      x: {
        
        min: 80,
        max: 140,
        grid: {
          display: true,
          color: '#D5D0C8',
          lineWidth: 0.5,
        },
        border: {
          color: '#CCCCCC',
          width: 1,
          display: true,
        },
        ticks: {
          font: function() {
            return { family: 'GT America Light, Helvetica Neue, Arial, sans-serif', size: tickSize(), weight: '400' };
          },
          color: '#888888',
          padding: 8,
          maxTicksLimit: 8,
        }
      },
      y: {
        min: -50,
        max: 50,
        border: { display: false },
        grid: {
          display: true,
          color: '#D5D0C8',
          lineWidth: 0.5,
        },
        ticks: {
          font: function() {
            return { family: 'GT America Light, Helvetica Neue, Arial, sans-serif', size: tickSize(), weight: '400' };
          },
          color: '#888888',
          padding: 8,
          stepSize: 10,
          callback: function(value) {
            return (value > 0 ? '+' : '') + value;
          }
        }
      }
    }
  }
});

// ── Toggle logic ──
function switchTo(regime) {
  if (activeChart === regime) return;
  activeChart = regime;

  const data   = regime === 'cafe2' ? cafe2Data   : cafe3Data;
  const colors = regime === 'cafe2' ? cafe2Colors : cafe3Colors;
  scatterChart.data.datasets[0].data = data;
  scatterChart.data.datasets[0].pointBackgroundColor = colors;
  scatterChart.data.datasets[0].pointBorderColor = colors;
  scatterChart.data.datasets[0].label = regime === 'cafe2' ? 'Under Cafe-2' : 'Under Cafe-3 (expected)';

  scatterChart.update();

  // Update toggle button states
  document.getElementById('btn-cafe2').classList.toggle('active', regime === 'cafe2');
  document.getElementById('btn-cafe3').classList.toggle('active', regime === 'cafe3');

  // Hide tooltip on switch
  tooltipEl.classList.remove('visible');
}

document.getElementById('btn-cafe2').addEventListener('click', () => switchTo('cafe2'));
document.getElementById('btn-cafe3').addEventListener('click', () => switchTo('cafe3'));

// ── Hide tooltip on mouse leave ──
document.getElementById('scatterChart').addEventListener('mouseleave', function() {
  tooltipEl.classList.remove('visible');
});

// ── Re-render on resize (updates font sizes) ──
window.addEventListener('resize', function() {
  scatterChart.update();
});
