export const GenderOptions = ["Male", "Female", "Prefer not to say"];

export const PasswordRules = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters",
  },
  maxLength: {
    value: 32,
    message: "Password must not exceed 32 characters",
  },
  validate: {
    hasUppercase: (value) =>
      /[A-Z]/.test(value) || "Must include an uppercase letter",
    hasLowercase: (value) =>
      /[a-z]/.test(value) || "Must include a lowercase letter",
    hasNumber: (value) => /[0-9]/.test(value) || "Must include a number",
    hasSpecialChar: (value) =>
      /[!@#$%^&*()]/.test(value) || "Must include a special character",
  },
};

export const NotificationType = {
  like: "like",
  comment: "comment",
  quote: "quote",
};

export const NotificationTarget = {
  post: "post",
  comment: "comment",
};
