const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/process-data', (req, res) => {
    try {
        const data = req.body.data;

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: 'Invalid data format. Expected an array.' });
        }

       
        const numbers = [];
        const alphabets = [];

     
        data.forEach(item => {
            if (!isNaN(item) && item.trim() !== '') {
                // Check if item is a number 
                numbers.push(item);
            } else if (typeof item === 'string' && /^[a-zA-Z]$/.test(item)) {
                alphabets.push(item);
            }
        });

       
        const lowercaseAlphabets = alphabets.filter(char => char >= 'a' && char <= 'z');
        const highestLowercaseAlphabet = lowercaseAlphabets.length > 0
            ? [String.fromCharCode(Math.max(...lowercaseAlphabets.map(c => c.charCodeAt(0))))]
            : [];

    

        const response = {
            is_success: true,
            user_id: "praveen_kumar_14042003",
            email: "praveenkumar.21bce8952@vitapstudent.ac.in",
            roll_number: "21BCE8952",
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet
        };

        res.json(response);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ is_success: false, error: 'Internal server error.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
