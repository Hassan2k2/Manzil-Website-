const fetch = require('node-fetch'); // or try global.fetch if Node 18+

(async () => {
  try {
    const resReg = await global.fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'authtest2@manzil.com', password: 'password123', name: 'Test User' })
    });
    console.log('Register status:', resReg.status);
    console.log('Register body:', await resReg.text());

    const resLog = await global.fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'authtest2@manzil.com', password: 'password123' })
    });
    console.log('Login status:', resLog.status);
    console.log('Login body:', await resLog.text());
  } catch (err) {
    console.error('Fetch error:', err);
  }
})();
