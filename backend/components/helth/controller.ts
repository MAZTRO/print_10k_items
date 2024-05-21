import { Response, Request } from "express"
import { SuccessResponse } from "../../routes/response"

export const HealthAPI = (req: Request, res: Response) => {
  SuccessResponse(res, 'API Helthly and operative', 200, 'GET/ helth endpoint')
}

export const StackAPI = (req: Request, res: Response) => {
  SuccessResponse(res, 'This API was made with NodeJs and TypeScript', 200, 'GET/ Stack API')
}