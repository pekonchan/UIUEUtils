const http = require('http')
const url = require('url')
const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function getSourceText (path) {
    try {
        const html = await readFile(resolve(path), { encoding: 'utf8' })
        return html
    } catch (e) {
        console.log('🚀 ~ file: index.js:11 ~ getSourceText ~ e:', e)
    }
}

const server = http.createServer(async (req, res) => {
    const pathname = url.parse(req.url).pathname
    let text = ''
    switch (pathname) {
        case '/scrollOnly.html':
            text = await getSourceText('docs/scrollOnly.html')
            break
        case '/':
            text = await getSourceText('docs/index.html')
            break
        case '/favicon.ico':
            break
        default:
            let url = pathname
            const matched = pathname.match(/\.(.+)$/)
            let ext = matched ? matched[1] : ''
            if (pathname.indexOf('/dist') === 0 && !ext) {
                ext = 'js'
                url += '/index.js'
            }
            switch (ext) {
                case 'js':
                    res.writeHead(200, { 'Content-Type': 'application/javascript' })
                    break
            }
            text = await getSourceText(url.slice(1))
    }
    res.end(text)
})

server.listen('6789')

console.log('The server start at http://localhost:6789')