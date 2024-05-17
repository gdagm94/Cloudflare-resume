addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Only allow specific origins to access this endpoint for security
  const allowedOrigins = ['https://dagmawieshete.com'];
  const origin = request.headers.get('Origin');
  if (!allowedOrigins.includes(origin)) {
    return new Response('Forbidden', { status: 403 });
  }

  // Fetch the API key from the environment variable
  const apiKey = ResumeCF;

  // Respond with the API key in JSON format
  return new Response(JSON.stringify({ apiKey }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET'
    },
  });
}
