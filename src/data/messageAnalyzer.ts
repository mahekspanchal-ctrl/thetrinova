import { MessageAnalysisResult, MessagePatternMatch, HighlightSpan } from '../types';

interface PatternDefinition {
  regex: RegExp;
  category: MessagePatternMatch['category'];
  explanation: {
    en: string;
    hi?: string;
    gu?: string;
  };
}

// Comprehensive multi-language scam patterns across Gujarati, Hindi, and English
const SUSPICIOUS_PATTERNS: PatternDefinition[] = [
  // 1. Account-Blocking Threats (Gujarati, Hindi, English)
  {
    regex: /(ખાતું બ્લોક|ખાતા બ્લોક|ખાતુ બ્લોક|એકાઉન્ટ બ્લોક|કાર્ડ બ્લોક|બ્લોક થઈ જશે|બ્લોક કરી દેવામાં આવશે|બ્લોક કરવામાં આવ્યું છે|બ્લોક થઈ ગયું|ખાતું બંધ|ખાતા બંધ|ખાતુ બંધ|એકાઉન્ટ બંધ|કાર્ડ બંધ|બંધ થઈ જશે|બંધ કરવામાં આવશે|કાયમી બંધ|કાયમી બ્લોક|સ્થગિત કરવામાં આવશે|સ્થગિત થશે|અટકાવી દેવામાં આવશે|ખાતા પર પ્રતિબંધ|ખાता ब्लॉक|खाते ब्लॉक|अकाउंट ब्लॉक|कार्ड ब्लॉक|ब्लॉक कर दिया जाएगा|ब्लॉक हो जाएगा|ब्लॉक किया गया है|ब्लॉक होगा|खाता बंद|कार्ड बंद|अकाउंट बंद|बंद कर दिया जाएगा|बंद हो जाएगा|निलंबित|स्थगित|फ्रीज|account (is |will be )?(blocked|suspended|frozen|deactivated|closed)|card (is |will be )?(blocked|suspended)|permanent(ly)? block|access restricted|account blocked|account suspended|khata block|khathu block|account block)/gi,
    category: 'Urgency / Pressure',
    explanation: {
      en: 'Account-blocking threat: Fraudsters threaten to suspend your account or card to trigger panic and force rash decisions.',
      hi: 'खाता ब्लॉक करने की धमकी: बैंक खाता या कार्ड बंद होने का डर दिखाकर ठग आपको घबराहट में गलत कदम उठाने पर मजबूर करते हैं।',
      gu: 'ખાતું બ્લોક કરવાની ધમકી: બેંક ખાતું કે કાર્ડ બંધ થવાનો ડર બતાવીને ગભરાટમાં પગલું ભરાવવાની આ જાણીતી યુક્તિ છે.'
    }
  },

  // 2. Urgency & Time Pressure (Gujarati, Hindi, English)
  {
    regex: /(તુરંત|તાત્કાલિક|તાકીદે|તરત જ|આજે જ|આજે રાત્રે|આજે રાતે|૨૪ કલાકમાં|24 કલાકમાં|૨૪ કલાક|24 કલાક|૨ કલાક|2 કલાક|છેલ્લી ચેતવણી|છેલ્લી તક|અંતિમ ચેતવણી|નહીં તો|નહીંતર|કાપી નાખવામાં આવશે|કપાઈ જશે|વીજળી.*કાપી|લાઈન કાપી|तुरंत|तत्काल|जल्द से जल्द|आज ही|आज रात|24 घंटे में|२४ घंटे में|24 घंटे|२४ घंटे|2 घंटे में|२ घंटे|अंतिम चेतावनी|आखिरी मौका|वरना|नहीं तो|काट दिया जाएगा|बिजली.*काट|लाइन काट|immediate(ly)?|immediate action|within 2 hours|within 24 hours|today itself|tonight|last warning|final notice|urgent action|disconnected tonight|cut off tonight|action required today|last date)/gi,
    category: 'Urgency / Pressure',
    explanation: {
      en: 'False urgency & deadline pressure: Artificial deadlines prevent you from independently verifying with your bank or family.',
      hi: 'झूठी जल्दबाजी व समय-सीमा: सोचने या किसी से पूछने का मौका न मिले, इसलिए कृत्रिम समय-सीमा बनाई गई है।',
      gu: 'કૃત્રિમ ઉતાવળ અને સમય-મર્યાદા: તમને સ્વતંત્ર રીતે બેંક કે પરિવાર સાથે ખરાઈ કરવાનો સમય ન મળે તે માટે આ દબાણ કરાય છે.'
    }
  },

  // 3. Suspicious Links & Link Prompts (URLs, bit.ly, click prompts across all 3 languages)
  {
    regex: /(https?:\/\/[^\s]+|www\.[^\s]+|bit\.ly\/[^\s]+|tinyurl\.com\/[^\s]+|t\.co\/[^\s]+|[a-zA-Z0-9-]+\.(top|xyz|click|site|online|live|link|work|buzz|icu|vip|shop|info)\/[^\s]*|લિંક પર ક્લિક કરો|આ લિંક પર ક્લિક કરો|નીચે આપેલી લિંક|લિંક ખોલો|લિંક પર|આ લિંક|લિંક|लिंक पर क्लिक करें|इस लिंक पर क्लिक करें|नीचे दी गई लिंक|लिंक खोलें|इस लिंक|लिंक|click here|click on the link|click this link|follow the link|open the link|tap the link)/gi,
    category: 'Credential Harvesting',
    explanation: {
      en: 'Suspicious link: Fraudulent links lead to phishing clones designed to steal passwords, OTPs, or install malware.',
      hi: 'संदिग्ध लिंक: यह लिंक फर्जी वेबसाइट पर ले जा सकता है जो आपके पासवर्ड या कार्ड विवरण चुराने के लिए बनाई गई है।',
      gu: 'શંકાસ્પદ લિંક: આ લિંક તમને ફિશિંગ વેબસાઈટ પર લઈ જઈ શકે છે જે તમારા બેંકિંગ પાસવર્ડ અથવા ઓટીપી ચોરી કરવા માટે રચાયેલી છે.'
    }
  },

  // 4. Requests for Banking Details, OTP, PIN, KYC (Gujarati, Hindi, English)
  {
    regex: /(ઓટીપી શેર|ઓટીપી આપો|ઓટીપી જણાવો|ઓટીપી મોકલો|ઓટીપી નાખો|ઓટીપી દાખલ|ઓટીપી|OTP શેર|OTP આપો|OTP જણાવો|OTP મોકલો|પિન નાખો|પિન આપો|પિન શેર|યુપીઆઈ પિન|UPI પિન|ATM પિન|સીવીવી|CVV|પાસવર્ડ|બેંકિંગ વિગતો|બેંક વિગતો|ખાતાની વિગતો|બેંક ખાતા નંબર|ખાતા નંબર|પાન કાર્ડ અપડેટ|પાન કાર્ડ લિંક|પાન લિંક|કેવાયસી અપડેટ|KYC અપડેટ|કેવાયસી|આધાર કાર્ડ લિંક|આધાર લિંક|ओटीपी बताएं|ओटीपी साझा|ओटीपी शेयर|ओटीपी दर्ज|ओटीपी भेजें|ओटीपी|OTP बताएं|OTP साझा|OTP शेयर|पिन डालें|पिन बताएं|पिन शेयर|यूपीआई पिन|UPI पिन|एटीएम पिन|पासवर्ड|सीवीवी|CVV|कार्ड नंबर|बैंकिंग विवरण|बैंक विवरण|खाता नंबर|खाता संख्या|पैन कार्ड अपडेट|पैन लिंक|केवाईसी अपडेट|KYC अपडेट|केवाईसी|आधार लिंक|share otp|enter otp|provide otp|send otp|read out otp|verify otp|otp verification|enter pin|upi pin|enter upi pin|atm pin|cvv|netbanking credentials|banking details|bank details|account details|account credentials|update kyc|kyc update|pan card update|pan link|aadhaar link|bank account number)/gi,
    category: 'Credential Harvesting',
    explanation: {
      en: 'Banking details or OTP request: Legitimate banks NEVER ask you to share OTPs, PINs, or update KYC via SMS/links.',
      hi: 'बैंकिंग विवरण या ओटीपी की मांग: कोई भी असली बैंक कभी एसएमएस या कॉल पर ओटीपी, पिन या पासवर्ड नहीं मांगता।',
      gu: 'બેંકિંગ વિગતો અથવા ઓટીપીની માંગણી: કોઈપણ સાચી બેંક ક્યારેય એસએમએસ કે લિંક દ્વારા ઓટીપી, પિન કે પાસવર્ડ માંગતી નથી.'
    }
  },

  // 5. Authority Impersonation & Digital Arrest (Gujarati, Hindi, English)
  {
    regex: /(પોલીસ|સીબીઆઈ|કસ્ટમ્સ|ધરપકડ વોરંટ|ગેરકાયદેસર પાર્સલ|ડિજિટલ અરેસ્ટ|સાયબર ક્રાઈમ|કુરિયર પાર્સલ|पुलिस|सीबीआई|कस्टम विभाग|कस्टम्स|गिरफ्तारी वारंट|अवैध पार्सल|डिजिटल अरेस्ट|साइबर क्राइम|कोरियर पार्सल|cbi|mumbai police|delhi police|cyber crime department|customs department|narcotics bureau|ed court|arrest warrant|illegal parcel|digital arrest|fedex courier|dhl courier)/gi,
    category: 'Authority Impersonation',
    explanation: {
      en: 'Authority impersonation / "Digital Arrest": Legitimate police, CBI, or customs never arrest citizens on video calls or demand funds.',
      hi: 'अधिकारी का फर्जी रूप ("डिजिटल अरेस्ट"): पुलिस या सीबीआई कभी वीडियो कॉल पर गिरफ्तारी नहीं करती और न ही पैसे मांगती है।',
      gu: 'અધિકારી બનીને ધમકાવવાનો સ્કેમ ("ડિજિટલ અરેસ્ટ"): સાચી પોલીસ કે સીબીઆઈ ક્યારેય વિડિયો કૉલ પર ધરપકડ કરતી નથી કે પૈસા માંગતી નથી.'
    }
  },

  // 6. Remote Screen-Sharing Apps (Gujarati, Hindi, English)
  {
    regex: /(એનીડેસ્ક|ટીમવ્યૂઅર|ક્વિકસપોર્ટ|એપ ડાઉનલોડ|એપ ઇન્સ્ટોલ|એની ડેસ્ક|એપીકે|एनीडेस्क|टीमव्यूअर|क्विकसपोर्ट|ऐप डाउनलोड|ऐप इंस्टॉल|एपीके|anydesk|teamviewer|rustdesk|quicksupport|download apk|install app|remote app|remote support)/gi,
    category: 'Remote Access Trap',
    explanation: {
      en: 'Remote screen-sharing trap: Installing AnyDesk or unknown APKs lets scammers see your screen and intercept bank OTPs.',
      hi: 'रिमोट स्क्रीन ऐप का जाल: AnyDesk या अनजान ऐप से जालसाज आपकी स्क्रीन और बैंक ओटीपी आसानी से देख लेते हैं।',
      gu: 'સ્ક્રીન શેરિંગ એપ્લિકેશન ટ્રેપ: AnyDesk જેવી એપ ઇન્સ્ટોલ કરાવવાથી સ્કેમર તમારી સ્ક્રીન અને ઓટીપી જોઈ શકે છે.'
    }
  },

  // 7. Receive Money / QR Code Deceptions
  {
    regex: /(ક્યૂઆર સ્કેન|પૈસા મેળવવા માટે પિન|યુપીઆઈ પિન નાખીને પૈસા|રિફંડ લિંક|કેશબેક|क्यूआर स्कैन|पैसे प्राप्त करने के लिए पिन|पैसे लेने के लिए पिन|रिफंड लिंक|कैशबैक|scan (this )?qr|enter upi pin to receive|pay ₹[0-9]+ to receive|refund link|cashback processing)/gi,
    category: 'Suspicious Financial Request',
    explanation: {
      en: 'UPI PIN deception: You NEVER need to enter your PIN to receive money. Entering a PIN always debits funds.',
      hi: 'यूपीआई पिन का धोखा: पैसे प्राप्त करने के लिए कभी पिन डालने की जरूरत नहीं होती। पिन डालने से पैसे कटते हैं।',
      gu: 'યુપીઆઈ પિનનો દગો: પૈસા મેળવવા માટે ક્યારેય પિન નાખવો પડતો નથી. પિન નાખવાથી હંમેશા તમારા ખાતામાંથી પૈસા કપાય છે.'
    }
  },

  // 8. Fake Work-From-Home / Task Scams
  {
    regex: /(ઘરે બેઠા કમાણી|દરરોજ કમાઓ|યુટ્યુબ વિડીયો લાઈક|ટેલિગ્રામ ચેનલ|ઘરે બેઠા કામ|घर बैठे कमाएं|प्रतिदिन कमाई|यूट्यूब लाइक|टेलीग्राम चैनल|घर बैठे नौकरी|part-time job|earn [0-9,]+ per day|like youtube videos|hotel review job|telegram channel|daily payout)/gi,
    category: 'Suspicious Financial Request',
    explanation: {
      en: 'Task-based scam: Fake jobs promising daily returns that ultimately steal upfront "security" or "recharge" deposits.',
      hi: 'टास्क आधारित धोखाधड़ी: घर बैठे कमाई के नाम पर पहले छोटे पैसे देकर बाद में बड़ी रकम ऐंठ ली जाती है।',
      gu: 'ટાસ્ક સ્કેમ: ઘરે બેઠા સરળ કમાણીની લાલચ આપીને પાછળથી ડિપોઝીટના નામે મોટી રકમ પડાવી લેવાય છે.'
    }
  }
];

export function detectMessageLanguage(
  text: string
): 'English' | 'Hindi (हिंदी)' | 'Gujarati (ગુજરાતી)' | 'Multilingual' | 'Unspecified' {
  if (!text || !text.trim()) return 'Unspecified';

  const hasDevanagari = /[\u0900-\u097F]/.test(text);
  const hasGujarati = /[\u0A80-\u0AFF]/.test(text);
  const hasLatin = /[a-zA-Z]/.test(text);

  if (hasDevanagari && hasGujarati) return 'Multilingual';
  if (hasGujarati) return 'Gujarati (ગુજરાતી)';
  if (hasDevanagari) return 'Hindi (हिंदी)';
  if (hasLatin) return 'English';

  return 'Unspecified';
}

interface RawMatch {
  start: number;
  end: number;
  text: string;
  category: MessagePatternMatch['category'];
  explanation: string;
}

export function analyzeMessageText(text: string): MessageAnalysisResult {
  if (!text || text.trim().length === 0) {
    return {
      detectedIssues: [],
      generalObservation:
        'Paste any suspicious SMS, WhatsApp message, or email in Gujarati, Hindi, or English to inspect warning signs.',
      recommendedFirstStep: 'Enter or paste the message above.',
      detectedLanguage: 'Unspecified',
      highlightedSpans: []
    };
  }

  const detectedLanguage = detectMessageLanguage(text);
  const rawMatches: RawMatch[] = [];

  for (const pattern of SUSPICIOUS_PATTERNS) {
    // Reset regex index
    pattern.regex.lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.regex.exec(text)) !== null) {
      const matchText = match[0];
      const start = match.index;
      const end = start + matchText.length;

      let explanationText = pattern.explanation.en;
      if (detectedLanguage === 'Gujarati (ગુજરાતી)' && pattern.explanation.gu) {
        explanationText = `${pattern.explanation.gu} (${pattern.explanation.en})`;
      } else if (detectedLanguage === 'Hindi (हिंदी)' && pattern.explanation.hi) {
        explanationText = `${pattern.explanation.hi} (${pattern.explanation.en})`;
      }

      rawMatches.push({
        start,
        end,
        text: matchText,
        category: pattern.category,
        explanation: explanationText
      });

      // Avoid infinite loop on zero-width match
      if (pattern.regex.lastIndex === start) {
        pattern.regex.lastIndex++;
      }
    }
  }

  // Deduplicate and aggregate detected issues for the summary list
  const seenPhrases = new Set<string>();
  const detectedIssues: MessagePatternMatch[] = [];

  for (const m of rawMatches) {
    const key = `${m.category}:${m.text.toLowerCase().trim()}`;
    if (!seenPhrases.has(key)) {
      seenPhrases.add(key);
      detectedIssues.push({
        phrase: m.text,
        category: m.category,
        explanation: m.explanation
      });
    }
  }

  // Merge overlapping and adjoining intervals for highlighting the original text
  rawMatches.sort((a, b) => a.start - b.start);

  const mergedIntervals: RawMatch[] = [];
  for (const current of rawMatches) {
    if (mergedIntervals.length === 0) {
      mergedIntervals.push({ ...current });
    } else {
      const prev = mergedIntervals[mergedIntervals.length - 1];
      if (current.start <= prev.end) {
        // Overlap detected: extend end and append explanation if distinct
        prev.end = Math.max(prev.end, current.end);
        prev.text = text.slice(prev.start, prev.end);
      } else {
        mergedIntervals.push({ ...current });
      }
    }
  }

  // Construct highlighted spans covering 100% of the original text
  const highlightedSpans: HighlightSpan[] = [];
  let cursor = 0;

  for (const interval of mergedIntervals) {
    if (interval.start > cursor) {
      highlightedSpans.push({
        text: text.slice(cursor, interval.start),
        isFlagged: false
      });
    }

    highlightedSpans.push({
      text: text.slice(interval.start, interval.end),
      isFlagged: true,
      category: interval.category,
      explanation: interval.explanation
    });

    cursor = interval.end;
  }

  if (cursor < text.length) {
    highlightedSpans.push({
      text: text.slice(cursor),
      isFlagged: false
    });
  }

  let generalObservation = '';
  let recommendedFirstStep = '';

  if (detectedIssues.length === 0) {
    if (detectedLanguage === 'Gujarati (ગુજરાતી)') {
      generalObservation = 'આ સંદેશમાં કોઈ જાણીતા સાયબર છેતરપિંડીના મુખ્ય ચેતવણી સંકેતો મળ્યા નથી.';
      recommendedFirstStep = 'જો સંદેશમાં નાણાકીય લેવડદેવડ કે લિંક હોય, તો હંમેશા સત્તાવાર કચેરી અથવા એપથી ખરાઈ કરો.';
    } else if (detectedLanguage === 'Hindi (हिंदी)') {
      generalObservation = 'इस संदेश में कोई सामान्य फ़िशिंग या धोखाधड़ी वाले मुख्य शब्द नहीं मिले।';
      recommendedFirstStep = 'यदि संदेश में बैंक खाते, पैसे या लिंक का उल्लेख है, तो सीधे आधिकारिक हेल्पलाइन से पुष्टि करें।';
    } else {
      generalObservation =
        'No recognized scam keywords or phishing phrases were identified in this sample.';
      recommendedFirstStep =
        'Even without obvious keyword red flags, always verify the sender through independently searched official contacts if the message requests money or sensitive information.';
    }
  } else if (detectedIssues.length === 1) {
    generalObservation = `Found 1 recognized red flag in this message (${detectedIssues[0].category}).`;
    recommendedFirstStep =
      'Do not tap any links or dial the numbers provided in the message. Contact the alleged sender via their official website or verified mobile app.';
  } else {
    generalObservation = `Found ${detectedIssues.length} distinctive warning indicators across account blocking, urgency, links, and credential requests.`;
    recommendedFirstStep =
      'Do not engage with the sender. If you have already responded, shared info, or tapped a link, use the Recovery Assistant below to take immediate protective measures.';
  }

  return {
    detectedIssues,
    generalObservation,
    recommendedFirstStep,
    detectedLanguage,
    highlightedSpans
  };
}

export interface SampleMessageItem {
  language: 'English' | 'Hindi (हिंदी)' | 'Gujarati (ગુજરાતી)';
  label: string;
  text: string;
}

export const SAMPLE_MESSAGES: SampleMessageItem[] = [
  // Gujarati Samples
  {
    language: 'Gujarati (ગુજરાતી)',
    label: 'બેંક ખાતું બ્લોક ધમકી (Gujarati)',
    text: 'પ્રિય ગ્રાહક, તમારું એસબીઆઈ બેંક ખાતું બ્લોક કરવામાં આવ્યું છે. કાયમી બંધ થવાથી બચવા માટે તુરંત પાન કાર્ડ અપડેટ કરો: https://sbi-kyc-verify.top/pan. છેલ્લી ચેતવણી.'
  },
  {
    language: 'Gujarati (ગુજરાતી)',
    label: 'વીજળી બિલ કાપણી મેસેજ (Gujarati)',
    text: 'માનનીય ગ્રાહક, તમારું વીજ કનેક્શન આજે રાત્રે 9:30 વાગ્યે વીજળી બિલ બાકી હોવાથી કાપી નાખવામાં આવશે. તાત્કાલિક લાઇન ચાલુ રાખવા માટે અમારા અધિકારી 98765-XXXXX પર તુરંત સંપર્ક કરો.'
  },
  {
    language: 'Gujarati (ગુજરાતી)',
    label: 'ઓટીપી શેર અને કેવાયસી (Gujarati)',
    text: 'તમારા એકાઉન્ટ વેરિફિકેશન માટે આવેલો 6 આંકડાનો ઓટીપી શેર કરો અને બેંકિંગ વિગતો આપો, નહીં તો એકાઉન્ટ સ્થગિત કરવામાં આવશે.'
  },
  {
    language: 'Gujarati (ગુજરાતી)',
    label: 'કસ્ટમ્સ પોલીસ વોરંટ (Gujarati)',
    text: 'સાયબર ક્રાઈમ અને કસ્ટમ્સ ડિપાર્ટમેન્ટ. તમારા નામે ગેરકાયદેસર પાર્સલ મળ્યું છે અને ધરપકડ વોરંટ જારી થયું છે. ડિજિટલ અરેસ્ટથી બચવા માટે તુરંત આ નંબર પર સંપર્ક કરો.'
  },

  // Hindi Samples
  {
    language: 'Hindi (हिंदी)',
    label: 'बैंक खाता ब्लॉक / पैन कार्ड (Hindi)',
    text: 'प्रिय ग्राहक, आपका एसबीआई खाता पैन कार्ड अपडेट न होने के कारण ब्लॉक कर दिया गया है। 24 घंटे में स्थायी निलंबन से बचने के लिए तुरंत इस लिंक पर केवाईसी अपडेट करें: https://sbi-kyc-verify.top/pan'
  },
  {
    language: 'Hindi (हिंदी)',
    label: 'बिजली बिल कनेक्शन कट (Hindi)',
    text: 'प्रिय उपभोक्ता, आज रात 9:30 बजे बिजली विभाग द्वारा आपका बिजली कनेक्शन काट दिया जाएगा क्योंकि पिछले माह का बिल अपडेट नहीं हुआ है। तुरंत बिजली अधिकारी 98765-XXXXX पर संपर्क करें।'
  },
  {
    language: 'Hindi (हिंदी)',
    label: 'ओटीपी और बैंकिंग विवरण (Hindi)',
    text: 'आपके खाते का सत्यापन लंबित है। कृपया एसएमएस पर प्राप्त ओटीपी बताएं और बैंकिंग विवरण दर्ज करें, अन्यथा खाता बंद कर दिया जाएगा।'
  },
  {
    language: 'Hindi (हिंदी)',
    label: 'पुलिस पार्सल / डिजिटल अरेस्ट (Hindi)',
    text: 'यह मुंबई पुलिस साइबर क्राइम सेल है। कस्टम्स द्वारा आपके नाम पर भेजा गया अवैध पार्सल पकड़ा गया है। आपके खिलाफ गिरफ्तारी वारंट जारी हुआ है। तुरंत संपर्क करें नहीं तो पुलिस पहुंचेगी।'
  },

  // English Samples
  {
    language: 'English',
    label: 'Account Blocked Threat (English)',
    text: 'Dear Customer, Your SBI YONO Account has been blocked due to pending PAN card update. Please update KYC immediately to avoid permanent suspension: https://sbi-kyc-verify.top/pan. Do not ignore.'
  },
  {
    language: 'English',
    label: 'Electricity Cutoff Urgency (English)',
    text: 'Dear consumer, your electricity power supply will be disconnected tonight at 9:30 pm from the electricity office because your previous month bill was not updated. Please immediately contact our power officer at 98765-XXXXX. Bescom Urgency.'
  },
  {
    language: 'English',
    label: 'OTP / Banking Credentials (English)',
    text: 'Urgent: To prevent immediate card block, please share OTP received on your mobile and verify your banking details at https://secure-bank-update.site/login.'
  },
  {
    language: 'English',
    label: 'Police / Digital Arrest (English)',
    text: 'This is Delhi Police Cyber Crime Department. An illegal parcel containing contraband has been intercepted in your name by Customs. An arrest warrant has been issued. Call immediately or face immediate legal detention.'
  }
];
