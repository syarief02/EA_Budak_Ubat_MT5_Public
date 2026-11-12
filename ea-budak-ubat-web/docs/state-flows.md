# eabudakubat.com state flows

These diagrams cover how a visitor moves from browsing to an EA inquiry to getting an EA file, and the UI state behind each step. The `Before` diagrams show what the code did up to 2026-11-12, with the bugs marked. The `After` diagrams show the behaviour the code has now.

The live site is served from Vercel at `https://eabudakubat.com`. Pages are client components that read static data from `lib/` and two API routes (`/api/comments`, `/api/products`), which use the Supabase project `qthjikwteugfowlflkfi`.

## 1. Visitor journey

```mermaid
stateDiagram-v2
    [*] --> Browsing: lands on / or an EA page
    Browsing --> Checking: "Check account" (#authorization)
    Browsing --> Registering: "Get the EA free" (#broker-partners)
    Browsing --> Buying: MQL5 Market link
    Browsing --> Inquiring: Telegram @SyariefAzman / community post

    Checking --> Authorized: number is in MT4/MT5 whitelist
    Checking --> Trial: real account, not whitelisted, before trial cutoff
    Checking --> TrialEnded: not whitelisted, cutoff date has passed
    Checking --> NoMatch: EA not available on the chosen platform

    Trial --> Registering: "Get Permanent Authorization"
    TrialEnded --> Registering
    NoMatch --> Checking: change platform or EA filter

    Registering --> Inquiring: deposit $100, send account number on Telegram
    Inquiring --> Whitelisted: owner runs authorize-accounts.ps1 (compile, push, deploy)
    Whitelisted --> Delivered: owner sends fresh .ex5/.ex4, or visitor re-downloads after deploy
    Authorized --> Delivered: download buttons in checker
    Buying --> Delivered: MetaTrader Market tab
    Delivered --> [*]
```

Rules that hold across the journey:

- A whitelisted account is permanent. Only unauthorized real accounts carry the trial cutoff (`TRIAL.expiryDate` in `lib/authorizedAccounts.js`). Demo accounts never expire.
- A binary only knows the accounts that were whitelisted when it was compiled. After `Whitelisted`, the visitor must get a file built after that point (AGENTS.md, "Send the fresh binary").
- Every download link on the site is built from `TRIAL.expiryDate`, so the monthly expiry update changes one value instead of editing each URL by hand.

## 2. License checker (`app/components/AccountChecker.js`)

### Before

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Error: submit empty or non-digits
    Idle --> Results: submit digits (hasSearched = true)
    Results --> Results: every keystroke re-runs checkAccount on the half-typed number (bug)
    Results --> Blank: EA filter has no build for the platform, results = [] and nothing renders (bug)
    Results --> DeadLink: compact mode (home page), "Get Permanent Authorization" points to #partner-brokers, which is not rendered (bug)
    Results --> Results: trial shown as "Active" even after the cutoff date (bug)
```

### After

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Invalid: submit empty or non-digits
    Invalid --> Idle: edit input
    Idle --> Checked: submit digits (submittedAccount = input)
    Checked --> Checked: change EA or platform filter (same submitted number)
    Checked --> Stale: input edited, differs from submittedAccount
    Stale --> Checked: submit again
    Stale --> Idle: clear input
    state Checked {
        [*] --> HasResults
        [*] --> NoMatch: EA filter has no build for the platform
        HasResults --> Authorized
        HasResults --> Trial
        HasResults --> TrialEnded
    }
```

- Results always belong to `submittedAccount`. The header names that number. When the input differs, a hint tells the visitor to press Check Status.
- `NoMatch` explains which platform the EA supports, instead of rendering nothing.
- `authorizeHref` points the trial CTA at the section the host page actually renders (`#broker-partners` on the home page).

## 3. Community post, which is where inquiries arrive (`app/community/page.js`, `app/api/comments/route.js`)

### Before

```mermaid
stateDiagram-v2
    [*] --> Loading
    Loading --> Feed: GET ok
    Loading --> Empty: GET failed, shown as "No posts yet" (bug)
    Feed --> Submitting: submit (client checks: name, message, honeypot, 2 s)
    Submitting --> Rejected: server 4xx/5xx
    Submitting --> Posted: 201
    Posted --> Feed: refetch GET, served from the CDN cache (s-maxage 10, SWR 59), so the new post can be missing for about 70 s (bug)
    note right of Posted
        Hidden side effects:
        - "Related EA (Optional)" is required by the server for EA requests
          and silently dropped for ideas and feedback
        - honeypot and timing values are never sent, so the server checks never run
        - reserved names (Syarief, Admin) accept a fallback token that is in this public repo
    end note
```

### After

```mermaid
stateDiagram-v2
    [*] --> Loading
    Loading --> Feed: GET ok
    Loading --> LoadFailed: GET failed
    LoadFailed --> Loading: Retry
    Feed --> Editing
    Editing --> Invalid: name < 2, message < 5, EA name missing for an EA request
    Invalid --> Editing
    Editing --> Submitting: valid
    Submitting --> Rejected: server error (message shown, form kept)
    Rejected --> Editing
    Submitting --> Posted: 201, the returned row is shown at the top of the feed immediately
    Posted --> Feed: background refetch with ?fresh=<ts> (bypasses CDN), merged so the new post stays
```

- The EA name field appears only for "Request EA", and it is required there. That matches what the server stores and shows.
- The client sends `bot_catch` and `form_elapsed_ms`. The server checks elapsed time measured in the browser, so clock skew between visitor and server cannot reject a real post.
- Reserved names work only with `ADMIN_COMMENT_TOKEN` from the Vercel environment. With no token set, reserved names are always refused.
- Reactions are labelled as saved on this device, since they never leave the browser.

## 4. Scroll reveal (`.animate-in`)

### Before

Every page ran its own IntersectionObserver once, on mount. An element with `.animate-in` that mounted later stayed at `opacity: 0` for good:

- `/tools`: the Preset Studio and Margin Calculator tabs mount on tab switch, so both were blank. Verified on the live site on 2026-11-12.
- The simulator's "Basket take profit realized" badge carries `.animate-in` plus its own bounce animation. Once the bounce ends, `.animate-in` hides it again, so it only flashed for 0.4 s.

### After

```mermaid
stateDiagram-v2
    [*] --> Hidden: element with .animate-in is in the DOM (initial render or mounted later)
    Hidden --> Visible: RevealOnScroll (layout) sees it intersect, adds .visible
    Hidden --> Visible: no IntersectionObserver support, revealed at once
    Visible --> [*]
```

`app/components/RevealOnScroll.js` is mounted once in `app/layout.js`. A MutationObserver picks up elements that mount later, so pages no longer carry their own observer.

## 5. Rotating broker banner (`app/components/RotatingAdBanner.js`)

### Before

The index, the fade state and two timers that share one ref were managed separately. If the mouse entered during the 250 ms fade-out, the pause cleared the pending timeout, so the banner stayed faded out (invisible) under the cursor. A pill click during an auto-advance could be skipped.

### After

```mermaid
stateDiagram-v2
    [*] --> Shown
    Shown --> Fading: auto timer (6 s, only while not paused) or user picks an ad
    Fading --> Fading: user picks another ad (target replaced, timer restarts)
    Fading --> Shown: fade timer ends, index = target
```

A pause only stops the 6 s auto timer. A fade that has started always completes.

## 6. Number fields in the grid calculator (`app/components/GridCalculator.js`)

### Before

`onChange` clamped to the minimum on every keystroke. Typing `5000` into the balance gave `10000` (verified live): "5" was raised to 10, then the zeros were appended. The risk table then shows a balance twice the intended size.

### After

```mermaid
stateDiagram-v2
    [*] --> Committed
    Committed --> Drafting: keystroke (draft text kept as typed)
    Drafting --> Drafting: draft parses and is in range, so the value updates live
    Drafting --> Committed: blur, draft is normalised to the clamped value
```

## 7. Preset (.set) download (`app/components/SetGenerator.js`)

### Before

Free-text fields went straight into the file, so `Lots=` or `Lots=abc` could be written. MetaTrader reads that as 0, and the EA never trades. "✓ Downloaded" stayed on after later edits, and the file header named the preset even when its values had been changed.

### After

```mermaid
stateDiagram-v2
    [*] --> Valid
    Valid --> Invalid: a numeric field does not parse, or Lots <= 0
    Invalid --> Valid: field fixed
    Valid --> Downloaded: download (file header marks customised values)
    Downloaded --> Valid: any edit, preset or platform change, or after 4 s
```

## 8. Copy buttons (partner codes, MQL5 link, Quest passport)

### Before

`navigator.clipboard.writeText` was called without awaiting it, and "Copied!" was shown even when the write failed. In-app browsers without the Clipboard API, such as Facebook and Telegram, either did nothing (Headway page) or showed a false "Copied!". Overlapping timers cleared the label early.

### After

`lib/clipboard.js` has `copyText()`, which falls back to a hidden textarea and resolves `true` or `false`. `lib/useFlash.js` keeps a single timer per button. Each button shows "Copied" only after a successful write, and otherwise asks the visitor to copy the code by hand.

## 9. Other fixes

| Area | Problem | Fix |
|---|---|---|
| Facebook Pixel `Lead` | Any button whose text contained "download" counted as a lead, including FAQ questions. A .set download counted twice (button, then the generated link). | Only links (`<a>`) count, matched by file type or `download` attribute. |
| Command palette | ArrowDown with no matches set the selection to `NaN`. | The index is clamped, and reset when the palette opens. |
| EA page parameters | `RSI_TF` default listed as `PERIOD_M15`. The v1.67 source uses `PERIOD_H1`. | Text corrected. |
| Forex Quest Blitz | The "next question" timeout from a finished game could replace the first question of a new game. | Pending timeouts are cleared on start, finish and unmount. |
| Grid calculator, XAUUSD | A pip was treated as a $0.10 move at $10 per lot. EA v1.67 (and the Preset Studio's gold preset) use a $0.01 pip on 2- and 3-digit gold, so gold distances and drawdown did not match the EA's inputs. | $0.01 pip, $1 per 1.00 lot. The hint explains that the EURUSD defaults make a very tight gold grid. |
| `/api/comments` limits | The per-IP limiter lives in memory, so each serverless instance has its own copy and it resets on cold start. | `lib/commentLimits.js` reads the comments table: at most 8 posts site-wide per 10 minutes (429), and the same message within 24 hours is refused (409, which also stops double posts). Query errors fail open. |

## Comment board security (done 2026-11-13)

- `ADMIN_COMMENT_TOKEN` is set in Vercel (Production, sensitive). The local copy is in the git-ignored `.env` at the repo root. The community form never sends it, so posting as "Syarief (Creator)" means a POST to `/api/comments` with `admin_token` in the body. The old fallback value is public in git history, so treat it as burned.
- Direct inserts are closed. The route inserts with the public anon key, and the old policy `guestbook_public_insert` let anyone with that key insert rows directly, skipping every check in `/api/comments`. Now only the server and the database share a secret:
  - `lib/supabaseServer.js` sends `x-comments-key: <COMMENTS_INSERT_KEY>` on every request. `COMMENTS_INSERT_KEY` is a Vercel Production server variable (sensitive, never `NEXT_PUBLIC_`), with a local copy in the root `.env`.
  - In the database, `private.app_settings` (row `comments_insert_key`) holds the same value, and `private.comments_insert_allowed()` (security definer) compares it with the request header. The INSERT policy `comments_insert_via_site_api` uses that function. The SELECT policy `guestbook_public_read` is unchanged, since the feed needs it.
  - Verified live: a post through the site returns 201, and a direct REST insert with the anon key returns 401.

  To rotate the key, change the Vercel variable and the `private.app_settings` row together, then redeploy. Posts fail while the two differ. To undo, create an anon INSERT policy `with check (true)` and drop `comments_insert_via_site_api`. Without `COMMENTS_INSERT_KEY` in Vercel, every post fails with an RLS error.
