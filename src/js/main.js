(async function() {
  // Load all HTML components first
  await loadComponents();
  
  // Initialize Lucide icons after components are loaded
  lucide.createIcons();
})();