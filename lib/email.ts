import nodemailer from 'nodemailer';

export function getEmailTransporter() {
  const user = process.env.SMTP_USER || 'careplusfoundation19@gmail.com';
  const pass = process.env.SMTP_PASS || 'iznpaseggfakgypz';

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends a confirmation email to the student/parent and admin upon successful scholarship registration.
 */
export async function sendScholarshipConfirmationEmail(application: any) {
  try {
    const transporter = getEmailTransporter();
    const adminEmail = process.env.CONTACT_RECEIVER_EMAIL || 'careplusfoundation19@gmail.com';
    const studentEmail = application.email ? application.email.trim() : null;

    // Recipients list: student email if provided, plus admin
    const recipients: string[] = [adminEmail];
    if (studentEmail && studentEmail !== adminEmail && studentEmail.includes('@')) {
      recipients.push(studentEmail);
    }

    const regDate = application.created_at
      ? new Date(application.created_at).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : new Date().toLocaleDateString('en-IN');

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Scholarship Registration Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f3f7f9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #2d3748;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f3f7f9; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Email Container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0a313d 0%, #0f4a5c 100%); padding: 30px 25px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">Care Plus Foundation Trust</h1>
              <p style="margin: 5px 0 0 0; font-size: 13px; color: #e0d0a5; font-style: italic;">"Together, We Create Change" • An Educational Initiative</p>
              <div style="margin-top: 15px; display: inline-block; background-color: rgba(255, 255, 255, 0.15); padding: 6px 16px; border-radius: 20px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; font-weight: bold;">
                NITI Aayog NGO DARPAN ID: DL/2026/1190987
              </div>
            </td>
          </tr>

          <!-- Success Alert Header -->
          <tr>
            <td style="padding: 30px 30px 20px 30px; text-align: center;">
              <div style="width: 60px; height: 60px; background-color: #e6f7ec; border-radius: 50%; margin: 0 auto 15px auto; display: table;">
                <span style="display: table-cell; vertical-align: middle; font-size: 32px; color: #22c55e;">✓</span>
              </div>
              <h2 style="margin: 0 0 8px 0; color: #0f4a5c; font-size: 24px; font-weight: 800;">Registration Confirmed!</h2>
              <p style="margin: 0; color: #4a5568; font-size: 15px; line-height: 1.6;">
                Dear <strong>${application.student_name}</strong> & Parent/Guardian <strong>${application.parent_name}</strong>,<br>
                Your registration for the <strong>Buniyad Scholarship Examination 2026–27</strong> has been successfully confirmed and your registration fee has been received.
              </p>
            </td>
          </tr>

          <!-- Enrollment Box -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <div style="background: linear-gradient(135deg, #f0fdfa 0%, #e6fffa 100%); border: 2px dashed #0f4a5c; border-radius: 12px; padding: 20px; text-align: center;">
                <p style="margin: 0 0 5px 0; font-size: 11px; font-weight: 800; color: #0f4a5c; text-transform: uppercase; letter-spacing: 1.5px;">Your Official Enrollment Number</p>
                <h3 style="margin: 0; font-size: 30px; font-weight: 900; color: #0a313d; font-family: monospace; letter-spacing: 1px;">${application.enrollment_number || 'BSE26-PENDING'}</h3>
                <p style="margin: 8px 0 0 0; font-size: 12px; color: #0d9488; font-weight: 600;">Please save this enrollment number for your Admit Card download & exam entry.</p>
              </div>
            </td>
          </tr>

          <!-- Candidate & School Details Table -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <h4 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 800; color: #0f4a5c; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px;">
                1. Candidate & School Information
              </h4>
              <table width="100%" cellspacing="0" cellpadding="6" style="font-size: 13px; border-collapse: collapse; background-color: #fafbfc; border-radius: 8px;">
                <tr>
                  <td width="35%" style="color: #718096; font-weight: 600; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">Student Name:</td>
                  <td width="65%" style="color: #1a202c; font-weight: 700; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">${application.student_name}</td>
                </tr>
                <tr>
                  <td style="color: #718096; font-weight: 600; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">Class & Section:</td>
                  <td style="color: #1a202c; font-weight: 700; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">${application.class} ${application.section ? `(${application.section})` : ''}</td>
                </tr>
                <tr>
                  <td style="color: #718096; font-weight: 600; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">Date of Birth / Gender:</td>
                  <td style="color: #1a202c; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">${application.dob || 'N/A'} • ${application.gender || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="color: #718096; font-weight: 600; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">Category / Religion:</td>
                  <td style="color: #1a202c; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">${application.category || 'General'} / ${application.religion || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="color: #718096; font-weight: 600; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">School Name:</td>
                  <td style="color: #1a202c; font-weight: 600; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">${application.school_name}</td>
                </tr>
                ${application.school_address ? `
                <tr>
                  <td style="color: #718096; font-weight: 600; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">School Address:</td>
                  <td style="color: #1a202c; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">${application.school_address}</td>
                </tr>` : ''}
              </table>
            </td>
          </tr>

          <!-- Parent & Contact Details Table -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <h4 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 800; color: #0f4a5c; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px;">
                2. Parent / Guardian & Address
              </h4>
              <table width="100%" cellspacing="0" cellpadding="6" style="font-size: 13px; border-collapse: collapse; background-color: #fafbfc; border-radius: 8px;">
                <tr>
                  <td width="35%" style="color: #718096; font-weight: 600; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">Father / Guardian:</td>
                  <td width="65%" style="color: #1a202c; font-weight: 700; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">${application.parent_name}</td>
                </tr>
                ${application.mother_name ? `
                <tr>
                  <td style="color: #718096; font-weight: 600; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">Mother's Name:</td>
                  <td style="color: #1a202c; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">${application.mother_name}</td>
                </tr>` : ''}
                <tr>
                  <td style="color: #718096; font-weight: 600; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">Parent Mobile No:</td>
                  <td style="color: #0f4a5c; font-weight: 700; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">${application.parent_mobile}</td>
                </tr>
                <tr>
                  <td style="color: #718096; font-weight: 600; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">Residential Address:</td>
                  <td style="color: #1a202c; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">${application.address}${application.city ? ', ' + application.city : ''}${application.state ? ', ' + application.state : ''}${application.pin_code ? ' - ' + application.pin_code : ''}</td>
                </tr>
                ${application.referral_id ? `
                <tr>
                  <td style="color: #718096; font-weight: 600; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">Referral ID:</td>
                  <td style="color: #0f4a5c; font-weight: 600; padding: 8px 12px; border-bottom: 1px solid #edf2f7;">${application.referral_id}</td>
                </tr>` : ''}
              </table>
            </td>
          </tr>

          <!-- Fee & Payment Details Table -->
          <tr>
            <td style="padding: 0 30px 25px 30px;">
              <h4 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 800; color: #0f4a5c; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px;">
                3. Payment Summary
              </h4>
              <table width="100%" cellspacing="0" cellpadding="8" style="font-size: 13px; border-collapse: collapse; background-color: #f7fafc; border-left: 4px solid #b8860b; border-radius: 4px;">
                <tr>
                  <td width="35%" style="color: #718096; font-weight: 600;">Registration Fee:</td>
                  <td width="65%" style="color: #0f4a5c; font-weight: 800; font-size: 16px;">₹${application.amount || 199}</td>
                </tr>
                <tr>
                  <td style="color: #718096; font-weight: 600;">Payment Status:</td>
                  <td style="color: #16a34a; font-weight: 700;">CONFIRMED / SUCCESSFUL</td>
                </tr>
                <tr>
                  <td style="color: #718096; font-weight: 600;">Payment Date:</td>
                  <td style="color: #1a202c;">${regDate}</td>
                </tr>
                <tr>
                  <td style="color: #718096; font-weight: 600;">Payment ID:</td>
                  <td style="color: #1a202c; font-family: monospace;">${application.razorpay_payment_id || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="color: #718096; font-weight: 600;">Order ID:</td>
                  <td style="color: #1a202c; font-family: monospace;">${application.razorpay_order_id || 'N/A'}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Important Instructions -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 10px; padding: 16px; font-size: 12px; color: #92400e; line-height: 1.6;">
                <strong>IMPORTANT NOTICE FOR STUDENTS:</strong><br>
                • Keep your Enrollment Number (<strong>${application.enrollment_number}</strong>) secure for future references.<br>
                • Examination date, syllabus, and admit card download links will be communicated via SMS and our official website.<br>
                • Registration fee of ₹199 is strictly non-refundable and non-transferable under any circumstances.<br>
                • For any questions, please contact our helpdesk at <strong>careplusfoundation19@gmail.com</strong> or call <strong>9315152763</strong>.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0a313d; padding: 25px 30px; text-align: center; color: #a0aec0; font-size: 12px; line-height: 1.6;">
              <strong style="color: #ffffff;">Care Plus Foundation Trust</strong><br>
              Registered under The Charitable and Religious Trust Act, 1920 (Reg No: 2026/10/IV/1162)<br>
              B-6 First Floor Kalkaji, New Delhi – 110019<br>
              Website: <a href="https://www.careplusfoundation.org" style="color: #d4af37; text-decoration: none;">www.careplusfoundation.org</a> | Email: <a href="mailto:careplusfoundation19@gmail.com" style="color: #d4af37; text-decoration: none;">careplusfoundation19@gmail.com</a><br>
              <span style="color: #718096; font-size: 11px; margin-top: 10px; display: inline-block;">© ${new Date().getFullYear()} Care Plus Foundation Trust. All rights reserved.</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const mailOptions = {
      from: `"Care Plus Foundation" <${process.env.SMTP_USER || 'careplusfoundation19@gmail.com'}>`,
      to: recipients.join(', '),
      subject: `Registration Confirmed: Buniyad Scholarship Exam 2026–27 (Enrollment: ${application.enrollment_number})`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Scholarship confirmation email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('Error sending scholarship confirmation email:', error);
    // Don't crash payment verification if email fails
    return { success: false, error: error.message };
  }
}

/**
 * Sends a confirmation email for donations with 80G tax exemption details.
 */
export async function sendDonationConfirmationEmail(donation: any, donor: any) {
  try {
    const transporter = getEmailTransporter();
    const adminEmail = process.env.CONTACT_RECEIVER_EMAIL || 'careplusfoundation19@gmail.com';
    const donorEmail = donor.email ? donor.email.trim() : null;

    const recipients: string[] = [adminEmail];
    if (donorEmail && donorEmail !== adminEmail && donorEmail.includes('@')) {
      recipients.push(donorEmail);
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Donation Confirmation & 80G Receipt</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f7f9; font-family: Helvetica, Arial, sans-serif; color: #2d3748;">
  <table width="100%" cellspacing="0" cellpadding="0" style="padding: 30px 10px;">
    <tr>
      <td align="center">
        <table width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <tr>
            <td style="background: linear-gradient(135deg, #0a313d 0%, #0f4a5c 100%); padding: 30px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 800;">CARE PLUS FOUNDATION TRUST</h1>
              <p style="margin: 5px 0 0; color: #d4af37; font-style: italic;">"Together, We Create Change"</p>
              <div style="margin-top: 10px; background: rgba(255,255,255,0.15); display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 11px;">
                DARPAN ID: DL/2026/1190987 | 80G Tax Exemption
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; text-align: center;">
              <h2 style="color: #0f4a5c; margin-top: 0;">Thank You For Your Generous Support!</h2>
              <p style="color: #4a5568; font-size: 15px; line-height: 1.6;">
                Dear <strong>${donor.name}</strong>,<br>
                Thank you for your generous contribution of <strong>₹${donation.amount}</strong> to Care Plus Foundation Trust. Your support directly empowers education, health, and child welfare initiatives.
              </p>
              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 15px; margin: 20px 0; text-align: left; font-size: 13px;">
                <p style="margin: 3px 0;"><strong>Donation Amount:</strong> ₹${donation.amount}</p>
                <p style="margin: 3px 0;"><strong>Payment ID:</strong> ${donation.razorpay_payment_id || 'N/A'}</p>
                <p style="margin: 3px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                <p style="margin: 3px 0;"><strong>Status:</strong> SUCCESS / CONFIRMED</p>
              </div>
              <p style="font-size: 12px; color: #718096;">
                Donations are eligible for tax deduction under Section 80G of the Income Tax Act. You can download your official 80G receipt directly on the confirmation page.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background: #0a313d; padding: 20px; text-align: center; color: #a0aec0; font-size: 12px;">
              Care Plus Foundation Trust | B-6 First Floor Kalkaji, New Delhi – 110019<br>
              Email: careplusfoundation19@gmail.com
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const mailOptions = {
      from: `"Care Plus Foundation" <${process.env.SMTP_USER || 'careplusfoundation19@gmail.com'}>`,
      to: recipients.join(', '),
      subject: `Thank you for your donation of ₹${donation.amount} | Care Plus Foundation`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Donation confirmation email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('Error sending donation confirmation email:', error);
    return { success: false, error: error.message };
  }
}
