export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fffbff;">
  <div style="background: linear-gradient(to right, #d3ab9e, #eac9c1); padding: 20px; text-align: center;">
    <h1 style="color: #fffbff; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #ebd8d0; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #d3ab9e;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Yarnify Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fffbff;">
  <div style="background: linear-gradient(to right, #d3ab9e, #eac9c1); padding: 20px; text-align: center;">
    <h1 style="color: #fffbff; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #ebd8d0; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #d3ab9e; color: #fffbff; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Yarnify Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fffbff;">
  <div style="background: linear-gradient(to right, #d3ab9e, #eac9c1); padding: 20px; text-align: center;">
    <h1 style="color: #fffbff; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #ebd8d0; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #d3ab9e; color: #fffbff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Yarnify Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;


export const WELCOME_EMAIL_TEMPLATE = `
Put your HTML text here<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Welcome Email</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #fffafb;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 480px;
    margin: 0 auto;
    background-color: #fffbff;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    border: 1px solid #ebd8d0;
  }
  h1 {
    color: #d3ab9e;
    font-size: 28px;
    font-weight: bold;
  }
  h2 {
    color: #d3ab9e;
    font-size: 22px;
  }
  p {
    color: #333;
    font-size: 16px;
    line-height: 1.5;
  }
  .button {
    display: inline-block;
    margin-top: 15px;
    padding: 12px 24px;
    background-color: #d3ab9e;
    color: white;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
  }
  img {
    width: 100%;
    border-radius: 8px;
    margin: 10px 0;
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Yarnify</h1>
    <img src="https://images.unsplash.com/photo-1589998059171-988d887df646?w=800" alt="Yarn shop" />
    <h2>Welcome, {username}!</h2>
    <p>
      Thanks for choosing <strong>Yarnify</strong>!<br />
      We are happy to see you on board.
    </p>
    <p>To get started, do this next step:</p>
    <a href="{next_step_link}" class="button">Next Step</a>
  </div>
</body>
</html>
`