import { ComponentProps } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { transporter } from "./transporter";
import CreateOtpTemplate from "./templates/otp-verify";

const Email_TEMPLATES = { CreateOtpTemplate };
type EmailTemplates = typeof Email_TEMPLATES;

export const _sendEmail = async <T extends keyof EmailTemplates>({
  from,
  to,
  key,
  props,
}: {
  from?: string;
  to: string;
  key: T;
  props: ComponentProps<EmailTemplates[T]>;
}) => {
  const template = Email_TEMPLATES[key](props);
  const html = renderToStaticMarkup(template);

  await transporter.sendMail({
    from,
    to,
    subject: template.props.subject,
    html,
  });
};
