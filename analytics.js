// GA4 loader + lightweight event helper
(function () {
  const id = (window.GA_MEASUREMENT_ID || "").trim();
  const isPlaceholder = !id || id === "G-XXXXXXXXXX" || id.startsWith("G-XXXX");

  function safeEvent(name, params) {
    try {
      if (typeof window.gtag === "function" && name) {
        window.gtag("event", name, params || {});
      }
    } catch (_) {
      // ignore
    }
  }

  // Expose a tiny API for the rest of the site
  window.pmTrack = {
    event: safeEvent,
  };

  if (isPlaceholder) return;

  // Load gtag.js dynamically
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  window.gtag("js", new Date());
  window.gtag("config", id, {
    anonymize_ip: true,
    send_page_view: true,
  });
})();

