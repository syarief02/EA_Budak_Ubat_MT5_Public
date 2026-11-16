# MQL5 Market — EA Budak Ubat v1.68 Release Notes (MT5 #195399 and MT4 #105318)

Changes from **v1.67 to v1.68**. Paste into the "What's new" field when uploading the new version. The MT4 Market file declares `#property version "1.680"` (the Market compares the minor part as an integer and an earlier MT4 release was 1.621).

## English

```
Version 1.68 (bug fix, same on MT5 and MT4):
- MinMarginLevelToTrade now controls new orders: a new entry or grid layer is skipped when the margin level after opening it would fall below the setting (default 200%, 0 = off). Before, a fixed 200% check on the current margin level was used and the input had no effect.
- EmergencyMarginLevel now sets the emergency close level (default 60%, 0 = off). Before, it was fixed at 60%.
- The start-up log prints the correct version.
```
