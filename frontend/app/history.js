import {useRouterHistory} from "react-router";
import {createHashHistory} from "history";
// useRouterHistory creates a composable higher-order function
const appHistory = useRouterHistory(createHashHistory)({queryKey: false})
export default appHistory