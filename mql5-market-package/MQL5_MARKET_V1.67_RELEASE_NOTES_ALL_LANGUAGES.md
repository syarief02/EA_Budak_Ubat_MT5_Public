# MQL5 Market — EA Budak Ubat MT5 v1.67 Release Notes (All 11 Languages)

Changes from **v1.66 to v1.67**. Copy and paste the corresponding section into each language tab in the MQL5 Market "New version" modal.

---

### 1. English
```text
Version 1.67 Release Notes:
• Basket Break-Even StopLoss Conflict Resolution: Fixed a race condition in ModifyTakeProfit() where standard StopLoss rules continuously reset the locked Break-Even StopLoss back to the initial stop loss level. Once activated, positions now permanently preserve their secured profit level.
• Real-Time OnTick() Trailing Break-Even: Relocated CheckBasketBreakEven() directly into the high-frequency OnTick() event loop, allowing instant trailing profit locking on every price tick without waiting for candle close.
• Parameter Sanity & Broker Stop Guard: Implemented automated safety clamping ensuring BreakEven_Lock remains strictly less than BreakEven_Trigger with diagnostic terminal logging, permanently eliminating broker error 10016 (Invalid Stops).
• Atomic SymbolInfoTick Sampling: Upgraded price sampling to atomic SymbolInfoTick() struct retrieval and added instant zero-position bypass to conserve CPU cycles on quiet market ticks.
```

---

### 2. Russian (Русский)
```text
Версия 1.67 — Список изменений:
• Устранение конфликта StopLoss при безубытке: Исправлена логика в ModifyTakeProfit(), из-за которой стандартный StopLoss сбрасывал зафиксированный защитный уровень безубытка (Break-Even StopLoss). Теперь прибыльный уровень безубытка сохраняется строго и надежно.
• Трейлинг безубытка в реальном времени (OnTick): Вызов CheckBasketBreakEven() перенесен напрямую в цикл событий OnTick(), что обеспечивает мгновенную фиксацию прибыли на каждом тике без ожидания закрытия свечи.
• Автоматическая защита от неверных стопов: Введено автоматическое ограничение (BreakEven_Lock < BreakEven_Trigger) с диагностическим выводом в терминал, полностью исключающее ошибку брокера 10016 (Invalid Stops).
• Атомарное получение тиковых котировок: Переход на атомарную структуру SymbolInfoTick() и мгновенный пропуск расчетов при отсутствии открытых позиций для оптимизации нагрузки на процессор.
```

---

### 3. Chinese (中文)
```text
1.67 版本更新说明：
• 保本止损与常规止损冲突修复：修复了 ModifyTakeProfit() 中的冲突缺陷。此前当开启常规止损时可能会覆盖已锁定的移动保本止损点；现已确保一旦激活保本锁定，订单将永久保持受保护的盈利止损位。
• 实时 Tick 级移动保本跟踪：将 CheckBasketBreakEven() 移入高频 OnTick() 事件循环中，一旦浮盈达到设定触发点，将在毫秒级 Tick 变动中即时锁定利润，无需等待 K 线收盘。
• 参数安全校验与经纪商止损防护：新增自动参数安全校正机制，强制保证 BreakEven_Lock 小于 BreakEven_Trigger，并提供终端预警提示，彻底消除经纪商 10016（Invalid Stops）错误。
• 原子级 SymbolInfoTick 报价获取：升级为原子级 SymbolInfoTick() 数据结构采样，并在无持仓时秒级跳过计算，显著降低 CPU 资源开销。
```

---

### 4. Spanish (Español)
```text
Notas de la versión 1.67:
• Resolución de conflicto de StopLoss en Break-Even: Se corrigió una condición en ModifyTakeProfit() donde el StopLoss estándar podía sobrescribir el StopLoss de Break-Even protegido. Las posiciones ahora mantienen de forma permanente su nivel de beneficio asegurado.
• Trailing Break-Even en tiempo real (OnTick): Se reubicó CheckBasketBreakEven() directamente en el ciclo de eventos OnTick(), asegurando el bloqueo instantáneo de ganancias en cada tick de precio sin esperar al cierre de vela.
• Protección contra paradas no válidas (Error 10016): Implementado ajuste de seguridad automático garantizando que BreakEven_Lock sea estrictamente menor que BreakEven_Trigger con aviso en terminal, evitando errores 10016 del broker.
• Muestreo atómico SymbolInfoTick: Optimización de captura de precios mediante la estructura SymbolInfoTick() y omisión inmediata de cálculos cuando no hay posiciones abiertas.
```

---

### 5. Portuguese (Português)
```text
Notas da versão 1.67:
• Eliminação de conflito de StopLoss no Break-Even: Corrigida a condição em ModifyTakeProfit() em que as regras padrão de StopLoss sobrepunham o StopLoss lucrativo do Break-Even. As ordens agora mantêm permanentemente seu nível de lucro protegido.
• Trailing Break-Even em tempo real (OnTick): O CheckBasketBreakEven() foi transferido diretamente para o loop OnTick(), permitindo travar o lucro imediatamente a cada tick sem aguardar o fechamento da vela.
• Validação de parâmetros e proteção contra Erro 10016: Adicionada limitação automática garantindo que BreakEven_Lock seja estritamente menor que BreakEven_Trigger, eliminando o erro de paradas inválidas (Invalid Stops).
• Amostragem atômica SymbolInfoTick: Leitura de preços atualizada para estrutura atômica SymbolInfoTick() com bypass instantâneo quando não há posições abertas.
```

---

### 6. Japanese (日本語)
```text
バージョン 1.67 リリースノート:
• 建値ストップロス（ブレイクイーブン）の競合を解消: ModifyTakeProfit() 内で通常のストップロス計算が保護されたブレイクイーブンSLを上書きしてしまう問題を修正しました。一度ロックされた利益確定SLは恒久的に保護されます。
• リアルタイムTick駆動ブレイクイーブントレール: CheckBasketBreakEven() を高頻度 OnTick() ループ内に直接配置し、足の確定を待たずに各ティックの価格変動で即座に利益を固定します。
• パラメータ安全性ガードとブローカー停止保護: BreakEven_Lock が BreakEven_Trigger 未満であることを自動保証する安全クランプを実装し、ブローカーエラー 10016（Invalid Stops）を恒久的に防止します。
• SymbolInfoTick によるアトミック価格サンプリング: SymbolInfoTick() 構造体を用いた価格取得への刷新と、ポジション非保有時の即時バイパスによりCPU負荷を大幅に低減しました。
```

---

### 7. German (Deutsch)
```text
Versionshinweise zu Version 1.67:
• Behebung von StopLoss-Konflikten bei Break-Even: Ein Race-Condition-Problem in ModifyTakeProfit() wurde behoben, bei dem Standard-StopLoss-Regeln den geschützten Break-Even-Stop überschrieben. Positionen behalten nun dauerhaft ihr gesichertes Gewinnlevel.
• Echtzeit-Tick-Trailing für Break-Even (OnTick): CheckBasketBreakEven() wurde direkt in die OnTick()-Ereignisschleife verlegt, um Gewinne sofort auf jedem Preistick abzusichern, ohne auf Kerzenschlüsse zu warten.
• Automatische Parameter-Sicherheitsbegrenzung: Gewährleistet automatisch, dass BreakEven_Lock kleiner als BreakEven_Trigger ist, wodurch Broker-Fehler 10016 (Invalid Stops) dauerhaft vermieden wird.
• Atomare SymbolInfoTick-Preisabfrage: Umstellung auf atomare SymbolInfoTick()-Struktur und sofortiger Bypass bei 0 offenen Positionen zur CPU-Ressourcenschonung.
```

---

### 8. Korean (한국어)
```text
버전 1.67 릴리스 노트:
• 본전 손절(Break-Even)과 일반 손절(StopLoss) 간 충돌 해결: ModifyTakeProfit() 함수에서 일반 StopLoss 로직이 이미 이익을 확보하고 있는 Break-Even StopLoss를 덮어쓰거나 취소하던 현상을 수정했습니다. 이제 한번 이익 보존이 활성화된 포지션은 보호된 수익 구간을 영구적으로 유지합니다.
• OnTick() 기반 실시간 틱 단위 트레일링 본전 확보: CheckBasketBreakEven() 함수를 고빈도 OnTick() 이벤트 루프로 전진 배치하여, 캔들 완성을 기다릴 필요 없이 매 가격 틱(Tick)마다 즉각적으로 이익을 고정합니다.
• 파라미터 안전 보정 및 브로커 유효하지 않은 스탑(10016) 방지: BreakEven_Lock 값이 항상 BreakEven_Trigger 값보다 작도록 보장하는 자동 클램핑 로직을 도입하여 MT5 브로커 10016 (Invalid Stops) 오류를 원천 차단했습니다.
• 원자적(Atomic) SymbolInfoTick 샘플링 및 무포지션 바이패스: 최신 SymbolInfoTick() 구조체 기반의 가격 수집으로 최적화하고, 열린 포지션이 0개일 때 불필요한 연산을 즉시 건너뛰도록 개선하여 터미널 CPU 부담을 최소화했습니다.
```

---

### 9. French (Français)
```text
Notes de version 1.67 :
• Résolution du conflit de StopLoss sur Break-Even : Correction d'un problème dans ModifyTakeProfit() où le StopLoss standard écrasait le StopLoss de Break-Even sécurisé. Les positions conservent désormais en permanence leur niveau de profit verrouillé.
• Trailing Break-Even en temps réel (OnTick) : CheckBasketBreakEven() s'exécute désormais directement dans la boucle OnTick(), garantissant la protection des gains en temps réel à chaque tick sans attendre la clôture de la bougie.
• Protection contre les erreurs de stops invalides (10016) : Implémentation d'un bridage automatique assurant que BreakEven_Lock soit strictement inférieur à BreakEven_Trigger avec alertes terminales.
• Échantillonnage atomique SymbolInfoTick : Utilisation de la structure atomique SymbolInfoTick() et contournement instantané lorsqu'aucune position n'est ouverte pour minimiser l'usage processeur.
```

---

### 10. Italian (Italiano)
```text
Note di rilascio versione 1.67:
• Risoluzione conflitto StopLoss su Break-Even: Risolto un bug in ModifyTakeProfit() per cui le regole standard di StopLoss sovrascrivevano lo StopLoss protettivo del Break-Even. I trade mantengono ora in modo permanente il livello di profitto bloccato.
• Trailing Break-Even in tempo reale (OnTick): Spostata la funzione CheckBasketBreakEven() direttamente nel ciclo OnTick(), bloccando il profitto in tempo reale ad ogni tick senza attendere la chiusura della candela.
• Protezione da parametri errati e Stop non validi: Limitazione automatica di sicurezza che assicura che BreakEven_Lock sia sempre inferiore a BreakEven_Trigger, azzerando l'errore broker 10016.
• Campionamento atomico con SymbolInfoTick: Ottimizzazione della lettura prezzi tramite struttura SymbolInfoTick() e bypass immediato a posizioni chiuse per risparmiare risorse CPU.
```

---

### 11. Turkish (Türkçe)
```text
Sürüm 1.67 Sürüm Notları:
• Başa Baş (Break-Even) StopLoss Çakışması Giderildi: ModifyTakeProfit() fonksiyonunda standart StopLoss kurallarının kilitlenmiş karlı Break-Even StopLoss seviyesini geçersiz kılması sorunu düzeltildi. Korunan kar seviyesi artık kalıcı olarak korunmaktadır.
• Gerçek Zamanlı OnTick() Başa Baş Takibi: CheckBasketBreakEven() doğrudan OnTick() olay döngüsüne taşındı; mum kapanışı beklenmeksizin her fiyat tikinde anında kar kilitleme sağlandı.
• Geçersiz Stop Koruması (Hata 10016): BreakEven_Lock değerinin BreakEven_Trigger değerinden kesinlikle küçük kalmasını sağlayan otomatik güvenlik sınırlayıcısı eklendi.
• SymbolInfoTick Atomik Fiyat Örnekleme: Fiyat okuma işlemi SymbolInfoTick() yapısına yükseltildi ve açık pozisyon olmadığında anında hesaplama baypası getirilerek işlemci performansı optimize edildi.
```
