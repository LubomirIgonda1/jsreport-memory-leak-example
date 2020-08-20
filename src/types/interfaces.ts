import { IStrategyOptions as IPassportStrategyOptions } from 'passport-local'
import { JwtFromRequestFunction } from 'passport-jwt'
import { Template, Configuration } from 'jsreport-core'
import { DISCUSSION_MESSAGE_TYPE } from '../utils/enums'

export interface IServerConfig {
	port: number
	filesPath: string
	domain: string
	externalServerURL: string
	subdirs: string[]
	insuranceReportsNetPath: string,
	multipleRegistrationEmail: string
}

export interface IPacsConfig {
	username: string
	password: string
	clientId: string
}

export interface ILogsCongig {
	logDirectory: string
}

export interface IJWTPassportConfig {
	secretOrKey: string
	api: JWTConfig
	forgottenPassword: JWTConfig
}

interface JWTConfig {
	jwtFromRequest: JwtFromRequestFunction
	exp: string,
	audience: string
}

export interface IEmailConfig {
	host: string,
	port: number,
	auth: {
		user: string,
		pass: string
	}
}

export interface IPassportConfig {
	local: IPassportStrategyOptions,
	jwt: IJWTPassportConfig,
	jwtExternalRegistration: {
		secretOrKey: string,
		options: JWTConfig
	},
	jwtExternalServer : {
		secretOrKey: string,
		options: JWTConfig
	}
}

export interface IRedisConfig {
	url: string,
	enumCacheExpTime: number
}

export interface IWebSocketConfig {
	proxy: {
		secret: string
	}
}

export interface IConfig {
	server: IServerConfig
	logs: ILogsCongig
	passport: IPassportConfig
}

export interface IJwtPayload {
	uid: number,
	exp: number,
	aud: string
}

export interface INotification {
	id: number,
	creator: {
		id: number,
		fullName: string,
		initials: string,
		backgroundImage: string
	}
	text: string,
	createdAt: Date
	redirectURL: string
	messageID?: number
}

export interface INotificationUserData {
	userId: number
	notificationCount: number
}

export interface INotificationUpdateResolveStatus {
	id: number
	resolvedAt: Date,
	notificationCount?: number
}

export interface IDiscussionMessage {
	id: number
	text: string
	parentID: number,
	files: {
		id: number
		path: string
		name: string
	}[]
	creator: {
		id: number,
		fullName: string
		initials: string
		backgroundImage: string
	}
	resolvedBy: {
		id: number,
		fullName: string
	}[],
	type: DISCUSSION_MESSAGE_TYPE
	createdAt: Date,
	updatedAt: Date
}

export interface IJsReportConfig {
	config: Partial<Configuration & {
		extensions: {
			'chrome-pdf'?: {
				launchOptions?: {
					args?: ['--no-sandbox']
				}
			},
			assets?: {
				searchOnDiskIfNotFoundInStore: boolean
				allowedFiles: string
			}
		}
	}>,
	render?: Partial<Template & {
		chrome: {
			marginTop?: string,
			marginRight?: string,
			marginBottom?: string,
			marginLeft?: string
		}
	}>
}

export interface ICronConfig {
	tempDirClear: {
		scheduledTime: string
	},
	sendOrderedReminder: {
		scheduledTime: string
	}
}

export interface ISentryConfig {
	dsn: string
	env: string
	debug: boolean
}
