"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route");
const tickets_1 = require("../models/tickets");
class TicketsRoute extends route_1.BaseRoute {
    static create(router) {
        router.get("/api/v1/tickets", (req, res, next) => {
            new tickets_1.Tickets().getAll(req, res, next);
        });
        router.get("/api/v1/tickets/:ids", (req, res, next) => {
            new tickets_1.Tickets().getByIds(req.params.ids, res, next);
        });
        console.log("[TicketsRoute::create] finished adding tickets api routes.");
    }
    constructor() {
        super();
    }
}
exports.TicketsRoute = TicketsRoute;
