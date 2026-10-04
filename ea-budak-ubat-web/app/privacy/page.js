import LegalPage, { H2 } from "@/app/components/LegalPage";

export const metadata = {
  metadataBase: new URL("https://eabudakubat.com"),
  title: "Privacy Policy | Bubat AI",
  description: "What the Bubat AI forex trading app sends from your PC, why, and how to delete it.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="4 October 2026">
      <p>
        <strong>Bubat AI</strong> is a forex trading agent that runs on your own Windows PC. This policy explains what
        information leaves your PC when you use the Bubat AI app, why, and what you can do about it. Contact:{" "}
        <a href="mailto:support@eabudakubat.com">support@eabudakubat.com</a>.
      </p>

      <H2>What stays on your PC</H2>
      <p>
        Your MetaTrader 5 login, password, account number, balance and money amounts, your chats with the AI, your logs
        and your settings stay on your PC. The AI models run on your PC. Bubat AI does not send them anywhere.
      </p>

      <H2>What is sent, and why</H2>
      <p>
        <strong>1. Your Google account (to sign in and for your license).</strong> When you sign in with Google, we
        receive your <strong>email address</strong>, your name and a user ID from Google, through our sign-in provider,
        Supabase. We use them only to run your free trial and your license. We do not receive your Google password, and
        we do not access any other Google data (no Gmail, Drive, contacts or calendar).
      </p>
      <p>
        <strong>2. An anonymous ID for your PC (one free trial per PC).</strong> A one-way hash of your Windows
        installation ID. It can&apos;t be turned back into the ID, and it is only used to stop repeated free trials on
        the same PC.
      </p>
      <p>
        <strong>3. Your bot&apos;s trade results (community data).</strong> To improve Bubat AI for everyone, the app
        shares the results of trades <strong>the bot</strong> made: symbol, buy or sell, trading session, open and close
        time, result in R and in pips, how the trade ended, how long it was open, the app version, the AI model and your
        broker&apos;s server name, plus daily counts of the bot&apos;s decisions. It <strong>never</strong> includes your
        account number, balance, profit or loss in money, or any trade you placed by hand.
      </p>
      <ul style={{ paddingLeft: "22px", margin: "0 0 16px" }}>
        <li>During the free trial, sharing trade results is part of the trial.</li>
        <li>With a license you can turn sharing off in Settings at any time.</li>
        <li>You can delete everything you have shared with <em>Delete my shared data</em> in Settings.</li>
      </ul>
      <p>
        <strong>4. Updates and news.</strong> The app downloads updates from our official GitHub releases page and
        reads public financial news websites. These sites may see your IP address, as with any web visit.
      </p>

      <H2>Google user data</H2>
      <p>
        Bubat AI&apos;s use and transfer of information received from Google APIs adheres to the{" "}
        <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements. Your Google email and name are used only to identify your account and
        license; they are not used for advertising, not sold, and not shared with anyone else.
      </p>

      <H2>Where it is stored and who sees it</H2>
      <p>
        Data is stored with <strong>Supabase</strong> (our database and sign-in provider). Only the Bubat AI owner can
        read it. Community trade results are analysed in aggregate (for example the average result per currency pair) to
        improve the bot. We do not sell or share personal data with anyone else.
      </p>

      <H2>How long we keep it</H2>
      <p>
        Your email and license record are kept while you use Bubat AI, plus up to 12 months after your last sign-in.
        Shared trade results are kept until you delete them or ask us to.
      </p>

      <H2>Your rights</H2>
      <p>
        You can ask what we hold about you, ask us to correct it, or ask us to delete your account and data, by emailing{" "}
        <a href="mailto:support@eabudakubat.com">support@eabudakubat.com</a>. You can delete your shared trade results
        yourself in the app at any time. Bubat AI is operated from Malaysia and follows the Personal Data Protection Act
        2010 (PDPA).
      </p>

      <H2>Changes</H2>
      <p>If this policy changes, the new version is published on this page with a new date.</p>
    </LegalPage>
  );
}
