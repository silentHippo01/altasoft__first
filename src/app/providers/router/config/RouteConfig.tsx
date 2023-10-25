import { RouteProps } from 'react-router-dom';
import { Main } from './../../../../pages/Main/ui/Main';
import { InputsPage } from 'pages/InputsPage';
import { TablesPage } from 'pages/TablesPage';
import { EditorPage } from 'pages/EditorPage';
import { FormPage } from 'pages/FormPage/ui/FormPage';
//здесь работают только относительные пути

export enum AppRoutes {
    MAIN = 'main',
    INPUT = 'inputs',
    TABLES = 'tables',
    FORMS = 'forms',
    EDITOR = 'editor',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.INPUT]: "/inputs",
    [AppRoutes.TABLES]: "/tables",
    [AppRoutes.FORMS]: "/forms",
    [AppRoutes.EDITOR]: "/editor",
}

export const RouteConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <Main />,
    },
    [AppRoutes.INPUT]: {
        path: RoutePath.inputs,
        element: <InputsPage />,
    },
    [AppRoutes.TABLES]: {
        path: RoutePath.tables,
        element: <TablesPage />,
    },
    [AppRoutes.FORMS]: {
        path: RoutePath.forms,
        element: <FormPage />,
    },
    [AppRoutes.EDITOR]: {
        path: RoutePath.editor,
        element: <EditorPage />,
    },
}