import type { Request, Response } from "express";
import { Controller, Inject } from "../helpers/helpers.di";
import { SessionService } from "../services/session.service";
import { HttpStatusCode } from "../../config/http-status-code";

@Controller()
export class SessionController {
  static NAME = "SessionController";

  constructor(
    @Inject(SessionService.NAME)
    private readonly controller: SessionController
  ) {}

  public async get(req: Request, res: Response) {
    const response = {
      success: true,
      data: [
        {
          title: "THis is session data",
        },
      ],
    };

    res.status(HttpStatusCode.OK_200).json(response);
  }
  public async add() {}
  public async update() {}
  public async delete() {}
}
