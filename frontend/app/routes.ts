import { type RouteConfig, index, route } from "@react-router/dev/routes";


export default [index("views/login.tsx"),
    route("register", "views/register.tsx"),
] satisfies RouteConfig;

