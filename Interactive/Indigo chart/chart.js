Chart.register(ChartDataLabels);

// ── Data ──
const years = ['FY19', 'FY20', 'FY21', 'FY22', 'FY23', 'FY24', 'FY25'];

const ancillaryRevenue = [468, 526, 773, 740, 635, 616, 670];

const totalPassengers = [64.74, 75.02, 30.69, 49.8, 85.59, 106.72, 118.58];

// ── Axis label size ──
function tickSize() {
  return 14;
}

function labelSize() {
  const w = window.innerWidth;
  if (w <= 480) return 11;
  if (w <= 768) return 12;
  return 14;
}

// ── Tooltip element ──
const tooltipEl = document.getElementById('chartjs-tooltip');

// ── Chart ──
const ctx = document.getElementById('ancillaryChart').getContext('2d');

const AMBER = '#000099';
const AMBER_DARK = '#000099';

new Chart(ctx, {
  type: 'line',
  data: {
    labels: years,
    datasets: [{
      label: 'Ancillary revenue per passenger (Rs)',
      data: ancillaryRevenue,
      borderColor: AMBER,
      backgroundColor: 'transparent',
      borderWidth: 3.5,
      pointBackgroundColor: AMBER,
      pointBorderColor: AMBER,
      pointRadius: 5,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: AMBER,
      pointHoverBorderColor: '#FFFFFF',
      pointHoverBorderWidth: 2.5,
      tension: 0,
    }]
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,
     aspectRatio: 1,

    layout: {
      padding: { top: 46, bottom: 8, left: 8, right: 8 }
    },

    interaction: {
      mode: 'index',
      intersect: false,
    },

    plugins: {
      legend: {
        display: false,
      },

      // ── Custom HTML tooltip ──
      tooltip: {
        enabled: false,
        external: function(context) {
          const tooltipModel = context.tooltip;

          if (tooltipModel.opacity === 0) {
            tooltipEl.classList.remove('visible');
            return;
          }

          const idx = tooltipModel.dataPoints[0].dataIndex;
          const year = years[idx];
          const passengers = totalPassengers[idx];

          tooltipEl.innerHTML = `
            <div class="tt-year">${year}</div>
            <div class="tt-row">
              <span class="tt-dot" style="background:#888888"></span>
              <span class="tt-label">Total passengers:</span>
              <span class="tt-value"><strong>${passengers}M</strong></span>
            </div>
          `;

          tooltipEl.style.left = tooltipModel.caretX + window.scrollX + context.chart.canvas.getBoundingClientRect().left + 'px';
          tooltipEl.style.top  = tooltipModel.caretY + window.scrollY + context.chart.canvas.getBoundingClientRect().top + 'px';
          tooltipEl.classList.add('visible');
        }
      },

      // ── Data labels — value at every point ──
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'top',
        offset: 4,
        font: function() {
          return {
            family: 'GT America Light, Helvetica Neue, Arial, sans-serif',
            size: labelSize(),
            weight: '700',
          };
        },
        color: '#1A1A1A',
        formatter: function(value) {
          return value;
        },
      }
    },

    scales: {
      x: {
        grid: {
          display: false,
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
          maxRotation: 0,
          padding: 10,
        }
      },
      y: {
        min: 400,
        max: 800,
        border: {
          display: false,
        },
        grid: {
          display: true,
          color: '#D5D0C8',
          lineWidth: 0.75,
        },
        ticks: {
          font: function() {
            return { family: 'GT America Light, Helvetica Neue, Arial, sans-serif', size: tickSize(), weight: '400' };
          },
          color: '#888888',
          stepSize: 100,
          padding: 10,
          callback: function(value) {
            return value;
          }
        }
      }
    }
  }
});

// ── Hide tooltip when mouse leaves the chart canvas ──
document.getElementById('ancillaryChart').addEventListener('mouseleave', function() {
  tooltipEl.classList.remove('visible');
});
