export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ firstName }) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>This is test email template.</p>
  </div>
);

interface EmailTemplateProps {
  firstName: string;
}
