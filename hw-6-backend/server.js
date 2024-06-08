const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const app = express()
app.use(express.json())

const SECRET_KEY = 'your_secret_key'
const REFRESH_SECRET_KEY = 'your_refresh_secret_key'

let refreshTokens = []

app.get('/', (req, res) => {
    res.send('Welcome to the API')
})


app.post('/login', (req, res) => {
    const { username, password } = req.body

    if (username !== 'user' || password !== 'password') {
        return res.status(401).send('Invalid credentials')
    }

    const accessToken = jwt.sign({ username }, SECRET_KEY, { expiresIn: '15m' })
    const refreshToken = jwt.sign({ username }, REFRESH_SECRET_KEY)

    refreshTokens.push(refreshToken)

    res.json({ accessToken, refreshToken })
})

app.post('/refresh-token', (req, res) => {
    const { token } = req.body

    if (!token) {
        return res.status(401).send('Refresh Token required')
    }

    if (!refreshTokens.includes(token)) {
        return res.status(403).send('Invalid Refresh Token')
    }

    try {
        const user = jwt.verify(token, REFRESH_SECRET_KEY)
        const accessToken = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '15m' })

        res.json({ accessToken })
    } catch (error) {
        return res.status(403).send('Invalid Refresh Token')
    }
})

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).send('Access Token required')
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid Access Token')
        }

        req.user = user;
        next()
    })
}

app.get('/path', authenticateToken, (req, res) => {
    res.send('This is a protected route')
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
