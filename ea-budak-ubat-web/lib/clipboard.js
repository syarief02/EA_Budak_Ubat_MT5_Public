// Copies text to the clipboard and reports whether it worked.
// Uses the async Clipboard API when available, then falls back to a hidden textarea,
// which in-app browsers (Facebook, Telegram) still allow. Never throws.
export async function copyText(text) {
  const value = String(text ?? "");
  if (typeof window === "undefined") return false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch (e) {
    // Permission denied or not focused: try the fallback below.
  }

  try {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-1000px";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    area.setSelectionRange(0, value.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch (e) {
    return false;
  }
}
