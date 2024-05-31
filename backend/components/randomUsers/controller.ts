import { Response, Request } from "express"
import { SuccessResponse, ErrorResponse } from "../../routes/response"
import { RandomUser } from "../../utilities/interface"
import { generateRandomUsers } from "./generateRandomUser"

export const getRandomUsers = (req: Request, res: Response) => {
  try {
    const users: RandomUser[] = generateRandomUsers(10000)

    SuccessResponse({
      response: res,
      data: users,
      status: 200,
      details: 'GET/ random users'
    })
  } catch (error) {
    ErrorResponse(
      res,
      'Error creating random users',
      500,
      'GET/ Error creating random users'
    )
  }
}
