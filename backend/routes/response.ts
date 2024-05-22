import color from 'colorts'
import { Response } from 'express'
import { RandomUser, SuccessData } from '../utilities/interface'

export const SuccessResponse = ({ response, data, status, details }: SuccessData) => {
  response.status(status || 200).send({
    error: '',
    body: data
  })
  console.log(color(`[SUCCES RESPONSE] -- ${details}`).green + "")
}

export const ErrorResponse = (response: Response, data: string, status: number, details: string) => {
  response.status(status || 500).send({
    error: data,
    body: ''
  })
  console.log(color(`[ERROR RESPONSE] -- ${details}`).red + "")
}