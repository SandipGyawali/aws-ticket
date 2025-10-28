import { Button, Html } from "@react-email/components";
import { withSubject } from "../utils";

export default function CreateOtpTemplate({
  full_name,
  otp,
}: {
  full_name: string;
  otp: string;
}) {
  return withSubject(
    <Html>
      <p>
        Hi, {full_name}, to verify your account, please use the following OTP.
      </p>
      <div className="text-xl">{otp}</div>
      <p>If you did not expect this email, you can safely ignore it.</p>
    </Html>,
    `Verify your Aws-Ticket account`
  );
}
