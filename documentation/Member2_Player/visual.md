# Member 2 — Player Visual (web version)

```text
PLAYER (src/characters/Player.js)
Permanent stats:
  name, nenType, hp, maxHp, attack, nenPower,
  level, xp, xpToNextLevel (50, +30 each), gold, potions, inventory
Extras added in the web version:
  nenCharges / maxCharges  -> Spend on activating Nen; +1 per room entered (max 3)
  tempAttack / tempNenPower -> the ACTIVE NEN AURA (temporary)

Methods:
  getEffectiveAttack() / getEffectiveNenPower() -> base + aura (used by combat)
  takeDamage(damage) -> halves if defending, returns {damage, defended}
  heal(amount) -> capped, returns amount recovered
  gainXP(amount) -> while loop levels up (maxHp +10, ATK +3, NEN +5, full heal)
  resetAura()    -> clears buff when battle ends or you Run
  useNen()       -> switch(nenType): sets ONE temporary aura, returns its message
```

Balance rule (defend this): permanent growth ONLY comes from level ups and the
Hunter Blade. Nen boosts are temporary and charge-limited so they cannot stack.
