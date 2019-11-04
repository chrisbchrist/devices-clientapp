import { notification } from "antd";

export const openNotificationWithIcon = (
  type: "success" | "info" | "error",
  message: string,
  description: string
) => {
  notification[type]({
    message,
    description
  });
};
