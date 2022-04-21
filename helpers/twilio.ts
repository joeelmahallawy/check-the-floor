import twilio from "twilio";
const SendSMS = (to: string, message: string) => {
  const client = twilio(
    process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID,
    process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN
  );

  client.messages.create({
    to: to,
    from: process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER,
    body: message,
  });
};
export default SendSMS;
