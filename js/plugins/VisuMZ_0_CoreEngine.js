//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.71;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.71] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
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
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
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
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
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
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
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
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
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
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
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
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
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
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
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
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
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
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
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
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
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
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
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
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
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
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
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
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
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
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
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
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

function _0x5864(){const _0x19f645=['ASTERISK','Scene_Name_onInputOk','EXCLAMATION','ItemHeight','VisuMZ_2_BattleSystemPTB','InputRect','Window_NameInput_processHandling','itemRect','isTpb','enable','gradientFillRect','ExportAllTroopText','Bitmap_resize','SideButtons','isNwjs','SmartEventCollisionPriority','offsetX','_list','_fauxAnimationQueue','HAFNA','FUNC','ParamMax','PositionY','CustomParam','ActorRect','xparamRate','gXFNn','Bjjgn','Armor-%1-%2','getLastPluginCommandInterpreter','viewport','CLEAR','CoreEngine','buttonAssistOffset2','594hYGMOM','_makeFontNameText','initCoreEasing','830070tmbqBm','GroupDigits','animationNextDelay','DummyBgType','_pagedownButton','helpAreaHeight','tileHeight','_slotWindow','ColorNormal','updateFauxAnimations','_troopId','levelUpRecovery','PA1','WIN_OEM_FJ_MASSHOU','_mp','GoldFontSize','font','〘Common\x20Event\x20%1:\x20%2〙\x20Start','child_process','targetX','updatePointAnimations','ParseItemNotetags','CustomParamAbb','show','GREATER_THAN','IconXParam2','statusParamsWindowRect','aoEnf','forceOutOfPlaytest','DigitGroupingLocale','updatePositionCoreEngineShakeRand','Window_Selectable_cursorUp','%1〘Choice\x20Cancel〙%1','removeOnceParallelInterpreter','drawIcon','xparamFlatJS','_action','displayName','includes','QtDuP','ONE_MINUS_SRC_ALPHA','SKyTF','loadTitle2','LATIN1','nGnbA','uOnaL','BlurFilter','Window_Base_update','X:\x20%1','parseForcedGameTroopSettingsCoreEngine','Graphics_centerElement','turn','_categoryWindow','ImprovedAccuracySystem','areButtonsHidden','GoldIcon','isBottomButtonMode','setMute','WIN_OEM_PA3','onButtonImageLoad','charAt','BottomButtons','MDR','kIlpL','Map%1','SParamVocab5','duration','animationBaseDelay','Enemy-%1-%2','F14','Smooth','adjustSprite','parallaxes','SceneManager_isGameActive','_scrollDuration','INBACK','WIN_OEM_COPY','paramName','inputWindowRect','pBQWO','bnnfr','_startDecrypting','connected','innerWidth','_repositioned','ZdFDJ','lLkjH','Rate1','GameEnd','WIN_OEM_CLEAR','setMainFontSize','setViewport','xTdye','Window_EquipItem_isEnabled','0.00','GAvgO','SParamVocab6','ACCEPT','isGamepadConnected','members','CTB','Sprite_Button_updateOpacity','Spriteset_Base_update','updatePlayTestF7','horizontal','Plus','setLastPluginCommandInterpreter','addChild','removeAnimationFromContainer','Bitmap_drawCircle','MDF','buttonAssistKey1','ColorExpGauge1','SwitchRandomizeRange','Sprite_destroy','pageup','helpAreaTopSideButtonLayout','parameters','pages','Window_NameInput_cursorRight','BgType','getColorDataFromPluginParameters','dJYDd','BTestAddedQuantity','setupFont','_anchor','battleSystem','Input_clear','gFILU','ForceNoPlayTest','isAlive','SEPARATOR','Scene_Item_create','<%1\x20%2:[\x20]','_number','application/json','ctrlKey','clone','BTestItems','createDimmerSprite','CwxTM','OPEN_BRACKET','OiEnf','disable','_coreEngineShakeStyle','targetContentsOpacity','restore','hpColor','oqdgF','euCmU','SParamVocab9','createCommandWindow','_animationQueue','IconSet','rjQor','NumberBgType','drawGameTitle','addCommand','Bitmap_gradientFillRect','Window_Base_initialize','PixelateImageRendering','itemHeight','IconParam5','_currentMap','setSideButtonLayout','overrideMimeType','RqNMR','WGpzH','atypeId','MAXMP','EISU','openURL','textHeight','sparamRateJS','setHandler','_targetScaleY','IyoAz','setSize','open','Bitmap_initialize','ALWAYS','ColorMPCost','RightMenus','112958oahVtx','Scene_Battle_createSpriteset','RepositionEnemies130','Game_Interpreter_command105','cancelShowButton','processEscape','Show\x20Scrolling\x20Text\x20Script\x20Error','SLASH','setupButtonImage','setViewportCoreEngineFix','createFauxAnimationSprite','8CLMnSC','constructor','getCoreEngineScreenShakeStyle','clearZoom','enemy','PVewt','uiAreaWidth','damageColor','initVisuMZCoreEngine','_updateGamepadState','swXDf','CONTEXT_MENU','Window_Selectable_itemRect','ZJihd','OyTAQ','Type','aHUdp','_data','buttonAssistOffset%1','windowRect','xparam','return\x200','hUQVE','faces','ucqTs','PERIOD','WIN_OEM_PA1','TimeProgress','505196RJXbGA','VariableJsBlock','catchUnknownError','wfOJr','ParseStateNotetags','createTroopNote','setupCoreEasing','IDs','process_VisuMZ_CoreEngine_Settings','PictureCoordinatesMode','AMPERSAND','name','XParamVocab5','_shouldPreventDefault','cursorPageup','_numberWindow','DefCa','_onLoad','zHGoX','ControllerMatches','getControllerInputButtonMatch','translucentOpacity','wait','BattleSystem','ElhgF','Window_Selectable_processTouch','WIN_OEM_CUSEL','showPointAnimations','Window_NameInput_refresh','menu','performEscape','Scene_Map_updateMainMultiply','aPNTg','operand','currencyUnit','Game_BattlerBase_initMembers','PKVGU','titles1','render','MRG','gainSilentTp','Item-%1-%2','Scene_MenuBase_createPageButtons','_stored_ctGaugeColor2','NUMPAD8','maxGold','AccuracyBoost','centerX','exit','TRG','visible','exportAllTroopStrings','status','CLOSE_BRACKET','isFauxAnimationPlaying','_muteSound','mkLjA','(\x5cd+)>','SParamVocab3','playCursorSound','MVLkm','_editWindow','Flat','F22','originalJS','ColorMPGauge1','mfTvh','OUTQUINT','%1:\x20Exit\x20','Sprite_Animation_setViewport','buttonAssistText1','Game_Actor_changeClass','itemEva','clearRect','Qrrki','ExportString','sjivZ','isWindowMaskingEnabled','fMbgG','HSwAA','nah','picture','DlaJE','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','currentLevelExp','Y:\x20%1','_skillTypeWindow','loadBitmap','mJQAX','iABSk','VisuMZ_2_BattleSystemETB','KuTmj','EXR','VisuMZ_1_OptionsCore','BackOpacity','hide','oQNft','movePageButtonSideButtonLayout','ShopMenu','BKarS','ParseArmorNotetags','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','sv_enemies','guardSkillId','PnStY','IconSParam3','drawActorClass','drawNewParam','kEnMY','outbounce','processMoveCommand','processFauxAnimationRequests','buttonAssistWindowSideRect','isAnimationOffsetXMirrored','ItemRect','playOnceParallelInterpreter','_colorCache','PDR','number','Opacity','hiecQ','makeAutoBattleActions','lineHeight','_centerElementCoreEngine','TCR','processDigitChange','DrawIcons','Chance','createWindowLayer','uLLPI','aPPAi','_rate','paramFlat','_stored_gaugeBackColor','XParamVocab7','Scene_Equip_create','ParseSkillNotetags','makeDocumentTitle','Mute','SParamVocab7','initMembersCoreEngine','StatusMenu','createChildSprite','mainCommandWidth','onEscapeSuccess','INQUART','onInputOk','Actor-%1-%2','Ctxye','remove','PositionJS','toFixed','_stored_expGaugeColor1','globalAlpha','deselect','loadIconBitmap','endAction','ModernControls','createPointAnimation','NEAREST','Conditional\x20Branch\x20Script\x20Error','buttonAssistKey5','maxLvGaugeColor1','isSceneMap','Class-%1-%2','OUTELASTIC','DOLLAR','updateWaitMode','1.3.0','htDZm','ExtDisplayedParams','SystemSetFontSize','_destroyInternalTextures','ParseTilesetNotetags','CustomParamType','dCxPZ','Hhvau','Scene_Battle_createCancelButton','fontSize','checkSubstitute','SParamVocab8','DebugConsoleLastControllerID','isGamepadAxisMoved','_onError','WEPlj','ppCdn','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','TuMAj','RegExp','RzqJw','value','OpenSpeed','MINUS','terms','itemBackColor1','WIN_OEM_FJ_ROYA','ADD','ColorCrisis','INOUTQUINT','Scene_Options_create','mapId','setValue','VBKah','levelUp','center','setFrame','AntiZoomPictures','centerY','CommandList','REC','isCancelled','Scene_Map_createSpritesetFix','addAnimationSpriteToContainer','_gamepadWait','OPEN_PAREN','requestFauxAnimation','getBackgroundOpacity','updateShadow','_realScale','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','TGR','xeFPb','Sprite_Picture_loadBitmap','CnmVz','JEqHg','HCyQB','pixelated','_refreshArrows','DIVIDE','DimColor2','NameInputMessage','LkHgc','top','tpGaugeColor2','ClkaZ','_statusEquipWindow','F16','EscapeAlways','TtZQv','enableDigitGroupingEx','Srlyr','measureTextWidth','gBWJT','otSju','targetY','gainGold','KANA','createCancelButton','_refreshPauseSign','eZEER','destroyed','SPACE','mev','mmp','EVAL','ExportStrFromAllTroops','BasicParameterFormula','IakCb','oYBRw','min','numberShowButton','Spriteset_Base_isAnimationPlaying','NUMPAD0','actor','_listWindow','Window_StatusBase_drawActorLevel','isSideButtonLayout','RPGMAKER_VERSION','ParseAllNotetags','_inputString','ShowJS','setupCoreEngine','centerSprite','erasePicture','ONE','showDevTools','_inputSpecialKeyCode','DUhKp','getInputButtonString','OGIJj','AudioChangeBgmPitch','ParseEnemyNotetags','JNtHN','ItemBackColor2','kIBfa','QUESTION_MARK','canAttack','Wiqhj','setGuard','setupBattleTestItems','HYPHEN_MINUS','toLocaleString','EEElc','Settings','rkOXW','ctGaugeColor2','Game_System_initialize','reservePlayTestNewGameCommonEvent','isNormalPriority','cursorDown','clearOnceParallelInterpreters','BuyBgType','oaiCJ','buttonAssistKey3','pressed','CreateBattleSystemID','_centerElement','xdg-open','CommandRect','OPEN_CURLY_BRACKET','CategoryRect','ebFFN','updateAnchor','Window_NameInput_cursorLeft','Rpdhu','IconParam0','yVysh','Spriteset_Base_initialize','IconParam6','PositionX','WIN_ICO_CLEAR','processPointAnimationRequests','EncounterRateMinimum','none','isCollidedWithEvents','F13','ARRAYFUNC','isNextScene','DashToggleR','buttonAssistCancel','_lastX','calcEasing','clearCachedKeys','IconIndex','needsUpdate','textWidth','targetScaleX','layoutSettings','dGwKB','ahBrE','hApCg','droeg','F20','ControllerButtons','hRfRd','enemies','removeFauxAnimation','get','_isWindow','Layer','Game_Character_processMoveCommand','Game_Event_isCollidedWithEvents','CAPSLOCK','maxItems','mpCostColor','tpColor','_stored_normalColor','evaded','processAlwaysEscape','playBgs','updatePosition','sin','learnings','Scene_Boot_loadSystemImages','Scene_Boot_onDatabaseLoaded','setAttack','AGI','stencilFunc','skipBranch','showFauxAnimations','FlRNd','zRHTx','Window','backspace','retreat','StatusParamsBgType','createAnimationSprite','innerHeight','refresh','_createInternalTextures','Gold','ESC','STENCIL_BUFFER_BIT','reserveNewGameCommonEvent','_movementDuration','_actor','Game_Interpreter_updateWaitMode','paramRate1','ARRAYNUM','option','removeAllPointAnimations','_spriteset','_CoreEngineSettings','createSpriteset','_index','cxaWh','BtCUu','_mode','categoryWindowRect','_clickHandler','actorWindowRect','ARRAYSTR','uwNCE','ColorManager_loadWindowskin','randomInt','gold','drawParamName','applyForcedGameTroopSettingsCoreEngine','xparamRateJS','IconSParam5','_cacheScaleY','mirror','clamp','isHandled','sparamFlatBonus','STR','platform','IconXParam6','Bitmap_clearRect','Actor','rgba(0,\x200,\x200,\x201.0)','Sprite_Battler_startMove','mpGaugeColor1','TextManager_param','SceneManager_initialize','fillText','contents','traitObjects','OUTEXPO','tjota','create','_targetScaleX','pictures','_digitGrouping','checkCacheKey','_url','smooth','blendFunc','Scene_Map_createMenuButton','_maxDigits','Window_TitleCommand_selectLast','Center','_effectsContainer','(\x5cd+)([%％])>','loadTitle1','stretch','DummyRect','waiting','isGamepadButtonPressed','setBackgroundType','scale','MVbso','save','rVIiw','onKeyDown','ZHedg','drawCharacter','stop','pagedown','bgmVolume','MapNameTextCode','drawTextEx','SaNMl','FdsUM','LEFT','LINEAR','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','isCursorMovable','HelpBgType','animationId','BlendMode','maxTurns','isInputting','BRTBy','getGamepads','sparamPlusJS','split','processTouchModernControls','PTB','displayY','2402724OFrTaT','_defaultStretchMode','Duration','NUMPAD5','bXjTa','GetParamIcon','mzySm','_closing','paramY','itemWindowRect','outlineColorGauge','SwRsw','bfQrO','uKaDB','exportAllMapStrings','ProfileRect','Game_Map_scrollLeft','registerCommand','TECVL','ScaleX','DELETE','CIRCUMFLEX','MenuLayout','Window_NameInput_cursorUp','_baseSprite','Version','Scene_Title_drawGameTitle','buyWindowRect','floor','hWQYe','operation','KeyItemProtect','ApplyEasing','Scene_Shop_create','F19','_smooth','buttonAssistOk','etypeId','tPANs','KEEP','isAnimationForEach','ValueJS','Window_NameInput_cursorDown','DVhMh','cursorRight','WIN_OEM_WSCTRL','Window_Selectable_cursorDown','<JS\x20%1\x20%2:[\x20](.*)>','Game_Picture_initBasic','axes','MInCh','dashToggle','src','subject','active','prototype','processKeyboardDelete','_customModified','max','ARRAYSTRUCT','vhWpA','item','TextJS','INELASTIC','processTouch','initialLevel','itemPadding','evaluate','Keyboard','backOpacity','itypeId','catchException','COLON','nQBBy','IconSParam4','Sprite_Gauge_gaugeRate','Input_pollGamepads','ALT','initialize','ActorBgType','loadWindowskin','statusEquipWindowRect','buttonAreaHeight','Game_Interpreter_command355','drawActorNickname','renderNoMask','updateOnceParallelInterpreters','Window_Gold_refresh','drawGauge','Pluto','StatusBgType','Scene_Map_updateMain','nYbjh','AnimationID','paramFlatBonus','Scene_Name_create','Sprite_AnimationMV_processTimingData','Manual','DEF','HSqmH','Untitled','ColorGaugeBack','_blank','isGamepadTriggered','kcWwa','makeEncounterCount','Game_Map_scrollUp','CancelText','_fauxAnimationSprites','vertJS','hitBI','ExtractStrFromMap','#%1','DisplayedParams','MAX_SAFE_INTEGER','ParamArrow','test','LevelUpFullHp','QoL','windowPadding','AnMio','sellWindowRect','updateData','skillId','Input_updateGamepadState','_stored_hpGaugeColor1','KOzgm','_hideButtons','drawTextTopAligned','switchModes','magNR','oKDIl','OUTBOUNCE','ColorTPGauge1','_clientArea','IconSParam6','Bitmap_fillRect','ButtonAssist','AllTroops','textBaseline','Window_Selectable_processCursorMove','blt','mainAreaBottom','paramWidth','SideView','rightArrowWidth','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','HlPMh','listWindowRect','Scene_Battle_update','Script\x20Call\x20Error','QwertyLayout','fnPjn','_lastOrigin','LUK','5OLMGip','gMvcL','BACK_QUOTE','paramchangeTextColor','FontShadows','abs','LvExpGauge','addChildToBack','DMQXo','endAnimation','nickname','_inputWindow','Game_Party_consumeItem','IconXParam7','fromCharCode','VisuMZ_2_BattleSystemFTB','EvmFq','slice','itemLineRect','createFauxAnimation','contentsBack','BattleManager_checkSubstitute','ggwkl','DimColor1','imageSmoothingEnabled','ZpRll','F7key','GoldChange','SParamVocab1','_sellWindow','boxHeight','itemSuccessRate','responseText','updatePictureAntiZoom','FontSmoothing','OhTsv','hZOpf','INOUTELASTIC','updateMotion','ParamChange','_scaleX','makeInputButtonString','Bitmap_measureTextWidth','selectLast','Pixelated','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','moveMenuButtonSideButtonLayout','menuShowButton','SubfolderParse','_lastCommandSymbol','DigitGroupingExText','removePointAnimation','IconSParam0','bind','ShowDevTools','endBattlerActions','WbIwB','refreshWithTextCodeSupport','AudioChangeBgsVolume','eva','Game_Picture_calcEasing','FBNnH','Exported_Script_%1.txt','initMembers','lOuAp','makeCommandList','%1%2','\x0a\x0a\x0a\x0a\x0a','updateScene','F10','gaugeRate','StatusRect','retrieveFauxAnimation','IconXParam9','parse','sv_actors','dlKQL','initCoreEngine','makeDeepCopy','PictureFilename','ARRAYEVAL','setActorHomeRepositioned','VKPoE','VPtUq','EVA','useFontWidthFix','LevelUpFullMp','CommandWidth','FTB','isPointAnimationPlaying','_bitmap','_baseTexture','Scene_Base_terminateAnimationClearBugFix','ARRAYJSON','buttons','_hideTileShadows','mainAreaTopSideButtonLayout','SLEEP','isMagical','_stored_tpGaugeColor1','_paramPlus','isExpGaugeDrawn','PNnBo','UFNzu','updatePositionCoreEngineShakeHorz','pow','EditRect','_moveEasingType','helpAreaTop','updatePictureCoordinates','_pointAnimationQueue','background','KaiBb','bitmap','button','MapOnceParallel','GSKDA','Param','processCursorMove','setLastGamepadUsed','1655730UfSlJg','pan','Spriteset_Base_destroy','shake','SceneManager_onKeyDown','npMiO','pTFGj','events','jDdgE','kQpUf','map','BaseTexture','systemColor','TextCodeClassNames','nRWCd','EQUAL','ColorMaxLvGauge1','setEnemyAction','concat','rEtzo','hZEPr','powerDownColor','VisuMZ_2_BattleSystemCTB','DOWN','RevertPreserveNumbers','default','sparamPlus','Game_Event_start','vBScN','asin','OKfRW','AJToI','updateMain','PreserveNumbers','expGaugeColor1','mpGaugeColor2','vYFwi','destroy','numActions','inBattle','exp','updateEffekseer','_mainSprite','oZdFP','_shakeSpeed','MAXHP','itemHit','openness','oAUOJ','AnimationPoint','lJHGQ','Game_Interpreter_command111','EQUALS','Linear','BottomHelp','updatePositionCoreEngineShakeOriginal','battlebacks2','cursorUp','_statusWindow','Renderer','QMQgF','MainMenu','down','nCGNu','_isButtonHidden','Control\x20Variables\x20Script\x20Error','makeFontSmaller','_loadingState','XParamVocab1','_offsetX','scaleY','createMenuButton','ColorTPGauge2','tZIvW','ProfileBgType','call','HRG','Scene_Boot_startNormalGame','playCancel','centerCameraCheckData','processKeyboardHome','zghrk','clipboard','ParseClassNotetags','BTestWeapons','style','cursorPagedown','TextFmt','Window_NameInput_cursorPageup','removeAnimation','HQIdI','drawRightArrow','scaleX','_animationSprites','Game_Actor_paramBase','DocumentTitleFmt','requestPointAnimation','OUTQUART','currentExp','bxaxM','targetObjects','updateLastTarget','caIWi','qJdDD','VSMIY','image-rendering','drawActorLevel','ZOOM','powerUpColor','_downArrowSprite','_isPlaytest','wholeDuration','goldWindowRect','initialBattleSystem','updateOrigin','AllMaps','IconParam1','Sprite_Picture_updateOrigin','getLastUsedGamepadType','command122','width','ColSpacing','quit','smallParamFontSize','createButtonAssistWindow','Scene_Map_updateScene','GQXrw','PHA','onInputBannedWords','outlineColorDmg','cOors','cos','sddsw','1.4.4','Scene_Skill_create','lsEuf','makeTargetSprites','mhEav','bgs','resetBattleSystem','QdMbS','drawFace','_image','performMiss','_internalTextures','pitch','MEV','buttonAssistOffset1','Game_Map_setup','alphabetic','drawBackground','Sprite_Animation_processSoundTimings','Window_NameInput_initialize','isBusy','SystemLoadAudio','evade','_stored_mpGaugeColor1','Title','params','Tilemap_addShadow','Key%1','Basic','HsPwx','CustomParamNames','OTB','SceneManager_exit','Name','rcQyL','isNumpadPressed','createPointAnimationTargets','Window_Base_drawFace','Scene_MenuBase_mainAreaTop','processSoundTimings','DataManager_setupNewGame','gkOCu','LAVEK','battlebacks1','focus','paramValueByName','ExtractStrFromList','UdJJo','DigitGroupingGaugeSprites','INOUTSINE','isPhysical','OpenConsole','INSERT','MnQcV','IconSParam2','VisuMZ_2_BattleSystemOTB','_optionsWindow','gLphE','Game_Actor_levelUp','isAnimationPlaying','lTuBQ','wZKsz','PictureShowIcon','original','isFullDocumentTitle','Game_Interpreter_command122','BzUZA','printError','successRate','ZgrOp','MAT','_buyWindow','sHFaA','isOptionValid','pictureId','upGyh','sparam','shift','drawIconBySize','loadSystemImages','enableDigitGrouping','removeChild','hideButtonFromView','OutlineColorDmg','encounterStep','move','IconXParam0','Game_Action_setAttack','removeAllFauxAnimations','ENTER_SPECIAL','Input_setupEventHandlers','EnableNameInput','inbounce','SParamVocab2','_coreEasingType','isSmartEventCollisionOn','AutoScrollLockX','kMaWd','KsKZQ','NXMNQ','INOUTCIRC','ybsIV','_active','MPFmY','IjgjF','forceStencil','updateMainMultiply','Game_Action_numRepeats','vCCAW','join','expGaugeColor2','system','processCursorMoveModernControls','processKeyboardBackspace','length','zFgLf','isLoopHorizontal','characters','isMaxLevel','title','key%1','IvKQO','_displayX','resetFontSettings','anchor','alwaysDash','playBuzzer','autoRemovalTiming','textColor','isSpecialCode','_stored_expGaugeColor2','BgFilename1','Input_shouldPreventDefault','ListBgType','version','currentClass','gMigg','setCoreEngineScreenShakeStyle','padding','KJICC','QeIOk','_backSprite1','ZBZaF','aUhjg','ColorCTGauge2','OUTBACK','BgFilename2','ScaleY','addEventListener','isMenuButtonAssistEnabled','CodeJS','ExportStrFromAllMaps','gihRJ','VisuMZ_2_BattleSystemBTB','getControllerInputButtonString','Rate2','_commandWindow','scrollUp','KeySHIFT','ColorMaxLvGauge2','filterArea','createTitleButtons','dcCum','string','Game_Interpreter_PluginCommand','wbIBH','runCombinedScrollingTextAsCode','initDigitGrouping','xparamRate2','isMVAnimation','log','advanced','StartID','subtitle','RepositionEnemies','DlRFq','isMapScrollLinked','exec','_buttonType','FNrIF','consumable','buttonAssistSwitch','Game_Picture_updateMove','CustomParamIcons','ItemStyle','Game_Temp_initialize','setMoveEasingType','_digitGroupingEx','children','loadMapData','atbActive','5322228BHKzcb','YDqGi','_lastGamepad','setupCustomRateCoreEngine','FpVxT','yJZGE','Scene_Menu_create','traitsPi','zoomScale','maxCols','MultiKeyFmt','iconWidth','sUmIt','ActorHPColor','Unnamed','pKHqi','_windowskin','AudioChangeBgsPan','buttonAssistText%1','DOUBLE_QUOTE','horzJS','bgsVolume','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','IconParam3','Scene_MenuBase_createBackground','Enable','updatePadding','FINAL','ColorMPGauge2','Scene_Base_create','isClosed','normal','Scene_Battle_createSpriteset_detach','_margin','drawBackgroundRect','SlotRect','right','ShowButtons','IconSParam9','drawItem','faceHeight','keyboard','ALTGR','%1/','INQUINT','Graphics_defaultStretchMode','SnapshotOpacity','VhotY','param','markCoreEngineModified','xparamPlus1','SParamVocab0','fMhGP','adjustPictureAntiZoom','animationShouldMirror','PRESERVCONVERSION(%1)','mZaAf','RowSpacing','DamageColor','skillTypes','textSizeEx','StatusEquipRect','EREOF','img/%1/','onDatabaseLoaded','cancel','_destroyCanvas','consumeItem','Window_Base_drawIcon','fKeZL','toString','WIN_OEM_ENLW','ScreenResolution','SELECT','nKRQd','ppyZK','NewGameCommonEventAll','yOIDM','UMGHU','reduce','loadSystem','drawActorSimpleStatus','jcbfg','([\x5c+\x5c-]\x5cd+)([%％])>','xparamPlus','_cancelButton','valueOutlineColor','paramMax','ozCqV','description','GNQTC','LoadError','startNormalGame','round','up2','adjustBoxSize','indexOf','Padding','dbkcT','_buttonAssistWindow','_targetAnchor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','setHome','tileWidth','buttonAssistKey%1','IconParam2','OQKPu','_stored_mpCostColor','reserveCommonEvent','_coreEasing','_stored_mpGaugeColor2','down2','Game_Picture_y','onload','_drawTextShadow','ctGaugeColor1','TitlePicButtons','LineHeight','_onceParallelInterpreters','iBNJU','playOk','batch','jsQuickFunc','DETACH_PICTURE_CONTAINER','ItemBackColor1','dimColor1','rptEd','ConvertParams','HASH','createPointAnimationQueue','gNZTp','charCode','ETB','catchNormalError','NKkff','eFnnb','OnLoadJS','ActorTPColor','Sprite_Gauge_currentValue','faceWidth','BACK_SLASH','isItemStyle','CallHandlerJS','_movementWholeDuration','StatusEquipBgType','isEventRunning','_subject','equips','process_VisuMZ_CoreEngine_Functions','padZero','_shakePower','_offsetY','isTouchedInsideFrame','integer','ImgLoad','_commonEventLayers','scrollLeft','setSideView','_storedMapText','_startLoading','WIN_OEM_AUTO','_backSprite2','_forcedTroopView','process_VisuMZ_CoreEngine_RegExp','setupNewGame','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','Game_Action_itemEva','toLowerCase','darwin','GTKrh','Scene_Map_update','sLSqV','origin','SCALE_MODES','jsonToZip','WIN_OEM_FINISH','IconXParam5','WIN_OEM_FJ_TOUROKU','addLoadListener','targetPosition','Scene_MenuBase_createCancelButton','_hovered','Sprite_Button_initialize','_viewportSize','INQUAD','xwEqQ','aKEXy','setActorHome','Window_Base_createTextState','_animation','updateCurrentEvent','missed','BTestArmors','CRI','hzdkG','_phase','HelpRect','spQOs','drawGameVersion','xwnGW','_changingClass','qxTJD','Game_Picture_show','_profileWindow','oRyvk','setTargetAnchor','push','type','GoldOverlap','paramFlatJS','rowSpacing','setBackgroundOpacity','displayX','maxLvGaugeColor2','keyCode','_pictureName','NUMPAD4','xDWMd','Wait','lzgjw','select','sitDx','SlotBgType','getCustomBackgroundSettings','skillTypeWindowRect','font-smooth','isKeyItem','repositionEnemiesByResolution','SkillTypeRect','setEasingType','XParamVocab6','DATABASE','eventsXyNt','MenuBg','DigitGroupingStandardText','attackSkillId','Spriteset_Base_updatePosition','openingSpeed','encounterStepsMinimum','updatePositionCoreEngine','titles2','_itemWindow','repositionCancelButtonSideButtonLayout','EXECUTE','_stored_powerUpColor','applyCoreEasing','getPointAnimationLayer','titleCommandWindow','createCustomBackgroundImages','_upArrowSprite','ExtractStrFromTroop','F6key','drawAllParams','Map%1.json','uZHvm','_targets','list','_pressed','createTextState','scrollDown','JcNjf','Sprite_Actor_setActorHome','_targetX','commandWindowRect','createPointAnimationSprite','SParameterFormula','_sideButtonLayout','Scene_Boot_updateDocumentTitle','INOUTQUART','ColorHPGauge1','WindowLayer_render','_backgroundFilter','setSkill','defineProperty','vrIph','cursorLeft','TextStr','RequireFocus','addWindow','VisuMZ_1_BattleCore','targetEvaRate','note','Origin','buttonAssistOffset5','VOLUME_DOWN','paramRateJS','VBsZL','OjCQM','ConvertNumberToString','dimColor2','_goldWindow','ShowItemBackground','isPlaying','sparamRate2','isLoopVertical','start','EXSEL','cIVmT','TranslucentOpacity','NUMPAD3','Game_Map_scrollRight','Game_Picture_scaleX','resize','maxVisibleItems','_currentBgs','playBgm','_logWindow','text%1','GJlVI','fillRect','colSpacing','measureTextWidthNoRounding','coreEngineRepositionEnemies','Game_Action_updateLastTarget','OWNnw','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','random','GoldMax','sparamRate1','Game_Picture_scaleY','escape','xuBtA','(\x5cd+\x5c.?\x5cd+)>','_encounterCount','updateOpacity','terminate','》Comment《\x0a%1\x0a','_origin','FontSize','kDvlM','Flat2','applyEasing','isUseModernControls','clearForcedGameTroopSettingsCoreEngine','AudioChangeBgsPitch','NUM_LOCK','OutlineColor','playTestCtrlT','SHIFT','QUOTE','getKeyboardInputButtonString','wBSIO','GyOMq','_shakeDuration','setup','isItem','_tilemap','_tempActor','HdTCG','WrnJo','F23','DisplayLockX','WIN_OEM_RESET','checkCoreEngineDisplayCenter','_setupEventHandlers','cwEGq','zcjdJ','meVolume','_stored_pendingColor','INOUTBOUNCE','Total','updateDocumentTitle','targetOpacity','initBasic','gaugeHeight','resetTextColor','isTriggered','measureText','makeActionList','Mdxwb','object','MAX_GL_TEXTURES','drawGameSubtitle','buttonAssistWindowRect','IconXParam8','qRtuX','_onKeyPress','EditBgType','ItemPadding','_targetY','_menuButton','ColorTPCost','cSNjL','ItemBgType','_hp','_pointAnimationSprites','SxhBj','baseId','requestMotion','setupValueFont','result','_backSprite','command357','pMOoj','Bitmap_drawText','PGDN','storeMapData','anchorCoreEasing','hit','paramMaxJS','F11','processHandling','hNIQB','AudioChangeBgmPan','Flat1','helpWindowRect','isActor','index','bzvwf','drawSegment','addOnceParallelInterpreter','ZUnCF','IZDUm','moveCancelButtonSideButtonLayout','BoxMargin','CNT','GET','sparamPlus2','5DcVuMT','KeyboardInput','stypeId','Window_NameInput_processTouch','QHleN','Scene_Base_terminate','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_width','Window_NumberInput_processDigitChange','OjGsY','TPB\x20ACTIVE','redraw','DigitGroupingDamageSprites','WASD','goto','easingType','drawCircle','_registerKeyInput','opacity','PRINT','MODECHANGE','UQyMS','setClickHandler','mainAreaHeightSideButtonLayout','_scaleY','trim','GbgBN','GRD','HIT','_balloonQueue','skCFM','Scene_GameEnd_createBackground','clear','end','_forcedBattleSys','bgm','_stored_deathColor','DUlsf','scaleSprite','context','7fXVcbP','_helpWindow','commandWindowRows','Location','drawText','changeClass','Weapon-%1-%2','F12','SystemSetWindowPadding','zvtMg','xaDmL','PERCENT','Window_NumberInput_start','COMMA','initButtonHidden','vAtth','Power','xparamFlat2','targets','_screenX','boxWidth','maxBattleMembers','MvAnimationRate','_targetOffsetY','mhp','volume','gaugeLineHeight','profileWindowRect','SystemSetSideView','_playTestFastMode','code','xScrollLinkedOffset','loadPicture','TextCodeNicknames','left','CANCEL','Match','_opacity','contentsOpacity','onerror','playTestF6','numRepeats','changeTextColor','_dimmerSprite','BattleManager_processEscape','subjectHitRate','EnableJS','CategoryBgType','updateKeyText','sceneTerminationClearEffects','yScrollLinkedOffset','NewGameBoot','bitmapWidth','_screenY','ATK','_pageupButton','NUMPAD1','isBottomHelpMode','TPB\x20WAIT','TILDE','text','defaultInputMode','sqrt','FDR','EndingID','UpdatePictureCoordinates','UxtmR','_commandList','playMiss','Sprite_AnimationMV_updatePosition','DisplayLockY','Game_Screen_initialize','Input_onKeyDown','_target','targetScaleY','_scene','sparamFlat2','randomJS','lPPmB','_playtestF7Looping','bmopZ','onNameOk','format','dBiVV','NameMenu','isSideView','Color','getCombinedScrollingText','ParseWeaponNotetags','DrawItemBackgroundJS','paramBase','gainItem','xparamFlat1','Game_Picture_move','FontWidthFix','NUMPAD6','isPlaytest','areButtonsOutsideMainUI','_dummyWindow','update','DLBSl','createEnemies','allowShiftScrolling','isRepeated','checkSmartEventCollision','alignBottom','_height','doesNameContainBannedWords','snapForBackground','setWindowPadding','smoothSelect','WIN_ICO_HELP','Bitmap_blt','BattleManager_update','refreshDimmerBitmap','_battlerName','home','BACKSPACE','_context','loadGameImagesCoreEngine','Page','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','tpCostColor','cdLbT','REPLACE','_targetOffsetX','_pictureCoordinatesWindow','processKeyboardHandling','flush','wXzEf','_texture','STB','determineSideButtonLayoutValid','framebuffer','xparamRate1','deflate','statusWindowRect','pictureButtons','expRate','onKeyDownKeysF6F7','Icon','stencilOp','IconParam4','SkillMenu','KfgEk','_pollGamepads','SystemSetBattleSystem','mrLnW','Spriteset_Battle_createEnemies','clearStencil','mute','useDigitGroupingEx','Graphics_printError','ZnfZK','ZERO','drawActorExpGauge','_drawTextOutline','_statusParamsWindow','fadeSpeed','DefaultStyle','_mapNameWindow','Input_update','altKey','bitmapHeight','keyMapper','〘Common\x20Event\x20%1:\x20%2〙\x20End','FadeSpeed','hpGaugeColor1','_lastY','ZWmTX','BTB','Scene_Unlisted','ceil','_pauseSignSprite','Scene_Battle_createSpritesetFix','_currentBgm','hasEncryptedImages','F15','process_VisuMZ_CoreEngine_Notetags','oYvFb','Troop%1','replace','NdBGj','WIN_OEM_PA2','Shfvk','isSceneBattle','startMove','ynsAL','setColorTone','mainFontSize','ScreenShake','azIcp','stringKeyMap','_targetOpacity','getLevel','VisuMZ_2_BattleSystemSTB','moveRelativeToResolutionChange','playCursor','Rwxkr','IconSParam1','Symbol','ColorPowerUp','GoldBgType','isPressed','getInputMultiButtonStrings','CRSEL','XrdWO','ActorMPColor','calcCoreEasing','CLOSE_PAREN','SaveMenu','DjNlR','getBattleSystem','itemHitImprovedAccuracy','Scene_MenuBase_mainAreaHeight','updatePositionCoreEngineShakeVert','seVolume','isOpen','tilesets','XParameterFormula','IconXParam3','scaleMode','SHtBt','Scene_Map_initialize','93630OhsBwt','maxTp','SCPTs','processKeyboardDigitChange','khTPL','Game_Picture_x','itemBackColor2','Game_BattlerBase_refresh','BannedWords','ShowActorLevel','animations','makeCoreEngineCommandList','_storedStack','Game_Troop_setup','Window_Base_drawCharacter','tiJqT','updateDashToggle','bODVC','JgqXB','TitleCommandList','pVqbd','xHKRe','mainAreaTop','NONCONVERT','wLLhn','INOUTBACK','Game_Map_scrollDown','pointY','CommandBgType','match','_timerSprite','IVTrv','buttonAssistOffset4','%1〘Choice\x20%2〙\x20%3%1','RIGHT','startAutoNewGame','zWJgY','_backgroundSprite','_cacheScaleX','setAction','gaugeBackColor','Window_ShopSell_isEnabled','Scene_MenuBase_helpAreaTop','Enemy','NUMPAD7','ZFiSy','data/','OptionsRect','vVwaM','TGSWW','END','OutlineColorGauge','Subtitle','pjaVc','isArrowPressed','playEscape','\x5c}❪SHIFT❫\x5c{','command355','_windowLayer','setCoreEngineUpdateWindowBg','pagedownShowButton','KLkLy','maxLevel','PRINTSCREEN','ANTeq','process_VisuMZ_CoreEngine_CustomParameters','drawParamText','mainAreaHeight','_actorWindow','updateCoreEasing','bwOIj','useDigitGrouping','YJcEu','processKeyboardEnd','eGVvD','createBackground','buttonAssistText2','MCR','HANJA','ecaui','touchUI','setCommonEvent','YvojU','DECIMAL','dropItems','isDying','buttonAssistKey4','MGtJe','NPuFU','PictureID','kIwOI','tab','vertical','outlineColor','editWindowRect','repeat','gghOu','isInstanceOfSceneMap','command111','Bitmap_strokeRect','ColorSystem','pWQtr','Max','strokeRect','ExportAllMapText','_pictureCoordinatesMode','canEquip','createPageButtons','_pictureContainer','win32','initCoreEngineScreenShake','PpSwE','paramPlus','NewGameCommonEvent','process_VisuMZ_CoreEngine_jsQuickFunctions','filter','isRightInputMode','XParamVocab8','NOxyH','drawGoldItemStyle','scrollRight','PictureEraseAll','backgroundBitmap','_stored_maxLvGaugeColor2','onMoveEnd','expParams','ParseActorNotetags','ZYyCs','windowOpacity','setAnchor','updateMove','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','isOpenAndActive','ExtJS','VKLwo','startAnimation','Game_Action_itemHit','PGGkx','isActiveTpb','setBattleSystem','Window_MapName_refresh','isEnemy','toUpperCase','lastAnimationSprite','dDKJp','_cache','_addShadow','SParamVocab4','buttonAssistText5','VOLUME_MUTE','MRF','processTimingData','_stored_maxLvGaugeColor1','Mirror','sparamPlus1','paramRate2','WIN_ICO_00','ISCXy','CEV','isEnabled','Scene_Map_createSpriteset','QzpFy','KeyTAB','ljFHY','IPnHB','transform','STENCIL_TEST','currentValue','numberWindowRect','kwbnw','_centerCameraCheck','OpenURL','processCursorHomeEndTrigger','State-%1-%2','retrievePointAnimation','NumberRect','kCDzj','command105','paramX','EnableMasking','IconXParam4','filters','IconSParam7','ButtonHeight','ColorCTGauge1','UWkdQ','PAUSE','height','UnZWU','SwitchToggleOne','_refreshBack','iconHeight','_duration','EquipMenu','getButtonAssistLocation','blockWidth','level','ListRect','ButtonFadeSpeed','createJsQuickFunction','areTileShadowsHidden'];_0x5864=function(){return _0x19f645;};return _0x5864();}const _0xa0779=_0x5859;function _0x5859(_0x3c5bcb,_0x26b3bf){const _0x586426=_0x5864();return _0x5859=function(_0x585995,_0x5644f9){_0x585995=_0x585995-0x148;let _0x4908c8=_0x586426[_0x585995];return _0x4908c8;},_0x5859(_0x3c5bcb,_0x26b3bf);}(function(_0x3f5034,_0x46e9bd){const _0x3fdf24=_0x5859,_0x5481f5=_0x3f5034();while(!![]){try{const _0x5d1c05=parseInt(_0x3fdf24(0x2d5))/0x1*(parseInt(_0x3fdf24(0x8e0))/0x2)+-parseInt(_0x3fdf24(0x829))/0x3+-parseInt(_0x3fdf24(0x907))/0x4*(-parseInt(_0x3fdf24(0x633))/0x5)+parseInt(_0x3fdf24(0x23a))/0x6*(parseInt(_0x3fdf24(0x65b))/0x7)+parseInt(_0x3fdf24(0x8eb))/0x8*(-parseInt(_0x3fdf24(0x34d))/0x9)+parseInt(_0x3fdf24(0x73b))/0xa*(parseInt(_0x3fdf24(0x826))/0xb)+-parseInt(_0x3fdf24(0x491))/0xc;if(_0x5d1c05===_0x46e9bd)break;else _0x5481f5['push'](_0x5481f5['shift']());}catch(_0x258d41){_0x5481f5['push'](_0x5481f5['shift']());}}}(_0x5864,0x643cb));var label=_0xa0779(0x824),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xa0779(0x7ae)](function(_0x35822d){const _0x58ba97=_0xa0779;return _0x35822d[_0x58ba97(0x93b)]&&_0x35822d['description'][_0x58ba97(0x84f)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0xa0779(0x510)]=function(_0x232b19,_0x1f9342){const _0x37526c=_0xa0779;for(const _0x5d49ca in _0x1f9342){if(_0x5d49ca[_0x37526c(0x758)](/(.*):(.*)/i)){if('AghMl'!=='AghMl')for(const _0x2128f5 of _0x525628[_0x37526c(0x69e)]){if(_0x2128f5[_0x37526c(0x168)][_0x37526c(0x398)](this)){const _0x3f6901=_0x2128f5['Symbol'];let _0x4b811f=_0x2128f5[_0x37526c(0x5a5)];if(['','Untitled']['includes'](_0x4b811f))_0x4b811f=_0x2128f5[_0x37526c(0x278)][_0x37526c(0x398)](this);const _0x5df135=_0x2128f5['EnableJS'][_0x37526c(0x398)](this),_0x91b900=_0x2128f5[_0x37526c(0x7c0)][_0x37526c(0x398)](this);this[_0x37526c(0x8c6)](_0x4b811f,_0x3f6901,_0x5df135,_0x91b900),this[_0x37526c(0x8d7)](_0x3f6901,_0x2128f5[_0x37526c(0x51f)][_0x37526c(0x30a)](this,_0x91b900));}}else{const _0x167eee=String(RegExp['$1']),_0xb4befd=String(RegExp['$2'])[_0x37526c(0x7c9)]()[_0x37526c(0x64c)]();let _0x4daeb6,_0x30131f,_0x1ce74e;switch(_0xb4befd){case'NUM':_0x4daeb6=_0x1f9342[_0x5d49ca]!==''?Number(_0x1f9342[_0x5d49ca]):0x0;break;case _0x37526c(0x1de):_0x30131f=_0x1f9342[_0x5d49ca]!==''?JSON[_0x37526c(0x31f)](_0x1f9342[_0x5d49ca]):[],_0x4daeb6=_0x30131f[_0x37526c(0x357)](_0x3c041a=>Number(_0x3c041a));break;case _0x37526c(0x158):_0x4daeb6=_0x1f9342[_0x5d49ca]!==''?eval(_0x1f9342[_0x5d49ca]):null;break;case _0x37526c(0x325):_0x30131f=_0x1f9342[_0x5d49ca]!==''?JSON[_0x37526c(0x31f)](_0x1f9342[_0x5d49ca]):[],_0x4daeb6=_0x30131f['map'](_0x32dfe9=>eval(_0x32dfe9));break;case'JSON':_0x4daeb6=_0x1f9342[_0x5d49ca]!==''?JSON[_0x37526c(0x31f)](_0x1f9342[_0x5d49ca]):'';break;case _0x37526c(0x332):_0x30131f=_0x1f9342[_0x5d49ca]!==''?JSON[_0x37526c(0x31f)](_0x1f9342[_0x5d49ca]):[],_0x4daeb6=_0x30131f[_0x37526c(0x357)](_0x2439c6=>JSON[_0x37526c(0x31f)](_0x2439c6));break;case _0x37526c(0x818):_0x4daeb6=_0x1f9342[_0x5d49ca]!==''?new Function(JSON[_0x37526c(0x31f)](_0x1f9342[_0x5d49ca])):new Function(_0x37526c(0x900));break;case _0x37526c(0x1a0):_0x30131f=_0x1f9342[_0x5d49ca]!==''?JSON[_0x37526c(0x31f)](_0x1f9342[_0x5d49ca]):[],_0x4daeb6=_0x30131f[_0x37526c(0x357)](_0x5dbf57=>new Function(JSON['parse'](_0x5dbf57)));break;case _0x37526c(0x1f9):_0x4daeb6=_0x1f9342[_0x5d49ca]!==''?String(_0x1f9342[_0x5d49ca]):'';break;case _0x37526c(0x1eb):_0x30131f=_0x1f9342[_0x5d49ca]!==''?JSON[_0x37526c(0x31f)](_0x1f9342[_0x5d49ca]):[],_0x4daeb6=_0x30131f['map'](_0x2cd967=>String(_0x2cd967));break;case'STRUCT':_0x1ce74e=_0x1f9342[_0x5d49ca]!==''?JSON[_0x37526c(0x31f)](_0x1f9342[_0x5d49ca]):{},_0x232b19[_0x167eee]={},VisuMZ[_0x37526c(0x510)](_0x232b19[_0x167eee],_0x1ce74e);continue;case _0x37526c(0x275):_0x30131f=_0x1f9342[_0x5d49ca]!==''?JSON[_0x37526c(0x31f)](_0x1f9342[_0x5d49ca]):[],_0x4daeb6=_0x30131f[_0x37526c(0x357)](_0x4bb6f3=>VisuMZ[_0x37526c(0x510)]({},JSON[_0x37526c(0x31f)](_0x4bb6f3)));break;default:continue;}_0x232b19[_0x167eee]=_0x4daeb6;}}}return _0x232b19;},VisuMZ['CoreEngine'][_0xa0779(0x3f2)]=SceneManager[_0xa0779(0x937)],SceneManager[_0xa0779(0x937)]=function(){const _0x2b2bcf=_0xa0779;VisuMZ[_0x2b2bcf(0x824)]['SceneManager_exit']['call'](this);if(Utils[_0x2b2bcf(0x165)]>='1.4.4'){if(typeof nw===_0x2b2bcf(0x603))nw['App'][_0x2b2bcf(0x3c7)]();}},(_0x4b9c8c=>{const _0xfb0bcd=_0xa0779,_0x1b8a36=_0x4b9c8c[_0xfb0bcd(0x912)];for(const _0xd72886 of dependencies){if(_0xfb0bcd(0x955)===_0xfb0bcd(0x955)){if(!Imported[_0xd72886]){if('wLeXD'!=='wLeXD')return this[_0xfb0bcd(0x730)](_0x2efc7a);else{alert(_0xfb0bcd(0x302)['format'](_0x1b8a36,_0xd72886)),SceneManager['exit']();break;}}}else{const _0x48cddb=_0x21a16b[_0xfb0bcd(0x824)][_0xfb0bcd(0x17f)][_0xfb0bcd(0x52b)][_0x4a1423],_0x3eebef='img/%1/'[_0xfb0bcd(0x6ad)](_0x140a07);for(const _0x13838b of _0x48cddb){_0x500f11['loadBitmap'](_0x3eebef,_0x13838b);}}}const _0x4c0d63=_0x4b9c8c[_0xfb0bcd(0x4ea)];if(_0x4c0d63['match'](/\[Version[ ](.*?)\]/i)){const _0x34f6a6=Number(RegExp['$1']);if(_0x34f6a6!==VisuMZ[label]['version']){if(_0xfb0bcd(0x6a9)!=='lPPmB'){var _0x492541=_0x19e16e(_0x2d9603['$1']);try{_0x1cd032+=_0x5874d1(_0x492541);}catch(_0x27bb51){if(_0x21b932['isPlaytest']())_0x850397[_0xfb0bcd(0x47c)](_0x27bb51);}}else alert(_0xfb0bcd(0x639)['format'](_0x1b8a36,_0x34f6a6)),SceneManager['exit']();}}if(_0x4c0d63[_0xfb0bcd(0x758)](/\[Tier[ ](\d+)\]/i)){const _0x44841b=Number(RegExp['$1']);_0x44841b<tier?(alert(_0xfb0bcd(0x4f6)['format'](_0x1b8a36,_0x44841b,tier)),SceneManager[_0xfb0bcd(0x937)]()):tier=Math[_0xfb0bcd(0x274)](_0x44841b,tier);}VisuMZ[_0xfb0bcd(0x510)](VisuMZ[label][_0xfb0bcd(0x17f)],_0x4b9c8c[_0xfb0bcd(0x89e)]);})(pluginData),((()=>{const _0x59a178=_0xa0779;if(VisuMZ[_0x59a178(0x824)]['Settings'][_0x59a178(0x2b0)][_0x59a178(0x305)]??!![])for(const _0x4a4fec in $plugins){if(_0x59a178(0x2cd)!==_0x59a178(0x7dc)){const _0x580c22=$plugins[_0x4a4fec];_0x580c22[_0x59a178(0x912)][_0x59a178(0x758)](/(.*)\/(.*)/i)&&(_0x580c22[_0x59a178(0x912)]=String(RegExp['$2'][_0x59a178(0x64c)]()));}else{_0x504a0e=_0x116c41(_0x1e46ed)['toUpperCase']();const _0x5d4435=_0xe9eae9[_0x59a178(0x824)][_0x59a178(0x17f)][_0x59a178(0x34a)];if(_0x14f5a4===_0x59a178(0x37a))return _0x5d4435[_0x59a178(0x195)];if(_0x5ef653===_0x59a178(0x8d2))return _0x5d4435[_0x59a178(0x3c1)];if(_0x95a829===_0x59a178(0x691))return _0x5d4435['IconParam2'];if(_0x114f50===_0x59a178(0x29c))return _0x5d4435[_0x59a178(0x4a8)];if(_0x3bc03a===_0x59a178(0x418))return _0x5d4435[_0x59a178(0x6e9)];if(_0x14ea67===_0x59a178(0x897))return _0x5d4435[_0x59a178(0x8cb)];if(_0x37a94d===_0x59a178(0x1c8))return _0x5d4435[_0x59a178(0x198)];if(_0x482b30===_0x59a178(0x2d4))return _0x5d4435['IconParam7'];if(_0x4c1336===_0x59a178(0x64f))return _0x5d4435[_0x59a178(0x428)];if(_0x271ad2===_0x59a178(0x329))return _0x5d4435['IconXParam1'];if(_0xc8eb77===_0x59a178(0x552))return _0x5d4435[_0x59a178(0x842)];if(_0x28c93d==='CEV')return _0x5d4435[_0x59a178(0x737)];if(_0x40b725==='MEV')return _0x5d4435[_0x59a178(0x7ef)];if(_0x1cf33d===_0x59a178(0x7d1))return _0x5d4435[_0x59a178(0x541)];if(_0x570f38===_0x59a178(0x630))return _0x5d4435[_0x59a178(0x1fb)];if(_0x37d35d==='HRG')return _0x5d4435['IconXParam7'];if(_0x4a2fc3===_0x59a178(0x92e))return _0x5d4435['IconXParam8'];if(_0x601892===_0x59a178(0x938))return _0x5d4435[_0x59a178(0x31e)];if(_0x29c041===_0x59a178(0x9e3))return _0x5d4435['IconSParam0'];if(_0x6dbd71===_0x59a178(0x64e))return _0x5d4435[_0x59a178(0x722)];if(_0x3092cc===_0x59a178(0x9d8))return _0x5d4435[_0x59a178(0x408)];if(_0x4efeff===_0x59a178(0x3cc))return _0x5d4435[_0x59a178(0x970)];if(_0x82cff9===_0x59a178(0x788))return _0x5d4435[_0x59a178(0x284)];if(_0x51d028===_0x59a178(0x983))return _0x5d4435[_0x59a178(0x1f3)];if(_0x29d981===_0x59a178(0x97c))return _0x5d4435[_0x59a178(0x2c1)];if(_0x4a179d===_0x59a178(0x867))return _0x5d4435['IconSParam7'];if(_0x321274===_0x59a178(0x69a))return _0x5d4435['IconSParam8'];if(_0x4f271e===_0x59a178(0x963))return _0x5d4435['IconSParam9'];if(_0x546094[_0x59a178(0x824)][_0x59a178(0x489)][_0x4a3c4d])return _0x29679a[_0x59a178(0x824)]['CustomParamIcons'][_0x193b7c]||0x0;return 0x0;}}})()),PluginManager['registerCommand'](pluginData[_0xa0779(0x912)],_0xa0779(0x37e),_0x6d3402=>{const _0x219dc3=_0xa0779;if(!SceneManager[_0x219dc3(0x6a6)])return;if(!SceneManager[_0x219dc3(0x6a6)]['_spriteset'])return;VisuMZ['ConvertParams'](_0x6d3402,_0x6d3402);const _0x2e410d=Math[_0x219dc3(0x4ee)](_0x6d3402['pointX']),_0x2a9e79=Math['round'](_0x6d3402[_0x219dc3(0x756)]);$gameTemp[_0x219dc3(0x3ad)](_0x2e410d,_0x2a9e79,_0x6d3402[_0x219dc3(0x297)],_0x6d3402[_0x219dc3(0x7d4)],_0x6d3402[_0x219dc3(0x991)]);}),PluginManager[_0xa0779(0x24b)](pluginData[_0xa0779(0x912)],'AudioChangeBgmVolume',_0x47defc=>{const _0x57f34d=_0xa0779;VisuMZ['ConvertParams'](_0x47defc,_0x47defc);const _0x4a42c4=Math[_0x57f34d(0x4ee)](_0x47defc[_0x57f34d(0x674)])['clamp'](0x0,0x64),_0x5b86ca=AudioManager['_currentBgm'];_0x5b86ca&&(_0x5b86ca[_0x57f34d(0x674)]=_0x4a42c4,AudioManager['playBgm'](_0x5b86ca));}),PluginManager[_0xa0779(0x24b)](pluginData[_0xa0779(0x912)],_0xa0779(0x172),_0x3ccea4=>{const _0x545fdd=_0xa0779;VisuMZ[_0x545fdd(0x510)](_0x3ccea4,_0x3ccea4);const _0x4b9fa5=Math[_0x545fdd(0x4ee)](_0x3ccea4[_0x545fdd(0x3de)])[_0x545fdd(0x1f6)](0x32,0x96),_0x2563ef=AudioManager['_currentBgm'];_0x2563ef&&(_0x2563ef['pitch']=_0x4b9fa5,AudioManager[_0x545fdd(0x5c2)](_0x2563ef));}),PluginManager[_0xa0779(0x24b)](pluginData[_0xa0779(0x912)],_0xa0779(0x624),_0x3521d8=>{const _0x4a24e1=_0xa0779;VisuMZ[_0x4a24e1(0x510)](_0x3521d8,_0x3521d8);const _0x2701cf=Math['round'](_0x3521d8[_0x4a24e1(0x34e)])[_0x4a24e1(0x1f6)](-0x64,0x64),_0x3c7ed8=AudioManager[_0x4a24e1(0x70a)];_0x3c7ed8&&(_0x4a24e1(0x356)===_0x4a24e1(0x4fb)?this['_helpWindow'][_0x4a24e1(0x21b)](_0x27fd9b[_0x4a24e1(0x1ab)]['HelpBgType']):(_0x3c7ed8[_0x4a24e1(0x34e)]=_0x2701cf,AudioManager[_0x4a24e1(0x5c2)](_0x3c7ed8)));}),PluginManager['registerCommand'](pluginData[_0xa0779(0x912)],_0xa0779(0x30f),_0x2c06be=>{const _0x5d0d10=_0xa0779;VisuMZ[_0x5d0d10(0x510)](_0x2c06be,_0x2c06be);const _0x22eade=Math[_0x5d0d10(0x4ee)](_0x2c06be['volume'])[_0x5d0d10(0x1f6)](0x0,0x64),_0xdde71f=AudioManager['_currentBgs'];_0xdde71f&&(_0xdde71f[_0x5d0d10(0x674)]=_0x22eade,AudioManager[_0x5d0d10(0x1c1)](_0xdde71f));}),PluginManager[_0xa0779(0x24b)](pluginData[_0xa0779(0x912)],_0xa0779(0x5df),_0x7e20ed=>{const _0x5ce6d9=_0xa0779;VisuMZ['ConvertParams'](_0x7e20ed,_0x7e20ed);const _0x261f81=Math[_0x5ce6d9(0x4ee)](_0x7e20ed['pitch'])['clamp'](0x32,0x96),_0x2a6571=AudioManager['_currentBgs'];_0x2a6571&&(_0x2a6571[_0x5ce6d9(0x3de)]=_0x261f81,AudioManager[_0x5ce6d9(0x1c1)](_0x2a6571));}),PluginManager['registerCommand'](pluginData[_0xa0779(0x912)],_0xa0779(0x4a2),_0x3f409c=>{const _0xf613d3=_0xa0779;VisuMZ['ConvertParams'](_0x3f409c,_0x3f409c);const _0x5ed0b6=Math[_0xf613d3(0x4ee)](_0x3f409c['pan'])[_0xf613d3(0x1f6)](-0x64,0x64),_0x56c76f=AudioManager[_0xf613d3(0x5c1)];_0x56c76f&&(_0xf613d3(0x401)!=='UdJJo'?_0x35273a&&_0x177bff['push'](_0x4739b9):(_0x56c76f['pan']=_0x5ed0b6,AudioManager[_0xf613d3(0x1c1)](_0x56c76f)));}),PluginManager[_0xa0779(0x24b)](pluginData['name'],_0xa0779(0x9bc),_0x2e0441=>{const _0x3eb71e=_0xa0779;if(!$gameTemp[_0x3eb71e(0x6bb)]())return;const _0x4d255e=Input[_0x3eb71e(0x3c3)]();navigator[_0x3eb71e(0x39f)]&&(_0x3eb71e(0x9b6)===_0x3eb71e(0x9b6)?navigator['clipboard']['writeText'](_0x4d255e):(this[_0x3eb71e(0x44e)]['x']=_0x8b0232['anchor']()['x'],this[_0x3eb71e(0x44e)]['y']=_0x1e6a63[_0x3eb71e(0x44e)]()['y']));}),PluginManager[_0xa0779(0x24b)](pluginData['name'],_0xa0779(0x7a3),_0x1f2d63=>{const _0x28ebad=_0xa0779;if(!$gameTemp[_0x28ebad(0x6bb)]())return;if(!Utils[_0x28ebad(0x812)]())return;SceneManager['_scene'][_0x28ebad(0x438)]=![],VisuMZ['CoreEngine']['ExportStrFromAllMaps']();}),PluginManager[_0xa0779(0x24b)](pluginData[_0xa0779(0x912)],_0xa0779(0x80f),_0x16b902=>{const _0x341f7f=_0xa0779;if(!$gameTemp[_0x341f7f(0x6bb)]())return;if(!Utils[_0x341f7f(0x812)]())return;SceneManager[_0x341f7f(0x6a6)][_0x341f7f(0x438)]=![],VisuMZ[_0x341f7f(0x824)][_0x341f7f(0x159)]();}),PluginManager[_0xa0779(0x24b)](pluginData[_0xa0779(0x912)],'ExportCurMapText',_0x360bf7=>{const _0x29d8b3=_0xa0779;if(!$gameTemp[_0x29d8b3(0x6bb)]())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap[_0x29d8b3(0x9cf)]()<=0x0)return;VisuMZ[_0x29d8b3(0x510)](_0x360bf7,_0x360bf7);const _0x5e4939=_0x29d8b3(0x869)[_0x29d8b3(0x6ad)]($gameMap['mapId']()[_0x29d8b3(0x526)](0x3)),_0x39a69e=VisuMZ[_0x29d8b3(0x824)][_0x29d8b3(0x2a9)]($gameMap[_0x29d8b3(0x9cf)]());VisuMZ[_0x29d8b3(0x824)]['ExportString'](_0x39a69e,_0x5e4939,!![]);}),PluginManager[_0xa0779(0x24b)](pluginData['name'],'ExportCurTroopText',_0x54a78a=>{const _0x265f82=_0xa0779;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;if(!$gameParty[_0x265f82(0x374)]())return;VisuMZ['ConvertParams'](_0x54a78a,_0x54a78a);const _0x59cd8a=_0x265f82(0x70f)[_0x265f82(0x6ad)]($gameTroop['_troopId'][_0x265f82(0x526)](0x4)),_0x1edde5=VisuMZ[_0x265f82(0x824)]['ExtractStrFromTroop']($gameTroop[_0x265f82(0x833)]);VisuMZ['CoreEngine']['ExportString'](_0x1edde5,_0x59cd8a,!![]);}),VisuMZ[_0xa0779(0x824)][_0xa0779(0x952)]=function(_0x54fec6,_0x24728c,_0x44d540){const _0x1bf4dc=_0xa0779,_0x191b46=require('fs');let _0x2bf308=_0x1bf4dc(0x313)['format'](_0x24728c||'0');_0x191b46['writeFile'](_0x2bf308,_0x54fec6,_0x3bfd70=>{const _0x1ae140=_0x1bf4dc;if(_0x1ae140(0x5af)!==_0x1ae140(0x556)){if(_0x3bfd70)throw err;else _0x44d540&&alert(_0x1ae140(0x6d4)[_0x1ae140(0x6ad)](_0x2bf308));}else this[_0x1ae140(0x30e)]();});},VisuMZ[_0xa0779(0x824)][_0xa0779(0x469)]=function(){const _0x18bfc0=_0xa0779,_0x4d497d=[];for(const _0x220b77 of $dataMapInfos){if(_0x18bfc0(0x191)!==_0x18bfc0(0x191))_0x389124[_0x18bfc0(0x653)](),this['processBack']();else{if(!_0x220b77)continue;_0x4d497d[_0x18bfc0(0x55f)](_0x220b77['id']);}}const _0x2629c8=_0x4d497d['length']*0x64+Math[_0x18bfc0(0x1ee)](0x64);alert(_0x18bfc0(0x9c1)[_0x18bfc0(0x6ad)](_0x2629c8)),this['_storedMapText']=[],this[_0x18bfc0(0x8cc)]=$dataMap;for(const _0x3789fd of _0x4d497d){VisuMZ[_0x18bfc0(0x824)][_0x18bfc0(0x48f)](_0x3789fd);}setTimeout(VisuMZ[_0x18bfc0(0x824)][_0x18bfc0(0x248)][_0x18bfc0(0x30a)](this),_0x2629c8);},VisuMZ[_0xa0779(0x824)]['loadMapData']=function(_0x1ee3b9){const _0x1ca2da=_0xa0779,_0xbf3766=_0x1ca2da(0x58e)[_0x1ca2da(0x6ad)](_0x1ee3b9[_0x1ca2da(0x526)](0x3)),_0x32861e=new XMLHttpRequest(),_0x2fa69d=_0x1ca2da(0x769)+_0xbf3766;_0x32861e[_0x1ca2da(0x8db)](_0x1ca2da(0x631),_0x2fa69d),_0x32861e[_0x1ca2da(0x8ce)](_0x1ca2da(0x8b0)),_0x32861e[_0x1ca2da(0x502)]=()=>this[_0x1ca2da(0x61d)](_0x32861e,_0x1ee3b9,_0xbf3766,_0x2fa69d),_0x32861e[_0x1ca2da(0x682)]=()=>DataManager['onXhrError']('$dataMap',_0xbf3766,_0x2fa69d),_0x32861e['send']();},VisuMZ['CoreEngine']['storeMapData']=function(_0x2508a8,_0x35b81f,_0x319c68,_0x2a89bd){const _0x332248=_0xa0779;$dataMap=JSON[_0x332248(0x31f)](_0x2508a8[_0x332248(0x2f5)]),DataManager['onLoad']($dataMap),this[_0x332248(0x52f)][_0x35b81f]=VisuMZ[_0x332248(0x824)][_0x332248(0x2a9)](_0x35b81f),$dataMap=this[_0x332248(0x8cc)];},VisuMZ[_0xa0779(0x824)]['exportAllMapStrings']=function(){const _0x1ad308=_0xa0779,_0x26d6de=_0x1ad308(0x3c0);this[_0x1ad308(0x52f)][_0x1ad308(0x99c)](undefined)[_0x1ad308(0x99c)]('')[_0x1ad308(0x99c)](null);const _0x1a079c=this[_0x1ad308(0x52f)][_0x1ad308(0x43f)]('\x0a\x0a\x0a\x0a\x0a')[_0x1ad308(0x64c)]();VisuMZ[_0x1ad308(0x824)][_0x1ad308(0x952)](_0x1a079c,_0x26d6de,!![]),SceneManager[_0x1ad308(0x6a6)]['_active']=!![];},VisuMZ[_0xa0779(0x824)][_0xa0779(0x2a9)]=function(_0x594004){const _0x50f43d=_0xa0779;if(!$dataMap)return'';let _0x29091e='█'[_0x50f43d(0x79a)](0x46)+'\x0a\x0a',_0x11b030='═'[_0x50f43d(0x79a)](0x46)+'\x0a\x0a',_0x3af963='';this[_0x50f43d(0x52c)]=0x0;for(const _0x5dcd64 of $dataMap[_0x50f43d(0x354)]){if(!_0x5dcd64)continue;let _0x3f753a=_0x5dcd64['id'],_0x49fe1b=_0x5dcd64[_0x50f43d(0x912)],_0x2fa2a1=_0x5dcd64[_0x50f43d(0x89f)];for(const _0x47c111 of _0x2fa2a1){const _0x338129=_0x2fa2a1[_0x50f43d(0x4f1)](_0x47c111)+0x1;let _0x5c9df9=_0x11b030+_0x50f43d(0x536),_0x334a8f=VisuMZ['CoreEngine']['ExtractStrFromList'](_0x47c111['list']);if(_0x334a8f[_0x50f43d(0x444)]>0x0){if(_0x3af963[_0x50f43d(0x444)]>0x0)_0x3af963+=_0x11b030+'\x0a\x0a\x0a\x0a\x0a';else{if('jYWiM'===_0x50f43d(0x30d))return 0xc0;else{const _0x4f68ee=$dataMapInfos[_0x594004]['name'];_0x3af963+=_0x29091e+_0x50f43d(0x22c)['format'](_0x594004,_0x4f68ee||_0x50f43d(0x49f))+_0x29091e;}}_0x3af963+=_0x5c9df9['format'](_0x3f753a,_0x49fe1b,_0x338129,_0x334a8f);}}}if(_0x3af963[_0x50f43d(0x444)]>0x0){if(_0x50f43d(0x9e8)===_0x50f43d(0x9e8))_0x3af963+=_0x11b030;else{if(_0x1c0b89)_0x28f11c['sceneTerminationClearEffects']();_0x5ed508[_0x50f43d(0x824)]['Scene_Base_terminateAnimationClearBugFix'][_0x50f43d(0x398)](this);}}return _0x3af963;},VisuMZ[_0xa0779(0x824)][_0xa0779(0x159)]=function(){const _0x5b41da=_0xa0779,_0x3eb2ca=$dataTroops[_0x5b41da(0x444)]*0xa+Math[_0x5b41da(0x1ee)](0xa);alert(_0x5b41da(0x95a)[_0x5b41da(0x6ad)](_0x3eb2ca));const _0x26435d=[];for(const _0x3eb3b2 of $dataTroops){if(!_0x3eb3b2)continue;const _0x276e52=_0x3eb3b2['id'];_0x26435d[_0x276e52]=VisuMZ['CoreEngine'][_0x5b41da(0x58b)](_0x276e52);}setTimeout(VisuMZ[_0x5b41da(0x824)][_0x5b41da(0x93a)]['bind'](this,_0x26435d),_0x3eb2ca);},VisuMZ['CoreEngine'][_0xa0779(0x58b)]=function(_0xfb99c5){const _0x47377b=_0xa0779;if(!$dataTroops[_0xfb99c5])return'';let _0x5c3a65='█'['repeat'](0x46)+'\x0a\x0a',_0x331809='═'['repeat'](0x46)+'\x0a\x0a',_0x38b1e4='';this['_commonEventLayers']=0x0;const _0x32859c=$dataTroops[_0xfb99c5];let _0x1aa72c=_0x32859c[_0x47377b(0x89f)];for(const _0x4dcbff of _0x1aa72c){if('cdLbT'!==_0x47377b(0x6d6)){this[_0x47377b(0x9b3)]();for(let _0x5bed24=0x0;_0x5bed24<_0x3d562e[_0x47377b(0x1b7)][_0x47377b(0x604)];_0x5bed24++){const _0x1d7046=new _0x31d416[(_0x47377b(0x358))]();_0x1d7046['setSize'](0x800,0x800),_0x773848[_0x47377b(0x824)][_0x47377b(0x17f)]['QoL'][_0x47377b(0x8c9)]&&(_0x1d7046[_0x47377b(0x738)]=_0x55af28[_0x47377b(0x53e)][_0x47377b(0x9a6)]),this['_internalTextures']['push'](_0x1d7046);}}else{const _0x172ea5=_0x1aa72c[_0x47377b(0x4f1)](_0x4dcbff)+0x1;let _0x272140=_0x331809+_0x47377b(0x2cc),_0x4610d9=VisuMZ['CoreEngine'][_0x47377b(0x400)](_0x4dcbff[_0x47377b(0x591)]);if(_0x4610d9[_0x47377b(0x444)]>0x0){if('AEZMS'!==_0x47377b(0x14c)){if(_0x38b1e4['length']>0x0){if(_0x47377b(0x247)===_0x47377b(0x97f)){_0x558280[_0x47377b(0x824)][_0x47377b(0x3f2)][_0x47377b(0x398)](this);if(_0x2fd388[_0x47377b(0x165)]>=_0x47377b(0x3d2)){if(typeof _0x25ae4b===_0x47377b(0x603))_0x1eb801['App'][_0x47377b(0x3c7)]();}}else _0x38b1e4+=_0x331809+_0x47377b(0x318);}else _0x38b1e4+=_0x5c3a65+_0x47377b(0x7be)[_0x47377b(0x6ad)](_0xfb99c5,_0x32859c[_0x47377b(0x912)]||_0x47377b(0x49f))+_0x5c3a65;_0x38b1e4+=_0x272140[_0x47377b(0x6ad)](_0x172ea5,_0x4610d9);}else _0x27e761=_0x48bd04[_0x47377b(0x9a9)](),_0x2407ac=_0x432808[_0x47377b(0x566)]();}}}return _0x38b1e4[_0x47377b(0x444)]>0x0&&(_0x38b1e4+=_0x331809),_0x38b1e4;},VisuMZ['CoreEngine'][_0xa0779(0x93a)]=function(_0x1d010f){const _0x99c2e4=_0xa0779,_0x5980d7=_0x99c2e4(0x2c4);_0x1d010f[_0x99c2e4(0x99c)](undefined)[_0x99c2e4(0x99c)]('')['remove'](null);const _0x570b07=_0x1d010f[_0x99c2e4(0x43f)](_0x99c2e4(0x318))['trim']();VisuMZ[_0x99c2e4(0x824)][_0x99c2e4(0x952)](_0x570b07,_0x5980d7,!![]),SceneManager[_0x99c2e4(0x6a6)][_0x99c2e4(0x438)]=!![];},VisuMZ[_0xa0779(0x824)][_0xa0779(0x400)]=function(_0x1e1937){const _0x2af397=_0xa0779;let _0x406ca1='\x0a'+'─'[_0x2af397(0x79a)](0x46)+'\x0a',_0x11f093='\x0a'+'┄'[_0x2af397(0x79a)](0x46)+'\x0a',_0x59209f='';for(const _0xecad9e of _0x1e1937){if(!_0xecad9e)continue;if(_0xecad9e[_0x2af397(0x679)]===0x65)_0x59209f+=_0x406ca1+'\x0a',_0x59209f+='〘Show\x20Text〙\x0a',_0xecad9e['parameters'][0x4]!==''&&_0xecad9e[_0x2af397(0x89e)][0x4]!==undefined&&(_0x59209f+='【%1】\x0a'[_0x2af397(0x6ad)](_0xecad9e['parameters'][0x4]));else{if(_0xecad9e[_0x2af397(0x679)]===0x191){if(_0x2af397(0x62d)==='MkqPd')return _0x6289d5[_0x2af397(0x1ab)]['HelpRect']['call'](this);else _0x59209f+='%1\x0a'[_0x2af397(0x6ad)](_0xecad9e[_0x2af397(0x89e)][0x0]);}else{if(_0xecad9e[_0x2af397(0x679)]===0x192)_0x2af397(0x1af)==='droeg'?(_0x59209f+=_0x406ca1,_0x59209f+=_0x2af397(0x75c)['format'](_0x11f093,_0xecad9e[_0x2af397(0x89e)][0x0]+0x1,_0xecad9e['parameters'][0x1])):_0x3d1793+=_0x15194d+_0x2af397(0x318);else{if(_0xecad9e[_0x2af397(0x679)]===0x193)'SfuLI'===_0x2af397(0x792)?(this[_0x2af397(0x1e1)]['update'](),this[_0x2af397(0x6fb)][_0x2af397(0x966)](),this['_windowLayer'][_0x2af397(0x939)]=![],_0x235609[_0x2af397(0x6c7)]()):(_0x59209f+=_0x406ca1,_0x59209f+=_0x2af397(0x849)[_0x2af397(0x6ad)](_0x11f093));else{if(_0xecad9e['code']===0x194)_0x2af397(0x78a)==='ecaui'?(_0x59209f+=_0x406ca1,_0x59209f+='%1〘End\x20Choice\x20Selection〙%1'[_0x2af397(0x6ad)](_0x11f093)):this[_0x2af397(0x424)]();else{if(_0xecad9e[_0x2af397(0x679)]===0x69)'EDaAH'!=='EDaAH'?(this['_pageupButton']['x']=-0x1*(this[_0x2af397(0x692)][_0x2af397(0x3c5)]+this[_0x2af397(0x82d)][_0x2af397(0x3c5)]+0x8),this['_pagedownButton']['x']=-0x1*(this[_0x2af397(0x82d)]['width']+0x4)):(_0x59209f+=_0x406ca1+'\x0a',_0x59209f+='〘Scrolling\x20Text〙\x0a');else{if(_0xecad9e[_0x2af397(0x679)]===0x6c)_0x59209f+=_0x406ca1+'\x0a',_0x59209f+=_0x2af397(0x5d7)[_0x2af397(0x6ad)](_0xecad9e['parameters'][0x0]);else{if(_0xecad9e[_0x2af397(0x679)]===0x198){if(_0x2af397(0x39e)!==_0x2af397(0x176))_0x59209f+='%1\x0a'[_0x2af397(0x6ad)](_0xecad9e[_0x2af397(0x89e)][0x0]);else return _0x58cc08[_0x2af397(0x1ab)]['StatusRect'][_0x2af397(0x398)](this);}else{if(_0xecad9e[_0x2af397(0x679)]===0x75){if('betnG'==='qQmCs'){_0x46b34e[_0x2af397(0x510)](_0x55910e,_0x5672a3);const _0x301ccd=_0x549a58['option']||0x1;_0x27416['setMainFontSize'](_0x301ccd);}else{const _0x28b4b5=$dataCommonEvents[_0xecad9e[_0x2af397(0x89e)][0x0]];if(_0x28b4b5&&this[_0x2af397(0x52c)]<=0xa){if(_0x2af397(0x7a0)===_0x2af397(0x7a0)){this['_commonEventLayers']++;let _0x35c5e1=VisuMZ['CoreEngine'][_0x2af397(0x400)](_0x28b4b5[_0x2af397(0x591)]);_0x35c5e1[_0x2af397(0x444)]>0x0&&(_0x59209f+=_0x406ca1,_0x59209f+=_0x11f093,_0x59209f+=_0x2af397(0x83a)[_0x2af397(0x6ad)](_0x28b4b5['id'],_0x28b4b5[_0x2af397(0x912)]),_0x59209f+=_0x11f093,_0x59209f+=_0x35c5e1,_0x59209f+=_0x11f093,_0x59209f+=_0x2af397(0x700)[_0x2af397(0x6ad)](_0x28b4b5['id'],_0x28b4b5[_0x2af397(0x912)]),_0x59209f+=_0x11f093),this[_0x2af397(0x52c)]--;}else this[_0x2af397(0x65c)]&&this['_helpWindow'][_0x2af397(0x21b)](_0x234912['layoutSettings']['HelpBgType']),this[_0x2af397(0x162)]&&this[_0x2af397(0x162)][_0x2af397(0x21b)](_0x50aee2['layoutSettings']['ListBgType']);}}}}}}}}}}}}return _0x59209f['length']>0x0&&(_0x59209f+=_0x406ca1),_0x59209f;},PluginManager[_0xa0779(0x24b)](pluginData[_0xa0779(0x912)],_0xa0779(0x7e6),_0x5e84bf=>{const _0x5e9942=_0xa0779;VisuMZ['ConvertParams'](_0x5e84bf,_0x5e84bf);const _0x4e778f=_0x5e84bf['URL'];VisuMZ[_0x5e9942(0x8d4)](_0x4e778f);}),PluginManager[_0xa0779(0x24b)](pluginData[_0xa0779(0x912)],_0xa0779(0x2f0),_0x492be0=>{const _0x564ac2=_0xa0779;VisuMZ['ConvertParams'](_0x492be0,_0x492be0);const _0x354b3e=_0x492be0[_0x564ac2(0x9c5)]||0x0;$gameParty[_0x564ac2(0x14f)](_0x354b3e);}),PluginManager[_0xa0779(0x24b)](pluginData[_0xa0779(0x912)],_0xa0779(0x348),_0x4d8502=>{const _0x3b7b4d=_0xa0779;if(!SceneManager[_0x3b7b4d(0x9aa)]())return;VisuMZ[_0x3b7b4d(0x510)](_0x4d8502,_0x4d8502);const _0x4598d7=_0x4d8502['CommonEventID'];SceneManager[_0x3b7b4d(0x6a6)]['playOnceParallelInterpreter'](_0x4598d7);}),PluginManager[_0xa0779(0x24b)](pluginData[_0xa0779(0x912)],_0xa0779(0x910),_0x12bfe8=>{const _0x40dd92=_0xa0779;if(!$gameTemp[_0x40dd92(0x6bb)]())return;if(!Utils[_0x40dd92(0x812)]())return;VisuMZ[_0x40dd92(0x510)](_0x12bfe8,_0x12bfe8);const _0x4cacaf=_0x12bfe8[_0x40dd92(0x794)]||0x1;$gameTemp[_0x40dd92(0x7a4)]=_0x4cacaf;}),PluginManager[_0xa0779(0x24b)](pluginData[_0xa0779(0x912)],'PictureEasingType',_0x413352=>{const _0x23b360=_0xa0779;VisuMZ[_0x23b360(0x510)](_0x413352,_0x413352);const _0x295056=_0x413352[_0x23b360(0x41c)]||0x1,_0x40b525=_0x413352[_0x23b360(0x642)]||_0x23b360(0x382),_0x1a9a4a=$gameScreen['picture'](_0x295056);_0x1a9a4a&&_0x1a9a4a[_0x23b360(0x576)](_0x40b525);}),PluginManager[_0xa0779(0x24b)](pluginData[_0xa0779(0x912)],_0xa0779(0x7b4),_0x5f3eb5=>{const _0x50224b=_0xa0779;for(let _0x5638d2=0x1;_0x5638d2<=0x64;_0x5638d2++){$gameScreen[_0x50224b(0x16b)](_0x5638d2);}}),PluginManager[_0xa0779(0x24b)](pluginData[_0xa0779(0x912)],'PictureEraseRange',_0x2bde2e=>{const _0x4fe6c7=_0xa0779;VisuMZ['ConvertParams'](_0x2bde2e,_0x2bde2e);const _0x3549aa=Math[_0x4fe6c7(0x15d)](_0x2bde2e['StartID'],_0x2bde2e['EndingID']),_0x1511e9=Math['max'](_0x2bde2e['StartID'],_0x2bde2e[_0x4fe6c7(0x69b)]);for(let _0x31ad37=_0x3549aa;_0x31ad37<=_0x1511e9;_0x31ad37++){if(_0x4fe6c7(0x81e)!==_0x4fe6c7(0x81e))return 7.5625*_0x11d58b*_0xc67a71;else $gameScreen[_0x4fe6c7(0x16b)](_0x31ad37);}}),PluginManager[_0xa0779(0x24b)](pluginData[_0xa0779(0x912)],_0xa0779(0x410),_0x3cafdf=>{const _0x4efeae=_0xa0779;VisuMZ['ConvertParams'](_0x3cafdf,_0x3cafdf);const _0x4a471b=Math[_0x4efeae(0x4ee)](_0x3cafdf[_0x4efeae(0x794)])[_0x4efeae(0x1f6)](0x1,0x64),_0x4883e2=_0x3cafdf['Settings'],_0x37caf5=_0x4883e2[_0x4efeae(0x5ab)][_0x4efeae(0x1f6)](0x0,0x1),_0x3b64a0=Math[_0x4efeae(0x4ee)](_0x4883e2['PositionX']||0x0),_0x4dd04c=Math['round'](_0x4883e2[_0x4efeae(0x81a)]||0x0),_0x2f75ee=Math[_0x4efeae(0x4ee)](_0x4883e2[_0x4efeae(0x24d)]||0x0),_0x35b518=Math[_0x4efeae(0x4ee)](_0x4883e2[_0x4efeae(0x465)]||0x0),_0x2e6c79=Math[_0x4efeae(0x4ee)](_0x4883e2[_0x4efeae(0x97e)])[_0x4efeae(0x1f6)](0x0,0xff),_0x39d551=_0x4883e2[_0x4efeae(0x230)],_0x5b136f=_0x4efeae(0x4a7),_0x4e6d24=_0x3cafdf[_0x4efeae(0x86f)]?_0x4efeae(0x86f):_0x4efeae(0x301),_0x40a354=_0x5b136f[_0x4efeae(0x6ad)](_0x3cafdf['IconIndex'],_0x4e6d24);$gameScreen['showPicture'](_0x4a471b,_0x40a354,_0x37caf5,_0x3b64a0,_0x4dd04c,_0x2f75ee,_0x35b518,_0x2e6c79,_0x39d551);}),PluginManager[_0xa0779(0x24b)](pluginData[_0xa0779(0x912)],_0xa0779(0x719),_0x39e103=>{const _0x3848f9=_0xa0779;VisuMZ[_0x3848f9(0x510)](_0x39e103,_0x39e103);const _0x5d0dd2=_0x39e103[_0x3848f9(0x8fa)]||_0x3848f9(0x5cd),_0x396644=_0x39e103[_0x3848f9(0x66b)][_0x3848f9(0x1f6)](0x1,0x9),_0xe5e2ac=_0x39e103['Speed'][_0x3848f9(0x1f6)](0x1,0x9),_0x577e25=_0x39e103[_0x3848f9(0x23c)]||0x1,_0x224c2d=_0x39e103[_0x3848f9(0x56b)];$gameScreen[_0x3848f9(0x45b)](_0x5d0dd2),$gameScreen['startShake'](_0x396644,_0xe5e2ac,_0x577e25);if(_0x224c2d){if(_0x3848f9(0x148)===_0x3848f9(0x903))_0x2cf82[_0x3848f9(0x41b)](_0x3848f9(0x2ae))&&_0x234e72[_0x3848f9(0x824)][_0x3848f9(0x17f)][_0x3848f9(0x2b0)][_0x3848f9(0x68e)]?this[_0x3848f9(0x75e)]():_0x4d0ef1[_0x3848f9(0x824)][_0x3848f9(0x39a)][_0x3848f9(0x398)](this);else{const _0x100647=$gameTemp[_0x3848f9(0x821)]();if(_0x100647)_0x100647[_0x3848f9(0x91d)](_0x577e25);}}}),PluginManager['registerCommand'](pluginData[_0xa0779(0x912)],'SwitchRandomizeOne',_0x130bce=>{const _0x29b587=_0xa0779;if($gameParty[_0x29b587(0x374)]())return;VisuMZ[_0x29b587(0x510)](_0x130bce,_0x130bce);const _0x2ac1d4=_0x130bce[_0x29b587(0x90e)],_0x249ffb=(_0x130bce[_0x29b587(0x986)]||0x0)/0x64;for(const _0x1c562c of _0x2ac1d4){if(_0x29b587(0x602)!==_0x29b587(0x4c9)){const _0x166afd=Math['random']()<=_0x249ffb;$gameSwitches['setValue'](_0x1c562c,_0x166afd);}else return _0xd1a68d[_0x29b587(0x164)]()||_0x113f4f[_0x29b587(0x85f)]()?_0x4edf5d[_0x29b587(0x824)][_0x29b587(0x17f)][_0x29b587(0x2c3)][_0x29b587(0x65e)]:_0x29b587(0x347);}}),PluginManager['registerCommand'](pluginData[_0xa0779(0x912)],_0xa0779(0x89a),_0x258901=>{const _0x193aac=_0xa0779;if($gameParty[_0x193aac(0x374)]())return;VisuMZ[_0x193aac(0x510)](_0x258901,_0x258901);const _0x262945=Math[_0x193aac(0x15d)](_0x258901[_0x193aac(0x47e)],_0x258901[_0x193aac(0x69b)]),_0x4260e0=Math[_0x193aac(0x274)](_0x258901[_0x193aac(0x47e)],_0x258901[_0x193aac(0x69b)]),_0xdde2f8=(_0x258901['Chance']||0x0)/0x64;for(let _0x30dc61=_0x262945;_0x30dc61<=_0x4260e0;_0x30dc61++){const _0x530ab5=Math['random']()<=_0xdde2f8;$gameSwitches[_0x193aac(0x9d0)](_0x30dc61,_0x530ab5);}}),PluginManager[_0xa0779(0x24b)](pluginData[_0xa0779(0x912)],_0xa0779(0x7f8),_0x238ac5=>{const _0x2738a9=_0xa0779;if($gameParty['inBattle']())return;VisuMZ[_0x2738a9(0x510)](_0x238ac5,_0x238ac5);const _0x7fb631=_0x238ac5['IDs'];for(const _0x134270 of _0x7fb631){if('EYnQE'!==_0x2738a9(0x637)){const _0x31fad5=$gameSwitches['value'](_0x134270);$gameSwitches[_0x2738a9(0x9d0)](_0x134270,!_0x31fad5);}else _0x2fe3e2+=this['_list'][_0x14cc9d]['parameters'][0x0]+'\x0a',_0x526d07++;}}),PluginManager[_0xa0779(0x24b)](pluginData['name'],'SwitchToggleRange',_0x479a53=>{const _0x586195=_0xa0779;if($gameParty[_0x586195(0x374)]())return;VisuMZ['ConvertParams'](_0x479a53,_0x479a53);const _0x345845=Math['min'](_0x479a53[_0x586195(0x47e)],_0x479a53[_0x586195(0x69b)]),_0x284e63=Math[_0x586195(0x274)](_0x479a53[_0x586195(0x47e)],_0x479a53[_0x586195(0x69b)]);for(let _0xee8deb=_0x345845;_0xee8deb<=_0x284e63;_0xee8deb++){if('vYFwi'!==_0x586195(0x371))_0x3487de[_0x586195(0x71e)]&&(this[_0x586195(0x655)]='STB');else{const _0x4edb6c=$gameSwitches['value'](_0xee8deb);$gameSwitches[_0x586195(0x9d0)](_0xee8deb,!_0x4edb6c);}}}),PluginManager[_0xa0779(0x24b)](pluginData[_0xa0779(0x912)],_0xa0779(0x9b2),_0x135e88=>{const _0x5ac48a=_0xa0779;VisuMZ[_0x5ac48a(0x510)](_0x135e88,_0x135e88);const _0x5aa582=_0x135e88['option']||0x1;$gameSystem[_0x5ac48a(0x883)](_0x5aa582);}),PluginManager[_0xa0779(0x24b)](pluginData['name'],_0xa0779(0x677),_0x3cc17b=>{const _0x2ac99f=_0xa0779;if($gameParty['inBattle']())return;VisuMZ[_0x2ac99f(0x510)](_0x3cc17b,_0x3cc17b);const _0x1326c0=_0x3cc17b[_0x2ac99f(0x1df)];if(_0x1326c0[_0x2ac99f(0x758)](/Front/i))$gameSystem['setSideView'](![]);else{if(_0x1326c0['match'](/Side/i)){if(_0x2ac99f(0x785)===_0x2ac99f(0x785))$gameSystem[_0x2ac99f(0x52e)](!![]);else{const _0x325133=_0x2ac99f(0x3c0);this[_0x2ac99f(0x52f)][_0x2ac99f(0x99c)](_0x1c505e)[_0x2ac99f(0x99c)]('')[_0x2ac99f(0x99c)](null);const _0x5bcc50=this[_0x2ac99f(0x52f)]['join'](_0x2ac99f(0x318))[_0x2ac99f(0x64c)]();_0x4d4e7b[_0x2ac99f(0x824)][_0x2ac99f(0x952)](_0x5bcc50,_0x325133,!![]),_0x31a27b[_0x2ac99f(0x6a6)][_0x2ac99f(0x438)]=!![];}}else $gameSystem[_0x2ac99f(0x52e)](!$gameSystem[_0x2ac99f(0x6b0)]());}}),PluginManager['registerCommand'](pluginData[_0xa0779(0x912)],_0xa0779(0x3e7),_0x58b6ff=>{const _0x2e7959=_0xa0779;if($gameParty[_0x2e7959(0x374)]())return;VisuMZ[_0x2e7959(0x510)](_0x58b6ff,_0x58b6ff);const _0x50c651=[_0x2e7959(0x656),_0x2e7959(0x3d7),'me','se'];for(const _0x3da21a of _0x50c651){if(_0x2e7959(0x508)!==_0x2e7959(0x70e)){const _0x38460e=_0x58b6ff[_0x3da21a],_0x588f81=_0x2e7959(0x4bc)[_0x2e7959(0x6ad)](_0x3da21a);for(const _0x5a4223 of _0x38460e){AudioManager['createBuffer'](_0x588f81,_0x5a4223);}}else return _0x4a6a39['CoreEngine'][_0x2e7959(0x17f)]['QoL'][_0x2e7959(0x9a4)];}}),PluginManager[_0xa0779(0x24b)](pluginData['name'],'SystemLoadImages',_0x175bda=>{const _0x43abfc=_0xa0779;if($gameParty[_0x43abfc(0x374)]())return;VisuMZ[_0x43abfc(0x510)](_0x175bda,_0x175bda);const _0x33ae9e=[_0x43abfc(0x745),_0x43abfc(0x3fd),_0x43abfc(0x385),_0x43abfc(0x447),_0x43abfc(0x1b3),'faces',_0x43abfc(0x871),_0x43abfc(0x20a),_0x43abfc(0x320),_0x43abfc(0x96d),_0x43abfc(0x441),_0x43abfc(0x735),_0x43abfc(0x92c),_0x43abfc(0x581)];for(const _0x25a3aa of _0x33ae9e){if('HeYcX'===_0x43abfc(0x3d6))this['_fauxAnimationQueue']=[];else{const _0x5f1959=_0x175bda[_0x25a3aa],_0x305d34=_0x43abfc(0x4d0)[_0x43abfc(0x6ad)](_0x25a3aa);for(const _0x4e0a83 of _0x5f1959){ImageManager[_0x43abfc(0x95e)](_0x305d34,_0x4e0a83);}}}}),PluginManager['registerCommand'](pluginData[_0xa0779(0x912)],_0xa0779(0x6ed),_0x5c31f4=>{const _0x315da8=_0xa0779;if($gameParty['inBattle']())return;VisuMZ[_0x315da8(0x510)](_0x5c31f4,_0x5c31f4);const _0x3d2c82=_0x5c31f4['option'][_0x315da8(0x7c9)]()['trim'](),_0x12bf61=VisuMZ['CoreEngine'][_0x315da8(0x18b)](_0x3d2c82);$gameSystem[_0x315da8(0x7c6)](_0x12bf61);}),VisuMZ['CoreEngine'][_0xa0779(0x18b)]=function(_0x54912a){const _0x2bef87=_0xa0779;_0x54912a=_0x54912a||_0x2bef87(0x578),_0x54912a=String(_0x54912a)[_0x2bef87(0x7c9)]()['trim']();switch(_0x54912a){case'DTB':return 0x0;case _0x2bef87(0x63d):if(Imported[_0x2bef87(0x964)]){if(_0x2bef87(0x5f4)!==_0x2bef87(0x5f4))return _0x5670e5[_0x2bef87(0x824)]['Settings'][_0x2bef87(0x2b0)][_0x2bef87(0x935)]&&_0x5e4a24[_0x2bef87(0x7c8)]()?_0x21285f[_0x2bef87(0x310)]-0.05:_0x243634[_0x2bef87(0x310)];else ConfigManager[_0x2bef87(0x490)]=!![];}return 0x1;case _0x2bef87(0x695):if(Imported[_0x2bef87(0x964)]){if(_0x2bef87(0x3b0)===_0x2bef87(0x3b0))ConfigManager[_0x2bef87(0x490)]=![];else{var _0x5c5d8a=_0x3be93a(_0x35f169['$1']);_0x22247a*=_0x5c5d8a;}}return 0x2;case'CTB':if(Imported[_0x2bef87(0x363)]){if('hzdkG'===_0x2bef87(0x553))return _0x2bef87(0x88d);else this[_0x2bef87(0x65f)](_0x427a6a[_0x2bef87(0x824)][_0x2bef87(0x17f)][_0x2bef87(0x1d6)][_0x2bef87(0x561)],_0x5b4224,_0x3e3ece,_0x1030af,_0x2bef87(0x4b5));}break;case'STB':if(Imported[_0x2bef87(0x71e)])return _0x2bef87(0x6de);break;case'BTB':if(Imported['VisuMZ_2_BattleSystemBTB']){if('ZvEcy'===_0x2bef87(0x6ab)){if(_0x4a5400&&_0x4ef03a[_0x2bef87(0x87b)]){if(this[_0x2bef87(0x21a)](_0x2d3af5))return!![];if(this[_0x2bef87(0x9bd)](_0x5d5ebf))return!![];}}else return _0x2bef87(0x705);}break;case'FTB':if(Imported['VisuMZ_2_BattleSystemFTB'])return _0x2bef87(0x32d);break;case'OTB':if(Imported[_0x2bef87(0x409)]){if(_0x2bef87(0x40e)!==_0x2bef87(0x40e))_0x455f12=_0x2bef87(0x930)[_0x2bef87(0x6ad)](_0x46465c,_0x2d6fec);else return'OTB';}break;case _0x2bef87(0x515):if(Imported[_0x2bef87(0x961)]){if(_0x2bef87(0x7b1)!==_0x2bef87(0x26c))return _0x2bef87(0x515);else{let _0xc4e015=_0x3d0a01[_0x2bef87(0x274)](0x0,this[_0x2bef87(0x628)]());const _0x14f1cf=this['maxItems'](),_0x3a37cb=this[_0x2bef87(0x49a)]();if(this[_0x2bef87(0x5dd)]()&&_0xc4e015>0x0||_0x5558a9&&_0x3a37cb===0x1){_0xc4e015-=_0x3a37cb;if(_0xc4e015<=0x0)_0xc4e015=0x0;this[_0x2bef87(0x6c9)](_0xc4e015);}else!this[_0x2bef87(0x5dd)]()&&((_0xc4e015>=_0x3a37cb||_0x46ffc0&&_0x3a37cb===0x1)&&this['smoothSelect']((_0xc4e015-_0x3a37cb+_0x14f1cf)%_0x14f1cf));}}break;case _0x2bef87(0x238):if(Imported[_0x2bef87(0x808)]){if(_0x2bef87(0x61a)!==_0x2bef87(0x492))return'PTB';else _0x2417b9+=_0x1e0574(_0x47a437);}break;}return $dataSystem[_0x2bef87(0x8a7)];},PluginManager['registerCommand'](pluginData[_0xa0779(0x912)],_0xa0779(0x663),_0x3db92d=>{const _0x9ebdc9=_0xa0779;VisuMZ[_0x9ebdc9(0x510)](_0x3db92d,_0x3db92d);const _0x267406=_0x3db92d[_0x9ebdc9(0x1df)]||0x1;$gameSystem['setWindowPadding'](_0x267406);}),PluginManager[_0xa0779(0x24b)](pluginData[_0xa0779(0x912)],'VariableEvalReference',_0x2bb8e0=>{const _0x5c9ba3=_0xa0779;VisuMZ[_0x5c9ba3(0x510)](_0x2bb8e0,_0x2bb8e0);const _0x11f5f5=_0x2bb8e0['id']||0x1,_0x3c1896=_0x2bb8e0[_0x5c9ba3(0x258)],_0x314586=_0x2bb8e0[_0x5c9ba3(0x928)]||0x0;let _0x5694db=$gameVariables[_0x5c9ba3(0x9c5)](_0x11f5f5)||0x0;switch(_0x3c1896){case'=':_0x5694db=_0x314586;break;case'+':_0x5694db+=_0x314586;break;case'-':_0x5694db-=_0x314586;break;case'*':_0x5694db*=_0x314586;break;case'/':_0x5694db/=_0x314586;break;case'%':_0x5694db%=_0x314586;break;}_0x5694db=_0x5694db||0x0,$gameVariables[_0x5c9ba3(0x9d0)](_0x11f5f5,_0x5694db);}),PluginManager['registerCommand'](pluginData[_0xa0779(0x912)],_0xa0779(0x908),_0x50a3d4=>{const _0xb465ea=_0xa0779;VisuMZ[_0xb465ea(0x510)](_0x50a3d4,_0x50a3d4);const _0x547972=_0x50a3d4['id']()||0x1,_0xd8680=_0x50a3d4[_0xb465ea(0x258)],_0x4616b1=_0x50a3d4[_0xb465ea(0x928)]()||0x0;let _0x27ae17=$gameVariables['value'](_0x547972)||0x0;switch(_0xd8680){case'=':_0x27ae17=_0x4616b1;break;case'+':_0x27ae17+=_0x4616b1;break;case'-':_0x27ae17-=_0x4616b1;break;case'*':_0x27ae17*=_0x4616b1;break;case'/':_0x27ae17/=_0x4616b1;break;case'%':_0x27ae17%=_0x4616b1;break;}_0x27ae17=_0x27ae17||0x0,$gameVariables[_0xb465ea(0x9d0)](_0x547972,_0x27ae17);}),VisuMZ[_0xa0779(0x824)][_0xa0779(0x1c6)]=Scene_Boot[_0xa0779(0x271)][_0xa0779(0x4d1)],Scene_Boot['prototype'][_0xa0779(0x4d1)]=function(){const _0x25e0c8=_0xa0779;VisuMZ['CoreEngine'][_0x25e0c8(0x1c6)]['call'](this),this[_0x25e0c8(0x534)](),this[_0x25e0c8(0x70d)](),this[_0x25e0c8(0x90f)](),this[_0x25e0c8(0x525)](),this[_0x25e0c8(0x77c)](),this['process_VisuMZ_CoreEngine_ControllerButtons'](),VisuMZ[_0x25e0c8(0x166)]();},VisuMZ[_0xa0779(0x824)][_0xa0779(0x9c3)]={},Scene_Boot['prototype'][_0xa0779(0x534)]=function(){const _0x18f4b6=_0xa0779,_0x530b1e=[_0x18f4b6(0x37a),_0x18f4b6(0x8d2),_0x18f4b6(0x691),_0x18f4b6(0x29c),_0x18f4b6(0x418),_0x18f4b6(0x897),_0x18f4b6(0x1c8),'LUK'],_0x48a64e=['HIT','EVA',_0x18f4b6(0x552),_0x18f4b6(0x7d9),_0x18f4b6(0x3df),_0x18f4b6(0x7d1),_0x18f4b6(0x630),_0x18f4b6(0x399),'MRG',_0x18f4b6(0x938)],_0x9178cd=['TGR','GRD',_0x18f4b6(0x9d8),_0x18f4b6(0x3cc),_0x18f4b6(0x788),_0x18f4b6(0x983),'PDR',_0x18f4b6(0x867),_0x18f4b6(0x69a),_0x18f4b6(0x963)],_0x1f71a0=[_0x530b1e,_0x48a64e,_0x9178cd],_0x1281fb=[_0x18f4b6(0x892),'Plus1','Plus2',_0x18f4b6(0x7a1),'Rate','Rate1','Rate2',_0x18f4b6(0x945),_0x18f4b6(0x625),_0x18f4b6(0x5db)];for(const _0x318d11 of _0x1f71a0){let _0x4a94b4='';if(_0x318d11===_0x530b1e)_0x4a94b4=_0x18f4b6(0x4c1);if(_0x318d11===_0x48a64e)_0x4a94b4=_0x18f4b6(0x8ff);if(_0x318d11===_0x9178cd)_0x4a94b4=_0x18f4b6(0x41e);for(const _0x4a620a of _0x1281fb){let _0x3958aa=_0x18f4b6(0x317)['format'](_0x4a94b4,_0x4a620a);VisuMZ[_0x18f4b6(0x824)]['RegExp'][_0x3958aa]=[],VisuMZ[_0x18f4b6(0x824)][_0x18f4b6(0x9c3)][_0x3958aa+'JS']=[];let _0x106458=_0x18f4b6(0x8ae);if(['Plus','Flat'][_0x18f4b6(0x84f)](_0x4a620a))_0x106458+='([\x5c+\x5c-]\x5cd+)>';else{if(['Plus1',_0x18f4b6(0x625)][_0x18f4b6(0x84f)](_0x4a620a)){if(_0x18f4b6(0x312)===_0x18f4b6(0x312))_0x106458+=_0x18f4b6(0x4e4);else for(_0x24ab3f of _0x60df02[_0x18f4b6(0x88c)]()){_0x4eda53[_0x18f4b6(0x71f)]();}}else{if(['Plus2',_0x18f4b6(0x5db)][_0x18f4b6(0x84f)](_0x4a620a))'ZZrrr'!==_0x18f4b6(0x207)?_0x106458+=_0x18f4b6(0x96c):this[_0x18f4b6(0x655)]=_0x18f4b6(0x3f1);else{if(_0x4a620a==='Max')_0x106458+=_0x18f4b6(0x940);else{if(_0x4a620a===_0x18f4b6(0x880))_0x106458+=_0x18f4b6(0x215);else _0x4a620a===_0x18f4b6(0x46d)&&(_0x106458+=_0x18f4b6(0x5d3));}}}}for(const _0x85d33 of _0x318d11){if(_0x18f4b6(0x7ba)==='YCuvX')_0x23753d[_0x18f4b6(0x95e)](_0x31f18f,_0x53349a);else{let _0x42a028=_0x4a620a[_0x18f4b6(0x710)](/[\d+]/g,'')[_0x18f4b6(0x7c9)]();const _0x5c18ce=_0x106458[_0x18f4b6(0x6ad)](_0x85d33,_0x42a028);VisuMZ['CoreEngine'][_0x18f4b6(0x9c3)][_0x3958aa][_0x18f4b6(0x55f)](new RegExp(_0x5c18ce,'i'));const _0x5d19b8='<JS\x20%1\x20%2:[\x20](.*)>'[_0x18f4b6(0x6ad)](_0x85d33,_0x42a028);VisuMZ[_0x18f4b6(0x824)][_0x18f4b6(0x9c3)][_0x3958aa+'JS'][_0x18f4b6(0x55f)](new RegExp(_0x5d19b8,'i'));}}}}},Scene_Boot[_0xa0779(0x271)][_0xa0779(0x70d)]=function(){const _0xd61ffb=_0xa0779;if(VisuMZ[_0xd61ffb(0x166)])return;},Scene_Boot[_0xa0779(0x271)]['process_VisuMZ_CoreEngine_Settings']=function(){const _0x4e7fd9=_0xa0779,_0x3f1184=VisuMZ[_0x4e7fd9(0x824)][_0x4e7fd9(0x17f)];_0x3f1184[_0x4e7fd9(0x2b0)][_0x4e7fd9(0x405)]&&VisuMZ[_0x4e7fd9(0x30b)](!![]);_0x3f1184['QoL'][_0x4e7fd9(0x9a4)]&&(Input[_0x4e7fd9(0x6ff)][0x23]=_0x4e7fd9(0x654),Input[_0x4e7fd9(0x6ff)][0x24]='home');if(_0x3f1184[_0x4e7fd9(0x2c3)]){if(_0x4e7fd9(0x56e)!==_0x4e7fd9(0x56e)){if(this[_0x4e7fd9(0x1e2)]===_0x1bb435)this[_0x4e7fd9(0x322)]();if(this[_0x4e7fd9(0x1e2)][_0x4e7fd9(0x4f2)]===_0x53e1f8)this[_0x4e7fd9(0x322)]();return this[_0x4e7fd9(0x1e2)][_0x4e7fd9(0x4f2)];}else{const _0xbd068e=_0x3f1184[_0x4e7fd9(0x2c3)];_0xbd068e[_0x4e7fd9(0x470)]=_0xbd068e[_0x4e7fd9(0x470)]||_0x4e7fd9(0x773),_0xbd068e[_0x4e7fd9(0x7dd)]=_0xbd068e[_0x4e7fd9(0x7dd)]||'\x5c}❪TAB❫\x5c{';}}_0x3f1184[_0x4e7fd9(0x634)][_0x4e7fd9(0x640)]&&(Input[_0x4e7fd9(0x6ff)][0x57]='up',Input['keyMapper'][0x41]=_0x4e7fd9(0x67d),Input[_0x4e7fd9(0x6ff)][0x53]=_0x4e7fd9(0x38b),Input['keyMapper'][0x44]=_0x4e7fd9(0x4b5),Input[_0x4e7fd9(0x6ff)][0x45]=_0x4e7fd9(0x224)),_0x3f1184[_0x4e7fd9(0x634)][_0x4e7fd9(0x1a2)]&&(_0x4e7fd9(0x417)==='gIOEm'?(this[_0x4e7fd9(0x7a7)]['scale']['y']=0x1/this['scale']['y'],this['_pictureContainer']['y']=-(this['y']/this['scale']['y'])):Input['keyMapper'][0x52]=_0x4e7fd9(0x26d)),_0x3f1184['Param'][_0x4e7fd9(0x2ab)]=_0x3f1184[_0x4e7fd9(0x34a)][_0x4e7fd9(0x2ab)][_0x4e7fd9(0x357)](_0x482c37=>_0x482c37[_0x4e7fd9(0x7c9)]()[_0x4e7fd9(0x64c)]()),_0x3f1184[_0x4e7fd9(0x34a)][_0x4e7fd9(0x9b1)]=_0x3f1184['Param'][_0x4e7fd9(0x9b1)][_0x4e7fd9(0x357)](_0x18d93a=>_0x18d93a[_0x4e7fd9(0x7c9)]()[_0x4e7fd9(0x64c)]());},Scene_Boot[_0xa0779(0x271)]['process_VisuMZ_CoreEngine_Functions']=function(){const _0x314e95=_0xa0779;this[_0x314e95(0x7ad)]();},Scene_Boot['prototype'][_0xa0779(0x7ad)]=function(){const _0x14697b=_0xa0779,_0x24c918=VisuMZ[_0x14697b(0x824)][_0x14697b(0x17f)][_0x14697b(0x50b)];for(const _0xc645e5 of _0x24c918){const _0xa5a4e8=_0xc645e5['FunctionName'][_0x14697b(0x710)](/[ ]/g,''),_0x34ea1e=_0xc645e5[_0x14697b(0x468)];VisuMZ[_0x14697b(0x824)][_0x14697b(0x802)](_0xa5a4e8,_0x34ea1e);}},VisuMZ['CoreEngine'][_0xa0779(0x802)]=function(_0x2bba26,_0x1fae96){const _0x35aad4=_0xa0779;if(!!window[_0x2bba26]){if($gameTemp[_0x35aad4(0x6bb)]())console[_0x35aad4(0x47c)](_0x35aad4(0x5cc)[_0x35aad4(0x6ad)](_0x2bba26));}const _0x2f6338='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'[_0x35aad4(0x6ad)](_0x2bba26,_0x1fae96);window[_0x2bba26]=new Function(_0x2f6338);},Scene_Boot[_0xa0779(0x271)][_0xa0779(0x77c)]=function(){const _0x404e28=_0xa0779,_0x30ad99=VisuMZ['CoreEngine'][_0x404e28(0x17f)][_0x404e28(0x81b)];if(!_0x30ad99)return;for(const _0x1a68ec of _0x30ad99){if(!_0x1a68ec)continue;VisuMZ['CoreEngine']['createCustomParameter'](_0x1a68ec);}},VisuMZ[_0xa0779(0x824)][_0xa0779(0x3f0)]={},VisuMZ[_0xa0779(0x824)][_0xa0779(0x489)]={},VisuMZ[_0xa0779(0x824)][_0xa0779(0x9b5)]={},VisuMZ['CoreEngine'][_0xa0779(0x83f)]={},VisuMZ[_0xa0779(0x824)]['createCustomParameter']=function(_0x1d9603){const _0x3a83ae=_0xa0779,_0x5da86c=_0x1d9603['Abbreviation'],_0x10d028=_0x1d9603['ParamName'],_0x4a9a14=_0x1d9603[_0x3a83ae(0x6e7)],_0x48509e=_0x1d9603[_0x3a83ae(0x8fa)],_0x1d90f0=new Function(_0x1d9603[_0x3a83ae(0x263)]);VisuMZ['CoreEngine'][_0x3a83ae(0x3f0)][_0x5da86c['toUpperCase']()[_0x3a83ae(0x64c)]()]=_0x10d028,VisuMZ[_0x3a83ae(0x824)][_0x3a83ae(0x489)][_0x5da86c[_0x3a83ae(0x7c9)]()[_0x3a83ae(0x64c)]()]=_0x4a9a14,VisuMZ[_0x3a83ae(0x824)][_0x3a83ae(0x9b5)][_0x5da86c['toUpperCase']()[_0x3a83ae(0x64c)]()]=_0x48509e,VisuMZ[_0x3a83ae(0x824)][_0x3a83ae(0x83f)][_0x5da86c[_0x3a83ae(0x7c9)]()['trim']()]=_0x5da86c,Object[_0x3a83ae(0x5a2)](Game_BattlerBase[_0x3a83ae(0x271)],_0x5da86c,{'get'(){const _0x47b416=_0x3a83ae,_0xb52b0=_0x1d90f0[_0x47b416(0x398)](this);return _0x48509e===_0x47b416(0x52a)?Math[_0x47b416(0x4ee)](_0xb52b0):_0xb52b0;}});},VisuMZ[_0xa0779(0x824)]['ControllerButtons']={},VisuMZ[_0xa0779(0x824)]['ControllerMatches']={},Scene_Boot[_0xa0779(0x271)]['process_VisuMZ_CoreEngine_ControllerButtons']=function(){const _0x5aee97=_0xa0779,_0x7889e2=VisuMZ[_0x5aee97(0x824)][_0x5aee97(0x17f)][_0x5aee97(0x1b1)];for(const _0x194d0a of _0x7889e2){const _0x5e20b7=(_0x194d0a[_0x5aee97(0x3f3)]||'')[_0x5aee97(0x538)]()[_0x5aee97(0x64c)](),_0x54fc68=(_0x194d0a[_0x5aee97(0x67f)]||'')['toLowerCase']()['trim']();VisuMZ['CoreEngine'][_0x5aee97(0x1b1)][_0x5e20b7]=_0x194d0a,VisuMZ[_0x5aee97(0x824)][_0x5aee97(0x91a)][_0x54fc68]=_0x5e20b7;}},VisuMZ[_0xa0779(0x166)]=function(){const _0x4e5482=_0xa0779;for(const _0x210e7c of $dataActors){if(_0x210e7c)VisuMZ[_0x4e5482(0x7b9)](_0x210e7c);}for(const _0x2c57a0 of $dataClasses){if(_0x4e5482(0x35b)!==_0x4e5482(0x35b))return 0x24;else{if(_0x2c57a0)VisuMZ[_0x4e5482(0x3a0)](_0x2c57a0);}}for(const _0x53957c of $dataSkills){if(_0x4e5482(0x92b)!=='PKVGU')_0x57fa79=_0x4fdadd[_0x4e5482(0x824)][_0x4e5482(0x765)][_0x4e5482(0x398)](this);else{if(_0x53957c)VisuMZ[_0x4e5482(0x98f)](_0x53957c);}}for(const _0x92194c of $dataItems){if('eZPac'!==_0x4e5482(0x46a)){if(_0x92194c)VisuMZ['ParseItemNotetags'](_0x92194c);}else return this['buttonAssistWindowSideRect']();}for(const _0x4f1675 of $dataWeapons){if(_0x4f1675)VisuMZ[_0x4e5482(0x6b3)](_0x4f1675);}for(const _0x22e646 of $dataArmors){if(_0x4e5482(0x63c)!==_0x4e5482(0x63c)){const _0x3cf951=_0x44f5ee[_0x4e5482(0x824)][_0x4e5482(0x17f)][_0x4e5482(0x719)];if(_0x3cf951&&_0x3cf951['randomJS'])return _0x3cf951[_0x4e5482(0x6a8)]['call'](this);const _0x2e8b12=_0x223591[_0x4e5482(0x527)]*0.75,_0x3920e6=_0xbd6420[_0x4e5482(0x379)]*0.6,_0x59503e=_0x1fe4f2[_0x4e5482(0x5e8)];this['x']+=_0x2dd282[_0x4e5482(0x4ee)](_0x2cd2b1[_0x4e5482(0x1ee)](_0x2e8b12)-_0x4e059e[_0x4e5482(0x1ee)](_0x3920e6))*(_0x5f1b10[_0x4e5482(0x15d)](_0x59503e,0x1e)*0.5),this['y']+=_0x21f6bb[_0x4e5482(0x4ee)](_0x59dd68[_0x4e5482(0x1ee)](_0x2e8b12)-_0x20568b['randomInt'](_0x3920e6))*(_0x32af9c[_0x4e5482(0x15d)](_0x59503e,0x1e)*0.5);}else{if(_0x22e646)VisuMZ[_0x4e5482(0x96b)](_0x22e646);}}for(const _0x109e80 of $dataEnemies){if(_0x109e80)VisuMZ[_0x4e5482(0x173)](_0x109e80);}for(const _0x446c53 of $dataStates){if(_0x4e5482(0x9e6)===_0x4e5482(0x778)){const _0x18929b=_0x5c1b17[_0x4e5482(0x333)];for(let _0x1d564a=0x0;_0x1d564a<_0x18929b[_0x4e5482(0x444)];_0x1d564a++){if(_0x18929b[_0x1d564a][_0x4e5482(0x18a)])return!![];}return![];}else{if(_0x446c53)VisuMZ[_0x4e5482(0x90b)](_0x446c53);}}for(const _0x146db0 of $dataTilesets){if(_0x146db0)VisuMZ[_0x4e5482(0x9b4)](_0x146db0);}},VisuMZ[_0xa0779(0x7b9)]=function(_0x51603b){},VisuMZ[_0xa0779(0x3a0)]=function(_0x38ec3b){},VisuMZ[_0xa0779(0x98f)]=function(_0x586758){},VisuMZ[_0xa0779(0x83e)]=function(_0x430ff4){},VisuMZ[_0xa0779(0x6b3)]=function(_0x74508f){},VisuMZ['ParseArmorNotetags']=function(_0x1cb4ec){},VisuMZ['ParseEnemyNotetags']=function(_0x482be2){},VisuMZ[_0xa0779(0x90b)]=function(_0x283e47){},VisuMZ['ParseTilesetNotetags']=function(_0x20a472){},VisuMZ['CoreEngine']['ParseActorNotetags']=VisuMZ[_0xa0779(0x7b9)],VisuMZ[_0xa0779(0x7b9)]=function(_0x2f5b4f){const _0x25f331=_0xa0779;VisuMZ[_0x25f331(0x824)][_0x25f331(0x7b9)][_0x25f331(0x398)](this,_0x2f5b4f);const _0x4745d5=_0x2f5b4f[_0x25f331(0x5aa)];if(_0x4745d5[_0x25f331(0x758)](/<MAX LEVEL:[ ](\d+)>/i)){_0x2f5b4f[_0x25f331(0x779)]=Number(RegExp['$1']);if(_0x2f5b4f['maxLevel']===0x0)_0x2f5b4f['maxLevel']=Number[_0x25f331(0x2ac)];}if(_0x4745d5[_0x25f331(0x758)](/<INITIAL LEVEL:[ ](\d+)>/i)){if(_0x25f331(0x4db)===_0x25f331(0x15b)){const _0x232ad0=_0x55099b[_0x4cf749]['name'];_0x8e52a7+=_0x3d1aec+_0x25f331(0x22c)[_0x25f331(0x6ad)](_0x3ce62b,_0x232ad0||_0x25f331(0x49f))+_0x23027b;}else _0x2f5b4f['initialLevel']=Math[_0x25f331(0x15d)](Number(RegExp['$1']),_0x2f5b4f[_0x25f331(0x779)]);}},VisuMZ['CoreEngine'][_0xa0779(0x3a0)]=VisuMZ[_0xa0779(0x3a0)],VisuMZ[_0xa0779(0x3a0)]=function(_0x1ee34f){const _0x1f13a6=_0xa0779;VisuMZ[_0x1f13a6(0x824)][_0x1f13a6(0x3a0)][_0x1f13a6(0x398)](this,_0x1ee34f);if(_0x1ee34f[_0x1f13a6(0x1c4)])for(const _0x43b000 of _0x1ee34f[_0x1f13a6(0x1c4)]){if(_0x1f13a6(0x856)!=='NWoEh')_0x43b000[_0x1f13a6(0x5aa)][_0x1f13a6(0x758)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x43b000['level']=Math[_0x1f13a6(0x274)](Number(RegExp['$1']),0x1));else{var _0x4df4f=_0xc49314(_0x591f61['$1'])/0x64;_0xcc3b24*=_0x4df4f;}}},VisuMZ['CoreEngine'][_0xa0779(0x173)]=VisuMZ['ParseEnemyNotetags'],VisuMZ['ParseEnemyNotetags']=function(_0x4e82c2){const _0x4f0b88=_0xa0779;VisuMZ[_0x4f0b88(0x824)][_0x4f0b88(0x173)][_0x4f0b88(0x398)](this,_0x4e82c2),_0x4e82c2[_0x4f0b88(0x7ff)]=0x1;const _0x11619e=_0x4e82c2[_0x4f0b88(0x5aa)];if(_0x11619e[_0x4f0b88(0x758)](/<LEVEL:[ ](\d+)>/i))_0x4e82c2['level']=Number(RegExp['$1']);if(_0x11619e[_0x4f0b88(0x758)](/<MAXHP:[ ](\d+)>/i))_0x4e82c2[_0x4f0b88(0x3eb)][0x0]=Number(RegExp['$1']);if(_0x11619e[_0x4f0b88(0x758)](/<MAXMP:[ ](\d+)>/i))_0x4e82c2['params'][0x1]=Number(RegExp['$1']);if(_0x11619e[_0x4f0b88(0x758)](/<ATK:[ ](\d+)>/i))_0x4e82c2[_0x4f0b88(0x3eb)][0x2]=Number(RegExp['$1']);if(_0x11619e['match'](/<DEF:[ ](\d+)>/i))_0x4e82c2[_0x4f0b88(0x3eb)][0x3]=Number(RegExp['$1']);if(_0x11619e['match'](/<MAT:[ ](\d+)>/i))_0x4e82c2[_0x4f0b88(0x3eb)][0x4]=Number(RegExp['$1']);if(_0x11619e[_0x4f0b88(0x758)](/<MDF:[ ](\d+)>/i))_0x4e82c2[_0x4f0b88(0x3eb)][0x5]=Number(RegExp['$1']);if(_0x11619e[_0x4f0b88(0x758)](/<AGI:[ ](\d+)>/i))_0x4e82c2[_0x4f0b88(0x3eb)][0x6]=Number(RegExp['$1']);if(_0x11619e[_0x4f0b88(0x758)](/<LUK:[ ](\d+)>/i))_0x4e82c2[_0x4f0b88(0x3eb)][0x7]=Number(RegExp['$1']);if(_0x11619e['match'](/<EXP:[ ](\d+)>/i))_0x4e82c2[_0x4f0b88(0x375)]=Number(RegExp['$1']);if(_0x11619e[_0x4f0b88(0x758)](/<GOLD:[ ](\d+)>/i))_0x4e82c2[_0x4f0b88(0x1ef)]=Number(RegExp['$1']);},VisuMZ[_0xa0779(0x824)][_0xa0779(0x4be)]=Graphics['_defaultStretchMode'],Graphics[_0xa0779(0x23b)]=function(){const _0x1939f3=_0xa0779;switch(VisuMZ['CoreEngine'][_0x1939f3(0x17f)][_0x1939f3(0x2b0)]['AutoStretch']){case _0x1939f3(0x217):return!![];case _0x1939f3(0x4b0):return![];default:return VisuMZ[_0x1939f3(0x824)]['Graphics_defaultStretchMode'][_0x1939f3(0x398)](this);}},VisuMZ[_0xa0779(0x824)][_0xa0779(0x6f3)]=Graphics['printError'],Graphics[_0xa0779(0x415)]=function(_0x229aa4,_0x28974b,_0xb0a8fd=null){const _0x1a3de5=_0xa0779;VisuMZ['CoreEngine'][_0x1a3de5(0x6f3)]['call'](this,_0x229aa4,_0x28974b,_0xb0a8fd),VisuMZ[_0x1a3de5(0x30b)](![]);},VisuMZ[_0xa0779(0x824)][_0xa0779(0x85b)]=Graphics[_0xa0779(0x18c)],Graphics[_0xa0779(0x18c)]=function(_0x2d9843){const _0x32a808=_0xa0779;VisuMZ[_0x32a808(0x824)][_0x32a808(0x85b)][_0x32a808(0x398)](this,_0x2d9843),this[_0x32a808(0x982)](_0x2d9843);},Graphics['_centerElementCoreEngine']=function(_0x2ea7ac){const _0x215dca=_0xa0779;VisuMZ[_0x215dca(0x824)][_0x215dca(0x17f)][_0x215dca(0x2b0)][_0x215dca(0x2f7)]&&(_0x2ea7ac['style'][_0x215dca(0x572)]=_0x215dca(0x19d));if(VisuMZ[_0x215dca(0x824)][_0x215dca(0x17f)][_0x215dca(0x2b0)]['PixelateImageRendering']){if('ybsIV'!==_0x215dca(0x437)){const _0x4d6df7=this[_0x215dca(0x7ed)]()-this[_0x215dca(0x27c)]()*0x2;this[_0x215dca(0x77d)](_0x1d7400,_0x170eb5,_0x4d6df7,_0x224c6e,![]);}else _0x2ea7ac['style'][_0x215dca(0x3b6)]=_0x215dca(0x9e9);}const _0x22c489=Math[_0x215dca(0x274)](0x0,Math[_0x215dca(0x256)](_0x2ea7ac['width']*this[_0x215dca(0x9e1)])),_0x2d3434=Math[_0x215dca(0x274)](0x0,Math[_0x215dca(0x256)](_0x2ea7ac[_0x215dca(0x7f6)]*this[_0x215dca(0x9e1)]));_0x2ea7ac[_0x215dca(0x3a2)][_0x215dca(0x3c5)]=_0x22c489+'px',_0x2ea7ac['style'][_0x215dca(0x7f6)]=_0x2d3434+'px';},VisuMZ[_0xa0779(0x824)][_0xa0779(0x8dc)]=Bitmap['prototype'][_0xa0779(0x288)],Bitmap[_0xa0779(0x271)][_0xa0779(0x288)]=function(_0x2c670c,_0x31a25f){const _0x25960d=_0xa0779;VisuMZ[_0x25960d(0x824)][_0x25960d(0x8dc)][_0x25960d(0x398)](this,_0x2c670c,_0x31a25f),this[_0x25960d(0x25d)]=!(VisuMZ['CoreEngine']['Settings'][_0x25960d(0x2b0)]['PixelateImageRendering']??!![]);},Bitmap[_0xa0779(0x271)][_0xa0779(0x4c2)]=function(){const _0x28ad2d=_0xa0779;this[_0x28ad2d(0x273)]=!![];},VisuMZ[_0xa0779(0x824)][_0xa0779(0x89b)]=Sprite[_0xa0779(0x271)][_0xa0779(0x372)],Sprite['prototype'][_0xa0779(0x372)]=function(){const _0x5b060e=_0xa0779;if(this[_0x5b060e(0x6dd)])VisuMZ['CoreEngine'][_0x5b060e(0x89b)][_0x5b060e(0x398)](this);this['destroyCoreEngineMarkedBitmaps']();},Sprite[_0xa0779(0x271)]['destroyCoreEngineMarkedBitmaps']=function(){const _0x3a07a7=_0xa0779;if(!this[_0x3a07a7(0x346)])return;if(!this[_0x3a07a7(0x346)]['_customModified'])return;if(this['bitmap'][_0x3a07a7(0x330)]&&!this[_0x3a07a7(0x32f)][_0x3a07a7(0x330)][_0x3a07a7(0x154)]){if('WLjGs'==='WLjGs')this['bitmap'][_0x3a07a7(0x372)]();else return _0x4f2f4a[_0x3a07a7(0x824)][_0x3a07a7(0x501)][_0x3a07a7(0x398)](this);}},VisuMZ['CoreEngine'][_0xa0779(0x810)]=Bitmap[_0xa0779(0x271)][_0xa0779(0x5bf)],Bitmap['prototype'][_0xa0779(0x5bf)]=function(_0x58e7e8,_0x463db6){const _0x478c30=_0xa0779;VisuMZ['CoreEngine']['Bitmap_resize']['call'](this,_0x58e7e8,_0x463db6),this[_0x478c30(0x4c2)]();},VisuMZ[_0xa0779(0x824)][_0xa0779(0x6cb)]=Bitmap['prototype'][_0xa0779(0x2c7)],Bitmap[_0xa0779(0x271)][_0xa0779(0x2c7)]=function(_0x10da7b,_0xe27498,_0x4a8f96,_0x329c39,_0x260df8,_0xee56bc,_0x36f4c0,_0x58a96c,_0x1c587a){const _0x138e9b=_0xa0779;_0xe27498=Math[_0x138e9b(0x4ee)](_0xe27498),_0x4a8f96=Math[_0x138e9b(0x4ee)](_0x4a8f96),_0x329c39=Math[_0x138e9b(0x4ee)](_0x329c39),_0x260df8=Math[_0x138e9b(0x4ee)](_0x260df8),_0xee56bc=Math[_0x138e9b(0x4ee)](_0xee56bc),_0x36f4c0=Math['round'](_0x36f4c0),VisuMZ['CoreEngine']['Bitmap_blt'][_0x138e9b(0x398)](this,_0x10da7b,_0xe27498,_0x4a8f96,_0x329c39,_0x260df8,_0xee56bc,_0x36f4c0,_0x58a96c,_0x1c587a),this[_0x138e9b(0x4c2)]();},VisuMZ['CoreEngine'][_0xa0779(0x1fc)]=Bitmap['prototype'][_0xa0779(0x950)],Bitmap[_0xa0779(0x271)][_0xa0779(0x950)]=function(_0x4271df,_0x487891,_0x5700cb,_0x35d97b){const _0x1f0825=_0xa0779;VisuMZ[_0x1f0825(0x824)]['Bitmap_clearRect'][_0x1f0825(0x398)](this,_0x4271df,_0x487891,_0x5700cb,_0x35d97b),this[_0x1f0825(0x4c2)]();},VisuMZ[_0xa0779(0x824)][_0xa0779(0x2c2)]=Bitmap['prototype']['fillRect'],Bitmap[_0xa0779(0x271)][_0xa0779(0x5c6)]=function(_0x2ca72b,_0x1e12e1,_0xa861d3,_0x4aa38c,_0x2986b9){const _0x1b3fec=_0xa0779;VisuMZ[_0x1b3fec(0x824)][_0x1b3fec(0x2c2)][_0x1b3fec(0x398)](this,_0x2ca72b,_0x1e12e1,_0xa861d3,_0x4aa38c,_0x2986b9),this[_0x1b3fec(0x4c2)]();},VisuMZ[_0xa0779(0x824)]['Bitmap_strokeRect']=Bitmap[_0xa0779(0x271)]['strokeRect'],Bitmap[_0xa0779(0x271)][_0xa0779(0x7a2)]=function(_0x219fa4,_0x520325,_0xe34bae,_0x1b3b80,_0x4c6025){const _0x7cbd0=_0xa0779;VisuMZ['CoreEngine'][_0x7cbd0(0x79e)][_0x7cbd0(0x398)](this,_0x219fa4,_0x520325,_0xe34bae,_0x1b3b80,_0x4c6025),this[_0x7cbd0(0x4c2)]();},VisuMZ[_0xa0779(0x824)][_0xa0779(0x8c7)]=Bitmap['prototype'][_0xa0779(0x80e)],Bitmap['prototype'][_0xa0779(0x80e)]=function(_0x37fc08,_0x1a9e0c,_0x3e0b26,_0x43c665,_0x1b637f,_0x5e96a6,_0x489125){const _0x26aa2a=_0xa0779;VisuMZ['CoreEngine']['Bitmap_gradientFillRect'][_0x26aa2a(0x398)](this,_0x37fc08,_0x1a9e0c,_0x3e0b26,_0x43c665,_0x1b637f,_0x5e96a6,_0x489125),this[_0x26aa2a(0x4c2)]();},VisuMZ[_0xa0779(0x824)][_0xa0779(0x896)]=Bitmap['prototype'][_0xa0779(0x643)],Bitmap['prototype'][_0xa0779(0x643)]=function(_0x4cff03,_0x259126,_0x3f2fe8,_0x588f1b){const _0x2088ab=_0xa0779;_0x4cff03=Math[_0x2088ab(0x4ee)](_0x4cff03),_0x259126=Math[_0x2088ab(0x4ee)](_0x259126),_0x3f2fe8=Math[_0x2088ab(0x4ee)](_0x3f2fe8),VisuMZ[_0x2088ab(0x824)]['Bitmap_drawCircle'][_0x2088ab(0x398)](this,_0x4cff03,_0x259126,_0x3f2fe8,_0x588f1b),this[_0x2088ab(0x4c2)]();},VisuMZ['CoreEngine'][_0xa0779(0x2ff)]=Bitmap[_0xa0779(0x271)][_0xa0779(0x14b)],Bitmap[_0xa0779(0x271)][_0xa0779(0x14b)]=function(_0x8beb75){const _0x5f1f7d=_0xa0779;return Math['ceil'](VisuMZ[_0x5f1f7d(0x824)][_0x5f1f7d(0x2ff)][_0x5f1f7d(0x398)](this,_0x8beb75));},VisuMZ[_0xa0779(0x824)][_0xa0779(0x61b)]=Bitmap[_0xa0779(0x271)][_0xa0779(0x65f)],Bitmap['prototype'][_0xa0779(0x65f)]=function(_0x43119b,_0x242269,_0x5c3cf2,_0x414c73,_0x1f5fff,_0x4b304e){const _0x13421f=_0xa0779;_0x242269=Math[_0x13421f(0x4ee)](_0x242269),_0x5c3cf2=Math[_0x13421f(0x4ee)](_0x5c3cf2),_0x414c73=Math[_0x13421f(0x4ee)](_0x414c73),_0x1f5fff=Math[_0x13421f(0x4ee)](_0x1f5fff),VisuMZ[_0x13421f(0x824)]['Bitmap_drawText'][_0x13421f(0x398)](this,_0x43119b,_0x242269,_0x5c3cf2,_0x414c73,_0x1f5fff,_0x4b304e),this[_0x13421f(0x4c2)]();},VisuMZ['CoreEngine']['Bitmap_drawTextOutline']=Bitmap[_0xa0779(0x271)][_0xa0779(0x6f7)],Bitmap['prototype'][_0xa0779(0x6f7)]=function(_0x280c26,_0x56f118,_0x495ead,_0x2d34f1){const _0x51f26e=_0xa0779;if(VisuMZ['CoreEngine'][_0x51f26e(0x17f)][_0x51f26e(0x2b0)][_0x51f26e(0x2d9)])this[_0x51f26e(0x503)](_0x280c26,_0x56f118,_0x495ead,_0x2d34f1);else{if(_0x51f26e(0x49d)===_0x51f26e(0x901)){if(!this[_0x51f26e(0x4fe)])return _0x3b924b;const _0x2d9193=this['_coreEasing'][_0x51f26e(0x86b)],_0x4b25c2=this['_coreEasing']['wholeDuration'],_0x107369=this[_0x51f26e(0x72b)]((_0x4b25c2-_0x2d9193)/_0x4b25c2),_0x25b474=this['calcCoreEasing']((_0x4b25c2-_0x2d9193+0x1)/_0x4b25c2),_0x54af0f=(_0x3226d7-_0x3affb2*_0x107369)/(0x1-_0x107369);return _0x54af0f+(_0x1be0f1-_0x54af0f)*_0x25b474;}else VisuMZ[_0x51f26e(0x824)]['Bitmap_drawTextOutline'][_0x51f26e(0x398)](this,_0x280c26,_0x56f118,_0x495ead,_0x2d34f1);}},Bitmap[_0xa0779(0x271)][_0xa0779(0x503)]=function(_0x809e9b,_0x3cca3a,_0x153791,_0xc6519e){const _0xa9a63d=_0xa0779,_0x4c57ce=this[_0xa9a63d(0x65a)];_0x4c57ce['fillStyle']=this[_0xa9a63d(0x798)],_0x4c57ce[_0xa9a63d(0x203)](_0x809e9b,_0x3cca3a+0x2,_0x153791+0x2,_0xc6519e);},VisuMZ[_0xa0779(0x824)][_0xa0779(0x8a8)]=Input[_0xa0779(0x653)],Input[_0xa0779(0x653)]=function(){const _0x3e35e6=_0xa0779;VisuMZ[_0x3e35e6(0x824)][_0x3e35e6(0x8a8)][_0x3e35e6(0x398)](this),this[_0x3e35e6(0x167)]=undefined,this['_inputSpecialKeyCode']=undefined,this[_0x3e35e6(0x9dc)]=Input['keyRepeatWait'];},VisuMZ[_0xa0779(0x824)][_0xa0779(0x6fc)]=Input[_0xa0779(0x6be)],Input['update']=function(){const _0x357461=_0xa0779;VisuMZ[_0x357461(0x824)]['Input_update'][_0x357461(0x398)](this);if(this[_0x357461(0x9dc)])this[_0x357461(0x9dc)]--;},VisuMZ['CoreEngine'][_0xa0779(0x286)]=Input[_0xa0779(0x6ec)],Input[_0xa0779(0x6ec)]=function(){const _0x5924e1=_0xa0779;if(this[_0x5924e1(0x9dc)])return;VisuMZ[_0x5924e1(0x824)][_0x5924e1(0x286)][_0x5924e1(0x398)](this);},VisuMZ[_0xa0779(0x824)]['Input_setupEventHandlers']=Input[_0xa0779(0x5f3)],Input[_0xa0779(0x5f3)]=function(){const _0x4d79a2=_0xa0779;VisuMZ[_0x4d79a2(0x824)][_0x4d79a2(0x42c)][_0x4d79a2(0x398)](this),document[_0x4d79a2(0x466)]('keypress',this[_0x4d79a2(0x609)]['bind'](this));},VisuMZ['CoreEngine'][_0xa0779(0x6a3)]=Input['_onKeyDown'],Input['_onKeyDown']=function(_0x5352dd){const _0xe103c7=_0xa0779;this[_0xe103c7(0x16e)]=_0x5352dd[_0xe103c7(0x567)],VisuMZ['CoreEngine'][_0xe103c7(0x6a3)][_0xe103c7(0x398)](this,_0x5352dd),this[_0xe103c7(0x34c)](null);},Input[_0xa0779(0x609)]=function(_0x21cf8f){const _0x28f33c=_0xa0779;this[_0x28f33c(0x644)](_0x21cf8f);},Input[_0xa0779(0x644)]=function(_0x1b4a09){const _0xde64f7=_0xa0779;this[_0xde64f7(0x16e)]=_0x1b4a09[_0xde64f7(0x567)];let _0x578102=String[_0xde64f7(0x2e3)](_0x1b4a09[_0xde64f7(0x514)]);if(this[_0xde64f7(0x167)]===undefined)this[_0xde64f7(0x167)]=_0x578102;else{if(_0xde64f7(0x8f8)!=='ZJihd')return this[_0xde64f7(0x1db)][_0xde64f7(0x7a5)](_0x58e2b2);else this[_0xde64f7(0x167)]+=_0x578102;}},VisuMZ[_0xa0779(0x824)][_0xa0779(0x456)]=Input[_0xa0779(0x914)],Input['_shouldPreventDefault']=function(_0x2ed544){const _0x2a17df=_0xa0779;if(_0x2ed544===0x8)return![];return VisuMZ[_0x2a17df(0x824)][_0x2a17df(0x456)][_0x2a17df(0x398)](this,_0x2ed544);},Input[_0xa0779(0x453)]=function(_0x3cafcf){const _0x171a2a=_0xa0779;if(_0x3cafcf[_0x171a2a(0x758)](/backspace/i))return this[_0x171a2a(0x16e)]===0x8;if(_0x3cafcf[_0x171a2a(0x758)](/enter/i))return this['_inputSpecialKeyCode']===0xd;if(_0x3cafcf[_0x171a2a(0x758)](/escape/i))return this[_0x171a2a(0x16e)]===0x1b;},Input[_0xa0779(0x3f5)]=function(){const _0x3cbebb=_0xa0779;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x3cbebb(0x16e)]);},Input[_0xa0779(0x771)]=function(){return[0x25,0x26,0x27,0x28]['contains'](this['_inputSpecialKeyCode']);},Input[_0xa0779(0x88b)]=function(){const _0x5c7e30=_0xa0779;if(navigator['getGamepads']){const _0x565c51=navigator[_0x5c7e30(0x234)]();if(_0x565c51){if(_0x5c7e30(0x4c0)===_0x5c7e30(0x4c0))for(const _0x305c37 of _0x565c51){if(_0x5c7e30(0x2f8)!==_0x5c7e30(0x327)){if(_0x305c37&&_0x305c37[_0x5c7e30(0x87b)])return!![];}else return _0x193aae[_0x5c7e30(0x707)](_0x7a079c['CoreEngine']['Bitmap_measureTextWidth'][_0x5c7e30(0x398)](this,_0x53c355));}else this[_0x5c7e30(0x42a)](),this[_0x5c7e30(0x1e0)](),_0x4eca79[_0x5c7e30(0x824)]['Spriteset_Base_destroy'][_0x5c7e30(0x398)](this,_0x7b99ed);}}return![];},Input[_0xa0779(0x2a1)]=function(){const _0x9dfac3=_0xa0779;if(navigator['getGamepads']){const _0x42bc02=navigator['getGamepads']();if(_0x42bc02)for(const _0x5343f7 of _0x42bc02){if('yVysh'!==_0x9dfac3(0x196))_0x284eea+=_0x3d30af;else{if(_0x5343f7&&_0x5343f7[_0x9dfac3(0x87b)]){if(this[_0x9dfac3(0x21a)](_0x5343f7))return!![];if(this[_0x9dfac3(0x9bd)](_0x5343f7))return!![];}}}}return![];},Input[_0xa0779(0x21a)]=function(_0x2e45d8){const _0x5cea78=_0xa0779,_0x2512fe=_0x2e45d8[_0x5cea78(0x333)];for(let _0x42c3ef=0x0;_0x42c3ef<_0x2512fe['length'];_0x42c3ef++){if(_0x5cea78(0x396)===_0x5cea78(0x1e6))_0x3bb7a4+=_0x16790f;else{if(_0x2512fe[_0x42c3ef]['pressed'])return!![];}}return![];},Input['isGamepadAxisMoved']=function(_0x3b8fc3){const _0x198bb0=_0xa0779,_0x4e9eb9=_0x3b8fc3[_0x198bb0(0x26b)],_0xd015d7=0.5;if(_0x4e9eb9[0x0]<-_0xd015d7)return!![];if(_0x4e9eb9[0x0]>_0xd015d7)return!![];if(_0x4e9eb9[0x1]<-_0xd015d7)return!![];if(_0x4e9eb9[0x1]>_0xd015d7)return!![];return![];},Input['getLastGamepadUsed']=function(){const _0x1b2fb6=_0xa0779;return this[_0x1b2fb6(0x493)]||null;},Input[_0xa0779(0x34c)]=function(_0x4cb4d9){this['_lastGamepad']=_0x4cb4d9;},VisuMZ['CoreEngine'][_0xa0779(0x2b6)]=Input[_0xa0779(0x8f4)],Input['_updateGamepadState']=function(_0x3d48d9){const _0x3e601b=_0xa0779;VisuMZ[_0x3e601b(0x824)][_0x3e601b(0x2b6)][_0x3e601b(0x398)](this,_0x3d48d9),(this['isGamepadButtonPressed'](_0x3d48d9)||this['isGamepadAxisMoved'](_0x3d48d9))&&this['setLastGamepadUsed'](_0x3d48d9);},Input[_0xa0779(0x3c3)]=function(){const _0xa7cb2e=_0xa0779;return this[_0xa7cb2e(0x493)]?this['_lastGamepad']['id']:'Keyboard';},VisuMZ[_0xa0779(0x824)][_0xa0779(0x3ec)]=Tilemap[_0xa0779(0x271)][_0xa0779(0x7cd)],Tilemap[_0xa0779(0x271)][_0xa0779(0x7cd)]=function(_0x16a627,_0x33a0c0,_0x38c064,_0x983e66){const _0x239a3e=_0xa0779;if($gameMap&&$gameMap[_0x239a3e(0x803)]())return;VisuMZ[_0x239a3e(0x824)]['Tilemap_addShadow']['call'](this,_0x16a627,_0x33a0c0,_0x38c064,_0x983e66);},Tilemap[_0xa0779(0x388)][_0xa0779(0x271)][_0xa0779(0x1d5)]=function(){const _0x305b46=_0xa0779;this['_destroyInternalTextures']();for(let _0x1daf17=0x0;_0x1daf17<Tilemap['Layer'][_0x305b46(0x604)];_0x1daf17++){if('sjivZ'!==_0x305b46(0x953)){let _0x4778dd=0x0;return _0x497b8f[_0x305b46(0x6bc)]()?_0x4778dd=this[_0x305b46(0x64a)]():_0x4778dd=_0xc70d53[_0x305b46(0x824)][_0x305b46(0x731)][_0x305b46(0x398)](this),this[_0x305b46(0x467)]()&&this[_0x305b46(0x7fd)]()!=='button'&&(_0x4778dd-=_0x3bc163[_0x305b46(0x271)][_0x305b46(0x981)]()),_0x4778dd;}else{const _0x4ad250=new PIXI[(_0x305b46(0x358))]();_0x4ad250[_0x305b46(0x8da)](0x800,0x800);if(VisuMZ['CoreEngine'][_0x305b46(0x17f)]['QoL'][_0x305b46(0x8c9)]){if(_0x305b46(0x9b0)==='htDZm')_0x4ad250[_0x305b46(0x738)]=PIXI[_0x305b46(0x53e)][_0x305b46(0x9a6)];else return _0x3ab429;}this[_0x305b46(0x3dd)]['push'](_0x4ad250);}}},WindowLayer[_0xa0779(0x271)]['isMaskingEnabled']=function(){const _0x4a1a7d=_0xa0779;if(SceneManager&&SceneManager[_0x4a1a7d(0x6a6)])return SceneManager[_0x4a1a7d(0x6a6)][_0x4a1a7d(0x954)]();else{if(_0x4a1a7d(0x868)!==_0x4a1a7d(0x713))return!![];else{const _0x440f23=this['_width'],_0x297a65=this[_0x4a1a7d(0x6c5)],_0x493158=0x18,_0x463d97=_0x493158/0x2,_0x273057=0x60+_0x493158,_0x127b9b=0x0+_0x493158;this['_downArrowSprite'][_0x4a1a7d(0x346)]=this[_0x4a1a7d(0x4a1)],this[_0x4a1a7d(0x3ba)][_0x4a1a7d(0x44e)]['x']=0.5,this[_0x4a1a7d(0x3ba)][_0x4a1a7d(0x44e)]['y']=0.5,this[_0x4a1a7d(0x3ba)][_0x4a1a7d(0x9d4)](_0x273057+_0x463d97,_0x127b9b+_0x463d97+_0x493158,_0x493158,_0x463d97),this[_0x4a1a7d(0x3ba)]['move'](_0x19f24a[_0x4a1a7d(0x4ee)](_0x440f23/0x2),_0x18c479[_0x4a1a7d(0x4ee)](_0x297a65-_0x463d97)),this['_upArrowSprite'][_0x4a1a7d(0x346)]=this[_0x4a1a7d(0x4a1)],this[_0x4a1a7d(0x58a)][_0x4a1a7d(0x44e)]['x']=0.5,this['_upArrowSprite']['anchor']['y']=0.5,this[_0x4a1a7d(0x58a)][_0x4a1a7d(0x9d4)](_0x273057+_0x463d97,_0x127b9b,_0x493158,_0x463d97),this['_upArrowSprite'][_0x4a1a7d(0x427)](_0x470a5c[_0x4a1a7d(0x4ee)](_0x440f23/0x2),_0x2a5c70[_0x4a1a7d(0x4ee)](_0x463d97));}}},VisuMZ[_0xa0779(0x824)]['WindowLayer_render']=WindowLayer[_0xa0779(0x271)][_0xa0779(0x92d)],WindowLayer['prototype'][_0xa0779(0x92d)]=function render(_0x2b43cf){const _0x401e46=_0xa0779;this['isMaskingEnabled']()?VisuMZ[_0x401e46(0x824)][_0x401e46(0x59f)][_0x401e46(0x398)](this,_0x2b43cf):_0x401e46(0x9e4)!==_0x401e46(0x9e4)?!_0x55d582['isInputting']()&&!this[_0x401e46(0x6aa)]&&!_0x34e163[_0x401e46(0x3e6)]()&&(this['_playtestF7Looping']=!![],this[_0x401e46(0x6be)](),_0x2a9edf[_0x401e46(0x376)](),this[_0x401e46(0x6aa)]=![]):this[_0x401e46(0x28f)](_0x2b43cf);},WindowLayer[_0xa0779(0x271)][_0xa0779(0x28f)]=function render(_0x34cad8){const _0x38b1af=_0xa0779;if(!this[_0x38b1af(0x939)])return;const _0x374d14=new PIXI['Graphics'](),_0xca1854=_0x34cad8['gl'],_0x2971ce=this[_0x38b1af(0x48e)][_0x38b1af(0x8b2)]();_0x34cad8[_0x38b1af(0x6e0)][_0x38b1af(0x43b)](),_0x374d14['transform']=this[_0x38b1af(0x7e0)],_0x34cad8[_0x38b1af(0x50a)][_0x38b1af(0x6db)](),_0xca1854[_0x38b1af(0x80d)](_0xca1854[_0x38b1af(0x7e1)]);while(_0x2971ce['length']>0x0){const _0x2472ae=_0x2971ce[_0x38b1af(0x41f)]();_0x2472ae[_0x38b1af(0x1b6)]&&_0x2472ae[_0x38b1af(0x939)]&&_0x2472ae['openness']>0x0&&(_0xca1854['stencilFunc'](_0xca1854[_0x38b1af(0x35c)],0x0,~0x0),_0xca1854[_0x38b1af(0x6e8)](_0xca1854[_0x38b1af(0x261)],_0xca1854[_0x38b1af(0x261)],_0xca1854[_0x38b1af(0x261)]),_0x2472ae[_0x38b1af(0x92d)](_0x34cad8),_0x34cad8['batch'][_0x38b1af(0x6db)](),_0x374d14[_0x38b1af(0x653)](),_0xca1854[_0x38b1af(0x1c9)](_0xca1854[_0x38b1af(0x8dd)],0x1,~0x0),_0xca1854[_0x38b1af(0x6e8)](_0xca1854['REPLACE'],_0xca1854[_0x38b1af(0x6d7)],_0xca1854[_0x38b1af(0x6d7)]),_0xca1854[_0x38b1af(0x20f)](_0xca1854[_0x38b1af(0x6f5)],_0xca1854[_0x38b1af(0x16c)]),_0x374d14[_0x38b1af(0x92d)](_0x34cad8),_0x34cad8['batch'][_0x38b1af(0x6db)](),_0xca1854[_0x38b1af(0x20f)](_0xca1854[_0x38b1af(0x16c)],_0xca1854[_0x38b1af(0x851)]));}_0xca1854[_0x38b1af(0x8b8)](_0xca1854['STENCIL_TEST']),_0xca1854[_0x38b1af(0x653)](_0xca1854[_0x38b1af(0x1d8)]),_0xca1854[_0x38b1af(0x6f0)](0x0),_0x34cad8[_0x38b1af(0x50a)][_0x38b1af(0x6db)]();for(const _0x4a53f7 of this[_0x38b1af(0x48e)]){if(_0x38b1af(0x56c)==='lzgjw')!_0x4a53f7[_0x38b1af(0x1b6)]&&_0x4a53f7[_0x38b1af(0x939)]&&(_0x38b1af(0x7aa)==='PpSwE'?_0x4a53f7['render'](_0x34cad8):_0x1acc51=_0x38b1af(0x86d)['format'](_0x571b03,_0xe9e178));else{const _0x572969=_0x38b1af(0x98c);this[_0x38b1af(0x97b)]=this[_0x38b1af(0x97b)]||{};if(this['_colorCache'][_0x572969])return this[_0x38b1af(0x97b)][_0x572969];const _0x1c58d7=_0x559dde[_0x38b1af(0x824)][_0x38b1af(0x17f)][_0x38b1af(0x6b1)]['ColorGaugeBack'];return this['getColorDataFromPluginParameters'](_0x572969,_0x1c58d7);}}_0x34cad8[_0x38b1af(0x50a)][_0x38b1af(0x6db)]();},DataManager[_0xa0779(0x573)]=function(_0x4ff1bd){const _0x17b271=_0xa0779;return this[_0x17b271(0x5ea)](_0x4ff1bd)&&_0x4ff1bd[_0x17b271(0x280)]===0x2;},VisuMZ[_0xa0779(0x824)]['DataManager_setupNewGame']=DataManager[_0xa0779(0x535)],DataManager[_0xa0779(0x535)]=function(){const _0x3d0cbb=_0xa0779;VisuMZ['CoreEngine'][_0x3d0cbb(0x3fa)]['call'](this),this[_0x3d0cbb(0x183)](),this[_0x3d0cbb(0x1d9)]();},DataManager[_0xa0779(0x183)]=function(){const _0x2a5b90=_0xa0779;if($gameTemp[_0x2a5b90(0x6bb)]()){const _0x2c4d6f=VisuMZ[_0x2a5b90(0x824)][_0x2a5b90(0x17f)][_0x2a5b90(0x2b0)][_0x2a5b90(0x7ac)];if(_0x2c4d6f>0x0)$gameTemp[_0x2a5b90(0x4fd)](_0x2c4d6f);}},DataManager['reserveNewGameCommonEvent']=function(){const _0x6b075e=_0xa0779,_0x5ad9f6=VisuMZ['CoreEngine'][_0x6b075e(0x17f)]['QoL'][_0x6b075e(0x4dd)]||0x0;if(_0x5ad9f6>0x0)$gameTemp[_0x6b075e(0x4fd)](_0x5ad9f6);},DataManager['createTroopNote']=function(_0x4888b4){const _0x51e611=_0xa0779,_0x5a8074=$dataTroops[_0x4888b4];if(!_0x5a8074)return'';let _0x314695='';_0x314695+=_0x5a8074[_0x51e611(0x912)];for(const _0x94d2c3 of _0x5a8074[_0x51e611(0x89f)]){for(const _0x5abf17 of _0x94d2c3[_0x51e611(0x591)]){[0x6c,0x198][_0x51e611(0x84f)](_0x5abf17[_0x51e611(0x679)])&&(_0x314695+='\x0a',_0x314695+=_0x5abf17[_0x51e611(0x89e)][0x0]);}}return _0x314695;};(VisuMZ['CoreEngine']['Settings']['QoL']['ShortcutScripts']??!![])&&($scene=null,VisuMZ['CoreEngine'][_0xa0779(0x4ae)]=Scene_Base['prototype'][_0xa0779(0x208)],Scene_Base[_0xa0779(0x271)]['create']=function(){const _0x29978b=_0xa0779;VisuMZ[_0x29978b(0x824)][_0x29978b(0x4ae)]['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0xa0779(0x824)][_0xa0779(0x7db)]=Scene_Map[_0xa0779(0x271)][_0xa0779(0x1e3)],Scene_Map[_0xa0779(0x271)][_0xa0779(0x1e3)]=function(){const _0x5ab9f6=_0xa0779;VisuMZ[_0x5ab9f6(0x824)][_0x5ab9f6(0x7db)]['call'](this),$spriteset=this[_0x5ab9f6(0x1e1)];},VisuMZ[_0xa0779(0x824)]['Scene_Battle_createSpriteset']=Scene_Battle['prototype'][_0xa0779(0x1e3)],Scene_Battle['prototype'][_0xa0779(0x1e3)]=function(){const _0x1dcbe8=_0xa0779;VisuMZ['CoreEngine'][_0x1dcbe8(0x8e1)][_0x1dcbe8(0x398)](this),$spriteset=this['_spriteset'];},VisuMZ[_0xa0779(0x824)]['Scene_Base_terminate']=Scene_Base['prototype']['terminate'],Scene_Base[_0xa0779(0x271)][_0xa0779(0x5d6)]=function(){const _0x35ce4e=_0xa0779;VisuMZ['CoreEngine'][_0x35ce4e(0x638)]['call'](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0xa0779(0x824)][_0xa0779(0x6cc)]=BattleManager['update'],BattleManager[_0xa0779(0x6be)]=function(_0x3dd780){const _0x1b1506=_0xa0779;VisuMZ['CoreEngine'][_0x1b1506(0x6cc)][_0x1b1506(0x398)](this,_0x3dd780),$subject=this[_0x1b1506(0x523)],$targets=this[_0x1b1506(0x590)],$target=this[_0x1b1506(0x6a4)]||this[_0x1b1506(0x590)][0x0];},$event=null,VisuMZ['CoreEngine'][_0xa0779(0x368)]=Game_Event[_0xa0779(0x271)][_0xa0779(0x5b8)],Game_Event[_0xa0779(0x271)][_0xa0779(0x5b8)]=function(){const _0x317357=_0xa0779;VisuMZ['CoreEngine']['Game_Event_start'][_0x317357(0x398)](this),$event=this;},VisuMZ['CoreEngine']['Scene_Map_update']=Scene_Map[_0xa0779(0x271)][_0xa0779(0x6be)],Scene_Map[_0xa0779(0x271)]['update']=function(){const _0x120eb3=_0xa0779;VisuMZ[_0x120eb3(0x824)][_0x120eb3(0x53b)][_0x120eb3(0x398)](this),$gameMap[_0x120eb3(0x54f)]();},Game_Map['prototype'][_0xa0779(0x54f)]=function(){const _0x312615=_0xa0779;!this[_0x312615(0x522)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x58fae7){const _0x5d5002=_0xa0779;if($gameTemp)$gameTemp[_0x5d5002(0x4fd)](_0x58fae7);},$onceParallel=function(_0x13c653){const _0x3a75cf=_0xa0779;if(SceneManager[_0x3a75cf(0x9aa)]())$scene[_0x3a75cf(0x97a)](_0x13c653);else{if(SceneManager[_0x3a75cf(0x714)]()){if(_0x3a75cf(0x7cb)===_0x3a75cf(0x257))this[_0x3a75cf(0x387)][_0x3a75cf(0x21b)](_0x1a88dd[_0x3a75cf(0x1ab)][_0x3a75cf(0x294)]);else{if(Imported[_0x3a75cf(0x5a8)]){if(_0x3a75cf(0x750)!==_0x3a75cf(0x750)){const _0x4ddf04=_0x2f6d4f[_0x3a75cf(0x26b)],_0x4d612b=0.5;if(_0x4ddf04[0x0]<-_0x4d612b)return!![];if(_0x4ddf04[0x0]>_0x4d612b)return!![];if(_0x4ddf04[0x1]<-_0x4d612b)return!![];if(_0x4ddf04[0x1]>_0x4d612b)return!![];return![];}else $scene['playOnceParallelInterpreter'](_0x13c653);}else $gameTemp&&$gameTemp['isPlaytest']()&&alert(_0x3a75cf(0x9e2));}}else $gameTemp&&$gameTemp[_0x3a75cf(0x6bb)]()&&alert('This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!');}});;StorageManager[_0xa0779(0x53f)]=function(_0x1cd0fa){return new Promise((_0x9ff69,_0x21e773)=>{const _0x1f9a12=_0x5859;try{const _0x19e5b1=pako[_0x1f9a12(0x6e2)](_0x1cd0fa,{'to':_0x1f9a12(0x475),'level':0x1});if(_0x19e5b1[_0x1f9a12(0x444)]>=0xc350){}_0x9ff69(_0x19e5b1);}catch(_0x1b7ec2){_0x21e773(_0x1b7ec2);}});},TextManager['stringKeyMap']=['','','',_0xa0779(0x67e),'','','HELP','',_0xa0779(0x6d0),'TAB','','',_0xa0779(0x823),'ENTER',_0xa0779(0x42b),'',_0xa0779(0x5e3),'CTRL',_0xa0779(0x287),_0xa0779(0x7f5),_0xa0779(0x1ba),_0xa0779(0x150),_0xa0779(0x8d3),'JUNJA',_0xa0779(0x4ac),_0xa0779(0x789),'',_0xa0779(0x1d7),'CONVERT',_0xa0779(0x752),_0xa0779(0x88a),_0xa0779(0x647),_0xa0779(0x155),'PGUP',_0xa0779(0x61c),_0xa0779(0x76d),'HOME',_0xa0779(0x22a),'UP',_0xa0779(0x75d),_0xa0779(0x364),_0xa0779(0x4da),_0xa0779(0x646),_0xa0779(0x584),_0xa0779(0x77a),_0xa0779(0x406),_0xa0779(0x24e),'','0','1','2','3','4','5','6','7','8','9',_0xa0779(0x282),'SEMICOLON','LESS_THAN',_0xa0779(0x381),_0xa0779(0x841),_0xa0779(0x177),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','',_0xa0779(0x8f6),'',_0xa0779(0x336),_0xa0779(0x160),_0xa0779(0x693),'NUMPAD2',_0xa0779(0x5bc),_0xa0779(0x569),_0xa0779(0x23d),_0xa0779(0x6ba),_0xa0779(0x767),_0xa0779(0x933),'NUMPAD9','MULTIPLY',_0xa0779(0x9cb),_0xa0779(0x8ac),'SUBTRACT',_0xa0779(0x78e),_0xa0779(0x9eb),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0xa0779(0x31a),_0xa0779(0x621),_0xa0779(0x662),_0xa0779(0x19f),_0xa0779(0x86e),_0xa0779(0x70c),_0xa0779(0x9f3),'F17','F18',_0xa0779(0x25c),_0xa0779(0x1b0),'F21',_0xa0779(0x946),_0xa0779(0x5ef),'F24','','','','','','','','',_0xa0779(0x5e0),'SCROLL_LOCK','WIN_OEM_FJ_JISHO',_0xa0779(0x836),_0xa0779(0x542),'WIN_OEM_FJ_LOYA',_0xa0779(0x9ca),'','','','','','','','','',_0xa0779(0x24f),_0xa0779(0x806),_0xa0779(0x4a4),_0xa0779(0x511),_0xa0779(0x9ad),_0xa0779(0x666),_0xa0779(0x911),'UNDERSCORE',_0xa0779(0x9dd),_0xa0779(0x72c),_0xa0779(0x804),'PLUS','PIPE',_0xa0779(0x17c),_0xa0779(0x18f),'CLOSE_CURLY_BRACKET',_0xa0779(0x696),'','','','',_0xa0779(0x7d0),_0xa0779(0x5ad),'VOLUME_UP','','','SEMICOLON',_0xa0779(0x381),_0xa0779(0x668),_0xa0779(0x9c7),_0xa0779(0x904),_0xa0779(0x8e7),_0xa0779(0x2d7),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0xa0779(0x8b6),_0xa0779(0x51d),_0xa0779(0x93c),_0xa0779(0x5e4),'','META',_0xa0779(0x4bb),'',_0xa0779(0x6ca),_0xa0779(0x7d7),'',_0xa0779(0x19a),'','',_0xa0779(0x5f1),'WIN_OEM_JUMP',_0xa0779(0x905),_0xa0779(0x712),_0xa0779(0x863),_0xa0779(0x267),_0xa0779(0x921),'WIN_OEM_ATTN',_0xa0779(0x540),_0xa0779(0x875),_0xa0779(0x531),_0xa0779(0x4d8),'WIN_OEM_BACKTAB','ATTN',_0xa0779(0x728),_0xa0779(0x5b9),_0xa0779(0x4cf),'PLAY',_0xa0779(0x3b8),'',_0xa0779(0x835),_0xa0779(0x882),''],TextManager[_0xa0779(0x25e)]=VisuMZ['CoreEngine'][_0xa0779(0x17f)][_0xa0779(0x2c3)]['OkText'],TextManager[_0xa0779(0x1a3)]=VisuMZ[_0xa0779(0x824)][_0xa0779(0x17f)][_0xa0779(0x2c3)][_0xa0779(0x2a5)],TextManager['buttonAssistSwitch']=VisuMZ['CoreEngine']['Settings'][_0xa0779(0x2c3)]['SwitchActorText'],VisuMZ[_0xa0779(0x824)][_0xa0779(0x201)]=TextManager['param'],TextManager['param']=function(_0x57d7b2){const _0x5693de=_0xa0779;return typeof _0x57d7b2===_0x5693de(0x97d)?VisuMZ[_0x5693de(0x824)]['TextManager_param'][_0x5693de(0x398)](this,_0x57d7b2):this[_0x5693de(0x876)](_0x57d7b2);},TextManager[_0xa0779(0x876)]=function(_0x3f0264){const _0x556aea=_0xa0779;_0x3f0264=String(_0x3f0264||'')[_0x556aea(0x7c9)]();const _0x9c4b81=VisuMZ['CoreEngine'][_0x556aea(0x17f)][_0x556aea(0x34a)];if(_0x3f0264===_0x556aea(0x37a))return $dataSystem['terms'][_0x556aea(0x3eb)][0x0];if(_0x3f0264===_0x556aea(0x8d2))return $dataSystem['terms']['params'][0x1];if(_0x3f0264==='ATK')return $dataSystem[_0x556aea(0x9c8)][_0x556aea(0x3eb)][0x2];if(_0x3f0264==='DEF')return $dataSystem[_0x556aea(0x9c8)][_0x556aea(0x3eb)][0x3];if(_0x3f0264===_0x556aea(0x418))return $dataSystem[_0x556aea(0x9c8)][_0x556aea(0x3eb)][0x4];if(_0x3f0264===_0x556aea(0x897))return $dataSystem[_0x556aea(0x9c8)][_0x556aea(0x3eb)][0x5];if(_0x3f0264==='AGI')return $dataSystem[_0x556aea(0x9c8)][_0x556aea(0x3eb)][0x6];if(_0x3f0264==='LUK')return $dataSystem[_0x556aea(0x9c8)]['params'][0x7];if(_0x3f0264===_0x556aea(0x64f))return _0x9c4b81['XParamVocab0'];if(_0x3f0264===_0x556aea(0x329))return _0x9c4b81[_0x556aea(0x391)];if(_0x3f0264===_0x556aea(0x552))return _0x9c4b81['XParamVocab2'];if(_0x3f0264==='CEV')return _0x9c4b81['XParamVocab3'];if(_0x3f0264===_0x556aea(0x3df))return _0x9c4b81['XParamVocab4'];if(_0x3f0264===_0x556aea(0x7d1))return _0x9c4b81[_0x556aea(0x913)];if(_0x3f0264===_0x556aea(0x630))return _0x9c4b81[_0x556aea(0x577)];if(_0x3f0264===_0x556aea(0x399))return _0x9c4b81[_0x556aea(0x98d)];if(_0x3f0264==='MRG')return _0x9c4b81[_0x556aea(0x7b0)];if(_0x3f0264==='TRG')return _0x9c4b81['XParamVocab9'];if(_0x3f0264===_0x556aea(0x9e3))return _0x9c4b81[_0x556aea(0x4c4)];if(_0x3f0264===_0x556aea(0x64e))return _0x9c4b81[_0x556aea(0x2f1)];if(_0x3f0264===_0x556aea(0x9d8))return _0x9c4b81[_0x556aea(0x42f)];if(_0x3f0264==='PHA')return _0x9c4b81[_0x556aea(0x941)];if(_0x3f0264===_0x556aea(0x788))return _0x9c4b81[_0x556aea(0x7ce)];if(_0x3f0264==='TCR')return _0x9c4b81[_0x556aea(0x86a)];if(_0x3f0264===_0x556aea(0x97c))return _0x9c4b81[_0x556aea(0x889)];if(_0x3f0264===_0x556aea(0x867))return _0x9c4b81[_0x556aea(0x992)];if(_0x3f0264===_0x556aea(0x69a))return _0x9c4b81[_0x556aea(0x9bb)];if(_0x3f0264===_0x556aea(0x963))return _0x9c4b81[_0x556aea(0x8bf)];if(VisuMZ[_0x556aea(0x824)]['CustomParamNames'][_0x3f0264]){if(_0x556aea(0x245)!==_0x556aea(0x245)){this['_fauxAnimationSprites']['remove'](_0x24b33b),this[_0x556aea(0x895)](_0xbf5067);for(const _0x184eda of _0x2ddddb['targetObjects']){_0x184eda['endAnimation']&&_0x184eda[_0x556aea(0x2de)]();}_0x3e6e1d[_0x556aea(0x372)]();}else return VisuMZ[_0x556aea(0x824)][_0x556aea(0x3f0)][_0x3f0264];}return'';},TextManager[_0xa0779(0x170)]=function(_0x3589da){const _0x399ad1=_0xa0779,_0x2129c5=Input[_0x399ad1(0x3c3)]();if(_0x2129c5==='Keyboard'){if('qikql'!=='xTtEO')return this[_0x399ad1(0x5e5)](_0x3589da);else _0x1affdd['pitch']=_0x454e71,_0x3c7fd9[_0x399ad1(0x1c1)](_0x5b48dc);}else return this['getControllerInputButtonString'](_0x2129c5,_0x3589da);},TextManager[_0xa0779(0x5e5)]=function(_0x6b44e){const _0x25fce7=_0xa0779;if(_0x6b44e===_0x25fce7(0x4d2))_0x6b44e=_0x25fce7(0x5d1);if(_0x6b44e===_0x25fce7(0x924))_0x6b44e=_0x25fce7(0x5d1);let _0x199115=[];for(let _0x354359 in Input[_0x25fce7(0x6ff)]){if(_0x25fce7(0x389)===_0x25fce7(0x8b7)){_0x5bf53e=_0x247504||0x10e,this[_0x25fce7(0x5fe)]();if(_0x4cacf3[_0x25fce7(0x824)]['Settings']['UI'][_0x25fce7(0x67c)])this[_0x25fce7(0x227)](_0x2dfb8a['nickname'](),_0x588fe7,_0x5a6d82,_0x245c97);else{const _0x2cbc31=_0x192156[_0x25fce7(0x2df)]()[_0x25fce7(0x710)](/\\I\[(\d+)\]/gi,'');this[_0x25fce7(0x65f)](_0x45bddb['nickname'](),_0x2be298,_0x459ce1,_0x2e6522);}}else{_0x354359=Number(_0x354359);if(_0x354359>=0x60&&_0x354359<=0x69)continue;if([0x12,0x20]['includes'](_0x354359))continue;_0x6b44e===Input[_0x25fce7(0x6ff)][_0x354359]&&_0x199115[_0x25fce7(0x55f)](_0x354359);}}for(let _0x299e09=0x0;_0x299e09<_0x199115[_0x25fce7(0x444)];_0x299e09++){if(_0x25fce7(0x648)===_0x25fce7(0x3ef)){if(!this[_0x25fce7(0x4fe)])return;this['x']=this[_0x25fce7(0x4fe)][_0x25fce7(0x83c)],this['y']=this[_0x25fce7(0x4fe)][_0x25fce7(0x14e)],this[_0x25fce7(0x21c)]['x']=this['_coreEasing'][_0x25fce7(0x1aa)],this[_0x25fce7(0x21c)]['y']=this[_0x25fce7(0x4fe)]['targetScaleY'],this[_0x25fce7(0x645)]=this['_coreEasing'][_0x25fce7(0x5fb)],this[_0x25fce7(0x27f)]=this[_0x25fce7(0x4fe)]['targetBackOpacity'],this[_0x25fce7(0x681)]=this[_0x25fce7(0x4fe)][_0x25fce7(0x8ba)],this['setupCoreEasing'](_0x15f68e,_0x3826b8,this['x'],this['y'],this[_0x25fce7(0x21c)]['x'],this['scale']['y'],this[_0x25fce7(0x645)],this[_0x25fce7(0x27f)],this['contentsOpacity']);}else _0x199115[_0x299e09]=TextManager[_0x25fce7(0x71b)][_0x199115[_0x299e09]];}return this[_0x25fce7(0x2fe)](_0x199115);},TextManager[_0xa0779(0x2fe)]=function(_0x1cee61){const _0x63cc03=_0xa0779,_0x3a49f8=VisuMZ[_0x63cc03(0x824)][_0x63cc03(0x17f)][_0x63cc03(0x2c3)],_0x4c4995=_0x3a49f8['KeyUnlisted'],_0x12266a=_0x1cee61['pop'](),_0x41212f=_0x63cc03(0x3ed)['format'](_0x12266a);return _0x3a49f8[_0x41212f]?_0x3a49f8[_0x41212f]:_0x4c4995[_0x63cc03(0x6ad)](_0x12266a);},TextManager[_0xa0779(0x727)]=function(_0x45d4af,_0x498d7c){const _0x2a6682=_0xa0779,_0x3683f5=VisuMZ[_0x2a6682(0x824)][_0x2a6682(0x17f)][_0x2a6682(0x2c3)],_0x5cd943=_0x3683f5[_0x2a6682(0x49b)],_0x45fb0e=this[_0x2a6682(0x170)](_0x45d4af),_0x410929=this[_0x2a6682(0x170)](_0x498d7c);return _0x5cd943[_0x2a6682(0x6ad)](_0x45fb0e,_0x410929);},TextManager[_0xa0779(0x46c)]=function(_0x3b4202,_0x2b93ce){const _0x55f7f4=_0xa0779,_0x43335a=_0x3b4202[_0x55f7f4(0x538)]()[_0x55f7f4(0x64c)](),_0x1baed1=VisuMZ[_0x55f7f4(0x824)][_0x55f7f4(0x1b1)][_0x43335a];if(!_0x1baed1)return this[_0x55f7f4(0x91b)](_0x3b4202,_0x2b93ce);return _0x1baed1[_0x2b93ce]||this[_0x55f7f4(0x5e5)](_0x3b4202,_0x2b93ce);},TextManager['getControllerInputButtonMatch']=function(_0x4e06d7,_0xdd3b9b){const _0x202323=_0xa0779,_0x3ae9bf=_0x4e06d7[_0x202323(0x538)]()['trim']();for(const _0x1e3a49 in VisuMZ['CoreEngine'][_0x202323(0x91a)]){if(_0x3ae9bf[_0x202323(0x84f)](_0x1e3a49)){if(_0x202323(0x878)===_0x202323(0x878)){const _0x5ebfb5=VisuMZ[_0x202323(0x824)][_0x202323(0x91a)][_0x1e3a49],_0x471587=VisuMZ[_0x202323(0x824)][_0x202323(0x1b1)][_0x5ebfb5];return _0x471587[_0xdd3b9b]||this[_0x202323(0x5e5)](_0xdd3b9b);}else this['_digitGroupingEx']=_0x2677a6;}}return this['getKeyboardInputButtonString'](_0xdd3b9b);},VisuMZ[_0xa0779(0x824)][_0xa0779(0x1ed)]=ColorManager[_0xa0779(0x28a)],ColorManager[_0xa0779(0x28a)]=function(){const _0x47e794=_0xa0779;VisuMZ[_0x47e794(0x824)][_0x47e794(0x1ed)][_0x47e794(0x398)](this),this[_0x47e794(0x97b)]=this[_0x47e794(0x97b)]||{};},ColorManager[_0xa0779(0x8a2)]=function(_0x3937d5,_0x38e5da){const _0x12ab35=_0xa0779;return _0x38e5da=String(_0x38e5da),this[_0x12ab35(0x97b)]=this[_0x12ab35(0x97b)]||{},_0x38e5da[_0x12ab35(0x758)](/#(.*)/i)?this[_0x12ab35(0x97b)][_0x3937d5]=_0x12ab35(0x2aa)['format'](String(RegExp['$1'])):this[_0x12ab35(0x97b)][_0x3937d5]=this[_0x12ab35(0x452)](Number(_0x38e5da)),this[_0x12ab35(0x97b)][_0x3937d5];},ColorManager['getColor']=function(_0x43ff71){const _0xaa1f77=_0xa0779;return _0x43ff71=String(_0x43ff71),_0x43ff71['match'](/#(.*)/i)?_0xaa1f77(0x2aa)[_0xaa1f77(0x6ad)](String(RegExp['$1'])):this[_0xaa1f77(0x452)](Number(_0x43ff71));},ColorManager[_0xa0779(0x1a6)]=function(){const _0x3a8c1c=_0xa0779;this[_0x3a8c1c(0x97b)]={};},ColorManager['normalColor']=function(){const _0x162162=_0xa0779,_0x29a556=_0x162162(0x1be);this[_0x162162(0x97b)]=this['_colorCache']||{};if(this[_0x162162(0x97b)][_0x29a556])return this['_colorCache'][_0x29a556];const _0x45e1ed=VisuMZ[_0x162162(0x824)][_0x162162(0x17f)][_0x162162(0x6b1)][_0x162162(0x831)];return this[_0x162162(0x8a2)](_0x29a556,_0x45e1ed);},ColorManager['systemColor']=function(){const _0x4dfac6=_0xa0779,_0x1e1975='_stored_systemColor';this[_0x4dfac6(0x97b)]=this[_0x4dfac6(0x97b)]||{};if(this['_colorCache'][_0x1e1975])return this[_0x4dfac6(0x97b)][_0x1e1975];const _0x359e05=VisuMZ[_0x4dfac6(0x824)]['Settings']['Color'][_0x4dfac6(0x79f)];return this['getColorDataFromPluginParameters'](_0x1e1975,_0x359e05);},ColorManager['crisisColor']=function(){const _0xca9314=_0xa0779,_0x43a95d='_stored_crisisColor';this[_0xca9314(0x97b)]=this['_colorCache']||{};if(this[_0xca9314(0x97b)][_0x43a95d])return this[_0xca9314(0x97b)][_0x43a95d];const _0x35fd01=VisuMZ[_0xca9314(0x824)]['Settings'][_0xca9314(0x6b1)][_0xca9314(0x9cc)];return this['getColorDataFromPluginParameters'](_0x43a95d,_0x35fd01);},ColorManager['deathColor']=function(){const _0x5550aa=_0xa0779,_0x9ec5e1=_0x5550aa(0x657);this['_colorCache']=this[_0x5550aa(0x97b)]||{};if(this[_0x5550aa(0x97b)][_0x9ec5e1])return this['_colorCache'][_0x9ec5e1];const _0x5a0d06=VisuMZ['CoreEngine'][_0x5550aa(0x17f)]['Color']['ColorDeath'];return this[_0x5550aa(0x8a2)](_0x9ec5e1,_0x5a0d06);},ColorManager['gaugeBackColor']=function(){const _0x15daa9=_0xa0779,_0x1042c3=_0x15daa9(0x98c);this[_0x15daa9(0x97b)]=this[_0x15daa9(0x97b)]||{};if(this[_0x15daa9(0x97b)][_0x1042c3])return this[_0x15daa9(0x97b)][_0x1042c3];const _0x5b694d=VisuMZ[_0x15daa9(0x824)][_0x15daa9(0x17f)][_0x15daa9(0x6b1)][_0x15daa9(0x29f)];return this['getColorDataFromPluginParameters'](_0x1042c3,_0x5b694d);},ColorManager[_0xa0779(0x702)]=function(){const _0x2c28ef=_0xa0779,_0x64d215=_0x2c28ef(0x2b7);this[_0x2c28ef(0x97b)]=this['_colorCache']||{};if(this['_colorCache'][_0x64d215])return this[_0x2c28ef(0x97b)][_0x64d215];const _0x2e7c0f=VisuMZ['CoreEngine'][_0x2c28ef(0x17f)]['Color'][_0x2c28ef(0x59e)];return this[_0x2c28ef(0x8a2)](_0x64d215,_0x2e7c0f);},ColorManager['hpGaugeColor2']=function(){const _0x2e4270=_0xa0779,_0x71de60='_stored_hpGaugeColor2';this[_0x2e4270(0x97b)]=this[_0x2e4270(0x97b)]||{};if(this[_0x2e4270(0x97b)][_0x71de60])return this[_0x2e4270(0x97b)][_0x71de60];const _0x24d333=VisuMZ[_0x2e4270(0x824)][_0x2e4270(0x17f)][_0x2e4270(0x6b1)]['ColorHPGauge2'];return this[_0x2e4270(0x8a2)](_0x71de60,_0x24d333);},ColorManager[_0xa0779(0x200)]=function(){const _0x3748a9=_0xa0779,_0x51c2b6=_0x3748a9(0x3e9);this[_0x3748a9(0x97b)]=this[_0x3748a9(0x97b)]||{};if(this[_0x3748a9(0x97b)][_0x51c2b6])return this[_0x3748a9(0x97b)][_0x51c2b6];const _0x2d3df6=VisuMZ[_0x3748a9(0x824)][_0x3748a9(0x17f)]['Color'][_0x3748a9(0x948)];return this[_0x3748a9(0x8a2)](_0x51c2b6,_0x2d3df6);},ColorManager[_0xa0779(0x370)]=function(){const _0x2f2f57=_0xa0779,_0x43d193=_0x2f2f57(0x4ff);this[_0x2f2f57(0x97b)]=this[_0x2f2f57(0x97b)]||{};if(this[_0x2f2f57(0x97b)][_0x43d193])return this[_0x2f2f57(0x97b)][_0x43d193];const _0xd9a59f=VisuMZ['CoreEngine'][_0x2f2f57(0x17f)][_0x2f2f57(0x6b1)][_0x2f2f57(0x4ad)];return this[_0x2f2f57(0x8a2)](_0x43d193,_0xd9a59f);},ColorManager[_0xa0779(0x1bc)]=function(){const _0x3ba7a9=_0xa0779,_0xa711a=_0x3ba7a9(0x4fc);this[_0x3ba7a9(0x97b)]=this[_0x3ba7a9(0x97b)]||{};if(this[_0x3ba7a9(0x97b)][_0xa711a])return this[_0x3ba7a9(0x97b)][_0xa711a];const _0x53b895=VisuMZ['CoreEngine'][_0x3ba7a9(0x17f)][_0x3ba7a9(0x6b1)][_0x3ba7a9(0x8de)];return this['getColorDataFromPluginParameters'](_0xa711a,_0x53b895);},ColorManager[_0xa0779(0x3b9)]=function(){const _0x49dfa9=_0xa0779,_0x5cee58=_0x49dfa9(0x585);this[_0x49dfa9(0x97b)]=this['_colorCache']||{};if(this[_0x49dfa9(0x97b)][_0x5cee58])return this['_colorCache'][_0x5cee58];const _0x4e4397=VisuMZ['CoreEngine'][_0x49dfa9(0x17f)][_0x49dfa9(0x6b1)][_0x49dfa9(0x724)];return this[_0x49dfa9(0x8a2)](_0x5cee58,_0x4e4397);},ColorManager[_0xa0779(0x362)]=function(){const _0x47326a=_0xa0779,_0x27042e='_stored_powerDownColor';this['_colorCache']=this[_0x47326a(0x97b)]||{};if(this[_0x47326a(0x97b)][_0x27042e])return this['_colorCache'][_0x27042e];const _0x3cbd8f=VisuMZ['CoreEngine'][_0x47326a(0x17f)][_0x47326a(0x6b1)]['ColorPowerDown'];return this[_0x47326a(0x8a2)](_0x27042e,_0x3cbd8f);},ColorManager[_0xa0779(0x504)]=function(){const _0x15fd9d=_0xa0779,_0x4927fb='_stored_ctGaugeColor1';this[_0x15fd9d(0x97b)]=this['_colorCache']||{};if(this[_0x15fd9d(0x97b)][_0x4927fb])return this[_0x15fd9d(0x97b)][_0x4927fb];const _0x8cf12d=VisuMZ['CoreEngine'][_0x15fd9d(0x17f)]['Color'][_0x15fd9d(0x7f3)];return this[_0x15fd9d(0x8a2)](_0x4927fb,_0x8cf12d);},ColorManager[_0xa0779(0x181)]=function(){const _0x502b72=_0xa0779,_0x20b49a=_0x502b72(0x932);this[_0x502b72(0x97b)]=this[_0x502b72(0x97b)]||{};if(this[_0x502b72(0x97b)][_0x20b49a])return this[_0x502b72(0x97b)][_0x20b49a];const _0x35e203=VisuMZ['CoreEngine'][_0x502b72(0x17f)][_0x502b72(0x6b1)][_0x502b72(0x462)];return this[_0x502b72(0x8a2)](_0x20b49a,_0x35e203);},ColorManager['tpGaugeColor1']=function(){const _0x2de1a2=_0xa0779,_0x1572f0=_0x2de1a2(0x338);this['_colorCache']=this[_0x2de1a2(0x97b)]||{};if(this['_colorCache'][_0x1572f0])return this[_0x2de1a2(0x97b)][_0x1572f0];const _0x4f880a=VisuMZ[_0x2de1a2(0x824)]['Settings']['Color']['ColorTPGauge1'];return this[_0x2de1a2(0x8a2)](_0x1572f0,_0x4f880a);},ColorManager[_0xa0779(0x9f0)]=function(){const _0x5b526d=_0xa0779,_0x2bf669='_stored_tpGaugeColor2';this[_0x5b526d(0x97b)]=this[_0x5b526d(0x97b)]||{};if(this['_colorCache'][_0x2bf669])return this[_0x5b526d(0x97b)][_0x2bf669];const _0x3d860a=VisuMZ[_0x5b526d(0x824)][_0x5b526d(0x17f)][_0x5b526d(0x6b1)][_0x5b526d(0x395)];return this['getColorDataFromPluginParameters'](_0x2bf669,_0x3d860a);},ColorManager[_0xa0779(0x6d5)]=function(){const _0x6ce849=_0xa0779,_0x4e977e='_stored_tpCostColor';this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x4e977e])return this['_colorCache'][_0x4e977e];const _0x48313c=VisuMZ['CoreEngine'][_0x6ce849(0x17f)][_0x6ce849(0x6b1)][_0x6ce849(0x60e)];return this[_0x6ce849(0x8a2)](_0x4e977e,_0x48313c);},ColorManager['pendingColor']=function(){const _0x3f6b46=_0xa0779,_0x56c8a8=_0x3f6b46(0x5f7);this[_0x3f6b46(0x97b)]=this[_0x3f6b46(0x97b)]||{};if(this['_colorCache'][_0x56c8a8])return this[_0x3f6b46(0x97b)][_0x56c8a8];const _0x50846f=VisuMZ[_0x3f6b46(0x824)][_0x3f6b46(0x17f)][_0x3f6b46(0x6b1)][_0x3f6b46(0x60e)];return this[_0x3f6b46(0x8a2)](_0x56c8a8,_0x50846f);},ColorManager['expGaugeColor1']=function(){const _0x3703f5=_0xa0779,_0xab63d8=_0x3703f5(0x99f);this[_0x3703f5(0x97b)]=this[_0x3703f5(0x97b)]||{};if(this['_colorCache'][_0xab63d8])return this[_0x3703f5(0x97b)][_0xab63d8];const _0x1939c0=VisuMZ['CoreEngine'][_0x3703f5(0x17f)]['Color'][_0x3703f5(0x899)];return this[_0x3703f5(0x8a2)](_0xab63d8,_0x1939c0);},ColorManager[_0xa0779(0x440)]=function(){const _0x55ea7f=_0xa0779,_0x41ba1c=_0x55ea7f(0x454);this[_0x55ea7f(0x97b)]=this[_0x55ea7f(0x97b)]||{};if(this['_colorCache'][_0x41ba1c])return this[_0x55ea7f(0x97b)][_0x41ba1c];const _0x4c1a52=VisuMZ[_0x55ea7f(0x824)]['Settings'][_0x55ea7f(0x6b1)]['ColorExpGauge2'];return this[_0x55ea7f(0x8a2)](_0x41ba1c,_0x4c1a52);},ColorManager[_0xa0779(0x9a9)]=function(){const _0x2390be=_0xa0779,_0xf5460b=_0x2390be(0x7d3);this[_0x2390be(0x97b)]=this[_0x2390be(0x97b)]||{};if(this[_0x2390be(0x97b)][_0xf5460b])return this[_0x2390be(0x97b)][_0xf5460b];const _0x32efd7=VisuMZ[_0x2390be(0x824)][_0x2390be(0x17f)][_0x2390be(0x6b1)][_0x2390be(0x35d)];return this[_0x2390be(0x8a2)](_0xf5460b,_0x32efd7);},ColorManager['maxLvGaugeColor2']=function(){const _0xf50aa0=_0xa0779,_0xb008a7=_0xf50aa0(0x7b6);this['_colorCache']=this[_0xf50aa0(0x97b)]||{};if(this[_0xf50aa0(0x97b)][_0xb008a7])return this[_0xf50aa0(0x97b)][_0xb008a7];const _0x5e72b2=VisuMZ['CoreEngine'][_0xf50aa0(0x17f)][_0xf50aa0(0x6b1)][_0xf50aa0(0x471)];return this[_0xf50aa0(0x8a2)](_0xb008a7,_0x5e72b2);},ColorManager[_0xa0779(0x8bc)]=function(_0x2281d3){const _0x2fdd00=_0xa0779;return VisuMZ[_0x2fdd00(0x824)]['Settings'][_0x2fdd00(0x6b1)][_0x2fdd00(0x49e)]['call'](this,_0x2281d3);},ColorManager['mpColor']=function(_0x40ee28){const _0x31635a=_0xa0779;return VisuMZ[_0x31635a(0x824)][_0x31635a(0x17f)][_0x31635a(0x6b1)][_0x31635a(0x72a)][_0x31635a(0x398)](this,_0x40ee28);},ColorManager[_0xa0779(0x1bd)]=function(_0x2867b9){const _0x8d53a5=_0xa0779;return VisuMZ[_0x8d53a5(0x824)][_0x8d53a5(0x17f)]['Color'][_0x8d53a5(0x51a)][_0x8d53a5(0x398)](this,_0x2867b9);},ColorManager[_0xa0779(0x2d8)]=function(_0x130e12){const _0x472bfa=_0xa0779;return VisuMZ['CoreEngine'][_0x472bfa(0x17f)][_0x472bfa(0x6b1)][_0x472bfa(0x2fc)][_0x472bfa(0x398)](this,_0x130e12);},ColorManager[_0xa0779(0x8f2)]=function(_0x55d4fd){const _0x4ce584=_0xa0779;return VisuMZ['CoreEngine'][_0x4ce584(0x17f)][_0x4ce584(0x6b1)][_0x4ce584(0x4cb)][_0x4ce584(0x398)](this,_0x55d4fd);},ColorManager[_0xa0779(0x798)]=function(){const _0x4c32e0=_0xa0779;return VisuMZ[_0x4c32e0(0x824)][_0x4c32e0(0x17f)][_0x4c32e0(0x6b1)][_0x4c32e0(0x5e1)];},ColorManager[_0xa0779(0x3ce)]=function(){const _0x5977d0=_0xa0779;return VisuMZ[_0x5977d0(0x824)][_0x5977d0(0x17f)][_0x5977d0(0x6b1)][_0x5977d0(0x425)]||'rgba(0,\x200,\x200,\x200.7)';},ColorManager[_0xa0779(0x244)]=function(){const _0x3bc861=_0xa0779;return VisuMZ[_0x3bc861(0x824)]['Settings'][_0x3bc861(0x6b1)]['OutlineColorGauge']||_0x3bc861(0x1fe);},ColorManager[_0xa0779(0x50e)]=function(){const _0x1669e9=_0xa0779;return VisuMZ[_0x1669e9(0x824)][_0x1669e9(0x17f)][_0x1669e9(0x6b1)][_0x1669e9(0x2ec)];},ColorManager[_0xa0779(0x5b2)]=function(){const _0x500769=_0xa0779;return VisuMZ['CoreEngine'][_0x500769(0x17f)][_0x500769(0x6b1)][_0x500769(0x9ec)];},ColorManager[_0xa0779(0x9c9)]=function(){const _0x32f117=_0xa0779;return VisuMZ['CoreEngine'][_0x32f117(0x17f)][_0x32f117(0x6b1)][_0x32f117(0x50d)];},ColorManager[_0xa0779(0x741)]=function(){const _0x45986f=_0xa0779;return VisuMZ[_0x45986f(0x824)][_0x45986f(0x17f)][_0x45986f(0x6b1)][_0x45986f(0x175)];},SceneManager[_0xa0779(0x747)]=[],SceneManager[_0xa0779(0x714)]=function(){const _0x625c07=_0xa0779;return this['_scene']&&this[_0x625c07(0x6a6)][_0x625c07(0x8ec)]===Scene_Battle;},SceneManager[_0xa0779(0x9aa)]=function(){const _0x37d2c0=_0xa0779;return this[_0x37d2c0(0x6a6)]&&this[_0x37d2c0(0x6a6)]['constructor']===Scene_Map;},SceneManager[_0xa0779(0x79c)]=function(){const _0x2b3a43=_0xa0779;return this[_0x2b3a43(0x6a6)]&&this[_0x2b3a43(0x6a6)]instanceof Scene_Map;},VisuMZ[_0xa0779(0x824)][_0xa0779(0x202)]=SceneManager[_0xa0779(0x288)],SceneManager[_0xa0779(0x288)]=function(){const _0x2f30a2=_0xa0779;VisuMZ[_0x2f30a2(0x824)][_0x2f30a2(0x202)][_0x2f30a2(0x398)](this),this[_0x2f30a2(0x8f3)]();},VisuMZ[_0xa0779(0x824)][_0xa0779(0x351)]=SceneManager[_0xa0779(0x220)],SceneManager[_0xa0779(0x220)]=function(_0x2df5dd){const _0x34e862=_0xa0779;if($gameTemp)this['onKeyDownKeysF6F7'](_0x2df5dd);VisuMZ[_0x34e862(0x824)][_0x34e862(0x351)][_0x34e862(0x398)](this,_0x2df5dd);},SceneManager[_0xa0779(0x6e6)]=function(_0x58854a){const _0x245f6c=_0xa0779;if(!_0x58854a[_0x245f6c(0x8b1)]&&!_0x58854a[_0x245f6c(0x6fd)])switch(_0x58854a['keyCode']){case 0x54:this[_0x245f6c(0x5e2)]();break;case 0x75:this[_0x245f6c(0x683)]();break;case 0x76:if(Input['isPressed'](_0x245f6c(0x41f))||Input['isPressed']('ctrl'))return;this['playTestF7']();break;}},SceneManager[_0xa0779(0x683)]=function(){const _0x15456b=_0xa0779;if($gameTemp[_0x15456b(0x6bb)]()&&VisuMZ[_0x15456b(0x824)][_0x15456b(0x17f)][_0x15456b(0x2b0)][_0x15456b(0x58c)]){ConfigManager['seVolume']!==0x0?(ConfigManager[_0x15456b(0x225)]=0x0,ConfigManager['bgsVolume']=0x0,ConfigManager[_0x15456b(0x5f6)]=0x0,ConfigManager[_0x15456b(0x733)]=0x0):(ConfigManager['bgmVolume']=0x64,ConfigManager[_0x15456b(0x4a6)]=0x64,ConfigManager[_0x15456b(0x5f6)]=0x64,ConfigManager[_0x15456b(0x733)]=0x64);ConfigManager[_0x15456b(0x21e)]();if(this[_0x15456b(0x6a6)][_0x15456b(0x8ec)]===Scene_Options){if(this[_0x15456b(0x6a6)][_0x15456b(0x40a)])this[_0x15456b(0x6a6)][_0x15456b(0x40a)][_0x15456b(0x1d4)]();if(this[_0x15456b(0x6a6)][_0x15456b(0x162)])this['_scene'][_0x15456b(0x162)]['refresh']();}}},SceneManager['playTestF7']=function(){const _0x1e3ef4=_0xa0779;$gameTemp['isPlaytest']()&&VisuMZ[_0x1e3ef4(0x824)][_0x1e3ef4(0x17f)]['QoL'][_0x1e3ef4(0x2ef)]&&($gameTemp['_playTestFastMode']=!$gameTemp[_0x1e3ef4(0x678)]);},SceneManager['playTestCtrlT']=function(){const _0x3a9f2=_0xa0779;if(!$gameTemp['isPlaytest']())return;if(!SceneManager[_0x3a9f2(0x714)]())return;for(const _0xc23ce9 of $gameParty[_0x3a9f2(0x88c)]()){if(!_0xc23ce9)continue;_0xc23ce9[_0x3a9f2(0x92f)](_0xc23ce9[_0x3a9f2(0x73c)]());}},SceneManager[_0xa0779(0x8f3)]=function(){const _0x5a7b99=_0xa0779;this[_0x5a7b99(0x59b)]=![],this[_0x5a7b99(0x2b9)]=!VisuMZ[_0x5a7b99(0x824)][_0x5a7b99(0x17f)]['UI'][_0x5a7b99(0x4b6)];},SceneManager[_0xa0779(0x8cd)]=function(_0x90664b){const _0x5b35cf=_0xa0779;VisuMZ[_0x5b35cf(0x824)]['Settings']['UI'][_0x5b35cf(0x811)]&&(this[_0x5b35cf(0x59b)]=_0x90664b);},SceneManager[_0xa0779(0x164)]=function(){return this['_sideButtonLayout'];},SceneManager['areButtonsHidden']=function(){const _0x27bd5f=_0xa0779;return this[_0x27bd5f(0x2b9)];},SceneManager['areButtonsOutsideMainUI']=function(){const _0x328c0f=_0xa0779;return this[_0x328c0f(0x85f)]()||this[_0x328c0f(0x164)]();},VisuMZ[_0xa0779(0x824)]['SceneManager_isGameActive']=SceneManager['isGameActive'],SceneManager['isGameActive']=function(){const _0x34272f=_0xa0779;if(VisuMZ[_0x34272f(0x824)][_0x34272f(0x17f)][_0x34272f(0x2b0)][_0x34272f(0x5a6)])return VisuMZ['CoreEngine'][_0x34272f(0x872)][_0x34272f(0x398)](this);else{if(_0x34272f(0x265)==='DVhMh')return!![];else _0x3ce3ff[_0x34272f(0x6be)]();}},SceneManager[_0xa0779(0x281)]=function(_0x5775e4){const _0x411fdc=_0xa0779;if(_0x5775e4 instanceof Error)_0x411fdc(0x2bd)==='oKDIl'?this[_0x411fdc(0x516)](_0x5775e4):this['isUseModernControls']()?this[_0x411fdc(0x237)]():_0x53f019['CoreEngine'][_0x411fdc(0x920)][_0x411fdc(0x398)](this);else{if(_0x5775e4 instanceof Array&&_0x5775e4[0x0]===_0x411fdc(0x4ec)){if(_0x411fdc(0x7e4)!==_0x411fdc(0x6eb))this['catchLoadError'](_0x5775e4);else return this[_0x411fdc(0x6c3)](_0x295fe2,_0x1c77a8);}else this[_0x411fdc(0x909)](_0x5775e4);}this[_0x411fdc(0x223)]();},VisuMZ[_0xa0779(0x824)]['BattleManager_processEscape']=BattleManager[_0xa0779(0x8e5)],BattleManager[_0xa0779(0x8e5)]=function(){const _0x30f1dd=_0xa0779;if(VisuMZ[_0x30f1dd(0x824)][_0x30f1dd(0x17f)][_0x30f1dd(0x2b0)][_0x30f1dd(0x9f4)])this[_0x30f1dd(0x1c0)]();else{if(_0x30f1dd(0x3b3)===_0x30f1dd(0x15c))_0x218484=_0x1b5b11[_0x30f1dd(0x82a)](_0x522a78);else return VisuMZ[_0x30f1dd(0x824)][_0x30f1dd(0x687)][_0x30f1dd(0x398)](this);}},BattleManager[_0xa0779(0x1c0)]=function(){const _0x24be36=_0xa0779;return $gameParty['performEscape'](),SoundManager[_0x24be36(0x772)](),this[_0x24be36(0x997)](),!![];},BattleManager[_0xa0779(0x80c)]=function(){const _0x1c7d8e=_0xa0779;return $gameSystem[_0x1c7d8e(0x72f)]()>=0x1;},BattleManager[_0xa0779(0x7c5)]=function(){const _0x272c37=_0xa0779;return $gameSystem[_0x272c37(0x72f)]()===0x1;},VisuMZ[_0xa0779(0x824)][_0xa0779(0x48b)]=Game_Temp[_0xa0779(0x271)][_0xa0779(0x288)],Game_Temp['prototype'][_0xa0779(0x288)]=function(){const _0x23fa54=_0xa0779;VisuMZ[_0x23fa54(0x824)][_0x23fa54(0x48b)][_0x23fa54(0x398)](this),this['forceOutOfPlaytest'](),this['createFauxAnimationQueue'](),this[_0x23fa54(0x512)]();},Game_Temp['prototype'][_0xa0779(0x845)]=function(){const _0x15bfc6=_0xa0779;if(VisuMZ[_0x15bfc6(0x824)][_0x15bfc6(0x17f)][_0x15bfc6(0x2b0)][_0x15bfc6(0x8aa)]){if('sddsw'!==_0x15bfc6(0x3d1)){if(this[_0x15bfc6(0x628)]()===0x0)return;_0x1ac0d9[_0x15bfc6(0x653)](),this[_0x15bfc6(0x1d4)](),_0x3fa45b[_0x15bfc6(0x720)](),this[_0x15bfc6(0x56d)](0x0);}else this[_0x15bfc6(0x3bb)]=![];}},Game_Temp['prototype'][_0xa0779(0x893)]=function(_0x190b20){this['_lastPluginCommandInterpreter']=_0x190b20;},Game_Temp[_0xa0779(0x271)][_0xa0779(0x821)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp['prototype'][_0xa0779(0x5de)]=function(){const _0x113612=_0xa0779;this[_0x113612(0x533)]=undefined,this[_0x113612(0x655)]=undefined;},Game_Temp[_0xa0779(0x271)][_0xa0779(0x1f1)]=function(_0x30a0ef){const _0x2cfc2a=_0xa0779;$gameMap&&$dataMap&&$dataMap['note']&&this[_0x2cfc2a(0x85a)]($dataMap[_0x2cfc2a(0x5aa)]);const _0x5a6209=$dataTroops[_0x30a0ef];if(_0x5a6209){if(_0x2cfc2a(0x352)!==_0x2cfc2a(0x352))0x1-this[_0x2cfc2a(0x94f)](_0x987578)>this[_0x2cfc2a(0x37b)](_0x4415b9)&&(_0x51c88b[_0x2cfc2a(0x550)]=![],_0x2b1a5f[_0x2cfc2a(0x1bf)]=!![]);else{let _0x502bf3=DataManager[_0x2cfc2a(0x90c)](_0x5a6209['id']);this[_0x2cfc2a(0x85a)](_0x502bf3);}}},Game_Temp[_0xa0779(0x271)][_0xa0779(0x85a)]=function(_0x3179d1){const _0xff999f=_0xa0779;if(!_0x3179d1)return;if(_0x3179d1['match'](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this['_forcedTroopView']='FV';else{if(_0x3179d1[_0xff999f(0x758)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x3179d1['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x159052=String(RegExp['$1']);if(_0x159052[_0xff999f(0x758)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0xff999f(0x533)]='FV';else{if(_0x159052[_0xff999f(0x758)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)){if(_0xff999f(0x54a)!==_0xff999f(0x43a))this[_0xff999f(0x533)]='SV';else{const _0x451c6f=_0x147693[_0xff999f(0x824)][_0xff999f(0x17f)][_0xff999f(0x719)];if(_0x451c6f&&_0x451c6f[_0xff999f(0x4a5)])return _0x451c6f['horzJS']['call'](this);const _0x4aad94=_0x227935[_0xff999f(0x527)]*0.75,_0x5c1629=_0x5ce230['_shakeSpeed']*0.6,_0x4e104d=_0x1f941e[_0xff999f(0x5e8)];this['x']+=_0x58d3c6[_0xff999f(0x4ee)](_0x3eb7af[_0xff999f(0x1ee)](_0x4aad94)-_0x255d9a[_0xff999f(0x1ee)](_0x5c1629))*(_0x38597f['min'](_0x4e104d,0x1e)*0.5);}}}}}}if(_0x3179d1[_0xff999f(0x758)](/<(?:DTB)>/i))this['_forcedBattleSys']=0x0;else{if(_0x3179d1[_0xff999f(0x758)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0xff999f(0x655)]=0x1;else{if(_0x3179d1[_0xff999f(0x758)](/<(?:TPB|ATB)[ ]WAIT>/i))this['_forcedBattleSys']=0x2;else{if(_0x3179d1[_0xff999f(0x758)](/<(?:CTB)>/i)){if(_0xff999f(0x56a)!==_0xff999f(0x56a))return _0x3c8424[_0xff999f(0x824)][_0xff999f(0x17f)]['Window']['LineHeight'];else{if(Imported[_0xff999f(0x363)]){if(_0xff999f(0x283)!=='eUowN')this['_forcedBattleSys']='CTB';else return _0xff999f(0x238);}}}else{if(_0x3179d1[_0xff999f(0x758)](/<(?:STB)>/i))Imported[_0xff999f(0x71e)]&&(this[_0xff999f(0x655)]=_0xff999f(0x6de));else{if(_0x3179d1['match'](/<(?:BTB)>/i)){if(_0xff999f(0x623)==='omguq'){_0x12f76a['ConvertParams'](_0x47fa10,_0x417b28);const _0x4b3cdb=_0x57e45e[_0xff999f(0x1df)]||0x1;_0xec157d[_0xff999f(0x6c8)](_0x4b3cdb);}else{if(Imported[_0xff999f(0x46b)]){if(_0xff999f(0x8f0)===_0xff999f(0x8f0))this[_0xff999f(0x655)]='BTB';else return _0x12b086[_0xff999f(0x824)][_0xff999f(0x17f)]['UI'][_0xff999f(0x7f2)];}}}else{if(_0x3179d1[_0xff999f(0x758)](/<(?:FTB)>/i))Imported[_0xff999f(0x2e4)]&&(_0xff999f(0x7f4)!==_0xff999f(0x7d8)?this[_0xff999f(0x655)]=_0xff999f(0x32d):this[_0xff999f(0x3cd)]());else{if(_0x3179d1[_0xff999f(0x758)](/<(?:OTB)>/i)){if(Imported['VisuMZ_2_BattleSystemOTB']){if(_0xff999f(0x9c4)===_0xff999f(0x9c4))this[_0xff999f(0x655)]=_0xff999f(0x3f1);else return _0x1ba936[_0xff999f(0x1ab)]['ItemRect'][_0xff999f(0x398)](this);}}else{if(_0x3179d1[_0xff999f(0x758)](/<(?:ETB)>/i))Imported[_0xff999f(0x961)]&&(_0xff999f(0x3fb)!==_0xff999f(0x927)?this[_0xff999f(0x655)]=_0xff999f(0x515):(this[_0xff999f(0x20b)]=_0x27fcab[_0xff999f(0x824)]['Settings'][_0xff999f(0x2b0)][_0xff999f(0x57b)],this[_0xff999f(0x48d)]=_0x5d7328[_0xff999f(0x824)][_0xff999f(0x17f)][_0xff999f(0x2b0)][_0xff999f(0x307)]));else{if(_0x3179d1['match'](/<(?:PTB)>/i)){if(Imported['VisuMZ_2_BattleSystemPTB']){if(_0xff999f(0x485)==='FNrIF')this[_0xff999f(0x655)]=_0xff999f(0x238);else{this[_0xff999f(0x2d3)]=_0xff999f(0x957),this[_0xff999f(0x1a4)]='nah',this[_0xff999f(0x703)]='nah';const _0x5552d8=this['windowRect']();_0x3a060e[_0xff999f(0x271)][_0xff999f(0x288)][_0xff999f(0x398)](this,_0x5552d8),this['setBackgroundType'](0x2);}}}else{if(_0x3179d1[_0xff999f(0x758)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x26154f=String(RegExp['$1']);if(_0x26154f['match'](/DTB/i))this[_0xff999f(0x655)]=0x0;else{if(_0x26154f[_0xff999f(0x758)](/(?:TPB|ATB)[ ]ACTIVE/i)){if(_0xff999f(0x188)!==_0xff999f(0x8a3))this[_0xff999f(0x655)]=0x1;else return _0x16efa4[_0xff999f(0x824)][_0xff999f(0x8e3)][_0xff999f(0x398)](this,_0x5a0e78);}else{if(_0x26154f['match'](/(?:TPB|ATB)[ ]WAIT/i))this[_0xff999f(0x655)]=0x2;else{if(_0x26154f[_0xff999f(0x758)](/CTB/i))Imported[_0xff999f(0x363)]&&('jqEwN'===_0xff999f(0x74d)?this[_0xff999f(0x241)]&&(this[_0xff999f(0x37c)]-=this['openingSpeed'](),this['isClosed']()&&(this[_0xff999f(0x241)]=![])):this['_forcedBattleSys']=_0xff999f(0x88d));else{if(_0x26154f[_0xff999f(0x758)](/STB/i))Imported[_0xff999f(0x71e)]&&(this[_0xff999f(0x655)]=_0xff999f(0x6de));else{if(_0x26154f[_0xff999f(0x758)](/BTB/i)){if('QSEYq'===_0xff999f(0x2f9))this[_0xff999f(0x65f)](_0x461866[_0xff999f(0x824)][_0xff999f(0x17f)][_0xff999f(0x1d6)][_0xff999f(0x561)],_0x1c18bb['x'],_0x4e01cb['y'],_0x52f1f9[_0xff999f(0x3c5)],_0xff999f(0x4b5));else{if(Imported[_0xff999f(0x46b)]){if(_0xff999f(0x5da)!=='DtXHv')this[_0xff999f(0x655)]=_0xff999f(0x705);else{const _0x3d8e0d=this[_0xff999f(0x47b)](_0x42f6b0),_0x79057=new(_0x3d8e0d?_0x22c7e2:_0x23892f)(),_0x70e348=this[_0xff999f(0x3d5)](_0x1fa5ba),_0x129f52=this[_0xff999f(0x86c)](),_0x4284e8=_0xeb4686>_0x129f52?this['lastAnimationSprite']():null;this['animationShouldMirror'](_0x1055e6[0x0])&&(_0x542207=!_0xe96134),_0x79057[_0xff999f(0x3b1)]=_0x152cbf,_0x79057[_0xff999f(0x5e9)](_0x70e348,_0x36a8e0,_0x43416c,_0x15c15d,_0x4284e8),this[_0xff999f(0x9db)](_0x79057),this[_0xff999f(0x3aa)]['push'](_0x79057);}}}}else{if(_0x26154f['match'](/FTB/i)){if(_0xff999f(0x40b)===_0xff999f(0x40b))Imported[_0xff999f(0x2e4)]&&(this['_forcedBattleSys']='FTB');else return!![];}else{if(_0x26154f[_0xff999f(0x758)](/OTB/i)){if(Imported[_0xff999f(0x409)]){if('fQhcx'!=='binQK')this[_0xff999f(0x655)]=_0xff999f(0x3f1);else{let _0xf3e632='',_0x23bcab=this['_index']+0x1;while(this[_0xff999f(0x815)][_0x23bcab]&&this['_list'][_0x23bcab][_0xff999f(0x679)]===0x195){_0xf3e632+=this[_0xff999f(0x815)][_0x23bcab][_0xff999f(0x89e)][0x0]+'\x0a',_0x23bcab++;}return _0xf3e632;}}}else{if(_0x26154f[_0xff999f(0x758)](/ETB/i))Imported[_0xff999f(0x961)]&&(_0xff999f(0x781)===_0xff999f(0x781)?this[_0xff999f(0x655)]=_0xff999f(0x515):(_0x47d9b0+=_0x2fc12f+'\x0a',_0x28acf3+=_0xff999f(0x5d7)[_0xff999f(0x6ad)](_0x130707[_0xff999f(0x89e)][0x0])));else{if(_0x26154f[_0xff999f(0x758)](/PTB/i)){if(_0xff999f(0x461)!==_0xff999f(0x461))return _0x5aaa85['CoreEngine'][_0xff999f(0x740)][_0xff999f(0x398)](this);else Imported[_0xff999f(0x808)]&&(this[_0xff999f(0x655)]=_0xff999f(0x238));}}}}}}}}}}}}}}}}}}}}}},Game_Temp[_0xa0779(0x271)]['createFauxAnimationQueue']=function(){const _0x25aedb=_0xa0779;this[_0x25aedb(0x816)]=[];},Game_Temp[_0xa0779(0x271)][_0xa0779(0x9de)]=function(_0x3b8570,_0x292df8,_0x19aea2,_0x19270b){const _0x541267=_0xa0779;if(!this[_0x541267(0x1cb)]())return;_0x19aea2=_0x19aea2||![],_0x19270b=_0x19270b||![];if($dataAnimations[_0x292df8]){const _0x4ca305={'targets':_0x3b8570,'animationId':_0x292df8,'mirror':_0x19aea2,'mute':_0x19270b};this[_0x541267(0x816)][_0x541267(0x55f)](_0x4ca305);for(const _0x373b5b of _0x3b8570){_0x541267(0x369)===_0x541267(0x369)?_0x373b5b[_0x541267(0x7c2)]&&_0x373b5b[_0x541267(0x7c2)]():this[_0x541267(0x237)]();}}},Game_Temp[_0xa0779(0x271)][_0xa0779(0x1cb)]=function(){return!![];},Game_Temp[_0xa0779(0x271)][_0xa0779(0x31d)]=function(){const _0x3a479b=_0xa0779;return this['_fauxAnimationQueue'][_0x3a479b(0x41f)]();},Game_Temp[_0xa0779(0x271)][_0xa0779(0x512)]=function(){const _0xdc532b=_0xa0779;this[_0xdc532b(0x343)]=[];},Game_Temp[_0xa0779(0x271)][_0xa0779(0x3ad)]=function(_0x3f7f04,_0xafa4ce,_0x401d73,_0x2cf25c,_0x3ed54e){const _0x288ec9=_0xa0779;if(!this[_0x288ec9(0x922)]())return;_0x2cf25c=_0x2cf25c||![],_0x3ed54e=_0x3ed54e||![];if($dataAnimations[_0x401d73]){const _0x1487e6={'x':_0x3f7f04,'y':_0xafa4ce,'animationId':_0x401d73,'mirror':_0x2cf25c,'mute':_0x3ed54e};this['_pointAnimationQueue']['push'](_0x1487e6);}},Game_Temp[_0xa0779(0x271)][_0xa0779(0x922)]=function(){return!![];},Game_Temp[_0xa0779(0x271)][_0xa0779(0x7e9)]=function(){const _0x2a15e6=_0xa0779;return this[_0x2a15e6(0x343)][_0x2a15e6(0x41f)]();},VisuMZ[_0xa0779(0x824)]['Game_System_initialize']=Game_System[_0xa0779(0x271)][_0xa0779(0x288)],Game_System[_0xa0779(0x271)][_0xa0779(0x288)]=function(){const _0x5947b8=_0xa0779;VisuMZ[_0x5947b8(0x824)][_0x5947b8(0x182)][_0x5947b8(0x398)](this),this['initCoreEngine']();},Game_System[_0xa0779(0x271)][_0xa0779(0x322)]=function(){const _0x24413e=_0xa0779;this[_0x24413e(0x1e2)]={'SideView':$dataSystem['optSideView'],'BattleSystem':this[_0x24413e(0x3be)](),'FontSize':$dataSystem[_0x24413e(0x47d)]['fontSize'],'Padding':0xc};},Game_System[_0xa0779(0x271)][_0xa0779(0x6b0)]=function(){const _0x1faed5=_0xa0779;if($gameTemp['_forcedTroopView']==='SV'){if(_0x1faed5(0x608)!==_0x1faed5(0x608)){if(_0x5cb095[_0x1faed5(0x84f)](_0x11a755[_0x1faed5(0x538)]()))return!![];}else return!![];}else{if($gameTemp['_forcedTroopView']==='FV')return![];}if(this[_0x1faed5(0x1e2)]===undefined)this[_0x1faed5(0x322)]();if(this[_0x1faed5(0x1e2)][_0x1faed5(0x2ca)]===undefined)this[_0x1faed5(0x322)]();return this[_0x1faed5(0x1e2)][_0x1faed5(0x2ca)];},Game_System[_0xa0779(0x271)]['setSideView']=function(_0x1aca5b){const _0x2a9de7=_0xa0779;if(this[_0x2a9de7(0x1e2)]===undefined)this[_0x2a9de7(0x322)]();if(this[_0x2a9de7(0x1e2)][_0x2a9de7(0x2ca)]===undefined)this[_0x2a9de7(0x322)]();this[_0x2a9de7(0x1e2)]['SideView']=_0x1aca5b;},Game_System[_0xa0779(0x271)]['resetBattleSystem']=function(){const _0x2ba21f=_0xa0779;if(this[_0x2ba21f(0x1e2)]===undefined)this['initCoreEngine']();this[_0x2ba21f(0x1e2)][_0x2ba21f(0x91e)]=this[_0x2ba21f(0x3be)]();},Game_System[_0xa0779(0x271)][_0xa0779(0x3be)]=function(){const _0x528098=_0xa0779,_0x404b91=(VisuMZ[_0x528098(0x824)][_0x528098(0x17f)]['BattleSystem']||_0x528098(0x578))['toUpperCase']()[_0x528098(0x64c)]();return VisuMZ['CoreEngine'][_0x528098(0x18b)](_0x404b91);},Game_System['prototype'][_0xa0779(0x72f)]=function(){const _0xd6bf9=_0xa0779;if($gameTemp[_0xd6bf9(0x655)]!==undefined){if('ClkaZ'!==_0xd6bf9(0x9f1))_0x470418[_0xd6bf9(0x824)][_0xd6bf9(0x7db)][_0xd6bf9(0x398)](this),_0x1d8a7c=this['_spriteset'];else return $gameTemp[_0xd6bf9(0x655)];}if(this[_0xd6bf9(0x1e2)]===undefined)this[_0xd6bf9(0x322)]();if(this['_CoreEngineSettings'][_0xd6bf9(0x91e)]===undefined)this[_0xd6bf9(0x3d8)]();return this[_0xd6bf9(0x1e2)][_0xd6bf9(0x91e)];},Game_System[_0xa0779(0x271)][_0xa0779(0x7c6)]=function(_0x26a1b3){const _0xa06224=_0xa0779;if(this[_0xa06224(0x1e2)]===undefined)this[_0xa06224(0x322)]();if(this[_0xa06224(0x1e2)]['BattleSystem']===undefined)this[_0xa06224(0x3d8)]();this['_CoreEngineSettings'][_0xa06224(0x91e)]=_0x26a1b3;},Game_System['prototype'][_0xa0779(0x718)]=function(){const _0x2b37ac=_0xa0779;if(this['_CoreEngineSettings']===undefined)this[_0x2b37ac(0x322)]();if(this[_0x2b37ac(0x1e2)][_0x2b37ac(0x5d9)]===undefined)this[_0x2b37ac(0x322)]();return this[_0x2b37ac(0x1e2)][_0x2b37ac(0x5d9)];},Game_System['prototype'][_0xa0779(0x883)]=function(_0x3c4315){const _0x2c7c70=_0xa0779;if(this[_0x2c7c70(0x1e2)]===undefined)this[_0x2c7c70(0x322)]();if(this[_0x2c7c70(0x1e2)][_0x2c7c70(0x906)]===undefined)this[_0x2c7c70(0x322)]();this[_0x2c7c70(0x1e2)]['FontSize']=_0x3c4315;},Game_System['prototype'][_0xa0779(0x2b1)]=function(){const _0x553d42=_0xa0779;if(this[_0x553d42(0x1e2)]===undefined)this[_0x553d42(0x322)]();if(this['_CoreEngineSettings']['Padding']===undefined)this[_0x553d42(0x322)]();return this[_0x553d42(0x1e2)][_0x553d42(0x4f2)];},Game_System['prototype'][_0xa0779(0x6c8)]=function(_0x1e1bed){const _0x14c3f4=_0xa0779;if(this[_0x14c3f4(0x1e2)]===undefined)this[_0x14c3f4(0x322)]();if(this[_0x14c3f4(0x1e2)][_0x14c3f4(0x906)]===undefined)this[_0x14c3f4(0x322)]();this[_0x14c3f4(0x1e2)][_0x14c3f4(0x4f2)]=_0x1e1bed;},VisuMZ[_0xa0779(0x824)][_0xa0779(0x6a2)]=Game_Screen['prototype'][_0xa0779(0x288)],Game_Screen[_0xa0779(0x271)][_0xa0779(0x288)]=function(){const _0x3643f8=_0xa0779;VisuMZ[_0x3643f8(0x824)][_0x3643f8(0x6a2)][_0x3643f8(0x398)](this),this[_0x3643f8(0x7a9)]();},Game_Screen[_0xa0779(0x271)][_0xa0779(0x7a9)]=function(){const _0x121110=_0xa0779,_0x1b89df=VisuMZ[_0x121110(0x824)][_0x121110(0x17f)]['ScreenShake'];this[_0x121110(0x8b9)]=_0x1b89df?.[_0x121110(0x6fa)]||'random';},Game_Screen['prototype']['getCoreEngineScreenShakeStyle']=function(){const _0x4a07ae=_0xa0779;if(this[_0x4a07ae(0x8b9)]===undefined)this[_0x4a07ae(0x7a9)]();return this['_coreEngineShakeStyle'];},Game_Screen[_0xa0779(0x271)][_0xa0779(0x45b)]=function(_0x689b21){const _0x3f47b5=_0xa0779;if(this[_0x3f47b5(0x8b9)]===undefined)this[_0x3f47b5(0x7a9)]();this['_coreEngineShakeStyle']=_0x689b21[_0x3f47b5(0x538)]()[_0x3f47b5(0x64c)]();},Game_Picture[_0xa0779(0x271)][_0xa0779(0x482)]=function(){const _0x13a32b=_0xa0779;if($gameParty[_0x13a32b(0x374)]())return![];return this[_0x13a32b(0x912)]()&&this['name']()[_0x13a32b(0x865)](0x0)==='!';},VisuMZ[_0xa0779(0x824)][_0xa0779(0x740)]=Game_Picture[_0xa0779(0x271)]['x'],Game_Picture[_0xa0779(0x271)]['x']=function(){const _0x56ea6e=_0xa0779;return this[_0x56ea6e(0x482)]()?this[_0x56ea6e(0x67a)]():VisuMZ['CoreEngine']['Game_Picture_x'][_0x56ea6e(0x398)](this);},Game_Picture['prototype']['xScrollLinkedOffset']=function(){const _0x52aba2=_0xa0779,_0xbf25f8=$gameMap[_0x52aba2(0x565)]()*$gameMap[_0x52aba2(0x4f8)]();return(this['_x']-_0xbf25f8)*$gameScreen['zoomScale']();},VisuMZ[_0xa0779(0x824)][_0xa0779(0x501)]=Game_Picture[_0xa0779(0x271)]['y'],Game_Picture[_0xa0779(0x271)]['y']=function(){const _0x578471=_0xa0779;return this[_0x578471(0x482)]()?this['yScrollLinkedOffset']():_0x578471(0x73d)!==_0x578471(0x73d)?0x0:VisuMZ[_0x578471(0x824)][_0x578471(0x501)][_0x578471(0x398)](this);},Game_Picture[_0xa0779(0x271)][_0xa0779(0x68d)]=function(){const _0x4f16e3=_0xa0779,_0x44e56c=$gameMap[_0x4f16e3(0x239)]()*$gameMap['tileHeight']();return(this['_y']-_0x44e56c)*$gameScreen[_0x4f16e3(0x499)]();},VisuMZ['CoreEngine'][_0xa0779(0x5be)]=Game_Picture['prototype'][_0xa0779(0x3a9)],Game_Picture['prototype'][_0xa0779(0x3a9)]=function(){const _0x1d4dce=_0xa0779;let _0x421924=VisuMZ[_0x1d4dce(0x824)][_0x1d4dce(0x5be)]['call'](this);return this[_0x1d4dce(0x482)]()&&(_0x421924*=$gameScreen[_0x1d4dce(0x499)]()),_0x421924;},VisuMZ[_0xa0779(0x824)][_0xa0779(0x5d0)]=Game_Picture[_0xa0779(0x271)]['scaleY'],Game_Picture[_0xa0779(0x271)][_0xa0779(0x393)]=function(){const _0x3dd738=_0xa0779;let _0x212c1a=VisuMZ['CoreEngine'][_0x3dd738(0x5d0)][_0x3dd738(0x398)](this);return this['isMapScrollLinked']()&&(_0x212c1a*=$gameScreen[_0x3dd738(0x499)]()),_0x212c1a;},Game_Picture[_0xa0779(0x271)][_0xa0779(0x576)]=function(_0x1a7084){const _0xd6599c=_0xa0779;this[_0xd6599c(0x430)]=_0x1a7084;},VisuMZ[_0xa0779(0x824)][_0xa0779(0x311)]=Game_Picture[_0xa0779(0x271)][_0xa0779(0x1a5)],Game_Picture[_0xa0779(0x271)][_0xa0779(0x1a5)]=function(_0x297281){const _0x1a391e=_0xa0779;this[_0x1a391e(0x430)]=this['_coreEasingType']||0x0;if([0x0,0x1,0x2,0x3]['includes'](this[_0x1a391e(0x430)])){if('WRDEf'!==_0x1a391e(0x8a9))return VisuMZ[_0x1a391e(0x824)][_0x1a391e(0x311)][_0x1a391e(0x398)](this,_0x297281);else(this[_0x1a391e(0x6d8)]!==_0x2f3cb2||this[_0x1a391e(0x672)]!==_0x46d9f0)&&(this[_0x1a391e(0x48c)](_0x1a391e(0x382)),this['_movementWholeDuration']=_0x46ad3b),_0x463980[_0x1a391e(0x824)][_0x1a391e(0x1ff)][_0x1a391e(0x398)](this,_0x4833f5,_0x3ff5e0,_0x5a5cf1);}else return VisuMZ[_0x1a391e(0x25a)](_0x297281,this[_0x1a391e(0x430)]);},VisuMZ[_0xa0779(0x824)][_0xa0779(0x7c3)]=Game_Action[_0xa0779(0x271)][_0xa0779(0x37b)],Game_Action[_0xa0779(0x271)][_0xa0779(0x37b)]=function(_0x1d0954){const _0x16e949=_0xa0779;return VisuMZ[_0x16e949(0x824)][_0x16e949(0x17f)][_0x16e949(0x2b0)][_0x16e949(0x85e)]?this[_0x16e949(0x730)](_0x1d0954):_0x16e949(0x95f)!=='TgYyc'?VisuMZ['CoreEngine'][_0x16e949(0x7c3)][_0x16e949(0x398)](this,_0x1d0954):'#%1'[_0x16e949(0x6ad)](_0xf58c01(_0x4ad9d6['$1']));},Game_Action[_0xa0779(0x271)][_0xa0779(0x730)]=function(_0xc40df0){const _0x4ca9bd=_0xa0779,_0x572fa5=this[_0x4ca9bd(0x2f4)](_0xc40df0),_0x2efe46=this['subjectHitRate'](_0xc40df0),_0x52a6ac=this[_0x4ca9bd(0x5a9)](_0xc40df0);return _0x572fa5*(_0x2efe46-_0x52a6ac);},VisuMZ['CoreEngine'][_0xa0779(0x537)]=Game_Action['prototype'][_0xa0779(0x94f)],Game_Action[_0xa0779(0x271)][_0xa0779(0x94f)]=function(_0x2cefbd){const _0x1e7be7=_0xa0779;if(VisuMZ[_0x1e7be7(0x824)][_0x1e7be7(0x17f)][_0x1e7be7(0x2b0)][_0x1e7be7(0x85e)]){if(_0x1e7be7(0x721)!==_0x1e7be7(0x3f4))return 0x0;else this[_0x1e7be7(0x48c)](_0x1e7be7(0x382)),this[_0x1e7be7(0x520)]=_0x16d58f;}else return VisuMZ[_0x1e7be7(0x824)][_0x1e7be7(0x537)][_0x1e7be7(0x398)](this,_0x2cefbd);},Game_Action[_0xa0779(0x271)][_0xa0779(0x2f4)]=function(_0x1f400a){const _0xf8303d=_0xa0779;return this[_0xf8303d(0x277)]()[_0xf8303d(0x416)]*0.01;},Game_Action[_0xa0779(0x271)][_0xa0779(0x688)]=function(_0x27cff5){const _0x2fb3ed=_0xa0779;if(VisuMZ[_0x2fb3ed(0x824)]['Settings'][_0x2fb3ed(0x2b0)][_0x2fb3ed(0x935)]&&this[_0x2fb3ed(0x5ea)]())return 0x1;return this[_0x2fb3ed(0x404)]()?VisuMZ[_0x2fb3ed(0x824)][_0x2fb3ed(0x17f)][_0x2fb3ed(0x2b0)][_0x2fb3ed(0x935)]&&this[_0x2fb3ed(0x26f)]()[_0x2fb3ed(0x627)]()?this[_0x2fb3ed(0x26f)]()['hit']+0.05:'cBAMj'!==_0x2fb3ed(0x5a3)?this['subject']()[_0x2fb3ed(0x61f)]:_0x5348b0[_0x2fb3ed(0x824)][_0x2fb3ed(0x17f)][_0x2fb3ed(0x74e)][_0x2fb3ed(0x444)]:_0x2fb3ed(0x2dd)!==_0x2fb3ed(0x2dd)?_0x2b2644[_0x2fb3ed(0x824)][_0x2fb3ed(0x17f)]['UI'][_0x2fb3ed(0x383)]:0x1;},Game_Action['prototype']['targetEvaRate']=function(_0x38a59f){const _0x3118be=_0xa0779;if(this[_0x3118be(0x26f)]()[_0x3118be(0x627)]()===_0x38a59f['isActor']())return 0x0;if(this[_0x3118be(0x404)]()){if(VisuMZ['CoreEngine'][_0x3118be(0x17f)][_0x3118be(0x2b0)][_0x3118be(0x935)]&&_0x38a59f[_0x3118be(0x7c8)]()){if('Prqqw'!==_0x3118be(0x221))return _0x38a59f[_0x3118be(0x310)]-0.05;else{let _0x18142a=_0x30eed0[_0x3118be(0x710)](/[\d+]/g,'')[_0x3118be(0x7c9)]();const _0x2802d8=_0x4c12ec[_0x3118be(0x6ad)](_0x4f69b4,_0x18142a);_0x31eb3a[_0x3118be(0x824)][_0x3118be(0x9c3)][_0x3e2188][_0x3118be(0x55f)](new _0x479199(_0x2802d8,'i'));const _0x698659=_0x3118be(0x269)[_0x3118be(0x6ad)](_0x49662a,_0x18142a);_0x55d052[_0x3118be(0x824)][_0x3118be(0x9c3)][_0x47e9a3+'JS'][_0x3118be(0x55f)](new _0x17865c(_0x698659,'i'));}}else return _0x38a59f[_0x3118be(0x310)];}else{if(this[_0x3118be(0x337)]()){if(_0x3118be(0x651)!==_0x3118be(0x96f))return _0x38a59f[_0x3118be(0x156)];else{const _0x2511c8=_0x5998e2[_0x3bf930[_0x3118be(0x22f)]],_0x13c70a=this[_0x3118be(0x3f6)](_0x77c2da),_0x39d1b3=_0x366b25[_0x3118be(0x1f5)],_0xc8df7d=_0x1eb41d['mute'];let _0x48e4e8=this[_0x3118be(0x86c)]();const _0x184332=this[_0x3118be(0x82b)]();if(this['isAnimationForEach'](_0x2511c8))for(const _0x5374b9 of _0x13c70a){this[_0x3118be(0x599)]([_0x5374b9],_0x2511c8,_0x39d1b3,_0x48e4e8,_0xc8df7d),_0x48e4e8+=_0x184332;}else this[_0x3118be(0x599)](_0x13c70a,_0x2511c8,_0x39d1b3,_0x48e4e8,_0xc8df7d);}}else return 0x0;}},VisuMZ[_0xa0779(0x824)][_0xa0779(0x5ca)]=Game_Action[_0xa0779(0x271)][_0xa0779(0x3b2)],Game_Action[_0xa0779(0x271)][_0xa0779(0x3b2)]=function(_0x15e786){const _0x3ad8ed=_0xa0779;VisuMZ[_0x3ad8ed(0x824)][_0x3ad8ed(0x5ca)][_0x3ad8ed(0x398)](this,_0x15e786);if(VisuMZ[_0x3ad8ed(0x824)][_0x3ad8ed(0x17f)][_0x3ad8ed(0x2b0)][_0x3ad8ed(0x85e)])return;const _0x559705=_0x15e786[_0x3ad8ed(0x617)]();if(_0x559705[_0x3ad8ed(0x550)]){if(_0x3ad8ed(0x43e)!==_0x3ad8ed(0x5e6))0x1-this[_0x3ad8ed(0x94f)](_0x15e786)>this[_0x3ad8ed(0x37b)](_0x15e786)&&(_0x559705[_0x3ad8ed(0x550)]=![],_0x559705[_0x3ad8ed(0x1bf)]=!![]);else{let _0x38809b=_0x2935a3[_0x3ad8ed(0x4ee)](_0x29e3ef[_0x3ad8ed(0x3c5)]/0x2+0xc0);_0x38809b-=_0x62218d[_0x3ad8ed(0x256)]((_0x2dc347[_0x3ad8ed(0x3c5)]-_0x4bfa2b[_0x3ad8ed(0x66f)])/0x2),_0x38809b+=_0x3e7f9d*0x20;let _0x3f62ac=_0x2871eb[_0x3ad8ed(0x7f6)]-0xc8-_0x2bf82a[_0x3ad8ed(0x670)]()*0x30;_0x3f62ac-=_0xd3b2c1['floor']((_0x359217[_0x3ad8ed(0x7f6)]-_0x269fd3['boxHeight'])/0x2),_0x3f62ac+=_0x5a9376*0x30,this['setHome'](_0x38809b,_0x3f62ac);}}},VisuMZ[_0xa0779(0x824)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0xa0779(0x271)][_0xa0779(0x314)],Game_BattlerBase['prototype'][_0xa0779(0x314)]=function(){const _0x2c9352=_0xa0779;this[_0x2c9352(0x7cc)]={},VisuMZ[_0x2c9352(0x824)][_0x2c9352(0x92a)][_0x2c9352(0x398)](this);},VisuMZ[_0xa0779(0x824)][_0xa0779(0x742)]=Game_BattlerBase[_0xa0779(0x271)][_0xa0779(0x1d4)],Game_BattlerBase[_0xa0779(0x271)]['refresh']=function(){const _0x41a9e9=_0xa0779;this[_0x41a9e9(0x7cc)]={},VisuMZ[_0x41a9e9(0x824)][_0x41a9e9(0x742)][_0x41a9e9(0x398)](this);},Game_BattlerBase[_0xa0779(0x271)]['checkCacheKey']=function(_0x53c79e){const _0x4ace74=_0xa0779;return this[_0x4ace74(0x7cc)]=this[_0x4ace74(0x7cc)]||{},this[_0x4ace74(0x7cc)][_0x53c79e]!==undefined;},Game_BattlerBase[_0xa0779(0x271)][_0xa0779(0x7ab)]=function(_0x55be9d){const _0x4e91c1=_0xa0779,_0x5aff91=(_0x29d314,_0x104ff3)=>{const _0x4c97ed=_0x5859;if(!_0x104ff3)return _0x29d314;if(_0x104ff3[_0x4c97ed(0x5aa)][_0x4c97ed(0x758)](VisuMZ[_0x4c97ed(0x824)]['RegExp'][_0x4c97ed(0x7ab)][_0x55be9d])){var _0x4b6853=Number(RegExp['$1']);_0x29d314+=_0x4b6853;}if(_0x104ff3[_0x4c97ed(0x5aa)][_0x4c97ed(0x758)](VisuMZ[_0x4c97ed(0x824)][_0x4c97ed(0x9c3)]['paramPlusJS'][_0x55be9d])){if(_0x4c97ed(0x93f)===_0x4c97ed(0x321))return _0x36fc01[_0x4c97ed(0x487)];else{var _0x41c483=String(RegExp['$1']);try{_0x29d314+=eval(_0x41c483);}catch(_0x1b5e47){if($gameTemp[_0x4c97ed(0x6bb)]())console[_0x4c97ed(0x47c)](_0x1b5e47);}}}return _0x29d314;};return this['traitObjects']()[_0x4e91c1(0x4e0)](_0x5aff91,this[_0x4e91c1(0x339)][_0x55be9d]);},Game_BattlerBase[_0xa0779(0x271)][_0xa0779(0x4e8)]=function(_0x271936){const _0x43d8ed=_0xa0779;var _0x55f801=_0x43d8ed(0x3ee)+(this[_0x43d8ed(0x627)]()?_0x43d8ed(0x1fd):_0x43d8ed(0x766))+_0x43d8ed(0x819)+_0x271936;if(this[_0x43d8ed(0x20c)](_0x55f801))return this[_0x43d8ed(0x7cc)][_0x55f801];this[_0x43d8ed(0x7cc)][_0x55f801]=eval(VisuMZ[_0x43d8ed(0x824)][_0x43d8ed(0x17f)][_0x43d8ed(0x34a)][_0x55f801]);const _0x3ddbf8=(_0x54b958,_0x511b26)=>{const _0x34e75e=_0x43d8ed;if(!_0x511b26)return _0x54b958;if(_0x511b26[_0x34e75e(0x5aa)][_0x34e75e(0x758)](VisuMZ[_0x34e75e(0x824)][_0x34e75e(0x9c3)][_0x34e75e(0x4e8)][_0x271936])){if('tkGWp'===_0x34e75e(0x879)){var _0x55bf03=_0x21c84b(_0x2bf4c6['$1']);try{_0x56dc2b+=_0xf2ca1e(_0x55bf03);}catch(_0x2c67e1){if(_0x3b7c30[_0x34e75e(0x6bb)]())_0x2e2b11['log'](_0x2c67e1);}}else{var _0x2f672e=Number(RegExp['$1']);if(_0x2f672e===0x0)_0x2f672e=Number[_0x34e75e(0x2ac)];_0x54b958=Math[_0x34e75e(0x274)](_0x54b958,_0x2f672e);}}if(_0x511b26[_0x34e75e(0x5aa)]['match'](VisuMZ['CoreEngine'][_0x34e75e(0x9c3)][_0x34e75e(0x620)][_0x271936])){var _0xc4c048=String(RegExp['$1']);try{_0x54b958=Math[_0x34e75e(0x274)](_0x54b958,Number(eval(_0xc4c048)));}catch(_0x2bf5b9){if($gameTemp[_0x34e75e(0x6bb)]())console[_0x34e75e(0x47c)](_0x2bf5b9);}}return _0x54b958;};if(this[_0x43d8ed(0x7cc)][_0x55f801]===0x0)this[_0x43d8ed(0x7cc)][_0x55f801]=Number[_0x43d8ed(0x2ac)];return this[_0x43d8ed(0x7cc)][_0x55f801]=this[_0x43d8ed(0x205)]()[_0x43d8ed(0x4e0)](_0x3ddbf8,this[_0x43d8ed(0x7cc)][_0x55f801]),this[_0x43d8ed(0x7cc)][_0x55f801];},Game_BattlerBase[_0xa0779(0x271)]['paramRate']=function(_0x793806){const _0x40a343=_0xa0779,_0x4d724c=this[_0x40a343(0x498)](Game_BattlerBase['TRAIT_PARAM'],_0x793806),_0x535bb3=(_0xceae9b,_0x5bdb79)=>{const _0xaa6131=_0x40a343;if('JUgpl'===_0xaa6131(0x14a)){const _0x597826=this[_0xaa6131(0x2cb)]();this[_0xaa6131(0x685)](_0x2165a9[_0xaa6131(0x359)]());const _0x226dd6=_0x3a2cd6['CoreEngine'][_0xaa6131(0x17f)]['UI'][_0xaa6131(0x2ad)];this[_0xaa6131(0x65f)](_0x226dd6,_0x47817f,_0x2346fa,_0x597826,'center');}else{if(!_0x5bdb79)return _0xceae9b;if(_0x5bdb79[_0xaa6131(0x5aa)]['match'](VisuMZ[_0xaa6131(0x824)]['RegExp'][_0xaa6131(0x1dd)][_0x793806])){if(_0xaa6131(0x445)===_0xaa6131(0x445)){var _0x221a4a=Number(RegExp['$1'])/0x64;_0xceae9b*=_0x221a4a;}else return this[_0xaa6131(0x343)][_0xaa6131(0x41f)]();}if(_0x5bdb79[_0xaa6131(0x5aa)][_0xaa6131(0x758)](VisuMZ[_0xaa6131(0x824)]['RegExp'][_0xaa6131(0x7d6)][_0x793806])){var _0x221a4a=Number(RegExp['$1']);_0xceae9b*=_0x221a4a;}if(_0x5bdb79[_0xaa6131(0x5aa)][_0xaa6131(0x758)](VisuMZ[_0xaa6131(0x824)][_0xaa6131(0x9c3)][_0xaa6131(0x5ae)][_0x793806])){var _0x4c1e97=String(RegExp['$1']);try{if('SOEVh'!==_0xaa6131(0x967))_0xceae9b*=eval(_0x4c1e97);else{_0x18213c[_0xaa6131(0x510)](_0x353d77,_0xfea3d5);const _0x3846c0=_0x21350a['round'](_0x501eb8['PictureID'])['clamp'](0x1,0x64),_0x4680dc=_0x4b0965[_0xaa6131(0x17f)],_0x34675d=_0x4680dc['Origin'][_0xaa6131(0x1f6)](0x0,0x1),_0x7811d8=_0x193bf2[_0xaa6131(0x4ee)](_0x4680dc[_0xaa6131(0x199)]||0x0),_0x377a1a=_0xb013a9[_0xaa6131(0x4ee)](_0x4680dc['PositionY']||0x0),_0x257a32=_0x360521['round'](_0x4680dc['ScaleX']||0x0),_0x12c447=_0x24fab4[_0xaa6131(0x4ee)](_0x4680dc[_0xaa6131(0x465)]||0x0),_0x5282f3=_0x48071e[_0xaa6131(0x4ee)](_0x4680dc['Opacity'])['clamp'](0x0,0xff),_0x5c7c1f=_0x4680dc[_0xaa6131(0x230)],_0x15d421=_0xaa6131(0x4a7),_0x52f5ad=_0x36682b[_0xaa6131(0x86f)]?_0xaa6131(0x86f):_0xaa6131(0x301),_0x438f5e=_0x15d421['format'](_0x3fe01f[_0xaa6131(0x1a7)],_0x52f5ad);_0x425e85['showPicture'](_0x3846c0,_0x438f5e,_0x34675d,_0x7811d8,_0x377a1a,_0x257a32,_0x12c447,_0x5282f3,_0x5c7c1f);}}catch(_0x1f5fd5){if($gameTemp['isPlaytest']())console[_0xaa6131(0x47c)](_0x1f5fd5);}}return _0xceae9b;}};return this['traitObjects']()[_0x40a343(0x4e0)](_0x535bb3,_0x4d724c);},Game_BattlerBase[_0xa0779(0x271)][_0xa0779(0x298)]=function(_0x2961fa){const _0x3a3d78=(_0x1172d6,_0x1b1e51)=>{const _0xf6ed11=_0x5859;if(!_0x1b1e51)return _0x1172d6;if(_0x1b1e51[_0xf6ed11(0x5aa)]['match'](VisuMZ['CoreEngine'][_0xf6ed11(0x9c3)][_0xf6ed11(0x98b)][_0x2961fa])){if('zvtMg'!==_0xf6ed11(0x664))_0x379a07[_0xf6ed11(0x824)][_0xf6ed11(0x182)][_0xf6ed11(0x398)](this),this[_0xf6ed11(0x322)]();else{var _0x146758=Number(RegExp['$1']);_0x1172d6+=_0x146758;}}if(_0x1b1e51[_0xf6ed11(0x5aa)][_0xf6ed11(0x758)](VisuMZ['CoreEngine']['RegExp'][_0xf6ed11(0x562)][_0x2961fa])){var _0x3a3fed=String(RegExp['$1']);try{if(_0xf6ed11(0x513)===_0xf6ed11(0x513))_0x1172d6+=eval(_0x3a3fed);else{_0x3f5fe1[_0xf6ed11(0x510)](_0x11c089,_0x100db9);const _0x182a6c=_0x2f0260[_0xf6ed11(0x4ee)](_0x2da4a9[_0xf6ed11(0x674)])[_0xf6ed11(0x1f6)](0x0,0x64),_0x3bf2c6=_0x3041c4['_currentBgs'];_0x3bf2c6&&(_0x3bf2c6[_0xf6ed11(0x674)]=_0x182a6c,_0x347f21['playBgs'](_0x3bf2c6));}}catch(_0x365314){if(_0xf6ed11(0x8f9)!==_0xf6ed11(0x36b)){if($gameTemp[_0xf6ed11(0x6bb)]())console[_0xf6ed11(0x47c)](_0x365314);}else for(let _0x47059d=0x1;_0x47059d<=0x64;_0x47059d++){_0x39eedf[_0xf6ed11(0x16b)](_0x47059d);}}}return _0x1172d6;};return this['traitObjects']()['reduce'](_0x3a3d78,0x0);},Game_BattlerBase[_0xa0779(0x271)][_0xa0779(0x4c1)]=function(_0x37483b){const _0x5e65c1=_0xa0779;let _0x463ec3='param'+_0x37483b+'Total';if(this['checkCacheKey'](_0x463ec3))return this[_0x5e65c1(0x7cc)][_0x463ec3];return this[_0x5e65c1(0x7cc)][_0x463ec3]=Math[_0x5e65c1(0x4ee)](VisuMZ[_0x5e65c1(0x824)][_0x5e65c1(0x17f)][_0x5e65c1(0x34a)][_0x5e65c1(0x15a)][_0x5e65c1(0x398)](this,_0x37483b)),this['_cache'][_0x463ec3];},Game_BattlerBase[_0xa0779(0x271)][_0xa0779(0x4e5)]=function(_0x6ec4f2){const _0x186fd2=_0xa0779,_0x2273ab=(_0x5504c5,_0x5ecd49)=>{const _0x56ccfe=_0x5859;if(_0x56ccfe(0x3d9)===_0x56ccfe(0x3d9)){if(!_0x5ecd49)return _0x5504c5;if(_0x5ecd49[_0x56ccfe(0x5aa)][_0x56ccfe(0x758)](VisuMZ[_0x56ccfe(0x824)][_0x56ccfe(0x9c3)][_0x56ccfe(0x4c3)][_0x6ec4f2])){var _0x5bcfec=Number(RegExp['$1'])/0x64;_0x5504c5+=_0x5bcfec;}if(_0x5ecd49[_0x56ccfe(0x5aa)]['match'](VisuMZ['CoreEngine'][_0x56ccfe(0x9c3)]['xparamPlus2'][_0x6ec4f2])){if(_0x56ccfe(0x21f)!==_0x56ccfe(0x60f)){var _0x5bcfec=Number(RegExp['$1']);_0x5504c5+=_0x5bcfec;}else this[_0x56ccfe(0x346)]=_0x220cb5[_0x56ccfe(0x67b)](this[_0x56ccfe(0x8fc)][_0x56ccfe(0x324)]),this[_0x56ccfe(0x346)][_0x56ccfe(0x543)](this[_0x56ccfe(0x864)][_0x56ccfe(0x30a)](this));}if(_0x5ecd49[_0x56ccfe(0x5aa)][_0x56ccfe(0x758)](VisuMZ[_0x56ccfe(0x824)][_0x56ccfe(0x9c3)]['xparamPlusJS'][_0x6ec4f2])){var _0x25c674=String(RegExp['$1']);try{_0x5504c5+=eval(_0x25c674);}catch(_0x16f210){if($gameTemp[_0x56ccfe(0x6bb)]())console[_0x56ccfe(0x47c)](_0x16f210);}}return _0x5504c5;}else return _0x2ede31['layoutSettings'][_0x56ccfe(0x18e)][_0x56ccfe(0x398)](this);};return this[_0x186fd2(0x205)]()[_0x186fd2(0x4e0)](_0x2273ab,0x0);},Game_BattlerBase[_0xa0779(0x271)][_0xa0779(0x81d)]=function(_0x92dc3b){const _0x316411=_0xa0779,_0x253123=(_0xca659,_0x32bd09)=>{const _0x4b435a=_0x5859;if(!_0x32bd09)return _0xca659;if(_0x32bd09[_0x4b435a(0x5aa)]['match'](VisuMZ[_0x4b435a(0x824)][_0x4b435a(0x9c3)][_0x4b435a(0x6e1)][_0x92dc3b])){if(_0x4b435a(0x783)===_0x4b435a(0x4e3)){const _0x3bc5b9=this[_0x4b435a(0x995)](_0x5b4eec,_0x735f7);_0x3bc5b9[_0x4b435a(0x346)][_0x4b435a(0x65f)](_0x4c5aa9[_0x184fd3],0x0,0x0,_0x4ecb31,_0x139ec8,'center'),_0x3bc5b9['x']=(_0x242761-(_0x5aac31[_0x4b435a(0x444)]-0x1)/0x2)*_0x2049af,_0x3bc5b9['dy']=-_0x2db118;}else{var _0x1e5399=Number(RegExp['$1'])/0x64;_0xca659*=_0x1e5399;}}if(_0x32bd09['note']['match'](VisuMZ['CoreEngine']['RegExp'][_0x4b435a(0x47a)][_0x92dc3b])){var _0x1e5399=Number(RegExp['$1']);_0xca659*=_0x1e5399;}if(_0x32bd09['note'][_0x4b435a(0x758)](VisuMZ['CoreEngine']['RegExp'][_0x4b435a(0x1f2)][_0x92dc3b])){var _0x2552b1=String(RegExp['$1']);try{if(_0x4b435a(0x1cc)!==_0x4b435a(0x943))_0xca659*=eval(_0x2552b1);else{if(!this[_0x4b435a(0x467)]())return;const _0xb7c747=this[_0x4b435a(0x606)]();this[_0x4b435a(0x4f4)]=new _0x4b298f(_0xb7c747),this[_0x4b435a(0x5a7)](this[_0x4b435a(0x4f4)]);}}catch(_0x5c36a2){if($gameTemp[_0x4b435a(0x6bb)]())console['log'](_0x5c36a2);}}return _0xca659;};return this[_0x316411(0x205)]()[_0x316411(0x4e0)](_0x253123,0x1);},Game_BattlerBase[_0xa0779(0x271)]['xparamFlatBonus']=function(_0x3a7ee4){const _0x3ea073=_0xa0779,_0xe23e68=(_0x57aaca,_0x3ac71c)=>{const _0x2f223e=_0x5859;if(!_0x3ac71c)return _0x57aaca;if(_0x3ac71c[_0x2f223e(0x5aa)][_0x2f223e(0x758)](VisuMZ[_0x2f223e(0x824)][_0x2f223e(0x9c3)][_0x2f223e(0x6b7)][_0x3a7ee4])){var _0x3475fb=Number(RegExp['$1'])/0x64;_0x57aaca+=_0x3475fb;}if(_0x3ac71c['note'][_0x2f223e(0x758)](VisuMZ[_0x2f223e(0x824)]['RegExp'][_0x2f223e(0x66c)][_0x3a7ee4])){var _0x3475fb=Number(RegExp['$1']);_0x57aaca+=_0x3475fb;}if(_0x3ac71c[_0x2f223e(0x5aa)][_0x2f223e(0x758)](VisuMZ[_0x2f223e(0x824)][_0x2f223e(0x9c3)][_0x2f223e(0x84c)][_0x3a7ee4])){var _0x4e8998=String(RegExp['$1']);try{_0x57aaca+=eval(_0x4e8998);}catch(_0x3340b9){if($gameTemp['isPlaytest']())console['log'](_0x3340b9);}}return _0x57aaca;};return this['traitObjects']()[_0x3ea073(0x4e0)](_0xe23e68,0x0);},Game_BattlerBase[_0xa0779(0x271)][_0xa0779(0x8ff)]=function(_0x45838d){const _0x2b6fac=_0xa0779;let _0x1dd435=_0x2b6fac(0x8ff)+_0x45838d+_0x2b6fac(0x5f9);if(this[_0x2b6fac(0x20c)](_0x1dd435))return this[_0x2b6fac(0x7cc)][_0x1dd435];return this[_0x2b6fac(0x7cc)][_0x1dd435]=VisuMZ[_0x2b6fac(0x824)]['Settings'][_0x2b6fac(0x34a)][_0x2b6fac(0x736)][_0x2b6fac(0x398)](this,_0x45838d),this[_0x2b6fac(0x7cc)][_0x1dd435];},Game_BattlerBase[_0xa0779(0x271)][_0xa0779(0x367)]=function(_0x2c1d10){const _0x44420d=_0xa0779,_0x56c36c=(_0x4cd707,_0xb6f484)=>{const _0x3c587b=_0x5859;if('HQIdI'!==_0x3c587b(0x3a7))return _0x542f56[_0x3c587b(0x824)][_0x3c587b(0x17f)][_0x3c587b(0x6b1)][_0x3c587b(0x76e)]||_0x3c587b(0x1fe);else{if(!_0xb6f484)return _0x4cd707;if(_0xb6f484[_0x3c587b(0x5aa)][_0x3c587b(0x758)](VisuMZ[_0x3c587b(0x824)][_0x3c587b(0x9c3)][_0x3c587b(0x7d5)][_0x2c1d10])){var _0x5e54f0=Number(RegExp['$1'])/0x64;_0x4cd707+=_0x5e54f0;}if(_0xb6f484[_0x3c587b(0x5aa)]['match'](VisuMZ['CoreEngine'][_0x3c587b(0x9c3)][_0x3c587b(0x632)][_0x2c1d10])){if(_0x3c587b(0x4de)===_0x3c587b(0x4de)){var _0x5e54f0=Number(RegExp['$1']);_0x4cd707+=_0x5e54f0;}else _0x3cd379[_0x3c587b(0x2e4)]&&(this[_0x3c587b(0x655)]=_0x3c587b(0x32d));}if(_0xb6f484[_0x3c587b(0x5aa)][_0x3c587b(0x758)](VisuMZ[_0x3c587b(0x824)][_0x3c587b(0x9c3)][_0x3c587b(0x235)][_0x2c1d10])){var _0x17effe=String(RegExp['$1']);try{_0x4cd707+=eval(_0x17effe);}catch(_0x4d93f0){if(_0x3c587b(0x360)==='rEtzo'){if($gameTemp[_0x3c587b(0x6bb)]())console[_0x3c587b(0x47c)](_0x4d93f0);}else{const _0x53508c=_0x2d200f[_0x3c587b(0x459)]()['name'][_0x3c587b(0x710)](/\\I\[(\d+)\]/gi,'');this[_0x3c587b(0x65f)](_0x53508c,_0x57197b,_0x4ec8d8,_0x31afa6);}}}return _0x4cd707;}};return this['traitObjects']()[_0x44420d(0x4e0)](_0x56c36c,0x0);},Game_BattlerBase[_0xa0779(0x271)]['sparamRate']=function(_0x45a456){const _0x520472=_0xa0779,_0x23faf7=(_0x5e0a39,_0x41f3ba)=>{const _0x246944=_0x5859;if(_0x246944(0x99b)!==_0x246944(0x99b))return _0x398152['getBattleSystem']()>=0x1;else{if(!_0x41f3ba)return _0x5e0a39;if(_0x41f3ba['note']['match'](VisuMZ['CoreEngine']['RegExp'][_0x246944(0x5cf)][_0x45a456])){var _0x35fa30=Number(RegExp['$1'])/0x64;_0x5e0a39*=_0x35fa30;}if(_0x41f3ba[_0x246944(0x5aa)]['match'](VisuMZ[_0x246944(0x824)][_0x246944(0x9c3)][_0x246944(0x5b6)][_0x45a456])){var _0x35fa30=Number(RegExp['$1']);_0x5e0a39*=_0x35fa30;}if(_0x41f3ba['note']['match'](VisuMZ[_0x246944(0x824)][_0x246944(0x9c3)][_0x246944(0x8d6)][_0x45a456])){var _0x2ce9dd=String(RegExp['$1']);try{_0x246944(0x558)!=='xOpwo'?_0x5e0a39*=eval(_0x2ce9dd):this[_0x246944(0x942)]();}catch(_0x1af5a5){if($gameTemp[_0x246944(0x6bb)]())console[_0x246944(0x47c)](_0x1af5a5);}}return _0x5e0a39;}};return this[_0x520472(0x205)]()[_0x520472(0x4e0)](_0x23faf7,0x1);},Game_BattlerBase[_0xa0779(0x271)][_0xa0779(0x1f8)]=function(_0x58706a){const _0x55f231=_0xa0779,_0x331636=(_0x5c52f7,_0x487da8)=>{const _0x54bd8c=_0x5859;if(_0x54bd8c(0x3cb)===_0x54bd8c(0x153)){return _0x51857b[_0x54bd8c(0x271)][_0x54bd8c(0x8ca)][_0x54bd8c(0x398)](this)+_0x3f9a85[_0x54bd8c(0x824)][_0x54bd8c(0x17f)][_0x54bd8c(0x1ce)][_0x54bd8c(0x807)];;}else{if(!_0x487da8)return _0x5c52f7;if(_0x487da8[_0x54bd8c(0x5aa)][_0x54bd8c(0x758)](VisuMZ[_0x54bd8c(0x824)][_0x54bd8c(0x9c3)]['sparamFlat1'][_0x58706a])){var _0x4d23e8=Number(RegExp['$1'])/0x64;_0x5c52f7+=_0x4d23e8;}if(_0x487da8[_0x54bd8c(0x5aa)][_0x54bd8c(0x758)](VisuMZ['CoreEngine']['RegExp'][_0x54bd8c(0x6a7)][_0x58706a])){if('vAtth'===_0x54bd8c(0x66a)){var _0x4d23e8=Number(RegExp['$1']);_0x5c52f7+=_0x4d23e8;}else return _0xe8a3c7[_0x54bd8c(0x1ab)][_0x54bd8c(0x31c)]['call'](this);}if(_0x487da8[_0x54bd8c(0x5aa)]['match'](VisuMZ[_0x54bd8c(0x824)][_0x54bd8c(0x9c3)]['sparamFlatJS'][_0x58706a])){var _0x2a3594=String(RegExp['$1']);try{_0x54bd8c(0x2a8)!==_0x54bd8c(0x2a8)?this['setup'](_0x7f3732[_0x54bd8c(0x591)],0x0):_0x5c52f7+=eval(_0x2a3594);}catch(_0xae30bb){if($gameTemp[_0x54bd8c(0x6bb)]())console[_0x54bd8c(0x47c)](_0xae30bb);}}return _0x5c52f7;}};return this[_0x55f231(0x205)]()[_0x55f231(0x4e0)](_0x331636,0x0);},Game_BattlerBase[_0xa0779(0x271)]['sparam']=function(_0x166991){const _0x1f8e9c=_0xa0779;let _0x2ac4db=_0x1f8e9c(0x41e)+_0x166991+_0x1f8e9c(0x5f9);if(this[_0x1f8e9c(0x20c)](_0x2ac4db))return this[_0x1f8e9c(0x7cc)][_0x2ac4db];return this[_0x1f8e9c(0x7cc)][_0x2ac4db]=VisuMZ[_0x1f8e9c(0x824)][_0x1f8e9c(0x17f)][_0x1f8e9c(0x34a)][_0x1f8e9c(0x59a)][_0x1f8e9c(0x398)](this,_0x166991),this['_cache'][_0x2ac4db];},Game_BattlerBase[_0xa0779(0x271)]['paramValueByName']=function(_0x438058,_0x59d9ab){const _0x554566=_0xa0779;if(typeof paramId===_0x554566(0x97d))return this['param'](_0x438058);_0x438058=String(_0x438058||'')[_0x554566(0x7c9)]();if(_0x438058===_0x554566(0x37a))return this[_0x554566(0x4c1)](0x0);if(_0x438058===_0x554566(0x8d2))return this[_0x554566(0x4c1)](0x1);if(_0x438058===_0x554566(0x691))return this[_0x554566(0x4c1)](0x2);if(_0x438058===_0x554566(0x29c))return this['param'](0x3);if(_0x438058===_0x554566(0x418))return this[_0x554566(0x4c1)](0x4);if(_0x438058===_0x554566(0x897))return this['param'](0x5);if(_0x438058===_0x554566(0x1c8))return this[_0x554566(0x4c1)](0x6);if(_0x438058==='LUK')return this[_0x554566(0x4c1)](0x7);if(_0x438058===_0x554566(0x64f))return _0x59d9ab?String(Math[_0x554566(0x4ee)](this['xparam'](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x438058===_0x554566(0x329))return _0x59d9ab?String(Math[_0x554566(0x4ee)](this[_0x554566(0x8ff)](0x1)*0x64))+'%':this[_0x554566(0x8ff)](0x1);if(_0x438058===_0x554566(0x552))return _0x59d9ab?String(Math[_0x554566(0x4ee)](this[_0x554566(0x8ff)](0x2)*0x64))+'%':this[_0x554566(0x8ff)](0x2);if(_0x438058==='CEV')return _0x59d9ab?String(Math['round'](this[_0x554566(0x8ff)](0x3)*0x64))+'%':this[_0x554566(0x8ff)](0x3);if(_0x438058==='MEV')return _0x59d9ab?String(Math[_0x554566(0x4ee)](this[_0x554566(0x8ff)](0x4)*0x64))+'%':this[_0x554566(0x8ff)](0x4);if(_0x438058===_0x554566(0x7d1))return _0x59d9ab?String(Math['round'](this[_0x554566(0x8ff)](0x5)*0x64))+'%':this[_0x554566(0x8ff)](0x5);if(_0x438058===_0x554566(0x630))return _0x59d9ab?String(Math[_0x554566(0x4ee)](this[_0x554566(0x8ff)](0x6)*0x64))+'%':this[_0x554566(0x8ff)](0x6);if(_0x438058==='HRG')return _0x59d9ab?String(Math[_0x554566(0x4ee)](this['xparam'](0x7)*0x64))+'%':this[_0x554566(0x8ff)](0x7);if(_0x438058===_0x554566(0x92e))return _0x59d9ab?String(Math[_0x554566(0x4ee)](this[_0x554566(0x8ff)](0x8)*0x64))+'%':this[_0x554566(0x8ff)](0x8);if(_0x438058===_0x554566(0x938))return _0x59d9ab?String(Math['round'](this[_0x554566(0x8ff)](0x9)*0x64))+'%':this[_0x554566(0x8ff)](0x9);if(_0x438058===_0x554566(0x9e3))return _0x59d9ab?String(Math[_0x554566(0x4ee)](this[_0x554566(0x41e)](0x0)*0x64))+'%':this['sparam'](0x0);if(_0x438058==='GRD')return _0x59d9ab?String(Math[_0x554566(0x4ee)](this['sparam'](0x1)*0x64))+'%':this[_0x554566(0x41e)](0x1);if(_0x438058===_0x554566(0x9d8))return _0x59d9ab?String(Math[_0x554566(0x4ee)](this[_0x554566(0x41e)](0x2)*0x64))+'%':this['sparam'](0x2);if(_0x438058===_0x554566(0x3cc))return _0x59d9ab?String(Math[_0x554566(0x4ee)](this['sparam'](0x3)*0x64))+'%':this[_0x554566(0x41e)](0x3);if(_0x438058===_0x554566(0x788))return _0x59d9ab?String(Math[_0x554566(0x4ee)](this[_0x554566(0x41e)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x438058===_0x554566(0x983))return _0x59d9ab?String(Math[_0x554566(0x4ee)](this[_0x554566(0x41e)](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x438058===_0x554566(0x97c))return _0x59d9ab?String(Math['round'](this['sparam'](0x6)*0x64))+'%':this[_0x554566(0x41e)](0x6);if(_0x438058==='MDR')return _0x59d9ab?String(Math[_0x554566(0x4ee)](this['sparam'](0x7)*0x64))+'%':this[_0x554566(0x41e)](0x7);if(_0x438058===_0x554566(0x69a))return _0x59d9ab?String(Math[_0x554566(0x4ee)](this[_0x554566(0x41e)](0x8)*0x64))+'%':this[_0x554566(0x41e)](0x8);if(_0x438058===_0x554566(0x963))return _0x59d9ab?String(Math[_0x554566(0x4ee)](this[_0x554566(0x41e)](0x9)*0x64))+'%':this[_0x554566(0x41e)](0x9);if(VisuMZ[_0x554566(0x824)]['CustomParamAbb'][_0x438058]){const _0x2e5f13=VisuMZ[_0x554566(0x824)]['CustomParamAbb'][_0x438058],_0x1ef278=this[_0x2e5f13];if(VisuMZ[_0x554566(0x824)][_0x554566(0x9b5)][_0x438058]===_0x554566(0x52a))return _0x1ef278;else{if(_0x554566(0x4d6)==='fKeZL')return _0x59d9ab?String(Math['round'](_0x1ef278*0x64))+'%':_0x1ef278;else this[_0x554566(0x73e)]();}}return'';},Game_BattlerBase[_0xa0779(0x271)][_0xa0779(0x790)]=function(){const _0x2823d0=_0xa0779;return this[_0x2823d0(0x8ab)]()&&this[_0x2823d0(0x611)]<this[_0x2823d0(0x673)]*VisuMZ[_0x2823d0(0x824)]['Settings'][_0x2823d0(0x34a)]['CrisisRate'];},Game_Battler['prototype'][_0xa0779(0x3dc)]=function(){const _0x421aec=_0xa0779;SoundManager[_0x421aec(0x69f)](),this[_0x421aec(0x615)](_0x421aec(0x3e8));},VisuMZ['CoreEngine'][_0xa0779(0x3ab)]=Game_Actor[_0xa0779(0x271)][_0xa0779(0x6b5)],Game_Actor[_0xa0779(0x271)][_0xa0779(0x6b5)]=function(_0x22b7b4){const _0x2b4061=_0xa0779;if(this[_0x2b4061(0x7ff)]>0x63)return this['paramBaseAboveLevel99'](_0x22b7b4);return VisuMZ[_0x2b4061(0x824)]['Game_Actor_paramBase'][_0x2b4061(0x398)](this,_0x22b7b4);},Game_Actor[_0xa0779(0x271)]['paramBaseAboveLevel99']=function(_0x7e7b66){const _0x1799da=_0xa0779,_0x5d1c2a=this[_0x1799da(0x459)]()['params'][_0x7e7b66][0x63],_0x1ce7da=this[_0x1799da(0x459)]()[_0x1799da(0x3eb)][_0x7e7b66][0x62];return _0x5d1c2a+(_0x5d1c2a-_0x1ce7da)*(this[_0x1799da(0x7ff)]-0x63);},VisuMZ[_0xa0779(0x824)][_0xa0779(0x94e)]=Game_Actor[_0xa0779(0x271)][_0xa0779(0x660)],Game_Actor['prototype'][_0xa0779(0x660)]=function(_0x127a2d,_0x2346ce){const _0x51b372=_0xa0779;$gameTemp[_0x51b372(0x559)]=!![],VisuMZ['CoreEngine'][_0x51b372(0x94e)][_0x51b372(0x398)](this,_0x127a2d,_0x2346ce),$gameTemp[_0x51b372(0x559)]=undefined;},VisuMZ[_0xa0779(0x824)][_0xa0779(0x40c)]=Game_Actor[_0xa0779(0x271)][_0xa0779(0x9d2)],Game_Actor['prototype'][_0xa0779(0x9d2)]=function(){const _0x5573fa=_0xa0779;VisuMZ[_0x5573fa(0x824)][_0x5573fa(0x40c)][_0x5573fa(0x398)](this);if(!$gameTemp['_changingClass'])this[_0x5573fa(0x834)]();},Game_Actor[_0xa0779(0x271)][_0xa0779(0x834)]=function(){const _0x57618d=_0xa0779;this['_cache']={};if(VisuMZ[_0x57618d(0x824)][_0x57618d(0x17f)][_0x57618d(0x2b0)][_0x57618d(0x2af)])this[_0x57618d(0x611)]=this[_0x57618d(0x673)];if(VisuMZ[_0x57618d(0x824)][_0x57618d(0x17f)][_0x57618d(0x2b0)][_0x57618d(0x32b)])this[_0x57618d(0x837)]=this[_0x57618d(0x157)];},Game_Actor[_0xa0779(0x271)][_0xa0779(0x6e5)]=function(){const _0x4ad776=_0xa0779;if(this[_0x4ad776(0x448)]())return 0x1;const _0xe5944=this['nextLevelExp']()-this[_0x4ad776(0x95b)](),_0x2ca079=this[_0x4ad776(0x3af)]()-this[_0x4ad776(0x95b)]();return(_0x2ca079/_0xe5944)[_0x4ad776(0x1f6)](0x0,0x1);},Game_Actor['prototype'][_0xa0779(0x205)]=function(){const _0x4fd77a=_0xa0779,_0x216723=Game_Battler[_0x4fd77a(0x271)][_0x4fd77a(0x205)]['call'](this);for(const _0x782fcc of this[_0x4fd77a(0x524)]()){_0x782fcc&&(_0x4fd77a(0x246)!=='Pgykk'?_0x216723[_0x4fd77a(0x55f)](_0x782fcc):(_0x4bc63c['CoreEngine'][_0x4fd77a(0x26a)][_0x4fd77a(0x398)](this),this[_0x4fd77a(0x8a6)]={'x':0x0,'y':0x0},this[_0x4fd77a(0x4f5)]={'x':0x0,'y':0x0}));}return _0x216723[_0x4fd77a(0x55f)](this[_0x4fd77a(0x459)](),this[_0x4fd77a(0x161)]()),_0x216723;},Object[_0xa0779(0x5a2)](Game_Enemy[_0xa0779(0x271)],'level',{'get':function(){const _0x256b4a=_0xa0779;return this[_0x256b4a(0x71d)]();},'configurable':!![]}),Game_Enemy[_0xa0779(0x271)][_0xa0779(0x71d)]=function(){const _0x1a4d4a=_0xa0779;return this[_0x1a4d4a(0x8ef)]()['level'];},Game_Enemy[_0xa0779(0x271)][_0xa0779(0x71f)]=function(){const _0x589839=_0xa0779;if(!this[_0x589839(0x87d)]){this['_screenY']+=Math[_0x589839(0x4ee)]((Graphics[_0x589839(0x7f6)]-0x270)/0x2),this[_0x589839(0x690)]-=Math['floor']((Graphics[_0x589839(0x7f6)]-Graphics[_0x589839(0x2f3)])/0x2);if($gameSystem[_0x589839(0x6b0)]()){if(_0x589839(0x9e7)===_0x589839(0x21d)){try{_0x212966[_0x589839(0x824)][_0x589839(0x413)][_0x589839(0x398)](this,_0x113512);}catch(_0x33404e){_0x2aafa1[_0x589839(0x6bb)]()&&(_0x40fa66[_0x589839(0x47c)]('Control\x20Variables\x20Script\x20Error'),_0x13ba02[_0x589839(0x47c)](_0x33404e));}return!![];}else this[_0x589839(0x66e)]-=Math[_0x589839(0x256)]((Graphics[_0x589839(0x3c5)]-Graphics['boxWidth'])/0x2);}else{if(_0x589839(0x5f5)===_0x589839(0x5f5))this['_screenX']+=Math['round']((Graphics[_0x589839(0x66f)]-0x330)/0x2);else{if(this[_0x589839(0x8b9)]===_0x44597a)this[_0x589839(0x7a9)]();this['_coreEngineShakeStyle']=_0x354390[_0x589839(0x538)]()['trim']();}}}this['_repositioned']=!![];},Game_Party[_0xa0779(0x271)][_0xa0779(0x934)]=function(){const _0x36f13d=_0xa0779;return VisuMZ[_0x36f13d(0x824)]['Settings'][_0x36f13d(0x1d6)][_0x36f13d(0x5ce)];},VisuMZ['CoreEngine'][_0xa0779(0x2e1)]=Game_Party[_0xa0779(0x271)][_0xa0779(0x4d4)],Game_Party['prototype'][_0xa0779(0x4d4)]=function(_0x3a81c0){const _0x17b47a=_0xa0779;if(VisuMZ[_0x17b47a(0x824)]['Settings'][_0x17b47a(0x2b0)][_0x17b47a(0x259)]&&DataManager[_0x17b47a(0x573)](_0x3a81c0))return;VisuMZ['CoreEngine']['Game_Party_consumeItem']['call'](this,_0x3a81c0);},Game_Party[_0xa0779(0x271)][_0xa0779(0x17b)]=function(){const _0x58a7db=_0xa0779,_0xa498e3=VisuMZ['CoreEngine']['Settings']['QoL'],_0x1664de=_0xa498e3[_0x58a7db(0x8a4)]??0x63;let _0x449ca6=[];if(_0xa498e3[_0x58a7db(0x8b3)]??!![]){if(_0x58a7db(0x496)===_0x58a7db(0x433))return'CTB';else _0x449ca6=_0x449ca6[_0x58a7db(0x35f)]($dataItems);}(_0xa498e3[_0x58a7db(0x3a1)]??!![])&&(_0x449ca6=_0x449ca6[_0x58a7db(0x35f)]($dataWeapons));(_0xa498e3[_0x58a7db(0x551)]??!![])&&(_0x449ca6=_0x449ca6[_0x58a7db(0x35f)]($dataArmors));for(const _0x2111c0 of _0x449ca6){if(!_0x2111c0)continue;if(_0x2111c0[_0x58a7db(0x912)][_0x58a7db(0x64c)]()<=0x0)continue;if(_0x2111c0[_0x58a7db(0x912)][_0x58a7db(0x758)](/-----/i))continue;this[_0x58a7db(0x6b6)](_0x2111c0,_0x1664de);}},VisuMZ[_0xa0779(0x824)]['Game_Troop_setup']=Game_Troop[_0xa0779(0x271)][_0xa0779(0x5e9)],Game_Troop[_0xa0779(0x271)][_0xa0779(0x5e9)]=function(_0x103eea){const _0x22e10b=_0xa0779;$gameTemp[_0x22e10b(0x5de)](),$gameTemp[_0x22e10b(0x1f1)](_0x103eea),VisuMZ['CoreEngine'][_0x22e10b(0x748)][_0x22e10b(0x398)](this,_0x103eea);},VisuMZ['CoreEngine'][_0xa0779(0x3e1)]=Game_Map[_0xa0779(0x271)][_0xa0779(0x5e9)],Game_Map[_0xa0779(0x271)][_0xa0779(0x5e9)]=function(_0x3f9b14){const _0x29062f=_0xa0779;VisuMZ[_0x29062f(0x824)]['Game_Map_setup'][_0x29062f(0x398)](this,_0x3f9b14),this[_0x29062f(0x5f2)](),this[_0x29062f(0x169)](_0x3f9b14);},Game_Map[_0xa0779(0x271)]['setupCoreEngine']=function(){const _0x140cd2=_0xa0779;this[_0x140cd2(0x334)]=VisuMZ[_0x140cd2(0x824)][_0x140cd2(0x17f)][_0x140cd2(0x2b0)]['NoTileShadows']||![];const _0x5185c5=VisuMZ[_0x140cd2(0x824)][_0x140cd2(0x17f)][_0x140cd2(0x4d9)],_0x9eac84=$dataMap?$dataMap[_0x140cd2(0x5aa)]||'':'';if(_0x9eac84[_0x140cd2(0x758)](/<SHOW TILE SHADOWS>/i)){if(_0x140cd2(0x2d2)!==_0x140cd2(0x58f))this[_0x140cd2(0x334)]=![];else return this['_scene']&&this[_0x140cd2(0x6a6)][_0x140cd2(0x8ec)]===_0x316e35;}else{if(_0x9eac84[_0x140cd2(0x758)](/<HIDE TILE SHADOWS>/i)){if(_0x140cd2(0x55a)!==_0x140cd2(0x55a)){const _0x3c0817=_0x7f984d+(this[_0x140cd2(0x981)]()-_0x49108a['iconHeight'])/0x2;this[_0x140cd2(0x84b)](_0xf884a8,_0x393ad3+(_0x751638-_0x50299f['iconWidth']),_0x3c0817),_0x11a23d-=_0x578538['iconWidth']+0x4;}else this[_0x140cd2(0x334)]=!![];}}if(_0x9eac84[_0x140cd2(0x758)](/<SCROLL LOCK X>/i))this[_0x140cd2(0x39c)]()[_0x140cd2(0x936)]=!![],this['centerCameraCheckData']()[_0x140cd2(0x565)]=_0x5185c5[_0x140cd2(0x5f0)];else _0x9eac84[_0x140cd2(0x758)](/<SCROLL LOCK X: (.*?)>/i)&&('VPtUq'!==_0x140cd2(0x328)?_0x21510d*=_0x1427b0(_0x21191a):(this[_0x140cd2(0x39c)]()[_0x140cd2(0x936)]=!![],this['centerCameraCheckData']()[_0x140cd2(0x565)]=Number(RegExp['$1'])));if(_0x9eac84[_0x140cd2(0x758)](/<SCROLL LOCK Y>/i))this['centerCameraCheckData']()[_0x140cd2(0x9d6)]=!![],this[_0x140cd2(0x39c)]()[_0x140cd2(0x239)]=_0x5185c5[_0x140cd2(0x6a1)];else _0x9eac84[_0x140cd2(0x758)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x140cd2(0x39c)]()[_0x140cd2(0x9d6)]=!![],this['centerCameraCheckData']()['displayY']=Number(RegExp['$1']));},Game_Map[_0xa0779(0x271)][_0xa0779(0x803)]=function(){const _0x4e03b2=_0xa0779;if(this[_0x4e03b2(0x334)]===undefined)this[_0x4e03b2(0x169)]();return this['_hideTileShadows'];},Game_Map[_0xa0779(0x271)]['checkCoreEngineDisplayCenter']=function(){const _0x2bbdd9=_0xa0779,_0x38276b=VisuMZ[_0x2bbdd9(0x824)][_0x2bbdd9(0x17f)][_0x2bbdd9(0x4d9)];this[_0x2bbdd9(0x7e5)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x38276b[_0x2bbdd9(0x432)]){const _0x4459a3=Graphics[_0x2bbdd9(0x3c5)]/this['tileWidth']();_0x4459a3%0x1!==0x0&&Math[_0x2bbdd9(0x707)](_0x4459a3)===this[_0x2bbdd9(0x3c5)]()&&!this[_0x2bbdd9(0x446)]()&&(this[_0x2bbdd9(0x7e5)][_0x2bbdd9(0x936)]=!![],this['_centerCameraCheck'][_0x2bbdd9(0x565)]=_0x38276b[_0x2bbdd9(0x5f0)]||0x0);}if(_0x38276b['AutoScrollLockY']){const _0x1fb6c2=Graphics['height']/this['tileHeight']();if(_0x1fb6c2%0x1!==0x0&&Math[_0x2bbdd9(0x707)](_0x1fb6c2)===this[_0x2bbdd9(0x7f6)]()&&!this[_0x2bbdd9(0x5b7)]()){if('WrnJo'===_0x2bbdd9(0x5ee))this['_centerCameraCheck'][_0x2bbdd9(0x9d6)]=!![],this['_centerCameraCheck'][_0x2bbdd9(0x239)]=_0x38276b['DisplayLockY']||0x0;else{const _0x404d91=_0x12a114[_0x2bbdd9(0x256)]((_0x503e4a-0x2)*_0x2bd8de),_0x49c6b6=_0x4bc423[_0x2bbdd9(0x271)][_0x2bbdd9(0x5fd)][_0x2bbdd9(0x398)](this),_0x540cc1=_0x486da+this['lineHeight']()-_0x49c6b6-0x2;this['contents'][_0x2bbdd9(0x5c6)](_0x4b4d23,_0x540cc1,_0x50456d,_0x49c6b6,_0x3ca088[_0x2bbdd9(0x763)]()),this['contents'][_0x2bbdd9(0x80e)](_0xdab3c0+0x1,_0x540cc1+0x1,_0x404d91,_0x49c6b6-0x2,_0x45ac5a,_0x2207ca);}}}},Game_Map[_0xa0779(0x271)][_0xa0779(0x39c)]=function(){const _0x38a0c4=_0xa0779;if(this[_0x38a0c4(0x7e5)]===undefined)this[_0x38a0c4(0x5f2)]();return this[_0x38a0c4(0x7e5)];},VisuMZ['CoreEngine'][_0xa0779(0x755)]=Game_Map[_0xa0779(0x271)][_0xa0779(0x594)],Game_Map[_0xa0779(0x271)][_0xa0779(0x594)]=function(_0x18ba62){const _0x41ae05=_0xa0779;if(this[_0x41ae05(0x39c)]()[_0x41ae05(0x9d6)]&&$gameScreen[_0x41ae05(0x499)]()===0x1){this['_displayY']=this[_0x41ae05(0x39c)]()['displayY'];return;}VisuMZ[_0x41ae05(0x824)][_0x41ae05(0x755)][_0x41ae05(0x398)](this,_0x18ba62);},VisuMZ[_0xa0779(0x824)][_0xa0779(0x24a)]=Game_Map[_0xa0779(0x271)][_0xa0779(0x52d)],Game_Map[_0xa0779(0x271)]['scrollLeft']=function(_0x164e69){const _0x559fbb=_0xa0779;if(this[_0x559fbb(0x39c)]()['centerX']&&$gameScreen['zoomScale']()===0x1){this[_0x559fbb(0x44c)]=this[_0x559fbb(0x39c)]()[_0x559fbb(0x565)];return;}VisuMZ[_0x559fbb(0x824)]['Game_Map_scrollLeft'][_0x559fbb(0x398)](this,_0x164e69);},VisuMZ[_0xa0779(0x824)][_0xa0779(0x5bd)]=Game_Map['prototype'][_0xa0779(0x7b3)],Game_Map['prototype'][_0xa0779(0x7b3)]=function(_0x28113d){const _0x317c7d=_0xa0779;if(this['centerCameraCheckData']()['centerX']&&$gameScreen['zoomScale']()===0x1){this[_0x317c7d(0x44c)]=this[_0x317c7d(0x39c)]()[_0x317c7d(0x565)];return;}VisuMZ[_0x317c7d(0x824)][_0x317c7d(0x5bd)][_0x317c7d(0x398)](this,_0x28113d);},VisuMZ[_0xa0779(0x824)][_0xa0779(0x2a4)]=Game_Map[_0xa0779(0x271)][_0xa0779(0x46f)],Game_Map[_0xa0779(0x271)]['scrollUp']=function(_0x2d7bee){const _0x55f9fa=_0xa0779;if(this['centerCameraCheckData']()[_0x55f9fa(0x9d6)]&&$gameScreen['zoomScale']()===0x1){if('kCDzj'!==_0x55f9fa(0x7eb))return _0x19e3d6['layoutSettings']['ItemRect']['call'](this);else{this['_displayY']=this['centerCameraCheckData']()[_0x55f9fa(0x239)];return;}}VisuMZ['CoreEngine'][_0x55f9fa(0x2a4)][_0x55f9fa(0x398)](this,_0x2d7bee);},VisuMZ['CoreEngine']['Game_Character_processMoveCommand']=Game_Character[_0xa0779(0x271)]['processMoveCommand'],Game_Character[_0xa0779(0x271)][_0xa0779(0x975)]=function(_0x1bbd02){const _0x33c06c=_0xa0779;try{VisuMZ['CoreEngine'][_0x33c06c(0x1b8)]['call'](this,_0x1bbd02);}catch(_0x33275a){if(_0x33c06c(0x6f4)===_0x33c06c(0x6f4)){if($gameTemp[_0x33c06c(0x6bb)]())console[_0x33c06c(0x47c)](_0x33275a);}else _0x58dd83=_0x87dc55(_0x4cb710['$1'])*_0x70aa93[_0x33c06c(0x3c5)],_0x3fd100=(0x1-_0x3a0dc0(_0x9f245e['$2']))*-_0x58a7f0;}},Game_Player['prototype'][_0xa0779(0x2a3)]=function(){const _0x118ff5=_0xa0779,_0x170d18=$gameMap[_0x118ff5(0x426)]();this[_0x118ff5(0x5d4)]=Math[_0x118ff5(0x1ee)](_0x170d18)+Math[_0x118ff5(0x1ee)](_0x170d18)+this[_0x118ff5(0x57f)]();},Game_Player[_0xa0779(0x271)][_0xa0779(0x57f)]=function(){const _0x2cb7fa=_0xa0779;if($dataMap&&$dataMap[_0x2cb7fa(0x5aa)]&&$dataMap['note'][_0x2cb7fa(0x758)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i))return Number(RegExp['$1']);else{if('pVqbd'!==_0x2cb7fa(0x74f))this[_0x2cb7fa(0x266)](_0x1fb3a3[_0x2cb7fa(0x5ff)](_0x2cb7fa(0x4b5)));else return VisuMZ['CoreEngine'][_0x2cb7fa(0x17f)]['QoL'][_0x2cb7fa(0x19c)];}},VisuMZ['CoreEngine'][_0xa0779(0x1b9)]=Game_Event[_0xa0779(0x271)]['isCollidedWithEvents'],Game_Event[_0xa0779(0x271)][_0xa0779(0x19e)]=function(_0xbe2069,_0x796f38){const _0x13de47=_0xa0779;return this[_0x13de47(0x431)]()?this[_0x13de47(0x6c3)](_0xbe2069,_0x796f38):VisuMZ['CoreEngine'][_0x13de47(0x1b9)][_0x13de47(0x398)](this,_0xbe2069,_0x796f38);},Game_Event[_0xa0779(0x271)]['isSmartEventCollisionOn']=function(){const _0x3206b0=_0xa0779;return VisuMZ['CoreEngine']['Settings'][_0x3206b0(0x2b0)][_0x3206b0(0x813)];},Game_Event['prototype'][_0xa0779(0x6c3)]=function(_0xae1e2a,_0x757315){const _0x14470f=_0xa0779;if(!this[_0x14470f(0x184)]()){if('ompkw'!==_0x14470f(0x180))return![];else _0x5a7478[_0x14470f(0x2de)]();}else{if('kEnMY'===_0x14470f(0x973)){const _0x24cbe3=$gameMap[_0x14470f(0x579)](_0xae1e2a,_0x757315)['filter'](_0x7eaaa=>_0x7eaaa[_0x14470f(0x184)]());return _0x24cbe3['length']>0x0;}else this[_0x14470f(0x204)][_0x14470f(0x9b9)]=this[_0x14470f(0x3c8)](),this['contents'][_0x14470f(0x65f)](_0x176e7a,_0x3624ff,_0x673291,_0x3a58ec,this['gaugeLineHeight'](),'left');}},VisuMZ['CoreEngine'][_0xa0779(0x8e3)]=Game_Interpreter['prototype'][_0xa0779(0x7ec)],Game_Interpreter['prototype'][_0xa0779(0x7ec)]=function(_0x138875){const _0x3e61de=_0xa0779,_0xb2bee8=this['getCombinedScrollingText']();return _0xb2bee8[_0x3e61de(0x758)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x3e61de(0x478)](_0xb2bee8):VisuMZ[_0x3e61de(0x824)][_0x3e61de(0x8e3)][_0x3e61de(0x398)](this,_0x138875);},Game_Interpreter['prototype'][_0xa0779(0x6b2)]=function(){const _0xebef5f=_0xa0779;let _0x2168fa='',_0x36057b=this[_0xebef5f(0x1e4)]+0x1;while(this['_list'][_0x36057b]&&this[_0xebef5f(0x815)][_0x36057b][_0xebef5f(0x679)]===0x195){_0x2168fa+=this[_0xebef5f(0x815)][_0x36057b][_0xebef5f(0x89e)][0x0]+'\x0a',_0x36057b++;}return _0x2168fa;},Game_Interpreter[_0xa0779(0x271)][_0xa0779(0x478)]=function(_0x4955b7){const _0x4391cc=_0xa0779;try{eval(_0x4955b7);}catch(_0x200360){$gameTemp['isPlaytest']()&&(console[_0x4391cc(0x47c)](_0x4391cc(0x8e6)),console[_0x4391cc(0x47c)](_0x200360));}return!![];},VisuMZ[_0xa0779(0x824)][_0xa0779(0x380)]=Game_Interpreter['prototype'][_0xa0779(0x79d)],Game_Interpreter[_0xa0779(0x271)][_0xa0779(0x79d)]=function(_0x1111ab){const _0x17e494=_0xa0779;try{VisuMZ['CoreEngine'][_0x17e494(0x380)][_0x17e494(0x398)](this,_0x1111ab);}catch(_0x254c93){$gameTemp[_0x17e494(0x6bb)]()&&(console['log'](_0x17e494(0x9a7)),console[_0x17e494(0x47c)](_0x254c93)),this[_0x17e494(0x1ca)]();}return!![];},VisuMZ['CoreEngine'][_0xa0779(0x413)]=Game_Interpreter[_0xa0779(0x271)][_0xa0779(0x3c4)],Game_Interpreter[_0xa0779(0x271)]['command122']=function(_0x3e86e8){const _0x2c8fc6=_0xa0779;try{VisuMZ[_0x2c8fc6(0x824)][_0x2c8fc6(0x413)][_0x2c8fc6(0x398)](this,_0x3e86e8);}catch(_0x5c5550){if($gameTemp[_0x2c8fc6(0x6bb)]()){if(_0x2c8fc6(0x9bf)===_0x2c8fc6(0x9bf))console[_0x2c8fc6(0x47c)]('Control\x20Variables\x20Script\x20Error'),console[_0x2c8fc6(0x47c)](_0x5c5550);else{const _0x17289c=_0x487dcf[_0x2c8fc6(0x3c3)]();return _0x17289c===_0x2c8fc6(0x27e)?this[_0x2c8fc6(0x5e5)](_0x54f61f):this[_0x2c8fc6(0x46c)](_0x17289c,_0x5371a2);}}}return!![];},VisuMZ[_0xa0779(0x824)][_0xa0779(0x28d)]=Game_Interpreter[_0xa0779(0x271)][_0xa0779(0x774)],Game_Interpreter[_0xa0779(0x271)][_0xa0779(0x774)]=function(){const _0x47d39e=_0xa0779;try{VisuMZ[_0x47d39e(0x824)][_0x47d39e(0x28d)][_0x47d39e(0x398)](this);}catch(_0x4392ff){$gameTemp[_0x47d39e(0x6bb)]()&&(_0x47d39e(0x962)!==_0x47d39e(0x962)?_0xb8397f+=_0x4f6814/0x2:(console[_0x47d39e(0x47c)](_0x47d39e(0x2d0)),console[_0x47d39e(0x47c)](_0x4392ff)));}return!![];},VisuMZ[_0xa0779(0x824)][_0xa0779(0x476)]=Game_Interpreter['prototype'][_0xa0779(0x619)],Game_Interpreter[_0xa0779(0x271)]['command357']=function(_0x473c7a){const _0xd088a4=_0xa0779;return $gameTemp[_0xd088a4(0x893)](this),VisuMZ['CoreEngine'][_0xd088a4(0x476)]['call'](this,_0x473c7a);},Scene_Base[_0xa0779(0x271)]['fadeSpeed']=function(){const _0x5be8d4=_0xa0779;return VisuMZ[_0x5be8d4(0x824)][_0x5be8d4(0x17f)]['UI'][_0x5be8d4(0x701)];},Scene_Base[_0xa0779(0x271)][_0xa0779(0x694)]=function(){const _0x508b85=_0xa0779;return VisuMZ[_0x508b85(0x824)][_0x508b85(0x17f)]['UI'][_0x508b85(0x383)];},Scene_Base['prototype'][_0xa0779(0x861)]=function(){const _0x336876=_0xa0779;return VisuMZ[_0x336876(0x824)][_0x336876(0x17f)]['UI'][_0x336876(0x866)];},Scene_Base[_0xa0779(0x271)][_0xa0779(0x7af)]=function(){const _0xec5792=_0xa0779;return VisuMZ[_0xec5792(0x824)][_0xec5792(0x17f)]['UI'][_0xec5792(0x8df)];},Scene_Base['prototype'][_0xa0779(0x996)]=function(){const _0x484714=_0xa0779;return VisuMZ[_0x484714(0x824)][_0x484714(0x17f)]['UI'][_0x484714(0x32c)];},Scene_Base[_0xa0779(0x271)][_0xa0779(0x28c)]=function(){const _0x5d7c34=_0xa0779;return VisuMZ[_0x5d7c34(0x824)][_0x5d7c34(0x17f)]['UI'][_0x5d7c34(0x7f2)];},Scene_Base[_0xa0779(0x271)][_0xa0779(0x954)]=function(){const _0x2b1aab=_0xa0779;return VisuMZ[_0x2b1aab(0x824)][_0x2b1aab(0x17f)][_0x2b1aab(0x1ce)][_0x2b1aab(0x7ee)];},VisuMZ[_0xa0779(0x824)]['Scene_Base_createWindowLayer']=Scene_Base['prototype']['createWindowLayer'],Scene_Base[_0xa0779(0x271)][_0xa0779(0x987)]=function(){const _0x2afb46=_0xa0779;VisuMZ[_0x2afb46(0x824)]['Scene_Base_createWindowLayer'][_0x2afb46(0x398)](this),this[_0x2afb46(0x3c9)](),this[_0x2afb46(0x775)]['x']=Math[_0x2afb46(0x4ee)](this[_0x2afb46(0x775)]['x']),this[_0x2afb46(0x775)]['y']=Math[_0x2afb46(0x4ee)](this[_0x2afb46(0x775)]['y']);},Scene_Base[_0xa0779(0x271)][_0xa0779(0x3c9)]=function(){},Scene_Base[_0xa0779(0x271)]['buttonAssistKey1']=function(){const _0x4ed7e5=_0xa0779;return TextManager['getInputMultiButtonStrings'](_0x4ed7e5(0x89c),'pagedown');},Scene_Base[_0xa0779(0x271)]['buttonAssistKey2']=function(){const _0x342e7c=_0xa0779;return TextManager[_0x342e7c(0x170)](_0x342e7c(0x796));},Scene_Base[_0xa0779(0x271)][_0xa0779(0x189)]=function(){const _0x4d3421=_0xa0779;return TextManager[_0x4d3421(0x170)](_0x4d3421(0x41f));},Scene_Base[_0xa0779(0x271)][_0xa0779(0x791)]=function(){const _0x271839=_0xa0779;return TextManager[_0x271839(0x170)]('ok');},Scene_Base[_0xa0779(0x271)][_0xa0779(0x9a8)]=function(){const _0x4770aa=_0xa0779;return TextManager['getInputButtonString'](_0x4770aa(0x4d2));},Scene_Base[_0xa0779(0x271)][_0xa0779(0x94d)]=function(){const _0xc99493=_0xa0779;return this[_0xc99493(0x692)]&&this['_pageupButton'][_0xc99493(0x939)]?TextManager[_0xc99493(0x487)]:'';},Scene_Base['prototype'][_0xa0779(0x787)]=function(){return'';},Scene_Base[_0xa0779(0x271)]['buttonAssistText3']=function(){return'';},Scene_Base[_0xa0779(0x271)]['buttonAssistText4']=function(){const _0x249865=_0xa0779;return TextManager[_0x249865(0x25e)];},Scene_Base[_0xa0779(0x271)][_0xa0779(0x7cf)]=function(){const _0x2d004b=_0xa0779;return TextManager[_0x2d004b(0x1a3)];},Scene_Base['prototype'][_0xa0779(0x3e0)]=function(){return 0x0;},Scene_Base[_0xa0779(0x271)][_0xa0779(0x825)]=function(){return 0x0;},Scene_Base[_0xa0779(0x271)]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base[_0xa0779(0x271)][_0xa0779(0x75b)]=function(){return 0x0;},Scene_Base[_0xa0779(0x271)][_0xa0779(0x5ac)]=function(){return 0x0;},VisuMZ[_0xa0779(0x824)]['Scene_Boot_loadSystemImages']=Scene_Boot[_0xa0779(0x271)][_0xa0779(0x421)],Scene_Boot[_0xa0779(0x271)][_0xa0779(0x421)]=function(){const _0x39fca9=_0xa0779;VisuMZ['CoreEngine'][_0x39fca9(0x1c5)][_0x39fca9(0x398)](this),this[_0x39fca9(0x6d2)]();},Scene_Boot[_0xa0779(0x271)][_0xa0779(0x6d2)]=function(){const _0x59fae4=_0xa0779,_0x2ad968=[_0x59fae4(0x745),_0x59fae4(0x3fd),_0x59fae4(0x385),_0x59fae4(0x447),_0x59fae4(0x1b3),_0x59fae4(0x902),_0x59fae4(0x871),'pictures',_0x59fae4(0x320),_0x59fae4(0x96d),_0x59fae4(0x441),'tilesets',_0x59fae4(0x92c),'titles2'];for(const _0x52efc7 of _0x2ad968){const _0x3713dd=VisuMZ[_0x59fae4(0x824)][_0x59fae4(0x17f)][_0x59fae4(0x52b)][_0x52efc7],_0x63a9=_0x59fae4(0x4d0)[_0x59fae4(0x6ad)](_0x52efc7);for(const _0xb92eb4 of _0x3713dd){ImageManager[_0x59fae4(0x95e)](_0x63a9,_0xb92eb4);}}},VisuMZ[_0xa0779(0x824)]['Scene_Boot_startNormalGame']=Scene_Boot['prototype'][_0xa0779(0x4ed)],Scene_Boot[_0xa0779(0x271)][_0xa0779(0x4ed)]=function(){const _0x1ee188=_0xa0779;Utils[_0x1ee188(0x41b)](_0x1ee188(0x2ae))&&VisuMZ['CoreEngine'][_0x1ee188(0x17f)][_0x1ee188(0x2b0)][_0x1ee188(0x68e)]?this[_0x1ee188(0x75e)]():_0x1ee188(0x8f5)!==_0x1ee188(0x62c)?VisuMZ[_0x1ee188(0x824)][_0x1ee188(0x39a)][_0x1ee188(0x398)](this):_0x52943c['CoreEngine'][_0x1ee188(0x80a)]['call'](this);},Scene_Boot['prototype'][_0xa0779(0x75e)]=function(){const _0x32f6b0=_0xa0779;DataManager[_0x32f6b0(0x535)](),SceneManager[_0x32f6b0(0x641)](Scene_Map);},Scene_Boot[_0xa0779(0x271)][_0xa0779(0x4f0)]=function(){const _0x1b07cf=_0xa0779,_0x4fe6be=$dataSystem['advanced'][_0x1b07cf(0x8f1)],_0x31d017=$dataSystem[_0x1b07cf(0x47d)]['uiAreaHeight'],_0x1365f5=VisuMZ[_0x1b07cf(0x824)]['Settings']['UI']['BoxMargin'];Graphics[_0x1b07cf(0x66f)]=_0x4fe6be-_0x1365f5*0x2,Graphics[_0x1b07cf(0x2f3)]=_0x31d017-_0x1365f5*0x2,this[_0x1b07cf(0x6df)]();},VisuMZ['CoreEngine']['Scene_Boot_updateDocumentTitle']=Scene_Boot['prototype'][_0xa0779(0x5fa)],Scene_Boot['prototype']['updateDocumentTitle']=function(){const _0x14894b=_0xa0779;this['isFullDocumentTitle']()?this[_0x14894b(0x990)]():_0x14894b(0x4df)==='UMGHU'?VisuMZ[_0x14894b(0x824)][_0x14894b(0x59c)][_0x14894b(0x398)](this):(this['_x']=this[_0x14894b(0x597)],this['_y']=this[_0x14894b(0x60c)],this['_scaleX']=this[_0x14894b(0x209)],this['_scaleY']=this[_0x14894b(0x8d8)],this[_0x14894b(0x680)]=this[_0x14894b(0x71c)],this[_0x14894b(0x8a6)]&&(this[_0x14894b(0x8a6)]['x']=this['_targetAnchor']['x'],this[_0x14894b(0x8a6)]['y']=this['_targetAnchor']['y']));},Scene_Boot[_0xa0779(0x271)][_0xa0779(0x412)]=function(){const _0x169d53=_0xa0779;if(Scene_Title[_0x169d53(0x47f)]==='')return![];if(Scene_Title[_0x169d53(0x47f)]==='Subtitle')return![];if(Scene_Title[_0x169d53(0x458)]==='')return![];if(Scene_Title[_0x169d53(0x458)]===_0x169d53(0x887))return![];return!![];},Scene_Boot[_0xa0779(0x271)][_0xa0779(0x990)]=function(){const _0x5d9503=_0xa0779,_0x3216f9=$dataSystem['gameTitle'],_0x12ffac=Scene_Title[_0x5d9503(0x47f)]||'',_0x5c9611=Scene_Title['version']||'',_0x2805ee=VisuMZ[_0x5d9503(0x824)][_0x5d9503(0x17f)][_0x5d9503(0x250)]['Title'][_0x5d9503(0x3ac)],_0x38c129=_0x2805ee['format'](_0x3216f9,_0x12ffac,_0x5c9611);document[_0x5d9503(0x449)]=_0x38c129;},Scene_Boot[_0xa0779(0x271)][_0xa0779(0x6df)]=function(){const _0x24171a=_0xa0779;if(VisuMZ[_0x24171a(0x824)]['Settings']['UI'][_0x24171a(0x811)]){const _0x51caf6=Graphics[_0x24171a(0x3c5)]-Graphics[_0x24171a(0x66f)]-VisuMZ['CoreEngine'][_0x24171a(0x17f)]['UI'][_0x24171a(0x62f)]*0x2,_0x5f1078=Sprite_Button[_0x24171a(0x271)]['blockWidth'][_0x24171a(0x398)](this)*0x4;if(_0x51caf6>=_0x5f1078)SceneManager[_0x24171a(0x8cd)](!![]);}},Scene_Title['subtitle']=VisuMZ['CoreEngine'][_0xa0779(0x17f)][_0xa0779(0x250)][_0xa0779(0x3ea)][_0xa0779(0x76f)],Scene_Title[_0xa0779(0x458)]=VisuMZ[_0xa0779(0x824)]['Settings'][_0xa0779(0x250)][_0xa0779(0x3ea)][_0xa0779(0x253)],Scene_Title[_0xa0779(0x6e4)]=VisuMZ[_0xa0779(0x824)]['Settings'][_0xa0779(0x505)],VisuMZ[_0xa0779(0x824)][_0xa0779(0x254)]=Scene_Title['prototype']['drawGameTitle'],Scene_Title[_0xa0779(0x271)]['drawGameTitle']=function(){const _0x25a5ba=_0xa0779;VisuMZ[_0x25a5ba(0x824)][_0x25a5ba(0x17f)][_0x25a5ba(0x250)]['Title'][_0x25a5ba(0x8c5)]['call'](this);if(Scene_Title['subtitle']!==''&&Scene_Title[_0x25a5ba(0x47f)]!==_0x25a5ba(0x76f))this['drawGameSubtitle']();if(Scene_Title['version']!==''&&Scene_Title[_0x25a5ba(0x458)]!==_0x25a5ba(0x887))this[_0x25a5ba(0x557)]();},Scene_Title['prototype'][_0xa0779(0x605)]=function(){const _0x2fbd81=_0xa0779;VisuMZ['CoreEngine'][_0x2fbd81(0x17f)][_0x2fbd81(0x250)]['Title'][_0x2fbd81(0x605)][_0x2fbd81(0x398)](this);},Scene_Title[_0xa0779(0x271)]['drawGameVersion']=function(){const _0x44bb54=_0xa0779;VisuMZ['CoreEngine'][_0x44bb54(0x17f)][_0x44bb54(0x250)][_0x44bb54(0x3ea)][_0x44bb54(0x557)][_0x44bb54(0x398)](this);},Scene_Title[_0xa0779(0x271)]['createCommandWindow']=function(){const _0x59f0fa=_0xa0779;this[_0x59f0fa(0x473)]();const _0x45ec9b=$dataSystem[_0x59f0fa(0x588)][_0x59f0fa(0x344)],_0x27f5b0=this[_0x59f0fa(0x598)]();this[_0x59f0fa(0x46e)]=new Window_TitleCommand(_0x27f5b0),this[_0x59f0fa(0x46e)][_0x59f0fa(0x21b)](_0x45ec9b);const _0xc3a3a5=this[_0x59f0fa(0x598)]();this[_0x59f0fa(0x46e)][_0x59f0fa(0x427)](_0xc3a3a5['x'],_0xc3a3a5['y'],_0xc3a3a5['width'],_0xc3a3a5[_0x59f0fa(0x7f6)]),this[_0x59f0fa(0x46e)]['createContents'](),this[_0x59f0fa(0x46e)]['refresh'](),this['_commandWindow'][_0x59f0fa(0x300)](),this[_0x59f0fa(0x5a7)](this['_commandWindow']);},Scene_Title[_0xa0779(0x271)][_0xa0779(0x65d)]=function(){const _0xdd15a4=_0xa0779;return this[_0xdd15a4(0x46e)]?this[_0xdd15a4(0x46e)][_0xdd15a4(0x1bb)]():VisuMZ[_0xdd15a4(0x824)][_0xdd15a4(0x17f)]['TitleCommandList'][_0xdd15a4(0x444)];},Scene_Title['prototype'][_0xa0779(0x598)]=function(){const _0x3e8db7=_0xa0779;return VisuMZ[_0x3e8db7(0x824)]['Settings'][_0x3e8db7(0x250)][_0x3e8db7(0x3ea)][_0x3e8db7(0x18e)][_0x3e8db7(0x398)](this);},Scene_Title['prototype'][_0xa0779(0x473)]=function(){const _0x4be485=_0xa0779;for(const _0x9d0b63 of Scene_Title[_0x4be485(0x6e4)]){const _0x286a97=new Sprite_TitlePictureButton(_0x9d0b63);this[_0x4be485(0x894)](_0x286a97);}},VisuMZ[_0xa0779(0x824)][_0xa0779(0x73a)]=Scene_Map[_0xa0779(0x271)]['initialize'],Scene_Map['prototype']['initialize']=function(){const _0x232832=_0xa0779;VisuMZ[_0x232832(0x824)]['Scene_Map_initialize'][_0x232832(0x398)](this),$gameTemp[_0x232832(0x5de)](),this[_0x232832(0x186)]();},VisuMZ['CoreEngine'][_0xa0779(0x926)]=Scene_Map[_0xa0779(0x271)]['updateMainMultiply'],Scene_Map[_0xa0779(0x271)][_0xa0779(0x43c)]=function(){const _0x255c50=_0xa0779;VisuMZ[_0x255c50(0x824)][_0x255c50(0x926)][_0x255c50(0x398)](this),$gameTemp['_playTestFastMode']&&!$gameMessage[_0x255c50(0x3e6)]()&&(this[_0x255c50(0x36d)](),SceneManager[_0x255c50(0x376)]());},Scene_Map[_0xa0779(0x271)]['terminate']=function(){const _0x50d1ed=_0xa0779;Scene_Message['prototype'][_0x50d1ed(0x5d6)]['call'](this),!SceneManager[_0x50d1ed(0x1a1)](Scene_Battle)&&(this[_0x50d1ed(0x1e1)][_0x50d1ed(0x6be)](),this[_0x50d1ed(0x6fb)][_0x50d1ed(0x966)](),this['_windowLayer'][_0x50d1ed(0x939)]=![],SceneManager[_0x50d1ed(0x6c7)]()),$gameScreen[_0x50d1ed(0x8ee)](),this['clearOnceParallelInterpreters']();},VisuMZ[_0xa0779(0x824)][_0xa0779(0x210)]=Scene_Map['prototype'][_0xa0779(0x394)],Scene_Map[_0xa0779(0x271)]['createMenuButton']=function(){const _0x1e56da=_0xa0779;VisuMZ['CoreEngine'][_0x1e56da(0x210)][_0x1e56da(0x398)](this),SceneManager['isSideButtonLayout']()&&('FqKee'!==_0x1e56da(0x45a)?this[_0x1e56da(0x303)]():_0x5358ec[_0x1e56da(0x409)]&&(this[_0x1e56da(0x655)]='OTB'));},Scene_Map['prototype'][_0xa0779(0x303)]=function(){const _0x1d0a33=_0xa0779;this[_0x1d0a33(0x60d)]['x']=Graphics[_0x1d0a33(0x66f)]+0x4;},VisuMZ[_0xa0779(0x824)][_0xa0779(0x3ca)]=Scene_Map[_0xa0779(0x271)]['updateScene'],Scene_Map[_0xa0779(0x271)][_0xa0779(0x319)]=function(){const _0x28a14b=_0xa0779;VisuMZ[_0x28a14b(0x824)]['Scene_Map_updateScene'][_0x28a14b(0x398)](this),this[_0x28a14b(0x74b)]();},Scene_Map['prototype']['updateDashToggle']=function(){const _0x1a1ff8=_0xa0779;Input[_0x1a1ff8(0x5ff)](_0x1a1ff8(0x26d))&&(_0x1a1ff8(0x8d9)===_0x1a1ff8(0x8d9)?(ConfigManager[_0x1a1ff8(0x44f)]=!ConfigManager[_0x1a1ff8(0x44f)],ConfigManager[_0x1a1ff8(0x21e)]()):_0x3cdb08[_0x1a1ff8(0x3a2)]['font-smooth']=_0x1a1ff8(0x19d));},VisuMZ[_0xa0779(0x824)][_0xa0779(0x295)]=Scene_Map['prototype'][_0xa0779(0x36d)],Scene_Map[_0xa0779(0x271)][_0xa0779(0x36d)]=function(){const _0x1eb555=_0xa0779;VisuMZ[_0x1eb555(0x824)][_0x1eb555(0x295)][_0x1eb555(0x398)](this),this[_0x1eb555(0x290)]();},Scene_Map['prototype'][_0xa0779(0x186)]=function(){const _0x4f14a6=_0xa0779;this[_0x4f14a6(0x507)]=[];},Scene_Map[_0xa0779(0x271)]['updateOnceParallelInterpreters']=function(){const _0x2d7c38=_0xa0779;if(!this[_0x2d7c38(0x507)])return;for(const _0x4c0e97 of this[_0x2d7c38(0x507)]){if(_0x4c0e97){if(_0x2d7c38(0x179)!==_0x2d7c38(0x76c))_0x4c0e97[_0x2d7c38(0x6be)]();else return this[_0x2d7c38(0x71d)]();}}},Scene_Map[_0xa0779(0x271)][_0xa0779(0x97a)]=function(_0x5c0310){const _0x58d61b=_0xa0779,_0x2fde3a=$dataCommonEvents[_0x5c0310];if(!_0x2fde3a)return;const _0x1c7d68=new Game_OnceParallelInterpreter();this['addOnceParallelInterpreter'](_0x1c7d68),_0x1c7d68[_0x58d61b(0x78c)](_0x5c0310);},Scene_Map[_0xa0779(0x271)][_0xa0779(0x62b)]=function(_0x1faf5a){const _0x5b5a7d=_0xa0779;this[_0x5b5a7d(0x507)]=this[_0x5b5a7d(0x507)]||[],this[_0x5b5a7d(0x507)][_0x5b5a7d(0x55f)](_0x1faf5a);},Scene_Map[_0xa0779(0x271)][_0xa0779(0x84a)]=function(_0x319960){const _0x2c3f37=_0xa0779;this[_0x2c3f37(0x507)]=this[_0x2c3f37(0x507)]||[],this[_0x2c3f37(0x507)][_0x2c3f37(0x99c)](_0x319960);};function Game_OnceParallelInterpreter(){const _0x3a809e=_0xa0779;this[_0x3a809e(0x288)](...arguments);}Game_OnceParallelInterpreter['prototype']=Object['create'](Game_Interpreter['prototype']),Game_OnceParallelInterpreter[_0xa0779(0x271)][_0xa0779(0x8ec)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0xa0779(0x271)]['setCommonEvent']=function(_0x24e588){const _0x549630=_0xa0779,_0x53a4d3=$dataCommonEvents[_0x24e588];if(_0x53a4d3)_0x549630(0x293)!=='NVLWn'?this['setup'](_0x53a4d3[_0x549630(0x591)],0x0):(this['_screenY']+=_0x4fb3e1[_0x549630(0x4ee)]((_0x15395c[_0x549630(0x7f6)]-0x270)/0x2),this[_0x549630(0x690)]-=_0x1f29e3['floor']((_0x44cba7['height']-_0x161d96[_0x549630(0x2f3)])/0x2),_0x1258f5[_0x549630(0x6b0)]()?this[_0x549630(0x66e)]-=_0x50cf3c[_0x549630(0x256)]((_0x3d48ad[_0x549630(0x3c5)]-_0x4c40b9[_0x549630(0x66f)])/0x2):this[_0x549630(0x66e)]+=_0x1ee6cd[_0x549630(0x4ee)]((_0x28c612[_0x549630(0x66f)]-0x330)/0x2));else{if('otSju'!==_0x549630(0x14d))return 0x0;else this[_0x549630(0x5d6)]();}},Game_OnceParallelInterpreter[_0xa0779(0x271)][_0xa0779(0x5d6)]=function(){const _0x1c2227=_0xa0779;if(!SceneManager[_0x1c2227(0x9aa)]())return;SceneManager[_0x1c2227(0x6a6)][_0x1c2227(0x84a)](this),Game_Interpreter[_0x1c2227(0x271)]['terminate'][_0x1c2227(0x398)](this);},VisuMZ[_0xa0779(0x824)][_0xa0779(0x765)]=Scene_MenuBase[_0xa0779(0x271)]['helpAreaTop'],Scene_MenuBase['prototype'][_0xa0779(0x341)]=function(){const _0x560145=_0xa0779;let _0x18e92e=0x0;if(SceneManager[_0x560145(0x6bc)]()){if(_0x560145(0x194)!=='aIeJs')_0x18e92e=this[_0x560145(0x89d)]();else{const _0x10e541=new _0x36848c[(_0x560145(0x358))]();_0x10e541[_0x560145(0x8da)](0x800,0x800),_0xe01399[_0x560145(0x824)][_0x560145(0x17f)]['QoL'][_0x560145(0x8c9)]&&(_0x10e541['scaleMode']=_0x91e43f[_0x560145(0x53e)]['NEAREST']),this[_0x560145(0x3dd)][_0x560145(0x55f)](_0x10e541);}}else _0x18e92e=VisuMZ['CoreEngine'][_0x560145(0x765)]['call'](this);return _0x18e92e;},Scene_MenuBase[_0xa0779(0x271)]['helpAreaTopSideButtonLayout']=function(){const _0x5ef0b9=_0xa0779;if(this[_0x5ef0b9(0x694)]())return this['mainAreaBottom']();else{if(_0x5ef0b9(0x917)===_0x5ef0b9(0x739))this[_0x5ef0b9(0x784)]();else return 0x0;}},VisuMZ['CoreEngine'][_0xa0779(0x3f8)]=Scene_MenuBase['prototype'][_0xa0779(0x751)],Scene_MenuBase[_0xa0779(0x271)][_0xa0779(0x751)]=function(){const _0x1efb67=_0xa0779;return SceneManager[_0x1efb67(0x6bc)]()?this['mainAreaTopSideButtonLayout']():VisuMZ[_0x1efb67(0x824)]['Scene_MenuBase_mainAreaTop'][_0x1efb67(0x398)](this);},Scene_MenuBase['prototype'][_0xa0779(0x335)]=function(){const _0x1d4f9b=_0xa0779;if(!this[_0x1d4f9b(0x694)]()){if(_0x1d4f9b(0x74c)===_0x1d4f9b(0x315))_0x399c31['keyMapper'][0x52]=_0x1d4f9b(0x26d);else return this['helpAreaBottom']();}else return this['isMenuButtonAssistEnabled']()&&this[_0x1d4f9b(0x7fd)]()===_0x1d4f9b(0x9ef)?Window_ButtonAssist[_0x1d4f9b(0x271)][_0x1d4f9b(0x981)]():0x0;},VisuMZ[_0xa0779(0x824)][_0xa0779(0x731)]=Scene_MenuBase['prototype'][_0xa0779(0x77e)],Scene_MenuBase[_0xa0779(0x271)][_0xa0779(0x77e)]=function(){const _0x585439=_0xa0779;let _0x5f015a=0x0;if(SceneManager[_0x585439(0x6bc)]())_0x585439(0x919)===_0x585439(0x919)?_0x5f015a=this[_0x585439(0x64a)]():this[_0x585439(0x2bb)](_0x585439(0x366));else{if(_0x585439(0x96a)===_0x585439(0x96a))_0x5f015a=VisuMZ[_0x585439(0x824)][_0x585439(0x731)][_0x585439(0x398)](this);else return this[_0x585439(0x67a)]();}return this['isMenuButtonAssistEnabled']()&&this['getButtonAssistLocation']()!==_0x585439(0x347)&&(_0x5f015a-=Window_ButtonAssist[_0x585439(0x271)]['lineHeight']()),_0x5f015a;},Scene_MenuBase['prototype']['mainAreaHeightSideButtonLayout']=function(){const _0x916761=_0xa0779;return Graphics[_0x916761(0x2f3)]-this[_0x916761(0x82e)]();},VisuMZ[_0xa0779(0x824)][_0xa0779(0x4a9)]=Scene_MenuBase[_0xa0779(0x271)][_0xa0779(0x786)],Scene_MenuBase[_0xa0779(0x271)]['createBackground']=function(){const _0x5dc7f1=_0xa0779;this[_0x5dc7f1(0x5a0)]=new PIXI[(_0x5dc7f1(0x7f0))][(_0x5dc7f1(0x857))](clamp=!![]),this[_0x5dc7f1(0x760)]=new Sprite(),this[_0x5dc7f1(0x760)][_0x5dc7f1(0x346)]=SceneManager[_0x5dc7f1(0x7b5)](),this[_0x5dc7f1(0x760)][_0x5dc7f1(0x7f0)]=[this[_0x5dc7f1(0x5a0)]],this[_0x5dc7f1(0x894)](this[_0x5dc7f1(0x760)]),this[_0x5dc7f1(0x564)](0xc0),this[_0x5dc7f1(0x564)](this[_0x5dc7f1(0x9df)]()),this[_0x5dc7f1(0x589)]();},Scene_MenuBase[_0xa0779(0x271)][_0xa0779(0x9df)]=function(){const _0x27deac=_0xa0779,_0x2a97a3=String(this[_0x27deac(0x8ec)][_0x27deac(0x912)]),_0x552412=this[_0x27deac(0x570)](_0x2a97a3);if(_0x552412){if(_0x27deac(0x75f)!=='xVYKU')return _0x552412[_0x27deac(0x4bf)];else _0x4eab84['moveRelativeToResolutionChange']();}else{if('XsQBz'!==_0x27deac(0x77b))return 0xc0;else{const _0x2f06cb={'targets':_0x3e4c81,'animationId':_0x2c46aa,'mirror':_0x40820b,'mute':_0x2afbc0};this['_fauxAnimationQueue'][_0x27deac(0x55f)](_0x2f06cb);for(const _0x224fb2 of _0xdfb73e){_0x224fb2['startAnimation']&&_0x224fb2[_0x27deac(0x7c2)]();}}}},Scene_MenuBase['prototype'][_0xa0779(0x589)]=function(){const _0x41c3d2=_0xa0779,_0x4556a6=String(this[_0x41c3d2(0x8ec)]['name']),_0x5c7748=this['getCustomBackgroundSettings'](_0x4556a6);_0x5c7748&&(_0x5c7748['BgFilename1']!==''||_0x5c7748[_0x41c3d2(0x464)]!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x41c3d2(0x216)](_0x5c7748[_0x41c3d2(0x455)])),this[_0x41c3d2(0x532)]=new Sprite(ImageManager[_0x41c3d2(0x853)](_0x5c7748[_0x41c3d2(0x464)])),this[_0x41c3d2(0x894)](this[_0x41c3d2(0x45f)]),this[_0x41c3d2(0x894)](this[_0x41c3d2(0x532)]),this['_backSprite1'][_0x41c3d2(0x346)][_0x41c3d2(0x543)](this[_0x41c3d2(0x870)][_0x41c3d2(0x30a)](this,this[_0x41c3d2(0x45f)])),this[_0x41c3d2(0x532)][_0x41c3d2(0x346)][_0x41c3d2(0x543)](this['adjustSprite'][_0x41c3d2(0x30a)](this,this[_0x41c3d2(0x532)])));},Scene_MenuBase[_0xa0779(0x271)][_0xa0779(0x570)]=function(_0x1e87cb){const _0x108493=_0xa0779;return VisuMZ[_0x108493(0x824)][_0x108493(0x17f)][_0x108493(0x57a)][_0x1e87cb]||VisuMZ['CoreEngine'][_0x108493(0x17f)][_0x108493(0x57a)][_0x108493(0x706)];},Scene_MenuBase[_0xa0779(0x271)]['adjustSprite']=function(_0xd3665c){const _0x2db3b4=_0xa0779;this[_0x2db3b4(0x659)](_0xd3665c),this[_0x2db3b4(0x16a)](_0xd3665c);},VisuMZ['CoreEngine']['Scene_MenuBase_createCancelButton']=Scene_MenuBase[_0xa0779(0x271)][_0xa0779(0x151)],Scene_MenuBase[_0xa0779(0x271)][_0xa0779(0x151)]=function(){const _0x1090de=_0xa0779;VisuMZ[_0x1090de(0x824)][_0x1090de(0x545)][_0x1090de(0x398)](this),SceneManager[_0x1090de(0x164)]()&&this['moveCancelButtonSideButtonLayout']();},Scene_MenuBase[_0xa0779(0x271)][_0xa0779(0x62e)]=function(){this['_cancelButton']['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0xa0779(0x824)]['Scene_MenuBase_createPageButtons']=Scene_MenuBase[_0xa0779(0x271)][_0xa0779(0x7a6)],Scene_MenuBase[_0xa0779(0x271)][_0xa0779(0x7a6)]=function(){const _0x18e21d=_0xa0779;VisuMZ[_0x18e21d(0x824)][_0x18e21d(0x931)][_0x18e21d(0x398)](this),SceneManager['isSideButtonLayout']()&&this['movePageButtonSideButtonLayout']();},Scene_MenuBase[_0xa0779(0x271)][_0xa0779(0x968)]=function(){const _0x2c495a=_0xa0779;this[_0x2c495a(0x692)]['x']=-0x1*(this[_0x2c495a(0x692)]['width']+this[_0x2c495a(0x82d)]['width']+0x8),this[_0x2c495a(0x82d)]['x']=-0x1*(this[_0x2c495a(0x82d)][_0x2c495a(0x3c5)]+0x4);},Scene_MenuBase[_0xa0779(0x271)][_0xa0779(0x467)]=function(){const _0x22a944=_0xa0779;return VisuMZ[_0x22a944(0x824)]['Settings']['ButtonAssist'][_0x22a944(0x4aa)];},Scene_MenuBase[_0xa0779(0x271)][_0xa0779(0x7fd)]=function(){const _0x3a6cf9=_0xa0779;if(SceneManager[_0x3a6cf9(0x164)]()||SceneManager[_0x3a6cf9(0x85f)]()){if(_0x3a6cf9(0x240)!==_0x3a6cf9(0x8b5))return VisuMZ[_0x3a6cf9(0x824)][_0x3a6cf9(0x17f)][_0x3a6cf9(0x2c3)][_0x3a6cf9(0x65e)];else{_0x8c1b7f[_0x3a6cf9(0x824)][_0x3a6cf9(0x17f)]['MenuLayout']['Title'][_0x3a6cf9(0x8c5)][_0x3a6cf9(0x398)](this);if(_0x29e3ac['subtitle']!==''&&_0x2b3d16[_0x3a6cf9(0x47f)]!==_0x3a6cf9(0x76f))this[_0x3a6cf9(0x605)]();if(_0x52637b[_0x3a6cf9(0x458)]!==''&&_0x399776['version']!==_0x3a6cf9(0x887))this[_0x3a6cf9(0x557)]();}}else return _0x3a6cf9(0x347);},Scene_MenuBase['prototype'][_0xa0779(0x3c9)]=function(){const _0x3a1bd6=_0xa0779;if(!this[_0x3a1bd6(0x467)]())return;const _0x4aadf5=this[_0x3a1bd6(0x606)]();this[_0x3a1bd6(0x4f4)]=new Window_ButtonAssist(_0x4aadf5),this['addWindow'](this['_buttonAssistWindow']);},Scene_MenuBase['prototype'][_0xa0779(0x606)]=function(){const _0xcdf95b=_0xa0779;if(this[_0xcdf95b(0x7fd)]()===_0xcdf95b(0x347))return this['buttonAssistWindowButtonRect']();else{if(_0xcdf95b(0x36c)===_0xcdf95b(0x45d)){const _0x98015a=_0xcdf95b(0x338);this[_0xcdf95b(0x97b)]=this[_0xcdf95b(0x97b)]||{};if(this[_0xcdf95b(0x97b)][_0x98015a])return this[_0xcdf95b(0x97b)][_0x98015a];const _0x49e2ab=_0x123fd1['CoreEngine']['Settings'][_0xcdf95b(0x6b1)][_0xcdf95b(0x2bf)];return this[_0xcdf95b(0x8a2)](_0x98015a,_0x49e2ab);}else return this[_0xcdf95b(0x977)]();}},Scene_MenuBase[_0xa0779(0x271)]['buttonAssistWindowButtonRect']=function(){const _0x527cb5=_0xa0779,_0x50c267=ConfigManager[_0x527cb5(0x78b)]?(Sprite_Button[_0x527cb5(0x271)][_0x527cb5(0x7fe)]()+0x6)*0x2:0x0,_0x344c36=this['buttonY'](),_0x198dcb=Graphics['boxWidth']-_0x50c267*0x2,_0x30a68d=this[_0x527cb5(0x28c)]();return new Rectangle(_0x50c267,_0x344c36,_0x198dcb,_0x30a68d);},Scene_MenuBase[_0xa0779(0x271)][_0xa0779(0x977)]=function(){const _0x1c6786=_0xa0779,_0x2e4dec=Graphics['boxWidth'],_0x3f98e4=Window_ButtonAssist[_0x1c6786(0x271)]['lineHeight'](),_0x299567=0x0;let _0x3226d6=0x0;if(this['getButtonAssistLocation']()===_0x1c6786(0x9ef))_0x3226d6=0x0;else{if(_0x1c6786(0x988)!==_0x1c6786(0x988)){_0x11d989[_0x1c6786(0x824)]['ParseClassNotetags']['call'](this,_0x409f7e);if(_0x33a88e['learnings'])for(const _0x59208c of _0x2b67fa[_0x1c6786(0x1c4)]){_0x59208c[_0x1c6786(0x5aa)][_0x1c6786(0x758)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x59208c[_0x1c6786(0x7ff)]=_0x5c2641[_0x1c6786(0x274)](_0x47d13c(_0x150979['$1']),0x1));}}else _0x3226d6=Graphics['boxHeight']-_0x3f98e4;}return new Rectangle(_0x299567,_0x3226d6,_0x2e4dec,_0x3f98e4);},Scene_Menu[_0xa0779(0x1ab)]=VisuMZ[_0xa0779(0x824)][_0xa0779(0x17f)][_0xa0779(0x250)][_0xa0779(0x38a)],VisuMZ[_0xa0779(0x824)]['Scene_Menu_create']=Scene_Menu[_0xa0779(0x271)][_0xa0779(0x208)],Scene_Menu['prototype'][_0xa0779(0x208)]=function(){const _0xd4b095=_0xa0779;VisuMZ['CoreEngine'][_0xd4b095(0x497)]['call'](this),this[_0xd4b095(0x776)]();},Scene_Menu[_0xa0779(0x271)]['setCoreEngineUpdateWindowBg']=function(){const _0x5b2e6c=_0xa0779;this[_0x5b2e6c(0x46e)]&&this[_0x5b2e6c(0x46e)][_0x5b2e6c(0x21b)](Scene_Menu[_0x5b2e6c(0x1ab)][_0x5b2e6c(0x757)]),this[_0x5b2e6c(0x5b3)]&&this[_0x5b2e6c(0x5b3)][_0x5b2e6c(0x21b)](Scene_Menu[_0x5b2e6c(0x1ab)][_0x5b2e6c(0x725)]),this['_statusWindow']&&this[_0x5b2e6c(0x387)][_0x5b2e6c(0x21b)](Scene_Menu['layoutSettings'][_0x5b2e6c(0x294)]);},Scene_Menu[_0xa0779(0x271)][_0xa0779(0x598)]=function(){const _0x50f724=_0xa0779;return Scene_Menu[_0x50f724(0x1ab)][_0x50f724(0x18e)][_0x50f724(0x398)](this);},Scene_Menu[_0xa0779(0x271)][_0xa0779(0x3bd)]=function(){const _0x1403ef=_0xa0779;return Scene_Menu[_0x1403ef(0x1ab)]['GoldRect']['call'](this);},Scene_Menu[_0xa0779(0x271)][_0xa0779(0x6e3)]=function(){const _0x55da9=_0xa0779;return Scene_Menu[_0x55da9(0x1ab)][_0x55da9(0x31c)]['call'](this);},Scene_Item[_0xa0779(0x1ab)]=VisuMZ['CoreEngine'][_0xa0779(0x17f)][_0xa0779(0x250)]['ItemMenu'],VisuMZ['CoreEngine']['Scene_Item_create']=Scene_Item[_0xa0779(0x271)][_0xa0779(0x208)],Scene_Item[_0xa0779(0x271)][_0xa0779(0x208)]=function(){const _0x8c8dd1=_0xa0779;VisuMZ[_0x8c8dd1(0x824)][_0x8c8dd1(0x8ad)][_0x8c8dd1(0x398)](this),this[_0x8c8dd1(0x776)]();},Scene_Item[_0xa0779(0x271)][_0xa0779(0x776)]=function(){const _0x4040aa=_0xa0779;this[_0x4040aa(0x65c)]&&this[_0x4040aa(0x65c)][_0x4040aa(0x21b)](Scene_Item[_0x4040aa(0x1ab)][_0x4040aa(0x22e)]),this[_0x4040aa(0x85d)]&&this['_categoryWindow'][_0x4040aa(0x21b)](Scene_Item[_0x4040aa(0x1ab)]['CategoryBgType']),this['_itemWindow']&&this[_0x4040aa(0x582)][_0x4040aa(0x21b)](Scene_Item['layoutSettings']['ItemBgType']),this[_0x4040aa(0x77f)]&&this[_0x4040aa(0x77f)][_0x4040aa(0x21b)](Scene_Item[_0x4040aa(0x1ab)][_0x4040aa(0x289)]);},Scene_Item[_0xa0779(0x271)]['helpWindowRect']=function(){const _0x1bb163=_0xa0779;return Scene_Item[_0x1bb163(0x1ab)]['HelpRect'][_0x1bb163(0x398)](this);},Scene_Item['prototype'][_0xa0779(0x1e8)]=function(){const _0x434984=_0xa0779;return Scene_Item['layoutSettings'][_0x434984(0x190)][_0x434984(0x398)](this);},Scene_Item[_0xa0779(0x271)][_0xa0779(0x243)]=function(){const _0x2ea23f=_0xa0779;return Scene_Item[_0x2ea23f(0x1ab)]['ItemRect'][_0x2ea23f(0x398)](this);},Scene_Item[_0xa0779(0x271)][_0xa0779(0x1ea)]=function(){const _0x42b8a0=_0xa0779;return Scene_Item[_0x42b8a0(0x1ab)][_0x42b8a0(0x81c)][_0x42b8a0(0x398)](this);},Scene_Skill[_0xa0779(0x1ab)]=VisuMZ['CoreEngine'][_0xa0779(0x17f)][_0xa0779(0x250)][_0xa0779(0x6ea)],VisuMZ[_0xa0779(0x824)][_0xa0779(0x3d3)]=Scene_Skill[_0xa0779(0x271)][_0xa0779(0x208)],Scene_Skill[_0xa0779(0x271)][_0xa0779(0x208)]=function(){const _0xb911b=_0xa0779;VisuMZ[_0xb911b(0x824)][_0xb911b(0x3d3)][_0xb911b(0x398)](this),this[_0xb911b(0x776)]();},Scene_Skill[_0xa0779(0x271)][_0xa0779(0x776)]=function(){const _0x517dee=_0xa0779;if(this['_helpWindow']){if(_0x517dee(0x361)!==_0x517dee(0x844))this[_0x517dee(0x65c)][_0x517dee(0x21b)](Scene_Skill[_0x517dee(0x1ab)][_0x517dee(0x22e)]);else{_0x160e23['endAnimation']&&_0x2ea977['endAnimation']();const _0xd94c19=this[_0x517dee(0x587)]();if(_0xd94c19)_0xd94c19['removeChild'](_0x20e9ca);}}this[_0x517dee(0x95d)]&&this[_0x517dee(0x95d)][_0x517dee(0x21b)](Scene_Skill['layoutSettings']['SkillTypeBgType']);if(this[_0x517dee(0x387)]){if(_0x517dee(0x795)===_0x517dee(0x29d))return _0x3b03ce=_0x2e1ad5(_0x21c7a5),this['_colorCache']=this[_0x517dee(0x97b)]||{},_0x12bd5b['match'](/#(.*)/i)?this[_0x517dee(0x97b)][_0x3fcf24]=_0x517dee(0x2aa)[_0x517dee(0x6ad)](_0x10bd9d(_0x12c00e['$1'])):this[_0x517dee(0x97b)][_0x2580d5]=this[_0x517dee(0x452)](_0xf8f435(_0x166930)),this[_0x517dee(0x97b)][_0x1844b0];else this[_0x517dee(0x387)][_0x517dee(0x21b)](Scene_Skill[_0x517dee(0x1ab)][_0x517dee(0x294)]);}this['_itemWindow']&&this[_0x517dee(0x582)]['setBackgroundType'](Scene_Skill[_0x517dee(0x1ab)][_0x517dee(0x610)]),this[_0x517dee(0x77f)]&&this[_0x517dee(0x77f)][_0x517dee(0x21b)](Scene_Skill[_0x517dee(0x1ab)][_0x517dee(0x289)]);},Scene_Skill[_0xa0779(0x271)][_0xa0779(0x626)]=function(){const _0x139ba2=_0xa0779;return Scene_Skill[_0x139ba2(0x1ab)][_0x139ba2(0x555)][_0x139ba2(0x398)](this);},Scene_Skill[_0xa0779(0x271)][_0xa0779(0x571)]=function(){const _0x48627a=_0xa0779;return Scene_Skill[_0x48627a(0x1ab)][_0x48627a(0x575)][_0x48627a(0x398)](this);},Scene_Skill[_0xa0779(0x271)]['statusWindowRect']=function(){const _0x359a21=_0xa0779;return Scene_Skill[_0x359a21(0x1ab)][_0x359a21(0x31c)][_0x359a21(0x398)](this);},Scene_Skill[_0xa0779(0x271)][_0xa0779(0x243)]=function(){const _0x541f5e=_0xa0779;return Scene_Skill[_0x541f5e(0x1ab)][_0x541f5e(0x979)][_0x541f5e(0x398)](this);},Scene_Skill['prototype']['actorWindowRect']=function(){const _0x5bd77c=_0xa0779;return Scene_Skill[_0x5bd77c(0x1ab)]['ActorRect'][_0x5bd77c(0x398)](this);},Scene_Equip['layoutSettings']=VisuMZ[_0xa0779(0x824)]['Settings']['MenuLayout'][_0xa0779(0x7fc)],VisuMZ[_0xa0779(0x824)][_0xa0779(0x98e)]=Scene_Equip[_0xa0779(0x271)][_0xa0779(0x208)],Scene_Equip['prototype']['create']=function(){const _0x5d404b=_0xa0779;VisuMZ['CoreEngine'][_0x5d404b(0x98e)]['call'](this),this[_0x5d404b(0x776)]();},Scene_Equip['prototype'][_0xa0779(0x776)]=function(){const _0x168e50=_0xa0779;this[_0x168e50(0x65c)]&&this[_0x168e50(0x65c)][_0x168e50(0x21b)](Scene_Equip[_0x168e50(0x1ab)][_0x168e50(0x22e)]),this[_0x168e50(0x387)]&&this['_statusWindow'][_0x168e50(0x21b)](Scene_Equip[_0x168e50(0x1ab)]['StatusBgType']),this[_0x168e50(0x46e)]&&this[_0x168e50(0x46e)][_0x168e50(0x21b)](Scene_Equip[_0x168e50(0x1ab)]['CommandBgType']),this[_0x168e50(0x830)]&&this[_0x168e50(0x830)][_0x168e50(0x21b)](Scene_Equip['layoutSettings'][_0x168e50(0x56f)]),this[_0x168e50(0x582)]&&this[_0x168e50(0x582)][_0x168e50(0x21b)](Scene_Equip[_0x168e50(0x1ab)][_0x168e50(0x610)]);},Scene_Equip[_0xa0779(0x271)][_0xa0779(0x626)]=function(){const _0x48b005=_0xa0779;return Scene_Equip[_0x48b005(0x1ab)][_0x48b005(0x555)]['call'](this);},Scene_Equip[_0xa0779(0x271)][_0xa0779(0x6e3)]=function(){const _0x1207b6=_0xa0779;return Scene_Equip[_0x1207b6(0x1ab)]['StatusRect']['call'](this);},Scene_Equip[_0xa0779(0x271)][_0xa0779(0x598)]=function(){const _0x46803b=_0xa0779;return Scene_Equip['layoutSettings']['CommandRect'][_0x46803b(0x398)](this);},Scene_Equip[_0xa0779(0x271)]['slotWindowRect']=function(){const _0x195d08=_0xa0779;return Scene_Equip[_0x195d08(0x1ab)][_0x195d08(0x4b4)][_0x195d08(0x398)](this);},Scene_Equip['prototype']['itemWindowRect']=function(){const _0x8a011c=_0xa0779;return Scene_Equip[_0x8a011c(0x1ab)][_0x8a011c(0x979)][_0x8a011c(0x398)](this);},Scene_Status['layoutSettings']=VisuMZ[_0xa0779(0x824)][_0xa0779(0x17f)][_0xa0779(0x250)][_0xa0779(0x994)],VisuMZ['CoreEngine']['Scene_Status_create']=Scene_Status['prototype'][_0xa0779(0x208)],Scene_Status['prototype'][_0xa0779(0x208)]=function(){const _0x7db4d=_0xa0779;VisuMZ[_0x7db4d(0x824)]['Scene_Status_create'][_0x7db4d(0x398)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Status[_0xa0779(0x271)][_0xa0779(0x776)]=function(){const _0x305f79=_0xa0779;this['_profileWindow']&&(_0x305f79(0x8cf)!=='mYUXI'?this[_0x305f79(0x55c)][_0x305f79(0x21b)](Scene_Status[_0x305f79(0x1ab)][_0x305f79(0x397)]):(_0x189b07[_0x305f79(0x47c)](_0x305f79(0x38e)),_0x312eba[_0x305f79(0x47c)](_0x263054)));if(this[_0x305f79(0x387)]){if('BzUZA'!==_0x305f79(0x414)){const _0x512d0c=this['itemSuccessRate'](_0x150bee),_0x52bd98=this[_0x305f79(0x688)](_0x51ebdc),_0x4768a5=this['targetEvaRate'](_0x4e595e);return _0x512d0c*(_0x52bd98-_0x4768a5);}else this[_0x305f79(0x387)][_0x305f79(0x21b)](Scene_Status[_0x305f79(0x1ab)]['StatusBgType']);}this['_statusParamsWindow']&&this[_0x305f79(0x6f8)][_0x305f79(0x21b)](Scene_Status[_0x305f79(0x1ab)][_0x305f79(0x1d1)]),this[_0x305f79(0x9f2)]&&this['_statusEquipWindow'][_0x305f79(0x21b)](Scene_Status[_0x305f79(0x1ab)][_0x305f79(0x521)]);},Scene_Status[_0xa0779(0x271)][_0xa0779(0x676)]=function(){const _0x2e190f=_0xa0779;return Scene_Status[_0x2e190f(0x1ab)][_0x2e190f(0x249)][_0x2e190f(0x398)](this);},Scene_Status[_0xa0779(0x271)]['statusWindowRect']=function(){const _0x36044d=_0xa0779;return Scene_Status['layoutSettings'][_0x36044d(0x31c)][_0x36044d(0x398)](this);},Scene_Status[_0xa0779(0x271)][_0xa0779(0x843)]=function(){const _0x2feb21=_0xa0779;return Scene_Status[_0x2feb21(0x1ab)]['StatusParamsRect'][_0x2feb21(0x398)](this);},Scene_Status[_0xa0779(0x271)][_0xa0779(0x28b)]=function(){const _0x22c8e1=_0xa0779;return Scene_Status[_0x22c8e1(0x1ab)][_0x22c8e1(0x4ce)][_0x22c8e1(0x398)](this);},Scene_Options[_0xa0779(0x1ab)]=VisuMZ[_0xa0779(0x824)][_0xa0779(0x17f)]['MenuLayout']['OptionsMenu'],VisuMZ[_0xa0779(0x824)][_0xa0779(0x9ce)]=Scene_Options[_0xa0779(0x271)]['create'],Scene_Options[_0xa0779(0x271)]['create']=function(){const _0x26597a=_0xa0779;VisuMZ[_0x26597a(0x824)][_0x26597a(0x9ce)][_0x26597a(0x398)](this),this[_0x26597a(0x776)]();},Scene_Options[_0xa0779(0x271)][_0xa0779(0x776)]=function(){const _0x290670=_0xa0779;this[_0x290670(0x40a)]&&(_0x290670(0x770)==='ejtfB'?(_0x5902f3[_0x290670(0x824)][_0x290670(0x299)][_0x290670(0x398)](this),this['setCoreEngineUpdateWindowBg']()):this[_0x290670(0x40a)][_0x290670(0x21b)](Scene_Options[_0x290670(0x1ab)]['OptionsBgType']));},Scene_Options['prototype']['optionsWindowRect']=function(){const _0x1e6bf8=_0xa0779;return Scene_Options[_0x1e6bf8(0x1ab)][_0x1e6bf8(0x76a)]['call'](this);},Scene_Save['layoutSettings']=VisuMZ[_0xa0779(0x824)]['Settings'][_0xa0779(0x250)][_0xa0779(0x72d)],Scene_Save[_0xa0779(0x271)][_0xa0779(0x208)]=function(){const _0x3e47cd=_0xa0779;Scene_File[_0x3e47cd(0x271)][_0x3e47cd(0x208)][_0x3e47cd(0x398)](this),this[_0x3e47cd(0x776)]();},Scene_Save[_0xa0779(0x271)][_0xa0779(0x776)]=function(){const _0x4a9137=_0xa0779;if(this[_0x4a9137(0x65c)]){if(_0x4a9137(0x407)===_0x4a9137(0x7de)){var _0x23ca5e=_0x22b1b8(_0x3907bf['$1']);try{_0x5497f8+=_0x56cd51(_0x23ca5e);}catch(_0x5379f5){if(_0x291a16[_0x4a9137(0x6bb)]())_0x21310f[_0x4a9137(0x47c)](_0x5379f5);}}else this['_helpWindow'][_0x4a9137(0x21b)](Scene_Save['layoutSettings'][_0x4a9137(0x22e)]);}this['_listWindow']&&(_0x4a9137(0x5e7)===_0x4a9137(0x5e7)?this['_listWindow'][_0x4a9137(0x21b)](Scene_Save['layoutSettings'][_0x4a9137(0x457)]):this['_forcedBattleSys']=0x1);},Scene_Save[_0xa0779(0x271)][_0xa0779(0x626)]=function(){const _0x4ee408=_0xa0779;return Scene_Save['layoutSettings'][_0x4ee408(0x555)][_0x4ee408(0x398)](this);},Scene_Save[_0xa0779(0x271)][_0xa0779(0x2ce)]=function(){const _0x307dc4=_0xa0779;return Scene_Save[_0x307dc4(0x1ab)][_0x307dc4(0x800)]['call'](this);},Scene_Load[_0xa0779(0x1ab)]=VisuMZ['CoreEngine']['Settings']['MenuLayout']['LoadMenu'],Scene_Load[_0xa0779(0x271)][_0xa0779(0x208)]=function(){const _0x1110fc=_0xa0779;Scene_File['prototype'][_0x1110fc(0x208)][_0x1110fc(0x398)](this),this[_0x1110fc(0x776)]();},Scene_Load['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x2e1ce5=_0xa0779;if(this['_helpWindow']){if(_0x2e1ce5(0x53c)!=='fqNYX')this[_0x2e1ce5(0x65c)]['setBackgroundType'](Scene_Load[_0x2e1ce5(0x1ab)][_0x2e1ce5(0x22e)]);else{const _0x2ecf91=_0x648b40[_0x2e1ce5(0x824)][_0x2e1ce5(0x17f)][_0x2e1ce5(0x2c3)],_0x3c12da=_0x2ecf91[_0x2e1ce5(0x49b)],_0x692c02=this['getInputButtonString'](_0x47b273),_0x48b1df=this[_0x2e1ce5(0x170)](_0x1267a3);return _0x3c12da[_0x2e1ce5(0x6ad)](_0x692c02,_0x48b1df);}}this[_0x2e1ce5(0x162)]&&this[_0x2e1ce5(0x162)][_0x2e1ce5(0x21b)](Scene_Load[_0x2e1ce5(0x1ab)][_0x2e1ce5(0x457)]);},Scene_Load['prototype'][_0xa0779(0x626)]=function(){const _0x581d9b=_0xa0779;return Scene_Load[_0x581d9b(0x1ab)][_0x581d9b(0x555)][_0x581d9b(0x398)](this);},Scene_Load[_0xa0779(0x271)]['listWindowRect']=function(){const _0xfdcb46=_0xa0779;return Scene_Load[_0xfdcb46(0x1ab)]['ListRect'][_0xfdcb46(0x398)](this);},Scene_GameEnd[_0xa0779(0x1ab)]=VisuMZ['CoreEngine']['Settings'][_0xa0779(0x250)][_0xa0779(0x881)],VisuMZ[_0xa0779(0x824)][_0xa0779(0x652)]=Scene_GameEnd[_0xa0779(0x271)][_0xa0779(0x786)],Scene_GameEnd[_0xa0779(0x271)][_0xa0779(0x786)]=function(){const _0x5bee71=_0xa0779;Scene_MenuBase[_0x5bee71(0x271)][_0x5bee71(0x786)][_0x5bee71(0x398)](this);},Scene_GameEnd['prototype'][_0xa0779(0x8c0)]=function(){const _0x1bd129=_0xa0779,_0x4827e3=this[_0x1bd129(0x598)]();this[_0x1bd129(0x46e)]=new Window_GameEnd(_0x4827e3),this[_0x1bd129(0x46e)][_0x1bd129(0x8d7)](_0x1bd129(0x4d2),this['popScene'][_0x1bd129(0x30a)](this)),this[_0x1bd129(0x5a7)](this['_commandWindow']),this['_commandWindow'][_0x1bd129(0x21b)](Scene_GameEnd[_0x1bd129(0x1ab)][_0x1bd129(0x757)]);},Scene_GameEnd['prototype']['commandWindowRect']=function(){const _0x2daab8=_0xa0779;return Scene_GameEnd[_0x2daab8(0x1ab)][_0x2daab8(0x18e)][_0x2daab8(0x398)](this);},Scene_Shop[_0xa0779(0x1ab)]=VisuMZ['CoreEngine']['Settings']['MenuLayout'][_0xa0779(0x969)],VisuMZ[_0xa0779(0x824)][_0xa0779(0x25b)]=Scene_Shop[_0xa0779(0x271)][_0xa0779(0x208)],Scene_Shop[_0xa0779(0x271)]['create']=function(){const _0x32cb48=_0xa0779;VisuMZ[_0x32cb48(0x824)][_0x32cb48(0x25b)][_0x32cb48(0x398)](this),this[_0x32cb48(0x776)]();},Scene_Shop[_0xa0779(0x271)][_0xa0779(0x776)]=function(){const _0x35a7e6=_0xa0779;this[_0x35a7e6(0x65c)]&&('GTKrh'!==_0x35a7e6(0x53a)?_0x20bdc8[_0x35a7e6(0x824)]['Game_Interpreter_command355'][_0x35a7e6(0x398)](this):this[_0x35a7e6(0x65c)][_0x35a7e6(0x21b)](Scene_Shop['layoutSettings'][_0x35a7e6(0x22e)]));this[_0x35a7e6(0x5b3)]&&this[_0x35a7e6(0x5b3)][_0x35a7e6(0x21b)](Scene_Shop[_0x35a7e6(0x1ab)][_0x35a7e6(0x725)]);if(this[_0x35a7e6(0x46e)]){if(_0x35a7e6(0x481)!=='DlRFq'){const _0x5b353f=_0x4f977a(_0x486dc3['$1']);_0x5b353f<_0x3b8680?(_0x427f00(_0x35a7e6(0x4f6)['format'](_0x506407,_0x5b353f,_0x134198)),_0x58e69a['exit']()):_0x543ff9=_0x31e9d2[_0x35a7e6(0x274)](_0x5b353f,_0x48b4d6);}else this[_0x35a7e6(0x46e)][_0x35a7e6(0x21b)](Scene_Shop[_0x35a7e6(0x1ab)][_0x35a7e6(0x757)]);}if(this[_0x35a7e6(0x6bd)]){if(_0x35a7e6(0x228)==='SaNMl')this[_0x35a7e6(0x6bd)][_0x35a7e6(0x21b)](Scene_Shop['layoutSettings'][_0x35a7e6(0x82c)]);else{this[_0x35a7e6(0x3aa)][_0x35a7e6(0x99c)](_0x114b81),this[_0x35a7e6(0x895)](_0x50d750);for(const _0x232ef9 of _0x448474[_0x35a7e6(0x3b1)]){_0x232ef9[_0x35a7e6(0x2de)]&&_0x232ef9[_0x35a7e6(0x2de)]();}_0x383875[_0x35a7e6(0x372)]();}}this['_numberWindow']&&this[_0x35a7e6(0x916)][_0x35a7e6(0x21b)](Scene_Shop['layoutSettings'][_0x35a7e6(0x8c4)]),this[_0x35a7e6(0x387)]&&this['_statusWindow'][_0x35a7e6(0x21b)](Scene_Shop[_0x35a7e6(0x1ab)][_0x35a7e6(0x294)]),this[_0x35a7e6(0x419)]&&(_0x35a7e6(0x3d4)!==_0x35a7e6(0x3d4)?this[_0x35a7e6(0x241)]=![]:this['_buyWindow'][_0x35a7e6(0x21b)](Scene_Shop['layoutSettings'][_0x35a7e6(0x187)])),this['_categoryWindow']&&this[_0x35a7e6(0x85d)][_0x35a7e6(0x21b)](Scene_Shop['layoutSettings'][_0x35a7e6(0x68a)]),this['_sellWindow']&&this[_0x35a7e6(0x2f2)][_0x35a7e6(0x21b)](Scene_Shop[_0x35a7e6(0x1ab)]['SellBgType']);},Scene_Shop[_0xa0779(0x271)][_0xa0779(0x626)]=function(){const _0x5ad009=_0xa0779;return Scene_Shop['layoutSettings'][_0x5ad009(0x555)][_0x5ad009(0x398)](this);},Scene_Shop[_0xa0779(0x271)][_0xa0779(0x3bd)]=function(){const _0x5eaa30=_0xa0779;return Scene_Shop['layoutSettings']['GoldRect'][_0x5eaa30(0x398)](this);},Scene_Shop[_0xa0779(0x271)][_0xa0779(0x598)]=function(){const _0x176930=_0xa0779;return Scene_Shop['layoutSettings']['CommandRect'][_0x176930(0x398)](this);},Scene_Shop['prototype']['dummyWindowRect']=function(){const _0x150c1b=_0xa0779;return Scene_Shop[_0x150c1b(0x1ab)][_0x150c1b(0x218)][_0x150c1b(0x398)](this);},Scene_Shop[_0xa0779(0x271)][_0xa0779(0x7e3)]=function(){const _0x51eec7=_0xa0779;return Scene_Shop[_0x51eec7(0x1ab)][_0x51eec7(0x7ea)]['call'](this);},Scene_Shop[_0xa0779(0x271)][_0xa0779(0x6e3)]=function(){const _0x202d82=_0xa0779;return Scene_Shop['layoutSettings'][_0x202d82(0x31c)][_0x202d82(0x398)](this);},Scene_Shop['prototype'][_0xa0779(0x255)]=function(){const _0x505988=_0xa0779;return Scene_Shop[_0x505988(0x1ab)]['BuyRect']['call'](this);},Scene_Shop[_0xa0779(0x271)]['categoryWindowRect']=function(){const _0x1511ab=_0xa0779;return Scene_Shop['layoutSettings'][_0x1511ab(0x190)][_0x1511ab(0x398)](this);},Scene_Shop[_0xa0779(0x271)][_0xa0779(0x2b3)]=function(){const _0x302712=_0xa0779;return Scene_Shop[_0x302712(0x1ab)]['SellRect']['call'](this);},Scene_Name['layoutSettings']=VisuMZ[_0xa0779(0x824)][_0xa0779(0x17f)]['MenuLayout'][_0xa0779(0x6af)],VisuMZ[_0xa0779(0x824)]['Scene_Name_create']=Scene_Name[_0xa0779(0x271)][_0xa0779(0x208)],Scene_Name['prototype'][_0xa0779(0x208)]=function(){const _0x14d715=_0xa0779;VisuMZ[_0x14d715(0x824)][_0x14d715(0x299)]['call'](this),this[_0x14d715(0x776)]();},Scene_Name['prototype'][_0xa0779(0x776)]=function(){const _0x4f080e=_0xa0779;this[_0x4f080e(0x944)]&&this[_0x4f080e(0x944)]['setBackgroundType'](Scene_Name['layoutSettings'][_0x4f080e(0x60a)]),this[_0x4f080e(0x2e0)]&&this[_0x4f080e(0x2e0)][_0x4f080e(0x21b)](Scene_Name[_0x4f080e(0x1ab)]['InputBgType']);},Scene_Name[_0xa0779(0x271)][_0xa0779(0x82e)]=function(){return 0x0;},Scene_Name[_0xa0779(0x271)][_0xa0779(0x799)]=function(){const _0x182bd3=_0xa0779;return Scene_Name['layoutSettings'][_0x182bd3(0x33f)][_0x182bd3(0x398)](this);},Scene_Name[_0xa0779(0x271)][_0xa0779(0x877)]=function(){const _0x5f0597=_0xa0779;return Scene_Name['layoutSettings'][_0x5f0597(0x809)][_0x5f0597(0x398)](this);},Scene_Name[_0xa0779(0x271)][_0xa0779(0x42d)]=function(){const _0x44b836=_0xa0779;if(!this['_inputWindow'])return![];return VisuMZ[_0x44b836(0x824)][_0x44b836(0x17f)][_0x44b836(0x634)][_0x44b836(0x42d)];},Scene_Name[_0xa0779(0x271)]['buttonAssistKey1']=function(){const _0x4f20c5=_0xa0779;return this['EnableNameInput']()?TextManager[_0x4f20c5(0x170)](_0x4f20c5(0x796)):Scene_MenuBase['prototype'][_0x4f20c5(0x898)]['call'](this);},Scene_Name[_0xa0779(0x271)][_0xa0779(0x94d)]=function(){const _0x430bf4=_0xa0779;if(this[_0x430bf4(0x42d)]()){const _0x234fdc=VisuMZ[_0x430bf4(0x824)][_0x430bf4(0x17f)]['KeyboardInput'];return this['_inputWindow']['_mode']===_0x430bf4(0x4ba)?_0x234fdc[_0x430bf4(0x27e)]||_0x430bf4(0x27e):_0x430bf4(0x90a)!=='DGqYH'?_0x234fdc[_0x430bf4(0x29b)]||'Manual':_0x446f15[_0x430bf4(0x1ab)][_0x430bf4(0x31c)]['call'](this);}else{if(_0x430bf4(0x495)==='uLGjb')_0x4dfa26=_0x180d57[_0x430bf4(0x4ee)](_0x1e1edc),_0x5a30ca=_0x28c7e0[_0x430bf4(0x4ee)](_0x4f8c78),_0x59f5af[_0x430bf4(0x824)][_0x430bf4(0x749)][_0x430bf4(0x398)](this,_0xc284b0,_0x5fc1bc,_0x185013,_0x3cb1ca);else return Scene_MenuBase[_0x430bf4(0x271)]['buttonAssistText1'][_0x430bf4(0x398)](this);}},VisuMZ[_0xa0779(0x824)][_0xa0779(0x805)]=Scene_Name['prototype']['onInputOk'],Scene_Name[_0xa0779(0x271)][_0xa0779(0x999)]=function(){const _0xf81d41=_0xa0779;this[_0xf81d41(0x6c6)]()?this[_0xf81d41(0x3cd)]():VisuMZ[_0xf81d41(0x824)][_0xf81d41(0x805)][_0xf81d41(0x398)](this);},Scene_Name['prototype'][_0xa0779(0x6c6)]=function(){const _0x53f6ea=_0xa0779,_0xde0d9b=VisuMZ[_0x53f6ea(0x824)]['Settings'][_0x53f6ea(0x634)];if(!_0xde0d9b)return![];const _0x25b339=_0xde0d9b[_0x53f6ea(0x743)];if(!_0x25b339)return![];const _0x715f56=this[_0x53f6ea(0x944)][_0x53f6ea(0x912)]()[_0x53f6ea(0x538)]();for(const _0x3e0401 of _0x25b339){if(_0x715f56['includes'](_0x3e0401[_0x53f6ea(0x538)]()))return!![];}return![];},Scene_Name[_0xa0779(0x271)][_0xa0779(0x3cd)]=function(){const _0x3fb25f=_0xa0779;SoundManager[_0x3fb25f(0x450)]();},VisuMZ[_0xa0779(0x824)][_0xa0779(0x2cf)]=Scene_Battle[_0xa0779(0x271)][_0xa0779(0x6be)],Scene_Battle['prototype']['update']=function(){const _0x490c3f=_0xa0779;VisuMZ['CoreEngine'][_0x490c3f(0x2cf)][_0x490c3f(0x398)](this);if($gameTemp[_0x490c3f(0x678)])this[_0x490c3f(0x890)]();},Scene_Battle['prototype'][_0xa0779(0x890)]=function(){const _0x4dc503=_0xa0779;if(!BattleManager[_0x4dc503(0x232)]()&&!this[_0x4dc503(0x6aa)]&&!$gameMessage[_0x4dc503(0x3e6)]()){if('azIcp'!==_0x4dc503(0x71a))return this['areButtonsHidden']()||this[_0x4dc503(0x164)]();else this[_0x4dc503(0x6aa)]=!![],this[_0x4dc503(0x6be)](),SceneManager[_0x4dc503(0x376)](),this['_playtestF7Looping']=![];}},VisuMZ[_0xa0779(0x824)][_0xa0779(0x9b8)]=Scene_Battle['prototype'][_0xa0779(0x151)],Scene_Battle['prototype'][_0xa0779(0x151)]=function(){const _0x5a6491=_0xa0779;VisuMZ['CoreEngine'][_0x5a6491(0x9b8)][_0x5a6491(0x398)](this),SceneManager[_0x5a6491(0x164)]()&&this[_0x5a6491(0x583)]();},Scene_Battle[_0xa0779(0x271)][_0xa0779(0x583)]=function(){const _0x5906e1=_0xa0779;this[_0x5906e1(0x4e6)]['x']=Graphics[_0x5906e1(0x66f)]+0x4;if(this[_0x5906e1(0x861)]())_0x5906e1(0x2d6)!=='gMvcL'?this[_0x5906e1(0x97b)][_0x37ab6c]=this[_0x5906e1(0x452)](_0x899c0e(_0x47bba7)):this[_0x5906e1(0x4e6)]['y']=Graphics[_0x5906e1(0x2f3)]-this[_0x5906e1(0x28c)]();else{if(_0x5906e1(0x24c)!==_0x5906e1(0x595))this['_cancelButton']['y']=0x0;else return _0xcfe2aa(_0x3b3474)[_0x5906e1(0x17d)](_0x2e2fcf,_0x13cf8);}},VisuMZ[_0xa0779(0x824)][_0xa0779(0x547)]=Sprite_Button[_0xa0779(0x271)][_0xa0779(0x288)],Sprite_Button['prototype']['initialize']=function(_0x4742f8){const _0x34ebc7=_0xa0779;VisuMZ[_0x34ebc7(0x824)][_0x34ebc7(0x547)][_0x34ebc7(0x398)](this,_0x4742f8),this[_0x34ebc7(0x669)]();},Sprite_Button['prototype'][_0xa0779(0x669)]=function(){const _0xdfe9f6=_0xa0779,_0x56ec7c=VisuMZ[_0xdfe9f6(0x824)]['Settings']['UI'];this[_0xdfe9f6(0x38d)]=![];switch(this[_0xdfe9f6(0x484)]){case _0xdfe9f6(0x4d2):this[_0xdfe9f6(0x38d)]=!_0x56ec7c[_0xdfe9f6(0x8e4)];break;case _0xdfe9f6(0x89c):case _0xdfe9f6(0x224):this['_isButtonHidden']=!_0x56ec7c[_0xdfe9f6(0x777)];break;case _0xdfe9f6(0x38b):case'up':case _0xdfe9f6(0x500):case _0xdfe9f6(0x4ef):case'ok':this[_0xdfe9f6(0x38d)]=!_0x56ec7c[_0xdfe9f6(0x15e)];break;case _0xdfe9f6(0x924):this[_0xdfe9f6(0x38d)]=!_0x56ec7c[_0xdfe9f6(0x304)];break;}},VisuMZ[_0xa0779(0x824)][_0xa0779(0x88e)]=Sprite_Button[_0xa0779(0x271)][_0xa0779(0x5d5)],Sprite_Button[_0xa0779(0x271)]['updateOpacity']=function(){const _0x33203e=_0xa0779;SceneManager[_0x33203e(0x85f)]()||this['_isButtonHidden']?this[_0x33203e(0x424)]():VisuMZ[_0x33203e(0x824)][_0x33203e(0x88e)][_0x33203e(0x398)](this);},Sprite_Button[_0xa0779(0x271)][_0xa0779(0x424)]=function(){const _0x4a82b4=_0xa0779;this[_0x4a82b4(0x939)]=![],this['opacity']=0x0,this['x']=Graphics[_0x4a82b4(0x3c5)]*0xa,this['y']=Graphics[_0x4a82b4(0x7f6)]*0xa;},VisuMZ[_0xa0779(0x824)][_0xa0779(0x1ff)]=Sprite_Battler[_0xa0779(0x271)][_0xa0779(0x715)],Sprite_Battler['prototype'][_0xa0779(0x715)]=function(_0x4810d2,_0x2b56b2,_0x23e1ae){const _0x541986=_0xa0779;(this[_0x541986(0x6d8)]!==_0x4810d2||this[_0x541986(0x672)]!==_0x2b56b2)&&(this[_0x541986(0x48c)](_0x541986(0x382)),this[_0x541986(0x520)]=_0x23e1ae),VisuMZ[_0x541986(0x824)][_0x541986(0x1ff)][_0x541986(0x398)](this,_0x4810d2,_0x2b56b2,_0x23e1ae);},Sprite_Battler['prototype'][_0xa0779(0x48c)]=function(_0x3fc801){const _0x514990=_0xa0779;this[_0x514990(0x340)]=_0x3fc801;},Sprite_Battler[_0xa0779(0x271)][_0xa0779(0x7bd)]=function(){const _0x22bfc9=_0xa0779;if(this[_0x22bfc9(0x1da)]<=0x0)return;const _0x310071=this[_0x22bfc9(0x1da)],_0x27adaa=this[_0x22bfc9(0x520)],_0x425908=this[_0x22bfc9(0x340)];this[_0x22bfc9(0x392)]=this[_0x22bfc9(0x5dc)](this[_0x22bfc9(0x392)],this['_targetOffsetX'],_0x310071,_0x27adaa,_0x425908),this[_0x22bfc9(0x528)]=this[_0x22bfc9(0x5dc)](this[_0x22bfc9(0x528)],this['_targetOffsetY'],_0x310071,_0x27adaa,_0x425908),this['_movementDuration']--;if(this[_0x22bfc9(0x1da)]<=0x0)this[_0x22bfc9(0x7b7)]();},Sprite_Battler[_0xa0779(0x271)]['applyEasing']=function(_0x26d9c9,_0x2eaf99,_0x4aa4c1,_0x471247,_0x2842f3){const _0x354bc9=_0xa0779,_0x3e869a=VisuMZ[_0x354bc9(0x25a)]((_0x471247-_0x4aa4c1)/_0x471247,_0x2842f3||_0x354bc9(0x382)),_0x1045cf=VisuMZ[_0x354bc9(0x25a)]((_0x471247-_0x4aa4c1+0x1)/_0x471247,_0x2842f3||'Linear'),_0x3a11c7=(_0x26d9c9-_0x2eaf99*_0x3e869a)/(0x1-_0x3e869a);return _0x3a11c7+(_0x2eaf99-_0x3a11c7)*_0x1045cf;},VisuMZ['CoreEngine'][_0xa0779(0x596)]=Sprite_Actor[_0xa0779(0x271)][_0xa0779(0x54c)],Sprite_Actor['prototype']['setActorHome']=function(_0x1ef008){const _0x321a12=_0xa0779;VisuMZ[_0x321a12(0x824)][_0x321a12(0x17f)]['UI']['RepositionActors']?this[_0x321a12(0x326)](_0x1ef008):VisuMZ[_0x321a12(0x824)][_0x321a12(0x596)][_0x321a12(0x398)](this,_0x1ef008);},Sprite_Actor[_0xa0779(0x271)][_0xa0779(0x326)]=function(_0x1f76f8){const _0x21c8e6=_0xa0779;let _0x444141=Math[_0x21c8e6(0x4ee)](Graphics[_0x21c8e6(0x3c5)]/0x2+0xc0);_0x444141-=Math[_0x21c8e6(0x256)]((Graphics[_0x21c8e6(0x3c5)]-Graphics[_0x21c8e6(0x66f)])/0x2),_0x444141+=_0x1f76f8*0x20;let _0x115f0a=Graphics[_0x21c8e6(0x7f6)]-0xc8-$gameParty[_0x21c8e6(0x670)]()*0x30;_0x115f0a-=Math[_0x21c8e6(0x256)]((Graphics[_0x21c8e6(0x7f6)]-Graphics[_0x21c8e6(0x2f3)])/0x2),_0x115f0a+=_0x1f76f8*0x30,this[_0x21c8e6(0x4f7)](_0x444141,_0x115f0a);},Sprite_Actor[_0xa0779(0x271)][_0xa0779(0x1d0)]=function(){const _0xd35246=_0xa0779;this[_0xd35246(0x715)](0x4b0,0x0,0x78);},Sprite_Animation[_0xa0779(0x271)][_0xa0779(0x862)]=function(_0x17ec7a){const _0x7d0bd4=_0xa0779;this[_0x7d0bd4(0x93e)]=_0x17ec7a;},VisuMZ[_0xa0779(0x824)][_0xa0779(0x3e4)]=Sprite_Animation[_0xa0779(0x271)][_0xa0779(0x3f9)],Sprite_Animation[_0xa0779(0x271)]['processSoundTimings']=function(){const _0x12a9b5=_0xa0779;if(this[_0x12a9b5(0x93e)])return;VisuMZ[_0x12a9b5(0x824)][_0x12a9b5(0x3e4)][_0x12a9b5(0x398)](this);},VisuMZ[_0xa0779(0x824)]['Sprite_Animation_setViewport']=Sprite_Animation[_0xa0779(0x271)][_0xa0779(0x884)],Sprite_Animation[_0xa0779(0x271)][_0xa0779(0x884)]=function(_0x13802d){const _0x35b2bd=_0xa0779;this[_0x35b2bd(0x978)]()?this['setViewportCoreEngineFix'](_0x13802d):_0x35b2bd(0x6ae)===_0x35b2bd(0x45e)?this[_0x35b2bd(0x655)]='BTB':VisuMZ[_0x35b2bd(0x824)][_0x35b2bd(0x94c)][_0x35b2bd(0x398)](this,_0x13802d);},Sprite_Animation[_0xa0779(0x271)]['isAnimationOffsetXMirrored']=function(){const _0x28c2e0=_0xa0779;if(!this[_0x28c2e0(0x54e)])return![];const _0x132bd2=this[_0x28c2e0(0x54e)]['name']||'';if(_0x132bd2[_0x28c2e0(0x758)](/<MIRROR OFFSET X>/i))return!![];if(_0x132bd2[_0x28c2e0(0x758)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ['CoreEngine'][_0x28c2e0(0x17f)][_0x28c2e0(0x2b0)]['AnimationMirrorOffset'];},Sprite_Animation[_0xa0779(0x271)][_0xa0779(0x8e9)]=function(_0x284019){const _0x3a3fb7=_0xa0779,_0x3fe32d=this['_viewportSize'],_0x4a784d=this[_0x3a3fb7(0x548)],_0x12c7e8=this[_0x3a3fb7(0x54e)][_0x3a3fb7(0x814)]*(this['_mirror']?-0x1:0x1)-_0x3fe32d/0x2,_0x2b1ecb=this['_animation']['offsetY']-_0x4a784d/0x2,_0x2d846b=this[_0x3a3fb7(0x544)](_0x284019);_0x284019['gl'][_0x3a3fb7(0x822)](_0x12c7e8+_0x2d846b['x'],_0x2b1ecb+_0x2d846b['y'],_0x3fe32d,_0x4a784d);},Sprite_Animation['prototype']['targetSpritePosition']=function(_0x16cbab){const _0x26fc09=_0xa0779;if(_0x16cbab[_0x26fc09(0x377)]){}const _0x23da96=this['_animation'][_0x26fc09(0x912)];let _0xdf21fb=_0x16cbab[_0x26fc09(0x7f6)]*_0x16cbab['scale']['y'],_0x46e350=0x0,_0x4e69a1=-_0xdf21fb/0x2;if(_0x23da96['match'](/<(?:HEAD|HEADER|TOP)>/i))_0x4e69a1=-_0xdf21fb;if(_0x23da96[_0x26fc09(0x758)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x4e69a1=0x0;if(this['_animation'][_0x26fc09(0x6c4)])_0x4e69a1=0x0;if(_0x23da96[_0x26fc09(0x758)](/<(?:LEFT)>/i))_0x46e350=-_0x16cbab[_0x26fc09(0x3c5)]/0x2;if(_0x23da96[_0x26fc09(0x758)](/<(?:RIGHT)>/i))_0x46e350=_0x16cbab[_0x26fc09(0x3c5)]/0x2;_0x23da96['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x46e350=Number(RegExp['$1'])*_0x16cbab['width']);if(_0x23da96[_0x26fc09(0x758)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)){if(_0x26fc09(0x9ee)!==_0x26fc09(0x9ee)){const _0x5f5d6d=this[_0x26fc09(0x65a)];_0x5f5d6d['save'](),_0x5f5d6d['font']=this['_makeFontNameText']();const _0x486435=_0x5f5d6d[_0x26fc09(0x600)](_0x2675bc)[_0x26fc09(0x3c5)];return _0x5f5d6d[_0x26fc09(0x8bb)](),_0x486435;}else _0x4e69a1=(0x1-Number(RegExp['$1']))*-_0xdf21fb;}_0x23da96[_0x26fc09(0x758)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x46e350=Number(RegExp['$1'])*_0x16cbab['width'],_0x4e69a1=(0x1-Number(RegExp['$2']))*-_0xdf21fb);if(_0x23da96['match'](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x46e350+=Number(RegExp['$1']);if(_0x23da96[_0x26fc09(0x758)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x4e69a1+=Number(RegExp['$1']);_0x23da96[_0x26fc09(0x758)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x46e350+=Number(RegExp['$1']),_0x4e69a1+=Number(RegExp['$2']));const _0x45aa46=new Point(_0x46e350,_0x4e69a1);return _0x16cbab['updateTransform'](),_0x16cbab['worldTransform']['apply'](_0x45aa46);},Sprite_AnimationMV[_0xa0779(0x271)]['setupRate']=function(){const _0x19884c=_0xa0779;this[_0x19884c(0x98a)]=VisuMZ[_0x19884c(0x824)][_0x19884c(0x17f)][_0x19884c(0x2b0)][_0x19884c(0x671)]??0x4,this[_0x19884c(0x494)](),this[_0x19884c(0x98a)]=this['_rate']['clamp'](0x1,0xa);},Sprite_AnimationMV['prototype'][_0xa0779(0x494)]=function(){const _0x42406a=_0xa0779;if(!this[_0x42406a(0x54e)]);const _0x294a0f=this[_0x42406a(0x54e)][_0x42406a(0x912)]||'';if(_0x294a0f[_0x42406a(0x758)](/<RATE:[ ](\d+)>/i)){if(_0x42406a(0x17e)===_0x42406a(0x75a)){const _0x1ee9e2=this[_0x42406a(0x87c)]/0x5,_0x4e1655=_0x493e79['_scene'],_0x4ed83b=_0x4e1655[_0x42406a(0x4f9)[_0x42406a(0x6ad)](_0x47f99f)](),_0x37320e=_0x4e1655[_0x42406a(0x4a3)[_0x42406a(0x6ad)](_0x5670d7)]();this[_0x42406a(0x8fc)][_0x42406a(0x44a)[_0x42406a(0x6ad)](_0xe6f396)]=_0x4ed83b,this[_0x42406a(0x8fc)][_0x42406a(0x5c4)[_0x42406a(0x6ad)](_0x37a357)]=_0x37320e;if(_0x4ed83b==='')return;if(_0x37320e==='')return;const _0x55b0eb=_0x4e1655['buttonAssistOffset%1'['format'](_0x43bd50)](),_0x4cb43a=this[_0x42406a(0x27c)](),_0x202d43=_0x1ee9e2*(_0x43ef1a-0x1)+_0x4cb43a+_0x55b0eb,_0x41cfd5=_0x30a11d[_0x42406a(0x824)][_0x42406a(0x17f)]['ButtonAssist'][_0x42406a(0x3a4)];this[_0x42406a(0x227)](_0x41cfd5['format'](_0x4ed83b,_0x37320e),_0x202d43,0x0,_0x1ee9e2-_0x4cb43a*0x2);}else this['_rate']=(Number(RegExp['$1'])||0x1)[_0x42406a(0x1f6)](0x1,0xa);}},Sprite_AnimationMV[_0xa0779(0x271)]['setMute']=function(_0x172f06){this['_muteSound']=_0x172f06;},VisuMZ[_0xa0779(0x824)][_0xa0779(0x29a)]=Sprite_AnimationMV[_0xa0779(0x271)]['processTimingData'],Sprite_AnimationMV[_0xa0779(0x271)][_0xa0779(0x7d2)]=function(_0x56f175){const _0x2c4033=_0xa0779;this[_0x2c4033(0x93e)]&&(_0x56f175=JsonEx['makeDeepCopy'](_0x56f175),_0x56f175['se']&&(_0x56f175['se']['volume']=0x0)),VisuMZ[_0x2c4033(0x824)][_0x2c4033(0x29a)]['call'](this,_0x56f175);},VisuMZ[_0xa0779(0x824)][_0xa0779(0x6a0)]=Sprite_AnimationMV[_0xa0779(0x271)][_0xa0779(0x1c2)],Sprite_AnimationMV['prototype'][_0xa0779(0x1c2)]=function(){const _0x12970e=_0xa0779;VisuMZ[_0x12970e(0x824)][_0x12970e(0x6a0)][_0x12970e(0x398)](this);if(this[_0x12970e(0x54e)]['position']===0x3){if(_0x12970e(0x949)!==_0x12970e(0x949))this[_0x12970e(0x93e)]=_0x3fbca0;else{if(this['x']===0x0)this['x']=Math[_0x12970e(0x4ee)](Graphics['width']/0x2);if(this['y']===0x0)this['y']=Math[_0x12970e(0x4ee)](Graphics['height']/0x2);}}},Sprite_Damage[_0xa0779(0x271)]['createDigits']=function(_0x101d0e){const _0x5ab0f7=_0xa0779;let _0x3f2a9d=Math[_0x5ab0f7(0x2da)](_0x101d0e)[_0x5ab0f7(0x4d7)]();if(this[_0x5ab0f7(0x782)]()){if('PDEXU'==='BBDxH')return this[_0x5ab0f7(0x612)][_0x5ab0f7(0x444)]>0x0;else _0x3f2a9d=VisuMZ[_0x5ab0f7(0x82a)](_0x3f2a9d);}const _0x32a214=this[_0x5ab0f7(0x9b9)](),_0x405850=Math[_0x5ab0f7(0x256)](_0x32a214*0.75);for(let _0x114b01=0x0;_0x114b01<_0x3f2a9d[_0x5ab0f7(0x444)];_0x114b01++){const _0x3eb8a0=this[_0x5ab0f7(0x995)](_0x405850,_0x32a214);_0x3eb8a0[_0x5ab0f7(0x346)][_0x5ab0f7(0x65f)](_0x3f2a9d[_0x114b01],0x0,0x0,_0x405850,_0x32a214,_0x5ab0f7(0x9d3)),_0x3eb8a0['x']=(_0x114b01-(_0x3f2a9d[_0x5ab0f7(0x444)]-0x1)/0x2)*_0x405850,_0x3eb8a0['dy']=-_0x114b01;}},Sprite_Damage[_0xa0779(0x271)][_0xa0779(0x782)]=function(){const _0x579a48=_0xa0779;return VisuMZ[_0x579a48(0x824)][_0x579a48(0x17f)]['QoL'][_0x579a48(0x63f)];},Sprite_Damage[_0xa0779(0x271)][_0xa0779(0x4e7)]=function(){return ColorManager['outlineColorDmg']();},VisuMZ[_0xa0779(0x824)][_0xa0779(0x285)]=Sprite_Gauge[_0xa0779(0x271)]['gaugeRate'],Sprite_Gauge[_0xa0779(0x271)][_0xa0779(0x31b)]=function(){const _0x58e7d3=_0xa0779;return VisuMZ[_0x58e7d3(0x824)][_0x58e7d3(0x285)]['call'](this)[_0x58e7d3(0x1f6)](0x0,0x1);},VisuMZ[_0xa0779(0x824)][_0xa0779(0x51b)]=Sprite_Gauge['prototype'][_0xa0779(0x7e2)],Sprite_Gauge[_0xa0779(0x271)][_0xa0779(0x7e2)]=function(){const _0x537ff0=_0xa0779;let _0x252690=VisuMZ[_0x537ff0(0x824)][_0x537ff0(0x51b)][_0x537ff0(0x398)](this);return _0x252690;},Sprite_Gauge[_0xa0779(0x271)]['drawValue']=function(){const _0x55c4b3=_0xa0779;let _0x1d1f2e=this[_0x55c4b3(0x7e2)]();this[_0x55c4b3(0x782)]()&&(_0x55c4b3(0x4c5)!==_0x55c4b3(0x4c5)?this[_0x55c4b3(0x1e9)]&&this[_0x55c4b3(0x1e9)]():_0x1d1f2e=VisuMZ['GroupDigits'](_0x1d1f2e));const _0x24697c=this[_0x55c4b3(0x68f)]()-0x1,_0x1e16dc=this[_0x55c4b3(0x8d5)]?this[_0x55c4b3(0x8d5)]():this[_0x55c4b3(0x6fe)]();this[_0x55c4b3(0x616)](),this[_0x55c4b3(0x346)][_0x55c4b3(0x65f)](_0x1d1f2e,0x0,0x0,_0x24697c,_0x1e16dc,_0x55c4b3(0x4b5));},Sprite_Gauge[_0xa0779(0x271)]['valueOutlineWidth']=function(){return 0x3;},Sprite_Gauge[_0xa0779(0x271)][_0xa0779(0x782)]=function(){const _0x28e403=_0xa0779;return VisuMZ[_0x28e403(0x824)][_0x28e403(0x17f)]['QoL'][_0x28e403(0x402)];},Sprite_Gauge['prototype'][_0xa0779(0x4e7)]=function(){const _0x363966=_0xa0779;return ColorManager[_0x363966(0x244)]();},VisuMZ[_0xa0779(0x824)]['Sprite_Picture_loadBitmap']=Sprite_Picture['prototype'][_0xa0779(0x95e)],Sprite_Picture[_0xa0779(0x271)]['loadBitmap']=function(){const _0x5aaa58=_0xa0779;this[_0x5aaa58(0x568)]&&this[_0x5aaa58(0x568)][_0x5aaa58(0x758)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x5aaa58(0x9a2)](Number(RegExp['$1'])):VisuMZ['CoreEngine'][_0x5aaa58(0x9e5)][_0x5aaa58(0x398)](this);},Sprite_Picture[_0xa0779(0x271)]['loadIconBitmap']=function(_0x5572ad){const _0x5c80e1=_0xa0779,_0x83070b=ImageManager['iconWidth'],_0x5b23a4=ImageManager[_0x5c80e1(0x7fa)],_0x3fccbe=this[_0x5c80e1(0x568)]['match'](/SMOOTH/i);this[_0x5c80e1(0x346)]=new Bitmap(_0x83070b,_0x5b23a4);const _0x4e1f7c=ImageManager[_0x5c80e1(0x4e1)](_0x5c80e1(0x8c2)),_0x33965b=_0x5572ad%0x10*_0x83070b,_0x1e4c46=Math[_0x5c80e1(0x256)](_0x5572ad/0x10)*_0x5b23a4;this[_0x5c80e1(0x346)][_0x5c80e1(0x20e)]=_0x3fccbe,this[_0x5c80e1(0x346)]['blt'](_0x4e1f7c,_0x33965b,_0x1e4c46,_0x83070b,_0x5b23a4,0x0,0x0,_0x83070b,_0x5b23a4);};function Sprite_TitlePictureButton(){const _0x1f5f32=_0xa0779;this[_0x1f5f32(0x288)](...arguments);}Sprite_TitlePictureButton[_0xa0779(0x271)]=Object[_0xa0779(0x208)](Sprite_Clickable['prototype']),Sprite_TitlePictureButton[_0xa0779(0x271)]['constructor']=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0xa0779(0x271)][_0xa0779(0x288)]=function(_0x510007){const _0x3787cb=_0xa0779;Sprite_Clickable['prototype'][_0x3787cb(0x288)][_0x3787cb(0x398)](this),this[_0x3787cb(0x8fc)]=_0x510007,this[_0x3787cb(0x1e9)]=null,this[_0x3787cb(0x5e9)]();},Sprite_TitlePictureButton[_0xa0779(0x271)][_0xa0779(0x5e9)]=function(){const _0x796830=_0xa0779;this['x']=Graphics[_0x796830(0x3c5)],this['y']=Graphics['height'],this[_0x796830(0x939)]=![],this['setupButtonImage']();},Sprite_TitlePictureButton[_0xa0779(0x271)][_0xa0779(0x8e8)]=function(){const _0x4d9a84=_0xa0779;this[_0x4d9a84(0x346)]=ImageManager['loadPicture'](this[_0x4d9a84(0x8fc)][_0x4d9a84(0x324)]),this[_0x4d9a84(0x346)]['addLoadListener'](this[_0x4d9a84(0x864)][_0x4d9a84(0x30a)](this));},Sprite_TitlePictureButton[_0xa0779(0x271)]['onButtonImageLoad']=function(){const _0xe21f88=_0xa0779;this[_0xe21f88(0x8fc)][_0xe21f88(0x519)][_0xe21f88(0x398)](this),this[_0xe21f88(0x8fc)][_0xe21f88(0x99d)][_0xe21f88(0x398)](this),this[_0xe21f88(0x649)](this[_0xe21f88(0x8fc)]['CallHandlerJS'][_0xe21f88(0x30a)](this));},Sprite_TitlePictureButton[_0xa0779(0x271)][_0xa0779(0x6be)]=function(){const _0x10b262=_0xa0779;Sprite_Clickable['prototype']['update'][_0x10b262(0x398)](this),this[_0x10b262(0x5d5)](),this[_0x10b262(0x27a)]();},Sprite_TitlePictureButton[_0xa0779(0x271)]['fadeSpeed']=function(){const _0x30b3f4=_0xa0779;return VisuMZ[_0x30b3f4(0x824)][_0x30b3f4(0x17f)]['MenuLayout'][_0x30b3f4(0x3ea)][_0x30b3f4(0x801)];},Sprite_TitlePictureButton[_0xa0779(0x271)][_0xa0779(0x5d5)]=function(){const _0x523770=_0xa0779;this[_0x523770(0x592)]||this[_0x523770(0x546)]?this['opacity']=0xff:(this[_0x523770(0x645)]+=this[_0x523770(0x939)]?this[_0x523770(0x6f9)]():-0x1*this[_0x523770(0x6f9)](),this[_0x523770(0x645)]=Math[_0x523770(0x15d)](0xc0,this[_0x523770(0x645)]));},Sprite_TitlePictureButton['prototype'][_0xa0779(0x649)]=function(_0x47534d){this['_clickHandler']=_0x47534d;},Sprite_TitlePictureButton[_0xa0779(0x271)]['onClick']=function(){const _0x413f1b=_0xa0779;this[_0x413f1b(0x1e9)]&&this['_clickHandler']();},VisuMZ['CoreEngine'][_0xa0779(0x197)]=Spriteset_Base[_0xa0779(0x271)][_0xa0779(0x288)],Spriteset_Base[_0xa0779(0x271)]['initialize']=function(){const _0x36835d=_0xa0779;VisuMZ[_0x36835d(0x824)][_0x36835d(0x197)][_0x36835d(0x398)](this),this[_0x36835d(0x993)]();},Spriteset_Base[_0xa0779(0x271)][_0xa0779(0x993)]=function(){const _0x50d891=_0xa0779;this['_fauxAnimationSprites']=[],this[_0x50d891(0x612)]=[],this[_0x50d891(0x761)]=this['scale']['x'],this[_0x50d891(0x1f4)]=this[_0x50d891(0x21c)]['y'];},VisuMZ[_0xa0779(0x824)][_0xa0779(0x34f)]=Spriteset_Base['prototype'][_0xa0779(0x372)],Spriteset_Base[_0xa0779(0x271)][_0xa0779(0x372)]=function(_0x31c666){const _0x12777d=_0xa0779;this[_0x12777d(0x42a)](),this['removeAllPointAnimations'](),VisuMZ[_0x12777d(0x824)]['Spriteset_Base_destroy']['call'](this,_0x31c666);},VisuMZ[_0xa0779(0x824)][_0xa0779(0x88f)]=Spriteset_Base['prototype'][_0xa0779(0x6be)],Spriteset_Base[_0xa0779(0x271)][_0xa0779(0x6be)]=function(){const _0x2b02e9=_0xa0779;VisuMZ[_0x2b02e9(0x824)]['Spriteset_Base_update']['call'](this),this[_0x2b02e9(0x2f6)](),this['updateFauxAnimations'](),this[_0x2b02e9(0x83d)]();},Spriteset_Base['prototype'][_0xa0779(0x2f6)]=function(){const _0x457d0a=_0xa0779;if(!VisuMZ['CoreEngine'][_0x457d0a(0x17f)]['QoL'][_0x457d0a(0x9d5)])return;if(this[_0x457d0a(0x761)]===this[_0x457d0a(0x21c)]['x']&&this[_0x457d0a(0x1f4)]===this[_0x457d0a(0x21c)]['y'])return;this[_0x457d0a(0x4c6)](),this['_cacheScaleX']=this[_0x457d0a(0x21c)]['x'],this[_0x457d0a(0x1f4)]=this[_0x457d0a(0x21c)]['y'];},Spriteset_Base[_0xa0779(0x271)]['adjustPictureAntiZoom']=function(){const _0x58140e=_0xa0779;if(SceneManager[_0x58140e(0x9aa)]()&&Spriteset_Map[_0x58140e(0x50c)])return;else{if(SceneManager[_0x58140e(0x714)]()&&Spriteset_Battle[_0x58140e(0x50c)])return;}this[_0x58140e(0x21c)]['x']!==0x0&&('DUhKp'===_0x58140e(0x16f)?(this[_0x58140e(0x7a7)][_0x58140e(0x21c)]['x']=0x1/this['scale']['x'],this[_0x58140e(0x7a7)]['x']=-(this['x']/this['scale']['x'])):(this[_0x58140e(0x98a)]=_0x239764[_0x58140e(0x824)][_0x58140e(0x17f)]['QoL'][_0x58140e(0x671)]??0x4,this[_0x58140e(0x494)](),this[_0x58140e(0x98a)]=this[_0x58140e(0x98a)]['clamp'](0x1,0xa)));if(this[_0x58140e(0x21c)]['y']!==0x0){if(_0x58140e(0x753)!==_0x58140e(0x753)){_0x4f4a98[_0x58140e(0x510)](_0x5d7e8a,_0x1601cf);const _0x460c92=_0x3d269c[_0x58140e(0x4ee)](_0x170a3a[_0x58140e(0x34e)])[_0x58140e(0x1f6)](-0x64,0x64),_0x4ac86b=_0x26af3e[_0x58140e(0x5c1)];_0x4ac86b&&(_0x4ac86b[_0x58140e(0x34e)]=_0x460c92,_0x33cd14[_0x58140e(0x1c1)](_0x4ac86b));}else this['_pictureContainer'][_0x58140e(0x21c)]['y']=0x1/this['scale']['y'],this[_0x58140e(0x7a7)]['y']=-(this['y']/this['scale']['y']);}},VisuMZ[_0xa0779(0x824)]['Spriteset_Base_updatePosition']=Spriteset_Base[_0xa0779(0x271)][_0xa0779(0x1c2)],Spriteset_Base[_0xa0779(0x271)][_0xa0779(0x1c2)]=function(){const _0x4bdd4a=_0xa0779;VisuMZ['CoreEngine'][_0x4bdd4a(0x57d)][_0x4bdd4a(0x398)](this),this[_0x4bdd4a(0x580)]();},Spriteset_Base[_0xa0779(0x271)]['updatePositionCoreEngine']=function(){const _0x68ee73=_0xa0779;if(!$gameScreen)return;if($gameScreen[_0x68ee73(0x5e8)]<=0x0)return;this['x']-=Math['round']($gameScreen[_0x68ee73(0x350)]());const _0x329974=$gameScreen[_0x68ee73(0x8ed)]();switch($gameScreen[_0x68ee73(0x8ed)]()){case _0x68ee73(0x411):this[_0x68ee73(0x384)]();break;case _0x68ee73(0x891):this[_0x68ee73(0x33d)]();break;case _0x68ee73(0x797):this[_0x68ee73(0x732)]();break;default:this[_0x68ee73(0x847)]();break;}},Spriteset_Base[_0xa0779(0x271)][_0xa0779(0x384)]=function(){const _0x30870d=_0xa0779,_0xb98a32=VisuMZ['CoreEngine'][_0x30870d(0x17f)]['ScreenShake'];if(_0xb98a32&&_0xb98a32[_0x30870d(0x947)])return _0xb98a32[_0x30870d(0x947)][_0x30870d(0x398)](this);this['x']+=Math['round']($gameScreen[_0x30870d(0x350)]());},Spriteset_Base[_0xa0779(0x271)]['updatePositionCoreEngineShakeRand']=function(){const _0x1b07d9=_0xa0779,_0x22d114=VisuMZ['CoreEngine'][_0x1b07d9(0x17f)][_0x1b07d9(0x719)];if(_0x22d114&&_0x22d114[_0x1b07d9(0x6a8)])return _0x1b07d9(0x9c0)===_0x1b07d9(0x260)?_0x421c5f[_0x1b07d9(0x271)]['lineHeight']():_0x22d114[_0x1b07d9(0x6a8)][_0x1b07d9(0x398)](this);const _0xc80369=$gameScreen['_shakePower']*0.75,_0x3efe81=$gameScreen[_0x1b07d9(0x379)]*0.6,_0x1d651a=$gameScreen[_0x1b07d9(0x5e8)];this['x']+=Math[_0x1b07d9(0x4ee)](Math[_0x1b07d9(0x1ee)](_0xc80369)-Math[_0x1b07d9(0x1ee)](_0x3efe81))*(Math[_0x1b07d9(0x15d)](_0x1d651a,0x1e)*0.5),this['y']+=Math['round'](Math[_0x1b07d9(0x1ee)](_0xc80369)-Math[_0x1b07d9(0x1ee)](_0x3efe81))*(Math['min'](_0x1d651a,0x1e)*0.5);},Spriteset_Base['prototype'][_0xa0779(0x33d)]=function(){const _0x21c8e4=_0xa0779,_0x391f78=VisuMZ[_0x21c8e4(0x824)][_0x21c8e4(0x17f)][_0x21c8e4(0x719)];if(_0x391f78&&_0x391f78[_0x21c8e4(0x4a5)]){if(_0x21c8e4(0x729)===_0x21c8e4(0x729))return _0x391f78[_0x21c8e4(0x4a5)][_0x21c8e4(0x398)](this);else{if(_0x106260)_0xc3b44f[_0x21c8e4(0x96b)](_0xeea2c8);}}const _0x9593c2=$gameScreen[_0x21c8e4(0x527)]*0.75,_0x20987e=$gameScreen[_0x21c8e4(0x379)]*0.6,_0x30536e=$gameScreen[_0x21c8e4(0x5e8)];this['x']+=Math['round'](Math[_0x21c8e4(0x1ee)](_0x9593c2)-Math[_0x21c8e4(0x1ee)](_0x20987e))*(Math[_0x21c8e4(0x15d)](_0x30536e,0x1e)*0.5);},Spriteset_Base[_0xa0779(0x271)][_0xa0779(0x732)]=function(){const _0x5300c2=_0xa0779,_0x3c0c63=VisuMZ[_0x5300c2(0x824)][_0x5300c2(0x17f)][_0x5300c2(0x719)];if(_0x3c0c63&&_0x3c0c63['vertJS'])return'ExqSP'!=='ExqSP'?_0x195fe8[_0x5300c2(0x36e)](_0xf6d131,'[',']'):_0x3c0c63[_0x5300c2(0x2a7)]['call'](this);const _0x3ac433=$gameScreen['_shakePower']*0.75,_0x585e67=$gameScreen['_shakeSpeed']*0.6,_0x4c95c5=$gameScreen[_0x5300c2(0x5e8)];this['y']+=Math[_0x5300c2(0x4ee)](Math[_0x5300c2(0x1ee)](_0x3ac433)-Math[_0x5300c2(0x1ee)](_0x585e67))*(Math[_0x5300c2(0x15d)](_0x4c95c5,0x1e)*0.5);},Spriteset_Base['prototype'][_0xa0779(0x832)]=function(){const _0x20c8d5=_0xa0779;for(const _0x522e28 of this[_0x20c8d5(0x2a6)]){if('sHFaA'!==_0x20c8d5(0x41a)){if(!_0x265d59['isPlaytest']())return;if(!_0x10cb3b[_0x20c8d5(0x812)]())return;_0x3fc4a6['_scene'][_0x20c8d5(0x438)]=![],_0x2dfa12[_0x20c8d5(0x824)][_0x20c8d5(0x159)]();}else{if(!_0x522e28[_0x20c8d5(0x5b5)]()){if(_0x20c8d5(0x3b5)===_0x20c8d5(0x3b5))this[_0x20c8d5(0x1b4)](_0x522e28);else return this[_0x20c8d5(0x2c8)]();}}}this[_0x20c8d5(0x976)]();},Spriteset_Base[_0xa0779(0x271)]['processFauxAnimationRequests']=function(){const _0x40a14b=_0xa0779;for(;;){if('YESmg'!==_0x40a14b(0x1ac)){const _0x5c5da9=$gameTemp[_0x40a14b(0x31d)]();if(_0x5c5da9)this[_0x40a14b(0x2e8)](_0x5c5da9);else{if('bXjTa'===_0x40a14b(0x23e))break;else{if(this[_0x40a14b(0x1e7)]===_0x40a14b(0x4ba)&&!_0x1e7203[_0x40a14b(0x771)]())return;if(_0x4b659a[_0x40a14b(0x3f5)]())return;_0xb51a86[_0x40a14b(0x824)][_0x40a14b(0x251)][_0x40a14b(0x398)](this,_0x5ca284),this['switchModes'](_0x40a14b(0x366));}}}else{const _0x1f927c=_0x5e3d32[_0x5b9366];if(!_0x1f927c)return'';let _0x1b67fe='';_0x1b67fe+=_0x1f927c[_0x40a14b(0x912)];for(const _0x5abc5e of _0x1f927c[_0x40a14b(0x89f)]){for(const _0x5c40a3 of _0x5abc5e[_0x40a14b(0x591)]){[0x6c,0x198][_0x40a14b(0x84f)](_0x5c40a3[_0x40a14b(0x679)])&&(_0x1b67fe+='\x0a',_0x1b67fe+=_0x5c40a3[_0x40a14b(0x89e)][0x0]);}}return _0x1b67fe;}}},Spriteset_Base[_0xa0779(0x271)][_0xa0779(0x2e8)]=function(_0x5d7867){const _0x5c22d8=_0xa0779,_0x5e8240=$dataAnimations[_0x5d7867[_0x5c22d8(0x22f)]],_0x369adf=_0x5d7867[_0x5c22d8(0x66d)],_0xf00dc0=_0x5d7867[_0x5c22d8(0x1f5)],_0x596f03=_0x5d7867[_0x5c22d8(0x6f1)];let _0x2ad531=this[_0x5c22d8(0x86c)]();const _0x1fd123=this[_0x5c22d8(0x82b)]();if(this[_0x5c22d8(0x262)](_0x5e8240))for(const _0x5d3483 of _0x369adf){if('HWlSF'!==_0x5c22d8(0x1b2))this[_0x5c22d8(0x8ea)]([_0x5d3483],_0x5e8240,_0xf00dc0,_0x2ad531,_0x596f03),_0x2ad531+=_0x1fd123;else{if(_0x1f02dc)_0x45e34e['ParseActorNotetags'](_0x1c9288);}}else'mlvVE'!==_0x5c22d8(0x33b)?this[_0x5c22d8(0x8ea)](_0x369adf,_0x5e8240,_0xf00dc0,_0x2ad531,_0x596f03):_0x3d2cc7['isPressed'](_0x5c22d8(0x41f))&&this['allowShiftScrolling']()?this[_0x5c22d8(0x915)]():this[_0x5c22d8(0x386)](_0x40b357[_0x5c22d8(0x5ff)]('up'));},Spriteset_Base[_0xa0779(0x271)][_0xa0779(0x1d2)]=function(_0x3f7007,_0x1bb2c7,_0x48073f,_0x395d6e){const _0x91863d=_0xa0779,_0x365345=this[_0x91863d(0x47b)](_0x1bb2c7),_0x14fb40=new(_0x365345?Sprite_AnimationMV:Sprite_Animation)(),_0x170e56=this[_0x91863d(0x3d5)](_0x3f7007),_0x5b6f3b=this[_0x91863d(0x86c)](),_0x35e40c=_0x395d6e>_0x5b6f3b?this[_0x91863d(0x7ca)]():null;this[_0x91863d(0x4c7)](_0x3f7007[0x0])&&('pkviM'!==_0x91863d(0x8c3)?_0x48073f=!_0x48073f:_0x4acea8=_0x579b0a['RevertPreserveNumbers'](_0x1f2b40)),_0x14fb40[_0x91863d(0x3b1)]=_0x3f7007,_0x14fb40[_0x91863d(0x5e9)](_0x170e56,_0x1bb2c7,_0x48073f,_0x395d6e,_0x35e40c),this[_0x91863d(0x9db)](_0x14fb40),this[_0x91863d(0x3aa)]['push'](_0x14fb40);},Spriteset_Base[_0xa0779(0x271)]['createFauxAnimationSprite']=function(_0x15fa13,_0x56088a,_0x2292e5,_0x2bd781,_0x38e19d){const _0x102e0a=_0xa0779,_0x3d13ba=this['isMVAnimation'](_0x56088a),_0x58c3c6=new(_0x3d13ba?Sprite_AnimationMV:Sprite_Animation)(),_0x3ee7c8=this[_0x102e0a(0x3d5)](_0x15fa13);if(this[_0x102e0a(0x4c7)](_0x15fa13[0x0])){if(_0x102e0a(0x9c2)!==_0x102e0a(0x72e))_0x2292e5=!_0x2292e5;else{if(!this['_animation']);const _0x4ca19c=this[_0x102e0a(0x54e)][_0x102e0a(0x912)]||'';_0x4ca19c[_0x102e0a(0x758)](/<RATE:[ ](\d+)>/i)&&(this['_rate']=(_0x1be28f(_0x3d6883['$1'])||0x1)[_0x102e0a(0x1f6)](0x1,0xa));}}_0x58c3c6['targetObjects']=_0x15fa13,_0x58c3c6[_0x102e0a(0x5e9)](_0x3ee7c8,_0x56088a,_0x2292e5,_0x2bd781),_0x58c3c6[_0x102e0a(0x862)](_0x38e19d),this['addAnimationSpriteToContainer'](_0x58c3c6);if(this['_animationSprites'])this['_animationSprites'][_0x102e0a(0x99c)](_0x58c3c6);this[_0x102e0a(0x2a6)]['push'](_0x58c3c6);},Spriteset_Base['prototype'][_0xa0779(0x9db)]=function(_0x382e08){this['_effectsContainer']['addChild'](_0x382e08);},Spriteset_Base['prototype'][_0xa0779(0x3a6)]=function(_0x2044b2){const _0x3434d1=_0xa0779;this[_0x3434d1(0x3aa)][_0x3434d1(0x99c)](_0x2044b2),this[_0x3434d1(0x895)](_0x2044b2);for(const _0x619b1b of _0x2044b2[_0x3434d1(0x3b1)]){_0x619b1b[_0x3434d1(0x2de)]&&_0x619b1b[_0x3434d1(0x2de)]();}_0x2044b2[_0x3434d1(0x372)]();},Spriteset_Base['prototype'][_0xa0779(0x1b4)]=function(_0x55e5ae){const _0xb1e4ee=_0xa0779;this['_fauxAnimationSprites']['remove'](_0x55e5ae),this[_0xb1e4ee(0x895)](_0x55e5ae);for(const _0x573617 of _0x55e5ae[_0xb1e4ee(0x3b1)]){_0x573617[_0xb1e4ee(0x2de)]&&_0x573617[_0xb1e4ee(0x2de)]();}_0x55e5ae[_0xb1e4ee(0x372)]();},Spriteset_Base['prototype'][_0xa0779(0x895)]=function(_0x2b48e9){const _0x1b28fb=_0xa0779;this[_0x1b28fb(0x214)][_0x1b28fb(0x423)](_0x2b48e9);},Spriteset_Base[_0xa0779(0x271)][_0xa0779(0x42a)]=function(){const _0x40f51d=_0xa0779;for(const _0x37aaf4 of this[_0x40f51d(0x2a6)]){if(_0x40f51d(0x345)===_0x40f51d(0x345))this[_0x40f51d(0x1b4)](_0x37aaf4);else return this['EnableNameInput']()?_0x1d209a[_0x40f51d(0x170)](_0x40f51d(0x796)):_0x397f1e[_0x40f51d(0x271)][_0x40f51d(0x898)][_0x40f51d(0x398)](this);}},Spriteset_Base[_0xa0779(0x271)][_0xa0779(0x93d)]=function(){const _0x25ca5c=_0xa0779;return this[_0x25ca5c(0x2a6)][_0x25ca5c(0x444)]>0x0;},Spriteset_Base[_0xa0779(0x271)]['updatePointAnimations']=function(){const _0x11abca=_0xa0779;for(const _0x1f22f2 of this[_0x11abca(0x612)]){if('qJdDD'===_0x11abca(0x3b4))!_0x1f22f2[_0x11abca(0x5b5)]()&&this['removePointAnimation'](_0x1f22f2);else return _0x294acb[_0x11abca(0x824)][_0x11abca(0x9b5)][_0x2e4c2c]===_0x11abca(0x52a)?_0x1e16f5:_0x34693c((_0x233091*0x64)['toFixed'](_0x1bf61a))+'%';}this['processPointAnimationRequests']();},Spriteset_Base['prototype'][_0xa0779(0x19b)]=function(){const _0x3ee148=_0xa0779;for(;;){if(_0x3ee148(0x629)===_0x3ee148(0x460))_0x52c211[_0x3ee148(0x824)][_0x3ee148(0x638)]['call'](this),_0x890d3=null,_0x3a37bc=null,_0x29cec9=null,_0xd3fba5=null;else{const _0x4b9f45=$gameTemp[_0x3ee148(0x7e9)]();if(_0x4b9f45)_0x3ee148(0x5b0)===_0x3ee148(0x5b0)?this['createPointAnimation'](_0x4b9f45):_0x14c715('Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.'[_0x3ee148(0x6ad)](_0x32a388));else break;}}},Spriteset_Base[_0xa0779(0x271)][_0xa0779(0x9a5)]=function(_0x4d03db){const _0x5ee8bc=_0xa0779,_0x307445=$dataAnimations[_0x4d03db[_0x5ee8bc(0x22f)]],_0x4f7246=this['createPointAnimationTargets'](_0x4d03db),_0x2e0c41=_0x4d03db[_0x5ee8bc(0x1f5)],_0x25b361=_0x4d03db['mute'];let _0xfc46e8=this[_0x5ee8bc(0x86c)]();const _0x3075e2=this[_0x5ee8bc(0x82b)]();if(this[_0x5ee8bc(0x262)](_0x307445))for(const _0x597cf8 of _0x4f7246){this[_0x5ee8bc(0x599)]([_0x597cf8],_0x307445,_0x2e0c41,_0xfc46e8,_0x25b361),_0xfc46e8+=_0x3075e2;}else this[_0x5ee8bc(0x599)](_0x4f7246,_0x307445,_0x2e0c41,_0xfc46e8,_0x25b361);},Spriteset_Base[_0xa0779(0x271)]['createPointAnimationTargets']=function(_0x14ac80){const _0x546d00=_0xa0779,_0x248e71=new Sprite_Clickable();_0x248e71['x']=_0x14ac80['x'],_0x248e71['y']=_0x14ac80['y'],_0x248e71['z']=0x64;const _0x14171e=this[_0x546d00(0x587)]();return _0x14171e['addChild'](_0x248e71),[_0x248e71];},Spriteset_Base[_0xa0779(0x271)][_0xa0779(0x587)]=function(){return this;},Spriteset_Map['prototype'][_0xa0779(0x587)]=function(){const _0x5f0d0d=_0xa0779;return this[_0x5f0d0d(0x5eb)]||this;},Spriteset_Battle[_0xa0779(0x271)][_0xa0779(0x587)]=function(){return this['_battleField']||this;},Spriteset_Base[_0xa0779(0x271)]['createPointAnimationSprite']=function(_0x5c3306,_0x29a3d6,_0x1ef999,_0x38247a,_0x150ce6){const _0x3baf12=_0xa0779,_0x3bddb1=this[_0x3baf12(0x47b)](_0x29a3d6),_0x5d0927=new(_0x3bddb1?Sprite_AnimationMV:Sprite_Animation)();_0x5d0927[_0x3baf12(0x3b1)]=_0x5c3306,_0x5d0927[_0x3baf12(0x5e9)](_0x5c3306,_0x29a3d6,_0x1ef999,_0x38247a),_0x5d0927[_0x3baf12(0x862)](_0x150ce6),this[_0x3baf12(0x214)][_0x3baf12(0x894)](_0x5d0927),this[_0x3baf12(0x612)][_0x3baf12(0x55f)](_0x5d0927);},Spriteset_Base[_0xa0779(0x271)][_0xa0779(0x308)]=function(_0x2ee4aa){const _0x478b5c=_0xa0779;this[_0x478b5c(0x612)][_0x478b5c(0x99c)](_0x2ee4aa),this[_0x478b5c(0x214)][_0x478b5c(0x423)](_0x2ee4aa);for(const _0x47a8e3 of _0x2ee4aa[_0x478b5c(0x3b1)]){if(_0x478b5c(0x6ee)===_0x478b5c(0x6ee)){_0x47a8e3['endAnimation']&&_0x47a8e3[_0x478b5c(0x2de)]();const _0x45daa0=this[_0x478b5c(0x587)]();if(_0x45daa0)_0x45daa0[_0x478b5c(0x423)](_0x47a8e3);}else{const _0x284750=_0x57c098[_0x478b5c(0x579)](_0x23380d,_0x1478ae)[_0x478b5c(0x7ae)](_0x40c7c5=>_0x40c7c5[_0x478b5c(0x184)]());return _0x284750[_0x478b5c(0x444)]>0x0;}}_0x2ee4aa[_0x478b5c(0x372)]();},Spriteset_Base[_0xa0779(0x271)]['removeAllPointAnimations']=function(){const _0x4b763d=_0xa0779;for(const _0x601a8f of this[_0x4b763d(0x612)]){this[_0x4b763d(0x308)](_0x601a8f);}},Spriteset_Base[_0xa0779(0x271)][_0xa0779(0x32e)]=function(){const _0x2028a5=_0xa0779;return this[_0x2028a5(0x612)]['length']>0x0;},VisuMZ['CoreEngine'][_0xa0779(0x15f)]=Spriteset_Base[_0xa0779(0x271)][_0xa0779(0x40d)],Spriteset_Base[_0xa0779(0x271)][_0xa0779(0x40d)]=function(){const _0x4ed225=_0xa0779;return VisuMZ[_0x4ed225(0x824)]['Spriteset_Base_isAnimationPlaying'][_0x4ed225(0x398)](this)||this[_0x4ed225(0x32e)]();},Spriteset_Map[_0xa0779(0x50c)]=VisuMZ[_0xa0779(0x824)][_0xa0779(0x17f)][_0xa0779(0x2b0)]['DetachMapPictureContainer']||![],VisuMZ[_0xa0779(0x824)]['Scene_Map_createSpriteset_detach']=Scene_Map[_0xa0779(0x271)]['createSpriteset'],Scene_Map['prototype']['createSpriteset']=function(){const _0x17fa18=_0xa0779;VisuMZ[_0x17fa18(0x824)]['Scene_Map_createSpriteset_detach']['call'](this);if(!Spriteset_Map[_0x17fa18(0x50c)])return;const _0x3fd4e5=this['_spriteset'];if(!_0x3fd4e5)return;this[_0x17fa18(0x7a7)]=_0x3fd4e5[_0x17fa18(0x7a7)];if(!this['_pictureContainer'])return;this['addChild'](this['_pictureContainer']);},Spriteset_Battle[_0xa0779(0x50c)]=VisuMZ[_0xa0779(0x824)][_0xa0779(0x17f)]['QoL']['DetachBattlePictureContainer']||![],VisuMZ[_0xa0779(0x824)][_0xa0779(0x4b1)]=Scene_Battle['prototype'][_0xa0779(0x1e3)],Scene_Battle['prototype']['createSpriteset']=function(){const _0x4a0b07=_0xa0779;VisuMZ[_0x4a0b07(0x824)][_0x4a0b07(0x4b1)][_0x4a0b07(0x398)](this);if(!Spriteset_Battle[_0x4a0b07(0x50c)])return;const _0x375311=this[_0x4a0b07(0x1e1)];if(!_0x375311)return;this[_0x4a0b07(0x7a7)]=_0x375311[_0x4a0b07(0x7a7)];if(!this[_0x4a0b07(0x7a7)])return;this[_0x4a0b07(0x894)](this[_0x4a0b07(0x7a7)]);},Spriteset_Battle[_0xa0779(0x271)][_0xa0779(0x786)]=function(){const _0x3e891f=_0xa0779;this[_0x3e891f(0x5a0)]=new PIXI['filters'][(_0x3e891f(0x857))](clamp=!![]),this[_0x3e891f(0x760)]=new Sprite(),this['_backgroundSprite'][_0x3e891f(0x346)]=SceneManager['backgroundBitmap'](),this[_0x3e891f(0x760)][_0x3e891f(0x7f0)]=[this['_backgroundFilter']],this[_0x3e891f(0x252)][_0x3e891f(0x894)](this[_0x3e891f(0x760)]);},VisuMZ['CoreEngine'][_0xa0779(0x6ef)]=Spriteset_Battle[_0xa0779(0x271)][_0xa0779(0x6c0)],Spriteset_Battle['prototype'][_0xa0779(0x6c0)]=function(){const _0x434131=_0xa0779;if(this[_0x434131(0x5c9)]()){if(_0x434131(0x960)===_0x434131(0x716))return _0x25df21[_0x434131(0x824)][_0x434131(0x17f)][_0x434131(0x2c3)][_0x434131(0x4aa)];else this['repositionEnemiesByResolution']();}VisuMZ['CoreEngine'][_0x434131(0x6ef)][_0x434131(0x398)](this);},Spriteset_Battle[_0xa0779(0x271)][_0xa0779(0x5c9)]=function(){const _0x21228d=_0xa0779,_0xd20627=VisuMZ['CoreEngine'][_0x21228d(0x17f)][_0x21228d(0x4d9)];if(!_0xd20627)return![];if(Utils[_0x21228d(0x165)]>=_0x21228d(0x9af)&&!_0xd20627[_0x21228d(0x8e2)])return _0x21228d(0x817)!==_0x21228d(0x817)?(_0x4533cd[_0x21228d(0x925)](),_0x58e27d[_0x21228d(0x772)](),this[_0x21228d(0x997)](),!![]):![];return _0xd20627[_0x21228d(0x480)];},Spriteset_Battle[_0xa0779(0x271)][_0xa0779(0x574)]=function(){const _0xe29fec=_0xa0779;for(member of $gameTroop[_0xe29fec(0x88c)]()){member[_0xe29fec(0x71f)]();}},VisuMZ[_0xa0779(0x824)][_0xa0779(0x8c8)]=Window_Base[_0xa0779(0x271)]['initialize'],Window_Base[_0xa0779(0x271)][_0xa0779(0x288)]=function(_0x3be1df){const _0x3d26ef=_0xa0779;_0x3be1df['x']=Math[_0x3d26ef(0x4ee)](_0x3be1df['x']),_0x3be1df['y']=Math[_0x3d26ef(0x4ee)](_0x3be1df['y']),_0x3be1df['width']=Math[_0x3d26ef(0x4ee)](_0x3be1df[_0x3d26ef(0x3c5)]),_0x3be1df[_0x3d26ef(0x7f6)]=Math[_0x3d26ef(0x4ee)](_0x3be1df[_0x3d26ef(0x7f6)]),this[_0x3d26ef(0x479)](),VisuMZ[_0x3d26ef(0x824)][_0x3d26ef(0x8c8)][_0x3d26ef(0x398)](this,_0x3be1df),this[_0x3d26ef(0x828)]();},Window_Base[_0xa0779(0x271)][_0xa0779(0x479)]=function(){const _0x10d26a=_0xa0779;this[_0x10d26a(0x20b)]=VisuMZ[_0x10d26a(0x824)][_0x10d26a(0x17f)][_0x10d26a(0x2b0)][_0x10d26a(0x57b)],this[_0x10d26a(0x48d)]=VisuMZ['CoreEngine'][_0x10d26a(0x17f)][_0x10d26a(0x2b0)][_0x10d26a(0x307)];},Window_Base[_0xa0779(0x271)][_0xa0779(0x981)]=function(){const _0x1a2bd8=_0xa0779;return VisuMZ[_0x1a2bd8(0x824)][_0x1a2bd8(0x17f)][_0x1a2bd8(0x1ce)][_0x1a2bd8(0x506)];},Window_Base[_0xa0779(0x271)]['itemPadding']=function(){const _0x134739=_0xa0779;return VisuMZ[_0x134739(0x824)][_0x134739(0x17f)]['Window'][_0x134739(0x60b)];},Window_Base[_0xa0779(0x271)]['updateBackOpacity']=function(){const _0x3a4162=_0xa0779;if($gameSystem[_0x3a4162(0x7bb)])this[_0x3a4162(0x27f)]=$gameSystem[_0x3a4162(0x7bb)]();else{if(_0x3a4162(0x40f)==='wZKsz')this[_0x3a4162(0x27f)]=VisuMZ[_0x3a4162(0x824)]['Settings'][_0x3a4162(0x1ce)][_0x3a4162(0x965)];else{this[_0x3a4162(0x204)][_0x3a4162(0x653)]();for(let _0x1f64e6=0x1;_0x1f64e6<=0x5;_0x1f64e6++){this[_0x3a4162(0x62a)](_0x1f64e6);}}}},Window_Base['prototype'][_0xa0779(0x91c)]=function(){const _0x789cd9=_0xa0779;return VisuMZ[_0x789cd9(0x824)][_0x789cd9(0x17f)]['Window'][_0x789cd9(0x5bb)];},Window_Base[_0xa0779(0x271)][_0xa0779(0x57e)]=function(){const _0x48199e=_0xa0779;return VisuMZ[_0x48199e(0x824)]['Settings'][_0x48199e(0x1ce)][_0x48199e(0x9c6)];},VisuMZ['CoreEngine'][_0xa0779(0x858)]=Window_Base[_0xa0779(0x271)][_0xa0779(0x6be)],Window_Base[_0xa0779(0x271)][_0xa0779(0x6be)]=function(){const _0x59df19=_0xa0779;VisuMZ[_0x59df19(0x824)][_0x59df19(0x858)]['call'](this),this[_0x59df19(0x780)]();},Window_Base[_0xa0779(0x271)]['updateOpen']=function(){const _0x23887b=_0xa0779;this['_opening']&&(this['openness']+=this[_0x23887b(0x57e)](),this[_0x23887b(0x734)]()&&(this['_opening']=![]));},Window_Base[_0xa0779(0x271)]['updateClose']=function(){const _0x311b1b=_0xa0779;this[_0x311b1b(0x241)]&&(this['openness']-=this[_0x311b1b(0x57e)](),this[_0x311b1b(0x4af)]()&&('DYJQA'==='eVEmN'?(this[_0x311b1b(0x59b)]=![],this[_0x311b1b(0x2b9)]=!_0x3eba2f[_0x311b1b(0x824)][_0x311b1b(0x17f)]['UI'][_0x311b1b(0x4b6)]):this[_0x311b1b(0x241)]=![]));},VisuMZ[_0xa0779(0x824)]['Window_Base_drawText']=Window_Base[_0xa0779(0x271)][_0xa0779(0x65f)],Window_Base[_0xa0779(0x271)][_0xa0779(0x65f)]=function(_0x2fa5ce,_0x3cfca5,_0x4485e2,_0x4c4f62,_0x115ce0){const _0x324ed0=_0xa0779;if(this[_0x324ed0(0x782)]())_0x2fa5ce=VisuMZ[_0x324ed0(0x82a)](_0x2fa5ce);VisuMZ['CoreEngine']['Window_Base_drawText'][_0x324ed0(0x398)](this,_0x2fa5ce,_0x3cfca5,_0x4485e2,_0x4c4f62,_0x115ce0);},Window_Base[_0xa0779(0x271)][_0xa0779(0x782)]=function(){const _0x4900a3=_0xa0779;return this[_0x4900a3(0x20b)];},VisuMZ['CoreEngine']['Window_Base_createTextState']=Window_Base[_0xa0779(0x271)][_0xa0779(0x593)],Window_Base[_0xa0779(0x271)][_0xa0779(0x593)]=function(_0x4c654c,_0x5059eb,_0x16fc74,_0x524555){const _0x2a591d=_0xa0779;var _0x2ff393=VisuMZ['CoreEngine'][_0x2a591d(0x54d)][_0x2a591d(0x398)](this,_0x4c654c,_0x5059eb,_0x16fc74,_0x524555);if(this[_0x2a591d(0x6f2)]())_0x2ff393[_0x2a591d(0x697)]=VisuMZ[_0x2a591d(0x82a)](_0x2ff393[_0x2a591d(0x697)]);return _0x2ff393;},Window_Base['prototype'][_0xa0779(0x6f2)]=function(){const _0x3facc8=_0xa0779;return this[_0x3facc8(0x48d)];},Window_Base['prototype'][_0xa0779(0x422)]=function(_0xc72d10){const _0x3926f3=_0xa0779;this[_0x3926f3(0x20b)]=_0xc72d10;},Window_Base[_0xa0779(0x271)][_0xa0779(0x149)]=function(_0x3455cd){this['_digitGroupingEx']=_0x3455cd;},VisuMZ['CoreEngine'][_0xa0779(0x4d5)]=Window_Base[_0xa0779(0x271)][_0xa0779(0x84b)],Window_Base[_0xa0779(0x271)][_0xa0779(0x84b)]=function(_0x3d9a0d,_0xf2fb2,_0x4a3558){const _0x78ae4f=_0xa0779;_0xf2fb2=Math[_0x78ae4f(0x4ee)](_0xf2fb2),_0x4a3558=Math[_0x78ae4f(0x4ee)](_0x4a3558),VisuMZ[_0x78ae4f(0x824)][_0x78ae4f(0x4d5)]['call'](this,_0x3d9a0d,_0xf2fb2,_0x4a3558);},VisuMZ[_0xa0779(0x824)]['Window_Base_drawFace']=Window_Base[_0xa0779(0x271)]['drawFace'],Window_Base[_0xa0779(0x271)][_0xa0779(0x3da)]=function(_0xb72d66,_0x1178f0,_0x2890dd,_0x18dc0a,_0x54ff95,_0x1c4283){const _0x2dfb66=_0xa0779;_0x54ff95=_0x54ff95||ImageManager[_0x2dfb66(0x51c)],_0x1c4283=_0x1c4283||ImageManager[_0x2dfb66(0x4b9)],_0x2890dd=Math[_0x2dfb66(0x4ee)](_0x2890dd),_0x18dc0a=Math[_0x2dfb66(0x4ee)](_0x18dc0a),_0x54ff95=Math[_0x2dfb66(0x4ee)](_0x54ff95),_0x1c4283=Math[_0x2dfb66(0x4ee)](_0x1c4283),VisuMZ[_0x2dfb66(0x824)][_0x2dfb66(0x3f7)]['call'](this,_0xb72d66,_0x1178f0,_0x2890dd,_0x18dc0a,_0x54ff95,_0x1c4283);},VisuMZ['CoreEngine'][_0xa0779(0x749)]=Window_Base[_0xa0779(0x271)][_0xa0779(0x222)],Window_Base[_0xa0779(0x271)]['drawCharacter']=function(_0x300959,_0x190c0e,_0x1f11bb,_0x7e303){const _0x1e1bc6=_0xa0779;_0x1f11bb=Math[_0x1e1bc6(0x4ee)](_0x1f11bb),_0x7e303=Math[_0x1e1bc6(0x4ee)](_0x7e303),VisuMZ[_0x1e1bc6(0x824)][_0x1e1bc6(0x749)]['call'](this,_0x300959,_0x190c0e,_0x1f11bb,_0x7e303);},VisuMZ['CoreEngine']['Window_Selectable_itemRect']=Window_Selectable[_0xa0779(0x271)][_0xa0779(0x80b)],Window_Selectable[_0xa0779(0x271)][_0xa0779(0x80b)]=function(_0x477eea){const _0x18209c=_0xa0779;let _0x3d0886=VisuMZ[_0x18209c(0x824)][_0x18209c(0x8f7)][_0x18209c(0x398)](this,_0x477eea);return _0x3d0886['x']=Math[_0x18209c(0x4ee)](_0x3d0886['x']),_0x3d0886['y']=Math[_0x18209c(0x4ee)](_0x3d0886['y']),_0x3d0886[_0x18209c(0x3c5)]=Math[_0x18209c(0x4ee)](_0x3d0886[_0x18209c(0x3c5)]),_0x3d0886[_0x18209c(0x7f6)]=Math[_0x18209c(0x4ee)](_0x3d0886['height']),_0x3d0886;},VisuMZ[_0xa0779(0x824)]['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase[_0xa0779(0x271)][_0xa0779(0x4e2)],Window_StatusBase[_0xa0779(0x271)][_0xa0779(0x4e2)]=function(_0x300edd,_0xd27a3c,_0x553608){const _0x1de4db=_0xa0779;_0xd27a3c=Math[_0x1de4db(0x4ee)](_0xd27a3c),_0x553608=Math[_0x1de4db(0x4ee)](_0x553608),VisuMZ['CoreEngine']['Window_StatusBase_drawActorSimpleStatus']['call'](this,_0x300edd,_0xd27a3c,_0x553608);},Window_Base[_0xa0779(0x271)][_0xa0779(0x828)]=function(){const _0x1f21c0=_0xa0779;this[_0x1f21c0(0x4fe)]={'duration':0x0,'wholeDuration':0x0,'type':_0x1f21c0(0x22b),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x1f21c0(0x21c)]['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this[_0x1f21c0(0x645)],'targetBackOpacity':this[_0x1f21c0(0x27f)],'targetContentsOpacity':this[_0x1f21c0(0x681)]};},Window_Base[_0xa0779(0x271)][_0xa0779(0x780)]=function(){const _0x2fbab6=_0xa0779;if(!this[_0x2fbab6(0x4fe)])return;if(this['_coreEasing'][_0x2fbab6(0x86b)]<=0x0)return;this['x']=this[_0x2fbab6(0x586)](this['x'],this[_0x2fbab6(0x4fe)][_0x2fbab6(0x83c)]),this['y']=this['applyCoreEasing'](this['y'],this[_0x2fbab6(0x4fe)][_0x2fbab6(0x14e)]),this[_0x2fbab6(0x21c)]['x']=this[_0x2fbab6(0x586)](this[_0x2fbab6(0x21c)]['x'],this['_coreEasing'][_0x2fbab6(0x1aa)]),this['scale']['y']=this['applyCoreEasing'](this[_0x2fbab6(0x21c)]['y'],this[_0x2fbab6(0x4fe)]['targetScaleY']),this[_0x2fbab6(0x645)]=this[_0x2fbab6(0x586)](this[_0x2fbab6(0x645)],this['_coreEasing']['targetOpacity']),this['backOpacity']=this[_0x2fbab6(0x586)](this[_0x2fbab6(0x27f)],this[_0x2fbab6(0x4fe)]['targetBackOpacity']),this[_0x2fbab6(0x681)]=this[_0x2fbab6(0x586)](this[_0x2fbab6(0x681)],this[_0x2fbab6(0x4fe)][_0x2fbab6(0x8ba)]),this[_0x2fbab6(0x4fe)][_0x2fbab6(0x86b)]--;},Window_Base[_0xa0779(0x271)][_0xa0779(0x586)]=function(_0x36aa15,_0x526c71){const _0xb88162=_0xa0779;if(!this[_0xb88162(0x4fe)])return _0x526c71;const _0x11d7ec=this[_0xb88162(0x4fe)][_0xb88162(0x86b)],_0x3ee8ce=this[_0xb88162(0x4fe)][_0xb88162(0x3bc)],_0x2c2901=this[_0xb88162(0x72b)]((_0x3ee8ce-_0x11d7ec)/_0x3ee8ce),_0x3481a7=this['calcCoreEasing']((_0x3ee8ce-_0x11d7ec+0x1)/_0x3ee8ce),_0x4acfe3=(_0x36aa15-_0x526c71*_0x2c2901)/(0x1-_0x2c2901);return _0x4acfe3+(_0x526c71-_0x4acfe3)*_0x3481a7;},Window_Base['prototype']['calcCoreEasing']=function(_0x1e7dae){const _0x26b97d=_0xa0779;if(!this[_0x26b97d(0x4fe)])return _0x1e7dae;return VisuMZ[_0x26b97d(0x25a)](_0x1e7dae,this[_0x26b97d(0x4fe)][_0x26b97d(0x560)]||_0x26b97d(0x22b));},Window_Base['prototype'][_0xa0779(0x61e)]=function(_0x4e3e83,_0x19565b){const _0x5903fe=_0xa0779;if(!this['_coreEasing'])return;this['x']=this[_0x5903fe(0x4fe)]['targetX'],this['y']=this['_coreEasing'][_0x5903fe(0x14e)],this[_0x5903fe(0x21c)]['x']=this[_0x5903fe(0x4fe)]['targetScaleX'],this[_0x5903fe(0x21c)]['y']=this[_0x5903fe(0x4fe)][_0x5903fe(0x6a5)],this[_0x5903fe(0x645)]=this['_coreEasing'][_0x5903fe(0x5fb)],this[_0x5903fe(0x27f)]=this[_0x5903fe(0x4fe)]['targetBackOpacity'],this[_0x5903fe(0x681)]=this[_0x5903fe(0x4fe)][_0x5903fe(0x8ba)],this[_0x5903fe(0x90d)](_0x4e3e83,_0x19565b,this['x'],this['y'],this[_0x5903fe(0x21c)]['x'],this[_0x5903fe(0x21c)]['y'],this[_0x5903fe(0x645)],this[_0x5903fe(0x27f)],this[_0x5903fe(0x681)]);},Window_Base[_0xa0779(0x271)]['setupCoreEasing']=function(_0x287ed9,_0x1f78e8,_0x323fbb,_0x3642a0,_0x46f4dd,_0xa62938,_0x595e8f,_0x4468b3,_0x5537e6){const _0x209728=_0xa0779;this[_0x209728(0x4fe)]={'duration':_0x287ed9,'wholeDuration':_0x287ed9,'type':_0x1f78e8,'targetX':_0x323fbb,'targetY':_0x3642a0,'targetScaleX':_0x46f4dd,'targetScaleY':_0xa62938,'targetOpacity':_0x595e8f,'targetBackOpacity':_0x4468b3,'targetContentsOpacity':_0x5537e6};},Window_Base[_0xa0779(0x271)]['drawCurrencyValue']=function(_0x1c2e22,_0x2ca3b0,_0x3b0c7d,_0x544233,_0x2ad4f8){const _0x5f56ca=_0xa0779;this[_0x5f56ca(0x44d)](),this[_0x5f56ca(0x204)][_0x5f56ca(0x9b9)]=VisuMZ[_0x5f56ca(0x824)]['Settings'][_0x5f56ca(0x1d6)][_0x5f56ca(0x838)];const _0x49a813=VisuMZ[_0x5f56ca(0x824)][_0x5f56ca(0x17f)]['Gold']['GoldIcon'];if(_0x49a813>0x0&&_0x2ca3b0===TextManager[_0x5f56ca(0x929)]){const _0x4e5b7b=_0x544233+(this[_0x5f56ca(0x981)]()-ImageManager[_0x5f56ca(0x7fa)])/0x2;this[_0x5f56ca(0x84b)](_0x49a813,_0x3b0c7d+(_0x2ad4f8-ImageManager[_0x5f56ca(0x49c)]),_0x4e5b7b),_0x2ad4f8-=ImageManager['iconWidth']+0x4;}else this['changeTextColor'](ColorManager['systemColor']()),this['drawText'](_0x2ca3b0,_0x3b0c7d,_0x544233,_0x2ad4f8,'right'),_0x2ad4f8-=this[_0x5f56ca(0x1a9)](_0x2ca3b0)+0x6;this[_0x5f56ca(0x5fe)]();const _0x363f00=this[_0x5f56ca(0x1a9)](this[_0x5f56ca(0x20b)]?VisuMZ[_0x5f56ca(0x82a)](_0x1c2e22):_0x1c2e22);_0x363f00>_0x2ad4f8?this[_0x5f56ca(0x65f)](VisuMZ[_0x5f56ca(0x824)][_0x5f56ca(0x17f)]['Gold'][_0x5f56ca(0x561)],_0x3b0c7d,_0x544233,_0x2ad4f8,_0x5f56ca(0x4b5)):this[_0x5f56ca(0x65f)](_0x1c2e22,_0x3b0c7d,_0x544233,_0x2ad4f8,_0x5f56ca(0x4b5)),this[_0x5f56ca(0x44d)]();},Window_Base[_0xa0779(0x271)][_0xa0779(0x420)]=function(_0x196061,_0x1ac00c,_0x1ad09a,_0x12fb72,_0xf52c91){const _0x22bc08=_0xa0779,_0x2406de=ImageManager['loadSystem'](_0x22bc08(0x8c2)),_0x3f8e16=ImageManager['iconWidth'],_0x5deaa7=ImageManager['iconHeight'],_0x121e35=_0x196061%0x10*_0x3f8e16,_0x37d7ba=Math[_0x22bc08(0x256)](_0x196061/0x10)*_0x5deaa7,_0x28ec30=_0x12fb72,_0x5e922e=_0x12fb72;this[_0x22bc08(0x204)][_0x22bc08(0x6d1)][_0x22bc08(0x2ed)]=_0xf52c91,this['contents'][_0x22bc08(0x2c7)](_0x2406de,_0x121e35,_0x37d7ba,_0x3f8e16,_0x5deaa7,_0x1ac00c,_0x1ad09a,_0x28ec30,_0x5e922e),this[_0x22bc08(0x204)][_0x22bc08(0x6d1)][_0x22bc08(0x2ed)]=!![];},Window_Base[_0xa0779(0x271)][_0xa0779(0x292)]=function(_0x497fa6,_0x871ecc,_0x5b9ec8,_0x528afb,_0x4cb2d7,_0x51b914){const _0x179fd4=_0xa0779,_0x1e0fac=Math[_0x179fd4(0x256)]((_0x5b9ec8-0x2)*_0x528afb),_0xde37e9=Sprite_Gauge['prototype'][_0x179fd4(0x5fd)][_0x179fd4(0x398)](this),_0x5da88d=_0x871ecc+this[_0x179fd4(0x981)]()-_0xde37e9-0x2;this[_0x179fd4(0x204)]['fillRect'](_0x497fa6,_0x5da88d,_0x5b9ec8,_0xde37e9,ColorManager[_0x179fd4(0x763)]()),this['contents']['gradientFillRect'](_0x497fa6+0x1,_0x5da88d+0x1,_0x1e0fac,_0xde37e9-0x2,_0x4cb2d7,_0x51b914);},Window_Selectable[_0xa0779(0x271)][_0xa0779(0x185)]=function(_0x2370bb){const _0x3d40d8=_0xa0779;let _0x3d4da5=this['index']();const _0x2e1281=this[_0x3d40d8(0x1bb)](),_0x31fec2=this['maxCols']();if(this[_0x3d40d8(0x5dd)]()&&(_0x3d4da5<_0x2e1281||_0x2370bb&&_0x31fec2===0x1)){_0x3d4da5+=_0x31fec2;if(_0x3d4da5>=_0x2e1281)_0x3d4da5=_0x2e1281-0x1;this[_0x3d40d8(0x6c9)](_0x3d4da5);}else{if(!this['isUseModernControls']()){if(_0x3d40d8(0x951)!==_0x3d40d8(0x951))_0x2c29cb['pan']=_0x37c23d,_0x1bcd82[_0x3d40d8(0x1c1)](_0x209a5e);else{if(_0x3d4da5<_0x2e1281-_0x31fec2||_0x2370bb&&_0x31fec2===0x1){if(_0x3d40d8(0x87f)===_0x3d40d8(0x87f))this[_0x3d40d8(0x6c9)]((_0x3d4da5+_0x31fec2)%_0x2e1281);else return-0.5*(_0x4dc57c[_0x3d40d8(0x33e)](0x2,0xa*_0x17369c)*_0x5a152a['sin']((_0x55824b-_0x38bf69)*(0x2*_0x45bf73['PI'])/_0x15ebca));}}}}},VisuMZ[_0xa0779(0x824)][_0xa0779(0x268)]=Window_Selectable[_0xa0779(0x271)]['cursorDown'],Window_Selectable[_0xa0779(0x271)][_0xa0779(0x185)]=function(_0x1f87e9){const _0x58acd4=_0xa0779;this[_0x58acd4(0x5dd)]()&&_0x1f87e9&&this['maxCols']()===0x1&&this[_0x58acd4(0x628)]()===this[_0x58acd4(0x1bb)]()-0x1?this[_0x58acd4(0x6c9)](0x0):VisuMZ[_0x58acd4(0x824)][_0x58acd4(0x268)]['call'](this,_0x1f87e9);},Window_Selectable['prototype']['cursorUp']=function(_0x327833){const _0x3b8605=_0xa0779;let _0x1b6069=Math['max'](0x0,this[_0x3b8605(0x628)]());const _0x537f52=this['maxItems'](),_0x4bbac6=this[_0x3b8605(0x49a)]();if(this[_0x3b8605(0x5dd)]()&&_0x1b6069>0x0||_0x327833&&_0x4bbac6===0x1){_0x1b6069-=_0x4bbac6;if(_0x1b6069<=0x0)_0x1b6069=0x0;this[_0x3b8605(0x6c9)](_0x1b6069);}else{if(!this['isUseModernControls']()){if(_0x3b8605(0x4f3)===_0x3b8605(0x4f3))(_0x1b6069>=_0x4bbac6||_0x327833&&_0x4bbac6===0x1)&&('IvQXz'!==_0x3b8605(0x2b2)?this[_0x3b8605(0x6c9)]((_0x1b6069-_0x4bbac6+_0x537f52)%_0x537f52):(this[_0x3b8605(0x93e)]&&(_0x183942=_0x156202['makeDeepCopy'](_0x291c26),_0xe8c66f['se']&&(_0x1aad8e['se']['volume']=0x0)),_0x3d45d0['CoreEngine'][_0x3b8605(0x29a)][_0x3b8605(0x398)](this,_0x4607b2)));else return _0x349a1b[_0x3b8605(0x271)][_0x3b8605(0x7da)][_0x3b8605(0x398)](this,_0x3fa71a);}}},VisuMZ['CoreEngine']['Window_Selectable_cursorUp']=Window_Selectable[_0xa0779(0x271)][_0xa0779(0x386)],Window_Selectable[_0xa0779(0x271)]['cursorUp']=function(_0x528a88){const _0x23642f=_0xa0779;this['isUseModernControls']()&&_0x528a88&&this[_0x23642f(0x49a)]()===0x1&&this[_0x23642f(0x628)]()===0x0?this['smoothSelect'](this[_0x23642f(0x1bb)]()-0x1):VisuMZ[_0x23642f(0x824)][_0x23642f(0x848)]['call'](this,_0x528a88);},Window_Selectable[_0xa0779(0x271)]['isUseModernControls']=function(){const _0x1478ce=_0xa0779;return VisuMZ[_0x1478ce(0x824)][_0x1478ce(0x17f)][_0x1478ce(0x2b0)]['ModernControls'];},VisuMZ[_0xa0779(0x824)]['Window_Selectable_processCursorMove']=Window_Selectable[_0xa0779(0x271)][_0xa0779(0x34b)],Window_Selectable['prototype'][_0xa0779(0x34b)]=function(){const _0x3c78b7=_0xa0779;this[_0x3c78b7(0x5dd)]()?(this[_0x3c78b7(0x442)](),this[_0x3c78b7(0x7e7)]()):VisuMZ[_0x3c78b7(0x824)][_0x3c78b7(0x2c6)][_0x3c78b7(0x398)](this);},Window_Selectable['prototype'][_0xa0779(0x6c1)]=function(){return!![];},Window_Selectable[_0xa0779(0x271)][_0xa0779(0x442)]=function(){const _0x315db0=_0xa0779;if(this[_0x315db0(0x22d)]()){const _0x2d4c14=this[_0x315db0(0x628)]();Input['isRepeated']('down')&&(_0x315db0(0x64d)!==_0x315db0(0x64d)?_0x2aa15a=_0xc6b3d6[_0x315db0(0x82a)](_0x15ad38):Input[_0x315db0(0x726)](_0x315db0(0x41f))&&this['allowShiftScrolling']()?_0x315db0(0x8fb)===_0x315db0(0x8fb)?this[_0x315db0(0x3a3)]():_0x4cfe96[_0x315db0(0x824)]['Window_Selectable_cursorUp']['call'](this,_0x135eb7):'qYPnQ'===_0x315db0(0x439)?(this[_0x315db0(0x507)]=this[_0x315db0(0x507)]||[],this[_0x315db0(0x507)]['push'](_0x4684a3)):this[_0x315db0(0x185)](Input['isTriggered'](_0x315db0(0x38b))));Input[_0x315db0(0x6c2)]('up')&&(_0x315db0(0x2e5)!==_0x315db0(0x2e5)?(this[_0x315db0(0x1d4)](),_0x4d5b81['playOk'](),this[_0x315db0(0x1e7)]==='default'?this[_0x315db0(0x56d)](0x0):this[_0x315db0(0x56d)](-0x1)):Input[_0x315db0(0x726)]('shift')&&this[_0x315db0(0x6c1)]()?this['cursorPageup']():this['cursorUp'](Input[_0x315db0(0x5ff)]('up')));Input['isRepeated'](_0x315db0(0x4b5))&&(_0x315db0(0x4dc)!==_0x315db0(0x4dc)?(_0x18dd54[_0x315db0(0x824)]['Spriteset_Base_updatePosition'][_0x315db0(0x398)](this),this[_0x315db0(0x580)]()):this[_0x315db0(0x266)](Input[_0x315db0(0x5ff)]('right')));Input[_0x315db0(0x6c2)](_0x315db0(0x67d))&&this['cursorLeft'](Input[_0x315db0(0x5ff)](_0x315db0(0x67d)));if(!this[_0x315db0(0x1f7)](_0x315db0(0x224))&&Input['isRepeated'](_0x315db0(0x224))){if(_0x315db0(0x37d)===_0x315db0(0x37d))this[_0x315db0(0x3a3)]();else{if(this[_0x315db0(0x8fc)][_0x315db0(0x44a)[_0x315db0(0x6ad)](_0x1a1227)]!==_0x13b5a8[_0x315db0(0x4f9)[_0x315db0(0x6ad)](_0x2db6ea)]())return this[_0x315db0(0x1d4)]();if(this[_0x315db0(0x8fc)]['text%1'[_0x315db0(0x6ad)](_0x1b6d47)]!==_0x29ce44['buttonAssistText%1'[_0x315db0(0x6ad)](_0x3f88ea)]())return this['refresh']();}}!this[_0x315db0(0x1f7)](_0x315db0(0x89c))&&Input[_0x315db0(0x6c2)](_0x315db0(0x89c))&&('ahBrE'===_0x315db0(0x1ad)?this[_0x315db0(0x915)]():_0x36357e=_0x315db0(0x661)[_0x315db0(0x6ad)](_0x5e17cb,_0x58f799)),this[_0x315db0(0x628)]()!==_0x2d4c14&&(_0x315db0(0x1e5)===_0x315db0(0x1e5)?this[_0x315db0(0x942)]():_0x4fa0ba(_0x2772da));}},Window_Selectable['prototype'][_0xa0779(0x7e7)]=function(){const _0x3de222=_0xa0779;if(this['isCursorMovable']()){if(_0x3de222(0x8bd)!==_0x3de222(0x8bd))return'';else{const _0x18b49b=this[_0x3de222(0x628)]();Input[_0x3de222(0x5ff)](_0x3de222(0x6cf))&&this[_0x3de222(0x6c9)](Math[_0x3de222(0x15d)](this[_0x3de222(0x628)](),0x0)),Input[_0x3de222(0x5ff)](_0x3de222(0x654))&&(_0x3de222(0x9b7)===_0x3de222(0x9b7)?this[_0x3de222(0x6c9)](Math[_0x3de222(0x274)](this[_0x3de222(0x628)](),this[_0x3de222(0x1bb)]()-0x1)):(_0xc0d87f['CoreEngine'][_0x3de222(0x2c2)]['call'](this,_0x3f1d58,_0x5cb66f,_0x161d3a,_0x319aaa,_0x1397eb),this[_0x3de222(0x4c2)]())),this[_0x3de222(0x628)]()!==_0x18b49b&&this[_0x3de222(0x942)]();}}},VisuMZ['CoreEngine'][_0xa0779(0x920)]=Window_Selectable[_0xa0779(0x271)][_0xa0779(0x27a)],Window_Selectable['prototype'][_0xa0779(0x27a)]=function(){const _0x55df79=_0xa0779;this['isUseModernControls']()?this[_0x55df79(0x237)]():VisuMZ[_0x55df79(0x824)][_0x55df79(0x920)]['call'](this);},Window_Selectable[_0xa0779(0x271)][_0xa0779(0x237)]=function(){const _0x4a7c36=_0xa0779;VisuMZ[_0x4a7c36(0x824)][_0x4a7c36(0x920)]['call'](this);},Window_Selectable[_0xa0779(0x271)][_0xa0779(0x5c7)]=function(){const _0x47c7a4=_0xa0779;return VisuMZ[_0x47c7a4(0x824)][_0x47c7a4(0x17f)][_0x47c7a4(0x1ce)][_0x47c7a4(0x3c6)];},Window_Selectable[_0xa0779(0x271)][_0xa0779(0x563)]=function(){const _0x3b62a0=_0xa0779;return VisuMZ['CoreEngine'][_0x3b62a0(0x17f)][_0x3b62a0(0x1ce)][_0x3b62a0(0x4ca)];},Window_Selectable[_0xa0779(0x271)][_0xa0779(0x8ca)]=function(){const _0x4817c2=_0xa0779;return Window_Scrollable[_0x4817c2(0x271)]['itemHeight'][_0x4817c2(0x398)](this)+VisuMZ[_0x4817c2(0x824)][_0x4817c2(0x17f)]['Window'][_0x4817c2(0x807)];;},VisuMZ[_0xa0779(0x824)]['Window_Selectable_drawBackgroundRect']=Window_Selectable[_0xa0779(0x271)][_0xa0779(0x4b3)],Window_Selectable['prototype']['drawBackgroundRect']=function(_0x497595){const _0x683854=_0xa0779,_0x49c02e=VisuMZ[_0x683854(0x824)][_0x683854(0x17f)][_0x683854(0x1ce)];if(_0x49c02e[_0x683854(0x5b4)]===![])return;_0x49c02e[_0x683854(0x6b4)]?_0x49c02e['DrawItemBackgroundJS'][_0x683854(0x398)](this,_0x497595):VisuMZ[_0x683854(0x824)]['Window_Selectable_drawBackgroundRect'][_0x683854(0x398)](this,_0x497595);},VisuMZ['CoreEngine'][_0xa0779(0x291)]=Window_Gold['prototype']['refresh'],Window_Gold[_0xa0779(0x271)][_0xa0779(0x1d4)]=function(){const _0x2be1bd=_0xa0779;this[_0x2be1bd(0x51e)]()?this[_0x2be1bd(0x7b2)]():VisuMZ[_0x2be1bd(0x824)][_0x2be1bd(0x291)][_0x2be1bd(0x398)](this);},Window_Gold[_0xa0779(0x271)][_0xa0779(0x51e)]=function(){const _0x594c86=_0xa0779;if(TextManager[_0x594c86(0x929)]!==this[_0x594c86(0x929)]())return![];return VisuMZ[_0x594c86(0x824)][_0x594c86(0x17f)][_0x594c86(0x1d6)][_0x594c86(0x48a)];},Window_Gold[_0xa0779(0x271)][_0xa0779(0x7b2)]=function(){const _0x4b3a5d=_0xa0779;this[_0x4b3a5d(0x44d)](),this['contents'][_0x4b3a5d(0x653)](),this[_0x4b3a5d(0x204)]['fontSize']=VisuMZ[_0x4b3a5d(0x824)][_0x4b3a5d(0x17f)][_0x4b3a5d(0x1d6)]['GoldFontSize'];const _0x30ba5c=VisuMZ['CoreEngine'][_0x4b3a5d(0x17f)][_0x4b3a5d(0x1d6)][_0x4b3a5d(0x860)],_0x1cd675=this[_0x4b3a5d(0x2e7)](0x0);if(_0x30ba5c>0x0){if(_0x4b3a5d(0x435)!=='lalfA'){const _0x1ee8ac=_0x1cd675['y']+(this[_0x4b3a5d(0x981)]()-ImageManager[_0x4b3a5d(0x7fa)])/0x2;this[_0x4b3a5d(0x84b)](_0x30ba5c,_0x1cd675['x'],_0x1ee8ac);const _0x3ffd09=ImageManager[_0x4b3a5d(0x49c)]+0x4;_0x1cd675['x']+=_0x3ffd09,_0x1cd675[_0x4b3a5d(0x3c5)]-=_0x3ffd09;}else this[_0x4b3a5d(0x8a6)]=_0x2dd0b1,this['_targetAnchor']=_0x49517f[_0x4b3a5d(0x323)](this[_0x4b3a5d(0x8a6)]);}this[_0x4b3a5d(0x685)](ColorManager['systemColor']()),this[_0x4b3a5d(0x65f)](this[_0x4b3a5d(0x929)](),_0x1cd675['x'],_0x1cd675['y'],_0x1cd675[_0x4b3a5d(0x3c5)],_0x4b3a5d(0x67d));const _0x4d9a1c=this[_0x4b3a5d(0x1a9)](this['currencyUnit']())+0x6;;_0x1cd675['x']+=_0x4d9a1c,_0x1cd675['width']-=_0x4d9a1c,this['resetTextColor']();const _0x38c296=this[_0x4b3a5d(0x9c5)](),_0x53a1b4=this[_0x4b3a5d(0x1a9)](this[_0x4b3a5d(0x20b)]?VisuMZ[_0x4b3a5d(0x82a)](this[_0x4b3a5d(0x9c5)]()):this[_0x4b3a5d(0x9c5)]());_0x53a1b4>_0x1cd675['width']?'ZVmbg'!==_0x4b3a5d(0x54b)?this[_0x4b3a5d(0x65f)](VisuMZ[_0x4b3a5d(0x824)][_0x4b3a5d(0x17f)]['Gold'][_0x4b3a5d(0x561)],_0x1cd675['x'],_0x1cd675['y'],_0x1cd675[_0x4b3a5d(0x3c5)],'right'):(this['_scrollDuration']=0x1,this['updateSmoothScroll']()):'uwNCE'!==_0x4b3a5d(0x1ec)?this[_0x4b3a5d(0x51e)]()?this[_0x4b3a5d(0x7b2)]():_0x311bf1[_0x4b3a5d(0x824)]['Window_Gold_refresh'][_0x4b3a5d(0x398)](this):this['drawText'](this['value'](),_0x1cd675['x'],_0x1cd675['y'],_0x1cd675[_0x4b3a5d(0x3c5)],_0x4b3a5d(0x4b5)),this[_0x4b3a5d(0x44d)]();},Window_StatusBase[_0xa0779(0x271)][_0xa0779(0x77d)]=function(_0x93d5f1,_0x2d4574,_0x5775c2,_0x295e51,_0x526ef9){const _0x40e837=_0xa0779;_0x295e51=String(_0x295e51||'')[_0x40e837(0x7c9)]();if(VisuMZ['CoreEngine'][_0x40e837(0x17f)][_0x40e837(0x34a)][_0x40e837(0x985)]){if(_0x40e837(0x174)!==_0x40e837(0x33c)){const _0x10e17d=VisuMZ[_0x40e837(0x23f)](_0x295e51);_0x526ef9?(this[_0x40e837(0x420)](_0x10e17d,_0x93d5f1,_0x2d4574,this[_0x40e837(0x675)]()),_0x5775c2-=this[_0x40e837(0x675)]()+0x2,_0x93d5f1+=this[_0x40e837(0x675)]()+0x2):(this['drawIcon'](_0x10e17d,_0x93d5f1+0x2,_0x2d4574+0x2),_0x5775c2-=ImageManager[_0x40e837(0x49c)]+0x4,_0x93d5f1+=ImageManager['iconWidth']+0x4);}else this[_0x40e837(0x7fb)]>0x0&&(this[_0x40e837(0x8a6)]['x']=this[_0x40e837(0x5dc)](this[_0x40e837(0x8a6)]['x'],this['_targetAnchor']['x']),this[_0x40e837(0x8a6)]['y']=this[_0x40e837(0x5dc)](this[_0x40e837(0x8a6)]['y'],this[_0x40e837(0x4f5)]['y']));}const _0x3961fc=TextManager[_0x40e837(0x4c1)](_0x295e51);this[_0x40e837(0x44d)](),this['changeTextColor'](ColorManager['systemColor']()),_0x526ef9?(this[_0x40e837(0x204)][_0x40e837(0x9b9)]=this['smallParamFontSize'](),this[_0x40e837(0x204)][_0x40e837(0x65f)](_0x3961fc,_0x93d5f1,_0x2d4574,_0x5775c2,this[_0x40e837(0x675)](),_0x40e837(0x67d))):_0x40e837(0x793)!==_0x40e837(0x793)?this['cursorDown'](_0x243d45['isTriggered'](_0x40e837(0x38b))):this[_0x40e837(0x65f)](_0x3961fc,_0x93d5f1,_0x2d4574,_0x5775c2),this[_0x40e837(0x44d)]();},Window_StatusBase['prototype'][_0xa0779(0x3c8)]=function(){const _0x1976b2=_0xa0779;return $gameSystem[_0x1976b2(0x718)]()-0x8;},Window_StatusBase[_0xa0779(0x271)][_0xa0779(0x971)]=function(_0xd3f1a0,_0x3ec6cd,_0x62f781,_0x5b92ee){const _0x3f99e6=_0xa0779;_0x5b92ee=_0x5b92ee||0xa8,this['resetTextColor']();if(VisuMZ['CoreEngine'][_0x3f99e6(0x17f)]['UI'][_0x3f99e6(0x35a)])this[_0x3f99e6(0x227)](_0xd3f1a0[_0x3f99e6(0x459)]()['name'],_0x3ec6cd,_0x62f781,_0x5b92ee);else{const _0x51d1bf=_0xd3f1a0[_0x3f99e6(0x459)]()[_0x3f99e6(0x912)][_0x3f99e6(0x710)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x51d1bf,_0x3ec6cd,_0x62f781,_0x5b92ee);}},Window_StatusBase['prototype'][_0xa0779(0x28e)]=function(_0x5ba24b,_0x4c239a,_0x36bb09,_0x2c5942){const _0x945268=_0xa0779;_0x2c5942=_0x2c5942||0x10e,this['resetTextColor']();if(VisuMZ[_0x945268(0x824)][_0x945268(0x17f)]['UI'][_0x945268(0x67c)]){if(_0x945268(0x3cf)!=='cOors')return _0x425c51[_0x945268(0x1ab)][_0x945268(0x800)][_0x945268(0x398)](this);else this[_0x945268(0x227)](_0x5ba24b[_0x945268(0x2df)](),_0x4c239a,_0x36bb09,_0x2c5942);}else{const _0x7ac2c0=_0x5ba24b[_0x945268(0x2df)]()[_0x945268(0x710)](/\\I\[(\d+)\]/gi,'');this[_0x945268(0x65f)](_0x5ba24b[_0x945268(0x2df)](),_0x4c239a,_0x36bb09,_0x2c5942);}},VisuMZ[_0xa0779(0x824)][_0xa0779(0x163)]=Window_StatusBase[_0xa0779(0x271)][_0xa0779(0x3b7)],Window_StatusBase[_0xa0779(0x271)][_0xa0779(0x3b7)]=function(_0x5c8282,_0x19d227,_0x49bcbc){const _0x1451c4=_0xa0779;if(VisuMZ[_0x1451c4(0x824)][_0x1451c4(0x17f)][_0x1451c4(0x34a)][_0x1451c4(0x744)]===![])return;if(this[_0x1451c4(0x33a)]())this['drawActorExpGauge'](_0x5c8282,_0x19d227,_0x49bcbc);VisuMZ[_0x1451c4(0x824)]['Window_StatusBase_drawActorLevel'][_0x1451c4(0x398)](this,_0x5c8282,_0x19d227,_0x49bcbc);},Window_StatusBase['prototype'][_0xa0779(0x33a)]=function(){const _0x2d433d=_0xa0779;return VisuMZ[_0x2d433d(0x824)]['Settings']['UI'][_0x2d433d(0x2db)];},Window_StatusBase[_0xa0779(0x271)][_0xa0779(0x6f6)]=function(_0x21cee8,_0x14f4ec,_0x36362a){const _0x19a961=_0xa0779;if(!_0x21cee8)return;if(!_0x21cee8[_0x19a961(0x627)]())return;const _0x4c603f=0x80,_0x59a131=_0x21cee8[_0x19a961(0x6e5)]();let _0x356557=ColorManager[_0x19a961(0x36f)](),_0x66e3=ColorManager[_0x19a961(0x440)]();_0x59a131>=0x1&&(_0x356557=ColorManager[_0x19a961(0x9a9)](),_0x66e3=ColorManager[_0x19a961(0x566)]()),this['drawGauge'](_0x14f4ec,_0x36362a,_0x4c603f,_0x59a131,_0x356557,_0x66e3);},Window_EquipStatus[_0xa0779(0x271)][_0xa0779(0x58d)]=function(){const _0x4b059a=_0xa0779;let _0x1a1f1c=0x0;for(const _0x4f5ac0 of VisuMZ[_0x4b059a(0x824)]['Settings'][_0x4b059a(0x34a)][_0x4b059a(0x2ab)]){const _0x1f4e9c=this[_0x4b059a(0x27c)](),_0x635d93=this[_0x4b059a(0x242)](_0x1a1f1c);this[_0x4b059a(0x4b8)](_0x1f4e9c,_0x635d93,_0x4f5ac0),_0x1a1f1c++;}},Window_EquipStatus['prototype'][_0xa0779(0x1f0)]=function(_0x132c0c,_0x327da5,_0x200026){const _0x10e939=_0xa0779,_0x128a90=this[_0x10e939(0x7ed)]()-this['itemPadding']()*0x2;this[_0x10e939(0x77d)](_0x132c0c,_0x327da5,_0x128a90,_0x200026,![]);},Window_EquipStatus[_0xa0779(0x271)]['drawCurrentParam']=function(_0x274dcb,_0x34e29c,_0x29adab){const _0x27fcc5=_0xa0779,_0x446719=this[_0x27fcc5(0x2c9)]();this[_0x27fcc5(0x5fe)](),this[_0x27fcc5(0x65f)](this['_actor']['paramValueByName'](_0x29adab,!![]),_0x274dcb,_0x34e29c,_0x446719,'right');},Window_EquipStatus[_0xa0779(0x271)][_0xa0779(0x3a8)]=function(_0x237e2a,_0x52756a){const _0x2aded3=_0xa0779,_0x501a57=this[_0x2aded3(0x2cb)]();this[_0x2aded3(0x685)](ColorManager['systemColor']());const _0x4ab944=VisuMZ[_0x2aded3(0x824)][_0x2aded3(0x17f)]['UI'][_0x2aded3(0x2ad)];this['drawText'](_0x4ab944,_0x237e2a,_0x52756a,_0x501a57,_0x2aded3(0x9d3));},Window_EquipStatus[_0xa0779(0x271)][_0xa0779(0x972)]=function(_0x4bef9d,_0xe05926,_0x58d0b4){const _0x4e80c3=_0xa0779,_0x2f276c=this['paramWidth'](),_0x147f58=this[_0x4e80c3(0x5ec)]['paramValueByName'](_0x58d0b4),_0x389480=_0x147f58-this[_0x4e80c3(0x1db)][_0x4e80c3(0x3ff)](_0x58d0b4);this[_0x4e80c3(0x685)](ColorManager['paramchangeTextColor'](_0x389480)),this[_0x4e80c3(0x65f)](this[_0x4e80c3(0x5ec)][_0x4e80c3(0x3ff)](_0x58d0b4,!![]),_0x4bef9d,_0xe05926,_0x2f276c,_0x4e80c3(0x4b5));},VisuMZ['CoreEngine']['Window_EquipItem_isEnabled']=Window_EquipItem[_0xa0779(0x271)]['isEnabled'],Window_EquipItem[_0xa0779(0x271)][_0xa0779(0x7da)]=function(_0x46495d){const _0x3205f3=_0xa0779;if(_0x46495d&&this[_0x3205f3(0x1db)]){if(_0x3205f3(0x855)!==_0x3205f3(0x5ed))return this[_0x3205f3(0x1db)][_0x3205f3(0x7a5)](_0x46495d);else _0x3c399d[_0x3205f3(0x824)][_0x3205f3(0x1fc)]['call'](this,_0x4b15d1,_0x3758a1,_0x792177,_0x1568b5),this['markCoreEngineModified']();}else return VisuMZ[_0x3205f3(0x824)][_0x3205f3(0x886)]['call'](this,_0x46495d);},Window_StatusParams['prototype'][_0xa0779(0x1bb)]=function(){const _0x334aa6=_0xa0779;return VisuMZ['CoreEngine']['Settings']['Param'][_0x334aa6(0x2ab)][_0x334aa6(0x444)];},Window_StatusParams['prototype'][_0xa0779(0x4b8)]=function(_0x6e74d9){const _0x2eed6b=_0xa0779,_0x3947ff=this[_0x2eed6b(0x2e7)](_0x6e74d9),_0x7482d9=VisuMZ['CoreEngine'][_0x2eed6b(0x17f)][_0x2eed6b(0x34a)][_0x2eed6b(0x2ab)][_0x6e74d9],_0x3ecc06=TextManager[_0x2eed6b(0x4c1)](_0x7482d9),_0x5161b4=this[_0x2eed6b(0x1db)][_0x2eed6b(0x3ff)](_0x7482d9,!![]);this[_0x2eed6b(0x77d)](_0x3947ff['x'],_0x3947ff['y'],0xa0,_0x7482d9,![]),this['resetTextColor'](),this[_0x2eed6b(0x65f)](_0x5161b4,_0x3947ff['x']+0xa0,_0x3947ff['y'],0x3c,_0x2eed6b(0x4b5));};if(VisuMZ[_0xa0779(0x824)][_0xa0779(0x17f)]['KeyboardInput'][_0xa0779(0x42d)]){VisuMZ[_0xa0779(0x824)]['Settings']['KeyboardInput'][_0xa0779(0x2d1)]&&(Window_NameInput[_0xa0779(0x854)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0xa0779(0x6d3),'OK']);;VisuMZ[_0xa0779(0x824)][_0xa0779(0x3e5)]=Window_NameInput[_0xa0779(0x271)][_0xa0779(0x288)],Window_NameInput[_0xa0779(0x271)]['initialize']=function(_0x113325){const _0x2d93eb=_0xa0779;this[_0x2d93eb(0x1e7)]=this[_0x2d93eb(0x698)](),VisuMZ[_0x2d93eb(0x824)][_0x2d93eb(0x3e5)][_0x2d93eb(0x398)](this,_0x113325);if(this[_0x2d93eb(0x1e7)]===_0x2d93eb(0x366)){if(_0x2d93eb(0x5ba)===_0x2d93eb(0x5ba))this['select'](0x0);else{const _0x572d6e=_0x283ace['_pictureCoordinatesMode'],_0x2c4447=_0x3b4087['picture'](_0x572d6e);return _0x2c4447?this[_0x2d93eb(0x2d3)]!==_0x2c4447[_0x2d93eb(0x5d8)]||this[_0x2d93eb(0x1a4)]!==_0x2c4447['_x']||this[_0x2d93eb(0x703)]!==_0x2c4447['_y']:![];}}else{if(_0x2d93eb(0x665)!==_0x2d93eb(0x73f))Input[_0x2d93eb(0x653)](),this[_0x2d93eb(0x9a1)]();else{_0x3c8345['CoreEngine'][_0x2d93eb(0x709)][_0x2d93eb(0x398)](this);const _0x4d4f27=this['_spriteset'][_0x2d93eb(0x759)];if(_0x4d4f27)this[_0x2d93eb(0x894)](_0x4d4f27);}}},Window_NameInput[_0xa0779(0x271)]['defaultInputMode']=function(){const _0x3d94f2=_0xa0779;if(Input[_0x3d94f2(0x88b)]())return'default';return VisuMZ[_0x3d94f2(0x824)][_0x3d94f2(0x17f)][_0x3d94f2(0x634)]['DefaultMode']||_0x3d94f2(0x4ba);},VisuMZ[_0xa0779(0x824)][_0xa0779(0x80a)]=Window_NameInput[_0xa0779(0x271)][_0xa0779(0x622)],Window_NameInput[_0xa0779(0x271)][_0xa0779(0x622)]=function(){const _0xde679f=_0xa0779;if(!this[_0xde679f(0x734)]())return;if(!this[_0xde679f(0x270)])return;if(this[_0xde679f(0x1e7)]===_0xde679f(0x4ba)&&Input[_0xde679f(0x2a1)]())this[_0xde679f(0x2bb)](_0xde679f(0x366));else{if(Input['isSpecialCode'](_0xde679f(0x1cf))){if(_0xde679f(0x41d)!=='ftRUI')Input[_0xde679f(0x653)](),this['processBack']();else{_0x57b266[_0xde679f(0x509)]();if(!_0x14c5a0[_0xde679f(0x812)]()){const _0x41608d=_0x4633d0[_0xde679f(0x8db)](_0x5b1b47,_0xde679f(0x2a0));}else{const _0x46b76b=_0x4ebe52[_0xde679f(0x1fa)]==_0xde679f(0x539)?_0xde679f(0x8db):_0x16d3bd['platform']=='win32'?_0xde679f(0x5b8):_0xde679f(0x18d);_0x414b6d('child_process')[_0xde679f(0x483)](_0x46b76b+'\x20'+_0x332ffd);}}}else{if(Input[_0xde679f(0x5ff)]('tab')){Input[_0xde679f(0x653)]();if(this[_0xde679f(0x1e7)]===_0xde679f(0x4ba)){if(_0xde679f(0x517)!==_0xde679f(0x613))this[_0xde679f(0x2bb)](_0xde679f(0x366));else{if(this[_0xde679f(0x1e7)]===_0xde679f(0x4ba)&&!_0xf03ba0[_0xde679f(0x771)]())return;if(_0x2fdc85['isNumpadPressed']())return;_0x5bcf69['CoreEngine']['Window_NameInput_cursorDown'][_0xde679f(0x398)](this,_0x2a7ecf),this[_0xde679f(0x2bb)](_0xde679f(0x366));}}else this[_0xde679f(0x2bb)](_0xde679f(0x4ba));}else{if(this[_0xde679f(0x1e7)]==='keyboard')this['processKeyboardHandling']();else Input[_0xde679f(0x453)](_0xde679f(0x5d1))?(Input[_0xde679f(0x653)](),this[_0xde679f(0x2bb)](_0xde679f(0x4ba))):VisuMZ[_0xde679f(0x824)][_0xde679f(0x80a)][_0xde679f(0x398)](this);}}}},VisuMZ[_0xa0779(0x824)][_0xa0779(0x636)]=Window_NameInput[_0xa0779(0x271)][_0xa0779(0x27a)],Window_NameInput[_0xa0779(0x271)][_0xa0779(0x27a)]=function(){const _0x164d95=_0xa0779;if(!this[_0x164d95(0x7bf)]())return;if(this[_0x164d95(0x1e7)]===_0x164d95(0x4ba)){if(TouchInput[_0x164d95(0x5ff)]()&&this[_0x164d95(0x529)]())'WNNUt'==='GHYWm'?(this[_0x164d95(0x46e)]&&this[_0x164d95(0x46e)][_0x164d95(0x21b)](_0x1b2bdb[_0x164d95(0x1ab)][_0x164d95(0x757)]),this[_0x164d95(0x5b3)]&&this['_goldWindow']['setBackgroundType'](_0x27c2ec[_0x164d95(0x1ab)][_0x164d95(0x725)]),this[_0x164d95(0x387)]&&this[_0x164d95(0x387)]['setBackgroundType'](_0xc2e6c1[_0x164d95(0x1ab)]['StatusBgType'])):this[_0x164d95(0x2bb)](_0x164d95(0x366));else TouchInput[_0x164d95(0x9d9)]()&&this[_0x164d95(0x2bb)]('default');}else VisuMZ[_0x164d95(0x824)]['Window_NameInput_processTouch'][_0x164d95(0x398)](this);},Window_NameInput[_0xa0779(0x271)][_0xa0779(0x6da)]=function(){const _0x58e24c=_0xa0779;if(Input['isSpecialCode']('enter'))Input[_0x58e24c(0x653)](),this[_0x58e24c(0x6ac)]();else{if(Input[_0x58e24c(0x167)]!==undefined){let _0x34511b=Input[_0x58e24c(0x167)],_0x50c685=_0x34511b[_0x58e24c(0x444)];for(let _0x457e9a=0x0;_0x457e9a<_0x50c685;++_0x457e9a){this['_editWindow']['add'](_0x34511b[_0x457e9a])?SoundManager[_0x58e24c(0x509)]():SoundManager[_0x58e24c(0x450)]();}Input[_0x58e24c(0x653)]();}}},Window_NameInput[_0xa0779(0x271)][_0xa0779(0x2bb)]=function(_0x338567){const _0x2e9b20=_0xa0779;let _0x227742=this[_0x2e9b20(0x1e7)];this[_0x2e9b20(0x1e7)]=_0x338567;if(_0x227742!==this[_0x2e9b20(0x1e7)]){if(_0x2e9b20(0x768)!=='ZFiSy')return this['refresh']();else{this[_0x2e9b20(0x1d4)](),SoundManager['playOk']();if(this[_0x2e9b20(0x1e7)]===_0x2e9b20(0x366))this['select'](0x0);else{if(_0x2e9b20(0x956)===_0x2e9b20(0x38c))return _0x137d6c['CoreEngine'][_0x2e9b20(0x7c3)][_0x2e9b20(0x398)](this,_0x355a25);else this[_0x2e9b20(0x56d)](-0x1);}}}},VisuMZ[_0xa0779(0x824)][_0xa0779(0x264)]=Window_NameInput[_0xa0779(0x271)][_0xa0779(0x185)],Window_NameInput[_0xa0779(0x271)][_0xa0779(0x185)]=function(_0xe92ef5){const _0x51958f=_0xa0779;if(this[_0x51958f(0x1e7)]===_0x51958f(0x4ba)&&!Input[_0x51958f(0x771)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x51958f(0x824)][_0x51958f(0x264)][_0x51958f(0x398)](this,_0xe92ef5),this[_0x51958f(0x2bb)](_0x51958f(0x366));},VisuMZ[_0xa0779(0x824)]['Window_NameInput_cursorUp']=Window_NameInput['prototype'][_0xa0779(0x386)],Window_NameInput['prototype'][_0xa0779(0x386)]=function(_0x126539){const _0x4592d2=_0xa0779;if(this[_0x4592d2(0x1e7)]===_0x4592d2(0x4ba)&&!Input[_0x4592d2(0x771)]())return;if(Input[_0x4592d2(0x3f5)]())return;VisuMZ[_0x4592d2(0x824)][_0x4592d2(0x251)][_0x4592d2(0x398)](this,_0x126539),this['switchModes'](_0x4592d2(0x366));},VisuMZ[_0xa0779(0x824)][_0xa0779(0x8a0)]=Window_NameInput[_0xa0779(0x271)][_0xa0779(0x266)],Window_NameInput[_0xa0779(0x271)]['cursorRight']=function(_0x43a34c){const _0xc87ee5=_0xa0779;if(this['_mode']===_0xc87ee5(0x4ba)&&!Input['isArrowPressed']())return;if(Input[_0xc87ee5(0x3f5)]())return;VisuMZ[_0xc87ee5(0x824)][_0xc87ee5(0x8a0)][_0xc87ee5(0x398)](this,_0x43a34c),this[_0xc87ee5(0x2bb)](_0xc87ee5(0x366));},VisuMZ[_0xa0779(0x824)][_0xa0779(0x193)]=Window_NameInput['prototype'][_0xa0779(0x5a4)],Window_NameInput[_0xa0779(0x271)][_0xa0779(0x5a4)]=function(_0x1983a3){const _0x488db4=_0xa0779;if(this['_mode']===_0x488db4(0x4ba)&&!Input[_0x488db4(0x771)]())return;if(Input[_0x488db4(0x3f5)]())return;VisuMZ[_0x488db4(0x824)][_0x488db4(0x193)][_0x488db4(0x398)](this,_0x1983a3),this[_0x488db4(0x2bb)]('default');},VisuMZ[_0xa0779(0x824)]['Window_NameInput_cursorPagedown']=Window_NameInput[_0xa0779(0x271)][_0xa0779(0x3a3)],Window_NameInput[_0xa0779(0x271)]['cursorPagedown']=function(){const _0x35a8ca=_0xa0779;if(this[_0x35a8ca(0x1e7)]==='keyboard')return;if(Input['isNumpadPressed']())return;VisuMZ[_0x35a8ca(0x824)]['Window_NameInput_cursorPagedown'][_0x35a8ca(0x398)](this),this[_0x35a8ca(0x2bb)](_0x35a8ca(0x366));},VisuMZ[_0xa0779(0x824)][_0xa0779(0x3a5)]=Window_NameInput[_0xa0779(0x271)][_0xa0779(0x915)],Window_NameInput['prototype'][_0xa0779(0x915)]=function(){const _0x1c3411=_0xa0779;if(this[_0x1c3411(0x1e7)]===_0x1c3411(0x4ba))return;if(Input[_0x1c3411(0x3f5)]())return;VisuMZ[_0x1c3411(0x824)][_0x1c3411(0x3a5)][_0x1c3411(0x398)](this),this[_0x1c3411(0x2bb)](_0x1c3411(0x366));},VisuMZ[_0xa0779(0x824)][_0xa0779(0x923)]=Window_NameInput[_0xa0779(0x271)][_0xa0779(0x1d4)],Window_NameInput['prototype']['refresh']=function(){const _0x559156=_0xa0779;if(this[_0x559156(0x1e7)]===_0x559156(0x4ba)){this[_0x559156(0x204)]['clear'](),this[_0x559156(0x2e9)][_0x559156(0x653)](),this[_0x559156(0x5fe)]();let _0xda2562=VisuMZ['CoreEngine']['Settings'][_0x559156(0x634)][_0x559156(0x9ed)][_0x559156(0x236)]('\x0a'),_0x5821ee=_0xda2562[_0x559156(0x444)],_0x3f9db5=(this['innerHeight']-_0x5821ee*this[_0x559156(0x981)]())/0x2;for(let _0x50f778=0x0;_0x50f778<_0x5821ee;++_0x50f778){let _0x5389d5=_0xda2562[_0x50f778],_0x371526=this[_0x559156(0x4cd)](_0x5389d5)['width'],_0x2ea6fc=Math[_0x559156(0x256)]((this['contents']['width']-_0x371526)/0x2);this['drawTextEx'](_0x5389d5,_0x2ea6fc,_0x3f9db5),_0x3f9db5+=this[_0x559156(0x981)]();}}else{if(_0x559156(0x349)!==_0x559156(0x1cd))VisuMZ[_0x559156(0x824)][_0x559156(0x923)][_0x559156(0x398)](this);else{var _0x295375=_0x21585f(_0x116634['$1'])/0x64;_0x437bf1*=_0x295375;}}};};VisuMZ[_0xa0779(0x824)][_0xa0779(0x764)]=Window_ShopSell[_0xa0779(0x271)][_0xa0779(0x7da)],Window_ShopSell[_0xa0779(0x271)][_0xa0779(0x7da)]=function(_0x59b9cc){const _0x247c03=_0xa0779;if(VisuMZ['CoreEngine'][_0x247c03(0x17f)][_0x247c03(0x2b0)][_0x247c03(0x259)]&&DataManager[_0x247c03(0x573)](_0x59b9cc)){if(_0x247c03(0x276)===_0x247c03(0x276))return![];else{if(_0x400f12[_0x247c03(0x168)]['call'](this)){const _0x278062=_0x359258[_0x247c03(0x723)];let _0x589619=_0x437f80[_0x247c03(0x5a5)];if(['',_0x247c03(0x29e)][_0x247c03(0x84f)](_0x589619))_0x589619=_0x43223a['TextJS'][_0x247c03(0x398)](this);const _0x16c437=_0x4bcd4f[_0x247c03(0x689)][_0x247c03(0x398)](this),_0x108f9d=_0x2f1eb1[_0x247c03(0x7c0)][_0x247c03(0x398)](this);this[_0x247c03(0x8c6)](_0x589619,_0x278062,_0x16c437,_0x108f9d),this[_0x247c03(0x8d7)](_0x278062,_0x3d9289[_0x247c03(0x51f)][_0x247c03(0x30a)](this,_0x108f9d));}}}else return VisuMZ[_0x247c03(0x824)][_0x247c03(0x764)]['call'](this,_0x59b9cc);},Window_NumberInput['prototype']['isUseModernControls']=function(){return![];};VisuMZ[_0xa0779(0x824)]['Settings'][_0xa0779(0x634)]['EnableNumberInput']&&(VisuMZ[_0xa0779(0x824)][_0xa0779(0x667)]=Window_NumberInput[_0xa0779(0x271)]['start'],Window_NumberInput[_0xa0779(0x271)][_0xa0779(0x5b8)]=function(){const _0x3ef0b0=_0xa0779;VisuMZ[_0x3ef0b0(0x824)]['Window_NumberInput_start']['call'](this),this[_0x3ef0b0(0x56d)](this[_0x3ef0b0(0x211)]-0x1),Input['clear']();},VisuMZ[_0xa0779(0x824)]['Window_NumberInput_processDigitChange']=Window_NumberInput[_0xa0779(0x271)][_0xa0779(0x984)],Window_NumberInput['prototype'][_0xa0779(0x984)]=function(){const _0xedd8e3=_0xa0779;if(!this[_0xedd8e3(0x7bf)]())return;if(Input['isNumpadPressed']())this['processKeyboardDigitChange']();else{if(Input[_0xedd8e3(0x453)](_0xedd8e3(0x1cf)))this[_0xedd8e3(0x443)]();else{if(Input[_0xedd8e3(0x16e)]===0x2e){if(_0xedd8e3(0x7c4)!=='PGGkx'){const _0x16304e=_0xedd8e3(0x3e9);this[_0xedd8e3(0x97b)]=this['_colorCache']||{};if(this[_0xedd8e3(0x97b)][_0x16304e])return this[_0xedd8e3(0x97b)][_0x16304e];const _0x12af6d=_0x26535d['CoreEngine'][_0xedd8e3(0x17f)][_0xedd8e3(0x6b1)]['ColorMPGauge1'];return this[_0xedd8e3(0x8a2)](_0x16304e,_0x12af6d);}else this[_0xedd8e3(0x272)]();}else{if(Input[_0xedd8e3(0x16e)]===0x24)this[_0xedd8e3(0x39d)]();else Input[_0xedd8e3(0x16e)]===0x23?this[_0xedd8e3(0x784)]():VisuMZ['CoreEngine'][_0xedd8e3(0x63b)]['call'](this);}}}},Window_NumberInput['prototype'][_0xa0779(0x34b)]=function(){const _0x5bca81=_0xa0779;if(!this[_0x5bca81(0x22d)]())return;Input['isNumpadPressed']()?_0x5bca81(0x989)===_0x5bca81(0x658)?(_0x52a23c[_0x5bca81(0x824)][_0x5bca81(0x1c5)][_0x5bca81(0x398)](this),this[_0x5bca81(0x6d2)]()):this[_0x5bca81(0x73e)]():'BRTBy'!==_0x5bca81(0x233)?this[_0x5bca81(0x308)](_0x258408):Window_Selectable[_0x5bca81(0x271)][_0x5bca81(0x34b)][_0x5bca81(0x398)](this);},Window_NumberInput[_0xa0779(0x271)][_0xa0779(0x7e7)]=function(){},Window_NumberInput[_0xa0779(0x271)][_0xa0779(0x73e)]=function(){const _0x1e7365=_0xa0779;if(String(this[_0x1e7365(0x8af)])[_0x1e7365(0x444)]>=this[_0x1e7365(0x211)])return;const _0x56b622=Number(String(this['_number'])+Input['_inputString']);if(isNaN(_0x56b622))return;this[_0x1e7365(0x8af)]=_0x56b622;const _0xe370c7='9'[_0x1e7365(0x79a)](this[_0x1e7365(0x211)]);this['_number']=this[_0x1e7365(0x8af)]['clamp'](0x0,_0xe370c7),Input[_0x1e7365(0x653)](),this[_0x1e7365(0x1d4)](),SoundManager[_0x1e7365(0x720)](),this['select'](this[_0x1e7365(0x211)]-0x1);},Window_NumberInput[_0xa0779(0x271)]['processKeyboardBackspace']=function(){const _0x2f3ca1=_0xa0779;this[_0x2f3ca1(0x8af)]=Number(String(this[_0x2f3ca1(0x8af)])[_0x2f3ca1(0x2e6)](0x0,-0x1)),this[_0x2f3ca1(0x8af)]=Math[_0x2f3ca1(0x274)](0x0,this[_0x2f3ca1(0x8af)]),Input[_0x2f3ca1(0x653)](),this[_0x2f3ca1(0x1d4)](),SoundManager[_0x2f3ca1(0x720)](),this[_0x2f3ca1(0x56d)](this[_0x2f3ca1(0x211)]-0x1);},Window_NumberInput[_0xa0779(0x271)][_0xa0779(0x272)]=function(){const _0x38d16d=_0xa0779;this['_number']=Number(String(this[_0x38d16d(0x8af)])['substring'](0x1)),this[_0x38d16d(0x8af)]=Math[_0x38d16d(0x274)](0x0,this[_0x38d16d(0x8af)]),Input[_0x38d16d(0x653)](),this['refresh'](),SoundManager[_0x38d16d(0x720)](),this[_0x38d16d(0x56d)](this[_0x38d16d(0x211)]-0x1);},Window_NumberInput[_0xa0779(0x271)][_0xa0779(0x39d)]=function(){const _0x5be348=_0xa0779;if(this[_0x5be348(0x628)]()===0x0)return;Input['clear'](),this[_0x5be348(0x1d4)](),SoundManager[_0x5be348(0x720)](),this[_0x5be348(0x56d)](0x0);},Window_NumberInput[_0xa0779(0x271)][_0xa0779(0x784)]=function(){const _0x263aa4=_0xa0779;if(this[_0x263aa4(0x628)]()===this[_0x263aa4(0x211)]-0x1)return;Input[_0x263aa4(0x653)](),this[_0x263aa4(0x1d4)](),SoundManager['playCursor'](),this[_0x263aa4(0x56d)](this['_maxDigits']-0x1);});;VisuMZ[_0xa0779(0x824)][_0xa0779(0x7c7)]=Window_MapName[_0xa0779(0x271)]['refresh'],Window_MapName[_0xa0779(0x271)]['refresh']=function(){const _0xa5b688=_0xa0779;VisuMZ[_0xa5b688(0x824)]['Settings'][_0xa5b688(0x2b0)][_0xa5b688(0x226)]?this[_0xa5b688(0x30e)]():VisuMZ[_0xa5b688(0x824)][_0xa5b688(0x7c7)]['call'](this);},Window_MapName[_0xa0779(0x271)][_0xa0779(0x30e)]=function(){const _0x7a76a0=_0xa0779;this[_0x7a76a0(0x204)][_0x7a76a0(0x653)]();if($gameMap['displayName']()){const _0x5d3da8=this[_0x7a76a0(0x87c)];this[_0x7a76a0(0x3e3)](0x0,0x0,_0x5d3da8,this[_0x7a76a0(0x981)]());const _0x4e4f23=this[_0x7a76a0(0x4cd)]($gameMap[_0x7a76a0(0x84e)]())[_0x7a76a0(0x3c5)];this[_0x7a76a0(0x227)]($gameMap[_0x7a76a0(0x84e)](),Math['floor']((_0x5d3da8-_0x4e4f23)/0x2),0x0);}},Window_TitleCommand[_0xa0779(0x69e)]=VisuMZ[_0xa0779(0x824)][_0xa0779(0x17f)][_0xa0779(0x74e)],Window_TitleCommand[_0xa0779(0x271)]['makeCommandList']=function(){this['makeCoreEngineCommandList']();},Window_TitleCommand[_0xa0779(0x271)][_0xa0779(0x746)]=function(){const _0x224f8f=_0xa0779;for(const _0x5e04d5 of Window_TitleCommand['_commandList']){if(_0x224f8f(0x2ee)===_0x224f8f(0x2ee)){if(_0x5e04d5[_0x224f8f(0x168)][_0x224f8f(0x398)](this)){if(_0x224f8f(0x378)==='mMgDU')_0x3cef3e[_0x224f8f(0x824)][_0x224f8f(0x545)]['call'](this),_0x472b55[_0x224f8f(0x164)]()&&this[_0x224f8f(0x62e)]();else{const _0x1829ee=_0x5e04d5['Symbol'];let _0x27b9d4=_0x5e04d5[_0x224f8f(0x5a5)];if(['',_0x224f8f(0x29e)]['includes'](_0x27b9d4))_0x27b9d4=_0x5e04d5[_0x224f8f(0x278)][_0x224f8f(0x398)](this);const _0x2a9176=_0x5e04d5['EnableJS']['call'](this),_0x4af65f=_0x5e04d5[_0x224f8f(0x7c0)][_0x224f8f(0x398)](this);this[_0x224f8f(0x8c6)](_0x27b9d4,_0x1829ee,_0x2a9176,_0x4af65f),this['setHandler'](_0x1829ee,_0x5e04d5[_0x224f8f(0x51f)][_0x224f8f(0x30a)](this,_0x4af65f));}}}else{if(_0x59227e['inBattle']())return;_0x1b8641[_0x224f8f(0x510)](_0x27c8a,_0x4c7559);const _0x28228d=_0x3e3ebb['option'][_0x224f8f(0x7c9)]()[_0x224f8f(0x64c)](),_0x7725f=_0x30eec8[_0x224f8f(0x824)]['CreateBattleSystemID'](_0x28228d);_0x44c4c2[_0x224f8f(0x7c6)](_0x7725f);}}},VisuMZ[_0xa0779(0x824)][_0xa0779(0x212)]=Window_TitleCommand[_0xa0779(0x271)][_0xa0779(0x300)],Window_TitleCommand[_0xa0779(0x271)][_0xa0779(0x300)]=function(){const _0x4891d=_0xa0779;VisuMZ[_0x4891d(0x824)][_0x4891d(0x212)]['call'](this);if(!Window_TitleCommand[_0x4891d(0x306)])return;const _0x28ef4d=this['findSymbol'](Window_TitleCommand[_0x4891d(0x306)]),_0x532c8d=Math['floor'](this[_0x4891d(0x5c0)]()/0x2)-0x1;this[_0x4891d(0x6c9)](_0x28ef4d),this[_0x4891d(0x873)]>0x1&&(_0x4891d(0x296)!=='vATFf'?(this[_0x4891d(0x873)]=0x1,this['updateSmoothScroll']()):(_0x8510f4=_0xf8f31b||_0x9b1ade[_0x4891d(0x51c)],_0x620118=_0x180ed0||_0x105db5[_0x4891d(0x4b9)],_0x1d8934=_0x596038['round'](_0x49a4af),_0x520e75=_0x3d0a99[_0x4891d(0x4ee)](_0x23f949),_0x540de4=_0x115957[_0x4891d(0x4ee)](_0x32a174),_0x316405=_0x372a42[_0x4891d(0x4ee)](_0x149faa),_0x84def2[_0x4891d(0x824)][_0x4891d(0x3f7)][_0x4891d(0x398)](this,_0x1a0abe,_0xa06c83,_0x54789a,_0x368985,_0x15fc6b,_0x5cfcc7))),this['setTopRow'](_0x28ef4d-_0x532c8d);},Window_GameEnd['_commandList']=VisuMZ[_0xa0779(0x824)][_0xa0779(0x17f)][_0xa0779(0x250)][_0xa0779(0x881)][_0xa0779(0x9d7)],Window_GameEnd[_0xa0779(0x271)][_0xa0779(0x316)]=function(){const _0x329305=_0xa0779;this[_0x329305(0x746)]();},Window_GameEnd[_0xa0779(0x271)][_0xa0779(0x746)]=function(){const _0x215341=_0xa0779;for(const _0x4d09e9 of Window_GameEnd[_0x215341(0x69e)]){if('tvMyO'!==_0x215341(0x7f7)){if(_0x4d09e9['ShowJS'][_0x215341(0x398)](this)){const _0x1c25eb=_0x4d09e9[_0x215341(0x723)];let _0x57cab9=_0x4d09e9[_0x215341(0x5a5)];if(['',_0x215341(0x29e)][_0x215341(0x84f)](_0x57cab9))_0x57cab9=_0x4d09e9[_0x215341(0x278)][_0x215341(0x398)](this);const _0x425e6e=_0x4d09e9[_0x215341(0x689)][_0x215341(0x398)](this),_0x43a29e=_0x4d09e9['ExtJS']['call'](this);this[_0x215341(0x8c6)](_0x57cab9,_0x1c25eb,_0x425e6e,_0x43a29e),this[_0x215341(0x8d7)](_0x1c25eb,_0x4d09e9[_0x215341(0x51f)][_0x215341(0x30a)](this,_0x43a29e));}}else _0x4c5768[_0x215341(0x30b)](!![]);}};function Window_ButtonAssist(){this['initialize'](...arguments);}Window_ButtonAssist[_0xa0779(0x271)]=Object['create'](Window_Base[_0xa0779(0x271)]),Window_ButtonAssist[_0xa0779(0x271)][_0xa0779(0x8ec)]=Window_ButtonAssist,Window_ButtonAssist['prototype']['initialize']=function(_0x55c668){const _0x1576c6=_0xa0779;this['_data']={},Window_Base[_0x1576c6(0x271)][_0x1576c6(0x288)][_0x1576c6(0x398)](this,_0x55c668),this[_0x1576c6(0x21b)](VisuMZ[_0x1576c6(0x824)][_0x1576c6(0x17f)][_0x1576c6(0x2c3)][_0x1576c6(0x8a1)]||0x0),this[_0x1576c6(0x1d4)]();},Window_ButtonAssist['prototype']['makeFontBigger']=function(){const _0x56f318=_0xa0779;this[_0x56f318(0x204)][_0x56f318(0x9b9)]<=0x60&&(this[_0x56f318(0x204)][_0x56f318(0x9b9)]+=0x6);},Window_ButtonAssist[_0xa0779(0x271)][_0xa0779(0x38f)]=function(){const _0x3dd125=_0xa0779;if(this[_0x3dd125(0x204)][_0x3dd125(0x9b9)]>=0x18){if(_0x3dd125(0x353)!==_0x3dd125(0x91f))this[_0x3dd125(0x204)][_0x3dd125(0x9b9)]-=0x6;else{const _0x5e24e9=_0x25d7d6['displayY']()*_0x40281b[_0x3dd125(0x82f)]();return(this['_y']-_0x5e24e9)*_0x20774c['zoomScale']();}}},Window_ButtonAssist['prototype']['update']=function(){const _0x10adc4=_0xa0779;Window_Base[_0x10adc4(0x271)][_0x10adc4(0x6be)][_0x10adc4(0x398)](this),this[_0x10adc4(0x68b)]();},Window_ButtonAssist[_0xa0779(0x271)][_0xa0779(0x4ab)]=function(){const _0x1f9b36=_0xa0779;this[_0x1f9b36(0x45c)]=SceneManager[_0x1f9b36(0x6a6)][_0x1f9b36(0x7fd)]()!==_0x1f9b36(0x347)?0x0:0x8;},Window_ButtonAssist[_0xa0779(0x271)][_0xa0779(0x68b)]=function(){const _0xcd9421=_0xa0779,_0x11ff3e=SceneManager[_0xcd9421(0x6a6)];for(let _0x13fb0b=0x1;_0x13fb0b<=0x5;_0x13fb0b++){if(this['_data'][_0xcd9421(0x44a)[_0xcd9421(0x6ad)](_0x13fb0b)]!==_0x11ff3e[_0xcd9421(0x4f9)['format'](_0x13fb0b)]())return this[_0xcd9421(0x1d4)]();if(this[_0xcd9421(0x8fc)][_0xcd9421(0x5c4)[_0xcd9421(0x6ad)](_0x13fb0b)]!==_0x11ff3e['buttonAssistText%1'[_0xcd9421(0x6ad)](_0x13fb0b)]())return this[_0xcd9421(0x1d4)]();}},Window_ButtonAssist[_0xa0779(0x271)][_0xa0779(0x1d4)]=function(){const _0xe0570f=_0xa0779;this[_0xe0570f(0x204)][_0xe0570f(0x653)]();for(let _0x57a556=0x1;_0x57a556<=0x5;_0x57a556++){if(_0xe0570f(0x69d)!==_0xe0570f(0x69d)){if(_0x903830[_0xe0570f(0x47f)]==='')return![];if(_0x3bdca2[_0xe0570f(0x47f)]===_0xe0570f(0x76f))return![];if(_0x873953[_0xe0570f(0x458)]==='')return![];if(_0x2a5b5b[_0xe0570f(0x458)]===_0xe0570f(0x887))return![];return!![];}else this[_0xe0570f(0x62a)](_0x57a556);}},Window_ButtonAssist[_0xa0779(0x271)][_0xa0779(0x62a)]=function(_0x5ad119){const _0x2197b7=_0xa0779,_0x3e9341=this[_0x2197b7(0x87c)]/0x5,_0x5cad82=SceneManager['_scene'],_0x5d00aa=_0x5cad82[_0x2197b7(0x4f9)[_0x2197b7(0x6ad)](_0x5ad119)](),_0x4ea956=_0x5cad82['buttonAssistText%1'[_0x2197b7(0x6ad)](_0x5ad119)]();this['_data'][_0x2197b7(0x44a)[_0x2197b7(0x6ad)](_0x5ad119)]=_0x5d00aa,this[_0x2197b7(0x8fc)][_0x2197b7(0x5c4)[_0x2197b7(0x6ad)](_0x5ad119)]=_0x4ea956;if(_0x5d00aa==='')return;if(_0x4ea956==='')return;const _0x36316b=_0x5cad82[_0x2197b7(0x8fd)[_0x2197b7(0x6ad)](_0x5ad119)](),_0x5af1f2=this['itemPadding'](),_0x18952f=_0x3e9341*(_0x5ad119-0x1)+_0x5af1f2+_0x36316b,_0x38c5c2=VisuMZ[_0x2197b7(0x824)][_0x2197b7(0x17f)][_0x2197b7(0x2c3)][_0x2197b7(0x3a4)];this[_0x2197b7(0x227)](_0x38c5c2['format'](_0x5d00aa,_0x4ea956),_0x18952f,0x0,_0x3e9341-_0x5af1f2*0x2);},VisuMZ['CoreEngine'][_0xa0779(0x1dc)]=Game_Interpreter['prototype']['updateWaitMode'],Game_Interpreter['prototype'][_0xa0779(0x9ae)]=function(){const _0x4aaa71=_0xa0779;if($gameTemp[_0x4aaa71(0x7a4)]!==undefined)return _0x4aaa71(0x477)===_0x4aaa71(0x477)?VisuMZ[_0x4aaa71(0x824)][_0x4aaa71(0x69c)]():_0x315588['CoreEngine'][_0x4aaa71(0x17f)]['Window']['EnableMasking'];return VisuMZ[_0x4aaa71(0x824)]['Game_Interpreter_updateWaitMode']['call'](this);},VisuMZ['CoreEngine'][_0xa0779(0x69c)]=function(){const _0x338d72=_0xa0779,_0x1c8fa5=$gameTemp[_0x338d72(0x7a4)]||0x0;if(_0x1c8fa5<0x0||_0x1c8fa5>0x64||TouchInput['isCancelled']()||Input[_0x338d72(0x5ff)](_0x338d72(0x4d2))){if(_0x338d72(0x76b)!==_0x338d72(0x76b)){const _0x3c64de=(_0x4524df[_0x338d72(0x824)][_0x338d72(0x17f)]['BattleSystem']||_0x338d72(0x578))[_0x338d72(0x7c9)]()['trim']();return _0x506bfa[_0x338d72(0x824)][_0x338d72(0x18b)](_0x3c64de);}else $gameTemp[_0x338d72(0x7a4)]=undefined,Input[_0x338d72(0x653)](),TouchInput['clear']();}const _0x28beae=$gameScreen[_0x338d72(0x958)](_0x1c8fa5);if(_0x28beae){if(_0x338d72(0x4eb)!=='GNQTC')return _0x45050f[_0x338d72(0x824)][_0x338d72(0x17f)][_0x338d72(0x2b0)][_0x338d72(0x85e)]?0x0:_0x5d754f[_0x338d72(0x824)][_0x338d72(0x537)][_0x338d72(0x398)](this,_0x198f35);else _0x28beae['_x']=TouchInput['_x'],_0x28beae['_y']=TouchInput['_y'];}return VisuMZ[_0x338d72(0x824)][_0x338d72(0x342)](),$gameTemp[_0x338d72(0x7a4)]!==undefined;},VisuMZ[_0xa0779(0x824)][_0xa0779(0x342)]=function(){const _0x76bf7f=_0xa0779,_0x324aa6=SceneManager[_0x76bf7f(0x6a6)];if(!_0x324aa6)return;!_0x324aa6[_0x76bf7f(0x6d9)]&&(SoundManager['playLoad'](),_0x324aa6[_0x76bf7f(0x6d9)]=new Window_PictureCoordinates(),_0x324aa6[_0x76bf7f(0x894)](_0x324aa6['_pictureCoordinatesWindow'])),$gameTemp['_pictureCoordinatesMode']===undefined&&(SoundManager[_0x76bf7f(0x39b)](),_0x324aa6['removeChild'](_0x324aa6[_0x76bf7f(0x6d9)]),_0x324aa6[_0x76bf7f(0x6d9)]=undefined);};function Window_PictureCoordinates(){this['initialize'](...arguments);}Window_PictureCoordinates['prototype']=Object[_0xa0779(0x208)](Window_Base[_0xa0779(0x271)]),Window_PictureCoordinates[_0xa0779(0x271)][_0xa0779(0x8ec)]=Window_PictureCoordinates,Window_PictureCoordinates[_0xa0779(0x271)][_0xa0779(0x288)]=function(){const _0x132a61=_0xa0779;this[_0x132a61(0x2d3)]='nah',this['_lastX']=_0x132a61(0x957),this[_0x132a61(0x703)]=_0x132a61(0x957);const _0x1f1384=this[_0x132a61(0x8fe)]();Window_Base[_0x132a61(0x271)]['initialize'][_0x132a61(0x398)](this,_0x1f1384),this['setBackgroundType'](0x2);},Window_PictureCoordinates[_0xa0779(0x271)][_0xa0779(0x8fe)]=function(){const _0x111ca4=_0xa0779;let _0x2e0dd9=0x0,_0xdf2d36=Graphics[_0x111ca4(0x7f6)]-this[_0x111ca4(0x981)](),_0xfd66a3=Graphics[_0x111ca4(0x3c5)],_0x251ce6=this['lineHeight']();return new Rectangle(_0x2e0dd9,_0xdf2d36,_0xfd66a3,_0x251ce6);},Window_PictureCoordinates[_0xa0779(0x271)][_0xa0779(0x4ab)]=function(){const _0x333c74=_0xa0779;this[_0x333c74(0x45c)]=0x0;},Window_PictureCoordinates[_0xa0779(0x271)][_0xa0779(0x6be)]=function(){const _0x3dcd0d=_0xa0779;Window_Base[_0x3dcd0d(0x271)][_0x3dcd0d(0x6be)]['call'](this),this['updateData']();},Window_PictureCoordinates[_0xa0779(0x271)][_0xa0779(0x2b4)]=function(){const _0x48bca3=_0xa0779;if(!this['needsUpdate']())return;this[_0x48bca3(0x1d4)]();},Window_PictureCoordinates[_0xa0779(0x271)][_0xa0779(0x1a8)]=function(){const _0x45585e=_0xa0779,_0x406b30=$gameTemp[_0x45585e(0x7a4)],_0xd6c92a=$gameScreen[_0x45585e(0x958)](_0x406b30);if(_0xd6c92a)return this[_0x45585e(0x2d3)]!==_0xd6c92a['_origin']||this['_lastX']!==_0xd6c92a['_x']||this[_0x45585e(0x703)]!==_0xd6c92a['_y'];else{if(_0x45585e(0x229)==='kSHgJ')var _0x183ac6=_0x236136[_0x45585e(0x25a)](_0xfbb5a7*0x2-0x1,_0x45585e(0x974))*0.5+0.5;else return![];}},Window_PictureCoordinates[_0xa0779(0x271)][_0xa0779(0x1d4)]=function(){const _0x30b69a=_0xa0779;this[_0x30b69a(0x204)][_0x30b69a(0x653)]();const _0x3f1c28=$gameTemp[_0x30b69a(0x7a4)],_0x3087d1=$gameScreen[_0x30b69a(0x958)](_0x3f1c28);if(!_0x3087d1)return;this['_lastOrigin']=_0x3087d1[_0x30b69a(0x5d8)],this['_lastX']=_0x3087d1['_x'],this[_0x30b69a(0x703)]=_0x3087d1['_y'];const _0x324dd6=ColorManager[_0x30b69a(0x9c9)]();this[_0x30b69a(0x204)]['fillRect'](0x0,0x0,this['innerWidth'],this[_0x30b69a(0x1d3)],_0x324dd6);const _0x286c79='\x20Origin:\x20%1'['format'](_0x3087d1[_0x30b69a(0x5d8)]===0x0?'Upper\x20Left':_0x30b69a(0x213)),_0x1b4f01=_0x30b69a(0x859)['format'](_0x3087d1['_x']),_0x282bc0=_0x30b69a(0x95c)[_0x30b69a(0x6ad)](_0x3087d1['_y']),_0xa6ec1e=_0x30b69a(0x94b)[_0x30b69a(0x6ad)](TextManager[_0x30b69a(0x170)]('cancel'));let _0x227e7d=Math[_0x30b69a(0x256)](this['innerWidth']/0x4);this[_0x30b69a(0x65f)](_0x286c79,_0x227e7d*0x0,0x0,_0x227e7d),this[_0x30b69a(0x65f)](_0x1b4f01,_0x227e7d*0x1,0x0,_0x227e7d,_0x30b69a(0x9d3)),this[_0x30b69a(0x65f)](_0x282bc0,_0x227e7d*0x2,0x0,_0x227e7d,'center');const _0xb70ae2=this[_0x30b69a(0x4cd)](_0xa6ec1e)['width'],_0xff88d0=this[_0x30b69a(0x87c)]-_0xb70ae2;this[_0x30b69a(0x227)](_0xa6ec1e,_0xff88d0,0x0,_0xb70ae2);},VisuMZ[_0xa0779(0x30b)]=function(_0x198e57){const _0x21da93=_0xa0779;if(Utils[_0x21da93(0x41b)](_0x21da93(0x2ae))){if('tatey'!=='bCJGK'){var _0xa63f90=require('nw.gui')[_0x21da93(0x1ce)][_0x21da93(0x1b5)]();SceneManager[_0x21da93(0x16d)]();if(_0x198e57)setTimeout(_0xa63f90[_0x21da93(0x3fe)]['bind'](_0xa63f90),0x190);}else return _0x21960e[_0x21da93(0x1ab)][_0x21da93(0x4ce)]['call'](this);}},VisuMZ[_0xa0779(0x25a)]=function(_0xc40a6b,_0xfdcaab){const _0x108dd2=_0xa0779;_0xfdcaab=_0xfdcaab[_0x108dd2(0x7c9)]();var _0x419ea4=1.70158,_0x1cc74f=0.7;switch(_0xfdcaab){case _0x108dd2(0x22b):return _0xc40a6b;case'INSINE':return-0x1*Math[_0x108dd2(0x3d0)](_0xc40a6b*(Math['PI']/0x2))+0x1;case'OUTSINE':return Math[_0x108dd2(0x1c3)](_0xc40a6b*(Math['PI']/0x2));case _0x108dd2(0x403):return-0.5*(Math['cos'](Math['PI']*_0xc40a6b)-0x1);case _0x108dd2(0x549):return _0xc40a6b*_0xc40a6b;case'OUTQUAD':return _0xc40a6b*(0x2-_0xc40a6b);case'INOUTQUAD':return _0xc40a6b<0.5?0x2*_0xc40a6b*_0xc40a6b:-0x1+(0x4-0x2*_0xc40a6b)*_0xc40a6b;case'INCUBIC':return _0xc40a6b*_0xc40a6b*_0xc40a6b;case'OUTCUBIC':var _0x4db1cc=_0xc40a6b-0x1;return _0x4db1cc*_0x4db1cc*_0x4db1cc+0x1;case'INOUTCUBIC':return _0xc40a6b<0.5?0x4*_0xc40a6b*_0xc40a6b*_0xc40a6b:(_0xc40a6b-0x1)*(0x2*_0xc40a6b-0x2)*(0x2*_0xc40a6b-0x2)+0x1;case _0x108dd2(0x998):return _0xc40a6b*_0xc40a6b*_0xc40a6b*_0xc40a6b;case _0x108dd2(0x3ae):var _0x4db1cc=_0xc40a6b-0x1;return 0x1-_0x4db1cc*_0x4db1cc*_0x4db1cc*_0x4db1cc;case _0x108dd2(0x59d):var _0x4db1cc=_0xc40a6b-0x1;return _0xc40a6b<0.5?0x8*_0xc40a6b*_0xc40a6b*_0xc40a6b*_0xc40a6b:0x1-0x8*_0x4db1cc*_0x4db1cc*_0x4db1cc*_0x4db1cc;case _0x108dd2(0x4bd):return _0xc40a6b*_0xc40a6b*_0xc40a6b*_0xc40a6b*_0xc40a6b;case _0x108dd2(0x94a):var _0x4db1cc=_0xc40a6b-0x1;return 0x1+_0x4db1cc*_0x4db1cc*_0x4db1cc*_0x4db1cc*_0x4db1cc;case _0x108dd2(0x9cd):var _0x4db1cc=_0xc40a6b-0x1;return _0xc40a6b<0.5?0x10*_0xc40a6b*_0xc40a6b*_0xc40a6b*_0xc40a6b*_0xc40a6b:0x1+0x10*_0x4db1cc*_0x4db1cc*_0x4db1cc*_0x4db1cc*_0x4db1cc;case'INEXPO':if(_0xc40a6b===0x0)return 0x0;return Math[_0x108dd2(0x33e)](0x2,0xa*(_0xc40a6b-0x1));case _0x108dd2(0x206):if(_0xc40a6b===0x1)return 0x1;return-Math[_0x108dd2(0x33e)](0x2,-0xa*_0xc40a6b)+0x1;case'INOUTEXPO':if(_0xc40a6b===0x0||_0xc40a6b===0x1){if(_0x108dd2(0x1ae)==='xVWHS')_0x388eeb[_0x108dd2(0x450)]();else return _0xc40a6b;}var _0x2ef28f=_0xc40a6b*0x2,_0x3141dc=_0x2ef28f-0x1;if(_0x2ef28f<0x1)return 0.5*Math[_0x108dd2(0x33e)](0x2,0xa*_0x3141dc);return 0.5*(-Math['pow'](0x2,-0xa*_0x3141dc)+0x2);case'INCIRC':var _0x2ef28f=_0xc40a6b/0x1;return-0x1*(Math['sqrt'](0x1-_0x2ef28f*_0xc40a6b)-0x1);case'OUTCIRC':var _0x4db1cc=_0xc40a6b-0x1;return Math['sqrt'](0x1-_0x4db1cc*_0x4db1cc);case _0x108dd2(0x436):var _0x2ef28f=_0xc40a6b*0x2,_0x3141dc=_0x2ef28f-0x2;if(_0x2ef28f<0x1)return-0.5*(Math[_0x108dd2(0x699)](0x1-_0x2ef28f*_0x2ef28f)-0x1);return 0.5*(Math[_0x108dd2(0x699)](0x1-_0x3141dc*_0x3141dc)+0x1);case _0x108dd2(0x874):return _0xc40a6b*_0xc40a6b*((_0x419ea4+0x1)*_0xc40a6b-_0x419ea4);case _0x108dd2(0x463):var _0x2ef28f=_0xc40a6b/0x1-0x1;return _0x2ef28f*_0x2ef28f*((_0x419ea4+0x1)*_0x2ef28f+_0x419ea4)+0x1;break;case _0x108dd2(0x754):var _0x2ef28f=_0xc40a6b*0x2,_0x1bdce3=_0x2ef28f-0x2,_0x1eea5f=_0x419ea4*1.525;if(_0x2ef28f<0x1){if(_0x108dd2(0x4a0)!==_0x108dd2(0x37f))return 0.5*_0x2ef28f*_0x2ef28f*((_0x1eea5f+0x1)*_0x2ef28f-_0x1eea5f);else{var _0x389cbd=_0x1da30f(_0x66cb32['$1']);_0x1a87d8*=_0x389cbd;}}return 0.5*(_0x1bdce3*_0x1bdce3*((_0x1eea5f+0x1)*_0x1bdce3+_0x1eea5f)+0x2);case _0x108dd2(0x279):if(_0xc40a6b===0x0||_0xc40a6b===0x1){if(_0x108dd2(0x6dc)===_0x108dd2(0x434)){if(_0x19fcf9['CoreEngine'][_0x108dd2(0x17f)]['QoL'][_0x108dd2(0x9f4)])this[_0x108dd2(0x1c0)]();else return _0x4f1b55['CoreEngine'][_0x108dd2(0x687)][_0x108dd2(0x398)](this);}else return _0xc40a6b;}var _0x2ef28f=_0xc40a6b/0x1,_0x3141dc=_0x2ef28f-0x1,_0x2a5c76=0x1-_0x1cc74f,_0x1eea5f=_0x2a5c76/(0x2*Math['PI'])*Math[_0x108dd2(0x36a)](0x1);return-(Math[_0x108dd2(0x33e)](0x2,0xa*_0x3141dc)*Math['sin']((_0x3141dc-_0x1eea5f)*(0x2*Math['PI'])/_0x2a5c76));case _0x108dd2(0x9ac):var _0x2a5c76=0x1-_0x1cc74f,_0x2ef28f=_0xc40a6b*0x2;if(_0xc40a6b===0x0||_0xc40a6b===0x1)return'LAVEK'===_0x108dd2(0x3fc)?_0xc40a6b:'';var _0x1eea5f=_0x2a5c76/(0x2*Math['PI'])*Math['asin'](0x1);return Math[_0x108dd2(0x33e)](0x2,-0xa*_0x2ef28f)*Math[_0x108dd2(0x1c3)]((_0x2ef28f-_0x1eea5f)*(0x2*Math['PI'])/_0x2a5c76)+0x1;case _0x108dd2(0x2fa):var _0x2a5c76=0x1-_0x1cc74f;if(_0xc40a6b===0x0||_0xc40a6b===0x1){if(_0x108dd2(0x81f)===_0x108dd2(0x2b8))_0x31183d['VisuMZ_2_BattleSystemFTB']&&(this['_forcedBattleSys']=_0x108dd2(0x32d));else return _0xc40a6b;}var _0x2ef28f=_0xc40a6b*0x2,_0x3141dc=_0x2ef28f-0x1,_0x1eea5f=_0x2a5c76/(0x2*Math['PI'])*Math[_0x108dd2(0x36a)](0x1);if(_0x2ef28f<0x1){if('UqYDg'===_0x108dd2(0x74a))!this[_0x108dd2(0x87d)]&&(this[_0x108dd2(0x690)]+=_0x22e955['round']((_0x3c76ba[_0x108dd2(0x7f6)]-0x270)/0x2),this['_screenY']-=_0xf2af94[_0x108dd2(0x256)]((_0x167a99['height']-_0x317f73[_0x108dd2(0x2f3)])/0x2),_0x2f02ea[_0x108dd2(0x6b0)]()?this[_0x108dd2(0x66e)]-=_0x4be58e[_0x108dd2(0x256)]((_0xc7b2ce[_0x108dd2(0x3c5)]-_0x14c76f[_0x108dd2(0x66f)])/0x2):this['_screenX']+=_0x3c9d41[_0x108dd2(0x4ee)]((_0x541022[_0x108dd2(0x66f)]-0x330)/0x2)),this[_0x108dd2(0x87d)]=!![];else return-0.5*(Math[_0x108dd2(0x33e)](0x2,0xa*_0x3141dc)*Math[_0x108dd2(0x1c3)]((_0x3141dc-_0x1eea5f)*(0x2*Math['PI'])/_0x2a5c76));}return Math[_0x108dd2(0x33e)](0x2,-0xa*_0x3141dc)*Math[_0x108dd2(0x1c3)]((_0x3141dc-_0x1eea5f)*(0x2*Math['PI'])/_0x2a5c76)*0.5+0x1;case _0x108dd2(0x2be):var _0x2ef28f=_0xc40a6b/0x1;if(_0x2ef28f<0x1/2.75)return 7.5625*_0x2ef28f*_0x2ef28f;else{if(_0x2ef28f<0x2/2.75){if(_0x108dd2(0x6bf)===_0x108dd2(0x6bf)){var _0x1bdce3=_0x2ef28f-1.5/2.75;return 7.5625*_0x1bdce3*_0x1bdce3+0.75;}else _0x540ab8['CoreEngine'][_0x108dd2(0x667)][_0x108dd2(0x398)](this),this[_0x108dd2(0x56d)](this['_maxDigits']-0x1),_0xebbaf9['clear']();}else{if(_0x2ef28f<2.5/2.75){var _0x1bdce3=_0x2ef28f-2.25/2.75;return 7.5625*_0x1bdce3*_0x1bdce3+0.9375;}else{if(_0x108dd2(0x79b)!==_0x108dd2(0x55d)){var _0x1bdce3=_0x2ef28f-2.625/2.75;return 7.5625*_0x1bdce3*_0x1bdce3+0.984375;}else this[_0x108dd2(0x533)]='SV';}}}case'INBOUNCE':var _0x4a889d=0x1-VisuMZ[_0x108dd2(0x25a)](0x1-_0xc40a6b,_0x108dd2(0x974));return _0x4a889d;case _0x108dd2(0x5f8):if(_0xc40a6b<0.5){if(_0x108dd2(0x78d)===_0x108dd2(0x9d1))this[_0x108dd2(0x8a6)]['x']=this[_0x108dd2(0x4f5)]['x'],this['_anchor']['y']=this['_targetAnchor']['y'];else var _0x4a889d=VisuMZ['ApplyEasing'](_0xc40a6b*0x2,_0x108dd2(0x42e))*0.5;}else var _0x4a889d=VisuMZ['ApplyEasing'](_0xc40a6b*0x2-0x1,'outbounce')*0.5+0.5;return _0x4a889d;default:return _0xc40a6b;}},VisuMZ['GetParamIcon']=function(_0x48b90e){const _0x2c36e3=_0xa0779;_0x48b90e=String(_0x48b90e)[_0x2c36e3(0x7c9)]();const _0xee7b24=VisuMZ[_0x2c36e3(0x824)][_0x2c36e3(0x17f)]['Param'];if(_0x48b90e===_0x2c36e3(0x37a))return _0xee7b24[_0x2c36e3(0x195)];if(_0x48b90e===_0x2c36e3(0x8d2))return _0xee7b24[_0x2c36e3(0x3c1)];if(_0x48b90e===_0x2c36e3(0x691))return _0xee7b24[_0x2c36e3(0x4fa)];if(_0x48b90e===_0x2c36e3(0x29c))return _0xee7b24['IconParam3'];if(_0x48b90e===_0x2c36e3(0x418))return _0xee7b24[_0x2c36e3(0x6e9)];if(_0x48b90e==='MDF')return _0xee7b24[_0x2c36e3(0x8cb)];if(_0x48b90e===_0x2c36e3(0x1c8))return _0xee7b24[_0x2c36e3(0x198)];if(_0x48b90e===_0x2c36e3(0x2d4))return _0xee7b24['IconParam7'];if(_0x48b90e===_0x2c36e3(0x64f))return _0xee7b24[_0x2c36e3(0x428)];if(_0x48b90e===_0x2c36e3(0x329))return _0xee7b24['IconXParam1'];if(_0x48b90e==='CRI')return _0xee7b24['IconXParam2'];if(_0x48b90e===_0x2c36e3(0x7d9))return _0xee7b24['IconXParam3'];if(_0x48b90e===_0x2c36e3(0x3df))return _0xee7b24[_0x2c36e3(0x7ef)];if(_0x48b90e==='MRF')return _0xee7b24[_0x2c36e3(0x541)];if(_0x48b90e===_0x2c36e3(0x630))return _0xee7b24[_0x2c36e3(0x1fb)];if(_0x48b90e===_0x2c36e3(0x399))return _0xee7b24[_0x2c36e3(0x2e2)];if(_0x48b90e==='MRG')return _0xee7b24[_0x2c36e3(0x607)];if(_0x48b90e===_0x2c36e3(0x938))return _0xee7b24[_0x2c36e3(0x31e)];if(_0x48b90e===_0x2c36e3(0x9e3))return _0xee7b24[_0x2c36e3(0x309)];if(_0x48b90e===_0x2c36e3(0x64e))return _0xee7b24[_0x2c36e3(0x722)];if(_0x48b90e===_0x2c36e3(0x9d8))return _0xee7b24['IconSParam2'];if(_0x48b90e===_0x2c36e3(0x3cc))return _0xee7b24['IconSParam3'];if(_0x48b90e===_0x2c36e3(0x788))return _0xee7b24[_0x2c36e3(0x284)];if(_0x48b90e==='TCR')return _0xee7b24[_0x2c36e3(0x1f3)];if(_0x48b90e==='PDR')return _0xee7b24[_0x2c36e3(0x2c1)];if(_0x48b90e==='MDR')return _0xee7b24[_0x2c36e3(0x7f1)];if(_0x48b90e===_0x2c36e3(0x69a))return _0xee7b24['IconSParam8'];if(_0x48b90e===_0x2c36e3(0x963))return _0xee7b24[_0x2c36e3(0x4b7)];if(VisuMZ[_0x2c36e3(0x824)][_0x2c36e3(0x489)][_0x48b90e])return VisuMZ[_0x2c36e3(0x824)][_0x2c36e3(0x489)][_0x48b90e]||0x0;return 0x0;},VisuMZ[_0xa0779(0x5b1)]=function(_0x2a2863,_0x4dfc76,_0x1907b4){const _0x5e7160=_0xa0779;if(_0x1907b4===undefined&&_0x2a2863%0x1===0x0)return _0x2a2863;if(_0x1907b4!==undefined&&[_0x5e7160(0x37a),_0x5e7160(0x8d2),_0x5e7160(0x691),_0x5e7160(0x29c),_0x5e7160(0x418),'MDF',_0x5e7160(0x1c8),'LUK'][_0x5e7160(0x84f)](String(_0x1907b4)[_0x5e7160(0x7c9)]()['trim']()))return _0x2a2863;_0x4dfc76=_0x4dfc76||0x0;if(VisuMZ[_0x5e7160(0x824)][_0x5e7160(0x83f)][_0x1907b4])return VisuMZ[_0x5e7160(0x824)][_0x5e7160(0x9b5)][_0x1907b4]===_0x5e7160(0x52a)?_0x2a2863:String((_0x2a2863*0x64)[_0x5e7160(0x99e)](_0x4dfc76))+'%';return String((_0x2a2863*0x64)['toFixed'](_0x4dfc76))+'%';},VisuMZ['GroupDigits']=function(_0x3f8a34){const _0x537d4d=_0xa0779;_0x3f8a34=String(_0x3f8a34);if(!_0x3f8a34)return _0x3f8a34;if(typeof _0x3f8a34!==_0x537d4d(0x475))return _0x3f8a34;const _0x3cd51a=VisuMZ[_0x537d4d(0x824)][_0x537d4d(0x17f)][_0x537d4d(0x2b0)][_0x537d4d(0x846)]||'en-US',_0x2ab3e3={'maximumFractionDigits':0x6};_0x3f8a34=_0x3f8a34[_0x537d4d(0x710)](/\[(.*?)\]/g,(_0x407712,_0xd15d51)=>{const _0x15da25=_0x537d4d;return VisuMZ[_0x15da25(0x36e)](_0xd15d51,'[',']');}),_0x3f8a34=_0x3f8a34[_0x537d4d(0x710)](/<(.*?)>/g,(_0x4cb8e0,_0x502a35)=>{const _0x351a97=_0x537d4d;if(_0x351a97(0x888)===_0x351a97(0x5cb)){var _0x79e58c=_0x19799f(_0x754d8f['$1']);_0x4c2edf+=_0x79e58c;}else return VisuMZ['PreserveNumbers'](_0x502a35,'<','>');}),_0x3f8a34=_0x3f8a34[_0x537d4d(0x710)](/\{\{(.*?)\}\}/g,(_0x31aea4,_0x3fda7e)=>{const _0x58d122=_0x537d4d;if(_0x58d122(0x355)===_0x58d122(0x44b)){const _0x146772='_stored_expGaugeColor1';this[_0x58d122(0x97b)]=this['_colorCache']||{};if(this[_0x58d122(0x97b)][_0x146772])return this['_colorCache'][_0x146772];const _0x5cf425=_0x4f41ed[_0x58d122(0x824)][_0x58d122(0x17f)]['Color'][_0x58d122(0x899)];return this[_0x58d122(0x8a2)](_0x146772,_0x5cf425);}else return VisuMZ['PreserveNumbers'](_0x3fda7e,'','');}),_0x3f8a34=_0x3f8a34[_0x537d4d(0x710)](/(\d+\.?\d*)/g,(_0x23784c,_0xcbc8f)=>{const _0x9fc45c=_0x537d4d;if(_0x9fc45c(0x50f)!==_0x9fc45c(0x7df)){let _0x560b7b=_0xcbc8f;if(_0x560b7b[0x0]==='0')return _0x560b7b;if(_0x560b7b[_0x560b7b[_0x9fc45c(0x444)]-0x1]==='.')return Number(_0x560b7b)['toLocaleString'](_0x3cd51a,_0x2ab3e3)+'.';else{if(_0x560b7b[_0x560b7b['length']-0x1]===','){if(_0x9fc45c(0x850)!=='QtDuP'){const _0x17504a=this[_0x9fc45c(0x27c)](),_0x4504ff=this['paramY'](_0x1ec1e7);this[_0x9fc45c(0x4b8)](_0x17504a,_0x4504ff,_0x2fa0d9),_0x48162d++;}else return Number(_0x560b7b)[_0x9fc45c(0x17d)](_0x3cd51a,_0x2ab3e3)+',';}else return Number(_0x560b7b)[_0x9fc45c(0x17d)](_0x3cd51a,_0x2ab3e3);}}else{const _0x138fe4=_0x2096b8[_0x4bbda1];_0x138fe4?this['setup'](_0x138fe4[_0x9fc45c(0x591)],0x0):this[_0x9fc45c(0x5d6)]();}});let _0x4c5ae1=0x3;while(_0x4c5ae1--){_0x537d4d(0x852)===_0x537d4d(0x852)?_0x3f8a34=VisuMZ[_0x537d4d(0x365)](_0x3f8a34):this['_hideTileShadows']=!![];}return _0x3f8a34;},VisuMZ['PreserveNumbers']=function(_0x5c8c8a,_0xff392d,_0x38eed8){const _0x320038=_0xa0779;return _0x5c8c8a=_0x5c8c8a[_0x320038(0x710)](/(\d)/gi,(_0x5e86b7,_0x4bb5a0)=>_0x320038(0x4c8)['format'](Number(_0x4bb5a0))),'%2%1%3'[_0x320038(0x6ad)](_0x5c8c8a,_0xff392d,_0x38eed8);},VisuMZ[_0xa0779(0x365)]=function(_0x17b418){const _0xb516a3=_0xa0779;return _0x17b418=_0x17b418[_0xb516a3(0x710)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x3d2c53,_0x2ccd55)=>Number(parseInt(_0x2ccd55))),_0x17b418;},VisuMZ[_0xa0779(0x8d4)]=function(_0x175967){const _0x5181e3=_0xa0779;SoundManager[_0x5181e3(0x509)]();if(!Utils['isNwjs']()){const _0x474a6f=window[_0x5181e3(0x8db)](_0x175967,_0x5181e3(0x2a0));}else{if(_0x5181e3(0x5d2)===_0x5181e3(0x5d2)){const _0xa121ae=process['platform']=='darwin'?_0x5181e3(0x8db):process[_0x5181e3(0x1fa)]==_0x5181e3(0x7a8)?_0x5181e3(0x5b8):_0x5181e3(0x18d);require(_0x5181e3(0x83b))[_0x5181e3(0x483)](_0xa121ae+'\x20'+_0x175967);}else return _0x42fc43[_0x5181e3(0x25e)];}},VisuMZ['createKeyJS']=function(_0x1fd03f,_0x29c2ae){const _0x33661a=_0xa0779;if(!_0x1fd03f)return'';const _0x1a12f3=_0x1fd03f[_0x33661a(0x614)]||_0x1fd03f['id'];let _0xe1b372='';_0x1fd03f[_0x33661a(0x27b)]!==undefined&&_0x1fd03f[_0x33661a(0x2df)]!==undefined&&(_0xe1b372=_0x33661a(0x99a)['format'](_0x1a12f3,_0x29c2ae));if(_0x1fd03f[_0x33661a(0x7b8)]!==undefined&&_0x1fd03f[_0x33661a(0x1c4)]!==undefined){if(_0x33661a(0x474)===_0x33661a(0x474))_0xe1b372=_0x33661a(0x9ab)[_0x33661a(0x6ad)](_0x1a12f3,_0x29c2ae);else{const _0x5d962e=new _0x3cdbfd(_0x3bfc57);this['addChild'](_0x5d962e);}}return _0x1fd03f[_0x33661a(0x635)]!==undefined&&_0x1fd03f['requiredWtypeId1']!==undefined&&(_0x33661a(0x8be)===_0x33661a(0x87e)?this['backOpacity']=_0x15b6db[_0x33661a(0x7bb)]():_0xe1b372='Skill-%1-%2'[_0x33661a(0x6ad)](_0x1a12f3,_0x29c2ae)),_0x1fd03f[_0x33661a(0x280)]!==undefined&&_0x1fd03f[_0x33661a(0x486)]!==undefined&&(_0xe1b372=_0x33661a(0x930)[_0x33661a(0x6ad)](_0x1a12f3,_0x29c2ae)),_0x1fd03f['wtypeId']!==undefined&&_0x1fd03f[_0x33661a(0x25f)]===0x1&&(_0xe1b372='Weapon-%1-%2'[_0x33661a(0x6ad)](_0x1a12f3,_0x29c2ae)),_0x1fd03f[_0x33661a(0x8d1)]!==undefined&&_0x1fd03f[_0x33661a(0x25f)]>0x1&&('GJlVI'!==_0x33661a(0x5c5)?this['isUseModernControls']()?(this[_0x33661a(0x442)](),this['processCursorHomeEndTrigger']()):_0x172515[_0x33661a(0x824)][_0x33661a(0x2c6)][_0x33661a(0x398)](this):_0xe1b372=_0x33661a(0x820)[_0x33661a(0x6ad)](_0x1a12f3,_0x29c2ae)),_0x1fd03f[_0x33661a(0x78f)]!==undefined&&_0x1fd03f['battlerHue']!==undefined&&(_0xe1b372=_0x33661a(0x86d)[_0x33661a(0x6ad)](_0x1a12f3,_0x29c2ae)),_0x1fd03f[_0x33661a(0x451)]!==undefined&&_0x1fd03f[_0x33661a(0x231)]!==undefined&&(_0xe1b372=_0x33661a(0x7e8)['format'](_0x1a12f3,_0x29c2ae)),_0xe1b372;},Game_Picture[_0xa0779(0x271)][_0xa0779(0x44e)]=function(){const _0x43da31=_0xa0779;return this[_0x43da31(0x8a6)];},VisuMZ[_0xa0779(0x824)]['Game_Picture_initBasic']=Game_Picture[_0xa0779(0x271)]['initBasic'],Game_Picture[_0xa0779(0x271)][_0xa0779(0x5fc)]=function(){const _0x2e1590=_0xa0779;VisuMZ[_0x2e1590(0x824)][_0x2e1590(0x26a)]['call'](this),this[_0x2e1590(0x8a6)]={'x':0x0,'y':0x0},this['_targetAnchor']={'x':0x0,'y':0x0};},VisuMZ[_0xa0779(0x824)][_0xa0779(0x488)]=Game_Picture[_0xa0779(0x271)][_0xa0779(0x7bd)],Game_Picture['prototype'][_0xa0779(0x7bd)]=function(){const _0x69114a=_0xa0779;this[_0x69114a(0x192)]();const _0x341d34=this['_duration'];VisuMZ['CoreEngine'][_0x69114a(0x488)][_0x69114a(0x398)](this);if(_0x341d34>0x0&&this['_duration']<=0x0){if('ptfPl'!=='ptfPl')return _0x18327a['Keyboard']||'Keyboard';else this['_x']=this[_0x69114a(0x597)],this['_y']=this[_0x69114a(0x60c)],this[_0x69114a(0x2fd)]=this[_0x69114a(0x209)],this[_0x69114a(0x64b)]=this[_0x69114a(0x8d8)],this[_0x69114a(0x680)]=this[_0x69114a(0x71c)],this[_0x69114a(0x8a6)]&&(this[_0x69114a(0x8a6)]['x']=this['_targetAnchor']['x'],this['_anchor']['y']=this[_0x69114a(0x4f5)]['y']);}},VisuMZ['CoreEngine'][_0xa0779(0x55b)]=Game_Picture[_0xa0779(0x271)][_0xa0779(0x840)],Game_Picture[_0xa0779(0x271)][_0xa0779(0x840)]=function(_0x2d87ec,_0x35bfae,_0x350024,_0x1781f7,_0x3aef29,_0x55974e,_0x51f685,_0x5d2cb9){const _0x31a836=_0xa0779;VisuMZ[_0x31a836(0x824)][_0x31a836(0x55b)]['call'](this,_0x2d87ec,_0x35bfae,_0x350024,_0x1781f7,_0x3aef29,_0x55974e,_0x51f685,_0x5d2cb9),this[_0x31a836(0x7bc)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x35bfae]||{'x':0x0,'y':0x0});},VisuMZ[_0xa0779(0x824)][_0xa0779(0x6b8)]=Game_Picture['prototype'][_0xa0779(0x427)],Game_Picture[_0xa0779(0x271)]['move']=function(_0x3214e0,_0x15898f,_0xa639d5,_0x381ff9,_0x4ada91,_0x114a50,_0x2dd906,_0x502fd7,_0x2d56da){const _0x4614d8=_0xa0779;VisuMZ['CoreEngine'][_0x4614d8(0x6b8)][_0x4614d8(0x398)](this,_0x3214e0,_0x15898f,_0xa639d5,_0x381ff9,_0x4ada91,_0x114a50,_0x2dd906,_0x502fd7,_0x2d56da),this[_0x4614d8(0x55e)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x3214e0]||{'x':0x0,'y':0x0});},Game_Picture[_0xa0779(0x271)][_0xa0779(0x192)]=function(){const _0x2f4a30=_0xa0779;this[_0x2f4a30(0x7fb)]>0x0&&(_0x2f4a30(0x704)!==_0x2f4a30(0x711)?(this[_0x2f4a30(0x8a6)]['x']=this[_0x2f4a30(0x5dc)](this['_anchor']['x'],this[_0x2f4a30(0x4f5)]['x']),this[_0x2f4a30(0x8a6)]['y']=this[_0x2f4a30(0x5dc)](this[_0x2f4a30(0x8a6)]['y'],this[_0x2f4a30(0x4f5)]['y'])):(this[_0x2f4a30(0x686)]=new _0x2becf7(),this[_0x2f4a30(0x686)][_0x2f4a30(0x346)]=new _0x2c6bde(0x0,0x0),this[_0x2f4a30(0x686)]['x']=0x0,this['addChildToBack'](this[_0x2f4a30(0x686)])));},Game_Picture[_0xa0779(0x271)]['setAnchor']=function(_0x220b74){const _0x284d6a=_0xa0779;this['_anchor']=_0x220b74,this[_0x284d6a(0x4f5)]=JsonEx[_0x284d6a(0x323)](this['_anchor']);},Game_Picture[_0xa0779(0x271)][_0xa0779(0x55e)]=function(_0x4e74cc){const _0x16de09=_0xa0779;this[_0x16de09(0x4f5)]=_0x4e74cc;},VisuMZ[_0xa0779(0x824)][_0xa0779(0x3c2)]=Sprite_Picture[_0xa0779(0x271)]['updateOrigin'],Sprite_Picture[_0xa0779(0x271)][_0xa0779(0x3bf)]=function(){const _0x3c5406=_0xa0779,_0x362b42=this['picture']();!_0x362b42['anchor']()?VisuMZ[_0x3c5406(0x824)][_0x3c5406(0x3c2)]['call'](this):(this['anchor']['x']=_0x362b42[_0x3c5406(0x44e)]()['x'],this[_0x3c5406(0x44e)]['y']=_0x362b42[_0x3c5406(0x44e)]()['y']);},Game_Action[_0xa0779(0x271)][_0xa0779(0x35e)]=function(_0x3f7c66){const _0x48a261=_0xa0779;if(_0x3f7c66){if(_0x48a261(0x2bc)!=='magNR')_0x3e9129[_0x48a261(0x7bb)]?this[_0x48a261(0x27f)]=_0x47c041['windowOpacity']():this[_0x48a261(0x27f)]=_0x405f1d[_0x48a261(0x824)]['Settings']['Window'][_0x48a261(0x965)];else{const _0x29def0=_0x3f7c66[_0x48a261(0x2b5)];if(_0x29def0===0x1&&this[_0x48a261(0x26f)]()[_0x48a261(0x57c)]()!==0x1)this['setAttack']();else _0x29def0===0x2&&this[_0x48a261(0x26f)]()[_0x48a261(0x96e)]()!==0x2?this[_0x48a261(0x17a)]():this[_0x48a261(0x5a1)](_0x29def0);}}else this['clear']();},Game_Actor[_0xa0779(0x271)]['usableSkills']=function(){const _0x3363ce=_0xa0779;return this['skills']()[_0x3363ce(0x7ae)](_0x3e046a=>this['canUse'](_0x3e046a)&&this[_0x3363ce(0x4cc)]()[_0x3363ce(0x84f)](_0x3e046a[_0x3363ce(0x635)]));},Window_Base[_0xa0779(0x271)][_0xa0779(0x8b4)]=function(){const _0x43bbbc=_0xa0779;this[_0x43bbbc(0x686)]=new Sprite(),this[_0x43bbbc(0x686)][_0x43bbbc(0x346)]=new Bitmap(0x0,0x0),this[_0x43bbbc(0x686)]['x']=0x0,this[_0x43bbbc(0x2dc)](this[_0x43bbbc(0x686)]);},Window_Base[_0xa0779(0x271)][_0xa0779(0x6cd)]=function(){const _0x317b6d=_0xa0779;if(this[_0x317b6d(0x686)]){if(_0x317b6d(0x2eb)!==_0x317b6d(0x518)){const _0x52886e=this['_dimmerSprite']['bitmap'],_0x224bd9=this[_0x317b6d(0x3c5)],_0x2f03db=this[_0x317b6d(0x7f6)],_0x45c0df=this[_0x317b6d(0x45c)],_0x3790a8=ColorManager[_0x317b6d(0x50e)](),_0x2800fa=ColorManager[_0x317b6d(0x5b2)]();_0x52886e[_0x317b6d(0x5bf)](_0x224bd9,_0x2f03db),_0x52886e[_0x317b6d(0x80e)](0x0,0x0,_0x224bd9,_0x45c0df,_0x2800fa,_0x3790a8,!![]),_0x52886e[_0x317b6d(0x5c6)](0x0,_0x45c0df,_0x224bd9,_0x2f03db-_0x45c0df*0x2,_0x3790a8),_0x52886e[_0x317b6d(0x80e)](0x0,_0x2f03db-_0x45c0df,_0x224bd9,_0x45c0df,_0x3790a8,_0x2800fa,!![]),this[_0x317b6d(0x686)][_0x317b6d(0x9d4)](0x0,0x0,_0x224bd9,_0x2f03db);}else{const _0x23f9cc='_stored_deathColor';this[_0x317b6d(0x97b)]=this[_0x317b6d(0x97b)]||{};if(this['_colorCache'][_0x23f9cc])return this[_0x317b6d(0x97b)][_0x23f9cc];const _0x24cda0=_0x5ba60d['CoreEngine'][_0x317b6d(0x17f)][_0x317b6d(0x6b1)]['ColorDeath'];return this[_0x317b6d(0x8a2)](_0x23f9cc,_0x24cda0);}}},Game_Actor['prototype'][_0xa0779(0x980)]=function(){const _0x7412c0=_0xa0779;for(let _0x587ead=0x0;_0x587ead<this[_0x7412c0(0x373)]();_0x587ead++){const _0x224764=this[_0x7412c0(0x601)]();let _0x5d84cd=Number['MIN_SAFE_INTEGER'];this[_0x7412c0(0x762)](_0x587ead,_0x224764[0x0]);for(const _0x53582d of _0x224764){if(_0x7412c0(0x959)===_0x7412c0(0x171))_0x28aa1e[_0x7412c0(0x824)]['Scene_Map_updateMain'][_0x7412c0(0x398)](this),this[_0x7412c0(0x290)]();else{const _0xd1bad4=_0x53582d[_0x7412c0(0x27d)]();_0xd1bad4>_0x5d84cd&&(_0x5d84cd=_0xd1bad4,this[_0x7412c0(0x762)](_0x587ead,_0x53582d));}}}this['setActionState'](_0x7412c0(0x219));},Window_BattleItem[_0xa0779(0x271)][_0xa0779(0x7da)]=function(_0x33da9c){const _0x45a88c=_0xa0779;return BattleManager[_0x45a88c(0x161)]()?BattleManager[_0x45a88c(0x161)]()['canUse'](_0x33da9c):Window_ItemList[_0x45a88c(0x271)][_0x45a88c(0x7da)]['call'](this,_0x33da9c);},VisuMZ[_0xa0779(0x824)][_0xa0779(0x9da)]=Scene_Map['prototype'][_0xa0779(0x1e3)],Scene_Map[_0xa0779(0x271)][_0xa0779(0x1e3)]=function(){const _0x31eb95=_0xa0779;VisuMZ['CoreEngine'][_0x31eb95(0x9da)]['call'](this);const _0xfed84b=this['_spriteset']['_timerSprite'];if(_0xfed84b)this[_0x31eb95(0x894)](_0xfed84b);},VisuMZ[_0xa0779(0x824)][_0xa0779(0x709)]=Scene_Battle[_0xa0779(0x271)][_0xa0779(0x1e3)],Scene_Battle['prototype'][_0xa0779(0x1e3)]=function(){const _0x203a89=_0xa0779;VisuMZ['CoreEngine'][_0x203a89(0x709)][_0x203a89(0x398)](this);const _0x5d06fa=this['_spriteset'][_0x203a89(0x759)];if(_0x5d06fa)this[_0x203a89(0x894)](_0x5d06fa);},Sprite_Actor[_0xa0779(0x271)][_0xa0779(0x6be)]=function(){const _0x2f983d=_0xa0779;Sprite_Battler[_0x2f983d(0x271)]['update'][_0x2f983d(0x398)](this),this[_0x2f983d(0x9e0)]();if(this[_0x2f983d(0x1db)])this[_0x2f983d(0x2fb)]();else this[_0x2f983d(0x6ce)]!==''&&(this[_0x2f983d(0x6ce)]='');},Window[_0xa0779(0x271)][_0xa0779(0x9ea)]=function(){const _0x623754=_0xa0779,_0x179e3b=this[_0x623754(0x63a)],_0x3c7827=this['_height'],_0x32695a=0x18,_0xd09e7=_0x32695a/0x2,_0x5031ac=0x60+_0x32695a,_0x44e6b0=0x0+_0x32695a;this['_downArrowSprite'][_0x623754(0x346)]=this[_0x623754(0x4a1)],this['_downArrowSprite'][_0x623754(0x44e)]['x']=0.5,this[_0x623754(0x3ba)][_0x623754(0x44e)]['y']=0.5,this['_downArrowSprite'][_0x623754(0x9d4)](_0x5031ac+_0xd09e7,_0x44e6b0+_0xd09e7+_0x32695a,_0x32695a,_0xd09e7),this[_0x623754(0x3ba)][_0x623754(0x427)](Math[_0x623754(0x4ee)](_0x179e3b/0x2),Math[_0x623754(0x4ee)](_0x3c7827-_0xd09e7)),this[_0x623754(0x58a)][_0x623754(0x346)]=this[_0x623754(0x4a1)],this[_0x623754(0x58a)]['anchor']['x']=0.5,this['_upArrowSprite'][_0x623754(0x44e)]['y']=0.5,this[_0x623754(0x58a)]['setFrame'](_0x5031ac+_0xd09e7,_0x44e6b0,_0x32695a,_0xd09e7),this[_0x623754(0x58a)][_0x623754(0x427)](Math['round'](_0x179e3b/0x2),Math[_0x623754(0x4ee)](_0xd09e7));},Window[_0xa0779(0x271)][_0xa0779(0x152)]=function(){const _0x2274a8=_0xa0779,_0x216369=0x90,_0x16ae12=0x60,_0x5d5862=0x18;this[_0x2274a8(0x708)][_0x2274a8(0x346)]=this[_0x2274a8(0x4a1)],this['_pauseSignSprite'][_0x2274a8(0x44e)]['x']=0.5,this['_pauseSignSprite']['anchor']['y']=0x1,this[_0x2274a8(0x708)][_0x2274a8(0x427)](Math[_0x2274a8(0x4ee)](this['_width']/0x2),this[_0x2274a8(0x6c5)]),this[_0x2274a8(0x708)][_0x2274a8(0x9d4)](_0x216369,_0x16ae12,_0x5d5862,_0x5d5862),this[_0x2274a8(0x708)]['alpha']=0xff;},Window['prototype']['_updateFilterArea']=function(){const _0x4f05b3=_0xa0779,_0x50b885=this[_0x4f05b3(0x2c0)]['worldTransform']['apply'](new Point(0x0,0x0)),_0x5180a3=this[_0x4f05b3(0x2c0)][_0x4f05b3(0x472)];_0x5180a3['x']=_0x50b885['x']+this[_0x4f05b3(0x53d)]['x'],_0x5180a3['y']=_0x50b885['y']+this[_0x4f05b3(0x53d)]['y'],_0x5180a3[_0x4f05b3(0x3c5)]=Math[_0x4f05b3(0x707)](this[_0x4f05b3(0x87c)]*this[_0x4f05b3(0x21c)]['x']),_0x5180a3['height']=Math[_0x4f05b3(0x707)](this['innerHeight']*this[_0x4f05b3(0x21c)]['y']);},Window['prototype'][_0xa0779(0x7f9)]=function(){const _0x3c5ea1=_0xa0779,_0xe723f5=this[_0x3c5ea1(0x4b2)],_0x3be172=Math['max'](0x0,this[_0x3c5ea1(0x63a)]-_0xe723f5*0x2),_0xb5c254=Math[_0x3c5ea1(0x274)](0x0,this[_0x3c5ea1(0x6c5)]-_0xe723f5*0x2),_0x2688ae=this[_0x3c5ea1(0x618)],_0x170be3=_0x2688ae[_0x3c5ea1(0x48e)][0x0];_0x2688ae['bitmap']=this[_0x3c5ea1(0x4a1)],_0x2688ae[_0x3c5ea1(0x9d4)](0x0,0x0,0x60,0x60),_0x2688ae[_0x3c5ea1(0x427)](_0xe723f5,_0xe723f5),_0x2688ae[_0x3c5ea1(0x21c)]['x']=_0x3be172/0x60,_0x2688ae['scale']['y']=_0xb5c254/0x60,_0x170be3[_0x3c5ea1(0x346)]=this[_0x3c5ea1(0x4a1)],_0x170be3[_0x3c5ea1(0x9d4)](0x0,0x60,0x60,0x60),_0x170be3['move'](0x0,0x0,_0x3be172,_0xb5c254),_0x170be3[_0x3c5ea1(0x21c)]['x']=0x1/_0x2688ae[_0x3c5ea1(0x21c)]['x'],_0x170be3[_0x3c5ea1(0x21c)]['y']=0x1/_0x2688ae[_0x3c5ea1(0x21c)]['y'],_0x2688ae[_0x3c5ea1(0x717)](this['_colorTone']);},Game_Temp[_0xa0779(0x271)][_0xa0779(0x68c)]=function(){const _0x1e36df=_0xa0779;this[_0x1e36df(0x8c1)]=[],this[_0x1e36df(0x816)]=[],this['_pointAnimationQueue']=[],this[_0x1e36df(0x650)]=[];},VisuMZ[_0xa0779(0x824)][_0xa0779(0x331)]=Scene_Base[_0xa0779(0x271)][_0xa0779(0x5d6)],Scene_Base['prototype'][_0xa0779(0x5d6)]=function(){const _0x4af3a8=_0xa0779;if($gameTemp)$gameTemp[_0x4af3a8(0x68c)]();VisuMZ[_0x4af3a8(0x824)]['Scene_Base_terminateAnimationClearBugFix']['call'](this);},Bitmap['prototype']['measureTextWidthNoRounding']=function(_0xc5d5b4){const _0x3a7ade=_0xa0779,_0x52f3d5=this['context'];_0x52f3d5[_0x3a7ade(0x21e)](),_0x52f3d5[_0x3a7ade(0x839)]=this[_0x3a7ade(0x827)]();const _0x2c3205=_0x52f3d5['measureText'](_0xc5d5b4)['width'];return _0x52f3d5[_0x3a7ade(0x8bb)](),_0x2c3205;},Window_Message['prototype'][_0xa0779(0x1a9)]=function(_0x3c6c8c){const _0x53c47e=_0xa0779;return this[_0x53c47e(0x32a)]()?this[_0x53c47e(0x204)][_0x53c47e(0x5c8)](_0x3c6c8c):Window_Base['prototype'][_0x53c47e(0x1a9)][_0x53c47e(0x398)](this,_0x3c6c8c);},Window_Message[_0xa0779(0x271)][_0xa0779(0x32a)]=function(){const _0x1a1f5d=_0xa0779;return VisuMZ[_0x1a1f5d(0x824)][_0x1a1f5d(0x17f)]['QoL'][_0x1a1f5d(0x6b9)]??!![];},VisuMZ[_0xa0779(0x824)][_0xa0779(0x43d)]=Game_Action['prototype'][_0xa0779(0x684)],Game_Action[_0xa0779(0x271)][_0xa0779(0x684)]=function(){const _0x306c10=_0xa0779;if(this['item']())return VisuMZ['CoreEngine']['Game_Action_numRepeats'][_0x306c10(0x398)](this);else{if('nKmAu'!==_0x306c10(0x885))return 0x0;else{if(!this[_0x306c10(0x1cb)]())return;_0x1395b5=_0x54ca1a||![],_0x3899f8=_0x2e3dff||![];if(_0x351f7a[_0x5026f8]){const _0x3aef22={'targets':_0x4b19e2,'animationId':_0x2a1e8f,'mirror':_0x37440b,'mute':_0x2780fb};this[_0x306c10(0x816)][_0x306c10(0x55f)](_0x3aef22);for(const _0x5f291d of _0x51a720){_0x5f291d[_0x306c10(0x7c2)]&&_0x5f291d['startAnimation']();}}}}},VisuMZ['CoreEngine'][_0xa0779(0x429)]=Game_Action[_0xa0779(0x271)]['setAttack'],Game_Action['prototype'][_0xa0779(0x1c7)]=function(){const _0x4707bb=_0xa0779;if(this[_0x4707bb(0x26f)]()&&this[_0x4707bb(0x26f)]()[_0x4707bb(0x178)]()){if('ozCqV'!==_0x4707bb(0x4e9)){_0x3f13d5+=_0x3633df;if(_0x34081f>=_0x53c4d3)_0x1a6c52=_0x3f243a-0x1;this[_0x4707bb(0x6c9)](_0x21960f);}else VisuMZ['CoreEngine'][_0x4707bb(0x429)][_0x4707bb(0x398)](this);}else{if(_0x4707bb(0x8d0)!==_0x4707bb(0x8d0))return _0x4bd7b0[_0x4707bb(0x170)](_0x4707bb(0x796));else this[_0x4707bb(0x653)]();}},Sprite_Name[_0xa0779(0x271)][_0xa0779(0x6fe)]=function(){return 0x24;},Sprite_Name['prototype'][_0xa0779(0x63e)]=function(){const _0x40abec=_0xa0779,_0x2957b=this['name'](),_0x1052a1=this[_0x40abec(0x68f)](),_0x2f1d67=this[_0x40abec(0x6fe)]();this[_0x40abec(0x8a5)](),this['bitmap'][_0x40abec(0x653)](),this['bitmap'][_0x40abec(0x2ba)](_0x2957b,0x4,0x0,_0x1052a1,_0x2f1d67,_0x40abec(0x67d));},Bitmap[_0xa0779(0x271)]['drawTextTopAligned']=function(_0x522b1c,_0x2063d3,_0x2ef286,_0x1d9885,_0xcdf9d1,_0x172c2e){const _0x466631=_0xa0779,_0x422afd=this['context'],_0x59c237=_0x422afd[_0x466631(0x9a0)];_0x1d9885=_0x1d9885||0xffffffff;let _0xbe075b=_0x2063d3,_0x2e8ea0=Math[_0x466631(0x4ee)](_0x2ef286+0x18/0x2+this[_0x466631(0x9b9)]*0.35);_0x172c2e===_0x466631(0x9d3)&&('HOSZu'==='HOSZu'?_0xbe075b+=_0x1d9885/0x2:_0xa3c87f*=_0x1a5036['zoomScale']()),_0x172c2e===_0x466631(0x4b5)&&(_0xbe075b+=_0x1d9885),_0x422afd[_0x466631(0x21e)](),_0x422afd['font']=this[_0x466631(0x827)](),_0x422afd['textAlign']=_0x172c2e,_0x422afd[_0x466631(0x2c5)]=_0x466631(0x3e2),_0x422afd[_0x466631(0x9a0)]=0x1,this[_0x466631(0x6f7)](_0x522b1c,_0xbe075b,_0x2e8ea0,_0x1d9885),_0x422afd[_0x466631(0x9a0)]=_0x59c237,this['_drawTextBody'](_0x522b1c,_0xbe075b,_0x2e8ea0,_0x1d9885),_0x422afd[_0x466631(0x8bb)](),this[_0x466631(0x330)]['update']();},VisuMZ[_0xa0779(0x824)]['BattleManager_checkSubstitute']=BattleManager[_0xa0779(0x9ba)],BattleManager[_0xa0779(0x9ba)]=function(_0x38b01a){const _0x456f4a=_0xa0779;if(this[_0x456f4a(0x84d)]['isForFriend']())return![];return VisuMZ['CoreEngine'][_0x456f4a(0x2ea)][_0x456f4a(0x398)](this,_0x38b01a);},BattleManager[_0xa0779(0x9a3)]=function(){const _0x23f2c0=_0xa0779;if(this[_0x23f2c0(0x523)])this[_0x23f2c0(0x5c3)][_0x23f2c0(0x9a3)](this[_0x23f2c0(0x523)]);this[_0x23f2c0(0x554)]=_0x23f2c0(0x85c),this['_subject']&&this[_0x23f2c0(0x523)][_0x23f2c0(0x373)]()===0x0&&(this[_0x23f2c0(0x30c)](this['_subject']),this['_subject']=null);},Bitmap[_0xa0779(0x271)][_0xa0779(0x530)]=function(){const _0x1f08ca=_0xa0779;this[_0x1f08ca(0x3db)]=new Image(),this[_0x1f08ca(0x3db)][_0x1f08ca(0x502)]=this[_0x1f08ca(0x918)][_0x1f08ca(0x30a)](this),this['_image'][_0x1f08ca(0x682)]=this[_0x1f08ca(0x9be)]['bind'](this),this[_0x1f08ca(0x4d3)](),this[_0x1f08ca(0x390)]='loading',Utils[_0x1f08ca(0x70b)]()?this[_0x1f08ca(0x87a)]():_0x1f08ca(0x2a2)!==_0x1f08ca(0x7c1)?(this[_0x1f08ca(0x3db)][_0x1f08ca(0x26e)]=this[_0x1f08ca(0x20d)],![]&&this[_0x1f08ca(0x3db)][_0x1f08ca(0x3c5)]>0x0&&(this[_0x1f08ca(0x3db)][_0x1f08ca(0x502)]=null,this[_0x1f08ca(0x918)]())):_0x438f1b['CoreEngine']['Sprite_Picture_loadBitmap'][_0x1f08ca(0x398)](this);};