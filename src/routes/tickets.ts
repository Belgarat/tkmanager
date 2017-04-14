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
    //get all tickets
    router.get("/api/v1/tickets", (req: Request, res: Response, next: NextFunction) => {
      new Tickets().getAll(req, res, next);
    });

    // get by id
    router.get("/api/v1/tickets/:ticket_id", (req: Request, res: Response, next: NextFunction) => {
      new Tickets().getById(req.params.ticket_id, res, next);
    });

    // get current trace by id
    router.get("/api/v1/tickets/:ticket_id/trace", (req: Request, res: Response, next: NextFunction) => {
      new Tickets().getCurrentTrace(req.params.ticket_id, res, next);
    });

    // add new trace
    router.post("/api/v1/tickets/:ticket_id/trace", (req: Request, res: Response, next: NextFunction) => {
      new Tickets().addTrace(req, res, next);
    });

    // get all traces history by id
    router.get("/api/v1/tickets/:ticket_id/traces", (req: Request, res: Response, next: NextFunction) => {
      new Tickets().getCompleteTrace(req.params.ticket_id, res, next);
    });

    // get jobs by id
    router.get("/api/v1/tickets/:ticket_id/jobs", (req: Request, res: Response, next: NextFunction) => {
      new Tickets().getJobs(req.params.ticket_id, res, next);
    });

    // get customer by id
    router.get("/api/v1/tickets/:ticket_id/customer", (req: Request, res: Response, next: NextFunction) => {
      new Tickets().getCustomer(req.params.ticket_id, res, next);
    });

    // search fulltext
    router.get("/api/v1/tickets/search/:fulltext", (req: Request, res: Response, next: NextFunction) => {
      new Tickets().searchFullText(req.params.fulltext, res, next);
    });

    // add ticket
    router.post("/api/v1/tickets", (req: Request, res: Response, next: NextFunction) => {
      new Tickets().add(req, res, next);
    });

    // update ticket
    router.put("/api/v1/tickets/:ticket_id", (req: Request, res: Response, next: NextFunction) => {
      new Tickets().save(req, res, next);
    });

    // delete ticket
    router.delete("/api/v1/tickets/:ticket_id", (req: Request, res: Response, next: NextFunction) => {
      new Tickets().delete(req, res, next);
    });

    // undelete ticket
    router.put("/api/v1/tickets/:ticket_id/undelete", (req: Request, res: Response, next: NextFunction) => {
      new Tickets().undelete(req, res, next);
    });

    // ... put here other api routes ...

    //log
    console.log("[TicketsRoute::create] finished adding tickets api routes.");
    console.log("Base route: GET :8080/api/v1/tickets");
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