# MQL5 Market — EA Budak Ubat MT5 v1.65 Release Notes (All 11 Languages)

Copy and paste the corresponding section into each language tab in the MQL5 Market "New version" modal.

---

### 1. English
```text
Version 1.65 Release Notes:
• Dynamic RSI Timeframe Display: Chart comment now reflects the configured RSI timeframe (e.g., M15, H1, H4) dynamically instead of a fixed label.
• Clamped Drawdown Display: Current DD is now clamped to 0.00% when equity exceeds balance (floating profit), eliminating misleading negative drawdown percentages.
• Real-Time Tick-by-Tick Spread: Spread display on the chart is now refreshed on every tick instead of once per bar.
• Dynamic Account Currency Symbol: Equity display automatically detects and shows your account's base currency (USD, EUR, GBP, etc.) instead of a static '$'.
• AutoConfig Status Visibility: Added on-chart status showing whether AutoConfig AI is Active or in Manual mode.
```

---

### 2. Russian (Русский)
```text
Версия 1.65 — Список изменений:
• Динамическое отображение таймфрейма RSI: В информации на графике теперь корректно отображается выбранный таймфрейм RSI (например, M15, H1, H4) вместо фиксированного текста.
• Исправление отображения просадки: Текущая просадка теперь ограничивается 0.00% при плавающей прибыли (когда средства превышают баланс), исключая отрицательные значения.
• Обновление спреда в реальном времени: Спред на графике теперь рассчитывается на каждом тике, обеспечивая мгновенную актуальность данных.
• Динамическая валюта счета: В строке баланса и средств теперь автоматически отображается базовая валюта вашего счета (USD, EUR, RUB и др.) вместо фиксированного знака '$'.
• Отображение статуса AutoConfig: Добавлен индикатор на графике, показывающий текущий режим — активен ли AutoConfig AI или используются ручные настройки (Manual).
```

---

### 3. Chinese (中文)
```text
1.65 版本更新说明：
• RSI 时间周期动态显示：图表信息面板现可实时显示所配置的 RSI 周期（如 M15、H1、H4），不再显示固定文本。
• 浮盈回撤显示修正：当净值大于余额（处于浮盈状态）时，当前回撤自动归零（0.00%），消除了误导性的负数回撤。
• 点差逐跳实时更新：图表上的点差现已改为每个 Tick 实时计算并刷新，而非仅在每根新 K 线更新。
• 动态账户货币符号：净值显示现可自动读取并显示账户本币（如 USD、EUR、CNY 等），替代原有的固定美元符号 '$'。
• AutoConfig 状态实时显示：新增图表面板状态指示，清晰展示 AutoConfig AI 是处于激活模式还是手动配置模式（Manual）。
```

---

### 4. Spanish (Español)
```text
Notas de la versión 1.65:
• Visualización dinámica del marco temporal de RSI: El comentario en el gráfico ahora muestra el período de tiempo configurado de RSI (ej. M15, H1, H4) en lugar de una etiqueta fija.
• Corrección de visualización de Drawdown: El Drawdown actual ahora se limita a 0.00% cuando la equidad supera el balance (beneficio flotante), eliminando porcentajes negativos confusos.
• Actualización de spread tick a tick: El valor del spread en el gráfico ahora se actualiza en cada tick en tiempo real, en vez de solo al cierre de vela.
• Moneda de cuenta dinámica: La línea de equidad ahora detecta y muestra automáticamente la divisa base de la cuenta (USD, EUR, etc.) en lugar de un símbolo '$' fijo.
• Indicador de estado de AutoConfig: Se agregó una línea en el gráfico que indica si AutoConfig AI está activo o en modo manual (Manual).
```

---

### 5. Portuguese (Português)
```text
Notas de atualização da Versão 1.65:
• Exibição dinâmica do timeframe do RSI: O painel no gráfico agora reflete dinamicamente o período do RSI selecionado (ex: M15, H1, H4) em vez de um texto fixo.
• Correção na exibição de rebaixamento (Drawdown): O DD atual agora é travado em 0.00% quando o capital líquido for superior ao saldo (lucro flutuante), evitando valores negativos.
• Atualização do Spread a cada Tick: O spread exibido no gráfico agora é recalculado a cada tick em tempo real, e não apenas no fechamento de barra.
• Moeda da conta dinâmica: A exibição do patrimônio líquido agora detecta automaticamente a moeda base da sua conta (USD, EUR, BRL, etc.) em vez de usar um cifrão '$' fixo.
• Status do AutoConfig no gráfico: Adicionado indicador no painel mostrando se o AutoConfig AI está Ativo ou em modo Manual.
```

---

### 6. Japanese (日本語)
```text
バージョン 1.65 アップデート情報：
• RSI 時間枠の動的表示：チャートコメントの RSI フィルター表示が、設定されたタイムフレーム（M15、H1、H4 など）に応じて動的に正しく表示されるようになりました。
• ドローダウン表示の修正：含み益発生時（有効証拠金が残高を上回っている場合）、現在のドローダウンがマイナス表記にならず正しく 0.00% で固定表示されるよう改善しました。
• ティックごとのスプレッドリアルタイム更新：チャート上のスプレッド表示がバー確定ごとから毎ティック更新に変更され、最新のスプレッドを即座に確認できます。
• 口座通貨単位の動的反映：有効証拠金の通貨記号が固定の「$」から、口座の基本通貨（USD、JPY、EUR など）に自動対応しました。
• AutoConfig 状態表示の追加：AutoConfig AI が稼働中（Active）か手動設定（Manual）かをチャート上で一目で確認できるステータス表示を追加しました。
```

---

### 7. German (Deutsch)
```text
Versionshinweise für Version 1.65:
• Dynamische RSI-Zeitrahmenanzeige: Im Chart-Kommentar wird nun der tatsächlich konfigurierte RSI-Zeitrahmen (z. B. M15, H1, H4) dynamisch angezeigt statt eines statischen Texts.
• Korrektur der Drawdown-Anzeige: Der aktuelle Drawdown wird bei Buchgewinnen (Eigenkapital übersteigt Kontostand) nun korrekt auf 0.00% begrenzt, um irreführende negative Werte zu vermeiden.
• Echtzeit-Spread-Aktualisierung bei jedem Tick: Der Spread auf dem Chart wird nun bei jedem Tick in Echtzeit neu berechnet und nicht mehr nur einmal pro Bar.
• Dynamische Kontowährung: Die Eigenkapitalanzeige erkennt und zeigt nun automatisch die tatsächliche Kontowährung (USD, EUR, CHF etc.) anstelle eines statischen '$'-Zeichens.
• AutoConfig-Statusanzeige: Neuer Status im Chart-Panel, der anzeigt, ob AutoConfig AI aktiv ist oder manuell konfiguriert wurde (Manual).
```

---

### 8. Korean (한국어)
```text
버전 1.65 릴리스 노트:
• RSI 타임프레임 동적 표시: 차트 정보 패널에서 고정된 텍스트 대신 실제 설정된 RSI 타임프레임(예: M15, H1, H4)이 실시간으로 정확하게 표시됩니다.
• 드로다운(DD) 표시 보정: 평가잔고(Equity)가 원금(Balance)보다 많은 수익 구간일 때 현재 드로다운이 음수로 나오지 않고 0.00%로 고정됩니다.
• 틱(Tick) 단위 실시간 스프레드 반영: 차트상의 스프레드가 봉 완성 시점이 아닌 매 틱마다 실시간으로 계산되어 갱신됩니다.
• 계좌 통화 단위 자동 인식: 자산 표시에서 고정된 '$' 대신 실제 계좌의 기본 통화(USD, EUR, KRW 등)가 자동으로 인식되어 표시됩니다.
• AutoConfig 상태 표시 추가: AutoConfig AI가 활성화(Active) 상태인지 수동 설정(Manual) 상태인지 차트에서 한눈에 확인할 수 있습니다.
```

---

### 9. French (Français)
```text
Notes de mise à jour Version 1.65 :
• Affichage dynamique de l'unité de temps RSI : Le commentaire sur le graphique affiche désormais dynamiquement l'unité de temps RSI configurée (ex. M15, H1, H4) au lieu d'un texte fixe.
• Correction de l'affichage du Drawdown : Le drawdown actuel est désormais bloqué à 0.00% lorsque l'équité dépasse le solde (gain flottant), éliminant les valeurs négatives trompeuses.
• Actualisation du Spread à chaque Tick : Le spread affiché sur le graphique est désormais recalculé en temps réel à chaque tick et non plus seulement à chaque nouvelle barre.
• Devise du compte dynamique : La ligne d'équité affiche automatiquement la devise de base de votre compte (USD, EUR, etc.) plutôt qu'un symbole '$' fixe.
• Indicateur de statut AutoConfig : Ajout d'une ligne sur le graphique indiquant si l'AutoConfig AI est Actif ou en mode Manuel.
```

---

### 10. Italian (Italiano)
```text
Note di rilascio Versione 1.65:
• Visualizzazione dinamica del timeframe RSI: Il commento sul grafico ora mostra dinamicamente il timeframe impostato per l'RSI (es. M15, H1, H4) invece di una dicitura statica.
• Correzione visualizzazione Drawdown: Il drawdown corrente viene ora limitato a 0.00% quando l'equity supera il saldo (profitto fluttuante), evitando percentuali negative fuorvianti.
• Aggiornamento dello spread tick per tick: Il valore dello spread a grafico viene ora ricalcolato a ogni tick in tempo reale anziché una sola volta per barra.
• Valuta del conto dinamica: La visualizzazione dell'equity rileva e mostra automaticamente la valuta base del conto (USD, EUR, ecc.) al posto del simbolo '$' fisso.
• Stato AutoConfig a grafico: Aggiunta indicazione a video che specifica se l'AutoConfig AI è attivo (Active) oppure in modalità manuale (Manual).
```

---

### 11. Turkish (Türkçe)
```text
Sürüm 1.65 Güncelleme Notları:
• Dinamik RSI Zaman Dilimi Gösterimi: Grafik üzerindeki bilgi paneli artık sabit bir yazı yerine seçilen gerçek RSI zaman dilimini (örn. M15, H1, H4) dinamik olarak gösterir.
• Düşüş (Drawdown) Gösterim Düzeltmesi: Varlık (Equity) bakiyeden yüksek olduğunda (yüzen kâr), mevcut düşüş yanıltıcı negatif değerler yerine düzgün biçimde %0.00 olarak sabitlenir.
• Her Fiyatta (Tick) Anlık Spread Güncellemesi: Grafik panelindeki spread değeri artık çubuk kapanışını beklemeden her tick hareketinde anlık olarak yenilenir.
• Dinamik Hesap Para Birimi: Varlık satırında sabit '$' simgesi yerine hesabınızın gerçek para birimi (USD, EUR, TRY vb.) otomatik olarak görüntülenir.
• AutoConfig Durum Göstergesi: AutoConfig AI'ın aktif mi (Active) yoksa manuel modda mı (Manual) çalıştığını gösteren durum satırı grafiğe eklendi.
```
