
// Cloudflare Pages Worker script
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle requests for static assets
    if (url.pathname.startsWith('/assets/') || 
        url.pathname.includes('.') || 
        url.pathname.startsWith('/pwa-')) {
      // Pass through to the static asset
      return fetch(request);
    }
    
    // Serving the SPA's index.html for all routes for client-side routing
    try {
      // Try to serve the requested path first
      const response = await fetch(request);
      if (response.status === 200) {
        return response;
      }
      
      // If the path doesn't exist, serve index.html
      return fetch(new Request(`${url.origin}/index.html`, request));
    } catch (e) {
      console.error('Error serving request:', e);
      // If there's any error, serve index.html
      return fetch(new Request(`${url.origin}/index.html`, request));
    }
  }
}
