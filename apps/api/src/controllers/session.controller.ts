import type { Request, Response } from "express";
import { Controller, Inject } from "../helpers/helpers.di";
import { SessionService } from "../services/session.service";
import { HttpStatusCode } from "../../config/http-status-code";

@Controller()
export class SessionController {
  static NAME = "SessionController";

  constructor(
    @Inject(SessionService.NAME)
    private readonly service: SessionService
  ) {}

  public async get(req: Request, res: Response) {
    const response = this.service.get({
      page: 1,
      perPage: 10,
      search: "",
      sort: [],
      createdAt: [],
    });

    res.status(HttpStatusCode.OK_200).json(response);
  }
  public async add() {}
  public async update() {}
  public async delete() {}
}
