const {app, BrowserWindow} = require('electron')

const https = require('https')

/* function createWindow() {
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true
        }
    })

    win.loadFile('index.html')
}

app.on('ready', () => {
    createWindow()
}) */

var requestOptions = {
    hostname: 'api.met.no',
    path: '/weatherapi/locationforecast/2.0/compact?lat=60.10&lon=9.58',
    method: 'GET',
    headers: {'User-Agent' : 'Mozilla/5.0'}
}

const req = https.request(requestOptions, (res) => {
    console.log(`status code: ${res.statusCode}`)
    var data = []

    res.on('data', (chunk) => {
        data.push(chunk)
    })

    res.on('end', () => {
        data = data.join('')
        data = JSON.parse(data.toString())
        console.log(data)
    })

    res.on('error', error => {
        console.error(error)
    })
})

req.end()