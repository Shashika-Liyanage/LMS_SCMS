const emailConfig = {
    serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
    templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
    from: process.env.REACT_APP_EMAIL_FROM || 'noreply@yourdomain.com'
};

export default emailConfig;