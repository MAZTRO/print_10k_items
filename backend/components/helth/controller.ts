import { Response, Request } from "express"
import { SuccessResponse } from "../../routes/response"

export const HealthAPI = (req: Request, res: Response) => {
  SuccessResponse({
    response: res,
    data: 'API Helthly and operative',
    status: 200,
    details: 'GET/ helth endpoint'
  })
}

export const StackAPI = (req: Request, res: Response) => {
  SuccessResponse({
    response: res,
    data: 'This API was made with NodeJs and TypeScript',
    status: 200,
    details: 'GET/ Stack API'
  })
}