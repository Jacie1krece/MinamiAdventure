//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.43;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.43] [ItemsEquipsCore]
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
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
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
 * Version 1.43: March 16, 2023
 * * Bug Fixes!
 * ** Artifact armors should now update and refresh the party members' cache
 *    upon acquisition. Fix made by Olivia.
 * 
 * Version 1.42: February 16, 2023
 * * Bug Fixes!
 * ** Proxy items should no longer cause infinite loops if they're made to
 *    reference other proxy items in a circular fashion. Instead, they just
 *    give the exact first found proxy instead of cycling through others.
 *    Fix made by Arisu.
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by Anon:
 * *** Equip Scene > Equip Command > Help Description
 * *** Equip Scene > Optimize Command > Help Description
 * *** Equip Scene > Clear Command > Help Description
 * **** Help description used when these commands are selected.
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
 * @command Separator_Begin
 * @text -
 * @desc -
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
 * @command Separator_Shop
 * @text -
 * @desc -
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
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param equipCmdDesc:json
 * @text Help Description
 * @parent CmdIconEquip:num
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Pick and choose equipment to change."
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
 * @param optimizeCmdDesc:json
 * @text Help Description
 * @parent CommandAddOptimize:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Equip the strongest available equipment."
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
 * @param clearCmdDesc:json
 * @text Help Description
 * @parent CommandAddClear:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Remove all available equipment."
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

const _0x23d1fb=_0xd29d;(function(_0xfc9937,_0x43a875){const _0xaeba26=_0xd29d,_0x52bd96=_0xfc9937();while(!![]){try{const _0x196c9b=-parseInt(_0xaeba26(0x49e))/0x1*(parseInt(_0xaeba26(0x40d))/0x2)+parseInt(_0xaeba26(0x1f8))/0x3+parseInt(_0xaeba26(0x2ad))/0x4+parseInt(_0xaeba26(0x32c))/0x5*(parseInt(_0xaeba26(0x1b7))/0x6)+-parseInt(_0xaeba26(0x2f7))/0x7+-parseInt(_0xaeba26(0x513))/0x8+parseInt(_0xaeba26(0x4ba))/0x9;if(_0x196c9b===_0x43a875)break;else _0x52bd96['push'](_0x52bd96['shift']());}catch(_0x11998a){_0x52bd96['push'](_0x52bd96['shift']());}}}(_0x198d,0x91e5a));var label=_0x23d1fb(0x248),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x23d1fb(0x324)](function(_0x4f6032){const _0x3a180f=_0x23d1fb;return _0x4f6032[_0x3a180f(0x1f0)]&&_0x4f6032['description'][_0x3a180f(0x39a)]('['+label+']');})[0x0];VisuMZ[label][_0x23d1fb(0x357)]=VisuMZ[label][_0x23d1fb(0x357)]||{},VisuMZ[_0x23d1fb(0x4b7)]=function(_0x748654,_0x5e890f){const _0x1681ab=_0x23d1fb;for(const _0xd4fc6f in _0x5e890f){if(_0xd4fc6f['match'](/(.*):(.*)/i)){const _0x3f965d=String(RegExp['$1']),_0x36a0e4=String(RegExp['$2'])[_0x1681ab(0x25d)]()[_0x1681ab(0x432)]();let _0x5098d1,_0x50ba72,_0x27683f;switch(_0x36a0e4){case'NUM':_0x5098d1=_0x5e890f[_0xd4fc6f]!==''?Number(_0x5e890f[_0xd4fc6f]):0x0;break;case'ARRAYNUM':_0x50ba72=_0x5e890f[_0xd4fc6f]!==''?JSON[_0x1681ab(0x257)](_0x5e890f[_0xd4fc6f]):[],_0x5098d1=_0x50ba72[_0x1681ab(0x344)](_0xa8e53=>Number(_0xa8e53));break;case _0x1681ab(0x3ed):_0x5098d1=_0x5e890f[_0xd4fc6f]!==''?eval(_0x5e890f[_0xd4fc6f]):null;break;case _0x1681ab(0x481):_0x50ba72=_0x5e890f[_0xd4fc6f]!==''?JSON[_0x1681ab(0x257)](_0x5e890f[_0xd4fc6f]):[],_0x5098d1=_0x50ba72[_0x1681ab(0x344)](_0x4a0631=>eval(_0x4a0631));break;case _0x1681ab(0x1c0):_0x5098d1=_0x5e890f[_0xd4fc6f]!==''?JSON[_0x1681ab(0x257)](_0x5e890f[_0xd4fc6f]):'';break;case _0x1681ab(0x4da):_0x50ba72=_0x5e890f[_0xd4fc6f]!==''?JSON[_0x1681ab(0x257)](_0x5e890f[_0xd4fc6f]):[],_0x5098d1=_0x50ba72[_0x1681ab(0x344)](_0x7341e0=>JSON[_0x1681ab(0x257)](_0x7341e0));break;case _0x1681ab(0x2b2):_0x5098d1=_0x5e890f[_0xd4fc6f]!==''?new Function(JSON[_0x1681ab(0x257)](_0x5e890f[_0xd4fc6f])):new Function(_0x1681ab(0x449));break;case _0x1681ab(0x467):_0x50ba72=_0x5e890f[_0xd4fc6f]!==''?JSON[_0x1681ab(0x257)](_0x5e890f[_0xd4fc6f]):[],_0x5098d1=_0x50ba72[_0x1681ab(0x344)](_0x2f205a=>new Function(JSON['parse'](_0x2f205a)));break;case _0x1681ab(0x252):_0x5098d1=_0x5e890f[_0xd4fc6f]!==''?String(_0x5e890f[_0xd4fc6f]):'';break;case _0x1681ab(0x3e0):_0x50ba72=_0x5e890f[_0xd4fc6f]!==''?JSON[_0x1681ab(0x257)](_0x5e890f[_0xd4fc6f]):[],_0x5098d1=_0x50ba72['map'](_0x4d1f03=>String(_0x4d1f03));break;case _0x1681ab(0x1d4):_0x27683f=_0x5e890f[_0xd4fc6f]!==''?JSON[_0x1681ab(0x257)](_0x5e890f[_0xd4fc6f]):{},_0x748654[_0x3f965d]={},VisuMZ[_0x1681ab(0x4b7)](_0x748654[_0x3f965d],_0x27683f);continue;case _0x1681ab(0x45e):_0x50ba72=_0x5e890f[_0xd4fc6f]!==''?JSON[_0x1681ab(0x257)](_0x5e890f[_0xd4fc6f]):[],_0x5098d1=_0x50ba72[_0x1681ab(0x344)](_0x2ed241=>VisuMZ[_0x1681ab(0x4b7)]({},JSON['parse'](_0x2ed241)));break;default:continue;}_0x748654[_0x3f965d]=_0x5098d1;}}return _0x748654;},(_0x4c6930=>{const _0x4c9512=_0x23d1fb,_0x4306e3=_0x4c6930['name'];for(const _0x5209b4 of dependencies){if(!Imported[_0x5209b4]){alert(_0x4c9512(0x2f4)[_0x4c9512(0x325)](_0x4306e3,_0x5209b4)),SceneManager[_0x4c9512(0x4b9)]();break;}}const _0x2bba90=_0x4c6930[_0x4c9512(0x1e2)];if(_0x2bba90[_0x4c9512(0x2fc)](/\[Version[ ](.*?)\]/i)){const _0x21a3f0=Number(RegExp['$1']);_0x21a3f0!==VisuMZ[label][_0x4c9512(0x2f8)]&&(alert(_0x4c9512(0x189)['format'](_0x4306e3,_0x21a3f0)),SceneManager[_0x4c9512(0x4b9)]());}if(_0x2bba90['match'](/\[Tier[ ](\d+)\]/i)){const _0x1f7a3c=Number(RegExp['$1']);_0x1f7a3c<tier?(alert(_0x4c9512(0x350)[_0x4c9512(0x325)](_0x4306e3,_0x1f7a3c,tier)),SceneManager[_0x4c9512(0x4b9)]()):tier=Math[_0x4c9512(0x2e0)](_0x1f7a3c,tier);}VisuMZ[_0x4c9512(0x4b7)](VisuMZ[label][_0x4c9512(0x357)],_0x4c6930[_0x4c9512(0x4a5)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x23d1fb(0x285)],_0x23d1fb(0x2fe),_0x5a8bfe=>{const _0x51bc6e=_0x23d1fb;VisuMZ[_0x51bc6e(0x4b7)](_0x5a8bfe,_0x5a8bfe);const _0x971c29=_0x5a8bfe[_0x51bc6e(0x49d)][_0x51bc6e(0x344)](_0x2fdf4c=>$gameActors[_0x51bc6e(0x383)](_0x2fdf4c)),_0x212517=_0x5a8bfe['Slots'][_0x51bc6e(0x344)](_0xb13aaa=>$dataSystem['equipTypes'][_0x51bc6e(0x41c)](_0xb13aaa[_0x51bc6e(0x432)]()));for(const _0x3239df of _0x971c29){if(!_0x3239df)continue;_0x3239df['forceChangeEquipSlots'](_0x212517);}}),PluginManager['registerCommand'](pluginData[_0x23d1fb(0x285)],_0x23d1fb(0x339),_0x5b2e02=>{const _0x4a51be=_0x23d1fb;VisuMZ[_0x4a51be(0x4b7)](_0x5b2e02,_0x5b2e02);const _0x44e288=_0x5b2e02[_0x4a51be(0x49d)][_0x4a51be(0x344)](_0x47500d=>$gameActors[_0x4a51be(0x383)](_0x47500d));for(const _0x41059d of _0x44e288){if(!_0x41059d)continue;_0x41059d[_0x4a51be(0x1ca)]();}}),PluginManager['registerCommand'](pluginData[_0x23d1fb(0x285)],_0x23d1fb(0x30a),_0x53518d=>{const _0x5ada5e=_0x23d1fb;VisuMZ[_0x5ada5e(0x4b7)](_0x53518d,_0x53518d);const _0x3828c2=[],_0x3747ba=_0x53518d[_0x5ada5e(0x1e8)][_0x5ada5e(0x344)](_0x51a17d=>_0x51a17d[_0x5ada5e(0x25d)]()['trim']()),_0x4d0483=_0x53518d['Whitelist']['map'](_0x3af894=>_0x3af894[_0x5ada5e(0x25d)]()[_0x5ada5e(0x432)]()),_0x4c12b1=_0x53518d[_0x5ada5e(0x345)]>=_0x53518d[_0x5ada5e(0x1c8)]?_0x53518d[_0x5ada5e(0x1c8)]:_0x53518d[_0x5ada5e(0x345)],_0x298cf0=_0x53518d['Step1End']>=_0x53518d[_0x5ada5e(0x1c8)]?_0x53518d['Step1End']:_0x53518d['Step1Start'],_0x2bcffd=Array(_0x298cf0-_0x4c12b1+0x1)['fill']()['map']((_0xeb8070,_0x2bb29f)=>_0x4c12b1+_0x2bb29f);for(const _0x338798 of _0x2bcffd){const _0x2dfa7c=$dataItems[_0x338798];if(!_0x2dfa7c)continue;if(!VisuMZ['ItemsEquipsCore'][_0x5ada5e(0x396)](_0x2dfa7c,_0x3747ba,_0x4d0483))continue;_0x3828c2[_0x5ada5e(0x1dd)]([0x0,_0x338798,0x0,_0x2dfa7c[_0x5ada5e(0x403)]]);}const _0x3f773=_0x53518d['Step2End']>=_0x53518d['Step2Start']?_0x53518d[_0x5ada5e(0x318)]:_0x53518d[_0x5ada5e(0x34b)],_0x6a692c=_0x53518d['Step2End']>=_0x53518d[_0x5ada5e(0x318)]?_0x53518d[_0x5ada5e(0x34b)]:_0x53518d[_0x5ada5e(0x318)],_0x414139=Array(_0x6a692c-_0x3f773+0x1)[_0x5ada5e(0x2c0)]()[_0x5ada5e(0x344)]((_0x3d6223,_0x141078)=>_0x3f773+_0x141078);for(const _0x18d40e of _0x414139){const _0x55c78b=$dataWeapons[_0x18d40e];if(!_0x55c78b)continue;if(!VisuMZ[_0x5ada5e(0x248)]['IncludeShopItem'](_0x55c78b,_0x3747ba,_0x4d0483))continue;_0x3828c2['push']([0x1,_0x18d40e,0x0,_0x55c78b[_0x5ada5e(0x403)]]);}const _0x592415=_0x53518d[_0x5ada5e(0x306)]>=_0x53518d[_0x5ada5e(0x3d4)]?_0x53518d[_0x5ada5e(0x3d4)]:_0x53518d['Step3End'],_0x37b8c2=_0x53518d['Step3End']>=_0x53518d[_0x5ada5e(0x3d4)]?_0x53518d[_0x5ada5e(0x306)]:_0x53518d[_0x5ada5e(0x3d4)],_0x283e27=Array(_0x37b8c2-_0x592415+0x1)[_0x5ada5e(0x2c0)]()['map']((_0x5648fd,_0x50af60)=>_0x592415+_0x50af60);for(const _0x2841f4 of _0x283e27){const _0x442bef=$dataArmors[_0x2841f4];if(!_0x442bef)continue;if(!VisuMZ['ItemsEquipsCore']['IncludeShopItem'](_0x442bef,_0x3747ba,_0x4d0483))continue;_0x3828c2['push']([0x2,_0x2841f4,0x0,_0x442bef['price']]);}SceneManager['push'](Scene_Shop),SceneManager[_0x5ada5e(0x3e6)](_0x3828c2,_0x53518d[_0x5ada5e(0x232)]);}),VisuMZ['ItemsEquipsCore']['IncludeShopItem']=function(_0x4a9b06,_0x6ebd9d,_0x522a4a){const _0x45fde4=_0x23d1fb;if(_0x4a9b06['name']['trim']()==='')return![];if(_0x4a9b06[_0x45fde4(0x285)]['match'](/-----/i))return![];const _0x1e866e=_0x4a9b06[_0x45fde4(0x2e8)];if(_0x6ebd9d[_0x45fde4(0x401)]>0x0)for(const _0x5577d0 of _0x6ebd9d){if(!_0x5577d0)continue;if(_0x1e866e[_0x45fde4(0x39a)](_0x5577d0))return![];}if(_0x522a4a[_0x45fde4(0x401)]>0x0){for(const _0x561a43 of _0x522a4a){if(!_0x561a43)continue;if(_0x1e866e['includes'](_0x561a43))return!![];}return![];}return!![];},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x472)]=Scene_Boot[_0x23d1fb(0x241)][_0x23d1fb(0x4ec)],Scene_Boot[_0x23d1fb(0x241)]['onDatabaseLoaded']=function(){const _0x3fecc1=_0x23d1fb;this[_0x3fecc1(0x280)](),VisuMZ[_0x3fecc1(0x248)][_0x3fecc1(0x472)]['call'](this),this[_0x3fecc1(0x2ac)](),VisuMZ[_0x3fecc1(0x248)]['SetupProxyItemGroups']();},Scene_Boot[_0x23d1fb(0x241)][_0x23d1fb(0x280)]=function(){const _0x31b039=_0x23d1fb;VisuMZ[_0x31b039(0x248)][_0x31b039(0x1fe)]={},VisuMZ[_0x31b039(0x248)][_0x31b039(0x1fe)][_0x31b039(0x18b)]=[],VisuMZ[_0x31b039(0x248)]['RegExp'][_0x31b039(0x24b)]=[];const _0x4b93f8=[_0x31b039(0x454),_0x31b039(0x397),'ATK',_0x31b039(0x465),_0x31b039(0x3f5),_0x31b039(0x35c),_0x31b039(0x3dd),_0x31b039(0x33d)];for(const _0x44347c of _0x4b93f8){const _0x51dde7=_0x31b039(0x18e)['format'](_0x44347c);VisuMZ[_0x31b039(0x248)][_0x31b039(0x1fe)][_0x31b039(0x18b)][_0x31b039(0x1dd)](new RegExp(_0x51dde7,'i'));const _0x40b733='\x5cb%1\x5cb'[_0x31b039(0x325)](_0x44347c);VisuMZ[_0x31b039(0x248)][_0x31b039(0x1fe)][_0x31b039(0x24b)][_0x31b039(0x1dd)](new RegExp(_0x40b733,'g'));}},Scene_Boot[_0x23d1fb(0x241)][_0x23d1fb(0x2ac)]=function(){const _0x5100d4=_0x23d1fb;if(VisuMZ[_0x5100d4(0x32a)])return;this['process_VisuMZ_ItemsEquipsCore_EquipSlots']();const _0x324079=[$dataItems,$dataWeapons,$dataArmors];for(const _0xce9d42 of _0x324079){for(const _0x59d69e of _0xce9d42){if(!_0x59d69e)continue;VisuMZ['ItemsEquipsCore'][_0x5100d4(0x1ea)](_0x59d69e,_0xce9d42),VisuMZ[_0x5100d4(0x248)]['Parse_Notetags_Prices'](_0x59d69e,_0xce9d42),VisuMZ[_0x5100d4(0x248)][_0x5100d4(0x1ad)](_0x59d69e,_0xce9d42),VisuMZ[_0x5100d4(0x248)][_0x5100d4(0x3e4)](_0x59d69e,_0xce9d42),VisuMZ[_0x5100d4(0x248)]['Parse_Notetags_EnableJS'](_0x59d69e,_0xce9d42);}}},Scene_Boot[_0x23d1fb(0x241)]['process_VisuMZ_ItemsEquipsCore_EquipSlots']=function(){const _0x70916d=_0x23d1fb;for(const _0xb8a458 of $dataClasses){if(!_0xb8a458)continue;VisuMZ['ItemsEquipsCore'][_0x70916d(0x206)](_0xb8a458);}},VisuMZ['ItemsEquipsCore'][_0x23d1fb(0x382)]=VisuMZ[_0x23d1fb(0x382)],VisuMZ[_0x23d1fb(0x382)]=function(_0x93233a){const _0x2b14db=_0x23d1fb;VisuMZ[_0x2b14db(0x248)][_0x2b14db(0x382)][_0x2b14db(0x44b)](this,_0x93233a),VisuMZ[_0x2b14db(0x248)][_0x2b14db(0x206)](_0x93233a);},VisuMZ['ItemsEquipsCore'][_0x23d1fb(0x20a)]=VisuMZ[_0x23d1fb(0x20a)],VisuMZ[_0x23d1fb(0x20a)]=function(_0x50cf4e){const _0x2066ca=_0x23d1fb;VisuMZ[_0x2066ca(0x248)][_0x2066ca(0x20a)][_0x2066ca(0x44b)](this,_0x50cf4e),VisuMZ['ItemsEquipsCore']['Parse_Notetags_Batch'](_0x50cf4e,$dataItems);},VisuMZ[_0x23d1fb(0x248)]['ParseWeaponNotetags']=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x23d1fb(0x40a)]=function(_0x503737){const _0x3f574b=_0x23d1fb;VisuMZ['ItemsEquipsCore'][_0x3f574b(0x40a)][_0x3f574b(0x44b)](this,_0x503737),VisuMZ[_0x3f574b(0x248)]['Parse_Notetags_Batch'](_0x503737,$dataWeapons);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x3a1)]=VisuMZ[_0x23d1fb(0x3a1)],VisuMZ[_0x23d1fb(0x3a1)]=function(_0x739cc8){const _0x512a8c=_0x23d1fb;VisuMZ['ItemsEquipsCore']['ParseArmorNotetags'][_0x512a8c(0x44b)](this,_0x739cc8),VisuMZ[_0x512a8c(0x248)]['Parse_Notetags_Batch'](_0x739cc8,$dataArmors);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x206)]=function(_0x5269fe){const _0x357fdf=_0x23d1fb;_0x5269fe[_0x357fdf(0x3c7)]=[];if(!BattleManager[_0x357fdf(0x3ac)]()&&_0x5269fe[_0x357fdf(0x4fe)][_0x357fdf(0x2fc)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x7bec2=String(RegExp['$1'])[_0x357fdf(0x504)](/[\r\n]+/);for(const _0x2eddea of _0x7bec2){const _0x28ad03=$dataSystem[_0x357fdf(0x1ab)][_0x357fdf(0x41c)](_0x2eddea[_0x357fdf(0x432)]());if(_0x28ad03>0x0)_0x5269fe[_0x357fdf(0x3c7)]['push'](_0x28ad03);}}else for(const _0x56adef of $dataSystem[_0x357fdf(0x1ab)]){const _0x1a939c=$dataSystem['equipTypes']['indexOf'](_0x56adef['trim']());if(_0x1a939c>0x0)_0x5269fe[_0x357fdf(0x3c7)]['push'](_0x1a939c);}},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x3aa)]=function(_0x2eac75,_0x1f9b45){const _0x12620a=_0x23d1fb;VisuMZ['ItemsEquipsCore'][_0x12620a(0x1ea)](_0x2eac75,_0x1f9b45),VisuMZ['ItemsEquipsCore'][_0x12620a(0x359)](_0x2eac75,_0x1f9b45),VisuMZ[_0x12620a(0x248)][_0x12620a(0x1ad)](_0x2eac75,_0x1f9b45),VisuMZ[_0x12620a(0x248)][_0x12620a(0x3e4)](_0x2eac75,_0x1f9b45),VisuMZ[_0x12620a(0x248)][_0x12620a(0x366)](_0x2eac75,_0x1f9b45);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x1ea)]=function(_0x426e34,_0x1caa4d){const _0x4fec9f=_0x23d1fb;_0x426e34[_0x4fec9f(0x2e8)]=[];const _0x4fe2e9=_0x426e34[_0x4fec9f(0x4fe)],_0x5934b8=_0x4fe2e9[_0x4fec9f(0x2fc)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x5934b8)for(const _0x289255 of _0x5934b8){_0x289255['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x322fc5=String(RegExp['$1'])['toUpperCase']()[_0x4fec9f(0x432)]()[_0x4fec9f(0x504)](',');for(const _0x1919f0 of _0x322fc5){_0x426e34[_0x4fec9f(0x2e8)][_0x4fec9f(0x1dd)](_0x1919f0['trim']());}}if(_0x4fe2e9[_0x4fec9f(0x2fc)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0xd939eb=RegExp['$1']['split'](/[\r\n]+/);for(const _0x2df611 of _0xd939eb){_0x426e34[_0x4fec9f(0x2e8)][_0x4fec9f(0x1dd)](_0x2df611['toUpperCase']()[_0x4fec9f(0x432)]());}}},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x359)]=function(_0x4c4bdd,_0x104827){const _0x4d864f=_0x23d1fb;_0x4c4bdd[_0x4d864f(0x4fe)][_0x4d864f(0x2fc)](/<PRICE:[ ](\d+)>/i)&&(_0x4c4bdd[_0x4d864f(0x403)]=Number(RegExp['$1']));},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x1ad)]=function(_0x17d32a,_0x5252f3){const _0x45127f=_0x23d1fb;if(_0x5252f3===$dataItems)return;for(let _0x4d0f4e=0x0;_0x4d0f4e<0x8;_0x4d0f4e++){const _0x644e86=VisuMZ[_0x45127f(0x248)][_0x45127f(0x1fe)]['EquipParams'][_0x4d0f4e];_0x17d32a[_0x45127f(0x4fe)]['match'](_0x644e86)&&(_0x17d32a[_0x45127f(0x242)][_0x4d0f4e]=parseInt(RegExp['$1']));}},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x24e)]={},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x3e4)]=function(_0x44769a,_0x7964c7){const _0x2fe8bb=_0x23d1fb;if(_0x7964c7===$dataItems)return;if(_0x44769a[_0x2fe8bb(0x4fe)]['match'](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x396385=String(RegExp['$1']),_0x2d5355=(_0x7964c7===$dataWeapons?_0x2fe8bb(0x50c):_0x2fe8bb(0x365))[_0x2fe8bb(0x325)](_0x44769a['id']),_0x289bb3=_0x2fe8bb(0x42e)[_0x2fe8bb(0x325)](_0x396385);for(let _0xb3e9c1=0x0;_0xb3e9c1<0x8;_0xb3e9c1++){if(_0x396385[_0x2fe8bb(0x2fc)](VisuMZ[_0x2fe8bb(0x248)][_0x2fe8bb(0x1fe)][_0x2fe8bb(0x24b)][_0xb3e9c1])){const _0x2cf808=_0x2fe8bb(0x32f)[_0x2fe8bb(0x325)](_0x2d5355,_0xb3e9c1);VisuMZ[_0x2fe8bb(0x248)][_0x2fe8bb(0x24e)][_0x2cf808]=new Function(_0x2fe8bb(0x320),_0x2fe8bb(0x3c2),_0x289bb3);}}}},VisuMZ[_0x23d1fb(0x248)]['itemEnableJS']={},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x366)]=function(_0xf91dac,_0x25ad64){const _0x5a0b1a=_0x23d1fb;if(_0x25ad64!==$dataItems)return;if(_0xf91dac[_0x5a0b1a(0x4fe)][_0x5a0b1a(0x2fc)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x3765c3=String(RegExp['$1']),_0x552a93=_0x5a0b1a(0x319)['format'](_0x3765c3);VisuMZ[_0x5a0b1a(0x248)][_0x5a0b1a(0x1fb)][_0xf91dac['id']]=new Function(_0x5a0b1a(0x320),_0x552a93);}},DataManager['isKeyItem']=function(_0x4d06df){const _0xf4f649=_0x23d1fb;return this['isItem'](_0x4d06df)&&_0x4d06df[_0xf4f649(0x2d5)]===0x2;},DataManager[_0x23d1fb(0x23c)]=function(_0x20b12f){const _0x5ec26b=_0x23d1fb;if(!_0x20b12f)return 0x63;else return _0x20b12f['note'][_0x5ec26b(0x2fc)](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this[_0x5ec26b(0x38a)](_0x20b12f);},DataManager[_0x23d1fb(0x38a)]=function(_0x317094){const _0x3852ce=_0x23d1fb;if(this['isItem'](_0x317094))return VisuMZ['ItemsEquipsCore']['Settings'][_0x3852ce(0x3fe)][_0x3852ce(0x308)];else{if(this[_0x3852ce(0x4ad)](_0x317094))return VisuMZ['ItemsEquipsCore'][_0x3852ce(0x357)][_0x3852ce(0x3fe)][_0x3852ce(0x1a6)];else{if(this[_0x3852ce(0x2bb)](_0x317094))return VisuMZ[_0x3852ce(0x248)][_0x3852ce(0x357)][_0x3852ce(0x3fe)][_0x3852ce(0x450)];}}},DataManager['getItemIdWithName']=function(_0x359296){const _0x59487c=_0x23d1fb;_0x359296=_0x359296[_0x59487c(0x25d)]()[_0x59487c(0x432)](),this[_0x59487c(0x21b)]=this['_itemIDs']||{};if(this[_0x59487c(0x21b)][_0x359296])return this[_0x59487c(0x21b)][_0x359296];for(const _0x1b12fb of $dataItems){if(!_0x1b12fb)continue;this[_0x59487c(0x21b)][_0x1b12fb[_0x59487c(0x285)]['toUpperCase']()[_0x59487c(0x432)]()]=_0x1b12fb['id'];}return this[_0x59487c(0x21b)][_0x359296]||0x0;},DataManager['getWeaponIdWithName']=function(_0x341923){const _0x215a2d=_0x23d1fb;_0x341923=_0x341923['toUpperCase']()['trim'](),this[_0x215a2d(0x1be)]=this[_0x215a2d(0x1be)]||{};if(this['_weaponIDs'][_0x341923])return this[_0x215a2d(0x1be)][_0x341923];for(const _0x5e791d of $dataWeapons){if(!_0x5e791d)continue;this['_weaponIDs'][_0x5e791d[_0x215a2d(0x285)]['toUpperCase']()[_0x215a2d(0x432)]()]=_0x5e791d['id'];}return this[_0x215a2d(0x1be)][_0x341923]||0x0;},DataManager[_0x23d1fb(0x421)]=function(_0xc327e0){const _0x243cfc=_0x23d1fb;_0xc327e0=_0xc327e0[_0x243cfc(0x25d)]()[_0x243cfc(0x432)](),this[_0x243cfc(0x4c8)]=this[_0x243cfc(0x4c8)]||{};if(this[_0x243cfc(0x4c8)][_0xc327e0])return this[_0x243cfc(0x4c8)][_0xc327e0];for(const _0x2f6c5f of $dataArmors){if(!_0x2f6c5f)continue;this['_armorIDs'][_0x2f6c5f[_0x243cfc(0x285)]['toUpperCase']()['trim']()]=_0x2f6c5f['id'];}return this['_armorIDs'][_0xc327e0]||0x0;},VisuMZ['ItemsEquipsCore'][_0x23d1fb(0x1ee)]=function(){const _0x3e68e3=_0x23d1fb;VisuMZ[_0x3e68e3(0x248)][_0x3e68e3(0x371)]($dataItems),VisuMZ[_0x3e68e3(0x248)][_0x3e68e3(0x371)]($dataWeapons),VisuMZ[_0x3e68e3(0x248)][_0x3e68e3(0x371)]($dataArmors);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x371)]=function(_0x5e70b2){const _0x2aba74=_0x23d1fb;for(const _0x5c7450 of _0x5e70b2){if(!_0x5c7450)continue;if(!DataManager['isProxyItem'](_0x5c7450))continue;const _0x178781=DataManager[_0x2aba74(0x417)](_0x5c7450),_0x4b691d=[_0x2aba74(0x285),'iconIndex',_0x2aba74(0x1e2)];for(const _0x312eb6 of _0x4b691d){_0x5c7450[_0x312eb6]=_0x178781[_0x312eb6];}}},DataManager[_0x23d1fb(0x193)]=function(_0x4c69ed){const _0x5a7da7=_0x23d1fb;if(!_0x4c69ed)return![];if(!_0x4c69ed[_0x5a7da7(0x4fe)])return![];return _0x4c69ed&&_0x4c69ed['note'][_0x5a7da7(0x2fc)](/<PROXY:[ ](.*)>/i);},DataManager[_0x23d1fb(0x417)]=function(_0x1dea3c){const _0x31006e=_0x23d1fb;return this[_0x31006e(0x193)](_0x1dea3c)?this[_0x31006e(0x40e)](_0x1dea3c)||_0x1dea3c:_0x1dea3c;},DataManager['switchProxyItem']=function(_0x5d2def){const _0x4fa8c0=_0x23d1fb;_0x5d2def['note'][_0x4fa8c0(0x2fc)](/<PROXY:[ ](.*)>/i);const _0x3013c=RegExp['$1']['trim'](),_0x837abd=/^\d+$/['test'](_0x3013c);if(this[_0x4fa8c0(0x1ac)](_0x5d2def)){const _0xf1429=_0x837abd?Number(RegExp['$1']):DataManager[_0x4fa8c0(0x27f)](_0x3013c);return $dataItems[_0xf1429]||_0x5d2def;}else{if(this['isWeapon'](_0x5d2def)){const _0x128861=_0x837abd?Number(RegExp['$1']):DataManager[_0x4fa8c0(0x526)](_0x3013c);return $dataWeapons[_0x128861]||_0x5d2def;}else{if(this[_0x4fa8c0(0x2bb)](_0x5d2def)){const _0x30d96=_0x837abd?Number(RegExp['$1']):DataManager[_0x4fa8c0(0x421)](_0x3013c);return $dataArmors[_0x30d96]||_0x5d2def;}}}return _0x5d2def;},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x223)]=Window_ItemList[_0x23d1fb(0x241)][_0x23d1fb(0x320)],Window_ItemList[_0x23d1fb(0x241)][_0x23d1fb(0x320)]=function(){const _0x1ddb4b=_0x23d1fb;if($gameTemp['_bypassProxy'])return VisuMZ['ItemsEquipsCore'][_0x1ddb4b(0x223)][_0x1ddb4b(0x44b)](this);return DataManager[_0x1ddb4b(0x417)](VisuMZ['ItemsEquipsCore'][_0x1ddb4b(0x223)][_0x1ddb4b(0x44b)](this));},Window_ItemList[_0x23d1fb(0x241)][_0x23d1fb(0x444)]=function(){const _0x5b90cc=_0x23d1fb;return VisuMZ[_0x5b90cc(0x248)][_0x5b90cc(0x223)][_0x5b90cc(0x44b)](this);},VisuMZ['ItemsEquipsCore'][_0x23d1fb(0x3f2)]=Window_ShopBuy['prototype']['item'],Window_ShopBuy['prototype'][_0x23d1fb(0x320)]=function(){const _0x513b2f=_0x23d1fb;if($gameTemp[_0x513b2f(0x184)])return VisuMZ[_0x513b2f(0x248)]['Window_ShopBuy_item'][_0x513b2f(0x44b)](this);return DataManager[_0x513b2f(0x417)](VisuMZ['ItemsEquipsCore']['Window_ShopBuy_item']['call'](this));},Window_ShopBuy[_0x23d1fb(0x241)][_0x23d1fb(0x444)]=function(){const _0x3d3db8=_0x23d1fb;return VisuMZ[_0x3d3db8(0x248)][_0x3d3db8(0x3f2)][_0x3d3db8(0x44b)](this);},VisuMZ['ItemsEquipsCore']['Window_ShopStatus_setItem']=Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x31d)],Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x31d)]=function(_0x52fada){const _0x245910=_0x23d1fb;_0x52fada=DataManager[_0x245910(0x417)](_0x52fada),VisuMZ['ItemsEquipsCore'][_0x245910(0x37e)]['call'](this,_0x52fada);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x1a4)]=Game_Item[_0x23d1fb(0x241)][_0x23d1fb(0x478)],Game_Item[_0x23d1fb(0x241)]['setObject']=function(_0x41dee3){const _0x55b9a3=_0x23d1fb;if(DataManager[_0x55b9a3(0x193)](_0x41dee3))return;VisuMZ[_0x55b9a3(0x248)][_0x55b9a3(0x1a4)][_0x55b9a3(0x44b)](this,_0x41dee3);},DataManager[_0x23d1fb(0x2de)]=function(_0x541e2f){const _0x3c83dd=_0x23d1fb;if(!this[_0x3c83dd(0x2bb)](_0x541e2f))return![];const _0x1b71e6=_0x541e2f[_0x3c83dd(0x4fe)];if(!_0x1b71e6)return![];if(_0x1b71e6[_0x3c83dd(0x2fc)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x1b71e6[_0x3c83dd(0x2fc)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x1b71e6[_0x3c83dd(0x2fc)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x1b71e6['match'](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x23d1fb(0x3d2)]=function(_0x405954){const _0x1525df=_0x23d1fb;if(!this[_0x1525df(0x2de)](_0x405954))return![];const _0x2357bb=_0x405954[_0x1525df(0x4fe)];if(!_0x2357bb)return![];if(_0x2357bb['match'](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x2357bb[_0x1525df(0x2fc)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x23d1fb(0x386)]=function(_0x3b27ed){const _0x36db44=_0x23d1fb;if(!this[_0x36db44(0x2de)](_0x3b27ed))return![];const _0x1354b7=_0x3b27ed[_0x36db44(0x4fe)];if(!_0x1354b7)return![];if(_0x1354b7['match'](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x1354b7[_0x36db44(0x2fc)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager['isTroopArtifact']=function(_0x2f816a){const _0x55d914=_0x23d1fb;if(!this[_0x55d914(0x2de)](_0x2f816a))return![];const _0x3fdf0a=_0x2f816a['note'];if(!_0x3fdf0a)return![];if(_0x3fdf0a['match'](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x3fdf0a[_0x55d914(0x2fc)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},VisuMZ['ItemsEquipsCore'][_0x23d1fb(0x31a)]=Game_BattlerBase[_0x23d1fb(0x241)][_0x23d1fb(0x2fa)],Game_BattlerBase[_0x23d1fb(0x241)][_0x23d1fb(0x2fa)]=function(_0x191c31){const _0x3468a3=_0x23d1fb;if(DataManager[_0x3468a3(0x2de)](_0x191c31))return![];return VisuMZ[_0x3468a3(0x248)][_0x3468a3(0x31a)]['call'](this,_0x191c31);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x1d2)]=Game_BattlerBase[_0x23d1fb(0x241)]['param'],Game_BattlerBase[_0x23d1fb(0x241)][_0x23d1fb(0x3bf)]=function(_0x30b14a){const _0x2a45a7=_0x23d1fb;this[_0x2a45a7(0x4e8)]=!![];const _0x3445da=VisuMZ[_0x2a45a7(0x248)][_0x2a45a7(0x1d2)][_0x2a45a7(0x44b)](this,_0x30b14a);return this[_0x2a45a7(0x4e8)]=undefined,_0x3445da;},VisuMZ[_0x23d1fb(0x248)]['Game_Actor_artifact']=Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x41b)],Game_Actor['prototype'][_0x23d1fb(0x41b)]=function(){const _0x30b97d=_0x23d1fb;this[_0x30b97d(0x2d8)]=!![];const _0x3d6a81=VisuMZ['ItemsEquipsCore'][_0x30b97d(0x519)][_0x30b97d(0x44b)](this);return this[_0x30b97d(0x2d8)]=undefined,_0x3d6a81;},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x407)]=Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x38e)],Game_Actor['prototype'][_0x23d1fb(0x38e)]=function(){const _0x458f7c=_0x23d1fb,_0x2832c9=VisuMZ[_0x458f7c(0x248)][_0x458f7c(0x407)][_0x458f7c(0x44b)](this);if(this['_allowArtifactTraitObjects']||this[_0x458f7c(0x4e8)]){const _0x4dc63f=_0x2832c9[_0x458f7c(0x1c1)]($gameParty['partyArtifacts']());return _0x4dc63f;}else return _0x2832c9;},VisuMZ[_0x23d1fb(0x248)]['Game_BattlerBase_paramPlus_artifact']=Game_BattlerBase[_0x23d1fb(0x241)][_0x23d1fb(0x377)],Game_BattlerBase[_0x23d1fb(0x241)][_0x23d1fb(0x377)]=function(_0x2c9778){const _0x2ad5ca=_0x23d1fb;let _0x48ae4a=VisuMZ['ItemsEquipsCore'][_0x2ad5ca(0x301)]['call'](this,_0x2c9778);if(this['constructor']===Game_Enemy)for(const _0x377737 of $gameParty[_0x2ad5ca(0x2af)]()){if(_0x377737)_0x48ae4a+=_0x377737[_0x2ad5ca(0x242)][_0x2c9778];}return _0x48ae4a;},VisuMZ['ItemsEquipsCore'][_0x23d1fb(0x19b)]=Game_Enemy[_0x23d1fb(0x241)]['traitObjects'],Game_Enemy['prototype']['traitObjects']=function(){const _0xc2a855=_0x23d1fb;let _0x43b4ab=VisuMZ[_0xc2a855(0x248)][_0xc2a855(0x19b)][_0xc2a855(0x44b)](this);return _0x43b4ab['concat']($gameParty['troopArtifacts']());},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x1e1)]=Game_Party[_0x23d1fb(0x241)]['gainItem'],Game_Party[_0x23d1fb(0x241)][_0x23d1fb(0x363)]=function(_0x354584,_0x49f118,_0xffa93e){const _0x1e61c2=_0x23d1fb;VisuMZ['ItemsEquipsCore'][_0x1e61c2(0x1e1)][_0x1e61c2(0x44b)](this,_0x354584,_0x49f118,_0xffa93e);if(DataManager[_0x1e61c2(0x2de)](_0x354584)){let _0x5659e1=$gameParty['allMembers']();if($gameParty['inBattle']())_0x5659e1=_0x5659e1[_0x1e61c2(0x1c1)]($gameTroop[_0x1e61c2(0x368)]());for(const _0x1e54dd of _0x5659e1){if(!_0x1e54dd)continue;_0x1e54dd[_0x1e61c2(0x2e9)]={};}}},Game_Party[_0x23d1fb(0x241)]['partyArtifacts']=function(){const _0x4e0991=_0x23d1fb;let _0x10c111=[];for(const _0x235612 of this[_0x4e0991(0x497)]()){if(!_0x235612)continue;if(!DataManager[_0x4e0991(0x2de)](_0x235612))continue;if(!DataManager[_0x4e0991(0x386)](_0x235612))continue;let _0x31b48b=0x1;if(DataManager[_0x4e0991(0x3d2)](_0x235612))_0x31b48b=this['numItems'](_0x235612);while(_0x31b48b--)_0x10c111['push'](_0x235612);}return _0x10c111;},Game_Party['prototype']['troopArtifacts']=function(){const _0xb62e5e=_0x23d1fb;let _0x3d127f=[];for(const _0x2af6f5 of this[_0xb62e5e(0x497)]()){if(!_0x2af6f5)continue;if(!DataManager[_0xb62e5e(0x2de)](_0x2af6f5))continue;if(!DataManager[_0xb62e5e(0x2f3)](_0x2af6f5))continue;let _0x4f1360=0x1;if(DataManager['isStackableArtifact'](_0x2af6f5))_0x4f1360=this[_0xb62e5e(0x4b0)](_0x2af6f5);while(_0x4f1360--)_0x3d127f[_0xb62e5e(0x1dd)](_0x2af6f5);}return _0x3d127f;},Game_Party[_0x23d1fb(0x241)][_0x23d1fb(0x4ce)]=function(){const _0x1b8260=_0x23d1fb;return this[_0x1b8260(0x355)]()[_0x1b8260(0x1c1)](this[_0x1b8260(0x2af)]());},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x4b5)]=Game_Party[_0x23d1fb(0x241)]['setupBattleTestItems'],Game_Party[_0x23d1fb(0x241)][_0x23d1fb(0x2aa)]=function(){const _0x1bf82c=_0x23d1fb;VisuMZ[_0x1bf82c(0x248)]['Game_Party_setupBattleTestItems_artifact'][_0x1bf82c(0x44b)](this),this[_0x1bf82c(0x4db)]();},Game_Party['prototype']['removeBattleTestArtifacts']=function(){const _0x4c39f0=_0x23d1fb,_0x5d9f55=$gameParty[_0x4c39f0(0x497)]()[_0x4c39f0(0x324)](_0x5e02b7=>DataManager[_0x4c39f0(0x2de)](_0x5e02b7));for(const _0x4cd1c4 of _0x5d9f55){const _0x53243f=this['numItems'](_0x4cd1c4);if(_0x53243f)this[_0x4c39f0(0x2dc)](_0x4cd1c4,_0x53243f);}},TextManager[_0x23d1fb(0x4dd)]={'helpDesc':{'equip':VisuMZ['ItemsEquipsCore'][_0x23d1fb(0x357)][_0x23d1fb(0x3af)]['equipCmdDesc']??'Pick\x20and\x20choose\x20equipment\x20to\x20change.','optimize':VisuMZ['ItemsEquipsCore']['Settings'][_0x23d1fb(0x3af)][_0x23d1fb(0x1b4)]??'Equip\x20the\x20strongest\x20available\x20equipment.','clear':VisuMZ['ItemsEquipsCore'][_0x23d1fb(0x357)][_0x23d1fb(0x3af)]['clearCmdDesc']??_0x23d1fb(0x1d8)}},ColorManager['getItemColor']=function(_0x567caa){const _0x1cafb2=_0x23d1fb;if(!_0x567caa)return this['normalColor']();else{if(_0x567caa[_0x1cafb2(0x4fe)]['match'](/<COLOR:[ ](\d+)>/i))return this[_0x1cafb2(0x296)](Number(RegExp['$1'])[_0x1cafb2(0x3b7)](0x0,0x1f));else return _0x567caa['note'][_0x1cafb2(0x2fc)](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this[_0x1cafb2(0x192)]();}},ColorManager[_0x23d1fb(0x3c5)]=function(_0x737ca0){const _0x1a21b6=_0x23d1fb;return _0x737ca0=String(_0x737ca0),_0x737ca0[_0x1a21b6(0x2fc)](/#(.*)/i)?_0x1a21b6(0x32d)[_0x1a21b6(0x325)](String(RegExp['$1'])):this[_0x1a21b6(0x296)](Number(_0x737ca0));},SceneManager[_0x23d1fb(0x40c)]=function(){const _0x436853=_0x23d1fb;return this[_0x436853(0x2b6)]&&this[_0x436853(0x2b6)][_0x436853(0x1f1)]===Scene_Shop;},Game_Temp[_0x23d1fb(0x241)][_0x23d1fb(0x313)]=function(){const _0x4b9b79=_0x23d1fb;if(this[_0x4b9b79(0x46b)])return![];return VisuMZ[_0x4b9b79(0x248)]['Settings'][_0x4b9b79(0x333)]['Enable'];},VisuMZ[_0x23d1fb(0x1a7)]=VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x357)][_0x23d1fb(0x4c6)][_0x23d1fb(0x2c8)],VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x1ec)]=Game_BattlerBase[_0x23d1fb(0x241)]['param'],Game_BattlerBase[_0x23d1fb(0x241)][_0x23d1fb(0x3bf)]=function(_0x439ad0){const _0x56de53=_0x23d1fb;return this[_0x56de53(0x374)]?this[_0x56de53(0x224)]?VisuMZ[_0x56de53(0x1a7)]:0x1:VisuMZ[_0x56de53(0x248)][_0x56de53(0x1ec)][_0x56de53(0x44b)](this,_0x439ad0);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x433)]=Game_BattlerBase['prototype']['meetsItemConditions'],Game_BattlerBase[_0x23d1fb(0x241)][_0x23d1fb(0x3a6)]=function(_0x2e8d2e){const _0x20c3e8=_0x23d1fb;if(!_0x2e8d2e)return![];if(!VisuMZ[_0x20c3e8(0x248)]['Game_BattlerBase_meetsItemConditions']['call'](this,_0x2e8d2e))return![];if(!this[_0x20c3e8(0x236)](_0x2e8d2e))return![];if(!this[_0x20c3e8(0x498)](_0x2e8d2e))return![];return!![];},Game_BattlerBase[_0x23d1fb(0x241)]['meetsItemConditionsNotetags']=function(_0xba6fce){const _0x2d3c7c=_0x23d1fb;if(!this[_0x2d3c7c(0x25e)](_0xba6fce))return![];return!![];},Game_BattlerBase['prototype']['checkItemConditionsSwitchNotetags']=function(_0x471432){const _0x527c7e=_0x23d1fb,_0x2fa95c=_0x471432[_0x527c7e(0x4fe)];if(_0x2fa95c[_0x527c7e(0x2fc)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x45fcc4=JSON[_0x527c7e(0x257)]('['+RegExp['$1'][_0x527c7e(0x2fc)](/\d+/g)+']');for(const _0x5dea01 of _0x45fcc4){if(!$gameSwitches[_0x527c7e(0x3f6)](_0x5dea01))return![];}return!![];}if(_0x2fa95c[_0x527c7e(0x2fc)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x17df0c=JSON['parse']('['+RegExp['$1'][_0x527c7e(0x2fc)](/\d+/g)+']');for(const _0x506de7 of _0x17df0c){if(!$gameSwitches['value'](_0x506de7))return![];}return!![];}if(_0x2fa95c[_0x527c7e(0x2fc)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x20b3fd=JSON[_0x527c7e(0x257)]('['+RegExp['$1'][_0x527c7e(0x2fc)](/\d+/g)+']');for(const _0x4abbcb of _0x20b3fd){if($gameSwitches[_0x527c7e(0x3f6)](_0x4abbcb))return!![];}return![];}if(_0x2fa95c[_0x527c7e(0x2fc)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xe4c9f2=JSON[_0x527c7e(0x257)]('['+RegExp['$1'][_0x527c7e(0x2fc)](/\d+/g)+']');for(const _0x534abd of _0xe4c9f2){if(!$gameSwitches['value'](_0x534abd))return!![];}return![];}if(_0x2fa95c[_0x527c7e(0x2fc)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x10b4d3=JSON[_0x527c7e(0x257)]('['+RegExp['$1'][_0x527c7e(0x2fc)](/\d+/g)+']');for(const _0x42288e of _0x10b4d3){if(!$gameSwitches[_0x527c7e(0x3f6)](_0x42288e))return!![];}return![];}if(_0x2fa95c['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3de00d=JSON[_0x527c7e(0x257)]('['+RegExp['$1'][_0x527c7e(0x2fc)](/\d+/g)+']');for(const _0xa1ced2 of _0x3de00d){if($gameSwitches[_0x527c7e(0x3f6)](_0xa1ced2))return![];}return!![];}return!![];},Game_BattlerBase['prototype']['meetsItemConditionsJS']=function(_0x1c5301){const _0x17c6f4=_0x1c5301['note'],_0x824f2b=VisuMZ['ItemsEquipsCore']['itemEnableJS'];return _0x824f2b[_0x1c5301['id']]?_0x824f2b[_0x1c5301['id']]['call'](this,_0x1c5301):!![];},Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x3a2)]=function(_0x581eef){const _0x5bffa7=_0x23d1fb;_0x581eef=this[_0x5bffa7(0x2bf)](_0x581eef);const _0x15b9da=this[_0x5bffa7(0x3c7)]();this['_equips']=[];for(let _0x50da49=0x0;_0x50da49<_0x15b9da[_0x5bffa7(0x401)];_0x50da49++){this[_0x5bffa7(0x4b4)][_0x50da49]=new Game_Item();}for(let _0xc38a67=0x0;_0xc38a67<_0x15b9da[_0x5bffa7(0x401)];_0xc38a67++){const _0x3931eb=_0x15b9da[_0xc38a67],_0x13898b=this['getMatchingInitEquip'](_0x581eef,_0x3931eb);if(this[_0x5bffa7(0x2fa)](_0x13898b))this['_equips'][_0xc38a67][_0x5bffa7(0x478)](_0x13898b);}this[_0x5bffa7(0x303)](!![]),this['refresh']();},Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x2bf)]=function(_0x22e101){const _0xfd567a=_0x23d1fb,_0x4780ad=[];for(let _0x497d52=0x0;_0x497d52<_0x22e101[_0xfd567a(0x401)];_0x497d52++){const _0xc94e48=_0x22e101[_0x497d52];if(_0xc94e48<=0x0)continue;const _0x72cbaa=$dataSystem[_0xfd567a(0x1ab)][_0x497d52+0x1];if(_0x72cbaa===$dataSystem[_0xfd567a(0x1ab)][0x1]||_0x497d52===0x1&&this['isDualWield']())_0x4780ad['push']($dataWeapons[_0xc94e48]);else{if(BattleManager[_0xfd567a(0x3ac)]()){const _0x8dee1f=$dataArmors[_0xc94e48];_0x8dee1f&&_0x8dee1f[_0xfd567a(0x394)]===_0x497d52+0x1&&_0x4780ad[_0xfd567a(0x1dd)](_0x8dee1f);}else{const _0x5df665=$dataArmors[_0xc94e48];_0x5df665&&_0x5df665['etypeId']===_0x497d52+0x1&&_0x4780ad[_0xfd567a(0x1dd)](_0x5df665);}}}return _0x4780ad;},Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x1bc)]=function(_0x141b8e,_0x525768){const _0x585f0b=_0x23d1fb;for(const _0x295803 of _0x141b8e){if(!_0x295803)continue;if(_0x295803['etypeId']===_0x525768)return _0x141b8e[_0x585f0b(0x33f)](_0x141b8e[_0x585f0b(0x41c)](_0x295803),0x1),_0x295803;}return null;},Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x3c7)]=function(){const _0x3c7740=_0x23d1fb,_0x3cee71=JsonEx[_0x3c7740(0x213)](this[_0x3c7740(0x2b4)]||this[_0x3c7740(0x37a)]()['equipSlots']);if(_0x3cee71[_0x3c7740(0x401)]>=0x2&&this['isDualWield']())_0x3cee71[0x1]=0x1;return _0x3cee71;},Game_Actor['prototype'][_0x23d1fb(0x4f3)]=function(_0xd16f2b){const _0x352eb1=_0x23d1fb;_0xd16f2b['remove'](0x0),_0xd16f2b[_0x352eb1(0x4ed)](-0x1),this[_0x352eb1(0x2b4)]=_0xd16f2b,this['refresh'](),this['updateChangedSlots']();},Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x1ca)]=function(){const _0x24fa82=_0x23d1fb;this[_0x24fa82(0x2b4)]=undefined,this[_0x24fa82(0x3c3)](),this[_0x24fa82(0x4e2)]();},Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x4e2)]=function(){const _0x54ec32=_0x23d1fb;let _0x2063de=this[_0x54ec32(0x3c7)]()[_0x54ec32(0x401)];while(this[_0x54ec32(0x4b4)][_0x54ec32(0x401)]>_0x2063de){const _0x322720=this[_0x54ec32(0x4b4)][this[_0x54ec32(0x4b4)][_0x54ec32(0x401)]-0x1];_0x322720&&_0x322720['object']()&&$gameParty['gainItem'](_0x322720[_0x54ec32(0x390)](),0x1),this[_0x54ec32(0x4b4)][_0x54ec32(0x261)]();}while(_0x2063de>this[_0x54ec32(0x4b4)]['length']){this[_0x54ec32(0x4b4)][_0x54ec32(0x1dd)](new Game_Item());}},Game_Actor['prototype'][_0x23d1fb(0x45b)]=function(){const _0x1f85bf=_0x23d1fb,_0xa6a040=this[_0x1f85bf(0x3c7)]();for(let _0x4d4bcc=0x0;_0x4d4bcc<_0xa6a040[_0x1f85bf(0x401)];_0x4d4bcc++){if(!this[_0x1f85bf(0x4b4)][_0x4d4bcc])this[_0x1f85bf(0x4b4)][_0x4d4bcc]=new Game_Item();}this[_0x1f85bf(0x303)](![]),this['refresh']();},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x512)]=Game_Actor[_0x23d1fb(0x241)]['changeEquip'],Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x2eb)]=function(_0x57ceae,_0x18fd86){const _0x3f8443=_0x23d1fb;if(!this['_tempActor']){const _0x327c42=JsonEx[_0x3f8443(0x213)](this);_0x327c42[_0x3f8443(0x31b)]=!![],VisuMZ['ItemsEquipsCore'][_0x3f8443(0x512)][_0x3f8443(0x44b)](this,_0x57ceae,_0x18fd86),this[_0x3f8443(0x4ae)](_0x327c42);}else VisuMZ[_0x3f8443(0x248)][_0x3f8443(0x512)][_0x3f8443(0x44b)](this,_0x57ceae,_0x18fd86);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x43d)]=Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x507)],Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x507)]=function(_0x1467bf,_0x225ea7){const _0x379cb0=_0x23d1fb;if(!this['_tempActor']){const _0x4b1958=JsonEx[_0x379cb0(0x213)](this);_0x4b1958[_0x379cb0(0x31b)]=!![],VisuMZ[_0x379cb0(0x248)][_0x379cb0(0x43d)][_0x379cb0(0x44b)](this,_0x1467bf,_0x225ea7),this[_0x379cb0(0x4ae)](_0x4b1958);}else VisuMZ[_0x379cb0(0x248)][_0x379cb0(0x43d)][_0x379cb0(0x44b)](this,_0x1467bf,_0x225ea7);},VisuMZ[_0x23d1fb(0x248)]['Game_Actor_discardEquip']=Game_Actor[_0x23d1fb(0x241)]['discardEquip'],Game_Actor[_0x23d1fb(0x241)]['discardEquip']=function(_0x31fd99){const _0x1e4685=_0x23d1fb;if(!this[_0x1e4685(0x31b)]){const _0x506406=JsonEx['makeDeepCopy'](this);_0x506406[_0x1e4685(0x31b)]=!![],VisuMZ['ItemsEquipsCore']['Game_Actor_discardEquip'][_0x1e4685(0x44b)](this,_0x31fd99),this[_0x1e4685(0x4ae)](_0x506406);}else VisuMZ[_0x1e4685(0x248)][_0x1e4685(0x27b)][_0x1e4685(0x44b)](this,_0x31fd99);},Game_Actor[_0x23d1fb(0x241)]['releaseUnequippableItems']=function(_0x2843a5){const _0x1059a4=_0x23d1fb;if(this[_0x1059a4(0x1d1)])return;for(;;){const _0x744c66=this['equipSlots'](),_0x467041=this[_0x1059a4(0x38e)](),_0x8ecf61=_0x467041[_0x1059a4(0x401)];let _0xcac19f=![];for(let _0x260ca6=0x0;_0x260ca6<_0x8ecf61;_0x260ca6++){const _0x3b1651=_0x467041[_0x260ca6];if(_0x3b1651&&(!this['canEquip'](_0x3b1651)||_0x3b1651['etypeId']!==_0x744c66[_0x260ca6])){!_0x2843a5&&this['tradeItemWithParty'](null,_0x3b1651);if(!this['_tempActor']){const _0x1d5780=JsonEx['makeDeepCopy'](this);_0x1d5780[_0x1059a4(0x31b)]=!![],this[_0x1059a4(0x4b4)][_0x260ca6][_0x1059a4(0x478)](null),this[_0x1059a4(0x1d1)]=!![],this['equipAdjustHpMp'](_0x1d5780),this[_0x1059a4(0x1d1)]=undefined;}else this[_0x1059a4(0x4b4)][_0x260ca6][_0x1059a4(0x478)](null);_0xcac19f=!![];}}if(!_0xcac19f)break;}},Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x4ae)]=function(_0x408539){const _0x52e634=_0x23d1fb;if(this['_tempActor'])return;if(!VisuMZ[_0x52e634(0x248)][_0x52e634(0x357)]['EquipScene'][_0x52e634(0x528)])return;const _0x5ed920=Math['round'](_0x408539['hpRate']()*this[_0x52e634(0x45f)]),_0x22e5ae=Math[_0x52e634(0x291)](_0x408539[_0x52e634(0x525)]()*this[_0x52e634(0x2c3)]);if(this['hp']>0x0)this[_0x52e634(0x4b2)](_0x5ed920);if(this['mp']>0x0)this['setMp'](_0x22e5ae);},Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x4e1)]=function(){const _0x4570ff=_0x23d1fb,_0x558ff2=this[_0x4570ff(0x3c7)]()['length'];for(let _0x52fda5=0x0;_0x52fda5<_0x558ff2;_0x52fda5++){if(this[_0x4570ff(0x373)](_0x52fda5))this['changeEquip'](_0x52fda5,null);}},Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x373)]=function(_0x5e949b){const _0xe7afca=_0x23d1fb;return this[_0xe7afca(0x1e6)]()['includes'](this[_0xe7afca(0x3c7)]()[_0x5e949b])?![]:this['isEquipChangeOk'](_0x5e949b);},Game_Actor['prototype'][_0x23d1fb(0x1e6)]=function(){const _0x30177a=_0x23d1fb;return VisuMZ[_0x30177a(0x248)][_0x30177a(0x357)][_0x30177a(0x3af)]['NonRemoveETypes'];},Game_Actor['prototype']['optimizeEquipments']=function(){const _0x35320f=_0x23d1fb,_0x5cc0df=this[_0x35320f(0x3c7)]()[_0x35320f(0x401)];for(let _0x497534=0x0;_0x497534<_0x5cc0df;_0x497534++){if(this[_0x35320f(0x4e0)](_0x497534))this['changeEquip'](_0x497534,null);}for(let _0x4c3d09=0x0;_0x4c3d09<_0x5cc0df;_0x4c3d09++){if(this['isOptimizeEquipOk'](_0x4c3d09))this[_0x35320f(0x2eb)](_0x4c3d09,this[_0x35320f(0x1d9)](_0x4c3d09));}},Game_Actor['prototype'][_0x23d1fb(0x4e0)]=function(_0x2b4fc9){const _0x4f1745=_0x23d1fb;return this[_0x4f1745(0x41f)]()[_0x4f1745(0x39a)](this[_0x4f1745(0x3c7)]()[_0x2b4fc9])?![]:this['isEquipChangeOk'](_0x2b4fc9);},Game_Actor['prototype']['nonOptimizeEtypes']=function(){const _0x377c9b=_0x23d1fb;return VisuMZ['ItemsEquipsCore'][_0x377c9b(0x357)][_0x377c9b(0x3af)][_0x377c9b(0x302)];},VisuMZ[_0x23d1fb(0x248)]['Game_Actor_tradeItemWithParty']=Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x2d1)],Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x2d1)]=function(_0x4c114c,_0x344919){const _0x4f79f8=_0x23d1fb;if(this[_0x4f79f8(0x31b)])return![];$gameTemp[_0x4f79f8(0x46b)]=!![];const _0x21df4f=VisuMZ[_0x4f79f8(0x248)][_0x4f79f8(0x42c)]['call'](this,_0x4c114c,_0x344919);return $gameTemp[_0x4f79f8(0x46b)]=![],_0x21df4f;},Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x462)]=function(_0x3e690d,_0x21cd62){const _0x5c62b9=_0x23d1fb,_0xd55980=this['getNextAvailableEtypeId'](_0x3e690d);if(_0xd55980<0x0)return;const _0xf1e264=_0x3e690d===0x1?$dataWeapons[_0x21cd62]:$dataArmors[_0x21cd62];this[_0x5c62b9(0x2eb)](_0xd55980,_0xf1e264);},Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x4cf)]=function(_0x5660a5){const _0xa2088d=_0x23d1fb;let _0x2fb400=0x0;const _0x31cec4=this[_0xa2088d(0x3c7)](),_0x57eb87=this[_0xa2088d(0x38e)]();for(let _0xf4faea=0x0;_0xf4faea<_0x31cec4[_0xa2088d(0x401)];_0xf4faea++){if(_0x31cec4[_0xf4faea]===_0x5660a5){_0x2fb400=_0xf4faea;if(!_0x57eb87[_0xf4faea])return _0x2fb400;}}return _0x2fb400;},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x227)]=Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x377)],Game_Actor['prototype'][_0x23d1fb(0x377)]=function(_0x27ba13){const _0x437ed1=_0x23d1fb;let _0x1dcda1=VisuMZ[_0x437ed1(0x248)]['Game_Actor_paramPlus']['call'](this,_0x27ba13);for(const _0x20262f of this[_0x437ed1(0x38e)]()){if(_0x20262f)_0x1dcda1+=this['paramPlusItemsEquipsCoreCustomJS'](_0x20262f,_0x27ba13);}return _0x1dcda1;},Game_Actor['prototype'][_0x23d1fb(0x3b5)]=function(_0x5e45ef,_0x301e93){const _0x29710c=_0x23d1fb;if(this['_calculatingJSParameters'])return 0x0;const _0x4f320b=(DataManager[_0x29710c(0x4ad)](_0x5e45ef)?_0x29710c(0x50c):'A%1')[_0x29710c(0x325)](_0x5e45ef['id']),_0x54ccf1=_0x29710c(0x32f)[_0x29710c(0x325)](_0x4f320b,_0x301e93);if(VisuMZ[_0x29710c(0x248)]['paramJS'][_0x54ccf1]){this[_0x29710c(0x33c)]=!![];const _0x35800c=VisuMZ['ItemsEquipsCore'][_0x29710c(0x24e)][_0x54ccf1][_0x29710c(0x44b)](this,_0x5e45ef,_0x301e93);return this[_0x29710c(0x33c)]=![],_0x35800c;}else return 0x0;},Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x452)]=function(_0x4055c1){const _0x4ea280=_0x23d1fb;this[_0x4ea280(0x374)]=!![],this['_shopStatusMenuAlly']=_0x4055c1;},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x202)]=Game_Party[_0x23d1fb(0x241)][_0x23d1fb(0x415)],Game_Party[_0x23d1fb(0x241)][_0x23d1fb(0x415)]=function(){const _0x2bd233=_0x23d1fb;VisuMZ[_0x2bd233(0x248)][_0x2bd233(0x202)]['call'](this),this[_0x2bd233(0x51f)]();},Game_Party[_0x23d1fb(0x241)][_0x23d1fb(0x51f)]=function(){this['_newItemsList']=[];},Game_Party['prototype'][_0x23d1fb(0x1ff)]=function(_0x238c9d){const _0x721259=_0x23d1fb;if(!$gameTemp[_0x721259(0x313)]())return![];if(this['_newItemsList']===undefined)this['initNewItemsList']();let _0x1670c3='';if(DataManager['isItem'](_0x238c9d))_0x1670c3=_0x721259(0x48b)[_0x721259(0x325)](_0x238c9d['id']);else{if(DataManager['isWeapon'](_0x238c9d))_0x1670c3=_0x721259(0x2a7)[_0x721259(0x325)](_0x238c9d['id']);else{if(DataManager[_0x721259(0x2bb)](_0x238c9d))_0x1670c3=_0x721259(0x4ac)[_0x721259(0x325)](_0x238c9d['id']);else return;}}return this[_0x721259(0x347)][_0x721259(0x39a)](_0x1670c3);},Game_Party[_0x23d1fb(0x241)][_0x23d1fb(0x4d6)]=function(_0x1f8464){const _0x10db74=_0x23d1fb;if(!$gameTemp['newLabelEnabled']())return;if(this['_newItemsList']===undefined)this[_0x10db74(0x51f)]();let _0x47334d='';if(DataManager[_0x10db74(0x1ac)](_0x1f8464))_0x47334d=_0x10db74(0x48b)[_0x10db74(0x325)](_0x1f8464['id']);else{if(DataManager['isWeapon'](_0x1f8464))_0x47334d='weapon-%1'[_0x10db74(0x325)](_0x1f8464['id']);else{if(DataManager['isArmor'](_0x1f8464))_0x47334d=_0x10db74(0x4ac)[_0x10db74(0x325)](_0x1f8464['id']);else return;}}if(!this[_0x10db74(0x347)][_0x10db74(0x39a)](_0x47334d))this[_0x10db74(0x347)][_0x10db74(0x1dd)](_0x47334d);},Game_Party[_0x23d1fb(0x241)][_0x23d1fb(0x413)]=function(_0x153632){const _0x458ca4=_0x23d1fb;if(!$gameTemp[_0x458ca4(0x313)]())return;if(this[_0x458ca4(0x347)]===undefined)this[_0x458ca4(0x51f)]();let _0x3cf552='';if(DataManager['isItem'](_0x153632))_0x3cf552='item-%1'[_0x458ca4(0x325)](_0x153632['id']);else{if(DataManager[_0x458ca4(0x4ad)](_0x153632))_0x3cf552='weapon-%1'['format'](_0x153632['id']);else{if(DataManager['isArmor'](_0x153632))_0x3cf552=_0x458ca4(0x4ac)[_0x458ca4(0x325)](_0x153632['id']);else return;}}this['_newItemsList'][_0x458ca4(0x39a)](_0x3cf552)&&this[_0x458ca4(0x347)]['splice'](this[_0x458ca4(0x347)][_0x458ca4(0x41c)](_0x3cf552),0x1);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x2c7)]=Game_Party[_0x23d1fb(0x241)][_0x23d1fb(0x4b0)],Game_Party[_0x23d1fb(0x241)][_0x23d1fb(0x4b0)]=function(_0x3d4be2){const _0x49490f=_0x23d1fb;if(DataManager[_0x49490f(0x193)](_0x3d4be2))_0x3d4be2=DataManager[_0x49490f(0x417)](_0x3d4be2);return VisuMZ[_0x49490f(0x248)][_0x49490f(0x2c7)][_0x49490f(0x44b)](this,_0x3d4be2);},VisuMZ['ItemsEquipsCore']['Game_Party_gainItem']=Game_Party[_0x23d1fb(0x241)][_0x23d1fb(0x363)],Game_Party[_0x23d1fb(0x241)][_0x23d1fb(0x363)]=function(_0x1875d1,_0x1aa43f,_0x5ba02f){const _0x19559a=_0x23d1fb;if(DataManager[_0x19559a(0x193)](_0x1875d1))_0x1875d1=null;const _0x5d63ac=this['numItems'](_0x1875d1);VisuMZ[_0x19559a(0x248)][_0x19559a(0x527)][_0x19559a(0x44b)](this,_0x1875d1,_0x1aa43f,_0x5ba02f);if(this[_0x19559a(0x4b0)](_0x1875d1)>_0x5d63ac)this[_0x19559a(0x4d6)](_0x1875d1);},Game_Party['prototype'][_0x23d1fb(0x22a)]=function(_0x4fea2a){const _0x3e45b6=_0x23d1fb;if(DataManager[_0x3e45b6(0x193)](_0x4fea2a))_0x4fea2a=DataManager['getProxyItem'](_0x4fea2a);return DataManager['maxItemAmount'](_0x4fea2a);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x281)]=Scene_ItemBase[_0x23d1fb(0x241)][_0x23d1fb(0x480)],Scene_ItemBase[_0x23d1fb(0x241)][_0x23d1fb(0x480)]=function(){const _0x1f4373=_0x23d1fb;VisuMZ[_0x1f4373(0x248)][_0x1f4373(0x281)][_0x1f4373(0x44b)](this),this[_0x1f4373(0x468)][_0x1f4373(0x2c2)]();},Scene_Item[_0x23d1fb(0x241)]['isBottomHelpMode']=function(){const _0x46bc7e=_0x23d1fb;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x46bc7e(0x505)]!==undefined)return ConfigManager[_0x46bc7e(0x505)];else{if(this[_0x46bc7e(0x23a)]())return this[_0x46bc7e(0x238)]()[_0x46bc7e(0x2fc)](/LOWER/i);else Scene_ItemBase[_0x46bc7e(0x241)][_0x46bc7e(0x330)][_0x46bc7e(0x44b)](this);}},Scene_Item['prototype'][_0x23d1fb(0x330)]=function(){const _0x48a19e=_0x23d1fb;if(ConfigManager[_0x48a19e(0x48c)]&&ConfigManager[_0x48a19e(0x27e)]!==undefined)return ConfigManager[_0x48a19e(0x27e)];else{if(this[_0x48a19e(0x23a)]())return this[_0x48a19e(0x238)]()[_0x48a19e(0x2fc)](/RIGHT/i);else Scene_ItemBase[_0x48a19e(0x241)]['isRightInputMode'][_0x48a19e(0x44b)](this);}},Scene_Item['prototype'][_0x23d1fb(0x238)]=function(){const _0xcab78b=_0x23d1fb;return VisuMZ[_0xcab78b(0x248)][_0xcab78b(0x357)][_0xcab78b(0x3fe)]['LayoutStyle'];},Scene_Item[_0x23d1fb(0x241)]['isUseModernControls']=function(){const _0x30cd2e=_0x23d1fb;return this[_0x30cd2e(0x48d)]&&this[_0x30cd2e(0x48d)][_0x30cd2e(0x3bd)]();},Scene_Item['prototype'][_0x23d1fb(0x23a)]=function(){const _0x88398d=_0x23d1fb;return VisuMZ['ItemsEquipsCore'][_0x88398d(0x357)][_0x88398d(0x3fe)]['EnableLayout'];},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x4ab)]=Scene_Item['prototype'][_0x23d1fb(0x4d7)],Scene_Item[_0x23d1fb(0x241)][_0x23d1fb(0x4d7)]=function(){const _0x3e8c84=_0x23d1fb;VisuMZ['ItemsEquipsCore']['Scene_Item_create'][_0x3e8c84(0x44b)](this),this['isUseModernControls']()&&this[_0x3e8c84(0x35d)]();},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x41a)]=Scene_Item['prototype']['helpWindowRect'],Scene_Item[_0x23d1fb(0x241)][_0x23d1fb(0x20b)]=function(){const _0x1c4818=_0x23d1fb;return this[_0x1c4818(0x23a)]()?this['helpWindowRectItemsEquipsCore']():VisuMZ[_0x1c4818(0x248)][_0x1c4818(0x41a)][_0x1c4818(0x44b)](this);},Scene_Item['prototype'][_0x23d1fb(0x4a2)]=function(){const _0x559913=_0x23d1fb,_0x4fda19=0x0,_0x169db7=this['helpAreaTop'](),_0x3c0820=Graphics[_0x559913(0x352)],_0x5473fd=this[_0x559913(0x231)]();return new Rectangle(_0x4fda19,_0x169db7,_0x3c0820,_0x5473fd);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x39d)]=Scene_Item['prototype'][_0x23d1fb(0x3a7)],Scene_Item[_0x23d1fb(0x241)][_0x23d1fb(0x3a7)]=function(){const _0x79a218=_0x23d1fb;VisuMZ['ItemsEquipsCore'][_0x79a218(0x39d)][_0x79a218(0x44b)](this),this['isUseModernControls']()&&this[_0x79a218(0x3ab)]();},Scene_Item['prototype'][_0x23d1fb(0x3ab)]=function(){const _0x443942=_0x23d1fb;delete this[_0x443942(0x48d)][_0x443942(0x2c1)]['ok'],delete this[_0x443942(0x48d)][_0x443942(0x2c1)]['cancel'];},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x349)]=Scene_Item[_0x23d1fb(0x241)][_0x23d1fb(0x21e)],Scene_Item['prototype']['categoryWindowRect']=function(){const _0x24ee13=_0x23d1fb;return this[_0x24ee13(0x23a)]()?this[_0x24ee13(0x28c)]():VisuMZ['ItemsEquipsCore'][_0x24ee13(0x349)]['call'](this);},Scene_Item[_0x23d1fb(0x241)][_0x23d1fb(0x28c)]=function(){const _0x2de6db=_0x23d1fb,_0x57f3d1=0x0,_0x20c2ac=this[_0x2de6db(0x195)](),_0x1d7fdc=Graphics[_0x2de6db(0x352)],_0x285271=this[_0x2de6db(0x4e6)](0x1,!![]);return new Rectangle(_0x57f3d1,_0x20c2ac,_0x1d7fdc,_0x285271);},VisuMZ[_0x23d1fb(0x248)]['Scene_Item_createItemWindow']=Scene_Item['prototype'][_0x23d1fb(0x1f6)],Scene_Item['prototype'][_0x23d1fb(0x1f6)]=function(){const _0x3463f8=_0x23d1fb;VisuMZ[_0x3463f8(0x248)][_0x3463f8(0x1cf)]['call'](this),this[_0x3463f8(0x3bd)]()&&this[_0x3463f8(0x283)](),this[_0x3463f8(0x1fd)]()&&this[_0x3463f8(0x47f)]();},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x2be)]=Scene_Item[_0x23d1fb(0x241)][_0x23d1fb(0x424)],Scene_Item[_0x23d1fb(0x241)]['itemWindowRect']=function(){const _0x1619cf=_0x23d1fb;if(this[_0x1619cf(0x23a)]())return this[_0x1619cf(0x4a3)]();else{const _0x280229=VisuMZ['ItemsEquipsCore'][_0x1619cf(0x2be)][_0x1619cf(0x44b)](this);return this[_0x1619cf(0x1fd)]()&&this[_0x1619cf(0x36a)]()&&(_0x280229[_0x1619cf(0x3f4)]-=this[_0x1619cf(0x35e)]()),_0x280229;}},Scene_Item[_0x23d1fb(0x241)][_0x23d1fb(0x4a3)]=function(){const _0x5c329b=_0x23d1fb,_0x43f723=this[_0x5c329b(0x330)]()?this['statusWidth']():0x0,_0x4170db=this[_0x5c329b(0x48d)]['y']+this[_0x5c329b(0x48d)][_0x5c329b(0x1f9)],_0x33e0a7=Graphics[_0x5c329b(0x352)]-this['statusWidth'](),_0x54df7f=this['mainAreaBottom']()-_0x4170db;return new Rectangle(_0x43f723,_0x4170db,_0x33e0a7,_0x54df7f);},Scene_Item[_0x23d1fb(0x241)][_0x23d1fb(0x283)]=function(){const _0x12d7a5=_0x23d1fb;this[_0x12d7a5(0x468)]['setHandler']('cancel',this[_0x12d7a5(0x1b9)][_0x12d7a5(0x36d)](this));},Scene_Item[_0x23d1fb(0x241)][_0x23d1fb(0x1fd)]=function(){const _0x3e81c3=_0x23d1fb;return this[_0x3e81c3(0x23a)]()?!![]:VisuMZ[_0x3e81c3(0x248)][_0x3e81c3(0x357)][_0x3e81c3(0x3fe)]['ShowShopStatus'];},Scene_Item[_0x23d1fb(0x241)][_0x23d1fb(0x36a)]=function(){const _0x89dd42=_0x23d1fb;return VisuMZ[_0x89dd42(0x248)][_0x89dd42(0x357)][_0x89dd42(0x3fe)]['ItemSceneAdjustItemList'];},Scene_Item[_0x23d1fb(0x241)][_0x23d1fb(0x47f)]=function(){const _0x792937=_0x23d1fb,_0x3d8721=this[_0x792937(0x336)]();this['_statusWindow']=new Window_ShopStatus(_0x3d8721),this['addWindow'](this[_0x792937(0x24d)]),this[_0x792937(0x468)][_0x792937(0x52c)](this[_0x792937(0x24d)]);const _0x4dfd2e=VisuMZ['ItemsEquipsCore'][_0x792937(0x357)][_0x792937(0x3fe)][_0x792937(0x3c1)];this[_0x792937(0x24d)][_0x792937(0x4c5)](_0x4dfd2e||0x0);},Scene_Item[_0x23d1fb(0x241)][_0x23d1fb(0x336)]=function(){const _0x5145a0=_0x23d1fb;return this[_0x5145a0(0x23a)]()?this[_0x5145a0(0x1c4)]():VisuMZ[_0x5145a0(0x248)]['Settings']['ItemScene'][_0x5145a0(0x469)][_0x5145a0(0x44b)](this);},Scene_Item[_0x23d1fb(0x241)][_0x23d1fb(0x1c4)]=function(){const _0x36c55b=_0x23d1fb,_0xb1cf3e=this[_0x36c55b(0x35e)](),_0x56ac90=this[_0x36c55b(0x468)][_0x36c55b(0x1f9)],_0x14dc17=this[_0x36c55b(0x330)]()?0x0:Graphics['boxWidth']-this[_0x36c55b(0x35e)](),_0x2cd88c=this[_0x36c55b(0x468)]['y'];return new Rectangle(_0x14dc17,_0x2cd88c,_0xb1cf3e,_0x56ac90);},Scene_Item[_0x23d1fb(0x241)][_0x23d1fb(0x35e)]=function(){const _0x4ffcd9=_0x23d1fb;return Scene_Shop[_0x4ffcd9(0x241)]['statusWidth']();},Scene_Item[_0x23d1fb(0x241)][_0x23d1fb(0x229)]=function(){const _0x1da667=_0x23d1fb;if(!this['updatedLayoutStyle']())return![];if(!this[_0x1da667(0x3bd)]())return![];if(!this['_itemWindow'])return![];if(!this[_0x1da667(0x468)][_0x1da667(0x235)])return![];return this[_0x1da667(0x238)]()&&this[_0x1da667(0x3bd)]();},Scene_Item[_0x23d1fb(0x241)][_0x23d1fb(0x44c)]=function(){const _0x3be26a=_0x23d1fb;if(this['buttonAssistItemListRequirement']())return this[_0x3be26a(0x468)][_0x3be26a(0x264)]()===0x1?TextManager['getInputMultiButtonStrings']('left',_0x3be26a(0x3cb)):TextManager['getInputMultiButtonStrings'](_0x3be26a(0x529),'pagedown');return Scene_ItemBase[_0x3be26a(0x241)][_0x3be26a(0x44c)][_0x3be26a(0x44b)](this);},Scene_Item[_0x23d1fb(0x241)][_0x23d1fb(0x4df)]=function(){const _0x35065b=_0x23d1fb;if(this['buttonAssistItemListRequirement']())return VisuMZ[_0x35065b(0x248)][_0x35065b(0x357)][_0x35065b(0x3fe)][_0x35065b(0x22b)];return Scene_ItemBase[_0x35065b(0x241)][_0x35065b(0x4df)][_0x35065b(0x44b)](this);},Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x456)]=function(){const _0xd7514c=_0x23d1fb;if(ConfigManager[_0xd7514c(0x48c)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0xd7514c(0x505)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this['updatedLayoutStyle']()[_0xd7514c(0x2fc)](/LOWER/i);else Scene_MenuBase[_0xd7514c(0x241)]['isRightInputMode'][_0xd7514c(0x44b)](this);}},Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x330)]=function(){const _0x140dd1=_0x23d1fb;if(ConfigManager[_0x140dd1(0x48c)]&&ConfigManager[_0x140dd1(0x27e)]!==undefined)return ConfigManager[_0x140dd1(0x27e)];else{if(this[_0x140dd1(0x23a)]())return this[_0x140dd1(0x238)]()[_0x140dd1(0x2fc)](/RIGHT/i);else Scene_MenuBase[_0x140dd1(0x241)]['isRightInputMode'][_0x140dd1(0x44b)](this);}},Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x238)]=function(){const _0x1e9d83=_0x23d1fb;return VisuMZ[_0x1e9d83(0x248)]['Settings'][_0x1e9d83(0x3af)][_0x1e9d83(0x4c1)];},Scene_Equip['prototype']['isUseModernControls']=function(){const _0x2beca8=_0x23d1fb;return this[_0x2beca8(0x3f1)]&&this[_0x2beca8(0x3f1)][_0x2beca8(0x3bd)]();},Scene_Equip['prototype'][_0x23d1fb(0x23a)]=function(){const _0x329644=_0x23d1fb;return VisuMZ['ItemsEquipsCore']['Settings'][_0x329644(0x3af)][_0x329644(0x1de)];},VisuMZ['ItemsEquipsCore'][_0x23d1fb(0x37b)]=Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x4d7)],Scene_Equip[_0x23d1fb(0x241)]['create']=function(){const _0x484f09=_0x23d1fb;VisuMZ[_0x484f09(0x248)][_0x484f09(0x37b)]['call'](this),this[_0x484f09(0x3bd)]()&&this[_0x484f09(0x337)]();},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x46d)]=Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x20b)],Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x20b)]=function(){const _0x5ef6fa=_0x23d1fb;return this[_0x5ef6fa(0x23a)]()?this[_0x5ef6fa(0x4a2)]():VisuMZ[_0x5ef6fa(0x248)][_0x5ef6fa(0x46d)][_0x5ef6fa(0x44b)](this);},Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x4a2)]=function(){const _0x3bcb0f=_0x23d1fb,_0x5318ae=0x0,_0x96ac0f=this['helpAreaTop'](),_0x158c3a=Graphics[_0x3bcb0f(0x352)],_0x4be343=this[_0x3bcb0f(0x231)]();return new Rectangle(_0x5318ae,_0x96ac0f,_0x158c3a,_0x4be343);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x3f7)]=Scene_Equip['prototype'][_0x23d1fb(0x336)],Scene_Equip['prototype'][_0x23d1fb(0x336)]=function(){const _0x1b7364=_0x23d1fb;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['statusWindowRectItemsEquipsCore']():VisuMZ['ItemsEquipsCore'][_0x1b7364(0x3f7)]['call'](this);},Scene_Equip['prototype'][_0x23d1fb(0x1c4)]=function(){const _0x50b4b1=_0x23d1fb,_0x1834c8=this[_0x50b4b1(0x330)]()?0x0:Graphics[_0x50b4b1(0x352)]-this[_0x50b4b1(0x35e)](),_0x419720=this[_0x50b4b1(0x195)](),_0x622e64=this[_0x50b4b1(0x35e)](),_0x1533f9=this['mainAreaHeight']();return new Rectangle(_0x1834c8,_0x419720,_0x622e64,_0x1533f9);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x399)]=Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x4f0)],Scene_Equip['prototype']['createCommandWindow']=function(){const _0x4b9014=_0x23d1fb;VisuMZ[_0x4b9014(0x248)][_0x4b9014(0x399)][_0x4b9014(0x44b)](this);if(this[_0x4b9014(0x22c)])this['_commandWindow'][_0x4b9014(0x52e)](this[_0x4b9014(0x22c)]);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x2d7)]=Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x25c)],Scene_Equip[_0x23d1fb(0x241)]['commandWindowRect']=function(){const _0x15b74b=_0x23d1fb;return this[_0x15b74b(0x23a)]()?this[_0x15b74b(0x43c)]():VisuMZ['ItemsEquipsCore'][_0x15b74b(0x2d7)][_0x15b74b(0x44b)](this);},Scene_Equip['prototype']['shouldCommandWindowExist']=function(){const _0x19a706=_0x23d1fb,_0x278b30=VisuMZ[_0x19a706(0x248)][_0x19a706(0x357)][_0x19a706(0x3af)];return _0x278b30[_0x19a706(0x3df)]||_0x278b30['CommandAddClear'];},Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x43c)]=function(){const _0x148188=_0x23d1fb,_0x444bbf=this[_0x148188(0x38d)](),_0x2ac3b3=this[_0x148188(0x330)]()?this[_0x148188(0x35e)]():0x0,_0x6fed3=this['mainAreaTop'](),_0x4bfefd=Graphics[_0x148188(0x352)]-this[_0x148188(0x35e)](),_0x1b3562=_0x444bbf?this[_0x148188(0x4e6)](0x1,!![]):0x0;return new Rectangle(_0x2ac3b3,_0x6fed3,_0x4bfefd,_0x1b3562);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x1e7)]=Scene_Equip['prototype']['createSlotWindow'],Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x225)]=function(){const _0x486fd0=_0x23d1fb;VisuMZ[_0x486fd0(0x248)][_0x486fd0(0x1e7)]['call'](this),this['isUseModernControls']()&&this['postCreateSlotWindowItemsEquipsCore']();},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x4d2)]=Scene_Equip['prototype'][_0x23d1fb(0x2a6)],Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x2a6)]=function(){const _0x2224f3=_0x23d1fb;return this[_0x2224f3(0x23a)]()?this['slotWindowRectItemsEquipsCore']():VisuMZ['ItemsEquipsCore'][_0x2224f3(0x4d2)][_0x2224f3(0x44b)](this);},Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x3e7)]=function(){const _0x8ed704=_0x23d1fb,_0x2f11c4=this[_0x8ed704(0x25c)](),_0xbcecf3=this[_0x8ed704(0x330)]()?this[_0x8ed704(0x35e)]():0x0,_0xaddf08=_0x2f11c4['y']+_0x2f11c4['height'],_0x5ca8ce=Graphics[_0x8ed704(0x352)]-this[_0x8ed704(0x35e)](),_0x4ad73f=this[_0x8ed704(0x295)]()-_0x2f11c4[_0x8ed704(0x1f9)];return new Rectangle(_0xbcecf3,_0xaddf08,_0x5ca8ce,_0x4ad73f);},VisuMZ[_0x23d1fb(0x248)]['Scene_Equip_itemWindowRect']=Scene_Equip['prototype']['itemWindowRect'],Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x424)]=function(){const _0xdc82bb=_0x23d1fb;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0xdc82bb(0x2a6)]():VisuMZ[_0xdc82bb(0x248)][_0xdc82bb(0x487)]['call'](this);},Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x35e)]=function(){const _0xe4bf13=_0x23d1fb;return this[_0xe4bf13(0x23a)]()?this[_0xe4bf13(0x1ed)]():VisuMZ[_0xe4bf13(0x248)][_0xe4bf13(0x357)][_0xe4bf13(0x3af)][_0xe4bf13(0x430)];},Scene_Equip['prototype'][_0x23d1fb(0x1ed)]=function(){const _0x18c28c=_0x23d1fb;return Math[_0x18c28c(0x312)](Graphics[_0x18c28c(0x352)]/0x2);},Scene_Equip['prototype']['postCreateSlotWindowItemsEquipsCore']=function(){const _0x13e5c5=_0x23d1fb;this[_0x13e5c5(0x4c4)][_0x13e5c5(0x446)](_0x13e5c5(0x2ff),this['popScene'][_0x13e5c5(0x36d)](this)),this['_slotWindow']['setHandler']('pagedown',this['nextActor'][_0x13e5c5(0x36d)](this)),this['_slotWindow'][_0x13e5c5(0x446)](_0x13e5c5(0x529),this[_0x13e5c5(0x36b)][_0x13e5c5(0x36d)](this));},VisuMZ['ItemsEquipsCore'][_0x23d1fb(0x2ca)]=Scene_Equip['prototype'][_0x23d1fb(0x337)],Scene_Equip[_0x23d1fb(0x241)]['commandEquip']=function(){const _0x42c157=_0x23d1fb;this[_0x42c157(0x3bd)]()&&(this[_0x42c157(0x3f1)]['deselect'](),this['_commandWindow'][_0x42c157(0x44f)]()),VisuMZ['ItemsEquipsCore'][_0x42c157(0x2ca)][_0x42c157(0x44b)](this);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x4bd)]=Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x38c)],Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x38c)]=function(){const _0xa6a49f=_0x23d1fb;this['_slotWindow'][_0xa6a49f(0x276)]()>=0x0?(VisuMZ[_0xa6a49f(0x248)]['Scene_Equip_onSlotOk'][_0xa6a49f(0x44b)](this),this['onSlotOkAutoSelect']()):(this[_0xa6a49f(0x4c4)]['smoothSelect'](0x0),this[_0xa6a49f(0x4c4)]['activate']());},Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x411)]=function(){const _0x5ca1db=_0x23d1fb;this[_0x5ca1db(0x468)][_0x5ca1db(0x3c3)]();const _0x57deb0=this[_0x5ca1db(0x4c4)]['item'](),_0x5e74cb=this[_0x5ca1db(0x468)][_0x5ca1db(0x4ef)]['indexOf'](_0x57deb0),_0x468bea=Math[_0x5ca1db(0x312)](this[_0x5ca1db(0x468)][_0x5ca1db(0x3c0)]()/0x2)-0x1;this[_0x5ca1db(0x468)][_0x5ca1db(0x3ea)](_0x5e74cb>=0x0?_0x5e74cb:0x0),this[_0x5ca1db(0x468)][_0x5ca1db(0x1aa)]>0x1&&(this[_0x5ca1db(0x468)][_0x5ca1db(0x1aa)]=0x1,this['_itemWindow'][_0x5ca1db(0x50e)]()),this[_0x5ca1db(0x468)][_0x5ca1db(0x23e)](this['_itemWindow'][_0x5ca1db(0x276)]()-_0x468bea);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x259)]=Scene_Equip[_0x23d1fb(0x241)]['onSlotCancel'],Scene_Equip['prototype']['onSlotCancel']=function(){const _0x414165=_0x23d1fb;VisuMZ[_0x414165(0x248)][_0x414165(0x259)][_0x414165(0x44b)](this),this['isUseModernControls']()&&(this['_commandWindow'][_0x414165(0x3ea)](0x0),this[_0x414165(0x4c4)][_0x414165(0x44f)]());},VisuMZ['ItemsEquipsCore']['Scene_Equip_onActorChange']=Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x459)],Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x459)]=function(){const _0x5d72d6=_0x23d1fb;VisuMZ[_0x5d72d6(0x248)][_0x5d72d6(0x2ae)][_0x5d72d6(0x44b)](this),this[_0x5d72d6(0x3bd)]()&&(this[_0x5d72d6(0x3f1)][_0x5d72d6(0x44f)](),this[_0x5d72d6(0x3f1)][_0x5d72d6(0x4e5)](),this[_0x5d72d6(0x4c4)][_0x5d72d6(0x3ea)](0x0),this[_0x5d72d6(0x4c4)][_0x5d72d6(0x408)]());},Scene_Equip['prototype'][_0x23d1fb(0x4fa)]=function(){const _0x2b7496=_0x23d1fb;if(!this['_slotWindow'])return![];if(!this[_0x2b7496(0x4c4)][_0x2b7496(0x235)])return![];return this['_slotWindow'][_0x2b7496(0x186)]();},Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x19c)]=function(){const _0x3dfcb2=_0x23d1fb;if(this['buttonAssistSlotWindowShift']())return TextManager[_0x3dfcb2(0x1ba)](_0x3dfcb2(0x329));return Scene_MenuBase['prototype'][_0x3dfcb2(0x19c)]['call'](this);},Scene_Equip['prototype'][_0x23d1fb(0x4cb)]=function(){const _0x552ee5=_0x23d1fb;if(this[_0x552ee5(0x4fa)]())return VisuMZ[_0x552ee5(0x248)][_0x552ee5(0x357)][_0x552ee5(0x3af)]['buttonAssistRemove'];return Scene_MenuBase[_0x552ee5(0x241)][_0x552ee5(0x4cb)][_0x552ee5(0x44b)](this);},Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x3fd)]=function(){const _0x1b994c=_0x23d1fb;if(this['buttonAssistSlotWindowShift']())return this['_buttonAssistWindow'][_0x1b994c(0x3f4)]/0x5/-0x3;return Scene_MenuBase[_0x1b994c(0x241)][_0x1b994c(0x3fd)]['call'](this);},Scene_Equip[_0x23d1fb(0x241)][_0x23d1fb(0x1b9)]=function(){const _0xfdcecc=_0x23d1fb;SceneManager[_0xfdcecc(0x261)]();},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x34c)]=Scene_Load[_0x23d1fb(0x241)][_0x23d1fb(0x516)],Scene_Load[_0x23d1fb(0x241)][_0x23d1fb(0x516)]=function(){const _0x17be58=_0x23d1fb;VisuMZ[_0x17be58(0x248)][_0x17be58(0x34c)][_0x17be58(0x44b)](this),this[_0x17be58(0x4de)]();},Scene_Load[_0x23d1fb(0x241)]['refreshActorEquipSlotsIfUpdated']=function(){const _0x3c7e5e=_0x23d1fb;if($gameSystem['versionId']()!==$dataSystem['versionId'])for(const _0xf4d499 of $gameActors[_0x3c7e5e(0x4ef)]){if(_0xf4d499)_0xf4d499['prepareNewEquipSlotsOnLoad']();}},Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x456)]=function(){const _0x1517ff=_0x23d1fb;if(ConfigManager[_0x1517ff(0x48c)]&&ConfigManager[_0x1517ff(0x505)]!==undefined)return ConfigManager[_0x1517ff(0x505)];else{if(this[_0x1517ff(0x23a)]())return this[_0x1517ff(0x238)]()['match'](/LOWER/i);else Scene_MenuBase[_0x1517ff(0x241)][_0x1517ff(0x330)]['call'](this);}},Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x330)]=function(){const _0x1e1020=_0x23d1fb;if(ConfigManager[_0x1e1020(0x48c)]&&ConfigManager[_0x1e1020(0x27e)]!==undefined)return ConfigManager['uiInputPosition'];else{if(this[_0x1e1020(0x23a)]())return this[_0x1e1020(0x238)]()[_0x1e1020(0x2fc)](/RIGHT/i);else Scene_MenuBase[_0x1e1020(0x241)][_0x1e1020(0x330)]['call'](this);}},Scene_Shop['prototype']['updatedLayoutStyle']=function(){const _0x173ce7=_0x23d1fb;return VisuMZ[_0x173ce7(0x248)][_0x173ce7(0x357)]['ShopScene'][_0x173ce7(0x4c1)];},Scene_Shop['prototype'][_0x23d1fb(0x3bd)]=function(){const _0x5f0739=_0x23d1fb;return this[_0x5f0739(0x48d)]&&this[_0x5f0739(0x48d)]['isUseModernControls']();},Scene_Shop['prototype']['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x7dcefa=_0x23d1fb;return VisuMZ[_0x7dcefa(0x248)]['Settings']['ShopScene'][_0x7dcefa(0x1de)];},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x1b0)]=Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x240)],Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x240)]=function(_0x410d78,_0x2e443c){const _0x47ddc1=_0x23d1fb;_0x410d78=JsonEx['makeDeepCopy'](_0x410d78),VisuMZ['ItemsEquipsCore'][_0x47ddc1(0x1b0)]['call'](this,_0x410d78,_0x2e443c),this[_0x47ddc1(0x461)]();},Scene_Shop[_0x23d1fb(0x241)]['adjustHiddenShownGoods']=function(){const _0x26296e=_0x23d1fb;this[_0x26296e(0x21c)]=0x0;const _0x3f1685=[];for(const _0xf82261 of this[_0x26296e(0x356)]){this[_0x26296e(0x4a1)](_0xf82261)?this['_goodsCount']++:_0x3f1685[_0x26296e(0x1dd)](_0xf82261);}for(const _0x3a6a9b of _0x3f1685){this[_0x26296e(0x356)][_0x26296e(0x4ed)](_0x3a6a9b);}},Scene_Shop['prototype'][_0x23d1fb(0x4a1)]=function(_0x28fc31){const _0x3968a7=_0x23d1fb;if(_0x28fc31[0x0]>0x2||_0x28fc31[0x0]<0x0)return![];const _0x2268bb=[$dataItems,$dataWeapons,$dataArmors][_0x28fc31[0x0]][_0x28fc31[0x1]];if(!_0x2268bb)return![];const _0x1ee6ee=_0x2268bb[_0x3968a7(0x4fe)]||'';if(_0x1ee6ee[_0x3968a7(0x2fc)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3a6e47=JSON[_0x3968a7(0x257)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x11c61d of _0x3a6e47){if(!$gameSwitches[_0x3968a7(0x3f6)](_0x11c61d))return![];}return!![];}if(_0x1ee6ee[_0x3968a7(0x2fc)](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x6d5617=JSON[_0x3968a7(0x257)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x463c69 of _0x6d5617){if(!$gameSwitches['value'](_0x463c69))return![];}return!![];}if(_0x1ee6ee[_0x3968a7(0x2fc)](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1cd2d6=JSON[_0x3968a7(0x257)]('['+RegExp['$1'][_0x3968a7(0x2fc)](/\d+/g)+']');for(const _0x4538b0 of _0x1cd2d6){if($gameSwitches[_0x3968a7(0x3f6)](_0x4538b0))return!![];}return![];}if(_0x1ee6ee[_0x3968a7(0x2fc)](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4f6c5e=JSON[_0x3968a7(0x257)]('['+RegExp['$1'][_0x3968a7(0x2fc)](/\d+/g)+']');for(const _0x5da6c2 of _0x4f6c5e){if(!$gameSwitches['value'](_0x5da6c2))return!![];}return![];}if(_0x1ee6ee['match'](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x38ff17=JSON[_0x3968a7(0x257)]('['+RegExp['$1'][_0x3968a7(0x2fc)](/\d+/g)+']');for(const _0xf843f9 of _0x38ff17){if(!$gameSwitches[_0x3968a7(0x3f6)](_0xf843f9))return!![];}return![];}if(_0x1ee6ee[_0x3968a7(0x2fc)](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x197d88=JSON[_0x3968a7(0x257)]('['+RegExp['$1'][_0x3968a7(0x2fc)](/\d+/g)+']');for(const _0x4c36a5 of _0x197d88){if($gameSwitches[_0x3968a7(0x3f6)](_0x4c36a5))return![];}return!![];}return!![];},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x367)]=Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x4d7)],Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x4d7)]=function(){const _0x5cf246=_0x23d1fb;VisuMZ[_0x5cf246(0x248)][_0x5cf246(0x367)][_0x5cf246(0x44b)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x5cf246(0x437)](),this[_0x5cf246(0x30e)]();},Scene_Shop[_0x23d1fb(0x241)]['postCreateItemsEquipsCore']=function(){const _0x2dc4d9=_0x23d1fb;this['_dummyWindow'][_0x2dc4d9(0x4d4)](),this[_0x2dc4d9(0x2d2)][_0x2dc4d9(0x19f)](),this[_0x2dc4d9(0x2d2)][_0x2dc4d9(0x4e5)](),this[_0x2dc4d9(0x24d)]['show']();},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x1f3)]=Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x20b)],Scene_Shop['prototype'][_0x23d1fb(0x20b)]=function(){const _0x24d567=_0x23d1fb;return this[_0x24d567(0x23a)]()?this['helpWindowRectItemsEquipsCore']():VisuMZ[_0x24d567(0x248)]['Scene_Shop_helpWindowRect']['call'](this);},Scene_Shop[_0x23d1fb(0x241)]['helpWindowRectItemsEquipsCore']=function(){const _0x418009=_0x23d1fb,_0x34a8bf=0x0,_0x17f2a2=this[_0x418009(0x47e)](),_0xc555cd=Graphics[_0x418009(0x352)],_0x1d10eb=this[_0x418009(0x231)]();return new Rectangle(_0x34a8bf,_0x17f2a2,_0xc555cd,_0x1d10eb);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x3f0)]=Scene_Shop[_0x23d1fb(0x241)]['goldWindowRect'],Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x3d0)]=function(){const _0x12cbb2=_0x23d1fb;return this[_0x12cbb2(0x23a)]()?this[_0x12cbb2(0x25b)]():VisuMZ['ItemsEquipsCore']['Scene_Shop_goldWindowRect'][_0x12cbb2(0x44b)](this);},Scene_Shop['prototype']['goldWindowRectItemsEquipsCore']=function(){const _0x1bd40e=_0x23d1fb,_0x40e57e=this[_0x1bd40e(0x506)](),_0x2f957b=this['calcWindowHeight'](0x1,!![]),_0x1b0148=this[_0x1bd40e(0x330)]()?0x0:Graphics[_0x1bd40e(0x352)]-_0x40e57e,_0x2add71=this[_0x1bd40e(0x195)]();return new Rectangle(_0x1b0148,_0x2add71,_0x40e57e,_0x2f957b);},VisuMZ['ItemsEquipsCore'][_0x23d1fb(0x1e0)]=Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x25c)],Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x25c)]=function(){const _0x33be6e=_0x23d1fb;return this[_0x33be6e(0x23a)]()?this['commandWindowRectItemsEquipsCore']():VisuMZ[_0x33be6e(0x248)][_0x33be6e(0x1e0)]['call'](this);},Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x43c)]=function(){const _0x30fe34=_0x23d1fb,_0x20ebb8=this[_0x30fe34(0x330)]()?this[_0x30fe34(0x506)]():0x0,_0x378f93=this[_0x30fe34(0x195)](),_0xaf4d3e=Graphics['boxWidth']-this[_0x30fe34(0x506)](),_0x3c98c7=this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0x20ebb8,_0x378f93,_0xaf4d3e,_0x3c98c7);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x263)]=Scene_Shop['prototype'][_0x23d1fb(0x20d)],Scene_Shop['prototype']['numberWindowRect']=function(){const _0x10d023=_0x23d1fb;return this[_0x10d023(0x23a)]()?this[_0x10d023(0x209)]():VisuMZ[_0x10d023(0x248)][_0x10d023(0x263)][_0x10d023(0x44b)](this);},Scene_Shop[_0x23d1fb(0x241)]['numberWindowRectItemsEquipsCore']=function(){const _0x5236ce=_0x23d1fb,_0x462e31=this[_0x5236ce(0x3f1)]['y']+this[_0x5236ce(0x3f1)][_0x5236ce(0x1f9)],_0x51f2e9=Graphics[_0x5236ce(0x352)]-this[_0x5236ce(0x35e)](),_0x4f3810=this[_0x5236ce(0x330)]()?Graphics[_0x5236ce(0x352)]-_0x51f2e9:0x0,_0x1cebcb=this['mainAreaHeight']()-this[_0x5236ce(0x3f1)][_0x5236ce(0x1f9)];return new Rectangle(_0x4f3810,_0x462e31,_0x51f2e9,_0x1cebcb);},VisuMZ[_0x23d1fb(0x248)]['Scene_Shop_statusWindowRect']=Scene_Shop['prototype']['statusWindowRect'],Scene_Shop[_0x23d1fb(0x241)]['statusWindowRect']=function(){const _0x492c92=_0x23d1fb;return this[_0x492c92(0x23a)]()?this[_0x492c92(0x1c4)]():VisuMZ[_0x492c92(0x248)]['Scene_Shop_statusWindowRect']['call'](this);},Scene_Shop[_0x23d1fb(0x241)]['statusWindowRectItemsEquipsCore']=function(){const _0x10c039=_0x23d1fb,_0x194e82=this['statusWidth'](),_0x2f8514=this[_0x10c039(0x295)]()-this[_0x10c039(0x3f1)][_0x10c039(0x1f9)],_0x27822b=this[_0x10c039(0x330)]()?0x0:Graphics['boxWidth']-_0x194e82,_0x57f04f=this['_commandWindow']['y']+this[_0x10c039(0x3f1)][_0x10c039(0x1f9)];return new Rectangle(_0x27822b,_0x57f04f,_0x194e82,_0x2f8514);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x1cb)]=Scene_Shop['prototype'][_0x23d1fb(0x2a2)],Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x2a2)]=function(){const _0x5583b3=_0x23d1fb;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x5583b3(0x1df)]():VisuMZ[_0x5583b3(0x248)][_0x5583b3(0x1cb)]['call'](this);},Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x1df)]=function(){const _0x2678e0=_0x23d1fb,_0x1cd970=this[_0x2678e0(0x3f1)]['y']+this['_commandWindow'][_0x2678e0(0x1f9)],_0x11659b=Graphics[_0x2678e0(0x352)]-this['statusWidth'](),_0x2e37aa=this[_0x2678e0(0x295)]()-this[_0x2678e0(0x3f1)][_0x2678e0(0x1f9)],_0x36f2f1=this[_0x2678e0(0x330)]()?Graphics['boxWidth']-_0x11659b:0x0;return new Rectangle(_0x36f2f1,_0x1cd970,_0x11659b,_0x2e37aa);},VisuMZ[_0x23d1fb(0x248)]['Scene_Shop_createCategoryWindow']=Scene_Shop[_0x23d1fb(0x241)]['createCategoryWindow'],Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x3a7)]=function(){const _0xe8f42=_0x23d1fb;VisuMZ[_0xe8f42(0x248)]['Scene_Shop_createCategoryWindow']['call'](this),this['isUseModernControls']()&&this[_0xe8f42(0x3ab)]();},VisuMZ['ItemsEquipsCore'][_0x23d1fb(0x269)]=Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x21e)],Scene_Shop[_0x23d1fb(0x241)]['categoryWindowRect']=function(){const _0x223953=_0x23d1fb;return this[_0x223953(0x23a)]()?this[_0x223953(0x28c)]():VisuMZ[_0x223953(0x248)]['Scene_Shop_categoryWindowRect']['call'](this);},Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x28c)]=function(){const _0x107f2d=_0x23d1fb,_0x1860f6=this[_0x107f2d(0x3f1)]['y'],_0x4f2b5d=this['_commandWindow']['width'],_0x14159d=this[_0x107f2d(0x4e6)](0x1,!![]),_0x51e98b=this[_0x107f2d(0x330)]()?Graphics[_0x107f2d(0x352)]-_0x4f2b5d:0x0;return new Rectangle(_0x51e98b,_0x1860f6,_0x4f2b5d,_0x14159d);},Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x3ab)]=function(){const _0x58b6ce=_0x23d1fb;delete this[_0x58b6ce(0x48d)][_0x58b6ce(0x2c1)]['ok'],delete this['_categoryWindow'][_0x58b6ce(0x2c1)][_0x58b6ce(0x2ff)];},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x326)]=Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x32e)],Scene_Shop['prototype'][_0x23d1fb(0x32e)]=function(){const _0x4df1aa=_0x23d1fb;VisuMZ['ItemsEquipsCore'][_0x4df1aa(0x326)][_0x4df1aa(0x44b)](this),this[_0x4df1aa(0x23a)]()&&this[_0x4df1aa(0x22d)]();},VisuMZ['ItemsEquipsCore'][_0x23d1fb(0x201)]=Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x40f)],Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x40f)]=function(){const _0x2f6bf5=_0x23d1fb;return this[_0x2f6bf5(0x23a)]()?this[_0x2f6bf5(0x2d4)]():VisuMZ[_0x2f6bf5(0x248)][_0x2f6bf5(0x201)]['call'](this);},Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x2d4)]=function(){const _0x3412cd=_0x23d1fb,_0x2e9cec=this['_categoryWindow']['y']+this[_0x3412cd(0x48d)][_0x3412cd(0x1f9)],_0x782d46=Graphics[_0x3412cd(0x352)]-this[_0x3412cd(0x35e)](),_0x1f4342=this[_0x3412cd(0x295)]()-this['_categoryWindow'][_0x3412cd(0x1f9)],_0x2a6848=this[_0x3412cd(0x330)]()?Graphics[_0x3412cd(0x352)]-_0x782d46:0x0;return new Rectangle(_0x2a6848,_0x2e9cec,_0x782d46,_0x1f4342);},Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x22d)]=function(){const _0x4a2fad=_0x23d1fb;this[_0x4a2fad(0x21d)][_0x4a2fad(0x52c)](this[_0x4a2fad(0x24d)]);},Scene_Shop[_0x23d1fb(0x241)]['statusWidth']=function(){const _0x431d52=_0x23d1fb;return VisuMZ[_0x431d52(0x248)][_0x431d52(0x357)][_0x431d52(0x4c6)][_0x431d52(0x427)];},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x4e7)]=Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x3ff)],Scene_Shop['prototype'][_0x23d1fb(0x3ff)]=function(){const _0x10e9c2=_0x23d1fb;VisuMZ[_0x10e9c2(0x248)]['Scene_Shop_activateSellWindow'][_0x10e9c2(0x44b)](this),this[_0x10e9c2(0x23a)]()&&this['_statusWindow'][_0x10e9c2(0x19f)](),this['_sellWindow'][_0x10e9c2(0x4f1)]();},VisuMZ['ItemsEquipsCore']['Scene_Shop_commandBuy']=Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x35f)],Scene_Shop['prototype'][_0x23d1fb(0x35f)]=function(){const _0x2aa108=_0x23d1fb;VisuMZ[_0x2aa108(0x248)]['Scene_Shop_commandBuy'][_0x2aa108(0x44b)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x2aa108(0x4b8)]();},Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x4b8)]=function(){const _0x18f8f0=_0x23d1fb;this[_0x18f8f0(0x4ff)]=this[_0x18f8f0(0x4ff)]||0x0,this[_0x18f8f0(0x2d2)][_0x18f8f0(0x3ea)](this[_0x18f8f0(0x4ff)]);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x4d1)]=Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x3b8)],Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x3b8)]=function(){const _0x58f366=_0x23d1fb;VisuMZ['ItemsEquipsCore'][_0x58f366(0x4d1)][_0x58f366(0x44b)](this),this[_0x58f366(0x23a)]()&&this['commandSellItemsEquipsCore'](),this['isUseModernControls']()&&(this[_0x58f366(0x48d)][_0x58f366(0x3ea)](0x0),this[_0x58f366(0x35d)]());},Scene_Shop['prototype'][_0x23d1fb(0x3a9)]=function(){const _0x2bcbbe=_0x23d1fb;this['_buyWindow'][_0x2bcbbe(0x4d4)](),this[_0x2bcbbe(0x3f1)]['hide']();},VisuMZ['ItemsEquipsCore'][_0x23d1fb(0x18c)]=Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x335)],Scene_Shop['prototype'][_0x23d1fb(0x335)]=function(){const _0x12cb37=_0x23d1fb;VisuMZ[_0x12cb37(0x248)][_0x12cb37(0x18c)][_0x12cb37(0x44b)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x12cb37(0x1ef)]();},Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x1ef)]=function(){const _0x1d584d=_0x23d1fb;this[_0x1d584d(0x4ff)]=this[_0x1d584d(0x2d2)]['index'](),this[_0x1d584d(0x2d2)][_0x1d584d(0x19f)](),this[_0x1d584d(0x2d2)][_0x1d584d(0x4e5)](),this['_buyWindow'][_0x1d584d(0x2b5)](0x0,0x0),this[_0x1d584d(0x24d)][_0x1d584d(0x19f)](),this[_0x1d584d(0x3b4)][_0x1d584d(0x4d4)]();},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x489)]=Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x237)],Scene_Shop['prototype'][_0x23d1fb(0x237)]=function(){const _0x399230=_0x23d1fb;VisuMZ[_0x399230(0x248)][_0x399230(0x489)][_0x399230(0x44b)](this),this[_0x399230(0x23a)]()&&this['onCategoryCancelItemsEquipsCore']();},Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x1b6)]=function(){const _0x115e8c=_0x23d1fb;this['_buyWindow'][_0x115e8c(0x19f)](),this[_0x115e8c(0x3f1)][_0x115e8c(0x19f)]();},VisuMZ[_0x23d1fb(0x248)]['Scene_Shop_onBuyOk']=Scene_Shop['prototype']['onBuyOk'],Scene_Shop['prototype'][_0x23d1fb(0x328)]=function(){const _0x41c952=_0x23d1fb;$gameTemp[_0x41c952(0x184)]=!![],VisuMZ['ItemsEquipsCore'][_0x41c952(0x50a)]['call'](this),$gameTemp['_bypassProxy']=![],this['_item']=this[_0x41c952(0x2d2)][_0x41c952(0x320)]();},VisuMZ[_0x23d1fb(0x248)]['Scene_Shop_buyingPrice']=Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x334)],Scene_Shop[_0x23d1fb(0x241)]['buyingPrice']=function(){const _0xfd236f=_0x23d1fb;$gameTemp[_0xfd236f(0x184)]=!![],this['_item']=this[_0xfd236f(0x2d2)][_0xfd236f(0x320)]();const _0x3b620c=VisuMZ[_0xfd236f(0x248)][_0xfd236f(0x380)][_0xfd236f(0x44b)](this);return $gameTemp[_0xfd236f(0x184)]=![],this[_0xfd236f(0x2bc)]=this[_0xfd236f(0x2d2)][_0xfd236f(0x320)](),_0x3b620c;},VisuMZ[_0x23d1fb(0x248)]['Scene_Shop_onSellOk']=Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x445)],Scene_Shop['prototype'][_0x23d1fb(0x445)]=function(){const _0x4e7e4e=_0x23d1fb;VisuMZ['ItemsEquipsCore'][_0x4e7e4e(0x18d)][_0x4e7e4e(0x44b)](this),this[_0x4e7e4e(0x23a)]()&&this[_0x4e7e4e(0x521)]();},Scene_Shop[_0x23d1fb(0x241)]['onSellOkItemsEquipsCore']=function(){const _0x290825=_0x23d1fb;this[_0x290825(0x48d)][_0x290825(0x19f)]();},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x258)]=Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x442)],Scene_Shop['prototype'][_0x23d1fb(0x442)]=function(){const _0x4f6c2a=_0x23d1fb;VisuMZ['ItemsEquipsCore'][_0x4f6c2a(0x258)][_0x4f6c2a(0x44b)](this),this['isUseModernControls']()&&this['onCategoryCancel'](),this[_0x4f6c2a(0x23a)]()&&this[_0x4f6c2a(0x3b4)]['hide']();},Scene_Shop['prototype'][_0x23d1fb(0x2cd)]=function(_0x5d0498){const _0x59ca36=_0x23d1fb,_0x2c2a1a=this[_0x59ca36(0x2bc)];this['_item']=_0x5d0498;const _0xd2ceaf=this[_0x59ca36(0x1d5)]();return this[_0x59ca36(0x2bc)]=_0x2c2a1a,_0xd2ceaf;},VisuMZ[_0x23d1fb(0x248)]['Scene_Shop_sellingPrice']=Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x1d5)],Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x1d5)]=function(){const _0x1d5d99=_0x23d1fb;let _0x3452de=this['determineBaseSellingPrice']();const _0x47b017=this['_item'];return _0x3452de=VisuMZ[_0x1d5d99(0x248)][_0x1d5d99(0x357)][_0x1d5d99(0x3db)][_0x1d5d99(0x496)][_0x1d5d99(0x44b)](this,_0x47b017,_0x3452de),_0x3452de;},Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x26b)]=function(){const _0x2dd0a4=_0x23d1fb;let _0x95ddab=this[_0x2dd0a4(0x2bc)][_0x2dd0a4(0x403)];if(!this[_0x2dd0a4(0x2bc)])return 0x0;else{if(this[_0x2dd0a4(0x2bc)]['note'][_0x2dd0a4(0x2fc)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x26f520=String(RegExp['$1']);let _0x492d2d=this['_item'],_0x5611bd=_0x95ddab*this[_0x2dd0a4(0x346)]();try{eval(_0x26f520);}catch(_0x468290){if($gameTemp[_0x2dd0a4(0x26d)]())console['log'](_0x468290);}if(isNaN(_0x5611bd))_0x5611bd=0x0;return Math[_0x2dd0a4(0x312)](_0x5611bd);}else return this['_item'][_0x2dd0a4(0x4fe)][_0x2dd0a4(0x2fc)](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math[_0x2dd0a4(0x312)](this[_0x2dd0a4(0x426)]());}},Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x426)]=function(){const _0x4e0c3d=_0x23d1fb;return this[_0x4e0c3d(0x2bc)][_0x4e0c3d(0x403)]*this[_0x4e0c3d(0x346)]();},Scene_Shop[_0x23d1fb(0x241)]['sellPriceRate']=function(){const _0x54c3ff=_0x23d1fb;return VisuMZ[_0x54c3ff(0x248)][_0x54c3ff(0x357)][_0x54c3ff(0x3db)][_0x54c3ff(0x438)];},Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x229)]=function(){const _0x3e5b6f=_0x23d1fb;if(!this['updatedLayoutStyle']())return![];if(!this[_0x3e5b6f(0x3bd)]())return![];if(!this[_0x3e5b6f(0x21d)])return![];if(!this[_0x3e5b6f(0x21d)][_0x3e5b6f(0x235)])return![];return this['updatedLayoutStyle']()&&this['isUseModernControls']();},Scene_Shop['prototype']['buttonAssistKey1']=function(){const _0x2e86cf=_0x23d1fb;if(this['buttonAssistItemListRequirement']())return this[_0x2e86cf(0x21d)][_0x2e86cf(0x264)]()===0x1?TextManager[_0x2e86cf(0x364)](_0x2e86cf(0x4cc),'right'):TextManager['getInputMultiButtonStrings'](_0x2e86cf(0x529),_0x2e86cf(0x22f));else{if(this[_0x2e86cf(0x207)]&&this[_0x2e86cf(0x207)][_0x2e86cf(0x235)])return TextManager[_0x2e86cf(0x364)](_0x2e86cf(0x4cc),_0x2e86cf(0x3cb));}return Scene_MenuBase['prototype'][_0x2e86cf(0x44c)][_0x2e86cf(0x44b)](this);},Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x228)]=function(){const _0x183aa2=_0x23d1fb;if(this[_0x183aa2(0x207)]&&this[_0x183aa2(0x207)][_0x183aa2(0x235)])return TextManager[_0x183aa2(0x364)]('up',_0x183aa2(0x523));return Scene_MenuBase['prototype']['buttonAssistKey2']['call'](this);},Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x4df)]=function(){const _0x99551e=_0x23d1fb;if(this[_0x99551e(0x229)]())return VisuMZ['ItemsEquipsCore'][_0x99551e(0x357)][_0x99551e(0x3fe)][_0x99551e(0x22b)];else{if(this[_0x99551e(0x207)]&&this['_numberWindow']['active'])return VisuMZ[_0x99551e(0x248)][_0x99551e(0x357)][_0x99551e(0x3db)][_0x99551e(0x265)];}return Scene_MenuBase[_0x99551e(0x241)][_0x99551e(0x4df)]['call'](this);},Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x495)]=function(){const _0x13962b=_0x23d1fb;if(this['_numberWindow']&&this[_0x13962b(0x207)][_0x13962b(0x235)])return VisuMZ[_0x13962b(0x248)][_0x13962b(0x357)]['ShopScene'][_0x13962b(0x3f8)];return Scene_MenuBase[_0x13962b(0x241)]['buttonAssistText2'][_0x13962b(0x44b)](this);},Scene_Shop['prototype'][_0x23d1fb(0x30e)]=function(){const _0xbbf8d7=_0x23d1fb;if(!SceneManager[_0xbbf8d7(0x40c)]())return;const _0x1f008c=VisuMZ['ItemsEquipsCore']['Settings']['ShopScene'];_0x1f008c['SwitchBuy']&&$gameSwitches[_0xbbf8d7(0x464)](_0x1f008c[_0xbbf8d7(0x3e1)],![]),_0x1f008c[_0xbbf8d7(0x2a9)]&&$gameSwitches[_0xbbf8d7(0x464)](_0x1f008c[_0xbbf8d7(0x2a9)],![]);},VisuMZ['ItemsEquipsCore'][_0x23d1fb(0x246)]=Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x327)],Scene_Shop['prototype']['doBuy']=function(_0x8b74db){const _0x424c0b=_0x23d1fb;VisuMZ[_0x424c0b(0x248)]['Scene_Shop_doBuy'][_0x424c0b(0x44b)](this,_0x8b74db);if(_0x8b74db<=0x0)return;const _0x1f06b5=VisuMZ['ItemsEquipsCore']['Settings'][_0x424c0b(0x3db)];_0x1f06b5[_0x424c0b(0x3e1)]&&$gameSwitches[_0x424c0b(0x464)](_0x1f06b5['SwitchBuy'],!![]);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x311)]=Scene_Shop['prototype']['doSell'],Scene_Shop[_0x23d1fb(0x241)][_0x23d1fb(0x27a)]=function(_0x34faa8){const _0x5cfdba=_0x23d1fb;VisuMZ[_0x5cfdba(0x248)]['Scene_Shop_doSell'][_0x5cfdba(0x44b)](this,_0x34faa8);if(_0x34faa8<=0x0)return;const _0x4db4bd=VisuMZ['ItemsEquipsCore']['Settings'][_0x5cfdba(0x3db)];_0x4db4bd['SwitchBuy']&&$gameSwitches[_0x5cfdba(0x464)](_0x4db4bd['SwitchSell'],!![]);};function Sprite_NewLabel(){this['initialize'](...arguments);}function _0xd29d(_0x1ef783,_0x53b7bf){const _0x198d38=_0x198d();return _0xd29d=function(_0xd29d58,_0x24975d){_0xd29d58=_0xd29d58-0x181;let _0x3fdc4c=_0x198d38[_0xd29d58];return _0x3fdc4c;},_0xd29d(_0x1ef783,_0x53b7bf);}Sprite_NewLabel['prototype']=Object[_0x23d1fb(0x4d7)](Sprite[_0x23d1fb(0x241)]),Sprite_NewLabel[_0x23d1fb(0x241)][_0x23d1fb(0x1f1)]=Sprite_NewLabel,Sprite_NewLabel[_0x23d1fb(0x241)][_0x23d1fb(0x415)]=function(){const _0x4b4d39=_0x23d1fb;Sprite[_0x4b4d39(0x241)][_0x4b4d39(0x415)][_0x4b4d39(0x44b)](this),this[_0x4b4d39(0x1d0)]();},Sprite_NewLabel[_0x23d1fb(0x241)][_0x23d1fb(0x1d0)]=function(){const _0x176dea=_0x23d1fb,_0x26224f=ImageManager[_0x176dea(0x431)],_0x11d915=ImageManager[_0x176dea(0x31e)];this[_0x176dea(0x4fb)]=new Bitmap(_0x26224f,_0x11d915),this['drawNewLabelIcon'](),this[_0x176dea(0x29e)]();},Sprite_NewLabel[_0x23d1fb(0x241)][_0x23d1fb(0x447)]=function(){const _0x272dfa=_0x23d1fb,_0x2262f6=VisuMZ['ItemsEquipsCore'][_0x272dfa(0x357)][_0x272dfa(0x333)][_0x272dfa(0x211)];if(_0x2262f6<=0x0)return;const _0x2f3bd2=ImageManager['loadSystem'](_0x272dfa(0x448)),_0x3a24f8=ImageManager['iconWidth'],_0x545c04=ImageManager[_0x272dfa(0x31e)],_0x50dad1=_0x2262f6%0x10*_0x3a24f8,_0x3bf624=Math[_0x272dfa(0x312)](_0x2262f6/0x10)*_0x545c04;this['bitmap'][_0x272dfa(0x1b8)](_0x2f3bd2,_0x50dad1,_0x3bf624,_0x3a24f8,_0x545c04,0x0,0x0);},Sprite_NewLabel['prototype'][_0x23d1fb(0x29e)]=function(){const _0x39f4da=_0x23d1fb,_0x182dc0=VisuMZ['ItemsEquipsCore'][_0x39f4da(0x357)][_0x39f4da(0x333)],_0x14270d=_0x182dc0[_0x39f4da(0x33b)];if(_0x14270d==='')return;const _0x43d28c=ImageManager[_0x39f4da(0x431)],_0x1eb4a8=ImageManager[_0x39f4da(0x31e)];this[_0x39f4da(0x4fb)][_0x39f4da(0x3dc)]=_0x182dc0[_0x39f4da(0x4aa)]||$gameSystem['mainFontFace'](),this[_0x39f4da(0x4fb)][_0x39f4da(0x296)]=this[_0x39f4da(0x1e3)](),this[_0x39f4da(0x4fb)][_0x39f4da(0x428)]=_0x182dc0[_0x39f4da(0x331)],this[_0x39f4da(0x4fb)]['drawText'](_0x14270d,0x0,_0x1eb4a8/0x2,_0x43d28c,_0x1eb4a8/0x2,'center');},Sprite_NewLabel[_0x23d1fb(0x241)][_0x23d1fb(0x1e3)]=function(){const _0x52cd3d=_0x23d1fb,_0x22359a=VisuMZ[_0x52cd3d(0x248)]['Settings'][_0x52cd3d(0x333)][_0x52cd3d(0x36c)];return _0x22359a[_0x52cd3d(0x2fc)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager['textColor'](_0x22359a);},Window_Base[_0x23d1fb(0x241)][_0x23d1fb(0x1a2)]=function(_0x20b88f,_0x2a6736,_0x44998d,_0xc0de6c){const _0x1ab2d7=_0x23d1fb;if(_0x20b88f){const _0x440961=_0x44998d+(this[_0x1ab2d7(0x314)]()-ImageManager[_0x1ab2d7(0x31e)])/0x2,_0x1370f0=ImageManager[_0x1ab2d7(0x431)]+0x4,_0x4947cb=Math[_0x1ab2d7(0x2e0)](0x0,_0xc0de6c-_0x1370f0);this[_0x1ab2d7(0x391)](ColorManager[_0x1ab2d7(0x2e6)](_0x20b88f)),this[_0x1ab2d7(0x48a)](_0x20b88f[_0x1ab2d7(0x3c9)],_0x2a6736,_0x440961),this[_0x1ab2d7(0x341)](_0x20b88f['name'],_0x2a6736+_0x1370f0,_0x44998d,_0x4947cb),this[_0x1ab2d7(0x29a)]();}},Window_Base['prototype'][_0x23d1fb(0x522)]=function(_0x350234,_0x326621,_0x30a3e1,_0x52b290){const _0xa1be4e=_0x23d1fb;if(this['isDrawItemNumber'](_0x350234)){this[_0xa1be4e(0x425)]();const _0x9dcbc0=VisuMZ[_0xa1be4e(0x248)]['Settings'][_0xa1be4e(0x3fe)],_0x2d477a=_0x9dcbc0[_0xa1be4e(0x517)],_0x95dc70=_0x2d477a['format']($gameParty['numItems'](_0x350234));this[_0xa1be4e(0x1c5)][_0xa1be4e(0x428)]=_0x9dcbc0['ItemQuantityFontSize'],this[_0xa1be4e(0x341)](_0x95dc70,_0x326621,_0x30a3e1,_0x52b290,_0xa1be4e(0x3cb)),this[_0xa1be4e(0x425)]();}},Window_Base[_0x23d1fb(0x241)][_0x23d1fb(0x28f)]=function(_0x565f65){const _0x5a5b88=_0x23d1fb;if(DataManager['isKeyItem'](_0x565f65))return $dataSystem[_0x5a5b88(0x354)];return!![];},Window_Base[_0x23d1fb(0x241)][_0x23d1fb(0x23b)]=function(_0x27d35c,_0x17de14,_0x8a9420,_0x22fedb,_0x1a73c2){const _0xb326d5=_0x23d1fb;_0x1a73c2=Math[_0xb326d5(0x2e0)](_0x1a73c2||0x1,0x1);while(_0x1a73c2--){_0x22fedb=_0x22fedb||this[_0xb326d5(0x314)](),this[_0xb326d5(0x4bf)][_0xb326d5(0x4f7)]=0xa0;const _0x4c4f99=ColorManager[_0xb326d5(0x2ba)]();this['contentsBack'][_0xb326d5(0x409)](_0x27d35c+0x1,_0x17de14+0x1,_0x8a9420-0x2,_0x22fedb-0x2,_0x4c4f99),this[_0xb326d5(0x4bf)][_0xb326d5(0x4f7)]=0xff;}},VisuMZ[_0x23d1fb(0x248)]['Window_Selectable_initialize']=Window_Selectable[_0x23d1fb(0x241)][_0x23d1fb(0x415)],Window_Selectable['prototype']['initialize']=function(_0x5009ee){const _0x3302ac=_0x23d1fb;this['initNewLabelSprites'](),VisuMZ[_0x3302ac(0x248)][_0x3302ac(0x24f)][_0x3302ac(0x44b)](this,_0x5009ee);},Window_Selectable['prototype'][_0x23d1fb(0x1a8)]=function(){const _0x1b1a93=_0x23d1fb;this['_newLabelSprites']={},this[_0x1b1a93(0x4be)]=0xff,this[_0x1b1a93(0x4f2)]=VisuMZ[_0x1b1a93(0x248)][_0x1b1a93(0x357)][_0x1b1a93(0x333)][_0x1b1a93(0x4af)],this[_0x1b1a93(0x196)]=VisuMZ[_0x1b1a93(0x248)][_0x1b1a93(0x357)]['New'][_0x1b1a93(0x503)];},Window_Selectable[_0x23d1fb(0x241)][_0x23d1fb(0x200)]=function(){return![];},VisuMZ[_0x23d1fb(0x248)]['Window_Selectable_setHelpWindowItem']=Window_Selectable[_0x23d1fb(0x241)]['setHelpWindowItem'],Window_Selectable['prototype']['setHelpWindowItem']=function(_0x40abec){const _0x394b44=_0x23d1fb;VisuMZ[_0x394b44(0x248)][_0x394b44(0x41e)]['call'](this,_0x40abec);if(this[_0x394b44(0x200)]())this['clearNewLabelFromItem'](_0x40abec);},Window_Selectable[_0x23d1fb(0x241)]['clearNewLabelFromItem']=function(_0x36f7b7){const _0x3f2c15=_0x23d1fb;if(!_0x36f7b7)return;$gameParty[_0x3f2c15(0x413)](_0x36f7b7);let _0x5f254d='';if(DataManager[_0x3f2c15(0x1ac)](_0x36f7b7))_0x5f254d=_0x3f2c15(0x48b)['format'](_0x36f7b7['id']);else{if(DataManager[_0x3f2c15(0x4ad)](_0x36f7b7))_0x5f254d=_0x3f2c15(0x2a7)[_0x3f2c15(0x325)](_0x36f7b7['id']);else{if(DataManager['isArmor'](_0x36f7b7))_0x5f254d=_0x3f2c15(0x4ac)[_0x3f2c15(0x325)](_0x36f7b7['id']);else return;}}const _0x9fae43=this[_0x3f2c15(0x2c6)][_0x5f254d];if(_0x9fae43)_0x9fae43[_0x3f2c15(0x4d4)]();},VisuMZ['ItemsEquipsCore']['Window_Selectable_refresh']=Window_Selectable[_0x23d1fb(0x241)][_0x23d1fb(0x3c3)],Window_Selectable[_0x23d1fb(0x241)][_0x23d1fb(0x3c3)]=function(){const _0x5a8089=_0x23d1fb;this[_0x5a8089(0x50f)](),VisuMZ[_0x5a8089(0x248)]['Window_Selectable_refresh'][_0x5a8089(0x44b)](this);},Window_Selectable['prototype'][_0x23d1fb(0x50f)]=function(){const _0x2db10d=_0x23d1fb;for(const _0x59465b of Object[_0x2db10d(0x20f)](this[_0x2db10d(0x2c6)])){_0x59465b[_0x2db10d(0x4d4)]();}},VisuMZ[_0x23d1fb(0x248)]['Window_Selectable_update']=Window_Selectable[_0x23d1fb(0x241)][_0x23d1fb(0x389)],Window_Selectable[_0x23d1fb(0x241)][_0x23d1fb(0x389)]=function(){const _0x2534c6=_0x23d1fb;this[_0x2534c6(0x434)](),VisuMZ[_0x2534c6(0x248)][_0x2534c6(0x2f9)][_0x2534c6(0x44b)](this);},Window_Selectable[_0x23d1fb(0x241)]['updateNewLabelOpacity']=function(){const _0xaf0f8=_0x23d1fb;if(!this['isShowNew']())return;const _0x2edf70=this[_0xaf0f8(0x196)];this[_0xaf0f8(0x4be)]+=this[_0xaf0f8(0x4f2)];(this['_newLabelOpacity']>=_0x2edf70||this[_0xaf0f8(0x4be)]<=0x0)&&(this[_0xaf0f8(0x4f2)]*=-0x1);this[_0xaf0f8(0x4be)]=this['_newLabelOpacity'][_0xaf0f8(0x3b7)](0x0,_0x2edf70);for(const _0x38c6ec of Object['values'](this['_newLabelSprites'])){_0x38c6ec[_0xaf0f8(0x1d7)]=this[_0xaf0f8(0x4be)];}},Window_Selectable[_0x23d1fb(0x241)]['createNewLabelSprite']=function(_0xdb3fb2){const _0x4ee482=_0x23d1fb,_0x33a7a3=this[_0x4ee482(0x2c6)];if(_0x33a7a3[_0xdb3fb2])return _0x33a7a3[_0xdb3fb2];else{const _0x4f42ab=new Sprite_NewLabel();return _0x33a7a3[_0xdb3fb2]=_0x4f42ab,this[_0x4ee482(0x3fa)](_0x4f42ab),_0x4f42ab;}},Window_Selectable[_0x23d1fb(0x241)][_0x23d1fb(0x44d)]=function(_0x54cbde,_0x9c5af,_0x2e00b5){const _0x590444=_0x23d1fb;let _0x584509='';if(DataManager['isItem'](_0x54cbde))_0x584509=_0x590444(0x48b)[_0x590444(0x325)](_0x54cbde['id']);else{if(DataManager[_0x590444(0x4ad)](_0x54cbde))_0x584509=_0x590444(0x2a7)['format'](_0x54cbde['id']);else{if(DataManager[_0x590444(0x2bb)](_0x54cbde))_0x584509=_0x590444(0x4ac)[_0x590444(0x325)](_0x54cbde['id']);else return;}}const _0x18a80c=this[_0x590444(0x267)](_0x584509);_0x18a80c['move'](_0x9c5af,_0x2e00b5),_0x18a80c[_0x590444(0x19f)](),_0x18a80c['opacity']=this['_newLabelOpacity'];},Window_ItemCategory[_0x23d1fb(0x26f)]=VisuMZ[_0x23d1fb(0x248)]['Settings']['Categories'][_0x23d1fb(0x499)],Window_ItemCategory[_0x23d1fb(0x194)]=[_0x23d1fb(0x289),'HiddenItemB','Nonconsumable',_0x23d1fb(0x36f),_0x23d1fb(0x277),'BattleUsable',_0x23d1fb(0x4c7),'NeverUsable'],VisuMZ[_0x23d1fb(0x248)]['Window_ItemCategory_initialize']=Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x415)],Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x415)]=function(_0x5d19cf){const _0x38442b=_0x23d1fb;VisuMZ[_0x38442b(0x248)][_0x38442b(0x3d5)]['call'](this,_0x5d19cf),this[_0x38442b(0x457)](_0x5d19cf);},Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x457)]=function(_0x2cdf6b){const _0x5bda11=_0x23d1fb,_0x4156fb=new Rectangle(0x0,0x0,_0x2cdf6b[_0x5bda11(0x3f4)],_0x2cdf6b['height']);this[_0x5bda11(0x422)]=new Window_Base(_0x4156fb),this[_0x5bda11(0x422)]['opacity']=0x0,this['addChild'](this[_0x5bda11(0x422)]),this[_0x5bda11(0x1cd)]();},Window_ItemCategory['prototype']['isUseModernControls']=function(){const _0x4cb403=_0x23d1fb;return Imported[_0x4cb403(0x297)]&&Window_HorzCommand[_0x4cb403(0x241)][_0x4cb403(0x3bd)][_0x4cb403(0x44b)](this);},Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x360)]=function(){},Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x315)]=function(){const _0x368543=_0x23d1fb;if(!this['isUseModernControls']())Window_HorzCommand['prototype'][_0x368543(0x315)][_0x368543(0x44b)](this);},Window_ItemCategory[_0x23d1fb(0x241)]['maxCols']=function(){const _0x32f489=_0x23d1fb;return this['_list']?this[_0x32f489(0x22a)]():0x4;},Window_ItemCategory['prototype']['update']=function(){const _0x47f37f=_0x23d1fb;Window_HorzCommand[_0x47f37f(0x241)][_0x47f37f(0x389)][_0x47f37f(0x44b)](this),this[_0x47f37f(0x468)]&&this['_itemWindow']['setCategory'](this[_0x47f37f(0x31f)]());},Window_ItemCategory['prototype']['processCursorMoveModernControls']=function(){const _0x57b942=_0x23d1fb;if(this[_0x57b942(0x351)]()){const _0x14c798=this[_0x57b942(0x276)]();if(this[_0x57b942(0x468)]&&this[_0x57b942(0x468)]['maxCols']()<=0x1)Input[_0x57b942(0x524)](_0x57b942(0x3cb))&&this[_0x57b942(0x348)](Input['isTriggered'](_0x57b942(0x3cb))),Input[_0x57b942(0x524)](_0x57b942(0x4cc))&&this[_0x57b942(0x2b8)](Input['isTriggered'](_0x57b942(0x4cc)));else this[_0x57b942(0x468)]&&this[_0x57b942(0x468)][_0x57b942(0x264)]()>0x1&&(Input['isRepeated']('pagedown')&&!Input[_0x57b942(0x220)](_0x57b942(0x329))&&this[_0x57b942(0x348)](Input[_0x57b942(0x244)](_0x57b942(0x22f))),Input[_0x57b942(0x524)]('pageup')&&!Input[_0x57b942(0x220)]('shift')&&this[_0x57b942(0x2b8)](Input['isTriggered'](_0x57b942(0x529))));this[_0x57b942(0x276)]()!==_0x14c798&&this[_0x57b942(0x26e)]();}},Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x1b2)]=function(){const _0xfee6ab=_0x23d1fb;if(this[_0xfee6ab(0x3bd)]())return;Window_HorzCommand[_0xfee6ab(0x241)][_0xfee6ab(0x1b2)]['call'](this);},Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x191)]=function(){const _0x4f6a3b=_0x23d1fb;return this['isUseModernControls']()?![]:Window_HorzCommand[_0x4f6a3b(0x241)][_0x4f6a3b(0x191)][_0x4f6a3b(0x44b)](this);},Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x2cf)]=function(){const _0xd8578c=_0x23d1fb;if(this[_0xd8578c(0x49b)]()){TouchInput[_0xd8578c(0x244)]()&&this[_0xd8578c(0x37c)](!![]);if(TouchInput['isClicked']())this['onTouchOk']();else TouchInput[_0xd8578c(0x29d)]()&&this[_0xd8578c(0x4a9)]();}},Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x37c)]=function(_0x2b62b2){const _0x27dcb0=_0x23d1fb;this[_0x27dcb0(0x3bd)]()?this[_0x27dcb0(0x332)](!![]):Window_HorzCommand[_0x27dcb0(0x241)]['onTouchSelect'][_0x27dcb0(0x44b)](this,_0x2b62b2);},Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x332)]=function(_0x2def9b){const _0x48b524=_0x23d1fb;this[_0x48b524(0x230)]=![];if(this[_0x48b524(0x351)]()){const _0x3e53a5=this[_0x48b524(0x276)](),_0x3894e1=this[_0x48b524(0x307)]();_0x3894e1>=0x0&&_0x3894e1!==this['index']()&&this[_0x48b524(0x435)](_0x3894e1),_0x2def9b&&this['index']()!==_0x3e53a5&&this[_0x48b524(0x26e)]();}},Window_ItemCategory['prototype'][_0x23d1fb(0x284)]=function(){const _0x13d4ec=_0x23d1fb;this[_0x13d4ec(0x3da)](),this[_0x13d4ec(0x435)](this[_0x13d4ec(0x276)]());},Window_ItemCategory[_0x23d1fb(0x241)]['addItemCategories']=function(){const _0x1d20e6=_0x23d1fb;for(const _0x3bf912 of Window_ItemCategory[_0x1d20e6(0x26f)]){this[_0x1d20e6(0x2f1)](_0x3bf912);}},Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x2f1)]=function(_0x55fa4f){const _0x242bcf=_0x23d1fb,_0x5b2c58=_0x55fa4f['Type'],_0x1d93f6=_0x55fa4f[_0x242bcf(0x211)],_0x16a84c=_0x55fa4f[_0x242bcf(0x1b1)]||0x0;if(_0x16a84c>0x0&&!$gameSwitches[_0x242bcf(0x3f6)](_0x16a84c))return;let _0x2dd25e='',_0x3a7682='category',_0x263266=_0x5b2c58;if(_0x5b2c58[_0x242bcf(0x2fc)](/Category:(.*)/i))_0x2dd25e=String(RegExp['$1'])[_0x242bcf(0x432)]();else{if(Window_ItemCategory['categoryItemTypes'][_0x242bcf(0x39a)](_0x5b2c58))_0x2dd25e=VisuMZ['ItemsEquipsCore']['Settings'][_0x242bcf(0x43b)][_0x5b2c58];else{if(['AllItems',_0x242bcf(0x24c)][_0x242bcf(0x39a)](_0x5b2c58))_0x2dd25e=TextManager[_0x242bcf(0x320)];else{if(_0x5b2c58===_0x242bcf(0x441))_0x2dd25e=TextManager[_0x242bcf(0x1a3)];else{if(_0x5b2c58===_0x242bcf(0x21f))_0x2dd25e=TextManager[_0x242bcf(0x484)];else{if(_0x5b2c58==='AllArmors')_0x2dd25e=TextManager[_0x242bcf(0x288)];else{if(_0x5b2c58[_0x242bcf(0x2fc)](/WTYPE:(\d+)/i))_0x2dd25e=$dataSystem[_0x242bcf(0x419)][Number(RegExp['$1'])]||'';else{if(_0x5b2c58['match'](/ATYPE:(\d+)/i))_0x2dd25e=$dataSystem[_0x242bcf(0x30b)][Number(RegExp['$1'])]||'';else _0x5b2c58[_0x242bcf(0x2fc)](/ETYPE:(\d+)/i)&&(_0x2dd25e=$dataSystem[_0x242bcf(0x1ab)][Number(RegExp['$1'])]||'');}}}}}}}_0x1d93f6>0x0&&this[_0x242bcf(0x2e1)]()!==_0x242bcf(0x2b3)&&(_0x2dd25e=_0x242bcf(0x322)['format'](_0x1d93f6,_0x2dd25e)),this[_0x242bcf(0x4bb)](_0x2dd25e,_0x3a7682,!![],_0x263266);},Window_ItemCategory['prototype'][_0x23d1fb(0x1c7)]=function(){const _0x3a40af=_0x23d1fb;return VisuMZ[_0x3a40af(0x248)]['Settings'][_0x3a40af(0x43b)][_0x3a40af(0x1c6)];},Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x453)]=function(_0x540ae0){const _0x3308a6=_0x23d1fb,_0x134b70=this[_0x3308a6(0x2fb)](_0x540ae0);if(_0x134b70===_0x3308a6(0x262))this['drawItemStyleIconText'](_0x540ae0);else _0x134b70===_0x3308a6(0x49f)?this[_0x3308a6(0x245)](_0x540ae0):Window_HorzCommand[_0x3308a6(0x241)][_0x3308a6(0x453)][_0x3308a6(0x44b)](this,_0x540ae0);},Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x2e1)]=function(){const _0x548227=_0x23d1fb;return VisuMZ[_0x548227(0x248)][_0x548227(0x357)][_0x548227(0x43b)][_0x548227(0x4fd)];},Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x2fb)]=function(_0x408e09){const _0x38b9b5=_0x23d1fb;if(_0x408e09<0x0)return _0x38b9b5(0x2b3);const _0x587db9=this[_0x38b9b5(0x2e1)]();if(_0x587db9!==_0x38b9b5(0x282))return _0x587db9;else{const _0x537924=this['commandName'](_0x408e09);if(_0x537924['match'](/\\I\[(\d+)\]/i)){const _0x51b617=this[_0x38b9b5(0x387)](_0x408e09),_0x26cd32=this[_0x38b9b5(0x1fc)](_0x537924)['width'];return _0x26cd32<=_0x51b617[_0x38b9b5(0x3f4)]?'iconText':_0x38b9b5(0x49f);}else return _0x38b9b5(0x2b3);}},Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x2e4)]=function(_0x2675d0){const _0x3744cf=_0x23d1fb,_0x38339a=this[_0x3744cf(0x387)](_0x2675d0),_0x1235b8=this[_0x3744cf(0x393)](_0x2675d0),_0x45e98c=this[_0x3744cf(0x1fc)](_0x1235b8)[_0x3744cf(0x3f4)];this[_0x3744cf(0x45c)](this['isCommandEnabled'](_0x2675d0));const _0x3c281f=this['itemTextAlign']();if(_0x3c281f===_0x3744cf(0x3cb))this[_0x3744cf(0x4d0)](_0x1235b8,_0x38339a['x']+_0x38339a[_0x3744cf(0x3f4)]-_0x45e98c,_0x38339a['y'],_0x45e98c);else{if(_0x3c281f===_0x3744cf(0x1db)){const _0x325e85=_0x38339a['x']+Math[_0x3744cf(0x312)]((_0x38339a[_0x3744cf(0x3f4)]-_0x45e98c)/0x2);this[_0x3744cf(0x4d0)](_0x1235b8,_0x325e85,_0x38339a['y'],_0x45e98c);}else this[_0x3744cf(0x4d0)](_0x1235b8,_0x38339a['x'],_0x38339a['y'],_0x45e98c);}},Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x245)]=function(_0x2bbf94){const _0x37cc22=_0x23d1fb,_0x35d6f4=this[_0x37cc22(0x393)](_0x2bbf94);if(_0x35d6f4[_0x37cc22(0x2fc)](/\\I\[(\d+)\]/i)){const _0x23615f=Number(RegExp['$1'])||0x0,_0x5f0311=this['itemLineRect'](_0x2bbf94),_0x41bf9f=_0x5f0311['x']+Math[_0x37cc22(0x312)]((_0x5f0311[_0x37cc22(0x3f4)]-ImageManager[_0x37cc22(0x431)])/0x2),_0x76510b=_0x5f0311['y']+(_0x5f0311[_0x37cc22(0x1f9)]-ImageManager[_0x37cc22(0x31e)])/0x2;this[_0x37cc22(0x48a)](_0x23615f,_0x41bf9f,_0x76510b);}},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x3b3)]=Window_ItemCategory[_0x23d1fb(0x241)]['setItemWindow'],Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x287)]=function(_0x2c723e){const _0x391c98=_0x23d1fb;VisuMZ[_0x391c98(0x248)][_0x391c98(0x3b3)][_0x391c98(0x44b)](this,_0x2c723e),_0x2c723e['_categoryWindow']=this;},Window_ItemCategory['prototype'][_0x23d1fb(0x2c2)]=function(){const _0x25a85b=_0x23d1fb;Window_HorzCommand[_0x25a85b(0x241)][_0x25a85b(0x2c2)]['call'](this);if(this['_categoryNameWindow'])this[_0x25a85b(0x1cd)]();},Window_ItemCategory['prototype'][_0x23d1fb(0x1cd)]=function(){const _0x91d7c4=_0x23d1fb,_0x59fa0c=this[_0x91d7c4(0x422)];_0x59fa0c[_0x91d7c4(0x1c5)][_0x91d7c4(0x475)]();const _0x168ffc=this[_0x91d7c4(0x2fb)](this[_0x91d7c4(0x276)]());if(_0x168ffc===_0x91d7c4(0x49f)){const _0x2e4aa7=this[_0x91d7c4(0x387)](this['index']());let _0x6a6ee5=this['commandName'](this[_0x91d7c4(0x276)]());_0x6a6ee5=_0x6a6ee5[_0x91d7c4(0x3d6)](/\\I\[(\d+)\]/gi,''),_0x59fa0c['resetFontSettings'](),this[_0x91d7c4(0x2b0)](_0x6a6ee5,_0x2e4aa7),this['categoryNameWindowDrawText'](_0x6a6ee5,_0x2e4aa7),this[_0x91d7c4(0x486)](_0x6a6ee5,_0x2e4aa7);}},Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x2b0)]=function(_0x5543ef,_0x1ac666){},Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x1a5)]=function(_0x581be1,_0x2af2ab){const _0x4a91ff=_0x23d1fb,_0x8eef00=this[_0x4a91ff(0x422)];_0x8eef00[_0x4a91ff(0x341)](_0x581be1,0x0,_0x2af2ab['y'],_0x8eef00[_0x4a91ff(0x4a8)],_0x4a91ff(0x1db));},Window_ItemCategory[_0x23d1fb(0x241)][_0x23d1fb(0x486)]=function(_0x28d028,_0x4b3763){const _0x5e60dd=_0x23d1fb,_0x4db9f9=this[_0x5e60dd(0x422)],_0x2ac7d5=$gameSystem[_0x5e60dd(0x379)](),_0x12dce9=_0x4b3763['x']+Math[_0x5e60dd(0x312)](_0x4b3763['width']/0x2)+_0x2ac7d5;_0x4db9f9['x']=_0x4db9f9[_0x5e60dd(0x3f4)]/-0x2+_0x12dce9,_0x4db9f9['y']=Math['floor'](_0x4b3763['height']/0x2);},Window_ItemList['prototype']['processCursorMoveModernControls']=function(){const _0x2d7c46=_0x23d1fb;if(this[_0x2d7c46(0x351)]()){const _0x40aa8f=this['index']();if(this[_0x2d7c46(0x264)]()<=0x1)!this[_0x2d7c46(0x47c)](_0x2d7c46(0x22f))&&Input[_0x2d7c46(0x244)](_0x2d7c46(0x22f))&&this[_0x2d7c46(0x2ab)](),!this[_0x2d7c46(0x47c)]('pageup')&&Input[_0x2d7c46(0x244)](_0x2d7c46(0x529))&&this[_0x2d7c46(0x221)]();else this[_0x2d7c46(0x264)]()>0x1&&(Input[_0x2d7c46(0x524)](_0x2d7c46(0x3cb))&&this[_0x2d7c46(0x348)](Input[_0x2d7c46(0x244)](_0x2d7c46(0x3cb))),Input[_0x2d7c46(0x524)](_0x2d7c46(0x4cc))&&this['cursorLeft'](Input[_0x2d7c46(0x244)](_0x2d7c46(0x4cc))),this[_0x2d7c46(0x45d)]()?(Input[_0x2d7c46(0x244)]('pagedown')&&Input[_0x2d7c46(0x220)](_0x2d7c46(0x329))&&this[_0x2d7c46(0x2ab)](),Input[_0x2d7c46(0x244)](_0x2d7c46(0x529))&&Input[_0x2d7c46(0x220)](_0x2d7c46(0x329))&&this[_0x2d7c46(0x221)]()):(Input[_0x2d7c46(0x244)](_0x2d7c46(0x22f))&&this[_0x2d7c46(0x2ab)](),Input[_0x2d7c46(0x244)](_0x2d7c46(0x529))&&this['cursorPageup']()));Input[_0x2d7c46(0x524)](_0x2d7c46(0x523))&&(Input[_0x2d7c46(0x220)](_0x2d7c46(0x329))&&this[_0x2d7c46(0x2a0)]()?this[_0x2d7c46(0x2ab)]():this[_0x2d7c46(0x36e)](Input[_0x2d7c46(0x244)]('down'))),Input[_0x2d7c46(0x524)]('up')&&(Input[_0x2d7c46(0x220)](_0x2d7c46(0x329))&&this[_0x2d7c46(0x2a0)]()?this[_0x2d7c46(0x221)]():this[_0x2d7c46(0x440)](Input[_0x2d7c46(0x244)]('up'))),Imported[_0x2d7c46(0x297)]&&this['processCursorHomeEndTrigger'](),this[_0x2d7c46(0x276)]()!==_0x40aa8f&&this['playCursorSound']();}},Window_ItemList[_0x23d1fb(0x241)][_0x23d1fb(0x45d)]=function(){const _0x99a837=_0x23d1fb,_0xc43c4f=SceneManager[_0x99a837(0x2b6)],_0x59b6a8=[Scene_Item,Scene_Shop];return _0x59b6a8[_0x99a837(0x39a)](_0xc43c4f[_0x99a837(0x1f1)]);},Window_ItemList[_0x23d1fb(0x241)][_0x23d1fb(0x408)]=function(){const _0x5466eb=_0x23d1fb;Window_Selectable[_0x5466eb(0x241)][_0x5466eb(0x408)]['call'](this),this[_0x5466eb(0x48d)]&&this[_0x5466eb(0x48d)]['isUseModernControls']()&&this[_0x5466eb(0x48d)][_0x5466eb(0x408)]();},Window_ItemList[_0x23d1fb(0x241)][_0x23d1fb(0x44f)]=function(){const _0x5bc766=_0x23d1fb;Window_Selectable[_0x5bc766(0x241)][_0x5bc766(0x44f)]['call'](this),this['_categoryWindow']&&this['_categoryWindow'][_0x5bc766(0x3bd)]()&&this['_categoryWindow']['deactivate']();},Window_ItemList[_0x23d1fb(0x241)][_0x23d1fb(0x3ba)]=function(_0x5e9ad8){const _0x151a25=_0x23d1fb;this[_0x151a25(0x34e)]!==_0x5e9ad8&&(this['_category']=_0x5e9ad8,this[_0x151a25(0x3c3)](),this[_0x151a25(0x48d)]&&this[_0x151a25(0x48d)][_0x151a25(0x3bd)]()?this[_0x151a25(0x3ea)](0x0):this[_0x151a25(0x4dc)](0x0,0x0));},VisuMZ[_0x23d1fb(0x248)]['Window_ItemList_maxCols']=Window_ItemList[_0x23d1fb(0x241)][_0x23d1fb(0x264)],Window_ItemList[_0x23d1fb(0x241)][_0x23d1fb(0x264)]=function(){const _0x7d72eb=_0x23d1fb;if(SceneManager['_scene'][_0x7d72eb(0x1f1)]===Scene_Battle)return VisuMZ[_0x7d72eb(0x248)][_0x7d72eb(0x4bc)][_0x7d72eb(0x44b)](this);else return SceneManager['_scene'][_0x7d72eb(0x1f1)]===Scene_Map?VisuMZ[_0x7d72eb(0x248)][_0x7d72eb(0x4bc)]['call'](this):VisuMZ['ItemsEquipsCore'][_0x7d72eb(0x357)][_0x7d72eb(0x3fe)][_0x7d72eb(0x443)];},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x463)]=Window_ItemList[_0x23d1fb(0x241)]['colSpacing'],Window_ItemList[_0x23d1fb(0x241)]['colSpacing']=function(){const _0x31fbd1=_0x23d1fb;return this['maxCols']()<=0x1?Window_Selectable[_0x31fbd1(0x241)][_0x31fbd1(0x35a)][_0x31fbd1(0x44b)](this):VisuMZ[_0x31fbd1(0x248)][_0x31fbd1(0x463)][_0x31fbd1(0x44b)](this);},Window_ItemList['prototype'][_0x23d1fb(0x39a)]=function(_0x2e88ed){const _0x467b1c=_0x23d1fb;switch(this[_0x467b1c(0x34e)]){case _0x467b1c(0x436):return DataManager[_0x467b1c(0x1ac)](_0x2e88ed);case'RegularItems':return DataManager[_0x467b1c(0x1ac)](_0x2e88ed)&&_0x2e88ed[_0x467b1c(0x2d5)]===0x1;case'KeyItems':return DataManager[_0x467b1c(0x1ac)](_0x2e88ed)&&_0x2e88ed[_0x467b1c(0x2d5)]===0x2;case'HiddenItemA':return DataManager[_0x467b1c(0x1ac)](_0x2e88ed)&&_0x2e88ed[_0x467b1c(0x2d5)]===0x3;case'HiddenItemB':return DataManager[_0x467b1c(0x1ac)](_0x2e88ed)&&_0x2e88ed[_0x467b1c(0x2d5)]===0x4;case _0x467b1c(0x36f):return DataManager[_0x467b1c(0x1ac)](_0x2e88ed)&&_0x2e88ed[_0x467b1c(0x338)];case'Nonconsumable':return DataManager['isItem'](_0x2e88ed)&&!_0x2e88ed[_0x467b1c(0x338)];case _0x467b1c(0x277):return DataManager['isItem'](_0x2e88ed)&&[0x0][_0x467b1c(0x39a)](_0x2e88ed['occasion']);case _0x467b1c(0x2ef):return DataManager[_0x467b1c(0x1ac)](_0x2e88ed)&&[0x0,0x1][_0x467b1c(0x39a)](_0x2e88ed[_0x467b1c(0x4e3)]);case _0x467b1c(0x4c7):return DataManager[_0x467b1c(0x1ac)](_0x2e88ed)&&[0x0,0x2][_0x467b1c(0x39a)](_0x2e88ed[_0x467b1c(0x4e3)]);case'NeverUsable':return DataManager['isItem'](_0x2e88ed)&&[0x3][_0x467b1c(0x39a)](_0x2e88ed[_0x467b1c(0x4e3)]);case _0x467b1c(0x21f):return DataManager[_0x467b1c(0x4ad)](_0x2e88ed);case'AllArmors':return DataManager[_0x467b1c(0x2bb)](_0x2e88ed);default:if(this['_category'][_0x467b1c(0x2fc)](/WTYPE:(\d+)/i))return DataManager['isWeapon'](_0x2e88ed)&&_0x2e88ed[_0x467b1c(0x471)]===Number(RegExp['$1']);else{if(this[_0x467b1c(0x34e)][_0x467b1c(0x2fc)](/WTYPE:(.*)/i)){const _0x2b7206=$dataSystem[_0x467b1c(0x419)][_0x467b1c(0x41c)](String(RegExp['$1'])[_0x467b1c(0x432)]());return DataManager[_0x467b1c(0x4ad)](_0x2e88ed)&&_0x2e88ed['wtypeId']===_0x2b7206;}else{if(this[_0x467b1c(0x34e)]['match'](/ATYPE:(\d+)/i))return DataManager['isArmor'](_0x2e88ed)&&_0x2e88ed[_0x467b1c(0x22e)]===Number(RegExp['$1']);else{if(this[_0x467b1c(0x34e)][_0x467b1c(0x2fc)](/ATYPE:(.*)/i)){const _0x200cfe=$dataSystem[_0x467b1c(0x30b)][_0x467b1c(0x41c)](String(RegExp['$1'])[_0x467b1c(0x432)]());return DataManager['isArmor'](_0x2e88ed)&&_0x2e88ed[_0x467b1c(0x22e)]===_0x200cfe;}else{if(this[_0x467b1c(0x34e)]['match'](/ETYPE:(\d+)/i))return!!_0x2e88ed&&_0x2e88ed[_0x467b1c(0x394)]===Number(RegExp['$1']);else{if(this[_0x467b1c(0x34e)][_0x467b1c(0x2fc)](/ETYPE:(.*)/i)){const _0x1613b9=$dataSystem['equipTypes']['indexOf'](String(RegExp['$1'])['trim']());return DataManager[_0x467b1c(0x2bb)](_0x2e88ed)&&_0x2e88ed[_0x467b1c(0x394)]===_0x1613b9;}else{if(this[_0x467b1c(0x34e)]['match'](/Category:(.*)/i))return!!_0x2e88ed&&_0x2e88ed[_0x467b1c(0x2e8)][_0x467b1c(0x39a)](String(RegExp['$1'])['toUpperCase']()['trim']());}}}}}}}return![];},Window_ItemList[_0x23d1fb(0x241)][_0x23d1fb(0x200)]=function(){return!![];},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x455)]=Window_ItemList[_0x23d1fb(0x241)]['drawItem'],Window_ItemList[_0x23d1fb(0x241)]['drawItem']=function(_0x33345b){const _0x17d05e=_0x23d1fb;VisuMZ[_0x17d05e(0x248)]['Window_ItemList_drawItem']['call'](this,_0x33345b),this[_0x17d05e(0x2e5)](_0x33345b);},Window_ItemList[_0x23d1fb(0x241)]['drawItemNumber']=function(_0x521543,_0x254206,_0xcffdf7,_0x5015cd){const _0x4ad7dd=_0x23d1fb;Window_Selectable[_0x4ad7dd(0x241)]['drawItemNumber'][_0x4ad7dd(0x44b)](this,_0x521543,_0x254206,_0xcffdf7,_0x5015cd);},Window_ItemList['prototype'][_0x23d1fb(0x2e5)]=function(_0x3894b4){const _0x18abfb=_0x23d1fb,_0x3de2b1=this['itemAt'](_0x3894b4);if(!_0x3de2b1||!this[_0x18abfb(0x200)]())return;if(!$gameParty[_0x18abfb(0x1ff)](_0x3de2b1))return;const _0x581363=this[_0x18abfb(0x387)](_0x3894b4),_0x41480d=_0x581363['x'],_0xc72bf6=_0x581363['y']+(this[_0x18abfb(0x314)]()-ImageManager['iconHeight'])/0x2,_0x3e6fd7=VisuMZ['ItemsEquipsCore']['Settings'][_0x18abfb(0x333)]['OffsetX'],_0x1a0fa8=VisuMZ[_0x18abfb(0x248)][_0x18abfb(0x357)]['New'][_0x18abfb(0x4f9)];this[_0x18abfb(0x44d)](_0x3de2b1,_0x41480d+_0x3e6fd7,_0xc72bf6+_0x1a0fa8);},Window_ItemList[_0x23d1fb(0x241)][_0x23d1fb(0x52c)]=function(_0x5aaaed){this['_statusWindow']=_0x5aaaed,this['callUpdateHelp']();},VisuMZ['ItemsEquipsCore'][_0x23d1fb(0x49c)]=Window_ItemList[_0x23d1fb(0x241)]['updateHelp'],Window_ItemList[_0x23d1fb(0x241)][_0x23d1fb(0x4f1)]=function(){const _0x1ac7cb=_0x23d1fb;VisuMZ['ItemsEquipsCore'][_0x1ac7cb(0x49c)][_0x1ac7cb(0x44b)](this),this[_0x1ac7cb(0x24d)]&&this[_0x1ac7cb(0x24d)][_0x1ac7cb(0x1f1)]===Window_ShopStatus&&this[_0x1ac7cb(0x24d)][_0x1ac7cb(0x31d)](this[_0x1ac7cb(0x320)]());},Window_BattleItem[_0x23d1fb(0x241)][_0x23d1fb(0x3c6)]=function(_0x43e81d){const _0x27173b=_0x23d1fb;return BattleManager[_0x27173b(0x383)]()?BattleManager[_0x27173b(0x383)]()[_0x27173b(0x226)](_0x43e81d):Window_ItemList[_0x27173b(0x241)]['isEnabled'][_0x27173b(0x44b)](this,_0x43e81d);},Window_EventItem[_0x23d1fb(0x241)][_0x23d1fb(0x200)]=function(){return![];},Window_EquipStatus[_0x23d1fb(0x241)][_0x23d1fb(0x23a)]=function(){const _0x391ef7=_0x23d1fb;return VisuMZ[_0x391ef7(0x248)]['Settings'][_0x391ef7(0x3af)]['EnableLayout'];},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x48e)]=Window_EquipStatus[_0x23d1fb(0x241)][_0x23d1fb(0x3c3)],Window_EquipStatus[_0x23d1fb(0x241)][_0x23d1fb(0x3c3)]=function(){const _0x1492fa=_0x23d1fb;this[_0x1492fa(0x3f9)](),this[_0x1492fa(0x425)]();if(this[_0x1492fa(0x255)])this[_0x1492fa(0x255)][_0x1492fa(0x3c3)]();this[_0x1492fa(0x23a)]()?this['prepareRefreshItemsEquipsCoreLayout']():VisuMZ[_0x1492fa(0x248)][_0x1492fa(0x48e)][_0x1492fa(0x44b)](this);},Window_EquipStatus[_0x23d1fb(0x241)]['prepareRefreshItemsEquipsCoreLayout']=function(){const _0x400ab1=_0x23d1fb;this[_0x400ab1(0x1c5)]['clear']();if(!this[_0x400ab1(0x255)])return;if(this[_0x400ab1(0x402)]()){const _0x32d666=ImageManager[_0x400ab1(0x239)](this['_actor'][_0x400ab1(0x4e4)]());_0x32d666['addLoadListener'](this[_0x400ab1(0x233)][_0x400ab1(0x36d)](this));}else this['refreshItemsEquipsCoreNoMenuImage']();},Window_EquipStatus['prototype'][_0x23d1fb(0x402)]=function(){const _0x23f543=_0x23d1fb;return Imported['VisuMZ_1_MainMenuCore']&&this['_actor'][_0x23f543(0x4e4)]()!==''&&VisuMZ[_0x23f543(0x248)][_0x23f543(0x357)][_0x23f543(0x3af)][_0x23f543(0x323)];},Window_EquipStatus['prototype']['onMenuImageLoad']=function(){const _0x3ddd43=_0x23d1fb;VisuMZ['ItemsEquipsCore'][_0x3ddd43(0x357)][_0x3ddd43(0x3af)][_0x3ddd43(0x1e5)][_0x3ddd43(0x44b)](this),this['drawParamsItemsEquipsCore']();},Window_EquipStatus[_0x23d1fb(0x241)][_0x23d1fb(0x181)]=function(){const _0x1ee398=_0x23d1fb;VisuMZ['ItemsEquipsCore'][_0x1ee398(0x357)][_0x1ee398(0x3af)]['DrawFaceJS'][_0x1ee398(0x44b)](this),this[_0x1ee398(0x2df)]();},Window_EquipStatus[_0x23d1fb(0x241)][_0x23d1fb(0x2df)]=function(){const _0x4d39b7=_0x23d1fb;this['resetFontSettings'](),VisuMZ['ItemsEquipsCore'][_0x4d39b7(0x357)][_0x4d39b7(0x3af)][_0x4d39b7(0x43e)][_0x4d39b7(0x44b)](this);},Window_EquipStatus['prototype']['drawItemActorMenuImage']=function(_0x5ee631,_0x592420,_0x22dbb0,_0x41790e,_0x4a8879){const _0x48faad=_0x23d1fb,_0x5d400f=ImageManager[_0x48faad(0x239)](_0x5ee631['getMenuImage']()),_0x10e119=this[_0x48faad(0x4a8)]-_0x5d400f[_0x48faad(0x3f4)];_0x592420+=_0x10e119/0x2;if(_0x10e119<0x0)_0x41790e-=_0x10e119;Window_StatusBase[_0x48faad(0x241)]['drawItemActorMenuImage']['call'](this,_0x5ee631,_0x592420,_0x22dbb0,_0x41790e,_0x4a8879);},Window_EquipStatus[_0x23d1fb(0x241)][_0x23d1fb(0x3ee)]=function(){const _0x2242d7=_0x23d1fb;return Imported[_0x2242d7(0x297)]?VisuMZ['CoreEngine'][_0x2242d7(0x357)][_0x2242d7(0x4fc)][_0x2242d7(0x249)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x23d1fb(0x241)][_0x23d1fb(0x183)]=function(){const _0x1325e1=_0x23d1fb;return VisuMZ[_0x1325e1(0x248)][_0x1325e1(0x357)]['EquipScene']['ParamValueFontSize'];},Window_EquipStatus['prototype'][_0x23d1fb(0x1ce)]=function(){const _0xa455bc=_0x23d1fb;return Imported[_0xa455bc(0x297)]&&VisuMZ[_0xa455bc(0x305)][_0xa455bc(0x357)][_0xa455bc(0x4fc)][_0xa455bc(0x4e9)];},Window_EquipStatus[_0x23d1fb(0x241)][_0x23d1fb(0x46c)]=function(_0x25dcd3,_0x4b6bf4,_0x327bf6,_0x3c3333){const _0x24a09b=_0x23d1fb,_0x4e3d6e=this[_0x24a09b(0x2a5)]();Imported[_0x24a09b(0x297)]?this[_0x24a09b(0x47d)](_0x4b6bf4+_0x4e3d6e,_0x327bf6,_0x3c3333,_0x25dcd3,![]):this[_0x24a09b(0x341)](TextManager['param'](_0x25dcd3),_0x4b6bf4+_0x4e3d6e,_0x327bf6,_0x3c3333);},Window_EquipStatus['prototype']['drawUpdatedBeforeParamValue']=function(_0x53fa70,_0x1f03b1,_0x25aa3c,_0x1b9733){const _0x1ba1ad=_0x23d1fb,_0x56cf91=this['itemPadding']();let _0x43e892=0x0;Imported[_0x1ba1ad(0x297)]?_0x43e892=this[_0x1ba1ad(0x255)]['paramValueByName'](_0x53fa70,!![]):_0x43e892=this['_actor'][_0x1ba1ad(0x3bf)](_0x53fa70);const _0x4cf477=_0x43e892;this[_0x1ba1ad(0x341)](_0x43e892,_0x1f03b1,_0x25aa3c,_0x1b9733-_0x56cf91,_0x1ba1ad(0x3cb));},Window_EquipStatus[_0x23d1fb(0x241)][_0x23d1fb(0x4d8)]=function(_0x9b613c,_0x5c82f8,_0xc7c946,_0x50d72b){const _0x433a8e=_0x23d1fb,_0x565d13=this[_0x433a8e(0x2a5)]();let _0x1fb792=0x0,_0x49b391=0x0,_0x383e47='';if(this[_0x433a8e(0x31b)]){Imported[_0x433a8e(0x297)]?(_0x1fb792=this['_actor'][_0x433a8e(0x491)](_0x9b613c,![]),_0x49b391=this[_0x433a8e(0x31b)]['paramValueByName'](_0x9b613c,![]),_0x383e47=this[_0x433a8e(0x31b)][_0x433a8e(0x491)](_0x9b613c,!![])):(_0x1fb792=this[_0x433a8e(0x255)]['param'](_0x9b613c),_0x49b391=this['_tempActor'][_0x433a8e(0x3bf)](_0x9b613c),_0x383e47=this[_0x433a8e(0x31b)][_0x433a8e(0x3bf)](_0x9b613c));const _0x5daf2f=_0x1fb792,_0x3007d7=_0x49b391;diffValue=_0x3007d7-_0x5daf2f,this['changeTextColor'](ColorManager[_0x433a8e(0x317)](diffValue)),this['drawText'](_0x383e47,_0x5c82f8,_0xc7c946,_0x50d72b-_0x565d13,_0x433a8e(0x3cb));}},Window_EquipStatus['prototype'][_0x23d1fb(0x26a)]=function(_0xbb4caa,_0x5bac3b,_0x4e6fc5,_0x713751){const _0x23eb46=_0x23d1fb,_0x4e2385=this['itemPadding']();let _0x965c68=0x0,_0x15490b=0x0,_0x81eaa3=![];if(this[_0x23eb46(0x31b)]){Imported['VisuMZ_0_CoreEngine']?(_0x965c68=this[_0x23eb46(0x255)]['paramValueByName'](_0xbb4caa,![]),_0x15490b=this[_0x23eb46(0x31b)][_0x23eb46(0x491)](_0xbb4caa,![]),_0x81eaa3=String(this[_0x23eb46(0x255)][_0x23eb46(0x491)](_0xbb4caa,!![]))[_0x23eb46(0x2fc)](/([%％])/i)):(_0x965c68=this[_0x23eb46(0x255)][_0x23eb46(0x3bf)](_0xbb4caa),_0x15490b=this[_0x23eb46(0x31b)][_0x23eb46(0x3bf)](_0xbb4caa),_0x81eaa3=_0x965c68%0x1!==0x0||_0x15490b%0x1!==0x0);const _0x17b1c2=_0x965c68,_0x3a0f01=_0x15490b,_0x4aca6f=_0x3a0f01-_0x17b1c2;let _0x2f4c56=_0x4aca6f;if(_0x81eaa3)_0x2f4c56=Math[_0x23eb46(0x291)](_0x4aca6f*0x64)+'%';_0x4aca6f!==0x0&&(this[_0x23eb46(0x391)](ColorManager['paramchangeTextColor'](_0x4aca6f)),_0x2f4c56=(_0x4aca6f>0x0?_0x23eb46(0x51d):_0x23eb46(0x190))[_0x23eb46(0x325)](_0x2f4c56),this[_0x23eb46(0x341)](_0x2f4c56,_0x5bac3b+_0x4e2385,_0x4e6fc5,_0x713751,_0x23eb46(0x4cc)));}},Window_EquipStatus[_0x23d1fb(0x241)][_0x23d1fb(0x23b)]=function(_0x318c08,_0x35035f,_0x1addfe,_0x1f7908,_0x31c4a5){const _0x4fd9a7=_0x23d1fb;if(VisuMZ['ItemsEquipsCore'][_0x4fd9a7(0x357)][_0x4fd9a7(0x3af)][_0x4fd9a7(0x2db)]===![])return;_0x31c4a5=Math[_0x4fd9a7(0x2e0)](_0x31c4a5||0x1,0x1);while(_0x31c4a5--){_0x1f7908=_0x1f7908||this['lineHeight'](),this[_0x4fd9a7(0x1c5)][_0x4fd9a7(0x4f7)]=0xa0;const _0x17ded8=ColorManager[_0x4fd9a7(0x1b5)]();this[_0x4fd9a7(0x1c5)]['fillRect'](_0x318c08+0x1,_0x35035f+0x1,_0x1addfe-0x2,_0x1f7908-0x2,_0x17ded8),this[_0x4fd9a7(0x1c5)][_0x4fd9a7(0x4f7)]=0xff;}},ColorManager['getItemsEquipsCoreBackColor2']=function(){const _0x72a8d2=_0x23d1fb,_0x13aa96=VisuMZ[_0x72a8d2(0x248)][_0x72a8d2(0x357)]['EquipScene'];let _0x57a018=_0x13aa96[_0x72a8d2(0x19a)]!==undefined?_0x13aa96['BackRectColor']:0x13;return ColorManager[_0x72a8d2(0x3c5)](_0x57a018);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x398)]=Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x415)],Window_EquipCommand['prototype'][_0x23d1fb(0x415)]=function(_0x4176ac){const _0x533b07=_0x23d1fb;VisuMZ['ItemsEquipsCore'][_0x533b07(0x398)][_0x533b07(0x44b)](this,_0x4176ac),this[_0x533b07(0x50b)](_0x4176ac);},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x50b)]=function(_0x42c490){const _0x519e7a=_0x23d1fb,_0x1bfee8=new Rectangle(0x0,0x0,_0x42c490['width'],_0x42c490[_0x519e7a(0x1f9)]);this[_0x519e7a(0x3cf)]=new Window_Base(_0x1bfee8),this[_0x519e7a(0x3cf)][_0x519e7a(0x1d7)]=0x0,this[_0x519e7a(0x3bb)](this[_0x519e7a(0x3cf)]),this['updateCommandNameWindow']();},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x2c2)]=function(){const _0x3776a6=_0x23d1fb;Window_HorzCommand[_0x3776a6(0x241)][_0x3776a6(0x2c2)][_0x3776a6(0x44b)](this);if(this[_0x3776a6(0x3cf)])this[_0x3776a6(0x52d)]();},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x52d)]=function(){const _0x6bd712=_0x23d1fb,_0x5aa4c5=this[_0x6bd712(0x3cf)];_0x5aa4c5['contents'][_0x6bd712(0x475)]();const _0x33839a=this['commandStyleCheck'](this['index']());if(_0x33839a==='icon'){const _0xfecd0a=this[_0x6bd712(0x387)](this['index']());let _0xd7c4cc=this[_0x6bd712(0x393)](this[_0x6bd712(0x276)]());_0xd7c4cc=_0xd7c4cc['replace'](/\\I\[(\d+)\]/gi,''),_0x5aa4c5[_0x6bd712(0x425)](),this['commandNameWindowDrawBackground'](_0xd7c4cc,_0xfecd0a),this['commandNameWindowDrawText'](_0xd7c4cc,_0xfecd0a),this['commandNameWindowCenter'](_0xd7c4cc,_0xfecd0a);}},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x250)]=function(_0x14469e,_0x551fc4){},Window_EquipCommand[_0x23d1fb(0x241)]['commandNameWindowDrawText']=function(_0x3a7f78,_0x215a6a){const _0x1bafd4=_0x23d1fb,_0x20a551=this['_commandNameWindow'];_0x20a551['drawText'](_0x3a7f78,0x0,_0x215a6a['y'],_0x20a551[_0x1bafd4(0x4a8)],'center');},Window_EquipCommand[_0x23d1fb(0x241)]['commandNameWindowCenter']=function(_0x18f871,_0x2b62cd){const _0x16b7e0=_0x23d1fb,_0xee0fd5=this[_0x16b7e0(0x3cf)],_0x38919d=$gameSystem['windowPadding'](),_0x2f5e30=_0x2b62cd['x']+Math[_0x16b7e0(0x312)](_0x2b62cd[_0x16b7e0(0x3f4)]/0x2)+_0x38919d;_0xee0fd5['x']=_0xee0fd5['width']/-0x2+_0x2f5e30,_0xee0fd5['y']=Math[_0x16b7e0(0x312)](_0x2b62cd[_0x16b7e0(0x1f9)]/0x2);},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x3bd)]=function(){const _0x376947=_0x23d1fb;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand[_0x376947(0x241)][_0x376947(0x3bd)][_0x376947(0x44b)](this);},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x315)]=function(){const _0x48b8d1=_0x23d1fb;if(this[_0x48b8d1(0x2c9)]()==='equip')Window_HorzCommand['prototype']['playOkSound'][_0x48b8d1(0x44b)](this);},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x34d)]=function(){const _0x1eaa42=_0x23d1fb;!this[_0x1eaa42(0x197)]()&&Window_HorzCommand[_0x1eaa42(0x241)][_0x1eaa42(0x34d)][_0x1eaa42(0x44b)](this);},Window_EquipCommand[_0x23d1fb(0x241)]['processCursorSpecialCheckModernControls']=function(){const _0x4a5fc3=_0x23d1fb;if(!this['isCursorMovable']())return![];if(SceneManager[_0x4a5fc3(0x2b6)]['constructor']!==Scene_Equip)return![];return Input[_0x4a5fc3(0x244)](_0x4a5fc3(0x523))&&(this[_0x4a5fc3(0x26e)](),SceneManager[_0x4a5fc3(0x2b6)][_0x4a5fc3(0x337)](),SceneManager['_scene']['_slotWindow'][_0x4a5fc3(0x3ea)](-0x1)),![];},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x264)]=function(){const _0x159a88=_0x23d1fb;return this[_0x159a88(0x43f)]?this[_0x159a88(0x43f)][_0x159a88(0x401)]:0x3;},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x2cf)]=function(){const _0xa9e33f=_0x23d1fb;if(this['isOpen']()&&this[_0xa9e33f(0x2a1)]&&SceneManager[_0xa9e33f(0x2b6)][_0xa9e33f(0x1f1)]===Scene_Equip){if(this['isHoverEnabled']()&&TouchInput[_0xa9e33f(0x260)]())this['onTouchSelectModernControls'](![]);else TouchInput[_0xa9e33f(0x244)]()&&this[_0xa9e33f(0x37d)](!![]);TouchInput[_0xa9e33f(0x2ee)]()&&this[_0xa9e33f(0x4ca)]();}},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x37d)]=function(_0x443b64){const _0x34f1a9=_0x23d1fb;this[_0x34f1a9(0x230)]=![];const _0xe25b94=this[_0x34f1a9(0x276)](),_0x4032b5=this[_0x34f1a9(0x307)](),_0x5a57d8=SceneManager[_0x34f1a9(0x2b6)]['_slotWindow'];if(_0x5a57d8['isOpen']()&&_0x5a57d8[_0x34f1a9(0x2a1)]){if(_0x4032b5>=0x0)_0x4032b5===this[_0x34f1a9(0x276)]()&&(this['_doubleTouch']=!![]),this['activate'](),this['select'](_0x4032b5);else _0x5a57d8['hitIndex']()>=0x0&&(this[_0x34f1a9(0x44f)](),this['deselect']());}_0x443b64&&this[_0x34f1a9(0x276)]()!==_0xe25b94&&this[_0x34f1a9(0x26e)]();},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x284)]=function(){const _0x1438c9=_0x23d1fb;this[_0x1438c9(0x42a)](),this[_0x1438c9(0x501)](),this[_0x1438c9(0x3eb)]();},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x3c3)]=function(){const _0x2924e4=_0x23d1fb;Window_HorzCommand[_0x2924e4(0x241)][_0x2924e4(0x3c3)][_0x2924e4(0x44b)](this),this[_0x2924e4(0x4f4)]();},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x42a)]=function(){const _0x1985b4=_0x23d1fb;if(!this[_0x1985b4(0x222)]())return;const _0x8d1a95=this[_0x1985b4(0x51c)](),_0x5ecc8c=VisuMZ[_0x1985b4(0x248)][_0x1985b4(0x357)]['EquipScene'][_0x1985b4(0x271)],_0x1abab0=_0x8d1a95===_0x1985b4(0x2b3)?TextManager[_0x1985b4(0x353)]:_0x1985b4(0x322)[_0x1985b4(0x325)](_0x5ecc8c,TextManager[_0x1985b4(0x353)]),_0x6dcfcc=this[_0x1985b4(0x2c5)]();this[_0x1985b4(0x4bb)](_0x1abab0,_0x1985b4(0x2f2),_0x6dcfcc);},Window_EquipCommand[_0x23d1fb(0x241)]['isEquipCommandAdded']=function(){const _0x1297a0=_0x23d1fb;return!this[_0x1297a0(0x3bd)]();},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x2c5)]=function(){return!![];},Window_EquipCommand[_0x23d1fb(0x241)]['addOptimizeCommand']=function(){const _0x5004e1=_0x23d1fb;if(!this[_0x5004e1(0x278)]())return;const _0x3d5169=this['commandStyle'](),_0xd4daf2=VisuMZ[_0x5004e1(0x248)][_0x5004e1(0x357)][_0x5004e1(0x3af)][_0x5004e1(0x4d5)],_0x44f039=_0x3d5169===_0x5004e1(0x2b3)?TextManager['optimize']:'\x5cI[%1]%2'[_0x5004e1(0x325)](_0xd4daf2,TextManager[_0x5004e1(0x479)]),_0x4aa3ce=this['isOptimizeCommandEnabled']();this[_0x5004e1(0x4bb)](_0x44f039,_0x5004e1(0x479),_0x4aa3ce);},Window_EquipCommand[_0x23d1fb(0x241)]['isOptimizeCommandAdded']=function(){const _0x2a7a46=_0x23d1fb;return VisuMZ[_0x2a7a46(0x248)][_0x2a7a46(0x357)]['EquipScene'][_0x2a7a46(0x3df)];},Window_EquipCommand['prototype'][_0x23d1fb(0x4d3)]=function(){return!![];},Window_EquipCommand[_0x23d1fb(0x241)]['addClearCommand']=function(){const _0x3ab012=_0x23d1fb;if(!this[_0x3ab012(0x470)]())return;const _0x9c0034=this[_0x3ab012(0x51c)](),_0x3a0753=VisuMZ['ItemsEquipsCore'][_0x3ab012(0x357)][_0x3ab012(0x3af)][_0x3ab012(0x19e)],_0x2f6e4f=_0x9c0034===_0x3ab012(0x2b3)?TextManager[_0x3ab012(0x475)]:'\x5cI[%1]%2'[_0x3ab012(0x325)](_0x3a0753,TextManager['clear']),_0xf4e175=this['isClearCommandEnabled']();this['addCommand'](_0x2f6e4f,_0x3ab012(0x475),_0xf4e175);},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x470)]=function(){const _0x3a8eab=_0x23d1fb;return VisuMZ[_0x3a8eab(0x248)][_0x3a8eab(0x357)]['EquipScene'][_0x3a8eab(0x4c0)];},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x182)]=function(){return!![];},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x1c7)]=function(){const _0xd0a2c9=_0x23d1fb;return VisuMZ['ItemsEquipsCore'][_0xd0a2c9(0x357)][_0xd0a2c9(0x3af)]['CmdTextAlign'];},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x453)]=function(_0x4ec694){const _0x5d1d72=_0x23d1fb,_0x15a27f=this[_0x5d1d72(0x4c9)](_0x4ec694);if(_0x15a27f===_0x5d1d72(0x262))this[_0x5d1d72(0x2e4)](_0x4ec694);else _0x15a27f===_0x5d1d72(0x49f)?this[_0x5d1d72(0x245)](_0x4ec694):Window_HorzCommand[_0x5d1d72(0x241)]['drawItem'][_0x5d1d72(0x44b)](this,_0x4ec694);},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x51c)]=function(){const _0x38a18e=_0x23d1fb;return VisuMZ['ItemsEquipsCore'][_0x38a18e(0x357)][_0x38a18e(0x3af)][_0x38a18e(0x3ae)];},Window_EquipCommand['prototype'][_0x23d1fb(0x4c9)]=function(_0x28e662){const _0x43e4f6=_0x23d1fb;if(_0x28e662<0x0)return _0x43e4f6(0x2b3);const _0xb5d125=this[_0x43e4f6(0x51c)]();if(_0xb5d125!==_0x43e4f6(0x282))return _0xb5d125;else{if(this[_0x43e4f6(0x22a)]()>0x0){const _0x4d96b5=this[_0x43e4f6(0x393)](_0x28e662);if(_0x4d96b5[_0x43e4f6(0x2fc)](/\\I\[(\d+)\]/i)){const _0x368932=this[_0x43e4f6(0x387)](_0x28e662),_0x323f5d=this[_0x43e4f6(0x1fc)](_0x4d96b5)['width'];return _0x323f5d<=_0x368932[_0x43e4f6(0x3f4)]?_0x43e4f6(0x262):_0x43e4f6(0x49f);}}}return'text';},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x2e4)]=function(_0x568417){const _0x59671a=_0x23d1fb,_0x1128de=this[_0x59671a(0x387)](_0x568417),_0xb4edd3=this[_0x59671a(0x393)](_0x568417),_0x42a652=this[_0x59671a(0x1fc)](_0xb4edd3)[_0x59671a(0x3f4)];this[_0x59671a(0x45c)](this[_0x59671a(0x42d)](_0x568417));const _0x45e933=this[_0x59671a(0x1c7)]();if(_0x45e933===_0x59671a(0x3cb))this[_0x59671a(0x4d0)](_0xb4edd3,_0x1128de['x']+_0x1128de[_0x59671a(0x3f4)]-_0x42a652,_0x1128de['y'],_0x42a652);else{if(_0x45e933===_0x59671a(0x1db)){const _0x2b4a5e=_0x1128de['x']+Math[_0x59671a(0x312)]((_0x1128de[_0x59671a(0x3f4)]-_0x42a652)/0x2);this[_0x59671a(0x4d0)](_0xb4edd3,_0x2b4a5e,_0x1128de['y'],_0x42a652);}else this[_0x59671a(0x4d0)](_0xb4edd3,_0x1128de['x'],_0x1128de['y'],_0x42a652);}},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x245)]=function(_0x5ac661){const _0x1fb789=_0x23d1fb;this[_0x1fb789(0x393)](_0x5ac661)[_0x1fb789(0x2fc)](/\\I\[(\d+)\]/i);const _0x506fcf=Number(RegExp['$1'])||0x0,_0x500f75=this[_0x1fb789(0x387)](_0x5ac661),_0x1d75ec=_0x500f75['x']+Math[_0x1fb789(0x312)]((_0x500f75[_0x1fb789(0x3f4)]-ImageManager[_0x1fb789(0x431)])/0x2),_0x409169=_0x500f75['y']+(_0x500f75[_0x1fb789(0x1f9)]-ImageManager[_0x1fb789(0x31e)])/0x2;this[_0x1fb789(0x48a)](_0x506fcf,_0x1d75ec,_0x409169);},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x383)]=function(){const _0x4abd5d=_0x23d1fb,_0x35a56d=SceneManager[_0x4abd5d(0x2b6)];if(_0x35a56d&&_0x35a56d[_0x4abd5d(0x2e3)])return _0x35a56d[_0x4abd5d(0x2e3)]();return null;},Window_EquipCommand[_0x23d1fb(0x241)][_0x23d1fb(0x4f1)]=function(){const _0x57dcba=_0x23d1fb;Window_Command[_0x57dcba(0x241)][_0x57dcba(0x4f1)][_0x57dcba(0x44b)](this),this[_0x57dcba(0x22c)]['setText'](this[_0x57dcba(0x23d)]());},Window_EquipCommand['prototype'][_0x23d1fb(0x23d)]=function(){const _0x5a70cf=_0x23d1fb,_0x409d61=this['currentSymbol']();switch(_0x409d61){case'equip':return TextManager[_0x5a70cf(0x4dd)][_0x5a70cf(0x216)][_0x5a70cf(0x2f2)];case _0x5a70cf(0x479):return TextManager[_0x5a70cf(0x4dd)][_0x5a70cf(0x216)]['optimize'];case _0x5a70cf(0x475):return TextManager[_0x5a70cf(0x4dd)]['helpDesc']['clear'];default:return'';}},Window_EquipSlot[_0x23d1fb(0x241)][_0x23d1fb(0x3bd)]=function(){const _0xa01550=_0x23d1fb;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand['prototype'][_0xa01550(0x3bd)]['call'](this);},Window_EquipSlot[_0x23d1fb(0x241)][_0x23d1fb(0x408)]=function(){const _0x11ed16=_0x23d1fb;Window_StatusBase[_0x11ed16(0x241)]['activate'][_0x11ed16(0x44b)](this),this[_0x11ed16(0x2c2)]();},Window_EquipSlot['prototype'][_0x23d1fb(0x51b)]=function(){const _0x48fdfb=_0x23d1fb;Window_StatusBase['prototype'][_0x48fdfb(0x51b)][_0x48fdfb(0x44b)](this),this[_0x48fdfb(0x482)]();},Window_EquipSlot[_0x23d1fb(0x241)]['checkShiftRemoveShortcut']=function(){const _0x266318=_0x23d1fb;if(!this[_0x266318(0x186)]())return;if(Input[_0x266318(0x244)](_0x266318(0x329))&&this[_0x266318(0x320)]()){const _0x472909=SceneManager[_0x266318(0x2b6)][_0x266318(0x255)];_0x472909&&(this[_0x266318(0x3fb)](this['index']())?(this[_0x266318(0x28a)](),this[_0x266318(0x4f1)]()):this[_0x266318(0x21a)]());}},Window_EquipSlot[_0x23d1fb(0x241)][_0x23d1fb(0x3fb)]=function(_0x1e7e48){const _0x1fc0d0=_0x23d1fb,_0x4f39d2=SceneManager['_scene']['_actor'];if(!_0x4f39d2)return;if(!_0x4f39d2[_0x1fc0d0(0x3c8)](this['index']()))return![];const _0xa0c2fe=_0x4f39d2[_0x1fc0d0(0x3c7)]()[this[_0x1fc0d0(0x276)]()];if(_0x4f39d2['nonRemovableEtypes']()[_0x1fc0d0(0x39a)](_0xa0c2fe))return![];return!![];;},Window_EquipSlot[_0x23d1fb(0x241)]['processShiftRemoveShortcut']=function(){const _0x34a3ce=_0x23d1fb;SoundManager[_0x34a3ce(0x508)]();const _0x583a84=SceneManager[_0x34a3ce(0x2b6)][_0x34a3ce(0x255)];_0x583a84[_0x34a3ce(0x2eb)](this[_0x34a3ce(0x276)](),null),this[_0x34a3ce(0x3c3)](),this[_0x34a3ce(0x468)][_0x34a3ce(0x3c3)](),this['callUpdateHelp']();const _0x5907ec=SceneManager[_0x34a3ce(0x2b6)][_0x34a3ce(0x24d)];if(_0x5907ec)_0x5907ec['refresh']();},Window_EquipSlot[_0x23d1fb(0x241)][_0x23d1fb(0x186)]=function(){const _0x5df5f2=_0x23d1fb;if(!this[_0x5df5f2(0x235)])return![];if(!VisuMZ['ItemsEquipsCore']['Settings'][_0x5df5f2(0x3af)][_0x5df5f2(0x29b)])return![];return!![];},Window_EquipSlot[_0x23d1fb(0x241)][_0x23d1fb(0x34d)]=function(){const _0x25f641=_0x23d1fb;!this[_0x25f641(0x197)]()&&Window_StatusBase[_0x25f641(0x241)][_0x25f641(0x34d)]['call'](this);},Window_EquipSlot[_0x23d1fb(0x241)][_0x23d1fb(0x197)]=function(){const _0x450fda=_0x23d1fb;if(!this[_0x450fda(0x351)]())return![];if(SceneManager['_scene'][_0x450fda(0x1f1)]!==Scene_Equip)return![];if(this[_0x450fda(0x1f4)]())return this[_0x450fda(0x26e)](),Input[_0x450fda(0x475)](),SceneManager[_0x450fda(0x2b6)][_0x450fda(0x3a0)](),![];else{if(Input['isRepeated'](_0x450fda(0x523))){const _0x1d7970=this[_0x450fda(0x276)]();return Input[_0x450fda(0x220)](_0x450fda(0x329))?this['cursorPagedown']():this['cursorDown'](Input[_0x450fda(0x244)](_0x450fda(0x523))),this[_0x450fda(0x276)]()!==_0x1d7970&&this[_0x450fda(0x26e)](),!![];}else{if(this[_0x450fda(0x3e9)]()&&Input[_0x450fda(0x244)]('shift'))return!![];}}return![];},Window_EquipSlot['prototype'][_0x23d1fb(0x1f4)]=function(){const _0xb9392c=_0x23d1fb;if(this[_0xb9392c(0x276)]()!==0x0)return![];const _0xc408d0=VisuMZ[_0xb9392c(0x248)][_0xb9392c(0x357)][_0xb9392c(0x3af)];if(!_0xc408d0[_0xb9392c(0x3df)]&&!_0xc408d0[_0xb9392c(0x4c0)])return![];return Input[_0xb9392c(0x244)]('up');},Window_EquipSlot[_0x23d1fb(0x241)][_0x23d1fb(0x3e9)]=function(){const _0x36813d=_0x23d1fb;return VisuMZ['ItemsEquipsCore'][_0x36813d(0x357)][_0x36813d(0x3af)]['ShiftShortcutKey'];},Window_EquipSlot[_0x23d1fb(0x241)][_0x23d1fb(0x2cf)]=function(){const _0x4deb4a=_0x23d1fb;if(this['isOpen']()&&this['visible']&&SceneManager[_0x4deb4a(0x2b6)]['constructor']===Scene_Equip){if(this[_0x4deb4a(0x191)]()&&TouchInput[_0x4deb4a(0x260)]())this[_0x4deb4a(0x37d)](![]);else TouchInput[_0x4deb4a(0x244)]()&&this[_0x4deb4a(0x37d)](!![]);if(TouchInput[_0x4deb4a(0x2ee)]())this[_0x4deb4a(0x4ca)]();else TouchInput[_0x4deb4a(0x29d)]()&&this['onTouchCancel']();}},Window_EquipSlot[_0x23d1fb(0x241)][_0x23d1fb(0x37d)]=function(_0x4ee040){const _0x2dac8c=_0x23d1fb;this[_0x2dac8c(0x230)]=![];const _0x43f38b=this[_0x2dac8c(0x276)](),_0x41ed80=this[_0x2dac8c(0x307)](),_0x3e6c4c=SceneManager[_0x2dac8c(0x2b6)]['_commandWindow'];if(_0x3e6c4c[_0x2dac8c(0x340)]()&&_0x3e6c4c[_0x2dac8c(0x2a1)]){if(_0x41ed80>=0x0)_0x41ed80===this[_0x2dac8c(0x276)]()&&(this[_0x2dac8c(0x230)]=!![]),this[_0x2dac8c(0x408)](),this[_0x2dac8c(0x435)](_0x41ed80);else _0x3e6c4c['hitIndex']()>=0x0&&(this['deactivate'](),this[_0x2dac8c(0x4e5)]());}_0x4ee040&&this[_0x2dac8c(0x276)]()!==_0x43f38b&&this['playCursorSound']();},Window_EquipSlot[_0x23d1fb(0x241)][_0x23d1fb(0x2ce)]=function(){const _0x4dc060=_0x23d1fb;return this[_0x4dc060(0x276)]();},VisuMZ[_0x23d1fb(0x248)]['Window_EquipItem_includes']=Window_EquipItem[_0x23d1fb(0x241)]['includes'],Window_EquipItem[_0x23d1fb(0x241)][_0x23d1fb(0x39a)]=function(_0x2d6a22){const _0x52fb3b=_0x23d1fb;return _0x2d6a22===null&&this[_0x52fb3b(0x1e6)]()[_0x52fb3b(0x39a)](this[_0x52fb3b(0x394)]())?![]:VisuMZ[_0x52fb3b(0x248)][_0x52fb3b(0x39b)]['call'](this,_0x2d6a22);},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x40b)]=Window_EquipItem[_0x23d1fb(0x241)][_0x23d1fb(0x3c6)],Window_EquipItem['prototype'][_0x23d1fb(0x3c6)]=function(_0x2c5485){const _0x3ff7d8=_0x23d1fb;if(_0x2c5485&&this['_actor']){if(this['itemHasEquipLimit'](_0x2c5485))return![];if(this[_0x3ff7d8(0x494)](_0x2c5485))return![];if(this[_0x3ff7d8(0x253)](_0x2c5485))return![];}if(!_0x2c5485)return!this[_0x3ff7d8(0x1e6)]()['includes'](this[_0x3ff7d8(0x394)]());return VisuMZ[_0x3ff7d8(0x248)]['Window_EquipItem_isEnabled'][_0x3ff7d8(0x44b)](this,_0x2c5485);},Window_EquipItem[_0x23d1fb(0x241)][_0x23d1fb(0x2a3)]=function(_0x237949){const _0x20b8bb=_0x23d1fb,_0x591373=_0x237949[_0x20b8bb(0x4fe)];if(_0x591373['match'](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){const _0x407dac=Number(RegExp['$1'])||0x1;let _0xdd0974=0x0;const _0x1f9e83=this['_actor'][_0x20b8bb(0x38e)](),_0x1bd402=SceneManager[_0x20b8bb(0x2b6)][_0x20b8bb(0x4c4)][_0x20b8bb(0x2ce)]();_0x1f9e83[_0x1bd402]=null;for(const _0x5ed6d4 of _0x1f9e83){if(!_0x5ed6d4)continue;if(DataManager[_0x20b8bb(0x4ad)](_0x237949)===DataManager['isWeapon'](_0x5ed6d4)){if(_0x237949['id']===_0x5ed6d4['id'])_0xdd0974+=0x1;}}return _0xdd0974>=_0x407dac;}else return![];},Window_EquipItem[_0x23d1fb(0x241)][_0x23d1fb(0x494)]=function(_0x379e45){const _0x41da77=_0x23d1fb;if(!DataManager[_0x41da77(0x4ad)](_0x379e45))return![];const _0x3b9863=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x6cec07=0x0;const _0x236c69=this[_0x41da77(0x255)]['equips'](),_0x3122ec=SceneManager['_scene']['_slotWindow']['equipSlotIndex']();_0x236c69[_0x3122ec]=null;for(const _0x25cff8 of _0x236c69){if(!_0x25cff8)continue;if(!DataManager[_0x41da77(0x4ad)](_0x25cff8))continue;if(_0x379e45[_0x41da77(0x471)]===_0x25cff8[_0x41da77(0x471)]){_0x6cec07+=0x1;if(_0x379e45[_0x41da77(0x4fe)][_0x41da77(0x2fc)](_0x3b9863)){const _0x8275af=Number(RegExp['$1'])||0x1;if(_0x6cec07>=_0x8275af)return!![];}if(_0x25cff8[_0x41da77(0x4fe)][_0x41da77(0x2fc)](_0x3b9863)){const _0x34958b=Number(RegExp['$1'])||0x1;if(_0x6cec07>=_0x34958b)return!![];}}}return![];},Window_EquipItem[_0x23d1fb(0x241)][_0x23d1fb(0x253)]=function(_0x1f8005){const _0x2e88b4=_0x23d1fb;if(!DataManager[_0x2e88b4(0x2bb)](_0x1f8005))return![];const _0x234198=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x156286=0x0;const _0x57d06b=this['_actor'][_0x2e88b4(0x38e)](),_0xeade4a=SceneManager[_0x2e88b4(0x2b6)]['_slotWindow'][_0x2e88b4(0x2ce)]();_0x57d06b[_0xeade4a]=null;for(const _0x1b8d80 of _0x57d06b){if(!_0x1b8d80)continue;if(!DataManager[_0x2e88b4(0x2bb)](_0x1b8d80))continue;if(_0x1f8005[_0x2e88b4(0x22e)]===_0x1b8d80['atypeId']){_0x156286+=0x1;if(_0x1f8005[_0x2e88b4(0x4fe)]['match'](_0x234198)){const _0x4a5141=Number(RegExp['$1'])||0x1;if(_0x156286>=_0x4a5141)return!![];}if(_0x1b8d80[_0x2e88b4(0x4fe)][_0x2e88b4(0x2fc)](_0x234198)){const _0x1804d=Number(RegExp['$1'])||0x1;if(_0x156286>=_0x1804d)return!![];}}}return![];},Window_EquipItem[_0x23d1fb(0x241)][_0x23d1fb(0x1e6)]=function(){const _0x2130ec=_0x23d1fb;return VisuMZ['ItemsEquipsCore'][_0x2130ec(0x357)][_0x2130ec(0x3af)][_0x2130ec(0x412)];},Window_EquipItem['prototype'][_0x23d1fb(0x453)]=function(_0x239bfe){const _0x47683a=_0x23d1fb,_0x541f93=this[_0x47683a(0x215)](_0x239bfe);_0x541f93?Window_ItemList['prototype'][_0x47683a(0x453)][_0x47683a(0x44b)](this,_0x239bfe):this[_0x47683a(0x1bb)](_0x239bfe);},Window_EquipItem[_0x23d1fb(0x241)][_0x23d1fb(0x1bb)]=function(_0x3bd21a){const _0xcc9de7=_0x23d1fb;this[_0xcc9de7(0x45c)](this[_0xcc9de7(0x3c6)](null));const _0x59a7da=VisuMZ[_0xcc9de7(0x248)]['Settings']['EquipScene'],_0x2616aa=this[_0xcc9de7(0x387)](_0x3bd21a),_0x58087d=_0x2616aa['y']+(this['lineHeight']()-ImageManager[_0xcc9de7(0x31e)])/0x2,_0x4d0529=ImageManager[_0xcc9de7(0x431)]+0x4,_0x3bbc08=Math[_0xcc9de7(0x2e0)](0x0,_0x2616aa[_0xcc9de7(0x3f4)]-_0x4d0529);this[_0xcc9de7(0x29a)](),this[_0xcc9de7(0x48a)](_0x59a7da[_0xcc9de7(0x44a)],_0x2616aa['x'],_0x58087d),this[_0xcc9de7(0x341)](_0x59a7da[_0xcc9de7(0x423)],_0x2616aa['x']+_0x4d0529,_0x2616aa['y'],_0x3bbc08),this[_0xcc9de7(0x45c)](!![]);},Window_EquipItem[_0x23d1fb(0x241)][_0x23d1fb(0x4f1)]=function(){const _0x210dc0=_0x23d1fb;Window_ItemList[_0x210dc0(0x241)][_0x210dc0(0x4f1)][_0x210dc0(0x44b)](this);if(this[_0x210dc0(0x255)]&&this[_0x210dc0(0x24d)]&&this['_slotId']>=0x0){const _0x224f7d=JsonEx[_0x210dc0(0x213)](this['_actor']);_0x224f7d[_0x210dc0(0x31b)]=!![],_0x224f7d[_0x210dc0(0x507)](this[_0x210dc0(0x203)],this[_0x210dc0(0x320)]()),this[_0x210dc0(0x24d)][_0x210dc0(0x3e3)](_0x224f7d);}},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x1bd)]=Window_ShopCommand[_0x23d1fb(0x241)][_0x23d1fb(0x415)],Window_ShopCommand[_0x23d1fb(0x241)]['initialize']=function(_0x5200b6){const _0x2a53b9=_0x23d1fb;VisuMZ['ItemsEquipsCore'][_0x2a53b9(0x1bd)][_0x2a53b9(0x44b)](this,_0x5200b6),this[_0x2a53b9(0x50b)](_0x5200b6);},Window_ShopCommand[_0x23d1fb(0x241)][_0x23d1fb(0x50b)]=function(_0x50bd74){const _0x1e703c=_0x23d1fb,_0x1c9a82=new Rectangle(0x0,0x0,_0x50bd74['width'],_0x50bd74[_0x1e703c(0x1f9)]);this[_0x1e703c(0x3cf)]=new Window_Base(_0x1c9a82),this[_0x1e703c(0x3cf)][_0x1e703c(0x1d7)]=0x0,this[_0x1e703c(0x3bb)](this[_0x1e703c(0x3cf)]),this['updateCommandNameWindow']();},Window_ShopCommand[_0x23d1fb(0x241)]['callUpdateHelp']=function(){const _0x11099f=_0x23d1fb;Window_HorzCommand[_0x11099f(0x241)][_0x11099f(0x2c2)][_0x11099f(0x44b)](this);if(this[_0x11099f(0x3cf)])this['updateCommandNameWindow']();},Window_ShopCommand[_0x23d1fb(0x241)]['updateCommandNameWindow']=function(){const _0x1b4299=_0x23d1fb,_0x3c1264=this['_commandNameWindow'];_0x3c1264[_0x1b4299(0x1c5)][_0x1b4299(0x475)]();const _0x2d5412=this[_0x1b4299(0x4c9)](this['index']());if(_0x2d5412===_0x1b4299(0x49f)){const _0x32a0e3=this[_0x1b4299(0x387)](this['index']());let _0x54bc76=this['commandName'](this[_0x1b4299(0x276)]());_0x54bc76=_0x54bc76[_0x1b4299(0x3d6)](/\\I\[(\d+)\]/gi,''),_0x3c1264[_0x1b4299(0x425)](),this[_0x1b4299(0x250)](_0x54bc76,_0x32a0e3),this[_0x1b4299(0x46e)](_0x54bc76,_0x32a0e3),this[_0x1b4299(0x490)](_0x54bc76,_0x32a0e3);}},Window_ShopCommand[_0x23d1fb(0x241)]['commandNameWindowDrawBackground']=function(_0x5bcac5,_0xf75d8e){},Window_ShopCommand[_0x23d1fb(0x241)][_0x23d1fb(0x46e)]=function(_0x362db9,_0x25116e){const _0x326fb6=_0x23d1fb,_0x1d1c0b=this['_commandNameWindow'];_0x1d1c0b[_0x326fb6(0x341)](_0x362db9,0x0,_0x25116e['y'],_0x1d1c0b[_0x326fb6(0x4a8)],_0x326fb6(0x1db));},Window_ShopCommand[_0x23d1fb(0x241)][_0x23d1fb(0x490)]=function(_0x15025b,_0x2b784e){const _0x12753f=_0x23d1fb,_0x256a0b=this['_commandNameWindow'],_0x463c26=$gameSystem[_0x12753f(0x379)](),_0x52d29e=_0x2b784e['x']+Math['floor'](_0x2b784e[_0x12753f(0x3f4)]/0x2)+_0x463c26;_0x256a0b['x']=_0x256a0b[_0x12753f(0x3f4)]/-0x2+_0x52d29e,_0x256a0b['y']=Math[_0x12753f(0x312)](_0x2b784e[_0x12753f(0x1f9)]/0x2);},Window_ShopCommand['prototype'][_0x23d1fb(0x264)]=function(){const _0x19dd18=_0x23d1fb;return this['_list']?this['_list'][_0x19dd18(0x401)]:0x3;},Window_ShopCommand[_0x23d1fb(0x241)][_0x23d1fb(0x418)]=function(){const _0x3a592d=_0x23d1fb;return VisuMZ[_0x3a592d(0x248)][_0x3a592d(0x357)][_0x3a592d(0x3db)][_0x3a592d(0x4a6)];},Window_ShopCommand[_0x23d1fb(0x241)]['makeCommandList']=function(){const _0x4fa258=_0x23d1fb;this[_0x4fa258(0x51a)](),this[_0x4fa258(0x2d9)](),this[_0x4fa258(0x4f5)]();},Window_ShopCommand[_0x23d1fb(0x241)][_0x23d1fb(0x3c3)]=function(){const _0x4f2011=_0x23d1fb;Window_HorzCommand[_0x4f2011(0x241)]['refresh'][_0x4f2011(0x44b)](this),this['refreshCursor']();},Window_ShopCommand['prototype'][_0x23d1fb(0x51a)]=function(){const _0x5254e1=_0x23d1fb,_0x4dca7a=this[_0x5254e1(0x51c)](),_0x4219f7=VisuMZ['ItemsEquipsCore'][_0x5254e1(0x357)][_0x5254e1(0x3db)][_0x5254e1(0x1f5)],_0xfcc52=_0x4dca7a===_0x5254e1(0x2b3)?TextManager[_0x5254e1(0x198)]:_0x5254e1(0x322)[_0x5254e1(0x325)](_0x4219f7,TextManager[_0x5254e1(0x198)]),_0x3cfcd1=this[_0x5254e1(0x4ea)]();if(this[_0x5254e1(0x418)]()&&!_0x3cfcd1)return;this[_0x5254e1(0x4bb)](_0xfcc52,_0x5254e1(0x198),_0x3cfcd1);},Window_ShopCommand[_0x23d1fb(0x241)]['isBuyCommandEnabled']=function(){const _0x31e13f=_0x23d1fb;return SceneManager[_0x31e13f(0x2b6)][_0x31e13f(0x1f1)]===Scene_Shop?SceneManager['_scene'][_0x31e13f(0x21c)]>0x0:!![];},Window_ShopCommand[_0x23d1fb(0x241)][_0x23d1fb(0x2d9)]=function(){const _0x375840=_0x23d1fb,_0x2b7707=this[_0x375840(0x51c)](),_0x13707a=VisuMZ[_0x375840(0x248)][_0x375840(0x357)][_0x375840(0x3db)][_0x375840(0x476)],_0x1ef0a0=_0x2b7707===_0x375840(0x2b3)?TextManager['sell']:_0x375840(0x322)['format'](_0x13707a,TextManager[_0x375840(0x3d3)]),_0x16c75a=this['isSellCommandEnabled']();if(this[_0x375840(0x418)]()&&!_0x16c75a)return;this[_0x375840(0x4bb)](_0x1ef0a0,_0x375840(0x3d3),_0x16c75a);},Window_ShopCommand['prototype'][_0x23d1fb(0x243)]=function(){const _0x53a660=_0x23d1fb;return!this[_0x53a660(0x39f)];},Window_ShopCommand['prototype'][_0x23d1fb(0x4f5)]=function(){const _0x2f9266=_0x23d1fb,_0x20412d=this[_0x2f9266(0x51c)](),_0x5884eb=VisuMZ[_0x2f9266(0x248)][_0x2f9266(0x357)][_0x2f9266(0x3db)][_0x2f9266(0x406)],_0x2603fc=VisuMZ[_0x2f9266(0x248)][_0x2f9266(0x357)]['ShopScene'][_0x2f9266(0x2e7)],_0x13364a=_0x20412d==='text'?_0x2603fc:_0x2f9266(0x322)[_0x2f9266(0x325)](_0x5884eb,_0x2603fc);this['addCommand'](_0x13364a,_0x2f9266(0x2ff));},Window_ShopCommand[_0x23d1fb(0x241)][_0x23d1fb(0x1c7)]=function(){const _0x15e748=_0x23d1fb;return VisuMZ[_0x15e748(0x248)]['Settings'][_0x15e748(0x3db)][_0x15e748(0x20e)];},Window_ShopCommand[_0x23d1fb(0x241)][_0x23d1fb(0x453)]=function(_0x3e4aa9){const _0x195dc1=_0x23d1fb,_0x497436=this[_0x195dc1(0x4c9)](_0x3e4aa9);if(_0x497436===_0x195dc1(0x262))this['drawItemStyleIconText'](_0x3e4aa9);else _0x497436===_0x195dc1(0x49f)?this[_0x195dc1(0x245)](_0x3e4aa9):Window_HorzCommand[_0x195dc1(0x241)][_0x195dc1(0x453)][_0x195dc1(0x44b)](this,_0x3e4aa9);},Window_ShopCommand[_0x23d1fb(0x241)][_0x23d1fb(0x51c)]=function(){const _0x2a18ad=_0x23d1fb;return VisuMZ[_0x2a18ad(0x248)][_0x2a18ad(0x357)][_0x2a18ad(0x3db)][_0x2a18ad(0x3ae)];},Window_ShopCommand[_0x23d1fb(0x241)]['commandStyleCheck']=function(_0x1d5f8b){const _0x996993=_0x23d1fb;if(_0x1d5f8b<0x0)return _0x996993(0x2b3);const _0xdd79ff=this[_0x996993(0x51c)]();if(_0xdd79ff!=='auto')return _0xdd79ff;else{if(this[_0x996993(0x22a)]()>0x0){const _0x33401a=this[_0x996993(0x393)](_0x1d5f8b);if(_0x33401a['match'](/\\I\[(\d+)\]/i)){const _0x34698b=this[_0x996993(0x387)](_0x1d5f8b),_0x23d31c=this[_0x996993(0x1fc)](_0x33401a)['width'];return _0x23d31c<=_0x34698b[_0x996993(0x3f4)]?_0x996993(0x262):_0x996993(0x49f);}}}return _0x996993(0x2b3);},Window_ShopCommand['prototype'][_0x23d1fb(0x2e4)]=function(_0xee90b6){const _0x4b0fd7=_0x23d1fb,_0x22bb9a=this[_0x4b0fd7(0x387)](_0xee90b6),_0x5ee1a8=this[_0x4b0fd7(0x393)](_0xee90b6),_0x565379=this['textSizeEx'](_0x5ee1a8)[_0x4b0fd7(0x3f4)];this[_0x4b0fd7(0x45c)](this[_0x4b0fd7(0x42d)](_0xee90b6));const _0x2df355=this['itemTextAlign']();if(_0x2df355===_0x4b0fd7(0x3cb))this['drawTextEx'](_0x5ee1a8,_0x22bb9a['x']+_0x22bb9a[_0x4b0fd7(0x3f4)]-_0x565379,_0x22bb9a['y'],_0x565379);else{if(_0x2df355==='center'){const _0x2b8c38=_0x22bb9a['x']+Math[_0x4b0fd7(0x312)]((_0x22bb9a[_0x4b0fd7(0x3f4)]-_0x565379)/0x2);this[_0x4b0fd7(0x4d0)](_0x5ee1a8,_0x2b8c38,_0x22bb9a['y'],_0x565379);}else this[_0x4b0fd7(0x4d0)](_0x5ee1a8,_0x22bb9a['x'],_0x22bb9a['y'],_0x565379);}},Window_ShopCommand[_0x23d1fb(0x241)][_0x23d1fb(0x245)]=function(_0x1043df){const _0x385897=_0x23d1fb;this[_0x385897(0x393)](_0x1043df)[_0x385897(0x2fc)](/\\I\[(\d+)\]/i);const _0x339705=Number(RegExp['$1'])||0x0,_0x5938e7=this['itemLineRect'](_0x1043df),_0x22ec2d=_0x5938e7['x']+Math[_0x385897(0x312)]((_0x5938e7[_0x385897(0x3f4)]-ImageManager[_0x385897(0x431)])/0x2),_0x9fdd7d=_0x5938e7['y']+(_0x5938e7[_0x385897(0x1f9)]-ImageManager[_0x385897(0x31e)])/0x2;this[_0x385897(0x48a)](_0x339705,_0x22ec2d,_0x9fdd7d);},VisuMZ[_0x23d1fb(0x248)]['Window_ShopBuy_refresh']=Window_ShopBuy[_0x23d1fb(0x241)][_0x23d1fb(0x3c3)],Window_ShopBuy['prototype']['refresh']=function(){const _0x26ae8f=_0x23d1fb;this['updateMoneyAmount'](),VisuMZ[_0x26ae8f(0x248)][_0x26ae8f(0x2b9)][_0x26ae8f(0x44b)](this);},Window_ShopBuy[_0x23d1fb(0x241)][_0x23d1fb(0x518)]=function(){const _0x4c4c74=_0x23d1fb;SceneManager[_0x4c4c74(0x2b6)][_0x4c4c74(0x1f1)]===Scene_Shop&&(this['_money']=SceneManager['_scene'][_0x4c4c74(0x212)]());},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x247)]=Window_ShopBuy[_0x23d1fb(0x241)][_0x23d1fb(0x403)],Window_ShopBuy['prototype']['price']=function(_0x4c65d8){const _0x642fb2=_0x23d1fb;if(!_0x4c65d8)return 0x0;let _0xa09501=VisuMZ[_0x642fb2(0x248)][_0x642fb2(0x247)][_0x642fb2(0x44b)](this,_0x4c65d8);return Math['max'](0x0,this[_0x642fb2(0x3b2)](_0x4c65d8,_0xa09501));},Window_ShopBuy[_0x23d1fb(0x241)][_0x23d1fb(0x3b2)]=function(_0x3ecc58,_0x23ed6c){const _0x3aa075=_0x23d1fb,_0x1f6448=_0x3ecc58['note'];if(_0x1f6448[_0x3aa075(0x2fc)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x4c387e=String(RegExp['$1']);try{eval(_0x4c387e);}catch(_0x54b104){if($gameTemp[_0x3aa075(0x26d)]())console['log'](_0x54b104);}}_0x23ed6c=VisuMZ[_0x3aa075(0x248)]['Settings'][_0x3aa075(0x3db)][_0x3aa075(0x4eb)][_0x3aa075(0x44b)](this,_0x3ecc58,_0x23ed6c);if(isNaN(_0x23ed6c))_0x23ed6c=0x0;return Math[_0x3aa075(0x312)](_0x23ed6c);},Window_ShopBuy['prototype'][_0x23d1fb(0x453)]=function(_0x5be658){const _0x163423=_0x23d1fb;this[_0x163423(0x425)]();const _0x1bb2e5=this['itemAt'](_0x5be658),_0x3e0363=this[_0x163423(0x387)](_0x5be658),_0x5057cd=_0x3e0363[_0x163423(0x3f4)];this[_0x163423(0x45c)](this['isEnabled'](_0x1bb2e5)),this[_0x163423(0x1a2)](_0x1bb2e5,_0x3e0363['x'],_0x3e0363['y'],_0x5057cd),this[_0x163423(0x488)](_0x1bb2e5,_0x3e0363),this['changePaintOpacity'](!![]);},Window_ShopBuy['prototype'][_0x23d1fb(0x488)]=function(_0x218dc8,_0x465414){const _0x5e0f39=_0x23d1fb,_0x510c87=this[_0x5e0f39(0x403)](_0x218dc8);this[_0x5e0f39(0x28b)](_0x510c87,TextManager[_0x5e0f39(0x1d3)],_0x465414['x'],_0x465414['y'],_0x465414['width']);},Window_ShopSell[_0x23d1fb(0x241)][_0x23d1fb(0x264)]=function(){const _0x179d3c=_0x23d1fb;return SceneManager[_0x179d3c(0x2b6)]['isUseItemsEquipsCoreUpdatedLayout']()?0x1:0x2;},VisuMZ[_0x23d1fb(0x248)][_0x23d1fb(0x404)]=Window_ShopSell['prototype'][_0x23d1fb(0x3c6)],Window_ShopSell[_0x23d1fb(0x241)][_0x23d1fb(0x3c6)]=function(_0x3b895d){const _0x3fd389=_0x23d1fb;if(!_0x3b895d)return![];const _0x24aced=_0x3b895d[_0x3fd389(0x4fe)];if(_0x24aced[_0x3fd389(0x2fc)](/<CANNOT SELL>/i))return![];if(_0x24aced[_0x3fd389(0x2fc)](/<CAN SELL>/i))return!![];if(_0x24aced['match'](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5ba278=JSON[_0x3fd389(0x257)]('['+RegExp['$1'][_0x3fd389(0x2fc)](/\d+/g)+']');for(const _0xd9484f of _0x5ba278){if(!$gameSwitches[_0x3fd389(0x3f6)](_0xd9484f))return![];}}if(_0x24aced[_0x3fd389(0x2fc)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x71b6b1=JSON[_0x3fd389(0x257)]('['+RegExp['$1'][_0x3fd389(0x2fc)](/\d+/g)+']');for(const _0x22dcf1 of _0x71b6b1){if(!$gameSwitches[_0x3fd389(0x3f6)](_0x22dcf1))return![];}}if(_0x24aced['match'](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x247085=JSON[_0x3fd389(0x257)]('['+RegExp['$1'][_0x3fd389(0x2fc)](/\d+/g)+']');for(const _0x262a46 of _0x247085){if($gameSwitches['value'](_0x262a46))return![];}}return VisuMZ[_0x3fd389(0x248)]['Window_ShopSell_isEnabled'][_0x3fd389(0x44b)](this,_0x3b895d);},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x25a)]=function(){return![];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x1dc)]=function(){const _0x4f015c=_0x23d1fb;Window_StatusBase['prototype'][_0x4f015c(0x1dc)][_0x4f015c(0x44b)](this);for(const _0x50079e of $gameParty[_0x4f015c(0x368)]()){ImageManager[_0x4f015c(0x3a8)](_0x50079e[_0x4f015c(0x51e)]());}},Window_ShopStatus['prototype'][_0x23d1fb(0x500)]=function(){const _0x2de6bf=_0x23d1fb;return VisuMZ[_0x2de6bf(0x248)]['Settings'][_0x2de6bf(0x4c6)][_0x2de6bf(0x460)];},Window_ShopStatus[_0x23d1fb(0x241)]['refresh']=function(){const _0x8ce33e=_0x23d1fb;this[_0x8ce33e(0x1c5)]['clear'](),this['contentsBack']['clear'](),this[_0x8ce33e(0x2bc)]&&(this[_0x8ce33e(0x425)](),this[_0x8ce33e(0x45c)](!![]),this[_0x8ce33e(0x28d)](),this['isEquipItem']()?this['drawEquipData']():this[_0x8ce33e(0x18f)](),this[_0x8ce33e(0x3b6)]());},Window_ShopStatus['prototype'][_0x23d1fb(0x3bc)]=function(_0x569e54,_0x1d82f0){const _0x476880=_0x23d1fb;if(!this[_0x476880(0x52b)]()&&!DataManager[_0x476880(0x1ac)](this[_0x476880(0x2bc)]))return;const _0x3b0543=this[_0x476880(0x4a8)]-this[_0x476880(0x2a5)]()-_0x569e54,_0xc5d043=this[_0x476880(0x2cc)](_0x476880(0x2d0));this[_0x476880(0x391)](ColorManager[_0x476880(0x4b6)]()),this[_0x476880(0x341)](TextManager['possession'],_0x569e54+this[_0x476880(0x2a5)](),_0x1d82f0,_0x3b0543-_0xc5d043),this[_0x476880(0x29a)](),this[_0x476880(0x522)](this[_0x476880(0x2bc)],_0x569e54,_0x1d82f0,_0x3b0543);},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x23b)]=function(_0x47497c,_0x32ddc2,_0x22e920,_0x30f3e7,_0x693791){const _0x113228=_0x23d1fb;if(VisuMZ[_0x113228(0x248)][_0x113228(0x357)]['StatusWindow']['DrawBackRect']===![])return;_0x693791=Math[_0x113228(0x2e0)](_0x693791||0x1,0x1);while(_0x693791--){_0x30f3e7=_0x30f3e7||this[_0x113228(0x314)](),this[_0x113228(0x4bf)][_0x113228(0x4f7)]=0xa0;const _0x3fa239=ColorManager[_0x113228(0x46a)]();this[_0x113228(0x4bf)][_0x113228(0x409)](_0x47497c+0x1,_0x32ddc2+0x1,_0x22e920-0x2,_0x30f3e7-0x2,_0x3fa239),this[_0x113228(0x4bf)]['paintOpacity']=0xff;}},ColorManager[_0x23d1fb(0x46a)]=function(){const _0x1eb338=_0x23d1fb,_0x2b0a47=VisuMZ[_0x1eb338(0x248)][_0x1eb338(0x357)]['StatusWindow'];let _0x12e7d6=_0x2b0a47[_0x1eb338(0x19a)]!==undefined?_0x2b0a47[_0x1eb338(0x19a)]:0x13;return ColorManager[_0x1eb338(0x3c5)](_0x12e7d6);},Window_ShopStatus[_0x23d1fb(0x241)]['drawEquipData']=function(){const _0x1b5310=_0x23d1fb;if(VisuMZ[_0x1b5310(0x248)][_0x1b5310(0x357)][_0x1b5310(0x4c6)][_0x1b5310(0x474)]){VisuMZ[_0x1b5310(0x248)][_0x1b5310(0x357)][_0x1b5310(0x4c6)][_0x1b5310(0x474)][_0x1b5310(0x44b)](this);return;}const _0x228333=this['lineHeight'](),_0x580af6=this[_0x1b5310(0x1a9)]()+0x8;let _0x3d4494=0x0,_0x54cf26=0x0,_0x2c8921=this[_0x1b5310(0x4a8)],_0x32517d=this['innerHeight'],_0x60a510=Math[_0x1b5310(0x312)](_0x2c8921/0x2),_0x21d19b=_0x3d4494+_0x2c8921-_0x60a510;this['drawItemName'](this[_0x1b5310(0x2bc)],_0x3d4494+this[_0x1b5310(0x2a5)](),_0x54cf26,_0x2c8921-this[_0x1b5310(0x2a5)]()*0x2),this[_0x1b5310(0x23b)](_0x3d4494,_0x54cf26,_0x2c8921),_0x54cf26+=_0x228333;if(this[_0x1b5310(0x28e)](_0x3d4494,_0x54cf26,_0x60a510))_0x54cf26+=0x0;if(this[_0x1b5310(0x483)](_0x21d19b,_0x54cf26,_0x60a510))_0x54cf26+=_0x228333;const _0x5b2cf1=this['actorParams'](),_0x3b2622=_0x54cf26;_0x54cf26=_0x32517d-_0x5b2cf1[_0x1b5310(0x401)]*_0x580af6-0x4;let _0x191840=_0x3d4494,_0x2b933b=0x0,_0x5817bd=_0x54cf26;for(const _0x507163 of _0x5b2cf1){_0x2b933b=Math['max'](this[_0x1b5310(0x369)](_0x507163,_0x3d4494+0x4,_0x54cf26+0x4,_0x2c8921),_0x2b933b),_0x54cf26+=_0x580af6;}const _0x1e8a2d=$gameParty['maxBattleMembers'](),_0x2e595c=Math[_0x1b5310(0x312)]((_0x2c8921-_0x2b933b)/_0x1e8a2d);_0x2b933b=_0x2c8921-_0x2e595c*_0x1e8a2d;for(const _0x450b89 of $gameParty[_0x1b5310(0x4a7)]()){const _0x10f044=$gameParty['battleMembers']()[_0x1b5310(0x41c)](_0x450b89),_0x332069=_0x191840+_0x2b933b+_0x10f044*_0x2e595c;this[_0x1b5310(0x45c)](_0x450b89[_0x1b5310(0x2fa)](this[_0x1b5310(0x2bc)])),this[_0x1b5310(0x3a5)](_0x450b89,_0x332069+_0x2e595c/0x2,_0x5817bd);let _0x5813d8=_0x5817bd;for(const _0x30b9b9 of _0x5b2cf1){const _0x2bcf84=_0x5813d8-(_0x228333-_0x580af6)/0x2;this[_0x1b5310(0x492)](_0x450b89,_0x30b9b9,_0x332069,_0x2bcf84,_0x2e595c),_0x5813d8+=_0x580af6;}}this['drawItemDarkRect'](_0x191840,_0x3b2622,_0x2b933b,_0x5817bd-_0x3b2622);for(let _0x10774e=0x0;_0x10774e<_0x1e8a2d;_0x10774e++){const _0x9cc6ed=_0x191840+_0x2b933b+_0x10774e*_0x2e595c;this[_0x1b5310(0x23b)](_0x9cc6ed,_0x3b2622,_0x2e595c,_0x5817bd-_0x3b2622);}for(const _0x522026 of _0x5b2cf1){this[_0x1b5310(0x23b)](_0x191840,_0x5817bd,_0x2b933b,_0x580af6);for(let _0x1f6a12=0x0;_0x1f6a12<_0x1e8a2d;_0x1f6a12++){const _0x217c99=_0x191840+_0x2b933b+_0x1f6a12*_0x2e595c;this['drawItemDarkRect'](_0x217c99,_0x5817bd,_0x2e595c,_0x580af6);}_0x5817bd+=_0x580af6;}},Window_ShopStatus['prototype'][_0x23d1fb(0x28e)]=function(_0x35ef21,_0x318275,_0x48273e){const _0x2e7d9f=_0x23d1fb;if(!this[_0x2e7d9f(0x52b)]())return![];const _0x2d3813=$dataSystem[_0x2e7d9f(0x1ab)][this['_item']['etypeId']];return this[_0x2e7d9f(0x34f)](_0x2d3813,_0x35ef21,_0x318275,_0x48273e,!![]),this['drawItemDarkRect'](_0x35ef21,_0x318275,_0x48273e),this[_0x2e7d9f(0x425)](),!![];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x2a8)]=function(){const _0x1287b8=_0x23d1fb,_0x5afb0f=VisuMZ[_0x1287b8(0x248)][_0x1287b8(0x357)][_0x1287b8(0x3fe)][_0x1287b8(0x517)];return _0x5afb0f[_0x1287b8(0x325)]($gameParty[_0x1287b8(0x4b0)](this['_item']));},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x3ee)]=function(){const _0x3c4948=_0x23d1fb;let _0x59acaf=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];return Imported[_0x3c4948(0x297)]&&(_0x59acaf=VisuMZ[_0x3c4948(0x305)][_0x3c4948(0x357)][_0x3c4948(0x4fc)][_0x3c4948(0x249)]),_0x59acaf=_0x59acaf[_0x3c4948(0x344)](_0x26a9c2=>typeof _0x26a9c2===_0x3c4948(0x204)?_0x26a9c2:_0x26a9c2[_0x3c4948(0x25d)]()[_0x3c4948(0x432)]()),_0x59acaf;},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x274)]=function(){const _0x59289c=_0x23d1fb;return VisuMZ[_0x59289c(0x248)][_0x59289c(0x357)][_0x59289c(0x4c6)]['ParamChangeFontSize'];},Window_ShopStatus[_0x23d1fb(0x241)]['drawParamName']=function(_0x37f611,_0x31fbbd,_0x48009d,_0x194874){const _0x4dd3fd=_0x23d1fb;this[_0x4dd3fd(0x425)](),this[_0x4dd3fd(0x1c5)]['fontSize']=this[_0x4dd3fd(0x274)]();let _0x50e4af=this['textWidth'](TextManager[_0x4dd3fd(0x3bf)](_0x37f611))+0x4+_0x31fbbd;return Imported[_0x4dd3fd(0x297)]?(this[_0x4dd3fd(0x47d)](_0x31fbbd,_0x48009d,_0x194874,_0x37f611,!![]),VisuMZ[_0x4dd3fd(0x305)][_0x4dd3fd(0x357)]['Param'][_0x4dd3fd(0x4e9)]&&(_0x50e4af+=ImageManager[_0x4dd3fd(0x431)]+0x4)):(this['changeTextColor'](ColorManager[_0x4dd3fd(0x4b6)]()),this[_0x4dd3fd(0x341)](TextManager['param'](_0x37f611),_0x31fbbd,_0x48009d,_0x194874)),this[_0x4dd3fd(0x425)](),_0x50e4af;},Window_ShopStatus['prototype']['drawActorParamDifference']=function(_0x33152c,_0x3520d9,_0x47e7ce,_0x143a3b,_0x5e214a){const _0x400393=_0x23d1fb;_0x47e7ce+=this['itemPadding'](),_0x5e214a-=this[_0x400393(0x2a5)]()*0x2;const _0x4562d5=VisuMZ['ItemsEquipsCore'][_0x400393(0x357)][_0x400393(0x4c6)];this['contents'][_0x400393(0x428)]=_0x4562d5[_0x400393(0x477)],this[_0x400393(0x45c)](_0x33152c[_0x400393(0x2fa)](this[_0x400393(0x2bc)]));if(_0x33152c[_0x400393(0x23f)](this['_item'])&&!_0x33152c[_0x400393(0x299)](this[_0x400393(0x2bc)])){const _0x56f5b9=_0x4562d5[_0x400393(0x298)];this[_0x400393(0x341)](_0x56f5b9,_0x47e7ce,_0x143a3b,_0x5e214a,_0x400393(0x1db));}else{if(_0x33152c[_0x400393(0x2fa)](this[_0x400393(0x2bc)])){const _0x55ec32=JsonEx['makeDeepCopy'](_0x33152c);_0x55ec32['_tempActor']=!![];const _0x97bf78=_0x55ec32[_0x400393(0x30c)](this['_item']);_0x97bf78>=0x0&&_0x55ec32[_0x400393(0x507)](_0x97bf78,this['_item']);let _0x3d293d=0x0,_0x2fc038=0x0,_0x446c38=0x0;Imported[_0x400393(0x297)]?(_0x3d293d=_0x55ec32[_0x400393(0x491)](_0x3520d9),_0x2fc038=_0x3d293d-_0x33152c[_0x400393(0x491)](_0x3520d9),this['changeTextColor'](ColorManager[_0x400393(0x317)](_0x2fc038)),_0x446c38=(_0x2fc038>=0x0?'+':'')+VisuMZ[_0x400393(0x1f2)](_0x2fc038,0x0,_0x3520d9)):(_0x3d293d=_0x55ec32[_0x400393(0x3bf)](_0x3520d9),_0x2fc038=_0x3d293d-_0x33152c[_0x400393(0x3bf)](_0x3520d9),this[_0x400393(0x391)](ColorManager[_0x400393(0x317)](_0x2fc038)),_0x446c38=(_0x2fc038>=0x0?'+':'')+_0x2fc038),_0x446c38==='+0'&&(_0x446c38=_0x4562d5[_0x400393(0x256)]),this[_0x400393(0x341)](_0x446c38,_0x47e7ce,_0x143a3b,_0x5e214a,_0x400393(0x1db));}else{const _0x59ea90=_0x4562d5[_0x400393(0x520)];this['drawText'](_0x59ea90,_0x47e7ce,_0x143a3b,_0x5e214a,_0x400393(0x1db));}}this['resetFontSettings'](),this[_0x400393(0x45c)](!![]);},Game_Actor[_0x23d1fb(0x241)]['anyEmptyEquipSlotsOfSameEtype']=function(_0x3d0b76){const _0x41fdcb=_0x23d1fb;if(!_0x3d0b76)return![];const _0x2c5b34=_0x3d0b76['etypeId'],_0xa40f72=this[_0x41fdcb(0x3c7)]();for(let _0x3f962e=0x0;_0x3f962e<_0xa40f72[_0x41fdcb(0x401)];_0x3f962e++){const _0x4f4a5a=_0xa40f72[_0x3f962e];if(_0x4f4a5a!==_0x2c5b34)continue;if(!this[_0x41fdcb(0x38e)]()[_0x3f962e])return!![];}return![];},Game_Actor[_0x23d1fb(0x241)][_0x23d1fb(0x30c)]=function(_0x372b9f){const _0x29e401=_0x23d1fb;if(!_0x372b9f)return-0x1;const _0x464152=_0x372b9f['etypeId'],_0x47a05b=this[_0x29e401(0x3c7)]();let _0x9aeada=-0x1;for(let _0x3d7af7=0x0;_0x3d7af7<_0x47a05b[_0x29e401(0x401)];_0x3d7af7++){const _0x48c9b7=_0x47a05b[_0x3d7af7];if(_0x48c9b7!==_0x464152)continue;if(!this['equips']()[_0x3d7af7])return _0x3d7af7;if(_0x9aeada<0x0)_0x9aeada=_0x3d7af7;}return _0x9aeada;},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x18f)]=function(){const _0x19f5af=_0x23d1fb;VisuMZ[_0x19f5af(0x248)][_0x19f5af(0x357)][_0x19f5af(0x4c6)]['DrawItemData'][_0x19f5af(0x44b)](this);},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x1a2)]=function(_0xca07e4,_0x2964d9,_0x3539ad,_0x9c008c){const _0x4f758b=_0x23d1fb,_0x400043=DataManager[_0x4f758b(0x3d9)](_0xca07e4,_0x2964d9,_0x3539ad,_0x9c008c)&&Imported[_0x4f758b(0x4b1)],_0x5c6631=_0xca07e4?_0xca07e4[_0x4f758b(0x285)]:'';if(_0x400043)Window_SkillList[_0x4f758b(0x241)]['alterSkillName'][_0x4f758b(0x44b)](this,_0xca07e4);Window_Base[_0x4f758b(0x241)][_0x4f758b(0x1a2)][_0x4f758b(0x44b)](this,_0xca07e4,_0x2964d9,_0x3539ad,_0x9c008c);if(_0x400043)_0xca07e4[_0x4f758b(0x285)]=_0x5c6631;},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x28d)]=function(){const _0x480907=_0x23d1fb;this[_0x480907(0x4c2)]={};if(!this[_0x480907(0x2bc)])return;const _0x4dbc3b=this[_0x480907(0x2bc)][_0x480907(0x4fe)];if(_0x4dbc3b[_0x480907(0x2fc)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x3081fa=String(RegExp['$1'])[_0x480907(0x504)](/[\r\n]+/);for(const _0x37559a of _0x3081fa){if(_0x37559a[_0x480907(0x2fc)](/(.*):[ ](.*)/i)){const _0x702901=String(RegExp['$1'])[_0x480907(0x25d)]()[_0x480907(0x432)](),_0x5667c5=String(RegExp['$2'])[_0x480907(0x432)]();this[_0x480907(0x4c2)][_0x702901]=_0x5667c5;}}}},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x50d)]=function(){const _0x2651f3=_0x23d1fb;return Math['max'](0x1,$gameSystem[_0x2651f3(0x4a0)]()-0x4);},Window_ShopStatus['prototype'][_0x23d1fb(0x425)]=function(){const _0xb9e476=_0x23d1fb;Window_StatusBase[_0xb9e476(0x241)][_0xb9e476(0x425)][_0xb9e476(0x44b)](this),this['contents'][_0xb9e476(0x428)]=this[_0xb9e476(0x514)]||this[_0xb9e476(0x1c5)][_0xb9e476(0x428)],this[_0xb9e476(0x1c5)]['textColor']=this[_0xb9e476(0x451)]||this[_0xb9e476(0x1c5)][_0xb9e476(0x296)];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x254)]=function(){const _0x45c43c=_0x23d1fb;return this[_0x45c43c(0x1c5)]['fontSize']/$gameSystem['mainFontSize']();},Window_ShopStatus['prototype'][_0x23d1fb(0x48a)]=function(_0x30d340,_0x3c4a2f,_0x1af43c){const _0x2aadd8=_0x23d1fb,_0x1eeb73=ImageManager[_0x2aadd8(0x405)]('IconSet'),_0x441387=ImageManager[_0x2aadd8(0x431)],_0x3a5258=ImageManager[_0x2aadd8(0x31e)],_0x572161=_0x30d340%0x10*_0x441387,_0x1c638a=Math[_0x2aadd8(0x312)](_0x30d340/0x10)*_0x3a5258,_0x39fa7b=Math['ceil'](_0x441387*this[_0x2aadd8(0x254)]()),_0xbbabc9=Math['ceil'](_0x3a5258*this[_0x2aadd8(0x254)]());this[_0x2aadd8(0x1c5)][_0x2aadd8(0x1b8)](_0x1eeb73,_0x572161,_0x1c638a,_0x441387,_0x3a5258,_0x3c4a2f,_0x1af43c,_0x39fa7b,_0xbbabc9);},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x234)]=function(_0x3c0636,_0x2b2d2d){const _0x525653=_0x23d1fb;_0x2b2d2d[_0x525653(0x46f)]&&this[_0x525653(0x48a)](_0x3c0636,_0x2b2d2d['x'],_0x2b2d2d['y']+0x2);_0x2b2d2d['x']+=Math[_0x525653(0x29f)](ImageManager['iconWidth']*this['fontSizeRatio']());if(this[_0x525653(0x254)]()===0x1)_0x2b2d2d['x']+=0x4;},Window_ShopStatus[_0x23d1fb(0x241)]['drawItemKeyData']=function(_0x3d46df,_0x4abc7c,_0x5e4c9f,_0x119be9,_0x3e93ea,_0x439fef){const _0x2f7477=_0x23d1fb;_0x3d46df=_0x3d46df||'',_0x439fef=_0x439fef||'left',this['_resetFontSize']=this[_0x2f7477(0x50d)](),this[_0x2f7477(0x451)]=_0x3e93ea?ColorManager[_0x2f7477(0x4b6)]():this[_0x2f7477(0x1c5)][_0x2f7477(0x296)],_0x4abc7c+=this[_0x2f7477(0x2a5)](),_0x119be9-=this[_0x2f7477(0x2a5)]()*0x2;const _0x35d530=this['textSizeEx'](_0x3d46df);if(_0x439fef===_0x2f7477(0x1db))_0x4abc7c=_0x4abc7c+Math[_0x2f7477(0x312)]((_0x119be9-_0x35d530[_0x2f7477(0x3f4)])/0x2);else _0x439fef===_0x2f7477(0x3cb)&&(_0x4abc7c=_0x4abc7c+_0x119be9-_0x35d530['width']);_0x5e4c9f+=(this[_0x2f7477(0x314)]()-_0x35d530[_0x2f7477(0x1f9)])/0x2,this[_0x2f7477(0x4d0)](_0x3d46df,_0x4abc7c,_0x5e4c9f,_0x119be9),this[_0x2f7477(0x514)]=undefined,this[_0x2f7477(0x451)]=undefined,this[_0x2f7477(0x425)]();},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x381)]=function(_0x2e7f4d,_0x9facdf,_0x40ff68){const _0x21cac1=_0x23d1fb;if(!DataManager[_0x21cac1(0x1ac)](this[_0x21cac1(0x2bc)]))return![];const _0x1c7a32=this[_0x21cac1(0x208)]();this['drawItemKeyData'](_0x1c7a32,_0x2e7f4d,_0x9facdf,_0x40ff68,!![]);const _0x3c7d5a=this[_0x21cac1(0x4cd)]();return this[_0x21cac1(0x34f)](_0x3c7d5a,_0x2e7f4d,_0x9facdf,_0x40ff68,![],_0x21cac1(0x3cb)),this[_0x21cac1(0x23b)](_0x2e7f4d,_0x9facdf,_0x40ff68),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype']['getItemConsumableLabel']=function(){const _0xfb040f=_0x23d1fb;return VisuMZ[_0xfb040f(0x248)][_0xfb040f(0x357)][_0xfb040f(0x4c6)][_0xfb040f(0x37f)];},Window_ShopStatus['prototype'][_0x23d1fb(0x4cd)]=function(){const _0x48f83f=_0x23d1fb,_0x204077=_0x48f83f(0x414);if(this[_0x48f83f(0x4c2)][_0x204077])return this[_0x48f83f(0x4c2)][_0x204077];return this[_0x48f83f(0x2dd)]()?VisuMZ[_0x48f83f(0x248)]['Settings'][_0x48f83f(0x4c6)][_0x48f83f(0x36f)]:VisuMZ[_0x48f83f(0x248)][_0x48f83f(0x357)][_0x48f83f(0x4c6)][_0x48f83f(0x31c)];},Window_ShopStatus['prototype']['canConsumeItem']=function(){const _0x2f7e79=_0x23d1fb;return VisuMZ['CoreEngine']&&VisuMZ[_0x2f7e79(0x305)][_0x2f7e79(0x357)][_0x2f7e79(0x361)][_0x2f7e79(0x272)]&&DataManager[_0x2f7e79(0x376)](this['_item'])?![]:this['_item'][_0x2f7e79(0x338)];},Window_ShopStatus['prototype']['drawItemQuantity']=function(_0x52d9ae,_0x428c17,_0x5ed600){const _0xe82e49=_0x23d1fb;if(!this[_0xe82e49(0x52b)]()&&!DataManager[_0xe82e49(0x1ac)](this[_0xe82e49(0x2bc)]))return![];if(DataManager[_0xe82e49(0x376)](this['_item'])&&!$dataSystem['optKeyItemsNumber']){const _0x2acd27=TextManager[_0xe82e49(0x1a3)];this[_0xe82e49(0x34f)](_0x2acd27,_0x52d9ae,_0x428c17,_0x5ed600,!![],_0xe82e49(0x1db));}else{const _0x11bfa2=TextManager[_0xe82e49(0x4a4)];this[_0xe82e49(0x34f)](_0x11bfa2,_0x52d9ae,_0x428c17,_0x5ed600,!![]);const _0x3c81fe=this['getItemQuantityText']();this[_0xe82e49(0x34f)](_0x3c81fe,_0x52d9ae,_0x428c17,_0x5ed600,![],_0xe82e49(0x3cb));}return this[_0xe82e49(0x23b)](_0x52d9ae,_0x428c17,_0x5ed600),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x2a8)]=function(){const _0x293807=_0x23d1fb,_0x426077=_0x293807(0x515);if(this[_0x293807(0x4c2)][_0x426077])return this[_0x293807(0x4c2)][_0x426077];const _0x2e87f2=VisuMZ['ItemsEquipsCore']['Settings'][_0x293807(0x3fe)]['ItemQuantityFmt'];return _0x2e87f2[_0x293807(0x325)]($gameParty[_0x293807(0x4b0)](this[_0x293807(0x2bc)]));},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x3d8)]=function(_0x2daa21,_0x56c41c,_0x23eb31){const _0x57a14e=_0x23d1fb,_0xd6de17=this[_0x57a14e(0x493)]();return this[_0x57a14e(0x34f)](_0xd6de17,_0x2daa21,_0x56c41c,_0x23eb31,![],'center'),this['drawItemDarkRect'](_0x2daa21,_0x56c41c,_0x23eb31),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x493)]=function(){const _0x50ca6a=_0x23d1fb,_0x11920c='OCCASION';if(this[_0x50ca6a(0x4c2)][_0x11920c])return this[_0x50ca6a(0x4c2)][_0x11920c];const _0x421d57=VisuMZ[_0x50ca6a(0x248)]['Settings']['StatusWindow'],_0x2c27d1='Occasion%1'[_0x50ca6a(0x325)](this[_0x50ca6a(0x2bc)][_0x50ca6a(0x4e3)]);return _0x421d57[_0x2c27d1];},Window_ShopStatus[_0x23d1fb(0x241)]['drawItemScope']=function(_0x40383c,_0x2b49f3,_0x3c9128){const _0xed6206=_0x23d1fb,_0x5e3e62=this['getItemScopeText']();return this[_0xed6206(0x34f)](_0x5e3e62,_0x40383c,_0x2b49f3,_0x3c9128,![],'center'),this[_0xed6206(0x23b)](_0x40383c,_0x2b49f3,_0x3c9128),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x23d1fb(0x205)]=function(){const _0xf76616=_0x23d1fb,_0x9e397c=_0xf76616(0x1da);if(this['_customItemInfo'][_0x9e397c])return this[_0xf76616(0x4c2)][_0x9e397c];const _0x5a63fb=VisuMZ['ItemsEquipsCore'][_0xf76616(0x357)][_0xf76616(0x4c6)];if(Imported['VisuMZ_1_BattleCore']){const _0x2e2852=this[_0xf76616(0x2bc)][_0xf76616(0x4fe)];if(_0x2e2852[_0xf76616(0x2fc)](/<TARGET:[ ](.*)>/i)){const _0x29deed=String(RegExp['$1']);if(_0x29deed[_0xf76616(0x2fc)](/(\d+) RANDOM ANY/i))return _0x5a63fb[_0xf76616(0x2f6)][_0xf76616(0x325)](Number(RegExp['$1']));else{if(_0x29deed[_0xf76616(0x2fc)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x5a63fb['ScopeRandomEnemies'][_0xf76616(0x325)](Number(RegExp['$1']));else{if(_0x29deed[_0xf76616(0x2fc)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x5a63fb[_0xf76616(0x2b1)][_0xf76616(0x325)](Number(RegExp['$1']));else{if(_0x29deed[_0xf76616(0x2fc)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x5a63fb[_0xf76616(0x3c4)];}}}}}const _0x3b9c62=_0xf76616(0x47a)[_0xf76616(0x325)](this[_0xf76616(0x2bc)]['scope']);return _0x5a63fb[_0x3b9c62];},Window_ShopStatus['prototype']['drawItemSpeed']=function(_0x322d51,_0x224a53,_0x1632de){const _0x19fe21=_0x23d1fb,_0x3b6be8=this[_0x19fe21(0x18a)]();this[_0x19fe21(0x34f)](_0x3b6be8,_0x322d51,_0x224a53,_0x1632de,!![]);const _0x215456=this['getItemSpeedText']();return this[_0x19fe21(0x34f)](_0x215456,_0x322d51,_0x224a53,_0x1632de,![],'right'),this[_0x19fe21(0x23b)](_0x322d51,_0x224a53,_0x1632de),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x18a)]=function(){const _0x162823=_0x23d1fb;return VisuMZ[_0x162823(0x248)][_0x162823(0x357)][_0x162823(0x4c6)][_0x162823(0x3d7)];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x416)]=function(){const _0x56956a=_0x23d1fb,_0x284227='SPEED';if(this[_0x56956a(0x4c2)][_0x284227])return this['_customItemInfo'][_0x284227];const _0x296898=this['_item'][_0x56956a(0x392)];if(_0x296898>=0x7d0)return VisuMZ[_0x56956a(0x248)][_0x56956a(0x357)]['StatusWindow'][_0x56956a(0x509)];else{if(_0x296898>=0x3e8)return VisuMZ[_0x56956a(0x248)][_0x56956a(0x357)][_0x56956a(0x4c6)][_0x56956a(0x2da)];else{if(_0x296898>0x0)return VisuMZ[_0x56956a(0x248)]['Settings'][_0x56956a(0x4c6)][_0x56956a(0x3e2)];else{if(_0x296898===0x0)return VisuMZ['ItemsEquipsCore'][_0x56956a(0x357)][_0x56956a(0x4c6)][_0x56956a(0x1cc)];else{if(_0x296898>-0x3e8)return VisuMZ['ItemsEquipsCore'][_0x56956a(0x357)][_0x56956a(0x4c6)]['SpeedNeg999'];else{if(_0x296898>-0x7d0)return VisuMZ[_0x56956a(0x248)]['Settings'][_0x56956a(0x4c6)][_0x56956a(0x2f5)];else return _0x296898<=-0x7d0?VisuMZ[_0x56956a(0x248)][_0x56956a(0x357)][_0x56956a(0x4c6)][_0x56956a(0x1e9)]:'?????';}}}}}},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x2fd)]=function(_0x426d21,_0x53527a,_0x3d5be1){const _0x4c1776=_0x23d1fb,_0xa78411=this[_0x4c1776(0x316)]();this['drawItemKeyData'](_0xa78411,_0x426d21,_0x53527a,_0x3d5be1,!![]);const _0x3b5bed=this[_0x4c1776(0x384)]();return this['drawItemKeyData'](_0x3b5bed,_0x426d21,_0x53527a,_0x3d5be1,![],_0x4c1776(0x3cb)),this[_0x4c1776(0x23b)](_0x426d21,_0x53527a,_0x3d5be1),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x316)]=function(){const _0x49b541=_0x23d1fb;return VisuMZ[_0x49b541(0x248)]['Settings'][_0x49b541(0x4c6)]['LabelSuccessRate'];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x384)]=function(){const _0xf830f2=_0x23d1fb,_0x24ecf7=_0xf830f2(0x3b9);if(this[_0xf830f2(0x4c2)][_0x24ecf7])return this[_0xf830f2(0x4c2)][_0x24ecf7];if(Imported['VisuMZ_1_BattleCore']){const _0x1db1a3=this[_0xf830f2(0x2bc)][_0xf830f2(0x4fe)];if(_0x1db1a3['match'](/<ALWAYS HIT>/i))return _0xf830f2(0x358);else{if(_0x1db1a3[_0xf830f2(0x2fc)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0xf830f2(0x3de)['format'](Number(RegExp['$1']));}}return _0xf830f2(0x3de)[_0xf830f2(0x325)](this[_0xf830f2(0x2bc)][_0xf830f2(0x510)]);},Window_ShopStatus['prototype'][_0x23d1fb(0x3a3)]=function(_0x40a9ad,_0x4a7c6d,_0x49d65a){const _0x55c37f=_0x23d1fb,_0xcb8639=this[_0x55c37f(0x3fc)]();this[_0x55c37f(0x34f)](_0xcb8639,_0x40a9ad,_0x4a7c6d,_0x49d65a,!![]);const _0x42a42b=this['getItemRepeatsText']();return this[_0x55c37f(0x34f)](_0x42a42b,_0x40a9ad,_0x4a7c6d,_0x49d65a,![],_0x55c37f(0x3cb)),this[_0x55c37f(0x23b)](_0x40a9ad,_0x4a7c6d,_0x49d65a),this[_0x55c37f(0x425)](),!![];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x3fc)]=function(){const _0x2a4f4b=_0x23d1fb;return VisuMZ[_0x2a4f4b(0x248)][_0x2a4f4b(0x357)]['StatusWindow'][_0x2a4f4b(0x300)];},Window_ShopStatus['prototype'][_0x23d1fb(0x466)]=function(){const _0x78e0f8=_0x23d1fb,_0x5387d7='REPEAT';if(this['_customItemInfo'][_0x5387d7])return this[_0x78e0f8(0x4c2)][_0x5387d7];const _0x16e2fd=_0x78e0f8(0x294);return _0x16e2fd[_0x78e0f8(0x325)](this[_0x78e0f8(0x2bc)][_0x78e0f8(0x4ee)]);},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x1f7)]=function(_0xcc4894,_0x346ca0,_0xfd1201){const _0x453c3b=_0x23d1fb,_0x6371ae=this['getItemHitTypeLabel']();this[_0x453c3b(0x34f)](_0x6371ae,_0xcc4894,_0x346ca0,_0xfd1201,!![]);const _0x434931=this[_0x453c3b(0x395)]();return this['drawItemKeyData'](_0x434931,_0xcc4894,_0x346ca0,_0xfd1201,![],_0x453c3b(0x3cb)),this[_0x453c3b(0x23b)](_0xcc4894,_0x346ca0,_0xfd1201),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype']['getItemHitTypeLabel']=function(){const _0x20d8b7=_0x23d1fb;return VisuMZ[_0x20d8b7(0x248)][_0x20d8b7(0x357)][_0x20d8b7(0x4c6)][_0x20d8b7(0x273)];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x395)]=function(){const _0x551624=_0x23d1fb,_0x22a446=_0x551624(0x1c2);if(this[_0x551624(0x4c2)][_0x22a446])return this[_0x551624(0x4c2)][_0x22a446];const _0x30c626=VisuMZ[_0x551624(0x248)][_0x551624(0x357)][_0x551624(0x4c6)],_0x1313e7=_0x551624(0x292)[_0x551624(0x325)](this[_0x551624(0x2bc)][_0x551624(0x41d)]);return _0x30c626[_0x1313e7];},Window_ShopStatus['prototype'][_0x23d1fb(0x32b)]=function(_0x50b7d,_0x46fca4,_0x136ab6){const _0x3cd473=_0x23d1fb;if(this['_item'][_0x3cd473(0x3cc)][_0x3cd473(0x3ec)]<=0x0)return _0x46fca4;if(this['drawItemDamageElement'](_0x50b7d,_0x46fca4,_0x136ab6))_0x46fca4+=this[_0x3cd473(0x314)]();if(this[_0x3cd473(0x321)](_0x50b7d,_0x46fca4,_0x136ab6))_0x46fca4+=this['lineHeight']();return this['resetFontSettings'](),_0x46fca4;},Window_ShopStatus['prototype'][_0x23d1fb(0x458)]=function(_0x577a53,_0xc0a265,_0x4240cb){const _0x4991b2=_0x23d1fb,_0x10344b=this[_0x4991b2(0x38b)]();this['drawItemKeyData'](_0x10344b,_0x577a53,_0xc0a265,_0x4240cb,!![]);const _0x1be815=this[_0x4991b2(0x24a)]();return this[_0x4991b2(0x34f)](_0x1be815,_0x577a53,_0xc0a265,_0x4240cb,![],_0x4991b2(0x3cb)),this['drawItemDarkRect'](_0x577a53,_0xc0a265,_0x4240cb),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x38b)]=function(){const _0x5df292=_0x23d1fb;return VisuMZ[_0x5df292(0x248)][_0x5df292(0x357)][_0x5df292(0x4c6)][_0x5df292(0x2f0)];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x24a)]=function(){const _0x14451f=_0x23d1fb,_0x1fdb0c=_0x14451f(0x275);if(this[_0x14451f(0x4c2)][_0x1fdb0c])return this[_0x14451f(0x4c2)][_0x1fdb0c];if(this[_0x14451f(0x2bc)]['damage'][_0x14451f(0x26c)]<=-0x1)return VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'][_0x14451f(0x385)];else return this[_0x14451f(0x2bc)]['damage']['elementId']===0x0?VisuMZ[_0x14451f(0x248)][_0x14451f(0x357)][_0x14451f(0x4c6)]['ElementNone']:$dataSystem[_0x14451f(0x2ea)][this[_0x14451f(0x2bc)][_0x14451f(0x3cc)][_0x14451f(0x26c)]];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x321)]=function(_0x2770e1,_0x40061a,_0x39c4fc){const _0x8f3117=_0x23d1fb,_0x1493f1=this[_0x8f3117(0x33a)]();this['drawItemKeyData'](_0x1493f1,_0x2770e1,_0x40061a,_0x39c4fc,!![]),this[_0x8f3117(0x48f)]();const _0x22393a=this['getItemDamageAmountText'](),_0x3c60c1=ColorManager[_0x8f3117(0x304)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x8f3117(0x2bc)][_0x8f3117(0x3cc)][_0x8f3117(0x3ec)]]);return this['changeTextColor'](_0x3c60c1),this[_0x8f3117(0x34f)](_0x22393a,_0x2770e1,_0x40061a,_0x39c4fc,![],_0x8f3117(0x3cb)),this[_0x8f3117(0x23b)](_0x2770e1,_0x40061a,_0x39c4fc),this[_0x8f3117(0x425)](),!![];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x33a)]=function(){const _0x4fa8ef=_0x23d1fb;return Imported[_0x4fa8ef(0x2cb)]&&DataManager['getDamageStyle'](this[_0x4fa8ef(0x2bc)])!==_0x4fa8ef(0x420)?this[_0x4fa8ef(0x30f)]():this['getItemDamageAmountLabelOriginal']();},Window_ShopStatus['prototype']['getItemDamageAmountLabelOriginal']=function(){const _0x536960=_0x23d1fb,_0x486dec=VisuMZ[_0x536960(0x248)][_0x536960(0x357)]['StatusWindow'],_0x4d5b8d=_0x536960(0x429)[_0x536960(0x325)](this['_item'][_0x536960(0x3cc)][_0x536960(0x3ec)]),_0x3e25e7=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x536960(0x2bc)]['damage'][_0x536960(0x3ec)]];return _0x486dec[_0x4d5b8d][_0x536960(0x325)](_0x3e25e7);},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x48f)]=function(){const _0x31ba6d=_0x23d1fb,_0x26102a=$gameActors[_0x31ba6d(0x383)](0x1);this['_tempActorA']=JsonEx[_0x31ba6d(0x213)](_0x26102a),this['_tempActorB']=JsonEx[_0x31ba6d(0x213)](_0x26102a);},Window_ShopStatus[_0x23d1fb(0x241)]['getItemDamageAmountText']=function(){const _0x4d47ec=_0x23d1fb,_0x4314ad=_0x4d47ec(0x1a1);if(this[_0x4d47ec(0x4c2)][_0x4314ad])return this['_customItemInfo'][_0x4314ad];return Imported['VisuMZ_1_BattleCore']&&DataManager[_0x4d47ec(0x290)](this['_item'])!==_0x4d47ec(0x420)?this[_0x4d47ec(0x45a)]():this[_0x4d47ec(0x3f3)]();},Window_ShopStatus[_0x23d1fb(0x241)]['getItemDamageAmountTextOriginal']=function(){const _0x3a4579=_0x23d1fb;window['a']=this['_tempActorA'],window['b']=this[_0x3a4579(0x218)],this['_tempActorA'][_0x3a4579(0x452)](!![]),this[_0x3a4579(0x218)][_0x3a4579(0x452)]([0x3,0x4][_0x3a4579(0x39a)](this[_0x3a4579(0x2bc)][_0x3a4579(0x3cc)][_0x3a4579(0x3ec)]));let _0x3150b1=this[_0x3a4579(0x2bc)]['damage']['formula'];try{const _0xb05034=Math[_0x3a4579(0x2e0)](eval(_0x3150b1),0x0)/window['a'][_0x3a4579(0x2b7)];return this['revertGlobalNamespaceVariables'](),isNaN(_0xb05034)?_0x3a4579(0x38f):_0x3a4579(0x3de)[_0x3a4579(0x325)](Math[_0x3a4579(0x291)](_0xb05034*0x64));}catch(_0x47ab2d){return $gameTemp[_0x3a4579(0x26d)]()&&(console[_0x3a4579(0x3b1)](_0x3a4579(0x187)[_0x3a4579(0x325)](this[_0x3a4579(0x2bc)][_0x3a4579(0x285)])),console[_0x3a4579(0x3b1)](_0x47ab2d)),this[_0x3a4579(0x27c)](),_0x3a4579(0x38f);}},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x27c)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x23d1fb(0x241)]['drawItemEffects']=function(_0x55b4a,_0x49522c,_0x4b3f3f){const _0x3a988c=_0x23d1fb;if(!this[_0x3a988c(0x49a)]())return _0x49522c;if(this['drawItemEffectsHpRecovery'](_0x55b4a,_0x49522c,_0x4b3f3f))_0x49522c+=this[_0x3a988c(0x314)]();if(this['drawItemEffectsMpRecovery'](_0x55b4a,_0x49522c,_0x4b3f3f))_0x49522c+=this[_0x3a988c(0x314)]();if(this[_0x3a988c(0x266)](_0x55b4a,_0x49522c,_0x4b3f3f))_0x49522c+=this[_0x3a988c(0x314)]();if(this[_0x3a988c(0x1b3)](_0x55b4a,_0x49522c,_0x4b3f3f))_0x49522c+=this[_0x3a988c(0x314)]();if(this[_0x3a988c(0x4b3)](_0x55b4a,_0x49522c,_0x4b3f3f))_0x49522c+=this[_0x3a988c(0x314)]();if(this[_0x3a988c(0x44e)](_0x55b4a,_0x49522c,_0x4b3f3f))_0x49522c+=this[_0x3a988c(0x314)]();if(this['drawItemEffectsSelfTpGain'](_0x55b4a,_0x49522c,_0x4b3f3f))_0x49522c+=this['lineHeight']();if(this['drawItemEffectsAddedStatesBuffs'](_0x55b4a,_0x49522c,_0x4b3f3f))_0x49522c+=this[_0x3a988c(0x314)]();if(this['drawItemEffectsRemovedStatesBuffs'](_0x55b4a,_0x49522c,_0x4b3f3f))_0x49522c+=this[_0x3a988c(0x314)]();return this[_0x3a988c(0x425)](),_0x49522c;},Window_ShopStatus[_0x23d1fb(0x241)]['getItemEffects']=function(){const _0x1fc96f=_0x23d1fb;return this[_0x1fc96f(0x2bc)][_0x1fc96f(0x309)];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x49a)]=function(){const _0x4e78a1=_0x23d1fb;let _0x594db0=![];this[_0x4e78a1(0x2d3)]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0x5d8714=this[_0x4e78a1(0x199)]();for(const _0x4a6745 of _0x5d8714){switch(_0x4a6745['code']){case Game_Action['EFFECT_RECOVER_HP']:this[_0x4e78a1(0x2d3)][_0x4e78a1(0x185)]+=_0x4a6745[_0x4e78a1(0x52a)],this['_itemData'][_0x4e78a1(0x1c9)]+=_0x4a6745['value2'],_0x594db0=!![];break;case Game_Action[_0x4e78a1(0x34a)]:this['_itemData']['rateMP']+=_0x4a6745[_0x4e78a1(0x52a)],this['_itemData']['flatMP']+=_0x4a6745[_0x4e78a1(0x3ce)],_0x594db0=!![];break;case Game_Action[_0x4e78a1(0x502)]:this['_itemData'][_0x4e78a1(0x400)]+=_0x4a6745[_0x4e78a1(0x52a)],_0x594db0=!![];break;case Game_Action[_0x4e78a1(0x217)]:this[_0x4e78a1(0x2d3)][_0x4e78a1(0x29c)][_0x4e78a1(0x1dd)](_0x4a6745[_0x4e78a1(0x210)]),_0x594db0=!![];break;case Game_Action[_0x4e78a1(0x378)]:this['_itemData']['removeState'][_0x4e78a1(0x1dd)](_0x4a6745['dataId']),this['_itemData'][_0x4e78a1(0x3ca)]=!![],_0x594db0=!![];break;case Game_Action[_0x4e78a1(0x4f8)]:this[_0x4e78a1(0x2d3)][_0x4e78a1(0x1c3)][_0x4a6745['dataId']]+=0x1,_0x594db0=!![];break;case Game_Action['EFFECT_ADD_DEBUFF']:this[_0x4e78a1(0x2d3)][_0x4e78a1(0x1c3)][_0x4a6745['dataId']]-=0x1,_0x594db0=!![];break;case Game_Action[_0x4e78a1(0x375)]:this['_itemData']['removeBuff'][_0x4e78a1(0x1dd)](_0x4a6745[_0x4e78a1(0x210)]),this[_0x4e78a1(0x2d3)][_0x4e78a1(0x3ca)]=!![],_0x594db0=!![];break;case Game_Action[_0x4e78a1(0x3a4)]:this[_0x4e78a1(0x2d3)][_0x4e78a1(0x3ad)][_0x4e78a1(0x1dd)](_0x4a6745['dataId']),this[_0x4e78a1(0x2d3)][_0x4e78a1(0x3ca)]=!![],_0x594db0=!![];break;}}if(this[_0x4e78a1(0x2d3)][_0x4e78a1(0x29c)][_0x4e78a1(0x401)]>0x0)this['_itemData'][_0x4e78a1(0x388)]=!![];for(let _0x3347fa=0x0;_0x3347fa<this[_0x4e78a1(0x2d3)]['changeBuff'][_0x4e78a1(0x401)];_0x3347fa++){if(this['_itemData'][_0x4e78a1(0x1c3)][_0x3347fa]!==0x0)this[_0x4e78a1(0x2d3)][_0x4e78a1(0x388)]=!![];}this[_0x4e78a1(0x2bc)][_0x4e78a1(0x2e2)]!==0x0&&(this[_0x4e78a1(0x2d3)][_0x4e78a1(0x35b)]=this['_item'][_0x4e78a1(0x2e2)],_0x594db0=!![]);const _0x42cfa2=[_0x4e78a1(0x286),'MP\x20RECOVERY','TP\x20RECOVERY','HP\x20DAMAGE','MP\x20DAMAGE','TP\x20DAMAGE',_0x4e78a1(0x214),_0x4e78a1(0x268),'REMOVED\x20EFFECTS'];for(const _0x4aa153 of _0x42cfa2){if(this[_0x4e78a1(0x4c2)][_0x4aa153]){_0x594db0=!![];break;}}return _0x594db0;},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x2c4)]=function(_0x575d0e,_0x78efbe,_0xaccb5f){const _0x536d13=_0x23d1fb,_0x321aef=_0x536d13(0x286);if(this['_itemData'][_0x536d13(0x185)]<=0x0&&this['_itemData'][_0x536d13(0x1c9)]<=0x0&&!this[_0x536d13(0x4c2)][_0x321aef])return![];const _0x5c620d=this[_0x536d13(0x39c)]();this[_0x536d13(0x34f)](_0x5c620d,_0x575d0e,_0x78efbe,_0xaccb5f,!![]);const _0x4e4eba=this[_0x536d13(0x42b)]();return this['changeTextColor'](ColorManager[_0x536d13(0x304)](0x1)),this[_0x536d13(0x34f)](_0x4e4eba,_0x575d0e,_0x78efbe,_0xaccb5f,![],_0x536d13(0x3cb)),this[_0x536d13(0x23b)](_0x575d0e,_0x78efbe,_0xaccb5f),this[_0x536d13(0x425)](),!![];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x39c)]=function(){const _0x4d6536=_0x23d1fb,_0x2739d1=VisuMZ[_0x4d6536(0x248)][_0x4d6536(0x357)][_0x4d6536(0x4c6)][_0x4d6536(0x343)];return _0x2739d1[_0x4d6536(0x325)](TextManager['hp']);},Window_ShopStatus['prototype'][_0x23d1fb(0x42b)]=function(){const _0xa425b2=_0x23d1fb,_0x30ef6a=_0xa425b2(0x286);if(this[_0xa425b2(0x4c2)][_0x30ef6a])return this[_0xa425b2(0x4c2)][_0x30ef6a];let _0x5271be='';if(this[_0xa425b2(0x2d3)]['rateHP']>0x0)_0x5271be+=_0xa425b2(0x3e8)[_0xa425b2(0x325)](Math[_0xa425b2(0x312)](this[_0xa425b2(0x2d3)][_0xa425b2(0x185)]*0x64));if(this[_0xa425b2(0x2d3)]['rateHP']>0x0&&this[_0xa425b2(0x2d3)][_0xa425b2(0x1c9)]>0x0)_0x5271be+='\x20';if(this[_0xa425b2(0x2d3)][_0xa425b2(0x1c9)]>0x0)_0x5271be+='+%1'['format'](this[_0xa425b2(0x2d3)][_0xa425b2(0x1c9)]);return _0x5271be;},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x4d9)]=function(_0x163814,_0x2b7efb,_0x289673){const _0x4b7c00=_0x23d1fb,_0x265bb5=_0x4b7c00(0x362);if(this['_itemData'][_0x4b7c00(0x1a0)]<=0x0&&this[_0x4b7c00(0x2d3)][_0x4b7c00(0x3d1)]<=0x0&&!this[_0x4b7c00(0x4c2)][_0x265bb5])return![];const _0x521577=this[_0x4b7c00(0x279)]();this[_0x4b7c00(0x34f)](_0x521577,_0x163814,_0x2b7efb,_0x289673,!![]);const _0x2388fe=this[_0x4b7c00(0x25f)]();return this[_0x4b7c00(0x391)](ColorManager[_0x4b7c00(0x304)](0x3)),this[_0x4b7c00(0x34f)](_0x2388fe,_0x163814,_0x2b7efb,_0x289673,![],_0x4b7c00(0x3cb)),this[_0x4b7c00(0x23b)](_0x163814,_0x2b7efb,_0x289673),this[_0x4b7c00(0x425)](),!![];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x279)]=function(){const _0x36d559=_0x23d1fb,_0x2770e9=VisuMZ[_0x36d559(0x248)]['Settings']['StatusWindow']['LabelRecoverMP'];return _0x2770e9['format'](TextManager['mp']);},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x25f)]=function(){const _0x4d96cc=_0x23d1fb,_0x184e93=_0x4d96cc(0x362);if(this[_0x4d96cc(0x4c2)][_0x184e93])return this['_customItemInfo'][_0x184e93];let _0x464b4d='';if(this[_0x4d96cc(0x2d3)][_0x4d96cc(0x1a0)]>0x0)_0x464b4d+=_0x4d96cc(0x3e8)[_0x4d96cc(0x325)](Math[_0x4d96cc(0x312)](this[_0x4d96cc(0x2d3)]['rateMP']*0x64));if(this['_itemData'][_0x4d96cc(0x1a0)]>0x0&&this[_0x4d96cc(0x2d3)][_0x4d96cc(0x3d1)]>0x0)_0x464b4d+='\x20';if(this[_0x4d96cc(0x2d3)][_0x4d96cc(0x3d1)]>0x0)_0x464b4d+='+%1'['format'](this[_0x4d96cc(0x2d3)][_0x4d96cc(0x3d1)]);return _0x464b4d;},Window_ShopStatus[_0x23d1fb(0x241)]['drawItemEffectsTpRecovery']=function(_0x2805a8,_0x17bbbf,_0x9d8b42){const _0x489939=_0x23d1fb,_0x2302fa=_0x489939(0x410);if(this['_itemData'][_0x489939(0x400)]<=0x0&&!this['_customItemInfo'][_0x2302fa])return![];const _0x36edc6=this[_0x489939(0x3cd)]();this[_0x489939(0x34f)](_0x36edc6,_0x2805a8,_0x17bbbf,_0x9d8b42,!![]);const _0x106e4e=this[_0x489939(0x2d6)]();return this[_0x489939(0x391)](ColorManager[_0x489939(0x3b0)]()),this[_0x489939(0x34f)](_0x106e4e,_0x2805a8,_0x17bbbf,_0x9d8b42,![],_0x489939(0x3cb)),this[_0x489939(0x23b)](_0x2805a8,_0x17bbbf,_0x9d8b42),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x3cd)]=function(){const _0x4c87d8=_0x23d1fb,_0x46f13a=VisuMZ[_0x4c87d8(0x248)][_0x4c87d8(0x357)][_0x4c87d8(0x4c6)][_0x4c87d8(0x3be)];return _0x46f13a[_0x4c87d8(0x325)](TextManager['tp']);},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x2d6)]=function(){const _0x219dcb=_0x23d1fb,_0x314ab7=_0x219dcb(0x410);if(this[_0x219dcb(0x4c2)][_0x314ab7])return this[_0x219dcb(0x4c2)][_0x314ab7];let _0x5ab2d5='';return _0x5ab2d5+='+%1'[_0x219dcb(0x325)](this[_0x219dcb(0x2d3)][_0x219dcb(0x400)]),_0x5ab2d5;},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x372)]=function(_0x6e3ed6,_0x1bcb0a,_0x21bf7e){const _0x579425=_0x23d1fb,_0x1af22a=_0x579425(0x214);if(this[_0x579425(0x2d3)][_0x579425(0x35b)]===0x0&&!this['_customItemInfo'][_0x1af22a])return![];const _0x3fbc70=this['getItemEffectsSelfTpGainLabel']();this[_0x579425(0x34f)](_0x3fbc70,_0x6e3ed6,_0x1bcb0a,_0x21bf7e,!![]);const _0x21dc3b=this[_0x579425(0x1eb)]();return this['_itemData'][_0x579425(0x35b)]>0x0?this['changeTextColor'](ColorManager[_0x579425(0x3b0)]()):this['changeTextColor'](ColorManager[_0x579425(0x2ec)]()),this[_0x579425(0x34f)](_0x21dc3b,_0x6e3ed6,_0x1bcb0a,_0x21bf7e,![],_0x579425(0x3cb)),this[_0x579425(0x23b)](_0x6e3ed6,_0x1bcb0a,_0x21bf7e),this[_0x579425(0x425)](),!![];},Window_ShopStatus[_0x23d1fb(0x241)]['getItemEffectsSelfTpGainLabel']=function(){const _0x1965f5=_0x23d1fb,_0x5e6b54=VisuMZ[_0x1965f5(0x248)][_0x1965f5(0x357)]['StatusWindow'][_0x1965f5(0x4f6)];return _0x5e6b54['format'](TextManager['tp']);},Window_ShopStatus['prototype'][_0x23d1fb(0x1eb)]=function(){const _0x5c6276=_0x23d1fb,_0x34af3e='USER\x20TP\x20GAIN';if(this[_0x5c6276(0x4c2)][_0x34af3e])return this[_0x5c6276(0x4c2)][_0x34af3e];let _0x28a409='';return this['_itemData'][_0x5c6276(0x35b)]>0x0?_0x28a409+='+%1'[_0x5c6276(0x325)](this[_0x5c6276(0x2d3)][_0x5c6276(0x35b)]):_0x28a409+='%1'[_0x5c6276(0x325)](this[_0x5c6276(0x2d3)]['selfTP']),_0x28a409;},Window_ShopStatus['prototype'][_0x23d1fb(0x1b3)]=function(_0x506240,_0x29203c,_0x2139d5){const _0x2e46de=_0x23d1fb,_0x5a347c=_0x2e46de(0x2bd);if(this[_0x2e46de(0x2d3)][_0x2e46de(0x185)]>=0x0&&this[_0x2e46de(0x2d3)][_0x2e46de(0x1c9)]>=0x0&&!this[_0x2e46de(0x4c2)][_0x5a347c])return![];const _0xeae13a=this[_0x2e46de(0x4c3)]();this[_0x2e46de(0x34f)](_0xeae13a,_0x506240,_0x29203c,_0x2139d5,!![]);const _0x2a8461=this[_0x2e46de(0x39e)]();return this['changeTextColor'](ColorManager[_0x2e46de(0x304)](0x0)),this[_0x2e46de(0x34f)](_0x2a8461,_0x506240,_0x29203c,_0x2139d5,![],_0x2e46de(0x3cb)),this['drawItemDarkRect'](_0x506240,_0x29203c,_0x2139d5),this[_0x2e46de(0x425)](),!![];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x4c3)]=function(){const _0x1b3615=_0x23d1fb,_0x199a4d=VisuMZ[_0x1b3615(0x248)][_0x1b3615(0x357)][_0x1b3615(0x4c6)][_0x1b3615(0x251)];return _0x199a4d[_0x1b3615(0x325)](TextManager['hp']);},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x39e)]=function(){const _0x20cf1e=_0x23d1fb,_0x5d028b=_0x20cf1e(0x2bd);if(this[_0x20cf1e(0x4c2)][_0x5d028b])return this[_0x20cf1e(0x4c2)][_0x5d028b];let _0x5be85d='';if(this[_0x20cf1e(0x2d3)][_0x20cf1e(0x185)]<0x0)_0x5be85d+=_0x20cf1e(0x3de)['format'](Math['floor'](this[_0x20cf1e(0x2d3)][_0x20cf1e(0x185)]*0x64));if(this[_0x20cf1e(0x2d3)][_0x20cf1e(0x185)]<0x0&&this[_0x20cf1e(0x2d3)][_0x20cf1e(0x1c9)]<0x0)_0x5be85d+='\x20';if(this[_0x20cf1e(0x2d3)][_0x20cf1e(0x1c9)]<0x0)_0x5be85d+='%1'[_0x20cf1e(0x325)](this[_0x20cf1e(0x2d3)][_0x20cf1e(0x1c9)]);return _0x5be85d;},Window_ShopStatus[_0x23d1fb(0x241)]['drawItemEffectsMpDamage']=function(_0x39fefe,_0x11e283,_0x417e86){const _0xee56da=_0x23d1fb,_0x25ebba=_0xee56da(0x485);if(this['_itemData'][_0xee56da(0x1a0)]>=0x0&&this[_0xee56da(0x2d3)][_0xee56da(0x3d1)]>=0x0&&!this[_0xee56da(0x4c2)][_0x25ebba])return![];const _0x3a40bc=this[_0xee56da(0x370)]();this[_0xee56da(0x34f)](_0x3a40bc,_0x39fefe,_0x11e283,_0x417e86,!![]);const _0x444a51=this[_0xee56da(0x342)]();return this[_0xee56da(0x391)](ColorManager[_0xee56da(0x304)](0x2)),this['drawItemKeyData'](_0x444a51,_0x39fefe,_0x11e283,_0x417e86,![],_0xee56da(0x3cb)),this[_0xee56da(0x23b)](_0x39fefe,_0x11e283,_0x417e86),this[_0xee56da(0x425)](),!![];},Window_ShopStatus['prototype'][_0x23d1fb(0x370)]=function(){const _0x385659=_0x23d1fb,_0x53b6c8=VisuMZ[_0x385659(0x248)][_0x385659(0x357)][_0x385659(0x4c6)]['LabelDamageMP'];return _0x53b6c8[_0x385659(0x325)](TextManager['mp']);},Window_ShopStatus[_0x23d1fb(0x241)]['getItemEffectsMpDamageText']=function(){const _0x1b2451=_0x23d1fb,_0x5f33e0='MP\x20DAMAGE';if(this['_customItemInfo'][_0x5f33e0])return this['_customItemInfo'][_0x5f33e0];let _0x514738='';if(this['_itemData']['rateMP']<0x0)_0x514738+='%1%'[_0x1b2451(0x325)](Math[_0x1b2451(0x312)](this[_0x1b2451(0x2d3)]['rateMP']*0x64));if(this[_0x1b2451(0x2d3)][_0x1b2451(0x1a0)]<0x0&&this[_0x1b2451(0x2d3)][_0x1b2451(0x3d1)]<0x0)_0x514738+='\x20';if(this[_0x1b2451(0x2d3)][_0x1b2451(0x3d1)]<0x0)_0x514738+='%1'['format'](this[_0x1b2451(0x2d3)][_0x1b2451(0x3d1)]);return _0x514738;},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x44e)]=function(_0x574af4,_0x3165a8,_0x51ff50){const _0x3757e5=_0x23d1fb,_0x32beb0=_0x3757e5(0x27d);if(this[_0x3757e5(0x2d3)][_0x3757e5(0x400)]>=0x0&&!this[_0x3757e5(0x4c2)][_0x32beb0])return![];const _0x4727fe=this[_0x3757e5(0x1af)]();this[_0x3757e5(0x34f)](_0x4727fe,_0x574af4,_0x3165a8,_0x51ff50,!![]);const _0x2bb59f=this[_0x3757e5(0x1e4)]();return this['changeTextColor'](ColorManager['powerDownColor']()),this[_0x3757e5(0x34f)](_0x2bb59f,_0x574af4,_0x3165a8,_0x51ff50,![],_0x3757e5(0x3cb)),this[_0x3757e5(0x23b)](_0x574af4,_0x3165a8,_0x51ff50),this[_0x3757e5(0x425)](),!![];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x1af)]=function(){const _0x9688a=_0x23d1fb,_0x963e91=VisuMZ[_0x9688a(0x248)][_0x9688a(0x357)][_0x9688a(0x4c6)][_0x9688a(0x293)];return _0x963e91[_0x9688a(0x325)](TextManager['tp']);},Window_ShopStatus[_0x23d1fb(0x241)]['getItemEffectsTpDamageText']=function(){const _0x2ec937=_0x23d1fb,_0x91b26d=_0x2ec937(0x27d);if(this[_0x2ec937(0x4c2)][_0x91b26d])return this[_0x2ec937(0x4c2)][_0x91b26d];let _0x5f0f84='';return _0x5f0f84+='%1'[_0x2ec937(0x325)](this[_0x2ec937(0x2d3)][_0x2ec937(0x400)]),_0x5f0f84;},Window_ShopStatus[_0x23d1fb(0x241)]['drawItemEffectsAddedStatesBuffs']=function(_0xf183b6,_0x21243d,_0x3be268){const _0x394abb=_0x23d1fb,_0x55389d=_0x394abb(0x268);if(!this[_0x394abb(0x2d3)][_0x394abb(0x388)]&&!this[_0x394abb(0x4c2)][_0x55389d])return![];const _0x5de859=this['getItemEffectsAddedStatesBuffsLabel']();this[_0x394abb(0x34f)](_0x5de859,_0xf183b6,_0x21243d,_0x3be268,!![]);const _0x95ac87=this['getItemEffectsAddedStatesBuffsText']();return this[_0x394abb(0x34f)](_0x95ac87,_0xf183b6,_0x21243d,_0x3be268,![],_0x394abb(0x3cb)),this['drawItemDarkRect'](_0xf183b6,_0x21243d,_0x3be268),this[_0x394abb(0x425)](),!![];},Window_ShopStatus['prototype'][_0x23d1fb(0x188)]=function(){const _0xda78a0=_0x23d1fb;return VisuMZ[_0xda78a0(0x248)]['Settings'][_0xda78a0(0x4c6)][_0xda78a0(0x2ed)];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x3e5)]=function(){const _0x32e928=_0x23d1fb,_0x3567eb=_0x32e928(0x268);if(this[_0x32e928(0x4c2)][_0x3567eb])return this[_0x32e928(0x4c2)][_0x3567eb];let _0x133d53='',_0x17d287=0x0;const _0x215efc=0x8;for(const _0x1e0079 of this[_0x32e928(0x2d3)]['addState']){const _0xf3547c=$dataStates[_0x1e0079];if(_0xf3547c&&_0xf3547c[_0x32e928(0x3c9)]>0x0){_0x133d53+=_0x32e928(0x439)[_0x32e928(0x325)](_0xf3547c[_0x32e928(0x3c9)]),_0x17d287++;if(_0x17d287>=_0x215efc)return _0x133d53;}}for(let _0x572819=0x0;_0x572819<this[_0x32e928(0x2d3)][_0x32e928(0x1c3)][_0x32e928(0x401)];_0x572819++){const _0x5d28c1=this[_0x32e928(0x2d3)][_0x32e928(0x1c3)][_0x572819],_0x357959=Game_BattlerBase['prototype'][_0x32e928(0x511)](_0x5d28c1,_0x572819);if(_0x357959>0x0){_0x133d53+=_0x32e928(0x439)['format'](_0x357959),_0x17d287++;if(_0x17d287>=_0x215efc)return _0x133d53;}}return _0x133d53;},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x1fa)]=function(_0x294b83,_0x4e7a04,_0x5b165c){const _0x4087e9=_0x23d1fb,_0x21cc77=_0x4087e9(0x47b);if(!this[_0x4087e9(0x2d3)]['removeStateBuffChanges']&&!this[_0x4087e9(0x4c2)][_0x21cc77])return![];const _0x583608=this[_0x4087e9(0x473)]();this[_0x4087e9(0x34f)](_0x583608,_0x294b83,_0x4e7a04,_0x5b165c,!![]);const _0x135e31=this[_0x4087e9(0x310)]();return this[_0x4087e9(0x34f)](_0x135e31,_0x294b83,_0x4e7a04,_0x5b165c,![],_0x4087e9(0x3cb)),this[_0x4087e9(0x23b)](_0x294b83,_0x4e7a04,_0x5b165c),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x473)]=function(){const _0x1f90ab=_0x23d1fb;return VisuMZ[_0x1f90ab(0x248)][_0x1f90ab(0x357)][_0x1f90ab(0x4c6)][_0x1f90ab(0x1d6)];},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x310)]=function(){const _0x32e9c1=_0x23d1fb,_0x21c2bc=_0x32e9c1(0x47b);if(this[_0x32e9c1(0x4c2)][_0x21c2bc])return this[_0x32e9c1(0x4c2)][_0x21c2bc];let _0x53315f='',_0xb8f311=0x0;const _0x58fe5d=VisuMZ[_0x32e9c1(0x248)][_0x32e9c1(0x357)][_0x32e9c1(0x4c6)][_0x32e9c1(0x219)];for(const _0x1108c9 of this[_0x32e9c1(0x2d3)][_0x32e9c1(0x1ae)]){const _0x71b946=$dataStates[_0x1108c9];if(_0x71b946&&_0x71b946[_0x32e9c1(0x3c9)]>0x0){_0x53315f+=_0x32e9c1(0x439)[_0x32e9c1(0x325)](_0x71b946[_0x32e9c1(0x3c9)]),_0xb8f311++;if(_0xb8f311>=_0x58fe5d)return _0x53315f;}}for(let _0x5aac15=0x0;_0x5aac15<this[_0x32e9c1(0x2d3)][_0x32e9c1(0x3ef)]['length'];_0x5aac15++){const _0x3991f0=Game_BattlerBase[_0x32e9c1(0x241)]['buffIconIndex'](0x1,_0x5aac15);if(_0x3991f0>0x0){_0x53315f+=_0x32e9c1(0x439)['format'](_0x3991f0),_0xb8f311++;if(_0xb8f311>=_0x58fe5d)return _0x53315f;}}for(let _0x2b076b=0x0;_0x2b076b<this[_0x32e9c1(0x2d3)]['removeDebuff'][_0x32e9c1(0x401)];_0x2b076b++){const _0x341ae5=Game_BattlerBase[_0x32e9c1(0x241)][_0x32e9c1(0x511)](-0x1,_0x2b076b);if(_0x341ae5>0x0){_0x53315f+=_0x32e9c1(0x439)[_0x32e9c1(0x325)](_0x341ae5),_0xb8f311++;if(_0xb8f311>=_0x58fe5d)return _0x53315f;}}return _0x53315f;},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x42f)]=function(_0x128996,_0x27031d,_0x3ca65e){const _0xa4ef0=_0x23d1fb;if(this[_0xa4ef0(0x2bc)]['note'][_0xa4ef0(0x2fc)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x1c17cc=String(RegExp['$1'])[_0xa4ef0(0x504)](/[\r\n]+/);for(const _0x141603 of _0x1c17cc){if(_0x141603['match'](/(.*):[ ](.*)/i)){const _0x433f98=String(RegExp['$1'])['trim'](),_0x446b46=String(RegExp['$2'])[_0xa4ef0(0x432)]();this[_0xa4ef0(0x2a4)](_0x433f98,_0x446b46,_0x128996,_0x27031d,_0x3ca65e),_0x27031d+=this[_0xa4ef0(0x314)]();}}}return this[_0xa4ef0(0x425)](),_0x27031d;},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x2a4)]=function(_0x26cdb0,_0x237122,_0x3e5b10,_0x6b659b,_0x51aaed){const _0x28a9a7=_0x23d1fb;this[_0x28a9a7(0x34f)](_0x26cdb0,_0x3e5b10,_0x6b659b,_0x51aaed,!![]),this[_0x28a9a7(0x34f)](_0x237122,_0x3e5b10,_0x6b659b,_0x51aaed,![],_0x28a9a7(0x3cb)),this[_0x28a9a7(0x23b)](_0x3e5b10,_0x6b659b,_0x51aaed),this[_0x28a9a7(0x425)]();},Window_ShopStatus[_0x23d1fb(0x241)]['drawCustomShopGraphic']=function(){const _0x586e73=_0x23d1fb;if(!this[_0x586e73(0x2bc)])return;const _0x2e0b52=this['_item'][_0x586e73(0x4fe)],_0x1e3dfd=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x3363cb=_0x2e0b52[_0x586e73(0x2fc)](_0x1e3dfd);if(_0x3363cb)for(const _0x492186 of _0x3363cb){_0x492186['match'](_0x1e3dfd);const _0xf4b8c=String(RegExp['$1'])['trim']()||'';if(_0xf4b8c==='')continue;const _0x52f9a2=ImageManager[_0x586e73(0x239)](_0xf4b8c);_0x52f9a2[_0x586e73(0x20c)](this[_0x586e73(0x30d)][_0x586e73(0x36d)](this,_0x52f9a2,this[_0x586e73(0x2bc)]));}},Window_ShopStatus[_0x23d1fb(0x241)][_0x23d1fb(0x30d)]=function(_0x347f6e,_0x2c394b){const _0x35dc63=_0x23d1fb;if(this[_0x35dc63(0x2bc)]!==_0x2c394b)return;if(!_0x347f6e)return;if(_0x347f6e[_0x35dc63(0x3f4)]<=0x0||_0x347f6e['height']<=0x0)return;const _0x26e9da=_0x2c394b['note'];let _0x2c356b=_0x35dc63(0x19d);_0x26e9da[_0x35dc63(0x2fc)](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)&&(_0x2c356b=_0x35dc63(0x33e));const _0x53aad3=_0x2c356b==='background'?this[_0x35dc63(0x4bf)]:this['contents'];let _0x3d1353=this[_0x35dc63(0x4a8)],_0x22ae48=this[_0x35dc63(0x270)];_0x26e9da['match'](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)&&(_0x3d1353=Number(RegExp['$1']));_0x26e9da[_0x35dc63(0x2fc)](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&(_0x22ae48=Number(RegExp['$1']));_0x26e9da[_0x35dc63(0x2fc)](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0x3d1353=Number(RegExp['$1']),_0x22ae48=Number(RegExp['$2']));const _0x1300be=Math['min'](0x1,_0x3d1353/_0x347f6e[_0x35dc63(0x3f4)],_0x22ae48/_0x347f6e[_0x35dc63(0x1f9)]);let _0x1fb58c=0x0,_0x4c6037=0x0,_0x3b6ef5=Math[_0x35dc63(0x312)](_0x347f6e[_0x35dc63(0x3f4)]*_0x1300be),_0x4e4a67=Math[_0x35dc63(0x312)](_0x347f6e['height']*_0x1300be),_0x1e5f6e=_0x35dc63(0x1db);_0x26e9da[_0x35dc63(0x2fc)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)&&(_0x1e5f6e=String(RegExp['$1'])[_0x35dc63(0x1bf)]()['trim']());if(_0x1e5f6e==='left')_0x1fb58c=0x0;else _0x1e5f6e==='center'?_0x1fb58c=Math['round']((this[_0x35dc63(0x4a8)]-_0x3b6ef5)/0x2):_0x1fb58c=this[_0x35dc63(0x4a8)]-_0x3b6ef5;let _0x33c6dd='middle';_0x26e9da[_0x35dc63(0x2fc)](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)&&(_0x33c6dd=String(RegExp['$1'])['toLowerCase']()[_0x35dc63(0x432)]());if(_0x33c6dd===_0x35dc63(0x43a))_0x4c6037=0x0;else _0x33c6dd==='middle'?_0x4c6037=Math['round']((this[_0x35dc63(0x270)]-_0x4e4a67)/0x2):_0x4c6037=this[_0x35dc63(0x270)]-_0x4e4a67;_0x26e9da['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x1fb58c+=Number(RegExp['$1']));_0x26e9da['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x4c6037+=Number(RegExp['$1']));_0x26e9da[_0x35dc63(0x2fc)](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)&&(_0x1fb58c+=Number(RegExp['$1']),_0x4c6037+=Number(RegExp['$2']));let _0x43f8ce=0xff;if(_0x26e9da[_0x35dc63(0x2fc)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i))_0x43f8ce=Number(RegExp['$1']);else _0x26e9da[_0x35dc63(0x2fc)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)&&(_0x43f8ce=Math[_0x35dc63(0x291)](Number(RegExp['$1'])*0.01*0xff)[_0x35dc63(0x3b7)](0x0,0xff));_0x53aad3['paintOpacity']=_0x43f8ce,_0x53aad3[_0x35dc63(0x1b8)](_0x347f6e,0x0,0x0,_0x347f6e['width'],_0x347f6e[_0x35dc63(0x1f9)],_0x1fb58c,_0x4c6037,_0x3b6ef5,_0x4e4a67),_0x53aad3[_0x35dc63(0x4f7)]=0xff;};function _0x198d(){const _0x48771e=['ARRAYSTRUCT','mhp','Translucent','adjustHiddenShownGoods','changeEquipById','Window_ItemList_colSpacing','setValue','DEF','getItemRepeatsText','ARRAYFUNC','_itemWindow','ItemMenuStatusRect','getItemsEquipsCoreBackColor1','_bypassNewLabel','drawUpdatedParamName','Scene_Equip_helpWindowRect','commandNameWindowDrawText','drawing','isClearCommandAdded','wtypeId','Scene_Boot_onDatabaseLoaded','getItemEffectsRemovedStatesBuffsLabel','DrawEquipData','clear','CmdIconSell','ParamChangeFontSize','setObject','optimize','Scope%1','REMOVED\x20EFFECTS','isHandled','drawParamText','helpAreaTop','createStatusWindow','activateItemWindow','ARRAYEVAL','checkShiftRemoveShortcut','drawItemQuantity','weapon','MP\x20DAMAGE','categoryNameWindowCenter','Scene_Equip_itemWindowRect','drawItemCost','Scene_Shop_onCategoryCancel','drawIcon','item-%1','uiMenuStyle','_categoryWindow','Window_EquipStatus_refresh','setupItemDamageTempActors','commandNameWindowCenter','paramValueByName','drawActorParamDifference','getItemOccasionText','isSoleWeaponType','buttonAssistText2','SellPriceJS','armors','meetsItemConditionsJS','List','makeItemData','isOpenAndActive','Window_ItemList_updateHelp','Actors','13714IZtsmc','icon','mainFontSize','isGoodShown','helpWindowRectItemsEquipsCore','itemWindowRectItemsEquipsCore','possession','parameters','CmdHideDisabled','battleMembers','innerWidth','onTouchCancel','FontFace','Scene_Item_create','armor-%1','isWeapon','equipAdjustHpMp','FadeSpeed','numItems','VisuMZ_1_SkillsStatesCore','setHp','drawItemEffectsMpDamage','_equips','Game_Party_setupBattleTestItems_artifact','systemColor','ConvertParams','commandBuyItemsEquipsCore','exit','6647292sxfTfn','addCommand','Window_ItemList_maxCols','Scene_Equip_onSlotOk','_newLabelOpacity','contentsBack','CommandAddClear','LayoutStyle','_customItemInfo','getItemEffectsHpDamageLabel','_slotWindow','setBackgroundType','StatusWindow','FieldUsable','_armorIDs','commandStyleCheck','onTouchOk','buttonAssistText3','left','getItemConsumableText','artifacts','getNextAvailableEtypeId','drawTextEx','Scene_Shop_commandSell','Scene_Equip_slotWindowRect','isOptimizeCommandEnabled','hide','CmdIconOptimize','setNewItem','create','drawUpdatedAfterParamValue','drawItemEffectsMpRecovery','ARRAYJSON','removeBattleTestArtifacts','scrollTo','ITEMS_EQUIPS_CORE','refreshActorEquipSlotsIfUpdated','buttonAssistText1','isOptimizeEquipOk','clearEquipments','updateChangedSlots','occasion','getMenuImage','deselect','calcWindowHeight','Scene_Shop_activateSellWindow','_allowArtifactParamBase','DrawIcons','isBuyCommandEnabled','BuyPriceJS','onDatabaseLoaded','remove','repeats','_data','createCommandWindow','updateHelp','_newLabelOpacityChange','forceChangeEquipSlots','refreshCursor','addCancelCommand','LabelSelfGainTP','paintOpacity','EFFECT_ADD_BUFF','OffsetY','buttonAssistSlotWindowShift','bitmap','Param','Style','note','_buyWindowLastIndex','translucentOpacity','addOptimizeCommand','EFFECT_GAIN_TP','FadeLimit','split','uiHelpPosition','mainCommandWidth','forceChangeEquip','playEquip','Speed2000','Scene_Shop_onBuyOk','createCommandNameWindow','W%1','itemDataFontSize','updateSmoothScroll','hideNewLabelSprites','successRate','buffIconIndex','Game_Actor_changeEquip','1285144yHLfla','_resetFontSize','QUANTITY','reloadMapIfUpdated','ItemQuantityFmt','updateMoneyAmount','Game_Actor_artifact','addBuyCommand','processCursorMove','commandStyle','(+%1)','characterName','initNewItemsList','CannotEquipMarker','onSellOkItemsEquipsCore','drawItemNumber','down','isRepeated','mpRate','getWeaponIdWithName','Game_Party_gainItem','EquipAdjustHpMp','pageup','value1','isEquipItem','setStatusWindow','updateCommandNameWindow','setHelpWindow','refreshItemsEquipsCoreNoMenuImage','isClearCommandEnabled','paramValueFontSize','_bypassProxy','rateHP','isShiftRemoveShortcutEnabled','Damage\x20Formula\x20Error\x20for\x20%1','getItemEffectsAddedStatesBuffsLabel','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','getItemSpeedLabel','EquipParams','Scene_Shop_onBuyCancel','Scene_Shop_onSellOk','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','drawItemData','(%1)','isHoverEnabled','normalColor','isProxyItem','categoryItemTypes','mainAreaTop','_newLabelOpacityUpperLimit','processCursorSpecialCheckModernControls','buy','getItemEffects','BackRectColor','Game_Enemy_traitObjects_artifact','buttonAssistKey3','background','CmdIconClear','show','rateMP','DAMAGE\x20MULTIPLIER','drawItemName','keyItem','Game_Item_setObject','categoryNameWindowDrawText','MaxWeapons','ShopMenuStatusStandard','initNewLabelSprites','gaugeLineHeight','_scrollDuration','equipTypes','isItem','Parse_Notetags_ParamValues','removeState','getItemEffectsTpDamageLabel','Scene_Shop_prepare','SwitchID','processHandling','drawItemEffectsHpDamage','optimizeCmdDesc','getItemsEquipsCoreBackColor2','onCategoryCancelItemsEquipsCore','11130TVPXqa','blt','popScene','getInputButtonString','drawRemoveItem','getMatchingInitEquip','Window_ShopCommand_initialize','_weaponIDs','toLowerCase','JSON','concat','HIT\x20TYPE','changeBuff','statusWindowRectItemsEquipsCore','contents','TextAlign','itemTextAlign','Step1Start','flatHP','forceResetEquipSlots','Scene_Shop_buyWindowRect','Speed0','updateCategoryNameWindow','isUseParamNamesWithIcons','Scene_Item_createItemWindow','createBitmap','_bypassReleaseUnequippableItemsItemsEquipsCore','Game_BattlerBase_param_artifact','currencyUnit','STRUCT','sellingPrice','LabelRemove','opacity','Remove\x20all\x20available\x20equipment.','bestEquipItem','SCOPE','center','loadFaceImages','push','EnableLayout','buyWindowRectItemsEquipsCore','Scene_Shop_commandWindowRect','Game_Party_gainItem_artifact','description','getTextColor','getItemEffectsTpDamageText','DrawPortraitJS','nonRemovableEtypes','Scene_Equip_createSlotWindow','Blacklist','SpeedNeg2000','Parse_Notetags_Category','getItemEffectsSelfTpGainText','Game_BattlerBase_param','geUpdatedLayoutStatusWidth','SetupProxyItemGroups','onBuyCancelItemsEquipsCore','status','constructor','ConvertNumberToString','Scene_Shop_helpWindowRect','allowCommandWindowCursorUp','CmdIconBuy','createItemWindow','drawItemHitType','200715VoBmpn','height','drawItemEffectsRemovedStatesBuffs','itemEnableJS','textSizeEx','allowCreateStatusWindow','RegExp','isNewItem','isShowNew','Scene_Shop_sellWindowRect','Game_Party_initialize','_slotId','number','getItemScopeText','Parse_Notetags_EquipSlots','_numberWindow','getItemConsumableLabel','numberWindowRectItemsEquipsCore','ParseItemNotetags','helpWindowRect','addLoadListener','numberWindowRect','CmdTextAlign','values','dataId','Icon','money','makeDeepCopy','USER\x20TP\x20GAIN','itemAt','helpDesc','EFFECT_ADD_STATE','_tempActorB','MaxIcons','playBuzzerSound','_itemIDs','_goodsCount','_sellWindow','categoryWindowRect','AllWeapons','isPressed','cursorPageup','isEquipCommandAdded','Window_ItemList_item','_shopStatusMenuAlly','createSlotWindow','canUse','Game_Actor_paramPlus','buttonAssistKey2','buttonAssistItemListRequirement','maxItems','buttonAssistCategory','_helpWindow','postCreateSellWindowItemsEquipsCore','atypeId','pagedown','_doubleTouch','helpAreaHeight','PurchaseOnly','onMenuImageLoad','processDrawIcon','active','meetsItemConditionsNotetags','onCategoryCancel','updatedLayoutStyle','loadPicture','isUseItemsEquipsCoreUpdatedLayout','drawItemDarkRect','maxItemAmount','helpDescriptionText','setTopRow','isEquipped','prepare','prototype','params','isSellCommandEnabled','isTriggered','drawItemStyleIcon','Scene_Shop_doBuy','Window_ShopBuy_price','ItemsEquipsCore','ExtDisplayedParams','getItemDamageElementText','BorderRegExp','RegularItems','_statusWindow','paramJS','Window_Selectable_initialize','commandNameWindowDrawBackground','LabelDamageHP','STR','isSoleArmorType','fontSizeRatio','_actor','NoChangeMarker','parse','Scene_Shop_onSellCancel','Scene_Equip_onSlotCancel','isPageChangeRequested','goldWindowRectItemsEquipsCore','commandWindowRect','toUpperCase','checkItemConditionsSwitchNotetags','getItemEffectsMpRecoveryText','isHovered','pop','iconText','Scene_Shop_numberWindowRect','maxCols','buttonAssistSmallIncrement','drawItemEffectsTpRecovery','createNewLabelSprite','ADDED\x20EFFECTS','Scene_Shop_categoryWindowRect','drawUpdatedParamValueDiff','determineBaseSellingPrice','elementId','isPlaytest','playCursorSound','categoryList','innerHeight','CmdIconEquip','KeyItemProtect','LabelHitType','smallParamFontSize','ELEMENT','index','AlwaysUsable','isOptimizeCommandAdded','getItemEffectsMpRecoveryLabel','doSell','Game_Actor_discardEquip','revertGlobalNamespaceVariables','TP\x20DAMAGE','uiInputPosition','getItemIdWithName','process_VisuMZ_ItemsEquipsCore_RegExp','Scene_ItemBase_activateItemWindow','auto','postCreateItemWindowModernControls','makeCommandList','name','HP\x20RECOVERY','setItemWindow','armor','HiddenItemA','processShiftRemoveShortcut','drawCurrencyValue','categoryWindowRectItemsEquipsCore','prepareItemCustomData','drawItemEquipType','isDrawItemNumber','getDamageStyle','round','HitType%1','LabelDamageTP','×%1','mainAreaHeight','textColor','VisuMZ_0_CoreEngine','AlreadyEquipMarker','anyEmptyEquipSlotsOfSameEtype','resetTextColor','ShiftShortcutKey','addState','isCancelled','drawNewLabelText','ceil','allowShiftScrolling','visible','buyWindowRect','itemHasEquipLimit','drawItemCustomEntryLine','itemPadding','slotWindowRect','weapon-%1','getItemQuantityText','SwitchSell','setupBattleTestItems','cursorPagedown','process_VisuMZ_ItemsEquipsCore_Notetags','4145888JDElcX','Scene_Equip_onActorChange','troopArtifacts','categoryNameWindowDrawBackground','ScopeRandomAllies','FUNC','text','_forcedSlots','smoothScrollTo','_scene','atk','cursorLeft','Window_ShopBuy_refresh','gaugeBackColor','isArmor','_item','HP\x20DAMAGE','Scene_Item_itemWindowRect','convertInitEquipsToItems','fill','_handlers','callUpdateHelp','mmp','drawItemEffectsHpRecovery','isEquipCommandEnabled','_newLabelSprites','Game_Party_numItems','MultiplierStandard','currentSymbol','Scene_Equip_commandEquip','VisuMZ_1_BattleCore','textWidth','sellPriceOfItem','equipSlotIndex','processTouchModernControls','0000','tradeItemWithParty','_buyWindow','_itemData','sellWindowRectItemsEquipsCore','itypeId','getItemEffectsTpRecoveryText','Scene_Equip_commandWindowRect','_allowArtifactTraitObjects','addSellCommand','Speed1000','DrawBackRect','loseItem','canConsumeItem','isArtifact','drawParamsItemsEquipsCore','max','categoryStyle','tpGain','user','drawItemStyleIconText','placeItemNewLabel','getItemColor','CmdCancelRename','categories','_cache','elements','changeEquip','powerDownColor','LabelApply','isClicked','BattleUsable','LabelElement','addItemCategory','equip','isTroopArtifact','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','SpeedNeg1999','ScopeRandomAny','4120417HQqGPH','version','Window_Selectable_update','canEquip','categoryStyleCheck','match','drawItemSuccessRate','ActorChangeEquipSlots','cancel','LabelRepeats','Game_BattlerBase_paramPlus_artifact','NonOptimizeETypes','releaseUnequippableItems','damageColor','CoreEngine','Step3End','hitIndex','MaxItems','effects','BatchShop','armorTypes','getEmptyEquipSlotOfSameEtype','drawCustomShopGraphicLoad','resetShopSwitches','getItemDamageAmountLabelBattleCore','getItemEffectsRemovedStatesBuffsText','Scene_Shop_doSell','floor','newLabelEnabled','lineHeight','playOkSound','getItemSuccessRateLabel','paramchangeTextColor','Step2Start','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Game_BattlerBase_canEquip_artifact','_tempActor','NotConsumable','setItem','iconHeight','currentExt','item','drawItemDamageAmount','\x5cI[%1]%2','MenuPortraits','filter','format','Scene_Shop_createSellWindow','doBuy','onBuyOk','shift','ParseAllNotetags','drawItemDamage','255bFvNjT','#%1','createSellWindow','%1-%2','isRightInputMode','FontSize','onTouchSelectModern','New','buyingPrice','onBuyCancel','statusWindowRect','commandEquip','consumable','ActorResetEquipSlots','getItemDamageAmountLabel','Text','_calculatingJSParameters','LUK','foreground','splice','isOpen','drawText','getItemEffectsMpDamageText','LabelRecoverHP','map','Step1End','sellPriceRate','_newItemsList','cursorRight','Scene_Item_categoryWindowRect','EFFECT_RECOVER_MP','Step2End','Scene_Load_reloadMapIfUpdated','processCursorMoveModernControls','_category','drawItemKeyData','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','isCursorMovable','boxWidth','equip2','optKeyItemsNumber','partyArtifacts','_goods','Settings','100%','Parse_Notetags_Prices','colSpacing','selfTP','MDF','onCategoryOk','statusWidth','commandBuy','processCursorHomeEndTrigger','QoL','MP\x20RECOVERY','gainItem','getInputMultiButtonStrings','A%1','Parse_Notetags_EnableJS','Scene_Shop_create','members','drawParamName','adjustItemWidthByStatus','previousActor','FontColor','bind','cursorDown','Consumable','getItemEffectsMpDamageLabel','SetupProxyItemGroup','drawItemEffectsSelfTpGain','isClearEquipOk','_shopStatusMenuMode','EFFECT_REMOVE_BUFF','isKeyItem','paramPlus','EFFECT_REMOVE_STATE','windowPadding','currentClass','Scene_Equip_create','onTouchSelect','onTouchSelectModernControls','Window_ShopStatus_setItem','LabelConsume','Scene_Shop_buyingPrice','drawItemConsumable','ParseClassNotetags','actor','getItemSuccessRateText','ElementWeapon','isPartyArtifact','itemLineRect','addStateBuffChanges','update','defaultItemMax','getItemDamageElementLabel','onSlotOk','shouldCommandWindowExist','equips','?????','object','changeTextColor','speed','commandName','etypeId','getItemHitTypeText','IncludeShopItem','MaxMP','Window_EquipCommand_initialize','Scene_Equip_createCommandWindow','includes','Window_EquipItem_includes','getItemEffectsHpRecoveryLabel','Scene_Item_createCategoryWindow','getItemEffectsHpDamageText','_purchaseOnly','onSlotCancel','ParseArmorNotetags','initEquips','drawItemRepeats','EFFECT_REMOVE_DEBUFF','drawActorCharacter','meetsItemConditions','createCategoryWindow','loadCharacter','commandSellItemsEquipsCore','Parse_Notetags_Batch','postCreateCategoryWindowItemsEquipsCore','isBattleTest','removeDebuff','CmdStyle','EquipScene','powerUpColor','log','modifiedBuyPriceItemsEquipsCore','Window_ItemCategory_setItemWindow','_dummyWindow','paramPlusItemsEquipsCoreCustomJS','drawCustomShopGraphic','clamp','commandSell','SUCCESS\x20RATE','setCategory','addChild','drawPossession','isUseModernControls','LabelRecoverTP','param','maxVisibleItems','ItemMenuStatusBgType','paramId','refresh','ScopeAlliesButUser','getColor','isEnabled','equipSlots','isEquipChangeOk','iconIndex','removeStateBuffChanges','right','damage','getItemEffectsTpRecoveryLabel','value2','_commandNameWindow','goldWindowRect','flatMP','isStackableArtifact','sell','Step3Start','Window_ItemCategory_initialize','replace','LabelSpeed','drawItemOccasion','isSkill','addItemCategories','ShopScene','fontFace','AGI','%1%','CommandAddOptimize','ARRAYSTR','SwitchBuy','Speed1','setTempActor','Parse_Notetags_ParamJS','getItemEffectsAddedStatesBuffsText','prepareNextScene','slotWindowRectItemsEquipsCore','+%1%','isShiftShortcutKeyForRemove','smoothSelect','addClearCommand','type','EVAL','actorParams','removeBuff','Scene_Shop_goldWindowRect','_commandWindow','Window_ShopBuy_item','getItemDamageAmountTextOriginal','width','MAT','value','Scene_Equip_statusWindowRect','buttonAssistLargeIncrement','hideAdditionalSprites','addInnerChild','canShiftRemoveEquipment','getItemRepeatsLabel','buttonAssistOffset3','ItemScene','activateSellWindow','gainTP','length','isMainMenuCoreMenuImageOptionAvailable','price','Window_ShopSell_isEnabled','loadSystem','CmdIconCancel','Game_Actor_equips_artifacts','activate','fillRect','ParseWeaponNotetags','Window_EquipItem_isEnabled','isSceneShop','86tYIpkK','switchProxyItem','sellWindowRect','TP\x20RECOVERY','onSlotOkAutoSelect','NonRemoveETypes','clearNewItem','CONSUMABLE','initialize','getItemSpeedText','getProxyItem','hideDisabledCommands','weaponTypes','Scene_Item_helpWindowRect','traitObjects','indexOf','hitType','Window_Selectable_setHelpWindowItem','nonOptimizeEtypes','MANUAL','getArmorIdWithName','_categoryNameWindow','RemoveEquipText','itemWindowRect','resetFontSettings','baseSellingPrice','Width','fontSize','DamageType%1','addEquipCommand','getItemEffectsHpRecoveryText','Game_Actor_tradeItemWithParty','isCommandEnabled','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','drawItemCustomEntries','StatusWindowWidth','iconWidth','trim','Game_BattlerBase_meetsItemConditions','updateNewLabelOpacity','select','AllItems','postCreateItemsEquipsCore','SellPriceRate','\x5cI[%1]','top','Categories','commandWindowRectItemsEquipsCore','Game_Actor_forceChangeEquip','DrawParamJS','_list','cursorUp','KeyItems','onSellCancel','ListWindowCols','proxyItem','onSellOk','setHandler','drawNewLabelIcon','IconSet','return\x200','RemoveEquipIcon','call','buttonAssistKey1','placeNewLabel','drawItemEffectsTpDamage','deactivate','MaxArmors','_resetFontColor','setShopStatusWindowMode','drawItem','MaxHP','Window_ItemList_drawItem','isBottomHelpMode','createCategoryNameWindow','drawItemDamageElement','onActorChange','getItemDamageAmountTextBattleCore','prepareNewEquipSlotsOnLoad','changePaintOpacity','limitedPageUpDownSceneCheck'];_0x198d=function(){return _0x48771e;};return _0x198d();}