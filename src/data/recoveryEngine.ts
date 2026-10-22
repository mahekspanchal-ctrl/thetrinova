import { IncidentId, FollowUpAnswers, RecoveryAction } from '../types';

export function generateRecoveryPlan(
  incidents: IncidentId[],
  answers: FollowUpAnswers
): {
  doFirst: RecoveryAction[];
  doNext: RecoveryAction[];
  getHelp: RecoveryAction[];
} {
  const doFirst: RecoveryAction[] = [];
  const doNext: RecoveryAction[] = [];
  const getHelp: RecoveryAction[] = [];

  const hasLink = incidents.includes('clicked_link');
  const hasEnteredDetails = incidents.includes('entered_details');
  const hasOtp = incidents.includes('shared_otp');
  const hasApp = incidents.includes('installed_app');
  const hasMoneyLost = incidents.includes('unauthorized_txn');
  const hasOfficialThreat = incidents.includes('threatened_official');
  const isUnsure = incidents.includes('unsure');

  // Condition 1: Active Extortion / Impersonation ("Digital Arrest")
  if (hasOfficialThreat) {
    doFirst.push({
      id: 'threat_disconnect',
      category: 'DO THIS FIRST',
      title: 'Disconnect communication immediately and do not transfer any funds',
      whyThisFirst:
        'Official law enforcement (Police, CBI, ED, Customs, or Courts) never conduct "digital arrests" via video call, nor do they ever demand money transfers to "secure" or "verify" accounts. Hanging up immediately stops the psychological coercion.',
      howToCarryOut: [
        'End the video call or phone call right away. Do not argue or explain why you are hanging up.',
        'Block the phone number or messaging handle on WhatsApp/Skype/Telegram.',
        'Never send funds to any "government holding account" or "RBI verification ledger" — these are entirely fabricated.'
      ],
      urgencyLevel: 'immediate'
    });

    doNext.push({
      id: 'threat_confide',
      category: 'DO THIS NEXT',
      title: 'Confide in a trusted family member, friend, or legal advisor',
      whyThisFirst:
        'Scammers deliberately isolate victims by warning them not to tell anyone. Speaking to someone level-headed outside the situation breaks the emotional manipulation and restores calm clarity.',
      howToCarryOut: [
        'Call a family member, trusted friend, or colleague and explain what the caller claimed.',
        'If you still feel uncertain about a legitimate legal notice, visit your local jurisdictional police station physically in daylight to verify.'
      ],
      urgencyLevel: 'high'
    });
  }

  // Condition 2: Malicious App Installed or Remote Access Granted
  if (hasApp || answers.fileOrAppDownloaded === 'downloaded_and_installed') {
    doFirst.push({
      id: 'app_airplane_mode',
      category: 'DO THIS FIRST',
      title: 'Disconnect the affected device from the internet (Turn on Airplane Mode)',
      whyThisFirst:
        'Remote support tools (like AnyDesk, TeamViewer, RustDesk) and malicious APKs require an active data connection to view your screen, steal SMS OTPs, or control inputs. Cutting the connection stops ongoing access instantly without wiping potential evidence.',
      howToCarryOut: [
        'Immediately toggle on Airplane Mode on the affected smartphone or disconnect Wi-Fi and ethernet on your computer.',
        'Keep the device disconnected while you secure your accounts.',
        'If the screen is locked or controls are being hijacked, hold the physical power button to force a shutdown.'
      ],
      urgencyLevel: 'immediate'
    });

    doFirst.push({
      id: 'app_use_separate_device',
      category: 'DO THIS FIRST',
      title: 'Use a completely separate, clean device to manage your banking',
      whyThisFirst:
        'Changing passwords or logging into banking apps on a compromised device allows an active screen-recording or keylogger app to capture the new credentials too.',
      howToCarryOut: [
        'Borrow a family member’s phone or use a clean laptop on a secure network.',
        'Do not reconnect the affected device to Wi-Fi until it has been inspected or factory reset.'
      ],
      urgencyLevel: 'immediate'
    });

    doNext.push({
      id: 'app_inspect_remove',
      category: 'DO THIS NEXT',
      title: 'Uninstall unfamiliar apps and revoke accessibility permissions',
      whyThisFirst:
        'Malicious applications often request Android Accessibility Service permissions to read OTPs and simulate touch inputs. Removing them eliminates persistent backdoors.',
      howToCarryOut: [
        'While remaining offline in Airplane Mode, open Settings > Apps (or Installed Apps).',
        'Look for recently installed apps, APKs disguised as "Customer Support", "KYC Update", or remote tools (AnyDesk, QuickSupport, RustDesk).',
        'Revoke Device Administrator / Accessibility permissions and tap Uninstall.',
        'If you are unsure or the app cannot be uninstalled normally, back up your photos/contacts to an external drive and perform a full Factory Data Reset.'
      ],
      urgencyLevel: 'high'
    });
  }

  // Condition 3: Money Deducted or Unauthorised Transactions
  if (hasMoneyLost || answers.moneyDeductedStatus === 'yes_deducted') {
    const isUnder2h = answers.hoursSinceTransaction === 'under_2h';
    doFirst.push({
      id: 'money_freeze_bank',
      category: 'DO THIS FIRST',
      title: 'Call your bank’s 24/7 fraud reporting desk to freeze accounts and debit cards',
      whyThisFirst:
        'Contacting your bank immediately gives the bank and payment switch an opportunity to freeze funds or block further debit attempts before funds are withdrawn across secondary accounts.',
      howToCarryOut: [
        'Dial the official bank fraud emergency helpline (from the back of your debit card or the official mobile banking app).',
        'State clearly: "I am reporting an unauthorized, fraudulent transaction and need my card/UPI access frozen immediately."',
        'Ask the representative for a formal Complaint Reference Number and write it down with the exact time of the call.'
      ],
      urgencyLevel: 'immediate',
      helplineReference: 'Call the verified 24/7 number on the back of your card'
    });

    getHelp.push({
      id: 'help_1930_portal',
      category: 'GET HELP',
      title: 'Report to National Cyber Crime Helpline 1930 & cybercrime.gov.in (India)',
      whyThisFirst:
        isUnder2h
          ? 'You are within the critical "Golden Hour". When you report to 1930 promptly, the Citizen Financial Cyber Fraud Reporting System triggers an automated inter-bank lien to freeze stolen money in transit.'
          : 'Reporting promptly gives law enforcement and financial intermediaries an official record to trace transaction trails across beneficiary accounts, although recovery is not guaranteed.',
      howToCarryOut: [
        'Dial 1930 from your phone (accessible across all Indian states and Union Territories).',
        'Provide the bank name, debit account number, beneficiary account/UPI ID if visible in the SMS, transaction date/time, and amount.',
        'Follow up by filing the formal digital complaint on the official portal: https://cybercrime.gov.in/ within 24 hours.'
      ],
      urgencyLevel: 'immediate',
      helplineReference: 'Helpline: 1930',
      officialLink: 'https://cybercrime.gov.in/'
    });

    doNext.push({
      id: 'money_document_evidence',
      category: 'DO THIS NEXT',
      title: 'Collect and preserve transaction reference numbers (UTR/RRN), SMS alerts, and timestamps',
      whyThisFirst:
        'Accurate transaction IDs (such as the 12-digit UTR/RRN number for UPI or NEFT/IMPS) are required by banks for chargeback requests and by cyber police for official FIR records.',
      howToCarryOut: [
        'Save screenshots of debit SMS notifications and banking transaction receipts.',
        'Note down exact timestamps, beneficiary name, UPI VPA handle, or receiving account numbers.',
        'Do not delete any chat logs, call records, or SMS from the scammer, as these serve as digital forensic evidence.'
      ],
      urgencyLevel: 'high'
    });

    doNext.push({
      id: 'money_rbi_zero_liability',
      category: 'DO THIS NEXT',
      title: 'Submit a written dispute under the RBI Zero/Limited Customer Liability policy',
      whyThisFirst:
        'Under RBI consumer protection regulations, reporting an unauthorized third-party transaction promptly to your bank in writing strengthens your legal standing for liability determination.',
      howToCarryOut: [
        'Send a formal email to your bank’s designated nodal officer or visit your home branch in person.',
        'Attach the 1930 cybercrime acknowledgement number and copy of the transaction statement.',
        'Obtain a stamped physical or digital acknowledgement copy.'
      ],
      urgencyLevel: 'recommended'
    });
  }

  // Condition 4: OTP or Banking Credentials Shared
  if (hasOtp || hasEnteredDetails || answers.enteredInfoOnSite === 'credentials' || answers.enteredInfoOnSite === 'card_bank') {
    // If money hasn't been lost yet, blocking credentials prevents it
    if (!hasMoneyLost && answers.moneyDeductedStatus !== 'yes_deducted') {
      doFirst.push({
        id: 'otp_block_cards',
        category: 'DO THIS FIRST',
        title: 'Block compromised cards and temporarily disable netbanking/UPI access',
        whyThisFirst:
          'Contact your bank now because someone may still be able to misuse the information or OTP you shared to authorize pending transactions or register on new payment apps.',
        howToCarryOut: [
          'Open your official mobile banking app or dial your bank’s verified helpline.',
          'Use the "Quick Card Lock / Block" toggle inside the official app if available, or request immediate block over phone.',
          'Request temporary suspension of UPI services linked to that mobile number if the OTP was related to UPI registration.'
        ],
        urgencyLevel: 'immediate'
      });
    }

    doFirst.push({
      id: 'otp_change_passwords',
      category: 'DO THIS FIRST',
      title: 'Change passwords for the affected service and your primary email',
      whyThisFirst:
        'Changing passwords terminates existing sessions on many platforms. Updating your linked email password is vital because password resets often route through email.',
      howToCarryOut: [
        'Log in from a trusted, secure device and change the password to a strong, unique pass-phrase (at least 14 characters).',
        'In your account security settings, select "Log out of all other devices / active sessions".',
        'Enable an authenticator app (like Google Authenticator) instead of SMS-based OTPs where possible.'
      ],
      urgencyLevel: 'immediate'
    });

    doNext.push({
      id: 'otp_check_forwarding',
      category: 'DO THIS NEXT',
      title: 'Inspect call forwarding and SMS diversion settings on your phone',
      whyThisFirst:
        'Some scams trick users into dialing codes (such as *21* or *401*) that silently divert incoming calls or SMS OTPs to the scammer’s number without your knowledge.',
      howToCarryOut: [
        'On your smartphone dialer, enter *#21# or *#62# and press call to view the current forwarding status.',
        'If forwarding is active to an unknown number, dial ##002# or ##21# immediately to cancel all unconditional and conditional diversions.',
        'Check your telecom operator app (e.g. Airtel, Jio, Vi) to verify no unauthorized eSIM or SIM-swap requests are pending.'
      ],
      urgencyLevel: 'high'
    });
  }

  // Condition 5: Suspicious Link Clicked (with no credentials or app installed)
  if (hasLink && !hasEnteredDetails && !hasOtp && !hasApp && answers.enteredInfoOnSite === 'no_closed') {
    doFirst.push({
      id: 'link_close_clear',
      category: 'DO THIS FIRST',
      title: 'Close the suspicious web page and clear recent browser data',
      whyThisFirst:
        'Clicking a link alone does not automatically mean your account is compromised. Closing the page and clearing temporary cached data prevents automatic re-loading, persistent popups, or tracking cookies.',
      howToCarryOut: [
        'Close the browser tab immediately. Do not click "Allow Notifications", "OK", or "Cancel" on deceptive browser prompts.',
        'Open your browser settings (Chrome / Safari / Firefox) and clear browsing history, cookies, and site data for the last 1 hour.',
        'Check your phone’s "Downloads" folder to make sure no background APK or setup file was automatically saved; delete any unexpected downloads.'
      ],
      urgencyLevel: 'immediate'
    });

    doNext.push({
      id: 'link_monitor_activity',
      category: 'DO THIS NEXT',
      title: 'Monitor account notifications over the next 48 hours',
      whyThisFirst:
        'Since you did not enter passwords, OTPs, or financial information, your accounts remain protected. Staying vigilant ensures that if the link attempted subtle session hijacking, you will catch any unusual activity early.',
      howToCarryOut: [
        'Keep SMS alerts and email notifications enabled on your phone.',
        'Review recent active sessions on your Google/Apple or banking account security page to confirm only your recognized devices appear.',
        'Avoid clicking links in follow-up SMS messages claiming "Your account has been alerted".'
      ],
      urgencyLevel: 'recommended'
    });
  }

  // Condition 6: Personal Details Shared (Name, Address, PAN, Aadhaar, DOB)
  if (answers.enteredInfoOnSite === 'personal_details') {
    doNext.push({
      id: 'personal_identity_vigilance',
      category: 'DO THIS NEXT',
      title: 'Lock your biometrics on Aadhaar (UIDAI) and watch for loan/credit inquiries',
      whyThisFirst:
        'Scammers may use leaked identity documents to attempt SIM swaps, apply for fraudulent instant personal loans, or open mule accounts in your name.',
      howToCarryOut: [
        'If Aadhaar was shared, log in to the official mAadhaar app or myaadhaar.uidai.gov.in and click "Lock Biometrics".',
        'Check your CIBIL / Experian credit report over the next 30 days to ensure no unauthorized loan inquiries appear.',
        'Be alert for phishing emails that cite your real address or ID to seem legitimate.'
      ],
      urgencyLevel: 'high'
    });
  }

  // Condition 7: General / Unsure / Comprehensive Help
  if (isUnsure && doFirst.length === 0) {
    doFirst.push({
      id: 'unsure_pause_disconnect',
      category: 'DO THIS FIRST',
      title: 'Pause, do not send any information, and check your banking statement',
      whyThisFirst:
        'When you are unsure whether you have been targeted, taking a calm moment to verify is far safer than reacting in panic or complying with urgent messages.',
      howToCarryOut: [
        'Do not reply to incoming messages or calls demanding urgent action.',
        'Log in to your bank app directly (not via links) and review your recent transaction history for any unfamiliar charges.',
        'Check if your phone displays any unexpected screen-sharing notifications or battery drain.'
      ],
      urgencyLevel: 'immediate'
    });
  }

  // Universal GET HELP additions
  getHelp.push({
    id: 'help_official_support_portal',
    category: 'GET HELP',
    title: 'Consult the official National Cyber Crime Reporting Portal (cybercrime.gov.in)',
    whyThisFirst:
      'Filing a record with the official authorities creates a formal acknowledgement slip, which is required if you need to approach the Banking Ombudsman or dispute credit bureau records.',
    howToCarryOut: [
      'Visit the official portal at https://cybercrime.gov.in/ (look for the .gov.in domain).',
      'Select "Report Cyber Crime" > "Report Other Cyber Crime" or "Report Financial Fraud".',
      'Keep copies of screenshots, transaction details, and caller numbers ready to upload.'
    ],
    urgencyLevel: 'high',
    officialLink: 'https://cybercrime.gov.in/'
  });

  getHelp.push({
    id: 'help_telecom_chakshu',
    category: 'GET HELP',
    title: 'Report fraudulent sender handles on the Government of India Chakshu Portal',
    whyThisFirst:
      'Reporting fraudulent SMS senders, fake WhatsApp numbers, and phishing links to Department of Telecommunications (DoT) Chakshu leads to carrier-level disconnection of fraudulent numbers.',
    howToCarryOut: [
      'Visit the Sanchar Saathi portal at https://sancharsaathi.gov.in/sfc/ (Chakshu facility).',
      'Enter the suspicious mobile number, screenshot, and date/time of the scam call or message.',
      'This helps prevent the same syndicate from targeting other citizens.'
    ],
    urgencyLevel: 'recommended',
    officialLink: 'https://sancharsaathi.gov.in/sfc/'
  });

  return { doFirst, doNext, getHelp };
}
