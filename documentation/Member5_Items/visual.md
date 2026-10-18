# Member 5 — Items / Inventory Visual

```text
ITEM
name / type / value
   |
   v
INVENTORY ARRAY
   |
   +--> add(item)
   +--> removeOne(name)
   +--> has(name)
   +--> removeAt(index)  -> Hunter Blade use in UI
   +--> map()    -> item names
   +--> filter() -> items by type
   +--> reduce() -> total item value

WEB VERSION (Member 5 also owns src/ui/UI.js, the renderer):
  openItems(inventory, onUse) -> inventory modal with a Use button per item
  useItem(item, index)
     +--> Recovery Drink     -> game.usePotion (heal 30)
     +--> Hunter Blade       -> permanent attack +10, removeAt(index)
     +--> Hunter License Key -> win requirement, cannot be consumed
```
