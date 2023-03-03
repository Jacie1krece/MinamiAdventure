//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.40;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.40] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for single column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 * 
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * ---
 *
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 * 
 * <Party Artifact>
 * <Troop Artifact>
 * 
 * <Stackable Party Artifact>
 * <Stackable Troop Artifact>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped at all. However, by simply being in the
 *   party's inventory, its parameter bonuses and traits will be applied
 *   globally throughout the whole party or troop (depending on the notetag).
 * - Add both notetags to affect both groups.
 * - The normal versions of the notetag is only applied once regardless of the
 *   number of copies are found in the party's inventory.
 * - The stackable versions of the notetag will have the bonuses and traits
 *   stacked multiple times relative to the number of copies found in the
 *   party's inventory.
 * - This item will NOT be added during the setup phase for Battle Tests.
 *   - If you want to add the item, do it manually.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 * 
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.40: October 20, 2022
 * * Feature Update!
 * ** For the shop status window, when comparing equipment of a type where
 *    there are multiple equipment slots (such as accessories), the plugin will
 *    now check for an empty equipment slot first and then make calculations
 *    there. Otherwise, it will use the first available equipment slot of that
 *    type regardless of the equipped item. Update made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.39: September 29, 2022:
 * * Feature Update!
 * ** Changed the default code for the equip scene's status window display to
 *    prevent the face graphic and basic actor stats from going above the
 *    window boundaries if there are too many parameters displayed in the
 *    status window at a time.
 * ** If you already have this plugin installed the changes will not be
 *    reflected unless you do the following:
 * **** BACKUP your game project.
 * **** REMOVE this plugin from the Plugin Manager list.
 * **** REINSTALL this plugin into the Plugin Manager list.
 * **** SAVE the game project.
 * 
 * Version 1.38: March 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New mechanics and notetags added by Olivia and sponsored by Anon:
 * *** <Party Artifact>
 * *** <Troop Artifact>
 * *** <Stackable Party Artifact>
 * *** <Stackable Troop Artifact>
 * **** Armors only! This armor cannot be equipped at all. However, by simply
 *      being in the party's inventory, its parameter bonuses and traits will
 *      be applied globally throughout the whole party or troop (depending on
 *      the notetag). Add both notetags to affect both groups.
 * **** The normal versions of the notetag is only applied once regardless of
 *      the number of copies are found in the party's inventory.
 * **** The stackable versions of the notetag will have the bonuses and traits
 *      stacked multiple times relative to the number of copies found in the
 *      party's inventory.
 * **** This item will NOT be added during the setup phase for Battle Tests.
 * ***** If you want to add the item, do it manually.
 * 
 * Version 1.37: December 23, 2021
 * * Compatibility Update
 * ** Created foundation for proxy items to be used in any applicable system
 *    and extension plugins. Update made by Arisu.
 * 
 * Version 1.36: December 2, 2021
 * * Feature Update!
 * ** For those using custom parameters from the Core Engine and do not have
 *    the parameters all-capitalized, the plugin will automatically do it for
 *    you to prevent errors. Update made by Olivia.
 * 
 * Version 1.35: November 18, 2021
 * * Compatibility Update!
 * ** If this plugin's updated scene is disabled, the Help Window locations for
 *    the Item, Equip, and Shop Scenes should now be at their designated
 *    locations as calculated by the VisuMZ Core Engine instead of the RMMZ
 *    default location. Update made by Irina.
 * 
 * Version 1.34: October 28, 2021
 * * Feature Update
 * ** Added fail safe checks for projects that are using old data for starting
 *    equipment that no longer exist, thus preventing the game from opening.
 *    Update made by Arisu.
 * 
 * Version 1.33: August 6, 2021
 * * Documentation Update!
 * ** Removed "Weapon" and "Armor" from "Used For" for <Status Info>. This was
 *    an unintended piece of documentation.
 * 
 * Version 1.32: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause armor duplication when changing to classes
 *    with unaligned equipment slot types. Fix made by Arisu.
 * 
 * Version 1.31: July 9, 2021
 * * Feature Update!
 * ** Added a failsafe for price manipulation JavaScript to never have prices
 *    drop below 0 if possible. Update made by Arisu.
 * 
 * Version 1.30: July 2, 2021
 * * Documentation Update!
 * ** Added an extra note to the help file for the following:
 *    Plugin Parameters > Item Menu Settings > List Window > Columns
 * *** If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *    
 * 
 * Version 1.29: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Feature Update!
 * ** Phantom data when changing equipment types in the database should no
 *    longer affect actors with cached equip ID's. Update made by Arisu.
 * 
 * Version 1.28: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 * 
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"true","CmdIconOptimize:num":"137","CommandAddClear:eval":"true","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

function _0x1689(){const _0x343edc=['DXDwe','BatchShop','Window_Selectable_refresh','_buttonAssistWindow','changeEquipById','KWKdJ','drawItemDarkRect','equipSlots','_resetFontSize','SetupProxyItemGroups','Window_ItemList_item','LabelRecoverHP','clamp','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','LabelElement','textWidth','windowPadding','value1','isEnabled','getItemIdWithName','_customItemInfo','artifacts','PAUlw','Step3Start','vLphT','AlreadyEquipMarker','elementId','maxItems','goldWindowRect','filter','updateMoneyAmount','textColor','Step2Start','DFBWc','makeDeepCopy','setMp','mainAreaHeight','cTEZs','_money','CONSUMABLE','right','lTxxh','Scene_Equip_helpWindowRect','dzENp','iIrtA','MultiplierStandard','LabelSpeed','Scene_Shop_doSell','_goodsCount','ARRAYEVAL','switchProxyItem','processCursorMoveModernControls','%1%','Ntsvc','version','UCzdK','prepareNextScene','paramPlusItemsEquipsCoreCustomJS','×%1','ADDED\x20EFFECTS','EJAfF','RnIfE','left','allowCommandWindowCursorUp','MWKIu','Speed2000','Scene_Shop_sellingPrice','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','geUpdatedLayoutStatusWidth','ScopeRandomEnemies','Scene_Equip_onSlotOk','currentExt','FadeLimit','drawUpdatedBeforeParamValue','imPEo','_newLabelSprites','Game_BattlerBase_meetsItemConditions','GhIzs','commandWindowRectItemsEquipsCore','setupBattleTestItems','boxWidth','placeNewLabel','Settings','StatusWindow','Window_ItemCategory_setItemWindow','cursorLeft','tradeItemWithParty','onSlotOkAutoSelect','qsNtk','getItemHitTypeLabel','Categories','AMhjr','VisuMZ_0_CoreEngine','isWeapon','item','buyWindowRect','isRightInputMode','MaxIcons','flatMP','Parse_Notetags_Batch','ARRAYNUM','getItemDamageAmountTextBattleCore','RZswZ','_buyWindowLastIndex','sellPriceRate','addChild','getArmorIdWithName','_item','allowShiftScrolling','paramJS','commandStyle','OffsetX','drawItemDamage','Scene_Equip_createSlotWindow','MaxItems','fontSize','removeBuff','setTopRow','CoreEngine','#%1','isNewItem','iojzD','isOpenAndActive','popScene','cursorPageup','playOkSound','SellPriceJS','oSzrM','EnableLayout','433029oZuFSu','onSlotOk','battleMembers','setTempActor','cursorPagedown','drawItemEquipType','cursorDown','_armorIDs','vPXIr','JZXGX','ElementWeapon','buttonAssistText3','name','_categoryWindow','yQRpL','auto','ParamChangeFontSize','addItemCategory','LabelApply','postCreateSlotWindowItemsEquipsCore','process_VisuMZ_ItemsEquipsCore_RegExp','getMatchingInitEquip','parameters','updateHelp','Game_Party_numItems','smoothScrollTo','Scene_Shop_onSellOk','Text','mainAreaBottom','EFFECT_GAIN_TP','MaxWeapons','addSellCommand','occasion','gainItem','\x5cI[%1]','item-%1','RemoveEquipText','LBclQ','ztRMC','isHovered','description','ydnvY','drawItemData','Scene_Shop_goldWindowRect','Step2End','ShwKY','ejLdV','getMenuImage','registerCommand','MaxMP','CmdIconClear','EVAL','_commandWindow','Scene_Shop_numberWindowRect','isClearCommandEnabled','Parse_Notetags_Category','resetFontSettings','VTsul','OMVZr','processCursorMove','exit','BorderRegExp','rateMP','foreground','Scene_Shop_buyingPrice','drawUpdatedParamValueDiff','ARRAYFUNC','_forcedSlots','buttonAssistKey1','SBsuZ','TIOQx','(%1)','Window_ItemCategory_initialize','currentSymbol','sellPriceOfItem','middle','createSellWindow','efhyx','Scene_Shop_onBuyOk','100%','TP\x20DAMAGE','Window_ItemList_maxCols','commandBuyItemsEquipsCore','hSEyE','optKeyItemsNumber','optimize','drawItemKeyData','znCPm','drawItemEffectsRemovedStatesBuffs','HIT\x20TYPE','createCommandNameWindow','WJhNJ','zypGW','TOSui','isBuyCommandEnabled','rWTxQ','YSYEQ','constructor','addWindow','PGBAU','removeBattleTestArtifacts','lineHeight','hide','CmdStyle','ItemQuantityFmt','getItemHitTypeText','isStackableArtifact','effects','addEquipCommand','categoryStyleCheck','statusWidth','isSellCommandEnabled','loseItem','getItemDamageAmountTextOriginal','commandEquip','STR','onTouchSelectModern','EFFECT_ADD_DEBUFF','allowCreateStatusWindow','_itemData','modifiedBuyPriceItemsEquipsCore','DEF','processDrawIcon','jNOnP','EquipParams','ConvertNumberToString','Window_Selectable_initialize','armors','HitType%1','QJwmY','isGoodShown','Scene_Shop_commandWindowRect','TdjtM','trim','drawItemStyleIconText','jFSVg','replace','drawItemEffectsMpRecovery','value','_dummyWindow','GBiGF','RdTDw','forceChangeEquip','LayoutStyle','commandSellItemsEquipsCore','buy','deselect','BcwTV','_equips','Speed1','SpeedNeg1999','prototype','damageColor','oyzEk','ffnqA','changeEquip','placeItemNewLabel','ZMIxm','ePoQL','ParseWeaponNotetags','juSAF','nonRemovableEtypes','mainAreaTop','drawItemOccasion','lYcsp','prepareRefreshItemsEquipsCoreLayout','onTouchSelect','Consumable','QUANTITY','statusWindowRectItemsEquipsCore','USER\x20TP\x20GAIN','EquipScene','wWHED','powerDownColor','XPDWZ','traitObjects','dataId','EFFECT_REMOVE_DEBUFF','slotWindowRectItemsEquipsCore','isUseParamNamesWithIcons','ARRAYSTRUCT','drawParamsItemsEquipsCore','postCreateItemsEquipsCore','drawUpdatedAfterParamValue','Scene_Shop_commandBuy','PkjJW','scrollTo','isPressed','reloadMapIfUpdated','Parse_Notetags_Prices','klfvO','forceChangeEquipSlots','itemTextAlign','setupItemDamageTempActors','_actor','discardEquip','nHnVA','ItemQuantityFontSize','Scene_Shop_onSellCancel','map','addStateBuffChanges','KSGEw','setShopStatusWindowMode','resetShopSwitches','Game_Party_gainItem','addInnerChild','EFSCq','clNDc','Window_EquipStatus_refresh','hideDisabledCommands','flatHP','_shopStatusMenuMode','isArtifact','_bypassProxy','Scene_Equip_statusWindowRect','joJqh','changePaintOpacity','processCursorSpecialCheckModernControls','VXZPP','isBattleTest','categoryNameWindowDrawBackground','kdwJu','addCancelCommand','bdUaj','wLNLO','getItemEffectsRemovedStatesBuffsLabel','drawItemEffectsHpDamage','adjustHiddenShownGoods','drawRemoveItem','maxItemAmount','fillRect','TisuG','setStatusWindow','_handlers','call','drawNewLabelIcon','Game_Actor_artifact','_numberWindow','OffsetY','itemDataFontSize','categoryWindowRectItemsEquipsCore','bVmad','pBxWk','SetupProxyItemGroup','koBan','Game_Actor_paramPlus','drawItemRepeats','_categoryNameWindow','fontSizeRatio','addBuyCommand','(+%1)','test','equip2','Game_Item_setObject','jrnhp','concat','_itemWindow','ngxaM','JIxLg','releaseUnequippableItems','floor','ZAEqP','getProxyItem','drawItemEffects','nFFdv','getItemEffectsHpRecoveryLabel','IncludeShopItem','revertGlobalNamespaceVariables','SCOPE','refreshItemsEquipsCoreNoMenuImage','Scene_Equip_commandEquip','goldWindowRectItemsEquipsCore','LabelRemove','canShiftRemoveEquipment','buyingPrice','_buyWindow','Window_ItemList_colSpacing','innerWidth','Game_Actor_equips_artifacts','AllItems','create','optimizeEquipments','type','iyMbO','addState','Scene_Equip_commandWindowRect','gZjmN','isShowNew','AllArmors','getItemConsumableText','FontSize','possession','CmdIconCancel','Scene_Item_createCategoryWindow','createSlotWindow','VrdCM','Scene_Shop_statusWindowRect','akhCo','AKkKf','adjustItemWidthByStatus','getItemEffectsMpDamageText','setItemWindow','drawItemEffectsTpDamage','%1-%2','nnlHe','REMOVED\x20EFFECTS','eCFxi','NUM','bOAur','VwxSb','Icon','isBottomHelpMode','Game_BattlerBase_paramPlus_artifact','byTDR','object','weapon-%1','statusWindowRect','systemColor','ShiftShortcutKey','AllWeapons','equipAdjustHpMp','updateCategoryNameWindow','onTouchCancel','postCreateItemWindowModernControls','getItemDamageAmountLabelBattleCore','gpNPr','Game_Actor_tradeItemWithParty','isHoverEnabled','38zIepUk','Window_EquipItem_includes','kOrUK','forceResetEquipSlots','deactivate','setObject','Scene_Item_helpWindowRect','equipSlotIndex','gfEpb','_commandNameWindow','IvmyJ','LabelRecoverTP','mhp','_resetFontColor','setCategory','code','Scene_Shop_buyWindowRect','VisuMZ_1_MainMenuCore','LabelRepeats','Scene_Equip_create','equip','Param','sellingPrice','removeState','gvYve','nRihs','HP\x20RECOVERY','onActorChange','_slotWindow','splice','eebjL','wbAgM','atypeId','postCreateSellWindowItemsEquipsCore','getItemSpeedText','EquipAdjustHpMp','repeats','process_VisuMZ_ItemsEquipsCore_Notetags','DUuva','icon','getItemDamageElementLabel','itemWindowRectItemsEquipsCore','nonOptimizeEtypes','onCategoryCancel','mNbHG','Scene_Load_reloadMapIfUpdated','tpGain','FUNC','20250VKvqSn','W%1','addOptimizeCommand','playBuzzerSound','_newItemsList','oXNoE','isClearEquipOk','zmZGe','length','troopArtifacts','getItemEffectsTpRecoveryText','mpRate','armor-%1','mGrMH','innerHeight','drawCustomShopGraphic','Translucent','drawItemDamageElement','AlwaysUsable','RMWTP','JrmSl','colSpacing','CEwQP','formula','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','speed','isProxyItem','drawParamText','determineBaseSellingPrice','max','sellWindowRect','buttonAssistKey2','GQEtO','Scene_Shop_createCategoryWindow','getItemScopeText','Scene_Shop_helpWindowRect','XGRIR','FadeSpeed','rMcAI','BPzKy','createBitmap','buttonAssistItemListRequirement','MP\x20DAMAGE','HiddenItemB','drawItemSpeed','DrawBackRect','isEquipCommandEnabled','Scene_Item_categoryWindowRect','index','Scene_ItemBase_activateItemWindow','Window_ItemList_updateHelp','createNewLabelSprite','isSoleArmorType','armor','Scene_Shop_onCategoryCancel','rsoyw','iconIndex','isCursorMovable','ZQMwg','wJPCC','_tempActorB','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','select','SXaxy','drawItemEffectsSelfTpGain','enRdB','ipxpC','commandWindowRect','2052224YjUJyO','format','loadSystem','scope','SwitchSell','fTUns','VzZlY','weaponTypes','rateHP','PHdWH','commandNameWindowCenter','lpjGn','Game_Party_initialize','Scene_Shop_activateSellWindow','buttonAssistSlotWindowShift','dfmZw','getItemDamageAmountLabel','inBattle','onSellOkItemsEquipsCore','drawItemCost','getItemsEquipsCoreBackColor2','UmzPE','drawItemCustomEntries','drawPossession','ExtDisplayedParams','center','Game_BattlerBase_canEquip_artifact','SHbDJ','isTroopArtifact','Speed1000','ItemMenuStatusRect','drawCustomShopGraphicLoad','Scene_Equip_onSlotCancel','TP\x20RECOVERY','buttonAssistOffset3','KxjGm','XnIkw','isHandled','addItemCategories','1442439QDrZyI','isArmor','checkItemConditionsSwitchNotetags','drawCurrencyValue','qUDqu','isKeyItem','LUK','Window_ShopBuy_price','NoChangeMarker','toUpperCase','buttonAssistSmallIncrement','CzCTk','doSell','processHandling','update','helpAreaTop','activateSellWindow','getItemRepeatsLabel','getInputMultiButtonStrings','EFFECT_REMOVE_STATE','isPageChangeRequested','mWFyA','isCommandEnabled','_bypassReleaseUnequippableItemsItemsEquipsCore','members','drawItemEffectsMpDamage','AMMVL','_newLabelOpacityUpperLimit','NeverUsable','cancel','postCreateCategoryWindowItemsEquipsCore','RnTru','_statusWindow','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ListWindowCols','getItemEffectsHpRecoveryText','mmp','uiMenuStyle','getItemColor','List','buttonAssistRemove','itemLineRect','buyWindowRectItemsEquipsCore','MaxHP','process_VisuMZ_ItemsEquipsCore_EquipSlots','etypeId','setBackgroundType','_newLabelOpacity','HVmjF','ItemScene','gainTP','REPEAT','getItemEffects','rYpiO','_scene','top','armorTypes','drawEquipData','commandName','categoryNameWindowDrawText','ElementNone','Occasion%1','Slots','blt','updateSmoothScroll','getItemEffectsMpRecoveryLabel','drawItemCustomEntryLine','getItemEffectsRemovedStatesBuffsText','split','AyafQ','buttonAssistText1','_scrollDuration','activate','powerUpColor','canConsumeItem','actor','newLabelEnabled','cliVY','checkShiftRemoveShortcut','Scene_Item_createItemWindow','isPartyArtifact','getItemDamageElementText','SwitchID','itemAt','processShiftRemoveShortcut','Parse_Notetags_EnableJS','66ozMQdj','prepareNewEquipSlotsOnLoad','createCategoryNameWindow','FaKVx','addCommand','getItemEffectsSelfTpGainLabel','smallParamFontSize','translucentOpacity','LabelDamageTP','nextActor','drawItemEffectsTpRecovery','FoiVj','nibrX','itemHasEquipLimit','ParseClassNotetags','pIzBc','rdGpG','acfsm','doBuy','meetsItemConditions','VisuMZ_1_BattleCore','prepare','Scene_Shop_prepare','isEquipCommandAdded','iLGPa','getItemRepeatsText','values','getItemEffectsTpRecoveryLabel','_allowArtifactTraitObjects','isShiftRemoveShortcutEnabled','_category','NonRemoveETypes','cRgZX','drawActorCharacter','getTextColor','zlJuo','_doubleTouch','isSceneShop','kgnhk','setValue','drawItemConsumable','xRJYU','isCancelled','commandStyleCheck','commandNameWindowDrawText','OkJUx','isEquipChangeOk','QoL','drawParamName','oAuOf','CmdIconSell','createStatusWindow','FMRvZ','maxCols','ceil','paramchangeTextColor','Window_EquipCommand_initialize','wtypeId','ufVEJ','ItemSceneAdjustItemList','drawItemActorMenuImage','paintOpacity','Scene_Shop_categoryWindowRect','nhlAM','initialize','addLoadListener','clearNewItem','ItemMenuStatusBgType','bLcES','247247VpxjNR','getEmptyEquipSlotOfSameEtype','isEquipItem','onTouchSelectModernControls','shift','lbcQR','Game_Actor_discardEquip','isClearCommandAdded','drawItemEffectsHpRecovery','bind','paramPlus','onCategoryCancelItemsEquipsCore','Step1End','QkrfL','Step1Start','nuasz','+%1%','onSellOk','HP\x20DAMAGE','commandBuy','getItemDamageAmountText','getItemSuccessRateLabel','nqGPU','OfzaM','paramValueFontSize','20lbNlnS','zhCFv','getItemEffectsSelfTpGainText','isClicked','remove','updatedLayoutStyle','textSizeEx','NonOptimizeETypes','note','categoryStyle','MDF','partyArtifacts','hitType','CommandAddClear','Parse_Notetags_EquipSlots','drawIcon','mkKaF','uqolw','onSlotCancel','initNewItemsList','_tempActor','calcWindowHeight','SBDNh','_goods','SzCed','uqbki','uiInputPosition','currentClass','ActorChangeEquipSlots','text','helpAreaHeight','vaYEx','ZYLzs','ItemsEquipsCore','14844258APoFkb','rDZgK','elements','Window_ShopCommand_initialize','refreshActorEquipSlotsIfUpdated','LabelDamageMP','includes','ajjOQ','isDualWield','FontFace','fpAhv','versionId','AGI','getItemOccasionText','WDfKn','removeStateBuffChanges','Scope%1','nImxS','fgpGz','normalColor','commandSell','iconHeight','contents','_sellWindow','cXMiO','getColor','LabelSelfGainTP','canUse','RTiMR','CbnLI','hideAdditionalSprites','Nonconsumable','_weaponIDs','DrawFaceJS','SwitchBuy','changeTextColor','allMembers','itemPadding','Scene_Shop_onBuyCancel','Window_ShopBuy_refresh','hpRate','categories','drawTextEx','updateCommandNameWindow','HivtJ','Step3End','callUpdateHelp','MAT','onBuyCancelItemsEquipsCore','equips','New','NsHPE','helpWindowRect','Scene_Item_create','itypeId','EATXp','LvzHu','UykTk','ScopeRandomAny','convertInitEquipsToItems','pageup','status','param','createCategoryWindow','drawItemQuantity','pmscd','mLHUk','jOsML','Scene_Boot_onDatabaseLoaded','move','buttonAssistKey3','_tempActorA','A%1','processCursorHomeEndTrigger','categoryNameWindowCenter','CmdIconOptimize','rWaVu','ygQdY','qfhXl','CuAee','4BSGZrl','rSuOj','NhrEq','onCategoryOk','_calculatingJSParameters','MQSiS','WbqBB','getItemEffectsTpDamageText','drawNewLabelText','ParseArmorNotetags','height','shouldCommandWindowExist','RVJff','drawItem','push','keyItem','DrawPortraitJS','hitIndex','FJuFY','1778hhprEW','mainFontSize','onSellCancel','UeNsr','eyJfa','Game_Enemy_traitObjects_artifact','VQvRh','IconSet','StatusWindowWidth','setHelpWindowItem','PYkWs','params','isOptimizeEquipOk','damage','Actors','anyEmptyEquipSlotsOfSameEtype','TextAlign','onMenuImageLoad','Scene_Shop_sellWindowRect','addClearCommand','dNfRC','makeCommandList','ShopMenuStatusStandard','Window_ShopSell_isEnabled','Window_Selectable_setHelpWindowItem','Game_Party_setupBattleTestItems_artifact','\x5cI[%1]%2','_data','RegExp','playCursorSound','JIMuY','drawItemName','setNewItem','background','eKnHR','drawItemStyleIcon','isUseModernControls','CommandAddOptimize','sell','iUbly','Scene_Shop_createSellWindow','ShopScene','_newLabelOpacityChange','setHp','_list','tuiLI','XmTYc','match','ekIkd','Game_Party_gainItem_artifact','getWeaponIdWithName','BackRectColor','IcCFC','_itemIDs','yRtyI','numItems','GDFZp','clear','Game_Actor_forceChangeEquip','KeyItems','pExcM','log','iconText','isRepeated','Parse_Notetags_ParamJS','equipTypes','YHCVE','loadPicture','activateItemWindow','smoothSelect','updateChangedSlots','GTpmx','NotConsumable','isUseItemsEquipsCoreUpdatedLayout','getItemEffectsMpDamageLabel','EFFECT_ADD_BUFF','buffIconIndex','NfziA','money','RegularItems','contentsBack','resetTextColor','isOptimizeCommandEnabled','parse','DxjCd','drawing','DkyXL','active','loadFaceImages','cursorRight','rbPtr','Width','defaultItemMax','JosbB','LabelConsume','bhnhR','onBuyOk','gaugeBackColor','drawItemEffectsAddedStatesBuffs','Whitelist','getItemEffectsAddedStatesBuffsLabel','QnTKX','bitmap','_allowArtifactParamBase','gMmDw','iconWidth','dvrfP','paramId','Scene_Equip_slotWindowRect','maxVisibleItems','JSItJ','paramValueByName','consumable','Fmpos','isOpen','drawItemNumber','refreshCursor','getItemEffectsAddedStatesBuffsText','fill','eGKxA','NAHaY','SPEED','getItemConsumableLabel','TfWeB','luuAq','round','bestEquipItem','refresh','getItemEffectsTpDamageLabel','BlkXh','Scene_Shop_create','commandNameWindowDrawBackground','isPlaytest','Game_BattlerBase_param','BKlfW','initNewLabelSprites','FontColor','uiHelpPosition','+%1','SellPriceRate','down','ELEMENT','ConvertParams','getItemSpeedLabel','drawActorParamDifference','drawItemSuccessRate','categoryList','_shopStatusMenuAlly','setHandler','DrawItemData','xsDjE','buttonAssistCategory','HKWIG','RyHAK','initEquips','sellWindowRectItemsEquipsCore','visible','buttonAssistLargeIncrement','LabelDamageHP','Window_EquipItem_isEnabled','0000','removeDebuff','drawItemDamageAmount','Speed0','Window_ShopStatus_setItem','canEquip','_cache','oHtvu','qgvup','selfTP','onDatabaseLoaded','isTriggered','NEvBI','PurchaseOnly','isMainMenuCoreMenuImageOptionAvailable','JuoVB','JVIxh','getItemEffectsHpDamageText','numberWindowRectItemsEquipsCore','jutJP','usXlv','categoryWindowRect','MANUAL','setItem','YTQTr','CmdIconBuy','WCJxQ','opacity','value2','qpMwR','slotWindowRect','nMmGk','KeyItemProtect','jaMZw','yvqwf','baseSellingPrice','buttonAssistText2','onTouchOk','oyFLJ','meetsItemConditionsJS','itemEnableJS','uPidG','CmdIconEquip','tScyf','createItemWindow','fGyfg','CmdTextAlign','prepareItemCustomData','DrawEquipData','price','SUCCESS\x20RATE','Damage\x20Formula\x20Error\x20for\x20%1','kKsrT','tQOcE','?????','Scene_Shop_doBuy','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','meetsItemConditionsNotetags','SVVXE','mcKFD','getItemDamageAmountLabelOriginal','updateNewLabelOpacity','getItemsEquipsCoreBackColor1','wMttq','\x5cb%1\x5cb','mainCommandWidth','isSoleWeaponType','wGCve','LabelRecoverMP','categoryItemTypes','actorParams','ZCBGv','dJSnA','ScopeRandomAllies','getItemEffectsMpRecoveryText','isItem','qlKSd','pop','Kygwp','EVJdc','clearNewLabelFromItem','XDzks','DrawIcons','nCeiY','toLowerCase','Game_Actor_changeEquip','getNextAvailableEtypeId','Parse_Notetags_ParamValues','_bypassNewLabel','BuyPriceJS','ZJSei','Game_BattlerBase_param_artifact','RgICz','isOptimizeCommandAdded','drawText','getDamageStyle','Window_ShopBuy_item','EegGB','clearEquipments','EFFECT_ADD_STATE','show','Scene_Shop_commandSell','itemWindowRect','aMjxa','onBuyCancel','isDrawItemNumber','OiWbA','getItemQuantityText','characterName','width','processTouchModernControls','jpEOX','pagedown','changeBuff','ParseItemNotetags','getItemSuccessRateText','helpWindowRectItemsEquipsCore','TXTnW','DrawParamJS','getItemEffectsHpDamageLabel','indexOf'];_0x1689=function(){return _0x343edc;};return _0x1689();}const _0x420e63=_0x2455;(function(_0x445f2e,_0x2aa17b){const _0x4f2851=_0x2455,_0x256e91=_0x445f2e();while(!![]){try{const _0xfbe5fe=parseInt(_0x4f2851(0x3aa))/0x1*(-parseInt(_0x4f2851(0x1d6))/0x2)+parseInt(_0x4f2851(0x544))/0x3*(-parseInt(_0x4f2851(0x397))/0x4)+parseInt(_0x4f2851(0x206))/0x5+parseInt(_0x4f2851(0x2c7))/0x6*(-parseInt(_0x4f2851(0x30c))/0x7)+-parseInt(_0x4f2851(0x24a))/0x8+parseInt(_0x4f2851(0x271))/0x9*(-parseInt(_0x4f2851(0x325))/0xa)+parseInt(_0x4f2851(0x347))/0xb;if(_0xfbe5fe===_0x2aa17b)break;else _0x256e91['push'](_0x256e91['shift']());}catch(_0x428f9f){_0x256e91['push'](_0x256e91['shift']());}}}(_0x1689,0x3338a));var label=_0x420e63(0x346),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x420e63(0x4e0)](function(_0x1fc68e){const _0x5f06f4=_0x420e63;return _0x1fc68e[_0x5f06f4(0x384)]&&_0x1fc68e[_0x5f06f4(0x56c)][_0x5f06f4(0x34d)]('['+label+']');})[0x0];function _0x2455(_0x311abf,_0xc4e9ef){const _0x168953=_0x1689();return _0x2455=function(_0x245522,_0x5a2143){_0x245522=_0x245522-0xc8;let _0x14b8fa=_0x168953[_0x245522];return _0x14b8fa;},_0x2455(_0x311abf,_0xc4e9ef);}VisuMZ[label][_0x420e63(0x515)]=VisuMZ[label][_0x420e63(0x515)]||{},VisuMZ[_0x420e63(0x438)]=function(_0x2d23e1,_0x3058b6){const _0x80a69b=_0x420e63;for(const _0x16a522 in _0x3058b6){if('qdZzr'!==_0x80a69b(0x37e)){if(_0x16a522[_0x80a69b(0x3d9)](/(.*):(.*)/i)){if('oAuOf'===_0x80a69b(0x2f8)){const _0x1c1088=String(RegExp['$1']),_0x3683b2=String(RegExp['$2'])[_0x80a69b(0x27a)]()['trim']();let _0x309ea6,_0x15de1a,_0x325575;switch(_0x3683b2){case _0x80a69b(0x1c1):_0x309ea6=_0x3058b6[_0x16a522]!==''?Number(_0x3058b6[_0x16a522]):0x0;break;case _0x80a69b(0x527):_0x15de1a=_0x3058b6[_0x16a522]!==''?JSON[_0x80a69b(0x3fd)](_0x3058b6[_0x16a522]):[],_0x309ea6=_0x15de1a[_0x80a69b(0x155)](_0x188243=>Number(_0x188243));break;case _0x80a69b(0x577):_0x309ea6=_0x3058b6[_0x16a522]!==''?eval(_0x3058b6[_0x16a522]):null;break;case _0x80a69b(0x4f4):_0x15de1a=_0x3058b6[_0x16a522]!==''?JSON[_0x80a69b(0x3fd)](_0x3058b6[_0x16a522]):[],_0x309ea6=_0x15de1a['map'](_0x1219b7=>eval(_0x1219b7));break;case'JSON':_0x309ea6=_0x3058b6[_0x16a522]!==''?JSON[_0x80a69b(0x3fd)](_0x3058b6[_0x16a522]):'';break;case'ARRAYJSON':_0x15de1a=_0x3058b6[_0x16a522]!==''?JSON[_0x80a69b(0x3fd)](_0x3058b6[_0x16a522]):[],_0x309ea6=_0x15de1a[_0x80a69b(0x155)](_0x49d9c1=>JSON[_0x80a69b(0x3fd)](_0x49d9c1));break;case _0x80a69b(0x205):_0x309ea6=_0x3058b6[_0x16a522]!==''?new Function(JSON[_0x80a69b(0x3fd)](_0x3058b6[_0x16a522])):new Function('return\x200');break;case _0x80a69b(0xd0):_0x15de1a=_0x3058b6[_0x16a522]!==''?JSON[_0x80a69b(0x3fd)](_0x3058b6[_0x16a522]):[],_0x309ea6=_0x15de1a[_0x80a69b(0x155)](_0x1bdc45=>new Function(JSON[_0x80a69b(0x3fd)](_0x1bdc45)));break;case _0x80a69b(0x101):_0x309ea6=_0x3058b6[_0x16a522]!==''?String(_0x3058b6[_0x16a522]):'';break;case'ARRAYSTR':_0x15de1a=_0x3058b6[_0x16a522]!==''?JSON[_0x80a69b(0x3fd)](_0x3058b6[_0x16a522]):[],_0x309ea6=_0x15de1a['map'](_0x237852=>String(_0x237852));break;case'STRUCT':_0x325575=_0x3058b6[_0x16a522]!==''?JSON[_0x80a69b(0x3fd)](_0x3058b6[_0x16a522]):{},_0x2d23e1[_0x1c1088]={},VisuMZ[_0x80a69b(0x438)](_0x2d23e1[_0x1c1088],_0x325575);continue;case _0x80a69b(0x142):_0x15de1a=_0x3058b6[_0x16a522]!==''?JSON[_0x80a69b(0x3fd)](_0x3058b6[_0x16a522]):[],_0x309ea6=_0x15de1a[_0x80a69b(0x155)](_0x86569c=>VisuMZ[_0x80a69b(0x438)]({},JSON['parse'](_0x86569c)));break;default:continue;}_0x2d23e1[_0x1c1088]=_0x309ea6;}else return this[_0x80a69b(0x511)]();}}else return this[_0x80a69b(0x528)]();}return _0x2d23e1;},(_0x47c923=>{const _0x488c7c=_0x420e63,_0x236cf4=_0x47c923[_0x488c7c(0x550)];for(const _0x23c4c6 of dependencies){if(!Imported[_0x23c4c6]){alert(_0x488c7c(0x506)[_0x488c7c(0x24b)](_0x236cf4,_0x23c4c6)),SceneManager['exit']();break;}}const _0x200025=_0x47c923[_0x488c7c(0x56c)];if(_0x200025[_0x488c7c(0x3d9)](/\[Version[ ](.*?)\]/i)){if(_0x488c7c(0x16b)!==_0x488c7c(0x489)){const _0x4e6d41=Number(RegExp['$1']);_0x4e6d41!==VisuMZ[label]['version']&&(alert(_0x488c7c(0x292)['format'](_0x236cf4,_0x4e6d41)),SceneManager['exit']());}else{const _0x3133c3=this['_categoryNameWindow'];_0x3133c3[_0x488c7c(0x4a8)](_0x2f5385,0x0,_0x52a19c['y'],_0x3133c3[_0x488c7c(0x1a3)],_0x488c7c(0x263));}}if(_0x200025[_0x488c7c(0x3d9)](/\[Tier[ ](\d+)\]/i)){if(_0x488c7c(0x469)==='qhfPB')return _0x2464d5[_0x488c7c(0x346)][_0x488c7c(0x4ed)][_0x488c7c(0x178)](this);else{const _0x36ad34=Number(RegExp['$1']);_0x36ad34<tier?_0x488c7c(0x165)===_0x488c7c(0x399)?(_0x2c06ba=this[_0x488c7c(0x150)][_0x488c7c(0x419)](_0x3eb6ec,![]),_0xb18262=this[_0x488c7c(0x339)][_0x488c7c(0x419)](_0xf8acd6,![]),_0x474dc2=this[_0x488c7c(0x339)][_0x488c7c(0x419)](_0x3ff1b8,!![])):(alert(_0x488c7c(0x21e)[_0x488c7c(0x24b)](_0x236cf4,_0x36ad34,tier)),SceneManager[_0x488c7c(0xca)]()):tier=Math[_0x488c7c(0x223)](_0x36ad34,tier);}}VisuMZ[_0x488c7c(0x438)](VisuMZ[label][_0x488c7c(0x515)],_0x47c923[_0x488c7c(0x55a)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x420e63(0x550)],_0x420e63(0x341),_0x876f5a=>{const _0x3b7e6d=_0x420e63;VisuMZ[_0x3b7e6d(0x438)](_0x876f5a,_0x876f5a);const _0x434bfa=_0x876f5a['Actors'][_0x3b7e6d(0x155)](_0x16b48f=>$gameActors[_0x3b7e6d(0x2bc)](_0x16b48f)),_0x1c0577=_0x876f5a[_0x3b7e6d(0x2af)][_0x3b7e6d(0x155)](_0x484000=>$dataSystem[_0x3b7e6d(0x3eb)][_0x3b7e6d(0x4c2)](_0x484000[_0x3b7e6d(0x113)]()));for(const _0x3cf221 of _0x434bfa){if(!_0x3cf221)continue;_0x3cf221[_0x3b7e6d(0x14d)](_0x1c0577);}}),PluginManager['registerCommand'](pluginData['name'],'ActorResetEquipSlots',_0x2f838f=>{const _0x152363=_0x420e63;VisuMZ[_0x152363(0x438)](_0x2f838f,_0x2f838f);const _0x1c330a=_0x2f838f[_0x152363(0x3b8)][_0x152363(0x155)](_0x35f810=>$gameActors[_0x152363(0x2bc)](_0x35f810));for(const _0x37b77c of _0x1c330a){if(!_0x37b77c)continue;_0x37b77c[_0x152363(0x1d9)]();}}),PluginManager[_0x420e63(0x574)](pluginData[_0x420e63(0x550)],_0x420e63(0x4c4),_0x576f49=>{const _0x4b3788=_0x420e63;VisuMZ['ConvertParams'](_0x576f49,_0x576f49);const _0x3a2ac1=[],_0x1ac1dc=_0x576f49['Blacklist'][_0x4b3788(0x155)](_0xbaecb2=>_0xbaecb2['toUpperCase']()[_0x4b3788(0x113)]()),_0x2bf7fc=_0x576f49[_0x4b3788(0x40d)][_0x4b3788(0x155)](_0x1126d5=>_0x1126d5[_0x4b3788(0x27a)]()[_0x4b3788(0x113)]()),_0x331346=_0x576f49[_0x4b3788(0x318)]>=_0x576f49['Step1Start']?_0x576f49[_0x4b3788(0x31a)]:_0x576f49[_0x4b3788(0x318)],_0x3f204f=_0x576f49[_0x4b3788(0x318)]>=_0x576f49[_0x4b3788(0x31a)]?_0x576f49[_0x4b3788(0x318)]:_0x576f49[_0x4b3788(0x31a)],_0x17f999=Array(_0x3f204f-_0x331346+0x1)[_0x4b3788(0x420)]()['map']((_0x44c147,_0x5401b6)=>_0x331346+_0x5401b6);for(const _0x234e33 of _0x17f999){const _0x5a2f00=$dataItems[_0x234e33];if(!_0x5a2f00)continue;if(!VisuMZ[_0x4b3788(0x346)][_0x4b3788(0x198)](_0x5a2f00,_0x1ac1dc,_0x2bf7fc))continue;_0x3a2ac1['push']([0x0,_0x234e33,0x0,_0x5a2f00[_0x4b3788(0x47b)]]);}const _0x4ce905=_0x576f49[_0x4b3788(0x570)]>=_0x576f49[_0x4b3788(0x4e3)]?_0x576f49[_0x4b3788(0x4e3)]:_0x576f49[_0x4b3788(0x570)],_0x4d59cb=_0x576f49['Step2End']>=_0x576f49['Step2Start']?_0x576f49[_0x4b3788(0x570)]:_0x576f49[_0x4b3788(0x4e3)],_0xa907e6=Array(_0x4d59cb-_0x4ce905+0x1)['fill']()['map']((_0x1bbcb,_0x2b40ed)=>_0x4ce905+_0x2b40ed);for(const _0x5ce898 of _0xa907e6){if('ofHBL'!=='CeudQ'){const _0x407f24=$dataWeapons[_0x5ce898];if(!_0x407f24)continue;if(!VisuMZ[_0x4b3788(0x346)][_0x4b3788(0x198)](_0x407f24,_0x1ac1dc,_0x2bf7fc))continue;_0x3a2ac1[_0x4b3788(0x3a5)]([0x1,_0x5ce898,0x0,_0x407f24[_0x4b3788(0x47b)]]);}else _0x1086a1=_0x4b3788(0x1c9)[_0x4b3788(0x24b)](_0x5a37cc['id']);}const _0x28f50b=_0x576f49[_0x4b3788(0x374)]>=_0x576f49['Step3Start']?_0x576f49[_0x4b3788(0x4da)]:_0x576f49[_0x4b3788(0x374)],_0x5eee4a=_0x576f49[_0x4b3788(0x374)]>=_0x576f49[_0x4b3788(0x4da)]?_0x576f49[_0x4b3788(0x374)]:_0x576f49[_0x4b3788(0x4da)],_0x2bdaba=Array(_0x5eee4a-_0x28f50b+0x1)['fill']()[_0x4b3788(0x155)]((_0x394616,_0x12ab3b)=>_0x28f50b+_0x12ab3b);for(const _0x196749 of _0x2bdaba){if('kHPAE'!=='kHPAE')!this['isHandled']('pagedown')&&_0x35c2f5[_0x4b3788(0x455)]('pagedown')&&this[_0x4b3788(0x548)](),!this[_0x4b3788(0x26f)](_0x4b3788(0x383))&&_0x1530b9[_0x4b3788(0x455)](_0x4b3788(0x383))&&this['cursorPageup']();else{const _0x4d3548=$dataArmors[_0x196749];if(!_0x4d3548)continue;if(!VisuMZ['ItemsEquipsCore'][_0x4b3788(0x198)](_0x4d3548,_0x1ac1dc,_0x2bf7fc))continue;_0x3a2ac1[_0x4b3788(0x3a5)]([0x2,_0x196749,0x0,_0x4d3548[_0x4b3788(0x47b)]]);}}SceneManager[_0x4b3788(0x3a5)](Scene_Shop),SceneManager[_0x4b3788(0x4fb)](_0x3a2ac1,_0x576f49[_0x4b3788(0x457)]);}),VisuMZ[_0x420e63(0x346)][_0x420e63(0x198)]=function(_0x358223,_0x3134ce,_0x395af9){const _0x3186c7=_0x420e63;if(_0x358223[_0x3186c7(0x550)][_0x3186c7(0x113)]()==='')return![];if(_0x358223[_0x3186c7(0x550)][_0x3186c7(0x3d9)](/-----/i))return![];const _0x5f0427=_0x358223[_0x3186c7(0x370)];if(_0x3134ce[_0x3186c7(0x20e)]>0x0)for(const _0x37a872 of _0x3134ce){if(!_0x37a872)continue;if(_0x5f0427[_0x3186c7(0x34d)](_0x37a872))return![];}if(_0x395af9['length']>0x0){for(const _0x3b6c4e of _0x395af9){if(!_0x3b6c4e)continue;if(_0x5f0427['includes'](_0x3b6c4e))return!![];}return![];}return!![];},VisuMZ[_0x420e63(0x346)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x420e63(0x125)][_0x420e63(0x454)],Scene_Boot[_0x420e63(0x125)][_0x420e63(0x454)]=function(){const _0x43dc9c=_0x420e63;this[_0x43dc9c(0x558)](),VisuMZ['ItemsEquipsCore'][_0x43dc9c(0x38b)][_0x43dc9c(0x178)](this),this[_0x43dc9c(0x1fb)](),VisuMZ[_0x43dc9c(0x346)][_0x43dc9c(0x4cc)]();},Scene_Boot[_0x420e63(0x125)]['process_VisuMZ_ItemsEquipsCore_RegExp']=function(){const _0x47707c=_0x420e63;VisuMZ['ItemsEquipsCore'][_0x47707c(0x3c6)]={},VisuMZ[_0x47707c(0x346)][_0x47707c(0x3c6)][_0x47707c(0x10a)]=[],VisuMZ[_0x47707c(0x346)][_0x47707c(0x3c6)]['BorderRegExp']=[];const _0x101242=[_0x47707c(0x29c),'MaxMP','ATK','DEF',_0x47707c(0x376),'MDF',_0x47707c(0x353),'LUK'];for(const _0x1a33af of _0x101242){if(_0x47707c(0x39d)!==_0x47707c(0x39d))return _0x5006eb[_0x47707c(0x346)][_0x47707c(0x515)]['ItemScene'][_0x47707c(0x268)][_0x47707c(0x178)](this);else{const _0x5eac83=_0x47707c(0x243)[_0x47707c(0x24b)](_0x1a33af);VisuMZ[_0x47707c(0x346)][_0x47707c(0x3c6)][_0x47707c(0x10a)]['push'](new RegExp(_0x5eac83,'i'));const _0x200b1b='\x5cb%1\x5cb'[_0x47707c(0x24b)](_0x1a33af);VisuMZ[_0x47707c(0x346)]['RegExp'][_0x47707c(0xcb)]['push'](new RegExp(_0x200b1b,'g'));}}},Scene_Boot[_0x420e63(0x125)][_0x420e63(0x1fb)]=function(){const _0x2d50c3=_0x420e63;if(VisuMZ['ParseAllNotetags'])return;this[_0x2d50c3(0x29d)]();const _0x521e24=[$dataItems,$dataWeapons,$dataArmors];for(const _0x24cdca of _0x521e24){for(const _0x5220cc of _0x24cdca){if(_0x2d50c3(0x380)===_0x2d50c3(0x380)){if(!_0x5220cc)continue;VisuMZ[_0x2d50c3(0x346)][_0x2d50c3(0x57b)](_0x5220cc,_0x24cdca),VisuMZ[_0x2d50c3(0x346)]['Parse_Notetags_Prices'](_0x5220cc,_0x24cdca),VisuMZ[_0x2d50c3(0x346)][_0x2d50c3(0x4a1)](_0x5220cc,_0x24cdca),VisuMZ['ItemsEquipsCore'][_0x2d50c3(0x3ea)](_0x5220cc,_0x24cdca),VisuMZ[_0x2d50c3(0x346)][_0x2d50c3(0x2c6)](_0x5220cc,_0x24cdca);}else{const _0x42459d='USER\x20TP\x20GAIN';if(this[_0x2d50c3(0x105)][_0x2d50c3(0x453)]===0x0&&!this[_0x2d50c3(0x4d7)][_0x42459d])return![];const _0x5d3519=this[_0x2d50c3(0x2cc)]();this['drawItemKeyData'](_0x5d3519,_0x34bb02,_0x33c0e7,_0x3ba3d1,!![]);const _0x29e17b=this['getItemEffectsSelfTpGainText']();return this['_itemData'][_0x2d50c3(0x453)]>0x0?this['changeTextColor'](_0x66cd7b['powerUpColor']()):this[_0x2d50c3(0x36a)](_0x5e1966['powerDownColor']()),this['drawItemKeyData'](_0x29e17b,_0x240681,_0x30d4ff,_0x169e04,![],_0x2d50c3(0x4eb)),this[_0x2d50c3(0x4c9)](_0x406a82,_0x2e3181,_0x403b70),this[_0x2d50c3(0x57c)](),!![];}}}},Scene_Boot[_0x420e63(0x125)]['process_VisuMZ_ItemsEquipsCore_EquipSlots']=function(){const _0x50c6ca=_0x420e63;for(const _0x8a5401 of $dataClasses){if(!_0x8a5401)continue;VisuMZ['ItemsEquipsCore'][_0x50c6ca(0x333)](_0x8a5401);}},VisuMZ[_0x420e63(0x346)][_0x420e63(0x2d5)]=VisuMZ[_0x420e63(0x2d5)],VisuMZ['ParseClassNotetags']=function(_0xfb5202){const _0x27625a=_0x420e63;VisuMZ[_0x27625a(0x346)][_0x27625a(0x2d5)][_0x27625a(0x178)](this,_0xfb5202),VisuMZ['ItemsEquipsCore']['Parse_Notetags_EquipSlots'](_0xfb5202);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x4bc)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x420e63(0x4bc)]=function(_0x338b29){const _0x1393f4=_0x420e63;VisuMZ[_0x1393f4(0x346)][_0x1393f4(0x4bc)][_0x1393f4(0x178)](this,_0x338b29),VisuMZ[_0x1393f4(0x346)][_0x1393f4(0x526)](_0x338b29,$dataItems);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x12d)]=VisuMZ[_0x420e63(0x12d)],VisuMZ['ParseWeaponNotetags']=function(_0x4959af){const _0x59aba8=_0x420e63;VisuMZ[_0x59aba8(0x346)][_0x59aba8(0x12d)]['call'](this,_0x4959af),VisuMZ[_0x59aba8(0x346)][_0x59aba8(0x526)](_0x4959af,$dataWeapons);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x3a0)]=VisuMZ[_0x420e63(0x3a0)],VisuMZ[_0x420e63(0x3a0)]=function(_0x2108a5){const _0x142aa0=_0x420e63;VisuMZ[_0x142aa0(0x346)][_0x142aa0(0x3a0)]['call'](this,_0x2108a5),VisuMZ[_0x142aa0(0x346)]['Parse_Notetags_Batch'](_0x2108a5,$dataArmors);},VisuMZ['ItemsEquipsCore'][_0x420e63(0x333)]=function(_0x208ea1){const _0x8f486c=_0x420e63;_0x208ea1[_0x8f486c(0x4ca)]=[];if(!BattleManager['isBattleTest']()&&_0x208ea1[_0x8f486c(0x32d)][_0x8f486c(0x3d9)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x9a8aef=String(RegExp['$1'])[_0x8f486c(0x2b5)](/[\r\n]+/);for(const _0x5aeeed of _0x9a8aef){if('QvrCH'!==_0x8f486c(0x355)){const _0x3a8217=$dataSystem[_0x8f486c(0x3eb)][_0x8f486c(0x4c2)](_0x5aeeed[_0x8f486c(0x113)]());if(_0x3a8217>0x0)_0x208ea1[_0x8f486c(0x4ca)][_0x8f486c(0x3a5)](_0x3a8217);}else{const _0xb8e334=_0x8f486c(0xde);if(this[_0x8f486c(0x105)][_0x8f486c(0x2a3)]>=0x0&&!this[_0x8f486c(0x4d7)][_0xb8e334])return![];const _0x3f8ee1=this[_0x8f486c(0x42a)]();this[_0x8f486c(0xe4)](_0x3f8ee1,_0x244def,_0x50b412,_0x6f930a,!![]);const _0x4cb0f6=this[_0x8f486c(0x39e)]();return this[_0x8f486c(0x36a)](_0x5e22de[_0x8f486c(0x13b)]()),this[_0x8f486c(0xe4)](_0x4cb0f6,_0x452953,_0x1e8f9d,_0x279380,![],'right'),this[_0x8f486c(0x4c9)](_0x274ddd,_0x5c4725,_0x27ca9d),this[_0x8f486c(0x57c)](),!![];}}}else for(const _0x214b7f of $dataSystem[_0x8f486c(0x3eb)]){const _0x30bc48=$dataSystem['equipTypes'][_0x8f486c(0x4c2)](_0x214b7f[_0x8f486c(0x113)]());if(_0x30bc48>0x0)_0x208ea1[_0x8f486c(0x4ca)]['push'](_0x30bc48);}},VisuMZ[_0x420e63(0x346)][_0x420e63(0x526)]=function(_0x494774,_0x1d54c3){const _0x6627df=_0x420e63;VisuMZ[_0x6627df(0x346)]['Parse_Notetags_Category'](_0x494774,_0x1d54c3),VisuMZ['ItemsEquipsCore'][_0x6627df(0x14b)](_0x494774,_0x1d54c3),VisuMZ[_0x6627df(0x346)][_0x6627df(0x4a1)](_0x494774,_0x1d54c3),VisuMZ[_0x6627df(0x346)][_0x6627df(0x3ea)](_0x494774,_0x1d54c3),VisuMZ['ItemsEquipsCore'][_0x6627df(0x2c6)](_0x494774,_0x1d54c3);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x57b)]=function(_0x2157a6,_0x36fa8c){const _0x5b7d49=_0x420e63;_0x2157a6[_0x5b7d49(0x370)]=[];const _0x232c16=_0x2157a6[_0x5b7d49(0x32d)],_0x38c7e9=_0x232c16[_0x5b7d49(0x3d9)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x38c7e9)for(const _0x44be81 of _0x38c7e9){_0x44be81[_0x5b7d49(0x3d9)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x3d4e27=String(RegExp['$1'])[_0x5b7d49(0x27a)]()[_0x5b7d49(0x113)]()[_0x5b7d49(0x2b5)](',');for(const _0x54f827 of _0x3d4e27){if('zoCsF'===_0x5b7d49(0x11b)){if(_0x273eec[_0x5b7d49(0x220)](_0x3e69b8))_0x5b6f6f=_0x4295a9[_0x5b7d49(0x194)](_0x201092);return _0x5802f7[_0x5b7d49(0x346)][_0x5b7d49(0x55c)][_0x5b7d49(0x178)](this,_0x28597d);}else _0x2157a6[_0x5b7d49(0x370)][_0x5b7d49(0x3a5)](_0x54f827[_0x5b7d49(0x113)]());}}if(_0x232c16[_0x5b7d49(0x3d9)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x317fb8=RegExp['$1'][_0x5b7d49(0x2b5)](/[\r\n]+/);for(const _0xc4ef24 of _0x317fb8){_0x2157a6[_0x5b7d49(0x370)][_0x5b7d49(0x3a5)](_0xc4ef24[_0x5b7d49(0x27a)]()[_0x5b7d49(0x113)]());}}},VisuMZ[_0x420e63(0x346)][_0x420e63(0x14b)]=function(_0x38c432,_0x4134cf){const _0x2be02e=_0x420e63;_0x38c432['note'][_0x2be02e(0x3d9)](/<PRICE:[ ](\d+)>/i)&&(_0x38c432[_0x2be02e(0x47b)]=Number(RegExp['$1']));},VisuMZ[_0x420e63(0x346)][_0x420e63(0x4a1)]=function(_0x16412d,_0x303c61){const _0x11e86e=_0x420e63;if(_0x303c61===$dataItems)return;for(let _0x3aeb69=0x0;_0x3aeb69<0x8;_0x3aeb69++){const _0x3e5013=VisuMZ[_0x11e86e(0x346)][_0x11e86e(0x3c6)][_0x11e86e(0x10a)][_0x3aeb69];if(_0x16412d[_0x11e86e(0x32d)][_0x11e86e(0x3d9)](_0x3e5013)){if(_0x11e86e(0x20b)==='nuznH'){if(!_0x5dabd0[_0x11e86e(0x118)](_0x42b8b1))return![];}else _0x16412d[_0x11e86e(0x3b5)][_0x3aeb69]=parseInt(RegExp['$1']);}}},VisuMZ[_0x420e63(0x346)][_0x420e63(0x530)]={},VisuMZ[_0x420e63(0x346)]['Parse_Notetags_ParamJS']=function(_0x3077f1,_0x557aef){const _0x213386=_0x420e63;if(_0x557aef===$dataItems)return;if(_0x3077f1[_0x213386(0x32d)]['match'](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x3d9165=String(RegExp['$1']),_0x4c16cb=(_0x557aef===$dataWeapons?_0x213386(0x207):_0x213386(0x38f))[_0x213386(0x24b)](_0x3077f1['id']),_0x276b74=_0x213386(0x4d0)['format'](_0x3d9165);for(let _0x2354f4=0x0;_0x2354f4<0x8;_0x2354f4++){if(_0x3d9165[_0x213386(0x3d9)](VisuMZ[_0x213386(0x346)][_0x213386(0x3c6)]['BorderRegExp'][_0x2354f4])){if(_0x213386(0x12c)!==_0x213386(0x12c))return this[_0x213386(0x35a)]();else{const _0x185ffd=_0x213386(0x1bd)[_0x213386(0x24b)](_0x4c16cb,_0x2354f4);VisuMZ[_0x213386(0x346)][_0x213386(0x530)][_0x185ffd]=new Function(_0x213386(0x521),_0x213386(0x415),_0x276b74);}}}}},VisuMZ[_0x420e63(0x346)][_0x420e63(0x472)]={},VisuMZ[_0x420e63(0x346)][_0x420e63(0x2c6)]=function(_0x26f99d,_0x439aab){const _0x508102=_0x420e63;if(_0x439aab!==$dataItems)return;if(_0x26f99d['note'][_0x508102(0x3d9)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){if(_0x508102(0x4b4)!==_0x508102(0x4b4))_0x2383d3[_0x508102(0x125)][_0x508102(0x3a4)][_0x508102(0x178)](this,_0x1f9fd0);else{const _0x3741d7=String(RegExp['$1']),_0x2b8dde='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x508102(0x24b)](_0x3741d7);VisuMZ['ItemsEquipsCore'][_0x508102(0x472)][_0x26f99d['id']]=new Function(_0x508102(0x521),_0x2b8dde);}}},DataManager[_0x420e63(0x276)]=function(_0x201b25){const _0x15a614=_0x420e63;return this[_0x15a614(0x495)](_0x201b25)&&_0x201b25[_0x15a614(0x37d)]===0x2;},DataManager[_0x420e63(0x173)]=function(_0x571ae8){const _0x29f4d5=_0x420e63;if(!_0x571ae8)return 0x63;else return _0x571ae8['note']['match'](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this[_0x29f4d5(0x406)](_0x571ae8);},DataManager[_0x420e63(0x406)]=function(_0x261870){const _0x53aa74=_0x420e63;if(this['isItem'](_0x261870))return VisuMZ[_0x53aa74(0x346)][_0x53aa74(0x515)][_0x53aa74(0x2a2)][_0x53aa74(0x535)];else{if(this[_0x53aa74(0x520)](_0x261870))return VisuMZ[_0x53aa74(0x346)]['Settings']['ItemScene'][_0x53aa74(0x562)];else{if(this['isArmor'](_0x261870)){if('fxmRm'!==_0x53aa74(0x3f1))return VisuMZ[_0x53aa74(0x346)][_0x53aa74(0x515)][_0x53aa74(0x2a2)]['MaxArmors'];else{const _0x421a78=_0x56d41c(_0x16e97f['$1']);_0x421a78!==_0x45019f[_0x5b94a8][_0x53aa74(0x4f9)]&&(_0x92f7fd(_0x53aa74(0x292)['format'](_0x4a2a8a,_0x421a78)),_0x2a26be[_0x53aa74(0xca)]());}}}}},DataManager[_0x420e63(0x4d6)]=function(_0x506db8){const _0x10e9f1=_0x420e63;_0x506db8=_0x506db8[_0x10e9f1(0x27a)]()[_0x10e9f1(0x113)](),this[_0x10e9f1(0x3df)]=this[_0x10e9f1(0x3df)]||{};if(this[_0x10e9f1(0x3df)][_0x506db8])return this[_0x10e9f1(0x3df)][_0x506db8];for(const _0x290a75 of $dataItems){if('akhCo'!==_0x10e9f1(0x1b7))this[_0x10e9f1(0x119)]['hide']();else{if(!_0x290a75)continue;this[_0x10e9f1(0x3df)][_0x290a75['name'][_0x10e9f1(0x27a)]()[_0x10e9f1(0x113)]()]=_0x290a75['id'];}}return this[_0x10e9f1(0x3df)][_0x506db8]||0x0;},DataManager[_0x420e63(0x3dc)]=function(_0x4f5056){const _0x1274ed=_0x420e63;_0x4f5056=_0x4f5056[_0x1274ed(0x27a)]()[_0x1274ed(0x113)](),this[_0x1274ed(0x367)]=this[_0x1274ed(0x367)]||{};if(this[_0x1274ed(0x367)][_0x4f5056])return this[_0x1274ed(0x367)][_0x4f5056];for(const _0x1f2b62 of $dataWeapons){if(!_0x1f2b62)continue;this[_0x1274ed(0x367)][_0x1f2b62[_0x1274ed(0x550)][_0x1274ed(0x27a)]()[_0x1274ed(0x113)]()]=_0x1f2b62['id'];}return this['_weaponIDs'][_0x4f5056]||0x0;},DataManager[_0x420e63(0x52d)]=function(_0x8d23b2){const _0x49786d=_0x420e63;_0x8d23b2=_0x8d23b2['toUpperCase']()[_0x49786d(0x113)](),this[_0x49786d(0x54b)]=this['_armorIDs']||{};if(this['_armorIDs'][_0x8d23b2])return this[_0x49786d(0x54b)][_0x8d23b2];for(const _0x405d8d of $dataArmors){if(!_0x405d8d)continue;this[_0x49786d(0x54b)][_0x405d8d['name'][_0x49786d(0x27a)]()['trim']()]=_0x405d8d['id'];}return this[_0x49786d(0x54b)][_0x8d23b2]||0x0;},VisuMZ[_0x420e63(0x346)][_0x420e63(0x4cc)]=function(){const _0xa5428d=_0x420e63;VisuMZ[_0xa5428d(0x346)][_0xa5428d(0x181)]($dataItems),VisuMZ[_0xa5428d(0x346)][_0xa5428d(0x181)]($dataWeapons),VisuMZ[_0xa5428d(0x346)][_0xa5428d(0x181)]($dataArmors);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x181)]=function(_0x2cf943){const _0x36adde=_0x420e63;for(const _0x5aac37 of _0x2cf943){if(_0x36adde(0x182)!==_0x36adde(0x21a)){if(!_0x5aac37)continue;if(!DataManager[_0x36adde(0x220)](_0x5aac37))continue;const _0x5f32f6=DataManager[_0x36adde(0x194)](_0x5aac37),_0x511d12=['name',_0x36adde(0x23e),_0x36adde(0x56c)];for(const _0x57041d of _0x511d12){if(_0x36adde(0x13c)!=='HWqXl')_0x5aac37[_0x57041d]=_0x5f32f6[_0x57041d];else{if(!this[_0x36adde(0x2de)]())return;const _0x386bf7=this[_0x36adde(0x531)](),_0x5dae9d=_0x549b70[_0x36adde(0x346)]['Settings'][_0x36adde(0x139)]['CmdIconEquip'],_0x5c8213=_0x386bf7==='text'?_0xb2f94d[_0x36adde(0x18a)]:_0x36adde(0x3c4)[_0x36adde(0x24b)](_0x5dae9d,_0x41a68a[_0x36adde(0x18a)]),_0x488c6a=this[_0x36adde(0x234)]();this[_0x36adde(0x2cb)](_0x5c8213,'equip',_0x488c6a);}}}else{_0x110175[_0x36adde(0x3ff)]&&this['drawIcon'](_0x47a870,_0x51eddd['x'],_0x3245f0['y']+0x2);_0x436d0c['x']+=_0x40b37f[_0x36adde(0x2fd)](_0xd33575[_0x36adde(0x413)]*this['fontSizeRatio']());if(this['fontSizeRatio']()===0x1)_0x374cb0['x']+=0x4;}}},DataManager[_0x420e63(0x220)]=function(_0x3b26ee){const _0x3599d3=_0x420e63;if(!_0x3b26ee)return![];if(!_0x3b26ee[_0x3599d3(0x32d)])return![];return _0x3b26ee&&_0x3b26ee[_0x3599d3(0x32d)][_0x3599d3(0x3d9)](/<PROXY:[ ](.*)>/i);},DataManager[_0x420e63(0x194)]=function(_0x214d00){const _0x475200=_0x420e63;return this[_0x475200(0x220)](_0x214d00)?(_0x214d00=this['switchProxyItem'](_0x214d00)||_0x214d00,this[_0x475200(0x220)](_0x214d00)?this[_0x475200(0x194)](_0x214d00):_0x214d00):_0x214d00;},DataManager['switchProxyItem']=function(_0x19ce15){const _0x3f3a98=_0x420e63;_0x19ce15['note'][_0x3f3a98(0x3d9)](/<PROXY:[ ](.*)>/i);const _0x2487aa=RegExp['$1'][_0x3f3a98(0x113)](),_0x110b96=/^\d+$/[_0x3f3a98(0x189)](_0x2487aa);if(this[_0x3f3a98(0x495)](_0x19ce15)){if(_0x3f3a98(0x3fe)===_0x3f3a98(0x459))return _0x3f3a98(0x480);else{const _0x2497a6=_0x110b96?Number(RegExp['$1']):DataManager[_0x3f3a98(0x4d6)](_0x2487aa);return $dataItems[_0x2497a6]||_0x19ce15;}}else{if(this['isWeapon'](_0x19ce15)){if('lCXUt'===_0x3f3a98(0x421))return this[_0x3f3a98(0x3f3)]()?this[_0x3f3a98(0x507)]():_0xd31aa9['ItemsEquipsCore']['Settings'][_0x3f3a98(0x139)][_0x3f3a98(0x3b2)];else{const _0x2e44d2=_0x110b96?Number(RegExp['$1']):DataManager[_0x3f3a98(0x3dc)](_0x2487aa);return $dataWeapons[_0x2e44d2]||_0x19ce15;}}else{if(this['isArmor'](_0x19ce15)){const _0x114fe3=_0x110b96?Number(RegExp['$1']):DataManager[_0x3f3a98(0x52d)](_0x2487aa);return $dataArmors[_0x114fe3]||_0x19ce15;}}}return _0x19ce15;},VisuMZ[_0x420e63(0x346)][_0x420e63(0x4cd)]=Window_ItemList[_0x420e63(0x125)][_0x420e63(0x521)],Window_ItemList[_0x420e63(0x125)][_0x420e63(0x521)]=function(){const _0x166213=_0x420e63;if($gameTemp['_bypassProxy'])return VisuMZ[_0x166213(0x346)][_0x166213(0x4cd)]['call'](this);return DataManager['getProxyItem'](VisuMZ[_0x166213(0x346)][_0x166213(0x4cd)][_0x166213(0x178)](this));},Window_ItemList[_0x420e63(0x125)]['proxyItem']=function(){const _0x534350=_0x420e63;return VisuMZ[_0x534350(0x346)][_0x534350(0x4cd)][_0x534350(0x178)](this);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x4aa)]=Window_ShopBuy[_0x420e63(0x125)][_0x420e63(0x521)],Window_ShopBuy['prototype'][_0x420e63(0x521)]=function(){const _0x51d444=_0x420e63;if($gameTemp[_0x51d444(0x163)])return VisuMZ[_0x51d444(0x346)][_0x51d444(0x4aa)][_0x51d444(0x178)](this);return DataManager[_0x51d444(0x194)](VisuMZ[_0x51d444(0x346)]['Window_ShopBuy_item'][_0x51d444(0x178)](this));},Window_ShopBuy[_0x420e63(0x125)]['proxyItem']=function(){const _0x23da92=_0x420e63;return VisuMZ[_0x23da92(0x346)]['Window_ShopBuy_item'][_0x23da92(0x178)](this);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x44e)]=Window_ShopStatus['prototype'][_0x420e63(0x461)],Window_ShopStatus[_0x420e63(0x125)]['setItem']=function(_0x5bb940){const _0x1a4d4c=_0x420e63;_0x5bb940=DataManager[_0x1a4d4c(0x194)](_0x5bb940),VisuMZ[_0x1a4d4c(0x346)][_0x1a4d4c(0x44e)][_0x1a4d4c(0x178)](this,_0x5bb940);},VisuMZ['ItemsEquipsCore'][_0x420e63(0x18b)]=Game_Item[_0x420e63(0x125)]['setObject'],Game_Item['prototype'][_0x420e63(0x1db)]=function(_0x1e001b){const _0x46830b=_0x420e63;if(DataManager[_0x46830b(0x220)](_0x1e001b))return;VisuMZ[_0x46830b(0x346)][_0x46830b(0x18b)][_0x46830b(0x178)](this,_0x1e001b);},DataManager[_0x420e63(0x162)]=function(_0x3fbc76){const _0x4fcdbb=_0x420e63;if(!this[_0x4fcdbb(0x272)](_0x3fbc76))return![];const _0x2946d9=_0x3fbc76[_0x4fcdbb(0x32d)];if(!_0x2946d9)return![];if(_0x2946d9[_0x4fcdbb(0x3d9)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x2946d9[_0x4fcdbb(0x3d9)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x2946d9[_0x4fcdbb(0x3d9)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x2946d9['match'](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x420e63(0xf8)]=function(_0x499ac8){const _0x422335=_0x420e63;if(!this['isArtifact'](_0x499ac8))return![];const _0x25bc8a=_0x499ac8['note'];if(!_0x25bc8a)return![];if(_0x25bc8a[_0x422335(0x3d9)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x25bc8a['match'](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x420e63(0x2c1)]=function(_0x3044fa){const _0x183fa1=_0x420e63;if(!this[_0x183fa1(0x162)](_0x3044fa))return![];const _0x35d74d=_0x3044fa[_0x183fa1(0x32d)];if(!_0x35d74d)return![];if(_0x35d74d[_0x183fa1(0x3d9)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x35d74d[_0x183fa1(0x3d9)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x420e63(0x266)]=function(_0x39989e){const _0x4e1727=_0x420e63;if(!this[_0x4e1727(0x162)](_0x39989e))return![];const _0x235de9=_0x39989e[_0x4e1727(0x32d)];if(!_0x235de9)return![];if(_0x235de9[_0x4e1727(0x3d9)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x235de9['match'](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},VisuMZ[_0x420e63(0x346)][_0x420e63(0x264)]=Game_BattlerBase['prototype'][_0x420e63(0x44f)],Game_BattlerBase[_0x420e63(0x125)][_0x420e63(0x44f)]=function(_0x163427){const _0x3aebef=_0x420e63;if(DataManager[_0x3aebef(0x162)](_0x163427))return![];return VisuMZ['ItemsEquipsCore'][_0x3aebef(0x264)][_0x3aebef(0x178)](this,_0x163427);},VisuMZ[_0x420e63(0x346)]['Game_BattlerBase_param_artifact']=Game_BattlerBase[_0x420e63(0x125)][_0x420e63(0x385)],Game_BattlerBase[_0x420e63(0x125)][_0x420e63(0x385)]=function(_0x18c73a){const _0x496d38=_0x420e63;this[_0x496d38(0x411)]=!![];const _0x109a0e=VisuMZ[_0x496d38(0x346)][_0x496d38(0x4a5)]['call'](this,_0x18c73a);return this[_0x496d38(0x411)]=undefined,_0x109a0e;},VisuMZ[_0x420e63(0x346)][_0x420e63(0x17a)]=Game_Actor[_0x420e63(0x125)][_0x420e63(0x13d)],Game_Actor[_0x420e63(0x125)]['traitObjects']=function(){const _0x462426=_0x420e63;this[_0x462426(0x2e3)]=!![];const _0x2c402d=VisuMZ[_0x462426(0x346)][_0x462426(0x17a)][_0x462426(0x178)](this);return this['_allowArtifactTraitObjects']=undefined,_0x2c402d;},VisuMZ[_0x420e63(0x346)][_0x420e63(0x1a4)]=Game_Actor[_0x420e63(0x125)][_0x420e63(0x378)],Game_Actor[_0x420e63(0x125)][_0x420e63(0x378)]=function(){const _0x58ff1e=_0x420e63,_0x125dfd=VisuMZ['ItemsEquipsCore'][_0x58ff1e(0x1a4)][_0x58ff1e(0x178)](this);if(this[_0x58ff1e(0x2e3)]||this[_0x58ff1e(0x411)]){if(_0x58ff1e(0x467)!==_0x58ff1e(0x3da)){const _0x5199f9=_0x125dfd['concat']($gameParty['partyArtifacts']());return _0x5199f9;}else{const _0x3fd828=this[_0x58ff1e(0x2ab)](_0xdb9bb0);if(_0x3fd828[_0x58ff1e(0x3d9)](/\\I\[(\d+)\]/i)){const _0x3fd38f=this['itemLineRect'](_0x294127),_0x4e18e7=this['textSizeEx'](_0x3fd828)[_0x58ff1e(0x4b7)];return _0x4e18e7<=_0x3fd38f['width']?_0x58ff1e(0x3e8):_0x58ff1e(0x1fd);}}}else return _0x125dfd;},VisuMZ['ItemsEquipsCore'][_0x420e63(0x1c6)]=Game_BattlerBase[_0x420e63(0x125)]['paramPlus'],Game_BattlerBase[_0x420e63(0x125)][_0x420e63(0x316)]=function(_0x1e2901){const _0xb056ad=_0x420e63;let _0x594eac=VisuMZ[_0xb056ad(0x346)][_0xb056ad(0x1c6)]['call'](this,_0x1e2901);if(this[_0xb056ad(0xef)]===Game_Enemy)for(const _0x9dde19 of $gameParty['troopArtifacts']()){if('YTZdt'==='YTZdt'){if(_0x9dde19)_0x594eac+=_0x9dde19[_0xb056ad(0x3b5)][_0x1e2901];}else{const _0x433f8d=_0x384dc1[_0xb056ad(0x125)][_0xb056ad(0x3f6)](0x1,_0x38f731);if(_0x433f8d>0x0){_0x121afb+='\x5cI[%1]'[_0xb056ad(0x24b)](_0x433f8d),_0x445c83++;if(_0x55f94f>=_0x18cc98)return _0x5a6ded;}}}return _0x594eac;},VisuMZ['ItemsEquipsCore']['Game_Enemy_traitObjects_artifact']=Game_Enemy[_0x420e63(0x125)][_0x420e63(0x13d)],Game_Enemy[_0x420e63(0x125)][_0x420e63(0x13d)]=function(){const _0x35937b=_0x420e63;let _0x46129f=VisuMZ['ItemsEquipsCore'][_0x35937b(0x3af)]['call'](this);return _0x46129f[_0x35937b(0x18d)]($gameParty[_0x35937b(0x20f)]());},VisuMZ['ItemsEquipsCore']['Game_Party_gainItem_artifact']=Game_Party['prototype']['gainItem'],Game_Party[_0x420e63(0x125)][_0x420e63(0x565)]=function(_0x32e06f,_0x35df3e,_0x1effda){const _0x44c2c5=_0x420e63;VisuMZ[_0x44c2c5(0x346)][_0x44c2c5(0x3db)][_0x44c2c5(0x178)](this,_0x32e06f,_0x35df3e,_0x1effda);if(DataManager[_0x44c2c5(0x162)](_0x32e06f)){let _0x121a2f=$gameParty[_0x44c2c5(0x36b)]();if($gameParty[_0x44c2c5(0x25b)]())_0x121a2f=_0x121a2f[_0x44c2c5(0x18d)]($gameTroop[_0x44c2c5(0x289)]());for(const _0x2a1bdc of $gameTroop[_0x44c2c5(0x289)]()){if(!_0x2a1bdc)continue;_0x2a1bdc[_0x44c2c5(0x450)]={};}}},Game_Party['prototype'][_0x420e63(0x330)]=function(){const _0x9e3c9d=_0x420e63;let _0x26e4c2=[];for(const _0x1fcbf4 of this[_0x9e3c9d(0x10d)]()){if('fgpGz'!==_0x9e3c9d(0x359)){if(!_0x46da03)return![];if(!_0x3fc75d[_0x9e3c9d(0x346)]['Game_BattlerBase_meetsItemConditions'][_0x9e3c9d(0x178)](this,_0x40206f))return![];if(!this[_0x9e3c9d(0x483)](_0x580eb3))return![];if(!this[_0x9e3c9d(0x471)](_0x292062))return![];return!![];}else{if(!_0x1fcbf4)continue;if(!DataManager[_0x9e3c9d(0x162)](_0x1fcbf4))continue;if(!DataManager[_0x9e3c9d(0x2c1)](_0x1fcbf4))continue;let _0x12d824=0x1;if(DataManager[_0x9e3c9d(0xf8)](_0x1fcbf4))_0x12d824=this[_0x9e3c9d(0x3e1)](_0x1fcbf4);while(_0x12d824--)_0x26e4c2[_0x9e3c9d(0x3a5)](_0x1fcbf4);}}return _0x26e4c2;},Game_Party['prototype'][_0x420e63(0x20f)]=function(){const _0x41980f=_0x420e63;let _0x254a5b=[];for(const _0x3ae246 of this[_0x41980f(0x10d)]()){if(!_0x3ae246)continue;if(!DataManager[_0x41980f(0x162)](_0x3ae246))continue;if(!DataManager[_0x41980f(0x266)](_0x3ae246))continue;let _0x4cb805=0x1;if(DataManager[_0x41980f(0xf8)](_0x3ae246))_0x4cb805=this[_0x41980f(0x3e1)](_0x3ae246);while(_0x4cb805--)_0x254a5b[_0x41980f(0x3a5)](_0x3ae246);}return _0x254a5b;},Game_Party['prototype'][_0x420e63(0x4d8)]=function(){const _0x13dbde=_0x420e63;return this['partyArtifacts']()[_0x13dbde(0x18d)](this[_0x13dbde(0x20f)]());},VisuMZ['ItemsEquipsCore'][_0x420e63(0x3c3)]=Game_Party[_0x420e63(0x125)][_0x420e63(0x512)],Game_Party['prototype'][_0x420e63(0x512)]=function(){const _0x9a7674=_0x420e63;VisuMZ[_0x9a7674(0x346)]['Game_Party_setupBattleTestItems_artifact'][_0x9a7674(0x178)](this),this[_0x9a7674(0xf2)]();},Game_Party[_0x420e63(0x125)][_0x420e63(0xf2)]=function(){const _0x1732f2=_0x420e63,_0x214544=$gameParty['armors']()[_0x1732f2(0x4e0)](_0x5ec74a=>DataManager[_0x1732f2(0x162)](_0x5ec74a));for(const _0x4f8c0b of _0x214544){const _0x565624=this[_0x1732f2(0x3e1)](_0x4f8c0b);if(_0x565624)this[_0x1732f2(0xfe)](_0x4f8c0b,_0x565624);}},ColorManager[_0x420e63(0x297)]=function(_0x1a1c72){const _0x4c8d6f=_0x420e63;if(!_0x1a1c72)return this['normalColor']();else{if(_0x1a1c72[_0x4c8d6f(0x32d)][_0x4c8d6f(0x3d9)](/<COLOR:[ ](\d+)>/i))return this[_0x4c8d6f(0x4e2)](Number(RegExp['$1'])[_0x4c8d6f(0x4cf)](0x0,0x1f));else return _0x1a1c72[_0x4c8d6f(0x32d)]['match'](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this['normalColor']();}},ColorManager[_0x420e63(0x360)]=function(_0x13d0dd){const _0x409325=_0x420e63;return _0x13d0dd=String(_0x13d0dd),_0x13d0dd[_0x409325(0x3d9)](/#(.*)/i)?_0x409325(0x53a)[_0x409325(0x24b)](String(RegExp['$1'])):this[_0x409325(0x4e2)](Number(_0x13d0dd));},SceneManager[_0x420e63(0x2ec)]=function(){const _0x1a3ac0=_0x420e63;return this[_0x1a3ac0(0x2a7)]&&this['_scene'][_0x1a3ac0(0xef)]===Scene_Shop;},Game_Temp[_0x420e63(0x125)][_0x420e63(0x2bd)]=function(){const _0x8e202d=_0x420e63;if(this[_0x8e202d(0x4a2)])return![];return VisuMZ[_0x8e202d(0x346)]['Settings'][_0x8e202d(0x379)]['Enable'];},VisuMZ[_0x420e63(0x3c0)]=VisuMZ[_0x420e63(0x346)][_0x420e63(0x515)]['StatusWindow'][_0x420e63(0x4f0)],VisuMZ[_0x420e63(0x346)][_0x420e63(0x42f)]=Game_BattlerBase[_0x420e63(0x125)]['param'],Game_BattlerBase[_0x420e63(0x125)][_0x420e63(0x385)]=function(_0x709b2f){const _0x181717=_0x420e63;if(this[_0x181717(0x161)])return'mskpb'===_0x181717(0x33e)?this[_0x181717(0x2f5)](_0x55d6ec):this[_0x181717(0x43d)]?VisuMZ[_0x181717(0x3c0)]:0x1;else{if(_0x181717(0x2d6)===_0x181717(0x2d6))return VisuMZ[_0x181717(0x346)][_0x181717(0x42f)][_0x181717(0x178)](this,_0x709b2f);else{_0x1038eb=this[_0x181717(0x382)](_0x558fa6);const _0x5de22c=this[_0x181717(0x4ca)]();this[_0x181717(0x122)]=[];for(let _0x351a56=0x0;_0x351a56<_0x5de22c[_0x181717(0x20e)];_0x351a56++){this[_0x181717(0x122)][_0x351a56]=new _0x2ba51a();}for(let _0x3c7ccc=0x0;_0x3c7ccc<_0x5de22c[_0x181717(0x20e)];_0x3c7ccc++){const _0x238432=_0x5de22c[_0x3c7ccc],_0x545bed=this[_0x181717(0x559)](_0x120378,_0x238432);if(this['canEquip'](_0x545bed))this[_0x181717(0x122)][_0x3c7ccc][_0x181717(0x1db)](_0x545bed);}this['releaseUnequippableItems'](!![]),this[_0x181717(0x429)]();}}},VisuMZ[_0x420e63(0x346)][_0x420e63(0x50f)]=Game_BattlerBase[_0x420e63(0x125)]['meetsItemConditions'],Game_BattlerBase[_0x420e63(0x125)][_0x420e63(0x2da)]=function(_0x12f81){const _0x24d902=_0x420e63;if(!_0x12f81)return![];if(!VisuMZ[_0x24d902(0x346)][_0x24d902(0x50f)][_0x24d902(0x178)](this,_0x12f81))return![];if(!this[_0x24d902(0x483)](_0x12f81))return![];if(!this[_0x24d902(0x471)](_0x12f81))return![];return!![];},Game_BattlerBase[_0x420e63(0x125)][_0x420e63(0x483)]=function(_0x1114da){if(!this['checkItemConditionsSwitchNotetags'](_0x1114da))return![];return!![];},Game_BattlerBase[_0x420e63(0x125)][_0x420e63(0x273)]=function(_0x34c210){const _0x76060e=_0x420e63,_0x1366d0=_0x34c210[_0x76060e(0x32d)];if(_0x1366d0[_0x76060e(0x3d9)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('iLGPa'!==_0x76060e(0x2df))_0x27af3a[_0x76060e(0x346)][_0x76060e(0x34a)]['call'](this,_0x2893a3),this[_0x76060e(0xe8)](_0x149405);else{const _0x507462=JSON[_0x76060e(0x3fd)]('['+RegExp['$1'][_0x76060e(0x3d9)](/\d+/g)+']');for(const _0x23199d of _0x507462){if(_0x76060e(0x398)!==_0x76060e(0x398))_0x43a3dc[_0x76060e(0x346)][_0x76060e(0x3a0)][_0x76060e(0x178)](this,_0x2044df),_0x2e5d24[_0x76060e(0x346)]['Parse_Notetags_Batch'](_0x379584,_0x18f04b);else{if(!$gameSwitches[_0x76060e(0x118)](_0x23199d))return![];}}return!![];}}if(_0x1366d0[_0x76060e(0x3d9)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3bd1f4=JSON[_0x76060e(0x3fd)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5816ee of _0x3bd1f4){if('RKTLi'===_0x76060e(0x3d1))return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x76060e(0x4be)]():_0x5d6eda[_0x76060e(0x346)][_0x76060e(0x1dc)][_0x76060e(0x178)](this);else{if(!$gameSwitches[_0x76060e(0x118)](_0x5816ee))return![];}}return!![];}if(_0x1366d0[_0x76060e(0x3d9)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x76060e(0x484)!==_0x76060e(0x484)){const _0xf3acaf=this['getItemSpeedLabel']();this[_0x76060e(0xe4)](_0xf3acaf,_0x451193,_0x1a9761,_0x5869b8,!![]);const _0x2e7bcb=this[_0x76060e(0x1f8)]();return this['drawItemKeyData'](_0x2e7bcb,_0x1f24ec,_0x1ba317,_0x413ef7,![],_0x76060e(0x4eb)),this['drawItemDarkRect'](_0x2567ad,_0xf12ead,_0x44bcef),this[_0x76060e(0x57c)](),!![];}else{const _0x178323=JSON[_0x76060e(0x3fd)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5703c6 of _0x178323){if($gameSwitches[_0x76060e(0x118)](_0x5703c6))return!![];}return![];}}if(_0x1366d0['match'](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x76060e(0x485)!=='mcKFD'){let _0x461cb6=this[_0x76060e(0x4ca)]()[_0x76060e(0x20e)];while(this[_0x76060e(0x122)][_0x76060e(0x20e)]>_0x461cb6){const _0x146178=this[_0x76060e(0x122)][this['_equips'][_0x76060e(0x20e)]-0x1];_0x146178&&_0x146178[_0x76060e(0x1c8)]()&&_0x1a63f7[_0x76060e(0x565)](_0x146178[_0x76060e(0x1c8)](),0x1),this[_0x76060e(0x122)][_0x76060e(0x497)]();}while(_0x461cb6>this[_0x76060e(0x122)]['length']){this[_0x76060e(0x122)]['push'](new _0x2a75af());}}else{const _0x51655b=JSON[_0x76060e(0x3fd)]('['+RegExp['$1'][_0x76060e(0x3d9)](/\d+/g)+']');for(const _0x579d04 of _0x51655b){if(_0x76060e(0xea)===_0x76060e(0xea)){if(!$gameSwitches[_0x76060e(0x118)](_0x579d04))return!![];}else _0x172a0c=_0x76060e(0x212)[_0x76060e(0x24b)](_0x9aec92['id']);}return![];}}if(_0x1366d0[_0x76060e(0x3d9)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x76060e(0x128)!==_0x76060e(0x3de)){const _0x49bc82=JSON[_0x76060e(0x3fd)]('['+RegExp['$1'][_0x76060e(0x3d9)](/\d+/g)+']');for(const _0x1a1835 of _0x49bc82){if('HRvHT'==='cVvpS')return 0x0;else{if(!$gameSwitches[_0x76060e(0x118)](_0x1a1835))return!![];}}return![];}else{const _0x2371fd=_0x4b4300[_0x76060e(0x10d)]()['filter'](_0x2b45d8=>_0x426401['isArtifact'](_0x2b45d8));for(const _0x12c739 of _0x2371fd){const _0x3054c5=this[_0x76060e(0x3e1)](_0x12c739);if(_0x3054c5)this[_0x76060e(0xfe)](_0x12c739,_0x3054c5);}}}if(_0x1366d0['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5eccf1=JSON[_0x76060e(0x3fd)]('['+RegExp['$1'][_0x76060e(0x3d9)](/\d+/g)+']');for(const _0x87e796 of _0x5eccf1){if(_0x76060e(0x2ea)!==_0x76060e(0x464)){if($gameSwitches[_0x76060e(0x118)](_0x87e796))return![];}else _0x4ebad8[_0x76060e(0x346)][_0x76060e(0x2c0)][_0x76060e(0x178)](this),this['isUseModernControls']()&&this[_0x76060e(0x1d1)](),this[_0x76060e(0x104)]()&&this[_0x76060e(0x2fa)]();}return!![];}return!![];},Game_BattlerBase[_0x420e63(0x125)][_0x420e63(0x471)]=function(_0x1fc0ba){const _0xcee66b=_0x420e63,_0x4e2a2d=_0x1fc0ba[_0xcee66b(0x32d)],_0x3801ab=VisuMZ[_0xcee66b(0x346)]['itemEnableJS'];if(_0x3801ab[_0x1fc0ba['id']])return _0x3801ab[_0x1fc0ba['id']][_0xcee66b(0x178)](this,_0x1fc0ba);else{if('XjucY'!==_0xcee66b(0x348))return!![];else this[_0xcee66b(0x119)]['hide'](),this[_0xcee66b(0x1a1)][_0xcee66b(0x4ae)](),this[_0xcee66b(0x1a1)][_0xcee66b(0x120)](),this[_0xcee66b(0x291)][_0xcee66b(0x4ae)]();}},Game_Actor[_0x420e63(0x125)][_0x420e63(0x444)]=function(_0x952162){const _0x2bf207=_0x420e63;_0x952162=this['convertInitEquipsToItems'](_0x952162);const _0x3ac65f=this[_0x2bf207(0x4ca)]();this['_equips']=[];for(let _0x14df2b=0x0;_0x14df2b<_0x3ac65f[_0x2bf207(0x20e)];_0x14df2b++){if('npWLM'==='npWLM')this[_0x2bf207(0x122)][_0x14df2b]=new Game_Item();else for(const _0x14274d of _0xcdf684){_0x14274d[_0x2bf207(0x3d9)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x35ae90=_0x593957(_0x4ac342['$1'])['toUpperCase']()['trim']()[_0x2bf207(0x2b5)](',');for(const _0x443a0d of _0x35ae90){_0xa63581['categories']['push'](_0x443a0d[_0x2bf207(0x113)]());}}}for(let _0x3eb77c=0x0;_0x3eb77c<_0x3ac65f[_0x2bf207(0x20e)];_0x3eb77c++){if(_0x2bf207(0x2d3)===_0x2bf207(0x2d3)){const _0x15a669=_0x3ac65f[_0x3eb77c],_0x15dc54=this['getMatchingInitEquip'](_0x952162,_0x15a669);if(this[_0x2bf207(0x44f)](_0x15dc54))this[_0x2bf207(0x122)][_0x3eb77c]['setObject'](_0x15dc54);}else{const _0x336270=_0x2d1b58(_0x197721['$1'])||0x1;if(_0x4a90fb>=_0x336270)return!![];}}this[_0x2bf207(0x191)](!![]),this[_0x2bf207(0x429)]();},Game_Actor['prototype'][_0x420e63(0x382)]=function(_0x350c17){const _0x4a4b3a=_0x420e63,_0x10ff59=[];for(let _0x430be9=0x0;_0x430be9<_0x350c17[_0x4a4b3a(0x20e)];_0x430be9++){const _0x25a525=_0x350c17[_0x430be9];if(_0x25a525<=0x0)continue;const _0xa13260=$dataSystem[_0x4a4b3a(0x3eb)][_0x430be9+0x1];if(_0xa13260===$dataSystem['equipTypes'][0x1]||_0x430be9===0x1&&this['isDualWield']()){if('BFBbR'===_0x4a4b3a(0x168)){_0x5660f0['playEquip']();const _0xc88fc3=_0x3bc67b[_0x4a4b3a(0x2a7)][_0x4a4b3a(0x150)];_0xc88fc3['changeEquip'](this[_0x4a4b3a(0x236)](),null),this['refresh'](),this['_itemWindow'][_0x4a4b3a(0x429)](),this['callUpdateHelp']();const _0x78ac07=_0x2fd130[_0x4a4b3a(0x2a7)][_0x4a4b3a(0x291)];if(_0x78ac07)_0x78ac07['refresh']();}else _0x10ff59[_0x4a4b3a(0x3a5)]($dataWeapons[_0x25a525]);}else{if(BattleManager[_0x4a4b3a(0x169)]()){if(_0x4a4b3a(0x2d2)===_0x4a4b3a(0x2d2)){const _0xf364ee=$dataArmors[_0x25a525];_0xf364ee&&_0xf364ee[_0x4a4b3a(0x29e)]===_0x430be9+0x1&&_0x10ff59['push'](_0xf364ee);}else{const _0x42e85f='TP\x20DAMAGE';if(this[_0x4a4b3a(0x4d7)][_0x42e85f])return this['_customItemInfo'][_0x42e85f];let _0x269c8a='';return _0x269c8a+='%1'['format'](this[_0x4a4b3a(0x105)][_0x4a4b3a(0x2a3)]),_0x269c8a;}}else{const _0x3488f5=$dataArmors[_0x25a525];_0x3488f5&&_0x3488f5[_0x4a4b3a(0x29e)]===_0x430be9+0x1&&('MqigE'!=='MqigE'?_0x531d47=_0x4a4b3a(0x1c9)[_0x4a4b3a(0x24b)](_0x4e30ef['id']):_0x10ff59[_0x4a4b3a(0x3a5)](_0x3488f5));}}}return _0x10ff59;},Game_Actor[_0x420e63(0x125)][_0x420e63(0x559)]=function(_0x19505b,_0xbe3d8a){const _0x2fe2f3=_0x420e63;for(const _0x41a04d of _0x19505b){if(_0x2fe2f3(0x4fa)===_0x2fe2f3(0x4fa)){if(!_0x41a04d)continue;if(_0x41a04d['etypeId']===_0xbe3d8a)return _0x19505b[_0x2fe2f3(0x1f3)](_0x19505b[_0x2fe2f3(0x4c2)](_0x41a04d),0x1),_0x41a04d;}else{_0x3792a4[_0x2fe2f3(0x455)]()&&this[_0x2fe2f3(0x134)](!![]);if(_0x2682e3['isClicked']())this[_0x2fe2f3(0x46f)]();else _0x3b5538[_0x2fe2f3(0x2f1)]()&&this[_0x2fe2f3(0x1d0)]();}}return null;},Game_Actor['prototype'][_0x420e63(0x4ca)]=function(){const _0x53943c=_0x420e63,_0x24be59=JsonEx[_0x53943c(0x4e5)](this[_0x53943c(0xd1)]||this[_0x53943c(0x340)]()[_0x53943c(0x4ca)]);if(_0x24be59[_0x53943c(0x20e)]>=0x2&&this[_0x53943c(0x34f)]())_0x24be59[0x1]=0x1;return _0x24be59;},Game_Actor['prototype'][_0x420e63(0x14d)]=function(_0x3a7948){const _0x369ee1=_0x420e63;_0x3a7948['remove'](0x0),_0x3a7948[_0x369ee1(0x329)](-0x1),this[_0x369ee1(0xd1)]=_0x3a7948,this[_0x369ee1(0x429)](),this[_0x369ee1(0x3f0)]();},Game_Actor[_0x420e63(0x125)][_0x420e63(0x1d9)]=function(){const _0x4bce12=_0x420e63;this[_0x4bce12(0xd1)]=undefined,this[_0x4bce12(0x429)](),this[_0x4bce12(0x3f0)]();},Game_Actor[_0x420e63(0x125)][_0x420e63(0x3f0)]=function(){const _0x3007e4=_0x420e63;let _0x53de9e=this[_0x3007e4(0x4ca)]()['length'];while(this[_0x3007e4(0x122)][_0x3007e4(0x20e)]>_0x53de9e){const _0x53b9ff=this[_0x3007e4(0x122)][this[_0x3007e4(0x122)]['length']-0x1];if(_0x53b9ff&&_0x53b9ff[_0x3007e4(0x1c8)]()){if('gtocx'==='gtocx')$gameParty[_0x3007e4(0x565)](_0x53b9ff[_0x3007e4(0x1c8)](),0x1);else return this[_0x3007e4(0x137)]();}this[_0x3007e4(0x122)][_0x3007e4(0x497)]();}while(_0x53de9e>this[_0x3007e4(0x122)][_0x3007e4(0x20e)]){this[_0x3007e4(0x122)]['push'](new Game_Item());}},Game_Actor[_0x420e63(0x125)][_0x420e63(0x2c8)]=function(){const _0xa85a31=_0x420e63,_0x34a1fe=this['equipSlots']();for(let _0x367925=0x0;_0x367925<_0x34a1fe[_0xa85a31(0x20e)];_0x367925++){if(!this[_0xa85a31(0x122)][_0x367925])this[_0xa85a31(0x122)][_0x367925]=new Game_Item();}this[_0xa85a31(0x191)](![]),this['refresh']();},VisuMZ[_0x420e63(0x346)][_0x420e63(0x49f)]=Game_Actor[_0x420e63(0x125)]['changeEquip'],Game_Actor['prototype'][_0x420e63(0x129)]=function(_0x3bff38,_0x1fd5e3){const _0x262c1e=_0x420e63;if(!this[_0x262c1e(0x339)]){if('PrWNt'!==_0x262c1e(0x373)){const _0x108942=JsonEx[_0x262c1e(0x4e5)](this);_0x108942['_tempActor']=!![],VisuMZ[_0x262c1e(0x346)][_0x262c1e(0x49f)]['call'](this,_0x3bff38,_0x1fd5e3),this[_0x262c1e(0x1ce)](_0x108942);}else{const _0x2e236a=new _0x7ae4dd();return _0x593bd0[_0xae2c27]=_0x2e236a,this['addInnerChild'](_0x2e236a),_0x2e236a;}}else VisuMZ[_0x262c1e(0x346)][_0x262c1e(0x49f)][_0x262c1e(0x178)](this,_0x3bff38,_0x1fd5e3);},VisuMZ[_0x420e63(0x346)]['Game_Actor_forceChangeEquip']=Game_Actor[_0x420e63(0x125)]['forceChangeEquip'],Game_Actor[_0x420e63(0x125)]['forceChangeEquip']=function(_0x9f6fb5,_0x4d2c6e){const _0x3d0a57=_0x420e63;if(!this[_0x3d0a57(0x339)]){const _0x26bfd5=JsonEx['makeDeepCopy'](this);_0x26bfd5[_0x3d0a57(0x339)]=!![],VisuMZ['ItemsEquipsCore'][_0x3d0a57(0x3e4)][_0x3d0a57(0x178)](this,_0x9f6fb5,_0x4d2c6e),this[_0x3d0a57(0x1ce)](_0x26bfd5);}else{if(_0x3d0a57(0x4c3)!==_0x3d0a57(0x3d7))VisuMZ[_0x3d0a57(0x346)]['Game_Actor_forceChangeEquip'][_0x3d0a57(0x178)](this,_0x9f6fb5,_0x4d2c6e);else return _0x75bd28[_0x3d0a57(0x346)][_0x3d0a57(0x1e6)][_0x3d0a57(0x178)](this);}},VisuMZ[_0x420e63(0x346)][_0x420e63(0x312)]=Game_Actor[_0x420e63(0x125)]['discardEquip'],Game_Actor['prototype'][_0x420e63(0x151)]=function(_0x5802b1){const _0x423de5=_0x420e63;if(!this[_0x423de5(0x339)]){const _0x430c38=JsonEx[_0x423de5(0x4e5)](this);_0x430c38['_tempActor']=!![],VisuMZ[_0x423de5(0x346)][_0x423de5(0x312)][_0x423de5(0x178)](this,_0x5802b1),this['equipAdjustHpMp'](_0x430c38);}else VisuMZ[_0x423de5(0x346)][_0x423de5(0x312)][_0x423de5(0x178)](this,_0x5802b1);},Game_Actor[_0x420e63(0x125)][_0x420e63(0x191)]=function(_0x3142bf){const _0x4ff4d5=_0x420e63;if(this[_0x4ff4d5(0x288)])return;for(;;){if(_0x4ff4d5(0x2b6)!==_0x4ff4d5(0xee)){const _0x25d5fe=this[_0x4ff4d5(0x4ca)](),_0x479365=this[_0x4ff4d5(0x378)](),_0xa45857=_0x479365[_0x4ff4d5(0x20e)];let _0x3818ab=![];for(let _0x2c8bce=0x0;_0x2c8bce<_0xa45857;_0x2c8bce++){if(_0x4ff4d5(0x248)!=='ipxpC')return _0x548509['ItemsEquipsCore'][_0x4ff4d5(0x515)][_0x4ff4d5(0x3d3)][_0x4ff4d5(0x27b)];else{const _0x308af6=_0x479365[_0x2c8bce];if(_0x308af6&&(!this[_0x4ff4d5(0x44f)](_0x308af6)||_0x308af6[_0x4ff4d5(0x29e)]!==_0x25d5fe[_0x2c8bce])){if(_0x4ff4d5(0x132)!==_0x4ff4d5(0x2d8)){!_0x3142bf&&this[_0x4ff4d5(0x519)](null,_0x308af6);if(!this[_0x4ff4d5(0x339)]){if('vrdMR'!==_0x4ff4d5(0xeb)){const _0x213b1e=JsonEx[_0x4ff4d5(0x4e5)](this);_0x213b1e[_0x4ff4d5(0x339)]=!![],this[_0x4ff4d5(0x122)][_0x2c8bce]['setObject'](null),this[_0x4ff4d5(0x288)]=!![],this[_0x4ff4d5(0x1ce)](_0x213b1e),this[_0x4ff4d5(0x288)]=undefined;}else!this[_0x4ff4d5(0x167)]()&&_0x6b561d[_0x4ff4d5(0x125)][_0x4ff4d5(0x4f6)][_0x4ff4d5(0x178)](this);}else{if(_0x4ff4d5(0x4ec)!==_0x4ff4d5(0xe9))this['_equips'][_0x2c8bce]['setObject'](null);else{this['_allowArtifactTraitObjects']=!![];const _0x2bac60=_0x31a5d2[_0x4ff4d5(0x346)][_0x4ff4d5(0x17a)]['call'](this);return this[_0x4ff4d5(0x2e3)]=_0x5876ab,_0x2bac60;}}_0x3818ab=!![];}else _0x6163f6[_0x4ff4d5(0x2ee)](_0x3c0188[_0x4ff4d5(0x369)],![]);}}}if(!_0x3818ab)break;}else{const _0x275833=this['getNextAvailableEtypeId'](_0x17cca4);if(_0x275833<0x0)return;const _0x1fcae7=_0x563072===0x1?_0x212cb7[_0x2c1c38]:_0x4bb7d5[_0x50584c];this[_0x4ff4d5(0x129)](_0x275833,_0x1fcae7);}}},Game_Actor[_0x420e63(0x125)][_0x420e63(0x1ce)]=function(_0xb1aa94){const _0x279dc5=_0x420e63;if(this['_tempActor'])return;if(!VisuMZ['ItemsEquipsCore'][_0x279dc5(0x515)][_0x279dc5(0x139)][_0x279dc5(0x1f9)])return;const _0x16aa5c=Math[_0x279dc5(0x427)](_0xb1aa94[_0x279dc5(0x36f)]()*this[_0x279dc5(0x1e2)]),_0x535ffc=Math[_0x279dc5(0x427)](_0xb1aa94[_0x279dc5(0x211)]()*this['mmp']);if(this['hp']>0x0)this['setHp'](_0x16aa5c);if(this['mp']>0x0)this[_0x279dc5(0x4e6)](_0x535ffc);},Game_Actor[_0x420e63(0x125)][_0x420e63(0x4ac)]=function(){const _0x186f73=_0x420e63,_0x175a00=this[_0x186f73(0x4ca)]()[_0x186f73(0x20e)];for(let _0x2d6773=0x0;_0x2d6773<_0x175a00;_0x2d6773++){if('Ztdzo'!=='Ztdzo'){const _0x262bbf=_0x134805(_0x2c3d87['$1']);try{_0x4e1814(_0x262bbf);}catch(_0x4c10ca){if(_0x5b259b['isPlaytest']())_0x4f7cde['log'](_0x4c10ca);}}else{if(this[_0x186f73(0x20c)](_0x2d6773))this[_0x186f73(0x129)](_0x2d6773,null);}}},Game_Actor[_0x420e63(0x125)][_0x420e63(0x20c)]=function(_0x5952b1){const _0x208d64=_0x420e63;return this[_0x208d64(0x12f)]()[_0x208d64(0x34d)](this[_0x208d64(0x4ca)]()[_0x5952b1])?_0x208d64(0x2ed)!==_0x208d64(0x1ef)?![]:_0x12b182[_0x5a2d93['id']][_0x208d64(0x178)](this,_0x543e85):this[_0x208d64(0x2f5)](_0x5952b1);},Game_Actor[_0x420e63(0x125)]['nonRemovableEtypes']=function(){const _0x43e684=_0x420e63;return VisuMZ[_0x43e684(0x346)][_0x43e684(0x515)][_0x43e684(0x139)][_0x43e684(0x2e6)];},Game_Actor[_0x420e63(0x125)][_0x420e63(0x1a7)]=function(){const _0x20d972=_0x420e63,_0x4430ee=this['equipSlots']()[_0x20d972(0x20e)];for(let _0x240bf7=0x0;_0x240bf7<_0x4430ee;_0x240bf7++){if(_0x20d972(0x56d)!==_0x20d972(0x388)){if(this[_0x20d972(0x3b6)](_0x240bf7))this[_0x20d972(0x129)](_0x240bf7,null);}else this[_0x20d972(0x3c7)]();}for(let _0x5f3e07=0x0;_0x5f3e07<_0x4430ee;_0x5f3e07++){if(_0x20d972(0x542)!=='rVQaW'){if(this[_0x20d972(0x3b6)](_0x5f3e07))this[_0x20d972(0x129)](_0x5f3e07,this[_0x20d972(0x428)](_0x5f3e07));}else{_0x27873d[_0x20d972(0x125)]['callUpdateHelp'][_0x20d972(0x178)](this);if(this[_0x20d972(0x185)])this['updateCategoryNameWindow']();}}},Game_Actor[_0x420e63(0x125)][_0x420e63(0x3b6)]=function(_0x334953){const _0x557e92=_0x420e63;if(this['nonOptimizeEtypes']()['includes'](this['equipSlots']()[_0x334953])){if(_0x557e92(0x53c)!=='KrcxI')return![];else this[_0x557e92(0x30f)](!![]);}else return this[_0x557e92(0x2f5)](_0x334953);},Game_Actor[_0x420e63(0x125)][_0x420e63(0x200)]=function(){const _0x2b02f8=_0x420e63;return VisuMZ[_0x2b02f8(0x346)][_0x2b02f8(0x515)][_0x2b02f8(0x139)][_0x2b02f8(0x32c)];},VisuMZ[_0x420e63(0x346)]['Game_Actor_tradeItemWithParty']=Game_Actor[_0x420e63(0x125)][_0x420e63(0x519)],Game_Actor['prototype'][_0x420e63(0x519)]=function(_0x5a058a,_0x2a6ec2){const _0x5eec5b=_0x420e63;if(this[_0x5eec5b(0x339)])return![];$gameTemp[_0x5eec5b(0x4a2)]=!![];const _0x4f1dfd=VisuMZ[_0x5eec5b(0x346)][_0x5eec5b(0x1d4)][_0x5eec5b(0x178)](this,_0x5a058a,_0x2a6ec2);return $gameTemp[_0x5eec5b(0x4a2)]=![],_0x4f1dfd;},Game_Actor[_0x420e63(0x125)][_0x420e63(0x4c7)]=function(_0xaf0c54,_0x4de180){const _0x24c262=_0x420e63,_0x53d68e=this[_0x24c262(0x4a0)](_0xaf0c54);if(_0x53d68e<0x0)return;const _0x20fe54=_0xaf0c54===0x1?$dataWeapons[_0x4de180]:$dataArmors[_0x4de180];this[_0x24c262(0x129)](_0x53d68e,_0x20fe54);},Game_Actor['prototype'][_0x420e63(0x4a0)]=function(_0x33007b){const _0x253f9b=_0x420e63;let _0x365873=0x0;const _0x1230f1=this[_0x253f9b(0x4ca)](),_0x6dda3c=this[_0x253f9b(0x378)]();for(let _0x26a164=0x0;_0x26a164<_0x1230f1[_0x253f9b(0x20e)];_0x26a164++){if(_0x1230f1[_0x26a164]===_0x33007b){if(_0x253f9b(0x3f7)===_0x253f9b(0x4d9))return this[_0x253f9b(0x3f3)]()?this[_0x253f9b(0x19d)]():_0x2174a4['ItemsEquipsCore'][_0x253f9b(0x56f)]['call'](this);else{_0x365873=_0x26a164;if(!_0x6dda3c[_0x26a164])return _0x365873;}}}return _0x365873;},VisuMZ[_0x420e63(0x346)][_0x420e63(0x183)]=Game_Actor['prototype'][_0x420e63(0x316)],Game_Actor['prototype'][_0x420e63(0x316)]=function(_0x362403){const _0x3dcc4b=_0x420e63;let _0xfc5237=VisuMZ[_0x3dcc4b(0x346)][_0x3dcc4b(0x183)][_0x3dcc4b(0x178)](this,_0x362403);for(const _0x4aa314 of this[_0x3dcc4b(0x378)]()){if(_0x3dcc4b(0x389)===_0x3dcc4b(0x389)){if(_0x4aa314)_0xfc5237+=this[_0x3dcc4b(0x4fc)](_0x4aa314,_0x362403);}else _0x4cc55a=_0x1ea8ab[_0x3dcc4b(0x539)][_0x3dcc4b(0x515)][_0x3dcc4b(0x1eb)]['ExtDisplayedParams'];}return _0xfc5237;},Game_Actor[_0x420e63(0x125)]['paramPlusItemsEquipsCoreCustomJS']=function(_0x12c2bd,_0x4fbee7){const _0x1db1e0=_0x420e63;if(this[_0x1db1e0(0x39b)])return 0x0;const _0x3e866d=(DataManager['isWeapon'](_0x12c2bd)?_0x1db1e0(0x207):'A%1')[_0x1db1e0(0x24b)](_0x12c2bd['id']),_0xfd75f=_0x1db1e0(0x1bd)[_0x1db1e0(0x24b)](_0x3e866d,_0x4fbee7);if(VisuMZ['ItemsEquipsCore']['paramJS'][_0xfd75f]){this[_0x1db1e0(0x39b)]=!![];const _0x208a37=VisuMZ[_0x1db1e0(0x346)][_0x1db1e0(0x530)][_0xfd75f][_0x1db1e0(0x178)](this,_0x12c2bd,_0x4fbee7);return this[_0x1db1e0(0x39b)]=![],_0x208a37;}else return 0x0;},Game_Actor[_0x420e63(0x125)][_0x420e63(0x158)]=function(_0x170a7d){const _0x1334e4=_0x420e63;this['_shopStatusMenuMode']=!![],this[_0x1334e4(0x43d)]=_0x170a7d;},VisuMZ[_0x420e63(0x346)]['Game_Party_initialize']=Game_Party[_0x420e63(0x125)][_0x420e63(0x307)],Game_Party[_0x420e63(0x125)][_0x420e63(0x307)]=function(){const _0x10f372=_0x420e63;VisuMZ[_0x10f372(0x346)][_0x10f372(0x256)][_0x10f372(0x178)](this),this[_0x10f372(0x338)]();},Game_Party[_0x420e63(0x125)]['initNewItemsList']=function(){const _0x2b5f25=_0x420e63;this[_0x2b5f25(0x20a)]=[];},Game_Party[_0x420e63(0x125)][_0x420e63(0x53b)]=function(_0x1746bb){const _0x17fa59=_0x420e63;if(!$gameTemp[_0x17fa59(0x2bd)]())return![];if(this[_0x17fa59(0x20a)]===undefined)this[_0x17fa59(0x338)]();let _0x3ae25b='';if(DataManager['isItem'](_0x1746bb))_0x3ae25b=_0x17fa59(0x567)[_0x17fa59(0x24b)](_0x1746bb['id']);else{if(DataManager[_0x17fa59(0x520)](_0x1746bb))_0x3ae25b='weapon-%1'[_0x17fa59(0x24b)](_0x1746bb['id']);else{if(DataManager[_0x17fa59(0x272)](_0x1746bb))_0x3ae25b='armor-%1'[_0x17fa59(0x24b)](_0x1746bb['id']);else return;}}return this[_0x17fa59(0x20a)][_0x17fa59(0x34d)](_0x3ae25b);},Game_Party[_0x420e63(0x125)]['setNewItem']=function(_0x1a4549){const _0x204d54=_0x420e63;if(!$gameTemp[_0x204d54(0x2bd)]())return;if(this[_0x204d54(0x20a)]===undefined)this[_0x204d54(0x338)]();let _0x4f239a='';if(DataManager['isItem'](_0x1a4549)){if(_0x204d54(0x4ee)!=='caGXa')_0x4f239a=_0x204d54(0x567)[_0x204d54(0x24b)](_0x1a4549['id']);else return _0x49fb1e[_0x204d54(0x346)][_0x204d54(0x515)][_0x204d54(0x139)][_0x204d54(0x1cc)];}else{if(DataManager[_0x204d54(0x520)](_0x1a4549))_0x4f239a='weapon-%1'[_0x204d54(0x24b)](_0x1a4549['id']);else{if(DataManager['isArmor'](_0x1a4549)){if('cTEZs'===_0x204d54(0x4e8))_0x4f239a='armor-%1'[_0x204d54(0x24b)](_0x1a4549['id']);else{const _0x3ab2f5=_0x22e141[_0x204d54(0x2a7)]['_actor'];_0x3ab2f5&&(this['canShiftRemoveEquipment'](this[_0x204d54(0x236)]())?(this[_0x204d54(0x2c5)](),this[_0x204d54(0x55b)]()):this[_0x204d54(0x209)]());}}else return;}}if(!this[_0x204d54(0x20a)]['includes'](_0x4f239a))this[_0x204d54(0x20a)][_0x204d54(0x3a5)](_0x4f239a);},Game_Party[_0x420e63(0x125)][_0x420e63(0x309)]=function(_0x4ad08c){const _0x3b1fc4=_0x420e63;if(!$gameTemp[_0x3b1fc4(0x2bd)]())return;if(this['_newItemsList']===undefined)this[_0x3b1fc4(0x338)]();let _0x342078='';if(DataManager[_0x3b1fc4(0x495)](_0x4ad08c))_0x342078='item-%1'[_0x3b1fc4(0x24b)](_0x4ad08c['id']);else{if(DataManager[_0x3b1fc4(0x520)](_0x4ad08c))_0x342078=_0x3b1fc4(0x1c9)['format'](_0x4ad08c['id']);else{if(DataManager['isArmor'](_0x4ad08c))_0x342078='armor-%1'[_0x3b1fc4(0x24b)](_0x4ad08c['id']);else return;}}this[_0x3b1fc4(0x20a)][_0x3b1fc4(0x34d)](_0x342078)&&this[_0x3b1fc4(0x20a)][_0x3b1fc4(0x1f3)](this['_newItemsList'][_0x3b1fc4(0x4c2)](_0x342078),0x1);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x55c)]=Game_Party[_0x420e63(0x125)]['numItems'],Game_Party[_0x420e63(0x125)][_0x420e63(0x3e1)]=function(_0x3fdfb9){const _0x2cf777=_0x420e63;if(DataManager[_0x2cf777(0x220)](_0x3fdfb9))_0x3fdfb9=DataManager[_0x2cf777(0x194)](_0x3fdfb9);return VisuMZ[_0x2cf777(0x346)]['Game_Party_numItems'][_0x2cf777(0x178)](this,_0x3fdfb9);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x15a)]=Game_Party[_0x420e63(0x125)]['gainItem'],Game_Party[_0x420e63(0x125)][_0x420e63(0x565)]=function(_0x3fd6df,_0x5b4d31,_0x6bafb1){const _0x100351=_0x420e63;if(DataManager['isProxyItem'](_0x3fd6df))_0x3fd6df=null;const _0x452823=this[_0x100351(0x3e1)](_0x3fd6df);VisuMZ['ItemsEquipsCore'][_0x100351(0x15a)][_0x100351(0x178)](this,_0x3fd6df,_0x5b4d31,_0x6bafb1);if(this[_0x100351(0x3e1)](_0x3fd6df)>_0x452823)this[_0x100351(0x3ca)](_0x3fd6df);},Game_Party[_0x420e63(0x125)][_0x420e63(0x4de)]=function(_0x4fccf1){const _0x5c17c2=_0x420e63;if(DataManager[_0x5c17c2(0x220)](_0x4fccf1))_0x4fccf1=DataManager[_0x5c17c2(0x194)](_0x4fccf1);return DataManager[_0x5c17c2(0x173)](_0x4fccf1);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x237)]=Scene_ItemBase['prototype'][_0x420e63(0x3ee)],Scene_ItemBase[_0x420e63(0x125)][_0x420e63(0x3ee)]=function(){const _0x2abafb=_0x420e63;VisuMZ[_0x2abafb(0x346)][_0x2abafb(0x237)][_0x2abafb(0x178)](this),this['_itemWindow'][_0x2abafb(0x375)]();},Scene_Item['prototype']['isBottomHelpMode']=function(){const _0x6873d5=_0x420e63;if(ConfigManager[_0x6873d5(0x296)]&&ConfigManager['uiHelpPosition']!==undefined){if(_0x6873d5(0x3d8)===_0x6873d5(0x3d8))return ConfigManager[_0x6873d5(0x433)];else _0x9ac8f3[_0x6873d5(0x346)]['ParseClassNotetags'][_0x6873d5(0x178)](this,_0x3f7512),_0x4a49b9[_0x6873d5(0x346)][_0x6873d5(0x333)](_0x379360);}else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x6873d5(0x32a)]()['match'](/LOWER/i);else Scene_ItemBase[_0x6873d5(0x125)][_0x6873d5(0x523)][_0x6873d5(0x178)](this);}},Scene_Item[_0x420e63(0x125)]['isRightInputMode']=function(){const _0x5c56a5=_0x420e63;if(ConfigManager['uiMenuStyle']&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x5c56a5(0x33f)];else{if(this[_0x5c56a5(0x3f3)]()){if(_0x5c56a5(0x190)!==_0x5c56a5(0x190))this['playCursorSound']();else return this['updatedLayoutStyle']()[_0x5c56a5(0x3d9)](/RIGHT/i);}else{if(_0x5c56a5(0x473)!==_0x5c56a5(0x418))Scene_ItemBase[_0x5c56a5(0x125)][_0x5c56a5(0x523)]['call'](this);else{const _0x5118d3=_0x3ec2ee[_0x5c56a5(0x346)][_0x5c56a5(0x515)][_0x5c56a5(0x139)];let _0x24dec0=_0x5118d3[_0x5c56a5(0x3dd)]!==_0x54d3e6?_0x5118d3[_0x5c56a5(0x3dd)]:0x13;return _0x1a2e0d[_0x5c56a5(0x360)](_0x24dec0);}}}},Scene_Item[_0x420e63(0x125)][_0x420e63(0x32a)]=function(){const _0x5a8346=_0x420e63;return VisuMZ['ItemsEquipsCore']['Settings'][_0x5a8346(0x2a2)][_0x5a8346(0x11d)];},Scene_Item[_0x420e63(0x125)][_0x420e63(0x3ce)]=function(){const _0x1a3e10=_0x420e63;return this[_0x1a3e10(0x551)]&&this[_0x1a3e10(0x551)][_0x1a3e10(0x3ce)]();},Scene_Item[_0x420e63(0x125)][_0x420e63(0x3f3)]=function(){const _0xf34e01=_0x420e63;return VisuMZ[_0xf34e01(0x346)][_0xf34e01(0x515)][_0xf34e01(0x2a2)][_0xf34e01(0x543)];},VisuMZ['ItemsEquipsCore'][_0x420e63(0x37c)]=Scene_Item['prototype']['create'],Scene_Item[_0x420e63(0x125)][_0x420e63(0x1a6)]=function(){const _0xe5ca68=_0x420e63;VisuMZ['ItemsEquipsCore'][_0xe5ca68(0x37c)][_0xe5ca68(0x178)](this),this[_0xe5ca68(0x3ce)]()&&(_0xe5ca68(0x2be)!=='cliVY'?(_0x575a36[_0xe5ca68(0x455)](_0xe5ca68(0x4ba))&&this[_0xe5ca68(0x548)](),_0x1e9495['isTriggered'](_0xe5ca68(0x383))&&this['cursorPageup']()):this[_0xe5ca68(0x39a)]());},VisuMZ[_0x420e63(0x346)][_0x420e63(0x1dc)]=Scene_Item[_0x420e63(0x125)][_0x420e63(0x37b)],Scene_Item[_0x420e63(0x125)][_0x420e63(0x37b)]=function(){const _0x23feb0=_0x420e63;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x23feb0(0x4db)!==_0x23feb0(0x4db))_0x1fde0e=_0x55850e[_0x23feb0(0x223)](this[_0x23feb0(0x2f7)](_0x49079b,_0x4d1c87+0x4,_0x555e92+0x4,_0x1a1253),_0x4b7000),_0x185589+=_0x2c9971;else return this['helpWindowRectItemsEquipsCore']();}else{if('ncdFg'===_0x23feb0(0x275))this[_0x23feb0(0x52a)]=this[_0x23feb0(0x52a)]||0x0,this[_0x23feb0(0x1a1)][_0x23feb0(0x3ef)](this[_0x23feb0(0x52a)]);else return VisuMZ[_0x23feb0(0x346)]['Scene_Item_helpWindowRect'][_0x23feb0(0x178)](this);}},Scene_Item[_0x420e63(0x125)][_0x420e63(0x4be)]=function(){const _0x49ea4d=_0x420e63,_0xfb82f4=0x0,_0x4340e1=this['helpAreaTop'](),_0x398903=Graphics['boxWidth'],_0x3b15de=this[_0x49ea4d(0x343)]();return new Rectangle(_0xfb82f4,_0x4340e1,_0x398903,_0x3b15de);},VisuMZ[_0x420e63(0x346)]['Scene_Item_createCategoryWindow']=Scene_Item[_0x420e63(0x125)][_0x420e63(0x386)],Scene_Item[_0x420e63(0x125)][_0x420e63(0x386)]=function(){const _0x1e188c=_0x420e63;VisuMZ[_0x1e188c(0x346)][_0x1e188c(0x1b3)][_0x1e188c(0x178)](this),this[_0x1e188c(0x3ce)]()&&this[_0x1e188c(0x28f)]();},Scene_Item[_0x420e63(0x125)][_0x420e63(0x28f)]=function(){const _0x38c8f5=_0x420e63;delete this['_categoryWindow'][_0x38c8f5(0x177)]['ok'],delete this[_0x38c8f5(0x551)][_0x38c8f5(0x177)][_0x38c8f5(0x28e)];},VisuMZ[_0x420e63(0x346)][_0x420e63(0x235)]=Scene_Item[_0x420e63(0x125)]['categoryWindowRect'],Scene_Item[_0x420e63(0x125)][_0x420e63(0x45f)]=function(){const _0x453b1f=_0x420e63;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x453b1f(0x17e)]():VisuMZ[_0x453b1f(0x346)]['Scene_Item_categoryWindowRect'][_0x453b1f(0x178)](this);},Scene_Item[_0x420e63(0x125)][_0x420e63(0x17e)]=function(){const _0xf99dd=_0x420e63,_0x36263d=0x0,_0x449c6=this['mainAreaTop'](),_0x1cb1cf=Graphics[_0xf99dd(0x513)],_0x1270c9=this[_0xf99dd(0x33a)](0x1,!![]);return new Rectangle(_0x36263d,_0x449c6,_0x1cb1cf,_0x1270c9);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x2c0)]=Scene_Item[_0x420e63(0x125)][_0x420e63(0x476)],Scene_Item[_0x420e63(0x125)][_0x420e63(0x476)]=function(){const _0x553c95=_0x420e63;VisuMZ[_0x553c95(0x346)][_0x553c95(0x2c0)]['call'](this),this[_0x553c95(0x3ce)]()&&this[_0x553c95(0x1d1)](),this[_0x553c95(0x104)]()&&this[_0x553c95(0x2fa)]();},VisuMZ[_0x420e63(0x346)]['Scene_Item_itemWindowRect']=Scene_Item['prototype']['itemWindowRect'],Scene_Item[_0x420e63(0x125)][_0x420e63(0x4b0)]=function(){const _0x308bc9=_0x420e63;if(this[_0x308bc9(0x3f3)]())return this[_0x308bc9(0x1ff)]();else{const _0x2f25f1=VisuMZ[_0x308bc9(0x346)]['Scene_Item_itemWindowRect'][_0x308bc9(0x178)](this);return this[_0x308bc9(0x104)]()&&this[_0x308bc9(0x1b9)]()&&(_0x2f25f1[_0x308bc9(0x4b7)]-=this['statusWidth']()),_0x2f25f1;}},Scene_Item[_0x420e63(0x125)][_0x420e63(0x1ff)]=function(){const _0x71dc09=_0x420e63,_0x39c12c=this[_0x71dc09(0x523)]()?this[_0x71dc09(0xfc)]():0x0,_0x4629b1=this[_0x71dc09(0x551)]['y']+this[_0x71dc09(0x551)]['height'],_0x458aa1=Graphics['boxWidth']-this[_0x71dc09(0xfc)](),_0x51ef88=this['mainAreaBottom']()-_0x4629b1;return new Rectangle(_0x39c12c,_0x4629b1,_0x458aa1,_0x51ef88);},Scene_Item[_0x420e63(0x125)]['postCreateItemWindowModernControls']=function(){const _0x4a63a8=_0x420e63;this[_0x4a63a8(0x18e)]['setHandler']('cancel',this[_0x4a63a8(0x53e)][_0x4a63a8(0x315)](this));},Scene_Item['prototype'][_0x420e63(0x104)]=function(){const _0x34ee60=_0x420e63;return this['isUseItemsEquipsCoreUpdatedLayout']()?!![]:VisuMZ[_0x34ee60(0x346)][_0x34ee60(0x515)][_0x34ee60(0x2a2)]['ShowShopStatus'];},Scene_Item[_0x420e63(0x125)]['adjustItemWidthByStatus']=function(){const _0x375f56=_0x420e63;return VisuMZ['ItemsEquipsCore'][_0x375f56(0x515)]['ItemScene'][_0x375f56(0x302)];},Scene_Item[_0x420e63(0x125)][_0x420e63(0x2fa)]=function(){const _0x33297a=_0x420e63,_0xb72b79=this[_0x33297a(0x1ca)]();this[_0x33297a(0x291)]=new Window_ShopStatus(_0xb72b79),this[_0x33297a(0xf0)](this[_0x33297a(0x291)]),this[_0x33297a(0x18e)][_0x33297a(0x176)](this['_statusWindow']);const _0x2b6adf=VisuMZ[_0x33297a(0x346)][_0x33297a(0x515)]['ItemScene'][_0x33297a(0x30a)];this[_0x33297a(0x291)][_0x33297a(0x29f)](_0x2b6adf||0x0);},Scene_Item[_0x420e63(0x125)][_0x420e63(0x1ca)]=function(){const _0x41b34f=_0x420e63;return this[_0x41b34f(0x3f3)]()?this[_0x41b34f(0x137)]():VisuMZ[_0x41b34f(0x346)][_0x41b34f(0x515)][_0x41b34f(0x2a2)][_0x41b34f(0x268)][_0x41b34f(0x178)](this);},Scene_Item[_0x420e63(0x125)][_0x420e63(0x137)]=function(){const _0x383289=_0x420e63,_0x18d96b=this['statusWidth'](),_0x463362=this[_0x383289(0x18e)][_0x383289(0x3a1)],_0xcef2ec=this['isRightInputMode']()?0x0:Graphics[_0x383289(0x513)]-this[_0x383289(0xfc)](),_0x53ac37=this['_itemWindow']['y'];return new Rectangle(_0xcef2ec,_0x53ac37,_0x18d96b,_0x463362);},Scene_Item['prototype']['statusWidth']=function(){return Scene_Shop['prototype']['statusWidth']();},Scene_Item['prototype'][_0x420e63(0x22f)]=function(){const _0x1d06dd=_0x420e63;if(!this[_0x1d06dd(0x32a)]())return![];if(!this['isUseModernControls']())return![];if(!this[_0x1d06dd(0x18e)])return![];if(!this[_0x1d06dd(0x18e)][_0x1d06dd(0x401)])return![];return this[_0x1d06dd(0x32a)]()&&this[_0x1d06dd(0x3ce)]();},Scene_Item[_0x420e63(0x125)][_0x420e63(0xd2)]=function(){const _0x36e759=_0x420e63;if(this[_0x36e759(0x22f)]())return _0x36e759(0x2f4)!=='QpTpZ'?this[_0x36e759(0x18e)][_0x36e759(0x2fc)]()===0x1?TextManager[_0x36e759(0x283)](_0x36e759(0x501),_0x36e759(0x4eb)):_0x36e759(0x22a)!==_0x36e759(0xc8)?TextManager[_0x36e759(0x283)](_0x36e759(0x383),_0x36e759(0x4ba)):_0x596346['ItemsEquipsCore'][_0x36e759(0x515)]['StatusWindow'][_0x36e759(0x3f2)]:_0xf7790d[_0x36e759(0x346)]['Settings'][_0x36e759(0x2a2)][_0x36e759(0x11d)];return Scene_ItemBase[_0x36e759(0x125)]['buttonAssistKey1'][_0x36e759(0x178)](this);},Scene_Item[_0x420e63(0x125)][_0x420e63(0x2b7)]=function(){const _0x10943b=_0x420e63;if(this[_0x10943b(0x22f)]())return VisuMZ[_0x10943b(0x346)][_0x10943b(0x515)][_0x10943b(0x2a2)][_0x10943b(0x441)];return Scene_ItemBase['prototype']['buttonAssistText1'][_0x10943b(0x178)](this);},Scene_Equip['prototype'][_0x420e63(0x1c5)]=function(){const _0x295b54=_0x420e63;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x295b54(0x433)]!==undefined)return'fGxjo'==='rIzYM'?this[_0x295b54(0x17e)]():ConfigManager['uiHelpPosition'];else{if(this[_0x295b54(0x3f3)]())return this[_0x295b54(0x32a)]()[_0x295b54(0x3d9)](/LOWER/i);else'wGCve'===_0x295b54(0x48d)?Scene_MenuBase[_0x295b54(0x125)][_0x295b54(0x523)]['call'](this):this[_0x295b54(0x518)](_0x4473c7[_0x295b54(0x455)](_0x295b54(0x501)));}},Scene_Equip[_0x420e63(0x125)][_0x420e63(0x523)]=function(){const _0xd5e264=_0x420e63;if(ConfigManager[_0xd5e264(0x296)]&&ConfigManager[_0xd5e264(0x33f)]!==undefined)return ConfigManager[_0xd5e264(0x33f)];else{if(this[_0xd5e264(0x3f3)]())return this[_0xd5e264(0x32a)]()[_0xd5e264(0x3d9)](/RIGHT/i);else'mNbHG'!==_0xd5e264(0x202)?_0x11b439['push'](_0x579f0b[_0x4bed9c]):Scene_MenuBase[_0xd5e264(0x125)]['isRightInputMode'][_0xd5e264(0x178)](this);}},Scene_Equip[_0x420e63(0x125)][_0x420e63(0x32a)]=function(){const _0x3e59b8=_0x420e63;return VisuMZ['ItemsEquipsCore'][_0x3e59b8(0x515)]['EquipScene'][_0x3e59b8(0x11d)];},Scene_Equip[_0x420e63(0x125)][_0x420e63(0x3ce)]=function(){const _0x3b0ecd=_0x420e63;return this[_0x3b0ecd(0x578)]&&this[_0x3b0ecd(0x578)]['isUseModernControls']();},Scene_Equip['prototype'][_0x420e63(0x3f3)]=function(){const _0xd70f72=_0x420e63;return VisuMZ[_0xd70f72(0x346)][_0xd70f72(0x515)][_0xd70f72(0x139)][_0xd70f72(0x543)];},VisuMZ[_0x420e63(0x346)][_0x420e63(0x1e9)]=Scene_Equip['prototype'][_0x420e63(0x1a6)],Scene_Equip[_0x420e63(0x125)][_0x420e63(0x1a6)]=function(){const _0x2b8f7e=_0x420e63;VisuMZ[_0x2b8f7e(0x346)][_0x2b8f7e(0x1e9)][_0x2b8f7e(0x178)](this);if(this[_0x2b8f7e(0x3ce)]()){if(_0x2b8f7e(0x253)!==_0x2b8f7e(0x253)){if(this[_0x2b8f7e(0x3b6)](_0x5f4f96))this[_0x2b8f7e(0x129)](_0x389c6c,null);}else this[_0x2b8f7e(0x100)]();}},VisuMZ[_0x420e63(0x346)][_0x420e63(0x4ed)]=Scene_Equip[_0x420e63(0x125)][_0x420e63(0x37b)],Scene_Equip['prototype'][_0x420e63(0x37b)]=function(){const _0x412ac3=_0x420e63;return this[_0x412ac3(0x3f3)]()?this[_0x412ac3(0x4be)]():VisuMZ[_0x412ac3(0x346)]['Scene_Equip_helpWindowRect'][_0x412ac3(0x178)](this);},Scene_Equip['prototype']['helpWindowRectItemsEquipsCore']=function(){const _0x38acf3=_0x420e63,_0xd8d32d=0x0,_0x1b7942=this['helpAreaTop'](),_0x299d83=Graphics[_0x38acf3(0x513)],_0x569ba4=this[_0x38acf3(0x343)]();return new Rectangle(_0xd8d32d,_0x1b7942,_0x299d83,_0x569ba4);},VisuMZ['ItemsEquipsCore'][_0x420e63(0x164)]=Scene_Equip[_0x420e63(0x125)]['statusWindowRect'],Scene_Equip['prototype']['statusWindowRect']=function(){const _0x5e0dc0=_0x420e63;return this[_0x5e0dc0(0x3f3)]()?this[_0x5e0dc0(0x137)]():VisuMZ['ItemsEquipsCore']['Scene_Equip_statusWindowRect']['call'](this);},Scene_Equip['prototype'][_0x420e63(0x137)]=function(){const _0x20634c=_0x420e63,_0x4d8862=this[_0x20634c(0x523)]()?0x0:Graphics[_0x20634c(0x513)]-this[_0x20634c(0xfc)](),_0x36fe12=this[_0x20634c(0x130)](),_0x5554cd=this[_0x20634c(0xfc)](),_0x3783f=this[_0x20634c(0x4e7)]();return new Rectangle(_0x4d8862,_0x36fe12,_0x5554cd,_0x3783f);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x1ab)]=Scene_Equip[_0x420e63(0x125)][_0x420e63(0x249)],Scene_Equip[_0x420e63(0x125)][_0x420e63(0x249)]=function(){const _0x52a051=_0x420e63;if(this[_0x52a051(0x3f3)]())return this['commandWindowRectItemsEquipsCore']();else{if(_0x52a051(0x213)===_0x52a051(0x326))this[_0x52a051(0x3c7)]();else return VisuMZ[_0x52a051(0x346)][_0x52a051(0x1ab)]['call'](this);}},Scene_Equip[_0x420e63(0x125)]['shouldCommandWindowExist']=function(){const _0x50d9ed=_0x420e63,_0x34bf87=VisuMZ['ItemsEquipsCore']['Settings'][_0x50d9ed(0x139)];return _0x34bf87['CommandAddOptimize']||_0x34bf87[_0x50d9ed(0x332)];},Scene_Equip[_0x420e63(0x125)]['commandWindowRectItemsEquipsCore']=function(){const _0x149af4=_0x420e63,_0x39dbb9=this[_0x149af4(0x3a2)](),_0x269fda=this[_0x149af4(0x523)]()?this[_0x149af4(0xfc)]():0x0,_0x4fa45b=this[_0x149af4(0x130)](),_0x5c508a=Graphics[_0x149af4(0x513)]-this[_0x149af4(0xfc)](),_0x17bf30=_0x39dbb9?this[_0x149af4(0x33a)](0x1,!![]):0x0;return new Rectangle(_0x269fda,_0x4fa45b,_0x5c508a,_0x17bf30);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x534)]=Scene_Equip[_0x420e63(0x125)][_0x420e63(0x1b4)],Scene_Equip[_0x420e63(0x125)]['createSlotWindow']=function(){const _0x5c1106=_0x420e63;VisuMZ[_0x5c1106(0x346)][_0x5c1106(0x534)][_0x5c1106(0x178)](this),this[_0x5c1106(0x3ce)]()&&this['postCreateSlotWindowItemsEquipsCore']();},VisuMZ['ItemsEquipsCore'][_0x420e63(0x416)]=Scene_Equip[_0x420e63(0x125)][_0x420e63(0x468)],Scene_Equip[_0x420e63(0x125)][_0x420e63(0x468)]=function(){const _0x5a4343=_0x420e63;if(this[_0x5a4343(0x3f3)]()){if(_0x5a4343(0x3a9)===_0x5a4343(0x1ac))_0x49cae4[_0x5a4343(0x346)][_0x5a4343(0x1e9)][_0x5a4343(0x178)](this),this[_0x5a4343(0x3ce)]()&&this['commandEquip']();else return this[_0x5a4343(0x140)]();}else{if(_0x5a4343(0x259)!==_0x5a4343(0x259))_0x274e0f['prototype'][_0x5a4343(0x2b9)]['call'](this),this[_0x5a4343(0x375)]();else return VisuMZ[_0x5a4343(0x346)][_0x5a4343(0x416)]['call'](this);}},Scene_Equip[_0x420e63(0x125)]['slotWindowRectItemsEquipsCore']=function(){const _0x535553=_0x420e63,_0x471741=this[_0x535553(0x249)](),_0x370130=this[_0x535553(0x523)]()?this[_0x535553(0xfc)]():0x0,_0x371029=_0x471741['y']+_0x471741[_0x535553(0x3a1)],_0x352d6d=Graphics[_0x535553(0x513)]-this['statusWidth'](),_0x14ed24=this[_0x535553(0x4e7)]()-_0x471741[_0x535553(0x3a1)];return new Rectangle(_0x370130,_0x371029,_0x352d6d,_0x14ed24);},VisuMZ[_0x420e63(0x346)]['Scene_Equip_itemWindowRect']=Scene_Equip[_0x420e63(0x125)][_0x420e63(0x4b0)],Scene_Equip[_0x420e63(0x125)][_0x420e63(0x4b0)]=function(){const _0x27afce=_0x420e63;if(this[_0x27afce(0x3f3)]())return _0x27afce(0x323)===_0x27afce(0x3e6)?_0x28e5c2[_0x27afce(0x2db)]&&_0x391b70[_0x27afce(0x4a9)](this['_item'])!==_0x27afce(0x460)?this[_0x27afce(0x1d2)]():this[_0x27afce(0x486)]():this[_0x27afce(0x468)]();else{if(_0x27afce(0x496)!==_0x27afce(0x426))return VisuMZ[_0x27afce(0x346)]['Scene_Equip_itemWindowRect'][_0x27afce(0x178)](this);else this[_0x27afce(0x3ef)](0x0);}},Scene_Equip[_0x420e63(0x125)]['statusWidth']=function(){const _0x499e53=_0x420e63;return this[_0x499e53(0x3f3)]()?this[_0x499e53(0x507)]():VisuMZ['ItemsEquipsCore']['Settings']['EquipScene'][_0x499e53(0x3b2)];},Scene_Equip[_0x420e63(0x125)][_0x420e63(0x507)]=function(){const _0x36df23=_0x420e63;return Math[_0x36df23(0x192)](Graphics[_0x36df23(0x513)]/0x2);},Scene_Equip[_0x420e63(0x125)][_0x420e63(0x557)]=function(){const _0x16e05d=_0x420e63;this[_0x16e05d(0x1f2)][_0x16e05d(0x43e)](_0x16e05d(0x28e),this[_0x16e05d(0x53e)][_0x16e05d(0x315)](this)),this[_0x16e05d(0x1f2)]['setHandler'](_0x16e05d(0x4ba),this[_0x16e05d(0x2d0)][_0x16e05d(0x315)](this)),this[_0x16e05d(0x1f2)][_0x16e05d(0x43e)]('pageup',this['previousActor'][_0x16e05d(0x315)](this));},VisuMZ[_0x420e63(0x346)][_0x420e63(0x19c)]=Scene_Equip['prototype'][_0x420e63(0x100)],Scene_Equip[_0x420e63(0x125)][_0x420e63(0x100)]=function(){const _0x325a59=_0x420e63;this['isUseModernControls']()&&(this['_commandWindow'][_0x325a59(0x120)](),this[_0x325a59(0x578)][_0x325a59(0x1da)]()),VisuMZ[_0x325a59(0x346)][_0x325a59(0x19c)]['call'](this);},VisuMZ['ItemsEquipsCore'][_0x420e63(0x509)]=Scene_Equip[_0x420e63(0x125)][_0x420e63(0x545)],Scene_Equip[_0x420e63(0x125)][_0x420e63(0x545)]=function(){const _0x3d32b9=_0x420e63;this[_0x3d32b9(0x1f2)][_0x3d32b9(0x236)]()>=0x0?(VisuMZ[_0x3d32b9(0x346)][_0x3d32b9(0x509)][_0x3d32b9(0x178)](this),this['onSlotOkAutoSelect']()):(this[_0x3d32b9(0x1f2)][_0x3d32b9(0x3ef)](0x0),this[_0x3d32b9(0x1f2)]['activate']());},Scene_Equip[_0x420e63(0x125)][_0x420e63(0x51a)]=function(){const _0x47f9b8=_0x420e63;this[_0x47f9b8(0x18e)][_0x47f9b8(0x429)]();const _0x74c281=this[_0x47f9b8(0x1f2)][_0x47f9b8(0x521)](),_0x43f5eb=this[_0x47f9b8(0x18e)]['_data']['indexOf'](_0x74c281),_0x51c414=Math[_0x47f9b8(0x192)](this[_0x47f9b8(0x18e)][_0x47f9b8(0x417)]()/0x2)-0x1;this['_itemWindow'][_0x47f9b8(0x3ef)](_0x43f5eb>=0x0?_0x43f5eb:0x0),this[_0x47f9b8(0x18e)][_0x47f9b8(0x2b8)]>0x1&&(this[_0x47f9b8(0x18e)]['_scrollDuration']=0x1,this[_0x47f9b8(0x18e)][_0x47f9b8(0x2b1)]()),this[_0x47f9b8(0x18e)][_0x47f9b8(0x538)](this[_0x47f9b8(0x18e)][_0x47f9b8(0x236)]()-_0x51c414);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x26a)]=Scene_Equip[_0x420e63(0x125)][_0x420e63(0x337)],Scene_Equip[_0x420e63(0x125)][_0x420e63(0x337)]=function(){const _0x2e5abd=_0x420e63;VisuMZ[_0x2e5abd(0x346)][_0x2e5abd(0x26a)][_0x2e5abd(0x178)](this),this[_0x2e5abd(0x3ce)]()&&(this[_0x2e5abd(0x578)][_0x2e5abd(0x3ef)](0x0),this[_0x2e5abd(0x1f2)][_0x2e5abd(0x1da)]());},VisuMZ[_0x420e63(0x346)]['Scene_Equip_onActorChange']=Scene_Equip[_0x420e63(0x125)]['onActorChange'],Scene_Equip[_0x420e63(0x125)][_0x420e63(0x1f1)]=function(){const _0xd21f9e=_0x420e63;VisuMZ[_0xd21f9e(0x346)]['Scene_Equip_onActorChange'][_0xd21f9e(0x178)](this),this['isUseModernControls']()&&(_0xd21f9e(0x456)!==_0xd21f9e(0x451)?(this[_0xd21f9e(0x578)]['deactivate'](),this['_commandWindow'][_0xd21f9e(0x120)](),this[_0xd21f9e(0x1f2)]['smoothSelect'](0x0),this['_slotWindow']['activate']()):_0x56b2a3=_0xd21f9e(0x1c9)[_0xd21f9e(0x24b)](_0x572135['id']));},Scene_Equip[_0x420e63(0x125)]['buttonAssistSlotWindowShift']=function(){const _0x5e4343=_0x420e63;if(!this['_slotWindow'])return![];if(!this[_0x5e4343(0x1f2)][_0x5e4343(0x401)])return![];return this[_0x5e4343(0x1f2)][_0x5e4343(0x2e4)]();},Scene_Equip[_0x420e63(0x125)]['buttonAssistKey3']=function(){const _0x520d51=_0x420e63;if(this[_0x520d51(0x258)]())return TextManager['getInputButtonString']('shift');return Scene_MenuBase[_0x520d51(0x125)][_0x520d51(0x38d)][_0x520d51(0x178)](this);},Scene_Equip[_0x420e63(0x125)][_0x420e63(0x54f)]=function(){const _0x1f5c95=_0x420e63;if(this[_0x1f5c95(0x258)]())return VisuMZ['ItemsEquipsCore'][_0x1f5c95(0x515)][_0x1f5c95(0x139)][_0x1f5c95(0x299)];return Scene_MenuBase[_0x1f5c95(0x125)][_0x1f5c95(0x54f)][_0x1f5c95(0x178)](this);},Scene_Equip[_0x420e63(0x125)][_0x420e63(0x26c)]=function(){const _0x1b45c3=_0x420e63;if(this[_0x1b45c3(0x258)]())return this[_0x1b45c3(0x4c6)][_0x1b45c3(0x4b7)]/0x5/-0x3;return Scene_MenuBase[_0x1b45c3(0x125)]['buttonAssistOffset3'][_0x1b45c3(0x178)](this);},Scene_Equip[_0x420e63(0x125)][_0x420e63(0x53e)]=function(){const _0xaa0320=_0x420e63;SceneManager[_0xaa0320(0x497)]();},VisuMZ[_0x420e63(0x346)][_0x420e63(0x203)]=Scene_Load[_0x420e63(0x125)][_0x420e63(0x14a)],Scene_Load[_0x420e63(0x125)][_0x420e63(0x14a)]=function(){const _0xf71ed=_0x420e63;VisuMZ[_0xf71ed(0x346)][_0xf71ed(0x203)]['call'](this),this[_0xf71ed(0x34b)]();},Scene_Load['prototype'][_0x420e63(0x34b)]=function(){const _0x4e4e96=_0x420e63;if($gameSystem[_0x4e4e96(0x352)]()!==$dataSystem[_0x4e4e96(0x352)]){if('VTsul'!==_0x4e4e96(0x57d)){if(_0x3978d3['ItemsEquipsCore']['Settings'][_0x4e4e96(0x516)][_0x4e4e96(0x233)]===![])return;_0x3b6dee=_0x57b060[_0x4e4e96(0x223)](_0x3fed4d||0x1,0x1);while(_0x5b759f--){_0x336fb2=_0x562ccf||this[_0x4e4e96(0xf3)](),this[_0x4e4e96(0x3fa)]['paintOpacity']=0xa0;const _0xf9d2f1=_0x4690ad[_0x4e4e96(0x488)]();this[_0x4e4e96(0x3fa)][_0x4e4e96(0x174)](_0x5c53b5+0x1,_0x441c61+0x1,_0x285074-0x2,_0x49d1a4-0x2,_0xf9d2f1),this[_0x4e4e96(0x3fa)][_0x4e4e96(0x304)]=0xff;}}else for(const _0x69800e of $gameActors['_data']){if(_0x4e4e96(0x395)!==_0x4e4e96(0x475)){if(_0x69800e)_0x69800e['prepareNewEquipSlotsOnLoad']();}else return _0x1025f0[_0x4e4e96(0x346)][_0x4e4e96(0x305)][_0x4e4e96(0x178)](this);}}},Scene_Shop[_0x420e63(0x125)]['isBottomHelpMode']=function(){const _0x54ecc5=_0x420e63;if(ConfigManager[_0x54ecc5(0x296)]&&ConfigManager[_0x54ecc5(0x433)]!==undefined)return ConfigManager[_0x54ecc5(0x433)];else{if(this[_0x54ecc5(0x3f3)]())return this['updatedLayoutStyle']()[_0x54ecc5(0x3d9)](/LOWER/i);else Scene_MenuBase['prototype'][_0x54ecc5(0x523)]['call'](this);}},Scene_Shop[_0x420e63(0x125)][_0x420e63(0x523)]=function(){const _0x5c583b=_0x420e63;if(ConfigManager[_0x5c583b(0x296)]&&ConfigManager['uiInputPosition']!==undefined){if(_0x5c583b(0x4bf)!==_0x5c583b(0x46b))return ConfigManager[_0x5c583b(0x33f)];else this[_0x5c583b(0x548)]();}else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x5c583b(0x32a)]()[_0x5c583b(0x3d9)](/RIGHT/i);else Scene_MenuBase['prototype'][_0x5c583b(0x523)]['call'](this);}},Scene_Shop[_0x420e63(0x125)]['updatedLayoutStyle']=function(){const _0x25fa00=_0x420e63;return VisuMZ[_0x25fa00(0x346)][_0x25fa00(0x515)]['ShopScene'][_0x25fa00(0x11d)];},Scene_Shop[_0x420e63(0x125)][_0x420e63(0x3ce)]=function(){const _0x33f9a3=_0x420e63;return this['_categoryWindow']&&this['_categoryWindow'][_0x33f9a3(0x3ce)]();},Scene_Shop[_0x420e63(0x125)][_0x420e63(0x3f3)]=function(){const _0x37dee2=_0x420e63;return VisuMZ['ItemsEquipsCore'][_0x37dee2(0x515)][_0x37dee2(0x3d3)]['EnableLayout'];},VisuMZ[_0x420e63(0x346)][_0x420e63(0x2dd)]=Scene_Shop[_0x420e63(0x125)]['prepare'],Scene_Shop['prototype'][_0x420e63(0x2dc)]=function(_0x3ec9d0,_0x120207){const _0x3262ab=_0x420e63;_0x3ec9d0=JsonEx[_0x3262ab(0x4e5)](_0x3ec9d0),VisuMZ[_0x3262ab(0x346)][_0x3262ab(0x2dd)][_0x3262ab(0x178)](this,_0x3ec9d0,_0x120207),this[_0x3262ab(0x171)]();},Scene_Shop[_0x420e63(0x125)][_0x420e63(0x171)]=function(){const _0x2b1abe=_0x420e63;this['_goodsCount']=0x0;const _0x158d6c=[];for(const _0x216289 of this['_goods']){if('BPzKy'!==_0x2b1abe(0x22d)){const _0x8b2d9=_0x2b1abe(0x1f0);if(this[_0x2b1abe(0x4d7)][_0x8b2d9])return this['_customItemInfo'][_0x8b2d9];let _0xfeca09='';if(this[_0x2b1abe(0x105)]['rateHP']>0x0)_0xfeca09+=_0x2b1abe(0x31c)[_0x2b1abe(0x24b)](_0x267eac['floor'](this[_0x2b1abe(0x105)][_0x2b1abe(0x252)]*0x64));if(this[_0x2b1abe(0x105)][_0x2b1abe(0x252)]>0x0&&this[_0x2b1abe(0x105)][_0x2b1abe(0x160)]>0x0)_0xfeca09+='\x20';if(this[_0x2b1abe(0x105)][_0x2b1abe(0x160)]>0x0)_0xfeca09+=_0x2b1abe(0x434)['format'](this[_0x2b1abe(0x105)][_0x2b1abe(0x160)]);return _0xfeca09;}else this[_0x2b1abe(0x110)](_0x216289)?this[_0x2b1abe(0x4f3)]++:_0x158d6c[_0x2b1abe(0x3a5)](_0x216289);}for(const _0x217fd3 of _0x158d6c){this[_0x2b1abe(0x33c)]['remove'](_0x217fd3);}},Scene_Shop[_0x420e63(0x125)]['isGoodShown']=function(_0x24db7a){const _0x3f860a=_0x420e63;if(_0x24db7a[0x0]>0x2||_0x24db7a[0x0]<0x0)return![];const _0x170f1e=[$dataItems,$dataWeapons,$dataArmors][_0x24db7a[0x0]][_0x24db7a[0x1]];if(!_0x170f1e)return![];const _0x25633e=_0x170f1e[_0x3f860a(0x32d)]||'';if(_0x25633e['match'](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1b5c31=JSON[_0x3f860a(0x3fd)]('['+RegExp['$1'][_0x3f860a(0x3d9)](/\d+/g)+']');for(const _0x4633cf of _0x1b5c31){if(_0x3f860a(0x462)===_0x3f860a(0x462)){if(!$gameSwitches[_0x3f860a(0x118)](_0x4633cf))return![];}else{_0x2aac7b['ItemsEquipsCore'][_0x3f860a(0x3c6)]={},_0x53079c['ItemsEquipsCore']['RegExp']['EquipParams']=[],_0x27f823[_0x3f860a(0x346)][_0x3f860a(0x3c6)]['BorderRegExp']=[];const _0x439546=[_0x3f860a(0x29c),_0x3f860a(0x575),'ATK',_0x3f860a(0x107),_0x3f860a(0x376),_0x3f860a(0x32f),'AGI',_0x3f860a(0x277)];for(const _0x38228f of _0x439546){const _0x49b81e=_0x3f860a(0x243)[_0x3f860a(0x24b)](_0x38228f);_0x379a18[_0x3f860a(0x346)]['RegExp'][_0x3f860a(0x10a)][_0x3f860a(0x3a5)](new _0x3806eb(_0x49b81e,'i'));const _0x12fe33=_0x3f860a(0x48a)[_0x3f860a(0x24b)](_0x38228f);_0x5f10bf[_0x3f860a(0x346)]['RegExp'][_0x3f860a(0xcb)]['push'](new _0x41f691(_0x12fe33,'g'));}}}return!![];}if(_0x25633e['match'](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x352e0a=JSON[_0x3f860a(0x3fd)]('['+RegExp['$1'][_0x3f860a(0x3d9)](/\d+/g)+']');for(const _0xdd0de8 of _0x352e0a){if('hyrus'==='FkSFX')return _0x5e0863===null&&this[_0x3f860a(0x12f)]()[_0x3f860a(0x34d)](this[_0x3f860a(0x29e)]())?![]:_0x48827b[_0x3f860a(0x346)][_0x3f860a(0x1d7)][_0x3f860a(0x178)](this,_0x22c451);else{if(!$gameSwitches[_0x3f860a(0x118)](_0xdd0de8))return![];}}return!![];}if(_0x25633e[_0x3f860a(0x3d9)](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3f860a(0x1a9)===_0x3f860a(0x241))_0x1f141f=this[_0x3f860a(0x1a3)]-_0x5eb5b4;else{const _0x3b49ac=JSON['parse']('['+RegExp['$1'][_0x3f860a(0x3d9)](/\d+/g)+']');for(const _0x1617c6 of _0x3b49ac){if(_0x3f860a(0x4ef)===_0x3f860a(0x4ef)){if($gameSwitches[_0x3f860a(0x118)](_0x1617c6))return!![];}else _0x12bce0[_0x3f860a(0x346)][_0x3f860a(0x23c)][_0x3f860a(0x178)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x3f860a(0x317)]();}return![];}}if(_0x25633e['match'](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x10be82=JSON[_0x3f860a(0x3fd)]('['+RegExp['$1'][_0x3f860a(0x3d9)](/\d+/g)+']');for(const _0x43ddf7 of _0x10be82){if('NAHaY'!==_0x3f860a(0x422))return this['isProxyItem'](_0x4a7b1a)?(_0x179964=this[_0x3f860a(0x4f5)](_0x371c28)||_0x5022aa,this[_0x3f860a(0x220)](_0x27f6e6)?this[_0x3f860a(0x194)](_0x201cdc):_0x310348):_0x27a21e;else{if(!$gameSwitches['value'](_0x43ddf7))return!![];}}return![];}if(_0x25633e[_0x3f860a(0x3d9)](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3f860a(0x50d)===_0x3f860a(0x24f))return this[_0x3f860a(0x445)]();else{const _0x3190e9=JSON[_0x3f860a(0x3fd)]('['+RegExp['$1'][_0x3f860a(0x3d9)](/\d+/g)+']');for(const _0x34d06e of _0x3190e9){if(_0x3f860a(0x37a)==='NsHPE'){if(!$gameSwitches[_0x3f860a(0x118)](_0x34d06e))return!![];}else return _0x3bb0c2[_0x3f860a(0x42e)]()&&(_0x1f954c[_0x3f860a(0x3e7)](_0x3f860a(0x47d)[_0x3f860a(0x24b)](this[_0x3f860a(0x52e)][_0x3f860a(0x550)])),_0x5a6e05[_0x3f860a(0x3e7)](_0x119e03)),this[_0x3f860a(0x199)](),_0x3f860a(0x480);}return![];}}if(_0x25633e[_0x3f860a(0x3d9)](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2325d8=JSON[_0x3f860a(0x3fd)]('['+RegExp['$1'][_0x3f860a(0x3d9)](/\d+/g)+']');for(const _0x1a6b96 of _0x2325d8){if($gameSwitches['value'](_0x1a6b96))return![];}return!![];}return!![];},VisuMZ[_0x420e63(0x346)][_0x420e63(0x42c)]=Scene_Shop['prototype'][_0x420e63(0x1a6)],Scene_Shop[_0x420e63(0x125)][_0x420e63(0x1a6)]=function(){const _0x2d4521=_0x420e63;VisuMZ['ItemsEquipsCore'][_0x2d4521(0x42c)][_0x2d4521(0x178)](this),this[_0x2d4521(0x3f3)]()&&this[_0x2d4521(0x144)](),this[_0x2d4521(0x159)]();},Scene_Shop[_0x420e63(0x125)][_0x420e63(0x144)]=function(){const _0x27fabe=_0x420e63;this[_0x27fabe(0x119)]['hide'](),this['_buyWindow']['show'](),this[_0x27fabe(0x1a1)][_0x27fabe(0x120)](),this[_0x27fabe(0x291)][_0x27fabe(0x4ae)]();},VisuMZ[_0x420e63(0x346)]['Scene_Shop_helpWindowRect']=Scene_Shop[_0x420e63(0x125)][_0x420e63(0x37b)],Scene_Shop[_0x420e63(0x125)][_0x420e63(0x37b)]=function(){const _0xa3ad02=_0x420e63;return this[_0xa3ad02(0x3f3)]()?this[_0xa3ad02(0x4be)]():_0xa3ad02(0x412)!=='gMmDw'?_0x4520ec[_0xa3ad02(0x192)](_0x15a66e[_0xa3ad02(0x513)]/0x2):VisuMZ[_0xa3ad02(0x346)][_0xa3ad02(0x229)][_0xa3ad02(0x178)](this);},Scene_Shop[_0x420e63(0x125)][_0x420e63(0x4be)]=function(){const _0x488d8e=_0x420e63,_0x279c4a=0x0,_0x41cbc0=this['helpAreaTop'](),_0x3a1825=Graphics[_0x488d8e(0x513)],_0x348d82=this[_0x488d8e(0x343)]();return new Rectangle(_0x279c4a,_0x41cbc0,_0x3a1825,_0x348d82);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x56f)]=Scene_Shop['prototype'][_0x420e63(0x4df)],Scene_Shop['prototype'][_0x420e63(0x4df)]=function(){const _0x467310=_0x420e63;if(this[_0x467310(0x3f3)]())return this['goldWindowRectItemsEquipsCore']();else{if(_0x467310(0x196)!==_0x467310(0x196)){const _0x4d9d1e=_0x467310(0x230);if(this[_0x467310(0x105)]['rateMP']>=0x0&&this[_0x467310(0x105)][_0x467310(0x525)]>=0x0&&!this[_0x467310(0x4d7)][_0x4d9d1e])return![];const _0x1dec3c=this[_0x467310(0x3f4)]();this[_0x467310(0xe4)](_0x1dec3c,_0x4c0df9,_0x9cdbb3,_0x5da074,!![]);const _0x540c56=this[_0x467310(0x1ba)]();return this['changeTextColor'](_0x2e7f01['damageColor'](0x2)),this['drawItemKeyData'](_0x540c56,_0x17ccd7,_0x262bdc,_0x49ad98,![],'right'),this[_0x467310(0x4c9)](_0x450aa7,_0x230696,_0x4825d6),this[_0x467310(0x57c)](),!![];}else return VisuMZ[_0x467310(0x346)]['Scene_Shop_goldWindowRect'][_0x467310(0x178)](this);}},Scene_Shop[_0x420e63(0x125)]['goldWindowRectItemsEquipsCore']=function(){const _0x3f720a=_0x420e63,_0x2b5039=this[_0x3f720a(0x48b)](),_0x57ec5a=this[_0x3f720a(0x33a)](0x1,!![]),_0x5c3174=this[_0x3f720a(0x523)]()?0x0:Graphics[_0x3f720a(0x513)]-_0x2b5039,_0x5980ed=this[_0x3f720a(0x130)]();return new Rectangle(_0x5c3174,_0x5980ed,_0x2b5039,_0x57ec5a);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x111)]=Scene_Shop[_0x420e63(0x125)]['commandWindowRect'],Scene_Shop[_0x420e63(0x125)][_0x420e63(0x249)]=function(){const _0x3ecb56=_0x420e63;if(this[_0x3ecb56(0x3f3)]())return this['commandWindowRectItemsEquipsCore']();else{if('TRfLY'!==_0x3ecb56(0x28b))return VisuMZ['ItemsEquipsCore'][_0x3ecb56(0x111)][_0x3ecb56(0x178)](this);else this[_0x3ecb56(0x50e)]={},this['_newLabelOpacity']=0xff,this['_newLabelOpacityChange']=_0x43a1a6[_0x3ecb56(0x346)][_0x3ecb56(0x515)][_0x3ecb56(0x379)][_0x3ecb56(0x22b)],this['_newLabelOpacityUpperLimit']=_0x2e8e62[_0x3ecb56(0x346)][_0x3ecb56(0x515)]['New'][_0x3ecb56(0x50b)];}},Scene_Shop['prototype'][_0x420e63(0x511)]=function(){const _0x36689a=_0x420e63,_0x594935=this[_0x36689a(0x523)]()?this[_0x36689a(0x48b)]():0x0,_0x2ffcdc=this[_0x36689a(0x130)](),_0x3cd4ad=Graphics[_0x36689a(0x513)]-this[_0x36689a(0x48b)](),_0x331468=this[_0x36689a(0x33a)](0x1,!![]);return new Rectangle(_0x594935,_0x2ffcdc,_0x3cd4ad,_0x331468);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x579)]=Scene_Shop['prototype']['numberWindowRect'],Scene_Shop[_0x420e63(0x125)]['numberWindowRect']=function(){const _0x1c7557=_0x420e63;return this[_0x1c7557(0x3f3)]()?this[_0x1c7557(0x45c)]():VisuMZ['ItemsEquipsCore'][_0x1c7557(0x579)][_0x1c7557(0x178)](this);},Scene_Shop['prototype']['numberWindowRectItemsEquipsCore']=function(){const _0x451267=_0x420e63,_0x538f30=this[_0x451267(0x578)]['y']+this[_0x451267(0x578)]['height'],_0x171a9d=Graphics['boxWidth']-this[_0x451267(0xfc)](),_0x10e776=this[_0x451267(0x523)]()?Graphics[_0x451267(0x513)]-_0x171a9d:0x0,_0x164218=this[_0x451267(0x4e7)]()-this[_0x451267(0x578)]['height'];return new Rectangle(_0x10e776,_0x538f30,_0x171a9d,_0x164218);},VisuMZ['ItemsEquipsCore']['Scene_Shop_statusWindowRect']=Scene_Shop[_0x420e63(0x125)][_0x420e63(0x1ca)],Scene_Shop[_0x420e63(0x125)][_0x420e63(0x1ca)]=function(){const _0x4d474e=_0x420e63;return this[_0x4d474e(0x3f3)]()?this[_0x4d474e(0x137)]():VisuMZ[_0x4d474e(0x346)][_0x4d474e(0x1b6)][_0x4d474e(0x178)](this);},Scene_Shop[_0x420e63(0x125)][_0x420e63(0x137)]=function(){const _0x35bc60=_0x420e63,_0x577a19=this['statusWidth'](),_0x926df2=this[_0x35bc60(0x4e7)]()-this[_0x35bc60(0x578)][_0x35bc60(0x3a1)],_0x1a1c33=this['isRightInputMode']()?0x0:Graphics[_0x35bc60(0x513)]-_0x577a19,_0x43a20b=this[_0x35bc60(0x578)]['y']+this[_0x35bc60(0x578)][_0x35bc60(0x3a1)];return new Rectangle(_0x1a1c33,_0x43a20b,_0x577a19,_0x926df2);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x1e6)]=Scene_Shop['prototype'][_0x420e63(0x522)],Scene_Shop[_0x420e63(0x125)]['buyWindowRect']=function(){const _0x492695=_0x420e63;if(this[_0x492695(0x3f3)]()){if(_0x492695(0x364)===_0x492695(0x22c)){this[_0x492695(0x18e)]['refresh']();const _0x15ff4d=this[_0x492695(0x1f2)]['item'](),_0x130a12=this[_0x492695(0x18e)]['_data'][_0x492695(0x4c2)](_0x15ff4d),_0x4ba4d4=_0x5b36d8['floor'](this[_0x492695(0x18e)][_0x492695(0x417)]()/0x2)-0x1;this[_0x492695(0x18e)][_0x492695(0x3ef)](_0x130a12>=0x0?_0x130a12:0x0),this[_0x492695(0x18e)][_0x492695(0x2b8)]>0x1&&(this['_itemWindow'][_0x492695(0x2b8)]=0x1,this[_0x492695(0x18e)][_0x492695(0x2b1)]()),this[_0x492695(0x18e)][_0x492695(0x538)](this[_0x492695(0x18e)]['index']()-_0x4ba4d4);}else return this[_0x492695(0x29b)]();}else return'YHCVE'!==_0x492695(0x3ec)?_0x15d96c[_0x492695(0x384)]&&_0xfdc5c5['description'][_0x492695(0x34d)]('['+_0x4774a1+']'):VisuMZ[_0x492695(0x346)]['Scene_Shop_buyWindowRect'][_0x492695(0x178)](this);},Scene_Shop['prototype'][_0x420e63(0x29b)]=function(){const _0x56fb1a=_0x420e63,_0x2c8cbd=this['_commandWindow']['y']+this[_0x56fb1a(0x578)][_0x56fb1a(0x3a1)],_0x1a16be=Graphics[_0x56fb1a(0x513)]-this[_0x56fb1a(0xfc)](),_0x216609=this[_0x56fb1a(0x4e7)]()-this[_0x56fb1a(0x578)][_0x56fb1a(0x3a1)],_0xde811f=this['isRightInputMode']()?Graphics[_0x56fb1a(0x513)]-_0x1a16be:0x0;return new Rectangle(_0xde811f,_0x2c8cbd,_0x1a16be,_0x216609);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x227)]=Scene_Shop['prototype'][_0x420e63(0x386)],Scene_Shop[_0x420e63(0x125)][_0x420e63(0x386)]=function(){const _0x1bf2ad=_0x420e63;VisuMZ['ItemsEquipsCore'][_0x1bf2ad(0x227)]['call'](this),this[_0x1bf2ad(0x3ce)]()&&(_0x1bf2ad(0x1b5)!==_0x1bf2ad(0x1b5)?(_0x234d8d[_0x1bf2ad(0x346)][_0x1bf2ad(0x4bc)][_0x1bf2ad(0x178)](this,_0x453d1a),_0x100095[_0x1bf2ad(0x346)][_0x1bf2ad(0x526)](_0x3c7b1e,_0x2ff024)):this[_0x1bf2ad(0x28f)]());},VisuMZ[_0x420e63(0x346)][_0x420e63(0x305)]=Scene_Shop[_0x420e63(0x125)][_0x420e63(0x45f)],Scene_Shop['prototype'][_0x420e63(0x45f)]=function(){const _0x92ca83=_0x420e63;return this[_0x92ca83(0x3f3)]()?this[_0x92ca83(0x17e)]():VisuMZ[_0x92ca83(0x346)][_0x92ca83(0x305)][_0x92ca83(0x178)](this);},Scene_Shop[_0x420e63(0x125)]['categoryWindowRectItemsEquipsCore']=function(){const _0x613d93=_0x420e63,_0x3c181a=this[_0x613d93(0x578)]['y'],_0x3a154e=this[_0x613d93(0x578)]['width'],_0x9f85be=this['calcWindowHeight'](0x1,!![]),_0x2817cd=this['isRightInputMode']()?Graphics['boxWidth']-_0x3a154e:0x0;return new Rectangle(_0x2817cd,_0x3c181a,_0x3a154e,_0x9f85be);},Scene_Shop[_0x420e63(0x125)]['postCreateCategoryWindowItemsEquipsCore']=function(){const _0x2f9767=_0x420e63;delete this[_0x2f9767(0x551)][_0x2f9767(0x177)]['ok'],delete this[_0x2f9767(0x551)]['_handlers'][_0x2f9767(0x28e)];},VisuMZ[_0x420e63(0x346)][_0x420e63(0x3d2)]=Scene_Shop[_0x420e63(0x125)]['createSellWindow'],Scene_Shop[_0x420e63(0x125)][_0x420e63(0xda)]=function(){const _0x1cd556=_0x420e63;VisuMZ['ItemsEquipsCore'][_0x1cd556(0x3d2)][_0x1cd556(0x178)](this);if(this[_0x1cd556(0x3f3)]()){if(_0x1cd556(0x572)===_0x1cd556(0x394))return _0x206e16[_0x1cd556(0x539)][_0x1cd556(0x515)]['Param'][_0x1cd556(0x262)];else this[_0x1cd556(0x1f7)]();}},VisuMZ['ItemsEquipsCore'][_0x420e63(0x3bc)]=Scene_Shop[_0x420e63(0x125)]['sellWindowRect'],Scene_Shop[_0x420e63(0x125)][_0x420e63(0x224)]=function(){const _0x17c9ab=_0x420e63;if(this[_0x17c9ab(0x3f3)]())return'kPtKu'===_0x17c9ab(0x3c8)?_0x30078d[_0x17c9ab(0x346)]['Settings'][_0x17c9ab(0x139)]['NonRemoveETypes']:this[_0x17c9ab(0x445)]();else{if(_0x17c9ab(0x3be)!==_0x17c9ab(0x319))return VisuMZ[_0x17c9ab(0x346)][_0x17c9ab(0x3bc)][_0x17c9ab(0x178)](this);else this[_0x17c9ab(0x57c)](),_0x58d347[_0x17c9ab(0x346)][_0x17c9ab(0x515)][_0x17c9ab(0x139)]['DrawParamJS'][_0x17c9ab(0x178)](this);}},Scene_Shop[_0x420e63(0x125)][_0x420e63(0x445)]=function(){const _0x1d33f1=_0x420e63,_0x4e57a3=this[_0x1d33f1(0x551)]['y']+this[_0x1d33f1(0x551)][_0x1d33f1(0x3a1)],_0x20d6ba=Graphics[_0x1d33f1(0x513)]-this[_0x1d33f1(0xfc)](),_0xd99dc8=this['mainAreaHeight']()-this[_0x1d33f1(0x551)][_0x1d33f1(0x3a1)],_0x419e47=this[_0x1d33f1(0x523)]()?Graphics['boxWidth']-_0x20d6ba:0x0;return new Rectangle(_0x419e47,_0x4e57a3,_0x20d6ba,_0xd99dc8);},Scene_Shop[_0x420e63(0x125)][_0x420e63(0x1f7)]=function(){const _0x43e5ee=_0x420e63;this[_0x43e5ee(0x35e)][_0x43e5ee(0x176)](this[_0x43e5ee(0x291)]);},Scene_Shop['prototype'][_0x420e63(0xfc)]=function(){const _0x110bae=_0x420e63;return VisuMZ[_0x110bae(0x346)][_0x110bae(0x515)][_0x110bae(0x516)][_0x110bae(0x405)];},VisuMZ['ItemsEquipsCore']['Scene_Shop_activateSellWindow']=Scene_Shop[_0x420e63(0x125)][_0x420e63(0x281)],Scene_Shop[_0x420e63(0x125)][_0x420e63(0x281)]=function(){const _0x2791f1=_0x420e63;VisuMZ[_0x2791f1(0x346)][_0x2791f1(0x257)][_0x2791f1(0x178)](this),this[_0x2791f1(0x3f3)]()&&this[_0x2791f1(0x291)][_0x2791f1(0x4ae)](),this['_sellWindow'][_0x2791f1(0x55b)]();},VisuMZ[_0x420e63(0x346)]['Scene_Shop_commandBuy']=Scene_Shop[_0x420e63(0x125)]['commandBuy'],Scene_Shop['prototype'][_0x420e63(0x31f)]=function(){const _0x3ffffc=_0x420e63;VisuMZ['ItemsEquipsCore'][_0x3ffffc(0x146)][_0x3ffffc(0x178)](this),this[_0x3ffffc(0x3f3)]()&&this[_0x3ffffc(0xe0)]();},Scene_Shop[_0x420e63(0x125)][_0x420e63(0xe0)]=function(){const _0x3415eb=_0x420e63;this[_0x3415eb(0x52a)]=this[_0x3415eb(0x52a)]||0x0,this['_buyWindow'][_0x3415eb(0x3ef)](this[_0x3415eb(0x52a)]);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x4af)]=Scene_Shop[_0x420e63(0x125)][_0x420e63(0x35b)],Scene_Shop[_0x420e63(0x125)][_0x420e63(0x35b)]=function(){const _0x3bb4ed=_0x420e63;VisuMZ['ItemsEquipsCore']['Scene_Shop_commandSell'][_0x3bb4ed(0x178)](this),this[_0x3bb4ed(0x3f3)]()&&this[_0x3bb4ed(0x11e)](),this[_0x3bb4ed(0x3ce)]()&&(this['_categoryWindow']['smoothSelect'](0x0),this[_0x3bb4ed(0x39a)]());},Scene_Shop[_0x420e63(0x125)][_0x420e63(0x11e)]=function(){const _0x423137=_0x420e63;this[_0x423137(0x1a1)][_0x423137(0xf4)](),this['_commandWindow'][_0x423137(0xf4)]();},VisuMZ[_0x420e63(0x346)][_0x420e63(0x36d)]=Scene_Shop['prototype'][_0x420e63(0x4b2)],Scene_Shop[_0x420e63(0x125)][_0x420e63(0x4b2)]=function(){const _0x3b8abf=_0x420e63;VisuMZ['ItemsEquipsCore'][_0x3b8abf(0x36d)][_0x3b8abf(0x178)](this),this[_0x3b8abf(0x3f3)]()&&(_0x3b8abf(0x180)!=='xWWIR'?this[_0x3b8abf(0x377)]():(_0x5e41e4['a']=_0x219ec0,_0x47cb94['b']=_0x35c83c));},Scene_Shop[_0x420e63(0x125)][_0x420e63(0x377)]=function(){const _0x590a21=_0x420e63;this[_0x590a21(0x52a)]=this[_0x590a21(0x1a1)][_0x590a21(0x236)](),this[_0x590a21(0x1a1)][_0x590a21(0x4ae)](),this[_0x590a21(0x1a1)][_0x590a21(0x120)](),this[_0x590a21(0x1a1)][_0x590a21(0x55d)](0x0,0x0),this[_0x590a21(0x291)][_0x590a21(0x4ae)](),this['_dummyWindow']['hide']();},VisuMZ[_0x420e63(0x346)]['Scene_Shop_onCategoryCancel']=Scene_Shop[_0x420e63(0x125)][_0x420e63(0x201)],Scene_Shop[_0x420e63(0x125)]['onCategoryCancel']=function(){const _0x43d32d=_0x420e63;VisuMZ[_0x43d32d(0x346)]['Scene_Shop_onCategoryCancel'][_0x43d32d(0x178)](this),this[_0x43d32d(0x3f3)]()&&this['onCategoryCancelItemsEquipsCore']();},Scene_Shop[_0x420e63(0x125)][_0x420e63(0x317)]=function(){const _0x2a3a6f=_0x420e63;this[_0x2a3a6f(0x1a1)][_0x2a3a6f(0x4ae)](),this['_commandWindow'][_0x2a3a6f(0x4ae)]();},VisuMZ[_0x420e63(0x346)]['Scene_Shop_onBuyOk']=Scene_Shop['prototype'][_0x420e63(0x40a)],Scene_Shop['prototype'][_0x420e63(0x40a)]=function(){const _0x347b36=_0x420e63;$gameTemp[_0x347b36(0x163)]=!![],VisuMZ['ItemsEquipsCore'][_0x347b36(0xdc)][_0x347b36(0x178)](this),$gameTemp[_0x347b36(0x163)]=![],this[_0x347b36(0x52e)]=this[_0x347b36(0x1a1)][_0x347b36(0x521)]();},VisuMZ[_0x420e63(0x346)][_0x420e63(0xce)]=Scene_Shop['prototype'][_0x420e63(0x1a0)],Scene_Shop['prototype'][_0x420e63(0x1a0)]=function(){const _0x52b77e=_0x420e63;$gameTemp[_0x52b77e(0x163)]=!![],this[_0x52b77e(0x52e)]=this[_0x52b77e(0x1a1)]['item']();const _0x8f8023=VisuMZ[_0x52b77e(0x346)]['Scene_Shop_buyingPrice'][_0x52b77e(0x178)](this);return $gameTemp[_0x52b77e(0x163)]=![],this[_0x52b77e(0x52e)]=this[_0x52b77e(0x1a1)][_0x52b77e(0x521)](),_0x8f8023;},VisuMZ['ItemsEquipsCore'][_0x420e63(0x55e)]=Scene_Shop['prototype'][_0x420e63(0x31d)],Scene_Shop[_0x420e63(0x125)][_0x420e63(0x31d)]=function(){const _0x37a28c=_0x420e63;VisuMZ['ItemsEquipsCore'][_0x37a28c(0x55e)][_0x37a28c(0x178)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x37a28c(0x25c)]();},Scene_Shop['prototype'][_0x420e63(0x25c)]=function(){const _0x507bbb=_0x420e63;this[_0x507bbb(0x551)][_0x507bbb(0x4ae)]();},VisuMZ[_0x420e63(0x346)][_0x420e63(0x154)]=Scene_Shop[_0x420e63(0x125)][_0x420e63(0x3ac)],Scene_Shop[_0x420e63(0x125)][_0x420e63(0x3ac)]=function(){const _0x4ab26a=_0x420e63;VisuMZ[_0x4ab26a(0x346)][_0x4ab26a(0x154)][_0x4ab26a(0x178)](this),this[_0x4ab26a(0x3ce)]()&&this[_0x4ab26a(0x201)](),this[_0x4ab26a(0x3f3)]()&&this['_dummyWindow']['hide']();},Scene_Shop[_0x420e63(0x125)][_0x420e63(0xd8)]=function(_0x4d7cae){const _0x282f9a=_0x420e63,_0x21ae06=this['_item'];this[_0x282f9a(0x52e)]=_0x4d7cae;const _0x2f7fbe=this[_0x282f9a(0x1ec)]();return this[_0x282f9a(0x52e)]=_0x21ae06,_0x2f7fbe;},VisuMZ[_0x420e63(0x346)][_0x420e63(0x505)]=Scene_Shop['prototype']['sellingPrice'],Scene_Shop[_0x420e63(0x125)][_0x420e63(0x1ec)]=function(){const _0x3304c9=_0x420e63;let _0x555d71=this[_0x3304c9(0x222)]();const _0x3e62c4=this[_0x3304c9(0x52e)];return _0x555d71=VisuMZ[_0x3304c9(0x346)][_0x3304c9(0x515)][_0x3304c9(0x3d3)][_0x3304c9(0x541)][_0x3304c9(0x178)](this,_0x3e62c4,_0x555d71),_0x555d71;},Scene_Shop['prototype'][_0x420e63(0x222)]=function(){const _0x1de425=_0x420e63;let _0x5dac50=this[_0x1de425(0x52e)]['price'];if(!this[_0x1de425(0x52e)])return'uJoYk'===_0x1de425(0x4e4)?this[_0x1de425(0x468)]():0x0;else{if(this['_item'][_0x1de425(0x32d)][_0x1de425(0x3d9)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){if(_0x1de425(0x10f)==='nTcdp')this['_buyWindowLastIndex']=this[_0x1de425(0x1a1)]['index'](),this[_0x1de425(0x1a1)][_0x1de425(0x4ae)](),this['_buyWindow'][_0x1de425(0x120)](),this[_0x1de425(0x1a1)][_0x1de425(0x55d)](0x0,0x0),this[_0x1de425(0x291)][_0x1de425(0x4ae)](),this[_0x1de425(0x119)][_0x1de425(0xf4)]();else{const _0x43ad65=String(RegExp['$1']);let _0x3096cf=this[_0x1de425(0x52e)],_0x20aab6=_0x5dac50*this[_0x1de425(0x52b)]();try{eval(_0x43ad65);}catch(_0x17d462){if($gameTemp[_0x1de425(0x42e)]())console['log'](_0x17d462);}if(isNaN(_0x20aab6))_0x20aab6=0x0;return Math[_0x1de425(0x192)](_0x20aab6);}}else return this[_0x1de425(0x52e)][_0x1de425(0x32d)]['match'](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):'rsoyw'!==_0x1de425(0x23d)?_0x1de425(0xdd):Math[_0x1de425(0x192)](this[_0x1de425(0x46d)]());}},Scene_Shop[_0x420e63(0x125)]['baseSellingPrice']=function(){const _0x5a6a80=_0x420e63;return this['_item'][_0x5a6a80(0x47b)]*this[_0x5a6a80(0x52b)]();},Scene_Shop[_0x420e63(0x125)][_0x420e63(0x52b)]=function(){const _0x3c2f96=_0x420e63;return VisuMZ[_0x3c2f96(0x346)][_0x3c2f96(0x515)][_0x3c2f96(0x3d3)][_0x3c2f96(0x435)];},Scene_Shop[_0x420e63(0x125)][_0x420e63(0x22f)]=function(){const _0x33e286=_0x420e63;if(!this['updatedLayoutStyle']())return![];if(!this[_0x33e286(0x3ce)]())return![];if(!this['_sellWindow'])return![];if(!this[_0x33e286(0x35e)][_0x33e286(0x401)])return![];return this[_0x33e286(0x32a)]()&&this[_0x33e286(0x3ce)]();},Scene_Shop[_0x420e63(0x125)][_0x420e63(0xd2)]=function(){const _0x2300e9=_0x420e63;if(this[_0x2300e9(0x22f)]())return this[_0x2300e9(0x35e)][_0x2300e9(0x2fc)]()===0x1?_0x2300e9(0x404)!==_0x2300e9(0x127)?TextManager['getInputMultiButtonStrings'](_0x2300e9(0x501),_0x2300e9(0x4eb)):_0x306034[_0x2300e9(0x346)][_0x2300e9(0x515)][_0x2300e9(0x3d3)][_0x2300e9(0xf5)]:TextManager[_0x2300e9(0x283)](_0x2300e9(0x383),'pagedown');else{if(this[_0x2300e9(0x17b)]&&this['_numberWindow']['active'])return TextManager[_0x2300e9(0x283)](_0x2300e9(0x501),'right');}return Scene_MenuBase[_0x2300e9(0x125)][_0x2300e9(0xd2)][_0x2300e9(0x178)](this);},Scene_Shop['prototype'][_0x420e63(0x225)]=function(){const _0x3e59bb=_0x420e63;if(this[_0x3e59bb(0x17b)]&&this[_0x3e59bb(0x17b)]['active']){if(_0x3e59bb(0x1c2)===_0x3e59bb(0x240)){const _0x634fbc=this['isRightInputMode']()?0x0:_0x566590[_0x3e59bb(0x513)]-this[_0x3e59bb(0xfc)](),_0x49a25a=this[_0x3e59bb(0x130)](),_0x47cace=this[_0x3e59bb(0xfc)](),_0x5cd444=this[_0x3e59bb(0x4e7)]();return new _0x47338c(_0x634fbc,_0x49a25a,_0x47cace,_0x5cd444);}else return TextManager[_0x3e59bb(0x283)]('up',_0x3e59bb(0x436));}return Scene_MenuBase[_0x3e59bb(0x125)]['buttonAssistKey2'][_0x3e59bb(0x178)](this);},Scene_Shop['prototype'][_0x420e63(0x2b7)]=function(){const _0x21b13f=_0x420e63;if(this[_0x21b13f(0x22f)]()){if(_0x21b13f(0x425)===_0x21b13f(0x425))return VisuMZ['ItemsEquipsCore'][_0x21b13f(0x515)][_0x21b13f(0x2a2)][_0x21b13f(0x441)];else{this[_0x21b13f(0x57c)](),this[_0x21b13f(0x35d)][_0x21b13f(0x536)]=this['smallParamFontSize']();let _0x39d598=this[_0x21b13f(0x4d2)](_0x185d2e['param'](_0x2cbe0f))+0x4+_0x1479d7;return _0x262472[_0x21b13f(0x51f)]?(this[_0x21b13f(0x221)](_0xe337ce,_0x3e3eed,_0x3dc36d,_0x20ec6a,!![]),_0x3e2232[_0x21b13f(0x539)][_0x21b13f(0x515)][_0x21b13f(0x1eb)][_0x21b13f(0x49c)]&&(_0x39d598+=_0x5041e8[_0x21b13f(0x413)]+0x4)):(this[_0x21b13f(0x36a)](_0x4ff34a[_0x21b13f(0x1cb)]()),this[_0x21b13f(0x4a8)](_0x1f1a83[_0x21b13f(0x385)](_0x2e9068),_0x2cce65,_0x1be735,_0x5ad734)),this[_0x21b13f(0x57c)](),_0x39d598;}}else{if(this[_0x21b13f(0x17b)]&&this[_0x21b13f(0x17b)][_0x21b13f(0x401)])return VisuMZ[_0x21b13f(0x346)][_0x21b13f(0x515)][_0x21b13f(0x3d3)][_0x21b13f(0x27b)];}return Scene_MenuBase[_0x21b13f(0x125)][_0x21b13f(0x2b7)][_0x21b13f(0x178)](this);},Scene_Shop[_0x420e63(0x125)][_0x420e63(0x46e)]=function(){const _0x44ab8c=_0x420e63;if(this[_0x44ab8c(0x17b)]&&this[_0x44ab8c(0x17b)][_0x44ab8c(0x401)])return VisuMZ[_0x44ab8c(0x346)][_0x44ab8c(0x515)][_0x44ab8c(0x3d3)][_0x44ab8c(0x447)];return Scene_MenuBase['prototype']['buttonAssistText2'][_0x44ab8c(0x178)](this);},Scene_Shop['prototype'][_0x420e63(0x159)]=function(){const _0x4bd3a3=_0x420e63;if(!SceneManager[_0x4bd3a3(0x2ec)]())return;const _0x3d7906=VisuMZ[_0x4bd3a3(0x346)][_0x4bd3a3(0x515)]['ShopScene'];if(_0x3d7906['SwitchBuy']){if(_0x4bd3a3(0xd3)!==_0x4bd3a3(0xd3)){const _0x5cdaf1=_0x4bd3a3(0x2a4);if(this[_0x4bd3a3(0x4d7)][_0x5cdaf1])return this[_0x4bd3a3(0x4d7)][_0x5cdaf1];const _0x51b7a3='×%1';return _0x51b7a3['format'](this[_0x4bd3a3(0x52e)][_0x4bd3a3(0x1fa)]);}else $gameSwitches[_0x4bd3a3(0x2ee)](_0x3d7906[_0x4bd3a3(0x369)],![]);}if(_0x3d7906[_0x4bd3a3(0x24e)]){if('auGae'===_0x4bd3a3(0x33b)){const _0x42e9a0=_0x3bf9cf[_0x4bd3a3(0x346)]['RegExp'][_0x4bd3a3(0x10a)][_0x5e6974];_0xbe40d9[_0x4bd3a3(0x32d)][_0x4bd3a3(0x3d9)](_0x42e9a0)&&(_0x3c29d1[_0x4bd3a3(0x3b5)][_0x508baa]=_0x2fc697(_0x228896['$1']));}else $gameSwitches[_0x4bd3a3(0x2ee)](_0x3d7906[_0x4bd3a3(0x24e)],![]);}},VisuMZ[_0x420e63(0x346)][_0x420e63(0x481)]=Scene_Shop[_0x420e63(0x125)][_0x420e63(0x2d9)],Scene_Shop[_0x420e63(0x125)][_0x420e63(0x2d9)]=function(_0x26b4d0){const _0x10985e=_0x420e63;VisuMZ[_0x10985e(0x346)]['Scene_Shop_doBuy'][_0x10985e(0x178)](this,_0x26b4d0);if(_0x26b4d0<=0x0)return;const _0x119bc6=VisuMZ[_0x10985e(0x346)]['Settings'][_0x10985e(0x3d3)];if(_0x119bc6[_0x10985e(0x369)]){if('bQMRy'==='bQMRy')$gameSwitches[_0x10985e(0x2ee)](_0x119bc6[_0x10985e(0x369)],!![]);else{if(!_0x12ccef)return 0x0;let _0x8e44fa=_0x702188[_0x10985e(0x346)][_0x10985e(0x278)][_0x10985e(0x178)](this,_0x3a7b1c);return _0x21390f[_0x10985e(0x223)](0x0,this['modifiedBuyPriceItemsEquipsCore'](_0x4e96a1,_0x8e44fa));}}},VisuMZ[_0x420e63(0x346)][_0x420e63(0x4f2)]=Scene_Shop[_0x420e63(0x125)]['doSell'],Scene_Shop[_0x420e63(0x125)][_0x420e63(0x27d)]=function(_0x2e27b5){const _0x4b4488=_0x420e63;VisuMZ[_0x4b4488(0x346)]['Scene_Shop_doSell']['call'](this,_0x2e27b5);if(_0x2e27b5<=0x0)return;const _0x1ca7b1=VisuMZ[_0x4b4488(0x346)]['Settings'][_0x4b4488(0x3d3)];_0x1ca7b1[_0x4b4488(0x369)]&&$gameSwitches['setValue'](_0x1ca7b1[_0x4b4488(0x24e)],!![]);};function Sprite_NewLabel(){this['initialize'](...arguments);}Sprite_NewLabel[_0x420e63(0x125)]=Object[_0x420e63(0x1a6)](Sprite['prototype']),Sprite_NewLabel[_0x420e63(0x125)][_0x420e63(0xef)]=Sprite_NewLabel,Sprite_NewLabel[_0x420e63(0x125)][_0x420e63(0x307)]=function(){const _0x1f869c=_0x420e63;Sprite[_0x1f869c(0x125)][_0x1f869c(0x307)][_0x1f869c(0x178)](this),this[_0x1f869c(0x22e)]();},Sprite_NewLabel['prototype'][_0x420e63(0x22e)]=function(){const _0x27f39c=_0x420e63,_0x1e08a9=ImageManager[_0x27f39c(0x413)],_0x542ee1=ImageManager['iconHeight'];this[_0x27f39c(0x410)]=new Bitmap(_0x1e08a9,_0x542ee1),this[_0x27f39c(0x179)](),this[_0x27f39c(0x39f)]();},Sprite_NewLabel[_0x420e63(0x125)][_0x420e63(0x179)]=function(){const _0x31bbc9=_0x420e63,_0x2c3b4f=VisuMZ['ItemsEquipsCore']['Settings']['New'][_0x31bbc9(0x1c4)];if(_0x2c3b4f<=0x0)return;const _0x3dd839=ImageManager[_0x31bbc9(0x24c)](_0x31bbc9(0x3b1)),_0x5e6f94=ImageManager[_0x31bbc9(0x413)],_0xab3032=ImageManager['iconHeight'],_0x964041=_0x2c3b4f%0x10*_0x5e6f94,_0x377f80=Math[_0x31bbc9(0x192)](_0x2c3b4f/0x10)*_0xab3032;this['bitmap']['blt'](_0x3dd839,_0x964041,_0x377f80,_0x5e6f94,_0xab3032,0x0,0x0);},Sprite_NewLabel['prototype'][_0x420e63(0x39f)]=function(){const _0x3d6ab9=_0x420e63,_0x2eb393=VisuMZ['ItemsEquipsCore'][_0x3d6ab9(0x515)][_0x3d6ab9(0x379)],_0x264fce=_0x2eb393[_0x3d6ab9(0x55f)];if(_0x264fce==='')return;const _0xde828e=ImageManager[_0x3d6ab9(0x413)],_0x168a94=ImageManager[_0x3d6ab9(0x35c)];this[_0x3d6ab9(0x410)]['fontFace']=_0x2eb393[_0x3d6ab9(0x350)]||$gameSystem['mainFontFace'](),this['bitmap'][_0x3d6ab9(0x4e2)]=this['getTextColor'](),this[_0x3d6ab9(0x410)][_0x3d6ab9(0x536)]=_0x2eb393[_0x3d6ab9(0x1b0)],this['bitmap'][_0x3d6ab9(0x4a8)](_0x264fce,0x0,_0x168a94/0x2,_0xde828e,_0x168a94/0x2,_0x3d6ab9(0x263));},Sprite_NewLabel['prototype'][_0x420e63(0x2e9)]=function(){const _0x447af8=_0x420e63,_0x5f4a47=VisuMZ['ItemsEquipsCore'][_0x447af8(0x515)][_0x447af8(0x379)][_0x447af8(0x432)];return _0x5f4a47[_0x447af8(0x3d9)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x447af8(0x4e2)](_0x5f4a47);},Window_Base['prototype']['drawItemName']=function(_0x1a56fc,_0xac7b40,_0x5af393,_0x33a55a){const _0x3c9c20=_0x420e63;if(_0x1a56fc){const _0x345cfb=_0x5af393+(this[_0x3c9c20(0xf3)]()-ImageManager[_0x3c9c20(0x35c)])/0x2,_0x440d94=ImageManager['iconWidth']+0x4,_0x15e660=Math[_0x3c9c20(0x223)](0x0,_0x33a55a-_0x440d94);this[_0x3c9c20(0x36a)](ColorManager[_0x3c9c20(0x297)](_0x1a56fc)),this[_0x3c9c20(0x334)](_0x1a56fc[_0x3c9c20(0x23e)],_0xac7b40,_0x345cfb),this['drawText'](_0x1a56fc[_0x3c9c20(0x550)],_0xac7b40+_0x440d94,_0x5af393,_0x15e660),this[_0x3c9c20(0x3fb)]();}},Window_Base[_0x420e63(0x125)]['drawItemNumber']=function(_0x562958,_0x3687ae,_0x3a1271,_0x2f1859){const _0x2bb561=_0x420e63;if(this[_0x2bb561(0x4b3)](_0x562958)){if(_0x2bb561(0x1d8)==='IbUkN'){const _0x5380e0=_0x2bb561(0x437);if(this[_0x2bb561(0x4d7)][_0x5380e0])return this[_0x2bb561(0x4d7)][_0x5380e0];if(this[_0x2bb561(0x52e)][_0x2bb561(0x3b7)][_0x2bb561(0x4dd)]<=-0x1)return _0x3700f1[_0x2bb561(0x346)][_0x2bb561(0x515)][_0x2bb561(0x516)][_0x2bb561(0x54e)];else return this[_0x2bb561(0x52e)][_0x2bb561(0x3b7)][_0x2bb561(0x4dd)]===0x0?_0x260752['ItemsEquipsCore'][_0x2bb561(0x515)][_0x2bb561(0x516)][_0x2bb561(0x2ad)]:_0x806410[_0x2bb561(0x349)][this[_0x2bb561(0x52e)][_0x2bb561(0x3b7)][_0x2bb561(0x4dd)]];}else{this[_0x2bb561(0x57c)]();const _0x3fc2ac=VisuMZ[_0x2bb561(0x346)][_0x2bb561(0x515)][_0x2bb561(0x2a2)],_0x46d0be=_0x3fc2ac[_0x2bb561(0xf6)],_0xd53dc9=_0x46d0be['format']($gameParty[_0x2bb561(0x3e1)](_0x562958));this['contents']['fontSize']=_0x3fc2ac[_0x2bb561(0x153)],this[_0x2bb561(0x4a8)](_0xd53dc9,_0x3687ae,_0x3a1271,_0x2f1859,'right'),this[_0x2bb561(0x57c)]();}}},Window_Base[_0x420e63(0x125)][_0x420e63(0x4b3)]=function(_0x35217f){const _0x499c84=_0x420e63;if(DataManager[_0x499c84(0x276)](_0x35217f))return $dataSystem[_0x499c84(0xe2)];return!![];},Window_Base['prototype'][_0x420e63(0x4c9)]=function(_0x29057f,_0x241381,_0x509f82,_0x18c001,_0x1b44a2){const _0x343eaa=_0x420e63;_0x1b44a2=Math[_0x343eaa(0x223)](_0x1b44a2||0x1,0x1);while(_0x1b44a2--){_0x18c001=_0x18c001||this[_0x343eaa(0xf3)](),this[_0x343eaa(0x3fa)]['paintOpacity']=0xa0;const _0x374fd1=ColorManager[_0x343eaa(0x40b)]();this['contentsBack'][_0x343eaa(0x174)](_0x29057f+0x1,_0x241381+0x1,_0x509f82-0x2,_0x18c001-0x2,_0x374fd1),this['contentsBack'][_0x343eaa(0x304)]=0xff;}},VisuMZ['ItemsEquipsCore']['Window_Selectable_initialize']=Window_Selectable[_0x420e63(0x125)][_0x420e63(0x307)],Window_Selectable['prototype'][_0x420e63(0x307)]=function(_0x115fc4){const _0x2b4afd=_0x420e63;this[_0x2b4afd(0x431)](),VisuMZ[_0x2b4afd(0x346)][_0x2b4afd(0x10c)][_0x2b4afd(0x178)](this,_0x115fc4);},Window_Selectable['prototype'][_0x420e63(0x431)]=function(){const _0x415485=_0x420e63;this[_0x415485(0x50e)]={},this['_newLabelOpacity']=0xff,this['_newLabelOpacityChange']=VisuMZ['ItemsEquipsCore']['Settings'][_0x415485(0x379)][_0x415485(0x22b)],this[_0x415485(0x28c)]=VisuMZ[_0x415485(0x346)][_0x415485(0x515)][_0x415485(0x379)][_0x415485(0x50b)];},Window_Selectable[_0x420e63(0x125)][_0x420e63(0x1ad)]=function(){return![];},VisuMZ[_0x420e63(0x346)][_0x420e63(0x3c2)]=Window_Selectable['prototype'][_0x420e63(0x3b3)],Window_Selectable['prototype'][_0x420e63(0x3b3)]=function(_0x52a402){const _0x1914ee=_0x420e63;VisuMZ[_0x1914ee(0x346)]['Window_Selectable_setHelpWindowItem'][_0x1914ee(0x178)](this,_0x52a402);if(this[_0x1914ee(0x1ad)]())this['clearNewLabelFromItem'](_0x52a402);},Window_Selectable['prototype'][_0x420e63(0x49a)]=function(_0x5c163f){const _0x1284de=_0x420e63;if(!_0x5c163f)return;$gameParty[_0x1284de(0x309)](_0x5c163f);let _0x457b92='';if(DataManager['isItem'](_0x5c163f))_0x457b92=_0x1284de(0x567)[_0x1284de(0x24b)](_0x5c163f['id']);else{if(DataManager[_0x1284de(0x520)](_0x5c163f)){if('gxQty'==='ZiTcB')return _0x4651bd[_0x1284de(0x125)]['colSpacing'][_0x1284de(0x178)](this);else _0x457b92=_0x1284de(0x1c9)['format'](_0x5c163f['id']);}else{if(DataManager[_0x1284de(0x272)](_0x5c163f))_0x457b92='armor-%1'['format'](_0x5c163f['id']);else return;}}const _0x3a1182=this[_0x1284de(0x50e)][_0x457b92];if(_0x3a1182)_0x3a1182['hide']();},VisuMZ['ItemsEquipsCore'][_0x420e63(0x4c5)]=Window_Selectable[_0x420e63(0x125)][_0x420e63(0x429)],Window_Selectable[_0x420e63(0x125)]['refresh']=function(){const _0x253e09=_0x420e63;this['hideNewLabelSprites'](),VisuMZ[_0x253e09(0x346)][_0x253e09(0x4c5)]['call'](this);},Window_Selectable[_0x420e63(0x125)]['hideNewLabelSprites']=function(){const _0x132c04=_0x420e63;for(const _0x3ea0ab of Object[_0x132c04(0x2e1)](this['_newLabelSprites'])){_0x3ea0ab[_0x132c04(0xf4)]();}},VisuMZ[_0x420e63(0x346)]['Window_Selectable_update']=Window_Selectable['prototype'][_0x420e63(0x27f)],Window_Selectable['prototype'][_0x420e63(0x27f)]=function(){const _0x42a187=_0x420e63;this[_0x42a187(0x487)](),VisuMZ['ItemsEquipsCore']['Window_Selectable_update']['call'](this);},Window_Selectable[_0x420e63(0x125)][_0x420e63(0x487)]=function(){const _0x544826=_0x420e63;if(!this['isShowNew']())return;const _0x4874a2=this['_newLabelOpacityUpperLimit'];this[_0x544826(0x2a0)]+=this[_0x544826(0x3d4)];if(this[_0x544826(0x2a0)]>=_0x4874a2||this[_0x544826(0x2a0)]<=0x0){if(_0x544826(0x3ad)===_0x544826(0x3ad))this['_newLabelOpacityChange']*=-0x1;else{const _0xb7f78c=_0x1f1137(_0x4dac8f['$1']),_0x50d2d0=_0x544826(0x482)['format'](_0xb7f78c);_0x592bee[_0x544826(0x346)]['itemEnableJS'][_0x275e01['id']]=new _0x132e44(_0x544826(0x521),_0x50d2d0);}}this[_0x544826(0x2a0)]=this[_0x544826(0x2a0)][_0x544826(0x4cf)](0x0,_0x4874a2);for(const _0x4b54e5 of Object['values'](this[_0x544826(0x50e)])){_0x4b54e5[_0x544826(0x465)]=this[_0x544826(0x2a0)];}},Window_Selectable[_0x420e63(0x125)][_0x420e63(0x239)]=function(_0x18be33){const _0x33ec14=_0x420e63,_0x5e6794=this['_newLabelSprites'];if(_0x5e6794[_0x18be33])return _0x5e6794[_0x18be33];else{if('NNHRa'!==_0x33ec14(0x112)){const _0x4f4a74=new Sprite_NewLabel();return _0x5e6794[_0x18be33]=_0x4f4a74,this[_0x33ec14(0x15b)](_0x4f4a74),_0x4f4a74;}else return _0x4e2866['ItemsEquipsCore'][_0x33ec14(0x1d7)][_0x33ec14(0x178)](this,_0x324602);}},Window_Selectable[_0x420e63(0x125)][_0x420e63(0x514)]=function(_0x2d27b6,_0x6d11ea,_0xcd1f42){const _0x4970bf=_0x420e63;let _0x3baeba='';if(DataManager[_0x4970bf(0x495)](_0x2d27b6))_0x3baeba=_0x4970bf(0x567)['format'](_0x2d27b6['id']);else{if(DataManager[_0x4970bf(0x520)](_0x2d27b6))'AqXkS'===_0x4970bf(0x45a)?_0x5c2afe=_0x31fdb2[_0x4970bf(0x251)][_0x456127(_0x20dc2['$1'])]||'':_0x3baeba=_0x4970bf(0x1c9)[_0x4970bf(0x24b)](_0x2d27b6['id']);else{if(DataManager[_0x4970bf(0x272)](_0x2d27b6))_0x3baeba=_0x4970bf(0x212)[_0x4970bf(0x24b)](_0x2d27b6['id']);else{if(_0x4970bf(0x1ee)!==_0x4970bf(0x1ee)){const _0x185a1d=0x0,_0x241bcf=this[_0x4970bf(0x280)](),_0x5a2502=_0xa95c9a[_0x4970bf(0x513)],_0x3c6e2c=this[_0x4970bf(0x343)]();return new _0x44f84d(_0x185a1d,_0x241bcf,_0x5a2502,_0x3c6e2c);}else return;}}}const _0xb6f05d=this['createNewLabelSprite'](_0x3baeba);_0xb6f05d[_0x4970bf(0x38c)](_0x6d11ea,_0xcd1f42),_0xb6f05d[_0x4970bf(0x4ae)](),_0xb6f05d[_0x4970bf(0x465)]=this['_newLabelOpacity'];},Window_ItemCategory[_0x420e63(0x43c)]=VisuMZ[_0x420e63(0x346)][_0x420e63(0x515)]['Categories'][_0x420e63(0x298)],Window_ItemCategory[_0x420e63(0x48f)]=['HiddenItemA',_0x420e63(0x231),'Nonconsumable',_0x420e63(0x135),_0x420e63(0x218),'BattleUsable','FieldUsable',_0x420e63(0x28d)],VisuMZ[_0x420e63(0x346)][_0x420e63(0xd6)]=Window_ItemCategory[_0x420e63(0x125)]['initialize'],Window_ItemCategory[_0x420e63(0x125)]['initialize']=function(_0x440222){const _0x3ee928=_0x420e63;VisuMZ['ItemsEquipsCore'][_0x3ee928(0xd6)][_0x3ee928(0x178)](this,_0x440222),this['createCategoryNameWindow'](_0x440222);},Window_ItemCategory['prototype'][_0x420e63(0x2c9)]=function(_0x4349df){const _0x491c71=_0x420e63,_0xe1e7f2=new Rectangle(0x0,0x0,_0x4349df[_0x491c71(0x4b7)],_0x4349df[_0x491c71(0x3a1)]);this['_categoryNameWindow']=new Window_Base(_0xe1e7f2),this[_0x491c71(0x185)]['opacity']=0x0,this[_0x491c71(0x52c)](this[_0x491c71(0x185)]),this[_0x491c71(0x1cf)]();},Window_ItemCategory[_0x420e63(0x125)][_0x420e63(0x3ce)]=function(){const _0x1f446c=_0x420e63;return Imported[_0x1f446c(0x51f)]&&Window_HorzCommand['prototype'][_0x1f446c(0x3ce)][_0x1f446c(0x178)](this);},Window_ItemCategory['prototype'][_0x420e63(0x390)]=function(){},Window_ItemCategory[_0x420e63(0x125)][_0x420e63(0x540)]=function(){const _0x166292=_0x420e63;if(!this[_0x166292(0x3ce)]())Window_HorzCommand[_0x166292(0x125)][_0x166292(0x540)][_0x166292(0x178)](this);},Window_ItemCategory['prototype'][_0x420e63(0x2fc)]=function(){const _0x521178=_0x420e63;return this[_0x521178(0x3d6)]?this['maxItems']():0x4;},Window_ItemCategory['prototype'][_0x420e63(0x27f)]=function(){const _0x4fa4c6=_0x420e63;Window_HorzCommand[_0x4fa4c6(0x125)][_0x4fa4c6(0x27f)][_0x4fa4c6(0x178)](this),this[_0x4fa4c6(0x18e)]&&this[_0x4fa4c6(0x18e)][_0x4fa4c6(0x1e4)](this[_0x4fa4c6(0x50a)]());},Window_ItemCategory[_0x420e63(0x125)][_0x420e63(0x4f6)]=function(){const _0x2803dc=_0x420e63;if(this[_0x2803dc(0x23f)]()){if(_0x2803dc(0x400)!==_0x2803dc(0x400))return _0x339d36(_0x109b4d['$1']);else{const _0x55c0fa=this[_0x2803dc(0x236)]();if(this[_0x2803dc(0x18e)]&&this['_itemWindow'][_0x2803dc(0x2fc)]()<=0x1){if('JZXGX'!==_0x2803dc(0x54d))return this[_0x2803dc(0x3c7)](),_0x2ee7da[_0x2803dc(0x3e3)](),_0x11ec47[_0x2803dc(0x2a7)][_0x2803dc(0x337)](),![];else{Input['isRepeated'](_0x2803dc(0x4eb))&&this['cursorRight'](Input[_0x2803dc(0x455)](_0x2803dc(0x4eb)));if(Input[_0x2803dc(0x3e9)](_0x2803dc(0x501))){if(_0x2803dc(0x12b)!==_0x2803dc(0x12b))return this['defaultItemMax'](_0x81e805);else this['cursorLeft'](Input[_0x2803dc(0x455)]('left'));}}}else this[_0x2803dc(0x18e)]&&this[_0x2803dc(0x18e)]['maxCols']()>0x1&&(Input[_0x2803dc(0x3e9)](_0x2803dc(0x4ba))&&!Input[_0x2803dc(0x149)](_0x2803dc(0x310))&&this['cursorRight'](Input[_0x2803dc(0x455)]('pagedown')),Input[_0x2803dc(0x3e9)]('pageup')&&!Input['isPressed']('shift')&&this[_0x2803dc(0x518)](Input['isTriggered'](_0x2803dc(0x383))));this['index']()!==_0x55c0fa&&this[_0x2803dc(0x3c7)]();}}},Window_ItemCategory[_0x420e63(0x125)]['processHandling']=function(){const _0xc7aa64=_0x420e63;if(this[_0xc7aa64(0x3ce)]())return;Window_HorzCommand[_0xc7aa64(0x125)][_0xc7aa64(0x27e)][_0xc7aa64(0x178)](this);},Window_ItemCategory[_0x420e63(0x125)][_0x420e63(0x1d5)]=function(){const _0x3a903c=_0x420e63;return this[_0x3a903c(0x3ce)]()?'RZswZ'!==_0x3a903c(0x529)?this[_0x3a903c(0x2fc)]()<=0x1?_0x390569['prototype']['colSpacing']['call'](this):_0x2ed31b[_0x3a903c(0x346)]['Window_ItemList_colSpacing'][_0x3a903c(0x178)](this):![]:Window_HorzCommand[_0x3a903c(0x125)][_0x3a903c(0x1d5)][_0x3a903c(0x178)](this);},Window_ItemCategory[_0x420e63(0x125)][_0x420e63(0x4b8)]=function(){const _0x2a4fec=_0x420e63;if(this[_0x2a4fec(0x53d)]()){TouchInput[_0x2a4fec(0x455)]()&&this[_0x2a4fec(0x134)](!![]);if(TouchInput[_0x2a4fec(0x328)]()){if(_0x2a4fec(0x18f)===_0x2a4fec(0x18f))this[_0x2a4fec(0x46f)]();else{const _0xfbfaa8=_0x4085bb(_0x508729['$1'])[_0x2a4fec(0x27a)]()[_0x2a4fec(0x113)](),_0x491384=_0x46b35f(_0x6964be['$2'])[_0x2a4fec(0x113)]();this['_customItemInfo'][_0xfbfaa8]=_0x491384;}}else TouchInput['isCancelled']()&&this[_0x2a4fec(0x1d0)]();}},Window_ItemCategory['prototype'][_0x420e63(0x134)]=function(_0x4608bf){const _0x166460=_0x420e63;this[_0x166460(0x3ce)]()?this[_0x166460(0x102)](!![]):_0x166460(0x290)==='RnTru'?Window_HorzCommand['prototype'][_0x166460(0x134)][_0x166460(0x178)](this,_0x4608bf):this[_0x166460(0x555)](_0x5d5614);},Window_ItemCategory[_0x420e63(0x125)][_0x420e63(0x102)]=function(_0x1d0af9){const _0x346032=_0x420e63;this[_0x346032(0x2eb)]=![];if(this[_0x346032(0x23f)]()){const _0x5ed544=this[_0x346032(0x236)](),_0x2f24f2=this[_0x346032(0x3a8)]();_0x2f24f2>=0x0&&_0x2f24f2!==this[_0x346032(0x236)]()&&this[_0x346032(0x244)](_0x2f24f2),_0x1d0af9&&this['index']()!==_0x5ed544&&this['playCursorSound']();}},Window_ItemCategory[_0x420e63(0x125)]['makeCommandList']=function(){const _0x3ce55b=_0x420e63;this[_0x3ce55b(0x270)](),this[_0x3ce55b(0x244)](this[_0x3ce55b(0x236)]());},Window_ItemCategory['prototype']['addItemCategories']=function(){const _0x4442ab=_0x420e63;for(const _0x161a89 of Window_ItemCategory[_0x4442ab(0x43c)]){if(_0x4442ab(0x47f)!==_0x4442ab(0x2a1))this['addItemCategory'](_0x161a89);else{const _0x429769=_0x4442ab(0x138);if(this[_0x4442ab(0x4d7)][_0x429769])return this[_0x4442ab(0x4d7)][_0x429769];let _0x3d96de='';return this['_itemData'][_0x4442ab(0x453)]>0x0?_0x3d96de+='+%1'[_0x4442ab(0x24b)](this[_0x4442ab(0x105)]['selfTP']):_0x3d96de+='%1'[_0x4442ab(0x24b)](this[_0x4442ab(0x105)][_0x4442ab(0x453)]),_0x3d96de;}}},Window_ItemCategory[_0x420e63(0x125)]['addItemCategory']=function(_0x202c6e){const _0x4b0374=_0x420e63,_0xb7e8d4=_0x202c6e['Type'],_0x4fa984=_0x202c6e['Icon'],_0x3c9196=_0x202c6e[_0x4b0374(0x2c3)]||0x0;if(_0x3c9196>0x0&&!$gameSwitches[_0x4b0374(0x118)](_0x3c9196))return;let _0x4d1f18='',_0x42a215='category',_0x118654=_0xb7e8d4;if(_0xb7e8d4[_0x4b0374(0x3d9)](/Category:(.*)/i))_0x4b0374(0x4f8)!==_0x4b0374(0x4f8)?this['_categoryWindow']['activate']():_0x4d1f18=String(RegExp['$1'])[_0x4b0374(0x113)]();else{if(Window_ItemCategory['categoryItemTypes'][_0x4b0374(0x34d)](_0xb7e8d4))_0x4b0374(0x40f)!==_0x4b0374(0x40f)?_0x335de7+=_0x318ec5(_0x165dc0['$1']):_0x4d1f18=VisuMZ[_0x4b0374(0x346)]['Settings']['Categories'][_0xb7e8d4];else{if([_0x4b0374(0x1a5),_0x4b0374(0x3f9)][_0x4b0374(0x34d)](_0xb7e8d4)){if(_0x4b0374(0x1c0)==='Mpmeo'){const _0x202f3a=_0x19e9d4[_0x4b0374(0x346)]['Settings']['StatusWindow'][_0x4b0374(0x4ce)];return _0x202f3a[_0x4b0374(0x24b)](_0x2901c1['hp']);}else _0x4d1f18=TextManager[_0x4b0374(0x521)];}else{if(_0xb7e8d4==='KeyItems')'qbXye'==='qbXye'?_0x4d1f18=TextManager[_0x4b0374(0x3a6)]:this[_0x4b0374(0x518)](_0x463ca4[_0x4b0374(0x455)]('left'));else{if(_0xb7e8d4===_0x4b0374(0x1cd))_0x4d1f18=TextManager['weapon'];else{if(_0xb7e8d4===_0x4b0374(0x1ae)){if(_0x4b0374(0x492)===_0x4b0374(0x17f)){if(!_0x4f73ac[_0x4b0374(0x495)](this['_item']))return![];const _0x1746f7=this[_0x4b0374(0x424)]();this[_0x4b0374(0xe4)](_0x1746f7,_0xc702c8,_0x6948fb,_0x25f477,!![]);const _0x14babc=this[_0x4b0374(0x1af)]();return this[_0x4b0374(0xe4)](_0x14babc,_0x4758b4,_0x532e5d,_0x1a4dbd,![],_0x4b0374(0x4eb)),this[_0x4b0374(0x4c9)](_0x553747,_0xe123f6,_0x5cf8a2),this[_0x4b0374(0x57c)](),!![];}else _0x4d1f18=TextManager[_0x4b0374(0x23b)];}else{if(_0xb7e8d4[_0x4b0374(0x3d9)](/WTYPE:(\d+)/i))_0x4d1f18=$dataSystem[_0x4b0374(0x251)][Number(RegExp['$1'])]||'';else{if(_0xb7e8d4['match'](/ATYPE:(\d+)/i))_0x4d1f18=$dataSystem[_0x4b0374(0x2a9)][Number(RegExp['$1'])]||'';else _0xb7e8d4['match'](/ETYPE:(\d+)/i)&&(_0x4d1f18=$dataSystem[_0x4b0374(0x3eb)][Number(RegExp['$1'])]||'');}}}}}}}_0x4fa984>0x0&&this['categoryStyle']()!==_0x4b0374(0x342)&&(_0x4d1f18=_0x4b0374(0x3c4)[_0x4b0374(0x24b)](_0x4fa984,_0x4d1f18)),this[_0x4b0374(0x2cb)](_0x4d1f18,_0x42a215,!![],_0x118654);},Window_ItemCategory['prototype'][_0x420e63(0x14e)]=function(){const _0x3a22ec=_0x420e63;return VisuMZ[_0x3a22ec(0x346)][_0x3a22ec(0x515)][_0x3a22ec(0x51d)][_0x3a22ec(0x3ba)];},Window_ItemCategory[_0x420e63(0x125)][_0x420e63(0x3a4)]=function(_0x38a698){const _0x5325b8=_0x420e63,_0x1486ce=this['categoryStyleCheck'](_0x38a698);if(_0x1486ce===_0x5325b8(0x3e8))this['drawItemStyleIconText'](_0x38a698);else _0x1486ce===_0x5325b8(0x1fd)?this[_0x5325b8(0x3cd)](_0x38a698):Window_HorzCommand[_0x5325b8(0x125)][_0x5325b8(0x3a4)][_0x5325b8(0x178)](this,_0x38a698);},Window_ItemCategory[_0x420e63(0x125)][_0x420e63(0x32e)]=function(){const _0x286a3b=_0x420e63;return VisuMZ[_0x286a3b(0x346)]['Settings'][_0x286a3b(0x51d)]['Style'];},Window_ItemCategory['prototype'][_0x420e63(0xfb)]=function(_0x34b935){const _0x583a10=_0x420e63;if(_0x34b935<0x0)return _0x583a10(0x342);const _0x2538ae=this[_0x583a10(0x32e)]();if(_0x2538ae!==_0x583a10(0x553)){if(_0x583a10(0x11a)===_0x583a10(0x11a))return _0x2538ae;else{const _0x1a4ce1=_0x3b0caf['x']+_0x2ba4d4[_0x583a10(0x192)]((_0x4f27bb[_0x583a10(0x4b7)]-_0xa1eb72)/0x2);this[_0x583a10(0x371)](_0x59f92c,_0x1a4ce1,_0x54245d['y'],_0x3401ac);}}else{if('yfQoI'===_0x583a10(0x15c))return _0xe9a6d9[_0x583a10(0x346)][_0x583a10(0x515)][_0x583a10(0x3d3)][_0x583a10(0x447)];else{const _0x172689=this[_0x583a10(0x2ab)](_0x34b935);if(_0x172689[_0x583a10(0x3d9)](/\\I\[(\d+)\]/i)){if(_0x583a10(0x510)===_0x583a10(0x301))_0xcba342=_0x4d6c7e[_0x583a10(0x385)](_0x1d9ac8),_0x4d4ed2=_0x13bf22-_0xb60a76['param'](_0x17e7d0),this['changeTextColor'](_0x1be412['paramchangeTextColor'](_0x543687)),_0x5a2278=(_0x3a5509>=0x0?'+':'')+_0x3fc1e2;else{const _0x3c2713=this[_0x583a10(0x29a)](_0x34b935),_0x4d7585=this['textSizeEx'](_0x172689)[_0x583a10(0x4b7)];if(_0x4d7585<=_0x3c2713[_0x583a10(0x4b7)])return'iconText';else{if(_0x583a10(0x226)===_0x583a10(0x226))return _0x583a10(0x1fd);else this['cursorPageup']();}}}else{if(_0x583a10(0x1d3)!==_0x583a10(0x407))return'text';else this[_0x583a10(0x57c)](),this[_0x583a10(0x166)](!![]),this[_0x583a10(0x479)](),this[_0x583a10(0x30e)]()?this[_0x583a10(0x2aa)]():this[_0x583a10(0x56e)](),this[_0x583a10(0x215)]();}}}},Window_ItemCategory[_0x420e63(0x125)][_0x420e63(0x114)]=function(_0xd6128){const _0x5e2371=_0x420e63,_0x1483a5=this[_0x5e2371(0x29a)](_0xd6128),_0x426bd9=this[_0x5e2371(0x2ab)](_0xd6128),_0x51134f=this['textSizeEx'](_0x426bd9)['width'];this[_0x5e2371(0x166)](this[_0x5e2371(0x287)](_0xd6128));const _0x2ea036=this[_0x5e2371(0x14e)]();if(_0x2ea036===_0x5e2371(0x4eb))this[_0x5e2371(0x371)](_0x426bd9,_0x1483a5['x']+_0x1483a5['width']-_0x51134f,_0x1483a5['y'],_0x51134f);else{if(_0x2ea036==='center'){if('fpAhv'!==_0x5e2371(0x351))return'#'+_0x323316(_0x1d2136['$1']);else{const _0x37b5ba=_0x1483a5['x']+Math[_0x5e2371(0x192)]((_0x1483a5[_0x5e2371(0x4b7)]-_0x51134f)/0x2);this[_0x5e2371(0x371)](_0x426bd9,_0x37b5ba,_0x1483a5['y'],_0x51134f);}}else{if(_0x5e2371(0x51b)!==_0x5e2371(0x51b)){const _0x65cf20=_0x515155[_0x5e2371(0x2bc)](0x1);this[_0x5e2371(0x38e)]=_0x22540c[_0x5e2371(0x4e5)](_0x65cf20),this[_0x5e2371(0x242)]=_0x4f2f01[_0x5e2371(0x4e5)](_0x65cf20);}else this[_0x5e2371(0x371)](_0x426bd9,_0x1483a5['x'],_0x1483a5['y'],_0x51134f);}}},Window_ItemCategory['prototype'][_0x420e63(0x3cd)]=function(_0x104544){const _0x2b2283=_0x420e63,_0x584898=this[_0x2b2283(0x2ab)](_0x104544);if(_0x584898[_0x2b2283(0x3d9)](/\\I\[(\d+)\]/i)){const _0x2f8f82=Number(RegExp['$1'])||0x0,_0x53ffec=this[_0x2b2283(0x29a)](_0x104544),_0x5c63cd=_0x53ffec['x']+Math['floor']((_0x53ffec[_0x2b2283(0x4b7)]-ImageManager[_0x2b2283(0x413)])/0x2),_0x23249b=_0x53ffec['y']+(_0x53ffec[_0x2b2283(0x3a1)]-ImageManager[_0x2b2283(0x35c)])/0x2;this[_0x2b2283(0x334)](_0x2f8f82,_0x5c63cd,_0x23249b);}},VisuMZ['ItemsEquipsCore'][_0x420e63(0x517)]=Window_ItemCategory[_0x420e63(0x125)][_0x420e63(0x1bb)],Window_ItemCategory[_0x420e63(0x125)][_0x420e63(0x1bb)]=function(_0x331202){const _0x2f80ba=_0x420e63;VisuMZ[_0x2f80ba(0x346)][_0x2f80ba(0x517)][_0x2f80ba(0x178)](this,_0x331202),_0x331202[_0x2f80ba(0x551)]=this;},Window_ItemCategory[_0x420e63(0x125)][_0x420e63(0x375)]=function(){const _0x2dff4e=_0x420e63;Window_HorzCommand[_0x2dff4e(0x125)][_0x2dff4e(0x375)]['call'](this);if(this['_categoryNameWindow'])this['updateCategoryNameWindow']();},Window_ItemCategory['prototype'][_0x420e63(0x1cf)]=function(){const _0x4176bd=_0x420e63,_0x5576a6=this['_categoryNameWindow'];_0x5576a6[_0x4176bd(0x35d)][_0x4176bd(0x3e3)]();const _0x40bc18=this[_0x4176bd(0xfb)](this[_0x4176bd(0x236)]());if(_0x40bc18===_0x4176bd(0x1fd)){const _0x51ec6d=this[_0x4176bd(0x29a)](this[_0x4176bd(0x236)]());let _0x593f51=this[_0x4176bd(0x2ab)](this[_0x4176bd(0x236)]());_0x593f51=_0x593f51[_0x4176bd(0x116)](/\\I\[(\d+)\]/gi,''),_0x5576a6[_0x4176bd(0x57c)](),this[_0x4176bd(0x16a)](_0x593f51,_0x51ec6d),this['categoryNameWindowDrawText'](_0x593f51,_0x51ec6d),this[_0x4176bd(0x391)](_0x593f51,_0x51ec6d);}},Window_ItemCategory[_0x420e63(0x125)]['categoryNameWindowDrawBackground']=function(_0x1472a1,_0x1b9b56){},Window_ItemCategory[_0x420e63(0x125)][_0x420e63(0x2ac)]=function(_0x524b4f,_0x1340aa){const _0x473933=_0x420e63,_0x1c093d=this[_0x473933(0x185)];_0x1c093d['drawText'](_0x524b4f,0x0,_0x1340aa['y'],_0x1c093d[_0x473933(0x1a3)],_0x473933(0x263));},Window_ItemCategory[_0x420e63(0x125)][_0x420e63(0x391)]=function(_0x12e214,_0x65d411){const _0x348d42=_0x420e63,_0x2a9270=this['_categoryNameWindow'],_0x311068=$gameSystem[_0x348d42(0x4d3)](),_0x50bb91=_0x65d411['x']+Math[_0x348d42(0x192)](_0x65d411[_0x348d42(0x4b7)]/0x2)+_0x311068;_0x2a9270['x']=_0x2a9270[_0x348d42(0x4b7)]/-0x2+_0x50bb91,_0x2a9270['y']=Math[_0x348d42(0x192)](_0x65d411[_0x348d42(0x3a1)]/0x2);},Window_ItemList[_0x420e63(0x125)][_0x420e63(0x4f6)]=function(){const _0x9b98d7=_0x420e63;if(this[_0x9b98d7(0x23f)]()){const _0x55e94a=this['index']();if(this[_0x9b98d7(0x2fc)]()<=0x1){if('vYAYO'!=='vYAYO'){const _0x5c3b4a=_0x500aec['x']+_0x39d46a[_0x9b98d7(0x192)]((_0x3343d1[_0x9b98d7(0x4b7)]-_0x234690)/0x2);this[_0x9b98d7(0x371)](_0x13df34,_0x5c3b4a,_0xb19b17['y'],_0x30a1df);}else!this[_0x9b98d7(0x26f)](_0x9b98d7(0x4ba))&&Input[_0x9b98d7(0x455)](_0x9b98d7(0x4ba))&&this[_0x9b98d7(0x548)](),!this['isHandled'](_0x9b98d7(0x383))&&Input[_0x9b98d7(0x455)]('pageup')&&this[_0x9b98d7(0x53f)]();}else{if(this['maxCols']()>0x1){if(_0x9b98d7(0x14c)!==_0x9b98d7(0x14c))this['commandSellItemsEquipsCore']();else{if(Input[_0x9b98d7(0x3e9)](_0x9b98d7(0x4eb))){if(_0x9b98d7(0xd4)===_0x9b98d7(0x409)){if(this[_0x9b98d7(0xd7)]()===_0x9b98d7(0x1ea))_0x41168f[_0x9b98d7(0x125)][_0x9b98d7(0x540)][_0x9b98d7(0x178)](this);}else this[_0x9b98d7(0x403)](Input[_0x9b98d7(0x455)](_0x9b98d7(0x4eb)));}if(Input[_0x9b98d7(0x3e9)](_0x9b98d7(0x501))){if('xkhaT'===_0x9b98d7(0x2a6)){_0x4a1886[_0x9b98d7(0x51f)]?(_0x1b351f=this['_actor'][_0x9b98d7(0x419)](_0x15909,![]),_0x1422bf=this[_0x9b98d7(0x339)][_0x9b98d7(0x419)](_0x3ab69c,![]),_0x2d51f7=_0x38e0eb(this['_actor'][_0x9b98d7(0x419)](_0x59a7ce,!![]))['match'](/([%％])/i)):(_0x31a973=this[_0x9b98d7(0x150)]['param'](_0x5bfb89),_0x161977=this['_tempActor'][_0x9b98d7(0x385)](_0x45fdeb),_0x23ddfa=_0x49391d%0x1!==0x0||_0x50ff1d%0x1!==0x0);const _0xd19e20=_0x49d4ec,_0x15dff4=_0x4c0ff6,_0x52ebf7=_0x15dff4-_0xd19e20;let _0x4f2558=_0x52ebf7;if(_0x842c26)_0x4f2558=_0x5cc616['round'](_0x52ebf7*0x64)+'%';_0x52ebf7!==0x0&&(this[_0x9b98d7(0x36a)](_0x43a90b['paramchangeTextColor'](_0x52ebf7)),_0x4f2558=(_0x52ebf7>0x0?_0x9b98d7(0x188):_0x9b98d7(0xd5))[_0x9b98d7(0x24b)](_0x4f2558),this[_0x9b98d7(0x4a8)](_0x4f2558,_0x5c35f8+_0x400457,_0x1f9cfe,_0x50ff87,_0x9b98d7(0x501)));}else this[_0x9b98d7(0x518)](Input[_0x9b98d7(0x455)](_0x9b98d7(0x501)));}if(this['limitedPageUpDownSceneCheck']()){if(_0x9b98d7(0x491)===_0x9b98d7(0x121)){if(!this[_0x9b98d7(0x1ad)]())return;const _0x4fb47f=this[_0x9b98d7(0x28c)];this[_0x9b98d7(0x2a0)]+=this[_0x9b98d7(0x3d4)];(this[_0x9b98d7(0x2a0)]>=_0x4fb47f||this[_0x9b98d7(0x2a0)]<=0x0)&&(this['_newLabelOpacityChange']*=-0x1);this[_0x9b98d7(0x2a0)]=this[_0x9b98d7(0x2a0)][_0x9b98d7(0x4cf)](0x0,_0x4fb47f);for(const _0x2862fe of _0x3fcb93[_0x9b98d7(0x2e1)](this[_0x9b98d7(0x50e)])){_0x2862fe[_0x9b98d7(0x465)]=this[_0x9b98d7(0x2a0)];}}else{if(Input[_0x9b98d7(0x455)]('pagedown')&&Input[_0x9b98d7(0x149)]('shift')){if(_0x9b98d7(0x393)==='rWaVu')this[_0x9b98d7(0x548)]();else{if(!_0x446521[_0x9b98d7(0x118)](_0xb52d94))return!![];}}Input['isTriggered'](_0x9b98d7(0x383))&&Input['isPressed'](_0x9b98d7(0x310))&&this[_0x9b98d7(0x53f)]();}}else Input['isTriggered'](_0x9b98d7(0x4ba))&&('UTHiU'==='ngKQx'?this['_equips'][_0x1e6eb9][_0x9b98d7(0x1db)](null):this[_0x9b98d7(0x548)]()),Input['isTriggered']('pageup')&&this[_0x9b98d7(0x53f)]();}}}if(Input[_0x9b98d7(0x3e9)](_0x9b98d7(0x436))){if(Input['isPressed'](_0x9b98d7(0x310))&&this[_0x9b98d7(0x52f)]())this[_0x9b98d7(0x548)]();else{if(_0x9b98d7(0x4ff)!=='tpkjg')this['cursorDown'](Input[_0x9b98d7(0x455)](_0x9b98d7(0x436)));else for(const _0x2a31d1 of _0x586962['equipTypes']){const _0x3dd75e=_0x45180f[_0x9b98d7(0x3eb)][_0x9b98d7(0x4c2)](_0x2a31d1[_0x9b98d7(0x113)]());if(_0x3dd75e>0x0)_0x236173[_0x9b98d7(0x4ca)]['push'](_0x3dd75e);}}}Input[_0x9b98d7(0x3e9)]('up')&&(Input[_0x9b98d7(0x149)](_0x9b98d7(0x310))&&this[_0x9b98d7(0x52f)]()?this[_0x9b98d7(0x53f)]():this['cursorUp'](Input[_0x9b98d7(0x455)]('up'))),Imported[_0x9b98d7(0x51f)]&&this[_0x9b98d7(0x390)](),this[_0x9b98d7(0x236)]()!==_0x55e94a&&this[_0x9b98d7(0x3c7)]();}},Window_ItemList['prototype']['limitedPageUpDownSceneCheck']=function(){const _0x92bc30=_0x420e63,_0x6fa3eb=SceneManager[_0x92bc30(0x2a7)],_0x39bebe=[Scene_Item,Scene_Shop];return _0x39bebe['includes'](_0x6fa3eb[_0x92bc30(0xef)]);},Window_ItemList[_0x420e63(0x125)][_0x420e63(0x2b9)]=function(){const _0x27bdbf=_0x420e63;Window_Selectable[_0x27bdbf(0x125)][_0x27bdbf(0x2b9)][_0x27bdbf(0x178)](this),this[_0x27bdbf(0x551)]&&this[_0x27bdbf(0x551)][_0x27bdbf(0x3ce)]()&&this['_categoryWindow'][_0x27bdbf(0x2b9)]();},Window_ItemList[_0x420e63(0x125)]['deactivate']=function(){const _0x5e11d0=_0x420e63;Window_Selectable[_0x5e11d0(0x125)][_0x5e11d0(0x1da)][_0x5e11d0(0x178)](this);if(this[_0x5e11d0(0x551)]&&this[_0x5e11d0(0x551)]['isUseModernControls']()){if('ztRMC'!==_0x5e11d0(0x56a))return _0x460a7d[_0x5e11d0(0x346)][_0x5e11d0(0x515)][_0x5e11d0(0x2a2)][_0x5e11d0(0x293)];else this[_0x5e11d0(0x551)][_0x5e11d0(0x1da)]();}},Window_ItemList[_0x420e63(0x125)][_0x420e63(0x1e4)]=function(_0x80937d){const _0x253c5b=_0x420e63;this[_0x253c5b(0x2e5)]!==_0x80937d&&(this[_0x253c5b(0x2e5)]=_0x80937d,this[_0x253c5b(0x429)](),this[_0x253c5b(0x551)]&&this[_0x253c5b(0x551)][_0x253c5b(0x3ce)]()?_0x253c5b(0x38a)!=='jOsML'?(_0x17bf6a['ItemsEquipsCore'][_0x253c5b(0x203)]['call'](this),this['refreshActorEquipSlotsIfUpdated']()):this[_0x253c5b(0x3ef)](0x0):this[_0x253c5b(0x148)](0x0,0x0));},VisuMZ[_0x420e63(0x346)][_0x420e63(0xdf)]=Window_ItemList['prototype']['maxCols'],Window_ItemList[_0x420e63(0x125)][_0x420e63(0x2fc)]=function(){const _0x311156=_0x420e63;if(SceneManager[_0x311156(0x2a7)][_0x311156(0xef)]===Scene_Battle){if(_0x311156(0x442)!==_0x311156(0x452))return VisuMZ['ItemsEquipsCore'][_0x311156(0xdf)][_0x311156(0x178)](this);else _0x47f987['categories'][_0x311156(0x3a5)](_0x136005[_0x311156(0x113)]());}else{if(SceneManager[_0x311156(0x2a7)][_0x311156(0xef)]===Scene_Map)return VisuMZ[_0x311156(0x346)][_0x311156(0xdf)][_0x311156(0x178)](this);else{if('POCim'===_0x311156(0x31b)){const _0x20528c=this[_0x311156(0x354)]();return this[_0x311156(0xe4)](_0x20528c,_0x5f2d3b,_0x267386,_0x1d38f9,![],_0x311156(0x263)),this['drawItemDarkRect'](_0x4d9298,_0x157cba,_0x431cc4),this[_0x311156(0x57c)](),!![];}else return VisuMZ[_0x311156(0x346)]['Settings']['ItemScene']['ListWindowCols'];}}},VisuMZ[_0x420e63(0x346)][_0x420e63(0x1a2)]=Window_ItemList[_0x420e63(0x125)][_0x420e63(0x21b)],Window_ItemList[_0x420e63(0x125)][_0x420e63(0x21b)]=function(){const _0x3b00f3=_0x420e63;if(this[_0x3b00f3(0x2fc)]()<=0x1){if(_0x3b00f3(0x2f0)!==_0x3b00f3(0x115))return Window_Selectable[_0x3b00f3(0x125)][_0x3b00f3(0x21b)][_0x3b00f3(0x178)](this);else{if(this[_0x3b00f3(0x339)])return;if(!_0x5c9829['ItemsEquipsCore'][_0x3b00f3(0x515)][_0x3b00f3(0x139)][_0x3b00f3(0x1f9)])return;const _0xcb40a9=_0x1d5981[_0x3b00f3(0x427)](_0x24b9d7[_0x3b00f3(0x36f)]()*this[_0x3b00f3(0x1e2)]),_0x51bc36=_0x518703[_0x3b00f3(0x427)](_0x5b1304['mpRate']()*this[_0x3b00f3(0x295)]);if(this['hp']>0x0)this[_0x3b00f3(0x3d5)](_0xcb40a9);if(this['mp']>0x0)this[_0x3b00f3(0x4e6)](_0x51bc36);}}else return VisuMZ[_0x3b00f3(0x346)][_0x3b00f3(0x1a2)][_0x3b00f3(0x178)](this);},Window_ItemList[_0x420e63(0x125)][_0x420e63(0x34d)]=function(_0xbf5daf){const _0x28a339=_0x420e63;switch(this[_0x28a339(0x2e5)]){case'AllItems':return DataManager[_0x28a339(0x495)](_0xbf5daf);case _0x28a339(0x3f9):return DataManager['isItem'](_0xbf5daf)&&_0xbf5daf[_0x28a339(0x37d)]===0x1;case _0x28a339(0x3e5):return DataManager[_0x28a339(0x495)](_0xbf5daf)&&_0xbf5daf[_0x28a339(0x37d)]===0x2;case'HiddenItemA':return DataManager['isItem'](_0xbf5daf)&&_0xbf5daf[_0x28a339(0x37d)]===0x3;case _0x28a339(0x231):return DataManager[_0x28a339(0x495)](_0xbf5daf)&&_0xbf5daf[_0x28a339(0x37d)]===0x4;case'Consumable':return DataManager['isItem'](_0xbf5daf)&&_0xbf5daf[_0x28a339(0x41a)];case _0x28a339(0x366):return DataManager[_0x28a339(0x495)](_0xbf5daf)&&!_0xbf5daf[_0x28a339(0x41a)];case _0x28a339(0x218):return DataManager[_0x28a339(0x495)](_0xbf5daf)&&[0x0]['includes'](_0xbf5daf[_0x28a339(0x564)]);case'BattleUsable':return DataManager[_0x28a339(0x495)](_0xbf5daf)&&[0x0,0x1][_0x28a339(0x34d)](_0xbf5daf[_0x28a339(0x564)]);case'FieldUsable':return DataManager[_0x28a339(0x495)](_0xbf5daf)&&[0x0,0x2]['includes'](_0xbf5daf[_0x28a339(0x564)]);case _0x28a339(0x28d):return DataManager['isItem'](_0xbf5daf)&&[0x3]['includes'](_0xbf5daf[_0x28a339(0x564)]);case'AllWeapons':return DataManager['isWeapon'](_0xbf5daf);case _0x28a339(0x1ae):return DataManager[_0x28a339(0x272)](_0xbf5daf);default:if(this[_0x28a339(0x2e5)][_0x28a339(0x3d9)](/WTYPE:(\d+)/i))return DataManager[_0x28a339(0x520)](_0xbf5daf)&&_0xbf5daf[_0x28a339(0x300)]===Number(RegExp['$1']);else{if(this[_0x28a339(0x2e5)][_0x28a339(0x3d9)](/WTYPE:(.*)/i)){const _0x202cdb=$dataSystem[_0x28a339(0x251)][_0x28a339(0x4c2)](String(RegExp['$1'])[_0x28a339(0x113)]());return DataManager['isWeapon'](_0xbf5daf)&&_0xbf5daf[_0x28a339(0x300)]===_0x202cdb;}else{if(this['_category']['match'](/ATYPE:(\d+)/i))return DataManager[_0x28a339(0x272)](_0xbf5daf)&&_0xbf5daf['atypeId']===Number(RegExp['$1']);else{if(this[_0x28a339(0x2e5)][_0x28a339(0x3d9)](/ATYPE:(.*)/i)){if(_0x28a339(0x12e)==='juSAF'){const _0x2952db=$dataSystem[_0x28a339(0x2a9)][_0x28a339(0x4c2)](String(RegExp['$1'])[_0x28a339(0x113)]());return DataManager[_0x28a339(0x272)](_0xbf5daf)&&_0xbf5daf[_0x28a339(0x1f6)]===_0x2952db;}else{const _0x554a68=this[_0x28a339(0x29a)](this[_0x28a339(0x236)]());let _0x57eba6=this[_0x28a339(0x2ab)](this['index']());_0x57eba6=_0x57eba6[_0x28a339(0x116)](/\\I\[(\d+)\]/gi,''),_0x2c0a0c[_0x28a339(0x57c)](),this[_0x28a339(0x42d)](_0x57eba6,_0x554a68),this[_0x28a339(0x2f3)](_0x57eba6,_0x554a68),this[_0x28a339(0x254)](_0x57eba6,_0x554a68);}}else{if(this[_0x28a339(0x2e5)][_0x28a339(0x3d9)](/ETYPE:(\d+)/i)){if(_0x28a339(0xdb)!==_0x28a339(0xdb)){this['resetFontSettings']();const _0x573a62=this['itemAt'](_0x52f826),_0x571721=this[_0x28a339(0x29a)](_0x4e7c5e),_0x2750cd=_0x571721['width'];this[_0x28a339(0x166)](this[_0x28a339(0x4d5)](_0x573a62)),this['drawItemName'](_0x573a62,_0x571721['x'],_0x571721['y'],_0x2750cd),this[_0x28a339(0x25d)](_0x573a62,_0x571721),this[_0x28a339(0x166)](!![]);}else return!!_0xbf5daf&&_0xbf5daf[_0x28a339(0x29e)]===Number(RegExp['$1']);}else{if(this[_0x28a339(0x2e5)][_0x28a339(0x3d9)](/ETYPE:(.*)/i)){const _0x5de2a6=$dataSystem[_0x28a339(0x3eb)][_0x28a339(0x4c2)](String(RegExp['$1'])[_0x28a339(0x113)]());return DataManager[_0x28a339(0x272)](_0xbf5daf)&&_0xbf5daf['etypeId']===_0x5de2a6;}else{if(this[_0x28a339(0x2e5)][_0x28a339(0x3d9)](/Category:(.*)/i))return!!_0xbf5daf&&_0xbf5daf[_0x28a339(0x370)]['includes'](String(RegExp['$1'])[_0x28a339(0x27a)]()[_0x28a339(0x113)]());}}}}}}}return![];},Window_ItemList[_0x420e63(0x125)][_0x420e63(0x1ad)]=function(){return!![];},VisuMZ[_0x420e63(0x346)]['Window_ItemList_drawItem']=Window_ItemList[_0x420e63(0x125)][_0x420e63(0x3a4)],Window_ItemList[_0x420e63(0x125)][_0x420e63(0x3a4)]=function(_0x566956){const _0x107ae7=_0x420e63;VisuMZ[_0x107ae7(0x346)]['Window_ItemList_drawItem']['call'](this,_0x566956),this[_0x107ae7(0x12a)](_0x566956);},Window_ItemList[_0x420e63(0x125)]['drawItemNumber']=function(_0x56d5ae,_0x2f403a,_0x3ad553,_0x50f629){const _0x30c139=_0x420e63;Window_Selectable[_0x30c139(0x125)][_0x30c139(0x41d)][_0x30c139(0x178)](this,_0x56d5ae,_0x2f403a,_0x3ad553,_0x50f629);},Window_ItemList[_0x420e63(0x125)][_0x420e63(0x12a)]=function(_0x3532a5){const _0x56afc5=_0x420e63,_0x2617de=this[_0x56afc5(0x2c4)](_0x3532a5);if(!_0x2617de||!this[_0x56afc5(0x1ad)]())return;if(!$gameParty[_0x56afc5(0x53b)](_0x2617de))return;const _0x520f34=this[_0x56afc5(0x29a)](_0x3532a5),_0xb316df=_0x520f34['x'],_0xeda245=_0x520f34['y']+(this[_0x56afc5(0xf3)]()-ImageManager[_0x56afc5(0x35c)])/0x2,_0x44161a=VisuMZ[_0x56afc5(0x346)]['Settings'][_0x56afc5(0x379)][_0x56afc5(0x532)],_0x1c064f=VisuMZ[_0x56afc5(0x346)]['Settings']['New'][_0x56afc5(0x17c)];this[_0x56afc5(0x514)](_0x2617de,_0xb316df+_0x44161a,_0xeda245+_0x1c064f);},Window_ItemList[_0x420e63(0x125)][_0x420e63(0x176)]=function(_0x3f6531){const _0x553edb=_0x420e63;this[_0x553edb(0x291)]=_0x3f6531,this[_0x553edb(0x375)]();},VisuMZ[_0x420e63(0x346)][_0x420e63(0x238)]=Window_ItemList[_0x420e63(0x125)]['updateHelp'],Window_ItemList[_0x420e63(0x125)]['updateHelp']=function(){const _0x1130af=_0x420e63;VisuMZ[_0x1130af(0x346)][_0x1130af(0x238)][_0x1130af(0x178)](this),this[_0x1130af(0x291)]&&this['_statusWindow'][_0x1130af(0xef)]===Window_ShopStatus&&this[_0x1130af(0x291)][_0x1130af(0x461)](this[_0x1130af(0x521)]());},Window_BattleItem['prototype'][_0x420e63(0x4d5)]=function(_0x433947){const _0x4a8c7f=_0x420e63;return BattleManager['actor']()?BattleManager[_0x4a8c7f(0x2bc)]()[_0x4a8c7f(0x362)](_0x433947):Window_ItemList[_0x4a8c7f(0x125)]['isEnabled'][_0x4a8c7f(0x178)](this,_0x433947);},Window_EventItem[_0x420e63(0x125)][_0x420e63(0x1ad)]=function(){return![];},Window_EquipStatus[_0x420e63(0x125)][_0x420e63(0x3f3)]=function(){const _0x208534=_0x420e63;return VisuMZ['ItemsEquipsCore'][_0x208534(0x515)][_0x208534(0x139)][_0x208534(0x543)];},VisuMZ['ItemsEquipsCore'][_0x420e63(0x15e)]=Window_EquipStatus[_0x420e63(0x125)]['refresh'],Window_EquipStatus['prototype'][_0x420e63(0x429)]=function(){const _0x2219b7=_0x420e63;this[_0x2219b7(0x365)](),this['resetFontSettings']();if(this[_0x2219b7(0x150)])this['_actor'][_0x2219b7(0x429)]();this[_0x2219b7(0x3f3)]()?this[_0x2219b7(0x133)]():VisuMZ[_0x2219b7(0x346)][_0x2219b7(0x15e)]['call'](this);},Window_EquipStatus[_0x420e63(0x125)][_0x420e63(0x133)]=function(){const _0x41e49c=_0x420e63;this[_0x41e49c(0x35d)][_0x41e49c(0x3e3)]();if(!this[_0x41e49c(0x150)])return;if(this[_0x41e49c(0x458)]()){if(_0x41e49c(0x4b9)==='jpEOX'){const _0x5b62fb=ImageManager['loadPicture'](this[_0x41e49c(0x150)][_0x41e49c(0x573)]());_0x5b62fb[_0x41e49c(0x308)](this[_0x41e49c(0x3bb)][_0x41e49c(0x315)](this));}else return _0x50ff0d;}else _0x41e49c(0x2d7)===_0x41e49c(0x45d)?(_0x530e11[_0x41e49c(0x329)](0x0),_0x5d614b['remove'](-0x1),this[_0x41e49c(0xd1)]=_0x957677,this['refresh'](),this[_0x41e49c(0x3f0)]()):this[_0x41e49c(0x19b)]();},Window_EquipStatus[_0x420e63(0x125)][_0x420e63(0x458)]=function(){const _0xe826b5=_0x420e63;return Imported[_0xe826b5(0x1e7)]&&this[_0xe826b5(0x150)]['getMenuImage']()!==''&&VisuMZ[_0xe826b5(0x346)]['Settings'][_0xe826b5(0x139)]['MenuPortraits'];},Window_EquipStatus[_0x420e63(0x125)][_0x420e63(0x3bb)]=function(){const _0x462b2d=_0x420e63;VisuMZ[_0x462b2d(0x346)]['Settings']['EquipScene'][_0x462b2d(0x3a7)][_0x462b2d(0x178)](this),this[_0x462b2d(0x143)]();},Window_EquipStatus[_0x420e63(0x125)][_0x420e63(0x19b)]=function(){const _0x1cc791=_0x420e63;VisuMZ[_0x1cc791(0x346)][_0x1cc791(0x515)]['EquipScene'][_0x1cc791(0x368)][_0x1cc791(0x178)](this),this[_0x1cc791(0x143)]();},Window_EquipStatus[_0x420e63(0x125)][_0x420e63(0x143)]=function(){const _0x290e78=_0x420e63;this[_0x290e78(0x57c)](),VisuMZ[_0x290e78(0x346)][_0x290e78(0x515)]['EquipScene'][_0x290e78(0x4c0)][_0x290e78(0x178)](this);},Window_EquipStatus[_0x420e63(0x125)]['drawItemActorMenuImage']=function(_0x521c03,_0x37834f,_0x3199ee,_0x15da87,_0x3ad67b){const _0x402238=_0x420e63,_0x29dddd=ImageManager[_0x402238(0x3ed)](_0x521c03[_0x402238(0x573)]()),_0x4fc7b1=this[_0x402238(0x1a3)]-_0x29dddd[_0x402238(0x4b7)];_0x37834f+=_0x4fc7b1/0x2;if(_0x4fc7b1<0x0)_0x15da87-=_0x4fc7b1;Window_StatusBase[_0x402238(0x125)][_0x402238(0x303)][_0x402238(0x178)](this,_0x521c03,_0x37834f,_0x3199ee,_0x15da87,_0x3ad67b);},Window_EquipStatus[_0x420e63(0x125)]['actorParams']=function(){const _0x3d2e18=_0x420e63;if(Imported['VisuMZ_0_CoreEngine']){if(_0x3d2e18(0x322)==='LxcZQ')this[_0x3d2e18(0x3c7)]();else return VisuMZ[_0x3d2e18(0x539)][_0x3d2e18(0x515)]['Param'][_0x3d2e18(0x262)];}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus['prototype'][_0x420e63(0x324)]=function(){const _0x52884a=_0x420e63;return VisuMZ[_0x52884a(0x346)][_0x52884a(0x515)][_0x52884a(0x139)]['ParamValueFontSize'];},Window_EquipStatus[_0x420e63(0x125)][_0x420e63(0x141)]=function(){const _0x517488=_0x420e63;return Imported[_0x517488(0x51f)]&&VisuMZ[_0x517488(0x539)]['Settings'][_0x517488(0x1eb)][_0x517488(0x49c)];},Window_EquipStatus['prototype']['drawUpdatedParamName']=function(_0x4c307e,_0x1c37c5,_0x2f9db3,_0x44371d){const _0x43e345=_0x420e63,_0x1068b1=this[_0x43e345(0x36c)]();Imported['VisuMZ_0_CoreEngine']?'QRCRu'==='QRCRu'?this[_0x43e345(0x221)](_0x1c37c5+_0x1068b1,_0x2f9db3,_0x44371d,_0x4c307e,![]):this[_0x43e345(0x18e)][_0x43e345(0x43e)](_0x43e345(0x28e),this[_0x43e345(0x53e)][_0x43e345(0x315)](this)):this['drawText'](TextManager[_0x43e345(0x385)](_0x4c307e),_0x1c37c5+_0x1068b1,_0x2f9db3,_0x44371d);},Window_EquipStatus[_0x420e63(0x125)][_0x420e63(0x50c)]=function(_0x26bbe6,_0x389397,_0x17b61c,_0x564df3){const _0x24eb10=_0x420e63,_0x1421db=this[_0x24eb10(0x36c)]();let _0x406662=0x0;Imported[_0x24eb10(0x51f)]?_0x24eb10(0x16e)!==_0x24eb10(0x16e)?this[_0x24eb10(0x551)][_0x24eb10(0x1da)]():_0x406662=this[_0x24eb10(0x150)]['paramValueByName'](_0x26bbe6,!![]):_0x406662=this['_actor'][_0x24eb10(0x385)](_0x26bbe6);const _0x1da042=_0x406662;this[_0x24eb10(0x4a8)](_0x406662,_0x389397,_0x17b61c,_0x564df3-_0x1421db,'right');},Window_EquipStatus[_0x420e63(0x125)][_0x420e63(0x145)]=function(_0x156dc9,_0x512f32,_0x51df01,_0x187d28){const _0x2d5668=_0x420e63,_0x342b48=this['itemPadding']();let _0x1640b7=0x0,_0x681f61=0x0,_0xb9f22d='';if(this[_0x2d5668(0x339)]){if(Imported[_0x2d5668(0x51f)]){if(_0x2d5668(0x147)!==_0x2d5668(0x147)){const _0x8a4ce4=_0x16a040[_0x2d5668(0x2a7)],_0x23e430=[_0xd77cce,_0x57b6f2];return _0x23e430['includes'](_0x8a4ce4[_0x2d5668(0xef)]);}else _0x1640b7=this[_0x2d5668(0x150)][_0x2d5668(0x419)](_0x156dc9,![]),_0x681f61=this[_0x2d5668(0x339)]['paramValueByName'](_0x156dc9,![]),_0xb9f22d=this[_0x2d5668(0x339)]['paramValueByName'](_0x156dc9,!![]);}else'WCNHf'!==_0x2d5668(0x265)?(_0x1640b7=this[_0x2d5668(0x150)][_0x2d5668(0x385)](_0x156dc9),_0x681f61=this[_0x2d5668(0x339)][_0x2d5668(0x385)](_0x156dc9),_0xb9f22d=this['_tempActor'][_0x2d5668(0x385)](_0x156dc9)):_0x3ca864[_0x2d5668(0x125)]['isRightInputMode'][_0x2d5668(0x178)](this);const _0x21b761=_0x1640b7,_0xdb4996=_0x681f61;diffValue=_0xdb4996-_0x21b761,this[_0x2d5668(0x36a)](ColorManager[_0x2d5668(0x2fe)](diffValue)),this[_0x2d5668(0x4a8)](_0xb9f22d,_0x512f32,_0x51df01,_0x187d28-_0x342b48,_0x2d5668(0x4eb));}},Window_EquipStatus[_0x420e63(0x125)][_0x420e63(0xcf)]=function(_0x238905,_0x280ed2,_0x571702,_0x4f43c6){const _0x139e4a=_0x420e63,_0x386235=this[_0x139e4a(0x36c)]();let _0x5333e7=0x0,_0x13063f=0x0,_0x1073b1=![];if(this['_tempActor']){if(Imported[_0x139e4a(0x51f)])_0x5333e7=this[_0x139e4a(0x150)][_0x139e4a(0x419)](_0x238905,![]),_0x13063f=this[_0x139e4a(0x339)][_0x139e4a(0x419)](_0x238905,![]),_0x1073b1=String(this['_actor']['paramValueByName'](_0x238905,!![]))[_0x139e4a(0x3d9)](/([%％])/i);else{if('Lucyl'!==_0x139e4a(0x20d))_0x5333e7=this[_0x139e4a(0x150)]['param'](_0x238905),_0x13063f=this[_0x139e4a(0x339)]['param'](_0x238905),_0x1073b1=_0x5333e7%0x1!==0x0||_0x13063f%0x1!==0x0;else return _0x542c7a[_0x139e4a(0x508)][_0x139e4a(0x24b)](_0x2dac69(_0x5462a7['$1']));}const _0x2e3464=_0x5333e7,_0x2e90bb=_0x13063f,_0x2a1807=_0x2e90bb-_0x2e3464;let _0x23f99e=_0x2a1807;if(_0x1073b1)_0x23f99e=Math['round'](_0x2a1807*0x64)+'%';_0x2a1807!==0x0&&(this[_0x139e4a(0x36a)](ColorManager[_0x139e4a(0x2fe)](_0x2a1807)),_0x23f99e=(_0x2a1807>0x0?_0x139e4a(0x188):_0x139e4a(0xd5))['format'](_0x23f99e),this[_0x139e4a(0x4a8)](_0x23f99e,_0x280ed2+_0x386235,_0x571702,_0x4f43c6,'left'));}},Window_EquipStatus[_0x420e63(0x125)][_0x420e63(0x4c9)]=function(_0x2dd723,_0x217cf5,_0x259d74,_0x391021,_0x439bbc){const _0x4370d5=_0x420e63;if(VisuMZ[_0x4370d5(0x346)][_0x4370d5(0x515)][_0x4370d5(0x139)][_0x4370d5(0x233)]===![])return;_0x439bbc=Math['max'](_0x439bbc||0x1,0x1);while(_0x439bbc--){if(_0x4370d5(0x18c)!==_0x4370d5(0x3e2)){_0x391021=_0x391021||this[_0x4370d5(0xf3)](),this['contents'][_0x4370d5(0x304)]=0xa0;const _0x3c60b0=ColorManager['getItemsEquipsCoreBackColor2']();this[_0x4370d5(0x35d)][_0x4370d5(0x174)](_0x2dd723+0x1,_0x217cf5+0x1,_0x259d74-0x2,_0x391021-0x2,_0x3c60b0),this['contents']['paintOpacity']=0xff;}else{const _0x533907=_0x4370d5(0x230);if(this['_customItemInfo'][_0x533907])return this[_0x4370d5(0x4d7)][_0x533907];let _0x29fbe8='';if(this['_itemData'][_0x4370d5(0xcc)]<0x0)_0x29fbe8+=_0x4370d5(0x4f7)[_0x4370d5(0x24b)](_0xa1dd32[_0x4370d5(0x192)](this['_itemData'][_0x4370d5(0xcc)]*0x64));if(this[_0x4370d5(0x105)][_0x4370d5(0xcc)]<0x0&&this[_0x4370d5(0x105)][_0x4370d5(0x525)]<0x0)_0x29fbe8+='\x20';if(this['_itemData']['flatMP']<0x0)_0x29fbe8+='%1'[_0x4370d5(0x24b)](this['_itemData'][_0x4370d5(0x525)]);return _0x29fbe8;}}},ColorManager[_0x420e63(0x25e)]=function(){const _0x4db93e=_0x420e63,_0xd223f4=VisuMZ[_0x4db93e(0x346)][_0x4db93e(0x515)][_0x4db93e(0x139)];let _0x29b011=_0xd223f4['BackRectColor']!==undefined?_0xd223f4[_0x4db93e(0x3dd)]:0x13;return ColorManager[_0x4db93e(0x360)](_0x29b011);},VisuMZ['ItemsEquipsCore'][_0x420e63(0x2ff)]=Window_EquipCommand[_0x420e63(0x125)]['initialize'],Window_EquipCommand['prototype'][_0x420e63(0x307)]=function(_0x1e3870){const _0x3b4dcb=_0x420e63;VisuMZ[_0x3b4dcb(0x346)][_0x3b4dcb(0x2ff)]['call'](this,_0x1e3870),this[_0x3b4dcb(0xe8)](_0x1e3870);},Window_EquipCommand[_0x420e63(0x125)][_0x420e63(0xe8)]=function(_0x4c311b){const _0x23e667=_0x420e63,_0x51e42e=new Rectangle(0x0,0x0,_0x4c311b[_0x23e667(0x4b7)],_0x4c311b['height']);this[_0x23e667(0x1df)]=new Window_Base(_0x51e42e),this[_0x23e667(0x1df)][_0x23e667(0x465)]=0x0,this[_0x23e667(0x52c)](this['_commandNameWindow']),this[_0x23e667(0x372)]();},Window_EquipCommand[_0x420e63(0x125)][_0x420e63(0x375)]=function(){const _0x2924cf=_0x420e63;Window_HorzCommand['prototype'][_0x2924cf(0x375)][_0x2924cf(0x178)](this);if(this['_commandNameWindow'])this[_0x2924cf(0x372)]();},Window_EquipCommand[_0x420e63(0x125)][_0x420e63(0x372)]=function(){const _0x5308f3=_0x420e63,_0x1fc691=this['_commandNameWindow'];_0x1fc691[_0x5308f3(0x35d)][_0x5308f3(0x3e3)]();const _0x19e6a1=this[_0x5308f3(0x2f2)](this[_0x5308f3(0x236)]());if(_0x19e6a1===_0x5308f3(0x1fd)){if(_0x5308f3(0xed)!==_0x5308f3(0xed))_0x380d3a=_0x5308f3(0x212)[_0x5308f3(0x24b)](_0x1a9a9a['id']);else{const _0x1f3114=this[_0x5308f3(0x29a)](this[_0x5308f3(0x236)]());let _0x4644ca=this[_0x5308f3(0x2ab)](this[_0x5308f3(0x236)]());_0x4644ca=_0x4644ca[_0x5308f3(0x116)](/\\I\[(\d+)\]/gi,''),_0x1fc691['resetFontSettings'](),this[_0x5308f3(0x42d)](_0x4644ca,_0x1f3114),this[_0x5308f3(0x2f3)](_0x4644ca,_0x1f3114),this[_0x5308f3(0x254)](_0x4644ca,_0x1f3114);}}},Window_EquipCommand['prototype']['commandNameWindowDrawBackground']=function(_0x5f1953,_0x5c3106){},Window_EquipCommand['prototype'][_0x420e63(0x2f3)]=function(_0x8fb07e,_0x155e24){const _0x11cbfe=_0x420e63,_0x7a4927=this[_0x11cbfe(0x1df)];_0x7a4927[_0x11cbfe(0x4a8)](_0x8fb07e,0x0,_0x155e24['y'],_0x7a4927['innerWidth'],_0x11cbfe(0x263));},Window_EquipCommand[_0x420e63(0x125)][_0x420e63(0x254)]=function(_0x204d3d,_0x215f38){const _0x18c8ea=_0x420e63,_0x44efea=this[_0x18c8ea(0x1df)],_0x33518b=$gameSystem[_0x18c8ea(0x4d3)](),_0x1e111e=_0x215f38['x']+Math[_0x18c8ea(0x192)](_0x215f38[_0x18c8ea(0x4b7)]/0x2)+_0x33518b;_0x44efea['x']=_0x44efea[_0x18c8ea(0x4b7)]/-0x2+_0x1e111e,_0x44efea['y']=Math['floor'](_0x215f38[_0x18c8ea(0x3a1)]/0x2);},Window_EquipCommand[_0x420e63(0x125)][_0x420e63(0x3ce)]=function(){const _0x52ba01=_0x420e63;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand[_0x52ba01(0x125)][_0x52ba01(0x3ce)][_0x52ba01(0x178)](this);},Window_EquipCommand['prototype']['playOkSound']=function(){const _0x5b105b=_0x420e63;if(this[_0x5b105b(0xd7)]()===_0x5b105b(0x1ea))Window_HorzCommand[_0x5b105b(0x125)][_0x5b105b(0x540)][_0x5b105b(0x178)](this);},Window_EquipCommand[_0x420e63(0x125)][_0x420e63(0x4f6)]=function(){const _0x4a6883=_0x420e63;!this[_0x4a6883(0x167)]()&&Window_HorzCommand[_0x4a6883(0x125)][_0x4a6883(0x4f6)]['call'](this);},Window_EquipCommand[_0x420e63(0x125)][_0x420e63(0x167)]=function(){const _0x4d97e1=_0x420e63;if(!this['isCursorMovable']())return![];if(SceneManager[_0x4d97e1(0x2a7)]['constructor']!==Scene_Equip)return![];if(Input['isTriggered'](_0x4d97e1(0x436))){if(_0x4d97e1(0x498)!==_0x4d97e1(0x498)){if(this['isUseItemsEquipsCoreUpdatedLayout']())return this['itemWindowRectItemsEquipsCore']();else{const _0x1d9260=_0x27161a['ItemsEquipsCore']['Scene_Item_itemWindowRect'][_0x4d97e1(0x178)](this);return this['allowCreateStatusWindow']()&&this[_0x4d97e1(0x1b9)]()&&(_0x1d9260['width']-=this[_0x4d97e1(0xfc)]()),_0x1d9260;}}else this['playCursorSound'](),SceneManager[_0x4d97e1(0x2a7)][_0x4d97e1(0x100)](),SceneManager[_0x4d97e1(0x2a7)][_0x4d97e1(0x1f2)][_0x4d97e1(0x3ef)](-0x1);}return![];},Window_EquipCommand['prototype'][_0x420e63(0x2fc)]=function(){const _0x1812db=_0x420e63;return this[_0x1812db(0x3d6)]?this[_0x1812db(0x3d6)][_0x1812db(0x20e)]:0x3;},Window_EquipCommand[_0x420e63(0x125)][_0x420e63(0x4b8)]=function(){const _0x116d1e=_0x420e63;if(this[_0x116d1e(0x41c)]()&&this[_0x116d1e(0x446)]&&SceneManager['_scene'][_0x116d1e(0xef)]===Scene_Equip){if(this[_0x116d1e(0x1d5)]()&&TouchInput['isHovered']())this[_0x116d1e(0x30f)](![]);else{if(TouchInput[_0x116d1e(0x455)]()){if(_0x116d1e(0x2e7)==='oWgSq'){if(_0x1d9d5a[_0x116d1e(0x3d9)](/(.*):[ ](.*)/i)){const _0x1b2414=_0x2ab1e4(_0x2abc2a['$1'])[_0x116d1e(0x113)](),_0x34e479=_0x108d9d(_0x1649ba['$2'])[_0x116d1e(0x113)]();this[_0x116d1e(0x2b3)](_0x1b2414,_0x34e479,_0x46b525,_0x57474a,_0x35dc34),_0x424192+=this[_0x116d1e(0xf3)]();}}else this[_0x116d1e(0x30f)](!![]);}}TouchInput[_0x116d1e(0x328)]()&&this['onTouchOk']();}},Window_EquipCommand[_0x420e63(0x125)]['onTouchSelectModernControls']=function(_0x214c8f){const _0x103c0c=_0x420e63;this[_0x103c0c(0x2eb)]=![];const _0x5ae0cd=this[_0x103c0c(0x236)](),_0x5b573b=this[_0x103c0c(0x3a8)](),_0x5c9374=SceneManager[_0x103c0c(0x2a7)][_0x103c0c(0x1f2)];if(_0x5c9374[_0x103c0c(0x41c)]()&&_0x5c9374[_0x103c0c(0x446)]){if(_0x5b573b>=0x0){if(_0x5b573b===this[_0x103c0c(0x236)]()){if(_0x103c0c(0x25f)!=='UmzPE'){this[_0x103c0c(0x57c)]();const _0x106e0d=_0xb846f9['ItemsEquipsCore'][_0x103c0c(0x515)][_0x103c0c(0x2a2)],_0x50246c=_0x106e0d['ItemQuantityFmt'],_0x1e06e4=_0x50246c['format'](_0x32121f[_0x103c0c(0x3e1)](_0x1cb055));this[_0x103c0c(0x35d)][_0x103c0c(0x536)]=_0x106e0d[_0x103c0c(0x153)],this[_0x103c0c(0x4a8)](_0x1e06e4,_0x108dc3,_0x582b31,_0x111e1e,_0x103c0c(0x4eb)),this[_0x103c0c(0x57c)]();}else this[_0x103c0c(0x2eb)]=!![];}this[_0x103c0c(0x2b9)](),this[_0x103c0c(0x244)](_0x5b573b);}else _0x5c9374[_0x103c0c(0x3a8)]()>=0x0&&(this['deactivate'](),this[_0x103c0c(0x120)]());}if(_0x214c8f&&this[_0x103c0c(0x236)]()!==_0x5ae0cd){if(_0x103c0c(0x4c8)===_0x103c0c(0x175)){const _0x5bd48d=_0x51baf0(_0x4c8039['$1'])||0x1;if(_0xd6c8bc>=_0x5bd48d)return!![];}else this['playCursorSound']();}},Window_EquipCommand['prototype'][_0x420e63(0x3bf)]=function(){const _0x132343=_0x420e63;this[_0x132343(0xfa)](),this[_0x132343(0x208)](),this[_0x132343(0x3bd)]();},Window_EquipCommand[_0x420e63(0x125)][_0x420e63(0x429)]=function(){const _0x41057b=_0x420e63;Window_HorzCommand['prototype'][_0x41057b(0x429)][_0x41057b(0x178)](this),this[_0x41057b(0x41e)]();},Window_EquipCommand['prototype'][_0x420e63(0xfa)]=function(){const _0x377686=_0x420e63;if(!this[_0x377686(0x2de)]())return;const _0x2cf8e3=this[_0x377686(0x531)](),_0xd4d31f=VisuMZ[_0x377686(0x346)]['Settings']['EquipScene'][_0x377686(0x474)],_0x37d932=_0x2cf8e3===_0x377686(0x342)?TextManager[_0x377686(0x18a)]:_0x377686(0x3c4)[_0x377686(0x24b)](_0xd4d31f,TextManager[_0x377686(0x18a)]),_0x444a08=this[_0x377686(0x234)]();this[_0x377686(0x2cb)](_0x37d932,'equip',_0x444a08);},Window_EquipCommand[_0x420e63(0x125)][_0x420e63(0x2de)]=function(){const _0x4bf4a2=_0x420e63;return!this[_0x4bf4a2(0x3ce)]();},Window_EquipCommand['prototype'][_0x420e63(0x234)]=function(){return!![];},Window_EquipCommand[_0x420e63(0x125)][_0x420e63(0x208)]=function(){const _0x3c531c=_0x420e63;if(!this['isOptimizeCommandAdded']())return;const _0x4fbc9c=this[_0x3c531c(0x531)](),_0x3ca6dc=VisuMZ['ItemsEquipsCore'][_0x3c531c(0x515)][_0x3c531c(0x139)][_0x3c531c(0x392)],_0x16c9b4=_0x4fbc9c==='text'?TextManager[_0x3c531c(0xe3)]:'\x5cI[%1]%2'[_0x3c531c(0x24b)](_0x3ca6dc,TextManager[_0x3c531c(0xe3)]),_0x3da0f7=this[_0x3c531c(0x3fc)]();this['addCommand'](_0x16c9b4,'optimize',_0x3da0f7);},Window_EquipCommand[_0x420e63(0x125)][_0x420e63(0x4a7)]=function(){const _0xa7b87e=_0x420e63;return VisuMZ[_0xa7b87e(0x346)][_0xa7b87e(0x515)][_0xa7b87e(0x139)][_0xa7b87e(0x3cf)];},Window_EquipCommand[_0x420e63(0x125)][_0x420e63(0x3fc)]=function(){return!![];},Window_EquipCommand[_0x420e63(0x125)][_0x420e63(0x3bd)]=function(){const _0x3d8d91=_0x420e63;if(!this[_0x3d8d91(0x313)]())return;const _0x4c52df=this[_0x3d8d91(0x531)](),_0x455f0a=VisuMZ[_0x3d8d91(0x346)][_0x3d8d91(0x515)][_0x3d8d91(0x139)][_0x3d8d91(0x576)],_0xf1bac1=_0x4c52df==='text'?TextManager['clear']:_0x3d8d91(0x3c4)[_0x3d8d91(0x24b)](_0x455f0a,TextManager['clear']),_0x4c9442=this[_0x3d8d91(0x57a)]();this[_0x3d8d91(0x2cb)](_0xf1bac1,_0x3d8d91(0x3e3),_0x4c9442);},Window_EquipCommand['prototype'][_0x420e63(0x313)]=function(){const _0x339a08=_0x420e63;return VisuMZ[_0x339a08(0x346)]['Settings']['EquipScene'][_0x339a08(0x332)];},Window_EquipCommand[_0x420e63(0x125)][_0x420e63(0x57a)]=function(){return!![];},Window_EquipCommand[_0x420e63(0x125)][_0x420e63(0x14e)]=function(){const _0x18d9dd=_0x420e63;return VisuMZ['ItemsEquipsCore'][_0x18d9dd(0x515)]['EquipScene'][_0x18d9dd(0x478)];},Window_EquipCommand[_0x420e63(0x125)]['drawItem']=function(_0x4929fa){const _0xbdd7d8=_0x420e63,_0x4da141=this['commandStyleCheck'](_0x4929fa);if(_0x4da141===_0xbdd7d8(0x3e8)){if('Eqfqi'!==_0xbdd7d8(0x3a3))this[_0xbdd7d8(0x114)](_0x4929fa);else{const _0x57a961=_0xbdd7d8(0x4fe);if(!this[_0xbdd7d8(0x105)][_0xbdd7d8(0x156)]&&!this[_0xbdd7d8(0x4d7)][_0x57a961])return![];const _0xb5edc5=this[_0xbdd7d8(0x40e)]();this[_0xbdd7d8(0xe4)](_0xb5edc5,_0x1a7b2c,_0x282730,_0x4b77d7,!![]);const _0x50d0a0=this[_0xbdd7d8(0x41f)]();return this[_0xbdd7d8(0xe4)](_0x50d0a0,_0xd5abcb,_0x5256f6,_0x252747,![],'right'),this[_0xbdd7d8(0x4c9)](_0x56a1e7,_0x1e0ed7,_0x4ba1da),this[_0xbdd7d8(0x57c)](),!![];}}else{if(_0x4da141===_0xbdd7d8(0x1fd)){if(_0xbdd7d8(0x414)==='dvrfP')this['drawItemStyleIcon'](_0x4929fa);else{const _0x248fd6=_0x320ae2(_0x576603['$1']);_0x248fd6<_0x2f6f43?(_0x194f3a(_0xbdd7d8(0x21e)[_0xbdd7d8(0x24b)](_0x4341b5,_0x248fd6,_0x485dca)),_0x351f5c['exit']()):_0x50c674=_0x2b463c['max'](_0x248fd6,_0x432932);}}else Window_HorzCommand['prototype'][_0xbdd7d8(0x3a4)][_0xbdd7d8(0x178)](this,_0x4929fa);}},Window_EquipCommand['prototype'][_0x420e63(0x531)]=function(){const _0x23f862=_0x420e63;return VisuMZ[_0x23f862(0x346)][_0x23f862(0x515)]['EquipScene']['CmdStyle'];},Window_EquipCommand[_0x420e63(0x125)][_0x420e63(0x2f2)]=function(_0x118962){const _0x4050b2=_0x420e63;if(_0x118962<0x0)return _0x4050b2(0x342);const _0x19f960=this['commandStyle']();if(_0x19f960!=='auto')return _0x19f960;else{if(this[_0x4050b2(0x4de)]()>0x0){if(_0x4050b2(0x47e)!==_0x4050b2(0x193)){const _0x3c0d32=this[_0x4050b2(0x2ab)](_0x118962);if(_0x3c0d32[_0x4050b2(0x3d9)](/\\I\[(\d+)\]/i)){const _0x6db264=this[_0x4050b2(0x29a)](_0x118962),_0xe8ef9=this['textSizeEx'](_0x3c0d32)[_0x4050b2(0x4b7)];if(_0xe8ef9<=_0x6db264[_0x4050b2(0x4b7)]){if(_0x4050b2(0x45e)!==_0x4050b2(0x45e))_0x45f1f3===this[_0x4050b2(0x236)]()&&(this[_0x4050b2(0x2eb)]=!![]),this[_0x4050b2(0x2b9)](),this[_0x4050b2(0x244)](_0x485400);else return _0x4050b2(0x3e8);}else{if(_0x4050b2(0x49d)===_0x4050b2(0x46c)){if(!this['isClearCommandAdded']())return;const _0x33e89c=this[_0x4050b2(0x531)](),_0x1ed878=_0x318680[_0x4050b2(0x346)][_0x4050b2(0x515)][_0x4050b2(0x139)][_0x4050b2(0x576)],_0x47e0bd=_0x33e89c===_0x4050b2(0x342)?_0x2ee2b6[_0x4050b2(0x3e3)]:_0x4050b2(0x3c4)[_0x4050b2(0x24b)](_0x1ed878,_0x37970c[_0x4050b2(0x3e3)]),_0x30e8b5=this['isClearCommandEnabled']();this[_0x4050b2(0x2cb)](_0x47e0bd,_0x4050b2(0x3e3),_0x30e8b5);}else return _0x4050b2(0x1fd);}}}else this[_0x4050b2(0x221)](_0x1742b8+_0x137ef8,_0x26e846,_0x54b0f7,_0x58f958,![]);}}return _0x4050b2(0x342);},Window_EquipCommand[_0x420e63(0x125)][_0x420e63(0x114)]=function(_0x59853b){const _0x144553=_0x420e63,_0x5227b9=this[_0x144553(0x29a)](_0x59853b),_0x257e79=this[_0x144553(0x2ab)](_0x59853b),_0x5f14ed=this[_0x144553(0x32b)](_0x257e79)[_0x144553(0x4b7)];this[_0x144553(0x166)](this['isCommandEnabled'](_0x59853b));const _0x5b5582=this[_0x144553(0x14e)]();if(_0x5b5582==='right')_0x144553(0x250)===_0x144553(0x4b1)?this[_0x144553(0x1f7)]():this['drawTextEx'](_0x257e79,_0x5227b9['x']+_0x5227b9['width']-_0x5f14ed,_0x5227b9['y'],_0x5f14ed);else{if(_0x5b5582===_0x144553(0x263)){if(_0x144553(0x3ae)!=='eyJfa'){if(!this[_0x144553(0x4a7)]())return;const _0x3d452a=this[_0x144553(0x531)](),_0x5d81a0=_0x53e932[_0x144553(0x346)][_0x144553(0x515)][_0x144553(0x139)]['CmdIconOptimize'],_0x2672c7=_0x3d452a===_0x144553(0x342)?_0xa8e110['optimize']:_0x144553(0x3c4)[_0x144553(0x24b)](_0x5d81a0,_0x216c86[_0x144553(0xe3)]),_0x71da7c=this[_0x144553(0x3fc)]();this['addCommand'](_0x2672c7,_0x144553(0xe3),_0x71da7c);}else{const _0x12d070=_0x5227b9['x']+Math['floor']((_0x5227b9[_0x144553(0x4b7)]-_0x5f14ed)/0x2);this[_0x144553(0x371)](_0x257e79,_0x12d070,_0x5227b9['y'],_0x5f14ed);}}else this['drawTextEx'](_0x257e79,_0x5227b9['x'],_0x5227b9['y'],_0x5f14ed);}},Window_EquipCommand['prototype']['drawItemStyleIcon']=function(_0x3ce341){const _0x455677=_0x420e63;this[_0x455677(0x2ab)](_0x3ce341)[_0x455677(0x3d9)](/\\I\[(\d+)\]/i);const _0x4ff95f=Number(RegExp['$1'])||0x0,_0x142bc6=this[_0x455677(0x29a)](_0x3ce341),_0x3deaa7=_0x142bc6['x']+Math[_0x455677(0x192)]((_0x142bc6['width']-ImageManager[_0x455677(0x413)])/0x2),_0x171707=_0x142bc6['y']+(_0x142bc6[_0x455677(0x3a1)]-ImageManager[_0x455677(0x35c)])/0x2;this['drawIcon'](_0x4ff95f,_0x3deaa7,_0x171707);},Window_EquipSlot[_0x420e63(0x125)][_0x420e63(0x3ce)]=function(){const _0x31f0b9=_0x420e63;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand['prototype'][_0x31f0b9(0x3ce)]['call'](this);},Window_EquipSlot[_0x420e63(0x125)]['activate']=function(){const _0x4b8219=_0x420e63;Window_StatusBase[_0x4b8219(0x125)][_0x4b8219(0x2b9)]['call'](this),this[_0x4b8219(0x375)]();},Window_EquipSlot[_0x420e63(0x125)][_0x420e63(0xc9)]=function(){const _0x71ed0f=_0x420e63;Window_StatusBase['prototype'][_0x71ed0f(0xc9)]['call'](this),this['checkShiftRemoveShortcut']();},Window_EquipSlot[_0x420e63(0x125)][_0x420e63(0x2bf)]=function(){const _0x37bfe5=_0x420e63;if(!this[_0x37bfe5(0x2e4)]())return;if(Input['isTriggered']('shift')&&this[_0x37bfe5(0x521)]()){const _0x348b75=SceneManager[_0x37bfe5(0x2a7)][_0x37bfe5(0x150)];_0x348b75&&(this[_0x37bfe5(0x19f)](this['index']())?(this[_0x37bfe5(0x2c5)](),this['updateHelp']()):this[_0x37bfe5(0x209)]());}},Window_EquipSlot['prototype'][_0x420e63(0x19f)]=function(_0x29c3e2){const _0x22668a=_0x420e63,_0x12b30c=SceneManager['_scene'][_0x22668a(0x150)];if(!_0x12b30c)return;if(!_0x12b30c[_0x22668a(0x2f5)](this[_0x22668a(0x236)]()))return![];const _0x3eb250=_0x12b30c['equipSlots']()[this[_0x22668a(0x236)]()];if(_0x12b30c[_0x22668a(0x12f)]()[_0x22668a(0x34d)](_0x3eb250))return![];return!![];;},Window_EquipSlot[_0x420e63(0x125)][_0x420e63(0x2c5)]=function(){const _0xd37dec=_0x420e63;SoundManager['playEquip']();const _0x17b670=SceneManager[_0xd37dec(0x2a7)]['_actor'];_0x17b670[_0xd37dec(0x129)](this[_0xd37dec(0x236)](),null),this[_0xd37dec(0x429)](),this[_0xd37dec(0x18e)]['refresh'](),this[_0xd37dec(0x375)]();const _0x1e5671=SceneManager[_0xd37dec(0x2a7)][_0xd37dec(0x291)];if(_0x1e5671)_0x1e5671[_0xd37dec(0x429)]();},Window_EquipSlot[_0x420e63(0x125)][_0x420e63(0x2e4)]=function(){const _0x5607c4=_0x420e63;if(!this[_0x5607c4(0x401)])return![];if(!VisuMZ[_0x5607c4(0x346)][_0x5607c4(0x515)][_0x5607c4(0x139)]['ShiftShortcutKey'])return![];return!![];},Window_EquipSlot['prototype'][_0x420e63(0x4f6)]=function(){const _0x599dab=_0x420e63;!this[_0x599dab(0x167)]()&&Window_StatusBase[_0x599dab(0x125)]['processCursorMoveModernControls'][_0x599dab(0x178)](this);},Window_EquipSlot[_0x420e63(0x125)][_0x420e63(0x167)]=function(){const _0x35d99f=_0x420e63;if(!this[_0x35d99f(0x23f)]())return![];if(SceneManager[_0x35d99f(0x2a7)]['constructor']!==Scene_Equip)return![];if(this[_0x35d99f(0x502)]()){if(_0x35d99f(0x42b)!=='BlkXh')_0x2b4d1a[_0x35d99f(0x346)][_0x35d99f(0x3c3)]['call'](this),this[_0x35d99f(0xf2)]();else return this[_0x35d99f(0x3c7)](),Input[_0x35d99f(0x3e3)](),SceneManager[_0x35d99f(0x2a7)][_0x35d99f(0x337)](),![];}else{if(Input[_0x35d99f(0x3e9)]('down')){if(_0x35d99f(0x51e)!==_0x35d99f(0x3e0)){const _0x48d20b=this[_0x35d99f(0x236)]();return Input[_0x35d99f(0x149)](_0x35d99f(0x310))?this[_0x35d99f(0x548)]():this[_0x35d99f(0x54a)](Input[_0x35d99f(0x455)](_0x35d99f(0x436))),this[_0x35d99f(0x236)]()!==_0x48d20b&&this[_0x35d99f(0x3c7)](),!![];}else return _0x20e6c7['ItemsEquipsCore'][_0x35d99f(0x164)][_0x35d99f(0x178)](this);}else{if(this['isShiftShortcutKeyForRemove']()&&Input[_0x35d99f(0x455)](_0x35d99f(0x310)))return!![];}}return![];},Window_EquipSlot[_0x420e63(0x125)]['allowCommandWindowCursorUp']=function(){const _0x34fe19=_0x420e63;if(this[_0x34fe19(0x236)]()!==0x0)return![];const _0x41c5a2=VisuMZ[_0x34fe19(0x346)][_0x34fe19(0x515)][_0x34fe19(0x139)];if(!_0x41c5a2[_0x34fe19(0x3cf)]&&!_0x41c5a2[_0x34fe19(0x332)])return![];return Input[_0x34fe19(0x455)]('up');},Window_EquipSlot['prototype']['isShiftShortcutKeyForRemove']=function(){const _0x5e87c5=_0x420e63;return VisuMZ[_0x5e87c5(0x346)][_0x5e87c5(0x515)][_0x5e87c5(0x139)]['ShiftShortcutKey'];},Window_EquipSlot[_0x420e63(0x125)][_0x420e63(0x4b8)]=function(){const _0x4bdd99=_0x420e63;if(this['isOpen']()&&this[_0x4bdd99(0x446)]&&SceneManager['_scene']['constructor']===Scene_Equip){if(this[_0x4bdd99(0x1d5)]()&&TouchInput[_0x4bdd99(0x56b)]())this[_0x4bdd99(0x30f)](![]);else TouchInput['isTriggered']()&&this['onTouchSelectModernControls'](!![]);if(TouchInput[_0x4bdd99(0x328)]()){if(_0x4bdd99(0x569)!=='Juodk')this[_0x4bdd99(0x46f)]();else{if(!this[_0x4bdd99(0x1f2)])return![];if(!this[_0x4bdd99(0x1f2)]['active'])return![];return this[_0x4bdd99(0x1f2)]['isShiftRemoveShortcutEnabled']();}}else TouchInput[_0x4bdd99(0x2f1)]()&&this[_0x4bdd99(0x1d0)]();}},Window_EquipSlot[_0x420e63(0x125)][_0x420e63(0x30f)]=function(_0x43f07c){const _0x1ce0c2=_0x420e63;this[_0x1ce0c2(0x2eb)]=![];const _0x348fd1=this['index'](),_0x5c1cbc=this[_0x1ce0c2(0x3a8)](),_0x432cc8=SceneManager[_0x1ce0c2(0x2a7)]['_commandWindow'];if(_0x432cc8[_0x1ce0c2(0x41c)]()&&_0x432cc8[_0x1ce0c2(0x446)]){if(_0x5c1cbc>=0x0)_0x5c1cbc===this[_0x1ce0c2(0x236)]()&&(this[_0x1ce0c2(0x2eb)]=!![]),this[_0x1ce0c2(0x2b9)](),this[_0x1ce0c2(0x244)](_0x5c1cbc);else _0x432cc8['hitIndex']()>=0x0&&(this[_0x1ce0c2(0x1da)](),this[_0x1ce0c2(0x120)]());}if(_0x43f07c&&this['index']()!==_0x348fd1){if(_0x1ce0c2(0x1b8)==='sFAoG'){if(!_0x4004d3[_0x1ce0c2(0x118)](_0x5e6dd5))return![];}else this[_0x1ce0c2(0x3c7)]();}},Window_EquipSlot[_0x420e63(0x125)]['equipSlotIndex']=function(){const _0xe6b603=_0x420e63;return this[_0xe6b603(0x236)]();},VisuMZ[_0x420e63(0x346)]['Window_EquipItem_includes']=Window_EquipItem['prototype']['includes'],Window_EquipItem[_0x420e63(0x125)][_0x420e63(0x34d)]=function(_0x28fdd4){const _0x5c8735=_0x420e63;return _0x28fdd4===null&&this[_0x5c8735(0x12f)]()[_0x5c8735(0x34d)](this[_0x5c8735(0x29e)]())?![]:VisuMZ[_0x5c8735(0x346)][_0x5c8735(0x1d7)]['call'](this,_0x28fdd4);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x449)]=Window_EquipItem['prototype'][_0x420e63(0x4d5)],Window_EquipItem[_0x420e63(0x125)]['isEnabled']=function(_0x55de2f){const _0x2eb489=_0x420e63;if(_0x55de2f&&this[_0x2eb489(0x150)]){if(this[_0x2eb489(0x2d4)](_0x55de2f))return![];if(this[_0x2eb489(0x48c)](_0x55de2f))return![];if(this[_0x2eb489(0x23a)](_0x55de2f))return![];}if(!_0x55de2f)return!this[_0x2eb489(0x12f)]()[_0x2eb489(0x34d)](this[_0x2eb489(0x29e)]());return VisuMZ[_0x2eb489(0x346)][_0x2eb489(0x449)][_0x2eb489(0x178)](this,_0x55de2f);},Window_EquipItem[_0x420e63(0x125)]['itemHasEquipLimit']=function(_0xc88bba){const _0x380bb4=_0x420e63,_0x4b326c=_0xc88bba[_0x380bb4(0x32d)];if(_0x4b326c[_0x380bb4(0x3d9)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){if(_0x380bb4(0x27c)!==_0x380bb4(0x27c))return this[_0x380bb4(0x507)]();else{const _0x2ef604=Number(RegExp['$1'])||0x1;let _0x5c5174=0x0;const _0x25ca02=this[_0x380bb4(0x150)][_0x380bb4(0x378)](),_0x141da8=SceneManager['_scene']['_slotWindow'][_0x380bb4(0x1dd)]();_0x25ca02[_0x141da8]=null;for(const _0x43da84 of _0x25ca02){if(!_0x43da84)continue;if(DataManager[_0x380bb4(0x520)](_0xc88bba)===DataManager[_0x380bb4(0x520)](_0x43da84)){if(_0xc88bba['id']===_0x43da84['id'])_0x5c5174+=0x1;}}return _0x5c5174>=_0x2ef604;}}else{if(_0x380bb4(0x2fb)===_0x380bb4(0x358)){const _0x3e9c28=this[_0x380bb4(0x1df)];_0x3e9c28['drawText'](_0x1acaff,0x0,_0x218616['y'],_0x3e9c28[_0x380bb4(0x1a3)],_0x380bb4(0x263));}else return![];}},Window_EquipItem[_0x420e63(0x125)][_0x420e63(0x48c)]=function(_0x317fd0){const _0x4cda7d=_0x420e63;if(!DataManager[_0x4cda7d(0x520)](_0x317fd0))return![];const _0x33c700=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x571bab=0x0;const _0x5e8822=this[_0x4cda7d(0x150)][_0x4cda7d(0x378)](),_0x614fdf=SceneManager[_0x4cda7d(0x2a7)]['_slotWindow'][_0x4cda7d(0x1dd)]();_0x5e8822[_0x614fdf]=null;for(const _0x2b830d of _0x5e8822){if(!_0x2b830d)continue;if(!DataManager[_0x4cda7d(0x520)](_0x2b830d))continue;if(_0x317fd0[_0x4cda7d(0x300)]===_0x2b830d[_0x4cda7d(0x300)]){if(_0x4cda7d(0x16d)===_0x4cda7d(0x16d)){_0x571bab+=0x1;if(_0x317fd0[_0x4cda7d(0x32d)]['match'](_0x33c700)){const _0x1cbd29=Number(RegExp['$1'])||0x1;if(_0x571bab>=_0x1cbd29)return!![];}if(_0x2b830d['note']['match'](_0x33c700)){if(_0x4cda7d(0x26e)===_0x4cda7d(0x255)){const _0x4b6913=this[_0x4cda7d(0x551)]['y']+this[_0x4cda7d(0x551)][_0x4cda7d(0x3a1)],_0x3c2f06=_0x47a21e[_0x4cda7d(0x513)]-this[_0x4cda7d(0xfc)](),_0x3420b0=this[_0x4cda7d(0x4e7)]()-this[_0x4cda7d(0x551)][_0x4cda7d(0x3a1)],_0xc7bf08=this[_0x4cda7d(0x523)]()?_0x14f57e['boxWidth']-_0x3c2f06:0x0;return new _0x2d2f0d(_0xc7bf08,_0x4b6913,_0x3c2f06,_0x3420b0);}else{const _0x3fc477=Number(RegExp['$1'])||0x1;if(_0x571bab>=_0x3fc477)return!![];}}}else this[_0x4cda7d(0x3c7)]();}}return![];},Window_EquipItem['prototype'][_0x420e63(0x23a)]=function(_0x4f0613){const _0x20213e=_0x420e63;if(!DataManager[_0x20213e(0x272)](_0x4f0613))return![];const _0x1416b6=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x3bba0c=0x0;const _0x1ca4b5=this[_0x20213e(0x150)][_0x20213e(0x378)](),_0x3f928a=SceneManager[_0x20213e(0x2a7)][_0x20213e(0x1f2)][_0x20213e(0x1dd)]();_0x1ca4b5[_0x3f928a]=null;for(const _0x3d31f8 of _0x1ca4b5){if(!_0x3d31f8)continue;if(!DataManager[_0x20213e(0x272)](_0x3d31f8))continue;if(_0x4f0613['atypeId']===_0x3d31f8[_0x20213e(0x1f6)]){_0x3bba0c+=0x1;if(_0x4f0613[_0x20213e(0x32d)]['match'](_0x1416b6)){const _0x3f3d1f=Number(RegExp['$1'])||0x1;if(_0x3bba0c>=_0x3f3d1f)return!![];}if(_0x3d31f8[_0x20213e(0x32d)]['match'](_0x1416b6)){if('OusfO'!==_0x20213e(0x2ca)){const _0x10c953=Number(RegExp['$1'])||0x1;if(_0x3bba0c>=_0x10c953)return!![];}else{const _0x4e08d6=_0x2b8070['$1'][_0x20213e(0x2b5)](/[\r\n]+/);for(const _0x538cbc of _0x4e08d6){_0x282309[_0x20213e(0x370)][_0x20213e(0x3a5)](_0x538cbc[_0x20213e(0x27a)]()[_0x20213e(0x113)]());}}}}}return![];},Window_EquipItem[_0x420e63(0x125)][_0x420e63(0x12f)]=function(){const _0x31f59b=_0x420e63;return VisuMZ[_0x31f59b(0x346)][_0x31f59b(0x515)][_0x31f59b(0x139)]['NonRemoveETypes'];},Window_EquipItem[_0x420e63(0x125)][_0x420e63(0x3a4)]=function(_0x525d43){const _0x167108=_0x420e63,_0x3b932c=this[_0x167108(0x2c4)](_0x525d43);if(_0x3b932c){if('akyWf'!==_0x167108(0x500))Window_ItemList[_0x167108(0x125)][_0x167108(0x3a4)][_0x167108(0x178)](this,_0x525d43);else{const _0x53c9aa=this[_0x167108(0x531)](),_0x56abf3=_0x142c3a['ItemsEquipsCore'][_0x167108(0x515)][_0x167108(0x3d3)][_0x167108(0x463)],_0x2ebfe1=_0x53c9aa==='text'?_0x33f442[_0x167108(0x11f)]:_0x167108(0x3c4)[_0x167108(0x24b)](_0x56abf3,_0x1f3f0c[_0x167108(0x11f)]),_0x2fd494=this[_0x167108(0xec)]();if(this[_0x167108(0x15f)]()&&!_0x2fd494)return;this[_0x167108(0x2cb)](_0x2ebfe1,_0x167108(0x11f),_0x2fd494);}}else{if(_0x167108(0xe1)==='QSoVw'){const _0x182036=_0x4af47d+_0x333940+_0x876c35*_0x287132;this[_0x167108(0x4c9)](_0x182036,_0x337710,_0x4b2e58,_0x633586-_0x3ba133);}else this[_0x167108(0x172)](_0x525d43);}},Window_EquipItem[_0x420e63(0x125)]['drawRemoveItem']=function(_0x1c6160){const _0x2236a1=_0x420e63;this[_0x2236a1(0x166)](this[_0x2236a1(0x4d5)](null));const _0x2fc390=VisuMZ[_0x2236a1(0x346)][_0x2236a1(0x515)]['EquipScene'],_0x5b1ff3=this['itemLineRect'](_0x1c6160),_0x31ccbe=_0x5b1ff3['y']+(this['lineHeight']()-ImageManager[_0x2236a1(0x35c)])/0x2,_0x3837fc=ImageManager[_0x2236a1(0x413)]+0x4,_0x129b89=Math[_0x2236a1(0x223)](0x0,_0x5b1ff3[_0x2236a1(0x4b7)]-_0x3837fc);this['resetTextColor'](),this[_0x2236a1(0x334)](_0x2fc390['RemoveEquipIcon'],_0x5b1ff3['x'],_0x31ccbe),this['drawText'](_0x2fc390[_0x2236a1(0x568)],_0x5b1ff3['x']+_0x3837fc,_0x5b1ff3['y'],_0x129b89),this[_0x2236a1(0x166)](!![]);},Window_EquipItem[_0x420e63(0x125)][_0x420e63(0x55b)]=function(){const _0x1a959e=_0x420e63;Window_ItemList[_0x1a959e(0x125)][_0x1a959e(0x55b)]['call'](this);if(this[_0x1a959e(0x150)]&&this[_0x1a959e(0x291)]&&this['_slotId']>=0x0){const _0x54e363=JsonEx['makeDeepCopy'](this[_0x1a959e(0x150)]);_0x54e363[_0x1a959e(0x339)]=!![],_0x54e363['forceChangeEquip'](this['_slotId'],this[_0x1a959e(0x521)]()),this[_0x1a959e(0x291)][_0x1a959e(0x547)](_0x54e363);}},VisuMZ[_0x420e63(0x346)]['Window_ShopCommand_initialize']=Window_ShopCommand[_0x420e63(0x125)]['initialize'],Window_ShopCommand[_0x420e63(0x125)]['initialize']=function(_0x4a7d47){const _0x2ef6c9=_0x420e63;VisuMZ['ItemsEquipsCore']['Window_ShopCommand_initialize'][_0x2ef6c9(0x178)](this,_0x4a7d47),this['createCommandNameWindow'](_0x4a7d47);},Window_ShopCommand[_0x420e63(0x125)][_0x420e63(0xe8)]=function(_0x3263fb){const _0x21b0d7=_0x420e63,_0x1732d9=new Rectangle(0x0,0x0,_0x3263fb[_0x21b0d7(0x4b7)],_0x3263fb[_0x21b0d7(0x3a1)]);this[_0x21b0d7(0x1df)]=new Window_Base(_0x1732d9),this[_0x21b0d7(0x1df)][_0x21b0d7(0x465)]=0x0,this[_0x21b0d7(0x52c)](this[_0x21b0d7(0x1df)]),this[_0x21b0d7(0x372)]();},Window_ShopCommand[_0x420e63(0x125)]['callUpdateHelp']=function(){const _0x27a117=_0x420e63;Window_HorzCommand['prototype'][_0x27a117(0x375)][_0x27a117(0x178)](this);if(this[_0x27a117(0x1df)])this[_0x27a117(0x372)]();},Window_ShopCommand[_0x420e63(0x125)][_0x420e63(0x372)]=function(){const _0x5f256f=_0x420e63,_0x27876d=this[_0x5f256f(0x1df)];_0x27876d[_0x5f256f(0x35d)][_0x5f256f(0x3e3)]();const _0x2c51f5=this[_0x5f256f(0x2f2)](this['index']());if(_0x2c51f5===_0x5f256f(0x1fd)){const _0x2493bb=this['itemLineRect'](this['index']());let _0x4f1fbe=this[_0x5f256f(0x2ab)](this['index']());_0x4f1fbe=_0x4f1fbe['replace'](/\\I\[(\d+)\]/gi,''),_0x27876d[_0x5f256f(0x57c)](),this['commandNameWindowDrawBackground'](_0x4f1fbe,_0x2493bb),this[_0x5f256f(0x2f3)](_0x4f1fbe,_0x2493bb),this['commandNameWindowCenter'](_0x4f1fbe,_0x2493bb);}},Window_ShopCommand[_0x420e63(0x125)][_0x420e63(0x42d)]=function(_0x3d00e1,_0x11e9e3){},Window_ShopCommand[_0x420e63(0x125)][_0x420e63(0x2f3)]=function(_0x5f4bb7,_0x3be6de){const _0x449290=_0x420e63,_0x11958d=this[_0x449290(0x1df)];_0x11958d[_0x449290(0x4a8)](_0x5f4bb7,0x0,_0x3be6de['y'],_0x11958d[_0x449290(0x1a3)],_0x449290(0x263));},Window_ShopCommand[_0x420e63(0x125)][_0x420e63(0x254)]=function(_0x2d7947,_0x237193){const _0x3beda3=_0x420e63,_0x401a34=this['_commandNameWindow'],_0x3035cd=$gameSystem['windowPadding'](),_0x5d44dd=_0x237193['x']+Math[_0x3beda3(0x192)](_0x237193['width']/0x2)+_0x3035cd;_0x401a34['x']=_0x401a34['width']/-0x2+_0x5d44dd,_0x401a34['y']=Math[_0x3beda3(0x192)](_0x237193[_0x3beda3(0x3a1)]/0x2);},Window_ShopCommand[_0x420e63(0x125)][_0x420e63(0x2fc)]=function(){const _0x3240a1=_0x420e63;return this['_list']?this[_0x3240a1(0x3d6)][_0x3240a1(0x20e)]:0x3;},Window_ShopCommand[_0x420e63(0x125)][_0x420e63(0x15f)]=function(){const _0x60ab88=_0x420e63;return VisuMZ['ItemsEquipsCore'][_0x60ab88(0x515)]['ShopScene']['CmdHideDisabled'];},Window_ShopCommand['prototype'][_0x420e63(0x3bf)]=function(){const _0x505ad2=_0x420e63;this[_0x505ad2(0x187)](),this[_0x505ad2(0x563)](),this['addCancelCommand']();},Window_ShopCommand[_0x420e63(0x125)][_0x420e63(0x429)]=function(){const _0x37c277=_0x420e63;Window_HorzCommand[_0x37c277(0x125)][_0x37c277(0x429)][_0x37c277(0x178)](this),this[_0x37c277(0x41e)]();},Window_ShopCommand[_0x420e63(0x125)][_0x420e63(0x187)]=function(){const _0x34d7bd=_0x420e63,_0x566313=this[_0x34d7bd(0x531)](),_0x3ea2ab=VisuMZ[_0x34d7bd(0x346)][_0x34d7bd(0x515)][_0x34d7bd(0x3d3)][_0x34d7bd(0x463)],_0x596253=_0x566313===_0x34d7bd(0x342)?TextManager[_0x34d7bd(0x11f)]:_0x34d7bd(0x3c4)[_0x34d7bd(0x24b)](_0x3ea2ab,TextManager[_0x34d7bd(0x11f)]),_0x3984b3=this['isBuyCommandEnabled']();if(this[_0x34d7bd(0x15f)]()&&!_0x3984b3)return;this[_0x34d7bd(0x2cb)](_0x596253,'buy',_0x3984b3);},Window_ShopCommand[_0x420e63(0x125)][_0x420e63(0xec)]=function(){const _0x5b2a9e=_0x420e63;return SceneManager[_0x5b2a9e(0x2a7)][_0x5b2a9e(0xef)]===Scene_Shop?SceneManager[_0x5b2a9e(0x2a7)][_0x5b2a9e(0x4f3)]>0x0:!![];},Window_ShopCommand['prototype']['addSellCommand']=function(){const _0x146b54=_0x420e63,_0x62f65b=this[_0x146b54(0x531)](),_0x4f0e42=VisuMZ[_0x146b54(0x346)][_0x146b54(0x515)][_0x146b54(0x3d3)][_0x146b54(0x2f9)],_0x143083=_0x62f65b===_0x146b54(0x342)?TextManager['sell']:_0x146b54(0x3c4)[_0x146b54(0x24b)](_0x4f0e42,TextManager['sell']),_0x3aadb9=this[_0x146b54(0xfd)]();if(this[_0x146b54(0x15f)]()&&!_0x3aadb9)return;this['addCommand'](_0x143083,_0x146b54(0x3d0),_0x3aadb9);},Window_ShopCommand[_0x420e63(0x125)][_0x420e63(0xfd)]=function(){return!this['_purchaseOnly'];},Window_ShopCommand[_0x420e63(0x125)][_0x420e63(0x16c)]=function(){const _0x42701b=_0x420e63,_0x20cabf=this['commandStyle'](),_0x3487eb=VisuMZ[_0x42701b(0x346)][_0x42701b(0x515)][_0x42701b(0x3d3)][_0x42701b(0x1b2)],_0x607616=VisuMZ[_0x42701b(0x346)][_0x42701b(0x515)][_0x42701b(0x3d3)]['CmdCancelRename'],_0x517231=_0x20cabf===_0x42701b(0x342)?_0x607616:_0x42701b(0x3c4)[_0x42701b(0x24b)](_0x3487eb,_0x607616);this['addCommand'](_0x517231,_0x42701b(0x28e));},Window_ShopCommand['prototype']['itemTextAlign']=function(){const _0x48f230=_0x420e63;return VisuMZ[_0x48f230(0x346)][_0x48f230(0x515)][_0x48f230(0x3d3)]['CmdTextAlign'];},Window_ShopCommand['prototype'][_0x420e63(0x3a4)]=function(_0x114954){const _0x26941b=_0x420e63,_0x28fd65=this['commandStyleCheck'](_0x114954);if(_0x28fd65===_0x26941b(0x3e8)){if(_0x26941b(0x503)===_0x26941b(0x26d)){if(this[_0x26941b(0x22f)]())return this['_itemWindow'][_0x26941b(0x2fc)]()===0x1?_0x559f4d[_0x26941b(0x283)]('left',_0x26941b(0x4eb)):_0x31790c['getInputMultiButtonStrings']('pageup','pagedown');return _0x1c3ff3['prototype'][_0x26941b(0xd2)][_0x26941b(0x178)](this);}else this['drawItemStyleIconText'](_0x114954);}else _0x28fd65===_0x26941b(0x1fd)?this[_0x26941b(0x3cd)](_0x114954):Window_HorzCommand[_0x26941b(0x125)][_0x26941b(0x3a4)]['call'](this,_0x114954);},Window_ShopCommand[_0x420e63(0x125)]['commandStyle']=function(){const _0x1ca157=_0x420e63;return VisuMZ[_0x1ca157(0x346)][_0x1ca157(0x515)][_0x1ca157(0x3d3)]['CmdStyle'];},Window_ShopCommand[_0x420e63(0x125)][_0x420e63(0x2f2)]=function(_0x32344e){const _0x2f2903=_0x420e63;if(_0x32344e<0x0)return _0x2f2903(0x342);const _0x245329=this[_0x2f2903(0x531)]();if(_0x245329!==_0x2f2903(0x553))return _0x245329;else{if(this[_0x2f2903(0x4de)]()>0x0){if('Fmpos'===_0x2f2903(0x41b)){const _0x5e2595=this[_0x2f2903(0x2ab)](_0x32344e);if(_0x5e2595['match'](/\\I\[(\d+)\]/i)){const _0xbcd5f8=this[_0x2f2903(0x29a)](_0x32344e),_0x349241=this['textSizeEx'](_0x5e2595)[_0x2f2903(0x4b7)];if(_0x349241<=_0xbcd5f8[_0x2f2903(0x4b7)]){if(_0x2f2903(0x4ab)!==_0x2f2903(0x344))return _0x2f2903(0x3e8);else _0x46196f=_0x33afd6(_0x5730c3['$1']),_0x55a8e9=_0x1ca5be(_0x5ed191['$2']);}else return _0x2f2903(0x1fd);}}else _0x3f9834[_0x2f2903(0x346)][_0x2f2903(0x2ff)]['call'](this,_0x1108bc),this[_0x2f2903(0xe8)](_0x4e21ce);}}return'text';},Window_ShopCommand[_0x420e63(0x125)][_0x420e63(0x114)]=function(_0x3d995e){const _0x3de1ce=_0x420e63,_0xd9f45d=this[_0x3de1ce(0x29a)](_0x3d995e),_0x2f0c98=this[_0x3de1ce(0x2ab)](_0x3d995e),_0x40d497=this['textSizeEx'](_0x2f0c98)[_0x3de1ce(0x4b7)];this[_0x3de1ce(0x166)](this['isCommandEnabled'](_0x3d995e));const _0x4840f5=this[_0x3de1ce(0x14e)]();if(_0x4840f5==='right'){if(_0x3de1ce(0x37f)!==_0x3de1ce(0x49b))this[_0x3de1ce(0x371)](_0x2f0c98,_0xd9f45d['x']+_0xd9f45d[_0x3de1ce(0x4b7)]-_0x40d497,_0xd9f45d['y'],_0x40d497);else return this[_0x3de1ce(0x3f3)]()?this[_0x3de1ce(0x4be)]():_0x16916d[_0x3de1ce(0x346)][_0x3de1ce(0x4ed)][_0x3de1ce(0x178)](this);}else{if(_0x4840f5===_0x3de1ce(0x263)){const _0x591b47=_0xd9f45d['x']+Math[_0x3de1ce(0x192)]((_0xd9f45d['width']-_0x40d497)/0x2);this['drawTextEx'](_0x2f0c98,_0x591b47,_0xd9f45d['y'],_0x40d497);}else this[_0x3de1ce(0x371)](_0x2f0c98,_0xd9f45d['x'],_0xd9f45d['y'],_0x40d497);}},Window_ShopCommand[_0x420e63(0x125)][_0x420e63(0x3cd)]=function(_0x4737f8){const _0x4cd276=_0x420e63;this[_0x4cd276(0x2ab)](_0x4737f8)[_0x4cd276(0x3d9)](/\\I\[(\d+)\]/i);const _0x532a66=Number(RegExp['$1'])||0x0,_0x133a51=this['itemLineRect'](_0x4737f8),_0x112947=_0x133a51['x']+Math[_0x4cd276(0x192)]((_0x133a51[_0x4cd276(0x4b7)]-ImageManager[_0x4cd276(0x413)])/0x2),_0x95b11=_0x133a51['y']+(_0x133a51[_0x4cd276(0x3a1)]-ImageManager[_0x4cd276(0x35c)])/0x2;this[_0x4cd276(0x334)](_0x532a66,_0x112947,_0x95b11);},VisuMZ[_0x420e63(0x346)][_0x420e63(0x36e)]=Window_ShopBuy[_0x420e63(0x125)][_0x420e63(0x429)],Window_ShopBuy[_0x420e63(0x125)][_0x420e63(0x429)]=function(){const _0x1edc57=_0x420e63;this[_0x1edc57(0x4e1)](),VisuMZ[_0x1edc57(0x346)][_0x1edc57(0x36e)][_0x1edc57(0x178)](this);},Window_ShopBuy[_0x420e63(0x125)][_0x420e63(0x4e1)]=function(){const _0x32a4eb=_0x420e63;SceneManager[_0x32a4eb(0x2a7)][_0x32a4eb(0xef)]===Scene_Shop&&(this[_0x32a4eb(0x4e9)]=SceneManager[_0x32a4eb(0x2a7)][_0x32a4eb(0x3f8)]());},VisuMZ['ItemsEquipsCore'][_0x420e63(0x278)]=Window_ShopBuy[_0x420e63(0x125)]['price'],Window_ShopBuy['prototype'][_0x420e63(0x47b)]=function(_0x1a9880){const _0x4a34d4=_0x420e63;if(!_0x1a9880)return 0x0;let _0x20f4ce=VisuMZ[_0x4a34d4(0x346)]['Window_ShopBuy_price']['call'](this,_0x1a9880);return Math[_0x4a34d4(0x223)](0x0,this[_0x4a34d4(0x106)](_0x1a9880,_0x20f4ce));},Window_ShopBuy['prototype'][_0x420e63(0x106)]=function(_0x3e8c41,_0xbfb21b){const _0x4c655d=_0x420e63,_0xdd026c=_0x3e8c41[_0x4c655d(0x32d)];if(_0xdd026c[_0x4c655d(0x3d9)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x3e6612=String(RegExp['$1']);try{eval(_0x3e6612);}catch(_0x2a62bd){if('LqzhS'===_0x4c655d(0x3cc))_0xe3f5d6[_0x4c655d(0x346)]['Scene_Item_create'][_0x4c655d(0x178)](this),this[_0x4c655d(0x3ce)]()&&this[_0x4c655d(0x39a)]();else{if($gameTemp[_0x4c655d(0x42e)]())console[_0x4c655d(0x3e7)](_0x2a62bd);}}}_0xbfb21b=VisuMZ[_0x4c655d(0x346)][_0x4c655d(0x515)]['ShopScene']['BuyPriceJS']['call'](this,_0x3e8c41,_0xbfb21b);if(isNaN(_0xbfb21b))_0xbfb21b=0x0;return Math[_0x4c655d(0x192)](_0xbfb21b);},Window_ShopBuy[_0x420e63(0x125)][_0x420e63(0x3a4)]=function(_0x18d4b1){const _0x4167f2=_0x420e63;this[_0x4167f2(0x57c)]();const _0x42fad7=this[_0x4167f2(0x2c4)](_0x18d4b1),_0x1fc811=this[_0x4167f2(0x29a)](_0x18d4b1),_0x28bffc=_0x1fc811[_0x4167f2(0x4b7)];this[_0x4167f2(0x166)](this[_0x4167f2(0x4d5)](_0x42fad7)),this[_0x4167f2(0x3c9)](_0x42fad7,_0x1fc811['x'],_0x1fc811['y'],_0x28bffc),this[_0x4167f2(0x25d)](_0x42fad7,_0x1fc811),this['changePaintOpacity'](!![]);},Window_ShopBuy[_0x420e63(0x125)]['drawItemCost']=function(_0x304be4,_0x4ce32e){const _0x275e4c=_0x420e63,_0x43c44f=this[_0x275e4c(0x47b)](_0x304be4);this[_0x275e4c(0x274)](_0x43c44f,TextManager['currencyUnit'],_0x4ce32e['x'],_0x4ce32e['y'],_0x4ce32e['width']);},Window_ShopSell['prototype']['maxCols']=function(){const _0x4cec17=_0x420e63;return SceneManager['_scene'][_0x4cec17(0x3f3)]()?0x1:0x2;},VisuMZ[_0x420e63(0x346)][_0x420e63(0x3c1)]=Window_ShopSell[_0x420e63(0x125)][_0x420e63(0x4d5)],Window_ShopSell[_0x420e63(0x125)][_0x420e63(0x4d5)]=function(_0x76a098){const _0x3b38b2=_0x420e63;if(!_0x76a098)return![];const _0x55a2e5=_0x76a098[_0x3b38b2(0x32d)];if(_0x55a2e5[_0x3b38b2(0x3d9)](/<CANNOT SELL>/i))return![];if(_0x55a2e5[_0x3b38b2(0x3d9)](/<CAN SELL>/i))return!![];if(_0x55a2e5[_0x3b38b2(0x3d9)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3bcbc2=JSON[_0x3b38b2(0x3fd)]('['+RegExp['$1'][_0x3b38b2(0x3d9)](/\d+/g)+']');for(const _0xb77d01 of _0x3bcbc2){if(!$gameSwitches['value'](_0xb77d01))return![];}}if(_0x55a2e5['match'](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3fbd62=JSON[_0x3b38b2(0x3fd)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x47ffc9 of _0x3fbd62){if(!$gameSwitches[_0x3b38b2(0x118)](_0x47ffc9))return![];}}if(_0x55a2e5[_0x3b38b2(0x3d9)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x26b1d6=JSON['parse']('['+RegExp['$1'][_0x3b38b2(0x3d9)](/\d+/g)+']');for(const _0xf1bf8b of _0x26b1d6){if($gameSwitches[_0x3b38b2(0x118)](_0xf1bf8b))return![];}}return VisuMZ[_0x3b38b2(0x346)][_0x3b38b2(0x3c1)]['call'](this,_0x76a098);},Window_ShopStatus['prototype'][_0x420e63(0x285)]=function(){return![];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x402)]=function(){const _0x4b0b5d=_0x420e63;Window_StatusBase[_0x4b0b5d(0x125)][_0x4b0b5d(0x402)][_0x4b0b5d(0x178)](this);for(const _0x1d29c6 of $gameParty['members']()){if(_0x4b0b5d(0x219)===_0x4b0b5d(0x499)){if(_0x152aed[_0x4b0b5d(0x162)](_0x5deb7b))return![];return _0x184cbf[_0x4b0b5d(0x346)][_0x4b0b5d(0x264)]['call'](this,_0x2353b9);}else ImageManager['loadCharacter'](_0x1d29c6[_0x4b0b5d(0x4b6)]());}},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x2ce)]=function(){const _0x127ac4=_0x420e63;return VisuMZ[_0x127ac4(0x346)][_0x127ac4(0x515)][_0x127ac4(0x516)][_0x127ac4(0x216)];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x429)]=function(){const _0x26ce2b=_0x420e63;this[_0x26ce2b(0x35d)][_0x26ce2b(0x3e3)](),this[_0x26ce2b(0x3fa)][_0x26ce2b(0x3e3)]();if(this[_0x26ce2b(0x52e)]){this[_0x26ce2b(0x57c)](),this[_0x26ce2b(0x166)](!![]),this[_0x26ce2b(0x479)]();if(this[_0x26ce2b(0x30e)]())this[_0x26ce2b(0x2aa)]();else{if(_0x26ce2b(0x1f4)==='LnzDd')return _0x1ea262['ItemsEquipsCore']['Settings'][_0x26ce2b(0x3d3)][_0x26ce2b(0x543)];else this[_0x26ce2b(0x56e)]();}this['drawCustomShopGraphic']();}},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x261)]=function(_0x516e7f,_0x38fdb1){const _0x1e2960=_0x420e63;if(!this[_0x1e2960(0x30e)]()&&!DataManager['isItem'](this[_0x1e2960(0x52e)]))return;const _0xfdfefa=this[_0x1e2960(0x1a3)]-this['itemPadding']()-_0x516e7f,_0x6c1bb7=this[_0x1e2960(0x4d2)](_0x1e2960(0x44a));this[_0x1e2960(0x36a)](ColorManager[_0x1e2960(0x1cb)]()),this['drawText'](TextManager['possession'],_0x516e7f+this['itemPadding'](),_0x38fdb1,_0xfdfefa-_0x6c1bb7),this[_0x1e2960(0x3fb)](),this[_0x1e2960(0x41d)](this['_item'],_0x516e7f,_0x38fdb1,_0xfdfefa);},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x4c9)]=function(_0x5787f6,_0x23a24a,_0x3a1746,_0x1d5a53,_0x3df60c){const _0x1621f9=_0x420e63;if(VisuMZ[_0x1621f9(0x346)][_0x1621f9(0x515)][_0x1621f9(0x516)][_0x1621f9(0x233)]===![])return;_0x3df60c=Math['max'](_0x3df60c||0x1,0x1);while(_0x3df60c--){_0x1d5a53=_0x1d5a53||this['lineHeight'](),this[_0x1621f9(0x3fa)][_0x1621f9(0x304)]=0xa0;const _0x1a71fe=ColorManager[_0x1621f9(0x488)]();this[_0x1621f9(0x3fa)][_0x1621f9(0x174)](_0x5787f6+0x1,_0x23a24a+0x1,_0x3a1746-0x2,_0x1d5a53-0x2,_0x1a71fe),this[_0x1621f9(0x3fa)][_0x1621f9(0x304)]=0xff;}},ColorManager[_0x420e63(0x488)]=function(){const _0x117e37=_0x420e63,_0x53eb35=VisuMZ['ItemsEquipsCore']['Settings'][_0x117e37(0x516)];let _0x2b9812=_0x53eb35[_0x117e37(0x3dd)]!==undefined?_0x53eb35[_0x117e37(0x3dd)]:0x13;return ColorManager[_0x117e37(0x360)](_0x2b9812);},Window_ShopStatus[_0x420e63(0x125)]['drawEquipData']=function(){const _0xb1f562=_0x420e63;if(VisuMZ[_0xb1f562(0x346)][_0xb1f562(0x515)][_0xb1f562(0x516)]['DrawEquipData']){VisuMZ['ItemsEquipsCore'][_0xb1f562(0x515)]['StatusWindow'][_0xb1f562(0x47a)]['call'](this);return;}const _0x2b6beb=this['lineHeight'](),_0x1baecc=this['gaugeLineHeight']()+0x8;let _0x7a36f2=0x0,_0x558815=0x0,_0x3cf4f0=this['innerWidth'],_0x3bd501=this['innerHeight'],_0x3a8a31=Math[_0xb1f562(0x192)](_0x3cf4f0/0x2),_0x1073fe=_0x7a36f2+_0x3cf4f0-_0x3a8a31;this['drawItemName'](this['_item'],_0x7a36f2+this[_0xb1f562(0x36c)](),_0x558815,_0x3cf4f0-this['itemPadding']()*0x2),this[_0xb1f562(0x4c9)](_0x7a36f2,_0x558815,_0x3cf4f0),_0x558815+=_0x2b6beb;if(this[_0xb1f562(0x549)](_0x7a36f2,_0x558815,_0x3a8a31))_0x558815+=0x0;if(this[_0xb1f562(0x387)](_0x1073fe,_0x558815,_0x3a8a31))_0x558815+=_0x2b6beb;const _0x39acce=this[_0xb1f562(0x490)](),_0x2535c6=_0x558815;_0x558815=_0x3bd501-_0x39acce[_0xb1f562(0x20e)]*_0x1baecc-0x4;let _0x14f614=_0x7a36f2,_0xb53a85=0x0,_0x11a242=_0x558815;for(const _0x16023f of _0x39acce){_0xb53a85=Math[_0xb1f562(0x223)](this[_0xb1f562(0x2f7)](_0x16023f,_0x7a36f2+0x4,_0x558815+0x4,_0x3cf4f0),_0xb53a85),_0x558815+=_0x1baecc;}const _0x44398b=$gameParty['maxBattleMembers'](),_0x23169=Math[_0xb1f562(0x192)]((_0x3cf4f0-_0xb53a85)/_0x44398b);_0xb53a85=_0x3cf4f0-_0x23169*_0x44398b;for(const _0x4645b1 of $gameParty[_0xb1f562(0x546)]()){if('SXaxy'===_0xb1f562(0x245)){const _0x199659=$gameParty[_0xb1f562(0x546)]()[_0xb1f562(0x4c2)](_0x4645b1),_0x107e3b=_0x14f614+_0xb53a85+_0x199659*_0x23169;this['changePaintOpacity'](_0x4645b1[_0xb1f562(0x44f)](this['_item'])),this[_0xb1f562(0x2e8)](_0x4645b1,_0x107e3b+_0x23169/0x2,_0x11a242);let _0x1fe1ee=_0x11a242;for(const _0x50f57a of _0x39acce){const _0x46708a=_0x1fe1ee-(_0x2b6beb-_0x1baecc)/0x2;this[_0xb1f562(0x43a)](_0x4645b1,_0x50f57a,_0x107e3b,_0x46708a,_0x23169),_0x1fe1ee+=_0x1baecc;}}else _0x60875d[_0xb1f562(0x125)][_0xb1f562(0x523)][_0xb1f562(0x178)](this);}this[_0xb1f562(0x4c9)](_0x14f614,_0x2535c6,_0xb53a85,_0x11a242-_0x2535c6);for(let _0x155f3c=0x0;_0x155f3c<_0x44398b;_0x155f3c++){const _0x5e701f=_0x14f614+_0xb53a85+_0x155f3c*_0x23169;this[_0xb1f562(0x4c9)](_0x5e701f,_0x2535c6,_0x23169,_0x11a242-_0x2535c6);}for(const _0x44e010 of _0x39acce){this[_0xb1f562(0x4c9)](_0x14f614,_0x11a242,_0xb53a85,_0x1baecc);for(let _0x420727=0x0;_0x420727<_0x44398b;_0x420727++){const _0x66a5ee=_0x14f614+_0xb53a85+_0x420727*_0x23169;this[_0xb1f562(0x4c9)](_0x66a5ee,_0x11a242,_0x23169,_0x1baecc);}_0x11a242+=_0x1baecc;}},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x549)]=function(_0x1bbe9a,_0x8d51ac,_0x5ce6d9){const _0x551428=_0x420e63;if(!this[_0x551428(0x30e)]())return![];const _0x45a8dd=$dataSystem[_0x551428(0x3eb)][this[_0x551428(0x52e)][_0x551428(0x29e)]];return this['drawItemKeyData'](_0x45a8dd,_0x1bbe9a,_0x8d51ac,_0x5ce6d9,!![]),this[_0x551428(0x4c9)](_0x1bbe9a,_0x8d51ac,_0x5ce6d9),this[_0x551428(0x57c)](),!![];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x4b5)]=function(){const _0x589b0e=_0x420e63,_0x45d29f=VisuMZ[_0x589b0e(0x346)][_0x589b0e(0x515)]['ItemScene'][_0x589b0e(0xf6)];return _0x45d29f[_0x589b0e(0x24b)]($gameParty[_0x589b0e(0x3e1)](this[_0x589b0e(0x52e)]));},Window_ShopStatus['prototype'][_0x420e63(0x490)]=function(){const _0x15b8c9=_0x420e63;let _0x31e70e=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];return Imported[_0x15b8c9(0x51f)]&&(_0x31e70e=VisuMZ[_0x15b8c9(0x539)]['Settings'][_0x15b8c9(0x1eb)][_0x15b8c9(0x262)]),_0x31e70e=_0x31e70e[_0x15b8c9(0x155)](_0x752a00=>typeof _0x752a00==='number'?_0x752a00:_0x752a00['toUpperCase']()[_0x15b8c9(0x113)]()),_0x31e70e;},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x2cd)]=function(){const _0x6f0593=_0x420e63;return VisuMZ[_0x6f0593(0x346)]['Settings']['StatusWindow'][_0x6f0593(0x554)];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x2f7)]=function(_0x18033c,_0x25f633,_0x4777ed,_0x1eb094){const _0x100da1=_0x420e63;this[_0x100da1(0x57c)](),this[_0x100da1(0x35d)][_0x100da1(0x536)]=this[_0x100da1(0x2cd)]();let _0x218863=this[_0x100da1(0x4d2)](TextManager[_0x100da1(0x385)](_0x18033c))+0x4+_0x25f633;if(Imported[_0x100da1(0x51f)]){if('nnlHe'!==_0x100da1(0x1be))return this[_0x100da1(0x551)]&&this[_0x100da1(0x551)][_0x100da1(0x3ce)]();else{this[_0x100da1(0x221)](_0x25f633,_0x4777ed,_0x1eb094,_0x18033c,!![]);if(VisuMZ[_0x100da1(0x539)]['Settings']['Param'][_0x100da1(0x49c)]){if(_0x100da1(0x3b0)===_0x100da1(0x3b0))_0x218863+=ImageManager[_0x100da1(0x413)]+0x4;else return _0x45359b[_0x100da1(0x125)][_0x100da1(0x1d5)]['call'](this);}}}else this['changeTextColor'](ColorManager[_0x100da1(0x1cb)]()),this[_0x100da1(0x4a8)](TextManager['param'](_0x18033c),_0x25f633,_0x4777ed,_0x1eb094);return this[_0x100da1(0x57c)](),_0x218863;},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x43a)]=function(_0x1bff26,_0x3d8934,_0x241afa,_0xa1d56b,_0x254e61){const _0x5c6ef0=_0x420e63;_0x241afa+=this[_0x5c6ef0(0x36c)](),_0x254e61-=this[_0x5c6ef0(0x36c)]()*0x2;const _0x30191e=VisuMZ[_0x5c6ef0(0x346)]['Settings']['StatusWindow'];this['contents'][_0x5c6ef0(0x536)]=_0x30191e[_0x5c6ef0(0x554)],this[_0x5c6ef0(0x166)](_0x1bff26[_0x5c6ef0(0x44f)](this[_0x5c6ef0(0x52e)]));if(_0x1bff26['isEquipped'](this[_0x5c6ef0(0x52e)])&&!_0x1bff26[_0x5c6ef0(0x3b9)](this[_0x5c6ef0(0x52e)])){const _0xbc69ea=_0x30191e[_0x5c6ef0(0x4dc)];this[_0x5c6ef0(0x4a8)](_0xbc69ea,_0x241afa,_0xa1d56b,_0x254e61,'center');}else{if(_0x1bff26[_0x5c6ef0(0x44f)](this[_0x5c6ef0(0x52e)])){const _0x4deb26=JsonEx[_0x5c6ef0(0x4e5)](_0x1bff26);_0x4deb26[_0x5c6ef0(0x339)]=!![];const _0x4bfe=_0x4deb26[_0x5c6ef0(0x30d)](this[_0x5c6ef0(0x52e)]);_0x4bfe>=0x0&&_0x4deb26[_0x5c6ef0(0x11c)](_0x4bfe,this['_item']);let _0x42bbf5=0x0,_0x2ac1ce=0x0,_0x28474f=0x0;if(Imported['VisuMZ_0_CoreEngine'])_0x42bbf5=_0x4deb26[_0x5c6ef0(0x419)](_0x3d8934),_0x2ac1ce=_0x42bbf5-_0x1bff26[_0x5c6ef0(0x419)](_0x3d8934),this[_0x5c6ef0(0x36a)](ColorManager[_0x5c6ef0(0x2fe)](_0x2ac1ce)),_0x28474f=(_0x2ac1ce>=0x0?'+':'')+VisuMZ[_0x5c6ef0(0x10b)](_0x2ac1ce,0x0,_0x3d8934);else{if(_0x5c6ef0(0x345)==='ZYLzs')_0x42bbf5=_0x4deb26['param'](_0x3d8934),_0x2ac1ce=_0x42bbf5-_0x1bff26['param'](_0x3d8934),this[_0x5c6ef0(0x36a)](ColorManager[_0x5c6ef0(0x2fe)](_0x2ac1ce)),_0x28474f=(_0x2ac1ce>=0x0?'+':'')+_0x2ac1ce;else{if(this[_0x5c6ef0(0x258)]())return this['_buttonAssistWindow']['width']/0x5/-0x3;return _0x229d7b['prototype'][_0x5c6ef0(0x26c)]['call'](this);}}_0x28474f==='+0'&&(_0x28474f=_0x30191e[_0x5c6ef0(0x279)]),this[_0x5c6ef0(0x4a8)](_0x28474f,_0x241afa,_0xa1d56b,_0x254e61,'center');}else{const _0x4b0edb=_0x30191e['CannotEquipMarker'];this['drawText'](_0x4b0edb,_0x241afa,_0xa1d56b,_0x254e61,_0x5c6ef0(0x263));}}this[_0x5c6ef0(0x57c)](),this[_0x5c6ef0(0x166)](!![]);},Game_Actor[_0x420e63(0x125)][_0x420e63(0x3b9)]=function(_0x13653e){const _0x1948c0=_0x420e63;if(!_0x13653e)return![];const _0x5a2f72=_0x13653e['etypeId'],_0x203782=this['equipSlots']();for(let _0x1733dc=0x0;_0x1733dc<_0x203782['length'];_0x1733dc++){const _0x235730=_0x203782[_0x1733dc];if(_0x235730!==_0x5a2f72)continue;if(!this[_0x1948c0(0x378)]()[_0x1733dc])return!![];}return![];},Game_Actor[_0x420e63(0x125)]['getEmptyEquipSlotOfSameEtype']=function(_0x3f2ad0){const _0x67cc24=_0x420e63;if(!_0x3f2ad0)return-0x1;const _0x17d579=_0x3f2ad0[_0x67cc24(0x29e)],_0x520a00=this[_0x67cc24(0x4ca)]();let _0x5ddd84=-0x1;for(let _0x29411e=0x0;_0x29411e<_0x520a00[_0x67cc24(0x20e)];_0x29411e++){const _0x5bb5c3=_0x520a00[_0x29411e];if(_0x5bb5c3!==_0x17d579)continue;if(!this['equips']()[_0x29411e])return _0x29411e;if(_0x5ddd84<0x0)_0x5ddd84=_0x29411e;}return _0x5ddd84;},Window_ShopStatus[_0x420e63(0x125)]['drawItemData']=function(){const _0x4bd310=_0x420e63;VisuMZ[_0x4bd310(0x346)][_0x4bd310(0x515)][_0x4bd310(0x516)][_0x4bd310(0x43f)]['call'](this);},Window_ShopStatus[_0x420e63(0x125)]['prepareItemCustomData']=function(){const _0xd5a03c=_0x420e63;this[_0xd5a03c(0x4d7)]={};if(!this[_0xd5a03c(0x52e)])return;const _0x15d1fc=this[_0xd5a03c(0x52e)][_0xd5a03c(0x32d)];if(_0x15d1fc[_0xd5a03c(0x3d9)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x1f2be4=String(RegExp['$1'])[_0xd5a03c(0x2b5)](/[\r\n]+/);for(const _0x425b66 of _0x1f2be4){if(_0xd5a03c(0xe5)!==_0xd5a03c(0xe5))_0x4da40f[_0xd5a03c(0x2ee)](_0x16c410[_0xd5a03c(0x369)],!![]);else{if(_0x425b66[_0xd5a03c(0x3d9)](/(.*):[ ](.*)/i)){const _0xabf667=String(RegExp['$1'])['toUpperCase']()[_0xd5a03c(0x113)](),_0x215fcd=String(RegExp['$2'])['trim']();this[_0xd5a03c(0x4d7)][_0xabf667]=_0x215fcd;}}}}},Window_ShopStatus['prototype'][_0x420e63(0x17d)]=function(){return Math['max'](0x1,$gameSystem['mainFontSize']()-0x4);},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x57c)]=function(){const _0x3dcba1=_0x420e63;Window_StatusBase[_0x3dcba1(0x125)][_0x3dcba1(0x57c)][_0x3dcba1(0x178)](this),this[_0x3dcba1(0x35d)]['fontSize']=this[_0x3dcba1(0x4cb)]||this[_0x3dcba1(0x35d)][_0x3dcba1(0x536)],this[_0x3dcba1(0x35d)]['textColor']=this[_0x3dcba1(0x1e3)]||this[_0x3dcba1(0x35d)][_0x3dcba1(0x4e2)];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x186)]=function(){const _0x28c8a2=_0x420e63;return this[_0x28c8a2(0x35d)][_0x28c8a2(0x536)]/$gameSystem[_0x28c8a2(0x3ab)]();},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x334)]=function(_0x56394d,_0x2a3392,_0x5c86ae){const _0x447ba4=_0x420e63,_0x34e30c=ImageManager[_0x447ba4(0x24c)](_0x447ba4(0x3b1)),_0x5edd75=ImageManager[_0x447ba4(0x413)],_0x4b7a55=ImageManager[_0x447ba4(0x35c)],_0x173690=_0x56394d%0x10*_0x5edd75,_0x4886b3=Math['floor'](_0x56394d/0x10)*_0x4b7a55,_0x3c4c73=Math['ceil'](_0x5edd75*this['fontSizeRatio']()),_0x36ab04=Math[_0x447ba4(0x2fd)](_0x4b7a55*this[_0x447ba4(0x186)]());this[_0x447ba4(0x35d)][_0x447ba4(0x2b0)](_0x34e30c,_0x173690,_0x4886b3,_0x5edd75,_0x4b7a55,_0x2a3392,_0x5c86ae,_0x3c4c73,_0x36ab04);},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x108)]=function(_0x3be850,_0x8d81c){const _0x459a50=_0x420e63;_0x8d81c['drawing']&&this[_0x459a50(0x334)](_0x3be850,_0x8d81c['x'],_0x8d81c['y']+0x2);_0x8d81c['x']+=Math[_0x459a50(0x2fd)](ImageManager['iconWidth']*this['fontSizeRatio']());if(this['fontSizeRatio']()===0x1)_0x8d81c['x']+=0x4;},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0xe4)]=function(_0x2450c8,_0x259e5e,_0x35965a,_0x184d89,_0x440f74,_0xfc799f){const _0x34a224=_0x420e63;_0x2450c8=_0x2450c8||'',_0xfc799f=_0xfc799f||'left',this['_resetFontSize']=this[_0x34a224(0x17d)](),this[_0x34a224(0x1e3)]=_0x440f74?ColorManager[_0x34a224(0x1cb)]():this[_0x34a224(0x35d)][_0x34a224(0x4e2)],_0x259e5e+=this['itemPadding'](),_0x184d89-=this['itemPadding']()*0x2;const _0x1a8e28=this[_0x34a224(0x32b)](_0x2450c8);if(_0xfc799f===_0x34a224(0x263))_0x259e5e=_0x259e5e+Math[_0x34a224(0x192)]((_0x184d89-_0x1a8e28[_0x34a224(0x4b7)])/0x2);else{if(_0xfc799f===_0x34a224(0x4eb)){if(_0x34a224(0x15d)===_0x34a224(0x311))return _0x4b7ddc['ItemsEquipsCore']['Settings']['StatusWindow'][_0x34a224(0x19e)];else _0x259e5e=_0x259e5e+_0x184d89-_0x1a8e28[_0x34a224(0x4b7)];}}_0x35965a+=(this[_0x34a224(0xf3)]()-_0x1a8e28[_0x34a224(0x3a1)])/0x2,this['drawTextEx'](_0x2450c8,_0x259e5e,_0x35965a,_0x184d89),this[_0x34a224(0x4cb)]=undefined,this[_0x34a224(0x1e3)]=undefined,this[_0x34a224(0x57c)]();},Window_ShopStatus['prototype'][_0x420e63(0x2ef)]=function(_0x8ce29,_0x4a7866,_0x2d5688){const _0x35c096=_0x420e63;if(!DataManager[_0x35c096(0x495)](this['_item']))return![];const _0x3aa6a5=this['getItemConsumableLabel']();this['drawItemKeyData'](_0x3aa6a5,_0x8ce29,_0x4a7866,_0x2d5688,!![]);const _0x4c7235=this[_0x35c096(0x1af)]();return this['drawItemKeyData'](_0x4c7235,_0x8ce29,_0x4a7866,_0x2d5688,![],_0x35c096(0x4eb)),this['drawItemDarkRect'](_0x8ce29,_0x4a7866,_0x2d5688),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x424)]=function(){const _0x361e00=_0x420e63;return VisuMZ[_0x361e00(0x346)]['Settings'][_0x361e00(0x516)][_0x361e00(0x408)];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x1af)]=function(){const _0x18cc81=_0x420e63,_0x5d14d7=_0x18cc81(0x4ea);if(this[_0x18cc81(0x4d7)][_0x5d14d7])return this[_0x18cc81(0x4d7)][_0x5d14d7];return this[_0x18cc81(0x2bb)]()?VisuMZ[_0x18cc81(0x346)][_0x18cc81(0x515)]['StatusWindow'][_0x18cc81(0x135)]:_0x18cc81(0x157)===_0x18cc81(0x157)?VisuMZ[_0x18cc81(0x346)][_0x18cc81(0x515)]['StatusWindow']['NotConsumable']:_0x187c53[_0x18cc81(0x346)][_0x18cc81(0x515)][_0x18cc81(0x516)][_0x18cc81(0x267)];},Window_ShopStatus[_0x420e63(0x125)]['canConsumeItem']=function(){const _0x501aa8=_0x420e63;if(VisuMZ[_0x501aa8(0x539)]&&VisuMZ[_0x501aa8(0x539)][_0x501aa8(0x515)][_0x501aa8(0x2f6)][_0x501aa8(0x46a)]&&DataManager[_0x501aa8(0x276)](this[_0x501aa8(0x52e)]))return![];else{if(_0x501aa8(0x552)!=='qpZsn')return this[_0x501aa8(0x52e)][_0x501aa8(0x41a)];else _0x4156a1=_0x56f55a['round']((this['innerHeight']-_0xc08c5a)/0x2);}},Window_ShopStatus[_0x420e63(0x125)]['drawItemQuantity']=function(_0x3f7946,_0x2e803a,_0x46f7b7){const _0x358b98=_0x420e63;if(!this[_0x358b98(0x30e)]()&&!DataManager[_0x358b98(0x495)](this[_0x358b98(0x52e)]))return![];if(DataManager[_0x358b98(0x276)](this['_item'])&&!$dataSystem['optKeyItemsNumber']){const _0x25e699=TextManager[_0x358b98(0x3a6)];this[_0x358b98(0xe4)](_0x25e699,_0x3f7946,_0x2e803a,_0x46f7b7,!![],_0x358b98(0x263));}else{const _0x478806=TextManager[_0x358b98(0x1b1)];this[_0x358b98(0xe4)](_0x478806,_0x3f7946,_0x2e803a,_0x46f7b7,!![]);const _0x469792=this[_0x358b98(0x4b5)]();this[_0x358b98(0xe4)](_0x469792,_0x3f7946,_0x2e803a,_0x46f7b7,![],_0x358b98(0x4eb));}return this[_0x358b98(0x4c9)](_0x3f7946,_0x2e803a,_0x46f7b7),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x4b5)]=function(){const _0x175a76=_0x420e63,_0x4bbabf=_0x175a76(0x136);if(this[_0x175a76(0x4d7)][_0x4bbabf])return this[_0x175a76(0x4d7)][_0x4bbabf];const _0xc2c680=VisuMZ[_0x175a76(0x346)]['Settings'][_0x175a76(0x2a2)][_0x175a76(0xf6)];return _0xc2c680[_0x175a76(0x24b)]($gameParty['numItems'](this[_0x175a76(0x52e)]));},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x131)]=function(_0x10c5ce,_0x423aa4,_0x2e8b75){const _0x5438e7=_0x420e63,_0x23e514=this['getItemOccasionText']();return this[_0x5438e7(0xe4)](_0x23e514,_0x10c5ce,_0x423aa4,_0x2e8b75,![],_0x5438e7(0x263)),this[_0x5438e7(0x4c9)](_0x10c5ce,_0x423aa4,_0x2e8b75),this[_0x5438e7(0x57c)](),!![];},Window_ShopStatus['prototype']['getItemOccasionText']=function(){const _0x380b2a=_0x420e63,_0x5d4524='OCCASION';if(this[_0x380b2a(0x4d7)][_0x5d4524])return this[_0x380b2a(0x4d7)][_0x5d4524];const _0x141207=VisuMZ[_0x380b2a(0x346)][_0x380b2a(0x515)][_0x380b2a(0x516)],_0x2bb92c=_0x380b2a(0x2ae)['format'](this['_item']['occasion']);return _0x141207[_0x2bb92c];},Window_ShopStatus[_0x420e63(0x125)]['drawItemScope']=function(_0x927588,_0x3e132e,_0x547bc2){const _0x5bf6e0=_0x420e63,_0x10c370=this[_0x5bf6e0(0x228)]();return this['drawItemKeyData'](_0x10c370,_0x927588,_0x3e132e,_0x547bc2,![],_0x5bf6e0(0x263)),this[_0x5bf6e0(0x4c9)](_0x927588,_0x3e132e,_0x547bc2),this[_0x5bf6e0(0x57c)](),!![];},Window_ShopStatus['prototype'][_0x420e63(0x228)]=function(){const _0x2d8f0e=_0x420e63,_0x4f4fb8=_0x2d8f0e(0x19a);if(this[_0x2d8f0e(0x4d7)][_0x4f4fb8])return this['_customItemInfo'][_0x4f4fb8];const _0x3f4e40=VisuMZ[_0x2d8f0e(0x346)]['Settings'][_0x2d8f0e(0x516)];if(Imported['VisuMZ_1_BattleCore']){if(_0x2d8f0e(0x4a4)==='TdRla')_0x3fcf34['prototype']['deactivate']['call'](this),this[_0x2d8f0e(0x551)]&&this[_0x2d8f0e(0x551)][_0x2d8f0e(0x3ce)]()&&this[_0x2d8f0e(0x551)][_0x2d8f0e(0x1da)]();else{const _0x2e173c=this[_0x2d8f0e(0x52e)][_0x2d8f0e(0x32d)];if(_0x2e173c[_0x2d8f0e(0x3d9)](/<TARGET:[ ](.*)>/i)){const _0x3e99de=String(RegExp['$1']);if(_0x3e99de[_0x2d8f0e(0x3d9)](/(\d+) RANDOM ANY/i)){if(_0x2d8f0e(0x33d)!=='SzCed'){const _0x358fbb=new _0x352269(0x0,0x0,_0x49c6b5[_0x2d8f0e(0x4b7)],_0x401171[_0x2d8f0e(0x3a1)]);this[_0x2d8f0e(0x1df)]=new _0x870ff(_0x358fbb),this[_0x2d8f0e(0x1df)]['opacity']=0x0,this['addChild'](this[_0x2d8f0e(0x1df)]),this[_0x2d8f0e(0x372)]();}else return _0x3f4e40[_0x2d8f0e(0x381)][_0x2d8f0e(0x24b)](Number(RegExp['$1']));}else{if(_0x3e99de[_0x2d8f0e(0x3d9)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x3f4e40[_0x2d8f0e(0x508)][_0x2d8f0e(0x24b)](Number(RegExp['$1']));else{if(_0x3e99de['match'](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x3f4e40[_0x2d8f0e(0x493)][_0x2d8f0e(0x24b)](Number(RegExp['$1']));else{if(_0x3e99de[_0x2d8f0e(0x3d9)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i)){if('SFaan'!==_0x2d8f0e(0x571))return _0x3f4e40['ScopeAlliesButUser'];else _0x1ff1ef[_0x2d8f0e(0x346)][_0x2d8f0e(0x3d2)][_0x2d8f0e(0x178)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x2d8f0e(0x1f7)]();}}}}}}}const _0x56ebaa=_0x2d8f0e(0x357)[_0x2d8f0e(0x24b)](this[_0x2d8f0e(0x52e)][_0x2d8f0e(0x24d)]);return _0x3f4e40[_0x56ebaa];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x232)]=function(_0x281f11,_0xa2051e,_0x4744ad){const _0x3b2692=_0x420e63,_0x58d28f=this[_0x3b2692(0x439)]();this[_0x3b2692(0xe4)](_0x58d28f,_0x281f11,_0xa2051e,_0x4744ad,!![]);const _0x1d05dd=this['getItemSpeedText']();return this[_0x3b2692(0xe4)](_0x1d05dd,_0x281f11,_0xa2051e,_0x4744ad,![],_0x3b2692(0x4eb)),this[_0x3b2692(0x4c9)](_0x281f11,_0xa2051e,_0x4744ad),this[_0x3b2692(0x57c)](),!![];},Window_ShopStatus[_0x420e63(0x125)]['getItemSpeedLabel']=function(){const _0x4f5cf3=_0x420e63;return VisuMZ[_0x4f5cf3(0x346)][_0x4f5cf3(0x515)]['StatusWindow'][_0x4f5cf3(0x4f1)];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x1f8)]=function(){const _0x25de95=_0x420e63,_0x1c7859=_0x25de95(0x423);if(this['_customItemInfo'][_0x1c7859])return this[_0x25de95(0x4d7)][_0x1c7859];const _0x52c435=this[_0x25de95(0x52e)][_0x25de95(0x21f)];if(_0x52c435>=0x7d0){if('gfEpb'!==_0x25de95(0x1de))_0x17e691=_0x25de95(0x567)[_0x25de95(0x24b)](_0x238966['id']);else return VisuMZ[_0x25de95(0x346)][_0x25de95(0x515)][_0x25de95(0x516)][_0x25de95(0x504)];}else{if(_0x52c435>=0x3e8){if(_0x25de95(0x35f)!=='cXMiO'){const _0xa2574a=this['isRightInputMode']()?this[_0x25de95(0xfc)]():0x0,_0x208dc5=this['_categoryWindow']['y']+this[_0x25de95(0x551)][_0x25de95(0x3a1)],_0x2acf19=_0x3a6f6c[_0x25de95(0x513)]-this[_0x25de95(0xfc)](),_0x4376b1=this[_0x25de95(0x560)]()-_0x208dc5;return new _0x53cd2e(_0xa2574a,_0x208dc5,_0x2acf19,_0x4376b1);}else return VisuMZ[_0x25de95(0x346)][_0x25de95(0x515)]['StatusWindow'][_0x25de95(0x267)];}else{if(_0x52c435>0x0)return VisuMZ[_0x25de95(0x346)]['Settings'][_0x25de95(0x516)][_0x25de95(0x123)];else{if(_0x52c435===0x0)return _0x25de95(0x306)===_0x25de95(0x306)?VisuMZ[_0x25de95(0x346)][_0x25de95(0x515)]['StatusWindow'][_0x25de95(0x44d)]:_0x18e0d9[_0x25de95(0x346)][_0x25de95(0x515)]['StatusWindow']['LabelElement'];else{if(_0x52c435>-0x3e8)return _0x25de95(0x1fc)!=='MUVdn'?VisuMZ[_0x25de95(0x346)][_0x25de95(0x515)][_0x25de95(0x516)]['SpeedNeg999']:_0x173aad[_0x25de95(0x192)](this[_0x25de95(0x46d)]());else{if(_0x52c435>-0x7d0){if(_0x25de95(0x4a6)!==_0x25de95(0x4a6)){const _0x11762e=_0x25de95(0x136);if(this[_0x25de95(0x4d7)][_0x11762e])return this[_0x25de95(0x4d7)][_0x11762e];const _0x3fded6=_0x38fc51[_0x25de95(0x346)][_0x25de95(0x515)][_0x25de95(0x2a2)][_0x25de95(0xf6)];return _0x3fded6[_0x25de95(0x24b)](_0x5bb2da['numItems'](this[_0x25de95(0x52e)]));}else return VisuMZ[_0x25de95(0x346)][_0x25de95(0x515)][_0x25de95(0x516)][_0x25de95(0x124)];}else return _0x52c435<=-0x7d0?VisuMZ[_0x25de95(0x346)][_0x25de95(0x515)][_0x25de95(0x516)]['SpeedNeg2000']:'?????';}}}}}},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x43b)]=function(_0x33841b,_0x260109,_0x2f373a){const _0x40a419=_0x420e63,_0xc8f737=this[_0x40a419(0x321)]();this[_0x40a419(0xe4)](_0xc8f737,_0x33841b,_0x260109,_0x2f373a,!![]);const _0x223ff8=this[_0x40a419(0x4bd)]();return this[_0x40a419(0xe4)](_0x223ff8,_0x33841b,_0x260109,_0x2f373a,![],_0x40a419(0x4eb)),this[_0x40a419(0x4c9)](_0x33841b,_0x260109,_0x2f373a),this[_0x40a419(0x57c)](),!![];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x321)]=function(){const _0x75136c=_0x420e63;return VisuMZ['ItemsEquipsCore'][_0x75136c(0x515)]['StatusWindow']['LabelSuccessRate'];},Window_ShopStatus['prototype'][_0x420e63(0x4bd)]=function(){const _0x453a06=_0x420e63,_0x18d82f=_0x453a06(0x47c);if(this['_customItemInfo'][_0x18d82f])return this[_0x453a06(0x4d7)][_0x18d82f];if(Imported[_0x453a06(0x2db)]){const _0x2f0755=this[_0x453a06(0x52e)]['note'];if(_0x2f0755['match'](/<ALWAYS HIT>/i))return _0x453a06(0x13a)===_0x453a06(0x54c)?_0x175e4a[_0x453a06(0x346)]['Scene_Equip_slotWindowRect']['call'](this):'100%';else{if(_0x2f0755[_0x453a06(0x3d9)](/<ALWAYS HIT RATE: (\d+)([%％])>/i)){if(_0x453a06(0x34e)!==_0x453a06(0x34e))this[_0x453a06(0x133)]();else return _0x453a06(0x4f7)['format'](Number(RegExp['$1']));}}}return _0x453a06(0x4f7)[_0x453a06(0x24b)](this[_0x453a06(0x52e)]['successRate']);},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x184)]=function(_0x21ac5f,_0x35c9a5,_0x3ec7df){const _0x36ee3d=_0x420e63,_0x2c10a0=this['getItemRepeatsLabel']();this['drawItemKeyData'](_0x2c10a0,_0x21ac5f,_0x35c9a5,_0x3ec7df,!![]);const _0x4e65a8=this[_0x36ee3d(0x2e0)]();return this['drawItemKeyData'](_0x4e65a8,_0x21ac5f,_0x35c9a5,_0x3ec7df,![],_0x36ee3d(0x4eb)),this['drawItemDarkRect'](_0x21ac5f,_0x35c9a5,_0x3ec7df),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x282)]=function(){const _0x5adbee=_0x420e63;return VisuMZ[_0x5adbee(0x346)]['Settings'][_0x5adbee(0x516)][_0x5adbee(0x1e8)];},Window_ShopStatus[_0x420e63(0x125)]['getItemRepeatsText']=function(){const _0x57e730=_0x420e63,_0x544c84=_0x57e730(0x2a4);if(this['_customItemInfo'][_0x544c84])return this['_customItemInfo'][_0x544c84];const _0x3c4d8a=_0x57e730(0x4fd);return _0x3c4d8a['format'](this[_0x57e730(0x52e)][_0x57e730(0x1fa)]);},Window_ShopStatus[_0x420e63(0x125)]['drawItemHitType']=function(_0x45d3a8,_0xf747b6,_0x2f4c3c){const _0x42e891=_0x420e63,_0x175ef8=this['getItemHitTypeLabel']();this['drawItemKeyData'](_0x175ef8,_0x45d3a8,_0xf747b6,_0x2f4c3c,!![]);const _0x21386d=this['getItemHitTypeText']();return this[_0x42e891(0xe4)](_0x21386d,_0x45d3a8,_0xf747b6,_0x2f4c3c,![],_0x42e891(0x4eb)),this['drawItemDarkRect'](_0x45d3a8,_0xf747b6,_0x2f4c3c),this[_0x42e891(0x57c)](),!![];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x51c)]=function(){const _0x41218e=_0x420e63;return VisuMZ[_0x41218e(0x346)][_0x41218e(0x515)]['StatusWindow']['LabelHitType'];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0xf7)]=function(){const _0x151565=_0x420e63,_0x34d1ce=_0x151565(0xe7);if(this[_0x151565(0x4d7)][_0x34d1ce])return this[_0x151565(0x4d7)][_0x34d1ce];const _0x289739=VisuMZ[_0x151565(0x346)][_0x151565(0x515)][_0x151565(0x516)],_0x34aa9b=_0x151565(0x10e)['format'](this['_item'][_0x151565(0x331)]);return _0x289739[_0x34aa9b];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x533)]=function(_0x3bedb6,_0x3d83bf,_0x4760bb){const _0x5a3cb8=_0x420e63;if(this[_0x5a3cb8(0x52e)][_0x5a3cb8(0x3b7)]['type']<=0x0)return _0x3d83bf;if(this[_0x5a3cb8(0x217)](_0x3bedb6,_0x3d83bf,_0x4760bb))_0x3d83bf+=this[_0x5a3cb8(0xf3)]();if(this[_0x5a3cb8(0x44c)](_0x3bedb6,_0x3d83bf,_0x4760bb))_0x3d83bf+=this[_0x5a3cb8(0xf3)]();return this['resetFontSettings'](),_0x3d83bf;},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x217)]=function(_0x114e87,_0x5a69a7,_0x3dc99b){const _0x55ed28=_0x420e63,_0xc3b0cd=this[_0x55ed28(0x1fe)]();this[_0x55ed28(0xe4)](_0xc3b0cd,_0x114e87,_0x5a69a7,_0x3dc99b,!![]);const _0x20b324=this['getItemDamageElementText']();return this['drawItemKeyData'](_0x20b324,_0x114e87,_0x5a69a7,_0x3dc99b,![],_0x55ed28(0x4eb)),this[_0x55ed28(0x4c9)](_0x114e87,_0x5a69a7,_0x3dc99b),this[_0x55ed28(0x57c)](),!![];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x1fe)]=function(){const _0x35ee94=_0x420e63;return VisuMZ[_0x35ee94(0x346)][_0x35ee94(0x515)]['StatusWindow'][_0x35ee94(0x4d1)];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x2c2)]=function(){const _0x47f086=_0x420e63,_0x53b93a=_0x47f086(0x437);if(this[_0x47f086(0x4d7)][_0x53b93a])return this[_0x47f086(0x4d7)][_0x53b93a];if(this[_0x47f086(0x52e)]['damage']['elementId']<=-0x1)return VisuMZ[_0x47f086(0x346)][_0x47f086(0x515)][_0x47f086(0x516)][_0x47f086(0x54e)];else{if(this[_0x47f086(0x52e)][_0x47f086(0x3b7)][_0x47f086(0x4dd)]===0x0){if(_0x47f086(0x152)==='wVwdJ')_0x3432f2+=_0x2aa84f(_0x36f774['$1']),_0x3e3af0+=_0x4d8fdb(_0x15cbb8['$2']);else return VisuMZ[_0x47f086(0x346)][_0x47f086(0x515)][_0x47f086(0x516)][_0x47f086(0x2ad)];}else return $dataSystem['elements'][this[_0x47f086(0x52e)][_0x47f086(0x3b7)]['elementId']];}},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x44c)]=function(_0x3eb07a,_0x4118a9,_0x6a85ce){const _0x11e81b=_0x420e63,_0x3ef680=this[_0x11e81b(0x25a)]();this[_0x11e81b(0xe4)](_0x3ef680,_0x3eb07a,_0x4118a9,_0x6a85ce,!![]),this['setupItemDamageTempActors']();const _0x2320a3=this[_0x11e81b(0x320)](),_0x20f07b=ColorManager[_0x11e81b(0x126)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this['_item'][_0x11e81b(0x3b7)]['type']]);return this['changeTextColor'](_0x20f07b),this[_0x11e81b(0xe4)](_0x2320a3,_0x3eb07a,_0x4118a9,_0x6a85ce,![],_0x11e81b(0x4eb)),this['drawItemDarkRect'](_0x3eb07a,_0x4118a9,_0x6a85ce),this[_0x11e81b(0x57c)](),!![];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x25a)]=function(){const _0x42697e=_0x420e63;if(Imported[_0x42697e(0x2db)]&&DataManager['getDamageStyle'](this[_0x42697e(0x52e)])!==_0x42697e(0x460)){if(_0x42697e(0x396)===_0x42697e(0x396))return this[_0x42697e(0x1d2)]();else for(const _0x12502d of _0x459cde[_0x42697e(0x3c5)]){if(_0x12502d)_0x12502d[_0x42697e(0x2c8)]();}}else return this[_0x42697e(0x486)]();},Window_ShopStatus['prototype'][_0x420e63(0x486)]=function(){const _0x6e0687=_0x420e63,_0x3f6761=VisuMZ[_0x6e0687(0x346)][_0x6e0687(0x515)][_0x6e0687(0x516)],_0x3b6484='DamageType%1'[_0x6e0687(0x24b)](this['_item']['damage'][_0x6e0687(0x1a8)]),_0x4f992a=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this['_item'][_0x6e0687(0x3b7)][_0x6e0687(0x1a8)]];return _0x3f6761[_0x3b6484][_0x6e0687(0x24b)](_0x4f992a);},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x14f)]=function(){const _0x27a31b=_0x420e63,_0x309e56=$gameActors['actor'](0x1);this[_0x27a31b(0x38e)]=JsonEx['makeDeepCopy'](_0x309e56),this[_0x27a31b(0x242)]=JsonEx[_0x27a31b(0x4e5)](_0x309e56);},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x320)]=function(){const _0x1f06e8=_0x420e63,_0x53fc71='DAMAGE\x20MULTIPLIER';if(this['_customItemInfo'][_0x53fc71])return this[_0x1f06e8(0x4d7)][_0x53fc71];if(Imported[_0x1f06e8(0x2db)]&&DataManager[_0x1f06e8(0x4a9)](this[_0x1f06e8(0x52e)])!==_0x1f06e8(0x460))return this[_0x1f06e8(0x528)]();else{if(_0x1f06e8(0x363)===_0x1f06e8(0x363))return this[_0x1f06e8(0xff)]();else{if(_0x3bc49e[_0x1f06e8(0x118)](_0x5694fa))return![];}}},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0xff)]=function(){const _0x309be1=_0x420e63;window['a']=this['_tempActorA'],window['b']=this[_0x309be1(0x242)],this['_tempActorA'][_0x309be1(0x158)](!![]),this[_0x309be1(0x242)]['setShopStatusWindowMode']([0x3,0x4]['includes'](this[_0x309be1(0x52e)]['damage']['type']));let _0x27ce14=this[_0x309be1(0x52e)]['damage'][_0x309be1(0x21d)];try{const _0x2c2d25=Math[_0x309be1(0x223)](eval(_0x27ce14),0x0)/window['a']['atk'];return this[_0x309be1(0x199)](),isNaN(_0x2c2d25)?_0x309be1(0x480):_0x309be1(0x335)!==_0x309be1(0x335)?_0x51b65d['ItemsEquipsCore'][_0x309be1(0x515)][_0x309be1(0x516)][_0x309be1(0x408)]:_0x309be1(0x4f7)[_0x309be1(0x24b)](Math[_0x309be1(0x427)](_0x2c2d25*0x64));}catch(_0x3d8eed){return $gameTemp['isPlaytest']()&&(console['log'](_0x309be1(0x47d)['format'](this['_item'][_0x309be1(0x550)])),console[_0x309be1(0x3e7)](_0x3d8eed)),this[_0x309be1(0x199)](),_0x309be1(0x480);}},Window_ShopStatus['prototype'][_0x420e63(0x199)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x195)]=function(_0x1d2d6d,_0x3f06c7,_0x4fb327){const _0x85c88c=_0x420e63;if(!this['makeItemData']())return _0x3f06c7;if(this[_0x85c88c(0x314)](_0x1d2d6d,_0x3f06c7,_0x4fb327))_0x3f06c7+=this[_0x85c88c(0xf3)]();if(this[_0x85c88c(0x117)](_0x1d2d6d,_0x3f06c7,_0x4fb327))_0x3f06c7+=this[_0x85c88c(0xf3)]();if(this[_0x85c88c(0x2d1)](_0x1d2d6d,_0x3f06c7,_0x4fb327))_0x3f06c7+=this[_0x85c88c(0xf3)]();if(this[_0x85c88c(0x170)](_0x1d2d6d,_0x3f06c7,_0x4fb327))_0x3f06c7+=this['lineHeight']();if(this[_0x85c88c(0x28a)](_0x1d2d6d,_0x3f06c7,_0x4fb327))_0x3f06c7+=this[_0x85c88c(0xf3)]();if(this[_0x85c88c(0x1bc)](_0x1d2d6d,_0x3f06c7,_0x4fb327))_0x3f06c7+=this['lineHeight']();if(this[_0x85c88c(0x246)](_0x1d2d6d,_0x3f06c7,_0x4fb327))_0x3f06c7+=this[_0x85c88c(0xf3)]();if(this[_0x85c88c(0x40c)](_0x1d2d6d,_0x3f06c7,_0x4fb327))_0x3f06c7+=this[_0x85c88c(0xf3)]();if(this[_0x85c88c(0xe6)](_0x1d2d6d,_0x3f06c7,_0x4fb327))_0x3f06c7+=this['lineHeight']();return this[_0x85c88c(0x57c)](),_0x3f06c7;},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x2a5)]=function(){const _0x117e43=_0x420e63;return this[_0x117e43(0x52e)][_0x117e43(0xf9)];},Window_ShopStatus[_0x420e63(0x125)]['makeItemData']=function(){const _0x4c85dd=_0x420e63;let _0x4f89b7=![];this[_0x4c85dd(0x105)]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0x14eb1b=this[_0x4c85dd(0x2a5)]();for(const _0x26bf79 of _0x14eb1b){if(_0x4c85dd(0x286)===_0x4c85dd(0x3b4)){const _0x105ff8=_0x2564f5['ItemsEquipsCore'][_0x4c85dd(0x515)][_0x4c85dd(0x516)]['LabelDamageMP'];return _0x105ff8['format'](_0x52d2bd['mp']);}else switch(_0x26bf79[_0x4c85dd(0x1e5)]){case Game_Action['EFFECT_RECOVER_HP']:this['_itemData'][_0x4c85dd(0x252)]+=_0x26bf79[_0x4c85dd(0x4d4)],this[_0x4c85dd(0x105)][_0x4c85dd(0x160)]+=_0x26bf79[_0x4c85dd(0x466)],_0x4f89b7=!![];break;case Game_Action['EFFECT_RECOVER_MP']:this['_itemData'][_0x4c85dd(0xcc)]+=_0x26bf79[_0x4c85dd(0x4d4)],this[_0x4c85dd(0x105)]['flatMP']+=_0x26bf79[_0x4c85dd(0x466)],_0x4f89b7=!![];break;case Game_Action[_0x4c85dd(0x561)]:this[_0x4c85dd(0x105)][_0x4c85dd(0x2a3)]+=_0x26bf79['value1'],_0x4f89b7=!![];break;case Game_Action[_0x4c85dd(0x4ad)]:this[_0x4c85dd(0x105)]['addState'][_0x4c85dd(0x3a5)](_0x26bf79[_0x4c85dd(0x13e)]),_0x4f89b7=!![];break;case Game_Action[_0x4c85dd(0x284)]:this['_itemData'][_0x4c85dd(0x1ed)][_0x4c85dd(0x3a5)](_0x26bf79[_0x4c85dd(0x13e)]),this[_0x4c85dd(0x105)][_0x4c85dd(0x356)]=!![],_0x4f89b7=!![];break;case Game_Action[_0x4c85dd(0x3f5)]:this['_itemData'][_0x4c85dd(0x4bb)][_0x26bf79[_0x4c85dd(0x13e)]]+=0x1,_0x4f89b7=!![];break;case Game_Action[_0x4c85dd(0x103)]:this[_0x4c85dd(0x105)][_0x4c85dd(0x4bb)][_0x26bf79[_0x4c85dd(0x13e)]]-=0x1,_0x4f89b7=!![];break;case Game_Action['EFFECT_REMOVE_BUFF']:this[_0x4c85dd(0x105)]['removeBuff'][_0x4c85dd(0x3a5)](_0x26bf79['dataId']),this['_itemData'][_0x4c85dd(0x356)]=!![],_0x4f89b7=!![];break;case Game_Action[_0x4c85dd(0x13f)]:this['_itemData'][_0x4c85dd(0x44b)][_0x4c85dd(0x3a5)](_0x26bf79[_0x4c85dd(0x13e)]),this[_0x4c85dd(0x105)]['removeStateBuffChanges']=!![],_0x4f89b7=!![];break;}}if(this[_0x4c85dd(0x105)][_0x4c85dd(0x1aa)]['length']>0x0)this[_0x4c85dd(0x105)][_0x4c85dd(0x156)]=!![];for(let _0x4812b8=0x0;_0x4812b8<this[_0x4c85dd(0x105)][_0x4c85dd(0x4bb)][_0x4c85dd(0x20e)];_0x4812b8++){if(this[_0x4c85dd(0x105)]['changeBuff'][_0x4812b8]!==0x0)this[_0x4c85dd(0x105)][_0x4c85dd(0x156)]=!![];}this['_item'][_0x4c85dd(0x204)]!==0x0&&(this['_itemData'][_0x4c85dd(0x453)]=this[_0x4c85dd(0x52e)][_0x4c85dd(0x204)],_0x4f89b7=!![]);const _0x5444f9=[_0x4c85dd(0x1f0),'MP\x20RECOVERY','TP\x20RECOVERY','HP\x20DAMAGE',_0x4c85dd(0x230),_0x4c85dd(0xde),'USER\x20TP\x20GAIN',_0x4c85dd(0x4fe),'REMOVED\x20EFFECTS'];for(const _0x217be2 of _0x5444f9){if(this[_0x4c85dd(0x4d7)][_0x217be2]){_0x4f89b7=!![];break;}}return _0x4f89b7;},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x314)]=function(_0x2ce5a1,_0x5db5fd,_0x9c3884){const _0x2263ca=_0x420e63,_0x535226=_0x2263ca(0x1f0);if(this[_0x2263ca(0x105)][_0x2263ca(0x252)]<=0x0&&this[_0x2263ca(0x105)]['flatHP']<=0x0&&!this['_customItemInfo'][_0x535226])return![];const _0x3ebb1f=this[_0x2263ca(0x197)]();this[_0x2263ca(0xe4)](_0x3ebb1f,_0x2ce5a1,_0x5db5fd,_0x9c3884,!![]);const _0x544a81=this[_0x2263ca(0x294)]();return this[_0x2263ca(0x36a)](ColorManager[_0x2263ca(0x126)](0x1)),this[_0x2263ca(0xe4)](_0x544a81,_0x2ce5a1,_0x5db5fd,_0x9c3884,![],_0x2263ca(0x4eb)),this[_0x2263ca(0x4c9)](_0x2ce5a1,_0x5db5fd,_0x9c3884),this[_0x2263ca(0x57c)](),!![];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x197)]=function(){const _0x5ad798=_0x420e63,_0x188fc7=VisuMZ['ItemsEquipsCore'][_0x5ad798(0x515)][_0x5ad798(0x516)][_0x5ad798(0x4ce)];return _0x188fc7[_0x5ad798(0x24b)](TextManager['hp']);},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x294)]=function(){const _0x1a68ae=_0x420e63,_0xd009e8='HP\x20RECOVERY';if(this[_0x1a68ae(0x4d7)][_0xd009e8])return this[_0x1a68ae(0x4d7)][_0xd009e8];let _0x4bb824='';if(this['_itemData'][_0x1a68ae(0x252)]>0x0)_0x4bb824+='+%1%'[_0x1a68ae(0x24b)](Math[_0x1a68ae(0x192)](this[_0x1a68ae(0x105)]['rateHP']*0x64));if(this[_0x1a68ae(0x105)]['rateHP']>0x0&&this['_itemData'][_0x1a68ae(0x160)]>0x0)_0x4bb824+='\x20';if(this[_0x1a68ae(0x105)][_0x1a68ae(0x160)]>0x0)_0x4bb824+=_0x1a68ae(0x434)[_0x1a68ae(0x24b)](this[_0x1a68ae(0x105)][_0x1a68ae(0x160)]);return _0x4bb824;},Window_ShopStatus['prototype']['drawItemEffectsMpRecovery']=function(_0x450c55,_0x5335fb,_0x8ee634){const _0x2b87e6=_0x420e63,_0x43ebb9='MP\x20RECOVERY';if(this['_itemData'][_0x2b87e6(0xcc)]<=0x0&&this['_itemData'][_0x2b87e6(0x525)]<=0x0&&!this[_0x2b87e6(0x4d7)][_0x43ebb9])return![];const _0x4913ff=this[_0x2b87e6(0x2b2)]();this[_0x2b87e6(0xe4)](_0x4913ff,_0x450c55,_0x5335fb,_0x8ee634,!![]);const _0x51b028=this[_0x2b87e6(0x494)]();return this[_0x2b87e6(0x36a)](ColorManager['damageColor'](0x3)),this[_0x2b87e6(0xe4)](_0x51b028,_0x450c55,_0x5335fb,_0x8ee634,![],_0x2b87e6(0x4eb)),this[_0x2b87e6(0x4c9)](_0x450c55,_0x5335fb,_0x8ee634),this[_0x2b87e6(0x57c)](),!![];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x2b2)]=function(){const _0x451616=_0x420e63,_0x1f466d=VisuMZ[_0x451616(0x346)][_0x451616(0x515)][_0x451616(0x516)][_0x451616(0x48e)];return _0x1f466d[_0x451616(0x24b)](TextManager['mp']);},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x494)]=function(){const _0x3b5270=_0x420e63,_0x137cb3='MP\x20RECOVERY';if(this['_customItemInfo'][_0x137cb3])return this['_customItemInfo'][_0x137cb3];let _0x24d4e8='';if(this[_0x3b5270(0x105)][_0x3b5270(0xcc)]>0x0)_0x24d4e8+=_0x3b5270(0x31c)['format'](Math[_0x3b5270(0x192)](this[_0x3b5270(0x105)][_0x3b5270(0xcc)]*0x64));if(this[_0x3b5270(0x105)][_0x3b5270(0xcc)]>0x0&&this['_itemData'][_0x3b5270(0x525)]>0x0)_0x24d4e8+='\x20';if(this[_0x3b5270(0x105)][_0x3b5270(0x525)]>0x0)_0x24d4e8+=_0x3b5270(0x434)[_0x3b5270(0x24b)](this['_itemData'][_0x3b5270(0x525)]);return _0x24d4e8;},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x2d1)]=function(_0x57ce7b,_0x4cd6bc,_0x2585f2){const _0x3be5a6=_0x420e63,_0x2679e2='TP\x20RECOVERY';if(this[_0x3be5a6(0x105)]['gainTP']<=0x0&&!this[_0x3be5a6(0x4d7)][_0x2679e2])return![];const _0x1a3a7c=this[_0x3be5a6(0x2e2)]();this[_0x3be5a6(0xe4)](_0x1a3a7c,_0x57ce7b,_0x4cd6bc,_0x2585f2,!![]);const _0x43a167=this[_0x3be5a6(0x210)]();return this[_0x3be5a6(0x36a)](ColorManager[_0x3be5a6(0x2ba)]()),this[_0x3be5a6(0xe4)](_0x43a167,_0x57ce7b,_0x4cd6bc,_0x2585f2,![],_0x3be5a6(0x4eb)),this[_0x3be5a6(0x4c9)](_0x57ce7b,_0x4cd6bc,_0x2585f2),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x420e63(0x125)]['getItemEffectsTpRecoveryLabel']=function(){const _0xdd263b=_0x420e63,_0x23df8d=VisuMZ['ItemsEquipsCore'][_0xdd263b(0x515)][_0xdd263b(0x516)][_0xdd263b(0x1e1)];return _0x23df8d[_0xdd263b(0x24b)](TextManager['tp']);},Window_ShopStatus['prototype'][_0x420e63(0x210)]=function(){const _0xc8b5e2=_0x420e63,_0x12e0ee=_0xc8b5e2(0x26b);if(this[_0xc8b5e2(0x4d7)][_0x12e0ee])return this['_customItemInfo'][_0x12e0ee];let _0x1f30f6='';return _0x1f30f6+=_0xc8b5e2(0x434)[_0xc8b5e2(0x24b)](this[_0xc8b5e2(0x105)][_0xc8b5e2(0x2a3)]),_0x1f30f6;},Window_ShopStatus[_0x420e63(0x125)]['drawItemEffectsSelfTpGain']=function(_0x24a6c3,_0x1cd7de,_0x59ab78){const _0x431527=_0x420e63,_0x31df4f='USER\x20TP\x20GAIN';if(this[_0x431527(0x105)]['selfTP']===0x0&&!this[_0x431527(0x4d7)][_0x31df4f])return![];const _0x21f2b2=this[_0x431527(0x2cc)]();this[_0x431527(0xe4)](_0x21f2b2,_0x24a6c3,_0x1cd7de,_0x59ab78,!![]);const _0x55a900=this[_0x431527(0x327)]();if(this['_itemData'][_0x431527(0x453)]>0x0){if('DBJpx'!==_0x431527(0x1c7))this['changeTextColor'](ColorManager[_0x431527(0x2ba)]());else return _0x2e0dd3[_0x431527(0x346)][_0x431527(0x515)]['StatusWindow'][_0x431527(0x44d)];}else this['changeTextColor'](ColorManager['powerDownColor']());return this[_0x431527(0xe4)](_0x55a900,_0x24a6c3,_0x1cd7de,_0x59ab78,![],_0x431527(0x4eb)),this[_0x431527(0x4c9)](_0x24a6c3,_0x1cd7de,_0x59ab78),this[_0x431527(0x57c)](),!![];},Window_ShopStatus['prototype']['getItemEffectsSelfTpGainLabel']=function(){const _0x488132=_0x420e63,_0xc791c3=VisuMZ[_0x488132(0x346)][_0x488132(0x515)][_0x488132(0x516)][_0x488132(0x361)];return _0xc791c3[_0x488132(0x24b)](TextManager['tp']);},Window_ShopStatus[_0x420e63(0x125)]['getItemEffectsSelfTpGainText']=function(){const _0x17b9ad=_0x420e63,_0x4d1f1f='USER\x20TP\x20GAIN';if(this[_0x17b9ad(0x4d7)][_0x4d1f1f])return this[_0x17b9ad(0x4d7)][_0x4d1f1f];let _0x4c520e='';if(this['_itemData'][_0x17b9ad(0x453)]>0x0){if('NFPVO'!==_0x17b9ad(0x430))_0x4c520e+='+%1'[_0x17b9ad(0x24b)](this[_0x17b9ad(0x105)]['selfTP']);else return _0x17b9ad(0x53a)[_0x17b9ad(0x24b)](_0x3a3ced(_0x548f23['$1']));}else _0x4c520e+='%1'[_0x17b9ad(0x24b)](this[_0x17b9ad(0x105)][_0x17b9ad(0x453)]);return _0x4c520e;},Window_ShopStatus[_0x420e63(0x125)]['drawItemEffectsHpDamage']=function(_0x327d2e,_0x5d2e9e,_0x1c8458){const _0x35142e=_0x420e63,_0x2310b9=_0x35142e(0x31e);if(this[_0x35142e(0x105)][_0x35142e(0x252)]>=0x0&&this[_0x35142e(0x105)][_0x35142e(0x160)]>=0x0&&!this[_0x35142e(0x4d7)][_0x2310b9])return![];const _0x3b53bb=this[_0x35142e(0x4c1)]();this[_0x35142e(0xe4)](_0x3b53bb,_0x327d2e,_0x5d2e9e,_0x1c8458,!![]);const _0x5baf21=this[_0x35142e(0x45b)]();return this['changeTextColor'](ColorManager[_0x35142e(0x126)](0x0)),this[_0x35142e(0xe4)](_0x5baf21,_0x327d2e,_0x5d2e9e,_0x1c8458,![],_0x35142e(0x4eb)),this['drawItemDarkRect'](_0x327d2e,_0x5d2e9e,_0x1c8458),this[_0x35142e(0x57c)](),!![];},Window_ShopStatus[_0x420e63(0x125)]['getItemEffectsHpDamageLabel']=function(){const _0x31661d=_0x420e63,_0x10deb2=VisuMZ[_0x31661d(0x346)][_0x31661d(0x515)][_0x31661d(0x516)][_0x31661d(0x448)];return _0x10deb2['format'](TextManager['hp']);},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x45b)]=function(){const _0x18c266=_0x420e63,_0x2c8e6c='HP\x20DAMAGE';if(this['_customItemInfo'][_0x2c8e6c])return this[_0x18c266(0x4d7)][_0x2c8e6c];let _0x47e43e='';if(this[_0x18c266(0x105)][_0x18c266(0x252)]<0x0)_0x47e43e+=_0x18c266(0x4f7)['format'](Math['floor'](this[_0x18c266(0x105)][_0x18c266(0x252)]*0x64));if(this[_0x18c266(0x105)][_0x18c266(0x252)]<0x0&&this[_0x18c266(0x105)][_0x18c266(0x160)]<0x0)_0x47e43e+='\x20';if(this['_itemData'][_0x18c266(0x160)]<0x0)_0x47e43e+='%1'[_0x18c266(0x24b)](this['_itemData']['flatHP']);return _0x47e43e;},Window_ShopStatus['prototype'][_0x420e63(0x28a)]=function(_0x2045e5,_0x128302,_0x1741cf){const _0x14ede8=_0x420e63,_0x4910bd='MP\x20DAMAGE';if(this[_0x14ede8(0x105)][_0x14ede8(0xcc)]>=0x0&&this[_0x14ede8(0x105)][_0x14ede8(0x525)]>=0x0&&!this[_0x14ede8(0x4d7)][_0x4910bd])return![];const _0xb6680=this[_0x14ede8(0x3f4)]();this['drawItemKeyData'](_0xb6680,_0x2045e5,_0x128302,_0x1741cf,!![]);const _0x1c82c5=this[_0x14ede8(0x1ba)]();return this['changeTextColor'](ColorManager['damageColor'](0x2)),this[_0x14ede8(0xe4)](_0x1c82c5,_0x2045e5,_0x128302,_0x1741cf,![],'right'),this[_0x14ede8(0x4c9)](_0x2045e5,_0x128302,_0x1741cf),this[_0x14ede8(0x57c)](),!![];},Window_ShopStatus[_0x420e63(0x125)]['getItemEffectsMpDamageLabel']=function(){const _0x12eb04=_0x420e63,_0x4cd487=VisuMZ[_0x12eb04(0x346)][_0x12eb04(0x515)][_0x12eb04(0x516)][_0x12eb04(0x34c)];return _0x4cd487['format'](TextManager['mp']);},Window_ShopStatus[_0x420e63(0x125)]['getItemEffectsMpDamageText']=function(){const _0x4179d9=_0x420e63,_0x2d16c4=_0x4179d9(0x230);if(this[_0x4179d9(0x4d7)][_0x2d16c4])return this[_0x4179d9(0x4d7)][_0x2d16c4];let _0xcd04a2='';if(this[_0x4179d9(0x105)][_0x4179d9(0xcc)]<0x0)_0xcd04a2+=_0x4179d9(0x4f7)[_0x4179d9(0x24b)](Math[_0x4179d9(0x192)](this['_itemData'][_0x4179d9(0xcc)]*0x64));if(this[_0x4179d9(0x105)][_0x4179d9(0xcc)]<0x0&&this[_0x4179d9(0x105)][_0x4179d9(0x525)]<0x0)_0xcd04a2+='\x20';if(this[_0x4179d9(0x105)]['flatMP']<0x0)_0xcd04a2+='%1'['format'](this[_0x4179d9(0x105)]['flatMP']);return _0xcd04a2;},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x1bc)]=function(_0x2bf836,_0x489e98,_0xb8cd0b){const _0x176fda=_0x420e63,_0x5e8442=_0x176fda(0xde);if(this[_0x176fda(0x105)]['gainTP']>=0x0&&!this['_customItemInfo'][_0x5e8442])return![];const _0x3812ff=this['getItemEffectsTpDamageLabel']();this[_0x176fda(0xe4)](_0x3812ff,_0x2bf836,_0x489e98,_0xb8cd0b,!![]);const _0x3325dd=this['getItemEffectsTpDamageText']();return this['changeTextColor'](ColorManager[_0x176fda(0x13b)]()),this['drawItemKeyData'](_0x3325dd,_0x2bf836,_0x489e98,_0xb8cd0b,![],_0x176fda(0x4eb)),this['drawItemDarkRect'](_0x2bf836,_0x489e98,_0xb8cd0b),this[_0x176fda(0x57c)](),!![];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x42a)]=function(){const _0x2c67b3=_0x420e63,_0x5c4c5a=VisuMZ[_0x2c67b3(0x346)][_0x2c67b3(0x515)][_0x2c67b3(0x516)][_0x2c67b3(0x2cf)];return _0x5c4c5a[_0x2c67b3(0x24b)](TextManager['tp']);},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x39e)]=function(){const _0x450e0d=_0x420e63,_0x240f5a=_0x450e0d(0xde);if(this['_customItemInfo'][_0x240f5a])return this[_0x450e0d(0x4d7)][_0x240f5a];let _0x2761df='';return _0x2761df+='%1'[_0x450e0d(0x24b)](this[_0x450e0d(0x105)]['gainTP']),_0x2761df;},Window_ShopStatus[_0x420e63(0x125)]['drawItemEffectsAddedStatesBuffs']=function(_0x299c1b,_0x3e1570,_0x43a9b9){const _0x555341=_0x420e63,_0x5e126f=_0x555341(0x4fe);if(!this['_itemData'][_0x555341(0x156)]&&!this['_customItemInfo'][_0x5e126f])return![];const _0x56f887=this[_0x555341(0x40e)]();this['drawItemKeyData'](_0x56f887,_0x299c1b,_0x3e1570,_0x43a9b9,!![]);const _0x49b078=this[_0x555341(0x41f)]();return this[_0x555341(0xe4)](_0x49b078,_0x299c1b,_0x3e1570,_0x43a9b9,![],_0x555341(0x4eb)),this[_0x555341(0x4c9)](_0x299c1b,_0x3e1570,_0x43a9b9),this[_0x555341(0x57c)](),!![];},Window_ShopStatus[_0x420e63(0x125)]['getItemEffectsAddedStatesBuffsLabel']=function(){const _0xc28be8=_0x420e63;return VisuMZ[_0xc28be8(0x346)][_0xc28be8(0x515)]['StatusWindow'][_0xc28be8(0x556)];},Window_ShopStatus['prototype'][_0x420e63(0x41f)]=function(){const _0x16acd6=_0x420e63,_0x194450='ADDED\x20EFFECTS';if(this[_0x16acd6(0x4d7)][_0x194450])return this[_0x16acd6(0x4d7)][_0x194450];let _0xcbe810='',_0x557a9f=0x0;const _0x1ff141=0x8;for(const _0x48415b of this[_0x16acd6(0x105)][_0x16acd6(0x1aa)]){const _0x1461fe=$dataStates[_0x48415b];if(_0x1461fe&&_0x1461fe[_0x16acd6(0x23e)]>0x0){if(_0x16acd6(0x30b)!=='bLcES')_0x184577['ItemsEquipsCore'][_0x16acd6(0x181)](_0x45e828),_0x53b359[_0x16acd6(0x346)][_0x16acd6(0x181)](_0x5b1d63),_0x56f67d['ItemsEquipsCore'][_0x16acd6(0x181)](_0x11fd94);else{_0xcbe810+='\x5cI[%1]'['format'](_0x1461fe[_0x16acd6(0x23e)]),_0x557a9f++;if(_0x557a9f>=_0x1ff141)return _0xcbe810;}}}for(let _0x540a9c=0x0;_0x540a9c<this['_itemData'][_0x16acd6(0x4bb)][_0x16acd6(0x20e)];_0x540a9c++){if(_0x16acd6(0x39c)===_0x16acd6(0x1f5)){const _0x550c92=_0x43463e['makeDeepCopy'](this);_0x550c92['_tempActor']=!![],this[_0x16acd6(0x122)][_0x1d8768][_0x16acd6(0x1db)](null),this[_0x16acd6(0x288)]=!![],this[_0x16acd6(0x1ce)](_0x550c92),this['_bypassReleaseUnequippableItemsItemsEquipsCore']=_0xe60995;}else{const _0x4c70bf=this['_itemData'][_0x16acd6(0x4bb)][_0x540a9c],_0x4e8e21=Game_BattlerBase['prototype'][_0x16acd6(0x3f6)](_0x4c70bf,_0x540a9c);if(_0x4e8e21>0x0){_0xcbe810+='\x5cI[%1]'[_0x16acd6(0x24b)](_0x4e8e21),_0x557a9f++;if(_0x557a9f>=_0x1ff141)return _0xcbe810;}}}return _0xcbe810;},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0xe6)]=function(_0x5cfafb,_0x542f22,_0x1e1e38){const _0x4dfb09=_0x420e63,_0x516d59=_0x4dfb09(0x1bf);if(!this[_0x4dfb09(0x105)][_0x4dfb09(0x356)]&&!this[_0x4dfb09(0x4d7)][_0x516d59])return![];const _0x2c6fe5=this['getItemEffectsRemovedStatesBuffsLabel']();this[_0x4dfb09(0xe4)](_0x2c6fe5,_0x5cfafb,_0x542f22,_0x1e1e38,!![]);const _0x2a9da8=this[_0x4dfb09(0x2b4)]();return this[_0x4dfb09(0xe4)](_0x2a9da8,_0x5cfafb,_0x542f22,_0x1e1e38,![],_0x4dfb09(0x4eb)),this[_0x4dfb09(0x4c9)](_0x5cfafb,_0x542f22,_0x1e1e38),this[_0x4dfb09(0x57c)](),!![];},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x16f)]=function(){const _0x1fd9ad=_0x420e63;return VisuMZ[_0x1fd9ad(0x346)]['Settings'][_0x1fd9ad(0x516)][_0x1fd9ad(0x19e)];},Window_ShopStatus['prototype'][_0x420e63(0x2b4)]=function(){const _0x16954d=_0x420e63,_0x35d543=_0x16954d(0x1bf);if(this[_0x16954d(0x4d7)][_0x35d543])return this[_0x16954d(0x4d7)][_0x35d543];let _0x1a5d54='',_0x1afd57=0x0;const _0x62c217=VisuMZ[_0x16954d(0x346)][_0x16954d(0x515)][_0x16954d(0x516)][_0x16954d(0x524)];for(const _0xd0551a of this['_itemData'][_0x16954d(0x1ed)]){const _0x2a7da4=$dataStates[_0xd0551a];if(_0x2a7da4&&_0x2a7da4[_0x16954d(0x23e)]>0x0){_0x1a5d54+=_0x16954d(0x566)['format'](_0x2a7da4[_0x16954d(0x23e)]),_0x1afd57++;if(_0x1afd57>=_0x62c217)return _0x1a5d54;}}for(let _0x5a65fa=0x0;_0x5a65fa<this[_0x16954d(0x105)][_0x16954d(0x537)][_0x16954d(0x20e)];_0x5a65fa++){if(_0x16954d(0x470)===_0x16954d(0x470)){const _0x46959a=Game_BattlerBase[_0x16954d(0x125)][_0x16954d(0x3f6)](0x1,_0x5a65fa);if(_0x46959a>0x0){if(_0x16954d(0x336)!==_0x16954d(0x440)){_0x1a5d54+='\x5cI[%1]'[_0x16954d(0x24b)](_0x46959a),_0x1afd57++;if(_0x1afd57>=_0x62c217)return _0x1a5d54;}else{const _0x2bca71=_0x3dfe0e['ItemsEquipsCore'][_0x16954d(0x515)][_0x16954d(0x516)]['LabelSelfGainTP'];return _0x2bca71['format'](_0x51e83d['tp']);}}}else{const _0x8c385=_0x394277[_0x16954d(0x3fd)]('['+_0x433740['$1'][_0x16954d(0x3d9)](/\d+/g)+']');for(const _0x3bcf2d of _0x8c385){if(!_0xcea79f[_0x16954d(0x118)](_0x3bcf2d))return![];}return!![];}}for(let _0x3263a9=0x0;_0x3263a9<this[_0x16954d(0x105)]['removeDebuff'][_0x16954d(0x20e)];_0x3263a9++){if('EmzJF'!==_0x16954d(0x1e0)){const _0x2cdf6e=Game_BattlerBase[_0x16954d(0x125)][_0x16954d(0x3f6)](-0x1,_0x3263a9);if(_0x2cdf6e>0x0){_0x1a5d54+=_0x16954d(0x566)[_0x16954d(0x24b)](_0x2cdf6e),_0x1afd57++;if(_0x1afd57>=_0x62c217)return _0x1a5d54;}}else{const _0x35bbe5=_0x73b72c(_0x459edd['$1'])[_0x16954d(0x2b5)](/[\r\n]+/);for(const _0x28be91 of _0x35bbe5){if(_0x28be91[_0x16954d(0x3d9)](/(.*):[ ](.*)/i)){const _0x4dddb6=_0x43d497(_0x4b4448['$1'])[_0x16954d(0x113)](),_0x16e821=_0x6cd5cc(_0x70855c['$2'])[_0x16954d(0x113)]();this[_0x16954d(0x2b3)](_0x4dddb6,_0x16e821,_0x598acf,_0x4002e8,_0x29d79a),_0x5e0b18+=this[_0x16954d(0xf3)]();}}}}return _0x1a5d54;},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x260)]=function(_0x2f935d,_0x82a49b,_0x27810f){const _0x25e490=_0x420e63;if(this[_0x25e490(0x52e)]['note'][_0x25e490(0x3d9)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){if(_0x25e490(0x21c)===_0x25e490(0x109))return![];else{const _0x3103e4=String(RegExp['$1'])[_0x25e490(0x2b5)](/[\r\n]+/);for(const _0x4236a2 of _0x3103e4){if(_0x4236a2[_0x25e490(0x3d9)](/(.*):[ ](.*)/i)){const _0x346bf6=String(RegExp['$1'])[_0x25e490(0x113)](),_0x1632dd=String(RegExp['$2'])['trim']();this[_0x25e490(0x2b3)](_0x346bf6,_0x1632dd,_0x2f935d,_0x82a49b,_0x27810f),_0x82a49b+=this['lineHeight']();}}}}return this[_0x25e490(0x57c)](),_0x82a49b;},Window_ShopStatus['prototype'][_0x420e63(0x2b3)]=function(_0x2bf5a1,_0x450477,_0x5f503f,_0x549e25,_0x392389){const _0x441bb1=_0x420e63;this[_0x441bb1(0xe4)](_0x2bf5a1,_0x5f503f,_0x549e25,_0x392389,!![]),this[_0x441bb1(0xe4)](_0x450477,_0x5f503f,_0x549e25,_0x392389,![],_0x441bb1(0x4eb)),this[_0x441bb1(0x4c9)](_0x5f503f,_0x549e25,_0x392389),this['resetFontSettings']();},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x215)]=function(){const _0x4b6e64=_0x420e63;if(!this['_item'])return;const _0x51b023=this[_0x4b6e64(0x52e)][_0x4b6e64(0x32d)],_0x3180b2=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x4c3589=_0x51b023[_0x4b6e64(0x3d9)](_0x3180b2);if(_0x4c3589)for(const _0xea403e of _0x4c3589){if(_0x4b6e64(0x247)!=='enRdB')return!this[_0x4b6e64(0x3ce)]();else{_0xea403e[_0x4b6e64(0x3d9)](_0x3180b2);const _0x4a4768=String(RegExp['$1'])[_0x4b6e64(0x113)]()||'';if(_0x4a4768==='')continue;const _0x2bd9aa=ImageManager[_0x4b6e64(0x3ed)](_0x4a4768);_0x2bd9aa['addLoadListener'](this['drawCustomShopGraphicLoad'][_0x4b6e64(0x315)](this,_0x2bd9aa,this[_0x4b6e64(0x52e)]));}}},Window_ShopStatus[_0x420e63(0x125)][_0x420e63(0x269)]=function(_0x53cd1f,_0x3383ac){const _0x4f16fa=_0x420e63;if(this['_item']!==_0x3383ac)return;if(!_0x53cd1f)return;if(_0x53cd1f[_0x4f16fa(0x4b7)]<=0x0||_0x53cd1f['height']<=0x0)return;const _0x2ad8e5=_0x3383ac[_0x4f16fa(0x32d)];let _0x2c0bfe=_0x4f16fa(0x3cb);_0x2ad8e5[_0x4f16fa(0x3d9)](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)&&(_0x2c0bfe=_0x4f16fa(0xcd));const _0x892756=_0x2c0bfe===_0x4f16fa(0x3cb)?this[_0x4f16fa(0x3fa)]:this[_0x4f16fa(0x35d)];let _0x4379da=this['innerWidth'],_0x1583ee=this[_0x4f16fa(0x214)];_0x2ad8e5[_0x4f16fa(0x3d9)](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)&&(_0x4379da=Number(RegExp['$1']));_0x2ad8e5['match'](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&(_0x1583ee=Number(RegExp['$1']));_0x2ad8e5[_0x4f16fa(0x3d9)](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0x4379da=Number(RegExp['$1']),_0x1583ee=Number(RegExp['$2']));const _0x10c1cf=Math['min'](0x1,_0x4379da/_0x53cd1f['width'],_0x1583ee/_0x53cd1f['height']);let _0x4f5d50=0x0,_0x280fce=0x0,_0x404b32=Math['floor'](_0x53cd1f[_0x4f16fa(0x4b7)]*_0x10c1cf),_0x599f66=Math[_0x4f16fa(0x192)](_0x53cd1f[_0x4f16fa(0x3a1)]*_0x10c1cf),_0x32e911=_0x4f16fa(0x263);_0x2ad8e5[_0x4f16fa(0x3d9)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)&&(_0x32e911=String(RegExp['$1'])[_0x4f16fa(0x49e)]()[_0x4f16fa(0x113)]());if(_0x32e911===_0x4f16fa(0x501)){if(_0x4f16fa(0x443)!==_0x4f16fa(0x477))_0x4f5d50=0x0;else{const _0x5af3a8=_0x52fbce[_0x4f16fa(0x32d)];if(_0x5af3a8[_0x4f16fa(0x3d9)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x5cbe3b=_0x3fb714(_0x23d7af['$1']);try{_0x310053(_0x5cbe3b);}catch(_0x552a67){if(_0x385382[_0x4f16fa(0x42e)]())_0x1d7f40[_0x4f16fa(0x3e7)](_0x552a67);}}_0x4cb993=_0x1b9443[_0x4f16fa(0x346)]['Settings'][_0x4f16fa(0x3d3)][_0x4f16fa(0x4a3)]['call'](this,_0x3ae173,_0x8d47b4);if(_0x559473(_0x5bc3d7))_0x164b9f=0x0;return _0x34d452[_0x4f16fa(0x192)](_0x33a516);}}else _0x32e911===_0x4f16fa(0x263)?_0x4f5d50=Math[_0x4f16fa(0x427)]((this['innerWidth']-_0x404b32)/0x2):_0x4f5d50=this[_0x4f16fa(0x1a3)]-_0x404b32;let _0x3d731d=_0x4f16fa(0xd9);if(_0x2ad8e5[_0x4f16fa(0x3d9)](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)){if(_0x4f16fa(0xf1)!==_0x4f16fa(0x1c3))_0x3d731d=String(RegExp['$1'])[_0x4f16fa(0x49e)]()[_0x4f16fa(0x113)]();else{const _0xaeb74a=_0x46b4bf[_0x199702];_0xaeb74a&&_0xaeb74a[_0x4f16fa(0x29e)]===_0x3ca735+0x1&&_0x5711f5['push'](_0xaeb74a);}}if(_0x3d731d===_0x4f16fa(0x2a8))_0x280fce=0x0;else _0x3d731d===_0x4f16fa(0xd9)?_0x280fce=Math[_0x4f16fa(0x427)]((this[_0x4f16fa(0x214)]-_0x599f66)/0x2):_0x280fce=this[_0x4f16fa(0x214)]-_0x599f66;_0x2ad8e5[_0x4f16fa(0x3d9)](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x4f5d50+=Number(RegExp['$1']));_0x2ad8e5[_0x4f16fa(0x3d9)](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x280fce+=Number(RegExp['$1']));_0x2ad8e5['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)&&(_0x4f5d50+=Number(RegExp['$1']),_0x280fce+=Number(RegExp['$2']));let _0x2491ff=0xff;if(_0x2ad8e5['match'](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i))_0x2491ff=Number(RegExp['$1']);else _0x2ad8e5['match'](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)&&(_0x2491ff=Math[_0x4f16fa(0x427)](Number(RegExp['$1'])*0.01*0xff)[_0x4f16fa(0x4cf)](0x0,0xff));_0x892756[_0x4f16fa(0x304)]=_0x2491ff,_0x892756[_0x4f16fa(0x2b0)](_0x53cd1f,0x0,0x0,_0x53cd1f['width'],_0x53cd1f['height'],_0x4f5d50,_0x280fce,_0x404b32,_0x599f66),_0x892756[_0x4f16fa(0x304)]=0xff;};