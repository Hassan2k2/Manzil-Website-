
(async () => {
    try {
        // 1. Login
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'authtest3@manzil.com', password: 'password123' })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;

        if (!token) {
            console.error('Failed to get token:', loginData);
            return;
        }

        console.log('Got Auth Token.');

        // 2. Hit AI Recommend
        const body = {
            studentProfile: {
                mbti: "INTJ",
                interests: ["Technology", "Logic", "Problem Solving"]
            },
            careers: [
                { id: "c1", name: "Software Engineer" },
                { id: "c2", name: "Doctor" }
            ]
        };

        const aiRes = await fetch('http://localhost:5000/api/ai/recommend', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const aiData = await aiRes.json();
        console.log('AI Response:', JSON.stringify(aiData, null, 2));

        if (aiData.scores && aiData.scores['c1'] && aiData.scores['c1'].riasec === 85 && aiData.scores['c1'].values === 80) {
            console.log('\n--- VERDICT: The results are still the STATIC MOCKED ones. ---');
        } else {
            console.log('\n--- VERDICT: The results are DYNAMIC and REAL from Groq. ---');
        }
    } catch (err) {
        console.error('Error:', err);
    }
})();
