function filterBrand(brand, el) {
  document.querySelectorAll('.brand-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.product-card').forEach(card => {
    const show = brand === 'todos' || card.dataset.brand === brand;
    card.style.display = show ? 'flex' : 'none';
  });
}