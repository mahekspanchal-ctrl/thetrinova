import { TestScenario } from '../types';

export const TEST_SCENARIOS: TestScenario[] = [
  {
    id: 'scenario_link',
    code: 'Scenario A',
    title: 'Clicked a suspicious link',
    summary: 'The user clicked a link in an SMS or email, but closed the page without typing any credentials or downloading files.',
    userStory:
      'I got a text message saying my electricity bill was overdue. In panic, I tapped the short link. It opened a website asking for my consumer number and password. I realized it looked suspicious, so I closed the tab immediately without typing anything.',
    incidents: ['clicked_link'],
    answers: {
      enteredInfoOnSite: 'no_closed',
      fileOrAppDownloaded: 'no',
      moneyDeductedStatus: 'not_yet'
    }
  },
  {
    id: 'scenario_otp',
    code: 'Scenario B',
    title: 'Shared an OTP',
    summary: 'The user shared a bank-related one-time password with a caller and is worried money may be debited.',
    userStory:
      'A caller claimed to be updating my reward points on my credit card. They said an verification code would arrive on my SMS. I read out the 6-digit OTP over the call. Right after hanging up, I felt a pit in my stomach and suspect it was a scam.',
    incidents: ['shared_otp', 'entered_details'],
    answers: {
      affectedService: 'bank',
      otpSharingChannel: 'call',
      moneyDeductedStatus: 'unknown_possible',
      enteredInfoOnSite: 'credentials'
    }
  },
  {
    id: 'scenario_app',
    code: 'Scenario C',
    title: 'Installed unfamiliar app',
    summary: 'The user downloaded and installed an application after a caller claiming to be technical support asked them to do so.',
    userStory:
      'I was having trouble with a refund on a delivery order. A support number told me to download an app named "QuickSupport" from a link so they could assist me with my screen. I installed it and gave permission, then saw my phone screen flicker.',
    incidents: ['installed_app'],
    answers: {
      remoteAppType: 'screen_share',
      deviceInternetStatus: 'connected',
      fileOrAppDownloaded: 'downloaded_and_installed',
      moneyDeductedStatus: 'unknown_possible'
    }
  },
  {
    id: 'scenario_money',
    code: 'Scenario D',
    title: 'Money deducted / Unauthorized transaction',
    summary: 'The user notices funds debited from their bank or UPI account after interacting with a suspected scammer.',
    userStory:
      'I was selling a sofa online. The buyer sent me a QR code and told me to scan it and enter my UPI PIN to "receive payment". Moments later, ₹28,000 was deducted from my savings account instead of being credited.',
    incidents: ['unauthorized_txn', 'entered_details'],
    answers: {
      moneyDeductedStatus: 'yes_deducted',
      hoursSinceTransaction: 'under_2h',
      affectedService: 'upi'
    }
  }
];
