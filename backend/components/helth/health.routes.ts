import { Router } from "express"
import { HealthAPI, StackAPI } from "./controller"

export const router = Router()

router.get("/", HealthAPI)
router.get("/stack", StackAPI)
