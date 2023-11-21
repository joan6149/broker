export interface Message {
    check: boolean,
    isCorrect: boolean,
    message: string
}

export enum MessageTypes {
    MESSAGE = 'messages',
    HTTPERROR = 'httpErrors'
}

export enum Severity {
    SUCCESS = 'success',
    WARN = 'warn',
    INFO = 'info',
    ERROR = 'error'
}

export enum Summary {
    SUCCESS = 'Success',
    WARN = 'Warn',
    INFO = 'Info',
    ERROR = 'Error'
}

export interface ApplicationMessage {
    key: string, 
    severity: Severity, 
    summary: Summary, 
    detail: string
}
