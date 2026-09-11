# MQL5 Market Product Descriptions (All 11 Languages)
Product: EA Budak Ubat MT5

This file contains copy-paste ready descriptions for all 11 language tabs on MQL5 Market:
1. English
2. Russian (Русский)
3. Chinese (中文)
4. Spanish (Español)
5. Portuguese (Português)
6. Japanese (日本語)
7. German (Deutsch)
8. Korean (한국어)
9. French (Français)
10. Italian (Italiano)
11. Turkish (Türkçe)

---

## 1. English

EA Budak Ubat MT5 is an automated grid-trading Expert Advisor designed for MetaTrader 5. It combines technical trend analysis, dynamic volatility scaling, and multi-layered risk management to trade ranging and trending market conditions.

Optimized for the M5 timeframe on major forex pairs and metals (XAUUSD / Gold).

### Key Features
• 4 Selectable Analysis Methods:
  1. Classic Candle: Directional momentum from candle patterns.
  2. SMA20: 20-period Simple Moving Average crossover.
  3. Alligator: Bill Williams Alligator trend expansion.
  4. Ichimoku: Tenkan-sen and Kijun-sen equilibrium signals (Default).

• AutoConfig AI Volatility Engine:
  Dynamically benchmarks the current pair's 20-day ADR against the 365-day EURUSD ADR, automatically calculating optimal Take Profit, grid distance, increment step, and maximum distance.

• H1 Multi-Timeframe RSI Filter:
  Prevents opening buy orders in overbought zones or sell orders in oversold extremes. Can be disabled specifically for Gold (XAUUSD).

• Real-Time Basket Break-Even:
  When position layers accumulate, the EA dynamically locks Stop Loss to the weighted break-even price plus an optional profit buffer.

• Spread Guard & Drawdown Protection:
  Integrated MaxSpread filter and MaxDrawdown equity protection guard capital during adverse conditions.

• Dynamic Order Filling:
  Automatically negotiates supported broker execution modes (IOC, FOK, or RETURN) for standard, ECN, and cent accounts.

### Recommendations
• Timeframe: M5 (5 Minutes)
• Recommended Pairs: EURUSD, GBPUSD, USDCHF, AUDUSD, EURGBP, XAUUSD
• Gold (XAUUSD): Set UseRSIFilter = false
• Minimum Capital:
  - Cent Account: $100 (10,000 cents with 0.01 lot)
  - Standard Account: $1,000 (0.01 lot)
• Leverage: 1:500 or higher
• Execution Mode: Every New Bar (recommended)

---

## 2. Russian (Русский)

EA Budak Ubat MT5 — это автоматический сеточный торговый советник (Grid Martingale) для MetaTrader 5. Эксперт сочетает технический трендовый анализ, динамическую адаптацию к волатильности и многоуровневую защиту капитала для торговли как во флэте, так и по тренду.

Оптимизирован для таймфрейма M5 на основных валютных парах и золоте (XAUUSD).

### Основные возможности
• 4 метода анализа рынка:
  1. Classic Candle: анализ ценового импульса по свечным паттернам.
  2. SMA20: пересечение 20-периодной скользящей средней.
  3. Alligator: трендовый индикатор Билла Вильямса (Аллигатор).
  4. Ichimoku: сигналы равновесия Тэнкан-сэн и Киджун-сэн (по умолчанию).

• Модуль адаптации к волатильности AutoConfig AI:
  Автоматически сопоставляет 20-дневный диапазон ADR текущего инструмента с 365-дневным ADR EURUSD, динамически рассчитывая оптимальный Take Profit, начальную дистанцию сетки, шаг прироста и максимальную дистанцию.

• Фильтр RSI на H1:
  Предотвращает покупки в зоне перекупленности и продажи в зоне перепроданности. При торговле золотом (XAUUSD) фильтр можно отключить.

• Автоматический безубыток корзины (Basket Break-Even):
  При накоплении сеточных ордеров советник переводит общий Stop Loss в точку безубытка с фиксацией минимальной прибыли.

• Защита от спреда и просадки:
  Встроенные фильтры максимального спреда (MaxSpread_Pips) и максимальной просадки по эквити (MaxDrawdownPct).

• Динамический режим исполнения ордеров:
  Автоматически определяет доступный тип заливки (IOC, FOK, RETURN) для совместимости с любыми брокерами и счетами (Standard, ECN, Cent).

### Рекомендации
• Таймфрейм: M5 (5 минут)
• Инструменты: EURUSD, GBPUSD, USDCHF, AUDUSD, EURGBP, XAUUSD (Gold)
• Для золота (XAUUSD): установите UseRSIFilter = false
• Минимальный депозит:
  - Центовый счет (Cent): от $100 (10 000 центов при лоте 0.01)
  - Стандартный счет: от $1,000 (лот 0.01)
• Плечо: 1:500 или выше
• Режим исполнения: Every New Bar (по новым барам)

---

## 3. Chinese (中文)

EA Budak Ubat MT5 是一款专为 MetaTrader 5 设计的自动化网格马丁格尔（Grid Martingale）交易机器人。该系统结合了技术趋势分析、动态波动率自适应计算以及多层风险控制，可在震荡和单边趋势市场中高效管理仓位。

针对主要外汇货币对和现货黄金（XAUUSD）的 M5 周期进行了全面优化。

### 核心功能
• 4 种可选入场分析策略：
  1. Classic Candle：根据K线反转与动量形态判定方向。
  2. SMA20：基于20周期均线均线交叉判定。
  3. Alligator：基于比尔·威廉姆斯鳄鱼线指标开裂趋势。
  4. Ichimoku：基于一目均衡表（转换线与基准线）平衡信号（默认推荐）。

• AutoConfig AI 动态波动率引擎：
  将当前品种的20日平均日波动幅度（ADR）与EURUSD的365日ADR进行自动对比，智能计算最佳止盈点数（TP）、网格初始间距、递增步长以及最大网格间距。

• H1 周期 RSI 过滤器：
  监控一小时级别 RSI，避免在超买区盲目追多或在超卖区盲目做空。在交易黄金（XAUUSD）强单边牛市时可选择关闭该过滤器。

• 动态全仓保本锁盈（Basket Break-Even）：
  当网格加仓且总体盈利达到设定值时，EA 会自动将所有订单的止损移至加权平均保本价位，并锁定保护利润。

• 点差防护与最大回撤保护：
  内置点差过滤器（MaxSpread_Pips）与净值最大回撤防护（MaxDrawdownPct），防止极端黑天鹅行情风险。

• 智能订单填充模式协商：
  自动适配经纪商支持的订单填充模式（IOC、FOK 或 RETURN），完美兼容标准账户、ECN 和美分账户。

### 使用建议
• 运行周期：M5（5分钟图）
• 推荐品种：EURUSD, GBPUSD, USDCHF, AUDUSD, EURGBP, XAUUSD（黄金）
• 黄金交易：建议设置 UseRSIFilter = false
• 最低初始资金：
  - 美分账户（Cent）：100 美元（对应 10,000 美分，0.01手起）
  - 标准账户：1,000 美元（0.01手起）
• 推荐杠杆：1:500 或更高
• 执行模式：Every New Bar（K线收盘执行，更稳定）

---

## 4. Spanish (Español)

EA Budak Ubat MT5 es un Asesor Experto automatizado de trading en rejilla (Grid Martingale) desarrollado para MetaTrader 5. Combina análisis técnico de tendencias, adaptación dinámica a la volatilidad del mercado y rigurosos controles de riesgo para operar tanto en rangos como en tendencias.

Optimizado para temporalidad M5 en pares principales y metales (XAUUSD / Oro).

### Características Principales
• 4 Métodos de Análisis Seleccionables:
  1. Classic Candle: Impulso direccional basado en velas japonesas.
  2. SMA20: Cruces de media móvil simple de 20 periodos.
  3. Alligator: Expansión de tendencia con el indicador Alligator de Bill Williams.
  4. Ichimoku: Señales de equilibrio entre Tenkan-sen y Kijun-sen (por defecto).

• Motor de Volatilidad AutoConfig AI:
  Compara dinámicamente el rango medio diario (ADR) de 20 días del par actual con el ADR de 365 días del EURUSD, ajustando automáticamente el Take Profit óptimo, la distancia de rejilla, el paso de incremento y la distancia máxima.

• Filtro RSI en Gráfico H1:
  Evita abrir compras en zonas de sobrecompra o ventas en sobreventa extrema. Se puede desactivar específicamente para el Oro (XAUUSD).

• Break-Even de Cesta en Tiempo Real:
  Al acumular posiciones en rejilla, el EA mueve el Stop Loss colectivo al precio de equilibrio ponderado más un margen de beneficio asegurado.

• Protección de Spread y Drawdown Máximo:
  Filtro de spread máximo (MaxSpread_Pips) y protección de reducción de capital (MaxDrawdownPct).

• Negociación Dinámica de Ejecución:
  Detecta automáticamente el modo de llenado permitido por el broker (IOC, FOK o RETURN) en cuentas estándar, ECN y cent.

### Recomendaciones
• Temporalidad: M5 (5 Minutos)
• Pares Recomendados: EURUSD, GBPUSD, USDCHF, AUDUSD, EURGBP, XAUUSD
• Para Oro (XAUUSD): Configurar UseRSIFilter = false
• Capital Mínimo:
  - Cuenta Cent: $100 (10.000 centavos con lote 0.01)
  - Cuenta Estándar: $1.000 (lote 0.01)
• Apalancamiento: 1:500 o superior
• Modo de Ejecución: Every New Bar (recomendado)

---

## 5. Portuguese (Português)

O EA Budak Ubat MT5 é um robô de negociação automatizado em grade (Grid Martingale) desenvolvido para MetaTrader 5. Ele combina análise técnica de tendências, ajuste dinâmico à volatilidade e gestão avançada de risco para operar em mercados laterais e de tendência.

Otimizado para o tempo gráfico M5 em pares principais e ouro (XAUUSD).

### Principais Recursos
• 4 Métodos de Análise Configuráveis:
  1. Classic Candle: Momentum de velas de alta e baixa.
  2. SMA20: Cruzamento da média móvel simples de 20 períodos.
  3. Alligator: Expansão de tendência pelo indicador Alligator de Bill Williams.
  4. Ichimoku: Sinais de equilíbrio de Tenkan-sen e Kijun-sen (padrão).

• Motor de Volatilidade AutoConfig AI:
  Compara o ADR de 20 dias do par atual com o ADR de 365 dias do EURUSD, calculando automaticamente Take Profit ideal, distância inicial da grade, incremento por nível e distância máxima.

• Filtro RSI em H1:
  Impede compras em sobrecompra e vendas em sobrevenda extrema. Pode ser desligado para negociação de Ouro (XAUUSD).

• Break-Even de Cesta em Tempo Real:
  Move automaticamente o Stop Loss de todas as ordens acumuladas para o ponto de equilíbrio ponderado com lucro mínimo garantido.

• Proteção de Spread e Drawdown Máximo:
  Filtro de spread máximo permitido e proteção de rebaixamento de patrimônio (MaxDrawdownPct).

• Compatibilidade com Todos os Brokers:
  Negociação dinâmica do modo de preenchimento de ordens (IOC, FOK, RETURN) para contas Standard, ECN e Cent.

### Recomendações
• Tempo Gráfico: M5 (5 Minutos)
• Pares Recomendados: EURUSD, GBPUSD, USDCHF, AUDUSD, EURGBP, XAUUSD (Ouro)
• Para Ouro (XAUUSD): Definir UseRSIFilter = false
• Capital Mínimo Recomendado:
  - Conta Cent: $100 (10.000 centavos com lote 0.01)
  - Conta Standard: $1.000 (lote 0.01)
• Alavancagem: 1:500 ou superior
• Modo de Execução: Every New Bar (a cada nova barra)

---

## 6. Japanese (日本語)

EA Budak Ubat MT5 は、MetaTrader 5 向けに設計された自動グリッド・マーチンゲール（Grid Martingale）エキスパートアドバイザーです。テクニカル分析、市場ボラティリティへの自動適応計算、および多層型リスク管理を融合させ、レンジ相場とトレンド相場の両方に対応します。

主要通貨ペアおよびゴールド（XAUUSD）の M5（5分足）チャートに最適化されています。

### 主な機能
• 4つの選べるエントリー分析手法：
  1. Classic Candle：ローソク足の勢いとパターン検出。
  2. SMA20：20期間単純移動平均線のクロス。
  3. Alligator：ビル・ウィリアムズのアリゲーター指標。
  4. Ichimoku：一目均衡表の転換線と基準線の均衡シグナル（推奨デフォルト）。

• AutoConfig AI ボラティリティ適応エンジン：
  現在の通貨ペアの20日ADRをEURUSDの365日ADRと比較計算し、最適な利確幅（TP）、グリッド間隔、増加ステップ幅、最大グリッド幅を全自動算出。

• H1 時間足 RSI フィルター：
  買われすぎ水準でのロング、売られすぎ水準でのショートを防止。ゴールド（XAUUSD）の強いトレンド時にはオフに設定可能。

• リアルタイム・バスケット・ブレークイーブン機能：
  ポジションが複数積み重なった際、合計利益が出た時点で全体のストップロスを加重平均建値＋利益確保位置へ自動移動。

• スプレッドガード＆最大ドローダウン防止：
  過大スプレッド制限（MaxSpread_Pips）および純資産ドローダウン上限ガード（MaxDrawdownPct）を搭載。

• 動的オーダーフィリングモード対応：
  ブローカーの対応フィリングモード（IOC, FOK, RETURN）を自動識別し、スタンダード、ECN、セント口座で安定稼働。

### 推奨環境
• 時間足：M5（5分足）
• 推奨通貨ペア：EURUSD, GBPUSD, USDCHF, AUDUSD, EURGBP, XAUUSD（Gold）
• ゴールド取引時：UseRSIFilter = false を推奨
• 最低運用資金：
  - セント口座（Cent）：$100（10,000セント、0.01ロット〜）
  - スタンダード口座：$1,000（0.01ロット〜）
• 推奨レバレッジ：1:500以上
• 実行モード：Every New Bar（バー確定時実行推奨）

---

## 7. German (Deutsch)

EA Budak Ubat MT5 ist ein automatisierter Grid-Martingale-Expert-Advisor für MetaTrader 5. Das System kombiniert technische Trendanalyse, dynamische Volatilitätsanpassung und mehrstufiges Risikomanagement für volatile und trendstarke Marktphasen.

Optimiert für den M5-Timeframe auf Hauptwährungspaaren und Gold (XAUUSD).

### Hauptmerkmale
• 4 Wählbare Analysemethoden:
  1. Classic Candle: Kerzenmuster und Richtungsimpuls.
  2. SMA20: Kreuzung des 20-Perioden Simple Moving Average.
  3. Alligator: Trendfolge mit dem Alligator-Indikator von Bill Williams.
  4. Ichimoku: Tenkan-sen und Kijun-sen Gleichgewichtssignale (Standard).

• AutoConfig AI Volatilitäts-Engine:
  Vergleicht die 20-Tage-ADR des aktuellen Paares mit der 365-Tage-EURUSD-ADR und berechnet automatisch optimalen Take Profit, Gitterabstand, Inkrementschritt und Maximalabstand.

• H1 RSI-Filter:
  Verhindert Käufe im überkauften und Verkäufe im überverkauften Bereich. Speziell für Gold (XAUUSD) deaktivierbar.

• Echtzeit-Basket-Break-Even:
  Zieht den Stop Loss aller akkumulierten Positionen automatisch auf das gewichtete Einstiegsniveau plus Gewinnpuffer nach.

• Spread-Filter & Drawdown-Schutz:
  Integrierte Filter für maximalen Spread und prozentualen Kontoschutz (MaxDrawdownPct).

• Dynamische Ausführungsanpassung:
  Unterstützt alle Order-Filling-Modi (IOC, FOK, RETURN) für Standard-, ECN- und Cent-Konten.

### Empfehlungen
• Zeiteinheit: M5 (5 Minuten)
• Empfohlene Paare: EURUSD, GBPUSD, USDCHF, AUDUSD, EURGBP, XAUUSD
• Für Gold (XAUUSD): UseRSIFilter = false einstellen
• Mindestkapital:
  - Cent-Konto: $100 (10.000 Cent bei 0.01 Lot)
  - Standard-Konto: $1.000 (0.01 Lot)
• Hebel: 1:500 oder höher
• Ausführungsmodus: Every New Bar (empfohlen)

---

## 8. Korean (한국어)

EA Budak Ubat MT5는 MetaTrader 5 전용 자동 그리드 마틴게일(Grid Martingale) 전문 트레이딩 시스템입니다. 정교한 기술적 추세 분석, 시장 변동성에 맞춘 동적 파라미터 최적화 및 다층 리스크 관리 기능을 통합하여 횡보장과 추세장 모두에서 유연하게 대응합니다.

M5(5분봉) 차트 기준 주요 통화쌍 및 골드(XAUUSD)에 최적화되어 있습니다.

### 주요 기능
• 4가지 진입 분석 전략 지원:
  1. Classic Candle: 캔들 패턴 및 모멘텀 기반 진입.
  2. SMA20: 20일 단순 이동평균선 교차 신호.
  3. Alligator: 빌 윌리엄스 앨리게이터 추세 확장 전략.
  4. Ichimoku: 일목균형표 전환선 및 기준선 균형 신호 (기본값).

• AutoConfig AI 변동성 적응 엔진:
  현재 종목의 20일 ADR과 EURUSD 365일 ADR을 실시간 비교하여 최적의 익절폭(TP), 그리드 진입 간격, 단계별 증가폭, 최대 간격을 자동으로 연산합니다.

• H1 RSI 다중 타임프레임 필터:
  과매수 구간에서의 매수 및 과매도 구간에서의 매도를 원천 차단합니다. 골드(XAUUSD) 추세 매매 시에는 필터를 비활성화할 수 있습니다.

• 실시간 바스켓 본절(Break-Even) 락 기능:
  그리드 포지션이 누적된 후 전체 수익 전환 시 모든 포지션의 손절가를 가중 평균 진입가 위로 자동 이동하여 수익을 보호합니다.

• 스프레드 제한 및 최대 드로다운 보호:
  과도한 스프레드 방지 필터(MaxSpread_Pips) 및 계좌 잔고 보호를 위한 최대 드로다운 한도 설정(MaxDrawdownPct) 탑재.

• 주문 체결 방식(Filling Mode) 자동 협상:
  브로커 환경에 맞춰 IOC, FOK, RETURN 모드를 자동 인식하여 스탠다드, ECN, 센트 계좌 어디서나 원활하게 작동합니다.

### 추천 설정
• 차트 주기: M5 (5분봉)
• 추천 종목: EURUSD, GBPUSD, USDCHF, AUDUSD, EURGBP, XAUUSD(골드)
• 골드(XAUUSD) 거래 시: UseRSIFilter = false 권장
• 최소 시작 자금:
  - 센트(Cent) 계좌: $100 (10,000센트, 0.01랏 시작)
  - 일반 계좌: $1,000 (0.01랏 시작)
• 권장 레버리지: 1:500 이상
• 실행 모드: Every New Bar (새 봉 완성 시 실행 권장)

---

## 9. French (Français)

EA Budak Ubat MT5 est un Expert Advisor de trading automatisé en grille (Grid Martingale) développé pour MetaTrader 5. Il associe analyse technique de tendance, adaptation dynamique à la volatilité et gestion stricte des risques pour performer en marchés de range et de tendance.

Optimisé pour l'unité de temps M5 sur les paires majeures et l'Or (XAUUSD).

### Fonctionnalités Clés
• 4 Méthodes d'Analyse au Choix :
  1. Classic Candle : Dynamique directionnelle des bougies.
  2. SMA20 : Croisements de la moyenne mobile simple à 20 périodes.
  3. Alligator : Suivi de tendance avec l'Alligator de Bill Williams.
  4. Ichimoku : Signaux d'équilibre Tenkan-sen et Kijun-sen (par défaut).

• Moteur de Volatilité AutoConfig AI :
  Évalue l'ADR 20 jours de la paire courante par rapport à l'ADR 365 jours de l'EURUSD pour ajuster automatiquement le Take Profit, l'espacement de grille, l'incrément et la distance maximale.

• Filtre RSI H1 Multi-Timeframe :
  Bloque les achats en zone de surachat et les ventes en survente. Peut être désactivé pour l'Or (XAUUSD).

• Break-Even de Panier en Temps Réel :
  Dès que la grille génère un gain global, le Stop Loss collectif est automatiquement déplacé au niveau du prix moyen d'équilibre avec verrouillage de profit.

• Protection contre le Spread et le Drawdown :
  Filtre de spread maximal autorisé et protection contre la baisse de capital (MaxDrawdownPct).

• Négociation Dynamique d'Exécution :
  Prend en charge automatiquement les modes de remplissage IOC, FOK et RETURN sur comptes Standard, ECN et Cent.

### Recommandations
• Timeframe : M5 (5 Minutes)
• Paires Recommandées : EURUSD, GBPUSD, USDCHF, AUDUSD, EURGBP, XAUUSD (Or)
• Pour l'Or (XAUUSD) : Configurer UseRSIFilter = false
• Capital Minimal :
  - Compte Cent : 100 $ (10 000 cents avec lot 0.01)
  - Compte Standard : 1 000 $ (lot 0.01)
• Effet de Levier : 1:500 ou plus
• Mode d'Exécution : Every New Bar (recommandé)

---

## 10. Italian (Italiano)

EA Budak Ubat MT5 è un Expert Advisor automatizzato per il trading a griglia (Grid Martingale) sviluppato per MetaTrader 5. Combina analisi tecnica dei trend, calcolo dinamico della volatilità e gestione avanzata del rischio per operare efficacemente sia in fasi di congestione che di trend.

Ottimizzato per il timeframe M5 sulle principali valute e sui metalli (XAUUSD / Oro).

### Caratteristiche Principali
• 4 Metodi di Analisi Selezionabili:
  1. Classic Candle: Momentum direzionale basato sui pattern a candele.
  2. SMA20: Incroci della media mobile semplice a 20 periodi.
  3. Alligator: Riconoscimento del trend tramite Alligator di Bill Williams.
  4. Ichimoku: Segnali di equilibrio Tenkan-sen e Kijun-sen (predefinito).

• Motore di Volatilità AutoConfig AI:
  Calcola il rapporto tra l'ADR a 20 giorni dello strumento e l'ADR a 365 giorni di EURUSD, ottimizzando automaticamente Take Profit, distanza della griglia, incremento progressivo e distanza massima.

• Filtro RSI su Base H1:
  Evita acquisti in ipercomprato e vendite in ipervenduto estremo. Può essere disattivato per il trading dell'Oro (XAUUSD).

• Break-Even di Gruppo in Tempo Reale:
  Quando le posizioni accumulate generano un profitto aggregato, sposta automaticamente lo Stop Loss al prezzo di pareggio ponderato proteggendo il guadagno.

• Protezione da Spread Eccessivo e Drawdown:
  Filtro spread massimo (MaxSpread_Pips) e blocco di sicurezza su drawdown azionario (MaxDrawdownPct).

• Gestione Dinamica dell'Esecuzione Ordini:
  Rileva automaticamente i tipi di riempimento supportati dal broker (IOC, FOK, RETURN) per conti Standard, ECN e Cent.

### Raccomandazioni
• Timeframe: M5 (5 Minuti)
• Strumenti Consigliati: EURUSD, GBPUSD, USDCHF, AUDUSD, EURGBP, XAUUSD
• Per l'Oro (XAUUSD): Impostare UseRSIFilter = false
• Deposito Minimo:
  - Conto Cent: $100 (10.000 centesimi con lotto 0.01)
  - Conto Standard: $1.000 (lotto 0.01)
• Leva Finanziaria: 1:500 o superiore
• Modalità di Esecuzione: Every New Bar (ad ogni nuova barra)

---

## 11. Turkish (Türkçe)

EA Budak Ubat MT5, MetaTrader 5 için tasarlanmış otomatik bir ızgara (Grid Martingale) Uzman Danışmanıdır. Hem yatay hem de trend piyasalarında sermayeyi korumak ve kâr sağlamak amacıyla teknik trend analizini, dinamik volatilite optimizasyonunu ve çok katmanlı risk yönetimini bir araya getirir.

Majör döviz çiftleri ve Altın (XAUUSD) için M5 zaman diliminde optimize edilmiştir.

### Temel Özellikler
• 4 Farklı Giriş Analiz Yöntemi:
  1. Classic Candle: Mum formasyonlarından yönsel momentum tespiti.
  2. SMA20: 20 periyotluk Basit Hareketli Ortalama kesişimi.
  3. Alligator: Bill Williams Alligator göstergesi ile trend takibi.
  4. Ichimoku: Tenkan-sen ve Kijun-sen denge sinyalleri (Varsayılan).

• AutoConfig AI Volatilite Motoru:
  Mevcut enstrümanın 20 günlük ADR değerini 365 günlük EURUSD ADR değeriyle kıyaslayarak en uygun Kâr Al (TP), ızgara mesafesi, artış adımı ve maksimum mesafeyi otomatik olarak hesaplar.

• H1 Zaman Dilimi RSI Filtresi:
  Aşırı alım bölgesinde alım, aşırı satım bölgesinde satış yapılmasını engeller. Altın (XAUUSD) ticaretinde isteğe bağlı olarak kapatılabilir.

• Gerçek Zamanlı Sepet Başa Baş (Basket Break-Even):
  Izgara pozisyonları birikip toplamda kâra geçtiğinde, Zarar Durdur (SL) seviyesini ağırlıklı başabaş fiyatına ve belirlenen kâr kilitleme seviyesine otomatik çeker.

• Spread ve Maksimum Düşüş (Drawdown) Koruması:
  Yüksek spreadlerde işlem açılmasını önleyen MaxSpread_Pips ve hesap sermayesini koruyan MaxDrawdownPct özellikleri mevcuttur.

• Dinamik Emir Doldurma Modu:
  Standart, ECN ve Cent hesaplarda emirlerin sorunsuz açılması için aracı kurumun desteklediği doldurma modlarını (IOC, FOK, RETURN) otomatik seçer.

### Kullanım Tavsiyeleri
• Zaman Dilimi: M5 (5 Dakika)
• Tavsiye Edilen Pariteler: EURUSD, GBPUSD, USDCHF, AUDUSD, EURGBP, XAUUSD (Altın)
• Altın (XAUUSD) İçin: UseRSIFilter = false yapılması önerilir
• Minimum Başlangıç Sermayesi:
  - Cent Hesabı: $100 (0.01 lot ile 10.000 cent)
  - Standart Hesap: $1.000 (0.01 lot)
• Kaldıraç: 1:500 veya üzeri
• Çalışma Modu: Every New Bar (Her yeni çubukta bir - önerilen)
