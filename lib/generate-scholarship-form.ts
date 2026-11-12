import jsPDF from 'jspdf';
import { ScholarshipReceiptData } from './generate-scholarship-receipt';

/**
 * Converts numeric amount to Indian English currency words.
 */
function numberToWordsINR(amount: number): string {
  const singleDigits = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  ];
  const teens = [
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen',
  ];
  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety',
  ];

  function convertTwoDigits(num: number): string {
    if (num === 0) return '';
    if (num < 10) return singleDigits[num];
    if (num < 20) return teens[num - 10];
    const unit = num % 10;
    return tens[Math.floor(num / 10)] + (unit ? ' ' + singleDigits[unit] : '');
  }

  function convertThreeDigits(num: number): string {
    const hundred = Math.floor(num / 100);
    const remainder = num % 100;
    let result = '';
    if (hundred > 0) {
      result += singleDigits[hundred] + ' Hundred';
      if (remainder > 0) result += ' and ';
    }
    if (remainder > 0) {
      result += convertTwoDigits(remainder);
    }
    return result;
  }

  const intVal = Math.floor(amount);
  if (intVal === 0) return 'Zero Rupees Only';

  const crore = Math.floor(intVal / 10000000);
  const lakh = Math.floor((intVal % 10000000) / 100000);
  const thousand = Math.floor((intVal % 100000) / 1000);
  const hundredAndBelow = intVal % 1000;

  const parts: string[] = [];
  if (crore > 0) parts.push(convertThreeDigits(crore) + ' Crore');
  if (lakh > 0) parts.push(convertTwoDigits(lakh) + ' Lakh');
  if (thousand > 0) parts.push(convertTwoDigits(thousand) + ' Thousand');
  if (hundredAndBelow > 0) parts.push(convertThreeDigits(hundredAndBelow));

  return parts.join(' ') + ' Rupees Only';
}

/**
 * Generates an official Buniyad Scholarship Registration Application Form PDF.
 */
export async function generateScholarshipForm(
  data: ScholarshipReceiptData,
  autoDownload: boolean = true
): Promise<jsPDF> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 10;

  const teal = [15, 74, 92]; // #0f4a5c
  const gold = [184, 134, 11]; // #b8860b
  const darkGray = [30, 41, 59];
  const mutedGray = [100, 116, 139];
  const lightBg = [245, 250, 251];
  const borderGray = [210, 222, 228];

  let base64Logo = '';
  try {
    if (typeof window !== 'undefined') {
      const response = await fetch('/careplus-logo-final.png');
      const blob = await response.blob();
      base64Logo = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    }
  } catch (e) {
    console.warn('Could not load logo for scholarship form PDF', e);
  }

  // Background Watermark
  if (base64Logo) {
    try {
      doc.setGState(new (doc as any).GState({ opacity: 0.06 }));
      doc.addImage(base64Logo, 'PNG', (pageWidth - 140) / 2, (pageHeight - 140) / 2 + 10, 140, 140);
      doc.setGState(new (doc as any).GState({ opacity: 1 }));
    } catch (e) {
      console.warn('Could not apply watermark opacity', e);
    }
  }

  // Outer decorative double border
  doc.setDrawColor(teal[0], teal[1], teal[2]);
  doc.setLineWidth(1.2);
  doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.4);
  doc.rect(margin + 1.8, margin + 1.8, pageWidth - (margin + 1.8) * 2, pageHeight - (margin + 1.8) * 2);

  // Header Box
  doc.setFillColor(255, 255, 255);
  doc.rect(margin + 2.5, margin + 2.5, pageWidth - (margin + 2.5) * 2, 28, 'F');

  // Header Logo
  if (base64Logo) {
    doc.addImage(base64Logo, 'PNG', margin + 5, margin + 4, 22, 22);
  }

  // Header Typography
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('CARE PLUS FOUNDATION TRUST', pageWidth / 2 + 8, margin + 9, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('"Together, We Create Change" • An Educational Initiative', pageWidth / 2 + 8, margin + 14, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(
    'Registered under Indian Trust Act 1882 | Reg No: 2026/10/IV/1162 | NITI Aayog NGO DARPAN ID: DL/2026/1190987',
    pageWidth / 2 + 8,
    margin + 19,
    { align: 'center' }
  );
  doc.text(
    'Head Office: B-6 FIRST FLOOR KALKAJI, NEW DELHI – 110019 | Email: careplusfoundation19@gmail.com',
    pageWidth / 2 + 8,
    margin + 23.5,
    { align: 'center' }
  );

  let currentY = margin + 30;

  // Title Ribbon
  doc.setFillColor(teal[0], teal[1], teal[2]);
  doc.roundedRect(margin + 8, currentY, pageWidth - (margin + 8) * 2, 8.5, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(
    'BUNIYAD SCHOLARSHIP EXAM 2026–27 • STUDENT REGISTRATION FORM',
    pageWidth / 2,
    currentY + 5.8,
    { align: 'center' }
  );

  currentY += 12;

  // Top Box: Enrollment Bar on Left, Photo Box on Right
  const photoWidth = 32;
  const photoHeight = 39;
  const photoX = pageWidth - margin - 4 - photoWidth;
  const photoY = currentY;

  // Photo Frame
  doc.setFillColor(250, 250, 250);
  doc.setDrawColor(teal[0], teal[1], teal[2]);
  doc.setLineWidth(0.4);
  doc.rect(photoX, photoY, photoWidth, photoHeight, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('AFFIX RECENT', photoX + photoWidth / 2, photoY + 14, { align: 'center' });
  doc.text('PASSPORT SIZE', photoX + photoWidth / 2, photoY + 18, { align: 'center' });
  doc.text('COLOUR', photoX + photoWidth / 2, photoY + 22, { align: 'center' });
  doc.text('PHOTOGRAPH', photoX + photoWidth / 2, photoY + 26, { align: 'center' });
  doc.text('(SELF-ATTESTED)', photoX + photoWidth / 2, photoY + 30, { align: 'center' });

  // Left Details beside photo
  const leftBoxWidth = photoX - (margin + 4) - 3;
  
  // Enrollment & Verification Box
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(teal[0], teal[1], teal[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin + 4, currentY, leftBoxWidth, 20, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('OFFICIAL ENROLLMENT NUMBER:', margin + 8, currentY + 6);
  doc.setFontSize(13);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text(data.enrollmentNumber, margin + 8, currentY + 14);

  const regDate =
    data.createdAt instanceof Date
      ? data.createdAt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      : new Date(data.createdAt).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('DATE OF REGISTRATION:', margin + leftBoxWidth - 55, currentY + 6);
  doc.setFontSize(9);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(regDate, margin + leftBoxWidth - 55, currentY + 13.5);

  // Status & Fee Badge Box below enrollment
  const feeBoxY = currentY + 22;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 4, feeBoxY, leftBoxWidth, 17, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('REGISTRATION FEE:', margin + 8, feeBoxY + 6);
  doc.setFontSize(10.5);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text(`INR ${data.amount || 199}/-`, margin + 8, feeBoxY + 13);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('PAYMENT STATUS:', margin + 50, feeBoxY + 6);
  doc.setFontSize(9);
  doc.setTextColor(34, 139, 34);
  doc.text('PAID / CONFIRMED', margin + 50, feeBoxY + 13);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('EXAM MODE:', margin + leftBoxWidth - 45, feeBoxY + 6);
  doc.setFontSize(9);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('OFFLINE EXAM', margin + leftBoxWidth - 45, feeBoxY + 13);

  currentY += 42;

  // 1. Candidate / Student Details Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text('1. CANDIDATE / STUDENT INFORMATION', margin + 5, currentY);

  currentY += 2.5;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 4, currentY, pageWidth - (margin + 4) * 2, 36, 2, 2, 'FD');

  const sRow1 = [
    { label: 'Student Name:', value: data.studentName },
    { label: 'Class & Section:', value: `${data.class}${data.section ? ' (' + data.section + ')' : ''}` },
    { label: 'Date of Birth:', value: data.dob },
    { label: 'Gender:', value: data.gender },
  ];

  let sy = currentY + 5.5;
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Student Full Name:', margin + 8, sy);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(data.studentName, margin + 40, sy);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Class & Section:', pageWidth / 2 + 10, sy);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(`${data.class}${data.section ? ' (' + data.section + ')' : ''}`, pageWidth / 2 + 38, sy);

  sy += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Date of Birth:', margin + 8, sy);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(data.dob || 'N/A', margin + 40, sy);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Gender:', pageWidth / 2 + 10, sy);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(data.gender || 'N/A', pageWidth / 2 + 38, sy);

  sy += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Category / Religion:', margin + 8, sy);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(`${data.category || 'General'} / ${data.religion || 'N/A'}`, margin + 40, sy);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Student Mobile:', pageWidth / 2 + 10, sy);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(data.studentMobile || 'N/A', pageWidth / 2 + 38, sy);

  sy += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('School Name:', margin + 8, sy);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  const schoolText = [data.schoolName, data.schoolAddress].filter(Boolean).join(' - ');
  const splitSchool = doc.splitTextToSize(schoolText, pageWidth - margin * 2 - 50);
  doc.text(splitSchool[0] || 'N/A', margin + 40, sy);

  currentY += 40;

  // 2. Parent / Guardian Details Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text('2. PARENT / GUARDIAN & RESIDENTIAL DETAILS', margin + 5, currentY);

  currentY += 2.5;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 4, currentY, pageWidth - (margin + 4) * 2, 35, 2, 2, 'FD');

  let py = currentY + 5.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text("Father's / Guardian:", margin + 8, py);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(data.parentName, margin + 40, py);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text("Mother's Name:", pageWidth / 2 + 10, py);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(data.motherName || 'N/A', pageWidth / 2 + 38, py);

  py += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Parent Mobile No:', margin + 8, py);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(data.parentMobile, margin + 40, py);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Email Address:', pageWidth / 2 + 10, py);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(data.email || 'N/A', pageWidth / 2 + 38, py);

  py += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Residential Address:', margin + 8, py);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  const splitAddr = doc.splitTextToSize(data.address || 'N/A', pageWidth - margin * 2 - 50);
  doc.text(splitAddr[0] || 'N/A', margin + 40, py);

  py += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('City, State & PIN:', margin + 8, py);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  const fullLoc = [data.city, data.state, data.pinCode ? `PIN: ${data.pinCode}` : ''].filter(Boolean).join(', ');
  doc.text(fullLoc || 'N/A', margin + 40, py);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Referral ID / Ref:', pageWidth / 2 + 10, py);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(data.referralId || 'Direct Submission', pageWidth / 2 + 38, py);

  currentY += 39;

  // 3. Payment & Transaction Verification Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text('3. EXAMINATION FEE PAYMENT DETAILS', margin + 5, currentY);

  currentY += 2.5;
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 4, currentY, pageWidth - (margin + 4) * 2, 22, 2, 2, 'FD');

  let ty = currentY + 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Registration Fee:', margin + 8, ty);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text(`INR ${data.amount || 199}/- (${numberToWordsINR(data.amount || 199)})`, margin + 35, ty);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Payment Gateway:', pageWidth / 2 + 20, ty);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Online (Razorpay)', pageWidth / 2 + 50, ty);

  ty += 7.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Razorpay Order ID:', margin + 8, ty);
  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(data.razorpayOrderId || 'N/A', margin + 35, ty);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Razorpay Payment ID:', pageWidth / 2 + 10, ty);
  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text(data.razorpayPaymentId || 'N/A', pageWidth / 2 + 45, ty);

  currentY += 26;

  // 4. Candidate & Parent Declaration Section
  doc.setFillColor(255, 252, 240);
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 4, currentY, pageWidth - (margin + 4) * 2, 21, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('DECLARATION & UNDERTAKING BY CANDIDATE & PARENT:', margin + 8, currentY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  const declText = [
    '1. I hereby declare that all the statements and particulars furnished in this application form are true, complete and correct to the best of my knowledge.',
    '2. I have read and agree to all rules, eligibility guidelines, and terms & conditions of the Buniyad Scholarship Examination 2026–27.',
    '3. I understand that the registration fee of INR 199 is strictly non-refundable and non-transferable under any circumstances.',
    '4. I will abide by all examination rules and produce the original Admit Card and Photo ID at the examination venue.',
  ];

  let dy = currentY + 8.5;
  declText.forEach((l) => {
    doc.text(l, margin + 8, dy);
    dy += 3.2;
  });

  currentY += 25;

  // 5. Signature Blocks
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.3);

  // Line 1: Student
  const col1X = margin + 18;
  doc.line(col1X - 12, currentY + 12, col1X + 32, currentY + 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Signature of Candidate', col1X + 10, currentY + 16, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('(To be signed by student)', col1X + 10, currentY + 19.5, { align: 'center' });

  // Line 2: Parent
  const col2X = pageWidth / 2;
  doc.line(col2X - 22, currentY + 12, col2X + 22, currentY + 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Signature of Parent / Guardian', col2X, currentY + 16, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('(Father / Mother / Guardian)', col2X, currentY + 19.5, { align: 'center' });

  // Line 3: Officer / Office Seal
  const col3X = pageWidth - margin - 28;
  doc.line(col3X - 24, currentY + 12, col3X + 20, currentY + 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text('Authorized Signatory & Seal', col3X - 2, currentY + 16, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Buniyad Examination Board', col3X - 2, currentY + 19.5, { align: 'center' });

  if (autoDownload) {
    const filename = `Buniyad_Scholarship_Form_${data.enrollmentNumber || 'CPF'}.pdf`;
    doc.save(filename);
  }

  return doc;
}

/**
 * Triggers native browser print dialog for Scholarship Application Form.
 */
export async function printScholarshipForm(data: ScholarshipReceiptData): Promise<void> {
  const doc = await generateScholarshipForm(data, false);
  doc.autoPrint();
  const blobUrl = doc.output('bloburl');
  window.open(blobUrl, '_blank');
}
