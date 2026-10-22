export type IncidentId =
  | 'clicked_link'
  | 'entered_details'
  | 'shared_otp'
  | 'installed_app'
  | 'unauthorized_txn'
  | 'threatened_official'
  | 'unsure';

export interface IncidentOption {
  id: IncidentId;
  title: string;
  shortDesc: string;
}

export interface FollowUpAnswers {
  enteredInfoOnSite?: 'no_closed' | 'personal_details' | 'credentials' | 'card_bank' | 'unsure';
  fileOrAppDownloaded?: 'no' | 'downloaded_not_opened' | 'downloaded_and_installed' | 'unsure';
  affectedService?: 'bank' | 'upi' | 'email_apple_google' | 'social_media' | 'multiple' | 'unsure';
  otpSharingChannel?: 'call' | 'chat_sms' | 'website' | 'unsure';
  remoteAppType?: 'screen_share' | 'unknown_apk' | 'not_sure';
  deviceInternetStatus?: 'connected' | 'disconnected_airplane';
  moneyDeductedStatus?: 'yes_deducted' | 'unknown_possible' | 'not_yet';
  hoursSinceTransaction?: 'under_2h' | '2_to_24h' | '1_to_3d' | 'over_3d';
  impersonatorType?: 'police_cbi' | 'bank_official' | 'customs_courier' | 'telecom' | 'tax' | 'other';
  threatDemand?: 'send_money' | 'stay_on_call' | 'share_docs' | 'video_call';
}

export type ActionCategory = 'DO THIS FIRST' | 'DO THIS NEXT' | 'GET HELP';

export interface RecoveryAction {
  id: string;
  category: ActionCategory;
  title: string;
  whyThisFirst: string;
  howToCarryOut: string[];
  urgencyLevel: 'immediate' | 'high' | 'recommended';
  serviceTarget?: string;
  helplineReference?: string;
  officialLink?: string;
}

export interface TestScenario {
  id: string;
  title: string;
  code: 'Scenario A' | 'Scenario B' | 'Scenario C' | 'Scenario D';
  summary: string;
  userStory: string;
  incidents: IncidentId[];
  answers: FollowUpAnswers;
}

export interface MessagePatternMatch {
  phrase: string;
  category: 'Urgency / Pressure' | 'Credential Harvesting' | 'Authority Impersonation' | 'Remote Access Trap' | 'Suspicious Financial Request';
  explanation: string;
}

export interface HighlightSpan {
  text: string;
  isFlagged: boolean;
  category?: MessagePatternMatch['category'];
  explanation?: string;
}

export interface MessageAnalysisResult {
  detectedIssues: MessagePatternMatch[];
  generalObservation: string;
  recommendedFirstStep: string;
  detectedLanguage?: 'English' | 'Hindi (हिंदी)' | 'Gujarati (ગુજરાતી)' | 'Multilingual' | 'Unspecified';
  highlightedSpans?: HighlightSpan[];
}
