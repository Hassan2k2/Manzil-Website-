async function testLogin() {
  const API_URL = 'http://localhost:5000/api';
  console.log('Testing login with seeded user...');
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('Login Success!');
      console.log('User:', data.user);
      console.log('Token:', data.token.substring(0, 20) + '...');
    } else {
      console.error('Login Failed!');
      console.error('Status:', response.status);
      console.error('Data:', data);
    }
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

testLogin();
