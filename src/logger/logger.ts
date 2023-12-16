import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(({ message, timestamp }) => `${timestamp} - ${message}`)
  ),
  transports: [
    new transports.File({ filename: 'errors.log', level: 'error' }),
    new transports.File({ filename: 'changes.log', level: 'info' }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    }),
  )
}

export default logger
