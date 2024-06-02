const express = require('express')
const app = express()
const port = 8080

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
    const delay = (Math.random() * 2000 + 1000).toFixed(2)
    setTimeout(() => {
        if (Math.random() < 0.1) {
            res.status(500).render('error', { error: 'Server Error', delay })
        } else {
            res.status(200).json({ message: 'Good request', delay })
        }
    }, delay)
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
