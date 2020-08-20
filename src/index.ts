import http from 'http'
import app from './app'

const httpServer = http.createServer(app)

httpServer.listen(4000).on('listening', () => {
	console.log(`Server started in ${process.env.NODE_ENV} mode at port 4000`)
})

export default httpServer
