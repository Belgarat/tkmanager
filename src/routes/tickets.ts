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

    // get by id
    router.get("/api/v1/tickets/:ticket_id", (req: Request, res: Response, next: NextFunction) => {
      new Tickets().getById(req.params.ticket_id, res, next);
    });

    // get jobs
    router.get("/api/v1/tickets/:ticket_id/jobs", (req: Request, res: Response, next: NextFunction) => {
      new Tickets().getJobs(req.params.ticket_id, res, next);
    });

    // get customer
    router.get("/api/v1/tickets/:ticket_id/customer", (req: Request, res: Response, next: NextFunction) => {
      new Tickets().getCustomer(req.params.ticket_id, res, next);
    });

    // search fulltext
    router.get("/api/v1/tickets/search/:fulltext", (req: Request, res: Response, next: NextFunction) => {
      new Tickets().searchFullText(req.params.fulltext, res, next);
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