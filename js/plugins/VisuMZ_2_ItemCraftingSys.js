//=============================================================================
// VisuStella MZ - Item Crafting System
// VisuMZ_2_ItemCraftingSys.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ItemCraftingSys = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemCraftingSys = VisuMZ.ItemCraftingSys || {};
VisuMZ.ItemCraftingSys.version = 1.18;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.18] [ItemCraftingSys]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Item_Crafting_System_VisuStella_MZ
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Item crafting has become a common feature in many RPG's. However, it is not
 * a feature included by default with RPG Maker MZ. This plugin adds in a scene
 * that supports item crafting, either through the main menu, or through an
 * event initiated command.
 * 
 * Craftable items are normally all available by default, but they can be
 * barred away through switch requirements. Upon crafting items, switches can
 * also be turned on/off to make a progression system if desired.
 * 
 * Item ingredients can be items, weapons, armors, and cost gold as well.
 * Multiple ingredients can be required at a time or just one. Some items can
 * also be set to only be craftable at custom crafting areas.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Adds an item crafting scene to the game.
 * * Item crafting scene can be accessible from the Main Menu or through
 *   event-based Plugin Commands.
 * * Crafting ingredients can consist of items, weapons, armors, and gold.
 * * Crafting specific items can require switches to be turned on in order to
 *   be listed in the crafting list.
 * * Upon crafting specific items, they can also turn on/off other switches,
 *   making a progression system to be possible.
 * * Custom item crafting effects can occur for those who understand JavaScript
 *   to implement.
 * * This plugin can mask the names of uncrafted items, too.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * - VisuMZ_1_ItemsEquipsCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Proxy Items
 * 
 * Proxy Items are temporary substitutes for another. When they are acquired
 * through crafting, they will turn into the item, weapon, or armor they are a
 * proxy for. Only the icon, name, help description, and status details will
 * match up. Everything else will remain separate such as the notetag data and
 * the ingredients list. This allows you to effectively have multiple ways to
 * craft the same item using different recipes.
 * 
 * For more details, look inside of the Notetags section for Proxy items.
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
 * VisuMZ_2_ShopCommonEvents
 * 
 * If VisuStella MZ's Shop Common Events is present, you can utilize its
 * Common Event function to trigger upon crafting items, weapons, and/or armors
 * to take the player outside of the shop and returning back.
 * 
 * The following notetags will become usable:
 * 
 *   <Once Craft Common Event: id>
 * 
 *   <Once Craft Common Event Switch: id>
 *   <Once Craft Common Event All Switches: id, id, id>
 *   <Once Craft Common Event Any Switches: id, id, id>
 * 
 *   <Repeat Craft Common Event: id>
 *
 *   <Repeat Craft Common Event Switch: id>
 *   <Repeat Craft Common Event All Switches: id, id, id>
 *   <Repeat Craft Common Event Any Switches: id, id, id>
 * 
 * The following Plugin Commands will become usable:
 * 
 *   Scene: Common Event Return
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
 * === General Notetags ===
 * 
 * These notetags are used to mark the item as a craftable item or as items
 * that can only be crafted through a custom crafting list.
 *
 * ---
 *
 * <Crafting Ingredients>
 *  Item id: x
 *  Item name: x
 *  Weapon id: x
 *  Weapon name: x
 *  Armor id: x
 *  Armor name: x
 *  Gold: x
 *  Category name: x
 * </Crafting Ingredients>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Turns this item/weapon/armor into a craftable item by using the listed
 *   ingredients to craft with.
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Insert/delete any number of copies of the ingredients as needed.
 * - Replace 'id' with the item/weapon/armor ID of the ingredient to be used.
 * - Replace 'name' with the name of the item/weapon/armor/category to be used.
 * - Replace 'x' with the number of ingredients needed to be used for crafting.
 * 
 * Category Rules:
 * 
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Multiples of the same category name can be used. However, the player must
 *   select different items each time.
 * - If the selected category item already exists as a static ingredient, that
 *   item cannot be selected either.
 * 
 * Examples:
 * 
 * <Crafting Ingredients>
 *  Item 5: 1
 *  Item 6: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Item Potion: 1
 *  Item Magic Water: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon 1: 4
 *  Armor 2: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon Sword: 4
 *  Armor Hat: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Category Fruit: 2
 *  Category Meat: 3
 * </Crafting Ingredients>
 * 
 * ---
 *
 * <Custom Crafting Only>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - This item can only be crafted with custom crafting lists selected through
 *   the Plugin Command.
 *
 * ---
 * 
 * === Proxy Notetags ===
 * 
 * ---
 * 
 * <Proxy: id>
 * <Proxy: name>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - REQUIRES the most up to date VisuMZ Items and Equips Core!
 * - Turns this item, weapon, or armor into a proxy for another item, allowing
 *   you to create recipes with different ingredients in <Crafting Ingredients>
 *   notetag contents and yield the same item.
 * - The proxy item itself will take on the name, icon, and description of the
 *   original item it is supposed to represent.
 * - No other properties are carried over from the original.
 * - When viewed through the Window_ShopStatus window, the contents will
 *   reference the original item and not the proxy item.
 * - Proxy items themselves cannot be acquired. This includes event commands,
 *   item drops, or equips.
 * - When crafted, the item yielded won't be the proxy item but the item it is
 *   a proxy for.
 * - Replace 'id' with a number representing the item, weapon, or armor ID of
 *   the same item type. If the proxy is an item, this will reference an item.
 *   If the proxy is a weapon, this will reference a weapon. Same for armors.
 * - Replace 'name' with text representing the item, weapon, or armor's name.
 *   The referenced item needs to be the same item type as the proxy. Item for
 *   item, weapon for weapon, armor for armor.
 * 
 * ---
 * 
 * === Switch-Related Notetags ===
 * 
 * These notetags can make item crafting require certain switches to be on,
 * or turn switches on/off upon crafting items.
 *
 * ---
 *
 * <Crafting Show Switch: x>
 * 
 * <Crafting Show All Switches: x,x,x>
 * <Crafting Show Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the craftable item in the crafting scene.
 * - Replace 'x' with the switch ID to determine the item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - Insert as many switch ID's as needed.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting Turn On Switch: x>
 * <Crafting Turn On Switches: x,x,x>
 * 
 * <Crafting Turn Off Switch: x>
 * <Crafting Turn Off Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Upon crafting this item, turn on/off the marked switch(es).
 * - Replace 'x' with the switch ID to turn on/off.
 *
 * ---
 * 
 * === Masking-Related Notetags ===
 * 
 * These notetags can are used to determine name-masking properties for
 * uncrafted items.
 *
 * ---
 *
 * <Crafting Mask: text>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Displays the specific 'text' when the item has not yet been crafted.
 * - Replace 'text' with the text you wish to display if the item has not yet
 *   been crafted by the player.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting No Mask>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Bypasses name masking even if the item has not yet been crafted.
 *
 * ---
 * 
 * === JavaScript Notetag: Effect-Related ===
 * 
 * The following are notetags made for users with JavaScript knowledge to
 * make custom effects that occur upon crafting the item.
 *
 * ---
 *
 * <JS Crafting Effect>
 *  code
 *  code
 *  code
 * </JS Crafting Effect>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' with JavaScript code to determine what kinds of effects you
 *   want to occur upon crafting this item.
 * - The 'item' variable represents the item being crafted.
 * - The 'number' variable represents the number of items being crafted.
 *
 * ---
 * 
 * === Crafting Animation-Related Notetags ===
 * 
 * These notetags let you set custom crafting animations when a specific item,
 * weapon, or armor is crafted so that way, they don't all have to use the
 * default crafting animation from the plugin parameters.
 * 
 * ---
 * 
 * <Crafting Animation: id>
 * <Crafting Animation: id, id, id>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Plays the animation(s) when this item, weapon, or armor is crafted.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 * 
 * ---
 * 
 * <Crafting Fade Speed: x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - This determines the speed at which the item's icon fades in during the
 *   crafting animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
 * 
 * ---
 * 
 * <Crafting Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   item, weapon, or armor's icon during crafting instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of crafting, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === Crafting Common Event Notetags ===
 * 
 * ---
 *
 * <Once Craft Common Event: id>
 * <Repeat Craft Common Event: id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires VisuMZ_2_ShopCommonEvents!
 * - This will cause a specific Common Event to launch when crafted.
 * - Replace 'id' with a number representing the ID of the Common Event that
 *   you wish to launch upon this item being crafted.
 * - The "Once" notetag variant will only occur once when crafted.
 *   - Any subsequent purchases of the item will not launch the Common Event.
 * - The "Repeat" notetag variant will occur repeatedly when crafted.
 * - If both "Once" and "Repeat" notetags are present in the item, then the
 *   "Once" variant will take priority first. Any subsequent purchases will go
 *   to the "Repeat" variant.
 * - Any switch requirement notetags need to be met in order for either
 *   notetag to have any effect.
 * - Use the Plugin Command "Scene: Common Event Return" to return back to the
 *   last Item Crafting scene.
 *
 * ---
 * 
 * === Crafting Common Event Requirement-Related Notetags ===
 * 
 * ---
 *
 * <Once Craft Common Event Switch: id>
 * <Once Craft Common Event All Switches: id, id, id>
 * <Once Craft Common Event Any Switches: id, id, id>
 *
 * <Repeat Craft Common Event Switch: id>
 * <Repeat Craft Common Event All Switches: id, id, id>
 * <Repeat Craft Common Event Any Switches: id, id, id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires the respective Craft Common Events to have these Switches enabled
 *   in the "ON" position in order for them to launch.
 *   - "Once" variant will only affect the "Once" notetag variants.
 *   - "Repeat" variant will only affect the "Repeat" notetag variants.
 * - The "All" variant will require all listed Switch ID's to be "ON".
 * - The "Any" variant will require only one listed Switch ID to be "ON".
 * - Replace 'id' with a number representing the Switch ID that needs to be in
 *   the "ON" position for the requirement to be met.
 *   - Insert multiple 'id' to require more Switch ID's.
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
 * === Scene ===
 * 
 * ---
 *
 * Scene: Item Crafting (All)
 * - Go to the Item Crafting scene.
 * - All enabled recipes will be available.
 *
 * ---
 *
 * Scene: Item Crafting (Custom)
 * - Go to the Item Crafting scene.
 * - Select specific items to craft here.
 * - Some items can only appear through custom lists like this by using the
 *   <Custom Crafting Only> notetag.
 *
 *   Items:
 *   - Select which Item ID(s) to become craftable.
 *
 *   Weapons:
 *   - Select which Weapon ID(s) to become craftable.
 *
 *   Armors:
 *   - Select which armor ID(s) to become craftable.
 *
 *   Bypass Switches?:
 *   - Bypass any of the requirement switches?
 *
 *   Bypass Masks?:
 *   - Bypass name masking for uncrafted items?
 *
 * ---
 * 
 * Scene: Common Event Return
 * - Return to the last shop if coming from a Crafting Common Event.
 * - Requires VisuMZ_2_ShopCommonEvents!
 * 
 * ---
 * 
 * === System ===
 * 
 * ---
 *
 * System: Enable Crafting in Menu?
 * - Enables/disables Crafting menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Crafting menu inside the main menu.
 *
 * ---
 *
 * System: Show Crafting in Menu?
 * - Shows/hides Crafting menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Crafting menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings pertaining to Item Crafting.
 *
 * ---
 *
 * Scene_ItemCrafting
 * 
 *   Assist Button:
 *   - Text used to for the Button Assist Window's OK button when about ready
 *     to craft an item.
 * 
 *   Crafted Icon:
 *   - Icon used to depict of an item has already been crafted.
 * 
 *   Ingredient Bridge:
 *   - Text used to bridge ingredients in the item crafting scene.
 *
 * ---
 * 
 * Switches
 * 
 *   Switch: Craft:
 *   - Crafting items in Crafting Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Crafting Scene opens.
 * 
 * ---
 * 
 * Categories
 * 
 *   Category Title:
 *   - Text format used for display categories.
 *   - %1 - Category Name, %2 - Needed Quantity
 * 
 *   Selected Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Selected Text:
 *   - This is the add on text that is displayed after an item's name that's
 *     already an ingredient.
 * 
 *   Uncategorized Text:
 *   - Text used for an uncategorized item category.
 * 
 *   Uncategorized Icon:
 *   - Icon used for uncategorized item category.
 * 
 * ---
 * 
 * Vocabulary
 * 
 *   Owned:
 *   -Text used for how much of an item is owned.
 * 
 *   Shift:
 *   - Text used for the change in value.
 * 
 *   Net:
 *   - Text used for the net result.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Listing:
 *   - Code that is run globally across all items when checking if an item
 *     should be listed or not.
 * 
 *   JS: Craft Effect:
 *   - Code that is run globally across all items when crafted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Masking Settings
 * ============================================================================
 *
 * Masking settings related to uncrafted items.
 *
 * ---
 *
 * Masking
 * 
 *   Enable Masking:
 *   - Enable masking for uncrafted items?
 * 
 *   Italics For Masking:
 *   - Use Italics when masking?
 * 
 *   Mask Character:
 *   - Text used for masking per individual character.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Main Menu settings for Item Crafting.
 *
 * ---
 *
 * Main Menu
 * 
 *   Command Name:
 *   - Name of the 'Crafting' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Crafting' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Crafting' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Default settings for playing animations after crafting.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when crafting an item?
 * 
 *   Show Windows?:
 *   - Show windows during an item crafting animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when crafting.
 *
 * ---
 *
 * Sprite
 * 
 *   Scale:
 *   - How big do you want the item sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the item to fade in?
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Crafting Sound Settings
 * ============================================================================
 *
 * Default settings for the sound effect played when crafting an item.
 *
 * ---
 *
 * Sound
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ItemCrafting.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   Background 2:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings pertaining to Item Crafting.
 *
 * ---
 *
 * Windows
 * 
 *   Requirement Font Size:
 *   - Font size used for requirement quantity.
 * 
 *   Show Tooltips:
 *   - Show tooltips when the mouse hovers over an ingredient?
 * 
 *   Custom Window Skin:
 *   - Select a custom window skin if you want the tooltip window to have one.
 *
 * ---
 *
 * Background Types
 * 
 *   Help Window:
 *   Category Window:
 *   Gold Window:
 *   List Window:
 *   Status Window:
 *   Ingredient Title:
 *   Ingredient List:
 *   Number Window:
 *   Button Assist Window:
 *   - Select background type for the specific window.
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
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
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
 * Version 1.18: August 4, 2022
 * * Bug Fixes!
 * ** Crafting an item on a different tab than the first will no longer reset
 *    back to the first tab. Fix made by Irina.
 * 
 * Version 1.17: July 14, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: May 12, 2022
 * * Compatibility Update
 * ** Compatibility with VisuMZ Shop Common Events added.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag effects added by Irina and sponsored by MirageV:
 * *** <Once Craft Common Event: id>
 * *** <Repeat Craft Common Event: id>
 * **** Requires VisuMZ_2_ShopCommonEvents!
 * **** This will cause a specific Common Event to launch when crafted.
 * *** <Once Craft Common Event Switch: id>
 * *** <Once Craft Common Event All Switches: id, id, id>
 * *** <Once Craft Common Event Any Switches: id, id, id>
 * *** <Repeat Craft Common Event Switch: id>
 * *** <Repeat Craft Common Event All Switches: id, id, id>
 * *** <Repeat Craft Common Event Any Switches: id, id, id>
 * **** Requires the respective Craft Common Events to have these Switches
 *      enabled in the "ON" position in order for them to launch.
 * ** New Plugin Command added by Irina and sponsored by MirageV:
 * *** Scene: Common Event Return
 * **** Requires VisuMZ_2_ShopCommonEvents!
 * **** Return to the last shop if coming from a Crafting Common Event.
 * 
 * Version 1.15: April 7, 2022
 * * Feature Update!
 * ** Any disappearing categories as a result of hiding recipes after crafting
 *    an item will result in the first category being selected.
 * 
 * Version 1.14: March 31, 2022
 * * Feature Update!
 * ** Failsafe added for situations where if the game dev decides to force an
 *    impossible situation in the Item Crafting scene (such as turning on a
 *    switch that erases all recipes), then the Item Scene will automatically
 *    exit out of it with zero prompts. Update made by Olivia.
 * 
 * Version 1.13: January 20, 2022
 * * Bug Fixes!
 * ** Tooltips for proxy items no longer show the original item's materials.
 *    Fix made by Olivia.
 * 
 * Version 1.12: December 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added Major Changes section for "Proxy Items".
 * * Feature Update!
 * ** Number window is now updated to show how much of an ingredient the player
 *    owns, how much will be consumed, and the number result of the crafting.
 * * New Features!
 * ** New notetags added by Arisu!
 * *** <Proxy: id>
 * *** <Proxy: name>
 * **** REQUIRES the most up to date VisuMZ Items and Equips Core!
 * **** Turns this item, weapon, or armor into a proxy for another item,
 *      allowing you to create recipes with different ingredients in
 *      <Crafting Ingredients> notetag contents and yield the same item.
 * **** The proxy item itself will take on the name, icon, and description of
 *      the original item it is supposed to represent.
 * **** No other properties are carried over from the original.
 * **** When viewed through the Window_ShopStatus window, the contents will
 *      reference the original item and not the proxy item.
 * **** Proxy items themselves cannot be acquired. This includes event
 *      commands, item drops, or equips.
 * **** When crafted, the item yielded won't be the proxy item but the item it
 *      is a proxy for.
 * **** Replace 'id' with a number representing the item, weapon, or armor ID
 *      of the same item type. If the proxy is an item, this will reference an
 *      item. If the proxy is a weapon, this will reference a weapon. Same for
 *      armors.
 * **** Replace 'name' with text representing the item, weapon, or armor's
 *      name. The referenced item needs to be the same item type as the proxy.
 *      Item for item, weapon for weapon, armor for armor.
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > General > Vocab > Owned
 * *** Plugin Parameters > General > Vocab > Shift
 * *** Plugin Parameters > General > Vocab > Net
 * **** These are new vocabulary terms for the new number window appearance.
 * 
 * Version 1.11: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.10: June 25, 2021
 * * Bug Fixes!
 * ** When exiting out of the ingredients list back towards the item selection
 *    window, the help window should now be properly updated. Fix by Irina.
 * 
 * Version 1.09: March 12, 2021
 * * Bug Fixes!
 * ** Having extra spaces before an ingredient's name should no longer cause
 *    problems to information parsing. Fix made by Irina.
 * 
 * Version 1.08: March 5, 2021
 * * Feature Update!
 * ** Plugin Commands and Item Crafting Scene option will not appear if you do
 *    not have any recipes prepared at all in your game. Update made by Irina.
 * 
 * Version 1.07: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > General Settings > Switches > Switch: Craft
 * **** Crafting items in Crafting Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Crafting Scene opens.
 * **** This can be used after an "Item Crafting" plugin command to determine
 *      if the player has crafted an item or not.
 * 
 * Version 1.06: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Crafting Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      item, weapon, or armor's icon during crafting instead.
 * 
 * Version 1.05: November 29, 2020
 * * Bug Fixes!
 * ** If on-screen touch buttons are disabled, they will no longer cause crash
 *    errors. Fix made by Arisu.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 8, 2020
 * * Feature Update!
 * ** Animations are now more compatible with the sprites. Update by Irina.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Masked Names no longer show in the number input window. Fixed by Irina.
 * ** Plugin no longer requires a new game to be started in order for Item
 *    Crafting to work for the main menu. Fix made by Irina.
 * ** Touch Button for OK will no longer bypass the item requirements.
 *    Fix made by Irina.
 * ** Uncategorized items will now default to a newly created Uncategorized
 *    list of items. Fix made by Irina.
 * * Documentation Update!
 * ** Plugin Parameters > General is updated with "Uncategorized Text" and
 *    "Uncategorized Icon" for uncategorized items.
 *
 * Version 1.01: October 18, 2020
 * * Feature Update!
 * ** Bounce SFX pitch plugin parameter is now uncapped.
 * * Bug Fixes!
 * ** Color matches no longer crash the game if the matching amount is set to
 *    zero. Bug fixed by Yanfly.
 * ** Selecting a category without modern controls will now activate the list
 *    window. Bug fixed by Yanfly.
 * ** The Category Window no longer disappears when there's only one
 *    category. Bug fixed by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.00 Official Release Date: November 2, 2020
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
 * @command ItemCraftingSceneOpen
 * @text Scene: Item Crafting (All)
 * @desc Go to the Item Crafting scene.
 * All enabled recipes will be available.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CustomItemCraftingSceneOpen
 * @text Scene: Item Crafting (Custom)
 * @desc Go to the Item Crafting scene.
 * Select specific items to craft here.
 * 
 * @arg Contents
 *
 * @arg Items:arraynum
 * @text Items
 * @type item[]
 * @parent Contents
 * @desc Select which Item ID(s) to become craftable.
 * @default []
 *
 * @arg Weapons:arraynum
 * @text Weapons
 * @type weapon[]
 * @parent Contents
 * @desc Select which Weapon ID(s) to become craftable.
 * @default []
 *
 * @arg Armors:arraynum
 * @text Armors
 * @type armor[]
 * @parent Contents
 * @desc Select which armor ID(s) to become craftable.
 * @default []
 * 
 * @arg Settings
 *
 * @arg BypassSwitches:eval
 * @text Bypass Switches?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass any of the requirement switches?
 * @default false
 *
 * @arg BypassMasks:eval
 * @text Bypass Masks?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass name masking for uncrafted items?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ReturnToLastCrafting
 * @text Scene: Common Event Return
 * @desc Return to the last shop if coming from a Crafting Common Event.
 * Requires VisuMZ_2_ShopCommonEvents!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableItemCraftingMenu
 * @text System: Enable Crafting in Menu?
 * @desc Enables/disables Crafting menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Crafting menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowItemCraftingMenu
 * @text System: Show Crafting in Menu?
 * @desc Shows/hides Crafting menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Crafting menu inside the main menu.
 * @default true
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
 * @param ItemCraftingSys
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to Item Crafting.
 * @default {"Scene":"","CraftAssistButton:str":"Craft","CraftedIcon:num":"223","IngredientBridge:str":"+","Categories":"","CategoryIcon:num":"16","CategoryTitle:str":"Pick %1 Type (Quantity: %2)","SelectedColor:str":"17","SelectedText:str":" (Selected)","Uncategorized:str":"Uncategorized","NoCategoryIcon:num":"160","JS":"","jsGlobalListing:func":"\"// Declare Variables\\nlet item = arguments[0]; // This is the item being crafted.\\nlet listed = true;       // Default listing value.\\n\\n// Perform Checks\\n\\n\\n// Return Boolean\\nreturn listed;\"","jsGlobalCraftEffect:func":"\"// Declare Variables\\nlet item = arguments[0];   // This is the item being crafted.\\nlet number = arguments[1]; // This is the number of them being crafted.\\n\\n// Perform Actions\""}
 *
 * @param Mask:struct
 * @text Masking Settings
 * @type struct<Mask>
 * @desc Masking settings related to uncrafted items.
 * @default {"Enable:eval":"true","MaskItalics:eval":"true","MaskLetter:str":"?"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Main Menu settings for Item Crafting.
 * @default {"Name:str":"Crafting","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 * 
 * @param Animation:struct
 * @text Animation Settings
 * @type struct<Animation>
 * @desc Default settings for playing animations after crafting.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"false","Animations:arraynum":"[\"44\",\"47\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Crafting Sound Settings
 * @type struct<Sound>
 * @desc Default settings for the sound effect played when crafting an item.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ItemCrafting.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Window settings for Scene_ItemCrafting.
 * The window positions are the same as Scene_Shop.
 * @default {"ReqQuantityFontSize:num":"18","ToolTips:eval":"true","name:str":"","BgTypes":"","HelpBgType:num":"0","CategoryBgType:num":"0","GoldBgType:num":"0","ListBgType:num":"0","StatusBgType:num":"0","IngredientTitle:num":"0","IngredientList:num":"0","NumberBgType:num":"0","ButtonAssistBgType:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param Scene
 * @text Scene_ItemCrafting
 *
 * @param CraftAssistButton:str
 * @text Assist Button
 * @parent Scene
 * @desc Text used to for the Button Assist Window's OK button when about ready to craft an item.
 * @default Craft
 *
 * @param CraftedIcon:num
 * @text Crafted Icon
 * @parent Scene
 * @desc Icon used to depict of an item has already been crafted.
 * @default 223
 *
 * @param IngredientBridge:str
 * @text Ingredient Bridge
 * @parent Scene
 * @desc Text used to bridge ingredients in the item crafting scene.
 * @default +
 *
 * @param Switches
 *
 * @param SwitchCraft:num
 * @text Switch: Craft
 * @parent Switches
 * @type switch
 * @desc Crafting items in Crafting Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Crafting Scene opens.
 * @default 0
 * 
 * @param Categories
 *
 * @param CategoryIcon:num
 * @text Category Icon
 * @parent Categories
 * @desc Icon used for open-ended ingredients.
 * @default 16
 *
 * @param CategoryTitle:str
 * @text Category Title
 * @parent Categories
 * @desc Text format used for display categories.
 * %1 - Category Name, %2 - Needed Quantity
 * @default Pick %1 Type (Quantity: %2)
 *
 * @param SelectedColor:str
 * @text Selected Color
 * @parent Categories
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param SelectedText:str
 * @text Selected Text
 * @parent Categories
 * @desc This is the add on text that is displayed after an
 * item's name that's already an ingredient.
 * @default  (Selected)
 *
 * @param Uncategorized:str
 * @text Uncategorized Text
 * @parent Categories
 * @desc Text used for an uncategorized item category.
 * @default Uncategorized
 *
 * @param NoCategoryIcon:num
 * @text Uncategorized Icon
 * @parent Categories
 * @desc Icon used for uncategorized item category.
 * @default 160
 * 
 * @param Vocab
 * @text Vocabulary
 *
 * @param NumWindowOwned:str
 * @text Owned
 * @parent Vocab
 * @desc Text used for how much of an item is owned.
 * @default Owned
 *
 * @param NumWindowShift:str
 * @text Shift
 * @parent Vocab
 * @desc Text used for the change in value.
 * @default Change
 *
 * @param NumWindowNet:str
 * @text Net
 * @parent Vocab
 * @desc Text used for the net result.
 * @default Net
 *
 * @param JS
 * @text Global JS Effects
 *
 * @param jsGlobalListing:func
 * @text JS: Listing
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when checking if an item should be listed or not.
 * @default "// Declare Variables\nlet item = arguments[0]; // This is the item being crafted.\nlet listed = true;       // Default listing value.\n\n// Perform Checks\n\n\n// Return Boolean\nreturn listed;"
 *
 * @param jsGlobalCraftEffect:func
 * @text JS: Craft Effect
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when crafted.
 * @default "// Declare Variables\nlet item = arguments[0];   // This is the item being crafted.\nlet number = arguments[1]; // This is the number of them being crafted.\n\n// Perform Actions"
 *
 */
/* ----------------------------------------------------------------------------
 * Masking Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mask:
 *
 * @param Enable:eval
 * @text Enable Masking
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable masking for uncrafted items?
 * @default true
 *
 * @param MaskItalics:eval
 * @text Italics For Masking
 * @type boolean
 * @on Italics
 * @off Normal
 * @desc Use Italics when masking?
 * @default true
 *
 * @param MaskLetter:str
 * @text Mask Character
 * @desc Text used for masking per individual character.
 * @default ?
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Crafting' option in the Main Menu.
 * @default Crafting
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Animation:
 *
 * @param General
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @parent General
 * @type boolean
 * @on Show
 * @off Skip
 * @desc Show animations when crafting an item?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during an item crafting animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when crafting.
 * @default ["44","47"]
 *
 * @param Sprite
 * @text Item Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the item sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the item to fade in?
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Skill2
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @max 100
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param ReqQuantityFontSize:num
 * @text Requirement Font Size
 * @parent Windows
 * @desc Font size used for requirement quantity.
 * @default 18
 *
 * @param ToolTips:eval
 * @text Show Tooltips
 * @parent Windows
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show tooltips when the mouse hovers over an ingredient?
 * @default true
 *
 * @param name:str
 * @text Custom Window Skin
 * @parent ToolTips:eval
 * @type file
 * @dir img/system/
 * @desc Select a custom window skin if you want the tooltip window to have one.
 * @default 
 *
 * @param BgTypes
 * @text Background Types
 * @parent Windows
 *
 * @param HelpBgType:num
 * @text Help Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Help Window.
 * @default 0
 *
 * @param CategoryBgType:num
 * @text Category Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Category Window.
 * @default 0
 *
 * @param GoldBgType:num
 * @text Gold Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Gold Window.
 * @default 0
 *
 * @param ListBgType:num
 * @text List Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the List Window.
 * @default 0
 *
 * @param StatusBgType:num
 * @text Status Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Status Window.
 * @default 0
 *
 * @param IngredientTitle:num
 * @text Ingredient Title
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient Title Window.
 * @default 0
 *
 * @param IngredientList:num
 * @text Ingredient List
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient List Window.
 * @default 0
 *
 * @param NumberBgType:num
 * @text Number Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 * @param ButtonAssistBgType:num
 * @text Button Assist Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 */
//=============================================================================

const _0x2332e4=_0x401c;(function(_0x4da400,_0x2db3c5){const _0x2446af=_0x401c,_0x38a5e7=_0x4da400();while(!![]){try{const _0x5a7792=-parseInt(_0x2446af(0xf7))/0x1+-parseInt(_0x2446af(0x142))/0x2*(parseInt(_0x2446af(0xad))/0x3)+-parseInt(_0x2446af(0x2c5))/0x4+-parseInt(_0x2446af(0x2cd))/0x5+parseInt(_0x2446af(0x193))/0x6*(parseInt(_0x2446af(0x17d))/0x7)+parseInt(_0x2446af(0x2bc))/0x8+parseInt(_0x2446af(0x85))/0x9;if(_0x5a7792===_0x2db3c5)break;else _0x38a5e7['push'](_0x38a5e7['shift']());}catch(_0x32c536){_0x38a5e7['push'](_0x38a5e7['shift']());}}}(_0xda32,0xd2eb3));var label=_0x2332e4(0x19a),tier=tier||0x0,dependencies=[_0x2332e4(0x16a)],pluginData=$plugins[_0x2332e4(0x106)](function(_0x47fdb6){const _0x17ca46=_0x2332e4;return _0x47fdb6[_0x17ca46(0x260)]&&_0x47fdb6[_0x17ca46(0x19e)][_0x17ca46(0x6b)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x2332e4(0x2ae)]||{},VisuMZ[_0x2332e4(0x2a1)]=function(_0x3ac6ed,_0x10d577){const _0x81ea3c=_0x2332e4;for(const _0x4695f7 in _0x10d577){if(_0x81ea3c(0x127)===_0x81ea3c(0x274))_0x8922a1[_0x81ea3c(0x2cb)](_0x3598c7);else{if(_0x4695f7[_0x81ea3c(0x277)](/(.*):(.*)/i)){const _0x44f79e=String(RegExp['$1']),_0x1941cc=String(RegExp['$2'])['toUpperCase']()[_0x81ea3c(0x202)]();let _0x2c89ce,_0x4fa51d,_0x4d9b1c;switch(_0x1941cc){case _0x81ea3c(0xd8):_0x2c89ce=_0x10d577[_0x4695f7]!==''?Number(_0x10d577[_0x4695f7]):0x0;break;case _0x81ea3c(0xff):_0x4fa51d=_0x10d577[_0x4695f7]!==''?JSON[_0x81ea3c(0x28c)](_0x10d577[_0x4695f7]):[],_0x2c89ce=_0x4fa51d[_0x81ea3c(0x8b)](_0x519397=>Number(_0x519397));break;case _0x81ea3c(0x136):_0x2c89ce=_0x10d577[_0x4695f7]!==''?eval(_0x10d577[_0x4695f7]):null;break;case _0x81ea3c(0x2b8):_0x4fa51d=_0x10d577[_0x4695f7]!==''?JSON[_0x81ea3c(0x28c)](_0x10d577[_0x4695f7]):[],_0x2c89ce=_0x4fa51d[_0x81ea3c(0x8b)](_0x28dd23=>eval(_0x28dd23));break;case _0x81ea3c(0x19c):_0x2c89ce=_0x10d577[_0x4695f7]!==''?JSON[_0x81ea3c(0x28c)](_0x10d577[_0x4695f7]):'';break;case _0x81ea3c(0x299):_0x4fa51d=_0x10d577[_0x4695f7]!==''?JSON[_0x81ea3c(0x28c)](_0x10d577[_0x4695f7]):[],_0x2c89ce=_0x4fa51d[_0x81ea3c(0x8b)](_0x31b320=>JSON[_0x81ea3c(0x28c)](_0x31b320));break;case _0x81ea3c(0x1fe):_0x2c89ce=_0x10d577[_0x4695f7]!==''?new Function(JSON[_0x81ea3c(0x28c)](_0x10d577[_0x4695f7])):new Function('return\x200');break;case _0x81ea3c(0x1b9):_0x4fa51d=_0x10d577[_0x4695f7]!==''?JSON[_0x81ea3c(0x28c)](_0x10d577[_0x4695f7]):[],_0x2c89ce=_0x4fa51d[_0x81ea3c(0x8b)](_0x53f973=>new Function(JSON['parse'](_0x53f973)));break;case _0x81ea3c(0x264):_0x2c89ce=_0x10d577[_0x4695f7]!==''?String(_0x10d577[_0x4695f7]):'';break;case _0x81ea3c(0x16f):_0x4fa51d=_0x10d577[_0x4695f7]!==''?JSON[_0x81ea3c(0x28c)](_0x10d577[_0x4695f7]):[],_0x2c89ce=_0x4fa51d[_0x81ea3c(0x8b)](_0x78e095=>String(_0x78e095));break;case'STRUCT':_0x4d9b1c=_0x10d577[_0x4695f7]!==''?JSON['parse'](_0x10d577[_0x4695f7]):{},_0x2c89ce=VisuMZ[_0x81ea3c(0x2a1)]({},_0x4d9b1c);break;case'ARRAYSTRUCT':_0x4fa51d=_0x10d577[_0x4695f7]!==''?JSON[_0x81ea3c(0x28c)](_0x10d577[_0x4695f7]):[],_0x2c89ce=_0x4fa51d['map'](_0x3b9ba3=>VisuMZ[_0x81ea3c(0x2a1)]({},JSON[_0x81ea3c(0x28c)](_0x3b9ba3)));break;default:continue;}_0x3ac6ed[_0x44f79e]=_0x2c89ce;}}}return _0x3ac6ed;},(_0x317c9c=>{const _0x3bcc51=_0x2332e4,_0x5d44a9=_0x317c9c['name'];for(const _0x26f7f9 of dependencies){if(!Imported[_0x26f7f9]){if(_0x3bcc51(0x86)===_0x3bcc51(0x86)){alert(_0x3bcc51(0x2d3)[_0x3bcc51(0x1e6)](_0x5d44a9,_0x26f7f9)),SceneManager['exit']();break;}else _0x4a6219[_0x3bcc51(0xec)](),this['onIngredientListCancel']();}}const _0x5c6e59=_0x317c9c[_0x3bcc51(0x19e)];if(_0x5c6e59[_0x3bcc51(0x277)](/\[Version[ ](.*?)\]/i)){if(_0x3bcc51(0x215)===_0x3bcc51(0x215)){const _0x3a9c81=Number(RegExp['$1']);_0x3a9c81!==VisuMZ[label][_0x3bcc51(0xfb)]&&(_0x3bcc51(0xae)==='XsjMu'?(alert(_0x3bcc51(0x223)[_0x3bcc51(0x1e6)](_0x5d44a9,_0x3a9c81)),SceneManager[_0x3bcc51(0x20a)]()):this[_0x3bcc51(0x252)][_0x3bcc51(0x1d8)](_0x49dee0[_0x3bcc51(0xa7)]));}else _0x3dd9ac=_0x2ee8ed[_0x3bcc51(0x1ec)](_0x5492e7);}if(_0x5c6e59[_0x3bcc51(0x277)](/\[Tier[ ](\d+)\]/i)){const _0x4dce70=Number(RegExp['$1']);_0x4dce70<tier?(alert(_0x3bcc51(0x2cf)[_0x3bcc51(0x1e6)](_0x5d44a9,_0x4dce70,tier)),SceneManager['exit']()):_0x3bcc51(0xbe)!==_0x3bcc51(0x1fd)?tier=Math['max'](_0x4dce70,tier):(_0x24f9e3[_0x3bcc51(0x112)][_0x3bcc51(0x1e8)][_0x3bcc51(0x281)](this),this[_0x3bcc51(0x1e1)](),this['createNumberWindow'](),this[_0x3bcc51(0x137)](),this[_0x3bcc51(0x7c)](),this[_0x3bcc51(0x1c7)]()&&this['onCategoryOk'](),this['setWindowBackgroundTypes'](),this[_0x3bcc51(0x119)]());}VisuMZ['ConvertParams'](VisuMZ[label][_0x3bcc51(0x2ae)],_0x317c9c[_0x3bcc51(0x141)]);})(pluginData);if(VisuMZ[_0x2332e4(0x1aa)][_0x2332e4(0xfb)]<1.38){let text='';text+=_0x2332e4(0x272),text+=_0x2332e4(0x259),alert(text),SceneManager['exit']();}VisuMZ[_0x2332e4(0x19a)]['WarningMsg']=_0x2332e4(0x108),PluginManager['registerCommand'](pluginData[_0x2332e4(0x17a)],'ItemCraftingSceneOpen',_0x32f487=>{const _0x33c8db=_0x2332e4;if(SceneManager['isSceneBattle']())return;if(SceneManager[_0x33c8db(0x211)]())return;if($gameSystem[_0x33c8db(0x236)])return;if(DataManager[_0x33c8db(0x2d2)]()[_0x33c8db(0x243)]<=0x0){if($gameTemp[_0x33c8db(0x1cf)]()){if('dsRkp'===_0x33c8db(0xd1))alert(VisuMZ['ItemCraftingSys'][_0x33c8db(0x226)]);else{if(this[_0x33c8db(0x25c)]===_0x5d3d39)this[_0x33c8db(0x12c)]();return this[_0x33c8db(0x25c)][_0x33c8db(0x17f)];}}return;}SceneManager[_0x33c8db(0x2cb)](Scene_ItemCrafting);}),PluginManager['registerCommand'](pluginData[_0x2332e4(0x17a)],'CustomItemCraftingSceneOpen',_0x40ce02=>{const _0xb44d5=_0x2332e4;if(SceneManager['isSceneBattle']())return;if(SceneManager[_0xb44d5(0x211)]())return;if($gameSystem[_0xb44d5(0x236)])return;VisuMZ[_0xb44d5(0x2a1)](_0x40ce02,_0x40ce02);const _0x4849ea={'items':_0x40ce02['Items'][_0xb44d5(0x8b)](_0x1eb51c=>$dataItems[_0x1eb51c])['filter'](_0x9bb23a=>DataManager[_0xb44d5(0x2bd)]()['includes'](_0x9bb23a)),'weapons':_0x40ce02[_0xb44d5(0xcd)][_0xb44d5(0x8b)](_0x498845=>$dataWeapons[_0x498845])[_0xb44d5(0x106)](_0x591573=>DataManager[_0xb44d5(0x1cb)]()['includes'](_0x591573)),'armors':_0x40ce02[_0xb44d5(0x2cc)][_0xb44d5(0x8b)](_0x29f974=>$dataArmors[_0x29f974])[_0xb44d5(0x106)](_0x276dfc=>DataManager['allCraftableArmors']()['includes'](_0x276dfc)),'BypassSwitches':_0x40ce02[_0xb44d5(0x156)],'BypassMasks':_0x40ce02[_0xb44d5(0x2b0)]};_0x4849ea[_0xb44d5(0x232)]=_0x4849ea[_0xb44d5(0xba)][_0xb44d5(0xf6)](_0x4849ea[_0xb44d5(0xc9)],_0x4849ea[_0xb44d5(0x21f)]);if(_0x4849ea[_0xb44d5(0x232)][_0xb44d5(0x243)]<=0x0){$gameTemp['isPlaytest']()&&alert(VisuMZ['ItemCraftingSys'][_0xb44d5(0x226)]);return;}$gameTemp['setCustomItemCraftingSettings'](_0x4849ea),SceneManager[_0xb44d5(0x2cb)](Scene_ItemCrafting);}),PluginManager[_0x2332e4(0xa4)](pluginData[_0x2332e4(0x17a)],_0x2332e4(0x23a),_0x4954f8=>{const _0xb40fcd=_0x2332e4;if(!SceneManager[_0xb40fcd(0x125)]())return;if(!$gameSystem[_0xb40fcd(0x236)])return;$gameSystem[_0xb40fcd(0x236)]=undefined,SceneManager[_0xb40fcd(0x2cb)](Scene_ItemCrafting);}),PluginManager[_0x2332e4(0xa4)](pluginData['name'],_0x2332e4(0x270),_0x32076d=>{const _0x23e713=_0x2332e4;VisuMZ[_0x23e713(0x2a1)](_0x32076d,_0x32076d),$gameSystem[_0x23e713(0x22e)](_0x32076d[_0x23e713(0x242)]);}),PluginManager[_0x2332e4(0xa4)](pluginData['name'],_0x2332e4(0x19d),_0x17ce2d=>{const _0x5471ae=_0x2332e4;VisuMZ[_0x5471ae(0x2a1)](_0x17ce2d,_0x17ce2d),$gameSystem['setMainMenuItemCraftingVisible'](_0x17ce2d['Show']);}),VisuMZ[_0x2332e4(0x19a)][_0x2332e4(0x1cc)]=Scene_Boot[_0x2332e4(0x112)]['onDatabaseLoaded'],Scene_Boot['prototype'][_0x2332e4(0x1a2)]=function(){const _0x545ce7=_0x2332e4;VisuMZ['ItemCraftingSys'][_0x545ce7(0x1cc)][_0x545ce7(0x281)](this),this[_0x545ce7(0xe7)]();},Scene_Boot[_0x2332e4(0x112)][_0x2332e4(0xe7)]=function(){const _0x5e4d1a=_0x2332e4;this[_0x5e4d1a(0x21c)]();},VisuMZ['ItemCraftingSys'][_0x2332e4(0x133)]={'Ingredients':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>\s*([\s\S]*)\s*<\/(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>/i,'AllSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'AnySwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:ANY SWITCH|ANY SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OnSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN ON (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OffSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN OFF (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'MaskText':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) MASK:[ ](.*)>/i,'NoMask':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) NO MASK>/i,'customCraftingOnly':/<CUSTOM (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) ONLY>/i,'jsOnCraft':/<JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>\s*([\s\S]*)\s*<\/JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>/i,'animationIDs':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) FADE SPEED:[ ](\d+)>/i,'craftPicture':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'CraftEventOnce':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'CraftEventRepeat':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'CraftOnceAllSw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'CraftOnceAnySw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i,'CraftRepeatAllSw':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'CraftRepeatAnySw':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i},Scene_Boot[_0x2332e4(0x112)][_0x2332e4(0x21c)]=function(){const _0x3940a6=_0x2332e4;if(VisuMZ[_0x3940a6(0x271)])return;const _0x3c3300=$dataItems[_0x3940a6(0xf6)]($dataWeapons,$dataArmors);for(const _0x2061f7 of _0x3c3300){if(_0x3940a6(0xe1)!==_0x3940a6(0xe1)){const _0x300d7c=_0x3426dd['iconIndex'];let _0x33498f=_0x1ecb5a['x']+this[_0x3940a6(0x229)](),_0x525b5f=_0x266894['y']+0x4,_0x366d97=_0x2f111e[_0x3940a6(0x265)]-this[_0x3940a6(0x229)]()*0x2,_0x59c6aa=_0x48b752['height']-0x8,_0x49d690=_0x2ff1e1['min'](_0x366d97,_0x59c6aa);_0x49d690=_0x406c4f[_0x3940a6(0x1dc)](_0x49d690/_0x34647f[_0x3940a6(0x100)])*_0x5cbd84[_0x3940a6(0x100)],_0x525b5f+=(_0x59c6aa-_0x49d690)/0x2;const _0x4891d3=_0x449e11['loadSystem']('IconSet'),_0x1e1232=_0x291d35['iconWidth'],_0x2894b2=_0x3bbb67[_0x3940a6(0x13c)],_0x354e3e=_0x300d7c%0x10*_0x1e1232,_0x49ff0e=_0x4fd283[_0x3940a6(0x1dc)](_0x300d7c/0x10)*_0x2894b2;this[_0x3940a6(0x210)][_0x3940a6(0x10a)]['imageSmoothingEnabled']=![],this[_0x3940a6(0x210)][_0x3940a6(0x1a6)](_0x4891d3,_0x354e3e,_0x49ff0e,_0x1e1232,_0x2894b2,_0x33498f,_0x525b5f,_0x49d690,_0x49d690),this[_0x3940a6(0x210)]['_context'][_0x3940a6(0xe9)]=!![];}else{if(!_0x2061f7)continue;VisuMZ[_0x3940a6(0x19a)][_0x3940a6(0x8f)](_0x2061f7);}}},VisuMZ[_0x2332e4(0x19a)][_0x2332e4(0x214)]=VisuMZ[_0x2332e4(0x214)],VisuMZ[_0x2332e4(0x214)]=function(_0x37c131){const _0x117486=_0x2332e4;VisuMZ[_0x117486(0x19a)][_0x117486(0x214)][_0x117486(0x281)](this,_0x37c131),VisuMZ[_0x117486(0x19a)][_0x117486(0x8f)](_0x37c131);},VisuMZ[_0x2332e4(0x19a)][_0x2332e4(0x80)]=VisuMZ[_0x2332e4(0x80)],VisuMZ[_0x2332e4(0x80)]=function(_0xe0d4e7){const _0x131ccb=_0x2332e4;VisuMZ[_0x131ccb(0x19a)][_0x131ccb(0x80)]['call'](this,_0xe0d4e7),VisuMZ[_0x131ccb(0x19a)][_0x131ccb(0x8f)](_0xe0d4e7);},VisuMZ['ItemCraftingSys'][_0x2332e4(0x29c)]=VisuMZ[_0x2332e4(0x29c)],VisuMZ['ParseArmorNotetags']=function(_0x48129a){const _0x23889e=_0x2332e4;VisuMZ[_0x23889e(0x19a)][_0x23889e(0x29c)]['call'](this,_0x48129a),VisuMZ['ItemCraftingSys'][_0x23889e(0x8f)](_0x48129a);},VisuMZ[_0x2332e4(0x19a)][_0x2332e4(0x8f)]=function(_0x5e397a){const _0x14530a=_0x2332e4;_0x5e397a[_0x14530a(0x1bb)]['match'](VisuMZ[_0x14530a(0x19a)]['RegExp'][_0x14530a(0x293)])&&VisuMZ[_0x14530a(0x19a)]['createJS'](_0x5e397a,RegExp['$1']);},VisuMZ[_0x2332e4(0x19a)]['JS']={},VisuMZ[_0x2332e4(0x19a)][_0x2332e4(0x1c2)]=function(_0x2c26e1,_0x3858f5){const _0x5e6698=_0x2332e4,_0x9ace82=_0x5e6698(0xee)['format'](_0x3858f5),_0x22a99b=DataManager['createCraftingItemKey'](_0x2c26e1);VisuMZ[_0x5e6698(0x19a)]['JS'][_0x22a99b]=new Function(_0x9ace82);},DataManager[_0x2332e4(0x72)]=function(_0x3ef068){const _0x33ccac=_0x2332e4;if(!_0x3ef068)return![];if(DataManager[_0x33ccac(0x20f)](_0x3ef068)[_0x33ccac(0x243)]<=0x0){if(_0x33ccac(0x89)!==_0x33ccac(0x89))this[_0x33ccac(0x8d)]={'items':[],'weapons':[],'armors':[]};else return![];}if(_0x3ef068[_0x33ccac(0x1bb)]['match'](VisuMZ['ItemCraftingSys'][_0x33ccac(0x133)][_0x33ccac(0x2df)])){if(_0x33ccac(0x13f)===_0x33ccac(0x24f))this[_0x33ccac(0x1af)]={'items':{},'weapons':{},'armors':{}};else{if(!$gameTemp[_0x33ccac(0x148)]())return![];}}if(!VisuMZ[_0x33ccac(0x19a)]['Settings']['General'][_0x33ccac(0x2ba)][_0x33ccac(0x281)](this,_0x3ef068))return![];if(!VisuMZ['ItemCraftingSys'][_0x33ccac(0x2d7)](_0x3ef068))return![];if(!VisuMZ['ItemCraftingSys'][_0x33ccac(0x88)](_0x3ef068))return![];return!![];},VisuMZ[_0x2332e4(0x19a)][_0x2332e4(0x2d7)]=function(_0x97ca6d){const _0x318e25=_0x2332e4,_0x154836=$gameTemp[_0x318e25(0x148)]();if(_0x154836&&_0x154836[_0x318e25(0x156)])return!![];const _0x3b6be6=VisuMZ[_0x318e25(0x19a)]['RegExp'][_0x318e25(0x13d)],_0x266fec=_0x97ca6d[_0x318e25(0x1bb)][_0x318e25(0x277)](_0x3b6be6);if(_0x266fec)for(const _0x1f3a69 of _0x266fec){if(!_0x1f3a69)continue;_0x1f3a69[_0x318e25(0x277)](_0x3b6be6);const _0x419c5a=JSON[_0x318e25(0x28c)]('['+RegExp['$1'][_0x318e25(0x277)](/\d+/g)+']');for(const _0x18758c of _0x419c5a){if(!$gameSwitches[_0x318e25(0x22a)](_0x18758c))return![];}}return!![];},VisuMZ[_0x2332e4(0x19a)][_0x2332e4(0x88)]=function(_0x2458be){const _0x597df2=_0x2332e4,_0x530346=$gameTemp[_0x597df2(0x148)]();if(_0x530346&&_0x530346[_0x597df2(0x156)])return!![];const _0x4629b2=VisuMZ[_0x597df2(0x19a)]['RegExp']['AnySwitches'],_0x29d859=_0x2458be[_0x597df2(0x1bb)]['match'](_0x4629b2);if(_0x29d859){if(_0x597df2(0x83)===_0x597df2(0x1a1))this[_0x597df2(0x292)]=_0x3f304e,this['_max']=this['determineMax'](),this['_number']=_0x500387[_0x597df2(0x167)](0x1,this[_0x597df2(0xcc)]),this['placeButtons'](),this[_0x597df2(0xf2)]();else{for(const _0x36e035 of _0x29d859){if(!_0x36e035)continue;_0x36e035['match'](_0x4629b2);const _0xf95e2e=JSON[_0x597df2(0x28c)]('['+RegExp['$1'][_0x597df2(0x277)](/\d+/g)+']');for(const _0x662870 of _0xf95e2e){if($gameSwitches[_0x597df2(0x22a)](_0x662870))return!![];}}return![];}}return!![];},DataManager[_0x2332e4(0x2d2)]=function(){const _0x5cafd5=_0x2332e4,_0x153035=$gameTemp['getCustomItemCraftingSettings']();if(_0x153035)return _0x153035['all']['filter'](_0x3a20a9=>this[_0x5cafd5(0x72)](_0x3a20a9));const _0x469d1d=this[_0x5cafd5(0x27b)](),_0x51a292=this[_0x5cafd5(0x93)](),_0x453659=this[_0x5cafd5(0x290)]();return _0x469d1d[_0x5cafd5(0xf6)](_0x51a292,_0x453659);},DataManager[_0x2332e4(0x27b)]=function(){const _0x190077=_0x2332e4;return this[_0x190077(0x2bd)]()['filter'](_0x8ccbb7=>this[_0x190077(0x72)](_0x8ccbb7));},DataManager[_0x2332e4(0x2bd)]=function(){const _0x27bc88=_0x2332e4;if(this['_allCraftableItems']!==undefined)return this[_0x27bc88(0x1d2)];this['_allCraftableItems']=[];for(const _0x52bb43 of $dataItems){if(!_0x52bb43)continue;_0x52bb43[_0x27bc88(0x1bb)][_0x27bc88(0x277)](VisuMZ[_0x27bc88(0x19a)]['RegExp'][_0x27bc88(0x2d0)])&&(_0x27bc88(0x207)===_0x27bc88(0x1e0)?this[_0x27bc88(0x181)]=this[_0x27bc88(0xd9)]()||'':this[_0x27bc88(0x1d2)][_0x27bc88(0x2cb)](_0x52bb43));}return this['_allCraftableItems'];},DataManager[_0x2332e4(0x93)]=function(){const _0x2b2a90=_0x2332e4;return this[_0x2b2a90(0x1cb)]()['filter'](_0x1a2821=>this[_0x2b2a90(0x72)](_0x1a2821));},DataManager[_0x2332e4(0x1cb)]=function(){const _0x111030=_0x2332e4;if(this['_allCraftableWeapons']!==undefined)return this['_allCraftableWeapons'];this[_0x111030(0x29d)]=[];for(const _0x16c236 of $dataWeapons){if(!_0x16c236)continue;_0x16c236['note'][_0x111030(0x277)](VisuMZ[_0x111030(0x19a)]['RegExp'][_0x111030(0x2d0)])&&(_0x111030(0x13a)==='HIjWI'?this[_0x111030(0x29d)][_0x111030(0x2cb)](_0x16c236):_0xf4c63a['push'](_0x5c1b16['id']));}return this[_0x111030(0x29d)];},DataManager[_0x2332e4(0x290)]=function(){const _0x681ee8=_0x2332e4;return this[_0x681ee8(0x289)]()['filter'](_0x4ece1b=>this[_0x681ee8(0x72)](_0x4ece1b));},DataManager[_0x2332e4(0x289)]=function(){const _0x8ababd=_0x2332e4;if(this[_0x8ababd(0x15f)]!==undefined)return this[_0x8ababd(0x15f)];this['_allCraftableArmors']=[];for(const _0x45bee7 of $dataArmors){if(_0x8ababd(0x151)!==_0x8ababd(0x298)){if(!_0x45bee7)continue;if(_0x45bee7[_0x8ababd(0x1bb)][_0x8ababd(0x277)](VisuMZ['ItemCraftingSys']['RegExp'][_0x8ababd(0x2d0)])){if('TxwIw'===_0x8ababd(0x150))this[_0x8ababd(0x15f)][_0x8ababd(0x2cb)](_0x45bee7);else{const _0x3623f0=this[_0x8ababd(0x190)](_0x56bddd);if(!_0x3623f0)return;const _0x1f1031=this[_0x8ababd(0x128)](_0x2fe0c3);this[_0x8ababd(0x1be)](),this[_0x8ababd(0xa6)](_0x1f1031,0x2),this['drawBigItemImage'](_0x9e57b6,_0x3623f0,_0x1f1031),this[_0x8ababd(0x2d5)](_0x3623f0,_0x1f1031),this['drawCraftingItemName'](_0x3623f0,_0x1f1031),this['drawCraftingIngredients'](_0x3623f0,_0x1f1031);}}}else{this['_category']=_0xa23493['Type'];for(const _0x1dce9b of _0x495292){_0x32dc5f['prototype'][_0x8ababd(0x6b)][_0x8ababd(0x281)](this,_0x1dce9b)&&_0xf071b[_0x8ababd(0x2cb)](_0x1dce9b);}}}return this[_0x8ababd(0x15f)];},DataManager[_0x2332e4(0x20f)]=function(_0x3cdb0a){const _0x936fc4=_0x2332e4;if(!_0x3cdb0a)return[];const _0x33b777=this['createCraftingItemKey'](_0x3cdb0a);return this['_craftingIngredients']===undefined&&this[_0x936fc4(0x2ab)](),this['_craftingIngredients'][_0x33b777]||[];},DataManager[_0x2332e4(0x25a)]=function(_0x1efec9){const _0x45f83a=_0x2332e4;let _0x51cdc9=_0x45f83a(0xbb);if(this[_0x45f83a(0x2d9)](_0x1efec9))return _0x51cdc9[_0x45f83a(0x1e6)](_0x45f83a(0xaa),_0x1efec9['id']);if(this[_0x45f83a(0x9c)](_0x1efec9))return _0x51cdc9[_0x45f83a(0x1e6)](_0x45f83a(0x1e4),_0x1efec9['id']);if(this[_0x45f83a(0x1da)](_0x1efec9))return _0x51cdc9[_0x45f83a(0x1e6)](_0x45f83a(0x192),_0x1efec9['id']);return'';},DataManager[_0x2332e4(0x2ab)]=function(){const _0xd8c716=_0x2332e4;this[_0xd8c716(0xfa)]={};const _0x4444ca=$dataItems[_0xd8c716(0xf6)]($dataWeapons,$dataArmors);for(const _0x159169 of _0x4444ca){if(!_0x159169)continue;if(_0x159169['note'][_0xd8c716(0x277)](VisuMZ[_0xd8c716(0x19a)][_0xd8c716(0x133)][_0xd8c716(0x2d0)])){if('mOOYK'!==_0xd8c716(0x1e2))_0x176674[_0xd8c716(0x130)]=!![],this['_item']=this[_0xd8c716(0x252)][_0xd8c716(0xe6)](),this[_0xd8c716(0x252)][_0xd8c716(0x221)](),this[_0xd8c716(0x175)](),this[_0xd8c716(0x2a0)]()?this[_0xd8c716(0x6f)]():this[_0xd8c716(0x74)](),_0x2ae72b[_0xd8c716(0x130)]=![],this[_0xd8c716(0x292)]=this[_0xd8c716(0x252)][_0xd8c716(0xe6)]();else{const _0x3db241=String(RegExp['$1'])['split'](/[\r\n]+/),_0x5a97fe=this['parseCraftingIngredientsData'](_0x159169,_0x3db241);if(_0x5a97fe['length']<=0x0)continue;const _0x21d068=this[_0xd8c716(0x25a)](_0x159169);this['_craftingIngredients'][_0x21d068]=_0x5a97fe;}}}},DataManager[_0x2332e4(0x227)]=function(_0x502366,_0xeab1a5){const _0x5dc42a=_0x2332e4;let _0x34daf8=[];for(let _0x152382 of _0xeab1a5){_0x152382=_0x152382[_0x5dc42a(0x202)]();if(_0x152382[_0x5dc42a(0x277)](/GOLD:[ ](\d+)/i))_0x34daf8['push']([_0x5dc42a(0x111),Number(RegExp['$1'])]);else{if(_0x152382[_0x5dc42a(0x277)](/CATEGORY[ ](.*):[ ](\d+)/i)){if(_0x5dc42a(0x1f8)!==_0x5dc42a(0x1f8))this['_ItemCrafting_MainMenu']={'shown':_0xe2976b[_0x5dc42a(0x19a)][_0x5dc42a(0x2ae)][_0x5dc42a(0x77)][_0x5dc42a(0x208)],'enabled':_0x11a8fc[_0x5dc42a(0x19a)][_0x5dc42a(0x2ae)][_0x5dc42a(0x77)][_0x5dc42a(0x180)]};else{const _0x420ee9=String(RegExp['$1'])[_0x5dc42a(0x202)](),_0xe95822=Number(RegExp['$2'])||0x1,_0x1290b8=_0x5dc42a(0x102)[_0x5dc42a(0x1e6)](_0x420ee9);_0x34daf8[_0x5dc42a(0x2cb)]([_0x1290b8,_0xe95822]);}}else{if(_0x152382[_0x5dc42a(0x277)](/(.*?)[ ](\d+):[ ](\d+)/i)){const _0x539d52=RegExp['$1'][_0x5dc42a(0x1d9)]()['trim'](),_0x18ed54=Number(RegExp['$2'])||0x0,_0x25de92=Number(RegExp['$3'])||0x1;let _0x409e38=null;if([_0x5dc42a(0xe6),_0x5dc42a(0xba)]['includes'](_0x539d52))_0x409e38=$dataItems;if([_0x5dc42a(0x1f7),_0x5dc42a(0xc9)][_0x5dc42a(0x6b)](_0x539d52))_0x409e38=$dataWeapons;if([_0x5dc42a(0x15e),_0x5dc42a(0x21f)]['includes'](_0x539d52))_0x409e38=$dataArmors;this['checkItemCraftingResultsValid'](_0x502366,_0x409e38,_0x18ed54,_0x34daf8)&&_0x34daf8[_0x5dc42a(0x2cb)]([_0x409e38[_0x18ed54],_0x25de92]);}else{if(_0x152382[_0x5dc42a(0x277)](/(.*?)[ ](.*):[ ](\d+)/i)){const _0x392987=RegExp['$1']['toLowerCase']()[_0x5dc42a(0x202)](),_0x540f55=RegExp['$2'][_0x5dc42a(0x202)](),_0x3b8a88=Number(RegExp['$3'])||0x1;let _0x149cec=null,_0x269ed7=0x0;if([_0x5dc42a(0xe6),_0x5dc42a(0xba)][_0x5dc42a(0x6b)](_0x392987)){if(_0x5dc42a(0x1bf)===_0x5dc42a(0x1bf))_0x149cec=$dataItems,_0x269ed7=this[_0x5dc42a(0x92)](_0x540f55);else return!![];}if([_0x5dc42a(0x1f7),_0x5dc42a(0xc9)][_0x5dc42a(0x6b)](_0x392987)){if(_0x5dc42a(0x11f)!==_0x5dc42a(0xb3))_0x149cec=$dataWeapons,_0x269ed7=this[_0x5dc42a(0xea)](_0x540f55);else{const _0x2e0277=this['findExt'](this[_0x5dc42a(0x181)]);if(_0x2e0277>=0x0)_0x262dbf=_0x2e0277;}}['armor','armors'][_0x5dc42a(0x6b)](_0x392987)&&(_0x149cec=$dataArmors,_0x269ed7=this[_0x5dc42a(0xbd)](_0x540f55)),this['checkItemCraftingResultsValid'](_0x502366,_0x149cec,_0x269ed7,_0x34daf8)&&_0x34daf8[_0x5dc42a(0x2cb)]([_0x149cec[_0x269ed7],_0x3b8a88]);}}}}}return _0x34daf8;},DataManager['checkItemCraftingResultsValid']=function(_0x1f7f7e,_0x9973b6,_0xfb319b,_0x9b6241){const _0x4ef8aa=_0x2332e4;if(!_0x9973b6)return![];if(!_0x9973b6[_0xfb319b])return![];const _0x5f3d0f=_0x9973b6[_0xfb319b];if(_0x5f3d0f===_0x1f7f7e)return![];for(const _0x2acec4 of _0x9b6241){if(_0x4ef8aa(0xa0)!==_0x4ef8aa(0xa0))_0x28c269=this[_0x4ef8aa(0xc0)][_0x560611],_0x23c740+=0x1;else{if(!_0x2acec4)continue;if(_0x2acec4[0x0]===_0x5f3d0f)return![];}}return!![];},DataManager[_0x2332e4(0x92)]=function(_0x4a4510){const _0x76bb51=_0x2332e4;_0x4a4510=_0x4a4510[_0x76bb51(0x10e)]()[_0x76bb51(0x202)](),this[_0x76bb51(0x2a8)]=this['_itemIDs']||{};if(this[_0x76bb51(0x2a8)][_0x4a4510])return this[_0x76bb51(0x2a8)][_0x4a4510];for(const _0x5edbfd of $dataItems){if(!_0x5edbfd)continue;this['_itemIDs'][_0x5edbfd[_0x76bb51(0x17a)]['toUpperCase']()[_0x76bb51(0x202)]()]=_0x5edbfd['id'];}return this[_0x76bb51(0x2a8)][_0x4a4510]||0x0;},DataManager['getWeaponIdWithName']=function(_0x1275ed){const _0x27352f=_0x2332e4;_0x1275ed=_0x1275ed['toUpperCase']()['trim'](),this[_0x27352f(0x171)]=this[_0x27352f(0x171)]||{};if(this[_0x27352f(0x171)][_0x1275ed])return this[_0x27352f(0x171)][_0x1275ed];for(const _0x399389 of $dataWeapons){if(_0x27352f(0x16e)===_0x27352f(0x24d))_0x1de87f[_0x27352f(0x112)][_0x27352f(0x6b)][_0x27352f(0x281)](this,_0x5273cc)&&_0xa0570[_0x27352f(0x2cb)](_0x11e647);else{if(!_0x399389)continue;this['_weaponIDs'][_0x399389[_0x27352f(0x17a)][_0x27352f(0x10e)]()[_0x27352f(0x202)]()]=_0x399389['id'];}}return this[_0x27352f(0x171)][_0x1275ed]||0x0;},DataManager[_0x2332e4(0xbd)]=function(_0x456e7b){const _0x251ecb=_0x2332e4;_0x456e7b=_0x456e7b['toUpperCase']()['trim'](),this[_0x251ecb(0x1e3)]=this[_0x251ecb(0x1e3)]||{};if(this[_0x251ecb(0x1e3)][_0x456e7b])return this[_0x251ecb(0x1e3)][_0x456e7b];for(const _0x412e17 of $dataArmors){if(!_0x412e17)continue;this[_0x251ecb(0x1e3)][_0x412e17['name'][_0x251ecb(0x10e)]()[_0x251ecb(0x202)]()]=_0x412e17['id'];}return this['_armorIDs'][_0x456e7b]||0x0;},DataManager[_0x2332e4(0x26f)]=function(_0x390791){const _0x4849a3=_0x2332e4;if(!_0x390791)return![];if(!VisuMZ[_0x4849a3(0x19a)][_0x4849a3(0x2ae)][_0x4849a3(0x2dd)][_0x4849a3(0x242)])return![];DataManager[_0x4849a3(0x1ec)]&&(_0x390791=DataManager[_0x4849a3(0x1ec)](_0x390791));const _0x17d0d3=$gameTemp[_0x4849a3(0x148)]();if(_0x17d0d3&&_0x17d0d3[_0x4849a3(0x2b0)])return![];if(_0x390791[_0x4849a3(0x1bb)]['match'](VisuMZ[_0x4849a3(0x19a)][_0x4849a3(0x133)][_0x4849a3(0x18e)]))return![];return!$gameSystem[_0x4849a3(0x14d)](_0x390791);},ImageManager[_0x2332e4(0x1ed)]=VisuMZ['ItemCraftingSys']['Settings'][_0x2332e4(0x24a)][_0x2332e4(0x13b)],SoundManager[_0x2332e4(0x1d5)]=function(_0x4bcad1){const _0x51a3cc=_0x2332e4;AudioManager[_0x51a3cc(0x17e)](VisuMZ[_0x51a3cc(0x19a)][_0x51a3cc(0x2ae)]['Sound']);},TextManager[_0x2332e4(0x11a)]=VisuMZ[_0x2332e4(0x19a)][_0x2332e4(0x2ae)]['General'][_0x2332e4(0x288)],TextManager[_0x2332e4(0x20c)]=VisuMZ['ItemCraftingSys']['Settings'][_0x2332e4(0x24a)]['CraftAssistButton'],TextManager[_0x2332e4(0x1b6)]=VisuMZ[_0x2332e4(0x19a)][_0x2332e4(0x2ae)]['Mask']['MaskLetter'],TextManager['ItemCraftingMenuCommand']=VisuMZ[_0x2332e4(0x19a)]['Settings'][_0x2332e4(0x77)][_0x2332e4(0x19f)],TextManager[_0x2332e4(0x25e)]={'owned':VisuMZ['ItemCraftingSys'][_0x2332e4(0x2ae)][_0x2332e4(0x24a)][_0x2332e4(0x1d7)]||_0x2332e4(0x14b),'shift':VisuMZ['ItemCraftingSys'][_0x2332e4(0x2ae)][_0x2332e4(0x24a)][_0x2332e4(0x12b)]||_0x2332e4(0x97),'net':VisuMZ[_0x2332e4(0x19a)][_0x2332e4(0x2ae)]['General'][_0x2332e4(0x6d)]||_0x2332e4(0xa9)},ColorManager[_0x2332e4(0xb9)]=function(_0x536794){const _0x4d6164=_0x2332e4;return _0x536794=String(_0x536794),_0x536794[_0x4d6164(0x277)](/#(.*)/i)?_0x4d6164(0xd3)['format'](String(RegExp['$1'])):this[_0x4d6164(0x99)](Number(_0x536794));},SceneManager[_0x2332e4(0x1e7)]=function(){const _0x4de664=_0x2332e4;return this[_0x4de664(0x14e)]&&this[_0x4de664(0x14e)][_0x4de664(0x203)]===Scene_Battle;},SceneManager[_0x2332e4(0x211)]=function(){const _0x145bb6=_0x2332e4;return this['_scene']&&this[_0x145bb6(0x14e)][_0x145bb6(0x203)]===Scene_ItemCrafting;},Game_Temp[_0x2332e4(0x112)][_0x2332e4(0x148)]=function(){return this['_customItemCraftingSettings'];},Game_Temp[_0x2332e4(0x112)][_0x2332e4(0x162)]=function(){const _0x277349=_0x2332e4;this[_0x277349(0x95)]=undefined;},Game_Temp[_0x2332e4(0x112)][_0x2332e4(0x28d)]=function(_0xd03297){const _0x1b4b4d=_0x2332e4;this[_0x1b4b4d(0x95)]=_0xd03297;},VisuMZ[_0x2332e4(0x19a)][_0x2332e4(0xb5)]=Game_System['prototype'][_0x2332e4(0x2b9)],Game_System[_0x2332e4(0x112)][_0x2332e4(0x2b9)]=function(){const _0x250794=_0x2332e4;VisuMZ[_0x250794(0x19a)][_0x250794(0xb5)][_0x250794(0x281)](this),this[_0x250794(0x12c)](),this['initItemCraftingSys'](),this[_0x250794(0x105)]();},Game_System[_0x2332e4(0x112)][_0x2332e4(0x12c)]=function(){const _0xb3affd=_0x2332e4;this[_0xb3affd(0x25c)]={'shown':VisuMZ['ItemCraftingSys'][_0xb3affd(0x2ae)]['MainMenu']['ShowMainMenu'],'enabled':VisuMZ[_0xb3affd(0x19a)][_0xb3affd(0x2ae)][_0xb3affd(0x77)][_0xb3affd(0x180)]};},Game_System[_0x2332e4(0x112)][_0x2332e4(0x1c8)]=function(){const _0x48a0d3=_0x2332e4;if(this['_ItemCrafting_MainMenu']===undefined)this[_0x48a0d3(0x12c)]();return this[_0x48a0d3(0x25c)][_0x48a0d3(0x17f)];},Game_System[_0x2332e4(0x112)][_0x2332e4(0xed)]=function(_0x4f4b5d){const _0x3626e5=_0x2332e4;if(this[_0x3626e5(0x25c)]===undefined)this[_0x3626e5(0x12c)]();this['_ItemCrafting_MainMenu'][_0x3626e5(0x17f)]=_0x4f4b5d;},Game_System['prototype']['isMainMenuItemCraftingEnabled']=function(){const _0x1b822a=_0x2332e4;if(this[_0x1b822a(0x25c)]===undefined)this['initItemCraftingMainMenu']();return this[_0x1b822a(0x25c)][_0x1b822a(0x216)];},Game_System[_0x2332e4(0x112)]['setMainMenuItemCraftingEnabled']=function(_0x545be2){const _0x34eb7b=_0x2332e4;if(this[_0x34eb7b(0x25c)]===undefined)this[_0x34eb7b(0x12c)]();this['_ItemCrafting_MainMenu']['enabled']=_0x545be2;},Game_System[_0x2332e4(0x112)][_0x2332e4(0x12d)]=function(){const _0x37d1b7=_0x2332e4;this[_0x37d1b7(0x1af)]={'items':{},'weapons':{},'armors':{}};},Game_System[_0x2332e4(0x112)]['isItemCrafted']=function(_0x1da651){const _0x57fb11=_0x2332e4;return!!this[_0x57fb11(0x8a)](_0x1da651);},Game_System[_0x2332e4(0x112)][_0x2332e4(0x8a)]=function(_0x5b60ef){const _0x4bfe47=_0x2332e4;if(!_0x5b60ef)return![];if(this[_0x4bfe47(0x1af)]===undefined)this['initItemCraftingSys']();let _0x4ffb09={};if(DataManager[_0x4bfe47(0x2d9)](_0x5b60ef))_0x4ffb09=this[_0x4bfe47(0x1af)]['items'];if(DataManager[_0x4bfe47(0x9c)](_0x5b60ef))_0x4ffb09=this[_0x4bfe47(0x1af)][_0x4bfe47(0xc9)];if(DataManager[_0x4bfe47(0x1da)](_0x5b60ef))_0x4ffb09=this[_0x4bfe47(0x1af)][_0x4bfe47(0x21f)];return _0x4ffb09[_0x5b60ef['id']]||0x0;},Game_System[_0x2332e4(0x112)]['registerCraftedItem']=function(_0x463df4,_0x7481f3){const _0x579791=_0x2332e4;if(!_0x463df4)return![];if(this[_0x579791(0x1af)]===undefined)this[_0x579791(0x12d)]();_0x7481f3=_0x7481f3||0x1;let _0x4f048b={};if(DataManager[_0x579791(0x2d9)](_0x463df4))_0x4f048b=this[_0x579791(0x1af)][_0x579791(0xba)];if(DataManager[_0x579791(0x9c)](_0x463df4))_0x4f048b=this[_0x579791(0x1af)][_0x579791(0xc9)];if(DataManager[_0x579791(0x1da)](_0x463df4))_0x4f048b=this[_0x579791(0x1af)]['armors'];_0x4f048b[_0x463df4['id']]=_0x4f048b[_0x463df4['id']]||0x0,_0x4f048b[_0x463df4['id']]+=_0x7481f3;},Game_System['prototype'][_0x2332e4(0x105)]=function(){const _0xc400aa=_0x2332e4;this[_0xc400aa(0x8d)]={'items':[],'weapons':[],'armors':[]};},Game_System[_0x2332e4(0x112)][_0x2332e4(0x110)]=function(_0x294d47){const _0x4a58ef=_0x2332e4;if(this[_0x4a58ef(0x8d)]===undefined)this['initItemCraftingEvents']();let _0x212f88=[];if(DataManager[_0x4a58ef(0x2d9)](_0x294d47)){if(_0x4a58ef(0x273)==='nbzlk')_0x212f88=this[_0x4a58ef(0x8d)]['items'];else return this[_0x4a58ef(0x18b)]=null,!![];}else{if(DataManager['isWeapon'](_0x294d47))_0x212f88=this[_0x4a58ef(0x8d)][_0x4a58ef(0xc9)];else DataManager[_0x4a58ef(0x1da)](_0x294d47)&&(_0x4a58ef(0x275)!==_0x4a58ef(0x104)?_0x212f88=this[_0x4a58ef(0x8d)][_0x4a58ef(0x21f)]:_0x19b5d2=_0x260933(_0x54bb67['$1'])||0x1);}!_0x212f88[_0x4a58ef(0x6b)](_0x294d47['id'])&&_0x212f88[_0x4a58ef(0x2cb)](_0x294d47['id']);},Game_System[_0x2332e4(0x112)]['hasCraftingEventOccurred']=function(_0x147472){const _0x245033=_0x2332e4;if(this[_0x245033(0x8d)]===undefined)this[_0x245033(0x105)]();let _0x332f25=[];if(DataManager['isItem'](_0x147472))_0x332f25=this[_0x245033(0x8d)][_0x245033(0xba)];else{if(DataManager['isWeapon'](_0x147472))_0x245033(0x16c)!==_0x245033(0x2bb)?_0x332f25=this[_0x245033(0x8d)][_0x245033(0xc9)]:(typeof _0x51982f===_0x245033(0xc3)&&_0x16d221[_0x245033(0x277)](/CATEGORY/i)&&(_0x2f812b=this[_0x245033(0xc0)][_0x44e505],_0x3232eb+=0x1),_0x3a7642[_0x245033(0x2a2)](_0x4f10c0,_0x40b441,![]));else DataManager[_0x245033(0x1da)](_0x147472)&&(_0x245033(0x188)!=='oYHGW'?this['_statusWindow']['setItem'](_0x2c0ae3):_0x332f25=this[_0x245033(0x8d)]['armors']);}return _0x332f25[_0x245033(0x6b)](_0x147472['id']);},VisuMZ[_0x2332e4(0x19a)][_0x2332e4(0x1ad)]=Scene_Menu[_0x2332e4(0x112)][_0x2332e4(0xdd)],Scene_Menu[_0x2332e4(0x112)][_0x2332e4(0xdd)]=function(){const _0x5414cc=_0x2332e4;VisuMZ[_0x5414cc(0x19a)][_0x5414cc(0x1ad)][_0x5414cc(0x281)](this);const _0x1b6041=this[_0x5414cc(0xc8)];_0x1b6041[_0x5414cc(0x2a5)](_0x5414cc(0x129),this[_0x5414cc(0x96)][_0x5414cc(0x25d)](this));},Scene_Menu[_0x2332e4(0x112)][_0x2332e4(0x96)]=function(){SceneManager['push'](Scene_ItemCrafting);};function Scene_ItemCrafting(){const _0x2a0154=_0x2332e4;this[_0x2a0154(0x2b9)](...arguments);}Scene_ItemCrafting[_0x2332e4(0x112)]=Object[_0x2332e4(0x1e8)](Scene_Item['prototype']),Scene_ItemCrafting[_0x2332e4(0x112)]['constructor']=Scene_ItemCrafting,Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x2b9)]=function(){const _0x31f5a6=_0x2332e4;Scene_Item[_0x31f5a6(0x112)][_0x31f5a6(0x2b9)][_0x31f5a6(0x281)](this),$gameSystem[_0x31f5a6(0x236)]=undefined;},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x237)]=function(){const _0x373394=_0x2332e4;Scene_Item[_0x373394(0x112)][_0x373394(0x237)][_0x373394(0x281)](this),this[_0x373394(0x251)]();},Scene_ItemCrafting[_0x2332e4(0x112)]['create']=function(){const _0x1cac95=_0x2332e4;Scene_Item[_0x1cac95(0x112)][_0x1cac95(0x1e8)][_0x1cac95(0x281)](this),this[_0x1cac95(0x1e1)](),this[_0x1cac95(0x12e)](),this[_0x1cac95(0x137)](),this['createIngredientSelectionList'](),this[_0x1cac95(0x1c7)]()&&this[_0x1cac95(0x14a)](),this[_0x1cac95(0x1c1)](),this[_0x1cac95(0x119)]();},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x1c1)]=function(){const _0x11ecf2=_0x2332e4,_0x501b77=VisuMZ[_0x11ecf2(0x19a)]['Settings'][_0x11ecf2(0x14c)];this[_0x11ecf2(0x29b)]&&this[_0x11ecf2(0x29b)][_0x11ecf2(0x1d8)](_0x501b77['HelpBgType']);this['_categoryWindow']&&this['_categoryWindow'][_0x11ecf2(0x1d8)](_0x501b77[_0x11ecf2(0x239)]);if(this[_0x11ecf2(0x27f)]){if('BCSat'!==_0x11ecf2(0x1cd))this[_0x11ecf2(0x27f)][_0x11ecf2(0x1d8)](_0x501b77[_0x11ecf2(0x16b)]);else{const _0x2dacb5=this[_0x11ecf2(0x91)]();this['_goldWindow']=new _0x4adb51(_0x2dacb5),this['addWindow'](this[_0x11ecf2(0x27f)]);}}this['_itemWindow']&&this[_0x11ecf2(0x252)][_0x11ecf2(0x1d8)](_0x501b77[_0x11ecf2(0xa7)]);if(this[_0x11ecf2(0x8c)]){if(_0x11ecf2(0xa3)===_0x11ecf2(0xa3))this[_0x11ecf2(0x8c)][_0x11ecf2(0x1d8)](_0x501b77[_0x11ecf2(0xfe)]);else{if(this[_0x11ecf2(0x25c)]===_0x20dcec)this[_0x11ecf2(0x12c)]();return this['_ItemCrafting_MainMenu']['enabled'];}}this[_0x11ecf2(0x9d)]&&this[_0x11ecf2(0x9d)]['setBackgroundType'](_0x501b77[_0x11ecf2(0x178)]),this['_ingredientSelectList']&&this[_0x11ecf2(0x253)]['setBackgroundType'](_0x501b77[_0x11ecf2(0x11b)]),this['_numberWindow']&&this['_numberWindow'][_0x11ecf2(0x1d8)](_0x501b77[_0x11ecf2(0x2e0)]),this[_0x11ecf2(0x2d1)]&&this[_0x11ecf2(0x2d1)][_0x11ecf2(0x1d8)](_0x501b77[_0x11ecf2(0x135)]);},Scene_ItemCrafting['prototype'][_0x2332e4(0x84)]=function(){const _0x2daf2b=_0x2332e4;return Scene_Shop[_0x2daf2b(0x112)][_0x2daf2b(0x28a)][_0x2daf2b(0x281)](this);},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x1e1)]=function(){const _0x37381b=_0x2332e4,_0x208847=this[_0x37381b(0x91)]();this[_0x37381b(0x27f)]=new Window_Gold(_0x208847),this[_0x37381b(0xc4)](this[_0x37381b(0x27f)]);},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x91)]=function(){const _0x4d7223=_0x2332e4;return Scene_Shop[_0x4d7223(0x112)][_0x4d7223(0x2af)][_0x4d7223(0x281)](this);},Scene_ItemCrafting[_0x2332e4(0x112)]['categoryWindowRect']=function(){const _0x537923=_0x2332e4;return Scene_Shop[_0x537923(0x112)]['commandWindowRectItemsEquipsCore'][_0x537923(0x281)](this);},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x1a0)]=function(){const _0x16d42e=_0x2332e4;this[_0x16d42e(0x197)]();this[_0x16d42e(0x1c7)]()&&this[_0x16d42e(0x174)]();if(this[_0x16d42e(0x2a4)]()){if('gfqUL'==='gfqUL')this[_0x16d42e(0xdb)](),this[_0x16d42e(0xc4)](this[_0x16d42e(0x252)]);else{if(!this[_0x16d42e(0x244)])return![];if(!this[_0x16d42e(0xe6)]())return![];if(!this[_0x16d42e(0x2a3)]())return![];if(this['hitIndex']()!==this['index']())return![];return!![];}}},Scene_ItemCrafting['prototype'][_0x2332e4(0x197)]=function(){const _0x6d392=_0x2332e4,_0x570d1d=this[_0x6d392(0x283)]();this[_0x6d392(0x252)]=new Window_ItemCraftingList(_0x570d1d),this[_0x6d392(0x252)][_0x6d392(0x2d6)](this[_0x6d392(0x29b)]),this['_itemWindow']['setHandler']('ok',this[_0x6d392(0xa5)]['bind'](this)),this['_itemWindow'][_0x6d392(0x2a5)](_0x6d392(0x1f5),this[_0x6d392(0x20e)][_0x6d392(0x25d)](this)),this[_0x6d392(0xc4)](this[_0x6d392(0x252)]),this[_0x6d392(0x71)]['setItemWindow'](this['_itemWindow']),!this['_categoryWindow'][_0x6d392(0x231)]()&&(this[_0x6d392(0x252)]['y']-=this[_0x6d392(0x71)]['height'],this[_0x6d392(0x252)]['height']+=this['_categoryWindow']['height'],this[_0x6d392(0x71)][_0x6d392(0x221)](),this[_0x6d392(0x71)][_0x6d392(0x1d3)](),this[_0x6d392(0x14a)]());},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x283)]=function(){const _0x523f1c=_0x2332e4;return this['_commandWindow']=this[_0x523f1c(0x71)],Scene_Shop[_0x523f1c(0x112)][_0x523f1c(0x20b)][_0x523f1c(0x281)](this);},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x1e9)]=function(){const _0x3c99db=_0x2332e4;return Scene_Shop['prototype'][_0x3c99db(0x164)]['call'](this);},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x12e)]=function(){const _0x2524d8=_0x2332e4,_0x1c7b68=this[_0x2524d8(0x283)]();this[_0x2524d8(0x2dc)]=new Window_ItemCraftingNumber(_0x1c7b68),this['_numberWindow']['hide'](),this[_0x2524d8(0x2dc)]['setHandler']('ok',this[_0x2524d8(0x15c)]['bind'](this)),this[_0x2524d8(0x2dc)][_0x2524d8(0x2a5)]('cancel',this[_0x2524d8(0x254)][_0x2524d8(0x25d)](this)),this['addWindow'](this[_0x2524d8(0x2dc)]);},Scene_ItemCrafting[_0x2332e4(0x112)]['createIngredientSelectionTitle']=function(){const _0xa0145=_0x2332e4,_0x54a4cb=this[_0xa0145(0x182)]();this[_0xa0145(0x9d)]=new Window_Selectable(_0x54a4cb),this['_ingredientSelectTitle'][_0xa0145(0x221)](),this['addWindow'](this['_ingredientSelectTitle']);},Scene_ItemCrafting[_0x2332e4(0x112)]['createIngredientSelectionList']=function(){const _0x21d210=_0x2332e4,_0x1ce49f=this[_0x21d210(0x283)](),_0x5ee1b0=new Window_ItemCraftingIngredient(_0x1ce49f);_0x5ee1b0[_0x21d210(0x221)](),_0x5ee1b0[_0x21d210(0x2d6)](this[_0x21d210(0x29b)]),_0x5ee1b0[_0x21d210(0x1f6)](this[_0x21d210(0x8c)]),_0x5ee1b0[_0x21d210(0x2a5)]('ok',this[_0x21d210(0x70)][_0x21d210(0x25d)](this)),_0x5ee1b0['setHandler'](_0x21d210(0x1f5),this['onIngredientListCancel']['bind'](this)),this['_ingredientSelectList']=_0x5ee1b0,this[_0x21d210(0xc4)](this[_0x21d210(0x253)]);},Scene_ItemCrafting[_0x2332e4(0x112)]['onCategoryOk']=function(){const _0x4a4503=_0x2332e4;this[_0x4a4503(0x252)][_0x4a4503(0x21e)](),this[_0x4a4503(0x252)][_0x4a4503(0x75)](0x0);},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0xa5)]=function(){const _0x5ec631=_0x2332e4;$gameTemp[_0x5ec631(0x130)]=!![],this[_0x5ec631(0x292)]=this[_0x5ec631(0x252)][_0x5ec631(0xe6)](),this[_0x5ec631(0x252)]['hide'](),this[_0x5ec631(0x175)](),this[_0x5ec631(0x2a0)]()?this['setupSelectIngredientWindow']():this[_0x5ec631(0x74)](),$gameTemp[_0x5ec631(0x130)]=![],this[_0x5ec631(0x292)]=this['_itemWindow'][_0x5ec631(0xe6)]();},Scene_ItemCrafting['prototype'][_0x2332e4(0x74)]=function(){const _0x18ad5b=_0x2332e4;this[_0x18ad5b(0x9d)][_0x18ad5b(0x221)](),this[_0x18ad5b(0x253)]['hide'](),this['_categoryWindow']['show'](),$gameTemp[_0x18ad5b(0x130)]=!![],this[_0x18ad5b(0x2dc)][_0x18ad5b(0x149)](this[_0x18ad5b(0x252)][_0x18ad5b(0xe6)]()),$gameTemp[_0x18ad5b(0x130)]=![],this[_0x18ad5b(0x2dc)][_0x18ad5b(0x280)](),this['_numberWindow']['activate']();},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x13e)]=function(){const _0x56c1ba=_0x2332e4;this[_0x56c1ba(0x2dc)][_0x56c1ba(0x221)](),this[_0x56c1ba(0x9d)][_0x56c1ba(0x221)](),this[_0x56c1ba(0x253)]['hide'](),this[_0x56c1ba(0x71)][_0x56c1ba(0x280)](),this['_itemWindow'][_0x56c1ba(0x280)](),this[_0x56c1ba(0x252)][_0x56c1ba(0x21e)](),this['_itemWindow'][_0x56c1ba(0x17b)]();},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x15c)]=function(){const _0x13d671=_0x2332e4;VisuMZ[_0x13d671(0x19a)]['Settings'][_0x13d671(0x194)][_0x13d671(0x163)]?_0x13d671(0x165)!=='FwxTi'?(this[_0x13d671(0x176)]=_0x4af1b1,this[_0x13d671(0xf2)]()):this[_0x13d671(0x12a)]():this[_0x13d671(0x118)]();},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x118)]=function(){const _0xef0a8a=_0x2332e4;this[_0xef0a8a(0x1a7)][_0xef0a8a(0x2be)]=!![],this[_0xef0a8a(0x201)]=![],this[_0xef0a8a(0x23f)](),this[_0xef0a8a(0x1a5)](),this[_0xef0a8a(0x279)]();},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x279)]=function(){const _0x19cb2b=_0x2332e4;if(this[_0x19cb2b(0x235)]())this[_0x19cb2b(0xa8)]();else{if(_0x19cb2b(0xaf)!==_0x19cb2b(0xaf)){if(_0x47fd0f[_0x19cb2b(0x211)]()&&!this[_0x19cb2b(0x158)](_0x328765))return;_0x39ccbd[_0x19cb2b(0x19a)][_0x19cb2b(0x296)][_0x19cb2b(0x281)](this,_0x57726d);}else this[_0x19cb2b(0xb2)]();}},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0xb2)]=function(){const _0x37d970=_0x2332e4;this[_0x37d970(0x13e)](),this[_0x37d970(0x252)][_0x37d970(0xf2)](),this[_0x37d970(0x71)]['refresh'](),this['_categoryWindow'][_0x37d970(0x153)](),this['_categoryWindow']['callUpdateHelp'](),this[_0x37d970(0x27f)][_0x37d970(0xf2)](),this[_0x37d970(0x252)][_0x37d970(0x17b)]();},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x23f)]=function(){const _0x4c7ddf=_0x2332e4;$gameTemp[_0x4c7ddf(0x130)]=!![];let _0x494083=this[_0x4c7ddf(0x252)][_0x4c7ddf(0xe6)]();$gameTemp[_0x4c7ddf(0x130)]=![];const _0x66287=this[_0x4c7ddf(0x2dc)][_0x4c7ddf(0x278)](),_0x13744b=DataManager[_0x4c7ddf(0x20f)](_0x494083);let _0x31a5d0=0x0;for(const _0x286efc of _0x13744b){if(_0x4c7ddf(0x24b)!=='vrYog')this['_category']=_0x323ce2,this['_amount']=_0x185d91||0x1,this['refresh'](),this['scrollTo'](0x0,0x0),this[_0x4c7ddf(0x21e)](),this[_0x4c7ddf(0x75)](0x0);else{if(!_0x286efc)continue;let _0x18fb6b=_0x286efc[0x0];const _0x1d3342=_0x286efc[0x1]*_0x66287;if(_0x18fb6b===_0x4c7ddf(0x111))$gameParty['loseGold'](_0x1d3342);else{if(_0x4c7ddf(0x189)!==_0x4c7ddf(0x189))return _0x30fd40[_0x4c7ddf(0x112)]['helpWindowRectItemsEquipsCore'][_0x4c7ddf(0x281)](this);else typeof _0x18fb6b===_0x4c7ddf(0xc3)&&_0x18fb6b[_0x4c7ddf(0x277)](/CATEGORY/i)&&(_0x4c7ddf(0x1fb)!=='iErCk'?_0x557b7c[_0x4c7ddf(0x291)](_0x475dcb):(_0x18fb6b=this[_0x4c7ddf(0xc0)][_0x31a5d0],_0x31a5d0+=0x1)),$gameParty[_0x4c7ddf(0x2a2)](_0x18fb6b,_0x1d3342,![]);}}}_0x494083=this[_0x4c7ddf(0x252)]['item'](),$gameParty[_0x4c7ddf(0xc2)](_0x494083,_0x66287),this['_numberWindow'][_0x4c7ddf(0x278)]()>0x0?SoundManager[_0x4c7ddf(0x1d5)]():'poyEY'!=='poyEY'?this['drawIngredientCategory'](_0x10662f,_0x15d27d,_0x5ce9b3,_0x79a103,_0x2ab2da):SoundManager[_0x4c7ddf(0xec)](),$gameSystem[_0x4c7ddf(0x138)](_0x494083,_0x66287);},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x1a5)]=function(){const _0x336207=_0x2332e4,_0x46c01c=this[_0x336207(0x292)],_0x10f8dc=this[_0x336207(0x2dc)][_0x336207(0x278)]();VisuMZ[_0x336207(0x19a)]['TurnSwitches'](_0x46c01c,!![]),VisuMZ['ItemCraftingSys'][_0x336207(0xce)](_0x46c01c,![]),this['enableCraftingSwitches']();const _0x5155d5=DataManager[_0x336207(0x25a)](_0x46c01c);VisuMZ[_0x336207(0x19a)]['JS'][_0x5155d5]&&VisuMZ[_0x336207(0x19a)]['JS'][_0x5155d5][_0x336207(0x281)](this,_0x46c01c,_0x10f8dc),VisuMZ['ItemCraftingSys'][_0x336207(0x2ae)][_0x336207(0x24a)][_0x336207(0x10c)]['call'](this,_0x46c01c,_0x10f8dc);},VisuMZ[_0x2332e4(0x19a)]['TurnSwitches']=function(_0x29328d,_0x3cdf8e){const _0x562170=_0x2332e4,_0x5e6f11=_0x3cdf8e?VisuMZ[_0x562170(0x19a)]['RegExp'][_0x562170(0x28b)]:VisuMZ[_0x562170(0x19a)][_0x562170(0x133)][_0x562170(0xde)],_0x1911ef=_0x29328d[_0x562170(0x1bb)][_0x562170(0x277)](_0x5e6f11);if(_0x1911ef){if(_0x562170(0x212)==='iVPFS')_0x452e3e['push'](_0x2cc58b[_0x562170(0x1dc)](_0x8f92f3['gold']()/_0x3a05a7));else for(const _0x3a8a51 of _0x1911ef){if(_0x562170(0xf5)==='gPdCA')this[_0x562170(0x1d0)](_0x19b1f0,_0x12296f,!![]);else{if(!_0x3a8a51)continue;_0x3a8a51[_0x562170(0x277)](_0x5e6f11);const _0x2b1316=JSON['parse']('['+RegExp['$1'][_0x562170(0x277)](/\d+/g)+']');for(const _0x49f8ce of _0x2b1316){_0x562170(0x2ad)!==_0x562170(0x2ad)?this[_0x562170(0x95)]=_0x35eef1:$gameSwitches[_0x562170(0xd4)](_0x49f8ce,_0x3cdf8e);}}}}},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x254)]=function(){const _0x3a88a8=_0x2332e4;SoundManager['playCancel'](),this[_0x3a88a8(0x1d4)]();},Scene_ItemCrafting['prototype'][_0x2332e4(0x70)]=function(){const _0x3de445=_0x2332e4,_0x7290cf=this[_0x3de445(0x253)][_0x3de445(0xe6)]();this[_0x3de445(0xc0)][this[_0x3de445(0x187)]]=_0x7290cf,this[_0x3de445(0x187)]++,this[_0x3de445(0x6f)]();},Scene_ItemCrafting['prototype'][_0x2332e4(0x1d4)]=function(){const _0x444d09=_0x2332e4;this['_ingredientsList'][_0x444d09(0x169)](),this[_0x444d09(0x187)]--;if(this[_0x444d09(0x187)]<0x0)'VwVtP'!==_0x444d09(0x1dd)?this[_0x444d09(0x118)]():this[_0x444d09(0x13e)]();else{if(_0x444d09(0xe8)!==_0x444d09(0xe8))return _0x572207['ItemsEquipsCore'][_0x444d09(0x2ae)][_0x444d09(0x196)][_0x444d09(0x2a6)];else this[_0x444d09(0x6f)]();}},Scene_ItemCrafting[_0x2332e4(0x112)]['clearUserSelectedIngredients']=function(){const _0x95492b=_0x2332e4;this['_ingredientCategories']=[],this[_0x95492b(0x247)]=[],this[_0x95492b(0xc0)]=[],this['_ingredientIndex']=0x0;},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x2a0)]=function(){const _0x35c1a2=_0x2332e4;if(!this['_item'])return![];const _0x32039d=DataManager['getCraftingIngredients'](this[_0x35c1a2(0x292)]);for(const _0x18dce5 of _0x32039d){if(!_0x18dce5)continue;const _0x53cd8c=_0x18dce5[0x0];if(!_0x53cd8c)continue;if(typeof _0x53cd8c===_0x35c1a2(0xc3)&&_0x53cd8c['match'](/CATEGORY/i)){_0x53cd8c[_0x35c1a2(0x277)](/CATEGORY: (.*)/i);const _0x3aa134=String(RegExp['$1'])[_0x35c1a2(0x202)]();this[_0x35c1a2(0xab)][_0x35c1a2(0x2cb)](_0x3aa134),this[_0x35c1a2(0x247)][_0x35c1a2(0x2cb)](_0x18dce5[0x1]||0x1);}}return this[_0x35c1a2(0xab)][_0x35c1a2(0x243)]>0x0;},Scene_ItemCrafting[_0x2332e4(0x112)]['setupSelectIngredientWindow']=function(){const _0x30690c=_0x2332e4;if(this[_0x30690c(0x187)]>=this[_0x30690c(0xab)]['length'])return this[_0x30690c(0x74)]();this[_0x30690c(0x71)]['hide'](),this[_0x30690c(0x2dc)][_0x30690c(0x221)]();const _0x3dd662=this[_0x30690c(0xab)][this[_0x30690c(0x187)]],_0xd55778=this[_0x30690c(0x247)][this[_0x30690c(0x187)]];this[_0x30690c(0x9d)][_0x30690c(0x280)](),this[_0x30690c(0x253)][_0x30690c(0x280)](),this[_0x30690c(0x9d)][_0x30690c(0x210)][_0x30690c(0x2a9)]();const _0x4e921d=VisuMZ[_0x30690c(0x19a)]['Settings'][_0x30690c(0x24a)][_0x30690c(0x1a8)],_0x56fa55=VisuMZ[_0x30690c(0x1aa)][_0x30690c(0x2ae)][_0x30690c(0x2aa)]['ItemQuantityFmt'],_0x44180a=_0x4e921d[_0x30690c(0x1e6)](_0x3dd662,_0x56fa55[_0x30690c(0x1e6)](_0xd55778)),_0x4dc6a0=this[_0x30690c(0x9d)][_0x30690c(0x82)](0x0);this[_0x30690c(0x9d)][_0x30690c(0xd0)](_0x44180a,_0x4dc6a0['x'],_0x4dc6a0['y']),this[_0x30690c(0x253)][_0x30690c(0x149)](_0x3dd662,_0xd55778);},Scene_ItemCrafting['prototype'][_0x2332e4(0x6c)]=function(){const _0x22f422=_0x2332e4;if(this[_0x22f422(0x2dc)]&&this[_0x22f422(0x2dc)][_0x22f422(0x244)]){if('Jekvg'==='Jekvg')return TextManager[_0x22f422(0x2c2)]('left',_0x22f422(0x2c3));else{const _0x1e7ced=[this['_item'],0x1],_0x81d21f=this['itemNameY'](),_0x58e720=_0x42655e[_0x22f422(0x26f)](this[_0x22f422(0x292)]);this[_0x22f422(0x199)](_0x1e7ced,_0x81d21f,![],_0x58e720),this[_0x22f422(0x1c3)](_0x81d21f,'+');}}return Scene_Item[_0x22f422(0x112)][_0x22f422(0x6c)][_0x22f422(0x281)](this);},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x2da)]=function(){const _0x571932=_0x2332e4;if(this[_0x571932(0x2dc)]&&this[_0x571932(0x2dc)][_0x571932(0x244)]){if(_0x571932(0x146)==='kTTHD'){const _0x2b660a=_0x116205[_0x571932(0x1b6)];return _0x279f7c(_0x623795[_0x571932(0x17a)][_0x571932(0x243)]+0x1)['join'](_0x2b660a);}else return TextManager['getInputMultiButtonStrings']('up',_0x571932(0x282));}return Scene_Item[_0x571932(0x112)]['buttonAssistKey2']['call'](this);},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x262)]=function(){const _0x22972d=_0x2332e4;if(this[_0x22972d(0x10f)]())return VisuMZ['ItemsEquipsCore'][_0x22972d(0x2ae)][_0x22972d(0x2aa)][_0x22972d(0x209)];else{if(this[_0x22972d(0x2dc)]&&this[_0x22972d(0x2dc)][_0x22972d(0x244)]){if(_0x22972d(0x2c8)!==_0x22972d(0x2c8))_0x492983['setValue'](_0x2703ea['SwitchCraft'],![]);else return VisuMZ[_0x22972d(0x1aa)]['Settings']['ShopScene'][_0x22972d(0x2a6)];}}return Scene_Item[_0x22972d(0x112)][_0x22972d(0x262)][_0x22972d(0x281)](this);},Scene_ItemCrafting[_0x2332e4(0x112)]['buttonAssistText2']=function(){const _0x436afb=_0x2332e4;if(this[_0x436afb(0x2dc)]&&this[_0x436afb(0x2dc)]['active'])return VisuMZ[_0x436afb(0x1aa)][_0x436afb(0x2ae)]['ShopScene'][_0x436afb(0x7f)];return Scene_Item[_0x436afb(0x112)][_0x436afb(0x266)][_0x436afb(0x281)](this);},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x285)]=function(){const _0x2e0b6a=_0x2332e4;return this[_0x2e0b6a(0x2dc)]&&this[_0x2e0b6a(0x2dc)][_0x2e0b6a(0x244)]?'YiQpR'!==_0x2e0b6a(0x166)?_0x3dee8d[_0x2e0b6a(0x260)]&&_0x382d94[_0x2e0b6a(0x19e)][_0x2e0b6a(0x6b)]('['+_0x21e87a+']'):TextManager[_0x2e0b6a(0x20c)]:Scene_Item[_0x2e0b6a(0x112)][_0x2e0b6a(0x285)][_0x2e0b6a(0x281)](this);},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x179)]=function(){const _0x2ed813=_0x2332e4;Scene_MenuBase[_0x2ed813(0x112)][_0x2ed813(0x179)][_0x2ed813(0x281)](this),this[_0x2ed813(0x1ee)](this[_0x2ed813(0x2c0)]()),this[_0x2ed813(0x1de)]();},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x2c0)]=function(){const _0x56a888=_0x2332e4;return VisuMZ[_0x56a888(0x19a)][_0x56a888(0x2ae)]['BgSettings'][_0x56a888(0x1eb)];},Scene_ItemCrafting[_0x2332e4(0x112)]['createCustomBackgroundImages']=function(){const _0x44e164=_0x2332e4,_0x500de1={'BgFilename1':VisuMZ[_0x44e164(0x19a)][_0x44e164(0x2ae)][_0x44e164(0x147)][_0x44e164(0x1c9)],'BgFilename2':VisuMZ[_0x44e164(0x19a)][_0x44e164(0x2ae)][_0x44e164(0x147)][_0x44e164(0x143)]};_0x500de1&&(_0x500de1['BgFilename1']!==''||_0x500de1[_0x44e164(0x143)]!=='')&&(this[_0x44e164(0x16d)]=new Sprite(ImageManager[_0x44e164(0x28f)](_0x500de1[_0x44e164(0x1c9)])),this[_0x44e164(0x172)]=new Sprite(ImageManager[_0x44e164(0x20d)](_0x500de1[_0x44e164(0x143)])),this[_0x44e164(0x18c)](this[_0x44e164(0x16d)]),this[_0x44e164(0x18c)](this[_0x44e164(0x172)]),this['_backSprite1'][_0x44e164(0xd6)][_0x44e164(0x2c1)](this['adjustSprite']['bind'](this,this['_backSprite1'])),this['_backSprite2'][_0x44e164(0xd6)]['addLoadListener'](this['adjustSprite'][_0x44e164(0x25d)](this,this['_backSprite2'])));},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x248)]=function(_0x3e1114){const _0x3f6e07=_0x2332e4;this[_0x3f6e07(0x222)](_0x3e1114),this['centerSprite'](_0x3e1114);},Scene_ItemCrafting[_0x2332e4(0x112)]['startAnimation']=function(){const _0x1c8392=_0x2332e4;this[_0x1c8392(0x201)]=!![],this['_animationWait']=0x14,this['_windowLayer']['visible']=VisuMZ[_0x1c8392(0x19a)][_0x1c8392(0x2ae)]['Animation'][_0x1c8392(0x1c0)]||![],this[_0x1c8392(0x11c)]();},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x11c)]=function(){const _0x54dde2=_0x2332e4;this[_0x54dde2(0x2b7)]=new Sprite(),this[_0x54dde2(0x18c)](this[_0x54dde2(0x2b7)]),this[_0x54dde2(0x2b5)](),this[_0x54dde2(0x161)](),this[_0x54dde2(0x184)](),this[_0x54dde2(0xb6)](),this[_0x54dde2(0x249)](),this[_0x54dde2(0x23c)](this[_0x54dde2(0x173)][_0x54dde2(0x1b7)]());},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x2b5)]=function(){const _0x32c437=_0x2332e4,_0x3b0b2e=VisuMZ['ItemCraftingSys'][_0x32c437(0x133)],_0x33f82a=this['_item'][_0x32c437(0x1bb)];this['_craftPicture']='';if(_0x33f82a[_0x32c437(0x277)](_0x3b0b2e[_0x32c437(0xcf)]))this['_craftPicture']=String(RegExp['$1']);else{if(_0x33f82a['match'](_0x3b0b2e[_0x32c437(0xc1)])){if(_0x32c437(0x255)===_0x32c437(0x255))this[_0x32c437(0xf3)]=String(RegExp['$1']);else{this[_0x32c437(0xb2)]();return;}}}this[_0x32c437(0x124)]=new Sprite();this[_0x32c437(0xf3)]?'ARDZv'!==_0x32c437(0x109)?this['_iconSprite'][_0x32c437(0xd6)]=ImageManager[_0x32c437(0x87)](this[_0x32c437(0xf3)]):this[_0x32c437(0x71)][_0x32c437(0x1d8)](_0xc84f73[_0x32c437(0x239)]):(this[_0x32c437(0x124)][_0x32c437(0xd6)]=ImageManager['loadSystem'](_0x32c437(0xd2)),this[_0x32c437(0x124)][_0x32c437(0xd6)][_0x32c437(0x28e)]=![]);this[_0x32c437(0x124)]['anchor']['x']=0.5,this[_0x32c437(0x124)][_0x32c437(0x1ab)]['y']=0.5;if(!this[_0x32c437(0xf3)]){const _0x597515=VisuMZ[_0x32c437(0x19a)][_0x32c437(0x2ae)][_0x32c437(0x194)]['Scale']||0x8;this['_iconSprite'][_0x32c437(0x27c)]['x']=_0x597515,this[_0x32c437(0x124)]['scale']['y']=_0x597515;}this[_0x32c437(0x2b7)][_0x32c437(0x18c)](this['_iconSprite']);},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x161)]=function(){const _0x1b7fd3=_0x2332e4;if(this[_0x1b7fd3(0xf3)])return;const _0xc79e52=this[_0x1b7fd3(0x292)],_0xd550c0=_0xc79e52[_0x1b7fd3(0x1b4)],_0x5630ce=ImageManager['iconWidth'],_0x3de354=ImageManager[_0x1b7fd3(0x13c)],_0x173446=_0xd550c0%0x10*_0x5630ce,_0x4024a2=Math[_0x1b7fd3(0x1dc)](_0xd550c0/0x10)*_0x3de354;this['_iconSprite'][_0x1b7fd3(0xe3)](_0x173446,_0x4024a2,_0x5630ce,_0x3de354);},Scene_ItemCrafting[_0x2332e4(0x112)]['setItemSpritePosition']=function(){const _0x8e9c2f=_0x2332e4;this[_0x8e9c2f(0x2b7)]['x']=Math['round'](Graphics['width']/0x2);const _0x2bd92a=Math[_0x8e9c2f(0x6e)](ImageManager[_0x8e9c2f(0x13c)]*this[_0x8e9c2f(0x2b7)][_0x8e9c2f(0x27c)]['y']);this[_0x8e9c2f(0x2b7)]['y']=Math[_0x8e9c2f(0x6e)]((Graphics['height']+_0x2bd92a)/0x2);},Scene_ItemCrafting[_0x2332e4(0x112)]['setItemSpriteOpacity']=function(){const _0x28a222=_0x2332e4;this[_0x28a222(0x2c7)]=VisuMZ[_0x28a222(0x19a)][_0x28a222(0x2ae)][_0x28a222(0x194)][_0x28a222(0x2bf)]||0x1,this[_0x28a222(0x292)]['note']['match'](VisuMZ[_0x28a222(0x19a)][_0x28a222(0x133)][_0x28a222(0x11d)])&&(this[_0x28a222(0x2c7)]=Math[_0x28a222(0x26d)](Number(RegExp['$1']),0x1)),this[_0x28a222(0x2b7)]['opacity']=0x0;},Scene_ItemCrafting[_0x2332e4(0x112)]['createAnimationIDs']=function(){const _0x4a5896=_0x2332e4;this[_0x4a5896(0x173)]=[],this[_0x4a5896(0x292)][_0x4a5896(0x1bb)]['match'](VisuMZ[_0x4a5896(0x19a)][_0x4a5896(0x133)][_0x4a5896(0x131)])?this[_0x4a5896(0x173)]=RegExp['$1']['split'](',')[_0x4a5896(0x8b)](_0x1ba985=>Number(_0x1ba985)):'mgTOA'!==_0x4a5896(0x1e5)?this[_0x4a5896(0x173)]=this['_animationIDs'][_0x4a5896(0xf6)](VisuMZ['ItemCraftingSys']['Settings']['Animation']['Animations']):this[_0x4a5896(0xa8)]();},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x23c)]=function(_0x40a935){const _0x43e06e=_0x2332e4,_0x3e0714=$dataAnimations[_0x40a935];if(!_0x3e0714)return;const _0x1e111e=this[_0x43e06e(0x1b8)](_0x3e0714);this[_0x43e06e(0x245)]=new(_0x1e111e?Sprite_AnimationMV:Sprite_Animation)();const _0x565339=[this['_itemSprite']],_0xf9447a=0x0;this[_0x43e06e(0x245)][_0x43e06e(0x149)](_0x565339,_0x3e0714,![],_0xf9447a,null),this['addChild'](this[_0x43e06e(0x245)]);},Scene_ItemCrafting['prototype'][_0x2332e4(0x1b8)]=function(_0x666f4e){return!!_0x666f4e['frames'];},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x251)]=function(){const _0x452714=_0x2332e4;if(!this['_animationPlaying'])return;this[_0x452714(0xeb)](),this[_0x452714(0x7d)](),this[_0x452714(0x145)]()&&this['processFinishAnimation']();},Scene_ItemCrafting['prototype']['updateItemSpriteOpacity']=function(){const _0xeac59c=_0x2332e4;this['_itemSprite'][_0xeac59c(0x2de)]+=this[_0xeac59c(0x2c7)];},Scene_ItemCrafting['prototype']['updateAnimationSprite']=function(){const _0x3e1592=_0x2332e4;if(!this[_0x3e1592(0x245)])return;if(this[_0x3e1592(0x245)][_0x3e1592(0x1c4)]())return;this[_0x3e1592(0x219)](),this[_0x3e1592(0x23c)](this[_0x3e1592(0x173)][_0x3e1592(0x1b7)]());},Scene_ItemCrafting['prototype'][_0x2332e4(0x219)]=function(){const _0xeb24a2=_0x2332e4;if(!this['_animationSprite'])return;this[_0xeb24a2(0x2d4)](this[_0xeb24a2(0x245)]),this[_0xeb24a2(0x245)][_0xeb24a2(0xc5)](),this[_0xeb24a2(0x245)]=undefined;},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x2c4)]=function(){const _0x37a686=_0x2332e4;if(!this[_0x37a686(0x2b7)])return;this[_0x37a686(0x2d4)](this[_0x37a686(0x2b7)]),this['_itemSprite'][_0x37a686(0xc5)](),this[_0x37a686(0x2b7)]=undefined;},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x145)]=function(){const _0x34f674=_0x2332e4;if(TouchInput['isReleased']())return!![];if(Input[_0x34f674(0x1ea)]('ok'))return!![];if(Input[_0x34f674(0x1ea)](_0x34f674(0x1f5)))return!![];if(this[_0x34f674(0x2b7)][_0x34f674(0x2de)]<0xff)return![];if(this[_0x34f674(0x245)])return![];return this[_0x34f674(0x1f4)]--<=0x0;},Scene_ItemCrafting[_0x2332e4(0x112)]['processFinishAnimation']=function(){const _0x3535a8=_0x2332e4;this[_0x3535a8(0x219)](),this[_0x3535a8(0x2c4)](),this[_0x3535a8(0x118)](),TouchInput[_0x3535a8(0x2a9)](),Input[_0x3535a8(0x2a9)]();},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x27a)]=function(){const _0x2bdd50=_0x2332e4;Scene_Item['prototype']['terminate']['call'](this);if($gameSystem[_0x2bdd50(0x236)])return;$gameTemp[_0x2bdd50(0x162)]();},Scene_ItemCrafting['prototype'][_0x2332e4(0x119)]=function(){const _0x2acc88=_0x2332e4;if(!SceneManager[_0x2acc88(0x211)]())return;const _0x24b433=VisuMZ[_0x2acc88(0x19a)][_0x2acc88(0x2ae)][_0x2acc88(0x24a)];_0x24b433[_0x2acc88(0xcb)]&&(_0x2acc88(0x22d)!==_0x2acc88(0x79)?$gameSwitches['setValue'](_0x24b433[_0x2acc88(0xcb)],![]):(this[_0x2acc88(0xdb)](),this[_0x2acc88(0xc4)](this[_0x2acc88(0x252)])));},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x1f2)]=function(){const _0x6fac7d=_0x2332e4;if(!SceneManager[_0x6fac7d(0x211)]())return;const _0x4c1859=VisuMZ[_0x6fac7d(0x19a)]['Settings'][_0x6fac7d(0x24a)];_0x4c1859[_0x6fac7d(0xcb)]&&(_0x6fac7d(0x21a)!==_0x6fac7d(0xb4)?$gameSwitches[_0x6fac7d(0xd4)](_0x4c1859[_0x6fac7d(0xcb)],!![]):_0x4f993f=this[_0x6fac7d(0x8d)][_0x6fac7d(0x21f)]);},Scene_ItemCrafting[_0x2332e4(0x112)]['itemHasCraftCommonEvent']=function(){const _0x31fb07=_0x2332e4;if(!Imported[_0x31fb07(0x103)])return![];const _0x464d44=this[_0x31fb07(0x292)]?this[_0x31fb07(0x292)][_0x31fb07(0x1bb)]||'':'',_0x58d720=VisuMZ[_0x31fb07(0x19a)][_0x31fb07(0x133)];if(_0x464d44[_0x31fb07(0x277)](_0x58d720[_0x31fb07(0x217)])&&!$gameSystem['hasCraftingEventOccurred'](this['_item'])&&this['meetsCraftingCommonEventSwitches'](!![]))return!![];else{if(_0x464d44[_0x31fb07(0x277)](_0x58d720[_0x31fb07(0x2b2)])&&this[_0x31fb07(0x140)](![])){if(_0x31fb07(0x1d6)===_0x31fb07(0x107))_0x515c7c=_0x1f9021['getProxyItem'](_0x5a3c95);else return!![];}}return![];},Scene_ItemCrafting[_0x2332e4(0x112)][_0x2332e4(0x140)]=function(_0x1f556d){const _0x3157c1=_0x2332e4,_0x5bb57e=this[_0x3157c1(0x292)]?this[_0x3157c1(0x292)][_0x3157c1(0x1bb)]:'',_0x56df1f=VisuMZ['ItemCraftingSys'][_0x3157c1(0x133)],_0x31f85e=_0x1f556d?_0x3157c1(0x276):_0x3157c1(0x1b3);if(_0x5bb57e[_0x3157c1(0x277)](_0x56df1f[_0x31f85e+_0x3157c1(0x9b)])){const _0x2078d6=RegExp['$1'][_0x3157c1(0x220)](',')[_0x3157c1(0x8b)](_0x20b21c=>Number(_0x20b21c));for(const _0x2b27b7 of _0x2078d6){if(_0x3157c1(0xb8)!=='jZHae'){if($gameSwitches[_0x3157c1(0x22a)](_0x2b27b7)===![])return![];}else this[_0x3157c1(0x8c)][_0x3157c1(0x1d8)](_0x5050cd['StatusBgType']);}}if(_0x5bb57e[_0x3157c1(0x277)](_0x56df1f[_0x31f85e+_0x3157c1(0x81)])){if(_0x3157c1(0x205)!==_0x3157c1(0x205))_0x37e22a[_0x3157c1(0x19a)][_0x3157c1(0x1c2)](_0x42056b,_0xd612ec['$1']);else{const _0x5a4a91=RegExp['$1'][_0x3157c1(0x220)](',')['map'](_0x31c7d9=>Number(_0x31c7d9));for(const _0x55e9ad of _0x5a4a91){if($gameSwitches[_0x3157c1(0x22a)](_0x55e9ad)===!![])return!![];}return![];}}return!![];},Scene_ItemCrafting['prototype'][_0x2332e4(0xa8)]=function(){const _0x3fd34d=_0x2332e4,_0x11f32e=this[_0x3fd34d(0x292)]?this[_0x3fd34d(0x292)]['note']:'',_0x54f078=VisuMZ[_0x3fd34d(0x19a)][_0x3fd34d(0x133)];let _0x6deca3=0x0;if(this['meetsCraftingCommonEventSwitches'](!![])&&_0x11f32e['match'](_0x54f078['CraftEventOnce'])&&!$gameSystem[_0x3fd34d(0x1db)](this[_0x3fd34d(0x292)]))_0x6deca3=Number(RegExp['$1'])||0x1,$gameSystem['registerCraftingEvent'](this['_item']);else{if(this[_0x3fd34d(0x140)](![])&&_0x11f32e[_0x3fd34d(0x277)](_0x54f078[_0x3fd34d(0x2b2)])){if(_0x3fd34d(0x1fc)!=='ooHdr'){if(!_0xf2c416[_0x3fd34d(0x211)]())return;const _0x454eff=_0x133385['ItemCraftingSys'][_0x3fd34d(0x2ae)][_0x3fd34d(0x24a)];_0x454eff[_0x3fd34d(0xcb)]&&_0x1171b7[_0x3fd34d(0xd4)](_0x454eff['SwitchCraft'],!![]);}else _0x6deca3=Number(RegExp['$1'])||0x1;}}if(_0x6deca3<=0x0){if('RbovD'!==_0x3fd34d(0x2ac))return this[_0x3fd34d(0x1cb)]()[_0x3fd34d(0x106)](_0x4903cc=>this[_0x3fd34d(0x72)](_0x4903cc));else{this[_0x3fd34d(0xb2)]();return;}}$gameSystem[_0x3fd34d(0x236)]=!![],$gameTemp['reserveCommonEvent'](_0x6deca3),SceneManager[_0x3fd34d(0x9f)](Scene_Map);},VisuMZ[_0x2332e4(0x19a)][_0x2332e4(0x29f)]=Window_MenuCommand[_0x2332e4(0x112)][_0x2332e4(0x1ef)],Window_MenuCommand[_0x2332e4(0x112)][_0x2332e4(0x1ef)]=function(){const _0xa0fdce=_0x2332e4;VisuMZ[_0xa0fdce(0x19a)]['Window_MenuCommand_addOriginalCommands']['call'](this),this[_0xa0fdce(0x25f)]();},Window_MenuCommand['prototype'][_0x2332e4(0x25f)]=function(){const _0x4da43f=_0x2332e4;if(!this[_0x4da43f(0x23b)]())return;if(!this[_0x4da43f(0xf0)]())return;const _0x204279=TextManager[_0x4da43f(0x1f1)],_0x426f02=this['isItemCraftingCommandEnabled']();this[_0x4da43f(0x114)](_0x204279,_0x4da43f(0x129),_0x426f02);},Window_MenuCommand[_0x2332e4(0x112)][_0x2332e4(0x23b)]=function(){const _0x483f50=_0x2332e4;return Imported[_0x483f50(0xef)]?![]:!![];},Window_MenuCommand[_0x2332e4(0x112)][_0x2332e4(0xf0)]=function(){const _0x3c17d0=_0x2332e4;return $gameSystem[_0x3c17d0(0x1c8)]();},Window_MenuCommand[_0x2332e4(0x112)][_0x2332e4(0x1ac)]=function(){const _0x5b3a9e=_0x2332e4;if(DataManager[_0x5b3a9e(0x2d2)]()[_0x5b3a9e(0x243)]<=0x0)return![];return $gameSystem[_0x5b3a9e(0x246)]();},VisuMZ[_0x2332e4(0x19a)][_0x2332e4(0x238)]=Window_ItemCategory[_0x2332e4(0x112)][_0x2332e4(0xe5)],Window_ItemCategory[_0x2332e4(0x112)]['makeCommandList']=function(){const _0x530949=_0x2332e4;if(SceneManager[_0x530949(0x211)]()){this[_0x530949(0xa2)]();if(this['_list'][_0x530949(0x243)]<=0x0){if('vXlVt'!==_0x530949(0x23e)){this[_0x530949(0x159)](),SceneManager[_0x530949(0x14e)]['popScene']();return;}else this['initialize'](...arguments);}this[_0x530949(0x258)]();let _0x1485d5=this['index']();if(this[_0x530949(0x181)]){const _0x3b0532=this[_0x530949(0xbf)](this[_0x530949(0x181)]);if(_0x3b0532>=0x0)_0x1485d5=_0x3b0532;}_0x1485d5=_0x1485d5>=this['_list']['length']?0x0:_0x1485d5,this[_0x530949(0x18a)](_0x1485d5);}else _0x530949(0x29a)!=='WKNbc'?this[_0x530949(0x9d)][_0x530949(0x1d8)](_0x261883['IngredientTitle']):VisuMZ[_0x530949(0x19a)][_0x530949(0x238)][_0x530949(0x281)](this);},Window_ItemCategory[_0x2332e4(0x112)][_0x2332e4(0x258)]=function(){const _0x34db33=_0x2332e4,_0x1dba09=Window_ItemCategory[_0x34db33(0x26e)],_0x296f0d=DataManager['currentCraftableItems']()[_0x34db33(0x2b3)](),_0x5a7af6=[];for(const _0x235f17 of _0x1dba09){if(_0x34db33(0x1b2)===_0x34db33(0x1b2)){this[_0x34db33(0x18b)]=_0x235f17['Type'];for(const _0x46b35e of _0x296f0d){if('AWfaZ'===_0x34db33(0xb7)){if(Window_ItemList['prototype'][_0x34db33(0x6b)][_0x34db33(0x281)](this,_0x46b35e)){if(_0x34db33(0xf8)!=='AVUiF')_0x5a7af6['push'](_0x46b35e);else{if(!_0x1e77f8)return![];if(_0x113f82[_0x34db33(0x20f)](_0x32cc23)[_0x34db33(0x243)]<=0x0)return![];if(_0x352a8d[_0x34db33(0x1bb)][_0x34db33(0x277)](_0x2eed71[_0x34db33(0x19a)]['RegExp'][_0x34db33(0x2df)])){if(!_0x362640[_0x34db33(0x148)]())return![];}if(!_0x5b362f[_0x34db33(0x19a)][_0x34db33(0x2ae)][_0x34db33(0x24a)][_0x34db33(0x2ba)]['call'](this,_0xe386f0))return![];if(!_0x48cbe9[_0x34db33(0x19a)]['CheckAllSwitches'](_0x43f3e6))return![];if(!_0x3bf1fa[_0x34db33(0x19a)]['CheckAnySwitches'](_0x4cc71b))return![];return!![];}}}else return this[_0x34db33(0x2bd)]()[_0x34db33(0x106)](_0x9fbf64=>this['isCraftItemListed'](_0x9fbf64));}}else _0x1a0840(_0x13ac0a[_0x34db33(0x19a)][_0x34db33(0x226)]);}this[_0x34db33(0x18b)]=null;for(const _0xb3ca78 of _0x5a7af6){_0x296f0d[_0x34db33(0x291)](_0xb3ca78);}_0x296f0d['length']>0x0&&this[_0x34db33(0x159)](),this['_nonCategoryItemCraftingItems']=_0x296f0d;},Window_ItemCategory[_0x2332e4(0x112)]['addUncategorizedItemCategory']=function(){const _0x622f0a=_0x2332e4,_0x4ca3e8=VisuMZ[_0x622f0a(0x19a)][_0x622f0a(0x2ae)][_0x622f0a(0x24a)];let _0x98e57b=_0x4ca3e8[_0x622f0a(0xfc)]||_0x622f0a(0xfc),_0x4a101d=_0x4ca3e8[_0x622f0a(0x230)]||0xa0;_0x98e57b=_0x622f0a(0x2b6)[_0x622f0a(0x1e6)](_0x4a101d,_0x98e57b),this[_0x622f0a(0x114)](_0x98e57b,_0x622f0a(0xe0),!![],_0x622f0a(0x26b));},VisuMZ['ItemCraftingSys']['Window_ItemCategory_addItemCategory']=Window_ItemCategory[_0x2332e4(0x112)]['addItemCategory'],Window_ItemCategory[_0x2332e4(0x112)][_0x2332e4(0x1b5)]=function(_0x1c7a79){const _0x1cfe8d=_0x2332e4;if(SceneManager[_0x1cfe8d(0x211)]()&&!this['isItemCraftingCategoryValid'](_0x1c7a79))return;VisuMZ[_0x1cfe8d(0x19a)]['Window_ItemCategory_addItemCategory'][_0x1cfe8d(0x281)](this,_0x1c7a79);},Window_ItemCategory[_0x2332e4(0x112)][_0x2332e4(0x158)]=function(_0x598457){const _0xff0198=_0x2332e4,_0x1fe40e=DataManager[_0xff0198(0x2d2)](),_0x4a0b50=_0x598457[_0xff0198(0x268)],_0x559889=_0x598457[_0xff0198(0x132)];this[_0xff0198(0x18b)]=_0x4a0b50;for(const _0x55a05c of _0x1fe40e){if(!_0x55a05c)continue;if(Window_ItemList[_0xff0198(0x112)][_0xff0198(0x6b)][_0xff0198(0x281)](this,_0x55a05c))return this[_0xff0198(0x18b)]=null,!![];}return this['_category']=null,![];},VisuMZ[_0x2332e4(0x19a)][_0x2332e4(0x234)]=Window_ItemCategory[_0x2332e4(0x112)][_0x2332e4(0x231)],Window_ItemCategory[_0x2332e4(0x112)][_0x2332e4(0x231)]=function(){const _0xc05f87=_0x2332e4;if(SceneManager[_0xc05f87(0x211)]())return!![];return VisuMZ[_0xc05f87(0x19a)][_0xc05f87(0x234)][_0xc05f87(0x281)](this);},VisuMZ[_0x2332e4(0x19a)][_0x2332e4(0xdf)]=Window_Selectable[_0x2332e4(0x112)][_0x2332e4(0x18a)],Window_Selectable['prototype'][_0x2332e4(0x18a)]=function(_0xbf3f7d){const _0x36ffa3=_0x2332e4;VisuMZ[_0x36ffa3(0x19a)]['Window_Selectable_select'][_0x36ffa3(0x281)](this,_0xbf3f7d),this[_0x36ffa3(0x203)]===Window_ItemCategory&&SceneManager[_0x36ffa3(0x211)]()&&_0xbf3f7d>=0x0&&(_0x36ffa3(0x1f0)!==_0x36ffa3(0x233)?this['_lastCraftingExt']=this['currentExt']()||'':_0x24f8cc[_0x36ffa3(0x27d)](_0x1af5c6));};function _0xda32(){const _0x35ddf6=['buttonAssistText1','maxGold','STR','width','buttonAssistText2','nlTLi','Type','maskItalics','makeItemList','ItemCraftingNoCategory','_nonCategoryItemCraftingItems','max','categoryList','isCraftingItemMasked','SystemEnableItemCraftingMenu','ParseAllNotetags','VisuMZ_1_ItemsEquipsCore\x20needs\x20to\x20be\x20updated\x20','nbzlk','XUzUP','HmXCN','CraftOnce','match','number','onAnimationFinish','terminate','craftableItems','scale','loseGold','worldTransform','_goldWindow','show','call','down','itemWindowRect','selectLast','buttonAssistText4','GoldIcon','_data','IngredientBridge','allCraftableArmors','helpWindowRectItemsEquipsCore','OnSwitches','parse','setCustomItemCraftingSettings','smooth','loadTitle1','craftableArmors','remove','_item','jsOnCraft','%1/%2','lineHeight','Window_ItemCategory_addItemCategory','_number','OMhxl','ARRAYJSON','WKNbc','_helpWindow','ParseArmorNotetags','_allCraftableWeapons','drawIngredients','Window_MenuCommand_addOriginalCommands','doesItemHaveOpenCategories','ConvertParams','loseItem','isTouchedInsideFrame','allowCreateStatusWindow','setHandler','buttonAssistSmallIncrement','_categoryIndex','_itemIDs','clear','ItemScene','createCraftingIngredientsLists','RbovD','JKnSk','Settings','goldWindowRectItemsEquipsCore','BypassMasks','loadWindowskin','CraftEventRepeat','clone','drawTotalPrice','setItemSpriteBitmap','\x5cI[%1]%2','_itemSprite','ARRAYEVAL','initialize','jsGlobalListing','BTMmb','4576640FvwTjC','allCraftableItems','visible','FadeSpeed','getBackgroundOpacity','addLoadListener','getInputMultiButtonStrings','right','destroyItemSprite','4697080AvKRIO','changeOkButtonEnable','_itemSpriteOpacitySpeed','FbVxz','_buttons','drawTooltipBackground','push','Armors','178080KiGlvQ','isOkEnabled','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Ingredients','_buttonAssistWindow','currentCraftableItems','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','removeChild','drawCraftedIcon','setHelpWindow','CheckAllSwitches','fontSize','isItem','buttonAssistKey2','quantityFontSize','_numberWindow','Mask','opacity','customCraftingOnly','NumberBgType','LlrqC','includes','buttonAssistKey1','NumWindowNet','round','setupSelectIngredientWindow','onIngredientListOk','_categoryWindow','isCraftItemListed','pYvVt','setupNumberWindow','smoothSelect','updateTooltipWindow','MainMenu','\x20=\x20','HBsRp','KsYjV','drawCurrentItemName','createIngredientSelectionList','updateAnimationSprite','innerWidth','buttonAssistLargeIncrement','ParseWeaponNotetags','AnySw','itemLineRect','aObrd','helpWindowRect','18564480BBOHEM','mTMsa','loadPicture','CheckAnySwitches','dsdEV','getItemCraftedTimes','map','_statusWindow','_craftingEvents','NbUYd','Parse_Notetags_CreateJS','fDcIl','goldWindowRect','getItemIdWithName','craftableWeapons','drawCraftingItemName','_customItemCraftingSettings','commandItemCrafting','Change','gradientFillRect','textColor','fillRect','AllSw','isWeapon','_ingredientSelectTitle','left','goto','kKDNp','_alreadySelected','addItemCategories','JBWql','registerCommand','onItemOk','drawFadedItemBackground','ListBgType','processCraftCommonEvent','Net','Item','_ingredientCategories','hitIndex','15999IPoGBk','XsjMu','UnRkQ','\x20+\x20','determineMax','returnBackToItemWindow','CFcta','tNpYr','Game_System_initialize','setItemSpriteOpacity','AWfaZ','mIDjZ','getColor','items','%1%2','powerDownColor','getArmorIdWithName','fLkYG','findExt','_ingredientsList','bigPicture','gainItem','string','addWindow','destroy','drawCraftingIngredients','scrollTo','_commandWindow','weapons','placeButtons','SwitchCraft','_max','Weapons','TurnSwitches','craftPicture','drawTextEx','dsRkp','IconSet','#%1','setValue','EsOUK','bitmap','changeTextColor','NUM','currentExt','itemNameY','createStatusWindow','totalPriceY','createCommandWindow','OffSwitches','Window_Selectable_select','category','oFRDK','callUpdateHelp','setFrame','YXSOZ','makeCommandList','item','process_VisuMZ_ItemCraftingSys_Notetags','aZmIV','imageSmoothingEnabled','getWeaponIdWithName','updateItemSpriteOpacity','playCancel','setMainMenuItemCraftingVisible','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20item\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20number\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','VisuMZ_1_MainMenuCore','isItemCraftingCommandVisible','center','refresh','_craftPicture','windowPadding','QrXrL','concat','447199xeohTi','dqmXH','maskItemName','_craftingIngredients','version','Uncategorized','AtZkJ','StatusBgType','ARRAYNUM','iconWidth','tImFg','category:\x20%1','VisuMZ_2_ShopCommonEvents','jlVgw','initItemCraftingEvents','filter','uzcrL','You\x20do\x20not\x20have\x20any\x20craftable\x20items!\x0aRefer\x20to\x20the\x20help\x20file\x20on\x20how\x20to\x20create\x20crafting\x20recipes.','YaAFf','_context','setClickHandler','jsGlobalCraftEffect','selectedIngredientList','toUpperCase','buttonAssistItemListRequirement','registerCraftingEvent','gold','prototype','innerHeight','addCommand','setText','setTooltipWindowText','tooltipFrameCheckRequirements','finishAnimation','resetCraftingSwitches','itemCraftingIngredientsBridge','IngredientList','createItemSprite','opacitySpeed','fontItalic','cwkbi','qqzzu','MaskItalics','mXYFN','index','_iconSprite','isSceneMap','OgtJm','RMYKG','itemRectWithPadding','itemCrafting','startAnimation','NumWindowShift','initItemCraftingMainMenu','initItemCraftingSys','createNumberWindow','cursorWidth','_bypassProxy','animationIDs','Icon','RegExp','height','ButtonAssistBgType','EVAL','createIngredientSelectionTitle','registerCraftedItem','changePaintOpacity','HIjWI','CraftedIcon','iconHeight','AllSwitches','activateItemWindow','aVLMh','meetsCraftingCommonEventSwitches','parameters','278rnTkcQ','BgFilename2','isEnabled','isFinishedAnimating','CeBNp','BgSettings','getCustomItemCraftingSettings','setup','onCategoryOk','Owned','Window','isItemCrafted','_scene','_clickHandler','TxwIw','sUoZn','fittingHeight','refreshCursor','maxCols','CoreEngine','BypassSwitches','maxItems','isItemCraftingCategoryValid','addUncategorizedItemCategory','ToolTips','YIyZj','onNumberOk','systemColor','armor','_allCraftableArmors','join','setItemSpriteFrame','clearCustomItemCraftingSettings','ShowAnimations','statusWindowRectItemsEquipsCore','FwxTi','YiQpR','min','isTouchOkEnabled','pop','VisuMZ_1_ItemsEquipsCore','GoldBgType','vGCDc','_backSprite1','XXYQz','ARRAYSTR','windowskin','_weaponIDs','_backSprite2','_animationIDs','postCreateItemWindowModernControls','clearUserSelectedIngredients','_text','HelpBgType','IngredientTitle','createBackground','name','updateHelp','isShowNew','79863PTMZRm','playStaticSe','shown','EnableMainMenu','_lastCraftingExt','categoryWindowRect','buttonY','setItemSpritePosition','otIOI','PYVDi','_ingredientIndex','oYHGW','QlqOi','select','_category','addChild','dimColor2','NoMask','hasCustomWindowSkin','itemAt','numItems','Armor','330SsmPcy','Animation','\x20%1','ShopScene','createItemWindowBase','MaskText','drawItemIngredient','ItemCraftingSys','setItem','JSON','SystemShowItemCraftingMenu','description','Name','createItemWindow','bsXAi','onDatabaseLoaded','_tooltipWindow','makeFontBigger','onItemCrafted','blt','_windowLayer','CategoryTitle','drawItemName','ItemsEquipsCore','anchor','isItemCraftingCommandEnabled','Scene_Menu_createCommandWindow','textWidth','_itemsCrafted','categories','AxMay','dPivK','CraftRepeat','iconIndex','addItemCategory','itemCraftingMask','shift','isMVAnimation','ARRAYFUNC','zpTXW','note','kTNqB','ceil','resetFontSettings','hNwSb','ShowWindows','setWindowBackgroundTypes','createJS','drawMathMarks','isPlaying','net','drawText','isUseModernControls','isMainMenuItemCraftingVisible','BgFilename1','ItemQuantityFmt','allCraftableWeapons','Scene_Boot_onDatabaseLoaded','UwWav','PtdwD','isPlaytest','drawGoldIngredient','drawIngredientItem','_allCraftableItems','deactivate','onIngredientListCancel','playItemCrafting','MdcWD','NumWindowOwned','setBackgroundType','toLowerCase','isArmor','hasCraftingEventOccurred','floor','VwVtP','createCustomBackgroundImages','xnYOa','zbCsb','createGoldWindow','mOOYK','_armorIDs','Weapon','GYvdL','format','isSceneBattle','create','statusWindowRect','isTriggered','SnapshotOpacity','getProxyItem','itemCraftedIcon','setBackgroundOpacity','addOriginalCommands','KzeSq','ItemCraftingMenuCommand','enableCraftingSwitches','dimColor1','_animationWait','cancel','setStatusWindow','weapon','hgsLb','applyInverse','itemRect','iErCk','ooHdr','SrDUP','FUNC','drawPicture','drawBigItemImage','_animationPlaying','trim','constructor','CIslG','AJfVy','eMmCu','AdJLv','ShowMainMenu','buttonAssistCategory','exit','buyWindowRectItemsEquipsCore','itemCraftingNumberWindowOk','loadTitle2','onItemCancel','getCraftingIngredients','contents','isSceneItemCrafting','eocDH','onButtonOk','ParseItemNotetags','cMmEU','enabled','CraftEventOnce','Gold','destroyAnimationSprite','WRoPG','tooltipSkin','process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags','drawIngredientCategory','activate','armors','split','hide','scaleSprite','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','currencyUnit','drawBigItemIcon','WarningMsg','parseCraftingIngredientsData','loadSystem','itemPadding','value','zkloM','uFlZz','CYJTB','setMainMenuItemCraftingEnabled','drawCategories','NoCategoryIcon','needsSelection','all','nfNZC','Window_ItemCategory_needsSelection','itemHasCraftCommonEvent','_craftingCommonEventScene','update','Window_ItemCategory_makeCommandList','CategoryBgType','ReturnToLastCrafting','addItemCraftingCommandAutomatically','createAnimation','PkCpP','fWmYB','processItemCrafting','itemHeight','_maxIngredientsSize','Enable','length','active','_animationSprite','isMainMenuItemCraftingEnabled','_ingredientAmounts','adjustSprite','createAnimationIDs','General','vrYog','drawCurrencyValue','wTElC','visualGoldDisplayNoCost','OqgvS','_amount','updateCraftingAnimation','_itemWindow','_ingredientSelectList','onNumberCancel','iIltq','drawIcon','createContents','createUncategorizedItemCategory','in\x20order\x20for\x20VisuMZ_2_ItemCraftingSys\x20to\x20work.','createCraftingItemKey','allItems','_ItemCrafting_MainMenu','bind','ItemCraftingNumberWindow','addItemCraftingCommand','status','setHelpWindowItem'];_0xda32=function(){return _0x35ddf6;};return _0xda32();}function Window_ItemCraftingList(){this['initialize'](...arguments);}Window_ItemCraftingList[_0x2332e4(0x112)]=Object[_0x2332e4(0x1e8)](Window_ItemList['prototype']),Window_ItemCraftingList[_0x2332e4(0x112)][_0x2332e4(0x203)]=Window_ItemCraftingList,Window_ItemCraftingList[_0x2332e4(0x2db)]=VisuMZ[_0x2332e4(0x19a)]['Settings'][_0x2332e4(0x14c)]['ReqQuantityFontSize'],Window_ItemCraftingList[_0x2332e4(0x269)]=VisuMZ[_0x2332e4(0x19a)][_0x2332e4(0x2ae)]['Mask'][_0x2332e4(0x121)],Window_ItemCraftingList[_0x2332e4(0x112)][_0x2332e4(0x2b9)]=function(_0x5b962b){const _0x133c42=_0x2332e4;Window_ItemList[_0x133c42(0x112)]['initialize'][_0x133c42(0x281)](this,_0x5b962b),this['createTooltipWindow']();},Window_ItemCraftingList['prototype'][_0x2332e4(0x154)]=function(){return 0x1;},Window_ItemCraftingList[_0x2332e4(0x112)][_0x2332e4(0x240)]=function(){const _0x9ca288=_0x2332e4;return Window_Scrollable[_0x9ca288(0x112)][_0x9ca288(0x240)][_0x9ca288(0x281)](this)*0x3+0x8;},Window_ItemCraftingList[_0x2332e4(0x112)][_0x2332e4(0x144)]=function(_0x2c31df){return!![];},Window_ItemCraftingList[_0x2332e4(0x112)][_0x2332e4(0x26a)]=function(){const _0x2a54cf=_0x2332e4;this[_0x2a54cf(0x287)]=DataManager[_0x2a54cf(0x2d2)]()[_0x2a54cf(0x106)](_0x1a2869=>this[_0x2a54cf(0x6b)](_0x1a2869));const _0x15f792=this['_data'][_0x2a54cf(0x8b)](_0x54521b=>DataManager[_0x2a54cf(0x20f)](_0x54521b)[_0x2a54cf(0x243)]);this[_0x2a54cf(0x241)]=Math['max'](..._0x15f792)+0x1;},Window_ItemCraftingList[_0x2332e4(0x112)][_0x2332e4(0x6b)]=function(_0x4513ef){const _0x40d04f=_0x2332e4;if(this[_0x40d04f(0x18b)]===_0x40d04f(0x26b)){const _0x804fd3=SceneManager[_0x40d04f(0x14e)];if(_0x804fd3&&_0x804fd3[_0x40d04f(0x71)]&&_0x804fd3['_categoryWindow'][_0x40d04f(0x26c)])return _0x804fd3[_0x40d04f(0x71)][_0x40d04f(0x26c)][_0x40d04f(0x6b)](_0x4513ef);}return Window_ItemList[_0x40d04f(0x112)][_0x40d04f(0x6b)][_0x40d04f(0x281)](this,_0x4513ef);},Window_ItemCraftingList[_0x2332e4(0x112)][_0x2332e4(0x284)]=function(){},Window_ItemCraftingList[_0x2332e4(0x112)]['drawItem']=function(_0x2ba398){const _0x4c258c=_0x2332e4,_0x5b560e=this['itemAt'](_0x2ba398);if(!_0x5b560e)return;const _0x52a812=this['itemRectWithPadding'](_0x2ba398);this['resetFontSettings'](),this['drawFadedItemBackground'](_0x52a812,0x2),this[_0x4c258c(0x200)](_0x2ba398,_0x5b560e,_0x52a812),this['drawCraftedIcon'](_0x5b560e,_0x52a812),this[_0x4c258c(0x94)](_0x5b560e,_0x52a812),this['drawCraftingIngredients'](_0x5b560e,_0x52a812);},Window_ItemCraftingList[_0x2332e4(0x112)]['drawFadedItemBackground']=function(_0x2ce8f0,_0x343b16){const _0x5ced32=_0x2332e4;_0x343b16=_0x343b16||0x1,this[_0x5ced32(0x139)](![]);const _0x3f7870=ColorManager[_0x5ced32(0x1f3)](),_0x1f4714=ColorManager[_0x5ced32(0x18d)](),_0x35b16e=_0x2ce8f0['width']/0x2,_0x5f7f60=this[_0x5ced32(0x295)]();while(_0x343b16--){this[_0x5ced32(0x210)][_0x5ced32(0x98)](_0x2ce8f0['x'],_0x2ce8f0['y'],_0x35b16e,_0x5f7f60,_0x1f4714,_0x3f7870),this[_0x5ced32(0x210)][_0x5ced32(0x98)](_0x2ce8f0['x']+_0x35b16e,_0x2ce8f0['y'],_0x35b16e,_0x5f7f60,_0x3f7870,_0x1f4714);}this[_0x5ced32(0x139)](!![]);},Window_Base[_0x2332e4(0x112)][_0x2332e4(0x94)]=function(_0x45898e,_0x599651){const _0x3b19b3=_0x2332e4;let _0x26f870=_0x45898e['name'],_0xb26699=_0x599651[_0x3b19b3(0x134)]+this[_0x3b19b3(0x229)]()*0x2,_0x4ab230=_0x599651['y'],_0xc65bb6=_0x599651[_0x3b19b3(0x265)]-_0xb26699-this['itemPadding']()-ImageManager[_0x3b19b3(0x100)];DataManager[_0x3b19b3(0x26f)](_0x45898e)&&(_0x26f870=VisuMZ[_0x3b19b3(0x19a)][_0x3b19b3(0xf9)](_0x45898e),this[_0x3b19b3(0x210)][_0x3b19b3(0x11e)]=Window_ItemCraftingList[_0x3b19b3(0x269)]),this[_0x3b19b3(0x1c6)](_0x26f870,_0xb26699,_0x4ab230,_0xc65bb6,_0x3b19b3(0x9e)),this[_0x3b19b3(0x210)][_0x3b19b3(0x11e)]=![];},VisuMZ[_0x2332e4(0x19a)]['maskItemName']=function(_0x148a7e){const _0x434a5a=_0x2332e4;DataManager['getProxyItem']&&(_0x148a7e=DataManager[_0x434a5a(0x1ec)](_0x148a7e));if(_0x148a7e['note'][_0x434a5a(0x277)](VisuMZ[_0x434a5a(0x19a)]['RegExp'][_0x434a5a(0x198)])){if(_0x434a5a(0x73)===_0x434a5a(0xfd)){if(this[_0x434a5a(0x18b)]===_0x434a5a(0x26b)){const _0x16f388=_0x532390[_0x434a5a(0x14e)];if(_0x16f388&&_0x16f388[_0x434a5a(0x71)]&&_0x16f388[_0x434a5a(0x71)][_0x434a5a(0x26c)])return _0x16f388[_0x434a5a(0x71)][_0x434a5a(0x26c)]['includes'](_0x595195);}return _0x1af701[_0x434a5a(0x112)][_0x434a5a(0x6b)]['call'](this,_0x513e46);}else return String(RegExp['$1']);}else{if(_0x434a5a(0x22b)!==_0x434a5a(0x22b))this[_0x434a5a(0xd7)](_0x11e74d[_0x434a5a(0xbc)]());else{const _0x2219af=TextManager[_0x434a5a(0x1b6)];return Array(_0x148a7e['name'][_0x434a5a(0x243)]+0x1)[_0x434a5a(0x160)](_0x2219af);}}},Window_ItemCraftingList[_0x2332e4(0x112)][_0x2332e4(0x200)]=function(_0x41ad9b,_0x2216b3,_0x4e0f73){const _0x49790d=_0x2332e4,_0x595994=VisuMZ[_0x49790d(0x19a)][_0x49790d(0x133)],_0x2d2e85=_0x2216b3[_0x49790d(0x1bb)];let _0x566e53='';if(_0x2d2e85['match'](_0x595994[_0x49790d(0xcf)]))_0x566e53=String(RegExp['$1']);else _0x2d2e85['match'](_0x595994[_0x49790d(0xc1)])&&(_0x566e53=String(RegExp['$1']));if(_0x566e53){const _0xcf4917=ImageManager[_0x49790d(0x87)](_0x566e53);_0xcf4917['addLoadListener'](this[_0x49790d(0x1ff)][_0x49790d(0x25d)](this,_0x41ad9b,_0xcf4917));}else this[_0x49790d(0x225)](_0x2216b3,_0x4e0f73);},Window_ItemCraftingList['prototype']['drawPicture']=function(_0xe4937b,_0x53eb89){const _0x2fbbac=_0x2332e4,_0x390264=this[_0x2fbbac(0x128)](_0xe4937b);let _0x10c529=_0x390264['x']+this['itemPadding'](),_0x269033=_0x390264['y']+0x4,_0x5eb98c=_0x390264[_0x2fbbac(0x265)]-this[_0x2fbbac(0x229)]()*0x2,_0x259e9=_0x390264[_0x2fbbac(0x134)]-0x8,_0xc53b78=Math[_0x2fbbac(0x167)](_0x5eb98c,_0x259e9);const _0x21b776=_0xc53b78/_0x53eb89[_0x2fbbac(0x265)],_0x275716=_0xc53b78/_0x53eb89[_0x2fbbac(0x134)],_0x88e821=Math[_0x2fbbac(0x167)](_0x21b776,_0x275716,0x1);let _0xe5f9f9=Math[_0x2fbbac(0x6e)](_0x53eb89[_0x2fbbac(0x265)]*_0x88e821),_0x2e6413=Math['round'](_0x53eb89['height']*_0x88e821);_0x10c529+=Math['round']((_0xc53b78-_0xe5f9f9)/0x2),_0x269033+=Math[_0x2fbbac(0x6e)]((_0xc53b78-_0x2e6413)/0x2);const _0x33da52=_0x53eb89[_0x2fbbac(0x265)],_0x2a522e=_0x53eb89[_0x2fbbac(0x134)];this[_0x2fbbac(0x210)][_0x2fbbac(0x10a)][_0x2fbbac(0xe9)]=!![],this[_0x2fbbac(0x210)]['blt'](_0x53eb89,0x0,0x0,_0x33da52,_0x2a522e,_0x10c529,_0x269033,_0xe5f9f9,_0x2e6413),this[_0x2fbbac(0x210)][_0x2fbbac(0x10a)][_0x2fbbac(0xe9)]=!![];},Window_ItemCraftingList[_0x2332e4(0x112)][_0x2332e4(0x225)]=function(_0x14e86a,_0x35f34d){const _0x15ddb0=_0x2332e4,_0x24a3cc=_0x14e86a[_0x15ddb0(0x1b4)];let _0x2f6a66=_0x35f34d['x']+this[_0x15ddb0(0x229)](),_0x3489ef=_0x35f34d['y']+0x4,_0x5514c5=_0x35f34d[_0x15ddb0(0x265)]-this[_0x15ddb0(0x229)]()*0x2,_0x131dd6=_0x35f34d[_0x15ddb0(0x134)]-0x8,_0x4b9ada=Math['min'](_0x5514c5,_0x131dd6);_0x4b9ada=Math['floor'](_0x4b9ada/ImageManager[_0x15ddb0(0x100)])*ImageManager[_0x15ddb0(0x100)],_0x3489ef+=(_0x131dd6-_0x4b9ada)/0x2;const _0x2a05f9=ImageManager[_0x15ddb0(0x228)](_0x15ddb0(0xd2)),_0x536ed9=ImageManager[_0x15ddb0(0x100)],_0x3f9b1c=ImageManager[_0x15ddb0(0x13c)],_0x958c4a=_0x24a3cc%0x10*_0x536ed9,_0x1cecd1=Math[_0x15ddb0(0x1dc)](_0x24a3cc/0x10)*_0x3f9b1c;this[_0x15ddb0(0x210)][_0x15ddb0(0x10a)][_0x15ddb0(0xe9)]=![],this[_0x15ddb0(0x210)]['blt'](_0x2a05f9,_0x958c4a,_0x1cecd1,_0x536ed9,_0x3f9b1c,_0x2f6a66,_0x3489ef,_0x4b9ada,_0x4b9ada),this[_0x15ddb0(0x210)][_0x15ddb0(0x10a)]['imageSmoothingEnabled']=!![];},Window_ItemCraftingList[_0x2332e4(0x112)]['drawCraftedIcon']=function(_0x291d7d,_0x388ae0){const _0x1f3625=_0x2332e4;if(!$gameSystem[_0x1f3625(0x14d)](_0x291d7d))return;const _0x34f89b=ImageManager[_0x1f3625(0x1ed)];let _0x570337=_0x388ae0['x']+_0x388ae0[_0x1f3625(0x265)]-ImageManager['iconWidth'],_0x4e1d18=_0x388ae0['y']+0x2;this[_0x1f3625(0x256)](_0x34f89b,_0x570337,_0x4e1d18);},Window_ItemCraftingList[_0x2332e4(0x112)][_0x2332e4(0xc6)]=function(_0xb363dd,_0x41e27c){const _0x9d4aeb=_0x2332e4,_0x2b21ec=DataManager[_0x9d4aeb(0x20f)](_0xb363dd);let _0x1786f3=_0x41e27c[_0x9d4aeb(0x134)]+this[_0x9d4aeb(0x229)]()*0x2,_0x444918=_0x41e27c['y']+Math['round'](this[_0x9d4aeb(0x295)]()*1.2),_0x4bdf91=_0x41e27c[_0x9d4aeb(0x265)]-_0x1786f3-this[_0x9d4aeb(0x229)](),_0x1f85d7=Math[_0x9d4aeb(0x1dc)](_0x4bdf91/this[_0x9d4aeb(0x241)]),_0x5af699=!![];for(const _0x179142 of _0x2b21ec){if(!_0x5af699){let _0x592eaf=TextManager[_0x9d4aeb(0x11a)],_0x2389c7=_0x41e27c['y']+(_0x41e27c[_0x9d4aeb(0x134)]-this['lineHeight']()*1.5);this[_0x9d4aeb(0x1c6)](_0x592eaf,_0x1786f3,_0x2389c7,_0x1f85d7,_0x9d4aeb(0xf1));}_0x1786f3+=_0x1f85d7;const _0x4d302b=_0x179142[0x0],_0x11bfde=_0x179142[0x1],_0x1bf56e=_0x4d302b==='gold'?$gameParty[_0x9d4aeb(0x111)]():$gameParty[_0x9d4aeb(0x191)](_0x4d302b);if(_0x4d302b===_0x9d4aeb(0x111)){if(_0x9d4aeb(0x126)!==_0x9d4aeb(0x126)){const _0x41143d=_0x5d7863(_0x5360c2['$1']);_0x41143d!==_0x5ab990[_0x19ad69][_0x9d4aeb(0xfb)]&&(_0x25053a('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x9d4aeb(0x1e6)](_0x1507b5,_0x41143d)),_0x30b903[_0x9d4aeb(0x20a)]());}else this['drawIngredientGold'](_0x11bfde,_0x1bf56e,_0x1786f3,_0x444918,_0x1f85d7);}else typeof _0x4d302b==='string'&&_0x4d302b[_0x9d4aeb(0x277)](/CATEGORY/i)?this[_0x9d4aeb(0x21d)](_0x4d302b,_0x11bfde,_0x1786f3,_0x444918,_0x1f85d7):this[_0x9d4aeb(0x1d1)](_0x4d302b,_0x11bfde,_0x1bf56e,_0x1786f3,_0x444918,_0x1f85d7);this[_0x9d4aeb(0x1be)](),_0x5af699=![];}},Window_ItemCraftingList[_0x2332e4(0x112)]['drawIngredientGold']=function(_0x1db9d7,_0xd884c7,_0x3ac901,_0x4d42ae,_0x4a6d79){const _0x149fb5=_0x2332e4;if(Imported['VisuMZ_0_CoreEngine']){if('EsOUK'===_0x149fb5(0xd5)){let _0x132dc7=_0x3ac901-Math['round'](ImageManager[_0x149fb5(0x100)]/0x2),_0x492bde=_0x4d42ae+Math[_0x149fb5(0x6e)]((this[_0x149fb5(0x295)]()-ImageManager[_0x149fb5(0x13c)])/0x2);const _0x27fcfd=VisuMZ['CoreEngine']?VisuMZ[_0x149fb5(0x155)][_0x149fb5(0x2ae)][_0x149fb5(0x218)][_0x149fb5(0x286)]:0x0;this[_0x149fb5(0x256)](_0x27fcfd,_0x132dc7,_0x492bde);}else return this['isOkEnabled']();}else{let _0x17871a=_0x3ac901-Math['round'](_0x4a6d79/0x2),_0x2f9bda=_0x4d42ae+Math[_0x149fb5(0x6e)]((this['lineHeight']()-ImageManager[_0x149fb5(0x13c)])/0x2);this[_0x149fb5(0xd7)](ColorManager['systemColor']()),this[_0x149fb5(0x1a4)](),this['drawText'](TextManager[_0x149fb5(0x224)],_0x17871a,_0x2f9bda,_0x4a6d79,'center'),this[_0x149fb5(0x1be)]();}let _0x356acf=_0x3ac901-Math[_0x149fb5(0x6e)](_0x4a6d79/0x2),_0x428e0e=_0x4d42ae+this['lineHeight']();const _0x45d425=VisuMZ['ItemsEquipsCore'][_0x149fb5(0x2ae)][_0x149fb5(0x2aa)][_0x149fb5(0x1ca)];let _0x3ba578=_0x45d425[_0x149fb5(0x1e6)](_0x1db9d7);_0x1db9d7>_0xd884c7&&(_0x149fb5(0x15b)===_0x149fb5(0x15b)?this[_0x149fb5(0xd7)](ColorManager['powerDownColor']()):(this[_0x149fb5(0x219)](),this['destroyItemSprite'](),this[_0x149fb5(0x118)](),_0x11e9ec[_0x149fb5(0x2a9)](),_0xc146ee[_0x149fb5(0x2a9)]())),this[_0x149fb5(0x210)]['fontSize']=Window_ItemCraftingList[_0x149fb5(0x2db)],this[_0x149fb5(0x1c6)](_0x3ba578,_0x356acf,_0x428e0e,_0x4a6d79,_0x149fb5(0xf1));},Window_ItemCraftingList[_0x2332e4(0x112)][_0x2332e4(0x21d)]=function(_0x1e019b,_0x5c9d82,_0x37083f,_0x4f6f33,_0x544f7a){const _0x2ff5d6=_0x2332e4,_0x46f151=VisuMZ[_0x2ff5d6(0x19a)][_0x2ff5d6(0x2ae)][_0x2ff5d6(0x24a)];let _0x6ba4ef=_0x37083f-Math[_0x2ff5d6(0x6e)](ImageManager['iconWidth']/0x2),_0x17e389=_0x4f6f33+Math['round']((this[_0x2ff5d6(0x295)]()-ImageManager[_0x2ff5d6(0x13c)])/0x2);this[_0x2ff5d6(0x256)](_0x46f151['CategoryIcon'],_0x6ba4ef,_0x17e389),_0x1e019b[_0x2ff5d6(0x277)](/CATEGORY: (.*)/i);const _0x302dc1=String(RegExp['$1'])[_0x2ff5d6(0x202)]();let _0x463802=_0x37083f-Math[_0x2ff5d6(0x6e)](_0x544f7a/0x2),_0x578c07=_0x4f6f33;this['contents']['fontSize']=Window_ItemCraftingList[_0x2ff5d6(0x2db)],this[_0x2ff5d6(0x1c6)](_0x302dc1,_0x463802,_0x578c07,_0x544f7a,_0x2ff5d6(0xf1));let _0x52cdb9=_0x37083f-Math[_0x2ff5d6(0x6e)](_0x544f7a/0x2),_0x1d640d=_0x4f6f33+this[_0x2ff5d6(0x295)]();const _0x3fefee=VisuMZ[_0x2ff5d6(0x1aa)]['Settings'][_0x2ff5d6(0x2aa)]['ItemQuantityFmt'];let _0x53b4e3=_0x3fefee[_0x2ff5d6(0x1e6)](_0x5c9d82);this[_0x2ff5d6(0x210)][_0x2ff5d6(0x2d8)]=Window_ItemCraftingList['quantityFontSize'],this[_0x2ff5d6(0x1c6)](_0x53b4e3,_0x52cdb9,_0x1d640d,_0x544f7a,_0x2ff5d6(0xf1));},Window_ItemCraftingList['prototype'][_0x2332e4(0x1d1)]=function(_0x267b4f,_0x594e5b,_0x1a5616,_0x111f9e,_0x55b957,_0x2744bf){const _0x11848d=_0x2332e4;let _0x1cbb0d=_0x111f9e-Math['round'](ImageManager['iconWidth']/0x2),_0x14d5a8=_0x55b957+Math[_0x11848d(0x6e)]((this[_0x11848d(0x295)]()-ImageManager['iconHeight'])/0x2);this[_0x11848d(0x256)](_0x267b4f[_0x11848d(0x1b4)],_0x1cbb0d,_0x14d5a8);let _0x3362cf=_0x111f9e-Math['round'](_0x2744bf/0x2),_0x2a7110=_0x55b957+this[_0x11848d(0x295)]();const _0x1cf56b=VisuMZ['ItemsEquipsCore']['Settings'][_0x11848d(0x2aa)][_0x11848d(0x1ca)];let _0x2d4878=_0x1cf56b[_0x11848d(0x1e6)](_0x11848d(0x294)[_0x11848d(0x1e6)](_0x1a5616,_0x594e5b));if(_0x594e5b>_0x1a5616){if(_0x11848d(0x6a)==='gVqZJ'){let _0x1309d7=_0x13b8b5-_0x433fd4['round'](_0x419203/0x2),_0x214691=_0x588566+_0x33a84a['round']((this[_0x11848d(0x295)]()-_0x2b2d69[_0x11848d(0x13c)])/0x2);this[_0x11848d(0xd7)](_0xc25db1[_0x11848d(0x15d)]()),this[_0x11848d(0x1a4)](),this[_0x11848d(0x1c6)](_0x5d3369[_0x11848d(0x224)],_0x1309d7,_0x214691,_0x5b63da,'center'),this[_0x11848d(0x1be)]();}else this['changeTextColor'](ColorManager[_0x11848d(0xbc)]());}this['contents'][_0x11848d(0x2d8)]=Window_ItemCraftingList['quantityFontSize'],this[_0x11848d(0x1c6)](_0x2d4878,_0x3362cf,_0x2a7110,_0x2744bf,'center');},Window_ItemCraftingList['prototype']['createTooltipWindow']=function(){const _0xe5c491=_0x2332e4;if(!VisuMZ[_0xe5c491(0x19a)][_0xe5c491(0x2ae)]['Window'][_0xe5c491(0x15a)])return;const _0x3aa78d=new Rectangle(0x0,0x0,Graphics['boxWidth'],Window_Base[_0xe5c491(0x112)][_0xe5c491(0x152)](0x1));this[_0xe5c491(0x1a3)]=new Window_ItemCraftingTooltip(_0x3aa78d),this['addChild'](this[_0xe5c491(0x1a3)]);},Window_ItemCraftingList[_0x2332e4(0x112)][_0x2332e4(0x237)]=function(){const _0x4a10ef=_0x2332e4;Window_ItemList[_0x4a10ef(0x112)]['update'][_0x4a10ef(0x281)](this),this[_0x4a10ef(0x76)]();},Window_ItemCraftingList[_0x2332e4(0x112)][_0x2332e4(0x76)]=function(){const _0x25ea06=_0x2332e4;if(!this[_0x25ea06(0x1a3)])return;if(this[_0x25ea06(0x117)]()){if(_0x25ea06(0x1ba)!==_0x25ea06(0x1ba)){const _0x1dd46f=this['categoryWindowRect']();this[_0x25ea06(0x9d)]=new _0x472c61(_0x1dd46f),this['_ingredientSelectTitle'][_0x25ea06(0x221)](),this[_0x25ea06(0xc4)](this[_0x25ea06(0x9d)]);}else this[_0x25ea06(0x116)]();}else this['_tooltipWindow']['setText']('');const _0x27512f=new Point(TouchInput['x'],TouchInput['y']),_0x1f1ec7=this[_0x25ea06(0x27e)][_0x25ea06(0x1f9)](_0x27512f);this[_0x25ea06(0x1a3)]['x']=_0x1f1ec7['x']-this[_0x25ea06(0x1a3)][_0x25ea06(0x265)]/0x2,this[_0x25ea06(0x1a3)]['y']=_0x1f1ec7['y']-this['_tooltipWindow'][_0x25ea06(0x134)];},Window_ItemCraftingList[_0x2332e4(0x112)][_0x2332e4(0x117)]=function(){const _0x2adcfb=_0x2332e4;if(!this['active'])return![];if(!this[_0x2adcfb(0xe6)]())return![];if(!this['isTouchedInsideFrame']())return![];if(this[_0x2adcfb(0xac)]()!==this[_0x2adcfb(0x123)]())return![];return!![];},Window_ItemCraftingList[_0x2332e4(0x112)][_0x2332e4(0x116)]=function(){const _0x26d533=_0x2332e4,_0x58ecf9=this[_0x26d533(0x128)](this[_0x26d533(0x123)]());$gameTemp[_0x26d533(0x130)]=!![];const _0x47ffdf=DataManager[_0x26d533(0x20f)](this[_0x26d533(0xe6)]());$gameTemp[_0x26d533(0x130)]=![];const _0x44c5e1=new Point(TouchInput['x'],TouchInput['y']),_0x37e53b=this[_0x26d533(0x27e)][_0x26d533(0x1f9)](_0x44c5e1);let _0x40fd54=_0x58ecf9[_0x26d533(0x134)]+this[_0x26d533(0x229)]()*0x2,_0xbbd26e=_0x58ecf9['y']+this[_0x26d533(0x295)](),_0x30d677=_0x58ecf9[_0x26d533(0x265)]-_0x40fd54-this[_0x26d533(0x229)](),_0x5f1c70=Math['floor'](_0x30d677/this[_0x26d533(0x241)]);for(const _0xd330e of _0x47ffdf){if(_0x26d533(0x120)!==_0x26d533(0x122)){_0x40fd54+=_0x5f1c70;const _0x49bf67=new Rectangle(_0x40fd54-ImageManager['iconWidth'],0x0,ImageManager[_0x26d533(0x100)]*0x2,Graphics['boxHeight']);if(_0x49bf67['contains'](_0x37e53b['x'],_0x37e53b['y'])){let _0x304344=_0xd330e[0x0],_0x19ed7f='';if(_0x304344===_0x26d533(0x111)){if(_0x26d533(0xe4)===_0x26d533(0x1df))return _0x181516[_0x26d533(0x112)]['commandWindowRectItemsEquipsCore'][_0x26d533(0x281)](this);else _0x19ed7f=TextManager[_0x26d533(0x224)];}else{if(typeof _0x304344==='string'&&_0x304344[_0x26d533(0x277)](/CATEGORY/i)){if('PtdwD'!==_0x26d533(0x1ce))return this[_0x26d533(0x74)]();else _0x304344[_0x26d533(0x277)](/CATEGORY: (.*)/i),_0x19ed7f=String(RegExp['$1'])['trim']();}else _0x19ed7f=_0x304344[_0x26d533(0x17a)];}this[_0x26d533(0x1a3)][_0x26d533(0x115)](_0x19ed7f[_0x26d533(0x202)]());return;}}else{_0x33559f['isPlaytest']()&&_0x44277d(_0x4a0409[_0x26d533(0x19a)][_0x26d533(0x226)]);return;}}this[_0x26d533(0x1a3)][_0x26d533(0x115)]('');},Window_ItemCraftingList[_0x2332e4(0x112)][_0x2332e4(0x17b)]=function(){const _0x26bf3a=_0x2332e4,_0x16c6e3=this[_0x26bf3a(0xe6)]()&&DataManager[_0x26bf3a(0x26f)](this[_0x26bf3a(0xe6)]())?null:this[_0x26bf3a(0xe6)]();this[_0x26bf3a(0x261)](_0x16c6e3);if(this[_0x26bf3a(0x8c)]&&this[_0x26bf3a(0x8c)][_0x26bf3a(0x203)]===Window_ShopStatus){if('PYVDi'!==_0x26bf3a(0x186))return _0x36b9d8['tooltipSkin']!=='';else this['_statusWindow'][_0x26bf3a(0x19b)](_0x16c6e3);}};function Window_ItemCraftingTooltip(){const _0x4f58be=_0x2332e4;this[_0x4f58be(0x2b9)](...arguments);}Window_ItemCraftingTooltip[_0x2332e4(0x112)]=Object[_0x2332e4(0x1e8)](Window_Base['prototype']),Window_ItemCraftingTooltip[_0x2332e4(0x112)]['constructor']=Window_ItemCraftingTooltip,Window_ItemCraftingTooltip[_0x2332e4(0x21b)]=VisuMZ['ItemCraftingSys']['Settings'][_0x2332e4(0x14c)][_0x2332e4(0x17a)],Window_ItemCraftingTooltip[_0x2332e4(0x112)][_0x2332e4(0x2b9)]=function(_0x5c9793){const _0x1478e9=_0x2332e4;Window_Base[_0x1478e9(0x112)][_0x1478e9(0x2b9)][_0x1478e9(0x281)](this,_0x5c9793),this[_0x1478e9(0x1d8)](this[_0x1478e9(0x18f)]()?0x0:0x2),this['setText']('');},Window_ItemCraftingTooltip[_0x2332e4(0x112)]['hasCustomWindowSkin']=function(){const _0x46f74c=_0x2332e4;return Window_ItemCraftingTooltip[_0x46f74c(0x21b)]!=='';},Window_ItemCraftingTooltip[_0x2332e4(0x112)][_0x2332e4(0x2b1)]=function(){const _0x11c085=_0x2332e4;if(Window_ItemCraftingTooltip[_0x11c085(0x21b)]!==''){if(_0x11c085(0x1b1)==='AxMay')this[_0x11c085(0x170)]=ImageManager[_0x11c085(0x228)](Window_ItemCraftingTooltip['tooltipSkin']);else{if(!_0x4cfd25)return[];const _0x4b7827=this[_0x11c085(0x25a)](_0x29bbbf);return this['_craftingIngredients']===_0x2ba5da&&this[_0x11c085(0x2ab)](),this['_craftingIngredients'][_0x4b7827]||[];}}else _0x11c085(0x90)!==_0x11c085(0x90)?_0x4adccb['prototype'][_0x11c085(0x2b9)][_0x11c085(0x281)](this,_0x24d866):Window_Base[_0x11c085(0x112)]['loadWindowskin'][_0x11c085(0x281)](this);},Window_ItemCraftingTooltip['prototype'][_0x2332e4(0x115)]=function(_0xeee4dd){const _0x379a2d=_0x2332e4;this[_0x379a2d(0x176)]!==_0xeee4dd&&(_0x379a2d(0x7a)===_0x379a2d(0x7a)?(this[_0x379a2d(0x176)]=_0xeee4dd,this[_0x379a2d(0xf2)]()):(_0x23cdac[_0x379a2d(0x112)][_0x379a2d(0x2b9)][_0x379a2d(0x281)](this,_0x1108e0),this[_0x379a2d(0x1d8)](this[_0x379a2d(0x18f)]()?0x0:0x2),this[_0x379a2d(0x115)]('')));},Window_ItemCraftingTooltip[_0x2332e4(0x112)][_0x2332e4(0x2a9)]=function(){const _0x148c70=_0x2332e4;this[_0x148c70(0x115)]('');},Window_ItemCraftingTooltip['prototype'][_0x2332e4(0x19b)]=function(_0x28fe52){this['setText'](_0x28fe52?_0x28fe52['name']:'');},Window_ItemCraftingTooltip[_0x2332e4(0x112)]['refresh']=function(){const _0x11bc7a=_0x2332e4,_0x4d2fe7=this['baseTextRect']();this[_0x11bc7a(0x2ca)](),this['drawText'](this[_0x11bc7a(0x176)],0x0,0x0,this['innerWidth'],_0x11bc7a(0xf1));},Window_ItemCraftingTooltip['prototype']['drawTooltipBackground']=function(){const _0x2e77b4=_0x2332e4;if(this['_text']==='')this[_0x2e77b4(0x210)][_0x2e77b4(0x2a9)](),this[_0x2e77b4(0x265)]=0x0;else{let _0x691151=this[_0x2e77b4(0x1ae)](this[_0x2e77b4(0x176)])+this[_0x2e77b4(0x229)]()*0x4;this[_0x2e77b4(0x265)]=_0x691151+$gameSystem[_0x2e77b4(0xf4)]()*0x2,this[_0x2e77b4(0x257)]();if(this['hasCustomWindowSkin']())return;const _0x292962=ColorManager[_0x2e77b4(0x1f3)]();this[_0x2e77b4(0x210)][_0x2e77b4(0x9a)](0x0,0x0,this[_0x2e77b4(0x7e)],this[_0x2e77b4(0x113)],_0x292962);}};function Window_ItemCraftingNumber(){const _0x321054=_0x2332e4;this[_0x321054(0x2b9)](...arguments);}Window_ItemCraftingNumber[_0x2332e4(0x112)]=Object[_0x2332e4(0x1e8)](Window_ShopNumber[_0x2332e4(0x112)]),Window_ItemCraftingNumber[_0x2332e4(0x112)][_0x2332e4(0x203)]=Window_ItemCraftingNumber,Window_ItemCraftingNumber[_0x2332e4(0x112)][_0x2332e4(0x2b9)]=function(_0x54a9e7){const _0xc6e064=_0x2332e4;Window_ShopNumber[_0xc6e064(0x112)][_0xc6e064(0x2b9)][_0xc6e064(0x281)](this,_0x54a9e7);},Window_ItemCraftingNumber[_0x2332e4(0x112)][_0x2332e4(0x149)]=function(_0x237e3a){const _0x13cb89=_0x2332e4;this[_0x13cb89(0x292)]=_0x237e3a,this[_0x13cb89(0xcc)]=this['determineMax'](),this[_0x13cb89(0x297)]=Math['min'](0x1,this[_0x13cb89(0xcc)]),this[_0x13cb89(0xca)](),this[_0x13cb89(0xf2)]();},Window_ItemCraftingNumber[_0x2332e4(0x112)][_0x2332e4(0xb1)]=function(){const _0x13d819=_0x2332e4,_0x28ac5a=[],_0x15a408=this[_0x13d819(0x292)],_0x52e36b=DataManager[_0x13d819(0x20f)](_0x15a408);let _0x15e779=0x0;for(const _0x1f1d8f of _0x52e36b){if(!_0x1f1d8f)continue;let _0x4045d6=_0x1f1d8f[0x0];const _0x13b89e=_0x1f1d8f[0x1];_0x4045d6===_0x13d819(0x111)?_0x13d819(0x22c)===_0x13d819(0x267)?this[_0x13d819(0x29b)][_0x13d819(0x1d8)](_0x4e5e0a[_0x13d819(0x177)]):_0x28ac5a[_0x13d819(0x2cb)](Math[_0x13d819(0x1dc)]($gameParty[_0x13d819(0x111)]()/_0x13b89e)):(typeof _0x4045d6===_0x13d819(0xc3)&&_0x4045d6[_0x13d819(0x277)](/CATEGORY/i)&&('CIslG'!==_0x13d819(0x204)?(this[_0x13d819(0x13e)](),this[_0x13d819(0x252)][_0x13d819(0xf2)](),this[_0x13d819(0x71)][_0x13d819(0xf2)](),this[_0x13d819(0x71)][_0x13d819(0x153)](),this[_0x13d819(0x71)][_0x13d819(0xe2)](),this[_0x13d819(0x27f)]['refresh'](),this[_0x13d819(0x252)][_0x13d819(0x17b)]()):(_0x4045d6=SceneManager[_0x13d819(0x14e)][_0x13d819(0xc0)][_0x15e779],_0x15e779+=0x1)),_0x28ac5a[_0x13d819(0x2cb)](Math['floor']($gameParty[_0x13d819(0x191)](_0x4045d6)/_0x13b89e)));}if(_0x28ac5a[_0x13d819(0x243)]<=0x0)_0x28ac5a[_0x13d819(0x2cb)](0x0);return _0x28ac5a[_0x13d819(0x2cb)]($gameParty[_0x13d819(0x157)](_0x15a408)-$gameParty['numItems'](_0x15a408)),Math[_0x13d819(0x167)](..._0x28ac5a);},Window_ItemCraftingNumber[_0x2332e4(0x112)][_0x2332e4(0xf2)]=function(){const _0x1ace1a=_0x2332e4;Window_Selectable[_0x1ace1a(0x112)][_0x1ace1a(0xf2)][_0x1ace1a(0x281)](this),this[_0x1ace1a(0x2c6)](),this['drawItemBackground'](0x0),this[_0x1ace1a(0x2b4)](),this['drawHorzLine'](),this[_0x1ace1a(0x7b)]();},Window_ItemCraftingNumber[_0x2332e4(0x112)]['changeOkButtonEnable']=function(){const _0x248112=_0x2332e4,_0x461ac7=this[_0x248112(0x2c9)][0x4];if(!_0x461ac7)return;this[_0x248112(0x2ce)]()?_0x461ac7[_0x248112(0x10b)](this[_0x248112(0x213)][_0x248112(0x25d)](this)):_0x461ac7[_0x248112(0x14f)]=null;},Window_ItemCraftingNumber[_0x2332e4(0x112)][_0x2332e4(0xda)]=function(){const _0x418b07=_0x2332e4;return Math[_0x418b07(0x1dc)](this['totalPriceY']()+this[_0x418b07(0x295)]()*0x2);},Window_ItemCraftingNumber[_0x2332e4(0x112)][_0x2332e4(0xdc)]=function(){const _0x3b9acc=_0x2332e4;return Math[_0x3b9acc(0x1dc)](this[_0x3b9acc(0x113)]-this[_0x3b9acc(0x295)]()*6.5);},Window_ItemCraftingNumber[_0x2332e4(0x112)][_0x2332e4(0x183)]=function(){const _0x1bb9fe=_0x2332e4;return Math[_0x1bb9fe(0x1dc)](this[_0x1bb9fe(0xda)]()+this[_0x1bb9fe(0x295)]()*0x2);},Window_ItemCraftingNumber[_0x2332e4(0x112)]['isOkEnabled']=function(){const _0x26aa90=_0x2332e4;if((this[_0x26aa90(0x297)]||0x0)<=0x0)return![];return Window_ShopNumber['prototype'][_0x26aa90(0x2ce)][_0x26aa90(0x281)](this);},Window_ItemCraftingNumber[_0x2332e4(0x112)][_0x2332e4(0x168)]=function(){const _0x40689c=_0x2332e4;return this[_0x40689c(0x2ce)]();},Window_ItemCraftingNumber[_0x2332e4(0x112)][_0x2332e4(0x2b4)]=function(){const _0x2715ce=_0x2332e4,_0x53f3b6=DataManager[_0x2715ce(0x20f)](this[_0x2715ce(0x292)]);let _0x14a483=this[_0x2715ce(0xdc)]();_0x14a483-=this[_0x2715ce(0x295)]()*_0x53f3b6[_0x2715ce(0x243)],this[_0x2715ce(0x2a7)]=0x0,this[_0x2715ce(0x22f)](_0x14a483);for(const _0xafe75f of _0x53f3b6){_0x14a483+=this[_0x2715ce(0x295)]();if(!_0xafe75f)continue;this[_0x2715ce(0x29e)](_0xafe75f,_0x14a483);};},Window_ItemCraftingNumber[_0x2332e4(0x112)]['drawCategories']=function(_0x24ed9a){const _0x2e1ece=_0x2332e4,_0x3edfc0=this[_0x2e1ece(0x229)]();let _0x17c2bf=_0x3edfc0*0x2;const _0x3b5754=this[_0x2e1ece(0x7e)]-_0x17c2bf-_0x3edfc0*0x3,_0x11a591=_0x17c2bf+Math[_0x2e1ece(0x1bd)](_0x3b5754/0x3),_0x151741=Math[_0x2e1ece(0x1dc)](_0x3b5754*0x2/0x3/0x3),_0x218529=Math['max'](this['textWidth']('\x20+\x20'),this[_0x2e1ece(0x1ae)](_0x2e1ece(0x78)));this[_0x2e1ece(0x1be)](),this['changeTextColor'](ColorManager[_0x2e1ece(0x15d)]());const _0x5c428e=['owned',_0x2e1ece(0x1b7),_0x2e1ece(0x1c5)];for(let _0x120794=0x0;_0x120794<0x3;_0x120794++){const _0x482f2c=_0x5c428e[_0x120794],_0x3f2918=TextManager['ItemCraftingNumberWindow'][_0x482f2c];this[_0x2e1ece(0x1c6)](_0x3f2918,_0x11a591+_0x151741*_0x120794+_0x218529,_0x24ed9a,_0x151741-_0x218529,_0x2e1ece(0xf1));}},Window_ItemCraftingNumber[_0x2332e4(0x112)][_0x2332e4(0x1c3)]=function(_0x428107,_0x958856){const _0x40529d=_0x2332e4,_0xd3c235=this[_0x40529d(0x229)]();let _0x9eafe5=_0xd3c235*0x2;const _0x1247fc=this['innerWidth']-_0x9eafe5-_0xd3c235*0x3,_0x35f4bd=_0x9eafe5+Math[_0x40529d(0x1bd)](_0x1247fc/0x3),_0x1e6318=Math[_0x40529d(0x1dc)](_0x1247fc*0x2/0x3/0x3);_0x958856=_0x40529d(0x195)['format'](_0x958856),this['drawText'](_0x958856,_0x35f4bd+_0x1e6318*0x1,_0x428107,_0x1e6318,_0x40529d(0x9e)),this['drawText']('\x20=',_0x35f4bd+_0x1e6318*0x2,_0x428107,_0x1e6318,_0x40529d(0x9e));},Window_ItemCraftingNumber[_0x2332e4(0x112)][_0x2332e4(0x29e)]=function(_0x195b52,_0x4931cb){const _0x5f0e6f=_0x2332e4;let _0x4281df=_0x195b52[0x0];this['resetFontSettings'](),this[_0x5f0e6f(0x1c3)](_0x4931cb,'-'),_0x4281df==='gold'?this[_0x5f0e6f(0x1d0)](_0x195b52,_0x4931cb,!![]):this[_0x5f0e6f(0x199)](_0x195b52,_0x4931cb,!![],![]);},Window_ItemCraftingNumber['prototype'][_0x2332e4(0x7b)]=function(){const _0x2ea7fb=_0x2332e4,_0x3b8ffb=[this[_0x2ea7fb(0x292)],0x1],_0x3febe2=this[_0x2ea7fb(0xda)](),_0x5a19a9=DataManager[_0x2ea7fb(0x26f)](this[_0x2ea7fb(0x292)]);this[_0x2ea7fb(0x199)](_0x3b8ffb,_0x3febe2,![],_0x5a19a9),this[_0x2ea7fb(0x1c3)](_0x3febe2,'+');},Window_ItemCraftingNumber['prototype']['visualGoldDisplayAutosize']=function(){return!![];},Window_ItemCraftingNumber[_0x2332e4(0x112)][_0x2332e4(0x24e)]=function(){return![];},Window_ItemCraftingNumber['prototype'][_0x2332e4(0x1d0)]=function(_0x1e042b,_0x7ccaf,_0x5a790e){const _0x4a1b31=_0x2332e4,_0xa08ab6=this['itemPadding']();let _0x13fd2b=_0xa08ab6*0x2;const _0x26fee1=this['innerWidth']-_0x13fd2b-_0xa08ab6*0x3,_0x11dc3c=_0x13fd2b+Math['ceil'](_0x26fee1/0x3),_0x40b256=Math['floor'](_0x26fee1*0x2/0x3/0x3),_0x609167=Math['max'](this[_0x4a1b31(0x1ae)]('\x20+\x20'),this['textWidth']('\x20=\x20')),_0x199037=_0x1e042b[0x0],_0x37cf29=_0x1e042b[0x1],_0x2a468f=_0x37cf29*this[_0x4a1b31(0x297)],_0x589f21=VisuMZ[_0x4a1b31(0x155)]?VisuMZ[_0x4a1b31(0x155)][_0x4a1b31(0x2ae)]['Gold'][_0x4a1b31(0x286)]:0x0;if(_0x589f21>0x0){if(_0x4a1b31(0x1bc)==='kTNqB'){const _0x38fbfe=_0x7ccaf+(this[_0x4a1b31(0x295)]()-ImageManager[_0x4a1b31(0x13c)])/0x2;this[_0x4a1b31(0x256)](_0x589f21,_0x13fd2b,_0x38fbfe);const _0x54580d=ImageManager[_0x4a1b31(0x100)]+0x4;_0x13fd2b+=_0x54580d;}else{const _0x482204=this[_0x4a1b31(0xe6)]()&&_0xac09e7[_0x4a1b31(0x26f)](this[_0x4a1b31(0xe6)]())?null:this[_0x4a1b31(0xe6)]();this['setHelpWindowItem'](_0x482204),this['_statusWindow']&&this[_0x4a1b31(0x8c)][_0x4a1b31(0x203)]===_0xfc69a1&&this['_statusWindow']['setItem'](_0x482204);}}this[_0x4a1b31(0xd7)](ColorManager[_0x4a1b31(0x15d)]()),this[_0x4a1b31(0x1c6)](TextManager['currencyUnit'],_0x13fd2b,_0x7ccaf,_0x40b256,_0x4a1b31(0x9e));const _0x1db3d3=$gameParty[_0x4a1b31(0x111)]();this['drawCurrencyValue'](_0x1db3d3,TextManager[_0x4a1b31(0x224)],_0x11dc3c,_0x7ccaf,_0x40b256);const _0x45dda9=_0x11dc3c+_0x40b256*0x1+_0x609167,_0x55a552=_0x40b256-_0x609167;this[_0x4a1b31(0x24c)](_0x2a468f,TextManager['currencyUnit'],_0x45dda9,_0x7ccaf,_0x55a552);const _0x2f45f3=_0x11dc3c+_0x40b256*0x2+_0x609167,_0x51ab21=_0x40b256-_0x609167,_0x35f637=Math['min'](_0x1db3d3+_0x2a468f*(_0x5a790e?-0x1:0x1),$gameParty[_0x4a1b31(0x263)]());this[_0x4a1b31(0x24c)](_0x35f637,TextManager[_0x4a1b31(0x224)],_0x2f45f3,_0x7ccaf,_0x51ab21);},Window_ItemCraftingNumber[_0x2332e4(0x112)][_0x2332e4(0x199)]=function(_0x26fd7c,_0x2eb479,_0x5da701,_0x1a0c37){const _0x17c077=_0x2332e4,_0x397dfe=this['itemPadding']();let _0x56c075=_0x397dfe*0x2;const _0xf59b43=this[_0x17c077(0x7e)]-_0x56c075-_0x397dfe*0x3,_0x409bdb=_0x56c075+Math[_0x17c077(0x1bd)](_0xf59b43/0x3),_0x2d9a50=Math['floor'](_0xf59b43*0x2/0x3/0x3),_0x28ea30=Math[_0x17c077(0x26d)](this[_0x17c077(0x1ae)](_0x17c077(0xb0)),this[_0x17c077(0x1ae)](_0x17c077(0x78)));let _0x5ea2e3=_0x26fd7c[0x0];if(typeof _0x5ea2e3===_0x17c077(0xc3)&&_0x5ea2e3[_0x17c077(0x277)](/CATEGORY/i)){if(_0x17c077(0x206)===_0x17c077(0x101))return!!this[_0x17c077(0x8a)](_0x5291e3);else _0x5ea2e3=SceneManager[_0x17c077(0x14e)][_0x17c077(0xc0)][this[_0x17c077(0x2a7)]],this['_categoryIndex']+=0x1;}const _0x291317=_0x26fd7c[0x1],_0x50f297=_0x291317*this[_0x17c077(0x297)];let _0x1072d7=_0x5ea2e3[_0x17c077(0x1b4)];const _0x3fddb0=_0x1072d7>0x0?ImageManager[_0x17c077(0x100)]+0x4:0x0;if(_0x1a0c37){const _0x1edda7=new Rectangle(_0x56c075,_0x2eb479,_0xf59b43,this[_0x17c077(0x295)]());this[_0x17c077(0x94)](_0x5ea2e3,_0x1edda7),this[_0x17c077(0x256)](_0x5ea2e3[_0x17c077(0x1b4)],_0x1edda7['x'],_0x1edda7['y']);}else this[_0x17c077(0x1a9)](_0x5ea2e3,_0x56c075,_0x2eb479,_0xf59b43);const _0x23c8d7=_0x409bdb+_0x2d9a50*0x0,_0x20b080=_0x2d9a50-_0x3fddb0,_0x5c70ac=$gameParty['numItems'](_0x5ea2e3);this[_0x17c077(0x1c6)](_0x5c70ac,_0x23c8d7,_0x2eb479,_0x20b080,_0x17c077(0x2c3)),this['drawIcon'](_0x1072d7,_0x23c8d7+_0x20b080+0x4,_0x2eb479);const _0x5590c4=_0x409bdb+_0x2d9a50*0x1+_0x28ea30,_0x5baea4=_0x2d9a50-_0x28ea30-_0x3fddb0;this[_0x17c077(0x1c6)](_0x50f297,_0x5590c4,_0x2eb479,_0x5baea4,_0x17c077(0x2c3)),this[_0x17c077(0x256)](_0x1072d7,_0x5590c4+_0x5baea4+0x4,_0x2eb479);const _0x3a1b0e=_0x409bdb+_0x2d9a50*0x2+_0x28ea30,_0x2ab3ab=_0x2d9a50-_0x28ea30-_0x3fddb0,_0x1d7501=_0x5c70ac+_0x50f297*(_0x5da701?-0x1:0x1);this[_0x17c077(0x1c6)](_0x1d7501,_0x3a1b0e,_0x2eb479,_0x2ab3ab,_0x17c077(0x2c3)),this[_0x17c077(0x256)](_0x1072d7,_0x3a1b0e+_0x2ab3ab+0x4,_0x2eb479);},Window_ItemCraftingNumber[_0x2332e4(0x112)][_0x2332e4(0x1fa)]=function(){const _0x1dcb65=_0x2332e4,_0x46b4e7=this[_0x1dcb65(0x229)]();let _0x5948ac=_0x46b4e7*0x2;const _0x146727=this[_0x1dcb65(0x7e)]-_0x5948ac-_0x46b4e7*0x3,_0x328d5f=_0x5948ac+Math[_0x1dcb65(0x1bd)](_0x146727/0x3),_0x1c1677=this[_0x1dcb65(0xda)](),_0x5db407=Math[_0x1dcb65(0x1dc)](_0x146727*0x2/0x3/0x3),_0x1ac49c=Math['max'](this[_0x1dcb65(0x1ae)](_0x1dcb65(0xb0)),this[_0x1dcb65(0x1ae)](_0x1dcb65(0x78))),_0x5174d5=this[_0x1dcb65(0x292)]?.[_0x1dcb65(0x1b4)]>0x0?ImageManager['iconWidth']:0x0,_0x94cefb=this[_0x1dcb65(0x12f)](),_0xe63616=new Rectangle(Math['floor'](_0x328d5f+_0x5db407*0x2-this[_0x1dcb65(0x12f)]()-_0x5174d5+this[_0x1dcb65(0x229)]()/0x2-0x2),_0x1c1677,this['cursorWidth'](),this['lineHeight']());return _0xe63616;};function Window_ItemCraftingIngredient(){const _0x5ed38e=_0x2332e4;this[_0x5ed38e(0x2b9)](...arguments);}function _0x401c(_0x2b5646,_0x1bddb4){const _0xda32c2=_0xda32();return _0x401c=function(_0x401cb5,_0x237911){_0x401cb5=_0x401cb5-0x6a;let _0x4f9b28=_0xda32c2[_0x401cb5];return _0x4f9b28;},_0x401c(_0x2b5646,_0x1bddb4);}Window_ItemCraftingIngredient[_0x2332e4(0x112)]=Object[_0x2332e4(0x1e8)](Window_ItemList[_0x2332e4(0x112)]),Window_ItemCraftingIngredient[_0x2332e4(0x112)]['constructor']=Window_ItemCraftingIngredient,Window_ItemCraftingIngredient['prototype']['initialize']=function(_0x77c84c){const _0x6ec3ec=_0x2332e4;Window_Selectable[_0x6ec3ec(0x112)][_0x6ec3ec(0x2b9)][_0x6ec3ec(0x281)](this,_0x77c84c),this[_0x6ec3ec(0x250)]=0x0;},Window_ItemCraftingIngredient[_0x2332e4(0x112)][_0x2332e4(0x17c)]=function(){return![];},Window_ItemCraftingIngredient['prototype']['setup']=function(_0x4aa7a9,_0xcf6293){const _0x587ceb=_0x2332e4;this[_0x587ceb(0x18b)]=_0x4aa7a9,this['_amount']=_0xcf6293||0x1,this[_0x587ceb(0xf2)](),this[_0x587ceb(0xc7)](0x0,0x0),this[_0x587ceb(0x21e)](),this[_0x587ceb(0x75)](0x0);},Window_ItemCraftingIngredient['prototype']['makeItemList']=function(){const _0x11235b=_0x2332e4;this[_0x11235b(0x287)]=$gameParty[_0x11235b(0x25b)]()[_0x11235b(0x106)](_0x4feaba=>this[_0x11235b(0x6b)](_0x4feaba));},Window_ItemCraftingIngredient[_0x2332e4(0x112)][_0x2332e4(0x6b)]=function(_0x2457bf){const _0x3ca737=_0x2332e4;if(!_0x2457bf)return![];if(_0x2457bf===SceneManager[_0x3ca737(0x14e)][_0x3ca737(0x292)])return![];return _0x2457bf[_0x3ca737(0x1b0)][_0x3ca737(0x6b)](this[_0x3ca737(0x18b)][_0x3ca737(0x10e)]()[_0x3ca737(0x202)]());},Window_ItemCraftingIngredient['prototype']['isEnabled']=function(_0x353931){const _0x5f3a38=_0x2332e4;if(!_0x353931)return![];if(this[_0x5f3a38(0x10d)]()[_0x5f3a38(0x6b)](_0x353931))return![];return $gameParty['numItems'](_0x353931)>=this[_0x5f3a38(0x250)];},Window_ItemCraftingIngredient[_0x2332e4(0x112)][_0x2332e4(0x10d)]=function(){const _0x4f808f=_0x2332e4,_0xa32379=[],_0x593193=DataManager['getCraftingIngredients'](SceneManager[_0x4f808f(0x14e)][_0x4f808f(0x292)]);for(const _0xc77d0d of _0x593193){if(!_0xc77d0d)continue;const _0x24354a=_0xc77d0d[0x0];(DataManager[_0x4f808f(0x2d9)](_0x24354a)||DataManager[_0x4f808f(0x9c)](_0x24354a)||DataManager[_0x4f808f(0x1da)](_0x24354a))&&_0xa32379[_0x4f808f(0x2cb)](_0x24354a);}return _0xa32379[_0x4f808f(0xf6)](SceneManager[_0x4f808f(0x14e)][_0x4f808f(0xc0)]);},Window_ItemCraftingIngredient[_0x2332e4(0x112)][_0x2332e4(0x1a9)]=function(_0x16b6b3,_0x1b868c,_0x2141fa,_0xf6e005){const _0x3a8862=_0x2332e4;_0x16b6b3&&this[_0x3a8862(0x10d)]()[_0x3a8862(0x6b)](_0x16b6b3)&&(_0x3a8862(0x8e)!==_0x3a8862(0x23d)?this[_0x3a8862(0xa1)]=!![]:this['_customItemCraftingSettings']=_0x5519be),Window_ItemList[_0x3a8862(0x112)]['drawItemName']['call'](this,_0x16b6b3,_0x1b868c,_0x2141fa,_0xf6e005),this[_0x3a8862(0xa1)]=![];},Window_ItemCraftingIngredient['prototype'][_0x2332e4(0x1c6)]=function(_0x278149,_0x1be7d2,_0x45d261,_0x400c1b,_0x5e4a73){const _0x1058ad=_0x2332e4;if(this[_0x1058ad(0xa1)]){if(_0x1058ad(0x185)===_0x1058ad(0x185)){const _0x187db3=VisuMZ['ItemCraftingSys']['Settings'][_0x1058ad(0x24a)];this[_0x1058ad(0x210)][_0x1058ad(0x99)]=ColorManager[_0x1058ad(0xb9)](_0x187db3['SelectedColor']),_0x278149+=_0x187db3['SelectedText'];}else{const _0x37a975=this[_0x1058ad(0x229)]();let _0x556667=_0x37a975*0x2;const _0x442293=this[_0x1058ad(0x7e)]-_0x556667-_0x37a975*0x3,_0x313aab=_0x556667+_0x1477cd[_0x1058ad(0x1bd)](_0x442293/0x3),_0x4c2b08=this['itemNameY'](),_0x5ee59=_0x3ab1e9[_0x1058ad(0x1dc)](_0x442293*0x2/0x3/0x3),_0x29ec7d=_0x4e96fe[_0x1058ad(0x26d)](this[_0x1058ad(0x1ae)]('\x20+\x20'),this['textWidth'](_0x1058ad(0x78))),_0x472370=this['_item']?.[_0x1058ad(0x1b4)]>0x0?_0x5cff7a[_0x1058ad(0x100)]:0x0,_0xa6d85a=this['cursorWidth'](),_0x575c8a=new _0x10a0e6(_0x570985[_0x1058ad(0x1dc)](_0x313aab+_0x5ee59*0x2-this[_0x1058ad(0x12f)]()-_0x472370+this[_0x1058ad(0x229)]()/0x2-0x2),_0x4c2b08,this[_0x1058ad(0x12f)](),this[_0x1058ad(0x295)]());return _0x575c8a;}}Window_Base[_0x1058ad(0x112)][_0x1058ad(0x1c6)][_0x1058ad(0x281)](this,_0x278149,_0x1be7d2,_0x45d261,_0x400c1b,_0x5e4a73);};