// module
import { ReactNode } from "react";

export interface RouteModel {
    name: string
    path: string
    showInHeaderNav: boolean
    needAuth: boolean
    cmp: () => ReactNode
};