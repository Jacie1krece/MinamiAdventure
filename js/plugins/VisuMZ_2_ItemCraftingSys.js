//=============================================================================
// VisuStella MZ - Item Crafting System
// VisuMZ_2_ItemCraftingSys.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ItemCraftingSys = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemCraftingSys = VisuMZ.ItemCraftingSys || {};
VisuMZ.ItemCraftingSys.version = 1.20;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.20] [ItemCraftingSys]
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
 * === Batch-Related Notetags ===
 * 
 * ---
 *
 * <Craft Batch>
 *  listing
 *  listing
 *  listing
 * </Craft Batch>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires VisuMZ_3_ShopBatches!
 * - Creates a list of items, weapons, and armors that the player will gain
 *   when this batch object is crafted.
 *   - This also means that in addition to this notetag, the notetag for
 *     <Crafting Ingredients> is also needed.
 *   - This item will also not be masked.
 * - Proxy items, weapons, or armors cannot be listed and will be bypassed.
 * - This item, weapon, or armor cannot be crafted if all of the listed items,
 *   weapons, or armors are at max quantity within the party's inventory.
 * - The listed items will NOT utilize any on craft effects for the individual
 *   listed items themselves.
 * - Replace 'listing' with any of the listing types found below:
 * 
 *     Item id
 *     Item name
 *     Weapon id
 *     Weapon name
 *     Armor id
 *     Armor name
 * 
 *     Item id: quantity
 *     Item name: quantity
 *     Weapon id: quantity
 *     Weapon name: quantity
 *     Armor id: quantity
 *     Armor name: quantity
 * 
 *   - Replace 'id' with a number representing the ID of the item, weapon, or
 *     armor that is to be listed.
 *   - Replace 'name' with the associated item, weapon, or armor's name.
 *   - Replace 'quantity' with a number representing the number of items,
 *     weapons, or armors that will be acquired when the batch item is crafted.
 *     - If the variant without 'quantity' is used, quantity will default to 1.
 * 
 *   Examples:
 * 
 *   ---
 * 
 *   <Craft Batch>
 *    Item Potion: 10
 *    Item Super Potion: 5
 *    Weapon Short Sword: 3
 *    Weapon Long Sword: 2
 *    Armor Linen Clothing: 4
 *    Armor Cloth Armor: 3
 *   </Craft Batch>
 * 
 *   ---
 * 
 *   <Craft Batch>
 *    Item 7: 10
 *    Item 8: 5
 *    Weapon 1: 3
 *    Weapon 2: 2
 *    Armor 2: 4
 *    Armor 8: 3
 *   </Craft Batch>
 * 
 *   ---
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
 * Custom Layout
 * 
 *   Added in version 1.20
 * 
 *   Enable Custom Layout:
 *   - Enable a custom layout or automatically create a layout based on the
 *     shop scene?
 * 
 *   Help Window JS:
 *   - Code used to determine the dimensions for this window.
 * 
 *   Category Window JS:
 *   - Code used to determine the dimensions for this window.
 *   - These settings are also used for the ingredients title window.
 * 
 *   Gold Window JS:
 *   - Code used to determine the dimensions for this window.
 * 
 *   Item Window JS:
 *   - Code used to determine the dimensions for this window.
 *   - These settings are also used for ingredients list and number windows.
 * 
 *   Status Window JS:
 *   - Code used to determine the dimensions for this window.
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
 * Version 1.20: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a crash that would cause a conflict with the shop scene. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Windows > Custom Layout
 * **** By enabling this, you can use JS to determine the window positions you
 *      want to layout in the item crafting scene. Otherwise, if left disabled,
 *      the plugin will automatically utilize the layout found in the shop
 *      scene to determine where the windows will go.
 * 
 * Version 1.19: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Craft Batch>
 * **** When this "item" is crafted, yields multiples of the listed item.
 * **** Requires VisuMZ_3_ShopBatches
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
 * @default {"ReqQuantityFontSize:num":"18","ToolTips:eval":"true","name:str":"","BgTypes":"","HelpBgType:num":"0","CategoryBgType:num":"0","GoldBgType:num":"0","ListBgType:num":"0","StatusBgType:num":"0","IngredientTitle:num":"0","IngredientList:num":"0","NumberBgType:num":"0","ButtonAssistBgType:num":"0","Custom":"","EnableCustomLayout:eval":"false","HelpWindow_RectJS:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","CategoryWindow_RectJS:func":"\"const wx = this.isRightInputMode() ? this.mainCommandWidth() : 0;\\nconst wy = this.mainAreaTop();\\nconst ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow_RectJS:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ItemWindow_RectJS:func":"\"const wy = this._commandWindow.y + this._commandWindow.height;\\nconst ww = Graphics.boxWidth - this.statusWidth();\\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusWindow_RectJS:func":"\"const ww = this.statusWidth();\\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this._commandWindow.y + this._commandWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * @param Custom
 * @text Custom Layout
 *
 * @param EnableCustomLayout:eval
 * @text Enable Custom Layout
 * @parent Custom
 * @type boolean
 * @on Custom
 * @off Automatic
 * @desc Enable a custom layout or automatically create a layout
 * based on the shop scene?
 * @default false
 *
 * @param HelpWindow_RectJS:func
 * @text Help Window JS
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param CategoryWindow_RectJS:func
 * @text Category Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const wx = this.isRightInputMode() ? this.mainCommandWidth() : 0;\nconst wy = this.mainAreaTop();\nconst ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, true);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow_RectJS:func
 * @text Gold Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, true);\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ItemWindow_RectJS:func
 * @text Item Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const wy = this._commandWindow.y + this._commandWindow.height;\nconst ww = Graphics.boxWidth - this.statusWidth();\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusWindow_RectJS:func
 * @text Status Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const ww = this.statusWidth();\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this._commandWindow.y + this._commandWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x4a3404=_0x430e;function _0x2faa(){const _0x13ed63=['%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','addCommand','XxWMU','dBMLP','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Zpqjk','4246EalcwV','frzUY','onItemCancel','Change','Pmxfw','isSceneBattle','ARRAYFUNC','NumWindowNet','ngUyo','CraftOnce','helpAreaTop','windowskin','createItemWindow','Mask','height','isOkEnabled','XcYIV','NMJxF','mainAreaHeight','jbCWZ','FLjpp','ItemCraftingSceneOpen','activateItemWindow','processFinishAnimation','XVklD','meetsCraftingCommonEventSwitches','STRUCT','call','owexL','baseTextRect','max','_statusWindow','contentsBack','HelpBgType','CsRPL','#%1','Gold','_craftPicture','createUncategorizedItemCategory','RZjWt','updateAnimationSprite','needsSelection','STR','createContents','GVmqR','isItemCraftingCategoryValid','_maxIngredientsSize','getCustomItemCraftingSettings','_windowLayer','createBackground','_ingredientSelectTitle','scrollTo','isSceneMap','currentExt','PSVIb','GoldIcon','dimColor1','description','createIngredientSelectionList','statusWindowRect','aRgQc','EnableMainMenu','MvSyg','zZACX','_lastCraftingExt','OxTWx','SnapshotOpacity','hide','JSON','_backSprite2','enabled','isMainMenuItemCraftingEnabled','drawGoldIngredient','registerCraftedItem','changeTextColor','IconSet','isUseModernControls','makeItemList','_animationPlaying','pnOoo','OFCCh','nKQLK','destroy','_helpWindow','1768611ntaFVk','setItemSpriteBitmap','setItemSpriteFrame','OnSwitches','KcGuj','opacity','RegExp','Odzlk','craftPicture','drawHorzLine','resetCraftingSwitches','test','zgDnH','_categoryWindow','ItemCraftingNoCategory','tcYRt','CustomItemCraftingSceneOpen','Game_System_initialize','ToolTips','onItemCrafted','_itemIDs','addWindow','setText','ARRAYSTR','\x20+\x20','drawBigItemImage','setItemSpritePosition','isCraftItemListed','WAqOc','resetFontSettings','isItem','ItemCraftingSys','addLoadListener','buttonAssistKey2','orsQY','WOvUV','create','onDatabaseLoaded','constructor','NumWindowShift','setBackgroundOpacity','determineMax','4LbfSnV','Window_ShopStatus_setItem','StatusWindow_RectJS','_number','setup','cancel','items','getItemCraftedTimes','PkeAO','CoreEngine','dimColor2','itemHeight','remove','Cqqdz','ParseAllNotetags','braNW','irRLP','setItemSpriteOpacity','blBju','drawIngredientGold','lineHeight','XKakn','updateCraftingAnimation','pop','VisuMZ_1_ItemsEquipsCore\x20needs\x20to\x20be\x20updated\x20','_data','frames','match','finishAnimation','_nonCategoryItemCraftingItems','STEjd','reserveCommonEvent','armor','49298ktGiWg','rgGqG','visualGoldDisplayAutosize','MXswB','setValue','loadTitle1','createGoldWindow','ARRAYSTRUCT','categoryWindowRectJS','BRwOC','durqz','clear','jsOnCraft','centerSprite','SZPTi','VisuMZ_3_ShopBatches','_amount','IngredientList','exit','createItemWindowBase','ItemsEquipsCore','buttonAssistText1','version','jnbhc','rDFLK','getProxyItem','BcFkL','categoryWindowRect','contains','itemAt','kDJuG','You\x20do\x20not\x20have\x20any\x20craftable\x20items!\x0aRefer\x20to\x20the\x20help\x20file\x20on\x20how\x20to\x20create\x20crafting\x20recipes.','TurnSwitches','itemLineRect','applyInverse','_alreadySelected','obWih','itemNameY','drOkN','visible','Sound','_itemSpriteOpacitySpeed','filter','Animations','isTriggered','buttonAssistKey1','showBatchContents','drawPicture','commandItemCrafting','drawItemBackground','select','_scene','drawCraftingItemName','createStatusWindow','CdfGt','SystemShowItemCraftingMenu','helpWindowRectJS','isPlaytest','initialize','onItemOk','isEnabled','ReqQuantityFontSize','CraftEventRepeat','tooltipSkin','NoMask','kGcyj','Window_ItemCategory_makeCommandList','QusKk','EnableCustomLayout','bind','destroyItemSprite','SystemEnableItemCraftingMenu','WNRhC','popScene','BgFilename2','CraftBatchWrap','calcCraftBatchItemsMax','createJS','totalPriceY','imageSmoothingEnabled','prototype','itemWindowRectJS','isMainMenuItemCraftingVisible','SelectedColor','itemCraftingNumberWindowOk','statusWidth','boxWidth','windowPadding','VisuMZ_0_CoreEngine','iconWidth','11722680tkiWiJ','uNwFA','drawShopBatchContentsItem','startAnimation','setHelpWindowItem','weapons','bitmap','AoiGZ','IngredientBridge','setTooltipWindowText','processItemCrafting','addItemCraftingCommandAutomatically','wXLlq','drawItem','join','_itemWindow','_backSprite1','BgFilename1','zjdWE','animationIDs','makeCommandList','craftableItems','QEDFu','_category','lPzwK','RsZtL','_ingredientAmounts','5299818zbnfWz','isArmor','drawBigItemIcon','GlhDd','scale','Hyfbu','makeFontBigger','map','concat','bNRWZ','getItemIdWithName','selectedIngredientList','isCustomLayout','shouldDrawCraftBatchContents','cursorWidth','doesItemHaveOpenCategories','ItemScene','smoothSelect','loadPicture','ListBgType','ZpOoo','drawText','onButtonOk','note','statusWindowRectItemsEquipsCore','setHelpWindow','processCraftCommonEvent','MaskLetter','buttonAssistText4','push','allCraftableWeapons','round','item-%1','mainAreaTop','buyWindowRectItemsEquipsCore','setHandler','yUSzE','_ItemCrafting_MainMenu','drawCraftingIngredients','General','addItemCategory','blt','customCraftingOnly','craftableArmors','value','textWidth','onAnimationFinish','drawTooltipBackground','zVAuy','EVcLZ','contents','parseCraftingIngredientsData','AnySw','buttonY','allOfCraftBatchItemsMax','BypassMasks','findExt','_allCraftableArmors','_ingredientSelectList','Ingredients','wdGDA','47WnNDES','getCraftingIngredients','item','onNumberCancel','getColor','createTooltipWindow','StatusBgType','Items','all','process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags','createAnimation','setBackgroundType','iconHeight','innerHeight','CategoryBgType','_craftingIngredients','BPhXb','setItemWindow','isItemCraftingCommandEnabled','innerWidth','drawShopBatchContentsRemaining','IngredientTitle','center','category:\x20%1','drawCraftedIcon','sGrZq','_cache_getCraftBatchItems','helpAreaHeight','Window_Selectable_select','buttonAssistItemListRequirement','HzfzD','HelpWindow_RectJS','log','ShowWindows','registerCraftingEvent','ButtonAssistBgType','iVYNF','drawFadedItemBackground','return\x200','hCFTE','Game_Party_numItems','min','_iconSprite','itemRect','buttonAssistText2','_text','NCQZx','mQpmM','setMainMenuItemCraftingEnabled','calcWindowHeight','itemCraftingMask','KlTJC','toLowerCase','_item','NUM','ucYei','EsKvU','categories','CraftedIcon','MainMenu','setItem','clearUserSelectedIngredients','onNumberOk','itemHasCraftCommonEvent','craftableWeapons','NbuJE','drawShopBatchContentsTitle','CategoryIcon','category','deactivate','_goldWindow','drawIngredients','vXGCG','_allCraftableItems','down','CraftAssistButton','placeButtons','_animationWait','VisuMZ_2_ShopCommonEvents','Window_ItemCategory_addItemCategory','_commandWindow','BypassSwitches','sgeTt','left','addUncategorizedItemCategory','NqlUU','visualGoldDisplayNoCost','name','drawCurrencyValue','hasMaxItems','fRjIB','goldWindowRectItemsEquipsCore','GDSUF','CraftRepeat','itemCrafting','setClickHandler','statusWindowRectJS','_craftingEvents','initItemCraftingMainMenu','_weaponIDs','isPlaying','getCraftBatchItems','_craftingCommonEventScene','fontSize','_tooltipWindow','cpxjQ','AxzGX','changeOkButtonEnable','_list','weapon-%1','commandWindowRectItemsEquipsCore','_animationIDs','CategoryWindow_RectJS','worldTransform','jsGlobalListing','hasCraftBatchItems','nVOyf','fittingHeight','allItems','initItemCraftingSys','CheckAnySwitches','armors','checkItemCraftingResultsValid','changePaintOpacity','VisuMZ_1_ItemsEquipsCore','Uncategorized','addItemCraftingCommand','drawItemName','floor','createNumberWindow','dZvxb','_armorIDs','isProxyItem','buttonAssistLargeIncrement','addChild','_numberWindow','allCraftableArmors','selectLast','NLgqZ','process_VisuMZ_ItemCraftingSys_Notetags','_buttons','onIngredientListOk','Iwazk','ShopScene','loadSystem','status','width','_customItemCraftingSettings','trim','ARRAYEVAL','getArmorIdWithName','AkvMW','toUpperCase','_context','createAnimationIDs','BgSettings','3094585tbdqaB','Parse_Notetags_CreateJS','maskItalics','setupNumberWindow','ShowMainMenu','isItemCraftingCommandVisible','anchor','length','buttonAssistSmallIncrement','BebmY','powerDownColor','ARRAYNUM','ParseArmorNotetags','adjustSprite','NumberBgType','SPXMn','55270lBbWhz','split','CPesW','oOEij','eGZZm','index','playStaticSe','rJqrk','isSceneItemCrafting','playItemCrafting','ItemQuantityFmt','isReleased','hasCustomWindowSkin','systemColor','goldWindowRectJS','fillRect','drawCraftBatchContents','OffSwitches','iconIndex','ConvertParams','tooltipFrameCheckRequirements','helpWindowRectItemsEquipsCore','isTouchOkEnabled','allowCreateStatusWindow','drawMathMarks','loseItem','SelectedText','ARRAYJSON','Type','hitIndex','destroyAnimationSprite','maskItemName','_max','eMnVR','initItemCraftingEvents','updateHelp','Settings','Net','jiNOt','isCraftingItemMasked','textColor','shift','ParseItemNotetags','_animationSprite','drawCraftBatchContentsList','returnBackToItemWindow','Game_Party_gainItem','EFXBL','goto','GWUtT','meZmF','maxItems','isShowNew','EVAL','DYXQV','terminate','update','kUYQs','LkXic','itemCraftingIngredientsBridge','zAQlp','ItemCraftingMenuCommand','drawCurrentItemName','Armor','setupSelectIngredientWindow','drawIngredientItem','TAlMT','SwitchCraft','net','Icon','setWindowBackgroundTypes','itemCraftedIcon','smooth','refreshCursor','TetzA','enableCraftingSwitches','isTouchedInsideFrame','_buttonAssistWindow','WarningMsg','maxCols','xnoHj','ZDJdU','isWeapon','activate','gainCraftBatchItems','isFinishedAnimating','SJcSV','postCreateItemWindowModernControls','loadWindowskin','_categoryIndex','createCommandWindow','Item','setItemForCraftBatchContents','icGse','ItemWindow_RectJS','_ingredientsList','mainCommandWidth','Window_ShopStatus_refresh','hasCraftingEventOccurred','15567237rGfAqt','XYfLB','FadeSpeed','setFrame','quantityFontSize','_ingredientIndex','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','SPAWl','QQzdp','playCancel','CheckAllSwitches','setStatusWindow','AllSwitches','in\x20order\x20for\x20VisuMZ_2_ItemCraftingSys\x20to\x20work.','refresh','_clickHandler','createCraftingItemKey','addItemCategories','removeChild','drawTotalPrice','Mfmku','voMet','getWeaponIdWithName','show','getInputMultiButtonStrings','ReturnToLastCrafting','ParseWeaponNotetags','gainItem','onCategoryOk','Name','armor-%1','Show','aDGSS','CraftEventOnce','updateItemSpriteOpacity','drawCategories','registerCommand','currentCraftableItems','KOofc','VisuMZ_1_MainMenuCore','clearCustomItemCraftingSettings','_allCraftableWeapons','Window','drawIngredientCategory','createCustomBackgroundImages','number','onIngredientListCancel','drawItemIngredient','createIngredientSelectionTitle','bDHYB','shown','string','MWSWu','VXQJB','helpWindowRect','\x20=\x20','\x20%1','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20item\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20number\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','drawIcon','format','_ingredientCategories','fontItalic','gradientFillRect','iqcnf','keSgU','numItems','active','weapon','itemPadding','GoldWindow_RectJS','addOriginalCommands','parse','allCraftableItems','Scene_Boot_onDatabaseLoaded','right','gXFeH','ceil','categoryList','itemWindowRect','%1/%2','_bypassProxy','OhgLK','gold','createCraftingIngredientsLists','buttonAssistCategory','Scene_Menu_createCommandWindow','%1%2','updateTooltipWindow','ghORj','setCustomItemCraftingSettings','currencyUnit','rrtve','_itemsCrafted','lCPnK','loadTitle2','PSfms','isRightInputMode','itemRectWithPadding','setMainMenuItemCraftingVisible','7nWAUMq','sCpVM','includes','_itemSprite','goldWindowRect','createItemSprite','Animation'];_0x2faa=function(){return _0x13ed63;};return _0x2faa();}(function(_0xe89660,_0x988800){const _0x23b9a0=_0x430e,_0x438f7a=_0xe89660();while(!![]){try{const _0x276996=parseInt(_0x23b9a0(0x139))/0x1*(parseInt(_0x23b9a0(0x357))/0x2)+-parseInt(_0x23b9a0(0x30c))/0x3*(parseInt(_0x23b9a0(0x336))/0x4)+-parseInt(_0x23b9a0(0x1d5))/0x5+-parseInt(_0x23b9a0(0xfc))/0x6+-parseInt(_0x23b9a0(0x2ab))/0x7*(-parseInt(_0x23b9a0(0xe1))/0x8)+-parseInt(_0x23b9a0(0x248))/0x9+parseInt(_0x23b9a0(0x1e5))/0xa*(parseInt(_0x23b9a0(0x2b8))/0xb);if(_0x276996===_0x988800)break;else _0x438f7a['push'](_0x438f7a['shift']());}catch(_0x420fcf){_0x438f7a['push'](_0x438f7a['shift']());}}}(_0x2faa,0xe4782));var label=_0x4a3404(0x32b),tier=tier||0x0,dependencies=[_0x4a3404(0x1b5)],pluginData=$plugins[_0x4a3404(0xb1)](function(_0x4c2721){const _0x1c2b0d=_0x4a3404;return _0x4c2721[_0x1c2b0d(0x1ca)]&&_0x4c2721[_0x1c2b0d(0x2f1)][_0x1c2b0d(0x2ad)]('['+label+']');})[0x0];VisuMZ[label][_0x4a3404(0x209)]=VisuMZ[label][_0x4a3404(0x209)]||{},VisuMZ[_0x4a3404(0x1f8)]=function(_0x5a2a4c,_0x51c210){const _0x1bfe55=_0x4a3404;for(const _0x40fdde in _0x51c210){if(_0x1bfe55(0xfa)===_0x1bfe55(0xfa)){if(_0x40fdde[_0x1bfe55(0x351)](/(.*):(.*)/i)){const _0xaf32af=String(RegExp['$1']),_0x2354b5=String(RegExp['$2'])[_0x1bfe55(0x1d1)]()[_0x1bfe55(0x1cd)]();let _0x4491f5,_0x50b54b,_0xb0e499;switch(_0x2354b5){case _0x1bfe55(0x16f):_0x4491f5=_0x51c210[_0x40fdde]!==''?Number(_0x51c210[_0x40fdde]):0x0;break;case _0x1bfe55(0x1e0):_0x50b54b=_0x51c210[_0x40fdde]!==''?JSON['parse'](_0x51c210[_0x40fdde]):[],_0x4491f5=_0x50b54b['map'](_0x167496=>Number(_0x167496));break;case _0x1bfe55(0x21a):_0x4491f5=_0x51c210[_0x40fdde]!==''?eval(_0x51c210[_0x40fdde]):null;break;case _0x1bfe55(0x1ce):_0x50b54b=_0x51c210[_0x40fdde]!==''?JSON[_0x1bfe55(0x28f)](_0x51c210[_0x40fdde]):[],_0x4491f5=_0x50b54b['map'](_0x39d0b7=>eval(_0x39d0b7));break;case _0x1bfe55(0x2fc):_0x4491f5=_0x51c210[_0x40fdde]!==''?JSON[_0x1bfe55(0x28f)](_0x51c210[_0x40fdde]):'';break;case _0x1bfe55(0x200):_0x50b54b=_0x51c210[_0x40fdde]!==''?JSON['parse'](_0x51c210[_0x40fdde]):[],_0x4491f5=_0x50b54b[_0x1bfe55(0x103)](_0x24c073=>JSON['parse'](_0x24c073));break;case'FUNC':_0x4491f5=_0x51c210[_0x40fdde]!==''?new Function(JSON[_0x1bfe55(0x28f)](_0x51c210[_0x40fdde])):new Function(_0x1bfe55(0x15f));break;case _0x1bfe55(0x2be):_0x50b54b=_0x51c210[_0x40fdde]!==''?JSON[_0x1bfe55(0x28f)](_0x51c210[_0x40fdde]):[],_0x4491f5=_0x50b54b[_0x1bfe55(0x103)](_0x276a19=>new Function(JSON[_0x1bfe55(0x28f)](_0x276a19)));break;case _0x1bfe55(0x2e2):_0x4491f5=_0x51c210[_0x40fdde]!==''?String(_0x51c210[_0x40fdde]):'';break;case _0x1bfe55(0x323):_0x50b54b=_0x51c210[_0x40fdde]!==''?JSON['parse'](_0x51c210[_0x40fdde]):[],_0x4491f5=_0x50b54b[_0x1bfe55(0x103)](_0x3dcf69=>String(_0x3dcf69));break;case _0x1bfe55(0x2d2):_0xb0e499=_0x51c210[_0x40fdde]!==''?JSON[_0x1bfe55(0x28f)](_0x51c210[_0x40fdde]):{},_0x4491f5=VisuMZ[_0x1bfe55(0x1f8)]({},_0xb0e499);break;case _0x1bfe55(0x35e):_0x50b54b=_0x51c210[_0x40fdde]!==''?JSON[_0x1bfe55(0x28f)](_0x51c210[_0x40fdde]):[],_0x4491f5=_0x50b54b[_0x1bfe55(0x103)](_0x2c7e55=>VisuMZ[_0x1bfe55(0x1f8)]({},JSON[_0x1bfe55(0x28f)](_0x2c7e55)));break;default:continue;}_0x5a2a4c[_0xaf32af]=_0x4491f5;}}else{let _0x25f77e=_0xc94786[_0x1bfe55(0x190)],_0xf9112a=_0x5989c4['height']+this['itemPadding']()*0x2,_0x507803=_0x195ac6['y'],_0x28c8cd=_0x43817b['width']-_0xf9112a-this[_0x1bfe55(0x28c)]()-_0x17a00d['iconWidth'];_0x5bb711['isCraftingItemMasked'](_0x1f8867)&&(_0x25f77e=_0x341036[_0x1bfe55(0x32b)]['maskItemName'](_0x55f7d7),this['contents'][_0x1bfe55(0x285)]=_0x4f8850[_0x1bfe55(0x1d7)]),this[_0x1bfe55(0x111)](_0x25f77e,_0xf9112a,_0x507803,_0x28c8cd,_0x1bfe55(0x18c)),this[_0x1bfe55(0x12e)][_0x1bfe55(0x285)]=![];}}return _0x5a2a4c;},(_0x46c1e5=>{const _0x3e493f=_0x4a3404,_0x402be9=_0x46c1e5[_0x3e493f(0x190)];for(const _0x48e782 of dependencies){if(!Imported[_0x48e782]){alert(_0x3e493f(0x2b6)[_0x3e493f(0x283)](_0x402be9,_0x48e782)),SceneManager[_0x3e493f(0x369)]();break;}}const _0x1cf414=_0x46c1e5['description'];if(_0x1cf414['match'](/\[Version[ ](.*?)\]/i)){const _0x4b2fed=Number(RegExp['$1']);_0x4b2fed!==VisuMZ[label][_0x3e493f(0x36d)]&&('nvGCD'===_0x3e493f(0x309)?(_0x13f6d6=_0x1d5634,_0x380ea4=this[_0x3e493f(0x25e)](_0x47ed1e)):(alert(_0x3e493f(0x24e)[_0x3e493f(0x283)](_0x402be9,_0x4b2fed)),SceneManager['exit']()));}if(_0x1cf414['match'](/\[Tier[ ](\d+)\]/i)){const _0x15ffd8=Number(RegExp['$1']);_0x15ffd8<tier?(alert(_0x3e493f(0x2b2)['format'](_0x402be9,_0x15ffd8,tier)),SceneManager[_0x3e493f(0x369)]()):tier=Math[_0x3e493f(0x2d6)](_0x15ffd8,tier);}VisuMZ[_0x3e493f(0x1f8)](VisuMZ[label][_0x3e493f(0x209)],_0x46c1e5['parameters']);})(pluginData);if(VisuMZ['ItemsEquipsCore'][_0x4a3404(0x36d)]<1.38){let text='';text+='VisuMZ_1_ItemsEquipsCore\x20needs\x20to\x20be\x20updated\x20',text+=_0x4a3404(0x255),alert(text),SceneManager['exit']();}VisuMZ[_0x4a3404(0x32b)]['WarningMsg']=_0x4a3404(0xa6),PluginManager[_0x4a3404(0x26c)](pluginData[_0x4a3404(0x190)],_0x4a3404(0x2cd),_0x2daa9a=>{const _0x141179=_0x4a3404;if(SceneManager[_0x141179(0x2bd)]())return;if(SceneManager[_0x141179(0x1ed)]())return;if($gameSystem[_0x141179(0x19f)])return;if(DataManager[_0x141179(0x26d)]()[_0x141179(0x1dc)]<=0x0){if(_0x141179(0x358)!=='rgGqG'){_0x46c8cd=_0x3e9c63||0x1,this['changePaintOpacity'](![]);const _0x5bfc9f=_0x257f3c[_0x141179(0x2f0)](),_0x5bd5f5=_0x208b57['dimColor2'](),_0x53c2dd=_0x281e63['width']/0x2,_0x2ad120=this[_0x141179(0x34a)]();while(_0x2b8cec--){this[_0x141179(0x12e)][_0x141179(0x286)](_0x561ba4['x'],_0x21808a['y'],_0x53c2dd,_0x2ad120,_0x5bd5f5,_0x5bfc9f),this[_0x141179(0x12e)][_0x141179(0x286)](_0x514e1f['x']+_0x53c2dd,_0x4977db['y'],_0x53c2dd,_0x2ad120,_0x5bfc9f,_0x5bd5f5);}this['changePaintOpacity'](!![]);}else{$gameTemp['isPlaytest']()&&(_0x141179(0x354)!==_0x141179(0x354)?this[_0x141179(0xc1)](...arguments):alert(VisuMZ[_0x141179(0x32b)]['WarningMsg']));return;}}SceneManager['push'](Scene_ItemCrafting);}),PluginManager[_0x4a3404(0x26c)](pluginData[_0x4a3404(0x190)],_0x4a3404(0x31c),_0x58f9eb=>{const _0x58120a=_0x4a3404;if(SceneManager[_0x58120a(0x2bd)]())return;if(SceneManager[_0x58120a(0x1ed)]())return;if($gameSystem[_0x58120a(0x19f)])return;VisuMZ[_0x58120a(0x1f8)](_0x58f9eb,_0x58f9eb);const _0x2ae5bc={'items':_0x58f9eb[_0x58120a(0x140)][_0x58120a(0x103)](_0xa68e45=>$dataItems[_0xa68e45])[_0x58120a(0xb1)](_0x3e2afd=>DataManager[_0x58120a(0x290)]()['includes'](_0x3e2afd)),'weapons':_0x58f9eb['Weapons'][_0x58120a(0x103)](_0x35e619=>$dataWeapons[_0x35e619])[_0x58120a(0xb1)](_0x21657a=>DataManager[_0x58120a(0x11a)]()[_0x58120a(0x2ad)](_0x21657a)),'armors':_0x58f9eb['Armors']['map'](_0x2e2428=>$dataArmors[_0x2e2428])['filter'](_0x37bd3c=>DataManager[_0x58120a(0x1c1)]()[_0x58120a(0x2ad)](_0x37bd3c)),'BypassSwitches':_0x58f9eb[_0x58120a(0x18a)],'BypassMasks':_0x58f9eb[_0x58120a(0x133)]};_0x2ae5bc[_0x58120a(0x141)]=_0x2ae5bc['items']['concat'](_0x2ae5bc[_0x58120a(0xe6)],_0x2ae5bc[_0x58120a(0x1b2)]);if(_0x2ae5bc[_0x58120a(0x141)][_0x58120a(0x1dc)]<=0x0){$gameTemp['isPlaytest']()&&alert(VisuMZ[_0x58120a(0x32b)][_0x58120a(0x233)]);return;}$gameTemp['setCustomItemCraftingSettings'](_0x2ae5bc),SceneManager[_0x58120a(0x119)](Scene_ItemCrafting);}),PluginManager[_0x4a3404(0x26c)](pluginData[_0x4a3404(0x190)],_0x4a3404(0x261),_0x3d5233=>{const _0x421efd=_0x4a3404;if(!SceneManager[_0x421efd(0x2ec)]())return;if(!$gameSystem[_0x421efd(0x19f)])return;$gameSystem[_0x421efd(0x19f)]=undefined,SceneManager['push'](Scene_ItemCrafting);}),PluginManager[_0x4a3404(0x26c)](pluginData[_0x4a3404(0x190)],_0x4a3404(0xce),_0x55d1b3=>{const _0x2aa148=_0x4a3404;VisuMZ[_0x2aa148(0x1f8)](_0x55d1b3,_0x55d1b3),$gameSystem[_0x2aa148(0x169)](_0x55d1b3['Enable']);}),PluginManager[_0x4a3404(0x26c)](pluginData[_0x4a3404(0x190)],_0x4a3404(0xbe),_0x5e51fb=>{const _0x75fa8a=_0x4a3404;VisuMZ[_0x75fa8a(0x1f8)](_0x5e51fb,_0x5e51fb),$gameSystem[_0x75fa8a(0x2aa)](_0x5e51fb[_0x75fa8a(0x267)]);}),VisuMZ[_0x4a3404(0x32b)][_0x4a3404(0x312)]={'Ingredients':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>\s*([\s\S]*)\s*<\/(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>/i,'AllSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'AnySwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:ANY SWITCH|ANY SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OnSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN ON (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OffSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN OFF (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'MaskText':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) MASK:[ ](.*)>/i,'NoMask':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) NO MASK>/i,'customCraftingOnly':/<CUSTOM (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) ONLY>/i,'jsOnCraft':/<JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>\s*([\s\S]*)\s*<\/JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>/i,'animationIDs':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) FADE SPEED:[ ](\d+)>/i,'craftPicture':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'CraftEventOnce':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'CraftEventRepeat':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'CraftOnceAllSw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'CraftOnceAnySw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i,'CraftRepeatAllSw':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'CraftRepeatAnySw':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i,'CraftBatchWrap':/<CRAFT BATCH>\s*([\s\S]*)\s*<\/CRAFT BATCH>/i},VisuMZ['ItemCraftingSys'][_0x4a3404(0x291)]=Scene_Boot[_0x4a3404(0xd7)][_0x4a3404(0x331)],Scene_Boot['prototype'][_0x4a3404(0x331)]=function(){const _0x50e65c=_0x4a3404;VisuMZ[_0x50e65c(0x32b)]['Scene_Boot_onDatabaseLoaded'][_0x50e65c(0x2d3)](this),this[_0x50e65c(0x1c4)]();},Scene_Boot['prototype'][_0x4a3404(0x1c4)]=function(){const _0x1520ab=_0x4a3404;this[_0x1520ab(0x142)]();},Scene_Boot[_0x4a3404(0xd7)]['process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags']=function(){const _0x163ba7=_0x4a3404;if(VisuMZ[_0x163ba7(0x344)])return;const _0x1fd0ad=$dataItems['concat']($dataWeapons,$dataArmors);for(const _0xc0653f of _0x1fd0ad){if(_0x163ba7(0x1c7)!=='QuQOr'){if(!_0xc0653f)continue;VisuMZ[_0x163ba7(0x32b)]['Parse_Notetags_CreateJS'](_0xc0653f);}else{let _0x521374='';_0x521374+=_0x163ba7(0x34e),_0x521374+=_0x163ba7(0x255),_0x36db6f(_0x521374),_0x9923e4[_0x163ba7(0x369)]();}}},VisuMZ[_0x4a3404(0x32b)][_0x4a3404(0x20f)]=VisuMZ[_0x4a3404(0x20f)],VisuMZ[_0x4a3404(0x20f)]=function(_0x13bae6){const _0x372c71=_0x4a3404;VisuMZ[_0x372c71(0x32b)][_0x372c71(0x20f)]['call'](this,_0x13bae6),VisuMZ[_0x372c71(0x32b)][_0x372c71(0x1d6)](_0x13bae6);},VisuMZ[_0x4a3404(0x32b)][_0x4a3404(0x262)]=VisuMZ[_0x4a3404(0x262)],VisuMZ[_0x4a3404(0x262)]=function(_0x3149eb){const _0x37bf28=_0x4a3404;VisuMZ[_0x37bf28(0x32b)][_0x37bf28(0x262)][_0x37bf28(0x2d3)](this,_0x3149eb),VisuMZ[_0x37bf28(0x32b)][_0x37bf28(0x1d6)](_0x3149eb);},VisuMZ['ItemCraftingSys']['ParseArmorNotetags']=VisuMZ['ParseArmorNotetags'],VisuMZ['ParseArmorNotetags']=function(_0x37b28d){const _0x2927dd=_0x4a3404;VisuMZ[_0x2927dd(0x32b)][_0x2927dd(0x1e1)][_0x2927dd(0x2d3)](this,_0x37b28d),VisuMZ[_0x2927dd(0x32b)][_0x2927dd(0x1d6)](_0x37b28d);},VisuMZ['ItemCraftingSys']['Parse_Notetags_CreateJS']=function(_0x272469){const _0x2c9105=_0x4a3404;_0x272469[_0x2c9105(0x113)][_0x2c9105(0x351)](VisuMZ[_0x2c9105(0x32b)]['RegExp'][_0x2c9105(0x363)])&&VisuMZ[_0x2c9105(0x32b)][_0x2c9105(0xd4)](_0x272469,RegExp['$1']);},VisuMZ[_0x4a3404(0x32b)]['JS']={},VisuMZ[_0x4a3404(0x32b)]['createJS']=function(_0x4588e5,_0x4b4c05){const _0x46cf8e=_0x4a3404,_0x2eed28=_0x46cf8e(0x281)[_0x46cf8e(0x283)](_0x4b4c05),_0x34e6ae=DataManager[_0x46cf8e(0x258)](_0x4588e5);VisuMZ[_0x46cf8e(0x32b)]['JS'][_0x34e6ae]=new Function(_0x2eed28);},DataManager[_0x4a3404(0x327)]=function(_0x2b9e1d){const _0x50e1a4=_0x4a3404;if(!_0x2b9e1d)return![];if(DataManager[_0x50e1a4(0x13a)](_0x2b9e1d)['length']<=0x0)return![];if(_0x2b9e1d[_0x50e1a4(0x113)]['match'](VisuMZ['ItemCraftingSys'][_0x50e1a4(0x312)][_0x50e1a4(0x126)])){if(!$gameTemp['getCustomItemCraftingSettings']())return![];}if(!VisuMZ['ItemCraftingSys'][_0x50e1a4(0x209)]['General'][_0x50e1a4(0x1ab)]['call'](this,_0x2b9e1d))return![];if(!VisuMZ['ItemCraftingSys'][_0x50e1a4(0x252)](_0x2b9e1d))return![];if(!VisuMZ['ItemCraftingSys'][_0x50e1a4(0x1b1)](_0x2b9e1d))return![];return!![];},VisuMZ['ItemCraftingSys'][_0x4a3404(0x252)]=function(_0x14118b){const _0x5d9f3f=_0x4a3404,_0x2b9bed=$gameTemp[_0x5d9f3f(0x2e7)]();if(_0x2b9bed&&_0x2b9bed[_0x5d9f3f(0x18a)])return!![];const _0x4ceef4=VisuMZ[_0x5d9f3f(0x32b)]['RegExp'][_0x5d9f3f(0x254)],_0x5b649a=_0x14118b[_0x5d9f3f(0x113)][_0x5d9f3f(0x351)](_0x4ceef4);if(_0x5b649a){if('LkXic'!==_0x5d9f3f(0x21f)){let _0x26e1bd=_0x2bbe8e[0x0],_0x5c6c17='';if(_0x26e1bd===_0x5d9f3f(0x29a))_0x5c6c17=_0x197be6['currencyUnit'];else typeof _0x26e1bd===_0x5d9f3f(0x27b)&&_0x26e1bd[_0x5d9f3f(0x351)](/CATEGORY/i)?(_0x26e1bd[_0x5d9f3f(0x351)](/CATEGORY: (.*)/i),_0x5c6c17=_0x3c9e41(_0x5ed2f6['$1'])['trim']()):_0x5c6c17=_0x26e1bd[_0x5d9f3f(0x190)];this['_tooltipWindow'][_0x5d9f3f(0x322)](_0x5c6c17[_0x5d9f3f(0x1cd)]());return;}else for(const _0x3ea3ae of _0x5b649a){if(!_0x3ea3ae)continue;_0x3ea3ae[_0x5d9f3f(0x351)](_0x4ceef4);const _0x2a9c9d=JSON[_0x5d9f3f(0x28f)]('['+RegExp['$1'][_0x5d9f3f(0x351)](/\d+/g)+']');for(const _0x3fff6a of _0x2a9c9d){if('BGAwF'===_0x5d9f3f(0x293))return _0x4be936[_0x5d9f3f(0xd7)]['statusWindowRectItemsEquipsCore'][_0x5d9f3f(0x2d3)](this);else{if(!$gameSwitches[_0x5d9f3f(0x128)](_0x3fff6a))return![];}}}}return!![];},VisuMZ[_0x4a3404(0x32b)][_0x4a3404(0x1b1)]=function(_0x30dd07){const _0x127031=_0x4a3404,_0x55c2a1=$gameTemp[_0x127031(0x2e7)]();if(_0x55c2a1&&_0x55c2a1[_0x127031(0x18a)])return!![];const _0x3f9c65=VisuMZ[_0x127031(0x32b)][_0x127031(0x312)]['AnySwitches'],_0x5a6eaf=_0x30dd07[_0x127031(0x113)][_0x127031(0x351)](_0x3f9c65);if(_0x5a6eaf){if(_0x127031(0x2ee)===_0x127031(0xf3)){const _0x299466=this[_0x127031(0xa4)](_0x1cc7a1);if(!_0x299466)return;const _0x22409f=this[_0x127031(0x2a9)](_0x22a07f);this[_0x127031(0x329)](),this[_0x127031(0x15e)](_0x22409f,0x2),this[_0x127031(0x325)](_0x47ed98,_0x299466,_0x22409f),this['drawCraftedIcon'](_0x299466,_0x22409f),this['drawCraftingItemName'](_0x299466,_0x22409f),this[_0x127031(0x122)](_0x299466,_0x22409f);}else{for(const _0x38ce64 of _0x5a6eaf){if(_0x127031(0x206)!==_0x127031(0x361)){if(!_0x38ce64)continue;_0x38ce64[_0x127031(0x351)](_0x3f9c65);const _0x1c1870=JSON[_0x127031(0x28f)]('['+RegExp['$1'][_0x127031(0x351)](/\d+/g)+']');for(const _0x21a875 of _0x1c1870){if($gameSwitches[_0x127031(0x128)](_0x21a875))return!![];}}else return _0x4fc7cb[_0x127031(0xdb)];}return![];}}return!![];},DataManager[_0x4a3404(0x26d)]=function(){const _0x440ce3=_0x4a3404,_0x21b6b8=$gameTemp[_0x440ce3(0x2e7)]();if(_0x21b6b8)return _0x21b6b8[_0x440ce3(0x141)]['filter'](_0x636fe3=>this[_0x440ce3(0x327)](_0x636fe3));const _0x233d37=this[_0x440ce3(0xf6)](),_0x4c4c60=this[_0x440ce3(0x179)](),_0x4a8741=this[_0x440ce3(0x127)]();return _0x233d37['concat'](_0x4c4c60,_0x4a8741);},DataManager[_0x4a3404(0xf6)]=function(){const _0x50ff91=_0x4a3404;return this[_0x50ff91(0x290)]()[_0x50ff91(0xb1)](_0x2cb74e=>this[_0x50ff91(0x327)](_0x2cb74e));},DataManager[_0x4a3404(0x290)]=function(){const _0x5d9f7b=_0x4a3404;if(this[_0x5d9f7b(0x182)]!==undefined)return this['_allCraftableItems'];this[_0x5d9f7b(0x182)]=[];for(const _0x36006f of $dataItems){if(_0x5d9f7b(0x17a)===_0x5d9f7b(0x279)){const _0x5a7bc5=this[_0x5d9f7b(0x2d5)]();this[_0x5d9f7b(0x12b)](),this[_0x5d9f7b(0x111)](this['_text'],0x0,0x0,this[_0x5d9f7b(0x14c)],_0x5d9f7b(0x14f));}else{if(!_0x36006f)continue;_0x36006f[_0x5d9f7b(0x113)][_0x5d9f7b(0x351)](VisuMZ[_0x5d9f7b(0x32b)][_0x5d9f7b(0x312)][_0x5d9f7b(0x137)])&&this[_0x5d9f7b(0x182)]['push'](_0x36006f);}}return this[_0x5d9f7b(0x182)];},DataManager[_0x4a3404(0x179)]=function(){const _0x92c2dc=_0x4a3404;return this[_0x92c2dc(0x11a)]()['filter'](_0x151896=>this[_0x92c2dc(0x327)](_0x151896));},DataManager[_0x4a3404(0x11a)]=function(){const _0x5d9713=_0x4a3404;if(this[_0x5d9713(0x271)]!==undefined)return this[_0x5d9713(0x271)];this['_allCraftableWeapons']=[];for(const _0xaec1bd of $dataWeapons){if(!_0xaec1bd)continue;if(_0xaec1bd[_0x5d9713(0x113)][_0x5d9713(0x351)](VisuMZ[_0x5d9713(0x32b)][_0x5d9713(0x312)]['Ingredients'])){if(_0x5d9713(0x236)==='ZDJdU')this[_0x5d9713(0x271)][_0x5d9713(0x119)](_0xaec1bd);else{if(this[_0x5d9713(0x1c0)]&&this[_0x5d9713(0x1c0)]['active'])return _0x56a4dc[_0x5d9713(0x36b)][_0x5d9713(0x209)][_0x5d9713(0x1c8)][_0x5d9713(0x1be)];return _0x1bc8a0['prototype']['buttonAssistText2'][_0x5d9713(0x2d3)](this);}}}return this['_allCraftableWeapons'];},DataManager[_0x4a3404(0x127)]=function(){const _0x5a0e6b=_0x4a3404;return this[_0x5a0e6b(0x1c1)]()[_0x5a0e6b(0xb1)](_0x4d8f1f=>this[_0x5a0e6b(0x327)](_0x4d8f1f));},DataManager[_0x4a3404(0x1c1)]=function(){const _0x1be384=_0x4a3404;if(this['_allCraftableArmors']!==undefined)return this['_allCraftableArmors'];this[_0x1be384(0x135)]=[];for(const _0xc787bf of $dataArmors){if(!_0xc787bf)continue;_0xc787bf[_0x1be384(0x113)][_0x1be384(0x351)](VisuMZ[_0x1be384(0x32b)][_0x1be384(0x312)][_0x1be384(0x137)])&&(_0x1be384(0x20b)!=='jiNOt'?_0x56f3a1['ItemCraftingSys'][_0x1be384(0x213)]['call'](this,_0x5ee338,_0x56200f,_0x23862b):this[_0x1be384(0x135)][_0x1be384(0x119)](_0xc787bf));}return this[_0x1be384(0x135)];},DataManager['getCraftingIngredients']=function(_0x19ccf2){const _0x20d4b8=_0x4a3404;if(!_0x19ccf2)return[];const _0x2066f9=this[_0x20d4b8(0x258)](_0x19ccf2);return this[_0x20d4b8(0x148)]===undefined&&this[_0x20d4b8(0x29b)](),this[_0x20d4b8(0x148)][_0x2066f9]||[];},DataManager['createCraftingItemKey']=function(_0x2e1f00){const _0x49a053=_0x4a3404;let _0x17b6c2=_0x49a053(0x29e);if(this[_0x49a053(0x32a)](_0x2e1f00))return _0x17b6c2[_0x49a053(0x283)](_0x49a053(0x240),_0x2e1f00['id']);if(this[_0x49a053(0x237)](_0x2e1f00))return _0x17b6c2['format']('Weapon',_0x2e1f00['id']);if(this[_0x49a053(0xfd)](_0x2e1f00))return _0x17b6c2[_0x49a053(0x283)](_0x49a053(0x224),_0x2e1f00['id']);return'';},DataManager['createCraftingIngredientsLists']=function(){const _0x1abf90=_0x4a3404;this[_0x1abf90(0x148)]={};const _0x56f2a2=$dataItems[_0x1abf90(0x104)]($dataWeapons,$dataArmors);for(const _0x189db8 of _0x56f2a2){if(!_0x189db8)continue;if(_0x189db8[_0x1abf90(0x113)][_0x1abf90(0x351)](VisuMZ[_0x1abf90(0x32b)][_0x1abf90(0x312)]['Ingredients'])){const _0xbe8ebe=String(RegExp['$1'])[_0x1abf90(0x1e6)](/[\r\n]+/),_0x1bf7f5=this['parseCraftingIngredientsData'](_0x189db8,_0xbe8ebe);if(_0x1bf7f5['length']<=0x0)continue;const _0x147f86=this[_0x1abf90(0x258)](_0x189db8);this[_0x1abf90(0x148)][_0x147f86]=_0x1bf7f5;}}},DataManager[_0x4a3404(0x12f)]=function(_0xa256ba,_0x10d910){const _0x168129=_0x4a3404;let _0x750c8b=[];for(let _0x268dce of _0x10d910){_0x268dce=_0x268dce[_0x168129(0x1cd)]();if(_0x268dce['match'](/GOLD:[ ](\d+)/i))_0x750c8b['push']([_0x168129(0x29a),Number(RegExp['$1'])]);else{if(_0x268dce[_0x168129(0x351)](/CATEGORY[ ](.*):[ ](\d+)/i)){const _0x555e60=String(RegExp['$1'])[_0x168129(0x1cd)](),_0x27f740=Number(RegExp['$2'])||0x1,_0x25dfe0=_0x168129(0x150)[_0x168129(0x283)](_0x555e60);_0x750c8b[_0x168129(0x119)]([_0x25dfe0,_0x27f740]);}else{if(_0x268dce[_0x168129(0x351)](/(.*?)[ ](\d+):[ ](\d+)/i)){if(_0x168129(0x36e)!==_0x168129(0x36e)){const _0x169797=_0x458c73[_0x168129(0x16b)];return _0x9efba8(_0x306134[_0x168129(0x190)]['length']+0x1)[_0x168129(0xef)](_0x169797);}else{const _0x2174f0=RegExp['$1']['toLowerCase']()['trim'](),_0x4e51f9=Number(RegExp['$2'])||0x0,_0x1f6d5e=Number(RegExp['$3'])||0x1;let _0x4bcc09=null;if([_0x168129(0x13b),_0x168129(0x33c)]['includes'](_0x2174f0))_0x4bcc09=$dataItems;if(['weapon',_0x168129(0xe6)]['includes'](_0x2174f0))_0x4bcc09=$dataWeapons;if(['armor',_0x168129(0x1b2)][_0x168129(0x2ad)](_0x2174f0))_0x4bcc09=$dataArmors;if(this['checkItemCraftingResultsValid'](_0xa256ba,_0x4bcc09,_0x4e51f9,_0x750c8b)){if(_0x168129(0x2e4)==='jDpyM'){const _0x141abb=_0x23c36a[_0x168129(0x2e7)]();if(_0x141abb)return _0x141abb['all'][_0x168129(0xb1)](_0x40bbb0=>this[_0x168129(0x327)](_0x40bbb0));const _0x45ed49=this[_0x168129(0xf6)](),_0x292ff5=this['craftableWeapons'](),_0x56df80=this['craftableArmors']();return _0x45ed49[_0x168129(0x104)](_0x292ff5,_0x56df80);}else _0x750c8b[_0x168129(0x119)]([_0x4bcc09[_0x4e51f9],_0x1f6d5e]);}}}else{if(_0x268dce[_0x168129(0x351)](/(.*?)[ ](.*):[ ](\d+)/i)){if(_0x168129(0x1c3)!==_0x168129(0x1c3)){let _0x3e81fb=_0x3efc94[0x0];this[_0x168129(0x329)](),this[_0x168129(0x1fd)](_0x3c6294,'-'),_0x3e81fb===_0x168129(0x29a)?this['drawGoldIngredient'](_0xa9b950,_0x2fc144,!![]):this[_0x168129(0x277)](_0x382a07,_0x456f71,!![],![]);}else{const _0x5d0b2f=RegExp['$1'][_0x168129(0x16d)]()[_0x168129(0x1cd)](),_0x12800c=RegExp['$2']['trim'](),_0x327461=Number(RegExp['$3'])||0x1;let _0x5c7afe=null,_0x554c75=0x0;[_0x168129(0x13b),_0x168129(0x33c)][_0x168129(0x2ad)](_0x5d0b2f)&&(_0x5c7afe=$dataItems,_0x554c75=this[_0x168129(0x106)](_0x12800c));[_0x168129(0x28b),_0x168129(0xe6)]['includes'](_0x5d0b2f)&&(_0x5c7afe=$dataWeapons,_0x554c75=this[_0x168129(0x25e)](_0x12800c));if([_0x168129(0x356),_0x168129(0x1b2)][_0x168129(0x2ad)](_0x5d0b2f)){if(_0x168129(0xf7)!=='PMfaO')_0x5c7afe=$dataArmors,_0x554c75=this[_0x168129(0x1cf)](_0x12800c);else{if(this['_numberWindow']&&this['_numberWindow']['active'])return _0x294b46[_0x168129(0x260)](_0x168129(0x18c),_0x168129(0x292));return _0x1de4a3['prototype']['buttonAssistKey1'][_0x168129(0x2d3)](this);}}if(this['checkItemCraftingResultsValid'](_0xa256ba,_0x5c7afe,_0x554c75,_0x750c8b)){if(_0x168129(0x26e)===_0x168129(0x26e))_0x750c8b['push']([_0x5c7afe[_0x554c75],_0x327461]);else return this[_0x168129(0x108)]()?this[_0x168129(0x199)]():_0x26877[_0x168129(0xd7)][_0x168129(0x114)][_0x168129(0x2d3)](this);}}}}}}}return _0x750c8b;},DataManager['checkItemCraftingResultsValid']=function(_0x58f6a4,_0x28c522,_0x43e231,_0x43cd87){if(!_0x28c522)return![];if(!_0x28c522[_0x43e231])return![];const _0x10fda7=_0x28c522[_0x43e231];if(_0x10fda7===_0x58f6a4)return![];for(const _0x1d555a of _0x43cd87){if(!_0x1d555a)continue;if(_0x1d555a[0x0]===_0x10fda7)return![];}return!![];},DataManager['getItemIdWithName']=function(_0x593a7a){const _0x37fd1b=_0x4a3404;_0x593a7a=_0x593a7a[_0x37fd1b(0x1d1)]()[_0x37fd1b(0x1cd)](),this[_0x37fd1b(0x320)]=this['_itemIDs']||{};if(this[_0x37fd1b(0x320)][_0x593a7a])return this['_itemIDs'][_0x593a7a];for(const _0x55b1ab of $dataItems){if(!_0x55b1ab)continue;this['_itemIDs'][_0x55b1ab[_0x37fd1b(0x190)][_0x37fd1b(0x1d1)]()[_0x37fd1b(0x1cd)]()]=_0x55b1ab['id'];}return this['_itemIDs'][_0x593a7a]||0x0;},DataManager['getWeaponIdWithName']=function(_0x3c841b){const _0x3697e8=_0x4a3404;_0x3c841b=_0x3c841b[_0x3697e8(0x1d1)]()['trim'](),this['_weaponIDs']=this['_weaponIDs']||{};if(this[_0x3697e8(0x19c)][_0x3c841b])return this['_weaponIDs'][_0x3c841b];for(const _0x193d5c of $dataWeapons){if(!_0x193d5c)continue;this['_weaponIDs'][_0x193d5c[_0x3697e8(0x190)][_0x3697e8(0x1d1)]()[_0x3697e8(0x1cd)]()]=_0x193d5c['id'];}return this[_0x3697e8(0x19c)][_0x3c841b]||0x0;},DataManager[_0x4a3404(0x1cf)]=function(_0x508d50){const _0x2eb28c=_0x4a3404;_0x508d50=_0x508d50[_0x2eb28c(0x1d1)]()[_0x2eb28c(0x1cd)](),this[_0x2eb28c(0x1bc)]=this['_armorIDs']||{};if(this[_0x2eb28c(0x1bc)][_0x508d50])return this['_armorIDs'][_0x508d50];for(const _0x5a7287 of $dataArmors){if(!_0x5a7287)continue;this[_0x2eb28c(0x1bc)][_0x5a7287['name'][_0x2eb28c(0x1d1)]()['trim']()]=_0x5a7287['id'];}return this[_0x2eb28c(0x1bc)][_0x508d50]||0x0;},DataManager[_0x4a3404(0x20c)]=function(_0x38c8b6){const _0x29bea6=_0x4a3404;if(!_0x38c8b6)return![];if(DataManager[_0x29bea6(0x1ac)](_0x38c8b6))return![];if(!VisuMZ[_0x29bea6(0x32b)][_0x29bea6(0x209)][_0x29bea6(0x2c5)]['Enable'])return![];DataManager[_0x29bea6(0x370)]&&(_0x29bea6(0x2d0)===_0x29bea6(0x2d0)?_0x38c8b6=DataManager[_0x29bea6(0x370)](_0x38c8b6):_0x42355a['log'](_0x2e6797['name']+'\x20x'+_0x12b5dd));const _0x372fe8=$gameTemp[_0x29bea6(0x2e7)]();if(_0x372fe8&&_0x372fe8['BypassMasks'])return![];if(_0x38c8b6[_0x29bea6(0x113)][_0x29bea6(0x351)](VisuMZ[_0x29bea6(0x32b)][_0x29bea6(0x312)][_0x29bea6(0xc7)]))return![];return!$gameSystem['isItemCrafted'](_0x38c8b6);},DataManager[_0x4a3404(0x1ac)]=function(_0x18cb7f){const _0x5d75f2=_0x4a3404;if(!Imported[_0x5d75f2(0x366)])return![];return this['getCraftBatchItems'](_0x18cb7f)!==null;},DataManager[_0x4a3404(0x19e)]=function(_0x19335d){const _0x557ceb=_0x4a3404;if(!_0x19335d)return null;if(this['isSkill'](_0x19335d))return null;if(this[_0x557ceb(0x1bd)](_0x19335d))return null;if(!Imported[_0x557ceb(0x366)])return null;let _0x3417ec='';if(DataManager[_0x557ceb(0x32a)](_0x19335d))_0x557ceb(0x181)!==_0x557ceb(0x25d)?_0x3417ec=_0x557ceb(0x11c)[_0x557ceb(0x283)](_0x19335d['id']):(_0x58054f['_bypassProxy']=!![],this[_0x557ceb(0x16e)]=this[_0x557ceb(0xf0)]['item'](),this[_0x557ceb(0xf0)][_0x557ceb(0x2fb)](),this[_0x557ceb(0x176)](),this[_0x557ceb(0x10b)]()?this['setupSelectIngredientWindow']():this[_0x557ceb(0x1d8)](),_0x84b069['_bypassProxy']=![],this[_0x557ceb(0x16e)]=this[_0x557ceb(0xf0)][_0x557ceb(0x13b)]());else{if(DataManager[_0x557ceb(0x237)](_0x19335d)){if(_0x557ceb(0x2b7)!=='Zpqjk')return _0x3706bb['ItemCraftingSys'][_0x557ceb(0x209)][_0x557ceb(0x272)][_0x557ceb(0x243)][_0x557ceb(0x2d3)](this);else _0x3417ec=_0x557ceb(0x1a6)[_0x557ceb(0x283)](_0x19335d['id']);}else{if(DataManager[_0x557ceb(0xfd)](_0x19335d))_0x3417ec=_0x557ceb(0x266)[_0x557ceb(0x283)](_0x19335d['id']);else return null;}}DataManager[_0x557ceb(0x153)]=DataManager[_0x557ceb(0x153)]||{};if(DataManager[_0x557ceb(0x153)][_0x3417ec]!==undefined)return DataManager[_0x557ceb(0x153)][_0x3417ec];let _0x1bc935=![],_0x4ffbf8={};const _0x843c8c=VisuMZ[_0x557ceb(0x32b)]['RegExp'],_0x1ec398=_0x19335d[_0x557ceb(0x113)]||'';if(_0x1ec398[_0x557ceb(0x351)](_0x843c8c[_0x557ceb(0xd2)])){if(_0x557ceb(0x33e)!==_0x557ceb(0x2b9)){const _0x38237b=String(RegExp['$1'])[_0x557ceb(0x1e6)](/[\r\n]+/)[_0x557ceb(0x342)]('');_0x4ffbf8={'items':{},'weapons':{},'armors':{}};for(const _0x3f4cb4 of _0x38237b){if(_0x3f4cb4['match'](/ITEM[ ](.*):[ ](\d+)/i)){const _0x18ea31=String(RegExp['$1']),_0x3a6e56=Math[_0x557ceb(0x2d6)](0x1,Number(RegExp['$2'])),_0x15acc9=/^\d+$/['test'](_0x18ea31),_0x341e58=_0x15acc9?_0x18ea31:this['getItemIdWithName'](_0x18ea31);_0x4ffbf8[_0x557ceb(0x33c)][_0x341e58]=_0x3a6e56,_0x1bc935=!![];}else{if(_0x3f4cb4[_0x557ceb(0x351)](/ITEM[ ](.*)/i)){const _0xf66bc5=String(RegExp['$1']),_0x4b027c=/^\d+$/[_0x557ceb(0x317)](_0xf66bc5),_0x58e8a6=_0x4b027c?_0xf66bc5:this[_0x557ceb(0x106)](_0xf66bc5);_0x4ffbf8[_0x557ceb(0x33c)][_0x58e8a6]=0x1,_0x1bc935=!![];}}if(_0x3f4cb4[_0x557ceb(0x351)](/WEAPON[ ](.*):[ ](\d+)/i)){const _0xeb6ae2=String(RegExp['$1']),_0x3595a6=Math[_0x557ceb(0x2d6)](0x1,Number(RegExp['$2'])),_0x8bedbf=/^\d+$/[_0x557ceb(0x317)](_0xeb6ae2),_0x241d2a=_0x8bedbf?_0xeb6ae2:this[_0x557ceb(0x25e)](_0xeb6ae2);_0x4ffbf8[_0x557ceb(0xe6)][_0x241d2a]=_0x3595a6,_0x1bc935=!![];}else{if(_0x3f4cb4[_0x557ceb(0x351)](/WEAPON[ ](.*)/i)){if('QQzdp'!==_0x557ceb(0x250))_0x21ee0f['remove'](_0x4bb108);else{const _0x3368c9=String(RegExp['$1']),_0x3f1403=/^\d+$/[_0x557ceb(0x317)](_0x3368c9),_0x3bf807=_0x3f1403?_0x3368c9:this['getWeaponIdWithName'](_0x3368c9);_0x4ffbf8[_0x557ceb(0xe6)][_0x3bf807]=0x1,_0x1bc935=!![];}}}if(_0x3f4cb4[_0x557ceb(0x351)](/ARMOR[ ](.*):[ ](\d+)/i)){const _0x4c5380=String(RegExp['$1']),_0x3218e7=Math[_0x557ceb(0x2d6)](0x1,Number(RegExp['$2'])),_0x25405d=/^\d+$/['test'](_0x4c5380),_0x462f79=_0x25405d?_0x4c5380:this[_0x557ceb(0x1cf)](_0x4c5380);_0x4ffbf8[_0x557ceb(0x1b2)][_0x462f79]=_0x3218e7,_0x1bc935=!![];}else{if(_0x3f4cb4[_0x557ceb(0x351)](/ARMOR[ ](.*)/i)){if(_0x557ceb(0x313)!=='vxqLx'){const _0xa6ea9=String(RegExp['$1']),_0x43e1c4=/^\d+$/['test'](_0xa6ea9),_0x35ca0b=_0x43e1c4?_0xa6ea9:this['getArmorIdWithName'](_0xa6ea9);_0x4ffbf8['armors'][_0x35ca0b]=0x1,_0x1bc935=!![];}else return _0xf587f7[_0x557ceb(0xd7)]['commandWindowRectItemsEquipsCore']['call'](this);}}}}else _0x1f6130[_0x557ceb(0x119)]([_0x557ceb(0x29a),_0x119d63(_0x109b40['$1'])]);}if(!_0x1bc935)_0x4ffbf8=null;return DataManager[_0x557ceb(0x153)][_0x3417ec]=_0x4ffbf8,DataManager['_cache_getCraftBatchItems'][_0x3417ec];},ImageManager[_0x4a3404(0x22c)]=VisuMZ[_0x4a3404(0x32b)][_0x4a3404(0x209)]['General'][_0x4a3404(0x173)],SoundManager[_0x4a3404(0x1ee)]=function(_0x2c86f0){const _0xd84f32=_0x4a3404;AudioManager[_0xd84f32(0x1eb)](VisuMZ['ItemCraftingSys']['Settings'][_0xd84f32(0xaf)]);},TextManager[_0x4a3404(0x220)]=VisuMZ[_0x4a3404(0x32b)][_0x4a3404(0x209)][_0x4a3404(0x123)][_0x4a3404(0xe9)],TextManager[_0x4a3404(0xdb)]=VisuMZ[_0x4a3404(0x32b)][_0x4a3404(0x209)][_0x4a3404(0x123)][_0x4a3404(0x184)],TextManager[_0x4a3404(0x16b)]=VisuMZ[_0x4a3404(0x32b)][_0x4a3404(0x209)]['Mask'][_0x4a3404(0x117)],TextManager[_0x4a3404(0x222)]=VisuMZ[_0x4a3404(0x32b)][_0x4a3404(0x209)][_0x4a3404(0x174)][_0x4a3404(0x265)],TextManager['ItemCraftingNumberWindow']={'owned':VisuMZ[_0x4a3404(0x32b)]['Settings'][_0x4a3404(0x123)]['NumWindowOwned']||'Owned','shift':VisuMZ[_0x4a3404(0x32b)][_0x4a3404(0x209)]['General'][_0x4a3404(0x333)]||_0x4a3404(0x2bb),'net':VisuMZ[_0x4a3404(0x32b)][_0x4a3404(0x209)][_0x4a3404(0x123)][_0x4a3404(0x2bf)]||_0x4a3404(0x20a)},ColorManager[_0x4a3404(0x13d)]=function(_0x5d701e){const _0x41a401=_0x4a3404;return _0x5d701e=String(_0x5d701e),_0x5d701e['match'](/#(.*)/i)?'#%1'[_0x41a401(0x283)](String(RegExp['$1'])):'GWUtT'!==_0x41a401(0x216)?_0x4d6708[_0x41a401(0xd7)][_0x41a401(0x1a7)][_0x41a401(0x2d3)](this):this[_0x41a401(0x20d)](Number(_0x5d701e));},SceneManager[_0x4a3404(0x2bd)]=function(){const _0x328bc2=_0x4a3404;return this[_0x328bc2(0xba)]&&this[_0x328bc2(0xba)][_0x328bc2(0x332)]===Scene_Battle;},SceneManager[_0x4a3404(0x1ed)]=function(){const _0x3a7d5f=_0x4a3404;return this[_0x3a7d5f(0xba)]&&this[_0x3a7d5f(0xba)][_0x3a7d5f(0x332)]===Scene_ItemCrafting;},Game_Temp[_0x4a3404(0xd7)][_0x4a3404(0x2e7)]=function(){const _0x9d8887=_0x4a3404;return this[_0x9d8887(0x1cc)];},Game_Temp[_0x4a3404(0xd7)][_0x4a3404(0x270)]=function(){const _0x331c8f=_0x4a3404;this[_0x331c8f(0x1cc)]=undefined;},Game_Temp['prototype'][_0x4a3404(0x2a1)]=function(_0xbb50f6){const _0x1a7610=_0x4a3404;this[_0x1a7610(0x1cc)]=_0xbb50f6;},VisuMZ['ItemCraftingSys'][_0x4a3404(0x31d)]=Game_System[_0x4a3404(0xd7)][_0x4a3404(0xc1)],Game_System[_0x4a3404(0xd7)][_0x4a3404(0xc1)]=function(){const _0x5bfe3a=_0x4a3404;VisuMZ[_0x5bfe3a(0x32b)][_0x5bfe3a(0x31d)]['call'](this),this[_0x5bfe3a(0x19b)](),this['initItemCraftingSys'](),this[_0x5bfe3a(0x207)]();},Game_System['prototype'][_0x4a3404(0x19b)]=function(){const _0x3e64fd=_0x4a3404;this[_0x3e64fd(0x121)]={'shown':VisuMZ[_0x3e64fd(0x32b)][_0x3e64fd(0x209)]['MainMenu'][_0x3e64fd(0x1d9)],'enabled':VisuMZ['ItemCraftingSys'][_0x3e64fd(0x209)][_0x3e64fd(0x174)][_0x3e64fd(0x2f5)]};},Game_System[_0x4a3404(0xd7)]['isMainMenuItemCraftingVisible']=function(){const _0x302629=_0x4a3404;if(this['_ItemCrafting_MainMenu']===undefined)this['initItemCraftingMainMenu']();return this[_0x302629(0x121)]['shown'];},Game_System[_0x4a3404(0xd7)][_0x4a3404(0x2aa)]=function(_0x3be41b){const _0x296cf9=_0x4a3404;if(this[_0x296cf9(0x121)]===undefined)this[_0x296cf9(0x19b)]();this[_0x296cf9(0x121)][_0x296cf9(0x27a)]=_0x3be41b;},Game_System[_0x4a3404(0xd7)][_0x4a3404(0x2ff)]=function(){const _0x3a49ba=_0x4a3404;if(this[_0x3a49ba(0x121)]===undefined)this[_0x3a49ba(0x19b)]();return this[_0x3a49ba(0x121)][_0x3a49ba(0x2fe)];},Game_System[_0x4a3404(0xd7)][_0x4a3404(0x169)]=function(_0x8da8dc){const _0x100d6c=_0x4a3404;if(this[_0x100d6c(0x121)]===undefined)this[_0x100d6c(0x19b)]();this[_0x100d6c(0x121)][_0x100d6c(0x2fe)]=_0x8da8dc;},Game_System[_0x4a3404(0xd7)]['initItemCraftingSys']=function(){const _0x20ae02=_0x4a3404;this[_0x20ae02(0x2a4)]={'items':{},'weapons':{},'armors':{}};},Game_System['prototype']['isItemCrafted']=function(_0x5e3f03){const _0xc65a7f=_0x4a3404;return!!this[_0xc65a7f(0x33d)](_0x5e3f03);},Game_System['prototype'][_0x4a3404(0x33d)]=function(_0x43d4ce){const _0x1cb6ca=_0x4a3404;if(!_0x43d4ce)return![];if(this[_0x1cb6ca(0x2a4)]===undefined)this[_0x1cb6ca(0x1b0)]();let _0xcc11e4={};if(DataManager[_0x1cb6ca(0x32a)](_0x43d4ce))_0xcc11e4=this[_0x1cb6ca(0x2a4)]['items'];if(DataManager['isWeapon'](_0x43d4ce))_0xcc11e4=this[_0x1cb6ca(0x2a4)][_0x1cb6ca(0xe6)];if(DataManager[_0x1cb6ca(0xfd)](_0x43d4ce))_0xcc11e4=this[_0x1cb6ca(0x2a4)][_0x1cb6ca(0x1b2)];return _0xcc11e4[_0x43d4ce['id']]||0x0;},Game_System[_0x4a3404(0xd7)][_0x4a3404(0x301)]=function(_0x4f2616,_0xe71b12){const _0x259e2d=_0x4a3404;if(!_0x4f2616)return![];if(this[_0x259e2d(0x2a4)]===undefined)this[_0x259e2d(0x1b0)]();_0xe71b12=_0xe71b12||0x1;let _0x5579ea={};if(DataManager[_0x259e2d(0x32a)](_0x4f2616))_0x5579ea=this[_0x259e2d(0x2a4)][_0x259e2d(0x33c)];if(DataManager[_0x259e2d(0x237)](_0x4f2616))_0x5579ea=this[_0x259e2d(0x2a4)][_0x259e2d(0xe6)];if(DataManager[_0x259e2d(0xfd)](_0x4f2616))_0x5579ea=this[_0x259e2d(0x2a4)][_0x259e2d(0x1b2)];_0x5579ea[_0x4f2616['id']]=_0x5579ea[_0x4f2616['id']]||0x0,_0x5579ea[_0x4f2616['id']]+=_0xe71b12;},Game_System['prototype'][_0x4a3404(0x207)]=function(){this['_craftingEvents']={'items':[],'weapons':[],'armors':[]};},Game_System[_0x4a3404(0xd7)][_0x4a3404(0x15b)]=function(_0x178256){const _0xd62008=_0x4a3404;if(this[_0xd62008(0x19a)]===undefined)this[_0xd62008(0x207)]();let _0xcd96cf=[];if(DataManager[_0xd62008(0x32a)](_0x178256))_0xcd96cf=this[_0xd62008(0x19a)][_0xd62008(0x33c)];else{if(DataManager['isWeapon'](_0x178256)){if(_0xd62008(0x1e8)!==_0xd62008(0x1e8)){if((this[_0xd62008(0x339)]||0x0)<=0x0)return![];return _0x45c2fe[_0xd62008(0xd7)][_0xd62008(0x2c7)]['call'](this);}else _0xcd96cf=this[_0xd62008(0x19a)][_0xd62008(0xe6)];}else DataManager[_0xd62008(0xfd)](_0x178256)&&(_0xcd96cf=this[_0xd62008(0x19a)][_0xd62008(0x1b2)]);}!_0xcd96cf['includes'](_0x178256['id'])&&_0xcd96cf['push'](_0x178256['id']);},Game_System[_0x4a3404(0xd7)][_0x4a3404(0x247)]=function(_0x5cb926){const _0xa0e876=_0x4a3404;if(this[_0xa0e876(0x19a)]===undefined)this[_0xa0e876(0x207)]();let _0x4713bd=[];if(DataManager[_0xa0e876(0x32a)](_0x5cb926))_0x4713bd=this[_0xa0e876(0x19a)][_0xa0e876(0x33c)];else{if(DataManager[_0xa0e876(0x237)](_0x5cb926)){if(_0xa0e876(0x1e7)===_0xa0e876(0x1e7))_0x4713bd=this[_0xa0e876(0x19a)][_0xa0e876(0xe6)];else return this['allCraftableWeapons']()[_0xa0e876(0xb1)](_0x22d528=>this[_0xa0e876(0x327)](_0x22d528));}else DataManager[_0xa0e876(0xfd)](_0x5cb926)&&(_0x4713bd=this[_0xa0e876(0x19a)][_0xa0e876(0x1b2)]);}return _0x4713bd['includes'](_0x5cb926['id']);},VisuMZ['ItemCraftingSys'][_0x4a3404(0x161)]=Game_Party[_0x4a3404(0xd7)][_0x4a3404(0x289)],Game_Party[_0x4a3404(0xd7)][_0x4a3404(0x289)]=function(_0x4602de){const _0x46f37c=_0x4a3404;if(DataManager[_0x46f37c(0x1ac)](_0x4602de))return 0x0;return VisuMZ['ItemCraftingSys'][_0x46f37c(0x161)][_0x46f37c(0x2d3)](this,_0x4602de);},VisuMZ[_0x4a3404(0x32b)]['Game_Party_gainItem']=Game_Party[_0x4a3404(0xd7)][_0x4a3404(0x263)],Game_Party[_0x4a3404(0xd7)][_0x4a3404(0x263)]=function(_0x5735ec,_0x226aa0,_0x35c2d5){const _0x5a949d=_0x4a3404;DataManager[_0x5a949d(0x1ac)](_0x5735ec)&&_0x226aa0>0x0?_0x5a949d(0x2c8)!=='GzFxr'?this['gainCraftBatchItems'](_0x5735ec,_0x226aa0):_0x2bdd34[_0x5a949d(0x32b)][_0x5a949d(0xc9)][_0x5a949d(0x2d3)](this):VisuMZ[_0x5a949d(0x32b)][_0x5a949d(0x213)][_0x5a949d(0x2d3)](this,_0x5735ec,_0x226aa0,_0x35c2d5);},Game_Party[_0x4a3404(0xd7)][_0x4a3404(0x239)]=function(_0x538235,_0x595a40){const _0x3368be=_0x4a3404,_0x4723c1=DataManager[_0x3368be(0x19e)](_0x538235),_0x15e9b0=[_0x3368be(0x33c),_0x3368be(0xe6),_0x3368be(0x1b2)];for(const _0x3f0757 of _0x15e9b0){if(_0x3368be(0x1ad)===_0x3368be(0xc8))_0x16f3cf['ItemCraftingSys'][_0x3368be(0x337)][_0x3368be(0x2d3)](this,_0x325b4d);else{const _0xebe281=_0x4723c1[_0x3f0757];for(const _0x2ffee8 in _0xebe281){if('kDJuG'!==_0x3368be(0xa5))this[_0x3368be(0x277)](_0x8ef35e,_0x12bb1a,!![],![]);else{const _0x5c6f53=Number(_0x2ffee8),_0x53998b=(_0xebe281[_0x2ffee8]||0x1)*_0x595a40;let _0x4af7c2=null;if(_0x3f0757===_0x3368be(0x33c))_0x4af7c2=$dataItems[_0x5c6f53];if(_0x3f0757==='weapons')_0x4af7c2=$dataWeapons[_0x5c6f53];if(_0x3f0757===_0x3368be(0x1b2))_0x4af7c2=$dataArmors[_0x5c6f53];if(DataManager[_0x3368be(0x1bd)](_0x4af7c2))continue;_0x4af7c2&&(this[_0x3368be(0x263)](_0x4af7c2,_0x53998b),![]&&console[_0x3368be(0x159)](_0x4af7c2[_0x3368be(0x190)]+'\x20x'+_0x53998b));}}}}},Game_Party[_0x4a3404(0xd7)][_0x4a3404(0x132)]=function(_0x34f470){const _0x52aba2=_0x4a3404,_0x1e1c2c=DataManager[_0x52aba2(0x19e)](_0x34f470),_0x1a688c=[_0x52aba2(0x33c),_0x52aba2(0xe6),_0x52aba2(0x1b2)];for(const _0x2bf64b of _0x1a688c){const _0x52d6a0=_0x1e1c2c[_0x2bf64b];for(const _0x42b9b5 in _0x52d6a0){if(_0x52aba2(0x22f)!==_0x52aba2(0x22f)){if(_0x404f11[_0x52aba2(0x128)](_0x490717)===![])return![];}else{const _0x3f841b=Number(_0x42b9b5);let _0x3cff66=null;if(_0x2bf64b==='items')_0x3cff66=$dataItems[_0x3f841b];if(_0x2bf64b===_0x52aba2(0xe6))_0x3cff66=$dataWeapons[_0x3f841b];if(_0x2bf64b==='armors')_0x3cff66=$dataArmors[_0x3f841b];if(DataManager['isProxyItem'](_0x3cff66))continue;if(_0x3cff66&&!this[_0x52aba2(0x192)](_0x3cff66)){if(_0x52aba2(0x2ac)!==_0x52aba2(0x2ac))_0x22bf9d[_0x52aba2(0x119)](_0x1843d8);else return![];}}}}return!![];},Game_Party[_0x4a3404(0xd7)]['calcCraftBatchItemsMax']=function(_0x208ff7){const _0x1cd177=_0x4a3404;let _0x1b0ba7=0x0;const _0x37a570=DataManager[_0x1cd177(0x19e)](_0x208ff7),_0x1a4a50=['items',_0x1cd177(0xe6),_0x1cd177(0x1b2)];for(const _0x100cee of _0x1a4a50){const _0x168900=_0x37a570[_0x100cee];for(const _0x42d3f2 in _0x168900){if(_0x1cd177(0x287)===_0x1cd177(0x287)){const _0x5e62cd=Number(_0x42d3f2),_0x188131=_0x168900[_0x42d3f2]||0x1;let _0x490c8c=null;if(_0x100cee==='items')_0x490c8c=$dataItems[_0x5e62cd];if(_0x100cee==='weapons')_0x490c8c=$dataWeapons[_0x5e62cd];if(_0x100cee===_0x1cd177(0x1b2))_0x490c8c=$dataArmors[_0x5e62cd];if(DataManager['isProxyItem'](_0x490c8c))continue;if(_0x490c8c){if(_0x1cd177(0x343)!==_0x1cd177(0x235)){const _0x2e67e7=this[_0x1cd177(0x218)](_0x490c8c),_0x28a7f3=this[_0x1cd177(0x289)](_0x490c8c),_0x21dc03=_0x2e67e7-_0x28a7f3;if(_0x21dc03>0x0){let _0x1e5573=_0x21dc03/_0x188131;_0x1e5573=Math[_0x1cd177(0x294)](_0x1e5573),_0x1b0ba7=Math['max'](_0x1b0ba7,_0x1e5573);}}else{let _0x556577=_0x2e2784['itemCraftingIngredientsBridge'],_0x1532f8=_0x551970['y']+(_0x5c4a85['height']-this[_0x1cd177(0x34a)]()*1.5);this['drawText'](_0x556577,_0x2c0c92,_0x1532f8,_0x5ed181,_0x1cd177(0x14f));}}}else{const _0x1625ce=_0x1f0969['$1'][_0x1cd177(0x16d)]()[_0x1cd177(0x1cd)](),_0x51acd3=_0xb70290(_0x4f8fa0['$2'])||0x0,_0x5227ba=_0x8c0ac(_0x18eca5['$3'])||0x1;let _0xb53846=null;if([_0x1cd177(0x13b),_0x1cd177(0x33c)][_0x1cd177(0x2ad)](_0x1625ce))_0xb53846=_0x2f5b54;if([_0x1cd177(0x28b),_0x1cd177(0xe6)][_0x1cd177(0x2ad)](_0x1625ce))_0xb53846=_0x23d414;if([_0x1cd177(0x356),_0x1cd177(0x1b2)]['includes'](_0x1625ce))_0xb53846=_0x268f42;this[_0x1cd177(0x1b3)](_0x11b7e6,_0xb53846,_0x51acd3,_0x49fa9c)&&_0x32d88f['push']([_0xb53846[_0x51acd3],_0x5227ba]);}}}return _0x1b0ba7;},VisuMZ['ItemCraftingSys'][_0x4a3404(0x29d)]=Scene_Menu[_0x4a3404(0xd7)][_0x4a3404(0x23f)],Scene_Menu[_0x4a3404(0xd7)][_0x4a3404(0x23f)]=function(){const _0x5267db=_0x4a3404;VisuMZ[_0x5267db(0x32b)][_0x5267db(0x29d)][_0x5267db(0x2d3)](this);const _0x222379=this[_0x5267db(0x189)];_0x222379['setHandler'](_0x5267db(0x197),this[_0x5267db(0xb7)]['bind'](this));},Scene_Menu[_0x4a3404(0xd7)][_0x4a3404(0xb7)]=function(){const _0x43fb9f=_0x4a3404;SceneManager[_0x43fb9f(0x119)](Scene_ItemCrafting);};function Scene_ItemCrafting(){this['initialize'](...arguments);}Scene_ItemCrafting[_0x4a3404(0xd7)]=Object[_0x4a3404(0x330)](Scene_Item[_0x4a3404(0xd7)]),Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x332)]=Scene_ItemCrafting,Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0xc1)]=function(){const _0x4823ac=_0x4a3404;Scene_Item[_0x4823ac(0xd7)][_0x4823ac(0xc1)][_0x4823ac(0x2d3)](this),$gameSystem['_craftingCommonEventScene']=undefined;},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x21d)]=function(){const _0x24f311=_0x4a3404;Scene_Item['prototype'][_0x24f311(0x21d)][_0x24f311(0x2d3)](this),this[_0x24f311(0x34c)]();},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x330)]=function(){const _0x271792=_0x4a3404;Scene_Item[_0x271792(0xd7)]['create'][_0x271792(0x2d3)](this),this[_0x271792(0x35d)](),this[_0x271792(0x1ba)](),this[_0x271792(0x278)](),this['createIngredientSelectionList'](),this[_0x271792(0x304)]()&&this[_0x271792(0x264)](),this[_0x271792(0x22b)](),this[_0x271792(0x316)]();},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x22b)]=function(){const _0x1dd080=_0x4a3404,_0x60cb6c=VisuMZ[_0x1dd080(0x32b)][_0x1dd080(0x209)][_0x1dd080(0x272)];this['_helpWindow']&&this[_0x1dd080(0x30b)][_0x1dd080(0x144)](_0x60cb6c[_0x1dd080(0x2d9)]);this[_0x1dd080(0x319)]&&(_0x1dd080(0x2a7)===_0x1dd080(0x2a7)?this[_0x1dd080(0x319)][_0x1dd080(0x144)](_0x60cb6c[_0x1dd080(0x147)]):this[_0x1dd080(0xb0)]=_0x5e2d39[_0x1dd080(0x2d6)](_0x4c9bad(_0x3d2fd9['$1']),0x1));this['_goldWindow']&&this[_0x1dd080(0x17f)][_0x1dd080(0x144)](_0x60cb6c['GoldBgType']);this['_itemWindow']&&this[_0x1dd080(0xf0)][_0x1dd080(0x144)](_0x60cb6c[_0x1dd080(0x10f)]);if(this[_0x1dd080(0x2d7)]){if(_0x1dd080(0x138)!=='wdGDA'){if(this[_0x1dd080(0x2dd)])return;const _0x20e8a3=this[_0x1dd080(0x16e)],_0x294f64=_0x20e8a3[_0x1dd080(0x1f7)],_0x185f6d=_0x582393[_0x1dd080(0xe0)],_0x71b03c=_0x219a30[_0x1dd080(0x145)],_0x4f1c0f=_0x294f64%0x10*_0x185f6d,_0x4ce509=_0x5f21f3[_0x1dd080(0x1b9)](_0x294f64/0x10)*_0x71b03c;this[_0x1dd080(0x163)][_0x1dd080(0x24b)](_0x4f1c0f,_0x4ce509,_0x185f6d,_0x71b03c);}else this['_statusWindow'][_0x1dd080(0x144)](_0x60cb6c[_0x1dd080(0x13f)]);}this[_0x1dd080(0x2ea)]&&this['_ingredientSelectTitle'][_0x1dd080(0x144)](_0x60cb6c[_0x1dd080(0x14e)]),this[_0x1dd080(0x136)]&&('GBqRr'==='pAbym'?this[_0x1dd080(0x142)]():this['_ingredientSelectList'][_0x1dd080(0x144)](_0x60cb6c[_0x1dd080(0x368)])),this[_0x1dd080(0x1c0)]&&(_0x1dd080(0x360)!==_0x1dd080(0x2b4)?this['_numberWindow'][_0x1dd080(0x144)](_0x60cb6c[_0x1dd080(0x1e3)]):this[_0x1dd080(0x225)]()),this['_buttonAssistWindow']&&this[_0x1dd080(0x232)][_0x1dd080(0x144)](_0x60cb6c[_0x1dd080(0x15c)]);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x27e)]=function(){const _0x296e8e=_0x4a3404;return Scene_Shop[_0x296e8e(0xd7)][_0x296e8e(0x1fa)][_0x296e8e(0x2d3)](this);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x35d)]=function(){const _0x4c8050=_0x4a3404,_0x34d89a=this[_0x4c8050(0x2af)]();this['_goldWindow']=new Window_Gold(_0x34d89a),this[_0x4c8050(0x321)](this[_0x4c8050(0x17f)]);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x2af)]=function(){const _0x560a9f=_0x4a3404;return Scene_Shop[_0x560a9f(0xd7)][_0x560a9f(0x194)][_0x560a9f(0x2d3)](this);},Scene_ItemCrafting[_0x4a3404(0xd7)]['categoryWindowRect']=function(){const _0x178c51=_0x4a3404;return Scene_Shop[_0x178c51(0xd7)]['commandWindowRectItemsEquipsCore']['call'](this);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x2c4)]=function(){const _0x43c501=_0x4a3404;this[_0x43c501(0x36a)](),this[_0x43c501(0x304)]()&&this[_0x43c501(0x23c)](),this[_0x43c501(0x1fc)]()&&(this[_0x43c501(0xbc)](),this[_0x43c501(0x321)](this[_0x43c501(0xf0)]));},Scene_ItemCrafting['prototype'][_0x4a3404(0x36a)]=function(){const _0x4906d2=_0x4a3404,_0x239587=this[_0x4906d2(0x296)]();this['_itemWindow']=new Window_ItemCraftingList(_0x239587),this['_itemWindow']['setHelpWindow'](this[_0x4906d2(0x30b)]),this[_0x4906d2(0xf0)][_0x4906d2(0x11f)]('ok',this[_0x4906d2(0xc2)][_0x4906d2(0xcc)](this)),this[_0x4906d2(0xf0)][_0x4906d2(0x11f)](_0x4906d2(0x33b),this[_0x4906d2(0x2ba)]['bind'](this)),this[_0x4906d2(0x321)](this[_0x4906d2(0xf0)]),this[_0x4906d2(0x319)][_0x4906d2(0x14a)](this[_0x4906d2(0xf0)]),!this['_categoryWindow']['needsSelection']()&&(this[_0x4906d2(0xf0)]['y']-=this[_0x4906d2(0x319)][_0x4906d2(0x2c6)],this[_0x4906d2(0xf0)][_0x4906d2(0x2c6)]+=this[_0x4906d2(0x319)]['height'],this[_0x4906d2(0x319)][_0x4906d2(0x2fb)](),this[_0x4906d2(0x319)][_0x4906d2(0x17e)](),this[_0x4906d2(0x264)]());},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x296)]=function(){const _0x3be99b=_0x4a3404;return this[_0x3be99b(0x189)]=this[_0x3be99b(0x319)],Scene_Shop[_0x3be99b(0xd7)][_0x3be99b(0x11e)][_0x3be99b(0x2d3)](this);},Scene_ItemCrafting[_0x4a3404(0xd7)]['statusWindowRect']=function(){const _0x55237=_0x4a3404;return Scene_Shop[_0x55237(0xd7)][_0x55237(0x114)][_0x55237(0x2d3)](this);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x1ba)]=function(){const _0x4324c9=_0x4a3404,_0x14b838=this[_0x4324c9(0x296)]();this[_0x4324c9(0x1c0)]=new Window_ItemCraftingNumber(_0x14b838),this[_0x4324c9(0x1c0)][_0x4324c9(0x2fb)](),this[_0x4324c9(0x1c0)]['setHandler']('ok',this[_0x4324c9(0x177)]['bind'](this)),this[_0x4324c9(0x1c0)][_0x4324c9(0x11f)](_0x4324c9(0x33b),this[_0x4324c9(0x13c)][_0x4324c9(0xcc)](this)),this[_0x4324c9(0x321)](this['_numberWindow']);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x278)]=function(){const _0x12b92e=_0x4a3404,_0x4ea99b=this[_0x12b92e(0x372)]();this[_0x12b92e(0x2ea)]=new Window_Selectable(_0x4ea99b),this[_0x12b92e(0x2ea)]['hide'](),this[_0x12b92e(0x321)](this[_0x12b92e(0x2ea)]);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x2f2)]=function(){const _0x5473ae=_0x4a3404,_0x306913=this[_0x5473ae(0x296)](),_0x463531=new Window_ItemCraftingIngredient(_0x306913);_0x463531[_0x5473ae(0x2fb)](),_0x463531[_0x5473ae(0x115)](this[_0x5473ae(0x30b)]),_0x463531[_0x5473ae(0x253)](this['_statusWindow']),_0x463531[_0x5473ae(0x11f)]('ok',this[_0x5473ae(0x1c6)]['bind'](this)),_0x463531['setHandler']('cancel',this['onIngredientListCancel'][_0x5473ae(0xcc)](this)),this[_0x5473ae(0x136)]=_0x463531,this[_0x5473ae(0x321)](this[_0x5473ae(0x136)]);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x108)]=function(){const _0x3213a2=_0x4a3404;return VisuMZ[_0x3213a2(0x32b)]['Settings'][_0x3213a2(0x272)][_0x3213a2(0xcb)];},Scene_ItemCrafting['prototype'][_0x4a3404(0x27e)]=function(){const _0x39a81a=_0x4a3404;return this[_0x39a81a(0x108)]()?this[_0x39a81a(0xbf)]():Scene_Shop['prototype'][_0x39a81a(0x1fa)][_0x39a81a(0x2d3)](this);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0xbf)]=function(){const _0x24cfc2=_0x4a3404;if(VisuMZ[_0x24cfc2(0x32b)][_0x24cfc2(0x209)]['Window'][_0x24cfc2(0x158)])return VisuMZ[_0x24cfc2(0x32b)][_0x24cfc2(0x209)][_0x24cfc2(0x272)][_0x24cfc2(0x158)]['call'](this);const _0x2b5037=0x0,_0xefbc28=this[_0x24cfc2(0x2c2)](),_0xad2cd6=Graphics[_0x24cfc2(0xdd)],_0x111e7d=this[_0x24cfc2(0x154)]();return new Rectangle(_0x2b5037,_0xefbc28,_0xad2cd6,_0x111e7d);},Scene_ItemCrafting['prototype']['categoryWindowRect']=function(){const _0x1e2c5e=_0x4a3404;if(this[_0x1e2c5e(0x108)]()){if(_0x1e2c5e(0x2a0)!==_0x1e2c5e(0x32e))return this[_0x1e2c5e(0x35f)]();else _0x58c4f8=this['_craftingEvents'][_0x1e2c5e(0xe6)];}else{if(_0x1e2c5e(0x268)===_0x1e2c5e(0x268))return Scene_Shop[_0x1e2c5e(0xd7)][_0x1e2c5e(0x1a7)]['call'](this);else this['changeTextColor'](_0x4fb3c9[_0x1e2c5e(0x1df)]());}},Scene_ItemCrafting[_0x4a3404(0xd7)]['categoryWindowRectJS']=function(){const _0x5a38d0=_0x4a3404;if(VisuMZ['ItemCraftingSys'][_0x5a38d0(0x209)][_0x5a38d0(0x272)][_0x5a38d0(0x1a9)])return VisuMZ['ItemCraftingSys']['Settings']['Window']['CategoryWindow_RectJS']['call'](this);const _0x147773=this[_0x5a38d0(0x2a8)]()?this['mainCommandWidth']():0x0,_0x3dbf01=this['mainAreaTop'](),_0x2467d1=Graphics['boxWidth']-this[_0x5a38d0(0x245)](),_0x45b330=this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0x147773,_0x3dbf01,_0x2467d1,_0x45b330);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x2af)]=function(){const _0x40ece9=_0x4a3404;return this[_0x40ece9(0x108)]()?this[_0x40ece9(0x1f3)]():Scene_Shop[_0x40ece9(0xd7)][_0x40ece9(0x194)][_0x40ece9(0x2d3)](this);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x1f3)]=function(){const _0x488c88=_0x4a3404;if(VisuMZ[_0x488c88(0x32b)][_0x488c88(0x209)]['Window'][_0x488c88(0x28d)])return VisuMZ[_0x488c88(0x32b)][_0x488c88(0x209)][_0x488c88(0x272)][_0x488c88(0x28d)][_0x488c88(0x2d3)](this);const _0xa89e47=this[_0x488c88(0x245)](),_0x55fbb2=this['calcWindowHeight'](0x1,!![]),_0x4cebcb=this[_0x488c88(0x2a8)]()?0x0:Graphics[_0x488c88(0xdd)]-_0xa89e47,_0x5089c9=this[_0x488c88(0x11d)]();return new Rectangle(_0x4cebcb,_0x5089c9,_0xa89e47,_0x55fbb2);},Scene_ItemCrafting[_0x4a3404(0xd7)]['itemWindowRect']=function(){const _0x42e94e=_0x4a3404;this[_0x42e94e(0x189)]=this[_0x42e94e(0x319)];if(this['isCustomLayout']())return this[_0x42e94e(0xd8)]();else{if('ucYei'!==_0x42e94e(0x170)){if(!this[_0x42e94e(0x1a1)])return;this[_0x42e94e(0x1f9)]()?this[_0x42e94e(0xea)]():this[_0x42e94e(0x1a1)][_0x42e94e(0x322)]('');const _0xe46ad0=new _0x5ffa84(_0x111029['x'],_0x59052c['y']),_0x10b7e8=this[_0x42e94e(0x1aa)][_0x42e94e(0xa9)](_0xe46ad0);this[_0x42e94e(0x1a1)]['x']=_0x10b7e8['x']-this[_0x42e94e(0x1a1)][_0x42e94e(0x1cb)]/0x2,this['_tooltipWindow']['y']=_0x10b7e8['y']-this[_0x42e94e(0x1a1)]['height'];}else return Scene_Shop[_0x42e94e(0xd7)][_0x42e94e(0x11e)]['call'](this);}},Scene_ItemCrafting['prototype']['itemWindowRectJS']=function(){const _0x113da7=_0x4a3404;if(VisuMZ[_0x113da7(0x32b)][_0x113da7(0x209)]['Window'][_0x113da7(0x243)])return VisuMZ[_0x113da7(0x32b)][_0x113da7(0x209)][_0x113da7(0x272)]['ItemWindow_RectJS'][_0x113da7(0x2d3)](this);const _0x1569cb=this[_0x113da7(0x189)]['y']+this[_0x113da7(0x189)][_0x113da7(0x2c6)],_0x2ea9ba=Graphics['boxWidth']-this['statusWidth'](),_0x1ad3e3=this['mainAreaHeight']()-this[_0x113da7(0x189)][_0x113da7(0x2c6)],_0x203fee=this[_0x113da7(0x2a8)]()?Graphics[_0x113da7(0xdd)]-_0x2ea9ba:0x0;return new Rectangle(_0x203fee,_0x1569cb,_0x2ea9ba,_0x1ad3e3);},Scene_ItemCrafting['prototype'][_0x4a3404(0x1fc)]=function(){const _0x2ebe84=_0x4a3404;if(this[_0x2ebe84(0x108)]())return!![];return Scene_Item[_0x2ebe84(0xd7)][_0x2ebe84(0x1fc)]['call'](this);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x2f3)]=function(){const _0x4f3f97=_0x4a3404;if(this[_0x4f3f97(0x108)]()){if(_0x4f3f97(0x249)==='rllPI')this[_0x4f3f97(0x241)](_0x2343d2);else return this[_0x4f3f97(0x199)]();}else{if(_0x4f3f97(0x2cc)!==_0x4f3f97(0x168))return Scene_Shop[_0x4f3f97(0xd7)][_0x4f3f97(0x114)]['call'](this);else _0x1c9451['playItemCrafting']();}},Scene_ItemCrafting[_0x4a3404(0xd7)]['statusWindowRectJS']=function(){const _0xfd402a=_0x4a3404;if(VisuMZ['ItemCraftingSys']['Settings']['Window'][_0xfd402a(0x338)])return VisuMZ[_0xfd402a(0x32b)]['Settings']['Window']['StatusWindow_RectJS'][_0xfd402a(0x2d3)](this);const _0x20754e=this[_0xfd402a(0xdc)](),_0xc128e8=this[_0xfd402a(0x2ca)]()-this[_0xfd402a(0x189)]['height'],_0x18e272=this['isRightInputMode']()?0x0:Graphics[_0xfd402a(0xdd)]-_0x20754e,_0x3c1fe5=this[_0xfd402a(0x189)]['y']+this[_0xfd402a(0x189)]['height'];return new Rectangle(_0x18e272,_0x3c1fe5,_0x20754e,_0xc128e8);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x264)]=function(){const _0x3a9484=_0x4a3404;this['_itemWindow'][_0x3a9484(0x238)](),this[_0x3a9484(0xf0)]['smoothSelect'](0x0);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0xc2)]=function(){const _0x523228=_0x4a3404;$gameTemp['_bypassProxy']=!![],this['_item']=this[_0x523228(0xf0)]['item'](),this[_0x523228(0xf0)]['hide'](),this['clearUserSelectedIngredients']();if(this[_0x523228(0x10b)]())this[_0x523228(0x225)]();else{if(_0x523228(0x36f)===_0x523228(0x25c)){const _0x2002d0=_0xb21343(_0x5a9587['$1']),_0x2685af=/^\d+$/[_0x523228(0x317)](_0x2002d0),_0x42f4d1=_0x2685af?_0x2002d0:this[_0x523228(0x1cf)](_0x2002d0);_0x37e95d['armors'][_0x42f4d1]=0x1,_0x1e7282=!![];}else this[_0x523228(0x1d8)]();}$gameTemp[_0x523228(0x298)]=![],this['_item']=this['_itemWindow'][_0x523228(0x13b)]();},Scene_ItemCrafting[_0x4a3404(0xd7)]['setupNumberWindow']=function(){const _0x1d03dc=_0x4a3404;this[_0x1d03dc(0x2ea)]['hide'](),this[_0x1d03dc(0x136)][_0x1d03dc(0x2fb)](),this[_0x1d03dc(0x319)][_0x1d03dc(0x25f)](),$gameTemp[_0x1d03dc(0x298)]=!![],this[_0x1d03dc(0x1c0)][_0x1d03dc(0x33a)](this[_0x1d03dc(0xf0)][_0x1d03dc(0x13b)]()),$gameTemp[_0x1d03dc(0x298)]=![],this['_numberWindow']['show'](),this[_0x1d03dc(0x1c0)]['activate']();},Scene_ItemCrafting['prototype'][_0x4a3404(0x2ce)]=function(){const _0x45485f=_0x4a3404;this[_0x45485f(0x1c0)][_0x45485f(0x2fb)](),this[_0x45485f(0x2ea)]['hide'](),this[_0x45485f(0x136)]['hide'](),this[_0x45485f(0x319)][_0x45485f(0x25f)](),this['_itemWindow'][_0x45485f(0x25f)](),this[_0x45485f(0xf0)][_0x45485f(0x238)](),this[_0x45485f(0xf0)][_0x45485f(0x208)]();},Scene_ItemCrafting[_0x4a3404(0xd7)]['onNumberOk']=function(){const _0x52d5eb=_0x4a3404;VisuMZ['ItemCraftingSys'][_0x52d5eb(0x209)]['Animation']['ShowAnimations']?this[_0x52d5eb(0xe4)]():this['finishAnimation']();},Scene_ItemCrafting['prototype']['finishAnimation']=function(){const _0x3edddc=_0x4a3404;this['_windowLayer'][_0x3edddc(0xae)]=!![],this[_0x3edddc(0x306)]=![],this['processItemCrafting'](),this[_0x3edddc(0x31f)](),this[_0x3edddc(0x12a)]();},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x12a)]=function(){const _0x4ba8f6=_0x4a3404;this['itemHasCraftCommonEvent']()?_0x4ba8f6(0xf9)!==_0x4ba8f6(0xf9)?(_0x56e838['prototype'][_0x4ba8f6(0xc1)][_0x4ba8f6(0x2d3)](this,_0x420617),this['setBackgroundType'](this[_0x4ba8f6(0x1f1)]()?0x0:0x2),this[_0x4ba8f6(0x322)]('')):this[_0x4ba8f6(0x116)]():this[_0x4ba8f6(0x212)]();},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x212)]=function(){const _0x36cae0=_0x4a3404;this[_0x36cae0(0x2ce)](),this[_0x36cae0(0xf0)][_0x36cae0(0x256)](),this[_0x36cae0(0x319)][_0x36cae0(0x256)](),this[_0x36cae0(0x319)][_0x36cae0(0x22e)](),this[_0x36cae0(0x319)]['callUpdateHelp'](),this[_0x36cae0(0x17f)][_0x36cae0(0x256)](),this[_0x36cae0(0xf0)][_0x36cae0(0x208)]();},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0xeb)]=function(){const _0x941a7b=_0x4a3404;$gameTemp[_0x941a7b(0x298)]=!![];let _0x3c2b27=this[_0x941a7b(0xf0)][_0x941a7b(0x13b)]();$gameTemp['_bypassProxy']=![];const _0x3af662=this[_0x941a7b(0x1c0)][_0x941a7b(0x275)](),_0x4d3d9e=DataManager[_0x941a7b(0x13a)](_0x3c2b27);let _0x20f0d3=0x0;for(const _0x1eb7f4 of _0x4d3d9e){if(_0x941a7b(0x307)!==_0x941a7b(0x307)){let _0x2d9c4b=_0x4d88c6-_0x1448df[_0x941a7b(0x11b)](_0x525ffb/0x2),_0x168721=_0x57be2e+_0xe5bc04[_0x941a7b(0x11b)]((this[_0x941a7b(0x34a)]()-_0x2ec58b[_0x941a7b(0x145)])/0x2);this[_0x941a7b(0x302)](_0x2dfe4f[_0x941a7b(0x1f2)]()),this[_0x941a7b(0x102)](),this[_0x941a7b(0x111)](_0x3af836[_0x941a7b(0x2a2)],_0x2d9c4b,_0x168721,_0x53bbdd,_0x941a7b(0x14f)),this[_0x941a7b(0x329)]();}else{if(!_0x1eb7f4)continue;let _0x4c26ed=_0x1eb7f4[0x0];const _0x20a3cc=_0x1eb7f4[0x1]*_0x3af662;_0x4c26ed===_0x941a7b(0x29a)?_0x941a7b(0x310)===_0x941a7b(0xcf)?(_0x4a2433[_0x941a7b(0xd7)][_0x941a7b(0xc1)][_0x941a7b(0x2d3)](this,_0x2bc984),this[_0x941a7b(0x13e)]()):$gameParty['loseGold'](_0x20a3cc):(typeof _0x4c26ed===_0x941a7b(0x27b)&&_0x4c26ed[_0x941a7b(0x351)](/CATEGORY/i)&&(_0x941a7b(0x1a3)===_0x941a7b(0x1bb)?(_0x23a26d=_0x2fd0a0[_0x941a7b(0xba)][_0x941a7b(0x244)][this[_0x941a7b(0x23e)]],this['_categoryIndex']+=0x1):(_0x4c26ed=this['_ingredientsList'][_0x20f0d3],_0x20f0d3+=0x1)),$gameParty[_0x941a7b(0x1fe)](_0x4c26ed,_0x20a3cc,![]));}}_0x3c2b27=this['_itemWindow']['item'](),$gameParty[_0x941a7b(0x263)](_0x3c2b27,_0x3af662),this['_numberWindow'][_0x941a7b(0x275)]()>0x0?_0x941a7b(0x345)!==_0x941a7b(0x299)?SoundManager[_0x941a7b(0x1ee)]():_0x3ce59b[_0x941a7b(0x32b)][_0x941a7b(0x246)]['call'](this):SoundManager[_0x941a7b(0x251)](),$gameSystem[_0x941a7b(0x301)](_0x3c2b27,_0x3af662);},Scene_ItemCrafting[_0x4a3404(0xd7)]['onItemCrafted']=function(){const _0xa7862e=_0x4a3404,_0x2368a8=this[_0xa7862e(0x16e)],_0x3fe652=this[_0xa7862e(0x1c0)][_0xa7862e(0x275)]();VisuMZ['ItemCraftingSys'][_0xa7862e(0xa7)](_0x2368a8,!![]),VisuMZ[_0xa7862e(0x32b)][_0xa7862e(0xa7)](_0x2368a8,![]),this[_0xa7862e(0x230)]();const _0x1ca6c6=DataManager[_0xa7862e(0x258)](_0x2368a8);VisuMZ[_0xa7862e(0x32b)]['JS'][_0x1ca6c6]&&VisuMZ[_0xa7862e(0x32b)]['JS'][_0x1ca6c6][_0xa7862e(0x2d3)](this,_0x2368a8,_0x3fe652),VisuMZ['ItemCraftingSys'][_0xa7862e(0x209)]['General']['jsGlobalCraftEffect']['call'](this,_0x2368a8,_0x3fe652);},VisuMZ[_0x4a3404(0x32b)][_0x4a3404(0xa7)]=function(_0x5cc9dc,_0x2aa387){const _0x1d2609=_0x4a3404,_0x393733=_0x2aa387?VisuMZ[_0x1d2609(0x32b)][_0x1d2609(0x312)][_0x1d2609(0x30f)]:VisuMZ['ItemCraftingSys'][_0x1d2609(0x312)][_0x1d2609(0x1f6)],_0x290131=_0x5cc9dc[_0x1d2609(0x113)][_0x1d2609(0x351)](_0x393733);if(_0x290131)for(const _0x700072 of _0x290131){if(_0x1d2609(0x160)===_0x1d2609(0x328)){if(this['_ItemCrafting_MainMenu']===_0x4b5fdf)this[_0x1d2609(0x19b)]();return this[_0x1d2609(0x121)][_0x1d2609(0x2fe)];}else{if(!_0x700072)continue;_0x700072[_0x1d2609(0x351)](_0x393733);const _0x4e10f0=JSON[_0x1d2609(0x28f)]('['+RegExp['$1'][_0x1d2609(0x351)](/\d+/g)+']');for(const _0x604b31 of _0x4e10f0){if(_0x1d2609(0x167)===_0x1d2609(0x167))$gameSwitches[_0x1d2609(0x35b)](_0x604b31,_0x2aa387);else{if(!this['_itemSprite'])return;this[_0x1d2609(0x25a)](this[_0x1d2609(0x2ae)]),this[_0x1d2609(0x2ae)][_0x1d2609(0x30a)](),this[_0x1d2609(0x2ae)]=_0x5d5284;}}}}},Scene_ItemCrafting['prototype']['onNumberCancel']=function(){const _0x5d28fc=_0x4a3404;SoundManager['playCancel'](),this[_0x5d28fc(0x276)]();},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x1c6)]=function(){const _0x4c773f=_0x4a3404,_0x208f19=this[_0x4c773f(0x136)][_0x4c773f(0x13b)]();this[_0x4c773f(0x244)][this[_0x4c773f(0x24d)]]=_0x208f19,this[_0x4c773f(0x24d)]++,this['setupSelectIngredientWindow']();},Scene_ItemCrafting[_0x4a3404(0xd7)]['onIngredientListCancel']=function(){const _0x327dcc=_0x4a3404;this[_0x327dcc(0x244)][_0x327dcc(0x34d)](),this['_ingredientIndex']--,this[_0x327dcc(0x24d)]<0x0?this[_0x327dcc(0x2ce)]():this[_0x327dcc(0x225)]();},Scene_ItemCrafting['prototype'][_0x4a3404(0x176)]=function(){const _0x468202=_0x4a3404;this[_0x468202(0x284)]=[],this[_0x468202(0xfb)]=[],this[_0x468202(0x244)]=[],this[_0x468202(0x24d)]=0x0;},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x10b)]=function(){const _0x558d05=_0x4a3404;if(!this[_0x558d05(0x16e)])return![];const _0x2b7214=DataManager[_0x558d05(0x13a)](this[_0x558d05(0x16e)]);for(const _0x5b907c of _0x2b7214){if(!_0x5b907c)continue;const _0x4ef300=_0x5b907c[0x0];if(!_0x4ef300)continue;if(typeof _0x4ef300===_0x558d05(0x27b)&&_0x4ef300['match'](/CATEGORY/i)){if(_0x558d05(0x171)==='NqrFm'){_0x588c34['prototype'][_0x558d05(0x21c)][_0x558d05(0x2d3)](this);if(_0x28c0f9[_0x558d05(0x19f)])return;_0x257d9d[_0x558d05(0x270)]();}else{_0x4ef300[_0x558d05(0x351)](/CATEGORY: (.*)/i);const _0x42ebd5=String(RegExp['$1'])[_0x558d05(0x1cd)]();this[_0x558d05(0x284)][_0x558d05(0x119)](_0x42ebd5),this[_0x558d05(0xfb)][_0x558d05(0x119)](_0x5b907c[0x1]||0x1);}}}return this[_0x558d05(0x284)]['length']>0x0;},Scene_ItemCrafting['prototype']['setupSelectIngredientWindow']=function(){const _0x142a3e=_0x4a3404;if(this['_ingredientIndex']>=this[_0x142a3e(0x284)][_0x142a3e(0x1dc)]){if('SJcSV'!==_0x142a3e(0x23b)){const _0x105232=this[_0x142a3e(0x16e)]?this[_0x142a3e(0x16e)][_0x142a3e(0x113)]:'',_0x3ce076=_0x11a80e['ItemCraftingSys']['RegExp'];let _0x2d2139=0x0;if(this[_0x142a3e(0x2d1)](!![])&&_0x105232[_0x142a3e(0x351)](_0x3ce076[_0x142a3e(0x269)])&&!_0x2ef2ba[_0x142a3e(0x247)](this[_0x142a3e(0x16e)]))_0x2d2139=_0x41ae56(_0x106b58['$1'])||0x1,_0x258ca3['registerCraftingEvent'](this[_0x142a3e(0x16e)]);else this[_0x142a3e(0x2d1)](![])&&_0x105232[_0x142a3e(0x351)](_0x3ce076['CraftEventRepeat'])&&(_0x2d2139=_0x5f6215(_0xfadc4c['$1'])||0x1);if(_0x2d2139<=0x0){this[_0x142a3e(0x212)]();return;}_0x4c9442[_0x142a3e(0x19f)]=!![],_0x42c458[_0x142a3e(0x355)](_0x2d2139),_0x3034ef[_0x142a3e(0x215)](_0x27f231);}else return this[_0x142a3e(0x1d8)]();}this[_0x142a3e(0x319)][_0x142a3e(0x2fb)](),this[_0x142a3e(0x1c0)]['hide']();const _0x50ff18=this['_ingredientCategories'][this[_0x142a3e(0x24d)]],_0x2d0295=this[_0x142a3e(0xfb)][this['_ingredientIndex']];this['_ingredientSelectTitle'][_0x142a3e(0x25f)](),this['_ingredientSelectList'][_0x142a3e(0x25f)](),this['_ingredientSelectTitle'][_0x142a3e(0x12e)][_0x142a3e(0x362)]();const _0x2a6357=VisuMZ[_0x142a3e(0x32b)][_0x142a3e(0x209)]['General']['CategoryTitle'],_0x5817a6=VisuMZ[_0x142a3e(0x36b)][_0x142a3e(0x209)][_0x142a3e(0x10c)]['ItemQuantityFmt'],_0x292f99=_0x2a6357[_0x142a3e(0x283)](_0x50ff18,_0x5817a6[_0x142a3e(0x283)](_0x2d0295)),_0x12587f=this[_0x142a3e(0x2ea)][_0x142a3e(0xa8)](0x0);this[_0x142a3e(0x2ea)]['drawTextEx'](_0x292f99,_0x12587f['x'],_0x12587f['y']),this['_ingredientSelectList'][_0x142a3e(0x33a)](_0x50ff18,_0x2d0295);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0xb4)]=function(){const _0x523751=_0x4a3404;if(this[_0x523751(0x1c0)]&&this[_0x523751(0x1c0)][_0x523751(0x28a)]){if(_0x523751(0x1e9)!=='eadxi')return TextManager[_0x523751(0x260)](_0x523751(0x18c),_0x523751(0x292));else{if(_0x1974af[_0x523751(0x2bd)]())return;if(_0xfc2dae[_0x523751(0x1ed)]())return;if(_0x5e2ff2[_0x523751(0x19f)])return;if(_0x50ea61[_0x523751(0x26d)]()[_0x523751(0x1dc)]<=0x0){_0x4a48b1[_0x523751(0xc0)]()&&_0x4bfbf3(_0xeb001c[_0x523751(0x32b)][_0x523751(0x233)]);return;}_0x543b7f[_0x523751(0x119)](_0x301d6a);}}return Scene_Item[_0x523751(0xd7)][_0x523751(0xb4)][_0x523751(0x2d3)](this);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x32d)]=function(){const _0x40f094=_0x4a3404;if(this[_0x40f094(0x1c0)]&&this[_0x40f094(0x1c0)]['active'])return TextManager[_0x40f094(0x260)]('up',_0x40f094(0x183));return Scene_Item[_0x40f094(0xd7)][_0x40f094(0x32d)]['call'](this);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x36c)]=function(){const _0x2630bc=_0x4a3404;if(this[_0x2630bc(0x156)]())return VisuMZ['ItemsEquipsCore'][_0x2630bc(0x209)][_0x2630bc(0x10c)][_0x2630bc(0x29c)];else{if(this['_numberWindow']&&this[_0x2630bc(0x1c0)]['active'])return VisuMZ[_0x2630bc(0x36b)]['Settings'][_0x2630bc(0x1c8)][_0x2630bc(0x1dd)];}return Scene_Item[_0x2630bc(0xd7)]['buttonAssistText1'][_0x2630bc(0x2d3)](this);},Scene_ItemCrafting[_0x4a3404(0xd7)]['buttonAssistText2']=function(){const _0x3baefc=_0x4a3404;if(this[_0x3baefc(0x1c0)]&&this['_numberWindow'][_0x3baefc(0x28a)]){if(_0x3baefc(0x24f)!==_0x3baefc(0x24f))_0x324799=_0x1d7c6d(_0x44baeb['$1']);else return VisuMZ[_0x3baefc(0x36b)][_0x3baefc(0x209)][_0x3baefc(0x1c8)][_0x3baefc(0x1be)];}return Scene_Item['prototype'][_0x3baefc(0x165)][_0x3baefc(0x2d3)](this);},Scene_ItemCrafting['prototype'][_0x4a3404(0x118)]=function(){const _0xc436bf=_0x4a3404;return this[_0xc436bf(0x1c0)]&&this[_0xc436bf(0x1c0)]['active']?TextManager['itemCraftingNumberWindowOk']:Scene_Item[_0xc436bf(0xd7)][_0xc436bf(0x118)]['call'](this);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x2e9)]=function(){const _0x68e730=_0x4a3404;Scene_MenuBase[_0x68e730(0xd7)]['createBackground'][_0x68e730(0x2d3)](this),this[_0x68e730(0x334)](this['getBackgroundOpacity']()),this[_0x68e730(0x274)]();},Scene_ItemCrafting[_0x4a3404(0xd7)]['getBackgroundOpacity']=function(){const _0x135e48=_0x4a3404;return VisuMZ['ItemCraftingSys'][_0x135e48(0x209)][_0x135e48(0x1d4)][_0x135e48(0x2fa)];},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x274)]=function(){const _0x3a8c68=_0x4a3404,_0x25304f={'BgFilename1':VisuMZ['ItemCraftingSys']['Settings'][_0x3a8c68(0x1d4)][_0x3a8c68(0xf2)],'BgFilename2':VisuMZ[_0x3a8c68(0x32b)][_0x3a8c68(0x209)][_0x3a8c68(0x1d4)][_0x3a8c68(0xd1)]};_0x25304f&&(_0x25304f[_0x3a8c68(0xf2)]!==''||_0x25304f[_0x3a8c68(0xd1)]!=='')&&(this[_0x3a8c68(0xf1)]=new Sprite(ImageManager[_0x3a8c68(0x35c)](_0x25304f[_0x3a8c68(0xf2)])),this[_0x3a8c68(0x2fd)]=new Sprite(ImageManager[_0x3a8c68(0x2a6)](_0x25304f[_0x3a8c68(0xd1)])),this[_0x3a8c68(0x1bf)](this[_0x3a8c68(0xf1)]),this['addChild'](this[_0x3a8c68(0x2fd)]),this[_0x3a8c68(0xf1)][_0x3a8c68(0xe7)][_0x3a8c68(0x32c)](this[_0x3a8c68(0x1e2)][_0x3a8c68(0xcc)](this,this[_0x3a8c68(0xf1)])),this['_backSprite2']['bitmap'][_0x3a8c68(0x32c)](this[_0x3a8c68(0x1e2)][_0x3a8c68(0xcc)](this,this['_backSprite2'])));},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x1e2)]=function(_0x3499f4){const _0x2eef3e=_0x4a3404;this['scaleSprite'](_0x3499f4),this[_0x2eef3e(0x364)](_0x3499f4);},Scene_ItemCrafting['prototype'][_0x4a3404(0xe4)]=function(){const _0x37ecb2=_0x4a3404;this['_animationPlaying']=!![],this['_animationWait']=0x14,this[_0x37ecb2(0x2e8)][_0x37ecb2(0xae)]=VisuMZ[_0x37ecb2(0x32b)]['Settings'][_0x37ecb2(0x2b1)][_0x37ecb2(0x15a)]||![],this[_0x37ecb2(0x2b0)]();},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x2b0)]=function(){const _0x475cb2=_0x4a3404;this[_0x475cb2(0x2ae)]=new Sprite(),this['addChild'](this[_0x475cb2(0x2ae)]),this[_0x475cb2(0x30d)](),this[_0x475cb2(0x30e)](),this[_0x475cb2(0x326)](),this[_0x475cb2(0x347)](),this[_0x475cb2(0x1d3)](),this[_0x475cb2(0x143)](this[_0x475cb2(0x1a8)]['shift']());},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x30d)]=function(){const _0x2dd42e=_0x4a3404,_0xa6c60=VisuMZ['ItemCraftingSys'][_0x2dd42e(0x312)],_0x3adfd5=this[_0x2dd42e(0x16e)][_0x2dd42e(0x113)];this['_craftPicture']='';if(_0x3adfd5[_0x2dd42e(0x351)](_0xa6c60['craftPicture']))_0x2dd42e(0x346)===_0x2dd42e(0x346)?this['_craftPicture']=String(RegExp['$1']):(_0x3548f7[_0x2dd42e(0x32b)][_0x2dd42e(0x20f)]['call'](this,_0x26a59d),_0x4f4eab['ItemCraftingSys'][_0x2dd42e(0x1d6)](_0x549115));else _0x3adfd5['match'](_0xa6c60['bigPicture'])&&('OOEEA'!==_0x2dd42e(0x288)?this[_0x2dd42e(0x2dd)]=String(RegExp['$1']):this[_0x2dd42e(0x2ce)]());this[_0x2dd42e(0x163)]=new Sprite();if(this[_0x2dd42e(0x2dd)]){if('CsRPL'!==_0x2dd42e(0x2da)){let _0x4e518e=this['textWidth'](this[_0x2dd42e(0x166)])+this[_0x2dd42e(0x28c)]()*0x4;this[_0x2dd42e(0x1cb)]=_0x4e518e+_0x2c6402[_0x2dd42e(0xde)]()*0x2,this[_0x2dd42e(0x2e3)]();if(this[_0x2dd42e(0x1f1)]())return;const _0x1e6d61=_0x13ffb2[_0x2dd42e(0x2f0)]();this[_0x2dd42e(0x12e)][_0x2dd42e(0x1f4)](0x0,0x0,this[_0x2dd42e(0x14c)],this[_0x2dd42e(0x146)],_0x1e6d61);}else this[_0x2dd42e(0x163)][_0x2dd42e(0xe7)]=ImageManager[_0x2dd42e(0x10e)](this[_0x2dd42e(0x2dd)]);}else _0x2dd42e(0x2a5)!==_0x2dd42e(0x2a3)?(this[_0x2dd42e(0x163)][_0x2dd42e(0xe7)]=ImageManager[_0x2dd42e(0x1c9)](_0x2dd42e(0x303)),this[_0x2dd42e(0x163)][_0x2dd42e(0xe7)][_0x2dd42e(0x22d)]=![]):_0x4d1811[_0x2dd42e(0xd7)][_0x2dd42e(0x2ad)][_0x2dd42e(0x2d3)](this,_0x36f35)&&_0x1ff605[_0x2dd42e(0x119)](_0x2fbdc0);this[_0x2dd42e(0x163)][_0x2dd42e(0x1db)]['x']=0.5,this[_0x2dd42e(0x163)][_0x2dd42e(0x1db)]['y']=0.5;if(!this['_craftPicture']){const _0x5bbbec=VisuMZ['ItemCraftingSys']['Settings'][_0x2dd42e(0x2b1)]['Scale']||0x8;this['_iconSprite'][_0x2dd42e(0x100)]['x']=_0x5bbbec,this[_0x2dd42e(0x163)]['scale']['y']=_0x5bbbec;}this[_0x2dd42e(0x2ae)][_0x2dd42e(0x1bf)](this[_0x2dd42e(0x163)]);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x30e)]=function(){const _0xcad674=_0x4a3404;if(this['_craftPicture'])return;const _0x5f24ff=this[_0xcad674(0x16e)],_0x2bdfe0=_0x5f24ff[_0xcad674(0x1f7)],_0x48b4a8=ImageManager[_0xcad674(0xe0)],_0x410663=ImageManager['iconHeight'],_0x392235=_0x2bdfe0%0x10*_0x48b4a8,_0xb5e4ea=Math[_0xcad674(0x1b9)](_0x2bdfe0/0x10)*_0x410663;this['_iconSprite'][_0xcad674(0x24b)](_0x392235,_0xb5e4ea,_0x48b4a8,_0x410663);},Scene_ItemCrafting['prototype'][_0x4a3404(0x326)]=function(){const _0x3f4934=_0x4a3404;this[_0x3f4934(0x2ae)]['x']=Math['round'](Graphics[_0x3f4934(0x1cb)]/0x2);const _0x12cff5=Math[_0x3f4934(0x11b)](ImageManager['iconHeight']*this[_0x3f4934(0x2ae)][_0x3f4934(0x100)]['y']);this[_0x3f4934(0x2ae)]['y']=Math['round']((Graphics[_0x3f4934(0x2c6)]+_0x12cff5)/0x2);},Scene_ItemCrafting['prototype']['setItemSpriteOpacity']=function(){const _0x57f276=_0x4a3404;this[_0x57f276(0xb0)]=VisuMZ['ItemCraftingSys'][_0x57f276(0x209)][_0x57f276(0x2b1)][_0x57f276(0x24a)]||0x1,this[_0x57f276(0x16e)][_0x57f276(0x113)][_0x57f276(0x351)](VisuMZ[_0x57f276(0x32b)][_0x57f276(0x312)]['opacitySpeed'])&&(this[_0x57f276(0xb0)]=Math[_0x57f276(0x2d6)](Number(RegExp['$1']),0x1)),this[_0x57f276(0x2ae)][_0x57f276(0x311)]=0x0;},Scene_ItemCrafting['prototype']['createAnimationIDs']=function(){const _0x628727=_0x4a3404;this[_0x628727(0x1a8)]=[];if(this[_0x628727(0x16e)][_0x628727(0x113)]['match'](VisuMZ[_0x628727(0x32b)]['RegExp'][_0x628727(0xf4)])){if(_0x628727(0x21b)!=='WnYVv')this[_0x628727(0x1a8)]=RegExp['$1'][_0x628727(0x1e6)](',')[_0x628727(0x103)](_0x438b64=>Number(_0x438b64));else{this['returnBackToItemWindow']();return;}}else _0x628727(0x2bc)===_0x628727(0x2bc)?this[_0x628727(0x1a8)]=this[_0x628727(0x1a8)][_0x628727(0x104)](VisuMZ[_0x628727(0x32b)]['Settings'][_0x628727(0x2b1)]['Animations']):(_0x39f233[_0x628727(0xd7)][_0x628727(0xc1)][_0x628727(0x2d3)](this),_0x5b16eb['_craftingCommonEventScene']=_0x3ac9dd);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x143)]=function(_0x52273c){const _0x5a64dc=_0x4a3404,_0x273233=$dataAnimations[_0x52273c];if(!_0x273233)return;const _0x9fe0fc=this['isMVAnimation'](_0x273233);this[_0x5a64dc(0x210)]=new(_0x9fe0fc?Sprite_AnimationMV:Sprite_Animation)();const _0xf5e5c3=[this[_0x5a64dc(0x2ae)]],_0x4773d6=0x0;this[_0x5a64dc(0x210)][_0x5a64dc(0x33a)](_0xf5e5c3,_0x273233,![],_0x4773d6,null),this[_0x5a64dc(0x1bf)](this[_0x5a64dc(0x210)]);},Scene_ItemCrafting['prototype']['isMVAnimation']=function(_0x3c50a4){const _0x5aad29=_0x4a3404;return!!_0x3c50a4[_0x5aad29(0x350)];},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x34c)]=function(){const _0x507137=_0x4a3404;if(!this[_0x507137(0x306)])return;this[_0x507137(0x26a)](),this[_0x507137(0x2e0)]();if(this[_0x507137(0x23a)]()){if(_0x507137(0x221)===_0x507137(0x152)){let _0x1c1b97=_0x37840e/_0x522e71;_0x1c1b97=_0x182d6b[_0x507137(0x294)](_0x1c1b97),_0x37df82=_0x48c315[_0x507137(0x2d6)](_0x31180d,_0x1c1b97);}else this[_0x507137(0x2cf)]();}},Scene_ItemCrafting['prototype'][_0x4a3404(0x26a)]=function(){const _0xbf3e17=_0x4a3404;this[_0xbf3e17(0x2ae)][_0xbf3e17(0x311)]+=this['_itemSpriteOpacitySpeed'];},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x2e0)]=function(){const _0x1a6529=_0x4a3404;if(!this[_0x1a6529(0x210)])return;if(this[_0x1a6529(0x210)][_0x1a6529(0x19d)]())return;this[_0x1a6529(0x203)](),this[_0x1a6529(0x143)](this[_0x1a6529(0x1a8)][_0x1a6529(0x20e)]());},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x203)]=function(){const _0x279fd9=_0x4a3404;if(!this[_0x279fd9(0x210)])return;this[_0x279fd9(0x25a)](this[_0x279fd9(0x210)]),this['_animationSprite'][_0x279fd9(0x30a)](),this[_0x279fd9(0x210)]=undefined;},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0xcd)]=function(){const _0x3f26c2=_0x4a3404;if(!this[_0x3f26c2(0x2ae)])return;this[_0x3f26c2(0x25a)](this['_itemSprite']),this[_0x3f26c2(0x2ae)][_0x3f26c2(0x30a)](),this[_0x3f26c2(0x2ae)]=undefined;},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x23a)]=function(){const _0x155e36=_0x4a3404;if(TouchInput[_0x155e36(0x1f0)]())return!![];if(Input[_0x155e36(0xb3)]('ok'))return!![];if(Input[_0x155e36(0xb3)](_0x155e36(0x33b)))return!![];if(this[_0x155e36(0x2ae)][_0x155e36(0x311)]<0xff)return![];if(this[_0x155e36(0x210)])return![];return this[_0x155e36(0x186)]--<=0x0;},Scene_ItemCrafting['prototype'][_0x4a3404(0x2cf)]=function(){const _0x1e4b9f=_0x4a3404;this['destroyAnimationSprite'](),this[_0x1e4b9f(0xcd)](),this[_0x1e4b9f(0x352)](),TouchInput[_0x1e4b9f(0x362)](),Input[_0x1e4b9f(0x362)]();},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x21c)]=function(){const _0x6ba1ba=_0x4a3404;Scene_Item[_0x6ba1ba(0xd7)]['terminate'][_0x6ba1ba(0x2d3)](this);if($gameSystem[_0x6ba1ba(0x19f)])return;$gameTemp[_0x6ba1ba(0x270)]();},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x316)]=function(){const _0x2f3488=_0x4a3404;if(!SceneManager['isSceneItemCrafting']())return;const _0x3d57f0=VisuMZ[_0x2f3488(0x32b)][_0x2f3488(0x209)][_0x2f3488(0x123)];_0x3d57f0[_0x2f3488(0x228)]&&$gameSwitches[_0x2f3488(0x35b)](_0x3d57f0[_0x2f3488(0x228)],![]);},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x230)]=function(){const _0x46d711=_0x4a3404;if(!SceneManager[_0x46d711(0x1ed)]())return;const _0x372ae0=VisuMZ['ItemCraftingSys'][_0x46d711(0x209)][_0x46d711(0x123)];if(_0x372ae0[_0x46d711(0x228)]){if('zCwFW'===_0x46d711(0x35a)){_0x34fbdf[_0x46d711(0x351)](/CATEGORY: (.*)/i);const _0x21199e=_0x1d9a7a(_0x563aec['$1'])['trim']();this[_0x46d711(0x284)]['push'](_0x21199e),this[_0x46d711(0xfb)]['push'](_0x27f908[0x1]||0x1);}else $gameSwitches[_0x46d711(0x35b)](_0x372ae0[_0x46d711(0x228)],!![]);}},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x178)]=function(){const _0x2d7c1a=_0x4a3404;if(!Imported[_0x2d7c1a(0x187)])return![];const _0x20f3bb=this[_0x2d7c1a(0x16e)]?this[_0x2d7c1a(0x16e)][_0x2d7c1a(0x113)]||'':'',_0x7a383f=VisuMZ[_0x2d7c1a(0x32b)][_0x2d7c1a(0x312)];if(_0x20f3bb[_0x2d7c1a(0x351)](_0x7a383f[_0x2d7c1a(0x269)])&&!$gameSystem[_0x2d7c1a(0x247)](this[_0x2d7c1a(0x16e)])&&this['meetsCraftingCommonEventSwitches'](!![])){if(_0x2d7c1a(0x21e)===_0x2d7c1a(0x21e))return!![];else _0x5dfa4a[_0x2d7c1a(0x32b)][_0x2d7c1a(0x262)]['call'](this,_0x1d1398),_0x5f1986['ItemCraftingSys'][_0x2d7c1a(0x1d6)](_0x30fe52);}else{if(_0x20f3bb[_0x2d7c1a(0x351)](_0x7a383f[_0x2d7c1a(0xc5)])&&this[_0x2d7c1a(0x2d1)](![]))return!![];}return![];},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x2d1)]=function(_0xfc37a5){const _0x47c9de=_0x4a3404,_0x364abd=this[_0x47c9de(0x16e)]?this[_0x47c9de(0x16e)][_0x47c9de(0x113)]:'',_0x582179=VisuMZ['ItemCraftingSys'][_0x47c9de(0x312)],_0xad3054=_0xfc37a5?_0x47c9de(0x2c1):_0x47c9de(0x196);if(_0x364abd[_0x47c9de(0x351)](_0x582179[_0xad3054+'AllSw'])){const _0x2f29f7=RegExp['$1']['split'](',')['map'](_0x1ab07b=>Number(_0x1ab07b));for(const _0x22fbe8 of _0x2f29f7){if($gameSwitches[_0x47c9de(0x128)](_0x22fbe8)===![])return![];}}if(_0x364abd['match'](_0x582179[_0xad3054+_0x47c9de(0x130)])){if(_0x47c9de(0x12c)===_0x47c9de(0x318)){_0x3cd00d['ItemCraftingSys']['Scene_Menu_createCommandWindow'][_0x47c9de(0x2d3)](this);const _0x3476f7=this[_0x47c9de(0x189)];_0x3476f7[_0x47c9de(0x11f)](_0x47c9de(0x197),this[_0x47c9de(0xb7)][_0x47c9de(0xcc)](this));}else{const _0x40f177=RegExp['$1'][_0x47c9de(0x1e6)](',')[_0x47c9de(0x103)](_0x2c2b8c=>Number(_0x2c2b8c));for(const _0x11f3b1 of _0x40f177){if(_0x47c9de(0x1de)!=='MjCRB'){if($gameSwitches[_0x47c9de(0x128)](_0x11f3b1)===!![])return!![];}else this['drawIngredientCategory'](_0x55a5ea,_0x508714,_0x379a26,_0x597a63,_0x12f4e0);}return![];}}return!![];},Scene_ItemCrafting[_0x4a3404(0xd7)][_0x4a3404(0x116)]=function(){const _0x1b6b8a=_0x4a3404,_0x58a2be=this['_item']?this[_0x1b6b8a(0x16e)]['note']:'',_0x3f68bf=VisuMZ[_0x1b6b8a(0x32b)]['RegExp'];let _0x1f3a4a=0x0;if(this['meetsCraftingCommonEventSwitches'](!![])&&_0x58a2be[_0x1b6b8a(0x351)](_0x3f68bf[_0x1b6b8a(0x269)])&&!$gameSystem['hasCraftingEventOccurred'](this[_0x1b6b8a(0x16e)])){if('SZPTi'===_0x1b6b8a(0x365))_0x1f3a4a=Number(RegExp['$1'])||0x1,$gameSystem['registerCraftingEvent'](this['_item']);else return this[_0x1b6b8a(0xba)]&&this[_0x1b6b8a(0xba)][_0x1b6b8a(0x332)]===_0x2248ec;}else this[_0x1b6b8a(0x2d1)](![])&&_0x58a2be[_0x1b6b8a(0x351)](_0x3f68bf[_0x1b6b8a(0xc5)])&&(_0x1f3a4a=Number(RegExp['$1'])||0x1);if(_0x1f3a4a<=0x0){if(_0x1b6b8a(0x308)!==_0x1b6b8a(0xe2)){this[_0x1b6b8a(0x212)]();return;}else return _0x1b6b8a(0x2db)[_0x1b6b8a(0x283)](_0x19b2cf(_0x4b44c8['$1']));}$gameSystem[_0x1b6b8a(0x19f)]=!![],$gameTemp[_0x1b6b8a(0x355)](_0x1f3a4a),SceneManager[_0x1b6b8a(0x215)](Scene_Map);},VisuMZ[_0x4a3404(0x32b)]['Window_MenuCommand_addOriginalCommands']=Window_MenuCommand[_0x4a3404(0xd7)][_0x4a3404(0x28e)],Window_MenuCommand['prototype'][_0x4a3404(0x28e)]=function(){const _0x327aee=_0x4a3404;VisuMZ[_0x327aee(0x32b)]['Window_MenuCommand_addOriginalCommands'][_0x327aee(0x2d3)](this),this[_0x327aee(0x1b7)]();},Window_MenuCommand[_0x4a3404(0xd7)][_0x4a3404(0x1b7)]=function(){const _0x37572f=_0x4a3404;if(!this['addItemCraftingCommandAutomatically']())return;if(!this[_0x37572f(0x1da)]())return;const _0x3e9eaf=TextManager['ItemCraftingMenuCommand'],_0x3e8ed4=this[_0x37572f(0x14b)]();this[_0x37572f(0x2b3)](_0x3e9eaf,_0x37572f(0x197),_0x3e8ed4);},Window_MenuCommand[_0x4a3404(0xd7)][_0x4a3404(0xec)]=function(){const _0x4aa0cd=_0x4a3404;return Imported[_0x4aa0cd(0x26f)]?![]:!![];},Window_MenuCommand[_0x4a3404(0xd7)][_0x4a3404(0x1da)]=function(){const _0x337ba9=_0x4a3404;return $gameSystem[_0x337ba9(0xd9)]();},Window_MenuCommand[_0x4a3404(0xd7)]['isItemCraftingCommandEnabled']=function(){const _0x548452=_0x4a3404;if(DataManager[_0x548452(0x26d)]()['length']<=0x0)return![];return $gameSystem[_0x548452(0x2ff)]();},VisuMZ['ItemCraftingSys'][_0x4a3404(0xc9)]=Window_ItemCategory[_0x4a3404(0xd7)][_0x4a3404(0xf5)],Window_ItemCategory['prototype'][_0x4a3404(0xf5)]=function(){const _0x4e8134=_0x4a3404;if(SceneManager[_0x4e8134(0x1ed)]()){this[_0x4e8134(0x259)]();if(this[_0x4e8134(0x1a5)]['length']<=0x0){if('pgEDa'===_0x4e8134(0x2df))_0x5da0bc[_0x4e8134(0x119)]([_0x3f1c40[_0x2f2e55],_0x2022a6]);else{this[_0x4e8134(0x18d)](),SceneManager[_0x4e8134(0xba)][_0x4e8134(0xd0)]();return;}}this['createUncategorizedItemCategory']();let _0x34baad=this[_0x4e8134(0x1ea)]();if(this['_lastCraftingExt']){const _0x32d5dc=this['findExt'](this[_0x4e8134(0x2f8)]);if(_0x32d5dc>=0x0)_0x34baad=_0x32d5dc;}_0x34baad=_0x34baad>=this[_0x4e8134(0x1a5)][_0x4e8134(0x1dc)]?0x0:_0x34baad,this['select'](_0x34baad);}else VisuMZ['ItemCraftingSys']['Window_ItemCategory_makeCommandList'][_0x4e8134(0x2d3)](this);},Window_ItemCategory[_0x4a3404(0xd7)]['createUncategorizedItemCategory']=function(){const _0x528c13=_0x4a3404,_0x212e98=Window_ItemCategory[_0x528c13(0x295)],_0x564814=DataManager[_0x528c13(0x26d)]()['clone'](),_0x1db9dc=[];for(const _0x144b07 of _0x212e98){if('wXLlq'!==_0x528c13(0xed))this[_0x528c13(0x263)](_0x321b0a,_0x2e782b),![]&&_0x1835b7[_0x528c13(0x159)](_0x51eea7['name']+'\x20x'+_0x55e1c0);else{this[_0x528c13(0xf8)]=_0x144b07[_0x528c13(0x201)];for(const _0x11f2b8 of _0x564814){if(Window_ItemList[_0x528c13(0xd7)][_0x528c13(0x2ad)][_0x528c13(0x2d3)](this,_0x11f2b8)){if(_0x528c13(0x27d)===_0x528c13(0x1ec)){if(!_0x501426['isSceneMap']())return;if(!_0xf004b7[_0x528c13(0x19f)])return;_0xf4081['_craftingCommonEventScene']=_0x3d3ae1,_0x101d90[_0x528c13(0x119)](_0x1ab32b);}else _0x1db9dc[_0x528c13(0x119)](_0x11f2b8);}}}}this[_0x528c13(0xf8)]=null;for(const _0xfff988 of _0x1db9dc){_0x564814[_0x528c13(0x342)](_0xfff988);}_0x564814['length']>0x0&&this['addUncategorizedItemCategory'](),this[_0x528c13(0x353)]=_0x564814;},Window_ItemCategory[_0x4a3404(0xd7)][_0x4a3404(0x18d)]=function(){const _0x63c36c=_0x4a3404,_0xf9c903=VisuMZ['ItemCraftingSys'][_0x63c36c(0x209)]['General'];let _0x1c4343=_0xf9c903[_0x63c36c(0x1b6)]||_0x63c36c(0x1b6),_0x480347=_0xf9c903['NoCategoryIcon']||0xa0;_0x1c4343='\x5cI[%1]%2'[_0x63c36c(0x283)](_0x480347,_0x1c4343),this[_0x63c36c(0x2b3)](_0x1c4343,_0x63c36c(0x17d),!![],_0x63c36c(0x31a));},VisuMZ[_0x4a3404(0x32b)][_0x4a3404(0x188)]=Window_ItemCategory[_0x4a3404(0xd7)][_0x4a3404(0x124)],Window_ItemCategory['prototype'][_0x4a3404(0x124)]=function(_0x5c62ca){const _0x27dd0a=_0x4a3404;if(SceneManager[_0x27dd0a(0x1ed)]()&&!this[_0x27dd0a(0x2e5)](_0x5c62ca))return;VisuMZ[_0x27dd0a(0x32b)][_0x27dd0a(0x188)][_0x27dd0a(0x2d3)](this,_0x5c62ca);},Window_ItemCategory[_0x4a3404(0xd7)]['isItemCraftingCategoryValid']=function(_0x3b7cea){const _0x1cb65b=_0x4a3404,_0x4872ff=DataManager[_0x1cb65b(0x26d)](),_0x27f627=_0x3b7cea[_0x1cb65b(0x201)],_0x498492=_0x3b7cea[_0x1cb65b(0x22a)];this[_0x1cb65b(0xf8)]=_0x27f627;for(const _0x1a74cc of _0x4872ff){if('aTXzK'!=='aTXzK'){if(_0x596e64['ItemCraftingSys'][_0x1cb65b(0x209)][_0x1cb65b(0x272)][_0x1cb65b(0x1a9)])return _0x3f6e8b[_0x1cb65b(0x32b)]['Settings'][_0x1cb65b(0x272)][_0x1cb65b(0x1a9)][_0x1cb65b(0x2d3)](this);const _0x3137a2=this[_0x1cb65b(0x2a8)]()?this[_0x1cb65b(0x245)]():0x0,_0x232ecc=this['mainAreaTop'](),_0x13c959=_0x2573c4['boxWidth']-this[_0x1cb65b(0x245)](),_0x37253f=this[_0x1cb65b(0x16a)](0x1,!![]);return new _0x221733(_0x3137a2,_0x232ecc,_0x13c959,_0x37253f);}else{if(!_0x1a74cc)continue;if(Window_ItemList['prototype'][_0x1cb65b(0x2ad)][_0x1cb65b(0x2d3)](this,_0x1a74cc)){if(_0x1cb65b(0xff)!==_0x1cb65b(0xff)){const _0x4d2a9d=_0x88fa5c(_0x43cb53['$1']),_0x256b0f=_0xfb0076['max'](0x1,_0x51531b(_0x148a37['$2'])),_0x305439=/^\d+$/[_0x1cb65b(0x317)](_0x4d2a9d),_0x37dab8=_0x305439?_0x4d2a9d:this[_0x1cb65b(0x1cf)](_0x4d2a9d);_0x37a6f3[_0x1cb65b(0x1b2)][_0x37dab8]=_0x256b0f,_0x1bdd11=!![];}else return this[_0x1cb65b(0xf8)]=null,!![];}}}return this[_0x1cb65b(0xf8)]=null,![];},VisuMZ[_0x4a3404(0x32b)]['Window_ItemCategory_needsSelection']=Window_ItemCategory[_0x4a3404(0xd7)]['needsSelection'],Window_ItemCategory['prototype'][_0x4a3404(0x2e1)]=function(){const _0xc3789c=_0x4a3404;if(SceneManager['isSceneItemCrafting']())return!![];return VisuMZ[_0xc3789c(0x32b)]['Window_ItemCategory_needsSelection'][_0xc3789c(0x2d3)](this);},VisuMZ['ItemCraftingSys'][_0x4a3404(0x155)]=Window_Selectable[_0x4a3404(0xd7)][_0x4a3404(0xb9)],Window_Selectable[_0x4a3404(0xd7)][_0x4a3404(0xb9)]=function(_0x1ac34d){const _0x5b419c=_0x4a3404;VisuMZ[_0x5b419c(0x32b)][_0x5b419c(0x155)][_0x5b419c(0x2d3)](this,_0x1ac34d),this[_0x5b419c(0x332)]===Window_ItemCategory&&SceneManager['isSceneItemCrafting']()&&_0x1ac34d>=0x0&&(this['_lastCraftingExt']=this['currentExt']()||'');};function Window_ItemCraftingList(){const _0x41181f=_0x4a3404;this[_0x41181f(0xc1)](...arguments);}function _0x430e(_0x509de5,_0x518c5e){const _0x2faafc=_0x2faa();return _0x430e=function(_0x430ed0,_0x5856a0){_0x430ed0=_0x430ed0-0xa3;let _0x5a6230=_0x2faafc[_0x430ed0];return _0x5a6230;},_0x430e(_0x509de5,_0x518c5e);}Window_ItemCraftingList[_0x4a3404(0xd7)]=Object['create'](Window_ItemList[_0x4a3404(0xd7)]),Window_ItemCraftingList['prototype']['constructor']=Window_ItemCraftingList,Window_ItemCraftingList[_0x4a3404(0x24c)]=VisuMZ[_0x4a3404(0x32b)][_0x4a3404(0x209)][_0x4a3404(0x272)][_0x4a3404(0xc4)],Window_ItemCraftingList[_0x4a3404(0x1d7)]=VisuMZ[_0x4a3404(0x32b)][_0x4a3404(0x209)][_0x4a3404(0x2c5)]['MaskItalics'],Window_ItemCraftingList[_0x4a3404(0xd7)][_0x4a3404(0xc1)]=function(_0x5695e8){const _0x5331b1=_0x4a3404;Window_ItemList['prototype']['initialize'][_0x5331b1(0x2d3)](this,_0x5695e8),this[_0x5331b1(0x13e)]();},Window_ItemCraftingList[_0x4a3404(0xd7)][_0x4a3404(0x234)]=function(){return 0x1;},Window_ItemCraftingList[_0x4a3404(0xd7)][_0x4a3404(0x341)]=function(){const _0x13e424=_0x4a3404;return Window_Scrollable[_0x13e424(0xd7)][_0x13e424(0x341)][_0x13e424(0x2d3)](this)*0x3+0x8;},Window_ItemCraftingList[_0x4a3404(0xd7)][_0x4a3404(0xc3)]=function(_0xb95cde){return!![];},Window_ItemCraftingList[_0x4a3404(0xd7)][_0x4a3404(0x305)]=function(){const _0x26c0b2=_0x4a3404;this['_data']=DataManager[_0x26c0b2(0x26d)]()[_0x26c0b2(0xb1)](_0xe12b3d=>this[_0x26c0b2(0x2ad)](_0xe12b3d));const _0x1ca5d2=this[_0x26c0b2(0x34f)][_0x26c0b2(0x103)](_0x3fe5d8=>DataManager['getCraftingIngredients'](_0x3fe5d8)[_0x26c0b2(0x1dc)]);this[_0x26c0b2(0x2e6)]=Math[_0x26c0b2(0x2d6)](..._0x1ca5d2)+0x1;},Window_ItemCraftingList[_0x4a3404(0xd7)][_0x4a3404(0x2ad)]=function(_0x4316d6){const _0x35be52=_0x4a3404;if(this[_0x35be52(0xf8)]===_0x35be52(0x31a)){const _0x594ccf=SceneManager[_0x35be52(0xba)];if(_0x594ccf&&_0x594ccf['_categoryWindow']&&_0x594ccf['_categoryWindow']['_nonCategoryItemCraftingItems'])return _0x594ccf['_categoryWindow'][_0x35be52(0x353)][_0x35be52(0x2ad)](_0x4316d6);}return Window_ItemList[_0x35be52(0xd7)][_0x35be52(0x2ad)][_0x35be52(0x2d3)](this,_0x4316d6);},Window_ItemCraftingList['prototype'][_0x4a3404(0x1c2)]=function(){},Window_ItemCraftingList[_0x4a3404(0xd7)][_0x4a3404(0xee)]=function(_0x260d2a){const _0x3394c7=_0x4a3404,_0x3c150f=this[_0x3394c7(0xa4)](_0x260d2a);if(!_0x3c150f)return;const _0x4a6444=this[_0x3394c7(0x2a9)](_0x260d2a);this[_0x3394c7(0x329)](),this[_0x3394c7(0x15e)](_0x4a6444,0x2),this[_0x3394c7(0x325)](_0x260d2a,_0x3c150f,_0x4a6444),this[_0x3394c7(0x151)](_0x3c150f,_0x4a6444),this['drawCraftingItemName'](_0x3c150f,_0x4a6444),this[_0x3394c7(0x122)](_0x3c150f,_0x4a6444);},Window_ItemCraftingList[_0x4a3404(0xd7)][_0x4a3404(0x15e)]=function(_0x28fe06,_0x3eea06){const _0x71c278=_0x4a3404;_0x3eea06=_0x3eea06||0x1,this[_0x71c278(0x1b4)](![]);const _0x347bb5=ColorManager[_0x71c278(0x2f0)](),_0x7bef83=ColorManager[_0x71c278(0x340)](),_0x2e4ac3=_0x28fe06[_0x71c278(0x1cb)]/0x2,_0x5d36d3=this['lineHeight']();while(_0x3eea06--){this[_0x71c278(0x12e)][_0x71c278(0x286)](_0x28fe06['x'],_0x28fe06['y'],_0x2e4ac3,_0x5d36d3,_0x7bef83,_0x347bb5),this[_0x71c278(0x12e)][_0x71c278(0x286)](_0x28fe06['x']+_0x2e4ac3,_0x28fe06['y'],_0x2e4ac3,_0x5d36d3,_0x347bb5,_0x7bef83);}this[_0x71c278(0x1b4)](!![]);},Window_Base[_0x4a3404(0xd7)][_0x4a3404(0xbb)]=function(_0x2a8d15,_0x370de3){const _0x105425=_0x4a3404;let _0x12c1a3=_0x2a8d15['name'],_0x53b1b4=_0x370de3[_0x105425(0x2c6)]+this[_0x105425(0x28c)]()*0x2,_0x526184=_0x370de3['y'],_0x1cf0cd=_0x370de3[_0x105425(0x1cb)]-_0x53b1b4-this['itemPadding']()-ImageManager[_0x105425(0xe0)];DataManager[_0x105425(0x20c)](_0x2a8d15)&&(_0x105425(0x1d0)==='whYmB'?this[_0x105425(0x241)](this[_0x105425(0x16e)]):(_0x12c1a3=VisuMZ[_0x105425(0x32b)]['maskItemName'](_0x2a8d15),this[_0x105425(0x12e)][_0x105425(0x285)]=Window_ItemCraftingList[_0x105425(0x1d7)])),this[_0x105425(0x111)](_0x12c1a3,_0x53b1b4,_0x526184,_0x1cf0cd,_0x105425(0x18c)),this['contents'][_0x105425(0x285)]=![];},VisuMZ[_0x4a3404(0x32b)][_0x4a3404(0x204)]=function(_0x3f39ac){const _0x63d4ca=_0x4a3404;DataManager[_0x63d4ca(0x370)]&&(_0x3f39ac=DataManager[_0x63d4ca(0x370)](_0x3f39ac));if(_0x3f39ac[_0x63d4ca(0x113)]['match'](VisuMZ[_0x63d4ca(0x32b)]['RegExp']['MaskText']))return String(RegExp['$1']);else{if('KTnyY'==='KTnyY'){const _0x53f2b2=TextManager[_0x63d4ca(0x16b)];return Array(_0x3f39ac[_0x63d4ca(0x190)][_0x63d4ca(0x1dc)]+0x1)[_0x63d4ca(0xef)](_0x53f2b2);}else _0x29b543[_0x63d4ca(0x119)](_0x1fbeeb);}},Window_ItemCraftingList[_0x4a3404(0xd7)]['drawBigItemImage']=function(_0x2dd440,_0x32e45b,_0x26b023){const _0x1dd31c=_0x4a3404,_0x1012ab=VisuMZ[_0x1dd31c(0x32b)][_0x1dd31c(0x312)],_0x59ab9b=_0x32e45b[_0x1dd31c(0x113)];let _0x593b92='';if(_0x59ab9b[_0x1dd31c(0x351)](_0x1012ab[_0x1dd31c(0x314)])){if('owexL'===_0x1dd31c(0x2d4))_0x593b92=String(RegExp['$1']);else return _0x2e4b0a[_0x1dd31c(0xd9)]();}else{if(_0x59ab9b[_0x1dd31c(0x351)](_0x1012ab['bigPicture'])){if(_0x1dd31c(0x2c9)!==_0x1dd31c(0xab))_0x593b92=String(RegExp['$1']);else return _0x59b196[_0x1dd31c(0xd3)](this['_item']);}}if(_0x593b92){const _0x19c70d=ImageManager[_0x1dd31c(0x10e)](_0x593b92);_0x19c70d['addLoadListener'](this[_0x1dd31c(0xb6)][_0x1dd31c(0xcc)](this,_0x2dd440,_0x19c70d));}else{if('SwuEl'!=='wQIEm')this[_0x1dd31c(0xfe)](_0x32e45b,_0x26b023);else{if(this[_0x1dd31c(0xaa)]){const _0x5967ed=_0x5616cf[_0x1dd31c(0x32b)][_0x1dd31c(0x209)][_0x1dd31c(0x123)];this['contents']['textColor']=_0x16e325[_0x1dd31c(0x13d)](_0x5967ed[_0x1dd31c(0xda)]),_0x21e429+=_0x5967ed[_0x1dd31c(0x1ff)];}_0x4dbf93['prototype'][_0x1dd31c(0x111)][_0x1dd31c(0x2d3)](this,_0xa090c4,_0x3632b2,_0x48bf90,_0x3cc494,_0x7f546f);}}},Window_ItemCraftingList['prototype'][_0x4a3404(0xb6)]=function(_0x3287ec,_0x184872){const _0x41caab=_0x4a3404,_0x300a21=this['itemRectWithPadding'](_0x3287ec);let _0x15d040=_0x300a21['x']+this[_0x41caab(0x28c)](),_0x2f3fc3=_0x300a21['y']+0x4,_0x5c676c=_0x300a21[_0x41caab(0x1cb)]-this['itemPadding']()*0x2,_0x3abb68=_0x300a21[_0x41caab(0x2c6)]-0x8,_0x4d0c38=Math[_0x41caab(0x162)](_0x5c676c,_0x3abb68);const _0x375ad3=_0x4d0c38/_0x184872[_0x41caab(0x1cb)],_0x1cc361=_0x4d0c38/_0x184872[_0x41caab(0x2c6)],_0x3550a=Math['min'](_0x375ad3,_0x1cc361,0x1);let _0x22d4c0=Math[_0x41caab(0x11b)](_0x184872[_0x41caab(0x1cb)]*_0x3550a),_0x394e33=Math[_0x41caab(0x11b)](_0x184872[_0x41caab(0x2c6)]*_0x3550a);_0x15d040+=Math['round']((_0x4d0c38-_0x22d4c0)/0x2),_0x2f3fc3+=Math[_0x41caab(0x11b)]((_0x4d0c38-_0x394e33)/0x2);const _0xf0bfaa=_0x184872[_0x41caab(0x1cb)],_0x34d4a1=_0x184872[_0x41caab(0x2c6)];this[_0x41caab(0x12e)]['_context']['imageSmoothingEnabled']=!![],this[_0x41caab(0x12e)][_0x41caab(0x125)](_0x184872,0x0,0x0,_0xf0bfaa,_0x34d4a1,_0x15d040,_0x2f3fc3,_0x22d4c0,_0x394e33),this[_0x41caab(0x12e)]['_context']['imageSmoothingEnabled']=!![];},Window_ItemCraftingList[_0x4a3404(0xd7)][_0x4a3404(0xfe)]=function(_0x57457b,_0x2cae4b){const _0xcffe30=_0x4a3404,_0xce8e50=_0x57457b[_0xcffe30(0x1f7)];let _0x3a1a54=_0x2cae4b['x']+this['itemPadding'](),_0x133c5b=_0x2cae4b['y']+0x4,_0x99c33=_0x2cae4b[_0xcffe30(0x1cb)]-this['itemPadding']()*0x2,_0x5df923=_0x2cae4b[_0xcffe30(0x2c6)]-0x8,_0x437297=Math['min'](_0x99c33,_0x5df923);_0x437297=Math[_0xcffe30(0x1b9)](_0x437297/ImageManager['iconWidth'])*ImageManager[_0xcffe30(0xe0)],_0x133c5b+=(_0x5df923-_0x437297)/0x2;const _0x358610=ImageManager['loadSystem'](_0xcffe30(0x303)),_0x7cce7e=ImageManager[_0xcffe30(0xe0)],_0x2e9a8f=ImageManager['iconHeight'],_0x3a2a2c=_0xce8e50%0x10*_0x7cce7e,_0x660dd2=Math[_0xcffe30(0x1b9)](_0xce8e50/0x10)*_0x2e9a8f;this[_0xcffe30(0x12e)][_0xcffe30(0x1d2)][_0xcffe30(0xd6)]=![],this['contents'][_0xcffe30(0x125)](_0x358610,_0x3a2a2c,_0x660dd2,_0x7cce7e,_0x2e9a8f,_0x3a1a54,_0x133c5b,_0x437297,_0x437297),this[_0xcffe30(0x12e)][_0xcffe30(0x1d2)]['imageSmoothingEnabled']=!![];},Window_ItemCraftingList[_0x4a3404(0xd7)][_0x4a3404(0x151)]=function(_0x24ffc1,_0x1c01e8){const _0xc69d27=_0x4a3404;if(!$gameSystem['isItemCrafted'](_0x24ffc1))return;const _0x11daf9=ImageManager[_0xc69d27(0x22c)];let _0x343f7b=_0x1c01e8['x']+_0x1c01e8[_0xc69d27(0x1cb)]-ImageManager[_0xc69d27(0xe0)],_0x384363=_0x1c01e8['y']+0x2;this[_0xc69d27(0x282)](_0x11daf9,_0x343f7b,_0x384363);},Window_ItemCraftingList[_0x4a3404(0xd7)][_0x4a3404(0x122)]=function(_0x417234,_0x1b834){const _0x3c5f3d=_0x4a3404,_0x4b9494=DataManager[_0x3c5f3d(0x13a)](_0x417234);let _0x960da8=_0x1b834[_0x3c5f3d(0x2c6)]+this[_0x3c5f3d(0x28c)]()*0x2,_0x44e64f=_0x1b834['y']+Math[_0x3c5f3d(0x11b)](this[_0x3c5f3d(0x34a)]()*1.2),_0xf100de=_0x1b834[_0x3c5f3d(0x1cb)]-_0x960da8-this[_0x3c5f3d(0x28c)](),_0x54c613=Math['floor'](_0xf100de/this[_0x3c5f3d(0x2e6)]),_0x5adc18=!![];for(const _0x1684a5 of _0x4b9494){if(!_0x5adc18){let _0x34f8ea=TextManager['itemCraftingIngredientsBridge'],_0x103625=_0x1b834['y']+(_0x1b834['height']-this[_0x3c5f3d(0x34a)]()*1.5);this[_0x3c5f3d(0x111)](_0x34f8ea,_0x960da8,_0x103625,_0x54c613,_0x3c5f3d(0x14f));}_0x960da8+=_0x54c613;const _0x368c3d=_0x1684a5[0x0],_0x2fc9e1=_0x1684a5[0x1],_0x2228d1=_0x368c3d===_0x3c5f3d(0x29a)?$gameParty[_0x3c5f3d(0x29a)]():$gameParty['numItems'](_0x368c3d);if(_0x368c3d===_0x3c5f3d(0x29a)){if(_0x3c5f3d(0x101)!==_0x3c5f3d(0x105))this['drawIngredientGold'](_0x2fc9e1,_0x2228d1,_0x960da8,_0x44e64f,_0x54c613);else return!![];}else typeof _0x368c3d==='string'&&_0x368c3d[_0x3c5f3d(0x351)](/CATEGORY/i)?this['drawIngredientCategory'](_0x368c3d,_0x2fc9e1,_0x960da8,_0x44e64f,_0x54c613):this[_0x3c5f3d(0x226)](_0x368c3d,_0x2fc9e1,_0x2228d1,_0x960da8,_0x44e64f,_0x54c613);this[_0x3c5f3d(0x329)](),_0x5adc18=![];}},Window_ItemCraftingList[_0x4a3404(0xd7)][_0x4a3404(0x349)]=function(_0x3f4b06,_0x39f8a3,_0x5185d2,_0x35fcbb,_0x2b1210){const _0x1c7ee4=_0x4a3404;if(Imported[_0x1c7ee4(0xdf)]){let _0x2a8114=_0x5185d2-Math[_0x1c7ee4(0x11b)](ImageManager[_0x1c7ee4(0xe0)]/0x2),_0x2eb0c7=_0x35fcbb+Math[_0x1c7ee4(0x11b)]((this['lineHeight']()-ImageManager[_0x1c7ee4(0x145)])/0x2);const _0x45bca6=VisuMZ['CoreEngine']?VisuMZ['CoreEngine'][_0x1c7ee4(0x209)]['Gold']['GoldIcon']:0x0;this[_0x1c7ee4(0x282)](_0x45bca6,_0x2a8114,_0x2eb0c7);}else{if(_0x1c7ee4(0x34b)===_0x1c7ee4(0x157))return _0x3fcef7[_0x1c7ee4(0xd7)][_0x1c7ee4(0x11e)][_0x1c7ee4(0x2d3)](this);else{let _0x2876be=_0x5185d2-Math[_0x1c7ee4(0x11b)](_0x2b1210/0x2),_0xbfc5b1=_0x35fcbb+Math[_0x1c7ee4(0x11b)]((this[_0x1c7ee4(0x34a)]()-ImageManager[_0x1c7ee4(0x145)])/0x2);this[_0x1c7ee4(0x302)](ColorManager[_0x1c7ee4(0x1f2)]()),this[_0x1c7ee4(0x102)](),this[_0x1c7ee4(0x111)](TextManager['currencyUnit'],_0x2876be,_0xbfc5b1,_0x2b1210,_0x1c7ee4(0x14f)),this[_0x1c7ee4(0x329)]();}}let _0x3ddb3b=_0x5185d2-Math[_0x1c7ee4(0x11b)](_0x2b1210/0x2),_0x2ed6fa=_0x35fcbb+this[_0x1c7ee4(0x34a)]();const _0xaf06f0=VisuMZ['ItemsEquipsCore'][_0x1c7ee4(0x209)][_0x1c7ee4(0x10c)][_0x1c7ee4(0x1ef)];let _0x5f36ee=_0xaf06f0['format'](_0x3f4b06);if(_0x3f4b06>_0x39f8a3){if(_0x1c7ee4(0x2cb)!==_0x1c7ee4(0x348))this['changeTextColor'](ColorManager['powerDownColor']());else{_0x33e971['isPlaytest']()&&_0x4b4cfe(_0x5f256b[_0x1c7ee4(0x32b)][_0x1c7ee4(0x233)]);return;}}this[_0x1c7ee4(0x12e)]['fontSize']=Window_ItemCraftingList[_0x1c7ee4(0x24c)],this['drawText'](_0x5f36ee,_0x3ddb3b,_0x2ed6fa,_0x2b1210,_0x1c7ee4(0x14f));},Window_ItemCraftingList['prototype'][_0x4a3404(0x273)]=function(_0x17e581,_0x3cd5f3,_0x2bbe85,_0xf263bb,_0x29ef64){const _0x3bcf0a=_0x4a3404,_0x46a717=VisuMZ[_0x3bcf0a(0x32b)][_0x3bcf0a(0x209)][_0x3bcf0a(0x123)];let _0x1648ca=_0x2bbe85-Math[_0x3bcf0a(0x11b)](ImageManager['iconWidth']/0x2),_0x2e9324=_0xf263bb+Math[_0x3bcf0a(0x11b)]((this[_0x3bcf0a(0x34a)]()-ImageManager['iconHeight'])/0x2);this[_0x3bcf0a(0x282)](_0x46a717[_0x3bcf0a(0x17c)],_0x1648ca,_0x2e9324),_0x17e581[_0x3bcf0a(0x351)](/CATEGORY: (.*)/i);const _0xe63eaf=String(RegExp['$1'])['trim']();let _0x4bdf87=_0x2bbe85-Math['round'](_0x29ef64/0x2),_0x3f5946=_0xf263bb;this['contents']['fontSize']=Window_ItemCraftingList[_0x3bcf0a(0x24c)],this[_0x3bcf0a(0x111)](_0xe63eaf,_0x4bdf87,_0x3f5946,_0x29ef64,_0x3bcf0a(0x14f));let _0x20ce02=_0x2bbe85-Math[_0x3bcf0a(0x11b)](_0x29ef64/0x2),_0x181bce=_0xf263bb+this['lineHeight']();const _0x59eebd=VisuMZ[_0x3bcf0a(0x36b)]['Settings']['ItemScene'][_0x3bcf0a(0x1ef)];let _0x3306b0=_0x59eebd['format'](_0x3cd5f3);this['contents']['fontSize']=Window_ItemCraftingList[_0x3bcf0a(0x24c)],this['drawText'](_0x3306b0,_0x20ce02,_0x181bce,_0x29ef64,_0x3bcf0a(0x14f));},Window_ItemCraftingList[_0x4a3404(0xd7)]['drawIngredientItem']=function(_0x3761ec,_0x3c1919,_0x14c754,_0x449a88,_0x18bb35,_0x49cfc8){const _0x11bb80=_0x4a3404;let _0x7c2901=_0x449a88-Math[_0x11bb80(0x11b)](ImageManager['iconWidth']/0x2),_0xcaedc4=_0x18bb35+Math[_0x11bb80(0x11b)]((this['lineHeight']()-ImageManager[_0x11bb80(0x145)])/0x2);this[_0x11bb80(0x282)](_0x3761ec[_0x11bb80(0x1f7)],_0x7c2901,_0xcaedc4);let _0x17a888=_0x449a88-Math[_0x11bb80(0x11b)](_0x49cfc8/0x2),_0x4ab7a5=_0x18bb35+this[_0x11bb80(0x34a)]();const _0x189085=VisuMZ['ItemsEquipsCore'][_0x11bb80(0x209)][_0x11bb80(0x10c)]['ItemQuantityFmt'];let _0x40c410=_0x189085[_0x11bb80(0x283)](_0x11bb80(0x297)[_0x11bb80(0x283)](_0x14c754,_0x3c1919));_0x3c1919>_0x14c754&&this[_0x11bb80(0x302)](ColorManager[_0x11bb80(0x1df)]()),this[_0x11bb80(0x12e)][_0x11bb80(0x1a0)]=Window_ItemCraftingList[_0x11bb80(0x24c)],this[_0x11bb80(0x111)](_0x40c410,_0x17a888,_0x4ab7a5,_0x49cfc8,_0x11bb80(0x14f));},Window_ItemCraftingList[_0x4a3404(0xd7)][_0x4a3404(0x13e)]=function(){const _0x2c8f96=_0x4a3404;if(!VisuMZ[_0x2c8f96(0x32b)]['Settings']['Window'][_0x2c8f96(0x31e)])return;const _0x386c07=new Rectangle(0x0,0x0,Graphics[_0x2c8f96(0xdd)],Window_Base[_0x2c8f96(0xd7)][_0x2c8f96(0x1ae)](0x1));this[_0x2c8f96(0x1a1)]=new Window_ItemCraftingTooltip(_0x386c07),this[_0x2c8f96(0x1bf)](this[_0x2c8f96(0x1a1)]);},Window_ItemCraftingList[_0x4a3404(0xd7)][_0x4a3404(0x21d)]=function(){const _0x2480c9=_0x4a3404;Window_ItemList[_0x2480c9(0xd7)][_0x2480c9(0x21d)][_0x2480c9(0x2d3)](this),this[_0x2480c9(0x29f)]();},Window_ItemCraftingList[_0x4a3404(0xd7)][_0x4a3404(0x29f)]=function(){const _0xe7d64a=_0x4a3404;if(!this['_tooltipWindow'])return;if(this[_0xe7d64a(0x1f9)]()){if('DFHHf'!=='DFHHf')return!!_0x1e06f9['frames'];else this[_0xe7d64a(0xea)]();}else this['_tooltipWindow'][_0xe7d64a(0x322)]('');const _0x3e2a17=new Point(TouchInput['x'],TouchInput['y']),_0x23fe4e=this[_0xe7d64a(0x1aa)]['applyInverse'](_0x3e2a17);this[_0xe7d64a(0x1a1)]['x']=_0x23fe4e['x']-this[_0xe7d64a(0x1a1)][_0xe7d64a(0x1cb)]/0x2,this[_0xe7d64a(0x1a1)]['y']=_0x23fe4e['y']-this[_0xe7d64a(0x1a1)]['height'];},Window_ItemCraftingList[_0x4a3404(0xd7)][_0x4a3404(0x1f9)]=function(){const _0xcac87=_0x4a3404;if(!this[_0xcac87(0x28a)])return![];if(!this['item']())return![];if(!this[_0xcac87(0x231)]())return![];if(this[_0xcac87(0x202)]()!==this[_0xcac87(0x1ea)]())return![];return!![];},Window_ItemCraftingList[_0x4a3404(0xd7)][_0x4a3404(0xea)]=function(){const _0x2e8ec8=_0x4a3404,_0x106714=this[_0x2e8ec8(0x2a9)](this[_0x2e8ec8(0x1ea)]());$gameTemp[_0x2e8ec8(0x298)]=!![];const _0x4d8d55=DataManager[_0x2e8ec8(0x13a)](this[_0x2e8ec8(0x13b)]());$gameTemp[_0x2e8ec8(0x298)]=![];const _0x1c5f8e=new Point(TouchInput['x'],TouchInput['y']),_0x2cc077=this[_0x2e8ec8(0x1aa)][_0x2e8ec8(0xa9)](_0x1c5f8e);let _0xeb118b=_0x106714[_0x2e8ec8(0x2c6)]+this[_0x2e8ec8(0x28c)]()*0x2,_0xb64fdc=_0x106714['y']+this[_0x2e8ec8(0x34a)](),_0x394071=_0x106714[_0x2e8ec8(0x1cb)]-_0xeb118b-this[_0x2e8ec8(0x28c)](),_0xacd1e1=Math[_0x2e8ec8(0x1b9)](_0x394071/this[_0x2e8ec8(0x2e6)]);for(const _0x49da92 of _0x4d8d55){if(_0x2e8ec8(0x242)==='hnQne')this[_0x2e8ec8(0x2a4)]={'items':{},'weapons':{},'armors':{}};else{_0xeb118b+=_0xacd1e1;const _0x549fa9=new Rectangle(_0xeb118b-ImageManager[_0x2e8ec8(0xe0)],0x0,ImageManager[_0x2e8ec8(0xe0)]*0x2,Graphics['boxHeight']);if(_0x549fa9[_0x2e8ec8(0xa3)](_0x2cc077['x'],_0x2cc077['y'])){if(_0x2e8ec8(0x2c0)===_0x2e8ec8(0x120)){if(_0x2ecd54[_0x2e8ec8(0x128)](_0x1ec326)===!![])return!![];}else{let _0x17fdad=_0x49da92[0x0],_0xee16af='';if(_0x17fdad===_0x2e8ec8(0x29a))_0xee16af=TextManager['currencyUnit'];else{if(typeof _0x17fdad===_0x2e8ec8(0x27b)&&_0x17fdad['match'](/CATEGORY/i))_0x17fdad[_0x2e8ec8(0x351)](/CATEGORY: (.*)/i),_0xee16af=String(RegExp['$1'])['trim']();else{if(_0x2e8ec8(0x31b)!==_0x2e8ec8(0x31b)){const _0x5824cd=this[_0x2e8ec8(0x2a9)](_0x26dcb8);let _0x3608dd=_0x5824cd['x']+this[_0x2e8ec8(0x28c)](),_0x1c1e33=_0x5824cd['y']+0x4,_0x2b9ef6=_0x5824cd[_0x2e8ec8(0x1cb)]-this[_0x2e8ec8(0x28c)]()*0x2,_0x492b7a=_0x5824cd[_0x2e8ec8(0x2c6)]-0x8,_0x518619=_0x542955[_0x2e8ec8(0x162)](_0x2b9ef6,_0x492b7a);const _0x213bd0=_0x518619/_0x4d0541[_0x2e8ec8(0x1cb)],_0x44ee62=_0x518619/_0x445892['height'],_0x4099ea=_0xe4b3df[_0x2e8ec8(0x162)](_0x213bd0,_0x44ee62,0x1);let _0xf46b6c=_0x51fbf1[_0x2e8ec8(0x11b)](_0x1ac388[_0x2e8ec8(0x1cb)]*_0x4099ea),_0x5c0eef=_0x2231f0['round'](_0x589cee[_0x2e8ec8(0x2c6)]*_0x4099ea);_0x3608dd+=_0x2f2bb8[_0x2e8ec8(0x11b)]((_0x518619-_0xf46b6c)/0x2),_0x1c1e33+=_0x3272ea[_0x2e8ec8(0x11b)]((_0x518619-_0x5c0eef)/0x2);const _0x5936d7=_0x3087a6[_0x2e8ec8(0x1cb)],_0xd44003=_0x1c8fa4['height'];this[_0x2e8ec8(0x12e)][_0x2e8ec8(0x1d2)][_0x2e8ec8(0xd6)]=!![],this[_0x2e8ec8(0x12e)][_0x2e8ec8(0x125)](_0x915782,0x0,0x0,_0x5936d7,_0xd44003,_0x3608dd,_0x1c1e33,_0xf46b6c,_0x5c0eef),this[_0x2e8ec8(0x12e)][_0x2e8ec8(0x1d2)]['imageSmoothingEnabled']=!![];}else _0xee16af=_0x17fdad['name'];}}this['_tooltipWindow'][_0x2e8ec8(0x322)](_0xee16af['trim']());return;}}}}this[_0x2e8ec8(0x1a1)][_0x2e8ec8(0x322)]('');},Window_ItemCraftingList[_0x4a3404(0xd7)][_0x4a3404(0x208)]=function(){const _0x34848a=_0x4a3404,_0x3c2507=this[_0x34848a(0x13b)]()&&DataManager[_0x34848a(0x20c)](this[_0x34848a(0x13b)]())?null:this[_0x34848a(0x13b)]();this[_0x34848a(0xe5)](_0x3c2507);if(this[_0x34848a(0x2d7)]&&this[_0x34848a(0x2d7)][_0x34848a(0x332)]===Window_ShopStatus){if(_0x34848a(0x149)!==_0x34848a(0x149)){const _0x11276d=_0x2bfa97['$1'][_0x34848a(0x1e6)](',')[_0x34848a(0x103)](_0x3cc044=>_0x3a1534(_0x3cc044));for(const _0x4781d8 of _0x11276d){if(_0x5192aa[_0x34848a(0x128)](_0x4781d8)===![])return![];}}else this[_0x34848a(0x2d7)][_0x34848a(0x175)](_0x3c2507);}};function Window_ItemCraftingTooltip(){const _0x27392b=_0x4a3404;this[_0x27392b(0xc1)](...arguments);}Window_ItemCraftingTooltip['prototype']=Object[_0x4a3404(0x330)](Window_Base[_0x4a3404(0xd7)]),Window_ItemCraftingTooltip['prototype'][_0x4a3404(0x332)]=Window_ItemCraftingTooltip,Window_ItemCraftingTooltip[_0x4a3404(0xc6)]=VisuMZ['ItemCraftingSys'][_0x4a3404(0x209)][_0x4a3404(0x272)]['name'],Window_ItemCraftingTooltip[_0x4a3404(0xd7)][_0x4a3404(0xc1)]=function(_0x4357d6){const _0x42251c=_0x4a3404;Window_Base[_0x42251c(0xd7)]['initialize'][_0x42251c(0x2d3)](this,_0x4357d6),this[_0x42251c(0x144)](this[_0x42251c(0x1f1)]()?0x0:0x2),this[_0x42251c(0x322)]('');},Window_ItemCraftingTooltip['prototype'][_0x4a3404(0x1f1)]=function(){const _0x1a5124=_0x4a3404;return Window_ItemCraftingTooltip[_0x1a5124(0xc6)]!=='';},Window_ItemCraftingTooltip['prototype'][_0x4a3404(0x23d)]=function(){const _0x3a192d=_0x4a3404;Window_ItemCraftingTooltip[_0x3a192d(0xc6)]!==''?_0x3a192d(0x2f4)!==_0x3a192d(0x15d)?this[_0x3a192d(0x2c3)]=ImageManager[_0x3a192d(0x1c9)](Window_ItemCraftingTooltip['tooltipSkin']):(_0x5bb6cd[_0x3a192d(0x1f8)](_0x1e8355,_0x3ad25b),_0x3d7ebe['setMainMenuItemCraftingEnabled'](_0x598959['Enable'])):Window_Base[_0x3a192d(0xd7)][_0x3a192d(0x23d)][_0x3a192d(0x2d3)](this);},Window_ItemCraftingTooltip[_0x4a3404(0xd7)][_0x4a3404(0x322)]=function(_0x20f1f9){const _0xaa2abd=_0x4a3404;this[_0xaa2abd(0x166)]!==_0x20f1f9&&(this[_0xaa2abd(0x166)]=_0x20f1f9,this[_0xaa2abd(0x256)]());},Window_ItemCraftingTooltip[_0x4a3404(0xd7)][_0x4a3404(0x362)]=function(){const _0xe580e9=_0x4a3404;this[_0xe580e9(0x322)]('');},Window_ItemCraftingTooltip['prototype'][_0x4a3404(0x175)]=function(_0x1be49e){const _0x48b7da=_0x4a3404;this['setText'](_0x1be49e?_0x1be49e[_0x48b7da(0x190)]:'');},Window_ItemCraftingTooltip[_0x4a3404(0xd7)][_0x4a3404(0x256)]=function(){const _0x120365=_0x4a3404,_0x19165a=this['baseTextRect']();this[_0x120365(0x12b)](),this['drawText'](this[_0x120365(0x166)],0x0,0x0,this[_0x120365(0x14c)],_0x120365(0x14f));},Window_ItemCraftingTooltip[_0x4a3404(0xd7)][_0x4a3404(0x12b)]=function(){const _0x39b804=_0x4a3404;if(this[_0x39b804(0x166)]==='')_0x39b804(0x2f7)!=='Exrta'?(this[_0x39b804(0x12e)]['clear'](),this['width']=0x0):(_0x4585c0=_0x41a29e,_0x5d13b9=this['getArmorIdWithName'](_0x5009b1));else{let _0x402a93=this[_0x39b804(0x129)](this[_0x39b804(0x166)])+this['itemPadding']()*0x4;this[_0x39b804(0x1cb)]=_0x402a93+$gameSystem[_0x39b804(0xde)]()*0x2,this[_0x39b804(0x2e3)]();if(this['hasCustomWindowSkin']())return;const _0x35c537=ColorManager['dimColor1']();this[_0x39b804(0x12e)]['fillRect'](0x0,0x0,this[_0x39b804(0x14c)],this[_0x39b804(0x146)],_0x35c537);}};function Window_ItemCraftingNumber(){const _0x5c1670=_0x4a3404;this[_0x5c1670(0xc1)](...arguments);}Window_ItemCraftingNumber['prototype']=Object[_0x4a3404(0x330)](Window_ShopNumber[_0x4a3404(0xd7)]),Window_ItemCraftingNumber['prototype']['constructor']=Window_ItemCraftingNumber,Window_ItemCraftingNumber[_0x4a3404(0xd7)][_0x4a3404(0xc1)]=function(_0xd2db66){Window_ShopNumber['prototype']['initialize']['call'](this,_0xd2db66);},Window_ItemCraftingNumber[_0x4a3404(0xd7)][_0x4a3404(0x33a)]=function(_0x246095){const _0x8a823e=_0x4a3404;this[_0x8a823e(0x16e)]=_0x246095,this[_0x8a823e(0x205)]=this[_0x8a823e(0x335)](),this[_0x8a823e(0x339)]=Math[_0x8a823e(0x162)](0x1,this[_0x8a823e(0x205)]),this[_0x8a823e(0x185)](),this[_0x8a823e(0x256)]();},Window_ItemCraftingNumber[_0x4a3404(0xd7)][_0x4a3404(0x335)]=function(){const _0x146510=_0x4a3404;if(DataManager[_0x146510(0x1ac)](this[_0x146510(0x16e)]))return'DQWjK'===_0x146510(0xe8)?_0x4c6dc8[_0x146510(0xd7)][_0x146510(0x114)][_0x146510(0x2d3)](this):$gameParty['calcCraftBatchItemsMax'](this[_0x146510(0x16e)]);const _0x11288f=[],_0x566f11=this[_0x146510(0x16e)],_0xf9e653=DataManager['getCraftingIngredients'](_0x566f11);let _0x1aeaa1=0x0;for(const _0x3ee408 of _0xf9e653){if('WjZGG'===_0x146510(0x195))this[_0x146510(0x2f8)]=this[_0x146510(0x2ed)]()||'';else{if(!_0x3ee408)continue;let _0x4a6a1d=_0x3ee408[0x0];const _0x29586e=_0x3ee408[0x1];_0x4a6a1d===_0x146510(0x29a)?_0x11288f[_0x146510(0x119)](Math[_0x146510(0x1b9)]($gameParty[_0x146510(0x29a)]()/_0x29586e)):(typeof _0x4a6a1d==='string'&&_0x4a6a1d[_0x146510(0x351)](/CATEGORY/i)&&(_0x146510(0x2f9)===_0x146510(0x2f9)?(_0x4a6a1d=SceneManager[_0x146510(0xba)][_0x146510(0x244)][_0x1aeaa1],_0x1aeaa1+=0x1):_0xfbab2=_0x37fc04[_0x146510(0x190)]),_0x11288f[_0x146510(0x119)](Math[_0x146510(0x1b9)]($gameParty[_0x146510(0x289)](_0x4a6a1d)/_0x29586e)));}}if(_0x11288f[_0x146510(0x1dc)]<=0x0)_0x11288f[_0x146510(0x119)](0x0);return _0x11288f[_0x146510(0x119)]($gameParty[_0x146510(0x218)](_0x566f11)-$gameParty[_0x146510(0x289)](_0x566f11)),Math[_0x146510(0x162)](..._0x11288f);},Window_ItemCraftingNumber[_0x4a3404(0xd7)][_0x4a3404(0x256)]=function(){const _0x13112e=_0x4a3404;Window_Selectable[_0x13112e(0xd7)][_0x13112e(0x256)]['call'](this),this[_0x13112e(0x1a4)](),this[_0x13112e(0xb8)](0x0),this[_0x13112e(0x25b)](),this[_0x13112e(0x315)](),this[_0x13112e(0x223)]();},Window_ItemCraftingNumber['prototype'][_0x4a3404(0x1a4)]=function(){const _0x267186=_0x4a3404,_0x12361c=this[_0x267186(0x1c5)][0x4];if(!_0x12361c)return;this['isOkEnabled']()?_0x267186(0x1a2)===_0x267186(0x217)?_0x1ce034[_0x267186(0x1eb)](_0x51a12f[_0x267186(0x32b)][_0x267186(0x209)][_0x267186(0xaf)]):_0x12361c[_0x267186(0x198)](this[_0x267186(0x112)]['bind'](this)):_0x267186(0x2b5)==='hHMgm'?this['drawIngredientItem'](_0x553238,_0x2c0c9f,_0x9e6829,_0x34191c,_0x4f52dd,_0x48fb39):_0x12361c[_0x267186(0x257)]=null;},Window_ItemCraftingNumber[_0x4a3404(0xd7)]['itemNameY']=function(){const _0x1c7d7d=_0x4a3404;return Math['floor'](this['totalPriceY']()+this[_0x1c7d7d(0x34a)]()*0x2);},Window_ItemCraftingNumber[_0x4a3404(0xd7)]['totalPriceY']=function(){const _0x14a68f=_0x4a3404;return Math[_0x14a68f(0x1b9)](this[_0x14a68f(0x146)]-this[_0x14a68f(0x34a)]()*6.5);},Window_ItemCraftingNumber['prototype'][_0x4a3404(0x131)]=function(){const _0x1a9113=_0x4a3404;return Math['floor'](this[_0x1a9113(0xac)]()+this[_0x1a9113(0x34a)]()*0x2);},Window_ItemCraftingNumber[_0x4a3404(0xd7)]['isOkEnabled']=function(){const _0x423998=_0x4a3404;if((this[_0x423998(0x339)]||0x0)<=0x0)return![];return Window_ShopNumber[_0x423998(0xd7)]['isOkEnabled'][_0x423998(0x2d3)](this);},Window_ItemCraftingNumber[_0x4a3404(0xd7)][_0x4a3404(0x1fb)]=function(){return this['isOkEnabled']();},Window_ItemCraftingNumber[_0x4a3404(0xd7)]['drawTotalPrice']=function(){const _0x1cc2fd=_0x4a3404,_0x4c351b=DataManager[_0x1cc2fd(0x13a)](this[_0x1cc2fd(0x16e)]);let _0x22ea77=this[_0x1cc2fd(0xd5)]();_0x22ea77-=this[_0x1cc2fd(0x34a)]()*_0x4c351b[_0x1cc2fd(0x1dc)],this[_0x1cc2fd(0x23e)]=0x0,this[_0x1cc2fd(0x26b)](_0x22ea77);for(const _0x14f736 of _0x4c351b){if(_0x1cc2fd(0x16c)!==_0x1cc2fd(0x16c)){if(!_0x498c45[_0x1cc2fd(0x366)])return![];return this['getCraftBatchItems'](_0x279b64)!==null;}else{_0x22ea77+=this[_0x1cc2fd(0x34a)]();if(!_0x14f736)continue;this['drawIngredients'](_0x14f736,_0x22ea77);}};},Window_ItemCraftingNumber['prototype'][_0x4a3404(0x26b)]=function(_0x17d598){const _0x4b9cd1=_0x4a3404,_0x2ab839=this[_0x4b9cd1(0x28c)]();let _0x3dcf02=_0x2ab839*0x2;const _0x8df0e6=this[_0x4b9cd1(0x14c)]-_0x3dcf02-_0x2ab839*0x3,_0x291107=_0x3dcf02+Math['ceil'](_0x8df0e6/0x3),_0x4d5211=Math[_0x4b9cd1(0x1b9)](_0x8df0e6*0x2/0x3/0x3),_0x3d349c=Math['max'](this[_0x4b9cd1(0x129)]('\x20+\x20'),this[_0x4b9cd1(0x129)](_0x4b9cd1(0x27f)));this[_0x4b9cd1(0x329)](),this['changeTextColor'](ColorManager[_0x4b9cd1(0x1f2)]());const _0x389c40=['owned',_0x4b9cd1(0x20e),_0x4b9cd1(0x229)];for(let _0x186f19=0x0;_0x186f19<0x3;_0x186f19++){const _0x16024b=_0x389c40[_0x186f19],_0x475ae2=TextManager['ItemCraftingNumberWindow'][_0x16024b];this[_0x4b9cd1(0x111)](_0x475ae2,_0x291107+_0x4d5211*_0x186f19+_0x3d349c,_0x17d598,_0x4d5211-_0x3d349c,_0x4b9cd1(0x14f));}},Window_ItemCraftingNumber[_0x4a3404(0xd7)]['drawMathMarks']=function(_0x10cda1,_0x400fed){const _0x5417bd=_0x4a3404,_0x153f02=this[_0x5417bd(0x28c)]();let _0x5cdb27=_0x153f02*0x2;const _0xc58c7d=this['innerWidth']-_0x5cdb27-_0x153f02*0x3,_0x1a9311=_0x5cdb27+Math[_0x5417bd(0x294)](_0xc58c7d/0x3),_0x4b95e7=Math[_0x5417bd(0x1b9)](_0xc58c7d*0x2/0x3/0x3);_0x400fed=_0x5417bd(0x280)[_0x5417bd(0x283)](_0x400fed),this[_0x5417bd(0x111)](_0x400fed,_0x1a9311+_0x4b95e7*0x1,_0x10cda1,_0x4b95e7,_0x5417bd(0x18c)),this[_0x5417bd(0x111)]('\x20=',_0x1a9311+_0x4b95e7*0x2,_0x10cda1,_0x4b95e7,_0x5417bd(0x18c));},Window_ItemCraftingNumber[_0x4a3404(0xd7)][_0x4a3404(0x180)]=function(_0x593b2e,_0x4d7474){const _0xd1ece7=_0x4a3404;let _0x36989a=_0x593b2e[0x0];this[_0xd1ece7(0x329)](),this[_0xd1ece7(0x1fd)](_0x4d7474,'-'),_0x36989a==='gold'?_0xd1ece7(0x2f6)===_0xd1ece7(0x2f6)?this[_0xd1ece7(0x300)](_0x593b2e,_0x4d7474,!![]):this[_0xd1ece7(0x232)]['setBackgroundType'](_0x3ef2f2[_0xd1ece7(0x15c)]):this[_0xd1ece7(0x277)](_0x593b2e,_0x4d7474,!![],![]);},Window_ItemCraftingNumber[_0x4a3404(0xd7)][_0x4a3404(0x223)]=function(){const _0x368e55=_0x4a3404,_0x5d21b0=[this[_0x368e55(0x16e)],0x1],_0x1e31a1=this['itemNameY'](),_0x137f4b=DataManager[_0x368e55(0x20c)](this['_item']);this['drawItemIngredient'](_0x5d21b0,_0x1e31a1,![],_0x137f4b),this[_0x368e55(0x1fd)](_0x1e31a1,'+');},Window_ItemCraftingNumber[_0x4a3404(0xd7)][_0x4a3404(0x359)]=function(){return!![];},Window_ItemCraftingNumber['prototype'][_0x4a3404(0x18f)]=function(){return![];},Window_ItemCraftingNumber[_0x4a3404(0xd7)][_0x4a3404(0x300)]=function(_0x4b01ae,_0x1adc4e,_0x109f12){const _0x4aaa90=_0x4a3404,_0xfc7a27=this[_0x4aaa90(0x28c)]();let _0x47dece=_0xfc7a27*0x2;const _0x44f037=this['innerWidth']-_0x47dece-_0xfc7a27*0x3,_0x433e2a=_0x47dece+Math[_0x4aaa90(0x294)](_0x44f037/0x3),_0x2cac19=Math[_0x4aaa90(0x1b9)](_0x44f037*0x2/0x3/0x3),_0x53a567=Math[_0x4aaa90(0x2d6)](this['textWidth']('\x20+\x20'),this[_0x4aaa90(0x129)](_0x4aaa90(0x27f))),_0x1d36fa=_0x4b01ae[0x0],_0x421458=_0x4b01ae[0x1],_0x9c9b61=_0x421458*this[_0x4aaa90(0x339)],_0x565fd4=VisuMZ['CoreEngine']?VisuMZ[_0x4aaa90(0x33f)][_0x4aaa90(0x209)][_0x4aaa90(0x2dc)][_0x4aaa90(0x2ef)]:0x0;if(_0x565fd4>0x0){if(_0x4aaa90(0x110)!==_0x4aaa90(0x110)){if(this[_0x4aaa90(0x121)]===_0x43201e)this[_0x4aaa90(0x19b)]();this[_0x4aaa90(0x121)][_0x4aaa90(0x2fe)]=_0x2299b7;}else{const _0x4bd319=_0x1adc4e+(this[_0x4aaa90(0x34a)]()-ImageManager[_0x4aaa90(0x145)])/0x2;this[_0x4aaa90(0x282)](_0x565fd4,_0x47dece,_0x4bd319);const _0x5c3b00=ImageManager[_0x4aaa90(0xe0)]+0x4;_0x47dece+=_0x5c3b00;}}this[_0x4aaa90(0x302)](ColorManager['systemColor']()),this[_0x4aaa90(0x111)](TextManager[_0x4aaa90(0x2a2)],_0x47dece,_0x1adc4e,_0x2cac19,_0x4aaa90(0x18c));const _0x48f25a=$gameParty['gold']();this[_0x4aaa90(0x191)](_0x48f25a,TextManager[_0x4aaa90(0x2a2)],_0x433e2a,_0x1adc4e,_0x2cac19);const _0x166273=_0x433e2a+_0x2cac19*0x1+_0x53a567,_0x52b4ab=_0x2cac19-_0x53a567;this['drawCurrencyValue'](_0x9c9b61,TextManager[_0x4aaa90(0x2a2)],_0x166273,_0x1adc4e,_0x52b4ab);const _0x24bb9c=_0x433e2a+_0x2cac19*0x2+_0x53a567,_0x3dbb5e=_0x2cac19-_0x53a567,_0x5aa700=Math[_0x4aaa90(0x162)](_0x48f25a+_0x9c9b61*(_0x109f12?-0x1:0x1),$gameParty['maxGold']());this[_0x4aaa90(0x191)](_0x5aa700,TextManager[_0x4aaa90(0x2a2)],_0x24bb9c,_0x1adc4e,_0x3dbb5e);},Window_ItemCraftingNumber['prototype'][_0x4a3404(0x277)]=function(_0xa66fbd,_0x388a74,_0x368c2c,_0x1c18f9){const _0x3080dd=_0x4a3404,_0x31c121=this[_0x3080dd(0x28c)]();let _0x228fdd=_0x31c121*0x2;const _0x194fc9=this['innerWidth']-_0x228fdd-_0x31c121*0x3,_0x584bdb=_0x228fdd+Math[_0x3080dd(0x294)](_0x194fc9/0x3),_0x515c2c=Math['floor'](_0x194fc9*0x2/0x3/0x3),_0x126bbf=Math[_0x3080dd(0x2d6)](this[_0x3080dd(0x129)](_0x3080dd(0x324)),this[_0x3080dd(0x129)]('\x20=\x20'));let _0xecdd08=_0xa66fbd[0x0];typeof _0xecdd08===_0x3080dd(0x27b)&&_0xecdd08[_0x3080dd(0x351)](/CATEGORY/i)&&('EVcLZ'!==_0x3080dd(0x12d)?(this['_itemSprite']=new _0x4d88e2(),this['addChild'](this[_0x3080dd(0x2ae)]),this[_0x3080dd(0x30d)](),this['setItemSpriteFrame'](),this['setItemSpritePosition'](),this['setItemSpriteOpacity'](),this[_0x3080dd(0x1d3)](),this['createAnimation'](this['_animationIDs'][_0x3080dd(0x20e)]())):(_0xecdd08=SceneManager['_scene'][_0x3080dd(0x244)][this[_0x3080dd(0x23e)]],this[_0x3080dd(0x23e)]+=0x1));const _0x36f258=_0xa66fbd[0x1],_0x22f1b9=_0x36f258*this[_0x3080dd(0x339)];let _0x59b12d=_0xecdd08[_0x3080dd(0x1f7)];const _0x1b72a5=_0x59b12d>0x0?ImageManager[_0x3080dd(0xe0)]+0x4:0x0;if(_0x1c18f9){const _0x22e0fb=new Rectangle(_0x228fdd,_0x388a74,_0x194fc9,this[_0x3080dd(0x34a)]());this[_0x3080dd(0xbb)](_0xecdd08,_0x22e0fb),this[_0x3080dd(0x282)](_0xecdd08[_0x3080dd(0x1f7)],_0x22e0fb['x'],_0x22e0fb['y']);}else _0x3080dd(0x1e4)!==_0x3080dd(0x1e4)?(this[_0x3080dd(0x16e)]=_0x5373ca,this[_0x3080dd(0x12e)][_0x3080dd(0x362)](),this[_0x3080dd(0x2d8)]['clear'](),this['drawCraftBatchContents'](_0x14bbbf)):this[_0x3080dd(0x1b8)](_0xecdd08,_0x228fdd,_0x388a74,_0x194fc9);const _0x5f2bbd=_0x584bdb+_0x515c2c*0x0,_0x23c872=_0x515c2c-_0x1b72a5,_0xd81f03=$gameParty[_0x3080dd(0x289)](_0xecdd08);this['drawText'](_0xd81f03,_0x5f2bbd,_0x388a74,_0x23c872,_0x3080dd(0x292)),this[_0x3080dd(0x282)](_0x59b12d,_0x5f2bbd+_0x23c872+0x4,_0x388a74);const _0x5d015b=_0x584bdb+_0x515c2c*0x1+_0x126bbf,_0x321d09=_0x515c2c-_0x126bbf-_0x1b72a5;this['drawText'](_0x22f1b9,_0x5d015b,_0x388a74,_0x321d09,_0x3080dd(0x292)),this[_0x3080dd(0x282)](_0x59b12d,_0x5d015b+_0x321d09+0x4,_0x388a74);const _0x1e2c0b=_0x584bdb+_0x515c2c*0x2+_0x126bbf,_0x1c3fe8=_0x515c2c-_0x126bbf-_0x1b72a5,_0x3df6f8=_0xd81f03+_0x22f1b9*(_0x368c2c?-0x1:0x1);this[_0x3080dd(0x111)](_0x3df6f8,_0x1e2c0b,_0x388a74,_0x1c3fe8,'right'),this[_0x3080dd(0x282)](_0x59b12d,_0x1e2c0b+_0x1c3fe8+0x4,_0x388a74);},Window_ItemCraftingNumber[_0x4a3404(0xd7)][_0x4a3404(0x164)]=function(){const _0x337d43=_0x4a3404,_0x5938ef=this[_0x337d43(0x28c)]();let _0x2c6c01=_0x5938ef*0x2;const _0x40e882=this[_0x337d43(0x14c)]-_0x2c6c01-_0x5938ef*0x3,_0x2132de=_0x2c6c01+Math[_0x337d43(0x294)](_0x40e882/0x3),_0xa18310=this[_0x337d43(0xac)](),_0xc35608=Math[_0x337d43(0x1b9)](_0x40e882*0x2/0x3/0x3),_0x3d76ac=Math[_0x337d43(0x2d6)](this[_0x337d43(0x129)](_0x337d43(0x324)),this[_0x337d43(0x129)](_0x337d43(0x27f))),_0x154a62=this[_0x337d43(0x16e)]?.[_0x337d43(0x1f7)]>0x0?ImageManager[_0x337d43(0xe0)]:0x0,_0x838f06=this['cursorWidth'](),_0x323857=new Rectangle(Math[_0x337d43(0x1b9)](_0x2132de+_0xc35608*0x2-this[_0x337d43(0x10a)]()-_0x154a62+this[_0x337d43(0x28c)]()/0x2-0x2),_0xa18310,this[_0x337d43(0x10a)](),this[_0x337d43(0x34a)]());return _0x323857;};function Window_ItemCraftingIngredient(){const _0x56d714=_0x4a3404;this[_0x56d714(0xc1)](...arguments);}Window_ItemCraftingIngredient[_0x4a3404(0xd7)]=Object[_0x4a3404(0x330)](Window_ItemList['prototype']),Window_ItemCraftingIngredient[_0x4a3404(0xd7)]['constructor']=Window_ItemCraftingIngredient,Window_ItemCraftingIngredient[_0x4a3404(0xd7)][_0x4a3404(0xc1)]=function(_0x41194f){const _0xf73ecb=_0x4a3404;Window_Selectable[_0xf73ecb(0xd7)]['initialize']['call'](this,_0x41194f),this[_0xf73ecb(0x367)]=0x0;},Window_ItemCraftingIngredient[_0x4a3404(0xd7)][_0x4a3404(0x219)]=function(){return![];},Window_ItemCraftingIngredient[_0x4a3404(0xd7)]['setup']=function(_0x3daac4,_0x973d11){const _0xcc8d83=_0x4a3404;this[_0xcc8d83(0xf8)]=_0x3daac4,this['_amount']=_0x973d11||0x1,this[_0xcc8d83(0x256)](),this[_0xcc8d83(0x2eb)](0x0,0x0),this[_0xcc8d83(0x238)](),this[_0xcc8d83(0x10d)](0x0);},Window_ItemCraftingIngredient['prototype']['makeItemList']=function(){const _0x3ee30e=_0x4a3404;this[_0x3ee30e(0x34f)]=$gameParty[_0x3ee30e(0x1af)]()[_0x3ee30e(0xb1)](_0x55cf81=>this[_0x3ee30e(0x2ad)](_0x55cf81));},Window_ItemCraftingIngredient[_0x4a3404(0xd7)]['includes']=function(_0xed1909){const _0x39aae7=_0x4a3404;if(!_0xed1909)return![];if(_0xed1909===SceneManager[_0x39aae7(0xba)][_0x39aae7(0x16e)])return![];return _0xed1909[_0x39aae7(0x172)]['includes'](this[_0x39aae7(0xf8)][_0x39aae7(0x1d1)]()[_0x39aae7(0x1cd)]());},Window_ItemCraftingIngredient[_0x4a3404(0xd7)][_0x4a3404(0xc3)]=function(_0x33b55d){const _0x1f134f=_0x4a3404;if(!_0x33b55d)return![];if(this[_0x1f134f(0x107)]()['includes'](_0x33b55d))return![];return $gameParty['numItems'](_0x33b55d)>=this['_amount'];},Window_ItemCraftingIngredient['prototype'][_0x4a3404(0x107)]=function(){const _0x30b3b3=_0x4a3404,_0x3035b7=[],_0x26653d=DataManager[_0x30b3b3(0x13a)](SceneManager[_0x30b3b3(0xba)][_0x30b3b3(0x16e)]);for(const _0x8aae04 of _0x26653d){if(_0x30b3b3(0x193)===_0x30b3b3(0x193)){if(!_0x8aae04)continue;const _0x31f941=_0x8aae04[0x0];(DataManager['isItem'](_0x31f941)||DataManager[_0x30b3b3(0x237)](_0x31f941)||DataManager[_0x30b3b3(0xfd)](_0x31f941))&&(_0x30b3b3(0x27c)===_0x30b3b3(0x18e)?(this[_0x30b3b3(0xb0)]=_0x582077['ItemCraftingSys']['Settings'][_0x30b3b3(0x2b1)][_0x30b3b3(0x24a)]||0x1,this[_0x30b3b3(0x16e)][_0x30b3b3(0x113)][_0x30b3b3(0x351)](_0xbb41a5['ItemCraftingSys']['RegExp']['opacitySpeed'])&&(this[_0x30b3b3(0xb0)]=_0x4e3a4e[_0x30b3b3(0x2d6)](_0x3c0ddb(_0x45eb1a['$1']),0x1)),this[_0x30b3b3(0x2ae)][_0x30b3b3(0x311)]=0x0):_0x3035b7[_0x30b3b3(0x119)](_0x31f941));}else{if(this['_category']===_0x30b3b3(0x31a)){const _0x1b393a=_0x25ccf5[_0x30b3b3(0xba)];if(_0x1b393a&&_0x1b393a[_0x30b3b3(0x319)]&&_0x1b393a[_0x30b3b3(0x319)][_0x30b3b3(0x353)])return _0x1b393a['_categoryWindow'][_0x30b3b3(0x353)]['includes'](_0x22d501);}return _0x3b0cd3['prototype']['includes']['call'](this,_0x2198f5);}}return _0x3035b7[_0x30b3b3(0x104)](SceneManager['_scene']['_ingredientsList']);},Window_ItemCraftingIngredient[_0x4a3404(0xd7)][_0x4a3404(0x1b8)]=function(_0x4fe0c5,_0x5d7913,_0x72da93,_0x3e929d){const _0x5eb34d=_0x4a3404;if(_0x4fe0c5&&this[_0x5eb34d(0x107)]()[_0x5eb34d(0x2ad)](_0x4fe0c5)){if(_0x5eb34d(0x18b)===_0x5eb34d(0x32f))return _0x1aacfe[_0x5eb34d(0x260)]('up',_0x5eb34d(0x183));else this[_0x5eb34d(0xaa)]=!![];}Window_ItemList[_0x5eb34d(0xd7)][_0x5eb34d(0x1b8)]['call'](this,_0x4fe0c5,_0x5d7913,_0x72da93,_0x3e929d),this[_0x5eb34d(0xaa)]=![];},Window_ItemCraftingIngredient[_0x4a3404(0xd7)][_0x4a3404(0x111)]=function(_0x805775,_0x478156,_0x43cf7f,_0x30616c,_0x42a6ab){const _0x5c4387=_0x4a3404;if(this[_0x5c4387(0xaa)]){if('aOqsw'===_0x5c4387(0xad)){this[_0x5c4387(0x259)]();if(this[_0x5c4387(0x1a5)][_0x5c4387(0x1dc)]<=0x0){this[_0x5c4387(0x18d)](),_0x403aa9[_0x5c4387(0xba)][_0x5c4387(0xd0)]();return;}this[_0x5c4387(0x2de)]();let _0x25db20=this[_0x5c4387(0x1ea)]();if(this[_0x5c4387(0x2f8)]){const _0x3ca50f=this[_0x5c4387(0x134)](this[_0x5c4387(0x2f8)]);if(_0x3ca50f>=0x0)_0x25db20=_0x3ca50f;}_0x25db20=_0x25db20>=this['_list'][_0x5c4387(0x1dc)]?0x0:_0x25db20,this['select'](_0x25db20);}else{const _0x4d6f8f=VisuMZ[_0x5c4387(0x32b)][_0x5c4387(0x209)][_0x5c4387(0x123)];this[_0x5c4387(0x12e)][_0x5c4387(0x20d)]=ColorManager['getColor'](_0x4d6f8f['SelectedColor']),_0x805775+=_0x4d6f8f[_0x5c4387(0x1ff)];}}Window_Base[_0x5c4387(0xd7)][_0x5c4387(0x111)][_0x5c4387(0x2d3)](this,_0x805775,_0x478156,_0x43cf7f,_0x30616c,_0x42a6ab);},VisuMZ[_0x4a3404(0x32b)][_0x4a3404(0x246)]=Window_ShopStatus[_0x4a3404(0xd7)][_0x4a3404(0x256)],Window_ShopStatus[_0x4a3404(0xd7)][_0x4a3404(0x256)]=function(){const _0x2889e0=_0x4a3404;this[_0x2889e0(0x109)](this[_0x2889e0(0x16e)])?this[_0x2889e0(0x241)](this[_0x2889e0(0x16e)]):VisuMZ[_0x2889e0(0x32b)][_0x2889e0(0x246)]['call'](this);},VisuMZ[_0x4a3404(0x32b)][_0x4a3404(0x337)]=Window_ShopStatus[_0x4a3404(0xd7)][_0x4a3404(0x175)],Window_ShopStatus[_0x4a3404(0xd7)][_0x4a3404(0x175)]=function(_0x4739ab){const _0x5ae1a4=_0x4a3404;if(this[_0x5ae1a4(0x109)](_0x4739ab)){if(_0x5ae1a4(0xca)!=='QusKk')return _0x264089=_0x13d072(_0x27b659),_0x2d0eae[_0x5ae1a4(0x351)](/#(.*)/i)?_0x5ae1a4(0x2db)[_0x5ae1a4(0x283)](_0x2e03fa(_0x4f2df5['$1'])):this[_0x5ae1a4(0x20d)](_0x15614e(_0x644ddc));else this['setItemForCraftBatchContents'](_0x4739ab);}else'TXMzQ'===_0x5ae1a4(0x214)?(this[_0x5ae1a4(0x1a8)]=[],this[_0x5ae1a4(0x16e)][_0x5ae1a4(0x113)][_0x5ae1a4(0x351)](_0x51fd9e[_0x5ae1a4(0x32b)]['RegExp']['animationIDs'])?this['_animationIDs']=_0x4f4077['$1'][_0x5ae1a4(0x1e6)](',')[_0x5ae1a4(0x103)](_0x2f2dcf=>_0x18c375(_0x2f2dcf)):this[_0x5ae1a4(0x1a8)]=this[_0x5ae1a4(0x1a8)][_0x5ae1a4(0x104)](_0x348203['ItemCraftingSys'][_0x5ae1a4(0x209)][_0x5ae1a4(0x2b1)][_0x5ae1a4(0xb2)])):VisuMZ[_0x5ae1a4(0x32b)][_0x5ae1a4(0x337)]['call'](this,_0x4739ab);},Window_ShopStatus['prototype']['shouldDrawCraftBatchContents']=function(_0x47ef61){const _0x4d892b=_0x4a3404;if(!_0x47ef61)return![];if(!SceneManager[_0x4d892b(0x1ed)]())return![];if(!Window_ShopStatus['BATCH_CONTENTS'][_0x4d892b(0xb5)])return![];return DataManager[_0x4d892b(0x1ac)](_0x47ef61);},Window_ShopStatus[_0x4a3404(0xd7)][_0x4a3404(0x241)]=function(_0x1d0797){const _0x9dbe47=_0x4a3404;this['_item']=_0x1d0797,this[_0x9dbe47(0x12e)]['clear'](),this[_0x9dbe47(0x2d8)][_0x9dbe47(0x362)](),this['drawCraftBatchContents'](_0x1d0797);},Window_ShopStatus[_0x4a3404(0xd7)][_0x4a3404(0x1f5)]=function(_0x5c6535){const _0x4c3cf3=_0x4a3404;let _0x3f5556=this[_0x4c3cf3(0x17b)]();_0x3f5556=this[_0x4c3cf3(0x211)](_0x3f5556,_0x5c6535),this[_0x4c3cf3(0x14d)](_0x3f5556);},Window_ShopStatus[_0x4a3404(0xd7)]['drawCraftBatchContentsList']=function(_0x329b9d,_0x556f8c){const _0x7b5953=_0x4a3404,_0x4f2191=DataManager[_0x7b5953(0x19e)](_0x556f8c),_0x4cfe7e=['items',_0x7b5953(0xe6),_0x7b5953(0x1b2)];for(const _0x1a9a09 of _0x4cfe7e){if(_0x7b5953(0xbd)!==_0x7b5953(0xbd))return _0x402347[_0x7b5953(0xd7)][_0x7b5953(0x1fa)][_0x7b5953(0x2d3)](this);else{const _0x2638d2=_0x4f2191[_0x1a9a09];for(const _0x3b39ca in _0x2638d2){const _0xf6b8c1=Number(_0x3b39ca),_0x4da0d0=_0x2638d2[_0x3b39ca]||0x0;let _0xa4ecc8=null;if(_0x1a9a09==='items')_0xa4ecc8=$dataItems[_0xf6b8c1];if(_0x1a9a09===_0x7b5953(0xe6))_0xa4ecc8=$dataWeapons[_0xf6b8c1];if(_0x1a9a09==='armors')_0xa4ecc8=$dataArmors[_0xf6b8c1];if(DataManager[_0x7b5953(0x1bd)](_0xa4ecc8))continue;_0xa4ecc8&&(_0x7b5953(0x227)===_0x7b5953(0x371)?(_0x51ef9f[_0x7b5953(0xd7)][_0x7b5953(0x330)][_0x7b5953(0x2d3)](this),this[_0x7b5953(0x35d)](),this[_0x7b5953(0x1ba)](),this['createIngredientSelectionTitle'](),this['createIngredientSelectionList'](),this[_0x7b5953(0x304)]()&&this[_0x7b5953(0x264)](),this[_0x7b5953(0x22b)](),this['resetCraftingSwitches']()):(this['resetFontSettings'](),this[_0x7b5953(0xe3)](_0x329b9d,_0xa4ecc8,_0x4da0d0),_0x329b9d+=this[_0x7b5953(0x34a)]()));}}}return _0x329b9d;};