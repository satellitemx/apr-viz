import { format } from "date-fns";

export const formatDate = (dateString) => format(new Date(dateString), "yy/MM/d HH:mm:ss")