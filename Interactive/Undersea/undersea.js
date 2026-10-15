const zones = [
    {
        name: "Beach landing",
        depth: "0–50",
        protection: "Buried concrete conduit, beach manhole",
        breakFactors: "Construction, digging, vandalism",
        topPct: 20,
        heightPct: 4
    },
    {
        name: "Coastal/shallow water",
        depth: "50–200",
        protection: "Buried in the seabed trench",
        breakFactors: "Ship anchors, fishing trawls",
        topPct: 24.5,
        heightPct: 4.5
    },
    {
        name: "Continental shelf",
        depth: "200–1,000",
        protection: "Buried or armoured",
        breakFactors: "Deep-sea trawling, anchor drag",
        topPct: 29,
        heightPct: 8
    },
    {
        name: "Continental slope",
        depth: "1,000–2,000",
        protection: "Armoured",
        breakFactors: "Submarines, landslides, deep-sea trawls",
        topPct: 37.8,
        heightPct: 10
    },
    {
        name: "Deep sea",
        depth: "2,000–6,000",
        protection: "Unburied",
        breakFactors: "Submersibles, seismic activity",
        topPct: 52.6,
        heightPct: 30.0
    },
    {
        name: "Abyssal",
        depth: "6,000",
        protection: "Minimal protection",
        breakFactors: "Submersibles only",
        topPct: 85,
        heightPct: 9.5
    }
];

function init() {
    const wrapper = document.querySelector('.chart-wrapper');
    const overlay = document.getElementById('zonesOverlay');
    const tooltip = document.getElementById('tooltip');
    const tooltipProtection = document.getElementById('tooltip-protection');
    const tooltipBreak = document.getElementById('tooltip-break');

    zones.forEach((zone) => {
        const zoneEl = document.createElement('div');
        zoneEl.classList.add('zone-area');
        zoneEl.style.top = zone.topPct + '%';
        zoneEl.style.height = zone.heightPct + '%';
        zoneEl.dataset.zone = zone.name;
        overlay.appendChild(zoneEl);

        zoneEl.addEventListener('mouseenter', (e) => {
            tooltipProtection.textContent = zone.protection;
            tooltipBreak.textContent = zone.breakFactors;
            tooltip.classList.add('visible');
            positionTooltip(e, zone, wrapper, tooltip);
        });

        zoneEl.addEventListener('mousemove', (e) => {
            positionTooltip(e, zone, wrapper, tooltip);
        });

        zoneEl.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });
    });
}

function positionTooltip(e, zone, wrapper, tooltip) {
    const rect = wrapper.getBoundingClientRect();
    const imgH = rect.height;
    const imgW = rect.width;

    // Zone vertical center in px relative to wrapper
    const zoneMidY = imgH * (zone.topPct + zone.heightPct / 2) / 100;
    const tooltipH = tooltip.offsetHeight || 90;

    // Position tooltip to the right of zone labels (~46% from left)
    let tipLeft = imgW * 0.35;
    let tipTop = zoneMidY - tooltipH / 2;

   
    // Keep tooltip within image bounds vertically
    const minTop = imgH * (zone.topPct / 100);
    const maxTop = imgH * ((zone.topPct + zone.heightPct) / 100) - tooltipH;
    tipTop = Math.max(minTop, Math.min(tipTop, maxTop));

    // Keep tooltip within image bounds horizontally
    const tooltipW = 220;
    if (tipLeft + tooltipW > imgW - 8) {
        tipLeft = imgW - tooltipW - 8;
    }
 // Shift Abyssal tooltip up so it stays inside the image boundary
    if (zone.name === "Abyssal") {
        tipTop -= tooltipH * 0.6;
    }

    tooltip.style.left = tipLeft + 'px';
    tooltip.style.top = tipTop + 'px';
}

document.addEventListener('DOMContentLoaded', init);
