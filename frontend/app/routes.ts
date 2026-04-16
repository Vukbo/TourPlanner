import { type RouteConfig, index, route } from "@react-router/dev/routes";


export default [
    index("views/login.tsx"),
    route("map", "views/map.tsx"),
    route("register", "views/register.tsx"),
    route("tours", "views/tours.tsx"),
    route("tour-management", "views/tour-management.tsx"),
    route("tour-details", "views/tour-details.tsx"),

] satisfies RouteConfig;

