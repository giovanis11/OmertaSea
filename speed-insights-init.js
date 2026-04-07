// Initialize Vercel Speed Insights
// This script loads and initializes Speed Insights for tracking web vitals
(function() {
  // Initialize the queue
  if (!window.si) {
    window.si = function() {
      (window.siq = window.siq || []).push(arguments);
    };
  }

  // Load the Speed Insights script
  var script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/speed-insights/script.js';
  
  // Fallback to public CDN if Vercel's built-in path doesn't work
  script.onerror = function() {
    console.log('Loading Speed Insights from CDN fallback');
    var fallbackScript = document.createElement('script');
    fallbackScript.defer = true;
    fallbackScript.src = 'https://va.vercel-scripts.com/v1/speed-insights/script.js';
    document.head.appendChild(fallbackScript);
  };
  
  document.head.appendChild(script);
})();
