// This code is the exact security logic (balance check, win logic) from your Python app.
// It is written in JavaScript for Vercel's serverless environment.

const { createHmac } = require('crypto');

M VERCEL SETTINGS) ---
// Keys are now read from the Vercel project's Environment Variables
const BOT_TOKEN = process.env.8367361021:AAFS-poEFQzQVDynh4w8lxLURc7niQ7xELU; 
const ADMIN_USER_ID = process.env.1704412577https://quaint-weathered-aura.solana-mainnet.quiknode.pro/7414e45744be9288c98c232f184d9a40bc6b86d5/; 
const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL; 
// --- END SECURE CONFIG ---
// --- CONFIGURATION (NOW READING SECRETS FRO
// --- UTILITY FUNCTIONS ---

function checkTelegramAuth(initData, botToken) {
    if (!initData) return false;
    
    try {
        const params = initData.split('&').filter(p => !p.startsWith('hash='));
        const dataCheckString = params.sort().join('\n');
        
        const secretKey = createHmac('sha256', 'WebAppData').update(botToken).digest();
        const signature = createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
        
        const hash = initData.split('hash=')[1];
        return hash === signature;
    } catch (e) {
        console.error("Auth error:", e);
        return false;
    }
}

// *** Placeholder for Solana Check - REPLICA OF PYTHON LOGIC ***
function getWienerDogeBalance(walletAddress) {
    // This is SIMULATED logic. You would call SOLANA_RPC_URL here for the real balance.
    // This is the same logic as your Python app: returns 50.0 balance.
    if (walletAddress.endsWith('0')) return 0.0;
    return 50.0;
}

// --- API HANDLER ---

module.exports = async (req, res) => {
    // We only need to handle the spin request now, as Vercel handles the initial balance check.
    if (req.method === 'GET' && req.url === '/') {
        res.status(200).send("Wiener Doge Spin Backend is running.");
        return;
    }
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    const { userId, telegramInitData, walletAddress } = req.body;

    // 1. SECURITY CHECK (Telegram Authentication)
    if (!checkTelegramAuth(telegramInitData, BOT_TOKEN)) {
        res.status(401).json({ error: 'Unauthorized: Invalid Telegram signature' });
        return;
    }

    // 2. FINAL BALANCE CHECK
    const balance = getWienerDogeBalance(walletAddress);
    if (balance < SPIN_COST) {
        res.status(403).json({ error: 'Insufficient Wiener Doge funds to spin.' });
        return;
    }

    // --- WIN LOGIC (1 in 35 chance) ---
    const winChance = 1.0 / 35.0;
    const winSymbol = '7️⃣';
    const lossSymbols = ['🐶', '🦴', '🌭'];
    let finalResult;

    if (Math.random() < winChance) {
        finalResult = [winSymbol, winSymbol, winSymbol]; // Jackpot
        // To Do: Add Telegram Notification Logic here
    } else {
        let s1 = lossSymbols[Math.floor(Math.random() * lossSymbols.length)];
        let s2 = lossSymbols[Math.floor(Math.random() * lossSymbols.length)];
        let s3 = lossSymbols[Math.floor(Math.random() * lossSymbols.length)];
        if (s1 === s2 && s2 === s3) {
             s3 = lossSymbols[Math.floor(Math.random() * (lossSymbols.length - 1))];
        }
        finalResult = [s1, s2, s3];
    }
    
    res.status(200).json({ result: finalResult });
};
