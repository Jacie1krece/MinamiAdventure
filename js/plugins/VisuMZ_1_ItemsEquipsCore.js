//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.48;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.48] [ItemsEquipsCore]
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
 * <Conserve: x%>
 * 
 * - Used for: Item
 * - Gives the item a percent chance when used to not consume the item.
 * - Replace 'x' with a number representing the percent chance to successfully
 *   conserve the item.
 * - If an item cannot be consumed, conserve chance will be 100% regardless.
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
 * <Equip For Class Only: x>
 * <Equip For Classes Only: x, x, x>
 * <Equip For Class Only: name>
 * <Equip For Classes Only: name, name, name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - This piece of equipment can only be worn by members with 'x' as the main
 *   class. If there are multiple classes listed, at least one of them need to
 *   be the actor's main class.
 * - Replace 'x' with a number representing the ID of the class required.
 * - For the 'name' variant, replace 'name' with the name of the required class
 *   the actor needs to have in order to equip this object.
 * 
 * ---
 * 
 * <Equip Requirements>
 *  requirement
 *  requirement
 *  requirement
 * </Equip Requirements>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Defines a requirement(s) for the actor to meet in order for the equip item
 *   to be equippable.
 * - Failure to meet these requirements will cause the equipment to unequip
 *   automatically.
 *   - Keep in mind that in some cases, this will not happen immediately.
 *     Things like switches will require the actor to meet its cache clear
 *     in order to trigger the automatic unequip.
 *   - Some ways to trigger a cache clear would be to change the actor's HP/MP,
 *     or adding and then removing a state for the actor (preferrably an unused
 *     state that has no real effect).
 * - Replace 'requirement' with one of the settings bellow:
 * - Add multiple 'requirement' lines for more requirements.
 * 
 *   Requirements:
 *
 *   param > x
 *   param >= x
 *   param === x
 *   param <= x
 *   param < x
 *   - Replace 'param' with 'level', 'maxhp', 'maxmp', 'atk', 'def', 'mat',
 *     'mdf', 'agi', or 'luk'.
 *   - This will make the piece of equipment require the actor's base parameter
 *     to be greater than (>), greater than or equal to (>=), equal to (===),
 *     less than or equal to (<=), or less than (<).
 *   - This is NOT the value for the total parameter, only the base parameter.
 *   - The base parameter is calculated by the user's class parameter value and
 *     any bonuses received through permanent stat increases.
 *
 *   learned skill: x
 *   learned skill: name
 *   - This will make the piece of equipment require the actor to have learned
 *     skill 'x'. 
 *   - If 'name' is used, priority will be given to the skill with the highest
 *     ID in the database.
 *   - The actor needs to have LEARNED the skill. This means that if you have
 *     added a skill to the actor's kit through a trait, it will not count.
 *
 *   switch: x
 *   - This will require switch X to be on.
 *   - If it isn't, the piece of equipment cannot be worn.
 *   - Insert multiple of these to add more switches that are are required to
 *     be on.
 * 
 *   ***NOTE 1***
 *   There is no "class: x" for these equip requirements. Instead, use the
 *   <Equip For Class Only: x> notetags.
 * 
 *   ***NOTE 2***
 *   For those wondering where "unique only" is, that does not exist in this
 *   plugin. Instead, use the <Equip Copy Limit: x> notetag listed above.
 * 
 *   Example A:
 * 
 *     <Equip Requirements>
 *     level >= 20
 *     </Equip Requirements>
 * 
 *     - Requires the user to be at least level 20 in order to equip.
 * 
 *   Example B:
 * 
 *     <Equip Requirements>
 *     atk >= 50
 *     def <= 50
 *     </Equip Requirements>
 *     - Requires the user have at least 50 base ATK to equip.
 *     - Requires the user to be under 50 base DEF to equip.
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
 * <Buy Turn On Switch: x>
 * <Buy Turn On Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is bought in the shop scene, turn on the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn on.
 *   - Insert multiple 'x' values to turn on multiple switches upon buying.
 * 
 * ---
 * 
 * <Buy Turn Off Switch: x>
 * <Buy Turn Off Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is bought in the shop scene, turn off the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn off.
 *   - Insert multiple 'x' values to turn off multiple switches upon buying.
 * 
 * ---
 * 
 * <Sell Turn On Switch: x>
 * <Sell Turn On Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is sold in the shop scene, turn on the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn on.
 *   - Insert multiple 'x' values to turn on multiple switches upon selling.
 * 
 * ---
 * 
 * <Sell Turn Off Switch: x>
 * <Sell Turn Off Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is sold in the shop scene, turn off the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn off.
 *   - Insert multiple 'x' values to turn off multiple switches upon selling.
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
 *   Delay MS:
 *   - How many milliseconds (MS) to delay the preview update?
 *   - This is to prevent lag spikes for equips only.
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
 * Version 1.48: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a problem where the help window position of the non-updated layout
 *    would appear in the wrong position. Fix made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized when weapons and armors exceed 2000
 *    in database quantity.
 * 
 * Version 1.47: July 13, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the shop status window to display incorrect
 *    removed buffs and debuffs. Fix made by Olivia.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Changes made to dynamic shop listings in order to update upon listing
 *    changes rather than having to enter and exit the shop again. Update made
 *    by Arisu.
 * * New Features!
 * ** New notetag effects added by Arisu and sponsored by AndyL:
 * *** <Conserve: x%>
 * **** Gives the item a percent chance when used to not consume the item.
 * *** <Buy Turn On Switches: x, x, x>
 * *** <Buy Turn Off Switches: x, x, x>
 * *** <Sell Turn On Switches: x, x, x>
 * *** <Sell Turn Off Switches: x, x, x>
 * **** When buying/selling an item, weapon, or armor with these notetags,
 *      turn on/off switch(es) 'x'.
 * *** New Plugin Parameters added by Arisu:
 * **** Params > Settings > Shop Status Window > Equipment Data > Delay MS:
 * ***** How many milliseconds (MS) to delay the preview update?
 * ***** This is to prevent lag spikes for equips only.
 * 
 * Version 1.46: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a problem where the help and input modes are not adequately
 *    adjusted when not used with the updated layout or without the Options
 *    Core custom UI placement. Fix made by Arisu.
 * 
 * Version 1.45: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause equip slots to not be recognized properly if
 *    the equip slot name ends in a space.
 * 
 * Version 1.44: April 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag effects added by Arisu and sponsored by Anon:
 * *** <Equip For Class Only: x>
 * *** <Equip For Classes Only: x, x, x>
 * *** <Equip For Class Only: name>
 * *** <Equip For Classes Only: name, name, name>
 * **** The piece of equipment can only be worn by the listed classes.
 * *** <Equip Requirements> notetag added.
 * **** Define multiple requirements that the actor needs to meet in order for
 *      this equip item to be equippable.
 * **** See help file for more information on the types of requirements that
 *      can be added.
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
 * @param EquipDelayMS:num
 * @text Delay MS
 * @parent EquipData
 * @type number
 * @min 1
 * @max 999
 * @desc How many milliseconds (MS) to delay the preview update?
 * This is to prevent lag spikes for equips only.
 * @default 240
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

//=============================================================================
// Setup Plugin Parameters
//=============================================================================

var label = 'ItemsEquipsCore';
var tier = tier || 0;
var dependencies = [];
var pluginData = $plugins.filter(function(p) { return p.status && p.description.includes('['+label+']') })[0];
VisuMZ[label].Settings = VisuMZ[label].Settings || {};

VisuMZ.ConvertParams = function(obj, data) {
    for (const key in data) {
        if (key.match(/(.*):(.*)/i)) {
            // Key and Type
            const objKey = String(RegExp.$1);
            const objType = String(RegExp.$2).toUpperCase().trim();

            // Parse Data
            let value; let arr; let newData;
            switch (objType) {
                case 'NUM':
                    value = data[key] !== '' ? Number(data[key]) : 0;
                    break;
                case 'ARRAYNUM':
                    arr = data[key] !== '' ? JSON.parse(data[key]) : [];
                    value = arr.map(i => Number(i));
                    break;
                case 'EVAL':
                    value = data[key] !== '' ? eval(data[key]) : null;
                    break;
                case 'ARRAYEVAL':
                    arr = data[key] !== '' ? JSON.parse(data[key]) : [];
                    value = arr.map(i => eval(i));
                    break;
                case 'JSON':
                    value = data[key] !== '' ? JSON.parse(data[key]) : '';
                    break;
                case 'ARRAYJSON':
                    arr = data[key] !== '' ? JSON.parse(data[key]) : [];
                    value = arr.map(i => JSON.parse(i));
                    break;
                case 'FUNC':
                    value = data[key] !== '' ? new Function(JSON.parse(data[key])) : new Function('return 0');
                    break;
                case 'ARRAYFUNC':
                    arr = data[key] !== '' ? JSON.parse(data[key]) : [];
                    value = arr.map(i => new Function(JSON.parse(i)));
                    break;
                case 'STR':
                    value = data[key] !== '' ? String(data[key]) : '';
                    break;
                case 'ARRAYSTR':
                    arr = data[key] !== '' ? JSON.parse(data[key]) : [];
                    value = arr.map(i => String(i));
                    break;
                case 'STRUCT':
                    newData = data[key] !== '' ? JSON.parse(data[key]) : {};
                    obj[objKey] = {};
                    VisuMZ.ConvertParams(obj[objKey], newData);
                    continue;
                case 'ARRAYSTRUCT':
                    arr = data[key] !== '' ? JSON.parse(data[key]) : [];
                    value = arr.map(i => VisuMZ.ConvertParams({}, JSON.parse(i)));
                    break;
                default:
                    continue;
            }

            // Set Value
            obj[objKey] = value;
        }
    }
    return obj;
};

((pluginData) => {
    const name = pluginData.name;
    // Dependency Check
    for (const dependency of dependencies) {
        if (!Imported[dependency]) {
            alert('%1 is missing a required plugin.\nPlease install %2 into the Plugin Manager.'.format(name, dependency));
            SceneManager.exit();
            break;
        }
    }
    // Description Check
    const desc = pluginData.description;
    // Version Check
    if (desc.match(/\[Version[ ](.*?)\]/i)) {
        const descVersion = Number(RegExp.$1);
        if (descVersion !== VisuMZ[label].version) {
            alert('%1\'s version does not match plugin\'s. Please update it in the Plugin Manager.'.format(name, descVersion));
            SceneManager.exit();
        }
    }
    // Tier Order Check
    if (desc.match(/\[Tier[ ](\d+)\]/i)) {
        const descTier = Number(RegExp.$1);
        if (descTier < tier) {
            alert('%1 is incorrectly placed on the plugin list.\nIt is a Tier %2 plugin placed over other Tier %3 plugins.\nPlease reorder the plugin list from smallest to largest tier numbers.'.format(name, descTier, tier));
            SceneManager.exit();
        } else {
            tier = Math.max(descTier, tier);
        }
    }
    // Convert Plugin Parameters
    VisuMZ.ConvertParams(VisuMZ[label].Settings, pluginData.parameters);

})(pluginData);

//-----------------------------------------------------------------------------
// Plugin Commands
//
// Register new plugin commands here.

//-----------------------------------------------------------------------------
// Actor
//-----------------------------------------------------------------------------

PluginManager.registerCommand(pluginData.name, "ActorChangeEquipSlots", args => {
    // Convert Arguments
    VisuMZ.ConvertParams(args, args);

    // Declare Constants
    const actors = args.Actors.map(id => $gameActors.actor(id));
    const slots = args.Slots.map(line => $dataSystem.equipTypes.indexOf(line.trim()));
    
    // Perform
    for (const actor of actors) {
        if (!actor) continue;
        actor.forceChangeEquipSlots(slots);
    }
});

PluginManager.registerCommand(pluginData.name, "ActorResetEquipSlots", args => {
    // Convert Arguments
    VisuMZ.ConvertParams(args, args);

    // Declare Constants
    const actors = args.Actors.map(id => $gameActors.actor(id));
    
    // Perform
    for (const actor of actors) {
        if (!actor) continue;
        actor.forceResetEquipSlots();
    }
});

//-----------------------------------------------------------------------------
// Shop
//-----------------------------------------------------------------------------

PluginManager.registerCommand(pluginData.name, "BatchShop", args => {
    // Convert Arguments
    VisuMZ.ConvertParams(args, args);

    // Declare Variables
    const goods = [];
    const blacklist = args.Blacklist.map(str => str.toUpperCase().trim());
    const whitelist = args.Whitelist.map(str => str.toUpperCase().trim());

    // Step 1
    const s1 = (args.Step1End >= args.Step1Start) ? args.Step1Start : args.Step1End;
    const e1 = (args.Step1End >= args.Step1Start) ? args.Step1End : args.Step1Start;
    const step1 = Array(e1 - s1 + 1).fill().map((_, index) => s1 + index);

    for (const id of step1) {
        const item = $dataItems[id];
        if (!item) continue;
        if (!VisuMZ.ItemsEquipsCore.IncludeShopItem(item, blacklist, whitelist)) continue;
        goods.push([0, id, 0, item.price]);
    }

    // Step 2
    const s2 = (args.Step2End >= args.Step2Start) ? args.Step2Start : args.Step2End;
    const e2 = (args.Step2End >= args.Step2Start) ? args.Step2End : args.Step2Start;
    const step2 = Array(e2 - s2 + 1).fill().map((_, index) => s2 + index);

    for (const id of step2) {
        const item = $dataWeapons[id];
        if (!item) continue;
        if (!VisuMZ.ItemsEquipsCore.IncludeShopItem(item, blacklist, whitelist)) continue;
        goods.push([1, id, 0, item.price]);
    }

    // Step 3
    const s3 = (args.Step3End >= args.Step3Start) ? args.Step3Start : args.Step3End;
    const e3 = (args.Step3End >= args.Step3Start) ? args.Step3End : args.Step3Start;
    const step3 = Array(e3 - s3 + 1).fill().map((_, index) => s3 + index);

    for (const id of step3) {
        const item = $dataArmors[id];
        if (!item) continue;
        if (!VisuMZ.ItemsEquipsCore.IncludeShopItem(item, blacklist, whitelist)) continue;
        goods.push([2, id, 0, item.price]);
    }
    
    // Finalize
    SceneManager.push(Scene_Shop);
    SceneManager.prepareNextScene(goods, args.PurchaseOnly);
});

VisuMZ.ItemsEquipsCore.IncludeShopItem = function(item, blacklist, whitelist) {
    // Smart Filter
    if (item.name.trim() === '') return false;
    if (item.name.match(/-----/i)) return false;

    // Categories
    const categories = item.categories;

    // Blacklist Check
    if (blacklist.length > 0) {
        for (const category of blacklist) {
            if (!category) continue;
            if (categories.includes(category)) return false;
        }
    }

    // Whitelist Check
    if (whitelist.length > 0) {
        for (const category of whitelist) {
            if (!category) continue;
            if (categories.includes(category)) return true;
        }
        return false;
    }

    // Return True
    return true;
};

//-----------------------------------------------------------------------------
// Scene_Boot
//
// The scene class for initializing the entire game.

VisuMZ.ItemsEquipsCore.Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
Scene_Boot.prototype.onDatabaseLoaded = function() {
    this.process_VisuMZ_ItemsEquipsCore_RegExp();

    VisuMZ.ItemsEquipsCore.Scene_Boot_onDatabaseLoaded.call(this);

    this.process_VisuMZ_ItemsEquipsCore_Notetags();
    VisuMZ.ItemsEquipsCore.SetupProxyItemGroups(); // v1.37 added by Arisu
    VisuMZ.ItemsEquipsCore.SetupArtifactItemIDs(); // v1.48 added by Olivia
};

Scene_Boot.prototype.process_VisuMZ_ItemsEquipsCore_RegExp = function() {
    VisuMZ.ItemsEquipsCore.RegExp = {};
    VisuMZ.ItemsEquipsCore.RegExp.EquipParams = [];
    VisuMZ.ItemsEquipsCore.RegExp.BorderRegExp = [];
    const params = ['MaxHP','MaxMP','ATK','DEF','MAT','MDF','AGI','LUK'];
    for (const param of params) {
        const notetag = '<%1:[ ]([\\+\\-]\\d+)>'.format(param);
        VisuMZ.ItemsEquipsCore.RegExp.EquipParams.push(new RegExp(notetag, 'i'));
        const borderCheck = '\\b%1\\b'.format(param);
        VisuMZ.ItemsEquipsCore.RegExp.BorderRegExp.push(new RegExp(borderCheck, 'g'));
    }
};

Scene_Boot.prototype.process_VisuMZ_ItemsEquipsCore_Notetags = function() {
    // v1.13 added by Yanfly
    // Return Check
    if (VisuMZ.ParseAllNotetags) return;

    // Classes
    this.process_VisuMZ_ItemsEquipsCore_EquipSlots();
    // Item Groups
    const groups = [$dataItems, $dataWeapons, $dataArmors];
    for (const group of groups) {
        for (const obj of group) {

            if (!obj) continue;

            VisuMZ.ItemsEquipsCore.Parse_Notetags_Category(obj, group);
            VisuMZ.ItemsEquipsCore.Parse_Notetags_Prices(obj, group);
            VisuMZ.ItemsEquipsCore.Parse_Notetags_ParamValues(obj, group);
            VisuMZ.ItemsEquipsCore.Parse_Notetags_ParamJS(obj, group);
            VisuMZ.ItemsEquipsCore.Parse_Notetags_EnableJS(obj, group);
        }
    }
};

Scene_Boot.prototype.process_VisuMZ_ItemsEquipsCore_EquipSlots = function() {
    for (const obj of $dataClasses) {
        if (!obj) continue;
        VisuMZ.ItemsEquipsCore.Parse_Notetags_EquipSlots(obj);
    }
};

//-----------------------------------------------------------------------------
// Notetag Parsing
//-----------------------------------------------------------------------------

VisuMZ.ItemsEquipsCore.ParseClassNotetags = VisuMZ.ParseClassNotetags;
VisuMZ.ParseClassNotetags = function(obj) {
    VisuMZ.ItemsEquipsCore.ParseClassNotetags.call(this, obj);

    VisuMZ.ItemsEquipsCore.Parse_Notetags_EquipSlots(obj);
};

VisuMZ.ItemsEquipsCore.ParseItemNotetags = VisuMZ.ParseItemNotetags;
VisuMZ.ParseItemNotetags = function(obj) {
    VisuMZ.ItemsEquipsCore.ParseItemNotetags.call(this, obj);

    VisuMZ.ItemsEquipsCore.Parse_Notetags_Batch(obj, $dataItems);
};

VisuMZ.ItemsEquipsCore.ParseWeaponNotetags = VisuMZ.ParseWeaponNotetags;
VisuMZ.ParseWeaponNotetags = function(obj) {
    VisuMZ.ItemsEquipsCore.ParseWeaponNotetags.call(this, obj);

    VisuMZ.ItemsEquipsCore.Parse_Notetags_Batch(obj, $dataWeapons);
};

VisuMZ.ItemsEquipsCore.ParseArmorNotetags = VisuMZ.ParseArmorNotetags;
VisuMZ.ParseArmorNotetags = function(obj) {
    VisuMZ.ItemsEquipsCore.ParseArmorNotetags.call(this, obj);

    VisuMZ.ItemsEquipsCore.Parse_Notetags_Batch(obj, $dataArmors);
};

//-----------------------------------------------------------------------------
// New Notetag Parsing Functions
//-----------------------------------------------------------------------------

// v1.13 added by Yanfly
// For Classes
VisuMZ.ItemsEquipsCore.Parse_Notetags_EquipSlots = function(obj) {
    obj.equipSlots = [];

    // v1.45 added by Olivia
    const equipTypes = $dataSystem.equipTypes.map(str => str ? str.trim() : '');

    // v1.21 modified by Olivia
    if (!BattleManager.isBattleTest() && obj.note.match(/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)) {
        const results = String(RegExp.$1).split(/[\r\n]+/);
        for (const line of results) {
            const index = equipTypes.indexOf(line.trim()); // v1.45 updated by Olivia
            if (index > 0) obj.equipSlots.push(index);
        }

    } else {
        for (const line of equipTypes) { // v1.45 updated by Olivia
            const index = equipTypes.indexOf(line.trim()); // v1.45 updated by Olivia
            if (index > 0) obj.equipSlots.push(index);
        }
    }
};

// v1.13 added by Yanfly
// For Items, Weapons, Armors
VisuMZ.ItemsEquipsCore.Parse_Notetags_Batch = function(obj, group) {
    VisuMZ.ItemsEquipsCore.Parse_Notetags_Category(obj, group);
    VisuMZ.ItemsEquipsCore.Parse_Notetags_Prices(obj, group);
    VisuMZ.ItemsEquipsCore.Parse_Notetags_ParamValues(obj, group);
    VisuMZ.ItemsEquipsCore.Parse_Notetags_ParamJS(obj, group);
    VisuMZ.ItemsEquipsCore.Parse_Notetags_EnableJS(obj, group);
};

// v1.13 added by Yanfly
// For Items, Weapons, Armors
VisuMZ.ItemsEquipsCore.Parse_Notetags_Category = function(obj, group) {
    obj.categories = [];
    const note = obj.note;
    const matches = note.match(/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);
    if (matches) {
        for (const match of matches) {
            match.match(/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);
            const results = String(RegExp.$1).toUpperCase().trim().split(',');
            for (const result of results) {
                obj.categories.push(result.trim());
            }
        }
    }
    if (note.match(/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)) {
        const batch = (RegExp.$1).split(/[\r\n]+/);
        for (const line of batch) {
            obj.categories.push(line.toUpperCase().trim());
        }
    }
};

// v1.13 added by Yanfly
// For Items, Weapons, Armors
VisuMZ.ItemsEquipsCore.Parse_Notetags_Prices = function(obj, group) {
    if (obj.note.match(/<PRICE:[ ](\d+)>/i)) {
        obj.price = Number(RegExp.$1);
    }
};

// v1.13 added by Yanfly
// For Items, Weapons, Armors
VisuMZ.ItemsEquipsCore.Parse_Notetags_ParamValues = function(obj, group) {
    if (group === $dataItems) return;
    for (let i = 0; i < 8; i++) {
        const notetag = VisuMZ.ItemsEquipsCore.RegExp.EquipParams[i];
        if (obj.note.match(notetag)) {
            obj.params[i] = parseInt(RegExp.$1);
        }
    }
};

// v1.13 added by Yanfly
// For Items, Weapons, Armors
VisuMZ.ItemsEquipsCore.paramJS = {};
VisuMZ.ItemsEquipsCore.Parse_Notetags_ParamJS = function(obj, group) {
    if (group === $dataItems) return;
    if (obj.note.match(/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)) {
        const code = String(RegExp.$1);
        const key = (group === $dataWeapons ? 'W%1' : 'A%1').format(obj.id);
        const funcCode = `
            let MaxHP = 0; let MaxMP = 0; let ATK = 0; let DEF = 0;
            let MAT = 0; let MDF = 0; let AGI = 0; let LUK = 0;
            const user = this;
            const target = this;
            const a = this;
            const b = this;
            try {
                %1
            } catch (e) {
                if ($gameTemp.isPlaytest()) console.log(e);
            }
            return [MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK][paramId];
            `.format(code);
        for (let i = 0; i < 8; i++) {
            if (code.match(VisuMZ.ItemsEquipsCore.RegExp.BorderRegExp[i])) {
                const paramKey = '%1-%2'.format(key, i);
                VisuMZ.ItemsEquipsCore.paramJS[paramKey] = new Function('item','paramId', funcCode);
            }
        }
    }
};

// v1.13 added by Yanfly
// For Items, Weapons, Armors
VisuMZ.ItemsEquipsCore.itemEnableJS = {};
VisuMZ.ItemsEquipsCore.Parse_Notetags_EnableJS = function(obj, group) {
    if (group !== $dataItems) return;
    if (obj.note.match(/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)) {
        const code = String(RegExp.$1);
        const funcCode = `
            let enabled = true;
            const user = this;
            const target = this;
            const a = this;
            const b = this;
            try {
                %1
            } catch (e) {
                if ($gameTemp.isPlaytest()) console.log(e);
            }
            return enabled;
        `.format(code);
        VisuMZ.ItemsEquipsCore.itemEnableJS[obj.id] = new Function('item', funcCode);
    }
};

//-----------------------------------------------------------------------------
// DataManager
//
// The static class that manages the database and game objects.

//-----------------------------------------------------------------------------
// Basic
//-----------------------------------------------------------------------------

DataManager.isKeyItem = function(item) {
    return this.isItem(item) && item.itypeId === 2;
};

DataManager.maxItemAmount = function(item) {
    if (!item) {
        return 99;
    } else if (item.note.match(/<MAX:[ ](\d+)>/i)) {
        return parseInt(RegExp.$1);
    } else {
        return this.defaultItemMax(item);
    }
};

DataManager.defaultItemMax = function(item) {
    if (this.isItem(item)) {
        return VisuMZ.ItemsEquipsCore.Settings.ItemScene.MaxItems;
    } else if (this.isWeapon(item)) {
        return VisuMZ.ItemsEquipsCore.Settings.ItemScene.MaxWeapons;
    } else if (this.isArmor(item)) {
        return VisuMZ.ItemsEquipsCore.Settings.ItemScene.MaxArmors;
    }
};

//-----------------------------------------------------------------------------
// String Parsing
//-----------------------------------------------------------------------------

// v1.44 added by Arisu
DataManager.getClassIdWithName = function(text) {
    text = text.toUpperCase().trim();
    this._classIDs = this._classIDs || {};
    if (this._classIDs[text]) return this._classIDs[text];
    for (const obj of $dataClasses) {
        if (!obj) continue;
        let name = obj.name;
        name = name.replace(/\x1I\[(\d+)\]/gi, '');
        name = name.replace(/\\I\[(\d+)\]/gi, '');
        this._classIDs[name.toUpperCase().trim()] = obj.id;
    }
    return this._classIDs[text] || 0;
};

// v1.44 added by Arisu
DataManager.getSkillIdWithName = function(text) {
    text = text.toUpperCase().trim();
    this._skillIDs = this._skillIDs || {};
    if (this._skillIDs[text]) return this._skillIDs[text];
    for (const obj of $dataSkills) {
        if (!obj) continue;
        this._skillIDs[obj.name.toUpperCase().trim()] = obj.id;
    }
    return this._skillIDs[text] || 0;
};

// v1.37 added by Arisu
DataManager.getItemIdWithName = function(text) {
    text = text.toUpperCase().trim();
    this._itemIDs = this._itemIDs || {};
    if (this._itemIDs[text]) return this._itemIDs[text];
    for (const obj of $dataItems) {
        if (!obj) continue;
        this._itemIDs[obj.name.toUpperCase().trim()] = obj.id;
    }
    return this._itemIDs[text] || 0;
};

// v1.37 added by Arisu
DataManager.getWeaponIdWithName = function(text) {
    text = text.toUpperCase().trim();
    this._weaponIDs = this._weaponIDs || {};
    if (this._weaponIDs[text]) return this._weaponIDs[text];
    for (const obj of $dataWeapons) {
        if (!obj) continue;
        this._weaponIDs[obj.name.toUpperCase().trim()] = obj.id;
    }
    return this._weaponIDs[text] || 0;
};

// v1.37 added by Arisu
DataManager.getArmorIdWithName = function(text) {
    text = text.toUpperCase().trim();
    this._armorIDs = this._armorIDs || {};
    if (this._armorIDs[text]) return this._armorIDs[text];
    for (const obj of $dataArmors) {
        if (!obj) continue;
        this._armorIDs[obj.name.toUpperCase().trim()] = obj.id;
    }
    return this._armorIDs[text] || 0;
};

//-----------------------------------------------------------------------------
// Proxy
//-----------------------------------------------------------------------------

// v1.37 added by Arisu
VisuMZ.ItemsEquipsCore.SetupProxyItemGroups = function() {
    VisuMZ.ItemsEquipsCore.SetupProxyItemGroup($dataItems);
    VisuMZ.ItemsEquipsCore.SetupProxyItemGroup($dataWeapons);
    VisuMZ.ItemsEquipsCore.SetupProxyItemGroup($dataArmors);
};

// v1.37 added by Arisu
VisuMZ.ItemsEquipsCore.SetupProxyItemGroup = function(group) {
    for (const obj of group) {
        if (!obj) continue;
        if (!DataManager.isProxyItem(obj)) continue;

        const baseObj = DataManager.getProxyItem(obj);
        const keys = ['name', 'iconIndex', 'description'];
        for (const key of keys) {
            obj[key] = baseObj[key];
        }
    }
};

// v1.37 added by Arisu
DataManager.isProxyItem = function(item) {
    if (!item) return false;
    if (!item.note) return false;
    return item && item.note.match(/<PROXY:[ ](.*)>/i);
};

// v1.37 added by Arisu
DataManager.getProxyItem = function(item) {
    if (this.isProxyItem(item)) {
        // v1.42 fixed by Arisu
        return this.switchProxyItem(item) || item;
        // return this.isProxyItem(item) ? this.getProxyItem(item) : newItem;
    } else {
        return item;
    }
};

// v1.37 added by Arisu
DataManager.switchProxyItem = function(item) {
    // Parse
    item.note.match(/<PROXY:[ ](.*)>/i);
    const entry = RegExp.$1.trim();
    const isNumber = /^\d+$/.test(entry);

    // Get Actual Item
    if (this.isItem(item)) {
        const id = isNumber ? Number(RegExp.$1) : DataManager.getItemIdWithName(entry);
        return $dataItems[id] || item;
    } else if (this.isWeapon(item)) {
        const id = isNumber ? Number(RegExp.$1) : DataManager.getWeaponIdWithName(entry);
        return $dataWeapons[id] || item;
    } else if (this.isArmor(item)) {
        const id = isNumber ? Number(RegExp.$1) : DataManager.getArmorIdWithName(entry);
        return $dataArmors[id] || item;
    }

    // Failsafe Return Same Item
    return item;
};

// v1.37 added by Arisu
VisuMZ.ItemsEquipsCore.Window_ItemList_item = Window_ItemList.prototype.item;
Window_ItemList.prototype.item = function() {
    if ($gameTemp._bypassProxy) return VisuMZ.ItemsEquipsCore.Window_ItemList_item.call(this);
    return DataManager.getProxyItem(VisuMZ.ItemsEquipsCore.Window_ItemList_item.call(this));
};

// v1.37 added by Arisu
Window_ItemList.prototype.proxyItem = function() {
    return VisuMZ.ItemsEquipsCore.Window_ItemList_item.call(this);
};

// v1.37 added by Arisu
VisuMZ.ItemsEquipsCore.Window_ShopBuy_item = Window_ShopBuy.prototype.item;
Window_ShopBuy.prototype.item = function() {
    if ($gameTemp._bypassProxy) return VisuMZ.ItemsEquipsCore.Window_ShopBuy_item.call(this);
    return DataManager.getProxyItem(VisuMZ.ItemsEquipsCore.Window_ShopBuy_item.call(this));
};

// v1.37 added by Arisu
Window_ShopBuy.prototype.proxyItem = function() {
    return VisuMZ.ItemsEquipsCore.Window_ShopBuy_item.call(this);
};

// v1.37 added by Arisu
VisuMZ.ItemsEquipsCore.Game_Item_setObject = Game_Item.prototype.setObject;
Game_Item.prototype.setObject = function(item) {
    if (DataManager.isProxyItem(item)) return;
    VisuMZ.ItemsEquipsCore.Game_Item_setObject.call(this, item);
};

//-----------------------------------------------------------------------------
// Artifacts
//-----------------------------------------------------------------------------

// v1.48 added by Olivia
VisuMZ.ItemsEquipsCore.SetupArtifactItemIDs = function() {
    this.artifactIDs = {
        partyArtifactIDs: [],
        troopArtifactIDs: [],
    };

    for (const item of $dataArmors) {
        if (!item) continue;
        if (!DataManager.isArtifact(item)) continue;
        if (DataManager.isPartyArtifact(item)) {
            this.artifactIDs.partyArtifactIDs.push(item.id);
        }
        if (DataManager.isTroopArtifact(item)) {
            this.artifactIDs.troopArtifactIDs.push(item.id);
        }
    }
};

// v1.38 added by Olivia
DataManager.isArtifact = function(item) {
    if (!this.isArmor(item)) return false;

    const note = item.note;
    if (!note) return false;
    if (note.match(/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i)) return true;
    if (note.match(/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i)) return true;
    if (note.match(/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i)) return true;
    if (note.match(/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i)) return true;

    return false;
};

// v1.38 added by Olivia
DataManager.isStackableArtifact = function(item) {
    if (!this.isArtifact(item)) return false;

    const note = item.note;
    if (!note) return false;
    if (note.match(/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i)) return true;
    if (note.match(/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i)) return true;

    return false;
};

// v1.38 added by Olivia
DataManager.isPartyArtifact = function(item) {
    if (!this.isArtifact(item)) return false;

    const note = item.note;
    if (!note) return false;
    if (note.match(/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i)) return true;
    if (note.match(/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i)) return true;

    return false;
};

// v1.38 added by Olivia
DataManager.isTroopArtifact = function(item) {
    if (!this.isArtifact(item)) return false;

    const note = item.note;
    if (!note) return false;
    if (note.match(/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i)) return true;
    if (note.match(/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i)) return true;

    return false;
};

// v1.38 added by Olivia
VisuMZ.ItemsEquipsCore.Game_BattlerBase_canEquip_artifact = Game_BattlerBase.prototype.canEquip;
Game_BattlerBase.prototype.canEquip = function(item) {
    // v1.38 added by Olivia
    if (DataManager.isArtifact(item)) return false;

    // v1.44 added by Arisu
    if (!DataManager.meetsClassRequirements(this, item)) return false;
    if (!DataManager.meetsEquipRequirements(this, item)) return false;

    // Return Alias
    return VisuMZ.ItemsEquipsCore.Game_BattlerBase_canEquip_artifact.call(this, item);
};

// v1.38 added by Olivia
VisuMZ.ItemsEquipsCore.Game_BattlerBase_param_artifact = Game_BattlerBase.prototype.param;
Game_BattlerBase.prototype.param = function(paramId) {
    this._allowArtifactParamBase = true;
    const value = VisuMZ.ItemsEquipsCore.Game_BattlerBase_param_artifact.call(this, paramId);
    this._allowArtifactParamBase = undefined;
    return value;
};

// v1.38 added by Olivia
VisuMZ.ItemsEquipsCore.Game_Actor_artifact = Game_Actor.prototype.traitObjects;
Game_Actor.prototype.traitObjects = function() {
    this._allowArtifactTraitObjects = true;
    const objects = VisuMZ.ItemsEquipsCore.Game_Actor_artifact.call(this);
    this._allowArtifactTraitObjects = undefined;
    return objects;
};

// v1.38 added by Olivia
VisuMZ.ItemsEquipsCore.Game_Actor_equips_artifacts = Game_Actor.prototype.equips;
Game_Actor.prototype.equips = function() {
    const equips = VisuMZ.ItemsEquipsCore.Game_Actor_equips_artifacts.call(this);

    if (this._allowArtifactTraitObjects || this._allowArtifactParamBase) {
        const group = equips.concat($gameParty.partyArtifacts());
        return group;
    } else {
        return equips;
    }
};

// v1.38 added by Olivia
VisuMZ.ItemsEquipsCore.Game_BattlerBase_paramPlus_artifact = Game_BattlerBase.prototype.paramPlus;
Game_BattlerBase.prototype.paramPlus = function(paramId) {
    let value = VisuMZ.ItemsEquipsCore.Game_BattlerBase_paramPlus_artifact.call(this, paramId);

    if (this.constructor === Game_Enemy) {
        for (const item of $gameParty.troopArtifacts()) {
            if (item) value += item.params[paramId];
        }
    }

    return value;
};

// v1.38 added by Olivia
VisuMZ.ItemsEquipsCore.Game_Enemy_traitObjects_artifact = Game_Enemy.prototype.traitObjects;
Game_Enemy.prototype.traitObjects = function() {
    let objects = VisuMZ.ItemsEquipsCore.Game_Enemy_traitObjects_artifact.call(this);
    return objects.concat($gameParty.troopArtifacts());
};

// v1.38 added by Olivia
VisuMZ.ItemsEquipsCore.Game_Party_gainItem_artifact = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    VisuMZ.ItemsEquipsCore.Game_Party_gainItem_artifact.call(this, item, amount, includeEquip);

    // Refresh Caches
    if (DataManager.isArtifact(item)) {
        let members = $gameParty.allMembers();
        if ($gameParty.inBattle()) members = members.concat($gameTroop.members());
        for (const member of members) { // v1.43 fixed by Olivia 
            if (!member) continue;
            member._cache = {};
        }
    }
};

// v1.38 added by Olivia
Game_Party.prototype.partyArtifacts = function() {
    let results = [];

    // v1.48 disabled by Irina
    // for (const item of this.armors()) {
    //     if (!item) continue;
    //     if (!DataManager.isArtifact(item)) continue;
    //     if (!DataManager.isPartyArtifact(item)) continue;
    //     let times = 1;
    //     if (DataManager.isStackableArtifact(item)) times = this.numItems(item);
    //     while (times--) results.push(item);
    // }

    // v1.48 added by Irina
    const artifactIDs = VisuMZ.ItemsEquipsCore.artifactIDs.partyArtifactIDs;
    if (artifactIDs) {
        for (const id of artifactIDs) {
            const item = $dataArmors[id];
            if (!item) continue;
            if (!this.hasItem(item)) continue;
            let times = 1;
            if (DataManager.isStackableArtifact(item)) times = this.numItems(item);
            while (times--) results.push(item);
        }
    }

    return results;
};

// v1.38 added by Olivia
Game_Party.prototype.troopArtifacts = function() {
    let results = [];

    // v1.48 disabled by Irina
    // for (const item of this.armors()) {
    //     if (!item) continue;
    //     if (!DataManager.isArtifact(item)) continue;
    //     if (!DataManager.isTroopArtifact(item)) continue;
    //     let times = 1;
    //     if (DataManager.isStackableArtifact(item)) times = this.numItems(item);
    //     while (times--) results.push(item);
    // }

    // v1.48 added by Irina
    const artifactIDs = VisuMZ.ItemsEquipsCore.artifactIDs.troopArtifactIDs;
    if (artifactIDs) {
        for (const id of artifactIDs) {
            const item = $dataArmors[id];
            if (!item) continue;
            if (!this.hasItem(item)) continue;
            let times = 1;
            if (DataManager.isStackableArtifact(item)) times = this.numItems(item);
            while (times--) results.push(item);
        }
    }

    return results;
};

// v1.38 added by Olivia
Game_Party.prototype.artifacts = function() {
    return this.partyArtifacts().concat(this.troopArtifacts());
};

// v1.38 added by Olivia
VisuMZ.ItemsEquipsCore.Game_Party_setupBattleTestItems_artifact = Game_Party.prototype.setupBattleTestItems;
Game_Party.prototype.setupBattleTestItems = function() {
    VisuMZ.ItemsEquipsCore.Game_Party_setupBattleTestItems_artifact.call(this);
    this.removeBattleTestArtifacts();
};

// v1.38 added by Olivia
Game_Party.prototype.removeBattleTestArtifacts = function() {
    const artifacts = $gameParty.armors().filter(obj => DataManager.isArtifact(obj));
    for (const obj of artifacts) {
        const quantity = this.numItems(obj);
        if (quantity) this.loseItem(obj, quantity);
    }
};

//-----------------------------------------------------------------------------
// Class Requirements
//-----------------------------------------------------------------------------

// v1.44 added by Arisu
DataManager.meetsClassRequirements = function(actor, obj) {
    // Return Check
    if (this.isItem(obj)) return false;
    if (!actor) return false;
    if ($gameTemp._checkEquipRequirements) return true;
    if (BattleManager.isBattleTest()) return true;

    // Get Requirements
    const requiredClasses = this.getClassRequirements(obj);
    if (requiredClasses.length <= 0) return true;

    // Return Check
    return requiredClasses.includes(actor.currentClass().id);
};

// v1.44 added by Arisu
DataManager.getClassRequirements = function(obj) {
    // Return Check
    if (!obj) return [];

    // Return Cache
    this._getClassRequirements = this._getClassRequirements || {};
    const key = '%1-%2'.format(this.isWeapon(obj) ? 'WEAPON' : 'ARMOR', obj.id);
    if (this._getClassRequirements[key] !== undefined) {
        return this._getClassRequirements[key];
    }

    // Declare Requirements
    let requirements = [];

    // Declare Constants
    const note = obj.note || '';

    // Check Notetags
    if (note.match(/<EQUIP FOR CLASS(?:|ES) ONLY:[ ](.*)>/i)) {
        const entries = String(RegExp.$1).split(',').map(i => i.trim());
        for (const entry of entries) {
            const isNumber = /^\d+$/.test(entry);
            if (isNumber) {
                requirements.push(Number(entry));
            } else {
                requirements.push(DataManager.getClassIdWithName(entry));
            }
        }
    }

    // Return Requirements
    this._getClassRequirements[key] = requirements;
    return this._getClassRequirements[key];
};

//-----------------------------------------------------------------------------
// Equip Requirements
//-----------------------------------------------------------------------------

// v1.44 added by Arisu
DataManager.meetsEquipRequirements = function(actor, obj) {
    // Return Check
    if (this.isItem(obj)) return false;
    if (!actor) return false;
    if ($gameTemp._checkEquipRequirements) return true;
    if (BattleManager.isBattleTest()) return true;

    // Get Requirements
    const requirements = this.getEquipRequirements(obj);

    // Check Requirements
    for (const line of requirements) {
        if (!this.meetsEquipRequirement(actor, line)) return false;
    }

    // Return True
    return true;
};

// v1.44 added by Arisu
DataManager.getEquipRequirements = function(obj) {
    // Return Check
    if (!obj) return [];

    // Return Cache
    this._getEquipRequirements = this._getEquipRequirements || {};
    const key = '%1-%2'.format(this.isWeapon(obj) ? 'WEAPON' : 'ARMOR', obj.id);
    if (this._getEquipRequirements[key] !== undefined) {
        return this._getEquipRequirements[key];
    }

    // Declare Requirements
    let requirements = [];

    // Declare Constants
    const note = obj.note || '';

    // Check Notetags
    if (note.match(/<EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>\s*([\s\S]*)\s*<\/EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>/i)) {
        requirements = String(RegExp.$1).split(/[\r\n]+/);
    }

    // Return Requirements
    this._getEquipRequirements[key] = requirements;
    return this._getEquipRequirements[key];
};

// v1.44 added by Arisu
DataManager.meetsEquipRequirement = function(actor, line) {
    // Level >= x
    if (line.match(/(?:LEVEL|LV|LVL)[ ](>|>=|===|<=|<)[ ](\d+)/i)) {
        const compare = String(RegExp.$1).trim();
        const number = Number(RegExp.$2);
        
        switch (compare) {
            case '>':
                return actor.level > number;
            case '>=':
                return actor.level >= number;
            case '===':
                return actor.level === number;
            case '<=':
                return actor.level <= number;
            case '<':
                return actor.level < number;
        }
        return false;
    }

    // MaxHP/MaxMP >= x
    if (line.match(/(MAXHP|MAXMP|MHP|MMP)[ ](>|>=|===|<=|<)[ ](\d+)/i)) {
        const param = String(RegExp.$1).toLowerCase().trim();
        const compare = String(RegExp.$2).trim();
        const number = Number(RegExp.$3);

        let paramID = 0;
        if (['maxmp','mmp'].includes(param)) paramID = 1;
        const bonus = actor._paramPlus[paramID] || 0;
        
        switch (compare) {
            case '>':
                return (actor.paramBase(paramID) + bonus) > number;
            case '>=':
                return (actor.paramBase(paramID) + bonus) >= number;
            case '===':
                return (actor.paramBase(paramID) + bonus) === number;
            case '<=':
                return (actor.paramBase(paramID) + bonus) <= number;
            case '<':
                return (actor.paramBase(paramID) + bonus) < number;
        }
        return false;
    }

    // Stats >= x
    if (line.match(/(ATK|DEF|MAT|MDF|AGI|LUK)[ ](>|>=|===|<=|<)[ ](\d+)/i)) {
        const param = String(RegExp.$1).toLowerCase().trim();
        const compare = String(RegExp.$2).trim();
        const number = Number(RegExp.$3);

        const params = ['atk','def','mat','mdf','agi','luk'];
        let paramID = params.indexOf(param) + 2;
        if (paramID < 2) return false;
        const bonus = actor._paramPlus[paramID] || 0;
        
        switch (compare) {
            case '>':
                return (actor.paramBase(paramID) + bonus) > number;
            case '>=':
                return (actor.paramBase(paramID) + bonus) >= number;
            case '===':
                return (actor.paramBase(paramID) + bonus) === number;
            case '<=':
                return (actor.paramBase(paramID) + bonus) <= number;
            case '<':
                return (actor.paramBase(paramID) + bonus) < number;
        }
        return false;
    }

    // Learned Skill: x
    if (line.match(/LEARNED SKILL:[ ](\d+)/i)) {
        const skillID = Number(RegExp.$1);
        return actor.isLearnedSkill(skillID);
    } else if (line.match(/LEARNED SKILL:[ ](.*)/i)) {
        const name = String(RegExp.$1);
        const skillID = this.getSkillIdWithName(name);
        return actor.isLearnedSkill(skillID);
    }

    // Switch: x
    if (line.match(/SWITCH:[ ](\d+)/i)) {
        const switchID = Number(RegExp.$1);
        return $gameSwitches.value(switchID);
    }

    // Default Return
    return true;
};



//-----------------------------------------------------------------------------
// TextManager
//
// The static class that handles terms and messages.

TextManager.ITEMS_EQUIPS_CORE = {
    helpDesc: {
        equip: VisuMZ.ItemsEquipsCore.Settings.EquipScene.equipCmdDesc ?? 'Pick and choose equipment to change.',
        optimize: VisuMZ.ItemsEquipsCore.Settings.EquipScene.optimizeCmdDesc ?? 'Equip the strongest available equipment.',
        clear: VisuMZ.ItemsEquipsCore.Settings.EquipScene.clearCmdDesc ?? 'Remove all available equipment.',
    }
};

//-----------------------------------------------------------------------------
// ColorManager
//
// The static class that handles the window colors.

ColorManager.getItemColor = function(item) {
    if (!item) {
        return this.normalColor();
    } else if (item.note.match(/<COLOR:[ ](\d+)>/i)) {
        return this.textColor(Number(RegExp.$1).clamp(0, 31));
    } else if (item.note.match(/<COLOR:[ ]#(.*)>/i)) {
        return '#' + String(RegExp.$1);
    } else {
        return this.normalColor();
    }
};

ColorManager.getColor = function(color) {
    color = String(color);
    if (color.match(/#(.*)/i)) {
        return '#%1'.format(String(RegExp.$1));
    } else {
        return this.textColor(Number(color));
    }
};

//-----------------------------------------------------------------------------
// SceneManager
//
// The static class that manages scene transitions.

SceneManager.isSceneShop = function() {
    return this._scene && this._scene.constructor === Scene_Shop;
};

//-----------------------------------------------------------------------------
// Game_Temp
//
// The game object class for temporary data that is not included in save data.

Game_Temp.prototype.newLabelEnabled = function() {
    if (this._bypassNewLabel) return false;
    return VisuMZ.ItemsEquipsCore.Settings.New.Enable;
};

//-----------------------------------------------------------------------------
// Game_BattlerBase
//
// The superclass of Game_Battler. It mainly contains parameters calculation.

VisuMZ.ShopMenuStatusStandard = VisuMZ.ItemsEquipsCore.Settings.StatusWindow.MultiplierStandard;

VisuMZ.ItemsEquipsCore.Game_BattlerBase_param = Game_BattlerBase.prototype.param;
Game_BattlerBase.prototype.param = function(paramId) {
    if (this._shopStatusMenuMode) {
        return this._shopStatusMenuAlly ? VisuMZ.ShopMenuStatusStandard : 1;
    } else {
        return VisuMZ.ItemsEquipsCore.Game_BattlerBase_param.call(this, paramId);
    }
};

VisuMZ.ItemsEquipsCore.Game_BattlerBase_meetsItemConditions = Game_BattlerBase.prototype.meetsItemConditions;
Game_BattlerBase.prototype.meetsItemConditions = function(item) {
    if (!item) return false;
    if (!VisuMZ.ItemsEquipsCore.Game_BattlerBase_meetsItemConditions.call(this, item)) return false;
    if (!this.meetsItemConditionsNotetags(item)) return false;
    if (!this.meetsItemConditionsJS(item)) return false;
    return true;
};

Game_BattlerBase.prototype.meetsItemConditionsNotetags = function(item) {
    if (!this.checkItemConditionsSwitchNotetags(item)) return false;
    return true;
};

Game_BattlerBase.prototype.checkItemConditionsSwitchNotetags = function(item) {
    const note = item.note;
    if (note.match(/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        const switches = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        for (const switchId of switches) {
            if (!$gameSwitches.value(switchId)) return false;
        }
        return true;
    }
    if (note.match(/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        const switches = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        for (const switchId of switches) {
            if (!$gameSwitches.value(switchId)) return false;
        }
        return true;
    }
    if (note.match(/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        const switches = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        for (const switchId of switches) {
            if ($gameSwitches.value(switchId)) return true;
        }
        return false;
    }
    if (note.match(/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        const switches = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        for (const switchId of switches) {
            if (!$gameSwitches.value(switchId)) return true;
        }
        return false;
    }
    if (note.match(/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        const switches = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        for (const switchId of switches) {
            if (!$gameSwitches.value(switchId)) return true;
        }
        return false;
    }
    if (note.match(/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        const switches = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        for (const switchId of switches) {
            if ($gameSwitches.value(switchId)) return false;
        }
        return true;
    }
    return true;
};

Game_BattlerBase.prototype.meetsItemConditionsJS = function(item) {
    const note = item.note;
    const enableJS = VisuMZ.ItemsEquipsCore.itemEnableJS;
    if (enableJS[item.id]) {
        return enableJS[item.id].call(this, item);
    } else {
        return true;
    }
};

//-----------------------------------------------------------------------------
// Game_Actor
//
// The game object class for an actor.

Game_Actor.prototype.initEquips = function(equips) {
    equips = this.convertInitEquipsToItems(equips);
    const slots = this.equipSlots();
    this._equips = [];
    for (let i = 0; i < slots.length; i++) {
        this._equips[i] = new Game_Item();
    }
    for (let i = 0; i < slots.length; i++) {
        const etypeId = slots[i];
        const equip = this.getMatchingInitEquip(equips, etypeId);
        if (this.canEquip(equip)) this._equips[i].setObject(equip);
    }
    this.releaseUnequippableItems(true);
    this.refresh();
};

Game_Actor.prototype.convertInitEquipsToItems = function(equips) {
    const results = [];
    for (let i = 0; i < equips.length; i++) {
        const objId = equips[i];
        if (objId <= 0) continue;
        const etype = $dataSystem.equipTypes[i + 1];
        // Original
        if (etype === $dataSystem.equipTypes[1] || (i === 1 && this.isDualWield())) {
            results.push($dataWeapons[objId]);
        // v1.21 added by Olivia
        } else if (BattleManager.isBattleTest()) {
            const armor = $dataArmors[objId];
            if (armor && armor.etypeId === (i + 1)) { // v1.34 added by Arisu
                results.push(armor);
            }
        // Original
        } else {
            // v1.29 added by Arisu
            const armor = $dataArmors[objId];
            if (armor && armor.etypeId === (i + 1)) { // v1.34 added by Arisu
                results.push(armor);
            }
            // v1.29 disabled by Arisu
            //results.push($dataArmors[objId]);
        }
    }
    return results;
};

Game_Actor.prototype.getMatchingInitEquip = function(equips, etypeId) {
    for (const equip of equips) {
        if (!equip) continue;
        if (equip.etypeId === etypeId) {
            equips.splice(equips.indexOf(equip), 1);
            return equip;
        }
    }
    return null;
};

Game_Actor.prototype.equipSlots = function() {
    const slots = VisuMZ.ItemsEquipsCore.deepCopy(this._forcedSlots || this.currentClass().equipSlots);
    if (slots.length >= 2 && this.isDualWield()) slots[1] = 1;
    return slots;
};

Game_Actor.prototype.forceChangeEquipSlots = function(slots) {
    slots.remove(0);
    slots.remove(-1);
    this._forcedSlots = slots;
    this.refresh();
    this.updateChangedSlots(); // v1.24 added by Arisu
};

Game_Actor.prototype.forceResetEquipSlots = function() {
    this._forcedSlots = undefined;
    this.refresh();
    this.updateChangedSlots(); // v1.24 added by Arisu
};

// v1.24 added by Arisu
Game_Actor.prototype.updateChangedSlots = function() {
    let length = this.equipSlots().length;
    // Excess
    while (this._equips.length > length) {
        const obj = this._equips[this._equips.length - 1];
        if (obj && obj.object()) {
            $gameParty.gainItem(obj.object(), 1);
        }
        this._equips.pop();
    }
    // Not Enough
    while (length > this._equips.length) {
        this._equips.push(new Game_Item);
    }
};

Game_Actor.prototype.prepareNewEquipSlotsOnLoad = function() {
    const slots = this.equipSlots();
    for (let i = 0; i < slots.length; i++) {
        if (!this._equips[i]) this._equips[i] = new Game_Item();
    }
    this.releaseUnequippableItems(false);
    this.refresh();
};

VisuMZ.ItemsEquipsCore.Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function(slotId, item) {
    if (!this._tempActor) { // v1.16 changed by Yanfly
        const tempActor = JsonEx.makeDeepCopy(this);
        tempActor._tempActor = true;
        VisuMZ.ItemsEquipsCore.Game_Actor_changeEquip.call(this, slotId, item);
        this.equipAdjustHpMp(tempActor);
    } else {
        VisuMZ.ItemsEquipsCore.Game_Actor_changeEquip.call(this, slotId, item);
    }
};

VisuMZ.ItemsEquipsCore.Game_Actor_forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
    if (!this._tempActor) { // v1.16 changed by Yanfly
        const tempActor = JsonEx.makeDeepCopy(this);
        tempActor._tempActor = true;
        VisuMZ.ItemsEquipsCore.Game_Actor_forceChangeEquip.call(this, slotId, item);
        this.equipAdjustHpMp(tempActor);
    } else {
        VisuMZ.ItemsEquipsCore.Game_Actor_forceChangeEquip.call(this, slotId, item);
    }
};

VisuMZ.ItemsEquipsCore.Game_Actor_discardEquip = Game_Actor.prototype.discardEquip;
Game_Actor.prototype.discardEquip = function(item) {
    if (!this._tempActor) {
        const tempActor = JsonEx.makeDeepCopy(this);
        tempActor._tempActor = true;
        VisuMZ.ItemsEquipsCore.Game_Actor_discardEquip.call(this, item);
        this.equipAdjustHpMp(tempActor);
    } else {
        VisuMZ.ItemsEquipsCore.Game_Actor_discardEquip.call(this, item);
    }
};

Game_Actor.prototype.releaseUnequippableItems = function(forcing) {
    // v1.32 added by Arisu
    if (this._bypassReleaseUnequippableItemsItemsEquipsCore) return;

    for (;;) {
        const slots = this.equipSlots();
        const equips = this.equips();
        const length = equips.length; // v1.23 added by Yanfly
        let changed = false;
        for (let i = 0; i < length; i++) {
            const item = equips[i];
            if (item && (!this.canEquip(item) || item.etypeId !== slots[i])) {
                if (!forcing) {
                    this.tradeItemWithParty(null, item);
                }
                if (!this._tempActor) {
                    const tempActor = JsonEx.makeDeepCopy(this);
                    tempActor._tempActor = true;
                    this._equips[i].setObject(null);
                    this._bypassReleaseUnequippableItemsItemsEquipsCore = true; // v1.32 added by Arisu
                    this.equipAdjustHpMp(tempActor);
                    this._bypassReleaseUnequippableItemsItemsEquipsCore = undefined; // v1.32 added by Arisu
                } else {
                    this._equips[i].setObject(null);
                }
                changed = true;
            }
        }
        if (!changed) {
            break;
        }
    }
};

Game_Actor.prototype.equipAdjustHpMp = function(tempActor) {
    if (this._tempActor) return;
    if (!VisuMZ.ItemsEquipsCore.Settings.EquipScene.EquipAdjustHpMp) return;
    const hp = Math.round(tempActor.hpRate() * this.mhp);
    const mp = Math.round(tempActor.mpRate() * this.mmp);
    if (this.hp > 0) this.setHp(hp);
    if (this.mp > 0) this.setMp(mp);
};

Game_Actor.prototype.clearEquipments = function() {
    const maxSlots = this.equipSlots().length;
    for (let i = 0; i < maxSlots; i++) {
        if (this.isClearEquipOk(i)) this.changeEquip(i, null);
    }
};

Game_Actor.prototype.isClearEquipOk = function(slotId) {
    if (this.nonRemovableEtypes().includes(this.equipSlots()[slotId])) {
        return false;
    } else {
        return this.isEquipChangeOk(slotId);
    }
};

Game_Actor.prototype.nonRemovableEtypes = function() {
    return VisuMZ.ItemsEquipsCore.Settings.EquipScene.NonRemoveETypes;
};

Game_Actor.prototype.optimizeEquipments = function() {
    const maxSlots = this.equipSlots().length;
    for (let i = 0; i < maxSlots; i++) {
        if (this.isOptimizeEquipOk(i)) this.changeEquip(i, null);
    }
    for (let i = 0; i < maxSlots; i++) {
        if (this.isOptimizeEquipOk(i)) this.changeEquip(i, this.bestEquipItem(i));
    }
};

Game_Actor.prototype.isOptimizeEquipOk = function(slotId) {
    if (this.nonOptimizeEtypes().includes(this.equipSlots()[slotId])) {
        return false;
    } else {
        return this.isEquipChangeOk(slotId);
    }
};

Game_Actor.prototype.nonOptimizeEtypes = function() {
    return VisuMZ.ItemsEquipsCore.Settings.EquipScene.NonOptimizeETypes;
};

VisuMZ.ItemsEquipsCore.Game_Actor_tradeItemWithParty = Game_Actor.prototype.tradeItemWithParty;
Game_Actor.prototype.tradeItemWithParty = function(newItem, oldItem) {
    if (this._tempActor) return false; // v1.16 changed by Yanfly
    $gameTemp._bypassNewLabel = true;
    const value = VisuMZ.ItemsEquipsCore.Game_Actor_tradeItemWithParty.call(this, newItem, oldItem);
    $gameTemp._bypassNewLabel = false;
    return value;
};

Game_Actor.prototype.changeEquipById = function(etypeId, itemId) {
    const slotId = this.getNextAvailableEtypeId(etypeId);
    if (slotId < 0) return;
    const obj = etypeId === 1 ? $dataWeapons[itemId] : $dataArmors[itemId];
    this.changeEquip(slotId, obj);
};

Game_Actor.prototype.getNextAvailableEtypeId = function(etypeId) {
    let slotId = 0;
    const slots = this.equipSlots();
    const equips = this.equips();
    for (let i = 0; i < slots.length; i++) {
        if (slots[i] === etypeId) {
            slotId = i;
            if (!equips[i]) return slotId;
        }
    }
    return slotId;
};

VisuMZ.ItemsEquipsCore.Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
Game_Actor.prototype.paramPlus = function(paramId) {
    let value = VisuMZ.ItemsEquipsCore.Game_Actor_paramPlus.call(this, paramId);
    for (const item of this.equips()) {
        if (item) value += this.paramPlusItemsEquipsCoreCustomJS(item, paramId);
    }
    return value;
};

/* // Old
Game_Actor.prototype.paramPlusItemsEquipsCoreCustomJS = function(item, paramId) {
    if (this._calculatingJSParameters) return 0;
    let MaxHP = 0; let MaxMP = 0; let ATK = 0; let DEF = 0;
    let MAT = 0; let MDF = 0; let AGI = 0; let LUK = 0;
    if (item.note.match(/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)) {
        const code = String(RegExp.$1);
        const user = this;
        const target = this;
        const a = this;
        const b = this;
        this._calculatingJSParameters = true;
        try {
            eval(code);
        } catch (e) {
            if ($gameTemp.isPlaytest()) console.log(e);
        }
        this._calculatingJSParameters = false;
    }
    return [MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK][paramId];
};
*/

Game_Actor.prototype.paramPlusItemsEquipsCoreCustomJS = function(item, paramId) {
    if (this._calculatingJSParameters) return 0;
    const key = (DataManager.isWeapon(item) ? 'W%1' : 'A%1').format(item.id);
    const paramKey = '%1-%2'.format(key, paramId);
    if (VisuMZ.ItemsEquipsCore.paramJS[paramKey]) {
        this._calculatingJSParameters = true;
        const value = VisuMZ.ItemsEquipsCore.paramJS[paramKey].call(this, item, paramId);
        this._calculatingJSParameters = false;
        return value;
    } else {
        return 0;
    }
};

Game_Actor.prototype.setShopStatusWindowMode = function(ally) {
    this._shopStatusMenuMode = true;
    this._shopStatusMenuAlly = ally;
};

//-----------------------------------------------------------------------------
// Game_Party
//
// The game object class for the party. Information such as gold and items is
// included.

//-----------------------------------------------------------------------------
// Base
//-----------------------------------------------------------------------------

VisuMZ.ItemsEquipsCore.Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    VisuMZ.ItemsEquipsCore.Game_Party_initialize.call(this);
    this.initNewItemsList();
    this.initShopTrackingData();
};

//-----------------------------------------------------------------------------
// NEW! Label
//-----------------------------------------------------------------------------

Game_Party.prototype.initNewItemsList = function() {
    this._newItemsList = [];
};

Game_Party.prototype.isNewItem = function(item) {
    if (!$gameTemp.newLabelEnabled()) return false;
    if (this._newItemsList === undefined) this.initNewItemsList();
    let key = '';
    if (DataManager.isItem(item)) {
        key = 'item-%1'.format(item.id);
    } else if (DataManager.isWeapon(item)) {
        key = 'weapon-%1'.format(item.id);
    } else if (DataManager.isArmor(item)) {
        key = 'armor-%1'.format(item.id);
    } else {
        return;
    }
    return this._newItemsList.includes(key);
};

Game_Party.prototype.setNewItem = function(item) {
    if (!$gameTemp.newLabelEnabled()) return;
    if (this._newItemsList === undefined) this.initNewItemsList();
    let key = '';
    if (DataManager.isItem(item)) {
        key = 'item-%1'.format(item.id);
    } else if (DataManager.isWeapon(item)) {
        key = 'weapon-%1'.format(item.id);
    } else if (DataManager.isArmor(item)) {
        key = 'armor-%1'.format(item.id);
    } else {
        return;
    }
    if (!this._newItemsList.includes(key)) this._newItemsList.push(key);
};

Game_Party.prototype.clearNewItem = function(item) {
    if (!$gameTemp.newLabelEnabled()) return;
    if (this._newItemsList === undefined) this.initNewItemsList();
    let key = '';
    if (DataManager.isItem(item)) {
        key = 'item-%1'.format(item.id);
    } else if (DataManager.isWeapon(item)) {
        key = 'weapon-%1'.format(item.id);
    } else if (DataManager.isArmor(item)) {
        key = 'armor-%1'.format(item.id);
    } else {
        return;
    }
    if (this._newItemsList.includes(key)) {
        this._newItemsList.splice(this._newItemsList.indexOf(key), 1);
    }
};

//-----------------------------------------------------------------------------
// Proxy Items
//-----------------------------------------------------------------------------

// v1.37 added by Arisu
VisuMZ.ItemsEquipsCore.Game_Party_numItems = Game_Party.prototype.numItems;
Game_Party.prototype.numItems = function(item) {
    if (DataManager.isProxyItem(item)) item = DataManager.getProxyItem(item);
    return VisuMZ.ItemsEquipsCore.Game_Party_numItems.call(this, item);
};

VisuMZ.ItemsEquipsCore.Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    if (DataManager.isProxyItem(item)) item = null; // v1.37 added by Arisu

    const quantity = this.numItems(item);
    VisuMZ.ItemsEquipsCore.Game_Party_gainItem.call(this, item, amount, includeEquip);
    if (this.numItems(item) > quantity) this.setNewItem(item);
};

Game_Party.prototype.maxItems = function(item) {
    if (DataManager.isProxyItem(item)) item = DataManager.getProxyItem(item); // v1.37 added by Arisu

    return DataManager.maxItemAmount(item);
};

//-----------------------------------------------------------------------------
// Consume
//-----------------------------------------------------------------------------

// v1.47 added by Arisu
VisuMZ.ItemsEquipsCore.Game_Party_consumeItem = Game_Party.prototype.consumeItem;
Game_Party.prototype.consumeItem = function(item) {
    if (item) {
        const note = item.note || '';
        if (note.match(/<(?:CONSERVE|PRESERVE):[ ](\d+)([%％])>/i)) {
            const rate = Number(RegExp.$1) * 0.01;
            if (Math.random() < rate) return;
        }
    }

    VisuMZ.ItemsEquipsCore.Game_Party_consumeItem.call(this, item);
};

//-----------------------------------------------------------------------------
// Shop Tracking
//-----------------------------------------------------------------------------

// v1.47 added by Arisu
Game_Party.prototype.initShopTrackingData = function() {
    this._shopTrackingData = {
        buy: {
            gold: 0,
            items: {},
        },
        sell: {
            gold: 0,
            items: {},
        },
    };
};

// v1.47 added by Arisu
Game_Party.prototype.getShopTrackingData = function() {
    if (this._shopTrackingData === undefined) {
        this.initShopTrackingData();
    }
    return this._shopTrackingData;
};

//----- Get -----

// v1.47 added by Arisu
Game_Party.prototype.getShopTrackingItem = function(type, item) {
    if (!item) return 0;

    // Init
    if (this._shopTrackingData === undefined) {
        this.initShopTrackingData();
    }

    // Get Data
    const data = this.getShopTrackingData();
    if (!data[type]) return 0;

    // Create Key
    if (item === 'gold') {
        data[type].gold = data[type].gold || 0;
        return data[type].gold;

    } else if (DataManager.isItem(item)) {
        key = 'item-%1'.format(item.id);
    } else if (DataManager.isWeapon(item)) {
        key = 'weapon-%1'.format(item.id);
    } else if (DataManager.isArmor(item)) {
        key = 'armor-%1'.format(item.id);
    } else {
        return 0;
    }

    // Return Data
    data[type].items[key] = data[type].items[key] || 0;
    return data[type].items[key];
};

// v1.47 added by Arisu
Game_Party.prototype.getShopTrackingItemBuy = function(item) {
    return this.getShopTrackingItem('buy', item);
};

// v1.47 added by Arisu
Game_Party.prototype.getShopTrackingItemSell = function(item) {
    return this.getShopTrackingItem('sell', item);
};

// v1.47 added by Arisu
Game_Party.prototype.getShopTrackingGoldBuy = function() {
    return this.getShopTrackingItem('buy', 'gold');
};

// v1.47 added by Arisu
Game_Party.prototype.getShopTrackingGoldSell = function() {
    return this.getShopTrackingItem('sell', 'gold');
};

//----- Add -----

// v1.47 added by Arisu
Game_Party.prototype.addShopTrackingItem = function(type, item, times) {
    // Return Check
    if (!item) return;
    if (times <= 0) return;

    // Init
    if (this._shopTrackingData === undefined) {
        this.initShopTrackingData();
    }

    // Get Data
    const data = this.getShopTrackingData();
    if (!data[type]) return;

    // Create Key
    if (item === 'gold') {
        data[type].gold = data[type].gold || 0;
        data[type].gold += times;
        return;

    } else if (DataManager.isItem(item)) {
        key = 'item-%1'.format(item.id);
    } else if (DataManager.isWeapon(item)) {
        key = 'weapon-%1'.format(item.id);
    } else if (DataManager.isArmor(item)) {
        key = 'armor-%1'.format(item.id);
    } else {
        return;
    }

    // Update Data
    data[type].items[key] = data[type].items[key] || 0;
    data[type].items[key] += times;
};

// v1.47 added by Arisu
Game_Party.prototype.addShopTrackingItemBuy = function(item, times) {
    this.addShopTrackingItem('buy', item, times);
};

// v1.47 added by Arisu
Game_Party.prototype.addShopTrackingItemSell = function(item, times) {
    this.addShopTrackingItem('sell', item, times);
};

// v1.47 added by Arisu
Game_Party.prototype.addShopTrackingGoldBuy = function(times) {
    this.addShopTrackingItem('buy', 'gold', times);
};

// v1.47 added by Arisu
Game_Party.prototype.addShopTrackingGoldSell = function(times) {
    this.addShopTrackingItem('sell', 'gold', times);
};

//-----------------------------------------------------------------------------
// Scene_ItemBase
//
// The superclass of Scene_Item and Scene_Skill.

VisuMZ.ItemsEquipsCore.Scene_ItemBase_activateItemWindow = Scene_ItemBase.prototype.activateItemWindow;
Scene_ItemBase.prototype.activateItemWindow = function() {
    VisuMZ.ItemsEquipsCore.Scene_ItemBase_activateItemWindow.call(this);
    this._itemWindow.callUpdateHelp();
};

//-----------------------------------------------------------------------------
// Scene_Item
//
// The scene class of the item screen.

Scene_Item.prototype.isBottomHelpMode = function() {
    if (ConfigManager.uiMenuStyle && ConfigManager.uiHelpPosition !== undefined) {
        return ConfigManager.uiHelpPosition;
    } else if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.updatedLayoutStyle().match(/LOWER/i);
    } else {
        return Scene_ItemBase.prototype.isBottomHelpMode.call(this); // v1.48 fixed return
    }
};

Scene_Item.prototype.isRightInputMode = function() {
    if (ConfigManager.uiMenuStyle && ConfigManager.uiInputPosition !== undefined) {
        return ConfigManager.uiInputPosition;
    } else if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.updatedLayoutStyle().match(/RIGHT/i);
    } else {
        return Scene_ItemBase.prototype.isRightInputMode.call(this); // v1.46 added return
    }
};

Scene_Item.prototype.updatedLayoutStyle = function() {
    return VisuMZ.ItemsEquipsCore.Settings.ItemScene.LayoutStyle;
};

Scene_Item.prototype.isUseModernControls = function() {
    return this._categoryWindow && this._categoryWindow.isUseModernControls();
};

Scene_Item.prototype.isUseItemsEquipsCoreUpdatedLayout = function() {
    return VisuMZ.ItemsEquipsCore.Settings.ItemScene.EnableLayout;
};

VisuMZ.ItemsEquipsCore.Scene_Item_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function() {
    VisuMZ.ItemsEquipsCore.Scene_Item_create.call(this);
    if (this.isUseModernControls()) {
        this.onCategoryOk();
    }
};

VisuMZ.ItemsEquipsCore.Scene_Item_helpWindowRect = Scene_Item.prototype.helpWindowRect;
Scene_Item.prototype.helpWindowRect = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.helpWindowRectItemsEquipsCore();
    } else {
        // v1.35 updated by Irina
        return VisuMZ.ItemsEquipsCore.Scene_Item_helpWindowRect.call(this);
    }
};

Scene_Item.prototype.helpWindowRectItemsEquipsCore = function() {
    const wx = 0;
    const wy = this.helpAreaTop();
    const ww = Graphics.boxWidth;
    const wh = this.helpAreaHeight();
    return new Rectangle(wx, wy, ww, wh);
};

VisuMZ.ItemsEquipsCore.Scene_Item_createCategoryWindow = Scene_Item.prototype.createCategoryWindow;
Scene_Item.prototype.createCategoryWindow = function() {
    VisuMZ.ItemsEquipsCore.Scene_Item_createCategoryWindow.call(this);
    if (this.isUseModernControls()) {
        this.postCreateCategoryWindowItemsEquipsCore();
    }
};

Scene_Item.prototype.postCreateCategoryWindowItemsEquipsCore = function() {
    delete this._categoryWindow._handlers['ok'];
    delete this._categoryWindow._handlers['cancel'];
};

VisuMZ.ItemsEquipsCore.Scene_Item_categoryWindowRect = Scene_Item.prototype.categoryWindowRect;
Scene_Item.prototype.categoryWindowRect = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.categoryWindowRectItemsEquipsCore();
    } else {
        return VisuMZ.ItemsEquipsCore.Scene_Item_categoryWindowRect.call(this);
    }
};

Scene_Item.prototype.categoryWindowRectItemsEquipsCore = function() {
    const wx = 0;
    const wy = this.mainAreaTop();
    const ww = Graphics.boxWidth;
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

VisuMZ.ItemsEquipsCore.Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
Scene_Item.prototype.createItemWindow = function() {
    VisuMZ.ItemsEquipsCore.Scene_Item_createItemWindow.call(this);
    if (this.isUseModernControls()) {
        this.postCreateItemWindowModernControls();
    }
    if (this.allowCreateStatusWindow()) {
        this.createStatusWindow();
    }
};

VisuMZ.ItemsEquipsCore.Scene_Item_itemWindowRect = Scene_Item.prototype.itemWindowRect;
Scene_Item.prototype.itemWindowRect = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.itemWindowRectItemsEquipsCore();
    } else {
        const rect = VisuMZ.ItemsEquipsCore.Scene_Item_itemWindowRect.call(this);
        if (this.allowCreateStatusWindow() && this.adjustItemWidthByStatus()) {
            rect.width -= this.statusWidth();
        }
        return rect;
    }
};

Scene_Item.prototype.itemWindowRectItemsEquipsCore = function() {
    const wx = this.isRightInputMode() ? this.statusWidth() : 0;
    const wy = this._categoryWindow.y + this._categoryWindow.height;
    const ww = Graphics.boxWidth - this.statusWidth();
    const wh = this.mainAreaBottom() - wy;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Item.prototype.postCreateItemWindowModernControls = function() {
    this._itemWindow.setHandler("cancel", this.popScene.bind(this));
};

Scene_Item.prototype.allowCreateStatusWindow = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return true;
    } else {
        return VisuMZ.ItemsEquipsCore.Settings.ItemScene.ShowShopStatus;
    }
};

Scene_Item.prototype.adjustItemWidthByStatus = function() {
    return VisuMZ.ItemsEquipsCore.Settings.ItemScene.ItemSceneAdjustItemList;
};

Scene_Item.prototype.createStatusWindow = function() {
    const rect = this.statusWindowRect();
    this._statusWindow = new Window_ShopStatus(rect);
    this.addWindow(this._statusWindow);
    this._itemWindow.setStatusWindow(this._statusWindow);

    // v1.18 added by Yanfly
    const bgType = VisuMZ.ItemsEquipsCore.Settings.ItemScene.ItemMenuStatusBgType;
    this._statusWindow.setBackgroundType(bgType || 0);
};

Scene_Item.prototype.statusWindowRect = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.statusWindowRectItemsEquipsCore();
    } else {
        return VisuMZ.ItemsEquipsCore.Settings.ItemScene.ItemMenuStatusRect.call(this);
    }
};

Scene_Item.prototype.statusWindowRectItemsEquipsCore = function() {
    const ww = this.statusWidth();
    const wh = this._itemWindow.height;
    const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - this.statusWidth();
    const wy = this._itemWindow.y;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Item.prototype.statusWidth = function() {
    return Scene_Shop.prototype.statusWidth();
};

Scene_Item.prototype.buttonAssistItemListRequirement = function() {
    if (!this.updatedLayoutStyle()) return false;
    if (!this.isUseModernControls()) return false;
    if (!this._itemWindow) return false;
    if (!this._itemWindow.active) return false;
    return this.updatedLayoutStyle() && this.isUseModernControls();
};

Scene_Item.prototype.buttonAssistKey1 = function() {
    if (this.buttonAssistItemListRequirement()) {
        if (this._itemWindow.maxCols() === 1) {
            return TextManager.getInputMultiButtonStrings('left', 'right');
        } else {
            return TextManager.getInputMultiButtonStrings('pageup', 'pagedown');
        }
    }
    return Scene_ItemBase.prototype.buttonAssistKey1.call(this);
};

Scene_Item.prototype.buttonAssistText1 = function() {
    if (this.buttonAssistItemListRequirement()) {
        return VisuMZ.ItemsEquipsCore.Settings.ItemScene.buttonAssistCategory;
    }
    return Scene_ItemBase.prototype.buttonAssistText1.call(this);
};

//-----------------------------------------------------------------------------
// Scene_Equip
//
// The scene class of the equipment screen.

Scene_Equip.prototype.isBottomHelpMode = function() {
    if (ConfigManager.uiMenuStyle && ConfigManager.uiHelpPosition !== undefined) {
        return ConfigManager.uiHelpPosition;
    } else if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.updatedLayoutStyle().match(/LOWER/i);
    } else {
        Scene_MenuBase.prototype.isRightInputMode.call(this);
    }
};

Scene_Equip.prototype.isRightInputMode = function() {
    if (ConfigManager.uiMenuStyle && ConfigManager.uiInputPosition !== undefined) {
        return ConfigManager.uiInputPosition;
    } else if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.updatedLayoutStyle().match(/RIGHT/i);
    } else {
        Scene_MenuBase.prototype.isRightInputMode.call(this);
    }
};

Scene_Equip.prototype.updatedLayoutStyle = function() {
    return VisuMZ.ItemsEquipsCore.Settings.EquipScene.LayoutStyle;
};

Scene_Equip.prototype.isUseModernControls = function() {
    return this._commandWindow && this._commandWindow.isUseModernControls();
};

Scene_Equip.prototype.isUseItemsEquipsCoreUpdatedLayout = function() {
    return VisuMZ.ItemsEquipsCore.Settings.EquipScene.EnableLayout;
};

VisuMZ.ItemsEquipsCore.Scene_Equip_create = Scene_Equip.prototype.create;
Scene_Equip.prototype.create = function() {
    VisuMZ.ItemsEquipsCore.Scene_Equip_create.call(this);
    if (this.isUseModernControls()) {
        this.commandEquip();
    }
};

VisuMZ.ItemsEquipsCore.Scene_Equip_helpWindowRect = Scene_Equip.prototype.helpWindowRect;
Scene_Equip.prototype.helpWindowRect = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.helpWindowRectItemsEquipsCore();
    } else {
        // v1.35 updated by Irina
        return VisuMZ.ItemsEquipsCore.Scene_Equip_helpWindowRect.call(this);
    }
};

Scene_Equip.prototype.helpWindowRectItemsEquipsCore = function() {
    const wx = 0;
    const wy = this.helpAreaTop();
    const ww = Graphics.boxWidth;
    const wh = this.helpAreaHeight();
    return new Rectangle(wx, wy, ww, wh);
};

VisuMZ.ItemsEquipsCore.Scene_Equip_statusWindowRect = Scene_Equip.prototype.statusWindowRect;
Scene_Equip.prototype.statusWindowRect = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.statusWindowRectItemsEquipsCore();
    } else {
        return VisuMZ.ItemsEquipsCore.Scene_Equip_statusWindowRect.call(this);
    }
};

Scene_Equip.prototype.statusWindowRectItemsEquipsCore = function() {
    const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - this.statusWidth();
    const wy = this.mainAreaTop();
    const ww = this.statusWidth();
    const wh = this.mainAreaHeight();
    return new Rectangle(wx, wy, ww, wh);
};

// v1.41 added by Arisu
VisuMZ.ItemsEquipsCore.Scene_Equip_createCommandWindow = Scene_Equip.prototype.createCommandWindow;
Scene_Equip.prototype.createCommandWindow = function() {
    VisuMZ.ItemsEquipsCore.Scene_Equip_createCommandWindow.call(this);

    if (this._helpWindow) this._commandWindow.setHelpWindow(this._helpWindow);
};

VisuMZ.ItemsEquipsCore.Scene_Equip_commandWindowRect = Scene_Equip.prototype.commandWindowRect;
Scene_Equip.prototype.commandWindowRect = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.commandWindowRectItemsEquipsCore();
    } else {
        return VisuMZ.ItemsEquipsCore.Scene_Equip_commandWindowRect.call(this);
    }
};

Scene_Equip.prototype.shouldCommandWindowExist = function() {
    const settings = VisuMZ.ItemsEquipsCore.Settings.EquipScene;
    return settings.CommandAddOptimize || settings.CommandAddClear;
};

Scene_Equip.prototype.commandWindowRectItemsEquipsCore = function() {
    const exist = this.shouldCommandWindowExist();
    const wx = this.isRightInputMode() ? this.statusWidth() : 0;
    const wy = this.mainAreaTop();
    const ww = Graphics.boxWidth - this.statusWidth();
    const wh = exist ? this.calcWindowHeight(1, true) : 0;
    return new Rectangle(wx, wy, ww, wh);
};

VisuMZ.ItemsEquipsCore.Scene_Equip_createSlotWindow = Scene_Equip.prototype.createSlotWindow;
Scene_Equip.prototype.createSlotWindow = function() {
    VisuMZ.ItemsEquipsCore.Scene_Equip_createSlotWindow.call(this);
    if (this.isUseModernControls()) {
        this.postCreateSlotWindowItemsEquipsCore();
    }
};

VisuMZ.ItemsEquipsCore.Scene_Equip_slotWindowRect = Scene_Equip.prototype.slotWindowRect;
Scene_Equip.prototype.slotWindowRect = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.slotWindowRectItemsEquipsCore();
    } else {
        return VisuMZ.ItemsEquipsCore.Scene_Equip_slotWindowRect.call(this);
    }
};

Scene_Equip.prototype.slotWindowRectItemsEquipsCore = function() {
    const commandWindowRect = this.commandWindowRect();
    const wx = this.isRightInputMode() ? this.statusWidth() : 0;
    const wy = commandWindowRect.y + commandWindowRect.height;
    const ww = Graphics.boxWidth - this.statusWidth();
    const wh = this.mainAreaHeight() - commandWindowRect.height;
    return new Rectangle(wx, wy, ww, wh);
};

VisuMZ.ItemsEquipsCore.Scene_Equip_itemWindowRect = Scene_Equip.prototype.itemWindowRect;
Scene_Equip.prototype.itemWindowRect = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.slotWindowRect();
    } else {
        return VisuMZ.ItemsEquipsCore.Scene_Equip_itemWindowRect.call(this);
    }
};

Scene_Equip.prototype.statusWidth = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.geUpdatedLayoutStatusWidth();
    } else {
        return VisuMZ.ItemsEquipsCore.Settings.EquipScene.StatusWindowWidth;
    }
};

Scene_Equip.prototype.geUpdatedLayoutStatusWidth = function() {
    return Math.floor(Graphics.boxWidth / 2);
};

Scene_Equip.prototype.postCreateSlotWindowItemsEquipsCore = function() {
    this._slotWindow.setHandler('cancel', this.popScene.bind(this));
    this._slotWindow.setHandler("pagedown", this.nextActor.bind(this));
    this._slotWindow.setHandler("pageup", this.previousActor.bind(this));
};

VisuMZ.ItemsEquipsCore.Scene_Equip_commandEquip = Scene_Equip.prototype.commandEquip;
Scene_Equip.prototype.commandEquip = function() {
    if (this.isUseModernControls()) {
        this._commandWindow.deselect();
        this._commandWindow.deactivate();
    }
    VisuMZ.ItemsEquipsCore.Scene_Equip_commandEquip.call(this);
};

VisuMZ.ItemsEquipsCore.Scene_Equip_onSlotOk = Scene_Equip.prototype.onSlotOk;
Scene_Equip.prototype.onSlotOk = function() {
    if (this._slotWindow.index() >= 0) {
        VisuMZ.ItemsEquipsCore.Scene_Equip_onSlotOk.call(this);
        this.onSlotOkAutoSelect();
    } else {
        this._slotWindow.smoothSelect(0);
        this._slotWindow.activate();
    }
};

Scene_Equip.prototype.onSlotOkAutoSelect = function() {
    this._itemWindow.refresh();
    const item = this._slotWindow.item();
    const index = this._itemWindow._data.indexOf(item);
    const half = Math.floor(this._itemWindow.maxVisibleItems() / 2) - 1;
    this._itemWindow.smoothSelect(index >= 0 ? index : 0);
    // v1.40 added by Irina
    if (this._itemWindow._scrollDuration > 1) {
    	this._itemWindow._scrollDuration = 1;
    	this._itemWindow.updateSmoothScroll();
    }
    // Original
    this._itemWindow.setTopRow(this._itemWindow.index() - half);
};

VisuMZ.ItemsEquipsCore.Scene_Equip_onSlotCancel = Scene_Equip.prototype.onSlotCancel;
Scene_Equip.prototype.onSlotCancel = function() {
    VisuMZ.ItemsEquipsCore.Scene_Equip_onSlotCancel.call(this);
    if (this.isUseModernControls()) {
        this._commandWindow.smoothSelect(0);
        this._slotWindow.deactivate();
    }
};

VisuMZ.ItemsEquipsCore.Scene_Equip_onActorChange = Scene_Equip.prototype.onActorChange;
Scene_Equip.prototype.onActorChange = function() {
    VisuMZ.ItemsEquipsCore.Scene_Equip_onActorChange.call(this);
    if (this.isUseModernControls()) {
        this._commandWindow.deactivate();
        this._commandWindow.deselect();
        this._slotWindow.smoothSelect(0);
        this._slotWindow.activate();
    }
};

Scene_Equip.prototype.buttonAssistSlotWindowShift = function() {
    if (!this._slotWindow) return false;
    if (!this._slotWindow.active) return false;
    return this._slotWindow.isShiftRemoveShortcutEnabled();
};

Scene_Equip.prototype.buttonAssistKey3 = function() {
    if (this.buttonAssistSlotWindowShift()) {
        return TextManager.getInputButtonString('shift');
    }
    return Scene_MenuBase.prototype.buttonAssistKey3.call(this);
};

Scene_Equip.prototype.buttonAssistText3 = function() {
    if (this.buttonAssistSlotWindowShift()) {
        return VisuMZ.ItemsEquipsCore.Settings.EquipScene.buttonAssistRemove;
    }
    return Scene_MenuBase.prototype.buttonAssistText3.call(this);
};

Scene_Equip.prototype.buttonAssistOffset3 = function() {
    if (this.buttonAssistSlotWindowShift()) {
        return this._buttonAssistWindow.width / 5 / -3;
    }
    return Scene_MenuBase.prototype.buttonAssistOffset3.call(this);
};

Scene_Equip.prototype.popScene = function() {
    SceneManager.pop();
};

//-----------------------------------------------------------------------------
// Scene_Load
//
// The scene class of the load screen.

VisuMZ.ItemsEquipsCore.Scene_Load_reloadMapIfUpdated = Scene_Load.prototype.reloadMapIfUpdated;
Scene_Load.prototype.reloadMapIfUpdated = function() {
    VisuMZ.ItemsEquipsCore.Scene_Load_reloadMapIfUpdated.call(this);
    this.refreshActorEquipSlotsIfUpdated();
};

Scene_Load.prototype.refreshActorEquipSlotsIfUpdated = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        for (const actor of $gameActors._data) {
            if (actor) actor.prepareNewEquipSlotsOnLoad();
        }
    }
};

//-----------------------------------------------------------------------------
// Scene_Shop
//
// The scene class of the shop screen.

Scene_Shop.prototype.isBottomHelpMode = function() {
    if (ConfigManager.uiMenuStyle && ConfigManager.uiHelpPosition !== undefined) {
        return ConfigManager.uiHelpPosition;
    } else if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.updatedLayoutStyle().match(/LOWER/i);
    } else {
        Scene_MenuBase.prototype.isRightInputMode.call(this);
    }
};

Scene_Shop.prototype.isRightInputMode = function() {
    if (ConfigManager.uiMenuStyle && ConfigManager.uiInputPosition !== undefined) {
        return ConfigManager.uiInputPosition;
    } else if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.updatedLayoutStyle().match(/RIGHT/i);
    } else {
        Scene_MenuBase.prototype.isRightInputMode.call(this);
    }
};

Scene_Shop.prototype.updatedLayoutStyle = function() {
    return VisuMZ.ItemsEquipsCore.Settings.ShopScene.LayoutStyle;
};

Scene_Shop.prototype.isUseModernControls = function() {
    return this._categoryWindow && this._categoryWindow.isUseModernControls();
};

Scene_Shop.prototype.isUseItemsEquipsCoreUpdatedLayout = function() {
    return VisuMZ.ItemsEquipsCore.Settings.ShopScene.EnableLayout;
};

VisuMZ.ItemsEquipsCore.Scene_Shop_prepare = Scene_Shop.prototype.prepare;
Scene_Shop.prototype.prepare = function(goods, purchaseOnly) {
    goods = VisuMZ.ItemsEquipsCore.deepCopy(goods);
    VisuMZ.ItemsEquipsCore.Scene_Shop_prepare.call(this, goods, purchaseOnly);
    this.adjustHiddenShownGoods();
};

Scene_Shop.prototype.adjustHiddenShownGoods = function() {
    this._goodsCount = 0;
    const removal = []; // v1.37 added by Arisu

    for (const good of this._goods) {
        if (this.isGoodShown(good)) {
            this._goodsCount++;
        } else {
            //good[0] = -1;
            removal.push(good); // v1.37 added by Arisu
        }
    }

    // v1.37 added by Arisu
    for (const good of removal) {
        this._goods.remove(good);
    }
};

Scene_Shop.prototype.isGoodShown = function(good) {
    if (good[0] > 2 || good[0] < 0) return false;
    const item = [$dataItems, $dataWeapons, $dataArmors][good[0]][good[1]];
    if (!item) return false;

    // v1.47 disabled by Arisu
    // const note = item.note || '';

    // if (note.match(/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
    //     const switches = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
    //     for (const switchId of switches) {
    //         if (!$gameSwitches.value(switchId)) return false;
    //     }
    //     return true;
    // }
    // if (note.match(/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
    //     const switches = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
    //     for (const switchId of switches) {
    //         if (!$gameSwitches.value(switchId)) return false;
    //     }
    //     return true;
    // }
    // if (note.match(/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
    //     const switches = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
    //     for (const switchId of switches) {
    //         if ($gameSwitches.value(switchId)) return true;
    //     }
    //     return false;
    // }
    // if (note.match(/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
    //     const switches = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
    //     for (const switchId of switches) {
    //         if (!$gameSwitches.value(switchId)) return true;
    //     }
    //     return false;
    // }
    // if (note.match(/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
    //     const switches = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
    //     for (const switchId of switches) {
    //         if (!$gameSwitches.value(switchId)) return true;
    //     }
    //     return false;
    // }
    // if (note.match(/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
    //     const switches = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
    //     for (const switchId of switches) {
    //         if ($gameSwitches.value(switchId)) return false;
    //     }
    //     return true;
    // }

    return true;
};

VisuMZ.ItemsEquipsCore.Scene_Shop_create = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function() {
    VisuMZ.ItemsEquipsCore.Scene_Shop_create.call(this);
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        this.postCreateItemsEquipsCore();
    }
    this.resetShopSwitches(); // v1.20 added by Irina
};

Scene_Shop.prototype.postCreateItemsEquipsCore = function() {
    this._dummyWindow.hide();
    this._buyWindow.show();
    this._buyWindow.deselect();
    this._statusWindow.show();
};

VisuMZ.ItemsEquipsCore.Scene_Shop_helpWindowRect = Scene_Shop.prototype.helpWindowRect;
Scene_Shop.prototype.helpWindowRect = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.helpWindowRectItemsEquipsCore();
    } else {
        // v1.35 updated by Irina
        return VisuMZ.ItemsEquipsCore.Scene_Shop_helpWindowRect.call(this);
    }
};

Scene_Shop.prototype.helpWindowRectItemsEquipsCore = function() {
    const wx = 0;
    const wy = this.helpAreaTop();
    const ww = Graphics.boxWidth;
    const wh = this.helpAreaHeight();
    return new Rectangle(wx, wy, ww, wh);
};

VisuMZ.ItemsEquipsCore.Scene_Shop_goldWindowRect = Scene_Shop.prototype.goldWindowRect;
Scene_Shop.prototype.goldWindowRect = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.goldWindowRectItemsEquipsCore();
    } else {
        return VisuMZ.ItemsEquipsCore.Scene_Shop_goldWindowRect.call(this);
    }
};

Scene_Shop.prototype.goldWindowRectItemsEquipsCore = function() {
    const ww = this.mainCommandWidth();
    const wh = this.calcWindowHeight(1, true);
    const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
    const wy = this.mainAreaTop();
    return new Rectangle(wx, wy, ww, wh);
};

VisuMZ.ItemsEquipsCore.Scene_Shop_commandWindowRect = Scene_Shop.prototype.commandWindowRect;
Scene_Shop.prototype.commandWindowRect = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.commandWindowRectItemsEquipsCore();
    } else {
        return VisuMZ.ItemsEquipsCore.Scene_Shop_commandWindowRect.call(this);
    }
};

Scene_Shop.prototype.commandWindowRectItemsEquipsCore = function() {
    const wx = this.isRightInputMode() ? this.mainCommandWidth() : 0;
    const wy = this.mainAreaTop();
    const ww = Graphics.boxWidth - this.mainCommandWidth();
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

VisuMZ.ItemsEquipsCore.Scene_Shop_numberWindowRect = Scene_Shop.prototype.numberWindowRect;
Scene_Shop.prototype.numberWindowRect = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.numberWindowRectItemsEquipsCore();
    } else {
        return VisuMZ.ItemsEquipsCore.Scene_Shop_numberWindowRect.call(this);
    }
};

Scene_Shop.prototype.numberWindowRectItemsEquipsCore = function() {
    const wy = this._commandWindow.y + this._commandWindow.height;
    const ww = Graphics.boxWidth - this.statusWidth();
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    const wh = this.mainAreaHeight() - this._commandWindow.height;
    return new Rectangle(wx, wy, ww, wh);
};

VisuMZ.ItemsEquipsCore.Scene_Shop_statusWindowRect = Scene_Shop.prototype.statusWindowRect;
Scene_Shop.prototype.statusWindowRect = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.statusWindowRectItemsEquipsCore();
    } else {
        return VisuMZ.ItemsEquipsCore.Scene_Shop_statusWindowRect.call(this);
    }
};

Scene_Shop.prototype.statusWindowRectItemsEquipsCore = function() {
    const ww = this.statusWidth();
    const wh = this.mainAreaHeight() - this._commandWindow.height;
    const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
    const wy = this._commandWindow.y + this._commandWindow.height;
    return new Rectangle(wx, wy, ww, wh);
};

VisuMZ.ItemsEquipsCore.Scene_Shop_buyWindowRect = Scene_Shop.prototype.buyWindowRect;
Scene_Shop.prototype.buyWindowRect = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.buyWindowRectItemsEquipsCore();
    } else {
        return VisuMZ.ItemsEquipsCore.Scene_Shop_buyWindowRect.call(this);
    }
};

Scene_Shop.prototype.buyWindowRectItemsEquipsCore = function() {
    const wy = this._commandWindow.y + this._commandWindow.height;
    const ww = Graphics.boxWidth - this.statusWidth();
    const wh = this.mainAreaHeight() - this._commandWindow.height;
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    return new Rectangle(wx, wy, ww, wh);
};

VisuMZ.ItemsEquipsCore.Scene_Shop_createCategoryWindow = Scene_Shop.prototype.createCategoryWindow
Scene_Shop.prototype.createCategoryWindow = function() {
    VisuMZ.ItemsEquipsCore.Scene_Shop_createCategoryWindow.call(this);
    if (this.isUseModernControls()) {
        this.postCreateCategoryWindowItemsEquipsCore();
    }
};

VisuMZ.ItemsEquipsCore.Scene_Shop_categoryWindowRect = Scene_Shop.prototype.categoryWindowRect;
Scene_Shop.prototype.categoryWindowRect = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.categoryWindowRectItemsEquipsCore();
    } else {
        return VisuMZ.ItemsEquipsCore.Scene_Shop_categoryWindowRect.call(this);
    }
};

Scene_Shop.prototype.categoryWindowRectItemsEquipsCore = function() {
    const wy = this._commandWindow.y;
    const ww = this._commandWindow.width;
    const wh = this.calcWindowHeight(1, true);
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Shop.prototype.postCreateCategoryWindowItemsEquipsCore = function() {
    delete this._categoryWindow._handlers['ok'];
    delete this._categoryWindow._handlers['cancel'];
};

VisuMZ.ItemsEquipsCore.Scene_Shop_createSellWindow = Scene_Shop.prototype.createSellWindow;
Scene_Shop.prototype.createSellWindow = function() {
    VisuMZ.ItemsEquipsCore.Scene_Shop_createSellWindow.call(this);
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        this.postCreateSellWindowItemsEquipsCore();
    }
};

VisuMZ.ItemsEquipsCore.Scene_Shop_sellWindowRect = Scene_Shop.prototype.sellWindowRect;
Scene_Shop.prototype.sellWindowRect = function() {
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        return this.sellWindowRectItemsEquipsCore();
    } else {
        return VisuMZ.ItemsEquipsCore.Scene_Shop_sellWindowRect.call(this);
    }
};

Scene_Shop.prototype.sellWindowRectItemsEquipsCore = function() {
    const wy = this._categoryWindow.y + this._categoryWindow.height;
    const ww = Graphics.boxWidth - this.statusWidth();
    const wh =
        this.mainAreaHeight() -
        this._categoryWindow.height;
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Shop.prototype.postCreateSellWindowItemsEquipsCore = function() {
    this._sellWindow.setStatusWindow(this._statusWindow);
};

Scene_Shop.prototype.statusWidth = function() {
    return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.Width;
};

VisuMZ.ItemsEquipsCore.Scene_Shop_activateSellWindow = Scene_Shop.prototype.activateSellWindow;
Scene_Shop.prototype.activateSellWindow = function() {
    VisuMZ.ItemsEquipsCore.Scene_Shop_activateSellWindow.call(this);
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        this._statusWindow.show();
    }
    this._sellWindow.updateHelp(); // v1.24 added by Arisu
};

VisuMZ.ItemsEquipsCore.Scene_Shop_commandBuy = Scene_Shop.prototype.commandBuy;
Scene_Shop.prototype.commandBuy = function() {
    VisuMZ.ItemsEquipsCore.Scene_Shop_commandBuy.call(this);
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        this.commandBuyItemsEquipsCore();
    }
};

Scene_Shop.prototype.commandBuyItemsEquipsCore = function() {
    this._buyWindowLastIndex = this._buyWindowLastIndex || 0;
    this._buyWindow.smoothSelect(this._buyWindowLastIndex);
};

VisuMZ.ItemsEquipsCore.Scene_Shop_commandSell = Scene_Shop.prototype.commandSell;
Scene_Shop.prototype.commandSell = function() {
    VisuMZ.ItemsEquipsCore.Scene_Shop_commandSell.call(this);
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        this.commandSellItemsEquipsCore();
    }
    if (this.isUseModernControls()) {
        this._categoryWindow.smoothSelect(0);
        this.onCategoryOk();
    }
};

Scene_Shop.prototype.commandSellItemsEquipsCore = function() {
    this._buyWindow.hide();
    this._commandWindow.hide();
};

VisuMZ.ItemsEquipsCore.Scene_Shop_onBuyCancel = Scene_Shop.prototype.onBuyCancel;
Scene_Shop.prototype.onBuyCancel = function() {
    VisuMZ.ItemsEquipsCore.Scene_Shop_onBuyCancel.call(this);
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        this.onBuyCancelItemsEquipsCore();
    }
};

Scene_Shop.prototype.onBuyCancelItemsEquipsCore = function() {
    this._buyWindowLastIndex = this._buyWindow.index();
    this._buyWindow.show();
    this._buyWindow.deselect();
    this._buyWindow.smoothScrollTo(0,0);
    this._statusWindow.show();
    this._dummyWindow.hide();
};

VisuMZ.ItemsEquipsCore.Scene_Shop_onCategoryCancel = Scene_Shop.prototype.onCategoryCancel;
Scene_Shop.prototype.onCategoryCancel = function() {
    VisuMZ.ItemsEquipsCore.Scene_Shop_onCategoryCancel.call(this);
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        this.onCategoryCancelItemsEquipsCore();
    }
};

Scene_Shop.prototype.onCategoryCancelItemsEquipsCore = function() {
    this._buyWindow.show();
    this._commandWindow.show();
};

// v1.37 added by Arisu
VisuMZ.ItemsEquipsCore.Scene_Shop_onBuyOk = Scene_Shop.prototype.onBuyOk;
Scene_Shop.prototype.onBuyOk = function() {
    $gameTemp._bypassProxy = true;
    VisuMZ.ItemsEquipsCore.Scene_Shop_onBuyOk.call(this);
    $gameTemp._bypassProxy = false;
    this._item = this._buyWindow.item();
};

// v1.37 added by Arisu
VisuMZ.ItemsEquipsCore.Scene_Shop_buyingPrice = Scene_Shop.prototype.buyingPrice;
Scene_Shop.prototype.buyingPrice = function() {
    $gameTemp._bypassProxy = true;
    this._item = this._buyWindow.item();
    
    const price = VisuMZ.ItemsEquipsCore.Scene_Shop_buyingPrice.call(this);

    $gameTemp._bypassProxy = false;
    this._item = this._buyWindow.item();

    return price;
};

VisuMZ.ItemsEquipsCore.Scene_Shop_onSellOk = Scene_Shop.prototype.onSellOk;
Scene_Shop.prototype.onSellOk = function() {
    VisuMZ.ItemsEquipsCore.Scene_Shop_onSellOk.call(this);
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        this.onSellOkItemsEquipsCore();
    }
};

Scene_Shop.prototype.onSellOkItemsEquipsCore = function() {
    this._categoryWindow.show();
};

VisuMZ.ItemsEquipsCore.Scene_Shop_onSellCancel = Scene_Shop.prototype.onSellCancel;
Scene_Shop.prototype.onSellCancel = function() {
    VisuMZ.ItemsEquipsCore.Scene_Shop_onSellCancel.call(this);
    if (this.isUseModernControls()) {
        this.onCategoryCancel();
    }
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        this._dummyWindow.hide();
    }
};

// v1.37 added by Arisu
Scene_Shop.prototype.sellPriceOfItem = function(item) {
    const originalItem = this._item;
    this._item = item;
    const price = this.sellingPrice();
    this._item = originalItem;
    return price;
};

VisuMZ.ItemsEquipsCore.Scene_Shop_sellingPrice = Scene_Shop.prototype.sellingPrice;
Scene_Shop.prototype.sellingPrice = function() {
    let price = this.determineBaseSellingPrice();
    const item = this._item;
    // Run JS: Sell Price Plugin Parameter
    price = VisuMZ.ItemsEquipsCore.Settings.ShopScene.SellPriceJS.call(this, item, price);
    return price;
};

Scene_Shop.prototype.determineBaseSellingPrice = function() {
    let basePrice = this._item.price;
    if (!this._item) {
        return 0;
    } else if (this._item.note.match(/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)) {
        const code = String(RegExp.$1);
        let item = this._item;
        let price = basePrice * this.sellPriceRate();
        try {
            eval(code);
        } catch (e) {
            if ($gameTemp.isPlaytest()) console.log(e);
        }
        if (isNaN(price)) price = 0;
        return Math.floor(price);
    } else if (this._item.note.match(/<SELL PRICE:[ ](\d+)>/i)) {
        return parseInt(RegExp.$1);
    } else {
        return Math.floor(this.baseSellingPrice()); // v1.31 added by Arisu
    }
};

// v1.31 added by Arisu
Scene_Shop.prototype.baseSellingPrice = function() {
    return this._item.price * this.sellPriceRate();
};

Scene_Shop.prototype.sellPriceRate = function() {
    return VisuMZ.ItemsEquipsCore.Settings.ShopScene.SellPriceRate;
};

Scene_Shop.prototype.buttonAssistItemListRequirement = function() {
    if (!this.updatedLayoutStyle()) return false;
    if (!this.isUseModernControls()) return false;
    if (!this._sellWindow) return false;
    if (!this._sellWindow.active) return false;
    return this.updatedLayoutStyle() && this.isUseModernControls();
};

Scene_Shop.prototype.buttonAssistKey1 = function() {
    if (this.buttonAssistItemListRequirement()) {
        if (this._sellWindow.maxCols() === 1) {
            return TextManager.getInputMultiButtonStrings('left', 'right');
        } else {
            return TextManager.getInputMultiButtonStrings('pageup', 'pagedown');
        }
    } else if (this._numberWindow && this._numberWindow.active) {
        return TextManager.getInputMultiButtonStrings('left', 'right');
    }
    return Scene_MenuBase.prototype.buttonAssistKey1.call(this);
};

Scene_Shop.prototype.buttonAssistKey2 = function() {
    if (this._numberWindow && this._numberWindow.active) {
        return TextManager.getInputMultiButtonStrings('up', 'down');
    }
    return Scene_MenuBase.prototype.buttonAssistKey2.call(this);
};

Scene_Shop.prototype.buttonAssistText1 = function() {
    if (this.buttonAssistItemListRequirement()) {
        return VisuMZ.ItemsEquipsCore.Settings.ItemScene.buttonAssistCategory;
    } else if (this._numberWindow && this._numberWindow.active) {
        return VisuMZ.ItemsEquipsCore.Settings.ShopScene.buttonAssistSmallIncrement;
    }
    return Scene_MenuBase.prototype.buttonAssistText1.call(this);
};

Scene_Shop.prototype.buttonAssistText2 = function() {
    if (this._numberWindow && this._numberWindow.active) {
        return VisuMZ.ItemsEquipsCore.Settings.ShopScene.buttonAssistLargeIncrement;
    }
    return Scene_MenuBase.prototype.buttonAssistText2.call(this);
};

//-----------------------------------------------------------------------------
// Scene Switches
//-----------------------------------------------------------------------------

// v1.20 added by Irina
Scene_Shop.prototype.resetShopSwitches = function() {
    if (!SceneManager.isSceneShop()) return;

    const settings = VisuMZ.ItemsEquipsCore.Settings.ShopScene;
    if (settings.SwitchBuy) {
        $gameSwitches.setValue(settings.SwitchBuy, false);
    }
    if (settings.SwitchSell) {
        $gameSwitches.setValue(settings.SwitchSell, false);
    }
};

// v1.20 added by Irina
VisuMZ.ItemsEquipsCore.Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number) {
    VisuMZ.ItemsEquipsCore.Scene_Shop_doBuy.call(this, number);
    this.onBuyItem(this._item, number); // v1.47 added by Arisu
    if (number <= 0) return;

    const settings = VisuMZ.ItemsEquipsCore.Settings.ShopScene;
    if (settings.SwitchBuy) {
        $gameSwitches.setValue(settings.SwitchBuy, true);
    }

    // Refresh Windows
    this._buyWindow.refresh();
    this._sellWindow.refresh();
};

// v1.47 added by Arisu
// Compatibility Target
Scene_Shop.prototype.onBuyItem = function(item, number) {
    this.processShopCondListingOnBuyItem(item, number);
    $gameParty.addShopTrackingItemBuy(item, number);
    $gameParty.addShopTrackingGoldBuy(number * this.buyingPrice());
};

// v1.47 added by Arisu
Scene_Shop.prototype.processShopCondListingOnBuyItem = function(item, number) {
    // Return Check
    if (!item) return;
    if (!number) return;

    // Declare Constants
    const regexp = VisuMZ.ItemsEquipsCore.ShopListingRegExp;
    const note = item.note || '';

    // Check Notetags
    // <Buy Turn ON Switches: x, x, x>
    if (note.match(regexp.BuyTurnSwitchOn)) {
        const switchIDs = String(RegExp.$1).split(',').map(i => Number(i));
        for (const switchID of switchIDs) {
            $gameSwitches.setValue(switchID, true);
        }
    }
    // <Buy Turn OFF Switches: x, x, x>
    if (note.match(regexp.BuyTurnSwitchOff)) {
        const switchIDs = String(RegExp.$1).split(',').map(i => Number(i));
        for (const switchID of switchIDs) {
            $gameSwitches.setValue(switchID, false);
        }
    }
};

// 1.20 added by Irina
VisuMZ.ItemsEquipsCore.Scene_Shop_doSell = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function(number) {
    VisuMZ.ItemsEquipsCore.Scene_Shop_doSell.call(this, number);
    this.onSellItem(this._item, number); // v1.47 added by Arisu
    if (number <= 0) return;

    const settings = VisuMZ.ItemsEquipsCore.Settings.ShopScene;
    if (settings.SwitchBuy) {
        $gameSwitches.setValue(settings.SwitchSell, true);
    }

    // Refresh Windows
    this._buyWindow.refresh();
    this._sellWindow.refresh();
};

// v1.47 added by Arisu
// Compatibility Target
Scene_Shop.prototype.onSellItem = function(item, number) {
    this.processShopCondListingOnSellItem(item, number);
    $gameParty.addShopTrackingItemSell(item, number);
    $gameParty.addShopTrackingGoldSell(number * this.sellingPrice());
};

// v1.47 added by Arisu
Scene_Shop.prototype.processShopCondListingOnSellItem = function(item, number) {
    // Return Check
    if (!item) return;
    if (!number) return;

    // Declare Constants
    const regexp = VisuMZ.ItemsEquipsCore.ShopListingRegExp;
    const note = item.note || '';

    // Check Notetags
    // <Sell Turn ON Switches: x, x, x>
    if (note.match(regexp.SellTurnSwitchOn)) {
        const switchIDs = String(RegExp.$1).split(',').map(i => Number(i));
        for (const switchID of switchIDs) {
            $gameSwitches.setValue(switchID, true);
        }
    }
    // <Sell Turn OFF Switches: x, x, x>
    if (note.match(regexp.SellTurnSwitchOff)) {
        const switchIDs = String(RegExp.$1).split(',').map(i => Number(i));
        for (const switchID of switchIDs) {
            $gameSwitches.setValue(switchID, false);
        }
    }
};

//-----------------------------------------------------------------------------
// Sprite_NewLabel
//
// The sprite for displaying a new item label.

function Sprite_NewLabel() {
    this.initialize(...arguments);
}

Sprite_NewLabel.prototype = Object.create(Sprite.prototype);
Sprite_NewLabel.prototype.constructor = Sprite_NewLabel;

Sprite_NewLabel.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.createBitmap();
};

Sprite_NewLabel.prototype.createBitmap = function() {
    const width = ImageManager.iconWidth;
    const height = ImageManager.iconHeight;
    this.bitmap = new Bitmap(width, height);
    this.drawNewLabelIcon();
    this.drawNewLabelText();
};

Sprite_NewLabel.prototype.drawNewLabelIcon = function() {
    const iconIndex = VisuMZ.ItemsEquipsCore.Settings.New.Icon;
    if (iconIndex <= 0) return;
    const bitmap = ImageManager.loadSystem("IconSet");
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    this.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);
};

Sprite_NewLabel.prototype.drawNewLabelText = function() {
    const settings = VisuMZ.ItemsEquipsCore.Settings.New;
    const text = settings.Text;
    if (text === '') return;
    const width = ImageManager.iconWidth;
    const height = ImageManager.iconHeight;
    this.bitmap.fontFace = settings.FontFace || $gameSystem.mainFontFace();
    this.bitmap.textColor = this.getTextColor();
    this.bitmap.fontSize = settings.FontSize;
    this.bitmap.drawText(text, 0, height/2, width, height/2, 'center');
};

Sprite_NewLabel.prototype.getTextColor = function() {
    const color = VisuMZ.ItemsEquipsCore.Settings.New.FontColor;
    return color.match(/#(.*)/i) ? '#' + String(RegExp.$1) : ColorManager.textColor(color);
};

//-----------------------------------------------------------------------------
// Window_Base
//
// The superclass of all windows within the game.

Window_Base.prototype.drawItemName = function(item, x, y, width) {
    if (item) {
        const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
        const textMargin = ImageManager.iconWidth + 4;
        const itemWidth = Math.max(0, width - textMargin);
        this.changeTextColor(ColorManager.getItemColor(item));
        this.drawIcon(item.iconIndex, x, iconY);
        this.drawText(item.name, x + textMargin, y, itemWidth);
        this.resetTextColor();
    }
};

Window_Base.prototype.drawItemNumber = function(item, x, y, width) {
    if (this.isDrawItemNumber(item)) {
        this.resetFontSettings();
        const settings = VisuMZ.ItemsEquipsCore.Settings.ItemScene;
        const fmt = settings.ItemQuantityFmt;
        const text = fmt.format($gameParty.numItems(item));
        this.contents.fontSize = settings.ItemQuantityFontSize;
        this.drawText(text, x, y, width, "right");
        this.resetFontSettings();
    }
};

Window_Base.prototype.isDrawItemNumber = function(item) {
    if (DataManager.isKeyItem(item)) return $dataSystem.optKeyItemsNumber;
    return true;
};

Window_Base.prototype.drawItemDarkRect = function(x, y, width, height, times) {
    times = Math.max(times || 1, 1);
    while (times--) {
        height = height || this.lineHeight();
        this.contentsBack.paintOpacity = 160;
        const backColor = ColorManager.gaugeBackColor();
        this.contentsBack.fillRect(x+1, y+1, width-2, height-2, backColor);
        this.contentsBack.paintOpacity = 255;
    }
};

//-----------------------------------------------------------------------------
// Window_Selectable
//
// The window class with cursor movement functions.

VisuMZ.ItemsEquipsCore.Window_Selectable_initialize = Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function(rect) {
    this.initNewLabelSprites();
    VisuMZ.ItemsEquipsCore.Window_Selectable_initialize.call(this, rect);
};

Window_Selectable.prototype.initNewLabelSprites = function() {
    this._newLabelSprites = {};
    this._newLabelOpacity = 255;
    this._newLabelOpacityChange = VisuMZ.ItemsEquipsCore.Settings.New.FadeSpeed;
    this._newLabelOpacityUpperLimit = VisuMZ.ItemsEquipsCore.Settings.New.FadeLimit;
};

Window_Selectable.prototype.isShowNew = function() {
    return false;
};

VisuMZ.ItemsEquipsCore.Window_Selectable_setHelpWindowItem = Window_Selectable.prototype.setHelpWindowItem;
Window_Selectable.prototype.setHelpWindowItem = function(item) {
    VisuMZ.ItemsEquipsCore.Window_Selectable_setHelpWindowItem.call(this, item)
    if (this.isShowNew()) this.clearNewLabelFromItem(item);
};

Window_Selectable.prototype.clearNewLabelFromItem = function(item) {
    if (!item) return;
    $gameParty.clearNewItem(item);
    let key = '';
    if (DataManager.isItem(item)) {
        key = 'item-%1'.format(item.id);
    } else if (DataManager.isWeapon(item)) {
        key = 'weapon-%1'.format(item.id);
    } else if (DataManager.isArmor(item)) {
        key = 'armor-%1'.format(item.id);
    } else {
        return;
    }
    const sprite = this._newLabelSprites[key];
    if (sprite) sprite.hide();
};

VisuMZ.ItemsEquipsCore.Window_Selectable_refresh = Window_Selectable.prototype.refresh;
Window_Selectable.prototype.refresh = function() {
    this.hideNewLabelSprites();
    VisuMZ.ItemsEquipsCore.Window_Selectable_refresh.call(this);
};

Window_Selectable.prototype.hideNewLabelSprites = function() {
    for (const sprite of Object.values(this._newLabelSprites)) {
        sprite.hide();
    }
};

VisuMZ.ItemsEquipsCore.Window_Selectable_update = Window_Selectable.prototype.update;
Window_Selectable.prototype.update = function() {
    this.updateNewLabelOpacity();
    VisuMZ.ItemsEquipsCore.Window_Selectable_update.call(this);
};

Window_Selectable.prototype.updateNewLabelOpacity = function() {
    if (!this.isShowNew()) return;
    const limit = this._newLabelOpacityUpperLimit;
    this._newLabelOpacity += this._newLabelOpacityChange;
    if (this._newLabelOpacity >= limit || this._newLabelOpacity <= 0) {
        this._newLabelOpacityChange *= -1;
    }
    this._newLabelOpacity = this._newLabelOpacity.clamp(0, limit);
    for (const sprite of Object.values(this._newLabelSprites)) {
        sprite.opacity = this._newLabelOpacity;
    }
};

Window_Selectable.prototype.createNewLabelSprite = function(key) {
    const container = this._newLabelSprites;
    if (container[key]) {
        return container[key];
    } else {
        const sprite = new Sprite_NewLabel();
        container[key] = sprite;
        this.addInnerChild(sprite);
        return sprite;
    }
};

Window_Selectable.prototype.placeNewLabel = function(item, x, y) {
    let key = '';
    if (DataManager.isItem(item)) {
        key = 'item-%1'.format(item.id);
    } else if (DataManager.isWeapon(item)) {
        key = 'weapon-%1'.format(item.id);
    } else if (DataManager.isArmor(item)) {
        key = 'armor-%1'.format(item.id);
    } else {
        return;
    }
    const sprite = this.createNewLabelSprite(key);
    sprite.move(x, y);
    sprite.show();
    sprite.opacity = this._newLabelOpacity;
};

//-----------------------------------------------------------------------------
// Window_ItemCategory
//
// The window for selecting a category of items on the item and shop screens.

Window_ItemCategory.categoryList = VisuMZ.ItemsEquipsCore.Settings.Categories.List;
Window_ItemCategory.categoryItemTypes = [
    'HiddenItemA','HiddenItemB',
    'Nonconsumable','Consumable',
    'AlwaysUsable','BattleUsable','FieldUsable','NeverUsable'
];

VisuMZ.ItemsEquipsCore.Window_ItemCategory_initialize = Window_ItemCategory.prototype.initialize;
Window_ItemCategory.prototype.initialize = function(rect) {
    VisuMZ.ItemsEquipsCore.Window_ItemCategory_initialize.call(this, rect);
    this.createCategoryNameWindow(rect);
};

Window_ItemCategory.prototype.createCategoryNameWindow = function(rect) {
    const subRect = new Rectangle(0, 0, rect.width, rect.height);
    this._categoryNameWindow = new Window_Base(subRect);
    this._categoryNameWindow.opacity = 0;
    this.addChild(this._categoryNameWindow);
    this.updateCategoryNameWindow();
};

Window_ItemCategory.prototype.isUseModernControls = function() {
    return Imported.VisuMZ_0_CoreEngine && Window_HorzCommand.prototype.isUseModernControls.call(this);
};

Window_ItemCategory.prototype.processCursorHomeEndTrigger = function() {
};

Window_ItemCategory.prototype.playOkSound = function() {
    if (!this.isUseModernControls()) Window_HorzCommand.prototype.playOkSound.call(this);
};

Window_ItemCategory.prototype.maxCols = function() {
    return this._list ? this.maxItems() : 4;
};

Window_ItemCategory.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
    if (this._itemWindow) {
        this._itemWindow.setCategory(this.currentExt());
    }
};

Window_ItemCategory.prototype.processCursorMoveModernControls = function() {
    if (this.isCursorMovable()) {
        const lastIndex = this.index();
        if (this._itemWindow && this._itemWindow.maxCols() <= 1) {
            if (Input.isRepeated("right")) {
                this.cursorRight(Input.isTriggered("right"));
            }
            if (Input.isRepeated("left")) {
                this.cursorLeft(Input.isTriggered("left"));
            }
        } else if (this._itemWindow && this._itemWindow.maxCols() > 1) {
            if (Input.isRepeated("pagedown") && !Input.isPressed("shift")) {
                this.cursorRight(Input.isTriggered("pagedown"));
            }
            if (Input.isRepeated("pageup") && !Input.isPressed("shift")) {
                this.cursorLeft(Input.isTriggered("pageup"));
            }
        }
        if (this.index() !== lastIndex) {
            this.playCursorSound();
        }
    }
};

Window_ItemCategory.prototype.processHandling = function() {
    if (this.isUseModernControls()) return;
    Window_HorzCommand.prototype.processHandling.call(this);
};

Window_ItemCategory.prototype.isHoverEnabled = function() {
    if (this.isUseModernControls()) {
        return false;
    } else {
        return Window_HorzCommand.prototype.isHoverEnabled.call(this);
    }
};

Window_ItemCategory.prototype.processTouchModernControls = function() {
    if (this.isOpenAndActive()) {
        if (TouchInput.isTriggered()) {
            this.onTouchSelect(true);
        }
        if (TouchInput.isClicked()) {
            this.onTouchOk();
        } else if (TouchInput.isCancelled()) {
            this.onTouchCancel();
        }
    }
};

Window_ItemCategory.prototype.onTouchSelect = function(trigger) {
    if (this.isUseModernControls()) {
        this.onTouchSelectModern(true);
    } else {
        Window_HorzCommand.prototype.onTouchSelect.call(this, trigger);
    }
};

Window_ItemCategory.prototype.onTouchSelectModern = function(trigger) {
    this._doubleTouch = false;
    if (this.isCursorMovable()) {
        const lastIndex = this.index();
        const hitIndex = this.hitIndex();
        if (hitIndex >= 0 && hitIndex !== this.index()) {
            this.select(hitIndex);
        }
        if (trigger && this.index() !== lastIndex) {
            this.playCursorSound();
        }
    }
};

Window_ItemCategory.prototype.makeCommandList = function() {
    this.addItemCategories();
    this.select(this.index());
};

Window_ItemCategory.prototype.addItemCategories = function() {
    for (const category of Window_ItemCategory.categoryList) {
        this.addItemCategory(category);
    }
};

Window_ItemCategory.prototype.addItemCategory = function(category) {
    // Declare Constants
    const type = category.Type;
    const icon = category.Icon;
    // v1.10 added by Arisu
    const switchID = category.SwitchID || 0;
    if (switchID > 0 && !$gameSwitches.value(switchID)) return;

    // Declare Variables
    let name = '';
    let symbol = 'category';
    let ext = type;

    // Check Category
    if (type.match(/Category:(.*)/i)) {
        name = String(RegExp.$1).trim();
    } else if (Window_ItemCategory.categoryItemTypes.includes(type)) {
        name = VisuMZ.ItemsEquipsCore.Settings.Categories[type];
    } else if (['AllItems','RegularItems'].includes(type)) {
        name = TextManager.item;
    } else if (type === 'KeyItems') {
        name = TextManager.keyItem;
    } else if (type === 'AllWeapons') {
        name = TextManager.weapon;
    } else if (type === 'AllArmors') {
        name = TextManager.armor;
    } else if (type.match(/WTYPE:(\d+)/i)) {
        name = $dataSystem.weaponTypes[Number(RegExp.$1)] || '';
    } else if (type.match(/ATYPE:(\d+)/i)) {
        name = $dataSystem.armorTypes[Number(RegExp.$1)] || '';
    } else if (type.match(/ETYPE:(\d+)/i)) {
        name = $dataSystem.equipTypes[Number(RegExp.$1)] || '';
    }

    // Adjust Name
    if (icon > 0 && this.categoryStyle() !== 'text') {
        name = '\\I[%1]%2'.format(icon, name);
    }

    // Add Command
    this.addCommand(name, symbol, true, ext);
};

Window_ItemCategory.prototype.itemTextAlign = function() {
    return VisuMZ.ItemsEquipsCore.Settings.Categories.TextAlign;
};

Window_ItemCategory.prototype.drawItem = function(index) {
    const style = this.categoryStyleCheck(index);
    if (style === 'iconText') {
        this.drawItemStyleIconText(index);
    } else if (style === 'icon') {
        this.drawItemStyleIcon(index);
    } else {
        Window_HorzCommand.prototype.drawItem.call(this, index);
    }
};

Window_ItemCategory.prototype.categoryStyle = function() {
    return VisuMZ.ItemsEquipsCore.Settings.Categories.Style;
};

Window_ItemCategory.prototype.categoryStyleCheck = function(index) {
    if (index < 0) return 'text';
    const style = this.categoryStyle();
    if (style !== 'auto') {
        return style;
    } else {
        const name = this.commandName(index);
        if (name.match(/\\I\[(\d+)\]/i)) {
            const rect = this.itemLineRect(index);
            const width = this.textSizeEx(name).width;
            if (width <= rect.width) {
                return 'iconText';
            } else {
                return 'icon';
            }
        } else {
            return 'text';
        }
    }
};

Window_ItemCategory.prototype.drawItemStyleIconText = function(index) {
    const rect = this.itemLineRect(index);
    const name = this.commandName(index);
    const width = this.textSizeEx(name).width;
    this.changePaintOpacity(this.isCommandEnabled(index));
    const align = this.itemTextAlign();
    if (align === 'right') {
        this.drawTextEx(name, rect.x + rect.width - width, rect.y, width);
    } else if (align === 'center') {
        const centerX = rect.x + Math.floor((rect.width - width) / 2);
        this.drawTextEx(name, centerX, rect.y, width);
    } else {
        this.drawTextEx(name, rect.x, rect.y, width);
    }
};

Window_ItemCategory.prototype.drawItemStyleIcon = function(index) {
    const text = this.commandName(index);
    if (text.match(/\\I\[(\d+)\]/i)) {
        const icon = Number(RegExp.$1) || 0;
        const rect = this.itemLineRect(index);
        const iconX = rect.x + Math.floor((rect.width - ImageManager.iconWidth) / 2);
        const iconY = rect.y + (rect.height - ImageManager.iconHeight) / 2;
        this.drawIcon(icon, iconX, iconY);
    }
};

VisuMZ.ItemsEquipsCore.Window_ItemCategory_setItemWindow = Window_ItemCategory.prototype.setItemWindow;
Window_ItemCategory.prototype.setItemWindow = function(itemWindow) {
    VisuMZ.ItemsEquipsCore.Window_ItemCategory_setItemWindow.call(this, itemWindow);
    itemWindow._categoryWindow = this;
};

Window_ItemCategory.prototype.callUpdateHelp = function() {
    Window_HorzCommand.prototype.callUpdateHelp.call(this);
    if (this._categoryNameWindow) this.updateCategoryNameWindow();
};

Window_ItemCategory.prototype.updateCategoryNameWindow = function() {
    const targetWindow = this._categoryNameWindow;
    targetWindow.contents.clear();
    const style = this.categoryStyleCheck(this.index());
    if (style === 'icon') {
        const rect = this.itemLineRect(this.index());
        let text = this.commandName(this.index());
        text = text.replace(/\\I\[(\d+)\]/gi, '');
        targetWindow.resetFontSettings();
        this.categoryNameWindowDrawBackground(text, rect);
        this.categoryNameWindowDrawText(text, rect);
        this.categoryNameWindowCenter(text, rect);
    }
};

Window_ItemCategory.prototype.categoryNameWindowDrawBackground = function(text, rect) {
};

Window_ItemCategory.prototype.categoryNameWindowDrawText = function(text, rect) {
    const targetWindow = this._categoryNameWindow;
    targetWindow.drawText(text, 0, rect.y, targetWindow.innerWidth, 'center');
};

Window_ItemCategory.prototype.categoryNameWindowCenter = function(text, rect) {
    const targetWindow = this._categoryNameWindow;
    const padding = $gameSystem.windowPadding();
    const centerX = rect.x + Math.floor(rect.width / 2) + padding;
    targetWindow.x = targetWindow.width / -2 + centerX;
    targetWindow.y = Math.floor(rect.height / 2);
};

//-----------------------------------------------------------------------------
// Window_ItemList
//
// The window for selecting an item on the item screen.

Window_ItemList.prototype.processCursorMoveModernControls = function() {
    if (this.isCursorMovable()) {
        const lastIndex = this.index();
        if (this.maxCols() <= 1) {
            if (!this.isHandled("pagedown") && Input.isTriggered("pagedown")) {
                this.cursorPagedown();
            }
            if (!this.isHandled("pageup") && Input.isTriggered("pageup")) {
                this.cursorPageup();
            }
        } else if (this.maxCols() > 1) {
            if (Input.isRepeated("right")) {
                this.cursorRight(Input.isTriggered("right"));
            }
            if (Input.isRepeated("left")) {
                this.cursorLeft(Input.isTriggered("left"));
            }
            if (this.limitedPageUpDownSceneCheck()) {
                if (Input.isTriggered("pagedown") && Input.isPressed("shift")) {
                    this.cursorPagedown();
                }
                if (Input.isTriggered("pageup") && Input.isPressed("shift")) {
                    this.cursorPageup();
                }
            } else {
                if (Input.isTriggered("pagedown")) {
                    this.cursorPagedown();
                }
                if (Input.isTriggered("pageup")) {
                    this.cursorPageup();
                }
            }
        }
        if (Input.isRepeated("down")) {
            if (Input.isPressed("shift") && this.allowShiftScrolling()) {
                this.cursorPagedown();
            } else {
                this.cursorDown(Input.isTriggered("down"));
            }
        }
        if (Input.isRepeated("up")) {
            if (Input.isPressed("shift") && this.allowShiftScrolling()) {
                this.cursorPageup();
            } else {
                this.cursorUp(Input.isTriggered("up"));
            }
        }
        if (Imported.VisuMZ_0_CoreEngine) {
            this.processCursorHomeEndTrigger();
        }
        if (this.index() !== lastIndex) {
            this.playCursorSound();
        }
    }
};

Window_ItemList.prototype.limitedPageUpDownSceneCheck = function() {
    const scene = SceneManager._scene;
    const checkedScenes = [
        Scene_Item,
        Scene_Shop
    ];
    return checkedScenes.includes(scene.constructor);
};

Window_ItemList.prototype.activate = function() {
    Window_Selectable.prototype.activate.call(this);
    if (this._categoryWindow && this._categoryWindow.isUseModernControls()) {
        this._categoryWindow.activate();
    }
};

Window_ItemList.prototype.deactivate = function() {
    Window_Selectable.prototype.deactivate.call(this);
    if (this._categoryWindow && this._categoryWindow.isUseModernControls()) {
        this._categoryWindow.deactivate();
    }
};

Window_ItemList.prototype.setCategory = function(category) {
    if (this._category !== category) {
        this._category = category;
        this.refresh();
        if (this._categoryWindow && this._categoryWindow.isUseModernControls()) {
            this.smoothSelect(0);
        } else {
            this.scrollTo(0, 0);
        }
    }
};

VisuMZ.ItemsEquipsCore.Window_ItemList_maxCols = Window_ItemList.prototype.maxCols;
Window_ItemList.prototype.maxCols = function() {
    if (SceneManager._scene.constructor === Scene_Battle) {
        return VisuMZ.ItemsEquipsCore.Window_ItemList_maxCols.call(this);
    } else if (SceneManager._scene.constructor === Scene_Map) {
        return VisuMZ.ItemsEquipsCore.Window_ItemList_maxCols.call(this);
    } else {
        return VisuMZ.ItemsEquipsCore.Settings.ItemScene.ListWindowCols;
    }
};

VisuMZ.ItemsEquipsCore.Window_ItemList_colSpacing = Window_ItemList.prototype.colSpacing;
Window_ItemList.prototype.colSpacing = function() {
    if (this.maxCols() <= 1) {
        return Window_Selectable.prototype.colSpacing.call(this);
    } else {
        return VisuMZ.ItemsEquipsCore.Window_ItemList_colSpacing.call(this);
    }
};

Window_ItemList.prototype.includes = function(item) {
    switch (this._category) {
        case 'AllItems':
            return DataManager.isItem(item);

        case 'RegularItems':
            return DataManager.isItem(item) && item.itypeId === 1;
        case 'KeyItems':
            return DataManager.isItem(item) && item.itypeId === 2;
        case 'HiddenItemA':
            return DataManager.isItem(item) && item.itypeId === 3;
        case 'HiddenItemB':
            return DataManager.isItem(item) && item.itypeId === 4;

        case 'Consumable':
            return DataManager.isItem(item) && item.consumable;
        case 'Nonconsumable':
            return DataManager.isItem(item) && !item.consumable;

        case 'AlwaysUsable':
            return DataManager.isItem(item) && [0].includes(item.occasion);
        case 'BattleUsable':
            return DataManager.isItem(item) && [0, 1].includes(item.occasion);
        case 'FieldUsable':
            return DataManager.isItem(item) && [0, 2].includes(item.occasion);
        case 'NeverUsable':
            return DataManager.isItem(item) && [3].includes(item.occasion);

        case 'AllWeapons':
            return DataManager.isWeapon(item);
        case 'AllArmors':
            return DataManager.isArmor(item);
        
        default:
            if (this._category.match(/WTYPE:(\d+)/i)) {
                return DataManager.isWeapon(item) && item.wtypeId === Number(RegExp.$1);
            } else if (this._category.match(/WTYPE:(.*)/i)) {
                const wtypeId = $dataSystem.weaponTypes.indexOf(String(RegExp.$1).trim());
                return DataManager.isWeapon(item) && item.wtypeId === wtypeId;
            } else if (this._category.match(/ATYPE:(\d+)/i)) {
                return DataManager.isArmor(item) && item.atypeId === Number(RegExp.$1);
            } else if (this._category.match(/ATYPE:(.*)/i)) {
                const atypeId = $dataSystem.armorTypes.indexOf(String(RegExp.$1).trim());
                return DataManager.isArmor(item) && item.atypeId === atypeId;
            } else if (this._category.match(/ETYPE:(\d+)/i)) {
                return !!item && item.etypeId === Number(RegExp.$1);
            } else if (this._category.match(/ETYPE:(.*)/i)) {
                const etypeId = $dataSystem.equipTypes.indexOf(String(RegExp.$1).trim());
                return DataManager.isArmor(item) && item.etypeId === etypeId;
            } else if (this._category.match(/Category:(.*)/i)) {
                return !!item && item.categories.includes(String(RegExp.$1).toUpperCase().trim());
            }
    }
    return false;
};

Window_ItemList.prototype.isShowNew = function() {
    return true;
};

VisuMZ.ItemsEquipsCore.Window_ItemList_drawItem = Window_ItemList.prototype.drawItem;
Window_ItemList.prototype.drawItem = function(index) {
    VisuMZ.ItemsEquipsCore.Window_ItemList_drawItem.call(this, index);
    this.placeItemNewLabel(index);
};

Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
    Window_Selectable.prototype.drawItemNumber.call(this, item, x, y, width);
};

Window_ItemList.prototype.placeItemNewLabel = function(index) {
    const item = this.itemAt(index);
    if (!item || !this.isShowNew()) return;
    if (!$gameParty.isNewItem(item)) return;
    const rect = this.itemLineRect(index);
    const iconX = rect.x;
    const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
    const offsetX = VisuMZ.ItemsEquipsCore.Settings.New.OffsetX;
    const offsetY = VisuMZ.ItemsEquipsCore.Settings.New.OffsetY;
    this.placeNewLabel(item, iconX + offsetX, iconY + offsetY);
};

Window_ItemList.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.callUpdateHelp();
};

VisuMZ.ItemsEquipsCore.Window_ItemList_updateHelp = Window_ItemList.prototype.updateHelp;
Window_ItemList.prototype.updateHelp = function() {
    VisuMZ.ItemsEquipsCore.Window_ItemList_updateHelp.call(this);
    if (this._statusWindow && this._statusWindow.constructor === Window_ShopStatus) {
        this._statusWindow.setItem(this.item());
    }
};

//-----------------------------------------------------------------------------
// Window_BattleItem
//
// The window for selecting an item to use on the battle screen.

Window_BattleItem.prototype.isEnabled = function(item) {
    if (BattleManager.actor()) {
        return BattleManager.actor().canUse(item);
    } else {
        return Window_ItemList.prototype.isEnabled.call(this, item);
    }
};

//-----------------------------------------------------------------------------
// Window_EventItem
//
// The window used for the event command [Select Item].

Window_EventItem.prototype.isShowNew = function() {
    return false;
};

//-----------------------------------------------------------------------------
// Window_EquipStatus
//
// The window for displaying parameter changes on the equipment screen.

Window_EquipStatus.prototype.isUseItemsEquipsCoreUpdatedLayout = function() {
    return VisuMZ.ItemsEquipsCore.Settings.EquipScene.EnableLayout;
};

VisuMZ.ItemsEquipsCore.Window_EquipStatus_refresh = Window_EquipStatus.prototype.refresh;
Window_EquipStatus.prototype.refresh = function() {
    this.hideAdditionalSprites();
    this.resetFontSettings();
    if (this._actor) this._actor.refresh();
    if (this.isUseItemsEquipsCoreUpdatedLayout()) {
        this.prepareRefreshItemsEquipsCoreLayout();
    } else {
        VisuMZ.ItemsEquipsCore.Window_EquipStatus_refresh.call(this);
    }
};

Window_EquipStatus.prototype.prepareRefreshItemsEquipsCoreLayout = function() {
    this.contents.clear();
    if (!this._actor) return;
    if (this.isMainMenuCoreMenuImageOptionAvailable()) {
        const bitmap = ImageManager.loadPicture(this._actor.getMenuImage());
        bitmap.addLoadListener(this.onMenuImageLoad.bind(this));
    } else {
        this.refreshItemsEquipsCoreNoMenuImage();
    }
};

Window_EquipStatus.prototype.isMainMenuCoreMenuImageOptionAvailable = function() {
    return Imported.VisuMZ_1_MainMenuCore && 
        this._actor.getMenuImage() !== '' &&
        VisuMZ.ItemsEquipsCore.Settings.EquipScene.MenuPortraits;
};

Window_EquipStatus.prototype.onMenuImageLoad = function() {
    VisuMZ.ItemsEquipsCore.Settings.EquipScene.DrawPortraitJS.call(this);
    /*
    // Declare Variables
    const lineHeight = this.lineHeight();
    const padding = this.itemPadding();
    const x1 = padding;
    const x2 = this.innerWidth - 128 - padding;

    // Draw Menu Image
    this.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);

    // Draw Data
    this.drawActorName(this._actor, x1, lineHeight * 0);
    this.drawActorClass(this._actor, x1, lineHeight * 1);
    this.drawActorIcons(this._actor, x1, lineHeight * 2);
    this.drawActorLevel(this._actor, x2, lineHeight * 0);
    this.placeBasicGauges(this._actor, x2, lineHeight * 1);
    */

    // Draw Parameter Data
    this.drawParamsItemsEquipsCore();
};

Window_EquipStatus.prototype.refreshItemsEquipsCoreNoMenuImage = function() {
    VisuMZ.ItemsEquipsCore.Settings.EquipScene.DrawFaceJS.call(this);
    /*
    // Declare Variables
    const lineHeight = this.lineHeight();
    const gaugeLineHeight = this.gaugeLineHeight();
    const x = Math.floor(this.innerWidth / 2);
    const limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);
    const actorX = Math.floor((x - ImageManager.faceWidth) / 2);
    const actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);
    let dataHeight = lineHeight * 3;
    dataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);
    const dataY = Math.floor((limitHeight - dataHeight) / 2);

    // Draw Data
    this.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);
    this.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);
    this.drawActorName(this._actor, x, dataY + lineHeight * 0);
    this.drawActorLevel(this._actor, x, dataY + lineHeight * 1);
    this.drawActorClass(this._actor, x, dataY + lineHeight * 2);
    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);
    */

    // Draw Parameter Data
    this.drawParamsItemsEquipsCore();
};

Window_EquipStatus.prototype.drawParamsItemsEquipsCore = function() {
    this.resetFontSettings();
    VisuMZ.ItemsEquipsCore.Settings.EquipScene.DrawParamJS.call(this);
    /*
    // Declare variables
    const params = this.actorParams();
    const lineHeight = this.lineHeight();
    const padding = this.itemPadding();
    const baseX = 0;
    const baseY = this.innerHeight - params.length * lineHeight;
    const baseWidth = this.innerWidth;
    const valueFontSize = this.paramValueFontSize();

    // Calculate Widths
    let paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));
    paramNameWidth += padding * 2;
    if (this.isUseParamNamesWithIcons()) {
        paramNameWidth += ImageManager.iconWidth + 4;
    }
    let arrowWidth = this.rightArrowWidth();
    const totalDivides = this.innerWidth >= 500 ? 3 : 2;
    let paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);
    paramNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;

    // Draw Parameters
    let x = baseX;
    let y = baseY;
    let value = 0;
    let diffValue = 0;
    let alter = 2;
    for (const paramId of params) {
        // Draw Param Name
        this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);
        this.drawUpdatedParamName(paramId, x, y, paramNameWidth);
        this.resetFontSettings();
        x += paramNameWidth;

        // Draw Param Before
        this.contents.fontSize = valueFontSize;
        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);
        this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);
        this.resetFontSettings();
        x += paramValueWidth;

        // Draw Arrow
        this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);
        this.drawRightArrow(x, y);
        x += arrowWidth;

        // Draw Param After
        this.contents.fontSize = valueFontSize;
        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);
        this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);
        x += paramValueWidth;

        // Draw Param Change
        if (totalDivides > 2) {
            this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);
            this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);
        }

        // Prepare Next Parameter
        x = baseX;
        y += lineHeight;
        alter = alter === 2 ? 1 : 2;
    }
    */
};

Window_EquipStatus.prototype.drawItemActorMenuImage = function(actor, x, y, width, height) {
    const bitmap = ImageManager.loadPicture(actor.getMenuImage());
    const difference = this.innerWidth - bitmap.width;
    x += difference / 2;
    if (difference < 0) width -= difference;

    Window_StatusBase.prototype.drawItemActorMenuImage.call(this, actor, x, y, width, height);
};

Window_EquipStatus.prototype.actorParams = function() {
    if (Imported.VisuMZ_0_CoreEngine) {
        return VisuMZ.CoreEngine.Settings.Param.ExtDisplayedParams;
    } else {
        return [0, 1, 2, 3, 4, 5, 6, 7];
    }
};

Window_EquipStatus.prototype.paramValueFontSize = function() {
    return VisuMZ.ItemsEquipsCore.Settings.EquipScene.ParamValueFontSize;
};

Window_EquipStatus.prototype.isUseParamNamesWithIcons = function() {
    return Imported.VisuMZ_0_CoreEngine && VisuMZ.CoreEngine.Settings.Param.DrawIcons;
};

Window_EquipStatus.prototype.drawUpdatedParamName = function(paramId, x, y, width) {
    const padding = this.itemPadding();
    if (Imported.VisuMZ_0_CoreEngine) {
        this.drawParamText(x + padding, y, width, paramId, false);
    } else {
        this.drawText(TextManager.param(paramId), x + padding, y, width);
    }
};

Window_EquipStatus.prototype.drawUpdatedBeforeParamValue = function(paramId, x, y, width) {
    const padding = this.itemPadding();
    let value = 0;
    if (Imported.VisuMZ_0_CoreEngine) {
        
        value = this._actor.paramValueByName(paramId, true);
    } else {
        value = this._actor.param(paramId);
    }
    const beforeValue = value;
    this.drawText(value, x, y, width - padding, 'right');
};

Window_EquipStatus.prototype.drawUpdatedAfterParamValue = function(paramId, x, y, width) {
    const padding = this.itemPadding();
    let value1 = 0;
    let value2 = 0;
    let valueText = '';
    if (this._tempActor) {
        if (Imported.VisuMZ_0_CoreEngine) {
            value1 = this._actor.paramValueByName(paramId, false);
            value2 = this._tempActor.paramValueByName(paramId, false);
            valueText = this._tempActor.paramValueByName(paramId, true);
        } else {
            value1 = this._actor.param(paramId);
            value2 = this._tempActor.param(paramId);
            valueText = this._tempActor.param(paramId);
        }
        const beforeValue = value1;
        const afterValue = value2;
        diffValue = afterValue - beforeValue;
        this.changeTextColor(ColorManager.paramchangeTextColor(diffValue));
        this.drawText(valueText, x, y, width - padding, 'right');
    }
};

Window_EquipStatus.prototype.drawUpdatedParamValueDiff = function(paramId, x, y, width) {
    const padding = this.itemPadding();
    let value1 = 0;
    let value2 = 0;
    // v1.07 fix made by Yanfly
    let float = false;
    if (this._tempActor) {
        if (Imported.VisuMZ_0_CoreEngine) {
            value1 = this._actor.paramValueByName(paramId, false);
            value2 = this._tempActor.paramValueByName(paramId, false);
            // v1.07 fix made by Yanfly
            float = String(this._actor.paramValueByName(paramId, true)).match(/([%％])/i);
        } else {
            value1 = this._actor.param(paramId);
            value2 = this._tempActor.param(paramId);
            // v1.07 fix made by Yanfly
            float = (value1 % 1 !== 0) || (value2 % 1 !== 0);
        }
        const beforeValue = value1;
        const afterValue = value2;
        const diffValue = afterValue - beforeValue;
        let diffText = diffValue

        // v1.07 fix made by Yanfly
        if (float) diffText = Math.round(diffValue * 100) + '%';

        if (diffValue !== 0) {
            this.changeTextColor(ColorManager.paramchangeTextColor(diffValue));
            diffText = (diffValue > 0 ? '(+%1)' : '(%1)').format(diffText);
            this.drawText(diffText, x + padding, y, width, 'left');
        }
    }
};

Window_EquipStatus.prototype.drawItemDarkRect = function(x, y, width, height, times) {
    if (VisuMZ.ItemsEquipsCore.Settings.EquipScene.DrawBackRect === false) return;
    times = Math.max(times || 1, 1);
    while (times--) {
        height = height || this.lineHeight();
        this.contents.paintOpacity = 160;
        const backColor = ColorManager.getItemsEquipsCoreBackColor2();
        this.contents.fillRect(x+1, y+1, width-2, height-2, backColor);
        this.contents.paintOpacity = 255;
    }
};

ColorManager.getItemsEquipsCoreBackColor2 = function() {
    const settings = VisuMZ.ItemsEquipsCore.Settings.EquipScene;
    let data = settings.BackRectColor !== undefined ? settings.BackRectColor : 19;
    return ColorManager.getColor(data);
};

//-----------------------------------------------------------------------------
// Window_EquipCommand
//
// The window for selecting a command on the equipment screen.

VisuMZ.ItemsEquipsCore.Window_EquipCommand_initialize = Window_EquipCommand.prototype.initialize;
Window_EquipCommand.prototype.initialize = function(rect) {
    VisuMZ.ItemsEquipsCore.Window_EquipCommand_initialize.call(this, rect);
    this.createCommandNameWindow(rect);
};

Window_EquipCommand.prototype.createCommandNameWindow = function(rect) {
    const subRect = new Rectangle(0, 0, rect.width, rect.height);
    this._commandNameWindow = new Window_Base(subRect);
    this._commandNameWindow.opacity = 0;
    this.addChild(this._commandNameWindow);
    this.updateCommandNameWindow();
};

Window_EquipCommand.prototype.callUpdateHelp = function() {
    Window_HorzCommand.prototype.callUpdateHelp.call(this);
    if (this._commandNameWindow) this.updateCommandNameWindow();
};

Window_EquipCommand.prototype.updateCommandNameWindow = function() {
    const targetWindow = this._commandNameWindow;
    targetWindow.contents.clear();
    const style = this.commandStyleCheck(this.index());
    if (style === 'icon') {
        const rect = this.itemLineRect(this.index());
        let text = this.commandName(this.index());
        text = text.replace(/\\I\[(\d+)\]/gi, '');
        targetWindow.resetFontSettings();
        this.commandNameWindowDrawBackground(text, rect);
        this.commandNameWindowDrawText(text, rect);
        this.commandNameWindowCenter(text, rect);
    }
};

Window_EquipCommand.prototype.commandNameWindowDrawBackground = function(text, rect) {
};

Window_EquipCommand.prototype.commandNameWindowDrawText = function(text, rect) {
    const targetWindow = this._commandNameWindow;
    targetWindow.drawText(text, 0, rect.y, targetWindow.innerWidth, 'center');
};

Window_EquipCommand.prototype.commandNameWindowCenter = function(text, rect) {
    const targetWindow = this._commandNameWindow;
    const padding = $gameSystem.windowPadding();
    const centerX = rect.x + Math.floor(rect.width / 2) + padding;
    targetWindow.x = targetWindow.width / -2 + centerX;
    targetWindow.y = Math.floor(rect.height / 2);
};

Window_EquipCommand.prototype.isUseModernControls = function() {
    return Imported.VisuMZ_0_CoreEngine && Window_HorzCommand.prototype.isUseModernControls.call(this);
};

Window_EquipCommand.prototype.playOkSound = function() {
    if (this.currentSymbol() === 'equip') Window_HorzCommand.prototype.playOkSound.call(this);
};

Window_EquipCommand.prototype.processCursorMoveModernControls = function() {
    if (!this.processCursorSpecialCheckModernControls()) {
        Window_HorzCommand.prototype.processCursorMoveModernControls.call(this);
    }
};

Window_EquipCommand.prototype.processCursorSpecialCheckModernControls = function() {
    if (!this.isCursorMovable()) return false;
    if (SceneManager._scene.constructor !== Scene_Equip) return false;
    if (Input.isTriggered('down')) {
        this.playCursorSound();
        SceneManager._scene.commandEquip();
        SceneManager._scene._slotWindow.smoothSelect(-1);
    }
    return false;
};

Window_EquipCommand.prototype.maxCols = function() {
    return this._list ? this._list.length : 3;
};

Window_EquipCommand.prototype.processTouchModernControls = function() {
    if (this.isOpen() && this.visible && SceneManager._scene.constructor === Scene_Equip) {
        if (this.isHoverEnabled() && TouchInput.isHovered()) {
            this.onTouchSelectModernControls(false);
        } else if (TouchInput.isTriggered()) {
            this.onTouchSelectModernControls(true);
        }
        if (TouchInput.isClicked()) {
            this.onTouchOk();
        }/* else if (TouchInput.isCancelled()) { // 1.27 fixed by Yanfly
            this.onTouchCancel();
        }*/
    }
};

Window_EquipCommand.prototype.onTouchSelectModernControls = function(trigger) {
    this._doubleTouch = false;
    const lastIndex = this.index();
    const hitIndex = this.hitIndex();
    const sw = SceneManager._scene._slotWindow;
    if (sw.isOpen() && sw.visible) {
        if (hitIndex >= 0) {
            if (hitIndex === this.index()) {
                this._doubleTouch = true;
            }
            this.activate();
            this.select(hitIndex);
        } else if (sw.hitIndex() >= 0) {
            this.deactivate();
            this.deselect();
        }
    }
    if (trigger && this.index() !== lastIndex) {
        this.playCursorSound();
    }
};

Window_EquipCommand.prototype.makeCommandList = function() {
    this.addEquipCommand();
    this.addOptimizeCommand();
    this.addClearCommand();
};

Window_EquipCommand.prototype.refresh = function() {
    Window_HorzCommand.prototype.refresh.call(this);
    this.refreshCursor();
};

Window_EquipCommand.prototype.addEquipCommand = function() {
    if (!this.isEquipCommandAdded()) return;
    const style = this.commandStyle();
    const icon = VisuMZ.ItemsEquipsCore.Settings.EquipScene.CmdIconEquip;
    const text = style === 'text' ? TextManager.equip2 : '\\I[%1]%2'.format(icon, TextManager.equip2);
    const enabled = this.isEquipCommandEnabled();
    this.addCommand(text, 'equip', enabled);
};

Window_EquipCommand.prototype.isEquipCommandAdded = function() {
    return !this.isUseModernControls();
};

Window_EquipCommand.prototype.isEquipCommandEnabled = function() {
    return true;
};

Window_EquipCommand.prototype.addOptimizeCommand = function() {
    if (!this.isOptimizeCommandAdded()) return;
    const style = this.commandStyle();
    const icon = VisuMZ.ItemsEquipsCore.Settings.EquipScene.CmdIconOptimize;
    const text = style === 'text' ? TextManager.optimize : '\\I[%1]%2'.format(icon, TextManager.optimize);
    const enabled = this.isOptimizeCommandEnabled();
    this.addCommand(text, 'optimize', enabled);
};

Window_EquipCommand.prototype.isOptimizeCommandAdded = function() {
    return VisuMZ.ItemsEquipsCore.Settings.EquipScene.CommandAddOptimize;
};

Window_EquipCommand.prototype.isOptimizeCommandEnabled = function() {
    return true;
};

Window_EquipCommand.prototype.addClearCommand = function() {
    if (!this.isClearCommandAdded()) return;
    const style = this.commandStyle();
    const icon = VisuMZ.ItemsEquipsCore.Settings.EquipScene.CmdIconClear;
    const text = style === 'text' ? TextManager.clear : '\\I[%1]%2'.format(icon, TextManager.clear);
    const enabled = this.isClearCommandEnabled();
    this.addCommand(text, 'clear', enabled);
};

Window_EquipCommand.prototype.isClearCommandAdded = function() {
    return VisuMZ.ItemsEquipsCore.Settings.EquipScene.CommandAddClear;
};

Window_EquipCommand.prototype.isClearCommandEnabled = function() {
    return true;
};

Window_EquipCommand.prototype.itemTextAlign = function() {
    return VisuMZ.ItemsEquipsCore.Settings.EquipScene.CmdTextAlign;
};

Window_EquipCommand.prototype.drawItem = function(index) {
    const style = this.commandStyleCheck(index);
    if (style === 'iconText') {
        this.drawItemStyleIconText(index);
    } else if (style === 'icon') {
        this.drawItemStyleIcon(index);
    } else {
        Window_HorzCommand.prototype.drawItem.call(this, index);
    }
};

Window_EquipCommand.prototype.commandStyle = function() {
    return VisuMZ.ItemsEquipsCore.Settings.EquipScene.CmdStyle;
};

Window_EquipCommand.prototype.commandStyleCheck = function(index) {
    if (index < 0) return 'text';
    const style = this.commandStyle();
    if (style !== 'auto') {
        return style;
    } else if (this.maxItems() > 0) {
        const name = this.commandName(index);
        if (name.match(/\\I\[(\d+)\]/i)) {
            const rect = this.itemLineRect(index);
            const width = this.textSizeEx(name).width;
            if (width <= rect.width) {
                return 'iconText';
            } else {
                return 'icon';
            }
        }
    }
    return 'text';
};

Window_EquipCommand.prototype.drawItemStyleIconText = function(index) {
    const rect = this.itemLineRect(index);
    const name = this.commandName(index);
    const width = this.textSizeEx(name).width;
    this.changePaintOpacity(this.isCommandEnabled(index));
    const align = this.itemTextAlign();
    if (align === 'right') {
        this.drawTextEx(name, rect.x + rect.width - width, rect.y, width);
    } else if (align === 'center') {
        const centerX = rect.x + Math.floor((rect.width - width) / 2);
        this.drawTextEx(name, centerX, rect.y, width);
    } else {
        this.drawTextEx(name, rect.x, rect.y, width);
    }
};

Window_EquipCommand.prototype.drawItemStyleIcon = function(index) {
    this.commandName(index).match(/\\I\[(\d+)\]/i)
    const icon = Number(RegExp.$1) || 0;
    const rect = this.itemLineRect(index);
    const iconX = rect.x + Math.floor((rect.width - ImageManager.iconWidth) / 2);
    const iconY = rect.y + (rect.height - ImageManager.iconHeight) / 2;
    this.drawIcon(icon, iconX, iconY);
};

// v1.41 added by Arisu
Window_EquipCommand.prototype.actor = function() {
    const scene = SceneManager._scene;
    if (scene && scene.user) {
        return scene.user();
    }
    return null;
};

// v1.41 added by Arisu
Window_EquipCommand.prototype.updateHelp = function() {
    Window_Command.prototype.updateHelp.call(this);
    this._helpWindow.setText(this.helpDescriptionText());
};

// v1.41 added by Arisu
Window_EquipCommand.prototype.helpDescriptionText = function() {
    const symbol = this.currentSymbol();
    switch (symbol) {
        case 'equip':
            return TextManager.ITEMS_EQUIPS_CORE.helpDesc.equip;
        case 'optimize':
            return TextManager.ITEMS_EQUIPS_CORE.helpDesc.optimize;
        case 'clear':
            return TextManager.ITEMS_EQUIPS_CORE.helpDesc.clear;
        default:
            return '';
    }
};

//-----------------------------------------------------------------------------
// Window_EquipSlot
//
// The window for selecting an equipment slot on the equipment screen.

Window_EquipSlot.prototype.isUseModernControls = function() {
    return Imported.VisuMZ_0_CoreEngine && Window_HorzCommand.prototype.isUseModernControls.call(this);
};

Window_EquipSlot.prototype.activate = function() {
    Window_StatusBase.prototype.activate.call(this);
    this.callUpdateHelp();
};

Window_EquipSlot.prototype.processCursorMove = function() {
    Window_StatusBase.prototype.processCursorMove.call(this);
    this.checkShiftRemoveShortcut();
};

Window_EquipSlot.prototype.checkShiftRemoveShortcut = function() {
    if (!this.isShiftRemoveShortcutEnabled()) return;
    if (Input.isTriggered('shift') && this.item()) {
        const actor = SceneManager._scene._actor;
        if (actor) {
            if (this.canShiftRemoveEquipment(this.index())) {
                this.processShiftRemoveShortcut();
                this.updateHelp();
            } else {
                this.playBuzzerSound();
            }
        }
    }
};

Window_EquipSlot.prototype.canShiftRemoveEquipment = function(index) {
    // v1.04 bug fixed made by Arisu
    // Actor wasn't defined
    const actor = SceneManager._scene._actor;
    if (!actor) return;

    // Equip Change Ok
    if (!actor.isEquipChangeOk(this.index())) {
        return false;
    }

    // Non Removable Types
    const etypeId = actor.equipSlots()[this.index()];
    if (actor.nonRemovableEtypes().includes(etypeId)) {
        return false;
    }

    // Return True
    return true;;
};

Window_EquipSlot.prototype.processShiftRemoveShortcut = function() {
    SoundManager.playEquip();
    const actor = SceneManager._scene._actor;
    actor.changeEquip(this.index(), null);
    this.refresh();
    this._itemWindow.refresh();
    
    // v1.18 added by Olivia
    this.callUpdateHelp();
    const statusWindow = SceneManager._scene._statusWindow;
    if (statusWindow) statusWindow.refresh();
};

Window_EquipSlot.prototype.isShiftRemoveShortcutEnabled = function() {
    if (!this.active) return false;
    if (!VisuMZ.ItemsEquipsCore.Settings.EquipScene.ShiftShortcutKey) return false;
    return true;
};

Window_EquipSlot.prototype.processCursorMoveModernControls = function() {
    if (!this.processCursorSpecialCheckModernControls()) {
        Window_StatusBase.prototype.processCursorMoveModernControls.call(this);
    }
};

Window_EquipSlot.prototype.processCursorSpecialCheckModernControls = function() {
    if (!this.isCursorMovable()) return false;
    if (SceneManager._scene.constructor !== Scene_Equip) return false;
    if (this.allowCommandWindowCursorUp()) {
        this.playCursorSound();
        Input.clear();
        SceneManager._scene.onSlotCancel();
        return false;
    } else if (Input.isRepeated('down')) {
        const lastIndex = this.index();
        if (Input.isPressed("shift")) {
            this.cursorPagedown();
        } else {
            this.cursorDown(Input.isTriggered('down'));
        }
        if (this.index() !== lastIndex) {
            this.playCursorSound();
        }
        return true;
    } else if (this.isShiftShortcutKeyForRemove() && Input.isTriggered('shift')) {
        return true;
    }
    return false;
};

Window_EquipSlot.prototype.allowCommandWindowCursorUp = function() {
    if (this.index() !== 0) return false;
    const settings = VisuMZ.ItemsEquipsCore.Settings.EquipScene;
    if (!settings.CommandAddOptimize && !settings.CommandAddClear) return false;
    return Input.isTriggered('up');
};

Window_EquipSlot.prototype.isShiftShortcutKeyForRemove = function() {
    return VisuMZ.ItemsEquipsCore.Settings.EquipScene.ShiftShortcutKey;
};

Window_EquipSlot.prototype.processTouchModernControls = function() {
    if (this.isOpen() && this.visible && SceneManager._scene.constructor === Scene_Equip) {
        if (this.isHoverEnabled() && TouchInput.isHovered()) {
            this.onTouchSelectModernControls(false);
        } else if (TouchInput.isTriggered()) {
            this.onTouchSelectModernControls(true);
        }
        if (TouchInput.isClicked()) {
            this.onTouchOk();
        } else if (TouchInput.isCancelled()) {
            this.onTouchCancel();
        }
    }
};

Window_EquipSlot.prototype.onTouchSelectModernControls = function(trigger) {
    this._doubleTouch = false;
    const lastIndex = this.index();
    const hitIndex = this.hitIndex();
    const cw = SceneManager._scene._commandWindow;
    if (cw.isOpen() && cw.visible) {
        if (hitIndex >= 0) {
            if (hitIndex === this.index()) {
                this._doubleTouch = true;
            }
            this.activate();
            this.select(hitIndex);
        } else if (cw.hitIndex() >= 0) {
            this.deactivate();
            this.deselect();
        }
    }
    if (trigger && this.index() !== lastIndex) {
        this.playCursorSound();
    }
};

// v1.19 added by Irina
Window_EquipSlot.prototype.equipSlotIndex = function() {
    return this.index();
};

//-----------------------------------------------------------------------------
// Window_EquipItem
//
// The window for selecting an equipment item on the equipment screen.

VisuMZ.ItemsEquipsCore.Window_EquipItem_includes = Window_EquipItem.prototype.includes;
Window_EquipItem.prototype.includes = function(item) {
    if (item === null && this.nonRemovableEtypes().includes(this.etypeId())) {
        //return this._data.length > 0 ? false : true; // v1.24 updated by Olivia
        return false;
    } else {
        $gameTemp._checkEquipRequirements = true; // v1.44 added by Arisu
        let value = VisuMZ.ItemsEquipsCore.Window_EquipItem_includes.call(this, item);
        $gameTemp._checkEquipRequirements = undefined; // v1.44 added by Arisu
        return value;
    }
};

VisuMZ.ItemsEquipsCore.Window_EquipItem_isEnabled = Window_EquipItem.prototype.isEnabled;
Window_EquipItem.prototype.isEnabled = function(item) {
    // Original
    if (item && this._actor) {
        //if (this.nonRemovableEtypes().includes(this.etypeId())) return false;
        // v1.19 added by Irina
        if (this.itemHasEquipLimit(item)) return false;
        if (this.isSoleWeaponType(item)) return false;
        if (this.isSoleArmorType(item)) return false;
        if (!this._actor.canEquip(item)) return false; // v1.44 added by Arisu
    }
    // v1.24 added by Olivia
    if (!item) {
        return !this.nonRemovableEtypes().includes(this.etypeId());
    }
    // Default
    return VisuMZ.ItemsEquipsCore.Window_EquipItem_isEnabled.call(this, item);
};

// v1.19 added by Irina
Window_EquipItem.prototype.itemHasEquipLimit = function(item) {
    const note = item.note;

    if (note.match(/<EQUIP COPY LIMIT:[ ](\d+)>/i)) {
        const limit = Number(RegExp.$1) || 1;
        let count = 0;

        const equips = this._actor.equips();
        const index = SceneManager._scene._slotWindow.equipSlotIndex();
        equips[index] = null;

        for (const equip of equips) {
            if (!equip) continue;
            if (DataManager.isWeapon(item) === DataManager.isWeapon(equip)) {
                if (item.id === equip.id) count += 1;
            }
        }
        return count >= limit;
    } else {
        return false;
    }
};

// v1.19 added by Irina
Window_EquipItem.prototype.isSoleWeaponType = function(item) {
    if (!DataManager.isWeapon(item)) return false;

    const notetag = /<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;
    let count = 0;

    const equips = this._actor.equips();
    const index = SceneManager._scene._slotWindow.equipSlotIndex();
    equips[index] = null;

    for (const equip of equips) {
        if (!equip) continue;
        if (!DataManager.isWeapon(equip)) continue;
        if (item.wtypeId === equip.wtypeId) {
            count += 1;
            if (item.note.match(notetag)) {
                const limit = Number(RegExp.$1) || 1;
                if (count >= limit) return true;
            }
            if (equip.note.match(notetag)) {
                const limit = Number(RegExp.$1) || 1;
                if (count >= limit) return true;
            }
        }
    }

    return false;
};

// v1.19 added by Irina
Window_EquipItem.prototype.isSoleArmorType = function(item) {
    if (!DataManager.isArmor(item)) return false;

    const notetag = /<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;
    let count = 0;

    const equips = this._actor.equips();
    const index = SceneManager._scene._slotWindow.equipSlotIndex();
    equips[index] = null;

    for (const equip of equips) {
        if (!equip) continue;
        if (!DataManager.isArmor(equip)) continue;
        if (item.atypeId === equip.atypeId) {
            count += 1;
            if (item.note.match(notetag)) {
                const limit = Number(RegExp.$1) || 1;
                if (count >= limit) return true;
            }
            if (equip.note.match(notetag)) {
                const limit = Number(RegExp.$1) || 1;
                if (count >= limit) return true;
            }
        }
    }

    return false;
};

Window_EquipItem.prototype.nonRemovableEtypes = function() {
    return VisuMZ.ItemsEquipsCore.Settings.EquipScene.NonRemoveETypes;
};

Window_EquipItem.prototype.drawItem = function(index) {
    const item = this.itemAt(index);
    if (item) {
        Window_ItemList.prototype.drawItem.call(this, index);
    } else {
        this.drawRemoveItem(index);
    }
};

Window_EquipItem.prototype.drawRemoveItem = function(index) {
    this.changePaintOpacity(this.isEnabled(null));
    const settings = VisuMZ.ItemsEquipsCore.Settings.EquipScene;
    const rect = this.itemLineRect(index);
    const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
    const textMargin = ImageManager.iconWidth + 4;
    const itemWidth = Math.max(0, rect.width - textMargin);
    this.resetTextColor();
    this.drawIcon(settings.RemoveEquipIcon, rect.x, iconY);
    this.drawText(settings.RemoveEquipText, rect.x + textMargin, rect.y, itemWidth);
    this.changePaintOpacity(true);
};

Window_EquipItem.prototype.updateHelp = function() {
    Window_ItemList.prototype.updateHelp.call(this);
    if (this._actor && this._statusWindow && this._slotId >= 0) {
        const actor = JsonEx.makeDeepCopy(this._actor);
        actor._tempActor = true;
        actor.forceChangeEquip(this._slotId, this.item());
        this._statusWindow.setTempActor(actor);
    }
};

//-----------------------------------------------------------------------------
// Window_ShopCommand
//
// The window for selecting buy/sell on the shop screen.

VisuMZ.ItemsEquipsCore.Window_ShopCommand_initialize = Window_ShopCommand.prototype.initialize;
Window_ShopCommand.prototype.initialize = function(rect) {
    VisuMZ.ItemsEquipsCore.Window_ShopCommand_initialize.call(this, rect);
    this.createCommandNameWindow(rect);
};

Window_ShopCommand.prototype.createCommandNameWindow = function(rect) {
    const subRect = new Rectangle(0, 0, rect.width, rect.height);
    this._commandNameWindow = new Window_Base(subRect);
    this._commandNameWindow.opacity = 0;
    this.addChild(this._commandNameWindow);
    this.updateCommandNameWindow();
};

Window_ShopCommand.prototype.callUpdateHelp = function() {
    Window_HorzCommand.prototype.callUpdateHelp.call(this);
    if (this._commandNameWindow) this.updateCommandNameWindow();
};

Window_ShopCommand.prototype.updateCommandNameWindow = function() {
    const targetWindow = this._commandNameWindow;
    targetWindow.contents.clear();
    const style = this.commandStyleCheck(this.index());
    if (style === 'icon') {
        const rect = this.itemLineRect(this.index());
        let text = this.commandName(this.index());
        text = text.replace(/\\I\[(\d+)\]/gi, '');
        targetWindow.resetFontSettings();
        this.commandNameWindowDrawBackground(text, rect);
        this.commandNameWindowDrawText(text, rect);
        this.commandNameWindowCenter(text, rect);
    }
};

Window_ShopCommand.prototype.commandNameWindowDrawBackground = function(text, rect) {
};

Window_ShopCommand.prototype.commandNameWindowDrawText = function(text, rect) {
    const targetWindow = this._commandNameWindow;
    targetWindow.drawText(text, 0, rect.y, targetWindow.innerWidth, 'center');
};

Window_ShopCommand.prototype.commandNameWindowCenter = function(text, rect) {
    const targetWindow = this._commandNameWindow;
    const padding = $gameSystem.windowPadding();
    const centerX = rect.x + Math.floor(rect.width / 2) + padding;
    targetWindow.x = targetWindow.width / -2 + centerX;
    targetWindow.y = Math.floor(rect.height / 2);
};

Window_ShopCommand.prototype.maxCols = function() {
    return this._list ? this._list.length : 3;
};

Window_ShopCommand.prototype.hideDisabledCommands = function() {
    return VisuMZ.ItemsEquipsCore.Settings.ShopScene.CmdHideDisabled;
};

Window_ShopCommand.prototype.makeCommandList = function() {
    this.addBuyCommand();
    this.addSellCommand();
    this.addCancelCommand();
};

Window_ShopCommand.prototype.refresh = function() {
    Window_HorzCommand.prototype.refresh.call(this);
    this.refreshCursor();
};

Window_ShopCommand.prototype.addBuyCommand = function() {
    const style = this.commandStyle();
    const icon = VisuMZ.ItemsEquipsCore.Settings.ShopScene.CmdIconBuy;
    const text = style === 'text' ? TextManager.buy : '\\I[%1]%2'.format(icon, TextManager.buy);
    const enabled = this.isBuyCommandEnabled();
    if (this.hideDisabledCommands() && !enabled) return;
    this.addCommand(text, 'buy', enabled);
};

Window_ShopCommand.prototype.isBuyCommandEnabled = function() {
    if (SceneManager._scene.constructor === Scene_Shop) {
        return SceneManager._scene._goodsCount > 0;
    } else {
        return true;
    }
};

Window_ShopCommand.prototype.addSellCommand = function() {
    const style = this.commandStyle();
    const icon = VisuMZ.ItemsEquipsCore.Settings.ShopScene.CmdIconSell;
    const text = style === 'text' ? TextManager.sell : '\\I[%1]%2'.format(icon, TextManager.sell);
    const enabled = this.isSellCommandEnabled();
    if (this.hideDisabledCommands() && !enabled) return;
    this.addCommand(text, 'sell', enabled);
};

Window_ShopCommand.prototype.isSellCommandEnabled = function() {
    return !this._purchaseOnly;
};

Window_ShopCommand.prototype.addCancelCommand = function() {
    const style = this.commandStyle();
    const icon = VisuMZ.ItemsEquipsCore.Settings.ShopScene.CmdIconCancel;
    const name = VisuMZ.ItemsEquipsCore.Settings.ShopScene.CmdCancelRename;
    const text = style === 'text' ? name : '\\I[%1]%2'.format(icon, name);
    this.addCommand(text, 'cancel');
};

Window_ShopCommand.prototype.itemTextAlign = function() {
    return VisuMZ.ItemsEquipsCore.Settings.ShopScene.CmdTextAlign;
};

Window_ShopCommand.prototype.drawItem = function(index) {
    const style = this.commandStyleCheck(index);
    if (style === 'iconText') {
        this.drawItemStyleIconText(index);
    } else if (style === 'icon') {
        this.drawItemStyleIcon(index);
    } else {
        Window_HorzCommand.prototype.drawItem.call(this, index);
    }
};

Window_ShopCommand.prototype.commandStyle = function() {
    return VisuMZ.ItemsEquipsCore.Settings.ShopScene.CmdStyle;
};

Window_ShopCommand.prototype.commandStyleCheck = function(index) {
    if (index < 0) return 'text';
    const style = this.commandStyle();
    if (style !== 'auto') {
        return style;
    } else if (this.maxItems() > 0) {
        const name = this.commandName(index);
        if (name.match(/\\I\[(\d+)\]/i)) {
            const rect = this.itemLineRect(index);
            const width = this.textSizeEx(name).width;
            if (width <= rect.width) {
                return 'iconText';
            } else {
                return 'icon';
            }
        }
    }
    return 'text';
};

Window_ShopCommand.prototype.drawItemStyleIconText = function(index) {
    const rect = this.itemLineRect(index);
    const name = this.commandName(index);
    const width = this.textSizeEx(name).width;
    this.changePaintOpacity(this.isCommandEnabled(index));
    const align = this.itemTextAlign();
    if (align === 'right') {
        this.drawTextEx(name, rect.x + rect.width - width, rect.y, width);
    } else if (align === 'center') {
        const centerX = rect.x + Math.floor((rect.width - width) / 2);
        this.drawTextEx(name, centerX, rect.y, width);
    } else {
        this.drawTextEx(name, rect.x, rect.y, width);
    }
};

Window_ShopCommand.prototype.drawItemStyleIcon = function(index) {
    this.commandName(index).match(/\\I\[(\d+)\]/i)
    const icon = Number(RegExp.$1) || 0;
    const rect = this.itemLineRect(index);
    const iconX = rect.x + Math.floor((rect.width - ImageManager.iconWidth) / 2);
    const iconY = rect.y + (rect.height - ImageManager.iconHeight) / 2;
    this.drawIcon(icon, iconX, iconY);
};

//-----------------------------------------------------------------------------
// Window_ShopBuy
//
// The window for selecting an item to buy on the shop screen.

//-----------------------------------------------------------------------------
// Price
//-----------------------------------------------------------------------------

VisuMZ.ItemsEquipsCore.Window_ShopBuy_refresh = Window_ShopBuy.prototype.refresh;
Window_ShopBuy.prototype.refresh = function() {
    this.updateMoneyAmount();
    VisuMZ.ItemsEquipsCore.Window_ShopBuy_refresh.call(this);
};

Window_ShopBuy.prototype.updateMoneyAmount = function() {
    if (SceneManager._scene.constructor === Scene_Shop) {
        this._money = SceneManager._scene.money();
    }
};

VisuMZ.ItemsEquipsCore.Window_ShopBuy_price = Window_ShopBuy.prototype.price;
Window_ShopBuy.prototype.price = function(item) {
    if (!item) return 0;
    let price = VisuMZ.ItemsEquipsCore.Window_ShopBuy_price.call(this, item);
    return Math.max(0, this.modifiedBuyPriceItemsEquipsCore(item, price));
};

Window_ShopBuy.prototype.modifiedBuyPriceItemsEquipsCore = function(item, price) {
    const note = item.note;
    // <JS Buy Price>
    if (note.match(/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)) {
        const code = String(RegExp.$1);
        try {
            eval(code);
        } catch (e) {
            if ($gameTemp.isPlaytest()) console.log(e);
        }
    }
    // Run JS: Buy Price Plugin Parameter
    price = VisuMZ.ItemsEquipsCore.Settings.ShopScene.BuyPriceJS.call(this, item, price);
    // Finalize
    if (isNaN(price)) price = 0;
    return Math.floor(price);
};

//-----------------------------------------------------------------------------
// Listing
//-----------------------------------------------------------------------------

// v1.47 added by Arisu
VisuMZ.ItemsEquipsCore.Window_ShopBuy_goodsToItem = Window_ShopBuy.prototype.goodsToItem;
Window_ShopBuy.prototype.goodsToItem = function(goods) {
    const obj = VisuMZ.ItemsEquipsCore.Window_ShopBuy_goodsToItem.call(this, goods);
    if (obj && !this.meetsShopListingConditions(obj)) {
        return null;
    } else {
        return obj;
    }
};

// v1.47 added by Arisu
VisuMZ.ItemsEquipsCore.ShopListingRegExp = {
    ShowAllSwitches: /<SHOW SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i, // v1.47 updated by Arisu
    ShowAnySwitches: /<SHOW SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,
    HideAllSwitches: /<HIDE SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i, // v1.47 updated by Arisu
    HideAnySwitches: /<HIDE SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,

    BuyTurnSwitchOn: /<BUY TURN ON SWITCH(?:|ES):[ ](.*)>/i,
    BuyTurnSwitchOff: /<BUY TURN OFF SWITCH(?:|ES):[ ](.*)>/i,
    SellTurnSwitchOn: /<SELL TURN ON SWITCH(?:|ES):[ ](.*)>/i,
    SellTurnSwitchOff: /<SELL TURN OFF SWITCH(?:|ES):[ ](.*)>/i,
};

// v1.47 added by Arisu
Window_ShopBuy.prototype.meetsShopListingConditions = function(obj) {
    // Return Check
    if (!obj) return false;

    // Declare Constants
    const regexp = VisuMZ.ItemsEquipsCore.ShopListingRegExp;
    const note = obj ? (obj.note || '') : '';

    // Check Notetags
    // <Show All Switches: x, x, x>
    if (note.match(regexp.ShowAllSwitches)) {
        const switchIDs = String(RegExp.$1).split(',').map(i => Number(i));
        if (switchIDs.some(id => !$gameSwitches.value(id))) return false;
    }
    // <Show Any Switches: x, x, x>
    if (note.match(regexp.ShowAnySwitches)) {
        const switchIDs = String(RegExp.$1).split(',').map(i => Number(i));
        if (switchIDs.every(id => !$gameSwitches.value(id))) return false;
    }
    // <Hide All Switches: x, x, x>
    if (note.match(regexp.HideAllSwitches)) {
        const switchIDs = String(RegExp.$1).split(',').map(i => Number(i));
        if (switchIDs.every(id => $gameSwitches.value(id))) return false;
    }
    // <Hide Any Switches: x, x, x>
    if (note.match(regexp.HideAnySwitches)) {
        const switchIDs = String(RegExp.$1).split(',').map(i => Number(i));
        if (switchIDs.some(id => $gameSwitches.value(id))) return false;
    }

    return true;
};

//-----------------------------------------------------------------------------
// Draw
//-----------------------------------------------------------------------------

Window_ShopBuy.prototype.drawItem = function(index) {
    this.resetFontSettings();
    const item = this.itemAt(index);
    const rect = this.itemLineRect(index);
    const nameWidth = rect.width;
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, nameWidth);
    // v1.11 added by Arisu
    this.drawItemCost(item, rect);
    // Disabled
    //this.drawText(price, priceX, rect.y, priceWidth, "right");
    //this.changeTextColor(ColorManager.systemColor());
    //this.drawText(unit, rect.x, rect.y, rect.width, "right");
    this.changePaintOpacity(true);
};

Window_ShopBuy.prototype.drawItemCost = function(item, rect) {
    const price = this.price(item);
    this.drawCurrencyValue(price, TextManager.currencyUnit, rect.x, rect.y, rect.width);
};

//-----------------------------------------------------------------------------
// Window_ShopSell
//
// The window for selecting an item to sell on the shop screen.

Window_ShopSell.prototype.maxCols = function() {
    return SceneManager._scene.isUseItemsEquipsCoreUpdatedLayout() ? 1 : 2;
};

VisuMZ.ItemsEquipsCore.Window_ShopSell_isEnabled = Window_ShopSell.prototype.isEnabled;
Window_ShopSell.prototype.isEnabled = function(item) {
    if (!item) return false;

    // Check Notetags
    const note = item.note;
    if (note.match(/<CANNOT SELL>/i)) return false;
    if (note.match(/<CAN SELL>/i)) return true;

    if (note.match(/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        const switches = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        for (const switchId of switches) {
            if (!$gameSwitches.value(switchId)) return false;
        }
    }
    if (note.match(/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        const switches = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        for (const switchId of switches) {
            if (!$gameSwitches.value(switchId)) return false;
        }
    }
    if (note.match(/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        const switches = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        for (const switchId of switches) {
            if ($gameSwitches.value(switchId)) return false;
        }
    }

    // Return Default
    return VisuMZ.ItemsEquipsCore.Window_ShopSell_isEnabled.call(this, item);

    /*
    if (!item) {
        return false;
    } else if (item.note.match(/<CANNOT SELL>/i)) {
        return false;
    } else if (item.note.match(/<CAN SELL>/i)) {
        return true;
    } else {
        return VisuMZ.ItemsEquipsCore.Window_ShopSell_isEnabled.call(this, item);
    }
    */
};

//-----------------------------------------------------------------------------
// Window_ShopStatus
//
// The window for displaying number of items in possession and the actor's
// equipment on the shop screen.

// 1.47 added by Arisu
Window_ShopStatus.EQUIP_DELAY_MS = VisuMZ.ItemsEquipsCore.Settings.StatusWindow.EquipDelayMS ?? 240;

// v1.37 added by Arisu
VisuMZ.ItemsEquipsCore.Window_ShopStatus_setItem = Window_ShopStatus.prototype.setItem;
Window_ShopStatus.prototype.setItem = function(item) {
    item = DataManager.getProxyItem(item);
    // v1.47 added by Arisu
    if (DataManager.isWeapon(item) || DataManager.isArmor(item)) {
        this.setItemDelay(item);
    // Original
    } else {
        VisuMZ.ItemsEquipsCore.Window_ShopStatus_setItem.call(this, item);
    }
};

// v1.47 added by Arisu
Window_ShopStatus.prototype.setItemDelay = function(item) {
    this._item = item;
    const delay = Window_ShopStatus.EQUIP_DELAY_MS;
    // this.contents.clear();
    // this.contentsBack.clear();
    setTimeout(this.refreshDelay.bind(this, item), delay);
};

// v1.47 added by Arisu
Window_ShopStatus.prototype.refreshDelay = function(item) {
    if (this._item === item) {
        this.refresh();
    }
};

// v1.07 added by Yanfly
Window_ShopStatus.prototype.isPageChangeRequested = function() {
    return false;
};

Window_ShopStatus.prototype.loadFaceImages = function() {
    Window_StatusBase.prototype.loadFaceImages.call(this);
    for (const actor of $gameParty.members()) {
        ImageManager.loadCharacter(actor.characterName());
    }
};

Window_ShopStatus.prototype.translucentOpacity = function() {
    return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.Translucent;
};

Window_ShopStatus.prototype.refresh = function() {
    this.contents.clear();
    this.contentsBack.clear();
    if (this._item) {
        this.resetFontSettings();
        this.changePaintOpacity(true);
        this.prepareItemCustomData();
        if (this.isEquipItem()) {
            this.drawEquipData();
        } else {
            this.drawItemData();
        }
        this.drawCustomShopGraphic(); // v1.26 added by Irina
    }
};

Window_ShopStatus.prototype.drawPossession = function(x, y) {
    if (!this.isEquipItem() && !DataManager.isItem(this._item)) return;
    const width = this.innerWidth - this.itemPadding() - x;
    const possessionWidth = this.textWidth("0000");
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.possession, x + this.itemPadding(), y, width - possessionWidth);
    this.resetTextColor();
    this.drawItemNumber(this._item, x, y, width);
};

Window_ShopStatus.prototype.drawItemDarkRect = function(x, y, width, height, times) {
    if (VisuMZ.ItemsEquipsCore.Settings.StatusWindow.DrawBackRect === false) return;
    times = Math.max(times || 1, 1);
    while (times--) {
        height = height || this.lineHeight();
        this.contentsBack.paintOpacity = 160;
        const backColor = ColorManager.getItemsEquipsCoreBackColor1();
        this.contentsBack.fillRect(x+1, y+1, width-2, height-2, backColor);
        this.contentsBack.paintOpacity = 255;
    }
};

ColorManager.getItemsEquipsCoreBackColor1 = function() {
    const settings = VisuMZ.ItemsEquipsCore.Settings.StatusWindow;
    let data = settings.BackRectColor !== undefined ? settings.BackRectColor : 19;
    return ColorManager.getColor(data);
};

//-----------------------------------------------------------------------------
// Draw Equip Data
//-----------------------------------------------------------------------------
Window_ShopStatus.prototype.drawEquipData = function() {
    this._tempActor = null;

    if (VisuMZ.ItemsEquipsCore.Settings.StatusWindow.DrawEquipData) {
        VisuMZ.ItemsEquipsCore.Settings.StatusWindow.DrawEquipData.call(this);
        return;
    }

    // Set Variables
    const lineHeight = this.lineHeight();
    const paramheight = this.gaugeLineHeight() + 8;
    let x = 0;
    let y = 0;
    let width = this.innerWidth;
    let height = this.innerHeight;
    let hw = Math.floor(width / 2);
    let hx = x + width - hw;

    // Draw Item Name, Type, and Quantity
    this.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);
    this.drawItemDarkRect(x, y, width);
    y += lineHeight;
    if (this.drawItemEquipType(x, y, hw)) y += 0;
    if (this.drawItemQuantity(hx, y, hw)) y += lineHeight;

    // Draw Parameter Names
    const params = this.actorParams();
    const backY = y;
    y = height - (params.length * paramheight) - 4;
    let paramX = x;
    let paramWidth = 0;
    let tableY = y;
    for (const paramId of params) {
        paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);
        y += paramheight;
    }

    // Draw Actor Data
    const actorMax = $gameParty.maxBattleMembers();
    const actorWidth = Math.floor((width - paramWidth) / actorMax);
    paramWidth = width - (actorWidth * actorMax);

    // Loop Through Actors
    for (const actor of $gameParty.battleMembers()) {
        const index = $gameParty.battleMembers().indexOf(actor);
        const actorX = paramX + paramWidth + (index * actorWidth);

        this.changePaintOpacity(actor.canEquip(this._item));
        this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);

        let actorY = tableY;

        // Draw Parameter Changes
        for (const paramId of params) {
            const diffY = actorY - ((lineHeight - paramheight) / 2);
            this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);
            actorY += paramheight;
        }
    }

    // Draw Back Rectangles
    this.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);
    for (let i = 0; i < actorMax; i++) {
        const actorX = paramX + paramWidth + (i * actorWidth);
        this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);
    }
    for (const paramId of params) {
        this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);
        for (let i = 0; i < actorMax; i++) {
            const actorX = paramX + paramWidth + (i * actorWidth);
            this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);
        }
        tableY += paramheight;
    }
};

Window_ShopStatus.prototype.drawItemEquipType = function(x, y, width) {
    // Return checks
    if (!this.isEquipItem()) return false;

    // Label
    const label = $dataSystem.equipTypes[this._item.etypeId];
    this.drawItemKeyData(label, x, y, width, true);

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemQuantityText = function() {
    const fmt = VisuMZ.ItemsEquipsCore.Settings.ItemScene.ItemQuantityFmt;
    return fmt.format($gameParty.numItems(this._item));
};

// v1.35 updated by Olivia
Window_ShopStatus.prototype.actorParams = function() {
    let params = [0, 1, 2, 3, 4, 5, 6, 7];
    if (Imported.VisuMZ_0_CoreEngine) {
        params = VisuMZ.CoreEngine.Settings.Param.ExtDisplayedParams;
    }
    // v1.36 added by Olivia
    params = params.map(paramId => (typeof paramId === 'number') ? paramId : paramId.toUpperCase().trim());
    return params;
};

Window_ShopStatus.prototype.smallParamFontSize = function() {
    return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.ParamChangeFontSize;
};

Window_ShopStatus.prototype.drawParamName = function(paramId, x, y, width) {
    this.resetFontSettings();
    this.contents.fontSize = this.smallParamFontSize();
    let textWidth = this.textWidth(TextManager.param(paramId)) + 4 + x;
    if (Imported.VisuMZ_0_CoreEngine) {
        this.drawParamText(x, y, width, paramId, true);
        if (VisuMZ.CoreEngine.Settings.Param.DrawIcons) {
            textWidth += ImageManager.iconWidth + 4;
        }
    } else {
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(TextManager.param(paramId), x, y, width);
    }
    this.resetFontSettings();
    return textWidth;
};

Window_ShopStatus.prototype.drawActorParamDifference = function(actor, paramId, x, y, width) {
    x += this.itemPadding();
    width -= this.itemPadding() * 2;
    const settings = VisuMZ.ItemsEquipsCore.Settings.StatusWindow;
    this.contents.fontSize = settings.ParamChangeFontSize;
    this.changePaintOpacity(actor.canEquip(this._item));

    // Already Equipped
    if (actor.isEquipped(this._item) && !actor.anyEmptyEquipSlotsOfSameEtype(this._item)) { // v1.40 updated by Arisu
        const equipped = settings.AlreadyEquipMarker;
        this.drawText(equipped, x, y, width, 'center');

    // Equip Change
    } else if (actor.canEquip(this._item)) {
        //const targetItem = this.currentEquippedItem(actor, this._item.etypeId);
        // const tempActor = JsonEx.makeDeepCopy(actor);
        // tempActor._tempActor = true;

        // v1.40 updated by Arisu
        // const slotId = tempActor.equipSlots().indexOf(this._item.etypeId);
        // const slotId = tempActor.getEmptyEquipSlotOfSameEtype(this._item);
        // if (slotId >= 0) {
        //     tempActor.forceChangeEquip(slotId, this._item);
        // }

        // v1.48 added by Irina
        const tempActor = this.createTempActorEquips(actor);

        let newValue = 0;
        let diffValue = 0;
        let change = 0;

        if (Imported.VisuMZ_0_CoreEngine) {
            newValue = tempActor.paramValueByName(paramId);
            diffValue = newValue - actor.paramValueByName(paramId);
            this.changeTextColor(ColorManager.paramchangeTextColor(diffValue));
            // v1.13 updated by Arisu
            change = (diffValue >= 0 ? '+' : '') + VisuMZ.ConvertNumberToString(diffValue, 0, paramId);

        } else {
            newValue = tempActor.param(paramId);
            diffValue = newValue - actor.param(paramId);
            this.changeTextColor(ColorManager.paramchangeTextColor(diffValue));
            change = (diffValue >= 0 ? '+' : '') + diffValue;
        }

        if (change === '+0') {
            change = settings.NoChangeMarker;
        }
        this.drawText(change, x, y, width, 'center');

    // Cannot Equip
    } else {
        const cannotEquip = settings.CannotEquipMarker;
        this.drawText(cannotEquip, x, y, width, 'center');
    }
    this.resetFontSettings();
    this.changePaintOpacity(true);
};

// v1.48 added by Irina
Window_ShopStatus.prototype.createTempActorEquips = function(actor) {
    if (this.needsNewTempActor(actor)) {
        const tempActor = JsonEx.makeDeepCopy(actor);
        tempActor._tempActor = true;

        const slotId = tempActor.getEmptyEquipSlotOfSameEtype(this._item);
        if (slotId >= 0) {
            tempActor.forceChangeEquip(slotId, this._item);
        }

        this._tempActor = tempActor;
    }
    return this._tempActor;
};

Window_ShopStatus.prototype.needsNewTempActor = function(actor) {
    if (!this._tempActor) return true;
    return this._tempActor.actorId() !== actor.actorId();
};

// v1.40 updated by Arisu
Game_Actor.prototype.anyEmptyEquipSlotsOfSameEtype = function(item) {
    if (!item) return false;

    const etypeID = item.etypeId;
    const slots = this.equipSlots();
    for (let i = 0; i < slots.length; i++) {
        const slotTypeID = slots[i];
        if (slotTypeID !== etypeID) continue;
        if (!this.equips()[i]) return true;
    }

    return false;
};

// v1.40 updated by Arisu
Game_Actor.prototype.getEmptyEquipSlotOfSameEtype = function(item) {
    if (!item) return -1;

    const etypeID = item.etypeId;
    const slots = this.equipSlots();
    let firstSlotMatch = -1;

    for (let i = 0; i < slots.length; i++) {
        const slotTypeID = slots[i];
        if (slotTypeID !== etypeID) continue;
        if (!this.equips()[i]) return i;
        if (firstSlotMatch < 0) firstSlotMatch = i;
    }

    return firstSlotMatch;
};

//-----------------------------------------------------------------------------
// Draw Item Data
//-----------------------------------------------------------------------------
Window_ShopStatus.prototype.drawItemData = function() {
    VisuMZ.ItemsEquipsCore.Settings.StatusWindow.DrawItemData.call(this);
    /*
    // Set Variables
    const lineHeight = this.lineHeight();
    let x = 0;
    let y = 0;
    let width = this.innerWidth;
    let height = this.innerHeight;
    let hw = Math.floor(width / 2);
    let hx = x + width - hw;

    // Draw Item Name and Quantity
    this.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);
    this.drawItemDarkRect(x, y, width);
    y += lineHeight;

    // Draw Main Item Properties
    if (this.drawItemConsumable(x, y, hw)) y += 0;
    if (this.drawItemQuantity(hx, y, hw)) y += lineHeight;
    if (this._item.occasion < 3) {
        y = this.drawItemDamage(x, y, width);
        y = this.drawItemEffects(x, y, width);
    }
    y = this.drawItemCustomEntries(x, y, width);

    // Draw Remaining Item Properties
    if (this._item.occasion < 3) {
        if (this.drawItemOccasion(x, y, hw)) y += 0;
        if (this.drawItemScope(hx, y, hw)) y += lineHeight;
        if (this.drawItemHitType(x, y, hw)) y += 0;
        if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;
        if (this.drawItemSpeed(x, y, hw)) y += 0;
        if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;
    }

    // Fill Rest of the Window
    this.drawItemDarkRect(x, y, width, height - y);
    */
};

// v1.41 added by Arisu
Window_ShopStatus.prototype.drawItemName = function(item, x, y, width) {
    const isSkill = DataManager.isSkill(item, x, y, width) && Imported.VisuMZ_1_SkillsStatesCore;
    const name = item ? item.name : '';
    if (isSkill) Window_SkillList.prototype.alterSkillName.call(this, item);
    Window_Base.prototype.drawItemName.call(this, item, x, y, width);
    if (isSkill) item.name = name;
};

Window_ShopStatus.prototype.prepareItemCustomData = function() {
    this._customItemInfo = {};
    if (!this._item) return;
    const note = this._item.note;
    if (note.match(/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)) {
        const batch = String(RegExp.$1).split(/[\r\n]+/);
        for (const line of batch) {
            if (line.match(/(.*):[ ](.*)/i)) {
                const key = String(RegExp.$1).toUpperCase().trim();
                const data = String(RegExp.$2).trim();
                this._customItemInfo[key] = data;
            }
        }
    }
};

Window_ShopStatus.prototype.itemDataFontSize = function() {
    return Math.max(1, $gameSystem.mainFontSize() - 4);
};

Window_ShopStatus.prototype.resetFontSettings = function() {
    Window_StatusBase.prototype.resetFontSettings.call(this);
    this.contents.fontSize = this._resetFontSize || this.contents.fontSize;
    this.contents.textColor = this._resetFontColor || this.contents.textColor;
};

Window_ShopStatus.prototype.fontSizeRatio = function() {
    return this.contents.fontSize / $gameSystem.mainFontSize();
};

Window_ShopStatus.prototype.drawIcon = function(iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem("IconSet");
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    const dw = Math.ceil(pw * this.fontSizeRatio());
    const dh = Math.ceil(ph * this.fontSizeRatio());
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
};

Window_ShopStatus.prototype.processDrawIcon = function(iconIndex, textState) {
    if (textState.drawing) {
        this.drawIcon(iconIndex, textState.x, textState.y + 2);
    }
    textState.x += Math.ceil(ImageManager.iconWidth * this.fontSizeRatio());
    if (this.fontSizeRatio() === 1) textState.x += 4;
};

Window_ShopStatus.prototype.drawItemKeyData = function(text, x, y, width, label, align) {
    text = text || '';
    align = align || 'left';
    this._resetFontSize = this.itemDataFontSize();
    this._resetFontColor = label ? ColorManager.systemColor() : this.contents.textColor;

    x += this.itemPadding();
    width -= this.itemPadding() * 2;

    const size = this.textSizeEx(text);
    if (align === 'center') {
        x = x + Math.floor((width - size.width) / 2);
    } else if (align === 'right') {
        x = x + width - size.width;
    }
    y += (this.lineHeight() - size.height) / 2;
    this.drawTextEx(text, x, y, width);

    this._resetFontSize = undefined;
    this._resetFontColor = undefined;
    this.resetFontSettings();
};

Window_ShopStatus.prototype.drawItemConsumable = function(x, y, width) {
    // Return checks
    if (!DataManager.isItem(this._item)) return false;

    // Label
    const label = this.getItemConsumableLabel();
    this.drawItemKeyData(label, x, y, width, true);

    // Result
    const result = this.getItemConsumableText();
    this.drawItemKeyData(result, x, y, width, false, 'right');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemConsumableLabel = function() {
    return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.LabelConsume;
};

Window_ShopStatus.prototype.getItemConsumableText = function() {
    // Check for custom info
    const infoKey = 'CONSUMABLE';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    // Otherwise
    if (this.canConsumeItem()) {
        return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.Consumable;
    } else {
        return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.NotConsumable;
    }
};

Window_ShopStatus.prototype.canConsumeItem = function() {
    if (VisuMZ.CoreEngine && VisuMZ.CoreEngine.Settings.QoL.KeyItemProtect && DataManager.isKeyItem(this._item)) {
        return false;
    } else {
        return this._item.consumable;
    }
};

Window_ShopStatus.prototype.drawItemQuantity = function(x, y, width) {
    // Return checks
    if (!this.isEquipItem() && !DataManager.isItem(this._item)) return false;

    // Check Opt Key Item
    if (DataManager.isKeyItem(this._item) && !$dataSystem.optKeyItemsNumber) {
        // KeyItem
        const KeyItem = TextManager.keyItem;
        this.drawItemKeyData(KeyItem, x, y, width, true, 'center');

    } else {
        // Label
        const label = TextManager.possession;
        this.drawItemKeyData(label, x, y, width, true);
        // Result
        const result = this.getItemQuantityText();
        this.drawItemKeyData(result, x, y, width, false, 'right');
    }

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemQuantityText = function() {
    // Check for custom info
    const infoKey = 'QUANTITY';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    // Otherwise
    const fmt = VisuMZ.ItemsEquipsCore.Settings.ItemScene.ItemQuantityFmt;
    return fmt.format($gameParty.numItems(this._item));
};

Window_ShopStatus.prototype.drawItemOccasion = function(x, y, width) {
    // Result
    const result = this.getItemOccasionText();
    this.drawItemKeyData(result, x, y, width, false, 'center');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemOccasionText = function() {
    // Check for custom info
    const infoKey = 'OCCASION';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    // Otherwise
    const settings = VisuMZ.ItemsEquipsCore.Settings.StatusWindow;
    const key = 'Occasion%1'.format(this._item.occasion);
    return settings[key];
};

Window_ShopStatus.prototype.drawItemScope = function(x, y, width) {
    // Result
    const result = this.getItemScopeText();
    this.drawItemKeyData(result, x, y, width, false, 'center');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemScopeText = function() {
    // Check for custom info
    const infoKey = 'SCOPE';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    // Declare Constants
    const settings = VisuMZ.ItemsEquipsCore.Settings.StatusWindow;

    // Battle Engine Core Support
    if (Imported.VisuMZ_1_BattleCore) {
        const note = this._item.note;
        if (note.match(/<TARGET:[ ](.*)>/i)) {
            const line = String(RegExp.$1);
            if (line.match(/(\d+) RANDOM ANY/i)) {
                return settings.ScopeRandomAny.format(Number(RegExp.$1));
            } else if (line.match(/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)) {
                return settings.ScopeRandomEnemies.format(Number(RegExp.$1));
            } else if (line.match(/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)) {
                return settings.ScopeRandomAllies.format(Number(RegExp.$1));
            } else if (line.match(/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i)) {
                return settings.ScopeAlliesButUser;
            }
        }
    }

    // Otherwise
    const key = 'Scope%1'.format(this._item.scope);
    return settings[key];
};

Window_ShopStatus.prototype.drawItemSpeed = function(x, y, width) {
    // Label
    const label = this.getItemSpeedLabel();
    this.drawItemKeyData(label, x, y, width, true);

    // Result
    const result = this.getItemSpeedText();
    this.drawItemKeyData(result, x, y, width, false, 'right');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemSpeedLabel = function() {
    return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.LabelSpeed;
};

Window_ShopStatus.prototype.getItemSpeedText = function() {
    // Check for custom info
    const infoKey = 'SPEED';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    // Otherwise
    const speed = this._item.speed;
    if (speed >= 2000) {
        return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.Speed2000;
    } else if (speed >= 1000) {
        return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.Speed1000;
    } else if (speed > 0) {
        return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.Speed1;
    } else if (speed === 0) {
        return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.Speed0;
    } else if (speed > -1000) {
        return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.SpeedNeg999;
    } else if (speed > -2000) {
        return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.SpeedNeg1999;
    } else if (speed <= -2000) {
        return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.SpeedNeg2000;
    } else {
        return '?????';
    }
};

Window_ShopStatus.prototype.drawItemSuccessRate = function(x, y, width) {
    // Label
    const label = this.getItemSuccessRateLabel();
    this.drawItemKeyData(label, x, y, width, true);

    // Result
    const result = this.getItemSuccessRateText();
    this.drawItemKeyData(result, x, y, width, false, 'right');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemSuccessRateLabel = function() {
    return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.LabelSuccessRate;
};

Window_ShopStatus.prototype.getItemSuccessRateText = function() {
    // Check for custom info
    const infoKey = 'SUCCESS RATE';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    if (Imported.VisuMZ_1_BattleCore) {
        const note = this._item.note;
        if (note.match(/<ALWAYS HIT>/i)) {
            return '100%';
        } else if (note.match(/<ALWAYS HIT RATE: (\d+)([%％])>/i)) {
            return '%1%'.format(Number(RegExp.$1));
        }
    }

    // Otherwise
    return '%1%'.format(this._item.successRate)
};

Window_ShopStatus.prototype.drawItemRepeats = function(x, y, width) {
    // Label
    const label = this.getItemRepeatsLabel();
    this.drawItemKeyData(label, x, y, width, true);

    // Result
    const result = this.getItemRepeatsText();
    this.drawItemKeyData(result, x, y, width, false, 'right');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemRepeatsLabel = function() {
    return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.LabelRepeats;
};

Window_ShopStatus.prototype.getItemRepeatsText = function() {
    // Check for custom info
    const infoKey = 'REPEAT';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    // Otherwise
    const fmt = '×%1';
    return fmt.format(this._item.repeats);
};

Window_ShopStatus.prototype.drawItemHitType = function(x, y, width) {
    // Label
    const label = this.getItemHitTypeLabel();
    this.drawItemKeyData(label, x, y, width, true);

    // Result
    const result = this.getItemHitTypeText();
    this.drawItemKeyData(result, x, y, width, false, 'right');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemHitTypeLabel = function() {
    return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.LabelHitType;
};

Window_ShopStatus.prototype.getItemHitTypeText = function() {
    // Check for custom info
    const infoKey = 'HIT TYPE';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    // Otherwise
    const settings = VisuMZ.ItemsEquipsCore.Settings.StatusWindow;
    const key = 'HitType%1'.format(this._item.hitType);
    return settings[key];
};

//-----------------------------------------------------------------------------
// Draw Item Damage
//-----------------------------------------------------------------------------
Window_ShopStatus.prototype.drawItemDamage = function(x, y, width) {
    // Return checks
    if (this._item.damage.type <= 0) return y;

    // Draw Aspects
    if (this.drawItemDamageElement(x, y, width)) y += this.lineHeight();
    if (this.drawItemDamageAmount(x, y, width)) y += this.lineHeight();

    // Cleanup
    this.resetFontSettings();
    return y;
};

Window_ShopStatus.prototype.drawItemDamageElement = function(x, y, width) {
    // Label
    const label = this.getItemDamageElementLabel();
    this.drawItemKeyData(label, x, y, width, true);

    // Result
    const result = this.getItemDamageElementText();
    this.drawItemKeyData(result, x, y, width, false, 'right');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemDamageElementLabel = function() {
    return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.LabelElement;
};

Window_ShopStatus.prototype.getItemDamageElementText = function() {
    // Check for custom info
    const infoKey = 'ELEMENT';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    // Otherwise
    if (this._item.damage.elementId <= -1) {
        return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.ElementWeapon;
    } else if (this._item.damage.elementId === 0) {
        return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.ElementNone;
    } else {
        return $dataSystem.elements[this._item.damage.elementId];
    }
};

Window_ShopStatus.prototype.drawItemDamageAmount = function(x, y, width) {
    // Label
    const label = this.getItemDamageAmountLabel();
    this.drawItemKeyData(label, x, y, width, true);

    // Result
    this.setupItemDamageTempActors();
    const result = this.getItemDamageAmountText();
    const color = ColorManager.damageColor([0,0,2,1,3,1,3][this._item.damage.type]);
    this.changeTextColor(color);
    this.drawItemKeyData(result, x, y, width, false, 'right');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemDamageAmountLabel = function() {
    if (Imported.VisuMZ_1_BattleCore && DataManager.getDamageStyle(this._item) !== 'MANUAL') {
        return this.getItemDamageAmountLabelBattleCore();
    } else {
        return this.getItemDamageAmountLabelOriginal();
    }
};

Window_ShopStatus.prototype.getItemDamageAmountLabelOriginal = function() {
    const settings = VisuMZ.ItemsEquipsCore.Settings.StatusWindow;
    const key = 'DamageType%1'.format(this._item.damage.type);
    const resource = [null,
        TextManager.hp,TextManager.mp,
        TextManager.hp,TextManager.mp,
        TextManager.hp,TextManager.mp
    ][this._item.damage.type];
    return settings[key].format(resource);
};

Window_ShopStatus.prototype.setupItemDamageTempActors = function() {
    const actor = $gameActors.actor(1);
    this._tempActorA = JsonEx.makeDeepCopy(actor);
    this._tempActorB = JsonEx.makeDeepCopy(actor);
};

Window_ShopStatus.prototype.getItemDamageAmountText = function() {
    // Check for custom info
    const infoKey = 'DAMAGE MULTIPLIER';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    if (Imported.VisuMZ_1_BattleCore && DataManager.getDamageStyle(this._item) !== 'MANUAL') {
        return this.getItemDamageAmountTextBattleCore();
    } else {
        return this.getItemDamageAmountTextOriginal();
    }
};

Window_ShopStatus.prototype.getItemDamageAmountTextOriginal = function() {
    // Have to do this in order to make obfuscation work
    window.a = this._tempActorA;
    window.b = this._tempActorB;
    this._tempActorA.setShopStatusWindowMode(true);
    this._tempActorB.setShopStatusWindowMode([3,4].includes(this._item.damage.type));
    let formula = this._item.damage.formula;
    try {
        const value = Math.max(eval(formula), 0) / window.a.atk;
        this.revertGlobalNamespaceVariables();
        if (isNaN(value)) {
            return '?????';
        } else {
            return '%1%'.format(Math.round(value * 100));
        }
    } catch (e) {
        if ($gameTemp.isPlaytest()) {
            console.log('Damage Formula Error for %1'.format(this._item.name));
            console.log(e);
        }
        this.revertGlobalNamespaceVariables();
        return '?????';
    }
};

Window_ShopStatus.prototype.revertGlobalNamespaceVariables = function() {
    window.a = undefined;
    window.b = undefined;
};

//-----------------------------------------------------------------------------
// Draw Item Effects
//-----------------------------------------------------------------------------
Window_ShopStatus.prototype.drawItemEffects = function(x, y, width) {
    // Make Item Data
    if (!this.makeItemData()) return y;

    // Draw Aspects
    if (this.drawItemEffectsHpRecovery(x, y, width)) y += this.lineHeight();
    if (this.drawItemEffectsMpRecovery(x, y, width)) y += this.lineHeight();
    if (this.drawItemEffectsTpRecovery(x, y, width)) y += this.lineHeight();
    if (this.drawItemEffectsHpDamage(x, y, width)) y += this.lineHeight();
    if (this.drawItemEffectsMpDamage(x, y, width)) y += this.lineHeight();
    if (this.drawItemEffectsTpDamage(x, y, width)) y += this.lineHeight();
    if (this.drawItemEffectsSelfTpGain(x, y, width)) y += this.lineHeight();
    if (this.drawItemEffectsAddedStatesBuffs(x, y, width)) y += this.lineHeight();
    if (this.drawItemEffectsRemovedStatesBuffs(x, y, width)) y += this.lineHeight();

    // Cleanup
    this.resetFontSettings();
    return y;
};

// v1.28 added by Olivia
Window_ShopStatus.prototype.getItemEffects = function() {
    return this._item.effects;
};

Window_ShopStatus.prototype.makeItemData = function() {
    // Declare Item Data
    let change = false;
    this._itemData = {
        rateHP: 0, flatHP: 0,
        rateMP: 0, flatMP: 0,
        gainTP: 0,
        selfTP: 0,
        addState: [],
        removeState: [],
        changeBuff: [0,0,0,0,0,0,0,0],
        removeBuff: [],
        removeDebuff: [],
        addStateBuffChanges: false,
        removeStateBuffChanges: false,
    };

    // v1.28 added by Olivia
    const effects = this.getItemEffects();

    for (const effect of effects) {
        switch (effect.code) {
            case Game_Action.EFFECT_RECOVER_HP:
                this._itemData.rateHP += effect.value1;
                this._itemData.flatHP += effect.value2;
                change = true;
                break;
            case Game_Action.EFFECT_RECOVER_MP:
                this._itemData.rateMP += effect.value1;
                this._itemData.flatMP += effect.value2;
                change = true;
                break;
            case Game_Action.EFFECT_GAIN_TP:
                this._itemData.gainTP += effect.value1;
                change = true;
                break;
            case Game_Action.EFFECT_ADD_STATE:
                this._itemData.addState.push(effect.dataId);
                change = true;
                break;
            case Game_Action.EFFECT_REMOVE_STATE:
                this._itemData.removeState.push(effect.dataId);
                this._itemData.removeStateBuffChanges = true;
                change = true;
                break;
            case Game_Action.EFFECT_ADD_BUFF:
                this._itemData.changeBuff[effect.dataId] += 1;
                change = true;
                break;
            case Game_Action.EFFECT_ADD_DEBUFF:
                this._itemData.changeBuff[effect.dataId] -= 1;
                change = true;
                break;
            case Game_Action.EFFECT_REMOVE_BUFF:
                this._itemData.removeBuff.push(effect.dataId);
                this._itemData.removeStateBuffChanges = true;
                change = true;
                break;
            case Game_Action.EFFECT_REMOVE_DEBUFF:
                this._itemData.removeDebuff.push(effect.dataId);
                this._itemData.removeStateBuffChanges = true;
                change = true;
                break;
        }
    }
    if (this._itemData.addState.length > 0) this._itemData.addStateBuffChanges = true;
    for (let i = 0; i < this._itemData.changeBuff.length; i++) {
        if (this._itemData.changeBuff[i] !== 0) this._itemData.addStateBuffChanges = true;
    }
    if (this._item.tpGain !== 0) {
        this._itemData.selfTP = this._item.tpGain;
        change = true;
    }
    const customKeys = [
        'HP RECOVERY','MP RECOVERY','TP RECOVERY',
        'HP DAMAGE','MP DAMAGE', 'TP DAMAGE',
        'USER TP GAIN','ADDED EFFECTS','REMOVED EFFECTS',
    ];
    for (const key of customKeys) {
        if (this._customItemInfo[key]) {
            change = true;
            break;
        }
    }
    return change;
};

Window_ShopStatus.prototype.drawItemEffectsHpRecovery = function(x, y, width) {
    // Return Check
    const infoKey = 'HP RECOVERY';
    if (this._itemData.rateHP <= 0 && this._itemData.flatHP <= 0 && !this._customItemInfo[infoKey]) return false;

    // Label
    const label = this.getItemEffectsHpRecoveryLabel();
    this.drawItemKeyData(label, x, y, width, true);

    // Result
    const result = this.getItemEffectsHpRecoveryText();
    this.changeTextColor(ColorManager.damageColor(1));
    this.drawItemKeyData(result, x, y, width, false, 'right');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemEffectsHpRecoveryLabel = function() {
    const fmt = VisuMZ.ItemsEquipsCore.Settings.StatusWindow.LabelRecoverHP;
    return fmt.format(TextManager.hp);
};

Window_ShopStatus.prototype.getItemEffectsHpRecoveryText = function() {
    // Check for custom info
    const infoKey = 'HP RECOVERY';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    // Otherwise
    let text = '';
    if (this._itemData.rateHP > 0) text += '+%1%'.format(Math.floor(this._itemData.rateHP * 100));
    if (this._itemData.rateHP > 0 && this._itemData.flatHP > 0) text += ' ';
    if (this._itemData.flatHP > 0) text += '+%1'.format(this._itemData.flatHP);
    return text;
};

Window_ShopStatus.prototype.drawItemEffectsMpRecovery = function(x, y, width) {
    // Return Check
    const infoKey = 'MP RECOVERY';
    if (this._itemData.rateMP <= 0 && this._itemData.flatMP <= 0 && !this._customItemInfo[infoKey]) return false;

    // Label
    const label = this.getItemEffectsMpRecoveryLabel();
    this.drawItemKeyData(label, x, y, width, true);

    // Result
    const result = this.getItemEffectsMpRecoveryText();
    this.changeTextColor(ColorManager.damageColor(3));
    this.drawItemKeyData(result, x, y, width, false, 'right');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemEffectsMpRecoveryLabel = function() {
    const fmt = VisuMZ.ItemsEquipsCore.Settings.StatusWindow.LabelRecoverMP;
    return fmt.format(TextManager.mp);
};

Window_ShopStatus.prototype.getItemEffectsMpRecoveryText = function() {
    // Check for custom info
    const infoKey = 'MP RECOVERY';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    // Otherwise
    let text = '';
    if (this._itemData.rateMP > 0) text += '+%1%'.format(Math.floor(this._itemData.rateMP * 100));
    if (this._itemData.rateMP > 0 && this._itemData.flatMP > 0) text += ' ';
    if (this._itemData.flatMP > 0) text += '+%1'.format(this._itemData.flatMP);
    return text;
};

Window_ShopStatus.prototype.drawItemEffectsTpRecovery = function(x, y, width) {
    // Return Check
    const infoKey = 'TP RECOVERY';
    if (this._itemData.gainTP <= 0 && !this._customItemInfo[infoKey]) return false;

    // Label
    const label = this.getItemEffectsTpRecoveryLabel();
    this.drawItemKeyData(label, x, y, width, true);

    // Result
    const result = this.getItemEffectsTpRecoveryText();
    this.changeTextColor(ColorManager.powerUpColor());
    this.drawItemKeyData(result, x, y, width, false, 'right');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemEffectsTpRecoveryLabel = function() {
    const fmt = VisuMZ.ItemsEquipsCore.Settings.StatusWindow.LabelRecoverTP;
    return fmt.format(TextManager.tp);
};

Window_ShopStatus.prototype.getItemEffectsTpRecoveryText = function() {
    // Check for custom info
    const infoKey = 'TP RECOVERY';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    // Otherwise
    let text = '';
    text += '+%1'.format(this._itemData.gainTP);
    return text;
};

Window_ShopStatus.prototype.drawItemEffectsSelfTpGain = function(x, y, width) {
    // Return Check
    const infoKey = 'USER TP GAIN';
    if (this._itemData.selfTP === 0 && !this._customItemInfo[infoKey]) return false;

    // Label
    const label = this.getItemEffectsSelfTpGainLabel();
    this.drawItemKeyData(label, x, y, width, true);

    // Result
    const result = this.getItemEffectsSelfTpGainText();
    if (this._itemData.selfTP > 0) {
        this.changeTextColor(ColorManager.powerUpColor());
    } else {
        this.changeTextColor(ColorManager.powerDownColor());
    }
    this.drawItemKeyData(result, x, y, width, false, 'right');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemEffectsSelfTpGainLabel = function() {
    const fmt = VisuMZ.ItemsEquipsCore.Settings.StatusWindow.LabelSelfGainTP;
    return fmt.format(TextManager.tp);
};

Window_ShopStatus.prototype.getItemEffectsSelfTpGainText = function() {
    // Check for custom info
    const infoKey = 'USER TP GAIN';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    // Otherwise
    let text = '';
    if (this._itemData.selfTP > 0) {
        text += '+%1'.format(this._itemData.selfTP);
    } else {
        text += '%1'.format(this._itemData.selfTP);
    }
    return text;
};

Window_ShopStatus.prototype.drawItemEffectsHpDamage = function(x, y, width) {
    // Return Check
    const infoKey = 'HP DAMAGE';
    if (this._itemData.rateHP >= 0 && this._itemData.flatHP >= 0 && !this._customItemInfo[infoKey]) return false;

    // Label
    const label = this.getItemEffectsHpDamageLabel();
    this.drawItemKeyData(label, x, y, width, true);

    // Result
    const result = this.getItemEffectsHpDamageText();
    this.changeTextColor(ColorManager.damageColor(0));
    this.drawItemKeyData(result, x, y, width, false, 'right');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemEffectsHpDamageLabel = function() {
    const fmt = VisuMZ.ItemsEquipsCore.Settings.StatusWindow.LabelDamageHP;
    return fmt.format(TextManager.hp);
};

Window_ShopStatus.prototype.getItemEffectsHpDamageText = function() {
    // Check for custom info
    const infoKey = 'HP DAMAGE';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    // Otherwise
    let text = '';
    if (this._itemData.rateHP < 0) text += '%1%'.format(Math.floor(this._itemData.rateHP * 100));
    if (this._itemData.rateHP < 0 && this._itemData.flatHP < 0) text += ' ';
    if (this._itemData.flatHP < 0) text += '%1'.format(this._itemData.flatHP);
    return text;
};

Window_ShopStatus.prototype.drawItemEffectsMpDamage = function(x, y, width) {
    // Return Check
    const infoKey = 'MP DAMAGE';
    if (this._itemData.rateMP >= 0 && this._itemData.flatMP >= 0 && !this._customItemInfo[infoKey]) return false;

    // Label
    const label = this.getItemEffectsMpDamageLabel();
    this.drawItemKeyData(label, x, y, width, true);

    // Result
    const result = this.getItemEffectsMpDamageText();
    this.changeTextColor(ColorManager.damageColor(2));
    this.drawItemKeyData(result, x, y, width, false, 'right');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemEffectsMpDamageLabel = function() {
    const fmt = VisuMZ.ItemsEquipsCore.Settings.StatusWindow.LabelDamageMP;
    return fmt.format(TextManager.mp);
};

Window_ShopStatus.prototype.getItemEffectsMpDamageText = function() {
    // Check for custom info
    const infoKey = 'MP DAMAGE';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    // Otherwise
    let text = '';
    if (this._itemData.rateMP < 0) text += '%1%'.format(Math.floor(this._itemData.rateMP * 100));
    if (this._itemData.rateMP < 0 && this._itemData.flatMP < 0) text += ' ';
    if (this._itemData.flatMP < 0) text += '%1'.format(this._itemData.flatMP);
    return text;
};

Window_ShopStatus.prototype.drawItemEffectsTpDamage = function(x, y, width) {
    // Return Check
    const infoKey = 'TP DAMAGE';
    if (this._itemData.gainTP >= 0 && !this._customItemInfo[infoKey]) return false;

    // Label
    const label = this.getItemEffectsTpDamageLabel();
    this.drawItemKeyData(label, x, y, width, true);

    // Result
    const result = this.getItemEffectsTpDamageText();
    this.changeTextColor(ColorManager.powerDownColor());
    this.drawItemKeyData(result, x, y, width, false, 'right');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemEffectsTpDamageLabel = function() {
    const fmt = VisuMZ.ItemsEquipsCore.Settings.StatusWindow.LabelDamageTP;
    return fmt.format(TextManager.tp);
};

Window_ShopStatus.prototype.getItemEffectsTpDamageText = function() {
    // Check for custom info
    const infoKey = 'TP DAMAGE';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    // Otherwise
    let text = '';
    text += '%1'.format(this._itemData.gainTP);
    return text;
};

Window_ShopStatus.prototype.drawItemEffectsAddedStatesBuffs = function(x, y, width) {
    // Return Check
    const infoKey = 'ADDED EFFECTS';
    if (!this._itemData.addStateBuffChanges && !this._customItemInfo[infoKey]) return false;

    // Label
    const label = this.getItemEffectsAddedStatesBuffsLabel();
    this.drawItemKeyData(label, x, y, width, true);

    // Result
    const result = this.getItemEffectsAddedStatesBuffsText();
    this.drawItemKeyData(result, x, y, width, false, 'right');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemEffectsAddedStatesBuffsLabel = function() {
    return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.LabelApply;
};

Window_ShopStatus.prototype.getItemEffectsAddedStatesBuffsText = function() {
    // Check for custom info
    const infoKey = 'ADDED EFFECTS';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    // Otherwise
    let text = '';
    let count = 0;
    const countMax = 8;
    for (const stateId of this._itemData.addState) {
        const state = $dataStates[stateId];
        if (state && state.iconIndex > 0) {
            text += '\\I[%1]'.format(state.iconIndex);
            count++;
            if (count >= countMax) return text;
        }
    }
    for (let i = 0; i < this._itemData.changeBuff.length; i++) {
        const buffLevel = this._itemData.changeBuff[i];
        const iconIndex = Game_BattlerBase.prototype.buffIconIndex(buffLevel, i);
        if (iconIndex > 0) {
            text += '\\I[%1]'.format(iconIndex);
            count++;
            if (count >= countMax) return text;
        }
    }
    return text;
};

Window_ShopStatus.prototype.drawItemEffectsRemovedStatesBuffs = function(x, y, width) {
    // Return Check
    const infoKey = 'REMOVED EFFECTS';
    if (!this._itemData.removeStateBuffChanges && !this._customItemInfo[infoKey]) return false;

    // Label
    const label = this.getItemEffectsRemovedStatesBuffsLabel();
    this.drawItemKeyData(label, x, y, width, true);

    // Result
    const result = this.getItemEffectsRemovedStatesBuffsText();
    this.drawItemKeyData(result, x, y, width, false, 'right');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
    return true;
};

Window_ShopStatus.prototype.getItemEffectsRemovedStatesBuffsLabel = function() {
    return VisuMZ.ItemsEquipsCore.Settings.StatusWindow.LabelRemove;
};

Window_ShopStatus.prototype.getItemEffectsRemovedStatesBuffsText = function() {
    // Check for custom info
    const infoKey = 'REMOVED EFFECTS';
    if (this._customItemInfo[infoKey]) return this._customItemInfo[infoKey];

    // Otherwise
    let text = '';
    let count = 0;
    const countMax = VisuMZ.ItemsEquipsCore.Settings.StatusWindow.MaxIcons;
    for (const stateId of this._itemData.removeState) {
        const state = $dataStates[stateId];
        if (state && state.iconIndex > 0) {
            text += '\\I[%1]'.format(state.iconIndex);
            count++;
            if (count >= countMax) return text;
        }
    }
    for (let i = 0; i < this._itemData.removeBuff.length; i++) {
        const paramID = this._itemData.removeBuff[i]; // v1.47 fixed by Olivia
        const iconIndex = Game_BattlerBase.prototype.buffIconIndex(1, paramID);
        if (iconIndex > 0) {
            text += '\\I[%1]'.format(iconIndex);
            count++;
            if (count >= countMax) return text;
        }
    }
    for (let i = 0; i < this._itemData.removeDebuff.length; i++) {
        const paramID = this._itemData.removeDebuff[i]; // v1.47 fixed by Olivia
        const iconIndex = Game_BattlerBase.prototype.buffIconIndex(-1, paramID); // v1.47 fixed by Olivia
        if (iconIndex > 0) {
            text += '\\I[%1]'.format(iconIndex);
            count++;
            if (count >= countMax) return text;
        }
    }
    return text;
};

//-----------------------------------------------------------------------------
// Draw Item Custom Entries
//-----------------------------------------------------------------------------
Window_ShopStatus.prototype.drawItemCustomEntries = function(x, y, width) {
    // Loop through Notetags
    if (this._item.note.match(/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)) {
        const batch = String(RegExp.$1).split(/[\r\n]+/);
        for (const line of batch) {
            if (line.match(/(.*):[ ](.*)/i)) {
                const key = String(RegExp.$1).trim();
                const data = String(RegExp.$2).trim();
                this.drawItemCustomEntryLine(key, data, x, y, width);
                y += this.lineHeight();
            }
        }
    }

    // Cleanup
    this.resetFontSettings();
    return y;
};

Window_ShopStatus.prototype.drawItemCustomEntryLine = function(label, result, x, y, width) {
    // Label
    this.drawItemKeyData(label, x, y, width, true);

    // Result
    this.drawItemKeyData(result, x, y, width, false, 'right');

    // Dark Rect
    this.drawItemDarkRect(x, y, width);

    // Cleanup
    this.resetFontSettings();
};

//-----------------------------------------------------------------------------
// Custom Shop Graphic
//-----------------------------------------------------------------------------

// v1.26 added by Irina
Window_ShopStatus.prototype.drawCustomShopGraphic = function() {
    if (!this._item) return;
    const note = this._item.note;
    const tag = /<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi;
    const matches = note.match(tag);
    if (matches) {
        for (const match of matches) {
            match.match(tag);

            const filename = String(RegExp.$1).trim() || '';
            if (filename === '') continue;

            const bitmap = ImageManager.loadPicture(filename);
            bitmap.addLoadListener(this.drawCustomShopGraphicLoad.bind(this, bitmap, this._item));
        }
    }
};

// v1.26 added by Irina
Window_ShopStatus.prototype.drawCustomShopGraphicLoad = function(source, item) {
    // Return Check
    if (this._item !== item) return;
    if (!source) return;
    if (source.width <= 0 || source.height <= 0) return;

    //-------------
    // Declare Note
    //-------------
    const note = item.note;

    //--------------
    // Declare Layer
    //--------------
    let layer = 'background';
    if (note.match(/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)) {
        layer = 'foreground';
    }
    const target = layer === 'background' ? this.contentsBack : this.contents;

    //-----------------
    // Declare Max Size
    //-----------------
    let maxWidth = this.innerWidth;
    let maxHeight = this.innerHeight;
    if (note.match(/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)) {
        maxWidth = Number(RegExp.$1);
    }
    if (note.match(/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)) {
        maxHeight = Number(RegExp.$1);
    }
    if (note.match(/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)) {
        maxWidth = Number(RegExp.$1);
        maxHeight = Number(RegExp.$2);
    }
    const ratio = Math.min(1, maxWidth / source.width, maxHeight / source.height);

    //-------------------
    // Declare Dimensions
    //-------------------
    let x = 0;
    let y = 0;
    let width = Math.floor(source.width * ratio);
    let height = Math.floor(source.height * ratio);

    //---------------------
    // Calculate X Position
    //---------------------
    let align = 'center';
    if (note.match(/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)) {
        align = String(RegExp.$1).toLowerCase().trim();
    }
    if (align === 'left') {
        x = 0;
    } else if (align === 'center') {
        x = Math.round((this.innerWidth - width) / 2);
    } else {
        x = this.innerWidth - width;
    }

    //---------------------
    // Calculate Y Position
    //---------------------
    let position = 'middle';
    if (note.match(/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)) {
        position = String(RegExp.$1).toLowerCase().trim();
    }
    if (position === 'top') {
        y = 0;
    } else if (position === 'middle') {
        y = Math.round((this.innerHeight - height) / 2);
    } else {
        y = this.innerHeight - height;
    }

    //----------------
    // Offset Position
    //----------------
    if (note.match(/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)) {
        x += Number(RegExp.$1);
    }
    if (note.match(/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)) {
        y += Number(RegExp.$1);
    }
    if (note.match(/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)) {
        x += Number(RegExp.$1);
        y += Number(RegExp.$2);
    }

    // Opacity
    let opacity = 255;
    if (note.match(/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i)) {
        opacity = Number(RegExp.$1);
    } else if (note.match(/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)) {
        opacity = Math.round(Number(RegExp.$1) * 0.01 * 255).clamp(0, 255);
    }

    // Final
    target.paintOpacity = opacity;
    target.blt(source, 0, 0, source.width, source.height, x, y, width, height);
    target.paintOpacity = 255;
};

// v1.48 added by Irina
VisuMZ.ItemsEquipsCore.deepCopy = function(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
  
    const copy = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
  
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            copy[key] = (typeof obj[key] === 'object' && obj[key] !== null) ? VisuMZ.ItemsEquipsCore.deepCopy(obj[key]) : obj[key];
        }
    }
    
    return copy;
};

//=============================================================================
// End of File
//=============================================================================