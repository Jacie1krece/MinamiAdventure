//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.51;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.51] [ItemsEquipsCore]
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
 * <Cursed>
 * 
 * - Used for: Weapon, Armor Notetags
 * - If this weapon or armor is equipped, it cannot manually be removed by the
 *   player until it is purified.
 * - To remove it, it must be done by event commands, script calls, or through
 *   the Purify-related Plugin Commands provided by this plugin.
 * - Once purified, the weapon or armor will become unequipped unless it has a
 *   purify transformation.
 *   - If the newly transformed weapon/armor is equippable, it will remain in
 *     the actor's equipment slots.
 * - If you are using VisuMZ_2_WeaponSwapSystem, weapons cannot become cursed
 *   in order to allow free weapon swapping. Weaponry will not be cursed
 *   if VisuMZ_2_WeaponSwapSystem is installed.
 * 
 * ---
 * 
 * <Purify Transform: id>
 * <Purify Transform: name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - If this notetag is present on a <Cursed> weapon or armor, then upon the
 *   actor receiving purification, the weapon or armor will transform into a
 *   different item.
 * - Replace 'id' with a number representing the transformed weapon/armor's ID.
 * - Replace 'name' with text representing the transformed weapon/armor's name.
 * - Weapons can only transform into weapons.
 * - Armors can only transform into armors.
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
 * === Purify Plugin Commands ===
 * 
 * ---
 * 
 * Purify: Target Actor(s)
 * - Purifies target actor(s) of any cursed weapons or armors.
 * - Cannot be used in battle.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 * ---
 * 
 * Purify: Whole Party
 * - Purifies whole party of any cursed weapons or armors.
 * - Cannot be used in battle.
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
 *   Cursed Equip Popup:
 *   - Text popup appears when an actor equips a cursed weapon/armor.
 *   - Text codes allowed.
 *   - Requires VisuMZ_0_CoreEngine!
 *   - Empty to not use.
 *   -  %1 - Actor, %2 - Equip, %3 - Icon.
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
 * Version 1.51: December 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where if an item is unequipped, it may cause a crash. Fix
 *    made by Arisu.
 * ** Fixed a bug where <Proxy: id> did not properly give the proxy item. Fix
 *    made by Arisu.
 * 
 * Version 1.50: November 16, 2023
 * * Bug Fixes!
 * ** <JS Buy Price> and <JS Sell Price> was not working properly. Fix made
 *    by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Cursed>
 * **** If this weapon or armor is equipped, it cannot manually be removed by
 *      the player until it is purified.
 * **** To remove it, it must be done by event commands, script calls, or
 *     through the Purify-related Plugin Commands provided by this plugin.
 * **** Once purified, the weapon or armor will become unequipped unless it has
 *     a purify transformation.
 * **** If the newly transformed weapon/armor is equippable, it will remain in
 *     the actor's equipment slots.
 * **** If you are using VisuMZ_2_WeaponSwapSystem, weapons cannot become
 *      cursed in order to allow free weapon swapping. Weaponry will not be
 *      cursed if VisuMZ_2_WeaponSwapSystem is installed.
 * *** <Purify Transform: id>
 * *** <Purify Transform: name>
 * **** If this notetag is present on a <Cursed> weapon or armor, then upon the
 *      actor receiving purification, the weapon or armor will transform into a
 *      different item.
 * ** New Plugin Commands added by Arisu:
 * *** Purify: Target Actor(s)
 * **** Purifies target actor(s) of any cursed weapons or armors.
 * *** Purify: Whole Party
 * **** Purifies whole party of any cursed weapons or armors.
 * ** Added "Cursed Equip Popup" to Equip Scene Plugin Parameters.
 * *** Text popup appears when an actor equips a cursed weapon/armor.
 * ** Added "Ally or Enemy" or "Enemy or Ally" scopes to Shop Status Window
 *    Plugin Parameters.
 * *** If unused, will default to "1 Ally" or "1 Enemy" like usual.
 *     Added by Irina.
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
 * @command Separator_Purify
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PurifyActors
 * @text Purify: Target Actor(s)
 * @desc Purifies target actor(s) of any cursed weapons or armors.
 * Cannot be used in battle.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PurifyParty
 * @text Purify: Whole Party
 * @desc Purifies whole party of any cursed weapons or armors.
 * Cannot be used in battle.
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
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","CursedTextPopup:json":"\"%1 is cursed by %3%2!\"","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","equipCmdDesc:json":"\"Pick and choose equipment to change.\"","CommandAddOptimize:eval":"true","optimizeCmdDesc:json":"\"Equip the strongest available equipment.\"","CmdIconOptimize:num":"137","CommandAddClear:eval":"true","clearCmdDesc:json":"\"Remove all available equipment.\"","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
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
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","EquipDelayMS:num":"240","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","ScopeAllyOrEnemy:str":"Ally/Enemy","ScopeEnemyOrAlly:str":"Enemy/Ally","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
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
 * @param CursedTextPopup:json
 * @text Cursed Equip Popup
 * @parent General
 * @type note
 * @desc %1 - Actor, %2 - Equip, %3 - Icon. Text codes allowed.
 * Requires VisuMZ_0_CoreEngine! Empty to not use.
 * @default "%1 is cursed by %3%2!"
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
 * @param ScopeAllyOrEnemy:str
 * @text Ally or Enemy
 * @parent BattleCore
 * @desc Vocabulary used for <Target: Ally or Enemy> notetag.
 * @default Ally/Enemy
 *
 * @param ScopeEnemyOrAlly:str
 * @text Enemy or Ally
 * @parent BattleCore
 * @desc Vocabulary used for <Target: Enemy or Ally> notetag.
 * @default Enemy/Ally
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

const _0x26e348=_0xb358;function _0x2356(){const _0xb62d3f=['KdGDw','Scene_Load_reloadMapIfUpdated','WdlWs','smoothScrollTo','sellWindowRectItemsEquipsCore','createCommandWindow','bOZnF','activateItemWindow','mainAreaBottom','Scene_Shop_create','modifiedBuyPriceItemsEquipsCore','CommandAddClear','resetFontSettings','isGoodShown','Blacklist','UThMs','VisuMZ_1_BattleCore','Window_ItemList_colSpacing','cursorDown','NoChangeMarker','qSeWN','drawItemCost','buttonAssistText3','loadPicture','Scene_Equip_slotWindowRect','object','weapon','lZXnq','actorParams','fontSizeRatio','refreshActorEquipSlotsIfUpdated','consumeItem','placeNewLabel','Parse_Notetags_EquipSlots','UZNRd','refreshItemsEquipsCoreNoMenuImage','armorTypes','troopArtifacts','isEquipAtypeOk','CmdStyle','CzOwW','removeStateBuffChanges','powerUpColor','VsAEB','TmoqQ','sgBhQ','getItemEffectsTpRecoveryText','ConvertNumberToString','log','drawItemEffectsTpRecovery','auto','lvekD','xgjqS','itemLineRect','WjqZH','_tempActor','drawItemEquipType','itemDataFontSize','YhvTo','version','uDzej','hide','pEslj','bQXQr','QoL','getWeaponIdWithName','nzEyJ','Scene_Shop_commandSell','RFBDB','cursorPageup','EukSu','ORPdH','_itemWindow','armor-%1','onTouchOk','consumable','Vplhv','Scene_Item_itemWindowRect','opacity','onMenuImageLoad','Scene_Shop_buyingPrice','FadeLimit','Ggyha','GEeFd','Window_ShopBuy_refresh','FEKcT','pjhOJ','Scene_Shop_activateSellWindow','getItemQuantityText','commandNameWindowDrawText','Nonconsumable','Scene_Shop_onSellCancel','DNtHH','#%1','some','getItemDamageAmountTextBattleCore','onBuyCancelItemsEquipsCore','Equip\x20the\x20strongest\x20available\x20equipment.','SetupProxyItemGroup','OKfXn','atypeId','addShopTrackingItemBuy','ARRAYNUM','uYvKQ','LabelHitType','Game_Actor_changeEquip','HitType%1','changeEquipBase','Speed2000','purifyCursedEquips','categoryStyleCheck','QpbnC','setHelpWindowItem','allowShiftScrolling','SellPriceRate','onTouchCancel','getSkillIdWithName','Scene_Shop_numberWindowRect','getItemSuccessRateLabel','uiMenuStyle','Parse_Notetags_ParamValues','csgRX','ryBod','JSON','_getClassRequirements','rnKYk','CmdIconClear','resetShopSwitches','Categories','TP\x20RECOVERY','LabelConsume','DZLFg','eFIxn','JdJWE','commandEquip','create','PrUQv','Window_ItemCategory_setItemWindow','concat','DrawPortraitJS','Scene_Shop_commandWindowRect','drawItemDarkRect','buttonAssistText2','_skillIDs','bind','scEFf','Window_ShopSell_isEnabled','isOptimizeCommandAdded','drawItemDamageElement','Scope7','KvlSY','flatHP','isProxyItem','gainItem','rJBHX','qXues','WEAPON','NUM','iBbgw','WoHUK','40320410eCtqPd','processShopCondListingOnBuyItem','ScopeAllyOrEnemy','MP\x20DAMAGE','Scene_Shop_prepare','Consumable','XxATJ','ItemSceneAdjustItemList','AsYbo','aQBSQ','Game_Actor_artifact','makeDeepCopy','ovlQy','createSellWindow','contentsBack','Scene_Equip_createCommandWindow','okEBi','jYRuS','call','buffIconIndex','item-%1','addSellCommand','_doubleTouch','getPrototypeOf','isCancelled','TP\x20DAMAGE','refreshActor','itemWindowRectItemsEquipsCore','ollZw','_tempActorB','commandStyle','toUpperCase','isEquipCommandAdded','VisuMZ_1_SkillsStatesCore','activateSellWindow','ConvertParams','anyEmptyEquipSlotsOfSameEtype','khIqd','meetsClassRequirements','value1','YfONd','getInputButtonString','getItemEffectsRemovedStatesBuffsLabel','dataId','vUlXn','splice','ceil','vmnST','partyArtifactIDs','drawItemSuccessRate','onCategoryOk','tradeItemWithParty','HiddenItemA','mpRate','slotWindowRect','right','GGzzu','rateHP','Scene_Shop_sellingPrice','isBottomHelpMode','Step2Start','qouEc','LWGCU','setHelpWindow','Translucent','drawItemStyleIconText','ZiJSX','FontColor','drawItemEffectsMpDamage','drawItemCustomEntryLine','QniCr','mhYKu','def','isRepeated','wtypeId','gainTP','Scene_Shop_doSell','Window_ShopBuy_item','nUZog','weaponTypes','drawParamName','VatIr','_slotId','LabelRecoverHP','dPupY','addCommand','NiYGH','canUse','Window_EquipItem_includes','onSlotOkAutoSelect','HP\x20DAMAGE','Wbrzk','setHandler','loadCharacter','Step3Start','LUK','every','isLearnedSkill','Scene_Equip_commandWindowRect','paramId','processCursorHomeEndTrigger','pagedown','Game_Party_numItems','MwAmY','paramPlusItemsEquipsCoreCustomJS','setHp','isPlaytest','cursorRight','DAMAGE\x20MULTIPLIER','paintOpacity','newLabelEnabled','ItemQuantityFontSize','traitObjects','getItemDamageElementLabel','isPressed','_commandWindow','baseSellingPrice','WwiUg','vqOat','getItemSpeedText','meetsEquipRequirement','revertGlobalNamespaceVariables','azWyE','start','MBhvJ','onSlotCancel','drawItemStyleIcon','QHfCM','addShopTrackingItem','getItemConsumableText','smoothSelect','geFEH','floor','Scene_Equip_createSlotWindow','(+%1)','_resetFontColor','equipSlotIndex','MenuPortraits','pimef','ArIiI','isEquipTypeSealed','Damage\x20Formula\x20Error\x20for\x20%1','_shopStatusMenuMode','_equips','weapon-%1','PXfuJ','ItemScene','drawItemName','paramJS','VPSLo','checkItemConditionsSwitchNotetags','Game_Party_consumeItem','CooKo','LabelSelfGainTP','includes','level','Scene_ItemBase_activateItemWindow','pop','drawParamText','selfTP','DWpZv','OnyKY','getItemEffectsMpDamageText','ERZOy','processCursorMoveModernControls','pNGhf','Game_Party_gainItem','releaseUnequippableItems','drawCurrencyValue','BorderRegExp','prepare','Scene_Shop_sellWindowRect','isWeapon','getItemSpeedLabel','REPEAT','AGI','Icon','createNewLabelSprite','calcWindowHeight','onBuyItem','Game_Item_setObject','upxRa','Scene_Shop_createCategoryWindow','currentExt','CONSUMABLE','rkgzh','getEtypeIDs','getItemConsumableLabel','constructor','luk','ItemMenuStatusRect','ShiftShortcutKey','mkiWC','numberWindowRect','REMOVED\x20EFFECTS','drawActorParamDifference','CmdIconOptimize','Parse_Notetags_Category','Window_ShopBuy_goodsToItem','shift','RIVfz','clamp','zeRIC','isEquipChangeOk','getItemEffectsTpRecoveryLabel','Scene_Shop_doBuy','Scene_Item_categoryWindowRect','drawItemNumber','Enable','fyAGy','maxCols','translucentOpacity','DPAvZ','CannotEquipMarker','createStatusWindow','NonOptimizeETypes','DrawIcons','getPurifyTransformation','split','allowCreateStatusWindow','getItemColor','IYguE','_shopStatusMenuAlly','ActorResetEquipSlots','EuSDH','getItemEffectsHpDamageText','pageup','categoryNameWindowDrawText','setObject','scope','DNXhQ','onBuyOk','goodsToItem','forceChangeEquipSlots','sDOgy','addItemCategory','systemColor','toLowerCase','drawItem','XmSdN','ZALzC','LabelRemove','RemoveEquipIcon','elements','resetTextColor','isStackableArtifact','SpeedNeg1999','WZXiJ','show','ShowShopStatus','onTouchSelectModernControls','buttonAssistKey3','prepareNewEquipSlotsOnLoad','EquipAdjustHpMp','StatusWindow','ParamValueFontSize','vIBDD','UciIt','DrawBackRect','bestEquipItem','updateChangedSlots','playBuzzerSound','mdf','damageColor','LPgdD','HZEhX','getItemEffectsHpDamageLabel','agi','drawText','textSizeEx','wjPXQ','_purchaseOnly','Scene_Shop_onBuyOk','Game_Enemy_traitObjects_artifact','InJDB','Window_ItemList_maxCols','drawNewLabelIcon','isSellCommandEnabled','aEDQQ','values','Scene_Equip_itemWindowRect','addState','buttonAssistLargeIncrement','Window_ItemCategory_initialize','IncludeShopItem','_allowArtifactTraitObjects','Settings','initialize','getItemEffectsAddedStatesBuffsLabel','isArtifact','top','processShopCondListingOnSellItem','SpeedNeg999','isClicked','getEtypeIDsCache','getItemEffectsHpRecoveryLabel','%1%','DlVHF','pJPjt','onSellOk','EVAL','helpWindowRect','VisuMZ_1_MainMenuCore','CmdIconBuy','setupBattleTestItems','updateCommandNameWindow','_bypassNewLabel','commandNameWindowCenter','_itemIDs','CZaed','WqgSB','icon','setShopStatusWindowMode','FLekD','XPcUG','_cache_etypeIDs','drawItemScope','jUHyx','isArray','createSlotWindow','buttonAssistKey1','Game_Actor_forceChangeEquip','Scene_Shop_statusWindowRect','DrawEquipData','getItemDamageAmountLabelBattleCore','isClearCommandEnabled','A%1','switchProxyItem','statusWindowRect','random','BuyPriceJS','Game_Party_setupBattleTestItems_artifact','_scrollDuration','SellTurnSwitchOn','ActorChangeEquipSlots','Parse_Notetags_Batch','gkKEF','MaxMP','EQUIP_DELAY_MS','vrufc','mainAreaTop','_forcedSlots','onActorChange','clear','paramValueByName','csbVS','YkWBH','_allowArtifactParamBase','sblpM','LBKev','getShopTrackingData','PAvGM','Scope%1','isMainMenuCoreMenuImageOptionAvailable','Game_Actor_equips_artifacts','iAjvc','MP\x20RECOVERY','×%1','Scene_Boot_onDatabaseLoaded','return\x200','LRWDx','makeCommandList','JrCLF','isClearCommandAdded','LabelSpeed','isOpenAndActive','dHKGL','ShopMenuStatusStandard','itemAt','tpGain','windowPadding','itemWindowRect','OtOTf','setItemDelay','updateSmoothScroll','AllArmors','description','Game_Party_gainItem_artifact','boxWidth','Game_Actor_isEquipChangeOk','buttonAssistKey2','isEnabled','slotWindowRectItemsEquipsCore','_money','NotConsumable','unRhS','getItemEffectsMpRecoveryText','determineBaseSellingPrice','blt','clearNewItem','BackRectColor','etypeId','VPZSn','\x5cI[%1]%2','AlreadyEquipMarker','getItemEffectsAddedStatesBuffsText','setTopRow','possession','ParseItemNotetags','qjoFm','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','getNextAvailableEtypeId','replace','KvKGl','push','fontSize','fSmbb','bDFSB','canEquip','+%1','RuQro','FcCrK','Game_Actor_tradeItemWithParty','isShiftShortcutKeyForRemove','_armorIDs','Parse_Notetags_ParamJS','drawRemoveItem','isPartyArtifact','Window_ShopCommand_initialize','adjustHiddenShownGoods','ExtDisplayedParams','buttonAssistText1','OyiUX','getItemsEquipsCoreBackColor1','mRLbM','param','USER\x20TP\x20GAIN','isRightInputMode','hwcOu','hIhRp','getItemIdWithName','match','WQpNY','Window_Selectable_initialize','100%','drawItemQuantity','MaxArmors','width','GUmgm','bitmap','Scene_Shop_buyWindowRect','getItemEffectsRemovedStatesBuffsText','BcxuS','_list','EquipParams','_newLabelOpacityUpperLimit','LlRLg','RshFX','Style','AllItems','value2','wIsKp','\x5cI[%1]','CRhOv','drawTextEx','eyomz','PcUQF','update','Scene_Item_createCategoryWindow','popScene','cursorLeft','items','Ytcrk','XrpZT','equip','addBuyCommand','xHNnc','13428hRrQAT','Step3End','_bypassReleaseUnequippableItemsItemsEquipsCore','isOptimizeEquipOk','Scene_Shop_onCategoryCancel','geUpdatedLayoutStatusWidth','pfcDp','isEquipCommandEnabled','getClassRequirements','innerWidth','isKeyItem','1BvsJBl','itypeId','onCategoryCancel','isItem','processDrawIcon','helpWindowRectItemsEquipsCore','buyWindowRectItemsEquipsCore','IMKeh','isSkill','optimizeEquipments','wxKMo','isNewItem','onSlotOk','Scene_Equip_onSlotCancel','AoyCn','Whitelist','adjustItemWidthByStatus','drawItemHitType','getShopTrackingGoldBuy','loop','fjGrK','updatedLayoutStyle','initShopTrackingData','numberWindowRectItemsEquipsCore','gWeZC','postCreateCategoryWindowItemsEquipsCore','keyItem','price','drawUpdatedAfterParamValue','getDamageStyle','_dummyWindow','HideAllSwitches','Scene_Item_createItemWindow','rateMP','isPurifyItemSwapOk','tInTM','QstpE','yyBXt','MaxWeapons','wpaBj','getItemsEquipsCoreBackColor2','alterSkillName','gold','_scene','addChild','isOpen','cYBIs','equips','AXnci','SwitchBuy','GGbtR','commandNameWindowDrawBackground','members','drawUpdatedBeforeParamValue','processHandling','drawItemEffectsHpDamage','HoCpo','ParseWeaponNotetags','proxyItem','ShopListingRegExp','ARRAYSTRUCT','initEquips','buttonAssistRemove','SUCCESS\x20RATE','paramchangeTextColor','kqEKb','EwQOF','flatMP','napvu','category','Scene_Shop_createSellWindow','getColor','Scene_Shop_goldWindowRect','changeTextColor','DEF','activate','updateNewLabelOpacity','Scene_Equip_helpWindowRect','filter','buttonAssistItemListRequirement','getItemDamageAmountText','ParseArmorNotetags','JeRev','helpAreaHeight','_buyWindow','getItemEffectsSelfTpGainText','getEmptyEquipSlotOfSameEtype','LabelRepeats','FontFace','714jiCAcI','powerDownColor','DamageType%1','onSellItem','setMp','Step1End','_paramPlus','isTroopArtifact','cFrYK','postCreateItemsEquipsCore','initNewItemsList','YjGYh','nextActor','_sellWindow','1828335QZDwoI','AtdfA','mainFontFace','isCursorMovable','process_VisuMZ_ItemsEquipsCore_RegExp','changePaintOpacity','PurifyActors','cancel','background','_shopTrackingData','phFdC','BatchShop','playOkSound','drawUpdatedParamName','deactivate','_calculatingJSParameters','maxVisibleItems','WXUue','actor','ZfHLD','Scene_Equip_create','commandSell','drawing','Scene_Shop_onBuyCancel','drawActorCharacter','drawItemEffectsRemovedStatesBuffs','drawParamsItemsEquipsCore','isArmor','getEtypeIdWithName','XOxpZ','drawIcon','ItemsEquipsCore','0000','cRJtu','user','uljut','isUseItemsEquipsCoreUpdatedLayout','CommandAddOptimize','4108482HppctW','setBackgroundType','drawItemKeyData','loadSystem','itemTextAlign','prepareRefreshItemsEquipsCoreLayout','atk','buttonAssistOffset3','SPEED','isShowNew','cvHQi','_helpWindow','gaugeLineHeight','isPageChangeRequested','isHoverEnabled','ADnLm','MaxIcons','bVBMe','MuHtY','YpFwW','EFFECT_ADD_DEBUFF','name','sellWindowRect','EquipScene','1828196jYOKwK','initNewLabelSprites','BnxaQ','GKhdC','PhlWo','commandSellItemsEquipsCore','Speed1000','setTempActor','cEWWO','hpRate','troopArtifactIDs','isEquipped','_newLabelOpacityChange','textColor','categoryList','MaxItems','DvjOI','currentClass','isHovered','LqbCX','_cache','1835Vpyvcg','CqTSI','isSceneShop','canConsumeItem','LabelDamageHP','_data','successRate','numItems','getShopTrackingGoldSell','categoryItemTypes','armors','llTHA','ScopeRandomAny','iconText','Window_Selectable_setHelpWindowItem','updateHelp','gaugeBackColor','refreshCursor','commandName','_newLabelSprites','middle','OqUqf','createBitmap','height','allMembers','statusWidth','drawItemData','CoreEngine','Scene_Equip_statusWindowRect','cursorPagedown','4630203QjQXTD','equipAdjustHpMp','doSell','getItemEffectsHpRecoveryText','StatusWindowWidth','createCategoryWindow','isShiftRemoveShortcutEnabled','deselect','Game_Actor_paramPlus','NonRemoveETypes','setupItemDamageTempActors','setValue','ScopeRandomAllies','Scene_Equip_onSlotOk','occasion','ycIjL','hRjqY','_item','qshUG','getItemRepeatsLabel','EquipDelayMS','OCCASION','getItemRepeatsText','xgkIn','LayoutStyle','UBpYo','processShiftRemoveShortcut','ATAbX','_buyWindowLastIndex','removeBuff','processCursorSpecialCheckModernControls','xHJZq','Scene_Shop_helpWindowRect','UhqwJ','Window_Selectable_update','drawCustomShopGraphic','mwOVx','aNfIh','fontFace','hasItem','boLLx','hitIndex','type','mainFontSize','commandBuy','Irsye','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_resetFontSize','sellPriceRate','iaArH','uZpeQ','Remove\x20all\x20available\x20equipment.','ElementNone','getShopTrackingItemBuy','SyRJx','processCursorMove','EFFECT_REMOVE_BUFF','_category','trim','ScopeEnemyOrAlly','drawItemRepeats','jBILO','LabelDamageTP','placeItemNewLabel','_buttonAssistWindow','fpeVn','jrfDh','isTriggered','_goodsCount','tOTIL','RFQma','isOptimizeCommandEnabled','SKICM','isBuyCommandEnabled','getMenuImage','UnwhL','HJble','XuLDw','changeBuff','onSellCancel','helpDesc','isDualWield','SetupProxyItemGroups','loseItem','commandWindowRect','helpDescriptionText','fill','Window_ItemList_drawItem','getItemDamageElementText','itemHasEquipLimit','TIZty','convertInitEquipsToItems','categoryNameWindowCenter','refresh','hideDisabledCommands','ARRAYSTR','postCreateSlotWindowItemsEquipsCore','onTouchSelectModern','clearCmdDesc','%1-%2','_commandNameWindow','Scene_Equip_onActorChange','_goods','forceChangeEquip','getShopTrackingItem','mXPDm','mat','clearNewLabelFromItem','nonRemovableEtypes','Preiv','rmRUu','allowCommandWindowCursorUp','+%1%','versionId','damage','statusWindowRectItemsEquipsCore','FqWKO','meetsItemConditionsNotetags','params','onTouchSelect','removeState','AlwaysUsable','isUseModernControls','playCursorSound','setItemWindow','helpAreaTop','LabelElement','bRZBH','addLoadListener','YMsyC','hItLx','status','removeDebuff','limitedPageUpDownSceneCheck','fillRect','dQeIX','addInnerChild','max','PmCaZ','NVwkj','ARRAYEVAL','_statusWindow','maxItemAmount','wvnGn','categoryWindowRectItemsEquipsCore','EFFECT_RECOVER_MP','sellPriceOfItem','IjSmz','Window_EquipCommand_initialize','rCRwZ','_slotWindow','equipTypes','goldWindowRect','xNYri','mainCommandWidth','actorId','setStatusWindow','qhYZw','addItemCategories','snRqb','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','buttonAssistCategory','needsNewTempActor','QaLTh','getItemEffectsMpRecoveryLabel','currentSymbol','onBuyCancel','contents','goldWindowRectItemsEquipsCore','indexOf','CmdIconCancel','speed','Slots','format','mainAreaHeight','IconSet','eusZj','SCOPE','ITEMS_EQUIPS_CORE','ParseAllNotetags','OffsetY','hWZnt','fNihn','===','foreground','_tempActorA','discardEquip','iQucj','BattleUsable','changeEquipById','Game_BattlerBase_paramPlus_artifact','categoryWindowRect','ElementWeapon','EGwCZ','VisuMZ_0_CoreEngine','reloadMapIfUpdated','Scope1','equip2','lVNnI','IWjEp','exit','test','CmdIconEquip','ShopScene','getItemDamageAmountLabel','List','commandBuyItemsEquipsCore','artifactIDs','prototype','move','buyingPrice','ZXxOS','getItemEffectsTpDamageLabel','_getEquipRequirements','nuNIR','innerHeight','SetupArtifactItemIDs','addCancelCommand','SwitchSell','addEquipCommand','wWlXb','shouldCommandWindowExist','xKqHQ','buy','dSyET','equipCmdDesc','MANUAL','QcWUT','rZtrG','partyArtifacts','maxItems','isEquipWtypeOk','SellPriceJS','updateCategoryNameWindow','drawCustomShopGraphicLoad','nuAYw','jojuF','number','xEBRE','NeverUsable','Parse_Notetags_EnableJS','Speed1','MDF','cWvZd','KqirE','processTouchModernControls','KlLhS','onDatabaseLoaded','effects','addShopTrackingItemSell','checkShiftRemoveShortcut','Scene_Equip_commandEquip','Param','rkHxS','prepareItemCustomData','addOptimizeCommand','CulPP','TextAlign','_etypeIDs','STRUCT','KeyItems','drawItemEffects','dUSpe','map','LFyPe','Scene_Shop_onSellOk','eHDjl','sell','FieldUsable','bpkKf','drawItemEffectsHpRecovery','UTvmB','createCommandNameWindow','W%1','SpeedNeg2000','select','uiInputPosition','itemPadding','JHIUP','_newItemsList','AllWeapons','Window_ItemList_item','cMale','mhp','OzJIL','text','kHlWc','DRHRv','meetsShopListingConditions','Game_BattlerBase_param_artifact','playEquip','deepCopy','RegularItems','_categoryWindow','iconIndex','value','RegExp','New','getItemHitTypeLabel','min','tNuQW','meetsEquipRequirements','visible','LabelDamageMP','doBuy','buttonAssistSlotWindowShift','CmdTextAlign','hHMcc','nYlhK','DPuyL','_numberWindow','categories','getItemEffectsTpDamageText','paramBase','drawItemCustomEntries','Step2End','dqYjf','_itemData','EFFECT_REMOVE_DEBUFF','UZVBK','isSoleWeaponType','HP\x20RECOVERY','ARMOR','rmUMh','previousActor','SwitchID','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','setItem','gAydm','ReSdV','optKeyItemsNumber','smallParamFontSize','active','pXrYQ','categoryNameWindowDrawBackground','getItemSuccessRateText','LhKbj','getArmorIdWithName','AoYNf','PQUSV','QFdcP','djaPU','ItemQuantityFmt','drawItemEffectsAddedStatesBuffs','drawNewLabelText','commandStyleCheck','cUHTC','getClassIdWithName','Game_Party_initialize','FnsKU','addClearCommand','drawEquipData','iconHeight','getItemOccasionText','_categoryNameWindow','iconWidth','STR','createCategoryNameWindow','82424pmUejt','ParamChangeFontSize','processDownCursorSpecialCheckModernControls','itemEnableJS','Game_Actor_discardEquip','isSoleArmorType','Parse_Notetags_Prices','armor','getItemEffectsSelfTpGainLabel','_actor','Scene_Shop_categoryWindowRect','inBattle','ADDED\x20EFFECTS','TERva','MCDXm','remove','parse','onCategoryCancelItemsEquipsCore','_newLabelOpacity','textWidth','removeBattleTestArtifacts','(%1)','YUxoq','getItemEffects','BLRmA','drawItemDamage','isBattleTest','Window_ShopStatus_setItem','paramPlus','callUpdateHelp','updateMoneyAmount','onSellOkItemsEquipsCore','idyLP','getItemDamageAmountTextOriginal','fGWgB','Scene_Item_helpWindowRect','ScopeAlliesButUser','ParseClassNotetags','commandWindowRectItemsEquipsCore','?????','getInputMultiButtonStrings','elementId','optimize','_checkEquipRequirements','isEquipItem','maxmp','Window_Selectable_refresh','nDVCJ','setCategory','_customItemInfo','LvZaU','registerCommand','_weaponIDs','defaultItemMax','canShiftRemoveEquipment','aRAKJ','sellingPrice','calcEquipItemPerformance','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Game_BattlerBase_meetsItemConditions','loadFaceImages','addShopTrackingGoldBuy','kMqBi','meetsItemConditions','IbNko','down','equipItems','_classIDs','vzJjf','Actors','EFFECT_GAIN_TP','process_VisuMZ_ItemsEquipsCore_Notetags','qKwtK','lineHeight','vrAMc','OZBQN','Scene_Shop_commandBuy','note','item','jtstW','ELEMENT','isCursedItem','Game_BattlerBase_param','_bypassProxy','drawItemDamageAmount','battleMembers','EFFECT_ADD_BUFF','index','getTextColor','nCDVa','cursorUp','changeEquip','getItemEffectsMpDamageLabel','FUNC','uiHelpPosition','Wbdkz','_handlers','xrBNJ','forceResetEquipSlots','drawItemSpeed','getShopTrackingItemSell','getItemDamageAmountLabelOriginal','Window_ItemList_updateHelp','nCeEU','equipSlots','categoryStyle','round','drawItemEffectsTpDamage','addStateBuffChanges','EnableLayout','buyWindowRect','\x5cb%1\x5cb','colSpacing','left','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','Game_BattlerBase_canEquip_artifact','isCommandEnabled','addWindow','postCreateSellWindowItemsEquipsCore','center','getProxyItem','length','INhql','Step1Start','getItemScopeText','process_VisuMZ_ItemsEquipsCore_EquipSlots','yyrkD','LabelRecoverTP','CheckCursedItemMsg','ZcAvS','getItemHitTypeText'];_0x2356=function(){return _0xb62d3f;};return _0x2356();}function _0xb358(_0x584d9b,_0x36a3ce){const _0x23569e=_0x2356();return _0xb358=function(_0xb35855,_0x1a8dcc){_0xb35855=_0xb35855-0x158;let _0x456250=_0x23569e[_0xb35855];return _0x456250;},_0xb358(_0x584d9b,_0x36a3ce);}(function(_0x295494,_0x32736d){const _0x3c9bd4=_0xb358,_0x113f4a=_0x295494();while(!![]){try{const _0x9e663b=-parseInt(_0x3c9bd4(0x2ba))/0x1*(-parseInt(_0x3c9bd4(0x35f))/0x2)+-parseInt(_0x3c9bd4(0x321))/0x3+parseInt(_0x3c9bd4(0x2af))/0x4*(-parseInt(_0x3c9bd4(0x374))/0x5)+-parseInt(_0x3c9bd4(0x347))/0x6+-parseInt(_0x3c9bd4(0x313))/0x7*(parseInt(_0x3c9bd4(0x4f8))/0x8)+-parseInt(_0x3c9bd4(0x392))/0x9+parseInt(_0x3c9bd4(0x61b))/0xa;if(_0x9e663b===_0x32736d)break;else _0x113f4a['push'](_0x113f4a['shift']());}catch(_0x353a3e){_0x113f4a['push'](_0x113f4a['shift']());}}}(_0x2356,0xd0a1b));var label=_0x26e348(0x340),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x161187){const _0x20cd67=_0x26e348;return _0x161187[_0x20cd67(0x415)]&&_0x161187[_0x20cd67(0x254)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x26e348(0x1fa)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x26e348(0x63e)]=function(_0x6a82f0,_0x4ef196){const _0x5e1de3=_0x26e348;for(const _0x48a51b in _0x4ef196){if(_0x48a51b[_0x5e1de3(0x28b)](/(.*):(.*)/i)){if(_0x5e1de3(0x5d7)==='MsWYz'){const _0x112c06='MP\x20DAMAGE';if(this[_0x5e1de3(0x4cf)][_0x5e1de3(0x2db)]>=0x0&&this['_itemData'][_0x5e1de3(0x2fd)]>=0x0&&!this[_0x5e1de3(0x529)][_0x112c06])return![];const _0x23d0e3=this[_0x5e1de3(0x554)]();this[_0x5e1de3(0x349)](_0x23d0e3,_0x5488fd,_0x1d5ce5,_0x517c70,!![]);const _0x35ec2e=this[_0x5e1de3(0x17e)]();return this[_0x5e1de3(0x303)](_0x3b9852[_0x5e1de3(0x1e3)](0x2)),this[_0x5e1de3(0x349)](_0x35ec2e,_0x2ec3f9,_0x405a9c,_0x12af5c,![],_0x5e1de3(0x652)),this[_0x5e1de3(0x608)](_0x4e0f9c,_0x4465e3,_0x48ad86),this[_0x5e1de3(0x587)](),!![];}else{const _0x43b2ab=String(RegExp['$1']),_0x309012=String(RegExp['$2'])['toUpperCase']()[_0x5e1de3(0x3cc)]();let _0xb2d8bf,_0x1c7f16,_0x260421;switch(_0x309012){case _0x5e1de3(0x618):_0xb2d8bf=_0x4ef196[_0x48a51b]!==''?Number(_0x4ef196[_0x48a51b]):0x0;break;case _0x5e1de3(0x5e1):_0x1c7f16=_0x4ef196[_0x48a51b]!==''?JSON[_0x5e1de3(0x508)](_0x4ef196[_0x48a51b]):[],_0xb2d8bf=_0x1c7f16[_0x5e1de3(0x499)](_0x2b9465=>Number(_0x2b9465));break;case _0x5e1de3(0x208):_0xb2d8bf=_0x4ef196[_0x48a51b]!==''?eval(_0x4ef196[_0x48a51b]):null;break;case _0x5e1de3(0x41e):_0x1c7f16=_0x4ef196[_0x48a51b]!==''?JSON[_0x5e1de3(0x508)](_0x4ef196[_0x48a51b]):[],_0xb2d8bf=_0x1c7f16[_0x5e1de3(0x499)](_0x222068=>eval(_0x222068));break;case _0x5e1de3(0x5f6):_0xb2d8bf=_0x4ef196[_0x48a51b]!==''?JSON[_0x5e1de3(0x508)](_0x4ef196[_0x48a51b]):'';break;case'ARRAYJSON':_0x1c7f16=_0x4ef196[_0x48a51b]!==''?JSON[_0x5e1de3(0x508)](_0x4ef196[_0x48a51b]):[],_0xb2d8bf=_0x1c7f16[_0x5e1de3(0x499)](_0x4641ff=>JSON['parse'](_0x4641ff));break;case _0x5e1de3(0x555):_0xb2d8bf=_0x4ef196[_0x48a51b]!==''?new Function(JSON['parse'](_0x4ef196[_0x48a51b])):new Function(_0x5e1de3(0x243));break;case'ARRAYFUNC':_0x1c7f16=_0x4ef196[_0x48a51b]!==''?JSON[_0x5e1de3(0x508)](_0x4ef196[_0x48a51b]):[],_0xb2d8bf=_0x1c7f16['map'](_0x46da50=>new Function(JSON[_0x5e1de3(0x508)](_0x46da50)));break;case _0x5e1de3(0x4f6):_0xb2d8bf=_0x4ef196[_0x48a51b]!==''?String(_0x4ef196[_0x48a51b]):'';break;case _0x5e1de3(0x3f1):_0x1c7f16=_0x4ef196[_0x48a51b]!==''?JSON[_0x5e1de3(0x508)](_0x4ef196[_0x48a51b]):[],_0xb2d8bf=_0x1c7f16['map'](_0x4b8fc8=>String(_0x4b8fc8));break;case _0x5e1de3(0x495):_0x260421=_0x4ef196[_0x48a51b]!==''?JSON[_0x5e1de3(0x508)](_0x4ef196[_0x48a51b]):{},_0x6a82f0[_0x43b2ab]={},VisuMZ['ConvertParams'](_0x6a82f0[_0x43b2ab],_0x260421);continue;case _0x5e1de3(0x2f6):_0x1c7f16=_0x4ef196[_0x48a51b]!==''?JSON[_0x5e1de3(0x508)](_0x4ef196[_0x48a51b]):[],_0xb2d8bf=_0x1c7f16['map'](_0x198bf6=>VisuMZ[_0x5e1de3(0x63e)]({},JSON[_0x5e1de3(0x508)](_0x198bf6)));break;default:continue;}_0x6a82f0[_0x43b2ab]=_0xb2d8bf;}}}return _0x6a82f0;},(_0x49b78f=>{const _0x39839b=_0x26e348,_0x184439=_0x49b78f[_0x39839b(0x35c)];for(const _0x5be0d6 of dependencies){if(!Imported[_0x5be0d6]){alert(_0x39839b(0x432)[_0x39839b(0x43f)](_0x184439,_0x5be0d6)),SceneManager[_0x39839b(0x45a)]();break;}}const _0x19bfde=_0x49b78f[_0x39839b(0x254)];if(_0x19bfde[_0x39839b(0x28b)](/\[Version[ ](.*?)\]/i)){const _0x1baf4c=Number(RegExp['$1']);_0x1baf4c!==VisuMZ[label]['version']&&(_0x39839b(0x1bc)===_0x39839b(0x236)?_0x27e22a[_0x39839b(0x462)][_0x39839b(0x180)][_0x39839b(0x62d)](this):(alert(_0x39839b(0x4d8)[_0x39839b(0x43f)](_0x184439,_0x1baf4c)),SceneManager['exit']()));}if(_0x19bfde[_0x39839b(0x28b)](/\[Tier[ ](\d+)\]/i)){if(_0x39839b(0x26f)===_0x39839b(0x26f)){const _0x268419=Number(RegExp['$1']);_0x268419<tier?'WASxB'!=='yTXFM'?(alert(_0x39839b(0x532)[_0x39839b(0x43f)](_0x184439,_0x268419,tier)),SceneManager[_0x39839b(0x45a)]()):this[_0x39839b(0x303)](_0x51ec70[_0x39839b(0x314)]()):tier=Math[_0x39839b(0x41b)](_0x268419,tier);}else this['_commandWindow'][_0x39839b(0x15e)](0x0),this[_0x39839b(0x428)][_0x39839b(0x32f)]();}VisuMZ[_0x39839b(0x63e)](VisuMZ[label][_0x39839b(0x1fa)],_0x49b78f['parameters']);})(pluginData),PluginManager[_0x26e348(0x52b)](pluginData[_0x26e348(0x35c)],_0x26e348(0x22a),_0x5e7e60=>{const _0x2c5ff5=_0x26e348;VisuMZ[_0x2c5ff5(0x63e)](_0x5e7e60,_0x5e7e60);const _0x594f04=_0x5e7e60[_0x2c5ff5(0x53d)][_0x2c5ff5(0x499)](_0x1e5ca2=>$gameActors[_0x2c5ff5(0x333)](_0x1e5ca2)),_0x9b3346=_0x5e7e60[_0x2c5ff5(0x43e)][_0x2c5ff5(0x499)](_0x603082=>$dataSystem[_0x2c5ff5(0x429)][_0x2c5ff5(0x43b)](_0x603082['trim']()));for(const _0xdb6167 of _0x594f04){if(!_0xdb6167)continue;_0xdb6167[_0x2c5ff5(0x1c5)](_0x9b3346);}}),PluginManager[_0x26e348(0x52b)](pluginData[_0x26e348(0x35c)],_0x26e348(0x1bb),_0x474a78=>{const _0x248bcf=_0x26e348;VisuMZ['ConvertParams'](_0x474a78,_0x474a78);const _0x473617=_0x474a78[_0x248bcf(0x53d)][_0x248bcf(0x499)](_0x316e6d=>$gameActors[_0x248bcf(0x333)](_0x316e6d));for(const _0x3050d8 of _0x473617){if(_0x248bcf(0x4ce)===_0x248bcf(0x2c1))_0x1c350d=_0x248bcf(0x5c4)[_0x248bcf(0x43f)](_0x226827['id']);else{if(!_0x3050d8)continue;_0x3050d8[_0x248bcf(0x55a)]();}}}),PluginManager['registerCommand'](pluginData[_0x26e348(0x35c)],_0x26e348(0x327),_0x2d7981=>{const _0x2f1fb4=_0x26e348;if($gameParty[_0x2f1fb4(0x503)]())return;VisuMZ[_0x2f1fb4(0x63e)](_0x2d7981,_0x2d7981);const _0x247bcd=_0x2d7981['Actors'][_0x2f1fb4(0x499)](_0x16e7d4=>$gameActors[_0x2f1fb4(0x333)](_0x16e7d4));for(const _0x3046c2 of _0x247bcd){if(!_0x3046c2)continue;_0x3046c2[_0x2f1fb4(0x5e8)]();}}),PluginManager[_0x26e348(0x52b)](pluginData[_0x26e348(0x35c)],'PurifyParty',_0x5a056f=>{if($gameParty['inBattle']())return;$gameParty['purifyCursedEquips']();}),PluginManager[_0x26e348(0x52b)](pluginData[_0x26e348(0x35c)],_0x26e348(0x32c),_0x9854f5=>{const _0x3fa8ad=_0x26e348;VisuMZ[_0x3fa8ad(0x63e)](_0x9854f5,_0x9854f5);const _0x342952=[],_0x19c1b8=_0x9854f5[_0x3fa8ad(0x589)]['map'](_0x1c801a=>_0x1c801a[_0x3fa8ad(0x63a)]()[_0x3fa8ad(0x3cc)]()),_0x2b228e=_0x9854f5[_0x3fa8ad(0x2c9)][_0x3fa8ad(0x499)](_0x3f38c1=>_0x3f38c1['toUpperCase']()[_0x3fa8ad(0x3cc)]()),_0xde3def=_0x9854f5[_0x3fa8ad(0x318)]>=_0x9854f5[_0x3fa8ad(0x573)]?_0x9854f5['Step1Start']:_0x9854f5['Step1End'],_0x1c6f0d=_0x9854f5[_0x3fa8ad(0x318)]>=_0x9854f5[_0x3fa8ad(0x573)]?_0x9854f5[_0x3fa8ad(0x318)]:_0x9854f5[_0x3fa8ad(0x573)],_0xb3728d=Array(_0x1c6f0d-_0xde3def+0x1)[_0x3fa8ad(0x3e8)]()[_0x3fa8ad(0x499)]((_0x5536a0,_0x24411e)=>_0xde3def+_0x24411e);for(const _0x424e33 of _0xb3728d){if(_0x3fa8ad(0x453)===_0x3fa8ad(0x453)){const _0x27b0d2=$dataItems[_0x424e33];if(!_0x27b0d2)continue;if(!VisuMZ[_0x3fa8ad(0x340)][_0x3fa8ad(0x1f8)](_0x27b0d2,_0x19c1b8,_0x2b228e))continue;_0x342952[_0x3fa8ad(0x270)]([0x0,_0x424e33,0x0,_0x27b0d2[_0x3fa8ad(0x2d5)]]);}else{if(_0x1baf78&&this[_0x3fa8ad(0x501)]){if(this[_0x3fa8ad(0x3eb)](_0x27b52c))return![];if(this[_0x3fa8ad(0x4d2)](_0x33398a))return![];if(this[_0x3fa8ad(0x4fd)](_0x2eed15))return![];if(!this[_0x3fa8ad(0x501)][_0x3fa8ad(0x274)](_0x5031e3))return![];}if(!_0x3efecb)return!this[_0x3fa8ad(0x3fe)]()['includes'](this['etypeId']());return _0x321f75[_0x3fa8ad(0x340)]['Window_EquipItem_isEnabled'][_0x3fa8ad(0x62d)](this,_0x2ef721);}}const _0x51d8c1=_0x9854f5[_0x3fa8ad(0x4cd)]>=_0x9854f5['Step2Start']?_0x9854f5[_0x3fa8ad(0x657)]:_0x9854f5[_0x3fa8ad(0x4cd)],_0x5672a5=_0x9854f5[_0x3fa8ad(0x4cd)]>=_0x9854f5[_0x3fa8ad(0x657)]?_0x9854f5['Step2End']:_0x9854f5[_0x3fa8ad(0x657)],_0x50871d=Array(_0x5672a5-_0x51d8c1+0x1)[_0x3fa8ad(0x3e8)]()['map']((_0x213d40,_0x4f561a)=>_0x51d8c1+_0x4f561a);for(const _0x3f6f86 of _0x50871d){const _0x542c0e=$dataWeapons[_0x3f6f86];if(!_0x542c0e)continue;if(!VisuMZ[_0x3fa8ad(0x340)][_0x3fa8ad(0x1f8)](_0x542c0e,_0x19c1b8,_0x2b228e))continue;_0x342952[_0x3fa8ad(0x270)]([0x1,_0x3f6f86,0x0,_0x542c0e[_0x3fa8ad(0x2d5)]]);}const _0x405d5f=_0x9854f5[_0x3fa8ad(0x2b0)]>=_0x9854f5[_0x3fa8ad(0x679)]?_0x9854f5[_0x3fa8ad(0x679)]:_0x9854f5[_0x3fa8ad(0x2b0)],_0x3f54e2=_0x9854f5[_0x3fa8ad(0x2b0)]>=_0x9854f5[_0x3fa8ad(0x679)]?_0x9854f5[_0x3fa8ad(0x2b0)]:_0x9854f5[_0x3fa8ad(0x679)],_0xbb96d0=Array(_0x3f54e2-_0x405d5f+0x1)['fill']()['map']((_0x40d149,_0x4abb0b)=>_0x405d5f+_0x4abb0b);for(const _0x4293c1 of _0xbb96d0){if(_0x3fa8ad(0x3b3)===_0x3fa8ad(0x3b3)){const _0x164ff3=$dataArmors[_0x4293c1];if(!_0x164ff3)continue;if(!VisuMZ[_0x3fa8ad(0x340)][_0x3fa8ad(0x1f8)](_0x164ff3,_0x19c1b8,_0x2b228e))continue;_0x342952[_0x3fa8ad(0x270)]([0x2,_0x4293c1,0x0,_0x164ff3['price']]);}else{_0x3e459a+=0x1;if(_0xccb175[_0x3fa8ad(0x545)][_0x3fa8ad(0x28b)](_0x166619)){const _0x528c1e=_0xa3be8(_0x535be4['$1'])||0x1;if(_0x21f1dc>=_0x528c1e)return!![];}if(_0x3f30ba['note'][_0x3fa8ad(0x28b)](_0x5af810)){const _0x3b933c=_0x178e5f(_0x1f4eaf['$1'])||0x1;if(_0x36396e>=_0x3b933c)return!![];}}}SceneManager[_0x3fa8ad(0x270)](Scene_Shop),SceneManager['prepareNextScene'](_0x342952,_0x9854f5['PurchaseOnly']);}),VisuMZ[_0x26e348(0x340)][_0x26e348(0x1f8)]=function(_0x51a106,_0x1b4298,_0x383a3c){const _0x421ffd=_0x26e348;if(_0x51a106[_0x421ffd(0x35c)]['trim']()==='')return![];if(_0x51a106['name'][_0x421ffd(0x28b)](/-----/i))return![];const _0x4bd7c4=_0x51a106[_0x421ffd(0x4c9)];if(_0x1b4298['length']>0x0)for(const _0x29d092 of _0x1b4298){if(!_0x29d092)continue;if(_0x4bd7c4[_0x421ffd(0x176)](_0x29d092))return![];}if(_0x383a3c[_0x421ffd(0x571)]>0x0){if(_0x421ffd(0x2e8)!==_0x421ffd(0x351)){for(const _0x347a63 of _0x383a3c){if(!_0x347a63)continue;if(_0x4bd7c4[_0x421ffd(0x176)](_0x347a63))return!![];}return![];}else return _0x26ac6e[_0x421ffd(0x340)]['Settings']['EquipScene']['NonRemoveETypes'];}return!![];},VisuMZ[_0x26e348(0x340)][_0x26e348(0x242)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x26e348(0x462)][_0x26e348(0x489)]=function(){const _0x193894=_0x26e348;this[_0x193894(0x325)](),VisuMZ['ItemsEquipsCore'][_0x193894(0x242)][_0x193894(0x62d)](this),this[_0x193894(0x53f)](),VisuMZ[_0x193894(0x340)][_0x193894(0x3e4)](),VisuMZ[_0x193894(0x340)][_0x193894(0x46a)]();},Scene_Boot[_0x26e348(0x462)]['process_VisuMZ_ItemsEquipsCore_RegExp']=function(){const _0x31eac8=_0x26e348;VisuMZ[_0x31eac8(0x340)][_0x31eac8(0x4ba)]={},VisuMZ['ItemsEquipsCore'][_0x31eac8(0x4ba)][_0x31eac8(0x298)]=[],VisuMZ['ItemsEquipsCore'][_0x31eac8(0x4ba)][_0x31eac8(0x185)]=[];const _0x5194d2=['MaxHP',_0x31eac8(0x22d),'ATK',_0x31eac8(0x304),'MAT',_0x31eac8(0x484),_0x31eac8(0x18b),_0x31eac8(0x67a)];for(const _0x49c9d9 of _0x5194d2){const _0x716565=_0x31eac8(0x56a)[_0x31eac8(0x43f)](_0x49c9d9);VisuMZ['ItemsEquipsCore'][_0x31eac8(0x4ba)][_0x31eac8(0x298)][_0x31eac8(0x270)](new RegExp(_0x716565,'i'));const _0x3535c9=_0x31eac8(0x567)[_0x31eac8(0x43f)](_0x49c9d9);VisuMZ[_0x31eac8(0x340)][_0x31eac8(0x4ba)][_0x31eac8(0x185)]['push'](new RegExp(_0x3535c9,'g'));}},Scene_Boot['prototype'][_0x26e348(0x53f)]=function(){const _0x2ec57d=_0x26e348;if(VisuMZ[_0x2ec57d(0x445)])return;this[_0x2ec57d(0x575)]();const _0x19fcdb=[$dataItems,$dataWeapons,$dataArmors];for(const _0x134828 of _0x19fcdb){for(const _0x6543f8 of _0x134828){if(!_0x6543f8)continue;VisuMZ[_0x2ec57d(0x340)]['Parse_Notetags_Category'](_0x6543f8,_0x134828),VisuMZ[_0x2ec57d(0x340)]['Parse_Notetags_Prices'](_0x6543f8,_0x134828),VisuMZ['ItemsEquipsCore'][_0x2ec57d(0x5f3)](_0x6543f8,_0x134828),VisuMZ['ItemsEquipsCore'][_0x2ec57d(0x27b)](_0x6543f8,_0x134828),VisuMZ[_0x2ec57d(0x340)][_0x2ec57d(0x482)](_0x6543f8,_0x134828);}}},Scene_Boot['prototype'][_0x26e348(0x575)]=function(){const _0x8b169a=_0x26e348;for(const _0x5a018b of $dataClasses){if(!_0x5a018b)continue;VisuMZ[_0x8b169a(0x340)][_0x8b169a(0x59c)](_0x5a018b);}},VisuMZ[_0x26e348(0x340)][_0x26e348(0x51d)]=VisuMZ[_0x26e348(0x51d)],VisuMZ[_0x26e348(0x51d)]=function(_0x2d99ef){const _0x406560=_0x26e348;VisuMZ[_0x406560(0x340)][_0x406560(0x51d)]['call'](this,_0x2d99ef),VisuMZ[_0x406560(0x340)]['Parse_Notetags_EquipSlots'](_0x2d99ef);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x26a)]=VisuMZ[_0x26e348(0x26a)],VisuMZ[_0x26e348(0x26a)]=function(_0x10eaf7){const _0x536d82=_0x26e348;VisuMZ[_0x536d82(0x340)][_0x536d82(0x26a)][_0x536d82(0x62d)](this,_0x10eaf7),VisuMZ[_0x536d82(0x340)][_0x536d82(0x22b)](_0x10eaf7,$dataItems);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x2f3)]=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x26e348(0x2f3)]=function(_0x3a7838){const _0x2216fe=_0x26e348;VisuMZ[_0x2216fe(0x340)][_0x2216fe(0x2f3)][_0x2216fe(0x62d)](this,_0x3a7838),VisuMZ[_0x2216fe(0x340)][_0x2216fe(0x22b)](_0x3a7838,$dataWeapons);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x30b)]=VisuMZ['ParseArmorNotetags'],VisuMZ['ParseArmorNotetags']=function(_0x580916){const _0x300348=_0x26e348;VisuMZ[_0x300348(0x340)]['ParseArmorNotetags']['call'](this,_0x580916),VisuMZ[_0x300348(0x340)][_0x300348(0x22b)](_0x580916,$dataArmors);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x59c)]=function(_0x2ac004){const _0x1ee800=_0x26e348;_0x2ac004['equipSlots']=[];const _0x18eac5=$dataSystem['equipTypes'][_0x1ee800(0x499)](_0x3e3600=>_0x3e3600?_0x3e3600['trim']():'');if(!BattleManager[_0x1ee800(0x512)]()&&_0x2ac004[_0x1ee800(0x545)][_0x1ee800(0x28b)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){if('gulvY'!=='RgKsk'){const _0x3525a3=String(RegExp['$1'])[_0x1ee800(0x1b6)](/[\r\n]+/);for(const _0x375a1c of _0x3525a3){if(_0x1ee800(0x5bf)==='RFBDB'){const _0x2923c1=_0x18eac5['indexOf'](_0x375a1c[_0x1ee800(0x3cc)]());if(_0x2923c1>0x0)_0x2ac004['equipSlots'][_0x1ee800(0x270)](_0x2923c1);}else{const _0x2ad96a=this['createTempActorEquips'](_0x446ac6);let _0x1f9e19=0x0,_0x35f10b=0x0,_0x2604b2=0x0;_0x8e54f0[_0x1ee800(0x454)]?(_0x1f9e19=_0x2ad96a[_0x1ee800(0x234)](_0x29dc40),_0x35f10b=_0x1f9e19-_0x35c7c5[_0x1ee800(0x234)](_0xfc4ecc),this[_0x1ee800(0x303)](_0x495f1e[_0x1ee800(0x2fa)](_0x35f10b)),_0x2604b2=(_0x35f10b>=0x0?'+':'')+_0x143f5f['ConvertNumberToString'](_0x35f10b,0x0,_0xf2a052)):(_0x1f9e19=_0x2ad96a[_0x1ee800(0x285)](_0x432480),_0x35f10b=_0x1f9e19-_0x4a6741[_0x1ee800(0x285)](_0x118116),this[_0x1ee800(0x303)](_0x394cea[_0x1ee800(0x2fa)](_0x35f10b)),_0x2604b2=(_0x35f10b>=0x0?'+':'')+_0x35f10b),_0x2604b2==='+0'&&(_0x2604b2=_0x1fd9d1[_0x1ee800(0x58e)]),this[_0x1ee800(0x1e8)](_0x2604b2,_0x42ecb5,_0x30ed51,_0x3bde9a,_0x1ee800(0x56f));}}}else{const _0xfdce45=_0x1ee800(0x194);if(this[_0x1ee800(0x529)][_0xfdce45])return this[_0x1ee800(0x529)][_0xfdce45];return this['canConsumeItem']()?_0x33e6ba[_0x1ee800(0x340)][_0x1ee800(0x1fa)][_0x1ee800(0x1da)][_0x1ee800(0x620)]:_0x2dae0f[_0x1ee800(0x340)]['Settings'][_0x1ee800(0x1da)]['NotConsumable'];}}else{if('SITQV'!==_0x1ee800(0x31e))for(const _0x2940ab of _0x18eac5){if(_0x1ee800(0x1c2)!==_0x1ee800(0x1c2))_0x3b4fd0=_0x538a32['paramValueByName'](_0x58a87c),_0x284d0b=_0x2a1d74-_0x4b110d[_0x1ee800(0x234)](_0x30049a),this['changeTextColor'](_0xfbf788[_0x1ee800(0x2fa)](_0x3d7f6e)),_0x36a22e=(_0x2307b2>=0x0?'+':'')+_0x152f51[_0x1ee800(0x5aa)](_0x39f7ac,0x0,_0x359614);else{const _0x900f25=_0x18eac5[_0x1ee800(0x43b)](_0x2940ab[_0x1ee800(0x3cc)]());if(_0x900f25>0x0)_0x2ac004[_0x1ee800(0x560)][_0x1ee800(0x270)](_0x900f25);}}else _0x22b73f[_0x1ee800(0x340)]['SetupProxyItemGroup'](_0x3c96c4),_0x435f83[_0x1ee800(0x340)][_0x1ee800(0x5dd)](_0xed9153),_0x4c32be[_0x1ee800(0x340)][_0x1ee800(0x5dd)](_0x10abdd);}},VisuMZ[_0x26e348(0x340)][_0x26e348(0x22b)]=function(_0x57ce98,_0x4692ab){const _0xf15678=_0x26e348;VisuMZ[_0xf15678(0x340)]['Parse_Notetags_Category'](_0x57ce98,_0x4692ab),VisuMZ[_0xf15678(0x340)][_0xf15678(0x4fe)](_0x57ce98,_0x4692ab),VisuMZ[_0xf15678(0x340)][_0xf15678(0x5f3)](_0x57ce98,_0x4692ab),VisuMZ[_0xf15678(0x340)][_0xf15678(0x27b)](_0x57ce98,_0x4692ab),VisuMZ[_0xf15678(0x340)][_0xf15678(0x482)](_0x57ce98,_0x4692ab);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x1a1)]=function(_0x16effa,_0x539d73){const _0x127c1a=_0x26e348;_0x16effa[_0x127c1a(0x4c9)]=[];const _0x536243=_0x16effa[_0x127c1a(0x545)],_0x362411=_0x536243[_0x127c1a(0x28b)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x362411)for(const _0x681179 of _0x362411){if(_0x127c1a(0x690)!==_0x127c1a(0x4e5)){_0x681179[_0x127c1a(0x28b)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x3e4a6b=String(RegExp['$1'])[_0x127c1a(0x63a)]()[_0x127c1a(0x3cc)]()[_0x127c1a(0x1b6)](',');for(const _0x5094fe of _0x3e4a6b){if('tfxul'===_0x127c1a(0x22f)){const _0x504a7a='HP\x20DAMAGE';if(this['_customItemInfo'][_0x504a7a])return this[_0x127c1a(0x529)][_0x504a7a];let _0x170c61='';if(this[_0x127c1a(0x4cf)][_0x127c1a(0x654)]<0x0)_0x170c61+='%1%'[_0x127c1a(0x43f)](_0x458f6b[_0x127c1a(0x160)](this[_0x127c1a(0x4cf)][_0x127c1a(0x654)]*0x64));if(this['_itemData'][_0x127c1a(0x654)]<0x0&&this[_0x127c1a(0x4cf)]['flatHP']<0x0)_0x170c61+='\x20';if(this[_0x127c1a(0x4cf)]['flatHP']<0x0)_0x170c61+='%1'[_0x127c1a(0x43f)](this[_0x127c1a(0x4cf)][_0x127c1a(0x612)]);return _0x170c61;}else _0x16effa[_0x127c1a(0x4c9)]['push'](_0x5094fe[_0x127c1a(0x3cc)]());}}else return _0x127c1a(0x381);}if(_0x536243[_0x127c1a(0x28b)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0xa55ed0=RegExp['$1'][_0x127c1a(0x1b6)](/[\r\n]+/);for(const _0x33a933 of _0xa55ed0){if(_0x127c1a(0x3b1)===_0x127c1a(0x3b1))_0x16effa[_0x127c1a(0x4c9)][_0x127c1a(0x270)](_0x33a933['toUpperCase']()[_0x127c1a(0x3cc)]());else return _0x1258a9['ItemsEquipsCore'][_0x127c1a(0x1fa)][_0x127c1a(0x45d)][_0x127c1a(0x1f6)];}}},VisuMZ['ItemsEquipsCore'][_0x26e348(0x4fe)]=function(_0x42984c,_0x4826e5){const _0x3fafbf=_0x26e348;_0x42984c['note'][_0x3fafbf(0x28b)](/<PRICE:[ ](\d+)>/i)&&(_0x42984c[_0x3fafbf(0x2d5)]=Number(RegExp['$1']));},VisuMZ[_0x26e348(0x340)][_0x26e348(0x5f3)]=function(_0x1a4a30,_0x33af01){const _0x355a9c=_0x26e348;if(_0x33af01===$dataItems)return;for(let _0x12ed78=0x0;_0x12ed78<0x8;_0x12ed78++){const _0x21d993=VisuMZ[_0x355a9c(0x340)]['RegExp'][_0x355a9c(0x298)][_0x12ed78];_0x1a4a30['note'][_0x355a9c(0x28b)](_0x21d993)&&(_0x1a4a30['params'][_0x12ed78]=parseInt(RegExp['$1']));}},VisuMZ[_0x26e348(0x340)]['paramJS']={},VisuMZ[_0x26e348(0x340)][_0x26e348(0x27b)]=function(_0x1db4f6,_0x6e2e7e){const _0x7dd156=_0x26e348;if(_0x6e2e7e===$dataItems)return;if(_0x1db4f6['note'][_0x7dd156(0x28b)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x4d2d86=String(RegExp['$1']),_0x2025c1=(_0x6e2e7e===$dataWeapons?_0x7dd156(0x4a3):_0x7dd156(0x222))['format'](_0x1db4f6['id']),_0x47ee7b=_0x7dd156(0x26c)[_0x7dd156(0x43f)](_0x4d2d86);for(let _0x1fc6a8=0x0;_0x1fc6a8<0x8;_0x1fc6a8++){if(_0x4d2d86[_0x7dd156(0x28b)](VisuMZ[_0x7dd156(0x340)][_0x7dd156(0x4ba)]['BorderRegExp'][_0x1fc6a8])){if(_0x7dd156(0x4e2)!==_0x7dd156(0x4e2))return this[_0x7dd156(0x2cf)]()[_0x7dd156(0x28b)](/LOWER/i);else{const _0x3e7c2a='%1-%2'[_0x7dd156(0x43f)](_0x2025c1,_0x1fc6a8);VisuMZ[_0x7dd156(0x340)][_0x7dd156(0x170)][_0x3e7c2a]=new Function('item','paramId',_0x47ee7b);}}}}},VisuMZ[_0x26e348(0x340)][_0x26e348(0x4fb)]={},VisuMZ['ItemsEquipsCore'][_0x26e348(0x482)]=function(_0x3f326b,_0x566f2f){const _0xb3803f=_0x26e348;if(_0x566f2f!==$dataItems)return;if(_0x3f326b[_0xb3803f(0x545)][_0xb3803f(0x28b)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x22d9f1=String(RegExp['$1']),_0x3c501c=_0xb3803f(0x3c0)['format'](_0x22d9f1);VisuMZ['ItemsEquipsCore']['itemEnableJS'][_0x3f326b['id']]=new Function(_0xb3803f(0x546),_0x3c501c);}},DataManager[_0x26e348(0x2b9)]=function(_0x42cf1f){const _0x8d7f22=_0x26e348;return this[_0x8d7f22(0x2bd)](_0x42cf1f)&&_0x42cf1f['itypeId']===0x2;},DataManager['maxItemAmount']=function(_0x238c40){const _0x4f9b15=_0x26e348;if(!_0x238c40)return 0x63;else{if(_0x238c40[_0x4f9b15(0x545)][_0x4f9b15(0x28b)](/<MAX:[ ](\d+)>/i))return parseInt(RegExp['$1']);else{if(_0x4f9b15(0x5e2)!==_0x4f9b15(0x35a))return this[_0x4f9b15(0x52d)](_0x238c40);else _0x1433e6=_0x23148f(_0x1894d7['$1'])[_0x4f9b15(0x1b6)](/[\r\n]+/);}}},DataManager['defaultItemMax']=function(_0x1fdfbf){const _0x570b2c=_0x26e348;if(this[_0x570b2c(0x2bd)](_0x1fdfbf))return VisuMZ[_0x570b2c(0x340)][_0x570b2c(0x1fa)]['ItemScene'][_0x570b2c(0x36e)];else{if(this[_0x570b2c(0x188)](_0x1fdfbf))return VisuMZ[_0x570b2c(0x340)][_0x570b2c(0x1fa)]['ItemScene'][_0x570b2c(0x2e0)];else{if(this[_0x570b2c(0x33c)](_0x1fdfbf))return VisuMZ[_0x570b2c(0x340)]['Settings'][_0x570b2c(0x16e)][_0x570b2c(0x290)];}}},DataManager[_0x26e348(0x4ed)]=function(_0x2110b0){const _0x35b4b6=_0x26e348;_0x2110b0=_0x2110b0[_0x35b4b6(0x63a)]()['trim'](),this[_0x35b4b6(0x53b)]=this[_0x35b4b6(0x53b)]||{};if(this[_0x35b4b6(0x53b)][_0x2110b0])return this[_0x35b4b6(0x53b)][_0x2110b0];for(const _0xe2f1be of $dataClasses){if(_0x35b4b6(0x3df)!==_0x35b4b6(0x492)){if(!_0xe2f1be)continue;let _0x17ba2e=_0xe2f1be[_0x35b4b6(0x35c)];_0x17ba2e=_0x17ba2e['replace'](/\x1I\[(\d+)\]/gi,''),_0x17ba2e=_0x17ba2e[_0x35b4b6(0x26e)](/\\I\[(\d+)\]/gi,''),this[_0x35b4b6(0x53b)][_0x17ba2e[_0x35b4b6(0x63a)]()[_0x35b4b6(0x3cc)]()]=_0xe2f1be['id'];}else this[_0x35b4b6(0x2d0)]();}return this[_0x35b4b6(0x53b)][_0x2110b0]||0x0;},DataManager[_0x26e348(0x5ef)]=function(_0x56481a){const _0x35b0fe=_0x26e348;_0x56481a=_0x56481a[_0x35b0fe(0x63a)]()['trim'](),this[_0x35b0fe(0x60a)]=this[_0x35b0fe(0x60a)]||{};if(this[_0x35b0fe(0x60a)][_0x56481a])return this[_0x35b0fe(0x60a)][_0x56481a];for(const _0x4c833c of $dataSkills){if('DRHRv'===_0x35b0fe(0x4b1)){if(!_0x4c833c)continue;this[_0x35b0fe(0x60a)][_0x4c833c[_0x35b0fe(0x35c)][_0x35b0fe(0x63a)]()[_0x35b0fe(0x3cc)]()]=_0x4c833c['id'];}else return _0x2e8a5f['ItemsEquipsCore'][_0x35b0fe(0x307)][_0x35b0fe(0x62d)](this);}return this[_0x35b0fe(0x60a)][_0x56481a]||0x0;},DataManager[_0x26e348(0x28a)]=function(_0x3b7fd5){const _0x444de7=_0x26e348;_0x3b7fd5=_0x3b7fd5[_0x444de7(0x63a)]()[_0x444de7(0x3cc)](),this['_itemIDs']=this['_itemIDs']||{};if(this['_itemIDs'][_0x3b7fd5])return this[_0x444de7(0x210)][_0x3b7fd5];for(const _0x572055 of $dataItems){if(!_0x572055)continue;this['_itemIDs'][_0x572055[_0x444de7(0x35c)][_0x444de7(0x63a)]()['trim']()]=_0x572055['id'];}return this[_0x444de7(0x210)][_0x3b7fd5]||0x0;},DataManager[_0x26e348(0x5bc)]=function(_0x144a3c){const _0x324c5d=_0x26e348;_0x144a3c=_0x144a3c['toUpperCase']()['trim'](),this[_0x324c5d(0x52c)]=this[_0x324c5d(0x52c)]||{};if(this['_weaponIDs'][_0x144a3c])return this[_0x324c5d(0x52c)][_0x144a3c];for(const _0x403a2f of $dataWeapons){if(_0x324c5d(0x332)===_0x324c5d(0x332)){if(!_0x403a2f)continue;this['_weaponIDs'][_0x403a2f['name']['toUpperCase']()[_0x324c5d(0x3cc)]()]=_0x403a2f['id'];}else _0x5d8b8a=_0x324c5d(0x62f)[_0x324c5d(0x43f)](_0x5722e5['id']);}return this[_0x324c5d(0x52c)][_0x144a3c]||0x0;},DataManager[_0x26e348(0x4e3)]=function(_0x2a5538){const _0x47efae=_0x26e348;_0x2a5538=_0x2a5538[_0x47efae(0x63a)]()['trim'](),this['_armorIDs']=this[_0x47efae(0x27a)]||{};if(this[_0x47efae(0x27a)][_0x2a5538])return this[_0x47efae(0x27a)][_0x2a5538];for(const _0x1628cd of $dataArmors){if(_0x47efae(0x55f)!==_0x47efae(0x55f)){const _0x2c3c41=_0x4b3a39(_0x1c0b99['$1'])[_0x47efae(0x1b6)](',')[_0x47efae(0x499)](_0x3e80b4=>_0x1de5b7(_0x3e80b4));for(const _0x3c6e17 of _0x2c3c41){_0xcc6ece[_0x47efae(0x39d)](_0x3c6e17,!![]);}}else{if(!_0x1628cd)continue;this[_0x47efae(0x27a)][_0x1628cd[_0x47efae(0x35c)]['toUpperCase']()[_0x47efae(0x3cc)]()]=_0x1628cd['id'];}}return this['_armorIDs'][_0x2a5538]||0x0;},DataManager[_0x26e348(0x33d)]=function(_0x515c11){const _0x4afcf6=_0x26e348;_0x515c11=_0x515c11[_0x4afcf6(0x63a)]()[_0x4afcf6(0x3cc)](),this['_etypeIDs']=this[_0x4afcf6(0x494)]||{};if(this[_0x4afcf6(0x494)][_0x515c11])return this[_0x4afcf6(0x494)][_0x515c11];for(const _0x237801 of $dataSystem[_0x4afcf6(0x429)]){if(_0x4afcf6(0x48f)==='mOmyI'){if(_0x17d1fd['_bypassProxy'])return _0x5e8217['ItemsEquipsCore'][_0x4afcf6(0x668)][_0x4afcf6(0x62d)](this);return _0x32f7a9[_0x4afcf6(0x570)](_0x1a443b['ItemsEquipsCore']['Window_ShopBuy_item']['call'](this));}else this[_0x4afcf6(0x494)][_0x237801[_0x4afcf6(0x63a)]()[_0x4afcf6(0x3cc)]()]=$dataSystem['equipTypes'][_0x4afcf6(0x43b)](_0x237801);}return this[_0x4afcf6(0x494)][_0x515c11]||0x0;},VisuMZ[_0x26e348(0x340)][_0x26e348(0x3e4)]=function(){const _0x384fab=_0x26e348;VisuMZ[_0x384fab(0x340)][_0x384fab(0x5dd)]($dataItems),VisuMZ[_0x384fab(0x340)][_0x384fab(0x5dd)]($dataWeapons),VisuMZ[_0x384fab(0x340)][_0x384fab(0x5dd)]($dataArmors);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x5dd)]=function(_0x94b2b1){const _0x356bdb=_0x26e348;for(const _0x4079e1 of _0x94b2b1){if('AmJWR'===_0x356bdb(0x2ce))this[_0x356bdb(0x217)][_0x3ab825['id']][_0x356bdb(0x270)](_0x3ee211);else{if(!_0x4079e1)continue;if(!DataManager['isProxyItem'](_0x4079e1))continue;const _0x343a8d=DataManager[_0x356bdb(0x570)](_0x4079e1),_0x9e50b7=['name','iconIndex',_0x356bdb(0x254)];for(const _0x59147e of _0x9e50b7){_0x4079e1[_0x59147e]=_0x343a8d[_0x59147e];}}}},DataManager[_0x26e348(0x613)]=function(_0x48f62e){const _0x929d68=_0x26e348;if(!_0x48f62e)return![];if(!_0x48f62e[_0x929d68(0x545)])return![];return _0x48f62e&&_0x48f62e[_0x929d68(0x545)]['match'](/<PROXY:[ ](.*)>/i);},DataManager[_0x26e348(0x570)]=function(_0x512251){const _0x44e477=_0x26e348;return this['isProxyItem'](_0x512251)?this[_0x44e477(0x223)](_0x512251)||_0x512251:_0x512251;},DataManager[_0x26e348(0x223)]=function(_0xa7b45a){const _0x3500f9=_0x26e348;_0xa7b45a[_0x3500f9(0x545)][_0x3500f9(0x28b)](/<PROXY:[ ](.*)>/i);const _0x2a0607=RegExp['$1'][_0x3500f9(0x3cc)](),_0x539352=/^\d+$/[_0x3500f9(0x45b)](_0x2a0607);if(this['isItem'](_0xa7b45a)){const _0x5ac05a=_0x539352?Number(_0x2a0607):DataManager[_0x3500f9(0x28a)](_0x2a0607);return $dataItems[_0x5ac05a]||_0xa7b45a;}else{if(this['isWeapon'](_0xa7b45a)){if(_0x3500f9(0x17d)!==_0x3500f9(0x2aa)){const _0x1f7bf2=_0x539352?Number(_0x2a0607):DataManager[_0x3500f9(0x5bc)](_0x2a0607);return $dataWeapons[_0x1f7bf2]||_0xa7b45a;}else this[_0x3500f9(0x16b)][_0x3500f9(0x270)](new _0x200b0e());}else{if(this[_0x3500f9(0x33c)](_0xa7b45a)){const _0x2ce0fa=_0x539352?Number(_0x2a0607):DataManager['getArmorIdWithName'](_0x2a0607);return $dataArmors[_0x2ce0fa]||_0xa7b45a;}}}return _0xa7b45a;},VisuMZ['ItemsEquipsCore'][_0x26e348(0x4ab)]=Window_ItemList[_0x26e348(0x462)][_0x26e348(0x546)],Window_ItemList[_0x26e348(0x462)][_0x26e348(0x546)]=function(){const _0x127e61=_0x26e348;if($gameTemp[_0x127e61(0x54b)])return VisuMZ[_0x127e61(0x340)][_0x127e61(0x4ab)][_0x127e61(0x62d)](this);return DataManager[_0x127e61(0x570)](VisuMZ[_0x127e61(0x340)]['Window_ItemList_item'][_0x127e61(0x62d)](this));},Window_ItemList[_0x26e348(0x462)][_0x26e348(0x2f4)]=function(){const _0x45ef83=_0x26e348;return VisuMZ[_0x45ef83(0x340)]['Window_ItemList_item'][_0x45ef83(0x62d)](this);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x668)]=Window_ShopBuy[_0x26e348(0x462)]['item'],Window_ShopBuy[_0x26e348(0x462)][_0x26e348(0x546)]=function(){const _0x1eb934=_0x26e348;if($gameTemp['_bypassProxy'])return VisuMZ[_0x1eb934(0x340)]['Window_ShopBuy_item'][_0x1eb934(0x62d)](this);return DataManager[_0x1eb934(0x570)](VisuMZ[_0x1eb934(0x340)][_0x1eb934(0x668)][_0x1eb934(0x62d)](this));},Window_ShopBuy[_0x26e348(0x462)][_0x26e348(0x2f4)]=function(){const _0x2cd6f3=_0x26e348;return VisuMZ[_0x2cd6f3(0x340)][_0x2cd6f3(0x668)][_0x2cd6f3(0x62d)](this);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x190)]=Game_Item[_0x26e348(0x462)][_0x26e348(0x1c0)],Game_Item[_0x26e348(0x462)][_0x26e348(0x1c0)]=function(_0x20cdb2){const _0x3ea024=_0x26e348;if(DataManager[_0x3ea024(0x613)](_0x20cdb2))return;VisuMZ['ItemsEquipsCore'][_0x3ea024(0x190)][_0x3ea024(0x62d)](this,_0x20cdb2);},VisuMZ['ItemsEquipsCore'][_0x26e348(0x46a)]=function(){const _0x23cfc1=_0x26e348;this[_0x23cfc1(0x461)]={'partyArtifactIDs':[],'troopArtifactIDs':[]};for(const _0x5af7ab of $dataArmors){if(!_0x5af7ab)continue;if(!DataManager[_0x23cfc1(0x1fd)](_0x5af7ab))continue;DataManager[_0x23cfc1(0x27d)](_0x5af7ab)&&this[_0x23cfc1(0x461)]['partyArtifactIDs'][_0x23cfc1(0x270)](_0x5af7ab['id']),DataManager[_0x23cfc1(0x31a)](_0x5af7ab)&&this[_0x23cfc1(0x461)][_0x23cfc1(0x369)][_0x23cfc1(0x270)](_0x5af7ab['id']);}},DataManager[_0x26e348(0x1fd)]=function(_0x259e03){const _0x3cd5bb=_0x26e348;if(!this[_0x3cd5bb(0x33c)](_0x259e03))return![];const _0x7ece53=_0x259e03[_0x3cd5bb(0x545)];if(!_0x7ece53)return![];if(_0x7ece53[_0x3cd5bb(0x28b)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x7ece53[_0x3cd5bb(0x28b)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x7ece53[_0x3cd5bb(0x28b)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x7ece53[_0x3cd5bb(0x28b)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x26e348(0x1d1)]=function(_0x44bc01){const _0x38eaf9=_0x26e348;if(!this['isArtifact'](_0x44bc01))return![];const _0x1dafab=_0x44bc01[_0x38eaf9(0x545)];if(!_0x1dafab)return![];if(_0x1dafab[_0x38eaf9(0x28b)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x1dafab[_0x38eaf9(0x28b)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x26e348(0x27d)]=function(_0xb24f2e){const _0x3b46b7=_0x26e348;if(!this['isArtifact'](_0xb24f2e))return![];const _0x5a1e14=_0xb24f2e[_0x3b46b7(0x545)];if(!_0x5a1e14)return![];if(_0x5a1e14[_0x3b46b7(0x28b)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x5a1e14[_0x3b46b7(0x28b)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager['isTroopArtifact']=function(_0x14f5e8){const _0x82874a=_0x26e348;if(!this['isArtifact'](_0x14f5e8))return![];const _0x2744d0=_0x14f5e8[_0x82874a(0x545)];if(!_0x2744d0)return![];if(_0x2744d0[_0x82874a(0x28b)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x2744d0['match'](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},VisuMZ[_0x26e348(0x340)][_0x26e348(0x56b)]=Game_BattlerBase['prototype'][_0x26e348(0x274)],Game_BattlerBase['prototype']['canEquip']=function(_0x40d7c6){const _0x39fd18=_0x26e348;if(DataManager['isArtifact'](_0x40d7c6))return![];if(!DataManager['meetsClassRequirements'](this,_0x40d7c6))return![];if(!DataManager[_0x39fd18(0x4bf)](this,_0x40d7c6))return![];return VisuMZ['ItemsEquipsCore'][_0x39fd18(0x56b)][_0x39fd18(0x62d)](this,_0x40d7c6);},VisuMZ[_0x26e348(0x340)]['Game_BattlerBase_param_artifact']=Game_BattlerBase['prototype']['param'],Game_BattlerBase['prototype'][_0x26e348(0x285)]=function(_0x203bc9){const _0x5c29ff=_0x26e348;this['_allowArtifactParamBase']=!![];const _0x268dab=VisuMZ['ItemsEquipsCore'][_0x5c29ff(0x4b3)][_0x5c29ff(0x62d)](this,_0x203bc9);return this[_0x5c29ff(0x237)]=undefined,_0x268dab;},VisuMZ[_0x26e348(0x340)][_0x26e348(0x625)]=Game_Actor['prototype'][_0x26e348(0x68b)],Game_Actor['prototype']['traitObjects']=function(){const _0x7f5b38=_0x26e348;this[_0x7f5b38(0x1f9)]=!![];const _0x44c7ec=VisuMZ[_0x7f5b38(0x340)]['Game_Actor_artifact'][_0x7f5b38(0x62d)](this);return this['_allowArtifactTraitObjects']=undefined,_0x44c7ec;},VisuMZ[_0x26e348(0x340)][_0x26e348(0x23e)]=Game_Actor[_0x26e348(0x462)]['equips'],Game_Actor[_0x26e348(0x462)][_0x26e348(0x2e9)]=function(){const _0x1add86=_0x26e348,_0x3432e9=VisuMZ['ItemsEquipsCore'][_0x1add86(0x23e)]['call'](this);if(this['_allowArtifactTraitObjects']||this[_0x1add86(0x237)]){const _0x4a5f27=_0x3432e9[_0x1add86(0x605)]($gameParty['partyArtifacts']());return _0x4a5f27;}else return _0x3432e9;},VisuMZ[_0x26e348(0x340)][_0x26e348(0x450)]=Game_BattlerBase[_0x26e348(0x462)]['paramPlus'],Game_BattlerBase[_0x26e348(0x462)][_0x26e348(0x514)]=function(_0x59104e){const _0x124cce=_0x26e348;let _0x462c3b=VisuMZ[_0x124cce(0x340)][_0x124cce(0x450)]['call'](this,_0x59104e);if(this[_0x124cce(0x198)]===Game_Enemy){if(_0x124cce(0x15f)!==_0x124cce(0x212))for(const _0x5d9f66 of $gameParty[_0x124cce(0x5a0)]()){if(_0x124cce(0x322)!==_0x124cce(0x322))return _0x6bc902[_0x124cce(0x340)][_0x124cce(0x1fa)][_0x124cce(0x45d)]['EnableLayout'];else{if(_0x5d9f66)_0x462c3b+=_0x5d9f66[_0x124cce(0x408)][_0x59104e];}}else return this[_0x124cce(0x297)]?this['maxItems']():0x4;}return _0x462c3b;},VisuMZ['ItemsEquipsCore'][_0x26e348(0x1ed)]=Game_Enemy['prototype'][_0x26e348(0x68b)],Game_Enemy['prototype'][_0x26e348(0x68b)]=function(){const _0xb9e1bd=_0x26e348;let _0xa37996=VisuMZ[_0xb9e1bd(0x340)][_0xb9e1bd(0x1ed)][_0xb9e1bd(0x62d)](this);return _0xa37996[_0xb9e1bd(0x605)]($gameParty[_0xb9e1bd(0x5a0)]());},VisuMZ[_0x26e348(0x340)][_0x26e348(0x255)]=Game_Party[_0x26e348(0x462)][_0x26e348(0x614)],Game_Party['prototype'][_0x26e348(0x614)]=function(_0xba21be,_0x1505d9,_0x4219a1){const _0x4e93c7=_0x26e348;VisuMZ[_0x4e93c7(0x340)][_0x4e93c7(0x255)][_0x4e93c7(0x62d)](this,_0xba21be,_0x1505d9,_0x4219a1);if(DataManager[_0x4e93c7(0x1fd)](_0xba21be)){let _0x518560=$gameParty[_0x4e93c7(0x38c)]();if($gameParty[_0x4e93c7(0x503)]())_0x518560=_0x518560[_0x4e93c7(0x605)]($gameTroop[_0x4e93c7(0x2ee)]());for(const _0x462194 of _0x518560){if(!_0x462194)continue;_0x462194[_0x4e93c7(0x373)]={};}}},Game_Party[_0x26e348(0x462)]['partyArtifacts']=function(){const _0x329ab9=_0x26e348;let _0x592f0e=[];const _0x26bc56=VisuMZ[_0x329ab9(0x340)][_0x329ab9(0x461)][_0x329ab9(0x64b)];if(_0x26bc56)for(const _0x12caad of _0x26bc56){if(_0x329ab9(0x695)!=='azWyE'){const _0x1ddf36=_0x329ab9(0x240);if(this[_0x329ab9(0x4cf)][_0x329ab9(0x2db)]<=0x0&&this[_0x329ab9(0x4cf)]['flatMP']<=0x0&&!this[_0x329ab9(0x529)][_0x1ddf36])return![];const _0x37af02=this['getItemEffectsMpRecoveryLabel']();this['drawItemKeyData'](_0x37af02,_0xff05a0,_0x1619f9,_0x3edcbf,!![]);const _0x37a5db=this[_0x329ab9(0x25e)]();return this[_0x329ab9(0x303)](_0x55b3a8[_0x329ab9(0x1e3)](0x3)),this[_0x329ab9(0x349)](_0x37a5db,_0x1fc1e6,_0x24e18d,_0x5f5cc9,![],_0x329ab9(0x652)),this['drawItemDarkRect'](_0x436000,_0x9aa7b8,_0x33f706),this[_0x329ab9(0x587)](),!![];}else{const _0x147208=$dataArmors[_0x12caad];if(!_0x147208)continue;if(!this[_0x329ab9(0x3b9)](_0x147208))continue;let _0xee0d52=0x1;if(DataManager[_0x329ab9(0x1d1)](_0x147208))_0xee0d52=this[_0x329ab9(0x37b)](_0x147208);while(_0xee0d52--)_0x592f0e[_0x329ab9(0x270)](_0x147208);}}return _0x592f0e;},Game_Party[_0x26e348(0x462)]['troopArtifacts']=function(){const _0x387956=_0x26e348;let _0xf2c349=[];const _0x5a7616=VisuMZ[_0x387956(0x340)][_0x387956(0x461)][_0x387956(0x369)];if(_0x5a7616){if(_0x387956(0x2a1)===_0x387956(0x2a1))for(const _0x2cdaf8 of _0x5a7616){if(_0x387956(0x669)===_0x387956(0x264)){const _0x3b6146=_0x42156e['_scene'];if(_0x3b6146&&_0x3b6146[_0x387956(0x343)])return _0x3b6146['user']();return null;}else{const _0x332015=$dataArmors[_0x2cdaf8];if(!_0x332015)continue;if(!this[_0x387956(0x3b9)](_0x332015))continue;let _0x4b7c60=0x1;if(DataManager['isStackableArtifact'](_0x332015))_0x4b7c60=this[_0x387956(0x37b)](_0x332015);while(_0x4b7c60--)_0xf2c349[_0x387956(0x270)](_0x332015);}}else for(const _0x38d0da of _0x3b6a42[_0x387956(0x5a0)]()){if(_0x38d0da)_0x5ed2ad+=_0x38d0da[_0x387956(0x408)][_0x3b7be];}}return _0xf2c349;},Game_Party[_0x26e348(0x462)]['artifacts']=function(){const _0x23ad33=_0x26e348;return this[_0x23ad33(0x477)]()[_0x23ad33(0x605)](this[_0x23ad33(0x5a0)]());},VisuMZ['ItemsEquipsCore']['Game_Party_setupBattleTestItems_artifact']=Game_Party[_0x26e348(0x462)][_0x26e348(0x20c)],Game_Party[_0x26e348(0x462)][_0x26e348(0x20c)]=function(){const _0x297ac2=_0x26e348;VisuMZ[_0x297ac2(0x340)][_0x297ac2(0x227)][_0x297ac2(0x62d)](this),this[_0x297ac2(0x50c)]();},Game_Party[_0x26e348(0x462)]['removeBattleTestArtifacts']=function(){const _0x2d2f8d=_0x26e348,_0x8d9a0b=$gameParty['armors']()[_0x2d2f8d(0x308)](_0x39e3f7=>DataManager[_0x2d2f8d(0x1fd)](_0x39e3f7));for(const _0x5ea3a5 of _0x8d9a0b){if(_0x2d2f8d(0x284)!==_0x2d2f8d(0x284))_0x37b7b0[_0x2d2f8d(0x462)]['isRightInputMode'][_0x2d2f8d(0x62d)](this);else{const _0x58990e=this[_0x2d2f8d(0x37b)](_0x5ea3a5);if(_0x58990e)this['loseItem'](_0x5ea3a5,_0x58990e);}}},DataManager[_0x26e348(0x641)]=function(_0x50ff2c,_0x53085f){const _0x448698=_0x26e348;if(this[_0x448698(0x2bd)](_0x53085f))return![];if(!_0x50ff2c)return![];if($gameTemp[_0x448698(0x523)])return!![];if(BattleManager[_0x448698(0x512)]())return!![];const _0x3a3bd6=this[_0x448698(0x2b7)](_0x53085f);if(_0x3a3bd6['length']<=0x0)return!![];return _0x3a3bd6['includes'](_0x50ff2c[_0x448698(0x370)]()['id']);},DataManager[_0x26e348(0x2b7)]=function(_0x68c9ff){const _0x311468=_0x26e348;if(!_0x68c9ff)return[];this['_getClassRequirements']=this['_getClassRequirements']||{};const _0x141ab6=_0x311468(0x3f5)[_0x311468(0x43f)](this['isWeapon'](_0x68c9ff)?_0x311468(0x617):'ARMOR',_0x68c9ff['id']);if(this['_getClassRequirements'][_0x141ab6]!==undefined){if('OzHuz'==='OzHuz')return this['_getClassRequirements'][_0x141ab6];else{const _0x439f41=0x0,_0x3445ee=this[_0x311468(0x40f)](),_0x58f3d1=_0x2342d8[_0x311468(0x256)],_0x51c9cb=this[_0x311468(0x30d)]();return new _0x519a9c(_0x439f41,_0x3445ee,_0x58f3d1,_0x51c9cb);}}let _0x2c54b2=[];const _0x4c6a9c=_0x68c9ff[_0x311468(0x545)]||'';if(_0x4c6a9c[_0x311468(0x28b)](/<EQUIP FOR CLASS(?:|ES) ONLY:[ ](.*)>/i)){const _0x43d835=String(RegExp['$1'])[_0x311468(0x1b6)](',')[_0x311468(0x499)](_0x52de17=>_0x52de17[_0x311468(0x3cc)]());for(const _0x8f6438 of _0x43d835){const _0x26a95c=/^\d+$/['test'](_0x8f6438);_0x26a95c?_0x2c54b2[_0x311468(0x270)](Number(_0x8f6438)):_0x2c54b2['push'](DataManager['getClassIdWithName'](_0x8f6438));}}return this[_0x311468(0x5f7)][_0x141ab6]=_0x2c54b2,this[_0x311468(0x5f7)][_0x141ab6];},DataManager[_0x26e348(0x4bf)]=function(_0x3fa16b,_0x114de8){const _0x216402=_0x26e348;if(this[_0x216402(0x2bd)](_0x114de8))return![];if(!_0x3fa16b)return![];if($gameTemp['_checkEquipRequirements'])return!![];if(BattleManager[_0x216402(0x512)]())return!![];const _0x1fbcaf=this['getEquipRequirements'](_0x114de8);for(const _0x426cc3 of _0x1fbcaf){if(!this[_0x216402(0x693)](_0x3fa16b,_0x426cc3))return![];}return!![];},DataManager['getEquipRequirements']=function(_0x2fd8c3){const _0x41385a=_0x26e348;if(!_0x2fd8c3)return[];this[_0x41385a(0x467)]=this[_0x41385a(0x467)]||{};const _0x158616=_0x41385a(0x3f5)['format'](this[_0x41385a(0x188)](_0x2fd8c3)?_0x41385a(0x617):_0x41385a(0x4d4),_0x2fd8c3['id']);if(this[_0x41385a(0x467)][_0x158616]!==undefined)return this[_0x41385a(0x467)][_0x158616];let _0xa9704b=[];const _0x474979=_0x2fd8c3['note']||'';return _0x474979[_0x41385a(0x28b)](/<EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>\s*([\s\S]*)\s*<\/EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>/i)&&(_0xa9704b=String(RegExp['$1'])[_0x41385a(0x1b6)](/[\r\n]+/)),this[_0x41385a(0x467)][_0x158616]=_0xa9704b,this[_0x41385a(0x467)][_0x158616];},DataManager[_0x26e348(0x693)]=function(_0x3fd3d6,_0x16e62f){const _0x3f5445=_0x26e348;if(_0x16e62f[_0x3f5445(0x28b)](/(?:LEVEL|LV|LVL)[ ](>|>=|===|<=|<)[ ](\d+)/i)){if(_0x3f5445(0x538)===_0x3f5445(0x676))return 0x63;else{const _0x50159c=String(RegExp['$1'])['trim'](),_0x251548=Number(RegExp['$2']);switch(_0x50159c){case'>':return _0x3fd3d6[_0x3f5445(0x177)]>_0x251548;case'>=':return _0x3fd3d6['level']>=_0x251548;case _0x3f5445(0x449):return _0x3fd3d6[_0x3f5445(0x177)]===_0x251548;case'<=':return _0x3fd3d6[_0x3f5445(0x177)]<=_0x251548;case'<':return _0x3fd3d6[_0x3f5445(0x177)]<_0x251548;}return![];}}if(_0x16e62f['match'](/(MAXHP|MAXMP|MHP|MMP)[ ](>|>=|===|<=|<)[ ](\d+)/i)){if('eFpUx'!==_0x3f5445(0x171)){const _0x93f60d=String(RegExp['$1'])[_0x3f5445(0x1c9)]()[_0x3f5445(0x3cc)](),_0x391cad=String(RegExp['$2'])[_0x3f5445(0x3cc)](),_0x20a8c4=Number(RegExp['$3']);let _0x5137d3=0x0;if([_0x3f5445(0x525),'mmp']['includes'](_0x93f60d))_0x5137d3=0x1;const _0x2057e8=_0x3fd3d6['_paramPlus'][_0x5137d3]||0x0;switch(_0x391cad){case'>':return _0x3fd3d6[_0x3f5445(0x4cb)](_0x5137d3)+_0x2057e8>_0x20a8c4;case'>=':return _0x3fd3d6[_0x3f5445(0x4cb)](_0x5137d3)+_0x2057e8>=_0x20a8c4;case _0x3f5445(0x449):return _0x3fd3d6[_0x3f5445(0x4cb)](_0x5137d3)+_0x2057e8===_0x20a8c4;case'<=':return _0x3fd3d6['paramBase'](_0x5137d3)+_0x2057e8<=_0x20a8c4;case'<':return _0x3fd3d6[_0x3f5445(0x4cb)](_0x5137d3)+_0x2057e8<_0x20a8c4;}return![];}else this['drawItemStyleIconText'](_0x106310);}if(_0x16e62f[_0x3f5445(0x28b)](/(ATK|DEF|MAT|MDF|AGI|LUK)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0xcc68e5=String(RegExp['$1'])[_0x3f5445(0x1c9)]()[_0x3f5445(0x3cc)](),_0x542107=String(RegExp['$2'])[_0x3f5445(0x3cc)](),_0x27237e=Number(RegExp['$3']),_0x4aeb1d=['atk',_0x3f5445(0x663),_0x3f5445(0x3fc),_0x3f5445(0x1e2),'agi',_0x3f5445(0x199)];let _0x3f5b7e=_0x4aeb1d[_0x3f5445(0x43b)](_0xcc68e5)+0x2;if(_0x3f5b7e<0x2)return![];const _0x3f7b08=_0x3fd3d6[_0x3f5445(0x319)][_0x3f5b7e]||0x0;switch(_0x542107){case'>':return _0x3fd3d6[_0x3f5445(0x4cb)](_0x3f5b7e)+_0x3f7b08>_0x27237e;case'>=':return _0x3fd3d6[_0x3f5445(0x4cb)](_0x3f5b7e)+_0x3f7b08>=_0x27237e;case _0x3f5445(0x449):return _0x3fd3d6['paramBase'](_0x3f5b7e)+_0x3f7b08===_0x27237e;case'<=':return _0x3fd3d6[_0x3f5445(0x4cb)](_0x3f5b7e)+_0x3f7b08<=_0x27237e;case'<':return _0x3fd3d6[_0x3f5445(0x4cb)](_0x3f5b7e)+_0x3f7b08<_0x27237e;}return![];}if(_0x16e62f[_0x3f5445(0x28b)](/LEARNED SKILL:[ ](\d+)/i)){const _0x5dda3a=Number(RegExp['$1']);return _0x3fd3d6['isLearnedSkill'](_0x5dda3a);}else{if(_0x16e62f[_0x3f5445(0x28b)](/LEARNED SKILL:[ ](.*)/i)){if(_0x3f5445(0x485)===_0x3f5445(0x485)){const _0x4d4cfd=String(RegExp['$1']),_0x45f851=this[_0x3f5445(0x5ef)](_0x4d4cfd);return _0x3fd3d6[_0x3f5445(0x67c)](_0x45f851);}else _0x4ba71e(_0x3f5445(0x4d8)[_0x3f5445(0x43f)](_0x2a033a,_0x180dbb)),_0x1b4795[_0x3f5445(0x45a)]();}}if(_0x16e62f[_0x3f5445(0x28b)](/SWITCH:[ ](\d+)/i)){const _0x16d572=Number(RegExp['$1']);return $gameSwitches[_0x3f5445(0x4b9)](_0x16d572);}return!![];},DataManager[_0x26e348(0x196)]=function(_0x28d823){const _0x4c9ca0=_0x26e348;return this[_0x4c9ca0(0x33c)](_0x28d823)?this[_0x4c9ca0(0x202)](_0x28d823):[_0x28d823[_0x4c9ca0(0x263)]||0x0];},DataManager[_0x26e348(0x202)]=function(_0x6a50fd){const _0x4fbb71=_0x26e348;this['_cache_etypeIDs']=this[_0x4fbb71(0x217)]||{};if(this[_0x4fbb71(0x217)][_0x6a50fd['id']]!==undefined)return this[_0x4fbb71(0x217)][_0x6a50fd['id']];this['_cache_etypeIDs'][_0x6a50fd['id']]=[_0x6a50fd[_0x4fbb71(0x263)]||0x0];const _0xc3cf86=_0x6a50fd[_0x4fbb71(0x545)]||'';if(_0xc3cf86[_0x4fbb71(0x28b)](/<ADDED ETYPE(?:|S):[ ](.*)>/i)){const _0x4c3c0f=String(RegExp['$1'])[_0x4fbb71(0x1b6)](',')['map'](_0x3aa154=>_0x3aa154[_0x4fbb71(0x3cc)]());for(const _0x4ea759 of _0x4c3c0f){if(_0x4fbb71(0x5b5)!=='mEcCd'){const _0x393c6f=/^\d+$/[_0x4fbb71(0x45b)](_0x4ea759);let _0x208d37=0x0;_0x393c6f?_0x208d37=Number(_0x4ea759):_0x208d37=this[_0x4fbb71(0x33d)](_0x4ea759);if(_0x208d37>0x1){if('xgkIn'===_0x4fbb71(0x3a9))this[_0x4fbb71(0x217)][_0x6a50fd['id']][_0x4fbb71(0x270)](_0x208d37);else{const _0x49ab66=_0x59ebf1[_0x4fbb71(0x429)][_0x4fbb71(0x43b)](_0x2516e9(_0x2217c5['$1'])['trim']());return _0x3d2c93[_0x4fbb71(0x33c)](_0x1ad1d6)&&_0x368644[_0x4fbb71(0x263)]===_0x49ab66;}}}else return _0xc3e7d[_0x4fbb71(0x340)][_0x4fbb71(0x1fa)][_0x4fbb71(0x1da)][_0x4fbb71(0x248)];}}return this['_cache_etypeIDs'][_0x6a50fd['id']];},Game_BattlerBase['prototype']['canEquipArmor']=function(_0x388151){const _0x1b14b6=_0x26e348;return this[_0x1b14b6(0x5a1)](_0x388151[_0x1b14b6(0x5df)])&&!this[_0x1b14b6(0x168)](_0x388151[_0x1b14b6(0x263)])&&DataManager[_0x1b14b6(0x196)](_0x388151)[_0x1b14b6(0x67b)](_0x2d3438=>!this[_0x1b14b6(0x168)](_0x2d3438));},DataManager[_0x26e348(0x549)]=function(_0x4a93b5){const _0x17eca2=_0x26e348;if(!this[_0x17eca2(0x188)](_0x4a93b5)&&!this['isArmor'](_0x4a93b5))return![];if(Imported['VisuMZ_2_WeaponSwapSystem']&&this[_0x17eca2(0x188)](_0x4a93b5))return![];if(!_0x4a93b5['note'])return![];return _0x4a93b5[_0x17eca2(0x545)]['match'](/<CURSED>/i);},DataManager['getPurifyTransformation']=function(_0x4ecce9){const _0x4df979=_0x26e348;if(!_0x4ecce9)return _0x4ecce9;if(!this[_0x4df979(0x188)](_0x4ecce9)&&!this[_0x4df979(0x33c)](_0x4ecce9))return _0x4ecce9;if(_0x4ecce9[_0x4df979(0x545)]['match'](/<PURIFY TRANSFORM:[ ](.*)>/i)){const _0x114296=String(RegExp['$1'])[_0x4df979(0x3cc)](),_0x1216f2=/^\d+$/[_0x4df979(0x45b)](_0x114296);if(_0x1216f2){if('VsAEB'!==_0x4df979(0x5a6))this[_0x4df979(0x552)](_0x18419b[_0x4df979(0x3d5)]('up'));else{if(this[_0x4df979(0x188)](_0x4ecce9))return $dataWeapons[Number(_0x114296)];if(this[_0x4df979(0x33c)](_0x4ecce9))return $dataArmors[Number(_0x114296)];}}else{if(_0x4df979(0x3d3)!=='fpeVn')return this['categoryWindowRectItemsEquipsCore']();else{if(this['isWeapon'](_0x4ecce9))return $dataWeapons[this[_0x4df979(0x5bc)](_0x114296)];if(this[_0x4df979(0x33c)](_0x4ecce9))return $dataArmors[this['getArmorIdWithName'](_0x114296)];}}}return _0x4ecce9;},Game_Party[_0x26e348(0x462)][_0x26e348(0x5e8)]=function(){const _0x16d009=_0x26e348,_0x30a322=this[_0x16d009(0x38c)]();for(const _0x15c7eb of _0x30a322){if(!_0x15c7eb)continue;_0x15c7eb['purifyCursedEquips']();}},Game_Actor['prototype']['purifyCursedEquips']=function(){const _0x31f898=_0x26e348,_0x169ecb=this[_0x31f898(0x560)]()['length'];for(let _0x2713e6=0x0;_0x2713e6<_0x169ecb;_0x2713e6++){const _0x1bd668=this[_0x31f898(0x16b)][_0x2713e6];if(!_0x1bd668)continue;const _0xdb35cf=_0x1bd668['object']();if(!DataManager[_0x31f898(0x549)](_0xdb35cf))continue;let _0x539fc8=DataManager[_0x31f898(0x1b5)](_0xdb35cf);if(this[_0x31f898(0x2dc)](_0xdb35cf,_0x539fc8))_0x31f898(0x411)===_0x31f898(0x356)?_0x3da00c=_0x31f898(0x5c4)['format'](_0x38edb0['id']):(this[_0x31f898(0x16b)][_0x2713e6][_0x31f898(0x1c0)](_0x539fc8),this[_0x31f898(0x3ef)]());else{if(_0x31f898(0x4a1)!=='UTvmB')return![];else this[_0x31f898(0x553)](_0x2713e6,null);}}},Game_Actor[_0x26e348(0x462)][_0x26e348(0x2dc)]=function(_0x2b7f39,_0x5d9b8c){const _0x26608d=_0x26e348;if(_0x2b7f39===_0x5d9b8c)return![];const _0x2071e5=DataManager['getEtypeIDs'](_0x5d9b8c);if(!_0x2071e5[_0x26608d(0x176)](_0x2b7f39[_0x26608d(0x263)]))return![];if(DataManager['isWeapon'](_0x5d9b8c))return this[_0x26608d(0x479)](_0x5d9b8c['wtypeId']);else{if(DataManager['isArmor'](_0x5d9b8c))return this[_0x26608d(0x5a1)](_0x5d9b8c[_0x26608d(0x5df)]);}return![];},TextManager[_0x26e348(0x444)]={'helpDesc':{'equip':VisuMZ[_0x26e348(0x340)]['Settings'][_0x26e348(0x35e)][_0x26e348(0x473)]??'Pick\x20and\x20choose\x20equipment\x20to\x20change.','optimize':VisuMZ[_0x26e348(0x340)][_0x26e348(0x1fa)][_0x26e348(0x35e)]['optimizeCmdDesc']??_0x26e348(0x5dc),'clear':VisuMZ[_0x26e348(0x340)]['Settings'][_0x26e348(0x35e)][_0x26e348(0x3f4)]??_0x26e348(0x3c5)}},ColorManager[_0x26e348(0x1b8)]=function(_0x881165){const _0xa7d5cf=_0x26e348;if(!_0x881165)return this['normalColor']();else{if(_0x881165[_0xa7d5cf(0x545)][_0xa7d5cf(0x28b)](/<COLOR:[ ](\d+)>/i))return this[_0xa7d5cf(0x36c)](Number(RegExp['$1'])[_0xa7d5cf(0x1a5)](0x0,0x1f));else{if(_0x881165[_0xa7d5cf(0x545)][_0xa7d5cf(0x28b)](/<COLOR:[ ]#(.*)>/i))return'#'+String(RegExp['$1']);else{if(_0xa7d5cf(0x4a8)!==_0xa7d5cf(0x58f))return this['normalColor']();else{if(!this[_0xa7d5cf(0x2cf)]())return![];if(!this[_0xa7d5cf(0x40c)]())return![];if(!this[_0xa7d5cf(0x320)])return![];if(!this[_0xa7d5cf(0x320)][_0xa7d5cf(0x4de)])return![];return this[_0xa7d5cf(0x2cf)]()&&this[_0xa7d5cf(0x40c)]();}}}}},ColorManager[_0x26e348(0x301)]=function(_0x52446e){const _0x4f2b07=_0x26e348;return _0x52446e=String(_0x52446e),_0x52446e[_0x4f2b07(0x28b)](/#(.*)/i)?_0x4f2b07(0x5d8)[_0x4f2b07(0x43f)](String(RegExp['$1'])):this[_0x4f2b07(0x36c)](Number(_0x52446e));},SceneManager['isSceneShop']=function(){const _0x3fef81=_0x26e348;return this['_scene']&&this[_0x3fef81(0x2e5)][_0x3fef81(0x198)]===Scene_Shop;},Game_Temp[_0x26e348(0x462)][_0x26e348(0x689)]=function(){const _0x4a7506=_0x26e348;if(this[_0x4a7506(0x20e)])return![];return VisuMZ[_0x4a7506(0x340)][_0x4a7506(0x1fa)]['New'][_0x4a7506(0x1ac)];},VisuMZ[_0x26e348(0x24b)]=VisuMZ[_0x26e348(0x340)][_0x26e348(0x1fa)][_0x26e348(0x1da)]['MultiplierStandard'],VisuMZ[_0x26e348(0x340)]['Game_BattlerBase_param']=Game_BattlerBase['prototype']['param'],Game_BattlerBase[_0x26e348(0x462)]['param']=function(_0x3eb79b){const _0x319088=_0x26e348;return this[_0x319088(0x16a)]?'RWDTA'!==_0x319088(0x5f8)?this[_0x319088(0x1ba)]?VisuMZ[_0x319088(0x24b)]:0x1:_0x46604c[_0x319088(0x340)][_0x319088(0x593)][_0x319088(0x62d)](this):VisuMZ['ItemsEquipsCore'][_0x319088(0x54a)][_0x319088(0x62d)](this,_0x3eb79b);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x533)]=Game_BattlerBase['prototype'][_0x26e348(0x537)],Game_BattlerBase[_0x26e348(0x462)][_0x26e348(0x537)]=function(_0x23155c){const _0x595ae1=_0x26e348;if(!_0x23155c)return![];if(!VisuMZ[_0x595ae1(0x340)][_0x595ae1(0x533)][_0x595ae1(0x62d)](this,_0x23155c))return![];if(!this[_0x595ae1(0x407)](_0x23155c))return![];if(!this['meetsItemConditionsJS'](_0x23155c))return![];return!![];},Game_BattlerBase[_0x26e348(0x462)]['meetsItemConditionsNotetags']=function(_0x4308b2){const _0xd5bf01=_0x26e348;if(!this[_0xd5bf01(0x172)](_0x4308b2))return![];return!![];},Game_BattlerBase[_0x26e348(0x462)][_0x26e348(0x172)]=function(_0x323c1a){const _0x53fae1=_0x26e348,_0x58f650=_0x323c1a[_0x53fae1(0x545)];if(_0x58f650[_0x53fae1(0x28b)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x176719=JSON[_0x53fae1(0x508)]('['+RegExp['$1'][_0x53fae1(0x28b)](/\d+/g)+']');for(const _0x2d6f5a of _0x176719){if(!$gameSwitches[_0x53fae1(0x4b9)](_0x2d6f5a))return![];}return!![];}if(_0x58f650[_0x53fae1(0x28b)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x53fae1(0x37f)==='jUwoa'){const _0x3b8551=_0x117191[_0x53fae1(0x340)][_0x53fae1(0x1fa)][_0x53fae1(0x1da)][_0x53fae1(0x4c1)];return _0x3b8551[_0x53fae1(0x43f)](_0x5e4375['mp']);}else{const _0x15d922=JSON[_0x53fae1(0x508)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x49c20b of _0x15d922){if(!$gameSwitches[_0x53fae1(0x4b9)](_0x49c20b))return![];}return!![];}}if(_0x58f650[_0x53fae1(0x28b)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('DAWOC'!=='VgQOO'){const _0xb1dc40=JSON['parse']('['+RegExp['$1'][_0x53fae1(0x28b)](/\d+/g)+']');for(const _0x1fb175 of _0xb1dc40){if($gameSwitches['value'](_0x1fb175))return!![];}return![];}else _0x91dc98[_0x53fae1(0x664)]('right')&&this['cursorRight'](_0x66c6f0[_0x53fae1(0x3d5)](_0x53fae1(0x652))),_0x515281['isRepeated'](_0x53fae1(0x569))&&this[_0x53fae1(0x2a8)](_0x311723[_0x53fae1(0x3d5)](_0x53fae1(0x569)));}if(_0x58f650['match'](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x35a117=JSON[_0x53fae1(0x508)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5ca2ae of _0x35a117){if(!$gameSwitches[_0x53fae1(0x4b9)](_0x5ca2ae))return!![];}return![];}if(_0x58f650[_0x53fae1(0x28b)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x55b7c2=JSON['parse']('['+RegExp['$1'][_0x53fae1(0x28b)](/\d+/g)+']');for(const _0x4f8935 of _0x55b7c2){if(_0x53fae1(0x244)!=='LRWDx')this[_0x53fae1(0x3ae)]=this[_0x53fae1(0x3ae)]||0x0,this[_0x53fae1(0x30e)][_0x53fae1(0x15e)](this['_buyWindowLastIndex']);else{if(!$gameSwitches['value'](_0x4f8935))return!![];}}return![];}if(_0x58f650[_0x53fae1(0x28b)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xf93975=JSON[_0x53fae1(0x508)]('['+RegExp['$1'][_0x53fae1(0x28b)](/\d+/g)+']');for(const _0x2709cb of _0xf93975){if($gameSwitches[_0x53fae1(0x4b9)](_0x2709cb))return![];}return!![];}return!![];},Game_BattlerBase[_0x26e348(0x462)]['meetsItemConditionsJS']=function(_0x50644e){const _0x38b579=_0x26e348,_0x1dde79=_0x50644e[_0x38b579(0x545)],_0x189c64=VisuMZ[_0x38b579(0x340)]['itemEnableJS'];return _0x189c64[_0x50644e['id']]?_0x38b579(0x62b)===_0x38b579(0x413)?this['_item'][_0x38b579(0x5c6)]:_0x189c64[_0x50644e['id']]['call'](this,_0x50644e):!![];},Game_Actor[_0x26e348(0x462)][_0x26e348(0x2f7)]=function(_0x5618fd){const _0x26861c=_0x26e348;_0x5618fd=this[_0x26861c(0x3ed)](_0x5618fd);const _0x178ae4=this['equipSlots']();this[_0x26861c(0x16b)]=[];for(let _0x55f68b=0x0;_0x55f68b<_0x178ae4[_0x26861c(0x571)];_0x55f68b++){if(_0x26861c(0x3bf)===_0x26861c(0x3bf))this[_0x26861c(0x16b)][_0x55f68b]=new Game_Item();else{this[_0x26861c(0x587)](),this[_0x26861c(0x439)]['fontSize']=this['smallParamFontSize']();let _0x411dfe=this[_0x26861c(0x50b)](_0x893337['param'](_0x9935e0))+0x4+_0x437810;return _0x5ac3e2[_0x26861c(0x454)]?(this[_0x26861c(0x17a)](_0x44b379,_0x26cb71,_0x301bca,_0xedd19,!![]),_0x51d166['CoreEngine'][_0x26861c(0x1fa)][_0x26861c(0x48e)][_0x26861c(0x1b4)]&&(_0x411dfe+=_0x23d9de[_0x26861c(0x4f5)]+0x4)):(this[_0x26861c(0x303)](_0x58ca35[_0x26861c(0x1c8)]()),this['drawText'](_0x15e2a6[_0x26861c(0x285)](_0xdd4f69),_0x3286ca,_0xb338ab,_0x444461)),this[_0x26861c(0x587)](),_0x411dfe;}}for(let _0x15fa55=0x0;_0x15fa55<_0x178ae4['length'];_0x15fa55++){const _0x328b70=_0x178ae4[_0x15fa55],_0xf2785d=this['getMatchingInitEquip'](_0x5618fd,_0x328b70);if(this[_0x26861c(0x274)](_0xf2785d))this[_0x26861c(0x16b)][_0x15fa55]['setObject'](_0xf2785d);}this[_0x26861c(0x183)](!![]),this[_0x26861c(0x3ef)]();},Game_Actor[_0x26e348(0x462)][_0x26e348(0x3ed)]=function(_0x2d6f00){const _0x24c7b5=_0x26e348,_0x4c6ff4=[];for(let _0x444473=0x0;_0x444473<_0x2d6f00[_0x24c7b5(0x571)];_0x444473++){const _0x49d012=_0x2d6f00[_0x444473];if(_0x49d012<=0x0)continue;const _0x59f91f=$dataSystem[_0x24c7b5(0x429)][_0x444473+0x1];if(_0x59f91f===$dataSystem[_0x24c7b5(0x429)][0x1]||_0x444473===0x1&&this[_0x24c7b5(0x3e3)]())_0x4c6ff4[_0x24c7b5(0x270)]($dataWeapons[_0x49d012]);else{if(BattleManager['isBattleTest']()){const _0x1c576b=$dataArmors[_0x49d012];_0x1c576b&&_0x1c576b[_0x24c7b5(0x263)]===_0x444473+0x1&&_0x4c6ff4[_0x24c7b5(0x270)](_0x1c576b);}else{if(_0x24c7b5(0x282)===_0x24c7b5(0x4c6))_0x3cae5e[_0x24c7b5(0x462)]['activate'][_0x24c7b5(0x62d)](this),this[_0x24c7b5(0x4b7)]&&this[_0x24c7b5(0x4b7)][_0x24c7b5(0x40c)]()&&this[_0x24c7b5(0x4b7)][_0x24c7b5(0x305)]();else{const _0x518e75=$dataArmors[_0x49d012];_0x518e75&&_0x518e75[_0x24c7b5(0x263)]===_0x444473+0x1&&_0x4c6ff4[_0x24c7b5(0x270)](_0x518e75);}}}}return _0x4c6ff4;},Game_Actor[_0x26e348(0x462)]['getMatchingInitEquip']=function(_0x450547,_0x36161d){const _0x28750d=_0x26e348;for(const _0x36a8d7 of _0x450547){if(_0x28750d(0x611)!=='KvlSY')return this[_0x28750d(0x43a)]();else{if(!_0x36a8d7)continue;if(_0x36a8d7[_0x28750d(0x263)]===_0x36161d)return _0x450547[_0x28750d(0x648)](_0x450547[_0x28750d(0x43b)](_0x36a8d7),0x1),_0x36a8d7;}}return null;},Game_Actor[_0x26e348(0x462)][_0x26e348(0x560)]=function(){const _0x47f232=_0x26e348,_0x2f05b2=VisuMZ[_0x47f232(0x340)]['deepCopy'](this['_forcedSlots']||this['currentClass']()[_0x47f232(0x560)]);if(_0x2f05b2[_0x47f232(0x571)]>=0x2&&this['isDualWield']())_0x2f05b2[0x1]=0x1;return _0x2f05b2;},Game_Actor[_0x26e348(0x462)][_0x26e348(0x1c5)]=function(_0x4cfec6){const _0x390b76=_0x26e348;_0x4cfec6[_0x390b76(0x507)](0x0),_0x4cfec6[_0x390b76(0x507)](-0x1),this[_0x390b76(0x231)]=_0x4cfec6,this[_0x390b76(0x3ef)](),this[_0x390b76(0x1e0)]();},Game_Actor[_0x26e348(0x462)][_0x26e348(0x55a)]=function(){const _0x5c1d23=_0x26e348;this[_0x5c1d23(0x231)]=undefined,this['refresh'](),this['updateChangedSlots']();},Game_Actor[_0x26e348(0x462)][_0x26e348(0x1e0)]=function(){const _0x4d2fc3=_0x26e348;let _0x21b697=this[_0x4d2fc3(0x560)]()['length'];while(this[_0x4d2fc3(0x16b)]['length']>_0x21b697){if('yALol'!==_0x4d2fc3(0x41c)){const _0x264162=this[_0x4d2fc3(0x16b)][this['_equips']['length']-0x1];if(_0x264162&&_0x264162['object']()){if('cUKdN'===_0x4d2fc3(0x2de)){const _0x339da8=this[_0x4d2fc3(0x16b)][_0x5abfe0];if(_0x339da8){const _0x5b3e89=_0x339da8[_0x4d2fc3(0x594)]();if(_0x3c188b[_0x4d2fc3(0x549)](_0x5b3e89))return![];}return _0x29bd5a[_0x4d2fc3(0x340)][_0x4d2fc3(0x257)][_0x4d2fc3(0x62d)](this,_0x3ce491);}else $gameParty[_0x4d2fc3(0x614)](_0x264162[_0x4d2fc3(0x594)](),0x1);}this[_0x4d2fc3(0x16b)][_0x4d2fc3(0x179)]();}else{const _0x2467fe=new _0x5cba08();return _0x167ee6[_0x5020b6]=_0x2467fe,this[_0x4d2fc3(0x41a)](_0x2467fe),_0x2467fe;}}while(_0x21b697>this['_equips'][_0x4d2fc3(0x571)]){this[_0x4d2fc3(0x16b)][_0x4d2fc3(0x270)](new Game_Item());}},Game_Actor[_0x26e348(0x462)][_0x26e348(0x1d8)]=function(){const _0x17d808=_0x26e348,_0x21f0e2=this['equipSlots']();for(let _0x976ef4=0x0;_0x976ef4<_0x21f0e2[_0x17d808(0x571)];_0x976ef4++){if('ArIiI'===_0x17d808(0x167)){if(!this[_0x17d808(0x16b)][_0x976ef4])this[_0x17d808(0x16b)][_0x976ef4]=new Game_Item();}else{_0x89515a[_0x17d808(0x462)][_0x17d808(0x515)][_0x17d808(0x62d)](this);if(this['_commandNameWindow'])this[_0x17d808(0x20d)]();}}this[_0x17d808(0x183)](![]),this['refresh']();},VisuMZ[_0x26e348(0x340)][_0x26e348(0x5e4)]=Game_Actor[_0x26e348(0x462)][_0x26e348(0x553)],Game_Actor[_0x26e348(0x462)][_0x26e348(0x553)]=function(_0xfceee6,_0x142a1a){const _0x3cd7a2=_0x26e348;if(!this[_0x3cd7a2(0x5b2)]){const _0x2e9dab=JsonEx['makeDeepCopy'](this);_0x2e9dab['_tempActor']=!![],this['changeEquipBase'](_0xfceee6,_0x142a1a),this['equipAdjustHpMp'](_0x2e9dab);}else this['changeEquipBase'](_0xfceee6,_0x142a1a);},Game_Actor[_0x26e348(0x462)]['changeEquipBase']=function(_0x166f25,_0x1e66a6){const _0x2dc0f3=_0x26e348;if(!this[_0x2dc0f3(0x64e)](_0x1e66a6,this[_0x2dc0f3(0x2e9)]()[_0x166f25]))return;if(_0x1e66a6){if(_0x2dc0f3(0x2e1)!=='wpaBj'){const _0x2bb496=_0x3ee472(_0x30ecdd['$1']);_0x45c3b7[_0x2dc0f3(0x2d5)]=_0x2c484d,_0x5a5fab[_0x2dc0f3(0x546)]=_0x4ea3be;try{_0x1baa09(_0x2bb496);}catch(_0xa58115){if(_0x167a16[_0x2dc0f3(0x685)]())_0x515b8c[_0x2dc0f3(0x5ab)](_0xa58115);}_0x204965=_0x34463a[_0x2dc0f3(0x2d5)],_0x2499e1[_0x2dc0f3(0x2d5)]=_0x479b6d,_0x22565e[_0x2dc0f3(0x546)]=_0x5de99b;}else{const _0x1676e5=DataManager[_0x2dc0f3(0x196)](_0x1e66a6);if(!_0x1676e5[_0x2dc0f3(0x176)](this[_0x2dc0f3(0x560)]()[_0x166f25]))return;}}this[_0x2dc0f3(0x16b)][_0x166f25][_0x2dc0f3(0x1c0)](_0x1e66a6);if(VisuMZ[_0x2dc0f3(0x340)][_0x2dc0f3(0x578)](_0x1e66a6)){const _0x3290cc=VisuMZ['ItemsEquipsCore'][_0x2dc0f3(0x1fa)][_0x2dc0f3(0x35e)]['CursedTextPopup']||'',_0x13064e=this[_0x2dc0f3(0x35c)](),_0x255048=_0x2dc0f3(0x2a0)[_0x2dc0f3(0x43f)](_0x1e66a6[_0x2dc0f3(0x4b8)]),_0x20447f=_0x1e66a6['name']||'';let _0x24bbd4=_0x3290cc[_0x2dc0f3(0x43f)](_0x13064e,_0x255048,_0x20447f);if(_0x24bbd4[_0x2dc0f3(0x571)]>0x0)$textPopup(_0x24bbd4);}this[_0x2dc0f3(0x3ef)]();},VisuMZ['ItemsEquipsCore']['CheckCursedItemMsg']=function(_0x329b1e){const _0xc21c9b=_0x26e348;if(!_0x329b1e)return![];if(!Imported[_0xc21c9b(0x454)])return![];if(!$textPopup)return;return DataManager[_0xc21c9b(0x549)](_0x329b1e);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x21d)]=Game_Actor[_0x26e348(0x462)]['forceChangeEquip'],Game_Actor[_0x26e348(0x462)][_0x26e348(0x3f9)]=function(_0x5a2633,_0x300eda){const _0x322bd2=_0x26e348;if(!this[_0x322bd2(0x5b2)]){const _0x35afbd=JsonEx[_0x322bd2(0x626)](this);_0x35afbd[_0x322bd2(0x5b2)]=!![],VisuMZ[_0x322bd2(0x340)]['Game_Actor_forceChangeEquip']['call'](this,_0x5a2633,_0x300eda),this[_0x322bd2(0x393)](_0x35afbd);}else VisuMZ['ItemsEquipsCore'][_0x322bd2(0x21d)][_0x322bd2(0x62d)](this,_0x5a2633,_0x300eda);},VisuMZ[_0x26e348(0x340)]['Game_Actor_discardEquip']=Game_Actor[_0x26e348(0x462)][_0x26e348(0x44c)],Game_Actor[_0x26e348(0x462)][_0x26e348(0x44c)]=function(_0x1da692){const _0x2a5510=_0x26e348;if(!this[_0x2a5510(0x5b2)]){const _0x4a2b8f=JsonEx['makeDeepCopy'](this);_0x4a2b8f[_0x2a5510(0x5b2)]=!![],VisuMZ[_0x2a5510(0x340)][_0x2a5510(0x4fc)][_0x2a5510(0x62d)](this,_0x1da692),this[_0x2a5510(0x393)](_0x4a2b8f);}else{if(_0x2a5510(0x5c2)!==_0x2a5510(0x5c2))return this['getItemDamageAmountLabelOriginal']();else VisuMZ[_0x2a5510(0x340)][_0x2a5510(0x4fc)][_0x2a5510(0x62d)](this,_0x1da692);}},Game_Actor['prototype'][_0x26e348(0x183)]=function(_0x2d1162){const _0x5a0d06=_0x26e348;if(this[_0x5a0d06(0x2b1)])return;let _0x1a4b7c=0x0;for(;;){_0x1a4b7c++;if(_0x1a4b7c>0x3)break;const _0x29a1fc=this[_0x5a0d06(0x560)](),_0x1c14e7=this[_0x5a0d06(0x2e9)](),_0x292463=_0x1c14e7[_0x5a0d06(0x571)];let _0x29dbd9=![];for(let _0x3c748f=0x0;_0x3c748f<_0x292463;_0x3c748f++){const _0x275689=_0x1c14e7[_0x3c748f];if(!_0x275689)continue;const _0x540172=DataManager[_0x5a0d06(0x196)](_0x275689);if(!this[_0x5a0d06(0x274)](_0x275689)||!_0x540172['includes'](_0x29a1fc[_0x3c748f])){!_0x2d1162&&this[_0x5a0d06(0x64e)](null,_0x275689);if(!this[_0x5a0d06(0x5b2)]){const _0x402d91=JsonEx[_0x5a0d06(0x626)](this);_0x402d91['_tempActor']=!![],this[_0x5a0d06(0x16b)][_0x3c748f]['setObject'](null),this[_0x5a0d06(0x2b1)]=!![],this[_0x5a0d06(0x393)](_0x402d91),this[_0x5a0d06(0x2b1)]=undefined;}else{if(this[_0x5a0d06(0x16b)][_0x3c748f])this[_0x5a0d06(0x16b)][_0x3c748f]['setObject'](null);else{if(_0x5a0d06(0x29f)==='fIoKi'){_0x11cd99=_0x777850[_0x5a0d06(0x41b)](_0x3f5f12||0x1,0x1);while(_0x5228c2--){_0x1b9e79=_0x54747c||this['lineHeight'](),this['contentsBack'][_0x5a0d06(0x688)]=0xa0;const _0x18290a=_0x4c9aa2['gaugeBackColor']();this[_0x5a0d06(0x629)][_0x5a0d06(0x418)](_0x42ad47+0x1,_0x470824+0x1,_0x50485e-0x2,_0x26cc44-0x2,_0x18290a),this[_0x5a0d06(0x629)][_0x5a0d06(0x688)]=0xff;}}else{console['log'](_0x5a0d06(0x2cd));continue;}}}_0x29dbd9=!![];}}if(!_0x29dbd9)break;}},Game_Actor[_0x26e348(0x462)]['equipAdjustHpMp']=function(_0x329079){const _0x3a7f1e=_0x26e348;if(this['_tempActor'])return;if(!VisuMZ[_0x3a7f1e(0x340)][_0x3a7f1e(0x1fa)][_0x3a7f1e(0x35e)][_0x3a7f1e(0x1d9)])return;const _0x16f680=Math[_0x3a7f1e(0x562)](_0x329079[_0x3a7f1e(0x368)]()*this[_0x3a7f1e(0x4ad)]),_0x533821=Math[_0x3a7f1e(0x562)](_0x329079[_0x3a7f1e(0x650)]()*this['mmp']);if(this['hp']>0x0)this[_0x3a7f1e(0x684)](_0x16f680);if(this['mp']>0x0)this[_0x3a7f1e(0x317)](_0x533821);},Game_Actor[_0x26e348(0x462)]['clearEquipments']=function(){const _0x473612=_0x26e348,_0x5454a1=this[_0x473612(0x560)]()[_0x473612(0x571)];for(let _0x27d8bd=0x0;_0x27d8bd<_0x5454a1;_0x27d8bd++){if(this['isClearEquipOk'](_0x27d8bd))this['changeEquip'](_0x27d8bd,null);}},Game_Actor[_0x26e348(0x462)]['isClearEquipOk']=function(_0x2d712e){const _0x393e0a=_0x26e348;if(this[_0x393e0a(0x3fe)]()['includes'](this[_0x393e0a(0x560)]()[_0x2d712e]))return![];else{if(_0x393e0a(0x23f)!=='iAjvc'){const _0x3af355=this['itemLineRect'](this[_0x393e0a(0x54f)]());let _0x37019a=this[_0x393e0a(0x386)](this[_0x393e0a(0x54f)]());_0x37019a=_0x37019a[_0x393e0a(0x26e)](/\\I\[(\d+)\]/gi,''),_0x2714a8[_0x393e0a(0x587)](),this[_0x393e0a(0x2ed)](_0x37019a,_0x3af355),this[_0x393e0a(0x5d4)](_0x37019a,_0x3af355),this[_0x393e0a(0x20f)](_0x37019a,_0x3af355);}else return this[_0x393e0a(0x1a7)](_0x2d712e);}},Game_Actor[_0x26e348(0x462)][_0x26e348(0x3fe)]=function(){const _0x328bcf=_0x26e348;return VisuMZ[_0x328bcf(0x340)]['Settings'][_0x328bcf(0x35e)]['NonRemoveETypes'];},Game_Actor['prototype'][_0x26e348(0x2c3)]=function(){const _0x4fb2a3=_0x26e348,_0x5d2f1e=this[_0x4fb2a3(0x560)]()[_0x4fb2a3(0x571)];for(let _0x8f08a=0x0;_0x8f08a<_0x5d2f1e;_0x8f08a++){if(this[_0x4fb2a3(0x2b2)](_0x8f08a))this[_0x4fb2a3(0x553)](_0x8f08a,null);}for(let _0x454747=0x0;_0x454747<_0x5d2f1e;_0x454747++){if(this[_0x4fb2a3(0x2b2)](_0x454747))this[_0x4fb2a3(0x553)](_0x454747,this[_0x4fb2a3(0x1df)](_0x454747));}},Game_Actor[_0x26e348(0x462)][_0x26e348(0x1df)]=function(_0x3ab35e){const _0x5de8da=_0x26e348,_0x48c96d=this[_0x5de8da(0x560)]()[_0x3ab35e],_0x16a5e7=$gameParty[_0x5de8da(0x53a)]()['filter'](_0x42181f=>DataManager['getEtypeIDs'](_0x42181f)[_0x5de8da(0x176)](_0x48c96d)&&this[_0x5de8da(0x274)](_0x42181f)&&!DataManager['isCursedItem'](_0x42181f));let _0x5292d2=null,_0x33999e=-0x3e8;for(let _0x4f6887=0x0;_0x4f6887<_0x16a5e7[_0x5de8da(0x571)];_0x4f6887++){if(_0x5de8da(0x1e5)!=='HZEhX')return this[_0x5de8da(0x345)]()?this['goldWindowRectItemsEquipsCore']():_0x1e48e3[_0x5de8da(0x340)][_0x5de8da(0x302)][_0x5de8da(0x62d)](this);else{const _0x2a22be=this[_0x5de8da(0x531)](_0x16a5e7[_0x4f6887]);if(_0x2a22be>_0x33999e){if('Wbdkz'===_0x5de8da(0x557))_0x33999e=_0x2a22be,_0x5292d2=_0x16a5e7[_0x4f6887];else{const _0x4999ae=_0x251c6e(_0x29396d['$1'])*0.01;if(_0x3b36cd[_0x5de8da(0x225)]()<_0x4999ae)return;}}}}return _0x5292d2;},Game_Actor[_0x26e348(0x462)][_0x26e348(0x2b2)]=function(_0x2d6671){const _0x3f4214=_0x26e348;if(this['nonOptimizeEtypes']()['includes'](this['equipSlots']()[_0x2d6671])){if(_0x3f4214(0x30c)!==_0x3f4214(0x17f))return![];else{this[_0x3f4214(0x3a3)]=_0x3c3ef9;const _0x4d475c=_0x398528[_0x3f4214(0x22e)];_0xdc79a6(this['refreshDelay'][_0x3f4214(0x60b)](this,_0x34537c),_0x4d475c);}}else return this[_0x3f4214(0x1a7)](_0x2d6671);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x257)]=Game_Actor[_0x26e348(0x462)][_0x26e348(0x1a7)],Game_Actor['prototype'][_0x26e348(0x1a7)]=function(_0x22a02a){const _0x51ad2b=_0x26e348,_0x45b449=this['_equips'][_0x22a02a];if(_0x45b449){if(_0x51ad2b(0x4df)===_0x51ad2b(0x470)){const _0x310c56=_0x199fca+_0x55d648+_0x3040fd*_0x129d9a;this['drawItemDarkRect'](_0x310c56,_0x4aad29,_0x37a199,_0x3120ac);}else{const _0x35d38c=_0x45b449[_0x51ad2b(0x594)]();if(DataManager['isCursedItem'](_0x35d38c))return![];}}return VisuMZ[_0x51ad2b(0x340)]['Game_Actor_isEquipChangeOk'][_0x51ad2b(0x62d)](this,_0x22a02a);},Game_Actor[_0x26e348(0x462)]['nonOptimizeEtypes']=function(){const _0x45962d=_0x26e348;return VisuMZ[_0x45962d(0x340)]['Settings'][_0x45962d(0x35e)][_0x45962d(0x1b3)];},VisuMZ[_0x26e348(0x340)][_0x26e348(0x278)]=Game_Actor[_0x26e348(0x462)][_0x26e348(0x64e)],Game_Actor[_0x26e348(0x462)][_0x26e348(0x64e)]=function(_0xc5f1ef,_0x40e990){const _0x196739=_0x26e348;if(this['_tempActor'])return![];$gameTemp[_0x196739(0x20e)]=!![];const _0x2f6357=VisuMZ[_0x196739(0x340)][_0x196739(0x278)]['call'](this,_0xc5f1ef,_0x40e990);return $gameTemp['_bypassNewLabel']=![],_0x2f6357;},Game_Actor[_0x26e348(0x462)][_0x26e348(0x44f)]=function(_0x47d993,_0x5afbf5){const _0x570124=_0x26e348,_0x11778a=this[_0x570124(0x26d)](_0x47d993);if(_0x11778a<0x0)return;const _0x3489c0=_0x47d993===0x1?$dataWeapons[_0x5afbf5]:$dataArmors[_0x5afbf5];this[_0x570124(0x553)](_0x11778a,_0x3489c0);},Game_Actor['prototype'][_0x26e348(0x26d)]=function(_0x53ff19){const _0x35eae2=_0x26e348;let _0x465110=0x0;const _0x5659f8=this[_0x35eae2(0x560)](),_0xd79be=this[_0x35eae2(0x2e9)]();for(let _0x4e9659=0x0;_0x4e9659<_0x5659f8[_0x35eae2(0x571)];_0x4e9659++){if(_0x5659f8[_0x4e9659]===_0x53ff19){if(_0x35eae2(0x4ac)!=='OgYuk'){_0x465110=_0x4e9659;if(!_0xd79be[_0x4e9659])return _0x465110;}else this[_0x35eae2(0x3f8)][_0x35eae2(0x507)](_0x1adf11);}}return _0x465110;},VisuMZ[_0x26e348(0x340)][_0x26e348(0x39a)]=Game_Actor['prototype'][_0x26e348(0x514)],Game_Actor[_0x26e348(0x462)][_0x26e348(0x514)]=function(_0xb58017){const _0x362253=_0x26e348;let _0x255f8f=VisuMZ[_0x362253(0x340)]['Game_Actor_paramPlus'][_0x362253(0x62d)](this,_0xb58017);for(const _0x314d68 of this[_0x362253(0x2e9)]()){if(_0x314d68)_0x255f8f+=this[_0x362253(0x683)](_0x314d68,_0xb58017);}return _0x255f8f;},Game_Actor[_0x26e348(0x462)][_0x26e348(0x683)]=function(_0x4abd21,_0x5a0071){const _0x5040e1=_0x26e348;if(this[_0x5040e1(0x330)])return 0x0;const _0x47cf5e=(DataManager[_0x5040e1(0x188)](_0x4abd21)?_0x5040e1(0x4a3):_0x5040e1(0x222))['format'](_0x4abd21['id']),_0x3d8174=_0x5040e1(0x3f5)[_0x5040e1(0x43f)](_0x47cf5e,_0x5a0071);if(VisuMZ[_0x5040e1(0x340)][_0x5040e1(0x170)][_0x3d8174]){this[_0x5040e1(0x330)]=!![];const _0x2a801a=VisuMZ['ItemsEquipsCore'][_0x5040e1(0x170)][_0x3d8174]['call'](this,_0x4abd21,_0x5a0071);return this[_0x5040e1(0x330)]=![],_0x2a801a;}else return'qshUG'!==_0x5040e1(0x3a4)?_0x380ab2['VisuMZ_0_CoreEngine']&&_0xaf9fa1[_0x5040e1(0x38f)][_0x5040e1(0x1fa)][_0x5040e1(0x48e)]['DrawIcons']:0x0;},Game_Actor[_0x26e348(0x462)][_0x26e348(0x214)]=function(_0x25a631){const _0x82e67d=_0x26e348;this[_0x82e67d(0x16a)]=!![],this['_shopStatusMenuAlly']=_0x25a631;},VisuMZ[_0x26e348(0x340)][_0x26e348(0x4ee)]=Game_Party['prototype']['initialize'],Game_Party[_0x26e348(0x462)]['initialize']=function(){const _0x2108c3=_0x26e348;VisuMZ[_0x2108c3(0x340)][_0x2108c3(0x4ee)]['call'](this),this[_0x2108c3(0x31d)](),this[_0x2108c3(0x2d0)]();},Game_Party[_0x26e348(0x462)]['initNewItemsList']=function(){const _0x417e16=_0x26e348;this[_0x417e16(0x4a9)]=[];},Game_Party[_0x26e348(0x462)][_0x26e348(0x2c5)]=function(_0x242963){const _0x967e18=_0x26e348;if(!$gameTemp[_0x967e18(0x689)]())return![];if(this[_0x967e18(0x4a9)]===undefined)this[_0x967e18(0x31d)]();let _0x31b504='';if(DataManager['isItem'](_0x242963))_0x31b504='item-%1'[_0x967e18(0x43f)](_0x242963['id']);else{if(DataManager['isWeapon'](_0x242963))_0x967e18(0x659)!==_0x967e18(0x276)?_0x31b504='weapon-%1'['format'](_0x242963['id']):this['_doubleTouch']=!![];else{if(DataManager[_0x967e18(0x33c)](_0x242963)){if(_0x967e18(0x235)!=='csbVS'){const _0x4e2711=_0x56f1a7['battleMembers']()[_0x967e18(0x43b)](_0x3e110c),_0x31e691=_0x1fb51d+_0x4271e5+_0x4e2711*_0x544489;this[_0x967e18(0x326)](_0x8ad43b['canEquip'](this['_item'])),this[_0x967e18(0x339)](_0x28174a,_0x31e691+_0x79771a/0x2,_0x115fb1);let _0x4c48a8=_0x57116a;for(const _0x40694c of _0x4588a5){const _0x55b3ff=_0x4c48a8-(_0x5171d3-_0x56d71a)/0x2;this[_0x967e18(0x19f)](_0xc02bc5,_0x40694c,_0x31e691,_0x55b3ff,_0x27de03),_0x4c48a8+=_0x45c88d;}}else _0x31b504=_0x967e18(0x5c4)[_0x967e18(0x43f)](_0x242963['id']);}else{if(_0x967e18(0x2a4)!==_0x967e18(0x2a4))_0xb9b749[_0x967e18(0x340)]['Scene_Equip_onSlotOk'][_0x967e18(0x62d)](this),this[_0x967e18(0x674)]();else return;}}}return this['_newItemsList']['includes'](_0x31b504);},Game_Party[_0x26e348(0x462)]['setNewItem']=function(_0x11e489){const _0x2cf63a=_0x26e348;if(!$gameTemp[_0x2cf63a(0x689)]())return;if(this[_0x2cf63a(0x4a9)]===undefined)this[_0x2cf63a(0x31d)]();let _0x1eb239='';if(DataManager[_0x2cf63a(0x2bd)](_0x11e489))_0x1eb239=_0x2cf63a(0x62f)['format'](_0x11e489['id']);else{if(DataManager[_0x2cf63a(0x188)](_0x11e489))_0x1eb239='weapon-%1'[_0x2cf63a(0x43f)](_0x11e489['id']);else{if(DataManager['isArmor'](_0x11e489))_0x1eb239='armor-%1'[_0x2cf63a(0x43f)](_0x11e489['id']);else{if('Vplhv'!==_0x2cf63a(0x5c7))return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x2cf63a(0x2bf)]():_0x33977a[_0x2cf63a(0x340)]['Scene_Equip_helpWindowRect']['call'](this);else return;}}}if(!this[_0x2cf63a(0x4a9)]['includes'](_0x1eb239))this[_0x2cf63a(0x4a9)][_0x2cf63a(0x270)](_0x1eb239);},Game_Party[_0x26e348(0x462)][_0x26e348(0x261)]=function(_0x41b3eb){const _0x448bd9=_0x26e348;if(!$gameTemp['newLabelEnabled']())return;if(this['_newItemsList']===undefined)this[_0x448bd9(0x31d)]();let _0x201b56='';if(DataManager[_0x448bd9(0x2bd)](_0x41b3eb))_0x201b56=_0x448bd9(0x62f)[_0x448bd9(0x43f)](_0x41b3eb['id']);else{if(DataManager[_0x448bd9(0x188)](_0x41b3eb))_0x201b56=_0x448bd9(0x16c)[_0x448bd9(0x43f)](_0x41b3eb['id']);else{if(DataManager[_0x448bd9(0x33c)](_0x41b3eb)){if(_0x448bd9(0x3de)===_0x448bd9(0x547)){const _0x5c9dad=_0x11dac1(_0x5bf4c4['$1']),_0x4a4a8f=(_0x393590===_0x1e709?'W%1':'A%1')[_0x448bd9(0x43f)](_0xbf7dca['id']),_0x4e6e89=_0x448bd9(0x26c)[_0x448bd9(0x43f)](_0x5c9dad);for(let _0x549dcf=0x0;_0x549dcf<0x8;_0x549dcf++){if(_0x5c9dad[_0x448bd9(0x28b)](_0x38086d[_0x448bd9(0x340)][_0x448bd9(0x4ba)][_0x448bd9(0x185)][_0x549dcf])){const _0x262a9b=_0x448bd9(0x3f5)[_0x448bd9(0x43f)](_0x4a4a8f,_0x549dcf);_0x3182b4[_0x448bd9(0x340)]['paramJS'][_0x262a9b]=new _0xdb5fae(_0x448bd9(0x546),_0x448bd9(0x67e),_0x4e6e89);}}}else _0x201b56=_0x448bd9(0x5c4)[_0x448bd9(0x43f)](_0x41b3eb['id']);}else{if('mXPDm'===_0x448bd9(0x3fb))return;else this[_0x448bd9(0x27c)](_0x51427a);}}}this[_0x448bd9(0x4a9)][_0x448bd9(0x176)](_0x201b56)&&this['_newItemsList'][_0x448bd9(0x648)](this[_0x448bd9(0x4a9)]['indexOf'](_0x201b56),0x1);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x681)]=Game_Party[_0x26e348(0x462)][_0x26e348(0x37b)],Game_Party['prototype'][_0x26e348(0x37b)]=function(_0x127f3b){const _0x3813a2=_0x26e348;if(DataManager['isProxyItem'](_0x127f3b))_0x127f3b=DataManager['getProxyItem'](_0x127f3b);return VisuMZ[_0x3813a2(0x340)][_0x3813a2(0x681)][_0x3813a2(0x62d)](this,_0x127f3b);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x182)]=Game_Party[_0x26e348(0x462)]['gainItem'],Game_Party[_0x26e348(0x462)]['gainItem']=function(_0x36ab80,_0x5bb0fa,_0x4e1bc0){const _0x5841e2=_0x26e348;if(DataManager['isProxyItem'](_0x36ab80))_0x36ab80=null;const _0x48faae=this[_0x5841e2(0x37b)](_0x36ab80);VisuMZ['ItemsEquipsCore']['Game_Party_gainItem'][_0x5841e2(0x62d)](this,_0x36ab80,_0x5bb0fa,_0x4e1bc0);if(this[_0x5841e2(0x37b)](_0x36ab80)>_0x48faae)this['setNewItem'](_0x36ab80);},Game_Party[_0x26e348(0x462)]['maxItems']=function(_0x5496cb){const _0x2b3f57=_0x26e348;if(DataManager['isProxyItem'](_0x5496cb))_0x5496cb=DataManager['getProxyItem'](_0x5496cb);return DataManager[_0x2b3f57(0x420)](_0x5496cb);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x173)]=Game_Party[_0x26e348(0x462)][_0x26e348(0x59a)],Game_Party[_0x26e348(0x462)][_0x26e348(0x59a)]=function(_0x461a99){const _0x22f69c=_0x26e348;if(_0x461a99){if('QylHu'!=='QylHu'){_0x2c58f0=_0x26ec40||this[_0x22f69c(0x541)](),this[_0x22f69c(0x629)]['paintOpacity']=0xa0;const _0x1a64c1=_0x3a67fc[_0x22f69c(0x283)]();this[_0x22f69c(0x629)]['fillRect'](_0x10efc8+0x1,_0x45d126+0x1,_0x46a26e-0x2,_0x4715c7-0x2,_0x1a64c1),this[_0x22f69c(0x629)][_0x22f69c(0x688)]=0xff;}else{const _0x228183=_0x461a99[_0x22f69c(0x545)]||'';if(_0x228183[_0x22f69c(0x28b)](/<(?:CONSERVE|PRESERVE):[ ](\d+)([%％])>/i)){if(_0x22f69c(0x647)!==_0x22f69c(0x1a6)){const _0xcfefa0=Number(RegExp['$1'])*0.01;if(Math[_0x22f69c(0x225)]()<_0xcfefa0)return;}else return this[_0x22f69c(0x345)]()?this[_0x22f69c(0x57f)]():_0x5c5457[_0x22f69c(0x340)][_0x22f69c(0x187)][_0x22f69c(0x62d)](this);}}}VisuMZ[_0x22f69c(0x340)]['Game_Party_consumeItem'][_0x22f69c(0x62d)](this,_0x461a99);},Game_Party[_0x26e348(0x462)][_0x26e348(0x2d0)]=function(){const _0x1e3b8b=_0x26e348;this[_0x1e3b8b(0x32a)]={'buy':{'gold':0x0,'items':{}},'sell':{'gold':0x0,'items':{}}};},Game_Party['prototype'][_0x26e348(0x23a)]=function(){const _0x2903ac=_0x26e348;return this[_0x2903ac(0x32a)]===undefined&&this[_0x2903ac(0x2d0)](),this[_0x2903ac(0x32a)];},Game_Party[_0x26e348(0x462)][_0x26e348(0x3fa)]=function(_0x5f0889,_0x5e480b){const _0x4651c8=_0x26e348;if(!_0x5e480b)return 0x0;if(this[_0x4651c8(0x32a)]===undefined){if(_0x4651c8(0x475)===_0x4651c8(0x475))this['initShopTrackingData']();else{const _0x590c34=_0x471e38[_0x4651c8(0x340)][_0x4651c8(0x1fa)][_0x4651c8(0x1da)],_0x50360d='DamageType%1'[_0x4651c8(0x43f)](this['_item'][_0x4651c8(0x404)][_0x4651c8(0x3bc)]),_0x1bcfd9=[null,_0x4e0ecb['hp'],_0x15984a['mp'],_0x3a1435['hp'],_0x2b3af1['mp'],_0x8fe39e['hp'],_0x10efa9['mp']][this[_0x4651c8(0x3a3)][_0x4651c8(0x404)][_0x4651c8(0x3bc)]];return _0x590c34[_0x50360d]['format'](_0x1bcfd9);}}const _0x3b8884=this['getShopTrackingData']();if(!_0x3b8884[_0x5f0889])return 0x0;if(_0x5e480b===_0x4651c8(0x2e4)){if(_0x4651c8(0x5b9)===_0x4651c8(0x5b9))return _0x3b8884[_0x5f0889][_0x4651c8(0x2e4)]=_0x3b8884[_0x5f0889][_0x4651c8(0x2e4)]||0x0,_0x3b8884[_0x5f0889][_0x4651c8(0x2e4)];else _0x210231=_0x4651c8(0x265)[_0x4651c8(0x43f)](_0x154c5f,_0x39a85b);}else{if(DataManager[_0x4651c8(0x2bd)](_0x5e480b)){if(_0x4651c8(0x66f)!=='LWeZQ')key=_0x4651c8(0x62f)[_0x4651c8(0x43f)](_0x5e480b['id']);else{if(!this[_0x4651c8(0x40c)]())_0x3df540[_0x4651c8(0x462)][_0x4651c8(0x32d)][_0x4651c8(0x62d)](this);}}else{if(DataManager[_0x4651c8(0x188)](_0x5e480b))key=_0x4651c8(0x16c)[_0x4651c8(0x43f)](_0x5e480b['id']);else{if(DataManager[_0x4651c8(0x33c)](_0x5e480b)){if('rmRUu'!==_0x4651c8(0x400))return this[_0x4651c8(0x345)]()?this[_0x4651c8(0x405)]():_0x48c8dd['ItemsEquipsCore']['Scene_Equip_statusWindowRect'][_0x4651c8(0x62d)](this);else key='armor-%1'['format'](_0x5e480b['id']);}else return'rkgzh'!==_0x4651c8(0x195)?this['getShopTrackingItem'](_0x4651c8(0x49d),_0x4042ff):0x0;}}}return _0x3b8884[_0x5f0889][_0x4651c8(0x2a9)][key]=_0x3b8884[_0x5f0889][_0x4651c8(0x2a9)][key]||0x0,_0x3b8884[_0x5f0889]['items'][key];},Game_Party[_0x26e348(0x462)][_0x26e348(0x3c7)]=function(_0x3faa61){const _0x36ffbf=_0x26e348;return this[_0x36ffbf(0x3fa)]('buy',_0x3faa61);},Game_Party[_0x26e348(0x462)][_0x26e348(0x55c)]=function(_0xfc07b5){const _0x3eca3b=_0x26e348;return this[_0x3eca3b(0x3fa)](_0x3eca3b(0x49d),_0xfc07b5);},Game_Party[_0x26e348(0x462)][_0x26e348(0x2cc)]=function(){const _0x47979f=_0x26e348;return this[_0x47979f(0x3fa)](_0x47979f(0x471),_0x47979f(0x2e4));},Game_Party[_0x26e348(0x462)][_0x26e348(0x37c)]=function(){const _0x698186=_0x26e348;return this[_0x698186(0x3fa)](_0x698186(0x49d),_0x698186(0x2e4));},Game_Party[_0x26e348(0x462)][_0x26e348(0x15c)]=function(_0x3f8509,_0x454b98,_0x405d14){const _0x240c62=_0x26e348;if(!_0x454b98)return;if(_0x405d14<=0x0)return;this[_0x240c62(0x32a)]===undefined&&this[_0x240c62(0x2d0)]();const _0x1c7256=this[_0x240c62(0x23a)]();if(!_0x1c7256[_0x3f8509])return;if(_0x454b98===_0x240c62(0x2e4)){if('TgBzh'!==_0x240c62(0x3a1)){_0x1c7256[_0x3f8509]['gold']=_0x1c7256[_0x3f8509]['gold']||0x0,_0x1c7256[_0x3f8509][_0x240c62(0x2e4)]+=_0x405d14;return;}else{const _0x215609=_0x1d91f5[_0x240c62(0x4f5)],_0x47193c=_0x1896ec[_0x240c62(0x4f2)];this[_0x240c62(0x293)]=new _0x1fe2c8(_0x215609,_0x47193c),this['drawNewLabelIcon'](),this['drawNewLabelText']();}}else{if(DataManager[_0x240c62(0x2bd)](_0x454b98)){if(_0x240c62(0x4d1)===_0x240c62(0x621)){const _0x2a9eac=this['_commandNameWindow'];_0x2a9eac[_0x240c62(0x439)][_0x240c62(0x233)]();const _0x382ea5=this[_0x240c62(0x4eb)](this[_0x240c62(0x54f)]());if(_0x382ea5===_0x240c62(0x213)){const _0x4427a1=this['itemLineRect'](this[_0x240c62(0x54f)]());let _0x327277=this[_0x240c62(0x386)](this[_0x240c62(0x54f)]());_0x327277=_0x327277['replace'](/\\I\[(\d+)\]/gi,''),_0x2a9eac[_0x240c62(0x587)](),this[_0x240c62(0x2ed)](_0x327277,_0x4427a1),this[_0x240c62(0x5d4)](_0x327277,_0x4427a1),this['commandNameWindowCenter'](_0x327277,_0x4427a1);}}else key=_0x240c62(0x62f)[_0x240c62(0x43f)](_0x454b98['id']);}else{if(DataManager[_0x240c62(0x188)](_0x454b98))key=_0x240c62(0x16c)[_0x240c62(0x43f)](_0x454b98['id']);else{if(DataManager[_0x240c62(0x33c)](_0x454b98)){if(_0x240c62(0x5b1)===_0x240c62(0x3ad))return _0x5537dc[_0x240c62(0x340)][_0x240c62(0x1fa)][_0x240c62(0x35e)][_0x240c62(0x1b3)];else key='armor-%1'[_0x240c62(0x43f)](_0x454b98['id']);}else{if('GvoqY'==='GvoqY')return;else _0x13f03c='weapon-%1'[_0x240c62(0x43f)](_0x101a80['id']);}}}}_0x1c7256[_0x3f8509]['items'][key]=_0x1c7256[_0x3f8509]['items'][key]||0x0,_0x1c7256[_0x3f8509][_0x240c62(0x2a9)][key]+=_0x405d14;},Game_Party[_0x26e348(0x462)][_0x26e348(0x5e0)]=function(_0x1a5ada,_0x92eab8){const _0xd51b1e=_0x26e348;this[_0xd51b1e(0x15c)](_0xd51b1e(0x471),_0x1a5ada,_0x92eab8);},Game_Party['prototype'][_0x26e348(0x48b)]=function(_0x422474,_0x528597){const _0x15d715=_0x26e348;this[_0x15d715(0x15c)](_0x15d715(0x49d),_0x422474,_0x528597);},Game_Party[_0x26e348(0x462)][_0x26e348(0x535)]=function(_0x220ed1){const _0x577ed5=_0x26e348;this[_0x577ed5(0x15c)](_0x577ed5(0x471),_0x577ed5(0x2e4),_0x220ed1);},Game_Party[_0x26e348(0x462)]['addShopTrackingGoldSell']=function(_0x2c5021){const _0x2616e3=_0x26e348;this[_0x2616e3(0x15c)]('sell',_0x2616e3(0x2e4),_0x2c5021);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x178)]=Scene_ItemBase[_0x26e348(0x462)][_0x26e348(0x582)],Scene_ItemBase[_0x26e348(0x462)][_0x26e348(0x582)]=function(){const _0x2971ba=_0x26e348;VisuMZ[_0x2971ba(0x340)][_0x2971ba(0x178)][_0x2971ba(0x62d)](this),this[_0x2971ba(0x5c3)]['callUpdateHelp']();},Scene_Item[_0x26e348(0x462)][_0x26e348(0x656)]=function(){const _0x51741f=_0x26e348;if(ConfigManager[_0x51741f(0x5f2)]&&ConfigManager[_0x51741f(0x556)]!==undefined)return _0x51741f(0x2b5)==='pfcDp'?ConfigManager[_0x51741f(0x556)]:![];else{if(this[_0x51741f(0x345)]()){if(_0x51741f(0x540)!==_0x51741f(0x62c))return this['updatedLayoutStyle']()[_0x51741f(0x28b)](/LOWER/i);else this['_slotWindow'][_0x51741f(0x54f)]()>=0x0?(_0x2c8ce4[_0x51741f(0x340)][_0x51741f(0x39f)][_0x51741f(0x62d)](this),this['onSlotOkAutoSelect']()):(this[_0x51741f(0x428)][_0x51741f(0x15e)](0x0),this[_0x51741f(0x428)]['activate']());}else return Scene_ItemBase[_0x51741f(0x462)][_0x51741f(0x656)][_0x51741f(0x62d)](this);}},Scene_Item[_0x26e348(0x462)][_0x26e348(0x287)]=function(){const _0x1d6434=_0x26e348;if(ConfigManager['uiMenuStyle']&&ConfigManager['uiInputPosition']!==undefined)return _0x1d6434(0x1a4)==='jWfqm'?this[_0x1d6434(0x3fa)](_0x1d6434(0x49d),_0x1d6434(0x2e4)):ConfigManager['uiInputPosition'];else return this[_0x1d6434(0x345)]()?this[_0x1d6434(0x2cf)]()[_0x1d6434(0x28b)](/RIGHT/i):Scene_ItemBase[_0x1d6434(0x462)][_0x1d6434(0x287)][_0x1d6434(0x62d)](this);},Scene_Item[_0x26e348(0x462)][_0x26e348(0x2cf)]=function(){const _0x153a2f=_0x26e348;return VisuMZ[_0x153a2f(0x340)][_0x153a2f(0x1fa)][_0x153a2f(0x16e)][_0x153a2f(0x3aa)];},Scene_Item[_0x26e348(0x462)]['isUseModernControls']=function(){const _0x405bbd=_0x26e348;return this[_0x405bbd(0x4b7)]&&this['_categoryWindow'][_0x405bbd(0x40c)]();},Scene_Item[_0x26e348(0x462)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x9769be=_0x26e348;return VisuMZ[_0x9769be(0x340)][_0x9769be(0x1fa)][_0x9769be(0x16e)]['EnableLayout'];},VisuMZ[_0x26e348(0x340)]['Scene_Item_create']=Scene_Item[_0x26e348(0x462)][_0x26e348(0x602)],Scene_Item['prototype'][_0x26e348(0x602)]=function(){const _0x520d8d=_0x26e348;VisuMZ['ItemsEquipsCore']['Scene_Item_create']['call'](this),this[_0x520d8d(0x40c)]()&&this[_0x520d8d(0x64d)]();},VisuMZ[_0x26e348(0x340)][_0x26e348(0x51b)]=Scene_Item[_0x26e348(0x462)][_0x26e348(0x209)],Scene_Item[_0x26e348(0x462)][_0x26e348(0x209)]=function(){const _0x5cf6d2=_0x26e348;return this[_0x5cf6d2(0x345)]()?this[_0x5cf6d2(0x2bf)]():VisuMZ[_0x5cf6d2(0x340)][_0x5cf6d2(0x51b)][_0x5cf6d2(0x62d)](this);},Scene_Item['prototype'][_0x26e348(0x2bf)]=function(){const _0x1c3861=_0x26e348,_0x527bba=0x0,_0x50836c=this[_0x1c3861(0x40f)](),_0x1b666b=Graphics[_0x1c3861(0x256)],_0x237332=this['helpAreaHeight']();return new Rectangle(_0x527bba,_0x50836c,_0x1b666b,_0x237332);},VisuMZ[_0x26e348(0x340)]['Scene_Item_createCategoryWindow']=Scene_Item['prototype']['createCategoryWindow'],Scene_Item[_0x26e348(0x462)]['createCategoryWindow']=function(){const _0x241100=_0x26e348;VisuMZ[_0x241100(0x340)][_0x241100(0x2a6)]['call'](this),this[_0x241100(0x40c)]()&&this[_0x241100(0x2d3)]();},Scene_Item[_0x26e348(0x462)][_0x26e348(0x2d3)]=function(){const _0x113073=_0x26e348;delete this[_0x113073(0x4b7)]['_handlers']['ok'],delete this[_0x113073(0x4b7)][_0x113073(0x558)][_0x113073(0x328)];},VisuMZ[_0x26e348(0x340)][_0x26e348(0x1aa)]=Scene_Item['prototype'][_0x26e348(0x451)],Scene_Item[_0x26e348(0x462)][_0x26e348(0x451)]=function(){const _0x4456b3=_0x26e348;return this[_0x4456b3(0x345)]()?_0x4456b3(0x3c4)==='duuqL'?_0x5b8d0f[_0x4456b3(0x340)][_0x4456b3(0x1fa)]['EquipScene'][_0x4456b3(0x1db)]:this[_0x4456b3(0x422)]():VisuMZ[_0x4456b3(0x340)][_0x4456b3(0x1aa)][_0x4456b3(0x62d)](this);},Scene_Item[_0x26e348(0x462)]['categoryWindowRectItemsEquipsCore']=function(){const _0x25ad1e=_0x26e348,_0x5686c4=0x0,_0x47e115=this[_0x25ad1e(0x230)](),_0xdc76d2=Graphics[_0x25ad1e(0x256)],_0x239d20=this[_0x25ad1e(0x18e)](0x1,!![]);return new Rectangle(_0x5686c4,_0x47e115,_0xdc76d2,_0x239d20);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x2da)]=Scene_Item[_0x26e348(0x462)]['createItemWindow'],Scene_Item[_0x26e348(0x462)]['createItemWindow']=function(){const _0x3984a7=_0x26e348;VisuMZ[_0x3984a7(0x340)][_0x3984a7(0x2da)][_0x3984a7(0x62d)](this),this[_0x3984a7(0x40c)]()&&this['postCreateItemWindowModernControls'](),this['allowCreateStatusWindow']()&&this[_0x3984a7(0x1b2)]();},VisuMZ[_0x26e348(0x340)][_0x26e348(0x5c8)]=Scene_Item[_0x26e348(0x462)][_0x26e348(0x24f)],Scene_Item[_0x26e348(0x462)]['itemWindowRect']=function(){const _0x20a7e1=_0x26e348;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x20a7e1(0x361)!=='LdVqE')return this[_0x20a7e1(0x636)]();else{const _0x2a5ba9=this[_0x20a7e1(0x4eb)](_0x545dbd);if(_0x2a5ba9===_0x20a7e1(0x381))this[_0x20a7e1(0x65c)](_0x491314);else _0x2a5ba9===_0x20a7e1(0x213)?this[_0x20a7e1(0x15a)](_0x528e89):_0x34d2e2[_0x20a7e1(0x462)][_0x20a7e1(0x1ca)]['call'](this,_0x491249);}}else{if(_0x20a7e1(0x5d0)!==_0x20a7e1(0x5d0))_0x17e6d7=_0x3dafca['getProxyItem'](_0x3ab4d5),_0x34177c['isWeapon'](_0x345f77)||_0x19019a[_0x20a7e1(0x33c)](_0x4632e6)?this['setItemDelay'](_0x24ef68):_0x2cd7e8['ItemsEquipsCore'][_0x20a7e1(0x513)][_0x20a7e1(0x62d)](this,_0x27e68f);else{const _0x531611=VisuMZ[_0x20a7e1(0x340)][_0x20a7e1(0x5c8)][_0x20a7e1(0x62d)](this);return this['allowCreateStatusWindow']()&&this['adjustItemWidthByStatus']()&&(_0x531611['width']-=this[_0x20a7e1(0x38d)]()),_0x531611;}}},Scene_Item['prototype'][_0x26e348(0x636)]=function(){const _0x1fd3df=_0x26e348,_0x912f28=this[_0x1fd3df(0x287)]()?this['statusWidth']():0x0,_0x4c0ee8=this[_0x1fd3df(0x4b7)]['y']+this[_0x1fd3df(0x4b7)][_0x1fd3df(0x38b)],_0x402546=Graphics[_0x1fd3df(0x256)]-this['statusWidth'](),_0x1c5845=this[_0x1fd3df(0x583)]()-_0x4c0ee8;return new Rectangle(_0x912f28,_0x4c0ee8,_0x402546,_0x1c5845);},Scene_Item['prototype']['postCreateItemWindowModernControls']=function(){const _0x444986=_0x26e348;this[_0x444986(0x5c3)]['setHandler']('cancel',this[_0x444986(0x2a7)]['bind'](this));},Scene_Item[_0x26e348(0x462)][_0x26e348(0x1b7)]=function(){const _0x903b12=_0x26e348;return this[_0x903b12(0x345)]()?!![]:_0x903b12(0x559)===_0x903b12(0x559)?VisuMZ['ItemsEquipsCore'][_0x903b12(0x1fa)]['ItemScene'][_0x903b12(0x1d5)]:this['getItemDamageAmountTextOriginal']();},Scene_Item[_0x26e348(0x462)][_0x26e348(0x2ca)]=function(){const _0x482e3f=_0x26e348;return VisuMZ['ItemsEquipsCore'][_0x482e3f(0x1fa)][_0x482e3f(0x16e)][_0x482e3f(0x622)];},Scene_Item['prototype'][_0x26e348(0x1b2)]=function(){const _0x43dfd2=_0x26e348,_0x59f1b3=this[_0x43dfd2(0x224)]();this['_statusWindow']=new Window_ShopStatus(_0x59f1b3),this[_0x43dfd2(0x56d)](this['_statusWindow']),this[_0x43dfd2(0x5c3)][_0x43dfd2(0x42e)](this[_0x43dfd2(0x41f)]);const _0x5d57c7=VisuMZ[_0x43dfd2(0x340)][_0x43dfd2(0x1fa)]['ItemScene']['ItemMenuStatusBgType'];this[_0x43dfd2(0x41f)][_0x43dfd2(0x348)](_0x5d57c7||0x0);},Scene_Item[_0x26e348(0x462)]['statusWindowRect']=function(){const _0x5441c8=_0x26e348;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x5441c8(0x442)===_0x5441c8(0x4ec))_0x4e47fb[_0x5441c8(0x3d5)]('pagedown')&&_0x479930[_0x5441c8(0x68d)]('shift')&&this[_0x5441c8(0x391)](),_0x4a6eaf['isTriggered']('pageup')&&_0x5cd5e7[_0x5441c8(0x68d)](_0x5441c8(0x1a3))&&this[_0x5441c8(0x5c0)]();else return this[_0x5441c8(0x405)]();}else{if(_0x5441c8(0x219)===_0x5441c8(0x219))return VisuMZ[_0x5441c8(0x340)]['Settings'][_0x5441c8(0x16e)][_0x5441c8(0x19a)]['call'](this);else{const _0x55f131=this['commandStyleCheck'](_0xcc12c6);if(_0x55f131===_0x5441c8(0x381))this[_0x5441c8(0x65c)](_0x48083f);else _0x55f131==='icon'?this[_0x5441c8(0x15a)](_0x1e91ce):_0x450847[_0x5441c8(0x462)][_0x5441c8(0x1ca)][_0x5441c8(0x62d)](this,_0x58d994);}}},Scene_Item[_0x26e348(0x462)]['statusWindowRectItemsEquipsCore']=function(){const _0x217f5e=_0x26e348,_0x5afbde=this['statusWidth'](),_0x2cbd2d=this[_0x217f5e(0x5c3)][_0x217f5e(0x38b)],_0x2f8d85=this[_0x217f5e(0x287)]()?0x0:Graphics[_0x217f5e(0x256)]-this[_0x217f5e(0x38d)](),_0x1bcbb2=this[_0x217f5e(0x5c3)]['y'];return new Rectangle(_0x2f8d85,_0x1bcbb2,_0x5afbde,_0x2cbd2d);},Scene_Item[_0x26e348(0x462)][_0x26e348(0x38d)]=function(){return Scene_Shop['prototype']['statusWidth']();},Scene_Item[_0x26e348(0x462)][_0x26e348(0x309)]=function(){const _0x12c0ef=_0x26e348;if(!this[_0x12c0ef(0x2cf)]())return![];if(!this[_0x12c0ef(0x40c)]())return![];if(!this['_itemWindow'])return![];if(!this['_itemWindow'][_0x12c0ef(0x4de)])return![];return this['updatedLayoutStyle']()&&this[_0x12c0ef(0x40c)]();},Scene_Item[_0x26e348(0x462)][_0x26e348(0x21c)]=function(){const _0x24c5e1=_0x26e348;if(this['buttonAssistItemListRequirement']()){if(this[_0x24c5e1(0x5c3)][_0x24c5e1(0x1ae)]()===0x1){if(_0x24c5e1(0x66c)===_0x24c5e1(0x66c))return TextManager[_0x24c5e1(0x520)]('left',_0x24c5e1(0x652));else{const _0x45b87d=_0x5e6120[_0x24c5e1(0x626)](this);_0x45b87d['_tempActor']=!![],_0x17e3da[_0x24c5e1(0x340)][_0x24c5e1(0x21d)]['call'](this,_0x5ae82e,_0x26463f),this[_0x24c5e1(0x393)](_0x45b87d);}}else{if(_0x24c5e1(0x2c4)!==_0x24c5e1(0x1c6))return TextManager[_0x24c5e1(0x520)](_0x24c5e1(0x1be),'pagedown');else _0x5bd7e4[_0x24c5e1(0x54b)]=!![],_0x40050b[_0x24c5e1(0x340)][_0x24c5e1(0x1ec)]['call'](this),_0x7d5f0a[_0x24c5e1(0x54b)]=![],this[_0x24c5e1(0x3a3)]=this[_0x24c5e1(0x30e)][_0x24c5e1(0x546)]();}}return Scene_ItemBase['prototype']['buttonAssistKey1']['call'](this);},Scene_Item[_0x26e348(0x462)][_0x26e348(0x281)]=function(){const _0xb5563a=_0x26e348;if(this[_0xb5563a(0x309)]()){if('BTNUr'===_0xb5563a(0x292))this[_0xb5563a(0x391)]();else return VisuMZ[_0xb5563a(0x340)][_0xb5563a(0x1fa)][_0xb5563a(0x16e)][_0xb5563a(0x433)];}return Scene_ItemBase[_0xb5563a(0x462)][_0xb5563a(0x281)][_0xb5563a(0x62d)](this);},Scene_Equip[_0x26e348(0x462)][_0x26e348(0x696)]=function(){const _0x372a27=_0x26e348;Scene_ItemBase['prototype'][_0x372a27(0x696)]['call'](this),this[_0x372a27(0x635)]();},Scene_Equip['prototype'][_0x26e348(0x656)]=function(){const _0x453459=_0x26e348;if(ConfigManager[_0x453459(0x5f2)]&&ConfigManager[_0x453459(0x556)]!==undefined)return ConfigManager[_0x453459(0x556)];else{if(this[_0x453459(0x345)]())return this[_0x453459(0x2cf)]()[_0x453459(0x28b)](/LOWER/i);else Scene_MenuBase[_0x453459(0x462)][_0x453459(0x287)][_0x453459(0x62d)](this);}},Scene_Equip[_0x26e348(0x462)]['isRightInputMode']=function(){const _0x20ee23=_0x26e348;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x20ee23(0x4a6)]!==undefined){if('kysXE'!==_0x20ee23(0x246))return ConfigManager[_0x20ee23(0x4a6)];else{const _0x7823d=this[_0x20ee23(0x5b0)](_0x4ddf81),_0x5b66b9=this[_0x20ee23(0x1e9)](_0x2a0c6c)[_0x20ee23(0x291)];return _0x5b66b9<=_0x7823d[_0x20ee23(0x291)]?_0x20ee23(0x381):_0x20ee23(0x213);}}else{if(this[_0x20ee23(0x345)]())return this[_0x20ee23(0x2cf)]()[_0x20ee23(0x28b)](/RIGHT/i);else Scene_MenuBase['prototype']['isRightInputMode'][_0x20ee23(0x62d)](this);}},Scene_Equip[_0x26e348(0x462)][_0x26e348(0x2cf)]=function(){const _0x22bf10=_0x26e348;return VisuMZ[_0x22bf10(0x340)]['Settings'][_0x22bf10(0x35e)][_0x22bf10(0x3aa)];},Scene_Equip[_0x26e348(0x462)][_0x26e348(0x40c)]=function(){const _0x2263a4=_0x26e348;return this[_0x2263a4(0x68e)]&&this[_0x2263a4(0x68e)]['isUseModernControls']();},Scene_Equip['prototype'][_0x26e348(0x345)]=function(){const _0x1ebb5f=_0x26e348;return VisuMZ[_0x1ebb5f(0x340)][_0x1ebb5f(0x1fa)]['EquipScene'][_0x1ebb5f(0x565)];},VisuMZ[_0x26e348(0x340)][_0x26e348(0x335)]=Scene_Equip[_0x26e348(0x462)][_0x26e348(0x602)],Scene_Equip['prototype']['create']=function(){const _0x25fc64=_0x26e348;VisuMZ[_0x25fc64(0x340)]['Scene_Equip_create'][_0x25fc64(0x62d)](this),this['isUseModernControls']()&&this[_0x25fc64(0x601)]();},VisuMZ[_0x26e348(0x340)][_0x26e348(0x307)]=Scene_Equip['prototype'][_0x26e348(0x209)],Scene_Equip['prototype'][_0x26e348(0x209)]=function(){const _0xcb4cde=_0x26e348;return this[_0xcb4cde(0x345)]()?this[_0xcb4cde(0x2bf)]():'PrUQv'!==_0xcb4cde(0x603)?_0x10ff6d[_0xcb4cde(0x454)]?_0x39ecac[_0xcb4cde(0x38f)][_0xcb4cde(0x1fa)][_0xcb4cde(0x48e)][_0xcb4cde(0x280)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7]:VisuMZ[_0xcb4cde(0x340)][_0xcb4cde(0x307)]['call'](this);},Scene_Equip[_0x26e348(0x462)]['helpWindowRectItemsEquipsCore']=function(){const _0x17c3fd=_0x26e348,_0x36f06d=0x0,_0x4a3f79=this[_0x17c3fd(0x40f)](),_0x47fd1d=Graphics[_0x17c3fd(0x256)],_0x3cfa78=this[_0x17c3fd(0x30d)]();return new Rectangle(_0x36f06d,_0x4a3f79,_0x47fd1d,_0x3cfa78);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x390)]=Scene_Equip['prototype']['statusWindowRect'],Scene_Equip[_0x26e348(0x462)][_0x26e348(0x224)]=function(){const _0x4ef639=_0x26e348;return this[_0x4ef639(0x345)]()?this[_0x4ef639(0x405)]():VisuMZ[_0x4ef639(0x340)]['Scene_Equip_statusWindowRect'][_0x4ef639(0x62d)](this);},Scene_Equip[_0x26e348(0x462)][_0x26e348(0x405)]=function(){const _0x5472a6=_0x26e348,_0x38d782=this[_0x5472a6(0x287)]()?0x0:Graphics['boxWidth']-this[_0x5472a6(0x38d)](),_0x142c28=this['mainAreaTop'](),_0x266161=this[_0x5472a6(0x38d)](),_0x2264ed=this[_0x5472a6(0x440)]();return new Rectangle(_0x38d782,_0x142c28,_0x266161,_0x2264ed);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x62a)]=Scene_Equip[_0x26e348(0x462)][_0x26e348(0x580)],Scene_Equip[_0x26e348(0x462)][_0x26e348(0x580)]=function(){const _0xc3df43=_0x26e348;VisuMZ[_0xc3df43(0x340)][_0xc3df43(0x62a)]['call'](this);if(this[_0xc3df43(0x352)])this[_0xc3df43(0x68e)][_0xc3df43(0x65a)](this[_0xc3df43(0x352)]);},VisuMZ[_0x26e348(0x340)]['Scene_Equip_commandWindowRect']=Scene_Equip[_0x26e348(0x462)][_0x26e348(0x3e6)],Scene_Equip['prototype'][_0x26e348(0x3e6)]=function(){const _0x5952ca=_0x26e348;if(this[_0x5952ca(0x345)]()){if(_0x5952ca(0x640)==='khIqd')return this['commandWindowRectItemsEquipsCore']();else{if(!this[_0x5952ca(0x5b2)]){const _0x294164=_0x28952c[_0x5952ca(0x626)](this);_0x294164[_0x5952ca(0x5b2)]=!![],_0x393cc6[_0x5952ca(0x340)][_0x5952ca(0x21d)][_0x5952ca(0x62d)](this,_0x41f7e0,_0x3c4e66),this[_0x5952ca(0x393)](_0x294164);}else _0x1c3623[_0x5952ca(0x340)]['Game_Actor_forceChangeEquip'][_0x5952ca(0x62d)](this,_0x439ef3,_0x8b39e8);}}else return VisuMZ[_0x5952ca(0x340)][_0x5952ca(0x67d)][_0x5952ca(0x62d)](this);},Scene_Equip['prototype'][_0x26e348(0x46f)]=function(){const _0x12c615=_0x26e348,_0xf761b8=VisuMZ[_0x12c615(0x340)]['Settings'][_0x12c615(0x35e)];return _0xf761b8[_0x12c615(0x346)]||_0xf761b8[_0x12c615(0x586)];},Scene_Equip[_0x26e348(0x462)][_0x26e348(0x51e)]=function(){const _0x1961c4=_0x26e348,_0x2f79dc=this['shouldCommandWindowExist'](),_0x385e85=this[_0x1961c4(0x287)]()?this[_0x1961c4(0x38d)]():0x0,_0x2b2832=this[_0x1961c4(0x230)](),_0x471a75=Graphics[_0x1961c4(0x256)]-this[_0x1961c4(0x38d)](),_0x5aef19=_0x2f79dc?this[_0x1961c4(0x18e)](0x1,!![]):0x0;return new Rectangle(_0x385e85,_0x2b2832,_0x471a75,_0x5aef19);},VisuMZ['ItemsEquipsCore'][_0x26e348(0x161)]=Scene_Equip['prototype'][_0x26e348(0x21b)],Scene_Equip[_0x26e348(0x462)][_0x26e348(0x21b)]=function(){const _0x4755e6=_0x26e348;VisuMZ[_0x4755e6(0x340)][_0x4755e6(0x161)][_0x4755e6(0x62d)](this),this[_0x4755e6(0x40c)]()&&this[_0x4755e6(0x3f2)]();},VisuMZ[_0x26e348(0x340)]['Scene_Equip_slotWindowRect']=Scene_Equip[_0x26e348(0x462)][_0x26e348(0x651)],Scene_Equip[_0x26e348(0x462)][_0x26e348(0x651)]=function(){const _0x3c49f9=_0x26e348;if(this[_0x3c49f9(0x345)]()){if(_0x3c49f9(0x536)===_0x3c49f9(0x536))return this[_0x3c49f9(0x25a)]();else _0xc12242[_0x3c49f9(0x340)][_0x3c49f9(0x227)][_0x3c49f9(0x62d)](this),this[_0x3c49f9(0x50c)]();}else{if('mycgQ'!=='lInur')return VisuMZ['ItemsEquipsCore'][_0x3c49f9(0x593)]['call'](this);else{const _0x17a05e=_0x186d1f['x']+_0x28c6bf['floor']((_0x1e74c1[_0x3c49f9(0x291)]-_0x4ff0b9)/0x2);this[_0x3c49f9(0x2a2)](_0x5b4393,_0x17a05e,_0x36dd29['y'],_0x2f9eb4);}}},Scene_Equip[_0x26e348(0x462)]['slotWindowRectItemsEquipsCore']=function(){const _0x490fb6=_0x26e348,_0x22ddee=this['commandWindowRect'](),_0x7eae75=this['isRightInputMode']()?this['statusWidth']():0x0,_0x164acf=_0x22ddee['y']+_0x22ddee[_0x490fb6(0x38b)],_0xde9aa1=Graphics[_0x490fb6(0x256)]-this[_0x490fb6(0x38d)](),_0x160a20=this['mainAreaHeight']()-_0x22ddee[_0x490fb6(0x38b)];return new Rectangle(_0x7eae75,_0x164acf,_0xde9aa1,_0x160a20);},VisuMZ['ItemsEquipsCore'][_0x26e348(0x1f4)]=Scene_Equip[_0x26e348(0x462)]['itemWindowRect'],Scene_Equip[_0x26e348(0x462)][_0x26e348(0x24f)]=function(){const _0x22588d=_0x26e348;return this[_0x22588d(0x345)]()?this['slotWindowRect']():VisuMZ[_0x22588d(0x340)][_0x22588d(0x1f4)][_0x22588d(0x62d)](this);},Scene_Equip[_0x26e348(0x462)][_0x26e348(0x38d)]=function(){const _0x45fa8b=_0x26e348;if(this[_0x45fa8b(0x345)]()){if(_0x45fa8b(0x4b0)!==_0x45fa8b(0x4b0))_0x1aaf46+=_0x29086e[_0x45fa8b(0x4f5)]+0x4;else return this[_0x45fa8b(0x2b4)]();}else return VisuMZ[_0x45fa8b(0x340)][_0x45fa8b(0x1fa)][_0x45fa8b(0x35e)][_0x45fa8b(0x396)];},Scene_Equip[_0x26e348(0x462)][_0x26e348(0x2b4)]=function(){const _0x18e9e3=_0x26e348;return Math[_0x18e9e3(0x160)](Graphics[_0x18e9e3(0x256)]/0x2);},Scene_Equip[_0x26e348(0x462)][_0x26e348(0x3f2)]=function(){const _0xd98f9c=_0x26e348;this[_0xd98f9c(0x428)]['setHandler']('cancel',this[_0xd98f9c(0x2a7)][_0xd98f9c(0x60b)](this)),this['_slotWindow'][_0xd98f9c(0x677)](_0xd98f9c(0x680),this[_0xd98f9c(0x31f)][_0xd98f9c(0x60b)](this)),this[_0xd98f9c(0x428)][_0xd98f9c(0x677)]('pageup',this[_0xd98f9c(0x4d6)][_0xd98f9c(0x60b)](this));},VisuMZ[_0x26e348(0x340)]['Scene_Equip_commandEquip']=Scene_Equip[_0x26e348(0x462)][_0x26e348(0x601)],Scene_Equip['prototype']['commandEquip']=function(){const _0xbfbe03=_0x26e348;this[_0xbfbe03(0x40c)]()&&(this['_commandWindow'][_0xbfbe03(0x399)](),this[_0xbfbe03(0x68e)][_0xbfbe03(0x32f)]()),VisuMZ[_0xbfbe03(0x340)][_0xbfbe03(0x48d)][_0xbfbe03(0x62d)](this);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x39f)]=Scene_Equip[_0x26e348(0x462)][_0x26e348(0x2c6)],Scene_Equip[_0x26e348(0x462)][_0x26e348(0x2c6)]=function(){const _0x3f70d1=_0x26e348;if(this[_0x3f70d1(0x428)][_0x3f70d1(0x54f)]()>=0x0)_0x3f70d1(0x1ad)!==_0x3f70d1(0x551)?(VisuMZ[_0x3f70d1(0x340)][_0x3f70d1(0x39f)][_0x3f70d1(0x62d)](this),this[_0x3f70d1(0x674)]()):_0xcde845=_0x40832e[_0x3f70d1(0x4ff)];else{if(_0x3f70d1(0x273)!==_0x3f70d1(0x273)){const _0x561f66=_0x5e4169[_0x3f70d1(0x266)];this['drawText'](_0x561f66,_0x4a34c4,_0x895647,_0x487381,_0x3f70d1(0x56f));}else this[_0x3f70d1(0x428)][_0x3f70d1(0x15e)](0x0),this[_0x3f70d1(0x428)]['activate']();}},Scene_Equip['prototype'][_0x26e348(0x674)]=function(){const _0x596b76=_0x26e348;this['_itemWindow'][_0x596b76(0x3ef)]();const _0xe35651=this[_0x596b76(0x428)][_0x596b76(0x546)](),_0x21fbb3=this['_itemWindow'][_0x596b76(0x379)]['indexOf'](_0xe35651),_0xd02178=Math[_0x596b76(0x160)](this[_0x596b76(0x5c3)][_0x596b76(0x331)]()/0x2)-0x1;this['_itemWindow'][_0x596b76(0x15e)](_0x21fbb3>=0x0?_0x21fbb3:0x0),this['_itemWindow'][_0x596b76(0x228)]>0x1&&(this[_0x596b76(0x5c3)][_0x596b76(0x228)]=0x1,this[_0x596b76(0x5c3)][_0x596b76(0x252)]()),this['_itemWindow'][_0x596b76(0x268)](this[_0x596b76(0x5c3)][_0x596b76(0x54f)]()-_0xd02178);},VisuMZ[_0x26e348(0x340)]['Scene_Equip_onSlotCancel']=Scene_Equip[_0x26e348(0x462)][_0x26e348(0x159)],Scene_Equip[_0x26e348(0x462)][_0x26e348(0x159)]=function(){const _0x1520b6=_0x26e348;VisuMZ[_0x1520b6(0x340)][_0x1520b6(0x2c7)]['call'](this);if(this['isUseModernControls']()){if(_0x1520b6(0x2ae)!==_0x1520b6(0x2ae))return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x1520b6(0x405)]():_0xd859dd['ItemsEquipsCore'][_0x1520b6(0x1fa)][_0x1520b6(0x16e)][_0x1520b6(0x19a)]['call'](this);else this[_0x1520b6(0x68e)][_0x1520b6(0x15e)](0x0),this[_0x1520b6(0x428)]['deactivate']();}},VisuMZ[_0x26e348(0x340)][_0x26e348(0x3f7)]=Scene_Equip[_0x26e348(0x462)][_0x26e348(0x232)],Scene_Equip[_0x26e348(0x462)][_0x26e348(0x232)]=function(){const _0x50da20=_0x26e348;VisuMZ[_0x50da20(0x340)][_0x50da20(0x3f7)]['call'](this);if(this[_0x50da20(0x40c)]()){if(_0x50da20(0x498)!==_0x50da20(0x498)){_0x261565[_0x50da20(0x462)]['callUpdateHelp'][_0x50da20(0x62d)](this);if(this[_0x50da20(0x3f6)])this[_0x50da20(0x20d)]();}else this['_commandWindow'][_0x50da20(0x32f)](),this[_0x50da20(0x68e)][_0x50da20(0x399)](),this[_0x50da20(0x428)][_0x50da20(0x15e)](0x0),this[_0x50da20(0x428)][_0x50da20(0x305)]();}},Scene_Equip[_0x26e348(0x462)][_0x26e348(0x4c3)]=function(){const _0x26c7bb=_0x26e348;if(!this[_0x26c7bb(0x428)])return![];if(!this[_0x26c7bb(0x428)]['active'])return![];return this[_0x26c7bb(0x428)][_0x26c7bb(0x398)]();},Scene_Equip['prototype']['buttonAssistKey3']=function(){const _0x340a8a=_0x26e348;if(this['buttonAssistSlotWindowShift']()){if('gTzUI'!==_0x340a8a(0x28c))return TextManager[_0x340a8a(0x644)]('shift');else{const _0x58d3a9=_0x170eda[_0x340a8a(0x508)]('['+_0x1334b9['$1']['match'](/\d+/g)+']');for(const _0x4da65b of _0x58d3a9){if(!_0x39810c[_0x340a8a(0x4b9)](_0x4da65b))return![];}return!![];}}return Scene_MenuBase[_0x340a8a(0x462)][_0x340a8a(0x1d7)][_0x340a8a(0x62d)](this);},Scene_Equip['prototype'][_0x26e348(0x591)]=function(){const _0x2e997f=_0x26e348;if(this[_0x2e997f(0x4c3)]()){if(_0x2e997f(0x32b)===_0x2e997f(0x32b))return VisuMZ[_0x2e997f(0x340)]['Settings'][_0x2e997f(0x35e)][_0x2e997f(0x2f8)];else _0x42a085=_0x37cbcb[_0x2e997f(0x66a)][_0x34cf1c(_0x4288f3['$1'])]||'';}return Scene_MenuBase[_0x2e997f(0x462)][_0x2e997f(0x591)][_0x2e997f(0x62d)](this);},Scene_Equip[_0x26e348(0x462)]['buttonAssistOffset3']=function(){const _0x260b44=_0x26e348;if(this['buttonAssistSlotWindowShift']())return this[_0x260b44(0x3d2)][_0x260b44(0x291)]/0x5/-0x3;return Scene_MenuBase[_0x260b44(0x462)][_0x260b44(0x34e)][_0x260b44(0x62d)](this);},Scene_Equip[_0x26e348(0x462)]['popScene']=function(){const _0x1f7833=_0x26e348;SceneManager[_0x1f7833(0x179)]();},VisuMZ[_0x26e348(0x340)][_0x26e348(0x57c)]=Scene_Load[_0x26e348(0x462)][_0x26e348(0x455)],Scene_Load[_0x26e348(0x462)]['reloadMapIfUpdated']=function(){const _0x3f08d4=_0x26e348;VisuMZ[_0x3f08d4(0x340)][_0x3f08d4(0x57c)][_0x3f08d4(0x62d)](this),this[_0x3f08d4(0x599)]();},Scene_Load[_0x26e348(0x462)]['refreshActorEquipSlotsIfUpdated']=function(){const _0x300ac3=_0x26e348;if($gameSystem['versionId']()!==$dataSystem[_0x300ac3(0x403)])for(const _0x142b6d of $gameActors[_0x300ac3(0x379)]){if(_0x300ac3(0x47d)===_0x300ac3(0x26b))this[_0x300ac3(0x40d)](),_0x64be61['_scene'][_0x300ac3(0x601)](),_0x3ece92['_scene']['_slotWindow'][_0x300ac3(0x15e)](-0x1);else{if(_0x142b6d)_0x142b6d[_0x300ac3(0x1d8)]();}}},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x656)]=function(){const _0x3bb59f=_0x26e348;if(ConfigManager[_0x3bb59f(0x5f2)]&&ConfigManager[_0x3bb59f(0x556)]!==undefined){if(_0x3bb59f(0x3ec)!=='WJENA')return ConfigManager[_0x3bb59f(0x556)];else this[_0x3bb59f(0x2d8)][_0x3bb59f(0x5b8)](),this[_0x3bb59f(0x30e)][_0x3bb59f(0x1d4)](),this[_0x3bb59f(0x30e)][_0x3bb59f(0x399)](),this['_statusWindow'][_0x3bb59f(0x1d4)]();}else{if(this[_0x3bb59f(0x345)]())return this[_0x3bb59f(0x2cf)]()['match'](/LOWER/i);else{if(_0x3bb59f(0x1dd)!==_0x3bb59f(0x1dd)){const _0x448c29=_0x23f473(_0x18c28c['$1']);_0x448c29!==_0x55c4aa[_0x376697][_0x3bb59f(0x5b6)]&&(_0x44117a(_0x3bb59f(0x4d8)[_0x3bb59f(0x43f)](_0x53dce1,_0x448c29)),_0x13bfab[_0x3bb59f(0x45a)]());}else Scene_MenuBase[_0x3bb59f(0x462)][_0x3bb59f(0x287)]['call'](this);}}},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x287)]=function(){const _0x1d0d69=_0x26e348;if(ConfigManager[_0x1d0d69(0x5f2)]&&ConfigManager['uiInputPosition']!==undefined)return _0x1d0d69(0x427)===_0x1d0d69(0x427)?ConfigManager[_0x1d0d69(0x4a6)]:this[_0x1d0d69(0x1ae)]()<=0x1?_0xda3e2a['prototype'][_0x1d0d69(0x568)][_0x1d0d69(0x62d)](this):_0x29067f[_0x1d0d69(0x340)]['Window_ItemList_colSpacing'][_0x1d0d69(0x62d)](this);else{if(this[_0x1d0d69(0x345)]())return this[_0x1d0d69(0x2cf)]()['match'](/RIGHT/i);else{if(_0x1d0d69(0x5ce)===_0x1d0d69(0x25d))return this[_0x1d0d69(0x477)]()[_0x1d0d69(0x605)](this[_0x1d0d69(0x5a0)]());else Scene_MenuBase[_0x1d0d69(0x462)][_0x1d0d69(0x287)][_0x1d0d69(0x62d)](this);}}},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x2cf)]=function(){const _0x2a614c=_0x26e348;return VisuMZ[_0x2a614c(0x340)][_0x2a614c(0x1fa)]['ShopScene'][_0x2a614c(0x3aa)];},Scene_Shop['prototype']['isUseModernControls']=function(){const _0x4ea991=_0x26e348;return this['_categoryWindow']&&this[_0x4ea991(0x4b7)][_0x4ea991(0x40c)]();},Scene_Shop[_0x26e348(0x462)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x24b489=_0x26e348;return VisuMZ[_0x24b489(0x340)][_0x24b489(0x1fa)]['ShopScene'][_0x24b489(0x565)];},VisuMZ[_0x26e348(0x340)][_0x26e348(0x61f)]=Scene_Shop[_0x26e348(0x462)][_0x26e348(0x186)],Scene_Shop[_0x26e348(0x462)][_0x26e348(0x186)]=function(_0x301323,_0x17caf5){const _0x4eaf61=_0x26e348;_0x301323=VisuMZ[_0x4eaf61(0x340)][_0x4eaf61(0x4b5)](_0x301323),VisuMZ[_0x4eaf61(0x340)]['Scene_Shop_prepare'][_0x4eaf61(0x62d)](this,_0x301323,_0x17caf5),this['adjustHiddenShownGoods']();},Scene_Shop['prototype'][_0x26e348(0x27f)]=function(){const _0x451548=_0x26e348;this['_goodsCount']=0x0;const _0xa67ac0=[];for(const _0xb33788 of this[_0x451548(0x3f8)]){if(this[_0x451548(0x588)](_0xb33788))this['_goodsCount']++;else{if('odckN'===_0x451548(0x579)){const _0x11a708=this['index']();return _0x1d683b[_0x451548(0x68d)](_0x451548(0x1a3))?this[_0x451548(0x391)]():this['cursorDown'](_0x51ca38['isTriggered']('down')),this[_0x451548(0x54f)]()!==_0x11a708&&this[_0x451548(0x40d)](),!![];}else _0xa67ac0['push'](_0xb33788);}}for(const _0x5d66c0 of _0xa67ac0){this[_0x451548(0x3f8)][_0x451548(0x507)](_0x5d66c0);}},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x588)]=function(_0x45264b){if(_0x45264b[0x0]>0x2||_0x45264b[0x0]<0x0)return![];const _0x18350f=[$dataItems,$dataWeapons,$dataArmors][_0x45264b[0x0]][_0x45264b[0x1]];if(!_0x18350f)return![];return!![];},VisuMZ[_0x26e348(0x340)][_0x26e348(0x584)]=Scene_Shop[_0x26e348(0x462)][_0x26e348(0x602)],Scene_Shop[_0x26e348(0x462)][_0x26e348(0x602)]=function(){const _0x448d56=_0x26e348;VisuMZ[_0x448d56(0x340)][_0x448d56(0x584)][_0x448d56(0x62d)](this),this[_0x448d56(0x345)]()&&this[_0x448d56(0x31c)](),this['resetShopSwitches']();},Scene_Shop['prototype'][_0x26e348(0x31c)]=function(){const _0x157163=_0x26e348;this['_dummyWindow'][_0x157163(0x5b8)](),this[_0x157163(0x30e)][_0x157163(0x1d4)](),this[_0x157163(0x30e)][_0x157163(0x399)](),this[_0x157163(0x41f)]['show']();},VisuMZ[_0x26e348(0x340)]['Scene_Shop_helpWindowRect']=Scene_Shop['prototype'][_0x26e348(0x209)],Scene_Shop[_0x26e348(0x462)][_0x26e348(0x209)]=function(){const _0x32c0af=_0x26e348;if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x32c0af(0x2bf)]();else{if('WdlWs'===_0x32c0af(0x57d))return VisuMZ['ItemsEquipsCore'][_0x32c0af(0x3b2)]['call'](this);else{const _0x138b0b=_0x44c461[_0x32c0af(0x43b)](_0x4fdc3d[_0x32c0af(0x3cc)]());if(_0x138b0b>0x0)_0x960c72[_0x32c0af(0x560)]['push'](_0x138b0b);}}},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x2bf)]=function(){const _0x13ba6d=_0x26e348,_0x173c2d=0x0,_0x1624d5=this[_0x13ba6d(0x40f)](),_0x5710a9=Graphics[_0x13ba6d(0x256)],_0x1eb7ed=this['helpAreaHeight']();return new Rectangle(_0x173c2d,_0x1624d5,_0x5710a9,_0x1eb7ed);},VisuMZ['ItemsEquipsCore'][_0x26e348(0x302)]=Scene_Shop[_0x26e348(0x462)]['goldWindowRect'],Scene_Shop[_0x26e348(0x462)][_0x26e348(0x42a)]=function(){const _0x464c82=_0x26e348;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x464c82(0x3cf)==='tFPxL')this['cursorPagedown']();else return this['goldWindowRectItemsEquipsCore']();}else return VisuMZ[_0x464c82(0x340)]['Scene_Shop_goldWindowRect'][_0x464c82(0x62d)](this);},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x43a)]=function(){const _0x2419bb=_0x26e348,_0x1eb162=this['mainCommandWidth'](),_0x1192f2=this[_0x2419bb(0x18e)](0x1,!![]),_0x46a969=this[_0x2419bb(0x287)]()?0x0:Graphics[_0x2419bb(0x256)]-_0x1eb162,_0x4d4474=this[_0x2419bb(0x230)]();return new Rectangle(_0x46a969,_0x4d4474,_0x1eb162,_0x1192f2);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x607)]=Scene_Shop[_0x26e348(0x462)][_0x26e348(0x3e6)],Scene_Shop[_0x26e348(0x462)][_0x26e348(0x3e6)]=function(){const _0x27938c=_0x26e348;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x27938c(0x51e)]():VisuMZ[_0x27938c(0x340)][_0x27938c(0x607)]['call'](this);},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x51e)]=function(){const _0x57e5a2=_0x26e348,_0x54e46c=this['isRightInputMode']()?this[_0x57e5a2(0x42c)]():0x0,_0x30f878=this[_0x57e5a2(0x230)](),_0x1ea9d8=Graphics[_0x57e5a2(0x256)]-this[_0x57e5a2(0x42c)](),_0x41287e=this[_0x57e5a2(0x18e)](0x1,!![]);return new Rectangle(_0x54e46c,_0x30f878,_0x1ea9d8,_0x41287e);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x5f0)]=Scene_Shop['prototype']['numberWindowRect'],Scene_Shop[_0x26e348(0x462)][_0x26e348(0x19d)]=function(){const _0x568199=_0x26e348;if(this[_0x568199(0x345)]())return this[_0x568199(0x2d1)]();else{if(_0x568199(0x158)!==_0x568199(0x36f))return VisuMZ['ItemsEquipsCore'][_0x568199(0x5f0)][_0x568199(0x62d)](this);else _0x51fbf4[_0x568199(0x340)]['Window_ItemList_drawItem'][_0x568199(0x62d)](this,_0x499e69),this[_0x568199(0x3d1)](_0x591dca);}},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x2d1)]=function(){const _0x3d43d3=_0x26e348,_0x320a82=this[_0x3d43d3(0x68e)]['y']+this['_commandWindow'][_0x3d43d3(0x38b)],_0x3717d0=Graphics[_0x3d43d3(0x256)]-this['statusWidth'](),_0x44f3e4=this[_0x3d43d3(0x287)]()?Graphics[_0x3d43d3(0x256)]-_0x3717d0:0x0,_0x156f9b=this[_0x3d43d3(0x440)]()-this[_0x3d43d3(0x68e)][_0x3d43d3(0x38b)];return new Rectangle(_0x44f3e4,_0x320a82,_0x3717d0,_0x156f9b);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x21e)]=Scene_Shop[_0x26e348(0x462)][_0x26e348(0x224)],Scene_Shop[_0x26e348(0x462)][_0x26e348(0x224)]=function(){const _0xca7c9b=_0x26e348;return this[_0xca7c9b(0x345)]()?_0xca7c9b(0x362)===_0xca7c9b(0x362)?this[_0xca7c9b(0x405)]():_0x4a73e8[_0xca7c9b(0x340)]['Scene_Shop_buyWindowRect']['call'](this):VisuMZ[_0xca7c9b(0x340)][_0xca7c9b(0x21e)][_0xca7c9b(0x62d)](this);},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x405)]=function(){const _0x512dfe=_0x26e348,_0x2ba5bf=this[_0x512dfe(0x38d)](),_0x7ef80e=this[_0x512dfe(0x440)]()-this['_commandWindow']['height'],_0x52b1f6=this[_0x512dfe(0x287)]()?0x0:Graphics[_0x512dfe(0x256)]-_0x2ba5bf,_0x32646e=this[_0x512dfe(0x68e)]['y']+this[_0x512dfe(0x68e)][_0x512dfe(0x38b)];return new Rectangle(_0x52b1f6,_0x32646e,_0x2ba5bf,_0x7ef80e);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x294)]=Scene_Shop[_0x26e348(0x462)][_0x26e348(0x566)],Scene_Shop[_0x26e348(0x462)][_0x26e348(0x566)]=function(){const _0x15f176=_0x26e348;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x15f176(0x2c0)]():VisuMZ['ItemsEquipsCore'][_0x15f176(0x294)][_0x15f176(0x62d)](this);},Scene_Shop['prototype'][_0x26e348(0x2c0)]=function(){const _0x4e4e97=_0x26e348,_0xff7e13=this['_commandWindow']['y']+this[_0x4e4e97(0x68e)][_0x4e4e97(0x38b)],_0x30228b=Graphics[_0x4e4e97(0x256)]-this[_0x4e4e97(0x38d)](),_0x288050=this[_0x4e4e97(0x440)]()-this[_0x4e4e97(0x68e)]['height'],_0x54e2ac=this[_0x4e4e97(0x287)]()?Graphics[_0x4e4e97(0x256)]-_0x30228b:0x0;return new Rectangle(_0x54e2ac,_0xff7e13,_0x30228b,_0x288050);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x192)]=Scene_Shop[_0x26e348(0x462)]['createCategoryWindow'],Scene_Shop[_0x26e348(0x462)][_0x26e348(0x397)]=function(){const _0x57b1eb=_0x26e348;VisuMZ['ItemsEquipsCore']['Scene_Shop_createCategoryWindow']['call'](this),this[_0x57b1eb(0x40c)]()&&this[_0x57b1eb(0x2d3)]();},VisuMZ[_0x26e348(0x340)][_0x26e348(0x502)]=Scene_Shop['prototype'][_0x26e348(0x451)],Scene_Shop[_0x26e348(0x462)][_0x26e348(0x451)]=function(){const _0x74873a=_0x26e348;return this[_0x74873a(0x345)]()?this['categoryWindowRectItemsEquipsCore']():VisuMZ['ItemsEquipsCore'][_0x74873a(0x502)][_0x74873a(0x62d)](this);},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x422)]=function(){const _0x5e802a=_0x26e348,_0x105c47=this[_0x5e802a(0x68e)]['y'],_0x5732cc=this['_commandWindow']['width'],_0x2848cd=this['calcWindowHeight'](0x1,!![]),_0x18ed42=this[_0x5e802a(0x287)]()?Graphics[_0x5e802a(0x256)]-_0x5732cc:0x0;return new Rectangle(_0x18ed42,_0x105c47,_0x5732cc,_0x2848cd);},Scene_Shop['prototype'][_0x26e348(0x2d3)]=function(){const _0x2378b5=_0x26e348;delete this[_0x2378b5(0x4b7)]['_handlers']['ok'],delete this['_categoryWindow'][_0x2378b5(0x558)][_0x2378b5(0x328)];},VisuMZ[_0x26e348(0x340)][_0x26e348(0x300)]=Scene_Shop[_0x26e348(0x462)][_0x26e348(0x628)],Scene_Shop[_0x26e348(0x462)][_0x26e348(0x628)]=function(){const _0x57e974=_0x26e348;VisuMZ[_0x57e974(0x340)]['Scene_Shop_createSellWindow'][_0x57e974(0x62d)](this),this[_0x57e974(0x345)]()&&this[_0x57e974(0x56e)]();},VisuMZ[_0x26e348(0x340)][_0x26e348(0x187)]=Scene_Shop[_0x26e348(0x462)][_0x26e348(0x35d)],Scene_Shop['prototype'][_0x26e348(0x35d)]=function(){const _0x3b7247=_0x26e348;return this[_0x3b7247(0x345)]()?'gLBdm'!==_0x3b7247(0x5a7)?this['sellWindowRectItemsEquipsCore']():[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7]:VisuMZ[_0x3b7247(0x340)][_0x3b7247(0x187)][_0x3b7247(0x62d)](this);},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x57f)]=function(){const _0x5a1905=_0x26e348,_0x1931f6=this[_0x5a1905(0x4b7)]['y']+this[_0x5a1905(0x4b7)][_0x5a1905(0x38b)],_0x298fc6=Graphics[_0x5a1905(0x256)]-this['statusWidth'](),_0x52be55=this['mainAreaHeight']()-this[_0x5a1905(0x4b7)]['height'],_0x353a58=this[_0x5a1905(0x287)]()?Graphics['boxWidth']-_0x298fc6:0x0;return new Rectangle(_0x353a58,_0x1931f6,_0x298fc6,_0x52be55);},Scene_Shop['prototype'][_0x26e348(0x56e)]=function(){const _0x4b9be2=_0x26e348;this[_0x4b9be2(0x320)]['setStatusWindow'](this[_0x4b9be2(0x41f)]);},Scene_Shop['prototype'][_0x26e348(0x38d)]=function(){const _0x142691=_0x26e348;return VisuMZ['ItemsEquipsCore']['Settings'][_0x142691(0x1da)]['Width'];},VisuMZ['ItemsEquipsCore'][_0x26e348(0x5d2)]=Scene_Shop[_0x26e348(0x462)][_0x26e348(0x63d)],Scene_Shop['prototype'][_0x26e348(0x63d)]=function(){const _0x591d4f=_0x26e348;VisuMZ['ItemsEquipsCore'][_0x591d4f(0x5d2)]['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x591d4f(0x41f)][_0x591d4f(0x1d4)](),this[_0x591d4f(0x320)][_0x591d4f(0x383)]();},VisuMZ[_0x26e348(0x340)][_0x26e348(0x544)]=Scene_Shop[_0x26e348(0x462)][_0x26e348(0x3be)],Scene_Shop[_0x26e348(0x462)][_0x26e348(0x3be)]=function(){const _0xba478f=_0x26e348;VisuMZ[_0xba478f(0x340)][_0xba478f(0x544)]['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this['commandBuyItemsEquipsCore']();},Scene_Shop['prototype'][_0x26e348(0x460)]=function(){const _0x104602=_0x26e348;this[_0x104602(0x3ae)]=this[_0x104602(0x3ae)]||0x0,this[_0x104602(0x30e)][_0x104602(0x15e)](this[_0x104602(0x3ae)]);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x5be)]=Scene_Shop[_0x26e348(0x462)]['commandSell'],Scene_Shop['prototype'][_0x26e348(0x336)]=function(){const _0x158dbd=_0x26e348;VisuMZ[_0x158dbd(0x340)][_0x158dbd(0x5be)][_0x158dbd(0x62d)](this),this[_0x158dbd(0x345)]()&&this['commandSellItemsEquipsCore'](),this[_0x158dbd(0x40c)]()&&(this[_0x158dbd(0x4b7)][_0x158dbd(0x15e)](0x0),this[_0x158dbd(0x64d)]());},Scene_Shop[_0x26e348(0x462)]['commandSellItemsEquipsCore']=function(){const _0x21895e=_0x26e348;this[_0x21895e(0x30e)][_0x21895e(0x5b8)](),this[_0x21895e(0x68e)][_0x21895e(0x5b8)]();},VisuMZ[_0x26e348(0x340)][_0x26e348(0x338)]=Scene_Shop[_0x26e348(0x462)][_0x26e348(0x438)],Scene_Shop['prototype'][_0x26e348(0x438)]=function(){const _0x5a530b=_0x26e348;VisuMZ[_0x5a530b(0x340)][_0x5a530b(0x338)]['call'](this),this[_0x5a530b(0x345)]()&&this[_0x5a530b(0x5db)]();},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x5db)]=function(){const _0x134f62=_0x26e348;this[_0x134f62(0x3ae)]=this[_0x134f62(0x30e)][_0x134f62(0x54f)](),this[_0x134f62(0x30e)][_0x134f62(0x1d4)](),this[_0x134f62(0x30e)][_0x134f62(0x399)](),this[_0x134f62(0x30e)][_0x134f62(0x57e)](0x0,0x0),this[_0x134f62(0x41f)][_0x134f62(0x1d4)](),this[_0x134f62(0x2d8)][_0x134f62(0x5b8)]();},VisuMZ[_0x26e348(0x340)][_0x26e348(0x2b3)]=Scene_Shop[_0x26e348(0x462)][_0x26e348(0x2bc)],Scene_Shop['prototype'][_0x26e348(0x2bc)]=function(){const _0x2ba613=_0x26e348;VisuMZ['ItemsEquipsCore'][_0x2ba613(0x2b3)][_0x2ba613(0x62d)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x2ba613(0x509)]();},Scene_Shop[_0x26e348(0x462)]['onCategoryCancelItemsEquipsCore']=function(){const _0x3d51b7=_0x26e348;this[_0x3d51b7(0x30e)][_0x3d51b7(0x1d4)](),this[_0x3d51b7(0x68e)]['show']();},VisuMZ[_0x26e348(0x340)][_0x26e348(0x1ec)]=Scene_Shop[_0x26e348(0x462)]['onBuyOk'],Scene_Shop[_0x26e348(0x462)][_0x26e348(0x1c3)]=function(){const _0x550b4e=_0x26e348;$gameTemp['_bypassProxy']=!![],VisuMZ[_0x550b4e(0x340)][_0x550b4e(0x1ec)][_0x550b4e(0x62d)](this),$gameTemp[_0x550b4e(0x54b)]=![],this[_0x550b4e(0x3a3)]=this[_0x550b4e(0x30e)]['item']();},VisuMZ[_0x26e348(0x340)][_0x26e348(0x5cb)]=Scene_Shop[_0x26e348(0x462)]['buyingPrice'],Scene_Shop[_0x26e348(0x462)][_0x26e348(0x464)]=function(){const _0x38362a=_0x26e348;$gameTemp[_0x38362a(0x54b)]=!![],this[_0x38362a(0x3a3)]=this['_buyWindow'][_0x38362a(0x546)]();const _0x381b21=VisuMZ[_0x38362a(0x340)][_0x38362a(0x5cb)][_0x38362a(0x62d)](this);return $gameTemp[_0x38362a(0x54b)]=![],this[_0x38362a(0x3a3)]=this[_0x38362a(0x30e)][_0x38362a(0x546)](),_0x381b21;},VisuMZ[_0x26e348(0x340)][_0x26e348(0x49b)]=Scene_Shop[_0x26e348(0x462)][_0x26e348(0x207)],Scene_Shop['prototype'][_0x26e348(0x207)]=function(){const _0x41c518=_0x26e348;VisuMZ['ItemsEquipsCore'][_0x41c518(0x49b)][_0x41c518(0x62d)](this),this[_0x41c518(0x345)]()&&this['onSellOkItemsEquipsCore']();},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x517)]=function(){const _0x26a47b=_0x26e348;this[_0x26a47b(0x4b7)][_0x26a47b(0x1d4)]();},VisuMZ['ItemsEquipsCore']['Scene_Shop_onSellCancel']=Scene_Shop['prototype'][_0x26e348(0x3e1)],Scene_Shop['prototype'][_0x26e348(0x3e1)]=function(){const _0x541502=_0x26e348;VisuMZ[_0x541502(0x340)][_0x541502(0x5d6)]['call'](this);this[_0x541502(0x40c)]()&&(_0x541502(0x4e6)!==_0x541502(0x4e6)?_0x3c2970=_0x3411b5[_0x541502(0x41b)](_0x2d7bdd,_0x383139):this['onCategoryCancel']());if(this[_0x541502(0x345)]()){if(_0x541502(0x239)!==_0x541502(0x239)){if(_0x483946)_0x54cc99['prepareNewEquipSlotsOnLoad']();}else this[_0x541502(0x2d8)][_0x541502(0x5b8)]();}},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x424)]=function(_0x1eeb0a){const _0x4baf70=_0x26e348,_0x339f05=this[_0x4baf70(0x3a3)];this[_0x4baf70(0x3a3)]=_0x1eeb0a;const _0x3dfe5a=this[_0x4baf70(0x530)]();return this[_0x4baf70(0x3a3)]=_0x339f05,_0x3dfe5a;},VisuMZ['ItemsEquipsCore'][_0x26e348(0x655)]=Scene_Shop[_0x26e348(0x462)][_0x26e348(0x530)],Scene_Shop['prototype'][_0x26e348(0x530)]=function(){const _0x1a15fd=_0x26e348;let _0x3447d8=this[_0x1a15fd(0x25f)]();const _0x51e570=this[_0x1a15fd(0x3a3)];return _0x3447d8=VisuMZ[_0x1a15fd(0x340)][_0x1a15fd(0x1fa)][_0x1a15fd(0x45d)][_0x1a15fd(0x47a)][_0x1a15fd(0x62d)](this,_0x51e570,_0x3447d8),_0x3447d8;},Scene_Shop['prototype']['determineBaseSellingPrice']=function(){const _0x32878b=_0x26e348;let _0x5437c4=this[_0x32878b(0x3a3)][_0x32878b(0x2d5)];if(!this[_0x32878b(0x3a3)])return 0x0;else{if(this[_0x32878b(0x3a3)][_0x32878b(0x545)]['match'](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){if(_0x32878b(0x1dc)!==_0x32878b(0x1dc))_0x517485[_0x32878b(0x340)][_0x32878b(0x604)][_0x32878b(0x62d)](this,_0x4be046),_0x193b07['_categoryWindow']=this;else{const _0x14504b=String(RegExp['$1']);window[_0x32878b(0x546)]=this[_0x32878b(0x3a3)],window[_0x32878b(0x2d5)]=_0x5437c4*this[_0x32878b(0x3c2)]();try{'Cswik'!=='ZVnOH'?eval(_0x14504b):(_0x52a64c[_0x32878b(0x462)]['refresh'][_0x32878b(0x62d)](this),this[_0x32878b(0x385)]());}catch(_0x34f39e){if(_0x32878b(0x372)===_0x32878b(0x5ba))_0x2b7776[_0x32878b(0x39d)](_0x5260f6,!![]);else{if($gameTemp[_0x32878b(0x685)]())console['log'](_0x34f39e);}}let _0x530576=window[_0x32878b(0x2d5)];window[_0x32878b(0x546)]=undefined,window[_0x32878b(0x2d5)]=undefined;if(isNaN(_0x530576))_0x530576=0x0;return Math['floor'](_0x530576);}}else return this[_0x32878b(0x3a3)][_0x32878b(0x545)][_0x32878b(0x28b)](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):_0x32878b(0x52a)===_0x32878b(0x52a)?Math[_0x32878b(0x160)](this[_0x32878b(0x68f)]()):!this['_purchaseOnly'];}},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x68f)]=function(){const _0x2fff79=_0x26e348;return this['_item'][_0x2fff79(0x2d5)]*this['sellPriceRate']();},Scene_Shop['prototype']['sellPriceRate']=function(){const _0x1561ac=_0x26e348;return VisuMZ[_0x1561ac(0x340)][_0x1561ac(0x1fa)][_0x1561ac(0x45d)][_0x1561ac(0x5ed)];},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x309)]=function(){const _0x3ee014=_0x26e348;if(!this[_0x3ee014(0x2cf)]())return![];if(!this[_0x3ee014(0x40c)]())return![];if(!this[_0x3ee014(0x320)])return![];if(!this[_0x3ee014(0x320)][_0x3ee014(0x4de)])return![];return this[_0x3ee014(0x2cf)]()&&this['isUseModernControls']();},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x21c)]=function(){const _0x3b163c=_0x26e348;if(this[_0x3b163c(0x309)]()){if(_0x3b163c(0x15b)!=='QHfCM')this[_0x3b163c(0x30e)][_0x3b163c(0x1d4)](),this[_0x3b163c(0x68e)][_0x3b163c(0x1d4)]();else return this[_0x3b163c(0x320)][_0x3b163c(0x1ae)]()===0x1?TextManager[_0x3b163c(0x520)]('left',_0x3b163c(0x652)):TextManager['getInputMultiButtonStrings']('pageup',_0x3b163c(0x680));}else{if(this[_0x3b163c(0x4c8)]&&this[_0x3b163c(0x4c8)][_0x3b163c(0x4de)])return TextManager[_0x3b163c(0x520)]('left',_0x3b163c(0x652));}return Scene_MenuBase[_0x3b163c(0x462)]['buttonAssistKey1']['call'](this);},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x258)]=function(){const _0x4c0d11=_0x26e348;if(this[_0x4c0d11(0x4c8)]&&this[_0x4c0d11(0x4c8)][_0x4c0d11(0x4de)]){if('boLLx'!==_0x4c0d11(0x3ba)){_0x11d7b4+=_0x4c0d11(0x2a0)[_0x4c0d11(0x43f)](_0x259838[_0x4c0d11(0x4b8)]),_0x91aa63++;if(_0xaa3bcc>=_0xc374f7)return _0x1149b4;}else return TextManager[_0x4c0d11(0x520)]('up',_0x4c0d11(0x539));}return Scene_MenuBase['prototype'][_0x4c0d11(0x258)][_0x4c0d11(0x62d)](this);},Scene_Shop[_0x26e348(0x462)]['buttonAssistText1']=function(){const _0x36a7ca=_0x26e348;if(this['buttonAssistItemListRequirement']())return VisuMZ[_0x36a7ca(0x340)]['Settings']['ItemScene'][_0x36a7ca(0x433)];else{if(this[_0x36a7ca(0x4c8)]&&this[_0x36a7ca(0x4c8)][_0x36a7ca(0x4de)]){if(_0x36a7ca(0x576)!==_0x36a7ca(0x60c))return VisuMZ[_0x36a7ca(0x340)][_0x36a7ca(0x1fa)]['ShopScene']['buttonAssistSmallIncrement'];else{const _0x37155a='REMOVED\x20EFFECTS';if(!this[_0x36a7ca(0x4cf)][_0x36a7ca(0x5a4)]&&!this[_0x36a7ca(0x529)][_0x37155a])return![];const _0x40502d=this[_0x36a7ca(0x645)]();this[_0x36a7ca(0x349)](_0x40502d,_0x1065e5,_0x2eaded,_0x24c410,!![]);const _0xddeffc=this[_0x36a7ca(0x295)]();return this[_0x36a7ca(0x349)](_0xddeffc,_0x4f9d6a,_0x5ee57b,_0xfcc510,![],_0x36a7ca(0x652)),this[_0x36a7ca(0x608)](_0x4ae7d4,_0x2b1592,_0x5c3bf5),this[_0x36a7ca(0x587)](),!![];}}}return Scene_MenuBase[_0x36a7ca(0x462)][_0x36a7ca(0x281)][_0x36a7ca(0x62d)](this);},Scene_Shop['prototype'][_0x26e348(0x609)]=function(){const _0x11b229=_0x26e348;if(this[_0x11b229(0x4c8)]&&this[_0x11b229(0x4c8)][_0x11b229(0x4de)])return VisuMZ[_0x11b229(0x340)][_0x11b229(0x1fa)][_0x11b229(0x45d)][_0x11b229(0x1f6)];return Scene_MenuBase['prototype'][_0x11b229(0x609)]['call'](this);},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x5fa)]=function(){const _0x2df841=_0x26e348;if(!SceneManager[_0x2df841(0x376)]())return;const _0x2597c5=VisuMZ[_0x2df841(0x340)]['Settings']['ShopScene'];_0x2597c5[_0x2df841(0x2eb)]&&$gameSwitches[_0x2df841(0x39d)](_0x2597c5[_0x2df841(0x2eb)],![]);if(_0x2597c5[_0x2df841(0x46c)]){if(_0x2df841(0x2a3)===_0x2df841(0x5ff)){const _0x77e0f1=this['_itemData'][_0x2df841(0x3af)][_0x15fe96],_0xa3df91=_0x30ea50[_0x2df841(0x462)][_0x2df841(0x62e)](0x1,_0x77e0f1);if(_0xa3df91>0x0){_0x15a3dc+=_0x2df841(0x2a0)[_0x2df841(0x43f)](_0xa3df91),_0x464e8e++;if(_0x39b717>=_0x3e1ddf)return _0xf79c28;}}else $gameSwitches[_0x2df841(0x39d)](_0x2597c5['SwitchSell'],![]);}},VisuMZ[_0x26e348(0x340)][_0x26e348(0x1a9)]=Scene_Shop[_0x26e348(0x462)][_0x26e348(0x4c2)],Scene_Shop['prototype'][_0x26e348(0x4c2)]=function(_0x2fc422){const _0x5d239b=_0x26e348;VisuMZ[_0x5d239b(0x340)][_0x5d239b(0x1a9)]['call'](this,_0x2fc422),this['onBuyItem'](this[_0x5d239b(0x3a3)],_0x2fc422);if(_0x2fc422<=0x0)return;const _0x2f3553=VisuMZ[_0x5d239b(0x340)][_0x5d239b(0x1fa)][_0x5d239b(0x45d)];_0x2f3553[_0x5d239b(0x2eb)]&&$gameSwitches['setValue'](_0x2f3553['SwitchBuy'],!![]),this[_0x5d239b(0x30e)]['refresh'](),this[_0x5d239b(0x320)][_0x5d239b(0x3ef)]();},Scene_Shop['prototype'][_0x26e348(0x18f)]=function(_0x202e1a,_0x5a0c1a){const _0x58caff=_0x26e348;this[_0x58caff(0x61c)](_0x202e1a,_0x5a0c1a),$gameParty[_0x58caff(0x5e0)](_0x202e1a,_0x5a0c1a),$gameParty[_0x58caff(0x535)](_0x5a0c1a*this['buyingPrice']());},Scene_Shop['prototype']['processShopCondListingOnBuyItem']=function(_0x42667e,_0x369996){const _0x50479a=_0x26e348;if(!_0x42667e)return;if(!_0x369996)return;const _0x158229=VisuMZ[_0x50479a(0x340)][_0x50479a(0x2f5)],_0x1b6696=_0x42667e[_0x50479a(0x545)]||'';if(_0x1b6696['match'](_0x158229['BuyTurnSwitchOn'])){const _0x23a01f=String(RegExp['$1'])['split'](',')['map'](_0x3e8b30=>Number(_0x3e8b30));for(const _0x5daed2 of _0x23a01f){_0x50479a(0x53c)===_0x50479a(0x3d7)?(this[_0x50479a(0x40c)]()&&(this[_0x50479a(0x68e)][_0x50479a(0x399)](),this['_commandWindow'][_0x50479a(0x32f)]()),_0x11ac6c[_0x50479a(0x340)][_0x50479a(0x48d)]['call'](this)):$gameSwitches[_0x50479a(0x39d)](_0x5daed2,!![]);}}if(_0x1b6696[_0x50479a(0x28b)](_0x158229['BuyTurnSwitchOff'])){const _0x237912=String(RegExp['$1'])[_0x50479a(0x1b6)](',')[_0x50479a(0x499)](_0x12f117=>Number(_0x12f117));for(const _0x9e5c8c of _0x237912){if('rWuoX'===_0x50479a(0x3ab))return _0x501505[_0x50479a(0x4a6)];else $gameSwitches[_0x50479a(0x39d)](_0x9e5c8c,![]);}}},VisuMZ['ItemsEquipsCore'][_0x26e348(0x667)]=Scene_Shop['prototype'][_0x26e348(0x394)],Scene_Shop['prototype'][_0x26e348(0x394)]=function(_0x34a5bf){const _0x326f98=_0x26e348;VisuMZ['ItemsEquipsCore'][_0x326f98(0x667)][_0x326f98(0x62d)](this,_0x34a5bf),this[_0x326f98(0x316)](this[_0x326f98(0x3a3)],_0x34a5bf);if(_0x34a5bf<=0x0)return;const _0x36108f=VisuMZ[_0x326f98(0x340)][_0x326f98(0x1fa)][_0x326f98(0x45d)];_0x36108f[_0x326f98(0x2eb)]&&(_0x326f98(0x619)!=='iBbgw'?_0x36177e=_0x82cba6['CoreEngine'][_0x326f98(0x1fa)][_0x326f98(0x48e)][_0x326f98(0x280)]:$gameSwitches[_0x326f98(0x39d)](_0x36108f[_0x326f98(0x46c)],!![])),this['_buyWindow']['refresh'](),this[_0x326f98(0x320)][_0x326f98(0x3ef)]();},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x316)]=function(_0x39af8b,_0x70f8f0){const _0xb49ce5=_0x26e348;this[_0xb49ce5(0x1ff)](_0x39af8b,_0x70f8f0),$gameParty[_0xb49ce5(0x48b)](_0x39af8b,_0x70f8f0),$gameParty['addShopTrackingGoldSell'](_0x70f8f0*this[_0xb49ce5(0x530)]());},Scene_Shop[_0x26e348(0x462)][_0x26e348(0x1ff)]=function(_0x940db6,_0x34e70c){const _0xf15495=_0x26e348;if(!_0x940db6)return;if(!_0x34e70c)return;const _0x28715b=VisuMZ[_0xf15495(0x340)][_0xf15495(0x2f5)],_0x262ade=_0x940db6[_0xf15495(0x545)]||'';if(_0x262ade['match'](_0x28715b[_0xf15495(0x229)])){const _0x4e6ab4=String(RegExp['$1'])[_0xf15495(0x1b6)](',')['map'](_0x23fa72=>Number(_0x23fa72));for(const _0x4b76f5 of _0x4e6ab4){$gameSwitches[_0xf15495(0x39d)](_0x4b76f5,!![]);}}if(_0x262ade[_0xf15495(0x28b)](_0x28715b['SellTurnSwitchOff'])){if('lVEfo'==='NCSyR')this[_0xf15495(0x430)](),this['select'](this['index']());else{const _0x49a9d4=String(RegExp['$1'])[_0xf15495(0x1b6)](',')[_0xf15495(0x499)](_0x5cb8b8=>Number(_0x5cb8b8));for(const _0x446c86 of _0x49a9d4){$gameSwitches[_0xf15495(0x39d)](_0x446c86,![]);}}}};function Sprite_NewLabel(){this['initialize'](...arguments);}Sprite_NewLabel[_0x26e348(0x462)]=Object[_0x26e348(0x602)](Sprite['prototype']),Sprite_NewLabel['prototype'][_0x26e348(0x198)]=Sprite_NewLabel,Sprite_NewLabel[_0x26e348(0x462)][_0x26e348(0x1fb)]=function(){const _0x3dfbe6=_0x26e348;Sprite['prototype'][_0x3dfbe6(0x1fb)][_0x3dfbe6(0x62d)](this),this[_0x3dfbe6(0x38a)]();},Sprite_NewLabel[_0x26e348(0x462)][_0x26e348(0x38a)]=function(){const _0x2ed66f=_0x26e348,_0x4b9020=ImageManager[_0x2ed66f(0x4f5)],_0x58f2b8=ImageManager[_0x2ed66f(0x4f2)];this[_0x2ed66f(0x293)]=new Bitmap(_0x4b9020,_0x58f2b8),this[_0x2ed66f(0x1f0)](),this[_0x2ed66f(0x4ea)]();},Sprite_NewLabel['prototype'][_0x26e348(0x1f0)]=function(){const _0x261dee=_0x26e348,_0x33d9e8=VisuMZ[_0x261dee(0x340)]['Settings'][_0x261dee(0x4bb)]['Icon'];if(_0x33d9e8<=0x0)return;const _0x5223a1=ImageManager['loadSystem'](_0x261dee(0x441)),_0x5ee566=ImageManager['iconWidth'],_0x196b99=ImageManager['iconHeight'],_0x105a2c=_0x33d9e8%0x10*_0x5ee566,_0x8efb7=Math['floor'](_0x33d9e8/0x10)*_0x196b99;this[_0x261dee(0x293)][_0x261dee(0x260)](_0x5223a1,_0x105a2c,_0x8efb7,_0x5ee566,_0x196b99,0x0,0x0);},Sprite_NewLabel[_0x26e348(0x462)]['drawNewLabelText']=function(){const _0x127a65=_0x26e348,_0x229f2a=VisuMZ[_0x127a65(0x340)][_0x127a65(0x1fa)]['New'],_0x47242c=_0x229f2a['Text'];if(_0x47242c==='')return;const _0x3220dd=ImageManager['iconWidth'],_0x2fc22c=ImageManager[_0x127a65(0x4f2)];this[_0x127a65(0x293)][_0x127a65(0x3b8)]=_0x229f2a[_0x127a65(0x312)]||$gameSystem[_0x127a65(0x323)](),this['bitmap'][_0x127a65(0x36c)]=this[_0x127a65(0x550)](),this[_0x127a65(0x293)][_0x127a65(0x271)]=_0x229f2a['FontSize'],this['bitmap'][_0x127a65(0x1e8)](_0x47242c,0x0,_0x2fc22c/0x2,_0x3220dd,_0x2fc22c/0x2,_0x127a65(0x56f));},Sprite_NewLabel[_0x26e348(0x462)][_0x26e348(0x550)]=function(){const _0x12c2c4=_0x26e348,_0xd21fbb=VisuMZ[_0x12c2c4(0x340)][_0x12c2c4(0x1fa)][_0x12c2c4(0x4bb)][_0x12c2c4(0x65e)];return _0xd21fbb[_0x12c2c4(0x28b)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x12c2c4(0x36c)](_0xd21fbb);},Window_Base['prototype'][_0x26e348(0x16f)]=function(_0x572156,_0xbe9270,_0x338e7d,_0x5b5e75){const _0x39552d=_0x26e348;if(_0x572156){const _0x4c64f3=_0x338e7d+(this[_0x39552d(0x541)]()-ImageManager['iconHeight'])/0x2,_0x4accf4=ImageManager[_0x39552d(0x4f5)]+0x4,_0xd6d2a5=Math[_0x39552d(0x41b)](0x0,_0x5b5e75-_0x4accf4);this[_0x39552d(0x303)](ColorManager[_0x39552d(0x1b8)](_0x572156)),this[_0x39552d(0x33f)](_0x572156[_0x39552d(0x4b8)],_0xbe9270,_0x4c64f3),this['drawText'](_0x572156[_0x39552d(0x35c)],_0xbe9270+_0x4accf4,_0x338e7d,_0xd6d2a5),this[_0x39552d(0x1d0)]();}},Window_Base[_0x26e348(0x462)][_0x26e348(0x1ab)]=function(_0x1a8c04,_0x4dce9e,_0x2cbe3d,_0x39080b){const _0x342d9b=_0x26e348;if(this['isDrawItemNumber'](_0x1a8c04)){this[_0x342d9b(0x587)]();const _0x2aa024=VisuMZ['ItemsEquipsCore'][_0x342d9b(0x1fa)]['ItemScene'],_0x26d701=_0x2aa024[_0x342d9b(0x4e8)],_0x1a380e=_0x26d701[_0x342d9b(0x43f)]($gameParty[_0x342d9b(0x37b)](_0x1a8c04));this['contents'][_0x342d9b(0x271)]=_0x2aa024[_0x342d9b(0x68a)],this[_0x342d9b(0x1e8)](_0x1a380e,_0x4dce9e,_0x2cbe3d,_0x39080b,_0x342d9b(0x652)),this[_0x342d9b(0x587)]();}},Window_Base[_0x26e348(0x462)]['isDrawItemNumber']=function(_0x1d927f){const _0x2786f9=_0x26e348;if(DataManager[_0x2786f9(0x2b9)](_0x1d927f))return $dataSystem['optKeyItemsNumber'];return!![];},Window_Base[_0x26e348(0x462)][_0x26e348(0x608)]=function(_0x349775,_0x2a3744,_0x50fce4,_0x58d010,_0x2a535a){const _0x336259=_0x26e348;_0x2a535a=Math[_0x336259(0x41b)](_0x2a535a||0x1,0x1);while(_0x2a535a--){_0x58d010=_0x58d010||this[_0x336259(0x541)](),this[_0x336259(0x629)][_0x336259(0x688)]=0xa0;const _0xbaa739=ColorManager[_0x336259(0x384)]();this[_0x336259(0x629)][_0x336259(0x418)](_0x349775+0x1,_0x2a3744+0x1,_0x50fce4-0x2,_0x58d010-0x2,_0xbaa739),this[_0x336259(0x629)]['paintOpacity']=0xff;}},VisuMZ[_0x26e348(0x340)][_0x26e348(0x28d)]=Window_Selectable[_0x26e348(0x462)][_0x26e348(0x1fb)],Window_Selectable[_0x26e348(0x462)]['initialize']=function(_0x573582){const _0x517534=_0x26e348;this[_0x517534(0x360)](),VisuMZ[_0x517534(0x340)][_0x517534(0x28d)][_0x517534(0x62d)](this,_0x573582);},Window_Selectable[_0x26e348(0x462)]['initNewLabelSprites']=function(){const _0x4fba51=_0x26e348;this[_0x4fba51(0x387)]={},this[_0x4fba51(0x50a)]=0xff,this[_0x4fba51(0x36b)]=VisuMZ[_0x4fba51(0x340)][_0x4fba51(0x1fa)]['New']['FadeSpeed'],this[_0x4fba51(0x299)]=VisuMZ[_0x4fba51(0x340)][_0x4fba51(0x1fa)]['New'][_0x4fba51(0x5cc)];},Window_Selectable['prototype'][_0x26e348(0x350)]=function(){return![];},VisuMZ[_0x26e348(0x340)][_0x26e348(0x382)]=Window_Selectable[_0x26e348(0x462)][_0x26e348(0x5eb)],Window_Selectable[_0x26e348(0x462)][_0x26e348(0x5eb)]=function(_0x506e66){const _0x1f3b4a=_0x26e348;VisuMZ['ItemsEquipsCore'][_0x1f3b4a(0x382)][_0x1f3b4a(0x62d)](this,_0x506e66);if(this[_0x1f3b4a(0x350)]())this[_0x1f3b4a(0x3fd)](_0x506e66);},Window_Selectable[_0x26e348(0x462)][_0x26e348(0x3fd)]=function(_0x4d5177){const _0x3eaa25=_0x26e348;if(!_0x4d5177)return;$gameParty[_0x3eaa25(0x261)](_0x4d5177);let _0x2ef021='';if(DataManager[_0x3eaa25(0x2bd)](_0x4d5177))_0x2ef021='item-%1'[_0x3eaa25(0x43f)](_0x4d5177['id']);else{if(DataManager[_0x3eaa25(0x188)](_0x4d5177))_0x2ef021=_0x3eaa25(0x16c)['format'](_0x4d5177['id']);else{if(DataManager[_0x3eaa25(0x33c)](_0x4d5177))_0x2ef021=_0x3eaa25(0x5c4)['format'](_0x4d5177['id']);else return;}}const _0x3d6b7=this['_newLabelSprites'][_0x2ef021];if(_0x3d6b7)_0x3d6b7[_0x3eaa25(0x5b8)]();},VisuMZ[_0x26e348(0x340)][_0x26e348(0x526)]=Window_Selectable[_0x26e348(0x462)]['refresh'],Window_Selectable[_0x26e348(0x462)][_0x26e348(0x3ef)]=function(){const _0x2d1937=_0x26e348;this['hideNewLabelSprites'](),VisuMZ[_0x2d1937(0x340)]['Window_Selectable_refresh'][_0x2d1937(0x62d)](this);},Window_Selectable[_0x26e348(0x462)]['hideNewLabelSprites']=function(){const _0x308946=_0x26e348;for(const _0x11b4ac of Object[_0x308946(0x1f3)](this['_newLabelSprites'])){_0x11b4ac[_0x308946(0x5b8)]();}},VisuMZ['ItemsEquipsCore'][_0x26e348(0x3b4)]=Window_Selectable[_0x26e348(0x462)][_0x26e348(0x2a5)],Window_Selectable['prototype'][_0x26e348(0x2a5)]=function(){const _0x3a70c5=_0x26e348;this[_0x3a70c5(0x306)](),VisuMZ[_0x3a70c5(0x340)][_0x3a70c5(0x3b4)][_0x3a70c5(0x62d)](this);},Window_Selectable[_0x26e348(0x462)]['updateNewLabelOpacity']=function(){const _0x216d1c=_0x26e348;if(!this[_0x216d1c(0x350)]())return;const _0x4e160e=this[_0x216d1c(0x299)];this['_newLabelOpacity']+=this['_newLabelOpacityChange'];if(this[_0x216d1c(0x50a)]>=_0x4e160e||this[_0x216d1c(0x50a)]<=0x0){if(_0x216d1c(0x3b7)===_0x216d1c(0x3b7))this['_newLabelOpacityChange']*=-0x1;else{const _0x57c087=_0x37de3b(_0x5d3290['$1'])[_0x216d1c(0x1c9)]()[_0x216d1c(0x3cc)](),_0xd0e039=_0x5d3c77(_0x51a394['$2'])[_0x216d1c(0x3cc)](),_0x22d0d4=_0x554c74(_0x477eba['$3']),_0xb378b5=[_0x216d1c(0x34d),_0x216d1c(0x663),_0x216d1c(0x3fc),_0x216d1c(0x1e2),_0x216d1c(0x1e7),_0x216d1c(0x199)];let _0x44a310=_0xb378b5[_0x216d1c(0x43b)](_0x57c087)+0x2;if(_0x44a310<0x2)return![];const _0x16123e=_0x4d8c0d[_0x216d1c(0x319)][_0x44a310]||0x0;switch(_0xd0e039){case'>':return _0x251dc2[_0x216d1c(0x4cb)](_0x44a310)+_0x16123e>_0x22d0d4;case'>=':return _0x2d1868[_0x216d1c(0x4cb)](_0x44a310)+_0x16123e>=_0x22d0d4;case _0x216d1c(0x449):return _0x1329bc[_0x216d1c(0x4cb)](_0x44a310)+_0x16123e===_0x22d0d4;case'<=':return _0x5880ae[_0x216d1c(0x4cb)](_0x44a310)+_0x16123e<=_0x22d0d4;case'<':return _0x48904c['paramBase'](_0x44a310)+_0x16123e<_0x22d0d4;}return![];}}this[_0x216d1c(0x50a)]=this[_0x216d1c(0x50a)][_0x216d1c(0x1a5)](0x0,_0x4e160e);for(const _0x2ea3f9 of Object['values'](this['_newLabelSprites'])){_0x216d1c(0x2ea)!=='AXnci'?_0x361b59[_0x216d1c(0x4c9)][_0x216d1c(0x270)](_0x2caded['toUpperCase']()[_0x216d1c(0x3cc)]()):_0x2ea3f9['opacity']=this[_0x216d1c(0x50a)];}},Window_Selectable[_0x26e348(0x462)][_0x26e348(0x18d)]=function(_0x234093){const _0x281632=_0x26e348,_0x225c90=this[_0x281632(0x387)];if(_0x225c90[_0x234093])return _0x281632(0x29a)===_0x281632(0x29a)?_0x225c90[_0x234093]:![];else{const _0x4eb7d7=new Sprite_NewLabel();return _0x225c90[_0x234093]=_0x4eb7d7,this[_0x281632(0x41a)](_0x4eb7d7),_0x4eb7d7;}},Window_Selectable[_0x26e348(0x462)][_0x26e348(0x59b)]=function(_0x192c72,_0x48ae9b,_0x2ee1ba){const _0x4c6b4b=_0x26e348;let _0x4b522b='';if(DataManager['isItem'](_0x192c72)){if('ygmTP'!==_0x4c6b4b(0x4c5))_0x4b522b='item-%1'[_0x4c6b4b(0x43f)](_0x192c72['id']);else{const _0x480f61=this[_0x4c6b4b(0x639)](),_0x1e0604=_0x44ea65[_0x4c6b4b(0x340)][_0x4c6b4b(0x1fa)][_0x4c6b4b(0x45d)][_0x4c6b4b(0x43c)],_0x46664f=_0x40d38a[_0x4c6b4b(0x340)][_0x4c6b4b(0x1fa)][_0x4c6b4b(0x45d)]['CmdCancelRename'],_0x49c8d6=_0x480f61===_0x4c6b4b(0x4af)?_0x46664f:_0x4c6b4b(0x265)['format'](_0x1e0604,_0x46664f);this['addCommand'](_0x49c8d6,_0x4c6b4b(0x328));}}else{if(DataManager[_0x4c6b4b(0x188)](_0x192c72)){if(_0x4c6b4b(0x4d5)!=='bqEbP')_0x4b522b=_0x4c6b4b(0x16c)['format'](_0x192c72['id']);else return _0x3dccb4[_0x4c6b4b(0x644)](_0x4c6b4b(0x1a3));}else{if(DataManager[_0x4c6b4b(0x33c)](_0x192c72)){if('DZLFg'===_0x4c6b4b(0x5fe))_0x4b522b=_0x4c6b4b(0x5c4)[_0x4c6b4b(0x43f)](_0x192c72['id']);else{if(_0x1d0972['id']===_0x205900['id'])_0x254770+=0x1;}}else return;}}const _0x58f24b=this[_0x4c6b4b(0x18d)](_0x4b522b);_0x58f24b[_0x4c6b4b(0x463)](_0x48ae9b,_0x2ee1ba),_0x58f24b[_0x4c6b4b(0x1d4)](),_0x58f24b[_0x4c6b4b(0x5c9)]=this[_0x4c6b4b(0x50a)];},Window_ItemCategory[_0x26e348(0x36d)]=VisuMZ[_0x26e348(0x340)][_0x26e348(0x1fa)][_0x26e348(0x5fb)][_0x26e348(0x45f)],Window_ItemCategory['categoryItemTypes']=[_0x26e348(0x64f),'HiddenItemB',_0x26e348(0x5d5),_0x26e348(0x620),_0x26e348(0x40b),_0x26e348(0x44e),_0x26e348(0x49e),_0x26e348(0x481)],VisuMZ[_0x26e348(0x340)][_0x26e348(0x1f7)]=Window_ItemCategory[_0x26e348(0x462)][_0x26e348(0x1fb)],Window_ItemCategory[_0x26e348(0x462)]['initialize']=function(_0x4a631a){const _0x144c82=_0x26e348;VisuMZ['ItemsEquipsCore']['Window_ItemCategory_initialize']['call'](this,_0x4a631a),this[_0x144c82(0x4f7)](_0x4a631a);},Window_ItemCategory[_0x26e348(0x462)][_0x26e348(0x4f7)]=function(_0x335e98){const _0x114513=_0x26e348,_0x1313b3=new Rectangle(0x0,0x0,_0x335e98[_0x114513(0x291)],_0x335e98[_0x114513(0x38b)]);this[_0x114513(0x4f4)]=new Window_Base(_0x1313b3),this[_0x114513(0x4f4)][_0x114513(0x5c9)]=0x0,this[_0x114513(0x2e6)](this[_0x114513(0x4f4)]),this[_0x114513(0x47b)]();},Window_ItemCategory['prototype'][_0x26e348(0x40c)]=function(){const _0x204a79=_0x26e348;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand[_0x204a79(0x462)][_0x204a79(0x40c)][_0x204a79(0x62d)](this);},Window_ItemCategory['prototype']['processCursorHomeEndTrigger']=function(){},Window_ItemCategory[_0x26e348(0x462)][_0x26e348(0x32d)]=function(){const _0x39232e=_0x26e348;if(!this[_0x39232e(0x40c)]())Window_HorzCommand[_0x39232e(0x462)][_0x39232e(0x32d)][_0x39232e(0x62d)](this);},Window_ItemCategory[_0x26e348(0x462)][_0x26e348(0x1ae)]=function(){const _0x353cb5=_0x26e348;return this[_0x353cb5(0x297)]?this[_0x353cb5(0x478)]():0x4;},Window_ItemCategory[_0x26e348(0x462)][_0x26e348(0x2a5)]=function(){const _0x50cd20=_0x26e348;Window_HorzCommand[_0x50cd20(0x462)][_0x50cd20(0x2a5)][_0x50cd20(0x62d)](this),this[_0x50cd20(0x5c3)]&&this[_0x50cd20(0x5c3)][_0x50cd20(0x528)](this[_0x50cd20(0x193)]());},Window_ItemCategory[_0x26e348(0x462)][_0x26e348(0x180)]=function(){const _0x2ea23f=_0x26e348;if(this[_0x2ea23f(0x324)]()){const _0x3b578d=this[_0x2ea23f(0x54f)]();if(this[_0x2ea23f(0x5c3)]&&this['_itemWindow'][_0x2ea23f(0x1ae)]()<=0x1){if('csgRX'!==_0x2ea23f(0x5f4))return _0x3d5a47[_0x2ea23f(0x462)]['isBottomHelpMode'][_0x2ea23f(0x62d)](this);else Input[_0x2ea23f(0x664)](_0x2ea23f(0x652))&&(_0x2ea23f(0x3d8)==='VaNGN'?this[_0x2ea23f(0x15e)](0x0):this['cursorRight'](Input['isTriggered']('right'))),Input[_0x2ea23f(0x664)](_0x2ea23f(0x569))&&this[_0x2ea23f(0x2a8)](Input[_0x2ea23f(0x3d5)](_0x2ea23f(0x569)));}else{if(this[_0x2ea23f(0x5c3)]&&this[_0x2ea23f(0x5c3)][_0x2ea23f(0x1ae)]()>0x1){Input[_0x2ea23f(0x664)](_0x2ea23f(0x680))&&!Input[_0x2ea23f(0x68d)]('shift')&&this['cursorRight'](Input[_0x2ea23f(0x3d5)]('pagedown'));if(Input['isRepeated'](_0x2ea23f(0x1be))&&!Input[_0x2ea23f(0x68d)]('shift')){if(_0x2ea23f(0x3ff)!==_0x2ea23f(0x3ff))return _0x14699d[_0x2ea23f(0x520)](_0x2ea23f(0x569),_0x2ea23f(0x652));else this['cursorLeft'](Input[_0x2ea23f(0x3d5)](_0x2ea23f(0x1be)));}}}this[_0x2ea23f(0x54f)]()!==_0x3b578d&&this[_0x2ea23f(0x40d)]();}},Window_ItemCategory[_0x26e348(0x462)]['processHandling']=function(){const _0x4ceaa3=_0x26e348;if(this[_0x4ceaa3(0x40c)]())return;Window_HorzCommand[_0x4ceaa3(0x462)][_0x4ceaa3(0x2f0)][_0x4ceaa3(0x62d)](this);},Window_ItemCategory['prototype'][_0x26e348(0x355)]=function(){const _0x2c9f69=_0x26e348;return this[_0x2c9f69(0x40c)]()?_0x2c9f69(0x1b9)!==_0x2c9f69(0x3da)?![]:0x0:Window_HorzCommand[_0x2c9f69(0x462)][_0x2c9f69(0x355)][_0x2c9f69(0x62d)](this);},Window_ItemCategory[_0x26e348(0x462)][_0x26e348(0x487)]=function(){const _0x3fd06d=_0x26e348;if(this[_0x3fd06d(0x249)]()){if(_0x3fd06d(0x2c8)===_0x3fd06d(0x191)){const _0x5c0471=_0x1ccdd2[_0x3fd06d(0x41b)](_0x27ba5a(_0x4835c7),0x0)/_0x4f05e8['a'][_0x3fd06d(0x34d)];return this[_0x3fd06d(0x694)](),_0x4a860e(_0x5c0471)?_0x3fd06d(0x51f):_0x3fd06d(0x204)['format'](_0x18718b[_0x3fd06d(0x562)](_0x5c0471*0x64));}else{TouchInput[_0x3fd06d(0x3d5)]()&&this[_0x3fd06d(0x409)](!![]);if(TouchInput['isClicked']())this[_0x3fd06d(0x5c5)]();else{if(TouchInput['isCancelled']()){if(_0x3fd06d(0x238)!=='sblpM'){const _0x21584d='DAMAGE\x20MULTIPLIER';if(this['_customItemInfo'][_0x21584d])return this['_customItemInfo'][_0x21584d];return _0x18fc1c[_0x3fd06d(0x58b)]&&_0x250c73[_0x3fd06d(0x2d7)](this['_item'])!==_0x3fd06d(0x474)?this[_0x3fd06d(0x5da)]():this['getItemDamageAmountTextOriginal']();}else this[_0x3fd06d(0x5ee)]();}}}}},Window_ItemCategory['prototype'][_0x26e348(0x409)]=function(_0x456700){const _0x330f64=_0x26e348;this[_0x330f64(0x40c)]()?this[_0x330f64(0x3f3)](!![]):Window_HorzCommand[_0x330f64(0x462)][_0x330f64(0x409)][_0x330f64(0x62d)](this,_0x456700);},Window_ItemCategory['prototype'][_0x26e348(0x3f3)]=function(_0x206597){const _0x18ecbb=_0x26e348;this['_doubleTouch']=![];if(this[_0x18ecbb(0x324)]()){const _0x1177af=this['index'](),_0x142261=this[_0x18ecbb(0x3bb)]();_0x142261>=0x0&&_0x142261!==this[_0x18ecbb(0x54f)]()&&this[_0x18ecbb(0x4a5)](_0x142261),_0x206597&&this['index']()!==_0x1177af&&this[_0x18ecbb(0x40d)]();}},Window_ItemCategory[_0x26e348(0x462)]['makeCommandList']=function(){const _0x295736=_0x26e348;this[_0x295736(0x430)](),this['select'](this['index']());},Window_ItemCategory[_0x26e348(0x462)][_0x26e348(0x430)]=function(){const _0x16fa7e=_0x26e348;for(const _0x3967a4 of Window_ItemCategory[_0x16fa7e(0x36d)]){if('TMsmw'==='CzStY'){if(!this['isEquipCommandAdded']())return;const _0x556bf2=this[_0x16fa7e(0x639)](),_0x59a18e=_0x1e1f51['ItemsEquipsCore']['Settings']['EquipScene']['CmdIconEquip'],_0x1efd22=_0x556bf2===_0x16fa7e(0x4af)?_0x4c7b1e[_0x16fa7e(0x457)]:'\x5cI[%1]%2'[_0x16fa7e(0x43f)](_0x59a18e,_0x2aee61['equip2']),_0x357ffe=this[_0x16fa7e(0x2b6)]();this[_0x16fa7e(0x670)](_0x1efd22,_0x16fa7e(0x2ac),_0x357ffe);}else this[_0x16fa7e(0x1c7)](_0x3967a4);}},Window_ItemCategory[_0x26e348(0x462)][_0x26e348(0x1c7)]=function(_0x36a149){const _0x4d25dc=_0x26e348,_0x2d61c4=_0x36a149['Type'],_0x409897=_0x36a149[_0x4d25dc(0x18c)],_0x27f3fe=_0x36a149[_0x4d25dc(0x4d7)]||0x0;if(_0x27f3fe>0x0&&!$gameSwitches[_0x4d25dc(0x4b9)](_0x27f3fe))return;let _0x198b7d='',_0x20dcc0=_0x4d25dc(0x2ff),_0x26dc1d=_0x2d61c4;if(_0x2d61c4[_0x4d25dc(0x28b)](/Category:(.*)/i))_0x198b7d=String(RegExp['$1'])[_0x4d25dc(0x3cc)]();else{if(Window_ItemCategory[_0x4d25dc(0x37d)][_0x4d25dc(0x176)](_0x2d61c4))_0x198b7d=VisuMZ[_0x4d25dc(0x340)]['Settings'][_0x4d25dc(0x5fb)][_0x2d61c4];else{if([_0x4d25dc(0x29d),_0x4d25dc(0x4b6)][_0x4d25dc(0x176)](_0x2d61c4))_0x198b7d=TextManager[_0x4d25dc(0x546)];else{if(_0x2d61c4===_0x4d25dc(0x496))_0x4d25dc(0x358)!==_0x4d25dc(0x358)?this[_0x4d25dc(0x251)](_0x3f7af1):_0x198b7d=TextManager['keyItem'];else{if(_0x2d61c4===_0x4d25dc(0x4aa))_0x198b7d=TextManager[_0x4d25dc(0x595)];else{if(_0x2d61c4===_0x4d25dc(0x253)){if('eDBIw'==='eDBIw')_0x198b7d=TextManager[_0x4d25dc(0x4ff)];else return _0x27d0f1['ItemsEquipsCore'][_0x4d25dc(0x1fa)][_0x4d25dc(0x1da)]['SpeedNeg999'];}else{if(_0x2d61c4[_0x4d25dc(0x28b)](/WTYPE:(\d+)/i))_0x198b7d=$dataSystem[_0x4d25dc(0x66a)][Number(RegExp['$1'])]||'';else{if(_0x2d61c4[_0x4d25dc(0x28b)](/ATYPE:(\d+)/i))_0x4d25dc(0x42f)===_0x4d25dc(0x42f)?_0x198b7d=$dataSystem[_0x4d25dc(0x59f)][Number(RegExp['$1'])]||'':this[_0x4d25dc(0x16b)][_0x20a752]['setObject'](null);else _0x2d61c4[_0x4d25dc(0x28b)](/ETYPE:(\d+)/i)&&(_0x198b7d=$dataSystem[_0x4d25dc(0x429)][Number(RegExp['$1'])]||'');}}}}}}}if(_0x409897>0x0&&this[_0x4d25dc(0x561)]()!==_0x4d25dc(0x4af)){if(_0x4d25dc(0x4db)!==_0x4d25dc(0x181))_0x198b7d=_0x4d25dc(0x265)[_0x4d25dc(0x43f)](_0x409897,_0x198b7d);else return 0x0;}this[_0x4d25dc(0x670)](_0x198b7d,_0x20dcc0,!![],_0x26dc1d);},Window_ItemCategory[_0x26e348(0x462)]['itemTextAlign']=function(){const _0x26950a=_0x26e348;return VisuMZ[_0x26950a(0x340)][_0x26950a(0x1fa)][_0x26950a(0x5fb)][_0x26950a(0x493)];},Window_ItemCategory['prototype']['drawItem']=function(_0x5012a9){const _0x4cedc6=_0x26e348,_0x4792b2=this[_0x4cedc6(0x5e9)](_0x5012a9);if(_0x4792b2===_0x4cedc6(0x381))this['drawItemStyleIconText'](_0x5012a9);else{if(_0x4792b2===_0x4cedc6(0x213)){if(_0x4cedc6(0x468)===_0x4cedc6(0x468))this[_0x4cedc6(0x15a)](_0x5012a9);else{_0x3dd993[_0x4cedc6(0x340)][_0x4cedc6(0x1a9)][_0x4cedc6(0x62d)](this,_0x2f5503),this[_0x4cedc6(0x18f)](this[_0x4cedc6(0x3a3)],_0x3ce225);if(_0x50f6c0<=0x0)return;const _0x3cd584=_0x53040f['ItemsEquipsCore']['Settings'][_0x4cedc6(0x45d)];_0x3cd584[_0x4cedc6(0x2eb)]&&_0x2dfe8c[_0x4cedc6(0x39d)](_0x3cd584[_0x4cedc6(0x2eb)],!![]),this[_0x4cedc6(0x30e)]['refresh'](),this['_sellWindow'][_0x4cedc6(0x3ef)]();}}else Window_HorzCommand['prototype'][_0x4cedc6(0x1ca)][_0x4cedc6(0x62d)](this,_0x5012a9);}},Window_ItemCategory[_0x26e348(0x462)]['categoryStyle']=function(){const _0x31e8a8=_0x26e348;return VisuMZ[_0x31e8a8(0x340)]['Settings']['Categories'][_0x31e8a8(0x29c)];},Window_ItemCategory['prototype'][_0x26e348(0x5e9)]=function(_0x507782){const _0x2b834d=_0x26e348;if(_0x507782<0x0)return _0x2b834d(0x4af);const _0x4d6de3=this['categoryStyle']();if(_0x4d6de3!==_0x2b834d(0x5ad))return _0x4d6de3;else{if('RHxDX'==='dWshK')this[_0x2b834d(0x601)]();else{const _0x3e2959=this[_0x2b834d(0x386)](_0x507782);if(_0x3e2959[_0x2b834d(0x28b)](/\\I\[(\d+)\]/i)){const _0x25ec76=this[_0x2b834d(0x5b0)](_0x507782),_0x35fa55=this[_0x2b834d(0x1e9)](_0x3e2959)[_0x2b834d(0x291)];return _0x35fa55<=_0x25ec76[_0x2b834d(0x291)]?_0x2b834d(0x381):_0x2b834d(0x213);}else return _0x2b834d(0x505)!==_0x2b834d(0x465)?_0x2b834d(0x4af):_0x48655f[_0x2b834d(0x340)][_0x2b834d(0x1fa)]['ItemScene'][_0x2b834d(0x565)];}}},Window_ItemCategory[_0x26e348(0x462)][_0x26e348(0x65c)]=function(_0x27aad9){const _0x2b985b=_0x26e348,_0x3030a4=this[_0x2b985b(0x5b0)](_0x27aad9),_0x3941ce=this[_0x2b985b(0x386)](_0x27aad9),_0x2625bb=this[_0x2b985b(0x1e9)](_0x3941ce)['width'];this['changePaintOpacity'](this[_0x2b985b(0x56c)](_0x27aad9));const _0x435132=this[_0x2b985b(0x34b)]();if(_0x435132===_0x2b985b(0x652))this[_0x2b985b(0x2a2)](_0x3941ce,_0x3030a4['x']+_0x3030a4[_0x2b985b(0x291)]-_0x2625bb,_0x3030a4['y'],_0x2625bb);else{if(_0x435132===_0x2b985b(0x56f)){if('aQBSQ'!==_0x2b985b(0x624)){if(this[_0x2b985b(0x4c3)]())return this['_buttonAssistWindow'][_0x2b985b(0x291)]/0x5/-0x3;return _0x29ae0a[_0x2b985b(0x462)][_0x2b985b(0x34e)][_0x2b985b(0x62d)](this);}else{const _0x5a307f=_0x3030a4['x']+Math[_0x2b985b(0x160)]((_0x3030a4['width']-_0x2625bb)/0x2);this[_0x2b985b(0x2a2)](_0x3941ce,_0x5a307f,_0x3030a4['y'],_0x2625bb);}}else this['drawTextEx'](_0x3941ce,_0x3030a4['x'],_0x3030a4['y'],_0x2625bb);}},Window_ItemCategory[_0x26e348(0x462)][_0x26e348(0x15a)]=function(_0x5e11b7){const _0x33e393=_0x26e348,_0xa38523=this[_0x33e393(0x386)](_0x5e11b7);if(_0xa38523[_0x33e393(0x28b)](/\\I\[(\d+)\]/i)){const _0x35b7e4=Number(RegExp['$1'])||0x0,_0xdc86bd=this['itemLineRect'](_0x5e11b7),_0xfebd78=_0xdc86bd['x']+Math['floor']((_0xdc86bd['width']-ImageManager[_0x33e393(0x4f5)])/0x2),_0x226c76=_0xdc86bd['y']+(_0xdc86bd['height']-ImageManager[_0x33e393(0x4f2)])/0x2;this[_0x33e393(0x33f)](_0x35b7e4,_0xfebd78,_0x226c76);}},VisuMZ['ItemsEquipsCore'][_0x26e348(0x604)]=Window_ItemCategory[_0x26e348(0x462)][_0x26e348(0x40e)],Window_ItemCategory[_0x26e348(0x462)]['setItemWindow']=function(_0xbfe93d){const _0xdc1e1d=_0x26e348;VisuMZ[_0xdc1e1d(0x340)][_0xdc1e1d(0x604)][_0xdc1e1d(0x62d)](this,_0xbfe93d),_0xbfe93d['_categoryWindow']=this;},Window_ItemCategory[_0x26e348(0x462)][_0x26e348(0x515)]=function(){const _0x4c1a6d=_0x26e348;Window_HorzCommand[_0x4c1a6d(0x462)][_0x4c1a6d(0x515)][_0x4c1a6d(0x62d)](this);if(this[_0x4c1a6d(0x4f4)])this[_0x4c1a6d(0x47b)]();},Window_ItemCategory[_0x26e348(0x462)][_0x26e348(0x47b)]=function(){const _0x326496=_0x26e348,_0x268f17=this[_0x326496(0x4f4)];_0x268f17[_0x326496(0x439)][_0x326496(0x233)]();const _0x3e4cee=this[_0x326496(0x5e9)](this[_0x326496(0x54f)]());if(_0x3e4cee===_0x326496(0x213)){const _0x30a7e4=this['itemLineRect'](this[_0x326496(0x54f)]());let _0x309ce6=this[_0x326496(0x386)](this[_0x326496(0x54f)]());_0x309ce6=_0x309ce6[_0x326496(0x26e)](/\\I\[(\d+)\]/gi,''),_0x268f17[_0x326496(0x587)](),this[_0x326496(0x4e0)](_0x309ce6,_0x30a7e4),this['categoryNameWindowDrawText'](_0x309ce6,_0x30a7e4),this[_0x326496(0x3ee)](_0x309ce6,_0x30a7e4);}},Window_ItemCategory[_0x26e348(0x462)][_0x26e348(0x4e0)]=function(_0x46ab4d,_0x5ba9e3){},Window_ItemCategory[_0x26e348(0x462)][_0x26e348(0x1bf)]=function(_0x4d371d,_0x4f8d23){const _0x4ca915=_0x26e348,_0x46e912=this[_0x4ca915(0x4f4)];_0x46e912['drawText'](_0x4d371d,0x0,_0x4f8d23['y'],_0x46e912[_0x4ca915(0x2b8)],_0x4ca915(0x56f));},Window_ItemCategory[_0x26e348(0x462)][_0x26e348(0x3ee)]=function(_0x2daab6,_0x3bf725){const _0x9d51c8=_0x26e348,_0x408dc5=this['_categoryNameWindow'],_0x36b144=$gameSystem['windowPadding'](),_0x3adf05=_0x3bf725['x']+Math[_0x9d51c8(0x160)](_0x3bf725[_0x9d51c8(0x291)]/0x2)+_0x36b144;_0x408dc5['x']=_0x408dc5[_0x9d51c8(0x291)]/-0x2+_0x3adf05,_0x408dc5['y']=Math['floor'](_0x3bf725[_0x9d51c8(0x38b)]/0x2);},Window_ItemList[_0x26e348(0x462)]['processCursorMoveModernControls']=function(){const _0x2a7dc4=_0x26e348;if(this[_0x2a7dc4(0x324)]()){const _0x3eeae3=this[_0x2a7dc4(0x54f)]();if(this[_0x2a7dc4(0x1ae)]()<=0x1){if(_0x2a7dc4(0x2fe)!=='Ivyln'){!this['isHandled'](_0x2a7dc4(0x680))&&Input['isTriggered']('pagedown')&&this[_0x2a7dc4(0x391)]();if(!this['isHandled'](_0x2a7dc4(0x1be))&&Input[_0x2a7dc4(0x3d5)]('pageup')){if(_0x2a7dc4(0x52f)===_0x2a7dc4(0x2fb)){if(!this[_0x2a7dc4(0x524)]()&&!_0x501cd2[_0x2a7dc4(0x2bd)](this[_0x2a7dc4(0x3a3)]))return;const _0x9ab2b0=this['innerWidth']-this[_0x2a7dc4(0x4a7)]()-_0x4fe6bb,_0x296419=this['textWidth'](_0x2a7dc4(0x341));this[_0x2a7dc4(0x303)](_0x11a53b[_0x2a7dc4(0x1c8)]()),this[_0x2a7dc4(0x1e8)](_0x525292[_0x2a7dc4(0x269)],_0x4c0602+this[_0x2a7dc4(0x4a7)](),_0x436582,_0x9ab2b0-_0x296419),this[_0x2a7dc4(0x1d0)](),this[_0x2a7dc4(0x1ab)](this[_0x2a7dc4(0x3a3)],_0x3bc9ac,_0x1fc6c2,_0x9ab2b0);}else this['cursorPageup']();}}else{const _0x17dc40=_0xaf636a[_0x2a7dc4(0x66a)]['indexOf'](_0x44619d(_0x2ec02b['$1'])['trim']());return _0x3d4c26[_0x2a7dc4(0x188)](_0x2c3cd7)&&_0x3e5efa[_0x2a7dc4(0x665)]===_0x17dc40;}}else{if(this[_0x2a7dc4(0x1ae)]()>0x1){if('gkKEF'!==_0x2a7dc4(0x22c)){const _0x410f49=this['_itemData'][_0x2a7dc4(0x3e0)][_0x4defcf],_0x9c2de2=_0x1f77a2['prototype'][_0x2a7dc4(0x62e)](_0x410f49,_0x189a12);if(_0x9c2de2>0x0){_0x132421+=_0x2a7dc4(0x2a0)[_0x2a7dc4(0x43f)](_0x9c2de2),_0x457a5f++;if(_0x4c9860>=_0x432688)return _0x443a6f;}}else{Input[_0x2a7dc4(0x664)](_0x2a7dc4(0x652))&&this[_0x2a7dc4(0x686)](Input['isTriggered'](_0x2a7dc4(0x652)));if(Input[_0x2a7dc4(0x664)](_0x2a7dc4(0x569))){if('Pcldc'!==_0x2a7dc4(0x29b))this[_0x2a7dc4(0x2a8)](Input['isTriggered'](_0x2a7dc4(0x569)));else return _0x1521c2['actor']()[_0x2a7dc4(0x672)](_0x5675d6);}if(this[_0x2a7dc4(0x417)]())Input[_0x2a7dc4(0x3d5)](_0x2a7dc4(0x680))&&Input[_0x2a7dc4(0x68d)]('shift')&&this['cursorPagedown'](),Input[_0x2a7dc4(0x3d5)](_0x2a7dc4(0x1be))&&Input[_0x2a7dc4(0x68d)](_0x2a7dc4(0x1a3))&&this[_0x2a7dc4(0x5c0)]();else{if('glqna'==='eFIOe')return this[_0x2a7dc4(0x2cf)]()[_0x2a7dc4(0x28b)](/RIGHT/i);else Input['isTriggered'](_0x2a7dc4(0x680))&&this[_0x2a7dc4(0x391)](),Input['isTriggered'](_0x2a7dc4(0x1be))&&this[_0x2a7dc4(0x5c0)]();}}}}if(Input[_0x2a7dc4(0x664)](_0x2a7dc4(0x539))){if(_0x2a7dc4(0x46e)===_0x2a7dc4(0x616))this[_0x2a7dc4(0x5e6)](_0xbcb96f,_0x554330);else{if(Input[_0x2a7dc4(0x68d)](_0x2a7dc4(0x1a3))&&this['allowShiftScrolling']()){if('SjmEy'!=='SjmEy')for(const _0x567c0a of _0x1527fa){const _0x2083fa=_0x4377ad['indexOf'](_0x567c0a[_0x2a7dc4(0x3cc)]());if(_0x2083fa>0x0)_0x2da9a1[_0x2a7dc4(0x560)]['push'](_0x2083fa);}else this[_0x2a7dc4(0x391)]();}else this[_0x2a7dc4(0x58d)](Input[_0x2a7dc4(0x3d5)](_0x2a7dc4(0x539)));}}Input['isRepeated']('up')&&(Input['isPressed'](_0x2a7dc4(0x1a3))&&this[_0x2a7dc4(0x5ec)]()?this[_0x2a7dc4(0x5c0)]():this[_0x2a7dc4(0x552)](Input[_0x2a7dc4(0x3d5)]('up'))),Imported[_0x2a7dc4(0x454)]&&this[_0x2a7dc4(0x67f)](),this['index']()!==_0x3eeae3&&this[_0x2a7dc4(0x40d)]();}},Window_ItemList[_0x26e348(0x462)][_0x26e348(0x417)]=function(){const _0x2dbbff=SceneManager['_scene'],_0x437587=[Scene_Item,Scene_Shop];return _0x437587['includes'](_0x2dbbff['constructor']);},Window_ItemList[_0x26e348(0x462)][_0x26e348(0x305)]=function(){const _0xcf22ad=_0x26e348;Window_Selectable[_0xcf22ad(0x462)]['activate'][_0xcf22ad(0x62d)](this);if(this[_0xcf22ad(0x4b7)]&&this[_0xcf22ad(0x4b7)][_0xcf22ad(0x40c)]()){if(_0xcf22ad(0x174)===_0xcf22ad(0x16d)){const _0x150766=_0x20f7ec[_0xcf22ad(0x545)];if(_0x150766[_0xcf22ad(0x28b)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x365863=_0x14f718(_0x36776c['$1']);_0x445c78[_0xcf22ad(0x2d5)]=_0x46ca9d,_0x4f4705[_0xcf22ad(0x546)]=_0x918f62;try{_0xc4aa62(_0x365863);}catch(_0x569d36){if(_0x462b99['isPlaytest']())_0x4e359f[_0xcf22ad(0x5ab)](_0x569d36);}_0x3edf37=_0x4b1ba9['price'],_0x32840d[_0xcf22ad(0x2d5)]=_0x1c1aa9,_0x3562ae[_0xcf22ad(0x546)]=_0x2768a6;}_0x5673ef=_0x1e3357[_0xcf22ad(0x340)][_0xcf22ad(0x1fa)][_0xcf22ad(0x45d)]['BuyPriceJS']['call'](this,_0x41f36f,_0x279c75);if(_0x3a6eb3(_0x22ba07))_0x15a28f=0x0;return _0x3573c5[_0xcf22ad(0x160)](_0x30941b);}else this[_0xcf22ad(0x4b7)][_0xcf22ad(0x305)]();}},Window_ItemList['prototype'][_0x26e348(0x32f)]=function(){const _0x59aad6=_0x26e348;Window_Selectable['prototype'][_0x59aad6(0x32f)][_0x59aad6(0x62d)](this),this[_0x59aad6(0x4b7)]&&this['_categoryWindow'][_0x59aad6(0x40c)]()&&this['_categoryWindow'][_0x59aad6(0x32f)]();},Window_ItemList[_0x26e348(0x462)][_0x26e348(0x528)]=function(_0x2f0575){const _0xa75ee5=_0x26e348;if(this[_0xa75ee5(0x3cb)]!==_0x2f0575){if('mwOVx'===_0xa75ee5(0x3b6)){this[_0xa75ee5(0x3cb)]=_0x2f0575,this[_0xa75ee5(0x3ef)]();if(this[_0xa75ee5(0x4b7)]&&this[_0xa75ee5(0x4b7)][_0xa75ee5(0x40c)]()){if(_0xa75ee5(0x375)!==_0xa75ee5(0x375))return _0x1ebb74[_0xa75ee5(0x462)][_0xa75ee5(0x355)][_0xa75ee5(0x62d)](this);else this['smoothSelect'](0x0);}else this['scrollTo'](0x0,0x0);}else _0x488fda+=_0x371762(_0x8ad4d0['$1']);}},VisuMZ[_0x26e348(0x340)]['Window_ItemList_maxCols']=Window_ItemList[_0x26e348(0x462)]['maxCols'],Window_ItemList[_0x26e348(0x462)]['maxCols']=function(){const _0xfdecaa=_0x26e348;if(SceneManager[_0xfdecaa(0x2e5)][_0xfdecaa(0x198)]===Scene_Battle)return VisuMZ[_0xfdecaa(0x340)][_0xfdecaa(0x1ef)][_0xfdecaa(0x62d)](this);else return SceneManager['_scene']['constructor']===Scene_Map?VisuMZ[_0xfdecaa(0x340)][_0xfdecaa(0x1ef)][_0xfdecaa(0x62d)](this):_0xfdecaa(0x23b)==='dAHUb'?!![]:VisuMZ[_0xfdecaa(0x340)]['Settings']['ItemScene']['ListWindowCols'];},VisuMZ[_0x26e348(0x340)][_0x26e348(0x58c)]=Window_ItemList['prototype'][_0x26e348(0x568)],Window_ItemList['prototype']['colSpacing']=function(){const _0x40183b=_0x26e348;if(this['maxCols']()<=0x1)return Window_Selectable['prototype'][_0x40183b(0x568)]['call'](this);else{if('ORofa'===_0x40183b(0x5a3))_0x53a594=_0x40183b(0x5c4)[_0x40183b(0x43f)](_0xba1338['id']);else return VisuMZ[_0x40183b(0x340)][_0x40183b(0x58c)][_0x40183b(0x62d)](this);}},Window_ItemList[_0x26e348(0x462)]['includes']=function(_0x19468d){const _0x9a3c21=_0x26e348;switch(this['_category']){case _0x9a3c21(0x29d):return DataManager['isItem'](_0x19468d);case _0x9a3c21(0x4b6):return DataManager[_0x9a3c21(0x2bd)](_0x19468d)&&_0x19468d[_0x9a3c21(0x2bb)]===0x1;case _0x9a3c21(0x496):return DataManager['isItem'](_0x19468d)&&_0x19468d['itypeId']===0x2;case _0x9a3c21(0x64f):return DataManager[_0x9a3c21(0x2bd)](_0x19468d)&&_0x19468d[_0x9a3c21(0x2bb)]===0x3;case'HiddenItemB':return DataManager['isItem'](_0x19468d)&&_0x19468d[_0x9a3c21(0x2bb)]===0x4;case _0x9a3c21(0x620):return DataManager[_0x9a3c21(0x2bd)](_0x19468d)&&_0x19468d[_0x9a3c21(0x5c6)];case _0x9a3c21(0x5d5):return DataManager[_0x9a3c21(0x2bd)](_0x19468d)&&!_0x19468d[_0x9a3c21(0x5c6)];case _0x9a3c21(0x40b):return DataManager[_0x9a3c21(0x2bd)](_0x19468d)&&[0x0][_0x9a3c21(0x176)](_0x19468d['occasion']);case'BattleUsable':return DataManager[_0x9a3c21(0x2bd)](_0x19468d)&&[0x0,0x1][_0x9a3c21(0x176)](_0x19468d[_0x9a3c21(0x3a0)]);case'FieldUsable':return DataManager['isItem'](_0x19468d)&&[0x0,0x2]['includes'](_0x19468d['occasion']);case'NeverUsable':return DataManager[_0x9a3c21(0x2bd)](_0x19468d)&&[0x3][_0x9a3c21(0x176)](_0x19468d['occasion']);case _0x9a3c21(0x4aa):return DataManager[_0x9a3c21(0x188)](_0x19468d);case _0x9a3c21(0x253):return DataManager['isArmor'](_0x19468d);default:if(this[_0x9a3c21(0x3cb)][_0x9a3c21(0x28b)](/WTYPE:(\d+)/i))return DataManager[_0x9a3c21(0x188)](_0x19468d)&&_0x19468d[_0x9a3c21(0x665)]===Number(RegExp['$1']);else{if(this['_category'][_0x9a3c21(0x28b)](/WTYPE:(.*)/i)){if(_0x9a3c21(0x506)!==_0x9a3c21(0x506))_0x3810a4[_0x9a3c21(0x462)][_0x9a3c21(0x2a5)]['call'](this),this['_itemWindow']&&this[_0x9a3c21(0x5c3)][_0x9a3c21(0x528)](this['currentExt']());else{const _0x256b0b=$dataSystem[_0x9a3c21(0x66a)][_0x9a3c21(0x43b)](String(RegExp['$1'])[_0x9a3c21(0x3cc)]());return DataManager[_0x9a3c21(0x188)](_0x19468d)&&_0x19468d[_0x9a3c21(0x665)]===_0x256b0b;}}else{if(this[_0x9a3c21(0x3cb)][_0x9a3c21(0x28b)](/ATYPE:(\d+)/i))return _0x9a3c21(0x61a)!==_0x9a3c21(0x61a)?_0x1b4659[_0x9a3c21(0x39e)][_0x9a3c21(0x43f)](_0x19e3e9(_0x248843['$1'])):DataManager[_0x9a3c21(0x33c)](_0x19468d)&&_0x19468d[_0x9a3c21(0x5df)]===Number(RegExp['$1']);else{if(this[_0x9a3c21(0x3cb)]['match'](/ATYPE:(.*)/i)){if(_0x9a3c21(0x5af)!==_0x9a3c21(0x5af)){const _0xd6a610=_0x5d0fa0[_0x9a3c21(0x605)](_0x4f96cb[_0x9a3c21(0x477)]());return _0xd6a610;}else{const _0x25f12b=$dataSystem[_0x9a3c21(0x59f)][_0x9a3c21(0x43b)](String(RegExp['$1'])[_0x9a3c21(0x3cc)]());return DataManager['isArmor'](_0x19468d)&&_0x19468d[_0x9a3c21(0x5df)]===_0x25f12b;}}else{if(this[_0x9a3c21(0x3cb)][_0x9a3c21(0x28b)](/ETYPE:(\d+)/i))return!!_0x19468d&&_0x19468d[_0x9a3c21(0x263)]===Number(RegExp['$1']);else{if(this[_0x9a3c21(0x3cb)][_0x9a3c21(0x28b)](/ETYPE:(.*)/i)){const _0x1a4ca1=$dataSystem[_0x9a3c21(0x429)][_0x9a3c21(0x43b)](String(RegExp['$1'])[_0x9a3c21(0x3cc)]());return DataManager[_0x9a3c21(0x33c)](_0x19468d)&&_0x19468d[_0x9a3c21(0x263)]===_0x1a4ca1;}else{if(this[_0x9a3c21(0x3cb)][_0x9a3c21(0x28b)](/Category:(.*)/i))return'cRJtu'!==_0x9a3c21(0x342)?this[_0x9a3c21(0x297)]?this['_list'][_0x9a3c21(0x571)]:0x3:!!_0x19468d&&_0x19468d[_0x9a3c21(0x4c9)][_0x9a3c21(0x176)](String(RegExp['$1'])[_0x9a3c21(0x63a)]()['trim']());}}}}}}}return![];},Window_ItemList[_0x26e348(0x462)]['isShowNew']=function(){return!![];},VisuMZ[_0x26e348(0x340)][_0x26e348(0x3e9)]=Window_ItemList[_0x26e348(0x462)][_0x26e348(0x1ca)],Window_ItemList['prototype'][_0x26e348(0x1ca)]=function(_0x34b036){const _0x82f5c3=_0x26e348;VisuMZ[_0x82f5c3(0x340)]['Window_ItemList_drawItem'][_0x82f5c3(0x62d)](this,_0x34b036),this[_0x82f5c3(0x3d1)](_0x34b036);},Window_ItemList[_0x26e348(0x462)][_0x26e348(0x1ab)]=function(_0x431ae0,_0x484316,_0x13fb3d,_0x2730bc){const _0x7341b6=_0x26e348;Window_Selectable['prototype'][_0x7341b6(0x1ab)][_0x7341b6(0x62d)](this,_0x431ae0,_0x484316,_0x13fb3d,_0x2730bc);},Window_ItemList[_0x26e348(0x462)][_0x26e348(0x3d1)]=function(_0xa6c4dc){const _0x16a099=_0x26e348,_0x367195=this[_0x16a099(0x24c)](_0xa6c4dc);if(!_0x367195||!this[_0x16a099(0x350)]())return;if(!$gameParty[_0x16a099(0x2c5)](_0x367195))return;const _0x38b106=this[_0x16a099(0x5b0)](_0xa6c4dc),_0x351af6=_0x38b106['x'],_0x24b62d=_0x38b106['y']+(this['lineHeight']()-ImageManager['iconHeight'])/0x2,_0x437283=VisuMZ['ItemsEquipsCore'][_0x16a099(0x1fa)][_0x16a099(0x4bb)]['OffsetX'],_0x448a64=VisuMZ[_0x16a099(0x340)][_0x16a099(0x1fa)][_0x16a099(0x4bb)][_0x16a099(0x446)];this['placeNewLabel'](_0x367195,_0x351af6+_0x437283,_0x24b62d+_0x448a64);},Window_ItemList[_0x26e348(0x462)]['setStatusWindow']=function(_0x100bac){const _0x1c6120=_0x26e348;this[_0x1c6120(0x41f)]=_0x100bac,this['callUpdateHelp']();},VisuMZ[_0x26e348(0x340)][_0x26e348(0x55e)]=Window_ItemList[_0x26e348(0x462)][_0x26e348(0x383)],Window_ItemList[_0x26e348(0x462)][_0x26e348(0x383)]=function(){const _0x327918=_0x26e348;VisuMZ['ItemsEquipsCore'][_0x327918(0x55e)][_0x327918(0x62d)](this),this[_0x327918(0x41f)]&&this[_0x327918(0x41f)][_0x327918(0x198)]===Window_ShopStatus&&this[_0x327918(0x41f)]['setItem'](this[_0x327918(0x546)]());},Window_BattleItem[_0x26e348(0x462)][_0x26e348(0x259)]=function(_0x24f434){const _0x1542df=_0x26e348;if(BattleManager['actor']()){if(_0x1542df(0x2d2)===_0x1542df(0x2d2))return BattleManager[_0x1542df(0x333)]()[_0x1542df(0x672)](_0x24f434);else this[_0x1542df(0x58d)](_0x12ddc2['isTriggered'](_0x1542df(0x539)));}else{if('idyLP'===_0x1542df(0x518))return Window_ItemList[_0x1542df(0x462)]['isEnabled'][_0x1542df(0x62d)](this,_0x24f434);else _0x4e86e0['ItemsEquipsCore']['ParseArmorNotetags'][_0x1542df(0x62d)](this,_0x32f069),_0x1a1e85[_0x1542df(0x340)][_0x1542df(0x22b)](_0x4f1ff1,_0x484fd6);}},Window_EventItem['prototype'][_0x26e348(0x350)]=function(){return![];},Window_EquipStatus['prototype'][_0x26e348(0x345)]=function(){const _0x23f326=_0x26e348;return VisuMZ['ItemsEquipsCore'][_0x23f326(0x1fa)][_0x23f326(0x35e)][_0x23f326(0x565)];},VisuMZ[_0x26e348(0x340)]['Window_EquipStatus_refresh']=Window_EquipStatus[_0x26e348(0x462)]['refresh'],Window_EquipStatus[_0x26e348(0x462)][_0x26e348(0x3ef)]=function(){const _0x4d7ded=_0x26e348;this['hideAdditionalSprites'](),this['resetFontSettings']();if(this[_0x4d7ded(0x501)])this[_0x4d7ded(0x501)][_0x4d7ded(0x3ef)]();if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x4d7ded(0x5a8)===_0x4d7ded(0x5a8))this[_0x4d7ded(0x34c)]();else{const _0x2ac21e=_0x477f4f(_0x3e94c0['$1'])[_0x4d7ded(0x1b6)](/[\r\n]+/);for(const _0x203d1f of _0x2ac21e){if(_0x203d1f[_0x4d7ded(0x28b)](/(.*):[ ](.*)/i)){const _0x17e724=_0x58f6cb(_0x401c74['$1'])[_0x4d7ded(0x3cc)](),_0x2ae52d=_0x59740e(_0x38ba93['$2'])[_0x4d7ded(0x3cc)]();this[_0x4d7ded(0x660)](_0x17e724,_0x2ae52d,_0x46533f,_0x1d1eaf,_0x46c42c),_0x3c64f5+=this[_0x4d7ded(0x541)]();}}}}else _0x4d7ded(0x344)!==_0x4d7ded(0x344)?_0x4678d9+=_0x4d7ded(0x275)[_0x4d7ded(0x43f)](this[_0x4d7ded(0x4cf)]['selfTP']):VisuMZ[_0x4d7ded(0x340)]['Window_EquipStatus_refresh'][_0x4d7ded(0x62d)](this);},Window_EquipStatus['prototype'][_0x26e348(0x34c)]=function(){const _0x211c16=_0x26e348;this[_0x211c16(0x439)][_0x211c16(0x233)]();if(!this[_0x211c16(0x501)])return;if(this[_0x211c16(0x23d)]()){const _0x3a7450=ImageManager[_0x211c16(0x592)](this[_0x211c16(0x501)][_0x211c16(0x3dc)]());_0x3a7450[_0x211c16(0x412)](this['onMenuImageLoad'][_0x211c16(0x60b)](this));}else{if(_0x211c16(0x1b0)!==_0x211c16(0x1b0))return this[_0x211c16(0x40c)]()?![]:_0x14c8f8[_0x211c16(0x462)][_0x211c16(0x355)][_0x211c16(0x62d)](this);else this[_0x211c16(0x59e)]();}},Window_EquipStatus['prototype']['isMainMenuCoreMenuImageOptionAvailable']=function(){const _0x388dd1=_0x26e348;return Imported[_0x388dd1(0x20a)]&&this['_actor'][_0x388dd1(0x3dc)]()!==''&&VisuMZ['ItemsEquipsCore'][_0x388dd1(0x1fa)]['EquipScene'][_0x388dd1(0x165)];},Window_EquipStatus[_0x26e348(0x462)][_0x26e348(0x5ca)]=function(){const _0xa4f16b=_0x26e348;VisuMZ[_0xa4f16b(0x340)][_0xa4f16b(0x1fa)]['EquipScene'][_0xa4f16b(0x606)][_0xa4f16b(0x62d)](this),this[_0xa4f16b(0x33b)]();},Window_EquipStatus[_0x26e348(0x462)][_0x26e348(0x59e)]=function(){const _0x14f1c5=_0x26e348;VisuMZ[_0x14f1c5(0x340)]['Settings'][_0x14f1c5(0x35e)]['DrawFaceJS'][_0x14f1c5(0x62d)](this),this['drawParamsItemsEquipsCore']();},Window_EquipStatus['prototype'][_0x26e348(0x33b)]=function(){const _0x2e5391=_0x26e348;this['resetFontSettings'](),VisuMZ[_0x2e5391(0x340)]['Settings']['EquipScene']['DrawParamJS']['call'](this);},Window_EquipStatus[_0x26e348(0x462)]['drawItemActorMenuImage']=function(_0x5d2421,_0x52e101,_0x21181c,_0x26bfb8,_0x3b6df7){const _0x4b6da4=_0x26e348,_0x1513a6=ImageManager[_0x4b6da4(0x592)](_0x5d2421[_0x4b6da4(0x3dc)]()),_0x239d16=this[_0x4b6da4(0x2b8)]-_0x1513a6['width'];_0x52e101+=_0x239d16/0x2;if(_0x239d16<0x0)_0x26bfb8-=_0x239d16;Window_StatusBase['prototype']['drawItemActorMenuImage']['call'](this,_0x5d2421,_0x52e101,_0x21181c,_0x26bfb8,_0x3b6df7);},Window_EquipStatus['prototype'][_0x26e348(0x597)]=function(){const _0x5540a6=_0x26e348;return Imported[_0x5540a6(0x454)]?VisuMZ['CoreEngine'][_0x5540a6(0x1fa)][_0x5540a6(0x48e)][_0x5540a6(0x280)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x26e348(0x462)]['paramValueFontSize']=function(){const _0x4c211c=_0x26e348;return VisuMZ['ItemsEquipsCore']['Settings'][_0x4c211c(0x35e)]['ParamValueFontSize'];},Window_EquipStatus['prototype']['isUseParamNamesWithIcons']=function(){const _0x5dea5c=_0x26e348;return Imported['VisuMZ_0_CoreEngine']&&VisuMZ[_0x5dea5c(0x38f)][_0x5dea5c(0x1fa)][_0x5dea5c(0x48e)]['DrawIcons'];},Window_EquipStatus['prototype'][_0x26e348(0x32e)]=function(_0x3f8f3c,_0x694dce,_0x2b55c6,_0x41cce4){const _0x67c988=_0x26e348,_0x188e09=this[_0x67c988(0x4a7)]();Imported[_0x67c988(0x454)]?this[_0x67c988(0x17a)](_0x694dce+_0x188e09,_0x2b55c6,_0x41cce4,_0x3f8f3c,![]):this[_0x67c988(0x1e8)](TextManager[_0x67c988(0x285)](_0x3f8f3c),_0x694dce+_0x188e09,_0x2b55c6,_0x41cce4);},Window_EquipStatus[_0x26e348(0x462)][_0x26e348(0x2ef)]=function(_0x421f57,_0x3cc6e5,_0x2ab4e1,_0x485251){const _0x532d7b=_0x26e348,_0x320715=this[_0x532d7b(0x4a7)]();let _0x49116f=0x0;Imported[_0x532d7b(0x454)]?_0x49116f=this['_actor']['paramValueByName'](_0x421f57,!![]):_0x49116f=this[_0x532d7b(0x501)]['param'](_0x421f57);const _0x5adf75=_0x49116f;this[_0x532d7b(0x1e8)](_0x49116f,_0x3cc6e5,_0x2ab4e1,_0x485251-_0x320715,_0x532d7b(0x652));},Window_EquipStatus[_0x26e348(0x462)][_0x26e348(0x2d6)]=function(_0x4ba43c,_0x1af432,_0x4f4fc9,_0x32c170){const _0x24fab5=_0x26e348,_0xe85ec2=this[_0x24fab5(0x4a7)]();let _0x14a725=0x0,_0x242331=0x0,_0x267ee3='';if(this['_tempActor']){Imported[_0x24fab5(0x454)]?(_0x14a725=this[_0x24fab5(0x501)]['paramValueByName'](_0x4ba43c,![]),_0x242331=this[_0x24fab5(0x5b2)][_0x24fab5(0x234)](_0x4ba43c,![]),_0x267ee3=this['_tempActor'][_0x24fab5(0x234)](_0x4ba43c,!![])):(_0x14a725=this[_0x24fab5(0x501)][_0x24fab5(0x285)](_0x4ba43c),_0x242331=this[_0x24fab5(0x5b2)][_0x24fab5(0x285)](_0x4ba43c),_0x267ee3=this[_0x24fab5(0x5b2)][_0x24fab5(0x285)](_0x4ba43c));const _0x4b03b1=_0x14a725,_0x5e7702=_0x242331;diffValue=_0x5e7702-_0x4b03b1,this[_0x24fab5(0x303)](ColorManager['paramchangeTextColor'](diffValue)),this[_0x24fab5(0x1e8)](_0x267ee3,_0x1af432,_0x4f4fc9,_0x32c170-_0xe85ec2,_0x24fab5(0x652));}},Window_EquipStatus['prototype']['drawUpdatedParamValueDiff']=function(_0x2cbc39,_0x527800,_0x3b8de1,_0x3a3573){const _0x10b394=_0x26e348,_0x4f0ff7=this['itemPadding']();let _0x4a4598=0x0,_0x175e90=0x0,_0x33ca5b=![];if(this[_0x10b394(0x5b2)]){Imported[_0x10b394(0x454)]?(_0x4a4598=this[_0x10b394(0x501)][_0x10b394(0x234)](_0x2cbc39,![]),_0x175e90=this['_tempActor'][_0x10b394(0x234)](_0x2cbc39,![]),_0x33ca5b=String(this['_actor'][_0x10b394(0x234)](_0x2cbc39,!![]))[_0x10b394(0x28b)](/([%％])/i)):(_0x4a4598=this[_0x10b394(0x501)][_0x10b394(0x285)](_0x2cbc39),_0x175e90=this[_0x10b394(0x5b2)][_0x10b394(0x285)](_0x2cbc39),_0x33ca5b=_0x4a4598%0x1!==0x0||_0x175e90%0x1!==0x0);const _0x196e1c=_0x4a4598,_0x5deafc=_0x175e90,_0x397c1f=_0x5deafc-_0x196e1c;let _0xaa7528=_0x397c1f;if(_0x33ca5b)_0xaa7528=Math[_0x10b394(0x562)](_0x397c1f*0x64)+'%';_0x397c1f!==0x0&&(_0x10b394(0x2fc)===_0x10b394(0x2fc)?(this[_0x10b394(0x303)](ColorManager[_0x10b394(0x2fa)](_0x397c1f)),_0xaa7528=(_0x397c1f>0x0?_0x10b394(0x162):_0x10b394(0x50d))[_0x10b394(0x43f)](_0xaa7528),this[_0x10b394(0x1e8)](_0xaa7528,_0x527800+_0x4f0ff7,_0x3b8de1,_0x3a3573,'left')):this[_0x10b394(0x4b7)][_0x10b394(0x32f)]());}},Window_EquipStatus[_0x26e348(0x462)][_0x26e348(0x608)]=function(_0x506d6f,_0x20a3f5,_0x401c78,_0x3cd52c,_0x2ea2bf){const _0xdb2f79=_0x26e348;if(VisuMZ[_0xdb2f79(0x340)][_0xdb2f79(0x1fa)][_0xdb2f79(0x35e)][_0xdb2f79(0x1de)]===![])return;_0x2ea2bf=Math[_0xdb2f79(0x41b)](_0x2ea2bf||0x1,0x1);while(_0x2ea2bf--){_0x3cd52c=_0x3cd52c||this[_0xdb2f79(0x541)](),this['contents'][_0xdb2f79(0x688)]=0xa0;const _0x175be5=ColorManager[_0xdb2f79(0x2e2)]();this[_0xdb2f79(0x439)]['fillRect'](_0x506d6f+0x1,_0x20a3f5+0x1,_0x401c78-0x2,_0x3cd52c-0x2,_0x175be5),this[_0xdb2f79(0x439)][_0xdb2f79(0x688)]=0xff;}},ColorManager['getItemsEquipsCoreBackColor2']=function(){const _0x34544b=_0x26e348,_0x1fdc84=VisuMZ[_0x34544b(0x340)][_0x34544b(0x1fa)][_0x34544b(0x35e)];let _0x265705=_0x1fdc84[_0x34544b(0x262)]!==undefined?_0x1fdc84[_0x34544b(0x262)]:0x13;return ColorManager[_0x34544b(0x301)](_0x265705);},VisuMZ[_0x26e348(0x340)]['Window_EquipCommand_initialize']=Window_EquipCommand['prototype'][_0x26e348(0x1fb)],Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x1fb)]=function(_0x43a564){const _0x42530b=_0x26e348;VisuMZ[_0x42530b(0x340)]['Window_EquipCommand_initialize'][_0x42530b(0x62d)](this,_0x43a564),this[_0x42530b(0x4a2)](_0x43a564);},Window_EquipCommand['prototype'][_0x26e348(0x4a2)]=function(_0x4b3c48){const _0x4fca39=_0x26e348,_0x553c46=new Rectangle(0x0,0x0,_0x4b3c48[_0x4fca39(0x291)],_0x4b3c48['height']);this[_0x4fca39(0x3f6)]=new Window_Base(_0x553c46),this['_commandNameWindow'][_0x4fca39(0x5c9)]=0x0,this[_0x4fca39(0x2e6)](this[_0x4fca39(0x3f6)]),this[_0x4fca39(0x20d)]();},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x515)]=function(){const _0x7baee5=_0x26e348;Window_HorzCommand['prototype'][_0x7baee5(0x515)][_0x7baee5(0x62d)](this);if(this[_0x7baee5(0x3f6)])this[_0x7baee5(0x20d)]();},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x20d)]=function(){const _0x251301=_0x26e348,_0x5504b2=this[_0x251301(0x3f6)];_0x5504b2['contents'][_0x251301(0x233)]();const _0x23ece2=this[_0x251301(0x4eb)](this[_0x251301(0x54f)]());if(_0x23ece2===_0x251301(0x213)){const _0x4ec205=this['itemLineRect'](this[_0x251301(0x54f)]());let _0x2b2324=this[_0x251301(0x386)](this[_0x251301(0x54f)]());_0x2b2324=_0x2b2324['replace'](/\\I\[(\d+)\]/gi,''),_0x5504b2[_0x251301(0x587)](),this['commandNameWindowDrawBackground'](_0x2b2324,_0x4ec205),this[_0x251301(0x5d4)](_0x2b2324,_0x4ec205),this['commandNameWindowCenter'](_0x2b2324,_0x4ec205);}},Window_EquipCommand['prototype'][_0x26e348(0x2ed)]=function(_0x263c72,_0x2ff9bf){},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x5d4)]=function(_0x257e1c,_0x51340e){const _0x29de18=_0x26e348,_0x1d32f2=this['_commandNameWindow'];_0x1d32f2[_0x29de18(0x1e8)](_0x257e1c,0x0,_0x51340e['y'],_0x1d32f2[_0x29de18(0x2b8)],_0x29de18(0x56f));},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x20f)]=function(_0xe08076,_0x21c2c8){const _0x26ac6c=_0x26e348,_0x27c2ef=this[_0x26ac6c(0x3f6)],_0x1b7d80=$gameSystem['windowPadding'](),_0x16bc64=_0x21c2c8['x']+Math['floor'](_0x21c2c8[_0x26ac6c(0x291)]/0x2)+_0x1b7d80;_0x27c2ef['x']=_0x27c2ef[_0x26ac6c(0x291)]/-0x2+_0x16bc64,_0x27c2ef['y']=Math[_0x26ac6c(0x160)](_0x21c2c8[_0x26ac6c(0x38b)]/0x2);},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x40c)]=function(){const _0x1dce5d=_0x26e348;return Imported[_0x1dce5d(0x454)]&&Window_HorzCommand[_0x1dce5d(0x462)][_0x1dce5d(0x40c)][_0x1dce5d(0x62d)](this);},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x32d)]=function(){const _0x4eb3b8=_0x26e348;if(this[_0x4eb3b8(0x437)]()===_0x4eb3b8(0x2ac))Window_HorzCommand[_0x4eb3b8(0x462)]['playOkSound'][_0x4eb3b8(0x62d)](this);},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x180)]=function(){const _0x4994dc=_0x26e348;!this[_0x4994dc(0x3b0)]()&&Window_HorzCommand['prototype']['processCursorMoveModernControls']['call'](this);},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x3b0)]=function(){const _0x2cf596=_0x26e348;if(!this[_0x2cf596(0x324)]())return![];if(SceneManager[_0x2cf596(0x2e5)][_0x2cf596(0x198)]!==Scene_Equip)return![];return Input['isTriggered'](_0x2cf596(0x539))&&(_0x2cf596(0x2f2)!==_0x2cf596(0x2ec)?this[_0x2cf596(0x4fa)]():(this['_slotWindow'][_0x2cf596(0x15e)](0x0),this['_slotWindow'][_0x2cf596(0x305)]())),![];},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x4fa)]=function(){const _0x4a4168=_0x26e348;this['playCursorSound'](),SceneManager['_scene'][_0x4a4168(0x601)](),SceneManager[_0x4a4168(0x2e5)]['_slotWindow'][_0x4a4168(0x15e)](-0x1);},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x1ae)]=function(){const _0x57b309=_0x26e348;return this[_0x57b309(0x297)]?this['_list'][_0x57b309(0x571)]:0x3;},Window_EquipCommand['prototype'][_0x26e348(0x487)]=function(){const _0x98e0e9=_0x26e348;if(this[_0x98e0e9(0x2e7)]()&&this[_0x98e0e9(0x4c0)]&&SceneManager[_0x98e0e9(0x2e5)]['constructor']===Scene_Equip){if(this[_0x98e0e9(0x355)]()&&TouchInput['isHovered']())this[_0x98e0e9(0x1d6)](![]);else TouchInput[_0x98e0e9(0x3d5)]()&&this['onTouchSelectModernControls'](!![]);if(TouchInput[_0x98e0e9(0x201)]()){if(_0x98e0e9(0x19c)!=='LNyts')this[_0x98e0e9(0x5c5)]();else return _0x216851['ItemsEquipsCore']['Settings'][_0x98e0e9(0x45d)][_0x98e0e9(0x4c4)];}}},Window_EquipCommand['prototype'][_0x26e348(0x1d6)]=function(_0x4cac5b){const _0x2baf7a=_0x26e348;this[_0x2baf7a(0x631)]=![];const _0x4b928f=this[_0x2baf7a(0x54f)](),_0x1ec961=this['hitIndex'](),_0x399ae9=SceneManager[_0x2baf7a(0x2e5)][_0x2baf7a(0x428)];if(_0x399ae9['isOpen']()&&_0x399ae9[_0x2baf7a(0x4c0)]){if(_0x1ec961>=0x0)_0x1ec961===this[_0x2baf7a(0x54f)]()&&(this[_0x2baf7a(0x631)]=!![]),this['activate'](),this['select'](_0x1ec961);else _0x399ae9[_0x2baf7a(0x3bb)]()>=0x0&&(this[_0x2baf7a(0x32f)](),this[_0x2baf7a(0x399)]());}_0x4cac5b&&this['index']()!==_0x4b928f&&this[_0x2baf7a(0x40d)]();},Window_EquipCommand['prototype'][_0x26e348(0x245)]=function(){const _0x21026a=_0x26e348;this[_0x21026a(0x46d)](),this[_0x21026a(0x491)](),this[_0x21026a(0x4f0)]();},Window_EquipCommand['prototype'][_0x26e348(0x3ef)]=function(){const _0x51a617=_0x26e348;Window_HorzCommand['prototype']['refresh']['call'](this),this[_0x51a617(0x385)]();},Window_EquipCommand['prototype'][_0x26e348(0x46d)]=function(){const _0x75a748=_0x26e348;if(!this['isEquipCommandAdded']())return;const _0x3f23f7=this[_0x75a748(0x639)](),_0x7b6ae8=VisuMZ['ItemsEquipsCore']['Settings'][_0x75a748(0x35e)][_0x75a748(0x45c)],_0x4d2dff=_0x3f23f7===_0x75a748(0x4af)?TextManager[_0x75a748(0x457)]:_0x75a748(0x265)['format'](_0x7b6ae8,TextManager[_0x75a748(0x457)]),_0x43944f=this[_0x75a748(0x2b6)]();this[_0x75a748(0x670)](_0x4d2dff,_0x75a748(0x2ac),_0x43944f);},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x63b)]=function(){const _0x51084d=_0x26e348;return!this[_0x51084d(0x40c)]();},Window_EquipCommand['prototype'][_0x26e348(0x2b6)]=function(){return!![];},Window_EquipCommand[_0x26e348(0x462)]['addOptimizeCommand']=function(){const _0xbdf713=_0x26e348;if(!this[_0xbdf713(0x60e)]())return;const _0x204c0e=this['commandStyle'](),_0xd8ffdd=VisuMZ[_0xbdf713(0x340)][_0xbdf713(0x1fa)][_0xbdf713(0x35e)][_0xbdf713(0x1a0)],_0x2c58f2=_0x204c0e===_0xbdf713(0x4af)?TextManager[_0xbdf713(0x522)]:_0xbdf713(0x265)[_0xbdf713(0x43f)](_0xd8ffdd,TextManager[_0xbdf713(0x522)]),_0x567bea=this['isOptimizeCommandEnabled']();this[_0xbdf713(0x670)](_0x2c58f2,'optimize',_0x567bea);},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x60e)]=function(){const _0x54327a=_0x26e348;return VisuMZ[_0x54327a(0x340)][_0x54327a(0x1fa)][_0x54327a(0x35e)][_0x54327a(0x346)];},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x3d9)]=function(){return!![];},Window_EquipCommand['prototype'][_0x26e348(0x4f0)]=function(){const _0x359e26=_0x26e348;if(!this['isClearCommandAdded']())return;const _0x3ed82d=this['commandStyle'](),_0x384a40=VisuMZ[_0x359e26(0x340)]['Settings']['EquipScene'][_0x359e26(0x5f9)],_0x380f11=_0x3ed82d===_0x359e26(0x4af)?TextManager[_0x359e26(0x233)]:_0x359e26(0x265)[_0x359e26(0x43f)](_0x384a40,TextManager[_0x359e26(0x233)]),_0x356f8e=this[_0x359e26(0x221)]();this[_0x359e26(0x670)](_0x380f11,'clear',_0x356f8e);},Window_EquipCommand['prototype'][_0x26e348(0x247)]=function(){const _0x10926a=_0x26e348;return VisuMZ[_0x10926a(0x340)][_0x10926a(0x1fa)][_0x10926a(0x35e)][_0x10926a(0x586)];},Window_EquipCommand['prototype'][_0x26e348(0x221)]=function(){return!![];},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x34b)]=function(){const _0x99e59b=_0x26e348;return VisuMZ[_0x99e59b(0x340)][_0x99e59b(0x1fa)][_0x99e59b(0x35e)]['CmdTextAlign'];},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x1ca)]=function(_0x378838){const _0x299e39=_0x26e348,_0x4694e8=this[_0x299e39(0x4eb)](_0x378838);if(_0x4694e8==='iconText')this[_0x299e39(0x65c)](_0x378838);else _0x4694e8===_0x299e39(0x213)?'nAagf'!=='nAagf'?this[_0x299e39(0x2a8)](_0x2a5460[_0x299e39(0x3d5)]('pageup')):this[_0x299e39(0x15a)](_0x378838):Window_HorzCommand[_0x299e39(0x462)][_0x299e39(0x1ca)]['call'](this,_0x378838);},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x639)]=function(){const _0x3d8799=_0x26e348;return VisuMZ[_0x3d8799(0x340)][_0x3d8799(0x1fa)]['EquipScene'][_0x3d8799(0x5a2)];},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x4eb)]=function(_0x41655c){const _0x546871=_0x26e348;if(_0x41655c<0x0)return _0x546871(0x4af);const _0x2a55cc=this['commandStyle']();if(_0x2a55cc!=='auto'){if(_0x546871(0x542)!==_0x546871(0x542))_0x438128='item-%1'[_0x546871(0x43f)](_0x29af3b['id']);else return _0x2a55cc;}else{if(this['maxItems']()>0x0){const _0x960364=this[_0x546871(0x386)](_0x41655c);if(_0x960364[_0x546871(0x28b)](/\\I\[(\d+)\]/i)){const _0x1831be=this['itemLineRect'](_0x41655c),_0x16ba8e=this[_0x546871(0x1e9)](_0x960364)['width'];if(_0x16ba8e<=_0x1831be[_0x546871(0x291)]){if(_0x546871(0x488)!==_0x546871(0x414))return'iconText';else{if(this[_0x546871(0x434)](_0x37db70)){const _0x4988ed=_0x29069e[_0x546871(0x626)](_0xb3fbb4);_0x4988ed[_0x546871(0x5b2)]=!![];const _0x31d33d=_0x4988ed[_0x546871(0x310)](this[_0x546871(0x3a3)]);_0x31d33d>=0x0&&_0x4988ed[_0x546871(0x3f9)](_0x31d33d,this[_0x546871(0x3a3)]),this[_0x546871(0x5b2)]=_0x4988ed;}return this['_tempActor'];}}else return _0x546871(0x213);}}}return _0x546871(0x4af);},Window_EquipCommand[_0x26e348(0x462)]['drawItemStyleIconText']=function(_0x5ecc74){const _0x8d1029=_0x26e348,_0x330d22=this[_0x8d1029(0x5b0)](_0x5ecc74),_0x1b9287=this[_0x8d1029(0x386)](_0x5ecc74),_0x4658ff=this['textSizeEx'](_0x1b9287)['width'];this[_0x8d1029(0x326)](this['isCommandEnabled'](_0x5ecc74));const _0x203184=this[_0x8d1029(0x34b)]();if(_0x203184==='right')this[_0x8d1029(0x2a2)](_0x1b9287,_0x330d22['x']+_0x330d22[_0x8d1029(0x291)]-_0x4658ff,_0x330d22['y'],_0x4658ff);else{if(_0x203184==='center'){const _0x4dd282=_0x330d22['x']+Math[_0x8d1029(0x160)]((_0x330d22[_0x8d1029(0x291)]-_0x4658ff)/0x2);this['drawTextEx'](_0x1b9287,_0x4dd282,_0x330d22['y'],_0x4658ff);}else{if('pBzAQ'==='NxEjo')return _0x589727[_0x8d1029(0x340)]['Scene_Shop_commandWindowRect'][_0x8d1029(0x62d)](this);else this[_0x8d1029(0x2a2)](_0x1b9287,_0x330d22['x'],_0x330d22['y'],_0x4658ff);}}},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x15a)]=function(_0x1cf452){const _0x55f03e=_0x26e348;this[_0x55f03e(0x386)](_0x1cf452)[_0x55f03e(0x28b)](/\\I\[(\d+)\]/i);const _0x121d91=Number(RegExp['$1'])||0x0,_0xf642a4=this[_0x55f03e(0x5b0)](_0x1cf452),_0x1e5b24=_0xf642a4['x']+Math['floor']((_0xf642a4[_0x55f03e(0x291)]-ImageManager[_0x55f03e(0x4f5)])/0x2),_0x2ea930=_0xf642a4['y']+(_0xf642a4[_0x55f03e(0x38b)]-ImageManager[_0x55f03e(0x4f2)])/0x2;this[_0x55f03e(0x33f)](_0x121d91,_0x1e5b24,_0x2ea930);},Window_EquipCommand[_0x26e348(0x462)]['actor']=function(){const _0x347a5b=_0x26e348,_0x4fa1ca=SceneManager[_0x347a5b(0x2e5)];if(_0x4fa1ca&&_0x4fa1ca[_0x347a5b(0x343)])return _0x347a5b(0x31b)!==_0x347a5b(0x31b)?this[_0x347a5b(0x439)]['fontSize']/_0x1f8f98[_0x347a5b(0x3bd)]():_0x4fa1ca[_0x347a5b(0x343)]();return null;},Window_EquipCommand[_0x26e348(0x462)][_0x26e348(0x383)]=function(){const _0x2c16d2=_0x26e348;Window_Command[_0x2c16d2(0x462)][_0x2c16d2(0x383)][_0x2c16d2(0x62d)](this),this[_0x2c16d2(0x352)]['setText'](this['helpDescriptionText']());},Window_EquipCommand['prototype'][_0x26e348(0x3e7)]=function(){const _0x1e550c=_0x26e348,_0x1a83ca=this[_0x1e550c(0x437)]();switch(_0x1a83ca){case _0x1e550c(0x2ac):return TextManager['ITEMS_EQUIPS_CORE'][_0x1e550c(0x3e2)]['equip'];case _0x1e550c(0x522):return TextManager[_0x1e550c(0x444)]['helpDesc'][_0x1e550c(0x522)];case'clear':return TextManager['ITEMS_EQUIPS_CORE'][_0x1e550c(0x3e2)][_0x1e550c(0x233)];default:return'';}},Window_EquipSlot[_0x26e348(0x462)][_0x26e348(0x40c)]=function(){const _0x129305=_0x26e348;return Imported[_0x129305(0x454)]&&Window_HorzCommand[_0x129305(0x462)][_0x129305(0x40c)]['call'](this);},Window_EquipSlot[_0x26e348(0x462)]['activate']=function(){const _0x484004=_0x26e348;Window_StatusBase[_0x484004(0x462)][_0x484004(0x305)][_0x484004(0x62d)](this),this[_0x484004(0x515)]();},Window_EquipSlot[_0x26e348(0x462)][_0x26e348(0x3c9)]=function(){const _0x13f0e8=_0x26e348;Window_StatusBase['prototype'][_0x13f0e8(0x3c9)]['call'](this),this[_0x13f0e8(0x48c)]();},Window_EquipSlot['prototype'][_0x26e348(0x48c)]=function(){const _0x21a6ab=_0x26e348;if(!this[_0x21a6ab(0x398)]())return;if(Input['isTriggered'](_0x21a6ab(0x1a3))&&this[_0x21a6ab(0x546)]()){const _0x173dab=SceneManager['_scene'][_0x21a6ab(0x501)];if(_0x173dab){if(this['canShiftRemoveEquipment'](this[_0x21a6ab(0x54f)]()))_0x21a6ab(0x600)!==_0x21a6ab(0x600)?this['initialize'](...arguments):(this[_0x21a6ab(0x3ac)](),this[_0x21a6ab(0x383)]());else{if(_0x21a6ab(0x623)===_0x21a6ab(0x596)){const _0x3fd9c8=_0x4ef53c[_0x21a6ab(0x508)]('['+_0x5b3bdd['$1'][_0x21a6ab(0x28b)](/\d+/g)+']');for(const _0xc1d548 of _0x3fd9c8){if(_0x4cd773[_0x21a6ab(0x4b9)](_0xc1d548))return![];}}else this[_0x21a6ab(0x1e1)]();}}}},Window_EquipSlot['prototype'][_0x26e348(0x52e)]=function(_0x8524e6){const _0x242653=_0x26e348,_0xa90513=SceneManager[_0x242653(0x2e5)]['_actor'];if(!_0xa90513)return;if(!_0xa90513[_0x242653(0x1a7)](_0x8524e6))return![];const _0x3e522f=_0xa90513[_0x242653(0x560)]()[_0x8524e6];if(_0xa90513[_0x242653(0x3fe)]()[_0x242653(0x176)](_0x3e522f)){if(_0x242653(0x662)!==_0x242653(0x691))return![];else _0xc7f924=_0xd3dc11[_0x242653(0x340)][_0x242653(0x4b5)](_0x390efc),_0x25b93e[_0x242653(0x340)][_0x242653(0x61f)][_0x242653(0x62d)](this,_0x2fb820,_0xdd6111),this[_0x242653(0x27f)]();}return!![];;},Window_EquipSlot['prototype']['processShiftRemoveShortcut']=function(){const _0x321278=_0x26e348;SoundManager[_0x321278(0x4b4)]();const _0x599e13=SceneManager[_0x321278(0x2e5)]['_actor'];_0x599e13[_0x321278(0x553)](this[_0x321278(0x54f)](),null),this[_0x321278(0x3ef)](),this['_itemWindow']['refresh'](),this[_0x321278(0x515)]();const _0x5755a5=SceneManager['_scene'][_0x321278(0x41f)];if(_0x5755a5)_0x5755a5['refresh']();},Window_EquipSlot[_0x26e348(0x462)][_0x26e348(0x398)]=function(){const _0x506735=_0x26e348;if(!this['active'])return![];if(!VisuMZ[_0x506735(0x340)][_0x506735(0x1fa)][_0x506735(0x35e)]['ShiftShortcutKey'])return![];return!![];},Window_EquipSlot[_0x26e348(0x462)][_0x26e348(0x180)]=function(){const _0x51de7=_0x26e348;!this[_0x51de7(0x3b0)]()&&('MPJMV'===_0x51de7(0x289)?this[_0x51de7(0x5c3)][_0x51de7(0x677)](_0x51de7(0x328),this[_0x51de7(0x2a7)][_0x51de7(0x60b)](this)):Window_StatusBase[_0x51de7(0x462)][_0x51de7(0x180)][_0x51de7(0x62d)](this));},Window_EquipSlot[_0x26e348(0x462)][_0x26e348(0x3b0)]=function(){const _0xfc25f=_0x26e348;if(!this[_0xfc25f(0x324)]())return![];if(SceneManager[_0xfc25f(0x2e5)][_0xfc25f(0x198)]!==Scene_Equip)return![];if(this[_0xfc25f(0x401)]())return this[_0xfc25f(0x40d)](),Input[_0xfc25f(0x233)](),SceneManager[_0xfc25f(0x2e5)][_0xfc25f(0x159)](),![];else{if(Input[_0xfc25f(0x664)](_0xfc25f(0x539))){const _0x128b6d=this[_0xfc25f(0x54f)]();if(Input[_0xfc25f(0x68d)](_0xfc25f(0x1a3))){if(_0xfc25f(0x459)!==_0xfc25f(0x51a))this[_0xfc25f(0x391)]();else{const _0x2529b1=this[_0xfc25f(0x54f)](),_0x2e73d9=this[_0xfc25f(0x3bb)]();_0x2e73d9>=0x0&&_0x2e73d9!==this[_0xfc25f(0x54f)]()&&this['select'](_0x2e73d9),_0x675ed8&&this[_0xfc25f(0x54f)]()!==_0x2529b1&&this['playCursorSound']();}}else this[_0xfc25f(0x58d)](Input['isTriggered']('down'));return this['index']()!==_0x128b6d&&this[_0xfc25f(0x40d)](),!![];}else{if(this['isShiftShortcutKeyForRemove']()&&Input[_0xfc25f(0x3d5)]('shift')){if(_0xfc25f(0x472)==='LFiLl')_0x5e0e87[_0xfc25f(0x340)][_0xfc25f(0x1fa)][_0xfc25f(0x35e)][_0xfc25f(0x606)][_0xfc25f(0x62d)](this),this[_0xfc25f(0x33b)]();else return!![];}}}return![];},Window_EquipSlot[_0x26e348(0x462)][_0x26e348(0x401)]=function(){const _0x2f8db0=_0x26e348;if(this[_0x2f8db0(0x54f)]()!==0x0)return![];const _0x519cfe=VisuMZ[_0x2f8db0(0x340)][_0x2f8db0(0x1fa)][_0x2f8db0(0x35e)];if(!_0x519cfe[_0x2f8db0(0x346)]&&!_0x519cfe[_0x2f8db0(0x586)])return![];return Input[_0x2f8db0(0x3d5)]('up');},Window_EquipSlot[_0x26e348(0x462)][_0x26e348(0x279)]=function(){const _0x16b681=_0x26e348;return VisuMZ['ItemsEquipsCore']['Settings'][_0x16b681(0x35e)][_0x16b681(0x19b)];},Window_EquipSlot[_0x26e348(0x462)]['processTouchModernControls']=function(){const _0x4c96ac=_0x26e348;if(this[_0x4c96ac(0x2e7)]()&&this[_0x4c96ac(0x4c0)]&&SceneManager[_0x4c96ac(0x2e5)][_0x4c96ac(0x198)]===Scene_Equip){if(this[_0x4c96ac(0x355)]()&&TouchInput[_0x4c96ac(0x371)]())this[_0x4c96ac(0x1d6)](![]);else TouchInput['isTriggered']()&&(_0x4c96ac(0x24a)===_0x4c96ac(0x431)?(this['_categoryWindow']['smoothSelect'](0x0),this[_0x4c96ac(0x64d)]()):this[_0x4c96ac(0x1d6)](!![]));if(TouchInput[_0x4c96ac(0x201)]())this[_0x4c96ac(0x5c5)]();else{if(TouchInput[_0x4c96ac(0x633)]()){if(_0x4c96ac(0x658)!==_0x4c96ac(0x57b))this['onTouchCancel']();else{if(!this['isEquipItem']()&&!_0x271aa6[_0x4c96ac(0x2bd)](this['_item']))return![];if(_0xca2b26['isKeyItem'](this[_0x4c96ac(0x3a3)])&&!_0x44deb4['optKeyItemsNumber']){const _0x21b606=_0x3d732c[_0x4c96ac(0x2d4)];this[_0x4c96ac(0x349)](_0x21b606,_0x7bf0b4,_0x95930f,_0x1fb919,!![],_0x4c96ac(0x56f));}else{const _0x48e86a=_0x1f43fb[_0x4c96ac(0x269)];this[_0x4c96ac(0x349)](_0x48e86a,_0x533f62,_0x343093,_0x10778c,!![]);const _0xcb3c13=this['getItemQuantityText']();this[_0x4c96ac(0x349)](_0xcb3c13,_0x5325af,_0x3aea31,_0x14ecd1,![],_0x4c96ac(0x652));}return this[_0x4c96ac(0x608)](_0x7727a4,_0x4f2a0a,_0x4cff94),this[_0x4c96ac(0x587)](),!![];}}}}},Window_EquipSlot[_0x26e348(0x462)][_0x26e348(0x1d6)]=function(_0x5131a1){const _0x3458f4=_0x26e348;this[_0x3458f4(0x631)]=![];const _0xa250d0=this[_0x3458f4(0x54f)](),_0x3ed974=this[_0x3458f4(0x3bb)](),_0x1a59a3=SceneManager[_0x3458f4(0x2e5)]['_commandWindow'];if(_0x1a59a3['isOpen']()&&_0x1a59a3['visible']){if(_0x3ed974>=0x0)_0x3458f4(0x661)!==_0x3458f4(0x661)?_0x3221bc=_0x3458f4(0x62f)['format'](_0x49cb19['id']):(_0x3ed974===this[_0x3458f4(0x54f)]()&&(this[_0x3458f4(0x631)]=!![]),this[_0x3458f4(0x305)](),this['select'](_0x3ed974));else{if(_0x1a59a3[_0x3458f4(0x3bb)]()>=0x0){if('PhlWo'===_0x3458f4(0x363))this[_0x3458f4(0x32f)](),this[_0x3458f4(0x399)]();else{const _0x206cf3=this[_0x3458f4(0x5b0)](_0x29870f),_0x200b51=this['commandName'](_0x2bb574),_0x20f256=this[_0x3458f4(0x1e9)](_0x200b51)[_0x3458f4(0x291)];this[_0x3458f4(0x326)](this[_0x3458f4(0x56c)](_0xdb58c8));const _0x563767=this[_0x3458f4(0x34b)]();if(_0x563767==='right')this[_0x3458f4(0x2a2)](_0x200b51,_0x206cf3['x']+_0x206cf3[_0x3458f4(0x291)]-_0x20f256,_0x206cf3['y'],_0x20f256);else{if(_0x563767===_0x3458f4(0x56f)){const _0x24b1c1=_0x206cf3['x']+_0x5c2446[_0x3458f4(0x160)]((_0x206cf3[_0x3458f4(0x291)]-_0x20f256)/0x2);this[_0x3458f4(0x2a2)](_0x200b51,_0x24b1c1,_0x206cf3['y'],_0x20f256);}else this['drawTextEx'](_0x200b51,_0x206cf3['x'],_0x206cf3['y'],_0x20f256);}}}}}_0x5131a1&&this[_0x3458f4(0x54f)]()!==_0xa250d0&&(_0x3458f4(0x5cd)!==_0x3458f4(0x3c8)?this[_0x3458f4(0x40d)]():this[_0x3458f4(0x1d6)](!![]));},Window_EquipSlot[_0x26e348(0x462)][_0x26e348(0x164)]=function(){const _0x443007=_0x26e348;return this[_0x443007(0x54f)]();},VisuMZ[_0x26e348(0x340)][_0x26e348(0x673)]=Window_EquipItem[_0x26e348(0x462)][_0x26e348(0x176)],Window_EquipItem[_0x26e348(0x462)]['includes']=function(_0x5d5c92){const _0xbf6af0=_0x26e348;if(_0x5d5c92===null&&this[_0xbf6af0(0x3fe)]()[_0xbf6af0(0x176)](this[_0xbf6af0(0x263)]()))return _0xbf6af0(0x3d4)!=='jrfDh'?this['isEquipAtypeOk'](_0x79099f[_0xbf6af0(0x5df)])&&!this[_0xbf6af0(0x168)](_0x1db5c7[_0xbf6af0(0x263)])&&_0x5ecfb6[_0xbf6af0(0x196)](_0x4bc0ce)[_0xbf6af0(0x67b)](_0x11a498=>!this['isEquipTypeSealed'](_0x11a498)):![];else{if('DPuyL'===_0xbf6af0(0x4c7)){$gameTemp[_0xbf6af0(0x523)]=!![];let _0x15344a=VisuMZ[_0xbf6af0(0x340)][_0xbf6af0(0x673)][_0xbf6af0(0x62d)](this,_0x5d5c92);if(!_0x15344a&&_0x5d5c92&&DataManager[_0xbf6af0(0x33c)](_0x5d5c92)){if(_0xbf6af0(0x5de)!=='FIxEp'){const _0xa19e87=_0x5d5c92[_0xbf6af0(0x5df)]||0x0;if(this['_actor']&&this[_0xbf6af0(0x501)][_0xbf6af0(0x5a1)](_0xa19e87)){if(_0xbf6af0(0x406)===_0xbf6af0(0x406)){const _0x328e8=DataManager[_0xbf6af0(0x196)](_0x5d5c92);if(_0x328e8[_0xbf6af0(0x176)](this[_0xbf6af0(0x263)]())){if(_0xbf6af0(0x1ea)===_0xbf6af0(0x1ea))_0x15344a=!![];else{if(!_0x8c43f8)return 0x63;else return _0x4fc1bd['note'][_0xbf6af0(0x28b)](/<MAX:[ ](\d+)>/i)?_0x197669(_0x43f91b['$1']):this[_0xbf6af0(0x52d)](_0x429271);}}}else return _0x5055c3[_0xbf6af0(0x340)]['Settings'][_0xbf6af0(0x35e)][_0xbf6af0(0x565)];}}else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this['itemWindowRectItemsEquipsCore']();else{const _0xf666b5=_0x4eed3e[_0xbf6af0(0x340)][_0xbf6af0(0x5c8)]['call'](this);return this[_0xbf6af0(0x1b7)]()&&this[_0xbf6af0(0x2ca)]()&&(_0xf666b5[_0xbf6af0(0x291)]-=this[_0xbf6af0(0x38d)]()),_0xf666b5;}}}return $gameTemp[_0xbf6af0(0x523)]=undefined,_0x15344a;}else return _0x25de79[_0xbf6af0(0x41b)](0x1,_0x1dcb49[_0xbf6af0(0x3bd)]()-0x4);}},VisuMZ[_0x26e348(0x340)]['Window_EquipItem_isEnabled']=Window_EquipItem['prototype']['isEnabled'],Window_EquipItem[_0x26e348(0x462)]['isEnabled']=function(_0x4cc782){const _0x4d0826=_0x26e348;if(_0x4cc782&&this[_0x4d0826(0x501)]){if(this[_0x4d0826(0x3eb)](_0x4cc782))return![];if(this[_0x4d0826(0x4d2)](_0x4cc782))return![];if(this[_0x4d0826(0x4fd)](_0x4cc782))return![];if(!this[_0x4d0826(0x501)]['canEquip'](_0x4cc782))return![];}if(!_0x4cc782){if(_0x4d0826(0x682)===_0x4d0826(0x682))return!this[_0x4d0826(0x3fe)]()[_0x4d0826(0x176)](this[_0x4d0826(0x263)]());else{const _0x501ea2=_0x38968a[_0x4d0826(0x37e)]()[_0x4d0826(0x308)](_0xd3917d=>_0x571cd3['isArtifact'](_0xd3917d));for(const _0x26fd53 of _0x501ea2){const _0x2e4854=this[_0x4d0826(0x37b)](_0x26fd53);if(_0x2e4854)this[_0x4d0826(0x3e5)](_0x26fd53,_0x2e4854);}}}return VisuMZ['ItemsEquipsCore']['Window_EquipItem_isEnabled'][_0x4d0826(0x62d)](this,_0x4cc782);},Window_EquipItem['prototype']['itemHasEquipLimit']=function(_0x5ed5ac){const _0x53309f=_0x26e348,_0x5ba15b=_0x5ed5ac[_0x53309f(0x545)];if(_0x5ba15b[_0x53309f(0x28b)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){if(_0x53309f(0x3a2)!=='NOdea'){const _0x2fcf55=Number(RegExp['$1'])||0x1;let _0x5aa3ac=0x0;const _0x2d9788=this[_0x53309f(0x501)][_0x53309f(0x2e9)](),_0x1ca244=SceneManager['_scene'][_0x53309f(0x428)]['equipSlotIndex']();_0x2d9788[_0x1ca244]=null;for(const _0x3e0269 of _0x2d9788){if(!_0x3e0269)continue;if(DataManager[_0x53309f(0x188)](_0x5ed5ac)===DataManager[_0x53309f(0x188)](_0x3e0269)){if(_0x5ed5ac['id']===_0x3e0269['id'])_0x5aa3ac+=0x1;}}return _0x5aa3ac>=_0x2fcf55;}else this[_0x53309f(0x31c)]();}else return![];},Window_EquipItem[_0x26e348(0x462)][_0x26e348(0x4d2)]=function(_0x586fa1){const _0x3345f6=_0x26e348;if(!DataManager[_0x3345f6(0x188)](_0x586fa1))return![];const _0x5de9c4=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x1e2332=0x0;const _0x4686b6=this[_0x3345f6(0x501)]['equips'](),_0x13bd8d=SceneManager[_0x3345f6(0x2e5)][_0x3345f6(0x428)][_0x3345f6(0x164)]();_0x4686b6[_0x13bd8d]=null;for(const _0x215364 of _0x4686b6){if(_0x3345f6(0x527)===_0x3345f6(0x671))return _0x3b10d6[_0x3345f6(0x340)][_0x3345f6(0x1fa)]['StatusWindow'][_0x3345f6(0x4f9)];else{if(!_0x215364)continue;if(!DataManager[_0x3345f6(0x188)](_0x215364))continue;if(_0x586fa1[_0x3345f6(0x665)]===_0x215364['wtypeId']){if(_0x3345f6(0x2ab)!==_0x3345f6(0x627)){_0x1e2332+=0x1;if(_0x586fa1[_0x3345f6(0x545)][_0x3345f6(0x28b)](_0x5de9c4)){if(_0x3345f6(0x5ea)===_0x3345f6(0x5ea)){const _0x1be6db=Number(RegExp['$1'])||0x1;if(_0x1e2332>=_0x1be6db)return!![];}else{const _0x30d2c0=_0x2d97ae(_0x23578d['$1'])[_0x3345f6(0x3cc)](),_0x5e9daa=/^\d+$/[_0x3345f6(0x45b)](_0x30d2c0);if(_0x5e9daa){if(this[_0x3345f6(0x188)](_0x2a4817))return _0x49a060[_0x1a45d2(_0x30d2c0)];if(this['isArmor'](_0x453449))return _0x7276f3[_0x430062(_0x30d2c0)];}else{if(this[_0x3345f6(0x188)](_0x2134a7))return _0x841887[this[_0x3345f6(0x5bc)](_0x30d2c0)];if(this[_0x3345f6(0x33c)](_0x1d204b))return _0x2d5dd5[this[_0x3345f6(0x4e3)](_0x30d2c0)];}}}if(_0x215364['note'][_0x3345f6(0x28b)](_0x5de9c4)){const _0x3d47b9=Number(RegExp['$1'])||0x1;if(_0x1e2332>=_0x3d47b9)return!![];}}else return _0x545e02['ItemsEquipsCore'][_0x3345f6(0x1fa)]['StatusWindow'][_0x3345f6(0x4a4)];}}}return![];},Window_EquipItem[_0x26e348(0x462)]['isSoleArmorType']=function(_0x18ba8c){const _0xf27c7c=_0x26e348;if(!DataManager[_0xf27c7c(0x33c)](_0x18ba8c))return![];const _0x3aee14=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x13573b=0x0;const _0xca09e4=this[_0xf27c7c(0x501)][_0xf27c7c(0x2e9)](),_0x151ece=SceneManager['_scene'][_0xf27c7c(0x428)]['equipSlotIndex']();_0xca09e4[_0x151ece]=null;for(const _0x3da035 of _0xca09e4){if(_0xf27c7c(0x1d3)===_0xf27c7c(0x1d3)){if(!_0x3da035)continue;if(!DataManager[_0xf27c7c(0x33c)](_0x3da035))continue;if(_0x18ba8c[_0xf27c7c(0x5df)]===_0x3da035['atypeId']){if(_0xf27c7c(0x3dd)===_0xf27c7c(0x3dd)){_0x13573b+=0x1;if(_0x18ba8c[_0xf27c7c(0x545)][_0xf27c7c(0x28b)](_0x3aee14)){if(_0xf27c7c(0x64a)==='XhoFL')return this[_0xf27c7c(0x345)]()?this[_0xf27c7c(0x651)]():_0x5bf8f5[_0xf27c7c(0x340)][_0xf27c7c(0x1f4)][_0xf27c7c(0x62d)](this);else{const _0x42d346=Number(RegExp['$1'])||0x1;if(_0x13573b>=_0x42d346)return!![];}}if(_0x3da035[_0xf27c7c(0x545)][_0xf27c7c(0x28b)](_0x3aee14)){if(_0xf27c7c(0x1e4)===_0xf27c7c(0x1e4)){const _0x8a7d21=Number(RegExp['$1'])||0x1;if(_0x13573b>=_0x8a7d21)return!![];}else this[_0xf27c7c(0x2a2)](_0x310f2d,_0x1826f3['x']+_0x5b9f05['width']-_0x2137d4,_0x54d2f3['y'],_0x78a641);}}else _0x339969['note']['match'](/<PRICE:[ ](\d+)>/i)&&(_0x5d1f98['price']=_0x1be921(_0x359af5['$1']));}}else{const _0x2dc4fa=0x0,_0xa2b547=this[_0xf27c7c(0x40f)](),_0x33c73b=_0x40c9ef[_0xf27c7c(0x256)],_0xd3f895=this[_0xf27c7c(0x30d)]();return new _0x33097a(_0x2dc4fa,_0xa2b547,_0x33c73b,_0xd3f895);}}return![];},Window_EquipItem[_0x26e348(0x462)]['nonRemovableEtypes']=function(){const _0x36003d=_0x26e348;return VisuMZ['ItemsEquipsCore'][_0x36003d(0x1fa)][_0x36003d(0x35e)][_0x36003d(0x39b)];},Window_EquipItem['prototype'][_0x26e348(0x1ca)]=function(_0x56346f){const _0x25adef=_0x26e348,_0xe3c9b7=this[_0x25adef(0x24c)](_0x56346f);if(_0xe3c9b7){if(_0x25adef(0x277)!==_0x25adef(0x216))Window_ItemList[_0x25adef(0x462)][_0x25adef(0x1ca)][_0x25adef(0x62d)](this,_0x56346f);else{const _0x140b9d=this[_0x25adef(0x24c)](_0x1f6d2d);if(!_0x140b9d||!this['isShowNew']())return;if(!_0x1bc82d[_0x25adef(0x2c5)](_0x140b9d))return;const _0x26233e=this['itemLineRect'](_0x56f52f),_0x38e23b=_0x26233e['x'],_0x14db00=_0x26233e['y']+(this[_0x25adef(0x541)]()-_0x115ad3[_0x25adef(0x4f2)])/0x2,_0x545c50=_0x16a6fb[_0x25adef(0x340)]['Settings']['New']['OffsetX'],_0x501bcb=_0x11f9a5[_0x25adef(0x340)][_0x25adef(0x1fa)][_0x25adef(0x4bb)][_0x25adef(0x446)];this[_0x25adef(0x59b)](_0x140b9d,_0x38e23b+_0x545c50,_0x14db00+_0x501bcb);}}else this['drawRemoveItem'](_0x56346f);},Window_EquipItem['prototype'][_0x26e348(0x27c)]=function(_0x49feb0){const _0x18d401=_0x26e348;this[_0x18d401(0x326)](this[_0x18d401(0x259)](null));const _0x2b8e3c=VisuMZ[_0x18d401(0x340)][_0x18d401(0x1fa)][_0x18d401(0x35e)],_0x3c4e15=this[_0x18d401(0x5b0)](_0x49feb0),_0x2fd8a2=_0x3c4e15['y']+(this[_0x18d401(0x541)]()-ImageManager[_0x18d401(0x4f2)])/0x2,_0x141d5f=ImageManager[_0x18d401(0x4f5)]+0x4,_0x4abdca=Math[_0x18d401(0x41b)](0x0,_0x3c4e15[_0x18d401(0x291)]-_0x141d5f);this['resetTextColor'](),this['drawIcon'](_0x2b8e3c[_0x18d401(0x1ce)],_0x3c4e15['x'],_0x2fd8a2),this['drawText'](_0x2b8e3c['RemoveEquipText'],_0x3c4e15['x']+_0x141d5f,_0x3c4e15['y'],_0x4abdca),this[_0x18d401(0x326)](!![]);},Window_EquipItem['prototype'][_0x26e348(0x383)]=function(){const _0x26f8cd=_0x26e348;Window_ItemList[_0x26f8cd(0x462)]['updateHelp'][_0x26f8cd(0x62d)](this);if(this[_0x26f8cd(0x501)]&&this[_0x26f8cd(0x41f)]&&this[_0x26f8cd(0x66d)]>=0x0){if(_0x26f8cd(0x205)===_0x26f8cd(0x510)){this[_0x26f8cd(0x237)]=!![];const _0x4abffd=_0x39e203[_0x26f8cd(0x340)]['Game_BattlerBase_param_artifact']['call'](this,_0x380012);return this[_0x26f8cd(0x237)]=_0x5e5328,_0x4abffd;}else{const _0x256886=JsonEx[_0x26f8cd(0x626)](this[_0x26f8cd(0x501)]);_0x256886['_tempActor']=!![],_0x256886[_0x26f8cd(0x3f9)](this[_0x26f8cd(0x66d)],this[_0x26f8cd(0x546)]()),this['_statusWindow'][_0x26f8cd(0x366)](_0x256886);}}},VisuMZ[_0x26e348(0x340)][_0x26e348(0x27e)]=Window_ShopCommand['prototype'][_0x26e348(0x1fb)],Window_ShopCommand[_0x26e348(0x462)][_0x26e348(0x1fb)]=function(_0x2e6d0a){const _0x5d779b=_0x26e348;VisuMZ[_0x5d779b(0x340)][_0x5d779b(0x27e)]['call'](this,_0x2e6d0a),this['createCommandNameWindow'](_0x2e6d0a);},Window_ShopCommand[_0x26e348(0x462)]['createCommandNameWindow']=function(_0x153fb9){const _0x110597=_0x26e348,_0x131cd2=new Rectangle(0x0,0x0,_0x153fb9[_0x110597(0x291)],_0x153fb9[_0x110597(0x38b)]);this['_commandNameWindow']=new Window_Base(_0x131cd2),this[_0x110597(0x3f6)][_0x110597(0x5c9)]=0x0,this[_0x110597(0x2e6)](this[_0x110597(0x3f6)]),this[_0x110597(0x20d)]();},Window_ShopCommand[_0x26e348(0x462)][_0x26e348(0x515)]=function(){const _0x38f91c=_0x26e348;Window_HorzCommand[_0x38f91c(0x462)][_0x38f91c(0x515)][_0x38f91c(0x62d)](this);if(this[_0x38f91c(0x3f6)])this[_0x38f91c(0x20d)]();},Window_ShopCommand[_0x26e348(0x462)][_0x26e348(0x20d)]=function(){const _0x42b7bf=_0x26e348,_0x4fab6c=this[_0x42b7bf(0x3f6)];_0x4fab6c['contents']['clear']();const _0x343c0e=this[_0x42b7bf(0x4eb)](this[_0x42b7bf(0x54f)]());if(_0x343c0e==='icon'){if(_0x42b7bf(0x389)===_0x42b7bf(0x49f)){const _0x2c6558=_0x4ca715[_0x42b7bf(0x340)][_0x42b7bf(0x1fa)]['EquipScene'];let _0x49e42f=_0x2c6558['BackRectColor']!==_0x5da36f?_0x2c6558[_0x42b7bf(0x262)]:0x13;return _0x1ae5a3[_0x42b7bf(0x301)](_0x49e42f);}else{const _0x3a4c7f=this['itemLineRect'](this[_0x42b7bf(0x54f)]());let _0x34d5e2=this[_0x42b7bf(0x386)](this[_0x42b7bf(0x54f)]());_0x34d5e2=_0x34d5e2[_0x42b7bf(0x26e)](/\\I\[(\d+)\]/gi,''),_0x4fab6c[_0x42b7bf(0x587)](),this['commandNameWindowDrawBackground'](_0x34d5e2,_0x3a4c7f),this[_0x42b7bf(0x5d4)](_0x34d5e2,_0x3a4c7f),this[_0x42b7bf(0x20f)](_0x34d5e2,_0x3a4c7f);}}},Window_ShopCommand['prototype']['commandNameWindowDrawBackground']=function(_0x135433,_0x3db67b){},Window_ShopCommand[_0x26e348(0x462)][_0x26e348(0x5d4)]=function(_0x10a128,_0x222b10){const _0x48e994=_0x26e348,_0x4deec7=this[_0x48e994(0x3f6)];_0x4deec7['drawText'](_0x10a128,0x0,_0x222b10['y'],_0x4deec7[_0x48e994(0x2b8)],'center');},Window_ShopCommand[_0x26e348(0x462)]['commandNameWindowCenter']=function(_0x1883c5,_0x486032){const _0x588567=_0x26e348,_0x5dadf1=this['_commandNameWindow'],_0x46890f=$gameSystem[_0x588567(0x24e)](),_0xa5061c=_0x486032['x']+Math[_0x588567(0x160)](_0x486032[_0x588567(0x291)]/0x2)+_0x46890f;_0x5dadf1['x']=_0x5dadf1['width']/-0x2+_0xa5061c,_0x5dadf1['y']=Math['floor'](_0x486032[_0x588567(0x38b)]/0x2);},Window_ShopCommand[_0x26e348(0x462)][_0x26e348(0x1ae)]=function(){const _0x168378=_0x26e348;return this[_0x168378(0x297)]?this[_0x168378(0x297)][_0x168378(0x571)]:0x3;},Window_ShopCommand[_0x26e348(0x462)][_0x26e348(0x3f0)]=function(){const _0x22ac56=_0x26e348;return VisuMZ[_0x22ac56(0x340)]['Settings']['ShopScene']['CmdHideDisabled'];},Window_ShopCommand[_0x26e348(0x462)][_0x26e348(0x245)]=function(){const _0x21142a=_0x26e348;this[_0x21142a(0x2ad)](),this[_0x21142a(0x630)](),this[_0x21142a(0x46b)]();},Window_ShopCommand[_0x26e348(0x462)][_0x26e348(0x3ef)]=function(){const _0x358952=_0x26e348;Window_HorzCommand[_0x358952(0x462)][_0x358952(0x3ef)][_0x358952(0x62d)](this),this[_0x358952(0x385)]();},Window_ShopCommand['prototype']['addBuyCommand']=function(){const _0x4f74f9=_0x26e348,_0x14726a=this['commandStyle'](),_0x25a6ea=VisuMZ[_0x4f74f9(0x340)][_0x4f74f9(0x1fa)][_0x4f74f9(0x45d)][_0x4f74f9(0x20b)],_0xf0af4c=_0x14726a==='text'?TextManager[_0x4f74f9(0x471)]:_0x4f74f9(0x265)[_0x4f74f9(0x43f)](_0x25a6ea,TextManager[_0x4f74f9(0x471)]),_0x13c624=this[_0x4f74f9(0x3db)]();if(this[_0x4f74f9(0x3f0)]()&&!_0x13c624)return;this['addCommand'](_0xf0af4c,_0x4f74f9(0x471),_0x13c624);},Window_ShopCommand[_0x26e348(0x462)]['isBuyCommandEnabled']=function(){const _0x3de1bc=_0x26e348;if(SceneManager[_0x3de1bc(0x2e5)][_0x3de1bc(0x198)]===Scene_Shop){if(_0x3de1bc(0x5ae)===_0x3de1bc(0x4ef)){const _0x4a2949=_0x3de1bc(0x5fc);if(this[_0x3de1bc(0x4cf)]['gainTP']<=0x0&&!this[_0x3de1bc(0x529)][_0x4a2949])return![];const _0x24dced=this['getItemEffectsTpRecoveryLabel']();this[_0x3de1bc(0x349)](_0x24dced,_0x265bd8,_0x4b3d61,_0x553562,!![]);const _0x56ee7c=this['getItemEffectsTpRecoveryText']();return this[_0x3de1bc(0x303)](_0xd00d56[_0x3de1bc(0x5a5)]()),this[_0x3de1bc(0x349)](_0x56ee7c,_0x569f7c,_0x28de36,_0x3ddd48,![],'right'),this['drawItemDarkRect'](_0xffcc99,_0x17406b,_0x5e7d65),this[_0x3de1bc(0x587)](),!![];}else return SceneManager[_0x3de1bc(0x2e5)][_0x3de1bc(0x3d6)]>0x0;}else return _0x3de1bc(0x435)===_0x3de1bc(0x435)?!![]:this[_0x3de1bc(0x2b4)]();},Window_ShopCommand[_0x26e348(0x462)][_0x26e348(0x630)]=function(){const _0x4d3d6c=_0x26e348,_0x33cb5c=this['commandStyle'](),_0x146586=VisuMZ['ItemsEquipsCore']['Settings'][_0x4d3d6c(0x45d)]['CmdIconSell'],_0x3e5621=_0x33cb5c===_0x4d3d6c(0x4af)?TextManager['sell']:_0x4d3d6c(0x265)[_0x4d3d6c(0x43f)](_0x146586,TextManager['sell']),_0x4084ce=this[_0x4d3d6c(0x1f1)]();if(this['hideDisabledCommands']()&&!_0x4084ce)return;this[_0x4d3d6c(0x670)](_0x3e5621,_0x4d3d6c(0x49d),_0x4084ce);},Window_ShopCommand['prototype'][_0x26e348(0x1f1)]=function(){const _0x4c994a=_0x26e348;return!this[_0x4c994a(0x1eb)];},Window_ShopCommand[_0x26e348(0x462)]['addCancelCommand']=function(){const _0x5cca74=_0x26e348,_0xf6ebfc=this[_0x5cca74(0x639)](),_0x45c8c8=VisuMZ[_0x5cca74(0x340)]['Settings'][_0x5cca74(0x45d)][_0x5cca74(0x43c)],_0x2d1ccf=VisuMZ[_0x5cca74(0x340)][_0x5cca74(0x1fa)][_0x5cca74(0x45d)]['CmdCancelRename'],_0x2399e0=_0xf6ebfc===_0x5cca74(0x4af)?_0x2d1ccf:'\x5cI[%1]%2'[_0x5cca74(0x43f)](_0x45c8c8,_0x2d1ccf);this[_0x5cca74(0x670)](_0x2399e0,_0x5cca74(0x328));},Window_ShopCommand[_0x26e348(0x462)]['itemTextAlign']=function(){const _0x11a058=_0x26e348;return VisuMZ[_0x11a058(0x340)][_0x11a058(0x1fa)][_0x11a058(0x45d)]['CmdTextAlign'];},Window_ShopCommand['prototype'][_0x26e348(0x1ca)]=function(_0x429a71){const _0x332b18=_0x26e348,_0x1865f7=this['commandStyleCheck'](_0x429a71);if(_0x1865f7===_0x332b18(0x381))this[_0x332b18(0x65c)](_0x429a71);else{if(_0x1865f7===_0x332b18(0x213)){if(_0x332b18(0x458)===_0x332b18(0x458))this[_0x332b18(0x15a)](_0x429a71);else return;}else Window_HorzCommand['prototype'][_0x332b18(0x1ca)][_0x332b18(0x62d)](this,_0x429a71);}},Window_ShopCommand['prototype'][_0x26e348(0x639)]=function(){const _0x1dc577=_0x26e348;return VisuMZ[_0x1dc577(0x340)]['Settings'][_0x1dc577(0x45d)][_0x1dc577(0x5a2)];},Window_ShopCommand['prototype'][_0x26e348(0x4eb)]=function(_0x1635b1){const _0x172045=_0x26e348;if(_0x1635b1<0x0)return'text';const _0x1e5c50=this[_0x172045(0x639)]();if(_0x1e5c50!==_0x172045(0x5ad))return _0x1e5c50;else{if(this[_0x172045(0x478)]()>0x0){const _0x48f82e=this[_0x172045(0x386)](_0x1635b1);if(_0x48f82e[_0x172045(0x28b)](/\\I\[(\d+)\]/i)){if(_0x172045(0x211)===_0x172045(0x211)){const _0x55e9b8=this['itemLineRect'](_0x1635b1),_0x567b26=this['textSizeEx'](_0x48f82e)[_0x172045(0x291)];return _0x567b26<=_0x55e9b8['width']?_0x172045(0x381):'icon';}else return _0x1fdd38['ItemsEquipsCore']['Window_ItemList_maxCols'][_0x172045(0x62d)](this);}}}return'text';},Window_ShopCommand[_0x26e348(0x462)][_0x26e348(0x65c)]=function(_0x50e34a){const _0x240205=_0x26e348,_0x586c25=this['itemLineRect'](_0x50e34a),_0x410252=this['commandName'](_0x50e34a),_0x1cd8fd=this[_0x240205(0x1e9)](_0x410252)[_0x240205(0x291)];this['changePaintOpacity'](this['isCommandEnabled'](_0x50e34a));const _0x1f4106=this['itemTextAlign']();if(_0x1f4106==='right')_0x240205(0x250)!==_0x240205(0x59d)?this[_0x240205(0x2a2)](_0x410252,_0x586c25['x']+_0x586c25[_0x240205(0x291)]-_0x1cd8fd,_0x586c25['y'],_0x1cd8fd):(_0x1dec4a[_0x240205(0x340)][_0x240205(0x1a1)](_0x5b4bed,_0x432aca),_0x44370e['ItemsEquipsCore']['Parse_Notetags_Prices'](_0x5269a4,_0x28b25c),_0x2dc08f[_0x240205(0x340)][_0x240205(0x5f3)](_0x34839a,_0x4c9345),_0xba4cf6[_0x240205(0x340)][_0x240205(0x27b)](_0x16f32c,_0x7703e4),_0x2498fc['ItemsEquipsCore'][_0x240205(0x482)](_0x34d000,_0x403649));else{if(_0x1f4106==='center'){if(_0x240205(0x44d)===_0x240205(0x44d)){const _0x1a4d83=_0x586c25['x']+Math['floor']((_0x586c25[_0x240205(0x291)]-_0x1cd8fd)/0x2);this[_0x240205(0x2a2)](_0x410252,_0x1a4d83,_0x586c25['y'],_0x1cd8fd);}else!this[_0x240205(0x3b0)]()&&_0x1b2c92[_0x240205(0x462)]['processCursorMoveModernControls'][_0x240205(0x62d)](this);}else _0x240205(0x367)===_0x240205(0x367)?this[_0x240205(0x2a2)](_0x410252,_0x586c25['x'],_0x586c25['y'],_0x1cd8fd):(_0x2b813b['prototype']['resetFontSettings'][_0x240205(0x62d)](this),this[_0x240205(0x439)]['fontSize']=this['_resetFontSize']||this['contents'][_0x240205(0x271)],this[_0x240205(0x439)]['textColor']=this[_0x240205(0x163)]||this[_0x240205(0x439)][_0x240205(0x36c)]);}},Window_ShopCommand[_0x26e348(0x462)]['drawItemStyleIcon']=function(_0xd843b4){const _0x1b81ad=_0x26e348;this['commandName'](_0xd843b4)[_0x1b81ad(0x28b)](/\\I\[(\d+)\]/i);const _0x2929b1=Number(RegExp['$1'])||0x0,_0x324e2d=this[_0x1b81ad(0x5b0)](_0xd843b4),_0x2a86f3=_0x324e2d['x']+Math[_0x1b81ad(0x160)]((_0x324e2d[_0x1b81ad(0x291)]-ImageManager[_0x1b81ad(0x4f5)])/0x2),_0x1626c4=_0x324e2d['y']+(_0x324e2d[_0x1b81ad(0x38b)]-ImageManager[_0x1b81ad(0x4f2)])/0x2;this[_0x1b81ad(0x33f)](_0x2929b1,_0x2a86f3,_0x1626c4);},VisuMZ[_0x26e348(0x340)][_0x26e348(0x5cf)]=Window_ShopBuy[_0x26e348(0x462)][_0x26e348(0x3ef)],Window_ShopBuy[_0x26e348(0x462)][_0x26e348(0x3ef)]=function(){const _0x43335c=_0x26e348;this[_0x43335c(0x516)](),VisuMZ[_0x43335c(0x340)][_0x43335c(0x5cf)][_0x43335c(0x62d)](this);},Window_ShopBuy[_0x26e348(0x462)][_0x26e348(0x516)]=function(){const _0x4920c3=_0x26e348;SceneManager[_0x4920c3(0x2e5)][_0x4920c3(0x198)]===Scene_Shop&&(this[_0x4920c3(0x25b)]=SceneManager[_0x4920c3(0x2e5)]['money']());},VisuMZ[_0x26e348(0x340)]['Window_ShopBuy_price']=Window_ShopBuy['prototype']['price'],Window_ShopBuy['prototype'][_0x26e348(0x2d5)]=function(_0x566ca4){const _0x3e8e36=_0x26e348;if(!_0x566ca4)return 0x0;let _0x2fd967=VisuMZ['ItemsEquipsCore']['Window_ShopBuy_price'][_0x3e8e36(0x62d)](this,_0x566ca4);return Math[_0x3e8e36(0x41b)](0x0,this[_0x3e8e36(0x585)](_0x566ca4,_0x2fd967));},Window_ShopBuy[_0x26e348(0x462)]['modifiedBuyPriceItemsEquipsCore']=function(_0x38a6f5,_0x40391f){const _0x1da8e9=_0x26e348,_0xcf3e3f=_0x38a6f5[_0x1da8e9(0x545)];if(_0xcf3e3f[_0x1da8e9(0x28b)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x1976d9=String(RegExp['$1']);window['price']=_0x40391f,window['item']=_0x38a6f5;try{if(_0x1da8e9(0x637)===_0x1da8e9(0x637))eval(_0x1976d9);else return _0x28aa12[_0x1da8e9(0x340)][_0x1da8e9(0x54a)][_0x1da8e9(0x62d)](this,_0x413713);}catch(_0x4e699b){if($gameTemp['isPlaytest']())console[_0x1da8e9(0x5ab)](_0x4e699b);}_0x40391f=window[_0x1da8e9(0x2d5)],window[_0x1da8e9(0x2d5)]=undefined,window[_0x1da8e9(0x546)]=undefined;}_0x40391f=VisuMZ[_0x1da8e9(0x340)][_0x1da8e9(0x1fa)][_0x1da8e9(0x45d)][_0x1da8e9(0x226)]['call'](this,_0x38a6f5,_0x40391f);if(isNaN(_0x40391f))_0x40391f=0x0;return Math[_0x1da8e9(0x160)](_0x40391f);},VisuMZ['ItemsEquipsCore'][_0x26e348(0x1a2)]=Window_ShopBuy[_0x26e348(0x462)][_0x26e348(0x1c4)],Window_ShopBuy[_0x26e348(0x462)][_0x26e348(0x1c4)]=function(_0x3ffcdb){const _0x3c8e06=_0x26e348,_0x17e89=VisuMZ[_0x3c8e06(0x340)][_0x3c8e06(0x1a2)][_0x3c8e06(0x62d)](this,_0x3ffcdb);return _0x17e89&&!this['meetsShopListingConditions'](_0x17e89)?'tNuQW'===_0x3c8e06(0x4be)?null:_0xcfd2e4[_0x3c8e06(0x380)][_0x3c8e06(0x43f)](_0x3dd867(_0x4deb70['$1'])):_0x17e89;},VisuMZ[_0x26e348(0x340)][_0x26e348(0x2f5)]={'ShowAllSwitches':/<SHOW SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i,'ShowAnySwitches':/<SHOW SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,'HideAllSwitches':/<HIDE SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i,'HideAnySwitches':/<HIDE SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,'BuyTurnSwitchOn':/<BUY TURN ON SWITCH(?:|ES):[ ](.*)>/i,'BuyTurnSwitchOff':/<BUY TURN OFF SWITCH(?:|ES):[ ](.*)>/i,'SellTurnSwitchOn':/<SELL TURN ON SWITCH(?:|ES):[ ](.*)>/i,'SellTurnSwitchOff':/<SELL TURN OFF SWITCH(?:|ES):[ ](.*)>/i},Window_ShopBuy[_0x26e348(0x462)][_0x26e348(0x4b2)]=function(_0x3feacc){const _0x2ed96c=_0x26e348;if(!_0x3feacc)return![];const _0x1b0a0e=VisuMZ[_0x2ed96c(0x340)]['ShopListingRegExp'],_0x5c121b=_0x3feacc?_0x3feacc['note']||'':'';if(_0x5c121b[_0x2ed96c(0x28b)](_0x1b0a0e['ShowAllSwitches'])){if(_0x2ed96c(0x4da)===_0x2ed96c(0x3c3)){if(!_0x364e20[_0x2ed96c(0x4b9)](_0x3dcd86))return![];}else{const _0x5f27da=String(RegExp['$1'])[_0x2ed96c(0x1b6)](',')[_0x2ed96c(0x499)](_0xc4ff72=>Number(_0xc4ff72));if(_0x5f27da[_0x2ed96c(0x5d9)](_0x3f79a3=>!$gameSwitches[_0x2ed96c(0x4b9)](_0x3f79a3)))return![];}}if(_0x5c121b[_0x2ed96c(0x28b)](_0x1b0a0e['ShowAnySwitches'])){const _0x48192a=String(RegExp['$1'])[_0x2ed96c(0x1b6)](',')['map'](_0x59a524=>Number(_0x59a524));if(_0x48192a[_0x2ed96c(0x67b)](_0x5d2164=>!$gameSwitches['value'](_0x5d2164)))return![];}if(_0x5c121b[_0x2ed96c(0x28b)](_0x1b0a0e[_0x2ed96c(0x2d9)])){if(_0x2ed96c(0x5d1)===_0x2ed96c(0x17c))this['onTouchSelectModernControls'](![]);else{const _0x48478e=String(RegExp['$1'])['split'](',')[_0x2ed96c(0x499)](_0x361647=>Number(_0x361647));if(_0x48478e[_0x2ed96c(0x67b)](_0x3127a5=>$gameSwitches[_0x2ed96c(0x4b9)](_0x3127a5)))return![];}}if(_0x5c121b[_0x2ed96c(0x28b)](_0x1b0a0e['HideAnySwitches'])){const _0x341aee=String(RegExp['$1'])[_0x2ed96c(0x1b6)](',')['map'](_0x50c77f=>Number(_0x50c77f));if(_0x341aee[_0x2ed96c(0x5d9)](_0x3bc88b=>$gameSwitches[_0x2ed96c(0x4b9)](_0x3bc88b)))return![];}return!![];},Window_ShopBuy[_0x26e348(0x462)][_0x26e348(0x1ca)]=function(_0xab5d45){const _0x2e9bb1=_0x26e348;this[_0x2e9bb1(0x587)]();const _0x5f0c6d=this[_0x2e9bb1(0x24c)](_0xab5d45),_0x45cf49=this['itemLineRect'](_0xab5d45),_0x3d4b28=_0x45cf49[_0x2e9bb1(0x291)];this[_0x2e9bb1(0x326)](this['isEnabled'](_0x5f0c6d)),this[_0x2e9bb1(0x16f)](_0x5f0c6d,_0x45cf49['x'],_0x45cf49['y'],_0x3d4b28),this['drawItemCost'](_0x5f0c6d,_0x45cf49),this[_0x2e9bb1(0x326)](!![]);},Window_ShopBuy['prototype'][_0x26e348(0x590)]=function(_0x2eec6d,_0x194980){const _0x4b0823=_0x26e348,_0x82b24f=this[_0x4b0823(0x2d5)](_0x2eec6d);this[_0x4b0823(0x184)](_0x82b24f,TextManager['currencyUnit'],_0x194980['x'],_0x194980['y'],_0x194980[_0x4b0823(0x291)]);},Window_ShopSell[_0x26e348(0x462)][_0x26e348(0x1ae)]=function(){const _0x471ff3=_0x26e348;return SceneManager['_scene'][_0x471ff3(0x345)]()?0x1:0x2;},VisuMZ[_0x26e348(0x340)][_0x26e348(0x60d)]=Window_ShopSell[_0x26e348(0x462)][_0x26e348(0x259)],Window_ShopSell[_0x26e348(0x462)][_0x26e348(0x259)]=function(_0x5aae1c){const _0x152d12=_0x26e348;if(!_0x5aae1c)return![];const _0x4cbfa1=_0x5aae1c[_0x152d12(0x545)];if(_0x4cbfa1['match'](/<CANNOT SELL>/i))return![];if(_0x4cbfa1[_0x152d12(0x28b)](/<CAN SELL>/i))return!![];if(_0x4cbfa1['match'](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('pimef'===_0x152d12(0x166)){const _0xae5f1d=JSON['parse']('['+RegExp['$1'][_0x152d12(0x28b)](/\d+/g)+']');for(const _0xd64a83 of _0xae5f1d){if(_0x152d12(0x1cc)===_0x152d12(0x543))return _0x475be8[_0x152d12(0x4a6)];else{if(!$gameSwitches['value'](_0xd64a83))return![];}}}else{if(this[_0x152d12(0x54f)]()!==0x0)return![];const _0x5a418a=_0x24f312['ItemsEquipsCore'][_0x152d12(0x1fa)]['EquipScene'];if(!_0x5a418a[_0x152d12(0x346)]&&!_0x5a418a['CommandAddClear'])return![];return _0x576e78['isTriggered']('up');}}if(_0x4cbfa1[_0x152d12(0x28b)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x422c6a=JSON[_0x152d12(0x508)]('['+RegExp['$1'][_0x152d12(0x28b)](/\d+/g)+']');for(const _0x4944bc of _0x422c6a){if(!$gameSwitches[_0x152d12(0x4b9)](_0x4944bc))return![];}}if(_0x4cbfa1[_0x152d12(0x28b)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x17a6fe=JSON[_0x152d12(0x508)]('['+RegExp['$1'][_0x152d12(0x28b)](/\d+/g)+']');for(const _0x1eaecb of _0x17a6fe){if($gameSwitches['value'](_0x1eaecb))return![];}}return VisuMZ[_0x152d12(0x340)][_0x152d12(0x60d)][_0x152d12(0x62d)](this,_0x5aae1c);},Window_ShopStatus[_0x26e348(0x22e)]=VisuMZ[_0x26e348(0x340)][_0x26e348(0x1fa)]['StatusWindow'][_0x26e348(0x3a6)]??0xf0,VisuMZ[_0x26e348(0x340)][_0x26e348(0x513)]=Window_ShopStatus['prototype'][_0x26e348(0x4d9)],Window_ShopStatus[_0x26e348(0x462)]['setItem']=function(_0xe9b14f){const _0x3906c5=_0x26e348;_0xe9b14f=DataManager[_0x3906c5(0x570)](_0xe9b14f),DataManager[_0x3906c5(0x188)](_0xe9b14f)||DataManager[_0x3906c5(0x33c)](_0xe9b14f)?this[_0x3906c5(0x251)](_0xe9b14f):VisuMZ[_0x3906c5(0x340)]['Window_ShopStatus_setItem'][_0x3906c5(0x62d)](this,_0xe9b14f);},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x251)]=function(_0x181063){const _0x4df654=_0x26e348;this['_item']=_0x181063;const _0x572a0c=Window_ShopStatus[_0x4df654(0x22e)];setTimeout(this['refreshDelay'][_0x4df654(0x60b)](this,_0x181063),_0x572a0c);},Window_ShopStatus[_0x26e348(0x462)]['refreshDelay']=function(_0x47f7b2){const _0xec6e2e=_0x26e348;this[_0xec6e2e(0x3a3)]===_0x47f7b2&&this['refresh']();},Window_ShopStatus['prototype'][_0x26e348(0x354)]=function(){return![];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x534)]=function(){const _0x29ba56=_0x26e348;Window_StatusBase[_0x29ba56(0x462)][_0x29ba56(0x534)]['call'](this);for(const _0x5e04b0 of $gameParty[_0x29ba56(0x2ee)]()){ImageManager[_0x29ba56(0x678)](_0x5e04b0['characterName']());}},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x1af)]=function(){const _0x3ca816=_0x26e348;return VisuMZ[_0x3ca816(0x340)]['Settings']['StatusWindow'][_0x3ca816(0x65b)];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x3ef)]=function(){const _0x29c2b3=_0x26e348;this[_0x29c2b3(0x439)]['clear'](),this[_0x29c2b3(0x629)][_0x29c2b3(0x233)](),this['_item']&&(this['resetFontSettings'](),this[_0x29c2b3(0x326)](!![]),this[_0x29c2b3(0x490)](),this[_0x29c2b3(0x524)]()?this[_0x29c2b3(0x4f1)]():this[_0x29c2b3(0x38e)](),this['drawCustomShopGraphic']());},Window_ShopStatus[_0x26e348(0x462)]['drawPossession']=function(_0x24dea3,_0x40145b){const _0x2be9bd=_0x26e348;if(!this[_0x2be9bd(0x524)]()&&!DataManager[_0x2be9bd(0x2bd)](this[_0x2be9bd(0x3a3)]))return;const _0xe44acb=this[_0x2be9bd(0x2b8)]-this[_0x2be9bd(0x4a7)]()-_0x24dea3,_0x5647ac=this[_0x2be9bd(0x50b)](_0x2be9bd(0x341));this['changeTextColor'](ColorManager[_0x2be9bd(0x1c8)]()),this[_0x2be9bd(0x1e8)](TextManager[_0x2be9bd(0x269)],_0x24dea3+this[_0x2be9bd(0x4a7)](),_0x40145b,_0xe44acb-_0x5647ac),this[_0x2be9bd(0x1d0)](),this[_0x2be9bd(0x1ab)](this[_0x2be9bd(0x3a3)],_0x24dea3,_0x40145b,_0xe44acb);},Window_ShopStatus['prototype'][_0x26e348(0x608)]=function(_0x2f3af7,_0x2a6b0e,_0x1cb805,_0x14638f,_0xc5015d){const _0x2254a3=_0x26e348;if(VisuMZ[_0x2254a3(0x340)][_0x2254a3(0x1fa)][_0x2254a3(0x1da)][_0x2254a3(0x1de)]===![])return;_0xc5015d=Math[_0x2254a3(0x41b)](_0xc5015d||0x1,0x1);while(_0xc5015d--){_0x14638f=_0x14638f||this[_0x2254a3(0x541)](),this[_0x2254a3(0x629)][_0x2254a3(0x688)]=0xa0;const _0x5d0956=ColorManager['getItemsEquipsCoreBackColor1']();this[_0x2254a3(0x629)][_0x2254a3(0x418)](_0x2f3af7+0x1,_0x2a6b0e+0x1,_0x1cb805-0x2,_0x14638f-0x2,_0x5d0956),this['contentsBack'][_0x2254a3(0x688)]=0xff;}},ColorManager[_0x26e348(0x283)]=function(){const _0x3fd7e8=_0x26e348,_0x1ab60b=VisuMZ[_0x3fd7e8(0x340)][_0x3fd7e8(0x1fa)][_0x3fd7e8(0x1da)];let _0x4cd493=_0x1ab60b['BackRectColor']!==undefined?_0x1ab60b[_0x3fd7e8(0x262)]:0x13;return ColorManager[_0x3fd7e8(0x301)](_0x4cd493);},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x4f1)]=function(){const _0x3fb396=_0x26e348;this[_0x3fb396(0x5b2)]=null;if(VisuMZ[_0x3fb396(0x340)][_0x3fb396(0x1fa)][_0x3fb396(0x1da)][_0x3fb396(0x21f)]){if(_0x3fb396(0x486)===_0x3fb396(0x486)){VisuMZ[_0x3fb396(0x340)]['Settings'][_0x3fb396(0x1da)][_0x3fb396(0x21f)]['call'](this);return;}else this['artifactIDs'][_0x3fb396(0x369)][_0x3fb396(0x270)](_0x371a94['id']);}const _0x42f0dd=this[_0x3fb396(0x541)](),_0x31c916=this[_0x3fb396(0x353)]()+0x8;let _0x574ee4=0x0,_0x1c8892=0x0,_0x3cf585=this['innerWidth'],_0x53eab4=this[_0x3fb396(0x469)],_0x318027=Math[_0x3fb396(0x160)](_0x3cf585/0x2),_0x21aed0=_0x574ee4+_0x3cf585-_0x318027;this[_0x3fb396(0x16f)](this['_item'],_0x574ee4+this['itemPadding'](),_0x1c8892,_0x3cf585-this[_0x3fb396(0x4a7)]()*0x2),this[_0x3fb396(0x608)](_0x574ee4,_0x1c8892,_0x3cf585),_0x1c8892+=_0x42f0dd;if(this[_0x3fb396(0x5b3)](_0x574ee4,_0x1c8892,_0x318027))_0x1c8892+=0x0;if(this[_0x3fb396(0x28f)](_0x21aed0,_0x1c8892,_0x318027))_0x1c8892+=_0x42f0dd;const _0x2ef6cf=this['actorParams'](),_0x25c7b8=_0x1c8892;_0x1c8892=_0x53eab4-_0x2ef6cf[_0x3fb396(0x571)]*_0x31c916-0x4;let _0x169efd=_0x574ee4,_0x4fac1a=0x0,_0x1dd453=_0x1c8892;for(const _0x531abf of _0x2ef6cf){_0x3fb396(0x41d)!=='vUmiT'?(_0x4fac1a=Math['max'](this[_0x3fb396(0x66b)](_0x531abf,_0x574ee4+0x4,_0x1c8892+0x4,_0x3cf585),_0x4fac1a),_0x1c8892+=_0x31c916):(_0x1ad521===this[_0x3fb396(0x54f)]()&&(this[_0x3fb396(0x631)]=!![]),this[_0x3fb396(0x305)](),this[_0x3fb396(0x4a5)](_0x3968b0));}const _0x554b13=$gameParty['maxBattleMembers'](),_0x1cda6a=Math[_0x3fb396(0x160)]((_0x3cf585-_0x4fac1a)/_0x554b13);_0x4fac1a=_0x3cf585-_0x1cda6a*_0x554b13;for(const _0x5a0843 of $gameParty[_0x3fb396(0x54d)]()){if(_0x3fb396(0x42b)==='xNYri'){const _0x104e92=$gameParty[_0x3fb396(0x54d)]()[_0x3fb396(0x43b)](_0x5a0843),_0x347264=_0x169efd+_0x4fac1a+_0x104e92*_0x1cda6a;this['changePaintOpacity'](_0x5a0843[_0x3fb396(0x274)](this[_0x3fb396(0x3a3)])),this[_0x3fb396(0x339)](_0x5a0843,_0x347264+_0x1cda6a/0x2,_0x1dd453);let _0x1d598b=_0x1dd453;for(const _0x231b60 of _0x2ef6cf){if(_0x3fb396(0x447)===_0x3fb396(0x447)){const _0xa3bf31=_0x1d598b-(_0x42f0dd-_0x31c916)/0x2;this[_0x3fb396(0x19f)](_0x5a0843,_0x231b60,_0x347264,_0xa3bf31,_0x1cda6a),_0x1d598b+=_0x31c916;}else _0x5f223d[_0x3fb396(0x340)][_0x3fb396(0x426)]['call'](this,_0x29edf0),this[_0x3fb396(0x4a2)](_0x499530);}}else{const _0x18908d=/^\d+$/[_0x3fb396(0x45b)](_0x284370);_0x18908d?_0x46af00[_0x3fb396(0x270)](_0x4926a7(_0x2d5ab9)):_0x24944e[_0x3fb396(0x270)](_0x4ce709[_0x3fb396(0x4ed)](_0xa19cda));}}this[_0x3fb396(0x608)](_0x169efd,_0x25c7b8,_0x4fac1a,_0x1dd453-_0x25c7b8);for(let _0x3ac36c=0x0;_0x3ac36c<_0x554b13;_0x3ac36c++){const _0xc8cace=_0x169efd+_0x4fac1a+_0x3ac36c*_0x1cda6a;this[_0x3fb396(0x608)](_0xc8cace,_0x25c7b8,_0x1cda6a,_0x1dd453-_0x25c7b8);}for(const _0x58e62a of _0x2ef6cf){if('XmSdN'!==_0x3fb396(0x1cb))_0x4f4cfe=_0x3fb396(0x5c4)['format'](_0x112468['id']);else{this[_0x3fb396(0x608)](_0x169efd,_0x1dd453,_0x4fac1a,_0x31c916);for(let _0x1b91b0=0x0;_0x1b91b0<_0x554b13;_0x1b91b0++){if(_0x3fb396(0x47e)!==_0x3fb396(0x47e))return _0x14c1d0[_0x3fb396(0x4a6)];else{const _0x5970f4=_0x169efd+_0x4fac1a+_0x1b91b0*_0x1cda6a;this[_0x3fb396(0x608)](_0x5970f4,_0x1dd453,_0x1cda6a,_0x31c916);}}_0x1dd453+=_0x31c916;}}},Window_ShopStatus['prototype']['drawItemEquipType']=function(_0x1f96c2,_0x5c72ed,_0x26580e){const _0x4eee68=_0x26e348;if(!this[_0x4eee68(0x524)]())return![];const _0x3774df=$dataSystem[_0x4eee68(0x429)][this[_0x4eee68(0x3a3)][_0x4eee68(0x263)]];return this[_0x4eee68(0x349)](_0x3774df,_0x1f96c2,_0x5c72ed,_0x26580e,!![]),this[_0x4eee68(0x608)](_0x1f96c2,_0x5c72ed,_0x26580e),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x5d3)]=function(){const _0x3ff877=_0x26e348,_0x34a30b=VisuMZ['ItemsEquipsCore']['Settings']['ItemScene'][_0x3ff877(0x4e8)];return _0x34a30b['format']($gameParty[_0x3ff877(0x37b)](this['_item']));},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x597)]=function(){const _0x200871=_0x26e348;let _0x4628d5=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];return Imported[_0x200871(0x454)]&&(_0x4628d5=VisuMZ[_0x200871(0x38f)][_0x200871(0x1fa)]['Param'][_0x200871(0x280)]),_0x4628d5=_0x4628d5[_0x200871(0x499)](_0x4e65e0=>typeof _0x4e65e0===_0x200871(0x47f)?_0x4e65e0:_0x4e65e0[_0x200871(0x63a)]()[_0x200871(0x3cc)]()),_0x4628d5;},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x4dd)]=function(){const _0x4be421=_0x26e348;return VisuMZ[_0x4be421(0x340)][_0x4be421(0x1fa)][_0x4be421(0x1da)][_0x4be421(0x4f9)];},Window_ShopStatus[_0x26e348(0x462)]['drawParamName']=function(_0x33d861,_0x5921d4,_0x20968f,_0xea47e7){const _0x43cc23=_0x26e348;this[_0x43cc23(0x587)](),this[_0x43cc23(0x439)][_0x43cc23(0x271)]=this[_0x43cc23(0x4dd)]();let _0x430f5d=this['textWidth'](TextManager['param'](_0x33d861))+0x4+_0x5921d4;if(Imported[_0x43cc23(0x454)]){this['drawParamText'](_0x5921d4,_0x20968f,_0xea47e7,_0x33d861,!![]);if(VisuMZ[_0x43cc23(0x38f)][_0x43cc23(0x1fa)][_0x43cc23(0x48e)][_0x43cc23(0x1b4)]){if('HKKXb'!=='wnHNe')_0x430f5d+=ImageManager[_0x43cc23(0x4f5)]+0x4;else return _0x6aa48e[_0x43cc23(0x462)][_0x43cc23(0x38d)]();}}else _0x43cc23(0x5bd)!==_0x43cc23(0x334)?(this[_0x43cc23(0x303)](ColorManager[_0x43cc23(0x1c8)]()),this['drawText'](TextManager[_0x43cc23(0x285)](_0x33d861),_0x5921d4,_0x20968f,_0xea47e7)):this[_0x43cc23(0x40d)]();return this['resetFontSettings'](),_0x430f5d;},Window_ShopStatus['prototype'][_0x26e348(0x19f)]=function(_0x1c6574,_0x554e5a,_0x31d4be,_0x35acc1,_0x494490){const _0x4530f3=_0x26e348;_0x31d4be+=this['itemPadding'](),_0x494490-=this[_0x4530f3(0x4a7)]()*0x2;const _0x166819=VisuMZ[_0x4530f3(0x340)][_0x4530f3(0x1fa)][_0x4530f3(0x1da)];this[_0x4530f3(0x439)]['fontSize']=_0x166819[_0x4530f3(0x4f9)],this['changePaintOpacity'](_0x1c6574[_0x4530f3(0x274)](this['_item']));if(_0x1c6574[_0x4530f3(0x36a)](this[_0x4530f3(0x3a3)])&&!_0x1c6574[_0x4530f3(0x63f)](this[_0x4530f3(0x3a3)])){if(_0x4530f3(0x425)!=='IjSmz'){const _0x131f90=_0x1ffc50['parse']('['+_0x68d8fa['$1'][_0x4530f3(0x28b)](/\d+/g)+']');for(const _0x346b2a of _0x131f90){if(!_0x430ffa[_0x4530f3(0x4b9)](_0x346b2a))return![];}return!![];}else{const _0x204db9=_0x166819[_0x4530f3(0x266)];this[_0x4530f3(0x1e8)](_0x204db9,_0x31d4be,_0x35acc1,_0x494490,_0x4530f3(0x56f));}}else{if(_0x1c6574[_0x4530f3(0x274)](this['_item'])){const _0x32c72c=this['createTempActorEquips'](_0x1c6574);let _0x40c648=0x0,_0x215303=0x0,_0x92b782=0x0;if(Imported[_0x4530f3(0x454)])_0x40c648=_0x32c72c[_0x4530f3(0x234)](_0x554e5a),_0x215303=_0x40c648-_0x1c6574['paramValueByName'](_0x554e5a),this['changeTextColor'](ColorManager['paramchangeTextColor'](_0x215303)),_0x92b782=(_0x215303>=0x0?'+':'')+VisuMZ[_0x4530f3(0x5aa)](_0x215303,0x0,_0x554e5a);else{if(_0x4530f3(0x2df)===_0x4530f3(0x448))return _0x3b5d7a['ItemsEquipsCore'][_0x4530f3(0x1fa)][_0x4530f3(0x35e)][_0x4530f3(0x396)];else _0x40c648=_0x32c72c[_0x4530f3(0x285)](_0x554e5a),_0x215303=_0x40c648-_0x1c6574[_0x4530f3(0x285)](_0x554e5a),this['changeTextColor'](ColorManager[_0x4530f3(0x2fa)](_0x215303)),_0x92b782=(_0x215303>=0x0?'+':'')+_0x215303;}_0x92b782==='+0'&&(_0x92b782=_0x166819['NoChangeMarker']),this[_0x4530f3(0x1e8)](_0x92b782,_0x31d4be,_0x35acc1,_0x494490,_0x4530f3(0x56f));}else{const _0x281ec1=_0x166819[_0x4530f3(0x1b1)];this[_0x4530f3(0x1e8)](_0x281ec1,_0x31d4be,_0x35acc1,_0x494490,_0x4530f3(0x56f));}}this[_0x4530f3(0x587)](),this[_0x4530f3(0x326)](!![]);},Window_ShopStatus[_0x26e348(0x462)]['createTempActorEquips']=function(_0x1e41f1){const _0x389417=_0x26e348;if(this['needsNewTempActor'](_0x1e41f1)){const _0x57238c=JsonEx['makeDeepCopy'](_0x1e41f1);_0x57238c[_0x389417(0x5b2)]=!![];const _0x29e4c9=_0x57238c[_0x389417(0x310)](this[_0x389417(0x3a3)]);_0x29e4c9>=0x0&&_0x57238c[_0x389417(0x3f9)](_0x29e4c9,this[_0x389417(0x3a3)]),this[_0x389417(0x5b2)]=_0x57238c;}return this['_tempActor'];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x434)]=function(_0x407169){const _0x56e66a=_0x26e348;if(!this['_tempActor'])return!![];return this['_tempActor']['actorId']()!==_0x407169[_0x56e66a(0x42d)]();},Game_Actor['prototype'][_0x26e348(0x63f)]=function(_0x74f0f){const _0x1a938e=_0x26e348;if(!_0x74f0f)return![];const _0xb24474=_0x74f0f['etypeId'],_0x329223=this['equipSlots']();for(let _0x1a437d=0x0;_0x1a437d<_0x329223[_0x1a938e(0x571)];_0x1a437d++){const _0x2793ca=_0x329223[_0x1a437d];if(_0x2793ca!==_0xb24474)continue;if(!this[_0x1a938e(0x2e9)]()[_0x1a437d])return!![];}return![];},Game_Actor[_0x26e348(0x462)][_0x26e348(0x310)]=function(_0x5a3b28){const _0x512e6d=_0x26e348;if(!_0x5a3b28)return-0x1;const _0x27b9ca=_0x5a3b28['etypeId'],_0x223d7e=this[_0x512e6d(0x560)]();let _0x7d2b99=-0x1;for(let _0x34d775=0x0;_0x34d775<_0x223d7e[_0x512e6d(0x571)];_0x34d775++){const _0x1228b5=_0x223d7e[_0x34d775];if(_0x1228b5!==_0x27b9ca)continue;if(!this[_0x512e6d(0x2e9)]()[_0x34d775])return _0x34d775;if(_0x7d2b99<0x0)_0x7d2b99=_0x34d775;}return _0x7d2b99;},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x38e)]=function(){const _0x5e56bd=_0x26e348;VisuMZ['ItemsEquipsCore'][_0x5e56bd(0x1fa)]['StatusWindow']['DrawItemData'][_0x5e56bd(0x62d)](this);},Window_ShopStatus['prototype'][_0x26e348(0x16f)]=function(_0x195f37,_0x42606f,_0x4a2c04,_0x3dbe41){const _0x19cfbb=_0x26e348,_0x71ccbf=DataManager[_0x19cfbb(0x2c2)](_0x195f37,_0x42606f,_0x4a2c04,_0x3dbe41)&&Imported[_0x19cfbb(0x63c)],_0x428d6e=_0x195f37?_0x195f37[_0x19cfbb(0x35c)]:'';if(_0x71ccbf)Window_SkillList[_0x19cfbb(0x462)][_0x19cfbb(0x2e3)][_0x19cfbb(0x62d)](this,_0x195f37);Window_Base[_0x19cfbb(0x462)]['drawItemName'][_0x19cfbb(0x62d)](this,_0x195f37,_0x42606f,_0x4a2c04,_0x3dbe41);if(_0x71ccbf)_0x195f37[_0x19cfbb(0x35c)]=_0x428d6e;},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x490)]=function(){const _0x307827=_0x26e348;this[_0x307827(0x529)]={};if(!this['_item'])return;const _0x3bd846=this[_0x307827(0x3a3)][_0x307827(0x545)];if(_0x3bd846['match'](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x1571c1=String(RegExp['$1'])[_0x307827(0x1b6)](/[\r\n]+/);for(const _0x5dcf8e of _0x1571c1){if(_0x5dcf8e[_0x307827(0x28b)](/(.*):[ ](.*)/i)){const _0x3e2758=String(RegExp['$1'])[_0x307827(0x63a)]()[_0x307827(0x3cc)](),_0x3364cc=String(RegExp['$2'])[_0x307827(0x3cc)]();this[_0x307827(0x529)][_0x3e2758]=_0x3364cc;}}}},Window_ShopStatus['prototype'][_0x26e348(0x5b4)]=function(){const _0x2eb65c=_0x26e348;return Math[_0x2eb65c(0x41b)](0x1,$gameSystem['mainFontSize']()-0x4);},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x587)]=function(){const _0x2eae4f=_0x26e348;Window_StatusBase[_0x2eae4f(0x462)][_0x2eae4f(0x587)][_0x2eae4f(0x62d)](this),this[_0x2eae4f(0x439)][_0x2eae4f(0x271)]=this[_0x2eae4f(0x3c1)]||this[_0x2eae4f(0x439)]['fontSize'],this['contents'][_0x2eae4f(0x36c)]=this[_0x2eae4f(0x163)]||this[_0x2eae4f(0x439)][_0x2eae4f(0x36c)];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x598)]=function(){const _0x724440=_0x26e348;return this[_0x724440(0x439)][_0x724440(0x271)]/$gameSystem[_0x724440(0x3bd)]();},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x33f)]=function(_0x16f6c6,_0x14e139,_0x5cf0a6){const _0x1b0525=_0x26e348,_0x57ff19=ImageManager[_0x1b0525(0x34a)](_0x1b0525(0x441)),_0x2693a3=ImageManager[_0x1b0525(0x4f5)],_0x4a63d1=ImageManager['iconHeight'],_0x24075a=_0x16f6c6%0x10*_0x2693a3,_0x156fde=Math['floor'](_0x16f6c6/0x10)*_0x4a63d1,_0x102c4f=Math['ceil'](_0x2693a3*this['fontSizeRatio']()),_0x2ac928=Math[_0x1b0525(0x649)](_0x4a63d1*this[_0x1b0525(0x598)]());this[_0x1b0525(0x439)][_0x1b0525(0x260)](_0x57ff19,_0x24075a,_0x156fde,_0x2693a3,_0x4a63d1,_0x14e139,_0x5cf0a6,_0x102c4f,_0x2ac928);},Window_ShopStatus['prototype'][_0x26e348(0x2be)]=function(_0x596191,_0x358f1f){const _0x36c117=_0x26e348;if(_0x358f1f[_0x36c117(0x337)]){if(_0x36c117(0x1f2)==='ILxww')return _0x4027b3[_0x36c117(0x2e5)][_0x36c117(0x345)]()?0x1:0x2;else this[_0x36c117(0x33f)](_0x596191,_0x358f1f['x'],_0x358f1f['y']+0x2);}_0x358f1f['x']+=Math['ceil'](ImageManager['iconWidth']*this['fontSizeRatio']());if(this['fontSizeRatio']()===0x1)_0x358f1f['x']+=0x4;},Window_ShopStatus['prototype'][_0x26e348(0x349)]=function(_0x140080,_0x295f29,_0x460f59,_0x3f159c,_0x201abb,_0xbafa2){const _0x2ff4ce=_0x26e348;_0x140080=_0x140080||'',_0xbafa2=_0xbafa2||'left',this['_resetFontSize']=this[_0x2ff4ce(0x5b4)](),this[_0x2ff4ce(0x163)]=_0x201abb?ColorManager[_0x2ff4ce(0x1c8)]():this['contents']['textColor'],_0x295f29+=this[_0x2ff4ce(0x4a7)](),_0x3f159c-=this['itemPadding']()*0x2;const _0x4d59f5=this['textSizeEx'](_0x140080);if(_0xbafa2===_0x2ff4ce(0x56f))_0x295f29=_0x295f29+Math[_0x2ff4ce(0x160)]((_0x3f159c-_0x4d59f5[_0x2ff4ce(0x291)])/0x2);else _0xbafa2==='right'&&(_0x295f29=_0x295f29+_0x3f159c-_0x4d59f5[_0x2ff4ce(0x291)]);_0x460f59+=(this[_0x2ff4ce(0x541)]()-_0x4d59f5[_0x2ff4ce(0x38b)])/0x2,this[_0x2ff4ce(0x2a2)](_0x140080,_0x295f29,_0x460f59,_0x3f159c),this['_resetFontSize']=undefined,this['_resetFontColor']=undefined,this[_0x2ff4ce(0x587)]();},Window_ShopStatus['prototype']['drawItemConsumable']=function(_0xaf8240,_0x3eac47,_0x5a63af){const _0x2569a4=_0x26e348;if(!DataManager['isItem'](this['_item']))return![];const _0x3fe479=this['getItemConsumableLabel']();this[_0x2569a4(0x349)](_0x3fe479,_0xaf8240,_0x3eac47,_0x5a63af,!![]);const _0x3cf810=this[_0x2569a4(0x15d)]();return this['drawItemKeyData'](_0x3cf810,_0xaf8240,_0x3eac47,_0x5a63af,![],_0x2569a4(0x652)),this[_0x2569a4(0x608)](_0xaf8240,_0x3eac47,_0x5a63af),this[_0x2569a4(0x587)](),!![];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x197)]=function(){const _0x1c4c75=_0x26e348;return VisuMZ['ItemsEquipsCore'][_0x1c4c75(0x1fa)][_0x1c4c75(0x1da)][_0x1c4c75(0x5fd)];},Window_ShopStatus[_0x26e348(0x462)]['getItemConsumableText']=function(){const _0x2445c1=_0x26e348,_0x3d2436=_0x2445c1(0x194);if(this[_0x2445c1(0x529)][_0x3d2436])return this['_customItemInfo'][_0x3d2436];return this[_0x2445c1(0x377)]()?VisuMZ[_0x2445c1(0x340)][_0x2445c1(0x1fa)][_0x2445c1(0x1da)][_0x2445c1(0x620)]:VisuMZ['ItemsEquipsCore']['Settings'][_0x2445c1(0x1da)][_0x2445c1(0x25c)];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x377)]=function(){const _0x3002d2=_0x26e348;return VisuMZ[_0x3002d2(0x38f)]&&VisuMZ[_0x3002d2(0x38f)][_0x3002d2(0x1fa)][_0x3002d2(0x5bb)]['KeyItemProtect']&&DataManager[_0x3002d2(0x2b9)](this['_item'])?![]:this['_item'][_0x3002d2(0x5c6)];},Window_ShopStatus[_0x26e348(0x462)]['drawItemQuantity']=function(_0x5b87e2,_0x194d71,_0x1879b0){const _0x433c9b=_0x26e348;if(!this[_0x433c9b(0x524)]()&&!DataManager[_0x433c9b(0x2bd)](this['_item']))return![];if(DataManager[_0x433c9b(0x2b9)](this['_item'])&&!$dataSystem[_0x433c9b(0x4dc)]){if(_0x433c9b(0x288)!==_0x433c9b(0x288)){_0x1f97ee[_0x324099][_0x433c9b(0x2e4)]=_0x5ba45c[_0x57ed5d][_0x433c9b(0x2e4)]||0x0,_0x93c780[_0x54959f][_0x433c9b(0x2e4)]+=_0x10535a;return;}else{const _0x265920=TextManager[_0x433c9b(0x2d4)];this[_0x433c9b(0x349)](_0x265920,_0x5b87e2,_0x194d71,_0x1879b0,!![],_0x433c9b(0x56f));}}else{const _0x39aa49=TextManager['possession'];this[_0x433c9b(0x349)](_0x39aa49,_0x5b87e2,_0x194d71,_0x1879b0,!![]);const _0x46c51f=this[_0x433c9b(0x5d3)]();this['drawItemKeyData'](_0x46c51f,_0x5b87e2,_0x194d71,_0x1879b0,![],'right');}return this[_0x433c9b(0x608)](_0x5b87e2,_0x194d71,_0x1879b0),this[_0x433c9b(0x587)](),!![];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x5d3)]=function(){const _0x3765d9=_0x26e348,_0x4c8e80='QUANTITY';if(this[_0x3765d9(0x529)][_0x4c8e80])return this['_customItemInfo'][_0x4c8e80];const _0xff0772=VisuMZ['ItemsEquipsCore'][_0x3765d9(0x1fa)][_0x3765d9(0x16e)]['ItemQuantityFmt'];return _0xff0772[_0x3765d9(0x43f)]($gameParty[_0x3765d9(0x37b)](this['_item']));},Window_ShopStatus[_0x26e348(0x462)]['drawItemOccasion']=function(_0x850c2f,_0x141466,_0x2d8840){const _0x5fa1a4=_0x26e348,_0x4761b0=this[_0x5fa1a4(0x4f3)]();return this[_0x5fa1a4(0x349)](_0x4761b0,_0x850c2f,_0x141466,_0x2d8840,![],'center'),this[_0x5fa1a4(0x608)](_0x850c2f,_0x141466,_0x2d8840),this[_0x5fa1a4(0x587)](),!![];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x4f3)]=function(){const _0x575977=_0x26e348,_0x511334=_0x575977(0x3a7);if(this[_0x575977(0x529)][_0x511334])return this['_customItemInfo'][_0x511334];const _0x2fd56d=VisuMZ[_0x575977(0x340)][_0x575977(0x1fa)]['StatusWindow'],_0x143912='Occasion%1'[_0x575977(0x43f)](this[_0x575977(0x3a3)][_0x575977(0x3a0)]);return _0x2fd56d[_0x143912];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x218)]=function(_0x420f92,_0x2d9aa3,_0x4d586b){const _0x4eca14=_0x26e348,_0x3cee22=this[_0x4eca14(0x574)]();return this[_0x4eca14(0x349)](_0x3cee22,_0x420f92,_0x2d9aa3,_0x4d586b,![],'center'),this['drawItemDarkRect'](_0x420f92,_0x2d9aa3,_0x4d586b),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x26e348(0x574)]=function(){const _0x55ebcb=_0x26e348,_0x167587=_0x55ebcb(0x443);if(this['_customItemInfo'][_0x167587])return this[_0x55ebcb(0x529)][_0x167587];const _0x457033=VisuMZ['ItemsEquipsCore'][_0x55ebcb(0x1fa)]['StatusWindow'];if(Imported[_0x55ebcb(0x58b)]){if(_0x55ebcb(0x65d)!==_0x55ebcb(0x65d))return _0x55ebcb(0x204)[_0x55ebcb(0x43f)](_0x2ecc9c(_0x408cb4['$1']));else{const _0x2ed607=this['_item'][_0x55ebcb(0x545)];if(_0x2ed607[_0x55ebcb(0x28b)](/<TARGET:[ ](.*)>/i)){const _0x36319c=String(RegExp['$1']);if(_0x36319c['match'](/(\d+) RANDOM ANY/i))return _0x457033['ScopeRandomAny']['format'](Number(RegExp['$1']));else{if(_0x36319c['match'](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x55ebcb(0x296)===_0x55ebcb(0x50e)?this[_0x55ebcb(0x5f7)][_0x2980e0]:_0x457033['ScopeRandomEnemies']['format'](Number(RegExp['$1']));else{if(_0x36319c[_0x55ebcb(0x28b)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x457033[_0x55ebcb(0x39e)][_0x55ebcb(0x43f)](Number(RegExp['$1']));else{if(_0x36319c[_0x55ebcb(0x28b)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x457033[_0x55ebcb(0x51c)];else{if(_0x36319c[_0x55ebcb(0x28b)](/ALLY OR ENEMY/i))return _0x457033[_0x55ebcb(0x61d)]||_0x457033[_0x55ebcb(0x610)];else{if(_0x36319c[_0x55ebcb(0x28b)](/ENEMY OR ALLY/i))return _0x457033[_0x55ebcb(0x3cd)]||_0x457033[_0x55ebcb(0x456)];}}}}}}}}const _0x3e5443=_0x55ebcb(0x23c)[_0x55ebcb(0x43f)](this[_0x55ebcb(0x3a3)][_0x55ebcb(0x1c1)]);return _0x457033[_0x3e5443];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x55b)]=function(_0x225936,_0x4fcff9,_0x8c1984){const _0x2a2c8e=_0x26e348,_0x42059f=this[_0x2a2c8e(0x189)]();this['drawItemKeyData'](_0x42059f,_0x225936,_0x4fcff9,_0x8c1984,!![]);const _0x2de905=this[_0x2a2c8e(0x692)]();return this['drawItemKeyData'](_0x2de905,_0x225936,_0x4fcff9,_0x8c1984,![],'right'),this[_0x2a2c8e(0x608)](_0x225936,_0x4fcff9,_0x8c1984),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype']['getItemSpeedLabel']=function(){const _0x4534c1=_0x26e348;return VisuMZ['ItemsEquipsCore'][_0x4534c1(0x1fa)][_0x4534c1(0x1da)][_0x4534c1(0x248)];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x692)]=function(){const _0x14a1b8=_0x26e348,_0x28bc1f=_0x14a1b8(0x34f);if(this[_0x14a1b8(0x529)][_0x28bc1f])return this[_0x14a1b8(0x529)][_0x28bc1f];const _0x3ae6e4=this[_0x14a1b8(0x3a3)][_0x14a1b8(0x43d)];if(_0x3ae6e4>=0x7d0)return VisuMZ['ItemsEquipsCore'][_0x14a1b8(0x1fa)][_0x14a1b8(0x1da)][_0x14a1b8(0x5e7)];else{if(_0x3ae6e4>=0x3e8){if(_0x14a1b8(0x419)===_0x14a1b8(0x58a))_0xca9777=this[_0x14a1b8(0x501)][_0x14a1b8(0x285)](_0x50c488),_0x1a4e20=this[_0x14a1b8(0x5b2)][_0x14a1b8(0x285)](_0x328e8a),_0x16e4d5=this[_0x14a1b8(0x5b2)][_0x14a1b8(0x285)](_0x5ba5f5);else return VisuMZ[_0x14a1b8(0x340)][_0x14a1b8(0x1fa)][_0x14a1b8(0x1da)][_0x14a1b8(0x365)];}else{if(_0x3ae6e4>0x0)return VisuMZ['ItemsEquipsCore']['Settings'][_0x14a1b8(0x1da)][_0x14a1b8(0x483)];else{if(_0x3ae6e4===0x0)return VisuMZ['ItemsEquipsCore'][_0x14a1b8(0x1fa)][_0x14a1b8(0x1da)]['Speed0'];else{if(_0x3ae6e4>-0x3e8)return VisuMZ['ItemsEquipsCore']['Settings'][_0x14a1b8(0x1da)][_0x14a1b8(0x200)];else{if(_0x3ae6e4>-0x7d0)return VisuMZ[_0x14a1b8(0x340)][_0x14a1b8(0x1fa)]['StatusWindow'][_0x14a1b8(0x1d2)];else return _0x3ae6e4<=-0x7d0?VisuMZ['ItemsEquipsCore'][_0x14a1b8(0x1fa)][_0x14a1b8(0x1da)][_0x14a1b8(0x4a4)]:'?????';}}}}}},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x64c)]=function(_0x1040ef,_0x4444bb,_0x33ee1c){const _0x3b8a9e=_0x26e348,_0x231ba0=this[_0x3b8a9e(0x5f1)]();this[_0x3b8a9e(0x349)](_0x231ba0,_0x1040ef,_0x4444bb,_0x33ee1c,!![]);const _0x27f04=this[_0x3b8a9e(0x4e1)]();return this['drawItemKeyData'](_0x27f04,_0x1040ef,_0x4444bb,_0x33ee1c,![],_0x3b8a9e(0x652)),this[_0x3b8a9e(0x608)](_0x1040ef,_0x4444bb,_0x33ee1c),this[_0x3b8a9e(0x587)](),!![];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x5f1)]=function(){const _0x3733d4=_0x26e348;return VisuMZ[_0x3733d4(0x340)][_0x3733d4(0x1fa)][_0x3733d4(0x1da)]['LabelSuccessRate'];},Window_ShopStatus['prototype'][_0x26e348(0x4e1)]=function(){const _0x53e285=_0x26e348,_0x2c5209=_0x53e285(0x2f9);if(this['_customItemInfo'][_0x2c5209])return this[_0x53e285(0x529)][_0x2c5209];if(Imported[_0x53e285(0x58b)]){const _0x367748=this[_0x53e285(0x3a3)][_0x53e285(0x545)];if(_0x367748[_0x53e285(0x28b)](/<ALWAYS HIT>/i))return _0x53e285(0x28e);else{if(_0x367748[_0x53e285(0x28b)](/<ALWAYS HIT RATE: (\d+)([%％])>/i)){if(_0x53e285(0x272)===_0x53e285(0x272))return'%1%'[_0x53e285(0x43f)](Number(RegExp['$1']));else{const _0x5e344e=this[_0x53e285(0x5b0)](_0x3b8dbc),_0x3aff51=this[_0x53e285(0x1e9)](_0x3a5615)[_0x53e285(0x291)];return _0x3aff51<=_0x5e344e[_0x53e285(0x291)]?_0x53e285(0x381):'icon';}}}}return'%1%'[_0x53e285(0x43f)](this['_item'][_0x53e285(0x37a)]);},Window_ShopStatus['prototype'][_0x26e348(0x3ce)]=function(_0x1df6bd,_0x1b7672,_0x5287f5){const _0x12f1e5=_0x26e348,_0x2b7a68=this[_0x12f1e5(0x3a5)]();this[_0x12f1e5(0x349)](_0x2b7a68,_0x1df6bd,_0x1b7672,_0x5287f5,!![]);const _0x21dfb2=this[_0x12f1e5(0x3a8)]();return this['drawItemKeyData'](_0x21dfb2,_0x1df6bd,_0x1b7672,_0x5287f5,![],'right'),this[_0x12f1e5(0x608)](_0x1df6bd,_0x1b7672,_0x5287f5),this[_0x12f1e5(0x587)](),!![];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x3a5)]=function(){const _0x164ba2=_0x26e348;return VisuMZ[_0x164ba2(0x340)]['Settings'][_0x164ba2(0x1da)][_0x164ba2(0x311)];},Window_ShopStatus['prototype'][_0x26e348(0x3a8)]=function(){const _0x55c785=_0x26e348,_0xa36380=_0x55c785(0x18a);if(this[_0x55c785(0x529)][_0xa36380])return this[_0x55c785(0x529)][_0xa36380];const _0x2bcc68=_0x55c785(0x241);return _0x2bcc68['format'](this[_0x55c785(0x3a3)]['repeats']);},Window_ShopStatus['prototype'][_0x26e348(0x2cb)]=function(_0x3efc05,_0x2e7fe9,_0x4c8793){const _0x566548=_0x26e348,_0x49e552=this[_0x566548(0x4bc)]();this['drawItemKeyData'](_0x49e552,_0x3efc05,_0x2e7fe9,_0x4c8793,!![]);const _0x3c7c76=this['getItemHitTypeText']();return this[_0x566548(0x349)](_0x3c7c76,_0x3efc05,_0x2e7fe9,_0x4c8793,![],_0x566548(0x652)),this[_0x566548(0x608)](_0x3efc05,_0x2e7fe9,_0x4c8793),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x26e348(0x4bc)]=function(){const _0x2cd1b0=_0x26e348;return VisuMZ[_0x2cd1b0(0x340)]['Settings'][_0x2cd1b0(0x1da)][_0x2cd1b0(0x5e3)];},Window_ShopStatus['prototype'][_0x26e348(0x57a)]=function(){const _0x1f42f9=_0x26e348,_0x22158c='HIT\x20TYPE';if(this[_0x1f42f9(0x529)][_0x22158c])return this[_0x1f42f9(0x529)][_0x22158c];const _0x2bc26d=VisuMZ[_0x1f42f9(0x340)][_0x1f42f9(0x1fa)][_0x1f42f9(0x1da)],_0xe85fcc=_0x1f42f9(0x5e5)[_0x1f42f9(0x43f)](this[_0x1f42f9(0x3a3)]['hitType']);return _0x2bc26d[_0xe85fcc];},Window_ShopStatus['prototype'][_0x26e348(0x511)]=function(_0xdf392a,_0x4d60e2,_0x33d351){const _0x83c1e5=_0x26e348;if(this[_0x83c1e5(0x3a3)][_0x83c1e5(0x404)][_0x83c1e5(0x3bc)]<=0x0)return _0x4d60e2;if(this[_0x83c1e5(0x60f)](_0xdf392a,_0x4d60e2,_0x33d351))_0x4d60e2+=this[_0x83c1e5(0x541)]();if(this[_0x83c1e5(0x54c)](_0xdf392a,_0x4d60e2,_0x33d351))_0x4d60e2+=this['lineHeight']();return this[_0x83c1e5(0x587)](),_0x4d60e2;},Window_ShopStatus['prototype']['drawItemDamageElement']=function(_0x5f505e,_0x2dafff,_0x4578c6){const _0x2db8c7=_0x26e348,_0xf82d7e=this[_0x2db8c7(0x68c)]();this[_0x2db8c7(0x349)](_0xf82d7e,_0x5f505e,_0x2dafff,_0x4578c6,!![]);const _0x1b9e7c=this[_0x2db8c7(0x3ea)]();return this[_0x2db8c7(0x349)](_0x1b9e7c,_0x5f505e,_0x2dafff,_0x4578c6,![],_0x2db8c7(0x652)),this[_0x2db8c7(0x608)](_0x5f505e,_0x2dafff,_0x4578c6),this[_0x2db8c7(0x587)](),!![];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x68c)]=function(){const _0x2d469c=_0x26e348;return VisuMZ[_0x2d469c(0x340)][_0x2d469c(0x1fa)][_0x2d469c(0x1da)][_0x2d469c(0x410)];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x3ea)]=function(){const _0x422089=_0x26e348,_0x164134=_0x422089(0x548);if(this['_customItemInfo'][_0x164134])return this[_0x422089(0x529)][_0x164134];if(this['_item'][_0x422089(0x404)]['elementId']<=-0x1)return VisuMZ['ItemsEquipsCore'][_0x422089(0x1fa)][_0x422089(0x1da)][_0x422089(0x452)];else{if(this[_0x422089(0x3a3)][_0x422089(0x404)][_0x422089(0x521)]===0x0){if(_0x422089(0x2dd)===_0x422089(0x2dd))return VisuMZ[_0x422089(0x340)][_0x422089(0x1fa)]['StatusWindow'][_0x422089(0x3c6)];else{if(this['isOptimizeEquipOk'](_0x1bdf3e))this[_0x422089(0x553)](_0x2542e2,this[_0x422089(0x1df)](_0x27080d));}}else{if('SEihQ'!==_0x422089(0x33e))return $dataSystem[_0x422089(0x1cf)][this['_item'][_0x422089(0x404)][_0x422089(0x521)]];else _0x492260[_0x422089(0x507)](0x0),_0x45af07[_0x422089(0x507)](-0x1),this['_forcedSlots']=_0xe6c61f,this['refresh'](),this[_0x422089(0x1e0)]();}}},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x54c)]=function(_0x296a79,_0x39d77f,_0x408cec){const _0x40be90=_0x26e348,_0x5673b4=this['getItemDamageAmountLabel']();this[_0x40be90(0x349)](_0x5673b4,_0x296a79,_0x39d77f,_0x408cec,!![]),this[_0x40be90(0x39c)]();const _0x1055a4=this[_0x40be90(0x30a)](),_0x269048=ColorManager['damageColor']([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x40be90(0x3a3)][_0x40be90(0x404)]['type']]);return this['changeTextColor'](_0x269048),this[_0x40be90(0x349)](_0x1055a4,_0x296a79,_0x39d77f,_0x408cec,![],_0x40be90(0x652)),this['drawItemDarkRect'](_0x296a79,_0x39d77f,_0x408cec),this[_0x40be90(0x587)](),!![];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x45e)]=function(){const _0x2aadb6=_0x26e348;return Imported[_0x2aadb6(0x58b)]&&DataManager['getDamageStyle'](this['_item'])!==_0x2aadb6(0x474)?this[_0x2aadb6(0x220)]():this[_0x2aadb6(0x55d)]();},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x55d)]=function(){const _0x1da518=_0x26e348,_0x43d7d8=VisuMZ[_0x1da518(0x340)]['Settings'][_0x1da518(0x1da)],_0x20fdca=_0x1da518(0x315)[_0x1da518(0x43f)](this[_0x1da518(0x3a3)][_0x1da518(0x404)][_0x1da518(0x3bc)]),_0x11d135=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x1da518(0x3a3)][_0x1da518(0x404)][_0x1da518(0x3bc)]];return _0x43d7d8[_0x20fdca]['format'](_0x11d135);},Window_ShopStatus['prototype']['setupItemDamageTempActors']=function(){const _0x3d70bc=_0x26e348,_0x3809b1=$gameActors[_0x3d70bc(0x333)](0x1);this[_0x3d70bc(0x44b)]=JsonEx[_0x3d70bc(0x626)](_0x3809b1),this[_0x3d70bc(0x638)]=JsonEx[_0x3d70bc(0x626)](_0x3809b1);},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x30a)]=function(){const _0x113e36=_0x26e348,_0x294e54=_0x113e36(0x687);if(this[_0x113e36(0x529)][_0x294e54])return this[_0x113e36(0x529)][_0x294e54];if(Imported[_0x113e36(0x58b)]&&DataManager[_0x113e36(0x2d7)](this['_item'])!==_0x113e36(0x474)){if(_0x113e36(0x653)!==_0x113e36(0x421))return this[_0x113e36(0x5da)]();else this[_0x113e36(0x4cf)][_0x113e36(0x17b)]=this[_0x113e36(0x3a3)][_0x113e36(0x24d)],_0x458c7e=!![];}else return this[_0x113e36(0x519)]();},Window_ShopStatus['prototype'][_0x26e348(0x519)]=function(){const _0x25e4eb=_0x26e348;window['a']=this[_0x25e4eb(0x44b)],window['b']=this['_tempActorB'],this[_0x25e4eb(0x44b)][_0x25e4eb(0x214)](!![]),this[_0x25e4eb(0x638)][_0x25e4eb(0x214)]([0x3,0x4][_0x25e4eb(0x176)](this[_0x25e4eb(0x3a3)][_0x25e4eb(0x404)][_0x25e4eb(0x3bc)]));let _0x56c60d=this[_0x25e4eb(0x3a3)]['damage']['formula'];try{const _0x371a6b=Math[_0x25e4eb(0x41b)](eval(_0x56c60d),0x0)/window['a']['atk'];return this[_0x25e4eb(0x694)](),isNaN(_0x371a6b)?_0x25e4eb(0x51f):'%1%'[_0x25e4eb(0x43f)](Math['round'](_0x371a6b*0x64));}catch(_0x3bb56c){return $gameTemp[_0x25e4eb(0x685)]()&&(console[_0x25e4eb(0x5ab)](_0x25e4eb(0x169)[_0x25e4eb(0x43f)](this[_0x25e4eb(0x3a3)][_0x25e4eb(0x35c)])),console[_0x25e4eb(0x5ab)](_0x3bb56c)),this[_0x25e4eb(0x694)](),_0x25e4eb(0x51f);}},Window_ShopStatus['prototype'][_0x26e348(0x694)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x497)]=function(_0x578e8d,_0x23d134,_0x23cfe8){const _0xe13354=_0x26e348;if(!this['makeItemData']())return _0x23d134;if(this[_0xe13354(0x4a0)](_0x578e8d,_0x23d134,_0x23cfe8))_0x23d134+=this['lineHeight']();if(this['drawItemEffectsMpRecovery'](_0x578e8d,_0x23d134,_0x23cfe8))_0x23d134+=this[_0xe13354(0x541)]();if(this['drawItemEffectsTpRecovery'](_0x578e8d,_0x23d134,_0x23cfe8))_0x23d134+=this['lineHeight']();if(this[_0xe13354(0x2f1)](_0x578e8d,_0x23d134,_0x23cfe8))_0x23d134+=this['lineHeight']();if(this[_0xe13354(0x65f)](_0x578e8d,_0x23d134,_0x23cfe8))_0x23d134+=this[_0xe13354(0x541)]();if(this[_0xe13354(0x563)](_0x578e8d,_0x23d134,_0x23cfe8))_0x23d134+=this[_0xe13354(0x541)]();if(this['drawItemEffectsSelfTpGain'](_0x578e8d,_0x23d134,_0x23cfe8))_0x23d134+=this[_0xe13354(0x541)]();if(this['drawItemEffectsAddedStatesBuffs'](_0x578e8d,_0x23d134,_0x23cfe8))_0x23d134+=this[_0xe13354(0x541)]();if(this[_0xe13354(0x33a)](_0x578e8d,_0x23d134,_0x23cfe8))_0x23d134+=this[_0xe13354(0x541)]();return this[_0xe13354(0x587)](),_0x23d134;},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x50f)]=function(){const _0x292e4f=_0x26e348;return this['_item'][_0x292e4f(0x48a)];},Window_ShopStatus[_0x26e348(0x462)]['makeItemData']=function(){const _0xa53618=_0x26e348;let _0xe32b6c=![];this[_0xa53618(0x4cf)]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0x541743=this[_0xa53618(0x50f)]();for(const _0x3e8766 of _0x541743){switch(_0x3e8766['code']){case Game_Action['EFFECT_RECOVER_HP']:this[_0xa53618(0x4cf)][_0xa53618(0x654)]+=_0x3e8766[_0xa53618(0x642)],this[_0xa53618(0x4cf)]['flatHP']+=_0x3e8766[_0xa53618(0x29e)],_0xe32b6c=!![];break;case Game_Action[_0xa53618(0x423)]:this[_0xa53618(0x4cf)][_0xa53618(0x2db)]+=_0x3e8766[_0xa53618(0x642)],this['_itemData'][_0xa53618(0x2fd)]+=_0x3e8766[_0xa53618(0x29e)],_0xe32b6c=!![];break;case Game_Action[_0xa53618(0x53e)]:this[_0xa53618(0x4cf)][_0xa53618(0x666)]+=_0x3e8766[_0xa53618(0x642)],_0xe32b6c=!![];break;case Game_Action['EFFECT_ADD_STATE']:this[_0xa53618(0x4cf)][_0xa53618(0x1f5)][_0xa53618(0x270)](_0x3e8766[_0xa53618(0x646)]),_0xe32b6c=!![];break;case Game_Action['EFFECT_REMOVE_STATE']:this[_0xa53618(0x4cf)]['removeState'][_0xa53618(0x270)](_0x3e8766[_0xa53618(0x646)]),this[_0xa53618(0x4cf)]['removeStateBuffChanges']=!![],_0xe32b6c=!![];break;case Game_Action[_0xa53618(0x54e)]:this[_0xa53618(0x4cf)]['changeBuff'][_0x3e8766[_0xa53618(0x646)]]+=0x1,_0xe32b6c=!![];break;case Game_Action[_0xa53618(0x35b)]:this[_0xa53618(0x4cf)][_0xa53618(0x3e0)][_0x3e8766[_0xa53618(0x646)]]-=0x1,_0xe32b6c=!![];break;case Game_Action[_0xa53618(0x3ca)]:this['_itemData'][_0xa53618(0x3af)]['push'](_0x3e8766[_0xa53618(0x646)]),this[_0xa53618(0x4cf)]['removeStateBuffChanges']=!![],_0xe32b6c=!![];break;case Game_Action[_0xa53618(0x4d0)]:this['_itemData'][_0xa53618(0x416)][_0xa53618(0x270)](_0x3e8766[_0xa53618(0x646)]),this[_0xa53618(0x4cf)][_0xa53618(0x5a4)]=!![],_0xe32b6c=!![];break;}}if(this[_0xa53618(0x4cf)]['addState'][_0xa53618(0x571)]>0x0)this[_0xa53618(0x4cf)][_0xa53618(0x564)]=!![];for(let _0x32a46a=0x0;_0x32a46a<this[_0xa53618(0x4cf)]['changeBuff']['length'];_0x32a46a++){if(this[_0xa53618(0x4cf)][_0xa53618(0x3e0)][_0x32a46a]!==0x0)this['_itemData']['addStateBuffChanges']=!![];}this[_0xa53618(0x3a3)][_0xa53618(0x24d)]!==0x0&&(this[_0xa53618(0x4cf)]['selfTP']=this[_0xa53618(0x3a3)][_0xa53618(0x24d)],_0xe32b6c=!![]);const _0x49ebe5=[_0xa53618(0x4d3),_0xa53618(0x240),'TP\x20RECOVERY',_0xa53618(0x675),'MP\x20DAMAGE',_0xa53618(0x634),_0xa53618(0x286),_0xa53618(0x504),'REMOVED\x20EFFECTS'];for(const _0xff82ae of _0x49ebe5){if(_0xa53618(0x359)!==_0xa53618(0x359)){const _0x3bb53f=_0x37c764[_0xa53618(0x340)][_0xa53618(0x1fa)][_0xa53618(0x1da)][_0xa53618(0x3d0)];return _0x3bb53f[_0xa53618(0x43f)](_0x22dd51['tp']);}else{if(this[_0xa53618(0x529)][_0xff82ae]){if('xZeIq'==='pJcCo'){const _0x441dfd=this['itemLineRect'](_0x3b7f48),_0x249626=this['commandName'](_0x500bba),_0x1da6a7=this['textSizeEx'](_0x249626)[_0xa53618(0x291)];this[_0xa53618(0x326)](this[_0xa53618(0x56c)](_0x645a8d));const _0x10af04=this[_0xa53618(0x34b)]();if(_0x10af04===_0xa53618(0x652))this['drawTextEx'](_0x249626,_0x441dfd['x']+_0x441dfd[_0xa53618(0x291)]-_0x1da6a7,_0x441dfd['y'],_0x1da6a7);else{if(_0x10af04===_0xa53618(0x56f)){const _0x45aeb3=_0x441dfd['x']+_0x2e05ba[_0xa53618(0x160)]((_0x441dfd[_0xa53618(0x291)]-_0x1da6a7)/0x2);this[_0xa53618(0x2a2)](_0x249626,_0x45aeb3,_0x441dfd['y'],_0x1da6a7);}else this['drawTextEx'](_0x249626,_0x441dfd['x'],_0x441dfd['y'],_0x1da6a7);}}else{_0xe32b6c=!![];break;}}}}return _0xe32b6c;},Window_ShopStatus['prototype'][_0x26e348(0x4a0)]=function(_0x535298,_0xe95ed5,_0x31038e){const _0x51fcc9=_0x26e348,_0x37a89d='HP\x20RECOVERY';if(this[_0x51fcc9(0x4cf)][_0x51fcc9(0x654)]<=0x0&&this['_itemData'][_0x51fcc9(0x612)]<=0x0&&!this[_0x51fcc9(0x529)][_0x37a89d])return![];const _0x2c5cb4=this['getItemEffectsHpRecoveryLabel']();this['drawItemKeyData'](_0x2c5cb4,_0x535298,_0xe95ed5,_0x31038e,!![]);const _0xe20109=this[_0x51fcc9(0x395)]();return this[_0x51fcc9(0x303)](ColorManager[_0x51fcc9(0x1e3)](0x1)),this[_0x51fcc9(0x349)](_0xe20109,_0x535298,_0xe95ed5,_0x31038e,![],'right'),this[_0x51fcc9(0x608)](_0x535298,_0xe95ed5,_0x31038e),this[_0x51fcc9(0x587)](),!![];},Window_ShopStatus['prototype'][_0x26e348(0x203)]=function(){const _0x550dd0=_0x26e348,_0x3d096d=VisuMZ['ItemsEquipsCore'][_0x550dd0(0x1fa)][_0x550dd0(0x1da)][_0x550dd0(0x66e)];return _0x3d096d[_0x550dd0(0x43f)](TextManager['hp']);},Window_ShopStatus['prototype'][_0x26e348(0x395)]=function(){const _0x151801=_0x26e348,_0x1a903b=_0x151801(0x4d3);if(this[_0x151801(0x529)][_0x1a903b])return this['_customItemInfo'][_0x1a903b];let _0x341ca5='';if(this[_0x151801(0x4cf)]['rateHP']>0x0)_0x341ca5+=_0x151801(0x402)[_0x151801(0x43f)](Math[_0x151801(0x160)](this[_0x151801(0x4cf)][_0x151801(0x654)]*0x64));if(this[_0x151801(0x4cf)][_0x151801(0x654)]>0x0&&this[_0x151801(0x4cf)][_0x151801(0x612)]>0x0)_0x341ca5+='\x20';if(this[_0x151801(0x4cf)][_0x151801(0x612)]>0x0)_0x341ca5+=_0x151801(0x275)['format'](this['_itemData'][_0x151801(0x612)]);return _0x341ca5;},Window_ShopStatus['prototype']['drawItemEffectsMpRecovery']=function(_0x4d35eb,_0x16d5b7,_0x6563bf){const _0x53efed=_0x26e348,_0x30578b=_0x53efed(0x240);if(this[_0x53efed(0x4cf)]['rateMP']<=0x0&&this['_itemData'][_0x53efed(0x2fd)]<=0x0&&!this[_0x53efed(0x529)][_0x30578b])return![];const _0x5d85c8=this[_0x53efed(0x436)]();this[_0x53efed(0x349)](_0x5d85c8,_0x4d35eb,_0x16d5b7,_0x6563bf,!![]);const _0x18cd9e=this[_0x53efed(0x25e)]();return this[_0x53efed(0x303)](ColorManager[_0x53efed(0x1e3)](0x3)),this[_0x53efed(0x349)](_0x18cd9e,_0x4d35eb,_0x16d5b7,_0x6563bf,![],_0x53efed(0x652)),this[_0x53efed(0x608)](_0x4d35eb,_0x16d5b7,_0x6563bf),this[_0x53efed(0x587)](),!![];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x436)]=function(){const _0x5431b6=_0x26e348,_0x27efc9=VisuMZ[_0x5431b6(0x340)][_0x5431b6(0x1fa)][_0x5431b6(0x1da)]['LabelRecoverMP'];return _0x27efc9[_0x5431b6(0x43f)](TextManager['mp']);},Window_ShopStatus['prototype'][_0x26e348(0x25e)]=function(){const _0x1eaa2e=_0x26e348,_0x2fde1e=_0x1eaa2e(0x240);if(this[_0x1eaa2e(0x529)][_0x2fde1e])return this[_0x1eaa2e(0x529)][_0x2fde1e];let _0x47cdab='';if(this[_0x1eaa2e(0x4cf)]['rateMP']>0x0)_0x47cdab+=_0x1eaa2e(0x402)['format'](Math[_0x1eaa2e(0x160)](this['_itemData'][_0x1eaa2e(0x2db)]*0x64));if(this['_itemData'][_0x1eaa2e(0x2db)]>0x0&&this[_0x1eaa2e(0x4cf)]['flatMP']>0x0)_0x47cdab+='\x20';if(this[_0x1eaa2e(0x4cf)][_0x1eaa2e(0x2fd)]>0x0)_0x47cdab+='+%1'[_0x1eaa2e(0x43f)](this[_0x1eaa2e(0x4cf)]['flatMP']);return _0x47cdab;},Window_ShopStatus['prototype'][_0x26e348(0x5ac)]=function(_0x11a3b4,_0x1de631,_0xb51446){const _0x1ad877=_0x26e348,_0x437973=_0x1ad877(0x5fc);if(this['_itemData']['gainTP']<=0x0&&!this['_customItemInfo'][_0x437973])return![];const _0x58cee8=this[_0x1ad877(0x1a8)]();this[_0x1ad877(0x349)](_0x58cee8,_0x11a3b4,_0x1de631,_0xb51446,!![]);const _0x24054=this[_0x1ad877(0x5a9)]();return this[_0x1ad877(0x303)](ColorManager[_0x1ad877(0x5a5)]()),this[_0x1ad877(0x349)](_0x24054,_0x11a3b4,_0x1de631,_0xb51446,![],_0x1ad877(0x652)),this['drawItemDarkRect'](_0x11a3b4,_0x1de631,_0xb51446),this[_0x1ad877(0x587)](),!![];},Window_ShopStatus[_0x26e348(0x462)]['getItemEffectsTpRecoveryLabel']=function(){const _0x349bea=_0x26e348,_0x293653=VisuMZ[_0x349bea(0x340)][_0x349bea(0x1fa)][_0x349bea(0x1da)][_0x349bea(0x577)];return _0x293653[_0x349bea(0x43f)](TextManager['tp']);},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x5a9)]=function(){const _0x5cb9c2=_0x26e348,_0x4cc7b4=_0x5cb9c2(0x5fc);if(this[_0x5cb9c2(0x529)][_0x4cc7b4])return this[_0x5cb9c2(0x529)][_0x4cc7b4];let _0x2fcbff='';return _0x2fcbff+=_0x5cb9c2(0x275)['format'](this[_0x5cb9c2(0x4cf)][_0x5cb9c2(0x666)]),_0x2fcbff;},Window_ShopStatus[_0x26e348(0x462)]['drawItemEffectsSelfTpGain']=function(_0x31d0d0,_0x41cda4,_0x4f1761){const _0x38decf=_0x26e348,_0x3904af=_0x38decf(0x286);if(this['_itemData'][_0x38decf(0x17b)]===0x0&&!this[_0x38decf(0x529)][_0x3904af])return![];const _0x597559=this['getItemEffectsSelfTpGainLabel']();this[_0x38decf(0x349)](_0x597559,_0x31d0d0,_0x41cda4,_0x4f1761,!![]);const _0x2cba8e=this[_0x38decf(0x30f)]();if(this[_0x38decf(0x4cf)][_0x38decf(0x17b)]>0x0){if(_0x38decf(0x4e4)===_0x38decf(0x4e4))this['changeTextColor'](ColorManager[_0x38decf(0x5a5)]());else return _0x5809d0[_0x38decf(0x648)](_0x3fc308[_0x38decf(0x43b)](_0x3c2567),0x1),_0x22a2b2;}else{if(_0x38decf(0x643)===_0x38decf(0x643))this[_0x38decf(0x303)](ColorManager['powerDownColor']());else{if(_0x2ede2f['uiMenuStyle']&&_0x21dc65[_0x38decf(0x556)]!==_0x2346dd)return _0x2f7baf[_0x38decf(0x556)];else return this[_0x38decf(0x345)]()?this['updatedLayoutStyle']()[_0x38decf(0x28b)](/LOWER/i):_0x49fb4f[_0x38decf(0x462)][_0x38decf(0x656)][_0x38decf(0x62d)](this);}}return this[_0x38decf(0x349)](_0x2cba8e,_0x31d0d0,_0x41cda4,_0x4f1761,![],'right'),this['drawItemDarkRect'](_0x31d0d0,_0x41cda4,_0x4f1761),this[_0x38decf(0x587)](),!![];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x500)]=function(){const _0x52f8d5=_0x26e348,_0x59fee6=VisuMZ[_0x52f8d5(0x340)]['Settings'][_0x52f8d5(0x1da)][_0x52f8d5(0x175)];return _0x59fee6[_0x52f8d5(0x43f)](TextManager['tp']);},Window_ShopStatus[_0x26e348(0x462)]['getItemEffectsSelfTpGainText']=function(){const _0x22fc24=_0x26e348,_0xb76d3a=_0x22fc24(0x286);if(this[_0x22fc24(0x529)][_0xb76d3a])return this[_0x22fc24(0x529)][_0xb76d3a];let _0x596cb8='';return this[_0x22fc24(0x4cf)][_0x22fc24(0x17b)]>0x0?_0x22fc24(0x206)===_0x22fc24(0x206)?_0x596cb8+=_0x22fc24(0x275)[_0x22fc24(0x43f)](this[_0x22fc24(0x4cf)][_0x22fc24(0x17b)]):(_0x4ae393[_0x22fc24(0x340)][_0x22fc24(0x51d)][_0x22fc24(0x62d)](this,_0x4e517d),_0x186ef8['ItemsEquipsCore'][_0x22fc24(0x59c)](_0x28be70)):_0x596cb8+='%1'[_0x22fc24(0x43f)](this[_0x22fc24(0x4cf)][_0x22fc24(0x17b)]),_0x596cb8;},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x2f1)]=function(_0xea4bae,_0x2c7c5c,_0x5e7dbf){const _0x3ce1a8=_0x26e348,_0x596058=_0x3ce1a8(0x675);if(this[_0x3ce1a8(0x4cf)]['rateHP']>=0x0&&this[_0x3ce1a8(0x4cf)][_0x3ce1a8(0x612)]>=0x0&&!this[_0x3ce1a8(0x529)][_0x596058])return![];const _0x1e287f=this[_0x3ce1a8(0x1e6)]();this['drawItemKeyData'](_0x1e287f,_0xea4bae,_0x2c7c5c,_0x5e7dbf,!![]);const _0x227113=this['getItemEffectsHpDamageText']();return this[_0x3ce1a8(0x303)](ColorManager[_0x3ce1a8(0x1e3)](0x0)),this[_0x3ce1a8(0x349)](_0x227113,_0xea4bae,_0x2c7c5c,_0x5e7dbf,![],_0x3ce1a8(0x652)),this[_0x3ce1a8(0x608)](_0xea4bae,_0x2c7c5c,_0x5e7dbf),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x1e6)]=function(){const _0x2eb17d=_0x26e348,_0x178cc9=VisuMZ['ItemsEquipsCore'][_0x2eb17d(0x1fa)]['StatusWindow'][_0x2eb17d(0x378)];return _0x178cc9[_0x2eb17d(0x43f)](TextManager['hp']);},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x1bd)]=function(){const _0x3e39b3=_0x26e348,_0x31bda8='HP\x20DAMAGE';if(this[_0x3e39b3(0x529)][_0x31bda8])return this[_0x3e39b3(0x529)][_0x31bda8];let _0x229017='';if(this[_0x3e39b3(0x4cf)][_0x3e39b3(0x654)]<0x0)_0x229017+=_0x3e39b3(0x204)[_0x3e39b3(0x43f)](Math['floor'](this[_0x3e39b3(0x4cf)][_0x3e39b3(0x654)]*0x64));if(this['_itemData']['rateHP']<0x0&&this[_0x3e39b3(0x4cf)][_0x3e39b3(0x612)]<0x0)_0x229017+='\x20';if(this[_0x3e39b3(0x4cf)][_0x3e39b3(0x612)]<0x0)_0x229017+='%1'[_0x3e39b3(0x43f)](this[_0x3e39b3(0x4cf)][_0x3e39b3(0x612)]);return _0x229017;},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x65f)]=function(_0x18ee7b,_0xd85b3a,_0xe313d9){const _0x532046=_0x26e348,_0x5f3807=_0x532046(0x61e);if(this['_itemData'][_0x532046(0x2db)]>=0x0&&this[_0x532046(0x4cf)][_0x532046(0x2fd)]>=0x0&&!this[_0x532046(0x529)][_0x5f3807])return![];const _0x46926d=this[_0x532046(0x554)]();this[_0x532046(0x349)](_0x46926d,_0x18ee7b,_0xd85b3a,_0xe313d9,!![]);const _0x32a2a7=this['getItemEffectsMpDamageText']();return this[_0x532046(0x303)](ColorManager[_0x532046(0x1e3)](0x2)),this[_0x532046(0x349)](_0x32a2a7,_0x18ee7b,_0xd85b3a,_0xe313d9,![],_0x532046(0x652)),this[_0x532046(0x608)](_0x18ee7b,_0xd85b3a,_0xe313d9),this[_0x532046(0x587)](),!![];},Window_ShopStatus[_0x26e348(0x462)]['getItemEffectsMpDamageLabel']=function(){const _0x3e646f=_0x26e348,_0x2f311c=VisuMZ[_0x3e646f(0x340)]['Settings'][_0x3e646f(0x1da)]['LabelDamageMP'];return _0x2f311c['format'](TextManager['mp']);},Window_ShopStatus['prototype'][_0x26e348(0x17e)]=function(){const _0x3181d0=_0x26e348,_0x21f0e3='MP\x20DAMAGE';if(this[_0x3181d0(0x529)][_0x21f0e3])return this[_0x3181d0(0x529)][_0x21f0e3];let _0x2def4f='';if(this[_0x3181d0(0x4cf)][_0x3181d0(0x2db)]<0x0)_0x2def4f+=_0x3181d0(0x204)['format'](Math[_0x3181d0(0x160)](this[_0x3181d0(0x4cf)][_0x3181d0(0x2db)]*0x64));if(this[_0x3181d0(0x4cf)]['rateMP']<0x0&&this[_0x3181d0(0x4cf)][_0x3181d0(0x2fd)]<0x0)_0x2def4f+='\x20';if(this[_0x3181d0(0x4cf)]['flatMP']<0x0)_0x2def4f+='%1'[_0x3181d0(0x43f)](this[_0x3181d0(0x4cf)][_0x3181d0(0x2fd)]);return _0x2def4f;},Window_ShopStatus[_0x26e348(0x462)]['drawItemEffectsTpDamage']=function(_0x10e8b0,_0x2cd2ee,_0x4fe432){const _0x2640b1=_0x26e348,_0x2c5a01='TP\x20DAMAGE';if(this[_0x2640b1(0x4cf)][_0x2640b1(0x666)]>=0x0&&!this[_0x2640b1(0x529)][_0x2c5a01])return![];const _0x3d7ad6=this[_0x2640b1(0x466)]();this[_0x2640b1(0x349)](_0x3d7ad6,_0x10e8b0,_0x2cd2ee,_0x4fe432,!![]);const _0x44d78e=this[_0x2640b1(0x4ca)]();return this[_0x2640b1(0x303)](ColorManager['powerDownColor']()),this['drawItemKeyData'](_0x44d78e,_0x10e8b0,_0x2cd2ee,_0x4fe432,![],_0x2640b1(0x652)),this[_0x2640b1(0x608)](_0x10e8b0,_0x2cd2ee,_0x4fe432),this[_0x2640b1(0x587)](),!![];},Window_ShopStatus[_0x26e348(0x462)]['getItemEffectsTpDamageLabel']=function(){const _0x933213=VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow']['LabelDamageTP'];return _0x933213['format'](TextManager['tp']);},Window_ShopStatus['prototype'][_0x26e348(0x4ca)]=function(){const _0x458f8c=_0x26e348,_0x1a7ac5='TP\x20DAMAGE';if(this[_0x458f8c(0x529)][_0x1a7ac5])return this[_0x458f8c(0x529)][_0x1a7ac5];let _0x16a883='';return _0x16a883+='%1'['format'](this[_0x458f8c(0x4cf)]['gainTP']),_0x16a883;},Window_ShopStatus['prototype'][_0x26e348(0x4e9)]=function(_0x3b783b,_0xf4e64c,_0x29cd80){const _0x45adea=_0x26e348,_0x22e6bd=_0x45adea(0x504);if(!this[_0x45adea(0x4cf)][_0x45adea(0x564)]&&!this[_0x45adea(0x529)][_0x22e6bd])return![];const _0x1ffa3f=this[_0x45adea(0x1fc)]();this[_0x45adea(0x349)](_0x1ffa3f,_0x3b783b,_0xf4e64c,_0x29cd80,!![]);const _0x22a342=this['getItemEffectsAddedStatesBuffsText']();return this[_0x45adea(0x349)](_0x22a342,_0x3b783b,_0xf4e64c,_0x29cd80,![],_0x45adea(0x652)),this[_0x45adea(0x608)](_0x3b783b,_0xf4e64c,_0x29cd80),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x26e348(0x462)]['getItemEffectsAddedStatesBuffsLabel']=function(){const _0x2d2a89=_0x26e348;return VisuMZ[_0x2d2a89(0x340)]['Settings'][_0x2d2a89(0x1da)]['LabelApply'];},Window_ShopStatus['prototype'][_0x26e348(0x267)]=function(){const _0x109930=_0x26e348,_0x3881cd=_0x109930(0x504);if(this[_0x109930(0x529)][_0x3881cd])return this['_customItemInfo'][_0x3881cd];let _0x4d18ec='',_0x39d9e5=0x0;const _0x5aefbe=0x8;for(const _0x4a3fb9 of this[_0x109930(0x4cf)][_0x109930(0x1f5)]){const _0x2b2983=$dataStates[_0x4a3fb9];if(_0x2b2983&&_0x2b2983['iconIndex']>0x0){if(_0x109930(0x581)!==_0x109930(0x581))this[_0x109930(0x5c5)]();else{_0x4d18ec+=_0x109930(0x2a0)['format'](_0x2b2983[_0x109930(0x4b8)]),_0x39d9e5++;if(_0x39d9e5>=_0x5aefbe)return _0x4d18ec;}}}for(let _0x19681f=0x0;_0x19681f<this[_0x109930(0x4cf)][_0x109930(0x3e0)][_0x109930(0x571)];_0x19681f++){const _0x2f713b=this[_0x109930(0x4cf)][_0x109930(0x3e0)][_0x19681f],_0x3df0d0=Game_BattlerBase[_0x109930(0x462)][_0x109930(0x62e)](_0x2f713b,_0x19681f);if(_0x3df0d0>0x0){_0x4d18ec+=_0x109930(0x2a0)[_0x109930(0x43f)](_0x3df0d0),_0x39d9e5++;if(_0x39d9e5>=_0x5aefbe)return _0x4d18ec;}}return _0x4d18ec;},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x33a)]=function(_0x28e941,_0x5bd2db,_0x583f1b){const _0x234626=_0x26e348,_0x3b2a9a=_0x234626(0x19e);if(!this[_0x234626(0x4cf)][_0x234626(0x5a4)]&&!this[_0x234626(0x529)][_0x3b2a9a])return![];const _0x47b3e6=this[_0x234626(0x645)]();this[_0x234626(0x349)](_0x47b3e6,_0x28e941,_0x5bd2db,_0x583f1b,!![]);const _0x45d2f9=this[_0x234626(0x295)]();return this[_0x234626(0x349)](_0x45d2f9,_0x28e941,_0x5bd2db,_0x583f1b,![],_0x234626(0x652)),this[_0x234626(0x608)](_0x28e941,_0x5bd2db,_0x583f1b),this[_0x234626(0x587)](),!![];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x645)]=function(){const _0x401706=_0x26e348;return VisuMZ[_0x401706(0x340)]['Settings'][_0x401706(0x1da)][_0x401706(0x1cd)];},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x295)]=function(){const _0x54948d=_0x26e348,_0x53fcbb='REMOVED\x20EFFECTS';if(this[_0x54948d(0x529)][_0x53fcbb])return this[_0x54948d(0x529)][_0x53fcbb];let _0x56fa5a='',_0x181a61=0x0;const _0x26b6fd=VisuMZ[_0x54948d(0x340)][_0x54948d(0x1fa)][_0x54948d(0x1da)][_0x54948d(0x357)];for(const _0x519d7b of this[_0x54948d(0x4cf)][_0x54948d(0x40a)]){const _0x5202a2=$dataStates[_0x519d7b];if(_0x5202a2&&_0x5202a2['iconIndex']>0x0){_0x56fa5a+=_0x54948d(0x2a0)[_0x54948d(0x43f)](_0x5202a2[_0x54948d(0x4b8)]),_0x181a61++;if(_0x181a61>=_0x26b6fd)return _0x56fa5a;}}for(let _0x46c035=0x0;_0x46c035<this['_itemData'][_0x54948d(0x3af)][_0x54948d(0x571)];_0x46c035++){const _0x478540=this['_itemData'][_0x54948d(0x3af)][_0x46c035],_0xeeafc2=Game_BattlerBase[_0x54948d(0x462)][_0x54948d(0x62e)](0x1,_0x478540);if(_0xeeafc2>0x0){_0x56fa5a+=_0x54948d(0x2a0)['format'](_0xeeafc2),_0x181a61++;if(_0x181a61>=_0x26b6fd)return _0x56fa5a;}}for(let _0x2a952f=0x0;_0x2a952f<this[_0x54948d(0x4cf)]['removeDebuff'][_0x54948d(0x571)];_0x2a952f++){if(_0x54948d(0x49a)!==_0x54948d(0x49a))return _0x542592[_0x54948d(0x340)][_0x54948d(0x1fa)][_0x54948d(0x35e)][_0x54948d(0x5a2)];else{const _0x20ae07=this[_0x54948d(0x4cf)][_0x54948d(0x416)][_0x2a952f],_0x1c481c=Game_BattlerBase['prototype'][_0x54948d(0x62e)](-0x1,_0x20ae07);if(_0x1c481c>0x0){if('FEpPk'!==_0x54948d(0x215)){_0x56fa5a+='\x5cI[%1]'[_0x54948d(0x43f)](_0x1c481c),_0x181a61++;if(_0x181a61>=_0x26b6fd)return _0x56fa5a;}else{const _0x43eb79=_0x2701d6(_0x1ceec5['$1'])[_0x54948d(0x1b6)](',')[_0x54948d(0x499)](_0x4931df=>_0x462ed2(_0x4931df));if(_0x43eb79['some'](_0x113d1b=>!_0x5cd999[_0x54948d(0x4b9)](_0x113d1b)))return![];}}}}return _0x56fa5a;},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x4cc)]=function(_0x2d290d,_0x3cb9e3,_0x15fdd3){const _0x3f8ba9=_0x26e348;if(this[_0x3f8ba9(0x3a3)][_0x3f8ba9(0x545)][_0x3f8ba9(0x28b)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x5a7c05=String(RegExp['$1'])[_0x3f8ba9(0x1b6)](/[\r\n]+/);for(const _0x287185 of _0x5a7c05){if(_0x287185[_0x3f8ba9(0x28b)](/(.*):[ ](.*)/i)){const _0x23d7e1=String(RegExp['$1'])[_0x3f8ba9(0x3cc)](),_0x45b286=String(RegExp['$2'])[_0x3f8ba9(0x3cc)]();this[_0x3f8ba9(0x660)](_0x23d7e1,_0x45b286,_0x2d290d,_0x3cb9e3,_0x15fdd3),_0x3cb9e3+=this[_0x3f8ba9(0x541)]();}}}return this[_0x3f8ba9(0x587)](),_0x3cb9e3;},Window_ShopStatus[_0x26e348(0x462)][_0x26e348(0x660)]=function(_0x4958b4,_0xc6b575,_0x215dd0,_0x40fdca,_0x3ec02d){const _0x1f4de7=_0x26e348;this[_0x1f4de7(0x349)](_0x4958b4,_0x215dd0,_0x40fdca,_0x3ec02d,!![]),this[_0x1f4de7(0x349)](_0xc6b575,_0x215dd0,_0x40fdca,_0x3ec02d,![],_0x1f4de7(0x652)),this[_0x1f4de7(0x608)](_0x215dd0,_0x40fdca,_0x3ec02d),this[_0x1f4de7(0x587)]();},Window_ShopStatus['prototype'][_0x26e348(0x3b5)]=function(){const _0x48e18f=_0x26e348;if(!this[_0x48e18f(0x3a3)])return;const _0x5a4150=this[_0x48e18f(0x3a3)][_0x48e18f(0x545)],_0x265db2=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x16ab9a=_0x5a4150[_0x48e18f(0x28b)](_0x265db2);if(_0x16ab9a){if('xEBRE'!==_0x48e18f(0x480))return this[_0x48e18f(0x651)]();else for(const _0x5b7ba9 of _0x16ab9a){if(_0x48e18f(0x4ae)===_0x48e18f(0x4ae)){_0x5b7ba9[_0x48e18f(0x28b)](_0x265db2);const _0x27c594=String(RegExp['$1'])[_0x48e18f(0x3cc)]()||'';if(_0x27c594==='')continue;const _0x56047f=ImageManager[_0x48e18f(0x592)](_0x27c594);_0x56047f[_0x48e18f(0x412)](this[_0x48e18f(0x47c)][_0x48e18f(0x60b)](this,_0x56047f,this['_item']));}else{if(!_0x419d13[_0x48e18f(0x2bd)](this[_0x48e18f(0x3a3)]))return![];const _0x283890=this['getItemConsumableLabel']();this['drawItemKeyData'](_0x283890,_0x8ad9ea,_0x3ab756,_0x2e54e8,!![]);const _0x5afe55=this[_0x48e18f(0x15d)]();return this[_0x48e18f(0x349)](_0x5afe55,_0x17503,_0x57c960,_0x262aad,![],_0x48e18f(0x652)),this[_0x48e18f(0x608)](_0x1bc35d,_0x358118,_0xb5bd68),this[_0x48e18f(0x587)](),!![];}}}},Window_ShopStatus['prototype'][_0x26e348(0x47c)]=function(_0x4192da,_0x25f1b1){const _0xb76f5f=_0x26e348;if(this['_item']!==_0x25f1b1)return;if(!_0x4192da)return;if(_0x4192da[_0xb76f5f(0x291)]<=0x0||_0x4192da[_0xb76f5f(0x38b)]<=0x0)return;const _0xe2a3fd=_0x25f1b1[_0xb76f5f(0x545)];let _0x26bfb3=_0xb76f5f(0x329);_0xe2a3fd['match'](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)&&(_0x26bfb3=_0xb76f5f(0x44a));const _0x29f48a=_0x26bfb3==='background'?this[_0xb76f5f(0x629)]:this[_0xb76f5f(0x439)];let _0x524e74=this[_0xb76f5f(0x2b8)],_0xb5896=this[_0xb76f5f(0x469)];if(_0xe2a3fd[_0xb76f5f(0x28b)](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)){if(_0xb76f5f(0x5f5)===_0xb76f5f(0x5f5))_0x524e74=Number(RegExp['$1']);else{const _0x5886db=_0x1e1115?_0xd4ff52(_0x3c838e):_0x5a7132[_0xb76f5f(0x4e3)](_0x51e3f5);return _0x316871[_0x5886db]||_0x1ad9e4;}}_0xe2a3fd[_0xb76f5f(0x28b)](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&(_0xb5896=Number(RegExp['$1']));_0xe2a3fd['match'](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0x524e74=Number(RegExp['$1']),_0xb5896=Number(RegExp['$2']));const _0x417efc=Math[_0xb76f5f(0x4bd)](0x1,_0x524e74/_0x4192da[_0xb76f5f(0x291)],_0xb5896/_0x4192da[_0xb76f5f(0x38b)]);let _0x4ae8ae=0x0,_0x16a9fd=0x0,_0x1f7ba6=Math[_0xb76f5f(0x160)](_0x4192da[_0xb76f5f(0x291)]*_0x417efc),_0x546101=Math[_0xb76f5f(0x160)](_0x4192da['height']*_0x417efc),_0x58ece4='center';_0xe2a3fd[_0xb76f5f(0x28b)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)&&(_0x58ece4=String(RegExp['$1'])[_0xb76f5f(0x1c9)]()[_0xb76f5f(0x3cc)]());if(_0x58ece4===_0xb76f5f(0x569)){if(_0xb76f5f(0x572)===_0xb76f5f(0x5c1)){const _0x349a72=_0x40c97c(_0xe37353['$1']);_0x1f4562['item']=this[_0xb76f5f(0x3a3)],_0x52700e['price']=_0x5ae1b7*this[_0xb76f5f(0x3c2)]();try{_0x45be37(_0x349a72);}catch(_0x3c8c1f){if(_0xd0fb32['isPlaytest']())_0x50fa87[_0xb76f5f(0x5ab)](_0x3c8c1f);}let _0x18643d=_0x14a734['price'];_0x1f430e['item']=_0x47001e,_0x3fee32['price']=_0x17671a;if(_0x954a09(_0x18643d))_0x18643d=0x0;return _0x1287dd[_0xb76f5f(0x160)](_0x18643d);}else _0x4ae8ae=0x0;}else _0x58ece4===_0xb76f5f(0x56f)?_0x4ae8ae=Math[_0xb76f5f(0x562)]((this[_0xb76f5f(0x2b8)]-_0x1f7ba6)/0x2):'rJBHX'!==_0xb76f5f(0x615)?_0x2af235=_0x1ca812[_0xb76f5f(0x340)][_0xb76f5f(0x1fa)][_0xb76f5f(0x5fb)][_0x599962]:_0x4ae8ae=this[_0xb76f5f(0x2b8)]-_0x1f7ba6;let _0x56aa6f=_0xb76f5f(0x388);if(_0xe2a3fd['match'](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)){if(_0xb76f5f(0x476)===_0xb76f5f(0x476))_0x56aa6f=String(RegExp['$1'])[_0xb76f5f(0x1c9)]()[_0xb76f5f(0x3cc)]();else return _0x30052d[_0xb76f5f(0x340)][_0xb76f5f(0x1fa)]['EquipScene']['NonRemoveETypes'];}if(_0x56aa6f===_0xb76f5f(0x1fe)){if(_0xb76f5f(0x4e7)===_0xb76f5f(0x4e7))_0x16a9fd=0x0;else return![];}else _0x56aa6f===_0xb76f5f(0x388)?_0xb76f5f(0x5b7)!==_0xb76f5f(0x49c)?_0x16a9fd=Math[_0xb76f5f(0x562)]((this[_0xb76f5f(0x469)]-_0x546101)/0x2):(_0x1ce136[_0xb76f5f(0x340)][_0xb76f5f(0x2b3)][_0xb76f5f(0x62d)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0xb76f5f(0x509)]()):_0x16a9fd=this['innerHeight']-_0x546101;_0xe2a3fd[_0xb76f5f(0x28b)](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x4ae8ae+=Number(RegExp['$1']));_0xe2a3fd[_0xb76f5f(0x28b)](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x16a9fd+=Number(RegExp['$1']));_0xe2a3fd[_0xb76f5f(0x28b)](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)&&(_0x4ae8ae+=Number(RegExp['$1']),_0x16a9fd+=Number(RegExp['$2']));let _0x2f4573=0xff;if(_0xe2a3fd['match'](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i))'BRsTR'===_0xb76f5f(0x1ee)?(_0x228d1f[_0xb76f5f(0x340)]['Scene_Shop_commandSell']['call'](this),this[_0xb76f5f(0x345)]()&&this[_0xb76f5f(0x364)](),this[_0xb76f5f(0x40c)]()&&(this[_0xb76f5f(0x4b7)][_0xb76f5f(0x15e)](0x0),this[_0xb76f5f(0x64d)]())):_0x2f4573=Number(RegExp['$1']);else _0xe2a3fd[_0xb76f5f(0x28b)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)&&(_0x2f4573=Math[_0xb76f5f(0x562)](Number(RegExp['$1'])*0.01*0xff)[_0xb76f5f(0x1a5)](0x0,0xff));_0x29f48a['paintOpacity']=_0x2f4573,_0x29f48a[_0xb76f5f(0x260)](_0x4192da,0x0,0x0,_0x4192da['width'],_0x4192da['height'],_0x4ae8ae,_0x16a9fd,_0x1f7ba6,_0x546101),_0x29f48a[_0xb76f5f(0x688)]=0xff;},VisuMZ[_0x26e348(0x340)][_0x26e348(0x4b5)]=function(_0x250e78){const _0x22b29d=_0x26e348;if(_0x250e78===null||typeof _0x250e78!==_0x22b29d(0x594))return _0x250e78;const _0x33ff2f=Array[_0x22b29d(0x21a)](_0x250e78)?[]:Object[_0x22b29d(0x602)](Object[_0x22b29d(0x632)](_0x250e78));for(const _0x2ec530 in _0x250e78){Object[_0x22b29d(0x462)]['hasOwnProperty']['call'](_0x250e78,_0x2ec530)&&(_0x33ff2f[_0x2ec530]=typeof _0x250e78[_0x2ec530]===_0x22b29d(0x594)&&_0x250e78[_0x2ec530]!==null?VisuMZ[_0x22b29d(0x340)]['deepCopy'](_0x250e78[_0x2ec530]):_0x250e78[_0x2ec530]);}return _0x33ff2f;};