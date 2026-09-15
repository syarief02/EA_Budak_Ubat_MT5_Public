# MQL5 Market — EA Budak Ubat MT5 v1.66 Release Notes (All 11 Languages)

Cumulative changes from **v1.64 to v1.66**. Copy and paste the corresponding section into each language tab in the MQL5 Market "New version" modal.

---

### 1. English
```text
Version 1.66 Release Notes (Cumulative updates from v1.64):
• Configurable Margin Safeguards: Added MinMarginLevelToTrade (pauses adding grid layers if margin level drops below threshold) and EmergencyMarginLevel (emergency basket closure to prevent broker stop-outs). Fully customizable or disableable (0=off).
• Universal Netting & Hedging Position Tracking: Advanced grid layer counter and entry price memory ensure exact MaxTrade enforcement and proper spacing on both Netting and Hedging MT5 accounts.
• Full .set File Parameter Alignment: Standardized input parameter schema allows seamless loading of custom configuration files across all editions.
• Dynamic RSI Timeframe Display: Chart comment now reflects the configured RSI timeframe (e.g., M15, H1, H4) dynamically instead of a fixed label.
• Clamped Drawdown Display: Current DD is now clamped to 0.00% when equity exceeds balance (floating profit), eliminating misleading negative drawdown percentages.
• Real-Time Tick-by-Tick Spread: Spread display on the chart is now refreshed on every tick instead of once per bar.
• Dynamic Account Currency Symbol: Equity display automatically detects and shows your account's base currency (USD, EUR, GBP, etc.) instead of a static '$'.
• AutoConfig Status Visibility: Added on-chart status showing whether AutoConfig AI is Active or in Manual mode.
```

---

### 2. Russian (Русский)
```text
Версия 1.66 — Список изменений (с версии 1.64):
• Настраиваемая защита по марже: Добавлены параметры MinMarginLevelToTrade (приостановка добавления уровней сетки при снижении маржи ниже заданного уровня) и EmergencyMarginLevel (экстренное закрытие позиций для предотвращения стоп-аута брокера). Полностью настраиваются или отключаются (0=выкл).
• Универсальный учет позиций для Netting и Hedging: Усовершенствованный алгоритм подсчета уровней сетки и фиксации цен открытия гарантирует строгое соблюдение MaxTrade на счетах любого типа (неттинг и хеджинг).
• Полная совместимость параметров и .set файлов: Унифицированная структура настроек позволяет загружать любые пользовательские конфигурационные файлы без ограничений.
• Динамическое отображение таймфрейма RSI: В информации на графике теперь корректно отображается выбранный таймфрейм RSI (например, M15, H1, H4) вместо фиксированного текста.
• Исправление отображения просадки: Текущая просадка теперь ограничивается 0.00% при плавающей прибыли (когда средства превышают баланс), исключая отрицательные значения.
• Обновление спреда в реальном времени: Спред на графике теперь рассчитывается на каждом тике, обеспечивая мгновенную актуальность данных.
• Динамическая валюта счета: В строке баланса и средств теперь автоматически отображается базовая валюта вашего счета (USD, EUR, RUB и др.) вместо фиксированного знака '$'.
• Отображение статуса AutoConfig: Добавлен индикатор на графике, показывающий текущий режим — активен ли AutoConfig AI или используются ручные настройки (Manual).
```

---

### 3. Chinese (中文)
```text
1.66 版本更新说明（自 1.64 累积更新）：
• 可配置保证金安全防护：新增 MinMarginLevelToTrade（当保证金比例低于设定阈值时暂停加仓）和 EmergencyMarginLevel（触及紧急阈值时平仓以防止经纪商强平止损）。参数完全支持自定义或设为 0 关闭。
• 完美支持净额（Netting）与对冲（Hedging）账户：内置高精度网格层级计数器和开仓价格记忆引擎，确保在 MT5 净额和对冲账户下均能严格执行 MaxTrade 最大单量限制，避免无限制加仓。
• 统一参数结构与 .set 配置互通：标准化所有输入参数，支持无缝加载并互通各类预设参数文件。
• RSI 时间周期动态显示：图表信息面板现可实时显示所配置的 RSI 周期（如 M15、H1、H4），不再显示固定文本。
• 浮盈回撤显示修正：当净值大于余额（处于浮盈状态）时，当前回撤自动归零（0.00%），消除了误导性的负数回撤。
• 点差逐跳实时更新：图表上的点差现已改为每个 Tick 实时计算并刷新，而非仅在每根新 K 线更新。
• 动态账户货币符号：净值显示现可自动读取并显示账户本币（如 USD、EUR、CNY 等），替代原有的固定美元符号 '$'。
• AutoConfig 状态实时显示：新增图表面板状态指示，清晰展示 AutoConfig AI 是处于激活模式还是手动配置模式（Manual）。
```

---

### 4. Spanish (Español)
```text
Notas de la versión 1.66 (Actualizaciones acumuladas desde v1.64):
• Protección de margen configurable: Se añadieron MinMarginLevelToTrade (pausa nuevas órdenes de rejilla si el nivel de margen cae por debajo del umbral) y EmergencyMarginLevel (cierre de seguridad antes del stop-out del broker). Totalmente configurable o desactivable (0=apagado).
• Soporte universal para cuentas Netting y Hedging: El nuevo contador de niveles con memoria de precio asegura el cumplimiento estricto del límite MaxTrade y el espaciado correcto en cualquier tipo de cuenta MT5.
• Interoperabilidad total de archivos .set: Estructura de parámetros estandarizada para cargar fácilmente cualquier archivo de configuración prediseñado.
• Visualización dinámica del marco temporal de RSI: El comentario en el gráfico ahora muestra el período de tiempo configurado de RSI (ej. M15, H1, H4) en lugar de una etiqueta fija.
• Corrección de visualización de Drawdown: El Drawdown actual ahora se limita a 0.00% cuando la equidad supera el balance (beneficio flotante), eliminando porcentajes negativos confusos.
• Actualización de spread tick a tick: El valor del spread en el gráfico ahora se actualiza en cada tick en tiempo real, en vez de solo al cierre de vela.
• Moneda de cuenta dinámica: La línea de equidad ahora detecta y muestra automáticamente la divisa base de la cuenta (USD, EUR, etc.) en lugar de un símbolo '$' fijo.
• Indicador de estado de AutoConfig: Se agregó una línea en el gráfico que indica si AutoConfig AI está activo o en modo manual (Manual).
```

---

### 5. Portuguese (Português)
```text
Notas de atualização da Versão 1.66 (Atualizações acumuladas desde a v1.64):
• Proteção de margem configurável: Adicionados MinMarginLevelToTrade (pausa novas ordens da grade se o nível de margem cair abaixo do limite) e EmergencyMarginLevel (fechamento de emergência antes do stop-out da corretora). Totalmente personalizável ou desativável (0=desligado).
• Rastreamento universal para contas Netting e Hedging: Contador avançado de níveis da grade com memória de preço de entrada, garantindo a aplicação rigorosa do MaxTrade em qualquer conta MT5.
• Compatibilidade total com arquivos .set: Esquema de parâmetros padronizado para permitir o carregamento contínuo de qualquer predefinição (.set).
• Exibição dinâmica do timeframe do RSI: O painel no gráfico agora reflete dinamicamente o período do RSI selecionado (ex: M15, H1, H4) em vez de um texto fixo.
• Correção na exibição de rebaixamento (Drawdown): O DD atual agora é travado em 0.00% quando o capital líquido for superior ao saldo (lucro flutuante), evitando valores negativos.
• Atualização do Spread a cada Tick: O spread exibido no gráfico agora é recalculado a cada tick em tempo real, e não apenas no fechamento de barra.
• Moeda da conta dinâmica: A exibição do patrimônio líquido agora detecta automaticamente a moeda base da sua conta (USD, EUR, BRL, etc.) em vez de usar um cifrão '$' fixo.
• Status do AutoConfig no gráfico: Adicionado indicador no painel mostrando se o AutoConfig AI está Ativo ou em modo Manual.
```

---

### 6. Japanese (日本語)
```text
バージョン 1.66 アップデート情報（v1.64 からの累積更新）：
• 設定可能な証拠金セーフガード機能：証拠金維持率が設定値を下回った際にグリッド追撃を一時停止する「MinMarginLevelToTrade」と、ブローカーの強制ロスカット前に安全に全決済する「EmergencyMarginLevel」を追加。0 設定で無効化も可能です。
• ネッティング（Netting）＆ヘッジング口座の完全対応：新規レイヤーの追跡と直近約定価格の保持エンジンを統合し、MT5 ネッティング口座でも MaxTrade の制限が正確に動作するよう改善しました。
• .set 設定ファイルの完全互換：パラメーター体系を統一し、外部プリセットファイルの読み込み・適用がスムーズに行えるようになりました。
• RSI 時間枠の動的表示：チャートコメントの RSI フィルター表示が、設定されたタイムフレーム（M15、H1、H4 など）に応じて動的に正しく表示されるようになりました。
• ドローダウン表示の修正：含み益発生時（有効証拠金が残高を上回っている場合）、現在のドローダウンがマイナス表記にならず正しく 0.00% で固定表示されるよう改善しました。
• ティックごとのスプレッドリアルタイム更新：チャート上のスプレッド表示がバー確定ごとから毎ティック更新に変更され、最新のスプレッドを即座に確認できます。
• 口座通貨単位の動的反映：有効証拠金の通貨記号が固定の「$」から、口座の基本通貨（USD、JPY、EUR など）に自動対応しました。
• AutoConfig 状態表示の追加：AutoConfig AI が稼働中（Active）か手動設定（Manual）かをチャート上で一目で確認できるステータス表示を追加しました。
```

---

### 7. German (Deutsch)
```text
Versionshinweise für Version 1.66 (Kumulatives Update von v1.64):
• Konfigurierbare Margin-Schutzfunktionen: MinMarginLevelToTrade hinzugefügt (pausiert Grid-Nachkäufe bei Unterschreitung des Margin-Levels) sowie EmergencyMarginLevel (Notfallschließung des Baskets vor Erreichen des Broker-Stop-Outs). Vollständig anpassbar oder deaktivierbar (0=Aus).
• Universelle Netting- & Hedging-Positionsverfolgung: Präziser Schichtzähler mit Kursspeicher sorgt für die exakte Einhaltung des MaxTrade-Limits auf allen MT5-Konten (Netting und Hedging).
• Vollständige .set-Parameterkompatibilität: Standardisierte Parameterstruktur ermöglicht den reibungslosen Austausch von Set-Dateien zwischen allen Versionen.
• Dynamische RSI-Zeitrahmenanzeige: Im Chart-Kommentar wird nun der tatsächlich konfigurierte RSI-Zeitrahmen (z. B. M15, H1, H4) dynamisch angezeigt statt eines statischen Texts.
• Korrektur der Drawdown-Anzeige: Der aktuelle Drawdown wird bei Buchgewinnen (Eigenkapital übersteigt Kontostand) nun korrekt auf 0.00% begrenzt, um irreführende negative Werte zu vermeiden.
• Echtzeit-Spread-Aktualisierung bei jedem Tick: Der Spread auf dem Chart wird nun bei jedem Tick in Echtzeit neu berechnet und nicht mehr nur einmal pro Bar.
• Dynamische Kontowährung: Die Eigenkapitalanzeige erkennt und zeigt nun automatisch die tatsächliche Kontowährung (USD, EUR, CHF etc.) anstelle eines statischen '$'-Zeichens.
• AutoConfig-Statusanzeige: Neuer Status im Chart-Panel, der anzeigt, ob AutoConfig AI aktiv ist oder manuell konfiguriert wurde (Manual).
```

---

### 8. Korean (한국어)
```text
버전 1.66 릴리스 노트 (v1.64 이후 누적 업데이트):
• 사용자 설정 가능한 마진 보호 기능: 증거금 유지비율이 임계값 아래로 떨어질 경우 그리드 추가 주문을 일시 중단하는 MinMarginLevelToTrade 및 강제 로스컷을 방지하는 EmergencyMarginLevel 기능 추가 (0 설정 시 비활성화 가능).
• 네팅(Netting) 및 헤징 계좌 완벽 지원: 진입 가격 메모리 및 레이어 카운팅 엔진을 개선하여 MT5 네팅 계좌에서도 MaxTrade 설정 한도가 정확하게 적용되도록 최적화.
• .set 프리셋 설정 파일 완벽 호환: 파라미터 구조를 일원화하여 저장된 .set 설정 파일을 자유롭게 불러와 적용할 수 있습니다.
• RSI 타임프레임 동적 표시: 차트 정보 패널에서 고정된 텍스트 대신 실제 설정된 RSI 타임프레임(예: M15, H1, H4)이 실시간으로 정확하게 표시됩니다.
• 드로다운(DD) 표시 보정: 평가잔고(Equity)가 원금(Balance)보다 많은 수익 구간일 때 현재 드로다운이 음수로 나오지 않고 0.00%로 고정됩니다.
• 틱(Tick) 단위 실시간 스프레드 반영: 차트상의 스프레드가 봉 완성 시점이 아닌 매 틱마다 실시간으로 계산되어 갱신됩니다.
• 계좌 통화 단위 자동 인식: 자산 표시에서 고정된 '$' 대신 실제 계좌의 기본 통화(USD, EUR, KRW 등)가 자동으로 인식되어 표시됩니다.
• AutoConfig 상태 표시 추가: AutoConfig AI가 활성화(Active) 상태인지 수동 설정(Manual) 상태인지 차트에서 한눈에 확인할 수 있습니다.
```

---

### 9. French (Français)
```text
Notes de version 1.66 (Mises à jour cumulées depuis la v1.64) :
• Protections de marge configurables : Ajout de MinMarginLevelToTrade (met en pause l'ajout de couches de grille si la marge baisse sous le seuil) et EmergencyMarginLevel (clôture d'urgence pour éviter le stop-out du courtier). Entièrement personnalisable ou désactivable (0=désactivé).
• Prise en charge universelle des comptes Netting et Hedging : Un compteur d'ordres avancé avec mémorisation du prix d'entrée assure le respect strict du plafond MaxTrade sur tous les types de comptes MT5.
• Interopérabilité complète des fichiers .set : Structure des paramètres harmonisée permettant de charger facilement n'importe quel fichier de configuration préétabli.
• Affichage dynamique de l'unité de temps du RSI : Le commentaire sur le graphique affiche désormais en temps réel l'UT réelle configurée pour le RSI (ex. M15, H1, H4) au lieu d'un texte fixe.
• Correction de l'affichage du Drawdown : Le DD actuel est désormais plafonné à 0.00% en cas de profit latent (l'équité dépasse la balance), évitant les pourcentages négatifs trompeurs.
• Actualisation du spread à chaque tick : Le spread affiché sur le graphique est désormais recalculé à chaque tick pour une visibilité instantanée.
• Détection dynamique de la devise du compte : La ligne d'équité identifie et affiche automatiquement la devise de base du compte (USD, EUR, etc.) au lieu du symbole '$' statique.
• Indicateur d'état d'AutoConfig : Ajout d'une mention claire sur le graphique indiquant si l'optimisation AutoConfig AI est active ou en mode manuel (Manual).
```

---

### 10. Italian (Italiano)
```text
Note di rilascio Versione 1.66 (Aggiornamenti cumulativi dalla v1.64):
• Protezioni del margine configurabili: Aggiunti MinMarginLevelToTrade (sospende l'aggiunta di ordini griglia se il livello di margine scende sotto la soglia) ed EmergencyMarginLevel (chiusura di emergenza per prevenire lo stop-out del broker). Pienamente personalizzabile o disattivabile (0=disattivo).
• Supporto universale per conti Netting e Hedging: Il nuovo motore di tracciamento livelli con memoria dei prezzi di apertura garantisce il rispetto rigoroso del limite MaxTrade su tutti i conti MT5.
• Piena interoperabilità dei file .set: Struttura dei parametri standardizzata per consentire il caricamento immediato di qualsiasi file di configurazione preimpostato.
• Visualizzazione dinamica del timeframe RSI: Il commento sul grafico mostra ora in tempo reale il timeframe configurato per l'RSI (es. M15, H1, H4) al posto di un'etichetta fissa.
• Correzione visualizzazione Drawdown: Il DD corrente viene ora bloccato a 0.00% in presenza di profitto fluttuante (quando l'equity supera il saldo), evitando valori negativi fuorvianti.
• Aggiornamento spread tick per tick: Lo spread visualizzato sul grafico viene ora ricalcolato a ogni tick in tempo real, anziché solo alla chiusura della barra.
• Rilevamento dinamico della valuta del conto: Il display dell'equity rileva e mostra automaticamente la valuta base del conto (USD, EUR, ecc.) anziché un simbolo '$' fisso.
• Visibilità stato AutoConfig: Aggiunto un indicatore a schermo che mostra se l'intelligenza artificiale AutoConfig è attiva o in modalità manuale (Manual).
```

---

### 11. Turkish (Türkçe)
```text
Sürüm 1.66 Güncelleme Notları (v1.64'ten bu yana kümülatif güncellemeler):
• Yapılandırılabilir Teminat Koruması: Teminat seviyesi belirlenen oranın altına düştüğünde yeni ızgara emirlerini durduran MinMarginLevelToTrade ve aracı kurum stop-out'unu önleyen acil sepet kapatma özelliği EmergencyMarginLevel eklendi (0 yazılarak devre dışı bırakılabilir).
• Netting ve Hedging Hesapları için Evrensel Destek: Giriş fiyatı hafızasına sahip gelişmiş ızgara katmanı sayacı, tüm MT5 hesap türlerinde MaxTrade sınırının kusursuz şekilde uygulanmasını sağlar.
• Tam .set Dosyası Uyumluluğu: Standartlaştırılmış parametre yapısı, özel ayar dosyalarının (.set) tüm sürümlerde sorunsuz şekilde yüklenmesine olanak tanır.
• Dinamik RSI Zaman Dilimi Göstergesi: Grafik paneli artık sabit bir metin yerine yapılandırılan gerçek RSI zaman dilimini (ör. M15, H1, H4) dinamik olarak gösterir.
• Düzeltilmiş Drawdown (Düşüş) Göstergesi: Karda olunan durumlarda (Varlık bakiyeden yüksek olduğunda) mevcut düşüş oranı 0.00%'a sabitlenerek kafa karıştırıcı negatif değerler ortadan kaldırıldı.
• Her Tick'te Gerçek Zamanlı Spread Güncellemesi: Grafikteki spread değeri artık bar kapanışı yerine her gelen fiyat adımında (tick) anlık olarak yenilenir.
• Dinamik Hesap Para Birimi: Varlık göstergesi, sabit bir '$' işareti yerine hesabınızın gerçek baz para birimini (USD, EUR, TRY vb.) otomatik olarak algılar ve gösterir.
• AutoConfig Durum Bilgisi: AutoConfig AI modunun devrede mi yoksa manuel modda mı olduğunu gösteren canlı grafik göstergesi eklendi.
```

