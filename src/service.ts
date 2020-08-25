// @ts-ignore
import jsreport from 'jsreport-core'
import jsreportEjs from 'jsreport-ejs'
import jsreportChrome from 'jsreport-chrome-pdf'
import jsreportPdfUtils from 'jsreport-pdf-utils'
import jsreportAssets from 'jsreport-assets'

const jsReportConfig = {
    config: {
        templatingEngines: {
			strategy: 'in-process',
			templateCache: {
				enabled: false
			}
        },
        extensions: {
            'chrome-pdf': {
                launchOptions: {
                    args: ['--no-sandbox']
                }
            },
            assets: {
                searchOnDiskIfNotFoundInStore: true,
                allowedFiles: '**/*.*'
            }
        }
    },
    render: {
        engine: 'ejs',
        recipe: 'chrome-pdf',
        chrome: {
            marginTop: '2.5cm',
            marginRight: '2.5cm',
            marginBottom: '2.5cm',
            marginLeft: '2.5cm'
        }
    }
} as any
let jsreportInstance: Promise<jsreport.Reporter>

if (!jsreportInstance) {
	jsreportInstance = jsreport(jsReportConfig.config)
		.use(jsreportPdfUtils())
		.use(jsreportChrome())
		.use(jsreportEjs())
		.use(jsreportAssets())
		.init()
}

export default async (template: string, templateData?: object, t?: any, documentLayout?: string, chromeConfig?: object) => {
	const jsConfig: any = {
		template: {
			...jsReportConfig.render,
			content: template,
			helpers: { t },
			chrome: chromeConfig
		},
		data: templateData
	}
	if (documentLayout) {
		jsConfig.template.pdfOperations = [{
			type: 'merge',
			mergeWholeDocument: true,
			renderForEveryPage: true,
			template: {
				engine: jsReportConfig.render.engine,
				recipe: jsReportConfig.render.recipe,
				content: documentLayout,
				helpers: { t }
			}
		}]
	}

	const instance: jsreport.Reporter = await jsreportInstance
	return instance.render(jsConfig)
}
