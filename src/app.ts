import express, { NextFunction } from 'express'
import { map, join, get } from 'lodash'
import fs from 'fs'
import path from 'path'
import ejs from 'ejs'

import generatePdf from './service'

const app = express()

// NOTE: for debug purpose
app.use('/render', async(req: any, res: any, next: any) => {
	try {
		const documentTypes = ['test1', 'test2', 'test3']

		const promises = map(documentTypes, async (documentType: string) => {
			const documentTemplate: string = await new Promise((resolve, reject) => {
				fs.readFile(path.join(process.cwd(), 'src', 'views', `${documentType}.ejs`), 'utf8', (err, data) => {
					if (err) {
						reject(err)
					}
					resolve(data)
				})
            })
            const templateData = {
                fullName: `WEFWAF${documentType}`,
                number: `${documentType}`,
				birthDate: new Date(),
				examinationDate: new Date()
            }

			// add blank page for single page document for duplex print

			return {
				documentTemplate: await ejs.render(documentTemplate, templateData, { async: true }),
				documentName: documentType
			}
		})
		const renderData = await Promise.all(promises)

		const documentTemplate = join(map(renderData, 'documentTemplate'), '<div style="page-break-before: always;">')

		const generatedPdf = await generatePdf(documentTemplate)
	
		res.setHeader('Content-disposition', `inline; filename="docs.pdf"`)
		global.gc()
		return generatedPdf.stream.pipe(res)
		// return res.json()
	} catch (error) {
		return next(error)
	}
})

export default app
