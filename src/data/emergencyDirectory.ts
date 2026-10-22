export interface EmergencyContact {
  name: string;
  category: 'National Cyber Helpline' | 'Banking Fraud Emergency' | 'Telecom Fraud' | 'International Authority';
  phone: string;
  website?: string;
  notes: string;
  region: 'India' | 'International';
}

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    name: 'National Cyber Crime Helpline (India)',
    category: 'National Cyber Helpline',
    phone: '1930',
    website: 'https://cybercrime.gov.in/',
    notes: 'Citizen Financial Cyber Fraud Reporting System. Operational 24/7. Critical for blocking funds within the Golden Hour.',
    region: 'India'
  },
  {
    name: 'National Cyber Crime Reporting Portal',
    category: 'National Cyber Helpline',
    phone: '1930',
    website: 'https://cybercrime.gov.in/',
    notes: 'Official Government of India portal for formal complaint lodging and obtaining official acknowledgement receipts.',
    region: 'India'
  },
  {
    name: 'Chakshu Portal (Dept of Telecom, India)',
    category: 'Telecom Fraud',
    phone: 'N/A (Web Portal)',
    website: 'https://sancharsaathi.gov.in/sfc/',
    notes: 'Report fraudulent WhatsApp numbers, fake SMS sender headers, and cybercrime calling lines for telecommunication carrier blacklisting.',
    region: 'India'
  },
  {
    name: 'State Bank of India (SBI) Fraud Desk',
    category: 'Banking Fraud Emergency',
    phone: '1800 11 2211 / 1800 425 3800',
    website: 'https://bank.sbi/',
    notes: '24/7 toll-free helpline to block SBI debit cards, netbanking, and report unauthorized debits.',
    region: 'India'
  },
  {
    name: 'HDFC Bank Fraud Reporting Desk',
    category: 'Banking Fraud Emergency',
    phone: '1800 202 6161 / 1860 267 6161',
    website: 'https://www.hdfcbank.com/',
    notes: 'Dedicated emergency line to freeze compromised accounts and stop unauthorized payment mandates.',
    region: 'India'
  },
  {
    name: 'ICICI Bank Emergency Helpline',
    category: 'Banking Fraud Emergency',
    phone: '1800 1080',
    website: 'https://www.icicibank.com/',
    notes: 'Instant card block and fraud registration line for ICICI savings, credit, and iMobile accounts.',
    region: 'India'
  },
  {
    name: 'Axis Bank Emergency Fraud Support',
    category: 'Banking Fraud Emergency',
    phone: '1860 419 5555 / 1860 500 5555',
    website: 'https://www.axisbank.com/',
    notes: 'Round-the-clock assistance to lock credit cards and suspend Internet banking credentials.',
    region: 'India'
  },
  {
    name: 'Punjab National Bank (PNB) Cyber Cell',
    category: 'Banking Fraud Emergency',
    phone: '1800 180 2222 / 1800 103 2222',
    website: 'https://www.pnbindia.in/',
    notes: 'Immediate reporting of fraudulent UPI transactions and unauthorized branch transfers.',
    region: 'India'
  },
  // International resources
  {
    name: 'Federal Bureau of Investigation (IC3) — USA',
    category: 'International Authority',
    phone: '1-877-FTC-HELP',
    website: 'https://www.ic3.gov/',
    notes: 'Internet Crime Complaint Center for reporting cyber scams and financial wire fraud in the United States.',
    region: 'International'
  },
  {
    name: 'Action Fraud — United Kingdom',
    category: 'International Authority',
    phone: '0300 123 2040',
    website: 'https://www.actionfraud.police.uk/',
    notes: 'The UK national fraud and cyber crime reporting center.',
    region: 'International'
  },
  {
    name: 'Australian Cyber Security Centre (ReportCyber)',
    category: 'International Authority',
    phone: '1300 CYBER1 (1300 292 371)',
    website: 'https://www.cyber.gov.au/report-and-recover',
    notes: 'Official Australian Government portal for incident reporting and immediate recovery guidance.',
    region: 'International'
  }
];
