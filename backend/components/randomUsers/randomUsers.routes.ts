import { Router } from "express"
import { getRandomUsers } from './controller'

export const router = Router()

router.get("/", getRandomUsers)
