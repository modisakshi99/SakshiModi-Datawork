const chartImage = document.getElementById('chartImage');
const hotspots = document.querySelectorAll('.hotspot');

hotspots.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    if (chartImage.getAttribute('src') !== target) {
      chartImage.setAttribute('src', target);
    }
  });
});
