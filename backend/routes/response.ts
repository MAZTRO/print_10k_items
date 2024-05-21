import color from 'colorts'
import { Response } from 'express'

export const SuccessResponse = (response: Response, message: string, status: number, details: string) => {
  response.status(status || 200).send({
    error: '',
    body: message
  })
  console.log(color(`[SUCCES RESPONSE] -- ${details}`).green + "")
}

export const ErrorResponse = (response: Response, message: string, status: number, details: string) => {
  response.status(status || 500).send({
    error: message,
    body: ''
  })
  console.log(color(`[ERROR RESPONSE] -- ${details}`).red + "")
}