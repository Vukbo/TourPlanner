import { type RouteConfig, index, route } from "@react-router/dev/routes";


export default [
    index("views/login.tsx"),
    route("register", "views/register.tsx"),
    route("tours", "views/tours.tsx"),
    route("tour-management", "views/tour-management.tsx"),
] satisfies RouteConfig;

