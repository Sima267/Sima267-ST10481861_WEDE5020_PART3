// contact-form.js
// Client-side validation and mailto composer for contact form

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const showError = (el, msg) => {
    let err = el.parentNode.querySelector('.error-msg');
    if (!err) {
      err = document.createElement('div');
      err.className = 'error-msg';
      err.style.color = '#a00';
      err.style.marginTop = '6px';
      el.parentNode.appendChild(err);
    }
    err.textContent = msg;
    el.setAttribute('aria-invalid', 'true');
  };

  const clearError = (el) => {
    const err = el.parentNode.querySelector('.error-msg');
    if (err) err.textContent = '';
    el.removeAttribute('aria-invalid');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const phone = form.querySelector('[name="phone"]');
    const type = form.querySelector('[name="type"]');
    const message = form.querySelector('[name="message"]');

    let valid = true;
    if (!name.value.trim()) { showError(name, 'Please enter your name.'); valid = false; } else clearError(name);
    if (!email.value.trim() || !isEmail(email.value)) { showError(email, 'Please enter a valid email address.'); valid = false; } else clearError(email);
    if (!message.value.trim() || message.value.trim().length < 10) { showError(message, 'Please enter a message (min 10 characters).'); valid = false; } else clearError(message);

    if (!valid) return;

    // Compose mailto: link
    const recipient = 'info@trendthreads.com'; // change to your organisation email if needed
    const subject = encodeURIComponent(`[Contact] ${type.value || 'General'} - ${name.value}`);
    const bodyLines = [
      `Name: ${name.value}`,
      `Email: ${email.value}`,
      `Phone: ${phone.value || 'N/A'}`,
      `Type: ${type.value || 'N/A'}`,
      '',
      'Message:',
      message.value
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    const mailto = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Open user's email client
    window.location.href = mailto;

    // Show inline confirmation
    let conf = form.querySelector('.form-success');
    if (!conf) {
      conf = document.createElement('div');
      conf.className = 'form-success';
      conf.style.color = '#085';
      conf.style.marginTop = '10px';
      form.appendChild(conf);
    }
    conf.textContent = 'Your email client should open with the message. Please press Send to complete the enquiry. Thank you!';
    form.reset();
  });
});