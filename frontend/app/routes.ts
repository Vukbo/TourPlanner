import { type RouteConfig, index, route } from "@react-router/dev/routes";


export default [index("views/home.tsx"),
    route("register", "views/register.tsx"),
    route("login", "views/login.tsx"),
    route("tours", "views/tours.tsx"),
    route("tour-management", "views/tour-management.tsx"),
] satisfies RouteConfig;

