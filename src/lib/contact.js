/**
 * Validates contact form fields and returns per-field error messages.
 * @param {{ name: string; email: string; message: string }} fields
 */
export function validateContact({ name, email, message }) {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  const nameError = trimmedName ? '' : 'Write your name.';
  const emailError = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    ? ''
    : 'Write an email address with an @ symbol.';
  const messageError = trimmedMessage
    ? ''
    : 'Write a short note about what you would like to discuss.';

  return {
    valid: !nameError && !emailError && !messageError,
    nameError,
    emailError,
    messageError,
    trimmed: {
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    },
  };
}

/**
 * Builds a mailto URI populated with the visitor's enquiry.
 * @param {{ name: string; email: string; message: string }} fields
 */
export function buildContactMailto({ name, email, message }) {
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
  return `mailto:paarangatj@gmail.com?subject=${subject}&body=${body}`;
}
