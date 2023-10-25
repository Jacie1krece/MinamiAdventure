//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.49;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.49] [ItemsEquipsCore]
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
 * <Added EType: x>
 * <Added ETypes: x, x, x>
 * 
 * - Used for: Armor Notetags
 * - This is for armors only and does NOT work with weapons!
 * - Allows a piece of armor to belong to multiple ETypes. This means a glove
 *   can be equipped as "Armgear" or as an "Accessory" if you so choose.
 * - Replace 'x' with a number representing the ID of the EType you wish to add
 *   to the list of ETypes.
 *   - Insert multiple 'x' entries to add more than one EType ID.
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
 * Version 1.49: October 12, 2023
 * * Bug Fixes!
 * ** Fixed a problem where for weapon types, all weapon types are listed in
 *    the equip menu even when the actor cannot equip them (though they would
 *    be disabled). Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Olivia and sponsored by AndyL:
 * *** <Added EType: x>
 * *** <Added ETypes: x, x, x>
 * **** This is for armors only and does NOT work with weapons!
 * **** Allows a piece of armor to belong to multiple ETypes. This means a
 *      glove can be equipped as "Armgear" or as an "Accessory" if you so
 *      choose.
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

const _0x2b9290=_0x3b06;(function(_0x526209,_0x29c3ae){const _0x1b567a=_0x3b06,_0xbc9990=_0x526209();while(!![]){try{const _0x35a992=parseInt(_0x1b567a(0x1de))/0x1+-parseInt(_0x1b567a(0x308))/0x2+parseInt(_0x1b567a(0x29d))/0x3+parseInt(_0x1b567a(0x3a9))/0x4*(parseInt(_0x1b567a(0xf3))/0x5)+parseInt(_0x1b567a(0x60c))/0x6*(parseInt(_0x1b567a(0x21e))/0x7)+-parseInt(_0x1b567a(0x260))/0x8*(parseInt(_0x1b567a(0x39f))/0x9)+parseInt(_0x1b567a(0x637))/0xa;if(_0x35a992===_0x29c3ae)break;else _0xbc9990['push'](_0xbc9990['shift']());}catch(_0x550682){_0xbc9990['push'](_0xbc9990['shift']());}}}(_0x2121,0xb0caa));var label='ItemsEquipsCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2b9290(0x538)](function(_0x3970c4){const _0x1e4aea=_0x2b9290;return _0x3970c4[_0x1e4aea(0x1b1)]&&_0x3970c4['description'][_0x1e4aea(0x57b)]('['+label+']');})[0x0];function _0x3b06(_0x581933,_0x72537f){const _0x21211a=_0x2121();return _0x3b06=function(_0x3b068a,_0x1b0167){_0x3b068a=_0x3b068a-0xe0;let _0x3167e1=_0x21211a[_0x3b068a];return _0x3167e1;},_0x3b06(_0x581933,_0x72537f);}VisuMZ[label][_0x2b9290(0x389)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x2b9290(0x257)]=function(_0x7e807c,_0x247dea){const _0x495070=_0x2b9290;for(const _0xce842e in _0x247dea){if(_0x495070(0x1d9)!=='KZTbD'){if(_0xce842e[_0x495070(0x5c2)](/(.*):(.*)/i)){const _0x320b4c=String(RegExp['$1']),_0x1a1eea=String(RegExp['$2'])[_0x495070(0x32c)]()[_0x495070(0x3a6)]();let _0xaa027c,_0x54d9b2,_0x3ea6fa;switch(_0x1a1eea){case _0x495070(0x394):_0xaa027c=_0x247dea[_0xce842e]!==''?Number(_0x247dea[_0xce842e]):0x0;break;case _0x495070(0x24d):_0x54d9b2=_0x247dea[_0xce842e]!==''?JSON['parse'](_0x247dea[_0xce842e]):[],_0xaa027c=_0x54d9b2[_0x495070(0x5ec)](_0x4c9cdd=>Number(_0x4c9cdd));break;case _0x495070(0x62b):_0xaa027c=_0x247dea[_0xce842e]!==''?eval(_0x247dea[_0xce842e]):null;break;case _0x495070(0x613):_0x54d9b2=_0x247dea[_0xce842e]!==''?JSON[_0x495070(0x507)](_0x247dea[_0xce842e]):[],_0xaa027c=_0x54d9b2[_0x495070(0x5ec)](_0x25f836=>eval(_0x25f836));break;case _0x495070(0x204):_0xaa027c=_0x247dea[_0xce842e]!==''?JSON['parse'](_0x247dea[_0xce842e]):'';break;case'ARRAYJSON':_0x54d9b2=_0x247dea[_0xce842e]!==''?JSON[_0x495070(0x507)](_0x247dea[_0xce842e]):[],_0xaa027c=_0x54d9b2[_0x495070(0x5ec)](_0x4d0e15=>JSON[_0x495070(0x507)](_0x4d0e15));break;case _0x495070(0x15a):_0xaa027c=_0x247dea[_0xce842e]!==''?new Function(JSON[_0x495070(0x507)](_0x247dea[_0xce842e])):new Function(_0x495070(0x3e3));break;case _0x495070(0x2b2):_0x54d9b2=_0x247dea[_0xce842e]!==''?JSON[_0x495070(0x507)](_0x247dea[_0xce842e]):[],_0xaa027c=_0x54d9b2[_0x495070(0x5ec)](_0xeaad0d=>new Function(JSON['parse'](_0xeaad0d)));break;case _0x495070(0x282):_0xaa027c=_0x247dea[_0xce842e]!==''?String(_0x247dea[_0xce842e]):'';break;case _0x495070(0x5fb):_0x54d9b2=_0x247dea[_0xce842e]!==''?JSON[_0x495070(0x507)](_0x247dea[_0xce842e]):[],_0xaa027c=_0x54d9b2[_0x495070(0x5ec)](_0x5e0b16=>String(_0x5e0b16));break;case'STRUCT':_0x3ea6fa=_0x247dea[_0xce842e]!==''?JSON[_0x495070(0x507)](_0x247dea[_0xce842e]):{},_0x7e807c[_0x320b4c]={},VisuMZ[_0x495070(0x257)](_0x7e807c[_0x320b4c],_0x3ea6fa);continue;case _0x495070(0x4da):_0x54d9b2=_0x247dea[_0xce842e]!==''?JSON[_0x495070(0x507)](_0x247dea[_0xce842e]):[],_0xaa027c=_0x54d9b2[_0x495070(0x5ec)](_0x58c0b6=>VisuMZ['ConvertParams']({},JSON[_0x495070(0x507)](_0x58c0b6)));break;default:continue;}_0x7e807c[_0x320b4c]=_0xaa027c;}}else this[_0x495070(0x343)](_0x495070(0x51b),_0x11ace5,_0x397bc3);}return _0x7e807c;},(_0x400d33=>{const _0x3e0b18=_0x2b9290,_0x34adeb=_0x400d33[_0x3e0b18(0x348)];for(const _0x5c45a1 of dependencies){if(!Imported[_0x5c45a1]){if(_0x3e0b18(0x5a8)===_0x3e0b18(0x265)){const _0x339c3f=_0x35f5c4['atypeId']||0x0;if(this[_0x3e0b18(0x114)]&&this[_0x3e0b18(0x114)][_0x3e0b18(0x1a0)](_0x339c3f)){const _0x3fcc15=_0x28d11a['getEtypeIDs'](_0x2c1dd7);_0x3fcc15[_0x3e0b18(0x57b)](this['etypeId']())&&(_0x3c8b1a=!![]);}}else{alert(_0x3e0b18(0x2b7)['format'](_0x34adeb,_0x5c45a1)),SceneManager[_0x3e0b18(0x356)]();break;}}}const _0xa7dcb7=_0x400d33[_0x3e0b18(0x203)];if(_0xa7dcb7[_0x3e0b18(0x5c2)](/\[Version[ ](.*?)\]/i)){const _0x58026c=Number(RegExp['$1']);_0x58026c!==VisuMZ[label][_0x3e0b18(0x2ff)]&&(alert(_0x3e0b18(0x106)[_0x3e0b18(0x46a)](_0x34adeb,_0x58026c)),SceneManager[_0x3e0b18(0x356)]());}if(_0xa7dcb7[_0x3e0b18(0x5c2)](/\[Tier[ ](\d+)\]/i)){if(_0x3e0b18(0x3ba)===_0x3e0b18(0x3ba)){const _0x5abc22=Number(RegExp['$1']);_0x5abc22<tier?(alert(_0x3e0b18(0x5ee)[_0x3e0b18(0x46a)](_0x34adeb,_0x5abc22,tier)),SceneManager['exit']()):tier=Math[_0x3e0b18(0x224)](_0x5abc22,tier);}else this['_commandWindow']['deselect'](),this['_commandWindow'][_0x3e0b18(0x5d1)]();}VisuMZ['ConvertParams'](VisuMZ[label][_0x3e0b18(0x389)],_0x400d33[_0x3e0b18(0x3af)]);})(pluginData),PluginManager[_0x2b9290(0x61e)](pluginData[_0x2b9290(0x348)],_0x2b9290(0xeb),_0x2fb6f5=>{const _0x35feb2=_0x2b9290;VisuMZ[_0x35feb2(0x257)](_0x2fb6f5,_0x2fb6f5);const _0x215b44=_0x2fb6f5[_0x35feb2(0x556)][_0x35feb2(0x5ec)](_0x3d1fe9=>$gameActors[_0x35feb2(0x484)](_0x3d1fe9)),_0x143dae=_0x2fb6f5[_0x35feb2(0x3d5)]['map'](_0x137629=>$dataSystem[_0x35feb2(0x5ca)][_0x35feb2(0x31f)](_0x137629[_0x35feb2(0x3a6)]()));for(const _0x11bd4e of _0x215b44){if(!_0x11bd4e)continue;_0x11bd4e['forceChangeEquipSlots'](_0x143dae);}}),PluginManager[_0x2b9290(0x61e)](pluginData[_0x2b9290(0x348)],'ActorResetEquipSlots',_0x1b32a9=>{const _0x3cc705=_0x2b9290;VisuMZ[_0x3cc705(0x257)](_0x1b32a9,_0x1b32a9);const _0x42e932=_0x1b32a9[_0x3cc705(0x556)]['map'](_0xc5e9b4=>$gameActors['actor'](_0xc5e9b4));for(const _0x5380bc of _0x42e932){if('aVCtA'===_0x3cc705(0x2a7)){if(!_0x5380bc)continue;_0x5380bc['forceResetEquipSlots']();}else{_0xf82f84[_0x3cc705(0x125)][_0x3cc705(0x3f4)][_0x3cc705(0x3e9)](this);for(const _0x2edf46 of _0x5c69e3[_0x3cc705(0x17f)]()){_0x579392['loadCharacter'](_0x2edf46['characterName']());}}}}),PluginManager[_0x2b9290(0x61e)](pluginData[_0x2b9290(0x348)],_0x2b9290(0x360),_0x450bf2=>{const _0x51cb90=_0x2b9290;VisuMZ[_0x51cb90(0x257)](_0x450bf2,_0x450bf2);const _0x1c7907=[],_0x206f1e=_0x450bf2['Blacklist'][_0x51cb90(0x5ec)](_0x31e08b=>_0x31e08b[_0x51cb90(0x32c)]()[_0x51cb90(0x3a6)]()),_0x4f684d=_0x450bf2['Whitelist']['map'](_0x1ff450=>_0x1ff450[_0x51cb90(0x32c)]()['trim']()),_0x25e75a=_0x450bf2[_0x51cb90(0x476)]>=_0x450bf2['Step1Start']?_0x450bf2['Step1Start']:_0x450bf2['Step1End'],_0x4d4c38=_0x450bf2[_0x51cb90(0x476)]>=_0x450bf2[_0x51cb90(0x310)]?_0x450bf2[_0x51cb90(0x476)]:_0x450bf2['Step1Start'],_0x17a4d0=Array(_0x4d4c38-_0x25e75a+0x1)[_0x51cb90(0x539)]()[_0x51cb90(0x5ec)]((_0x501f18,_0x329ea5)=>_0x25e75a+_0x329ea5);for(const _0x373b24 of _0x17a4d0){if(_0x51cb90(0x11b)==='mvizr'){if(this[_0x51cb90(0x501)](_0x17b039))return![];if(this[_0x51cb90(0x516)](_0x54069b))return![];if(this['isSoleArmorType'](_0xe63262))return![];if(!this['_actor']['canEquip'](_0x3ad24a))return![];}else{const _0x1b0bda=$dataItems[_0x373b24];if(!_0x1b0bda)continue;if(!VisuMZ[_0x51cb90(0x2d3)][_0x51cb90(0x478)](_0x1b0bda,_0x206f1e,_0x4f684d))continue;_0x1c7907[_0x51cb90(0x52d)]([0x0,_0x373b24,0x0,_0x1b0bda[_0x51cb90(0x1d2)]]);}}const _0x3d12d5=_0x450bf2[_0x51cb90(0x1c6)]>=_0x450bf2[_0x51cb90(0x4f8)]?_0x450bf2[_0x51cb90(0x4f8)]:_0x450bf2[_0x51cb90(0x1c6)],_0x5e3b62=_0x450bf2[_0x51cb90(0x1c6)]>=_0x450bf2[_0x51cb90(0x4f8)]?_0x450bf2[_0x51cb90(0x1c6)]:_0x450bf2[_0x51cb90(0x4f8)],_0xeba7d3=Array(_0x5e3b62-_0x3d12d5+0x1)[_0x51cb90(0x539)]()[_0x51cb90(0x5ec)]((_0x332b72,_0x220003)=>_0x3d12d5+_0x220003);for(const _0x4c93d9 of _0xeba7d3){const _0x478611=$dataWeapons[_0x4c93d9];if(!_0x478611)continue;if(!VisuMZ[_0x51cb90(0x2d3)][_0x51cb90(0x478)](_0x478611,_0x206f1e,_0x4f684d))continue;_0x1c7907[_0x51cb90(0x52d)]([0x1,_0x4c93d9,0x0,_0x478611['price']]);}const _0x2cf126=_0x450bf2[_0x51cb90(0x30f)]>=_0x450bf2[_0x51cb90(0x55c)]?_0x450bf2[_0x51cb90(0x55c)]:_0x450bf2['Step3End'],_0x3776fe=_0x450bf2[_0x51cb90(0x30f)]>=_0x450bf2[_0x51cb90(0x55c)]?_0x450bf2[_0x51cb90(0x30f)]:_0x450bf2[_0x51cb90(0x55c)],_0x5b75b2=Array(_0x3776fe-_0x2cf126+0x1)['fill']()[_0x51cb90(0x5ec)]((_0x1b732b,_0x587339)=>_0x2cf126+_0x587339);for(const _0x24972c of _0x5b75b2){if('wqGMF'===_0x51cb90(0x29c)){const _0x156ccb=$dataArmors[_0x24972c];if(!_0x156ccb)continue;if(!VisuMZ[_0x51cb90(0x2d3)][_0x51cb90(0x478)](_0x156ccb,_0x206f1e,_0x4f684d))continue;_0x1c7907[_0x51cb90(0x52d)]([0x2,_0x24972c,0x0,_0x156ccb['price']]);}else return this[_0x51cb90(0x5a5)]?this['_list'][_0x51cb90(0x40b)]:0x3;}SceneManager['push'](Scene_Shop),SceneManager[_0x51cb90(0x52a)](_0x1c7907,_0x450bf2[_0x51cb90(0x1aa)]);}),VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x478)]=function(_0x587623,_0xb6c7e3,_0x8a5807){const _0x237e16=_0x2b9290;if(_0x587623[_0x237e16(0x348)]['trim']()==='')return![];if(_0x587623['name']['match'](/-----/i))return![];const _0x1bb839=_0x587623[_0x237e16(0x192)];if(_0xb6c7e3[_0x237e16(0x40b)]>0x0)for(const _0x2b8cbd of _0xb6c7e3){if(_0x237e16(0x384)!==_0x237e16(0x384))return this[_0x237e16(0x2f0)]();else{if(!_0x2b8cbd)continue;if(_0x1bb839['includes'](_0x2b8cbd))return![];}}if(_0x8a5807['length']>0x0){for(const _0x558769 of _0x8a5807){if(!_0x558769)continue;if(_0x1bb839['includes'](_0x558769))return!![];}return![];}return!![];},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x312)]=Scene_Boot[_0x2b9290(0x125)][_0x2b9290(0x1b9)],Scene_Boot[_0x2b9290(0x125)][_0x2b9290(0x1b9)]=function(){const _0x50e304=_0x2b9290;this[_0x50e304(0x574)](),VisuMZ[_0x50e304(0x2d3)][_0x50e304(0x312)][_0x50e304(0x3e9)](this),this['process_VisuMZ_ItemsEquipsCore_Notetags'](),VisuMZ['ItemsEquipsCore']['SetupProxyItemGroups'](),VisuMZ[_0x50e304(0x2d3)][_0x50e304(0x422)]();},Scene_Boot[_0x2b9290(0x125)][_0x2b9290(0x574)]=function(){const _0x36b00e=_0x2b9290;VisuMZ[_0x36b00e(0x2d3)][_0x36b00e(0x347)]={},VisuMZ[_0x36b00e(0x2d3)][_0x36b00e(0x347)][_0x36b00e(0x1d6)]=[],VisuMZ[_0x36b00e(0x2d3)]['RegExp'][_0x36b00e(0x4c7)]=[];const _0x1bb0ae=['MaxHP',_0x36b00e(0x440),_0x36b00e(0x26e),_0x36b00e(0x416),_0x36b00e(0x599),_0x36b00e(0x255),_0x36b00e(0x338),_0x36b00e(0x16b)];for(const _0x1d92d8 of _0x1bb0ae){const _0x1d8193=_0x36b00e(0x297)[_0x36b00e(0x46a)](_0x1d92d8);VisuMZ['ItemsEquipsCore'][_0x36b00e(0x347)]['EquipParams'][_0x36b00e(0x52d)](new RegExp(_0x1d8193,'i'));const _0x11785b=_0x36b00e(0x386)['format'](_0x1d92d8);VisuMZ[_0x36b00e(0x2d3)]['RegExp'][_0x36b00e(0x4c7)][_0x36b00e(0x52d)](new RegExp(_0x11785b,'g'));}},Scene_Boot[_0x2b9290(0x125)][_0x2b9290(0x279)]=function(){const _0x586ae7=_0x2b9290;if(VisuMZ['ParseAllNotetags'])return;this['process_VisuMZ_ItemsEquipsCore_EquipSlots']();const _0x581c63=[$dataItems,$dataWeapons,$dataArmors];for(const _0x60c43 of _0x581c63){if('EHhLJ'===_0x586ae7(0x23d))return this[_0x586ae7(0x630)][_0x390144['id']];else for(const _0x1894b1 of _0x60c43){if(!_0x1894b1)continue;VisuMZ[_0x586ae7(0x2d3)][_0x586ae7(0x3a4)](_0x1894b1,_0x60c43),VisuMZ['ItemsEquipsCore']['Parse_Notetags_Prices'](_0x1894b1,_0x60c43),VisuMZ['ItemsEquipsCore'][_0x586ae7(0x4f0)](_0x1894b1,_0x60c43),VisuMZ[_0x586ae7(0x2d3)][_0x586ae7(0x201)](_0x1894b1,_0x60c43),VisuMZ[_0x586ae7(0x2d3)][_0x586ae7(0x1c8)](_0x1894b1,_0x60c43);}}},Scene_Boot[_0x2b9290(0x125)]['process_VisuMZ_ItemsEquipsCore_EquipSlots']=function(){const _0x5a535c=_0x2b9290;for(const _0x2fdce0 of $dataClasses){if(!_0x2fdce0)continue;VisuMZ[_0x5a535c(0x2d3)][_0x5a535c(0x5b0)](_0x2fdce0);}},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x428)]=VisuMZ[_0x2b9290(0x428)],VisuMZ[_0x2b9290(0x428)]=function(_0x1b8cc2){const _0x38bc85=_0x2b9290;VisuMZ[_0x38bc85(0x2d3)][_0x38bc85(0x428)][_0x38bc85(0x3e9)](this,_0x1b8cc2),VisuMZ['ItemsEquipsCore'][_0x38bc85(0x5b0)](_0x1b8cc2);},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x1cc)]=VisuMZ[_0x2b9290(0x1cc)],VisuMZ[_0x2b9290(0x1cc)]=function(_0x3b4e0c){const _0x61bd5b=_0x2b9290;VisuMZ[_0x61bd5b(0x2d3)][_0x61bd5b(0x1cc)]['call'](this,_0x3b4e0c),VisuMZ['ItemsEquipsCore'][_0x61bd5b(0x5bf)](_0x3b4e0c,$dataItems);},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x48a)]=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x2b9290(0x48a)]=function(_0xc8ec38){const _0x205955=_0x2b9290;VisuMZ[_0x205955(0x2d3)][_0x205955(0x48a)]['call'](this,_0xc8ec38),VisuMZ[_0x205955(0x2d3)]['Parse_Notetags_Batch'](_0xc8ec38,$dataWeapons);},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x152)]=VisuMZ['ParseArmorNotetags'],VisuMZ[_0x2b9290(0x152)]=function(_0x59673f){const _0x1d99b5=_0x2b9290;VisuMZ[_0x1d99b5(0x2d3)][_0x1d99b5(0x152)][_0x1d99b5(0x3e9)](this,_0x59673f),VisuMZ[_0x1d99b5(0x2d3)][_0x1d99b5(0x5bf)](_0x59673f,$dataArmors);},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x5b0)]=function(_0x11f16c){const _0x2b34e3=_0x2b9290;_0x11f16c[_0x2b34e3(0x342)]=[];const _0x1d96a3=$dataSystem[_0x2b34e3(0x5ca)][_0x2b34e3(0x5ec)](_0x31e067=>_0x31e067?_0x31e067[_0x2b34e3(0x3a6)]():'');if(!BattleManager['isBattleTest']()&&_0x11f16c[_0x2b34e3(0x327)][_0x2b34e3(0x5c2)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){if(_0x2b34e3(0x24c)!==_0x2b34e3(0x3c8)){const _0x5c26cf=String(RegExp['$1'])[_0x2b34e3(0x435)](/[\r\n]+/);for(const _0x129df5 of _0x5c26cf){if('gxLEV'!==_0x2b34e3(0x181)){const _0x255dc7=_0x1d96a3[_0x2b34e3(0x31f)](_0x129df5['trim']());if(_0x255dc7>0x0)_0x11f16c[_0x2b34e3(0x342)][_0x2b34e3(0x52d)](_0x255dc7);}else _0x213ce9[_0x2b34e3(0x2d3)][_0x2b34e3(0x459)]['call'](this),this[_0x2b34e3(0x4e9)]()&&this['commandBuyItemsEquipsCore']();}}else this[_0x2b34e3(0xe0)](),this['changePaintOpacity'](!![]),this[_0x2b34e3(0x3ca)](),this[_0x2b34e3(0x47b)]()?this[_0x2b34e3(0x2c9)]():this['drawItemData'](),this['drawCustomShopGraphic']();}else for(const _0x788dd1 of _0x1d96a3){const _0x3a1f12=_0x1d96a3['indexOf'](_0x788dd1[_0x2b34e3(0x3a6)]());if(_0x3a1f12>0x0)_0x11f16c[_0x2b34e3(0x342)][_0x2b34e3(0x52d)](_0x3a1f12);}},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x5bf)]=function(_0x513a96,_0x19ca7c){const _0x3b4f36=_0x2b9290;VisuMZ[_0x3b4f36(0x2d3)][_0x3b4f36(0x3a4)](_0x513a96,_0x19ca7c),VisuMZ[_0x3b4f36(0x2d3)][_0x3b4f36(0x53e)](_0x513a96,_0x19ca7c),VisuMZ['ItemsEquipsCore']['Parse_Notetags_ParamValues'](_0x513a96,_0x19ca7c),VisuMZ[_0x3b4f36(0x2d3)][_0x3b4f36(0x201)](_0x513a96,_0x19ca7c),VisuMZ[_0x3b4f36(0x2d3)][_0x3b4f36(0x1c8)](_0x513a96,_0x19ca7c);},VisuMZ[_0x2b9290(0x2d3)]['Parse_Notetags_Category']=function(_0x3e57e0,_0x3470fd){const _0x99c106=_0x2b9290;_0x3e57e0[_0x99c106(0x192)]=[];const _0x20f089=_0x3e57e0['note'],_0x5889b4=_0x20f089[_0x99c106(0x5c2)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x5889b4){if(_0x99c106(0x278)!==_0x99c106(0x5ce))for(const _0x32f1bf of _0x5889b4){_0x32f1bf[_0x99c106(0x5c2)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x596cc0=String(RegExp['$1'])['toUpperCase']()[_0x99c106(0x3a6)]()['split'](',');for(const _0x3821c4 of _0x596cc0){_0x99c106(0x436)===_0x99c106(0x436)?_0x3e57e0[_0x99c106(0x192)][_0x99c106(0x52d)](_0x3821c4['trim']()):(_0x3dd010['ItemsEquipsCore'][_0x99c106(0x126)][_0x99c106(0x3e9)](this),this[_0x99c106(0x120)]());}}else this[_0x99c106(0x2c9)]();}if(_0x20f089[_0x99c106(0x5c2)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if(_0x99c106(0x328)==='VOHAN'){if(!this[_0x99c106(0x5bb)]())return _0x3cc587;if(this[_0x99c106(0x569)](_0x27bc8e,_0x39200a,_0x463797))_0x203f94+=this[_0x99c106(0x625)]();if(this[_0x99c106(0x4b6)](_0x546ef1,_0x3b0d19,_0x10cea2))_0x1d1bcc+=this[_0x99c106(0x625)]();if(this['drawItemEffectsTpRecovery'](_0x573973,_0x19bc14,_0xc716fd))_0x2c3a93+=this[_0x99c106(0x625)]();if(this[_0x99c106(0x350)](_0x57cd1a,_0x2a414f,_0x3c86be))_0x3ff83b+=this[_0x99c106(0x625)]();if(this[_0x99c106(0x245)](_0x10fa4c,_0x131a57,_0x420f60))_0x3d77bd+=this[_0x99c106(0x625)]();if(this['drawItemEffectsTpDamage'](_0x1861ec,_0x3451ca,_0xbdd6ce))_0xef6706+=this['lineHeight']();if(this[_0x99c106(0x632)](_0x451101,_0x593b7b,_0x75c79e))_0x355589+=this[_0x99c106(0x625)]();if(this[_0x99c106(0x232)](_0x2cd70a,_0x5d9790,_0x30e8d6))_0x5a118b+=this[_0x99c106(0x625)]();if(this['drawItemEffectsRemovedStatesBuffs'](_0x564495,_0x41f32a,_0x3e5d56))_0x268be4+=this['lineHeight']();return this[_0x99c106(0xe0)](),_0x49165e;}else{const _0x41349f=RegExp['$1']['split'](/[\r\n]+/);for(const _0x36a1d2 of _0x41349f){if(_0x99c106(0x21b)!==_0x99c106(0x3ff))_0x3e57e0[_0x99c106(0x192)][_0x99c106(0x52d)](_0x36a1d2['toUpperCase']()[_0x99c106(0x3a6)]());else{if(_0x28185b[_0x99c106(0x5c2)](_0x57b78a[_0x99c106(0x2d3)][_0x99c106(0x347)][_0x99c106(0x4c7)][_0x498bb9])){const _0x3ee08f=_0x99c106(0x57f)[_0x99c106(0x46a)](_0x22916d,_0xcfb2a4);_0x15b76b[_0x99c106(0x2d3)][_0x99c106(0x113)][_0x3ee08f]=new _0x45e86b(_0x99c106(0x4d3),_0x99c106(0x322),_0x21989c);}}}}}},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x53e)]=function(_0x30a79a,_0x589b32){const _0x5ad93e=_0x2b9290;_0x30a79a[_0x5ad93e(0x327)][_0x5ad93e(0x5c2)](/<PRICE:[ ](\d+)>/i)&&(_0x5ad93e(0x3ee)===_0x5ad93e(0x3ee)?_0x30a79a['price']=Number(RegExp['$1']):_0x18788a[_0x5ad93e(0x1d2)]=_0x31ae6e(_0x5bb791['$1']));},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x4f0)]=function(_0x5c82fb,_0x394da7){const _0x430b65=_0x2b9290;if(_0x394da7===$dataItems)return;for(let _0x43e7cf=0x0;_0x43e7cf<0x8;_0x43e7cf++){if(_0x430b65(0x4ed)===_0x430b65(0x47e))_0x5185bb[_0x430b65(0x2d3)]['Window_ItemList_drawItem'][_0x430b65(0x3e9)](this,_0x5fdb15),this[_0x430b65(0x521)](_0x279e0b);else{const _0x58d04f=VisuMZ[_0x430b65(0x2d3)]['RegExp'][_0x430b65(0x1d6)][_0x43e7cf];_0x5c82fb[_0x430b65(0x327)]['match'](_0x58d04f)&&(_0x430b65(0x5c1)!==_0x430b65(0x228)?_0x5c82fb[_0x430b65(0x517)][_0x43e7cf]=parseInt(RegExp['$1']):(_0x336d5c[_0x430b65(0x2d3)][_0x430b65(0x22d)][_0x430b65(0x3e9)](this),this[_0x430b65(0x4e9)]()&&this['onBuyCancelItemsEquipsCore']()));}}},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x113)]={},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x201)]=function(_0xc978e,_0x11b094){const _0x1efd7d=_0x2b9290;if(_0x11b094===$dataItems)return;if(_0xc978e[_0x1efd7d(0x327)][_0x1efd7d(0x5c2)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x484a54=String(RegExp['$1']),_0xff4031=(_0x11b094===$dataWeapons?_0x1efd7d(0x4e4):_0x1efd7d(0x44d))[_0x1efd7d(0x46a)](_0xc978e['id']),_0x2c1217=_0x1efd7d(0x3d1)['format'](_0x484a54);for(let _0xbed163=0x0;_0xbed163<0x8;_0xbed163++){if(_0x1efd7d(0x4fe)!==_0x1efd7d(0x4fe))return 0x0;else{if(_0x484a54[_0x1efd7d(0x5c2)](VisuMZ[_0x1efd7d(0x2d3)][_0x1efd7d(0x347)][_0x1efd7d(0x4c7)][_0xbed163])){const _0x464eb9=_0x1efd7d(0x57f)[_0x1efd7d(0x46a)](_0xff4031,_0xbed163);VisuMZ[_0x1efd7d(0x2d3)]['paramJS'][_0x464eb9]=new Function(_0x1efd7d(0x4d3),'paramId',_0x2c1217);}}}}},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x31a)]={},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x1c8)]=function(_0x7bcee3,_0x4c56ce){const _0x1499b5=_0x2b9290;if(_0x4c56ce!==$dataItems)return;if(_0x7bcee3[_0x1499b5(0x327)][_0x1499b5(0x5c2)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){if(_0x1499b5(0x43c)==='WufJs'){const _0x303c5d=String(RegExp['$1']),_0x63cb9c='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x303c5d);VisuMZ['ItemsEquipsCore'][_0x1499b5(0x31a)][_0x7bcee3['id']]=new Function('item',_0x63cb9c);}else return![];}},DataManager[_0x2b9290(0xf4)]=function(_0x25e51f){const _0x5ae686=_0x2b9290;return this[_0x5ae686(0x3f0)](_0x25e51f)&&_0x25e51f['itypeId']===0x2;},DataManager[_0x2b9290(0x30b)]=function(_0x2d6636){const _0x3389f6=_0x2b9290;if(!_0x2d6636)return 0x63;else{if(_0x2d6636[_0x3389f6(0x327)][_0x3389f6(0x5c2)](/<MAX:[ ](\d+)>/i)){if(_0x3389f6(0x2ab)!==_0x3389f6(0x2ab)){const _0x460ca0=this[_0x3389f6(0x4c8)],_0x206515=_0x307ecc[_0x3389f6(0x1e6)](),_0x53b413=_0x639190['x']+_0x17e19e[_0x3389f6(0x5d8)](_0x114aaa[_0x3389f6(0x4e0)]/0x2)+_0x206515;_0x460ca0['x']=_0x460ca0[_0x3389f6(0x4e0)]/-0x2+_0x53b413,_0x460ca0['y']=_0xc5de78[_0x3389f6(0x5d8)](_0x510e3d['height']/0x2);}else return parseInt(RegExp['$1']);}else{if('JTyRv'===_0x3389f6(0x388))this[_0x3389f6(0x2fd)](_0x285190[_0x3389f6(0x518)](_0x3389f6(0x211)));else return this['defaultItemMax'](_0x2d6636);}}},DataManager[_0x2b9290(0x592)]=function(_0x499299){const _0xc77de0=_0x2b9290;if(this[_0xc77de0(0x3f0)](_0x499299))return _0xc77de0(0x424)===_0xc77de0(0x424)?VisuMZ[_0xc77de0(0x2d3)][_0xc77de0(0x389)][_0xc77de0(0x38e)]['MaxItems']:(this[_0xc77de0(0x36e)]===_0x26de6b&&this['initShopTrackingData'](),this[_0xc77de0(0x36e)]);else{if(this[_0xc77de0(0x187)](_0x499299))return VisuMZ[_0xc77de0(0x2d3)][_0xc77de0(0x389)]['ItemScene'][_0xc77de0(0x50b)];else{if(this[_0xc77de0(0x318)](_0x499299))return VisuMZ['ItemsEquipsCore'][_0xc77de0(0x389)][_0xc77de0(0x38e)][_0xc77de0(0x458)];}}},DataManager[_0x2b9290(0x12d)]=function(_0x5e0744){const _0x1698b1=_0x2b9290;_0x5e0744=_0x5e0744['toUpperCase']()[_0x1698b1(0x3a6)](),this[_0x1698b1(0x294)]=this['_classIDs']||{};if(this[_0x1698b1(0x294)][_0x5e0744])return this[_0x1698b1(0x294)][_0x5e0744];for(const _0x438da8 of $dataClasses){if(!_0x438da8)continue;let _0x1b3332=_0x438da8[_0x1698b1(0x348)];_0x1b3332=_0x1b3332[_0x1698b1(0x11f)](/\x1I\[(\d+)\]/gi,''),_0x1b3332=_0x1b3332[_0x1698b1(0x11f)](/\\I\[(\d+)\]/gi,''),this[_0x1698b1(0x294)][_0x1b3332[_0x1698b1(0x32c)]()[_0x1698b1(0x3a6)]()]=_0x438da8['id'];}return this[_0x1698b1(0x294)][_0x5e0744]||0x0;},DataManager[_0x2b9290(0x30c)]=function(_0x5977a8){const _0x18815b=_0x2b9290;_0x5977a8=_0x5977a8[_0x18815b(0x32c)]()[_0x18815b(0x3a6)](),this[_0x18815b(0x3a1)]=this[_0x18815b(0x3a1)]||{};if(this['_skillIDs'][_0x5977a8])return this[_0x18815b(0x3a1)][_0x5977a8];for(const _0x12d819 of $dataSkills){if('TWKMj'!==_0x18815b(0x4fa))return _0x21a1d6[_0x18815b(0x2d3)]['Settings'][_0x18815b(0x23e)][_0x18815b(0x2f7)];else{if(!_0x12d819)continue;this['_skillIDs'][_0x12d819[_0x18815b(0x348)][_0x18815b(0x32c)]()['trim']()]=_0x12d819['id'];}}return this[_0x18815b(0x3a1)][_0x5977a8]||0x0;},DataManager[_0x2b9290(0x3ae)]=function(_0x3c387f){const _0x57ee88=_0x2b9290;_0x3c387f=_0x3c387f[_0x57ee88(0x32c)]()['trim'](),this[_0x57ee88(0x505)]=this[_0x57ee88(0x505)]||{};if(this[_0x57ee88(0x505)][_0x3c387f])return this['_itemIDs'][_0x3c387f];for(const _0x3d0ece of $dataItems){if(!_0x3d0ece)continue;this['_itemIDs'][_0x3d0ece[_0x57ee88(0x348)][_0x57ee88(0x32c)]()['trim']()]=_0x3d0ece['id'];}return this[_0x57ee88(0x505)][_0x3c387f]||0x0;},DataManager[_0x2b9290(0x5d7)]=function(_0x376760){const _0xb5dee5=_0x2b9290;_0x376760=_0x376760['toUpperCase']()[_0xb5dee5(0x3a6)](),this[_0xb5dee5(0x267)]=this[_0xb5dee5(0x267)]||{};if(this[_0xb5dee5(0x267)][_0x376760])return this['_weaponIDs'][_0x376760];for(const _0x29f8cb of $dataWeapons){if(_0xb5dee5(0x15b)!==_0xb5dee5(0x15b))return _0x279080[_0xb5dee5(0x2d3)]['Settings'][_0xb5dee5(0x44f)]['SellPriceRate'];else{if(!_0x29f8cb)continue;this[_0xb5dee5(0x267)][_0x29f8cb[_0xb5dee5(0x348)][_0xb5dee5(0x32c)]()[_0xb5dee5(0x3a6)]()]=_0x29f8cb['id'];}}return this[_0xb5dee5(0x267)][_0x376760]||0x0;},DataManager['getArmorIdWithName']=function(_0x21271b){const _0x4ae895=_0x2b9290;_0x21271b=_0x21271b['toUpperCase']()[_0x4ae895(0x3a6)](),this[_0x4ae895(0x4ff)]=this['_armorIDs']||{};if(this['_armorIDs'][_0x21271b])return this[_0x4ae895(0x4ff)][_0x21271b];for(const _0x2bc160 of $dataArmors){if(_0x4ae895(0x3d2)==='QqxvE'){if(!_0x2bc160)continue;this[_0x4ae895(0x4ff)][_0x2bc160[_0x4ae895(0x348)][_0x4ae895(0x32c)]()[_0x4ae895(0x3a6)]()]=_0x2bc160['id'];}else{const _0x5cad3d=_0x174946(_0x194921['$1'])[_0x4ae895(0x435)](',')[_0x4ae895(0x5ec)](_0x272fe9=>_0x43874d(_0x272fe9));if(_0x5cad3d[_0x4ae895(0x367)](_0xb70c0b=>_0x4f0733[_0x4ae895(0x5f9)](_0xb70c0b)))return![];}}return this['_armorIDs'][_0x21271b]||0x0;},DataManager[_0x2b9290(0xe7)]=function(_0x5dcadd){const _0x47698c=_0x2b9290;_0x5dcadd=_0x5dcadd['toUpperCase']()[_0x47698c(0x3a6)](),this[_0x47698c(0x28f)]=this[_0x47698c(0x28f)]||{};if(this[_0x47698c(0x28f)][_0x5dcadd])return this[_0x47698c(0x28f)][_0x5dcadd];for(const _0x745664 of $dataSystem['equipTypes']){_0x47698c(0x5c0)===_0x47698c(0x5c0)?this[_0x47698c(0x28f)][_0x745664[_0x47698c(0x32c)]()['trim']()]=$dataSystem[_0x47698c(0x5ca)][_0x47698c(0x31f)](_0x745664):_0x2f73b5=this[_0x47698c(0x596)]-_0x281a79;}return this[_0x47698c(0x28f)][_0x5dcadd]||0x0;},VisuMZ['ItemsEquipsCore']['SetupProxyItemGroups']=function(){const _0x390c58=_0x2b9290;VisuMZ['ItemsEquipsCore'][_0x390c58(0x49a)]($dataItems),VisuMZ[_0x390c58(0x2d3)]['SetupProxyItemGroup']($dataWeapons),VisuMZ[_0x390c58(0x2d3)][_0x390c58(0x49a)]($dataArmors);},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x49a)]=function(_0x25dde3){const _0xf9bdbd=_0x2b9290;for(const _0x23f965 of _0x25dde3){if(!_0x23f965)continue;if(!DataManager[_0xf9bdbd(0x5cd)](_0x23f965))continue;const _0x4a4184=DataManager['getProxyItem'](_0x23f965),_0x16a027=[_0xf9bdbd(0x348),_0xf9bdbd(0x13b),_0xf9bdbd(0x203)];for(const _0xf1d9b0 of _0x16a027){_0x23f965[_0xf1d9b0]=_0x4a4184[_0xf1d9b0];}}},DataManager[_0x2b9290(0x5cd)]=function(_0x43f789){const _0x3a4524=_0x2b9290;if(!_0x43f789)return![];if(!_0x43f789[_0x3a4524(0x327)])return![];return _0x43f789&&_0x43f789[_0x3a4524(0x327)][_0x3a4524(0x5c2)](/<PROXY:[ ](.*)>/i);},DataManager[_0x2b9290(0x4b7)]=function(_0x116237){const _0x4a8407=_0x2b9290;return this[_0x4a8407(0x5cd)](_0x116237)?this[_0x4a8407(0x273)](_0x116237)||_0x116237:_0x116237;},DataManager[_0x2b9290(0x273)]=function(_0x3fc6b7){const _0x1611f1=_0x2b9290;_0x3fc6b7['note'][_0x1611f1(0x5c2)](/<PROXY:[ ](.*)>/i);const _0x1f9216=RegExp['$1'][_0x1611f1(0x3a6)](),_0x9b0265=/^\d+$/[_0x1611f1(0x4c9)](_0x1f9216);if(this[_0x1611f1(0x3f0)](_0x3fc6b7)){if(_0x1611f1(0x597)!=='iTqjy'){const _0x130e67=_0x9b0265?Number(RegExp['$1']):DataManager[_0x1611f1(0x3ae)](_0x1f9216);return $dataItems[_0x130e67]||_0x3fc6b7;}else{if(_0x5eecbd===_0x556182)return;for(let _0x2e8596=0x0;_0x2e8596<0x8;_0x2e8596++){const _0x209a3f=_0x47c0ff[_0x1611f1(0x2d3)]['RegExp'][_0x1611f1(0x1d6)][_0x2e8596];_0x5855c4[_0x1611f1(0x327)]['match'](_0x209a3f)&&(_0x185610[_0x1611f1(0x517)][_0x2e8596]=_0x2db323(_0x5e2ad3['$1']));}}}else{if(this[_0x1611f1(0x187)](_0x3fc6b7)){const _0x41813e=_0x9b0265?Number(RegExp['$1']):DataManager[_0x1611f1(0x5d7)](_0x1f9216);return $dataWeapons[_0x41813e]||_0x3fc6b7;}else{if(this[_0x1611f1(0x318)](_0x3fc6b7)){if(_0x1611f1(0x3ce)===_0x1611f1(0x3ce)){const _0x1f2430=_0x9b0265?Number(RegExp['$1']):DataManager[_0x1611f1(0x397)](_0x1f9216);return $dataArmors[_0x1f2430]||_0x3fc6b7;}else return _0x1dcfa3[_0x1611f1(0x2d3)][_0x1611f1(0x389)][_0x1611f1(0x38e)][_0x1611f1(0x4ba)];}}}return _0x3fc6b7;},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x100)]=Window_ItemList[_0x2b9290(0x125)][_0x2b9290(0x4d3)],Window_ItemList[_0x2b9290(0x125)][_0x2b9290(0x4d3)]=function(){const _0x11393f=_0x2b9290;if($gameTemp[_0x11393f(0x1d0)])return VisuMZ[_0x11393f(0x2d3)][_0x11393f(0x100)]['call'](this);return DataManager['getProxyItem'](VisuMZ[_0x11393f(0x2d3)][_0x11393f(0x100)][_0x11393f(0x3e9)](this));},Window_ItemList['prototype'][_0x2b9290(0x63a)]=function(){const _0x5145d7=_0x2b9290;return VisuMZ[_0x5145d7(0x2d3)][_0x5145d7(0x100)][_0x5145d7(0x3e9)](this);},VisuMZ[_0x2b9290(0x2d3)]['Window_ShopBuy_item']=Window_ShopBuy[_0x2b9290(0x125)][_0x2b9290(0x4d3)],Window_ShopBuy[_0x2b9290(0x125)][_0x2b9290(0x4d3)]=function(){const _0x1b5466=_0x2b9290;if($gameTemp[_0x1b5466(0x1d0)])return VisuMZ['ItemsEquipsCore'][_0x1b5466(0x610)][_0x1b5466(0x3e9)](this);return DataManager[_0x1b5466(0x4b7)](VisuMZ[_0x1b5466(0x2d3)][_0x1b5466(0x610)]['call'](this));},Window_ShopBuy[_0x2b9290(0x125)][_0x2b9290(0x63a)]=function(){const _0x34c2ff=_0x2b9290;return VisuMZ[_0x34c2ff(0x2d3)][_0x34c2ff(0x610)][_0x34c2ff(0x3e9)](this);},VisuMZ[_0x2b9290(0x2d3)]['Game_Item_setObject']=Game_Item[_0x2b9290(0x125)][_0x2b9290(0x4d9)],Game_Item[_0x2b9290(0x125)][_0x2b9290(0x4d9)]=function(_0x233cc0){const _0x462bb0=_0x2b9290;if(DataManager[_0x462bb0(0x5cd)](_0x233cc0))return;VisuMZ['ItemsEquipsCore'][_0x462bb0(0x139)]['call'](this,_0x233cc0);},VisuMZ[_0x2b9290(0x2d3)]['SetupArtifactItemIDs']=function(){const _0x5dbc76=_0x2b9290;this['artifactIDs']={'partyArtifactIDs':[],'troopArtifactIDs':[]};for(const _0x527601 of $dataArmors){if(_0x5dbc76(0x588)!=='LmSRf'){if(!_0x527601)continue;if(!DataManager['isArtifact'](_0x527601))continue;DataManager[_0x5dbc76(0x4a7)](_0x527601)&&this[_0x5dbc76(0x5a6)]['partyArtifactIDs'][_0x5dbc76(0x52d)](_0x527601['id']);if(DataManager['isTroopArtifact'](_0x527601)){if(_0x5dbc76(0x602)===_0x5dbc76(0x4f1)){const _0x3a4191=_0x5dbc76(0x52e);if(this[_0x5dbc76(0x5be)][_0x3a4191])return this[_0x5dbc76(0x5be)][_0x3a4191];if(this['_item']['damage']['elementId']<=-0x1)return _0x5ced39[_0x5dbc76(0x2d3)][_0x5dbc76(0x389)][_0x5dbc76(0x23e)]['ElementWeapon'];else return this[_0x5dbc76(0x4ae)][_0x5dbc76(0x25d)][_0x5dbc76(0x102)]===0x0?_0x392d14['ItemsEquipsCore'][_0x5dbc76(0x389)][_0x5dbc76(0x23e)][_0x5dbc76(0x3da)]:_0x3e1500[_0x5dbc76(0x5eb)][this['_item'][_0x5dbc76(0x25d)][_0x5dbc76(0x102)]];}else this[_0x5dbc76(0x5a6)][_0x5dbc76(0x465)][_0x5dbc76(0x52d)](_0x527601['id']);}}else this[_0x5dbc76(0x4ae)]===_0x5db531&&this[_0x5dbc76(0x2ef)]();}},DataManager[_0x2b9290(0x427)]=function(_0x585711){const _0x4e6a33=_0x2b9290;if(!this[_0x4e6a33(0x318)](_0x585711))return![];const _0x18d3a7=_0x585711[_0x4e6a33(0x327)];if(!_0x18d3a7)return![];if(_0x18d3a7[_0x4e6a33(0x5c2)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x18d3a7[_0x4e6a33(0x5c2)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x18d3a7['match'](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x18d3a7[_0x4e6a33(0x5c2)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x2b9290(0x4a1)]=function(_0x2d7ff6){const _0x13c4aa=_0x2b9290;if(!this['isArtifact'](_0x2d7ff6))return![];const _0x28ff32=_0x2d7ff6[_0x13c4aa(0x327)];if(!_0x28ff32)return![];if(_0x28ff32[_0x13c4aa(0x5c2)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x28ff32[_0x13c4aa(0x5c2)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x2b9290(0x4a7)]=function(_0x353918){const _0x1455da=_0x2b9290;if(!this['isArtifact'](_0x353918))return![];const _0x582b64=_0x353918[_0x1455da(0x327)];if(!_0x582b64)return![];if(_0x582b64['match'](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x582b64[_0x1455da(0x5c2)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x2b9290(0x3a0)]=function(_0x54ce19){const _0xa13469=_0x2b9290;if(!this[_0xa13469(0x427)](_0x54ce19))return![];const _0x464a9e=_0x54ce19[_0xa13469(0x327)];if(!_0x464a9e)return![];if(_0x464a9e['match'](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x464a9e[_0xa13469(0x5c2)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x27f)]=Game_BattlerBase[_0x2b9290(0x125)][_0x2b9290(0x528)],Game_BattlerBase['prototype'][_0x2b9290(0x528)]=function(_0x3f9793){const _0x163f34=_0x2b9290;if(DataManager[_0x163f34(0x427)](_0x3f9793))return![];if(!DataManager[_0x163f34(0x438)](this,_0x3f9793))return![];if(!DataManager[_0x163f34(0x29f)](this,_0x3f9793))return![];return VisuMZ[_0x163f34(0x2d3)][_0x163f34(0x27f)][_0x163f34(0x3e9)](this,_0x3f9793);},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x42b)]=Game_BattlerBase[_0x2b9290(0x125)][_0x2b9290(0x162)],Game_BattlerBase[_0x2b9290(0x125)][_0x2b9290(0x162)]=function(_0x5695ae){const _0x1f271d=_0x2b9290;this['_allowArtifactParamBase']=!![];const _0x417e2b=VisuMZ[_0x1f271d(0x2d3)][_0x1f271d(0x42b)][_0x1f271d(0x3e9)](this,_0x5695ae);return this[_0x1f271d(0x5f5)]=undefined,_0x417e2b;},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x248)]=Game_Actor[_0x2b9290(0x125)][_0x2b9290(0x21a)],Game_Actor['prototype'][_0x2b9290(0x21a)]=function(){const _0x1b0bea=_0x2b9290;this[_0x1b0bea(0x456)]=!![];const _0x58eb62=VisuMZ['ItemsEquipsCore'][_0x1b0bea(0x248)]['call'](this);return this[_0x1b0bea(0x456)]=undefined,_0x58eb62;},VisuMZ[_0x2b9290(0x2d3)]['Game_Actor_equips_artifacts']=Game_Actor[_0x2b9290(0x125)][_0x2b9290(0x5d5)],Game_Actor[_0x2b9290(0x125)][_0x2b9290(0x5d5)]=function(){const _0x79ffb7=_0x2b9290,_0x313e48=VisuMZ[_0x79ffb7(0x2d3)][_0x79ffb7(0x62d)]['call'](this);if(this[_0x79ffb7(0x456)]||this[_0x79ffb7(0x5f5)]){if(_0x79ffb7(0x546)===_0x79ffb7(0x546)){const _0x261187=_0x313e48['concat']($gameParty[_0x79ffb7(0x56c)]());return _0x261187;}else{const _0x2094c7=_0x79ffb7(0x182);if(this['_customItemInfo'][_0x2094c7])return this[_0x79ffb7(0x5be)][_0x2094c7];let _0x3f5bdf='';return _0x3f5bdf+='%1'[_0x79ffb7(0x46a)](this[_0x79ffb7(0x2d5)][_0x79ffb7(0x551)]),_0x3f5bdf;}}else{if('kzhhN'===_0x79ffb7(0x1df))_0x17c25d[_0x79ffb7(0x125)]['isRightInputMode'][_0x79ffb7(0x3e9)](this);else return _0x313e48;}},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x1ac)]=Game_BattlerBase[_0x2b9290(0x125)]['paramPlus'],Game_BattlerBase[_0x2b9290(0x125)][_0x2b9290(0x486)]=function(_0x25366e){const _0x1bb169=_0x2b9290;let _0x300cbe=VisuMZ[_0x1bb169(0x2d3)]['Game_BattlerBase_paramPlus_artifact'][_0x1bb169(0x3e9)](this,_0x25366e);if(this['constructor']===Game_Enemy)for(const _0x2ef0f5 of $gameParty['troopArtifacts']()){if(_0x2ef0f5)_0x300cbe+=_0x2ef0f5[_0x1bb169(0x517)][_0x25366e];}return _0x300cbe;},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x620)]=Game_Enemy[_0x2b9290(0x125)]['traitObjects'],Game_Enemy[_0x2b9290(0x125)][_0x2b9290(0x21a)]=function(){const _0x2dc1bf=_0x2b9290;let _0x451bbc=VisuMZ['ItemsEquipsCore'][_0x2dc1bf(0x620)][_0x2dc1bf(0x3e9)](this);return _0x451bbc[_0x2dc1bf(0x5cb)]($gameParty['troopArtifacts']());},VisuMZ['ItemsEquipsCore']['Game_Party_gainItem_artifact']=Game_Party[_0x2b9290(0x125)][_0x2b9290(0x1f8)],Game_Party[_0x2b9290(0x125)][_0x2b9290(0x1f8)]=function(_0x1dbebf,_0x263eb3,_0x1f90c8){const _0x3c3316=_0x2b9290;VisuMZ[_0x3c3316(0x2d3)][_0x3c3316(0x37a)][_0x3c3316(0x3e9)](this,_0x1dbebf,_0x263eb3,_0x1f90c8);if(DataManager[_0x3c3316(0x427)](_0x1dbebf)){let _0x165f56=$gameParty[_0x3c3316(0x61c)]();if($gameParty[_0x3c3316(0x3fb)]())_0x165f56=_0x165f56[_0x3c3316(0x5cb)]($gameTroop['members']());for(const _0x4039cd of _0x165f56){if(!_0x4039cd)continue;_0x4039cd[_0x3c3316(0x612)]={};}}},Game_Party[_0x2b9290(0x125)][_0x2b9290(0x56c)]=function(){const _0x14c36b=_0x2b9290;let _0x270b56=[];const _0x18dcf9=VisuMZ[_0x14c36b(0x2d3)]['artifactIDs'][_0x14c36b(0x1ae)];if(_0x18dcf9)for(const _0x5360ab of _0x18dcf9){const _0x463d09=$dataArmors[_0x5360ab];if(!_0x463d09)continue;if(!this['hasItem'](_0x463d09))continue;let _0x397037=0x1;if(DataManager[_0x14c36b(0x4a1)](_0x463d09))_0x397037=this[_0x14c36b(0x2a2)](_0x463d09);while(_0x397037--)_0x270b56[_0x14c36b(0x52d)](_0x463d09);}return _0x270b56;},Game_Party[_0x2b9290(0x125)][_0x2b9290(0x363)]=function(){const _0x12b97c=_0x2b9290;let _0x140c1a=[];const _0x2855f8=VisuMZ[_0x12b97c(0x2d3)][_0x12b97c(0x5a6)][_0x12b97c(0x465)];if(_0x2855f8){if('sEIsn'!=='sEIsn')return _0x2fb840[_0x12b97c(0x59c)]&&_0x4563d0[_0x12b97c(0x125)][_0x12b97c(0x1a5)][_0x12b97c(0x3e9)](this);else for(const _0x4a138d of _0x2855f8){const _0x58800f=$dataArmors[_0x4a138d];if(!_0x58800f)continue;if(!this[_0x12b97c(0x4c5)](_0x58800f))continue;let _0x5866d3=0x1;if(DataManager[_0x12b97c(0x4a1)](_0x58800f))_0x5866d3=this[_0x12b97c(0x2a2)](_0x58800f);while(_0x5866d3--)_0x140c1a[_0x12b97c(0x52d)](_0x58800f);}}return _0x140c1a;},Game_Party[_0x2b9290(0x125)][_0x2b9290(0x2f2)]=function(){const _0x39e933=_0x2b9290;return this[_0x39e933(0x56c)]()['concat'](this[_0x39e933(0x363)]());},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x1c1)]=Game_Party[_0x2b9290(0x125)][_0x2b9290(0x56b)],Game_Party['prototype'][_0x2b9290(0x56b)]=function(){const _0x52b531=_0x2b9290;VisuMZ['ItemsEquipsCore'][_0x52b531(0x1c1)]['call'](this),this['removeBattleTestArtifacts']();},Game_Party[_0x2b9290(0x125)][_0x2b9290(0x2e8)]=function(){const _0x39e147=_0x2b9290,_0x46e430=$gameParty[_0x39e147(0x2da)]()[_0x39e147(0x538)](_0x72c6b8=>DataManager[_0x39e147(0x427)](_0x72c6b8));for(const _0x44f3d4 of _0x46e430){const _0x417c19=this[_0x39e147(0x2a2)](_0x44f3d4);if(_0x417c19)this[_0x39e147(0x381)](_0x44f3d4,_0x417c19);}},DataManager[_0x2b9290(0x438)]=function(_0x1b7cda,_0x5c61ee){const _0xa3b87=_0x2b9290;if(this[_0xa3b87(0x3f0)](_0x5c61ee))return![];if(!_0x1b7cda)return![];if($gameTemp['_checkEquipRequirements'])return!![];if(BattleManager['isBattleTest']())return!![];const _0x4df7cc=this[_0xa3b87(0x1f4)](_0x5c61ee);if(_0x4df7cc[_0xa3b87(0x40b)]<=0x0)return!![];return _0x4df7cc[_0xa3b87(0x57b)](_0x1b7cda[_0xa3b87(0x329)]()['id']);},DataManager['getClassRequirements']=function(_0x3ee39f){const _0x511912=_0x2b9290;if(!_0x3ee39f)return[];this['_getClassRequirements']=this['_getClassRequirements']||{};const _0x4a537f=_0x511912(0x57f)[_0x511912(0x46a)](this[_0x511912(0x187)](_0x3ee39f)?_0x511912(0x222):_0x511912(0x4ec),_0x3ee39f['id']);if(this[_0x511912(0x199)][_0x4a537f]!==undefined)return this[_0x511912(0x199)][_0x4a537f];let _0x275653=[];const _0x30e033=_0x3ee39f[_0x511912(0x327)]||'';if(_0x30e033[_0x511912(0x5c2)](/<EQUIP FOR CLASS(?:|ES) ONLY:[ ](.*)>/i)){const _0xeca352=String(RegExp['$1'])[_0x511912(0x435)](',')[_0x511912(0x5ec)](_0x2b0ab0=>_0x2b0ab0[_0x511912(0x3a6)]());for(const _0x576e2c of _0xeca352){if(_0x511912(0x16d)===_0x511912(0x56e)){if(!this[_0x511912(0x4ef)]())return![];if(_0x4c8b55[_0x511912(0x37f)][_0x511912(0x2dc)]!==_0x5ec3b5)return![];return _0x26efa1['isTriggered'](_0x511912(0x211))&&(this[_0x511912(0x229)](),_0x4f1898[_0x511912(0x37f)]['commandEquip'](),_0x366d05['_scene'][_0x511912(0x387)]['smoothSelect'](-0x1)),![];}else{const _0x59db53=/^\d+$/[_0x511912(0x4c9)](_0x576e2c);if(_0x59db53)_0x511912(0x5b1)!==_0x511912(0x2c4)?_0x275653[_0x511912(0x52d)](Number(_0x576e2c)):_0x2e339d=_0x511912(0x128)[_0x511912(0x46a)](_0x3e5d5a['id']);else{if(_0x511912(0xef)==='ulIKI')_0x275653['push'](DataManager['getClassIdWithName'](_0x576e2c));else return;}}}}return this[_0x511912(0x199)][_0x4a537f]=_0x275653,this[_0x511912(0x199)][_0x4a537f];},DataManager[_0x2b9290(0x29f)]=function(_0x2cb90e,_0x1075ea){const _0x6ad393=_0x2b9290;if(this[_0x6ad393(0x3f0)](_0x1075ea))return![];if(!_0x2cb90e)return![];if($gameTemp[_0x6ad393(0x5b8)])return!![];if(BattleManager[_0x6ad393(0x27d)]())return!![];const _0x14412a=this[_0x6ad393(0x11d)](_0x1075ea);for(const _0x2d642c of _0x14412a){if(_0x6ad393(0x1a4)!==_0x6ad393(0x561)){if(!this[_0x6ad393(0x404)](_0x2cb90e,_0x2d642c))return![];}else{if(this[_0x6ad393(0x362)]()!==0x0)return![];const _0x10cf61=_0xdc17f3[_0x6ad393(0x2d3)]['Settings']['EquipScene'];if(!_0x10cf61[_0x6ad393(0x3d3)]&&!_0x10cf61[_0x6ad393(0x60d)])return![];return _0x3e46da['isTriggered']('up');}}return!![];},DataManager['getEquipRequirements']=function(_0x128418){const _0x33db65=_0x2b9290;if(!_0x128418)return[];this['_getEquipRequirements']=this[_0x33db65(0x3fc)]||{};const _0x42bece=_0x33db65(0x57f)['format'](this[_0x33db65(0x187)](_0x128418)?'WEAPON':_0x33db65(0x4ec),_0x128418['id']);if(this['_getEquipRequirements'][_0x42bece]!==undefined)return this[_0x33db65(0x3fc)][_0x42bece];let _0x4d4f5f=[];const _0x261831=_0x128418['note']||'';return _0x261831[_0x33db65(0x5c2)](/<EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>\s*([\s\S]*)\s*<\/EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>/i)&&(_0x4d4f5f=String(RegExp['$1'])[_0x33db65(0x435)](/[\r\n]+/)),this['_getEquipRequirements'][_0x42bece]=_0x4d4f5f,this[_0x33db65(0x3fc)][_0x42bece];},DataManager[_0x2b9290(0x404)]=function(_0x2a0dab,_0x4c1a61){const _0x48c287=_0x2b9290;if(_0x4c1a61[_0x48c287(0x5c2)](/(?:LEVEL|LV|LVL)[ ](>|>=|===|<=|<)[ ](\d+)/i)){if('ajzVT'!=='ajzVT'){const _0x412807=_0xf76c96(_0x56bfb1['$1'])||0x1;if(_0x376d49>=_0x412807)return!![];}else{const _0xed137b=String(RegExp['$1'])[_0x48c287(0x3a6)](),_0x175906=Number(RegExp['$2']);switch(_0xed137b){case'>':return _0x2a0dab[_0x48c287(0x2fc)]>_0x175906;case'>=':return _0x2a0dab[_0x48c287(0x2fc)]>=_0x175906;case _0x48c287(0x3e0):return _0x2a0dab['level']===_0x175906;case'<=':return _0x2a0dab['level']<=_0x175906;case'<':return _0x2a0dab[_0x48c287(0x2fc)]<_0x175906;}return![];}}if(_0x4c1a61[_0x48c287(0x5c2)](/(MAXHP|MAXMP|MHP|MMP)[ ](>|>=|===|<=|<)[ ](\d+)/i)){if('IJuoT'!==_0x48c287(0x3ac)){if(!this[_0x48c287(0x33c)][_0x4d0d2a])this[_0x48c287(0x33c)][_0x2f465a]=new _0x42b69f();}else{const _0x9cd2af=String(RegExp['$1'])['toLowerCase']()[_0x48c287(0x3a6)](),_0x1cc4c2=String(RegExp['$2'])[_0x48c287(0x3a6)](),_0x538887=Number(RegExp['$3']);let _0x542b61=0x0;if([_0x48c287(0x286),_0x48c287(0x4e8)][_0x48c287(0x57b)](_0x9cd2af))_0x542b61=0x1;const _0x409acb=_0x2a0dab[_0x48c287(0x4bc)][_0x542b61]||0x0;switch(_0x1cc4c2){case'>':return _0x2a0dab[_0x48c287(0xe9)](_0x542b61)+_0x409acb>_0x538887;case'>=':return _0x2a0dab[_0x48c287(0xe9)](_0x542b61)+_0x409acb>=_0x538887;case _0x48c287(0x3e0):return _0x2a0dab[_0x48c287(0xe9)](_0x542b61)+_0x409acb===_0x538887;case'<=':return _0x2a0dab[_0x48c287(0xe9)](_0x542b61)+_0x409acb<=_0x538887;case'<':return _0x2a0dab[_0x48c287(0xe9)](_0x542b61)+_0x409acb<_0x538887;}return![];}}if(_0x4c1a61['match'](/(ATK|DEF|MAT|MDF|AGI|LUK)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0x156717=String(RegExp['$1'])[_0x48c287(0x2f6)]()[_0x48c287(0x3a6)](),_0x402833=String(RegExp['$2'])['trim'](),_0x158411=Number(RegExp['$3']),_0xce064d=[_0x48c287(0x205),_0x48c287(0x57a),'mat',_0x48c287(0x357),_0x48c287(0x2ae),_0x48c287(0x1e8)];let _0x58701d=_0xce064d[_0x48c287(0x31f)](_0x156717)+0x2;if(_0x58701d<0x2)return![];const _0x565da8=_0x2a0dab[_0x48c287(0x4bc)][_0x58701d]||0x0;switch(_0x402833){case'>':return _0x2a0dab[_0x48c287(0xe9)](_0x58701d)+_0x565da8>_0x158411;case'>=':return _0x2a0dab[_0x48c287(0xe9)](_0x58701d)+_0x565da8>=_0x158411;case _0x48c287(0x3e0):return _0x2a0dab[_0x48c287(0xe9)](_0x58701d)+_0x565da8===_0x158411;case'<=':return _0x2a0dab[_0x48c287(0xe9)](_0x58701d)+_0x565da8<=_0x158411;case'<':return _0x2a0dab[_0x48c287(0xe9)](_0x58701d)+_0x565da8<_0x158411;}return![];}if(_0x4c1a61['match'](/LEARNED SKILL:[ ](\d+)/i)){if(_0x48c287(0x1f1)===_0x48c287(0x154))_0x2c8f43='weapon-%1'[_0x48c287(0x46a)](_0x4f297d['id']);else{const _0x17b6f7=Number(RegExp['$1']);return _0x2a0dab['isLearnedSkill'](_0x17b6f7);}}else{if(_0x4c1a61[_0x48c287(0x5c2)](/LEARNED SKILL:[ ](.*)/i)){const _0x536585=String(RegExp['$1']),_0x38a806=this[_0x48c287(0x30c)](_0x536585);return _0x2a0dab[_0x48c287(0x1fb)](_0x38a806);}}if(_0x4c1a61[_0x48c287(0x5c2)](/SWITCH:[ ](\d+)/i)){if('JaHqS'!==_0x48c287(0x437))return null;else{const _0x57dd85=Number(RegExp['$1']);return $gameSwitches[_0x48c287(0x5f9)](_0x57dd85);}}return!![];},DataManager[_0x2b9290(0x148)]=function(_0x5a276e){const _0x23713a=_0x2b9290;return this['isArmor'](_0x5a276e)?this[_0x23713a(0x3f8)](_0x5a276e):_0x23713a(0xed)==='IiwJI'?[_0x5a276e[_0x23713a(0x61d)]||0x0]:_0x5b07da[_0x298524['id']][_0x23713a(0x3e9)](this,_0x10e625);},DataManager[_0x2b9290(0x3f8)]=function(_0x285501){const _0x50fe08=_0x2b9290;this['_cache_etypeIDs']=this[_0x50fe08(0x630)]||{};if(this[_0x50fe08(0x630)][_0x285501['id']]!==undefined)return _0x50fe08(0x20e)!==_0x50fe08(0x4e7)?this['_cache_etypeIDs'][_0x285501['id']]:_0x553f5b[_0x50fe08(0x2d3)]['Settings'][_0x50fe08(0x23e)]['LabelConsume'];this[_0x50fe08(0x630)][_0x285501['id']]=[_0x285501[_0x50fe08(0x61d)]||0x0];const _0x4d0288=_0x285501[_0x50fe08(0x327)]||'';if(_0x4d0288[_0x50fe08(0x5c2)](/<ADDED ETYPE(?:|S):[ ](.*)>/i)){if(_0x50fe08(0x4b0)===_0x50fe08(0x3c7))return'100%';else{const _0x11bc4c=String(RegExp['$1'])[_0x50fe08(0x435)](',')['map'](_0xc4bbb5=>_0xc4bbb5[_0x50fe08(0x3a6)]());for(const _0x34e6a5 of _0x11bc4c){if(_0x50fe08(0x57c)!==_0x50fe08(0x57c)){const _0x3ee478='<%1:[\x20]([\x5c+\x5c-]\x5cd+)>'[_0x50fe08(0x46a)](_0x59ae1d);_0x1cbf71['ItemsEquipsCore']['RegExp'][_0x50fe08(0x1d6)][_0x50fe08(0x52d)](new _0x2c8ee6(_0x3ee478,'i'));const _0x5edc8e=_0x50fe08(0x386)[_0x50fe08(0x46a)](_0x5ed5d7);_0xd41097[_0x50fe08(0x2d3)][_0x50fe08(0x347)]['BorderRegExp'][_0x50fe08(0x52d)](new _0x218eed(_0x5edc8e,'g'));}else{const _0x3fd02c=/^\d+$/[_0x50fe08(0x4c9)](_0x34e6a5);let _0x40d784=0x0;_0x3fd02c?_0x40d784=Number(_0x34e6a5):_0x40d784=this[_0x50fe08(0xe7)](_0x34e6a5);if(_0x40d784>0x1){if(_0x50fe08(0xf0)===_0x50fe08(0xf0))this[_0x50fe08(0x630)][_0x285501['id']]['push'](_0x40d784);else return _0x5c48ff['status']&&_0x8398d1[_0x50fe08(0x203)]['includes']('['+_0x11585d+']');}}}}}return this[_0x50fe08(0x630)][_0x285501['id']];},Game_BattlerBase[_0x2b9290(0x125)][_0x2b9290(0x31d)]=function(_0x14e3b2){const _0x2a6d8a=_0x2b9290;return this['isEquipAtypeOk'](_0x14e3b2[_0x2a6d8a(0x469)])&&!this[_0x2a6d8a(0x333)](_0x14e3b2['etypeId'])&&DataManager['getEtypeIDs'](_0x14e3b2)[_0x2a6d8a(0x367)](_0x2bcc95=>!this[_0x2a6d8a(0x333)](_0x2bcc95));},TextManager[_0x2b9290(0x24a)]={'helpDesc':{'equip':VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x389)][_0x2b9290(0x172)][_0x2b9290(0xea)]??_0x2b9290(0x2c6),'optimize':VisuMZ['ItemsEquipsCore'][_0x2b9290(0x389)][_0x2b9290(0x172)][_0x2b9290(0x22c)]??_0x2b9290(0x200),'clear':VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x389)]['EquipScene'][_0x2b9290(0x3c0)]??'Remove\x20all\x20available\x20equipment.'}},ColorManager[_0x2b9290(0x177)]=function(_0x4f2aad){const _0x6601a2=_0x2b9290;if(!_0x4f2aad)return this[_0x6601a2(0x151)]();else{if(_0x4f2aad[_0x6601a2(0x327)][_0x6601a2(0x5c2)](/<COLOR:[ ](\d+)>/i))return this[_0x6601a2(0x523)](Number(RegExp['$1'])[_0x6601a2(0x5b3)](0x0,0x1f));else{if(_0x4f2aad[_0x6601a2(0x327)][_0x6601a2(0x5c2)](/<COLOR:[ ]#(.*)>/i))return'#'+String(RegExp['$1']);else{if(_0x6601a2(0xf5)==='lndoV')this['addShopTrackingItem']('buy',_0x6601a2(0x26d),_0x488d0a);else return this['normalColor']();}}}},ColorManager[_0x2b9290(0x589)]=function(_0x1f53e0){const _0x2df9fa=_0x2b9290;_0x1f53e0=String(_0x1f53e0);if(_0x1f53e0[_0x2df9fa(0x5c2)](/#(.*)/i)){if(_0x2df9fa(0x353)===_0x2df9fa(0x353))return _0x2df9fa(0x351)['format'](String(RegExp['$1']));else _0x2052fa[_0x2df9fa(0x272)](_0x2df9fa(0x568))&&!_0x1b89d2[_0x2df9fa(0x570)]('shift')&&this['cursorRight'](_0x173eb5[_0x2df9fa(0x518)](_0x2df9fa(0x568))),_0x3d97e0[_0x2df9fa(0x272)](_0x2df9fa(0x15e))&&!_0x3531f7['isPressed'](_0x2df9fa(0x4cf))&&this[_0x2df9fa(0x585)](_0x1b7fc4[_0x2df9fa(0x518)](_0x2df9fa(0x15e)));}else return this[_0x2df9fa(0x523)](Number(_0x1f53e0));},SceneManager[_0x2b9290(0x3fd)]=function(){const _0x80dadf=_0x2b9290;return this[_0x80dadf(0x37f)]&&this[_0x80dadf(0x37f)][_0x80dadf(0x2dc)]===Scene_Shop;},Game_Temp[_0x2b9290(0x125)][_0x2b9290(0x263)]=function(){const _0x205f1a=_0x2b9290;if(this[_0x205f1a(0x175)])return![];return VisuMZ[_0x205f1a(0x2d3)][_0x205f1a(0x389)][_0x205f1a(0x553)][_0x205f1a(0x395)];},VisuMZ[_0x2b9290(0x48d)]=VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x389)]['StatusWindow'][_0x2b9290(0x359)],VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x40d)]=Game_BattlerBase[_0x2b9290(0x125)]['param'],Game_BattlerBase[_0x2b9290(0x125)][_0x2b9290(0x162)]=function(_0x540631){const _0x310117=_0x2b9290;if(this[_0x310117(0x399)]){if('RPZRp'!==_0x310117(0x462)){if(!this[_0x310117(0x17a)]())return;const _0x25fe8a=this['commandStyle'](),_0x21b9e1=_0x5379e9[_0x310117(0x2d3)][_0x310117(0x389)][_0x310117(0x172)][_0x310117(0x379)],_0x52dff7=_0x25fe8a===_0x310117(0xf2)?_0xae114b[_0x310117(0x4f5)]:_0x310117(0x1ab)[_0x310117(0x46a)](_0x21b9e1,_0x33bc63['clear']),_0x1cb6a0=this[_0x310117(0x239)]();this[_0x310117(0x25f)](_0x52dff7,'clear',_0x1cb6a0);}else return this[_0x310117(0x4aa)]?VisuMZ[_0x310117(0x48d)]:0x1;}else{if(_0x310117(0x45c)===_0x310117(0x18f)){_0x320578['prototype'][_0x310117(0x185)]['call'](this);if(this[_0x310117(0x114)]&&this[_0x310117(0x169)]&&this[_0x310117(0x5fe)]>=0x0){const _0x4b8718=_0x1ae6b8[_0x310117(0x2cb)](this['_actor']);_0x4b8718[_0x310117(0x1bb)]=!![],_0x4b8718[_0x310117(0x1e4)](this[_0x310117(0x5fe)],this[_0x310117(0x4d3)]()),this[_0x310117(0x169)]['setTempActor'](_0x4b8718);}}else return VisuMZ[_0x310117(0x2d3)][_0x310117(0x40d)][_0x310117(0x3e9)](this,_0x540631);}},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x331)]=Game_BattlerBase['prototype'][_0x2b9290(0x45b)],Game_BattlerBase[_0x2b9290(0x125)][_0x2b9290(0x45b)]=function(_0x145030){const _0xd9437c=_0x2b9290;if(!_0x145030)return![];if(!VisuMZ[_0xd9437c(0x2d3)][_0xd9437c(0x331)]['call'](this,_0x145030))return![];if(!this['meetsItemConditionsNotetags'](_0x145030))return![];if(!this[_0xd9437c(0x266)](_0x145030))return![];return!![];},Game_BattlerBase['prototype'][_0x2b9290(0x578)]=function(_0x35cdf5){const _0x29cbbd=_0x2b9290;if(!this[_0x29cbbd(0x421)](_0x35cdf5))return![];return!![];},Game_BattlerBase[_0x2b9290(0x125)][_0x2b9290(0x421)]=function(_0x19e6f2){const _0x34e675=_0x2b9290,_0xcf444a=_0x19e6f2[_0x34e675(0x327)];if(_0xcf444a['match'](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x34e675(0x531)===_0x34e675(0x531)){const _0xa8fcfa=JSON['parse']('['+RegExp['$1'][_0x34e675(0x5c2)](/\d+/g)+']');for(const _0x4f9ebd of _0xa8fcfa){if('pdlPb'!==_0x34e675(0x4af)){if(!$gameSwitches[_0x34e675(0x5f9)](_0x4f9ebd))return![];}else return _0x15a327[_0x34e675(0x2d3)][_0x34e675(0x389)][_0x34e675(0x44f)][_0x34e675(0x4be)];}return!![];}else this[_0x34e675(0x311)][_0x34e675(0xf9)](this[_0x34e675(0x311)][_0x34e675(0x31f)](_0x3409e3),0x1);}if(_0xcf444a[_0x34e675(0x5c2)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2915c3=JSON[_0x34e675(0x507)]('['+RegExp['$1'][_0x34e675(0x5c2)](/\d+/g)+']');for(const _0x1f9986 of _0x2915c3){if(!$gameSwitches['value'](_0x1f9986))return![];}return!![];}if(_0xcf444a[_0x34e675(0x5c2)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x34e675(0x41d)===_0x34e675(0x307))_0x4925e0['ItemsEquipsCore'][_0x34e675(0x2b4)][_0x34e675(0x3e9)](this),this[_0x34e675(0x4e9)]()&&this['postCreateItemsEquipsCore'](),this[_0x34e675(0x27a)]();else{const _0x3cca21=JSON[_0x34e675(0x507)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4fa033 of _0x3cca21){if('UzQkO'!==_0x34e675(0x403))_0x3d4ba6['_bypassProxy']=!![],_0x4c382d[_0x34e675(0x2d3)][_0x34e675(0x39d)][_0x34e675(0x3e9)](this),_0x57ff5c['_bypassProxy']=![],this[_0x34e675(0x4ae)]=this[_0x34e675(0x112)][_0x34e675(0x4d3)]();else{if($gameSwitches[_0x34e675(0x5f9)](_0x4fa033))return!![];}}return![];}}if(_0xcf444a['match'](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xd4e65d=JSON['parse']('['+RegExp['$1'][_0x34e675(0x5c2)](/\d+/g)+']');for(const _0x54dda4 of _0xd4e65d){if(!$gameSwitches[_0x34e675(0x5f9)](_0x54dda4))return!![];}return![];}if(_0xcf444a['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x53dc98=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x22ce7b of _0x53dc98){if(!$gameSwitches[_0x34e675(0x5f9)](_0x22ce7b))return!![];}return![];}if(_0xcf444a[_0x34e675(0x5c2)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x34e675(0x43a)!==_0x34e675(0x276)){const _0x333369=JSON[_0x34e675(0x507)]('['+RegExp['$1'][_0x34e675(0x5c2)](/\d+/g)+']');for(const _0x3fd532 of _0x333369){if(_0x34e675(0x45f)===_0x34e675(0x53a)){if(_0xddacd1[_0x34e675(0x5cd)](_0x3afba6))_0x12d3c2=_0x43c825[_0x34e675(0x4b7)](_0x2dec2b);return _0x1c0737['maxItemAmount'](_0x58a126);}else{if($gameSwitches[_0x34e675(0x5f9)](_0x3fd532))return![];}}return!![];}else _0x5bbc27[_0x34e675(0x125)][_0x34e675(0x2e7)][_0x34e675(0x3e9)](this);}return!![];},Game_BattlerBase[_0x2b9290(0x125)]['meetsItemConditionsJS']=function(_0x5a8934){const _0x1aed7d=_0x2b9290,_0x4f142a=_0x5a8934[_0x1aed7d(0x327)],_0x4c2066=VisuMZ[_0x1aed7d(0x2d3)]['itemEnableJS'];return _0x4c2066[_0x5a8934['id']]?_0x1aed7d(0x373)===_0x1aed7d(0xe8)?_0x238029['VisuMZ_0_CoreEngine']?_0x58944d[_0x1aed7d(0x191)]['Settings']['Param'][_0x1aed7d(0x337)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7]:_0x4c2066[_0x5a8934['id']]['call'](this,_0x5a8934):!![];},Game_Actor['prototype']['initEquips']=function(_0x4d351b){const _0x1d6072=_0x2b9290;_0x4d351b=this[_0x1d6072(0x4fc)](_0x4d351b);const _0x1f7183=this[_0x1d6072(0x342)]();this[_0x1d6072(0x33c)]=[];for(let _0x4e2675=0x0;_0x4e2675<_0x1f7183[_0x1d6072(0x40b)];_0x4e2675++){'cpfYI'!==_0x1d6072(0x512)?this[_0x1d6072(0x33c)][_0x4e2675]=new Game_Item():(_0x40088b[_0x1d6072(0x2d3)][_0x1d6072(0x2bf)][_0x1d6072(0x3e9)](this),this[_0x1d6072(0x4e9)]()&&this['onCategoryCancelItemsEquipsCore']());}for(let _0x4d2900=0x0;_0x4d2900<_0x1f7183[_0x1d6072(0x40b)];_0x4d2900++){if('XVUcZ'===_0x1d6072(0x509)){const _0x3081cc=_0x1f7183[_0x4d2900],_0x2321c9=this[_0x1d6072(0x237)](_0x4d351b,_0x3081cc);if(this['canEquip'](_0x2321c9))this[_0x1d6072(0x33c)][_0x4d2900]['setObject'](_0x2321c9);}else _0x4a3eaf=_0x5f08f6['armorTypes'][_0x5f5aff(_0x3c2fb8['$1'])]||'';}this[_0x1d6072(0x119)](!![]),this['refresh']();},Game_Actor[_0x2b9290(0x125)][_0x2b9290(0x4fc)]=function(_0x281fdf){const _0x13fee9=_0x2b9290,_0x345436=[];for(let _0x291d7e=0x0;_0x291d7e<_0x281fdf[_0x13fee9(0x40b)];_0x291d7e++){if(_0x13fee9(0x28b)===_0x13fee9(0x44a))return this[_0x13fee9(0x3fc)][_0x4b0ab9];else{const _0x50a962=_0x281fdf[_0x291d7e];if(_0x50a962<=0x0)continue;const _0x3343fa=$dataSystem[_0x13fee9(0x5ca)][_0x291d7e+0x1];if(_0x3343fa===$dataSystem['equipTypes'][0x1]||_0x291d7e===0x1&&this[_0x13fee9(0x1c2)]())_0x345436[_0x13fee9(0x52d)]($dataWeapons[_0x50a962]);else{if(BattleManager[_0x13fee9(0x27d)]()){if(_0x13fee9(0x170)!==_0x13fee9(0x59a)){const _0x3bb299=$dataArmors[_0x50a962];if(_0x3bb299&&_0x3bb299[_0x13fee9(0x61d)]===_0x291d7e+0x1){if('yOBQR'===_0x13fee9(0x246))_0x345436[_0x13fee9(0x52d)](_0x3bb299);else return _0x34a2b6['getInputButtonString']('shift');}}else this['_categoryWindow'][_0x13fee9(0x62e)]();}else{const _0x4e0277=$dataArmors[_0x50a962];_0x4e0277&&_0x4e0277['etypeId']===_0x291d7e+0x1&&_0x345436[_0x13fee9(0x52d)](_0x4e0277);}}}}return _0x345436;},Game_Actor[_0x2b9290(0x125)][_0x2b9290(0x237)]=function(_0x222e3c,_0x4958eb){const _0x3e4be3=_0x2b9290;for(const _0x7ed40b of _0x222e3c){if(!_0x7ed40b)continue;if(_0x7ed40b[_0x3e4be3(0x61d)]===_0x4958eb)return _0x222e3c[_0x3e4be3(0xf9)](_0x222e3c[_0x3e4be3(0x31f)](_0x7ed40b),0x1),_0x7ed40b;}return null;},Game_Actor[_0x2b9290(0x125)][_0x2b9290(0x342)]=function(){const _0x2f6827=_0x2b9290,_0x53ccae=VisuMZ[_0x2f6827(0x2d3)]['deepCopy'](this['_forcedSlots']||this[_0x2f6827(0x329)]()[_0x2f6827(0x342)]);if(_0x53ccae[_0x2f6827(0x40b)]>=0x2&&this[_0x2f6827(0x1c2)]())_0x53ccae[0x1]=0x1;return _0x53ccae;},Game_Actor[_0x2b9290(0x125)][_0x2b9290(0x330)]=function(_0x403bea){const _0x2ebcc0=_0x2b9290;_0x403bea['remove'](0x0),_0x403bea['remove'](-0x1),this[_0x2ebcc0(0x4bd)]=_0x403bea,this[_0x2ebcc0(0x2ef)](),this['updateChangedSlots']();},Game_Actor[_0x2b9290(0x125)]['forceResetEquipSlots']=function(){const _0x4bb364=_0x2b9290;this['_forcedSlots']=undefined,this[_0x4bb364(0x2ef)](),this[_0x4bb364(0x146)]();},Game_Actor[_0x2b9290(0x125)]['updateChangedSlots']=function(){const _0x56576d=_0x2b9290;let _0x550a44=this['equipSlots']()[_0x56576d(0x40b)];while(this[_0x56576d(0x33c)][_0x56576d(0x40b)]>_0x550a44){if(_0x56576d(0x1a7)===_0x56576d(0x1a7)){const _0x658657=this[_0x56576d(0x33c)][this[_0x56576d(0x33c)][_0x56576d(0x40b)]-0x1];_0x658657&&_0x658657['object']()&&(_0x56576d(0x607)!==_0x56576d(0x62a)?$gameParty['gainItem'](_0x658657[_0x56576d(0x396)](),0x1):this[_0x56576d(0x2e9)]()),this[_0x56576d(0x33c)][_0x56576d(0x3e1)]();}else{if(!_0x4a3c39)return 0x0;let _0x31a197=_0x162d9b[_0x56576d(0x2d3)][_0x56576d(0x39b)][_0x56576d(0x3e9)](this,_0x438e75);return _0x29cf3c[_0x56576d(0x224)](0x0,this[_0x56576d(0x5b5)](_0x276f8a,_0x31a197));}}while(_0x550a44>this[_0x56576d(0x33c)][_0x56576d(0x40b)]){this[_0x56576d(0x33c)]['push'](new Game_Item());}},Game_Actor['prototype'][_0x2b9290(0x349)]=function(){const _0x18680d=_0x2b9290,_0xb6bb44=this[_0x18680d(0x342)]();for(let _0x189578=0x0;_0x189578<_0xb6bb44[_0x18680d(0x40b)];_0x189578++){if(_0x18680d(0x587)===_0x18680d(0x5d4))_0x134bd9[_0x18680d(0x2d3)][_0x18680d(0x3a2)]['call'](this),this[_0x18680d(0x1a5)]()&&this[_0x18680d(0x166)](),this[_0x18680d(0x14f)]()&&this['createStatusWindow']();else{if(!this[_0x18680d(0x33c)][_0x189578])this[_0x18680d(0x33c)][_0x189578]=new Game_Item();}}this[_0x18680d(0x119)](![]),this[_0x18680d(0x2ef)]();},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x361)]=Game_Actor[_0x2b9290(0x125)]['changeEquip'],Game_Actor[_0x2b9290(0x125)][_0x2b9290(0x46f)]=function(_0x181321,_0x391790){const _0x4cb04f=_0x2b9290;if(!this[_0x4cb04f(0x1bb)]){const _0x4ddc1e=JsonEx[_0x4cb04f(0x2cb)](this);_0x4ddc1e[_0x4cb04f(0x1bb)]=!![],this[_0x4cb04f(0x449)](_0x181321,_0x391790),this['equipAdjustHpMp'](_0x4ddc1e);}else{if('XaYdL'===_0x4cb04f(0x4cb))this[_0x4cb04f(0x449)](_0x181321,_0x391790);else return this[_0x4cb04f(0x37f)]&&this['_scene'][_0x4cb04f(0x2dc)]===_0x56c5a7;}},Game_Actor['prototype'][_0x2b9290(0x449)]=function(_0x5f3c27,_0x25e455){const _0x16c258=_0x2b9290;if(!this['tradeItemWithParty'](_0x25e455,this['equips']()[_0x5f3c27]))return;if(_0x25e455){const _0xa0ef83=DataManager['getEtypeIDs'](_0x25e455);if(!_0xa0ef83[_0x16c258(0x57b)](this[_0x16c258(0x342)]()[_0x5f3c27]))return;}this[_0x16c258(0x33c)][_0x5f3c27]['setObject'](_0x25e455),this[_0x16c258(0x2ef)]();},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x355)]=Game_Actor[_0x2b9290(0x125)]['forceChangeEquip'],Game_Actor[_0x2b9290(0x125)][_0x2b9290(0x1e4)]=function(_0x590d28,_0x1237fd){const _0x2838eb=_0x2b9290;if(!this[_0x2838eb(0x1bb)]){const _0x15beb3=JsonEx[_0x2838eb(0x2cb)](this);_0x15beb3[_0x2838eb(0x1bb)]=!![],VisuMZ['ItemsEquipsCore']['Game_Actor_forceChangeEquip'][_0x2838eb(0x3e9)](this,_0x590d28,_0x1237fd),this[_0x2838eb(0x186)](_0x15beb3);}else _0x2838eb(0x1e5)!==_0x2838eb(0x46e)?VisuMZ[_0x2838eb(0x2d3)][_0x2838eb(0x355)]['call'](this,_0x590d28,_0x1237fd):this['_money']=_0x3c00e3['_scene'][_0x2838eb(0x57d)]();},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x325)]=Game_Actor[_0x2b9290(0x125)][_0x2b9290(0x487)],Game_Actor['prototype'][_0x2b9290(0x487)]=function(_0x235b3a){const _0x39f86f=_0x2b9290;if(!this[_0x39f86f(0x1bb)]){if(_0x39f86f(0x36d)!==_0x39f86f(0x5a2)){const _0x3f348a=JsonEx['makeDeepCopy'](this);_0x3f348a[_0x39f86f(0x1bb)]=!![],VisuMZ['ItemsEquipsCore'][_0x39f86f(0x325)]['call'](this,_0x235b3a),this[_0x39f86f(0x186)](_0x3f348a);}else this[_0x39f86f(0x33c)][_0x373428]=new _0x2be40b();}else VisuMZ[_0x39f86f(0x2d3)][_0x39f86f(0x325)][_0x39f86f(0x3e9)](this,_0x235b3a);},Game_Actor['prototype'][_0x2b9290(0x119)]=function(_0x587e5b){const _0x4f05b6=_0x2b9290;if(this['_bypassReleaseUnequippableItemsItemsEquipsCore'])return;for(;;){const _0x408104=this[_0x4f05b6(0x342)](),_0x49a379=this[_0x4f05b6(0x5d5)](),_0x15e3a8=_0x49a379['length'];let _0x2f4456=![];for(let _0x446365=0x0;_0x446365<_0x15e3a8;_0x446365++){const _0x23422f=_0x49a379[_0x446365];if(!_0x23422f)continue;const _0x2391da=DataManager[_0x4f05b6(0x148)](_0x23422f);if(!this[_0x4f05b6(0x528)](_0x23422f)||!_0x2391da['includes'](_0x408104[_0x446365])){if(!_0x587e5b){if(_0x4f05b6(0x4d0)!==_0x4f05b6(0x26c))this[_0x4f05b6(0xe1)](null,_0x23422f);else return this['_getClassRequirements'][_0x3355fa];}if(!this['_tempActor']){const _0x5dd706=JsonEx[_0x4f05b6(0x2cb)](this);_0x5dd706[_0x4f05b6(0x1bb)]=!![],this['_equips'][_0x446365]['setObject'](null),this[_0x4f05b6(0x4ac)]=!![],this[_0x4f05b6(0x186)](_0x5dd706),this[_0x4f05b6(0x4ac)]=undefined;}else this[_0x4f05b6(0x33c)][_0x446365][_0x4f05b6(0x4d9)](null);_0x2f4456=!![];}}if(!_0x2f4456)break;}},Game_Actor[_0x2b9290(0x125)]['equipAdjustHpMp']=function(_0x44b3d2){const _0x9eb6d3=_0x2b9290;if(this[_0x9eb6d3(0x1bb)])return;if(!VisuMZ['ItemsEquipsCore'][_0x9eb6d3(0x389)][_0x9eb6d3(0x172)][_0x9eb6d3(0x2dd)])return;const _0x1b9221=Math[_0x9eb6d3(0xf7)](_0x44b3d2[_0x9eb6d3(0x5d2)]()*this[_0x9eb6d3(0x5f4)]),_0x2eab35=Math[_0x9eb6d3(0xf7)](_0x44b3d2[_0x9eb6d3(0x214)]()*this[_0x9eb6d3(0x4e8)]);if(this['hp']>0x0)this[_0x9eb6d3(0x189)](_0x1b9221);if(this['mp']>0x0)this[_0x9eb6d3(0x340)](_0x2eab35);},Game_Actor[_0x2b9290(0x125)]['clearEquipments']=function(){const _0x386e13=_0x2b9290,_0x2eb860=this['equipSlots']()[_0x386e13(0x40b)];for(let _0x210c90=0x0;_0x210c90<_0x2eb860;_0x210c90++){if(this['isClearEquipOk'](_0x210c90))this[_0x386e13(0x46f)](_0x210c90,null);}},Game_Actor['prototype']['isClearEquipOk']=function(_0x4b62b9){const _0x2e9bfd=_0x2b9290;if(this[_0x2e9bfd(0x11e)]()['includes'](this[_0x2e9bfd(0x342)]()[_0x4b62b9]))return![];else{if(_0x2e9bfd(0x485)!==_0x2e9bfd(0x485))_0x2c128d=this[_0x2e9bfd(0x114)][_0x2e9bfd(0x47d)](_0x2afd87,!![]);else return this[_0x2e9bfd(0x50f)](_0x4b62b9);}},Game_Actor[_0x2b9290(0x125)]['nonRemovableEtypes']=function(){const _0x335fba=_0x2b9290;return VisuMZ[_0x335fba(0x2d3)][_0x335fba(0x389)][_0x335fba(0x172)][_0x335fba(0x323)];},Game_Actor['prototype'][_0x2b9290(0x56d)]=function(){const _0x54fcbe=_0x2b9290,_0x1659df=this['equipSlots']()[_0x54fcbe(0x40b)];for(let _0xbfda0e=0x0;_0xbfda0e<_0x1659df;_0xbfda0e++){if(_0x54fcbe(0x159)!==_0x54fcbe(0x159))this[_0x54fcbe(0xe1)](null,_0x3cfaf5);else{if(this[_0x54fcbe(0xfe)](_0xbfda0e))this[_0x54fcbe(0x46f)](_0xbfda0e,null);}}for(let _0x51cf91=0x0;_0x51cf91<_0x1659df;_0x51cf91++){if(_0x54fcbe(0x231)===_0x54fcbe(0x415))!this['processCursorSpecialCheckModernControls']()&&_0x320447[_0x54fcbe(0x125)][_0x54fcbe(0x23b)]['call'](this);else{if(this[_0x54fcbe(0xfe)](_0x51cf91))this[_0x54fcbe(0x46f)](_0x51cf91,this[_0x54fcbe(0x15c)](_0x51cf91));}}},Game_Actor['prototype'][_0x2b9290(0x15c)]=function(_0x47e1c0){const _0x2a442f=_0x2b9290,_0x902524=this['equipSlots']()[_0x47e1c0],_0x22832a=$gameParty[_0x2a442f(0x62f)]()[_0x2a442f(0x538)](_0x3d90ce=>DataManager[_0x2a442f(0x148)](_0x3d90ce)['includes'](_0x902524)&&this['canEquip'](_0x3d90ce));let _0x3e1d38=null,_0x5bd2a3=-0x3e8;for(let _0x32493d=0x0;_0x32493d<_0x22832a[_0x2a442f(0x40b)];_0x32493d++){if(_0x2a442f(0x118)==='DSqNh'){let _0x5ed6ca=_0x5068ea[_0x2a442f(0x2d3)][_0x2a442f(0x527)][_0x2a442f(0x3e9)](this,_0x408887);for(const _0x332ad8 of this[_0x2a442f(0x5d5)]()){if(_0x332ad8)_0x5ed6ca+=this[_0x2a442f(0x5b7)](_0x332ad8,_0x22e75c);}return _0x5ed6ca;}else{const _0x4b8e25=this[_0x2a442f(0x2ce)](_0x22832a[_0x32493d]);if(_0x4b8e25>_0x5bd2a3){if('dtWoq'===_0x2a442f(0x37c))return _0x49badb[_0x2a442f(0x2d3)]['Settings'][_0x2a442f(0x38e)][_0x2a442f(0x458)];else _0x5bd2a3=_0x4b8e25,_0x3e1d38=_0x22832a[_0x32493d];}}}return _0x3e1d38;},Game_Actor[_0x2b9290(0x125)][_0x2b9290(0xfe)]=function(_0x4b1cba){const _0x5cb1eb=_0x2b9290;return this[_0x5cb1eb(0x474)]()[_0x5cb1eb(0x57b)](this['equipSlots']()[_0x4b1cba])?![]:this['isEquipChangeOk'](_0x4b1cba);},Game_Actor[_0x2b9290(0x125)][_0x2b9290(0x474)]=function(){const _0x2fbc24=_0x2b9290;return VisuMZ[_0x2fbc24(0x2d3)][_0x2fbc24(0x389)][_0x2fbc24(0x172)][_0x2fbc24(0x12a)];},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x2af)]=Game_Actor[_0x2b9290(0x125)]['tradeItemWithParty'],Game_Actor[_0x2b9290(0x125)][_0x2b9290(0xe1)]=function(_0x2a783b,_0x1c21b6){const _0x4366d7=_0x2b9290;if(this['_tempActor'])return![];$gameTemp['_bypassNewLabel']=!![];const _0x12f04e=VisuMZ[_0x4366d7(0x2d3)]['Game_Actor_tradeItemWithParty']['call'](this,_0x2a783b,_0x1c21b6);return $gameTemp[_0x4366d7(0x175)]=![],_0x12f04e;},Game_Actor[_0x2b9290(0x125)][_0x2b9290(0x324)]=function(_0x26c398,_0x4eb1c6){const _0x4ebc86=_0x2b9290,_0x3beb5c=this[_0x4ebc86(0x571)](_0x26c398);if(_0x3beb5c<0x0)return;const _0x4de67e=_0x26c398===0x1?$dataWeapons[_0x4eb1c6]:$dataArmors[_0x4eb1c6];this['changeEquip'](_0x3beb5c,_0x4de67e);},Game_Actor[_0x2b9290(0x125)]['getNextAvailableEtypeId']=function(_0x1ebbf3){const _0x776301=_0x2b9290;let _0x164dc3=0x0;const _0x1e9dcf=this[_0x776301(0x342)](),_0x365d98=this[_0x776301(0x5d5)]();for(let _0x2b2dc4=0x0;_0x2b2dc4<_0x1e9dcf[_0x776301(0x40b)];_0x2b2dc4++){if(_0x776301(0x1e7)!==_0x776301(0x1e7))return _0x455420['prototype'][_0x776301(0x42a)][_0x776301(0x3e9)](this,_0xb9b692);else{if(_0x1e9dcf[_0x2b2dc4]===_0x1ebbf3){_0x164dc3=_0x2b2dc4;if(!_0x365d98[_0x2b2dc4])return _0x164dc3;}}}return _0x164dc3;},VisuMZ[_0x2b9290(0x2d3)]['Game_Actor_paramPlus']=Game_Actor['prototype'][_0x2b9290(0x486)],Game_Actor[_0x2b9290(0x125)][_0x2b9290(0x486)]=function(_0x26d7c3){const _0x879d39=_0x2b9290;let _0xbc6e4e=VisuMZ[_0x879d39(0x2d3)][_0x879d39(0x527)][_0x879d39(0x3e9)](this,_0x26d7c3);for(const _0x377aae of this[_0x879d39(0x5d5)]()){if(_0x879d39(0x58c)!==_0x879d39(0x58c)){const _0x32798f=_0x4e1d6b[_0x879d39(0x2cb)](this);_0x32798f[_0x879d39(0x1bb)]=!![],this[_0x879d39(0x33c)][_0x42b46f]['setObject'](null),this[_0x879d39(0x4ac)]=!![],this[_0x879d39(0x186)](_0x32798f),this[_0x879d39(0x4ac)]=_0x59186d;}else{if(_0x377aae)_0xbc6e4e+=this['paramPlusItemsEquipsCoreCustomJS'](_0x377aae,_0x26d7c3);}}return _0xbc6e4e;},Game_Actor[_0x2b9290(0x125)]['paramPlusItemsEquipsCoreCustomJS']=function(_0x125f64,_0x582442){const _0x2490d9=_0x2b9290;if(this[_0x2490d9(0x215)])return 0x0;const _0x12467d=(DataManager[_0x2490d9(0x187)](_0x125f64)?'W%1':_0x2490d9(0x44d))[_0x2490d9(0x46a)](_0x125f64['id']),_0x52c522=_0x2490d9(0x57f)['format'](_0x12467d,_0x582442);if(VisuMZ['ItemsEquipsCore']['paramJS'][_0x52c522]){this[_0x2490d9(0x215)]=!![];const _0x4bf549=VisuMZ[_0x2490d9(0x2d3)][_0x2490d9(0x113)][_0x52c522][_0x2490d9(0x3e9)](this,_0x125f64,_0x582442);return this[_0x2490d9(0x215)]=![],_0x4bf549;}else return 0x0;},Game_Actor['prototype']['setShopStatusWindowMode']=function(_0xcbf960){this['_shopStatusMenuMode']=!![],this['_shopStatusMenuAlly']=_0xcbf960;},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x598)]=Game_Party[_0x2b9290(0x125)][_0x2b9290(0x130)],Game_Party[_0x2b9290(0x125)][_0x2b9290(0x130)]=function(){const _0x4314c7=_0x2b9290;VisuMZ['ItemsEquipsCore'][_0x4314c7(0x598)][_0x4314c7(0x3e9)](this),this[_0x4314c7(0x111)](),this[_0x4314c7(0x3df)]();},Game_Party['prototype'][_0x2b9290(0x111)]=function(){const _0x354681=_0x2b9290;this[_0x354681(0x311)]=[];},Game_Party[_0x2b9290(0x125)]['isNewItem']=function(_0x27dc2e){const _0x8a17bb=_0x2b9290;if(!$gameTemp[_0x8a17bb(0x263)]())return![];if(this[_0x8a17bb(0x311)]===undefined)this[_0x8a17bb(0x111)]();let _0x5b302c='';if(DataManager[_0x8a17bb(0x3f0)](_0x27dc2e))_0x5b302c=_0x8a17bb(0x4cc)['format'](_0x27dc2e['id']);else{if(DataManager['isWeapon'](_0x27dc2e))_0x5b302c=_0x8a17bb(0x128)[_0x8a17bb(0x46a)](_0x27dc2e['id']);else{if(DataManager[_0x8a17bb(0x318)](_0x27dc2e))_0x5b302c=_0x8a17bb(0x4c6)['format'](_0x27dc2e['id']);else return;}}return this[_0x8a17bb(0x311)][_0x8a17bb(0x57b)](_0x5b302c);},Game_Party['prototype']['setNewItem']=function(_0x1bbc1c){const _0x3f0e02=_0x2b9290;if(!$gameTemp[_0x3f0e02(0x263)]())return;if(this['_newItemsList']===undefined)this['initNewItemsList']();let _0x3577c7='';if(DataManager[_0x3f0e02(0x3f0)](_0x1bbc1c))_0x3577c7='item-%1'[_0x3f0e02(0x46a)](_0x1bbc1c['id']);else{if(DataManager['isWeapon'](_0x1bbc1c))_0x3577c7=_0x3f0e02(0x128)['format'](_0x1bbc1c['id']);else{if(DataManager[_0x3f0e02(0x318)](_0x1bbc1c))_0x3577c7=_0x3f0e02(0x4c6)[_0x3f0e02(0x46a)](_0x1bbc1c['id']);else return;}}if(!this[_0x3f0e02(0x311)][_0x3f0e02(0x57b)](_0x3577c7))this[_0x3f0e02(0x311)][_0x3f0e02(0x52d)](_0x3577c7);},Game_Party[_0x2b9290(0x125)][_0x2b9290(0x3e6)]=function(_0xff3c28){const _0x275aad=_0x2b9290;if(!$gameTemp[_0x275aad(0x263)]())return;if(this[_0x275aad(0x311)]===undefined)this['initNewItemsList']();let _0x3546a0='';if(DataManager[_0x275aad(0x3f0)](_0xff3c28))_0x3546a0=_0x275aad(0x4cc)['format'](_0xff3c28['id']);else{if(DataManager[_0x275aad(0x187)](_0xff3c28))_0x275aad(0x19f)!=='dimMq'?(_0x379d7f=_0x15e9aa[_0x275aad(0x4b7)](_0x4d24bc),_0xc6fa66[_0x275aad(0x187)](_0xd07466)||_0x34211a[_0x275aad(0x318)](_0x247a4f)?this[_0x275aad(0x601)](_0x327642):_0x440e76[_0x275aad(0x2d3)][_0x275aad(0x22a)][_0x275aad(0x3e9)](this,_0x2d34d6)):_0x3546a0=_0x275aad(0x128)['format'](_0xff3c28['id']);else{if(DataManager[_0x275aad(0x318)](_0xff3c28))_0x275aad(0x24b)!==_0x275aad(0x24b)?(_0x12f472===this[_0x275aad(0x362)]()&&(this[_0x275aad(0x609)]=!![]),this[_0x275aad(0x62e)](),this[_0x275aad(0x560)](_0x2ae34f)):_0x3546a0=_0x275aad(0x4c6)[_0x275aad(0x46a)](_0xff3c28['id']);else{if(_0x275aad(0x4d8)!==_0x275aad(0x3c3))return;else return _0x32574c[_0x275aad(0x59c)]&&_0x33a00f[_0x275aad(0x125)][_0x275aad(0x1a5)]['call'](this);}}}this[_0x275aad(0x311)][_0x275aad(0x57b)](_0x3546a0)&&this[_0x275aad(0x311)][_0x275aad(0xf9)](this[_0x275aad(0x311)][_0x275aad(0x31f)](_0x3546a0),0x1);},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x3f7)]=Game_Party[_0x2b9290(0x125)]['numItems'],Game_Party[_0x2b9290(0x125)]['numItems']=function(_0xa24fbe){const _0x1f1b3e=_0x2b9290;if(DataManager[_0x1f1b3e(0x5cd)](_0xa24fbe))_0xa24fbe=DataManager[_0x1f1b3e(0x4b7)](_0xa24fbe);return VisuMZ[_0x1f1b3e(0x2d3)][_0x1f1b3e(0x3f7)][_0x1f1b3e(0x3e9)](this,_0xa24fbe);},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x15f)]=Game_Party[_0x2b9290(0x125)][_0x2b9290(0x1f8)],Game_Party[_0x2b9290(0x125)]['gainItem']=function(_0x354275,_0x19c5d3,_0x422160){const _0x1ae2ce=_0x2b9290;if(DataManager['isProxyItem'](_0x354275))_0x354275=null;const _0x32f0c7=this[_0x1ae2ce(0x2a2)](_0x354275);VisuMZ[_0x1ae2ce(0x2d3)][_0x1ae2ce(0x15f)][_0x1ae2ce(0x3e9)](this,_0x354275,_0x19c5d3,_0x422160);if(this[_0x1ae2ce(0x2a2)](_0x354275)>_0x32f0c7)this[_0x1ae2ce(0x472)](_0x354275);},Game_Party[_0x2b9290(0x125)][_0x2b9290(0x3fe)]=function(_0x788ee){const _0x6734fe=_0x2b9290;if(DataManager[_0x6734fe(0x5cd)](_0x788ee))_0x788ee=DataManager[_0x6734fe(0x4b7)](_0x788ee);return DataManager[_0x6734fe(0x30b)](_0x788ee);},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x46d)]=Game_Party[_0x2b9290(0x125)][_0x2b9290(0x1ea)],Game_Party[_0x2b9290(0x125)][_0x2b9290(0x1ea)]=function(_0x4b4216){const _0x3cfecd=_0x2b9290;if(_0x4b4216){const _0x2bb577=_0x4b4216[_0x3cfecd(0x327)]||'';if(_0x2bb577['match'](/<(?:CONSERVE|PRESERVE):[ ](\d+)([%％])>/i)){const _0x2ab920=Number(RegExp['$1'])*0.01;if(Math[_0x3cfecd(0x5bc)]()<_0x2ab920)return;}}VisuMZ[_0x3cfecd(0x2d3)][_0x3cfecd(0x46d)][_0x3cfecd(0x3e9)](this,_0x4b4216);},Game_Party[_0x2b9290(0x125)]['initShopTrackingData']=function(){const _0x1149bc=_0x2b9290;this[_0x1149bc(0x36e)]={'buy':{'gold':0x0,'items':{}},'sell':{'gold':0x0,'items':{}}};},Game_Party['prototype'][_0x2b9290(0x12f)]=function(){const _0x4e4513=_0x2b9290;return this[_0x4e4513(0x36e)]===undefined&&('Rlwxj'==='Rlwxj'?this[_0x4e4513(0x3df)]():this[_0x4e4513(0x2f9)]()),this['_shopTrackingData'];},Game_Party[_0x2b9290(0x125)][_0x2b9290(0x445)]=function(_0x2375be,_0x37f3eb){const _0x44590c=_0x2b9290;if(!_0x37f3eb)return 0x0;this[_0x44590c(0x36e)]===undefined&&this[_0x44590c(0x3df)]();const _0x1c45d4=this[_0x44590c(0x12f)]();if(!_0x1c45d4[_0x2375be])return 0x0;if(_0x37f3eb===_0x44590c(0x26d))return _0x44590c(0x31b)!==_0x44590c(0x31b)?_0x11fdc1['ItemsEquipsCore'][_0x44590c(0x389)][_0x44590c(0x172)]['CommandAddClear']:(_0x1c45d4[_0x2375be][_0x44590c(0x26d)]=_0x1c45d4[_0x2375be]['gold']||0x0,_0x1c45d4[_0x2375be][_0x44590c(0x26d)]);else{if(DataManager['isItem'](_0x37f3eb)){if(_0x44590c(0x491)!==_0x44590c(0x491)){if(_0x57e1cf[_0x44590c(0x427)](_0x19cfa5))return![];if(!_0x1d8d34[_0x44590c(0x438)](this,_0x5dd399))return![];if(!_0x249c15[_0x44590c(0x29f)](this,_0x37990b))return![];return _0x2e481c['ItemsEquipsCore'][_0x44590c(0x27f)][_0x44590c(0x3e9)](this,_0x24c966);}else key=_0x44590c(0x4cc)[_0x44590c(0x46a)](_0x37f3eb['id']);}else{if(DataManager[_0x44590c(0x187)](_0x37f3eb))key=_0x44590c(0x128)['format'](_0x37f3eb['id']);else{if(DataManager['isArmor'](_0x37f3eb))key=_0x44590c(0x4c6)[_0x44590c(0x46a)](_0x37f3eb['id']);else{if(_0x44590c(0x1bd)===_0x44590c(0x23f))this[_0x44590c(0x34d)](this[_0x44590c(0x362)]())?(this[_0x44590c(0x385)](),this[_0x44590c(0x185)]()):this[_0x44590c(0x51d)]();else return 0x0;}}}}return _0x1c45d4[_0x2375be][_0x44590c(0x2b6)][key]=_0x1c45d4[_0x2375be][_0x44590c(0x2b6)][key]||0x0,_0x1c45d4[_0x2375be][_0x44590c(0x2b6)][key];},Game_Party[_0x2b9290(0x125)]['getShopTrackingItemBuy']=function(_0x17dec2){const _0x4ff519=_0x2b9290;return this[_0x4ff519(0x445)](_0x4ff519(0x306),_0x17dec2);},Game_Party[_0x2b9290(0x125)][_0x2b9290(0x26a)]=function(_0x3f96be){const _0x1f3de4=_0x2b9290;return this[_0x1f3de4(0x445)](_0x1f3de4(0x51b),_0x3f96be);},Game_Party[_0x2b9290(0x125)]['getShopTrackingGoldBuy']=function(){const _0x49d6c7=_0x2b9290;return this[_0x49d6c7(0x445)](_0x49d6c7(0x306),_0x49d6c7(0x26d));},Game_Party[_0x2b9290(0x125)][_0x2b9290(0x1ce)]=function(){const _0x17f615=_0x2b9290;return this['getShopTrackingItem'](_0x17f615(0x51b),_0x17f615(0x26d));},Game_Party['prototype']['addShopTrackingItem']=function(_0x48c4cb,_0x1e8bb0,_0x32a8f2){const _0x270056=_0x2b9290;if(!_0x1e8bb0)return;if(_0x32a8f2<=0x0)return;this[_0x270056(0x36e)]===undefined&&(_0x270056(0x36f)===_0x270056(0x2f4)?_0x5caceb=0x0:this['initShopTrackingData']());const _0xf53003=this[_0x270056(0x12f)]();if(!_0xf53003[_0x48c4cb])return;if(_0x1e8bb0===_0x270056(0x26d)){_0xf53003[_0x48c4cb]['gold']=_0xf53003[_0x48c4cb]['gold']||0x0,_0xf53003[_0x48c4cb]['gold']+=_0x32a8f2;return;}else{if(DataManager[_0x270056(0x3f0)](_0x1e8bb0))key='item-%1'['format'](_0x1e8bb0['id']);else{if(DataManager[_0x270056(0x187)](_0x1e8bb0)){if(_0x270056(0xff)!==_0x270056(0xff)){const _0x1a9dee=_0x477fbd(_0x1eaec8['$1'])['split'](/[\r\n]+/);for(const _0x2d7e7b of _0x1a9dee){if(_0x2d7e7b['match'](/(.*):[ ](.*)/i)){const _0x1a8c20=_0x59def7(_0x4ef636['$1'])['toUpperCase']()[_0x270056(0x3a6)](),_0x514b85=_0x59dd9d(_0x1ae9c3['$2'])[_0x270056(0x3a6)]();this[_0x270056(0x5be)][_0x1a8c20]=_0x514b85;}}}else key=_0x270056(0x128)[_0x270056(0x46a)](_0x1e8bb0['id']);}else{if(DataManager[_0x270056(0x318)](_0x1e8bb0)){if(_0x270056(0x55d)!=='FdCbZ')key=_0x270056(0x4c6)['format'](_0x1e8bb0['id']);else return _0x154af1['prototype'][_0x270056(0x208)][_0x270056(0x3e9)](this);}else return;}}}_0xf53003[_0x48c4cb][_0x270056(0x2b6)][key]=_0xf53003[_0x48c4cb][_0x270056(0x2b6)][key]||0x0,_0xf53003[_0x48c4cb][_0x270056(0x2b6)][key]+=_0x32a8f2;},Game_Party['prototype'][_0x2b9290(0x3ad)]=function(_0x5e0963,_0x18aba5){const _0x3c0541=_0x2b9290;this[_0x3c0541(0x343)]('buy',_0x5e0963,_0x18aba5);},Game_Party[_0x2b9290(0x125)][_0x2b9290(0x2a1)]=function(_0x16697b,_0x2e6957){this['addShopTrackingItem']('sell',_0x16697b,_0x2e6957);},Game_Party['prototype'][_0x2b9290(0x500)]=function(_0x4982e4){const _0x587e56=_0x2b9290;this['addShopTrackingItem'](_0x587e56(0x306),_0x587e56(0x26d),_0x4982e4);},Game_Party[_0x2b9290(0x125)]['addShopTrackingGoldSell']=function(_0x5b5dcc){const _0xd45b32=_0x2b9290;this[_0xd45b32(0x343)](_0xd45b32(0x51b),'gold',_0x5b5dcc);},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x25a)]=Scene_ItemBase[_0x2b9290(0x125)][_0x2b9290(0x5fa)],Scene_ItemBase[_0x2b9290(0x125)][_0x2b9290(0x5fa)]=function(){const _0x4ef2d2=_0x2b9290;VisuMZ['ItemsEquipsCore'][_0x4ef2d2(0x25a)][_0x4ef2d2(0x3e9)](this),this[_0x4ef2d2(0x1be)]['callUpdateHelp']();},Scene_Item[_0x2b9290(0x125)][_0x2b9290(0x4b5)]=function(){const _0x350ed6=_0x2b9290;if(ConfigManager[_0x350ed6(0x43d)]&&ConfigManager[_0x350ed6(0x4e5)]!==undefined)return ConfigManager[_0x350ed6(0x4e5)];else{if(this[_0x350ed6(0x4e9)]()){if(_0x350ed6(0x5cf)===_0x350ed6(0x3f5))this[_0x350ed6(0x41e)]();else return this[_0x350ed6(0x193)]()['match'](/LOWER/i);}else return _0x350ed6(0x1b3)!==_0x350ed6(0x5dc)?Scene_ItemBase[_0x350ed6(0x125)][_0x350ed6(0x4b5)][_0x350ed6(0x3e9)](this):this[_0x350ed6(0x399)]?this[_0x350ed6(0x4aa)]?_0x5cb8e6['ShopMenuStatusStandard']:0x1:_0x1045b7['ItemsEquipsCore'][_0x350ed6(0x40d)][_0x350ed6(0x3e9)](this,_0x132ba0);}},Scene_Item[_0x2b9290(0x125)][_0x2b9290(0x2e7)]=function(){const _0x1027b9=_0x2b9290;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x1027b9(0x50d)]!==undefined){if('lTWSq'==='wgoBi')_0x5ad597['loadCharacter'](_0x1deabf[_0x1027b9(0x5ad)]());else return ConfigManager[_0x1027b9(0x50d)];}else{if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x1027b9(0x3c5)==='ySkeN')this[_0x1027b9(0x134)]();else return this[_0x1027b9(0x193)]()[_0x1027b9(0x5c2)](/RIGHT/i);}else{if('WWNrR'!==_0x1027b9(0x56f))return Scene_ItemBase[_0x1027b9(0x125)][_0x1027b9(0x2e7)][_0x1027b9(0x3e9)](this);else this[_0x1027b9(0x433)](!![]);}}},Scene_Item[_0x2b9290(0x125)][_0x2b9290(0x193)]=function(){const _0x26c4ce=_0x2b9290;return VisuMZ[_0x26c4ce(0x2d3)][_0x26c4ce(0x389)][_0x26c4ce(0x38e)][_0x26c4ce(0x17d)];},Scene_Item[_0x2b9290(0x125)][_0x2b9290(0x1a5)]=function(){const _0x2b2021=_0x2b9290;return this[_0x2b2021(0x40a)]&&this[_0x2b2021(0x40a)][_0x2b2021(0x1a5)]();},Scene_Item['prototype'][_0x2b9290(0x4e9)]=function(){const _0x4ff87e=_0x2b9290;return VisuMZ[_0x4ff87e(0x2d3)][_0x4ff87e(0x389)][_0x4ff87e(0x38e)][_0x4ff87e(0x4be)];},VisuMZ[_0x2b9290(0x2d3)]['Scene_Item_create']=Scene_Item[_0x2b9290(0x125)][_0x2b9290(0x530)],Scene_Item[_0x2b9290(0x125)][_0x2b9290(0x530)]=function(){const _0x4279bb=_0x2b9290;VisuMZ[_0x4279bb(0x2d3)][_0x4279bb(0x629)][_0x4279bb(0x3e9)](this),this['isUseModernControls']()&&this['onCategoryOk']();},VisuMZ[_0x2b9290(0x2d3)]['Scene_Item_helpWindowRect']=Scene_Item[_0x2b9290(0x125)]['helpWindowRect'],Scene_Item[_0x2b9290(0x125)]['helpWindowRect']=function(){const _0x55b068=_0x2b9290;if(this[_0x55b068(0x4e9)]())return this[_0x55b068(0x202)]();else{if(_0x55b068(0x20c)!==_0x55b068(0x161))return VisuMZ['ItemsEquipsCore']['Scene_Item_helpWindowRect'][_0x55b068(0x3e9)](this);else this[_0x55b068(0x2ac)](),this[_0x55b068(0x332)](),this[_0x55b068(0x374)]();}},Scene_Item[_0x2b9290(0x125)]['helpWindowRectItemsEquipsCore']=function(){const _0x5e8d7e=_0x2b9290,_0x14ed97=0x0,_0x23d3c5=this[_0x5e8d7e(0x22b)](),_0x1c5d81=Graphics['boxWidth'],_0x38f974=this[_0x5e8d7e(0x1f2)]();return new Rectangle(_0x14ed97,_0x23d3c5,_0x1c5d81,_0x38f974);},VisuMZ[_0x2b9290(0x2d3)]['Scene_Item_createCategoryWindow']=Scene_Item['prototype'][_0x2b9290(0x14c)],Scene_Item[_0x2b9290(0x125)][_0x2b9290(0x14c)]=function(){const _0x57bbee=_0x2b9290;VisuMZ['ItemsEquipsCore'][_0x57bbee(0x2a4)][_0x57bbee(0x3e9)](this);if(this['isUseModernControls']()){if('uxwFv'!==_0x57bbee(0x230))this[_0x57bbee(0x2f9)]();else return this[_0x57bbee(0x3f1)]()<=0x1?_0x49931e[_0x57bbee(0x125)]['colSpacing'][_0x57bbee(0x3e9)](this):_0x561386[_0x57bbee(0x2d3)][_0x57bbee(0x2a0)]['call'](this);}},Scene_Item[_0x2b9290(0x125)][_0x2b9290(0x2f9)]=function(){const _0x21c789=_0x2b9290;delete this['_categoryWindow'][_0x21c789(0x464)]['ok'],delete this[_0x21c789(0x40a)][_0x21c789(0x464)][_0x21c789(0x1fe)];},VisuMZ[_0x2b9290(0x2d3)]['Scene_Item_categoryWindowRect']=Scene_Item['prototype'][_0x2b9290(0x5b2)],Scene_Item[_0x2b9290(0x125)][_0x2b9290(0x5b2)]=function(){const _0x32b205=_0x2b9290;return this[_0x32b205(0x4e9)]()?this[_0x32b205(0x4ab)]():VisuMZ[_0x32b205(0x2d3)]['Scene_Item_categoryWindowRect']['call'](this);},Scene_Item[_0x2b9290(0x125)][_0x2b9290(0x4ab)]=function(){const _0x428cd6=_0x2b9290,_0x19c6f6=0x0,_0x14f51e=this[_0x428cd6(0x33a)](),_0x22b1ac=Graphics['boxWidth'],_0x293d18=this[_0x428cd6(0x1f9)](0x1,!![]);return new Rectangle(_0x19c6f6,_0x14f51e,_0x22b1ac,_0x293d18);},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x3a2)]=Scene_Item[_0x2b9290(0x125)][_0x2b9290(0xf1)],Scene_Item[_0x2b9290(0x125)][_0x2b9290(0xf1)]=function(){const _0x56b664=_0x2b9290;VisuMZ[_0x56b664(0x2d3)][_0x56b664(0x3a2)][_0x56b664(0x3e9)](this),this['isUseModernControls']()&&this['postCreateItemWindowModernControls'](),this[_0x56b664(0x14f)]()&&this['createStatusWindow']();},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x439)]=Scene_Item[_0x2b9290(0x125)][_0x2b9290(0x144)],Scene_Item[_0x2b9290(0x125)][_0x2b9290(0x144)]=function(){const _0x51c8e6=_0x2b9290;if(this[_0x51c8e6(0x4e9)]()){if('DTqkx'!==_0x51c8e6(0x2bd)){const _0x3bcc53=this[_0x51c8e6(0x2a2)](_0x4daa26);if(_0x3bcc53)this[_0x51c8e6(0x381)](_0x34fda6,_0x3bcc53);}else return this[_0x51c8e6(0x33e)]();}else{if(_0x51c8e6(0x115)===_0x51c8e6(0x115)){const _0x8edd7c=VisuMZ[_0x51c8e6(0x2d3)][_0x51c8e6(0x439)][_0x51c8e6(0x3e9)](this);return this[_0x51c8e6(0x14f)]()&&this[_0x51c8e6(0x557)]()&&(_0x8edd7c[_0x51c8e6(0x4e0)]-=this['statusWidth']()),_0x8edd7c;}else{const _0x23ce31=this['currentSymbol']();switch(_0x23ce31){case _0x51c8e6(0x59f):return _0x1599ea[_0x51c8e6(0x24a)][_0x51c8e6(0x515)][_0x51c8e6(0x59f)];case _0x51c8e6(0x108):return _0x47adb5[_0x51c8e6(0x24a)]['helpDesc'][_0x51c8e6(0x108)];case _0x51c8e6(0x4f5):return _0x5f0268[_0x51c8e6(0x24a)][_0x51c8e6(0x515)][_0x51c8e6(0x4f5)];default:return'';}}}},Scene_Item[_0x2b9290(0x125)][_0x2b9290(0x33e)]=function(){const _0x7811ff=_0x2b9290,_0x410e31=this[_0x7811ff(0x2e7)]()?this[_0x7811ff(0x555)]():0x0,_0xe84f33=this[_0x7811ff(0x40a)]['y']+this[_0x7811ff(0x40a)][_0x7811ff(0x419)],_0x24fcc1=Graphics['boxWidth']-this['statusWidth'](),_0x5d30a2=this[_0x7811ff(0x4de)]()-_0xe84f33;return new Rectangle(_0x410e31,_0xe84f33,_0x24fcc1,_0x5d30a2);},Scene_Item[_0x2b9290(0x125)][_0x2b9290(0x166)]=function(){const _0x3681c7=_0x2b9290;this[_0x3681c7(0x1be)][_0x3681c7(0x24e)](_0x3681c7(0x1fe),this[_0x3681c7(0x536)]['bind'](this));},Scene_Item['prototype'][_0x2b9290(0x14f)]=function(){const _0x46ab8c=_0x2b9290;if(this[_0x46ab8c(0x4e9)]()){if(_0x46ab8c(0x2d6)!==_0x46ab8c(0x5e2))return!![];else{if(_0x438f22[_0x46ab8c(0x43d)]&&_0x57b617[_0x46ab8c(0x4e5)]!==_0x5669cb)return _0x5a99f2[_0x46ab8c(0x4e5)];else return this[_0x46ab8c(0x4e9)]()?this[_0x46ab8c(0x193)]()[_0x46ab8c(0x5c2)](/LOWER/i):_0x339b18[_0x46ab8c(0x125)]['isBottomHelpMode'][_0x46ab8c(0x3e9)](this);}}else return VisuMZ[_0x46ab8c(0x2d3)][_0x46ab8c(0x389)]['ItemScene']['ShowShopStatus'];},Scene_Item[_0x2b9290(0x125)]['adjustItemWidthByStatus']=function(){const _0x42b708=_0x2b9290;return VisuMZ[_0x42b708(0x2d3)][_0x42b708(0x389)][_0x42b708(0x38e)]['ItemSceneAdjustItemList'];},Scene_Item[_0x2b9290(0x125)][_0x2b9290(0x572)]=function(){const _0x2ba68c=_0x2b9290,_0x59e70b=this[_0x2ba68c(0x55a)]();this[_0x2ba68c(0x169)]=new Window_ShopStatus(_0x59e70b),this[_0x2ba68c(0x38a)](this[_0x2ba68c(0x169)]),this[_0x2ba68c(0x1be)][_0x2ba68c(0x489)](this[_0x2ba68c(0x169)]);const _0xf4a2cb=VisuMZ[_0x2ba68c(0x2d3)]['Settings'][_0x2ba68c(0x38e)][_0x2ba68c(0x227)];this[_0x2ba68c(0x169)][_0x2ba68c(0x562)](_0xf4a2cb||0x0);},Scene_Item[_0x2b9290(0x125)][_0x2b9290(0x55a)]=function(){const _0x277618=_0x2b9290;if(this[_0x277618(0x4e9)]()){if(_0x277618(0x295)!=='jfdAW')_0x4fe16f[_0x277618(0x4e0)]-=this['statusWidth']();else return this[_0x277618(0x2f0)]();}else return VisuMZ[_0x277618(0x2d3)][_0x277618(0x389)]['ItemScene'][_0x277618(0x261)][_0x277618(0x3e9)](this);},Scene_Item['prototype'][_0x2b9290(0x2f0)]=function(){const _0x3764b5=_0x2b9290,_0x27382d=this['statusWidth'](),_0x4a4528=this[_0x3764b5(0x1be)][_0x3764b5(0x419)],_0x36c1da=this[_0x3764b5(0x2e7)]()?0x0:Graphics['boxWidth']-this['statusWidth'](),_0x2fc116=this['_itemWindow']['y'];return new Rectangle(_0x36c1da,_0x2fc116,_0x27382d,_0x4a4528);},Scene_Item[_0x2b9290(0x125)]['statusWidth']=function(){const _0x1cd020=_0x2b9290;return Scene_Shop['prototype'][_0x1cd020(0x555)]();},Scene_Item[_0x2b9290(0x125)][_0x2b9290(0x123)]=function(){const _0xae7453=_0x2b9290;if(!this['updatedLayoutStyle']())return![];if(!this[_0xae7453(0x1a5)]())return![];if(!this['_itemWindow'])return![];if(!this[_0xae7453(0x1be)]['active'])return![];return this[_0xae7453(0x193)]()&&this['isUseModernControls']();},Scene_Item[_0x2b9290(0x125)][_0x2b9290(0x3ef)]=function(){const _0x14c297=_0x2b9290;if(this[_0x14c297(0x123)]())return _0x14c297(0x477)===_0x14c297(0x173)?_0x2217b4['ItemsEquipsCore']['Settings'][_0x14c297(0x44f)][_0x14c297(0x1e0)]:this[_0x14c297(0x1be)]['maxCols']()===0x1?TextManager[_0x14c297(0x45e)](_0x14c297(0x2e6),_0x14c297(0x5e9)):TextManager[_0x14c297(0x45e)](_0x14c297(0x15e),_0x14c297(0x568));return Scene_ItemBase[_0x14c297(0x125)][_0x14c297(0x3ef)]['call'](this);},Scene_Item['prototype'][_0x2b9290(0x121)]=function(){const _0x1ab2a4=_0x2b9290;if(this['buttonAssistItemListRequirement']())return VisuMZ[_0x1ab2a4(0x2d3)]['Settings'][_0x1ab2a4(0x38e)]['buttonAssistCategory'];return Scene_ItemBase[_0x1ab2a4(0x125)][_0x1ab2a4(0x121)][_0x1ab2a4(0x3e9)](this);},Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x4b5)]=function(){const _0x8b7536=_0x2b9290;if(ConfigManager[_0x8b7536(0x43d)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x8b7536(0x4e5)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this['updatedLayoutStyle']()[_0x8b7536(0x5c2)](/LOWER/i);else Scene_MenuBase[_0x8b7536(0x125)][_0x8b7536(0x2e7)][_0x8b7536(0x3e9)](this);}},Scene_Equip[_0x2b9290(0x125)]['isRightInputMode']=function(){const _0xedeaed=_0x2b9290;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0xedeaed(0x50d)]!==undefined)return ConfigManager[_0xedeaed(0x50d)];else{if(this[_0xedeaed(0x4e9)]())return this['updatedLayoutStyle']()[_0xedeaed(0x5c2)](/RIGHT/i);else{if(_0xedeaed(0x529)==='HPfbQ')Scene_MenuBase[_0xedeaed(0x125)][_0xedeaed(0x2e7)][_0xedeaed(0x3e9)](this);else{const _0x3b81e2='HP\x20DAMAGE';if(this[_0xedeaed(0x2d5)][_0xedeaed(0x5a0)]>=0x0&&this['_itemData'][_0xedeaed(0x223)]>=0x0&&!this[_0xedeaed(0x5be)][_0x3b81e2])return![];const _0xe5b3d3=this[_0xedeaed(0x1d8)]();this[_0xedeaed(0x42e)](_0xe5b3d3,_0x21c972,_0x57d214,_0x1c8ba8,!![]);const _0x478a2d=this[_0xedeaed(0x315)]();return this['changeTextColor'](_0x2ceb08[_0xedeaed(0x54d)](0x0)),this[_0xedeaed(0x42e)](_0x478a2d,_0x43cf2e,_0x377dcd,_0x3dad1f,![],_0xedeaed(0x5e9)),this[_0xedeaed(0x471)](_0x2cb410,_0x1e1374,_0xa9c8b6),this['resetFontSettings'](),!![];}}}},Scene_Equip['prototype']['updatedLayoutStyle']=function(){const _0x2c9e79=_0x2b9290;return VisuMZ['ItemsEquipsCore']['Settings'][_0x2c9e79(0x172)]['LayoutStyle'];},Scene_Equip[_0x2b9290(0x125)]['isUseModernControls']=function(){const _0x102c13=_0x2b9290;return this[_0x102c13(0x4e1)]&&this['_commandWindow'][_0x102c13(0x1a5)]();},Scene_Equip['prototype'][_0x2b9290(0x4e9)]=function(){const _0x1981a1=_0x2b9290;return VisuMZ['ItemsEquipsCore'][_0x1981a1(0x389)][_0x1981a1(0x172)][_0x1981a1(0x4be)];},VisuMZ[_0x2b9290(0x2d3)]['Scene_Equip_create']=Scene_Equip['prototype'][_0x2b9290(0x530)],Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x530)]=function(){const _0x445576=_0x2b9290;VisuMZ[_0x445576(0x2d3)]['Scene_Equip_create'][_0x445576(0x3e9)](this);if(this[_0x445576(0x1a5)]()){if('pcydc'==='pcydc')this[_0x445576(0x54a)]();else{if(this[_0x445576(0x4ae)][_0x445576(0x327)][_0x445576(0x5c2)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x202016=_0x5b47f2(_0x49620a['$1'])[_0x445576(0x435)](/[\r\n]+/);for(const _0x509891 of _0x202016){if(_0x509891[_0x445576(0x5c2)](/(.*):[ ](.*)/i)){const _0x368f5f=_0xd72a9e(_0xca1706['$1'])[_0x445576(0x3a6)](),_0x4ccc5c=_0x5f9688(_0x5af53e['$2'])[_0x445576(0x3a6)]();this['drawItemCustomEntryLine'](_0x368f5f,_0x4ccc5c,_0x5db605,_0x1e8faf,_0x227953),_0x541a0d+=this['lineHeight']();}}}return this[_0x445576(0xe0)](),_0x44db55;}}},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x43e)]=Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x1a1)],Scene_Equip['prototype'][_0x2b9290(0x1a1)]=function(){const _0x2fa730=_0x2b9290;if(this[_0x2fa730(0x4e9)]()){if(_0x2fa730(0x2a9)==='PMuCI')return this[_0x2fa730(0x202)]();else _0x1c1bde=_0xc4e67f,_0x1ffaa3=_0x345994[_0x4dc17b];}else return VisuMZ['ItemsEquipsCore']['Scene_Equip_helpWindowRect']['call'](this);},Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x202)]=function(){const _0x2684b2=_0x2b9290,_0x120be2=0x0,_0x509155=this['helpAreaTop'](),_0x448cdb=Graphics[_0x2684b2(0x16a)],_0x5ca558=this[_0x2684b2(0x1f2)]();return new Rectangle(_0x120be2,_0x509155,_0x448cdb,_0x5ca558);},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x158)]=Scene_Equip['prototype'][_0x2b9290(0x55a)],Scene_Equip['prototype'][_0x2b9290(0x55a)]=function(){const _0x504b0a=_0x2b9290;return this[_0x504b0a(0x4e9)]()?this['statusWindowRectItemsEquipsCore']():VisuMZ[_0x504b0a(0x2d3)][_0x504b0a(0x158)]['call'](this);},Scene_Equip[_0x2b9290(0x125)]['statusWindowRectItemsEquipsCore']=function(){const _0x55328a=_0x2b9290,_0x73e9c9=this[_0x55328a(0x2e7)]()?0x0:Graphics[_0x55328a(0x16a)]-this[_0x55328a(0x555)](),_0x41769d=this[_0x55328a(0x33a)](),_0x143ddf=this[_0x55328a(0x555)](),_0x27a399=this[_0x55328a(0x60b)]();return new Rectangle(_0x73e9c9,_0x41769d,_0x143ddf,_0x27a399);},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x50c)]=Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x54b)],Scene_Equip['prototype']['createCommandWindow']=function(){const _0x3cd60d=_0x2b9290;VisuMZ['ItemsEquipsCore']['Scene_Equip_createCommandWindow'][_0x3cd60d(0x3e9)](this);if(this[_0x3cd60d(0x280)])this['_commandWindow']['setHelpWindow'](this['_helpWindow']);},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x4a5)]=Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x3b2)],Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x3b2)]=function(){const _0x5891c2=_0x2b9290;if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x5891c2(0x24f)]();else{if('GdcPy'===_0x5891c2(0x2eb)){_0x365ac4[_0x5891c2(0x5b8)]=!![];let _0xee7944=_0x2f21c9[_0x5891c2(0x2d3)][_0x5891c2(0x575)]['call'](this,_0x10b078);if(!_0xee7944&&_0x15c9a2&&_0x52bda9[_0x5891c2(0x318)](_0x35c3a1)){const _0x2de4f7=_0x12517c['atypeId']||0x0;if(this[_0x5891c2(0x114)]&&this[_0x5891c2(0x114)][_0x5891c2(0x1a0)](_0x2de4f7)){const _0x367077=_0x1f3a40[_0x5891c2(0x148)](_0x49c772);_0x367077[_0x5891c2(0x57b)](this[_0x5891c2(0x61d)]())&&(_0xee7944=!![]);}}return _0x56f4cc[_0x5891c2(0x5b8)]=_0x3d8fbf,_0xee7944;}else return VisuMZ[_0x5891c2(0x2d3)]['Scene_Equip_commandWindowRect']['call'](this);}},Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x3c6)]=function(){const _0x43470=_0x2b9290,_0xf03553=VisuMZ[_0x43470(0x2d3)][_0x43470(0x389)][_0x43470(0x172)];return _0xf03553[_0x43470(0x3d3)]||_0xf03553[_0x43470(0x60d)];},Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x24f)]=function(){const _0x1d8871=_0x2b9290,_0x41bd73=this[_0x1d8871(0x3c6)](),_0x4c758b=this[_0x1d8871(0x2e7)]()?this[_0x1d8871(0x555)]():0x0,_0x991452=this['mainAreaTop'](),_0x3de67e=Graphics[_0x1d8871(0x16a)]-this['statusWidth'](),_0xce4a2b=_0x41bd73?this['calcWindowHeight'](0x1,!![]):0x0;return new Rectangle(_0x4c758b,_0x991452,_0x3de67e,_0xce4a2b);},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x59b)]=Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x288)],Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x288)]=function(){const _0x27f702=_0x2b9290;VisuMZ[_0x27f702(0x2d3)][_0x27f702(0x59b)][_0x27f702(0x3e9)](this),this['isUseModernControls']()&&this[_0x27f702(0x54c)]();},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x32e)]=Scene_Equip['prototype']['slotWindowRect'],Scene_Equip[_0x2b9290(0x125)]['slotWindowRect']=function(){const _0xf12385=_0x2b9290;return this[_0xf12385(0x4e9)]()?this[_0xf12385(0x392)]():VisuMZ[_0xf12385(0x2d3)]['Scene_Equip_slotWindowRect'][_0xf12385(0x3e9)](this);},Scene_Equip['prototype'][_0x2b9290(0x392)]=function(){const _0x11471c=_0x2b9290,_0x242838=this[_0x11471c(0x3b2)](),_0x3db6a6=this[_0x11471c(0x2e7)]()?this[_0x11471c(0x555)]():0x0,_0x236c87=_0x242838['y']+_0x242838[_0x11471c(0x419)],_0x32d08c=Graphics[_0x11471c(0x16a)]-this[_0x11471c(0x555)](),_0x62e381=this['mainAreaHeight']()-_0x242838[_0x11471c(0x419)];return new Rectangle(_0x3db6a6,_0x236c87,_0x32d08c,_0x62e381);},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x335)]=Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x144)],Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x144)]=function(){const _0xb2b02f=_0x2b9290;return this[_0xb2b02f(0x4e9)]()?this['slotWindowRect']():VisuMZ['ItemsEquipsCore']['Scene_Equip_itemWindowRect']['call'](this);},Scene_Equip['prototype'][_0x2b9290(0x555)]=function(){const _0x1ea191=_0x2b9290;if(this[_0x1ea191(0x4e9)]()){if(_0x1ea191(0x461)!==_0x1ea191(0x461)){this[_0x1ea191(0x591)](_0x5db3d0)[_0x1ea191(0x5c2)](/\\I\[(\d+)\]/i);const _0x4fae92=_0x4801a9(_0xe3f872['$1'])||0x0,_0x275275=this[_0x1ea191(0x549)](_0x27e007),_0x5b6132=_0x275275['x']+_0x1b8c65[_0x1ea191(0x5d8)]((_0x275275['width']-_0x1c52b4[_0x1ea191(0x1b5)])/0x2),_0x557721=_0x275275['y']+(_0x275275['height']-_0x190a80[_0x1ea191(0x483)])/0x2;this['drawIcon'](_0x4fae92,_0x5b6132,_0x557721);}else return this[_0x1ea191(0x1cb)]();}else return VisuMZ[_0x1ea191(0x2d3)][_0x1ea191(0x389)][_0x1ea191(0x172)]['StatusWindowWidth'];},Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x1cb)]=function(){const _0x3688e2=_0x2b9290;return Math[_0x3688e2(0x5d8)](Graphics['boxWidth']/0x2);},Scene_Equip['prototype'][_0x2b9290(0x54c)]=function(){const _0xbce929=_0x2b9290;this['_slotWindow']['setHandler'](_0xbce929(0x1fe),this[_0xbce929(0x536)][_0xbce929(0x37e)](this)),this[_0xbce929(0x387)]['setHandler'](_0xbce929(0x568),this['nextActor'][_0xbce929(0x37e)](this)),this['_slotWindow'][_0xbce929(0x24e)]('pageup',this['previousActor'][_0xbce929(0x37e)](this));},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x603)]=Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x54a)],Scene_Equip['prototype'][_0x2b9290(0x54a)]=function(){const _0x3a73bb=_0x2b9290;if(this[_0x3a73bb(0x1a5)]()){if(_0x3a73bb(0x4db)!==_0x3a73bb(0x4db))return this[_0x3a73bb(0x151)]();else this[_0x3a73bb(0x4e1)]['deselect'](),this[_0x3a73bb(0x4e1)]['deactivate']();}VisuMZ[_0x3a73bb(0x2d3)]['Scene_Equip_commandEquip'][_0x3a73bb(0x3e9)](this);},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x126)]=Scene_Equip[_0x2b9290(0x125)]['onSlotOk'],Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x13c)]=function(){const _0x4a13f3=_0x2b9290;if(this[_0x4a13f3(0x387)][_0x4a13f3(0x362)]()>=0x0)VisuMZ['ItemsEquipsCore'][_0x4a13f3(0x126)]['call'](this),this['onSlotOkAutoSelect']();else{if(_0x4a13f3(0x304)===_0x4a13f3(0x36a))return _0x244b8a[_0x4a13f3(0x45e)]('up',_0x4a13f3(0x211));else this[_0x4a13f3(0x387)][_0x4a13f3(0x235)](0x0),this[_0x4a13f3(0x387)][_0x4a13f3(0x62e)]();}},Scene_Equip['prototype'][_0x2b9290(0x120)]=function(){const _0x4d7d48=_0x2b9290;this['_itemWindow'][_0x4d7d48(0x2ef)]();const _0x2a85a5=this[_0x4d7d48(0x387)][_0x4d7d48(0x4d3)](),_0xd3fc05=this[_0x4d7d48(0x1be)][_0x4d7d48(0x496)]['indexOf'](_0x2a85a5),_0x4ca2dc=Math['floor'](this['_itemWindow'][_0x4d7d48(0x165)]()/0x2)-0x1;this[_0x4d7d48(0x1be)][_0x4d7d48(0x235)](_0xd3fc05>=0x0?_0xd3fc05:0x0),this[_0x4d7d48(0x1be)][_0x4d7d48(0x4c2)]>0x1&&(this['_itemWindow'][_0x4d7d48(0x4c2)]=0x1,this['_itemWindow']['updateSmoothScroll']()),this['_itemWindow'][_0x4d7d48(0x2e1)](this[_0x4d7d48(0x1be)][_0x4d7d48(0x362)]()-_0x4ca2dc);},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x28e)]=Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x5e1)],Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x5e1)]=function(){const _0xf5c614=_0x2b9290;VisuMZ['ItemsEquipsCore']['Scene_Equip_onSlotCancel']['call'](this),this[_0xf5c614(0x1a5)]()&&(this[_0xf5c614(0x4e1)][_0xf5c614(0x235)](0x0),this[_0xf5c614(0x387)][_0xf5c614(0x5d1)]());},VisuMZ[_0x2b9290(0x2d3)]['Scene_Equip_onActorChange']=Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x259)],Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x259)]=function(){const _0x2741f6=_0x2b9290;VisuMZ[_0x2741f6(0x2d3)][_0x2741f6(0x1e2)][_0x2741f6(0x3e9)](this);if(this[_0x2741f6(0x1a5)]()){if(_0x2741f6(0x3bf)===_0x2741f6(0x52c)){_0x769ebe[_0x2741f6(0x2d3)][_0x2741f6(0x347)]={},_0xccfef0[_0x2741f6(0x2d3)]['RegExp']['EquipParams']=[],_0x5de265['ItemsEquipsCore'][_0x2741f6(0x347)][_0x2741f6(0x4c7)]=[];const _0x4f7756=[_0x2741f6(0x1d5),'MaxMP',_0x2741f6(0x26e),_0x2741f6(0x416),_0x2741f6(0x599),'MDF','AGI',_0x2741f6(0x16b)];for(const _0x5369cb of _0x4f7756){const _0x9d538a=_0x2741f6(0x297)[_0x2741f6(0x46a)](_0x5369cb);_0x999965[_0x2741f6(0x2d3)][_0x2741f6(0x347)]['EquipParams'][_0x2741f6(0x52d)](new _0x24b531(_0x9d538a,'i'));const _0x29f39d=_0x2741f6(0x386)[_0x2741f6(0x46a)](_0x5369cb);_0x2dc9ca['ItemsEquipsCore'][_0x2741f6(0x347)][_0x2741f6(0x4c7)][_0x2741f6(0x52d)](new _0x342e48(_0x29f39d,'g'));}}else this['_commandWindow'][_0x2741f6(0x5d1)](),this['_commandWindow']['deselect'](),this[_0x2741f6(0x387)][_0x2741f6(0x235)](0x0),this[_0x2741f6(0x387)][_0x2741f6(0x62e)]();}},Scene_Equip[_0x2b9290(0x125)]['buttonAssistSlotWindowShift']=function(){const _0x2744c6=_0x2b9290;if(!this['_slotWindow'])return![];if(!this[_0x2744c6(0x387)][_0x2744c6(0x377)])return![];return this[_0x2744c6(0x387)]['isShiftRemoveShortcutEnabled']();},Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x595)]=function(){const _0x1f1de1=_0x2b9290;if(this[_0x1f1de1(0x53f)]()){if('aTNMz'===_0x1f1de1(0x30d))return TextManager[_0x1f1de1(0x2cc)]('shift');else{if(!_0x565733['isItem'](this[_0x1f1de1(0x4ae)]))return![];const _0x32689a=this['getItemConsumableLabel']();this[_0x1f1de1(0x42e)](_0x32689a,_0x2f84dd,_0x54580d,_0x5aac12,!![]);const _0x2a0b9d=this['getItemConsumableText']();return this[_0x1f1de1(0x42e)](_0x2a0b9d,_0x4effd8,_0x354352,_0x5379fd,![],'right'),this[_0x1f1de1(0x471)](_0x3fd113,_0x645012,_0x22d3f2),this[_0x1f1de1(0xe0)](),!![];}}return Scene_MenuBase[_0x1f1de1(0x125)][_0x1f1de1(0x595)]['call'](this);},Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x292)]=function(){const _0x4055b3=_0x2b9290;if(this['buttonAssistSlotWindowShift']()){if(_0x4055b3(0x604)!==_0x4055b3(0x5b6))return VisuMZ[_0x4055b3(0x2d3)][_0x4055b3(0x389)][_0x4055b3(0x172)][_0x4055b3(0x2ec)];else{const _0x289f19=_0x1b5edd(_0x1a8d4b['$1']),_0x481c70=this['getSkillIdWithName'](_0x289f19);return _0x576245[_0x4055b3(0x1fb)](_0x481c70);}}return Scene_MenuBase['prototype'][_0x4055b3(0x292)][_0x4055b3(0x3e9)](this);},Scene_Equip[_0x2b9290(0x125)][_0x2b9290(0x168)]=function(){const _0x29d8fa=_0x2b9290;if(this[_0x29d8fa(0x53f)]()){if(_0x29d8fa(0x220)==='etPne')return this[_0x29d8fa(0x573)][_0x29d8fa(0x4e0)]/0x5/-0x3;else this['_commandWindow']['smoothSelect'](0x0),this[_0x29d8fa(0x387)][_0x29d8fa(0x5d1)]();}return Scene_MenuBase[_0x29d8fa(0x125)][_0x29d8fa(0x168)][_0x29d8fa(0x3e9)](this);},Scene_Equip['prototype']['popScene']=function(){const _0x2c281c=_0x2b9290;SceneManager[_0x2c281c(0x3e1)]();},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x406)]=Scene_Load[_0x2b9290(0x125)]['reloadMapIfUpdated'],Scene_Load[_0x2b9290(0x125)]['reloadMapIfUpdated']=function(){const _0x53b883=_0x2b9290;VisuMZ[_0x53b883(0x2d3)][_0x53b883(0x406)][_0x53b883(0x3e9)](this),this[_0x53b883(0x514)]();},Scene_Load[_0x2b9290(0x125)][_0x2b9290(0x514)]=function(){const _0x30f88e=_0x2b9290;if($gameSystem[_0x30f88e(0x614)]()!==$dataSystem[_0x30f88e(0x614)]){if(_0x30f88e(0x45d)===_0x30f88e(0x40e)){if(_0x1f5536['value'](_0x2c647e))return!![];}else for(const _0xdafdc5 of $gameActors[_0x30f88e(0x496)]){if(_0xdafdc5)_0xdafdc5['prepareNewEquipSlotsOnLoad']();}}},Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x4b5)]=function(){const _0x5a87b2=_0x2b9290;if(ConfigManager[_0x5a87b2(0x43d)]&&ConfigManager[_0x5a87b2(0x4e5)]!==undefined){if(_0x5a87b2(0x49d)!==_0x5a87b2(0x58e))return ConfigManager[_0x5a87b2(0x4e5)];else{const _0x7ebdc7=_0x2eab36(_0xdcdcda['$1'])['split'](',')[_0x5a87b2(0x5ec)](_0x476eb8=>_0x21cc21(_0x476eb8));for(const _0x3d481f of _0x7ebdc7){_0xafe48a['setValue'](_0x3d481f,![]);}}}else{if(this[_0x5a87b2(0x4e9)]())return this[_0x5a87b2(0x193)]()[_0x5a87b2(0x5c2)](/LOWER/i);else _0x5a87b2(0x380)===_0x5a87b2(0x380)?Scene_MenuBase[_0x5a87b2(0x125)][_0x5a87b2(0x2e7)][_0x5a87b2(0x3e9)](this):this[_0x5a87b2(0x314)]();}},Scene_Shop['prototype']['isRightInputMode']=function(){const _0x2b89de=_0x2b9290;if(ConfigManager[_0x2b89de(0x43d)]&&ConfigManager[_0x2b89de(0x50d)]!==undefined)return ConfigManager[_0x2b89de(0x50d)];else{if(this[_0x2b89de(0x4e9)]())return _0x2b89de(0x584)!=='cxKeV'?this[_0x2b89de(0x193)]()[_0x2b89de(0x5c2)](/RIGHT/i):this[_0x2b89de(0x474)]()[_0x2b89de(0x57b)](this[_0x2b89de(0x342)]()[_0x4803cd])?![]:this[_0x2b89de(0x50f)](_0x189d5a);else Scene_MenuBase[_0x2b89de(0x125)][_0x2b89de(0x2e7)][_0x2b89de(0x3e9)](this);}},Scene_Shop[_0x2b9290(0x125)]['updatedLayoutStyle']=function(){const _0x41e602=_0x2b9290;return VisuMZ[_0x41e602(0x2d3)][_0x41e602(0x389)][_0x41e602(0x44f)][_0x41e602(0x17d)];},Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x1a5)]=function(){const _0x65dd17=_0x2b9290;return this[_0x65dd17(0x40a)]&&this[_0x65dd17(0x40a)]['isUseModernControls']();},Scene_Shop['prototype'][_0x2b9290(0x4e9)]=function(){const _0x1351ea=_0x2b9290;return VisuMZ['ItemsEquipsCore'][_0x1351ea(0x389)][_0x1351ea(0x44f)][_0x1351ea(0x4be)];},VisuMZ[_0x2b9290(0x2d3)]['Scene_Shop_prepare']=Scene_Shop[_0x2b9290(0x125)]['prepare'],Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x621)]=function(_0x23997a,_0x340618){const _0x534f16=_0x2b9290;_0x23997a=VisuMZ[_0x534f16(0x2d3)][_0x534f16(0x53c)](_0x23997a),VisuMZ['ItemsEquipsCore'][_0x534f16(0x426)]['call'](this,_0x23997a,_0x340618),this[_0x534f16(0x4d2)]();},Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x4d2)]=function(){const _0x20760b=_0x2b9290;this['_goodsCount']=0x0;const _0x41fb89=[];for(const _0x5dc58f of this[_0x20760b(0x3c9)]){if(this[_0x20760b(0xe6)](_0x5dc58f)){if('oyJrh'==='IveZU'){if(!this[_0x20760b(0x47b)]()&&!_0x10bfe8[_0x20760b(0x3f0)](this[_0x20760b(0x4ae)]))return![];if(_0x330a8c[_0x20760b(0xf4)](this[_0x20760b(0x4ae)])&&!_0x17e744[_0x20760b(0x48f)]){const _0xff6059=_0x2332a2['keyItem'];this[_0x20760b(0x42e)](_0xff6059,_0x4fa090,_0x495b23,_0x2503a5,!![],_0x20760b(0x2ee));}else{const _0x5d0182=_0x398423[_0x20760b(0x376)];this[_0x20760b(0x42e)](_0x5d0182,_0x4768b0,_0x28c1bf,_0x1e9737,!![]);const _0x36cb9a=this['getItemQuantityText']();this[_0x20760b(0x42e)](_0x36cb9a,_0x3f2fd5,_0x43a030,_0x4dd9db,![],_0x20760b(0x5e9));}return this['drawItemDarkRect'](_0x404eb0,_0x1eb3c2,_0x8380d6),this[_0x20760b(0xe0)](),!![];}else this[_0x20760b(0x4a3)]++;}else _0x41fb89['push'](_0x5dc58f);}for(const _0x137b80 of _0x41fb89){this['_goods'][_0x20760b(0x156)](_0x137b80);}},Scene_Shop[_0x2b9290(0x125)]['isGoodShown']=function(_0x4bfba4){if(_0x4bfba4[0x0]>0x2||_0x4bfba4[0x0]<0x0)return![];const _0x1145e4=[$dataItems,$dataWeapons,$dataArmors][_0x4bfba4[0x0]][_0x4bfba4[0x1]];if(!_0x1145e4)return![];return!![];},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x2b4)]=Scene_Shop['prototype']['create'],Scene_Shop['prototype'][_0x2b9290(0x530)]=function(){const _0x55e299=_0x2b9290;VisuMZ['ItemsEquipsCore'][_0x55e299(0x2b4)][_0x55e299(0x3e9)](this),this[_0x55e299(0x4e9)]()&&this['postCreateItemsEquipsCore'](),this[_0x55e299(0x27a)]();},Scene_Shop[_0x2b9290(0x125)]['postCreateItemsEquipsCore']=function(){const _0x5ba21c=_0x2b9290;this['_dummyWindow'][_0x5ba21c(0x2db)](),this[_0x5ba21c(0x112)][_0x5ba21c(0x4d1)](),this['_buyWindow']['deselect'](),this[_0x5ba21c(0x169)][_0x5ba21c(0x4d1)]();},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x2bb)]=Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x1a1)],Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x1a1)]=function(){const _0x27ad06=_0x2b9290;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['helpWindowRectItemsEquipsCore']():VisuMZ[_0x27ad06(0x2d3)][_0x27ad06(0x2bb)][_0x27ad06(0x3e9)](this);},Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x202)]=function(){const _0x32118c=_0x2b9290,_0x45dcb4=0x0,_0x59b6a6=this[_0x32118c(0x22b)](),_0xb7233=Graphics[_0x32118c(0x16a)],_0x3512f8=this[_0x32118c(0x1f2)]();return new Rectangle(_0x45dcb4,_0x59b6a6,_0xb7233,_0x3512f8);},VisuMZ[_0x2b9290(0x2d3)]['Scene_Shop_goldWindowRect']=Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x58f)],Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x58f)]=function(){const _0x22c5ab=_0x2b9290;return this[_0x22c5ab(0x4e9)]()?this[_0x22c5ab(0x269)]():'rpVCj'===_0x22c5ab(0x2ed)?this['_shopStatusMenuAlly']?_0x52efd1[_0x22c5ab(0x48d)]:0x1:VisuMZ[_0x22c5ab(0x2d3)]['Scene_Shop_goldWindowRect'][_0x22c5ab(0x3e9)](this);},Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x269)]=function(){const _0x32b4e3=this['mainCommandWidth'](),_0x3077eb=this['calcWindowHeight'](0x1,!![]),_0x245c7d=this['isRightInputMode']()?0x0:Graphics['boxWidth']-_0x32b4e3,_0x4b30b5=this['mainAreaTop']();return new Rectangle(_0x245c7d,_0x4b30b5,_0x32b4e3,_0x3077eb);},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x196)]=Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x3b2)],Scene_Shop[_0x2b9290(0x125)]['commandWindowRect']=function(){const _0x5759ac=_0x2b9290;if(this[_0x5759ac(0x4e9)]())return _0x5759ac(0x582)!==_0x5759ac(0x582)?_0x3f92e3['ItemsEquipsCore'][_0x5759ac(0x389)][_0x5759ac(0x23e)][_0x5759ac(0x3cc)]:this[_0x5759ac(0x24f)]();else{if(_0x5759ac(0x219)!==_0x5759ac(0x219)){const _0x3344aa=this[_0x5759ac(0x2d5)][_0x5759ac(0x593)][_0x45424b],_0x205f5a=_0x19325a[_0x5759ac(0x125)]['buffIconIndex'](0x1,_0x3344aa);if(_0x205f5a>0x0){_0x3032b0+='\x5cI[%1]'[_0x5759ac(0x46a)](_0x205f5a),_0x1397f7++;if(_0x38a20c>=_0x571ed0)return _0x1aa8d4;}}else return VisuMZ[_0x5759ac(0x2d3)][_0x5759ac(0x196)]['call'](this);}},Scene_Shop['prototype']['commandWindowRectItemsEquipsCore']=function(){const _0x4b4d3d=_0x2b9290,_0x9615da=this[_0x4b4d3d(0x2e7)]()?this[_0x4b4d3d(0x31e)]():0x0,_0x2b9a33=this[_0x4b4d3d(0x33a)](),_0x4b1292=Graphics[_0x4b4d3d(0x16a)]-this[_0x4b4d3d(0x31e)](),_0x251fe8=this[_0x4b4d3d(0x1f9)](0x1,!![]);return new Rectangle(_0x9615da,_0x2b9a33,_0x4b1292,_0x251fe8);},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x402)]=Scene_Shop['prototype'][_0x2b9290(0x4c3)],Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x4c3)]=function(){const _0x164439=_0x2b9290;return this[_0x164439(0x4e9)]()?this[_0x164439(0x17c)]():VisuMZ[_0x164439(0x2d3)][_0x164439(0x402)][_0x164439(0x3e9)](this);},Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x17c)]=function(){const _0x4768eb=_0x2b9290,_0xe4824d=this['_commandWindow']['y']+this[_0x4768eb(0x4e1)]['height'],_0x3e9fdc=Graphics[_0x4768eb(0x16a)]-this[_0x4768eb(0x555)](),_0x3718ff=this[_0x4768eb(0x2e7)]()?Graphics[_0x4768eb(0x16a)]-_0x3e9fdc:0x0,_0x55f1bc=this['mainAreaHeight']()-this[_0x4768eb(0x4e1)][_0x4768eb(0x419)];return new Rectangle(_0x3718ff,_0xe4824d,_0x3e9fdc,_0x55f1bc);},VisuMZ[_0x2b9290(0x2d3)]['Scene_Shop_statusWindowRect']=Scene_Shop['prototype'][_0x2b9290(0x55a)],Scene_Shop['prototype']['statusWindowRect']=function(){const _0x440d4f=_0x2b9290;return this[_0x440d4f(0x4e9)]()?this['statusWindowRectItemsEquipsCore']():VisuMZ[_0x440d4f(0x2d3)][_0x440d4f(0x18d)]['call'](this);},Scene_Shop['prototype'][_0x2b9290(0x2f0)]=function(){const _0x30d271=_0x2b9290,_0x8a597e=this[_0x30d271(0x555)](),_0xb38339=this[_0x30d271(0x60b)]()-this['_commandWindow']['height'],_0x114e98=this[_0x30d271(0x2e7)]()?0x0:Graphics[_0x30d271(0x16a)]-_0x8a597e,_0x42f37=this[_0x30d271(0x4e1)]['y']+this[_0x30d271(0x4e1)][_0x30d271(0x419)];return new Rectangle(_0x114e98,_0x42f37,_0x8a597e,_0xb38339);},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x2d9)]=Scene_Shop[_0x2b9290(0x125)]['buyWindowRect'],Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x22e)]=function(){const _0x149807=_0x2b9290;if(this[_0x149807(0x4e9)]()){if(_0x149807(0x635)===_0x149807(0x635))return this['buyWindowRectItemsEquipsCore']();else{const _0x1b46ff=new _0x1b7f58(0x0,0x0,_0x3c015e[_0x149807(0x4e0)],_0x1ee5f2[_0x149807(0x419)]);this[_0x149807(0x4c8)]=new _0x5928de(_0x1b46ff),this['_commandNameWindow'][_0x149807(0x3d0)]=0x0,this[_0x149807(0x1f5)](this[_0x149807(0x4c8)]),this[_0x149807(0x32d)]();}}else{if(_0x149807(0x197)===_0x149807(0x197))return VisuMZ['ItemsEquipsCore'][_0x149807(0x2d9)][_0x149807(0x3e9)](this);else{if(_0x2d0492===null||typeof _0xc5e293!=='object')return _0x46fb72;const _0x57e615=_0x29127a['isArray'](_0x359cb7)?[]:_0x5d78ca[_0x149807(0x530)](_0x3b9ae1['getPrototypeOf'](_0x348b43));for(const _0x45e887 in _0x2f5c92){_0x265e2b[_0x149807(0x125)][_0x149807(0x5ef)]['call'](_0x1cb55a,_0x45e887)&&(_0x57e615[_0x45e887]=typeof _0x1d1859[_0x45e887]===_0x149807(0x396)&&_0x58a898[_0x45e887]!==null?_0x4a8c99[_0x149807(0x2d3)][_0x149807(0x53c)](_0x31e91d[_0x45e887]):_0x189c4f[_0x45e887]);}return _0x57e615;}}},Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x3ed)]=function(){const _0x46d301=_0x2b9290,_0x29a032=this[_0x46d301(0x4e1)]['y']+this[_0x46d301(0x4e1)][_0x46d301(0x419)],_0x27698d=Graphics[_0x46d301(0x16a)]-this[_0x46d301(0x555)](),_0x4273ff=this[_0x46d301(0x60b)]()-this[_0x46d301(0x4e1)][_0x46d301(0x419)],_0x246bee=this[_0x46d301(0x2e7)]()?Graphics['boxWidth']-_0x27698d:0x0;return new Rectangle(_0x246bee,_0x29a032,_0x27698d,_0x4273ff);},VisuMZ[_0x2b9290(0x2d3)]['Scene_Shop_createCategoryWindow']=Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x14c)],Scene_Shop[_0x2b9290(0x125)]['createCategoryWindow']=function(){const _0x5ecf2c=_0x2b9290;VisuMZ['ItemsEquipsCore'][_0x5ecf2c(0x1a9)][_0x5ecf2c(0x3e9)](this),this[_0x5ecf2c(0x1a5)]()&&this[_0x5ecf2c(0x2f9)]();},VisuMZ[_0x2b9290(0x2d3)]['Scene_Shop_categoryWindowRect']=Scene_Shop['prototype'][_0x2b9290(0x5b2)],Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x5b2)]=function(){const _0x54e07d=_0x2b9290;if(this[_0x54e07d(0x4e9)]())return this[_0x54e07d(0x4ab)]();else{if(_0x54e07d(0x2e2)===_0x54e07d(0x2e2))return VisuMZ['ItemsEquipsCore'][_0x54e07d(0x417)][_0x54e07d(0x3e9)](this);else{const _0x41a24b=_0x45edaf['ItemsEquipsCore'][_0x54e07d(0x389)][_0x54e07d(0x23e)][_0x54e07d(0x2c0)];return _0x41a24b['format'](_0x9db630['mp']);}}},Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x4ab)]=function(){const _0x2bec5b=_0x2b9290,_0x309d96=this[_0x2bec5b(0x4e1)]['y'],_0x339f57=this[_0x2bec5b(0x4e1)]['width'],_0xaf4cfa=this[_0x2bec5b(0x1f9)](0x1,!![]),_0x5110b5=this[_0x2bec5b(0x2e7)]()?Graphics[_0x2bec5b(0x16a)]-_0x339f57:0x0;return new Rectangle(_0x5110b5,_0x309d96,_0x339f57,_0xaf4cfa);},Scene_Shop['prototype'][_0x2b9290(0x2f9)]=function(){const _0x191e3b=_0x2b9290;delete this[_0x191e3b(0x40a)][_0x191e3b(0x464)]['ok'],delete this[_0x191e3b(0x40a)]['_handlers'][_0x191e3b(0x1fe)];},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x14d)]=Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x3a5)],Scene_Shop[_0x2b9290(0x125)]['createSellWindow']=function(){const _0x4830af=_0x2b9290;VisuMZ['ItemsEquipsCore'][_0x4830af(0x14d)]['call'](this);if(this[_0x4830af(0x4e9)]()){if('BPPOK'!=='BPPOK'){if(!this[_0x4830af(0x427)](_0xb2946))return![];const _0x5aad69=_0x2d1d01[_0x4830af(0x327)];if(!_0x5aad69)return![];if(_0x5aad69[_0x4830af(0x5c2)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x5aad69['match'](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];}else this[_0x4830af(0x241)]();}},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x23a)]=Scene_Shop['prototype'][_0x2b9290(0x2e3)],Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x2e3)]=function(){const _0x2a7f4f=_0x2b9290;return this[_0x2a7f4f(0x4e9)]()?this[_0x2a7f4f(0x5ed)]():VisuMZ['ItemsEquipsCore'][_0x2a7f4f(0x23a)][_0x2a7f4f(0x3e9)](this);},Scene_Shop['prototype'][_0x2b9290(0x5ed)]=function(){const _0x516efd=_0x2b9290,_0xa1cb38=this['_categoryWindow']['y']+this[_0x516efd(0x40a)][_0x516efd(0x419)],_0x3f5596=Graphics[_0x516efd(0x16a)]-this[_0x516efd(0x555)](),_0x538bd4=this[_0x516efd(0x60b)]()-this['_categoryWindow'][_0x516efd(0x419)],_0x3156f9=this[_0x516efd(0x2e7)]()?Graphics[_0x516efd(0x16a)]-_0x3f5596:0x0;return new Rectangle(_0x3156f9,_0xa1cb38,_0x3f5596,_0x538bd4);},Scene_Shop['prototype']['postCreateSellWindowItemsEquipsCore']=function(){const _0x58cb5c=_0x2b9290;this[_0x58cb5c(0x2a8)][_0x58cb5c(0x489)](this['_statusWindow']);},Scene_Shop[_0x2b9290(0x125)]['statusWidth']=function(){const _0x4ac35a=_0x2b9290;return VisuMZ['ItemsEquipsCore']['Settings'][_0x4ac35a(0x23e)][_0x4ac35a(0x430)];},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x2ea)]=Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x210)],Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x210)]=function(){const _0x1b63cf=_0x2b9290;VisuMZ[_0x1b63cf(0x2d3)]['Scene_Shop_activateSellWindow']['call'](this),this[_0x1b63cf(0x4e9)]()&&this['_statusWindow'][_0x1b63cf(0x4d1)](),this[_0x1b63cf(0x2a8)][_0x1b63cf(0x185)]();},VisuMZ[_0x2b9290(0x2d3)]['Scene_Shop_commandBuy']=Scene_Shop['prototype']['commandBuy'],Scene_Shop['prototype'][_0x2b9290(0x5c5)]=function(){const _0x1dedaf=_0x2b9290;VisuMZ[_0x1dedaf(0x2d3)][_0x1dedaf(0x459)][_0x1dedaf(0x3e9)](this),this[_0x1dedaf(0x4e9)]()&&this[_0x1dedaf(0x479)]();},Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x479)]=function(){const _0x2d9c65=_0x2b9290;this['_buyWindowLastIndex']=this[_0x2d9c65(0x107)]||0x0,this['_buyWindow']['smoothSelect'](this[_0x2d9c65(0x107)]);},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x198)]=Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x2cd)],Scene_Shop['prototype'][_0x2b9290(0x2cd)]=function(){const _0x14783e=_0x2b9290;VisuMZ[_0x14783e(0x2d3)]['Scene_Shop_commandSell']['call'](this),this[_0x14783e(0x4e9)]()&&this[_0x14783e(0x4c4)](),this[_0x14783e(0x1a5)]()&&(this[_0x14783e(0x40a)]['smoothSelect'](0x0),this[_0x14783e(0x423)]());},Scene_Shop['prototype'][_0x2b9290(0x4c4)]=function(){const _0xace4cb=_0x2b9290;this[_0xace4cb(0x112)][_0xace4cb(0x2db)](),this[_0xace4cb(0x4e1)][_0xace4cb(0x2db)]();},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x22d)]=Scene_Shop['prototype'][_0x2b9290(0x401)],Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x401)]=function(){const _0x307b55=_0x2b9290;VisuMZ['ItemsEquipsCore']['Scene_Shop_onBuyCancel'][_0x307b55(0x3e9)](this);if(this[_0x307b55(0x4e9)]()){if(_0x307b55(0x2be)===_0x307b55(0x2be))this[_0x307b55(0x140)]();else return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x307b55(0x24f)]():_0x3cc3e1[_0x307b55(0x2d3)][_0x307b55(0x4a5)]['call'](this);}},Scene_Shop[_0x2b9290(0x125)]['onBuyCancelItemsEquipsCore']=function(){const _0xf35e4b=_0x2b9290;this['_buyWindowLastIndex']=this[_0xf35e4b(0x112)][_0xf35e4b(0x362)](),this['_buyWindow'][_0xf35e4b(0x4d1)](),this[_0xf35e4b(0x112)]['deselect'](),this[_0xf35e4b(0x112)][_0xf35e4b(0x54f)](0x0,0x0),this[_0xf35e4b(0x169)][_0xf35e4b(0x4d1)](),this[_0xf35e4b(0x4b4)][_0xf35e4b(0x2db)]();},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x2bf)]=Scene_Shop['prototype'][_0x2b9290(0x4f3)],Scene_Shop['prototype'][_0x2b9290(0x4f3)]=function(){const _0x251b49=_0x2b9290;VisuMZ[_0x251b49(0x2d3)][_0x251b49(0x2bf)][_0x251b49(0x3e9)](this);if(this[_0x251b49(0x4e9)]()){if(_0x251b49(0x15d)!==_0x251b49(0x15d))return _0x4d34e5[_0x251b49(0x2d3)][_0x251b49(0x389)][_0x251b49(0x44f)][_0x251b49(0x17d)];else this[_0x251b49(0x35e)]();}},Scene_Shop['prototype'][_0x2b9290(0x35e)]=function(){const _0x34a7fb=_0x2b9290;this[_0x34a7fb(0x112)][_0x34a7fb(0x4d1)](),this[_0x34a7fb(0x4e1)][_0x34a7fb(0x4d1)]();},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x39d)]=Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x525)],Scene_Shop['prototype'][_0x2b9290(0x525)]=function(){const _0x3f0f70=_0x2b9290;$gameTemp[_0x3f0f70(0x1d0)]=!![],VisuMZ['ItemsEquipsCore'][_0x3f0f70(0x39d)][_0x3f0f70(0x3e9)](this),$gameTemp[_0x3f0f70(0x1d0)]=![],this[_0x3f0f70(0x4ae)]=this[_0x3f0f70(0x112)][_0x3f0f70(0x4d3)]();},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x4c1)]=Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x5f2)],Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x5f2)]=function(){const _0x17dc9a=_0x2b9290;$gameTemp['_bypassProxy']=!![],this[_0x17dc9a(0x4ae)]=this[_0x17dc9a(0x112)][_0x17dc9a(0x4d3)]();const _0x2726ee=VisuMZ['ItemsEquipsCore']['Scene_Shop_buyingPrice'][_0x17dc9a(0x3e9)](this);return $gameTemp[_0x17dc9a(0x1d0)]=![],this[_0x17dc9a(0x4ae)]=this[_0x17dc9a(0x112)][_0x17dc9a(0x4d3)](),_0x2726ee;},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x61b)]=Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x2b8)],Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x2b8)]=function(){const _0x124175=_0x2b9290;VisuMZ[_0x124175(0x2d3)]['Scene_Shop_onSellOk'][_0x124175(0x3e9)](this),this[_0x124175(0x4e9)]()&&this[_0x124175(0x51c)]();},Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x51c)]=function(){const _0x330772=_0x2b9290;this['_categoryWindow'][_0x330772(0x4d1)]();},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x526)]=Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x17e)],Scene_Shop[_0x2b9290(0x125)]['onSellCancel']=function(){const _0x34e4d7=_0x2b9290;VisuMZ['ItemsEquipsCore'][_0x34e4d7(0x526)][_0x34e4d7(0x3e9)](this),this[_0x34e4d7(0x1a5)]()&&this[_0x34e4d7(0x4f3)](),this[_0x34e4d7(0x4e9)]()&&this[_0x34e4d7(0x4b4)]['hide']();},Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x105)]=function(_0x2d61cd){const _0x4104ea=_0x2b9290,_0x504829=this[_0x4104ea(0x4ae)];this[_0x4104ea(0x4ae)]=_0x2d61cd;const _0x1fc023=this[_0x4104ea(0x4a0)]();return this[_0x4104ea(0x4ae)]=_0x504829,_0x1fc023;},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x5bd)]=Scene_Shop[_0x2b9290(0x125)]['sellingPrice'],Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x4a0)]=function(){const _0x54f1d3=_0x2b9290;let _0x1fc6b6=this[_0x54f1d3(0x39e)]();const _0x3ad857=this[_0x54f1d3(0x4ae)];return _0x1fc6b6=VisuMZ[_0x54f1d3(0x2d3)][_0x54f1d3(0x389)][_0x54f1d3(0x44f)]['SellPriceJS'][_0x54f1d3(0x3e9)](this,_0x3ad857,_0x1fc6b6),_0x1fc6b6;},Scene_Shop['prototype'][_0x2b9290(0x39e)]=function(){const _0xf996a5=_0x2b9290;let _0x3a09d7=this[_0xf996a5(0x4ae)][_0xf996a5(0x1d2)];if(!this['_item'])return 0x0;else{if(this[_0xf996a5(0x4ae)]['note'][_0xf996a5(0x5c2)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x2c754b=String(RegExp['$1']);let _0x4aa859=this[_0xf996a5(0x4ae)],_0x1df33b=_0x3a09d7*this[_0xf996a5(0x1c9)]();try{_0xf996a5(0x366)!==_0xf996a5(0x366)?(this[_0xf996a5(0x112)][_0xf996a5(0x2db)](),this[_0xf996a5(0x4e1)][_0xf996a5(0x2db)]()):eval(_0x2c754b);}catch(_0x19ecf2){if(_0xf996a5(0x268)!==_0xf996a5(0x240)){if($gameTemp[_0xf996a5(0x238)]())console[_0xf996a5(0x542)](_0x19ecf2);}else return this[_0xf996a5(0x193)]()[_0xf996a5(0x5c2)](/RIGHT/i);}if(isNaN(_0x1df33b))_0x1df33b=0x0;return Math[_0xf996a5(0x5d8)](_0x1df33b);}else{if(this[_0xf996a5(0x4ae)][_0xf996a5(0x327)]['match'](/<SELL PRICE:[ ](\d+)>/i)){if(_0xf996a5(0xee)===_0xf996a5(0xee))return parseInt(RegExp['$1']);else{const _0x14e820=this['_commandNameWindow'];_0x14e820[_0xf996a5(0x12b)](_0x2a4e6c,0x0,_0x461449['y'],_0x14e820[_0xf996a5(0x596)],_0xf996a5(0x2ee));}}else return Math[_0xf996a5(0x5d8)](this[_0xf996a5(0x18e)]());}}},Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x18e)]=function(){const _0x5c7f38=_0x2b9290;return this[_0x5c7f38(0x4ae)][_0x5c7f38(0x1d2)]*this[_0x5c7f38(0x1c9)]();},Scene_Shop['prototype'][_0x2b9290(0x1c9)]=function(){const _0x559508=_0x2b9290;return VisuMZ[_0x559508(0x2d3)]['Settings'][_0x559508(0x44f)][_0x559508(0x508)];},Scene_Shop['prototype'][_0x2b9290(0x123)]=function(){const _0x218aa0=_0x2b9290;if(!this[_0x218aa0(0x193)]())return![];if(!this[_0x218aa0(0x1a5)]())return![];if(!this['_sellWindow'])return![];if(!this[_0x218aa0(0x2a8)][_0x218aa0(0x377)])return![];return this[_0x218aa0(0x193)]()&&this[_0x218aa0(0x1a5)]();},Scene_Shop['prototype']['buttonAssistKey1']=function(){const _0x2c59c8=_0x2b9290;if(this['buttonAssistItemListRequirement']()){if(this['_sellWindow'][_0x2c59c8(0x3f1)]()===0x1){if(_0x2c59c8(0x190)!=='fLhLZ')return TextManager[_0x2c59c8(0x45e)](_0x2c59c8(0x2e6),'right');else{_0x53b797[_0x2c59c8(0x125)][_0x2c59c8(0x233)][_0x2c59c8(0x3e9)](this);if(this['_categoryNameWindow'])this[_0x2c59c8(0x372)]();}}else return TextManager['getInputMultiButtonStrings'](_0x2c59c8(0x15e),_0x2c59c8(0x568));}else{if(this[_0x2c59c8(0x25b)]&&this[_0x2c59c8(0x25b)][_0x2c59c8(0x377)]){if('tRUqm'!==_0x2c59c8(0x39a))return TextManager[_0x2c59c8(0x45e)]('left','right');else{if(!_0x3e3161[_0x2c59c8(0x5f9)](_0x5539bc))return!![];}}}return Scene_MenuBase[_0x2c59c8(0x125)][_0x2c59c8(0x3ef)][_0x2c59c8(0x3e9)](this);},Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x5ae)]=function(){const _0x392998=_0x2b9290;if(this[_0x392998(0x25b)]&&this['_numberWindow'][_0x392998(0x377)])return TextManager[_0x392998(0x45e)]('up',_0x392998(0x211));return Scene_MenuBase[_0x392998(0x125)]['buttonAssistKey2'][_0x392998(0x3e9)](this);},Scene_Shop['prototype']['buttonAssistText1']=function(){const _0xca199=_0x2b9290;if(this['buttonAssistItemListRequirement']()){if(_0xca199(0x2fb)!==_0xca199(0x5ff))return VisuMZ[_0xca199(0x2d3)][_0xca199(0x389)][_0xca199(0x38e)]['buttonAssistCategory'];else _0xefd796=this[_0xca199(0xe7)](_0x35d380);}else{if(this['_numberWindow']&&this[_0xca199(0x25b)][_0xca199(0x377)]){if(_0xca199(0x3e5)===_0xca199(0x14a))this[_0xca199(0x311)]=[];else return VisuMZ[_0xca199(0x2d3)]['Settings'][_0xca199(0x44f)][_0xca199(0x510)];}}return Scene_MenuBase[_0xca199(0x125)]['buttonAssistText1']['call'](this);},Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x5e5)]=function(){const _0xb6b54e=_0x2b9290;if(this[_0xb6b54e(0x25b)]&&this[_0xb6b54e(0x25b)][_0xb6b54e(0x377)])return VisuMZ['ItemsEquipsCore'][_0xb6b54e(0x389)]['ShopScene'][_0xb6b54e(0x1e0)];return Scene_MenuBase[_0xb6b54e(0x125)][_0xb6b54e(0x5e5)][_0xb6b54e(0x3e9)](this);},Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x27a)]=function(){const _0x3eee3c=_0x2b9290;if(!SceneManager[_0x3eee3c(0x3fd)]())return;const _0x54c72a=VisuMZ[_0x3eee3c(0x2d3)]['Settings'][_0x3eee3c(0x44f)];_0x54c72a[_0x3eee3c(0x206)]&&('kTtva'!==_0x3eee3c(0x623)?this[_0x3eee3c(0x253)]():$gameSwitches[_0x3eee3c(0x3de)](_0x54c72a[_0x3eee3c(0x206)],![]));if(_0x54c72a[_0x3eee3c(0x498)]){if('CISjl'===_0x3eee3c(0x143))$gameSwitches[_0x3eee3c(0x3de)](_0x54c72a[_0x3eee3c(0x498)],![]);else{const _0x30c497=_0x3eee3c(0x502);if(this[_0x3eee3c(0x2d5)][_0x3eee3c(0x5ba)]===0x0&&!this[_0x3eee3c(0x5be)][_0x30c497])return![];const _0x8ef494=this['getItemEffectsSelfTpGainLabel']();this[_0x3eee3c(0x42e)](_0x8ef494,_0x228893,_0x390f67,_0x37f1b2,!![]);const _0x94c326=this[_0x3eee3c(0x178)]();return this[_0x3eee3c(0x2d5)]['selfTP']>0x0?this['changeTextColor'](_0x78acb7[_0x3eee3c(0x234)]()):this[_0x3eee3c(0x594)](_0x5b7813[_0x3eee3c(0x524)]()),this[_0x3eee3c(0x42e)](_0x94c326,_0xe7e232,_0x27d4eb,_0x5d70a7,![],_0x3eee3c(0x5e9)),this['drawItemDarkRect'](_0x3f313e,_0x1de3bf,_0x528e33),this[_0x3eee3c(0xe0)](),!![];}}},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x473)]=Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x217)],Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x217)]=function(_0x25e504){const _0x549a02=_0x2b9290;VisuMZ['ItemsEquipsCore']['Scene_Shop_doBuy'][_0x549a02(0x3e9)](this,_0x25e504),this[_0x549a02(0x520)](this[_0x549a02(0x4ae)],_0x25e504);if(_0x25e504<=0x0)return;const _0x284aa8=VisuMZ[_0x549a02(0x2d3)][_0x549a02(0x389)]['ShopScene'];_0x284aa8[_0x549a02(0x206)]&&$gameSwitches[_0x549a02(0x3de)](_0x284aa8['SwitchBuy'],!![]),this[_0x549a02(0x112)][_0x549a02(0x2ef)](),this[_0x549a02(0x2a8)][_0x549a02(0x2ef)]();},Scene_Shop['prototype'][_0x2b9290(0x520)]=function(_0x3d46c9,_0x3a12c7){const _0x116688=_0x2b9290;this[_0x116688(0x412)](_0x3d46c9,_0x3a12c7),$gameParty[_0x116688(0x3ad)](_0x3d46c9,_0x3a12c7),$gameParty[_0x116688(0x500)](_0x3a12c7*this[_0x116688(0x5f2)]());},Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x412)]=function(_0x288732,_0x1a31fa){const _0x4ced1d=_0x2b9290;if(!_0x288732)return;if(!_0x1a31fa)return;const _0x59bffe=VisuMZ['ItemsEquipsCore'][_0x4ced1d(0x164)],_0x4c6adb=_0x288732[_0x4ced1d(0x327)]||'';if(_0x4c6adb[_0x4ced1d(0x5c2)](_0x59bffe[_0x4ced1d(0x117)])){if('ISCwU'!==_0x4ced1d(0x3d9)){const _0xbd5fc6=String(RegExp['$1'])[_0x4ced1d(0x435)](',')[_0x4ced1d(0x5ec)](_0x8697f=>Number(_0x8697f));for(const _0x2854d6 of _0xbd5fc6){$gameSwitches[_0x4ced1d(0x3de)](_0x2854d6,!![]);}}else return this[_0x4ced1d(0x392)]();}if(_0x4c6adb['match'](_0x59bffe[_0x4ced1d(0x44e)])){const _0x48c783=String(RegExp['$1'])['split'](',')['map'](_0xeafcd0=>Number(_0xeafcd0));for(const _0x2d5458 of _0x48c783){$gameSwitches[_0x4ced1d(0x3de)](_0x2d5458,![]);}}},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x124)]=Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x1dd)],Scene_Shop[_0x2b9290(0x125)][_0x2b9290(0x1dd)]=function(_0x14d9a0){const _0x8720f0=_0x2b9290;VisuMZ[_0x8720f0(0x2d3)][_0x8720f0(0x124)][_0x8720f0(0x3e9)](this,_0x14d9a0),this[_0x8720f0(0x180)](this[_0x8720f0(0x4ae)],_0x14d9a0);if(_0x14d9a0<=0x0)return;const _0x38a588=VisuMZ[_0x8720f0(0x2d3)]['Settings'][_0x8720f0(0x44f)];_0x38a588['SwitchBuy']&&$gameSwitches[_0x8720f0(0x3de)](_0x38a588[_0x8720f0(0x498)],!![]),this['_buyWindow']['refresh'](),this['_sellWindow'][_0x8720f0(0x2ef)]();},Scene_Shop['prototype'][_0x2b9290(0x180)]=function(_0x268a71,_0x4de2eb){const _0xbbc4a0=_0x2b9290;this[_0xbbc4a0(0x1c5)](_0x268a71,_0x4de2eb),$gameParty[_0xbbc4a0(0x2a1)](_0x268a71,_0x4de2eb),$gameParty['addShopTrackingGoldSell'](_0x4de2eb*this[_0xbbc4a0(0x4a0)]());},Scene_Shop[_0x2b9290(0x125)]['processShopCondListingOnSellItem']=function(_0x3dd5ab,_0x4192fc){const _0x5a0ac2=_0x2b9290;if(!_0x3dd5ab)return;if(!_0x4192fc)return;const _0xe446ba=VisuMZ[_0x5a0ac2(0x2d3)][_0x5a0ac2(0x164)],_0x336538=_0x3dd5ab[_0x5a0ac2(0x327)]||'';if(_0x336538['match'](_0xe446ba[_0x5a0ac2(0x1ca)])){if(_0x5a0ac2(0x2cf)!==_0x5a0ac2(0x2f3)){const _0x1a16fd=String(RegExp['$1'])[_0x5a0ac2(0x435)](',')[_0x5a0ac2(0x5ec)](_0x4145cb=>Number(_0x4145cb));for(const _0x5354a6 of _0x1a16fd){$gameSwitches['setValue'](_0x5354a6,!![]);}}else this[_0x5a0ac2(0x2d5)][_0x5a0ac2(0x5ba)]=this[_0x5a0ac2(0x4ae)][_0x5a0ac2(0x5af)],_0x124226=!![];}if(_0x336538['match'](_0xe446ba[_0x5a0ac2(0x274)])){const _0x19a1e1=String(RegExp['$1'])[_0x5a0ac2(0x435)](',')[_0x5a0ac2(0x5ec)](_0x230d00=>Number(_0x230d00));for(const _0x4a93b4 of _0x19a1e1){if(_0x5a0ac2(0x313)===_0x5a0ac2(0x10d)){const _0x3cef0f=_0x236400[_0x12f272];_0x3cef0f&&_0x3cef0f['etypeId']===_0x39d686+0x1&&_0x5825bf[_0x5a0ac2(0x52d)](_0x3cef0f);}else $gameSwitches[_0x5a0ac2(0x3de)](_0x4a93b4,![]);}}};function Sprite_NewLabel(){const _0x41cff7=_0x2b9290;this[_0x41cff7(0x130)](...arguments);}function _0x2121(){const _0x56bac1=['MXEmp','refreshActorEquipSlotsIfUpdated','helpDesc','isSoleWeaponType','params','isTriggered','currentExt','limitedPageUpDownSceneCheck','sell','onSellOkItemsEquipsCore','playBuzzerSound','drawItemStyleIconText','addInnerChild','onBuyItem','placeItemNewLabel','_tempActorA','textColor','powerDownColor','onBuyOk','Scene_Shop_onSellCancel','Game_Actor_paramPlus','canEquip','HPfbQ','prepareNextScene','gaugeBackColor','WBxMB','push','ELEMENT','foreground','create','Ojuqe','hideNewLabelSprites','ylYho','xPAkw','drawing','popScene','RQzEP','filter','fill','Ayqjq','LabelDamageHP','deepCopy','Window_ShopSell_isEnabled','Parse_Notetags_Prices','buttonAssistSlotWindowShift','getItemEffectsRemovedStatesBuffsText','SpeedNeg1999','log','tewZW','EsfyZ','getItemEffectsMpRecoveryLabel','tuTKP','equipSlotIndex','REPEAT','itemLineRect','commandEquip','createCommandWindow','postCreateSlotWindowItemsEquipsCore','damageColor','IEkrN','smoothScrollTo','min','gainTP','AllArmors','New','bxNuC','statusWidth','Actors','adjustItemWidthByStatus','_resetFontColor','drawRemoveItem','statusWindowRect','Window_ShopCommand_initialize','Step3Start','uawAd','commandStyle','MenuPortraits','select','OaNeD','setBackgroundType','EEwXA','drawItemSuccessRate','×%1','bbeSm','IECet','pagedown','drawItemEffectsHpRecovery','nOayz','setupBattleTestItems','partyArtifacts','optimizeEquipments','lKISu','ZboIT','isPressed','getNextAvailableEtypeId','createStatusWindow','_buttonAssistWindow','process_VisuMZ_ItemsEquipsCore_RegExp','Window_EquipItem_includes','%1%','onTouchSelect','meetsItemConditionsNotetags','removeStateBuffChanges','def','includes','aMjSF','money','getItemDamageAmountTextBattleCore','%1-%2','EFFECT_RECOVER_MP','xXOgs','isnGc','scrollTo','ddZcS','cursorLeft','ZuBrl','bLxHs','xwKZH','getColor','cUEgF','OTlEE','XennL','nUqQn','aLeIN','goldWindowRect','_tempActorB','commandName','defaultItemMax','removeBuff','changeTextColor','buttonAssistKey3','innerWidth','CJxMX','Game_Party_initialize','MAT','sGseK','Scene_Equip_createSlotWindow','VisuMZ_0_CoreEngine','ConvertNumberToString','getItemEffectsSelfTpGainLabel','equip','rateHP','orycv','QvwxN','drawPossession','NotConsumable','_list','artifactIDs','categoryStyle','QCvEX','GzThw','paintOpacity','values','Speed2000','characterName','buttonAssistKey2','tpGain','Parse_Notetags_EquipSlots','lwSez','categoryWindowRect','clamp','getItemRepeatsText','modifiedBuyPriceItemsEquipsCore','HvIQF','paramPlusItemsEquipsCoreCustomJS','_checkEquipRequirements','NQRkA','selfTP','makeItemData','random','Scene_Shop_sellingPrice','_customItemInfo','Parse_Notetags_Batch','FoIbP','Blvrd','match','smallParamFontSize','systemColor','commandBuy','gaugeLineHeight','drawItemDamageAmount','_resetFontSize','getItemDamageAmountTextOriginal','equipTypes','concat','CmdIconOptimize','isProxyItem','scnnR','yOcUq','XutGc','deactivate','hpRate','currentSymbol','gbeHz','equips','dataId','getWeaponIdWithName','floor','ADDED\x20EFFECTS','CoAQS','LabelSelfGainTP','ayugq','zUuKV','fontSize','drawItemData','oVKNP','onSlotCancel','ilPrU','itemPadding','weapon','buttonAssistText2','category','drawItemScope','drawUpdatedParamValueDiff','right','drawNewLabelIcon','elements','map','sellWindowRectItemsEquipsCore','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','hasOwnProperty','CmdIconEquip','_category','buyingPrice','iPjzB','mhp','_allowArtifactParamBase','getItemConsumableText','GCmcR','drawItemEffects','value','activateItemWindow','ARRAYSTR','commandNameWindowCenter','Window_ItemCategory_initialize','_slotId','wDaCB','CMvnD','setItemDelay','uIAQt','Scene_Equip_commandEquip','PGnQk','drawItemEffectsTpDamage','drawTextEx','MBVjF','JGdio','_doubleTouch','NoChangeMarker','mainAreaHeight','1153554DNzCcS','CommandAddClear','BattleUsable','resetTextColor','Window_ShopBuy_item','ajbiM','_cache','ARRAYEVAL','versionId','JIIVV','drawItemCustomEntryLine','paramchangeTextColor','createNewLabelSprite','anyEmptyEquipSlotsOfSameEtype','setItem','Scene_Shop_onSellOk','allMembers','etypeId','registerCommand','MaxIcons','Game_Enemy_traitObjects_artifact','prepare','_money','kTtva','keOMI','lineHeight','isOpenAndActive','DrawFaceJS','List','Scene_Item_create','bQZvG','EVAL','AllItems','Game_Actor_equips_artifacts','activate','equipItems','_cache_etypeIDs','getItemEffects','drawItemEffectsSelfTpGain','KeyItems','BackRectColor','CQElt','qFsNc','689090VgpvCp','repeats','isSoleArmorType','proxyItem','resetFontSettings','tradeItemWithParty','AlwaysUsable','isHandled','FontSize','weaponTypes','isGoodShown','getEtypeIdWithName','ubyKH','paramBase','equipCmdDesc','ActorChangeEquipSlots','?????','IiwJI','harIf','ulIKI','ogRiy','createItemWindow','text','5BHFdoB','isKeyItem','VTGgo','type','round','createTempActorEquips','splice','zCfBx','getItemEffectsMpDamageText','Window_ItemList_drawItem','vWuYQ','isOptimizeEquipOk','fynME','Window_ItemList_item','getItemsEquipsCoreBackColor1','elementId','wDpOP','addItemCategories','sellPriceOfItem','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_buyWindowLastIndex','optimize','Damage\x20Formula\x20Error\x20for\x20%1','armor','occasion','isEquipped','qkDca','code','drawParamsItemsEquipsCore','drawUpdatedAfterParamValue','initNewItemsList','_buyWindow','paramJS','_actor','DmpfK','getItemSuccessRateLabel','BuyTurnSwitchOn','XJPcP','releaseUnequippableItems','getItemSuccessRateText','vJdKj','bfKMs','getEquipRequirements','nonRemovableEtypes','replace','onSlotOkAutoSelect','buttonAssistText1','GdZYs','buttonAssistItemListRequirement','Scene_Shop_doSell','prototype','Scene_Equip_onSlotOk','deselect','weapon-%1','CmdCancelRename','NonOptimizeETypes','drawText','wOLyQ','getClassIdWithName','getItemOccasionText','getShopTrackingData','initialize','DrawIcons','isOpen','EHmJP','cursorPagedown','mZTJy','itemAt','updateSmoothScroll','xrjsQ','Game_Item_setObject','EFFECT_ADD_BUFF','iconIndex','onSlotOk','ScopeAlliesButUser','Khaml','Window_Selectable_initialize','onBuyCancelItemsEquipsCore','getItemEffectsHpRecoveryLabel','Vklwj','CISjl','itemWindowRect','FontColor','updateChangedSlots','loadSystem','getEtypeIDs','eXolC','opWfb','kNgjk','createCategoryWindow','Scene_Shop_createSellWindow','drawActorParamDifference','allowCreateStatusWindow','FadeLimit','normalColor','ParseArmorNotetags','addCancelCommand','oJyPs','getItemDamageElementLabel','remove','allowCommandWindowCursorUp','Scene_Equip_statusWindowRect','IpXmE','FUNC','vzdyx','bestEquipItem','qvRVo','pageup','Game_Party_gainItem','SwgnX','wBuAD','param','ItemQuantityFontSize','ShopListingRegExp','maxVisibleItems','postCreateItemWindowModernControls','EoTSD','buttonAssistOffset3','_statusWindow','boxWidth','LUK','drawItem','uumLE','drawIcon','DsnAC','espcL','RiEVR','EquipScene','fIYTT','scsZa','_bypassNewLabel','hideDisabledCommands','getItemColor','getItemEffectsSelfTpGainText','isShiftShortcutKeyForRemove','isClearCommandAdded','prepareRefreshItemsEquipsCoreLayout','numberWindowRectItemsEquipsCore','LayoutStyle','onSellCancel','members','onSellItem','hpNRZ','TP\x20DAMAGE','drawItemRepeats','vlCnf','updateHelp','equipAdjustHpMp','isWeapon','mLPaC','setHp','LabelSuccessRate','dZOyn','SUCCESS\x20RATE','Scene_Shop_statusWindowRect','baseSellingPrice','YDSTW','hgGYp','CoreEngine','categories','updatedLayoutStyle','Window_ItemList_maxCols','ShowAllSwitches','Scene_Shop_commandWindowRect','hqooU','Scene_Shop_commandSell','_getClassRequirements','VisuMZ_1_BattleCore','canConsumeItem','refreshDelay','isUseParamNamesWithIcons','isBuyCommandEnabled','dimMq','isEquipAtypeOk','helpWindowRect','getEmptyEquipSlotOfSameEtype','EFFECT_REMOVE_BUFF','SFLrT','isUseModernControls','isMainMenuCoreMenuImageOptionAvailable','qMWwU','isShowNew','Scene_Shop_createCategoryWindow','PurchaseOnly','\x5cI[%1]%2','Game_BattlerBase_paramPlus_artifact','drawNewLabelText','partyArtifactIDs','goodsToItem','FontFace','status','setText','kUSNA','LabelSpeed','iconWidth','BuyPriceJS','StIIl','background','onDatabaseLoaded','SetupProxyItemGroups','_tempActor','addBuyCommand','Hpwse','_itemWindow','placeNewLabel','csoNP','Game_Party_setupBattleTestItems_artifact','isDualWield','isShiftRemoveShortcutEnabled','addSellCommand','processShopCondListingOnSellItem','Step2End','oUnuu','Parse_Notetags_EnableJS','sellPriceRate','SellTurnSwitchOn','geUpdatedLayoutStatusWidth','ParseItemNotetags','getItemQuantityText','getShopTrackingGoldSell','Window_ItemCategory_setItemWindow','_bypassProxy','some','price','makeCommandList','processCursorHomeEndTrigger','MaxHP','EquipParams','drawItemOccasion','getItemEffectsHpDamageLabel','rxlFg','ScopeRandomAllies','ucOfr','refreshCursor','doSell','76633VIveJk','uprHA','buttonAssistLargeIncrement','drawCurrencyValue','Scene_Equip_onActorChange','checkShiftRemoveShortcut','forceChangeEquip','ioEkH','windowPadding','NcGdF','luk','getDamageStyle','consumeItem','OHMSO','setCategory','getItemEffectsAddedStatesBuffsLabel','setShopStatusWindowMode','getItemEffectsAddedStatesBuffsText','actorParams','rMbkR','helpAreaHeight','Translucent','getClassRequirements','addChild','AWKPF','Text','gainItem','calcWindowHeight','LabelElement','isLearnedSkill','createCategoryNameWindow','AlreadyEquipMarker','cancel','drawItemQuantity','Equip\x20the\x20strongest\x20available\x20equipment.','Parse_Notetags_ParamJS','helpWindowRectItemsEquipsCore','description','JSON','atk','SwitchBuy','ShowAnySwitches','isHoverEnabled','processCursorMove','SCOPE','dPBJb','lZGVQ','translucentOpacity','LWLsG','itypeId','activateSellWindow','down','ParamChangeFontSize','mainFontSize','mpRate','_calculatingJSParameters','+%1%','doBuy','_newLabelOpacityUpperLimit','csOTr','traitObjects','AuDZL','playEquip','consumable','21ErPDWr','aHnKw','etPne','setupItemDamageTempActors','WEAPON','flatHP','max','DamageType%1','addStateBuffChanges','ItemMenuStatusBgType','rmYOx','playCursorSound','Window_ShopStatus_setItem','helpAreaTop','optimizeCmdDesc','Scene_Shop_onBuyCancel','buyWindowRect','getItemEffectsTpDamageText','cqGmK','RFQvC','drawItemEffectsAddedStatesBuffs','callUpdateHelp','powerUpColor','smoothSelect','ParamValueFontSize','getMatchingInitEquip','isPlaytest','isClearCommandEnabled','Scene_Shop_sellWindowRect','processCursorMoveModernControls','isCommandEnabled','ievsa','StatusWindow','oYymm','GJNCI','postCreateSellWindowItemsEquipsCore','getItemDamageAmountText','BvXOF','createBitmap','drawItemEffectsMpDamage','yOBQR','keyItem','Game_Actor_artifact','getItemEffectsMpDamageLabel','ITEMS_EQUIPS_CORE','gNEVG','XnpDA','ARRAYNUM','setHandler','commandWindowRectItemsEquipsCore','setTempActor','HP\x20DAMAGE','MANUAL','onTouchOk','maxBattleMembers','MDF','drawItemStyleIcon','ConvertParams','KeyItemProtect','onActorChange','Scene_ItemBase_activateItemWindow','_numberWindow','drawUpdatedParamName','damage','playOkSound','addCommand','184SmAaYM','ItemMenuStatusRect','YIKxI','newLabelEnabled','canUse','NPiWq','meetsItemConditionsJS','_weaponIDs','ulSZg','goldWindowRectItemsEquipsCore','getShopTrackingItemSell','ceil','pyJIb','gold','ATK','IconSet','itemDataFontSize','loadPicture','isRepeated','switchProxyItem','SellTurnSwitchOff','wtypeId','eSZsG','oArRA','JrGMN','process_VisuMZ_ItemsEquipsCore_Notetags','resetShopSwitches','LabelConsume','dHBKu','isBattleTest','CmdTextAlign','Game_BattlerBase_canEquip_artifact','_helpWindow','hideAdditionalSprites','STR','EPxRb','(%1)','rIAPC','maxmp','ListWindowCols','createSlotWindow','JBOsV','HIT\x20TYPE','DYEbH','hitType','Window_ShopBuy_refresh','Scene_Equip_onSlotCancel','_etypeIDs','HideAllSwitches','EFFECT_REMOVE_STATE','buttonAssistText3','HP\x20RECOVERY','_classIDs','jfdAW','drawItemActorMenuImage','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','_categoryNameWindow','EQUIP_DELAY_MS','gWvSo','isClicked','wqGMF','1718403GqlwQy','battleMembers','meetsEquipRequirements','Window_ItemList_colSpacing','addShopTrackingItemSell','numItems','gRUuN','Scene_Item_createCategoryWindow','wUeHL','effects','aVCtA','_sellWindow','PMuCI','getItemDamageAmountLabel','kjYUw','addEquipCommand','eQMuz','agi','Game_Actor_tradeItemWithParty','MP\x20RECOVERY','LabelDamageMP','ARRAYFUNC','getMenuImage','Scene_Shop_create','ItemQuantityFmt','items','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','onSellOk','CVMOJ','HiddenItemB','Scene_Shop_helpWindowRect','ClGSY','DTqkx','PbtZQ','Scene_Shop_onCategoryCancel','LabelRecoverMP','HiddenItemA','zCnQY','getItemSpeedText','icqjK','LabelApply','Pick\x20and\x20choose\x20equipment\x20to\x20change.','move','zbYXm','drawEquipData','NeverUsable','makeDeepCopy','getInputButtonString','commandSell','calcEquipItemPerformance','kwhgj','Hilgn','middle','hfEmy','ItemsEquipsCore','processHandling','_itemData','AFipJ','drawCustomShopGraphicLoad','paramValueFontSize','Scene_Shop_buyWindowRect','armors','hide','constructor','EquipAdjustHpMp','actorId','equip2','formula','setTopRow','vnsIN','sellWindowRect','DrawEquipData','cursorUp','left','isRightInputMode','removeBattleTestArtifacts','refreshItemsEquipsCoreNoMenuImage','Scene_Shop_activateSellWindow','ZIlgM','buttonAssistRemove','XiAVX','center','refresh','statusWindowRectItemsEquipsCore','Window_EquipStatus_refresh','artifacts','pGpNP','lwzaM','helpDescriptionText','toLowerCase','SpeedNeg2000','CmdIconSell','postCreateCategoryWindowItemsEquipsCore','EFFECT_ADD_STATE','nKwGI','level','cursorDown','addLoadListener','version','AllWeapons','ZYFBC','YyLfu','drawUpdatedBeforeParamValue','vQzqN','LabelHitType','buy','LhNav','654506EnzTkT','EquipDelayMS','_newLabelOpacity','maxItemAmount','getSkillIdWithName','aTNMz','value1','Step3End','Step1Start','_newItemsList','Scene_Boot_onDatabaseLoaded','Shwfm','onTouchCancel','getItemEffectsHpDamageText','isOptimizeCommandEnabled','updateNewLabelOpacity','isArmor','isCancelled','itemEnableJS','MFHfM','rVQyo','canEquipArmor','mainCommandWidth','indexOf','loadCharacter','createCommandNameWindow','paramId','NonRemoveETypes','changeEquipById','Game_Actor_discardEquip','changeBuff','note','lZoBD','currentClass','FBumz','number','toUpperCase','updateCommandNameWindow','Scene_Equip_slotWindowRect','SPEED','forceChangeEquipSlots','Game_BattlerBase_meetsItemConditions','addOptimizeCommand','isEquipTypeSealed','+%1','Scene_Equip_itemWindowRect','addState','ExtDisplayedParams','AGI','revertGlobalNamespaceVariables','mainAreaTop','contents','_equips','WajJm','itemWindowRectItemsEquipsCore','categoryNameWindowDrawText','setMp','drawItemEffectsTpRecovery','equipSlots','addShopTrackingItem','JXaBs','ChKze','textSizeEx','RegExp','name','prepareNewEquipSlotsOnLoad','isSkill','armorTypes','getPrototypeOf','canShiftRemoveEquipment','getItemsEquipsCoreBackColor2','VisuMZ_1_MainMenuCore','drawItemEffectsHpDamage','#%1','OFfsn','qmEtG','XqCQF','Game_Actor_forceChangeEquip','exit','mdf','drawItemName','MultiplierStandard','drawParamText','blt','textWidth','getItemHitTypeText','onCategoryCancelItemsEquipsCore','RemoveEquipIcon','BatchShop','Game_Actor_changeEquip','index','troopArtifacts','Icon','auto','EQkvU','every','vHIHr','uhHrg','eafyO','DrawBackRect','getItemEffectsRemovedStatesBuffsLabel','CEXkV','_shopTrackingData','TfUPo','zsRBD','mainFontFace','updateCategoryNameWindow','FdLGO','addClearCommand','wLZzv','possession','active','meetsShopListingConditions','CmdIconClear','Game_Party_gainItem_artifact','colSpacing','yPbQQ','RemoveEquipText','bind','_scene','AFuRZ','loseItem','Occasion%1','yGWfF','MwaZM','processShiftRemoveShortcut','\x5cb%1\x5cb','_slotWindow','Kyztx','Settings','addWindow','fuFAS','commandNameWindowDrawText','Window_Selectable_refresh','ItemScene','sNTnc','getTextColor','top','slotWindowRectItemsEquipsCore','hUhUH','NUM','Enable','object','getArmorIdWithName','Nonconsumable','_shopStatusMenuMode','lEjHg','Window_ShopBuy_price','bXNTo','Scene_Shop_onBuyOk','determineBaseSellingPrice','561402PHvweq','isTroopArtifact','_skillIDs','Scene_Item_createItemWindow','OffsetX','Parse_Notetags_Category','createSellWindow','trim','qhnaC','getItemDamageElementText','4763860abFJtO','bitmap','OroUp','IJuoT','addShopTrackingItemBuy','getItemIdWithName','parameters','uMnoJ','exjIi','commandWindowRect','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','drawItemCustomEntries','removeState','zMzBt','processTouchModernControls','(+%1)','mfQCN','FTNAk','icon','getItemEffectsMpRecoveryText','Window_EquipItem_isEnabled','CozWz','UdNpm','clearCmdDesc','qmugM','Window_ItemList_updateHelp','UvdhE','isPageChangeRequested','nQvXj','shouldCommandWindowExist','HgvwL','xjnpI','_goods','prepareItemCustomData','OffsetY','SpeedNeg999','BCkmH','KlnJH','CGAbs','opacity','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','QqxvE','CommandAddOptimize','Categories','Slots','changePaintOpacity','onMenuImageLoad','beURA','AOmzd','ElementNone','rCWKJ','itemTextAlign','CkimZ','setValue','initShopTrackingData','===','pop','categoryItemTypes','return\x200','CPruG','dCpnE','clearNewItem','Style','isNewItem','call','alterSkillName','drawItemEffectsRemovedStatesBuffs','NbTVl','buyWindowRectItemsEquipsCore','sXuOu','buttonAssistKey1','isItem','maxCols','GRJsl','vICkV','loadFaceImages','AyVcX','eZBmh','Game_Party_numItems','getEtypeIDsCache','processCursorSpecialCheckModernControls','\x5cI[%1]','inBattle','_getEquipRequirements','isSceneShop','maxItems','Dgvrh','drawItemNumber','onBuyCancel','Scene_Shop_numberWindowRect','UzQkO','meetsEquipRequirement','drawParamName','Scene_Load_reloadMapIfUpdated','rateMP','QoL','fontSizeRatio','_categoryWindow','length','LabelRemove','Game_BattlerBase_param','wRTRg','QdQit','ScopeRandomEnemies','FadeSpeed','processShopCondListingOnBuyItem','wZpBU','TTJlc','gZuXs','DEF','Scene_Shop_categoryWindowRect','PzMZw','height','Speed1','PesEl','drawCustomShopGraphic','oXJoB','cursorPageup','isOptimizeCommandAdded','TZFIj','checkItemConditionsSwitchNotetags','SetupArtifactItemIDs','onCategoryOk','nIaWR','CmdStyle','Scene_Shop_prepare','isArtifact','ParseClassNotetags','BMBik','isEnabled','Game_BattlerBase_param_artifact','QUANTITY','LabelDamageTP','drawItemKeyData','clearNewLabelFromItem','Width','Param','VwSoJ','onTouchSelectModern','allowShiftScrolling','split','eDDow','JaHqS','meetsClassRequirements','Scene_Item_itemWindowRect','RkThP','iconText','WufJs','uiMenuStyle','Scene_Equip_helpWindowRect','nxDGF','MaxMP','getItemConsumableLabel','_newLabelSprites','mmgKY','needsNewTempActor','getShopTrackingItem','LabelRecoverTP','CKmqk','visible','changeEquipBase','BREWc','CExIL','fillRect','A%1','BuyTurnSwitchOff','ShopScene','Bvwvy','bayJh','uoCrA','zBbeT','update','raPFr','_allowArtifactTraitObjects','xkZgV','MaxArmors','Scene_Shop_commandBuy','rdHJC','meetsItemConditions','MjwFe','DeEvi','getInputMultiButtonStrings','RpQvw','MP\x20DAMAGE','bRmMr','RPZRp','wPFQJ','_handlers','troopArtifactIDs','COiyS','getItemEffectsTpRecoveryLabel','Window_Selectable_setHelpWindowItem','atypeId','format','EFFECT_GAIN_TP','REMOVED\x20EFFECTS','Game_Party_consumeItem','LVwGe','changeEquip','FieldUsable','drawItemDarkRect','setNewItem','Scene_Shop_doBuy','nonOptimizeEtypes','YDmhx','Step1End','SOmRG','IncludeShopItem','commandBuyItemsEquipsCore','APTRW','isEquipItem','XeaVh','paramValueByName','Xidys','FZROE','DAMAGE\x20MULTIPLIER','AtiBw','JJfhM','iconHeight','actor','dKVUl','paramPlus','discardEquip','contentsBack','setStatusWindow','ParseWeaponNotetags','buffIconIndex','Lsmab','ShopMenuStatusStandard','PSVzC','optKeyItemsNumber','setItemWindow','baxAp','removeDebuff','user','commandStyleCheck','getItemEffectsTpRecoveryText','_data','drawItemEquipType','SwitchSell','getItemEffectsTpDamageLabel','SetupProxyItemGroup','RegularItems','LaCfk','YkmLD','cursorRight','kqaZB','sellingPrice','isStackableArtifact','getItemEffectsHpRecoveryText','_goodsCount','innerHeight','Scene_Equip_commandWindowRect','categoryList','isPartyArtifact','Consumable','getItemRepeatsLabel','_shopStatusMenuAlly','categoryWindowRectItemsEquipsCore','_bypassReleaseUnequippableItemsItemsEquipsCore','onTouchSelectModernControls','_item','pXaUU','KsWqK','isHovered','ShiftShortcutKey','wtHls','_dummyWindow','isBottomHelpMode','drawItemEffectsMpRecovery','getProxyItem','PWYau','BalVe','buttonAssistCategory','_newLabelOpacityChange','_paramPlus','_forcedSlots','EnableLayout','Speed1000','currencyUnit','Scene_Shop_buyingPrice','_scrollDuration','numberWindowRect','commandSellItemsEquipsCore','hasItem','armor-%1','BorderRegExp','_commandNameWindow','test','BuXxx','XaYdL','item-%1','Dprof','Window_Selectable_update','shift','FkDkn','show','adjustHiddenShownGoods','item','getItemSpeedLabel','Window_EquipCommand_initialize','ZKBlv','Window_ShopBuy_goodsToItem','cegEK','setObject','ARRAYSTRUCT','ebLix','isEquipCommandEnabled','categoryStyleCheck','mainAreaBottom','rBaJQ','width','_commandWindow','DlQMr','wpJkC','W%1','uiHelpPosition','drawItemCost','mLjwX','mmp','isUseItemsEquipsCoreUpdatedLayout','0000','Type','ARMOR','JKDwj','setHelpWindowItem','isCursorMovable','Parse_Notetags_ParamValues','rIrIR','100%','onCategoryCancel','getItemHitTypeLabel','clear','initNewLabelSprites','categoryNameWindowDrawBackground','Step2Start','kjDVF','TWKMj','uMvgT','convertInitEquipsToItems','EFFECT_ADD_DEBUFF','OqMoy','_armorIDs','addShopTrackingGoldBuy','itemHasEquipLimit','USER\x20TP\x20GAIN','flatMP','qJAkS','_itemIDs','getItemDamageAmountLabelOriginal','parse','SellPriceRate','XVUcZ','commandNameWindowDrawBackground','MaxWeapons','Scene_Equip_createCommandWindow','uiInputPosition','value2','isEquipChangeOk','buttonAssistSmallIncrement','hitIndex','LeTxI'];_0x2121=function(){return _0x56bac1;};return _0x2121();}Sprite_NewLabel[_0x2b9290(0x125)]=Object[_0x2b9290(0x530)](Sprite[_0x2b9290(0x125)]),Sprite_NewLabel['prototype'][_0x2b9290(0x2dc)]=Sprite_NewLabel,Sprite_NewLabel[_0x2b9290(0x125)][_0x2b9290(0x130)]=function(){const _0x407e33=_0x2b9290;Sprite[_0x407e33(0x125)][_0x407e33(0x130)][_0x407e33(0x3e9)](this),this[_0x407e33(0x244)]();},Sprite_NewLabel['prototype'][_0x2b9290(0x244)]=function(){const _0x292879=_0x2b9290,_0x22d258=ImageManager['iconWidth'],_0x283eef=ImageManager[_0x292879(0x483)];this[_0x292879(0x3aa)]=new Bitmap(_0x22d258,_0x283eef),this[_0x292879(0x5ea)](),this[_0x292879(0x1ad)]();},Sprite_NewLabel[_0x2b9290(0x125)][_0x2b9290(0x5ea)]=function(){const _0x59693b=_0x2b9290,_0x401fd0=VisuMZ[_0x59693b(0x2d3)][_0x59693b(0x389)]['New'][_0x59693b(0x364)];if(_0x401fd0<=0x0)return;const _0x4f73b9=ImageManager[_0x59693b(0x147)](_0x59693b(0x26f)),_0x255876=ImageManager[_0x59693b(0x1b5)],_0x35e7a9=ImageManager[_0x59693b(0x483)],_0x1960f8=_0x401fd0%0x10*_0x255876,_0x47dda1=Math[_0x59693b(0x5d8)](_0x401fd0/0x10)*_0x35e7a9;this[_0x59693b(0x3aa)][_0x59693b(0x35b)](_0x4f73b9,_0x1960f8,_0x47dda1,_0x255876,_0x35e7a9,0x0,0x0);},Sprite_NewLabel['prototype'][_0x2b9290(0x1ad)]=function(){const _0x5d9b0f=_0x2b9290,_0x3e50eb=VisuMZ[_0x5d9b0f(0x2d3)]['Settings']['New'],_0x36adf0=_0x3e50eb[_0x5d9b0f(0x1f7)];if(_0x36adf0==='')return;const _0x50fda9=ImageManager['iconWidth'],_0xbf7314=ImageManager[_0x5d9b0f(0x483)];this[_0x5d9b0f(0x3aa)]['fontFace']=_0x3e50eb[_0x5d9b0f(0x1b0)]||$gameSystem[_0x5d9b0f(0x371)](),this[_0x5d9b0f(0x3aa)][_0x5d9b0f(0x523)]=this[_0x5d9b0f(0x390)](),this[_0x5d9b0f(0x3aa)]['fontSize']=_0x3e50eb[_0x5d9b0f(0xe4)],this[_0x5d9b0f(0x3aa)][_0x5d9b0f(0x12b)](_0x36adf0,0x0,_0xbf7314/0x2,_0x50fda9,_0xbf7314/0x2,_0x5d9b0f(0x2ee));},Sprite_NewLabel[_0x2b9290(0x125)][_0x2b9290(0x390)]=function(){const _0x4ce4ef=_0x2b9290,_0x381ea8=VisuMZ[_0x4ce4ef(0x2d3)][_0x4ce4ef(0x389)][_0x4ce4ef(0x553)][_0x4ce4ef(0x145)];return _0x381ea8['match'](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x4ce4ef(0x523)](_0x381ea8);},Window_Base[_0x2b9290(0x125)][_0x2b9290(0x358)]=function(_0x3733d0,_0x1aec0f,_0x52cbb1,_0xee692f){const _0x6549e1=_0x2b9290;if(_0x3733d0){const _0x44f9d2=_0x52cbb1+(this[_0x6549e1(0x625)]()-ImageManager['iconHeight'])/0x2,_0x1a6d38=ImageManager[_0x6549e1(0x1b5)]+0x4,_0x4a3239=Math[_0x6549e1(0x224)](0x0,_0xee692f-_0x1a6d38);this[_0x6549e1(0x594)](ColorManager['getItemColor'](_0x3733d0)),this[_0x6549e1(0x16e)](_0x3733d0[_0x6549e1(0x13b)],_0x1aec0f,_0x44f9d2),this['drawText'](_0x3733d0[_0x6549e1(0x348)],_0x1aec0f+_0x1a6d38,_0x52cbb1,_0x4a3239),this[_0x6549e1(0x60f)]();}},Window_Base[_0x2b9290(0x125)][_0x2b9290(0x400)]=function(_0x2af0d9,_0x25e909,_0x11a9e6,_0x14e777){const _0x1dec6d=_0x2b9290;if(this['isDrawItemNumber'](_0x2af0d9)){this[_0x1dec6d(0xe0)]();const _0x37d10b=VisuMZ[_0x1dec6d(0x2d3)]['Settings']['ItemScene'],_0x138f6=_0x37d10b[_0x1dec6d(0x2b5)],_0x5a8720=_0x138f6[_0x1dec6d(0x46a)]($gameParty[_0x1dec6d(0x2a2)](_0x2af0d9));this[_0x1dec6d(0x33b)]['fontSize']=_0x37d10b[_0x1dec6d(0x163)],this[_0x1dec6d(0x12b)](_0x5a8720,_0x25e909,_0x11a9e6,_0x14e777,_0x1dec6d(0x5e9)),this[_0x1dec6d(0xe0)]();}},Window_Base[_0x2b9290(0x125)]['isDrawItemNumber']=function(_0x5769b2){const _0x7834b5=_0x2b9290;if(DataManager[_0x7834b5(0xf4)](_0x5769b2))return $dataSystem[_0x7834b5(0x48f)];return!![];},Window_Base[_0x2b9290(0x125)][_0x2b9290(0x471)]=function(_0x53428a,_0x30a33f,_0x373085,_0x9904e3,_0x2d6940){const _0x5a122d=_0x2b9290;_0x2d6940=Math[_0x5a122d(0x224)](_0x2d6940||0x1,0x1);while(_0x2d6940--){_0x9904e3=_0x9904e3||this[_0x5a122d(0x625)](),this[_0x5a122d(0x488)][_0x5a122d(0x5aa)]=0xa0;const _0x279a4a=ColorManager[_0x5a122d(0x52b)]();this[_0x5a122d(0x488)][_0x5a122d(0x44c)](_0x53428a+0x1,_0x30a33f+0x1,_0x373085-0x2,_0x9904e3-0x2,_0x279a4a),this['contentsBack'][_0x5a122d(0x5aa)]=0xff;}},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x13f)]=Window_Selectable[_0x2b9290(0x125)][_0x2b9290(0x130)],Window_Selectable[_0x2b9290(0x125)]['initialize']=function(_0x418721){const _0x7da268=_0x2b9290;this[_0x7da268(0x4f6)](),VisuMZ['ItemsEquipsCore'][_0x7da268(0x13f)][_0x7da268(0x3e9)](this,_0x418721);},Window_Selectable[_0x2b9290(0x125)][_0x2b9290(0x4f6)]=function(){const _0x852e37=_0x2b9290;this[_0x852e37(0x442)]={},this[_0x852e37(0x30a)]=0xff,this[_0x852e37(0x4bb)]=VisuMZ['ItemsEquipsCore'][_0x852e37(0x389)][_0x852e37(0x553)][_0x852e37(0x411)],this['_newLabelOpacityUpperLimit']=VisuMZ[_0x852e37(0x2d3)][_0x852e37(0x389)]['New'][_0x852e37(0x150)];},Window_Selectable[_0x2b9290(0x125)]['isShowNew']=function(){return![];},VisuMZ[_0x2b9290(0x2d3)]['Window_Selectable_setHelpWindowItem']=Window_Selectable[_0x2b9290(0x125)][_0x2b9290(0x4ee)],Window_Selectable[_0x2b9290(0x125)]['setHelpWindowItem']=function(_0x16864f){const _0xaffb04=_0x2b9290;VisuMZ[_0xaffb04(0x2d3)][_0xaffb04(0x468)][_0xaffb04(0x3e9)](this,_0x16864f);if(this[_0xaffb04(0x1a8)]())this[_0xaffb04(0x42f)](_0x16864f);},Window_Selectable[_0x2b9290(0x125)]['clearNewLabelFromItem']=function(_0x17437c){const _0x2a1cf1=_0x2b9290;if(!_0x17437c)return;$gameParty[_0x2a1cf1(0x3e6)](_0x17437c);let _0x2a9a99='';if(DataManager[_0x2a1cf1(0x3f0)](_0x17437c))_0x2a9a99='item-%1'['format'](_0x17437c['id']);else{if(DataManager[_0x2a1cf1(0x187)](_0x17437c))_0x2a1cf1(0x2d0)===_0x2a1cf1(0x2d0)?_0x2a9a99='weapon-%1'[_0x2a1cf1(0x46a)](_0x17437c['id']):(delete this['_categoryWindow'][_0x2a1cf1(0x464)]['ok'],delete this[_0x2a1cf1(0x40a)][_0x2a1cf1(0x464)][_0x2a1cf1(0x1fe)]);else{if(DataManager[_0x2a1cf1(0x318)](_0x17437c))_0x2a9a99=_0x2a1cf1(0x4c6)[_0x2a1cf1(0x46a)](_0x17437c['id']);else{if(_0x2a1cf1(0x5f3)!==_0x2a1cf1(0x463))return;else this[_0x2a1cf1(0x130)](...arguments);}}}const _0x3bd97d=this[_0x2a1cf1(0x442)][_0x2a9a99];if(_0x3bd97d)_0x3bd97d['hide']();},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x38d)]=Window_Selectable[_0x2b9290(0x125)][_0x2b9290(0x2ef)],Window_Selectable[_0x2b9290(0x125)][_0x2b9290(0x2ef)]=function(){const _0x5afdc1=_0x2b9290;this[_0x5afdc1(0x532)](),VisuMZ[_0x5afdc1(0x2d3)][_0x5afdc1(0x38d)][_0x5afdc1(0x3e9)](this);},Window_Selectable[_0x2b9290(0x125)][_0x2b9290(0x532)]=function(){const _0xefe1bb=_0x2b9290;for(const _0x17c01d of Object[_0xefe1bb(0x5ab)](this[_0xefe1bb(0x442)])){_0xefe1bb(0x174)===_0xefe1bb(0x174)?_0x17c01d[_0xefe1bb(0x2db)]():(this[_0xefe1bb(0x104)](),this[_0xefe1bb(0x560)](this[_0xefe1bb(0x362)]()));}},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x4ce)]=Window_Selectable[_0x2b9290(0x125)][_0x2b9290(0x454)],Window_Selectable[_0x2b9290(0x125)][_0x2b9290(0x454)]=function(){const _0x549e5f=_0x2b9290;this[_0x549e5f(0x317)](),VisuMZ[_0x549e5f(0x2d3)][_0x549e5f(0x4ce)]['call'](this);},Window_Selectable[_0x2b9290(0x125)]['updateNewLabelOpacity']=function(){const _0x584183=_0x2b9290;if(!this[_0x584183(0x1a8)]())return;const _0x9f1c8=this[_0x584183(0x218)];this[_0x584183(0x30a)]+=this['_newLabelOpacityChange'];(this[_0x584183(0x30a)]>=_0x9f1c8||this[_0x584183(0x30a)]<=0x0)&&(this[_0x584183(0x4bb)]*=-0x1);this[_0x584183(0x30a)]=this['_newLabelOpacity']['clamp'](0x0,_0x9f1c8);for(const _0x109230 of Object[_0x584183(0x5ab)](this[_0x584183(0x442)])){_0x584183(0x4fb)!==_0x584183(0x4fb)?_0x21a113=_0x1bcbd9[_0x584183(0x224)](_0x1ca7a8,_0x32857f):_0x109230[_0x584183(0x3d0)]=this[_0x584183(0x30a)];}},Window_Selectable['prototype'][_0x2b9290(0x618)]=function(_0x54f428){const _0x581dd4=_0x2b9290,_0x28317c=this[_0x581dd4(0x442)];if(_0x28317c[_0x54f428])return _0x28317c[_0x54f428];else{const _0x2e6d31=new Sprite_NewLabel();return _0x28317c[_0x54f428]=_0x2e6d31,this[_0x581dd4(0x51f)](_0x2e6d31),_0x2e6d31;}},Window_Selectable[_0x2b9290(0x125)][_0x2b9290(0x1bf)]=function(_0x1565d,_0x560ef0,_0x4b4ff7){const _0x99ef84=_0x2b9290;let _0x131227='';if(DataManager[_0x99ef84(0x3f0)](_0x1565d)){if(_0x99ef84(0x432)===_0x99ef84(0x1f6)){const _0x21c995=this[_0x99ef84(0x155)]();this['drawItemKeyData'](_0x21c995,_0xd2e154,_0x47bc93,_0x191a36,!![]);const _0x4addea=this[_0x99ef84(0x3a8)]();return this[_0x99ef84(0x42e)](_0x4addea,_0x2443db,_0x20e4a5,_0x1a88f6,![],_0x99ef84(0x5e9)),this[_0x99ef84(0x471)](_0x1a8230,_0x267ea2,_0x2b8a8a),this['resetFontSettings'](),!![];}else _0x131227=_0x99ef84(0x4cc)['format'](_0x1565d['id']);}else{if(DataManager[_0x99ef84(0x187)](_0x1565d))_0x131227=_0x99ef84(0x128)[_0x99ef84(0x46a)](_0x1565d['id']);else{if(DataManager[_0x99ef84(0x318)](_0x1565d)){if(_0x99ef84(0x393)!==_0x99ef84(0x393)){this[_0x99ef84(0x281)](),this[_0x99ef84(0xe0)]();if(this[_0x99ef84(0x114)])this[_0x99ef84(0x114)]['refresh']();this[_0x99ef84(0x4e9)]()?this[_0x99ef84(0x17b)]():_0x2219ae[_0x99ef84(0x2d3)][_0x99ef84(0x2f1)]['call'](this);}else _0x131227=_0x99ef84(0x4c6)[_0x99ef84(0x46a)](_0x1565d['id']);}else{if('yGWfF'!==_0x99ef84(0x383)){const _0x538fbd=_0x20c8af(_0x811903['$1'])[_0x99ef84(0x435)](',')[_0x99ef84(0x5ec)](_0x34a241=>_0x5e97fe(_0x34a241));for(const _0x1be7fe of _0x538fbd){_0xa281cd[_0x99ef84(0x3de)](_0x1be7fe,!![]);}}else return;}}}const _0x5b9825=this[_0x99ef84(0x618)](_0x131227);_0x5b9825[_0x99ef84(0x2c7)](_0x560ef0,_0x4b4ff7),_0x5b9825[_0x99ef84(0x4d1)](),_0x5b9825[_0x99ef84(0x3d0)]=this[_0x99ef84(0x30a)];},Window_ItemCategory[_0x2b9290(0x4a6)]=VisuMZ['ItemsEquipsCore'][_0x2b9290(0x389)]['Categories'][_0x2b9290(0x628)],Window_ItemCategory[_0x2b9290(0x3e2)]=[_0x2b9290(0x2c1),_0x2b9290(0x2ba),'Nonconsumable',_0x2b9290(0x4a8),_0x2b9290(0xe2),_0x2b9290(0x60e),_0x2b9290(0x470),_0x2b9290(0x2ca)],VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x5fd)]=Window_ItemCategory['prototype'][_0x2b9290(0x130)],Window_ItemCategory[_0x2b9290(0x125)][_0x2b9290(0x130)]=function(_0x4cb8e6){const _0x35dcf0=_0x2b9290;VisuMZ[_0x35dcf0(0x2d3)][_0x35dcf0(0x5fd)][_0x35dcf0(0x3e9)](this,_0x4cb8e6),this[_0x35dcf0(0x1fc)](_0x4cb8e6);},Window_ItemCategory[_0x2b9290(0x125)][_0x2b9290(0x1fc)]=function(_0x237bee){const _0x450dca=_0x2b9290,_0xd75836=new Rectangle(0x0,0x0,_0x237bee[_0x450dca(0x4e0)],_0x237bee[_0x450dca(0x419)]);this[_0x450dca(0x298)]=new Window_Base(_0xd75836),this[_0x450dca(0x298)][_0x450dca(0x3d0)]=0x0,this['addChild'](this[_0x450dca(0x298)]),this[_0x450dca(0x372)]();},Window_ItemCategory[_0x2b9290(0x125)][_0x2b9290(0x1a5)]=function(){const _0x29d126=_0x2b9290;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand[_0x29d126(0x125)][_0x29d126(0x1a5)]['call'](this);},Window_ItemCategory[_0x2b9290(0x125)][_0x2b9290(0x1d4)]=function(){},Window_ItemCategory[_0x2b9290(0x125)]['playOkSound']=function(){const _0x42d526=_0x2b9290;if(!this[_0x42d526(0x1a5)]())Window_HorzCommand[_0x42d526(0x125)][_0x42d526(0x25e)][_0x42d526(0x3e9)](this);},Window_ItemCategory[_0x2b9290(0x125)][_0x2b9290(0x3f1)]=function(){const _0x4fdd3f=_0x2b9290;return this[_0x4fdd3f(0x5a5)]?this['maxItems']():0x4;},Window_ItemCategory[_0x2b9290(0x125)][_0x2b9290(0x454)]=function(){const _0x310fe9=_0x2b9290;Window_HorzCommand['prototype'][_0x310fe9(0x454)][_0x310fe9(0x3e9)](this),this[_0x310fe9(0x1be)]&&this[_0x310fe9(0x1be)][_0x310fe9(0x1ec)](this[_0x310fe9(0x519)]());},Window_ItemCategory['prototype'][_0x2b9290(0x23b)]=function(){const _0x1f0388=_0x2b9290;if(this['isCursorMovable']()){const _0x59be20=this['index']();if(this[_0x1f0388(0x1be)]&&this[_0x1f0388(0x1be)][_0x1f0388(0x3f1)]()<=0x1){Input[_0x1f0388(0x272)](_0x1f0388(0x5e9))&&this['cursorRight'](Input['isTriggered'](_0x1f0388(0x5e9)));if(Input[_0x1f0388(0x272)](_0x1f0388(0x2e6))){if(_0x1f0388(0x504)!=='ZOYdA')this[_0x1f0388(0x585)](Input[_0x1f0388(0x518)]('left'));else return _0xacb5ad[_0x1f0388(0x2d3)][_0x1f0388(0x610)][_0x1f0388(0x3e9)](this);}}else{if(this['_itemWindow']&&this[_0x1f0388(0x1be)][_0x1f0388(0x3f1)]()>0x1){if(_0x1f0388(0x48e)!=='wlZRV'){if(Input[_0x1f0388(0x272)]('pagedown')&&!Input[_0x1f0388(0x570)]('shift')){if(_0x1f0388(0x2ad)===_0x1f0388(0x2ad))this[_0x1f0388(0x49e)](Input[_0x1f0388(0x518)](_0x1f0388(0x568)));else{if(!this[_0x1f0388(0x47b)]()&&!_0x57c279[_0x1f0388(0x3f0)](this['_item']))return;const _0xea192f=this['innerWidth']-this['itemPadding']()-_0x24ced0,_0x27b766=this[_0x1f0388(0x35c)](_0x1f0388(0x4ea));this[_0x1f0388(0x594)](_0x2b939f[_0x1f0388(0x5c4)]()),this[_0x1f0388(0x12b)](_0x3002aa[_0x1f0388(0x376)],_0x125523+this['itemPadding'](),_0x513bc3,_0xea192f-_0x27b766),this[_0x1f0388(0x60f)](),this[_0x1f0388(0x400)](this[_0x1f0388(0x4ae)],_0x35778d,_0x8157cc,_0xea192f);}}Input[_0x1f0388(0x272)](_0x1f0388(0x15e))&&!Input[_0x1f0388(0x570)]('shift')&&this[_0x1f0388(0x585)](Input[_0x1f0388(0x518)](_0x1f0388(0x15e)));}else{const _0x1a4898=_0xd62ca4['parse']('['+_0x4a8ad1['$1'][_0x1f0388(0x5c2)](/\d+/g)+']');for(const _0x48e1cc of _0x1a4898){if(!_0x181f1d[_0x1f0388(0x5f9)](_0x48e1cc))return!![];}return![];}}}this[_0x1f0388(0x362)]()!==_0x59be20&&this[_0x1f0388(0x229)]();}},Window_ItemCategory[_0x2b9290(0x125)][_0x2b9290(0x2d4)]=function(){const _0x5a2aa9=_0x2b9290;if(this['isUseModernControls']())return;Window_HorzCommand[_0x5a2aa9(0x125)][_0x5a2aa9(0x2d4)]['call'](this);},Window_ItemCategory['prototype'][_0x2b9290(0x208)]=function(){const _0x565898=_0x2b9290;return this[_0x565898(0x1a5)]()?![]:Window_HorzCommand[_0x565898(0x125)][_0x565898(0x208)][_0x565898(0x3e9)](this);},Window_ItemCategory[_0x2b9290(0x125)][_0x2b9290(0x3b7)]=function(){const _0x4689f6=_0x2b9290;if(this[_0x4689f6(0x626)]()){if(_0x4689f6(0x54e)!==_0x4689f6(0x122)){TouchInput['isTriggered']()&&this[_0x4689f6(0x577)](!![]);if(TouchInput[_0x4689f6(0x29b)]())this[_0x4689f6(0x253)]();else TouchInput['isCancelled']()&&(_0x4689f6(0x40f)!==_0x4689f6(0x368)?this[_0x4689f6(0x314)]():_0x3fd961=_0x4689f6(0x128)[_0x4689f6(0x46a)](_0x54f102['id']));}else{const _0x54f8c7=this[_0x4689f6(0x3c6)](),_0x1decc6=this[_0x4689f6(0x2e7)]()?this[_0x4689f6(0x555)]():0x0,_0x45550b=this[_0x4689f6(0x33a)](),_0x2b7db3=_0x1e312c[_0x4689f6(0x16a)]-this[_0x4689f6(0x555)](),_0x42d7ab=_0x54f8c7?this[_0x4689f6(0x1f9)](0x1,!![]):0x0;return new _0x4cd7ad(_0x1decc6,_0x45550b,_0x2b7db3,_0x42d7ab);}}},Window_ItemCategory['prototype'][_0x2b9290(0x577)]=function(_0x3a1091){const _0x3e9daf=_0x2b9290;this[_0x3e9daf(0x1a5)]()?this[_0x3e9daf(0x433)](!![]):Window_HorzCommand['prototype'][_0x3e9daf(0x577)][_0x3e9daf(0x3e9)](this,_0x3a1091);},Window_ItemCategory[_0x2b9290(0x125)][_0x2b9290(0x433)]=function(_0x207c6c){const _0x5a67b9=_0x2b9290;this[_0x5a67b9(0x609)]=![];if(this[_0x5a67b9(0x4ef)]()){if(_0x5a67b9(0x4e3)!=='wpJkC')_0x504836(_0x575701);else{const _0x3f57e5=this[_0x5a67b9(0x362)](),_0x1e4bb7=this[_0x5a67b9(0x511)]();_0x1e4bb7>=0x0&&_0x1e4bb7!==this[_0x5a67b9(0x362)]()&&this['select'](_0x1e4bb7),_0x207c6c&&this[_0x5a67b9(0x362)]()!==_0x3f57e5&&this[_0x5a67b9(0x229)]();}}},Window_ItemCategory['prototype'][_0x2b9290(0x1d3)]=function(){const _0x5b3f7f=_0x2b9290;this[_0x5b3f7f(0x104)](),this['select'](this['index']());},Window_ItemCategory[_0x2b9290(0x125)]['addItemCategories']=function(){for(const _0x448b54 of Window_ItemCategory['categoryList']){this['addItemCategory'](_0x448b54);}},Window_ItemCategory[_0x2b9290(0x125)]['addItemCategory']=function(_0xe34243){const _0x2a1d04=_0x2b9290,_0x4baa70=_0xe34243[_0x2a1d04(0x4eb)],_0x2043e2=_0xe34243[_0x2a1d04(0x364)],_0x37d725=_0xe34243['SwitchID']||0x0;if(_0x37d725>0x0&&!$gameSwitches['value'](_0x37d725))return;let _0x57a46c='',_0x14d156=_0x2a1d04(0x5e6),_0x1ae4d9=_0x4baa70;if(_0x4baa70[_0x2a1d04(0x5c2)](/Category:(.*)/i))_0x57a46c=String(RegExp['$1'])[_0x2a1d04(0x3a6)]();else{if(Window_ItemCategory[_0x2a1d04(0x3e2)]['includes'](_0x4baa70)){if(_0x2a1d04(0x47f)!==_0x2a1d04(0x58a))_0x57a46c=VisuMZ[_0x2a1d04(0x2d3)][_0x2a1d04(0x389)]['Categories'][_0x4baa70];else{const _0x3b63ed=_0x58a469(_0x56dfd5['$1'])['trim'](),_0x44b386=_0x216506(_0x7750e6['$2'])[_0x2a1d04(0x3a6)]();this[_0x2a1d04(0x616)](_0x3b63ed,_0x44b386,_0x30703e,_0x3a1569,_0x45ec7d),_0x2a9c40+=this['lineHeight']();}}else{if([_0x2a1d04(0x62c),'RegularItems'][_0x2a1d04(0x57b)](_0x4baa70)){if(_0x2a1d04(0x138)===_0x2a1d04(0x3ec)){const _0xa2f273=_0x4cb40f[_0xb038ce];if(_0xa2f273&&_0xa2f273['iconIndex']>0x0){_0x40fd9e+=_0x2a1d04(0x3fa)[_0x2a1d04(0x46a)](_0xa2f273['iconIndex']),_0x2559e4++;if(_0x2b1a07>=_0x1aa02f)return _0x58ec05;}}else _0x57a46c=TextManager[_0x2a1d04(0x4d3)];}else{if(_0x4baa70==='KeyItems')_0x57a46c=TextManager[_0x2a1d04(0x247)];else{if(_0x4baa70===_0x2a1d04(0x300)){if(_0x2a1d04(0x58b)===_0x2a1d04(0x58b))_0x57a46c=TextManager[_0x2a1d04(0x5e4)];else return _0xd5ab7a['uiInputPosition'];}else{if(_0x4baa70==='AllArmors')_0x57a46c=TextManager[_0x2a1d04(0x10a)];else{if(_0x4baa70[_0x2a1d04(0x5c2)](/WTYPE:(\d+)/i)){if(_0x2a1d04(0x301)===_0x2a1d04(0x20b))return'?????';else _0x57a46c=$dataSystem[_0x2a1d04(0xe5)][Number(RegExp['$1'])]||'';}else{if(_0x4baa70['match'](/ATYPE:(\d+)/i)){if(_0x2a1d04(0x453)!==_0x2a1d04(0x3a7))_0x57a46c=$dataSystem[_0x2a1d04(0x34b)][Number(RegExp['$1'])]||'';else return _0x3349fd[_0x2a1d04(0x4e5)];}else _0x4baa70['match'](/ETYPE:(\d+)/i)&&(_0x57a46c=$dataSystem['equipTypes'][Number(RegExp['$1'])]||'');}}}}}}}_0x2043e2>0x0&&this[_0x2a1d04(0x5a7)]()!==_0x2a1d04(0xf2)&&(_0x57a46c=_0x2a1d04(0x1ab)[_0x2a1d04(0x46a)](_0x2043e2,_0x57a46c)),this[_0x2a1d04(0x25f)](_0x57a46c,_0x14d156,!![],_0x1ae4d9);},Window_ItemCategory[_0x2b9290(0x125)][_0x2b9290(0x3dc)]=function(){const _0x2bf5ab=_0x2b9290;return VisuMZ['ItemsEquipsCore'][_0x2bf5ab(0x389)]['Categories']['TextAlign'];},Window_ItemCategory[_0x2b9290(0x125)][_0x2b9290(0x16c)]=function(_0x3ebc5f){const _0x56759a=_0x2b9290,_0x102ae9=this[_0x56759a(0x4dd)](_0x3ebc5f);if(_0x102ae9==='iconText')this[_0x56759a(0x51e)](_0x3ebc5f);else{if(_0x102ae9===_0x56759a(0x3bb)){if(_0x56759a(0x160)===_0x56759a(0x160))this[_0x56759a(0x256)](_0x3ebc5f);else return this[_0x56759a(0x269)]();}else Window_HorzCommand[_0x56759a(0x125)][_0x56759a(0x16c)]['call'](this,_0x3ebc5f);}},Window_ItemCategory['prototype']['categoryStyle']=function(){const _0x434e16=_0x2b9290;return VisuMZ['ItemsEquipsCore']['Settings'][_0x434e16(0x3d4)][_0x434e16(0x3e7)];},Window_ItemCategory[_0x2b9290(0x125)][_0x2b9290(0x4dd)]=function(_0x51ed0d){const _0x19f0ee=_0x2b9290;if(_0x51ed0d<0x0)return _0x19f0ee(0xf2);const _0x124a61=this[_0x19f0ee(0x5a7)]();if(_0x124a61!=='auto')return _0x124a61;else{if('tOewY'===_0x19f0ee(0x5a1)){if(_0x486b39!==_0x307ea8)return;if(_0xd951a4['note'][_0x19f0ee(0x5c2)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x55cd8d=_0x43aacf(_0x143f6d['$1']),_0x54cc0f=_0x19f0ee(0x3b3)[_0x19f0ee(0x46a)](_0x55cd8d);_0x2b98d8[_0x19f0ee(0x2d3)]['itemEnableJS'][_0x114637['id']]=new _0x3955cb(_0x19f0ee(0x4d3),_0x54cc0f);}}else{const _0x433c9f=this[_0x19f0ee(0x591)](_0x51ed0d);if(_0x433c9f[_0x19f0ee(0x5c2)](/\\I\[(\d+)\]/i)){if(_0x19f0ee(0x56a)!==_0x19f0ee(0x56a))_0x13a5c8['ItemsEquipsCore'][_0x19f0ee(0x48a)][_0x19f0ee(0x3e9)](this,_0x189360),_0x355e87['ItemsEquipsCore']['Parse_Notetags_Batch'](_0x32d315,_0x1191f8);else{const _0x2f8a5d=this[_0x19f0ee(0x549)](_0x51ed0d),_0x48523d=this[_0x19f0ee(0x346)](_0x433c9f)['width'];if(_0x48523d<=_0x2f8a5d[_0x19f0ee(0x4e0)]){if(_0x19f0ee(0x133)==='EHmJP')return _0x19f0ee(0x43b);else{const _0x4ec1f9='HP\x20RECOVERY';if(this[_0x19f0ee(0x2d5)][_0x19f0ee(0x5a0)]<=0x0&&this[_0x19f0ee(0x2d5)][_0x19f0ee(0x223)]<=0x0&&!this[_0x19f0ee(0x5be)][_0x4ec1f9])return![];const _0x8fa871=this['getItemEffectsHpRecoveryLabel']();this[_0x19f0ee(0x42e)](_0x8fa871,_0x403e01,_0x17445b,_0x3552e1,!![]);const _0x759758=this[_0x19f0ee(0x4a2)]();return this[_0x19f0ee(0x594)](_0x9e9745['damageColor'](0x1)),this[_0x19f0ee(0x42e)](_0x759758,_0x8ac8c9,_0x5a0beb,_0x466eb2,![],'right'),this[_0x19f0ee(0x471)](_0x44de14,_0x3f8f9d,_0x308d5b),this[_0x19f0ee(0xe0)](),!![];}}else return _0x19f0ee(0x3bb);}}else return _0x19f0ee(0xf2);}}},Window_ItemCategory[_0x2b9290(0x125)]['drawItemStyleIconText']=function(_0x28c043){const _0x53a79f=_0x2b9290,_0x30df7b=this['itemLineRect'](_0x28c043),_0x21502d=this['commandName'](_0x28c043),_0x11f5f7=this[_0x53a79f(0x346)](_0x21502d)[_0x53a79f(0x4e0)];this[_0x53a79f(0x3d6)](this[_0x53a79f(0x23c)](_0x28c043));const _0x3d78f4=this[_0x53a79f(0x3dc)]();if(_0x3d78f4===_0x53a79f(0x5e9))this['drawTextEx'](_0x21502d,_0x30df7b['x']+_0x30df7b['width']-_0x11f5f7,_0x30df7b['y'],_0x11f5f7);else{if(_0x3d78f4===_0x53a79f(0x2ee)){if(_0x53a79f(0x285)===_0x53a79f(0x285)){const _0x1d5351=_0x30df7b['x']+Math[_0x53a79f(0x5d8)]((_0x30df7b[_0x53a79f(0x4e0)]-_0x11f5f7)/0x2);this[_0x53a79f(0x606)](_0x21502d,_0x1d5351,_0x30df7b['y'],_0x11f5f7);}else return this['helpWindowRectItemsEquipsCore']();}else this['drawTextEx'](_0x21502d,_0x30df7b['x'],_0x30df7b['y'],_0x11f5f7);}},Window_ItemCategory[_0x2b9290(0x125)][_0x2b9290(0x256)]=function(_0x363dce){const _0x5307e2=_0x2b9290,_0x5cbd0d=this['commandName'](_0x363dce);if(_0x5cbd0d['match'](/\\I\[(\d+)\]/i)){const _0x4384bf=Number(RegExp['$1'])||0x0,_0x3ce8b6=this[_0x5307e2(0x549)](_0x363dce),_0x12417e=_0x3ce8b6['x']+Math['floor']((_0x3ce8b6['width']-ImageManager[_0x5307e2(0x1b5)])/0x2),_0x29bc9a=_0x3ce8b6['y']+(_0x3ce8b6[_0x5307e2(0x419)]-ImageManager[_0x5307e2(0x483)])/0x2;this[_0x5307e2(0x16e)](_0x4384bf,_0x12417e,_0x29bc9a);}},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x1cf)]=Window_ItemCategory[_0x2b9290(0x125)]['setItemWindow'],Window_ItemCategory['prototype'][_0x2b9290(0x490)]=function(_0x56e64b){const _0x2191cc=_0x2b9290;VisuMZ['ItemsEquipsCore'][_0x2191cc(0x1cf)][_0x2191cc(0x3e9)](this,_0x56e64b),_0x56e64b[_0x2191cc(0x40a)]=this;},Window_ItemCategory[_0x2b9290(0x125)][_0x2b9290(0x233)]=function(){const _0x3413a5=_0x2b9290;Window_HorzCommand[_0x3413a5(0x125)][_0x3413a5(0x233)][_0x3413a5(0x3e9)](this);if(this[_0x3413a5(0x298)])this['updateCategoryNameWindow']();},Window_ItemCategory[_0x2b9290(0x125)][_0x2b9290(0x372)]=function(){const _0xa39553=_0x2b9290,_0x1f905a=this['_categoryNameWindow'];_0x1f905a[_0xa39553(0x33b)][_0xa39553(0x4f5)]();const _0x560a4c=this[_0xa39553(0x4dd)](this[_0xa39553(0x362)]());if(_0x560a4c===_0xa39553(0x3bb)){const _0x4e981f=this[_0xa39553(0x549)](this[_0xa39553(0x362)]());let _0x212c25=this['commandName'](this['index']());_0x212c25=_0x212c25[_0xa39553(0x11f)](/\\I\[(\d+)\]/gi,''),_0x1f905a['resetFontSettings'](),this[_0xa39553(0x4f7)](_0x212c25,_0x4e981f),this[_0xa39553(0x33f)](_0x212c25,_0x4e981f),this['categoryNameWindowCenter'](_0x212c25,_0x4e981f);}},Window_ItemCategory['prototype'][_0x2b9290(0x4f7)]=function(_0x47f5cf,_0x3b27f1){},Window_ItemCategory[_0x2b9290(0x125)][_0x2b9290(0x33f)]=function(_0x3ed4ed,_0x238956){const _0x3303a1=_0x2b9290,_0x27f75c=this['_categoryNameWindow'];_0x27f75c[_0x3303a1(0x12b)](_0x3ed4ed,0x0,_0x238956['y'],_0x27f75c[_0x3303a1(0x596)],_0x3303a1(0x2ee));},Window_ItemCategory[_0x2b9290(0x125)]['categoryNameWindowCenter']=function(_0x1b9a99,_0x93b81b){const _0x56bbec=_0x2b9290,_0x56123b=this[_0x56bbec(0x298)],_0x5c62f2=$gameSystem[_0x56bbec(0x1e6)](),_0x557f9f=_0x93b81b['x']+Math['floor'](_0x93b81b['width']/0x2)+_0x5c62f2;_0x56123b['x']=_0x56123b['width']/-0x2+_0x557f9f,_0x56123b['y']=Math[_0x56bbec(0x5d8)](_0x93b81b['height']/0x2);},Window_ItemList[_0x2b9290(0x125)][_0x2b9290(0x23b)]=function(){const _0x4aca1d=_0x2b9290;if(this[_0x4aca1d(0x4ef)]()){const _0x14fce6=this[_0x4aca1d(0x362)]();if(this[_0x4aca1d(0x3f1)]()<=0x1){if('UyrLb'!==_0x4aca1d(0x1db)){if(!this[_0x4aca1d(0xe3)](_0x4aca1d(0x568))&&Input['isTriggered'](_0x4aca1d(0x568))){if('hoyuS'===_0x4aca1d(0x457))return _0x5d5dbd[_0x4aca1d(0x2d3)]['Scene_Item_categoryWindowRect'][_0x4aca1d(0x3e9)](this);else this[_0x4aca1d(0x134)]();}!this['isHandled']('pageup')&&Input['isTriggered'](_0x4aca1d(0x15e))&&this[_0x4aca1d(0x41e)]();}else _0x324336[_0x4aca1d(0x2d3)]['Scene_Equip_onActorChange'][_0x4aca1d(0x3e9)](this),this[_0x4aca1d(0x1a5)]()&&(this[_0x4aca1d(0x4e1)][_0x4aca1d(0x5d1)](),this['_commandWindow'][_0x4aca1d(0x127)](),this[_0x4aca1d(0x387)][_0x4aca1d(0x235)](0x0),this[_0x4aca1d(0x387)][_0x4aca1d(0x62e)]());}else{if(this[_0x4aca1d(0x3f1)]()>0x1){Input[_0x4aca1d(0x272)](_0x4aca1d(0x5e9))&&this[_0x4aca1d(0x49e)](Input[_0x4aca1d(0x518)](_0x4aca1d(0x5e9)));Input[_0x4aca1d(0x272)](_0x4aca1d(0x2e6))&&this[_0x4aca1d(0x585)](Input[_0x4aca1d(0x518)](_0x4aca1d(0x2e6)));if(this[_0x4aca1d(0x51a)]()){if(_0x4aca1d(0x41b)===_0x4aca1d(0x41b)){if(Input[_0x4aca1d(0x518)](_0x4aca1d(0x568))&&Input[_0x4aca1d(0x570)](_0x4aca1d(0x4cf))){if(_0x4aca1d(0x543)===_0x4aca1d(0x4df)){const _0x24eb9f=_0x4aca1d(0x502);if(this[_0x4aca1d(0x5be)][_0x24eb9f])return this[_0x4aca1d(0x5be)][_0x24eb9f];let _0x56a3b7='';return this[_0x4aca1d(0x2d5)]['selfTP']>0x0?_0x56a3b7+=_0x4aca1d(0x334)[_0x4aca1d(0x46a)](this[_0x4aca1d(0x2d5)]['selfTP']):_0x56a3b7+='%1'[_0x4aca1d(0x46a)](this['_itemData'][_0x4aca1d(0x5ba)]),_0x56a3b7;}else this['cursorPagedown']();}Input['isTriggered'](_0x4aca1d(0x15e))&&Input[_0x4aca1d(0x570)](_0x4aca1d(0x4cf))&&this['cursorPageup']();}else{_0x1dda57=_0x41f447||'',_0x3bceae=_0x258779||_0x4aca1d(0x2e6),this['_resetFontSize']=this[_0x4aca1d(0x270)](),this['_resetFontColor']=_0x4020c9?_0x2072f0['systemColor']():this[_0x4aca1d(0x33b)][_0x4aca1d(0x523)],_0x4dd955+=this[_0x4aca1d(0x5e3)](),_0x2c73e1-=this['itemPadding']()*0x2;const _0x34fe86=this[_0x4aca1d(0x346)](_0x14f59b);if(_0x254627===_0x4aca1d(0x2ee))_0x56e17f=_0x1e6395+_0x25fdfa[_0x4aca1d(0x5d8)]((_0x3c69eb-_0x34fe86[_0x4aca1d(0x4e0)])/0x2);else _0x339e90===_0x4aca1d(0x5e9)&&(_0xf8bec9=_0x51ec91+_0x5ca25c-_0x34fe86[_0x4aca1d(0x4e0)]);_0x438e2e+=(this[_0x4aca1d(0x625)]()-_0x34fe86['height'])/0x2,this[_0x4aca1d(0x606)](_0x17b70d,_0x75f1cf,_0x54845e,_0x3a64fd),this[_0x4aca1d(0x5c8)]=_0x26bf2e,this['_resetFontColor']=_0x5cce9c,this[_0x4aca1d(0xe0)]();}}else{if(_0x4aca1d(0x352)==='KKkxu'){const _0x286adb=_0x570068(_0x1e615e['$1'])||0x1;if(_0xdbd432>=_0x286adb)return!![];}else{if(Input[_0x4aca1d(0x518)](_0x4aca1d(0x568))){if('zMzBt'===_0x4aca1d(0x3b6))this[_0x4aca1d(0x134)]();else return _0x2026ab['ItemsEquipsCore'][_0x4aca1d(0x100)]['call'](this);}Input[_0x4aca1d(0x518)](_0x4aca1d(0x15e))&&this[_0x4aca1d(0x41e)]();}}}}if(Input['isRepeated'](_0x4aca1d(0x211))){if(_0x4aca1d(0x38b)!==_0x4aca1d(0x38b)){const _0x149ae6=_0x191262[_0x4aca1d(0x1fd)];this[_0x4aca1d(0x12b)](_0x149ae6,_0x2cd60d,_0x584566,_0x3a6914,_0x4aca1d(0x2ee));}else Input[_0x4aca1d(0x570)](_0x4aca1d(0x4cf))&&this[_0x4aca1d(0x434)]()?this['cursorPagedown']():this[_0x4aca1d(0x2fd)](Input['isTriggered'](_0x4aca1d(0x211)));}Input[_0x4aca1d(0x272)]('up')&&(Input[_0x4aca1d(0x570)](_0x4aca1d(0x4cf))&&this[_0x4aca1d(0x434)]()?this[_0x4aca1d(0x41e)]():this[_0x4aca1d(0x2e5)](Input[_0x4aca1d(0x518)]('up')));Imported[_0x4aca1d(0x59c)]&&this['processCursorHomeEndTrigger']();if(this[_0x4aca1d(0x362)]()!==_0x14fce6){if('wRuWE'!==_0x4aca1d(0x533))this[_0x4aca1d(0x229)]();else{const _0x5f2051=this[_0x4aca1d(0x4c8)],_0x322ac8=_0x145f36[_0x4aca1d(0x1e6)](),_0x5cc07c=_0x28c6f1['x']+_0x3ef4f3[_0x4aca1d(0x5d8)](_0x236f56[_0x4aca1d(0x4e0)]/0x2)+_0x322ac8;_0x5f2051['x']=_0x5f2051[_0x4aca1d(0x4e0)]/-0x2+_0x5cc07c,_0x5f2051['y']=_0x132b11[_0x4aca1d(0x5d8)](_0x3a4f3a[_0x4aca1d(0x419)]/0x2);}}}},Window_ItemList['prototype']['limitedPageUpDownSceneCheck']=function(){const _0x26a8b4=_0x2b9290,_0x1c15bb=SceneManager['_scene'],_0x2656f0=[Scene_Item,Scene_Shop];return _0x2656f0[_0x26a8b4(0x57b)](_0x1c15bb[_0x26a8b4(0x2dc)]);},Window_ItemList[_0x2b9290(0x125)][_0x2b9290(0x62e)]=function(){const _0x447279=_0x2b9290;Window_Selectable['prototype'][_0x447279(0x62e)][_0x447279(0x3e9)](this),this[_0x447279(0x40a)]&&this['_categoryWindow'][_0x447279(0x1a5)]()&&this['_categoryWindow'][_0x447279(0x62e)]();},Window_ItemList[_0x2b9290(0x125)][_0x2b9290(0x5d1)]=function(){const _0xa9f6c3=_0x2b9290;Window_Selectable['prototype'][_0xa9f6c3(0x5d1)]['call'](this),this[_0xa9f6c3(0x40a)]&&this['_categoryWindow'][_0xa9f6c3(0x1a5)]()&&this[_0xa9f6c3(0x40a)][_0xa9f6c3(0x5d1)]();},Window_ItemList[_0x2b9290(0x125)]['setCategory']=function(_0x2e4f5c){const _0x3168b8=_0x2b9290;this[_0x3168b8(0x5f1)]!==_0x2e4f5c&&(this[_0x3168b8(0x5f1)]=_0x2e4f5c,this['refresh'](),this[_0x3168b8(0x40a)]&&this[_0x3168b8(0x40a)][_0x3168b8(0x1a5)]()?this[_0x3168b8(0x235)](0x0):'DsnAC'!==_0x3168b8(0x16f)?_0x2e3a2f='armor-%1'[_0x3168b8(0x46a)](_0x5e24bf['id']):this[_0x3168b8(0x583)](0x0,0x0));},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x194)]=Window_ItemList[_0x2b9290(0x125)][_0x2b9290(0x3f1)],Window_ItemList['prototype']['maxCols']=function(){const _0x575e43=_0x2b9290;if(SceneManager[_0x575e43(0x37f)][_0x575e43(0x2dc)]===Scene_Battle)return _0x575e43(0x47c)==='DSgFC'?_0x4a2165[_0x575e43(0x2d3)][_0x575e43(0x389)]['StatusWindow'][_0x575e43(0x1b4)]:VisuMZ[_0x575e43(0x2d3)][_0x575e43(0x194)][_0x575e43(0x3e9)](this);else return SceneManager[_0x575e43(0x37f)][_0x575e43(0x2dc)]===Scene_Map?VisuMZ[_0x575e43(0x2d3)][_0x575e43(0x194)][_0x575e43(0x3e9)](this):VisuMZ['ItemsEquipsCore'][_0x575e43(0x389)]['ItemScene'][_0x575e43(0x287)];},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x2a0)]=Window_ItemList[_0x2b9290(0x125)]['colSpacing'],Window_ItemList[_0x2b9290(0x125)][_0x2b9290(0x37b)]=function(){const _0x5151f1=_0x2b9290;return this[_0x5151f1(0x3f1)]()<=0x1?Window_Selectable['prototype'][_0x5151f1(0x37b)][_0x5151f1(0x3e9)](this):VisuMZ[_0x5151f1(0x2d3)]['Window_ItemList_colSpacing'][_0x5151f1(0x3e9)](this);},Window_ItemList[_0x2b9290(0x125)][_0x2b9290(0x57b)]=function(_0x1756b7){const _0x483cf6=_0x2b9290;switch(this[_0x483cf6(0x5f1)]){case'AllItems':return DataManager[_0x483cf6(0x3f0)](_0x1756b7);case _0x483cf6(0x49b):return DataManager[_0x483cf6(0x3f0)](_0x1756b7)&&_0x1756b7[_0x483cf6(0x20f)]===0x1;case _0x483cf6(0x633):return DataManager[_0x483cf6(0x3f0)](_0x1756b7)&&_0x1756b7[_0x483cf6(0x20f)]===0x2;case _0x483cf6(0x2c1):return DataManager[_0x483cf6(0x3f0)](_0x1756b7)&&_0x1756b7['itypeId']===0x3;case'HiddenItemB':return DataManager[_0x483cf6(0x3f0)](_0x1756b7)&&_0x1756b7[_0x483cf6(0x20f)]===0x4;case _0x483cf6(0x4a8):return DataManager[_0x483cf6(0x3f0)](_0x1756b7)&&_0x1756b7[_0x483cf6(0x21d)];case _0x483cf6(0x398):return DataManager[_0x483cf6(0x3f0)](_0x1756b7)&&!_0x1756b7[_0x483cf6(0x21d)];case _0x483cf6(0xe2):return DataManager['isItem'](_0x1756b7)&&[0x0]['includes'](_0x1756b7[_0x483cf6(0x10b)]);case _0x483cf6(0x60e):return DataManager[_0x483cf6(0x3f0)](_0x1756b7)&&[0x0,0x1][_0x483cf6(0x57b)](_0x1756b7['occasion']);case _0x483cf6(0x470):return DataManager[_0x483cf6(0x3f0)](_0x1756b7)&&[0x0,0x2][_0x483cf6(0x57b)](_0x1756b7[_0x483cf6(0x10b)]);case _0x483cf6(0x2ca):return DataManager[_0x483cf6(0x3f0)](_0x1756b7)&&[0x3]['includes'](_0x1756b7[_0x483cf6(0x10b)]);case _0x483cf6(0x300):return DataManager[_0x483cf6(0x187)](_0x1756b7);case _0x483cf6(0x552):return DataManager[_0x483cf6(0x318)](_0x1756b7);default:if(this[_0x483cf6(0x5f1)][_0x483cf6(0x5c2)](/WTYPE:(\d+)/i))return DataManager['isWeapon'](_0x1756b7)&&_0x1756b7[_0x483cf6(0x275)]===Number(RegExp['$1']);else{if(this[_0x483cf6(0x5f1)][_0x483cf6(0x5c2)](/WTYPE:(.*)/i)){if(_0x483cf6(0x4f9)!=='kjDVF'){const _0xe9030f=_0xf99f8f(_0x119c22['$1'])[_0x483cf6(0x435)](',')[_0x483cf6(0x5ec)](_0x53243d=>_0x10c9e1(_0x53243d));for(const _0x1736ef of _0xe9030f){_0x119659[_0x483cf6(0x3de)](_0x1736ef,!![]);}}else{const _0x3c4a9e=$dataSystem[_0x483cf6(0xe5)][_0x483cf6(0x31f)](String(RegExp['$1'])['trim']());return DataManager['isWeapon'](_0x1756b7)&&_0x1756b7[_0x483cf6(0x275)]===_0x3c4a9e;}}else{if(this[_0x483cf6(0x5f1)]['match'](/ATYPE:(\d+)/i))return DataManager[_0x483cf6(0x318)](_0x1756b7)&&_0x1756b7[_0x483cf6(0x469)]===Number(RegExp['$1']);else{if(this[_0x483cf6(0x5f1)][_0x483cf6(0x5c2)](/ATYPE:(.*)/i)){if(_0x483cf6(0x2b9)===_0x483cf6(0x2b9)){const _0x173e1a=$dataSystem['armorTypes'][_0x483cf6(0x31f)](String(RegExp['$1'])[_0x483cf6(0x3a6)]());return DataManager[_0x483cf6(0x318)](_0x1756b7)&&_0x1756b7[_0x483cf6(0x469)]===_0x173e1a;}else return;}else{if(this[_0x483cf6(0x5f1)][_0x483cf6(0x5c2)](/ETYPE:(\d+)/i)){if('dZOyn'!==_0x483cf6(0x18b))_0x36eaf8+=_0x29928e(_0x5b3430['$1']);else return!!_0x1756b7&&_0x1756b7[_0x483cf6(0x61d)]===Number(RegExp['$1']);}else{if(this[_0x483cf6(0x5f1)]['match'](/ETYPE:(.*)/i)){const _0x407d81=$dataSystem['equipTypes'][_0x483cf6(0x31f)](String(RegExp['$1'])[_0x483cf6(0x3a6)]());return DataManager[_0x483cf6(0x318)](_0x1756b7)&&_0x1756b7[_0x483cf6(0x61d)]===_0x407d81;}else{if(this['_category'][_0x483cf6(0x5c2)](/Category:(.*)/i))return!!_0x1756b7&&_0x1756b7['categories'][_0x483cf6(0x57b)](String(RegExp['$1'])['toUpperCase']()['trim']());}}}}}}}return![];},Window_ItemList[_0x2b9290(0x125)]['isShowNew']=function(){return!![];},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0xfc)]=Window_ItemList[_0x2b9290(0x125)]['drawItem'],Window_ItemList[_0x2b9290(0x125)]['drawItem']=function(_0x24924e){const _0x228cdc=_0x2b9290;VisuMZ[_0x228cdc(0x2d3)][_0x228cdc(0xfc)]['call'](this,_0x24924e),this['placeItemNewLabel'](_0x24924e);},Window_ItemList[_0x2b9290(0x125)][_0x2b9290(0x400)]=function(_0x140c6b,_0x174da7,_0x54298c,_0x14dde6){const _0x430f6b=_0x2b9290;Window_Selectable['prototype']['drawItemNumber'][_0x430f6b(0x3e9)](this,_0x140c6b,_0x174da7,_0x54298c,_0x14dde6);},Window_ItemList['prototype']['placeItemNewLabel']=function(_0xab0ec0){const _0x43ea26=_0x2b9290,_0x4528bd=this['itemAt'](_0xab0ec0);if(!_0x4528bd||!this[_0x43ea26(0x1a8)]())return;if(!$gameParty['isNewItem'](_0x4528bd))return;const _0x48371b=this[_0x43ea26(0x549)](_0xab0ec0),_0x3f0945=_0x48371b['x'],_0x5dda1b=_0x48371b['y']+(this['lineHeight']()-ImageManager['iconHeight'])/0x2,_0x244a31=VisuMZ[_0x43ea26(0x2d3)][_0x43ea26(0x389)][_0x43ea26(0x553)][_0x43ea26(0x3a3)],_0x1a5d80=VisuMZ[_0x43ea26(0x2d3)][_0x43ea26(0x389)][_0x43ea26(0x553)][_0x43ea26(0x3cb)];this['placeNewLabel'](_0x4528bd,_0x3f0945+_0x244a31,_0x5dda1b+_0x1a5d80);},Window_ItemList[_0x2b9290(0x125)]['setStatusWindow']=function(_0xc3974d){const _0xc68e14=_0x2b9290;this[_0xc68e14(0x169)]=_0xc3974d,this[_0xc68e14(0x233)]();},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x3c2)]=Window_ItemList[_0x2b9290(0x125)]['updateHelp'],Window_ItemList[_0x2b9290(0x125)]['updateHelp']=function(){const _0xb2ab4b=_0x2b9290;VisuMZ['ItemsEquipsCore'][_0xb2ab4b(0x3c2)][_0xb2ab4b(0x3e9)](this),this[_0xb2ab4b(0x169)]&&this[_0xb2ab4b(0x169)][_0xb2ab4b(0x2dc)]===Window_ShopStatus&&this['_statusWindow'][_0xb2ab4b(0x61a)](this[_0xb2ab4b(0x4d3)]());},Window_BattleItem[_0x2b9290(0x125)][_0x2b9290(0x42a)]=function(_0x4832df){const _0x2b886a=_0x2b9290;return BattleManager[_0x2b886a(0x484)]()?BattleManager[_0x2b886a(0x484)]()[_0x2b886a(0x264)](_0x4832df):Window_ItemList['prototype'][_0x2b886a(0x42a)][_0x2b886a(0x3e9)](this,_0x4832df);},Window_EventItem[_0x2b9290(0x125)]['isShowNew']=function(){return![];},Window_EquipStatus[_0x2b9290(0x125)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x41cc68=_0x2b9290;return VisuMZ[_0x41cc68(0x2d3)]['Settings']['EquipScene'][_0x41cc68(0x4be)];},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x2f1)]=Window_EquipStatus[_0x2b9290(0x125)]['refresh'],Window_EquipStatus[_0x2b9290(0x125)][_0x2b9290(0x2ef)]=function(){const _0xc4d952=_0x2b9290;this[_0xc4d952(0x281)](),this[_0xc4d952(0xe0)]();if(this['_actor'])this[_0xc4d952(0x114)][_0xc4d952(0x2ef)]();this[_0xc4d952(0x4e9)]()?this['prepareRefreshItemsEquipsCoreLayout']():VisuMZ[_0xc4d952(0x2d3)][_0xc4d952(0x2f1)][_0xc4d952(0x3e9)](this);},Window_EquipStatus[_0x2b9290(0x125)][_0x2b9290(0x17b)]=function(){const _0x5d603c=_0x2b9290;this[_0x5d603c(0x33b)][_0x5d603c(0x4f5)]();if(!this[_0x5d603c(0x114)])return;if(this[_0x5d603c(0x1a6)]()){const _0x20ebb6=ImageManager[_0x5d603c(0x271)](this[_0x5d603c(0x114)][_0x5d603c(0x2b3)]());_0x20ebb6[_0x5d603c(0x2fe)](this[_0x5d603c(0x3d7)]['bind'](this));}else{if(_0x5d603c(0x243)===_0x5d603c(0x1c0)){_0x2070b6[_0x5d603c(0x327)]['match'](/<PROXY:[ ](.*)>/i);const _0x5c24db=_0xf14db4['$1'][_0x5d603c(0x3a6)](),_0x270c64=/^\d+$/[_0x5d603c(0x4c9)](_0x5c24db);if(this[_0x5d603c(0x3f0)](_0x57dcca)){const _0x35473b=_0x270c64?_0x4fcd1b(_0x32e132['$1']):_0x838965['getItemIdWithName'](_0x5c24db);return _0x4734a9[_0x35473b]||_0x2c87df;}else{if(this[_0x5d603c(0x187)](_0x42f76f)){const _0x165cab=_0x270c64?_0x2465ce(_0x2992ab['$1']):_0x3f4bb7[_0x5d603c(0x5d7)](_0x5c24db);return _0x180fa7[_0x165cab]||_0x1f7d40;}else{if(this[_0x5d603c(0x318)](_0x3b3d3a)){const _0x4a9050=_0x270c64?_0x2345e5(_0x385965['$1']):_0x5bf239[_0x5d603c(0x397)](_0x5c24db);return _0x11494c[_0x4a9050]||_0x5ead93;}}}return _0x32a867;}else this[_0x5d603c(0x2e9)]();}},Window_EquipStatus['prototype'][_0x2b9290(0x1a6)]=function(){const _0x56afff=_0x2b9290;return Imported[_0x56afff(0x34f)]&&this['_actor'][_0x56afff(0x2b3)]()!==''&&VisuMZ[_0x56afff(0x2d3)][_0x56afff(0x389)][_0x56afff(0x172)][_0x56afff(0x55f)];},Window_EquipStatus['prototype'][_0x2b9290(0x3d7)]=function(){const _0x45f2c0=_0x2b9290;VisuMZ[_0x45f2c0(0x2d3)][_0x45f2c0(0x389)][_0x45f2c0(0x172)]['DrawPortraitJS']['call'](this),this[_0x45f2c0(0x10f)]();},Window_EquipStatus[_0x2b9290(0x125)][_0x2b9290(0x2e9)]=function(){const _0x51ef4f=_0x2b9290;VisuMZ['ItemsEquipsCore']['Settings']['EquipScene'][_0x51ef4f(0x627)][_0x51ef4f(0x3e9)](this),this[_0x51ef4f(0x10f)]();},Window_EquipStatus[_0x2b9290(0x125)][_0x2b9290(0x10f)]=function(){const _0x24ed94=_0x2b9290;this[_0x24ed94(0xe0)](),VisuMZ[_0x24ed94(0x2d3)][_0x24ed94(0x389)][_0x24ed94(0x172)]['DrawParamJS'][_0x24ed94(0x3e9)](this);},Window_EquipStatus[_0x2b9290(0x125)][_0x2b9290(0x296)]=function(_0x407a24,_0x402af2,_0x345dcd,_0x54b351,_0x217247){const _0x1c0511=_0x2b9290,_0x40ff5e=ImageManager[_0x1c0511(0x271)](_0x407a24[_0x1c0511(0x2b3)]()),_0x4526b5=this[_0x1c0511(0x596)]-_0x40ff5e[_0x1c0511(0x4e0)];_0x402af2+=_0x4526b5/0x2;if(_0x4526b5<0x0)_0x54b351-=_0x4526b5;Window_StatusBase[_0x1c0511(0x125)][_0x1c0511(0x296)][_0x1c0511(0x3e9)](this,_0x407a24,_0x402af2,_0x345dcd,_0x54b351,_0x217247);},Window_EquipStatus[_0x2b9290(0x125)][_0x2b9290(0x1f0)]=function(){const _0x461a39=_0x2b9290;if(Imported['VisuMZ_0_CoreEngine'])return VisuMZ['CoreEngine'][_0x461a39(0x389)][_0x461a39(0x431)][_0x461a39(0x337)];else{if(_0x461a39(0x11c)===_0x461a39(0x12c))this[_0x461a39(0x36e)]={'buy':{'gold':0x0,'items':{}},'sell':{'gold':0x0,'items':{}}};else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}},Window_EquipStatus[_0x2b9290(0x125)][_0x2b9290(0x2d8)]=function(){const _0x28601b=_0x2b9290;return VisuMZ['ItemsEquipsCore'][_0x28601b(0x389)][_0x28601b(0x172)][_0x28601b(0x236)];},Window_EquipStatus[_0x2b9290(0x125)][_0x2b9290(0x19d)]=function(){const _0x47f460=_0x2b9290;return Imported[_0x47f460(0x59c)]&&VisuMZ['CoreEngine'][_0x47f460(0x389)][_0x47f460(0x431)][_0x47f460(0x131)];},Window_EquipStatus[_0x2b9290(0x125)][_0x2b9290(0x25c)]=function(_0x3dd0ad,_0x74f060,_0x5a60f7,_0x2246c9){const _0x59e73c=_0x2b9290,_0x34ee7c=this['itemPadding']();Imported['VisuMZ_0_CoreEngine']?'IQFsV'!==_0x59e73c(0x3d8)?this['drawParamText'](_0x74f060+_0x34ee7c,_0x5a60f7,_0x2246c9,_0x3dd0ad,![]):(this[_0x59e73c(0x1be)]['_scrollDuration']=0x1,this[_0x59e73c(0x1be)][_0x59e73c(0x137)]()):_0x59e73c(0x47a)==='APTRW'?this[_0x59e73c(0x12b)](TextManager[_0x59e73c(0x162)](_0x3dd0ad),_0x74f060+_0x34ee7c,_0x5a60f7,_0x2246c9):_0xeb56a8=this['innerHeight']-_0x5745d0;},Window_EquipStatus[_0x2b9290(0x125)][_0x2b9290(0x303)]=function(_0x117525,_0x608787,_0x359756,_0x1811a9){const _0xa57db0=_0x2b9290,_0x55fb26=this['itemPadding']();let _0x1d401e=0x0;if(Imported[_0xa57db0(0x59c)])_0x1d401e=this['_actor'][_0xa57db0(0x47d)](_0x117525,!![]);else{if(_0xa57db0(0xfd)===_0xa57db0(0xfd))_0x1d401e=this[_0xa57db0(0x114)][_0xa57db0(0x162)](_0x117525);else return 0x63;}const _0x2e3485=_0x1d401e;this['drawText'](_0x1d401e,_0x608787,_0x359756,_0x1811a9-_0x55fb26,'right');},Window_EquipStatus[_0x2b9290(0x125)][_0x2b9290(0x110)]=function(_0x22c968,_0x134ebf,_0x1c2351,_0x47e39f){const _0x39e26a=_0x2b9290,_0x5e83de=this[_0x39e26a(0x5e3)]();let _0x1e3b64=0x0,_0x15836e=0x0,_0x34aebc='';if(this[_0x39e26a(0x1bb)]){if(_0x39e26a(0x3be)==='CozWz'){Imported[_0x39e26a(0x59c)]?(_0x1e3b64=this['_actor'][_0x39e26a(0x47d)](_0x22c968,![]),_0x15836e=this[_0x39e26a(0x1bb)][_0x39e26a(0x47d)](_0x22c968,![]),_0x34aebc=this[_0x39e26a(0x1bb)][_0x39e26a(0x47d)](_0x22c968,!![])):(_0x1e3b64=this[_0x39e26a(0x114)][_0x39e26a(0x162)](_0x22c968),_0x15836e=this['_tempActor'][_0x39e26a(0x162)](_0x22c968),_0x34aebc=this[_0x39e26a(0x1bb)][_0x39e26a(0x162)](_0x22c968));const _0x46ec61=_0x1e3b64,_0x1b25fa=_0x15836e;diffValue=_0x1b25fa-_0x46ec61,this[_0x39e26a(0x594)](ColorManager[_0x39e26a(0x617)](diffValue)),this[_0x39e26a(0x12b)](_0x34aebc,_0x134ebf,_0x1c2351,_0x47e39f-_0x5e83de,'right');}else _0x1476c0['setValue'](_0x4bad2c[_0x39e26a(0x498)],!![]);}},Window_EquipStatus[_0x2b9290(0x125)][_0x2b9290(0x5e8)]=function(_0x13657d,_0x43598a,_0x254159,_0x8a032a){const _0x206ad1=_0x2b9290,_0x25246b=this['itemPadding']();let _0xd5a132=0x0,_0x299866=0x0,_0x2a6050=![];if(this[_0x206ad1(0x1bb)]){if(_0x206ad1(0x354)==='XqCQF'){Imported[_0x206ad1(0x59c)]?(_0xd5a132=this['_actor']['paramValueByName'](_0x13657d,![]),_0x299866=this[_0x206ad1(0x1bb)][_0x206ad1(0x47d)](_0x13657d,![]),_0x2a6050=String(this[_0x206ad1(0x114)][_0x206ad1(0x47d)](_0x13657d,!![]))[_0x206ad1(0x5c2)](/([%％])/i)):(_0xd5a132=this[_0x206ad1(0x114)][_0x206ad1(0x162)](_0x13657d),_0x299866=this['_tempActor'][_0x206ad1(0x162)](_0x13657d),_0x2a6050=_0xd5a132%0x1!==0x0||_0x299866%0x1!==0x0);const _0x533e26=_0xd5a132,_0x4ed00d=_0x299866,_0x242a15=_0x4ed00d-_0x533e26;let _0x493edb=_0x242a15;if(_0x2a6050)_0x493edb=Math[_0x206ad1(0xf7)](_0x242a15*0x64)+'%';_0x242a15!==0x0&&(this[_0x206ad1(0x594)](ColorManager[_0x206ad1(0x617)](_0x242a15)),_0x493edb=(_0x242a15>0x0?_0x206ad1(0x3b8):_0x206ad1(0x284))['format'](_0x493edb),this[_0x206ad1(0x12b)](_0x493edb,_0x43598a+_0x25246b,_0x254159,_0x8a032a,_0x206ad1(0x2e6)));}else return _0x7b2055[_0x206ad1(0x191)]&&_0x4589c9['CoreEngine']['Settings'][_0x206ad1(0x408)]['KeyItemProtect']&&_0x166d69[_0x206ad1(0xf4)](this[_0x206ad1(0x4ae)])?![]:this['_item'][_0x206ad1(0x21d)];}},Window_EquipStatus[_0x2b9290(0x125)][_0x2b9290(0x471)]=function(_0x556fc4,_0x136e7b,_0x1d9594,_0x9ce052,_0x4a38ac){const _0x100fa8=_0x2b9290;if(VisuMZ['ItemsEquipsCore'][_0x100fa8(0x389)][_0x100fa8(0x172)][_0x100fa8(0x36b)]===![])return;_0x4a38ac=Math[_0x100fa8(0x224)](_0x4a38ac||0x1,0x1);while(_0x4a38ac--){if('hfEmy'!==_0x100fa8(0x2d2))return _0x3ad5a7[_0x100fa8(0x2d3)][_0x100fa8(0x389)][_0x100fa8(0x38e)]['ItemMenuStatusRect'][_0x100fa8(0x3e9)](this);else{_0x9ce052=_0x9ce052||this[_0x100fa8(0x625)](),this[_0x100fa8(0x33b)][_0x100fa8(0x5aa)]=0xa0;const _0x1f8112=ColorManager['getItemsEquipsCoreBackColor2']();this[_0x100fa8(0x33b)][_0x100fa8(0x44c)](_0x556fc4+0x1,_0x136e7b+0x1,_0x1d9594-0x2,_0x9ce052-0x2,_0x1f8112),this[_0x100fa8(0x33b)]['paintOpacity']=0xff;}}},ColorManager[_0x2b9290(0x34e)]=function(){const _0x44e492=_0x2b9290,_0x4d9d9f=VisuMZ['ItemsEquipsCore'][_0x44e492(0x389)][_0x44e492(0x172)];let _0x584ac0=_0x4d9d9f[_0x44e492(0x634)]!==undefined?_0x4d9d9f[_0x44e492(0x634)]:0x13;return ColorManager[_0x44e492(0x589)](_0x584ac0);},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x4d5)]=Window_EquipCommand[_0x2b9290(0x125)]['initialize'],Window_EquipCommand[_0x2b9290(0x125)][_0x2b9290(0x130)]=function(_0x715fde){const _0x4581ee=_0x2b9290;VisuMZ[_0x4581ee(0x2d3)][_0x4581ee(0x4d5)][_0x4581ee(0x3e9)](this,_0x715fde),this['createCommandNameWindow'](_0x715fde);},Window_EquipCommand['prototype'][_0x2b9290(0x321)]=function(_0x3ccefd){const _0xc97a71=_0x2b9290,_0x527632=new Rectangle(0x0,0x0,_0x3ccefd[_0xc97a71(0x4e0)],_0x3ccefd[_0xc97a71(0x419)]);this['_commandNameWindow']=new Window_Base(_0x527632),this[_0xc97a71(0x4c8)][_0xc97a71(0x3d0)]=0x0,this[_0xc97a71(0x1f5)](this[_0xc97a71(0x4c8)]),this[_0xc97a71(0x32d)]();},Window_EquipCommand[_0x2b9290(0x125)][_0x2b9290(0x233)]=function(){const _0x446fee=_0x2b9290;Window_HorzCommand[_0x446fee(0x125)][_0x446fee(0x233)]['call'](this);if(this[_0x446fee(0x4c8)])this['updateCommandNameWindow']();},Window_EquipCommand[_0x2b9290(0x125)]['updateCommandNameWindow']=function(){const _0x168e25=_0x2b9290,_0x1f32c7=this[_0x168e25(0x4c8)];_0x1f32c7[_0x168e25(0x33b)][_0x168e25(0x4f5)]();const _0x2baa4a=this['commandStyleCheck'](this[_0x168e25(0x362)]());if(_0x2baa4a===_0x168e25(0x3bb)){if(_0x168e25(0x455)!==_0x168e25(0x455))this['onTouchCancel']();else{const _0x5dbe3d=this[_0x168e25(0x549)](this[_0x168e25(0x362)]());let _0x1868ef=this[_0x168e25(0x591)](this['index']());_0x1868ef=_0x1868ef[_0x168e25(0x11f)](/\\I\[(\d+)\]/gi,''),_0x1f32c7[_0x168e25(0xe0)](),this[_0x168e25(0x50a)](_0x1868ef,_0x5dbe3d),this[_0x168e25(0x38c)](_0x1868ef,_0x5dbe3d),this['commandNameWindowCenter'](_0x1868ef,_0x5dbe3d);}}},Window_EquipCommand['prototype'][_0x2b9290(0x50a)]=function(_0x3a9612,_0x442816){},Window_EquipCommand[_0x2b9290(0x125)][_0x2b9290(0x38c)]=function(_0x216ea0,_0x7a56f7){const _0x5b001b=_0x2b9290,_0x2be354=this['_commandNameWindow'];_0x2be354[_0x5b001b(0x12b)](_0x216ea0,0x0,_0x7a56f7['y'],_0x2be354[_0x5b001b(0x596)],_0x5b001b(0x2ee));},Window_EquipCommand[_0x2b9290(0x125)]['commandNameWindowCenter']=function(_0x5918e4,_0x1be0b6){const _0x54f78d=_0x2b9290,_0x17882c=this[_0x54f78d(0x4c8)],_0x4965ff=$gameSystem[_0x54f78d(0x1e6)](),_0x2939d5=_0x1be0b6['x']+Math['floor'](_0x1be0b6[_0x54f78d(0x4e0)]/0x2)+_0x4965ff;_0x17882c['x']=_0x17882c[_0x54f78d(0x4e0)]/-0x2+_0x2939d5,_0x17882c['y']=Math[_0x54f78d(0x5d8)](_0x1be0b6[_0x54f78d(0x419)]/0x2);},Window_EquipCommand[_0x2b9290(0x125)][_0x2b9290(0x1a5)]=function(){const _0x4a23ef=_0x2b9290;return Imported[_0x4a23ef(0x59c)]&&Window_HorzCommand[_0x4a23ef(0x125)][_0x4a23ef(0x1a5)][_0x4a23ef(0x3e9)](this);},Window_EquipCommand[_0x2b9290(0x125)]['playOkSound']=function(){const _0x481d34=_0x2b9290;if(this[_0x481d34(0x5d3)]()==='equip')Window_HorzCommand[_0x481d34(0x125)][_0x481d34(0x25e)][_0x481d34(0x3e9)](this);},Window_EquipCommand['prototype'][_0x2b9290(0x23b)]=function(){const _0x3cc882=_0x2b9290;if(!this[_0x3cc882(0x3f9)]()){if(_0x3cc882(0x370)===_0x3cc882(0x466)){const _0x5466b1=this[_0x3cc882(0x3b2)](),_0x10855e=this[_0x3cc882(0x2e7)]()?this[_0x3cc882(0x555)]():0x0,_0x4987ec=_0x5466b1['y']+_0x5466b1[_0x3cc882(0x419)],_0x7e367d=_0x33d867['boxWidth']-this['statusWidth'](),_0x17c90c=this[_0x3cc882(0x60b)]()-_0x5466b1[_0x3cc882(0x419)];return new _0x33af59(_0x10855e,_0x4987ec,_0x7e367d,_0x17c90c);}else Window_HorzCommand[_0x3cc882(0x125)][_0x3cc882(0x23b)][_0x3cc882(0x3e9)](this);}},Window_EquipCommand[_0x2b9290(0x125)]['processCursorSpecialCheckModernControls']=function(){const _0xe6fdd1=_0x2b9290;if(!this[_0xe6fdd1(0x4ef)]())return![];if(SceneManager['_scene'][_0xe6fdd1(0x2dc)]!==Scene_Equip)return![];return Input[_0xe6fdd1(0x518)](_0xe6fdd1(0x211))&&(_0xe6fdd1(0x3c1)!==_0xe6fdd1(0x3f3)?(this[_0xe6fdd1(0x229)](),SceneManager[_0xe6fdd1(0x37f)]['commandEquip'](),SceneManager[_0xe6fdd1(0x37f)]['_slotWindow']['smoothSelect'](-0x1)):(this[_0xe6fdd1(0x574)](),_0x3306ab[_0xe6fdd1(0x2d3)][_0xe6fdd1(0x312)][_0xe6fdd1(0x3e9)](this),this[_0xe6fdd1(0x279)](),_0x4ea7ec['ItemsEquipsCore'][_0xe6fdd1(0x1ba)](),_0x5f4e23[_0xe6fdd1(0x2d3)]['SetupArtifactItemIDs']())),![];},Window_EquipCommand[_0x2b9290(0x125)][_0x2b9290(0x3f1)]=function(){const _0x3da4ce=_0x2b9290;return this['_list']?this[_0x3da4ce(0x5a5)][_0x3da4ce(0x40b)]:0x3;},Window_EquipCommand[_0x2b9290(0x125)][_0x2b9290(0x3b7)]=function(){const _0x3cb3f1=_0x2b9290;if(this['isOpen']()&&this[_0x3cb3f1(0x448)]&&SceneManager[_0x3cb3f1(0x37f)][_0x3cb3f1(0x2dc)]===Scene_Equip){if(this[_0x3cb3f1(0x208)]()&&TouchInput[_0x3cb3f1(0x4b1)]()){if(_0x3cb3f1(0x475)===_0x3cb3f1(0x475))this[_0x3cb3f1(0x4ad)](![]);else{this[_0x3cb3f1(0x1be)][_0x3cb3f1(0x2ef)]();const _0x347292=this[_0x3cb3f1(0x387)]['item'](),_0x23839e=this[_0x3cb3f1(0x1be)]['_data']['indexOf'](_0x347292),_0x1ff107=_0x5a2f21[_0x3cb3f1(0x5d8)](this[_0x3cb3f1(0x1be)][_0x3cb3f1(0x165)]()/0x2)-0x1;this['_itemWindow']['smoothSelect'](_0x23839e>=0x0?_0x23839e:0x0),this['_itemWindow'][_0x3cb3f1(0x4c2)]>0x1&&(this[_0x3cb3f1(0x1be)]['_scrollDuration']=0x1,this[_0x3cb3f1(0x1be)][_0x3cb3f1(0x137)]()),this[_0x3cb3f1(0x1be)][_0x3cb3f1(0x2e1)](this[_0x3cb3f1(0x1be)][_0x3cb3f1(0x362)]()-_0x1ff107);}}else TouchInput['isTriggered']()&&this[_0x3cb3f1(0x4ad)](!![]);TouchInput[_0x3cb3f1(0x29b)]()&&this[_0x3cb3f1(0x253)]();}},Window_EquipCommand[_0x2b9290(0x125)][_0x2b9290(0x4ad)]=function(_0x22074e){const _0x2c964e=_0x2b9290;this[_0x2c964e(0x609)]=![];const _0x39ce1b=this['index'](),_0x78b87c=this[_0x2c964e(0x511)](),_0x1f4a59=SceneManager[_0x2c964e(0x37f)]['_slotWindow'];if(_0x1f4a59[_0x2c964e(0x132)]()&&_0x1f4a59[_0x2c964e(0x448)]){if(_0x78b87c>=0x0){if(_0x78b87c===this[_0x2c964e(0x362)]()){if('HduCM'!=='HduCM'){const _0x315ba4=_0x4ebe95[_0x2c964e(0x2d3)][_0x2c964e(0x389)][_0x2c964e(0x23e)],_0x24a270=_0x2c964e(0x225)['format'](this['_item'][_0x2c964e(0x25d)][_0x2c964e(0xf6)]),_0x4636af=[null,_0x1a8dfe['hp'],_0x18582b['mp'],_0x7add3a['hp'],_0x94211c['mp'],_0x113254['hp'],_0x590aa7['mp']][this[_0x2c964e(0x4ae)][_0x2c964e(0x25d)]['type']];return _0x315ba4[_0x24a270][_0x2c964e(0x46a)](_0x4636af);}else this['_doubleTouch']=!![];}this[_0x2c964e(0x62e)](),this[_0x2c964e(0x560)](_0x78b87c);}else _0x1f4a59[_0x2c964e(0x511)]()>=0x0&&(this[_0x2c964e(0x5d1)](),this[_0x2c964e(0x127)]());}_0x22074e&&this[_0x2c964e(0x362)]()!==_0x39ce1b&&this[_0x2c964e(0x229)]();},Window_EquipCommand['prototype']['makeCommandList']=function(){const _0x5e63dc=_0x2b9290;this[_0x5e63dc(0x2ac)](),this[_0x5e63dc(0x332)](),this[_0x5e63dc(0x374)]();},Window_EquipCommand[_0x2b9290(0x125)][_0x2b9290(0x2ef)]=function(){const _0xd37f86=_0x2b9290;Window_HorzCommand['prototype'][_0xd37f86(0x2ef)][_0xd37f86(0x3e9)](this),this[_0xd37f86(0x1dc)]();},Window_EquipCommand[_0x2b9290(0x125)][_0x2b9290(0x2ac)]=function(){const _0x150fb2=_0x2b9290;if(!this['isEquipCommandAdded']())return;const _0x27d4e9=this[_0x150fb2(0x55e)](),_0x46381e=VisuMZ[_0x150fb2(0x2d3)][_0x150fb2(0x389)][_0x150fb2(0x172)][_0x150fb2(0x5f0)],_0x1294ad=_0x27d4e9===_0x150fb2(0xf2)?TextManager[_0x150fb2(0x2df)]:_0x150fb2(0x1ab)[_0x150fb2(0x46a)](_0x46381e,TextManager['equip2']),_0x6f773d=this[_0x150fb2(0x4dc)]();this[_0x150fb2(0x25f)](_0x1294ad,_0x150fb2(0x59f),_0x6f773d);},Window_EquipCommand[_0x2b9290(0x125)]['isEquipCommandAdded']=function(){const _0x23a970=_0x2b9290;return!this[_0x23a970(0x1a5)]();},Window_EquipCommand['prototype'][_0x2b9290(0x4dc)]=function(){return!![];},Window_EquipCommand[_0x2b9290(0x125)][_0x2b9290(0x332)]=function(){const _0x2b34f6=_0x2b9290;if(!this[_0x2b34f6(0x41f)]())return;const _0x519aa6=this['commandStyle'](),_0x30437d=VisuMZ[_0x2b34f6(0x2d3)][_0x2b34f6(0x389)][_0x2b34f6(0x172)][_0x2b34f6(0x5cc)],_0x4f54fe=_0x519aa6===_0x2b34f6(0xf2)?TextManager[_0x2b34f6(0x108)]:_0x2b34f6(0x1ab)[_0x2b34f6(0x46a)](_0x30437d,TextManager[_0x2b34f6(0x108)]),_0x26147d=this[_0x2b34f6(0x316)]();this[_0x2b34f6(0x25f)](_0x4f54fe,'optimize',_0x26147d);},Window_EquipCommand[_0x2b9290(0x125)][_0x2b9290(0x41f)]=function(){const _0x454887=_0x2b9290;return VisuMZ[_0x454887(0x2d3)][_0x454887(0x389)][_0x454887(0x172)][_0x454887(0x3d3)];},Window_EquipCommand[_0x2b9290(0x125)][_0x2b9290(0x316)]=function(){return!![];},Window_EquipCommand[_0x2b9290(0x125)][_0x2b9290(0x374)]=function(){const _0x49f042=_0x2b9290;if(!this['isClearCommandAdded']())return;const _0x415846=this[_0x49f042(0x55e)](),_0x3c05e4=VisuMZ[_0x49f042(0x2d3)]['Settings']['EquipScene'][_0x49f042(0x379)],_0x3af5cd=_0x415846===_0x49f042(0xf2)?TextManager[_0x49f042(0x4f5)]:_0x49f042(0x1ab)['format'](_0x3c05e4,TextManager[_0x49f042(0x4f5)]),_0x3abd61=this['isClearCommandEnabled']();this[_0x49f042(0x25f)](_0x3af5cd,_0x49f042(0x4f5),_0x3abd61);},Window_EquipCommand[_0x2b9290(0x125)][_0x2b9290(0x17a)]=function(){const _0x224a42=_0x2b9290;return VisuMZ[_0x224a42(0x2d3)]['Settings'][_0x224a42(0x172)]['CommandAddClear'];},Window_EquipCommand[_0x2b9290(0x125)]['isClearCommandEnabled']=function(){return!![];},Window_EquipCommand[_0x2b9290(0x125)]['itemTextAlign']=function(){const _0x459271=_0x2b9290;return VisuMZ[_0x459271(0x2d3)][_0x459271(0x389)][_0x459271(0x172)]['CmdTextAlign'];},Window_EquipCommand['prototype'][_0x2b9290(0x16c)]=function(_0x50eda3){const _0x10e11f=_0x2b9290,_0x3e0aa8=this['commandStyleCheck'](_0x50eda3);if(_0x3e0aa8===_0x10e11f(0x43b))this['drawItemStyleIconText'](_0x50eda3);else{if(_0x3e0aa8===_0x10e11f(0x3bb)){if(_0x10e11f(0x43f)===_0x10e11f(0x3db)){const _0x3c1dde=_0x3b4d89['note']||'';if(_0x3c1dde[_0x10e11f(0x5c2)](/<(?:CONSERVE|PRESERVE):[ ](\d+)([%％])>/i)){const _0x35d2c5=_0x3dc6a6(_0x1a853f['$1'])*0.01;if(_0x2ec55b[_0x10e11f(0x5bc)]()<_0x35d2c5)return;}}else this['drawItemStyleIcon'](_0x50eda3);}else Window_HorzCommand[_0x10e11f(0x125)]['drawItem'][_0x10e11f(0x3e9)](this,_0x50eda3);}},Window_EquipCommand['prototype'][_0x2b9290(0x55e)]=function(){const _0xa5490f=_0x2b9290;return VisuMZ[_0xa5490f(0x2d3)][_0xa5490f(0x389)]['EquipScene'][_0xa5490f(0x425)];},Window_EquipCommand[_0x2b9290(0x125)][_0x2b9290(0x494)]=function(_0x582420){const _0x10b69f=_0x2b9290;if(_0x582420<0x0)return _0x10b69f(0xf2);const _0x16d025=this['commandStyle']();if(_0x16d025!==_0x10b69f(0x365))return _0x16d025;else{if(this[_0x10b69f(0x3fe)]()>0x0){if(_0x10b69f(0x21f)===_0x10b69f(0x21f)){const _0x444659=this['commandName'](_0x582420);if(_0x444659['match'](/\\I\[(\d+)\]/i)){if(_0x10b69f(0x3b9)!==_0x10b69f(0x3b9))return _0x57c714['ItemsEquipsCore'][_0x10b69f(0x389)][_0x10b69f(0x38e)][_0x10b69f(0x4be)];else{const _0x20a20c=this[_0x10b69f(0x549)](_0x582420),_0x3de425=this[_0x10b69f(0x346)](_0x444659)[_0x10b69f(0x4e0)];if(_0x3de425<=_0x20a20c[_0x10b69f(0x4e0)])return _0x10b69f(0x43b);else{if(_0x10b69f(0x44b)===_0x10b69f(0x5d0))this[_0x10b69f(0x229)]();else return'icon';}}}}else this[_0x10b69f(0x560)](_0x25c3f0);}}return _0x10b69f(0xf2);},Window_EquipCommand[_0x2b9290(0x125)][_0x2b9290(0x51e)]=function(_0x654c63){const _0x16d630=_0x2b9290,_0x1b6ad0=this['itemLineRect'](_0x654c63),_0x35c173=this[_0x16d630(0x591)](_0x654c63),_0x49be09=this['textSizeEx'](_0x35c173)[_0x16d630(0x4e0)];this[_0x16d630(0x3d6)](this[_0x16d630(0x23c)](_0x654c63));const _0x30a3c1=this[_0x16d630(0x3dc)]();if(_0x30a3c1==='right')this['drawTextEx'](_0x35c173,_0x1b6ad0['x']+_0x1b6ad0[_0x16d630(0x4e0)]-_0x49be09,_0x1b6ad0['y'],_0x49be09);else{if(_0x30a3c1===_0x16d630(0x2ee)){if('vBAfS'===_0x16d630(0x554)){if(this[_0x16d630(0x25b)]&&this[_0x16d630(0x25b)][_0x16d630(0x377)])return _0x3e5bd3[_0x16d630(0x2d3)]['Settings']['ShopScene'][_0x16d630(0x1e0)];return _0x66c41a[_0x16d630(0x125)][_0x16d630(0x5e5)]['call'](this);}else{const _0x37dd54=_0x1b6ad0['x']+Math[_0x16d630(0x5d8)]((_0x1b6ad0[_0x16d630(0x4e0)]-_0x49be09)/0x2);this[_0x16d630(0x606)](_0x35c173,_0x37dd54,_0x1b6ad0['y'],_0x49be09);}}else{if(_0x16d630(0x537)===_0x16d630(0x537))this[_0x16d630(0x606)](_0x35c173,_0x1b6ad0['x'],_0x1b6ad0['y'],_0x49be09);else return this['getShopTrackingItem'](_0x16d630(0x306),_0x5b6358);}}},Window_EquipCommand['prototype']['drawItemStyleIcon']=function(_0x52b12e){const _0x484f15=_0x2b9290;this['commandName'](_0x52b12e)[_0x484f15(0x5c2)](/\\I\[(\d+)\]/i);const _0x44032a=Number(RegExp['$1'])||0x0,_0x4f4515=this[_0x484f15(0x549)](_0x52b12e),_0x461d06=_0x4f4515['x']+Math[_0x484f15(0x5d8)]((_0x4f4515['width']-ImageManager['iconWidth'])/0x2),_0x2fde63=_0x4f4515['y']+(_0x4f4515[_0x484f15(0x419)]-ImageManager[_0x484f15(0x483)])/0x2;this['drawIcon'](_0x44032a,_0x461d06,_0x2fde63);},Window_EquipCommand[_0x2b9290(0x125)]['actor']=function(){const _0x376f48=_0x2b9290,_0x54f536=SceneManager['_scene'];if(_0x54f536&&_0x54f536['user'])return _0x54f536[_0x376f48(0x493)]();return null;},Window_EquipCommand[_0x2b9290(0x125)][_0x2b9290(0x185)]=function(){const _0x403cbc=_0x2b9290;Window_Command['prototype'][_0x403cbc(0x185)]['call'](this),this[_0x403cbc(0x280)]['setText'](this[_0x403cbc(0x2f5)]());},Window_EquipCommand[_0x2b9290(0x125)][_0x2b9290(0x2f5)]=function(){const _0x372027=_0x2b9290,_0x5bcc99=this['currentSymbol']();switch(_0x5bcc99){case _0x372027(0x59f):return TextManager[_0x372027(0x24a)][_0x372027(0x515)][_0x372027(0x59f)];case'optimize':return TextManager[_0x372027(0x24a)]['helpDesc']['optimize'];case _0x372027(0x4f5):return TextManager[_0x372027(0x24a)][_0x372027(0x515)][_0x372027(0x4f5)];default:return'';}},Window_EquipSlot[_0x2b9290(0x125)]['isUseModernControls']=function(){const _0x2e008c=_0x2b9290;return Imported[_0x2e008c(0x59c)]&&Window_HorzCommand[_0x2e008c(0x125)][_0x2e008c(0x1a5)][_0x2e008c(0x3e9)](this);},Window_EquipSlot[_0x2b9290(0x125)]['activate']=function(){const _0x9e7d2=_0x2b9290;Window_StatusBase[_0x9e7d2(0x125)][_0x9e7d2(0x62e)][_0x9e7d2(0x3e9)](this),this[_0x9e7d2(0x233)]();},Window_EquipSlot['prototype'][_0x2b9290(0x209)]=function(){const _0x4139a2=_0x2b9290;Window_StatusBase[_0x4139a2(0x125)][_0x4139a2(0x209)][_0x4139a2(0x3e9)](this),this[_0x4139a2(0x1e3)]();},Window_EquipSlot[_0x2b9290(0x125)][_0x2b9290(0x1e3)]=function(){const _0x581ce4=_0x2b9290;if(!this[_0x581ce4(0x1c3)]())return;if(Input['isTriggered'](_0x581ce4(0x4cf))&&this[_0x581ce4(0x4d3)]()){const _0x165e9e=SceneManager[_0x581ce4(0x37f)][_0x581ce4(0x114)];if(_0x165e9e){if('bzjox'!==_0x581ce4(0x4e2)){if(this[_0x581ce4(0x34d)](this[_0x581ce4(0x362)]())){if(_0x581ce4(0x452)===_0x581ce4(0x452))this[_0x581ce4(0x385)](),this[_0x581ce4(0x185)]();else{if(_0x136dc8){const _0x5c6a26=_0x158137+(this['lineHeight']()-_0x1d1d79[_0x581ce4(0x483)])/0x2,_0x4630b1=_0x29396c[_0x581ce4(0x1b5)]+0x4,_0x40b155=_0x672f66[_0x581ce4(0x224)](0x0,_0x366534-_0x4630b1);this[_0x581ce4(0x594)](_0x7a4ed8['getItemColor'](_0xb7293c)),this[_0x581ce4(0x16e)](_0x24cd63[_0x581ce4(0x13b)],_0x552b23,_0x5c6a26),this[_0x581ce4(0x12b)](_0xce8bba['name'],_0x36fd1e+_0x4630b1,_0x1cbab2,_0x40b155),this[_0x581ce4(0x60f)]();}}}else this[_0x581ce4(0x51d)]();}else return _0x5f00ce[_0x581ce4(0x45e)](_0x581ce4(0x2e6),_0x581ce4(0x5e9));}}},Window_EquipSlot[_0x2b9290(0x125)][_0x2b9290(0x34d)]=function(_0x5d56a6){const _0x5ed3b2=_0x2b9290,_0x250aa5=SceneManager[_0x5ed3b2(0x37f)]['_actor'];if(!_0x250aa5)return;if(!_0x250aa5[_0x5ed3b2(0x50f)](this[_0x5ed3b2(0x362)]()))return![];const _0x154561=_0x250aa5[_0x5ed3b2(0x342)]()[this[_0x5ed3b2(0x362)]()];if(_0x250aa5[_0x5ed3b2(0x11e)]()['includes'](_0x154561))return![];return!![];;},Window_EquipSlot['prototype']['processShiftRemoveShortcut']=function(){const _0x3eee51=_0x2b9290;SoundManager[_0x3eee51(0x21c)]();const _0x3ffcd8=SceneManager[_0x3eee51(0x37f)]['_actor'];_0x3ffcd8[_0x3eee51(0x46f)](this[_0x3eee51(0x362)](),null),this[_0x3eee51(0x2ef)](),this[_0x3eee51(0x1be)][_0x3eee51(0x2ef)](),this[_0x3eee51(0x233)]();const _0x20f631=SceneManager[_0x3eee51(0x37f)]['_statusWindow'];if(_0x20f631)_0x20f631[_0x3eee51(0x2ef)]();},Window_EquipSlot[_0x2b9290(0x125)][_0x2b9290(0x1c3)]=function(){const _0x1ff96f=_0x2b9290;if(!this[_0x1ff96f(0x377)])return![];if(!VisuMZ[_0x1ff96f(0x2d3)][_0x1ff96f(0x389)][_0x1ff96f(0x172)][_0x1ff96f(0x4b2)])return![];return!![];},Window_EquipSlot[_0x2b9290(0x125)][_0x2b9290(0x23b)]=function(){const _0x1e43d5=_0x2b9290;!this[_0x1e43d5(0x3f9)]()&&Window_StatusBase['prototype'][_0x1e43d5(0x23b)][_0x1e43d5(0x3e9)](this);},Window_EquipSlot['prototype'][_0x2b9290(0x3f9)]=function(){const _0x3a0f0b=_0x2b9290;if(!this[_0x3a0f0b(0x4ef)]())return![];if(SceneManager[_0x3a0f0b(0x37f)]['constructor']!==Scene_Equip)return![];if(this[_0x3a0f0b(0x157)]())return _0x3a0f0b(0x600)!==_0x3a0f0b(0x636)?(this[_0x3a0f0b(0x229)](),Input['clear'](),SceneManager[_0x3a0f0b(0x37f)][_0x3a0f0b(0x5e1)](),![]):this['updatedLayoutStyle']()[_0x3a0f0b(0x5c2)](/LOWER/i);else{if(Input[_0x3a0f0b(0x272)](_0x3a0f0b(0x211))){if(_0x3a0f0b(0x563)!==_0x3a0f0b(0x563)){const _0x4c42ee=this[_0x3a0f0b(0x555)](),_0x1e1645=this[_0x3a0f0b(0x60b)]()-this[_0x3a0f0b(0x4e1)]['height'],_0x48d97f=this['isRightInputMode']()?0x0:_0x3852c4['boxWidth']-_0x4c42ee,_0xfc8cc3=this[_0x3a0f0b(0x4e1)]['y']+this[_0x3a0f0b(0x4e1)][_0x3a0f0b(0x419)];return new _0x1ab980(_0x48d97f,_0xfc8cc3,_0x4c42ee,_0x1e1645);}else{const _0x130440=this[_0x3a0f0b(0x362)]();return Input['isPressed'](_0x3a0f0b(0x4cf))?this['cursorPagedown']():this[_0x3a0f0b(0x2fd)](Input[_0x3a0f0b(0x518)](_0x3a0f0b(0x211))),this['index']()!==_0x130440&&this['playCursorSound'](),!![];}}else{if(this[_0x3a0f0b(0x179)]()&&Input[_0x3a0f0b(0x518)](_0x3a0f0b(0x4cf)))return!![];}}return![];},Window_EquipSlot[_0x2b9290(0x125)][_0x2b9290(0x157)]=function(){const _0x39f36c=_0x2b9290;if(this[_0x39f36c(0x362)]()!==0x0)return![];const _0x34bc4f=VisuMZ[_0x39f36c(0x2d3)][_0x39f36c(0x389)]['EquipScene'];if(!_0x34bc4f[_0x39f36c(0x3d3)]&&!_0x34bc4f[_0x39f36c(0x60d)])return![];return Input[_0x39f36c(0x518)]('up');},Window_EquipSlot['prototype']['isShiftShortcutKeyForRemove']=function(){const _0x47526e=_0x2b9290;return VisuMZ[_0x47526e(0x2d3)][_0x47526e(0x389)]['EquipScene'][_0x47526e(0x4b2)];},Window_EquipSlot[_0x2b9290(0x125)]['processTouchModernControls']=function(){const _0x5ab991=_0x2b9290;if(this['isOpen']()&&this[_0x5ab991(0x448)]&&SceneManager[_0x5ab991(0x37f)][_0x5ab991(0x2dc)]===Scene_Equip){if(this[_0x5ab991(0x208)]()&&TouchInput[_0x5ab991(0x4b1)]())this[_0x5ab991(0x4ad)](![]);else TouchInput[_0x5ab991(0x518)]()&&this[_0x5ab991(0x4ad)](!![]);if(TouchInput[_0x5ab991(0x29b)]()){if(_0x5ab991(0x48c)===_0x5ab991(0x283))return!this[_0x5ab991(0x1a5)]();else this[_0x5ab991(0x253)]();}else TouchInput[_0x5ab991(0x319)]()&&(_0x5ab991(0x3dd)===_0x5ab991(0x3dd)?this['onTouchCancel']():this[_0x5ab991(0x3df)]());}},Window_EquipSlot['prototype'][_0x2b9290(0x4ad)]=function(_0x51bea8){const _0x39d095=_0x2b9290;this['_doubleTouch']=![];const _0x3f431e=this[_0x39d095(0x362)](),_0x139607=this[_0x39d095(0x511)](),_0x12d65e=SceneManager[_0x39d095(0x37f)]['_commandWindow'];if(_0x12d65e[_0x39d095(0x132)]()&&_0x12d65e[_0x39d095(0x448)]){if(_0x139607>=0x0){if(_0x39d095(0x5da)===_0x39d095(0x5da)){if(_0x139607===this[_0x39d095(0x362)]()){if(_0x39d095(0x58d)===_0x39d095(0x58d))this['_doubleTouch']=!![];else{const _0x83490b=_0x145679(_0x5c11df['$1']);return _0x235ba4[_0x39d095(0x5f9)](_0x83490b);}}this[_0x39d095(0x62e)](),this[_0x39d095(0x560)](_0x139607);}else return _0x41995e['ItemsEquipsCore'][_0x39d095(0x389)]['EquipScene'][_0x39d095(0x3d3)];}else _0x12d65e[_0x39d095(0x511)]()>=0x0&&(_0x39d095(0x49c)!==_0x39d095(0x49c)?_0x40b56d[_0x39d095(0x52d)](_0x2c7cbd[_0x39d095(0x12d)](_0x46ce09)):(this[_0x39d095(0x5d1)](),this['deselect']()));}_0x51bea8&&this[_0x39d095(0x362)]()!==_0x3f431e&&this[_0x39d095(0x229)]();},Window_EquipSlot[_0x2b9290(0x125)][_0x2b9290(0x547)]=function(){const _0x2ac3c8=_0x2b9290;return this[_0x2ac3c8(0x362)]();},VisuMZ[_0x2b9290(0x2d3)]['Window_EquipItem_includes']=Window_EquipItem[_0x2b9290(0x125)][_0x2b9290(0x57b)],Window_EquipItem['prototype'][_0x2b9290(0x57b)]=function(_0x9b6172){const _0x142fee=_0x2b9290;if(_0x9b6172===null&&this[_0x142fee(0x11e)]()[_0x142fee(0x57b)](this['etypeId']()))return![];else{if(_0x142fee(0x1b7)!=='StIIl')!this[_0x142fee(0xe3)](_0x142fee(0x568))&&_0x37c84d['isTriggered'](_0x142fee(0x568))&&this['cursorPagedown'](),!this[_0x142fee(0xe3)](_0x142fee(0x15e))&&_0xf90baa[_0x142fee(0x518)](_0x142fee(0x15e))&&this[_0x142fee(0x41e)]();else{$gameTemp[_0x142fee(0x5b8)]=!![];let _0xa3e026=VisuMZ[_0x142fee(0x2d3)][_0x142fee(0x575)][_0x142fee(0x3e9)](this,_0x9b6172);if(!_0xa3e026&&_0x9b6172&&DataManager[_0x142fee(0x318)](_0x9b6172)){const _0x55421e=_0x9b6172[_0x142fee(0x469)]||0x0;if(this[_0x142fee(0x114)]&&this['_actor'][_0x142fee(0x1a0)](_0x55421e)){if(_0x142fee(0x103)!==_0x142fee(0x3ab)){const _0x31f69e=DataManager['getEtypeIDs'](_0x9b6172);if(_0x31f69e[_0x142fee(0x57b)](this[_0x142fee(0x61d)]())){if(_0x142fee(0x302)===_0x142fee(0x302))_0xa3e026=!![];else return!![];}}else{_0x510a2d+=0x1;if(_0x979f9e['note'][_0x142fee(0x5c2)](_0x164530)){const _0x3dedd4=_0x58522c(_0x3bb1fa['$1'])||0x1;if(_0x588002>=_0x3dedd4)return!![];}if(_0x3d86d8[_0x142fee(0x327)]['match'](_0x442e66)){const _0x40db02=_0x540352(_0x3d40fa['$1'])||0x1;if(_0x1a0975>=_0x40db02)return!![];}}}}return $gameTemp['_checkEquipRequirements']=undefined,_0xa3e026;}}},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x3bd)]=Window_EquipItem[_0x2b9290(0x125)]['isEnabled'],Window_EquipItem[_0x2b9290(0x125)][_0x2b9290(0x42a)]=function(_0x48e27a){const _0x319bef=_0x2b9290;if(_0x48e27a&&this[_0x319bef(0x114)]){if(this[_0x319bef(0x501)](_0x48e27a))return![];if(this[_0x319bef(0x516)](_0x48e27a))return![];if(this[_0x319bef(0x639)](_0x48e27a))return![];if(!this[_0x319bef(0x114)]['canEquip'](_0x48e27a))return![];}if(!_0x48e27a)return!this[_0x319bef(0x11e)]()[_0x319bef(0x57b)](this['etypeId']());return VisuMZ[_0x319bef(0x2d3)][_0x319bef(0x3bd)]['call'](this,_0x48e27a);},Window_EquipItem[_0x2b9290(0x125)][_0x2b9290(0x501)]=function(_0x38602f){const _0x14755d=_0x2b9290,_0x1371af=_0x38602f[_0x14755d(0x327)];if(_0x1371af['match'](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){if(_0x14755d(0x344)===_0x14755d(0x344)){const _0x622c38=Number(RegExp['$1'])||0x1;let _0x290f9d=0x0;const _0x2aeb48=this[_0x14755d(0x114)][_0x14755d(0x5d5)](),_0x5b33ef=SceneManager['_scene']['_slotWindow'][_0x14755d(0x547)]();_0x2aeb48[_0x5b33ef]=null;for(const _0x11023c of _0x2aeb48){if(!_0x11023c)continue;if(DataManager[_0x14755d(0x187)](_0x38602f)===DataManager[_0x14755d(0x187)](_0x11023c)){if(_0x38602f['id']===_0x11023c['id'])_0x290f9d+=0x1;}}return _0x290f9d>=_0x622c38;}else return _0x9345e1['floor'](_0x44e8eb['boxWidth']/0x2);}else{if('ZKBlv'===_0x14755d(0x4d6))return![];else{const _0x53728a=_0x823882[_0x14755d(0x2d3)][_0x14755d(0x389)]['ItemScene'][_0x14755d(0x2b5)];return _0x53728a[_0x14755d(0x46a)](_0x17a3cd[_0x14755d(0x2a2)](this[_0x14755d(0x4ae)]));}}},Window_EquipItem[_0x2b9290(0x125)][_0x2b9290(0x516)]=function(_0xa97e84){const _0x518280=_0x2b9290;if(!DataManager[_0x518280(0x187)](_0xa97e84))return![];const _0x340edc=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x449db0=0x0;const _0xe1e55a=this[_0x518280(0x114)]['equips'](),_0x3770d8=SceneManager['_scene'][_0x518280(0x387)][_0x518280(0x547)]();_0xe1e55a[_0x3770d8]=null;for(const _0x5521f9 of _0xe1e55a){if('zeueQ'===_0x518280(0x567)){const _0x1f6975=_0x518280(0x480);if(this[_0x518280(0x5be)][_0x1f6975])return this[_0x518280(0x5be)][_0x1f6975];return _0x4cd6c8[_0x518280(0x19a)]&&_0x188a97[_0x518280(0x1e9)](this['_item'])!==_0x518280(0x252)?this[_0x518280(0x57e)]():this[_0x518280(0x5c9)]();}else{if(!_0x5521f9)continue;if(!DataManager[_0x518280(0x187)](_0x5521f9))continue;if(_0xa97e84[_0x518280(0x275)]===_0x5521f9[_0x518280(0x275)]){if(_0x518280(0x39c)!==_0x518280(0x39c))_0x1face2[_0x518280(0x2d3)]['Scene_Shop_createSellWindow'][_0x518280(0x3e9)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x518280(0x241)]();else{_0x449db0+=0x1;if(_0xa97e84['note']['match'](_0x340edc)){const _0x276858=Number(RegExp['$1'])||0x1;if(_0x449db0>=_0x276858)return!![];}if(_0x5521f9[_0x518280(0x327)]['match'](_0x340edc)){if('AJUmv'!==_0x518280(0x4b3)){const _0x1edad3=Number(RegExp['$1'])||0x1;if(_0x449db0>=_0x1edad3)return!![];}else _0x1b0bce=_0x1cdef7[_0x518280(0x2d3)][_0x518280(0x389)][_0x518280(0x3d4)][_0x1999c0];}}}}}return![];},Window_EquipItem[_0x2b9290(0x125)][_0x2b9290(0x639)]=function(_0x274a6b){const _0x11d9e7=_0x2b9290;if(!DataManager[_0x11d9e7(0x318)](_0x274a6b))return![];const _0x3ee1b3=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x5e44a4=0x0;const _0x2406cb=this[_0x11d9e7(0x114)]['equips'](),_0x37448e=SceneManager[_0x11d9e7(0x37f)][_0x11d9e7(0x387)][_0x11d9e7(0x547)]();_0x2406cb[_0x37448e]=null;for(const _0x3c98be of _0x2406cb){if(_0x11d9e7(0x581)!==_0x11d9e7(0x429)){if(!_0x3c98be)continue;if(!DataManager[_0x11d9e7(0x318)](_0x3c98be))continue;if(_0x274a6b[_0x11d9e7(0x469)]===_0x3c98be[_0x11d9e7(0x469)]){_0x5e44a4+=0x1;if(_0x274a6b['note'][_0x11d9e7(0x5c2)](_0x3ee1b3)){const _0x5505f8=Number(RegExp['$1'])||0x1;if(_0x5e44a4>=_0x5505f8)return!![];}if(_0x3c98be[_0x11d9e7(0x327)][_0x11d9e7(0x5c2)](_0x3ee1b3)){const _0x4adffa=Number(RegExp['$1'])||0x1;if(_0x5e44a4>=_0x4adffa)return!![];}}}else{const _0x3c01bd=this[_0x11d9e7(0x136)](_0x59b213);if(!_0x3c01bd||!this[_0x11d9e7(0x1a8)]())return;if(!_0x161962[_0x11d9e7(0x3e8)](_0x3c01bd))return;const _0x2ecc52=this['itemLineRect'](_0x4a97ea),_0x667490=_0x2ecc52['x'],_0x2e9f7a=_0x2ecc52['y']+(this[_0x11d9e7(0x625)]()-_0x2c5919[_0x11d9e7(0x483)])/0x2,_0x401a17=_0xb96c81[_0x11d9e7(0x2d3)][_0x11d9e7(0x389)][_0x11d9e7(0x553)]['OffsetX'],_0x3062dd=_0x3a5573[_0x11d9e7(0x2d3)][_0x11d9e7(0x389)]['New'][_0x11d9e7(0x3cb)];this[_0x11d9e7(0x1bf)](_0x3c01bd,_0x667490+_0x401a17,_0x2e9f7a+_0x3062dd);}}return![];},Window_EquipItem['prototype'][_0x2b9290(0x11e)]=function(){const _0x2f650d=_0x2b9290;return VisuMZ['ItemsEquipsCore'][_0x2f650d(0x389)][_0x2f650d(0x172)][_0x2f650d(0x323)];},Window_EquipItem[_0x2b9290(0x125)][_0x2b9290(0x16c)]=function(_0x5a784){const _0x3acb6e=_0x2b9290,_0x4bddde=this[_0x3acb6e(0x136)](_0x5a784);if(_0x4bddde){if(_0x3acb6e(0x418)!==_0x3acb6e(0x447))Window_ItemList[_0x3acb6e(0x125)]['drawItem'][_0x3acb6e(0x3e9)](this,_0x5a784);else return _0x5b27c9[_0x24999e][_0x3acb6e(0x26d)]=_0x906425[_0x31e55d][_0x3acb6e(0x26d)]||0x0,_0x1d204f[_0x2db438]['gold'];}else this[_0x3acb6e(0x559)](_0x5a784);},Window_EquipItem[_0x2b9290(0x125)][_0x2b9290(0x559)]=function(_0x18a119){const _0x30e3a1=_0x2b9290;this[_0x30e3a1(0x3d6)](this[_0x30e3a1(0x42a)](null));const _0x218244=VisuMZ['ItemsEquipsCore'][_0x30e3a1(0x389)][_0x30e3a1(0x172)],_0x2abe98=this[_0x30e3a1(0x549)](_0x18a119),_0x538213=_0x2abe98['y']+(this['lineHeight']()-ImageManager[_0x30e3a1(0x483)])/0x2,_0xd9f7e0=ImageManager[_0x30e3a1(0x1b5)]+0x4,_0x255fe0=Math[_0x30e3a1(0x224)](0x0,_0x2abe98[_0x30e3a1(0x4e0)]-_0xd9f7e0);this[_0x30e3a1(0x60f)](),this['drawIcon'](_0x218244[_0x30e3a1(0x35f)],_0x2abe98['x'],_0x538213),this['drawText'](_0x218244[_0x30e3a1(0x37d)],_0x2abe98['x']+_0xd9f7e0,_0x2abe98['y'],_0x255fe0),this[_0x30e3a1(0x3d6)](!![]);},Window_EquipItem['prototype'][_0x2b9290(0x185)]=function(){const _0x1e5096=_0x2b9290;Window_ItemList['prototype'][_0x1e5096(0x185)][_0x1e5096(0x3e9)](this);if(this['_actor']&&this[_0x1e5096(0x169)]&&this[_0x1e5096(0x5fe)]>=0x0){const _0x266588=JsonEx[_0x1e5096(0x2cb)](this['_actor']);_0x266588['_tempActor']=!![],_0x266588[_0x1e5096(0x1e4)](this[_0x1e5096(0x5fe)],this['item']()),this[_0x1e5096(0x169)][_0x1e5096(0x250)](_0x266588);}},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x55b)]=Window_ShopCommand['prototype'][_0x2b9290(0x130)],Window_ShopCommand[_0x2b9290(0x125)][_0x2b9290(0x130)]=function(_0x5dc7ab){const _0x227ad8=_0x2b9290;VisuMZ[_0x227ad8(0x2d3)][_0x227ad8(0x55b)]['call'](this,_0x5dc7ab),this[_0x227ad8(0x321)](_0x5dc7ab);},Window_ShopCommand['prototype'][_0x2b9290(0x321)]=function(_0x29cca0){const _0x21c3ce=_0x2b9290,_0x1e0070=new Rectangle(0x0,0x0,_0x29cca0[_0x21c3ce(0x4e0)],_0x29cca0['height']);this['_commandNameWindow']=new Window_Base(_0x1e0070),this['_commandNameWindow']['opacity']=0x0,this[_0x21c3ce(0x1f5)](this[_0x21c3ce(0x4c8)]),this[_0x21c3ce(0x32d)]();},Window_ShopCommand[_0x2b9290(0x125)]['callUpdateHelp']=function(){const _0x458d8f=_0x2b9290;Window_HorzCommand[_0x458d8f(0x125)][_0x458d8f(0x233)][_0x458d8f(0x3e9)](this);if(this[_0x458d8f(0x4c8)])this[_0x458d8f(0x32d)]();},Window_ShopCommand[_0x2b9290(0x125)][_0x2b9290(0x32d)]=function(){const _0x49729c=_0x2b9290,_0x4e18c6=this[_0x49729c(0x4c8)];_0x4e18c6[_0x49729c(0x33b)][_0x49729c(0x4f5)]();const _0x27e33f=this[_0x49729c(0x494)](this[_0x49729c(0x362)]());if(_0x27e33f===_0x49729c(0x3bb)){const _0x169d28=this[_0x49729c(0x549)](this[_0x49729c(0x362)]());let _0x306e0b=this[_0x49729c(0x591)](this[_0x49729c(0x362)]());_0x306e0b=_0x306e0b[_0x49729c(0x11f)](/\\I\[(\d+)\]/gi,''),_0x4e18c6[_0x49729c(0xe0)](),this[_0x49729c(0x50a)](_0x306e0b,_0x169d28),this[_0x49729c(0x38c)](_0x306e0b,_0x169d28),this[_0x49729c(0x5fc)](_0x306e0b,_0x169d28);}},Window_ShopCommand[_0x2b9290(0x125)]['commandNameWindowDrawBackground']=function(_0x3cea97,_0x3fa0e2){},Window_ShopCommand[_0x2b9290(0x125)][_0x2b9290(0x38c)]=function(_0x5351f6,_0x1e67d3){const _0x21eb62=_0x2b9290,_0x2a6b8d=this[_0x21eb62(0x4c8)];_0x2a6b8d['drawText'](_0x5351f6,0x0,_0x1e67d3['y'],_0x2a6b8d[_0x21eb62(0x596)],_0x21eb62(0x2ee));},Window_ShopCommand[_0x2b9290(0x125)][_0x2b9290(0x5fc)]=function(_0xe2179d,_0x5149dd){const _0x2d994a=_0x2b9290,_0x2807ff=this[_0x2d994a(0x4c8)],_0x55acfb=$gameSystem[_0x2d994a(0x1e6)](),_0x4307b8=_0x5149dd['x']+Math['floor'](_0x5149dd['width']/0x2)+_0x55acfb;_0x2807ff['x']=_0x2807ff[_0x2d994a(0x4e0)]/-0x2+_0x4307b8,_0x2807ff['y']=Math['floor'](_0x5149dd['height']/0x2);},Window_ShopCommand[_0x2b9290(0x125)][_0x2b9290(0x3f1)]=function(){const _0x126087=_0x2b9290;return this['_list']?this[_0x126087(0x5a5)][_0x126087(0x40b)]:0x3;},Window_ShopCommand[_0x2b9290(0x125)][_0x2b9290(0x176)]=function(){const _0x5087cf=_0x2b9290;return VisuMZ['ItemsEquipsCore']['Settings'][_0x5087cf(0x44f)]['CmdHideDisabled'];},Window_ShopCommand['prototype'][_0x2b9290(0x1d3)]=function(){const _0x1d1c3c=_0x2b9290;this[_0x1d1c3c(0x1bc)](),this['addSellCommand'](),this['addCancelCommand']();},Window_ShopCommand['prototype']['refresh']=function(){const _0x4142e9=_0x2b9290;Window_HorzCommand['prototype'][_0x4142e9(0x2ef)]['call'](this),this['refreshCursor']();},Window_ShopCommand[_0x2b9290(0x125)][_0x2b9290(0x1bc)]=function(){const _0x922c09=_0x2b9290,_0x3f34b4=this['commandStyle'](),_0x5b85f8=VisuMZ[_0x922c09(0x2d3)][_0x922c09(0x389)][_0x922c09(0x44f)]['CmdIconBuy'],_0x3abd2c=_0x3f34b4===_0x922c09(0xf2)?TextManager[_0x922c09(0x306)]:'\x5cI[%1]%2'[_0x922c09(0x46a)](_0x5b85f8,TextManager[_0x922c09(0x306)]),_0x498abe=this['isBuyCommandEnabled']();if(this[_0x922c09(0x176)]()&&!_0x498abe)return;this[_0x922c09(0x25f)](_0x3abd2c,_0x922c09(0x306),_0x498abe);},Window_ShopCommand[_0x2b9290(0x125)][_0x2b9290(0x19e)]=function(){const _0x318864=_0x2b9290;if(SceneManager[_0x318864(0x37f)][_0x318864(0x2dc)]===Scene_Shop)return SceneManager[_0x318864(0x37f)][_0x318864(0x4a3)]>0x0;else{if(_0x318864(0x1c7)!==_0x318864(0x1c7)){_0x46bf2b+='\x5cI[%1]'['format'](_0x15a86a['iconIndex']),_0x16dc8e++;if(_0x92c3e9>=_0x1511ea)return _0x37ea7c;}else return!![];}},Window_ShopCommand[_0x2b9290(0x125)][_0x2b9290(0x1c4)]=function(){const _0x255146=_0x2b9290,_0x2b2351=this[_0x255146(0x55e)](),_0x14c8da=VisuMZ['ItemsEquipsCore'][_0x255146(0x389)][_0x255146(0x44f)][_0x255146(0x2f8)],_0x32e591=_0x2b2351===_0x255146(0xf2)?TextManager[_0x255146(0x51b)]:_0x255146(0x1ab)[_0x255146(0x46a)](_0x14c8da,TextManager['sell']),_0x13c0bd=this['isSellCommandEnabled']();if(this['hideDisabledCommands']()&&!_0x13c0bd)return;this[_0x255146(0x25f)](_0x32e591,_0x255146(0x51b),_0x13c0bd);},Window_ShopCommand[_0x2b9290(0x125)]['isSellCommandEnabled']=function(){return!this['_purchaseOnly'];},Window_ShopCommand[_0x2b9290(0x125)][_0x2b9290(0x153)]=function(){const _0x1424d5=_0x2b9290,_0x2d771e=this[_0x1424d5(0x55e)](),_0x2249dd=VisuMZ[_0x1424d5(0x2d3)]['Settings'][_0x1424d5(0x44f)]['CmdIconCancel'],_0x2b477e=VisuMZ['ItemsEquipsCore'][_0x1424d5(0x389)][_0x1424d5(0x44f)][_0x1424d5(0x129)],_0x227e40=_0x2d771e==='text'?_0x2b477e:'\x5cI[%1]%2'[_0x1424d5(0x46a)](_0x2249dd,_0x2b477e);this['addCommand'](_0x227e40,'cancel');},Window_ShopCommand['prototype'][_0x2b9290(0x3dc)]=function(){const _0x419ade=_0x2b9290;return VisuMZ[_0x419ade(0x2d3)]['Settings']['ShopScene'][_0x419ade(0x27e)];},Window_ShopCommand[_0x2b9290(0x125)][_0x2b9290(0x16c)]=function(_0x9b6da){const _0x4a7498=_0x2b9290,_0x42f24d=this['commandStyleCheck'](_0x9b6da);if(_0x42f24d==='iconText')this[_0x4a7498(0x51e)](_0x9b6da);else _0x42f24d===_0x4a7498(0x3bb)?this['drawItemStyleIcon'](_0x9b6da):Window_HorzCommand['prototype'][_0x4a7498(0x16c)][_0x4a7498(0x3e9)](this,_0x9b6da);},Window_ShopCommand[_0x2b9290(0x125)]['commandStyle']=function(){const _0x4a6e03=_0x2b9290;return VisuMZ[_0x4a6e03(0x2d3)]['Settings'][_0x4a6e03(0x44f)]['CmdStyle'];},Window_ShopCommand[_0x2b9290(0x125)][_0x2b9290(0x494)]=function(_0x548d37){const _0x5615e0=_0x2b9290;if(_0x548d37<0x0)return'text';const _0x42ee4f=this[_0x5615e0(0x55e)]();if(_0x42ee4f!=='auto'){if(_0x5615e0(0x32a)!==_0x5615e0(0xfa))return _0x42ee4f;else{const _0x4582d9=_0x36b97a[_0x5615e0(0x2d3)]['Scene_Item_itemWindowRect'][_0x5615e0(0x3e9)](this);return this[_0x5615e0(0x14f)]()&&this[_0x5615e0(0x557)]()&&(_0x4582d9[_0x5615e0(0x4e0)]-=this[_0x5615e0(0x555)]()),_0x4582d9;}}else{if(this['maxItems']()>0x0){const _0xdb25c3=this['commandName'](_0x548d37);if(_0xdb25c3[_0x5615e0(0x5c2)](/\\I\[(\d+)\]/i)){const _0x2eba97=this[_0x5615e0(0x549)](_0x548d37),_0x309558=this['textSizeEx'](_0xdb25c3)[_0x5615e0(0x4e0)];return _0x309558<=_0x2eba97[_0x5615e0(0x4e0)]?_0x5615e0(0x43b):_0x5615e0(0x3bb);}}}return _0x5615e0(0xf2);},Window_ShopCommand[_0x2b9290(0x125)][_0x2b9290(0x51e)]=function(_0x56b0fb){const _0x29bcb3=_0x2b9290,_0x20157c=this[_0x29bcb3(0x549)](_0x56b0fb),_0x1e198e=this[_0x29bcb3(0x591)](_0x56b0fb),_0x183afb=this['textSizeEx'](_0x1e198e)[_0x29bcb3(0x4e0)];this['changePaintOpacity'](this[_0x29bcb3(0x23c)](_0x56b0fb));const _0x14db2d=this[_0x29bcb3(0x3dc)]();if(_0x14db2d==='right')'cgspc'==='dwCfv'?(this[_0x29bcb3(0x412)](_0x17e5f6,_0x34d8a8),_0x17dd7f[_0x29bcb3(0x3ad)](_0x1d0fca,_0x4aa576),_0x41f1cf[_0x29bcb3(0x500)](_0x39ea23*this['buyingPrice']())):this['drawTextEx'](_0x1e198e,_0x20157c['x']+_0x20157c['width']-_0x183afb,_0x20157c['y'],_0x183afb);else{if(_0x14db2d===_0x29bcb3(0x2ee)){if(_0x29bcb3(0x611)!==_0x29bcb3(0x3f6)){const _0xb39abb=_0x20157c['x']+Math[_0x29bcb3(0x5d8)]((_0x20157c[_0x29bcb3(0x4e0)]-_0x183afb)/0x2);this['drawTextEx'](_0x1e198e,_0xb39abb,_0x20157c['y'],_0x183afb);}else this[_0x29bcb3(0x606)](_0x2087d4,_0x7a8cd7['x'],_0x271224['y'],_0x1deead);}else this[_0x29bcb3(0x606)](_0x1e198e,_0x20157c['x'],_0x20157c['y'],_0x183afb);}},Window_ShopCommand[_0x2b9290(0x125)][_0x2b9290(0x256)]=function(_0x213fce){const _0x549229=_0x2b9290;this['commandName'](_0x213fce)[_0x549229(0x5c2)](/\\I\[(\d+)\]/i);const _0x2a6b23=Number(RegExp['$1'])||0x0,_0x28a536=this[_0x549229(0x549)](_0x213fce),_0x34aa0b=_0x28a536['x']+Math[_0x549229(0x5d8)]((_0x28a536[_0x549229(0x4e0)]-ImageManager['iconWidth'])/0x2),_0x7f1050=_0x28a536['y']+(_0x28a536[_0x549229(0x419)]-ImageManager[_0x549229(0x483)])/0x2;this['drawIcon'](_0x2a6b23,_0x34aa0b,_0x7f1050);},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x28d)]=Window_ShopBuy['prototype'][_0x2b9290(0x2ef)],Window_ShopBuy['prototype']['refresh']=function(){const _0x57c000=_0x2b9290;this['updateMoneyAmount'](),VisuMZ['ItemsEquipsCore'][_0x57c000(0x28d)]['call'](this);},Window_ShopBuy[_0x2b9290(0x125)]['updateMoneyAmount']=function(){const _0x20d8c9=_0x2b9290;if(SceneManager[_0x20d8c9(0x37f)][_0x20d8c9(0x2dc)]===Scene_Shop){if(_0x20d8c9(0x513)!==_0x20d8c9(0x375))this[_0x20d8c9(0x622)]=SceneManager[_0x20d8c9(0x37f)]['money']();else{if(_0x118a9d['isKeyItem'](_0x2ab14d))return _0x440085[_0x20d8c9(0x48f)];return!![];}}},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x39b)]=Window_ShopBuy[_0x2b9290(0x125)][_0x2b9290(0x1d2)],Window_ShopBuy[_0x2b9290(0x125)][_0x2b9290(0x1d2)]=function(_0x346d3d){const _0x5be576=_0x2b9290;if(!_0x346d3d)return 0x0;let _0x3b5ebb=VisuMZ['ItemsEquipsCore'][_0x5be576(0x39b)][_0x5be576(0x3e9)](this,_0x346d3d);return Math[_0x5be576(0x224)](0x0,this['modifiedBuyPriceItemsEquipsCore'](_0x346d3d,_0x3b5ebb));},Window_ShopBuy[_0x2b9290(0x125)]['modifiedBuyPriceItemsEquipsCore']=function(_0x1f9357,_0x46472b){const _0x2d856d=_0x2b9290,_0x2c4f83=_0x1f9357[_0x2d856d(0x327)];if(_0x2c4f83['match'](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x535cc4=String(RegExp['$1']);try{eval(_0x535cc4);}catch(_0x2874bb){if($gameTemp[_0x2d856d(0x238)]())console[_0x2d856d(0x542)](_0x2874bb);}}_0x46472b=VisuMZ['ItemsEquipsCore'][_0x2d856d(0x389)][_0x2d856d(0x44f)][_0x2d856d(0x1b6)]['call'](this,_0x1f9357,_0x46472b);if(isNaN(_0x46472b))_0x46472b=0x0;return Math[_0x2d856d(0x5d8)](_0x46472b);},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x4d7)]=Window_ShopBuy[_0x2b9290(0x125)]['goodsToItem'],Window_ShopBuy['prototype'][_0x2b9290(0x1af)]=function(_0x1fd9b2){const _0x35babd=_0x2b9290,_0x3d727b=VisuMZ[_0x35babd(0x2d3)][_0x35babd(0x4d7)][_0x35babd(0x3e9)](this,_0x1fd9b2);return _0x3d727b&&!this[_0x35babd(0x378)](_0x3d727b)?null:_0x3d727b;},VisuMZ['ItemsEquipsCore'][_0x2b9290(0x164)]={'ShowAllSwitches':/<SHOW SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i,'ShowAnySwitches':/<SHOW SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,'HideAllSwitches':/<HIDE SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i,'HideAnySwitches':/<HIDE SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,'BuyTurnSwitchOn':/<BUY TURN ON SWITCH(?:|ES):[ ](.*)>/i,'BuyTurnSwitchOff':/<BUY TURN OFF SWITCH(?:|ES):[ ](.*)>/i,'SellTurnSwitchOn':/<SELL TURN ON SWITCH(?:|ES):[ ](.*)>/i,'SellTurnSwitchOff':/<SELL TURN OFF SWITCH(?:|ES):[ ](.*)>/i},Window_ShopBuy['prototype']['meetsShopListingConditions']=function(_0x1d74d3){const _0x4879fc=_0x2b9290;if(!_0x1d74d3)return![];const _0x28fd8b=VisuMZ[_0x4879fc(0x2d3)][_0x4879fc(0x164)],_0x146583=_0x1d74d3?_0x1d74d3['note']||'':'';if(_0x146583['match'](_0x28fd8b[_0x4879fc(0x195)])){if(_0x4879fc(0x5e0)!=='oVKNP'){this['_doubleTouch']=![];if(this['isCursorMovable']()){const _0x379664=this[_0x4879fc(0x362)](),_0x366108=this[_0x4879fc(0x511)]();_0x366108>=0x0&&_0x366108!==this[_0x4879fc(0x362)]()&&this[_0x4879fc(0x560)](_0x366108),_0x3ff954&&this['index']()!==_0x379664&&this[_0x4879fc(0x229)]();}}else{const _0x55bcb4=String(RegExp['$1'])['split'](',')[_0x4879fc(0x5ec)](_0x19a228=>Number(_0x19a228));if(_0x55bcb4[_0x4879fc(0x1d1)](_0x2ed8a9=>!$gameSwitches['value'](_0x2ed8a9)))return![];}}if(_0x146583['match'](_0x28fd8b[_0x4879fc(0x207)])){const _0xc6e7eb=String(RegExp['$1'])[_0x4879fc(0x435)](',')[_0x4879fc(0x5ec)](_0x476e08=>Number(_0x476e08));if(_0xc6e7eb['every'](_0x2da029=>!$gameSwitches['value'](_0x2da029)))return![];}if(_0x146583[_0x4879fc(0x5c2)](_0x28fd8b[_0x4879fc(0x290)])){const _0x4a521c=String(RegExp['$1'])['split'](',')['map'](_0x57767a=>Number(_0x57767a));if(_0x4a521c[_0x4879fc(0x367)](_0x48634b=>$gameSwitches['value'](_0x48634b)))return![];}if(_0x146583[_0x4879fc(0x5c2)](_0x28fd8b['HideAnySwitches'])){const _0x10f935=String(RegExp['$1'])[_0x4879fc(0x435)](',')[_0x4879fc(0x5ec)](_0x27b940=>Number(_0x27b940));if(_0x10f935[_0x4879fc(0x1d1)](_0x396033=>$gameSwitches[_0x4879fc(0x5f9)](_0x396033)))return![];}return!![];},Window_ShopBuy[_0x2b9290(0x125)]['drawItem']=function(_0x1dee0d){const _0x5f5d2a=_0x2b9290;this[_0x5f5d2a(0xe0)]();const _0x48a6dc=this[_0x5f5d2a(0x136)](_0x1dee0d),_0x50d73a=this[_0x5f5d2a(0x549)](_0x1dee0d),_0x2d792c=_0x50d73a[_0x5f5d2a(0x4e0)];this[_0x5f5d2a(0x3d6)](this[_0x5f5d2a(0x42a)](_0x48a6dc)),this[_0x5f5d2a(0x358)](_0x48a6dc,_0x50d73a['x'],_0x50d73a['y'],_0x2d792c),this['drawItemCost'](_0x48a6dc,_0x50d73a),this['changePaintOpacity'](!![]);},Window_ShopBuy[_0x2b9290(0x125)][_0x2b9290(0x4e6)]=function(_0x1cc42e,_0x557d2d){const _0x543328=_0x2b9290,_0xed7586=this[_0x543328(0x1d2)](_0x1cc42e);this[_0x543328(0x1e1)](_0xed7586,TextManager[_0x543328(0x4c0)],_0x557d2d['x'],_0x557d2d['y'],_0x557d2d[_0x543328(0x4e0)]);},Window_ShopSell[_0x2b9290(0x125)][_0x2b9290(0x3f1)]=function(){const _0x51b233=_0x2b9290;return SceneManager[_0x51b233(0x37f)][_0x51b233(0x4e9)]()?0x1:0x2;},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x53d)]=Window_ShopSell['prototype'][_0x2b9290(0x42a)],Window_ShopSell[_0x2b9290(0x125)][_0x2b9290(0x42a)]=function(_0x4e117e){const _0x339904=_0x2b9290;if(!_0x4e117e)return![];const _0x2df4d7=_0x4e117e[_0x339904(0x327)];if(_0x2df4d7[_0x339904(0x5c2)](/<CANNOT SELL>/i))return![];if(_0x2df4d7[_0x339904(0x5c2)](/<CAN SELL>/i))return!![];if(_0x2df4d7[_0x339904(0x5c2)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x36c4a6=JSON['parse']('['+RegExp['$1'][_0x339904(0x5c2)](/\d+/g)+']');for(const _0x4476db of _0x36c4a6){if(!$gameSwitches[_0x339904(0x5f9)](_0x4476db))return![];}}if(_0x2df4d7[_0x339904(0x5c2)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('kqaZB'!==_0x339904(0x49f)){_0x570354[_0x339904(0x2d3)]['Scene_Shop_doSell'][_0x339904(0x3e9)](this,_0x5d06d8),this[_0x339904(0x180)](this['_item'],_0x385c6c);if(_0x329ff7<=0x0)return;const _0x561ce5=_0x28d9ba[_0x339904(0x2d3)][_0x339904(0x389)]['ShopScene'];_0x561ce5[_0x339904(0x206)]&&_0x208737[_0x339904(0x3de)](_0x561ce5[_0x339904(0x498)],!![]),this[_0x339904(0x112)][_0x339904(0x2ef)](),this['_sellWindow'][_0x339904(0x2ef)]();}else{const _0x4c87c7=JSON[_0x339904(0x507)]('['+RegExp['$1'][_0x339904(0x5c2)](/\d+/g)+']');for(const _0x47f051 of _0x4c87c7){if(!$gameSwitches[_0x339904(0x5f9)](_0x47f051))return![];}}}if(_0x2df4d7[_0x339904(0x5c2)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x339904(0x13e)===_0x339904(0x13e)){const _0x277c7c=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x28160f of _0x277c7c){if($gameSwitches[_0x339904(0x5f9)](_0x28160f))return![];}}else _0x43d7af[_0x339904(0x125)]['deactivate'][_0x339904(0x3e9)](this),this[_0x339904(0x40a)]&&this['_categoryWindow'][_0x339904(0x1a5)]()&&this['_categoryWindow']['deactivate']();}return VisuMZ[_0x339904(0x2d3)][_0x339904(0x53d)]['call'](this,_0x4e117e);},Window_ShopStatus[_0x2b9290(0x299)]=VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'][_0x2b9290(0x309)]??0xf0,VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x22a)]=Window_ShopStatus['prototype']['setItem'],Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x61a)]=function(_0x5e828d){const _0x135f23=_0x2b9290;_0x5e828d=DataManager['getProxyItem'](_0x5e828d),DataManager[_0x135f23(0x187)](_0x5e828d)||DataManager[_0x135f23(0x318)](_0x5e828d)?this[_0x135f23(0x601)](_0x5e828d):VisuMZ['ItemsEquipsCore'][_0x135f23(0x22a)]['call'](this,_0x5e828d);},Window_ShopStatus['prototype'][_0x2b9290(0x601)]=function(_0x4ca6af){const _0x24169b=_0x2b9290;this['_item']=_0x4ca6af;const _0x475864=Window_ShopStatus[_0x24169b(0x299)];setTimeout(this['refreshDelay'][_0x24169b(0x37e)](this,_0x4ca6af),_0x475864);},Window_ShopStatus['prototype'][_0x2b9290(0x19c)]=function(_0x5e62ec){const _0x4ac527=_0x2b9290;this[_0x4ac527(0x4ae)]===_0x5e62ec&&this['refresh']();},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x3c4)]=function(){return![];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x3f4)]=function(){const _0x180b65=_0x2b9290;Window_StatusBase[_0x180b65(0x125)][_0x180b65(0x3f4)][_0x180b65(0x3e9)](this);for(const _0x30799c of $gameParty[_0x180b65(0x17f)]()){if(_0x180b65(0x451)!==_0x180b65(0x451)){if(_0x27874e[_0x180b65(0x5f9)](_0x2cc50e))return![];}else ImageManager[_0x180b65(0x320)](_0x30799c[_0x180b65(0x5ad)]());}},Window_ShopStatus['prototype'][_0x2b9290(0x20d)]=function(){const _0x2f8bce=_0x2b9290;return VisuMZ['ItemsEquipsCore'][_0x2f8bce(0x389)][_0x2f8bce(0x23e)][_0x2f8bce(0x1f3)];},Window_ShopStatus['prototype'][_0x2b9290(0x2ef)]=function(){const _0x56f753=_0x2b9290;this[_0x56f753(0x33b)][_0x56f753(0x4f5)](),this[_0x56f753(0x488)]['clear'](),this['_item']&&(this[_0x56f753(0xe0)](),this[_0x56f753(0x3d6)](!![]),this[_0x56f753(0x3ca)](),this[_0x56f753(0x47b)]()?this[_0x56f753(0x2c9)]():this[_0x56f753(0x5df)](),this[_0x56f753(0x41c)]());},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x5a3)]=function(_0xaf46f7,_0x3aef81){const _0x437211=_0x2b9290;if(!this[_0x437211(0x47b)]()&&!DataManager[_0x437211(0x3f0)](this[_0x437211(0x4ae)]))return;const _0x288744=this[_0x437211(0x596)]-this[_0x437211(0x5e3)]()-_0xaf46f7,_0x204f2f=this['textWidth'](_0x437211(0x4ea));this[_0x437211(0x594)](ColorManager[_0x437211(0x5c4)]()),this['drawText'](TextManager[_0x437211(0x376)],_0xaf46f7+this[_0x437211(0x5e3)](),_0x3aef81,_0x288744-_0x204f2f),this[_0x437211(0x60f)](),this[_0x437211(0x400)](this[_0x437211(0x4ae)],_0xaf46f7,_0x3aef81,_0x288744);},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x471)]=function(_0x4851be,_0x38f0e7,_0x3bbc10,_0x52ef1d,_0x451994){const _0x54703f=_0x2b9290;if(VisuMZ['ItemsEquipsCore'][_0x54703f(0x389)][_0x54703f(0x23e)][_0x54703f(0x36b)]===![])return;_0x451994=Math['max'](_0x451994||0x1,0x1);while(_0x451994--){if(_0x54703f(0x2c8)===_0x54703f(0x345))this[_0x54703f(0x594)](_0x10da08['systemColor']()),this['drawText'](_0x36a935[_0x54703f(0x162)](_0x529b85),_0x3c83c5,_0x2e167e,_0xf97f02);else{_0x52ef1d=_0x52ef1d||this[_0x54703f(0x625)](),this['contentsBack'][_0x54703f(0x5aa)]=0xa0;const _0x1cb8dc=ColorManager['getItemsEquipsCoreBackColor1']();this[_0x54703f(0x488)]['fillRect'](_0x4851be+0x1,_0x38f0e7+0x1,_0x3bbc10-0x2,_0x52ef1d-0x2,_0x1cb8dc),this[_0x54703f(0x488)][_0x54703f(0x5aa)]=0xff;}}},ColorManager[_0x2b9290(0x101)]=function(){const _0x4daf8c=_0x2b9290,_0x2059c4=VisuMZ[_0x4daf8c(0x2d3)][_0x4daf8c(0x389)][_0x4daf8c(0x23e)];let _0x5a4569=_0x2059c4[_0x4daf8c(0x634)]!==undefined?_0x2059c4['BackRectColor']:0x13;return ColorManager['getColor'](_0x5a4569);},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x2c9)]=function(){const _0x155ce2=_0x2b9290;this[_0x155ce2(0x1bb)]=null;if(VisuMZ[_0x155ce2(0x2d3)][_0x155ce2(0x389)][_0x155ce2(0x23e)][_0x155ce2(0x2e4)]){VisuMZ[_0x155ce2(0x2d3)][_0x155ce2(0x389)][_0x155ce2(0x23e)][_0x155ce2(0x2e4)][_0x155ce2(0x3e9)](this);return;}const _0x51b8cc=this[_0x155ce2(0x625)](),_0x1817bf=this[_0x155ce2(0x5c6)]()+0x8;let _0x542dca=0x0,_0xa288ee=0x0,_0x2778b8=this[_0x155ce2(0x596)],_0x25f39e=this[_0x155ce2(0x4a4)],_0x2efb43=Math[_0x155ce2(0x5d8)](_0x2778b8/0x2),_0x4159e4=_0x542dca+_0x2778b8-_0x2efb43;this[_0x155ce2(0x358)](this[_0x155ce2(0x4ae)],_0x542dca+this[_0x155ce2(0x5e3)](),_0xa288ee,_0x2778b8-this[_0x155ce2(0x5e3)]()*0x2),this[_0x155ce2(0x471)](_0x542dca,_0xa288ee,_0x2778b8),_0xa288ee+=_0x51b8cc;if(this[_0x155ce2(0x497)](_0x542dca,_0xa288ee,_0x2efb43))_0xa288ee+=0x0;if(this[_0x155ce2(0x1ff)](_0x4159e4,_0xa288ee,_0x2efb43))_0xa288ee+=_0x51b8cc;const _0x12a35f=this[_0x155ce2(0x1f0)](),_0xf9d798=_0xa288ee;_0xa288ee=_0x25f39e-_0x12a35f[_0x155ce2(0x40b)]*_0x1817bf-0x4;let _0x44db39=_0x542dca,_0x321b08=0x0,_0x853197=_0xa288ee;for(const _0x2006ad of _0x12a35f){if('AQzza'!=='AQzza'){const _0xcf1b11=this[_0x155ce2(0xf8)](_0x2a322b);let _0x169750=0x0,_0x1dcc7e=0x0,_0x1e3fff=0x0;_0x1f4c51[_0x155ce2(0x59c)]?(_0x169750=_0xcf1b11[_0x155ce2(0x47d)](_0x534b57),_0x1dcc7e=_0x169750-_0x3995eb[_0x155ce2(0x47d)](_0x3752b2),this[_0x155ce2(0x594)](_0x5b8abd[_0x155ce2(0x617)](_0x1dcc7e)),_0x1e3fff=(_0x1dcc7e>=0x0?'+':'')+_0x58d19c[_0x155ce2(0x59d)](_0x1dcc7e,0x0,_0x4de3b2)):(_0x169750=_0xcf1b11[_0x155ce2(0x162)](_0x57da7f),_0x1dcc7e=_0x169750-_0x4ddd41[_0x155ce2(0x162)](_0x437578),this[_0x155ce2(0x594)](_0x53e5c6[_0x155ce2(0x617)](_0x1dcc7e)),_0x1e3fff=(_0x1dcc7e>=0x0?'+':'')+_0x1dcc7e),_0x1e3fff==='+0'&&(_0x1e3fff=_0x299034[_0x155ce2(0x60a)]),this[_0x155ce2(0x12b)](_0x1e3fff,_0xcf17d5,_0x35a0d4,_0x14c78e,_0x155ce2(0x2ee));}else _0x321b08=Math[_0x155ce2(0x224)](this['drawParamName'](_0x2006ad,_0x542dca+0x4,_0xa288ee+0x4,_0x2778b8),_0x321b08),_0xa288ee+=_0x1817bf;}const _0x1fe4c8=$gameParty[_0x155ce2(0x254)](),_0xe3ca9a=Math[_0x155ce2(0x5d8)]((_0x2778b8-_0x321b08)/_0x1fe4c8);_0x321b08=_0x2778b8-_0xe3ca9a*_0x1fe4c8;for(const _0x3158cb of $gameParty[_0x155ce2(0x29e)]()){const _0xcb2b57=$gameParty[_0x155ce2(0x29e)]()[_0x155ce2(0x31f)](_0x3158cb),_0xf03dc0=_0x44db39+_0x321b08+_0xcb2b57*_0xe3ca9a;this[_0x155ce2(0x3d6)](_0x3158cb[_0x155ce2(0x528)](this[_0x155ce2(0x4ae)])),this['drawActorCharacter'](_0x3158cb,_0xf03dc0+_0xe3ca9a/0x2,_0x853197);let _0x33bb1b=_0x853197;for(const _0x458815 of _0x12a35f){if(_0x155ce2(0x3b1)!==_0x155ce2(0x534)){const _0x21e506=_0x33bb1b-(_0x51b8cc-_0x1817bf)/0x2;this[_0x155ce2(0x14e)](_0x3158cb,_0x458815,_0xf03dc0,_0x21e506,_0xe3ca9a),_0x33bb1b+=_0x1817bf;}else this[_0x155ce2(0x1be)][_0x155ce2(0x24e)]('cancel',this[_0x155ce2(0x536)][_0x155ce2(0x37e)](this));}}this[_0x155ce2(0x471)](_0x44db39,_0xf9d798,_0x321b08,_0x853197-_0xf9d798);for(let _0x125ff6=0x0;_0x125ff6<_0x1fe4c8;_0x125ff6++){const _0x38e111=_0x44db39+_0x321b08+_0x125ff6*_0xe3ca9a;this[_0x155ce2(0x471)](_0x38e111,_0xf9d798,_0xe3ca9a,_0x853197-_0xf9d798);}for(const _0x1d6c10 of _0x12a35f){this[_0x155ce2(0x471)](_0x44db39,_0x853197,_0x321b08,_0x1817bf);for(let _0x1132a5=0x0;_0x1132a5<_0x1fe4c8;_0x1132a5++){const _0x1c441a=_0x44db39+_0x321b08+_0x1132a5*_0xe3ca9a;this['drawItemDarkRect'](_0x1c441a,_0x853197,_0xe3ca9a,_0x1817bf);}_0x853197+=_0x1817bf;}},Window_ShopStatus[_0x2b9290(0x125)]['drawItemEquipType']=function(_0x4b9700,_0x1653b2,_0x277275){const _0x1d8d7d=_0x2b9290;if(!this[_0x1d8d7d(0x47b)]())return![];const _0x57a31a=$dataSystem['equipTypes'][this['_item'][_0x1d8d7d(0x61d)]];return this[_0x1d8d7d(0x42e)](_0x57a31a,_0x4b9700,_0x1653b2,_0x277275,!![]),this['drawItemDarkRect'](_0x4b9700,_0x1653b2,_0x277275),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x2b9290(0x1cd)]=function(){const _0x450d30=_0x2b9290,_0x435859=VisuMZ['ItemsEquipsCore'][_0x450d30(0x389)][_0x450d30(0x38e)][_0x450d30(0x2b5)];return _0x435859[_0x450d30(0x46a)]($gameParty[_0x450d30(0x2a2)](this[_0x450d30(0x4ae)]));},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x1f0)]=function(){const _0x3bcb75=_0x2b9290;let _0x566eab=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];return Imported[_0x3bcb75(0x59c)]&&(_0x566eab=VisuMZ[_0x3bcb75(0x191)]['Settings'][_0x3bcb75(0x431)][_0x3bcb75(0x337)]),_0x566eab=_0x566eab[_0x3bcb75(0x5ec)](_0x2ab8bf=>typeof _0x2ab8bf===_0x3bcb75(0x32b)?_0x2ab8bf:_0x2ab8bf[_0x3bcb75(0x32c)]()[_0x3bcb75(0x3a6)]()),_0x566eab;},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x5c3)]=function(){const _0x1ab267=_0x2b9290;return VisuMZ['ItemsEquipsCore'][_0x1ab267(0x389)][_0x1ab267(0x23e)][_0x1ab267(0x212)];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x405)]=function(_0x4766a3,_0xab442c,_0x1554d1,_0x558d0c){const _0x1aee3f=_0x2b9290;this[_0x1aee3f(0xe0)](),this['contents']['fontSize']=this[_0x1aee3f(0x5c3)]();let _0x1733c9=this[_0x1aee3f(0x35c)](TextManager[_0x1aee3f(0x162)](_0x4766a3))+0x4+_0xab442c;if(Imported['VisuMZ_0_CoreEngine'])this[_0x1aee3f(0x35a)](_0xab442c,_0x1554d1,_0x558d0c,_0x4766a3,!![]),VisuMZ[_0x1aee3f(0x191)][_0x1aee3f(0x389)]['Param']['DrawIcons']&&(_0x1733c9+=ImageManager[_0x1aee3f(0x1b5)]+0x4);else{if(_0x1aee3f(0x31c)!==_0x1aee3f(0x14b))this['changeTextColor'](ColorManager[_0x1aee3f(0x5c4)]()),this[_0x1aee3f(0x12b)](TextManager[_0x1aee3f(0x162)](_0x4766a3),_0xab442c,_0x1554d1,_0x558d0c);else return _0xeaad0c[_0x1aee3f(0x2d3)][_0x1aee3f(0x417)]['call'](this);}return this[_0x1aee3f(0xe0)](),_0x1733c9;},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x14e)]=function(_0x531ae1,_0x4c049f,_0x5cdc22,_0x2c52e4,_0x5ea974){const _0x457b9c=_0x2b9290;_0x5cdc22+=this[_0x457b9c(0x5e3)](),_0x5ea974-=this[_0x457b9c(0x5e3)]()*0x2;const _0x5d9432=VisuMZ[_0x457b9c(0x2d3)][_0x457b9c(0x389)][_0x457b9c(0x23e)];this['contents'][_0x457b9c(0x5de)]=_0x5d9432[_0x457b9c(0x212)],this[_0x457b9c(0x3d6)](_0x531ae1['canEquip'](this[_0x457b9c(0x4ae)]));if(_0x531ae1[_0x457b9c(0x10c)](this[_0x457b9c(0x4ae)])&&!_0x531ae1[_0x457b9c(0x619)](this[_0x457b9c(0x4ae)])){const _0x5e1cbc=_0x5d9432[_0x457b9c(0x1fd)];this['drawText'](_0x5e1cbc,_0x5cdc22,_0x2c52e4,_0x5ea974,_0x457b9c(0x2ee));}else{if(_0x531ae1[_0x457b9c(0x528)](this['_item'])){const _0x1450f9=this[_0x457b9c(0xf8)](_0x531ae1);let _0x1110d1=0x0,_0x5c06bf=0x0,_0x475e81=0x0;Imported[_0x457b9c(0x59c)]?(_0x1110d1=_0x1450f9[_0x457b9c(0x47d)](_0x4c049f),_0x5c06bf=_0x1110d1-_0x531ae1[_0x457b9c(0x47d)](_0x4c049f),this[_0x457b9c(0x594)](ColorManager[_0x457b9c(0x617)](_0x5c06bf)),_0x475e81=(_0x5c06bf>=0x0?'+':'')+VisuMZ[_0x457b9c(0x59d)](_0x5c06bf,0x0,_0x4c049f)):(_0x1110d1=_0x1450f9[_0x457b9c(0x162)](_0x4c049f),_0x5c06bf=_0x1110d1-_0x531ae1['param'](_0x4c049f),this[_0x457b9c(0x594)](ColorManager[_0x457b9c(0x617)](_0x5c06bf)),_0x475e81=(_0x5c06bf>=0x0?'+':'')+_0x5c06bf);if(_0x475e81==='+0'){if('mLPaC'===_0x457b9c(0x188))_0x475e81=_0x5d9432[_0x457b9c(0x60a)];else return _0x53b376[_0x457b9c(0x410)][_0x457b9c(0x46a)](_0x4b2f33(_0x2179f1['$1']));}this[_0x457b9c(0x12b)](_0x475e81,_0x5cdc22,_0x2c52e4,_0x5ea974,'center');}else{const _0xa1b0bc=_0x5d9432['CannotEquipMarker'];this[_0x457b9c(0x12b)](_0xa1b0bc,_0x5cdc22,_0x2c52e4,_0x5ea974,_0x457b9c(0x2ee));}}this[_0x457b9c(0xe0)](),this[_0x457b9c(0x3d6)](!![]);},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0xf8)]=function(_0x15e1ea){const _0x124e83=_0x2b9290;if(this[_0x124e83(0x444)](_0x15e1ea)){const _0x211239=JsonEx[_0x124e83(0x2cb)](_0x15e1ea);_0x211239['_tempActor']=!![];const _0x3fa636=_0x211239[_0x124e83(0x1a2)](this[_0x124e83(0x4ae)]);if(_0x3fa636>=0x0){if(_0x124e83(0x482)===_0x124e83(0x3cf)){const _0x50a4de=_0x4b6a8b[_0x124e83(0x5cb)](_0x4c6d1e[_0x124e83(0x56c)]());return _0x50a4de;}else _0x211239[_0x124e83(0x1e4)](_0x3fa636,this['_item']);}this[_0x124e83(0x1bb)]=_0x211239;}return this[_0x124e83(0x1bb)];},Window_ShopStatus['prototype'][_0x2b9290(0x444)]=function(_0x4dce89){const _0x9e2c39=_0x2b9290;if(!this[_0x9e2c39(0x1bb)])return!![];return this[_0x9e2c39(0x1bb)][_0x9e2c39(0x2de)]()!==_0x4dce89[_0x9e2c39(0x2de)]();},Game_Actor[_0x2b9290(0x125)][_0x2b9290(0x619)]=function(_0x3904aa){const _0x47da49=_0x2b9290;if(!_0x3904aa)return![];const _0x360aba=_0x3904aa['etypeId'],_0x46c3aa=this[_0x47da49(0x342)]();for(let _0x1260aa=0x0;_0x1260aa<_0x46c3aa[_0x47da49(0x40b)];_0x1260aa++){const _0x3ad0b6=_0x46c3aa[_0x1260aa];if(_0x3ad0b6!==_0x360aba)continue;if(!this['equips']()[_0x1260aa])return!![];}return![];},Game_Actor[_0x2b9290(0x125)][_0x2b9290(0x1a2)]=function(_0x153a28){const _0x3ebae4=_0x2b9290;if(!_0x153a28)return-0x1;const _0x46b9e4=_0x153a28['etypeId'],_0x23eb84=this[_0x3ebae4(0x342)]();let _0x455fbb=-0x1;for(let _0x383a33=0x0;_0x383a33<_0x23eb84[_0x3ebae4(0x40b)];_0x383a33++){const _0x40c6aa=_0x23eb84[_0x383a33];if(_0x40c6aa!==_0x46b9e4)continue;if(!this[_0x3ebae4(0x5d5)]()[_0x383a33])return _0x383a33;if(_0x455fbb<0x0)_0x455fbb=_0x383a33;}return _0x455fbb;},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x5df)]=function(){const _0x1e1116=_0x2b9290;VisuMZ[_0x1e1116(0x2d3)][_0x1e1116(0x389)][_0x1e1116(0x23e)]['DrawItemData']['call'](this);},Window_ShopStatus['prototype'][_0x2b9290(0x358)]=function(_0x450597,_0x8f0540,_0x31ec6a,_0xf2709){const _0x5d4661=_0x2b9290,_0x59c8c8=DataManager[_0x5d4661(0x34a)](_0x450597,_0x8f0540,_0x31ec6a,_0xf2709)&&Imported['VisuMZ_1_SkillsStatesCore'],_0x1e438d=_0x450597?_0x450597['name']:'';if(_0x59c8c8)Window_SkillList['prototype'][_0x5d4661(0x3ea)][_0x5d4661(0x3e9)](this,_0x450597);Window_Base[_0x5d4661(0x125)][_0x5d4661(0x358)]['call'](this,_0x450597,_0x8f0540,_0x31ec6a,_0xf2709);if(_0x59c8c8)_0x450597[_0x5d4661(0x348)]=_0x1e438d;},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x3ca)]=function(){const _0x50298d=_0x2b9290;this[_0x50298d(0x5be)]={};if(!this[_0x50298d(0x4ae)])return;const _0x2c7d02=this['_item'][_0x50298d(0x327)];if(_0x2c7d02[_0x50298d(0x5c2)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){if(_0x50298d(0x544)===_0x50298d(0x544)){const _0x5ea704=String(RegExp['$1'])[_0x50298d(0x435)](/[\r\n]+/);for(const _0xf95c93 of _0x5ea704){if(_0xf95c93[_0x50298d(0x5c2)](/(.*):[ ](.*)/i)){const _0x476dc5=String(RegExp['$1'])['toUpperCase']()['trim'](),_0x15efc6=String(RegExp['$2'])['trim']();this[_0x50298d(0x5be)][_0x476dc5]=_0x15efc6;}}}else{const _0x1cec9a=_0x25b7c3['parse']('['+_0x10f429['$1']['match'](/\d+/g)+']');for(const _0x22a871 of _0x1cec9a){if(_0x328333[_0x50298d(0x5f9)](_0x22a871))return!![];}return![];}}},Window_ShopStatus['prototype']['itemDataFontSize']=function(){const _0x405b03=_0x2b9290;return Math[_0x405b03(0x224)](0x1,$gameSystem[_0x405b03(0x213)]()-0x4);},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0xe0)]=function(){const _0x4b6d32=_0x2b9290;Window_StatusBase[_0x4b6d32(0x125)][_0x4b6d32(0xe0)][_0x4b6d32(0x3e9)](this),this[_0x4b6d32(0x33b)][_0x4b6d32(0x5de)]=this[_0x4b6d32(0x5c8)]||this[_0x4b6d32(0x33b)][_0x4b6d32(0x5de)],this[_0x4b6d32(0x33b)]['textColor']=this[_0x4b6d32(0x558)]||this[_0x4b6d32(0x33b)]['textColor'];},Window_ShopStatus[_0x2b9290(0x125)]['fontSizeRatio']=function(){return this['contents']['fontSize']/$gameSystem['mainFontSize']();},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x16e)]=function(_0x2a6dd9,_0x9415f,_0x2e335a){const _0x2ab3ce=_0x2b9290,_0x2b7d59=ImageManager[_0x2ab3ce(0x147)]('IconSet'),_0x586929=ImageManager[_0x2ab3ce(0x1b5)],_0x40175=ImageManager[_0x2ab3ce(0x483)],_0x25bcfc=_0x2a6dd9%0x10*_0x586929,_0x415821=Math[_0x2ab3ce(0x5d8)](_0x2a6dd9/0x10)*_0x40175,_0x2d65b2=Math[_0x2ab3ce(0x26b)](_0x586929*this[_0x2ab3ce(0x409)]()),_0x3c1f22=Math[_0x2ab3ce(0x26b)](_0x40175*this['fontSizeRatio']());this[_0x2ab3ce(0x33b)][_0x2ab3ce(0x35b)](_0x2b7d59,_0x25bcfc,_0x415821,_0x586929,_0x40175,_0x9415f,_0x2e335a,_0x2d65b2,_0x3c1f22);},Window_ShopStatus[_0x2b9290(0x125)]['processDrawIcon']=function(_0x27e587,_0x47fc9d){const _0x7c94c=_0x2b9290;if(_0x47fc9d[_0x7c94c(0x535)]){if('eXolC'!==_0x7c94c(0x149))return _0x5876fa[_0x7c94c(0x2d3)][_0x7c94c(0x389)][_0x7c94c(0x23e)][_0x7c94c(0x18a)];else this[_0x7c94c(0x16e)](_0x27e587,_0x47fc9d['x'],_0x47fc9d['y']+0x2);}_0x47fc9d['x']+=Math[_0x7c94c(0x26b)](ImageManager[_0x7c94c(0x1b5)]*this[_0x7c94c(0x409)]());if(this[_0x7c94c(0x409)]()===0x1)_0x47fc9d['x']+=0x4;},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x42e)]=function(_0x34437f,_0x41da75,_0x4d3f56,_0x4b8c24,_0x257ae0,_0x5ecb15){const _0x118eda=_0x2b9290;_0x34437f=_0x34437f||'',_0x5ecb15=_0x5ecb15||_0x118eda(0x2e6),this['_resetFontSize']=this['itemDataFontSize'](),this[_0x118eda(0x558)]=_0x257ae0?ColorManager[_0x118eda(0x5c4)]():this[_0x118eda(0x33b)][_0x118eda(0x523)],_0x41da75+=this[_0x118eda(0x5e3)](),_0x4b8c24-=this[_0x118eda(0x5e3)]()*0x2;const _0x2dc3fb=this[_0x118eda(0x346)](_0x34437f);if(_0x5ecb15===_0x118eda(0x2ee))_0x41da75=_0x41da75+Math['floor']((_0x4b8c24-_0x2dc3fb[_0x118eda(0x4e0)])/0x2);else{if(_0x5ecb15===_0x118eda(0x5e9)){if(_0x118eda(0x45a)!==_0x118eda(0x4cd))_0x41da75=_0x41da75+_0x4b8c24-_0x2dc3fb['width'];else return _0x4c267c[_0x118eda(0x2d3)]['Settings'][_0x118eda(0x172)]['buttonAssistRemove'];}}_0x4d3f56+=(this[_0x118eda(0x625)]()-_0x2dc3fb[_0x118eda(0x419)])/0x2,this[_0x118eda(0x606)](_0x34437f,_0x41da75,_0x4d3f56,_0x4b8c24),this[_0x118eda(0x5c8)]=undefined,this[_0x118eda(0x558)]=undefined,this[_0x118eda(0xe0)]();},Window_ShopStatus[_0x2b9290(0x125)]['drawItemConsumable']=function(_0x1dd2e4,_0x214902,_0x37ab1b){const _0x1819a0=_0x2b9290;if(!DataManager['isItem'](this[_0x1819a0(0x4ae)]))return![];const _0x437827=this[_0x1819a0(0x441)]();this['drawItemKeyData'](_0x437827,_0x1dd2e4,_0x214902,_0x37ab1b,!![]);const _0x563bc9=this[_0x1819a0(0x5f6)]();return this[_0x1819a0(0x42e)](_0x563bc9,_0x1dd2e4,_0x214902,_0x37ab1b,![],_0x1819a0(0x5e9)),this[_0x1819a0(0x471)](_0x1dd2e4,_0x214902,_0x37ab1b),this[_0x1819a0(0xe0)](),!![];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x441)]=function(){const _0x40ce4f=_0x2b9290;return VisuMZ[_0x40ce4f(0x2d3)][_0x40ce4f(0x389)][_0x40ce4f(0x23e)][_0x40ce4f(0x27b)];},Window_ShopStatus[_0x2b9290(0x125)]['getItemConsumableText']=function(){const _0x145b6f=_0x2b9290,_0x2742e1='CONSUMABLE';if(this['_customItemInfo'][_0x2742e1])return this[_0x145b6f(0x5be)][_0x2742e1];return this['canConsumeItem']()?VisuMZ[_0x145b6f(0x2d3)][_0x145b6f(0x389)][_0x145b6f(0x23e)][_0x145b6f(0x4a8)]:VisuMZ[_0x145b6f(0x2d3)][_0x145b6f(0x389)]['StatusWindow'][_0x145b6f(0x5a4)];},Window_ShopStatus['prototype'][_0x2b9290(0x19b)]=function(){const _0x5c0f25=_0x2b9290;if(VisuMZ[_0x5c0f25(0x191)]&&VisuMZ['CoreEngine'][_0x5c0f25(0x389)]['QoL'][_0x5c0f25(0x258)]&&DataManager[_0x5c0f25(0xf4)](this[_0x5c0f25(0x4ae)])){if(_0x5c0f25(0x27c)==='dHBKu')return![];else{const _0x3ef5a2=_0x164044['makeDeepCopy'](_0x1f8310);_0x3ef5a2[_0x5c0f25(0x1bb)]=!![];const _0x16ac25=_0x3ef5a2[_0x5c0f25(0x1a2)](this[_0x5c0f25(0x4ae)]);_0x16ac25>=0x0&&_0x3ef5a2[_0x5c0f25(0x1e4)](_0x16ac25,this[_0x5c0f25(0x4ae)]),this[_0x5c0f25(0x1bb)]=_0x3ef5a2;}}else return this[_0x5c0f25(0x4ae)][_0x5c0f25(0x21d)];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x1ff)]=function(_0x353414,_0x14ce47,_0x2deb9e){const _0x348b07=_0x2b9290;if(!this[_0x348b07(0x47b)]()&&!DataManager[_0x348b07(0x3f0)](this['_item']))return![];if(DataManager['isKeyItem'](this[_0x348b07(0x4ae)])&&!$dataSystem[_0x348b07(0x48f)]){const _0x488c1b=TextManager[_0x348b07(0x247)];this['drawItemKeyData'](_0x488c1b,_0x353414,_0x14ce47,_0x2deb9e,!![],_0x348b07(0x2ee));}else{if('Xsgjl'===_0x348b07(0x33d)){const _0x4c4828=_0x348b07(0x251);if(this[_0x348b07(0x5be)][_0x4c4828])return this[_0x348b07(0x5be)][_0x4c4828];let _0x222ffe='';if(this[_0x348b07(0x2d5)]['rateHP']<0x0)_0x222ffe+=_0x348b07(0x576)[_0x348b07(0x46a)](_0x213333['floor'](this[_0x348b07(0x2d5)]['rateHP']*0x64));if(this[_0x348b07(0x2d5)][_0x348b07(0x5a0)]<0x0&&this[_0x348b07(0x2d5)][_0x348b07(0x223)]<0x0)_0x222ffe+='\x20';if(this['_itemData'][_0x348b07(0x223)]<0x0)_0x222ffe+='%1'[_0x348b07(0x46a)](this['_itemData'][_0x348b07(0x223)]);return _0x222ffe;}else{const _0x453e59=TextManager[_0x348b07(0x376)];this['drawItemKeyData'](_0x453e59,_0x353414,_0x14ce47,_0x2deb9e,!![]);const _0x242b99=this['getItemQuantityText']();this[_0x348b07(0x42e)](_0x242b99,_0x353414,_0x14ce47,_0x2deb9e,![],_0x348b07(0x5e9));}}return this['drawItemDarkRect'](_0x353414,_0x14ce47,_0x2deb9e),this[_0x348b07(0xe0)](),!![];},Window_ShopStatus[_0x2b9290(0x125)]['getItemQuantityText']=function(){const _0x3439e2=_0x2b9290,_0x159333=_0x3439e2(0x42c);if(this[_0x3439e2(0x5be)][_0x159333])return this[_0x3439e2(0x5be)][_0x159333];const _0x5c5121=VisuMZ[_0x3439e2(0x2d3)]['Settings'][_0x3439e2(0x38e)][_0x3439e2(0x2b5)];return _0x5c5121[_0x3439e2(0x46a)]($gameParty[_0x3439e2(0x2a2)](this[_0x3439e2(0x4ae)]));},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x1d7)]=function(_0x182baf,_0x7783f0,_0x9b7a42){const _0x36ad1f=_0x2b9290,_0x59acbd=this['getItemOccasionText']();return this['drawItemKeyData'](_0x59acbd,_0x182baf,_0x7783f0,_0x9b7a42,![],_0x36ad1f(0x2ee)),this[_0x36ad1f(0x471)](_0x182baf,_0x7783f0,_0x9b7a42),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x12e)]=function(){const _0x3f2dc5=_0x2b9290,_0x589839='OCCASION';if(this['_customItemInfo'][_0x589839])return this[_0x3f2dc5(0x5be)][_0x589839];const _0x417a54=VisuMZ[_0x3f2dc5(0x2d3)][_0x3f2dc5(0x389)][_0x3f2dc5(0x23e)],_0x43146d=_0x3f2dc5(0x382)['format'](this['_item'][_0x3f2dc5(0x10b)]);return _0x417a54[_0x43146d];},Window_ShopStatus['prototype'][_0x2b9290(0x5e7)]=function(_0xa79d3c,_0x493bba,_0x1be003){const _0x26216e=_0x2b9290,_0x343941=this['getItemScopeText']();return this[_0x26216e(0x42e)](_0x343941,_0xa79d3c,_0x493bba,_0x1be003,![],_0x26216e(0x2ee)),this['drawItemDarkRect'](_0xa79d3c,_0x493bba,_0x1be003),this[_0x26216e(0xe0)](),!![];},Window_ShopStatus[_0x2b9290(0x125)]['getItemScopeText']=function(){const _0x11e9bc=_0x2b9290,_0x52cad0=_0x11e9bc(0x20a);if(this[_0x11e9bc(0x5be)][_0x52cad0])return this[_0x11e9bc(0x5be)][_0x52cad0];const _0x52cb33=VisuMZ[_0x11e9bc(0x2d3)]['Settings'][_0x11e9bc(0x23e)];if(Imported[_0x11e9bc(0x19a)]){if(_0x11e9bc(0x413)===_0x11e9bc(0x414))return _0x34daef[_0x11e9bc(0x318)](_0x2a9ed1)&&_0x50861e['atypeId']===_0x54c6b9(_0x4f16c9['$1']);else{const _0x333b63=this[_0x11e9bc(0x4ae)][_0x11e9bc(0x327)];if(_0x333b63[_0x11e9bc(0x5c2)](/<TARGET:[ ](.*)>/i)){if(_0x11e9bc(0x5b9)!=='NQRkA')return![];else{const _0x2de118=String(RegExp['$1']);if(_0x2de118[_0x11e9bc(0x5c2)](/(\d+) RANDOM ANY/i)){if(_0x11e9bc(0x4b8)==='RMdfm')_0x48af36[_0x11e9bc(0x125)][_0x11e9bc(0x2e7)][_0x11e9bc(0x3e9)](this);else return _0x52cb33['ScopeRandomAny'][_0x11e9bc(0x46a)](Number(RegExp['$1']));}else{if(_0x2de118['match'](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x52cb33[_0x11e9bc(0x410)]['format'](Number(RegExp['$1']));else{if(_0x2de118['match'](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){if(_0x11e9bc(0x5dd)===_0x11e9bc(0x5dd))return _0x52cb33[_0x11e9bc(0x1da)]['format'](Number(RegExp['$1']));else _0xca4bb5[_0x11e9bc(0x2d3)][_0x11e9bc(0x3c2)]['call'](this),this['_statusWindow']&&this[_0x11e9bc(0x169)][_0x11e9bc(0x2dc)]===_0x134568&&this['_statusWindow'][_0x11e9bc(0x61a)](this[_0x11e9bc(0x4d3)]());}else{if(_0x2de118[_0x11e9bc(0x5c2)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i)){if(_0x11e9bc(0x262)===_0x11e9bc(0x420))this['onBuyCancelItemsEquipsCore']();else return _0x52cb33[_0x11e9bc(0x13d)];}}}}}}}}const _0x59b748='Scope%1'['format'](this[_0x11e9bc(0x4ae)]['scope']);return _0x52cb33[_0x59b748];},Window_ShopStatus[_0x2b9290(0x125)]['drawItemSpeed']=function(_0x482164,_0x3359d0,_0x3409c9){const _0x22b9e0=_0x2b9290,_0x1277fa=this[_0x22b9e0(0x4d4)]();this[_0x22b9e0(0x42e)](_0x1277fa,_0x482164,_0x3359d0,_0x3409c9,!![]);const _0x35fb8a=this[_0x22b9e0(0x2c3)]();return this[_0x22b9e0(0x42e)](_0x35fb8a,_0x482164,_0x3359d0,_0x3409c9,![],'right'),this[_0x22b9e0(0x471)](_0x482164,_0x3359d0,_0x3409c9),this[_0x22b9e0(0xe0)](),!![];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x4d4)]=function(){const _0x1d151c=_0x2b9290;return VisuMZ[_0x1d151c(0x2d3)][_0x1d151c(0x389)][_0x1d151c(0x23e)][_0x1d151c(0x1b4)];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x2c3)]=function(){const _0x1b2e37=_0x2b9290,_0x9ad5e8=_0x1b2e37(0x32f);if(this[_0x1b2e37(0x5be)][_0x9ad5e8])return this[_0x1b2e37(0x5be)][_0x9ad5e8];const _0x49a27b=this[_0x1b2e37(0x4ae)]['speed'];if(_0x49a27b>=0x7d0)return VisuMZ[_0x1b2e37(0x2d3)][_0x1b2e37(0x389)][_0x1b2e37(0x23e)][_0x1b2e37(0x5ac)];else{if(_0x49a27b>=0x3e8){if(_0x1b2e37(0x481)!=='iivgE')return VisuMZ[_0x1b2e37(0x2d3)]['Settings'][_0x1b2e37(0x23e)][_0x1b2e37(0x4bf)];else this[_0x1b2e37(0x229)]();}else{if(_0x49a27b>0x0)return VisuMZ[_0x1b2e37(0x2d3)][_0x1b2e37(0x389)][_0x1b2e37(0x23e)][_0x1b2e37(0x41a)];else{if(_0x49a27b===0x0){if(_0x1b2e37(0x167)===_0x1b2e37(0x450)){const _0x427ec8=this['_commandWindow']['y']+this[_0x1b2e37(0x4e1)]['height'],_0x22803b=_0x5d3187[_0x1b2e37(0x16a)]-this['statusWidth'](),_0x4c74f9=this[_0x1b2e37(0x2e7)]()?_0x14eb5a['boxWidth']-_0x22803b:0x0,_0x32d2ef=this[_0x1b2e37(0x60b)]()-this[_0x1b2e37(0x4e1)][_0x1b2e37(0x419)];return new _0x12ba1e(_0x4c74f9,_0x427ec8,_0x22803b,_0x32d2ef);}else return VisuMZ[_0x1b2e37(0x2d3)][_0x1b2e37(0x389)][_0x1b2e37(0x23e)]['Speed0'];}else{if(_0x49a27b>-0x3e8)return VisuMZ[_0x1b2e37(0x2d3)][_0x1b2e37(0x389)][_0x1b2e37(0x23e)][_0x1b2e37(0x3cc)];else{if(_0x49a27b>-0x7d0){if(_0x1b2e37(0x608)==='IEzvi'){const _0x307de0=_0x45ea4e[_0x1b2e37(0x2d3)][_0x1b2e37(0x53c)](this[_0x1b2e37(0x4bd)]||this[_0x1b2e37(0x329)]()[_0x1b2e37(0x342)]);if(_0x307de0[_0x1b2e37(0x40b)]>=0x2&&this['isDualWield']())_0x307de0[0x1]=0x1;return _0x307de0;}else return VisuMZ[_0x1b2e37(0x2d3)]['Settings'][_0x1b2e37(0x23e)][_0x1b2e37(0x541)];}else{if(_0x49a27b<=-0x7d0){if(_0x1b2e37(0x586)===_0x1b2e37(0x586))return VisuMZ[_0x1b2e37(0x2d3)][_0x1b2e37(0x389)]['StatusWindow']['SpeedNeg2000'];else _0x4da26e+=_0x46762a(_0x39dc12['$1']);}else return _0x1b2e37(0xec);}}}}}}},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x564)]=function(_0x5b0aa4,_0x14ba06,_0x536dc8){const _0x6a3121=_0x2b9290,_0x25f27a=this[_0x6a3121(0x116)]();this['drawItemKeyData'](_0x25f27a,_0x5b0aa4,_0x14ba06,_0x536dc8,!![]);const _0x59fcab=this[_0x6a3121(0x11a)]();return this[_0x6a3121(0x42e)](_0x59fcab,_0x5b0aa4,_0x14ba06,_0x536dc8,![],_0x6a3121(0x5e9)),this[_0x6a3121(0x471)](_0x5b0aa4,_0x14ba06,_0x536dc8),this[_0x6a3121(0xe0)](),!![];},Window_ShopStatus['prototype'][_0x2b9290(0x116)]=function(){const _0x3d22b0=_0x2b9290;return VisuMZ['ItemsEquipsCore'][_0x3d22b0(0x389)][_0x3d22b0(0x23e)][_0x3d22b0(0x18a)];},Window_ShopStatus[_0x2b9290(0x125)]['getItemSuccessRateText']=function(){const _0x10d3f0=_0x2b9290,_0xc9bbb0=_0x10d3f0(0x18c);if(this[_0x10d3f0(0x5be)][_0xc9bbb0])return this[_0x10d3f0(0x5be)][_0xc9bbb0];if(Imported[_0x10d3f0(0x19a)]){const _0xd6dcfb=this[_0x10d3f0(0x4ae)][_0x10d3f0(0x327)];if(_0xd6dcfb[_0x10d3f0(0x5c2)](/<ALWAYS HIT>/i))return _0x10d3f0(0x4f2);else{if(_0xd6dcfb[_0x10d3f0(0x5c2)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x10d3f0(0x576)[_0x10d3f0(0x46a)](Number(RegExp['$1']));}}return _0x10d3f0(0x576)[_0x10d3f0(0x46a)](this[_0x10d3f0(0x4ae)]['successRate']);},Window_ShopStatus['prototype'][_0x2b9290(0x183)]=function(_0x55bc0a,_0x425c77,_0x240cdb){const _0x3b583a=_0x2b9290,_0x1d5753=this[_0x3b583a(0x4a9)]();this[_0x3b583a(0x42e)](_0x1d5753,_0x55bc0a,_0x425c77,_0x240cdb,!![]);const _0x4668e8=this[_0x3b583a(0x5b4)]();return this[_0x3b583a(0x42e)](_0x4668e8,_0x55bc0a,_0x425c77,_0x240cdb,![],_0x3b583a(0x5e9)),this[_0x3b583a(0x471)](_0x55bc0a,_0x425c77,_0x240cdb),this[_0x3b583a(0xe0)](),!![];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x4a9)]=function(){return VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow']['LabelRepeats'];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x5b4)]=function(){const _0x14557f=_0x2b9290,_0x58d427=_0x14557f(0x548);if(this['_customItemInfo'][_0x58d427])return this[_0x14557f(0x5be)][_0x58d427];const _0x5d7788=_0x14557f(0x565);return _0x5d7788[_0x14557f(0x46a)](this['_item'][_0x14557f(0x638)]);},Window_ShopStatus[_0x2b9290(0x125)]['drawItemHitType']=function(_0x12ad64,_0x2922c6,_0x3f3657){const _0x385fff=_0x2b9290,_0x4fc288=this[_0x385fff(0x4f4)]();this[_0x385fff(0x42e)](_0x4fc288,_0x12ad64,_0x2922c6,_0x3f3657,!![]);const _0x333c03=this[_0x385fff(0x35d)]();return this[_0x385fff(0x42e)](_0x333c03,_0x12ad64,_0x2922c6,_0x3f3657,![],_0x385fff(0x5e9)),this[_0x385fff(0x471)](_0x12ad64,_0x2922c6,_0x3f3657),this[_0x385fff(0xe0)](),!![];},Window_ShopStatus['prototype'][_0x2b9290(0x4f4)]=function(){const _0x164c01=_0x2b9290;return VisuMZ[_0x164c01(0x2d3)][_0x164c01(0x389)][_0x164c01(0x23e)][_0x164c01(0x305)];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x35d)]=function(){const _0x590393=_0x2b9290,_0x2d6513=_0x590393(0x28a);if(this[_0x590393(0x5be)][_0x2d6513])return this[_0x590393(0x5be)][_0x2d6513];const _0x23bb29=VisuMZ[_0x590393(0x2d3)][_0x590393(0x389)][_0x590393(0x23e)],_0x1493e4='HitType%1'[_0x590393(0x46a)](this[_0x590393(0x4ae)][_0x590393(0x28c)]);return _0x23bb29[_0x1493e4];},Window_ShopStatus[_0x2b9290(0x125)]['drawItemDamage']=function(_0x2f007d,_0x4b0f6e,_0x247c44){const _0x2e9c1a=_0x2b9290;if(this[_0x2e9c1a(0x4ae)][_0x2e9c1a(0x25d)][_0x2e9c1a(0xf6)]<=0x0)return _0x4b0f6e;if(this['drawItemDamageElement'](_0x2f007d,_0x4b0f6e,_0x247c44))_0x4b0f6e+=this['lineHeight']();if(this[_0x2e9c1a(0x5c7)](_0x2f007d,_0x4b0f6e,_0x247c44))_0x4b0f6e+=this[_0x2e9c1a(0x625)]();return this['resetFontSettings'](),_0x4b0f6e;},Window_ShopStatus[_0x2b9290(0x125)]['drawItemDamageElement']=function(_0x5b0591,_0x26daff,_0x4207e0){const _0x5611a3=_0x2b9290,_0x331a83=this[_0x5611a3(0x155)]();this['drawItemKeyData'](_0x331a83,_0x5b0591,_0x26daff,_0x4207e0,!![]);const _0x2fbf6a=this['getItemDamageElementText']();return this[_0x5611a3(0x42e)](_0x2fbf6a,_0x5b0591,_0x26daff,_0x4207e0,![],_0x5611a3(0x5e9)),this['drawItemDarkRect'](_0x5b0591,_0x26daff,_0x4207e0),this[_0x5611a3(0xe0)](),!![];},Window_ShopStatus['prototype'][_0x2b9290(0x155)]=function(){const _0x1a81b5=_0x2b9290;return VisuMZ[_0x1a81b5(0x2d3)][_0x1a81b5(0x389)][_0x1a81b5(0x23e)][_0x1a81b5(0x1fa)];},Window_ShopStatus[_0x2b9290(0x125)]['getItemDamageElementText']=function(){const _0x2cf36f=_0x2b9290,_0x2ac7e8=_0x2cf36f(0x52e);if(this['_customItemInfo'][_0x2ac7e8])return this[_0x2cf36f(0x5be)][_0x2ac7e8];if(this[_0x2cf36f(0x4ae)][_0x2cf36f(0x25d)][_0x2cf36f(0x102)]<=-0x1)return VisuMZ['ItemsEquipsCore'][_0x2cf36f(0x389)][_0x2cf36f(0x23e)]['ElementWeapon'];else return this[_0x2cf36f(0x4ae)][_0x2cf36f(0x25d)]['elementId']===0x0?VisuMZ[_0x2cf36f(0x2d3)][_0x2cf36f(0x389)][_0x2cf36f(0x23e)][_0x2cf36f(0x3da)]:$dataSystem[_0x2cf36f(0x5eb)][this['_item']['damage'][_0x2cf36f(0x102)]];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x5c7)]=function(_0x219de3,_0x2f3d11,_0x1c7d61){const _0x449ea0=_0x2b9290,_0x1bb263=this[_0x449ea0(0x2aa)]();this[_0x449ea0(0x42e)](_0x1bb263,_0x219de3,_0x2f3d11,_0x1c7d61,!![]),this[_0x449ea0(0x221)]();const _0x3c05d8=this[_0x449ea0(0x242)](),_0x3c802b=ColorManager[_0x449ea0(0x54d)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x449ea0(0x4ae)][_0x449ea0(0x25d)][_0x449ea0(0xf6)]]);return this[_0x449ea0(0x594)](_0x3c802b),this[_0x449ea0(0x42e)](_0x3c05d8,_0x219de3,_0x2f3d11,_0x1c7d61,![],'right'),this[_0x449ea0(0x471)](_0x219de3,_0x2f3d11,_0x1c7d61),this[_0x449ea0(0xe0)](),!![];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x2aa)]=function(){const _0x4cf5ec=_0x2b9290;if(Imported[_0x4cf5ec(0x19a)]&&DataManager[_0x4cf5ec(0x1e9)](this['_item'])!=='MANUAL'){if(_0x4cf5ec(0x624)!==_0x4cf5ec(0x624)){_0x540b90[_0x4cf5ec(0x21c)]();const _0x169c89=_0x2b8b4c[_0x4cf5ec(0x37f)][_0x4cf5ec(0x114)];_0x169c89[_0x4cf5ec(0x46f)](this['index'](),null),this[_0x4cf5ec(0x2ef)](),this['_itemWindow'][_0x4cf5ec(0x2ef)](),this['callUpdateHelp']();const _0x522469=_0x59bdd3[_0x4cf5ec(0x37f)]['_statusWindow'];if(_0x522469)_0x522469[_0x4cf5ec(0x2ef)]();}else return this['getItemDamageAmountLabelBattleCore']();}else return this[_0x4cf5ec(0x506)]();},Window_ShopStatus['prototype'][_0x2b9290(0x506)]=function(){const _0x4fe4e6=_0x2b9290,_0x183cc7=VisuMZ['ItemsEquipsCore'][_0x4fe4e6(0x389)][_0x4fe4e6(0x23e)],_0x20acc8=_0x4fe4e6(0x225)[_0x4fe4e6(0x46a)](this['_item'][_0x4fe4e6(0x25d)][_0x4fe4e6(0xf6)]),_0x52fe97=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this['_item']['damage']['type']];return _0x183cc7[_0x20acc8]['format'](_0x52fe97);},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x221)]=function(){const _0xf1b5d4=_0x2b9290,_0x5855d4=$gameActors[_0xf1b5d4(0x484)](0x1);this[_0xf1b5d4(0x522)]=JsonEx[_0xf1b5d4(0x2cb)](_0x5855d4),this[_0xf1b5d4(0x590)]=JsonEx[_0xf1b5d4(0x2cb)](_0x5855d4);},Window_ShopStatus['prototype'][_0x2b9290(0x242)]=function(){const _0x56fdbb=_0x2b9290,_0x2169bd=_0x56fdbb(0x480);if(this[_0x56fdbb(0x5be)][_0x2169bd])return this[_0x56fdbb(0x5be)][_0x2169bd];return Imported[_0x56fdbb(0x19a)]&&DataManager[_0x56fdbb(0x1e9)](this[_0x56fdbb(0x4ae)])!==_0x56fdbb(0x252)?this[_0x56fdbb(0x57e)]():this[_0x56fdbb(0x5c9)]();},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x5c9)]=function(){const _0x24dae7=_0x2b9290;window['a']=this[_0x24dae7(0x522)],window['b']=this[_0x24dae7(0x590)],this['_tempActorA'][_0x24dae7(0x1ee)](!![]),this[_0x24dae7(0x590)]['setShopStatusWindowMode']([0x3,0x4][_0x24dae7(0x57b)](this[_0x24dae7(0x4ae)]['damage'][_0x24dae7(0xf6)]));let _0x4b7758=this[_0x24dae7(0x4ae)]['damage'][_0x24dae7(0x2e0)];try{const _0x386ee5=Math[_0x24dae7(0x224)](eval(_0x4b7758),0x0)/window['a'][_0x24dae7(0x205)];this['revertGlobalNamespaceVariables']();if(isNaN(_0x386ee5)){if('GQsYY'!==_0x24dae7(0x3b0))return'?????';else{if(_0xa01574)_0x271267+=_0x43dfac[_0x24dae7(0x517)][_0x5c80a3];}}else{if('cmYfA'==='ufxPH'){const _0x5c23da=/^\d+$/[_0x24dae7(0x4c9)](_0xd96471);let _0x54b83e=0x0;_0x5c23da?_0x54b83e=_0x4c331b(_0x4da9a3):_0x54b83e=this['getEtypeIdWithName'](_0x341008),_0x54b83e>0x1&&this[_0x24dae7(0x630)][_0x3c5b8b['id']][_0x24dae7(0x52d)](_0x54b83e);}else return _0x24dae7(0x576)['format'](Math[_0x24dae7(0xf7)](_0x386ee5*0x64));}}catch(_0x3ae523){return $gameTemp['isPlaytest']()&&(console[_0x24dae7(0x542)](_0x24dae7(0x109)['format'](this['_item'][_0x24dae7(0x348)])),console[_0x24dae7(0x542)](_0x3ae523)),this[_0x24dae7(0x339)](),'?????';}},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x339)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x5f8)]=function(_0x2ee7ac,_0x575c19,_0x48701d){const _0x47f333=_0x2b9290;if(!this['makeItemData']())return _0x575c19;if(this[_0x47f333(0x569)](_0x2ee7ac,_0x575c19,_0x48701d))_0x575c19+=this[_0x47f333(0x625)]();if(this[_0x47f333(0x4b6)](_0x2ee7ac,_0x575c19,_0x48701d))_0x575c19+=this[_0x47f333(0x625)]();if(this[_0x47f333(0x341)](_0x2ee7ac,_0x575c19,_0x48701d))_0x575c19+=this['lineHeight']();if(this[_0x47f333(0x350)](_0x2ee7ac,_0x575c19,_0x48701d))_0x575c19+=this[_0x47f333(0x625)]();if(this['drawItemEffectsMpDamage'](_0x2ee7ac,_0x575c19,_0x48701d))_0x575c19+=this[_0x47f333(0x625)]();if(this[_0x47f333(0x605)](_0x2ee7ac,_0x575c19,_0x48701d))_0x575c19+=this[_0x47f333(0x625)]();if(this[_0x47f333(0x632)](_0x2ee7ac,_0x575c19,_0x48701d))_0x575c19+=this[_0x47f333(0x625)]();if(this[_0x47f333(0x232)](_0x2ee7ac,_0x575c19,_0x48701d))_0x575c19+=this[_0x47f333(0x625)]();if(this[_0x47f333(0x3eb)](_0x2ee7ac,_0x575c19,_0x48701d))_0x575c19+=this[_0x47f333(0x625)]();return this[_0x47f333(0xe0)](),_0x575c19;},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x631)]=function(){const _0x42dc18=_0x2b9290;return this[_0x42dc18(0x4ae)][_0x42dc18(0x2a6)];},Window_ShopStatus['prototype'][_0x2b9290(0x5bb)]=function(){const _0x414d2b=_0x2b9290;let _0x4903a1=![];this['_itemData']={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0x41c844=this[_0x414d2b(0x631)]();for(const _0x2edc1b of _0x41c844){switch(_0x2edc1b[_0x414d2b(0x10e)]){case Game_Action['EFFECT_RECOVER_HP']:this[_0x414d2b(0x2d5)][_0x414d2b(0x5a0)]+=_0x2edc1b['value1'],this[_0x414d2b(0x2d5)][_0x414d2b(0x223)]+=_0x2edc1b[_0x414d2b(0x50e)],_0x4903a1=!![];break;case Game_Action[_0x414d2b(0x580)]:this[_0x414d2b(0x2d5)]['rateMP']+=_0x2edc1b['value1'],this[_0x414d2b(0x2d5)][_0x414d2b(0x503)]+=_0x2edc1b[_0x414d2b(0x50e)],_0x4903a1=!![];break;case Game_Action[_0x414d2b(0x46b)]:this[_0x414d2b(0x2d5)]['gainTP']+=_0x2edc1b[_0x414d2b(0x30e)],_0x4903a1=!![];break;case Game_Action[_0x414d2b(0x2fa)]:this[_0x414d2b(0x2d5)][_0x414d2b(0x336)][_0x414d2b(0x52d)](_0x2edc1b[_0x414d2b(0x5d6)]),_0x4903a1=!![];break;case Game_Action[_0x414d2b(0x291)]:this['_itemData'][_0x414d2b(0x3b5)][_0x414d2b(0x52d)](_0x2edc1b[_0x414d2b(0x5d6)]),this[_0x414d2b(0x2d5)][_0x414d2b(0x579)]=!![],_0x4903a1=!![];break;case Game_Action[_0x414d2b(0x13a)]:this['_itemData'][_0x414d2b(0x326)][_0x2edc1b[_0x414d2b(0x5d6)]]+=0x1,_0x4903a1=!![];break;case Game_Action[_0x414d2b(0x4fd)]:this[_0x414d2b(0x2d5)][_0x414d2b(0x326)][_0x2edc1b[_0x414d2b(0x5d6)]]-=0x1,_0x4903a1=!![];break;case Game_Action[_0x414d2b(0x1a3)]:this[_0x414d2b(0x2d5)][_0x414d2b(0x593)][_0x414d2b(0x52d)](_0x2edc1b[_0x414d2b(0x5d6)]),this[_0x414d2b(0x2d5)][_0x414d2b(0x579)]=!![],_0x4903a1=!![];break;case Game_Action['EFFECT_REMOVE_DEBUFF']:this[_0x414d2b(0x2d5)][_0x414d2b(0x492)][_0x414d2b(0x52d)](_0x2edc1b[_0x414d2b(0x5d6)]),this[_0x414d2b(0x2d5)][_0x414d2b(0x579)]=!![],_0x4903a1=!![];break;}}if(this[_0x414d2b(0x2d5)][_0x414d2b(0x336)]['length']>0x0)this[_0x414d2b(0x2d5)][_0x414d2b(0x226)]=!![];for(let _0x13fcfb=0x0;_0x13fcfb<this[_0x414d2b(0x2d5)][_0x414d2b(0x326)][_0x414d2b(0x40b)];_0x13fcfb++){if(this['_itemData'][_0x414d2b(0x326)][_0x13fcfb]!==0x0)this['_itemData'][_0x414d2b(0x226)]=!![];}if(this['_item'][_0x414d2b(0x5af)]!==0x0){if(_0x414d2b(0x171)===_0x414d2b(0x171))this[_0x414d2b(0x2d5)][_0x414d2b(0x5ba)]=this[_0x414d2b(0x4ae)]['tpGain'],_0x4903a1=!![];else return _0x2fbd09[_0x414d2b(0x2d3)][_0x414d2b(0x389)][_0x414d2b(0x172)][_0x414d2b(0x4be)];}const _0x1b248f=[_0x414d2b(0x293),_0x414d2b(0x2b0),'TP\x20RECOVERY',_0x414d2b(0x251),_0x414d2b(0x460),_0x414d2b(0x182),_0x414d2b(0x502),_0x414d2b(0x5d9),'REMOVED\x20EFFECTS'];for(const _0x439050 of _0x1b248f){if(this[_0x414d2b(0x5be)][_0x439050]){if(_0x414d2b(0x2a3)==='dQLFZ')_0x17fecf['prototype'][_0x414d2b(0x2e7)][_0x414d2b(0x3e9)](this);else{_0x4903a1=!![];break;}}}return _0x4903a1;},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x569)]=function(_0x504459,_0x390be1,_0x3fd5bd){const _0x4c6901=_0x2b9290,_0x4eed37=_0x4c6901(0x293);if(this[_0x4c6901(0x2d5)]['rateHP']<=0x0&&this[_0x4c6901(0x2d5)][_0x4c6901(0x223)]<=0x0&&!this[_0x4c6901(0x5be)][_0x4eed37])return![];const _0x595645=this[_0x4c6901(0x141)]();this[_0x4c6901(0x42e)](_0x595645,_0x504459,_0x390be1,_0x3fd5bd,!![]);const _0x383799=this['getItemEffectsHpRecoveryText']();return this[_0x4c6901(0x594)](ColorManager[_0x4c6901(0x54d)](0x1)),this[_0x4c6901(0x42e)](_0x383799,_0x504459,_0x390be1,_0x3fd5bd,![],'right'),this[_0x4c6901(0x471)](_0x504459,_0x390be1,_0x3fd5bd),this[_0x4c6901(0xe0)](),!![];},Window_ShopStatus[_0x2b9290(0x125)]['getItemEffectsHpRecoveryLabel']=function(){const _0x1f7298=_0x2b9290,_0x42e720=VisuMZ['ItemsEquipsCore'][_0x1f7298(0x389)]['StatusWindow']['LabelRecoverHP'];return _0x42e720[_0x1f7298(0x46a)](TextManager['hp']);},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x4a2)]=function(){const _0x38c56b=_0x2b9290,_0x55c3ba='HP\x20RECOVERY';if(this['_customItemInfo'][_0x55c3ba])return this[_0x38c56b(0x5be)][_0x55c3ba];let _0x6608a9='';if(this[_0x38c56b(0x2d5)][_0x38c56b(0x5a0)]>0x0)_0x6608a9+='+%1%'[_0x38c56b(0x46a)](Math[_0x38c56b(0x5d8)](this[_0x38c56b(0x2d5)][_0x38c56b(0x5a0)]*0x64));if(this[_0x38c56b(0x2d5)][_0x38c56b(0x5a0)]>0x0&&this[_0x38c56b(0x2d5)][_0x38c56b(0x223)]>0x0)_0x6608a9+='\x20';if(this['_itemData'][_0x38c56b(0x223)]>0x0)_0x6608a9+=_0x38c56b(0x334)[_0x38c56b(0x46a)](this[_0x38c56b(0x2d5)]['flatHP']);return _0x6608a9;},Window_ShopStatus[_0x2b9290(0x125)]['drawItemEffectsMpRecovery']=function(_0x104382,_0x525c20,_0x454c10){const _0x5b1dc7=_0x2b9290,_0x2e950e=_0x5b1dc7(0x2b0);if(this[_0x5b1dc7(0x2d5)][_0x5b1dc7(0x407)]<=0x0&&this['_itemData'][_0x5b1dc7(0x503)]<=0x0&&!this[_0x5b1dc7(0x5be)][_0x2e950e])return![];const _0x22734c=this[_0x5b1dc7(0x545)]();this['drawItemKeyData'](_0x22734c,_0x104382,_0x525c20,_0x454c10,!![]);const _0x53b894=this[_0x5b1dc7(0x3bc)]();return this['changeTextColor'](ColorManager[_0x5b1dc7(0x54d)](0x3)),this[_0x5b1dc7(0x42e)](_0x53b894,_0x104382,_0x525c20,_0x454c10,![],'right'),this[_0x5b1dc7(0x471)](_0x104382,_0x525c20,_0x454c10),this[_0x5b1dc7(0xe0)](),!![];},Window_ShopStatus['prototype'][_0x2b9290(0x545)]=function(){const _0x1c0747=_0x2b9290,_0x3e2cd8=VisuMZ[_0x1c0747(0x2d3)][_0x1c0747(0x389)][_0x1c0747(0x23e)]['LabelRecoverMP'];return _0x3e2cd8['format'](TextManager['mp']);},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x3bc)]=function(){const _0x5c0021=_0x2b9290,_0x214d4f=_0x5c0021(0x2b0);if(this[_0x5c0021(0x5be)][_0x214d4f])return this[_0x5c0021(0x5be)][_0x214d4f];let _0x1fce4b='';if(this[_0x5c0021(0x2d5)][_0x5c0021(0x407)]>0x0)_0x1fce4b+=_0x5c0021(0x216)[_0x5c0021(0x46a)](Math[_0x5c0021(0x5d8)](this['_itemData'][_0x5c0021(0x407)]*0x64));if(this[_0x5c0021(0x2d5)][_0x5c0021(0x407)]>0x0&&this[_0x5c0021(0x2d5)]['flatMP']>0x0)_0x1fce4b+='\x20';if(this['_itemData'][_0x5c0021(0x503)]>0x0)_0x1fce4b+=_0x5c0021(0x334)['format'](this['_itemData'][_0x5c0021(0x503)]);return _0x1fce4b;},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x341)]=function(_0x34e96f,_0x192946,_0x5c381e){const _0x5d548c=_0x2b9290,_0x29996f='TP\x20RECOVERY';if(this['_itemData'][_0x5d548c(0x551)]<=0x0&&!this[_0x5d548c(0x5be)][_0x29996f])return![];const _0x519b90=this['getItemEffectsTpRecoveryLabel']();this[_0x5d548c(0x42e)](_0x519b90,_0x34e96f,_0x192946,_0x5c381e,!![]);const _0x36745d=this[_0x5d548c(0x495)]();return this[_0x5d548c(0x594)](ColorManager[_0x5d548c(0x234)]()),this[_0x5d548c(0x42e)](_0x36745d,_0x34e96f,_0x192946,_0x5c381e,![],_0x5d548c(0x5e9)),this[_0x5d548c(0x471)](_0x34e96f,_0x192946,_0x5c381e),this[_0x5d548c(0xe0)](),!![];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x467)]=function(){const _0x8cee72=_0x2b9290,_0x54b114=VisuMZ[_0x8cee72(0x2d3)][_0x8cee72(0x389)]['StatusWindow'][_0x8cee72(0x446)];return _0x54b114[_0x8cee72(0x46a)](TextManager['tp']);},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x495)]=function(){const _0x11ea64=_0x2b9290,_0x224e77='TP\x20RECOVERY';if(this[_0x11ea64(0x5be)][_0x224e77])return this[_0x11ea64(0x5be)][_0x224e77];let _0xd0513f='';return _0xd0513f+='+%1'[_0x11ea64(0x46a)](this[_0x11ea64(0x2d5)][_0x11ea64(0x551)]),_0xd0513f;},Window_ShopStatus[_0x2b9290(0x125)]['drawItemEffectsSelfTpGain']=function(_0x2c8b7d,_0x5ce05a,_0x4899b4){const _0x4da6cb=_0x2b9290,_0xfff4fc='USER\x20TP\x20GAIN';if(this[_0x4da6cb(0x2d5)][_0x4da6cb(0x5ba)]===0x0&&!this['_customItemInfo'][_0xfff4fc])return![];const _0x18a999=this['getItemEffectsSelfTpGainLabel']();this[_0x4da6cb(0x42e)](_0x18a999,_0x2c8b7d,_0x5ce05a,_0x4899b4,!![]);const _0x50ce18=this[_0x4da6cb(0x178)]();if(this[_0x4da6cb(0x2d5)]['selfTP']>0x0){if('xpeoM'!==_0x4da6cb(0x3f2))this[_0x4da6cb(0x594)](ColorManager['powerUpColor']());else{const _0x72c405=this['categoryStyleCheck'](_0x2708c1);if(_0x72c405===_0x4da6cb(0x43b))this[_0x4da6cb(0x51e)](_0x5763c9);else _0x72c405===_0x4da6cb(0x3bb)?this[_0x4da6cb(0x256)](_0x34cf62):_0x430063[_0x4da6cb(0x125)]['drawItem'][_0x4da6cb(0x3e9)](this,_0x4b8185);}}else this[_0x4da6cb(0x594)](ColorManager['powerDownColor']());return this[_0x4da6cb(0x42e)](_0x50ce18,_0x2c8b7d,_0x5ce05a,_0x4899b4,![],'right'),this[_0x4da6cb(0x471)](_0x2c8b7d,_0x5ce05a,_0x4899b4),this[_0x4da6cb(0xe0)](),!![];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x59e)]=function(){const _0x1d4ef5=_0x2b9290,_0x5d5cfb=VisuMZ[_0x1d4ef5(0x2d3)]['Settings']['StatusWindow'][_0x1d4ef5(0x5db)];return _0x5d5cfb[_0x1d4ef5(0x46a)](TextManager['tp']);},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x178)]=function(){const _0x421df9=_0x2b9290,_0x1ed86b='USER\x20TP\x20GAIN';if(this[_0x421df9(0x5be)][_0x1ed86b])return this[_0x421df9(0x5be)][_0x1ed86b];let _0xbdaa9a='';if(this['_itemData'][_0x421df9(0x5ba)]>0x0){if(_0x421df9(0x29a)===_0x421df9(0x29a))_0xbdaa9a+=_0x421df9(0x334)[_0x421df9(0x46a)](this['_itemData'][_0x421df9(0x5ba)]);else return _0x22fe49[_0x421df9(0x191)][_0x421df9(0x389)][_0x421df9(0x431)][_0x421df9(0x337)];}else _0xbdaa9a+='%1'[_0x421df9(0x46a)](this[_0x421df9(0x2d5)][_0x421df9(0x5ba)]);return _0xbdaa9a;},Window_ShopStatus[_0x2b9290(0x125)]['drawItemEffectsHpDamage']=function(_0x5c9948,_0xdf2fde,_0x4d79ed){const _0x2c8099=_0x2b9290,_0x3ef9f5=_0x2c8099(0x251);if(this[_0x2c8099(0x2d5)][_0x2c8099(0x5a0)]>=0x0&&this['_itemData']['flatHP']>=0x0&&!this[_0x2c8099(0x5be)][_0x3ef9f5])return![];const _0x279a9a=this[_0x2c8099(0x1d8)]();this[_0x2c8099(0x42e)](_0x279a9a,_0x5c9948,_0xdf2fde,_0x4d79ed,!![]);const _0x311ff8=this[_0x2c8099(0x315)]();return this[_0x2c8099(0x594)](ColorManager[_0x2c8099(0x54d)](0x0)),this[_0x2c8099(0x42e)](_0x311ff8,_0x5c9948,_0xdf2fde,_0x4d79ed,![],_0x2c8099(0x5e9)),this[_0x2c8099(0x471)](_0x5c9948,_0xdf2fde,_0x4d79ed),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x1d8)]=function(){const _0x3ca578=_0x2b9290,_0x2509c9=VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'][_0x3ca578(0x53b)];return _0x2509c9[_0x3ca578(0x46a)](TextManager['hp']);},Window_ShopStatus['prototype'][_0x2b9290(0x315)]=function(){const _0x167f97=_0x2b9290,_0x406c05=_0x167f97(0x251);if(this[_0x167f97(0x5be)][_0x406c05])return this[_0x167f97(0x5be)][_0x406c05];let _0x292004='';if(this[_0x167f97(0x2d5)][_0x167f97(0x5a0)]<0x0)_0x292004+='%1%'['format'](Math['floor'](this[_0x167f97(0x2d5)]['rateHP']*0x64));if(this[_0x167f97(0x2d5)][_0x167f97(0x5a0)]<0x0&&this[_0x167f97(0x2d5)][_0x167f97(0x223)]<0x0)_0x292004+='\x20';if(this[_0x167f97(0x2d5)][_0x167f97(0x223)]<0x0)_0x292004+='%1'[_0x167f97(0x46a)](this[_0x167f97(0x2d5)][_0x167f97(0x223)]);return _0x292004;},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x245)]=function(_0x4d5f05,_0x2a85ae,_0x28be68){const _0x27130d=_0x2b9290,_0x563023='MP\x20DAMAGE';if(this[_0x27130d(0x2d5)][_0x27130d(0x407)]>=0x0&&this[_0x27130d(0x2d5)][_0x27130d(0x503)]>=0x0&&!this[_0x27130d(0x5be)][_0x563023])return![];const _0x1b0a25=this[_0x27130d(0x249)]();this[_0x27130d(0x42e)](_0x1b0a25,_0x4d5f05,_0x2a85ae,_0x28be68,!![]);const _0x5866db=this['getItemEffectsMpDamageText']();return this['changeTextColor'](ColorManager[_0x27130d(0x54d)](0x2)),this[_0x27130d(0x42e)](_0x5866db,_0x4d5f05,_0x2a85ae,_0x28be68,![],'right'),this[_0x27130d(0x471)](_0x4d5f05,_0x2a85ae,_0x28be68),this[_0x27130d(0xe0)](),!![];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x249)]=function(){const _0x4a732b=_0x2b9290,_0x6822cc=VisuMZ[_0x4a732b(0x2d3)]['Settings'][_0x4a732b(0x23e)][_0x4a732b(0x2b1)];return _0x6822cc['format'](TextManager['mp']);},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0xfb)]=function(){const _0x433cc2=_0x2b9290,_0x2b6635=_0x433cc2(0x460);if(this[_0x433cc2(0x5be)][_0x2b6635])return this[_0x433cc2(0x5be)][_0x2b6635];let _0x5101ca='';if(this['_itemData'][_0x433cc2(0x407)]<0x0)_0x5101ca+=_0x433cc2(0x576)[_0x433cc2(0x46a)](Math[_0x433cc2(0x5d8)](this[_0x433cc2(0x2d5)][_0x433cc2(0x407)]*0x64));if(this[_0x433cc2(0x2d5)][_0x433cc2(0x407)]<0x0&&this['_itemData']['flatMP']<0x0)_0x5101ca+='\x20';if(this[_0x433cc2(0x2d5)][_0x433cc2(0x503)]<0x0)_0x5101ca+='%1'[_0x433cc2(0x46a)](this[_0x433cc2(0x2d5)][_0x433cc2(0x503)]);return _0x5101ca;},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x605)]=function(_0x2d5de0,_0x3efcd9,_0x3495ec){const _0x473855=_0x2b9290,_0x16bbfd=_0x473855(0x182);if(this[_0x473855(0x2d5)][_0x473855(0x551)]>=0x0&&!this[_0x473855(0x5be)][_0x16bbfd])return![];const _0x23e61a=this[_0x473855(0x499)]();this['drawItemKeyData'](_0x23e61a,_0x2d5de0,_0x3efcd9,_0x3495ec,!![]);const _0x4d4759=this[_0x473855(0x22f)]();return this[_0x473855(0x594)](ColorManager[_0x473855(0x524)]()),this[_0x473855(0x42e)](_0x4d4759,_0x2d5de0,_0x3efcd9,_0x3495ec,![],_0x473855(0x5e9)),this[_0x473855(0x471)](_0x2d5de0,_0x3efcd9,_0x3495ec),this[_0x473855(0xe0)](),!![];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x499)]=function(){const _0x3e142c=_0x2b9290,_0x40f7db=VisuMZ[_0x3e142c(0x2d3)][_0x3e142c(0x389)][_0x3e142c(0x23e)][_0x3e142c(0x42d)];return _0x40f7db[_0x3e142c(0x46a)](TextManager['tp']);},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x22f)]=function(){const _0x4c78f2=_0x2b9290,_0x2e3f44=_0x4c78f2(0x182);if(this[_0x4c78f2(0x5be)][_0x2e3f44])return this[_0x4c78f2(0x5be)][_0x2e3f44];let _0x40a8b6='';return _0x40a8b6+='%1'[_0x4c78f2(0x46a)](this[_0x4c78f2(0x2d5)][_0x4c78f2(0x551)]),_0x40a8b6;},Window_ShopStatus[_0x2b9290(0x125)]['drawItemEffectsAddedStatesBuffs']=function(_0x548b1a,_0x6a2331,_0x29831e){const _0x1bcfb5=_0x2b9290,_0x22420a='ADDED\x20EFFECTS';if(!this[_0x1bcfb5(0x2d5)][_0x1bcfb5(0x226)]&&!this['_customItemInfo'][_0x22420a])return![];const _0x62c4b1=this[_0x1bcfb5(0x1ed)]();this[_0x1bcfb5(0x42e)](_0x62c4b1,_0x548b1a,_0x6a2331,_0x29831e,!![]);const _0x76ae58=this[_0x1bcfb5(0x1ef)]();return this[_0x1bcfb5(0x42e)](_0x76ae58,_0x548b1a,_0x6a2331,_0x29831e,![],_0x1bcfb5(0x5e9)),this[_0x1bcfb5(0x471)](_0x548b1a,_0x6a2331,_0x29831e),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x1ed)]=function(){const _0x537418=_0x2b9290;return VisuMZ[_0x537418(0x2d3)][_0x537418(0x389)][_0x537418(0x23e)][_0x537418(0x2c5)];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x1ef)]=function(){const _0x453854=_0x2b9290,_0x26b091=_0x453854(0x5d9);if(this[_0x453854(0x5be)][_0x26b091])return this[_0x453854(0x5be)][_0x26b091];let _0x5c0b3d='',_0x3d8604=0x0;const _0x157e75=0x8;for(const _0x588bf6 of this[_0x453854(0x2d5)][_0x453854(0x336)]){if(_0x453854(0x4b9)!=='BalVe'){const _0x557874=this[_0x453854(0x342)]();for(let _0x298c50=0x0;_0x298c50<_0x557874[_0x453854(0x40b)];_0x298c50++){if(!this['_equips'][_0x298c50])this[_0x453854(0x33c)][_0x298c50]=new _0xde7240();}this[_0x453854(0x119)](![]),this['refresh']();}else{const _0x1c8326=$dataStates[_0x588bf6];if(_0x1c8326&&_0x1c8326[_0x453854(0x13b)]>0x0){_0x5c0b3d+=_0x453854(0x3fa)['format'](_0x1c8326['iconIndex']),_0x3d8604++;if(_0x3d8604>=_0x157e75)return _0x5c0b3d;}}}for(let _0x196f52=0x0;_0x196f52<this[_0x453854(0x2d5)][_0x453854(0x326)][_0x453854(0x40b)];_0x196f52++){if('vujkM'!==_0x453854(0x277)){const _0x4695e2=this[_0x453854(0x2d5)][_0x453854(0x326)][_0x196f52],_0x1c0699=Game_BattlerBase[_0x453854(0x125)][_0x453854(0x48b)](_0x4695e2,_0x196f52);if(_0x1c0699>0x0){if(_0x453854(0x1eb)!==_0x453854(0x1eb))return this[_0x453854(0x4e9)]()?this[_0x453854(0x2f0)]():_0x3b46d7[_0x453854(0x2d3)][_0x453854(0x389)]['ItemScene'][_0x453854(0x261)]['call'](this);else{_0x5c0b3d+='\x5cI[%1]'['format'](_0x1c0699),_0x3d8604++;if(_0x3d8604>=_0x157e75)return _0x5c0b3d;}}}else _0xdd7da3[_0x453854(0x125)][_0x453854(0x185)][_0x453854(0x3e9)](this),this[_0x453854(0x280)][_0x453854(0x1b2)](this[_0x453854(0x2f5)]());}return _0x5c0b3d;},Window_ShopStatus[_0x2b9290(0x125)]['drawItemEffectsRemovedStatesBuffs']=function(_0x2e274a,_0x568fb6,_0x1664f9){const _0x746bec=_0x2b9290,_0x1f1120=_0x746bec(0x46c);if(!this[_0x746bec(0x2d5)]['removeStateBuffChanges']&&!this[_0x746bec(0x5be)][_0x1f1120])return![];const _0x56643a=this[_0x746bec(0x36c)]();this[_0x746bec(0x42e)](_0x56643a,_0x2e274a,_0x568fb6,_0x1664f9,!![]);const _0x3f257c=this[_0x746bec(0x540)]();return this['drawItemKeyData'](_0x3f257c,_0x2e274a,_0x568fb6,_0x1664f9,![],_0x746bec(0x5e9)),this[_0x746bec(0x471)](_0x2e274a,_0x568fb6,_0x1664f9),this[_0x746bec(0xe0)](),!![];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x36c)]=function(){const _0x35e817=_0x2b9290;return VisuMZ[_0x35e817(0x2d3)][_0x35e817(0x389)][_0x35e817(0x23e)][_0x35e817(0x40c)];},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x540)]=function(){const _0x3b0afc=_0x2b9290,_0x1c7529=_0x3b0afc(0x46c);if(this[_0x3b0afc(0x5be)][_0x1c7529])return this['_customItemInfo'][_0x1c7529];let _0x1fc0b2='',_0x18c08b=0x0;const _0x5a302c=VisuMZ[_0x3b0afc(0x2d3)][_0x3b0afc(0x389)]['StatusWindow'][_0x3b0afc(0x61f)];for(const _0x3ccfa3 of this[_0x3b0afc(0x2d5)]['removeState']){const _0x151eb8=$dataStates[_0x3ccfa3];if(_0x151eb8&&_0x151eb8[_0x3b0afc(0x13b)]>0x0){_0x1fc0b2+=_0x3b0afc(0x3fa)[_0x3b0afc(0x46a)](_0x151eb8['iconIndex']),_0x18c08b++;if(_0x18c08b>=_0x5a302c)return _0x1fc0b2;}}for(let _0x35a447=0x0;_0x35a447<this['_itemData']['removeBuff']['length'];_0x35a447++){if('TmZHp'===_0x3b0afc(0x3e4)){const _0x724012=_0x20c4b4(_0x882a1['$1'])[_0x3b0afc(0x435)](/[\r\n]+/);for(const _0x5cb396 of _0x724012){const _0x2cd97d=_0x51f655[_0x3b0afc(0x31f)](_0x5cb396[_0x3b0afc(0x3a6)]());if(_0x2cd97d>0x0)_0x38f21e[_0x3b0afc(0x342)][_0x3b0afc(0x52d)](_0x2cd97d);}}else{const _0x5ce676=this[_0x3b0afc(0x2d5)][_0x3b0afc(0x593)][_0x35a447],_0x4a0a23=Game_BattlerBase[_0x3b0afc(0x125)][_0x3b0afc(0x48b)](0x1,_0x5ce676);if(_0x4a0a23>0x0){if(_0x3b0afc(0x566)!==_0x3b0afc(0x142)){_0x1fc0b2+='\x5cI[%1]'['format'](_0x4a0a23),_0x18c08b++;if(_0x18c08b>=_0x5a302c)return _0x1fc0b2;}else _0x43d7eb=_0x3b0afc(0x4c6)['format'](_0x4b8788['id']);}}}for(let _0x1a6173=0x0;_0x1a6173<this[_0x3b0afc(0x2d5)][_0x3b0afc(0x492)][_0x3b0afc(0x40b)];_0x1a6173++){if(_0x3b0afc(0x289)!==_0x3b0afc(0x289))this[_0x3b0afc(0x41e)]();else{const _0x4d2f67=this[_0x3b0afc(0x2d5)][_0x3b0afc(0x492)][_0x1a6173],_0x58d686=Game_BattlerBase['prototype'][_0x3b0afc(0x48b)](-0x1,_0x4d2f67);if(_0x58d686>0x0){if(_0x3b0afc(0x2c2)===_0x3b0afc(0x5a9))this[_0x3b0afc(0x606)](_0x24f8dc,_0x185444['x']+_0x4a092f[_0x3b0afc(0x4e0)]-_0x1311a7,_0x4daa70['y'],_0x41904f);else{_0x1fc0b2+=_0x3b0afc(0x3fa)[_0x3b0afc(0x46a)](_0x58d686),_0x18c08b++;if(_0x18c08b>=_0x5a302c)return _0x1fc0b2;}}}}return _0x1fc0b2;},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x3b4)]=function(_0x16efd0,_0x12f5ef,_0x281532){const _0x4a8e13=_0x2b9290;if(this['_item'][_0x4a8e13(0x327)][_0x4a8e13(0x5c2)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){if('zzgon'==='zzgon'){const _0x48819d=String(RegExp['$1'])[_0x4a8e13(0x435)](/[\r\n]+/);for(const _0x1a9beb of _0x48819d){if(_0x1a9beb['match'](/(.*):[ ](.*)/i)){const _0x34a476=String(RegExp['$1'])[_0x4a8e13(0x3a6)](),_0x33c2a7=String(RegExp['$2'])[_0x4a8e13(0x3a6)]();this['drawItemCustomEntryLine'](_0x34a476,_0x33c2a7,_0x16efd0,_0x12f5ef,_0x281532),_0x12f5ef+=this[_0x4a8e13(0x625)]();}}}else this[_0x4a8e13(0x442)]={},this[_0x4a8e13(0x30a)]=0xff,this[_0x4a8e13(0x4bb)]=_0x2b8c5b[_0x4a8e13(0x2d3)][_0x4a8e13(0x389)][_0x4a8e13(0x553)][_0x4a8e13(0x411)],this['_newLabelOpacityUpperLimit']=_0x24b3f1[_0x4a8e13(0x2d3)]['Settings'][_0x4a8e13(0x553)][_0x4a8e13(0x150)];}return this[_0x4a8e13(0xe0)](),_0x12f5ef;},Window_ShopStatus[_0x2b9290(0x125)][_0x2b9290(0x616)]=function(_0x15ad95,_0x17c416,_0x1c69cd,_0x3448d0,_0x39a91e){const _0x1c9153=_0x2b9290;this['drawItemKeyData'](_0x15ad95,_0x1c69cd,_0x3448d0,_0x39a91e,!![]),this[_0x1c9153(0x42e)](_0x17c416,_0x1c69cd,_0x3448d0,_0x39a91e,![],_0x1c9153(0x5e9)),this[_0x1c9153(0x471)](_0x1c69cd,_0x3448d0,_0x39a91e),this['resetFontSettings']();},Window_ShopStatus['prototype'][_0x2b9290(0x41c)]=function(){const _0x540a81=_0x2b9290;if(!this[_0x540a81(0x4ae)])return;const _0x3d9584=this['_item'][_0x540a81(0x327)],_0x5e79b6=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x4422dc=_0x3d9584[_0x540a81(0x5c2)](_0x5e79b6);if(_0x4422dc)for(const _0x8ff965 of _0x4422dc){if('vlCnf'!==_0x540a81(0x184))_0x214b98=_0x105feb['CoreEngine'][_0x540a81(0x389)][_0x540a81(0x431)][_0x540a81(0x337)];else{_0x8ff965[_0x540a81(0x5c2)](_0x5e79b6);const _0x3cf370=String(RegExp['$1'])[_0x540a81(0x3a6)]()||'';if(_0x3cf370==='')continue;const _0x23252d=ImageManager['loadPicture'](_0x3cf370);_0x23252d[_0x540a81(0x2fe)](this[_0x540a81(0x2d7)]['bind'](this,_0x23252d,this['_item']));}}},Window_ShopStatus['prototype'][_0x2b9290(0x2d7)]=function(_0x1a2b1f,_0x5c7213){const _0x249ed6=_0x2b9290;if(this[_0x249ed6(0x4ae)]!==_0x5c7213)return;if(!_0x1a2b1f)return;if(_0x1a2b1f[_0x249ed6(0x4e0)]<=0x0||_0x1a2b1f['height']<=0x0)return;const _0x428892=_0x5c7213[_0x249ed6(0x327)];let _0x4b50f7=_0x249ed6(0x1b8);if(_0x428892['match'](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)){if(_0x249ed6(0x2a5)!==_0x249ed6(0x5f7))_0x4b50f7=_0x249ed6(0x52f);else{const _0x5b3f2a=_0x33eb1a[_0x249ed6(0x327)];if(_0x5b3f2a[_0x249ed6(0x5c2)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x2ed7f5=_0x36c5c9(_0x3344a8['$1']);try{_0x5c8b34(_0x2ed7f5);}catch(_0x46baa0){if(_0x42a897[_0x249ed6(0x238)]())_0x46ac09[_0x249ed6(0x542)](_0x46baa0);}}_0x23cbee=_0x565ba1[_0x249ed6(0x2d3)][_0x249ed6(0x389)]['ShopScene'][_0x249ed6(0x1b6)][_0x249ed6(0x3e9)](this,_0x14326a,_0x4eca3a);if(_0x2bef84(_0x2f447e))_0x1978e5=0x0;return _0x51549d[_0x249ed6(0x5d8)](_0x5d819f);}}const _0x534a77=_0x4b50f7===_0x249ed6(0x1b8)?this[_0x249ed6(0x488)]:this[_0x249ed6(0x33b)];let _0x145ac0=this[_0x249ed6(0x596)],_0x2cacaa=this['innerHeight'];_0x428892['match'](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)&&(_0x145ac0=Number(RegExp['$1']));_0x428892['match'](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&('xLymG'!==_0x249ed6(0x3cd)?_0x2cacaa=Number(RegExp['$1']):this[_0x249ed6(0x387)][_0x249ed6(0x362)]()>=0x0?(_0x51bd61[_0x249ed6(0x2d3)][_0x249ed6(0x126)]['call'](this),this['onSlotOkAutoSelect']()):(this[_0x249ed6(0x387)]['smoothSelect'](0x0),this['_slotWindow'][_0x249ed6(0x62e)]()));if(_0x428892[_0x249ed6(0x5c2)](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)){if(_0x249ed6(0x615)==='OqGQV'){const _0x2b03f6=_0x4dc664(_0x57200e['$1'])||0x1;if(_0x17be62>=_0x2b03f6)return!![];}else _0x145ac0=Number(RegExp['$1']),_0x2cacaa=Number(RegExp['$2']);}const _0x5e81a0=Math[_0x249ed6(0x550)](0x1,_0x145ac0/_0x1a2b1f[_0x249ed6(0x4e0)],_0x2cacaa/_0x1a2b1f[_0x249ed6(0x419)]);let _0x54c57c=0x0,_0xf1036b=0x0,_0x1bce5b=Math[_0x249ed6(0x5d8)](_0x1a2b1f[_0x249ed6(0x4e0)]*_0x5e81a0),_0x33097f=Math[_0x249ed6(0x5d8)](_0x1a2b1f[_0x249ed6(0x419)]*_0x5e81a0),_0x18252e=_0x249ed6(0x2ee);_0x428892[_0x249ed6(0x5c2)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)&&(_0x18252e=String(RegExp['$1'])[_0x249ed6(0x2f6)]()['trim']());if(_0x18252e==='left')_0x249ed6(0x4ca)===_0x249ed6(0x4ca)?_0x54c57c=0x0:(_0x4e795f[_0x249ed6(0x518)]('pagedown')&&_0x2d0013[_0x249ed6(0x570)](_0x249ed6(0x4cf))&&this[_0x249ed6(0x134)](),_0x31775b[_0x249ed6(0x518)]('pageup')&&_0x5ec518[_0x249ed6(0x570)](_0x249ed6(0x4cf))&&this[_0x249ed6(0x41e)]());else _0x18252e==='center'?_0x54c57c=Math[_0x249ed6(0xf7)]((this[_0x249ed6(0x596)]-_0x1bce5b)/0x2):_0x54c57c=this[_0x249ed6(0x596)]-_0x1bce5b;let _0x4095fa='middle';if(_0x428892[_0x249ed6(0x5c2)](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)){if(_0x249ed6(0x369)===_0x249ed6(0x443)){let _0x49a654=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];return _0x19c840['VisuMZ_0_CoreEngine']&&(_0x49a654=_0x54f184[_0x249ed6(0x191)][_0x249ed6(0x389)][_0x249ed6(0x431)][_0x249ed6(0x337)]),_0x49a654=_0x49a654[_0x249ed6(0x5ec)](_0x5d6ce9=>typeof _0x5d6ce9===_0x249ed6(0x32b)?_0x5d6ce9:_0x5d6ce9[_0x249ed6(0x32c)]()[_0x249ed6(0x3a6)]()),_0x49a654;}else _0x4095fa=String(RegExp['$1'])[_0x249ed6(0x2f6)]()[_0x249ed6(0x3a6)]();}if(_0x4095fa===_0x249ed6(0x391))_0xf1036b=0x0;else{if(_0x4095fa===_0x249ed6(0x2d1)){if(_0x249ed6(0x135)!==_0x249ed6(0x135)){if(_0x57e6a1>=0x0)_0x52a0d3===this[_0x249ed6(0x362)]()&&(this[_0x249ed6(0x609)]=!![]),this[_0x249ed6(0x62e)](),this[_0x249ed6(0x560)](_0x239f02);else _0x581484[_0x249ed6(0x511)]()>=0x0&&(this[_0x249ed6(0x5d1)](),this['deselect']());}else _0xf1036b=Math[_0x249ed6(0xf7)]((this[_0x249ed6(0x4a4)]-_0x33097f)/0x2);}else _0xf1036b=this['innerHeight']-_0x33097f;}_0x428892['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x54c57c+=Number(RegExp['$1']));_0x428892[_0x249ed6(0x5c2)](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0xf1036b+=Number(RegExp['$1']));_0x428892[_0x249ed6(0x5c2)](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)&&('ClGSY'===_0x249ed6(0x2bc)?(_0x54c57c+=Number(RegExp['$1']),_0xf1036b+=Number(RegExp['$2'])):this[_0x249ed6(0x4bb)]*=-0x1);let _0x6f16aa=0xff;if(_0x428892[_0x249ed6(0x5c2)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i))_0x6f16aa=Number(RegExp['$1']);else{if(_0x428892[_0x249ed6(0x5c2)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)){if(_0x249ed6(0x38f)===_0x249ed6(0x38f))_0x6f16aa=Math[_0x249ed6(0xf7)](Number(RegExp['$1'])*0.01*0xff)[_0x249ed6(0x5b3)](0x0,0xff);else{const _0x467bd3=this[_0x249ed6(0x4d4)]();this[_0x249ed6(0x42e)](_0x467bd3,_0x59b5d1,_0x12118a,_0x1f808a,!![]);const _0x369562=this[_0x249ed6(0x2c3)]();return this['drawItemKeyData'](_0x369562,_0x32d571,_0x5529d9,_0x231d47,![],_0x249ed6(0x5e9)),this['drawItemDarkRect'](_0x11ff0b,_0x5ed1af,_0x3807c7),this[_0x249ed6(0xe0)](),!![];}}}_0x534a77[_0x249ed6(0x5aa)]=_0x6f16aa,_0x534a77[_0x249ed6(0x35b)](_0x1a2b1f,0x0,0x0,_0x1a2b1f['width'],_0x1a2b1f[_0x249ed6(0x419)],_0x54c57c,_0xf1036b,_0x1bce5b,_0x33097f),_0x534a77[_0x249ed6(0x5aa)]=0xff;},VisuMZ[_0x2b9290(0x2d3)][_0x2b9290(0x53c)]=function(_0xdaa3cd){const _0x333753=_0x2b9290;if(_0xdaa3cd===null||typeof _0xdaa3cd!==_0x333753(0x396))return _0xdaa3cd;const _0x4b7fae=Array['isArray'](_0xdaa3cd)?[]:Object[_0x333753(0x530)](Object[_0x333753(0x34c)](_0xdaa3cd));for(const _0x157131 in _0xdaa3cd){Object[_0x333753(0x125)][_0x333753(0x5ef)][_0x333753(0x3e9)](_0xdaa3cd,_0x157131)&&(_0x4b7fae[_0x157131]=typeof _0xdaa3cd[_0x157131]===_0x333753(0x396)&&_0xdaa3cd[_0x157131]!==null?VisuMZ[_0x333753(0x2d3)]['deepCopy'](_0xdaa3cd[_0x157131]):_0xdaa3cd[_0x157131]);}return _0x4b7fae;};