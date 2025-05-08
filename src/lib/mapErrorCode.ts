export function mapErrorCode(code: number): string {
  console.log(code, "code");
  switch (code) {
    case 2:
      return "Request body is empty.";
    case 10:
      return "Invalid email address.";
    case 11:
      return "This email is already used.";
    case 12:
      return "Email is too long (max 64 characters).";
    case 20:
      return "Password is too short (min 8 characters).";
    case 21:
      return "Password is too long (max 255 characters).";
    case 30:
      return "Wrong email or password.";
    case 31:
      return "Too many requests. Please try again later.";
    case 32:
      return "Email not verified yet.";
    case 40:
      return "Invalid token.";
    case 41:
      return "Token expired.";
    case 50:
      return "Requested resource not found.";
    default:
      return "An unknown error occurred.";
  }
}
