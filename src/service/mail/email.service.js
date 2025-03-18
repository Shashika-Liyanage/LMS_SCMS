import emailjs from '@emailjs/browser';
import emailConfig from '../../config/emailjs.config';


emailjs.init(emailConfig.userId);

// Email HTML template
const EMAIL_TEMPLATE = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
  <div style="text-align: center; padding: 10px 0; background-color: #f5f5f5; margin-bottom: 20px;">
    <h2 style="color: #333; margin: 0;">Welcome to Our System</h2>
  </div>
  
  <p style="margin-bottom: 20px; font-size: 16px; color: #333;">Dear {{to_name}},</p>
  
  <p style="margin-bottom: 15px; font-size: 16px; line-height: 1.5; color: #333;">
    We're pleased to welcome you to our platform. Your account has been successfully created.
    Please find your login credentials below:
  </p>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
    <p style="margin: 5px 0; font-size: 16px;"><strong>Username:</strong> {{username}}</p>
    <p style="margin: 5px 0; font-size: 16px;"><strong>Password:</strong> {{password}}</p>
  </div>
  
  <p style="margin-top: 20px; margin-bottom: 15px; font-size: 16px; color: #333;">
    {{message}}
  </p>
  
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #777;">
    <p>If you have any questions, please don't hesitate to contact our support team.</p>
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</div>
`;

// General function to send email with custom HTML
// Below function not using at this moment
export const sendCustomEmail = async (to, subject, templateParams, e) => {

    try {

        // For EmailJS's custom HTML approach, we need a template that accepts 'html_content'
        // You'll need to create a template in EmailJS that has a variable {{html_content}}
        // const response = await emailjs.send(
        //   emailConfig.serviceId,
        //   emailConfig.templateId,
        //   {
        //     publicKey: emailConfig.publicKey,
        //     to_email: to,
        //     subject: subject,
        //     html_content: replacePlaceholders(EMAIL_TEMPLATE, templateParams)
        //   }
        // );

        // if (response.status !== 200) {
        //   throw new Error('Failed to send email');
        // }

        emailjs
            .sendForm(emailConfig.serviceId, emailConfig.templateId, e, { publicKey: emailConfig.publicKey, })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error);
                },
            );

        //return response;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// Helper function to replace placeholders in the template
function replacePlaceholders(template, params) {
    let result = template;
    Object.keys(params).forEach(key => {
        const placeholder = new RegExp(`{{${key}}}`, 'g');
        result = result.replace(placeholder, params[key]);
    });
    return result;
}

// Standard EmailJS approach using their template system
export const sendEmail = async (templateParams) => {
    console.log("send mailcall");
    
    try {
        const response = await emailjs.send(
            emailConfig.serviceId,
            emailConfig.templateId,
            templateParams, {
            publicKey: emailConfig.publicKey,
        }
        );

        if (response.status !== 200) {
            throw new Error('Failed to send email');
        }

        return response;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// Specific function for sending credentials
export const sendCredentialsEmail = async (studentEmail, username, password, studentName, e) => {
    const templateParams = {
        to_name: studentName,
        username: username,
        password: password,
        message: `Please change your password upon your first login for security purposes.`
    };

    // You can choose which approach to use:
    // return await sendEmail(templateParams);  // Using EmailJS templates
    return await sendCustomEmail(studentEmail, 'Your Login Credentials', templateParams, e);  // Using custom HTML
};




//there are lot of unnessorys  please refactor the code