"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route");
const tickets_1 = require("../models/tickets");
class TicketsRoute extends route_1.BaseRoute {
    static create(router) {
        router.get("/api/v1/tickets", (req, res, next) => {
            new tickets_1.Tickets().getAll(req, res, next);
        });
        router.get("/api/v1/tickets/:ticket_id", (req, res, next) => {
            new tickets_1.Tickets().getById(req.params.ticket_id, res, next);
        });
        router.get("/api/v1/tickets/:ticket_id/jobs", (req, res, next) => {
            new tickets_1.Tickets().getJobs(req.params.ticket_id, res, next);
        });
        router.get("/api/v1/tickets/:ticket_id/customer", (req, res, next) => {
            new tickets_1.Tickets().getCustomer(req.params.ticket_id, res, next);
        });
        router.get("/api/v1/tickets/search/:fulltext", (req, res, next) => {
            new tickets_1.Tickets().searchFullText(req.params.fulltext, res, next);
        });
        console.log("[TicketsRoute::create] finished adding tickets api routes.");
    }
    constructor() {
        super();
    }
}
exports.TicketsRoute = TicketsRoute;
