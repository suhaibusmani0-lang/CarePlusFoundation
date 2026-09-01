import jsPDF from 'jspdf';

export interface DonationReceiptData {
  receiptNo?: string;
  donationId: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  donorPan?: string;
  donorAddress?: string;
  amount: number;
  paymentMethod?: string;
  paymentId?: string;
  date: string | Date;
  cause?: string;
}

/**
 * Converts a numeric amount to Indian English currency words.
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
 * Generates an 80G donation tax receipt PDF client-side using jsPDF.
 * Returns the jsPDF document instance and triggers download if autoDownload is true.
 */
export async function generateReceipt(
  data: DonationReceiptData,
  autoDownload: boolean = true
): Promise<jsPDF> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;

  const teal = [15, 74, 92]; // #0f4a5c
  const gold = [184, 134, 11]; // #b8860b
  const darkGray = [30, 41, 59];
  const mutedGray = [100, 116, 139];
  const lightBg = [244, 249, 250];

  // Outer decorative border
  doc.setDrawColor(teal[0], teal[1], teal[2]);
  doc.setLineWidth(1.2);
  doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);

  // Inner subtle border
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.4);
  doc.rect(margin + 2.5, margin + 2.5, pageWidth - (margin + 2.5) * 2, pageHeight - (margin + 2.5) * 2);

  // Top header banner background
  doc.setFillColor(teal[0], teal[1], teal[2]);
  doc.rect(margin + 3, margin + 3, pageWidth - (margin + 3) * 2, 38, 'F');

  // Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('CARE PLUS FOUNDATION TRUST', pageWidth / 2, margin + 14, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(230, 200, 120);
  doc.text('"Together, We Create Change"', pageWidth / 2, margin + 20, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(235, 245, 250);
  doc.text(
    'Registered under The Charitable and Religious Trust Act, 1920 | Reg No: 2026/10/IV/1162 (Sub-Registrar Delhi)',
    pageWidth / 2,
    margin + 27,
    { align: 'center' }
  );
  doc.text(
    'DARPAN ID: DL/2026/1190987 | Email: careplusfoundation19@gmail.com',
    pageWidth / 2,
    margin + 32,
    { align: 'center' }
  );
  doc.text(
    'Address: B-6 FIRST FLOOR KALKAJI NEW DELHI-110019, Delhi Cantonment',
    pageWidth / 2,
    margin + 37,
    { align: 'center' }
  );

  let currentY = margin + 46;

  // Title Ribbon
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.roundedRect(margin + 25, currentY, pageWidth - (margin + 25) * 2, 9, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('DONATION RECEIPT & 80G TAX EXEMPTION CERTIFICATE', pageWidth / 2, currentY + 6.2, {
    align: 'center',
  });

  currentY += 15;

  // Receipt Number & Date Grid
  const receiptNumber =
    data.receiptNo || `CPF-${new Date().getFullYear()}-${data.donationId.slice(-6).toUpperCase()}`;
  const donationDate =
    data.date instanceof Date
      ? data.date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      : new Date(data.date).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });

  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(200, 220, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 5, currentY, pageWidth - (margin + 5) * 2, 14, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text('Receipt No:', margin + 10, currentY + 6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(receiptNumber, margin + 32, currentY + 6);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text('Date:', pageWidth - margin - 55, currentY + 6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(donationDate, pageWidth - margin - 43, currentY + 6);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text('Payment ID:', margin + 10, currentY + 11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(data.paymentId || data.donationId, margin + 32, currentY + 11);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text('Mode:', pageWidth - margin - 55, currentY + 11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(data.paymentMethod || 'Online / Razorpay', pageWidth - margin - 43, currentY + 11);

  currentY += 20;

  // Donor Details Card
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text('DONOR DETAILS', margin + 6, currentY);

  currentY += 3;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(220, 226, 230);
  doc.roundedRect(margin + 5, currentY, pageWidth - (margin + 5) * 2, 34, 2, 2, 'FD');

  const donorFields = [
    { label: 'Received With Thanks From:', value: data.donorName },
    { label: 'PAN Number (for 80G):', value: data.donorPan || 'Not Provided' },
    { label: 'Email Address:', value: data.donorEmail },
    { label: 'Contact / Address:', value: [data.donorPhone, data.donorAddress].filter(Boolean).join(' | ') || 'N/A' },
  ];

  let donorY = currentY + 6;
  donorFields.forEach((field) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
    doc.text(field.label, margin + 10, donorY);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text(field.value, margin + 65, donorY);
    donorY += 6.8;
  });

  currentY += 40;

  // Donation Amount Card
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text('DONATION SUMMARY', margin + 6, currentY);

  currentY += 3;
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(teal[0], teal[1], teal[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin + 5, currentY, pageWidth - (margin + 5) * 2, 32, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Cause / Purpose:', margin + 10, currentY + 8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text(data.cause || 'General Charitable & Welfare Activities', margin + 45, currentY + 8);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Amount in Figures:', margin + 10, currentY + 16);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text(`INR ${data.amount.toLocaleString('en-IN')}/-`, margin + 45, currentY + 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Amount in Words:', margin + 10, currentY + 24);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  const words = numberToWordsINR(data.amount);
  doc.text(words, margin + 45, currentY + 24);

  currentY += 38;

  // 80G Statutory & Exemption Declaration
  doc.setFillColor(255, 252, 240);
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 5, currentY, pageWidth - (margin + 5) * 2, 28, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('TAX EXEMPTION DECLARATION UNDER SECTION 80G', margin + 10, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  const disclaimerText = [
    '• Donations made to Care Plus Foundation Trust qualify for tax deduction under Section 80G of the Income Tax Act, 1961.',
    '• NITI Aayog NGO Darpan Unique ID: DL/2026/1190987. Registration No: 2026/10/IV/1162.',
    '• This donation is unconditionally utilized for Education & Literacy, Health, Child Welfare, and Food Processing initiatives.',
    '• This is a digitally generated acknowledgement receipt and does not require a physical signature.',
  ];

  let discY = currentY + 11;
  disclaimerText.forEach((line) => {
    doc.text(line, margin + 10, discY);
    discY += 4.2;
  });

  currentY += 34;

  // Signatory and Office Bearers
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);

  doc.text('Lata Kumari', margin + 20, currentY + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('President', margin + 20, currentY + 16, { align: 'center' });
  doc.text('Care Plus Foundation Trust', margin + 20, currentY + 20, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Mukesh', pageWidth / 2, currentY + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('Trustee', pageWidth / 2, currentY + 16, { align: 'center' });
  doc.text('Care Plus Foundation Trust', pageWidth / 2, currentY + 20, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text('Authorized Signatory', pageWidth - margin - 25, currentY + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text('(Digitally Verified)', pageWidth - margin - 25, currentY + 16, { align: 'center' });
  doc.text('Care Plus Foundation Trust', pageWidth - margin - 25, currentY + 20, { align: 'center' });

  // Bottom Footer
  const footerY = pageHeight - margin - 6;
  doc.setDrawColor(teal[0], teal[1], teal[2]);
  doc.setLineWidth(0.3);
  doc.line(margin + 5, footerY - 4, pageWidth - margin - 5, footerY - 4);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text('CARE • SUPPORT • EMPOWER • TOGETHER', pageWidth / 2, footerY, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(mutedGray[0], mutedGray[1], mutedGray[2]);
  doc.text(
    'For queries regarding your 80G certificate, contact us at careplusfoundation19@gmail.com',
    pageWidth / 2,
    footerY + 3.5,
    { align: 'center' }
  );

  if (autoDownload && typeof window !== 'undefined') {
    doc.save(`CarePlus_Receipt_${receiptNumber}.pdf`);
  }

  return doc;
}
