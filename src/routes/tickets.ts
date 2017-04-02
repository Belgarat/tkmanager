import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { Tickets } from "../models/tickets";

/**
 * / route
 *
 * @class TicketsRoute
 */
export class TicketsRoute extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class TicketsRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //add base route
    router.get("/api/v1/tickets", (req: Request, res: Response, next: NextFunction) => {
      new Tickets().getAll(req, res, next);
    });

    // get by ids
    router.get("/api/v1/tickets/:ids", (req: Request, res: Response, next: NextFunction) => {
      new Tickets().getByIds(req.params.ids, res, next);
    });

    // ... put here other api routes ...

    //log
    console.log("[TicketsRoute::create] finished adding tickets api routes.");
  }

  /**
   * Constructor
   *
   * @class TicketsRoute
   * @constructor
   */
  constructor() {
    super();
  }
}