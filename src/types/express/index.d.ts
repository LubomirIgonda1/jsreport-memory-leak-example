import { Request as OriginalRequest, } from 'express'

declare module 'express' {
	export interface Request extends Omit<OriginalRequest, 'query'> {
		query: any
	}
}
