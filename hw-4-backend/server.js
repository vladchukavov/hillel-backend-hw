const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
    const delay = Math.random() * 2000 + 1000
    setTimeout(() => {
        if (Math.random() < 0.1) {
            res.status(500).json({ error: 'Server Error' })
        } else {
            res.json({ message: 'Bad request' })
        }
    }, delay)
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
