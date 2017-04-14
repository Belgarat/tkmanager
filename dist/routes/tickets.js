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
        router.get("/api/v1/tickets/:ticket_id/trace", (req, res, next) => {
            new tickets_1.Tickets().getCurrentTrace(req.params.ticket_id, res, next);
        });
        router.post("/api/v1/tickets/:ticket_id/trace", (req, res, next) => {
            new tickets_1.Tickets().addTrace(req, res, next);
        });
        router.get("/api/v1/tickets/:ticket_id/traces", (req, res, next) => {
            new tickets_1.Tickets().getCompleteTrace(req.params.ticket_id, res, next);
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
        router.post("/api/v1/tickets", (req, res, next) => {
            new tickets_1.Tickets().add(req, res, next);
        });
        router.put("/api/v1/tickets/:ticket_id", (req, res, next) => {
            new tickets_1.Tickets().save(req, res, next);
        });
        router.delete("/api/v1/tickets/:ticket_id", (req, res, next) => {
            new tickets_1.Tickets().delete(req, res, next);
        });
        router.put("/api/v1/tickets/:ticket_id/undelete", (req, res, next) => {
            new tickets_1.Tickets().undelete(req, res, next);
        });
        console.log("[TicketsRoute::create] finished adding tickets api routes.");
        console.log("Base route: GET :8080/api/v1/tickets");
    }
    constructor() {
        super();
    }
}
exports.TicketsRoute = TicketsRoute;
