import Link from "next/link";
import LegalPage, { H2 } from "@/app/components/LegalPage";

export const metadata = {
  metadataBase: new URL("https://eabudakubat.com"),
  title: "Terms of Use | Bubat AI",
  description: "Risk notice and terms of use for the Bubat AI forex trading app.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="4 October 2026">
      <p>
        These terms apply to the <strong>Bubat AI</strong> Windows app. By installing or using it you accept them.
      </p>

      <H2>1. What Bubat AI is</H2>
      <p>
        Bubat AI is experimental software that trades forex automatically in a MetaTrader 5 account, using an AI model
        that runs on your own computer. It is not a licensed financial product or service.
      </p>

      <H2>2. Trading is risky</H2>
      <p>
        Trading foreign exchange and gold on margin carries a high level of risk and may not be suitable for you. You can
        lose money quickly. The bot has lost money in testing. Past results, including any shown in the app, do not
        predict future results.
      </p>

      <H2>3. Demo accounts only by default</H2>
      <p>
        Bubat AI refuses to trade real-money accounts unless you deliberately change a setting by hand
        (<code>risk_parameters.allow_live_trading</code>). Test it on a demo account for weeks before you even consider
        real money. If you enable real-money trading, you do so entirely at your own risk.
      </p>

      <H2>4. Not financial advice</H2>
      <p>
        Nothing in Bubat AI, its chat answers, signals, entry, take-profit or stop-loss suggestions or reports is
        financial advice or a recommendation to buy or sell anything. The AI can be wrong, slow or unavailable, and it can
        misunderstand the market.
      </p>

      <H2>5. Your responsibility</H2>
      <p>
        You are responsible for your trading account, your broker&apos;s terms, any taxes, and for watching what the bot
        does. Keep your computer, MetaTrader 5 and internet connection running reliably while the bot trades; a crash,
        sleep, power cut or lost connection can leave trades unmanaged (open trades keep their stop loss and take profit
        in MetaTrader 5).
      </p>

      <H2>6. No warranty</H2>
      <p>
        The software is provided &quot;as is&quot;, without warranty of any kind, express or implied. In no event shall
        the authors be liable for any claim, damages, trading losses or other liability arising from the use of the
        software.
      </p>

      <H2>7. Account, free trial and license</H2>
      <p>
        Bubat AI needs you to sign in with a Google account. Each account gets one free 7-day trial (one per PC). After
        the trial, new trades pause until you have a license: contact{" "}
        <a href="mailto:support@eabudakubat.com">support@eabudakubat.com</a>. Trades that are already open keep being
        managed. The license is personal and may be revoked if these terms are broken.
      </p>

      <H2>8. Data you share</H2>
      <p>
        During the free trial, the app shares your bot&apos;s trade results with the Bubat AI community database to
        improve the bot. It never shares your account number, balance, money amounts, passwords or chats. See the{" "}
        <Link href="/privacy">Privacy Policy</Link> for details and how to delete your data.
      </p>

      <H2>9. What is installed and downloaded</H2>
      <p>
        Bubat AI installs into your user folder and needs no administrator rights. On first start it can download and
        install Ollama (an AI engine, from ollama.com) and AI models that fit your computer. Updates are downloaded from
        the project&apos;s official GitHub releases, verified with a checksum and tested before they are installed.
      </p>

      <H2>Contact</H2>
      <p>
        <a href="mailto:support@eabudakubat.com">support@eabudakubat.com</a> ·{" "}
        <a href="https://eabudakubat.com">eabudakubat.com</a>
      </p>
    </LegalPage>
  );
}
