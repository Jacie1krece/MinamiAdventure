//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.75;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.75] [CoreEngine]
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
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
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
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
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
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
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
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
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
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
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
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
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
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
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
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
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
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
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
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
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

const _0x2a005f=_0xeff9;function _0xeff9(_0x535c5f,_0x2b67bf){const _0x1a3fa7=_0x1a3f();return _0xeff9=function(_0xeff98c,_0x3b8149){_0xeff98c=_0xeff98c-0x16d;let _0x1b7470=_0x1a3fa7[_0xeff98c];return _0x1b7470;},_0xeff9(_0x535c5f,_0x2b67bf);}(function(_0x53fe95,_0x452188){const _0x2d51cf=_0xeff9,_0x51850c=_0x53fe95();while(!![]){try{const _0x424e8e=parseInt(_0x2d51cf(0x80b))/0x1+-parseInt(_0x2d51cf(0x87d))/0x2+parseInt(_0x2d51cf(0x348))/0x3*(parseInt(_0x2d51cf(0x4c9))/0x4)+-parseInt(_0x2d51cf(0x868))/0x5*(parseInt(_0x2d51cf(0x829))/0x6)+-parseInt(_0x2d51cf(0x376))/0x7+-parseInt(_0x2d51cf(0x50b))/0x8+-parseInt(_0x2d51cf(0x2e4))/0x9*(-parseInt(_0x2d51cf(0x70d))/0xa);if(_0x424e8e===_0x452188)break;else _0x51850c['push'](_0x51850c['shift']());}catch(_0x434866){_0x51850c['push'](_0x51850c['shift']());}}}(_0x1a3f,0xdcf02));var label=_0x2a005f(0x63d),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2a005f(0x3df)](function(_0x1aacfc){const _0xc786e9=_0x2a005f;return _0x1aacfc[_0xc786e9(0x439)]&&_0x1aacfc[_0xc786e9(0x1f9)][_0xc786e9(0x34a)]('['+label+']');})[0x0];VisuMZ[label][_0x2a005f(0x52e)]=VisuMZ[label][_0x2a005f(0x52e)]||{},VisuMZ[_0x2a005f(0x696)]=function(_0x27909e,_0x34ff33){const _0x1e7c6a=_0x2a005f;for(const _0x3a8c09 in _0x34ff33){if(_0x3a8c09[_0x1e7c6a(0x37e)](/(.*):(.*)/i)){const _0x24487b=String(RegExp['$1']),_0xbd36c5=String(RegExp['$2'])[_0x1e7c6a(0x697)]()[_0x1e7c6a(0x440)]();let _0x5b2938,_0x286c42,_0x3a8f8a;switch(_0xbd36c5){case'NUM':_0x5b2938=_0x34ff33[_0x3a8c09]!==''?Number(_0x34ff33[_0x3a8c09]):0x0;break;case'ARRAYNUM':_0x286c42=_0x34ff33[_0x3a8c09]!==''?JSON[_0x1e7c6a(0x73b)](_0x34ff33[_0x3a8c09]):[],_0x5b2938=_0x286c42[_0x1e7c6a(0x5a8)](_0x818f86=>Number(_0x818f86));break;case'EVAL':_0x5b2938=_0x34ff33[_0x3a8c09]!==''?eval(_0x34ff33[_0x3a8c09]):null;break;case _0x1e7c6a(0x7a8):_0x286c42=_0x34ff33[_0x3a8c09]!==''?JSON[_0x1e7c6a(0x73b)](_0x34ff33[_0x3a8c09]):[],_0x5b2938=_0x286c42['map'](_0x291d38=>eval(_0x291d38));break;case _0x1e7c6a(0x667):_0x5b2938=_0x34ff33[_0x3a8c09]!==''?JSON['parse'](_0x34ff33[_0x3a8c09]):'';break;case'ARRAYJSON':_0x286c42=_0x34ff33[_0x3a8c09]!==''?JSON[_0x1e7c6a(0x73b)](_0x34ff33[_0x3a8c09]):[],_0x5b2938=_0x286c42['map'](_0x507a6c=>JSON['parse'](_0x507a6c));break;case _0x1e7c6a(0x188):_0x5b2938=_0x34ff33[_0x3a8c09]!==''?new Function(JSON[_0x1e7c6a(0x73b)](_0x34ff33[_0x3a8c09])):new Function(_0x1e7c6a(0x37c));break;case'ARRAYFUNC':_0x286c42=_0x34ff33[_0x3a8c09]!==''?JSON[_0x1e7c6a(0x73b)](_0x34ff33[_0x3a8c09]):[],_0x5b2938=_0x286c42[_0x1e7c6a(0x5a8)](_0x1b9d74=>new Function(JSON['parse'](_0x1b9d74)));break;case _0x1e7c6a(0x352):_0x5b2938=_0x34ff33[_0x3a8c09]!==''?String(_0x34ff33[_0x3a8c09]):'';break;case'ARRAYSTR':_0x286c42=_0x34ff33[_0x3a8c09]!==''?JSON[_0x1e7c6a(0x73b)](_0x34ff33[_0x3a8c09]):[],_0x5b2938=_0x286c42[_0x1e7c6a(0x5a8)](_0x495764=>String(_0x495764));break;case _0x1e7c6a(0x42c):_0x3a8f8a=_0x34ff33[_0x3a8c09]!==''?JSON[_0x1e7c6a(0x73b)](_0x34ff33[_0x3a8c09]):{},_0x27909e[_0x24487b]={},VisuMZ['ConvertParams'](_0x27909e[_0x24487b],_0x3a8f8a);continue;case'ARRAYSTRUCT':_0x286c42=_0x34ff33[_0x3a8c09]!==''?JSON[_0x1e7c6a(0x73b)](_0x34ff33[_0x3a8c09]):[],_0x5b2938=_0x286c42[_0x1e7c6a(0x5a8)](_0x295fe7=>VisuMZ[_0x1e7c6a(0x696)]({},JSON[_0x1e7c6a(0x73b)](_0x295fe7)));break;default:continue;}_0x27909e[_0x24487b]=_0x5b2938;}}return _0x27909e;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x43c)]=SceneManager['exit'],SceneManager[_0x2a005f(0x64f)]=function(){const _0x59c7b7=_0x2a005f;VisuMZ['CoreEngine']['SceneManager_exit'][_0x59c7b7(0x873)](this);if(Utils['RPGMAKER_VERSION']>='1.4.4'){if(typeof nw===_0x59c7b7(0x6df))nw[_0x59c7b7(0x603)][_0x59c7b7(0x27b)]();}},(_0xfddd24=>{const _0x24689d=_0x2a005f,_0x41b782=_0xfddd24[_0x24689d(0x762)];for(const _0x4b89ed of dependencies){if(!Imported[_0x4b89ed]){alert(_0x24689d(0x1d4)[_0x24689d(0x594)](_0x41b782,_0x4b89ed)),SceneManager[_0x24689d(0x64f)]();break;}}const _0x87af41=_0xfddd24[_0x24689d(0x1f9)];if(_0x87af41['match'](/\[Version[ ](.*?)\]/i)){const _0x17e957=Number(RegExp['$1']);_0x17e957!==VisuMZ[label]['version']&&(alert(_0x24689d(0x1ae)['format'](_0x41b782,_0x17e957)),SceneManager[_0x24689d(0x64f)]());}if(_0x87af41[_0x24689d(0x37e)](/\[Tier[ ](\d+)\]/i)){const _0x4796b5=Number(RegExp['$1']);_0x4796b5<tier?(alert(_0x24689d(0x3c1)[_0x24689d(0x594)](_0x41b782,_0x4796b5,tier)),SceneManager[_0x24689d(0x64f)]()):tier=Math[_0x24689d(0x23f)](_0x4796b5,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x24689d(0x52e)],_0xfddd24[_0x24689d(0x669)]);})(pluginData),((()=>{const _0x8d2140=_0x2a005f;if(VisuMZ[_0x8d2140(0x63d)][_0x8d2140(0x52e)][_0x8d2140(0x213)][_0x8d2140(0x211)]??!![])for(const _0x2cb3d7 in $plugins){const _0x17a2c2=$plugins[_0x2cb3d7];_0x17a2c2[_0x8d2140(0x762)][_0x8d2140(0x37e)](/(.*)\/(.*)/i)&&(_0x17a2c2[_0x8d2140(0x762)]=String(RegExp['$2'][_0x8d2140(0x440)]()));}})()),PluginManager['registerCommand'](pluginData[_0x2a005f(0x762)],_0x2a005f(0x1f4),_0x163e0e=>{const _0x14599f=_0x2a005f;if(!SceneManager['_scene'])return;if(!SceneManager[_0x14599f(0x458)][_0x14599f(0x733)])return;VisuMZ[_0x14599f(0x696)](_0x163e0e,_0x163e0e);const _0x231d0c=Math[_0x14599f(0x57f)](_0x163e0e[_0x14599f(0x450)]),_0x54576e=Math['round'](_0x163e0e[_0x14599f(0x852)]);$gameTemp[_0x14599f(0x604)](_0x231d0c,_0x54576e,_0x163e0e[_0x14599f(0x55e)],_0x163e0e['Mirror'],_0x163e0e[_0x14599f(0x462)]);}),PluginManager['registerCommand'](pluginData['name'],_0x2a005f(0x8c5),_0x342fd9=>{const _0x50ada5=_0x2a005f;VisuMZ[_0x50ada5(0x696)](_0x342fd9,_0x342fd9);const _0x161415=Math[_0x50ada5(0x57f)](_0x342fd9[_0x50ada5(0x1d1)])[_0x50ada5(0x5c0)](0x0,0x64),_0x1622bc=AudioManager['_currentBgm'];_0x1622bc&&(_0x1622bc[_0x50ada5(0x1d1)]=_0x161415,_0x1622bc[_0x50ada5(0x78b)]=AudioManager['_bgmBuffer'][_0x50ada5(0x7a9)](),AudioManager['updateBgmParameters'](_0x1622bc),AudioManager[_0x50ada5(0x68b)](_0x1622bc,_0x1622bc[_0x50ada5(0x78b)]),AudioManager[_0x50ada5(0x759)][_0x50ada5(0x413)](_0x1622bc[_0x50ada5(0x78b)]));}),PluginManager['registerCommand'](pluginData[_0x2a005f(0x762)],_0x2a005f(0x3b0),_0x295492=>{const _0x13b3dd=_0x2a005f;VisuMZ[_0x13b3dd(0x696)](_0x295492,_0x295492);const _0x24175e=Math[_0x13b3dd(0x57f)](_0x295492[_0x13b3dd(0x343)])[_0x13b3dd(0x5c0)](0x32,0x96),_0x14c7e1=AudioManager['_currentBgm'];_0x14c7e1&&(_0x14c7e1['pitch']=_0x24175e,_0x14c7e1[_0x13b3dd(0x78b)]=AudioManager[_0x13b3dd(0x759)][_0x13b3dd(0x7a9)](),AudioManager[_0x13b3dd(0x62f)](_0x14c7e1),AudioManager[_0x13b3dd(0x68b)](_0x14c7e1,_0x14c7e1[_0x13b3dd(0x78b)]),AudioManager[_0x13b3dd(0x759)]['_startPlaying'](_0x14c7e1['pos']));}),PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],_0x2a005f(0x670),_0x56eeb9=>{const _0x3a94c6=_0x2a005f;VisuMZ[_0x3a94c6(0x696)](_0x56eeb9,_0x56eeb9);const _0x2d085c=Math['round'](_0x56eeb9[_0x3a94c6(0x668)])[_0x3a94c6(0x5c0)](-0x64,0x64),_0x4aadf7=AudioManager[_0x3a94c6(0x703)];_0x4aadf7&&(_0x4aadf7[_0x3a94c6(0x668)]=_0x2d085c,_0x4aadf7[_0x3a94c6(0x78b)]=AudioManager[_0x3a94c6(0x759)][_0x3a94c6(0x7a9)](),AudioManager['updateBgmParameters'](_0x4aadf7),AudioManager[_0x3a94c6(0x68b)](_0x4aadf7,_0x4aadf7[_0x3a94c6(0x78b)]),AudioManager[_0x3a94c6(0x759)]['_startPlaying'](_0x4aadf7[_0x3a94c6(0x78b)]));}),PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],_0x2a005f(0x557),_0x38af9a=>{const _0x33e986=_0x2a005f;VisuMZ[_0x33e986(0x696)](_0x38af9a,_0x38af9a);const _0x31d482=Math[_0x33e986(0x57f)](_0x38af9a[_0x33e986(0x1d1)])[_0x33e986(0x5c0)](0x0,0x64),_0x544b7b=AudioManager[_0x33e986(0x593)];_0x544b7b&&(_0x544b7b[_0x33e986(0x1d1)]=_0x31d482,_0x544b7b[_0x33e986(0x78b)]=AudioManager[_0x33e986(0x1c7)][_0x33e986(0x7a9)](),AudioManager[_0x33e986(0x62f)](_0x544b7b),AudioManager[_0x33e986(0x68b)](_0x544b7b,_0x544b7b[_0x33e986(0x78b)]),AudioManager['_bgmBuffer'][_0x33e986(0x413)](_0x544b7b[_0x33e986(0x78b)]));}),PluginManager['registerCommand'](pluginData[_0x2a005f(0x762)],_0x2a005f(0x685),_0x57b5e9=>{const _0x5b8481=_0x2a005f;VisuMZ['ConvertParams'](_0x57b5e9,_0x57b5e9);const _0x3601f5=Math['round'](_0x57b5e9[_0x5b8481(0x343)])[_0x5b8481(0x5c0)](0x32,0x96),_0x57bce8=AudioManager[_0x5b8481(0x593)];_0x57bce8&&(_0x57bce8[_0x5b8481(0x343)]=_0x3601f5,_0x57bce8[_0x5b8481(0x78b)]=AudioManager[_0x5b8481(0x1c7)][_0x5b8481(0x7a9)](),AudioManager[_0x5b8481(0x62f)](_0x57bce8),AudioManager[_0x5b8481(0x68b)](_0x57bce8,_0x57bce8[_0x5b8481(0x78b)]),AudioManager[_0x5b8481(0x759)]['_startPlaying'](_0x57bce8[_0x5b8481(0x78b)]));}),PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],'AudioChangeBgsPan',_0x477498=>{const _0x31a028=_0x2a005f;VisuMZ[_0x31a028(0x696)](_0x477498,_0x477498);const _0x421fea=Math[_0x31a028(0x57f)](_0x477498[_0x31a028(0x668)])[_0x31a028(0x5c0)](-0x64,0x64),_0x5aa814=AudioManager[_0x31a028(0x593)];_0x5aa814&&(_0x5aa814[_0x31a028(0x668)]=_0x421fea,_0x5aa814[_0x31a028(0x78b)]=AudioManager['_bgsBuffer'][_0x31a028(0x7a9)](),AudioManager['updateBgmParameters'](_0x5aa814),AudioManager[_0x31a028(0x68b)](_0x5aa814,_0x5aa814[_0x31a028(0x78b)]),AudioManager[_0x31a028(0x759)]['_startPlaying'](_0x5aa814[_0x31a028(0x78b)]));}),PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],_0x2a005f(0x3a7),_0x3edf44=>{const _0x5146a7=_0x2a005f;if(!$gameTemp[_0x5146a7(0x7c6)]())return;const _0x18bba7=Input['getLastUsedGamepadType']();navigator[_0x5146a7(0x68d)]&&navigator[_0x5146a7(0x68d)][_0x5146a7(0x300)](_0x18bba7);}),PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],_0x2a005f(0x368),_0x258a88=>{const _0x397bd5=_0x2a005f;if(!$gameTemp[_0x397bd5(0x7c6)]())return;if(!Utils[_0x397bd5(0x36a)]())return;SceneManager[_0x397bd5(0x458)][_0x397bd5(0x1d2)]=![],VisuMZ[_0x397bd5(0x63d)]['ExportStrFromAllMaps']();}),PluginManager[_0x2a005f(0x403)](pluginData['name'],_0x2a005f(0x4e5),_0x3b49c5=>{const _0x3325da=_0x2a005f;if(!$gameTemp[_0x3325da(0x7c6)]())return;if(!Utils[_0x3325da(0x36a)]())return;SceneManager[_0x3325da(0x458)]['_active']=![],VisuMZ[_0x3325da(0x63d)]['ExportStrFromAllTroops']();}),PluginManager['registerCommand'](pluginData[_0x2a005f(0x762)],'ExportCurMapText',_0x4ddcbe=>{const _0x40f5b1=_0x2a005f;if(!$gameTemp[_0x40f5b1(0x7c6)]())return;if(!Utils[_0x40f5b1(0x36a)]())return;if(!$gameMap)return;if($gameMap[_0x40f5b1(0x484)]()<=0x0)return;VisuMZ['ConvertParams'](_0x4ddcbe,_0x4ddcbe);const _0x787628='Map%1'[_0x40f5b1(0x594)]($gameMap['mapId']()[_0x40f5b1(0x53c)](0x3)),_0x540cb8=VisuMZ[_0x40f5b1(0x63d)][_0x40f5b1(0x4e0)]($gameMap[_0x40f5b1(0x484)]());VisuMZ[_0x40f5b1(0x63d)][_0x40f5b1(0x416)](_0x540cb8,_0x787628,!![]);}),PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],_0x2a005f(0x818),_0x8325f9=>{const _0x2d4129=_0x2a005f;if(!$gameTemp[_0x2d4129(0x7c6)]())return;if(!Utils[_0x2d4129(0x36a)]())return;if(!$gameParty[_0x2d4129(0x576)]())return;VisuMZ[_0x2d4129(0x696)](_0x8325f9,_0x8325f9);const _0xd75cfa=_0x2d4129(0x22d)[_0x2d4129(0x594)]($gameTroop[_0x2d4129(0x4fb)]['padZero'](0x4)),_0x3f0301=VisuMZ[_0x2d4129(0x63d)][_0x2d4129(0x7a5)]($gameTroop[_0x2d4129(0x4fb)]);VisuMZ[_0x2d4129(0x63d)][_0x2d4129(0x416)](_0x3f0301,_0xd75cfa,!![]);}),VisuMZ[_0x2a005f(0x63d)]['ExportString']=function(_0x3ddda4,_0x15b7e3,_0x5ee8e8){const _0x5363fb=_0x2a005f,_0x4a77cf=require('fs');let _0x41aaff=_0x5363fb(0x1e3)['format'](_0x15b7e3||'0');_0x4a77cf['writeFile'](_0x41aaff,_0x3ddda4,_0x1d23a5=>{const _0x251d2d=_0x5363fb;if(_0x1d23a5)throw err;else _0x5ee8e8&&alert(_0x251d2d(0x56a)['format'](_0x41aaff));});},VisuMZ['CoreEngine'][_0x2a005f(0x5e1)]=function(){const _0x25719=_0x2a005f,_0x16aae4=[];for(const _0x361ff4 of $dataMapInfos){if(!_0x361ff4)continue;_0x16aae4[_0x25719(0x1fe)](_0x361ff4['id']);}const _0x29e220=_0x16aae4[_0x25719(0x7c3)]*0x64+Math[_0x25719(0x88b)](0x64);alert(_0x25719(0x2a6)[_0x25719(0x594)](_0x29e220)),this[_0x25719(0x6af)]=[],this[_0x25719(0x27f)]=$dataMap;for(const _0x43b157 of _0x16aae4){VisuMZ[_0x25719(0x63d)][_0x25719(0x5cc)](_0x43b157);}setTimeout(VisuMZ['CoreEngine'][_0x25719(0x2cd)]['bind'](this),_0x29e220);},VisuMZ['CoreEngine'][_0x2a005f(0x5cc)]=function(_0x4f99b6){const _0x3c5425=_0x2a005f,_0x4438c4=_0x3c5425(0x372)[_0x3c5425(0x594)](_0x4f99b6['padZero'](0x3)),_0x33420f=new XMLHttpRequest(),_0x45bc13=_0x3c5425(0x4c2)+_0x4438c4;_0x33420f[_0x3c5425(0x4a5)](_0x3c5425(0x649),_0x45bc13),_0x33420f[_0x3c5425(0x5ab)](_0x3c5425(0x7a7)),_0x33420f[_0x3c5425(0x1bc)]=()=>this['storeMapData'](_0x33420f,_0x4f99b6,_0x4438c4,_0x45bc13),_0x33420f[_0x3c5425(0x3ec)]=()=>DataManager[_0x3c5425(0x2be)](_0x3c5425(0x722),_0x4438c4,_0x45bc13),_0x33420f[_0x3c5425(0x559)]();},VisuMZ[_0x2a005f(0x63d)]['storeMapData']=function(_0x374e7b,_0x2ad033,_0x51a4b0,_0xc8b265){const _0x4ec36a=_0x2a005f;$dataMap=JSON[_0x4ec36a(0x73b)](_0x374e7b[_0x4ec36a(0x38b)]),DataManager[_0x4ec36a(0x600)]($dataMap),this[_0x4ec36a(0x6af)][_0x2ad033]=VisuMZ[_0x4ec36a(0x63d)][_0x4ec36a(0x4e0)](_0x2ad033),$dataMap=this['_currentMap'];},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x2cd)]=function(){const _0x153912=_0x2a005f,_0x5a8d86=_0x153912(0x2f1);this['_storedMapText']['remove'](undefined)[_0x153912(0x33d)]('')[_0x153912(0x33d)](null);const _0x5c6984=this[_0x153912(0x6af)][_0x153912(0x633)]('\x0a\x0a\x0a\x0a\x0a')[_0x153912(0x440)]();VisuMZ[_0x153912(0x63d)][_0x153912(0x416)](_0x5c6984,_0x5a8d86,!![]),SceneManager[_0x153912(0x458)][_0x153912(0x1d2)]=!![];},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x4e0)]=function(_0x2950fe){const _0x23540c=_0x2a005f;if(!$dataMap)return'';let _0x25606c='█'[_0x23540c(0x8ca)](0x46)+'\x0a\x0a',_0x351a19='═'[_0x23540c(0x8ca)](0x46)+'\x0a\x0a',_0x980c14='';this[_0x23540c(0x404)]=0x0;for(const _0x5108bf of $dataMap[_0x23540c(0x1cc)]){if(!_0x5108bf)continue;let _0x369269=_0x5108bf['id'],_0xb8f5de=_0x5108bf[_0x23540c(0x762)],_0x585243=_0x5108bf['pages'];for(const _0x5a3232 of _0x585243){const _0x336f73=_0x585243[_0x23540c(0x771)](_0x5a3232)+0x1;let _0x277660=_0x351a19+'《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a',_0x4eb420=VisuMZ['CoreEngine'][_0x23540c(0x3b4)](_0x5a3232['list']);if(_0x4eb420[_0x23540c(0x7c3)]>0x0){if(_0x980c14[_0x23540c(0x7c3)]>0x0)_0x980c14+=_0x351a19+'\x0a\x0a\x0a\x0a\x0a';else{const _0x15f513=$dataMapInfos[_0x2950fe][_0x23540c(0x762)];_0x980c14+=_0x25606c+_0x23540c(0x863)[_0x23540c(0x594)](_0x2950fe,_0x15f513||_0x23540c(0x753))+_0x25606c;}_0x980c14+=_0x277660['format'](_0x369269,_0xb8f5de,_0x336f73,_0x4eb420);}}}return _0x980c14['length']>0x0&&(_0x980c14+=_0x351a19),_0x980c14;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x7e5)]=function(){const _0x492fb6=_0x2a005f,_0x521a4a=$dataTroops[_0x492fb6(0x7c3)]*0xa+Math['randomInt'](0xa);alert(_0x492fb6(0x60a)[_0x492fb6(0x594)](_0x521a4a));const _0x59b0cb=[];for(const _0x4a655a of $dataTroops){if(!_0x4a655a)continue;const _0x484b0a=_0x4a655a['id'];_0x59b0cb[_0x484b0a]=VisuMZ[_0x492fb6(0x63d)][_0x492fb6(0x7a5)](_0x484b0a);}setTimeout(VisuMZ[_0x492fb6(0x63d)][_0x492fb6(0x335)]['bind'](this,_0x59b0cb),_0x521a4a);},VisuMZ[_0x2a005f(0x63d)]['ExtractStrFromTroop']=function(_0xc5fa36){const _0x7fec72=_0x2a005f;if(!$dataTroops[_0xc5fa36])return'';let _0x5ec964='█'[_0x7fec72(0x8ca)](0x46)+'\x0a\x0a',_0x469dd0='═'[_0x7fec72(0x8ca)](0x46)+'\x0a\x0a',_0x42e9a8='';this[_0x7fec72(0x404)]=0x0;const _0x3b9384=$dataTroops[_0xc5fa36];let _0x1d8e7b=_0x3b9384[_0x7fec72(0x832)];for(const _0xbb65df of _0x1d8e7b){const _0x2f8c3c=_0x1d8e7b[_0x7fec72(0x771)](_0xbb65df)+0x1;let _0x3f8eef=_0x469dd0+_0x7fec72(0x229),_0x50b355=VisuMZ[_0x7fec72(0x63d)]['ExtractStrFromList'](_0xbb65df[_0x7fec72(0x617)]);_0x50b355['length']>0x0&&(_0x42e9a8[_0x7fec72(0x7c3)]>0x0?_0x42e9a8+=_0x469dd0+_0x7fec72(0x29d):_0x42e9a8+=_0x5ec964+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'['format'](_0xc5fa36,_0x3b9384[_0x7fec72(0x762)]||_0x7fec72(0x753))+_0x5ec964,_0x42e9a8+=_0x3f8eef[_0x7fec72(0x594)](_0x2f8c3c,_0x50b355));}return _0x42e9a8[_0x7fec72(0x7c3)]>0x0&&(_0x42e9a8+=_0x469dd0),_0x42e9a8;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x335)]=function(_0x94e9bf){const _0xe21d0=_0x2a005f,_0x1920c6=_0xe21d0(0x33c);_0x94e9bf[_0xe21d0(0x33d)](undefined)[_0xe21d0(0x33d)]('')[_0xe21d0(0x33d)](null);const _0x271f8d=_0x94e9bf[_0xe21d0(0x633)]('\x0a\x0a\x0a\x0a\x0a')[_0xe21d0(0x440)]();VisuMZ[_0xe21d0(0x63d)][_0xe21d0(0x416)](_0x271f8d,_0x1920c6,!![]),SceneManager[_0xe21d0(0x458)][_0xe21d0(0x1d2)]=!![];},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x3b4)]=function(_0x519080){const _0x276b2a=_0x2a005f;let _0x5b49a6='\x0a'+'─'[_0x276b2a(0x8ca)](0x46)+'\x0a',_0x38655a='\x0a'+'┄'[_0x276b2a(0x8ca)](0x46)+'\x0a',_0x2100a6='';for(const _0x29250b of _0x519080){if(!_0x29250b)continue;if(_0x29250b[_0x276b2a(0x6c6)]===0x65)_0x2100a6+=_0x5b49a6+'\x0a',_0x2100a6+=_0x276b2a(0x42f),_0x29250b[_0x276b2a(0x669)][0x4]!==''&&_0x29250b[_0x276b2a(0x669)][0x4]!==undefined&&(_0x2100a6+='【%1】\x0a'[_0x276b2a(0x594)](_0x29250b[_0x276b2a(0x669)][0x4]));else{if(_0x29250b[_0x276b2a(0x6c6)]===0x191)_0x2100a6+=_0x276b2a(0x640)[_0x276b2a(0x594)](_0x29250b[_0x276b2a(0x669)][0x0]);else{if(_0x29250b[_0x276b2a(0x6c6)]===0x192)_0x2100a6+=_0x5b49a6,_0x2100a6+=_0x276b2a(0x251)[_0x276b2a(0x594)](_0x38655a,_0x29250b[_0x276b2a(0x669)][0x0]+0x1,_0x29250b['parameters'][0x1]);else{if(_0x29250b[_0x276b2a(0x6c6)]===0x193)_0x2100a6+=_0x5b49a6,_0x2100a6+=_0x276b2a(0x342)['format'](_0x38655a);else{if(_0x29250b[_0x276b2a(0x6c6)]===0x194)_0x2100a6+=_0x5b49a6,_0x2100a6+='%1〘End\x20Choice\x20Selection〙%1'[_0x276b2a(0x594)](_0x38655a);else{if(_0x29250b[_0x276b2a(0x6c6)]===0x69)_0x2100a6+=_0x5b49a6+'\x0a',_0x2100a6+='〘Scrolling\x20Text〙\x0a';else{if(_0x29250b[_0x276b2a(0x6c6)]===0x6c)_0x2100a6+=_0x5b49a6+'\x0a',_0x2100a6+=_0x276b2a(0x66c)['format'](_0x29250b[_0x276b2a(0x669)][0x0]);else{if(_0x29250b[_0x276b2a(0x6c6)]===0x198)_0x2100a6+=_0x276b2a(0x640)[_0x276b2a(0x594)](_0x29250b[_0x276b2a(0x669)][0x0]);else{if(_0x29250b['code']===0x75){const _0x2fda9e=$dataCommonEvents[_0x29250b[_0x276b2a(0x669)][0x0]];if(_0x2fda9e&&this['_commonEventLayers']<=0xa){this[_0x276b2a(0x404)]++;let _0x1da50a=VisuMZ[_0x276b2a(0x63d)][_0x276b2a(0x3b4)](_0x2fda9e[_0x276b2a(0x617)]);_0x1da50a[_0x276b2a(0x7c3)]>0x0&&(_0x2100a6+=_0x5b49a6,_0x2100a6+=_0x38655a,_0x2100a6+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'[_0x276b2a(0x594)](_0x2fda9e['id'],_0x2fda9e[_0x276b2a(0x762)]),_0x2100a6+=_0x38655a,_0x2100a6+=_0x1da50a,_0x2100a6+=_0x38655a,_0x2100a6+=_0x276b2a(0x719)['format'](_0x2fda9e['id'],_0x2fda9e[_0x276b2a(0x762)]),_0x2100a6+=_0x38655a),this['_commonEventLayers']--;}}}}}}}}}}}return _0x2100a6[_0x276b2a(0x7c3)]>0x0&&(_0x2100a6+=_0x5b49a6),_0x2100a6;},PluginManager[_0x2a005f(0x403)](pluginData['name'],_0x2a005f(0x6a4),_0x28047d=>{const _0x277d86=_0x2a005f;VisuMZ[_0x277d86(0x696)](_0x28047d,_0x28047d);const _0x5ccad1=_0x28047d[_0x277d86(0x428)];VisuMZ[_0x277d86(0x36c)](_0x5ccad1);}),PluginManager[_0x2a005f(0x403)](pluginData['name'],'GoldChange',_0x5bc863=>{const _0x1d8e2c=_0x2a005f;VisuMZ[_0x1d8e2c(0x696)](_0x5bc863,_0x5bc863);const _0x3637a5=_0x5bc863[_0x1d8e2c(0x795)]||0x0;$gameParty[_0x1d8e2c(0x1c8)](_0x3637a5);}),PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],_0x2a005f(0x765),_0x10b82a=>{const _0x457b31=_0x2a005f;if(!SceneManager[_0x457b31(0x630)]())return;VisuMZ[_0x457b31(0x696)](_0x10b82a,_0x10b82a);const _0x5a5ac8=_0x10b82a[_0x457b31(0x50f)];SceneManager[_0x457b31(0x458)]['playOnceParallelInterpreter'](_0x5a5ac8);}),PluginManager[_0x2a005f(0x403)](pluginData['name'],_0x2a005f(0x814),_0x2085d9=>{const _0x18b0de=_0x2a005f;if(!$gameTemp[_0x18b0de(0x7c6)]())return;if(!Utils[_0x18b0de(0x36a)]())return;VisuMZ[_0x18b0de(0x696)](_0x2085d9,_0x2085d9);const _0x86dd84=_0x2085d9[_0x18b0de(0x8c8)]||0x1;$gameTemp['_pictureCoordinatesMode']=_0x86dd84;}),PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],_0x2a005f(0x89e),_0x30c551=>{const _0x24cad6=_0x2a005f;VisuMZ[_0x24cad6(0x696)](_0x30c551,_0x30c551);const _0x415cbb=_0x30c551[_0x24cad6(0x56d)]||0x1,_0x281cdc=_0x30c551[_0x24cad6(0x46d)]||'Linear',_0xb691d=$gameScreen['picture'](_0x415cbb);_0xb691d&&_0xb691d[_0x24cad6(0x5de)](_0x281cdc);}),PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],_0x2a005f(0x52c),_0x29d73e=>{for(let _0x12d3e8=0x1;_0x12d3e8<=0x64;_0x12d3e8++){$gameScreen['erasePicture'](_0x12d3e8);}}),PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],_0x2a005f(0x1e6),_0x42de29=>{const _0x2a775a=_0x2a005f;VisuMZ[_0x2a775a(0x696)](_0x42de29,_0x42de29);const _0x5f1aed=Math[_0x2a775a(0x21b)](_0x42de29[_0x2a775a(0x6b5)],_0x42de29[_0x2a775a(0x26b)]),_0xeb22ad=Math[_0x2a775a(0x23f)](_0x42de29[_0x2a775a(0x6b5)],_0x42de29['EndingID']);for(let _0x5c78ab=_0x5f1aed;_0x5c78ab<=_0xeb22ad;_0x5c78ab++){$gameScreen[_0x2a775a(0x5e8)](_0x5c78ab);}}),PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],_0x2a005f(0x1a3),_0x454a63=>{const _0x564e4e=_0x2a005f;VisuMZ[_0x564e4e(0x696)](_0x454a63,_0x454a63);const _0x57913b=Math[_0x564e4e(0x57f)](_0x454a63['PictureID'])[_0x564e4e(0x5c0)](0x1,0x64),_0x59d08b=_0x454a63[_0x564e4e(0x52e)],_0x227cdc=_0x59d08b['Origin'][_0x564e4e(0x5c0)](0x0,0x1),_0x2a2488=Math[_0x564e4e(0x57f)](_0x59d08b[_0x564e4e(0x804)]||0x0),_0x2a98c8=Math[_0x564e4e(0x57f)](_0x59d08b[_0x564e4e(0x65e)]||0x0),_0x543094=Math['round'](_0x59d08b[_0x564e4e(0x235)]||0x0),_0x39f69e=Math[_0x564e4e(0x57f)](_0x59d08b[_0x564e4e(0x20c)]||0x0),_0x93ae25=Math['round'](_0x59d08b[_0x564e4e(0x859)])[_0x564e4e(0x5c0)](0x0,0xff),_0x569ee0=_0x59d08b['BlendMode'],_0x5a5ff7=_0x564e4e(0x26a),_0x765d3d=_0x454a63[_0x564e4e(0x3cf)]?'Smooth':'Pixelated',_0x3c48ea=_0x5a5ff7[_0x564e4e(0x594)](_0x454a63['IconIndex'],_0x765d3d);$gameScreen[_0x564e4e(0x581)](_0x57913b,_0x3c48ea,_0x227cdc,_0x2a2488,_0x2a98c8,_0x543094,_0x39f69e,_0x93ae25,_0x569ee0);}),PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],_0x2a005f(0x7bb),_0x2c8ab3=>{const _0x5015ce=_0x2a005f;VisuMZ['ConvertParams'](_0x2c8ab3,_0x2c8ab3);const _0x1d3e89=_0x2c8ab3['Type']||_0x5015ce(0x3f3),_0x20f4cd=_0x2c8ab3[_0x5015ce(0x61f)][_0x5015ce(0x5c0)](0x1,0x9),_0x42d7d2=_0x2c8ab3[_0x5015ce(0x8cb)][_0x5015ce(0x5c0)](0x1,0x9),_0x972c43=_0x2c8ab3[_0x5015ce(0x8d1)]||0x1,_0x30e981=_0x2c8ab3[_0x5015ce(0x4b1)];$gameScreen[_0x5015ce(0x547)](_0x1d3e89),$gameScreen[_0x5015ce(0x6a8)](_0x20f4cd,_0x42d7d2,_0x972c43);if(_0x30e981){const _0x2522d0=$gameTemp['getLastPluginCommandInterpreter']();if(_0x2522d0)_0x2522d0[_0x5015ce(0x384)](_0x972c43);}}),PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],_0x2a005f(0x5da),_0x27d11d=>{const _0x59039e=_0x2a005f;if($gameParty[_0x59039e(0x576)]())return;VisuMZ[_0x59039e(0x696)](_0x27d11d,_0x27d11d);const _0x33a45c=_0x27d11d[_0x59039e(0x792)],_0x56aa8e=(_0x27d11d[_0x59039e(0x8c4)]||0x0)/0x64;for(const _0x1bc01f of _0x33a45c){const _0x1ba753=Math['random']()<=_0x56aa8e;$gameSwitches[_0x59039e(0x181)](_0x1bc01f,_0x1ba753);}}),PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],_0x2a005f(0x3e3),_0x4e8b05=>{const _0x333cb5=_0x2a005f;if($gameParty[_0x333cb5(0x576)]())return;VisuMZ['ConvertParams'](_0x4e8b05,_0x4e8b05);const _0x35cf37=Math['min'](_0x4e8b05[_0x333cb5(0x6b5)],_0x4e8b05[_0x333cb5(0x26b)]),_0x42805e=Math['max'](_0x4e8b05[_0x333cb5(0x6b5)],_0x4e8b05[_0x333cb5(0x26b)]),_0xe6c06c=(_0x4e8b05['Chance']||0x0)/0x64;for(let _0x30e608=_0x35cf37;_0x30e608<=_0x42805e;_0x30e608++){const _0x2803dc=Math[_0x333cb5(0x3f3)]()<=_0xe6c06c;$gameSwitches['setValue'](_0x30e608,_0x2803dc);}}),PluginManager['registerCommand'](pluginData[_0x2a005f(0x762)],_0x2a005f(0x496),_0x23f10c=>{const _0x38cbbb=_0x2a005f;if($gameParty[_0x38cbbb(0x576)]())return;VisuMZ[_0x38cbbb(0x696)](_0x23f10c,_0x23f10c);const _0x21f347=_0x23f10c['IDs'];for(const _0x22829f of _0x21f347){const _0x111342=$gameSwitches[_0x38cbbb(0x795)](_0x22829f);$gameSwitches[_0x38cbbb(0x181)](_0x22829f,!_0x111342);}}),PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],_0x2a005f(0x5ba),_0x28559d=>{const _0x51982a=_0x2a005f;if($gameParty[_0x51982a(0x576)]())return;VisuMZ[_0x51982a(0x696)](_0x28559d,_0x28559d);const _0x4fe94c=Math[_0x51982a(0x21b)](_0x28559d[_0x51982a(0x6b5)],_0x28559d[_0x51982a(0x26b)]),_0x2542d8=Math[_0x51982a(0x23f)](_0x28559d[_0x51982a(0x6b5)],_0x28559d[_0x51982a(0x26b)]);for(let _0x41f041=_0x4fe94c;_0x41f041<=_0x2542d8;_0x41f041++){const _0x1ab4c0=$gameSwitches[_0x51982a(0x795)](_0x41f041);$gameSwitches[_0x51982a(0x181)](_0x41f041,!_0x1ab4c0);}}),PluginManager[_0x2a005f(0x403)](pluginData['name'],_0x2a005f(0x655),_0x54219f=>{const _0x4f9dcf=_0x2a005f;VisuMZ[_0x4f9dcf(0x696)](_0x54219f,_0x54219f);const _0x50ea73=_0x54219f[_0x4f9dcf(0x8be)]||0x1;$gameSystem[_0x4f9dcf(0x42a)](_0x50ea73);}),PluginManager['registerCommand'](pluginData['name'],_0x2a005f(0x8a0),_0x5011c3=>{const _0x41c63b=_0x2a005f;if($gameParty[_0x41c63b(0x576)]())return;VisuMZ[_0x41c63b(0x696)](_0x5011c3,_0x5011c3);const _0x559337=_0x5011c3[_0x41c63b(0x8be)];if(_0x559337[_0x41c63b(0x37e)](/Front/i))$gameSystem['setSideView'](![]);else _0x559337[_0x41c63b(0x37e)](/Side/i)?$gameSystem['setSideView'](!![]):$gameSystem[_0x41c63b(0x3c8)](!$gameSystem['isSideView']());}),PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],_0x2a005f(0x460),_0x44e73c=>{const _0x4c5379=_0x2a005f;if($gameParty[_0x4c5379(0x576)]())return;VisuMZ[_0x4c5379(0x696)](_0x44e73c,_0x44e73c);const _0x16e9ba=[_0x4c5379(0x6f4),_0x4c5379(0x508),'me','se'];for(const _0x10272c of _0x16e9ba){const _0x3002b7=_0x44e73c[_0x10272c],_0x539644=_0x4c5379(0x6f6)['format'](_0x10272c);for(const _0x4df61c of _0x3002b7){AudioManager[_0x4c5379(0x24f)](_0x539644,_0x4df61c);}}}),PluginManager[_0x2a005f(0x403)](pluginData['name'],'SystemLoadImages',_0x412307=>{const _0x1fc4f2=_0x2a005f;if($gameParty[_0x1fc4f2(0x576)]())return;VisuMZ[_0x1fc4f2(0x696)](_0x412307,_0x412307);const _0x1e7669=['animations',_0x1fc4f2(0x199),'battlebacks2','characters','enemies','faces','parallaxes','pictures',_0x1fc4f2(0x68e),_0x1fc4f2(0x6b3),_0x1fc4f2(0x4f8),_0x1fc4f2(0x81b),'titles1',_0x1fc4f2(0x73a)];for(const _0x8abdc8 of _0x1e7669){const _0x2c1faf=_0x412307[_0x8abdc8],_0x23a44d=_0x1fc4f2(0x238)['format'](_0x8abdc8);for(const _0x278df7 of _0x2c1faf){ImageManager[_0x1fc4f2(0x464)](_0x23a44d,_0x278df7);}}}),PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],_0x2a005f(0x237),_0x5ade0b=>{const _0x5d7224=_0x2a005f;if($gameParty[_0x5d7224(0x576)]())return;VisuMZ[_0x5d7224(0x696)](_0x5ade0b,_0x5ade0b);const _0x54fab4=_0x5ade0b[_0x5d7224(0x8be)][_0x5d7224(0x697)]()['trim'](),_0x3daa87=VisuMZ[_0x5d7224(0x63d)][_0x5d7224(0x4a9)](_0x54fab4);$gameSystem['setBattleSystem'](_0x3daa87);}),VisuMZ['CoreEngine'][_0x2a005f(0x4a9)]=function(_0x3b6f91){const _0x5afdf4=_0x2a005f;_0x3b6f91=_0x3b6f91||'DATABASE',_0x3b6f91=String(_0x3b6f91)['toUpperCase']()[_0x5afdf4(0x440)]();switch(_0x3b6f91){case _0x5afdf4(0x7fd):return 0x0;case _0x5afdf4(0x2b2):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x5afdf4(0x5f4)]=!![]);return 0x1;case _0x5afdf4(0x1b8):Imported[_0x5afdf4(0x5c6)]&&(ConfigManager[_0x5afdf4(0x5f4)]=![]);return 0x2;case _0x5afdf4(0x85c):if(Imported[_0x5afdf4(0x7b4)])return _0x5afdf4(0x85c);break;case _0x5afdf4(0x315):if(Imported[_0x5afdf4(0x87a)])return _0x5afdf4(0x315);break;case'BTB':if(Imported[_0x5afdf4(0x6fe)])return _0x5afdf4(0x3f7);break;case _0x5afdf4(0x579):if(Imported[_0x5afdf4(0x28f)])return'FTB';break;case'OTB':if(Imported['VisuMZ_2_BattleSystemOTB'])return'OTB';break;case _0x5afdf4(0x895):if(Imported[_0x5afdf4(0x89b)])return _0x5afdf4(0x895);break;case _0x5afdf4(0x791):if(Imported['VisuMZ_2_BattleSystemPTB'])return _0x5afdf4(0x791);break;}return $dataSystem[_0x5afdf4(0x749)];},PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],_0x2a005f(0x658),_0x194ebd=>{const _0xc47249=_0x2a005f;VisuMZ['ConvertParams'](_0x194ebd,_0x194ebd);const _0xc297c9=_0x194ebd[_0xc47249(0x8be)]||0x1;$gameSystem[_0xc47249(0x647)](_0xc297c9);}),PluginManager['registerCommand'](pluginData[_0x2a005f(0x762)],_0x2a005f(0x751),_0x245895=>{const _0x11e651=_0x2a005f;VisuMZ['ConvertParams'](_0x245895,_0x245895);const _0x16cce0=_0x245895['id']||0x1,_0xe2eaf2=_0x245895[_0x11e651(0x2bd)],_0x4e6562=_0x245895[_0x11e651(0x286)]||0x0;let _0x178608=$gameVariables[_0x11e651(0x795)](_0x16cce0)||0x0;switch(_0xe2eaf2){case'=':_0x178608=_0x4e6562;break;case'+':_0x178608+=_0x4e6562;break;case'-':_0x178608-=_0x4e6562;break;case'*':_0x178608*=_0x4e6562;break;case'/':_0x178608/=_0x4e6562;break;case'%':_0x178608%=_0x4e6562;break;}_0x178608=_0x178608||0x0,$gameVariables[_0x11e651(0x181)](_0x16cce0,_0x178608);}),PluginManager[_0x2a005f(0x403)](pluginData[_0x2a005f(0x762)],_0x2a005f(0x171),_0x2197ef=>{const _0x552b23=_0x2a005f;VisuMZ[_0x552b23(0x696)](_0x2197ef,_0x2197ef);const _0x27e331=_0x2197ef['id']()||0x1,_0x472129=_0x2197ef['operation'],_0xc7df29=_0x2197ef['operand']()||0x0;let _0x64cee4=$gameVariables['value'](_0x27e331)||0x0;switch(_0x472129){case'=':_0x64cee4=_0xc7df29;break;case'+':_0x64cee4+=_0xc7df29;break;case'-':_0x64cee4-=_0xc7df29;break;case'*':_0x64cee4*=_0xc7df29;break;case'/':_0x64cee4/=_0xc7df29;break;case'%':_0x64cee4%=_0xc7df29;break;}_0x64cee4=_0x64cee4||0x0,$gameVariables[_0x552b23(0x181)](_0x27e331,_0x64cee4);}),VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x377)]=Scene_Boot['prototype'][_0x2a005f(0x1d3)],Scene_Boot[_0x2a005f(0x7d8)][_0x2a005f(0x1d3)]=function(){const _0x41ad92=_0x2a005f;VisuMZ[_0x41ad92(0x63d)][_0x41ad92(0x377)]['call'](this),this[_0x41ad92(0x3ea)](),this[_0x41ad92(0x42b)](),this[_0x41ad92(0x38f)](),this['process_VisuMZ_CoreEngine_Functions'](),this[_0x41ad92(0x877)](),this['process_VisuMZ_CoreEngine_ControllerButtons'](),VisuMZ[_0x41ad92(0x8b0)]();},VisuMZ[_0x2a005f(0x63d)]['RegExp']={},Scene_Boot[_0x2a005f(0x7d8)][_0x2a005f(0x3ea)]=function(){const _0x4dbb2f=_0x2a005f,_0x31e636=[_0x4dbb2f(0x2c0),_0x4dbb2f(0x3d1),_0x4dbb2f(0x79a),_0x4dbb2f(0x7bf),'MAT',_0x4dbb2f(0x453),_0x4dbb2f(0x48c),'LUK'],_0x320db8=[_0x4dbb2f(0x206),_0x4dbb2f(0x2c8),_0x4dbb2f(0x3f5),_0x4dbb2f(0x68f),'MEV','MRF','CNT',_0x4dbb2f(0x1ce),_0x4dbb2f(0x68a),_0x4dbb2f(0x389)],_0x4b43b0=[_0x4dbb2f(0x386),_0x4dbb2f(0x6bd),_0x4dbb2f(0x7b0),_0x4dbb2f(0x39c),_0x4dbb2f(0x203),'TCR',_0x4dbb2f(0x390),'MDR',_0x4dbb2f(0x563),_0x4dbb2f(0x2f0)],_0x450512=[_0x31e636,_0x320db8,_0x4b43b0],_0x1410e4=[_0x4dbb2f(0x305),_0x4dbb2f(0x585),'Plus2',_0x4dbb2f(0x69e),'Rate',_0x4dbb2f(0x701),_0x4dbb2f(0x4c0),_0x4dbb2f(0x1ec),_0x4dbb2f(0x8b6),_0x4dbb2f(0x63e)];for(const _0x14378e of _0x450512){let _0x3c3f75='';if(_0x14378e===_0x31e636)_0x3c3f75=_0x4dbb2f(0x642);if(_0x14378e===_0x320db8)_0x3c3f75=_0x4dbb2f(0x1d6);if(_0x14378e===_0x4b43b0)_0x3c3f75=_0x4dbb2f(0x743);for(const _0x5c209a of _0x1410e4){let _0x299dd5=_0x4dbb2f(0x276)[_0x4dbb2f(0x594)](_0x3c3f75,_0x5c209a);VisuMZ[_0x4dbb2f(0x63d)][_0x4dbb2f(0x7ed)][_0x299dd5]=[],VisuMZ[_0x4dbb2f(0x63d)][_0x4dbb2f(0x7ed)][_0x299dd5+'JS']=[];let _0x7a9462=_0x4dbb2f(0x284);if(['Plus','Flat'][_0x4dbb2f(0x34a)](_0x5c209a))_0x7a9462+='([\x5c+\x5c-]\x5cd+)>';else{if([_0x4dbb2f(0x585),_0x4dbb2f(0x8b6)][_0x4dbb2f(0x34a)](_0x5c209a))_0x7a9462+=_0x4dbb2f(0x2fc);else{if([_0x4dbb2f(0x502),'Flat2'][_0x4dbb2f(0x34a)](_0x5c209a))_0x7a9462+=_0x4dbb2f(0x56f);else{if(_0x5c209a===_0x4dbb2f(0x69e))_0x7a9462+=_0x4dbb2f(0x6a3);else{if(_0x5c209a===_0x4dbb2f(0x701))_0x7a9462+='(\x5cd+)([%％])>';else _0x5c209a===_0x4dbb2f(0x4c0)&&(_0x7a9462+=_0x4dbb2f(0x580));}}}}for(const _0x3ae3f4 of _0x14378e){let _0x6b24a6=_0x5c209a[_0x4dbb2f(0x19f)](/[\d+]/g,'')[_0x4dbb2f(0x697)]();const _0x317c54=_0x7a9462[_0x4dbb2f(0x594)](_0x3ae3f4,_0x6b24a6);VisuMZ[_0x4dbb2f(0x63d)][_0x4dbb2f(0x7ed)][_0x299dd5][_0x4dbb2f(0x1fe)](new RegExp(_0x317c54,'i'));const _0x3f66fa=_0x4dbb2f(0x88a)[_0x4dbb2f(0x594)](_0x3ae3f4,_0x6b24a6);VisuMZ[_0x4dbb2f(0x63d)][_0x4dbb2f(0x7ed)][_0x299dd5+'JS'][_0x4dbb2f(0x1fe)](new RegExp(_0x3f66fa,'i'));}}}},Scene_Boot[_0x2a005f(0x7d8)][_0x2a005f(0x42b)]=function(){if(VisuMZ['ParseAllNotetags'])return;},Scene_Boot[_0x2a005f(0x7d8)][_0x2a005f(0x38f)]=function(){const _0x595e1f=_0x2a005f,_0x58bca0=VisuMZ[_0x595e1f(0x63d)]['Settings'];_0x58bca0[_0x595e1f(0x213)][_0x595e1f(0x5ea)]&&VisuMZ[_0x595e1f(0x33b)](!![]);_0x58bca0[_0x595e1f(0x213)][_0x595e1f(0x5b2)]&&(Input['keyMapper'][0x23]=_0x595e1f(0x325),Input[_0x595e1f(0x8a9)][0x24]=_0x595e1f(0x58b));if(_0x58bca0[_0x595e1f(0x205)]){const _0x98cc1f=_0x58bca0[_0x595e1f(0x205)];_0x98cc1f['KeySHIFT']=_0x98cc1f['KeySHIFT']||_0x595e1f(0x82d),_0x98cc1f[_0x595e1f(0x7a6)]=_0x98cc1f[_0x595e1f(0x7a6)]||_0x595e1f(0x6ab);}_0x58bca0['KeyboardInput'][_0x595e1f(0x67f)]&&(Input[_0x595e1f(0x8a9)][0x57]='up',Input[_0x595e1f(0x8a9)][0x41]=_0x595e1f(0x3bf),Input[_0x595e1f(0x8a9)][0x53]=_0x595e1f(0x35d),Input[_0x595e1f(0x8a9)][0x44]='right',Input[_0x595e1f(0x8a9)][0x45]=_0x595e1f(0x29a)),_0x58bca0[_0x595e1f(0x3d6)][_0x595e1f(0x498)]&&(Input['keyMapper'][0x52]=_0x595e1f(0x6d4)),_0x58bca0[_0x595e1f(0x2ca)][_0x595e1f(0x4f7)]=_0x58bca0[_0x595e1f(0x2ca)][_0x595e1f(0x4f7)][_0x595e1f(0x5a8)](_0x4e2fb4=>_0x4e2fb4[_0x595e1f(0x697)]()[_0x595e1f(0x440)]()),_0x58bca0[_0x595e1f(0x2ca)][_0x595e1f(0x2fb)]=_0x58bca0[_0x595e1f(0x2ca)][_0x595e1f(0x2fb)][_0x595e1f(0x5a8)](_0x3de869=>_0x3de869['toUpperCase']()[_0x595e1f(0x440)]());},Scene_Boot[_0x2a005f(0x7d8)][_0x2a005f(0x244)]=function(){const _0x860ce6=_0x2a005f;this[_0x860ce6(0x3fa)]();},Scene_Boot[_0x2a005f(0x7d8)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x49a564=_0x2a005f,_0x430e40=VisuMZ[_0x49a564(0x63d)][_0x49a564(0x52e)][_0x49a564(0x192)];for(const _0x15d52f of _0x430e40){const _0x119cea=_0x15d52f[_0x49a564(0x4b5)][_0x49a564(0x19f)](/[ ]/g,''),_0x405213=_0x15d52f['CodeJS'];VisuMZ[_0x49a564(0x63d)][_0x49a564(0x721)](_0x119cea,_0x405213);}},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x721)]=function(_0x397cd7,_0xf090e4){const _0x48c0a7=_0x2a005f;if(!!window[_0x397cd7]){if($gameTemp['isPlaytest']())console[_0x48c0a7(0x6d8)](_0x48c0a7(0x618)['format'](_0x397cd7));}const _0x4aa0bf=_0x48c0a7(0x3cb)[_0x48c0a7(0x594)](_0x397cd7,_0xf090e4);window[_0x397cd7]=new Function(_0x4aa0bf);},Scene_Boot['prototype'][_0x2a005f(0x877)]=function(){const _0x43e407=_0x2a005f,_0x11e53d=VisuMZ[_0x43e407(0x63d)]['Settings']['CustomParam'];if(!_0x11e53d)return;for(const _0x399ab8 of _0x11e53d){if(!_0x399ab8)continue;VisuMZ[_0x43e407(0x63d)][_0x43e407(0x175)](_0x399ab8);}},VisuMZ[_0x2a005f(0x63d)]['CustomParamNames']={},VisuMZ[_0x2a005f(0x63d)]['CustomParamIcons']={},VisuMZ['CoreEngine'][_0x2a005f(0x277)]={},VisuMZ['CoreEngine'][_0x2a005f(0x1a0)]={},VisuMZ['CoreEngine']['createCustomParameter']=function(_0x553797){const _0x4563cf=_0x2a005f,_0x490bc0=_0x553797[_0x4563cf(0x313)],_0x5dcf99=_0x553797['ParamName'],_0x55c555=_0x553797['Icon'],_0xd7872d=_0x553797[_0x4563cf(0x7f1)],_0x20ff7b=new Function(_0x553797[_0x4563cf(0x811)]);VisuMZ[_0x4563cf(0x63d)]['CustomParamNames'][_0x490bc0[_0x4563cf(0x697)]()['trim']()]=_0x5dcf99,VisuMZ[_0x4563cf(0x63d)][_0x4563cf(0x500)][_0x490bc0[_0x4563cf(0x697)]()['trim']()]=_0x55c555,VisuMZ[_0x4563cf(0x63d)][_0x4563cf(0x277)][_0x490bc0[_0x4563cf(0x697)]()[_0x4563cf(0x440)]()]=_0xd7872d,VisuMZ[_0x4563cf(0x63d)][_0x4563cf(0x1a0)][_0x490bc0[_0x4563cf(0x697)]()[_0x4563cf(0x440)]()]=_0x490bc0,Object['defineProperty'](Game_BattlerBase['prototype'],_0x490bc0,{'get'(){const _0x1c4bfc=_0x4563cf,_0x541f70=_0x20ff7b[_0x1c4bfc(0x873)](this);return _0xd7872d===_0x1c4bfc(0x7d4)?Math[_0x1c4bfc(0x57f)](_0x541f70):_0x541f70;}});},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x30d)]={},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x89f)]={},Scene_Boot[_0x2a005f(0x7d8)]['process_VisuMZ_CoreEngine_ControllerButtons']=function(){const _0x2830a0=_0x2a005f,_0x2550fd=VisuMZ['CoreEngine'][_0x2830a0(0x52e)][_0x2830a0(0x30d)];for(const _0x3705f3 of _0x2550fd){const _0x5c93a5=(_0x3705f3[_0x2830a0(0x8c7)]||'')[_0x2830a0(0x3b8)]()[_0x2830a0(0x440)](),_0x1f646c=(_0x3705f3['Match']||'')[_0x2830a0(0x3b8)]()['trim']();VisuMZ[_0x2830a0(0x63d)][_0x2830a0(0x30d)][_0x5c93a5]=_0x3705f3,VisuMZ[_0x2830a0(0x63d)][_0x2830a0(0x89f)][_0x1f646c]=_0x5c93a5;}},VisuMZ[_0x2a005f(0x8b0)]=function(){const _0x38a772=_0x2a005f;for(const _0x559695 of $dataActors){if(_0x559695)VisuMZ['ParseActorNotetags'](_0x559695);}for(const _0x3a51cb of $dataClasses){if(_0x3a51cb)VisuMZ[_0x38a772(0x783)](_0x3a51cb);}for(const _0x4592e6 of $dataSkills){if(_0x4592e6)VisuMZ[_0x38a772(0x4fa)](_0x4592e6);}for(const _0xf7e491 of $dataItems){if(_0xf7e491)VisuMZ[_0x38a772(0x261)](_0xf7e491);}for(const _0x3a54b7 of $dataWeapons){if(_0x3a54b7)VisuMZ[_0x38a772(0x88d)](_0x3a54b7);}for(const _0x1db020 of $dataArmors){if(_0x1db020)VisuMZ[_0x38a772(0x25a)](_0x1db020);}for(const _0x358262 of $dataEnemies){if(_0x358262)VisuMZ['ParseEnemyNotetags'](_0x358262);}for(const _0x2afcc0 of $dataStates){if(_0x2afcc0)VisuMZ[_0x38a772(0x839)](_0x2afcc0);}for(const _0x41573c of $dataTilesets){if(_0x41573c)VisuMZ[_0x38a772(0x514)](_0x41573c);}},VisuMZ[_0x2a005f(0x1e4)]=function(_0x3c9a64){},VisuMZ['ParseClassNotetags']=function(_0x4834a2){},VisuMZ[_0x2a005f(0x4fa)]=function(_0x204378){},VisuMZ[_0x2a005f(0x261)]=function(_0x25b67a){},VisuMZ[_0x2a005f(0x88d)]=function(_0x1fbb24){},VisuMZ[_0x2a005f(0x25a)]=function(_0x49dba3){},VisuMZ[_0x2a005f(0x83b)]=function(_0x891860){},VisuMZ['ParseStateNotetags']=function(_0x546487){},VisuMZ[_0x2a005f(0x514)]=function(_0x3838de){},VisuMZ['CoreEngine'][_0x2a005f(0x1e4)]=VisuMZ['ParseActorNotetags'],VisuMZ[_0x2a005f(0x1e4)]=function(_0xca81aa){const _0x1afb54=_0x2a005f;VisuMZ[_0x1afb54(0x63d)][_0x1afb54(0x1e4)][_0x1afb54(0x873)](this,_0xca81aa);const _0x130750=_0xca81aa[_0x1afb54(0x6d3)];if(_0x130750['match'](/<MAX LEVEL:[ ](\d+)>/i)){_0xca81aa[_0x1afb54(0x74b)]=Number(RegExp['$1']);if(_0xca81aa[_0x1afb54(0x74b)]===0x0)_0xca81aa[_0x1afb54(0x74b)]=Number[_0x1afb54(0x561)];}_0x130750[_0x1afb54(0x37e)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0xca81aa['initialLevel']=Math[_0x1afb54(0x21b)](Number(RegExp['$1']),_0xca81aa[_0x1afb54(0x74b)]));},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x783)]=VisuMZ[_0x2a005f(0x783)],VisuMZ[_0x2a005f(0x783)]=function(_0x527587){const _0x4d0b4d=_0x2a005f;VisuMZ[_0x4d0b4d(0x63d)][_0x4d0b4d(0x783)][_0x4d0b4d(0x873)](this,_0x527587);if(_0x527587[_0x4d0b4d(0x434)])for(const _0x206895 of _0x527587[_0x4d0b4d(0x434)]){_0x206895[_0x4d0b4d(0x6d3)]['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x206895['level']=Math['max'](Number(RegExp['$1']),0x1));}},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x83b)]=VisuMZ[_0x2a005f(0x83b)],VisuMZ[_0x2a005f(0x83b)]=function(_0x11f11c){const _0xe1dcb7=_0x2a005f;VisuMZ[_0xe1dcb7(0x63d)]['ParseEnemyNotetags'][_0xe1dcb7(0x873)](this,_0x11f11c),_0x11f11c[_0xe1dcb7(0x36b)]=0x1;const _0x5b3563=_0x11f11c['note'];if(_0x5b3563['match'](/<LEVEL:[ ](\d+)>/i))_0x11f11c['level']=Number(RegExp['$1']);if(_0x5b3563['match'](/<MAXHP:[ ](\d+)>/i))_0x11f11c[_0xe1dcb7(0x764)][0x0]=Number(RegExp['$1']);if(_0x5b3563['match'](/<MAXMP:[ ](\d+)>/i))_0x11f11c[_0xe1dcb7(0x764)][0x1]=Number(RegExp['$1']);if(_0x5b3563['match'](/<ATK:[ ](\d+)>/i))_0x11f11c[_0xe1dcb7(0x764)][0x2]=Number(RegExp['$1']);if(_0x5b3563[_0xe1dcb7(0x37e)](/<DEF:[ ](\d+)>/i))_0x11f11c[_0xe1dcb7(0x764)][0x3]=Number(RegExp['$1']);if(_0x5b3563[_0xe1dcb7(0x37e)](/<MAT:[ ](\d+)>/i))_0x11f11c[_0xe1dcb7(0x764)][0x4]=Number(RegExp['$1']);if(_0x5b3563[_0xe1dcb7(0x37e)](/<MDF:[ ](\d+)>/i))_0x11f11c[_0xe1dcb7(0x764)][0x5]=Number(RegExp['$1']);if(_0x5b3563[_0xe1dcb7(0x37e)](/<AGI:[ ](\d+)>/i))_0x11f11c[_0xe1dcb7(0x764)][0x6]=Number(RegExp['$1']);if(_0x5b3563['match'](/<LUK:[ ](\d+)>/i))_0x11f11c[_0xe1dcb7(0x764)][0x7]=Number(RegExp['$1']);if(_0x5b3563['match'](/<EXP:[ ](\d+)>/i))_0x11f11c[_0xe1dcb7(0x38c)]=Number(RegExp['$1']);if(_0x5b3563[_0xe1dcb7(0x37e)](/<GOLD:[ ](\d+)>/i))_0x11f11c[_0xe1dcb7(0x6ff)]=Number(RegExp['$1']);},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x42e)]=Graphics[_0x2a005f(0x678)],Graphics[_0x2a005f(0x678)]=function(){const _0x25e658=_0x2a005f;switch(VisuMZ[_0x25e658(0x63d)]['Settings'][_0x25e658(0x213)][_0x25e658(0x1e1)]){case _0x25e658(0x8a6):return!![];case _0x25e658(0x6d9):return![];default:return VisuMZ[_0x25e658(0x63d)][_0x25e658(0x42e)]['call'](this);}},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x86c)]=Graphics[_0x2a005f(0x3ba)],Graphics[_0x2a005f(0x3ba)]=function(_0x593682,_0x24e57e,_0x446bc8=null){const _0x2dff71=_0x2a005f;VisuMZ[_0x2dff71(0x63d)][_0x2dff71(0x86c)][_0x2dff71(0x873)](this,_0x593682,_0x24e57e,_0x446bc8),VisuMZ[_0x2dff71(0x33b)](![]);},VisuMZ[_0x2a005f(0x63d)]['Graphics_centerElement']=Graphics['_centerElement'],Graphics['_centerElement']=function(_0x4938f6){const _0x4a7f0b=_0x2a005f;VisuMZ[_0x4a7f0b(0x63d)][_0x4a7f0b(0x204)][_0x4a7f0b(0x873)](this,_0x4938f6),this[_0x4a7f0b(0x5dd)](_0x4938f6);},Graphics[_0x2a005f(0x5dd)]=function(_0x36649c){const _0x11c29b=_0x2a005f;VisuMZ['CoreEngine'][_0x11c29b(0x52e)][_0x11c29b(0x213)][_0x11c29b(0x1d0)]&&(_0x36649c[_0x11c29b(0x78d)][_0x11c29b(0x5d6)]=_0x11c29b(0x1af));VisuMZ[_0x11c29b(0x63d)]['Settings'][_0x11c29b(0x213)][_0x11c29b(0x370)]&&(_0x36649c['style'][_0x11c29b(0x7db)]=_0x11c29b(0x2ed));const _0x2e41ee=Math[_0x11c29b(0x23f)](0x0,Math['floor'](_0x36649c[_0x11c29b(0x4c6)]*this[_0x11c29b(0x653)])),_0x1672ec=Math[_0x11c29b(0x23f)](0x0,Math[_0x11c29b(0x2a7)](_0x36649c['height']*this[_0x11c29b(0x653)]));_0x36649c['style']['width']=_0x2e41ee+'px',_0x36649c[_0x11c29b(0x78d)]['height']=_0x1672ec+'px';},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x3d8)]=Bitmap['prototype'][_0x2a005f(0x72f)],Bitmap[_0x2a005f(0x7d8)][_0x2a005f(0x72f)]=function(_0x171791,_0x57e0ae){const _0x15b325=_0x2a005f;VisuMZ[_0x15b325(0x63d)][_0x15b325(0x3d8)][_0x15b325(0x873)](this,_0x171791,_0x57e0ae),this[_0x15b325(0x341)]=!(VisuMZ[_0x15b325(0x63d)]['Settings']['QoL']['PixelateImageRendering']??!![]);},Bitmap[_0x2a005f(0x7d8)][_0x2a005f(0x81f)]=function(){const _0x30f5d9=_0x2a005f;this[_0x30f5d9(0x380)]=!![];},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x367)]=Sprite[_0x2a005f(0x7d8)][_0x2a005f(0x893)],Sprite['prototype'][_0x2a005f(0x893)]=function(){const _0x21ad9b=_0x2a005f;if(this['_texture'])VisuMZ[_0x21ad9b(0x63d)][_0x21ad9b(0x367)][_0x21ad9b(0x873)](this);this[_0x21ad9b(0x790)]();},Sprite['prototype']['destroyCoreEngineMarkedBitmaps']=function(){const _0x47a6c3=_0x2a005f;if(!this[_0x47a6c3(0x5af)])return;if(!this[_0x47a6c3(0x5af)][_0x47a6c3(0x380)])return;this[_0x47a6c3(0x5af)][_0x47a6c3(0x406)]&&!this[_0x47a6c3(0x418)]['_baseTexture'][_0x47a6c3(0x2cb)]&&this[_0x47a6c3(0x5af)][_0x47a6c3(0x893)]();},VisuMZ['CoreEngine'][_0x2a005f(0x85f)]=Bitmap[_0x2a005f(0x7d8)][_0x2a005f(0x807)],Bitmap['prototype'][_0x2a005f(0x807)]=function(_0x1df8c7,_0x165488){const _0x2a2271=_0x2a005f;VisuMZ[_0x2a2271(0x63d)]['Bitmap_resize'][_0x2a2271(0x873)](this,_0x1df8c7,_0x165488),this[_0x2a2271(0x81f)]();},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x17a)]=Bitmap[_0x2a005f(0x7d8)]['blt'],Bitmap[_0x2a005f(0x7d8)]['blt']=function(_0x6c35bb,_0x32bbeb,_0x296199,_0x275013,_0x9c4d4b,_0xae0628,_0xce8bf7,_0x24a72b,_0x4b08ed){const _0x25c9c7=_0x2a005f;_0x32bbeb=Math[_0x25c9c7(0x57f)](_0x32bbeb),_0x296199=Math[_0x25c9c7(0x57f)](_0x296199),_0x275013=Math[_0x25c9c7(0x57f)](_0x275013),_0x9c4d4b=Math[_0x25c9c7(0x57f)](_0x9c4d4b),_0xae0628=Math[_0x25c9c7(0x57f)](_0xae0628),_0xce8bf7=Math[_0x25c9c7(0x57f)](_0xce8bf7),VisuMZ[_0x25c9c7(0x63d)][_0x25c9c7(0x17a)][_0x25c9c7(0x873)](this,_0x6c35bb,_0x32bbeb,_0x296199,_0x275013,_0x9c4d4b,_0xae0628,_0xce8bf7,_0x24a72b,_0x4b08ed),this[_0x25c9c7(0x81f)]();},VisuMZ['CoreEngine'][_0x2a005f(0x5e4)]=Bitmap['prototype'][_0x2a005f(0x3d4)],Bitmap[_0x2a005f(0x7d8)][_0x2a005f(0x3d4)]=function(_0x41836d,_0x309e04,_0x14cfdb,_0x53326b){const _0x39638e=_0x2a005f;VisuMZ[_0x39638e(0x63d)]['Bitmap_clearRect']['call'](this,_0x41836d,_0x309e04,_0x14cfdb,_0x53326b),this['markCoreEngineModified']();},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x51d)]=Bitmap['prototype'][_0x2a005f(0x220)],Bitmap['prototype'][_0x2a005f(0x220)]=function(_0x55bf40,_0x416819,_0x234b15,_0x382d6f,_0x47ca26){const _0x12cac0=_0x2a005f;VisuMZ[_0x12cac0(0x63d)][_0x12cac0(0x51d)][_0x12cac0(0x873)](this,_0x55bf40,_0x416819,_0x234b15,_0x382d6f,_0x47ca26),this[_0x12cac0(0x81f)]();},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x471)]=Bitmap[_0x2a005f(0x7d8)][_0x2a005f(0x20d)],Bitmap[_0x2a005f(0x7d8)][_0x2a005f(0x20d)]=function(_0x304503,_0x4629a3,_0x385d1f,_0x1c159f,_0x20c7ef){const _0x2badfa=_0x2a005f;VisuMZ['CoreEngine'][_0x2badfa(0x471)][_0x2badfa(0x873)](this,_0x304503,_0x4629a3,_0x385d1f,_0x1c159f,_0x20c7ef),this[_0x2badfa(0x81f)]();},VisuMZ['CoreEngine'][_0x2a005f(0x509)]=Bitmap[_0x2a005f(0x7d8)]['gradientFillRect'],Bitmap[_0x2a005f(0x7d8)][_0x2a005f(0x4a6)]=function(_0x4deaef,_0x5d7e2a,_0x450531,_0x1ad0a9,_0x45e405,_0x1d3821,_0x2f3916){const _0x7be084=_0x2a005f;VisuMZ[_0x7be084(0x63d)][_0x7be084(0x509)][_0x7be084(0x873)](this,_0x4deaef,_0x5d7e2a,_0x450531,_0x1ad0a9,_0x45e405,_0x1d3821,_0x2f3916),this['markCoreEngineModified']();},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x799)]=Bitmap[_0x2a005f(0x7d8)][_0x2a005f(0x183)],Bitmap[_0x2a005f(0x7d8)]['drawCircle']=function(_0x4119d7,_0x5746a5,_0x1dc64e,_0x5d66d8){const _0x34ff56=_0x2a005f;_0x4119d7=Math[_0x34ff56(0x57f)](_0x4119d7),_0x5746a5=Math['round'](_0x5746a5),_0x1dc64e=Math[_0x34ff56(0x57f)](_0x1dc64e),VisuMZ[_0x34ff56(0x63d)][_0x34ff56(0x799)][_0x34ff56(0x873)](this,_0x4119d7,_0x5746a5,_0x1dc64e,_0x5d66d8),this['markCoreEngineModified']();},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x302)]=Bitmap['prototype']['measureTextWidth'],Bitmap['prototype'][_0x2a005f(0x5cb)]=function(_0x5e5df4){const _0x407505=_0x2a005f;return Math[_0x407505(0x187)](VisuMZ[_0x407505(0x63d)][_0x407505(0x302)][_0x407505(0x873)](this,_0x5e5df4));},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x493)]=Bitmap[_0x2a005f(0x7d8)][_0x2a005f(0x549)],Bitmap[_0x2a005f(0x7d8)]['drawText']=function(_0x22fe7f,_0x177118,_0x1bcfa7,_0xea406d,_0x334ea5,_0x6ddf68){const _0x3bd8ff=_0x2a005f;_0x177118=Math[_0x3bd8ff(0x57f)](_0x177118),_0x1bcfa7=Math[_0x3bd8ff(0x57f)](_0x1bcfa7),_0xea406d=Math[_0x3bd8ff(0x57f)](_0xea406d),_0x334ea5=Math[_0x3bd8ff(0x57f)](_0x334ea5),VisuMZ[_0x3bd8ff(0x63d)][_0x3bd8ff(0x493)][_0x3bd8ff(0x873)](this,_0x22fe7f,_0x177118,_0x1bcfa7,_0xea406d,_0x334ea5,_0x6ddf68),this['markCoreEngineModified']();},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x552)]=Bitmap[_0x2a005f(0x7d8)][_0x2a005f(0x568)],Bitmap[_0x2a005f(0x7d8)][_0x2a005f(0x568)]=function(_0x126f31,_0x47978a,_0x3aa502,_0x5cc2be){const _0x40521d=_0x2a005f;VisuMZ[_0x40521d(0x63d)]['Settings'][_0x40521d(0x213)]['FontShadows']?this['_drawTextShadow'](_0x126f31,_0x47978a,_0x3aa502,_0x5cc2be):VisuMZ['CoreEngine'][_0x40521d(0x552)][_0x40521d(0x873)](this,_0x126f31,_0x47978a,_0x3aa502,_0x5cc2be);},Bitmap[_0x2a005f(0x7d8)]['_drawTextShadow']=function(_0x1e2915,_0x3dbadc,_0x2bf364,_0x2ecd16){const _0x3e6ca8=_0x2a005f,_0x2de162=this[_0x3e6ca8(0x35e)];_0x2de162[_0x3e6ca8(0x4f3)]=this[_0x3e6ca8(0x2ad)],_0x2de162[_0x3e6ca8(0x59a)](_0x1e2915,_0x3dbadc+0x2,_0x2bf364+0x2,_0x2ecd16);},VisuMZ['CoreEngine']['Input_clear']=Input[_0x2a005f(0x707)],Input[_0x2a005f(0x707)]=function(){const _0x5e17d1=_0x2a005f;VisuMZ['CoreEngine'][_0x5e17d1(0x8b5)][_0x5e17d1(0x873)](this),this[_0x5e17d1(0x652)]=undefined,this[_0x5e17d1(0x72d)]=undefined,this[_0x5e17d1(0x518)]=Input[_0x5e17d1(0x654)];},VisuMZ['CoreEngine'][_0x2a005f(0x407)]=Input['update'],Input[_0x2a005f(0x457)]=function(){const _0x3e5bb3=_0x2a005f;VisuMZ[_0x3e5bb3(0x63d)][_0x3e5bb3(0x407)]['call'](this);if(this[_0x3e5bb3(0x518)])this[_0x3e5bb3(0x518)]--;},VisuMZ['CoreEngine'][_0x2a005f(0x665)]=Input[_0x2a005f(0x71c)],Input[_0x2a005f(0x71c)]=function(){const _0x32553e=_0x2a005f;if(this['_gamepadWait'])return;VisuMZ[_0x32553e(0x63d)][_0x32553e(0x665)][_0x32553e(0x873)](this);},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x3d7)]=Input[_0x2a005f(0x820)],Input[_0x2a005f(0x820)]=function(){const _0x3ac955=_0x2a005f;VisuMZ['CoreEngine'][_0x3ac955(0x3d7)][_0x3ac955(0x873)](this),document[_0x3ac955(0x482)](_0x3ac955(0x1e2),this['_onKeyPress']['bind'](this));},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x241)]=Input[_0x2a005f(0x306)],Input[_0x2a005f(0x306)]=function(_0xbf6afb){const _0x161a96=_0x2a005f;this['_inputSpecialKeyCode']=_0xbf6afb[_0x161a96(0x347)],VisuMZ[_0x161a96(0x63d)][_0x161a96(0x241)][_0x161a96(0x873)](this,_0xbf6afb),this[_0x161a96(0x607)](null);},Input['_onKeyPress']=function(_0x3b7580){this['_registerKeyInput'](_0x3b7580);},Input[_0x2a005f(0x40e)]=function(_0x518a35){const _0x13246a=_0x2a005f;this[_0x13246a(0x72d)]=_0x518a35[_0x13246a(0x347)];let _0x12f4e5=String[_0x13246a(0x350)](_0x518a35[_0x13246a(0x45f)]);this[_0x13246a(0x652)]===undefined?this[_0x13246a(0x652)]=_0x12f4e5:this['_inputString']+=_0x12f4e5;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x526)]=Input[_0x2a005f(0x769)],Input[_0x2a005f(0x769)]=function(_0x24fdf1){const _0x28d6e5=_0x2a005f;if(_0x24fdf1===0x8)return![];return VisuMZ[_0x28d6e5(0x63d)][_0x28d6e5(0x526)][_0x28d6e5(0x873)](this,_0x24fdf1);},Input['isSpecialCode']=function(_0x4b0622){const _0x19ef39=_0x2a005f;if(_0x4b0622[_0x19ef39(0x37e)](/backspace/i))return this[_0x19ef39(0x72d)]===0x8;if(_0x4b0622['match'](/enter/i))return this[_0x19ef39(0x72d)]===0xd;if(_0x4b0622[_0x19ef39(0x37e)](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input[_0x2a005f(0x34f)]=function(){const _0x29ef50=_0x2a005f;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x29ef50(0x8a8)](this[_0x29ef50(0x72d)]);},Input['isArrowPressed']=function(){const _0x2d0939=_0x2a005f;return[0x25,0x26,0x27,0x28]['contains'](this[_0x2d0939(0x72d)]);},Input[_0x2a005f(0x46c)]=function(){const _0x28d122=_0x2a005f;if(navigator[_0x28d122(0x5d8)]){const _0x33d253=navigator[_0x28d122(0x5d8)]();if(_0x33d253)for(const _0x2eaa51 of _0x33d253){if(_0x2eaa51&&_0x2eaa51[_0x28d122(0x6c9)])return!![];}}return![];},Input['isGamepadTriggered']=function(){const _0x114104=_0x2a005f;if(navigator[_0x114104(0x5d8)]){const _0x3711f7=navigator[_0x114104(0x5d8)]();if(_0x3711f7)for(const _0xd89f30 of _0x3711f7){if(_0xd89f30&&_0xd89f30[_0x114104(0x6c9)]){if(this[_0x114104(0x83a)](_0xd89f30))return!![];if(this[_0x114104(0x236)](_0xd89f30))return!![];}}}return![];},Input[_0x2a005f(0x83a)]=function(_0x1d1c6b){const _0x4beec7=_0x2a005f,_0x8bae0c=_0x1d1c6b[_0x4beec7(0x8c9)];for(let _0x2bea8d=0x0;_0x2bea8d<_0x8bae0c[_0x4beec7(0x7c3)];_0x2bea8d++){if(_0x8bae0c[_0x2bea8d]['pressed'])return!![];}return![];},Input['isGamepadAxisMoved']=function(_0x290a56){const _0x53f00b=_0x290a56['axes'],_0x35f184=0.5;if(_0x53f00b[0x0]<-_0x35f184)return!![];if(_0x53f00b[0x0]>_0x35f184)return!![];if(_0x53f00b[0x1]<-_0x35f184)return!![];if(_0x53f00b[0x1]>_0x35f184)return!![];return![];},Input[_0x2a005f(0x378)]=function(){const _0x60ab04=_0x2a005f;return this[_0x60ab04(0x37f)]||null;},Input[_0x2a005f(0x607)]=function(_0x3ba89d){const _0x2c6f3e=_0x2a005f;this[_0x2c6f3e(0x37f)]=_0x3ba89d;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x44d)]=Input[_0x2a005f(0x3ef)],Input['_updateGamepadState']=function(_0x4f00df){const _0x2c9163=_0x2a005f;VisuMZ[_0x2c9163(0x63d)][_0x2c9163(0x44d)][_0x2c9163(0x873)](this,_0x4f00df),(this[_0x2c9163(0x83a)](_0x4f00df)||this[_0x2c9163(0x236)](_0x4f00df))&&this['setLastGamepadUsed'](_0x4f00df);},Input[_0x2a005f(0x6fd)]=function(){const _0x341d65=_0x2a005f;return this[_0x341d65(0x37f)]?this[_0x341d65(0x37f)]['id']:_0x341d65(0x8d5);},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x7e4)]=Tilemap[_0x2a005f(0x7d8)][_0x2a005f(0x6f3)],Tilemap[_0x2a005f(0x7d8)]['_addShadow']=function(_0x483b5c,_0x3b1762,_0x3aa402,_0x1da4ff){const _0x1fe8e4=_0x2a005f;if($gameMap&&$gameMap[_0x1fe8e4(0x636)]())return;VisuMZ[_0x1fe8e4(0x63d)][_0x1fe8e4(0x7e4)][_0x1fe8e4(0x873)](this,_0x483b5c,_0x3b1762,_0x3aa402,_0x1da4ff);},Tilemap[_0x2a005f(0x61e)]['prototype']['_createInternalTextures']=function(){const _0x2a2788=_0x2a005f;this['_destroyInternalTextures']();for(let _0x28bf82=0x0;_0x28bf82<Tilemap[_0x2a2788(0x830)]['MAX_GL_TEXTURES'];_0x28bf82++){const _0x3b275c=new PIXI[(_0x2a2788(0x70b))]();_0x3b275c['setSize'](0x800,0x800),VisuMZ[_0x2a2788(0x63d)][_0x2a2788(0x52e)][_0x2a2788(0x213)][_0x2a2788(0x370)]&&(_0x3b275c[_0x2a2788(0x3f0)]=PIXI['SCALE_MODES'][_0x2a2788(0x459)]),this[_0x2a2788(0x5e3)][_0x2a2788(0x1fe)](_0x3b275c);}},WindowLayer[_0x2a005f(0x7d8)]['isMaskingEnabled']=function(){const _0x586110=_0x2a005f;return SceneManager&&SceneManager[_0x586110(0x458)]?SceneManager[_0x586110(0x458)][_0x586110(0x34d)]():!![];},VisuMZ[_0x2a005f(0x63d)]['WindowLayer_render']=WindowLayer[_0x2a005f(0x7d8)]['render'],WindowLayer['prototype'][_0x2a005f(0x339)]=function render(_0x3bf8ef){const _0x18aefc=_0x2a005f;this[_0x18aefc(0x50e)]()?VisuMZ[_0x18aefc(0x63d)][_0x18aefc(0x6fa)][_0x18aefc(0x873)](this,_0x3bf8ef):this[_0x18aefc(0x364)](_0x3bf8ef);},WindowLayer['prototype']['renderNoMask']=function render(_0x5a1bdf){const _0xebd52a=_0x2a005f;if(!this[_0xebd52a(0x554)])return;const _0x1e6d53=new PIXI[(_0xebd52a(0x532))](),_0x4be361=_0x5a1bdf['gl'],_0x92817e=this[_0xebd52a(0x7c4)][_0xebd52a(0x432)]();_0x5a1bdf[_0xebd52a(0x22c)][_0xebd52a(0x805)](),_0x1e6d53['transform']=this['transform'],_0x5a1bdf[_0xebd52a(0x3d3)][_0xebd52a(0x6ce)](),_0x4be361['enable'](_0x4be361[_0xebd52a(0x388)]);while(_0x92817e[_0xebd52a(0x7c3)]>0x0){const _0x2eab29=_0x92817e[_0xebd52a(0x7c7)]();_0x2eab29[_0xebd52a(0x519)]&&_0x2eab29[_0xebd52a(0x554)]&&_0x2eab29[_0xebd52a(0x3a6)]>0x0&&(_0x4be361[_0xebd52a(0x379)](_0x4be361['EQUAL'],0x0,~0x0),_0x4be361['stencilOp'](_0x4be361['KEEP'],_0x4be361[_0xebd52a(0x1dc)],_0x4be361[_0xebd52a(0x1dc)]),_0x2eab29[_0xebd52a(0x339)](_0x5a1bdf),_0x5a1bdf[_0xebd52a(0x3d3)][_0xebd52a(0x6ce)](),_0x1e6d53[_0xebd52a(0x707)](),_0x4be361[_0xebd52a(0x379)](_0x4be361[_0xebd52a(0x3e1)],0x1,~0x0),_0x4be361[_0xebd52a(0x4de)](_0x4be361['REPLACE'],_0x4be361[_0xebd52a(0x5a9)],_0x4be361[_0xebd52a(0x5a9)]),_0x4be361[_0xebd52a(0x513)](_0x4be361[_0xebd52a(0x397)],_0x4be361['ONE']),_0x1e6d53[_0xebd52a(0x339)](_0x5a1bdf),_0x5a1bdf['batch'][_0xebd52a(0x6ce)](),_0x4be361[_0xebd52a(0x513)](_0x4be361[_0xebd52a(0x1f1)],_0x4be361[_0xebd52a(0x530)]));}_0x4be361[_0xebd52a(0x309)](_0x4be361[_0xebd52a(0x388)]),_0x4be361['clear'](_0x4be361['STENCIL_BUFFER_BIT']),_0x4be361[_0xebd52a(0x6b4)](0x0),_0x5a1bdf[_0xebd52a(0x3d3)][_0xebd52a(0x6ce)]();for(const _0x392c6b of this[_0xebd52a(0x7c4)]){!_0x392c6b[_0xebd52a(0x519)]&&_0x392c6b[_0xebd52a(0x554)]&&_0x392c6b[_0xebd52a(0x339)](_0x5a1bdf);}_0x5a1bdf[_0xebd52a(0x3d3)][_0xebd52a(0x6ce)]();},DataManager[_0x2a005f(0x864)]=function(_0x6ed54b){const _0x256a53=_0x2a005f;return this[_0x256a53(0x32e)](_0x6ed54b)&&_0x6ed54b[_0x256a53(0x24c)]===0x2;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x1a6)]=DataManager['setupNewGame'],DataManager[_0x2a005f(0x4d9)]=function(){const _0x41e5aa=_0x2a005f;VisuMZ[_0x41e5aa(0x63d)][_0x41e5aa(0x1a6)][_0x41e5aa(0x873)](this),this[_0x41e5aa(0x209)](),this[_0x41e5aa(0x778)]();},DataManager[_0x2a005f(0x209)]=function(){const _0x1f373f=_0x2a005f;if($gameTemp[_0x1f373f(0x7c6)]()){const _0x4a68e9=VisuMZ[_0x1f373f(0x63d)]['Settings'][_0x1f373f(0x213)][_0x1f373f(0x5ae)];if(_0x4a68e9>0x0)$gameTemp['reserveCommonEvent'](_0x4a68e9);}},DataManager[_0x2a005f(0x778)]=function(){const _0x326147=_0x2a005f,_0x1873f0=VisuMZ[_0x326147(0x63d)]['Settings'][_0x326147(0x213)][_0x326147(0x49d)]||0x0;if(_0x1873f0>0x0)$gameTemp[_0x326147(0x320)](_0x1873f0);},DataManager[_0x2a005f(0x351)]=function(_0x295568){const _0x41dbfb=_0x2a005f,_0x10809d=$dataTroops[_0x295568];if(!_0x10809d)return'';let _0x3fbd24='';_0x3fbd24+=_0x10809d[_0x41dbfb(0x762)];for(const _0x17891c of _0x10809d['pages']){for(const _0x4a7beb of _0x17891c[_0x41dbfb(0x617)]){[0x6c,0x198][_0x41dbfb(0x34a)](_0x4a7beb[_0x41dbfb(0x6c6)])&&(_0x3fbd24+='\x0a',_0x3fbd24+=_0x4a7beb[_0x41dbfb(0x669)][0x0]);}}return _0x3fbd24;};(VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x52e)][_0x2a005f(0x213)][_0x2a005f(0x4ce)]??!![])&&($scene=null,VisuMZ['CoreEngine']['Scene_Base_create']=Scene_Base[_0x2a005f(0x7d8)]['create'],Scene_Base[_0x2a005f(0x7d8)]['create']=function(){const _0x13fb84=_0x2a005f;VisuMZ[_0x13fb84(0x63d)][_0x13fb84(0x1bd)]['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x2a005f(0x63d)]['Scene_Map_createSpriteset']=Scene_Map[_0x2a005f(0x7d8)]['createSpriteset'],Scene_Map[_0x2a005f(0x7d8)][_0x2a005f(0x84c)]=function(){const _0x158e1c=_0x2a005f;VisuMZ[_0x158e1c(0x63d)][_0x158e1c(0x8a4)][_0x158e1c(0x873)](this),$spriteset=this['_spriteset'];},VisuMZ['CoreEngine'][_0x2a005f(0x758)]=Scene_Battle[_0x2a005f(0x7d8)][_0x2a005f(0x84c)],Scene_Battle[_0x2a005f(0x7d8)][_0x2a005f(0x84c)]=function(){const _0x3ba1c8=_0x2a005f;VisuMZ[_0x3ba1c8(0x63d)]['Scene_Battle_createSpriteset'][_0x3ba1c8(0x873)](this),$spriteset=this[_0x3ba1c8(0x733)];},VisuMZ[_0x2a005f(0x63d)]['Scene_Base_terminate']=Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x629)],Scene_Base['prototype'][_0x2a005f(0x629)]=function(){const _0x4177ee=_0x2a005f;VisuMZ['CoreEngine'][_0x4177ee(0x80c)]['call'](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x37a)]=BattleManager[_0x2a005f(0x457)],BattleManager[_0x2a005f(0x457)]=function(_0x138055){const _0xa6fc3c=_0x2a005f;VisuMZ[_0xa6fc3c(0x63d)][_0xa6fc3c(0x37a)][_0xa6fc3c(0x873)](this,_0x138055),$subject=this[_0xa6fc3c(0x7ab)],$targets=this[_0xa6fc3c(0x311)],$target=this[_0xa6fc3c(0x3fc)]||this[_0xa6fc3c(0x311)][0x0];},$event=null,VisuMZ['CoreEngine']['Game_Event_start']=Game_Event[_0x2a005f(0x7d8)][_0x2a005f(0x5e0)],Game_Event[_0x2a005f(0x7d8)][_0x2a005f(0x5e0)]=function(){const _0x4b03dc=_0x2a005f;VisuMZ['CoreEngine'][_0x4b03dc(0x674)][_0x4b03dc(0x873)](this),$event=this;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x741)]=Scene_Map['prototype']['update'],Scene_Map[_0x2a005f(0x7d8)]['update']=function(){const _0x316577=_0x2a005f;VisuMZ['CoreEngine'][_0x316577(0x741)][_0x316577(0x873)](this),$gameMap[_0x316577(0x686)]();},Game_Map[_0x2a005f(0x7d8)][_0x2a005f(0x686)]=function(){const _0x380a10=_0x2a005f;!this[_0x380a10(0x5d4)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x143448){const _0x16d255=_0x2a005f;if($gameTemp)$gameTemp[_0x16d255(0x320)](_0x143448);},$onceParallel=function(_0x2aa7a8){const _0x7c9238=_0x2a005f;if(SceneManager[_0x7c9238(0x630)]())$scene['playOnceParallelInterpreter'](_0x2aa7a8);else{if(SceneManager['isSceneBattle']()){if(Imported['VisuMZ_1_BattleCore'])$scene[_0x7c9238(0x63f)](_0x2aa7a8);else $gameTemp&&$gameTemp['isPlaytest']()&&alert(_0x7c9238(0x691));}else $gameTemp&&$gameTemp['isPlaytest']()&&alert(_0x7c9238(0x2d7));}});;StorageManager[_0x2a005f(0x627)]=function(_0x58de24){return new Promise((_0x1914b0,_0x4a3fe9)=>{const _0x5f2b2c=_0xeff9;try{const _0x5c17aa=pako['deflate'](_0x58de24,{'to':_0x5f2b2c(0x4a2),'level':0x1});if(_0x5c17aa['length']>=0xc350){}_0x1914b0(_0x5c17aa);}catch(_0x321895){_0x4a3fe9(_0x321895);}});},TextManager[_0x2a005f(0x7f7)]=['','','',_0x2a005f(0x6ee),'','',_0x2a005f(0x2dd),'',_0x2a005f(0x36e),'TAB','','','CLEAR',_0x2a005f(0x570),_0x2a005f(0x613),'',_0x2a005f(0x3d9),_0x2a005f(0x737),'ALT',_0x2a005f(0x802),_0x2a005f(0x3a1),'KANA',_0x2a005f(0x71e),_0x2a005f(0x19c),_0x2a005f(0x51e),_0x2a005f(0x71d),'',_0x2a005f(0x51f),'CONVERT',_0x2a005f(0x283),'ACCEPT','MODECHANGE',_0x2a005f(0x396),_0x2a005f(0x57c),_0x2a005f(0x77e),_0x2a005f(0x25d),'HOME',_0x2a005f(0x60f),'UP','RIGHT',_0x2a005f(0x303),_0x2a005f(0x860),_0x2a005f(0x886),_0x2a005f(0x7d2),_0x2a005f(0x808),_0x2a005f(0x750),_0x2a005f(0x767),'','0','1','2','3','4','5','6','7','8','9','COLON','SEMICOLON',_0x2a005f(0x2e2),_0x2a005f(0x6b1),_0x2a005f(0x801),_0x2a005f(0x358),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x2a005f(0x756),'',_0x2a005f(0x7f2),'',_0x2a005f(0x52f),'NUMPAD0','NUMPAD1',_0x2a005f(0x651),_0x2a005f(0x6aa),'NUMPAD4',_0x2a005f(0x728),'NUMPAD6',_0x2a005f(0x84d),_0x2a005f(0x81c),'NUMPAD9','MULTIPLY',_0x2a005f(0x24e),_0x2a005f(0x3e9),_0x2a005f(0x1c4),'DECIMAL',_0x2a005f(0x3f2),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x2a005f(0x258),'F12','F13',_0x2a005f(0x81e),'F15',_0x2a005f(0x208),_0x2a005f(0x334),'F18',_0x2a005f(0x89d),_0x2a005f(0x742),_0x2a005f(0x292),'F22',_0x2a005f(0x2af),_0x2a005f(0x50a),'','','','','','','','',_0x2a005f(0x2a4),_0x2a005f(0x346),_0x2a005f(0x21d),_0x2a005f(0x7aa),_0x2a005f(0x566),'WIN_OEM_FJ_LOYA',_0x2a005f(0x399),'','','','','','','','','','CIRCUMFLEX','EXCLAMATION','DOUBLE_QUOTE',_0x2a005f(0x6de),'DOLLAR','PERCENT',_0x2a005f(0x22b),_0x2a005f(0x37b),_0x2a005f(0x611),'CLOSE_PAREN',_0x2a005f(0x6c0),_0x2a005f(0x3b6),'PIPE',_0x2a005f(0x635),'OPEN_CURLY_BRACKET',_0x2a005f(0x6cf),_0x2a005f(0x28c),'','','','',_0x2a005f(0x6d1),'VOLUME_DOWN','VOLUME_UP','','','SEMICOLON',_0x2a005f(0x6b1),_0x2a005f(0x76e),_0x2a005f(0x4c3),'PERIOD',_0x2a005f(0x1e8),_0x2a005f(0x2bf),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x2a005f(0x5c2),_0x2a005f(0x2e8),'CLOSE_BRACKET',_0x2a005f(0x52b),'',_0x2a005f(0x5db),'ALTGR','',_0x2a005f(0x74e),_0x2a005f(0x3b9),'',_0x2a005f(0x687),'','',_0x2a005f(0x7a3),_0x2a005f(0x659),_0x2a005f(0x280),_0x2a005f(0x6c7),_0x2a005f(0x1d8),_0x2a005f(0x656),_0x2a005f(0x709),_0x2a005f(0x5c5),_0x2a005f(0x4a8),_0x2a005f(0x711),'WIN_OEM_AUTO',_0x2a005f(0x227),_0x2a005f(0x871),_0x2a005f(0x724),_0x2a005f(0x735),_0x2a005f(0x24d),_0x2a005f(0x6a2),_0x2a005f(0x7f8),_0x2a005f(0x422),'','PA1',_0x2a005f(0x524),''],TextManager[_0x2a005f(0x87e)]=VisuMZ[_0x2a005f(0x63d)]['Settings'][_0x2a005f(0x205)]['OkText'],TextManager['buttonAssistCancel']=VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x52e)][_0x2a005f(0x205)][_0x2a005f(0x301)],TextManager[_0x2a005f(0x5b0)]=VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x52e)][_0x2a005f(0x205)][_0x2a005f(0x43b)],VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x47a)]=TextManager[_0x2a005f(0x642)],TextManager[_0x2a005f(0x642)]=function(_0x258a0c){const _0x35484e=_0x2a005f;return typeof _0x258a0c===_0x35484e(0x4bc)?VisuMZ['CoreEngine'][_0x35484e(0x47a)]['call'](this,_0x258a0c):this['paramName'](_0x258a0c);},TextManager[_0x2a005f(0x77c)]=function(_0x1c99cc){const _0x2226b7=_0x2a005f;_0x1c99cc=String(_0x1c99cc||'')[_0x2226b7(0x697)]();const _0x2cfaeb=VisuMZ[_0x2226b7(0x63d)][_0x2226b7(0x52e)][_0x2226b7(0x2ca)];if(_0x1c99cc===_0x2226b7(0x2c0))return $dataSystem['terms']['params'][0x0];if(_0x1c99cc===_0x2226b7(0x3d1))return $dataSystem[_0x2226b7(0x281)][_0x2226b7(0x764)][0x1];if(_0x1c99cc===_0x2226b7(0x79a))return $dataSystem['terms'][_0x2226b7(0x764)][0x2];if(_0x1c99cc==='DEF')return $dataSystem[_0x2226b7(0x281)][_0x2226b7(0x764)][0x3];if(_0x1c99cc===_0x2226b7(0x75e))return $dataSystem[_0x2226b7(0x281)]['params'][0x4];if(_0x1c99cc==='MDF')return $dataSystem[_0x2226b7(0x281)][_0x2226b7(0x764)][0x5];if(_0x1c99cc==='AGI')return $dataSystem[_0x2226b7(0x281)][_0x2226b7(0x764)][0x6];if(_0x1c99cc===_0x2226b7(0x6db))return $dataSystem['terms'][_0x2226b7(0x764)][0x7];if(_0x1c99cc==='HIT')return _0x2cfaeb['XParamVocab0'];if(_0x1c99cc==='EVA')return _0x2cfaeb[_0x2226b7(0x6f7)];if(_0x1c99cc===_0x2226b7(0x3f5))return _0x2cfaeb[_0x2226b7(0x44e)];if(_0x1c99cc==='CEV')return _0x2cfaeb['XParamVocab3'];if(_0x1c99cc==='MEV')return _0x2cfaeb[_0x2226b7(0x26f)];if(_0x1c99cc===_0x2226b7(0x821))return _0x2cfaeb[_0x2226b7(0x536)];if(_0x1c99cc===_0x2226b7(0x5c7))return _0x2cfaeb[_0x2226b7(0x287)];if(_0x1c99cc===_0x2226b7(0x1ce))return _0x2cfaeb[_0x2226b7(0x8d2)];if(_0x1c99cc==='MRG')return _0x2cfaeb['XParamVocab8'];if(_0x1c99cc===_0x2226b7(0x389))return _0x2cfaeb[_0x2226b7(0x1f8)];if(_0x1c99cc===_0x2226b7(0x386))return _0x2cfaeb[_0x2226b7(0x454)];if(_0x1c99cc===_0x2226b7(0x6bd))return _0x2cfaeb[_0x2226b7(0x55d)];if(_0x1c99cc===_0x2226b7(0x7b0))return _0x2cfaeb[_0x2226b7(0x7f3)];if(_0x1c99cc===_0x2226b7(0x39c))return _0x2cfaeb['SParamVocab3'];if(_0x1c99cc==='MCR')return _0x2cfaeb[_0x2226b7(0x639)];if(_0x1c99cc===_0x2226b7(0x6b0))return _0x2cfaeb[_0x2226b7(0x475)];if(_0x1c99cc==='PDR')return _0x2cfaeb['SParamVocab6'];if(_0x1c99cc===_0x2226b7(0x590))return _0x2cfaeb[_0x2226b7(0x40a)];if(_0x1c99cc===_0x2226b7(0x563))return _0x2cfaeb[_0x2226b7(0x77a)];if(_0x1c99cc===_0x2226b7(0x2f0))return _0x2cfaeb[_0x2226b7(0x2d8)];if(VisuMZ[_0x2226b7(0x63d)][_0x2226b7(0x6d5)][_0x1c99cc])return VisuMZ[_0x2226b7(0x63d)][_0x2226b7(0x6d5)][_0x1c99cc];return'';},TextManager[_0x2a005f(0x5bf)]=function(_0x18b184){const _0x424043=_0x2a005f,_0x5488e2=Input[_0x424043(0x6fd)]();return _0x5488e2===_0x424043(0x8d5)?this[_0x424043(0x7fe)](_0x18b184):this['getControllerInputButtonString'](_0x5488e2,_0x18b184);},TextManager[_0x2a005f(0x7fe)]=function(_0x15c41e){const _0x547d24=_0x2a005f;if(_0x15c41e==='cancel')_0x15c41e=_0x547d24(0x65c);if(_0x15c41e===_0x547d24(0x272))_0x15c41e=_0x547d24(0x65c);let _0x14c366=[];for(let _0x32e3f1 in Input[_0x547d24(0x8a9)]){_0x32e3f1=Number(_0x32e3f1);if(_0x32e3f1>=0x60&&_0x32e3f1<=0x69)continue;if([0x12,0x20][_0x547d24(0x34a)](_0x32e3f1))continue;_0x15c41e===Input[_0x547d24(0x8a9)][_0x32e3f1]&&_0x14c366[_0x547d24(0x1fe)](_0x32e3f1);}for(let _0x12df5b=0x0;_0x12df5b<_0x14c366[_0x547d24(0x7c3)];_0x12df5b++){_0x14c366[_0x12df5b]=TextManager[_0x547d24(0x7f7)][_0x14c366[_0x12df5b]];}return this[_0x547d24(0x69f)](_0x14c366);},TextManager['makeInputButtonString']=function(_0x2947a7){const _0x41c349=_0x2a005f,_0xa21dc9=VisuMZ[_0x41c349(0x63d)][_0x41c349(0x52e)][_0x41c349(0x205)],_0x22a805=_0xa21dc9[_0x41c349(0x84b)],_0x109485=_0x2947a7[_0x41c349(0x324)](),_0x5639e8='Key%1'['format'](_0x109485);return _0xa21dc9[_0x5639e8]?_0xa21dc9[_0x5639e8]:_0x22a805[_0x41c349(0x594)](_0x109485);},TextManager['getInputMultiButtonStrings']=function(_0x884f45,_0x2fe36b){const _0x59a977=_0x2a005f,_0x3d93d9=VisuMZ[_0x59a977(0x63d)][_0x59a977(0x52e)][_0x59a977(0x205)],_0x3d5b97=_0x3d93d9[_0x59a977(0x8ad)],_0x19cf4a=this[_0x59a977(0x5bf)](_0x884f45),_0x6f6410=this['getInputButtonString'](_0x2fe36b);return _0x3d5b97['format'](_0x19cf4a,_0x6f6410);},TextManager['getControllerInputButtonString']=function(_0x1afc20,_0x41a1ed){const _0x533eae=_0x2a005f,_0x58e076=_0x1afc20[_0x533eae(0x3b8)]()[_0x533eae(0x440)](),_0x43c2c8=VisuMZ['CoreEngine'][_0x533eae(0x30d)][_0x58e076];if(!_0x43c2c8)return this[_0x533eae(0x242)](_0x1afc20,_0x41a1ed);return _0x43c2c8[_0x41a1ed]||this[_0x533eae(0x7fe)](_0x1afc20,_0x41a1ed);},TextManager[_0x2a005f(0x242)]=function(_0x875a2b,_0x2ea191){const _0x20d9d5=_0x2a005f,_0x3fa004=_0x875a2b[_0x20d9d5(0x3b8)]()['trim']();for(const _0x1456fc in VisuMZ[_0x20d9d5(0x63d)][_0x20d9d5(0x89f)]){if(_0x3fa004[_0x20d9d5(0x34a)](_0x1456fc)){const _0x4fcf47=VisuMZ[_0x20d9d5(0x63d)][_0x20d9d5(0x89f)][_0x1456fc],_0xd0d7ce=VisuMZ[_0x20d9d5(0x63d)]['ControllerButtons'][_0x4fcf47];return _0xd0d7ce[_0x2ea191]||this[_0x20d9d5(0x7fe)](_0x2ea191);}}return this['getKeyboardInputButtonString'](_0x2ea191);},VisuMZ[_0x2a005f(0x63d)]['ColorManager_loadWindowskin']=ColorManager[_0x2a005f(0x21c)],ColorManager[_0x2a005f(0x21c)]=function(){const _0xe900bb=_0x2a005f;VisuMZ['CoreEngine']['ColorManager_loadWindowskin'][_0xe900bb(0x873)](this),this[_0xe900bb(0x503)]=this[_0xe900bb(0x503)]||{};},ColorManager['getColorDataFromPluginParameters']=function(_0x49ec0d,_0x3169cb){const _0x379a5c=_0x2a005f;return _0x3169cb=String(_0x3169cb),this[_0x379a5c(0x503)]=this[_0x379a5c(0x503)]||{},_0x3169cb[_0x379a5c(0x37e)](/#(.*)/i)?this['_colorCache'][_0x49ec0d]=_0x379a5c(0x891)[_0x379a5c(0x594)](String(RegExp['$1'])):this['_colorCache'][_0x49ec0d]=this[_0x379a5c(0x85b)](Number(_0x3169cb)),this[_0x379a5c(0x503)][_0x49ec0d];},ColorManager['getColor']=function(_0x3beb26){const _0x1a8c75=_0x2a005f;return _0x3beb26=String(_0x3beb26),_0x3beb26[_0x1a8c75(0x37e)](/#(.*)/i)?_0x1a8c75(0x891)['format'](String(RegExp['$1'])):this[_0x1a8c75(0x85b)](Number(_0x3beb26));},ColorManager[_0x2a005f(0x64a)]=function(){const _0x472026=_0x2a005f;this[_0x472026(0x503)]={};},ColorManager[_0x2a005f(0x43f)]=function(){const _0x2203cb=_0x2a005f,_0x4ab1c0=_0x2203cb(0x4be);this[_0x2203cb(0x503)]=this['_colorCache']||{};if(this['_colorCache'][_0x4ab1c0])return this[_0x2203cb(0x503)][_0x4ab1c0];const _0x3f932f=VisuMZ[_0x2203cb(0x63d)][_0x2203cb(0x52e)][_0x2203cb(0x214)][_0x2203cb(0x327)];return this[_0x2203cb(0x336)](_0x4ab1c0,_0x3f932f);},ColorManager[_0x2a005f(0x7ee)]=function(){const _0x136ba6=_0x2a005f,_0x7c8ce7=_0x136ba6(0x499);this[_0x136ba6(0x503)]=this[_0x136ba6(0x503)]||{};if(this[_0x136ba6(0x503)][_0x7c8ce7])return this[_0x136ba6(0x503)][_0x7c8ce7];const _0x23d08e=VisuMZ[_0x136ba6(0x63d)][_0x136ba6(0x52e)][_0x136ba6(0x214)][_0x136ba6(0x337)];return this[_0x136ba6(0x336)](_0x7c8ce7,_0x23d08e);},ColorManager[_0x2a005f(0x463)]=function(){const _0x205ec9=_0x2a005f,_0x57eb26='_stored_crisisColor';this[_0x205ec9(0x503)]=this[_0x205ec9(0x503)]||{};if(this[_0x205ec9(0x503)][_0x57eb26])return this[_0x205ec9(0x503)][_0x57eb26];const _0x4f4676=VisuMZ[_0x205ec9(0x63d)]['Settings']['Color'][_0x205ec9(0x198)];return this[_0x205ec9(0x336)](_0x57eb26,_0x4f4676);},ColorManager[_0x2a005f(0x7ec)]=function(){const _0x2e43a7=_0x2a005f,_0x1b3998=_0x2e43a7(0x414);this[_0x2e43a7(0x503)]=this[_0x2e43a7(0x503)]||{};if(this['_colorCache'][_0x1b3998])return this[_0x2e43a7(0x503)][_0x1b3998];const _0x392786=VisuMZ[_0x2e43a7(0x63d)][_0x2e43a7(0x52e)][_0x2e43a7(0x214)][_0x2e43a7(0x28b)];return this[_0x2e43a7(0x336)](_0x1b3998,_0x392786);},ColorManager[_0x2a005f(0x734)]=function(){const _0x523ac7=_0x2a005f,_0x3b9c99=_0x523ac7(0x4ea);this[_0x523ac7(0x503)]=this[_0x523ac7(0x503)]||{};if(this[_0x523ac7(0x503)][_0x3b9c99])return this[_0x523ac7(0x503)][_0x3b9c99];const _0x25052a=VisuMZ[_0x523ac7(0x63d)][_0x523ac7(0x52e)][_0x523ac7(0x214)][_0x523ac7(0x224)];return this[_0x523ac7(0x336)](_0x3b9c99,_0x25052a);},ColorManager['hpGaugeColor1']=function(){const _0x2d4f94=_0x2a005f,_0x26b122=_0x2d4f94(0x660);this[_0x2d4f94(0x503)]=this[_0x2d4f94(0x503)]||{};if(this['_colorCache'][_0x26b122])return this[_0x2d4f94(0x503)][_0x26b122];const _0x57ef59=VisuMZ[_0x2d4f94(0x63d)][_0x2d4f94(0x52e)]['Color'][_0x2d4f94(0x40c)];return this[_0x2d4f94(0x336)](_0x26b122,_0x57ef59);},ColorManager[_0x2a005f(0x732)]=function(){const _0x30d01e=_0x2a005f,_0xccce73=_0x30d01e(0x30a);this[_0x30d01e(0x503)]=this['_colorCache']||{};if(this[_0x30d01e(0x503)][_0xccce73])return this[_0x30d01e(0x503)][_0xccce73];const _0x3e9b4d=VisuMZ[_0x30d01e(0x63d)][_0x30d01e(0x52e)][_0x30d01e(0x214)][_0x30d01e(0x4fd)];return this[_0x30d01e(0x336)](_0xccce73,_0x3e9b4d);},ColorManager[_0x2a005f(0x2e5)]=function(){const _0x39cb6a=_0x2a005f,_0x4ff9fb='_stored_mpGaugeColor1';this['_colorCache']=this[_0x39cb6a(0x503)]||{};if(this['_colorCache'][_0x4ff9fb])return this[_0x39cb6a(0x503)][_0x4ff9fb];const _0x542eb2=VisuMZ[_0x39cb6a(0x63d)][_0x39cb6a(0x52e)][_0x39cb6a(0x214)][_0x39cb6a(0x84e)];return this[_0x39cb6a(0x336)](_0x4ff9fb,_0x542eb2);},ColorManager[_0x2a005f(0x51c)]=function(){const _0x279d1b=_0x2a005f,_0x48b267=_0x279d1b(0x599);this[_0x279d1b(0x503)]=this[_0x279d1b(0x503)]||{};if(this[_0x279d1b(0x503)][_0x48b267])return this[_0x279d1b(0x503)][_0x48b267];const _0x32c711=VisuMZ[_0x279d1b(0x63d)][_0x279d1b(0x52e)]['Color'][_0x279d1b(0x745)];return this['getColorDataFromPluginParameters'](_0x48b267,_0x32c711);},ColorManager['mpCostColor']=function(){const _0x2f2889=_0x2a005f,_0x126560=_0x2f2889(0x2c6);this[_0x2f2889(0x503)]=this[_0x2f2889(0x503)]||{};if(this['_colorCache'][_0x126560])return this['_colorCache'][_0x126560];const _0x551ca7=VisuMZ['CoreEngine'][_0x2f2889(0x52e)][_0x2f2889(0x214)][_0x2f2889(0x5b6)];return this['getColorDataFromPluginParameters'](_0x126560,_0x551ca7);},ColorManager['powerUpColor']=function(){const _0x20cba6=_0x2a005f,_0x4e3072=_0x20cba6(0x898);this[_0x20cba6(0x503)]=this['_colorCache']||{};if(this[_0x20cba6(0x503)][_0x4e3072])return this[_0x20cba6(0x503)][_0x4e3072];const _0x2d83cb=VisuMZ[_0x20cba6(0x63d)][_0x20cba6(0x52e)][_0x20cba6(0x214)][_0x20cba6(0x2f2)];return this['getColorDataFromPluginParameters'](_0x4e3072,_0x2d83cb);},ColorManager[_0x2a005f(0x1ab)]=function(){const _0x318e55=_0x2a005f,_0x205254=_0x318e55(0x869);this[_0x318e55(0x503)]=this[_0x318e55(0x503)]||{};if(this['_colorCache'][_0x205254])return this[_0x318e55(0x503)][_0x205254];const _0x34214e=VisuMZ[_0x318e55(0x63d)][_0x318e55(0x52e)][_0x318e55(0x214)][_0x318e55(0x7e7)];return this[_0x318e55(0x336)](_0x205254,_0x34214e);},ColorManager[_0x2a005f(0x632)]=function(){const _0x5b2491=_0x2a005f,_0x2bc6a7='_stored_ctGaugeColor1';this[_0x5b2491(0x503)]=this[_0x5b2491(0x503)]||{};if(this['_colorCache'][_0x2bc6a7])return this[_0x5b2491(0x503)][_0x2bc6a7];const _0x43ab2b=VisuMZ[_0x5b2491(0x63d)][_0x5b2491(0x52e)][_0x5b2491(0x214)][_0x5b2491(0x775)];return this['getColorDataFromPluginParameters'](_0x2bc6a7,_0x43ab2b);},ColorManager['ctGaugeColor2']=function(){const _0x1bb73f=_0x2a005f,_0x53deab='_stored_ctGaugeColor2';this[_0x1bb73f(0x503)]=this[_0x1bb73f(0x503)]||{};if(this['_colorCache'][_0x53deab])return this[_0x1bb73f(0x503)][_0x53deab];const _0x7dcba3=VisuMZ['CoreEngine'][_0x1bb73f(0x52e)]['Color'][_0x1bb73f(0x4cf)];return this[_0x1bb73f(0x336)](_0x53deab,_0x7dcba3);},ColorManager['tpGaugeColor1']=function(){const _0x58916f=_0x2a005f,_0x3389f7='_stored_tpGaugeColor1';this[_0x58916f(0x503)]=this[_0x58916f(0x503)]||{};if(this[_0x58916f(0x503)][_0x3389f7])return this[_0x58916f(0x503)][_0x3389f7];const _0x15adb2=VisuMZ[_0x58916f(0x63d)][_0x58916f(0x52e)][_0x58916f(0x214)][_0x58916f(0x62d)];return this[_0x58916f(0x336)](_0x3389f7,_0x15adb2);},ColorManager[_0x2a005f(0x517)]=function(){const _0x89fe9c=_0x2a005f,_0x460b4a=_0x89fe9c(0x4c4);this['_colorCache']=this[_0x89fe9c(0x503)]||{};if(this[_0x89fe9c(0x503)][_0x460b4a])return this[_0x89fe9c(0x503)][_0x460b4a];const _0x5ea507=VisuMZ[_0x89fe9c(0x63d)][_0x89fe9c(0x52e)][_0x89fe9c(0x214)][_0x89fe9c(0x299)];return this[_0x89fe9c(0x336)](_0x460b4a,_0x5ea507);},ColorManager['tpCostColor']=function(){const _0x35238b=_0x2a005f,_0x372c73='_stored_tpCostColor';this[_0x35238b(0x503)]=this[_0x35238b(0x503)]||{};if(this['_colorCache'][_0x372c73])return this[_0x35238b(0x503)][_0x372c73];const _0x2ace4d=VisuMZ['CoreEngine'][_0x35238b(0x52e)]['Color']['ColorTPCost'];return this['getColorDataFromPluginParameters'](_0x372c73,_0x2ace4d);},ColorManager['pendingColor']=function(){const _0x46496f=_0x2a005f,_0x1e029=_0x46496f(0x6e7);this[_0x46496f(0x503)]=this[_0x46496f(0x503)]||{};if(this[_0x46496f(0x503)][_0x1e029])return this[_0x46496f(0x503)][_0x1e029];const _0xc7805f=VisuMZ['CoreEngine']['Settings']['Color'][_0x46496f(0x784)];return this[_0x46496f(0x336)](_0x1e029,_0xc7805f);},ColorManager[_0x2a005f(0x6f8)]=function(){const _0x391f51=_0x2a005f,_0x585f47=_0x391f51(0x817);this[_0x391f51(0x503)]=this['_colorCache']||{};if(this[_0x391f51(0x503)][_0x585f47])return this[_0x391f51(0x503)][_0x585f47];const _0x41c1b8=VisuMZ[_0x391f51(0x63d)][_0x391f51(0x52e)]['Color'][_0x391f51(0x867)];return this[_0x391f51(0x336)](_0x585f47,_0x41c1b8);},ColorManager['expGaugeColor2']=function(){const _0x106aaa=_0x2a005f,_0x5249e1=_0x106aaa(0x5fe);this[_0x106aaa(0x503)]=this[_0x106aaa(0x503)]||{};if(this[_0x106aaa(0x503)][_0x5249e1])return this[_0x106aaa(0x503)][_0x5249e1];const _0x888d16=VisuMZ['CoreEngine']['Settings'][_0x106aaa(0x214)][_0x106aaa(0x675)];return this[_0x106aaa(0x336)](_0x5249e1,_0x888d16);},ColorManager[_0x2a005f(0x243)]=function(){const _0x8bb38=_0x2a005f,_0x4f6738=_0x8bb38(0x433);this[_0x8bb38(0x503)]=this[_0x8bb38(0x503)]||{};if(this[_0x8bb38(0x503)][_0x4f6738])return this['_colorCache'][_0x4f6738];const _0x2ecc9e=VisuMZ[_0x8bb38(0x63d)][_0x8bb38(0x52e)][_0x8bb38(0x214)][_0x8bb38(0x661)];return this['getColorDataFromPluginParameters'](_0x4f6738,_0x2ecc9e);},ColorManager['maxLvGaugeColor2']=function(){const _0x330aa3=_0x2a005f,_0x51756f=_0x330aa3(0x6a6);this[_0x330aa3(0x503)]=this[_0x330aa3(0x503)]||{};if(this['_colorCache'][_0x51756f])return this[_0x330aa3(0x503)][_0x51756f];const _0x3b5968=VisuMZ[_0x330aa3(0x63d)][_0x330aa3(0x52e)][_0x330aa3(0x214)][_0x330aa3(0x447)];return this[_0x330aa3(0x336)](_0x51756f,_0x3b5968);},ColorManager[_0x2a005f(0x319)]=function(_0x458a34){const _0x7d15a0=_0x2a005f;return VisuMZ['CoreEngine'][_0x7d15a0(0x52e)][_0x7d15a0(0x214)][_0x7d15a0(0x5eb)]['call'](this,_0x458a34);},ColorManager[_0x2a005f(0x6ac)]=function(_0x1fca91){const _0x22d49e=_0x2a005f;return VisuMZ['CoreEngine'][_0x22d49e(0x52e)][_0x22d49e(0x214)][_0x22d49e(0x7b8)][_0x22d49e(0x873)](this,_0x1fca91);},ColorManager[_0x2a005f(0x887)]=function(_0x390d88){const _0x37f235=_0x2a005f;return VisuMZ['CoreEngine'][_0x37f235(0x52e)]['Color'][_0x37f235(0x495)][_0x37f235(0x873)](this,_0x390d88);},ColorManager[_0x2a005f(0x74f)]=function(_0x2bd53f){const _0x2f5e97=_0x2a005f;return VisuMZ[_0x2f5e97(0x63d)][_0x2f5e97(0x52e)]['Color'][_0x2f5e97(0x1ed)]['call'](this,_0x2bd53f);},ColorManager['damageColor']=function(_0x2e4d44){const _0x1ac6a3=_0x2a005f;return VisuMZ[_0x1ac6a3(0x63d)][_0x1ac6a3(0x52e)]['Color'][_0x1ac6a3(0x3b7)][_0x1ac6a3(0x873)](this,_0x2e4d44);},ColorManager['outlineColor']=function(){const _0x5d0222=_0x2a005f;return VisuMZ['CoreEngine'][_0x5d0222(0x52e)][_0x5d0222(0x214)]['OutlineColor'];},ColorManager['outlineColorDmg']=function(){const _0x1c778f=_0x2a005f;return VisuMZ[_0x1c778f(0x63d)]['Settings'][_0x1c778f(0x214)]['OutlineColorDmg']||_0x1c778f(0x4e8);},ColorManager['outlineColorGauge']=function(){const _0x402859=_0x2a005f;return VisuMZ[_0x402859(0x63d)][_0x402859(0x52e)][_0x402859(0x214)][_0x402859(0x6e1)]||'rgba(0,\x200,\x200,\x201.0)';},ColorManager['dimColor1']=function(){const _0x2946b0=_0x2a005f;return VisuMZ[_0x2946b0(0x63d)][_0x2946b0(0x52e)][_0x2946b0(0x214)]['DimColor1'];},ColorManager[_0x2a005f(0x614)]=function(){const _0xd0177=_0x2a005f;return VisuMZ[_0xd0177(0x63d)][_0xd0177(0x52e)][_0xd0177(0x214)][_0xd0177(0x872)];},ColorManager[_0x2a005f(0x1b1)]=function(){const _0x26a21f=_0x2a005f;return VisuMZ[_0x26a21f(0x63d)]['Settings']['Color'][_0x26a21f(0x65b)];},ColorManager[_0x2a005f(0x1c9)]=function(){const _0x4c9e33=_0x2a005f;return VisuMZ[_0x4c9e33(0x63d)]['Settings']['Color'][_0x4c9e33(0x207)];},SceneManager[_0x2a005f(0x1ca)]=[],SceneManager[_0x2a005f(0x4e2)]=function(){const _0x1270d4=_0x2a005f;return this['_scene']&&this[_0x1270d4(0x458)][_0x1270d4(0x2bc)]===Scene_Battle;},SceneManager[_0x2a005f(0x630)]=function(){const _0x1bdfc1=_0x2a005f;return this[_0x1bdfc1(0x458)]&&this['_scene'][_0x1bdfc1(0x2bc)]===Scene_Map;},SceneManager[_0x2a005f(0x45e)]=function(){const _0x5ad1ed=_0x2a005f;return this[_0x5ad1ed(0x458)]&&this[_0x5ad1ed(0x458)]instanceof Scene_Map;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x8a5)]=SceneManager['initialize'],SceneManager[_0x2a005f(0x72f)]=function(){const _0x45f787=_0x2a005f;VisuMZ['CoreEngine'][_0x45f787(0x8a5)][_0x45f787(0x873)](this),this[_0x45f787(0x7dc)]();},VisuMZ[_0x2a005f(0x63d)]['SceneManager_onKeyDown']=SceneManager['onKeyDown'],SceneManager[_0x2a005f(0x246)]=function(_0x83c1a){const _0x4aabac=_0x2a005f;if($gameTemp)this['onKeyDownKeysF6F7'](_0x83c1a);VisuMZ['CoreEngine'][_0x4aabac(0x1f7)][_0x4aabac(0x873)](this,_0x83c1a);},SceneManager[_0x2a005f(0x279)]=function(_0x35bb5b){const _0x1e8001=_0x2a005f;if(!_0x35bb5b[_0x1e8001(0x2dc)]&&!_0x35bb5b[_0x1e8001(0x5ec)])switch(_0x35bb5b[_0x1e8001(0x347)]){case 0x54:this[_0x1e8001(0x72c)]();break;case 0x75:this[_0x1e8001(0x631)]();break;case 0x76:if(Input[_0x1e8001(0x2ee)]('shift')||Input[_0x1e8001(0x2ee)](_0x1e8001(0x5fa)))return;this[_0x1e8001(0x446)]();break;}},SceneManager['playTestF6']=function(){const _0x58dbe0=_0x2a005f;if($gameTemp[_0x58dbe0(0x7c6)]()&&VisuMZ['CoreEngine'][_0x58dbe0(0x52e)][_0x58dbe0(0x213)][_0x58dbe0(0x597)]){ConfigManager['seVolume']!==0x0?(ConfigManager[_0x58dbe0(0x4f6)]=0x0,ConfigManager[_0x58dbe0(0x577)]=0x0,ConfigManager[_0x58dbe0(0x6a1)]=0x0,ConfigManager[_0x58dbe0(0x30b)]=0x0):(ConfigManager[_0x58dbe0(0x4f6)]=0x64,ConfigManager[_0x58dbe0(0x577)]=0x64,ConfigManager['meVolume']=0x64,ConfigManager[_0x58dbe0(0x30b)]=0x64);ConfigManager['save']();if(this[_0x58dbe0(0x458)][_0x58dbe0(0x2bc)]===Scene_Options){if(this[_0x58dbe0(0x458)][_0x58dbe0(0x3db)])this[_0x58dbe0(0x458)][_0x58dbe0(0x3db)][_0x58dbe0(0x32a)]();if(this[_0x58dbe0(0x458)]['_listWindow'])this[_0x58dbe0(0x458)][_0x58dbe0(0x4d5)][_0x58dbe0(0x32a)]();}}},SceneManager[_0x2a005f(0x446)]=function(){const _0x41f491=_0x2a005f;$gameTemp[_0x41f491(0x7c6)]()&&VisuMZ['CoreEngine'][_0x41f491(0x52e)][_0x41f491(0x213)][_0x41f491(0x544)]&&($gameTemp['_playTestFastMode']=!$gameTemp[_0x41f491(0x365)]);},SceneManager['playTestCtrlT']=function(){const _0x4c48ec=_0x2a005f;if(!$gameTemp['isPlaytest']())return;if(!SceneManager[_0x4c48ec(0x4e2)]())return;for(const _0x5e4ab7 of $gameParty[_0x4c48ec(0x754)]()){if(!_0x5e4ab7)continue;_0x5e4ab7[_0x4c48ec(0x723)](_0x5e4ab7[_0x4c48ec(0x528)]());}},SceneManager[_0x2a005f(0x7dc)]=function(){const _0x2627b0=_0x2a005f;this[_0x2627b0(0x3a5)]=![],this[_0x2627b0(0x34b)]=!VisuMZ[_0x2627b0(0x63d)][_0x2627b0(0x52e)]['UI'][_0x2627b0(0x465)];},SceneManager[_0x2a005f(0x715)]=function(_0x52e002){const _0x27949f=_0x2a005f;VisuMZ[_0x27949f(0x63d)][_0x27949f(0x52e)]['UI']['SideButtons']&&(this[_0x27949f(0x3a5)]=_0x52e002);},SceneManager[_0x2a005f(0x3c0)]=function(){return this['_sideButtonLayout'];},SceneManager[_0x2a005f(0x4d2)]=function(){const _0x442455=_0x2a005f;return this[_0x442455(0x34b)];},SceneManager['areButtonsOutsideMainUI']=function(){const _0xab268e=_0x2a005f;return this[_0xab268e(0x4d2)]()||this[_0xab268e(0x3c0)]();},VisuMZ[_0x2a005f(0x63d)]['SceneManager_isGameActive']=SceneManager[_0x2a005f(0x44b)],SceneManager[_0x2a005f(0x44b)]=function(){const _0x471c27=_0x2a005f;return VisuMZ['CoreEngine'][_0x471c27(0x52e)][_0x471c27(0x213)]['RequireFocus']?VisuMZ['CoreEngine'][_0x471c27(0x46b)]['call'](this):!![];},SceneManager[_0x2a005f(0x851)]=function(_0x457041){const _0x43370d=_0x2a005f;if(_0x457041 instanceof Error)this[_0x43370d(0x626)](_0x457041);else _0x457041 instanceof Array&&_0x457041[0x0]==='LoadError'?this[_0x43370d(0x3c7)](_0x457041):this[_0x43370d(0x4dc)](_0x457041);this[_0x43370d(0x35c)]();},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x6f1)]=BattleManager['processEscape'],BattleManager[_0x2a005f(0x78c)]=function(){const _0x18609f=_0x2a005f;return VisuMZ[_0x18609f(0x63d)][_0x18609f(0x52e)][_0x18609f(0x213)][_0x18609f(0x1b3)]?this[_0x18609f(0x501)]():VisuMZ[_0x18609f(0x63d)][_0x18609f(0x6f1)][_0x18609f(0x873)](this);},BattleManager['processAlwaysEscape']=function(){const _0x838d37=_0x2a005f;return $gameParty[_0x838d37(0x6bb)](),SoundManager[_0x838d37(0x7e1)](),this[_0x838d37(0x27d)](),!![];},BattleManager[_0x2a005f(0x289)]=function(){const _0x1e3733=_0x2a005f;return $gameSystem[_0x1e3733(0x16d)]()>=0x1;},BattleManager[_0x2a005f(0x5ed)]=function(){return $gameSystem['getBattleSystem']()===0x1;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x573)]=Game_Temp[_0x2a005f(0x7d8)][_0x2a005f(0x72f)],Game_Temp[_0x2a005f(0x7d8)][_0x2a005f(0x72f)]=function(){const _0x27e6b8=_0x2a005f;VisuMZ[_0x27e6b8(0x63d)][_0x27e6b8(0x573)][_0x27e6b8(0x873)](this),this[_0x27e6b8(0x4f1)](),this[_0x27e6b8(0x218)](),this[_0x27e6b8(0x256)]();},Game_Temp['prototype'][_0x2a005f(0x4f1)]=function(){const _0x23696a=_0x2a005f;VisuMZ['CoreEngine'][_0x23696a(0x52e)]['QoL'][_0x23696a(0x4af)]&&(this[_0x23696a(0x3de)]=![]);},Game_Temp['prototype'][_0x2a005f(0x2f3)]=function(_0x46e61f){const _0x52251f=_0x2a005f;this[_0x52251f(0x54b)]=_0x46e61f;},Game_Temp[_0x2a005f(0x7d8)]['getLastPluginCommandInterpreter']=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x2a005f(0x7d8)][_0x2a005f(0x625)]=function(){const _0x240f27=_0x2a005f;this[_0x240f27(0x67d)]=undefined,this[_0x240f27(0x878)]=undefined;},Game_Temp['prototype'][_0x2a005f(0x252)]=function(_0x28f12a){const _0x2b2d2a=_0x2a005f;$gameMap&&$dataMap&&$dataMap['note']&&this[_0x2b2d2a(0x8c2)]($dataMap[_0x2b2d2a(0x6d3)]);const _0x4caac9=$dataTroops[_0x28f12a];if(_0x4caac9){let _0x34d09f=DataManager['createTroopNote'](_0x4caac9['id']);this[_0x2b2d2a(0x8c2)](_0x34d09f);}},Game_Temp['prototype']['parseForcedGameTroopSettingsCoreEngine']=function(_0x53264a){const _0x3325b1=_0x2a005f;if(!_0x53264a)return;if(_0x53264a['match'](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x3325b1(0x67d)]='FV';else{if(_0x53264a['match'](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x3325b1(0x67d)]='SV';else{if(_0x53264a[_0x3325b1(0x37e)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x14ff6f=String(RegExp['$1']);if(_0x14ff6f[_0x3325b1(0x37e)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x3325b1(0x67d)]='FV';else _0x14ff6f[_0x3325b1(0x37e)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x3325b1(0x67d)]='SV');}}}if(_0x53264a[_0x3325b1(0x37e)](/<(?:DTB)>/i))this[_0x3325b1(0x878)]=0x0;else{if(_0x53264a[_0x3325b1(0x37e)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x3325b1(0x878)]=0x1;else{if(_0x53264a[_0x3325b1(0x37e)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x3325b1(0x878)]=0x2;else{if(_0x53264a[_0x3325b1(0x37e)](/<(?:CTB)>/i))Imported[_0x3325b1(0x7b4)]&&(this[_0x3325b1(0x878)]=_0x3325b1(0x85c));else{if(_0x53264a[_0x3325b1(0x37e)](/<(?:STB)>/i))Imported[_0x3325b1(0x87a)]&&(this['_forcedBattleSys']=_0x3325b1(0x315));else{if(_0x53264a['match'](/<(?:BTB)>/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this[_0x3325b1(0x878)]=_0x3325b1(0x3f7));else{if(_0x53264a[_0x3325b1(0x37e)](/<(?:FTB)>/i))Imported[_0x3325b1(0x28f)]&&(this[_0x3325b1(0x878)]=_0x3325b1(0x579));else{if(_0x53264a[_0x3325b1(0x37e)](/<(?:OTB)>/i))Imported[_0x3325b1(0x7b3)]&&(this['_forcedBattleSys']=_0x3325b1(0x4ca));else{if(_0x53264a[_0x3325b1(0x37e)](/<(?:ETB)>/i))Imported[_0x3325b1(0x89b)]&&(this[_0x3325b1(0x878)]=_0x3325b1(0x895));else{if(_0x53264a[_0x3325b1(0x37e)](/<(?:PTB)>/i))Imported[_0x3325b1(0x5f3)]&&(this[_0x3325b1(0x878)]='PTB');else{if(_0x53264a['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x1ebaf6=String(RegExp['$1']);if(_0x1ebaf6['match'](/DTB/i))this[_0x3325b1(0x878)]=0x0;else{if(_0x1ebaf6[_0x3325b1(0x37e)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x3325b1(0x878)]=0x1;else{if(_0x1ebaf6[_0x3325b1(0x37e)](/(?:TPB|ATB)[ ]WAIT/i))this['_forcedBattleSys']=0x2;else{if(_0x1ebaf6[_0x3325b1(0x37e)](/CTB/i))Imported[_0x3325b1(0x7b4)]&&(this[_0x3325b1(0x878)]=_0x3325b1(0x85c));else{if(_0x1ebaf6[_0x3325b1(0x37e)](/STB/i))Imported[_0x3325b1(0x87a)]&&(this[_0x3325b1(0x878)]=_0x3325b1(0x315));else{if(_0x1ebaf6[_0x3325b1(0x37e)](/BTB/i))Imported[_0x3325b1(0x6fe)]&&(this[_0x3325b1(0x878)]='BTB');else{if(_0x1ebaf6[_0x3325b1(0x37e)](/FTB/i))Imported[_0x3325b1(0x28f)]&&(this['_forcedBattleSys']='FTB');else{if(_0x1ebaf6['match'](/OTB/i))Imported[_0x3325b1(0x7b3)]&&(this[_0x3325b1(0x878)]='OTB');else{if(_0x1ebaf6[_0x3325b1(0x37e)](/ETB/i))Imported[_0x3325b1(0x89b)]&&(this[_0x3325b1(0x878)]=_0x3325b1(0x895));else _0x1ebaf6[_0x3325b1(0x37e)](/PTB/i)&&(Imported[_0x3325b1(0x5f3)]&&(this[_0x3325b1(0x878)]=_0x3325b1(0x791)));}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x2a005f(0x7d8)][_0x2a005f(0x218)]=function(){const _0x433fc7=_0x2a005f;this[_0x433fc7(0x223)]=[];},Game_Temp[_0x2a005f(0x7d8)]['requestFauxAnimation']=function(_0x3013f0,_0x5049fa,_0x28670c,_0x6e104e){const _0x2d1bf9=_0x2a005f;if(!this['showFauxAnimations']())return;_0x28670c=_0x28670c||![],_0x6e104e=_0x6e104e||![];if($dataAnimations[_0x5049fa]){const _0xfdef01={'targets':_0x3013f0,'animationId':_0x5049fa,'mirror':_0x28670c,'mute':_0x6e104e};this[_0x2d1bf9(0x223)][_0x2d1bf9(0x1fe)](_0xfdef01);for(const _0x204f13 of _0x3013f0){_0x204f13[_0x2d1bf9(0x44a)]&&_0x204f13[_0x2d1bf9(0x44a)]();}}},Game_Temp[_0x2a005f(0x7d8)]['showFauxAnimations']=function(){return!![];},Game_Temp[_0x2a005f(0x7d8)][_0x2a005f(0x412)]=function(){const _0x270265=_0x2a005f;return this[_0x270265(0x223)][_0x270265(0x7c7)]();},Game_Temp[_0x2a005f(0x7d8)][_0x2a005f(0x256)]=function(){const _0x1cdc2e=_0x2a005f;this[_0x1cdc2e(0x249)]=[];},Game_Temp['prototype'][_0x2a005f(0x604)]=function(_0x4c8867,_0x22fa56,_0x1c8c9b,_0x4430a5,_0x2076bc){const _0x565bcb=_0x2a005f;if(!this[_0x565bcb(0x39e)]())return;_0x4430a5=_0x4430a5||![],_0x2076bc=_0x2076bc||![];if($dataAnimations[_0x1c8c9b]){const _0x38cc13={'x':_0x4c8867,'y':_0x22fa56,'animationId':_0x1c8c9b,'mirror':_0x4430a5,'mute':_0x2076bc};this[_0x565bcb(0x249)]['push'](_0x38cc13);}},Game_Temp[_0x2a005f(0x7d8)][_0x2a005f(0x39e)]=function(){return!![];},Game_Temp[_0x2a005f(0x7d8)][_0x2a005f(0x28a)]=function(){const _0x3927d8=_0x2a005f;return this[_0x3927d8(0x249)][_0x3927d8(0x7c7)]();},VisuMZ['CoreEngine'][_0x2a005f(0x375)]=Game_System[_0x2a005f(0x7d8)][_0x2a005f(0x72f)],Game_System[_0x2a005f(0x7d8)][_0x2a005f(0x72f)]=function(){const _0x3363db=_0x2a005f;VisuMZ[_0x3363db(0x63d)][_0x3363db(0x375)][_0x3363db(0x873)](this),this[_0x3363db(0x748)]();},Game_System[_0x2a005f(0x7d8)][_0x2a005f(0x748)]=function(){const _0x121ea3=_0x2a005f;this[_0x121ea3(0x66a)]={'SideView':$dataSystem[_0x121ea3(0x66e)],'BattleSystem':this[_0x121ea3(0x761)](),'FontSize':$dataSystem[_0x121ea3(0x273)][_0x121ea3(0x7cb)],'Padding':0xc};},Game_System[_0x2a005f(0x7d8)][_0x2a005f(0x51a)]=function(){const _0x192e77=_0x2a005f;if($gameTemp[_0x192e77(0x67d)]==='SV')return!![];else{if($gameTemp[_0x192e77(0x67d)]==='FV')return![];}if(this[_0x192e77(0x66a)]===undefined)this[_0x192e77(0x748)]();if(this[_0x192e77(0x66a)]['SideView']===undefined)this[_0x192e77(0x748)]();return this[_0x192e77(0x66a)][_0x192e77(0x26c)];},Game_System[_0x2a005f(0x7d8)]['setSideView']=function(_0x55eaea){const _0x10f21e=_0x2a005f;if(this[_0x10f21e(0x66a)]===undefined)this['initCoreEngine']();if(this[_0x10f21e(0x66a)]['SideView']===undefined)this[_0x10f21e(0x748)]();this[_0x10f21e(0x66a)][_0x10f21e(0x26c)]=_0x55eaea;},Game_System[_0x2a005f(0x7d8)][_0x2a005f(0x7b9)]=function(){const _0x47f9c7=_0x2a005f;if(this['_CoreEngineSettings']===undefined)this[_0x47f9c7(0x748)]();this['_CoreEngineSettings']['BattleSystem']=this[_0x47f9c7(0x761)]();},Game_System[_0x2a005f(0x7d8)][_0x2a005f(0x761)]=function(){const _0x36e645=_0x2a005f,_0x50cc7f=(VisuMZ[_0x36e645(0x63d)]['Settings'][_0x36e645(0x813)]||'DATABASE')[_0x36e645(0x697)]()[_0x36e645(0x440)]();return VisuMZ[_0x36e645(0x63d)][_0x36e645(0x4a9)](_0x50cc7f);},Game_System['prototype']['getBattleSystem']=function(){const _0x4d7ea4=_0x2a005f;if($gameTemp[_0x4d7ea4(0x878)]!==undefined)return $gameTemp[_0x4d7ea4(0x878)];if(this[_0x4d7ea4(0x66a)]===undefined)this[_0x4d7ea4(0x748)]();if(this[_0x4d7ea4(0x66a)]['BattleSystem']===undefined)this[_0x4d7ea4(0x7b9)]();return this[_0x4d7ea4(0x66a)][_0x4d7ea4(0x813)];},Game_System['prototype'][_0x2a005f(0x523)]=function(_0x78958c){const _0xe050a3=_0x2a005f;if(this[_0xe050a3(0x66a)]===undefined)this['initCoreEngine']();if(this[_0xe050a3(0x66a)][_0xe050a3(0x813)]===undefined)this[_0xe050a3(0x7b9)]();this['_CoreEngineSettings'][_0xe050a3(0x813)]=_0x78958c;},Game_System['prototype'][_0x2a005f(0x3a8)]=function(){const _0x58fc61=_0x2a005f;if(this[_0x58fc61(0x66a)]===undefined)this['initCoreEngine']();if(this[_0x58fc61(0x66a)][_0x58fc61(0x29c)]===undefined)this[_0x58fc61(0x748)]();return this[_0x58fc61(0x66a)][_0x58fc61(0x29c)];},Game_System[_0x2a005f(0x7d8)][_0x2a005f(0x42a)]=function(_0x395d78){const _0x254815=_0x2a005f;if(this[_0x254815(0x66a)]===undefined)this['initCoreEngine']();if(this[_0x254815(0x66a)][_0x254815(0x8d7)]===undefined)this[_0x254815(0x748)]();this[_0x254815(0x66a)][_0x254815(0x29c)]=_0x395d78;},Game_System['prototype'][_0x2a005f(0x17f)]=function(){const _0x1069f3=_0x2a005f;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x1069f3(0x684)]===undefined)this['initCoreEngine']();return this['_CoreEngineSettings'][_0x1069f3(0x684)];},Game_System[_0x2a005f(0x7d8)][_0x2a005f(0x647)]=function(_0x1859fe){const _0x5d19cf=_0x2a005f;if(this['_CoreEngineSettings']===undefined)this[_0x5d19cf(0x748)]();if(this[_0x5d19cf(0x66a)][_0x5d19cf(0x8d7)]===undefined)this[_0x5d19cf(0x748)]();this[_0x5d19cf(0x66a)]['Padding']=_0x1859fe;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x671)]=Game_Screen[_0x2a005f(0x7d8)][_0x2a005f(0x72f)],Game_Screen[_0x2a005f(0x7d8)][_0x2a005f(0x72f)]=function(){const _0xc80393=_0x2a005f;VisuMZ['CoreEngine'][_0xc80393(0x671)]['call'](this),this[_0xc80393(0x221)]();},Game_Screen[_0x2a005f(0x7d8)]['initCoreEngineScreenShake']=function(){const _0x400637=_0x2a005f,_0x372cd8=VisuMZ[_0x400637(0x63d)][_0x400637(0x52e)][_0x400637(0x7bb)];this[_0x400637(0x77d)]=_0x372cd8?.[_0x400637(0x8a2)]||_0x400637(0x3f3);},Game_Screen['prototype']['getCoreEngineScreenShakeStyle']=function(){const _0x4b52df=_0x2a005f;if(this[_0x4b52df(0x77d)]===undefined)this[_0x4b52df(0x221)]();return this['_coreEngineShakeStyle'];},Game_Screen[_0x2a005f(0x7d8)]['setCoreEngineScreenShakeStyle']=function(_0x56272f){const _0x420539=_0x2a005f;if(this[_0x420539(0x77d)]===undefined)this[_0x420539(0x221)]();this[_0x420539(0x77d)]=_0x56272f[_0x420539(0x3b8)]()['trim']();},Game_Picture['prototype'][_0x2a005f(0x3be)]=function(){const _0x3ea6a2=_0x2a005f;if($gameParty[_0x3ea6a2(0x576)]())return![];return this[_0x3ea6a2(0x762)]()&&this[_0x3ea6a2(0x762)]()['charAt'](0x0)==='!';},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x179)]=Game_Picture[_0x2a005f(0x7d8)]['x'],Game_Picture['prototype']['x']=function(){const _0x13325c=_0x2a005f;return this[_0x13325c(0x3be)]()?this[_0x13325c(0x666)]():VisuMZ[_0x13325c(0x63d)][_0x13325c(0x179)][_0x13325c(0x873)](this);},Game_Picture[_0x2a005f(0x7d8)][_0x2a005f(0x666)]=function(){const _0x16d67a=_0x2a005f,_0x4d74f3=$gameMap[_0x16d67a(0x8bf)]()*$gameMap['tileWidth']();return(this['_x']-_0x4d74f3)*$gameScreen[_0x16d67a(0x825)]();},VisuMZ[_0x2a005f(0x63d)]['Game_Picture_y']=Game_Picture[_0x2a005f(0x7d8)]['y'],Game_Picture[_0x2a005f(0x7d8)]['y']=function(){const _0x87c4a3=_0x2a005f;return this[_0x87c4a3(0x3be)]()?this['yScrollLinkedOffset']():VisuMZ[_0x87c4a3(0x63d)][_0x87c4a3(0x7c2)][_0x87c4a3(0x873)](this);},Game_Picture[_0x2a005f(0x7d8)][_0x2a005f(0x1b2)]=function(){const _0x2e3aa6=_0x2a005f,_0x206f8c=$gameMap[_0x2e3aa6(0x592)]()*$gameMap['tileHeight']();return(this['_y']-_0x206f8c)*$gameScreen[_0x2e3aa6(0x825)]();},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x856)]=Game_Picture[_0x2a005f(0x7d8)][_0x2a005f(0x86f)],Game_Picture[_0x2a005f(0x7d8)][_0x2a005f(0x86f)]=function(){const _0x5d99ae=_0x2a005f;let _0x429afc=VisuMZ['CoreEngine'][_0x5d99ae(0x856)]['call'](this);return this[_0x5d99ae(0x3be)]()&&(_0x429afc*=$gameScreen[_0x5d99ae(0x825)]()),_0x429afc;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x355)]=Game_Picture[_0x2a005f(0x7d8)][_0x2a005f(0x7da)],Game_Picture[_0x2a005f(0x7d8)][_0x2a005f(0x7da)]=function(){const _0x3f07e7=_0x2a005f;let _0x38b2ec=VisuMZ[_0x3f07e7(0x63d)]['Game_Picture_scaleY'][_0x3f07e7(0x873)](this);return this[_0x3f07e7(0x3be)]()&&(_0x38b2ec*=$gameScreen[_0x3f07e7(0x825)]()),_0x38b2ec;},Game_Picture[_0x2a005f(0x7d8)][_0x2a005f(0x5de)]=function(_0x10f514){const _0x5c5c33=_0x2a005f;this[_0x5c5c33(0x73d)]=_0x10f514;},VisuMZ[_0x2a005f(0x63d)]['Game_Picture_calcEasing']=Game_Picture['prototype']['calcEasing'],Game_Picture[_0x2a005f(0x7d8)][_0x2a005f(0x393)]=function(_0x10efd2){const _0x176d60=_0x2a005f;return this[_0x176d60(0x73d)]=this[_0x176d60(0x73d)]||0x0,[0x0,0x1,0x2,0x3][_0x176d60(0x34a)](this[_0x176d60(0x73d)])?VisuMZ['CoreEngine'][_0x176d60(0x28d)][_0x176d60(0x873)](this,_0x10efd2):VisuMZ['ApplyEasing'](_0x10efd2,this[_0x176d60(0x73d)]);},VisuMZ[_0x2a005f(0x63d)]['Game_Action_itemHit']=Game_Action['prototype']['itemHit'],Game_Action[_0x2a005f(0x7d8)]['itemHit']=function(_0xb2bda5){const _0x56fa63=_0x2a005f;return VisuMZ[_0x56fa63(0x63d)][_0x56fa63(0x52e)][_0x56fa63(0x213)][_0x56fa63(0x1c5)]?this[_0x56fa63(0x506)](_0xb2bda5):VisuMZ[_0x56fa63(0x63d)][_0x56fa63(0x4ef)][_0x56fa63(0x873)](this,_0xb2bda5);},Game_Action['prototype'][_0x2a005f(0x506)]=function(_0x4365ea){const _0x4e714e=_0x2a005f,_0x5cc55f=this[_0x4e714e(0x2f6)](_0x4365ea),_0x32bbc9=this[_0x4e714e(0x359)](_0x4365ea),_0x4fd3f5=this[_0x4e714e(0x19b)](_0x4365ea);return _0x5cc55f*(_0x32bbc9-_0x4fd3f5);},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x5cd)]=Game_Action[_0x2a005f(0x7d8)]['itemEva'],Game_Action[_0x2a005f(0x7d8)][_0x2a005f(0x740)]=function(_0x4cdbb0){const _0x4ef124=_0x2a005f;return VisuMZ[_0x4ef124(0x63d)][_0x4ef124(0x52e)][_0x4ef124(0x213)][_0x4ef124(0x1c5)]?0x0:VisuMZ['CoreEngine']['Game_Action_itemEva'][_0x4ef124(0x873)](this,_0x4cdbb0);},Game_Action['prototype']['itemSuccessRate']=function(_0x3ff3cd){const _0x239231=_0x2a005f;return this[_0x239231(0x507)]()[_0x239231(0x60e)]*0.01;},Game_Action['prototype'][_0x2a005f(0x359)]=function(_0x532ed4){const _0x282370=_0x2a005f;if(VisuMZ[_0x282370(0x63d)]['Settings']['QoL']['AccuracyBoost']&&this['isItem']())return 0x1;return this['isPhysical']()?VisuMZ[_0x282370(0x63d)][_0x282370(0x52e)]['QoL']['AccuracyBoost']&&this[_0x282370(0x870)]()[_0x282370(0x827)]()?this[_0x282370(0x870)]()[_0x282370(0x738)]+0.05:this[_0x282370(0x870)]()['hit']:0x1;},Game_Action[_0x2a005f(0x7d8)][_0x2a005f(0x19b)]=function(_0x3a0e32){const _0x5a4a05=_0x2a005f;if(this[_0x5a4a05(0x870)]()[_0x5a4a05(0x827)]()===_0x3a0e32[_0x5a4a05(0x827)]())return 0x0;if(this[_0x5a4a05(0x474)]())return VisuMZ[_0x5a4a05(0x63d)][_0x5a4a05(0x52e)][_0x5a4a05(0x213)][_0x5a4a05(0x2f7)]&&_0x3a0e32[_0x5a4a05(0x86e)]()?_0x3a0e32[_0x5a4a05(0x7ff)]-0.05:_0x3a0e32['eva'];else return this[_0x5a4a05(0x1aa)]()?_0x3a0e32[_0x5a4a05(0x314)]:0x0;},VisuMZ['CoreEngine']['Game_Action_updateLastTarget']=Game_Action[_0x2a005f(0x7d8)][_0x2a005f(0x21a)],Game_Action['prototype'][_0x2a005f(0x21a)]=function(_0x364f76){const _0x15d312=_0x2a005f;VisuMZ[_0x15d312(0x63d)]['Game_Action_updateLastTarget'][_0x15d312(0x873)](this,_0x364f76);if(VisuMZ['CoreEngine'][_0x15d312(0x52e)]['QoL'][_0x15d312(0x1c5)])return;const _0xa7d087=_0x364f76[_0x15d312(0x3a3)]();_0xa7d087[_0x15d312(0x2fd)]&&(0x1-this[_0x15d312(0x740)](_0x364f76)>this[_0x15d312(0x6a9)](_0x364f76)&&(_0xa7d087['missed']=![],_0xa7d087['evaded']=!![]));},VisuMZ['CoreEngine'][_0x2a005f(0x387)]=Game_BattlerBase[_0x2a005f(0x7d8)][_0x2a005f(0x505)],Game_BattlerBase['prototype'][_0x2a005f(0x505)]=function(){const _0x1b0c7f=_0x2a005f;this[_0x1b0c7f(0x720)]={},VisuMZ[_0x1b0c7f(0x63d)][_0x1b0c7f(0x387)][_0x1b0c7f(0x873)](this);},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x575)]=Game_BattlerBase['prototype'][_0x2a005f(0x32a)],Game_BattlerBase[_0x2a005f(0x7d8)]['refresh']=function(){const _0x16a9d7=_0x2a005f;this[_0x16a9d7(0x720)]={},VisuMZ[_0x16a9d7(0x63d)][_0x16a9d7(0x575)][_0x16a9d7(0x873)](this);},Game_BattlerBase[_0x2a005f(0x7d8)][_0x2a005f(0x438)]=function(_0x4a98ca){const _0xc91cb0=_0x2a005f;return this['_cache']=this[_0xc91cb0(0x720)]||{},this[_0xc91cb0(0x720)][_0x4a98ca]!==undefined;},Game_BattlerBase['prototype'][_0x2a005f(0x6ef)]=function(_0x3ebe54){const _0x4c9032=_0x2a005f,_0xa30120=(_0x462c53,_0x40efcf)=>{const _0x5ab3d8=_0xeff9;if(!_0x40efcf)return _0x462c53;if(_0x40efcf[_0x5ab3d8(0x6d3)][_0x5ab3d8(0x37e)](VisuMZ[_0x5ab3d8(0x63d)][_0x5ab3d8(0x7ed)][_0x5ab3d8(0x6ef)][_0x3ebe54])){var _0x453e2f=Number(RegExp['$1']);_0x462c53+=_0x453e2f;}if(_0x40efcf[_0x5ab3d8(0x6d3)][_0x5ab3d8(0x37e)](VisuMZ[_0x5ab3d8(0x63d)][_0x5ab3d8(0x7ed)][_0x5ab3d8(0x7b6)][_0x3ebe54])){var _0x35c986=String(RegExp['$1']);try{_0x462c53+=eval(_0x35c986);}catch(_0x29a7c3){if($gameTemp[_0x5ab3d8(0x7c6)]())console[_0x5ab3d8(0x6d8)](_0x29a7c3);}}return _0x462c53;};return this[_0x4c9032(0x369)]()[_0x4c9032(0x491)](_0xa30120,this[_0x4c9032(0x1bf)][_0x3ebe54]);},Game_BattlerBase[_0x2a005f(0x7d8)][_0x2a005f(0x27c)]=function(_0x1aa8d1){const _0x3b6e43=_0x2a005f;var _0x21a465=_0x3b6e43(0x8af)+(this[_0x3b6e43(0x827)]()?'Actor':'Enemy')+_0x3b6e43(0x8d4)+_0x1aa8d1;if(this[_0x3b6e43(0x438)](_0x21a465))return this['_cache'][_0x21a465];this[_0x3b6e43(0x720)][_0x21a465]=eval(VisuMZ[_0x3b6e43(0x63d)][_0x3b6e43(0x52e)][_0x3b6e43(0x2ca)][_0x21a465]);const _0x3769dc=(_0x4bb84e,_0x2395af)=>{const _0x5bb425=_0x3b6e43;if(!_0x2395af)return _0x4bb84e;if(_0x2395af[_0x5bb425(0x6d3)][_0x5bb425(0x37e)](VisuMZ[_0x5bb425(0x63d)][_0x5bb425(0x7ed)][_0x5bb425(0x27c)][_0x1aa8d1])){var _0x5edc45=Number(RegExp['$1']);if(_0x5edc45===0x0)_0x5edc45=Number[_0x5bb425(0x561)];_0x4bb84e=Math[_0x5bb425(0x23f)](_0x4bb84e,_0x5edc45);}if(_0x2395af[_0x5bb425(0x6d3)][_0x5bb425(0x37e)](VisuMZ[_0x5bb425(0x63d)]['RegExp']['paramMaxJS'][_0x1aa8d1])){var _0x2c6959=String(RegExp['$1']);try{_0x4bb84e=Math[_0x5bb425(0x23f)](_0x4bb84e,Number(eval(_0x2c6959)));}catch(_0xe08b79){if($gameTemp[_0x5bb425(0x7c6)]())console['log'](_0xe08b79);}}return _0x4bb84e;};if(this[_0x3b6e43(0x720)][_0x21a465]===0x0)this[_0x3b6e43(0x720)][_0x21a465]=Number[_0x3b6e43(0x561)];return this[_0x3b6e43(0x720)][_0x21a465]=this[_0x3b6e43(0x369)]()[_0x3b6e43(0x491)](_0x3769dc,this[_0x3b6e43(0x720)][_0x21a465]),this[_0x3b6e43(0x720)][_0x21a465];},Game_BattlerBase['prototype']['paramRate']=function(_0x3efc66){const _0x45fcbd=_0x2a005f,_0x567b51=this[_0x45fcbd(0x712)](Game_BattlerBase[_0x45fcbd(0x76b)],_0x3efc66),_0x508d84=(_0x3d4463,_0x3397a7)=>{const _0x407c69=_0x45fcbd;if(!_0x3397a7)return _0x3d4463;if(_0x3397a7[_0x407c69(0x6d3)]['match'](VisuMZ[_0x407c69(0x63d)]['RegExp'][_0x407c69(0x415)][_0x3efc66])){var _0x58f185=Number(RegExp['$1'])/0x64;_0x3d4463*=_0x58f185;}if(_0x3397a7['note']['match'](VisuMZ[_0x407c69(0x63d)][_0x407c69(0x7ed)][_0x407c69(0x45c)][_0x3efc66])){var _0x58f185=Number(RegExp['$1']);_0x3d4463*=_0x58f185;}if(_0x3397a7[_0x407c69(0x6d3)]['match'](VisuMZ[_0x407c69(0x63d)]['RegExp']['paramRateJS'][_0x3efc66])){var _0x264754=String(RegExp['$1']);try{_0x3d4463*=eval(_0x264754);}catch(_0x4c7d8d){if($gameTemp[_0x407c69(0x7c6)]())console['log'](_0x4c7d8d);}}return _0x3d4463;};return this[_0x45fcbd(0x369)]()['reduce'](_0x508d84,_0x567b51);},Game_BattlerBase[_0x2a005f(0x7d8)][_0x2a005f(0x2a3)]=function(_0x7e47b4){const _0x1c8a89=_0x2a005f,_0x3d6ad5=(_0x2b5698,_0x4dc1c3)=>{const _0x40cf39=_0xeff9;if(!_0x4dc1c3)return _0x2b5698;if(_0x4dc1c3[_0x40cf39(0x6d3)][_0x40cf39(0x37e)](VisuMZ['CoreEngine'][_0x40cf39(0x7ed)][_0x40cf39(0x86a)][_0x7e47b4])){var _0x17eddb=Number(RegExp['$1']);_0x2b5698+=_0x17eddb;}if(_0x4dc1c3[_0x40cf39(0x6d3)][_0x40cf39(0x37e)](VisuMZ[_0x40cf39(0x63d)]['RegExp'][_0x40cf39(0x836)][_0x7e47b4])){var _0x3c6b4e=String(RegExp['$1']);try{_0x2b5698+=eval(_0x3c6b4e);}catch(_0x5dd48b){if($gameTemp[_0x40cf39(0x7c6)]())console[_0x40cf39(0x6d8)](_0x5dd48b);}}return _0x2b5698;};return this[_0x1c8a89(0x369)]()[_0x1c8a89(0x491)](_0x3d6ad5,0x0);},Game_BattlerBase[_0x2a005f(0x7d8)][_0x2a005f(0x642)]=function(_0x371580){const _0x1b4ba0=_0x2a005f;let _0x18012a=_0x1b4ba0(0x642)+_0x371580+_0x1b4ba0(0x353);if(this[_0x1b4ba0(0x438)](_0x18012a))return this['_cache'][_0x18012a];return this['_cache'][_0x18012a]=Math[_0x1b4ba0(0x57f)](VisuMZ[_0x1b4ba0(0x63d)][_0x1b4ba0(0x52e)][_0x1b4ba0(0x2ca)][_0x1b4ba0(0x4fe)][_0x1b4ba0(0x873)](this,_0x371580)),this['_cache'][_0x18012a];},Game_BattlerBase[_0x2a005f(0x7d8)][_0x2a005f(0x3bb)]=function(_0x588c83){const _0x2bfff4=(_0x115968,_0x5b9b94)=>{const _0x17c349=_0xeff9;if(!_0x5b9b94)return _0x115968;if(_0x5b9b94[_0x17c349(0x6d3)][_0x17c349(0x37e)](VisuMZ[_0x17c349(0x63d)]['RegExp'][_0x17c349(0x57a)][_0x588c83])){var _0xe18f20=Number(RegExp['$1'])/0x64;_0x115968+=_0xe18f20;}if(_0x5b9b94[_0x17c349(0x6d3)][_0x17c349(0x37e)](VisuMZ['CoreEngine'][_0x17c349(0x7ed)][_0x17c349(0x54d)][_0x588c83])){var _0xe18f20=Number(RegExp['$1']);_0x115968+=_0xe18f20;}if(_0x5b9b94['note'][_0x17c349(0x37e)](VisuMZ[_0x17c349(0x63d)][_0x17c349(0x7ed)]['xparamPlusJS'][_0x588c83])){var _0x495e81=String(RegExp['$1']);try{_0x115968+=eval(_0x495e81);}catch(_0x3ca778){if($gameTemp[_0x17c349(0x7c6)]())console[_0x17c349(0x6d8)](_0x3ca778);}}return _0x115968;};return this['traitObjects']()['reduce'](_0x2bfff4,0x0);},Game_BattlerBase['prototype'][_0x2a005f(0x4d1)]=function(_0x115972){const _0x5f3cb8=_0x2a005f,_0x2013b1=(_0x31e847,_0x10cc59)=>{const _0x257745=_0xeff9;if(!_0x10cc59)return _0x31e847;if(_0x10cc59[_0x257745(0x6d3)][_0x257745(0x37e)](VisuMZ[_0x257745(0x63d)][_0x257745(0x7ed)][_0x257745(0x8cc)][_0x115972])){var _0xb43ed6=Number(RegExp['$1'])/0x64;_0x31e847*=_0xb43ed6;}if(_0x10cc59[_0x257745(0x6d3)]['match'](VisuMZ[_0x257745(0x63d)][_0x257745(0x7ed)][_0x257745(0x54f)][_0x115972])){var _0xb43ed6=Number(RegExp['$1']);_0x31e847*=_0xb43ed6;}if(_0x10cc59[_0x257745(0x6d3)][_0x257745(0x37e)](VisuMZ[_0x257745(0x63d)]['RegExp'][_0x257745(0x5f1)][_0x115972])){var _0x482e08=String(RegExp['$1']);try{_0x31e847*=eval(_0x482e08);}catch(_0x1518ca){if($gameTemp[_0x257745(0x7c6)]())console['log'](_0x1518ca);}}return _0x31e847;};return this[_0x5f3cb8(0x369)]()[_0x5f3cb8(0x491)](_0x2013b1,0x1);},Game_BattlerBase[_0x2a005f(0x7d8)][_0x2a005f(0x2c7)]=function(_0x1e382b){const _0x266ecc=_0x2a005f,_0x3807b9=(_0x5cad5a,_0x3fc7ec)=>{const _0x20cbf3=_0xeff9;if(!_0x3fc7ec)return _0x5cad5a;if(_0x3fc7ec['note'][_0x20cbf3(0x37e)](VisuMZ[_0x20cbf3(0x63d)]['RegExp']['xparamFlat1'][_0x1e382b])){var _0x1170bf=Number(RegExp['$1'])/0x64;_0x5cad5a+=_0x1170bf;}if(_0x3fc7ec['note'][_0x20cbf3(0x37e)](VisuMZ[_0x20cbf3(0x63d)][_0x20cbf3(0x7ed)]['xparamFlat2'][_0x1e382b])){var _0x1170bf=Number(RegExp['$1']);_0x5cad5a+=_0x1170bf;}if(_0x3fc7ec[_0x20cbf3(0x6d3)]['match'](VisuMZ['CoreEngine'][_0x20cbf3(0x7ed)][_0x20cbf3(0x76a)][_0x1e382b])){var _0x113596=String(RegExp['$1']);try{_0x5cad5a+=eval(_0x113596);}catch(_0x5c64c9){if($gameTemp['isPlaytest']())console['log'](_0x5c64c9);}}return _0x5cad5a;};return this[_0x266ecc(0x369)]()[_0x266ecc(0x491)](_0x3807b9,0x0);},Game_BattlerBase[_0x2a005f(0x7d8)]['xparam']=function(_0x31a807){const _0x25b6ee=_0x2a005f;let _0x262460=_0x25b6ee(0x1d6)+_0x31a807+_0x25b6ee(0x353);if(this[_0x25b6ee(0x438)](_0x262460))return this[_0x25b6ee(0x720)][_0x262460];return this[_0x25b6ee(0x720)][_0x262460]=VisuMZ[_0x25b6ee(0x63d)][_0x25b6ee(0x52e)][_0x25b6ee(0x2ca)]['XParameterFormula']['call'](this,_0x31a807),this[_0x25b6ee(0x720)][_0x262460];},Game_BattlerBase[_0x2a005f(0x7d8)][_0x2a005f(0x3a2)]=function(_0x492a66){const _0x284414=(_0x5c8d2d,_0x3c786b)=>{const _0x1b8305=_0xeff9;if(!_0x3c786b)return _0x5c8d2d;if(_0x3c786b['note'][_0x1b8305(0x37e)](VisuMZ[_0x1b8305(0x63d)][_0x1b8305(0x7ed)][_0x1b8305(0x2c3)][_0x492a66])){var _0x197804=Number(RegExp['$1'])/0x64;_0x5c8d2d+=_0x197804;}if(_0x3c786b['note'][_0x1b8305(0x37e)](VisuMZ['CoreEngine']['RegExp'][_0x1b8305(0x4a3)][_0x492a66])){var _0x197804=Number(RegExp['$1']);_0x5c8d2d+=_0x197804;}if(_0x3c786b['note'][_0x1b8305(0x37e)](VisuMZ[_0x1b8305(0x63d)][_0x1b8305(0x7ed)][_0x1b8305(0x75d)][_0x492a66])){var _0x1d2ce4=String(RegExp['$1']);try{_0x5c8d2d+=eval(_0x1d2ce4);}catch(_0x484d1d){if($gameTemp['isPlaytest']())console[_0x1b8305(0x6d8)](_0x484d1d);}}return _0x5c8d2d;};return this['traitObjects']()['reduce'](_0x284414,0x0);},Game_BattlerBase[_0x2a005f(0x7d8)]['sparamRate']=function(_0x4e8324){const _0x2f4135=_0x2a005f,_0x102044=(_0x34248a,_0x37c5bf)=>{const _0x3b1096=_0xeff9;if(!_0x37c5bf)return _0x34248a;if(_0x37c5bf[_0x3b1096(0x6d3)][_0x3b1096(0x37e)](VisuMZ[_0x3b1096(0x63d)]['RegExp'][_0x3b1096(0x485)][_0x4e8324])){var _0x3db749=Number(RegExp['$1'])/0x64;_0x34248a*=_0x3db749;}if(_0x37c5bf[_0x3b1096(0x6d3)][_0x3b1096(0x37e)](VisuMZ[_0x3b1096(0x63d)][_0x3b1096(0x7ed)]['sparamRate2'][_0x4e8324])){var _0x3db749=Number(RegExp['$1']);_0x34248a*=_0x3db749;}if(_0x37c5bf[_0x3b1096(0x6d3)]['match'](VisuMZ[_0x3b1096(0x63d)][_0x3b1096(0x7ed)]['sparamRateJS'][_0x4e8324])){var _0x1ad9ff=String(RegExp['$1']);try{_0x34248a*=eval(_0x1ad9ff);}catch(_0x42e777){if($gameTemp[_0x3b1096(0x7c6)]())console[_0x3b1096(0x6d8)](_0x42e777);}}return _0x34248a;};return this['traitObjects']()[_0x2f4135(0x491)](_0x102044,0x1);},Game_BattlerBase['prototype'][_0x2a005f(0x673)]=function(_0x46386d){const _0x3bf4c2=_0x2a005f,_0x27854a=(_0x2e92b4,_0x28ff89)=>{const _0x39d106=_0xeff9;if(!_0x28ff89)return _0x2e92b4;if(_0x28ff89['note'][_0x39d106(0x37e)](VisuMZ[_0x39d106(0x63d)][_0x39d106(0x7ed)][_0x39d106(0x219)][_0x46386d])){var _0x221e54=Number(RegExp['$1'])/0x64;_0x2e92b4+=_0x221e54;}if(_0x28ff89['note'][_0x39d106(0x37e)](VisuMZ[_0x39d106(0x63d)][_0x39d106(0x7ed)][_0x39d106(0x6c4)][_0x46386d])){var _0x221e54=Number(RegExp['$1']);_0x2e92b4+=_0x221e54;}if(_0x28ff89[_0x39d106(0x6d3)]['match'](VisuMZ['CoreEngine'][_0x39d106(0x7ed)]['sparamFlatJS'][_0x46386d])){var _0x49d75c=String(RegExp['$1']);try{_0x2e92b4+=eval(_0x49d75c);}catch(_0x158eb6){if($gameTemp[_0x39d106(0x7c6)]())console[_0x39d106(0x6d8)](_0x158eb6);}}return _0x2e92b4;};return this[_0x3bf4c2(0x369)]()[_0x3bf4c2(0x491)](_0x27854a,0x0);},Game_BattlerBase[_0x2a005f(0x7d8)]['sparam']=function(_0x767822){const _0x4e7f27=_0x2a005f;let _0x4fdfa5='sparam'+_0x767822+_0x4e7f27(0x353);if(this['checkCacheKey'](_0x4fdfa5))return this[_0x4e7f27(0x720)][_0x4fdfa5];return this[_0x4e7f27(0x720)][_0x4fdfa5]=VisuMZ[_0x4e7f27(0x63d)][_0x4e7f27(0x52e)][_0x4e7f27(0x2ca)][_0x4e7f27(0x46a)][_0x4e7f27(0x873)](this,_0x767822),this[_0x4e7f27(0x720)][_0x4fdfa5];},Game_BattlerBase[_0x2a005f(0x7d8)][_0x2a005f(0x844)]=function(_0x53bbdd,_0x2b37d1){const _0x36326a=_0x2a005f;if(typeof paramId===_0x36326a(0x4bc))return this[_0x36326a(0x642)](_0x53bbdd);_0x53bbdd=String(_0x53bbdd||'')['toUpperCase']();if(_0x53bbdd==='MAXHP')return this[_0x36326a(0x642)](0x0);if(_0x53bbdd===_0x36326a(0x3d1))return this[_0x36326a(0x642)](0x1);if(_0x53bbdd===_0x36326a(0x79a))return this[_0x36326a(0x642)](0x2);if(_0x53bbdd===_0x36326a(0x7bf))return this[_0x36326a(0x642)](0x3);if(_0x53bbdd===_0x36326a(0x75e))return this[_0x36326a(0x642)](0x4);if(_0x53bbdd===_0x36326a(0x453))return this[_0x36326a(0x642)](0x5);if(_0x53bbdd===_0x36326a(0x48c))return this[_0x36326a(0x642)](0x6);if(_0x53bbdd===_0x36326a(0x6db))return this[_0x36326a(0x642)](0x7);if(_0x53bbdd===_0x36326a(0x206))return _0x2b37d1?String(Math['round'](this[_0x36326a(0x1d6)](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x53bbdd==='EVA')return _0x2b37d1?String(Math[_0x36326a(0x57f)](this['xparam'](0x1)*0x64))+'%':this[_0x36326a(0x1d6)](0x1);if(_0x53bbdd==='CRI')return _0x2b37d1?String(Math[_0x36326a(0x57f)](this[_0x36326a(0x1d6)](0x2)*0x64))+'%':this[_0x36326a(0x1d6)](0x2);if(_0x53bbdd===_0x36326a(0x68f))return _0x2b37d1?String(Math[_0x36326a(0x57f)](this[_0x36326a(0x1d6)](0x3)*0x64))+'%':this[_0x36326a(0x1d6)](0x3);if(_0x53bbdd===_0x36326a(0x88f))return _0x2b37d1?String(Math[_0x36326a(0x57f)](this[_0x36326a(0x1d6)](0x4)*0x64))+'%':this[_0x36326a(0x1d6)](0x4);if(_0x53bbdd===_0x36326a(0x821))return _0x2b37d1?String(Math['round'](this['xparam'](0x5)*0x64))+'%':this[_0x36326a(0x1d6)](0x5);if(_0x53bbdd===_0x36326a(0x5c7))return _0x2b37d1?String(Math['round'](this[_0x36326a(0x1d6)](0x6)*0x64))+'%':this[_0x36326a(0x1d6)](0x6);if(_0x53bbdd==='HRG')return _0x2b37d1?String(Math[_0x36326a(0x57f)](this['xparam'](0x7)*0x64))+'%':this[_0x36326a(0x1d6)](0x7);if(_0x53bbdd===_0x36326a(0x68a))return _0x2b37d1?String(Math[_0x36326a(0x57f)](this[_0x36326a(0x1d6)](0x8)*0x64))+'%':this['xparam'](0x8);if(_0x53bbdd===_0x36326a(0x389))return _0x2b37d1?String(Math[_0x36326a(0x57f)](this[_0x36326a(0x1d6)](0x9)*0x64))+'%':this['xparam'](0x9);if(_0x53bbdd===_0x36326a(0x386))return _0x2b37d1?String(Math['round'](this['sparam'](0x0)*0x64))+'%':this[_0x36326a(0x743)](0x0);if(_0x53bbdd==='GRD')return _0x2b37d1?String(Math[_0x36326a(0x57f)](this[_0x36326a(0x743)](0x1)*0x64))+'%':this[_0x36326a(0x743)](0x1);if(_0x53bbdd==='REC')return _0x2b37d1?String(Math[_0x36326a(0x57f)](this[_0x36326a(0x743)](0x2)*0x64))+'%':this[_0x36326a(0x743)](0x2);if(_0x53bbdd===_0x36326a(0x39c))return _0x2b37d1?String(Math[_0x36326a(0x57f)](this[_0x36326a(0x743)](0x3)*0x64))+'%':this['sparam'](0x3);if(_0x53bbdd===_0x36326a(0x203))return _0x2b37d1?String(Math[_0x36326a(0x57f)](this['sparam'](0x4)*0x64))+'%':this[_0x36326a(0x743)](0x4);if(_0x53bbdd===_0x36326a(0x6b0))return _0x2b37d1?String(Math[_0x36326a(0x57f)](this[_0x36326a(0x743)](0x5)*0x64))+'%':this[_0x36326a(0x743)](0x5);if(_0x53bbdd===_0x36326a(0x390))return _0x2b37d1?String(Math[_0x36326a(0x57f)](this[_0x36326a(0x743)](0x6)*0x64))+'%':this[_0x36326a(0x743)](0x6);if(_0x53bbdd===_0x36326a(0x590))return _0x2b37d1?String(Math['round'](this[_0x36326a(0x743)](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x53bbdd===_0x36326a(0x563))return _0x2b37d1?String(Math[_0x36326a(0x57f)](this['sparam'](0x8)*0x64))+'%':this[_0x36326a(0x743)](0x8);if(_0x53bbdd==='EXR')return _0x2b37d1?String(Math[_0x36326a(0x57f)](this[_0x36326a(0x743)](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ[_0x36326a(0x63d)]['CustomParamAbb'][_0x53bbdd]){const _0x42a747=VisuMZ['CoreEngine'][_0x36326a(0x1a0)][_0x53bbdd],_0xb2dc5f=this[_0x42a747];return VisuMZ[_0x36326a(0x63d)][_0x36326a(0x277)][_0x53bbdd]===_0x36326a(0x7d4)?_0xb2dc5f:_0x2b37d1?String(Math['round'](_0xb2dc5f*0x64))+'%':_0xb2dc5f;}return'';},Game_BattlerBase[_0x2a005f(0x7d8)][_0x2a005f(0x374)]=function(){const _0x4d7c0b=_0x2a005f;return this[_0x4d7c0b(0x65f)]()&&this[_0x4d7c0b(0x5e6)]<this[_0x4d7c0b(0x6ae)]*VisuMZ[_0x4d7c0b(0x63d)][_0x4d7c0b(0x52e)][_0x4d7c0b(0x2ca)][_0x4d7c0b(0x746)];},Game_Battler['prototype']['performMiss']=function(){const _0x137455=_0x2a005f;SoundManager[_0x137455(0x1e0)](),this[_0x137455(0x786)](_0x137455(0x725));},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x8a3)]=Game_Actor[_0x2a005f(0x7d8)][_0x2a005f(0x366)],Game_Actor['prototype']['paramBase']=function(_0x40c189){const _0x198b28=_0x2a005f;if(this[_0x198b28(0x36b)]>0x63)return this['paramBaseAboveLevel99'](_0x40c189);return VisuMZ['CoreEngine'][_0x198b28(0x8a3)]['call'](this,_0x40c189);},Game_Actor[_0x2a005f(0x7d8)][_0x2a005f(0x36f)]=function(_0x37a2c9){const _0x4d877d=_0x2a005f,_0x3c8933=this[_0x4d877d(0x861)]()['params'][_0x37a2c9][0x63],_0x4a51b2=this['currentClass']()[_0x4d877d(0x764)][_0x37a2c9][0x62];return _0x3c8933+(_0x3c8933-_0x4a51b2)*(this[_0x4d877d(0x36b)]-0x63);},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x170)]=Game_Actor['prototype']['changeClass'],Game_Actor['prototype']['changeClass']=function(_0x52e9e4,_0x2d0fab){const _0xa3fb0a=_0x2a005f;$gameTemp[_0xa3fb0a(0x231)]=!![],VisuMZ[_0xa3fb0a(0x63d)][_0xa3fb0a(0x170)][_0xa3fb0a(0x873)](this,_0x52e9e4,_0x2d0fab),$gameTemp[_0xa3fb0a(0x231)]=undefined;},VisuMZ['CoreEngine']['Game_Actor_levelUp']=Game_Actor[_0x2a005f(0x7d8)][_0x2a005f(0x782)],Game_Actor[_0x2a005f(0x7d8)][_0x2a005f(0x782)]=function(){const _0x2bc697=_0x2a005f;VisuMZ[_0x2bc697(0x63d)][_0x2bc697(0x8a7)][_0x2bc697(0x873)](this);if(!$gameTemp[_0x2bc697(0x231)])this['levelUpRecovery']();},Game_Actor['prototype'][_0x2a005f(0x64b)]=function(){const _0x2e5319=_0x2a005f;this[_0x2e5319(0x720)]={};if(VisuMZ['CoreEngine'][_0x2e5319(0x52e)][_0x2e5319(0x213)][_0x2e5319(0x391)])this[_0x2e5319(0x5e6)]=this['mhp'];if(VisuMZ[_0x2e5319(0x63d)][_0x2e5319(0x52e)]['QoL'][_0x2e5319(0x82f)])this[_0x2e5319(0x2e9)]=this[_0x2e5319(0x713)];},Game_Actor[_0x2a005f(0x7d8)]['expRate']=function(){const _0x70b2de=_0x2a005f;if(this[_0x70b2de(0x564)]())return 0x1;const _0x32ee57=this[_0x70b2de(0x857)]()-this[_0x70b2de(0x16f)](),_0x500e2b=this[_0x70b2de(0x2d6)]()-this[_0x70b2de(0x16f)]();return(_0x500e2b/_0x32ee57)[_0x70b2de(0x5c0)](0x0,0x1);},Game_Actor[_0x2a005f(0x7d8)]['traitObjects']=function(){const _0x435555=_0x2a005f,_0x2eb45e=Game_Battler[_0x435555(0x7d8)]['traitObjects'][_0x435555(0x873)](this);for(const _0x2eb8df of this[_0x435555(0x39f)]()){_0x2eb8df&&_0x2eb45e[_0x435555(0x1fe)](_0x2eb8df);}return _0x2eb45e[_0x435555(0x1fe)](this[_0x435555(0x861)](),this[_0x435555(0x70e)]()),_0x2eb45e;},Object[_0x2a005f(0x4d3)](Game_Enemy[_0x2a005f(0x7d8)],'level',{'get':function(){const _0x5d4779=_0x2a005f;return this[_0x5d4779(0x354)]();},'configurable':!![]}),Game_Enemy[_0x2a005f(0x7d8)][_0x2a005f(0x354)]=function(){const _0x4d1625=_0x2a005f;return this[_0x4d1625(0x8b2)]()[_0x4d1625(0x36b)];},Game_Enemy[_0x2a005f(0x7d8)]['moveRelativeToResolutionChange']=function(){const _0x1754ff=_0x2a005f;!this[_0x1754ff(0x26e)]&&(this[_0x1754ff(0x2b6)]+=Math[_0x1754ff(0x57f)]((Graphics[_0x1754ff(0x8b8)]-0x270)/0x2),this['_screenY']-=Math['floor']((Graphics[_0x1754ff(0x8b8)]-Graphics[_0x1754ff(0x4b9)])/0x2),$gameSystem[_0x1754ff(0x51a)]()?this['_screenX']-=Math[_0x1754ff(0x2a7)]((Graphics[_0x1754ff(0x4c6)]-Graphics[_0x1754ff(0x7b1)])/0x2):this[_0x1754ff(0x7c8)]+=Math[_0x1754ff(0x57f)]((Graphics[_0x1754ff(0x7b1)]-0x330)/0x2)),this['_repositioned']=!![];},Game_Party[_0x2a005f(0x7d8)][_0x2a005f(0x7d0)]=function(){const _0x38a620=_0x2a005f;return VisuMZ['CoreEngine'][_0x38a620(0x52e)]['Gold'][_0x38a620(0x43d)];},VisuMZ['CoreEngine'][_0x2a005f(0x81d)]=Game_Party[_0x2a005f(0x7d8)][_0x2a005f(0x550)],Game_Party[_0x2a005f(0x7d8)][_0x2a005f(0x550)]=function(_0x56c3f9){const _0x49e7ef=_0x2a005f;if(VisuMZ[_0x49e7ef(0x63d)][_0x49e7ef(0x52e)][_0x49e7ef(0x213)][_0x49e7ef(0x6a5)]&&DataManager[_0x49e7ef(0x864)](_0x56c3f9))return;VisuMZ['CoreEngine'][_0x49e7ef(0x81d)][_0x49e7ef(0x873)](this,_0x56c3f9);},Game_Party[_0x2a005f(0x7d8)][_0x2a005f(0x47d)]=function(){const _0x1e8aed=_0x2a005f,_0x22fa43=VisuMZ[_0x1e8aed(0x63d)][_0x1e8aed(0x52e)]['QoL'],_0x1ce18e=_0x22fa43['BTestAddedQuantity']??0x63;let _0x5c167b=[];(_0x22fa43[_0x1e8aed(0x1a7)]??!![])&&(_0x5c167b=_0x5c167b['concat']($dataItems));(_0x22fa43[_0x1e8aed(0x363)]??!![])&&(_0x5c167b=_0x5c167b[_0x1e8aed(0x31c)]($dataWeapons));(_0x22fa43['BTestArmors']??!![])&&(_0x5c167b=_0x5c167b['concat']($dataArmors));for(const _0x1f2557 of _0x5c167b){if(!_0x1f2557)continue;if(_0x1f2557['name']['trim']()<=0x0)continue;if(_0x1f2557[_0x1e8aed(0x762)]['match'](/-----/i))continue;this['gainItem'](_0x1f2557,_0x1ce18e);}},VisuMZ['CoreEngine']['Game_Troop_setup']=Game_Troop[_0x2a005f(0x7d8)][_0x2a005f(0x182)],Game_Troop['prototype'][_0x2a005f(0x182)]=function(_0x3783dc){const _0x4d5f91=_0x2a005f;$gameTemp[_0x4d5f91(0x625)](),$gameTemp['applyForcedGameTroopSettingsCoreEngine'](_0x3783dc),VisuMZ[_0x4d5f91(0x63d)][_0x4d5f91(0x451)][_0x4d5f91(0x873)](this,_0x3783dc);},VisuMZ['CoreEngine'][_0x2a005f(0x692)]=Game_Map[_0x2a005f(0x7d8)]['setup'],Game_Map[_0x2a005f(0x7d8)][_0x2a005f(0x182)]=function(_0x554e0f){const _0x5aa3c9=_0x2a005f;VisuMZ[_0x5aa3c9(0x63d)]['Game_Map_setup']['call'](this,_0x554e0f),this[_0x5aa3c9(0x6ad)](),this[_0x5aa3c9(0x8cf)](_0x554e0f);},Game_Map[_0x2a005f(0x7d8)][_0x2a005f(0x8cf)]=function(){const _0x1ed9c7=_0x2a005f;this[_0x1ed9c7(0x4ba)]=VisuMZ[_0x1ed9c7(0x63d)][_0x1ed9c7(0x52e)][_0x1ed9c7(0x213)][_0x1ed9c7(0x20a)]||![];const _0x95952c=VisuMZ['CoreEngine'][_0x1ed9c7(0x52e)]['ScreenResolution'],_0x521d76=$dataMap?$dataMap[_0x1ed9c7(0x6d3)]||'':'';if(_0x521d76[_0x1ed9c7(0x37e)](/<SHOW TILE SHADOWS>/i))this[_0x1ed9c7(0x4ba)]=![];else _0x521d76['match'](/<HIDE TILE SHADOWS>/i)&&(this[_0x1ed9c7(0x4ba)]=!![]);if(_0x521d76['match'](/<SCROLL LOCK X>/i))this[_0x1ed9c7(0x843)]()[_0x1ed9c7(0x67a)]=!![],this[_0x1ed9c7(0x843)]()[_0x1ed9c7(0x8bf)]=_0x95952c['DisplayLockX'];else _0x521d76['match'](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x1ed9c7(0x843)]()[_0x1ed9c7(0x67a)]=!![],this['centerCameraCheckData']()[_0x1ed9c7(0x8bf)]=Number(RegExp['$1']));if(_0x521d76[_0x1ed9c7(0x37e)](/<SCROLL LOCK Y>/i))this[_0x1ed9c7(0x843)]()[_0x1ed9c7(0x2c1)]=!![],this['centerCameraCheckData']()[_0x1ed9c7(0x592)]=_0x95952c[_0x1ed9c7(0x1cb)];else _0x521d76[_0x1ed9c7(0x37e)](/<SCROLL LOCK Y: (.*?)>/i)&&(this['centerCameraCheckData']()[_0x1ed9c7(0x2c1)]=!![],this[_0x1ed9c7(0x843)]()[_0x1ed9c7(0x592)]=Number(RegExp['$1']));},Game_Map[_0x2a005f(0x7d8)][_0x2a005f(0x636)]=function(){const _0x2b5e07=_0x2a005f;if(this[_0x2b5e07(0x4ba)]===undefined)this[_0x2b5e07(0x8cf)]();return this[_0x2b5e07(0x4ba)];},Game_Map['prototype'][_0x2a005f(0x6ad)]=function(){const _0x36a35d=_0x2a005f,_0x533436=VisuMZ['CoreEngine']['Settings'][_0x36a35d(0x7e3)];this[_0x36a35d(0x1ee)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x533436[_0x36a35d(0x3c5)]){const _0x3bdf36=Graphics[_0x36a35d(0x4c6)]/this['tileWidth']();_0x3bdf36%0x1!==0x0&&Math[_0x36a35d(0x187)](_0x3bdf36)===this[_0x36a35d(0x4c6)]()&&!this[_0x36a35d(0x644)]()&&(this['_centerCameraCheck']['centerX']=!![],this['_centerCameraCheck'][_0x36a35d(0x8bf)]=_0x533436['DisplayLockX']||0x0);}if(_0x533436['AutoScrollLockY']){const _0x243a91=Graphics[_0x36a35d(0x8b8)]/this['tileHeight']();_0x243a91%0x1!==0x0&&Math[_0x36a35d(0x187)](_0x243a91)===this[_0x36a35d(0x8b8)]()&&!this[_0x36a35d(0x619)]()&&(this[_0x36a35d(0x1ee)][_0x36a35d(0x2c1)]=!![],this['_centerCameraCheck']['displayY']=_0x533436[_0x36a35d(0x1cb)]||0x0);}},Game_Map['prototype'][_0x2a005f(0x843)]=function(){const _0x1390e0=_0x2a005f;if(this[_0x1390e0(0x1ee)]===undefined)this[_0x1390e0(0x6ad)]();return this['_centerCameraCheck'];},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x290)]=Game_Map[_0x2a005f(0x7d8)][_0x2a005f(0x785)],Game_Map[_0x2a005f(0x7d8)]['scrollDown']=function(_0x812781){const _0x325e62=_0x2a005f;if(this['centerCameraCheckData']()['centerY']&&$gameScreen[_0x325e62(0x825)]()===0x1){this[_0x325e62(0x534)]=this['centerCameraCheckData']()[_0x325e62(0x592)];return;}VisuMZ['CoreEngine']['Game_Map_scrollDown']['call'](this,_0x812781);},VisuMZ[_0x2a005f(0x63d)]['Game_Map_scrollLeft']=Game_Map['prototype'][_0x2a005f(0x850)],Game_Map['prototype']['scrollLeft']=function(_0x21ced8){const _0x34c28f=_0x2a005f;if(this[_0x34c28f(0x843)]()['centerX']&&$gameScreen[_0x34c28f(0x825)]()===0x1){this[_0x34c28f(0x8bd)]=this[_0x34c28f(0x843)]()[_0x34c28f(0x8bf)];return;}VisuMZ[_0x34c28f(0x63d)][_0x34c28f(0x5ce)][_0x34c28f(0x873)](this,_0x21ced8);},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x5f7)]=Game_Map[_0x2a005f(0x7d8)][_0x2a005f(0x489)],Game_Map[_0x2a005f(0x7d8)]['scrollRight']=function(_0xb93a39){const _0x42655f=_0x2a005f;if(this[_0x42655f(0x843)]()[_0x42655f(0x67a)]&&$gameScreen[_0x42655f(0x825)]()===0x1){this['_displayX']=this['centerCameraCheckData']()[_0x42655f(0x8bf)];return;}VisuMZ[_0x42655f(0x63d)]['Game_Map_scrollRight'][_0x42655f(0x873)](this,_0xb93a39);},VisuMZ[_0x2a005f(0x63d)]['Game_Map_scrollUp']=Game_Map[_0x2a005f(0x7d8)][_0x2a005f(0x3b5)],Game_Map[_0x2a005f(0x7d8)][_0x2a005f(0x3b5)]=function(_0x5a7e9b){const _0x3606dd=_0x2a005f;if(this[_0x3606dd(0x843)]()[_0x3606dd(0x2c1)]&&$gameScreen[_0x3606dd(0x825)]()===0x1){this[_0x3606dd(0x534)]=this[_0x3606dd(0x843)]()['displayY'];return;}VisuMZ[_0x3606dd(0x63d)]['Game_Map_scrollUp'][_0x3606dd(0x873)](this,_0x5a7e9b);},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x757)]=Game_Character[_0x2a005f(0x7d8)][_0x2a005f(0x606)],Game_Character[_0x2a005f(0x7d8)][_0x2a005f(0x606)]=function(_0x26c3b6){const _0x1d8a4e=_0x2a005f;try{VisuMZ[_0x1d8a4e(0x63d)][_0x1d8a4e(0x757)][_0x1d8a4e(0x873)](this,_0x26c3b6);}catch(_0x18e951){if($gameTemp['isPlaytest']())console[_0x1d8a4e(0x6d8)](_0x18e951);}},Game_Player[_0x2a005f(0x7d8)][_0x2a005f(0x5e2)]=function(){const _0x168989=_0x2a005f,_0x452bf6=$gameMap[_0x168989(0x23b)]();this[_0x168989(0x270)]=Math[_0x168989(0x88b)](_0x452bf6)+Math[_0x168989(0x88b)](_0x452bf6)+this[_0x168989(0x349)]();},Game_Player['prototype'][_0x2a005f(0x349)]=function(){const _0x30e29c=_0x2a005f;return $dataMap&&$dataMap['note']&&$dataMap[_0x30e29c(0x6d3)]['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ['CoreEngine']['Settings'][_0x30e29c(0x213)][_0x30e29c(0x5f5)];},VisuMZ['CoreEngine'][_0x2a005f(0x6e9)]=Game_Event[_0x2a005f(0x7d8)][_0x2a005f(0x842)],Game_Event[_0x2a005f(0x7d8)][_0x2a005f(0x842)]=function(_0x39210f,_0x51c12a){const _0x1d9cc5=_0x2a005f;return this[_0x1d9cc5(0x419)]()?this[_0x1d9cc5(0x16e)](_0x39210f,_0x51c12a):VisuMZ[_0x1d9cc5(0x63d)][_0x1d9cc5(0x6e9)][_0x1d9cc5(0x873)](this,_0x39210f,_0x51c12a);},Game_Event[_0x2a005f(0x7d8)]['isSmartEventCollisionOn']=function(){const _0x10fe27=_0x2a005f;return VisuMZ[_0x10fe27(0x63d)]['Settings'][_0x10fe27(0x213)][_0x10fe27(0x2f4)];},Game_Event['prototype'][_0x2a005f(0x16e)]=function(_0x558b43,_0x969df8){const _0x1607ec=_0x2a005f;if(!this['isNormalPriority']())return![];else{const _0x3363ec=$gameMap['eventsXyNt'](_0x558b43,_0x969df8)[_0x1607ec(0x3df)](_0x5369f5=>_0x5369f5[_0x1607ec(0x7d1)]());return _0x3363ec[_0x1607ec(0x7c3)]>0x0;}},VisuMZ['CoreEngine']['Game_Interpreter_command105']=Game_Interpreter[_0x2a005f(0x7d8)]['command105'],Game_Interpreter[_0x2a005f(0x7d8)][_0x2a005f(0x89c)]=function(_0x3c766f){const _0x19c84a=_0x2a005f,_0x4a9003=this['getCombinedScrollingText']();return _0x4a9003[_0x19c84a(0x37e)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x19c84a(0x85e)](_0x4a9003):VisuMZ[_0x19c84a(0x63d)]['Game_Interpreter_command105']['call'](this,_0x3c766f);},Game_Interpreter[_0x2a005f(0x7d8)][_0x2a005f(0x645)]=function(){const _0xa70e74=_0x2a005f;let _0x373a12='',_0x4f60f7=this[_0xa70e74(0x8aa)]+0x1;while(this['_list'][_0x4f60f7]&&this[_0xa70e74(0x18d)][_0x4f60f7][_0xa70e74(0x6c6)]===0x195){_0x373a12+=this[_0xa70e74(0x18d)][_0x4f60f7][_0xa70e74(0x669)][0x0]+'\x0a',_0x4f60f7++;}return _0x373a12;},Game_Interpreter['prototype']['runCombinedScrollingTextAsCode']=function(_0x6983dd){const _0x49198d=_0x2a005f;try{eval(_0x6983dd);}catch(_0x26062f){$gameTemp[_0x49198d(0x7c6)]()&&(console[_0x49198d(0x6d8)](_0x49198d(0x3a4)),console[_0x49198d(0x6d8)](_0x26062f));}return!![];},VisuMZ[_0x2a005f(0x63d)]['Game_Interpreter_command111']=Game_Interpreter[_0x2a005f(0x7d8)]['command111'],Game_Interpreter[_0x2a005f(0x7d8)][_0x2a005f(0x55f)]=function(_0x656358){const _0x1a3fef=_0x2a005f;try{VisuMZ['CoreEngine']['Game_Interpreter_command111'][_0x1a3fef(0x873)](this,_0x656358);}catch(_0x1e994e){$gameTemp['isPlaytest']()&&(console[_0x1a3fef(0x6d8)](_0x1a3fef(0x4c7)),console['log'](_0x1e994e)),this['skipBranch']();}return!![];},VisuMZ['CoreEngine'][_0x2a005f(0x545)]=Game_Interpreter[_0x2a005f(0x7d8)][_0x2a005f(0x22a)],Game_Interpreter[_0x2a005f(0x7d8)]['command122']=function(_0x40e911){const _0x3dc32e=_0x2a005f;try{VisuMZ[_0x3dc32e(0x63d)][_0x3dc32e(0x545)][_0x3dc32e(0x873)](this,_0x40e911);}catch(_0x38d751){$gameTemp['isPlaytest']()&&(console['log']('Control\x20Variables\x20Script\x20Error'),console[_0x3dc32e(0x6d8)](_0x38d751));}return!![];},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x565)]=Game_Interpreter[_0x2a005f(0x7d8)][_0x2a005f(0x1fb)],Game_Interpreter[_0x2a005f(0x7d8)][_0x2a005f(0x1fb)]=function(){const _0x773de6=_0x2a005f;try{VisuMZ['CoreEngine'][_0x773de6(0x565)][_0x773de6(0x873)](this);}catch(_0x5521f1){$gameTemp['isPlaytest']()&&(console[_0x773de6(0x6d8)](_0x773de6(0x23d)),console[_0x773de6(0x6d8)](_0x5521f1));}return!![];},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x773)]=Game_Interpreter['prototype']['command357'],Game_Interpreter[_0x2a005f(0x7d8)][_0x2a005f(0x537)]=function(_0x155572){const _0x11d6b4=_0x2a005f;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ['CoreEngine'][_0x11d6b4(0x773)][_0x11d6b4(0x873)](this,_0x155572);},Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x7ac)]=function(){const _0xefe85f=_0x2a005f;return VisuMZ['CoreEngine']['Settings']['UI'][_0xefe85f(0x271)];},Scene_Base[_0x2a005f(0x7d8)]['isBottomHelpMode']=function(){const _0x327bde=_0x2a005f;return VisuMZ[_0x327bde(0x63d)][_0x327bde(0x52e)]['UI'][_0x327bde(0x49e)];},Scene_Base['prototype'][_0x2a005f(0x3af)]=function(){const _0x2e2375=_0x2a005f;return VisuMZ[_0x2e2375(0x63d)][_0x2e2375(0x52e)]['UI'][_0x2e2375(0x59e)];},Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x48d)]=function(){const _0x198e83=_0x2a005f;return VisuMZ[_0x198e83(0x63d)][_0x198e83(0x52e)]['UI'][_0x198e83(0x5df)];},Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x76f)]=function(){const _0x4e8ae7=_0x2a005f;return VisuMZ['CoreEngine']['Settings']['UI'][_0x4e8ae7(0x285)];},Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x589)]=function(){const _0x5b2eee=_0x2a005f;return VisuMZ['CoreEngine']['Settings']['UI'][_0x5b2eee(0x64d)];},Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x34d)]=function(){const _0xf23b9b=_0x2a005f;return VisuMZ[_0xf23b9b(0x63d)]['Settings'][_0xf23b9b(0x444)][_0xf23b9b(0x1c3)];},VisuMZ['CoreEngine'][_0x2a005f(0x2ab)]=Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x8ce)],Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x8ce)]=function(){const _0x4666c9=_0x2a005f;VisuMZ[_0x4666c9(0x63d)][_0x4666c9(0x2ab)]['call'](this),this[_0x4666c9(0x5a5)](),this[_0x4666c9(0x38a)]['x']=Math['round'](this[_0x4666c9(0x38a)]['x']),this[_0x4666c9(0x38a)]['y']=Math[_0x4666c9(0x57f)](this[_0x4666c9(0x38a)]['y']);},Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x5a5)]=function(){},Scene_Base['prototype'][_0x2a005f(0x411)]=function(){const _0x5c3713=_0x2a005f;return TextManager[_0x5c3713(0x32f)](_0x5c3713(0x23a),'pagedown');},Scene_Base['prototype']['buttonAssistKey2']=function(){const _0x429e71=_0x2a005f;return TextManager['getInputButtonString'](_0x429e71(0x52a));},Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x2ea)]=function(){const _0x5cd449=_0x2a005f;return TextManager[_0x5cd449(0x5bf)](_0x5cd449(0x7c7));},Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x4a1)]=function(){const _0x2e88b5=_0x2a005f;return TextManager[_0x2e88b5(0x5bf)]('ok');},Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x47f)]=function(){const _0x3ae35c=_0x2a005f;return TextManager['getInputButtonString'](_0x3ae35c(0x5f2));},Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x4ff)]=function(){const _0x31b6b4=_0x2a005f;return this[_0x31b6b4(0x7a4)]&&this[_0x31b6b4(0x7a4)][_0x31b6b4(0x554)]?TextManager[_0x31b6b4(0x5b0)]:'';},Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x3e5)]=function(){return'';},Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x278)]=function(){return'';},Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x582)]=function(){return TextManager['buttonAssistOk'];},Scene_Base[_0x2a005f(0x7d8)]['buttonAssistText5']=function(){return TextManager['buttonAssistCancel'];},Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x7d5)]=function(){return 0x0;},Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x3b2)]=function(){return 0x0;},Scene_Base['prototype'][_0x2a005f(0x262)]=function(){return 0x0;},Scene_Base['prototype'][_0x2a005f(0x664)]=function(){return 0x0;},Scene_Base[_0x2a005f(0x7d8)][_0x2a005f(0x3ca)]=function(){return 0x0;},VisuMZ['CoreEngine'][_0x2a005f(0x46f)]=Scene_Boot[_0x2a005f(0x7d8)][_0x2a005f(0x881)],Scene_Boot[_0x2a005f(0x7d8)][_0x2a005f(0x881)]=function(){const _0x3a2df2=_0x2a005f;VisuMZ[_0x3a2df2(0x63d)][_0x3a2df2(0x46f)]['call'](this),this[_0x3a2df2(0x293)]();},Scene_Boot[_0x2a005f(0x7d8)][_0x2a005f(0x293)]=function(){const _0x2a5a4a=_0x2a005f,_0x48a495=[_0x2a5a4a(0x30e),_0x2a5a4a(0x199),_0x2a5a4a(0x53d),_0x2a5a4a(0x3d5),'enemies',_0x2a5a4a(0x8ba),'parallaxes',_0x2a5a4a(0x533),_0x2a5a4a(0x68e),_0x2a5a4a(0x6b3),_0x2a5a4a(0x4f8),'tilesets',_0x2a5a4a(0x3dd),_0x2a5a4a(0x73a)];for(const _0x1ed439 of _0x48a495){const _0x1eb9dc=VisuMZ[_0x2a5a4a(0x63d)]['Settings']['ImgLoad'][_0x1ed439],_0x200d45='img/%1/'[_0x2a5a4a(0x594)](_0x1ed439);for(const _0x1544e8 of _0x1eb9dc){ImageManager[_0x2a5a4a(0x464)](_0x200d45,_0x1544e8);}}},VisuMZ[_0x2a005f(0x63d)]['Scene_Boot_startNormalGame']=Scene_Boot[_0x2a005f(0x7d8)]['startNormalGame'],Scene_Boot['prototype'][_0x2a005f(0x56c)]=function(){const _0x5b484b=_0x2a005f;Utils[_0x5b484b(0x69d)](_0x5b484b(0x61b))&&VisuMZ[_0x5b484b(0x63d)][_0x5b484b(0x52e)]['QoL'][_0x5b484b(0x6ba)]?this[_0x5b484b(0x736)]():VisuMZ[_0x5b484b(0x63d)][_0x5b484b(0x39b)][_0x5b484b(0x873)](this);},Scene_Boot['prototype'][_0x2a005f(0x736)]=function(){const _0x1619b3=_0x2a005f;DataManager['setupNewGame'](),SceneManager[_0x1619b3(0x83d)](Scene_Map);},Scene_Boot['prototype']['adjustBoxSize']=function(){const _0x2c411f=_0x2a005f,_0x22712b=$dataSystem[_0x2c411f(0x273)][_0x2c411f(0x82b)],_0x3f7531=$dataSystem[_0x2c411f(0x273)]['uiAreaHeight'],_0x11fc46=VisuMZ[_0x2c411f(0x63d)][_0x2c411f(0x52e)]['UI']['BoxMargin'];Graphics[_0x2c411f(0x7b1)]=_0x22712b-_0x11fc46*0x2,Graphics[_0x2c411f(0x4b9)]=_0x3f7531-_0x11fc46*0x2,this[_0x2c411f(0x620)]();},VisuMZ[_0x2a005f(0x63d)]['Scene_Boot_updateDocumentTitle']=Scene_Boot[_0x2a005f(0x7d8)]['updateDocumentTitle'],Scene_Boot[_0x2a005f(0x7d8)][_0x2a005f(0x729)]=function(){const _0x2eb38c=_0x2a005f;this[_0x2eb38c(0x4ac)]()?this[_0x2eb38c(0x344)]():VisuMZ[_0x2eb38c(0x63d)][_0x2eb38c(0x6c5)][_0x2eb38c(0x873)](this);},Scene_Boot['prototype'][_0x2a005f(0x4ac)]=function(){const _0x4c532b=_0x2a005f;if(Scene_Title[_0x4c532b(0x257)]==='')return![];if(Scene_Title[_0x4c532b(0x257)]==='Subtitle')return![];if(Scene_Title['version']==='')return![];if(Scene_Title[_0x4c532b(0x7c9)]===_0x4c532b(0x45a))return![];return!![];},Scene_Boot[_0x2a005f(0x7d8)]['makeDocumentTitle']=function(){const _0x16b328=_0x2a005f,_0x2ba5c4=$dataSystem['gameTitle'],_0x4d5097=Scene_Title[_0x16b328(0x257)]||'',_0x469278=Scene_Title[_0x16b328(0x7c9)]||'',_0x2625c1=VisuMZ[_0x16b328(0x63d)][_0x16b328(0x52e)][_0x16b328(0x79c)][_0x16b328(0x22f)][_0x16b328(0x5d7)],_0x2850e0=_0x2625c1[_0x16b328(0x594)](_0x2ba5c4,_0x4d5097,_0x469278);document[_0x16b328(0x441)]=_0x2850e0;},Scene_Boot[_0x2a005f(0x7d8)][_0x2a005f(0x620)]=function(){const _0x4c91e6=_0x2a005f;if(VisuMZ[_0x4c91e6(0x63d)][_0x4c91e6(0x52e)]['UI'][_0x4c91e6(0x1ad)]){const _0x2d1f97=Graphics[_0x4c91e6(0x4c6)]-Graphics['boxWidth']-VisuMZ['CoreEngine'][_0x4c91e6(0x52e)]['UI']['BoxMargin']*0x2,_0x1eb472=Sprite_Button['prototype'][_0x4c91e6(0x1ac)][_0x4c91e6(0x873)](this)*0x4;if(_0x2d1f97>=_0x1eb472)SceneManager['setSideButtonLayout'](!![]);}},Scene_Title[_0x2a005f(0x257)]=VisuMZ[_0x2a005f(0x63d)]['Settings'][_0x2a005f(0x79c)][_0x2a005f(0x22f)][_0x2a005f(0x58a)],Scene_Title['version']=VisuMZ[_0x2a005f(0x63d)]['Settings'][_0x2a005f(0x79c)][_0x2a005f(0x22f)][_0x2a005f(0x596)],Scene_Title[_0x2a005f(0x7af)]=VisuMZ['CoreEngine'][_0x2a005f(0x52e)][_0x2a005f(0x38e)],VisuMZ['CoreEngine']['Scene_Title_drawGameTitle']=Scene_Title[_0x2a005f(0x7d8)][_0x2a005f(0x7d7)],Scene_Title[_0x2a005f(0x7d8)][_0x2a005f(0x7d7)]=function(){const _0x2b9f96=_0x2a005f;VisuMZ[_0x2b9f96(0x63d)][_0x2b9f96(0x52e)][_0x2b9f96(0x79c)][_0x2b9f96(0x22f)][_0x2b9f96(0x7d7)][_0x2b9f96(0x873)](this);if(Scene_Title[_0x2b9f96(0x257)]!==''&&Scene_Title['subtitle']!==_0x2b9f96(0x58a))this[_0x2b9f96(0x7e6)]();if(Scene_Title[_0x2b9f96(0x7c9)]!==''&&Scene_Title[_0x2b9f96(0x7c9)]!==_0x2b9f96(0x45a))this[_0x2b9f96(0x521)]();},Scene_Title[_0x2a005f(0x7d8)]['drawGameSubtitle']=function(){const _0x195b0e=_0x2a005f;VisuMZ[_0x195b0e(0x63d)]['Settings'][_0x195b0e(0x79c)][_0x195b0e(0x22f)][_0x195b0e(0x7e6)]['call'](this);},Scene_Title[_0x2a005f(0x7d8)][_0x2a005f(0x521)]=function(){const _0x5ab0c4=_0x2a005f;VisuMZ['CoreEngine'][_0x5ab0c4(0x52e)][_0x5ab0c4(0x79c)][_0x5ab0c4(0x22f)][_0x5ab0c4(0x521)][_0x5ab0c4(0x873)](this);},Scene_Title[_0x2a005f(0x7d8)][_0x2a005f(0x3c3)]=function(){const _0x577c2f=_0x2a005f;this[_0x577c2f(0x217)]();const _0xa152a7=$dataSystem[_0x577c2f(0x4e7)]['background'],_0x3b7460=this['commandWindowRect']();this[_0x577c2f(0x8c0)]=new Window_TitleCommand(_0x3b7460),this[_0x577c2f(0x8c0)][_0x577c2f(0x816)](_0xa152a7);const _0xc6075e=this[_0x577c2f(0x2e3)]();this[_0x577c2f(0x8c0)]['move'](_0xc6075e['x'],_0xc6075e['y'],_0xc6075e['width'],_0xc6075e[_0x577c2f(0x8b8)]),this['_commandWindow'][_0x577c2f(0x622)](),this[_0x577c2f(0x8c0)][_0x577c2f(0x32a)](),this[_0x577c2f(0x8c0)][_0x577c2f(0x45b)](),this[_0x577c2f(0x430)](this[_0x577c2f(0x8c0)]);},Scene_Title[_0x2a005f(0x7d8)][_0x2a005f(0x8b3)]=function(){const _0x1038de=_0x2a005f;return this[_0x1038de(0x8c0)]?this[_0x1038de(0x8c0)]['maxItems']():VisuMZ[_0x1038de(0x63d)][_0x1038de(0x52e)]['TitleCommandList'][_0x1038de(0x7c3)];},Scene_Title[_0x2a005f(0x7d8)][_0x2a005f(0x2e3)]=function(){const _0x43e858=_0x2a005f;return VisuMZ[_0x43e858(0x63d)][_0x43e858(0x52e)][_0x43e858(0x79c)][_0x43e858(0x22f)][_0x43e858(0x34e)]['call'](this);},Scene_Title[_0x2a005f(0x7d8)][_0x2a005f(0x217)]=function(){const _0x398b94=_0x2a005f;for(const _0x327fda of Scene_Title[_0x398b94(0x7af)]){const _0x4596be=new Sprite_TitlePictureButton(_0x327fda);this[_0x398b94(0x22e)](_0x4596be);}},VisuMZ[_0x2a005f(0x63d)]['Scene_Map_initialize']=Scene_Map[_0x2a005f(0x7d8)][_0x2a005f(0x72f)],Scene_Map[_0x2a005f(0x7d8)][_0x2a005f(0x72f)]=function(){const _0x2bbbe5=_0x2a005f;VisuMZ[_0x2bbbe5(0x63d)][_0x2bbbe5(0x7a2)][_0x2bbbe5(0x873)](this),$gameTemp[_0x2bbbe5(0x625)](),this[_0x2bbbe5(0x8d6)]();},VisuMZ['CoreEngine'][_0x2a005f(0x896)]=Scene_Map[_0x2a005f(0x7d8)][_0x2a005f(0x184)],Scene_Map[_0x2a005f(0x7d8)]['updateMainMultiply']=function(){const _0x557fe5=_0x2a005f;VisuMZ[_0x557fe5(0x63d)][_0x557fe5(0x896)][_0x557fe5(0x873)](this),$gameTemp[_0x557fe5(0x365)]&&!$gameMessage[_0x557fe5(0x321)]()&&(this[_0x557fe5(0x2b1)](),SceneManager[_0x557fe5(0x794)]());},Scene_Map[_0x2a005f(0x7d8)][_0x2a005f(0x629)]=function(){const _0xcb8397=_0x2a005f;Scene_Message[_0xcb8397(0x7d8)]['terminate'][_0xcb8397(0x873)](this),!SceneManager[_0xcb8397(0x4d6)](Scene_Battle)&&(this['_spriteset'][_0xcb8397(0x457)](),this['_mapNameWindow'][_0xcb8397(0x215)](),this['_windowLayer'][_0xcb8397(0x554)]=![],SceneManager[_0xcb8397(0x448)]()),$gameScreen[_0xcb8397(0x1da)](),this[_0xcb8397(0x8d6)]();},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x48e)]=Scene_Map[_0x2a005f(0x7d8)][_0x2a005f(0x5be)],Scene_Map['prototype'][_0x2a005f(0x5be)]=function(){const _0x4ba0cd=_0x2a005f;VisuMZ['CoreEngine'][_0x4ba0cd(0x48e)][_0x4ba0cd(0x873)](this),SceneManager[_0x4ba0cd(0x3c0)]()&&this[_0x4ba0cd(0x747)]();},Scene_Map['prototype'][_0x2a005f(0x747)]=function(){const _0x260efd=_0x2a005f;this[_0x260efd(0x4ec)]['x']=Graphics[_0x260efd(0x7b1)]+0x4;},VisuMZ[_0x2a005f(0x63d)]['Scene_Map_updateScene']=Scene_Map['prototype'][_0x2a005f(0x25c)],Scene_Map[_0x2a005f(0x7d8)][_0x2a005f(0x25c)]=function(){const _0x22db7d=_0x2a005f;VisuMZ[_0x22db7d(0x63d)]['Scene_Map_updateScene']['call'](this),this[_0x22db7d(0x480)]();},Scene_Map[_0x2a005f(0x7d8)]['updateDashToggle']=function(){const _0x2bb86c=_0x2a005f;Input['isTriggered'](_0x2bb86c(0x6d4))&&(ConfigManager[_0x2bb86c(0x7d6)]=!ConfigManager[_0x2bb86c(0x7d6)],ConfigManager['save']());},VisuMZ[_0x2a005f(0x63d)]['Scene_Map_updateMain']=Scene_Map[_0x2a005f(0x7d8)][_0x2a005f(0x2b1)],Scene_Map[_0x2a005f(0x7d8)][_0x2a005f(0x2b1)]=function(){const _0x5ebe7e=_0x2a005f;VisuMZ['CoreEngine']['Scene_Map_updateMain'][_0x5ebe7e(0x873)](this),this[_0x5ebe7e(0x1b5)]();},Scene_Map[_0x2a005f(0x7d8)]['clearOnceParallelInterpreters']=function(){const _0x2b0bd8=_0x2a005f;this[_0x2b0bd8(0x30f)]=[];},Scene_Map[_0x2a005f(0x7d8)][_0x2a005f(0x1b5)]=function(){const _0x3fbec0=_0x2a005f;if(!this[_0x3fbec0(0x30f)])return;for(const _0x57a1e1 of this['_onceParallelInterpreters']){_0x57a1e1&&_0x57a1e1['update']();}},Scene_Map[_0x2a005f(0x7d8)]['playOnceParallelInterpreter']=function(_0x292701){const _0x30b84d=_0x2a005f,_0x5a8ab4=$dataCommonEvents[_0x292701];if(!_0x5a8ab4)return;const _0x21bf6b=new Game_OnceParallelInterpreter();this[_0x30b84d(0x426)](_0x21bf6b),_0x21bf6b[_0x30b84d(0x4da)](_0x292701);},Scene_Map[_0x2a005f(0x7d8)]['addOnceParallelInterpreter']=function(_0x5c5dd4){const _0x454077=_0x2a005f;this[_0x454077(0x30f)]=this[_0x454077(0x30f)]||[],this['_onceParallelInterpreters'][_0x454077(0x1fe)](_0x5c5dd4);},Scene_Map[_0x2a005f(0x7d8)]['removeOnceParallelInterpreter']=function(_0xb807bc){const _0x315505=_0x2a005f;this[_0x315505(0x30f)]=this[_0x315505(0x30f)]||[],this[_0x315505(0x30f)]['remove'](_0xb807bc);};function Game_OnceParallelInterpreter(){this['initialize'](...arguments);}Game_OnceParallelInterpreter[_0x2a005f(0x7d8)]=Object[_0x2a005f(0x18c)](Game_Interpreter['prototype']),Game_OnceParallelInterpreter[_0x2a005f(0x7d8)]['constructor']=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter['prototype'][_0x2a005f(0x4da)]=function(_0x55379b){const _0xec82e5=_0x2a005f,_0xd41578=$dataCommonEvents[_0x55379b];_0xd41578?this[_0xec82e5(0x182)](_0xd41578[_0xec82e5(0x617)],0x0):this[_0xec82e5(0x629)]();},Game_OnceParallelInterpreter['prototype'][_0x2a005f(0x629)]=function(){const _0x4bb843=_0x2a005f;if(!SceneManager[_0x4bb843(0x630)]())return;SceneManager['_scene']['removeOnceParallelInterpreter'](this),Game_Interpreter[_0x4bb843(0x7d8)][_0x4bb843(0x629)][_0x4bb843(0x873)](this);},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x1ba)]=Scene_MenuBase[_0x2a005f(0x7d8)][_0x2a005f(0x4c1)],Scene_MenuBase['prototype'][_0x2a005f(0x4c1)]=function(){const _0x21493b=_0x2a005f;let _0x40f767=0x0;return SceneManager[_0x21493b(0x716)]()?_0x40f767=this[_0x21493b(0x49f)]():_0x40f767=VisuMZ[_0x21493b(0x63d)][_0x21493b(0x1ba)]['call'](this),_0x40f767;},Scene_MenuBase['prototype'][_0x2a005f(0x49f)]=function(){const _0x270a89=_0x2a005f;return this[_0x270a89(0x174)]()?this[_0x270a89(0x7f9)]():0x0;},VisuMZ[_0x2a005f(0x63d)]['Scene_MenuBase_mainAreaTop']=Scene_MenuBase[_0x2a005f(0x7d8)]['mainAreaTop'],Scene_MenuBase[_0x2a005f(0x7d8)][_0x2a005f(0x323)]=function(){const _0x5bf790=_0x2a005f;return SceneManager['areButtonsOutsideMainUI']()?this[_0x5bf790(0x5a0)]():VisuMZ[_0x5bf790(0x63d)][_0x5bf790(0x1b6)][_0x5bf790(0x873)](this);},Scene_MenuBase[_0x2a005f(0x7d8)]['mainAreaTopSideButtonLayout']=function(){const _0x4384bd=_0x2a005f;if(!this['isBottomHelpMode']())return this[_0x4384bd(0x882)]();else return this[_0x4384bd(0x43e)]()&&this[_0x4384bd(0x82e)]()==='top'?Window_ButtonAssist['prototype'][_0x4384bd(0x59b)]():0x0;},VisuMZ[_0x2a005f(0x63d)]['Scene_MenuBase_mainAreaHeight']=Scene_MenuBase['prototype'][_0x2a005f(0x2d4)],Scene_MenuBase[_0x2a005f(0x7d8)]['mainAreaHeight']=function(){const _0xa52e59=_0x2a005f;let _0x477786=0x0;return SceneManager[_0xa52e59(0x716)]()?_0x477786=this[_0xa52e59(0x5ff)]():_0x477786=VisuMZ['CoreEngine'][_0xa52e59(0x5e9)][_0xa52e59(0x873)](this),this['isMenuButtonAssistEnabled']()&&this[_0xa52e59(0x82e)]()!=='button'&&(_0x477786-=Window_ButtonAssist[_0xa52e59(0x7d8)]['lineHeight']()),_0x477786;},Scene_MenuBase[_0x2a005f(0x7d8)][_0x2a005f(0x5ff)]=function(){const _0x1d9111=_0x2a005f;return Graphics['boxHeight']-this[_0x1d9111(0x75f)]();},VisuMZ['CoreEngine'][_0x2a005f(0x7cd)]=Scene_MenuBase[_0x2a005f(0x7d8)][_0x2a005f(0x8ac)],Scene_MenuBase[_0x2a005f(0x7d8)][_0x2a005f(0x8ac)]=function(){const _0x38ab87=_0x2a005f,_0x4ec419=VisuMZ[_0x38ab87(0x63d)][_0x38ab87(0x52e)][_0x38ab87(0x55b)][_0x38ab87(0x730)]??0x8;this['_backgroundFilter']=new PIXI[(_0x38ab87(0x624))][(_0x38ab87(0x510))](_0x4ec419),this[_0x38ab87(0x3f4)]=new Sprite(),this[_0x38ab87(0x3f4)][_0x38ab87(0x5af)]=SceneManager['backgroundBitmap'](),this[_0x38ab87(0x3f4)]['filters']=[this[_0x38ab87(0x7a0)]],this[_0x38ab87(0x22e)](this['_backgroundSprite']),this[_0x38ab87(0x623)](0xc0),this[_0x38ab87(0x623)](this[_0x38ab87(0x615)]()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x2a005f(0x7d8)][_0x2a005f(0x615)]=function(){const _0xbf9f8b=_0x2a005f,_0x58f3bf=String(this[_0xbf9f8b(0x2bc)][_0xbf9f8b(0x762)]),_0x209dbc=this[_0xbf9f8b(0x436)](_0x58f3bf);return _0x209dbc?_0x209dbc['SnapshotOpacity']:0xc0;},Scene_MenuBase['prototype']['createCustomBackgroundImages']=function(){const _0x316f2c=_0x2a005f,_0x3ba3e3=String(this[_0x316f2c(0x2bc)][_0x316f2c(0x762)]),_0x1d5247=this[_0x316f2c(0x436)](_0x3ba3e3);_0x1d5247&&(_0x1d5247[_0x316f2c(0x25e)]!==''||_0x1d5247[_0x316f2c(0x672)]!=='')&&(this[_0x316f2c(0x5bb)]=new Sprite(ImageManager[_0x316f2c(0x3f8)](_0x1d5247[_0x316f2c(0x25e)])),this[_0x316f2c(0x40d)]=new Sprite(ImageManager[_0x316f2c(0x6b2)](_0x1d5247['BgFilename2'])),this[_0x316f2c(0x22e)](this[_0x316f2c(0x5bb)]),this[_0x316f2c(0x22e)](this[_0x316f2c(0x40d)]),this['_backSprite1']['bitmap'][_0x316f2c(0x833)](this[_0x316f2c(0x8b4)][_0x316f2c(0x80d)](this,this[_0x316f2c(0x5bb)])),this[_0x316f2c(0x40d)][_0x316f2c(0x5af)]['addLoadListener'](this[_0x316f2c(0x8b4)]['bind'](this,this[_0x316f2c(0x40d)])));},Scene_MenuBase[_0x2a005f(0x7d8)][_0x2a005f(0x436)]=function(_0x357a90){const _0xdea6d5=_0x2a005f;return VisuMZ['CoreEngine'][_0xdea6d5(0x52e)][_0xdea6d5(0x55b)][_0x357a90]||VisuMZ['CoreEngine'][_0xdea6d5(0x52e)][_0xdea6d5(0x55b)]['Scene_Unlisted'];},Scene_MenuBase['prototype']['adjustSprite']=function(_0x56b722){const _0x518ff6=_0x2a005f;this[_0x518ff6(0x329)](_0x56b722),this[_0x518ff6(0x3dc)](_0x56b722);},VisuMZ['CoreEngine'][_0x2a005f(0x4c5)]=Scene_MenuBase[_0x2a005f(0x7d8)][_0x2a005f(0x185)],Scene_MenuBase[_0x2a005f(0x7d8)]['createCancelButton']=function(){const _0x2ee7ba=_0x2a005f;VisuMZ['CoreEngine'][_0x2ee7ba(0x4c5)][_0x2ee7ba(0x873)](this),SceneManager[_0x2ee7ba(0x3c0)]()&&this[_0x2ee7ba(0x80f)]();},Scene_MenuBase[_0x2a005f(0x7d8)]['moveCancelButtonSideButtonLayout']=function(){const _0x503486=_0x2a005f;this[_0x503486(0x6bc)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x6c1)]=Scene_MenuBase[_0x2a005f(0x7d8)][_0x2a005f(0x7e2)],Scene_MenuBase[_0x2a005f(0x7d8)][_0x2a005f(0x7e2)]=function(){const _0x370e45=_0x2a005f;VisuMZ['CoreEngine']['Scene_MenuBase_createPageButtons'][_0x370e45(0x873)](this),SceneManager[_0x370e45(0x3c0)]()&&this[_0x370e45(0x837)]();},Scene_MenuBase[_0x2a005f(0x7d8)]['movePageButtonSideButtonLayout']=function(){const _0x222ea1=_0x2a005f;this[_0x222ea1(0x7a4)]['x']=-0x1*(this['_pageupButton'][_0x222ea1(0x4c6)]+this[_0x222ea1(0x4f5)][_0x222ea1(0x4c6)]+0x8),this[_0x222ea1(0x4f5)]['x']=-0x1*(this['_pagedownButton'][_0x222ea1(0x4c6)]+0x4);},Scene_MenuBase[_0x2a005f(0x7d8)][_0x2a005f(0x43e)]=function(){const _0x53bf2d=_0x2a005f;return VisuMZ['CoreEngine']['Settings'][_0x53bf2d(0x205)]['Enable'];},Scene_MenuBase[_0x2a005f(0x7d8)]['getButtonAssistLocation']=function(){const _0x574e78=_0x2a005f;return SceneManager[_0x574e78(0x3c0)]()||SceneManager['areButtonsHidden']()?VisuMZ[_0x574e78(0x63d)][_0x574e78(0x52e)]['ButtonAssist'][_0x574e78(0x8d8)]:_0x574e78(0x812);},Scene_MenuBase[_0x2a005f(0x7d8)]['createButtonAssistWindow']=function(){const _0x5d68ad=_0x2a005f;if(!this[_0x5d68ad(0x43e)]())return;const _0xaa1a16=this[_0x5d68ad(0x41e)]();this[_0x5d68ad(0x31a)]=new Window_ButtonAssist(_0xaa1a16),this[_0x5d68ad(0x430)](this[_0x5d68ad(0x31a)]);},Scene_MenuBase[_0x2a005f(0x7d8)]['buttonAssistWindowRect']=function(){const _0x225f24=_0x2a005f;return this[_0x225f24(0x82e)]()===_0x225f24(0x812)?this[_0x225f24(0x338)]():this[_0x225f24(0x1f6)]();},Scene_MenuBase[_0x2a005f(0x7d8)][_0x2a005f(0x338)]=function(){const _0x4c6a55=_0x2a005f,_0x44937e=ConfigManager['touchUI']?(Sprite_Button[_0x4c6a55(0x7d8)][_0x4c6a55(0x1ac)]()+0x6)*0x2:0x0,_0xaa3427=this[_0x4c6a55(0x197)](),_0x1f81a5=Graphics[_0x4c6a55(0x7b1)]-_0x44937e*0x2,_0x59da00=this[_0x4c6a55(0x589)]();return new Rectangle(_0x44937e,_0xaa3427,_0x1f81a5,_0x59da00);},Scene_MenuBase['prototype']['buttonAssistWindowSideRect']=function(){const _0xcdb0d1=_0x2a005f,_0x17dbd9=Graphics[_0xcdb0d1(0x7b1)],_0x109b5a=Window_ButtonAssist['prototype'][_0xcdb0d1(0x59b)](),_0x33c7fb=0x0;let _0x4b1ea4=0x0;return this[_0xcdb0d1(0x82e)]()===_0xcdb0d1(0x43a)?_0x4b1ea4=0x0:_0x4b1ea4=Graphics[_0xcdb0d1(0x4b9)]-_0x109b5a,new Rectangle(_0x33c7fb,_0x4b1ea4,_0x17dbd9,_0x109b5a);},Scene_Menu[_0x2a005f(0x5f9)]=VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x52e)][_0x2a005f(0x79c)][_0x2a005f(0x858)],VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x82a)]=Scene_Menu[_0x2a005f(0x7d8)][_0x2a005f(0x18c)],Scene_Menu[_0x2a005f(0x7d8)][_0x2a005f(0x18c)]=function(){const _0x4c789d=_0x2a005f;VisuMZ['CoreEngine'][_0x4c789d(0x82a)]['call'](this),this[_0x4c789d(0x71f)]();},Scene_Menu[_0x2a005f(0x7d8)][_0x2a005f(0x71f)]=function(){const _0x561cbc=_0x2a005f;this[_0x561cbc(0x8c0)]&&this['_commandWindow'][_0x561cbc(0x816)](Scene_Menu[_0x561cbc(0x5f9)][_0x561cbc(0x2f9)]),this[_0x561cbc(0x567)]&&this['_goldWindow']['setBackgroundType'](Scene_Menu[_0x561cbc(0x5f9)][_0x561cbc(0x849)]),this[_0x561cbc(0x3c2)]&&this[_0x561cbc(0x3c2)][_0x561cbc(0x816)](Scene_Menu[_0x561cbc(0x5f9)][_0x561cbc(0x2e0)]);},Scene_Menu[_0x2a005f(0x7d8)][_0x2a005f(0x2e3)]=function(){const _0x4ec6a5=_0x2a005f;return Scene_Menu[_0x4ec6a5(0x5f9)]['CommandRect'][_0x4ec6a5(0x873)](this);},Scene_Menu[_0x2a005f(0x7d8)][_0x2a005f(0x6ec)]=function(){const _0x1a6d5a=_0x2a005f;return Scene_Menu['layoutSettings'][_0x1a6d5a(0x2b5)][_0x1a6d5a(0x873)](this);},Scene_Menu['prototype'][_0x2a005f(0x5ad)]=function(){const _0x2b8cf7=_0x2a005f;return Scene_Menu[_0x2b8cf7(0x5f9)][_0x2b8cf7(0x69b)][_0x2b8cf7(0x873)](this);},Scene_Item[_0x2a005f(0x5f9)]=VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x52e)][_0x2a005f(0x79c)][_0x2a005f(0x3ff)],VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x429)]=Scene_Item[_0x2a005f(0x7d8)][_0x2a005f(0x18c)],Scene_Item[_0x2a005f(0x7d8)][_0x2a005f(0x18c)]=function(){const _0x3398ee=_0x2a005f;VisuMZ[_0x3398ee(0x63d)]['Scene_Item_create']['call'](this),this[_0x3398ee(0x71f)]();},Scene_Item[_0x2a005f(0x7d8)][_0x2a005f(0x71f)]=function(){const _0x4cd306=_0x2a005f;this['_helpWindow']&&this[_0x4cd306(0x357)][_0x4cd306(0x816)](Scene_Item[_0x4cd306(0x5f9)][_0x4cd306(0x780)]),this['_categoryWindow']&&this['_categoryWindow'][_0x4cd306(0x816)](Scene_Item['layoutSettings'][_0x4cd306(0x862)]),this['_itemWindow']&&this[_0x4cd306(0x4df)][_0x4cd306(0x816)](Scene_Item[_0x4cd306(0x5f9)][_0x4cd306(0x608)]),this[_0x4cd306(0x8c1)]&&this[_0x4cd306(0x8c1)]['setBackgroundType'](Scene_Item['layoutSettings'][_0x4cd306(0x308)]);},Scene_Item[_0x2a005f(0x7d8)][_0x2a005f(0x866)]=function(){const _0x2985d6=_0x2a005f;return Scene_Item[_0x2985d6(0x5f9)][_0x2985d6(0x875)]['call'](this);},Scene_Item[_0x2a005f(0x7d8)][_0x2a005f(0x634)]=function(){const _0x2e05fb=_0x2a005f;return Scene_Item['layoutSettings'][_0x2e05fb(0x58c)][_0x2e05fb(0x873)](this);},Scene_Item[_0x2a005f(0x7d8)][_0x2a005f(0x4b6)]=function(){const _0x161e1b=_0x2a005f;return Scene_Item['layoutSettings'][_0x161e1b(0x796)][_0x161e1b(0x873)](this);},Scene_Item[_0x2a005f(0x7d8)][_0x2a005f(0x6f0)]=function(){const _0x36707f=_0x2a005f;return Scene_Item[_0x36707f(0x5f9)]['ActorRect'][_0x36707f(0x873)](this);},Scene_Skill[_0x2a005f(0x5f9)]=VisuMZ['CoreEngine'][_0x2a005f(0x52e)][_0x2a005f(0x79c)][_0x2a005f(0x1e9)],VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x87b)]=Scene_Skill['prototype'][_0x2a005f(0x18c)],Scene_Skill['prototype'][_0x2a005f(0x18c)]=function(){const _0x4bddc1=_0x2a005f;VisuMZ[_0x4bddc1(0x63d)][_0x4bddc1(0x87b)][_0x4bddc1(0x873)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill[_0x2a005f(0x7d8)][_0x2a005f(0x71f)]=function(){const _0x1ad89b=_0x2a005f;this['_helpWindow']&&this[_0x1ad89b(0x357)][_0x1ad89b(0x816)](Scene_Skill[_0x1ad89b(0x5f9)][_0x1ad89b(0x780)]),this[_0x1ad89b(0x53f)]&&this['_skillTypeWindow']['setBackgroundType'](Scene_Skill['layoutSettings']['SkillTypeBgType']),this[_0x1ad89b(0x3c2)]&&this[_0x1ad89b(0x3c2)][_0x1ad89b(0x816)](Scene_Skill[_0x1ad89b(0x5f9)]['StatusBgType']),this['_itemWindow']&&this[_0x1ad89b(0x4df)][_0x1ad89b(0x816)](Scene_Skill['layoutSettings'][_0x1ad89b(0x608)]),this[_0x1ad89b(0x8c1)]&&this['_actorWindow'][_0x1ad89b(0x816)](Scene_Skill[_0x1ad89b(0x5f9)]['ActorBgType']);},Scene_Skill['prototype'][_0x2a005f(0x866)]=function(){const _0x558f78=_0x2a005f;return Scene_Skill[_0x558f78(0x5f9)][_0x558f78(0x875)][_0x558f78(0x873)](this);},Scene_Skill[_0x2a005f(0x7d8)][_0x2a005f(0x394)]=function(){const _0x2dd2e8=_0x2a005f;return Scene_Skill[_0x2dd2e8(0x5f9)][_0x2dd2e8(0x7b2)][_0x2dd2e8(0x873)](this);},Scene_Skill[_0x2a005f(0x7d8)][_0x2a005f(0x5ad)]=function(){const _0x2c15ad=_0x2a005f;return Scene_Skill[_0x2c15ad(0x5f9)][_0x2c15ad(0x69b)]['call'](this);},Scene_Skill['prototype'][_0x2a005f(0x4b6)]=function(){const _0x425381=_0x2a005f;return Scene_Skill['layoutSettings'][_0x425381(0x796)]['call'](this);},Scene_Skill['prototype']['actorWindowRect']=function(){const _0xd43a3c=_0x2a005f;return Scene_Skill[_0xd43a3c(0x5f9)][_0xd43a3c(0x6a7)]['call'](this);},Scene_Equip['layoutSettings']=VisuMZ[_0x2a005f(0x63d)]['Settings']['MenuLayout']['EquipMenu'],VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x739)]=Scene_Equip['prototype'][_0x2a005f(0x18c)],Scene_Equip[_0x2a005f(0x7d8)][_0x2a005f(0x18c)]=function(){const _0x1d772f=_0x2a005f;VisuMZ['CoreEngine'][_0x1d772f(0x739)][_0x1d772f(0x873)](this),this[_0x1d772f(0x71f)]();},Scene_Equip[_0x2a005f(0x7d8)]['setCoreEngineUpdateWindowBg']=function(){const _0x292f70=_0x2a005f;this[_0x292f70(0x357)]&&this[_0x292f70(0x357)]['setBackgroundType'](Scene_Equip[_0x292f70(0x5f9)][_0x292f70(0x780)]),this[_0x292f70(0x3c2)]&&this[_0x292f70(0x3c2)][_0x292f70(0x816)](Scene_Equip[_0x292f70(0x5f9)][_0x292f70(0x2e0)]),this[_0x292f70(0x8c0)]&&this[_0x292f70(0x8c0)][_0x292f70(0x816)](Scene_Equip[_0x292f70(0x5f9)][_0x292f70(0x2f9)]),this[_0x292f70(0x47e)]&&this[_0x292f70(0x47e)][_0x292f70(0x816)](Scene_Equip[_0x292f70(0x5f9)][_0x292f70(0x5c1)]),this[_0x292f70(0x4df)]&&this[_0x292f70(0x4df)][_0x292f70(0x816)](Scene_Equip[_0x292f70(0x5f9)][_0x292f70(0x608)]);},Scene_Equip[_0x2a005f(0x7d8)]['helpWindowRect']=function(){const _0x5754d9=_0x2a005f;return Scene_Equip[_0x5754d9(0x5f9)]['HelpRect'][_0x5754d9(0x873)](this);},Scene_Equip[_0x2a005f(0x7d8)][_0x2a005f(0x5ad)]=function(){const _0x23ea1b=_0x2a005f;return Scene_Equip[_0x23ea1b(0x5f9)][_0x23ea1b(0x69b)]['call'](this);},Scene_Equip[_0x2a005f(0x7d8)][_0x2a005f(0x2e3)]=function(){const _0x119349=_0x2a005f;return Scene_Equip[_0x119349(0x5f9)][_0x119349(0x34e)][_0x119349(0x873)](this);},Scene_Equip['prototype'][_0x2a005f(0x55a)]=function(){const _0x2d8514=_0x2a005f;return Scene_Equip[_0x2d8514(0x5f9)]['SlotRect'][_0x2d8514(0x873)](this);},Scene_Equip[_0x2a005f(0x7d8)]['itemWindowRect']=function(){const _0x2d2099=_0x2a005f;return Scene_Equip['layoutSettings'][_0x2d2099(0x796)]['call'](this);},Scene_Status[_0x2a005f(0x5f9)]=VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x52e)]['MenuLayout'][_0x2a005f(0x87f)],VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x333)]=Scene_Status[_0x2a005f(0x7d8)]['create'],Scene_Status[_0x2a005f(0x7d8)][_0x2a005f(0x18c)]=function(){const _0x2553ba=_0x2a005f;VisuMZ['CoreEngine'][_0x2553ba(0x333)]['call'](this),this[_0x2553ba(0x71f)]();},Scene_Status['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x2ea4ff=_0x2a005f;this[_0x2ea4ff(0x228)]&&this[_0x2ea4ff(0x228)][_0x2ea4ff(0x816)](Scene_Status['layoutSettings']['ProfileBgType']),this['_statusWindow']&&this['_statusWindow'][_0x2ea4ff(0x816)](Scene_Status[_0x2ea4ff(0x5f9)][_0x2ea4ff(0x2e0)]),this[_0x2ea4ff(0x20e)]&&this[_0x2ea4ff(0x20e)]['setBackgroundType'](Scene_Status[_0x2ea4ff(0x5f9)][_0x2ea4ff(0x772)]),this[_0x2ea4ff(0x18a)]&&this[_0x2ea4ff(0x18a)][_0x2ea4ff(0x816)](Scene_Status[_0x2ea4ff(0x5f9)]['StatusEquipBgType']);},Scene_Status[_0x2a005f(0x7d8)][_0x2a005f(0x437)]=function(){const _0x27643f=_0x2a005f;return Scene_Status[_0x27643f(0x5f9)][_0x27643f(0x260)]['call'](this);},Scene_Status[_0x2a005f(0x7d8)][_0x2a005f(0x5ad)]=function(){const _0x2a8cce=_0x2a005f;return Scene_Status[_0x2a8cce(0x5f9)]['StatusRect']['call'](this);},Scene_Status[_0x2a005f(0x7d8)][_0x2a005f(0x70a)]=function(){const _0x4b5c4f=_0x2a005f;return Scene_Status['layoutSettings'][_0x4b5c4f(0x6fc)][_0x4b5c4f(0x873)](this);},Scene_Status[_0x2a005f(0x7d8)]['statusEquipWindowRect']=function(){const _0x5b913b=_0x2a005f;return Scene_Status['layoutSettings'][_0x5b913b(0x77b)][_0x5b913b(0x873)](this);},Scene_Options[_0x2a005f(0x5f9)]=VisuMZ['CoreEngine']['Settings']['MenuLayout'][_0x2a005f(0x880)],VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x41d)]=Scene_Options[_0x2a005f(0x7d8)][_0x2a005f(0x18c)],Scene_Options[_0x2a005f(0x7d8)][_0x2a005f(0x18c)]=function(){const _0x546631=_0x2a005f;VisuMZ[_0x546631(0x63d)]['Scene_Options_create'][_0x546631(0x873)](this),this[_0x546631(0x71f)]();},Scene_Options[_0x2a005f(0x7d8)]['setCoreEngineUpdateWindowBg']=function(){const _0x111481=_0x2a005f;this[_0x111481(0x3db)]&&this[_0x111481(0x3db)][_0x111481(0x816)](Scene_Options[_0x111481(0x5f9)][_0x111481(0x892)]);},Scene_Options[_0x2a005f(0x7d8)][_0x2a005f(0x54e)]=function(){const _0x53d56a=_0x2a005f;return Scene_Options['layoutSettings']['OptionsRect'][_0x53d56a(0x873)](this);},Scene_Save[_0x2a005f(0x5f9)]=VisuMZ['CoreEngine'][_0x2a005f(0x52e)]['MenuLayout']['SaveMenu'],Scene_Save['prototype']['create']=function(){const _0x3dc196=_0x2a005f;Scene_File[_0x3dc196(0x7d8)][_0x3dc196(0x18c)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save[_0x2a005f(0x7d8)][_0x2a005f(0x71f)]=function(){const _0x479443=_0x2a005f;this['_helpWindow']&&this[_0x479443(0x357)][_0x479443(0x816)](Scene_Save[_0x479443(0x5f9)]['HelpBgType']),this[_0x479443(0x4d5)]&&this[_0x479443(0x4d5)]['setBackgroundType'](Scene_Save[_0x479443(0x5f9)]['ListBgType']);},Scene_Save[_0x2a005f(0x7d8)][_0x2a005f(0x866)]=function(){const _0x421cdf=_0x2a005f;return Scene_Save[_0x421cdf(0x5f9)][_0x421cdf(0x875)][_0x421cdf(0x873)](this);},Scene_Save[_0x2a005f(0x7d8)][_0x2a005f(0x504)]=function(){const _0x2a46a7=_0x2a005f;return Scene_Save[_0x2a46a7(0x5f9)][_0x2a46a7(0x2a0)]['call'](this);},Scene_Load['layoutSettings']=VisuMZ['CoreEngine'][_0x2a005f(0x52e)]['MenuLayout'][_0x2a005f(0x47c)],Scene_Load[_0x2a005f(0x7d8)][_0x2a005f(0x18c)]=function(){const _0x290099=_0x2a005f;Scene_File['prototype']['create'][_0x290099(0x873)](this),this[_0x290099(0x71f)]();},Scene_Load[_0x2a005f(0x7d8)]['setCoreEngineUpdateWindowBg']=function(){const _0x452408=_0x2a005f;this['_helpWindow']&&this['_helpWindow'][_0x452408(0x816)](Scene_Load[_0x452408(0x5f9)]['HelpBgType']),this['_listWindow']&&this[_0x452408(0x4d5)][_0x452408(0x816)](Scene_Load['layoutSettings'][_0x452408(0x1d5)]);},Scene_Load[_0x2a005f(0x7d8)]['helpWindowRect']=function(){const _0x4d8bb6=_0x2a005f;return Scene_Load['layoutSettings'][_0x4d8bb6(0x875)][_0x4d8bb6(0x873)](this);},Scene_Load[_0x2a005f(0x7d8)]['listWindowRect']=function(){const _0x29d7ac=_0x2a005f;return Scene_Load[_0x29d7ac(0x5f9)][_0x29d7ac(0x2a0)][_0x29d7ac(0x873)](this);},Scene_GameEnd['layoutSettings']=VisuMZ[_0x2a005f(0x63d)]['Settings'][_0x2a005f(0x79c)]['GameEnd'],VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x1c6)]=Scene_GameEnd[_0x2a005f(0x7d8)]['createBackground'],Scene_GameEnd[_0x2a005f(0x7d8)][_0x2a005f(0x8ac)]=function(){const _0x3cc817=_0x2a005f;Scene_MenuBase['prototype'][_0x3cc817(0x8ac)]['call'](this);},Scene_GameEnd['prototype'][_0x2a005f(0x3c3)]=function(){const _0x5cd84a=_0x2a005f,_0x2ee717=this[_0x5cd84a(0x2e3)]();this[_0x5cd84a(0x8c0)]=new Window_GameEnd(_0x2ee717),this['_commandWindow'][_0x5cd84a(0x3ad)](_0x5cd84a(0x5f2),this[_0x5cd84a(0x2eb)][_0x5cd84a(0x80d)](this)),this[_0x5cd84a(0x430)](this['_commandWindow']),this[_0x5cd84a(0x8c0)][_0x5cd84a(0x816)](Scene_GameEnd['layoutSettings'][_0x5cd84a(0x2f9)]);},Scene_GameEnd[_0x2a005f(0x7d8)][_0x2a005f(0x2e3)]=function(){const _0x3eb017=_0x2a005f;return Scene_GameEnd[_0x3eb017(0x5f9)]['CommandRect'][_0x3eb017(0x873)](this);},Scene_Shop[_0x2a005f(0x5f9)]=VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x52e)][_0x2a005f(0x79c)][_0x2a005f(0x176)],VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x395)]=Scene_Shop['prototype']['create'],Scene_Shop[_0x2a005f(0x7d8)][_0x2a005f(0x18c)]=function(){const _0x20ec78=_0x2a005f;VisuMZ[_0x20ec78(0x63d)][_0x20ec78(0x395)]['call'](this),this[_0x20ec78(0x71f)]();},Scene_Shop[_0x2a005f(0x7d8)][_0x2a005f(0x71f)]=function(){const _0x3c5ead=_0x2a005f;this[_0x3c5ead(0x357)]&&this[_0x3c5ead(0x357)][_0x3c5ead(0x816)](Scene_Shop['layoutSettings']['HelpBgType']),this[_0x3c5ead(0x567)]&&this[_0x3c5ead(0x567)]['setBackgroundType'](Scene_Shop[_0x3c5ead(0x5f9)]['GoldBgType']),this['_commandWindow']&&this['_commandWindow'][_0x3c5ead(0x816)](Scene_Shop[_0x3c5ead(0x5f9)][_0x3c5ead(0x2f9)]),this['_dummyWindow']&&this[_0x3c5ead(0x695)][_0x3c5ead(0x816)](Scene_Shop[_0x3c5ead(0x5f9)][_0x3c5ead(0x230)]),this[_0x3c5ead(0x538)]&&this['_numberWindow'][_0x3c5ead(0x816)](Scene_Shop[_0x3c5ead(0x5f9)][_0x3c5ead(0x4f0)]),this[_0x3c5ead(0x3c2)]&&this[_0x3c5ead(0x3c2)][_0x3c5ead(0x816)](Scene_Shop['layoutSettings'][_0x3c5ead(0x2e0)]),this[_0x3c5ead(0x6ed)]&&this[_0x3c5ead(0x6ed)][_0x3c5ead(0x816)](Scene_Shop[_0x3c5ead(0x5f9)][_0x3c5ead(0x598)]),this[_0x3c5ead(0x239)]&&this['_categoryWindow'][_0x3c5ead(0x816)](Scene_Shop[_0x3c5ead(0x5f9)][_0x3c5ead(0x862)]),this[_0x3c5ead(0x1f0)]&&this[_0x3c5ead(0x1f0)]['setBackgroundType'](Scene_Shop[_0x3c5ead(0x5f9)]['SellBgType']);},Scene_Shop[_0x2a005f(0x7d8)][_0x2a005f(0x866)]=function(){const _0x1400e7=_0x2a005f;return Scene_Shop[_0x1400e7(0x5f9)]['HelpRect'][_0x1400e7(0x873)](this);},Scene_Shop[_0x2a005f(0x7d8)][_0x2a005f(0x6ec)]=function(){const _0x1e6837=_0x2a005f;return Scene_Shop['layoutSettings'][_0x1e6837(0x2b5)]['call'](this);},Scene_Shop['prototype'][_0x2a005f(0x2e3)]=function(){const _0x5446ef=_0x2a005f;return Scene_Shop[_0x5446ef(0x5f9)][_0x5446ef(0x34e)][_0x5446ef(0x873)](this);},Scene_Shop[_0x2a005f(0x7d8)][_0x2a005f(0x612)]=function(){const _0x1bfc6b=_0x2a005f;return Scene_Shop[_0x1bfc6b(0x5f9)][_0x1bfc6b(0x3ed)][_0x1bfc6b(0x873)](this);},Scene_Shop['prototype'][_0x2a005f(0x6d7)]=function(){const _0x341584=_0x2a005f;return Scene_Shop[_0x341584(0x5f9)]['NumberRect'][_0x341584(0x873)](this);},Scene_Shop['prototype'][_0x2a005f(0x5ad)]=function(){return Scene_Shop['layoutSettings']['StatusRect']['call'](this);},Scene_Shop[_0x2a005f(0x7d8)][_0x2a005f(0x180)]=function(){const _0x3045de=_0x2a005f;return Scene_Shop[_0x3045de(0x5f9)][_0x3045de(0x551)][_0x3045de(0x873)](this);},Scene_Shop['prototype']['categoryWindowRect']=function(){const _0x58aaad=_0x2a005f;return Scene_Shop[_0x58aaad(0x5f9)][_0x58aaad(0x58c)]['call'](this);},Scene_Shop[_0x2a005f(0x7d8)][_0x2a005f(0x6e4)]=function(){const _0x47870e=_0x2a005f;return Scene_Shop[_0x47870e(0x5f9)][_0x47870e(0x1a2)][_0x47870e(0x873)](this);},Scene_Name[_0x2a005f(0x5f9)]=VisuMZ['CoreEngine'][_0x2a005f(0x52e)][_0x2a005f(0x79c)][_0x2a005f(0x3a9)],VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x35b)]=Scene_Name[_0x2a005f(0x7d8)]['create'],Scene_Name['prototype'][_0x2a005f(0x18c)]=function(){const _0x3ebf08=_0x2a005f;VisuMZ[_0x3ebf08(0x63d)][_0x3ebf08(0x35b)][_0x3ebf08(0x873)](this),this[_0x3ebf08(0x71f)]();},Scene_Name['prototype'][_0x2a005f(0x71f)]=function(){const _0x2469c4=_0x2a005f;this[_0x2469c4(0x64c)]&&this[_0x2469c4(0x64c)]['setBackgroundType'](Scene_Name[_0x2469c4(0x5f9)][_0x2469c4(0x74d)]),this['_inputWindow']&&this[_0x2469c4(0x5a4)]['setBackgroundType'](Scene_Name[_0x2469c4(0x5f9)][_0x2469c4(0x879)]);},Scene_Name['prototype'][_0x2a005f(0x75f)]=function(){return 0x0;},Scene_Name[_0x2a005f(0x7d8)]['editWindowRect']=function(){const _0x125c25=_0x2a005f;return Scene_Name[_0x125c25(0x5f9)][_0x125c25(0x259)]['call'](this);},Scene_Name[_0x2a005f(0x7d8)]['inputWindowRect']=function(){const _0x29bd3d=_0x2a005f;return Scene_Name[_0x29bd3d(0x5f9)]['InputRect']['call'](this);},Scene_Name[_0x2a005f(0x7d8)][_0x2a005f(0x361)]=function(){const _0x996dae=_0x2a005f;if(!this[_0x996dae(0x5a4)])return![];return VisuMZ[_0x996dae(0x63d)][_0x996dae(0x52e)][_0x996dae(0x3d6)][_0x996dae(0x361)];},Scene_Name[_0x2a005f(0x7d8)][_0x2a005f(0x411)]=function(){const _0x44b91a=_0x2a005f;if(this[_0x44b91a(0x361)]()&&this['_inputWindow'][_0x44b91a(0x7fb)]!=='keyboard')return TextManager[_0x44b91a(0x32f)](_0x44b91a(0x23a),_0x44b91a(0x29a));return Scene_MenuBase[_0x44b91a(0x7d8)][_0x44b91a(0x411)][_0x44b91a(0x873)](this);},Scene_Name[_0x2a005f(0x7d8)][_0x2a005f(0x2ea)]=function(){const _0x4a8644=_0x2a005f;return this[_0x4a8644(0x361)]()?TextManager[_0x4a8644(0x5bf)](_0x4a8644(0x52a)):Scene_MenuBase[_0x4a8644(0x7d8)][_0x4a8644(0x2ea)]['call'](this);},Scene_Name['prototype']['buttonAssistKey4']=function(){const _0x9eff6c=_0x2a005f;if(this[_0x9eff6c(0x361)]()&&this[_0x9eff6c(0x5a4)][_0x9eff6c(0x7fb)]===_0x9eff6c(0x478))return TextManager['makeInputButtonString']([_0x9eff6c(0x570)]);return Scene_MenuBase['prototype'][_0x9eff6c(0x4a1)][_0x9eff6c(0x873)](this);},Scene_Name['prototype']['buttonAssistKey5']=function(){const _0x43d86e=_0x2a005f;if(this[_0x43d86e(0x361)]()&&this[_0x43d86e(0x5a4)][_0x43d86e(0x7fb)]===_0x43d86e(0x478))return TextManager['makeInputButtonString']([_0x43d86e(0x803)]);return Scene_MenuBase[_0x43d86e(0x7d8)]['buttonAssistKey4'][_0x43d86e(0x873)](this);},Scene_Name[_0x2a005f(0x7d8)][_0x2a005f(0x4ff)]=function(){const _0x3f424d=_0x2a005f;if(this[_0x3f424d(0x361)]()&&this[_0x3f424d(0x5a4)][_0x3f424d(0x7fb)]!==_0x3f424d(0x478)){const _0x576c45=VisuMZ[_0x3f424d(0x63d)][_0x3f424d(0x52e)][_0x3f424d(0x3d6)];return _0x576c45[_0x3f424d(0x84a)]||_0x3f424d(0x7de);}return Scene_MenuBase[_0x3f424d(0x7d8)]['buttonAssistText1']['call'](this);},Scene_Name[_0x2a005f(0x7d8)][_0x2a005f(0x278)]=function(){const _0x34da1e=_0x2a005f;if(this[_0x34da1e(0x361)]()){const _0x3bc3ef=VisuMZ[_0x34da1e(0x63d)][_0x34da1e(0x52e)]['KeyboardInput'];return this[_0x34da1e(0x5a4)][_0x34da1e(0x7fb)]===_0x34da1e(0x478)?_0x3bc3ef['Keyboard']||_0x34da1e(0x8d5):_0x3bc3ef['Manual']||_0x34da1e(0x7eb);}else return Scene_MenuBase[_0x34da1e(0x7d8)][_0x34da1e(0x278)]['call'](this);},Scene_Name[_0x2a005f(0x7d8)]['buttonAssistText4']=function(){const _0x14f3e3=_0x2a005f;if(this['EnableNameInput']()){const _0x14a7a7=VisuMZ[_0x14f3e3(0x63d)][_0x14f3e3(0x52e)][_0x14f3e3(0x3d6)];if(this['_inputWindow']['_mode']==='keyboard')return _0x14a7a7[_0x14f3e3(0x5a7)]||_0x14f3e3(0x5a7);}return Scene_MenuBase['prototype'][_0x14f3e3(0x582)]['call'](this);},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x44f)]=Scene_Name[_0x2a005f(0x7d8)]['onInputOk'],Scene_Name['prototype'][_0x2a005f(0x317)]=function(){const _0x21d91b=_0x2a005f;this[_0x21d91b(0x77f)]()?this['onInputBannedWords']():VisuMZ[_0x21d91b(0x63d)][_0x21d91b(0x44f)][_0x21d91b(0x873)](this);},Scene_Name[_0x2a005f(0x7d8)]['doesNameContainBannedWords']=function(){const _0x188c06=_0x2a005f,_0x4e8d01=VisuMZ[_0x188c06(0x63d)]['Settings']['KeyboardInput'];if(!_0x4e8d01)return![];const _0x299d9b=_0x4e8d01['BannedWords'];if(!_0x299d9b)return![];const _0x45a914=this[_0x188c06(0x64c)]['name']()[_0x188c06(0x3b8)]();for(const _0xe1a9f6 of _0x299d9b){if(_0x45a914[_0x188c06(0x34a)](_0xe1a9f6[_0x188c06(0x3b8)]()))return!![];}return![];},Scene_Name[_0x2a005f(0x7d8)]['onInputBannedWords']=function(){const _0x58a9b3=_0x2a005f;SoundManager[_0x58a9b3(0x5f6)]();},VisuMZ['CoreEngine'][_0x2a005f(0x70f)]=Scene_Battle[_0x2a005f(0x7d8)]['update'],Scene_Battle['prototype'][_0x2a005f(0x457)]=function(){const _0x5a5549=_0x2a005f;VisuMZ[_0x5a5549(0x63d)][_0x5a5549(0x70f)][_0x5a5549(0x873)](this);if($gameTemp[_0x5a5549(0x365)])this[_0x5a5549(0x62c)]();},Scene_Battle['prototype'][_0x2a005f(0x62c)]=function(){const _0xd56ab2=_0x2a005f;!BattleManager['isInputting']()&&!this[_0xd56ab2(0x264)]&&!$gameMessage[_0xd56ab2(0x321)]()&&(this['_playtestF7Looping']=!![],this[_0xd56ab2(0x457)](),SceneManager[_0xd56ab2(0x794)](),this[_0xd56ab2(0x264)]=![]);},VisuMZ[_0x2a005f(0x63d)]['Scene_Battle_createCancelButton']=Scene_Battle[_0x2a005f(0x7d8)][_0x2a005f(0x185)],Scene_Battle[_0x2a005f(0x7d8)][_0x2a005f(0x185)]=function(){const _0x47486f=_0x2a005f;VisuMZ[_0x47486f(0x63d)]['Scene_Battle_createCancelButton'][_0x47486f(0x873)](this),SceneManager[_0x47486f(0x3c0)]()&&this[_0x47486f(0x546)]();},Scene_Battle[_0x2a005f(0x7d8)][_0x2a005f(0x546)]=function(){const _0x1522bb=_0x2a005f;this[_0x1522bb(0x6bc)]['x']=Graphics['boxWidth']+0x4,this[_0x1522bb(0x3af)]()?this['_cancelButton']['y']=Graphics[_0x1522bb(0x4b9)]-this[_0x1522bb(0x589)]():this['_cancelButton']['y']=0x0;},VisuMZ[_0x2a005f(0x63d)]['Sprite_Button_initialize']=Sprite_Button[_0x2a005f(0x7d8)]['initialize'],Sprite_Button[_0x2a005f(0x7d8)][_0x2a005f(0x72f)]=function(_0x1d2b4a){const _0x5b9039=_0x2a005f;VisuMZ[_0x5b9039(0x63d)]['Sprite_Button_initialize'][_0x5b9039(0x873)](this,_0x1d2b4a),this[_0x5b9039(0x583)]();},Sprite_Button[_0x2a005f(0x7d8)][_0x2a005f(0x583)]=function(){const _0x155998=_0x2a005f,_0x4cbf5c=VisuMZ[_0x155998(0x63d)]['Settings']['UI'];this[_0x155998(0x63b)]=![];switch(this[_0x155998(0x3eb)]){case _0x155998(0x5f2):this['_isButtonHidden']=!_0x4cbf5c[_0x155998(0x71a)];break;case _0x155998(0x23a):case _0x155998(0x29a):this[_0x155998(0x63b)]=!_0x4cbf5c[_0x155998(0x356)];break;case _0x155998(0x35d):case'up':case _0x155998(0x835):case _0x155998(0x72b):case'ok':this['_isButtonHidden']=!_0x4cbf5c[_0x155998(0x876)];break;case _0x155998(0x272):this[_0x155998(0x63b)]=!_0x4cbf5c['menuShowButton'];break;}},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x310)]=Sprite_Button['prototype'][_0x2a005f(0x2c9)],Sprite_Button['prototype'][_0x2a005f(0x2c9)]=function(){const _0x36b4e5=_0x2a005f;SceneManager[_0x36b4e5(0x4d2)]()||this[_0x36b4e5(0x63b)]?this[_0x36b4e5(0x7bc)]():VisuMZ[_0x36b4e5(0x63d)][_0x36b4e5(0x310)]['call'](this);},Sprite_Button[_0x2a005f(0x7d8)]['hideButtonFromView']=function(){const _0x4cdf3b=_0x2a005f;this[_0x4cdf3b(0x554)]=![],this[_0x4cdf3b(0x3c6)]=0x0,this['x']=Graphics['width']*0xa,this['y']=Graphics[_0x4cdf3b(0x8b8)]*0xa;},VisuMZ['CoreEngine'][_0x2a005f(0x254)]=Sprite_Battler[_0x2a005f(0x7d8)]['startMove'],Sprite_Battler[_0x2a005f(0x7d8)]['startMove']=function(_0xeb714c,_0x13f9f8,_0x5c8001){const _0x4c4615=_0x2a005f;(this['_targetOffsetX']!==_0xeb714c||this[_0x4c4615(0x752)]!==_0x13f9f8)&&(this['setMoveEasingType'](_0x4c4615(0x1cd)),this[_0x4c4615(0x423)]=_0x5c8001),VisuMZ[_0x4c4615(0x63d)][_0x4c4615(0x254)][_0x4c4615(0x873)](this,_0xeb714c,_0x13f9f8,_0x5c8001);},Sprite_Battler[_0x2a005f(0x7d8)][_0x2a005f(0x29f)]=function(_0x5d829c){const _0x111d93=_0x2a005f;this[_0x111d93(0x5b8)]=_0x5d829c;},Sprite_Battler[_0x2a005f(0x7d8)]['updateMove']=function(){const _0x543e42=_0x2a005f;if(this['_movementDuration']<=0x0)return;const _0x2d8b4e=this[_0x543e42(0x828)],_0x374a40=this[_0x543e42(0x423)],_0x2bd1bb=this[_0x543e42(0x5b8)];this[_0x543e42(0x74a)]=this['applyEasing'](this[_0x543e42(0x74a)],this[_0x543e42(0x212)],_0x2d8b4e,_0x374a40,_0x2bd1bb),this['_offsetY']=this[_0x543e42(0x63c)](this['_offsetY'],this['_targetOffsetY'],_0x2d8b4e,_0x374a40,_0x2bd1bb),this[_0x543e42(0x828)]--;if(this[_0x543e42(0x828)]<=0x0)this['onMoveEnd']();},Sprite_Battler[_0x2a005f(0x7d8)]['applyEasing']=function(_0x2feefb,_0x42ad46,_0x3f22a4,_0x4ee761,_0x2f63f3){const _0x57545f=_0x2a005f,_0x11054f=VisuMZ[_0x57545f(0x52d)]((_0x4ee761-_0x3f22a4)/_0x4ee761,_0x2f63f3||_0x57545f(0x1cd)),_0x2f7162=VisuMZ[_0x57545f(0x52d)]((_0x4ee761-_0x3f22a4+0x1)/_0x4ee761,_0x2f63f3||'Linear'),_0x5a917b=(_0x2feefb-_0x42ad46*_0x11054f)/(0x1-_0x11054f);return _0x5a917b+(_0x42ad46-_0x5a917b)*_0x2f7162;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x3bc)]=Sprite_Actor['prototype']['setActorHome'],Sprite_Actor['prototype']['setActorHome']=function(_0x22f8a5){const _0x523998=_0x2a005f;VisuMZ[_0x523998(0x63d)][_0x523998(0x52e)]['UI']['RepositionActors']?this['setActorHomeRepositioned'](_0x22f8a5):VisuMZ[_0x523998(0x63d)][_0x523998(0x3bc)]['call'](this,_0x22f8a5);},Sprite_Actor[_0x2a005f(0x7d8)][_0x2a005f(0x2de)]=function(_0x44f9f4){const _0x2f7fb2=_0x2a005f;let _0x581a05=Math[_0x2f7fb2(0x57f)](Graphics['width']/0x2+0xc0);_0x581a05-=Math['floor']((Graphics[_0x2f7fb2(0x4c6)]-Graphics[_0x2f7fb2(0x7b1)])/0x2),_0x581a05+=_0x44f9f4*0x20;let _0x29f0a4=Graphics[_0x2f7fb2(0x8b8)]-0xc8-$gameParty[_0x2f7fb2(0x1d7)]()*0x30;_0x29f0a4-=Math[_0x2f7fb2(0x2a7)]((Graphics['height']-Graphics[_0x2f7fb2(0x4b9)])/0x2),_0x29f0a4+=_0x44f9f4*0x30,this[_0x2f7fb2(0x381)](_0x581a05,_0x29f0a4);},Sprite_Actor[_0x2a005f(0x7d8)]['retreat']=function(){const _0x6bf615=_0x2a005f;this[_0x6bf615(0x268)](0x4b0,0x0,0x78);},Sprite_Animation['prototype'][_0x2a005f(0x23c)]=function(_0x5b5026){const _0x53425f=_0x2a005f;this[_0x53425f(0x5fc)]=_0x5b5026;},VisuMZ['CoreEngine'][_0x2a005f(0x33e)]=Sprite_Animation[_0x2a005f(0x7d8)][_0x2a005f(0x88c)],Sprite_Animation['prototype'][_0x2a005f(0x88c)]=function(){const _0x1d5fb0=_0x2a005f;if(this['_muteSound'])return;VisuMZ[_0x1d5fb0(0x63d)][_0x1d5fb0(0x33e)]['call'](this);},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x4dd)]=Sprite_Animation['prototype']['setViewport'],Sprite_Animation[_0x2a005f(0x7d8)][_0x2a005f(0x74c)]=function(_0x2d8e73){const _0x252161=_0x2a005f;this[_0x252161(0x1e7)]()?this[_0x252161(0x2d5)](_0x2d8e73):VisuMZ[_0x252161(0x63d)][_0x252161(0x4dd)][_0x252161(0x873)](this,_0x2d8e73);},Sprite_Animation[_0x2a005f(0x7d8)]['isAnimationOffsetXMirrored']=function(){const _0x370dad=_0x2a005f;if(!this[_0x370dad(0x838)])return![];const _0x1053f1=this['_animation'][_0x370dad(0x762)]||'';if(_0x1053f1[_0x370dad(0x37e)](/<MIRROR OFFSET X>/i))return!![];if(_0x1053f1['match'](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x370dad(0x63d)]['Settings'][_0x370dad(0x213)][_0x370dad(0x6e8)];},Sprite_Animation[_0x2a005f(0x7d8)][_0x2a005f(0x2d5)]=function(_0x4ca9de){const _0x2d8fd7=_0x2a005f,_0x1be7b0=this[_0x2d8fd7(0x57b)],_0x186e0a=this[_0x2d8fd7(0x57b)],_0x1da25f=this['_animation'][_0x2d8fd7(0x6cd)]*(this['_mirror']?-0x1:0x1)-_0x1be7b0/0x2,_0x66945e=this[_0x2d8fd7(0x838)][_0x2d8fd7(0x88e)]-_0x186e0a/0x2,_0x2616e4=this['targetPosition'](_0x4ca9de);_0x4ca9de['gl'][_0x2d8fd7(0x1a5)](_0x1da25f+_0x2616e4['x'],_0x66945e+_0x2616e4['y'],_0x1be7b0,_0x186e0a);},Sprite_Animation['prototype'][_0x2a005f(0x690)]=function(_0x1d7966){const _0x35d013=_0x2a005f;if(_0x1d7966[_0x35d013(0x6fb)]){}const _0x118986=this['_animation'][_0x35d013(0x762)];let _0x343f52=_0x1d7966[_0x35d013(0x8b8)]*_0x1d7966[_0x35d013(0x2cf)]['y'],_0x2a292c=0x0,_0x37cfa7=-_0x343f52/0x2;if(_0x118986[_0x35d013(0x37e)](/<(?:HEAD|HEADER|TOP)>/i))_0x37cfa7=-_0x343f52;if(_0x118986[_0x35d013(0x37e)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x37cfa7=0x0;if(this[_0x35d013(0x838)][_0x35d013(0x33f)])_0x37cfa7=0x0;if(_0x118986['match'](/<(?:LEFT)>/i))_0x2a292c=-_0x1d7966[_0x35d013(0x4c6)]/0x2;if(_0x118986['match'](/<(?:RIGHT)>/i))_0x2a292c=_0x1d7966[_0x35d013(0x4c6)]/0x2;_0x118986[_0x35d013(0x37e)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x2a292c=Number(RegExp['$1'])*_0x1d7966[_0x35d013(0x4c6)]);_0x118986[_0x35d013(0x37e)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x37cfa7=(0x1-Number(RegExp['$1']))*-_0x343f52);_0x118986[_0x35d013(0x37e)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x2a292c=Number(RegExp['$1'])*_0x1d7966[_0x35d013(0x4c6)],_0x37cfa7=(0x1-Number(RegExp['$2']))*-_0x343f52);if(_0x118986[_0x35d013(0x37e)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x2a292c+=Number(RegExp['$1']);if(_0x118986[_0x35d013(0x37e)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x37cfa7+=Number(RegExp['$1']);_0x118986['match'](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x2a292c+=Number(RegExp['$1']),_0x37cfa7+=Number(RegExp['$2']));const _0x48d84e=new Point(_0x2a292c,_0x37cfa7);return _0x1d7966[_0x35d013(0x714)](),_0x1d7966[_0x35d013(0x65d)]['apply'](_0x48d84e);},Sprite_AnimationMV['prototype'][_0x2a005f(0x1a8)]=function(){const _0x144d69=_0x2a005f;this[_0x144d69(0x6c3)]=VisuMZ[_0x144d69(0x63d)][_0x144d69(0x52e)][_0x144d69(0x213)][_0x144d69(0x2b8)]??0x4,this['setupCustomRateCoreEngine'](),this[_0x144d69(0x6c3)]=this['_rate'][_0x144d69(0x5c0)](0x1,0xa);},Sprite_AnimationMV['prototype'][_0x2a005f(0x641)]=function(){const _0x52e496=_0x2a005f;if(!this[_0x52e496(0x838)]);const _0x1eb107=this[_0x52e496(0x838)]['name']||'';_0x1eb107[_0x52e496(0x37e)](/<RATE:[ ](\d+)>/i)&&(this[_0x52e496(0x6c3)]=(Number(RegExp['$1'])||0x1)[_0x52e496(0x5c0)](0x1,0xa));},Sprite_AnimationMV[_0x2a005f(0x7d8)][_0x2a005f(0x23c)]=function(_0x4f2a65){const _0x3f42da=_0x2a005f;this[_0x3f42da(0x5fc)]=_0x4f2a65;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x688)]=Sprite_AnimationMV[_0x2a005f(0x7d8)][_0x2a005f(0x609)],Sprite_AnimationMV[_0x2a005f(0x7d8)][_0x2a005f(0x609)]=function(_0x3ce7ac){const _0x414b31=_0x2a005f;this['_muteSound']&&(_0x3ce7ac=JsonEx['makeDeepCopy'](_0x3ce7ac),_0x3ce7ac['se']&&(_0x3ce7ac['se'][_0x414b31(0x1d1)]=0x0)),VisuMZ['CoreEngine'][_0x414b31(0x688)]['call'](this,_0x3ce7ac);},VisuMZ[_0x2a005f(0x63d)]['Sprite_AnimationMV_updatePosition']=Sprite_AnimationMV[_0x2a005f(0x7d8)][_0x2a005f(0x5d1)],Sprite_AnimationMV[_0x2a005f(0x7d8)][_0x2a005f(0x5d1)]=function(){const _0x35e09c=_0x2a005f;VisuMZ[_0x35e09c(0x63d)][_0x35e09c(0x6b8)]['call'](this);if(this[_0x35e09c(0x838)]['position']===0x3){if(this['x']===0x0)this['x']=Math['round'](Graphics[_0x35e09c(0x4c6)]/0x2);if(this['y']===0x0)this['y']=Math[_0x35e09c(0x57f)](Graphics['height']/0x2);}},Sprite_Damage[_0x2a005f(0x7d8)]['createDigits']=function(_0x264a05){const _0x89b48d=_0x2a005f;let _0x23b709=Math['abs'](_0x264a05)[_0x89b48d(0x646)]();this[_0x89b48d(0x191)]()&&(_0x23b709=VisuMZ[_0x89b48d(0x318)](_0x23b709));const _0x1ceba0=this[_0x89b48d(0x7cb)](),_0x4f3f1a=Math[_0x89b48d(0x2a7)](_0x1ceba0*0.75);for(let _0x1f45be=0x0;_0x1f45be<_0x23b709[_0x89b48d(0x7c3)];_0x1f45be++){const _0x12f16d=this['createChildSprite'](_0x4f3f1a,_0x1ceba0);_0x12f16d['bitmap'][_0x89b48d(0x549)](_0x23b709[_0x1f45be],0x0,0x0,_0x4f3f1a,_0x1ceba0,_0x89b48d(0x5ac)),_0x12f16d['x']=(_0x1f45be-(_0x23b709[_0x89b48d(0x7c3)]-0x1)/0x2)*_0x4f3f1a,_0x12f16d['dy']=-_0x1f45be;}},Sprite_Damage[_0x2a005f(0x7d8)]['useDigitGrouping']=function(){const _0x5298a0=_0x2a005f;return VisuMZ[_0x5298a0(0x63d)][_0x5298a0(0x52e)]['QoL']['DigitGroupingDamageSprites'];},Sprite_Damage['prototype'][_0x2a005f(0x3cd)]=function(){const _0x1eb464=_0x2a005f;return ColorManager[_0x1eb464(0x4a7)]();},VisuMZ['CoreEngine'][_0x2a005f(0x708)]=Sprite_Gauge[_0x2a005f(0x7d8)][_0x2a005f(0x295)],Sprite_Gauge[_0x2a005f(0x7d8)][_0x2a005f(0x295)]=function(){const _0x377b9c=_0x2a005f;return VisuMZ[_0x377b9c(0x63d)]['Sprite_Gauge_gaugeRate'][_0x377b9c(0x873)](this)[_0x377b9c(0x5c0)](0x0,0x1);},VisuMZ['CoreEngine'][_0x2a005f(0x83f)]=Sprite_Gauge['prototype'][_0x2a005f(0x32b)],Sprite_Gauge[_0x2a005f(0x7d8)][_0x2a005f(0x32b)]=function(){const _0x1adc14=_0x2a005f;let _0x3383c1=VisuMZ[_0x1adc14(0x63d)][_0x1adc14(0x83f)][_0x1adc14(0x873)](this);return _0x3383c1;},Sprite_Gauge[_0x2a005f(0x7d8)][_0x2a005f(0x53e)]=function(){const _0x281498=_0x2a005f;let _0x314b24=this[_0x281498(0x32b)]();this[_0x281498(0x191)]()&&(_0x314b24=VisuMZ[_0x281498(0x318)](_0x314b24));const _0x5715ae=this[_0x281498(0x57d)]()-0x1,_0x102027=this[_0x281498(0x770)]?this[_0x281498(0x770)]():this[_0x281498(0x19a)]();this[_0x281498(0x1f3)](),this['bitmap'][_0x281498(0x549)](_0x314b24,0x0,0x0,_0x5715ae,_0x102027,_0x281498(0x768));},Sprite_Gauge[_0x2a005f(0x7d8)][_0x2a005f(0x41c)]=function(){return 0x3;},Sprite_Gauge['prototype'][_0x2a005f(0x191)]=function(){const _0xf9a8b=_0x2a005f;return VisuMZ[_0xf9a8b(0x63d)][_0xf9a8b(0x52e)]['QoL'][_0xf9a8b(0x398)];},Sprite_Gauge['prototype'][_0x2a005f(0x3cd)]=function(){return ColorManager['outlineColorGauge']();},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x797)]=Sprite_Picture[_0x2a005f(0x7d8)][_0x2a005f(0x464)],Sprite_Picture[_0x2a005f(0x7d8)][_0x2a005f(0x464)]=function(){const _0x10f8e7=_0x2a005f;this['_pictureName']&&this[_0x10f8e7(0x2b0)][_0x10f8e7(0x37e)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this['loadIconBitmap'](Number(RegExp['$1'])):VisuMZ[_0x10f8e7(0x63d)][_0x10f8e7(0x797)][_0x10f8e7(0x873)](this);},Sprite_Picture['prototype'][_0x2a005f(0x405)]=function(_0x5b4fe7){const _0x55b456=_0x2a005f,_0x1141ae=ImageManager[_0x55b456(0x6e0)],_0x2087c2=ImageManager[_0x55b456(0x6e3)],_0x305b00=this[_0x55b456(0x2b0)][_0x55b456(0x37e)](/SMOOTH/i);this[_0x55b456(0x5af)]=new Bitmap(_0x1141ae,_0x2087c2);const _0x3c9c1e=ImageManager['loadSystem'](_0x55b456(0x4ae)),_0x5b2589=_0x5b4fe7%0x10*_0x1141ae,_0x2ace8a=Math['floor'](_0x5b4fe7/0x10)*_0x2087c2;this[_0x55b456(0x5af)][_0x55b456(0x7ce)]=_0x305b00,this[_0x55b456(0x5af)][_0x55b456(0x2d9)](_0x3c9c1e,_0x5b2589,_0x2ace8a,_0x1141ae,_0x2087c2,0x0,0x0,_0x1141ae,_0x2087c2);};function Sprite_TitlePictureButton(){this['initialize'](...arguments);}Sprite_TitlePictureButton[_0x2a005f(0x7d8)]=Object[_0x2a005f(0x18c)](Sprite_Clickable[_0x2a005f(0x7d8)]),Sprite_TitlePictureButton['prototype'][_0x2a005f(0x2bc)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x2a005f(0x7d8)][_0x2a005f(0x72f)]=function(_0x565ef4){const _0x133a7e=_0x2a005f;Sprite_Clickable['prototype']['initialize']['call'](this),this['_data']=_0x565ef4,this[_0x133a7e(0x7be)]=null,this[_0x133a7e(0x182)]();},Sprite_TitlePictureButton[_0x2a005f(0x7d8)][_0x2a005f(0x182)]=function(){const _0x57255f=_0x2a005f;this['x']=Graphics[_0x57255f(0x4c6)],this['y']=Graphics[_0x57255f(0x8b8)],this['visible']=![],this[_0x57255f(0x2b7)]();},Sprite_TitlePictureButton[_0x2a005f(0x7d8)][_0x2a005f(0x2b7)]=function(){const _0x4a0c23=_0x2a005f;this[_0x4a0c23(0x5af)]=ImageManager[_0x4a0c23(0x779)](this[_0x4a0c23(0x823)][_0x4a0c23(0x425)]),this['bitmap'][_0x4a0c23(0x833)](this[_0x4a0c23(0x698)][_0x4a0c23(0x80d)](this));},Sprite_TitlePictureButton['prototype'][_0x2a005f(0x698)]=function(){const _0x44399f=_0x2a005f;this[_0x44399f(0x823)][_0x44399f(0x520)][_0x44399f(0x873)](this),this[_0x44399f(0x823)][_0x44399f(0x8c6)][_0x44399f(0x873)](this),this[_0x44399f(0x5d3)](this[_0x44399f(0x823)]['CallHandlerJS'][_0x44399f(0x80d)](this));},Sprite_TitlePictureButton[_0x2a005f(0x7d8)][_0x2a005f(0x457)]=function(){const _0x218b12=_0x2a005f;Sprite_Clickable['prototype']['update'][_0x218b12(0x873)](this),this[_0x218b12(0x2c9)](),this[_0x218b12(0x178)]();},Sprite_TitlePictureButton[_0x2a005f(0x7d8)]['fadeSpeed']=function(){const _0x18898a=_0x2a005f;return VisuMZ[_0x18898a(0x63d)][_0x18898a(0x52e)]['MenuLayout'][_0x18898a(0x22f)][_0x18898a(0x58d)];},Sprite_TitlePictureButton[_0x2a005f(0x7d8)][_0x2a005f(0x2c9)]=function(){const _0x4e2df3=_0x2a005f;this[_0x4e2df3(0x586)]||this[_0x4e2df3(0x72a)]?this[_0x4e2df3(0x3c6)]=0xff:(this[_0x4e2df3(0x3c6)]+=this[_0x4e2df3(0x554)]?this[_0x4e2df3(0x7ac)]():-0x1*this[_0x4e2df3(0x7ac)](),this[_0x4e2df3(0x3c6)]=Math['min'](0xc0,this[_0x4e2df3(0x3c6)]));},Sprite_TitlePictureButton[_0x2a005f(0x7d8)][_0x2a005f(0x5d3)]=function(_0x4f7767){this['_clickHandler']=_0x4f7767;},Sprite_TitlePictureButton[_0x2a005f(0x7d8)][_0x2a005f(0x79b)]=function(){const _0x5c3920=_0x2a005f;this[_0x5c3920(0x7be)]&&this[_0x5c3920(0x7be)]();},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x4ed)]=Spriteset_Base[_0x2a005f(0x7d8)]['initialize'],Spriteset_Base[_0x2a005f(0x7d8)][_0x2a005f(0x72f)]=function(){const _0xb125da=_0x2a005f;VisuMZ[_0xb125da(0x63d)][_0xb125da(0x4ed)][_0xb125da(0x873)](this),this['initMembersCoreEngine']();},Spriteset_Base['prototype']['initMembersCoreEngine']=function(){const _0x21a5ce=_0x2a005f;this['_fauxAnimationSprites']=[],this['_pointAnimationSprites']=[],this[_0x21a5ce(0x193)]=this[_0x21a5ce(0x2cf)]['x'],this[_0x21a5ce(0x5d0)]=this['scale']['y'];},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x789)]=Spriteset_Base[_0x2a005f(0x7d8)][_0x2a005f(0x893)],Spriteset_Base[_0x2a005f(0x7d8)][_0x2a005f(0x893)]=function(_0x49cd66){const _0x4234db=_0x2a005f;this[_0x4234db(0x32c)](),this['removeAllPointAnimations'](),VisuMZ[_0x4234db(0x63d)][_0x4234db(0x789)][_0x4234db(0x873)](this,_0x49cd66);},VisuMZ['CoreEngine']['Spriteset_Base_update']=Spriteset_Base[_0x2a005f(0x7d8)]['update'],Spriteset_Base['prototype']['update']=function(){const _0x2d1ce2=_0x2a005f;VisuMZ[_0x2d1ce2(0x63d)]['Spriteset_Base_update'][_0x2d1ce2(0x873)](this),this[_0x2d1ce2(0x6d0)](),this[_0x2d1ce2(0x31f)](),this[_0x2d1ce2(0x6f2)]();},Spriteset_Base[_0x2a005f(0x7d8)]['updatePictureAntiZoom']=function(){const _0x4959d3=_0x2a005f;if(!VisuMZ[_0x4959d3(0x63d)][_0x4959d3(0x52e)][_0x4959d3(0x213)]['AntiZoomPictures'])return;if(this[_0x4959d3(0x193)]===this['scale']['x']&&this['_cacheScaleY']===this[_0x4959d3(0x2cf)]['y'])return;this['adjustPictureAntiZoom'](),this[_0x4959d3(0x193)]=this[_0x4959d3(0x2cf)]['x'],this[_0x4959d3(0x5d0)]=this[_0x4959d3(0x2cf)]['y'];},Spriteset_Base[_0x2a005f(0x7d8)]['adjustPictureAntiZoom']=function(){const _0x49f92a=_0x2a005f;if(SceneManager[_0x49f92a(0x630)]()&&Spriteset_Map[_0x49f92a(0x662)])return;else{if(SceneManager[_0x49f92a(0x4e2)]()&&Spriteset_Battle[_0x49f92a(0x662)])return;}this[_0x49f92a(0x2cf)]['x']!==0x0&&(this[_0x49f92a(0x681)][_0x49f92a(0x2cf)]['x']=0x1/this[_0x49f92a(0x2cf)]['x'],this[_0x49f92a(0x681)]['x']=-(this['x']/this[_0x49f92a(0x2cf)]['x'])),this[_0x49f92a(0x2cf)]['y']!==0x0&&(this[_0x49f92a(0x681)]['scale']['y']=0x1/this['scale']['y'],this[_0x49f92a(0x681)]['y']=-(this['y']/this[_0x49f92a(0x2cf)]['y']));},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x3da)]=Spriteset_Base[_0x2a005f(0x7d8)]['updatePosition'],Spriteset_Base['prototype'][_0x2a005f(0x5d1)]=function(){const _0x13b594=_0x2a005f;VisuMZ['CoreEngine']['Spriteset_Base_updatePosition'][_0x13b594(0x873)](this),this['updatePositionCoreEngine']();},Spriteset_Base[_0x2a005f(0x7d8)]['updatePositionCoreEngine']=function(){const _0x230240=_0x2a005f;if(!$gameScreen)return;if($gameScreen[_0x230240(0x194)]<=0x0)return;this['x']-=Math[_0x230240(0x57f)]($gameScreen[_0x230240(0x602)]());const _0x4bc8d4=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen[_0x230240(0x7cf)]()){case _0x230240(0x2ba):this[_0x230240(0x637)]();break;case _0x230240(0x67c):this[_0x230240(0x18e)]();break;case'vertical':this[_0x230240(0x455)]();break;default:this[_0x230240(0x4db)]();break;}},Spriteset_Base['prototype']['updatePositionCoreEngineShakeOriginal']=function(){const _0x5ec42a=_0x2a005f,_0x4a2340=VisuMZ[_0x5ec42a(0x63d)][_0x5ec42a(0x52e)][_0x5ec42a(0x7bb)];if(_0x4a2340&&_0x4a2340[_0x5ec42a(0x382)])return _0x4a2340[_0x5ec42a(0x382)][_0x5ec42a(0x873)](this);this['x']+=Math['round']($gameScreen['shake']());},Spriteset_Base[_0x2a005f(0x7d8)][_0x2a005f(0x4db)]=function(){const _0xc10804=_0x2a005f,_0x21a533=VisuMZ['CoreEngine']['Settings'][_0xc10804(0x7bb)];if(_0x21a533&&_0x21a533['randomJS'])return _0x21a533[_0xc10804(0x1ef)][_0xc10804(0x873)](this);const _0x287c78=$gameScreen[_0xc10804(0x186)]*0.75,_0x4e741e=$gameScreen[_0xc10804(0x7f6)]*0.6,_0x3d1f21=$gameScreen[_0xc10804(0x194)];this['x']+=Math[_0xc10804(0x57f)](Math[_0xc10804(0x88b)](_0x287c78)-Math[_0xc10804(0x88b)](_0x4e741e))*(Math['min'](_0x3d1f21,0x1e)*0.5),this['y']+=Math['round'](Math[_0xc10804(0x88b)](_0x287c78)-Math['randomInt'](_0x4e741e))*(Math[_0xc10804(0x21b)](_0x3d1f21,0x1e)*0.5);},Spriteset_Base[_0x2a005f(0x7d8)][_0x2a005f(0x18e)]=function(){const _0x59cc34=_0x2a005f,_0x328eeb=VisuMZ[_0x59cc34(0x63d)][_0x59cc34(0x52e)][_0x59cc34(0x7bb)];if(_0x328eeb&&_0x328eeb[_0x59cc34(0x6cb)])return _0x328eeb[_0x59cc34(0x6cb)][_0x59cc34(0x873)](this);const _0x3eb4e2=$gameScreen[_0x59cc34(0x186)]*0.75,_0x3cb332=$gameScreen[_0x59cc34(0x7f6)]*0.6,_0x4c12fe=$gameScreen[_0x59cc34(0x194)];this['x']+=Math['round'](Math[_0x59cc34(0x88b)](_0x3eb4e2)-Math[_0x59cc34(0x88b)](_0x3cb332))*(Math[_0x59cc34(0x21b)](_0x4c12fe,0x1e)*0.5);},Spriteset_Base[_0x2a005f(0x7d8)]['updatePositionCoreEngineShakeVert']=function(){const _0x593fc7=_0x2a005f,_0x556fcd=VisuMZ['CoreEngine'][_0x593fc7(0x52e)][_0x593fc7(0x7bb)];if(_0x556fcd&&_0x556fcd[_0x593fc7(0x847)])return _0x556fcd['vertJS'][_0x593fc7(0x873)](this);const _0x436646=$gameScreen[_0x593fc7(0x186)]*0.75,_0x3b5bd5=$gameScreen[_0x593fc7(0x7f6)]*0.6,_0x4b5663=$gameScreen[_0x593fc7(0x194)];this['y']+=Math[_0x593fc7(0x57f)](Math[_0x593fc7(0x88b)](_0x436646)-Math['randomInt'](_0x3b5bd5))*(Math['min'](_0x4b5663,0x1e)*0.5);},Spriteset_Base[_0x2a005f(0x7d8)][_0x2a005f(0x31f)]=function(){const _0x59a7c3=_0x2a005f;for(const _0x435bd5 of this['_fauxAnimationSprites']){!_0x435bd5[_0x59a7c3(0x58f)]()&&this[_0x59a7c3(0x477)](_0x435bd5);}this['processFauxAnimationRequests']();},Spriteset_Base[_0x2a005f(0x7d8)]['processFauxAnimationRequests']=function(){const _0x12e090=_0x2a005f;for(;;){const _0x1aa9ec=$gameTemp[_0x12e090(0x412)]();if(_0x1aa9ec)this['createFauxAnimation'](_0x1aa9ec);else break;}},Spriteset_Base['prototype'][_0x2a005f(0x2a1)]=function(_0x2d684b){const _0x4201a5=_0x2a005f,_0x983c1c=$dataAnimations[_0x2d684b[_0x4201a5(0x487)]],_0x5a1195=_0x2d684b['targets'],_0x5968b5=_0x2d684b['mirror'],_0x3b799a=_0x2d684b[_0x4201a5(0x7d9)];let _0x334f0c=this[_0x4201a5(0x569)]();const _0x31a470=this['animationNextDelay']();if(this[_0x4201a5(0x1a1)](_0x983c1c))for(const _0x50013c of _0x5a1195){this[_0x4201a5(0x4d7)]([_0x50013c],_0x983c1c,_0x5968b5,_0x334f0c,_0x3b799a),_0x334f0c+=_0x31a470;}else this[_0x4201a5(0x4d7)](_0x5a1195,_0x983c1c,_0x5968b5,_0x334f0c,_0x3b799a);},Spriteset_Base[_0x2a005f(0x7d8)][_0x2a005f(0x443)]=function(_0x2df095,_0xa8c530,_0x482e79,_0x37549c){const _0x9e03=_0x2a005f,_0x1683dd=this[_0x9e03(0x1cf)](_0xa8c530),_0x4446d1=new(_0x1683dd?Sprite_AnimationMV:Sprite_Animation)(),_0x55b636=this['makeTargetSprites'](_0x2df095),_0x5028b3=this['animationBaseDelay'](),_0xa5124e=_0x37549c>_0x5028b3?this[_0x9e03(0x8b9)]():null;this[_0x9e03(0x326)](_0x2df095[0x0])&&(_0x482e79=!_0x482e79),_0x4446d1['targetObjects']=_0x2df095,_0x4446d1['setup'](_0x55b636,_0xa8c530,_0x482e79,_0x37549c,_0xa5124e),this[_0x9e03(0x4e3)](_0x4446d1),this['_animationSprites']['push'](_0x4446d1);},Spriteset_Base[_0x2a005f(0x7d8)][_0x2a005f(0x4d7)]=function(_0x2aa8bb,_0x519d02,_0x83865f,_0x3a088a,_0x1c5a8e){const _0x402f8d=_0x2a005f,_0x2b88c3=this['isMVAnimation'](_0x519d02),_0x267ad3=new(_0x2b88c3?Sprite_AnimationMV:Sprite_Animation)(),_0x5cf09d=this['makeTargetSprites'](_0x2aa8bb);this[_0x402f8d(0x326)](_0x2aa8bb[0x0])&&(_0x83865f=!_0x83865f);_0x267ad3[_0x402f8d(0x5a3)]=_0x2aa8bb,_0x267ad3[_0x402f8d(0x182)](_0x5cf09d,_0x519d02,_0x83865f,_0x3a088a),_0x267ad3[_0x402f8d(0x23c)](_0x1c5a8e),this['addAnimationSpriteToContainer'](_0x267ad3);if(this[_0x402f8d(0x400)])this[_0x402f8d(0x400)][_0x402f8d(0x33d)](_0x267ad3);this[_0x402f8d(0x296)][_0x402f8d(0x1fe)](_0x267ad3);},Spriteset_Base[_0x2a005f(0x7d8)]['addAnimationSpriteToContainer']=function(_0x34fbbb){this['_effectsContainer']['addChild'](_0x34fbbb);},Spriteset_Base['prototype'][_0x2a005f(0x84f)]=function(_0x5f5934){const _0x471c40=_0x2a005f;this[_0x471c40(0x400)][_0x471c40(0x33d)](_0x5f5934),this[_0x471c40(0x6d2)](_0x5f5934);for(const _0x4de081 of _0x5f5934['targetObjects']){_0x4de081[_0x471c40(0x3cc)]&&_0x4de081[_0x471c40(0x3cc)]();}_0x5f5934['destroy']();},Spriteset_Base[_0x2a005f(0x7d8)][_0x2a005f(0x477)]=function(_0x4f1ba7){const _0x10912c=_0x2a005f;this[_0x10912c(0x296)][_0x10912c(0x33d)](_0x4f1ba7),this[_0x10912c(0x6d2)](_0x4f1ba7);for(const _0x112da1 of _0x4f1ba7[_0x10912c(0x5a3)]){_0x112da1[_0x10912c(0x3cc)]&&_0x112da1[_0x10912c(0x3cc)]();}_0x4f1ba7[_0x10912c(0x893)]();},Spriteset_Base[_0x2a005f(0x7d8)][_0x2a005f(0x6d2)]=function(_0x3272b5){const _0x1e1a3d=_0x2a005f;this[_0x1e1a3d(0x89a)][_0x1e1a3d(0x5b9)](_0x3272b5);},Spriteset_Base[_0x2a005f(0x7d8)]['removeAllFauxAnimations']=function(){const _0x1c6bdb=_0x2a005f;for(const _0x27690e of this[_0x1c6bdb(0x296)]){this[_0x1c6bdb(0x477)](_0x27690e);}},Spriteset_Base['prototype'][_0x2a005f(0x1c1)]=function(){const _0x47f4e9=_0x2a005f;return this[_0x47f4e9(0x296)]['length']>0x0;},Spriteset_Base[_0x2a005f(0x7d8)][_0x2a005f(0x6f2)]=function(){const _0x32b24c=_0x2a005f;for(const _0x16ed7a of this[_0x32b24c(0x3e6)]){!_0x16ed7a[_0x32b24c(0x58f)]()&&this[_0x32b24c(0x2b9)](_0x16ed7a);}this['processPointAnimationRequests']();},Spriteset_Base[_0x2a005f(0x7d8)][_0x2a005f(0x4b4)]=function(){const _0x6459b=_0x2a005f;for(;;){const _0x586ac6=$gameTemp[_0x6459b(0x28a)]();if(_0x586ac6)this[_0x6459b(0x5a1)](_0x586ac6);else break;}},Spriteset_Base[_0x2a005f(0x7d8)][_0x2a005f(0x5a1)]=function(_0xaabc37){const _0x171ab7=_0x2a005f,_0x4f73c5=$dataAnimations[_0xaabc37[_0x171ab7(0x487)]],_0x4d6e06=this[_0x171ab7(0x68c)](_0xaabc37),_0x3213ef=_0xaabc37[_0x171ab7(0x76d)],_0xb86a2f=_0xaabc37[_0x171ab7(0x7d9)];let _0xec7a6=this[_0x171ab7(0x569)]();const _0x196e3b=this[_0x171ab7(0x476)]();if(this[_0x171ab7(0x1a1)](_0x4f73c5))for(const _0x325101 of _0x4d6e06){this[_0x171ab7(0x587)]([_0x325101],_0x4f73c5,_0x3213ef,_0xec7a6,_0xb86a2f),_0xec7a6+=_0x196e3b;}else this['createPointAnimationSprite'](_0x4d6e06,_0x4f73c5,_0x3213ef,_0xec7a6,_0xb86a2f);},Spriteset_Base[_0x2a005f(0x7d8)][_0x2a005f(0x68c)]=function(_0x300704){const _0x1283f5=_0x2a005f,_0x1bf878=new Sprite_Clickable(),_0x5d9ed3=this[_0x1283f5(0x5c4)]();_0x1bf878['x']=_0x300704['x']-_0x5d9ed3['x'],_0x1bf878['y']=_0x300704['y']-_0x5d9ed3['y'],_0x1bf878['z']=0x64;const _0x3f7384=this[_0x1283f5(0x5c4)]();return _0x3f7384[_0x1283f5(0x22e)](_0x1bf878),[_0x1bf878];},Spriteset_Base[_0x2a005f(0x7d8)][_0x2a005f(0x5c4)]=function(){return this;},Spriteset_Map[_0x2a005f(0x7d8)]['getPointAnimationLayer']=function(){return this['_tilemap']||this;},Spriteset_Battle[_0x2a005f(0x7d8)]['getPointAnimationLayer']=function(){return this['_battleField']||this;},Spriteset_Base['prototype']['createPointAnimationSprite']=function(_0x3593f0,_0x4a259d,_0x7b849b,_0x5e8093,_0xfe046e){const _0x3db9bc=_0x2a005f,_0x26b1c5=this['isMVAnimation'](_0x4a259d),_0xe86ed3=new(_0x26b1c5?Sprite_AnimationMV:Sprite_Animation)();_0xe86ed3[_0x3db9bc(0x5a3)]=_0x3593f0,_0xe86ed3[_0x3db9bc(0x182)](_0x3593f0,_0x4a259d,_0x7b849b,_0x5e8093),_0xe86ed3[_0x3db9bc(0x23c)](_0xfe046e),this[_0x3db9bc(0x4e3)](_0xe86ed3),this[_0x3db9bc(0x3e6)][_0x3db9bc(0x1fe)](_0xe86ed3);},Spriteset_Base['prototype'][_0x2a005f(0x2b9)]=function(_0x8ec5f2){const _0x4c463a=_0x2a005f;this[_0x4c463a(0x3e6)][_0x4c463a(0x33d)](_0x8ec5f2),this[_0x4c463a(0x89a)]['removeChild'](_0x8ec5f2);for(const _0x1e4156 of _0x8ec5f2[_0x4c463a(0x5a3)]){_0x1e4156['endAnimation']&&_0x1e4156[_0x4c463a(0x3cc)]();const _0x1e0523=this['getPointAnimationLayer']();if(_0x1e0523)_0x1e0523[_0x4c463a(0x5b9)](_0x1e4156);}_0x8ec5f2[_0x4c463a(0x893)]();},Spriteset_Base[_0x2a005f(0x7d8)][_0x2a005f(0x539)]=function(){const _0x1a3918=_0x2a005f;for(const _0x997b10 of this[_0x1a3918(0x3e6)]){this[_0x1a3918(0x2b9)](_0x997b10);}},Spriteset_Base[_0x2a005f(0x7d8)][_0x2a005f(0x87c)]=function(){const _0x2f5bd6=_0x2a005f;return this[_0x2f5bd6(0x3e6)]['length']>0x0;},VisuMZ[_0x2a005f(0x63d)]['Spriteset_Base_isAnimationPlaying']=Spriteset_Base[_0x2a005f(0x7d8)][_0x2a005f(0x2db)],Spriteset_Base['prototype'][_0x2a005f(0x2db)]=function(){const _0x5427f2=_0x2a005f;return VisuMZ[_0x5427f2(0x63d)]['Spriteset_Base_isAnimationPlaying']['call'](this)||this[_0x5427f2(0x87c)]();},Spriteset_Map[_0x2a005f(0x662)]=VisuMZ['CoreEngine'][_0x2a005f(0x52e)][_0x2a005f(0x213)][_0x2a005f(0x588)]||![],VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x7e8)]=Scene_Map['prototype'][_0x2a005f(0x84c)],Scene_Map['prototype'][_0x2a005f(0x84c)]=function(){const _0x46028b=_0x2a005f;VisuMZ['CoreEngine'][_0x46028b(0x7e8)][_0x46028b(0x873)](this);if(!Spriteset_Map[_0x46028b(0x662)])return;const _0x43364c=this[_0x46028b(0x733)];if(!_0x43364c)return;this[_0x46028b(0x681)]=_0x43364c[_0x46028b(0x681)];if(!this[_0x46028b(0x681)])return;this['addChild'](this[_0x46028b(0x681)]);},Spriteset_Battle[_0x2a005f(0x662)]=VisuMZ[_0x2a005f(0x63d)]['Settings'][_0x2a005f(0x213)][_0x2a005f(0x800)]||![],VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x83e)]=Scene_Battle[_0x2a005f(0x7d8)]['createSpriteset'],Scene_Battle[_0x2a005f(0x7d8)]['createSpriteset']=function(){const _0xb29e38=_0x2a005f;VisuMZ[_0xb29e38(0x63d)][_0xb29e38(0x83e)][_0xb29e38(0x873)](this);if(!Spriteset_Battle[_0xb29e38(0x662)])return;const _0x4d1aff=this[_0xb29e38(0x733)];if(!_0x4d1aff)return;this[_0xb29e38(0x681)]=_0x4d1aff[_0xb29e38(0x681)];if(!this['_pictureContainer'])return;this[_0xb29e38(0x22e)](this[_0xb29e38(0x681)]);},Spriteset_Battle[_0x2a005f(0x7d8)]['createBackground']=function(){const _0x497167=_0x2a005f;this[_0x497167(0x7a0)]=new PIXI[(_0x497167(0x624))]['BlurFilter'](clamp=!![]),this['_backgroundSprite']=new Sprite(),this[_0x497167(0x3f4)][_0x497167(0x5af)]=SceneManager[_0x497167(0x3ae)](),this['_backgroundSprite']['filters']=[this['_backgroundFilter']],this[_0x497167(0x81a)][_0x497167(0x22e)](this['_backgroundSprite']);},VisuMZ[_0x2a005f(0x63d)]['Spriteset_Battle_createEnemies']=Spriteset_Battle[_0x2a005f(0x7d8)][_0x2a005f(0x4b7)],Spriteset_Battle[_0x2a005f(0x7d8)][_0x2a005f(0x4b7)]=function(){const _0x49e1b4=_0x2a005f;this[_0x49e1b4(0x8d3)]()&&this[_0x49e1b4(0x80e)](),VisuMZ[_0x49e1b4(0x63d)][_0x49e1b4(0x72e)][_0x49e1b4(0x873)](this);},Spriteset_Battle[_0x2a005f(0x7d8)][_0x2a005f(0x8d3)]=function(){const _0x41d0aa=_0x2a005f,_0x171fdb=VisuMZ['CoreEngine'][_0x41d0aa(0x52e)][_0x41d0aa(0x7e3)];if(!_0x171fdb)return![];if(Utils[_0x41d0aa(0x884)]>='1.3.0'&&!_0x171fdb[_0x41d0aa(0x497)])return![];return _0x171fdb[_0x41d0aa(0x6eb)];},Spriteset_Battle[_0x2a005f(0x7d8)]['repositionEnemiesByResolution']=function(){for(member of $gameTroop['members']()){member['moveRelativeToResolutionChange']();}},VisuMZ['CoreEngine']['Window_Base_initialize']=Window_Base[_0x2a005f(0x7d8)]['initialize'],Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x72f)]=function(_0x30cb5c){const _0x24b0ee=_0x2a005f;_0x30cb5c['x']=Math[_0x24b0ee(0x57f)](_0x30cb5c['x']),_0x30cb5c['y']=Math[_0x24b0ee(0x57f)](_0x30cb5c['y']),_0x30cb5c[_0x24b0ee(0x4c6)]=Math[_0x24b0ee(0x57f)](_0x30cb5c[_0x24b0ee(0x4c6)]),_0x30cb5c[_0x24b0ee(0x8b8)]=Math[_0x24b0ee(0x57f)](_0x30cb5c['height']),this[_0x24b0ee(0x73c)](),VisuMZ['CoreEngine']['Window_Base_initialize'][_0x24b0ee(0x873)](this,_0x30cb5c),this[_0x24b0ee(0x1df)]();},Window_Base['prototype']['initDigitGrouping']=function(){const _0x42d2c8=_0x2a005f;this[_0x42d2c8(0x456)]=VisuMZ[_0x42d2c8(0x63d)][_0x42d2c8(0x52e)][_0x42d2c8(0x213)][_0x42d2c8(0x51b)],this[_0x42d2c8(0x31b)]=VisuMZ[_0x42d2c8(0x63d)][_0x42d2c8(0x52e)][_0x42d2c8(0x213)][_0x42d2c8(0x267)];},Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x59b)]=function(){const _0x56ef37=_0x2a005f;return VisuMZ[_0x56ef37(0x63d)]['Settings'][_0x56ef37(0x444)][_0x56ef37(0x8cd)];},Window_Base[_0x2a005f(0x7d8)]['itemPadding']=function(){const _0x4cde30=_0x2a005f;return VisuMZ[_0x4cde30(0x63d)][_0x4cde30(0x52e)]['Window'][_0x4cde30(0x793)];},Window_Base[_0x2a005f(0x7d8)]['updateBackOpacity']=function(){const _0x40c8e1=_0x2a005f;$gameSystem[_0x40c8e1(0x62a)]?this['backOpacity']=$gameSystem['windowOpacity']():this['backOpacity']=VisuMZ['CoreEngine']['Settings'][_0x40c8e1(0x444)][_0x40c8e1(0x7ba)];},Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x35f)]=function(){const _0x5a353d=_0x2a005f;return VisuMZ[_0x5a353d(0x63d)][_0x5a353d(0x52e)][_0x5a353d(0x444)][_0x5a353d(0x26d)];},Window_Base['prototype'][_0x2a005f(0x5a6)]=function(){const _0x117ca3=_0x2a005f;return VisuMZ[_0x117ca3(0x63d)][_0x117ca3(0x52e)]['Window'][_0x117ca3(0x831)];},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x8bb)]=Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x457)],Window_Base['prototype'][_0x2a005f(0x457)]=function(){const _0x2160f5=_0x2a005f;VisuMZ[_0x2160f5(0x63d)][_0x2160f5(0x8bb)][_0x2160f5(0x873)](this),this[_0x2160f5(0x3e4)]();},Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x66b)]=function(){const _0x202880=_0x2a005f;this[_0x202880(0x3e8)]&&(this[_0x202880(0x3a6)]+=this[_0x202880(0x5a6)](),this[_0x202880(0x3a0)]()&&(this[_0x202880(0x3e8)]=![]));},Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x330)]=function(){const _0x25aefd=_0x2a005f;this[_0x25aefd(0x744)]&&(this[_0x25aefd(0x3a6)]-=this['openingSpeed'](),this[_0x25aefd(0x663)]()&&(this[_0x25aefd(0x744)]=![]));},VisuMZ['CoreEngine'][_0x2a005f(0x3b1)]=Window_Base['prototype'][_0x2a005f(0x549)],Window_Base[_0x2a005f(0x7d8)]['drawText']=function(_0x1c0b03,_0x292521,_0x331898,_0x4df7b7,_0x9982bf){const _0x1892f7=_0x2a005f;if(this['useDigitGrouping']())_0x1c0b03=VisuMZ[_0x1892f7(0x318)](_0x1c0b03);VisuMZ[_0x1892f7(0x63d)]['Window_Base_drawText'][_0x1892f7(0x873)](this,_0x1c0b03,_0x292521,_0x331898,_0x4df7b7,_0x9982bf);},Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x191)]=function(){return this['_digitGrouping'];},VisuMZ[_0x2a005f(0x63d)]['Window_Base_createTextState']=Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x288)],Window_Base[_0x2a005f(0x7d8)]['createTextState']=function(_0x138866,_0xe2e486,_0x4ffdd2,_0x299c41){const _0x5f442c=_0x2a005f;var _0x488afb=VisuMZ[_0x5f442c(0x63d)][_0x5f442c(0x67e)][_0x5f442c(0x873)](this,_0x138866,_0xe2e486,_0x4ffdd2,_0x299c41);if(this[_0x5f442c(0x3c9)]())_0x488afb[_0x5f442c(0x846)]=VisuMZ[_0x5f442c(0x318)](_0x488afb[_0x5f442c(0x846)]);return _0x488afb;},Window_Base['prototype'][_0x2a005f(0x3c9)]=function(){return this['_digitGroupingEx'];},Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x291)]=function(_0xd53459){this['_digitGrouping']=_0xd53459;},Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x445)]=function(_0x4e3ee1){const _0x488620=_0x2a005f;this[_0x488620(0x31b)]=_0x4e3ee1;},VisuMZ['CoreEngine'][_0x2a005f(0x420)]=Window_Base['prototype']['drawIcon'],Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x5ee)]=function(_0x1324be,_0x364c58,_0x1491d2){const _0x213589=_0x2a005f;_0x364c58=Math[_0x213589(0x57f)](_0x364c58),_0x1491d2=Math[_0x213589(0x57f)](_0x1491d2),VisuMZ[_0x213589(0x63d)][_0x213589(0x420)][_0x213589(0x873)](this,_0x1324be,_0x364c58,_0x1491d2);},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x2e7)]=Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x689)],Window_Base['prototype'][_0x2a005f(0x689)]=function(_0x52eb83,_0x310361,_0x4ea616,_0x63551d,_0x3e792a,_0x4f8082){const _0xa9e77a=_0x2a005f;_0x3e792a=_0x3e792a||ImageManager[_0xa9e77a(0x3e0)],_0x4f8082=_0x4f8082||ImageManager[_0xa9e77a(0x6b9)],_0x4ea616=Math['round'](_0x4ea616),_0x63551d=Math['round'](_0x63551d),_0x3e792a=Math['round'](_0x3e792a),_0x4f8082=Math[_0xa9e77a(0x57f)](_0x4f8082),VisuMZ[_0xa9e77a(0x63d)][_0xa9e77a(0x2e7)][_0xa9e77a(0x873)](this,_0x52eb83,_0x310361,_0x4ea616,_0x63551d,_0x3e792a,_0x4f8082);},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x85a)]=Window_Base[_0x2a005f(0x7d8)]['drawCharacter'],Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x45d)]=function(_0x2d9de9,_0x3ea6f3,_0x2568e5,_0x21d7ff){const _0x141782=_0x2a005f;_0x2568e5=Math['round'](_0x2568e5),_0x21d7ff=Math[_0x141782(0x57f)](_0x21d7ff),VisuMZ[_0x141782(0x63d)]['Window_Base_drawCharacter'][_0x141782(0x873)](this,_0x2d9de9,_0x3ea6f3,_0x2568e5,_0x21d7ff);},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x75b)]=Window_Selectable[_0x2a005f(0x7d8)]['itemRect'],Window_Selectable[_0x2a005f(0x7d8)][_0x2a005f(0x572)]=function(_0x32421f){const _0x5d4472=_0x2a005f;let _0x2c41cb=VisuMZ[_0x5d4472(0x63d)][_0x5d4472(0x75b)]['call'](this,_0x32421f);return _0x2c41cb['x']=Math['round'](_0x2c41cb['x']),_0x2c41cb['y']=Math[_0x5d4472(0x57f)](_0x2c41cb['y']),_0x2c41cb[_0x5d4472(0x4c6)]=Math[_0x5d4472(0x57f)](_0x2c41cb['width']),_0x2c41cb[_0x5d4472(0x8b8)]=Math[_0x5d4472(0x57f)](_0x2c41cb['height']),_0x2c41cb;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x5b5)]=Window_StatusBase[_0x2a005f(0x7d8)][_0x2a005f(0x494)],Window_StatusBase[_0x2a005f(0x7d8)][_0x2a005f(0x494)]=function(_0x17c124,_0x249199,_0x1e7b91){const _0x45ca6d=_0x2a005f;_0x249199=Math[_0x45ca6d(0x57f)](_0x249199),_0x1e7b91=Math['round'](_0x1e7b91),VisuMZ[_0x45ca6d(0x63d)][_0x45ca6d(0x5b5)][_0x45ca6d(0x873)](this,_0x17c124,_0x249199,_0x1e7b91);},Window_Base['prototype']['initCoreEasing']=function(){const _0x1ffbf4=_0x2a005f;this[_0x1ffbf4(0x62b)]={'duration':0x0,'wholeDuration':0x0,'type':_0x1ffbf4(0x8b1),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x1ffbf4(0x2cf)]['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this[_0x1ffbf4(0x3c6)],'targetBackOpacity':this[_0x1ffbf4(0x417)],'targetContentsOpacity':this[_0x1ffbf4(0x240)]};},Window_Base[_0x2a005f(0x7d8)]['updateCoreEasing']=function(){const _0x252610=_0x2a005f;if(!this['_coreEasing'])return;if(this[_0x252610(0x62b)][_0x252610(0x7df)]<=0x0)return;this['x']=this[_0x252610(0x4f4)](this['x'],this[_0x252610(0x62b)][_0x252610(0x8d0)]),this['y']=this[_0x252610(0x4f4)](this['y'],this[_0x252610(0x62b)]['targetY']),this[_0x252610(0x2cf)]['x']=this[_0x252610(0x4f4)](this['scale']['x'],this['_coreEasing'][_0x252610(0x774)]),this['scale']['y']=this['applyCoreEasing'](this['scale']['y'],this[_0x252610(0x62b)]['targetScaleY']),this[_0x252610(0x3c6)]=this[_0x252610(0x4f4)](this[_0x252610(0x3c6)],this[_0x252610(0x62b)][_0x252610(0x69c)]),this['backOpacity']=this['applyCoreEasing'](this[_0x252610(0x417)],this[_0x252610(0x62b)][_0x252610(0x250)]),this[_0x252610(0x240)]=this[_0x252610(0x4f4)](this[_0x252610(0x240)],this[_0x252610(0x62b)][_0x252610(0x777)]),this['_coreEasing'][_0x252610(0x7df)]--;},Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x4f4)]=function(_0x2bd45b,_0x25f9a5){const _0x9f2a13=_0x2a005f;if(!this[_0x9f2a13(0x62b)])return _0x25f9a5;const _0x10cd49=this[_0x9f2a13(0x62b)]['duration'],_0x3330f3=this[_0x9f2a13(0x62b)][_0x9f2a13(0x718)],_0x5f32f6=this['calcCoreEasing']((_0x3330f3-_0x10cd49)/_0x3330f3),_0x15b969=this['calcCoreEasing']((_0x3330f3-_0x10cd49+0x1)/_0x3330f3),_0x3ce6d1=(_0x2bd45b-_0x25f9a5*_0x5f32f6)/(0x1-_0x5f32f6);return _0x3ce6d1+(_0x25f9a5-_0x3ce6d1)*_0x15b969;},Window_Base[_0x2a005f(0x7d8)]['calcCoreEasing']=function(_0x5b0125){const _0x7b00d9=_0x2a005f;if(!this[_0x7b00d9(0x62b)])return _0x5b0125;return VisuMZ[_0x7b00d9(0x52d)](_0x5b0125,this[_0x7b00d9(0x62b)][_0x7b00d9(0x1de)]||_0x7b00d9(0x8b1));},Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x855)]=function(_0x32ac04,_0x17f28c){const _0x3ae14d=_0x2a005f;if(!this[_0x3ae14d(0x62b)])return;this['x']=this[_0x3ae14d(0x62b)]['targetX'],this['y']=this[_0x3ae14d(0x62b)][_0x3ae14d(0x55c)],this['scale']['x']=this[_0x3ae14d(0x62b)][_0x3ae14d(0x774)],this[_0x3ae14d(0x2cf)]['y']=this[_0x3ae14d(0x62b)][_0x3ae14d(0x392)],this['opacity']=this['_coreEasing']['targetOpacity'],this[_0x3ae14d(0x417)]=this[_0x3ae14d(0x62b)][_0x3ae14d(0x250)],this['contentsOpacity']=this[_0x3ae14d(0x62b)][_0x3ae14d(0x777)],this['setupCoreEasing'](_0x32ac04,_0x17f28c,this['x'],this['y'],this[_0x3ae14d(0x2cf)]['x'],this[_0x3ae14d(0x2cf)]['y'],this[_0x3ae14d(0x3c6)],this[_0x3ae14d(0x417)],this[_0x3ae14d(0x240)]);},Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x4a4)]=function(_0x537205,_0x437de5,_0x45e748,_0x42c546,_0x38f0eb,_0x57a14a,_0x3d9df3,_0x33c981,_0x47ba18){const _0x4fd444=_0x2a005f;this[_0x4fd444(0x62b)]={'duration':_0x537205,'wholeDuration':_0x537205,'type':_0x437de5,'targetX':_0x45e748,'targetY':_0x42c546,'targetScaleX':_0x38f0eb,'targetScaleY':_0x57a14a,'targetOpacity':_0x3d9df3,'targetBackOpacity':_0x33c981,'targetContentsOpacity':_0x47ba18};},Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x62e)]=function(_0x1b9ebc,_0x36eb91,_0x10cd2f,_0x85d7a8,_0x1f62ea){const _0x3a1f88=_0x2a005f;this[_0x3a1f88(0x360)](),this[_0x3a1f88(0x225)][_0x3a1f88(0x7cb)]=VisuMZ[_0x3a1f88(0x63d)][_0x3a1f88(0x52e)][_0x3a1f88(0x2d3)][_0x3a1f88(0x25f)];const _0x4fde7f=VisuMZ['CoreEngine'][_0x3a1f88(0x52e)][_0x3a1f88(0x2d3)][_0x3a1f88(0x5e5)];if(_0x4fde7f>0x0&&_0x36eb91===TextManager[_0x3a1f88(0x61a)]){const _0x2b3fb4=_0x85d7a8+(this['lineHeight']()-ImageManager[_0x3a1f88(0x6e3)])/0x2;this['drawIcon'](_0x4fde7f,_0x10cd2f+(_0x1f62ea-ImageManager[_0x3a1f88(0x6e0)]),_0x2b3fb4),_0x1f62ea-=ImageManager[_0x3a1f88(0x6e0)]+0x4;}else this[_0x3a1f88(0x312)](ColorManager[_0x3a1f88(0x7ee)]()),this['drawText'](_0x36eb91,_0x10cd2f,_0x85d7a8,_0x1f62ea,_0x3a1f88(0x768)),_0x1f62ea-=this[_0x3a1f88(0x888)](_0x36eb91)+0x6;this[_0x3a1f88(0x49c)]();const _0x5af385=this[_0x3a1f88(0x888)](this['_digitGrouping']?VisuMZ[_0x3a1f88(0x318)](_0x1b9ebc):_0x1b9ebc);_0x5af385>_0x1f62ea?this[_0x3a1f88(0x549)](VisuMZ[_0x3a1f88(0x63d)]['Settings'][_0x3a1f88(0x2d3)][_0x3a1f88(0x201)],_0x10cd2f,_0x85d7a8,_0x1f62ea,_0x3a1f88(0x768)):this[_0x3a1f88(0x549)](_0x1b9ebc,_0x10cd2f,_0x85d7a8,_0x1f62ea,'right'),this['resetFontSettings']();},Window_Base['prototype'][_0x2a005f(0x883)]=function(_0x26d195,_0x5d8c51,_0x5bd6b2,_0x415954,_0x1282bf){const _0x55d5c4=_0x2a005f,_0x4cc7f7=ImageManager['loadSystem'](_0x55d5c4(0x4ae)),_0x400c9d=ImageManager[_0x55d5c4(0x6e0)],_0x1c6e8b=ImageManager[_0x55d5c4(0x6e3)],_0x360969=_0x26d195%0x10*_0x400c9d,_0x371f86=Math['floor'](_0x26d195/0x10)*_0x1c6e8b,_0x5d2b2c=_0x415954,_0x3a2671=_0x415954;this[_0x55d5c4(0x225)]['_context']['imageSmoothingEnabled']=_0x1282bf,this[_0x55d5c4(0x225)][_0x55d5c4(0x2d9)](_0x4cc7f7,_0x360969,_0x371f86,_0x400c9d,_0x1c6e8b,_0x5d8c51,_0x5bd6b2,_0x5d2b2c,_0x3a2671),this[_0x55d5c4(0x225)][_0x55d5c4(0x282)][_0x55d5c4(0x2cc)]=!![];},Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x798)]=function(_0x5b71f0,_0x1cf5eb,_0x55f843,_0x4f90f5,_0x59d519,_0x1b0e44){const _0x32024c=_0x2a005f,_0x14880d=Math[_0x32024c(0x2a7)]((_0x55f843-0x2)*_0x4f90f5),_0x312b30=Sprite_Gauge[_0x32024c(0x7d8)][_0x32024c(0x848)]['call'](this),_0x241ded=_0x1cf5eb+this[_0x32024c(0x59b)]()-_0x312b30-0x2;this['contents'][_0x32024c(0x220)](_0x5b71f0,_0x241ded,_0x55f843,_0x312b30,ColorManager[_0x32024c(0x734)]()),this[_0x32024c(0x225)]['gradientFillRect'](_0x5b71f0+0x1,_0x241ded+0x1,_0x14880d,_0x312b30-0x2,_0x59d519,_0x1b0e44);},Window_Scrollable[_0x2a005f(0x481)]={'enabled':VisuMZ['CoreEngine'][_0x2a005f(0x52e)][_0x2a005f(0x444)]['ShowScrollBar']??!![],'thickness':VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x52e)]['Window'][_0x2a005f(0x47b)]??0x2,'offset':VisuMZ['CoreEngine'][_0x2a005f(0x52e)][_0x2a005f(0x444)][_0x2a005f(0x638)]??0x2,'bodyColor':VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x52e)]['Window'][_0x2a005f(0x298)]??0x0,'offColor':VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x52e)]['Window']['OffBarColor']??0x7,'offOpacity':VisuMZ['CoreEngine']['Settings'][_0x2a005f(0x444)][_0x2a005f(0x233)]??0x80},Window_Base['prototype'][_0x2a005f(0x531)]=function(){const _0x2385af=_0x2a005f;return Window_Scrollable[_0x2385af(0x481)][_0x2385af(0x1b0)]&&Window_Scrollable['SCROLLBAR'][_0x2385af(0x4d8)]>0x0;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x610)]=Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x622)],Window_Base['prototype'][_0x2a005f(0x622)]=function(){const _0xef9dc0=_0x2a005f;VisuMZ[_0xef9dc0(0x63d)][_0xef9dc0(0x610)][_0xef9dc0(0x873)](this),this[_0xef9dc0(0x819)](),this['setupScrollBarBitmap'](!![]),this['setupScrollBarBitmap'](![]);},Window_Base[_0x2a005f(0x7d8)]['createScrollBarSprites']=function(){const _0x4ab9f3=_0x2a005f;if(!this[_0x4ab9f3(0x531)]())return;if(this['_scrollBarHorz']||this[_0x4ab9f3(0x2b3)])return;this[_0x4ab9f3(0x402)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x4ab9f3(0x657)]=new Sprite(),this[_0x4ab9f3(0x2b3)]=new Sprite(),this[_0x4ab9f3(0x22e)](this[_0x4ab9f3(0x657)]),this[_0x4ab9f3(0x22e)](this['_scrollBarVert']);},Window_Base['prototype'][_0x2a005f(0x2ff)]=function(_0xedc691){const _0xbca7f2=_0x2a005f,_0x4ed4eb=_0xedc691?this[_0xbca7f2(0x657)]:this[_0xbca7f2(0x2b3)];if(!_0x4ed4eb)return;const _0x47a281=Window_Scrollable[_0xbca7f2(0x481)],_0x43f4e4=_0x47a281[_0xbca7f2(0x4d8)],_0x16e806=_0xedc691?this[_0xbca7f2(0x2ef)]-_0x43f4e4*0x2:_0x43f4e4,_0x69fa5d=_0xedc691?_0x43f4e4:this[_0xbca7f2(0x8ab)]-_0x43f4e4*0x2;_0x4ed4eb[_0xbca7f2(0x5af)]=new Bitmap(_0x16e806,_0x69fa5d),_0x4ed4eb[_0xbca7f2(0x3aa)](0x0,0x0,_0x16e806,_0x69fa5d),this[_0xbca7f2(0x57e)](_0xedc691);},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x263)]=Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x41b)],Window_Base[_0x2a005f(0x7d8)]['destroyContents']=function(){const _0x38414e=_0x2a005f;VisuMZ[_0x38414e(0x63d)][_0x38414e(0x263)][_0x38414e(0x873)](this),this[_0x38414e(0x4bd)]();},Window_Base['prototype'][_0x2a005f(0x4bd)]=function(){const _0x472cc7=_0x2a005f,_0x1f011c=[this[_0x472cc7(0x657)],this['_scrollBarVert']];for(const _0x407fc9 of _0x1f011c){if(_0x407fc9&&_0x407fc9[_0x472cc7(0x5af)])_0x407fc9['bitmap'][_0x472cc7(0x893)]();}},VisuMZ[_0x2a005f(0x63d)]['Window_Scrollable_update']=Window_Scrollable[_0x2a005f(0x7d8)][_0x2a005f(0x457)],Window_Scrollable[_0x2a005f(0x7d8)][_0x2a005f(0x457)]=function(){const _0x2acb8b=_0x2a005f;VisuMZ[_0x2acb8b(0x63d)]['Window_Scrollable_update']['call'](this),this[_0x2acb8b(0x889)]();},Window_Scrollable[_0x2a005f(0x7d8)][_0x2a005f(0x889)]=function(){const _0x3e016c=_0x2a005f;this['updateScrollBarVisibility'](),this[_0x3e016c(0x3ac)](!![]),this['checkScrollBarBitmap'](![]),this['updateScrollBarPosition'](!![]),this['updateScrollBarPosition'](![]);},Window_Scrollable[_0x2a005f(0x7d8)]['updateScrollBarVisibility']=function(){const _0x159905=_0x2a005f,_0x128f4d=[this[_0x159905(0x657)],this[_0x159905(0x2b3)]];for(const _0x2803ec of _0x128f4d){_0x2803ec&&(_0x2803ec[_0x159905(0x554)]=this[_0x159905(0x531)]()&&this[_0x159905(0x3a0)]());}},Window_Scrollable[_0x2a005f(0x7d8)][_0x2a005f(0x3ac)]=function(_0x317c8c){const _0x40cc8e=_0x2a005f;if(!this[_0x40cc8e(0x402)])return;const _0x5c8478=this[_0x40cc8e(0x4b2)](_0x317c8c),_0x2f353b=this[_0x40cc8e(0x5fb)](_0x317c8c),_0x4c006d=_0x317c8c?_0x40cc8e(0x710):_0x40cc8e(0x541),_0x559b8e=_0x317c8c?_0x40cc8e(0x5fd):'maxVert';(this[_0x40cc8e(0x402)][_0x4c006d]!==_0x5c8478||this[_0x40cc8e(0x402)][_0x559b8e]!==_0x2f353b)&&(this[_0x40cc8e(0x402)][_0x4c006d]=_0x5c8478,this[_0x40cc8e(0x402)][_0x559b8e]=_0x2f353b,this[_0x40cc8e(0x31e)](_0x317c8c,_0x5c8478,_0x2f353b));},Window_Scrollable[_0x2a005f(0x7d8)]['scrollbar']=function(_0x46effc){const _0x1af77a=_0x2a005f;if(this[_0x1af77a(0x543)]!==undefined)return _0x46effc?this[_0x1af77a(0x7fa)]():this[_0x1af77a(0x488)]['y'];return _0x46effc?this[_0x1af77a(0x7fa)]():this[_0x1af77a(0x3e2)]();},Window_Scrollable[_0x2a005f(0x7d8)]['maxScrollbar']=function(_0x1f4948){const _0x1927de=_0x2a005f;if(this[_0x1927de(0x543)]!==undefined)return _0x1f4948?this[_0x1927de(0x71b)]():Math[_0x1927de(0x23f)](0x0,this[_0x1927de(0x543)]-this[_0x1927de(0x8ab)]);return _0x1f4948?this[_0x1927de(0x71b)]():this[_0x1927de(0x511)]();},Window_Scrollable[_0x2a005f(0x7d8)]['scrollbarHeight']=function(){const _0x584803=_0x2a005f;if(this[_0x584803(0x543)]!==undefined)return Math['max'](0x0,this[_0x584803(0x543)]);return this['overallHeight']();},Window_Scrollable[_0x2a005f(0x7d8)][_0x2a005f(0x31e)]=function(_0x396b79,_0x2f3385,_0xcc556e){const _0xacf208=_0x2a005f,_0x30b7f8=_0x396b79?this[_0xacf208(0x657)]:this[_0xacf208(0x2b3)];if(!_0x30b7f8)return;if(!_0x30b7f8[_0xacf208(0x5af)])return;const _0x7f4f1d=_0x30b7f8['bitmap'];_0x7f4f1d[_0xacf208(0x707)]();if(_0xcc556e<=0x0)return;const _0x4a39b9=_0x396b79?this[_0xacf208(0x2ef)]/this[_0xacf208(0x4ab)]():this[_0xacf208(0x8ab)]/this['scrollbarHeight'](),_0x4c6a64=_0x396b79?Math['round'](_0x2f3385*_0x4a39b9):0x0,_0x3431ed=_0x396b79?0x0:Math[_0xacf208(0x57f)](_0x2f3385*_0x4a39b9),_0x96256c=_0x396b79?Math['round'](_0x7f4f1d[_0xacf208(0x4c6)]*_0x4a39b9):_0x7f4f1d[_0xacf208(0x4c6)],_0x32959c=_0x396b79?_0x7f4f1d[_0xacf208(0x8b8)]:Math[_0xacf208(0x57f)](_0x7f4f1d[_0xacf208(0x8b8)]*_0x4a39b9),_0xe387c4=Window_Scrollable[_0xacf208(0x481)],_0x315510=ColorManager[_0xacf208(0x1fa)](_0xe387c4[_0xacf208(0x2fa)]),_0x3a5c25=ColorManager[_0xacf208(0x1fa)](_0xe387c4['bodyColor']),_0x3db73c=_0xe387c4[_0xacf208(0x39d)];_0x7f4f1d['paintOpacity']=_0x3db73c,_0x7f4f1d[_0xacf208(0x1ff)](_0x315510),_0x7f4f1d[_0xacf208(0x371)]=0xff,_0x7f4f1d[_0xacf208(0x220)](_0x4c6a64,_0x3431ed,_0x96256c,_0x32959c,_0x3a5c25);},Window_Base['prototype']['updateScrollBarPosition']=function(_0x5702db){const _0x3653f1=_0x2a005f,_0x40b0d8=_0x5702db?this[_0x3653f1(0x657)]:this[_0x3653f1(0x2b3)];if(!_0x40b0d8)return;const _0x504984=Window_Scrollable[_0x3653f1(0x481)],_0xe807cc=_0x504984['thickness'],_0x4ac22c=_0x504984[_0x3653f1(0x472)];_0x40b0d8['x']=this[_0x3653f1(0x409)]+(_0x5702db?_0xe807cc:this[_0x3653f1(0x2ef)]+_0x4ac22c),_0x40b0d8['y']=this['padding']+(_0x5702db?this[_0x3653f1(0x8ab)]+_0x4ac22c:_0xe807cc);},Window_Selectable[_0x2a005f(0x7d8)]['cursorDown']=function(_0x59a904){const _0x12a340=_0x2a005f;let _0x40e4f2=this[_0x12a340(0x648)]();const _0x9bee3a=this[_0x12a340(0x200)](),_0x4b61cc=this['maxCols']();if(this[_0x12a340(0x853)]()&&(_0x40e4f2<_0x9bee3a||_0x59a904&&_0x4b61cc===0x1)){_0x40e4f2+=_0x4b61cc;if(_0x40e4f2>=_0x9bee3a)_0x40e4f2=_0x9bee3a-0x1;this['smoothSelect'](_0x40e4f2);}else!this[_0x12a340(0x853)]()&&((_0x40e4f2<_0x9bee3a-_0x4b61cc||_0x59a904&&_0x4b61cc===0x1)&&this[_0x12a340(0x781)]((_0x40e4f2+_0x4b61cc)%_0x9bee3a));},VisuMZ[_0x2a005f(0x63d)]['Window_Selectable_cursorDown']=Window_Selectable['prototype'][_0x2a005f(0x50d)],Window_Selectable['prototype'][_0x2a005f(0x50d)]=function(_0x11ddd6){const _0x4e37c6=_0x2a005f;this['isUseModernControls']()&&_0x11ddd6&&this[_0x4e37c6(0x5ca)]()===0x1&&this[_0x4e37c6(0x648)]()===this[_0x4e37c6(0x200)]()-0x1?this['smoothSelect'](0x0):VisuMZ['CoreEngine'][_0x4e37c6(0x525)][_0x4e37c6(0x873)](this,_0x11ddd6);},Window_Selectable['prototype'][_0x2a005f(0x28e)]=function(_0x5e50e8){const _0x58f516=_0x2a005f;let _0x5829d0=Math[_0x58f516(0x23f)](0x0,this[_0x58f516(0x648)]());const _0x28026a=this[_0x58f516(0x200)](),_0x3a785e=this['maxCols']();if(this[_0x58f516(0x853)]()&&_0x5829d0>0x0||_0x5e50e8&&_0x3a785e===0x1){_0x5829d0-=_0x3a785e;if(_0x5829d0<=0x0)_0x5829d0=0x0;this[_0x58f516(0x781)](_0x5829d0);}else!this[_0x58f516(0x853)]()&&((_0x5829d0>=_0x3a785e||_0x5e50e8&&_0x3a785e===0x1)&&this['smoothSelect']((_0x5829d0-_0x3a785e+_0x28026a)%_0x28026a));},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x328)]=Window_Selectable[_0x2a005f(0x7d8)]['cursorUp'],Window_Selectable[_0x2a005f(0x7d8)][_0x2a005f(0x28e)]=function(_0x144418){const _0x3fa9e0=_0x2a005f;this[_0x3fa9e0(0x853)]()&&_0x144418&&this[_0x3fa9e0(0x5ca)]()===0x1&&this[_0x3fa9e0(0x648)]()===0x0?this[_0x3fa9e0(0x781)](this[_0x3fa9e0(0x200)]()-0x1):VisuMZ['CoreEngine'][_0x3fa9e0(0x328)][_0x3fa9e0(0x873)](this,_0x144418);},Window_Selectable[_0x2a005f(0x7d8)][_0x2a005f(0x853)]=function(){const _0x797e81=_0x2a005f;return VisuMZ[_0x797e81(0x63d)][_0x797e81(0x52e)]['QoL'][_0x797e81(0x5b2)];},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x1fc)]=Window_Selectable[_0x2a005f(0x7d8)]['processCursorMove'],Window_Selectable['prototype'][_0x2a005f(0x591)]=function(){const _0x2f28c4=_0x2a005f;this[_0x2f28c4(0x853)]()?(this['processCursorMoveModernControls'](),this['processCursorHomeEndTrigger']()):VisuMZ[_0x2f28c4(0x63d)][_0x2f28c4(0x1fc)]['call'](this);},Window_Selectable[_0x2a005f(0x7d8)][_0x2a005f(0x468)]=function(){return!![];},Window_Selectable['prototype']['processCursorMoveModernControls']=function(){const _0x4d822d=_0x2a005f;if(this[_0x4d822d(0x67b)]()){const _0x51b69c=this[_0x4d822d(0x648)]();Input[_0x4d822d(0x760)](_0x4d822d(0x35d))&&(Input[_0x4d822d(0x2ee)]('shift')&&this['allowShiftScrolling']()?this[_0x4d822d(0x6b7)]():this[_0x4d822d(0x50d)](Input[_0x4d822d(0x449)]('down'))),Input[_0x4d822d(0x760)]('up')&&(Input[_0x4d822d(0x2ee)](_0x4d822d(0x7c7))&&this[_0x4d822d(0x468)]()?this[_0x4d822d(0x535)]():this[_0x4d822d(0x28e)](Input['isTriggered']('up'))),Input[_0x4d822d(0x760)]('right')&&this[_0x4d822d(0x42d)](Input[_0x4d822d(0x449)](_0x4d822d(0x768))),Input[_0x4d822d(0x760)](_0x4d822d(0x3bf))&&this[_0x4d822d(0x8ae)](Input[_0x4d822d(0x449)]('left')),!this[_0x4d822d(0x7fc)](_0x4d822d(0x29a))&&Input[_0x4d822d(0x760)](_0x4d822d(0x29a))&&this['cursorPagedown'](),!this[_0x4d822d(0x7fc)](_0x4d822d(0x23a))&&Input['isRepeated'](_0x4d822d(0x23a))&&this['cursorPageup'](),this[_0x4d822d(0x648)]()!==_0x51b69c&&this['playCursorSound']();}},Window_Selectable[_0x2a005f(0x7d8)]['processCursorHomeEndTrigger']=function(){const _0x5f4ab2=_0x2a005f;if(this[_0x5f4ab2(0x67b)]()){const _0x14d4ed=this['index']();Input[_0x5f4ab2(0x449)](_0x5f4ab2(0x58b))&&this['smoothSelect'](Math['min'](this['index'](),0x0)),Input['isTriggered'](_0x5f4ab2(0x325))&&this[_0x5f4ab2(0x781)](Math[_0x5f4ab2(0x23f)](this[_0x5f4ab2(0x648)](),this['maxItems']()-0x1)),this[_0x5f4ab2(0x648)]()!==_0x14d4ed&&this[_0x5f4ab2(0x75c)]();}},VisuMZ[_0x2a005f(0x63d)]['Window_Selectable_processTouch']=Window_Selectable[_0x2a005f(0x7d8)][_0x2a005f(0x178)],Window_Selectable[_0x2a005f(0x7d8)][_0x2a005f(0x178)]=function(){const _0xe9a106=_0x2a005f;this['isUseModernControls']()?this[_0xe9a106(0x556)]():VisuMZ[_0xe9a106(0x63d)]['Window_Selectable_processTouch'][_0xe9a106(0x873)](this);},Window_Selectable[_0x2a005f(0x7d8)][_0x2a005f(0x556)]=function(){const _0x40515a=_0x2a005f;VisuMZ[_0x40515a(0x63d)]['Window_Selectable_processTouch'][_0x40515a(0x873)](this);},Window_Selectable[_0x2a005f(0x7d8)]['colSpacing']=function(){const _0x5c539c=_0x2a005f;return VisuMZ[_0x5c539c(0x63d)][_0x5c539c(0x52e)][_0x5c539c(0x444)][_0x5c539c(0x5aa)];},Window_Selectable[_0x2a005f(0x7d8)][_0x2a005f(0x54a)]=function(){const _0x212ee2=_0x2a005f;return VisuMZ[_0x212ee2(0x63d)]['Settings'][_0x212ee2(0x444)][_0x212ee2(0x679)];},Window_Selectable[_0x2a005f(0x7d8)][_0x2a005f(0x4e1)]=function(){const _0x4a055e=_0x2a005f;return Window_Scrollable[_0x4a055e(0x7d8)][_0x4a055e(0x4e1)]['call'](this)+VisuMZ[_0x4a055e(0x63d)][_0x4a055e(0x52e)][_0x4a055e(0x444)]['ItemHeight'];;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x680)]=Window_Selectable[_0x2a005f(0x7d8)][_0x2a005f(0x35a)],Window_Selectable['prototype'][_0x2a005f(0x35a)]=function(_0x457b22){const _0x544abf=_0x2a005f,_0x1d5bb1=VisuMZ[_0x544abf(0x63d)]['Settings'][_0x544abf(0x444)];if(_0x1d5bb1[_0x544abf(0x20f)]===![])return;_0x1d5bb1[_0x544abf(0x4bf)]?_0x1d5bb1[_0x544abf(0x4bf)][_0x544abf(0x873)](this,_0x457b22):VisuMZ[_0x544abf(0x63d)][_0x544abf(0x680)][_0x544abf(0x873)](this,_0x457b22);},VisuMZ['CoreEngine'][_0x2a005f(0x7a1)]=Window_Gold[_0x2a005f(0x7d8)][_0x2a005f(0x32a)],Window_Gold[_0x2a005f(0x7d8)]['refresh']=function(){const _0x4ea7cf=_0x2a005f;this[_0x4ea7cf(0x73e)]()?this['drawGoldItemStyle']():VisuMZ['CoreEngine'][_0x4ea7cf(0x7a1)]['call'](this);},Window_Gold[_0x2a005f(0x7d8)][_0x2a005f(0x73e)]=function(){const _0x5c2f32=_0x2a005f;if(TextManager[_0x5c2f32(0x61a)]!==this[_0x5c2f32(0x61a)]())return![];return VisuMZ[_0x5c2f32(0x63d)][_0x5c2f32(0x52e)][_0x5c2f32(0x2d3)]['ItemStyle'];},Window_Gold[_0x2a005f(0x7d8)][_0x2a005f(0x38d)]=function(){const _0x852313=_0x2a005f;this[_0x852313(0x360)](),this[_0x852313(0x225)][_0x852313(0x707)](),this[_0x852313(0x225)][_0x852313(0x7cb)]=VisuMZ['CoreEngine'][_0x852313(0x52e)]['Gold'][_0x852313(0x25f)];const _0x2bd17f=VisuMZ[_0x852313(0x63d)][_0x852313(0x52e)][_0x852313(0x2d3)][_0x852313(0x5e5)],_0x4b7ad8=this['itemLineRect'](0x0);if(_0x2bd17f>0x0){const _0x472730=_0x4b7ad8['y']+(this[_0x852313(0x59b)]()-ImageManager[_0x852313(0x6e3)])/0x2;this[_0x852313(0x5ee)](_0x2bd17f,_0x4b7ad8['x'],_0x472730);const _0x2ac5d7=ImageManager[_0x852313(0x6e0)]+0x4;_0x4b7ad8['x']+=_0x2ac5d7,_0x4b7ad8[_0x852313(0x4c6)]-=_0x2ac5d7;}this[_0x852313(0x312)](ColorManager[_0x852313(0x7ee)]()),this[_0x852313(0x549)](this[_0x852313(0x61a)](),_0x4b7ad8['x'],_0x4b7ad8['y'],_0x4b7ad8['width'],'left');const _0x2b10b9=this['textWidth'](this['currencyUnit']())+0x6;;_0x4b7ad8['x']+=_0x2b10b9,_0x4b7ad8[_0x852313(0x4c6)]-=_0x2b10b9,this[_0x852313(0x49c)]();const _0x25d167=this[_0x852313(0x795)](),_0x571682=this[_0x852313(0x888)](this[_0x852313(0x456)]?VisuMZ[_0x852313(0x318)](this[_0x852313(0x795)]()):this[_0x852313(0x795)]());_0x571682>_0x4b7ad8[_0x852313(0x4c6)]?this[_0x852313(0x549)](VisuMZ[_0x852313(0x63d)]['Settings'][_0x852313(0x2d3)][_0x852313(0x201)],_0x4b7ad8['x'],_0x4b7ad8['y'],_0x4b7ad8['width'],'right'):this[_0x852313(0x549)](this[_0x852313(0x795)](),_0x4b7ad8['x'],_0x4b7ad8['y'],_0x4b7ad8[_0x852313(0x4c6)],'right'),this[_0x852313(0x360)]();},Window_StatusBase[_0x2a005f(0x7d8)][_0x2a005f(0x885)]=function(_0x247054,_0x137af2,_0x447bd1,_0x84f42d,_0xd88e74){const _0x1c9f1f=_0x2a005f;_0x84f42d=String(_0x84f42d||'')[_0x1c9f1f(0x697)]();if(VisuMZ[_0x1c9f1f(0x63d)][_0x1c9f1f(0x52e)][_0x1c9f1f(0x2ca)][_0x1c9f1f(0x265)]){const _0x4d87ac=VisuMZ[_0x1c9f1f(0x63a)](_0x84f42d);_0xd88e74?(this[_0x1c9f1f(0x883)](_0x4d87ac,_0x247054,_0x137af2,this[_0x1c9f1f(0x490)]()),_0x447bd1-=this['gaugeLineHeight']()+0x2,_0x247054+=this['gaugeLineHeight']()+0x2):(this['drawIcon'](_0x4d87ac,_0x247054+0x2,_0x137af2+0x2),_0x447bd1-=ImageManager[_0x1c9f1f(0x6e0)]+0x4,_0x247054+=ImageManager[_0x1c9f1f(0x6e0)]+0x4);}const _0x279b8b=TextManager['param'](_0x84f42d);this['resetFontSettings'](),this['changeTextColor'](ColorManager[_0x1c9f1f(0x7ee)]()),_0xd88e74?(this[_0x1c9f1f(0x225)]['fontSize']=this['smallParamFontSize'](),this['contents'][_0x1c9f1f(0x549)](_0x279b8b,_0x247054,_0x137af2,_0x447bd1,this[_0x1c9f1f(0x490)](),_0x1c9f1f(0x3bf))):this[_0x1c9f1f(0x549)](_0x279b8b,_0x247054,_0x137af2,_0x447bd1),this['resetFontSettings']();},Window_StatusBase[_0x2a005f(0x7d8)][_0x2a005f(0x7ad)]=function(){const _0x2ee11b=_0x2a005f;return $gameSystem[_0x2ee11b(0x3a8)]()-0x8;},Window_StatusBase[_0x2a005f(0x7d8)][_0x2a005f(0x6e5)]=function(_0x38ef82,_0x2e6bb4,_0xfc7444,_0x382fc1){const _0x4c2d3a=_0x2a005f;_0x382fc1=_0x382fc1||0xa8,this[_0x4c2d3a(0x49c)]();if(VisuMZ[_0x4c2d3a(0x63d)][_0x4c2d3a(0x52e)]['UI'][_0x4c2d3a(0x234)])this[_0x4c2d3a(0x2d0)](_0x38ef82[_0x4c2d3a(0x861)]()['name'],_0x2e6bb4,_0xfc7444,_0x382fc1);else{const _0x50d2a9=_0x38ef82[_0x4c2d3a(0x861)]()[_0x4c2d3a(0x762)]['replace'](/\\I\[(\d+)\]/gi,'');this[_0x4c2d3a(0x549)](_0x50d2a9,_0x2e6bb4,_0xfc7444,_0x382fc1);}},Window_StatusBase[_0x2a005f(0x7d8)]['drawActorNickname']=function(_0x9f0e2b,_0x2f1be8,_0x3938bc,_0x129382){const _0x4d25b0=_0x2a005f;_0x129382=_0x129382||0x10e,this['resetTextColor']();if(VisuMZ[_0x4d25b0(0x63d)][_0x4d25b0(0x52e)]['UI']['TextCodeNicknames'])this[_0x4d25b0(0x2d0)](_0x9f0e2b[_0x4d25b0(0x7ef)](),_0x2f1be8,_0x3938bc,_0x129382);else{const _0x120fe5=_0x9f0e2b[_0x4d25b0(0x7ef)]()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x4d25b0(0x549)](_0x9f0e2b[_0x4d25b0(0x7ef)](),_0x2f1be8,_0x3938bc,_0x129382);}},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x6da)]=Window_StatusBase[_0x2a005f(0x7d8)][_0x2a005f(0x2a5)],Window_StatusBase['prototype']['drawActorLevel']=function(_0x3f97de,_0x371595,_0x1563cd){const _0x557fc5=_0x2a005f;if(VisuMZ[_0x557fc5(0x63d)][_0x557fc5(0x52e)][_0x557fc5(0x2ca)]['ShowActorLevel']===![])return;if(this[_0x557fc5(0x27e)]())this[_0x557fc5(0x7bd)](_0x3f97de,_0x371595,_0x1563cd);VisuMZ[_0x557fc5(0x63d)]['Window_StatusBase_drawActorLevel'][_0x557fc5(0x873)](this,_0x3f97de,_0x371595,_0x1563cd);},Window_StatusBase['prototype'][_0x2a005f(0x27e)]=function(){const _0x5a4399=_0x2a005f;return VisuMZ[_0x5a4399(0x63d)][_0x5a4399(0x52e)]['UI'][_0x5a4399(0x274)];},Window_StatusBase['prototype'][_0x2a005f(0x7bd)]=function(_0x29dae9,_0x1010f0,_0x3119f3){const _0x3e95a2=_0x2a005f;if(!_0x29dae9)return;if(!_0x29dae9[_0x3e95a2(0x827)]())return;const _0x4c67c7=0x80,_0x15fb37=_0x29dae9[_0x3e95a2(0x69a)]();let _0x467ddf=ColorManager[_0x3e95a2(0x6f8)](),_0x1ca3f7=ColorManager[_0x3e95a2(0x676)]();_0x15fb37>=0x1&&(_0x467ddf=ColorManager[_0x3e95a2(0x243)](),_0x1ca3f7=ColorManager['maxLvGaugeColor2']()),this['drawGauge'](_0x1010f0,_0x3119f3,_0x4c67c7,_0x15fb37,_0x467ddf,_0x1ca3f7);},Window_EquipStatus[_0x2a005f(0x7d8)][_0x2a005f(0x5f0)]=function(){const _0x4de3df=_0x2a005f;let _0x5e36b7=0x0;for(const _0x338371 of VisuMZ['CoreEngine']['Settings'][_0x4de3df(0x2ca)][_0x4de3df(0x4f7)]){const _0x1522b0=this[_0x4de3df(0x8c3)](),_0x8d12a3=this[_0x4de3df(0x5a2)](_0x5e36b7);this[_0x4de3df(0x553)](_0x1522b0,_0x8d12a3,_0x338371),_0x5e36b7++;}},Window_EquipStatus['prototype']['drawParamName']=function(_0x246ce3,_0x386849,_0x43f03d){const _0x168361=_0x2a005f,_0x35d09f=this[_0x168361(0x59d)]()-this['itemPadding']()*0x2;this[_0x168361(0x885)](_0x246ce3,_0x386849,_0x35d09f,_0x43f03d,![]);},Window_EquipStatus[_0x2a005f(0x7d8)][_0x2a005f(0x529)]=function(_0x5bf735,_0x120bc0,_0x3578ba){const _0x2c99e7=_0x2a005f,_0x44d47e=this[_0x2c99e7(0x2a9)]();this[_0x2c99e7(0x49c)](),this[_0x2c99e7(0x549)](this[_0x2c99e7(0x845)][_0x2c99e7(0x844)](_0x3578ba,!![]),_0x5bf735,_0x120bc0,_0x44d47e,_0x2c99e7(0x768));},Window_EquipStatus[_0x2a005f(0x7d8)][_0x2a005f(0x7c0)]=function(_0x266c10,_0x2d2a07){const _0x205de7=_0x2a005f,_0x4db24c=this[_0x205de7(0x2e6)]();this[_0x205de7(0x312)](ColorManager[_0x205de7(0x7ee)]());const _0xe00ef=VisuMZ[_0x205de7(0x63d)][_0x205de7(0x52e)]['UI']['ParamArrow'];this[_0x205de7(0x549)](_0xe00ef,_0x266c10,_0x2d2a07,_0x4db24c,_0x205de7(0x5ac));},Window_EquipStatus['prototype'][_0x2a005f(0x840)]=function(_0x5f4c70,_0x2a96a7,_0x170f0b){const _0x32267b=_0x2a005f,_0x4c6a9c=this[_0x32267b(0x2a9)](),_0x3775aa=this[_0x32267b(0x4f9)][_0x32267b(0x844)](_0x170f0b),_0x58946a=_0x3775aa-this[_0x32267b(0x845)][_0x32267b(0x844)](_0x170f0b);this[_0x32267b(0x312)](ColorManager[_0x32267b(0x74f)](_0x58946a)),this['drawText'](this[_0x32267b(0x4f9)]['paramValueByName'](_0x170f0b,!![]),_0x5f4c70,_0x2a96a7,_0x4c6a9c,_0x32267b(0x768));},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x21e)]=Window_EquipItem[_0x2a005f(0x7d8)]['isEnabled'],Window_EquipItem[_0x2a005f(0x7d8)]['isEnabled']=function(_0x13d485){const _0x1a2972=_0x2a005f;return _0x13d485&&this[_0x1a2972(0x845)]?this[_0x1a2972(0x845)]['canEquip'](_0x13d485):VisuMZ[_0x1a2972(0x63d)][_0x1a2972(0x21e)]['call'](this,_0x13d485);},Window_StatusParams[_0x2a005f(0x7d8)][_0x2a005f(0x200)]=function(){const _0x168e18=_0x2a005f;return VisuMZ[_0x168e18(0x63d)]['Settings'][_0x168e18(0x2ca)]['DisplayedParams']['length'];},Window_StatusParams['prototype'][_0x2a005f(0x553)]=function(_0x39b4f3){const _0x405544=_0x2a005f,_0x2aad8a=this[_0x405544(0x2f8)](_0x39b4f3),_0x1ce610=VisuMZ['CoreEngine'][_0x405544(0x52e)][_0x405544(0x2ca)][_0x405544(0x4f7)][_0x39b4f3],_0x1a296e=TextManager[_0x405544(0x642)](_0x1ce610),_0x12f9bc=this[_0x405544(0x845)][_0x405544(0x844)](_0x1ce610,!![]);this[_0x405544(0x885)](_0x2aad8a['x'],_0x2aad8a['y'],0xa0,_0x1ce610,![]),this[_0x405544(0x49c)](),this[_0x405544(0x549)](_0x12f9bc,_0x2aad8a['x']+0xa0,_0x2aad8a['y'],0x3c,'right');};if(VisuMZ['CoreEngine'][_0x2a005f(0x52e)][_0x2a005f(0x3d6)][_0x2a005f(0x361)]){VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x52e)][_0x2a005f(0x3d6)]['QwertyLayout']&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x2a005f(0x7de),'OK']);;VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x806)]=Window_NameInput[_0x2a005f(0x7d8)][_0x2a005f(0x72f)],Window_NameInput[_0x2a005f(0x7d8)][_0x2a005f(0x72f)]=function(_0x19c9a5){const _0x444469=_0x2a005f;this[_0x444469(0x7fb)]=this[_0x444469(0x18b)](),VisuMZ[_0x444469(0x63d)]['Window_NameInput_initialize'][_0x444469(0x873)](this,_0x19c9a5),this[_0x444469(0x7fb)]==='default'?this[_0x444469(0x24a)](0x0):(Input[_0x444469(0x707)](),this[_0x444469(0x461)]());},Window_NameInput['prototype'][_0x2a005f(0x18b)]=function(){const _0x1a04ef=_0x2a005f;if(Input[_0x1a04ef(0x46c)]())return'default';return VisuMZ[_0x1a04ef(0x63d)]['Settings']['KeyboardInput'][_0x1a04ef(0x763)]||_0x1a04ef(0x478);},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x826)]=Window_NameInput['prototype']['processHandling'],Window_NameInput[_0x2a005f(0x7d8)][_0x2a005f(0x316)]=function(){const _0x346468=_0x2a005f;if(!this[_0x346468(0x3a0)]())return;if(!this[_0x346468(0x616)])return;if(this[_0x346468(0x7fb)]===_0x346468(0x478)&&Input[_0x346468(0x7b5)]())this[_0x346468(0x7ca)](_0x346468(0x79e));else{if(Input[_0x346468(0x46e)](_0x346468(0x4b3)))Input['clear'](),this['processBack']();else{if(Input['isTriggered']('tab'))Input[_0x346468(0x707)](),this[_0x346468(0x7fb)]===_0x346468(0x478)?this[_0x346468(0x7ca)](_0x346468(0x79e)):this[_0x346468(0x7ca)](_0x346468(0x478));else{if(this['_mode']===_0x346468(0x478))this[_0x346468(0x7f0)]();else Input[_0x346468(0x46e)](_0x346468(0x65c))?(Input['clear'](),this[_0x346468(0x7ca)](_0x346468(0x478))):VisuMZ[_0x346468(0x63d)][_0x346468(0x826)]['call'](this);}}}},VisuMZ['CoreEngine'][_0x2a005f(0x1db)]=Window_NameInput['prototype'][_0x2a005f(0x178)],Window_NameInput[_0x2a005f(0x7d8)][_0x2a005f(0x178)]=function(){const _0x1a8ad4=_0x2a005f;if(!this['isOpenAndActive']())return;if(this[_0x1a8ad4(0x7fb)]==='keyboard'){if(TouchInput[_0x1a8ad4(0x449)]()&&this[_0x1a8ad4(0x4d4)]())this['switchModes'](_0x1a8ad4(0x79e));else TouchInput[_0x1a8ad4(0x865)]()&&this[_0x1a8ad4(0x7ca)](_0x1a8ad4(0x79e));}else VisuMZ[_0x1a8ad4(0x63d)][_0x1a8ad4(0x1db)][_0x1a8ad4(0x873)](this);},Window_NameInput[_0x2a005f(0x7d8)][_0x2a005f(0x7f0)]=function(){const _0x14ed3c=_0x2a005f;if(Input[_0x14ed3c(0x46e)](_0x14ed3c(0x731)))Input[_0x14ed3c(0x707)](),this[_0x14ed3c(0x4ee)]();else{if(Input[_0x14ed3c(0x652)]!==undefined){let _0x3f9730=Input[_0x14ed3c(0x652)],_0x3947bd=_0x3f9730['length'];for(let _0x2289b=0x0;_0x2289b<_0x3947bd;++_0x2289b){this[_0x14ed3c(0x64c)][_0x14ed3c(0x17b)](_0x3f9730[_0x2289b])?SoundManager[_0x14ed3c(0x33a)]():SoundManager['playBuzzer']();}Input[_0x14ed3c(0x707)]();}}},Window_NameInput[_0x2a005f(0x7d8)]['switchModes']=function(_0x661c75){const _0xd5e00b=_0x2a005f;let _0x401ede=this[_0xd5e00b(0x7fb)];this[_0xd5e00b(0x7fb)]=_0x661c75,_0x401ede!==this[_0xd5e00b(0x7fb)]&&(this[_0xd5e00b(0x32a)](),SoundManager[_0xd5e00b(0x33a)](),this[_0xd5e00b(0x7fb)]==='default'?this['select'](0x0):this[_0xd5e00b(0x24a)](-0x1));},VisuMZ['CoreEngine']['Window_NameInput_cursorDown']=Window_NameInput[_0x2a005f(0x7d8)]['cursorDown'],Window_NameInput[_0x2a005f(0x7d8)][_0x2a005f(0x50d)]=function(_0x207ec4){const _0x344e76=_0x2a005f;if(this[_0x344e76(0x7fb)]==='keyboard'&&!Input[_0x344e76(0x6e6)]())return;if(Input[_0x344e76(0x34f)]())return;VisuMZ[_0x344e76(0x63d)][_0x344e76(0x699)][_0x344e76(0x873)](this,_0x207ec4),this['switchModes'](_0x344e76(0x79e));},VisuMZ[_0x2a005f(0x63d)]['Window_NameInput_cursorUp']=Window_NameInput[_0x2a005f(0x7d8)][_0x2a005f(0x28e)],Window_NameInput['prototype']['cursorUp']=function(_0x5c5d87){const _0x31657b=_0x2a005f;if(this['_mode']==='keyboard'&&!Input[_0x31657b(0x6e6)]())return;if(Input[_0x31657b(0x34f)]())return;VisuMZ[_0x31657b(0x63d)]['Window_NameInput_cursorUp'][_0x31657b(0x873)](this,_0x5c5d87),this[_0x31657b(0x7ca)](_0x31657b(0x79e));},VisuMZ['CoreEngine'][_0x2a005f(0x469)]=Window_NameInput['prototype']['cursorRight'],Window_NameInput['prototype'][_0x2a005f(0x42d)]=function(_0x39444d){const _0x215642=_0x2a005f;if(this[_0x215642(0x7fb)]===_0x215642(0x478)&&!Input['isArrowPressed']())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x215642(0x63d)][_0x215642(0x469)]['call'](this,_0x39444d),this[_0x215642(0x7ca)](_0x215642(0x79e));},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x60b)]=Window_NameInput[_0x2a005f(0x7d8)]['cursorLeft'],Window_NameInput[_0x2a005f(0x7d8)]['cursorLeft']=function(_0xed0bc3){const _0x4ee284=_0x2a005f;if(this[_0x4ee284(0x7fb)]===_0x4ee284(0x478)&&!Input[_0x4ee284(0x6e6)]())return;if(Input[_0x4ee284(0x34f)]())return;VisuMZ[_0x4ee284(0x63d)][_0x4ee284(0x60b)][_0x4ee284(0x873)](this,_0xed0bc3),this['switchModes']('default');},VisuMZ[_0x2a005f(0x63d)]['Window_NameInput_cursorPagedown']=Window_NameInput[_0x2a005f(0x7d8)][_0x2a005f(0x6b7)],Window_NameInput['prototype']['cursorPagedown']=function(){const _0x21c6ce=_0x2a005f;if(this['_mode']===_0x21c6ce(0x478))return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine'][_0x21c6ce(0x1a9)][_0x21c6ce(0x873)](this),this[_0x21c6ce(0x7ca)]('default');},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x4b0)]=Window_NameInput['prototype'][_0x2a005f(0x535)],Window_NameInput['prototype'][_0x2a005f(0x535)]=function(){const _0x66213a=_0x2a005f;if(this[_0x66213a(0x7fb)]===_0x66213a(0x478))return;if(Input[_0x66213a(0x34f)]())return;VisuMZ[_0x66213a(0x63d)][_0x66213a(0x4b0)][_0x66213a(0x873)](this),this[_0x66213a(0x7ca)](_0x66213a(0x79e));},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x5dc)]=Window_NameInput[_0x2a005f(0x7d8)][_0x2a005f(0x32a)],Window_NameInput[_0x2a005f(0x7d8)][_0x2a005f(0x32a)]=function(){const _0x1f03c3=_0x2a005f;if(this['_mode']===_0x1f03c3(0x478)){this['contents'][_0x1f03c3(0x707)](),this[_0x1f03c3(0x56e)][_0x1f03c3(0x707)](),this[_0x1f03c3(0x49c)]();let _0x193195=VisuMZ[_0x1f03c3(0x63d)][_0x1f03c3(0x52e)][_0x1f03c3(0x3d6)][_0x1f03c3(0x555)][_0x1f03c3(0x2fe)]('\x0a'),_0x58de19=_0x193195[_0x1f03c3(0x7c3)],_0x55e0f7=(this[_0x1f03c3(0x8ab)]-_0x58de19*this[_0x1f03c3(0x59b)]())/0x2;for(let _0x98dcca=0x0;_0x98dcca<_0x58de19;++_0x98dcca){let _0x204155=_0x193195[_0x98dcca],_0x2dd590=this[_0x1f03c3(0x899)](_0x204155)[_0x1f03c3(0x4c6)],_0x28efcd=Math[_0x1f03c3(0x2a7)]((this['contents']['width']-_0x2dd590)/0x2);this['drawTextEx'](_0x204155,_0x28efcd,_0x55e0f7),_0x55e0f7+=this[_0x1f03c3(0x59b)]();}}else VisuMZ[_0x1f03c3(0x63d)][_0x1f03c3(0x5dc)][_0x1f03c3(0x873)](this);};};VisuMZ['CoreEngine'][_0x2a005f(0x5d2)]=Window_ShopSell['prototype'][_0x2a005f(0x5f8)],Window_ShopSell[_0x2a005f(0x7d8)][_0x2a005f(0x5f8)]=function(_0x502fb7){const _0x18d574=_0x2a005f;return VisuMZ['CoreEngine'][_0x18d574(0x52e)]['QoL'][_0x18d574(0x6a5)]&&DataManager[_0x18d574(0x864)](_0x502fb7)?![]:VisuMZ[_0x18d574(0x63d)][_0x18d574(0x5d2)][_0x18d574(0x873)](this,_0x502fb7);},Window_NumberInput[_0x2a005f(0x7d8)][_0x2a005f(0x853)]=function(){return![];};VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x52e)][_0x2a005f(0x3d6)][_0x2a005f(0x17d)]&&(VisuMZ['CoreEngine'][_0x2a005f(0x37d)]=Window_NumberInput[_0x2a005f(0x7d8)][_0x2a005f(0x5e0)],Window_NumberInput['prototype']['start']=function(){const _0x283292=_0x2a005f;VisuMZ[_0x283292(0x63d)]['Window_NumberInput_start'][_0x283292(0x873)](this),this[_0x283292(0x24a)](this[_0x283292(0x787)]-0x1),Input[_0x283292(0x707)]();},VisuMZ['CoreEngine'][_0x2a005f(0x6c8)]=Window_NumberInput['prototype']['processDigitChange'],Window_NumberInput[_0x2a005f(0x7d8)][_0x2a005f(0x2ae)]=function(){const _0x1b5a13=_0x2a005f;if(!this['isOpenAndActive']())return;if(Input['isNumpadPressed']())this[_0x1b5a13(0x64e)]();else{if(Input[_0x1b5a13(0x46e)](_0x1b5a13(0x4b3)))this['processKeyboardBackspace']();else{if(Input['_inputSpecialKeyCode']===0x2e)this[_0x1b5a13(0x190)]();else{if(Input[_0x1b5a13(0x72d)]===0x24)this[_0x1b5a13(0x48a)]();else Input[_0x1b5a13(0x72d)]===0x23?this['processKeyboardEnd']():VisuMZ[_0x1b5a13(0x63d)]['Window_NumberInput_processDigitChange']['call'](this);}}}},Window_NumberInput['prototype'][_0x2a005f(0x591)]=function(){const _0x3b90b3=_0x2a005f;if(!this['isCursorMovable']())return;Input[_0x3b90b3(0x34f)]()?this['processKeyboardDigitChange']():Window_Selectable[_0x3b90b3(0x7d8)][_0x3b90b3(0x591)]['call'](this);},Window_NumberInput[_0x2a005f(0x7d8)]['processCursorHomeEndTrigger']=function(){},Window_NumberInput[_0x2a005f(0x7d8)]['processKeyboardDigitChange']=function(){const _0x57b63a=_0x2a005f;if(String(this[_0x57b63a(0x3ee)])[_0x57b63a(0x7c3)]>=this['_maxDigits'])return;const _0x168015=Number(String(this[_0x57b63a(0x3ee)])+Input[_0x57b63a(0x652)]);if(isNaN(_0x168015))return;this[_0x57b63a(0x3ee)]=_0x168015;const _0x21814a='9'[_0x57b63a(0x8ca)](this['_maxDigits']);this['_number']=this[_0x57b63a(0x3ee)]['clamp'](0x0,_0x21814a),Input['clear'](),this['refresh'](),SoundManager[_0x57b63a(0x60c)](),this[_0x57b63a(0x24a)](this[_0x57b63a(0x787)]-0x1);},Window_NumberInput[_0x2a005f(0x7d8)][_0x2a005f(0x304)]=function(){const _0xf7ea2c=_0x2a005f;this[_0xf7ea2c(0x3ee)]=Number(String(this['_number'])[_0xf7ea2c(0x492)](0x0,-0x1)),this[_0xf7ea2c(0x3ee)]=Math[_0xf7ea2c(0x23f)](0x0,this[_0xf7ea2c(0x3ee)]),Input[_0xf7ea2c(0x707)](),this[_0xf7ea2c(0x32a)](),SoundManager[_0xf7ea2c(0x60c)](),this[_0xf7ea2c(0x24a)](this['_maxDigits']-0x1);},Window_NumberInput[_0x2a005f(0x7d8)]['processKeyboardDelete']=function(){const _0x3a96a1=_0x2a005f;this[_0x3a96a1(0x3ee)]=Number(String(this['_number'])[_0x3a96a1(0x245)](0x1)),this[_0x3a96a1(0x3ee)]=Math['max'](0x0,this[_0x3a96a1(0x3ee)]),Input[_0x3a96a1(0x707)](),this[_0x3a96a1(0x32a)](),SoundManager[_0x3a96a1(0x60c)](),this[_0x3a96a1(0x24a)](this[_0x3a96a1(0x787)]-0x1);},Window_NumberInput[_0x2a005f(0x7d8)][_0x2a005f(0x48a)]=function(){const _0x657311=_0x2a005f;if(this['index']()===0x0)return;Input[_0x657311(0x707)](),this[_0x657311(0x32a)](),SoundManager['playCursor'](),this['select'](0x0);},Window_NumberInput[_0x2a005f(0x7d8)][_0x2a005f(0x78f)]=function(){const _0x2be53b=_0x2a005f;if(this[_0x2be53b(0x648)]()===this[_0x2be53b(0x787)]-0x1)return;Input[_0x2be53b(0x707)](),this[_0x2be53b(0x32a)](),SoundManager['playCursor'](),this['select'](this['_maxDigits']-0x1);});;VisuMZ[_0x2a005f(0x63d)]['Window_MapName_refresh']=Window_MapName['prototype']['refresh'],Window_MapName[_0x2a005f(0x7d8)]['refresh']=function(){const _0x4707c1=_0x2a005f;VisuMZ[_0x4707c1(0x63d)][_0x4707c1(0x52e)][_0x4707c1(0x213)][_0x4707c1(0x340)]?this[_0x4707c1(0x20b)]():VisuMZ[_0x4707c1(0x63d)]['Window_MapName_refresh']['call'](this);},Window_MapName[_0x2a005f(0x7d8)][_0x2a005f(0x20b)]=function(){const _0x284bb3=_0x2a005f;this[_0x284bb3(0x225)]['clear']();if($gameMap['displayName']()){const _0x385b26=this[_0x284bb3(0x2ef)];this['drawBackground'](0x0,0x0,_0x385b26,this['lineHeight']());const _0x17e851=this[_0x284bb3(0x899)]($gameMap[_0x284bb3(0x32d)]())[_0x284bb3(0x4c6)];this[_0x284bb3(0x2d0)]($gameMap['displayName'](),Math[_0x284bb3(0x2a7)]((_0x385b26-_0x17e851)/0x2),0x0);}},Window_TitleCommand[_0x2a005f(0x3ce)]=VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x52e)][_0x2a005f(0x48b)],Window_TitleCommand[_0x2a005f(0x7d8)][_0x2a005f(0x7c5)]=function(){const _0x97163b=_0x2a005f;this[_0x97163b(0x2da)]();},Window_TitleCommand['prototype'][_0x2a005f(0x2da)]=function(){const _0x516bb5=_0x2a005f;for(const _0x84b51d of Window_TitleCommand['_commandList']){if(_0x84b51d[_0x516bb5(0x1f5)][_0x516bb5(0x873)](this)){const _0x2b490b=_0x84b51d[_0x516bb5(0x2c5)];let _0xae6320=_0x84b51d[_0x516bb5(0x7c1)];if(['',_0x516bb5(0x173)][_0x516bb5(0x34a)](_0xae6320))_0xae6320=_0x84b51d[_0x516bb5(0x1eb)][_0x516bb5(0x873)](this);const _0x3e0fc9=_0x84b51d[_0x516bb5(0x4e9)]['call'](this),_0x560231=_0x84b51d[_0x516bb5(0x3d2)]['call'](this);this[_0x516bb5(0x466)](_0xae6320,_0x2b490b,_0x3e0fc9,_0x560231),this[_0x516bb5(0x3ad)](_0x2b490b,_0x84b51d[_0x516bb5(0x4cc)][_0x516bb5(0x80d)](this,_0x560231));}}},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x196)]=Window_TitleCommand[_0x2a005f(0x7d8)][_0x2a005f(0x45b)],Window_TitleCommand[_0x2a005f(0x7d8)][_0x2a005f(0x45b)]=function(){const _0x36239e=_0x2a005f;VisuMZ['CoreEngine']['Window_TitleCommand_selectLast'][_0x36239e(0x873)](this);if(!Window_TitleCommand[_0x36239e(0x755)])return;const _0x4d66d5=this[_0x36239e(0x693)](Window_TitleCommand[_0x36239e(0x755)]),_0x15bbc6=Math[_0x36239e(0x2a7)](this[_0x36239e(0x467)]()/0x2)-0x1;this['smoothSelect'](_0x4d66d5),this[_0x36239e(0x727)]>0x1&&(this[_0x36239e(0x727)]=0x1,this[_0x36239e(0x6f5)]()),this[_0x36239e(0x24b)](_0x4d66d5-_0x15bbc6);},Window_GameEnd[_0x2a005f(0x3ce)]=VisuMZ['CoreEngine'][_0x2a005f(0x52e)][_0x2a005f(0x79c)][_0x2a005f(0x59f)][_0x2a005f(0x232)],Window_GameEnd[_0x2a005f(0x7d8)][_0x2a005f(0x7c5)]=function(){const _0x218ca9=_0x2a005f;this[_0x218ca9(0x2da)]();},Window_GameEnd[_0x2a005f(0x7d8)][_0x2a005f(0x2da)]=function(){const _0x36e91b=_0x2a005f;for(const _0x57c4f4 of Window_GameEnd['_commandList']){if(_0x57c4f4[_0x36e91b(0x1f5)][_0x36e91b(0x873)](this)){const _0x40cae0=_0x57c4f4['Symbol'];let _0x36e906=_0x57c4f4[_0x36e91b(0x7c1)];if(['','Untitled'][_0x36e91b(0x34a)](_0x36e906))_0x36e906=_0x57c4f4[_0x36e91b(0x1eb)][_0x36e91b(0x873)](this);const _0x8a202c=_0x57c4f4[_0x36e91b(0x4e9)][_0x36e91b(0x873)](this),_0x45af8c=_0x57c4f4['ExtJS'][_0x36e91b(0x873)](this);this[_0x36e91b(0x466)](_0x36e906,_0x40cae0,_0x8a202c,_0x45af8c),this[_0x36e91b(0x3ad)](_0x40cae0,_0x57c4f4[_0x36e91b(0x4cc)][_0x36e91b(0x80d)](this,_0x45af8c));}}};function Window_ButtonAssist(){const _0x1d3fbf=_0x2a005f;this[_0x1d3fbf(0x72f)](...arguments);}Window_ButtonAssist[_0x2a005f(0x7d8)]=Object[_0x2a005f(0x18c)](Window_Base[_0x2a005f(0x7d8)]),Window_ButtonAssist['prototype']['constructor']=Window_ButtonAssist,Window_ButtonAssist['prototype'][_0x2a005f(0x72f)]=function(_0x50d159){const _0x5e4be8=_0x2a005f;this[_0x5e4be8(0x823)]={},Window_Base[_0x5e4be8(0x7d8)][_0x5e4be8(0x72f)][_0x5e4be8(0x873)](this,_0x50d159),this[_0x5e4be8(0x816)](VisuMZ[_0x5e4be8(0x63d)][_0x5e4be8(0x52e)]['ButtonAssist'][_0x5e4be8(0x177)]||0x0),this[_0x5e4be8(0x32a)]();},Window_ButtonAssist[_0x2a005f(0x7d8)]['makeFontBigger']=function(){const _0x1ae6e2=_0x2a005f;this[_0x1ae6e2(0x225)][_0x1ae6e2(0x7cb)]<=0x60&&(this[_0x1ae6e2(0x225)][_0x1ae6e2(0x7cb)]+=0x6);},Window_ButtonAssist[_0x2a005f(0x7d8)][_0x2a005f(0x6bf)]=function(){const _0x1dbc81=_0x2a005f;this[_0x1dbc81(0x225)][_0x1dbc81(0x7cb)]>=0x18&&(this[_0x1dbc81(0x225)][_0x1dbc81(0x7cb)]-=0x6);},Window_ButtonAssist[_0x2a005f(0x7d8)][_0x2a005f(0x457)]=function(){const _0x1fdfcd=_0x2a005f;Window_Base[_0x1fdfcd(0x7d8)][_0x1fdfcd(0x457)][_0x1fdfcd(0x873)](this),this[_0x1fdfcd(0x66f)]();},Window_ButtonAssist[_0x2a005f(0x7d8)][_0x2a005f(0x5b4)]=function(){const _0x1fb59b=_0x2a005f;this[_0x1fb59b(0x409)]=SceneManager[_0x1fb59b(0x458)][_0x1fb59b(0x82e)]()!==_0x1fb59b(0x812)?0x0:0x8;},Window_ButtonAssist[_0x2a005f(0x7d8)][_0x2a005f(0x66f)]=function(){const _0x54ccdc=_0x2a005f,_0x417a8b=SceneManager['_scene'];for(let _0x13375d=0x1;_0x13375d<=0x5;_0x13375d++){if(this['_data'][_0x54ccdc(0x19e)['format'](_0x13375d)]!==_0x417a8b[_0x54ccdc(0x1b7)[_0x54ccdc(0x594)](_0x13375d)]())return this[_0x54ccdc(0x32a)]();if(this[_0x54ccdc(0x823)]['text%1'[_0x54ccdc(0x594)](_0x13375d)]!==_0x417a8b[_0x54ccdc(0x562)['format'](_0x13375d)]())return this[_0x54ccdc(0x32a)]();}},Window_ButtonAssist[_0x2a005f(0x7d8)][_0x2a005f(0x32a)]=function(){const _0x1e5953=_0x2a005f;this[_0x1e5953(0x225)]['clear']();for(let _0x55f12b=0x1;_0x55f12b<=0x5;_0x55f12b++){this[_0x1e5953(0x189)](_0x55f12b);}},Window_ButtonAssist['prototype'][_0x2a005f(0x189)]=function(_0x8ba217){const _0x22bbc4=_0x2a005f,_0xfbbbdb=this[_0x22bbc4(0x2ef)]/0x5,_0x4a2290=SceneManager[_0x22bbc4(0x458)],_0x1df09d=_0x4a2290[_0x22bbc4(0x1b7)[_0x22bbc4(0x594)](_0x8ba217)](),_0x44873b=_0x4a2290[_0x22bbc4(0x562)[_0x22bbc4(0x594)](_0x8ba217)]();this[_0x22bbc4(0x823)][_0x22bbc4(0x19e)['format'](_0x8ba217)]=_0x1df09d,this[_0x22bbc4(0x823)][_0x22bbc4(0x628)[_0x22bbc4(0x594)](_0x8ba217)]=_0x44873b;if(_0x1df09d==='')return;if(_0x44873b==='')return;const _0x4037ff=_0x4a2290['buttonAssistOffset%1'[_0x22bbc4(0x594)](_0x8ba217)](),_0x456b62=this['itemPadding'](),_0x1c2e2f=_0xfbbbdb*(_0x8ba217-0x1)+_0x456b62+_0x4037ff,_0x375f3f=VisuMZ[_0x22bbc4(0x63d)][_0x22bbc4(0x52e)][_0x22bbc4(0x205)][_0x22bbc4(0x7d3)];this[_0x22bbc4(0x2d0)](_0x375f3f['format'](_0x1df09d,_0x44873b),_0x1c2e2f,0x0,_0xfbbbdb-_0x456b62*0x2);},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x385)]=Game_Interpreter['prototype'][_0x2a005f(0x294)],Game_Interpreter[_0x2a005f(0x7d8)][_0x2a005f(0x294)]=function(){const _0x4087ee=_0x2a005f;if($gameTemp['_pictureCoordinatesMode']!==undefined)return VisuMZ[_0x4087ee(0x63d)][_0x4087ee(0x2aa)]();return VisuMZ['CoreEngine']['Game_Interpreter_updateWaitMode'][_0x4087ee(0x873)](this);},VisuMZ[_0x2a005f(0x63d)]['UpdatePictureCoordinates']=function(){const _0x213a19=_0x2a005f,_0x39ba99=$gameTemp['_pictureCoordinatesMode']||0x0;(_0x39ba99<0x0||_0x39ba99>0x64||TouchInput['isCancelled']()||Input['isTriggered']('cancel'))&&($gameTemp[_0x213a19(0x705)]=undefined,Input[_0x213a19(0x707)](),TouchInput[_0x213a19(0x707)]());const _0x537c5a=$gameScreen[_0x213a19(0x605)](_0x39ba99);return _0x537c5a&&(_0x537c5a['_x']=TouchInput['_x'],_0x537c5a['_y']=TouchInput['_y']),VisuMZ['CoreEngine'][_0x213a19(0x431)](),$gameTemp['_pictureCoordinatesMode']!==undefined;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x431)]=function(){const _0x5f440f=_0x2a005f,_0x59bd37=SceneManager[_0x5f440f(0x458)];if(!_0x59bd37)return;!_0x59bd37['_pictureCoordinatesWindow']&&(SoundManager[_0x5f440f(0x82c)](),_0x59bd37[_0x5f440f(0x23e)]=new Window_PictureCoordinates(),_0x59bd37['addChild'](_0x59bd37['_pictureCoordinatesWindow'])),$gameTemp[_0x5f440f(0x705)]===undefined&&(SoundManager[_0x5f440f(0x3c4)](),_0x59bd37[_0x5f440f(0x5b9)](_0x59bd37['_pictureCoordinatesWindow']),_0x59bd37['_pictureCoordinatesWindow']=undefined);};function _0x1a3f(){const _0x21d5d5=['INOUTCIRC','down2','paramFlatJS','movePageButtonSideButtonLayout','_animation','ParseStateNotetags','isGamepadButtonPressed','ParseEnemyNotetags','onActorChange','goto','Scene_Battle_createSpriteset_detach','Sprite_Gauge_currentValue','drawNewParam','_blank','isCollidedWithEvents','centerCameraCheckData','paramValueByName','_actor','text','vertJS','gaugeHeight','GoldBgType','PageChange','KeyUnlisted','createSpriteset','NUMPAD7','ColorMPGauge1','removeAnimation','scrollLeft','catchException','pointY','isUseModernControls','baseId','anchorCoreEasing','Game_Picture_scaleX','nextLevelExp','MainMenu','Opacity','Window_Base_drawCharacter','textColor','CTB','IconXParam6','runCombinedScrollingTextAsCode','Bitmap_resize','SELECT','currentClass','CategoryBgType','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','isKeyItem','isCancelled','helpWindowRect','ColorExpGauge1','60920YQvHLa','_stored_powerDownColor','paramFlat','INOUTBOUNCE','Graphics_printError','IconXParam3','isEnemy','scaleX','subject','WIN_OEM_BACKTAB','DimColor2','call','setAction','HelpRect','numberShowButton','process_VisuMZ_CoreEngine_CustomParameters','_forcedBattleSys','InputBgType','VisuMZ_2_BattleSystemSTB','Scene_Skill_create','isPointAnimationPlaying','610826znTlHs','buttonAssistOk','StatusMenu','OptionsMenu','loadSystemImages','helpAreaBottom','drawIconBySize','RPGMAKER_VERSION','drawParamText','PRINT','tpColor','textWidth','updateScrollBars','<JS\x20%1\x20%2:[\x20](.*)>','randomInt','processSoundTimings','ParseWeaponNotetags','offsetY','MEV','_refreshBack','#%1','OptionsBgType','destroy','DigitGroupingLocale','ETB','Scene_Map_updateMainMultiply','setGuard','_stored_powerUpColor','textSizeEx','_effectsContainer','VisuMZ_2_BattleSystemETB','command105','F19','PictureEasingType','ControllerMatches','SystemSetSideView','skills','DefaultStyle','Game_Actor_paramBase','Scene_Map_createSpriteset','SceneManager_initialize','stretch','Game_Actor_levelUp','contains','keyMapper','_index','innerHeight','createBackground','MultiKeyFmt','cursorLeft','Basic','ParseAllNotetags','LINEAR','enemy','commandWindowRows','adjustSprite','Input_clear','Flat1','numActions','height','lastAnimationSprite','faces','Window_Base_update','Sprite_Picture_updateOrigin','_displayX','option','displayX','_commandWindow','_actorWindow','parseForcedGameTroopSettingsCoreEngine','itemPadding','Chance','AudioChangeBgmVolume','PositionJS','Name','PictureID','buttons','repeat','Speed','xparamRate1','LineHeight','createWindowLayer','setupCoreEngine','targetX','Duration','XParamVocab7','coreEngineRepositionEnemies','ParamMax','Keyboard','clearOnceParallelInterpreters','TimeProgress','Location','getBattleSystem','checkSmartEventCollision','currentLevelExp','Game_Actor_changeClass','VariableJsBlock','maxTurns','Untitled','isBottomHelpMode','createCustomParameter','ShopMenu','BgType','processTouch','Game_Picture_x','Bitmap_blt','add','measureText','EnableNumberInput','_timerSprite','windowPadding','buyWindowRect','setValue','setup','drawCircle','updateMainMultiply','createCancelButton','_shakePower','ceil','FUNC','drawSegment','_statusEquipWindow','defaultInputMode','create','_list','updatePositionCoreEngineShakeHorz','setSkill','processKeyboardDelete','useDigitGrouping','jsQuickFunc','_cacheScaleX','_shakeDuration','INOUTQUART','Window_TitleCommand_selectLast','buttonY','ColorCrisis','battlebacks1','bitmapHeight','targetEvaRate','JUNJA','_scaleX','key%1','replace','CustomParamAbb','isAnimationForEach','SellRect','PictureShowIcon','waiting','viewport','DataManager_setupNewGame','BTestItems','setupRate','Window_NameInput_cursorPagedown','isMagical','powerDownColor','blockWidth','SideButtons','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','none','enabled','itemBackColor1','yScrollLinkedOffset','EscapeAlways','_width','updateOnceParallelInterpreters','Scene_MenuBase_mainAreaTop','buttonAssistKey%1','TPB\x20WAIT','Game_Picture_initBasic','Scene_MenuBase_helpAreaTop','_targetScaleY','onload','Scene_Base_create','refreshDimmerBitmap','_paramPlus','win32','isFauxAnimationPlaying','%2%1%3','EnableMasking','SUBTRACT','ImprovedAccuracySystem','Scene_GameEnd_createBackground','_bgsBuffer','gainGold','itemBackColor2','_storedStack','DisplayLockY','events','Linear','HRG','isMVAnimation','FontSmoothing','volume','_active','onDatabaseLoaded','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ListBgType','xparam','maxBattleMembers','WIN_OEM_PA3','loading','clearZoom','Window_NameInput_processTouch','KEEP','_origin','type','initCoreEasing','playMiss','AutoStretch','keypress','Exported_Script_%1.txt','ParseActorNotetags','_downArrowSprite','PictureEraseRange','isAnimationOffsetXMirrored','SLASH','SkillMenu','cos','TextJS','Flat','ParamChange','_centerCameraCheck','randomJS','_sellWindow','ONE','setColorTone','setupValueFont','AnimationPoint','ShowJS','buttonAssistWindowSideRect','SceneManager_onKeyDown','XParamVocab9','description','getColor','command355','Window_Selectable_processCursorMove','arePageButtonsEnabled','push','fillAll','maxItems','GoldOverlap','IconXParam1','MCR','Graphics_centerElement','ButtonAssist','HIT','ItemBackColor2','F16','reservePlayTestNewGameCommonEvent','NoTileShadows','refreshWithTextCodeSupport','ScaleY','strokeRect','_statusParamsWindow','ShowItemBackground','_colorTone','SubfolderParse','_targetOffsetX','QoL','Color','hide','IconParam3','createTitleButtons','createFauxAnimationQueue','sparamFlat1','updateLastTarget','min','loadWindowskin','WIN_OEM_FJ_JISHO','Window_EquipItem_isEnabled','OUTELASTIC','fillRect','initCoreEngineScreenShake','alpha','_fauxAnimationQueue','ColorGaugeBack','contents','IconSParam9','WIN_OEM_ENLW','_profileWindow','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','command122','AMPERSAND','framebuffer','Troop%1','addChild','Title','DummyBgType','_changingClass','CommandList','OffBarOpacity','TextCodeClassNames','ScaleX','isGamepadAxisMoved','SystemSetBattleSystem','img/%1/','_categoryWindow','pageup','encounterStep','setMute','Script\x20Call\x20Error','_pictureCoordinatesWindow','max','contentsOpacity','Input_onKeyDown','getControllerInputButtonMatch','maxLvGaugeColor1','process_VisuMZ_CoreEngine_Functions','substring','onKeyDown','checkPassage','MIN_SAFE_INTEGER','_pointAnimationQueue','select','setTopRow','itypeId','EXSEL','ADD','createBuffer','targetBackOpacity','%1〘Choice\x20%2〙\x20%3%1','applyForcedGameTroopSettingsCoreEngine','_lastX','Sprite_Battler_startMove','nah','createPointAnimationQueue','subtitle','F11','EditRect','ParseArmorNotetags','IconParam0','updateScene','END','BgFilename1','GoldFontSize','ProfileRect','ParseItemNotetags','buttonAssistOffset3','Window_Base_destroyContents','_playtestF7Looping','DrawIcons','Scene_Base_terminateAnimationClearBugFix','DigitGroupingExText','startMove','skillTypes','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','EndingID','SideView','TranslucentOpacity','_repositioned','XParamVocab4','_encounterCount','FadeSpeed','menu','advanced','LvExpGauge','Game_Action_numRepeats','%1%2','CustomParamType','buttonAssistText3','onKeyDownKeysF6F7','showDevTools','quit','paramMax','onEscapeSuccess','isExpGaugeDrawn','_currentMap','WIN_OEM_PA1','terms','_context','NONCONVERT','<%1\x20%2:[\x20]','CommandWidth','operand','XParamVocab6','createTextState','isTpb','retrievePointAnimation','ColorDeath','TILDE','Game_Picture_calcEasing','cursorUp','VisuMZ_2_BattleSystemFTB','Game_Map_scrollDown','enableDigitGrouping','F21','loadGameImagesCoreEngine','updateWaitMode','gaugeRate','_fauxAnimationSprites','stypeId','BarBodyColor','ColorTPGauge2','pagedown','IconXParam0','FontSize','\x0a\x0a\x0a\x0a\x0a','autoRemovalTiming','setMoveEasingType','ListRect','createFauxAnimation','pow','paramFlatBonus','NUM_LOCK','drawActorLevel','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','floor','INSINE','paramWidth','UpdatePictureCoordinates','Scene_Base_createWindowLayer','useFontWidthFix','outlineColor','processDigitChange','F23','_pictureName','updateMain','TPB\x20ACTIVE','_scrollBarVert','filterArea','GoldRect','_screenY','setupButtonImage','MvAnimationRate','removePointAnimation','original','INOUTCUBIC','constructor','operation','onXhrError','BACK_QUOTE','MAXHP','centerY','_dimmerSprite','sparamPlus1','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','Symbol','_stored_mpCostColor','xparamFlatBonus','EVA','updateOpacity','Param','destroyed','imageSmoothingEnabled','exportAllMapStrings','font','scale','drawTextEx','_clientArea','Scene_Map_createSpritesetFix','Gold','mainAreaHeight','setViewportCoreEngineFix','currentExp','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','SParamVocab9','blt','makeCoreEngineCommandList','isAnimationPlaying','ctrlKey','HELP','setActorHomeRepositioned','numRepeats','StatusBgType','Game_Action_setAttack','LESS_THAN','commandWindowRect','81TCLbXm','mpGaugeColor1','rightArrowWidth','Window_Base_drawFace','BACK_SLASH','_mp','buttonAssistKey3','popScene','IconSParam0','pixelated','isPressed','innerWidth','EXR','AllMaps','ColorPowerUp','setLastPluginCommandInterpreter','SmartEventCollisionPriority','_balloonQueue','itemSuccessRate','AccuracyBoost','itemLineRect','CommandBgType','offColor','ExtDisplayedParams','([\x5c+\x5c-]\x5cd+)([%％])>','missed','split','setupScrollBarBitmap','writeText','CancelText','Bitmap_measureTextWidth','DOWN','processKeyboardBackspace','Plus','_onKeyDown','OUTCUBIC','ActorBgType','disable','_stored_hpGaugeColor2','seVolume','Game_Picture_move','ControllerButtons','animations','_onceParallelInterpreters','Sprite_Button_updateOpacity','_targets','changeTextColor','Abbreviation','mev','STB','processHandling','onInputOk','GroupDigits','hpColor','_buttonAssistWindow','_digitGroupingEx','concat','IconSParam7','refreshScrollBarBitmap','updateFauxAnimations','reserveCommonEvent','isBusy','_makeFontNameText','mainAreaTop','pop','end','animationShouldMirror','ColorNormal','Window_Selectable_cursorUp','scaleSprite','refresh','currentValue','removeAllFauxAnimations','displayName','isItem','getInputMultiButtonStrings','updateClose','toLocaleString','RevertPreserveNumbers','Scene_Status_create','F17','exportAllTroopStrings','getColorDataFromPluginParameters','ColorSystem','buttonAssistWindowButtonRect','render','playOk','ShowDevTools','AllTroops','remove','Sprite_Animation_processSoundTimings','alignBottom','MapNameTextCode','_smooth','%1〘Choice\x20Cancel〙%1','pitch','makeDocumentTitle','INOUTELASTIC','SCROLL_LOCK','keyCode','377394zKmZzB','encounterStepsMinimum','includes','_hideButtons','textAlign','isWindowMaskingEnabled','CommandRect','isNumpadPressed','fromCharCode','createTroopNote','STR','Total','getLevel','Game_Picture_scaleY','pagedownShowButton','_helpWindow','QUESTION_MARK','subjectHitRate','drawBackgroundRect','Scene_Name_create','stop','down','context','translucentOpacity','resetFontSettings','EnableNameInput','makeActionList','BTestWeapons','renderNoMask','_playTestFastMode','paramBase','Sprite_destroy','ExportAllMapText','traitObjects','isNwjs','level','openURL','_animationQueue','BACKSPACE','paramBaseAboveLevel99','PixelateImageRendering','paintOpacity','Map%1.json','IconSParam8','isDying','Game_System_initialize','7564067TVyOza','Scene_Boot_onDatabaseLoaded','getLastGamepadUsed','stencilFunc','BattleManager_update','UNDERSCORE','return\x200','Window_NumberInput_start','match','_lastGamepad','_customModified','setHome','originalJS','_battlerName','wait','Game_Interpreter_updateWaitMode','TGR','Game_BattlerBase_initMembers','STENCIL_TEST','TRG','_windowLayer','responseText','exp','drawGoldItemStyle','TitlePicButtons','process_VisuMZ_CoreEngine_Settings','PDR','LevelUpFullHp','targetScaleY','calcEasing','skillTypeWindowRect','Scene_Shop_create','SPACE','ZERO','DigitGroupingGaugeSprites','WIN_OEM_FJ_ROYA','IconSParam6','Scene_Boot_startNormalGame','PHA','offOpacity','showPointAnimations','equips','isOpen','CAPSLOCK','sparamPlus','result','Show\x20Scrolling\x20Text\x20Script\x20Error','_sideButtonLayout','openness','DebugConsoleLastControllerID','mainFontSize','NameMenu','setFrame','get','checkScrollBarBitmap','setHandler','backgroundBitmap','isBottomButtonMode','AudioChangeBgmPitch','Window_Base_drawText','buttonAssistOffset2','_loadingState','ExtractStrFromList','scrollUp','PLUS','DamageColor','toLowerCase','WIN_ICO_00','printError','xparamPlus','Sprite_Actor_setActorHome','IconXParam7','isMapScrollLinked','left','isSideButtonLayout','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_statusWindow','createCommandWindow','playCancel','AutoScrollLockX','opacity','catchLoadError','setSideView','useDigitGroupingEx','buttonAssistOffset5','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','endAnimation','valueOutlineColor','_commandList','Smooth','move','MAXMP','ExtJS','batch','clearRect','characters','KeyboardInput','Input_setupEventHandlers','Bitmap_initialize','SHIFT','Spriteset_Base_updatePosition','_optionsWindow','centerSprite','titles1','_isPlaytest','filter','faceWidth','ALWAYS','scrollY','SwitchRandomizeRange','updateCoreEasing','buttonAssistText2','_pointAnimationSprites','VIEWPORT','_opening','SEPARATOR','process_VisuMZ_CoreEngine_RegExp','_buttonType','onerror','DummyRect','_number','_updateGamepadState','scaleMode','asin','DIVIDE','random','_backgroundSprite','CRI','IconParam1','BTB','loadTitle1','nw.gui','process_VisuMZ_CoreEngine_jsQuickFunctions','_image','_target','INOUTSINE','IconSParam5','ItemMenu','_animationSprites','sin','_lastScrollBarValues','registerCommand','_commonEventLayers','loadIconBitmap','_baseTexture','Input_update','endAction','padding','SParamVocab7','canAttack','ColorHPGauge1','_backSprite2','_registerKeyInput','FontWidthFix','setAttack','buttonAssistKey1','retrieveFauxAnimation','_startPlaying','_stored_deathColor','paramRate1','ExportString','backOpacity','_bitmap','isSmartEventCollisionOn','_targetScaleX','destroyContents','valueOutlineWidth','Scene_Options_create','buttonAssistWindowRect','requiredWtypeId1','Window_Base_drawIcon','INELASTIC','ZOOM','_movementWholeDuration','IconXParam9','PictureFilename','addOnceParallelInterpreter','windowRect','URL','Scene_Item_create','setMainFontSize','process_VisuMZ_CoreEngine_Notetags','STRUCT','cursorRight','Graphics_defaultStretchMode','〘Show\x20Text〙\x0a','addWindow','updatePictureCoordinates','clone','_stored_maxLvGaugeColor1','learnings','INQUAD','getCustomBackgroundSettings','profileWindowRect','checkCacheKey','status','top','SwitchActorText','SceneManager_exit','GoldMax','isMenuButtonAssistEnabled','normalColor','trim','title','globalAlpha','createAnimationSprite','Window','enableDigitGroupingEx','playTestF7','ColorMaxLvGauge2','snapForBackground','isTriggered','startAnimation','isGameActive','activate','Input_updateGamepadState','XParamVocab2','Scene_Name_onInputOk','pointX','Game_Troop_setup','Game_Picture_show','MDF','SParamVocab0','updatePositionCoreEngineShakeVert','_digitGrouping','update','_scene','NEAREST','0.00','selectLast','paramRate2','drawCharacter','isInstanceOfSceneMap','charCode','SystemLoadAudio','deselect','Mute','crisisColor','loadBitmap','ShowButtons','addCommand','maxVisibleItems','allowShiftScrolling','Window_NameInput_cursorRight','SParameterFormula','SceneManager_isGameActive','isGamepadConnected','easingType','isSpecialCode','Scene_Boot_loadSystemImages','_anchor','Bitmap_strokeRect','offset','_onError','isPhysical','SParamVocab5','animationNextDelay','removeFauxAnimation','keyboard','usableSkills','TextManager_param','BarThickness','LoadMenu','setupBattleTestItems','_slotWindow','buttonAssistKey5','updateDashToggle','SCROLLBAR','addEventListener','_refreshPauseSign','mapId','sparamRate1','allTiles','animationId','origin','scrollRight','processKeyboardHome','TitleCommandList','AGI','isRightInputMode','Scene_Map_createMenuButton','updateAnchor','gaugeLineHeight','reduce','slice','Bitmap_drawText','drawActorSimpleStatus','ActorTPColor','SwitchToggleOne','RepositionEnemies130','DashToggleR','_stored_systemColor','_upArrowSprite','_drawTextBody','resetTextColor','NewGameCommonEventAll','BottomHelp','helpAreaTopSideButtonLayout','updateData','buttonAssistKey4','string','sparamPlus2','setupCoreEasing','open','gradientFillRect','outlineColorDmg','WIN_OEM_FINISH','CreateBattleSystemID','_backSprite','overallWidth','isFullDocumentTitle','OUTCIRC','IconSet','ForceNoPlayTest','Window_NameInput_cursorPageup','Wait','scrollbar','backspace','processPointAnimationRequests','FunctionName','itemWindowRect','createEnemies','initBasic','boxHeight','_hideTileShadows','_lastOrigin','number','destroyScrollBarBitmaps','_stored_normalColor','DrawItemBackgroundJS','Rate2','helpAreaTop','data/','MINUS','_stored_tpGaugeColor2','Scene_MenuBase_createCancelButton','width','Conditional\x20Branch\x20Script\x20Error','setAnchor','20GxsAQB','OTB','skillId','CallHandlerJS','deactivate','ShortcutScripts','ColorCTGauge2','Enemy-%1-%2','xparamRate','areButtonsHidden','defineProperty','isTouchedInsideFrame','_listWindow','isNextScene','createFauxAnimationSprite','thickness','setupNewGame','setCommonEvent','updatePositionCoreEngineShakeRand','catchUnknownError','Sprite_Animation_setViewport','stencilOp','_itemWindow','ExtractStrFromMap','itemHeight','isSceneBattle','addAnimationSpriteToContainer','Class-%1-%2','ExportAllTroopText','measureTextWidthNoRounding','titleCommandWindow','rgba(0,\x200,\x200,\x200.7)','EnableJS','_stored_gaugeBackColor','PreserveNumbers','_menuButton','Spriteset_Base_initialize','onNameOk','Game_Action_itemHit','NumberBgType','forceOutOfPlaytest','IconParam7','fillStyle','applyCoreEasing','_pagedownButton','bgmVolume','DisplayedParams','system','_tempActor','ParseSkillNotetags','_troopId','anchor','ColorHPGauge2','BasicParameterFormula','buttonAssistText1','CustomParamIcons','processAlwaysEscape','Plus2','_colorCache','listWindowRect','initMembers','itemHitImprovedAccuracy','item','bgs','Bitmap_gradientFillRect','F24','6216352zRwXMx','IconSParam3','cursorDown','isMaskingEnabled','CommonEventID','BlurFilter','maxScrollY','State-%1-%2','blendFunc','ParseTilesetNotetags','canUse','BattleManager_checkSubstitute','tpGaugeColor2','_gamepadWait','_isWindow','isSideView','DigitGroupingStandardText','mpGaugeColor2','Bitmap_fillRect','FINAL','ESC','OnLoadJS','drawGameVersion','OUTQUART','setBattleSystem','WIN_OEM_CLEAR','Window_Selectable_cursorDown','Input_shouldPreventDefault','initialLevel','maxTp','drawCurrentParam','tab','QUOTE','PictureEraseAll','ApplyEasing','Settings','SLEEP','ONE_MINUS_SRC_ALPHA','isScrollBarVisible','Graphics','pictures','_displayY','cursorPageup','XParamVocab5','command357','_numberWindow','removeAllPointAnimations','toFixed','_showDevTools','padZero','battlebacks2','drawValue','_skillTypeWindow','updateOrigin','vert','sqrt','_allTextHeight','F7key','Game_Interpreter_command122','repositionCancelButtonSideButtonLayout','setCoreEngineScreenShakeStyle','show','drawText','rowSpacing','_lastPluginCommandInterpreter','INBOUNCE','xparamPlus2','optionsWindowRect','xparamRate2','consumeItem','BuyRect','Bitmap_drawTextOutline','drawItem','visible','NameInputMessage','processTouchModernControls','AudioChangeBgsVolume','isForFriend','send','slotWindowRect','MenuBg','targetY','SParamVocab1','AnimationID','command111','drawTextTopAligned','MAX_SAFE_INTEGER','buttonAssistText%1','FDR','isMaxLevel','Game_Interpreter_command355','WIN_OEM_FJ_TOUROKU','_goldWindow','_drawTextOutline','animationBaseDelay','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','INQUART','startNormalGame','pictureId','contentsBack','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','ENTER','X:\x20%1','itemRect','Game_Temp_initialize','turn','Game_BattlerBase_refresh','inBattle','bgsVolume','xdg-open','FTB','xparamPlus1','_viewportSize','PGUP','bitmapWidth','updateScrollBarPosition','round','(\x5cd+\x5c.?\x5cd+)>','showPicture','buttonAssistText4','initButtonHidden','_targetAnchor','Plus1','_pressed','createPointAnimationSprite','DetachMapPictureContainer','buttonAreaHeight','Subtitle','home','CategoryRect','ButtonFadeSpeed','IconXParam2','isPlaying','MDR','processCursorMove','displayY','_currentBgs','format','platform','Version','F6key','BuyBgType','_stored_mpGaugeColor2','fillText','lineHeight','textBaseline','paramX','BottomButtons','GameEnd','mainAreaTopSideButtonLayout','createPointAnimation','paramY','targetObjects','_inputWindow','createButtonAssistWindow','openingSpeed','Finish','map','REPLACE','ColSpacing','overrideMimeType','center','statusWindowRect','NewGameCommonEvent','bitmap','buttonAssistSwitch','Item-%1-%2','ModernControls','saveViewport','updatePadding','Window_StatusBase_drawActorSimpleStatus','ColorMPCost','VisuMZ_3_EventChainReact','_moveEasingType','removeChild','SwitchToggleRange','_backSprite1','darwin','exec','createMenuButton','getInputButtonString','clamp','SlotBgType','OPEN_BRACKET','_logWindow','getPointAnimationLayer','WIN_OEM_ATTN','VisuMZ_1_OptionsCore','CNT','IconXParam8','OUTQUAD','maxCols','measureTextWidth','loadMapData','Game_Action_itemEva','Game_Map_scrollLeft','%1:\x20Exit\x20','_cacheScaleY','updatePosition','Window_ShopSell_isEnabled','setClickHandler','isEventRunning','inbounce','font-smooth','DocumentTitleFmt','getGamepads','_windowskin','SwitchRandomizeOne','META','Window_NameInput_refresh','_centerElementCoreEngine','setEasingType','RightMenus','start','ExportStrFromAllMaps','makeEncounterCount','_internalTextures','Bitmap_clearRect','GoldIcon','_hp','INCUBIC','erasePicture','Scene_MenuBase_mainAreaHeight','OpenConsole','ActorHPColor','altKey','isActiveTpb','drawIcon','_updateFilterArea','drawAllParams','xparamRateJS','cancel','VisuMZ_2_BattleSystemPTB','atbActive','EncounterRateMinimum','playBuzzer','Game_Map_scrollRight','isEnabled','layoutSettings','ctrl','maxScrollbar','_muteSound','maxHorz','_stored_expGaugeColor2','mainAreaHeightSideButtonLayout','onLoad','Y:\x20%1','shake','App','requestPointAnimation','picture','processMoveCommand','setLastGamepadUsed','ItemBgType','processTimingData','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','Window_NameInput_cursorLeft','playCursor','IconParam4','successRate','LEFT','Window_Base_createContents','OPEN_PAREN','dummyWindowRect','ENTER_SPECIAL','dimColor2','getBackgroundOpacity','active','list','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','isLoopVertical','currencyUnit','test','Weapon-%1-%2','INEXPO','Renderer','Power','determineSideButtonLayoutValid','needsUpdate','createContents','setBackgroundOpacity','filters','clearForcedGameTroopSettingsCoreEngine','catchNormalError','jsonToZip','text%1','terminate','windowOpacity','_coreEasing','updatePlayTestF7','ColorTPGauge1','drawCurrencyValue','updateBgmParameters','isSceneMap','playTestF6','ctGaugeColor1','join','categoryWindowRect','HYPHEN_MINUS','areTileShadowsHidden','updatePositionCoreEngineShakeOriginal','BarOffset','SParamVocab4','GetParamIcon','_isButtonHidden','applyEasing','CoreEngine','Flat2','playOnceParallelInterpreter','%1\x0a','setupCustomRateCoreEngine','param','IconXParam5','isLoopHorizontal','getCombinedScrollingText','toString','setWindowPadding','index','GET','clearCachedKeys','levelUpRecovery','_editWindow','ButtonHeight','processKeyboardDigitChange','exit','sceneTerminationClearEffects','NUMPAD2','_inputString','_realScale','keyRepeatWait','SystemSetFontSize','WIN_OEM_WSCTRL','_scrollBarHorz','SystemSetWindowPadding','WIN_OEM_JUMP','IconSParam2','ItemBackColor1','escape','worldTransform','PositionY','isAlive','_stored_hpGaugeColor1','ColorMaxLvGauge1','DETACH_PICTURE_CONTAINER','isClosed','buttonAssistOffset4','Input_pollGamepads','xScrollLinkedOffset','JSON','pan','parameters','_CoreEngineSettings','updateOpen','》Comment《\x0a%1\x0a','focus','optSideView','updateKeyText','AudioChangeBgmPan','Game_Screen_initialize','BgFilename2','sparamFlatBonus','Game_Event_start','ColorExpGauge2','expGaugeColor2','IconParam6','_defaultStretchMode','RowSpacing','centerX','isCursorMovable','horizontal','_forcedTroopView','Window_Base_createTextState','WASD','Window_Selectable_drawBackgroundRect','_pictureContainer','atypeId','IconParam5','Padding','AudioChangeBgsPitch','updateCurrentEvent','WIN_ICO_CLEAR','Sprite_AnimationMV_processTimingData','drawFace','MRG','playBgm','createPointAnimationTargets','clipboard','sv_actors','CEV','targetSpritePosition','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','Game_Map_setup','findSymbol','createDimmerSprite','_dummyWindow','ConvertParams','toUpperCase','onButtonImageLoad','Window_NameInput_cursorDown','expRate','StatusRect','targetOpacity','isOptionValid','Max','makeInputButtonString','Game_Picture_updateMove','meVolume','EREOF','(\x5cd+)>','OpenURL','KeyItemProtect','_stored_maxLvGaugeColor2','ActorRect','startShake','itemHit','NUMPAD3','\x5c}❪TAB❫\x5c{','mpColor','checkCoreEngineDisplayCenter','mhp','_storedMapText','TCR','EQUALS','loadTitle2','sv_enemies','clearStencil','StartID','OUTQUINT','cursorPagedown','Sprite_AnimationMV_updatePosition','faceHeight','NewGameBoot','performEscape','_cancelButton','GRD','INQUINT','makeFontSmaller','ASTERISK','Scene_MenuBase_createPageButtons','outbounce','_rate','sparamFlat2','Scene_Boot_updateDocumentTitle','code','WIN_OEM_PA2','Window_NumberInput_processDigitChange','connected','alphabetic','horzJS','INOUTEXPO','offsetX','flush','CLOSE_CURLY_BRACKET','updatePictureAntiZoom','VOLUME_MUTE','removeAnimationFromContainer','note','dashToggle','CustomParamNames','VisuMZ_4_UniqueTileEffects','numberWindowRect','log','normal','Window_StatusBase_drawActorLevel','LUK','wtypeId','_originalViewport','HASH','object','iconWidth','OutlineColorGauge','IconSParam1','iconHeight','sellWindowRect','drawActorClass','isArrowPressed','_stored_pendingColor','AnimationMirrorOffset','Game_Event_isCollidedWithEvents','Scene_Battle_createSpritesetFix','RepositionEnemies','goldWindowRect','_buyWindow','CANCEL','paramPlus','actorWindowRect','BattleManager_processEscape','updatePointAnimations','_addShadow','bgm','updateSmoothScroll','%1/','XParamVocab1','expGaugeColor1','updateMotion','WindowLayer_render','_mainSprite','StatusParamsRect','getLastUsedGamepadType','VisuMZ_2_BattleSystemBTB','gold','refreshActor','Rate1','_url','_currentBgm','_phase','_pictureCoordinatesMode','hasEncryptedImages','clear','Sprite_Gauge_gaugeRate','WIN_OEM_CUSEL','statusParamsWindowRect','BaseTexture','_startDecrypting','2874310FodeWC','actor','Scene_Battle_update','horz','WIN_OEM_COPY','traitsPi','mmp','updateTransform','setSideButtonLayout','areButtonsOutsideMainUI','INOUTQUINT','wholeDuration','〘Common\x20Event\x20%1:\x20%2〙\x20End','cancelShowButton','maxScrollX','_pollGamepads','HANJA','EISU','setCoreEngineUpdateWindowBg','_cache','createJsQuickFunction','$dataMap','gainSilentTp','ATTN','evade','_targetOpacity','_scrollDuration','NUMPAD5','updateDocumentTitle','_hovered','up2','playTestCtrlT','_inputSpecialKeyCode','Spriteset_Battle_createEnemies','initialize','BlurStrength','enter','hpGaugeColor2','_spriteset','gaugeBackColor','CRSEL','startAutoNewGame','CTRL','hit','Scene_Equip_create','titles2','parse','initDigitGrouping','_coreEasingType','isItemStyle','consumable','itemEva','Scene_Map_update','F20','sparam','_closing','ColorMPGauge2','CrisisRate','moveMenuButtonSideButtonLayout','initCoreEngine','battleSystem','_offsetX','maxLevel','setViewport','EditBgType','WIN_ICO_HELP','paramchangeTextColor','INSERT','VariableEvalReference','_targetOffsetY','Unnamed','members','_lastCommandSymbol','OS_KEY','Game_Character_processMoveCommand','Scene_Battle_createSpriteset','_bgmBuffer','OUTBOUNCE','Window_Selectable_itemRect','playCursorSound','sparamPlusJS','MAT','helpAreaHeight','isRepeated','initialBattleSystem','name','DefaultMode','params','MapOnceParallel','updateMove','DELETE','right','_shouldPreventDefault','xparamFlatJS','TRAIT_PARAM','restore','mirror','COMMA','mainCommandWidth','textHeight','indexOf','StatusParamsBgType','Game_Interpreter_PluginCommand','targetScaleX','ColorCTGauge1','OUTBACK','targetContentsOpacity','reserveNewGameCommonEvent','loadPicture','SParamVocab8','StatusEquipRect','paramName','_coreEngineShakeStyle','PGDN','doesNameContainBannedWords','HelpBgType','smoothSelect','levelUp','ParseClassNotetags','ColorTPCost','scrollDown','requestMotion','_maxDigits','checkSubstitute','Spriteset_Base_destroy','endBattlerActions','pos','processEscape','style','updateShadow','processKeyboardEnd','destroyCoreEngineMarkedBitmaps','PTB','IDs','ItemPadding','updateEffekseer','value','ItemRect','Sprite_Picture_loadBitmap','drawGauge','Bitmap_drawCircle','ATK','onClick','MenuLayout','setEnemyAction','default','_scaleY','_backgroundFilter','Window_Gold_refresh','Scene_Map_initialize','WIN_OEM_RESET','_pageupButton','ExtractStrFromTroop','KeyTAB','application/json','ARRAYEVAL','seek','WIN_OEM_FJ_MASSHOU','_subject','fadeSpeed','smallParamFontSize','dropItems','pictureButtons','REC','boxWidth','SkillTypeRect','VisuMZ_2_BattleSystemOTB','VisuMZ_2_BattleSystemCTB','isGamepadTriggered','paramPlusJS','_lastY','ActorMPColor','resetBattleSystem','BackOpacity','ScreenShake','hideButtonFromView','drawActorExpGauge','_clickHandler','DEF','drawRightArrow','TextStr','Game_Picture_y','length','children','makeCommandList','isPlaytest','shift','_screenX','version','switchModes','fontSize','_pauseSignSprite','Scene_MenuBase_createBackground','smooth','getCoreEngineScreenShakeStyle','maxGold','isNormalPriority','EXECUTE','TextFmt','integer','buttonAssistOffset1','alwaysDash','drawGameTitle','prototype','mute','scaleY','image-rendering','initVisuMZCoreEngine','_duration','Page','duration','save','playEscape','createPageButtons','ScreenResolution','Tilemap_addShadow','ExportStrFromAllTroops','drawGameSubtitle','ColorPowerDown','Scene_Map_createSpriteset_detach','_destroyCanvas','Upper\x20Left','Manual','deathColor','RegExp','systemColor','nickname','processKeyboardHandling','Type','CONTEXT_MENU','SParamVocab2','OUTEXPO','_onLoad','_shakeSpeed','stringKeyMap','PLAY','mainAreaBottom','scrollX','_mode','isHandled','DTB','getKeyboardInputButtonString','eva','DetachBattlePictureContainer','GREATER_THAN','PAUSE','BKSP','PositionX','forceStencil','Window_NameInput_initialize','resize','PRINTSCREEN','INOUTBACK','_startLoading','899955cGDfpo','Scene_Base_terminate','bind','repositionEnemiesByResolution','moveCancelButtonSideButtonLayout','en-US','ValueJS','button','BattleSystem','PictureCoordinatesMode','_refreshArrows','setBackgroundType','_stored_expGaugeColor1','ExportCurTroopText','createScrollBarSprites','_baseSprite','tilesets','NUMPAD8','Game_Party_consumeItem','F14','markCoreEngineModified','_setupEventHandlers','MRF','tilesetFlags','_data','guardSkillId','zoomScale','Window_NameInput_processHandling','isActor','_movementDuration','516mNMFfr','Scene_Menu_create','uiAreaWidth','playLoad','\x5c}❪SHIFT❫\x5c{','getButtonAssistLocation','LevelUpFullMp','Layer','OpenSpeed','pages','addLoadListener'];_0x1a3f=function(){return _0x21d5d5;};return _0x1a3f();}function Window_PictureCoordinates(){const _0x10eb51=_0x2a005f;this[_0x10eb51(0x72f)](...arguments);}Window_PictureCoordinates['prototype']=Object[_0x2a005f(0x18c)](Window_Base[_0x2a005f(0x7d8)]),Window_PictureCoordinates['prototype'][_0x2a005f(0x2bc)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x2a005f(0x7d8)]['initialize']=function(){const _0x65d827=_0x2a005f;this['_lastOrigin']=_0x65d827(0x255),this[_0x65d827(0x253)]=_0x65d827(0x255),this[_0x65d827(0x7b7)]=_0x65d827(0x255);const _0x254533=this[_0x65d827(0x427)]();Window_Base[_0x65d827(0x7d8)][_0x65d827(0x72f)]['call'](this,_0x254533),this[_0x65d827(0x816)](0x2);},Window_PictureCoordinates[_0x2a005f(0x7d8)][_0x2a005f(0x427)]=function(){const _0x5d2998=_0x2a005f;let _0x345431=0x0,_0x54ca59=Graphics[_0x5d2998(0x8b8)]-this[_0x5d2998(0x59b)](),_0x5da2f9=Graphics[_0x5d2998(0x4c6)],_0x2c4a3f=this[_0x5d2998(0x59b)]();return new Rectangle(_0x345431,_0x54ca59,_0x5da2f9,_0x2c4a3f);},Window_PictureCoordinates['prototype']['updatePadding']=function(){const _0x34050a=_0x2a005f;this[_0x34050a(0x409)]=0x0;},Window_PictureCoordinates['prototype'][_0x2a005f(0x457)]=function(){const _0x2a800a=_0x2a005f;Window_Base[_0x2a800a(0x7d8)][_0x2a800a(0x457)][_0x2a800a(0x873)](this),this[_0x2a800a(0x4a0)]();},Window_PictureCoordinates[_0x2a005f(0x7d8)]['updateData']=function(){const _0x4e48b6=_0x2a005f;if(!this[_0x4e48b6(0x621)]())return;this[_0x4e48b6(0x32a)]();},Window_PictureCoordinates[_0x2a005f(0x7d8)]['needsUpdate']=function(){const _0x36690e=_0x2a005f,_0x58ea46=$gameTemp[_0x36690e(0x705)],_0x46b212=$gameScreen[_0x36690e(0x605)](_0x58ea46);return _0x46b212?this[_0x36690e(0x4bb)]!==_0x46b212[_0x36690e(0x1dd)]||this[_0x36690e(0x253)]!==_0x46b212['_x']||this[_0x36690e(0x7b7)]!==_0x46b212['_y']:![];},Window_PictureCoordinates['prototype'][_0x2a005f(0x32a)]=function(){const _0x236074=_0x2a005f;this['contents'][_0x236074(0x707)]();const _0xc52ad=$gameTemp['_pictureCoordinatesMode'],_0x39ec9f=$gameScreen[_0x236074(0x605)](_0xc52ad);if(!_0x39ec9f)return;this[_0x236074(0x4bb)]=_0x39ec9f[_0x236074(0x1dd)],this['_lastX']=_0x39ec9f['_x'],this['_lastY']=_0x39ec9f['_y'];const _0x4d6ecc=ColorManager[_0x236074(0x1b1)]();this[_0x236074(0x225)][_0x236074(0x220)](0x0,0x0,this['innerWidth'],this[_0x236074(0x8ab)],_0x4d6ecc);const _0x2efa1d='\x20Origin:\x20%1'[_0x236074(0x594)](_0x39ec9f['_origin']===0x0?_0x236074(0x7ea):'Center'),_0x31bf12=_0x236074(0x571)[_0x236074(0x594)](_0x39ec9f['_x']),_0x485008=_0x236074(0x601)[_0x236074(0x594)](_0x39ec9f['_y']),_0x53ddae=_0x236074(0x5cf)[_0x236074(0x594)](TextManager[_0x236074(0x5bf)](_0x236074(0x5f2)));let _0x51b3c6=Math[_0x236074(0x2a7)](this[_0x236074(0x2ef)]/0x4);this[_0x236074(0x549)](_0x2efa1d,_0x51b3c6*0x0,0x0,_0x51b3c6),this['drawText'](_0x31bf12,_0x51b3c6*0x1,0x0,_0x51b3c6,_0x236074(0x5ac)),this[_0x236074(0x549)](_0x485008,_0x51b3c6*0x2,0x0,_0x51b3c6,'center');const _0x47f33b=this[_0x236074(0x899)](_0x53ddae)['width'],_0xc61706=this[_0x236074(0x2ef)]-_0x47f33b;this['drawTextEx'](_0x53ddae,_0xc61706,0x0,_0x47f33b);},VisuMZ[_0x2a005f(0x33b)]=function(_0x3722aa){const _0x2e48f3=_0x2a005f;if(Utils['isOptionValid'](_0x2e48f3(0x61b))){var _0x467513=require(_0x2e48f3(0x3f9))[_0x2e48f3(0x444)][_0x2e48f3(0x3ab)]();SceneManager[_0x2e48f3(0x27a)]();if(_0x3722aa)setTimeout(_0x467513[_0x2e48f3(0x66d)][_0x2e48f3(0x80d)](_0x467513),0x190);}},VisuMZ[_0x2a005f(0x52d)]=function(_0x2304b7,_0x393797){const _0x430b19=_0x2a005f;_0x393797=_0x393797[_0x430b19(0x697)]();var _0x55ac5d=1.70158,_0x2eea43=0.7;switch(_0x393797){case _0x430b19(0x8b1):return _0x2304b7;case _0x430b19(0x2a8):return-0x1*Math[_0x430b19(0x1ea)](_0x2304b7*(Math['PI']/0x2))+0x1;case'OUTSINE':return Math[_0x430b19(0x401)](_0x2304b7*(Math['PI']/0x2));case _0x430b19(0x3fd):return-0.5*(Math['cos'](Math['PI']*_0x2304b7)-0x1);case _0x430b19(0x435):return _0x2304b7*_0x2304b7;case _0x430b19(0x5c9):return _0x2304b7*(0x2-_0x2304b7);case'INOUTQUAD':return _0x2304b7<0.5?0x2*_0x2304b7*_0x2304b7:-0x1+(0x4-0x2*_0x2304b7)*_0x2304b7;case _0x430b19(0x5e7):return _0x2304b7*_0x2304b7*_0x2304b7;case _0x430b19(0x307):var _0x20df99=_0x2304b7-0x1;return _0x20df99*_0x20df99*_0x20df99+0x1;case _0x430b19(0x2bb):return _0x2304b7<0.5?0x4*_0x2304b7*_0x2304b7*_0x2304b7:(_0x2304b7-0x1)*(0x2*_0x2304b7-0x2)*(0x2*_0x2304b7-0x2)+0x1;case _0x430b19(0x56b):return _0x2304b7*_0x2304b7*_0x2304b7*_0x2304b7;case _0x430b19(0x522):var _0x20df99=_0x2304b7-0x1;return 0x1-_0x20df99*_0x20df99*_0x20df99*_0x20df99;case _0x430b19(0x195):var _0x20df99=_0x2304b7-0x1;return _0x2304b7<0.5?0x8*_0x2304b7*_0x2304b7*_0x2304b7*_0x2304b7:0x1-0x8*_0x20df99*_0x20df99*_0x20df99*_0x20df99;case _0x430b19(0x6be):return _0x2304b7*_0x2304b7*_0x2304b7*_0x2304b7*_0x2304b7;case _0x430b19(0x6b6):var _0x20df99=_0x2304b7-0x1;return 0x1+_0x20df99*_0x20df99*_0x20df99*_0x20df99*_0x20df99;case _0x430b19(0x717):var _0x20df99=_0x2304b7-0x1;return _0x2304b7<0.5?0x10*_0x2304b7*_0x2304b7*_0x2304b7*_0x2304b7*_0x2304b7:0x1+0x10*_0x20df99*_0x20df99*_0x20df99*_0x20df99*_0x20df99;case _0x430b19(0x61d):if(_0x2304b7===0x0)return 0x0;return Math['pow'](0x2,0xa*(_0x2304b7-0x1));case _0x430b19(0x7f4):if(_0x2304b7===0x1)return 0x1;return-Math[_0x430b19(0x2a2)](0x2,-0xa*_0x2304b7)+0x1;case _0x430b19(0x6cc):if(_0x2304b7===0x0||_0x2304b7===0x1)return _0x2304b7;var _0x1d949b=_0x2304b7*0x2,_0x31f276=_0x1d949b-0x1;if(_0x1d949b<0x1)return 0.5*Math[_0x430b19(0x2a2)](0x2,0xa*_0x31f276);return 0.5*(-Math[_0x430b19(0x2a2)](0x2,-0xa*_0x31f276)+0x2);case'INCIRC':var _0x1d949b=_0x2304b7/0x1;return-0x1*(Math[_0x430b19(0x542)](0x1-_0x1d949b*_0x2304b7)-0x1);case _0x430b19(0x4ad):var _0x20df99=_0x2304b7-0x1;return Math[_0x430b19(0x542)](0x1-_0x20df99*_0x20df99);case _0x430b19(0x834):var _0x1d949b=_0x2304b7*0x2,_0x31f276=_0x1d949b-0x2;if(_0x1d949b<0x1)return-0.5*(Math[_0x430b19(0x542)](0x1-_0x1d949b*_0x1d949b)-0x1);return 0.5*(Math[_0x430b19(0x542)](0x1-_0x31f276*_0x31f276)+0x1);case'INBACK':return _0x2304b7*_0x2304b7*((_0x55ac5d+0x1)*_0x2304b7-_0x55ac5d);case _0x430b19(0x776):var _0x1d949b=_0x2304b7/0x1-0x1;return _0x1d949b*_0x1d949b*((_0x55ac5d+0x1)*_0x1d949b+_0x55ac5d)+0x1;break;case _0x430b19(0x809):var _0x1d949b=_0x2304b7*0x2,_0x3c6953=_0x1d949b-0x2,_0x246498=_0x55ac5d*1.525;if(_0x1d949b<0x1)return 0.5*_0x1d949b*_0x1d949b*((_0x246498+0x1)*_0x1d949b-_0x246498);return 0.5*(_0x3c6953*_0x3c6953*((_0x246498+0x1)*_0x3c6953+_0x246498)+0x2);case _0x430b19(0x421):if(_0x2304b7===0x0||_0x2304b7===0x1)return _0x2304b7;var _0x1d949b=_0x2304b7/0x1,_0x31f276=_0x1d949b-0x1,_0xd19839=0x1-_0x2eea43,_0x246498=_0xd19839/(0x2*Math['PI'])*Math[_0x430b19(0x3f1)](0x1);return-(Math[_0x430b19(0x2a2)](0x2,0xa*_0x31f276)*Math[_0x430b19(0x401)]((_0x31f276-_0x246498)*(0x2*Math['PI'])/_0xd19839));case _0x430b19(0x21f):var _0xd19839=0x1-_0x2eea43,_0x1d949b=_0x2304b7*0x2;if(_0x2304b7===0x0||_0x2304b7===0x1)return _0x2304b7;var _0x246498=_0xd19839/(0x2*Math['PI'])*Math[_0x430b19(0x3f1)](0x1);return Math[_0x430b19(0x2a2)](0x2,-0xa*_0x1d949b)*Math[_0x430b19(0x401)]((_0x1d949b-_0x246498)*(0x2*Math['PI'])/_0xd19839)+0x1;case _0x430b19(0x345):var _0xd19839=0x1-_0x2eea43;if(_0x2304b7===0x0||_0x2304b7===0x1)return _0x2304b7;var _0x1d949b=_0x2304b7*0x2,_0x31f276=_0x1d949b-0x1,_0x246498=_0xd19839/(0x2*Math['PI'])*Math[_0x430b19(0x3f1)](0x1);if(_0x1d949b<0x1)return-0.5*(Math[_0x430b19(0x2a2)](0x2,0xa*_0x31f276)*Math[_0x430b19(0x401)]((_0x31f276-_0x246498)*(0x2*Math['PI'])/_0xd19839));return Math['pow'](0x2,-0xa*_0x31f276)*Math[_0x430b19(0x401)]((_0x31f276-_0x246498)*(0x2*Math['PI'])/_0xd19839)*0.5+0x1;case _0x430b19(0x75a):var _0x1d949b=_0x2304b7/0x1;if(_0x1d949b<0x1/2.75)return 7.5625*_0x1d949b*_0x1d949b;else{if(_0x1d949b<0x2/2.75){var _0x3c6953=_0x1d949b-1.5/2.75;return 7.5625*_0x3c6953*_0x3c6953+0.75;}else{if(_0x1d949b<2.5/2.75){var _0x3c6953=_0x1d949b-2.25/2.75;return 7.5625*_0x3c6953*_0x3c6953+0.9375;}else{var _0x3c6953=_0x1d949b-2.625/2.75;return 7.5625*_0x3c6953*_0x3c6953+0.984375;}}}case _0x430b19(0x54c):var _0x3c89d1=0x1-VisuMZ[_0x430b19(0x52d)](0x1-_0x2304b7,'outbounce');return _0x3c89d1;case _0x430b19(0x86b):if(_0x2304b7<0.5)var _0x3c89d1=VisuMZ[_0x430b19(0x52d)](_0x2304b7*0x2,_0x430b19(0x5d5))*0.5;else var _0x3c89d1=VisuMZ[_0x430b19(0x52d)](_0x2304b7*0x2-0x1,_0x430b19(0x6c2))*0.5+0.5;return _0x3c89d1;default:return _0x2304b7;}},VisuMZ[_0x2a005f(0x63a)]=function(_0x347d20){const _0x236648=_0x2a005f;_0x347d20=String(_0x347d20)[_0x236648(0x697)]();const _0x550683=VisuMZ[_0x236648(0x63d)][_0x236648(0x52e)][_0x236648(0x2ca)];if(_0x347d20===_0x236648(0x2c0))return _0x550683[_0x236648(0x25b)];if(_0x347d20===_0x236648(0x3d1))return _0x550683[_0x236648(0x3f6)];if(_0x347d20==='ATK')return _0x550683['IconParam2'];if(_0x347d20===_0x236648(0x7bf))return _0x550683[_0x236648(0x216)];if(_0x347d20===_0x236648(0x75e))return _0x550683[_0x236648(0x60d)];if(_0x347d20===_0x236648(0x453))return _0x550683[_0x236648(0x683)];if(_0x347d20===_0x236648(0x48c))return _0x550683[_0x236648(0x677)];if(_0x347d20===_0x236648(0x6db))return _0x550683[_0x236648(0x4f2)];if(_0x347d20===_0x236648(0x206))return _0x550683[_0x236648(0x29b)];if(_0x347d20===_0x236648(0x2c8))return _0x550683[_0x236648(0x202)];if(_0x347d20===_0x236648(0x3f5))return _0x550683[_0x236648(0x58e)];if(_0x347d20===_0x236648(0x68f))return _0x550683[_0x236648(0x86d)];if(_0x347d20===_0x236648(0x88f))return _0x550683['IconXParam4'];if(_0x347d20===_0x236648(0x821))return _0x550683[_0x236648(0x643)];if(_0x347d20==='CNT')return _0x550683[_0x236648(0x85d)];if(_0x347d20===_0x236648(0x1ce))return _0x550683[_0x236648(0x3bd)];if(_0x347d20===_0x236648(0x68a))return _0x550683[_0x236648(0x5c8)];if(_0x347d20===_0x236648(0x389))return _0x550683[_0x236648(0x424)];if(_0x347d20==='TGR')return _0x550683[_0x236648(0x2ec)];if(_0x347d20===_0x236648(0x6bd))return _0x550683[_0x236648(0x6e2)];if(_0x347d20===_0x236648(0x7b0))return _0x550683[_0x236648(0x65a)];if(_0x347d20===_0x236648(0x39c))return _0x550683[_0x236648(0x50c)];if(_0x347d20==='MCR')return _0x550683['IconSParam4'];if(_0x347d20===_0x236648(0x6b0))return _0x550683[_0x236648(0x3fe)];if(_0x347d20===_0x236648(0x390))return _0x550683[_0x236648(0x39a)];if(_0x347d20===_0x236648(0x590))return _0x550683[_0x236648(0x31d)];if(_0x347d20===_0x236648(0x563))return _0x550683[_0x236648(0x373)];if(_0x347d20===_0x236648(0x2f0))return _0x550683[_0x236648(0x226)];if(VisuMZ[_0x236648(0x63d)][_0x236648(0x500)][_0x347d20])return VisuMZ[_0x236648(0x63d)][_0x236648(0x500)][_0x347d20]||0x0;return 0x0;},VisuMZ['ConvertNumberToString']=function(_0x2c2272,_0xa4d780,_0x35624f){const _0x4ca693=_0x2a005f;if(_0x35624f===undefined&&_0x2c2272%0x1===0x0)return _0x2c2272;if(_0x35624f!==undefined&&[_0x4ca693(0x2c0),_0x4ca693(0x3d1),'ATK',_0x4ca693(0x7bf),_0x4ca693(0x75e),_0x4ca693(0x453),_0x4ca693(0x48c),_0x4ca693(0x6db)][_0x4ca693(0x34a)](String(_0x35624f)[_0x4ca693(0x697)]()[_0x4ca693(0x440)]()))return _0x2c2272;_0xa4d780=_0xa4d780||0x0;if(VisuMZ[_0x4ca693(0x63d)][_0x4ca693(0x1a0)][_0x35624f])return VisuMZ[_0x4ca693(0x63d)]['CustomParamType'][_0x35624f]===_0x4ca693(0x7d4)?_0x2c2272:String((_0x2c2272*0x64)['toFixed'](_0xa4d780))+'%';return String((_0x2c2272*0x64)[_0x4ca693(0x53a)](_0xa4d780))+'%';},VisuMZ[_0x2a005f(0x318)]=function(_0x4426c5){const _0x17e342=_0x2a005f;_0x4426c5=String(_0x4426c5);if(!_0x4426c5)return _0x4426c5;if(typeof _0x4426c5!==_0x17e342(0x4a2))return _0x4426c5;const _0x1ff986=VisuMZ[_0x17e342(0x63d)]['Settings']['QoL'][_0x17e342(0x894)]||_0x17e342(0x810),_0x348316={'maximumFractionDigits':0x6};_0x4426c5=_0x4426c5['replace'](/\[(.*?)\]/g,(_0x2dadbf,_0x225e85)=>{const _0x107ce4=_0x17e342;return VisuMZ[_0x107ce4(0x4eb)](_0x225e85,'[',']');}),_0x4426c5=_0x4426c5[_0x17e342(0x19f)](/<(.*?)>/g,(_0x491023,_0x25f4d6)=>{const _0x21c73d=_0x17e342;return VisuMZ[_0x21c73d(0x4eb)](_0x25f4d6,'<','>');}),_0x4426c5=_0x4426c5[_0x17e342(0x19f)](/\{\{(.*?)\}\}/g,(_0x3c7fee,_0x3d1c4d)=>{const _0x50bc18=_0x17e342;return VisuMZ[_0x50bc18(0x4eb)](_0x3d1c4d,'','');}),_0x4426c5=_0x4426c5[_0x17e342(0x19f)](/(\d+\.?\d*)/g,(_0x1dd50f,_0x5d3d3e)=>{const _0x4df194=_0x17e342;let _0x1aabf6=_0x5d3d3e;if(_0x1aabf6[0x0]==='0')return _0x1aabf6;if(_0x1aabf6[_0x1aabf6[_0x4df194(0x7c3)]-0x1]==='.')return Number(_0x1aabf6)[_0x4df194(0x331)](_0x1ff986,_0x348316)+'.';else return _0x1aabf6[_0x1aabf6[_0x4df194(0x7c3)]-0x1]===','?Number(_0x1aabf6)[_0x4df194(0x331)](_0x1ff986,_0x348316)+',':Number(_0x1aabf6)[_0x4df194(0x331)](_0x1ff986,_0x348316);});let _0x494651=0x3;while(_0x494651--){_0x4426c5=VisuMZ[_0x17e342(0x332)](_0x4426c5);}return _0x4426c5;},VisuMZ['PreserveNumbers']=function(_0x126bdf,_0x5a85f4,_0x233b03){const _0x1ddc4f=_0x2a005f;return _0x126bdf=_0x126bdf[_0x1ddc4f(0x19f)](/(\d)/gi,(_0x3e3ef6,_0x4b8caf)=>'PRESERVCONVERSION(%1)'['format'](Number(_0x4b8caf))),_0x1ddc4f(0x1c2)[_0x1ddc4f(0x594)](_0x126bdf,_0x5a85f4,_0x233b03);},VisuMZ[_0x2a005f(0x332)]=function(_0x2cb044){const _0x5e10ee=_0x2a005f;return _0x2cb044=_0x2cb044[_0x5e10ee(0x19f)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x32fd52,_0xf00303)=>Number(parseInt(_0xf00303))),_0x2cb044;},VisuMZ['openURL']=function(_0x1afc2c){const _0x1ebe80=_0x2a005f;SoundManager[_0x1ebe80(0x33a)]();if(!Utils[_0x1ebe80(0x36a)]()){const _0x219d0e=window['open'](_0x1afc2c,_0x1ebe80(0x841));}else{const _0x45c003=process[_0x1ebe80(0x595)]==_0x1ebe80(0x5bc)?'open':process['platform']==_0x1ebe80(0x1c0)?_0x1ebe80(0x5e0):_0x1ebe80(0x578);require('child_process')[_0x1ebe80(0x5bd)](_0x45c003+'\x20'+_0x1afc2c);}},VisuMZ['createKeyJS']=function(_0x159122,_0x32db20){const _0x3b20f1=_0x2a005f;if(!_0x159122)return'';const _0x4ff51f=_0x159122[_0x3b20f1(0x854)]||_0x159122['id'];let _0x1953c8='';return _0x159122[_0x3b20f1(0x527)]!==undefined&&_0x159122[_0x3b20f1(0x7ef)]!==undefined&&(_0x1953c8='Actor-%1-%2'[_0x3b20f1(0x594)](_0x4ff51f,_0x32db20)),_0x159122['expParams']!==undefined&&_0x159122['learnings']!==undefined&&(_0x1953c8=_0x3b20f1(0x4e4)[_0x3b20f1(0x594)](_0x4ff51f,_0x32db20)),_0x159122[_0x3b20f1(0x297)]!==undefined&&_0x159122[_0x3b20f1(0x41f)]!==undefined&&(_0x1953c8='Skill-%1-%2'[_0x3b20f1(0x594)](_0x4ff51f,_0x32db20)),_0x159122[_0x3b20f1(0x24c)]!==undefined&&_0x159122[_0x3b20f1(0x73f)]!==undefined&&(_0x1953c8=_0x3b20f1(0x5b1)[_0x3b20f1(0x594)](_0x4ff51f,_0x32db20)),_0x159122[_0x3b20f1(0x6dc)]!==undefined&&_0x159122['etypeId']===0x1&&(_0x1953c8=_0x3b20f1(0x61c)[_0x3b20f1(0x594)](_0x4ff51f,_0x32db20)),_0x159122[_0x3b20f1(0x682)]!==undefined&&_0x159122['etypeId']>0x1&&(_0x1953c8='Armor-%1-%2'[_0x3b20f1(0x594)](_0x4ff51f,_0x32db20)),_0x159122[_0x3b20f1(0x7ae)]!==undefined&&_0x159122['battlerHue']!==undefined&&(_0x1953c8=_0x3b20f1(0x4d0)[_0x3b20f1(0x594)](_0x4ff51f,_0x32db20)),_0x159122[_0x3b20f1(0x29e)]!==undefined&&_0x159122[_0x3b20f1(0x172)]!==undefined&&(_0x1953c8=_0x3b20f1(0x512)[_0x3b20f1(0x594)](_0x4ff51f,_0x32db20)),_0x1953c8;},Game_Picture[_0x2a005f(0x7d8)][_0x2a005f(0x4fc)]=function(){const _0x279e18=_0x2a005f;return this[_0x279e18(0x470)];},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x1b9)]=Game_Picture[_0x2a005f(0x7d8)][_0x2a005f(0x4b8)],Game_Picture['prototype']['initBasic']=function(){const _0x2f3657=_0x2a005f;VisuMZ[_0x2f3657(0x63d)][_0x2f3657(0x1b9)][_0x2f3657(0x873)](this),this[_0x2f3657(0x470)]={'x':0x0,'y':0x0},this[_0x2f3657(0x584)]={'x':0x0,'y':0x0};},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x6a0)]=Game_Picture[_0x2a005f(0x7d8)][_0x2a005f(0x766)],Game_Picture[_0x2a005f(0x7d8)]['updateMove']=function(){const _0x4cc4ac=_0x2a005f;this[_0x4cc4ac(0x48f)]();const _0x1df493=this['_duration'];VisuMZ['CoreEngine'][_0x4cc4ac(0x6a0)][_0x4cc4ac(0x873)](this),_0x1df493>0x0&&this[_0x4cc4ac(0x7dd)]<=0x0&&(this['_x']=this['_targetX'],this['_y']=this['_targetY'],this[_0x4cc4ac(0x19d)]=this[_0x4cc4ac(0x41a)],this[_0x4cc4ac(0x79f)]=this[_0x4cc4ac(0x1bb)],this['_opacity']=this[_0x4cc4ac(0x726)],this['_anchor']&&(this[_0x4cc4ac(0x470)]['x']=this[_0x4cc4ac(0x584)]['x'],this['_anchor']['y']=this['_targetAnchor']['y']));},VisuMZ['CoreEngine'][_0x2a005f(0x452)]=Game_Picture[_0x2a005f(0x7d8)][_0x2a005f(0x548)],Game_Picture[_0x2a005f(0x7d8)]['show']=function(_0x4733b9,_0x53faeb,_0x5cc296,_0x5bb699,_0x371783,_0x46d584,_0x24aa59,_0x143dae){const _0x593414=_0x2a005f;VisuMZ[_0x593414(0x63d)][_0x593414(0x452)]['call'](this,_0x4733b9,_0x53faeb,_0x5cc296,_0x5bb699,_0x371783,_0x46d584,_0x24aa59,_0x143dae),this[_0x593414(0x4c8)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x53faeb]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine'][_0x2a005f(0x30c)]=Game_Picture['prototype']['move'],Game_Picture['prototype']['move']=function(_0x1cc637,_0x2e0bdf,_0x35df5c,_0x39a62b,_0x44fcf5,_0x34279a,_0x225b7a,_0x49fef1,_0x136a19){const _0x3b3ad6=_0x2a005f;VisuMZ[_0x3b3ad6(0x63d)][_0x3b3ad6(0x30c)][_0x3b3ad6(0x873)](this,_0x1cc637,_0x2e0bdf,_0x35df5c,_0x39a62b,_0x44fcf5,_0x34279a,_0x225b7a,_0x49fef1,_0x136a19),this['setTargetAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x1cc637]||{'x':0x0,'y':0x0});},Game_Picture[_0x2a005f(0x7d8)]['updateAnchor']=function(){const _0x3f146c=_0x2a005f;this[_0x3f146c(0x7dd)]>0x0&&(this[_0x3f146c(0x470)]['x']=this['applyEasing'](this[_0x3f146c(0x470)]['x'],this[_0x3f146c(0x584)]['x']),this[_0x3f146c(0x470)]['y']=this['applyEasing'](this['_anchor']['y'],this[_0x3f146c(0x584)]['y']));},Game_Picture[_0x2a005f(0x7d8)]['setAnchor']=function(_0x2c995e){const _0x25a6a6=_0x2a005f;this[_0x25a6a6(0x470)]=_0x2c995e,this[_0x25a6a6(0x584)]=JsonEx['makeDeepCopy'](this[_0x25a6a6(0x470)]);},Game_Picture[_0x2a005f(0x7d8)]['setTargetAnchor']=function(_0x2100c9){this['_targetAnchor']=_0x2100c9;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x8bc)]=Sprite_Picture[_0x2a005f(0x7d8)][_0x2a005f(0x540)],Sprite_Picture[_0x2a005f(0x7d8)][_0x2a005f(0x540)]=function(){const _0x3f59b7=_0x2a005f,_0x2620d4=this[_0x3f59b7(0x605)]();!_0x2620d4[_0x3f59b7(0x4fc)]()?VisuMZ[_0x3f59b7(0x63d)][_0x3f59b7(0x8bc)][_0x3f59b7(0x873)](this):(this[_0x3f59b7(0x4fc)]['x']=_0x2620d4[_0x3f59b7(0x4fc)]()['x'],this[_0x3f59b7(0x4fc)]['y']=_0x2620d4[_0x3f59b7(0x4fc)]()['y']);},Game_Action[_0x2a005f(0x7d8)][_0x2a005f(0x79d)]=function(_0x2dc9c9){const _0x2fafcd=_0x2a005f;if(_0x2dc9c9){const _0x375c01=_0x2dc9c9[_0x2fafcd(0x4cb)];if(_0x375c01===0x1&&this[_0x2fafcd(0x870)]()['attackSkillId']()!==0x1)this['setAttack']();else _0x375c01===0x2&&this[_0x2fafcd(0x870)]()[_0x2fafcd(0x824)]()!==0x2?this[_0x2fafcd(0x897)]():this[_0x2fafcd(0x18f)](_0x375c01);}else this[_0x2fafcd(0x707)]();},Game_Actor[_0x2a005f(0x7d8)][_0x2a005f(0x479)]=function(){const _0x7e1339=_0x2a005f;return this[_0x7e1339(0x8a1)]()['filter'](_0x265ac7=>this[_0x7e1339(0x515)](_0x265ac7)&&this[_0x7e1339(0x269)]()[_0x7e1339(0x34a)](_0x265ac7[_0x7e1339(0x297)]));},Window_Base['prototype'][_0x2a005f(0x694)]=function(){const _0x5a84d3=_0x2a005f;this[_0x5a84d3(0x2c2)]=new Sprite(),this['_dimmerSprite'][_0x5a84d3(0x5af)]=new Bitmap(0x0,0x0),this[_0x5a84d3(0x2c2)]['x']=0x0,this['addChildToBack'](this[_0x5a84d3(0x2c2)]);},Window_Base[_0x2a005f(0x7d8)][_0x2a005f(0x1be)]=function(){const _0x259df8=_0x2a005f;if(this[_0x259df8(0x2c2)]){const _0x329a5e=this[_0x259df8(0x2c2)][_0x259df8(0x5af)],_0x34d00c=this[_0x259df8(0x4c6)],_0x39da1a=this[_0x259df8(0x8b8)],_0x1b7669=this[_0x259df8(0x409)],_0x4ba7bd=ColorManager['dimColor1'](),_0x4b79eb=ColorManager['dimColor2']();_0x329a5e[_0x259df8(0x807)](_0x34d00c,_0x39da1a),_0x329a5e[_0x259df8(0x4a6)](0x0,0x0,_0x34d00c,_0x1b7669,_0x4b79eb,_0x4ba7bd,!![]),_0x329a5e['fillRect'](0x0,_0x1b7669,_0x34d00c,_0x39da1a-_0x1b7669*0x2,_0x4ba7bd),_0x329a5e[_0x259df8(0x4a6)](0x0,_0x39da1a-_0x1b7669,_0x34d00c,_0x1b7669,_0x4ba7bd,_0x4b79eb,!![]),this[_0x259df8(0x2c2)]['setFrame'](0x0,0x0,_0x34d00c,_0x39da1a);}},Game_Actor[_0x2a005f(0x7d8)]['makeAutoBattleActions']=function(){const _0xb4c4a5=_0x2a005f;for(let _0x10f389=0x0;_0x10f389<this[_0xb4c4a5(0x8b7)]();_0x10f389++){const _0x50ed3a=this[_0xb4c4a5(0x362)]();let _0x3f2ad6=Number[_0xb4c4a5(0x248)];this['setAction'](_0x10f389,_0x50ed3a[0x0]);for(const _0x129f0a of _0x50ed3a){const _0x5a2125=_0x129f0a['evaluate']();_0x5a2125>_0x3f2ad6&&(_0x3f2ad6=_0x5a2125,this[_0xb4c4a5(0x874)](_0x10f389,_0x129f0a));}}this['setActionState'](_0xb4c4a5(0x1a4));},Window_BattleItem[_0x2a005f(0x7d8)][_0x2a005f(0x5f8)]=function(_0x7c4e7c){const _0x46ac9d=_0x2a005f;return BattleManager[_0x46ac9d(0x70e)]()?BattleManager[_0x46ac9d(0x70e)]()[_0x46ac9d(0x515)](_0x7c4e7c):Window_ItemList['prototype']['isEnabled'][_0x46ac9d(0x873)](this,_0x7c4e7c);},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x2d2)]=Scene_Map[_0x2a005f(0x7d8)]['createSpriteset'],Scene_Map['prototype'][_0x2a005f(0x84c)]=function(){const _0x41eea7=_0x2a005f;VisuMZ[_0x41eea7(0x63d)][_0x41eea7(0x2d2)][_0x41eea7(0x873)](this);const _0x2ec4c3=this['_spriteset']['_timerSprite'];if(_0x2ec4c3)this[_0x41eea7(0x22e)](_0x2ec4c3);},VisuMZ[_0x2a005f(0x63d)]['Scene_Battle_createSpritesetFix']=Scene_Battle[_0x2a005f(0x7d8)][_0x2a005f(0x84c)],Scene_Battle['prototype']['createSpriteset']=function(){const _0x49d4f9=_0x2a005f;VisuMZ[_0x49d4f9(0x63d)][_0x49d4f9(0x6ea)][_0x49d4f9(0x873)](this);const _0x5b9e9e=this['_spriteset'][_0x49d4f9(0x17e)];if(_0x5b9e9e)this[_0x49d4f9(0x22e)](_0x5b9e9e);},Sprite_Actor[_0x2a005f(0x7d8)][_0x2a005f(0x457)]=function(){const _0x3a1ccf=_0x2a005f;Sprite_Battler[_0x3a1ccf(0x7d8)][_0x3a1ccf(0x457)][_0x3a1ccf(0x873)](this),this[_0x3a1ccf(0x78e)]();if(this['_actor'])this[_0x3a1ccf(0x6f9)]();else this[_0x3a1ccf(0x383)]!==''&&(this['_battlerName']='');},Window[_0x2a005f(0x7d8)][_0x2a005f(0x815)]=function(){const _0x122584=_0x2a005f,_0x45e41=this['_width'],_0x291912=this['_height'],_0x323944=0x18,_0x5035fc=_0x323944/0x2,_0x573db6=0x60+_0x323944,_0x380712=0x0+_0x323944;this[_0x122584(0x1e5)][_0x122584(0x5af)]=this[_0x122584(0x5d9)],this[_0x122584(0x1e5)][_0x122584(0x4fc)]['x']=0.5,this[_0x122584(0x1e5)][_0x122584(0x4fc)]['y']=0.5,this['_downArrowSprite'][_0x122584(0x3aa)](_0x573db6+_0x5035fc,_0x380712+_0x5035fc+_0x323944,_0x323944,_0x5035fc),this[_0x122584(0x1e5)][_0x122584(0x3d0)](Math[_0x122584(0x57f)](_0x45e41/0x2),Math[_0x122584(0x57f)](_0x291912-_0x5035fc)),this['_upArrowSprite'][_0x122584(0x5af)]=this[_0x122584(0x5d9)],this[_0x122584(0x49a)]['anchor']['x']=0.5,this[_0x122584(0x49a)][_0x122584(0x4fc)]['y']=0.5,this[_0x122584(0x49a)][_0x122584(0x3aa)](_0x573db6+_0x5035fc,_0x380712,_0x323944,_0x5035fc),this[_0x122584(0x49a)][_0x122584(0x3d0)](Math[_0x122584(0x57f)](_0x45e41/0x2),Math[_0x122584(0x57f)](_0x5035fc));},Window[_0x2a005f(0x7d8)][_0x2a005f(0x483)]=function(){const _0x18cbc0=_0x2a005f,_0x3c3d39=0x90,_0x1b90d2=0x60,_0x519d46=0x18;this['_pauseSignSprite'][_0x18cbc0(0x5af)]=this[_0x18cbc0(0x5d9)],this[_0x18cbc0(0x7cc)]['anchor']['x']=0.5,this[_0x18cbc0(0x7cc)]['anchor']['y']=0x1,this[_0x18cbc0(0x7cc)][_0x18cbc0(0x3d0)](Math[_0x18cbc0(0x57f)](this[_0x18cbc0(0x1b4)]/0x2),this['_height']),this[_0x18cbc0(0x7cc)][_0x18cbc0(0x3aa)](_0x3c3d39,_0x1b90d2,_0x519d46,_0x519d46),this['_pauseSignSprite'][_0x18cbc0(0x222)]=0xff;},Window[_0x2a005f(0x7d8)][_0x2a005f(0x5ef)]=function(){const _0x443d8c=_0x2a005f,_0x584f15=this[_0x443d8c(0x2d1)][_0x443d8c(0x65d)]['apply'](new Point(0x0,0x0)),_0x6ad24f=this[_0x443d8c(0x2d1)][_0x443d8c(0x2b4)];_0x6ad24f['x']=_0x584f15['x']+this[_0x443d8c(0x488)]['x'],_0x6ad24f['y']=_0x584f15['y']+this['origin']['y'],_0x6ad24f['width']=Math['ceil'](this[_0x443d8c(0x2ef)]*this[_0x443d8c(0x2cf)]['x']),_0x6ad24f[_0x443d8c(0x8b8)]=Math[_0x443d8c(0x187)](this[_0x443d8c(0x8ab)]*this[_0x443d8c(0x2cf)]['y']);},Window[_0x2a005f(0x7d8)][_0x2a005f(0x890)]=function(){const _0x2a0d05=_0x2a005f,_0x6d4394=this['_margin'],_0x34628a=Math[_0x2a0d05(0x23f)](0x0,this[_0x2a0d05(0x1b4)]-_0x6d4394*0x2),_0x375016=Math[_0x2a0d05(0x23f)](0x0,this['_height']-_0x6d4394*0x2),_0x39621b=this[_0x2a0d05(0x4aa)],_0xa8faa8=_0x39621b['children'][0x0];_0x39621b[_0x2a0d05(0x5af)]=this[_0x2a0d05(0x5d9)],_0x39621b[_0x2a0d05(0x3aa)](0x0,0x0,0x60,0x60),_0x39621b['move'](_0x6d4394,_0x6d4394),_0x39621b[_0x2a0d05(0x2cf)]['x']=_0x34628a/0x60,_0x39621b['scale']['y']=_0x375016/0x60,_0xa8faa8[_0x2a0d05(0x5af)]=this[_0x2a0d05(0x5d9)],_0xa8faa8['setFrame'](0x0,0x60,0x60,0x60),_0xa8faa8[_0x2a0d05(0x3d0)](0x0,0x0,_0x34628a,_0x375016),_0xa8faa8['scale']['x']=0x1/_0x39621b['scale']['x'],_0xa8faa8[_0x2a0d05(0x2cf)]['y']=0x1/_0x39621b['scale']['y'],_0x39621b[_0x2a0d05(0x1f2)](this[_0x2a0d05(0x210)]);},Game_Temp[_0x2a005f(0x7d8)][_0x2a005f(0x650)]=function(){const _0x190aef=_0x2a005f;this[_0x190aef(0x36d)]=[],this[_0x190aef(0x223)]=[],this['_pointAnimationQueue']=[],this[_0x190aef(0x2f5)]=[];},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x266)]=Scene_Base['prototype'][_0x2a005f(0x629)],Scene_Base[_0x2a005f(0x7d8)]['terminate']=function(){const _0x44d56f=_0x2a005f;if($gameTemp)$gameTemp['sceneTerminationClearEffects']();VisuMZ[_0x44d56f(0x63d)]['Scene_Base_terminateAnimationClearBugFix'][_0x44d56f(0x873)](this);},Bitmap[_0x2a005f(0x7d8)][_0x2a005f(0x4e6)]=function(_0x68ec58){const _0x2b8a8d=_0x2a005f,_0x34aad9=this['context'];_0x34aad9[_0x2b8a8d(0x7e0)](),_0x34aad9[_0x2b8a8d(0x2ce)]=this[_0x2b8a8d(0x322)]();const _0x5e4c94=_0x34aad9[_0x2b8a8d(0x17c)](_0x68ec58)[_0x2b8a8d(0x4c6)];return _0x34aad9['restore'](),_0x5e4c94;},Window_Message[_0x2a005f(0x7d8)][_0x2a005f(0x888)]=function(_0x3d6c2d){const _0x2abaf1=_0x2a005f;return this[_0x2abaf1(0x2ac)]()?this[_0x2abaf1(0x225)][_0x2abaf1(0x4e6)](_0x3d6c2d):Window_Base['prototype'][_0x2abaf1(0x888)][_0x2abaf1(0x873)](this,_0x3d6c2d);},Window_Message[_0x2a005f(0x7d8)][_0x2a005f(0x2ac)]=function(){const _0x34f6d1=_0x2a005f;return VisuMZ[_0x34f6d1(0x63d)][_0x34f6d1(0x52e)]['QoL'][_0x34f6d1(0x40f)]??!![];},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x275)]=Game_Action['prototype'][_0x2a005f(0x2df)],Game_Action[_0x2a005f(0x7d8)][_0x2a005f(0x2df)]=function(){const _0x45c640=_0x2a005f;return this[_0x45c640(0x507)]()?VisuMZ['CoreEngine'][_0x45c640(0x275)]['call'](this):0x0;},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x2e1)]=Game_Action[_0x2a005f(0x7d8)][_0x2a005f(0x410)],Game_Action['prototype']['setAttack']=function(){const _0xcc9c37=_0x2a005f;this[_0xcc9c37(0x870)]()&&this[_0xcc9c37(0x870)]()[_0xcc9c37(0x40b)]()?VisuMZ[_0xcc9c37(0x63d)][_0xcc9c37(0x2e1)][_0xcc9c37(0x873)](this):this[_0xcc9c37(0x707)]();},Sprite_Name[_0x2a005f(0x7d8)][_0x2a005f(0x19a)]=function(){return 0x24;},Sprite_Name[_0x2a005f(0x7d8)]['redraw']=function(){const _0x310d62=_0x2a005f,_0x3f7505=this['name'](),_0x329fcc=this[_0x310d62(0x57d)](),_0x217cfa=this['bitmapHeight']();this['setupFont'](),this['bitmap'][_0x310d62(0x707)](),this['bitmap'][_0x310d62(0x560)](_0x3f7505,0x4,0x0,_0x329fcc-0xa,_0x217cfa,_0x310d62(0x3bf));},Bitmap[_0x2a005f(0x7d8)][_0x2a005f(0x560)]=function(_0x5ba115,_0x55c305,_0x213c6a,_0x17e9a0,_0x157f9d,_0x69bd0){const _0x17b800=_0x2a005f,_0xda29fa=this['context'],_0x1d68df=_0xda29fa[_0x17b800(0x442)];_0x17e9a0=_0x17e9a0||0xffffffff;let _0x259252=_0x55c305,_0x59e838=Math['round'](_0x213c6a+0x18/0x2+this[_0x17b800(0x7cb)]*0.35);_0x69bd0===_0x17b800(0x5ac)&&(_0x259252+=_0x17e9a0/0x2),_0x69bd0===_0x17b800(0x768)&&(_0x259252+=_0x17e9a0),_0xda29fa[_0x17b800(0x7e0)](),_0xda29fa[_0x17b800(0x2ce)]=this[_0x17b800(0x322)](),_0xda29fa[_0x17b800(0x34c)]=_0x69bd0,_0xda29fa[_0x17b800(0x59c)]=_0x17b800(0x6ca),_0xda29fa[_0x17b800(0x442)]=0x1,this[_0x17b800(0x568)](_0x5ba115,_0x259252,_0x59e838,_0x17e9a0),_0xda29fa[_0x17b800(0x442)]=_0x1d68df,this[_0x17b800(0x49b)](_0x5ba115,_0x259252,_0x59e838,_0x17e9a0),_0xda29fa[_0x17b800(0x76c)](),this[_0x17b800(0x406)][_0x17b800(0x457)]();},VisuMZ[_0x2a005f(0x63d)][_0x2a005f(0x516)]=BattleManager[_0x2a005f(0x788)],BattleManager[_0x2a005f(0x788)]=function(_0xceafad){const _0x57dce1=_0x2a005f;if(this['_action'][_0x57dce1(0x558)]())return![];return VisuMZ[_0x57dce1(0x63d)][_0x57dce1(0x516)]['call'](this,_0xceafad);},BattleManager['endAction']=function(){const _0x1f42d8=_0x2a005f;if(this['_subject'])this[_0x1f42d8(0x5c3)][_0x1f42d8(0x408)](this[_0x1f42d8(0x7ab)]);this[_0x1f42d8(0x704)]=_0x1f42d8(0x574),this['_subject']&&this[_0x1f42d8(0x7ab)][_0x1f42d8(0x8b7)]()===0x0&&(this[_0x1f42d8(0x78a)](this[_0x1f42d8(0x7ab)]),this[_0x1f42d8(0x7ab)]=null);},Bitmap['prototype'][_0x2a005f(0x80a)]=function(){const _0xd01b77=_0x2a005f;this[_0xd01b77(0x3fb)]=new Image(),this[_0xd01b77(0x3fb)][_0xd01b77(0x1bc)]=this[_0xd01b77(0x7f5)][_0xd01b77(0x80d)](this),this['_image']['onerror']=this[_0xd01b77(0x473)][_0xd01b77(0x80d)](this),this[_0xd01b77(0x7e9)](),this[_0xd01b77(0x3b3)]=_0xd01b77(0x1d9),Utils[_0xd01b77(0x706)]()?this[_0xd01b77(0x70c)]():(this['_image']['src']=this[_0xd01b77(0x702)],![]&&this[_0xd01b77(0x3fb)]['width']>0x0&&(this[_0xd01b77(0x3fb)][_0xd01b77(0x1bc)]=null,this['_onLoad']()));},Scene_Skill[_0x2a005f(0x7d8)][_0x2a005f(0x83c)]=function(){const _0xb11915=_0x2a005f;Scene_MenuBase['prototype'][_0xb11915(0x83c)][_0xb11915(0x873)](this),this[_0xb11915(0x700)](),this['_itemWindow'][_0xb11915(0x4cd)](),this[_0xb11915(0x4df)][_0xb11915(0x461)](),this[_0xb11915(0x53f)][_0xb11915(0x44c)]();},Scene_Skill[_0x2a005f(0x7d8)][_0x2a005f(0x1fd)]=function(){const _0x1d857e=_0x2a005f;return this[_0x1d857e(0x53f)]&&this[_0x1d857e(0x53f)]['active'];},Game_Map[_0x2a005f(0x7d8)][_0x2a005f(0x247)]=function(_0x4faf13,_0x24c4da,_0x41ba62){const _0x2f9ac6=_0x2a005f,_0x37a842=this[_0x2f9ac6(0x822)](),_0x51dd8a=this[_0x2f9ac6(0x486)](_0x4faf13,_0x24c4da);for(const _0x21a04d of _0x51dd8a){const _0x5e2e38=_0x37a842[_0x21a04d];if(_0x5e2e38===undefined||_0x5e2e38===null){if($gameTemp[_0x2f9ac6(0x7c6)]()&&!DataManager['isEventTest']()){let _0x34bd37='Current\x20tileset\x20has\x20incomplete\x20flag\x20data.'+'\x0a';_0x34bd37+=_0x2f9ac6(0x2c4)+'\x0a',_0x34bd37+='and\x20add\x20it\x20onto\x20this\x20one.',Imported[_0x2f9ac6(0x5b7)]||Imported[_0x2f9ac6(0x6d6)]?(alert(_0x34bd37),SceneManager[_0x2f9ac6(0x64f)]()):(console['log'](_0x34bd37),!$gameTemp[_0x2f9ac6(0x53b)]&&($gameTemp[_0x2f9ac6(0x53b)]=!![],SceneManager[_0x2f9ac6(0x27a)]()));}}if((_0x5e2e38&0x10)!==0x0)continue;if((_0x5e2e38&_0x41ba62)===0x0)return!![];if((_0x5e2e38&_0x41ba62)===_0x41ba62)return![];}return![];},Sprite_Animation[_0x2a005f(0x7d8)][_0x2a005f(0x5b3)]=function(_0xfc9f81){const _0x79c54b=_0x2a005f;!this[_0x79c54b(0x6dd)]&&(this['_originalViewport']=_0xfc9f81['gl']['getParameter'](_0xfc9f81['gl'][_0x79c54b(0x3e7)]));};