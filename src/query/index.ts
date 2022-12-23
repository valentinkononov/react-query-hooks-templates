// this should be defined somewhere in the top, once per application or module
// level of caching and data scope management
import { QueryClient } from "react-query";

export const queryClient = new QueryClient();
