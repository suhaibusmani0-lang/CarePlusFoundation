import jsPDF from 'jspdf';

export interface ScholarshipReceiptData {
  enrollmentNumber: string;
  studentName: string;
  dob: string;
  gender: string;
  class: string;
  section?: string | null;
  schoolName: string;
  schoolAddress?: string | null;
  studentMobile?: string | null;
  parentName: string;
  motherName?: string | null;
  parentMobile: string;
  email?: string | null;
  address: string;
  city?: string | null;
  state?: string | null;
  pinCode?: string | null;
  category?: string | null;
  religion?: string | null;
  referralId?: string | null;
  amount: number;
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  status: string;
  createdAt: string | Date;
}

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
 * Generates an official Buniyad Scholarship Registration & Fee Receipt PDF.
 */
export async function generateScholarshipReceipt(
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
  const margin = 12;

  const teal = [15, 74, 92]; // #0f4a5c
  const gold = [184, 134, 11]; // #b8860b
  const darkGray = [30, 41, 59];
  const mutedGray = [100, 116, 139];
  const lightBg = [245, 250, 251];
  const borderGray = [220, 230, 235];

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
    console.warn('Could not load logo for scholarship receipt PDF', e);
  }

  // Background Watermark
  if (base64Logo) {
    try {
      doc.setGState(new (doc as any).GState({ opacity: 0.07 }));
      doc.addImage(base64Logo, 'PNG', (pageWidth - 130) / 2, (pageHeight - 130) / 2 + 5, 130, 130);
      doc.setGState(new (doc as any).GState({ opacity: 1 }));
    } catch (e) {
      console.warn('Could not apply watermark opacity', e);
    }
  }

  // Outer decorative border
  doc.setDrawColor(teal[0], teal[1], teal[2]);
  doc.setLineWidth(1.2);
  doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);

  // Inner subtle border
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.4);
  doc.rect(margin + 2, margin + 2, pageWidth - (margin + 2) * 2, pageHeight - (margin + 2) * 2);

  // Header Box
  doc.setFillColor(255, 255, 255);
  doc.rect(margin + 3, margin + 3, pageWidth - (margin + 3) * 2, 34, 'F');
  
  // Header Logo
  if (base64Logo) {
    doc.addImage(base64Logo, 'PNG', margin + 6, margin + 5, 26, 26);
  }

  // Header Text
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('CARE PLUS FOUNDATION TRUST', pageWidth / 2 + 8, margin + 10, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('"Together, We Create Change" • An Educational & Social Welfare Initiative', pageWidth / 2 + 8, margin + 15, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(
    'Registered under The Charitable and Religious Trust Act, 1920 | Reg No: 2026/10/IV/1162',
    pageWidth / 2 + 8,
    margin + 21,
    { align: 'center' }
  );
  doc.text(
    'NITI Aayog NGO DARPAN ID: DL/2026/1190987 | Email: careplusfoundation19@gmail.com',
    pageWidth / 2 + 8,
    margin + 25.5,
    { align: 'center' }
  );
  doc.text(
    'Address: B-6 FIRST FLOOR KALKAJI, NEW DELHI – 110019',
    pageWidth / 2 + 8,
    margin + 30,
    { align: 'center' }
  );

  let currentY = margin + 38;

  // Title Ribbon
  doc.setFillColor(teal[0], teal[1], teal[2]);
  doc.roundedRect(margin + 10, currentY, pageWidth - (margin + 10) * 2, 9, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(255, 255, 255);
  doc.text(
    'BUNIYAD SCHOLARSHIP EXAM 2026–27 • REGISTRATION & FEE RECEIPT',
    pageWidth / 2,
    currentY + 6.2,
    { align: 'center' }
  );

  currentY += 13;

  // Top Key Info Card (Enrollment Number & Date Bar)
  const regDate =
    data.createdAt instanceof Date
      ? data.createdAt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      : new Date(data.createdAt).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });

  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(teal[0], teal[1], teal[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin + 4, currentY, pageWidth - (margin + 4) * 2, 17, 2, 2, 'FD');

  // Left: Enrollment Number
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('ENROLLMENT NO:', margin + 8, currentY + 6);
  doc.setFontSize(12);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text(data.enrollmentNumber, margin + 8, currentY + 12.5);

  // Center: Registration Date
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('REG. DATE:', pageWidth / 2 - 15, currentY + 6);
  doc.setFontSize(9.5);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(regDate, pageWidth / 2 - 15, currentY + 12);

  // Right: Status
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('STATUS:', pageWidth - margin - 40, currentY + 6);
  doc.setFontSize(10);
  doc.setTextColor(34, 139, 34); // Green
  doc.text('CONFIRMED / PAID', pageWidth - margin - 40, currentY + 12);

  currentY += 21;

  // 1. Student Details Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text('1. STUDENT INFORMATION', margin + 5, currentY);

  currentY += 3;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 4, currentY, pageWidth - (margin + 4) * 2, 37, 2, 2, 'FD');

  const studentFieldsCol1 = [
    { label: 'Student Name:', value: data.studentName },
    { label: 'Class & Section:', value: `${data.class}${data.section ? ' (' + data.section + ')' : ''}` },
    { label: 'Date of Birth:', value: data.dob },
    { label: 'Gender:', value: data.gender },
  ];

  const studentFieldsCol2 = [
    { label: 'School Name:', value: data.schoolName },
    { label: 'School Address:', value: data.schoolAddress || 'N/A' },
    { label: 'Student Mobile:', value: data.studentMobile || 'N/A' },
    { label: 'Category / Religion:', value: `${data.category || 'General'} / ${data.religion || 'N/A'}` },
  ];

  let sY = currentY + 6;
  studentFieldsCol1.forEach((f) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
    doc.text(f.label, margin + 8, sY);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text(f.value, margin + 38, sY);
    sY += 7.5;
  });

  sY = currentY + 6;
  studentFieldsCol2.forEach((f) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
    doc.text(f.label, pageWidth / 2 + 3, sY);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    const valText = doc.splitTextToSize(f.value, 55);
    doc.text(valText[0] || 'N/A', pageWidth / 2 + 34, sY);
    sY += 7.5;
  });

  currentY += 41;

  // 2. Parent & Contact Details Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text('2. PARENT & CONTACT DETAILS', margin + 5, currentY);

  currentY += 3;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 4, currentY, pageWidth - (margin + 4) * 2, 33, 2, 2, 'FD');

  const parentFieldsCol1 = [
    { label: "Father / Guardian:", value: data.parentName },
    { label: "Mother's Name:", value: data.motherName || 'N/A' },
    { label: 'Parent Mobile:', value: data.parentMobile },
    { label: 'Email ID:', value: data.email || 'N/A' },
  ];

  const fullAddress = [
    data.address,
    data.city,
    data.state,
    data.pinCode ? `PIN: ${data.pinCode}` : ''
  ].filter(Boolean).join(', ');

  const parentFieldsCol2 = [
    { label: 'Full Address:', value: fullAddress },
    { label: 'City & State:', value: `${data.city || 'N/A'}, ${data.state || 'N/A'}` },
    { label: 'PIN Code:', value: data.pinCode || 'N/A' },
    { label: 'Referral ID:', value: data.referralId || 'Direct' },
  ];

  let pY = currentY + 6;
  parentFieldsCol1.forEach((f) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
    doc.text(f.label, margin + 8, pY);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text(f.value, margin + 38, pY);
    pY += 6.8;
  });

  pY = currentY + 6;
  parentFieldsCol2.forEach((f, idx) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
    doc.text(f.label, pageWidth / 2 + 3, pY);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    if (idx === 0) {
      const splitAddr = doc.splitTextToSize(f.value, 55);
      doc.text(splitAddr[0] || 'N/A', pageWidth / 2 + 32, pY);
    } else {
      doc.text(f.value, pageWidth / 2 + 32, pY);
    }
    pY += 6.8;
  });

  currentY += 37;

  // 3. Payment & Fee Receipt Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text('3. FEE PAYMENT & TRANSACTION DETAILS', margin + 5, currentY);

  currentY += 3;
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin + 4, currentY, pageWidth - (margin + 4) * 2, 28, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Registration Fee:', margin + 8, currentY + 7);
  doc.setFontSize(12);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text(`INR ${data.amount.toLocaleString('en-IN')}/-`, margin + 38, currentY + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Fee in Words:', margin + 8, currentY + 14);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(numberToWordsINR(data.amount), margin + 38, currentY + 14);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Payment Gateway:', margin + 8, currentY + 21);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Online (Razorpay)', margin + 38, currentY + 21);

  // Right side of Payment Card
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Order ID:', pageWidth / 2 + 3, currentY + 7);
  doc.setFont('courier', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(data.razorpayOrderId || 'N/A', pageWidth / 2 + 30, currentY + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Payment ID:', pageWidth / 2 + 3, currentY + 14);
  doc.setFont('courier', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text(data.razorpayPaymentId || 'N/A', pageWidth / 2 + 30, currentY + 14);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Payment Status:', pageWidth / 2 + 3, currentY + 21);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(34, 139, 34); // Green
  doc.text('SUCCESSFUL / PAID', pageWidth / 2 + 30, currentY + 21);

  currentY += 32;

  // 4. Instructions & Guidelines Card
  doc.setFillColor(255, 252, 240);
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 4, currentY, pageWidth - (margin + 4) * 2, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('IMPORTANT INSTRUCTIONS FOR APPLICANTS:', margin + 8, currentY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  const guidelines = [
    '• Please preserve this receipt and your Enrollment Number safely for admit card download and examination day entry.',
    '• Exact examination date, timing, syllabus, and allotted exam center will be intimated through SMS / official website.',
    '• The registration fee of INR 199 is strictly non-refundable and non-transferable under any circumstances.',
    '• For queries or assistance, contact: careplusfoundation19@gmail.com | Helpline: 9315152763.',
  ];

  let gY = currentY + 10;
  guidelines.forEach((line) => {
    doc.text(line, margin + 8, gY);
    gY += 3.8;
  });

  currentY += 28;

  // 5. Signatories & Authorization
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);

  doc.text('Lata Kumari', margin + 20, currentY + 8, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('President', margin + 20, currentY + 12, { align: 'center' });
  doc.text('Care Plus Foundation Trust', margin + 20, currentY + 15.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Mukesh', pageWidth / 2, currentY + 8, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Trustee', pageWidth / 2, currentY + 12, { align: 'center' });
  doc.text('Care Plus Foundation Trust', pageWidth / 2, currentY + 15.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text('Authorized Signatory', pageWidth - margin - 25, currentY + 8, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Buniyad Examination Cell', pageWidth - margin - 25, currentY + 12, { align: 'center' });
  doc.text('(Computer-generated copy)', pageWidth - margin - 25, currentY + 15.5, { align: 'center' });

  // Auto download if requested
  if (autoDownload) {
    const filename = `Buniyad_Scholarship_Receipt_${data.enrollmentNumber || 'CPF'}.pdf`;
    doc.save(filename);
  }

  return doc;
}

/**
 * Triggers native browser print dialog for Scholarship Receipt.
 */
export async function printScholarshipReceipt(data: ScholarshipReceiptData): Promise<void> {
  const doc = await generateScholarshipReceipt(data, false);
  doc.autoPrint();
  const blobUrl = doc.output('bloburl');
  window.open(blobUrl, '_blank');
}
