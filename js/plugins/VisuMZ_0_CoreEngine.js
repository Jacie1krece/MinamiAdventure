//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.77;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.77] [CoreEngine]
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
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
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
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
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
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
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
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
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
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
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
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
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
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
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
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * "Don't" will consolidate both into "Escape".
 * @default false
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

const _0x4535e7=_0x5575;(function(_0x5b35d1,_0x2fd276){const _0x3c493a=_0x5575,_0x3d2341=_0x5b35d1();while(!![]){try{const _0x589871=-parseInt(_0x3c493a(0x6e3))/0x1*(-parseInt(_0x3c493a(0x70d))/0x2)+-parseInt(_0x3c493a(0x883))/0x3*(-parseInt(_0x3c493a(0x7b8))/0x4)+-parseInt(_0x3c493a(0x9a6))/0x5*(parseInt(_0x3c493a(0x403))/0x6)+-parseInt(_0x3c493a(0x96d))/0x7+-parseInt(_0x3c493a(0x1cd))/0x8+parseInt(_0x3c493a(0x9c7))/0x9*(-parseInt(_0x3c493a(0x6a1))/0xa)+-parseInt(_0x3c493a(0x725))/0xb*(-parseInt(_0x3c493a(0x378))/0xc);if(_0x589871===_0x2fd276)break;else _0x3d2341['push'](_0x3d2341['shift']());}catch(_0x37bfb4){_0x3d2341['push'](_0x3d2341['shift']());}}}(_0x1968,0xc4b69));var label=_0x4535e7(0x7ac),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4535e7(0x184)](function(_0x2e0e89){const _0x16ec6b=_0x4535e7;return _0x2e0e89[_0x16ec6b(0x89a)]&&_0x2e0e89[_0x16ec6b(0x3d0)][_0x16ec6b(0x454)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x4535e7(0x395)]=function(_0x479a8a,_0xa9f1b1){const _0x53edfc=_0x4535e7;for(const _0x59f6ed in _0xa9f1b1){if('HnTuL'===_0x53edfc(0x82e))this['bitmap']=_0x195c19[_0x53edfc(0x941)](this['_data'][_0x53edfc(0x967)]),this[_0x53edfc(0x7c5)][_0x53edfc(0x74b)](this[_0x53edfc(0x4a4)][_0x53edfc(0x8f2)](this));else{if(_0x59f6ed[_0x53edfc(0x27c)](/(.*):(.*)/i)){if(_0x53edfc(0x27a)===_0x53edfc(0x6a7))this[_0x53edfc(0x86a)]=0x0;else{const _0x451476=String(RegExp['$1']),_0x3e0970=String(RegExp['$2'])['toUpperCase']()[_0x53edfc(0x24d)]();let _0x4d400b,_0x2ddc52,_0x3bb253;switch(_0x3e0970){case'NUM':_0x4d400b=_0xa9f1b1[_0x59f6ed]!==''?Number(_0xa9f1b1[_0x59f6ed]):0x0;break;case _0x53edfc(0x823):_0x2ddc52=_0xa9f1b1[_0x59f6ed]!==''?JSON[_0x53edfc(0x7ed)](_0xa9f1b1[_0x59f6ed]):[],_0x4d400b=_0x2ddc52['map'](_0x37be43=>Number(_0x37be43));break;case'EVAL':_0x4d400b=_0xa9f1b1[_0x59f6ed]!==''?eval(_0xa9f1b1[_0x59f6ed]):null;break;case _0x53edfc(0x4ab):_0x2ddc52=_0xa9f1b1[_0x59f6ed]!==''?JSON[_0x53edfc(0x7ed)](_0xa9f1b1[_0x59f6ed]):[],_0x4d400b=_0x2ddc52[_0x53edfc(0x8d0)](_0xeaf07=>eval(_0xeaf07));break;case'JSON':_0x4d400b=_0xa9f1b1[_0x59f6ed]!==''?JSON[_0x53edfc(0x7ed)](_0xa9f1b1[_0x59f6ed]):'';break;case _0x53edfc(0x9fc):_0x2ddc52=_0xa9f1b1[_0x59f6ed]!==''?JSON['parse'](_0xa9f1b1[_0x59f6ed]):[],_0x4d400b=_0x2ddc52[_0x53edfc(0x8d0)](_0x3958a4=>JSON[_0x53edfc(0x7ed)](_0x3958a4));break;case _0x53edfc(0xa2f):_0x4d400b=_0xa9f1b1[_0x59f6ed]!==''?new Function(JSON[_0x53edfc(0x7ed)](_0xa9f1b1[_0x59f6ed])):new Function(_0x53edfc(0x57b));break;case'ARRAYFUNC':_0x2ddc52=_0xa9f1b1[_0x59f6ed]!==''?JSON[_0x53edfc(0x7ed)](_0xa9f1b1[_0x59f6ed]):[],_0x4d400b=_0x2ddc52[_0x53edfc(0x8d0)](_0x405cc1=>new Function(JSON[_0x53edfc(0x7ed)](_0x405cc1)));break;case _0x53edfc(0x606):_0x4d400b=_0xa9f1b1[_0x59f6ed]!==''?String(_0xa9f1b1[_0x59f6ed]):'';break;case _0x53edfc(0x26f):_0x2ddc52=_0xa9f1b1[_0x59f6ed]!==''?JSON[_0x53edfc(0x7ed)](_0xa9f1b1[_0x59f6ed]):[],_0x4d400b=_0x2ddc52[_0x53edfc(0x8d0)](_0xb07c3f=>String(_0xb07c3f));break;case'STRUCT':_0x3bb253=_0xa9f1b1[_0x59f6ed]!==''?JSON[_0x53edfc(0x7ed)](_0xa9f1b1[_0x59f6ed]):{},_0x479a8a[_0x451476]={},VisuMZ[_0x53edfc(0x395)](_0x479a8a[_0x451476],_0x3bb253);continue;case _0x53edfc(0x652):_0x2ddc52=_0xa9f1b1[_0x59f6ed]!==''?JSON[_0x53edfc(0x7ed)](_0xa9f1b1[_0x59f6ed]):[],_0x4d400b=_0x2ddc52[_0x53edfc(0x8d0)](_0x5237f5=>VisuMZ[_0x53edfc(0x395)]({},JSON[_0x53edfc(0x7ed)](_0x5237f5)));break;default:continue;}_0x479a8a[_0x451476]=_0x4d400b;}}}}return _0x479a8a;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x50d)]=SceneManager['exit'],SceneManager['exit']=function(){const _0x388e26=_0x4535e7;VisuMZ['CoreEngine'][_0x388e26(0x50d)]['call'](this);if(Utils[_0x388e26(0x2ad)]>=_0x388e26(0x291)){if(typeof nw===_0x388e26(0x6a0))nw[_0x388e26(0x267)][_0x388e26(0x62e)]();}},(_0x205b13=>{const _0x3f560b=_0x4535e7,_0x48b01f=_0x205b13[_0x3f560b(0x4e4)];for(const _0x2615fe of dependencies){if(!Imported[_0x2615fe]){alert(_0x3f560b(0x428)['format'](_0x48b01f,_0x2615fe)),SceneManager[_0x3f560b(0x5c8)]();break;}}const _0x17f39e=_0x205b13[_0x3f560b(0x3d0)];if(_0x17f39e['match'](/\[Version[ ](.*?)\]/i)){if(_0x3f560b(0x191)!==_0x3f560b(0x75c)){const _0x351be8=Number(RegExp['$1']);_0x351be8!==VisuMZ[label]['version']&&(alert(_0x3f560b(0xa19)['format'](_0x48b01f,_0x351be8)),SceneManager[_0x3f560b(0x5c8)]());}else _0x2c2d78+=_0x554963+_0x3f560b(0x1d5);}if(_0x17f39e[_0x3f560b(0x27c)](/\[Tier[ ](\d+)\]/i)){const _0x51788f=Number(RegExp['$1']);_0x51788f<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x48b01f,_0x51788f,tier)),SceneManager['exit']()):_0x3f560b(0x54c)===_0x3f560b(0x54c)?tier=Math[_0x3f560b(0x548)](_0x51788f,tier):this[_0x3f560b(0x7e4)](_0x50f381);}VisuMZ[_0x3f560b(0x395)](VisuMZ[label][_0x3f560b(0x806)],_0x205b13[_0x3f560b(0x67d)]);})(pluginData),((()=>{const _0x505047=_0x4535e7;if(VisuMZ[_0x505047(0x7ac)][_0x505047(0x806)]['QoL'][_0x505047(0x8c2)]??!![])for(const _0xa6384 in $plugins){if(_0x505047(0x21a)!==_0x505047(0x604)){const _0x41acf4=$plugins[_0xa6384];_0x41acf4['name'][_0x505047(0x27c)](/(.*)\/(.*)/i)&&(_0x505047(0x772)===_0x505047(0x668)?_0x2c4f4f=_0x505047(0x986)[_0x505047(0x543)](_0x433d96,_0x34e9af):_0x41acf4['name']=String(RegExp['$2'][_0x505047(0x24d)]()));}else return _0x3c298c[_0x505047(0x7c9)][_0x505047(0x3cf)]['call'](this);}})()),PluginManager[_0x4535e7(0x2bc)](pluginData['name'],_0x4535e7(0x560),_0x2b0700=>{const _0x477f84=_0x4535e7;if(!SceneManager['_scene'])return;if(!SceneManager[_0x477f84(0x42f)][_0x477f84(0x170)])return;VisuMZ[_0x477f84(0x395)](_0x2b0700,_0x2b0700);const _0xf533be=Math[_0x477f84(0x98a)](_0x2b0700[_0x477f84(0x9ab)]),_0x26f9c0=Math[_0x477f84(0x98a)](_0x2b0700[_0x477f84(0x172)]);$gameTemp['requestPointAnimation'](_0xf533be,_0x26f9c0,_0x2b0700[_0x477f84(0x89e)],_0x2b0700[_0x477f84(0x8e8)],_0x2b0700[_0x477f84(0x858)]);}),PluginManager['registerCommand'](pluginData[_0x4535e7(0x4e4)],'AudioChangeBgmVolume',_0x1311b6=>{const _0x501805=_0x4535e7;VisuMZ[_0x501805(0x395)](_0x1311b6,_0x1311b6);const _0x289a7a=Math[_0x501805(0x98a)](_0x1311b6['volume'])[_0x501805(0x15b)](0x0,0x64),_0x1042fe=AudioManager[_0x501805(0x583)];_0x1042fe&&('ypNfe'===_0x501805(0x361)?(_0x1042fe[_0x501805(0x1e3)]=_0x289a7a,_0x1042fe[_0x501805(0x68d)]=AudioManager['_bgmBuffer'][_0x501805(0x47f)](),AudioManager[_0x501805(0x522)](_0x1042fe),AudioManager['playBgm'](_0x1042fe,_0x1042fe[_0x501805(0x68d)]),AudioManager[_0x501805(0x878)][_0x501805(0x619)](_0x1042fe[_0x501805(0x68d)])):this['_pictureName']&&this[_0x501805(0x57f)][_0x501805(0x27c)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x501805(0x642)](_0x3ea14b(_0x47a726['$1'])):_0x1f086f['CoreEngine']['Sprite_Picture_loadBitmap'][_0x501805(0x77f)](this));}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],'AudioChangeBgmPitch',_0x6e3a89=>{const _0x3427be=_0x4535e7;VisuMZ[_0x3427be(0x395)](_0x6e3a89,_0x6e3a89);const _0x1b6022=Math['round'](_0x6e3a89[_0x3427be(0x6a4)])[_0x3427be(0x15b)](0x32,0x96),_0x5ca2ef=AudioManager[_0x3427be(0x583)];_0x5ca2ef&&(_0x5ca2ef[_0x3427be(0x6a4)]=_0x1b6022,_0x5ca2ef[_0x3427be(0x68d)]=AudioManager[_0x3427be(0x878)]['seek'](),AudioManager[_0x3427be(0x522)](_0x5ca2ef),AudioManager['playBgm'](_0x5ca2ef,_0x5ca2ef[_0x3427be(0x68d)]),AudioManager[_0x3427be(0x878)][_0x3427be(0x619)](_0x5ca2ef[_0x3427be(0x68d)]));}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],_0x4535e7(0x370),_0x598d25=>{const _0x136cc1=_0x4535e7;VisuMZ['ConvertParams'](_0x598d25,_0x598d25);const _0x2f47da=Math[_0x136cc1(0x98a)](_0x598d25[_0x136cc1(0x410)])['clamp'](-0x64,0x64),_0x59265f=AudioManager['_currentBgm'];_0x59265f&&(_0x59265f[_0x136cc1(0x410)]=_0x2f47da,_0x59265f[_0x136cc1(0x68d)]=AudioManager[_0x136cc1(0x878)][_0x136cc1(0x47f)](),AudioManager['updateBgmParameters'](_0x59265f),AudioManager[_0x136cc1(0x79e)](_0x59265f,_0x59265f[_0x136cc1(0x68d)]),AudioManager[_0x136cc1(0x878)][_0x136cc1(0x619)](_0x59265f[_0x136cc1(0x68d)]));}),PluginManager[_0x4535e7(0x2bc)](pluginData['name'],_0x4535e7(0x2a8),_0x74e6ea=>{const _0x59657a=_0x4535e7;VisuMZ['ConvertParams'](_0x74e6ea,_0x74e6ea);const _0x56952a=Math[_0x59657a(0x98a)](_0x74e6ea[_0x59657a(0x1e3)])['clamp'](0x0,0x64),_0x3bb5a7=AudioManager[_0x59657a(0x215)];if(_0x3bb5a7){if(_0x59657a(0x9aa)==='GtaQe')_0x3bb5a7[_0x59657a(0x1e3)]=_0x56952a,_0x3bb5a7[_0x59657a(0x68d)]=AudioManager[_0x59657a(0x6dc)]['seek'](),AudioManager[_0x59657a(0x6ac)](_0x3bb5a7),AudioManager[_0x59657a(0x9b9)](_0x3bb5a7,_0x3bb5a7[_0x59657a(0x68d)]),AudioManager[_0x59657a(0x6dc)][_0x59657a(0x619)](_0x3bb5a7[_0x59657a(0x68d)]);else return this[_0x59657a(0x8d5)]()?this['yScrollLinkedOffset']():_0xab47e0[_0x59657a(0x7ac)][_0x59657a(0x3ec)][_0x59657a(0x77f)](this);}}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],_0x4535e7(0x514),_0x150808=>{const _0x32b81e=_0x4535e7;VisuMZ[_0x32b81e(0x395)](_0x150808,_0x150808);const _0x3dd11b=Math[_0x32b81e(0x98a)](_0x150808[_0x32b81e(0x6a4)])[_0x32b81e(0x15b)](0x32,0x96),_0x113985=AudioManager['_currentBgs'];_0x113985&&(_0x32b81e(0x32b)===_0x32b81e(0x32b)?(_0x113985[_0x32b81e(0x6a4)]=_0x3dd11b,_0x113985[_0x32b81e(0x68d)]=AudioManager['_bgsBuffer'][_0x32b81e(0x47f)](),AudioManager['updateBgsParameters'](_0x113985),AudioManager['playBgs'](_0x113985,_0x113985[_0x32b81e(0x68d)]),AudioManager[_0x32b81e(0x6dc)]['_startPlaying'](_0x113985['pos'])):_0x5e941b=_0x2ff1a3[_0x32b81e(0x6db)](_0x27a8d5));}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],_0x4535e7(0x306),_0x5588a4=>{const _0x330153=_0x4535e7;VisuMZ['ConvertParams'](_0x5588a4,_0x5588a4);const _0x7285b1=Math[_0x330153(0x98a)](_0x5588a4[_0x330153(0x410)])[_0x330153(0x15b)](-0x64,0x64),_0x3292bf=AudioManager['_currentBgs'];if(_0x3292bf){if('MRblu'==='MRblu')_0x3292bf[_0x330153(0x410)]=_0x7285b1,_0x3292bf['pos']=AudioManager[_0x330153(0x6dc)][_0x330153(0x47f)](),AudioManager[_0x330153(0x6ac)](_0x3292bf),AudioManager[_0x330153(0x9b9)](_0x3292bf,_0x3292bf[_0x330153(0x68d)]),AudioManager[_0x330153(0x6dc)][_0x330153(0x619)](_0x3292bf[_0x330153(0x68d)]);else{if(this[_0x330153(0x35b)]==='keyboard'&&!_0x241e49[_0x330153(0x232)]())return;if(_0x2cb790[_0x330153(0x693)]())return;_0x700758[_0x330153(0x7ac)][_0x330153(0x4ef)]['call'](this,_0x4148ec),this['switchModes'](_0x330153(0x696));}}}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],_0x4535e7(0x55a),_0x58be43=>{const _0x128ca3=_0x4535e7;if(!$gameTemp[_0x128ca3(0x18e)]())return;const _0x514ae2=Input[_0x128ca3(0x521)]();if(navigator[_0x128ca3(0x1d6)]){if(_0x128ca3(0x2dd)==='GiknF'){if(_0x3476bf&&_0x425a4e[_0x128ca3(0x503)]())return;_0x3b0fa5[_0x128ca3(0x7ac)][_0x128ca3(0x7d3)]['call'](this,_0x35859a,_0x1a6f03,_0x444b8d,_0x312943);}else navigator['clipboard']['writeText'](_0x514ae2);}}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],_0x4535e7(0x787),_0x1ef8b4=>{const _0x2072b3=_0x4535e7;if(!$gameTemp[_0x2072b3(0x18e)]())return;if(!Utils[_0x2072b3(0x3e2)]())return;SceneManager[_0x2072b3(0x42f)][_0x2072b3(0x348)]=![],VisuMZ['CoreEngine'][_0x2072b3(0x8bc)]();}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],_0x4535e7(0x992),_0x7f3b6e=>{const _0x218250=_0x4535e7;if(!$gameTemp[_0x218250(0x18e)]())return;if(!Utils['isNwjs']())return;SceneManager[_0x218250(0x42f)][_0x218250(0x348)]=![],VisuMZ['CoreEngine'][_0x218250(0x980)]();}),PluginManager['registerCommand'](pluginData['name'],'ExportCurMapText',_0x4be573=>{const _0x3346b0=_0x4535e7;if(!$gameTemp[_0x3346b0(0x18e)]())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap['mapId']()<=0x0)return;VisuMZ[_0x3346b0(0x395)](_0x4be573,_0x4be573);const _0x3e74be='Map%1'[_0x3346b0(0x543)]($gameMap['mapId']()[_0x3346b0(0x4ee)](0x3)),_0x4afaa4=VisuMZ[_0x3346b0(0x7ac)]['ExtractStrFromMap']($gameMap[_0x3346b0(0x45b)]());VisuMZ[_0x3346b0(0x7ac)][_0x3346b0(0x51e)](_0x4afaa4,_0x3e74be,!![]);}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],_0x4535e7(0x799),_0x240de9=>{const _0x178e92=_0x4535e7;if(!$gameTemp[_0x178e92(0x18e)]())return;if(!Utils[_0x178e92(0x3e2)]())return;if(!$gameParty[_0x178e92(0x79c)]())return;VisuMZ[_0x178e92(0x395)](_0x240de9,_0x240de9);const _0x58c72f='Troop%1'['format']($gameTroop['_troopId']['padZero'](0x4)),_0x1451bd=VisuMZ[_0x178e92(0x7ac)][_0x178e92(0x43c)]($gameTroop[_0x178e92(0x302)]);VisuMZ[_0x178e92(0x7ac)]['ExportString'](_0x1451bd,_0x58c72f,!![]);}),VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x51e)]=function(_0xc2cac9,_0x283fa1,_0x489793){const _0x2ddd61=_0x4535e7,_0xf33e4e=require('fs');let _0x3bc91e='Exported_Script_%1.txt'[_0x2ddd61(0x543)](_0x283fa1||'0');_0xf33e4e['writeFile'](_0x3bc91e,_0xc2cac9,_0x15ff95=>{const _0x1d271d=_0x2ddd61;if(_0x15ff95){if(_0x1d271d(0x372)!==_0x1d271d(0x75e))throw err;else{if(!_0x1df4ea['_scene'])return;if(!_0x186052[_0x1d271d(0x42f)][_0x1d271d(0x170)])return;_0x1f8825[_0x1d271d(0x395)](_0x3bacf6,_0x983472);const _0x2cbda1=_0x5bdaa8[_0x1d271d(0x98a)](_0x4d0f2e['pointX']),_0x28383c=_0x22c103[_0x1d271d(0x98a)](_0xbf6cc0[_0x1d271d(0x172)]);_0x1712fe[_0x1d271d(0x409)](_0x2cbda1,_0x28383c,_0x4e30c3[_0x1d271d(0x89e)],_0x306932[_0x1d271d(0x8e8)],_0x170fbc[_0x1d271d(0x858)]);}}else _0x489793&&('RDFsj'===_0x1d271d(0x4a5)?this[_0x1d271d(0x3cd)][_0x1d271d(0x518)](_0x50f55f[_0x1d271d(0x7c9)][_0x1d271d(0x8ad)]):alert(_0x1d271d(0x281)[_0x1d271d(0x543)](_0x3bc91e)));});},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x8bc)]=function(){const _0x36f347=_0x4535e7,_0x3f5c99=[];for(const _0x5bb7c1 of $dataMapInfos){if(!_0x5bb7c1)continue;_0x3f5c99[_0x36f347(0x85c)](_0x5bb7c1['id']);}const _0x4d7f03=_0x3f5c99['length']*0x64+Math[_0x36f347(0x382)](0x64);alert(_0x36f347(0x376)[_0x36f347(0x543)](_0x4d7f03)),this['_storedMapText']=[],this[_0x36f347(0x196)]=$dataMap;for(const _0x54d35a of _0x3f5c99){VisuMZ[_0x36f347(0x7ac)]['loadMapData'](_0x54d35a);}setTimeout(VisuMZ['CoreEngine'][_0x36f347(0x1e5)]['bind'](this),_0x4d7f03);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x801)]=function(_0x879ccd){const _0x474841=_0x4535e7,_0x5ed513=_0x474841(0x2c8)[_0x474841(0x543)](_0x879ccd[_0x474841(0x4ee)](0x3)),_0x2c0782=new XMLHttpRequest(),_0x509dd2=_0x474841(0x5d0)+_0x5ed513;_0x2c0782['open'](_0x474841(0x8d6),_0x509dd2),_0x2c0782['overrideMimeType']('application/json'),_0x2c0782['onload']=()=>this[_0x474841(0x83c)](_0x2c0782,_0x879ccd,_0x5ed513,_0x509dd2),_0x2c0782[_0x474841(0x94b)]=()=>DataManager['onXhrError'](_0x474841(0x3bf),_0x5ed513,_0x509dd2),_0x2c0782['send']();},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x83c)]=function(_0xfa3df3,_0x5d1e43,_0x5be72d,_0x25050a){const _0x1f085b=_0x4535e7;$dataMap=JSON[_0x1f085b(0x7ed)](_0xfa3df3[_0x1f085b(0x2d4)]),DataManager[_0x1f085b(0x662)]($dataMap),this[_0x1f085b(0x8a5)][_0x5d1e43]=VisuMZ[_0x1f085b(0x7ac)]['ExtractStrFromMap'](_0x5d1e43),$dataMap=this[_0x1f085b(0x196)];},VisuMZ[_0x4535e7(0x7ac)]['exportAllMapStrings']=function(){const _0xf19112=_0x4535e7,_0x343acd=_0xf19112(0x2c3);this[_0xf19112(0x8a5)][_0xf19112(0x775)](undefined)[_0xf19112(0x775)]('')[_0xf19112(0x775)](null);const _0x3eabcb=this[_0xf19112(0x8a5)][_0xf19112(0x9b6)](_0xf19112(0x1d5))[_0xf19112(0x24d)]();VisuMZ['CoreEngine']['ExportString'](_0x3eabcb,_0x343acd,!![]),SceneManager[_0xf19112(0x42f)][_0xf19112(0x348)]=!![];},VisuMZ['CoreEngine'][_0x4535e7(0x85f)]=function(_0x1dd4b2){const _0x4bc55d=_0x4535e7;if(!$dataMap)return'';let _0x568069='█'[_0x4bc55d(0x777)](0x46)+'\x0a\x0a',_0x4933cf='═'[_0x4bc55d(0x777)](0x46)+'\x0a\x0a',_0x5df6ad='';this[_0x4bc55d(0x607)]=0x0;for(const _0x4b8d66 of $dataMap[_0x4bc55d(0x444)]){if(!_0x4b8d66)continue;let _0x26148c=_0x4b8d66['id'],_0x33d211=_0x4b8d66[_0x4bc55d(0x4e4)],_0x487989=_0x4b8d66[_0x4bc55d(0x497)];for(const _0x1137a3 of _0x487989){if(_0x4bc55d(0x8a7)!=='ZfxGh'){const _0xf219d2=_0x487989[_0x4bc55d(0x63e)](_0x1137a3)+0x1;let _0x30778a=_0x4933cf+'《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a',_0x3c1f5b=VisuMZ[_0x4bc55d(0x7ac)][_0x4bc55d(0x310)](_0x1137a3['list']);if(_0x3c1f5b['length']>0x0){if(_0x4bc55d(0x161)!=='lWXbV'){if(_0x5df6ad[_0x4bc55d(0x2ec)]>0x0)_0x5df6ad+=_0x4933cf+'\x0a\x0a\x0a\x0a\x0a';else{const _0x1ae4b3=$dataMapInfos[_0x1dd4b2][_0x4bc55d(0x4e4)];_0x5df6ad+=_0x568069+_0x4bc55d(0x63c)[_0x4bc55d(0x543)](_0x1dd4b2,_0x1ae4b3||_0x4bc55d(0x526))+_0x568069;}_0x5df6ad+=_0x30778a['format'](_0x26148c,_0x33d211,_0xf219d2,_0x3c1f5b);}else return _0x1bd483[_0x4bc55d(0x7ac)][_0x4bc55d(0x806)]['Color']['DamageColor'][_0x4bc55d(0x77f)](this,_0x3a24f4);}}else{if(!this['_animation'])return![];const _0x858fd=this[_0x4bc55d(0x62b)][_0x4bc55d(0x4e4)]||'';if(_0x858fd[_0x4bc55d(0x27c)](/<MIRROR OFFSET X>/i))return!![];if(_0x858fd[_0x4bc55d(0x27c)](/<NO MIRROR OFFSET X>/i))return![];return _0x405342[_0x4bc55d(0x7ac)][_0x4bc55d(0x806)][_0x4bc55d(0x405)][_0x4bc55d(0x7b9)];}}}return _0x5df6ad['length']>0x0&&(_0x5df6ad+=_0x4933cf),_0x5df6ad;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x980)]=function(){const _0x2d9e49=_0x4535e7,_0x2d0cdf=$dataTroops[_0x2d9e49(0x2ec)]*0xa+Math['randomInt'](0xa);alert(_0x2d9e49(0x44d)[_0x2d9e49(0x543)](_0x2d0cdf));const _0x11f637=[];for(const _0xc552a4 of $dataTroops){if(!_0xc552a4)continue;const _0x1972ce=_0xc552a4['id'];_0x11f637[_0x1972ce]=VisuMZ[_0x2d9e49(0x7ac)]['ExtractStrFromTroop'](_0x1972ce);}setTimeout(VisuMZ['CoreEngine'][_0x2d9e49(0x7e8)][_0x2d9e49(0x8f2)](this,_0x11f637),_0x2d0cdf);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x43c)]=function(_0x54dfed){const _0x30ef69=_0x4535e7;if(!$dataTroops[_0x54dfed])return'';let _0x29e78b='█'[_0x30ef69(0x777)](0x46)+'\x0a\x0a',_0x2aabca='═'[_0x30ef69(0x777)](0x46)+'\x0a\x0a',_0xa46491='';this['_commonEventLayers']=0x0;const _0x4d507f=$dataTroops[_0x54dfed];let _0x42e8a1=_0x4d507f[_0x30ef69(0x497)];for(const _0x26795a of _0x42e8a1){const _0x3e62c3=_0x42e8a1[_0x30ef69(0x63e)](_0x26795a)+0x1;let _0x336ccb=_0x2aabca+_0x30ef69(0x630),_0x38c47a=VisuMZ['CoreEngine'][_0x30ef69(0x310)](_0x26795a[_0x30ef69(0x9d6)]);_0x38c47a[_0x30ef69(0x2ec)]>0x0&&(_0xa46491[_0x30ef69(0x2ec)]>0x0?'pEshW'!=='pEshW'?_0x18c4c9='Item-%1-%2'['format'](_0x5a1be0,_0x5076ce):_0xa46491+=_0x2aabca+_0x30ef69(0x1d5):_0x30ef69(0x278)!==_0x30ef69(0x78e)?_0xa46491+=_0x29e78b+_0x30ef69(0x54d)['format'](_0x54dfed,_0x4d507f[_0x30ef69(0x4e4)]||_0x30ef69(0x526))+_0x29e78b:this[_0x30ef69(0x9c2)](0x0),_0xa46491+=_0x336ccb['format'](_0x3e62c3,_0x38c47a));}if(_0xa46491['length']>0x0){if(_0x30ef69(0x901)!==_0x30ef69(0x3fd))_0xa46491+=_0x2aabca;else return _0x1dae91[_0x30ef69(0x9c0)]();}return _0xa46491;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x7e8)]=function(_0xb32aa6){const _0x482042=_0x4535e7,_0x3197b8=_0x482042(0x3d3);_0xb32aa6[_0x482042(0x775)](undefined)[_0x482042(0x775)]('')['remove'](null);const _0x46c898=_0xb32aa6[_0x482042(0x9b6)](_0x482042(0x1d5))[_0x482042(0x24d)]();VisuMZ[_0x482042(0x7ac)][_0x482042(0x51e)](_0x46c898,_0x3197b8,!![]),SceneManager[_0x482042(0x42f)][_0x482042(0x348)]=!![];},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x310)]=function(_0x431de2){const _0xeae6c6=_0x4535e7;let _0x520313='\x0a'+'─'['repeat'](0x46)+'\x0a',_0x419f2f='\x0a'+'┄'[_0xeae6c6(0x777)](0x46)+'\x0a',_0x287f7a='';for(const _0x59bc7f of _0x431de2){if('zFkNp'!==_0xeae6c6(0xa35)){if(!_0x59bc7f)continue;if(_0x59bc7f[_0xeae6c6(0x340)]===0x65)_0xeae6c6(0x8a1)==='drLiH'?this[_0xeae6c6(0x5e4)][_0xeae6c6(0x71a)]=this[_0xeae6c6(0x5e4)]['target']:(_0x287f7a+=_0x520313+'\x0a',_0x287f7a+=_0xeae6c6(0x631),_0x59bc7f[_0xeae6c6(0x67d)][0x4]!==''&&_0x59bc7f[_0xeae6c6(0x67d)][0x4]!==undefined&&(_0x287f7a+=_0xeae6c6(0x92a)[_0xeae6c6(0x543)](_0x59bc7f['parameters'][0x4])));else{if(_0x59bc7f['code']===0x191)_0x287f7a+=_0xeae6c6(0x436)[_0xeae6c6(0x543)](_0x59bc7f['parameters'][0x0]);else{if(_0x59bc7f[_0xeae6c6(0x340)]===0x192)'gTsbI'!==_0xeae6c6(0x7bf)?(_0x287f7a+=_0x520313,_0x287f7a+=_0xeae6c6(0x7ef)[_0xeae6c6(0x543)](_0x419f2f,_0x59bc7f[_0xeae6c6(0x67d)][0x0]+0x1,_0x59bc7f[_0xeae6c6(0x67d)][0x1])):(this[_0xeae6c6(0x2e3)]=![],this['_hideButtons']=!_0x3e908c[_0xeae6c6(0x7ac)][_0xeae6c6(0x806)]['UI'][_0xeae6c6(0x74a)]);else{if(_0x59bc7f[_0xeae6c6(0x340)]===0x193)_0xeae6c6(0x676)!==_0xeae6c6(0x676)?this[_0xeae6c6(0x2c4)]=_0x44a69a:(_0x287f7a+=_0x520313,_0x287f7a+=_0xeae6c6(0x88e)[_0xeae6c6(0x543)](_0x419f2f));else{if(_0x59bc7f[_0xeae6c6(0x340)]===0x194)_0x287f7a+=_0x520313,_0x287f7a+='%1〘End\x20Choice\x20Selection〙%1'[_0xeae6c6(0x543)](_0x419f2f);else{if(_0x59bc7f[_0xeae6c6(0x340)]===0x69)_0xeae6c6(0x826)===_0xeae6c6(0x826)?(_0x287f7a+=_0x520313+'\x0a',_0x287f7a+=_0xeae6c6(0x5fe)):(_0x4edd8f['CoreEngine']['Game_System_initialize']['call'](this),this[_0xeae6c6(0xa28)]());else{if(_0x59bc7f[_0xeae6c6(0x340)]===0x6c)_0x287f7a+=_0x520313+'\x0a',_0x287f7a+=_0xeae6c6(0x729)['format'](_0x59bc7f[_0xeae6c6(0x67d)][0x0]);else{if(_0x59bc7f['code']===0x198)_0x287f7a+=_0xeae6c6(0x436)['format'](_0x59bc7f[_0xeae6c6(0x67d)][0x0]);else{if(_0x59bc7f['code']===0x75){const _0x39bbb3=$dataCommonEvents[_0x59bc7f[_0xeae6c6(0x67d)][0x0]];if(_0x39bbb3&&this[_0xeae6c6(0x607)]<=0xa){this[_0xeae6c6(0x607)]++;let _0x2b4ed0=VisuMZ['CoreEngine']['ExtractStrFromList'](_0x39bbb3['list']);if(_0x2b4ed0[_0xeae6c6(0x2ec)]>0x0){if('PCCvA'===_0xeae6c6(0x989))return _0xeae6c6(0x9f1);else _0x287f7a+=_0x520313,_0x287f7a+=_0x419f2f,_0x287f7a+=_0xeae6c6(0x9e0)[_0xeae6c6(0x543)](_0x39bbb3['id'],_0x39bbb3[_0xeae6c6(0x4e4)]),_0x287f7a+=_0x419f2f,_0x287f7a+=_0x2b4ed0,_0x287f7a+=_0x419f2f,_0x287f7a+=_0xeae6c6(0x617)[_0xeae6c6(0x543)](_0x39bbb3['id'],_0x39bbb3[_0xeae6c6(0x4e4)]),_0x287f7a+=_0x419f2f;}this['_commonEventLayers']--;}}}}}}}}}}}else _0x5c7609[_0xeae6c6(0x255)]=_0x2a86af[_0xeae6c6(0x4b9)][_0xeae6c6(0x401)];}return _0x287f7a[_0xeae6c6(0x2ec)]>0x0&&(_0x287f7a+=_0x520313),_0x287f7a;},PluginManager['registerCommand'](pluginData[_0x4535e7(0x4e4)],'OpenURL',_0x523865=>{const _0x6ad77c=_0x4535e7;VisuMZ[_0x6ad77c(0x395)](_0x523865,_0x523865);const _0x1b59c3=_0x523865['URL'];VisuMZ[_0x6ad77c(0x490)](_0x1b59c3);}),PluginManager[_0x4535e7(0x2bc)](pluginData['name'],'GoldChange',_0x39bce6=>{const _0x59a260=_0x4535e7;VisuMZ[_0x59a260(0x395)](_0x39bce6,_0x39bce6);const _0x27cd5a=_0x39bce6[_0x59a260(0x856)]||0x0;$gameParty[_0x59a260(0x747)](_0x27cd5a);}),PluginManager[_0x4535e7(0x2bc)](pluginData['name'],_0x4535e7(0x451),_0x5e0b1b=>{const _0x30db54=_0x4535e7;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x30db54(0x395)](_0x5e0b1b,_0x5e0b1b);const _0x33fc0d=_0x5e0b1b[_0x30db54(0x889)];SceneManager['_scene'][_0x30db54(0x1b9)](_0x33fc0d);}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],_0x4535e7(0x1c9),_0x5b0940=>{const _0x442ad2=_0x4535e7;if(!$gameTemp[_0x442ad2(0x18e)]())return;if(!Utils[_0x442ad2(0x3e2)]())return;VisuMZ[_0x442ad2(0x395)](_0x5b0940,_0x5b0940);const _0xbbba62=_0x5b0940[_0x442ad2(0x1a4)]||0x1;$gameTemp[_0x442ad2(0x5c7)]=_0xbbba62;}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],_0x4535e7(0x78b),_0x2a0ef8=>{const _0xc554aa=_0x4535e7;VisuMZ[_0xc554aa(0x395)](_0x2a0ef8,_0x2a0ef8);const _0x542b3a=_0x2a0ef8['pictureId']||0x1,_0x14448b=_0x2a0ef8['easingType']||_0xc554aa(0x6b8),_0x1d0b4a=$gameScreen[_0xc554aa(0x8ee)](_0x542b3a);_0x1d0b4a&&_0x1d0b4a[_0xc554aa(0x481)](_0x14448b);}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],'PictureEraseAll',_0xffd01b=>{const _0x1a867b=_0x4535e7;for(let _0x4a6ab8=0x1;_0x4a6ab8<=0x64;_0x4a6ab8++){$gameScreen[_0x1a867b(0x47d)](_0x4a6ab8);}}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],_0x4535e7(0x244),_0x3d43d3=>{const _0x140db8=_0x4535e7;VisuMZ[_0x140db8(0x395)](_0x3d43d3,_0x3d43d3);const _0xf8d889=Math[_0x140db8(0x16c)](_0x3d43d3[_0x140db8(0x65b)],_0x3d43d3[_0x140db8(0x80b)]),_0x671fe0=Math[_0x140db8(0x548)](_0x3d43d3[_0x140db8(0x65b)],_0x3d43d3[_0x140db8(0x80b)]);for(let _0x3245b1=_0xf8d889;_0x3245b1<=_0x671fe0;_0x3245b1++){$gameScreen[_0x140db8(0x47d)](_0x3245b1);}}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],_0x4535e7(0x285),_0x365ee7=>{const _0x454cf6=_0x4535e7;VisuMZ[_0x454cf6(0x395)](_0x365ee7,_0x365ee7);const _0x5d98b6=Math['round'](_0x365ee7['PictureID'])[_0x454cf6(0x15b)](0x1,0x64),_0x383d86=-Number(_0x365ee7[_0x454cf6(0x3cc)]||0x0),_0x4be2cd=Math['max'](_0x365ee7['Duration']||0x0,0x0),_0x41a791=_0x365ee7[_0x454cf6(0x83d)]||_0x454cf6(0x6b8),_0x16459f=_0x365ee7[_0x454cf6(0x51a)],_0x5045da=$gameScreen[_0x454cf6(0x8ee)](_0x5d98b6);if(!_0x5045da)return;_0x5045da[_0x454cf6(0x276)](_0x383d86,_0x4be2cd,_0x41a791);if(_0x16459f){if('UbzjK'==='UbzjK'){const _0x521c33=$gameTemp[_0x454cf6(0x2a0)]();if(_0x521c33)_0x521c33[_0x454cf6(0x5a1)](_0x4be2cd);}else return this[_0x454cf6(0x1f7)](_0x548dce,_0x37e0aa);}}),PluginManager[_0x4535e7(0x2bc)](pluginData['name'],'PictureRotate',_0x3f5c15=>{const _0xc97c81=_0x4535e7;VisuMZ['ConvertParams'](_0x3f5c15,_0x3f5c15);const _0x2515c2=Math[_0xc97c81(0x98a)](_0x3f5c15[_0xc97c81(0x1a4)])[_0xc97c81(0x15b)](0x1,0x64),_0x2f7d0b=-Number(_0x3f5c15[_0xc97c81(0x2e2)]||0x0),_0xda24ce=Math[_0xc97c81(0x548)](_0x3f5c15['Duration']||0x0,0x0),_0x3c6a26=_0x3f5c15['easingType']||_0xc97c81(0x6b8),_0x5ba401=_0x3f5c15['Wait'],_0x45135e=$gameScreen['picture'](_0x2515c2);if(!_0x45135e)return;_0x45135e[_0xc97c81(0x174)](_0x2f7d0b,_0xda24ce,_0x3c6a26);if(_0x5ba401){if(_0xc97c81(0x6fc)!==_0xc97c81(0x6b0)){const _0xfb37e9=$gameTemp[_0xc97c81(0x2a0)]();if(_0xfb37e9)_0xfb37e9['wait'](_0xda24ce);}else{const _0x2fd440=_0x7baba0[_0xc97c81(0x7ac)][_0xc97c81(0x806)][_0xc97c81(0x6ce)][_0x165995],_0x192cda=_0xc97c81(0x15e)['format'](_0x1b60eb);for(const _0x425b46 of _0x2fd440){_0x3defc1[_0xc97c81(0x36d)](_0x192cda,_0x425b46);}}}}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],_0x4535e7(0x219),_0x3aa2eb=>{const _0x2debc4=_0x4535e7;VisuMZ[_0x2debc4(0x395)](_0x3aa2eb,_0x3aa2eb);const _0x4a15b7=Math[_0x2debc4(0x98a)](_0x3aa2eb[_0x2debc4(0x1a4)])[_0x2debc4(0x15b)](0x1,0x64),_0x1375d8=_0x3aa2eb[_0x2debc4(0x806)],_0xe4cec8=_0x1375d8[_0x2debc4(0x886)][_0x2debc4(0x15b)](0x0,0x1),_0x97b6b6=Math[_0x2debc4(0x98a)](_0x1375d8[_0x2debc4(0x81d)]||0x0),_0x14e0db=Math[_0x2debc4(0x98a)](_0x1375d8[_0x2debc4(0x895)]||0x0),_0x308363=Math['round'](_0x1375d8[_0x2debc4(0x1c3)]||0x0),_0x5d705c=Math[_0x2debc4(0x98a)](_0x1375d8['ScaleY']||0x0),_0x1a0bc0=Math[_0x2debc4(0x98a)](_0x1375d8[_0x2debc4(0x33d)])[_0x2debc4(0x15b)](0x0,0xff),_0x54496a=_0x1375d8['BlendMode'],_0x34e64b=_0x2debc4(0x7da),_0x268559=_0x3aa2eb['Smooth']?'Smooth':'Pixelated',_0x1af8a1=_0x34e64b[_0x2debc4(0x543)](_0x3aa2eb[_0x2debc4(0x434)],_0x268559);$gameScreen[_0x2debc4(0x683)](_0x4a15b7,_0x1af8a1,_0xe4cec8,_0x97b6b6,_0x14e0db,_0x308363,_0x5d705c,_0x1a0bc0,_0x54496a);}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],_0x4535e7(0x51c),_0x4cdb5e=>{const _0xa74d56=_0x4535e7;VisuMZ[_0xa74d56(0x395)](_0x4cdb5e,_0x4cdb5e);const _0x49a734=_0x4cdb5e[_0xa74d56(0x98e)]||'random',_0x4c8968=_0x4cdb5e[_0xa74d56(0x334)]['clamp'](0x1,0x9),_0x17c899=_0x4cdb5e[_0xa74d56(0xa1a)][_0xa74d56(0x15b)](0x1,0x9),_0x53007f=_0x4cdb5e[_0xa74d56(0xa09)]||0x1,_0x3512e8=_0x4cdb5e[_0xa74d56(0x51a)];$gameScreen[_0xa74d56(0x4c0)](_0x49a734),$gameScreen[_0xa74d56(0x84c)](_0x4c8968,_0x17c899,_0x53007f);if(_0x3512e8){const _0x143b62=$gameTemp['getLastPluginCommandInterpreter']();if(_0x143b62)_0x143b62[_0xa74d56(0x5a1)](_0x53007f);}}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],'SwitchRandomizeOne',_0x260449=>{const _0x2cfc77=_0x4535e7;if($gameParty['inBattle']())return;VisuMZ[_0x2cfc77(0x395)](_0x260449,_0x260449);const _0x1ebc13=_0x260449[_0x2cfc77(0x1bc)],_0x5ef98f=(_0x260449[_0x2cfc77(0x404)]||0x0)/0x64;for(const _0x38dd8b of _0x1ebc13){if(_0x2cfc77(0x277)===_0x2cfc77(0x7ec))return this[_0x2cfc77(0x380)][_0x2cfc77(0x49b)]('/')[_0x2cfc77(0x43e)]();else{const _0x26de16=Math[_0x2cfc77(0xa10)]()<=_0x5ef98f;$gameSwitches['setValue'](_0x38dd8b,_0x26de16);}}}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],_0x4535e7(0x33a),_0xc3c6f9=>{const _0x50abd5=_0x4535e7;if($gameParty[_0x50abd5(0x79c)]())return;VisuMZ[_0x50abd5(0x395)](_0xc3c6f9,_0xc3c6f9);const _0x5e9171=Math[_0x50abd5(0x16c)](_0xc3c6f9[_0x50abd5(0x65b)],_0xc3c6f9[_0x50abd5(0x80b)]),_0x312123=Math['max'](_0xc3c6f9[_0x50abd5(0x65b)],_0xc3c6f9['EndingID']),_0xf8efe1=(_0xc3c6f9['Chance']||0x0)/0x64;for(let _0x332710=_0x5e9171;_0x332710<=_0x312123;_0x332710++){const _0x4f1a42=Math['random']()<=_0xf8efe1;$gameSwitches[_0x50abd5(0x601)](_0x332710,_0x4f1a42);}}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],'SwitchToggleOne',_0x1fe084=>{const _0x10240f=_0x4535e7;if($gameParty[_0x10240f(0x79c)]())return;VisuMZ['ConvertParams'](_0x1fe084,_0x1fe084);const _0x4141fe=_0x1fe084[_0x10240f(0x1bc)];for(const _0x4d3d59 of _0x4141fe){if(_0x10240f(0x84e)!==_0x10240f(0x687)){const _0x1b1f04=$gameSwitches['value'](_0x4d3d59);$gameSwitches[_0x10240f(0x601)](_0x4d3d59,!_0x1b1f04);}else return _0x5ad7bc[_0x10240f(0x7c9)]['CommandRect'][_0x10240f(0x77f)](this);}}),PluginManager['registerCommand'](pluginData['name'],'SwitchToggleRange',_0x298872=>{const _0xba9bdf=_0x4535e7;if($gameParty['inBattle']())return;VisuMZ[_0xba9bdf(0x395)](_0x298872,_0x298872);const _0x1e0ef0=Math[_0xba9bdf(0x16c)](_0x298872[_0xba9bdf(0x65b)],_0x298872[_0xba9bdf(0x80b)]),_0x1f98b3=Math[_0xba9bdf(0x548)](_0x298872[_0xba9bdf(0x65b)],_0x298872['EndingID']);for(let _0x3ba4cb=_0x1e0ef0;_0x3ba4cb<=_0x1f98b3;_0x3ba4cb++){if(_0xba9bdf(0x53d)===_0xba9bdf(0x53d)){const _0x36dd35=$gameSwitches[_0xba9bdf(0x856)](_0x3ba4cb);$gameSwitches[_0xba9bdf(0x601)](_0x3ba4cb,!_0x36dd35);}else return 0x0;}}),PluginManager[_0x4535e7(0x2bc)](pluginData['name'],_0x4535e7(0x49a),_0x3af66d=>{const _0x37e8d0=_0x4535e7;VisuMZ['ConvertParams'](_0x3af66d,_0x3af66d);const _0x36b45e=_0x3af66d[_0x37e8d0(0x2c0)]||0x1;$gameSystem[_0x37e8d0(0x66e)](_0x36b45e);}),PluginManager['registerCommand'](pluginData['name'],'SystemSetSideView',_0x444d1d=>{const _0x464c36=_0x4535e7;if($gameParty['inBattle']())return;VisuMZ[_0x464c36(0x395)](_0x444d1d,_0x444d1d);const _0x37ecf4=_0x444d1d[_0x464c36(0x2c0)];if(_0x37ecf4[_0x464c36(0x27c)](/Front/i))'bWEXk'!==_0x464c36(0x493)?$gameSystem[_0x464c36(0x5be)](![]):this[_0x464c36(0x2a5)]['setBackgroundType'](_0x367b1b['layoutSettings']['ItemBgType']);else{if(_0x37ecf4[_0x464c36(0x27c)](/Side/i)){if(_0x464c36(0x67c)!==_0x464c36(0x905))$gameSystem[_0x464c36(0x5be)](!![]);else{var _0x40ef59=_0x18e8ff(_0x4127a1['$1']);try{_0x4ae101*=_0x152590(_0x40ef59);}catch(_0x2a432e){if(_0x1d1cbc[_0x464c36(0x18e)]())_0x2b33a4['log'](_0x2a432e);}}}else $gameSystem[_0x464c36(0x5be)](!$gameSystem[_0x464c36(0x877)]());}}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],_0x4535e7(0x7e1),_0x4dd251=>{const _0x598fdd=_0x4535e7;if($gameParty[_0x598fdd(0x79c)]())return;VisuMZ['ConvertParams'](_0x4dd251,_0x4dd251);const _0x239d77=[_0x598fdd(0x5dc),_0x598fdd(0x28e),'me','se'];for(const _0x3290b8 of _0x239d77){const _0x5d4c08=_0x4dd251[_0x3290b8],_0x208b7c=_0x598fdd(0x1d4)[_0x598fdd(0x543)](_0x3290b8);for(const _0xa4bfe2 of _0x5d4c08){if(_0x598fdd(0x2ca)===_0x598fdd(0x2ca))AudioManager[_0x598fdd(0x943)](_0x208b7c,_0xa4bfe2);else return this[_0x598fdd(0x3cd)]&&this[_0x598fdd(0x3cd)][_0x598fdd(0x315)];}}}),PluginManager['registerCommand'](pluginData[_0x4535e7(0x4e4)],_0x4535e7(0x671),_0x125325=>{const _0x21bc9c=_0x4535e7;if($gameParty['inBattle']())return;VisuMZ[_0x21bc9c(0x395)](_0x125325,_0x125325);const _0x24e11d=[_0x21bc9c(0x1c1),_0x21bc9c(0x411),_0x21bc9c(0x207),_0x21bc9c(0x797),'enemies',_0x21bc9c(0x46a),_0x21bc9c(0x18d),'pictures','sv_actors','sv_enemies',_0x21bc9c(0x73e),_0x21bc9c(0x195),_0x21bc9c(0x5f5),'titles2'];for(const _0x3e8159 of _0x24e11d){const _0x210d83=_0x125325[_0x3e8159],_0x2fe53e=_0x21bc9c(0x15e)[_0x21bc9c(0x543)](_0x3e8159);for(const _0x2d9659 of _0x210d83){ImageManager[_0x21bc9c(0x36d)](_0x2fe53e,_0x2d9659);}}}),PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],'SystemSetBattleSystem',_0x3c18aa=>{const _0x151280=_0x4535e7;if($gameParty[_0x151280(0x79c)]())return;VisuMZ['ConvertParams'](_0x3c18aa,_0x3c18aa);const _0x476f6a=_0x3c18aa[_0x151280(0x2c0)]['toUpperCase']()[_0x151280(0x24d)](),_0x4582d9=VisuMZ['CoreEngine'][_0x151280(0xa02)](_0x476f6a);$gameSystem[_0x151280(0x93b)](_0x4582d9);}),VisuMZ['CoreEngine'][_0x4535e7(0xa02)]=function(_0x37aef1){const _0x4d472c=_0x4535e7;_0x37aef1=_0x37aef1||_0x4d472c(0x9a2),_0x37aef1=String(_0x37aef1)[_0x4d472c(0x874)]()['trim']();switch(_0x37aef1){case'DTB':return 0x0;case _0x4d472c(0x5d7):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x4d472c(0x485)]=!![]);return 0x1;case _0x4d472c(0x35c):Imported[_0x4d472c(0x265)]&&(ConfigManager['atbActive']=![]);return 0x2;case _0x4d472c(0x1c5):if(Imported[_0x4d472c(0x717)])return'CTB';break;case'STB':if(Imported[_0x4d472c(0x584)]){if(_0x4d472c(0x2fb)==='sQpBq'){const _0x8ad955=_0x42ed82[_0x4d472c(0x2a0)]();if(_0x8ad955)_0x8ad955[_0x4d472c(0x5a1)](_0x43f748);}else return'STB';}break;case'BTB':if(Imported[_0x4d472c(0x678)])return _0x4d472c(0x40e);break;case _0x4d472c(0x5f9):if(Imported[_0x4d472c(0x227)])return _0x4d472c(0x5f9);break;case _0x4d472c(0x426):if(Imported[_0x4d472c(0x7b4)])return'OTB';break;case _0x4d472c(0x9f1):if(Imported['VisuMZ_2_BattleSystemETB']){if(_0x4d472c(0x391)==='ezTTT'){const _0x448e3a=_0x4ccad5?this[_0x4d472c(0x5e2)]:this['_scrollBarVert'];if(!_0x448e3a)return;const _0x79ddef=_0x1de742[_0x4d472c(0x749)],_0x4de319=_0x79ddef[_0x4d472c(0x9ef)],_0x21652b=_0x1fb548?this['innerWidth']-_0x4de319*0x2:_0x4de319,_0x14415f=_0x558eca?_0x4de319:this[_0x4d472c(0x288)]-_0x4de319*0x2;_0x448e3a[_0x4d472c(0x7c5)]=new _0x22b62b(_0x21652b,_0x14415f),_0x448e3a[_0x4d472c(0x95a)](0x0,0x0,_0x21652b,_0x14415f),this['updateScrollBarPosition'](_0x1ca73c);}else return _0x4d472c(0x9f1);}break;case _0x4d472c(0x6a9):if(Imported['VisuMZ_2_BattleSystemPTB']){if(_0x4d472c(0x59f)!==_0x4d472c(0x59f)){const _0x1aa919=_0x4d472c(0x266);this[_0x4d472c(0x94f)]=this[_0x4d472c(0x94f)]||{};if(this[_0x4d472c(0x94f)][_0x1aa919])return this['_colorCache'][_0x1aa919];const _0xaa50f2=_0x1745b1[_0x4d472c(0x7ac)][_0x4d472c(0x806)][_0x4d472c(0x4ba)][_0x4d472c(0x21f)];return this[_0x4d472c(0x3ed)](_0x1aa919,_0xaa50f2);}else return _0x4d472c(0x6a9);}break;}return $dataSystem['battleSystem'];},PluginManager[_0x4535e7(0x2bc)](pluginData[_0x4535e7(0x4e4)],'SystemSetWindowPadding',_0x6e99d9=>{const _0x34c4e5=_0x4535e7;VisuMZ['ConvertParams'](_0x6e99d9,_0x6e99d9);const _0x35a764=_0x6e99d9[_0x34c4e5(0x2c0)]||0x1;$gameSystem['setWindowPadding'](_0x35a764);}),PluginManager['registerCommand'](pluginData[_0x4535e7(0x4e4)],'VariableEvalReference',_0x4f1c2f=>{const _0x2623bc=_0x4535e7;VisuMZ[_0x2623bc(0x395)](_0x4f1c2f,_0x4f1c2f);const _0x494c1b=_0x4f1c2f['id']||0x1,_0x42bbea=_0x4f1c2f['operation'],_0xcde35f=_0x4f1c2f['operand']||0x0;let _0x195432=$gameVariables[_0x2623bc(0x856)](_0x494c1b)||0x0;switch(_0x42bbea){case'=':_0x195432=_0xcde35f;break;case'+':_0x195432+=_0xcde35f;break;case'-':_0x195432-=_0xcde35f;break;case'*':_0x195432*=_0xcde35f;break;case'/':_0x195432/=_0xcde35f;break;case'%':_0x195432%=_0xcde35f;break;}_0x195432=_0x195432||0x0,$gameVariables[_0x2623bc(0x601)](_0x494c1b,_0x195432);}),PluginManager['registerCommand'](pluginData['name'],_0x4535e7(0x741),_0x26f0e2=>{const _0xbcb9ee=_0x4535e7;VisuMZ[_0xbcb9ee(0x395)](_0x26f0e2,_0x26f0e2);const _0x2576d9=_0x26f0e2['id']()||0x1,_0x3b3b13=_0x26f0e2[_0xbcb9ee(0x92b)],_0x3b937a=_0x26f0e2[_0xbcb9ee(0x1cf)]()||0x0;let _0x59fe90=$gameVariables[_0xbcb9ee(0x856)](_0x2576d9)||0x0;switch(_0x3b3b13){case'=':_0x59fe90=_0x3b937a;break;case'+':_0x59fe90+=_0x3b937a;break;case'-':_0x59fe90-=_0x3b937a;break;case'*':_0x59fe90*=_0x3b937a;break;case'/':_0x59fe90/=_0x3b937a;break;case'%':_0x59fe90%=_0x3b937a;break;}_0x59fe90=_0x59fe90||0x0,$gameVariables[_0xbcb9ee(0x601)](_0x2576d9,_0x59fe90);}),VisuMZ['CoreEngine'][_0x4535e7(0x4fe)]=Scene_Boot[_0x4535e7(0x781)][_0x4535e7(0x487)],Scene_Boot[_0x4535e7(0x781)][_0x4535e7(0x487)]=function(){const _0x571e0e=_0x4535e7;VisuMZ[_0x571e0e(0x7ac)][_0x571e0e(0x4fe)][_0x571e0e(0x77f)](this),this[_0x571e0e(0x83a)](),this[_0x571e0e(0x80d)](),this['process_VisuMZ_CoreEngine_Settings'](),this['process_VisuMZ_CoreEngine_Functions'](),this['process_VisuMZ_CoreEngine_CustomParameters'](),this[_0x571e0e(0x2c9)](),VisuMZ[_0x571e0e(0x258)]();},VisuMZ[_0x4535e7(0x7ac)]['RegExp']={},Scene_Boot[_0x4535e7(0x781)][_0x4535e7(0x83a)]=function(){const _0x2bdf55=_0x4535e7,_0x162d76=[_0x2bdf55(0x627),_0x2bdf55(0x8e5),_0x2bdf55(0x57d),_0x2bdf55(0x6bd),_0x2bdf55(0x972),_0x2bdf55(0x3c6),_0x2bdf55(0x844),_0x2bdf55(0x339)],_0x5248db=[_0x2bdf55(0x42e),_0x2bdf55(0x7dc),_0x2bdf55(0x914),_0x2bdf55(0x155),_0x2bdf55(0x41d),_0x2bdf55(0x7bc),_0x2bdf55(0x7cc),_0x2bdf55(0x77d),_0x2bdf55(0x87a),_0x2bdf55(0x585)],_0x11dd62=[_0x2bdf55(0x298),_0x2bdf55(0x4d6),_0x2bdf55(0x20e),_0x2bdf55(0x2e8),_0x2bdf55(0x5ec),_0x2bdf55(0x26c),_0x2bdf55(0x5a4),_0x2bdf55(0x1e0),_0x2bdf55(0x4bd),_0x2bdf55(0x25f)],_0x3ebfab=[_0x162d76,_0x5248db,_0x11dd62],_0x124c45=[_0x2bdf55(0x557),_0x2bdf55(0x544),_0x2bdf55(0x201),_0x2bdf55(0x9df),_0x2bdf55(0x72a),_0x2bdf55(0x1dc),'Rate2',_0x2bdf55(0x713),_0x2bdf55(0x496),'Flat2'];for(const _0x5bac5f of _0x3ebfab){let _0x3064dd='';if(_0x5bac5f===_0x162d76)_0x3064dd=_0x2bdf55(0x97d);if(_0x5bac5f===_0x5248db)_0x3064dd='xparam';if(_0x5bac5f===_0x11dd62)_0x3064dd=_0x2bdf55(0x76b);for(const _0x419dc6 of _0x124c45){if(_0x2bdf55(0x3c1)===_0x2bdf55(0x71b))_0x24555c[_0x2bdf55(0x7ac)][_0x2bdf55(0x6e1)][_0x2bdf55(0x77f)](this),this[_0x2bdf55(0x67a)](),this[_0x2bdf55(0x27d)](),this[_0x2bdf55(0x6f1)](),this[_0x2bdf55(0x7e2)]();else{let _0x374b12=_0x2bdf55(0x424)[_0x2bdf55(0x543)](_0x3064dd,_0x419dc6);VisuMZ[_0x2bdf55(0x7ac)][_0x2bdf55(0x312)][_0x374b12]=[],VisuMZ[_0x2bdf55(0x7ac)][_0x2bdf55(0x312)][_0x374b12+'JS']=[];let _0x2c5672=_0x2bdf55(0x767);if(['Plus',_0x2bdf55(0x713)][_0x2bdf55(0x454)](_0x419dc6)){if('MNibr'===_0x2bdf55(0x9f3))_0x2c5672+=_0x2bdf55(0x17a);else return _0x1d5bc2[_0x2bdf55(0x7c9)][_0x2bdf55(0x3e9)][_0x2bdf55(0x77f)](this);}else{if(['Plus1','Flat1']['includes'](_0x419dc6))_0x2c5672+=_0x2bdf55(0x5ea);else{if([_0x2bdf55(0x201),'Flat2'][_0x2bdf55(0x454)](_0x419dc6))_0x2c5672+=_0x2bdf55(0x67e);else{if(_0x419dc6===_0x2bdf55(0x9df))_0x2c5672+=_0x2bdf55(0x228);else{if(_0x419dc6===_0x2bdf55(0x1dc)){if('wbgJV'!==_0x2bdf55(0x64c))_0x2c5672+=_0x2bdf55(0x956);else{const _0x184540=_0x219a94[_0x2bdf55(0x2a0)]();if(_0x184540)_0x184540[_0x2bdf55(0x5a1)](_0x5808eb);}}else _0x419dc6==='Rate2'&&(_0x2c5672+=_0x2bdf55(0x842));}}}}for(const _0x56b641 of _0x5bac5f){if('jsNdg'===_0x2bdf55(0x656))return _0x23154d[_0x2bdf55(0x7ac)][_0x2bdf55(0x806)]['QoL'][_0x2bdf55(0x4db)];else{let _0x1779b2=_0x419dc6[_0x2bdf55(0x664)](/[\d+]/g,'')[_0x2bdf55(0x874)]();const _0x5b7f14=_0x2c5672['format'](_0x56b641,_0x1779b2);VisuMZ[_0x2bdf55(0x7ac)][_0x2bdf55(0x312)][_0x374b12][_0x2bdf55(0x85c)](new RegExp(_0x5b7f14,'i'));const _0x394ac2=_0x2bdf55(0x1ab)[_0x2bdf55(0x543)](_0x56b641,_0x1779b2);VisuMZ[_0x2bdf55(0x7ac)][_0x2bdf55(0x312)][_0x374b12+'JS'][_0x2bdf55(0x85c)](new RegExp(_0x394ac2,'i'));}}}}}},Scene_Boot['prototype'][_0x4535e7(0x80d)]=function(){if(VisuMZ['ParseAllNotetags'])return;},Scene_Boot[_0x4535e7(0x781)][_0x4535e7(0x4b5)]=function(){const _0x402258=_0x4535e7,_0x27a3f1=VisuMZ[_0x402258(0x7ac)][_0x402258(0x806)];_0x27a3f1[_0x402258(0x405)][_0x402258(0x2fc)]&&VisuMZ[_0x402258(0x77a)](!![]);_0x27a3f1[_0x402258(0x405)]['ModernControls']&&(_0x402258(0x661)!=='HopoK'?(this[_0x402258(0x2f9)]()['centerY']=!![],this[_0x402258(0x2f9)]()[_0x402258(0x359)]=_0x21c7dd[_0x402258(0x8fd)]):(Input['keyMapper'][0x23]=_0x402258(0x753),Input[_0x402258(0x200)][0x24]='home'));if(_0x27a3f1[_0x402258(0x40d)]){const _0x4e246f=_0x27a3f1[_0x402258(0x40d)];_0x4e246f[_0x402258(0x284)]=_0x4e246f[_0x402258(0x284)]||_0x402258(0x3a5),_0x4e246f['KeyTAB']=_0x4e246f[_0x402258(0x31b)]||_0x402258(0x915);}if(_0x27a3f1[_0x402258(0x593)][_0x402258(0x4af)]){if(_0x402258(0x90c)===_0x402258(0x90c))Input['keyMapper'][0x57]='up',Input[_0x402258(0x200)][0x41]=_0x402258(0x974),Input[_0x402258(0x200)][0x53]=_0x402258(0x181),Input['keyMapper'][0x44]=_0x402258(0x7ae),Input[_0x402258(0x200)][0x45]=_0x402258(0x377);else{const _0x23e7c7=_0x17c051[_0x402258(0x720)](_0x155b27,_0x5dbf8e)[_0x402258(0x184)](_0x1bdd59=>_0x1bdd59[_0x402258(0x62d)]());return _0x23e7c7[_0x402258(0x2ec)]>0x0;}}_0x27a3f1[_0x402258(0x593)][_0x402258(0x6e0)]&&(Input['keyMapper'][0x52]=_0x402258(0x792)),_0x27a3f1['Param']['DisplayedParams']=_0x27a3f1[_0x402258(0x432)][_0x402258(0x908)][_0x402258(0x8d0)](_0x451306=>_0x451306['toUpperCase']()[_0x402258(0x24d)]()),_0x27a3f1[_0x402258(0x432)][_0x402258(0x3fb)]=_0x27a3f1[_0x402258(0x432)]['ExtDisplayedParams'][_0x402258(0x8d0)](_0x3e2e0e=>_0x3e2e0e[_0x402258(0x874)]()[_0x402258(0x24d)]());},Scene_Boot[_0x4535e7(0x781)][_0x4535e7(0x8dc)]=function(){const _0x276578=_0x4535e7;this[_0x276578(0x225)]();},Scene_Boot[_0x4535e7(0x781)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x42cf24=_0x4535e7,_0xe08df=VisuMZ[_0x42cf24(0x7ac)][_0x42cf24(0x806)]['jsQuickFunc'];for(const _0x1a929a of _0xe08df){if(_0x42cf24(0x2d0)==='OZtYE'){const _0x3c5579=_0x1a929a[_0x42cf24(0x289)][_0x42cf24(0x664)](/[ ]/g,''),_0x3a7340=_0x1a929a[_0x42cf24(0x5d3)];VisuMZ[_0x42cf24(0x7ac)][_0x42cf24(0x34f)](_0x3c5579,_0x3a7340);}else _0x294087['CoreEngine']['Scene_Map_updateMain'][_0x42cf24(0x77f)](this),this[_0x42cf24(0x84d)]();}},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x34f)]=function(_0x24d98f,_0x142e25){const _0x40040c=_0x4535e7;if(!!window[_0x24d98f]){if(_0x40040c(0x2aa)!==_0x40040c(0x3ef)){if($gameTemp[_0x40040c(0x18e)]())console[_0x40040c(0x8d1)]('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'[_0x40040c(0x543)](_0x24d98f));}else _0x208b0c[_0x40040c(0x3e0)]=0x0,_0xab99ee[_0x40040c(0x3c4)]=0x0,_0x25839a[_0x40040c(0x8da)]=0x0,_0x466d73[_0x40040c(0x817)]=0x0;}const _0xa2b99e=_0x40040c(0x65d)[_0x40040c(0x543)](_0x24d98f,_0x142e25);window[_0x24d98f]=new Function(_0xa2b99e);},Scene_Boot['prototype'][_0x4535e7(0x29d)]=function(){const _0x3a175e=_0x4535e7,_0x3d965a=VisuMZ[_0x3a175e(0x7ac)][_0x3a175e(0x806)][_0x3a175e(0x723)];if(!_0x3d965a)return;for(const _0x5e4380 of _0x3d965a){if(!_0x5e4380)continue;VisuMZ[_0x3a175e(0x7ac)][_0x3a175e(0x248)](_0x5e4380);}},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x8fc)]={},VisuMZ[_0x4535e7(0x7ac)]['CustomParamIcons']={},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x947)]={},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x51b)]={},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x248)]=function(_0x3eaebd){const _0x42f864=_0x4535e7,_0x2f33c2=_0x3eaebd['Abbreviation'],_0x412570=_0x3eaebd['ParamName'],_0x367940=_0x3eaebd[_0x42f864(0x7d2)],_0x203fe2=_0x3eaebd[_0x42f864(0x98e)],_0x31d4cb=new Function(_0x3eaebd[_0x42f864(0x68c)]);VisuMZ[_0x42f864(0x7ac)][_0x42f864(0x8fc)][_0x2f33c2[_0x42f864(0x874)]()['trim']()]=_0x412570,VisuMZ[_0x42f864(0x7ac)][_0x42f864(0x746)][_0x2f33c2['toUpperCase']()[_0x42f864(0x24d)]()]=_0x367940,VisuMZ[_0x42f864(0x7ac)]['CustomParamType'][_0x2f33c2['toUpperCase']()[_0x42f864(0x24d)]()]=_0x203fe2,VisuMZ['CoreEngine'][_0x42f864(0x51b)][_0x2f33c2[_0x42f864(0x874)]()[_0x42f864(0x24d)]()]=_0x2f33c2,Object[_0x42f864(0x9ae)](Game_BattlerBase[_0x42f864(0x781)],_0x2f33c2,{'get'(){const _0x1894ee=_0x42f864,_0x59ad4e=_0x31d4cb['call'](this);return _0x203fe2===_0x1894ee(0x578)?Math[_0x1894ee(0x98a)](_0x59ad4e):_0x59ad4e;}});},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x46e)]={},VisuMZ['CoreEngine'][_0x4535e7(0x7e0)]={},Scene_Boot[_0x4535e7(0x781)][_0x4535e7(0x2c9)]=function(){const _0xd87cdd=_0x4535e7,_0xf000ce=VisuMZ[_0xd87cdd(0x7ac)][_0xd87cdd(0x806)][_0xd87cdd(0x46e)];for(const _0x1cc113 of _0xf000ce){if('ztrNF'===_0xd87cdd(0x6d3)){const _0x144367=(_0x1cc113[_0xd87cdd(0x958)]||'')[_0xd87cdd(0x67f)]()[_0xd87cdd(0x24d)](),_0x3bd138=(_0x1cc113['Match']||'')['toLowerCase']()[_0xd87cdd(0x24d)]();VisuMZ['CoreEngine']['ControllerButtons'][_0x144367]=_0x1cc113,VisuMZ[_0xd87cdd(0x7ac)][_0xd87cdd(0x7e0)][_0x3bd138]=_0x144367;}else this[_0xd87cdd(0x81f)]>0x0&&(this[_0xd87cdd(0x4a8)]['x']=this[_0xd87cdd(0x8a4)](this[_0xd87cdd(0x4a8)]['x'],this[_0xd87cdd(0x8d8)]['x']),this[_0xd87cdd(0x4a8)]['y']=this[_0xd87cdd(0x8a4)](this[_0xd87cdd(0x4a8)]['y'],this[_0xd87cdd(0x8d8)]['y']));}},VisuMZ['ParseAllNotetags']=function(){const _0x51d24d=_0x4535e7;for(const _0x43f8f8 of $dataActors){if(_0x51d24d(0x3e5)!==_0x51d24d(0x7a1)){if(_0x43f8f8)VisuMZ[_0x51d24d(0x3bd)](_0x43f8f8);}else this[_0x51d24d(0x92c)]=_0x2fea5c[_0x51d24d(0x8e7)]();}for(const _0x45918d of $dataClasses){if(_0x45918d)VisuMZ['ParseClassNotetags'](_0x45918d);}for(const _0x55ae1b of $dataSkills){if(_0x51d24d(0x31c)===_0x51d24d(0x5ae))this[_0x51d24d(0x52b)]['setBackgroundType'](_0x1a72cd[_0x51d24d(0x7c9)]['CommandBgType']);else{if(_0x55ae1b)VisuMZ[_0x51d24d(0x74c)](_0x55ae1b);}}for(const _0x10a92a of $dataItems){if('vvvbi'===_0x51d24d(0x177))this[_0x51d24d(0x9d1)]['x']=_0x42d2a3[_0x51d24d(0x73c)]+0x4,this[_0x51d24d(0x9f0)]()?this[_0x51d24d(0x9d1)]['y']=_0x10faa1['boxHeight']-this[_0x51d24d(0x5c9)]():this['_cancelButton']['y']=0x0;else{if(_0x10a92a)VisuMZ['ParseItemNotetags'](_0x10a92a);}}for(const _0x2d25fb of $dataWeapons){if('xavjY'!==_0x51d24d(0xa04))return _0x970764;else{if(_0x2d25fb)VisuMZ[_0x51d24d(0x569)](_0x2d25fb);}}for(const _0x2532a9 of $dataArmors){if(_0x51d24d(0x3da)===_0x51d24d(0x6e4)){if(!_0x2c7d43[_0x51d24d(0x18e)]())return;if(!_0x175b90[_0x51d24d(0x3e2)]())return;_0x4e879e[_0x51d24d(0x42f)][_0x51d24d(0x348)]=![],_0x5465c2[_0x51d24d(0x7ac)]['ExportStrFromAllMaps']();}else{if(_0x2532a9)VisuMZ['ParseArmorNotetags'](_0x2532a9);}}for(const _0x3bfe0e of $dataEnemies){if(_0x3bfe0e)VisuMZ[_0x51d24d(0x32a)](_0x3bfe0e);}for(const _0x211e49 of $dataStates){if(_0x51d24d(0x81c)===_0x51d24d(0x76a))return _0x36a326[_0x51d24d(0x5e3)][_0x51d24d(0x77f)](this);else{if(_0x211e49)VisuMZ[_0x51d24d(0x77e)](_0x211e49);}}for(const _0x1fde62 of $dataTilesets){if(_0x1fde62)VisuMZ['ParseTilesetNotetags'](_0x1fde62);}},VisuMZ[_0x4535e7(0x3bd)]=function(_0x4236dc){},VisuMZ[_0x4535e7(0x397)]=function(_0xa0d2f6){},VisuMZ[_0x4535e7(0x74c)]=function(_0x1c2e70){},VisuMZ[_0x4535e7(0x1a8)]=function(_0x36739c){},VisuMZ['ParseWeaponNotetags']=function(_0x2c0c4f){},VisuMZ[_0x4535e7(0x6d6)]=function(_0x587ab8){},VisuMZ[_0x4535e7(0x32a)]=function(_0x397b98){},VisuMZ[_0x4535e7(0x77e)]=function(_0x3e3af2){},VisuMZ[_0x4535e7(0x43d)]=function(_0x3842c0){},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x3bd)]=VisuMZ['ParseActorNotetags'],VisuMZ[_0x4535e7(0x3bd)]=function(_0x323be7){const _0x38309c=_0x4535e7;VisuMZ[_0x38309c(0x7ac)][_0x38309c(0x3bd)]['call'](this,_0x323be7);const _0x2a2033=_0x323be7['note'];if(_0x2a2033[_0x38309c(0x27c)](/<MAX LEVEL:[ ](\d+)>/i)){_0x323be7[_0x38309c(0x42d)]=Number(RegExp['$1']);if(_0x323be7[_0x38309c(0x42d)]===0x0)_0x323be7[_0x38309c(0x42d)]=Number['MAX_SAFE_INTEGER'];}_0x2a2033[_0x38309c(0x27c)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x323be7[_0x38309c(0x8c7)]=Math[_0x38309c(0x16c)](Number(RegExp['$1']),_0x323be7['maxLevel']));},VisuMZ[_0x4535e7(0x7ac)]['ParseClassNotetags']=VisuMZ[_0x4535e7(0x397)],VisuMZ[_0x4535e7(0x397)]=function(_0x33e8e2){const _0x375421=_0x4535e7;VisuMZ[_0x375421(0x7ac)][_0x375421(0x397)][_0x375421(0x77f)](this,_0x33e8e2);if(_0x33e8e2[_0x375421(0x32f)]){if(_0x375421(0x517)==='SAGFS'){const _0x31a92e=this[_0x375421(0x77b)]();this['resetTextColor'](),this[_0x375421(0x256)](this[_0x375421(0x204)][_0x375421(0x64e)](_0x67e775,!![]),_0x39256,_0x13808a,_0x31a92e,_0x375421(0x7ae));}else for(const _0x4d8ebd of _0x33e8e2[_0x375421(0x32f)]){if(_0x4d8ebd[_0x375421(0x880)]['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)){if(_0x375421(0x6f0)===_0x375421(0x6f0))_0x4d8ebd[_0x375421(0x223)]=Math[_0x375421(0x548)](Number(RegExp['$1']),0x1);else return _0x326733['layoutSettings']['SellRect']['call'](this);}}}},VisuMZ[_0x4535e7(0x7ac)]['ParseEnemyNotetags']=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x4535e7(0x32a)]=function(_0x2235e3){const _0x52ff00=_0x4535e7;VisuMZ['CoreEngine'][_0x52ff00(0x32a)][_0x52ff00(0x77f)](this,_0x2235e3),_0x2235e3[_0x52ff00(0x223)]=0x1;const _0x2fee43=_0x2235e3[_0x52ff00(0x880)];if(_0x2fee43[_0x52ff00(0x27c)](/<LEVEL:[ ](\d+)>/i))_0x2235e3[_0x52ff00(0x223)]=Number(RegExp['$1']);if(_0x2fee43[_0x52ff00(0x27c)](/<MAXHP:[ ](\d+)>/i))_0x2235e3['params'][0x0]=Number(RegExp['$1']);if(_0x2fee43[_0x52ff00(0x27c)](/<MAXMP:[ ](\d+)>/i))_0x2235e3[_0x52ff00(0x26d)][0x1]=Number(RegExp['$1']);if(_0x2fee43[_0x52ff00(0x27c)](/<ATK:[ ](\d+)>/i))_0x2235e3[_0x52ff00(0x26d)][0x2]=Number(RegExp['$1']);if(_0x2fee43[_0x52ff00(0x27c)](/<DEF:[ ](\d+)>/i))_0x2235e3[_0x52ff00(0x26d)][0x3]=Number(RegExp['$1']);if(_0x2fee43[_0x52ff00(0x27c)](/<MAT:[ ](\d+)>/i))_0x2235e3[_0x52ff00(0x26d)][0x4]=Number(RegExp['$1']);if(_0x2fee43['match'](/<MDF:[ ](\d+)>/i))_0x2235e3['params'][0x5]=Number(RegExp['$1']);if(_0x2fee43[_0x52ff00(0x27c)](/<AGI:[ ](\d+)>/i))_0x2235e3['params'][0x6]=Number(RegExp['$1']);if(_0x2fee43[_0x52ff00(0x27c)](/<LUK:[ ](\d+)>/i))_0x2235e3['params'][0x7]=Number(RegExp['$1']);if(_0x2fee43['match'](/<EXP:[ ](\d+)>/i))_0x2235e3[_0x52ff00(0x70f)]=Number(RegExp['$1']);if(_0x2fee43[_0x52ff00(0x27c)](/<GOLD:[ ](\d+)>/i))_0x2235e3[_0x52ff00(0x982)]=Number(RegExp['$1']);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x959)]=Graphics['_defaultStretchMode'],Graphics[_0x4535e7(0x97c)]=function(){const _0xcf0620=_0x4535e7;switch(VisuMZ[_0xcf0620(0x7ac)][_0xcf0620(0x806)][_0xcf0620(0x405)][_0xcf0620(0x98b)]){case'stretch':return!![];case'normal':return![];default:return VisuMZ[_0xcf0620(0x7ac)][_0xcf0620(0x959)][_0xcf0620(0x77f)](this);}},VisuMZ['CoreEngine'][_0x4535e7(0x762)]=Graphics['printError'],Graphics['printError']=function(_0x4d381a,_0x3bbecc,_0x4ec512=null){const _0x5a2b9f=_0x4535e7;VisuMZ[_0x5a2b9f(0x7ac)][_0x5a2b9f(0x762)][_0x5a2b9f(0x77f)](this,_0x4d381a,_0x3bbecc,_0x4ec512),VisuMZ[_0x5a2b9f(0x77a)](![]);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x4de)]=Graphics[_0x4535e7(0x766)],Graphics['_centerElement']=function(_0x4eece2){const _0x586c0=_0x4535e7;VisuMZ['CoreEngine'][_0x586c0(0x4de)]['call'](this,_0x4eece2),this[_0x586c0(0x433)](_0x4eece2);},Graphics[_0x4535e7(0x433)]=function(_0x997e3){const _0x44110=_0x4535e7;VisuMZ[_0x44110(0x7ac)][_0x44110(0x806)]['QoL'][_0x44110(0x9ee)]&&('mHDqX'===_0x44110(0x5f6)?this[_0x44110(0x236)]['setBackgroundType'](_0x8970e6[_0x44110(0x7c9)][_0x44110(0x6a8)]):_0x997e3[_0x44110(0x294)][_0x44110(0x897)]=_0x44110(0x31a));VisuMZ[_0x44110(0x7ac)][_0x44110(0x806)]['QoL'][_0x44110(0x320)]&&(_0x997e3[_0x44110(0x294)][_0x44110(0x439)]=_0x44110(0x7be));const _0x2f8ce8=Math[_0x44110(0x548)](0x0,Math[_0x44110(0xa14)](_0x997e3[_0x44110(0x29a)]*this[_0x44110(0x55b)])),_0x14655b=Math[_0x44110(0x548)](0x0,Math[_0x44110(0xa14)](_0x997e3['height']*this[_0x44110(0x55b)]));_0x997e3[_0x44110(0x294)]['width']=_0x2f8ce8+'px',_0x997e3[_0x44110(0x294)]['height']=_0x14655b+'px';},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x7e5)]=Bitmap[_0x4535e7(0x781)][_0x4535e7(0x614)],Bitmap[_0x4535e7(0x781)][_0x4535e7(0x614)]=function(_0x1230de,_0x24dda6){const _0x40964c=_0x4535e7;VisuMZ[_0x40964c(0x7ac)]['Bitmap_initialize'][_0x40964c(0x77f)](this,_0x1230de,_0x24dda6),this[_0x40964c(0x350)]=!(VisuMZ['CoreEngine'][_0x40964c(0x806)][_0x40964c(0x405)][_0x40964c(0x320)]??!![]);},Bitmap[_0x4535e7(0x781)][_0x4535e7(0x7aa)]=function(){this['_customModified']=!![];},VisuMZ['CoreEngine'][_0x4535e7(0x873)]=Sprite['prototype'][_0x4535e7(0x4f8)],Sprite[_0x4535e7(0x781)]['destroy']=function(){const _0x127b9c=_0x4535e7;if(this[_0x127b9c(0x20f)])VisuMZ[_0x127b9c(0x7ac)][_0x127b9c(0x873)]['call'](this);this[_0x127b9c(0x78a)]();},Sprite['prototype'][_0x4535e7(0x78a)]=function(){const _0x77c777=_0x4535e7;if(!this[_0x77c777(0x7c5)])return;if(!this[_0x77c777(0x7c5)]['_customModified'])return;this[_0x77c777(0x7c5)]['_baseTexture']&&!this[_0x77c777(0x917)][_0x77c777(0x6aa)]['destroyed']&&(_0x77c777(0x6c7)!==_0x77c777(0x6c7)?(this['_playtestF7Looping']=!![],this[_0x77c777(0x76e)](),_0x3067de[_0x77c777(0x70e)](),this[_0x77c777(0x28b)]=![]):this[_0x77c777(0x7c5)][_0x77c777(0x4f8)]());},VisuMZ['CoreEngine'][_0x4535e7(0x983)]=Bitmap[_0x4535e7(0x781)][_0x4535e7(0x352)],Bitmap[_0x4535e7(0x781)][_0x4535e7(0x352)]=function(_0x986ef1,_0x298810){const _0x52870b=_0x4535e7;VisuMZ[_0x52870b(0x7ac)]['Bitmap_resize'][_0x52870b(0x77f)](this,_0x986ef1,_0x298810),this['markCoreEngineModified']();},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x229)]=Bitmap[_0x4535e7(0x781)]['blt'],Bitmap['prototype'][_0x4535e7(0x710)]=function(_0x2ed229,_0x1249a4,_0x45dc2a,_0x2cfafd,_0x295509,_0x471093,_0x2c05ae,_0x23d335,_0x39a451){const _0x5d3f08=_0x4535e7;_0x1249a4=Math[_0x5d3f08(0x98a)](_0x1249a4),_0x45dc2a=Math[_0x5d3f08(0x98a)](_0x45dc2a),_0x2cfafd=Math[_0x5d3f08(0x98a)](_0x2cfafd),_0x295509=Math['round'](_0x295509),_0x471093=Math[_0x5d3f08(0x98a)](_0x471093),_0x2c05ae=Math[_0x5d3f08(0x98a)](_0x2c05ae),VisuMZ[_0x5d3f08(0x7ac)][_0x5d3f08(0x229)]['call'](this,_0x2ed229,_0x1249a4,_0x45dc2a,_0x2cfafd,_0x295509,_0x471093,_0x2c05ae,_0x23d335,_0x39a451),this[_0x5d3f08(0x7aa)]();},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x58d)]=Bitmap[_0x4535e7(0x781)][_0x4535e7(0x738)],Bitmap['prototype'][_0x4535e7(0x738)]=function(_0x1ba4f3,_0x34e077,_0x520146,_0x233a4a){const _0x36ac35=_0x4535e7;VisuMZ['CoreEngine'][_0x36ac35(0x58d)][_0x36ac35(0x77f)](this,_0x1ba4f3,_0x34e077,_0x520146,_0x233a4a),this[_0x36ac35(0x7aa)]();},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x3bc)]=Bitmap[_0x4535e7(0x781)]['fillRect'],Bitmap[_0x4535e7(0x781)][_0x4535e7(0x82c)]=function(_0x2f4d9e,_0x424153,_0x583193,_0x47ec1a,_0x2d5630){const _0x3ed44d=_0x4535e7;VisuMZ[_0x3ed44d(0x7ac)][_0x3ed44d(0x3bc)]['call'](this,_0x2f4d9e,_0x424153,_0x583193,_0x47ec1a,_0x2d5630),this['markCoreEngineModified']();},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x471)]=Bitmap['prototype'][_0x4535e7(0x9eb)],Bitmap[_0x4535e7(0x781)][_0x4535e7(0x9eb)]=function(_0xcdbaf8,_0xe360a,_0xd11f35,_0x4dabc9,_0x24ea4f){const _0x58e48e=_0x4535e7;VisuMZ[_0x58e48e(0x7ac)][_0x58e48e(0x471)]['call'](this,_0xcdbaf8,_0xe360a,_0xd11f35,_0x4dabc9,_0x24ea4f),this[_0x58e48e(0x7aa)]();},VisuMZ[_0x4535e7(0x7ac)]['Bitmap_gradientFillRect']=Bitmap['prototype'][_0x4535e7(0x589)],Bitmap['prototype'][_0x4535e7(0x589)]=function(_0x210e22,_0x5ab7bb,_0x4f2f69,_0x179526,_0x4bdfef,_0x3ce4a1,_0x53d975){const _0x521a57=_0x4535e7;VisuMZ[_0x521a57(0x7ac)]['Bitmap_gradientFillRect'][_0x521a57(0x77f)](this,_0x210e22,_0x5ab7bb,_0x4f2f69,_0x179526,_0x4bdfef,_0x3ce4a1,_0x53d975),this[_0x521a57(0x7aa)]();},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x9a1)]=Bitmap[_0x4535e7(0x781)][_0x4535e7(0x452)],Bitmap[_0x4535e7(0x781)]['drawCircle']=function(_0x4b6663,_0x23e978,_0x3100e1,_0x1f41fc){const _0x360cde=_0x4535e7;_0x4b6663=Math[_0x360cde(0x98a)](_0x4b6663),_0x23e978=Math[_0x360cde(0x98a)](_0x23e978),_0x3100e1=Math['round'](_0x3100e1),VisuMZ[_0x360cde(0x7ac)][_0x360cde(0x9a1)]['call'](this,_0x4b6663,_0x23e978,_0x3100e1,_0x1f41fc),this['markCoreEngineModified']();},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0xa36)]=Bitmap[_0x4535e7(0x781)][_0x4535e7(0x682)],Bitmap['prototype'][_0x4535e7(0x682)]=function(_0x714762){const _0x101e9c=_0x4535e7;return Math[_0x101e9c(0x45a)](VisuMZ[_0x101e9c(0x7ac)][_0x101e9c(0xa36)][_0x101e9c(0x77f)](this,_0x714762));},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x7af)]=Bitmap[_0x4535e7(0x781)][_0x4535e7(0x256)],Bitmap['prototype'][_0x4535e7(0x256)]=function(_0x2e2041,_0x1a8f78,_0x1c580f,_0x4e1644,_0x401e76,_0x368aab){const _0x2c008e=_0x4535e7;_0x1a8f78=Math[_0x2c008e(0x98a)](_0x1a8f78),_0x1c580f=Math[_0x2c008e(0x98a)](_0x1c580f),_0x4e1644=Math[_0x2c008e(0x98a)](_0x4e1644),_0x401e76=Math['round'](_0x401e76),VisuMZ[_0x2c008e(0x7ac)]['Bitmap_drawText'][_0x2c008e(0x77f)](this,_0x2e2041,_0x1a8f78,_0x1c580f,_0x4e1644,_0x401e76,_0x368aab),this[_0x2c008e(0x7aa)]();},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x71c)]=Bitmap[_0x4535e7(0x781)]['_drawTextOutline'],Bitmap[_0x4535e7(0x781)][_0x4535e7(0x2df)]=function(_0x37b17e,_0x37c67b,_0x2809af,_0x54a0ba){const _0x4bbd54=_0x4535e7;if(VisuMZ['CoreEngine'][_0x4bbd54(0x806)][_0x4bbd54(0x405)]['FontShadows'])this[_0x4bbd54(0x1fd)](_0x37b17e,_0x37c67b,_0x2809af,_0x54a0ba);else{if(_0x4bbd54(0x2bb)!=='WMPMF')VisuMZ[_0x4bbd54(0x7ac)][_0x4bbd54(0x71c)]['call'](this,_0x37b17e,_0x37c67b,_0x2809af,_0x54a0ba);else{if(_0x2e5274[_0x4bbd54(0x8ea)]==='')return![];if(_0x45d300[_0x4bbd54(0x8ea)]==='Subtitle')return![];if(_0x2c573d['version']==='')return![];if(_0x136471['version']===_0x4bbd54(0x73a))return![];return!![];}}},Bitmap[_0x4535e7(0x781)][_0x4535e7(0x1fd)]=function(_0x131c4e,_0x4ab332,_0x208e90,_0x2c8ffe){const _0x51f454=_0x4535e7,_0x19d9f0=this[_0x51f454(0x332)];_0x19d9f0[_0x51f454(0x911)]=this[_0x51f454(0x262)],_0x19d9f0[_0x51f454(0x8a6)](_0x131c4e,_0x4ab332+0x2,_0x208e90+0x2,_0x2c8ffe);},VisuMZ['CoreEngine']['Input_clear']=Input[_0x4535e7(0x393)],Input[_0x4535e7(0x393)]=function(){const _0x418149=_0x4535e7;VisuMZ[_0x418149(0x7ac)][_0x418149(0x220)][_0x418149(0x77f)](this),this['_inputString']=undefined,this['_inputSpecialKeyCode']=undefined,this['_gamepadWait']=Input[_0x418149(0x920)];},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0xa0d)]=Input[_0x4535e7(0x76e)],Input[_0x4535e7(0x76e)]=function(){const _0xce4020=_0x4535e7;VisuMZ['CoreEngine']['Input_update']['call'](this);if(this[_0xce4020(0x5db)])this[_0xce4020(0x5db)]--;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x47e)]=Input[_0x4535e7(0x87d)],Input[_0x4535e7(0x87d)]=function(){const _0x25fb9f=_0x4535e7;if(this[_0x25fb9f(0x5db)])return;VisuMZ[_0x25fb9f(0x7ac)][_0x25fb9f(0x47e)][_0x25fb9f(0x77f)](this);},VisuMZ[_0x4535e7(0x7ac)]['Input_setupEventHandlers']=Input[_0x4535e7(0x54e)],Input[_0x4535e7(0x54e)]=function(){const _0x4a737f=_0x4535e7;VisuMZ['CoreEngine'][_0x4a737f(0x169)][_0x4a737f(0x77f)](this),document['addEventListener'](_0x4a737f(0x784),this['_onKeyPress'][_0x4a737f(0x8f2)](this));},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x283)]=Input['_onKeyDown'],Input[_0x4535e7(0x5aa)]=function(_0x1cc9ea){const _0x23682c=_0x4535e7;this[_0x23682c(0x6dd)]=_0x1cc9ea[_0x23682c(0x4d8)],VisuMZ['CoreEngine'][_0x23682c(0x283)]['call'](this,_0x1cc9ea),this[_0x23682c(0x45e)](null);},Input[_0x4535e7(0x6f6)]=function(_0x3dbc6d){const _0x51007e=_0x4535e7;this[_0x51007e(0x99f)](_0x3dbc6d);},Input[_0x4535e7(0x99f)]=function(_0x2147db){const _0x1bb412=_0x4535e7;this[_0x1bb412(0x6dd)]=_0x2147db[_0x1bb412(0x4d8)];let _0x542cc7=String[_0x1bb412(0x7e6)](_0x2147db[_0x1bb412(0x5b5)]);this['_inputString']===undefined?this[_0x1bb412(0x3e7)]=_0x542cc7:this[_0x1bb412(0x3e7)]+=_0x542cc7;},VisuMZ[_0x4535e7(0x7ac)]['Input_shouldPreventDefault']=Input[_0x4535e7(0x22b)],Input[_0x4535e7(0x22b)]=function(_0xea130a){const _0xe85c07=_0x4535e7;if(_0xea130a===0x8)return![];return VisuMZ[_0xe85c07(0x7ac)][_0xe85c07(0x6b7)][_0xe85c07(0x77f)](this,_0xea130a);},Input[_0x4535e7(0x8bb)]=function(_0xc7b1ca){const _0x1bc980=_0x4535e7;if(_0xc7b1ca[_0x1bc980(0x27c)](/backspace/i))return this[_0x1bc980(0x6dd)]===0x8;if(_0xc7b1ca['match'](/enter/i))return this[_0x1bc980(0x6dd)]===0xd;if(_0xc7b1ca['match'](/escape/i))return this[_0x1bc980(0x6dd)]===0x1b;},Input[_0x4535e7(0x693)]=function(){const _0x4e5700=_0x4535e7;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x4e5700(0x690)](this[_0x4e5700(0x6dd)]);},Input[_0x4535e7(0x232)]=function(){const _0x5ad870=_0x4535e7;return[0x25,0x26,0x27,0x28][_0x5ad870(0x690)](this[_0x5ad870(0x6dd)]);},Input['isGamepadConnected']=function(){const _0x4f037a=_0x4535e7;if(navigator[_0x4f037a(0x76c)]){if(_0x4f037a(0x388)!==_0x4f037a(0x7fd)){const _0x7c4a8d=navigator[_0x4f037a(0x76c)]();if(_0x7c4a8d)for(const _0x2fd5e7 of _0x7c4a8d){if(_0x4f037a(0x7d1)===_0x4f037a(0x7d1)){if(_0x2fd5e7&&_0x2fd5e7[_0x4f037a(0x6c6)])return!![];}else this[_0x4f037a(0x2e3)]=_0x3fa6af;}}else{const _0x24415d=this['commandWindowRect']();this[_0x4f037a(0x52b)]=new _0x387dcf(_0x24415d),this[_0x4f037a(0x52b)][_0x4f037a(0x3b5)]('cancel',this[_0x4f037a(0x8f0)][_0x4f037a(0x8f2)](this)),this[_0x4f037a(0x292)](this[_0x4f037a(0x52b)]),this[_0x4f037a(0x52b)][_0x4f037a(0x518)](_0x5cbbf4['layoutSettings'][_0x4f037a(0x658)]);}}return![];},Input[_0x4535e7(0x756)]=function(){const _0x348838=_0x4535e7;if(navigator[_0x348838(0x76c)]){const _0x4377a6=navigator[_0x348838(0x76c)]();if(_0x4377a6)for(const _0x330f9d of _0x4377a6){if(_0x330f9d&&_0x330f9d[_0x348838(0x6c6)]){if(_0x348838(0x996)==='IOhPG'){if(this[_0x348838(0x4ce)]()){const _0x1ddc94=_0x50b44b[_0x348838(0x7ac)][_0x348838(0x806)][_0x348838(0x593)];if(this['_inputWindow'][_0x348838(0x35b)]===_0x348838(0x74e))return _0x1ddc94[_0x348838(0x80f)]||'Finish';}return _0x2ed9dc[_0x348838(0x781)][_0x348838(0x6c9)][_0x348838(0x77f)](this);}else{if(this[_0x348838(0x316)](_0x330f9d))return!![];if(this[_0x348838(0x6da)](_0x330f9d))return!![];}}}}return![];},Input['isGamepadButtonPressed']=function(_0x5c8171){const _0x1b3637=_0x4535e7,_0x84237f=_0x5c8171['buttons'];for(let _0x2e5951=0x0;_0x2e5951<_0x84237f[_0x1b3637(0x2ec)];_0x2e5951++){if(_0x1b3637(0x1c6)!==_0x1b3637(0x1c6))return _0x1bd326[_0x1b3637(0x9b2)](this),_0x325b2c[_0x1b3637(0x7ac)][_0x1b3637(0x722)][_0x1b3637(0x77f)](this,_0x324e34);else{if(_0x84237f[_0x2e5951][_0x1b3637(0x535)])return!![];}}return![];},Input[_0x4535e7(0x6da)]=function(_0x3a6b17){const _0x27b250=_0x4535e7,_0x5df1a=_0x3a6b17[_0x27b250(0x6c2)],_0x218fd2=0.5;if(_0x5df1a[0x0]<-_0x218fd2)return!![];if(_0x5df1a[0x0]>_0x218fd2)return!![];if(_0x5df1a[0x1]<-_0x218fd2)return!![];if(_0x5df1a[0x1]>_0x218fd2)return!![];return![];},Input['getLastGamepadUsed']=function(){const _0x293365=_0x4535e7;return this[_0x293365(0x186)]||null;},Input[_0x4535e7(0x45e)]=function(_0x5edecf){const _0x12160e=_0x4535e7;this[_0x12160e(0x186)]=_0x5edecf;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x7b2)]=Input[_0x4535e7(0x96b)],Input[_0x4535e7(0x96b)]=function(_0x2faf62){const _0x597fc7=_0x4535e7;VisuMZ[_0x597fc7(0x7ac)][_0x597fc7(0x7b2)][_0x597fc7(0x77f)](this,_0x2faf62),(this[_0x597fc7(0x316)](_0x2faf62)||this['isGamepadAxisMoved'](_0x2faf62))&&('jwmwd'==='uNwbU'?(!this[_0x597fc7(0x491)]&&(this[_0x597fc7(0x904)]+=_0x100a28[_0x597fc7(0x98a)]((_0x3955f6['height']-0x270)/0x2),this[_0x597fc7(0x904)]-=_0x3a1fed[_0x597fc7(0xa14)]((_0x296321['height']-_0x267ec7[_0x597fc7(0x5cc)])/0x2),_0x4392b1[_0x597fc7(0x877)]()?this[_0x597fc7(0x954)]-=_0x2ae49f['floor']((_0x3cf74a[_0x597fc7(0x29a)]-_0x506616[_0x597fc7(0x73c)])/0x2):this[_0x597fc7(0x954)]+=_0x2f101c['round']((_0x3ab3b9[_0x597fc7(0x73c)]-0x330)/0x2)),this[_0x597fc7(0x491)]=!![]):this[_0x597fc7(0x45e)](_0x2faf62));},Input[_0x4535e7(0x521)]=function(){const _0x12bbd6=_0x4535e7;return this[_0x12bbd6(0x186)]?this[_0x12bbd6(0x186)]['id']:_0x12bbd6(0x22e);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x7d3)]=Tilemap[_0x4535e7(0x781)][_0x4535e7(0x319)],Tilemap[_0x4535e7(0x781)]['_addShadow']=function(_0xd28304,_0x2449c0,_0x52d8a4,_0x1513f0){const _0xfcef72=_0x4535e7;if($gameMap&&$gameMap[_0xfcef72(0x503)]())return;VisuMZ[_0xfcef72(0x7ac)][_0xfcef72(0x7d3)][_0xfcef72(0x77f)](this,_0xd28304,_0x2449c0,_0x52d8a4,_0x1513f0);},Tilemap[_0x4535e7(0x6ab)][_0x4535e7(0x781)][_0x4535e7(0x8e1)]=function(){const _0x308edd=_0x4535e7;this[_0x308edd(0x540)]();for(let _0x573cbc=0x0;_0x573cbc<Tilemap[_0x308edd(0x4ad)][_0x308edd(0x90e)];_0x573cbc++){const _0xc07939=new PIXI[(_0x308edd(0x566))]();_0xc07939[_0x308edd(0x568)](0x800,0x800),VisuMZ['CoreEngine'][_0x308edd(0x806)][_0x308edd(0x405)][_0x308edd(0x320)]&&(_0xc07939[_0x308edd(0x255)]=PIXI['SCALE_MODES'][_0x308edd(0x401)]),this[_0x308edd(0x2e6)][_0x308edd(0x85c)](_0xc07939);}},WindowLayer[_0x4535e7(0x781)][_0x4535e7(0x460)]=function(){const _0x58aa68=_0x4535e7;if(SceneManager&&SceneManager[_0x58aa68(0x42f)]){if(_0x58aa68(0x98c)==='coTvv')_0x55f34e['VisuMZ_2_BattleSystemFTB']&&(this['_forcedBattleSys']='FTB');else return SceneManager[_0x58aa68(0x42f)][_0x58aa68(0x829)]();}else return!![];},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x9f4)]=WindowLayer[_0x4535e7(0x781)][_0x4535e7(0x96a)],WindowLayer[_0x4535e7(0x781)]['render']=function render(_0x49a89c){const _0x52d251=_0x4535e7;if(this[_0x52d251(0x460)]()){if(_0x52d251(0x7ce)!=='MyyOP'){const _0xb6a32e=_0x52d251(0x7ba);this[_0x52d251(0x94f)]=this[_0x52d251(0x94f)]||{};if(this[_0x52d251(0x94f)][_0xb6a32e])return this[_0x52d251(0x94f)][_0xb6a32e];const _0x2e641f=_0x9caf3[_0x52d251(0x7ac)]['Settings'][_0x52d251(0x4ba)]['ColorNormal'];return this[_0x52d251(0x3ed)](_0xb6a32e,_0x2e641f);}else VisuMZ[_0x52d251(0x7ac)][_0x52d251(0x9f4)][_0x52d251(0x77f)](this,_0x49a89c);}else this[_0x52d251(0x205)](_0x49a89c);},WindowLayer[_0x4535e7(0x781)][_0x4535e7(0x205)]=function render(_0x23a974){const _0x3f2027=_0x4535e7;if(!this[_0x3f2027(0x755)])return;const _0xfbfec8=new PIXI[(_0x3f2027(0x3ea))](),_0x2b8cc4=_0x23a974['gl'],_0x47e8dd=this['children']['clone']();_0x23a974['framebuffer'][_0x3f2027(0x343)](),_0xfbfec8[_0x3f2027(0x891)]=this[_0x3f2027(0x891)],_0x23a974[_0x3f2027(0x862)][_0x3f2027(0x90a)](),_0x2b8cc4[_0x3f2027(0x3ee)](_0x2b8cc4[_0x3f2027(0x95f)]);while(_0x47e8dd[_0x3f2027(0x2ec)]>0x0){if(_0x3f2027(0x89b)===_0x3f2027(0x89b)){const _0x12b0e6=_0x47e8dd['shift']();if(_0x12b0e6['_isWindow']&&_0x12b0e6[_0x3f2027(0x755)]&&_0x12b0e6['openness']>0x0){if(_0x3f2027(0x45d)!==_0x3f2027(0x8b6))_0x2b8cc4[_0x3f2027(0x6b6)](_0x2b8cc4[_0x3f2027(0x594)],0x0,~0x0),_0x2b8cc4[_0x3f2027(0x4be)](_0x2b8cc4[_0x3f2027(0x60b)],_0x2b8cc4['KEEP'],_0x2b8cc4[_0x3f2027(0x60b)]),_0x12b0e6[_0x3f2027(0x96a)](_0x23a974),_0x23a974[_0x3f2027(0x862)]['flush'](),_0xfbfec8[_0x3f2027(0x393)](),_0x2b8cc4[_0x3f2027(0x6b6)](_0x2b8cc4['ALWAYS'],0x1,~0x0),_0x2b8cc4[_0x3f2027(0x4be)](_0x2b8cc4[_0x3f2027(0x3be)],_0x2b8cc4[_0x3f2027(0x3be)],_0x2b8cc4[_0x3f2027(0x3be)]),_0x2b8cc4[_0x3f2027(0x698)](_0x2b8cc4[_0x3f2027(0x646)],_0x2b8cc4[_0x3f2027(0x2c1)]),_0xfbfec8[_0x3f2027(0x96a)](_0x23a974),_0x23a974[_0x3f2027(0x862)][_0x3f2027(0x90a)](),_0x2b8cc4[_0x3f2027(0x698)](_0x2b8cc4['ONE'],_0x2b8cc4[_0x3f2027(0x222)]);else return-0.5*(_0x5d0c84[_0x3f2027(0x192)](0x1-_0x4182a3*_0x27b087)-0x1);}}else this[_0x3f2027(0x38b)](),this[_0x3f2027(0x567)](!![]),this[_0x3f2027(0x567)](![]),this['updateScrollBarPosition'](!![]),this['updateScrollBarPosition'](![]);}_0x2b8cc4[_0x3f2027(0x9cd)](_0x2b8cc4[_0x3f2027(0x95f)]),_0x2b8cc4[_0x3f2027(0x393)](_0x2b8cc4[_0x3f2027(0x6e9)]),_0x2b8cc4[_0x3f2027(0x791)](0x0),_0x23a974[_0x3f2027(0x862)][_0x3f2027(0x90a)]();for(const _0x30168e of this[_0x3f2027(0x360)]){if(_0x3f2027(0x386)===_0x3f2027(0x686)){if(!this[_0x3f2027(0x39b)])return;this['x']=this[_0x3f2027(0x39b)][_0x3f2027(0x3f4)],this['y']=this['_coreEasing'][_0x3f2027(0x25d)],this[_0x3f2027(0x150)]['x']=this[_0x3f2027(0x39b)][_0x3f2027(0x3b6)],this['scale']['y']=this['_coreEasing'][_0x3f2027(0x848)],this[_0x3f2027(0x64b)]=this[_0x3f2027(0x39b)][_0x3f2027(0x459)],this[_0x3f2027(0x92c)]=this['_coreEasing']['targetBackOpacity'],this[_0x3f2027(0x34a)]=this[_0x3f2027(0x39b)][_0x3f2027(0x5f3)],this[_0x3f2027(0x4ca)](_0x211741,_0x3acea2,this['x'],this['y'],this[_0x3f2027(0x150)]['x'],this[_0x3f2027(0x150)]['y'],this['opacity'],this[_0x3f2027(0x92c)],this[_0x3f2027(0x34a)]);}else!_0x30168e[_0x3f2027(0x9d5)]&&_0x30168e['visible']&&_0x30168e[_0x3f2027(0x96a)](_0x23a974);}_0x23a974[_0x3f2027(0x862)]['flush']();},DataManager[_0x4535e7(0x700)]=function(_0x5c5bea){const _0x3a00c8=_0x4535e7;return this[_0x3a00c8(0x65c)](_0x5c5bea)&&_0x5c5bea[_0x3a00c8(0x528)]===0x2;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x445)]=DataManager[_0x4535e7(0x803)],DataManager[_0x4535e7(0x803)]=function(){const _0x404c1c=_0x4535e7;VisuMZ[_0x404c1c(0x7ac)]['DataManager_setupNewGame'][_0x404c1c(0x77f)](this),this[_0x404c1c(0x4f6)](),this[_0x404c1c(0x4c2)]();},DataManager[_0x4535e7(0x4f6)]=function(){const _0x1fc5fa=_0x4535e7;if($gameTemp[_0x1fc5fa(0x18e)]()){if('teiJf'===_0x1fc5fa(0x15f))this['parseForcedGameTroopSettingsCoreEngine'](_0x431e19[_0x1fc5fa(0x880)]);else{const _0x4b3bab=VisuMZ[_0x1fc5fa(0x7ac)][_0x1fc5fa(0x806)][_0x1fc5fa(0x405)][_0x1fc5fa(0x59a)];if(_0x4b3bab>0x0)$gameTemp[_0x1fc5fa(0x15c)](_0x4b3bab);}}},DataManager[_0x4535e7(0x4c2)]=function(){const _0x219278=_0x4535e7,_0x5ae76b=VisuMZ[_0x219278(0x7ac)][_0x219278(0x806)]['QoL']['NewGameCommonEventAll']||0x0;if(_0x5ae76b>0x0)$gameTemp[_0x219278(0x15c)](_0x5ae76b);},DataManager['createTroopNote']=function(_0x5dde44){const _0x459197=_0x4535e7,_0x3974af=$dataTroops[_0x5dde44];if(!_0x3974af)return'';let _0x3897d9='';_0x3897d9+=_0x3974af[_0x459197(0x4e4)];for(const _0xbc3cad of _0x3974af[_0x459197(0x497)]){for(const _0x5b2020 of _0xbc3cad[_0x459197(0x9d6)]){_0x459197(0x948)!=='etBxA'?!_0x48fe06[_0x459197(0x2b3)]()&&this['removePointAnimation'](_0x35b344):[0x6c,0x198][_0x459197(0x454)](_0x5b2020[_0x459197(0x340)])&&(_0x3897d9+='\x0a',_0x3897d9+=_0x5b2020[_0x459197(0x67d)][0x0]);}}return _0x3897d9;};(VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x806)]['QoL'][_0x4535e7(0x545)]??!![])&&($scene=null,VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x1f5)]=Scene_Base[_0x4535e7(0x781)][_0x4535e7(0x4ec)],Scene_Base[_0x4535e7(0x781)][_0x4535e7(0x4ec)]=function(){const _0xbbb35f=_0x4535e7;VisuMZ[_0xbbb35f(0x7ac)][_0xbbb35f(0x1f5)][_0xbbb35f(0x77f)](this),$scene=this;},$spriteset=null,VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0xa22)]=Scene_Map[_0x4535e7(0x781)][_0x4535e7(0x9e1)],Scene_Map[_0x4535e7(0x781)][_0x4535e7(0x9e1)]=function(){const _0x38290c=_0x4535e7;VisuMZ[_0x38290c(0x7ac)][_0x38290c(0xa22)][_0x38290c(0x77f)](this),$spriteset=this[_0x38290c(0x170)];},VisuMZ['CoreEngine'][_0x4535e7(0x751)]=Scene_Battle[_0x4535e7(0x781)][_0x4535e7(0x9e1)],Scene_Battle[_0x4535e7(0x781)][_0x4535e7(0x9e1)]=function(){const _0x5e8ffc=_0x4535e7;VisuMZ[_0x5e8ffc(0x7ac)][_0x5e8ffc(0x751)][_0x5e8ffc(0x77f)](this),$spriteset=this['_spriteset'];},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x84f)]=Scene_Base['prototype']['terminate'],Scene_Base[_0x4535e7(0x781)][_0x4535e7(0x56e)]=function(){const _0x3abc71=_0x4535e7;VisuMZ[_0x3abc71(0x7ac)]['Scene_Base_terminate'][_0x3abc71(0x77f)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x6b2)]=BattleManager[_0x4535e7(0x76e)],BattleManager[_0x4535e7(0x76e)]=function(_0x30dda4){const _0xc2618b=_0x4535e7;VisuMZ[_0xc2618b(0x7ac)][_0xc2618b(0x6b2)][_0xc2618b(0x77f)](this,_0x30dda4),$subject=this[_0xc2618b(0x1c8)],$targets=this[_0xc2618b(0x5ed)],$target=this['_target']||this[_0xc2618b(0x5ed)][0x0];},$event=null,VisuMZ['CoreEngine'][_0x4535e7(0x896)]=Game_Event[_0x4535e7(0x781)][_0x4535e7(0x4c6)],Game_Event[_0x4535e7(0x781)]['start']=function(){const _0x516396=_0x4535e7;VisuMZ[_0x516396(0x7ac)][_0x516396(0x896)][_0x516396(0x77f)](this),$event=this;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x625)]=Scene_Map[_0x4535e7(0x781)]['update'],Scene_Map[_0x4535e7(0x781)][_0x4535e7(0x76e)]=function(){const _0x1d078c=_0x4535e7;VisuMZ[_0x1d078c(0x7ac)]['Scene_Map_update'][_0x1d078c(0x77f)](this),$gameMap[_0x1d078c(0x613)]();},Game_Map[_0x4535e7(0x781)]['updateCurrentEvent']=function(){!this['isEventRunning']()&&$event!==null&&($event=null);},$commonEvent=function(_0x205c0c){const _0x3b34cd=_0x4535e7;if($gameTemp)$gameTemp[_0x3b34cd(0x15c)](_0x205c0c);},$onceParallel=function(_0x15d69f){const _0x591a0a=_0x4535e7;if(SceneManager['isSceneMap']())$scene[_0x591a0a(0x1b9)](_0x15d69f);else{if(SceneManager[_0x591a0a(0x5ff)]()){if(_0x591a0a(0x502)===_0x591a0a(0x7d4))this['_clickHandler']&&this[_0x591a0a(0x945)]();else{if(Imported[_0x591a0a(0x303)])$scene[_0x591a0a(0x1b9)](_0x15d69f);else{if($gameTemp&&$gameTemp[_0x591a0a(0x18e)]()){if('zoQuV'!==_0x591a0a(0x6ec)){if(_0x428df4['currencyUnit']!==this[_0x591a0a(0x4d0)]())return![];return _0x51dcba[_0x591a0a(0x7ac)]['Settings'][_0x591a0a(0x699)][_0x591a0a(0x995)];}else alert('Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!');}}}}else $gameTemp&&$gameTemp[_0x591a0a(0x18e)]()&&alert(_0x591a0a(0x2b1));}});;function _0x1968(){const _0x294d24=['makeTargetSprites','ExportAllTroopText','buttonAssistKey%1','Scene_MenuBase_mainAreaTop','ItemStyle','RARhb','isAnimationForEach','ZDFOF','Scene_MenuBase_mainAreaHeight','getColor','traitsPi','catchException','font','Wddvm','_registerKeyInput','center','Bitmap_drawCircle','DATABASE','QHrLJ','OUTQUAD','buttonAssistSwitch','260YMhESc','useFontWidthFix','Untitled','GoldRect','GtaQe','pointX','Game_Map_scrollRight','F15','defineProperty','OPEN_CURLY_BRACKET','charAt','backgroundBitmap','setLastPluginCommandInterpreter','_digitGroupingEx','systemColor','_refreshArrows','join','_rate','isGameActive','playBgs','ActorHPColor','isOpenAndActive','startNormalGame','Game_Character_processMoveCommand','expRate','BKSP','outlineColorGauge','item','select','xwqpX','Window_NameInput_cursorPageup','updatePositionCoreEngineShakeVert','determineSideButtonLayoutValid','9FapmJq','EpPiy','scaleSprite','removeAnimationFromContainer','ecHUI','setSideButtonLayout','disable','BannedWords','ALTGR','EQUALS','_cancelButton','_forcedTroopView','F10','isMVAnimation','_isWindow','list','cancel','BarOffset','itemBackColor2','TitleCommandList','_actorWindow','MvAnimationRate','_moveEasingType','cursorPagedown','Max','〘Common\x20Event\x20%1:\x20%2〙\x20Start','createSpriteset','_loadingState','levelUp','DigitGroupingDamageSprites','iKofL','LoadError','qmpKC','CrisisRate','addOnceParallelInterpreter','buttonAssistKey5','strokeRect','ProfileRect','buttonAssistKey3','FontSmoothing','thickness','isBottomButtonMode','ETB','IconSet','MNibr','WindowLayer_render','_scaleX','_pictureCoordinatesWindow','makeActionList','abs','mev','resetFontSettings','NUMPAD0','ARRAYJSON','CallHandlerJS','targetSpritePosition','onInputOk','BuyRect','xparam','CreateBattleSystemID','mhp','xavjY','Game_Action_itemHit','kQrYt','drawAllParams','skillTypes','Duration','pnXBo','command105','Scene_Battle_createSpriteset_detach','Input_update','LineHeight','Scene_MenuBase_createPageButtons','random','xparamFlatBonus','IconParam2','makeFontSmaller','floor','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','waiting','_targetScaleX','activate','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Speed','CategoryBgType','OUTSINE','sv_enemies','sparamPlusJS','_tempActor','itemRect','Sprite_Actor_setActorHome','Scene_Map_createSpriteset','title','slotWindowRect','currentValue','WIN_OEM_ATTN','destroyContents','initCoreEngine','_stored_tpCostColor','Scene_Name_create','_slotWindow','mFDtJ','_backSprite1','Subtitle','FUNC','SceneManager_initialize','processKeyboardHandling','_timerSprite','nw.gui','startAnimation','WLooU','Bitmap_measureTextWidth','isSideButtonLayout','pObGe','ItemBgType','measureTextWidthNoRounding','INOUTSINE','scale','OUTCUBIC','SlotBgType','type','OS_KEY','CEV','resetBattleSystem','drawIcon','_buyWindow','getCustomBackgroundSettings','processCursorMove','clamp','reserveCommonEvent','OUTBOUNCE','img/%1/','LbMvS','_number','WrRSw','SkillMenu','createButtonAssistWindow','TAB','gainItem','command122','ShowJS','RevertPreserveNumbers','Input_setupEventHandlers','moveCancelButtonSideButtonLayout','Window_StatusBase_drawActorLevel','min','_statusEquipWindow','addAnimationSpriteToContainer','Game_Screen_initialize','_spriteset','IconParam6','pointY','isLoopVertical','setAnglePlusData','BackOpacity','updateAnglePlus','GdnZK','Title','reduce','([\x5c+\x5c-]\x5cd+)>','PRINTSCREEN','oZDoV','uguNr','numActions','IconXParam8','ParamArrow','down','_lastPluginCommandInterpreter','bSAkL','filter','yTUBY','_lastGamepad','textHeight','index','missed','INOUTELASTIC','SaveMenu','processDigitChange','parallaxes','isPlaytest','TextCodeClassNames','initCoreEasing','IXStD','sqrt','applyForcedGameTroopSettingsCoreEngine','_backgroundFilter','tilesets','_currentMap','ALT','Page','_isPlaytest','_offsetY','SellRect','_windowskin','DimColor1','ActorMPColor','Window_MapName_refresh','Window_NumberInput_start','XBfGX','goto','enemies','PictureID','buttonAssistKey4','gaugeHeight','Spriteset_Base_destroy','ParseItemNotetags','createPointAnimationSprite','listWindowRect','<JS\x20%1\x20%2:[\x20](.*)>','SCROLL_LOCK','height','WsnSs','makeCommandList','rMKJm','initButtonHidden','buttonY','tpGaugeColor2','UtQHE','_coreEasingType','_stored_powerUpColor','TitlePicButtons','playTestF6','playOnceParallelInterpreter','QtBsz','ColorCTGauge2','IDs','_shakePower','enableDigitGroupingEx','kfcKo','Scene_Boot_updateDocumentTitle','animations','BQHlY','ScaleX','playTestF7','CTB','QjEfW','Game_Picture_initBasic','_subject','PictureCoordinatesMode','ColorCrisis','cursorRight','command357','4407656Xoyvwg','escape','operand','Sprite_Animation_setViewport','deactivate','pagedownShowButton','dropItems','%1/','\x0a\x0a\x0a\x0a\x0a','clipboard','_stored_deathColor','altKey','UpdatePictureCoordinates','position','JYMkx','Rate1','scaleY','sparamRate2','ItemRect','MDR','switchModes','isItemStyle','volume','Scene_MenuBase_createBackground','exportAllMapStrings','_mirror','_height','checkPassage','WIN_OEM_PA2','_data','CzVHz','CommandRect','origin','retrieveFauxAnimation','_list','BgFilename1','sparamPlus','Window_NameInput_cursorLeft','mpCostColor','moveMenuButtonSideButtonLayout','Scene_Base_create','isNextScene','checkSmartEventCollision','processTimingData','_startLoading','DefaultStyle','refreshDimmerBitmap','drawActorNickname','_drawTextShadow','key%1','SParamVocab1','keyMapper','Plus2','ywjQY','SUBTRACT','_actor','renderNoMask','F12','battlebacks2','uDiBc','AbLZm','Actor','xparamFlatJS','blWEF','toFixed','REC','_texture','ModernControls','_animationQueue','SqJLp','showPointAnimations','actorWindowRect','_currentBgs','StatusMenu','Sprite_AnimationMV_updatePosition','rgba(0,\x200,\x200,\x200.7)','PictureShowIcon','fmgRh','_playTestFastMode','uJJtA','mDzAA','isForFriend','ColorCTGauge1','Input_clear','WIN_OEM_CUSEL','ONE_MINUS_SRC_ALPHA','level','SKAnd','process_VisuMZ_CoreEngine_jsQuickFunctions','createDigits','VisuMZ_2_BattleSystemFTB','(\x5cd+)>','Bitmap_blt','XParameterFormula','_shouldPreventDefault','doesNameContainBannedWords','bvtDJ','Keyboard','GsQhF','OptionsRect','performEscape','isArrowPressed','Rtcwo','Window_Base_drawText','HZguI','_helpWindow','entZJ','enabled','apply','_stored_pendingColor','EXECUTE','mainAreaHeight','mpGaugeColor2','Qjspk','tileWidth','Actor-%1-%2','displayName','DetachBattlePictureContainer','JmrwL','PictureEraseRange','State-%1-%2','isPointAnimationPlaying','_hideButtons','createCustomParameter','utEre','mainFontSize','processKeyboardDelete','ColorMaxLvGauge2','trim','SHIFT','etypeId','ProfileBgType','SWNkT','BACK_QUOTE','paramMax','Window_StatusBase_drawActorSimpleStatus','scaleMode','drawText','initRotationCoreEngine','ParseAllNotetags','NUMPAD5','show','ActorTPColor','_colorTone','targetY','#%1','EXR','OUTQUINT','STB','outlineColor','BuyBgType','RLldE','VisuMZ_1_OptionsCore','_stored_ctGaugeColor1','App','up2','EscapeAlways','BTestArmors','updatePlayTestF7','TCR','params','helpAreaHeight','ARRAYSTR','Match','StatusEquipRect','StatusParamsRect','WIN_OEM_BACKTAB','XParamVocab7','Scene_Boot_loadSystemImages','changeAnglePlusData','CGnfZ','WAmoY','focus','mnFvf','Window_NameInput_refresh','match','updatePictureAntiZoom','WIN_OEM_FJ_JISHO','commandWindowRect','JZggg','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','PreserveNumbers','Input_onKeyDown','KeySHIFT','PictureRotateBy','LevelUpFullHp','updatePositionCoreEngineShakeRand','innerHeight','FunctionName','_changingClass','_playtestF7Looping','getControllerInputButtonString','_targetOpacity','bgs','_backSprite','Game_Interpreter_command122','1.4.4','addWindow','_clientArea','style','UWwmR','XParamVocab3','UNDERSCORE','TGR','scrollbar','width','F24','hpColor','process_VisuMZ_CoreEngine_CustomParameters','pow','bMsbP','getLastPluginCommandInterpreter','rstdR','AMPERSAND','refreshScrollBarBitmap','_displayY','_itemWindow','OUTCIRC','_url','AudioChangeBgsVolume','showFauxAnimations','mTmYM','Window_Base_drawCharacter','QlrIU','RPGMAKER_VERSION','xScrollLinkedOffset','shake','XXtGI','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','xparamPlus1','isPlaying','_coreEngineShakeStyle','PLUS','SceneManager_onKeyDown','setupRate','getCoreEngineScreenShakeStyle','iuHWN','SParamVocab8','wCocG','registerCommand','fSAZX','LATIN1','windowPadding','option','ONE','RequireFocus','AllMaps','_digitGrouping','ListBgType','currentLevelExp','LINEAR','Map%1.json','process_VisuMZ_CoreEngine_ControllerButtons','sfZsO','Exwec','Window_NameInput_initialize','addChildToBack','paramFlatJS','isSmartEventCollisionOn','OZtYE','adjustSprite','AutoScrollLockX','IconParam1','responseText','dyniG','eCWCc','WIN_ICO_HELP','coreEngineRepositionEnemies','_lastCommandSymbol','Window_Selectable_cursorUp','onActorChange','maxCols','sBcZW','TimeProgress','_drawTextOutline','RIGHT','_width','TargetAngle','_sideButtonLayout','drawNewParam','paramPlus','_internalTextures','XrQGV','PHA','onlyfilename','actor','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','length','ColorMaxLvGauge1','advanced','horz','targetObjects','Scene_Battle_update','OUTEXPO','setupButtonImage','_viewportSize','useDigitGroupingEx','DrawIcons','aXHOX','Map%1','centerCameraCheckData','UAEIi','qpfzn','OpenConsole','NewGameCommonEventAll','Window_EquipItem_isEnabled','IconXParam6','fYXEM','eaJKu','_troopId','VisuMZ_1_BattleCore','createContents','SMEjJ','AudioChangeBgsPan','calcCoreEasing','setAction','sin','TrNKi','EUyku','Cyxtz','Scene_Map_createMenuButton','StatusParamsBgType','constructor','ExtractStrFromList','xparamFlat2','RegExp','add','buttonAssistKey1','active','isGamepadButtonPressed','processFauxAnimationRequests','drawGauge','_addShadow','none','KeyTAB','NHMQv','removeChild','_origin','setupBattleTestItems','PixelateImageRendering','XParamVocab2','buttonAssistText1','ColorMPCost','XTfkX','gainSilentTp','LVSHA','ctGaugeColor2','ttpYo','mNpDI','ParseEnemyNotetags','CYFRA','OutlineColor','windowRect','MAX_SAFE_INTEGER','learnings','crisisColor','nXMSY','context','offset','Power','MUoky','onKeyDown','Game_BattlerBase_refresh','isCursorMovable','LUK','SwitchRandomizeRange','CIRCUMFLEX','Game_Picture_scaleY','Opacity','scrollX','cBJFY','code','stringKeyMap','_lastY','forceStencil','Game_Actor_paramBase','gaugeBackColor','TextFmt','_hovered','_active','Window_Base_update','contentsOpacity','SELECT','gkRfF','drawCurrencyValue','DocumentTitleFmt','createJsQuickFunction','_smooth','isUseModernControls','resize','maxTp','removePointAnimation','scrollUp','playEscape','startAutoNewGame','refresh','displayY','xMsVW','_mode','TPB\x20WAIT','processKeyboardHome','updateTransform','centerY','children','ypNfe','changeClass','child_process','LAHnb','and\x20add\x20it\x20onto\x20this\x20one.','tXXKh','command111','faceHeight','ASTERISK','NqgtE','FvaRT','XParamVocab1','loadBitmap','itemPadding','initDigitGrouping','AudioChangeBgmPan','_baseSprite','neURE','_menuButton','GoldMax','CaIUL','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','pagedown','36XlRFRX','addChild','Show\x20Scrolling\x20Text\x20Script\x20Error','Window_Selectable_processTouch','maxGold','DetachMapPictureContainer','Scene_Map_updateMain','createMenuButton','_name','xparamRateJS','randomInt','isScrollBarVisible','CMHRu','isPhysical','uSden','F20','dCdpb','setup','checkCoreEngineDisplayCenter','updateScrollBarVisibility','INOUTBACK','NumberRect','DELETE','textSizeEx','iconHeight','oBpRB','Scene_Map_initialize','clear','oGsOk','ConvertParams','ItRTV','ParseClassNotetags','xBswe','rgba(0,\x200,\x200,\x201.0)','Spriteset_Base_isAnimationPlaying','_coreEasing','_targetOffsetY','worldTransform','fillAll','playCursorSound','updatePositionCoreEngineShakeOriginal','processPointAnimationRequests','evaded','setupFont','_forcedBattleSys','\x5c}❪SHIFT❫\x5c{','Version','removeAllPointAnimations','Spriteset_Base_updatePosition','createCancelButton','Spriteset_Battle_createEnemies','ColorExpGauge1','isFullDocumentTitle','result','catchUnknownError','NiWeh','_CoreEngineSettings','XParamVocab4','optSideView','vHMHr','clearForcedGameTroopSettingsCoreEngine','setHandler','targetScaleX','buttonAssistText2','statusEquipWindowRect','retrievePointAnimation','MultiKeyFmt','_drawTextBody','Bitmap_fillRect','ParseActorNotetags','REPLACE','$dataMap','setupCustomRateCoreEngine','JuaCo','CLOSE_CURLY_BRACKET','isBusy','bgsVolume','RzNcM','MDF','_inputWindow','ColorTPGauge1','CtllH','_onLoad','LvExpGauge','AdjustAngle','_skillTypeWindow','updateMain','InputRect','description','drawTextTopAligned','isCancelled','AllTroops','members','nIvDp','Symbol','numberShowButton','buttonAssistWindowButtonRect','Window_Base_drawIcon','JhtaF','_dimmerSprite','_balloonQueue','setBackgroundOpacity','DOWN','SEMICOLON','bgmVolume','Game_Interpreter_command111','isNwjs','JZgeZ','MUBVM','pgiSs','updatePosition','_inputString','_showDevTools','CategoryRect','Graphics','jIWho','Game_Picture_y','getColorDataFromPluginParameters','enable','ojjvn','openness','dimColor1','_effectsContainer','HelpRect','targetX','INOUTQUINT','ImprovedAccuracySystem','buttonAssistOffset1','updateOpacity','Game_Picture_calcEasing','toLocaleString','ExtDisplayedParams','ShopMenu','tlKgo','maxScrollbar','setEnemyAction','TiLfz','NEAREST','ActorBgType','181788CkDAQK','Chance','QoL','_centerCameraCheck','FpXga','enableDigitGrouping','requestPointAnimation','expParams','_stored_tpGaugeColor2','Scene_Item_create','ButtonAssist','BTB','Window_Base_initialize','pan','battlebacks1','VfjLy','optionsWindowRect','drawFace','Game_Map_scrollDown','buttons','makeInputButtonString','VOLUME_UP','WIN_OEM_WSCTRL','xparamPlus2','IconXParam2','_fauxAnimationQueue','MEV','F19','requestFauxAnimation','allTiles','pictureButtons','VkRnf','createPointAnimationQueue','%1%2','textColor','OTB','toString','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','drawActorClass','paramName','showDevTools','DwAAf','maxLevel','HIT','_scene','_context','DIVIDE','Param','_centerElementCoreEngine','IconIndex','destroyScrollBarBitmaps','%1\x0a','_profileWindow','drawGameVersion','image-rendering','anchor','RtLYY','ExtractStrFromTroop','ParseTilesetNotetags','pop','KeyUnlisted','kTUeh','ogdju','RepositionEnemies130','itemWindowRect','events','DataManager_setupNewGame','Scene_Map_createSpriteset_detach','deflate','OIpxJ','Y:\x20%1','INOUTEXPO','lIuge','ColorManager_loadWindowskin','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','isEnabled','bitmapHeight','_hideTileShadows','MapOnceParallel','drawCircle','buttonAssistText%1','includes','Game_Map_scrollUp','HTnTd','PositionJS','_editWindow','targetOpacity','ceil','mapId','setupScrollBarBitmap','JeNzl','setLastGamepadUsed','_categoryWindow','isMaskingEnabled','paramBaseAboveLevel99','button','goldWindowRect','TRAIT_PARAM','createTitleButtons','Scene_Options_create','setMoveEasingType','MINUS','sBaqB','faces','_movementDuration','ColorTPGauge2','_phase','ControllerButtons','GREATER_THAN','Scene_Name_onInputOk','Bitmap_strokeRect','alwaysDash','home','_pointAnimationQueue','DOLLAR','BottomButtons','IVdpO','ColorPowerDown','QYJeC','StatusRect','isDying','_muteSound','erasePicture','Input_pollGamepads','seek','string','setEasingType','anglePlus','QUOTE','DiFLg','atbActive','PWFGs','onDatabaseLoaded','WIN_OEM_PA1','Scene_Boot_startNormalGame','jsonToZip','Scene_Base_terminateAnimationClearBugFix','YjaGS','addCommand','INOUTQUAD','removeFauxAnimation','openURL','_repositioned','ActorRect','DCgOt','GrWaP','NUMPAD9','Flat1','pages','vohpN','Class-%1-%2','SystemSetFontSize','split','adjustPictureAntiZoom','_fauxAnimationSprites','FontWidthFix','Padding','paramchangeTextColor','AccuracyBoost','clearZoom','AGSkA','onButtonImageLoad','mZuEj','YVOJS','_pageupButton','_anchor','SideView','processMoveCommand','ARRAYEVAL','retreat','Layer','playLoad','WASD','RepositionEnemies','zIBCc','canUse','updateScrollBarPosition','areButtonsHidden','process_VisuMZ_CoreEngine_Settings','scrollY','Game_Action_itemEva','updateScene','SCALE_MODES','Color','loadWindowskin','ColorSystem','FDR','stencilOp','cZley','setCoreEngineScreenShakeStyle','Scene_Status_create','reserveNewGameCommonEvent','saveViewport','NUMPAD3','BTopm','start','Ywhfh','INQUART','GewWm','setupCoreEasing','EditBgType','runCombinedScrollingTextAsCode','BdrRc','EnableNameInput','_shakeDuration','currencyUnit','Total','gaugeLineHeight','_scrollDuration','PwOcx','SnapshotOpacity','GRD','PAUSE','keyCode','_pagedownButton','_stored_gaugeBackColor','DigitGroupingGaugeSprites','vlefo','nah','Graphics_centerElement','original','Game_Picture_angle','_animationSprites','_action','drawTextEx','name','Game_Interpreter_command355','_offsetX','CIJoi','checkCacheKey','_lastOrigin','DisplayLockX','createFauxAnimationQueue','create','tab','padZero','Window_NameInput_cursorUp','textWidth','Game_Troop_setup','rdxcO','centerX','JGrzz','kSWIi','reservePlayTestNewGameCommonEvent','sVNIn','destroy','yYiph','CAPSLOCK','BarBodyColor','BgFilename2','updatePositionCoreEngine','Scene_Boot_onDatabaseLoaded','INBOUNCE','sellWindowRect','filters','lyobl','areTileShadowsHidden','_maxDigits','roCjS','Script\x20Call\x20Error','rNIHo','F23','_lastScrollBarValues','updateDashToggle','DummyRect','faceWidth','SceneManager_exit','cursorUp','buttonAssistWindowSideRect','drawIconBySize','buttonAssistWindowRect','fWvbi','INELASTIC','AudioChangeBgsPitch','ColorNormal','itemHit','FuoPv','setBackgroundType','DamageColor','Wait','CustomParamAbb','ScreenShake','NUMPAD6','ExportString','vert','Window_ShopSell_isEnabled','getLastUsedGamepadType','updateBgmParameters','smooth','Game_Party_consumeItem','win32','Unnamed','ConvertNumberToString','itypeId','IconSParam6','yScrollLinkedOffset','_commandWindow','DOUBLE_QUOTE','RXPwE','KAHDn','itemLineRect','_shakeSpeed','scrollLeft','repositionCancelButtonSideButtonLayout','IconParam4','isInputting','pressed','INQUINT','UlUlD','open','loadGameImagesCoreEngine','_displayX','vvQih','EkbTt','QRNtl','blockWidth','makeCoreEngineCommandList','_destroyInternalTextures','VisuMZ_2_BattleSystemETB','version','format','Plus1','ShortcutScripts','isTouchedInsideFrame','pageup','max','TCSFQ','successRate','Window_NameInput_cursorPagedown','jsqqz','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','_setupEventHandlers','JmzsD','Game_Picture_show','Basic','GybvF','isExpGaugeDrawn','_stored_systemColor','GpqVv','categoryWindowRect','Plus','titles2','initBasic','DebugConsoleLastControllerID','_realScale','ScreenResolution','src','VboAW','endAction','AnimationPoint','KiogA','DrawItemBackgroundJS','BottomHelp','GoldFontSize','MainMenu','BaseTexture','checkScrollBarBitmap','setSize','ParseWeaponNotetags','bClus','paramRate1','F18','isOptionValid','terminate','setActorHome','kvgbc','updateCoreEasing','NumberBgType','zGsUu','isRepeated','SParamVocab4','setGuard','updateOpen','integer','skills','Game_Actor_levelUp','return\x200','NUMPAD4','ATK','_targetOffsetX','_pictureName','itemHeight','asin','move','_currentBgm','VisuMZ_2_BattleSystemSTB','TRG','ATTN','SParamVocab9','ShowItemBackground','gradientFillRect','Game_Action_updateLastTarget','text%1','_index','Bitmap_clearRect','createPageButtons','%2%1%3','createCustomBackgroundImages','applyEasingAnglePlus','NUMPAD2','KeyboardInput','EQUAL','atypeId','GoldBgType','WIN_OEM_ENLW','XParamVocab5','_numberWindow','NewGameCommonEvent','AutoScrollLockY','EVEUs','END','Game_Picture_move','wWtqn','AVFmK','wait','gaugeRate','Window_Base_drawFace','PDR','createChildSprite','ZmGAl','_windowLayer','tpCostColor','enemy','_onKeyDown','MenuLayout','setActorHomeRepositioned','buttonAssistOffset4','gIZbJ','SEPARATOR','_stored_ctGaugeColor2','application/json','XParamVocab0','movePageButtonSideButtonLayout','ColorPowerUp','charCode','hideButtonFromView','contentsBack','areButtonsOutsideMainUI','Center','BoxMargin','mpColor','drawActorLevel','LEFT','setSideView','InputBgType','NUMPAD1','HELP','MULTIPLY','SAOiI','drawSegment','MkiZu','Zplyj','_pictureCoordinatesMode','exit','buttonAreaHeight','ForceNoPlayTest','FadeSpeed','boxHeight','measureText','PIPE','cursorLeft','data/','EKakB','loadTitle2','CodeJS','SideButtons','vBDFJ','Key%1','TPB\x20ACTIVE','BTestAddedQuantity','FontSize','fadeSpeed','_gamepadWait','bgm','nPgCd','MVOGV','dlXNe','Window_NameInput_cursorRight','NVmFi','_scrollBarHorz','vertJS','_anglePlus','F22','getInputButtonString','cWCZm','SParamVocab7','createFauxAnimationSprite','([\x5c+\x5c-]\x5cd+)([%％])>','paramRateJS','MCR','_targets','SParamVocab0','menuShowButton','rLVAH','mpGaugeColor1','PA1','targetContentsOpacity','get','titles1','HRzjG','setViewport','editWindowRect','FTB','drawRightArrow','Bitmap_gradientFillRect','send','translucentOpacity','〘Scrolling\x20Text〙\x0a','isSceneBattle','Upper\x20Left','setValue','_stored_powerDownColor','drawGameSubtitle','NJSAQ','onKeyDownKeysF6F7','STR','_commonEventLayers','_pointAnimationSprites','paramX','setAnchor','KEEP','makeEncounterCount','rDQMk','touchUI','ColorGaugeBack','processEscape','wholeDuration','GetParamIcon','updateCurrentEvent','initialize','Scene_Map_updateScene','sTEUD','〘Common\x20Event\x20%1:\x20%2〙\x20End','setActionState','_startPlaying','deselect','usableSkills','EncounterRateMinimum','createPointAnimation','Sprite_Button_initialize','MenuBg','cos','_stored_mpCostColor','makeFontBigger','setupCoreEngine','Window_Base_destroyContents','Scene_Map_update','processSoundTimings','MAXHP','makeDocumentTitle','processTouch','xparamRate2','_animation','changeTextColor','isNormalPriority','quit','BmECo','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','〘Show\x20Text〙\x0a','drawGameTitle','processCursorMoveModernControls','processHandling','BlurFilter','defaultInputMode','scaleX','tttlK','INOUTQUART','pendingColor','isMenuButtonAssistEnabled','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','nickname','indexOf','IconParam0','buttonAssistOffset2','setAttack','loadIconBitmap','offColor','processTouchModernControls','ShowScrollBar','ZERO','CLEAR','ojIgt','IconSParam4','VCgAr','opacity','oguko','nextLevelExp','paramValueByName','DimColor2','parseForcedGameTroopSettingsCoreEngine','drawCurrentParam','ARRAYSTRUCT','isTpb','ColorMPGauge1','gPVwm','XUTff','onClick','CommandBgType','substring','IconSParam2','StartID','isItem','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','mqAkp','Manual','LoadMenu','HopoK','onLoad','Game_Picture_initRotation','replace','NBfYO','displayX','_blank','dhZNl','mainAreaBottom','wtypeId','_hp','hide','setWindowPadding','setMainFontSize','PERIOD','_pauseSignSprite','SystemLoadImages','_isButtonHidden','onEscapeSuccess','SellBgType','enter','SaEMs','GroupDigits','VisuMZ_2_BattleSystemBTB','_makeFontNameText','updatePictureSettings','globalAlpha','YWzkM','parameters','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','toLowerCase','XjwKf','ACCEPT','measureTextWidth','showPicture','Enable','ItemPadding','yXVXi','vfpWz','SParamVocab3','cApRX','exec','equips','ValueJS','pos','expGaugeColor2','EISU','contains','tilesetFlags','Window_NumberInput_processDigitChange','isNumpadPressed','attackSkillId','_buttonAssistWindow','default','initCoreEngineScreenShake','blendFunc','Gold','onInputBannedWords','_stored_mpGaugeColor1','F17','redraw','CancelText','_targetY','object','7856130vZpawZ','vertical','_mainSprite','pitch','Sprite_Button_updateOpacity','outbounce','tzsiw','HelpBgType','PTB','_baseTexture','Renderer','updateBgsParameters','vnTUO','targetEvaRate','_refreshPauseSign','fJLKP','isInstanceOfSceneMap','BattleManager_update','sparamFlatBonus','mainAreaTopSideButtonLayout','INOUTCUBIC','stencilFunc','Input_shouldPreventDefault','Linear','scrollbarHeight','IconXParam3','Game_System_initialize','YMEuw','DEF','ozizQ','imageSmoothingEnabled','processKeyboardDigitChange','endAnimation','axes','drawItem','Scene_Menu_create','KANA','connected','RSPsh','Scene_Battle_createCancelButton','buttonAssistText4','hOsaQ','Sprite_Picture_loadBitmap','sparamFlatJS','repositionEnemiesByResolution','ImgLoad','Sprite_Battler_startMove','createScrollBarSprites','iconWidth','VisuMZ_2_BattleSystemPTB','ztrNF','DECIMAL','setHome','ParseArmorNotetags','uidoW','_backSprite2','OptionsBgType','isGamepadAxisMoved','concat','_bgsBuffer','_inputSpecialKeyCode','scrollDown','CRSEL','DashToggleR','Spriteset_Base_update','clearOnceParallelInterpreters','436elTqOh','DEyDY','_cacheScaleY','mirror','DefaultMode','Item-%1-%2','STENCIL_BUFFER_BIT','originalJS','uiAreaHeight','zoQuV','valueOutlineWidth','gRBYF','XParamVocab9','JKYFt','updateFauxAnimations','_updateFilterArea','useDigitGrouping','Skill-%1-%2','NoTileShadows','_onKeyPress','lFIDb','OutlineColorGauge','maxScrollX','WJLOj','NewGameBoot','rrNbT','save','OPEN_BRACKET','_closing','isKeyItem','Window_Base_createContents','RVZmg','Sprite_Gauge_currentValue','_sellWindow','lzwKy','createTroopNote','makeDeepCopy','_stored_hpGaugeColor1','Game_Interpreter_updateWaitMode','nbZLc','IKivy','Window','5108hUAOBx','updateEffekseer','exp','blt','SplitEscape','canEquip','Flat','lpVaY','tgHcu','OBJKc','VisuMZ_2_BattleSystemCTB','F11','turn','current','PieGL','Bitmap_drawTextOutline','dpBfY','ymhbB','processKeyboardEnd','eventsXyNt','TextStr','Game_Interpreter_PluginCommand','CustomParam','getBackgroundOpacity','12865831UrrrFz','onload','bitmapWidth','DigitGroupingStandardText','》Comment《\x0a%1\x0a','Rate','aCdXw','playTestCtrlT','IconXParam1','IconParam3','_battleField','Scene_Battle_createSpritesetFix','_stored_crisisColor','commandWindowRows','cpSuJ','UJhCp','EJbJw','xBwra','removeOnceParallelInterpreter','clearRect','maxBattleMembers','0.00','Bmztb','boxWidth','Game_Map_scrollLeft','system','horizontal','HYPHEN_MINUS','VariableJsBlock','maxLvGaugeColor1','createPointAnimationTargets','ctrlKey','statusParamsWindowRect','CustomParamIcons','gainGold','paintOpacity','SCROLLBAR','ShowButtons','addLoadListener','ParseSkillNotetags','contents','keyboard','numRepeats','BattleSystem','Scene_Battle_createSpriteset','guardSkillId','end','BattleManager_processEscape','visible','isGamepadTriggered','animationId','paramPlusJS','HibsG','baseId','Window_Selectable_processCursorMove','VbFzl','BrLfQ','AgUIS','DETACH_PICTURE_CONTAINER','_cache','randomJS','Graphics_printError','drawParamName','WIN_OEM_FJ_TOUROKU','ptFwo','_centerElement','<%1\x20%2:[\x20]','_commandList','updatePositionCoreEngineShakeHorz','QobeX','sparam','getGamepads','updateLastTarget','update','YsXbJ','horzJS','EPewu','IlEwq','lastAnimationSprite','OUTELASTIC','remove','command355','repeat','Sprite_Picture_updateOrigin','SPACE','ShowDevTools','paramWidth','isAnimationOffsetXMirrored','HRG','ParseStateNotetags','call','createEnemies','prototype','INCIRC','UxPXW','keypress','CommandList','_scaleY','ExportAllMapText','IconSParam3','anchorCoreEasing','destroyCoreEngineMarkedBitmaps','PictureEasingType','updateScrollBars','OpenSpeed','QTvTz','Game_Actor_changeClass','isBottomHelpMode','clearStencil','dashToggle','refreshWithTextCodeSupport','applyCoreEasing','refreshActor','evaluate','characters','TIFKS','ExportCurTroopText','hGvXR','getPointAnimationLayer','inBattle','drawValue','playBgm','ZEtdf','text','jXBsG','forceOutOfPlaytest','ctGaugeColor1','_lastX','scrollRight','alignBottom','KtwZG','getKeyboardInputButtonString','juTIU','markCoreEngineModified','Window_Base_createTextState','CoreEngine','isActor','right','Bitmap_drawText','updateAnchor','GoldOverlap','Input_updateGamepadState','_allTextHeight','VisuMZ_2_BattleSystemOTB','createTextState','centerSprite','createCommandWindow','113404mcqjgW','AnimationMirrorOffset','_stored_normalColor','CyoQW','MRF','_stored_maxLvGaugeColor2','pixelated','vOEQj','cursorDown','hpGaugeColor1','ColorTPCost','FINAL','Game_Event_isCollidedWithEvents','bitmap','INSINE','mqJpA','Sprite_AnimationMV_processTimingData','layoutSettings','levelUpRecovery','F7key','CNT','_stored_mpGaugeColor2','MyyOP','OkText','ItemHeight','rRUJe','Icon','Tilemap_addShadow','jfjmJ','SmartEventCollisionPriority','_targetScaleY','Game_Map_setup','openingSpeed','kCEQp','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','updateMotion','EVA','valueOutlineColor','cthxe','getLevel','ControllerMatches','SystemLoadAudio','updatePointAnimations','DigitGroupingExText','catchNormalError','Bitmap_initialize','fromCharCode','ApplyEasing','exportAllTroopStrings','qGyUn','getCombinedScrollingText','maxItems','jzgAj','parse','removeAllFauxAnimations','%1〘Choice\x20%2〙\x20%3%1','DummyBgType','traitObjects','duration','requestMotion','processAlwaysEscape','allowShiftScrolling','Window_Selectable_itemRect','isHandled','requiredWtypeId1','xparamPlusJS','helpAreaTop','updateMove','paramBase','SctjD','alphabetic','_dummyWindow','onNameOk','loadMapData','Dvlfn','setupNewGame','angle','EnableJS','Settings','offsetY','selectLast','Idqzu','lineHeight','EndingID','_optionsWindow','process_VisuMZ_CoreEngine_Notetags','Window_Selectable_cursorDown','Finish','itemBackColor1','getInputMultiButtonStrings','maxTurns','consumeItem','Szuie','drawBackgroundRect','initMembersCoreEngine','seVolume','ColorDeath','down2','getControllerInputButtonMatch','ENTER_SPECIAL','xbTgZ','PositionX','loadSystem','_duration','EgllT','itemHitImprovedAccuracy','COLON','ARRAYNUM','XRSng','setCommonEvent','TPKeZ','calcEasing','resetTextColor','isWindowMaskingEnabled','getButtonAssistLocation','smallParamFontSize','fillRect','StatusEquipBgType','CzSmM','APXpX','colSpacing','updateData','F16','WIN_OEM_FJ_LOYA','ZFoLz','F14','pictures','Scene_MenuBase_helpAreaTop','playBuzzer','currentClass','process_VisuMZ_CoreEngine_RegExp','sparamRate','storeMapData','easingType','innerWidth','_listWindow','slice','buttonAssistCancel','(\x5cd+\x5c.?\x5cd+)>','eva','AGI','platform','idRwi','\x20Origin:\x20%1','targetScaleY','itemSuccessRate','zeKwX','LevelUpFullMp','startShake','updateOnceParallelInterpreters','BpILa','Scene_Base_terminate','_statusParamsWindow','drawBackground','endBattlerActions','_goldWindow','subject','fontSize','value','targetBackOpacity','Mute','paramFlatBonus','_opening','cVrkB','push','overallWidth','ulfYe','ExtractStrFromMap','GUKZw','checkSubstitute','batch','numberWindowRect','animationShouldMirror','VOLUME_DOWN','INCUBIC','inputWindowRect','stypeId','isActiveTpb','padding','terms','clearCachedKeys','RowSpacing','ButtonFadeSpeed','drawParamText','_statusWindow','PiElV','bodyColor','Sprite_destroy','toUpperCase','Sprite_Gauge_gaugeRate','playCancel','isSideView','_bgmBuffer','kMHpL','MRG','drawActorExpGauge','AntiZoomPictures','_pollGamepads','OpqGi','expGaugeColor1','note','lYUVW','_scrollBarVert','9TrwLVr','EnableMasking','BgType','Origin','updateOrigin','rightArrowWidth','CommonEventID','Enemy-%1-%2','ItemBackColor2','_pictureContainer','OlERr','%1〘Choice\x20Cancel〙%1','_movementWholeDuration','UIUBN','transform','agszR','WIN_OEM_RESET','animationBaseDelay','PositionY','Game_Event_start','font-smooth','RXUIu','WIN_OEM_JUMP','status','rnbUh','CLOSE_BRACKET','CxFta','AnimationID','NPOWV','BarThickness','jXSxh','mainAreaHeightSideButtonLayout','_margin','applyEasing','_storedMapText','fillText','lyJTC','isEventTest','updateRotation','HASH','outlineColorDmg','ZOOM','SkillTypeBgType','NameInputMessage','Scene_MenuBase_createCancelButton','playCursor','TextManager_param','createFauxAnimation','%1:\x20Exit\x20','TTCBa','DigitGroupingLocale','rypFM','sceneTerminationClearEffects','GUDzO','createBackground','Scene_Base_createWindowLayer','isSpecialCode','ExportStrFromAllMaps','vYGfN','overallHeight','isTriggered','PageChange','buttonAssistText3','SubfolderParse','battlerHue','overrideMimeType','EquipMenu','GdCyJ','initialLevel','WIN_OEM_FJ_MASSHOU','ihfYI','target','_image','paramFlat','menu','skillTypeWindowRect','paramRate2','map','log','ParamMax','_backgroundSprite','exKZR','isMapScrollLinked','GET','Window_NameInput_processHandling','_targetAnchor','BTestItems','meVolume','xparamRate','process_VisuMZ_CoreEngine_Functions','TextCodeNicknames','loadSystemImages','drawActorSimpleStatus','nwKHB','_createInternalTextures','ukEuV','WIN_ICO_CLEAR','huoWE','MAXMP','playOk','windowOpacity','Mirror','_cacheScaleX','subtitle','helpWindowRect','onMoveEnd','RepositionActors','picture','_customModified','popScene','NUMPAD7','bind','IconParam7','PdNrY','_onceParallelInterpreters','gZseG','skUtW','Sprite_Animation_processSoundTimings','Game_Picture_scaleX','ESC','_target','CustomParamNames','DisplayLockY','buttonAssistOffset%1','ItemBackColor1','mute','iOYdN','ColSpacing','filterArea','_screenY','YrerT','BACK_SLASH','COMMA','DisplayedParams','itemEva','flush','drawCharacter','RVWDK','HaYfF','MAX_GL_TEXTURES','ngtdI','SceneManager_isGameActive','fillStyle','Fhdxw','needsUpdate','CRI','\x5c}❪TAB❫\x5c{','initVisuMZCoreEngine','_bitmap','BACKSPACE','isGamepadConnected','Window_NameInput_processTouch','NONCONVERT','_battlerName','tileHeight','isRightInputMode','lNuRu','keyRepeatWait','Game_Picture_updateMove','SnbXU','writeText','Scene_Shop_create','PksTT','Control\x20Variables\x20Script\x20Error','_downArrowSprite','isAnimationPlaying','maxLvGaugeColor2','【%1】\x0a','operation','backOpacity','isCollidedWithEvents','fxTiT','Game_Temp_initialize','createKeyJS','Window_NameInput_cursorDown','BasicParameterFormula','statusWindowRect','IconXParam4','shift','StatusBgType','xwcfp','processBack','dSdDX','Brsni','setBattleSystem','setMute','setCoreEngineUpdateWindowBg','CTRL','initMembers','_upArrowSprite','loadPicture','xFqjB','createBuffer','hit','_clickHandler','HVnNQ','CustomParamType','etBxA','mainAreaTop','isPressed','onerror','test','isSceneMap','KOTcv','_colorCache','Window_Gold_refresh','Scene_Skill_create','Hwreo','smoothSelect','_screenX','SwitchActorText','(\x5cd+)([%％])>','PGDN','Name','Graphics_defaultStretchMode','setFrame','sparamPlus2','buyWindowRect','initialBattleSystem','helpAreaTopSideButtonLayout','STENCIL_TEST','yGkit','ENTER','Window_Selectable_drawBackgroundRect','MIN_SAFE_INTEGER','updateKeyText','cursorPageup','JUNJA','PictureFilename','SParameterFormula','EXSEL','render','_updateGamepadState','SParamVocab5','6927599jyMkBU','Game_Action_setAttack','GcyWo','getBattleSystem','animationNextDelay','MAT','paramMaxJS','left','_paramPlus','LESS_THAN','zoomScale','X:\x20%1','skillId','SParamVocab6','XParamVocab6','_defaultStretchMode','param','OnLoadJS','drawGoldItemStyle','ExportStrFromAllTroops','Spriteset_Base_initialize','gold','Bitmap_resize','cbqiT','startMove','Armor-%1-%2','isMagical','GoldIcon','CwMKF','round','AutoStretch','xWMOj','gRjRL','Type','_stored_expGaugeColor2','kgxgq'];_0x1968=function(){return _0x294d24;};return _0x1968();}StorageManager[_0x4535e7(0x48a)]=function(_0xf92c79){return new Promise((_0x54b8ba,_0x30ff0d)=>{const _0x447fd4=_0x5575;try{const _0x5d1449=pako[_0x447fd4(0x447)](_0xf92c79,{'to':_0x447fd4(0x480),'level':0x1});if(_0x5d1449[_0x447fd4(0x2ec)]>=0xc350){}_0x54b8ba(_0x5d1449);}catch(_0x227bde){_0x447fd4(0x36b)!==_0x447fd4(0x36b)?(_0x26ebec[_0x447fd4(0x7ac)][_0x447fd4(0x896)][_0x447fd4(0x77f)](this),_0x1e51b7=this):_0x30ff0d(_0x227bde);}});},TextManager[_0x4535e7(0x341)]=['','','','CANCEL','','',_0x4535e7(0x5c1),'',_0x4535e7(0x918),_0x4535e7(0x164),'','',_0x4535e7(0x647),_0x4535e7(0x961),_0x4535e7(0x81b),'',_0x4535e7(0x24e),_0x4535e7(0x93e),_0x4535e7(0x197),_0x4535e7(0x4d7),_0x4535e7(0x4fa),_0x4535e7(0x6c5),_0x4535e7(0x68f),_0x4535e7(0x966),_0x4535e7(0x7c3),'HANJA','',_0x4535e7(0x8fa),'CONVERT',_0x4535e7(0x91b),_0x4535e7(0x681),'MODECHANGE',_0x4535e7(0x779),'PGUP',_0x4535e7(0x957),_0x4535e7(0x59d),'HOME',_0x4535e7(0x5bd),'UP',_0x4535e7(0x2e0),_0x4535e7(0x3de),_0x4535e7(0x34b),'PRINT',_0x4535e7(0x23b),_0x4535e7(0x17b),'INSERT',_0x4535e7(0x38e),'','0','1','2','3','4','5','6','7','8','9',_0x4535e7(0x822),_0x4535e7(0x3df),_0x4535e7(0x976),_0x4535e7(0x9d0),_0x4535e7(0x46f),'QUESTION_MARK','AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x4535e7(0x154),'','CONTEXT_MENU','','SLEEP',_0x4535e7(0x9fb),_0x4535e7(0x5c0),_0x4535e7(0x592),_0x4535e7(0x4c4),_0x4535e7(0x57c),_0x4535e7(0x259),_0x4535e7(0x51d),_0x4535e7(0x8f1),'NUMPAD8',_0x4535e7(0x495),_0x4535e7(0x5c2),'ADD',_0x4535e7(0x5af),_0x4535e7(0x203),_0x4535e7(0x6d4),_0x4535e7(0x431),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x4535e7(0x9d3),_0x4535e7(0x718),_0x4535e7(0x206),'F13',_0x4535e7(0x835),_0x4535e7(0x9ad),_0x4535e7(0x832),_0x4535e7(0x69c),_0x4535e7(0x56c),_0x4535e7(0x41e),_0x4535e7(0x387),'F21',_0x4535e7(0x5e5),_0x4535e7(0x508),_0x4535e7(0x29b),'','','','','','','','','NUM_LOCK',_0x4535e7(0x1ac),_0x4535e7(0x27e),_0x4535e7(0x8c8),_0x4535e7(0x764),_0x4535e7(0x833),'WIN_OEM_FJ_ROYA','','','','','','','','','',_0x4535e7(0x33b),'EXCLAMATION',_0x4535e7(0x52c),_0x4535e7(0x8aa),_0x4535e7(0x475),'PERCENT',_0x4535e7(0x2a2),_0x4535e7(0x297),'OPEN_PAREN','CLOSE_PAREN',_0x4535e7(0x369),_0x4535e7(0x2b5),_0x4535e7(0x5ce),_0x4535e7(0x740),_0x4535e7(0x9af),_0x4535e7(0x3c2),'TILDE','','','','','VOLUME_MUTE',_0x4535e7(0x865),_0x4535e7(0x418),'','',_0x4535e7(0x3df),_0x4535e7(0x9d0),_0x4535e7(0x907),_0x4535e7(0x468),_0x4535e7(0x66f),'SLASH',_0x4535e7(0x252),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x4535e7(0x6fe),_0x4535e7(0x906),_0x4535e7(0x89c),_0x4535e7(0x483),'','META',_0x4535e7(0x9cf),'',_0x4535e7(0x2d7),'WIN_ICO_00','',_0x4535e7(0x8e3),'','',_0x4535e7(0x893),_0x4535e7(0x899),_0x4535e7(0x488),_0x4535e7(0x1e9),'WIN_OEM_PA3',_0x4535e7(0x419),_0x4535e7(0x221),_0x4535e7(0xa26),'WIN_OEM_FINISH','WIN_OEM_COPY','WIN_OEM_AUTO',_0x4535e7(0x597),_0x4535e7(0x273),_0x4535e7(0x586),_0x4535e7(0x6df),_0x4535e7(0x969),'EREOF','PLAY',_0x4535e7(0x8ac),'',_0x4535e7(0x5f2),'WIN_OEM_CLEAR',''],TextManager['buttonAssistOk']=VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x806)][_0x4535e7(0x40d)][_0x4535e7(0x7cf)],TextManager['buttonAssistCancel']=VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x806)][_0x4535e7(0x40d)][_0x4535e7(0x69e)],TextManager['buttonAssistSwitch']=VisuMZ[_0x4535e7(0x7ac)]['Settings'][_0x4535e7(0x40d)][_0x4535e7(0x955)],VisuMZ[_0x4535e7(0x7ac)]['TextManager_param']=TextManager[_0x4535e7(0x97d)],TextManager[_0x4535e7(0x97d)]=function(_0x42dc77){const _0x4e7ac3=_0x4535e7;return typeof _0x42dc77==='number'?'LzrsQ'!==_0x4e7ac3(0x85e)?VisuMZ['CoreEngine'][_0x4e7ac3(0x8b1)][_0x4e7ac3(0x77f)](this,_0x42dc77):_0x42d9f1[_0x4e7ac3(0x843)]-0.05:_0x4e7ac3(0x771)===_0x4e7ac3(0x65e)?!![]:this[_0x4e7ac3(0x42a)](_0x42dc77);},TextManager[_0x4535e7(0x42a)]=function(_0x538136){const _0x11b8b6=_0x4535e7;_0x538136=String(_0x538136||'')['toUpperCase']();const _0x198bc2=VisuMZ['CoreEngine'][_0x11b8b6(0x806)][_0x11b8b6(0x432)];if(_0x538136===_0x11b8b6(0x627))return $dataSystem['terms'][_0x11b8b6(0x26d)][0x0];if(_0x538136===_0x11b8b6(0x8e5))return $dataSystem[_0x11b8b6(0x86b)][_0x11b8b6(0x26d)][0x1];if(_0x538136===_0x11b8b6(0x57d))return $dataSystem['terms']['params'][0x2];if(_0x538136===_0x11b8b6(0x6bd))return $dataSystem[_0x11b8b6(0x86b)][_0x11b8b6(0x26d)][0x3];if(_0x538136==='MAT')return $dataSystem[_0x11b8b6(0x86b)][_0x11b8b6(0x26d)][0x4];if(_0x538136===_0x11b8b6(0x3c6))return $dataSystem[_0x11b8b6(0x86b)]['params'][0x5];if(_0x538136==='AGI')return $dataSystem[_0x11b8b6(0x86b)][_0x11b8b6(0x26d)][0x6];if(_0x538136===_0x11b8b6(0x339))return $dataSystem[_0x11b8b6(0x86b)][_0x11b8b6(0x26d)][0x7];if(_0x538136===_0x11b8b6(0x42e))return _0x198bc2[_0x11b8b6(0x5b2)];if(_0x538136===_0x11b8b6(0x7dc))return _0x198bc2[_0x11b8b6(0x36c)];if(_0x538136===_0x11b8b6(0x914))return _0x198bc2[_0x11b8b6(0x321)];if(_0x538136==='CEV')return _0x198bc2[_0x11b8b6(0x296)];if(_0x538136===_0x11b8b6(0x41d))return _0x198bc2[_0x11b8b6(0x3b1)];if(_0x538136===_0x11b8b6(0x7bc))return _0x198bc2[_0x11b8b6(0x598)];if(_0x538136==='CNT')return _0x198bc2[_0x11b8b6(0x97b)];if(_0x538136===_0x11b8b6(0x77d))return _0x198bc2[_0x11b8b6(0x274)];if(_0x538136===_0x11b8b6(0x87a))return _0x198bc2['XParamVocab8'];if(_0x538136===_0x11b8b6(0x585))return _0x198bc2[_0x11b8b6(0x6ef)];if(_0x538136===_0x11b8b6(0x298))return _0x198bc2[_0x11b8b6(0x5ee)];if(_0x538136===_0x11b8b6(0x4d6))return _0x198bc2[_0x11b8b6(0x1ff)];if(_0x538136==='REC')return _0x198bc2['SParamVocab2'];if(_0x538136===_0x11b8b6(0x2e8))return _0x198bc2[_0x11b8b6(0x688)];if(_0x538136===_0x11b8b6(0x5ec))return _0x198bc2[_0x11b8b6(0x575)];if(_0x538136===_0x11b8b6(0x26c))return _0x198bc2[_0x11b8b6(0x96c)];if(_0x538136===_0x11b8b6(0x5a4))return _0x198bc2[_0x11b8b6(0x97a)];if(_0x538136==='MDR')return _0x198bc2[_0x11b8b6(0x5e8)];if(_0x538136==='FDR')return _0x198bc2[_0x11b8b6(0x2ba)];if(_0x538136==='EXR')return _0x198bc2[_0x11b8b6(0x587)];if(VisuMZ['CoreEngine']['CustomParamNames'][_0x538136])return VisuMZ['CoreEngine'][_0x11b8b6(0x8fc)][_0x538136];return'';},TextManager['getInputButtonString']=function(_0x40e343){const _0x2bd70a=_0x4535e7,_0x433156=Input[_0x2bd70a(0x521)]();return _0x433156===_0x2bd70a(0x22e)?this[_0x2bd70a(0x7a8)](_0x40e343):this['getControllerInputButtonString'](_0x433156,_0x40e343);},TextManager[_0x4535e7(0x7a8)]=function(_0x2c88b0){const _0x13e749=_0x4535e7,_0x4f8d32=VisuMZ[_0x13e749(0x7ac)][_0x13e749(0x806)][_0x13e749(0x40d)][_0x13e749(0x711)];if(!_0x4f8d32){if('ChmdT'===_0x13e749(0x29f)){_0x530334[_0x13e749(0x7ac)]['ParseEnemyNotetags']['call'](this,_0x2e2ace),_0x5645a8[_0x13e749(0x223)]=0x1;const _0x7a16f7=_0x591f15['note'];if(_0x7a16f7[_0x13e749(0x27c)](/<LEVEL:[ ](\d+)>/i))_0x132a60[_0x13e749(0x223)]=_0x47d6ca(_0x38d807['$1']);if(_0x7a16f7[_0x13e749(0x27c)](/<MAXHP:[ ](\d+)>/i))_0x385a3f[_0x13e749(0x26d)][0x0]=_0x39d4c9(_0x3201fa['$1']);if(_0x7a16f7[_0x13e749(0x27c)](/<MAXMP:[ ](\d+)>/i))_0x4cf49b[_0x13e749(0x26d)][0x1]=_0x39e647(_0xdf6616['$1']);if(_0x7a16f7[_0x13e749(0x27c)](/<ATK:[ ](\d+)>/i))_0x18817f['params'][0x2]=_0x530955(_0x2ddec6['$1']);if(_0x7a16f7[_0x13e749(0x27c)](/<DEF:[ ](\d+)>/i))_0x1bdf43[_0x13e749(0x26d)][0x3]=_0x5992d1(_0x3a6741['$1']);if(_0x7a16f7[_0x13e749(0x27c)](/<MAT:[ ](\d+)>/i))_0x28e061['params'][0x4]=_0x2cc7ba(_0xdf2f54['$1']);if(_0x7a16f7['match'](/<MDF:[ ](\d+)>/i))_0x523221[_0x13e749(0x26d)][0x5]=_0x109c44(_0x2b68bb['$1']);if(_0x7a16f7[_0x13e749(0x27c)](/<AGI:[ ](\d+)>/i))_0x3967ee['params'][0x6]=_0x193f77(_0x16a2f2['$1']);if(_0x7a16f7['match'](/<LUK:[ ](\d+)>/i))_0x1eccf9[_0x13e749(0x26d)][0x7]=_0x1ce7df(_0x20668a['$1']);if(_0x7a16f7[_0x13e749(0x27c)](/<EXP:[ ](\d+)>/i))_0x6959b4[_0x13e749(0x70f)]=_0x43d8ce(_0x420c94['$1']);if(_0x7a16f7[_0x13e749(0x27c)](/<GOLD:[ ](\d+)>/i))_0x4f497c[_0x13e749(0x982)]=_0x4ad7d7(_0x5c9340['$1']);}else{if(_0x2c88b0==='cancel')_0x2c88b0=_0x13e749(0x1ce);if(_0x2c88b0===_0x13e749(0x8cd))_0x2c88b0=_0x13e749(0x1ce);}}let _0x4e8554=[];for(let _0x2d7c1b in Input[_0x13e749(0x200)]){_0x2d7c1b=Number(_0x2d7c1b);if(_0x2d7c1b>=0x60&&_0x2d7c1b<=0x69)continue;if([0x12,0x20][_0x13e749(0x454)](_0x2d7c1b))continue;if(_0x2c88b0===Input[_0x13e749(0x200)][_0x2d7c1b]){if(_0x13e749(0x1ae)!==_0x13e749(0x1c2))_0x4e8554[_0x13e749(0x85c)](_0x2d7c1b);else{if(_0x47442f&&_0xc55845[_0x13e749(0x6c6)]){if(this[_0x13e749(0x316)](_0x4a4915))return!![];if(this[_0x13e749(0x6da)](_0x143c41))return!![];}}}}for(let _0x5a05f0=0x0;_0x5a05f0<_0x4e8554[_0x13e749(0x2ec)];_0x5a05f0++){if('PdNrY'===_0x13e749(0x8f4))_0x4e8554[_0x5a05f0]=TextManager[_0x13e749(0x341)][_0x4e8554[_0x5a05f0]];else return 0x0;}return this[_0x13e749(0x417)](_0x4e8554);},TextManager[_0x4535e7(0x417)]=function(_0x11dc59){const _0x2afe29=_0x4535e7,_0x202f51=VisuMZ[_0x2afe29(0x7ac)][_0x2afe29(0x806)][_0x2afe29(0x40d)],_0x19a64a=_0x202f51[_0x2afe29(0x43f)],_0x196da8=_0x11dc59['pop'](),_0x1fb830=_0x2afe29(0x5d6)['format'](_0x196da8);return _0x202f51[_0x1fb830]?_0x202f51[_0x1fb830]:_0x19a64a[_0x2afe29(0x543)](_0x196da8);},TextManager[_0x4535e7(0x811)]=function(_0x4caaba,_0x2c391c){const _0x25be0d=_0x4535e7,_0x1f0fa7=VisuMZ['CoreEngine'][_0x25be0d(0x806)][_0x25be0d(0x40d)],_0x56fc9a=_0x1f0fa7[_0x25be0d(0x3ba)],_0x20f8e3=this[_0x25be0d(0x5e6)](_0x4caaba),_0x1d67bc=this[_0x25be0d(0x5e6)](_0x2c391c);return _0x56fc9a['format'](_0x20f8e3,_0x1d67bc);},TextManager[_0x4535e7(0x28c)]=function(_0x52dfff,_0x40f0ae){const _0x58cd67=_0x4535e7,_0x172c77=_0x52dfff[_0x58cd67(0x67f)]()[_0x58cd67(0x24d)](),_0x2e2c94=VisuMZ[_0x58cd67(0x7ac)]['ControllerButtons'][_0x172c77];if(!_0x2e2c94)return this[_0x58cd67(0x81a)](_0x52dfff,_0x40f0ae);return _0x2e2c94[_0x40f0ae]||this[_0x58cd67(0x7a8)](_0x52dfff,_0x40f0ae);},TextManager[_0x4535e7(0x81a)]=function(_0xd9e72d,_0x3a1ef3){const _0x10a5b5=_0x4535e7,_0x24ec32=_0xd9e72d['toLowerCase']()[_0x10a5b5(0x24d)]();for(const _0x1e2eb8 in VisuMZ[_0x10a5b5(0x7ac)][_0x10a5b5(0x7e0)]){if(_0x10a5b5(0x8b4)!==_0x10a5b5(0x8b4))_0x5436b6[_0x10a5b5(0x8d1)]('Conditional\x20Branch\x20Script\x20Error'),_0x1b22d9[_0x10a5b5(0x8d1)](_0x5ab73e);else{if(_0x24ec32[_0x10a5b5(0x454)](_0x1e2eb8)){const _0x581a73=VisuMZ[_0x10a5b5(0x7ac)][_0x10a5b5(0x7e0)][_0x1e2eb8],_0x2b8242=VisuMZ['CoreEngine'][_0x10a5b5(0x46e)][_0x581a73];return _0x2b8242[_0x3a1ef3]||this[_0x10a5b5(0x7a8)](_0x3a1ef3);}}}return this['getKeyboardInputButtonString'](_0x3a1ef3);},VisuMZ[_0x4535e7(0x7ac)]['ColorManager_loadWindowskin']=ColorManager['loadWindowskin'],ColorManager[_0x4535e7(0x4bb)]=function(){const _0x435e25=_0x4535e7;VisuMZ['CoreEngine'][_0x435e25(0x44c)][_0x435e25(0x77f)](this),this[_0x435e25(0x94f)]=this[_0x435e25(0x94f)]||{};},ColorManager['getColorDataFromPluginParameters']=function(_0x332be3,_0x802963){const _0x1bc7f4=_0x4535e7;return _0x802963=String(_0x802963),this[_0x1bc7f4(0x94f)]=this['_colorCache']||{},_0x802963[_0x1bc7f4(0x27c)](/#(.*)/i)?this['_colorCache'][_0x332be3]=_0x1bc7f4(0x25e)[_0x1bc7f4(0x543)](String(RegExp['$1'])):this[_0x1bc7f4(0x94f)][_0x332be3]=this[_0x1bc7f4(0x425)](Number(_0x802963)),this['_colorCache'][_0x332be3];},ColorManager[_0x4535e7(0x99a)]=function(_0x3737f1){const _0xda3e56=_0x4535e7;_0x3737f1=String(_0x3737f1);if(_0x3737f1[_0xda3e56(0x27c)](/#(.*)/i)){if(_0xda3e56(0x4a3)==='AGSkA')return'#%1'[_0xda3e56(0x543)](String(RegExp['$1']));else this[_0xda3e56(0x3a4)]=_0xda3e56(0x6a9);}else{if('xwqpX'!==_0xda3e56(0x9c3))this[_0xda3e56(0x9d1)]['y']=0x0;else return this[_0xda3e56(0x425)](Number(_0x3737f1));}},ColorManager[_0x4535e7(0x86c)]=function(){const _0x4523fd=_0x4535e7;this[_0x4523fd(0x94f)]={};},ColorManager['normalColor']=function(){const _0x3a50b1=_0x4535e7,_0x53feef=_0x3a50b1(0x7ba);this[_0x3a50b1(0x94f)]=this[_0x3a50b1(0x94f)]||{};if(this['_colorCache'][_0x53feef])return this[_0x3a50b1(0x94f)][_0x53feef];const _0x555ea7=VisuMZ[_0x3a50b1(0x7ac)][_0x3a50b1(0x806)]['Color'][_0x3a50b1(0x515)];return this[_0x3a50b1(0x3ed)](_0x53feef,_0x555ea7);},ColorManager[_0x4535e7(0x9b4)]=function(){const _0x388600=_0x4535e7,_0x585f3=_0x388600(0x554);this[_0x388600(0x94f)]=this[_0x388600(0x94f)]||{};if(this[_0x388600(0x94f)][_0x585f3])return this['_colorCache'][_0x585f3];const _0x266ee9=VisuMZ[_0x388600(0x7ac)][_0x388600(0x806)][_0x388600(0x4ba)][_0x388600(0x4bc)];return this[_0x388600(0x3ed)](_0x585f3,_0x266ee9);},ColorManager[_0x4535e7(0x330)]=function(){const _0x2af987=_0x4535e7,_0x3e9f72=_0x2af987(0x731);this[_0x2af987(0x94f)]=this['_colorCache']||{};if(this[_0x2af987(0x94f)][_0x3e9f72])return this[_0x2af987(0x94f)][_0x3e9f72];const _0x495cce=VisuMZ['CoreEngine']['Settings'][_0x2af987(0x4ba)][_0x2af987(0x1ca)];return this['getColorDataFromPluginParameters'](_0x3e9f72,_0x495cce);},ColorManager['deathColor']=function(){const _0x1fe8e2=_0x4535e7,_0x3678d1=_0x1fe8e2(0x1d7);this[_0x1fe8e2(0x94f)]=this[_0x1fe8e2(0x94f)]||{};if(this[_0x1fe8e2(0x94f)][_0x3678d1])return this[_0x1fe8e2(0x94f)][_0x3678d1];const _0x1bc019=VisuMZ[_0x1fe8e2(0x7ac)][_0x1fe8e2(0x806)][_0x1fe8e2(0x4ba)][_0x1fe8e2(0x818)];return this['getColorDataFromPluginParameters'](_0x3678d1,_0x1bc019);},ColorManager[_0x4535e7(0x345)]=function(){const _0x1e9f66=_0x4535e7,_0x51cd10=_0x1e9f66(0x4da);this[_0x1e9f66(0x94f)]=this[_0x1e9f66(0x94f)]||{};if(this[_0x1e9f66(0x94f)][_0x51cd10])return this[_0x1e9f66(0x94f)][_0x51cd10];const _0x5576b8=VisuMZ[_0x1e9f66(0x7ac)][_0x1e9f66(0x806)][_0x1e9f66(0x4ba)][_0x1e9f66(0x60f)];return this[_0x1e9f66(0x3ed)](_0x51cd10,_0x5576b8);},ColorManager[_0x4535e7(0x7c1)]=function(){const _0x4ffaf6=_0x4535e7,_0x5c9634=_0x4ffaf6(0x708);this[_0x4ffaf6(0x94f)]=this[_0x4ffaf6(0x94f)]||{};if(this[_0x4ffaf6(0x94f)][_0x5c9634])return this['_colorCache'][_0x5c9634];const _0x5a4e2f=VisuMZ[_0x4ffaf6(0x7ac)][_0x4ffaf6(0x806)][_0x4ffaf6(0x4ba)]['ColorHPGauge1'];return this['getColorDataFromPluginParameters'](_0x5c9634,_0x5a4e2f);},ColorManager['hpGaugeColor2']=function(){const _0x2fca19=_0x4535e7,_0x17a25d='_stored_hpGaugeColor2';this[_0x2fca19(0x94f)]=this[_0x2fca19(0x94f)]||{};if(this[_0x2fca19(0x94f)][_0x17a25d])return this[_0x2fca19(0x94f)][_0x17a25d];const _0x1443f3=VisuMZ[_0x2fca19(0x7ac)][_0x2fca19(0x806)]['Color']['ColorHPGauge2'];return this[_0x2fca19(0x3ed)](_0x17a25d,_0x1443f3);},ColorManager[_0x4535e7(0x5f1)]=function(){const _0x5736cf=_0x4535e7,_0x2efd3b=_0x5736cf(0x69b);this[_0x5736cf(0x94f)]=this[_0x5736cf(0x94f)]||{};if(this[_0x5736cf(0x94f)][_0x2efd3b])return this['_colorCache'][_0x2efd3b];const _0x2de755=VisuMZ['CoreEngine'][_0x5736cf(0x806)][_0x5736cf(0x4ba)][_0x5736cf(0x654)];return this[_0x5736cf(0x3ed)](_0x2efd3b,_0x2de755);},ColorManager[_0x4535e7(0x23d)]=function(){const _0xd90dba=_0x4535e7,_0xfcecf9=_0xd90dba(0x7cd);this[_0xd90dba(0x94f)]=this[_0xd90dba(0x94f)]||{};if(this[_0xd90dba(0x94f)][_0xfcecf9])return this[_0xd90dba(0x94f)][_0xfcecf9];const _0xbfaff3=VisuMZ[_0xd90dba(0x7ac)][_0xd90dba(0x806)][_0xd90dba(0x4ba)]['ColorMPGauge2'];return this['getColorDataFromPluginParameters'](_0xfcecf9,_0xbfaff3);},ColorManager[_0x4535e7(0x1f3)]=function(){const _0x20d452=_0x4535e7,_0x1a4ce7=_0x20d452(0x621);this[_0x20d452(0x94f)]=this['_colorCache']||{};if(this[_0x20d452(0x94f)][_0x1a4ce7])return this[_0x20d452(0x94f)][_0x1a4ce7];const _0x3515cf=VisuMZ[_0x20d452(0x7ac)][_0x20d452(0x806)][_0x20d452(0x4ba)][_0x20d452(0x323)];return this['getColorDataFromPluginParameters'](_0x1a4ce7,_0x3515cf);},ColorManager['powerUpColor']=function(){const _0x15c781=_0x4535e7,_0x5d2333=_0x15c781(0x1b6);this[_0x15c781(0x94f)]=this[_0x15c781(0x94f)]||{};if(this[_0x15c781(0x94f)][_0x5d2333])return this['_colorCache'][_0x5d2333];const _0x57437f=VisuMZ[_0x15c781(0x7ac)][_0x15c781(0x806)][_0x15c781(0x4ba)][_0x15c781(0x5b4)];return this['getColorDataFromPluginParameters'](_0x5d2333,_0x57437f);},ColorManager['powerDownColor']=function(){const _0x10236e=_0x4535e7,_0x2263d2='_stored_powerDownColor';this[_0x10236e(0x94f)]=this[_0x10236e(0x94f)]||{};if(this[_0x10236e(0x94f)][_0x2263d2])return this[_0x10236e(0x94f)][_0x2263d2];const _0x1f4d88=VisuMZ[_0x10236e(0x7ac)][_0x10236e(0x806)][_0x10236e(0x4ba)][_0x10236e(0x478)];return this[_0x10236e(0x3ed)](_0x2263d2,_0x1f4d88);},ColorManager[_0x4535e7(0x7a3)]=function(){const _0x3d1aef=_0x4535e7,_0x3768d8=_0x3d1aef(0x266);this['_colorCache']=this[_0x3d1aef(0x94f)]||{};if(this[_0x3d1aef(0x94f)][_0x3768d8])return this[_0x3d1aef(0x94f)][_0x3768d8];const _0x483fcb=VisuMZ[_0x3d1aef(0x7ac)][_0x3d1aef(0x806)][_0x3d1aef(0x4ba)][_0x3d1aef(0x21f)];return this[_0x3d1aef(0x3ed)](_0x3768d8,_0x483fcb);},ColorManager[_0x4535e7(0x327)]=function(){const _0x5d928f=_0x4535e7,_0x265f0a=_0x5d928f(0x5b0);this[_0x5d928f(0x94f)]=this[_0x5d928f(0x94f)]||{};if(this[_0x5d928f(0x94f)][_0x265f0a])return this['_colorCache'][_0x265f0a];const _0x4cc2e0=VisuMZ[_0x5d928f(0x7ac)][_0x5d928f(0x806)][_0x5d928f(0x4ba)][_0x5d928f(0x1bb)];return this[_0x5d928f(0x3ed)](_0x265f0a,_0x4cc2e0);},ColorManager['tpGaugeColor1']=function(){const _0x3f7f38=_0x4535e7,_0xa744b='_stored_tpGaugeColor1';this[_0x3f7f38(0x94f)]=this[_0x3f7f38(0x94f)]||{};if(this['_colorCache'][_0xa744b])return this[_0x3f7f38(0x94f)][_0xa744b];const _0x2c8a35=VisuMZ['CoreEngine'][_0x3f7f38(0x806)][_0x3f7f38(0x4ba)][_0x3f7f38(0x3c8)];return this[_0x3f7f38(0x3ed)](_0xa744b,_0x2c8a35);},ColorManager[_0x4535e7(0x1b3)]=function(){const _0x54fe94=_0x4535e7,_0x3d95bb='_stored_tpGaugeColor2';this[_0x54fe94(0x94f)]=this[_0x54fe94(0x94f)]||{};if(this['_colorCache'][_0x3d95bb])return this[_0x54fe94(0x94f)][_0x3d95bb];const _0x42b666=VisuMZ['CoreEngine'][_0x54fe94(0x806)][_0x54fe94(0x4ba)][_0x54fe94(0x46c)];return this[_0x54fe94(0x3ed)](_0x3d95bb,_0x42b666);},ColorManager[_0x4535e7(0x5a8)]=function(){const _0x9e9575=_0x4535e7,_0x42b8b3=_0x9e9575(0xa29);this[_0x9e9575(0x94f)]=this[_0x9e9575(0x94f)]||{};if(this[_0x9e9575(0x94f)][_0x42b8b3])return this['_colorCache'][_0x42b8b3];const _0x3e1d6e=VisuMZ[_0x9e9575(0x7ac)][_0x9e9575(0x806)][_0x9e9575(0x4ba)][_0x9e9575(0x7c2)];return this[_0x9e9575(0x3ed)](_0x42b8b3,_0x3e1d6e);},ColorManager[_0x4535e7(0x63a)]=function(){const _0x249545=_0x4535e7,_0x54aa84=_0x249545(0x23a);this[_0x249545(0x94f)]=this[_0x249545(0x94f)]||{};if(this['_colorCache'][_0x54aa84])return this['_colorCache'][_0x54aa84];const _0x458541=VisuMZ[_0x249545(0x7ac)][_0x249545(0x806)]['Color'][_0x249545(0x7c2)];return this['getColorDataFromPluginParameters'](_0x54aa84,_0x458541);},ColorManager[_0x4535e7(0x87f)]=function(){const _0x45eb51=_0x4535e7,_0x43d99c='_stored_expGaugeColor1';this[_0x45eb51(0x94f)]=this[_0x45eb51(0x94f)]||{};if(this[_0x45eb51(0x94f)][_0x43d99c])return this[_0x45eb51(0x94f)][_0x43d99c];const _0x32b1fc=VisuMZ[_0x45eb51(0x7ac)][_0x45eb51(0x806)]['Color'][_0x45eb51(0x3ab)];return this['getColorDataFromPluginParameters'](_0x43d99c,_0x32b1fc);},ColorManager[_0x4535e7(0x68e)]=function(){const _0x4db97d=_0x4535e7,_0x183b5a=_0x4db97d(0x98f);this['_colorCache']=this['_colorCache']||{};if(this[_0x4db97d(0x94f)][_0x183b5a])return this[_0x4db97d(0x94f)][_0x183b5a];const _0xdd6af5=VisuMZ[_0x4db97d(0x7ac)][_0x4db97d(0x806)][_0x4db97d(0x4ba)]['ColorExpGauge2'];return this[_0x4db97d(0x3ed)](_0x183b5a,_0xdd6af5);},ColorManager[_0x4535e7(0x742)]=function(){const _0x4de4ff=_0x4535e7,_0x8b4f88='_stored_maxLvGaugeColor1';this[_0x4de4ff(0x94f)]=this[_0x4de4ff(0x94f)]||{};if(this[_0x4de4ff(0x94f)][_0x8b4f88])return this[_0x4de4ff(0x94f)][_0x8b4f88];const _0x1088e5=VisuMZ[_0x4de4ff(0x7ac)][_0x4de4ff(0x806)][_0x4de4ff(0x4ba)][_0x4de4ff(0x2ed)];return this[_0x4de4ff(0x3ed)](_0x8b4f88,_0x1088e5);},ColorManager[_0x4535e7(0x929)]=function(){const _0x35cbd6=_0x4535e7,_0x204ca4=_0x35cbd6(0x7bd);this[_0x35cbd6(0x94f)]=this['_colorCache']||{};if(this['_colorCache'][_0x204ca4])return this[_0x35cbd6(0x94f)][_0x204ca4];const _0x3e7a27=VisuMZ[_0x35cbd6(0x7ac)][_0x35cbd6(0x806)]['Color'][_0x35cbd6(0x24c)];return this[_0x35cbd6(0x3ed)](_0x204ca4,_0x3e7a27);},ColorManager[_0x4535e7(0x29c)]=function(_0x4435bb){const _0x39816c=_0x4535e7;return VisuMZ[_0x39816c(0x7ac)]['Settings'][_0x39816c(0x4ba)][_0x39816c(0x9ba)][_0x39816c(0x77f)](this,_0x4435bb);},ColorManager[_0x4535e7(0x5bb)]=function(_0x4c8524){const _0x320e1e=_0x4535e7;return VisuMZ[_0x320e1e(0x7ac)][_0x320e1e(0x806)]['Color'][_0x320e1e(0x19e)]['call'](this,_0x4c8524);},ColorManager['tpColor']=function(_0x1e39ce){const _0x2e94b0=_0x4535e7;return VisuMZ[_0x2e94b0(0x7ac)]['Settings'][_0x2e94b0(0x4ba)][_0x2e94b0(0x25b)][_0x2e94b0(0x77f)](this,_0x1e39ce);},ColorManager['paramchangeTextColor']=function(_0x5f4ddf){const _0x3a6ec3=_0x4535e7;return VisuMZ[_0x3a6ec3(0x7ac)][_0x3a6ec3(0x806)][_0x3a6ec3(0x4ba)]['ParamChange']['call'](this,_0x5f4ddf);},ColorManager['damageColor']=function(_0x34a8b5){const _0x2137dd=_0x4535e7;return VisuMZ['CoreEngine'][_0x2137dd(0x806)][_0x2137dd(0x4ba)][_0x2137dd(0x519)][_0x2137dd(0x77f)](this,_0x34a8b5);},ColorManager[_0x4535e7(0x262)]=function(){const _0x54c31b=_0x4535e7;return VisuMZ[_0x54c31b(0x7ac)][_0x54c31b(0x806)][_0x54c31b(0x4ba)][_0x54c31b(0x32c)];},ColorManager[_0x4535e7(0x8ab)]=function(){const _0x3ee23f=_0x4535e7;return VisuMZ[_0x3ee23f(0x7ac)][_0x3ee23f(0x806)][_0x3ee23f(0x4ba)]['OutlineColorDmg']||_0x3ee23f(0x218);},ColorManager[_0x4535e7(0x9c0)]=function(){const _0x490ccd=_0x4535e7;return VisuMZ[_0x490ccd(0x7ac)][_0x490ccd(0x806)]['Color'][_0x490ccd(0x6f8)]||_0x490ccd(0x399);},ColorManager[_0x4535e7(0x3f1)]=function(){const _0x33a1ce=_0x4535e7;return VisuMZ[_0x33a1ce(0x7ac)]['Settings'][_0x33a1ce(0x4ba)][_0x33a1ce(0x19d)];},ColorManager['dimColor2']=function(){const _0x36a135=_0x4535e7;return VisuMZ[_0x36a135(0x7ac)]['Settings'][_0x36a135(0x4ba)][_0x36a135(0x64f)];},ColorManager[_0x4535e7(0x810)]=function(){const _0xdaad37=_0x4535e7;return VisuMZ[_0xdaad37(0x7ac)][_0xdaad37(0x806)][_0xdaad37(0x4ba)][_0xdaad37(0x8ff)];},ColorManager[_0x4535e7(0x9d9)]=function(){const _0x2075e1=_0x4535e7;return VisuMZ[_0x2075e1(0x7ac)][_0x2075e1(0x806)][_0x2075e1(0x4ba)][_0x2075e1(0x88b)];},SceneManager['_storedStack']=[],SceneManager[_0x4535e7(0x5ff)]=function(){const _0x54d6ea=_0x4535e7;return this['_scene']&&this[_0x54d6ea(0x42f)][_0x54d6ea(0x30f)]===Scene_Battle;},SceneManager[_0x4535e7(0x94d)]=function(){const _0x34eeb9=_0x4535e7;return this['_scene']&&this['_scene'][_0x34eeb9(0x30f)]===Scene_Map;},SceneManager[_0x4535e7(0x6b1)]=function(){const _0x5cd3d6=_0x4535e7;return this[_0x5cd3d6(0x42f)]&&this[_0x5cd3d6(0x42f)]instanceof Scene_Map;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0xa30)]=SceneManager[_0x4535e7(0x614)],SceneManager[_0x4535e7(0x614)]=function(){const _0x24d1a3=_0x4535e7;VisuMZ[_0x24d1a3(0x7ac)][_0x24d1a3(0xa30)][_0x24d1a3(0x77f)](this),this[_0x24d1a3(0x916)]();},VisuMZ['CoreEngine']['SceneManager_onKeyDown']=SceneManager['onKeyDown'],SceneManager[_0x4535e7(0x336)]=function(_0x4ba7a9){const _0x17e859=_0x4535e7;if($gameTemp)this[_0x17e859(0x605)](_0x4ba7a9);VisuMZ[_0x17e859(0x7ac)][_0x17e859(0x2b6)][_0x17e859(0x77f)](this,_0x4ba7a9);},SceneManager[_0x4535e7(0x605)]=function(_0xe1efe9){const _0x54321a=_0x4535e7;if(!_0xe1efe9[_0x54321a(0x744)]&&!_0xe1efe9[_0x54321a(0x1d8)]){if(_0x54321a(0x648)===_0x54321a(0x648))switch(_0xe1efe9[_0x54321a(0x4d8)]){case 0x54:this[_0x54321a(0x72c)]();break;case 0x75:this['playTestF6']();break;case 0x76:if(Input[_0x54321a(0x94a)](_0x54321a(0x935))||Input[_0x54321a(0x94a)]('ctrl'))return;this[_0x54321a(0x1c4)]();break;}else{const _0x5302db=this[_0x54321a(0x83e)];this[_0x54321a(0x851)](0x0,0x0,_0x5302db,this[_0x54321a(0x80a)]());const _0x1dab78=this[_0x54321a(0x38f)](_0x59b165[_0x54321a(0x241)]())[_0x54321a(0x29a)];this[_0x54321a(0x4e3)](_0x1b16f0[_0x54321a(0x241)](),_0x2e1c29[_0x54321a(0xa14)]((_0x5302db-_0x1dab78)/0x2),0x0);}}},SceneManager[_0x4535e7(0x1b8)]=function(){const _0xa65e14=_0x4535e7;if($gameTemp[_0xa65e14(0x18e)]()&&VisuMZ[_0xa65e14(0x7ac)]['Settings'][_0xa65e14(0x405)]['F6key']){ConfigManager[_0xa65e14(0x817)]!==0x0?(ConfigManager[_0xa65e14(0x3e0)]=0x0,ConfigManager[_0xa65e14(0x3c4)]=0x0,ConfigManager['meVolume']=0x0,ConfigManager['seVolume']=0x0):_0xa65e14(0x879)===_0xa65e14(0x4c5)?_0x43784e['CoreEngine']['Sprite_Animation_setViewport']['call'](this,_0xa7b56f):(ConfigManager[_0xa65e14(0x3e0)]=0x64,ConfigManager[_0xa65e14(0x3c4)]=0x64,ConfigManager[_0xa65e14(0x8da)]=0x64,ConfigManager[_0xa65e14(0x817)]=0x64);ConfigManager[_0xa65e14(0x6fd)]();if(this[_0xa65e14(0x42f)]['constructor']===Scene_Options){if(this['_scene'][_0xa65e14(0x80c)])this['_scene'][_0xa65e14(0x80c)][_0xa65e14(0x358)]();if(this[_0xa65e14(0x42f)][_0xa65e14(0x83f)])this[_0xa65e14(0x42f)]['_listWindow']['refresh']();}}},SceneManager[_0x4535e7(0x1c4)]=function(){const _0xbc5fbf=_0x4535e7;$gameTemp[_0xbc5fbf(0x18e)]()&&VisuMZ[_0xbc5fbf(0x7ac)][_0xbc5fbf(0x806)][_0xbc5fbf(0x405)][_0xbc5fbf(0x7cb)]&&($gameTemp[_0xbc5fbf(0x21b)]=!$gameTemp[_0xbc5fbf(0x21b)]);},SceneManager['playTestCtrlT']=function(){const _0x280469=_0x4535e7;if(!$gameTemp['isPlaytest']())return;if(!SceneManager[_0x280469(0x5ff)]())return;for(const _0x3baf9a of $gameParty[_0x280469(0x3d4)]()){if(!_0x3baf9a)continue;_0x3baf9a[_0x280469(0x325)](_0x3baf9a[_0x280469(0x353)]());}},SceneManager[_0x4535e7(0x916)]=function(){const _0x4694f8=_0x4535e7;this[_0x4694f8(0x2e3)]=![],this[_0x4694f8(0x247)]=!VisuMZ[_0x4694f8(0x7ac)][_0x4694f8(0x806)]['UI'][_0x4694f8(0x74a)];},SceneManager['setSideButtonLayout']=function(_0x10f64a){const _0x4683a0=_0x4535e7;VisuMZ['CoreEngine'][_0x4683a0(0x806)]['UI']['SideButtons']&&(this[_0x4683a0(0x2e3)]=_0x10f64a);},SceneManager[_0x4535e7(0xa37)]=function(){const _0x3c9a1a=_0x4535e7;return this[_0x3c9a1a(0x2e3)];},SceneManager['areButtonsHidden']=function(){const _0x4cd0b1=_0x4535e7;return this[_0x4cd0b1(0x247)];},SceneManager[_0x4535e7(0x5b8)]=function(){const _0xdf167e=_0x4535e7;return this[_0xdf167e(0x4b4)]()||this['isSideButtonLayout']();},VisuMZ[_0x4535e7(0x7ac)]['SceneManager_isGameActive']=SceneManager[_0x4535e7(0x9b8)],SceneManager[_0x4535e7(0x9b8)]=function(){const _0x2f86e8=_0x4535e7;if(VisuMZ[_0x2f86e8(0x7ac)][_0x2f86e8(0x806)][_0x2f86e8(0x405)][_0x2f86e8(0x2c2)])return'JmzsD'===_0x2f86e8(0x54f)?VisuMZ[_0x2f86e8(0x7ac)][_0x2f86e8(0x910)][_0x2f86e8(0x77f)](this):this['buttonAssistWindowButtonRect']();else{if('PJlnS'!=='PJlnS')throw _0x1380d1;else return!![];}},SceneManager[_0x4535e7(0x99c)]=function(_0x4f5b79){const _0x47efcb=_0x4535e7;if(_0x4f5b79 instanceof Error)this[_0x47efcb(0x7e4)](_0x4f5b79);else{if(_0x4f5b79 instanceof Array&&_0x4f5b79[0x0]===_0x47efcb(0x9e6)){if(_0x47efcb(0x84a)===_0x47efcb(0x208)){if(_0x88abe4===_0x47efcb(0x9d7))_0x3dba7f=_0x47efcb(0x1ce);if(_0x58c1e6==='menu')_0x3bf296=_0x47efcb(0x1ce);}else this['catchLoadError'](_0x4f5b79);}else this[_0x47efcb(0x3ae)](_0x4f5b79);}this['stop']();},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x754)]=BattleManager['processEscape'],BattleManager[_0x4535e7(0x610)]=function(){const _0x436afe=_0x4535e7;return VisuMZ[_0x436afe(0x7ac)]['Settings'][_0x436afe(0x405)][_0x436afe(0x269)]?this['processAlwaysEscape']():VisuMZ[_0x436afe(0x7ac)][_0x436afe(0x754)][_0x436afe(0x77f)](this);},BattleManager[_0x4535e7(0x7f4)]=function(){const _0x126971=_0x4535e7;return $gameParty[_0x126971(0x231)](),SoundManager[_0x126971(0x356)](),this[_0x126971(0x673)](),!![];},BattleManager[_0x4535e7(0x653)]=function(){const _0x3ae470=_0x4535e7;return $gameSystem[_0x3ae470(0x970)]()>=0x1;},BattleManager[_0x4535e7(0x869)]=function(){return $gameSystem['getBattleSystem']()===0x1;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x92f)]=Game_Temp['prototype'][_0x4535e7(0x614)],Game_Temp[_0x4535e7(0x781)][_0x4535e7(0x614)]=function(){const _0x10f1e0=_0x4535e7;VisuMZ[_0x10f1e0(0x7ac)]['Game_Temp_initialize']['call'](this),this[_0x10f1e0(0x7a2)](),this[_0x10f1e0(0x4eb)](),this[_0x10f1e0(0x423)]();},Game_Temp['prototype'][_0x4535e7(0x7a2)]=function(){const _0x3e1d1b=_0x4535e7;VisuMZ['CoreEngine'][_0x3e1d1b(0x806)][_0x3e1d1b(0x405)][_0x3e1d1b(0x5ca)]&&(_0x3e1d1b(0x280)!==_0x3e1d1b(0x280)?!_0x5386b3[_0x3e1d1b(0x534)]()&&!this['_playtestF7Looping']&&!_0x554530[_0x3e1d1b(0x3c3)]()&&(this[_0x3e1d1b(0x28b)]=!![],this[_0x3e1d1b(0x76e)](),_0x28b583['updateEffekseer'](),this[_0x3e1d1b(0x28b)]=![]):this[_0x3e1d1b(0x199)]=![]);},Game_Temp[_0x4535e7(0x781)][_0x4535e7(0x9b2)]=function(_0x5480c9){const _0x21739a=_0x4535e7;this[_0x21739a(0x182)]=_0x5480c9;},Game_Temp[_0x4535e7(0x781)][_0x4535e7(0x2a0)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x4535e7(0x781)][_0x4535e7(0x3b4)]=function(){const _0x36ebb6=_0x4535e7;this[_0x36ebb6(0x9d2)]=undefined,this[_0x36ebb6(0x3a4)]=undefined;},Game_Temp[_0x4535e7(0x781)]['applyForcedGameTroopSettingsCoreEngine']=function(_0x3cf9f3){const _0x3fc5de=_0x4535e7;$gameMap&&$dataMap&&$dataMap['note']&&(_0x3fc5de(0x570)===_0x3fc5de(0x20c)?this['hideButtonFromView']():this[_0x3fc5de(0x650)]($dataMap[_0x3fc5de(0x880)]));const _0x16b3ca=$dataTroops[_0x3cf9f3];if(_0x16b3ca){let _0x35c05e=DataManager[_0x3fc5de(0x706)](_0x16b3ca['id']);this[_0x3fc5de(0x650)](_0x35c05e);}},Game_Temp[_0x4535e7(0x781)]['parseForcedGameTroopSettingsCoreEngine']=function(_0xda3cc1){const _0x2e01b4=_0x4535e7;if(!_0xda3cc1)return;if(_0xda3cc1['match'](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x2e01b4(0x9d2)]='FV';else{if(_0xda3cc1[_0x2e01b4(0x27c)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x2e01b4(0x9d2)]='SV';else{if(_0xda3cc1[_0x2e01b4(0x27c)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if('qxsfd'==='qxsfd'){const _0x4a8c3d=String(RegExp['$1']);if(_0x4a8c3d[_0x2e01b4(0x27c)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x4a8c3d[_0x2e01b4(0x27c)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&('lYUVW'===_0x2e01b4(0x881)?this[_0x2e01b4(0x9d2)]='SV':this[_0x2e01b4(0x3b0)]={'SideView':_0x28a45f[_0x2e01b4(0x3b2)],'BattleSystem':this[_0x2e01b4(0x95d)](),'FontSize':_0x192361[_0x2e01b4(0x2ee)][_0x2e01b4(0x855)],'Padding':0xc});}else return _0x35ffcc[_0x2e01b4(0x7c9)][_0x2e01b4(0x47a)]['call'](this);}}}if(_0xda3cc1[_0x2e01b4(0x27c)](/<(?:DTB)>/i))this['_forcedBattleSys']=0x0;else{if(_0xda3cc1[_0x2e01b4(0x27c)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this['_forcedBattleSys']=0x1;else{if(_0xda3cc1['match'](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x2e01b4(0x3a4)]=0x2;else{if(_0xda3cc1[_0x2e01b4(0x27c)](/<(?:CTB)>/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this['_forcedBattleSys']=_0x2e01b4(0x1c5));else{if(_0xda3cc1['match'](/<(?:STB)>/i))_0x2e01b4(0x375)==='CaIUL'?Imported[_0x2e01b4(0x584)]&&(this['_forcedBattleSys']=_0x2e01b4(0x261)):this[_0x2e01b4(0x45e)](_0x40b469);else{if(_0xda3cc1[_0x2e01b4(0x27c)](/<(?:BTB)>/i))Imported['VisuMZ_2_BattleSystemBTB']&&(_0x2e01b4(0x440)===_0x2e01b4(0x440)?this[_0x2e01b4(0x3a4)]='BTB':(_0x479ecf[_0x2e01b4(0x7ac)][_0x2e01b4(0x6b2)][_0x2e01b4(0x77f)](this,_0xd9f3c1),_0x1e1277=this[_0x2e01b4(0x1c8)],_0x741ea6=this[_0x2e01b4(0x5ed)],_0x3d981f=this[_0x2e01b4(0x8fb)]||this[_0x2e01b4(0x5ed)][0x0]));else{if(_0xda3cc1[_0x2e01b4(0x27c)](/<(?:FTB)>/i))Imported['VisuMZ_2_BattleSystemFTB']&&(_0x2e01b4(0x366)!==_0x2e01b4(0x366)?(_0x56df8c[_0x2e01b4(0x7ac)][_0x2e01b4(0x5fb)][_0x2e01b4(0x77f)](this,_0x1e1ce4,_0x2b15d2,_0x2321ee,_0x23f52e,_0x2048cf,_0x5d5f6,_0x1cc8df),this[_0x2e01b4(0x7aa)]()):this[_0x2e01b4(0x3a4)]=_0x2e01b4(0x5f9));else{if(_0xda3cc1[_0x2e01b4(0x27c)](/<(?:OTB)>/i)){if(Imported[_0x2e01b4(0x7b4)]){if('CbqzO'!=='HODHO')this[_0x2e01b4(0x3a4)]=_0x2e01b4(0x426);else{this['_displayY']=this['centerCameraCheckData']()['displayY'];return;}}}else{if(_0xda3cc1[_0x2e01b4(0x27c)](/<(?:ETB)>/i))_0x2e01b4(0x36a)!=='pKiZL'?Imported[_0x2e01b4(0x541)]&&(_0x2e01b4(0x4f4)===_0x2e01b4(0x17d)?this[_0x2e01b4(0x56e)]():this[_0x2e01b4(0x3a4)]='ETB'):_0x575810['startAnimation']&&_0xbeea3d['startAnimation']();else{if(_0xda3cc1[_0x2e01b4(0x27c)](/<(?:PTB)>/i))Imported[_0x2e01b4(0x6d2)]&&(_0x2e01b4(0x733)!==_0x2e01b4(0x733)?this[_0x2e01b4(0x92c)]=_0x561b72[_0x2e01b4(0x7ac)][_0x2e01b4(0x806)][_0x2e01b4(0x70c)][_0x2e01b4(0x175)]:this[_0x2e01b4(0x3a4)]='PTB');else{if(_0xda3cc1[_0x2e01b4(0x27c)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x2fe12d=String(RegExp['$1']);if(_0x2fe12d[_0x2e01b4(0x27c)](/DTB/i)){if(_0x2e01b4(0x8f6)!=='LmTJy')this[_0x2e01b4(0x3a4)]=0x0;else{const _0x24455b=_0x2e01b4(0x40b);this['_colorCache']=this[_0x2e01b4(0x94f)]||{};if(this[_0x2e01b4(0x94f)][_0x24455b])return this[_0x2e01b4(0x94f)][_0x24455b];const _0x58b039=_0x57d4c5['CoreEngine'][_0x2e01b4(0x806)]['Color'][_0x2e01b4(0x46c)];return this['getColorDataFromPluginParameters'](_0x24455b,_0x58b039);}}else{if(_0x2fe12d[_0x2e01b4(0x27c)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x2e01b4(0x3a4)]=0x1;else{if(_0x2fe12d[_0x2e01b4(0x27c)](/(?:TPB|ATB)[ ]WAIT/i)){if(_0x2e01b4(0x90d)===_0x2e01b4(0x90d))this[_0x2e01b4(0x3a4)]=0x2;else return _0x58519b[_0x2e01b4(0x7c9)][_0x2e01b4(0x230)][_0x2e01b4(0x77f)](this);}else{if(_0x2fe12d[_0x2e01b4(0x27c)](/CTB/i))Imported[_0x2e01b4(0x717)]&&(this[_0x2e01b4(0x3a4)]=_0x2e01b4(0x1c5));else{if(_0x2fe12d['match'](/STB/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0x2e01b4(0x3a4)]=_0x2e01b4(0x261));else{if(_0x2fe12d[_0x2e01b4(0x27c)](/BTB/i)){if(_0x2e01b4(0x94e)!==_0x2e01b4(0x94e)){if(this[_0x2e01b4(0x3b0)]===_0x85f0e2)this[_0x2e01b4(0xa28)]();if(this[_0x2e01b4(0x3b0)][_0x2e01b4(0x2de)]===_0x1100ac)this[_0x2e01b4(0xa28)]();this['_CoreEngineSettings'][_0x2e01b4(0x49f)]=_0x4543ed;}else Imported[_0x2e01b4(0x678)]&&(this[_0x2e01b4(0x3a4)]=_0x2e01b4(0x40e));}else{if(_0x2fe12d['match'](/FTB/i))Imported['VisuMZ_2_BattleSystemFTB']&&('IKivy'!==_0x2e01b4(0x70b)?(this['_cache']={},_0x3df480[_0x2e01b4(0x7ac)]['Game_BattlerBase_initMembers'][_0x2e01b4(0x77f)](this)):this[_0x2e01b4(0x3a4)]='FTB');else{if(_0x2fe12d[_0x2e01b4(0x27c)](/OTB/i))Imported[_0x2e01b4(0x7b4)]&&(this[_0x2e01b4(0x3a4)]='OTB');else{if(_0x2fe12d[_0x2e01b4(0x27c)](/ETB/i))_0x2e01b4(0x243)==='AlFeX'?this['_categoryWindow'][_0x2e01b4(0x518)](_0x42bef5[_0x2e01b4(0x7c9)][_0x2e01b4(0xa1b)]):Imported['VisuMZ_2_BattleSystemETB']&&(this[_0x2e01b4(0x3a4)]=_0x2e01b4(0x9f1));else _0x2fe12d[_0x2e01b4(0x27c)](/PTB/i)&&(Imported[_0x2e01b4(0x6d2)]&&(this[_0x2e01b4(0x3a4)]=_0x2e01b4(0x6a9)));}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x4535e7(0x781)][_0x4535e7(0x4eb)]=function(){this['_fauxAnimationQueue']=[];},Game_Temp['prototype'][_0x4535e7(0x41f)]=function(_0x4aa5e7,_0x8e5953,_0x409e63,_0x48bd19){const _0x2cfc10=_0x4535e7;if(!this[_0x2cfc10(0x2a9)]())return;_0x409e63=_0x409e63||![],_0x48bd19=_0x48bd19||![];if($dataAnimations[_0x8e5953]){const _0x36b4d2={'targets':_0x4aa5e7,'animationId':_0x8e5953,'mirror':_0x409e63,'mute':_0x48bd19};this['_fauxAnimationQueue'][_0x2cfc10(0x85c)](_0x36b4d2);for(const _0x5cf160 of _0x4aa5e7){_0x5cf160[_0x2cfc10(0xa34)]&&_0x5cf160[_0x2cfc10(0xa34)]();}}},Game_Temp[_0x4535e7(0x781)][_0x4535e7(0x2a9)]=function(){return!![];},Game_Temp[_0x4535e7(0x781)]['retrieveFauxAnimation']=function(){const _0x3bb07c=_0x4535e7;return this[_0x3bb07c(0x41c)][_0x3bb07c(0x935)]();},Game_Temp[_0x4535e7(0x781)][_0x4535e7(0x423)]=function(){const _0x158333=_0x4535e7;this[_0x158333(0x474)]=[];},Game_Temp['prototype'][_0x4535e7(0x409)]=function(_0x54fbfb,_0x4b718e,_0x224d9e,_0xaf891a,_0x2e1744){const _0x5d7c20=_0x4535e7;if(!this['showPointAnimations']())return;_0xaf891a=_0xaf891a||![],_0x2e1744=_0x2e1744||![];if($dataAnimations[_0x224d9e]){if(_0x5d7c20(0x469)==='sBaqB'){const _0x509067={'x':_0x54fbfb,'y':_0x4b718e,'animationId':_0x224d9e,'mirror':_0xaf891a,'mute':_0x2e1744};this[_0x5d7c20(0x474)][_0x5d7c20(0x85c)](_0x509067);}else _0x30ae59[_0x5d7c20(0x28a)]=!![],_0x105ef6[_0x5d7c20(0x7ac)][_0x5d7c20(0x78f)][_0x5d7c20(0x77f)](this,_0x2d87b5,_0x36a74f),_0x29d7a8[_0x5d7c20(0x28a)]=_0x1ff2f6;}},Game_Temp[_0x4535e7(0x781)][_0x4535e7(0x213)]=function(){return!![];},Game_Temp['prototype'][_0x4535e7(0x3b9)]=function(){const _0x5e0825=_0x4535e7;return this[_0x5e0825(0x474)]['shift']();},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x6bb)]=Game_System[_0x4535e7(0x781)][_0x4535e7(0x614)],Game_System[_0x4535e7(0x781)]['initialize']=function(){const _0x3b33f0=_0x4535e7;VisuMZ['CoreEngine']['Game_System_initialize'][_0x3b33f0(0x77f)](this),this[_0x3b33f0(0xa28)]();},Game_System['prototype'][_0x4535e7(0xa28)]=function(){const _0x543830=_0x4535e7;this[_0x543830(0x3b0)]={'SideView':$dataSystem[_0x543830(0x3b2)],'BattleSystem':this[_0x543830(0x95d)](),'FontSize':$dataSystem[_0x543830(0x2ee)][_0x543830(0x855)],'Padding':0xc};},Game_System[_0x4535e7(0x781)][_0x4535e7(0x877)]=function(){const _0x346ffe=_0x4535e7;if($gameTemp[_0x346ffe(0x9d2)]==='SV'){if(_0x346ffe(0x7de)!==_0x346ffe(0x7de))for(const _0x5c44f0 in _0x514680){const _0x3ec92b=_0x380a22[_0x5c44f0];_0x3ec92b[_0x346ffe(0x4e4)][_0x346ffe(0x27c)](/(.*)\/(.*)/i)&&(_0x3ec92b[_0x346ffe(0x4e4)]=_0x652a20(_0x48db92['$2'][_0x346ffe(0x24d)]()));}else return!![];}else{if($gameTemp[_0x346ffe(0x9d2)]==='FV'){if(_0x346ffe(0x329)==='mNpDI')return![];else this[_0x346ffe(0x437)]['setBackgroundType'](_0x4d6f87[_0x346ffe(0x7c9)]['ProfileBgType']);}}if(this[_0x346ffe(0x3b0)]===undefined)this[_0x346ffe(0xa28)]();if(this[_0x346ffe(0x3b0)][_0x346ffe(0x4a9)]===undefined)this['initCoreEngine']();return this[_0x346ffe(0x3b0)][_0x346ffe(0x4a9)];},Game_System[_0x4535e7(0x781)][_0x4535e7(0x5be)]=function(_0x16bee1){const _0x26d74d=_0x4535e7;if(this[_0x26d74d(0x3b0)]===undefined)this[_0x26d74d(0xa28)]();if(this['_CoreEngineSettings']['SideView']===undefined)this[_0x26d74d(0xa28)]();this[_0x26d74d(0x3b0)][_0x26d74d(0x4a9)]=_0x16bee1;},Game_System[_0x4535e7(0x781)][_0x4535e7(0x156)]=function(){const _0x244a4c=_0x4535e7;if(this[_0x244a4c(0x3b0)]===undefined)this[_0x244a4c(0xa28)]();this[_0x244a4c(0x3b0)]['BattleSystem']=this[_0x244a4c(0x95d)]();},Game_System['prototype'][_0x4535e7(0x95d)]=function(){const _0x2c7bb5=_0x4535e7,_0x173208=(VisuMZ[_0x2c7bb5(0x7ac)][_0x2c7bb5(0x806)][_0x2c7bb5(0x750)]||'DATABASE')[_0x2c7bb5(0x874)]()[_0x2c7bb5(0x24d)]();return VisuMZ['CoreEngine'][_0x2c7bb5(0xa02)](_0x173208);},Game_System['prototype'][_0x4535e7(0x970)]=function(){const _0x4bd8e4=_0x4535e7;if($gameTemp[_0x4bd8e4(0x3a4)]!==undefined)return $gameTemp[_0x4bd8e4(0x3a4)];if(this[_0x4bd8e4(0x3b0)]===undefined)this[_0x4bd8e4(0xa28)]();if(this[_0x4bd8e4(0x3b0)][_0x4bd8e4(0x750)]===undefined)this[_0x4bd8e4(0x156)]();return this[_0x4bd8e4(0x3b0)][_0x4bd8e4(0x750)];},Game_System[_0x4535e7(0x781)][_0x4535e7(0x93b)]=function(_0x14dfc9){const _0x4d5a11=_0x4535e7;if(this[_0x4d5a11(0x3b0)]===undefined)this['initCoreEngine']();if(this[_0x4d5a11(0x3b0)][_0x4d5a11(0x750)]===undefined)this[_0x4d5a11(0x156)]();this[_0x4d5a11(0x3b0)][_0x4d5a11(0x750)]=_0x14dfc9;},Game_System[_0x4535e7(0x781)]['mainFontSize']=function(){const _0x35376a=_0x4535e7;if(this[_0x35376a(0x3b0)]===undefined)this[_0x35376a(0xa28)]();if(this[_0x35376a(0x3b0)][_0x35376a(0x5d9)]===undefined)this[_0x35376a(0xa28)]();return this[_0x35376a(0x3b0)]['FontSize'];},Game_System[_0x4535e7(0x781)][_0x4535e7(0x66e)]=function(_0x5877e5){const _0x353679=_0x4535e7;if(this['_CoreEngineSettings']===undefined)this[_0x353679(0xa28)]();if(this[_0x353679(0x3b0)][_0x353679(0x2de)]===undefined)this[_0x353679(0xa28)]();this[_0x353679(0x3b0)][_0x353679(0x5d9)]=_0x5877e5;},Game_System['prototype'][_0x4535e7(0x2bf)]=function(){const _0x1422ce=_0x4535e7;if(this[_0x1422ce(0x3b0)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x1422ce(0x49f)]===undefined)this[_0x1422ce(0xa28)]();return this['_CoreEngineSettings'][_0x1422ce(0x49f)];},Game_System[_0x4535e7(0x781)][_0x4535e7(0x66d)]=function(_0x10e2ab){const _0xfe5d7b=_0x4535e7;if(this[_0xfe5d7b(0x3b0)]===undefined)this[_0xfe5d7b(0xa28)]();if(this[_0xfe5d7b(0x3b0)][_0xfe5d7b(0x2de)]===undefined)this[_0xfe5d7b(0xa28)]();this[_0xfe5d7b(0x3b0)][_0xfe5d7b(0x49f)]=_0x10e2ab;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x16f)]=Game_Screen['prototype'][_0x4535e7(0x614)],Game_Screen[_0x4535e7(0x781)][_0x4535e7(0x614)]=function(){const _0x1a41de=_0x4535e7;VisuMZ[_0x1a41de(0x7ac)][_0x1a41de(0x16f)][_0x1a41de(0x77f)](this),this[_0x1a41de(0x697)]();},Game_Screen['prototype'][_0x4535e7(0x697)]=function(){const _0x3392a7=_0x4535e7,_0x2590e7=VisuMZ['CoreEngine'][_0x3392a7(0x806)]['ScreenShake'];this['_coreEngineShakeStyle']=_0x2590e7?.[_0x3392a7(0x1fa)]||_0x3392a7(0xa10);},Game_Screen[_0x4535e7(0x781)][_0x4535e7(0x2b8)]=function(){const _0x3f0e1b=_0x4535e7;if(this[_0x3f0e1b(0x2b4)]===undefined)this['initCoreEngineScreenShake']();return this[_0x3f0e1b(0x2b4)];},Game_Screen['prototype']['setCoreEngineScreenShakeStyle']=function(_0x2f4a89){const _0x3038bf=_0x4535e7;if(this['_coreEngineShakeStyle']===undefined)this[_0x3038bf(0x697)]();this[_0x3038bf(0x2b4)]=_0x2f4a89[_0x3038bf(0x67f)]()[_0x3038bf(0x24d)]();},Game_Picture['prototype'][_0x4535e7(0x8d5)]=function(){const _0x41bc43=_0x4535e7;if($gameParty[_0x41bc43(0x79c)]())return![];return this[_0x41bc43(0x2e9)]()&&this[_0x41bc43(0x2e9)]()[_0x41bc43(0x9b0)](0x0)==='!';},Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x2e9)]=function(){const _0x4c30be=_0x4535e7;return this[_0x4c30be(0x380)][_0x4c30be(0x49b)]('/')[_0x4c30be(0x43e)]();},VisuMZ[_0x4535e7(0x7ac)]['Game_Picture_x']=Game_Picture[_0x4535e7(0x781)]['x'],Game_Picture[_0x4535e7(0x781)]['x']=function(){const _0x38160f=_0x4535e7;return this['isMapScrollLinked']()?this[_0x38160f(0x2ae)]():VisuMZ['CoreEngine']['Game_Picture_x']['call'](this);},Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x2ae)]=function(){const _0x1ab232=_0x4535e7,_0x359b7b=$gameMap[_0x1ab232(0x666)]()*$gameMap[_0x1ab232(0x23f)]();return(this['_x']-_0x359b7b)*$gameScreen['zoomScale']();},VisuMZ['CoreEngine'][_0x4535e7(0x3ec)]=Game_Picture[_0x4535e7(0x781)]['y'],Game_Picture[_0x4535e7(0x781)]['y']=function(){const _0x8373a2=_0x4535e7;if(this[_0x8373a2(0x8d5)]()){if(_0x8373a2(0x35a)!==_0x8373a2(0x35a))_0x2f190d+=_0x1fa0e0+'\x0a',_0x5c9432+=_0x8373a2(0x729)[_0x8373a2(0x543)](_0x51a733['parameters'][0x0]);else return this['yScrollLinkedOffset']();}else return VisuMZ[_0x8373a2(0x7ac)][_0x8373a2(0x3ec)][_0x8373a2(0x77f)](this);},Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x52a)]=function(){const _0x15da70=_0x4535e7,_0x2c8c02=$gameMap[_0x15da70(0x359)]()*$gameMap['tileHeight']();return(this['_y']-_0x2c8c02)*$gameScreen[_0x15da70(0x977)]();},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x8f9)]=Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x637)],Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x637)]=function(){const _0x866c9b=_0x4535e7;let _0x31f412=VisuMZ[_0x866c9b(0x7ac)][_0x866c9b(0x8f9)]['call'](this);return this['isMapScrollLinked']()&&(_0x866c9b(0x93a)===_0x866c9b(0x93a)?_0x31f412*=$gameScreen[_0x866c9b(0x977)]():(_0x133290=_0x3168b1[_0x866c9b(0x98a)](_0x1942f2),_0x131dd1=_0x5ee1a6[_0x866c9b(0x98a)](_0x8fe678),_0x419e0c[_0x866c9b(0x7ac)][_0x866c9b(0x2ab)]['call'](this,_0x39a59a,_0x3e11ee,_0x60f500,_0x28bf6))),_0x31f412;},VisuMZ[_0x4535e7(0x7ac)]['Game_Picture_scaleY']=Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x1dd)],Game_Picture['prototype'][_0x4535e7(0x1dd)]=function(){const _0x3d9868=_0x4535e7;let _0x3c1d8e=VisuMZ[_0x3d9868(0x7ac)][_0x3d9868(0x33c)][_0x3d9868(0x77f)](this);if(this[_0x3d9868(0x8d5)]()){if(_0x3d9868(0x1a1)===_0x3d9868(0x1a1))_0x3c1d8e*=$gameScreen[_0x3d9868(0x977)]();else{if(_0x57a7bf[_0x3d9868(0x56d)]('test')){var _0x5962f5=_0x1c0654(_0x3d9868(0xa33))[_0x3d9868(0x70c)][_0x3d9868(0x5f4)]();_0x486f98['showDevTools']();if(_0x31bd5d)_0x10926e(_0x5962f5[_0x3d9868(0x279)][_0x3d9868(0x8f2)](_0x5962f5),0x190);}}}return _0x3c1d8e;},Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x481)]=function(_0x3c6121){const _0x13a07a=_0x4535e7;this[_0x13a07a(0x1b5)]=_0x3c6121;},VisuMZ[_0x4535e7(0x7ac)]['Game_Picture_calcEasing']=Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x827)],Game_Picture['prototype']['calcEasing']=function(_0x4de523){const _0x5ddc34=_0x4535e7;return this[_0x5ddc34(0x1b5)]=this[_0x5ddc34(0x1b5)]||0x0,[0x0,0x1,0x2,0x3][_0x5ddc34(0x454)](this[_0x5ddc34(0x1b5)])?VisuMZ[_0x5ddc34(0x7ac)][_0x5ddc34(0x3f9)]['call'](this,_0x4de523):VisuMZ[_0x5ddc34(0x7e7)](_0x4de523,this['_coreEasingType']);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x663)]=Game_Picture[_0x4535e7(0x781)]['initRotation'],Game_Picture[_0x4535e7(0x781)]['initRotation']=function(){VisuMZ['CoreEngine']['Game_Picture_initRotation']['call'](this),this['initRotationCoreEngine']();},Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x257)]=function(){const _0x31f612=_0x4535e7;this[_0x31f612(0x5e4)]={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x31f612(0x6b8)};},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x4e0)]=Game_Picture['prototype'][_0x4535e7(0x804)],Game_Picture[_0x4535e7(0x781)]['angle']=function(){const _0x544b8b=_0x4535e7;let _0x188fe5=VisuMZ[_0x544b8b(0x7ac)][_0x544b8b(0x4e0)][_0x544b8b(0x77f)](this);return _0x188fe5+=this[_0x544b8b(0x482)](),_0x188fe5;},Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x482)]=function(){const _0x130cd8=_0x4535e7;if(this[_0x130cd8(0x5e4)]===undefined)this[_0x130cd8(0x257)]();return this[_0x130cd8(0x5e4)][_0x130cd8(0x71a)]||0x0;},Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x174)]=function(_0x369f8e,_0x4fe815,_0x514b20){const _0x465d09=_0x4535e7;if(this['_anglePlus']===undefined)this[_0x465d09(0x257)]();this[_0x465d09(0x5e4)][_0x465d09(0x8ca)]=_0x369f8e||0x0,this[_0x465d09(0x5e4)][_0x465d09(0x7f2)]=_0x4fe815||0x0,this[_0x465d09(0x5e4)][_0x465d09(0x611)]=_0x4fe815||0x0,this[_0x465d09(0x5e4)][_0x465d09(0x83d)]=_0x514b20||_0x465d09(0x6b8),_0x4fe815<=0x0&&(this[_0x465d09(0x5e4)]['current']=this[_0x465d09(0x5e4)][_0x465d09(0x8ca)]);},Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x276)]=function(_0x2af791,_0x42ba2e,_0x2e7b0e){const _0x5581d3=_0x4535e7;if(this['_anglePlus']===undefined)this[_0x5581d3(0x257)]();this['_anglePlus']['target']+=_0x2af791||0x0,this['_anglePlus']['duration']=_0x42ba2e||0x0,this[_0x5581d3(0x5e4)][_0x5581d3(0x611)]=_0x42ba2e||0x0,this[_0x5581d3(0x5e4)]['easingType']=_0x2e7b0e||'Linear',_0x42ba2e<=0x0&&(_0x5581d3(0x79a)!=='zkaEr'?this[_0x5581d3(0x5e4)][_0x5581d3(0x71a)]=this[_0x5581d3(0x5e4)][_0x5581d3(0x8ca)]:(_0x183c5b[_0x5581d3(0x189)]=![],_0x3bb328[_0x5581d3(0x3a2)]=!![]));},VisuMZ[_0x4535e7(0x7ac)]['Game_Picture_updateRotation']=Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x8a9)],Game_Picture['prototype']['updateRotation']=function(){const _0x33b289=_0x4535e7;VisuMZ[_0x33b289(0x7ac)]['Game_Picture_updateRotation'][_0x33b289(0x77f)](this),this['updateAnglePlus']();},Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x176)]=function(){const _0x746efb=_0x4535e7;if(this['_anglePlus']===undefined)this[_0x746efb(0x257)]();const _0x2699da=this[_0x746efb(0x5e4)];if(_0x2699da[_0x746efb(0x7f2)]<=0x0)return;_0x2699da[_0x746efb(0x71a)]=this[_0x746efb(0x591)](_0x2699da[_0x746efb(0x71a)],_0x2699da[_0x746efb(0x8ca)]),_0x2699da[_0x746efb(0x7f2)]--,_0x2699da[_0x746efb(0x7f2)]<=0x0&&(_0x2699da[_0x746efb(0x71a)]=_0x2699da[_0x746efb(0x8ca)]);},Game_Picture['prototype']['applyEasingAnglePlus']=function(_0x348db7,_0x5ed1ab){const _0x5c6e87=_0x4535e7,_0x9d995b=this[_0x5c6e87(0x5e4)],_0x56e365=_0x9d995b[_0x5c6e87(0x83d)],_0x555761=_0x9d995b[_0x5c6e87(0x7f2)],_0x54e5f7=_0x9d995b['wholeDuration'],_0x353fd0=VisuMZ[_0x5c6e87(0x7e7)]((_0x54e5f7-_0x555761)/_0x54e5f7,_0x56e365),_0x3f9d51=VisuMZ[_0x5c6e87(0x7e7)]((_0x54e5f7-_0x555761+0x1)/_0x54e5f7,_0x56e365),_0x340c55=(_0x348db7-_0x5ed1ab*_0x353fd0)/(0x1-_0x353fd0);return _0x340c55+(_0x5ed1ab-_0x340c55)*_0x3f9d51;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0xa05)]=Game_Action[_0x4535e7(0x781)][_0x4535e7(0x516)],Game_Action[_0x4535e7(0x781)][_0x4535e7(0x516)]=function(_0x189525){const _0x175a1d=_0x4535e7;if(VisuMZ[_0x175a1d(0x7ac)][_0x175a1d(0x806)][_0x175a1d(0x405)]['ImprovedAccuracySystem'])return this['itemHitImprovedAccuracy'](_0x189525);else{if(_0x175a1d(0x5c3)===_0x175a1d(0x5c3))return VisuMZ[_0x175a1d(0x7ac)][_0x175a1d(0xa05)]['call'](this,_0x189525);else{const _0x1f1e5e=_0x514f1d[_0x175a1d(0x416)];for(let _0x2d7fc9=0x0;_0x2d7fc9<_0x1f1e5e['length'];_0x2d7fc9++){if(_0x1f1e5e[_0x2d7fc9][_0x175a1d(0x535)])return!![];}return![];}}},Game_Action[_0x4535e7(0x781)][_0x4535e7(0x821)]=function(_0x2d0363){const _0x76e8b8=_0x4535e7,_0x743797=this[_0x76e8b8(0x849)](_0x2d0363),_0x4069a9=this['subjectHitRate'](_0x2d0363),_0x2cb658=this[_0x76e8b8(0x6ae)](_0x2d0363);return _0x743797*(_0x4069a9-_0x2cb658);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x4b7)]=Game_Action[_0x4535e7(0x781)][_0x4535e7(0x909)],Game_Action['prototype']['itemEva']=function(_0x22b7ee){const _0x2c1abe=_0x4535e7;return VisuMZ[_0x2c1abe(0x7ac)]['Settings']['QoL'][_0x2c1abe(0x3f6)]?0x0:VisuMZ[_0x2c1abe(0x7ac)]['Game_Action_itemEva']['call'](this,_0x22b7ee);},Game_Action[_0x4535e7(0x781)][_0x4535e7(0x849)]=function(_0x75ebf5){const _0x422a7f=_0x4535e7;return this[_0x422a7f(0x9c1)]()[_0x422a7f(0x54a)]*0.01;},Game_Action['prototype']['subjectHitRate']=function(_0x45001e){const _0x3b13db=_0x4535e7;if(VisuMZ[_0x3b13db(0x7ac)]['Settings'][_0x3b13db(0x405)][_0x3b13db(0x4a1)]&&this[_0x3b13db(0x65c)]())return 0x1;return this[_0x3b13db(0x385)]()?VisuMZ['CoreEngine'][_0x3b13db(0x806)][_0x3b13db(0x405)][_0x3b13db(0x4a1)]&&this[_0x3b13db(0x854)]()[_0x3b13db(0x7ad)]()?this[_0x3b13db(0x854)]()[_0x3b13db(0x944)]+0.05:this['subject']()[_0x3b13db(0x944)]:0x1;},Game_Action[_0x4535e7(0x781)][_0x4535e7(0x6ae)]=function(_0x406ee4){const _0x338335=_0x4535e7;if(this[_0x338335(0x854)]()[_0x338335(0x7ad)]()===_0x406ee4[_0x338335(0x7ad)]())return 0x0;if(this['isPhysical']()){if(VisuMZ[_0x338335(0x7ac)][_0x338335(0x806)][_0x338335(0x405)][_0x338335(0x4a1)]&&_0x406ee4['isEnemy']()){if(_0x338335(0x2bd)==='fSAZX')return _0x406ee4['eva']-0.05;else this[_0x338335(0x74d)][_0x338335(0x855)]<=0x60&&(this['contents'][_0x338335(0x855)]+=0x6);}else return _0x406ee4[_0x338335(0x843)];}else return this[_0x338335(0x987)]()?_0x406ee4[_0x338335(0x9f9)]:0x0;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x58a)]=Game_Action[_0x4535e7(0x781)][_0x4535e7(0x76d)],Game_Action[_0x4535e7(0x781)][_0x4535e7(0x76d)]=function(_0x5e33a7){const _0x298245=_0x4535e7;VisuMZ[_0x298245(0x7ac)][_0x298245(0x58a)]['call'](this,_0x5e33a7);if(VisuMZ[_0x298245(0x7ac)][_0x298245(0x806)]['QoL'][_0x298245(0x3f6)])return;const _0x44452d=_0x5e33a7[_0x298245(0x3ad)]();_0x44452d[_0x298245(0x189)]&&(0x1-this[_0x298245(0x909)](_0x5e33a7)>this[_0x298245(0x516)](_0x5e33a7)&&(_0x44452d[_0x298245(0x189)]=![],_0x44452d[_0x298245(0x3a2)]=!![]));},VisuMZ[_0x4535e7(0x7ac)]['Game_BattlerBase_initMembers']=Game_BattlerBase['prototype'][_0x4535e7(0x93f)],Game_BattlerBase['prototype']['initMembers']=function(){const _0x15ca10=_0x4535e7;this[_0x15ca10(0x760)]={},VisuMZ[_0x15ca10(0x7ac)]['Game_BattlerBase_initMembers'][_0x15ca10(0x77f)](this);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x337)]=Game_BattlerBase[_0x4535e7(0x781)]['refresh'],Game_BattlerBase['prototype'][_0x4535e7(0x358)]=function(){const _0x41b573=_0x4535e7;this['_cache']={},VisuMZ[_0x41b573(0x7ac)][_0x41b573(0x337)][_0x41b573(0x77f)](this);},Game_BattlerBase[_0x4535e7(0x781)][_0x4535e7(0x4e8)]=function(_0x9309a0){const _0x35bf10=_0x4535e7;return this[_0x35bf10(0x760)]=this[_0x35bf10(0x760)]||{},this[_0x35bf10(0x760)][_0x9309a0]!==undefined;},Game_BattlerBase['prototype'][_0x4535e7(0x2e5)]=function(_0x9e82a8){const _0x2e7acf=_0x4535e7,_0x3e06ac=(_0xa1cd9d,_0x2cd886)=>{const _0x2f29c3=_0x5575;if(!_0x2cd886)return _0xa1cd9d;if(_0x2cd886['note'][_0x2f29c3(0x27c)](VisuMZ[_0x2f29c3(0x7ac)][_0x2f29c3(0x312)][_0x2f29c3(0x2e5)][_0x9e82a8])){var _0x1bec99=Number(RegExp['$1']);_0xa1cd9d+=_0x1bec99;}if(_0x2cd886[_0x2f29c3(0x880)]['match'](VisuMZ['CoreEngine'][_0x2f29c3(0x312)][_0x2f29c3(0x758)][_0x9e82a8])){if(_0x2f29c3(0x52e)!==_0x2f29c3(0x30a)){var _0x1efb69=String(RegExp['$1']);try{_0xa1cd9d+=eval(_0x1efb69);}catch(_0x9fe912){if(_0x2f29c3(0x22d)!=='bvtDJ')return _0x216bef['CoreEngine']['Game_Event_isCollidedWithEvents'][_0x2f29c3(0x77f)](this,_0x3b81b8,_0x2c0dbc);else{if($gameTemp[_0x2f29c3(0x18e)]())console[_0x2f29c3(0x8d1)](_0x9fe912);}}}else{var _0x3ccf22=_0x511fa2(_0x41e23d['$1']);if(_0x3ccf22===0x0)_0x3ccf22=_0x554385[_0x2f29c3(0x32e)];_0x546e70=_0x5ebc73['max'](_0xa3dd5d,_0x3ccf22);}}return _0xa1cd9d;};return this[_0x2e7acf(0x7f1)]()[_0x2e7acf(0x179)](_0x3e06ac,this[_0x2e7acf(0x975)][_0x9e82a8]);},Game_BattlerBase['prototype'][_0x4535e7(0x253)]=function(_0x2611d6){const _0x4f25d5=_0x4535e7;var _0x5bdd54=_0x4f25d5(0x551)+(this[_0x4f25d5(0x7ad)]()?_0x4f25d5(0x20a):'Enemy')+_0x4f25d5(0x8d2)+_0x2611d6;if(this[_0x4f25d5(0x4e8)](_0x5bdd54))return this[_0x4f25d5(0x760)][_0x5bdd54];this[_0x4f25d5(0x760)][_0x5bdd54]=eval(VisuMZ[_0x4f25d5(0x7ac)][_0x4f25d5(0x806)][_0x4f25d5(0x432)][_0x5bdd54]);const _0x23f182=(_0x8b6910,_0x42458c)=>{const _0x46fb23=_0x4f25d5;if(!_0x42458c)return _0x8b6910;if(_0x42458c[_0x46fb23(0x880)][_0x46fb23(0x27c)](VisuMZ['CoreEngine'][_0x46fb23(0x312)][_0x46fb23(0x253)][_0x2611d6])){var _0x2b2dec=Number(RegExp['$1']);if(_0x2b2dec===0x0)_0x2b2dec=Number[_0x46fb23(0x32e)];_0x8b6910=Math[_0x46fb23(0x548)](_0x8b6910,_0x2b2dec);}if(_0x42458c[_0x46fb23(0x880)][_0x46fb23(0x27c)](VisuMZ['CoreEngine'][_0x46fb23(0x312)][_0x46fb23(0x973)][_0x2611d6])){var _0x46c25d=String(RegExp['$1']);try{_0x46fb23(0x809)===_0x46fb23(0x809)?_0x8b6910=Math['max'](_0x8b6910,Number(eval(_0x46c25d))):this[_0x46fb23(0x8ef)]=!![];}catch(_0x5f0220){if($gameTemp['isPlaytest']())console[_0x46fb23(0x8d1)](_0x5f0220);}}return _0x8b6910;};if(this[_0x4f25d5(0x760)][_0x5bdd54]===0x0)this[_0x4f25d5(0x760)][_0x5bdd54]=Number[_0x4f25d5(0x32e)];return this[_0x4f25d5(0x760)][_0x5bdd54]=this[_0x4f25d5(0x7f1)]()['reduce'](_0x23f182,this[_0x4f25d5(0x760)][_0x5bdd54]),this[_0x4f25d5(0x760)][_0x5bdd54];},Game_BattlerBase['prototype']['paramRate']=function(_0x1d5b08){const _0x1954f7=_0x4535e7,_0x4af173=this[_0x1954f7(0x99b)](Game_BattlerBase[_0x1954f7(0x464)],_0x1d5b08),_0xd349f7=(_0x5a629d,_0x8d25ea)=>{const _0x41557f=_0x1954f7;if(_0x41557f(0x925)==='PksTT'){if(!_0x8d25ea)return _0x5a629d;if(_0x8d25ea[_0x41557f(0x880)]['match'](VisuMZ['CoreEngine'][_0x41557f(0x312)][_0x41557f(0x56b)][_0x1d5b08])){var _0xc99816=Number(RegExp['$1'])/0x64;_0x5a629d*=_0xc99816;}if(_0x8d25ea[_0x41557f(0x880)]['match'](VisuMZ[_0x41557f(0x7ac)][_0x41557f(0x312)][_0x41557f(0x8cf)][_0x1d5b08])){var _0xc99816=Number(RegExp['$1']);_0x5a629d*=_0xc99816;}if(_0x8d25ea[_0x41557f(0x880)][_0x41557f(0x27c)](VisuMZ[_0x41557f(0x7ac)][_0x41557f(0x312)][_0x41557f(0x5eb)][_0x1d5b08])){if(_0x41557f(0x301)!=='eaJKu')_0x2f0ce8['CoreEngine'][_0x41557f(0x806)][_0x41557f(0x5ab)][_0x41557f(0x178)][_0x41557f(0x438)][_0x41557f(0x77f)](this);else{var _0x57a46c=String(RegExp['$1']);try{_0x5a629d*=eval(_0x57a46c);}catch(_0x8d7c6f){if($gameTemp['isPlaytest']())console[_0x41557f(0x8d1)](_0x8d7c6f);}}}return _0x5a629d;}else this[_0x41557f(0x904)]+=_0x58f838[_0x41557f(0x98a)]((_0x687e69['height']-0x270)/0x2),this['_screenY']-=_0x7123d9['floor']((_0xbcd4d0[_0x41557f(0x1ad)]-_0x1862ca['boxHeight'])/0x2),_0x3bbbc7[_0x41557f(0x877)]()?this[_0x41557f(0x954)]-=_0x350c1c['floor']((_0x345e42[_0x41557f(0x29a)]-_0x295e75[_0x41557f(0x73c)])/0x2):this[_0x41557f(0x954)]+=_0xe2030c[_0x41557f(0x98a)]((_0x34d8c2[_0x41557f(0x73c)]-0x330)/0x2);};return this[_0x1954f7(0x7f1)]()[_0x1954f7(0x179)](_0xd349f7,_0x4af173);},Game_BattlerBase['prototype'][_0x4535e7(0x859)]=function(_0x3177a4){const _0x18db7a=_0x4535e7,_0x58345f=(_0x2c4c59,_0x10ae46)=>{const _0x216974=_0x5575;if(_0x216974(0x9a3)!==_0x216974(0x689)){if(!_0x10ae46)return _0x2c4c59;if(_0x10ae46['note'][_0x216974(0x27c)](VisuMZ['CoreEngine']['RegExp'][_0x216974(0x8cc)][_0x3177a4])){if(_0x216974(0x507)!=='rNIHo')return _0x2fd0f8['CoreEngine']['Settings'][_0x216974(0x405)][_0x216974(0x61c)];else{var _0x15caf2=Number(RegExp['$1']);_0x2c4c59+=_0x15caf2;}}if(_0x10ae46[_0x216974(0x880)]['match'](VisuMZ[_0x216974(0x7ac)][_0x216974(0x312)][_0x216974(0x2ce)][_0x3177a4])){var _0x5ab597=String(RegExp['$1']);try{_0x216974(0x4bf)===_0x216974(0x4bf)?_0x2c4c59+=eval(_0x5ab597):(_0x5d126d[_0x216974(0x7ac)][_0x216974(0xa0f)][_0x216974(0x77f)](this),_0x5b0a2f[_0x216974(0xa37)]()&&this[_0x216974(0x5b3)]());}catch(_0x139133){if(_0x216974(0x5e1)==='NVmFi'){if($gameTemp[_0x216974(0x18e)]())console[_0x216974(0x8d1)](_0x139133);}else{if(this[_0x216974(0x188)]()===0x0)return;_0x3f3fd1[_0x216974(0x393)](),this[_0x216974(0x358)](),_0x2ac2a1[_0x216974(0x8b0)](),this[_0x216974(0x9c2)](0x0);}}}return _0x2c4c59;}else return _0x463f31[_0x216974(0x811)]('pageup',_0x216974(0x377));};return this['traitObjects']()[_0x18db7a(0x179)](_0x58345f,0x0);},Game_BattlerBase[_0x4535e7(0x781)][_0x4535e7(0x97d)]=function(_0x54eff3){const _0x1509b7=_0x4535e7;let _0x3d14f6=_0x1509b7(0x97d)+_0x54eff3+_0x1509b7(0x4d1);if(this[_0x1509b7(0x4e8)](_0x3d14f6))return this[_0x1509b7(0x760)][_0x3d14f6];return this[_0x1509b7(0x760)][_0x3d14f6]=Math[_0x1509b7(0x98a)](VisuMZ[_0x1509b7(0x7ac)][_0x1509b7(0x806)]['Param'][_0x1509b7(0x932)][_0x1509b7(0x77f)](this,_0x54eff3)),this[_0x1509b7(0x760)][_0x3d14f6];},Game_BattlerBase[_0x4535e7(0x781)]['xparamPlus']=function(_0x467d7d){const _0x2bb7c8=_0x4535e7,_0xbc5273=(_0x30ad54,_0xb2dacc)=>{const _0x302da0=_0x5575;if(_0x302da0(0x2a1)!==_0x302da0(0x2a1))return this[_0x302da0(0x358)]();else{if(!_0xb2dacc)return _0x30ad54;if(_0xb2dacc[_0x302da0(0x880)]['match'](VisuMZ[_0x302da0(0x7ac)][_0x302da0(0x312)][_0x302da0(0x2b2)][_0x467d7d])){if(_0x302da0(0x76f)!==_0x302da0(0x76f)){this['_fauxAnimationSprites']['remove'](_0x30a796),this[_0x302da0(0x9ca)](_0x597f8d);for(const _0x32a98f of _0x50c1c6[_0x302da0(0x2f0)]){_0x32a98f[_0x302da0(0x6c1)]&&_0x32a98f[_0x302da0(0x6c1)]();}_0xcc530a['destroy']();}else{var _0xef6cc7=Number(RegExp['$1'])/0x64;_0x30ad54+=_0xef6cc7;}}if(_0xb2dacc[_0x302da0(0x880)]['match'](VisuMZ['CoreEngine'][_0x302da0(0x312)][_0x302da0(0x41a)][_0x467d7d])){if('ymhbB'===_0x302da0(0x71e)){var _0xef6cc7=Number(RegExp['$1']);_0x30ad54+=_0xef6cc7;}else return _0x254791['CoreEngine']['TextManager_param'][_0x302da0(0x77f)](this,_0x2bf703);}if(_0xb2dacc[_0x302da0(0x880)]['match'](VisuMZ[_0x302da0(0x7ac)][_0x302da0(0x312)][_0x302da0(0x7f9)][_0x467d7d])){var _0x182a6d=String(RegExp['$1']);try{_0x30ad54+=eval(_0x182a6d);}catch(_0x28b378){if($gameTemp['isPlaytest']())console[_0x302da0(0x8d1)](_0x28b378);}}return _0x30ad54;}};return this['traitObjects']()[_0x2bb7c8(0x179)](_0xbc5273,0x0);},Game_BattlerBase['prototype'][_0x4535e7(0x8db)]=function(_0xdb28f5){const _0x30a465=_0x4535e7,_0x426f8d=(_0x4dbd87,_0xad816a)=>{const _0x670062=_0x5575;if(!_0xad816a)return _0x4dbd87;if(_0xad816a['note']['match'](VisuMZ[_0x670062(0x7ac)]['RegExp']['xparamRate1'][_0xdb28f5])){var _0x213cde=Number(RegExp['$1'])/0x64;_0x4dbd87*=_0x213cde;}if(_0xad816a[_0x670062(0x880)][_0x670062(0x27c)](VisuMZ[_0x670062(0x7ac)][_0x670062(0x312)][_0x670062(0x62a)][_0xdb28f5])){var _0x213cde=Number(RegExp['$1']);_0x4dbd87*=_0x213cde;}if(_0xad816a['note'][_0x670062(0x27c)](VisuMZ[_0x670062(0x7ac)][_0x670062(0x312)][_0x670062(0x381)][_0xdb28f5])){var _0x527463=String(RegExp['$1']);try{_0x4dbd87*=eval(_0x527463);}catch(_0x4de2cb){if(_0x670062(0x2cb)!==_0x670062(0x99e)){if($gameTemp[_0x670062(0x18e)]())console[_0x670062(0x8d1)](_0x4de2cb);}else _0x783a41[_0x670062(0x7b4)]&&(this['_forcedBattleSys']=_0x670062(0x426));}}return _0x4dbd87;};return this[_0x30a465(0x7f1)]()['reduce'](_0x426f8d,0x1);},Game_BattlerBase['prototype'][_0x4535e7(0xa11)]=function(_0x1b6cc9){const _0x46e784=_0x4535e7,_0x522210=(_0x92dbdd,_0x5bd1ae)=>{const _0x118c79=_0x5575;if(_0x118c79(0x53b)===_0x118c79(0x48c))this[_0x118c79(0x870)][_0x118c79(0x518)](_0x41888c[_0x118c79(0x7c9)][_0x118c79(0x936)]);else{if(!_0x5bd1ae)return _0x92dbdd;if(_0x5bd1ae['note']['match'](VisuMZ[_0x118c79(0x7ac)][_0x118c79(0x312)]['xparamFlat1'][_0x1b6cc9])){var _0x3c7a41=Number(RegExp['$1'])/0x64;_0x92dbdd+=_0x3c7a41;}if(_0x5bd1ae[_0x118c79(0x880)][_0x118c79(0x27c)](VisuMZ[_0x118c79(0x7ac)][_0x118c79(0x312)][_0x118c79(0x311)][_0x1b6cc9])){if(_0x118c79(0x655)!==_0x118c79(0x3e3)){var _0x3c7a41=Number(RegExp['$1']);_0x92dbdd+=_0x3c7a41;}else{if(this[_0x118c79(0x5e4)]===_0x58b21d)this[_0x118c79(0x257)]();const _0x4ac141=this[_0x118c79(0x5e4)];if(_0x4ac141[_0x118c79(0x7f2)]<=0x0)return;_0x4ac141[_0x118c79(0x71a)]=this['applyEasingAnglePlus'](_0x4ac141['current'],_0x4ac141[_0x118c79(0x8ca)]),_0x4ac141[_0x118c79(0x7f2)]--,_0x4ac141[_0x118c79(0x7f2)]<=0x0&&(_0x4ac141[_0x118c79(0x71a)]=_0x4ac141[_0x118c79(0x8ca)]);}}if(_0x5bd1ae[_0x118c79(0x880)]['match'](VisuMZ[_0x118c79(0x7ac)][_0x118c79(0x312)][_0x118c79(0x20b)][_0x1b6cc9])){if('UHfPS'!==_0x118c79(0x33f)){var _0x1b7da8=String(RegExp['$1']);try{_0x92dbdd+=eval(_0x1b7da8);}catch(_0x4735bc){if($gameTemp['isPlaytest']())console[_0x118c79(0x8d1)](_0x4735bc);}}else this['createFauxAnimationSprite'](_0x20f1a5,_0xb8d7d4,_0x2aca7f,_0x137df6,_0x5ef65b);}return _0x92dbdd;}};return this[_0x46e784(0x7f1)]()[_0x46e784(0x179)](_0x522210,0x0);},Game_BattlerBase[_0x4535e7(0x781)][_0x4535e7(0xa01)]=function(_0x2959da){const _0x4fc817=_0x4535e7;let _0x4989f8=_0x4fc817(0xa01)+_0x2959da+'Total';if(this[_0x4fc817(0x4e8)](_0x4989f8))return this[_0x4fc817(0x760)][_0x4989f8];return this[_0x4fc817(0x760)][_0x4989f8]=VisuMZ[_0x4fc817(0x7ac)][_0x4fc817(0x806)][_0x4fc817(0x432)][_0x4fc817(0x22a)][_0x4fc817(0x77f)](this,_0x2959da),this[_0x4fc817(0x760)][_0x4989f8];},Game_BattlerBase['prototype'][_0x4535e7(0x1f1)]=function(_0x1e5fca){const _0x2fbe95=(_0x46de53,_0x5e5291)=>{const _0xd2dca2=_0x5575;if(!_0x5e5291)return _0x46de53;if(_0x5e5291[_0xd2dca2(0x880)][_0xd2dca2(0x27c)](VisuMZ[_0xd2dca2(0x7ac)]['RegExp']['sparamPlus1'][_0x1e5fca])){var _0x1e573c=Number(RegExp['$1'])/0x64;_0x46de53+=_0x1e573c;}if(_0x5e5291[_0xd2dca2(0x880)][_0xd2dca2(0x27c)](VisuMZ[_0xd2dca2(0x7ac)][_0xd2dca2(0x312)][_0xd2dca2(0x95b)][_0x1e5fca])){var _0x1e573c=Number(RegExp['$1']);_0x46de53+=_0x1e573c;}if(_0x5e5291[_0xd2dca2(0x880)][_0xd2dca2(0x27c)](VisuMZ['CoreEngine'][_0xd2dca2(0x312)][_0xd2dca2(0xa1e)][_0x1e5fca])){if(_0xd2dca2(0x4a6)!==_0xd2dca2(0x680)){var _0x1e7cd9=String(RegExp['$1']);try{_0x46de53+=eval(_0x1e7cd9);}catch(_0x3c86b2){if(_0xd2dca2(0x324)!==_0xd2dca2(0x185)){if($gameTemp[_0xd2dca2(0x18e)]())console[_0xd2dca2(0x8d1)](_0x3c86b2);}else _0x2866a8[_0xd2dca2(0x7ac)][_0xd2dca2(0x550)][_0xd2dca2(0x77f)](this,_0x1737d0,_0x9c51e9,_0x474a5b,_0x1fcc06,_0x221524,_0x301710,_0x1c24a3,_0x348caf),this[_0xd2dca2(0x60a)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x36fe1f]||{'x':0x0,'y':0x0});}}else{if(!this['isScrollBarVisible']())return;if(this[_0xd2dca2(0x5e2)]||this[_0xd2dca2(0x882)])return;this[_0xd2dca2(0x509)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0xd2dca2(0x5e2)]=new _0x2ffbe9(),this[_0xd2dca2(0x882)]=new _0x1c3220(),this[_0xd2dca2(0x379)](this[_0xd2dca2(0x5e2)]),this['addChild'](this[_0xd2dca2(0x882)]);}}return _0x46de53;};return this['traitObjects']()['reduce'](_0x2fbe95,0x0);},Game_BattlerBase['prototype'][_0x4535e7(0x83b)]=function(_0x38bbd2){const _0x271fc0=_0x4535e7,_0x25dca4=(_0x21d223,_0x36a86c)=>{const _0xa06ac2=_0x5575;if(!_0x36a86c)return _0x21d223;if(_0x36a86c[_0xa06ac2(0x880)][_0xa06ac2(0x27c)](VisuMZ[_0xa06ac2(0x7ac)]['RegExp']['sparamRate1'][_0x38bbd2])){if(_0xa06ac2(0x2fa)===_0xa06ac2(0x249))return _0x35234b['getInputButtonString']('shift');else{var _0x4d87fc=Number(RegExp['$1'])/0x64;_0x21d223*=_0x4d87fc;}}if(_0x36a86c[_0xa06ac2(0x880)][_0xa06ac2(0x27c)](VisuMZ['CoreEngine']['RegExp'][_0xa06ac2(0x1de)][_0x38bbd2])){if('uekTn'===_0xa06ac2(0x946))return _0x41b6f0[_0xa06ac2(0x970)]()>=0x1;else{var _0x4d87fc=Number(RegExp['$1']);_0x21d223*=_0x4d87fc;}}if(_0x36a86c[_0xa06ac2(0x880)][_0xa06ac2(0x27c)](VisuMZ[_0xa06ac2(0x7ac)]['RegExp']['sparamRateJS'][_0x38bbd2])){var _0x267a36=String(RegExp['$1']);try{if(_0xa06ac2(0x834)!=='ZFoLz'){const _0xf576d6=_0x265254[_0xa06ac2(0x7ac)]['Settings'][_0xa06ac2(0x405)][_0xa06ac2(0x2fd)]||0x0;if(_0xf576d6>0x0)_0x2d9cf8['reserveCommonEvent'](_0xf576d6);}else _0x21d223*=eval(_0x267a36);}catch(_0x586257){if($gameTemp[_0xa06ac2(0x18e)]())console['log'](_0x586257);}}return _0x21d223;};return this['traitObjects']()[_0x271fc0(0x179)](_0x25dca4,0x1);},Game_BattlerBase[_0x4535e7(0x781)][_0x4535e7(0x6b3)]=function(_0x1648a7){const _0x4f6ce5=_0x4535e7,_0x1f6300=(_0x5ac464,_0x12333f)=>{const _0x4c914d=_0x5575;if(!_0x12333f)return _0x5ac464;if(_0x12333f[_0x4c914d(0x880)][_0x4c914d(0x27c)](VisuMZ['CoreEngine'][_0x4c914d(0x312)]['sparamFlat1'][_0x1648a7])){var _0x500479=Number(RegExp['$1'])/0x64;_0x5ac464+=_0x500479;}if(_0x12333f['note'][_0x4c914d(0x27c)](VisuMZ[_0x4c914d(0x7ac)][_0x4c914d(0x312)]['sparamFlat2'][_0x1648a7])){var _0x500479=Number(RegExp['$1']);_0x5ac464+=_0x500479;}if(_0x12333f[_0x4c914d(0x880)][_0x4c914d(0x27c)](VisuMZ[_0x4c914d(0x7ac)]['RegExp'][_0x4c914d(0x6cc)][_0x1648a7])){var _0x48a2c7=String(RegExp['$1']);try{if(_0x4c914d(0x498)!==_0x4c914d(0x183))_0x5ac464+=eval(_0x48a2c7);else{const _0x54260b=_0x3def17['width']-_0x37b093['boxWidth']-_0x594c7e['CoreEngine'][_0x4c914d(0x806)]['UI'][_0x4c914d(0x5ba)]*0x2,_0x155aba=_0xc252a6[_0x4c914d(0x781)][_0x4c914d(0x53e)][_0x4c914d(0x77f)](this)*0x4;if(_0x54260b>=_0x155aba)_0x4eedd6[_0x4c914d(0x9cc)](!![]);}}catch(_0x29f641){if($gameTemp['isPlaytest']())console[_0x4c914d(0x8d1)](_0x29f641);}}return _0x5ac464;};return this[_0x4f6ce5(0x7f1)]()[_0x4f6ce5(0x179)](_0x1f6300,0x0);},Game_BattlerBase[_0x4535e7(0x781)][_0x4535e7(0x76b)]=function(_0x76eb70){const _0x537e53=_0x4535e7;let _0xbc6320=_0x537e53(0x76b)+_0x76eb70+_0x537e53(0x4d1);if(this[_0x537e53(0x4e8)](_0xbc6320))return this['_cache'][_0xbc6320];return this[_0x537e53(0x760)][_0xbc6320]=VisuMZ['CoreEngine']['Settings'][_0x537e53(0x432)][_0x537e53(0x968)][_0x537e53(0x77f)](this,_0x76eb70),this[_0x537e53(0x760)][_0xbc6320];},Game_BattlerBase[_0x4535e7(0x781)][_0x4535e7(0x64e)]=function(_0x8e5a84,_0x17b32e){const _0x181946=_0x4535e7;if(typeof paramId==='number')return this['param'](_0x8e5a84);_0x8e5a84=String(_0x8e5a84||'')[_0x181946(0x874)]();if(_0x8e5a84===_0x181946(0x627))return this[_0x181946(0x97d)](0x0);if(_0x8e5a84===_0x181946(0x8e5))return this[_0x181946(0x97d)](0x1);if(_0x8e5a84===_0x181946(0x57d))return this[_0x181946(0x97d)](0x2);if(_0x8e5a84===_0x181946(0x6bd))return this[_0x181946(0x97d)](0x3);if(_0x8e5a84===_0x181946(0x972))return this[_0x181946(0x97d)](0x4);if(_0x8e5a84===_0x181946(0x3c6))return this[_0x181946(0x97d)](0x5);if(_0x8e5a84===_0x181946(0x844))return this[_0x181946(0x97d)](0x6);if(_0x8e5a84===_0x181946(0x339))return this['param'](0x7);if(_0x8e5a84===_0x181946(0x42e))return _0x17b32e?String(Math[_0x181946(0x98a)](this[_0x181946(0xa01)](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x8e5a84===_0x181946(0x7dc))return _0x17b32e?String(Math['round'](this[_0x181946(0xa01)](0x1)*0x64))+'%':this[_0x181946(0xa01)](0x1);if(_0x8e5a84==='CRI')return _0x17b32e?String(Math['round'](this[_0x181946(0xa01)](0x2)*0x64))+'%':this[_0x181946(0xa01)](0x2);if(_0x8e5a84===_0x181946(0x155))return _0x17b32e?String(Math[_0x181946(0x98a)](this[_0x181946(0xa01)](0x3)*0x64))+'%':this['xparam'](0x3);if(_0x8e5a84===_0x181946(0x41d))return _0x17b32e?String(Math[_0x181946(0x98a)](this['xparam'](0x4)*0x64))+'%':this[_0x181946(0xa01)](0x4);if(_0x8e5a84==='MRF')return _0x17b32e?String(Math[_0x181946(0x98a)](this[_0x181946(0xa01)](0x5)*0x64))+'%':this['xparam'](0x5);if(_0x8e5a84===_0x181946(0x7cc))return _0x17b32e?String(Math['round'](this[_0x181946(0xa01)](0x6)*0x64))+'%':this[_0x181946(0xa01)](0x6);if(_0x8e5a84===_0x181946(0x77d))return _0x17b32e?String(Math[_0x181946(0x98a)](this['xparam'](0x7)*0x64))+'%':this[_0x181946(0xa01)](0x7);if(_0x8e5a84===_0x181946(0x87a))return _0x17b32e?String(Math[_0x181946(0x98a)](this[_0x181946(0xa01)](0x8)*0x64))+'%':this[_0x181946(0xa01)](0x8);if(_0x8e5a84==='TRG')return _0x17b32e?String(Math[_0x181946(0x98a)](this[_0x181946(0xa01)](0x9)*0x64))+'%':this['xparam'](0x9);if(_0x8e5a84===_0x181946(0x298))return _0x17b32e?String(Math[_0x181946(0x98a)](this[_0x181946(0x76b)](0x0)*0x64))+'%':this[_0x181946(0x76b)](0x0);if(_0x8e5a84===_0x181946(0x4d6))return _0x17b32e?String(Math['round'](this[_0x181946(0x76b)](0x1)*0x64))+'%':this[_0x181946(0x76b)](0x1);if(_0x8e5a84===_0x181946(0x20e))return _0x17b32e?String(Math['round'](this[_0x181946(0x76b)](0x2)*0x64))+'%':this[_0x181946(0x76b)](0x2);if(_0x8e5a84===_0x181946(0x2e8))return _0x17b32e?String(Math[_0x181946(0x98a)](this['sparam'](0x3)*0x64))+'%':this['sparam'](0x3);if(_0x8e5a84==='MCR')return _0x17b32e?String(Math[_0x181946(0x98a)](this[_0x181946(0x76b)](0x4)*0x64))+'%':this[_0x181946(0x76b)](0x4);if(_0x8e5a84==='TCR')return _0x17b32e?String(Math[_0x181946(0x98a)](this[_0x181946(0x76b)](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x8e5a84===_0x181946(0x5a4))return _0x17b32e?String(Math[_0x181946(0x98a)](this[_0x181946(0x76b)](0x6)*0x64))+'%':this['sparam'](0x6);if(_0x8e5a84===_0x181946(0x1e0))return _0x17b32e?String(Math[_0x181946(0x98a)](this['sparam'](0x7)*0x64))+'%':this[_0x181946(0x76b)](0x7);if(_0x8e5a84===_0x181946(0x4bd))return _0x17b32e?String(Math[_0x181946(0x98a)](this[_0x181946(0x76b)](0x8)*0x64))+'%':this[_0x181946(0x76b)](0x8);if(_0x8e5a84===_0x181946(0x25f))return _0x17b32e?String(Math[_0x181946(0x98a)](this[_0x181946(0x76b)](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ[_0x181946(0x7ac)][_0x181946(0x51b)][_0x8e5a84]){const _0x79d50a=VisuMZ[_0x181946(0x7ac)][_0x181946(0x51b)][_0x8e5a84],_0x1e6a4b=this[_0x79d50a];if(VisuMZ[_0x181946(0x7ac)][_0x181946(0x947)][_0x8e5a84]===_0x181946(0x578)){if('BaaUg'!==_0x181946(0x3b3))return _0x1e6a4b;else{const _0x1f8dbc=this['rightArrowWidth']();this['changeTextColor'](_0x15d719['systemColor']());const _0x5080cb=_0x2ac00e[_0x181946(0x7ac)][_0x181946(0x806)]['UI']['ParamArrow'];this[_0x181946(0x256)](_0x5080cb,_0xa86093,_0x11fe09,_0x1f8dbc,_0x181946(0x9a0));}}else return _0x17b32e?String(Math[_0x181946(0x98a)](_0x1e6a4b*0x64))+'%':_0x1e6a4b;}return'';},Game_BattlerBase['prototype'][_0x4535e7(0x47b)]=function(){const _0xded830=_0x4535e7;return this['isAlive']()&&this[_0xded830(0x66b)]<this[_0xded830(0xa03)]*VisuMZ['CoreEngine'][_0xded830(0x806)][_0xded830(0x432)][_0xded830(0x9e8)];},Game_Battler[_0x4535e7(0x781)]['performMiss']=function(){const _0x141b6d=_0x4535e7;SoundManager['playMiss'](),this[_0x141b6d(0x7f3)]('evade');},VisuMZ['CoreEngine'][_0x4535e7(0x344)]=Game_Actor[_0x4535e7(0x781)][_0x4535e7(0x7fc)],Game_Actor[_0x4535e7(0x781)]['paramBase']=function(_0xd4a189){const _0x20cf6c=_0x4535e7;if(this[_0x20cf6c(0x223)]>0x63)return this['paramBaseAboveLevel99'](_0xd4a189);return VisuMZ[_0x20cf6c(0x7ac)][_0x20cf6c(0x344)][_0x20cf6c(0x77f)](this,_0xd4a189);},Game_Actor[_0x4535e7(0x781)][_0x4535e7(0x461)]=function(_0x148d80){const _0x44951b=_0x4535e7,_0x546982=this['currentClass']()['params'][_0x148d80][0x63],_0x5b6cbc=this[_0x44951b(0x839)]()[_0x44951b(0x26d)][_0x148d80][0x62];return _0x546982+(_0x546982-_0x5b6cbc)*(this[_0x44951b(0x223)]-0x63);},VisuMZ[_0x4535e7(0x7ac)]['Game_Actor_changeClass']=Game_Actor[_0x4535e7(0x781)]['changeClass'],Game_Actor[_0x4535e7(0x781)][_0x4535e7(0x362)]=function(_0x55bfb9,_0x26bfa3){const _0x534a9a=_0x4535e7;$gameTemp[_0x534a9a(0x28a)]=!![],VisuMZ[_0x534a9a(0x7ac)][_0x534a9a(0x78f)][_0x534a9a(0x77f)](this,_0x55bfb9,_0x26bfa3),$gameTemp['_changingClass']=undefined;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x57a)]=Game_Actor[_0x4535e7(0x781)][_0x4535e7(0x9e3)],Game_Actor[_0x4535e7(0x781)]['levelUp']=function(){const _0x275810=_0x4535e7;VisuMZ[_0x275810(0x7ac)][_0x275810(0x57a)][_0x275810(0x77f)](this);if(!$gameTemp[_0x275810(0x28a)])this[_0x275810(0x7ca)]();},Game_Actor[_0x4535e7(0x781)][_0x4535e7(0x7ca)]=function(){const _0x6c346c=_0x4535e7;this[_0x6c346c(0x760)]={};if(VisuMZ[_0x6c346c(0x7ac)][_0x6c346c(0x806)][_0x6c346c(0x405)][_0x6c346c(0x286)])this[_0x6c346c(0x66b)]=this[_0x6c346c(0xa03)];if(VisuMZ[_0x6c346c(0x7ac)]['Settings']['QoL'][_0x6c346c(0x84b)])this['_mp']=this['mmp'];},Game_Actor[_0x4535e7(0x781)][_0x4535e7(0x9be)]=function(){const _0x52a78f=_0x4535e7;if(this['isMaxLevel']())return 0x1;const _0x3366fe=this[_0x52a78f(0x64d)]()-this['currentLevelExp'](),_0x37da5a=this['currentExp']()-this[_0x52a78f(0x2c6)]();return(_0x37da5a/_0x3366fe)[_0x52a78f(0x15b)](0x0,0x1);},Game_Actor[_0x4535e7(0x781)][_0x4535e7(0x7f1)]=function(){const _0x2d17d=_0x4535e7,_0x2ad988=Game_Battler[_0x2d17d(0x781)][_0x2d17d(0x7f1)][_0x2d17d(0x77f)](this);for(const _0xc1dff6 of this[_0x2d17d(0x68b)]()){_0xc1dff6&&_0x2ad988[_0x2d17d(0x85c)](_0xc1dff6);}return _0x2ad988['push'](this['currentClass'](),this[_0x2d17d(0x2ea)]()),_0x2ad988;},Object[_0x4535e7(0x9ae)](Game_Enemy[_0x4535e7(0x781)],'level',{'get':function(){const _0x5d466b=_0x4535e7;return this[_0x5d466b(0x7df)]();},'configurable':!![]}),Game_Enemy[_0x4535e7(0x781)]['getLevel']=function(){const _0x1e48c6=_0x4535e7;return this[_0x1e48c6(0x5a9)]()[_0x1e48c6(0x223)];},Game_Enemy[_0x4535e7(0x781)]['moveRelativeToResolutionChange']=function(){const _0x1ec19f=_0x4535e7;!this['_repositioned']&&(this[_0x1ec19f(0x904)]+=Math[_0x1ec19f(0x98a)]((Graphics['height']-0x270)/0x2),this[_0x1ec19f(0x904)]-=Math[_0x1ec19f(0xa14)]((Graphics['height']-Graphics[_0x1ec19f(0x5cc)])/0x2),$gameSystem[_0x1ec19f(0x877)]()?_0x1ec19f(0x783)===_0x1ec19f(0x783)?this['_screenX']-=Math[_0x1ec19f(0xa14)]((Graphics[_0x1ec19f(0x29a)]-Graphics[_0x1ec19f(0x73c)])/0x2):this['_cancelButton']['x']=_0x505e5c[_0x1ec19f(0x73c)]+0x4:this[_0x1ec19f(0x954)]+=Math['round']((Graphics[_0x1ec19f(0x73c)]-0x330)/0x2)),this['_repositioned']=!![];},Game_Party[_0x4535e7(0x781)][_0x4535e7(0x37c)]=function(){const _0x3b088e=_0x4535e7;return VisuMZ[_0x3b088e(0x7ac)][_0x3b088e(0x806)]['Gold'][_0x3b088e(0x374)];},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x524)]=Game_Party['prototype'][_0x4535e7(0x813)],Game_Party[_0x4535e7(0x781)]['consumeItem']=function(_0xe85371){const _0x2f6a8b=_0x4535e7;if(VisuMZ['CoreEngine'][_0x2f6a8b(0x806)][_0x2f6a8b(0x405)]['KeyItemProtect']&&DataManager['isKeyItem'](_0xe85371))return;VisuMZ[_0x2f6a8b(0x7ac)]['Game_Party_consumeItem']['call'](this,_0xe85371);},Game_Party[_0x4535e7(0x781)][_0x4535e7(0x31f)]=function(){const _0x40de04=_0x4535e7,_0x34cf19=VisuMZ[_0x40de04(0x7ac)][_0x40de04(0x806)]['QoL'],_0x5a9760=_0x34cf19[_0x40de04(0x5d8)]??0x63;let _0x1e776b=[];(_0x34cf19[_0x40de04(0x8d9)]??!![])&&(_0x1e776b=_0x1e776b[_0x40de04(0x6db)]($dataItems));(_0x34cf19['BTestWeapons']??!![])&&(_0x1e776b=_0x1e776b[_0x40de04(0x6db)]($dataWeapons));(_0x34cf19[_0x40de04(0x26a)]??!![])&&(_0x40de04(0x5d1)!=='pYUyN'?_0x1e776b=_0x1e776b[_0x40de04(0x6db)]($dataArmors):this[_0x40de04(0x870)]['setBackgroundType'](_0x55c63e[_0x40de04(0x7c9)][_0x40de04(0x936)]));for(const _0x5b59e5 of _0x1e776b){if(!_0x5b59e5)continue;if(_0x5b59e5[_0x40de04(0x4e4)][_0x40de04(0x24d)]()<=0x0)continue;if(_0x5b59e5[_0x40de04(0x4e4)][_0x40de04(0x27c)](/-----/i))continue;this[_0x40de04(0x165)](_0x5b59e5,_0x5a9760);}},VisuMZ['CoreEngine'][_0x4535e7(0x4f1)]=Game_Troop['prototype'][_0x4535e7(0x389)],Game_Troop[_0x4535e7(0x781)][_0x4535e7(0x389)]=function(_0xe0c696){const _0x3f1ac5=_0x4535e7;$gameTemp[_0x3f1ac5(0x3b4)](),$gameTemp[_0x3f1ac5(0x193)](_0xe0c696),VisuMZ[_0x3f1ac5(0x7ac)][_0x3f1ac5(0x4f1)][_0x3f1ac5(0x77f)](this,_0xe0c696);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x7d7)]=Game_Map[_0x4535e7(0x781)][_0x4535e7(0x389)],Game_Map[_0x4535e7(0x781)][_0x4535e7(0x389)]=function(_0x679d08){const _0x146d1c=_0x4535e7;VisuMZ[_0x146d1c(0x7ac)]['Game_Map_setup']['call'](this,_0x679d08),this[_0x146d1c(0x38a)](),this['setupCoreEngine'](_0x679d08);},Game_Map[_0x4535e7(0x781)][_0x4535e7(0x623)]=function(){const _0x8a20cf=_0x4535e7;this[_0x8a20cf(0x450)]=VisuMZ[_0x8a20cf(0x7ac)]['Settings']['QoL'][_0x8a20cf(0x6f5)]||![];const _0x3f24c0=VisuMZ['CoreEngine'][_0x8a20cf(0x806)]['ScreenResolution'],_0x3d1a5c=$dataMap?$dataMap['note']||'':'';if(_0x3d1a5c[_0x8a20cf(0x27c)](/<SHOW TILE SHADOWS>/i)){if(_0x8a20cf(0x5de)==='MVOGV')this['_hideTileShadows']=![];else return _0x213cb5[_0x8a20cf(0x7c9)][_0x8a20cf(0x47a)][_0x8a20cf(0x77f)](this);}else _0x3d1a5c[_0x8a20cf(0x27c)](/<HIDE TILE SHADOWS>/i)&&(this[_0x8a20cf(0x450)]=!![]);if(_0x3d1a5c[_0x8a20cf(0x27c)](/<SCROLL LOCK X>/i))this[_0x8a20cf(0x2f9)]()[_0x8a20cf(0x4f3)]=!![],this[_0x8a20cf(0x2f9)]()['displayX']=_0x3f24c0['DisplayLockX'];else _0x3d1a5c['match'](/<SCROLL LOCK X: (.*?)>/i)&&(_0x8a20cf(0x7c7)===_0x8a20cf(0x7c7)?(this[_0x8a20cf(0x2f9)]()[_0x8a20cf(0x4f3)]=!![],this['centerCameraCheckData']()[_0x8a20cf(0x666)]=Number(RegExp['$1'])):_0x38aff0[_0x8a20cf(0x21b)]=!_0x11b41e[_0x8a20cf(0x21b)]);if(_0x3d1a5c[_0x8a20cf(0x27c)](/<SCROLL LOCK Y>/i))this['centerCameraCheckData']()[_0x8a20cf(0x35f)]=!![],this['centerCameraCheckData']()['displayY']=_0x3f24c0[_0x8a20cf(0x8fd)];else _0x3d1a5c[_0x8a20cf(0x27c)](/<SCROLL LOCK Y: (.*?)>/i)&&(_0x8a20cf(0x2b0)!==_0x8a20cf(0x6ee)?(this[_0x8a20cf(0x2f9)]()[_0x8a20cf(0x35f)]=!![],this['centerCameraCheckData']()[_0x8a20cf(0x359)]=Number(RegExp['$1'])):(_0x22ee73[_0x8a20cf(0x876)](),_0x953a68[_0x8a20cf(0x31d)](_0x5eae48[_0x8a20cf(0x9f6)]),_0x4d6fa7[_0x8a20cf(0x9f6)]=_0x2196e0));},Game_Map[_0x4535e7(0x781)]['areTileShadowsHidden']=function(){const _0x19476d=_0x4535e7;if(this[_0x19476d(0x450)]===undefined)this[_0x19476d(0x623)]();return this[_0x19476d(0x450)];},Game_Map['prototype'][_0x4535e7(0x38a)]=function(){const _0x440230=_0x4535e7,_0x81fc77=VisuMZ[_0x440230(0x7ac)]['Settings'][_0x440230(0x55c)];this['_centerCameraCheck']={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x81fc77[_0x440230(0x2d2)]){if(_0x440230(0x8e4)===_0x440230(0xa2c))return this[_0x440230(0x42f)]&&this['_scene']['constructor']===_0x103bad;else{const _0x24ea58=Graphics[_0x440230(0x29a)]/this[_0x440230(0x23f)]();_0x24ea58%0x1!==0x0&&Math[_0x440230(0x45a)](_0x24ea58)===this[_0x440230(0x29a)]()&&!this['isLoopHorizontal']()&&(this[_0x440230(0x406)][_0x440230(0x4f3)]=!![],this[_0x440230(0x406)]['displayX']=_0x81fc77[_0x440230(0x4ea)]||0x0);}}if(_0x81fc77[_0x440230(0x59b)]){const _0x124813=Graphics['height']/this[_0x440230(0x91d)]();if(_0x124813%0x1!==0x0&&Math[_0x440230(0x45a)](_0x124813)===this['height']()&&!this[_0x440230(0x173)]()){if(_0x440230(0x295)!==_0x440230(0x328))this[_0x440230(0x406)]['centerY']=!![],this[_0x440230(0x406)]['displayY']=_0x81fc77[_0x440230(0x8fd)]||0x0;else return![];}}},Game_Map[_0x4535e7(0x781)][_0x4535e7(0x2f9)]=function(){const _0x1c83ee=_0x4535e7;if(this[_0x1c83ee(0x406)]===undefined)this[_0x1c83ee(0x38a)]();return this[_0x1c83ee(0x406)];},VisuMZ['CoreEngine'][_0x4535e7(0x415)]=Game_Map[_0x4535e7(0x781)][_0x4535e7(0x6de)],Game_Map[_0x4535e7(0x781)]['scrollDown']=function(_0x1f840b){const _0x592c80=_0x4535e7;if(this[_0x592c80(0x2f9)]()['centerY']&&$gameScreen[_0x592c80(0x977)]()===0x1){if(_0x592c80(0x984)!==_0x592c80(0x984)){const _0x1655eb=_0xadd37e[_0x592c80(0x7e7)]((_0x3e3fab-_0x59183b)/_0x1851b7,_0x124d22||_0x592c80(0x6b8)),_0x3e6638=_0x3f48e4[_0x592c80(0x7e7)]((_0x5b79c3-_0x5903d4+0x1)/_0x1bfed2,_0x1d5903||_0x592c80(0x6b8)),_0x3162fd=(_0x4debae-_0x4d34e6*_0x1655eb)/(0x1-_0x1655eb);return _0x3162fd+(_0x4c2ef6-_0x3162fd)*_0x3e6638;}else{this[_0x592c80(0x2a4)]=this['centerCameraCheckData']()['displayY'];return;}}VisuMZ['CoreEngine']['Game_Map_scrollDown'][_0x592c80(0x77f)](this,_0x1f840b);},VisuMZ['CoreEngine']['Game_Map_scrollLeft']=Game_Map['prototype'][_0x4535e7(0x531)],Game_Map[_0x4535e7(0x781)][_0x4535e7(0x531)]=function(_0x53464a){const _0x517a5f=_0x4535e7;if(this[_0x517a5f(0x2f9)]()[_0x517a5f(0x4f3)]&&$gameScreen[_0x517a5f(0x977)]()===0x1){if(_0x517a5f(0x820)!==_0x517a5f(0x6ca)){this[_0x517a5f(0x53a)]=this[_0x517a5f(0x2f9)]()['displayX'];return;}else return!![];}VisuMZ[_0x517a5f(0x7ac)][_0x517a5f(0x73d)][_0x517a5f(0x77f)](this,_0x53464a);},VisuMZ['CoreEngine'][_0x4535e7(0x9ac)]=Game_Map[_0x4535e7(0x781)][_0x4535e7(0x7a5)],Game_Map[_0x4535e7(0x781)]['scrollRight']=function(_0x275ddb){const _0x3c8174=_0x4535e7;if(this['centerCameraCheckData']()[_0x3c8174(0x4f3)]&&$gameScreen[_0x3c8174(0x977)]()===0x1){if(_0x3c8174(0x73b)!==_0x3c8174(0x73b))return _0x59b0dc['buttonAssistCancel'];else{this[_0x3c8174(0x53a)]=this['centerCameraCheckData']()[_0x3c8174(0x666)];return;}}VisuMZ[_0x3c8174(0x7ac)][_0x3c8174(0x9ac)][_0x3c8174(0x77f)](this,_0x275ddb);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x455)]=Game_Map[_0x4535e7(0x781)][_0x4535e7(0x355)],Game_Map[_0x4535e7(0x781)][_0x4535e7(0x355)]=function(_0x16b7fb){const _0x3498fb=_0x4535e7;if(this[_0x3498fb(0x2f9)]()[_0x3498fb(0x35f)]&&$gameScreen['zoomScale']()===0x1){this[_0x3498fb(0x2a4)]=this[_0x3498fb(0x2f9)]()[_0x3498fb(0x359)];return;}VisuMZ[_0x3498fb(0x7ac)][_0x3498fb(0x455)][_0x3498fb(0x77f)](this,_0x16b7fb);},VisuMZ['CoreEngine']['Game_Character_processMoveCommand']=Game_Character[_0x4535e7(0x781)][_0x4535e7(0x4aa)],Game_Character[_0x4535e7(0x781)]['processMoveCommand']=function(_0x305b4d){const _0x5b6d00=_0x4535e7;try{VisuMZ[_0x5b6d00(0x7ac)][_0x5b6d00(0x9bd)][_0x5b6d00(0x77f)](this,_0x305b4d);}catch(_0x3857c2){if($gameTemp[_0x5b6d00(0x18e)]())console[_0x5b6d00(0x8d1)](_0x3857c2);}},Game_Player['prototype'][_0x4535e7(0x60c)]=function(){const _0x3737ca=_0x4535e7,_0xe2906e=$gameMap['encounterStep']();this['_encounterCount']=Math[_0x3737ca(0x382)](_0xe2906e)+Math[_0x3737ca(0x382)](_0xe2906e)+this['encounterStepsMinimum']();},Game_Player['prototype']['encounterStepsMinimum']=function(){const _0x23c4e7=_0x4535e7;if($dataMap&&$dataMap[_0x23c4e7(0x880)]&&$dataMap[_0x23c4e7(0x880)][_0x23c4e7(0x27c)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i))return Number(RegExp['$1']);else{if('crKJU'!==_0x23c4e7(0x8c9))return VisuMZ[_0x23c4e7(0x7ac)][_0x23c4e7(0x806)]['QoL'][_0x23c4e7(0x61c)];else{const _0x315c1e=this[_0x23c4e7(0x609)]()-this[_0x23c4e7(0x36e)]()*0x2;this[_0x23c4e7(0x86f)](_0x746374,_0x2787c4,_0x315c1e,_0x54a28a,![]);}}},VisuMZ['CoreEngine'][_0x4535e7(0x7c4)]=Game_Event[_0x4535e7(0x781)]['isCollidedWithEvents'],Game_Event[_0x4535e7(0x781)][_0x4535e7(0x92d)]=function(_0x20b0ab,_0x178c94){const _0x58c630=_0x4535e7;return this[_0x58c630(0x2cf)]()?this[_0x58c630(0x1f7)](_0x20b0ab,_0x178c94):VisuMZ['CoreEngine']['Game_Event_isCollidedWithEvents'][_0x58c630(0x77f)](this,_0x20b0ab,_0x178c94);},Game_Event[_0x4535e7(0x781)]['isSmartEventCollisionOn']=function(){const _0x21353b=_0x4535e7;return VisuMZ[_0x21353b(0x7ac)][_0x21353b(0x806)]['QoL'][_0x21353b(0x7d5)];},Game_Event[_0x4535e7(0x781)]['checkSmartEventCollision']=function(_0x1b4fae,_0x306c37){const _0x20806a=_0x4535e7;if(!this['isNormalPriority']())return![];else{if(_0x20806a(0x616)!==_0x20806a(0x5f0)){const _0x9e3b6e=$gameMap[_0x20806a(0x720)](_0x1b4fae,_0x306c37)[_0x20806a(0x184)](_0x99b9d7=>_0x99b9d7[_0x20806a(0x62d)]());return _0x9e3b6e['length']>0x0;}else return this[_0x20806a(0x854)]()[_0x20806a(0x944)];}},VisuMZ[_0x4535e7(0x7ac)]['Game_Interpreter_command105']=Game_Interpreter[_0x4535e7(0x781)]['command105'],Game_Interpreter[_0x4535e7(0x781)][_0x4535e7(0xa0b)]=function(_0x46668a){const _0x2840a4=_0x4535e7,_0x4ed1a7=this[_0x2840a4(0x7ea)]();return _0x4ed1a7['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x2840a4(0x4cc)](_0x4ed1a7):VisuMZ[_0x2840a4(0x7ac)]['Game_Interpreter_command105'][_0x2840a4(0x77f)](this,_0x46668a);},Game_Interpreter[_0x4535e7(0x781)]['getCombinedScrollingText']=function(){const _0x5be7a3=_0x4535e7;let _0x1cb198='',_0x3c182f=this[_0x5be7a3(0x58c)]+0x1;while(this[_0x5be7a3(0x1ef)][_0x3c182f]&&this[_0x5be7a3(0x1ef)][_0x3c182f][_0x5be7a3(0x340)]===0x195){if(_0x5be7a3(0x802)===_0x5be7a3(0x802))_0x1cb198+=this[_0x5be7a3(0x1ef)][_0x3c182f][_0x5be7a3(0x67d)][0x0]+'\x0a',_0x3c182f++;else{var _0x6ace80=_0x12a906(_0x3b86c9['$1']);try{_0x3f5f9c+=_0x2befd1(_0x6ace80);}catch(_0x3b6bee){if(_0x3748bd[_0x5be7a3(0x18e)]())_0x1e04c8[_0x5be7a3(0x8d1)](_0x3b6bee);}}}return _0x1cb198;},Game_Interpreter[_0x4535e7(0x781)][_0x4535e7(0x4cc)]=function(_0xd1894){const _0x5edce3=_0x4535e7;try{eval(_0xd1894);}catch(_0x2c3ff5){_0x5edce3(0x9cb)===_0x5edce3(0x9cb)?$gameTemp[_0x5edce3(0x18e)]()&&(console[_0x5edce3(0x8d1)](_0x5edce3(0x37a)),console[_0x5edce3(0x8d1)](_0x2c3ff5)):this[_0x5edce3(0x3a4)]=_0x5edce3(0x9f1);}return!![];},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x3e1)]=Game_Interpreter[_0x4535e7(0x781)]['command111'],Game_Interpreter[_0x4535e7(0x781)][_0x4535e7(0x367)]=function(_0x3f73d6){const _0x57999b=_0x4535e7;try{VisuMZ[_0x57999b(0x7ac)][_0x57999b(0x3e1)]['call'](this,_0x3f73d6);}catch(_0x131596){$gameTemp[_0x57999b(0x18e)]()&&(_0x57999b(0x555)===_0x57999b(0x233)?this['_forcedTroopView']='FV':(console[_0x57999b(0x8d1)]('Conditional\x20Branch\x20Script\x20Error'),console[_0x57999b(0x8d1)](_0x131596))),this['skipBranch']();}return!![];},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x290)]=Game_Interpreter[_0x4535e7(0x781)][_0x4535e7(0x166)],Game_Interpreter['prototype'][_0x4535e7(0x166)]=function(_0x2b9a4f){const _0x51e463=_0x4535e7;try{if('GybvF'===_0x51e463(0x552))VisuMZ['CoreEngine'][_0x51e463(0x290)][_0x51e463(0x77f)](this,_0x2b9a4f);else{if(_0x540e38)_0x25b573[_0x51e463(0x74c)](_0x4104a3);}}catch(_0x28c8b9){if($gameTemp[_0x51e463(0x18e)]()){if(_0x51e463(0x561)!==_0x51e463(0x561)){for(let _0xe107d8=0x0;_0xe107d8<this['numActions']();_0xe107d8++){const _0x179054=this['makeActionList']();let _0x15bbaa=_0x51dd49[_0x51e463(0x963)];this['setAction'](_0xe107d8,_0x179054[0x0]);for(const _0x7ef003 of _0x179054){const _0x9e8b91=_0x7ef003[_0x51e463(0x796)]();_0x9e8b91>_0x15bbaa&&(_0x15bbaa=_0x9e8b91,this[_0x51e463(0x308)](_0xe107d8,_0x7ef003));}}this['setActionState'](_0x51e463(0xa16));}else console[_0x51e463(0x8d1)]('Control\x20Variables\x20Script\x20Error'),console['log'](_0x28c8b9);}}return!![];},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x4e5)]=Game_Interpreter[_0x4535e7(0x781)][_0x4535e7(0x776)],Game_Interpreter['prototype'][_0x4535e7(0x776)]=function(){const _0x2f2ff5=_0x4535e7;try{_0x2f2ff5(0x21d)!==_0x2f2ff5(0x939)?VisuMZ[_0x2f2ff5(0x7ac)][_0x2f2ff5(0x4e5)][_0x2f2ff5(0x77f)](this):this['drawSegment'](_0x2cbe51);}catch(_0x411a2a){if($gameTemp[_0x2f2ff5(0x18e)]()){if(_0x2f2ff5(0x871)!=='PiElV'){const _0x3b2333=_0x4696dc[_0x2f2ff5(0x7ac)][_0x2f2ff5(0x806)][_0x2f2ff5(0x51c)];if(_0x3b2333&&_0x3b2333[_0x2f2ff5(0x5e3)])return _0x3b2333[_0x2f2ff5(0x5e3)][_0x2f2ff5(0x77f)](this);const _0x679683=_0xbefc13[_0x2f2ff5(0x1bd)]*0.75,_0x29a24a=_0x134a67[_0x2f2ff5(0x530)]*0.6,_0x3a65bb=_0x490c13[_0x2f2ff5(0x4cf)];this['y']+=_0x421020['round'](_0xe62d8e[_0x2f2ff5(0x382)](_0x679683)-_0x3fd497[_0x2f2ff5(0x382)](_0x29a24a))*(_0xe6eff8[_0x2f2ff5(0x16c)](_0x3a65bb,0x1e)*0.5);}else console[_0x2f2ff5(0x8d1)](_0x2f2ff5(0x506)),console[_0x2f2ff5(0x8d1)](_0x411a2a);}}return!![];},VisuMZ[_0x4535e7(0x7ac)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x4535e7(0x781)][_0x4535e7(0x1cc)],Game_Interpreter[_0x4535e7(0x781)][_0x4535e7(0x1cc)]=function(_0x265161){const _0x557f01=_0x4535e7;return $gameTemp[_0x557f01(0x9b2)](this),VisuMZ[_0x557f01(0x7ac)]['Game_Interpreter_PluginCommand'][_0x557f01(0x77f)](this,_0x265161);},Scene_Base[_0x4535e7(0x781)][_0x4535e7(0x5da)]=function(){const _0x65f3b2=_0x4535e7;return VisuMZ[_0x65f3b2(0x7ac)][_0x65f3b2(0x806)]['UI'][_0x65f3b2(0x5cb)];},Scene_Base[_0x4535e7(0x781)][_0x4535e7(0x790)]=function(){const _0x4e7612=_0x4535e7;return VisuMZ[_0x4e7612(0x7ac)]['Settings']['UI'][_0x4e7612(0x563)];},Scene_Base[_0x4535e7(0x781)][_0x4535e7(0x9f0)]=function(){const _0x438f53=_0x4535e7;return VisuMZ['CoreEngine'][_0x438f53(0x806)]['UI'][_0x438f53(0x476)];},Scene_Base['prototype'][_0x4535e7(0x91e)]=function(){const _0x16b013=_0x4535e7;return VisuMZ['CoreEngine'][_0x16b013(0x806)]['UI']['RightMenus'];},Scene_Base[_0x4535e7(0x781)]['mainCommandWidth']=function(){const _0x36895a=_0x4535e7;return VisuMZ[_0x36895a(0x7ac)][_0x36895a(0x806)]['UI']['CommandWidth'];},Scene_Base[_0x4535e7(0x781)]['buttonAreaHeight']=function(){const _0x52a8d6=_0x4535e7;return VisuMZ[_0x52a8d6(0x7ac)][_0x52a8d6(0x806)]['UI']['ButtonHeight'];},Scene_Base[_0x4535e7(0x781)][_0x4535e7(0x829)]=function(){const _0x4a028b=_0x4535e7;return VisuMZ[_0x4a028b(0x7ac)]['Settings']['Window'][_0x4a028b(0x884)];},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x8ba)]=Scene_Base[_0x4535e7(0x781)]['createWindowLayer'],Scene_Base[_0x4535e7(0x781)]['createWindowLayer']=function(){const _0xb2719f=_0x4535e7;VisuMZ['CoreEngine']['Scene_Base_createWindowLayer'][_0xb2719f(0x77f)](this),this['createButtonAssistWindow'](),this[_0xb2719f(0x5a7)]['x']=Math[_0xb2719f(0x98a)](this[_0xb2719f(0x5a7)]['x']),this['_windowLayer']['y']=Math[_0xb2719f(0x98a)](this[_0xb2719f(0x5a7)]['y']);},Scene_Base[_0x4535e7(0x781)][_0x4535e7(0x163)]=function(){},Scene_Base['prototype']['buttonAssistKey1']=function(){const _0x321fdb=_0x4535e7;return TextManager['getInputMultiButtonStrings'](_0x321fdb(0x547),'pagedown');},Scene_Base[_0x4535e7(0x781)]['buttonAssistKey2']=function(){return TextManager['getInputButtonString']('tab');},Scene_Base[_0x4535e7(0x781)][_0x4535e7(0x9ed)]=function(){const _0x17e516=_0x4535e7;return TextManager[_0x17e516(0x5e6)]('shift');},Scene_Base[_0x4535e7(0x781)][_0x4535e7(0x1a5)]=function(){const _0x4bc5b2=_0x4535e7;return TextManager[_0x4bc5b2(0x5e6)]('ok');},Scene_Base[_0x4535e7(0x781)][_0x4535e7(0x9ea)]=function(){const _0x4fd8ac=_0x4535e7;return TextManager[_0x4fd8ac(0x5e6)](_0x4fd8ac(0x9d7));},Scene_Base[_0x4535e7(0x781)][_0x4535e7(0x322)]=function(){const _0x28ccee=_0x4535e7;if(this['_pageupButton']&&this[_0x28ccee(0x4a7)]['visible']){if(_0x28ccee(0x960)==='wMbXw')this['_rate']=(_0x1e6553(_0x334589['$1'])||0x1)[_0x28ccee(0x15b)](0x1,0xa);else return TextManager['buttonAssistSwitch'];}else return'';},Scene_Base[_0x4535e7(0x781)][_0x4535e7(0x3b7)]=function(){return'';},Scene_Base[_0x4535e7(0x781)][_0x4535e7(0x8c1)]=function(){return'';},Scene_Base[_0x4535e7(0x781)][_0x4535e7(0x6c9)]=function(){return TextManager['buttonAssistOk'];},Scene_Base['prototype']['buttonAssistText5']=function(){const _0x5369e6=_0x4535e7;return TextManager[_0x5369e6(0x841)];},Scene_Base['prototype'][_0x4535e7(0x3f7)]=function(){return 0x0;},Scene_Base[_0x4535e7(0x781)][_0x4535e7(0x640)]=function(){return 0x0;},Scene_Base['prototype']['buttonAssistOffset3']=function(){return 0x0;},Scene_Base[_0x4535e7(0x781)][_0x4535e7(0x5ad)]=function(){return 0x0;},Scene_Base[_0x4535e7(0x781)]['buttonAssistOffset5']=function(){return 0x0;},VisuMZ[_0x4535e7(0x7ac)]['Scene_Boot_loadSystemImages']=Scene_Boot[_0x4535e7(0x781)]['loadSystemImages'],Scene_Boot[_0x4535e7(0x781)][_0x4535e7(0x8de)]=function(){const _0x369ed8=_0x4535e7;VisuMZ[_0x369ed8(0x7ac)][_0x369ed8(0x275)][_0x369ed8(0x77f)](this),this[_0x369ed8(0x539)]();},Scene_Boot['prototype']['loadGameImagesCoreEngine']=function(){const _0xb58e5c=_0x4535e7,_0x3e4996=[_0xb58e5c(0x1c1),'battlebacks1',_0xb58e5c(0x207),_0xb58e5c(0x797),_0xb58e5c(0x1a3),_0xb58e5c(0x46a),_0xb58e5c(0x18d),_0xb58e5c(0x836),'sv_actors',_0xb58e5c(0xa1d),_0xb58e5c(0x73e),_0xb58e5c(0x195),'titles1',_0xb58e5c(0x558)];for(const _0x520883 of _0x3e4996){const _0x22e38c=VisuMZ[_0xb58e5c(0x7ac)][_0xb58e5c(0x806)][_0xb58e5c(0x6ce)][_0x520883],_0x27bb7b=_0xb58e5c(0x15e)[_0xb58e5c(0x543)](_0x520883);for(const _0x2276f6 of _0x22e38c){if(_0xb58e5c(0x23e)!==_0xb58e5c(0x394))ImageManager[_0xb58e5c(0x36d)](_0x27bb7b,_0x2276f6);else{if(this[_0xb58e5c(0x35b)]===_0xb58e5c(0x74e))return;if(_0x7f127e[_0xb58e5c(0x693)]())return;_0x1855db[_0xb58e5c(0x7ac)][_0xb58e5c(0x54b)][_0xb58e5c(0x77f)](this),this['switchModes'](_0xb58e5c(0x696));}}}},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x489)]=Scene_Boot[_0x4535e7(0x781)][_0x4535e7(0x9bc)],Scene_Boot[_0x4535e7(0x781)][_0x4535e7(0x9bc)]=function(){const _0x3caa94=_0x4535e7;Utils[_0x3caa94(0x56d)](_0x3caa94(0x94c))&&VisuMZ[_0x3caa94(0x7ac)]['Settings'][_0x3caa94(0x405)][_0x3caa94(0x6fb)]?this['startAutoNewGame']():'tttlK'!==_0x3caa94(0x638)?this[_0x3caa94(0x5cf)](_0x4b390a[_0x3caa94(0x8bf)](_0x3caa94(0x974))):VisuMZ[_0x3caa94(0x7ac)][_0x3caa94(0x489)]['call'](this);},Scene_Boot[_0x4535e7(0x781)][_0x4535e7(0x357)]=function(){const _0x4fa186=_0x4535e7;this['checkPlayerLocation'](),DataManager['setupNewGame'](),SceneManager[_0x4fa186(0x1a2)](Scene_Map);},Scene_Boot[_0x4535e7(0x781)]['adjustBoxSize']=function(){const _0x31cf97=_0x4535e7,_0x7639b1=$dataSystem[_0x31cf97(0x2ee)]['uiAreaWidth'],_0x511b8d=$dataSystem[_0x31cf97(0x2ee)][_0x31cf97(0x6eb)],_0x2760bd=VisuMZ[_0x31cf97(0x7ac)]['Settings']['UI'][_0x31cf97(0x5ba)];Graphics[_0x31cf97(0x73c)]=_0x7639b1-_0x2760bd*0x2,Graphics[_0x31cf97(0x5cc)]=_0x511b8d-_0x2760bd*0x2,this[_0x31cf97(0x9c6)]();},VisuMZ[_0x4535e7(0x7ac)]['Scene_Boot_updateDocumentTitle']=Scene_Boot[_0x4535e7(0x781)]['updateDocumentTitle'],Scene_Boot[_0x4535e7(0x781)]['updateDocumentTitle']=function(){const _0x32fb7e=_0x4535e7;this[_0x32fb7e(0x3ac)]()?this['makeDocumentTitle']():VisuMZ['CoreEngine'][_0x32fb7e(0x1c0)][_0x32fb7e(0x77f)](this);},Scene_Boot[_0x4535e7(0x781)][_0x4535e7(0x3ac)]=function(){const _0x2f15e0=_0x4535e7;if(Scene_Title['subtitle']==='')return![];if(Scene_Title[_0x2f15e0(0x8ea)]===_0x2f15e0(0xa2e))return![];if(Scene_Title[_0x2f15e0(0x542)]==='')return![];if(Scene_Title[_0x2f15e0(0x542)]===_0x2f15e0(0x73a))return![];return!![];},Scene_Boot[_0x4535e7(0x781)][_0x4535e7(0x628)]=function(){const _0x3115e8=_0x4535e7,_0x598dd9=$dataSystem['gameTitle'],_0x5a095a=Scene_Title['subtitle']||'',_0x525a95=Scene_Title[_0x3115e8(0x542)]||'',_0x4123b5=VisuMZ[_0x3115e8(0x7ac)]['Settings']['MenuLayout'][_0x3115e8(0x178)][_0x3115e8(0x34e)],_0x28aab2=_0x4123b5[_0x3115e8(0x543)](_0x598dd9,_0x5a095a,_0x525a95);document[_0x3115e8(0xa23)]=_0x28aab2;},Scene_Boot[_0x4535e7(0x781)][_0x4535e7(0x9c6)]=function(){const _0x226386=_0x4535e7;if(VisuMZ['CoreEngine'][_0x226386(0x806)]['UI'][_0x226386(0x5d4)]){const _0xa79ae7=Graphics[_0x226386(0x29a)]-Graphics[_0x226386(0x73c)]-VisuMZ[_0x226386(0x7ac)]['Settings']['UI'][_0x226386(0x5ba)]*0x2,_0x194810=Sprite_Button[_0x226386(0x781)][_0x226386(0x53e)][_0x226386(0x77f)](this)*0x4;if(_0xa79ae7>=_0x194810)SceneManager[_0x226386(0x9cc)](!![]);}},Scene_Title['subtitle']=VisuMZ['CoreEngine']['Settings'][_0x4535e7(0x5ab)][_0x4535e7(0x178)][_0x4535e7(0xa2e)],Scene_Title[_0x4535e7(0x542)]=VisuMZ['CoreEngine'][_0x4535e7(0x806)][_0x4535e7(0x5ab)][_0x4535e7(0x178)][_0x4535e7(0x3a6)],Scene_Title[_0x4535e7(0x421)]=VisuMZ[_0x4535e7(0x7ac)]['Settings'][_0x4535e7(0x1b7)],VisuMZ['CoreEngine']['Scene_Title_drawGameTitle']=Scene_Title['prototype'][_0x4535e7(0x632)],Scene_Title[_0x4535e7(0x781)][_0x4535e7(0x632)]=function(){const _0x7050f4=_0x4535e7;VisuMZ[_0x7050f4(0x7ac)][_0x7050f4(0x806)][_0x7050f4(0x5ab)]['Title'][_0x7050f4(0x632)][_0x7050f4(0x77f)](this);if(Scene_Title['subtitle']!==''&&Scene_Title[_0x7050f4(0x8ea)]!==_0x7050f4(0xa2e))this['drawGameSubtitle']();if(Scene_Title[_0x7050f4(0x542)]!==''&&Scene_Title[_0x7050f4(0x542)]!==_0x7050f4(0x73a))this[_0x7050f4(0x438)]();},Scene_Title[_0x4535e7(0x781)][_0x4535e7(0x603)]=function(){const _0x3450c1=_0x4535e7;VisuMZ['CoreEngine'][_0x3450c1(0x806)][_0x3450c1(0x5ab)][_0x3450c1(0x178)][_0x3450c1(0x603)][_0x3450c1(0x77f)](this);},Scene_Title[_0x4535e7(0x781)][_0x4535e7(0x438)]=function(){const _0x18a562=_0x4535e7;VisuMZ['CoreEngine'][_0x18a562(0x806)][_0x18a562(0x5ab)]['Title'][_0x18a562(0x438)][_0x18a562(0x77f)](this);},Scene_Title[_0x4535e7(0x781)][_0x4535e7(0x7b7)]=function(){const _0x540371=_0x4535e7;this[_0x540371(0x465)]();const _0x9c20cc=$dataSystem['titleCommandWindow']['background'],_0x4bc080=this[_0x540371(0x27f)]();this[_0x540371(0x52b)]=new Window_TitleCommand(_0x4bc080),this[_0x540371(0x52b)][_0x540371(0x518)](_0x9c20cc);const _0x15164e=this['commandWindowRect']();this[_0x540371(0x52b)][_0x540371(0x582)](_0x15164e['x'],_0x15164e['y'],_0x15164e[_0x540371(0x29a)],_0x15164e[_0x540371(0x1ad)]),this[_0x540371(0x52b)][_0x540371(0x304)](),this[_0x540371(0x52b)][_0x540371(0x358)](),this['_commandWindow'][_0x540371(0x808)](),this['addWindow'](this[_0x540371(0x52b)]);},Scene_Title[_0x4535e7(0x781)][_0x4535e7(0x732)]=function(){const _0xd3088d=_0x4535e7;return this['_commandWindow']?this['_commandWindow']['maxItems']():VisuMZ[_0xd3088d(0x7ac)][_0xd3088d(0x806)][_0xd3088d(0x9da)][_0xd3088d(0x2ec)];},Scene_Title[_0x4535e7(0x781)][_0x4535e7(0x27f)]=function(){const _0x46f3d0=_0x4535e7;return VisuMZ[_0x46f3d0(0x7ac)]['Settings']['MenuLayout'][_0x46f3d0(0x178)][_0x46f3d0(0x1ec)][_0x46f3d0(0x77f)](this);},Scene_Title[_0x4535e7(0x781)][_0x4535e7(0x465)]=function(){const _0x4c2824=_0x4535e7;for(const _0x14f445 of Scene_Title[_0x4c2824(0x421)]){const _0xf924fc=new Sprite_TitlePictureButton(_0x14f445);this[_0x4c2824(0x379)](_0xf924fc);}},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x392)]=Scene_Map[_0x4535e7(0x781)][_0x4535e7(0x614)],Scene_Map[_0x4535e7(0x781)][_0x4535e7(0x614)]=function(){const _0x2c2d7d=_0x4535e7;VisuMZ[_0x2c2d7d(0x7ac)][_0x2c2d7d(0x392)]['call'](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),this[_0x2c2d7d(0x6e2)]();},VisuMZ['CoreEngine']['Scene_Map_updateMainMultiply']=Scene_Map[_0x4535e7(0x781)]['updateMainMultiply'],Scene_Map[_0x4535e7(0x781)]['updateMainMultiply']=function(){const _0x57462f=_0x4535e7;VisuMZ[_0x57462f(0x7ac)]['Scene_Map_updateMainMultiply'][_0x57462f(0x77f)](this);if($gameTemp[_0x57462f(0x21b)]&&!$gameMessage['isBusy']()){if('TCSFQ'!==_0x57462f(0x549)){let _0x2dc00c=_0x1c728f[_0x57462f(0x7ac)][_0x57462f(0x7f6)]['call'](this,_0x5a33cf);return _0x2dc00c['x']=_0x1970ae['round'](_0x2dc00c['x']),_0x2dc00c['y']=_0x58cafe[_0x57462f(0x98a)](_0x2dc00c['y']),_0x2dc00c[_0x57462f(0x29a)]=_0x5f4a45[_0x57462f(0x98a)](_0x2dc00c[_0x57462f(0x29a)]),_0x2dc00c[_0x57462f(0x1ad)]=_0x2d0116[_0x57462f(0x98a)](_0x2dc00c['height']),_0x2dc00c;}else this['updateMain'](),SceneManager[_0x57462f(0x70e)]();}},Scene_Map[_0x4535e7(0x781)]['terminate']=function(){const _0x5c60dc=_0x4535e7;Scene_Message[_0x5c60dc(0x781)][_0x5c60dc(0x56e)][_0x5c60dc(0x77f)](this),!SceneManager[_0x5c60dc(0x1f6)](Scene_Battle)&&(_0x5c60dc(0x716)!==_0x5c60dc(0x364)?(this['_spriteset']['update'](),this['_mapNameWindow'][_0x5c60dc(0x66c)](),this[_0x5c60dc(0x5a7)][_0x5c60dc(0x755)]=![],SceneManager['snapForBackground']()):this[_0x5c60dc(0x39b)]={'duration':0x0,'wholeDuration':0x0,'type':_0x5c60dc(0x2c7),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this[_0x5c60dc(0x150)]['y'],'targetOpacity':this[_0x5c60dc(0x64b)],'targetBackOpacity':this[_0x5c60dc(0x92c)],'targetContentsOpacity':this[_0x5c60dc(0x34a)]}),$gameScreen[_0x5c60dc(0x4a2)](),this[_0x5c60dc(0x6e2)]();},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x30d)]=Scene_Map['prototype'][_0x4535e7(0x37f)],Scene_Map['prototype']['createMenuButton']=function(){const _0x51c933=_0x4535e7;VisuMZ[_0x51c933(0x7ac)][_0x51c933(0x30d)][_0x51c933(0x77f)](this),SceneManager[_0x51c933(0xa37)]()&&this[_0x51c933(0x1f4)]();},Scene_Map[_0x4535e7(0x781)][_0x4535e7(0x1f4)]=function(){const _0x89533e=_0x4535e7;this[_0x89533e(0x373)]['x']=Graphics[_0x89533e(0x73c)]+0x4;},VisuMZ['CoreEngine'][_0x4535e7(0x615)]=Scene_Map['prototype']['updateScene'],Scene_Map[_0x4535e7(0x781)][_0x4535e7(0x4b8)]=function(){const _0x3fe8a7=_0x4535e7;VisuMZ['CoreEngine'][_0x3fe8a7(0x615)][_0x3fe8a7(0x77f)](this),this[_0x3fe8a7(0x50a)]();},Scene_Map['prototype'][_0x4535e7(0x50a)]=function(){const _0x3a9497=_0x4535e7;Input['isTriggered'](_0x3a9497(0x792))&&(ConfigManager['alwaysDash']=!ConfigManager[_0x3a9497(0x472)],ConfigManager[_0x3a9497(0x6fd)]());},VisuMZ['CoreEngine']['Scene_Map_updateMain']=Scene_Map[_0x4535e7(0x781)][_0x4535e7(0x3ce)],Scene_Map[_0x4535e7(0x781)][_0x4535e7(0x3ce)]=function(){const _0x27d6fb=_0x4535e7;VisuMZ[_0x27d6fb(0x7ac)][_0x27d6fb(0x37e)][_0x27d6fb(0x77f)](this),this['updateOnceParallelInterpreters']();},Scene_Map[_0x4535e7(0x781)][_0x4535e7(0x6e2)]=function(){this['_onceParallelInterpreters']=[];},Scene_Map[_0x4535e7(0x781)][_0x4535e7(0x84d)]=function(){const _0xf99cac=_0x4535e7;if(!this['_onceParallelInterpreters'])return;for(const _0x11cedf of this[_0xf99cac(0x8f5)]){_0x11cedf&&_0x11cedf[_0xf99cac(0x76e)]();}},Scene_Map[_0x4535e7(0x781)][_0x4535e7(0x1b9)]=function(_0x45e746){const _0xe78dee=_0x4535e7,_0x1e080e=$dataCommonEvents[_0x45e746];if(!_0x1e080e)return;const _0x455b1c=new Game_OnceParallelInterpreter();this['addOnceParallelInterpreter'](_0x455b1c),_0x455b1c[_0xe78dee(0x825)](_0x45e746);},Scene_Map[_0x4535e7(0x781)][_0x4535e7(0x9e9)]=function(_0x454890){const _0x419445=_0x4535e7;this[_0x419445(0x8f5)]=this[_0x419445(0x8f5)]||[],this['_onceParallelInterpreters']['push'](_0x454890);},Scene_Map[_0x4535e7(0x781)][_0x4535e7(0x737)]=function(_0x4394ce){const _0x2ab697=_0x4535e7;this[_0x2ab697(0x8f5)]=this['_onceParallelInterpreters']||[],this[_0x2ab697(0x8f5)][_0x2ab697(0x775)](_0x4394ce);};function Game_OnceParallelInterpreter(){const _0x3c93a4=_0x4535e7;this[_0x3c93a4(0x614)](...arguments);}Game_OnceParallelInterpreter[_0x4535e7(0x781)]=Object[_0x4535e7(0x4ec)](Game_Interpreter[_0x4535e7(0x781)]),Game_OnceParallelInterpreter[_0x4535e7(0x781)][_0x4535e7(0x30f)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x4535e7(0x781)][_0x4535e7(0x825)]=function(_0x7175a2){const _0x3ff8f2=_0x4535e7,_0x4409fa=$dataCommonEvents[_0x7175a2];_0x4409fa?this['setup'](_0x4409fa[_0x3ff8f2(0x9d6)],0x0):'RzNcM'===_0x3ff8f2(0x3c5)?this[_0x3ff8f2(0x56e)]():_0x10f547*=_0x49ddbb(_0x453c26);},Game_OnceParallelInterpreter[_0x4535e7(0x781)]['terminate']=function(){const _0xddccc9=_0x4535e7;if(!SceneManager[_0xddccc9(0x94d)]())return;SceneManager[_0xddccc9(0x42f)][_0xddccc9(0x737)](this),Game_Interpreter[_0xddccc9(0x781)][_0xddccc9(0x56e)][_0xddccc9(0x77f)](this);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x837)]=Scene_MenuBase[_0x4535e7(0x781)][_0x4535e7(0x7fa)],Scene_MenuBase[_0x4535e7(0x781)][_0x4535e7(0x7fa)]=function(){const _0x4ab842=_0x4535e7;let _0x4a3708=0x0;return SceneManager[_0x4ab842(0x5b8)]()?_0x4a3708=this['helpAreaTopSideButtonLayout']():_0x4a3708=VisuMZ[_0x4ab842(0x7ac)][_0x4ab842(0x837)][_0x4ab842(0x77f)](this),_0x4a3708;},Scene_MenuBase[_0x4535e7(0x781)][_0x4535e7(0x95e)]=function(){const _0x541414=_0x4535e7;if(this[_0x541414(0x790)]())return this[_0x541414(0x669)]();else{if('Jdwgn'!==_0x541414(0x1eb))return 0x0;else this[_0x541414(0x9d2)]='SV';}},VisuMZ['CoreEngine'][_0x4535e7(0x994)]=Scene_MenuBase[_0x4535e7(0x781)][_0x4535e7(0x949)],Scene_MenuBase['prototype']['mainAreaTop']=function(){const _0x48367a=_0x4535e7;if(SceneManager[_0x48367a(0x5b8)]())return this['mainAreaTopSideButtonLayout']();else{if(_0x48367a(0x702)!==_0x48367a(0x702)){_0x23bf56[_0x48367a(0x7ac)]['ParseClassNotetags'][_0x48367a(0x77f)](this,_0x30f8c6);if(_0x494680[_0x48367a(0x32f)])for(const _0x999dcf of _0x115ff4[_0x48367a(0x32f)]){_0x999dcf[_0x48367a(0x880)]['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x999dcf['level']=_0x599a16[_0x48367a(0x548)](_0x39ef27(_0x309fb8['$1']),0x1));}}else return VisuMZ['CoreEngine'][_0x48367a(0x994)][_0x48367a(0x77f)](this);}},Scene_MenuBase[_0x4535e7(0x781)][_0x4535e7(0x6b4)]=function(){const _0x1fd5b8=_0x4535e7;if(!this[_0x1fd5b8(0x790)]()){if('WRoQk'!==_0x1fd5b8(0x264))return this['helpAreaBottom']();else this['_forcedBattleSys']='ETB';}else return this[_0x1fd5b8(0x63b)]()&&this[_0x1fd5b8(0x82a)]()==='top'?Window_ButtonAssist[_0x1fd5b8(0x781)][_0x1fd5b8(0x80a)]():0x0;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x999)]=Scene_MenuBase[_0x4535e7(0x781)][_0x4535e7(0x23c)],Scene_MenuBase[_0x4535e7(0x781)][_0x4535e7(0x23c)]=function(){const _0x2e2e67=_0x4535e7;let _0x19ca04=0x0;if(SceneManager[_0x2e2e67(0x5b8)]())_0x19ca04=this['mainAreaHeightSideButtonLayout']();else{if(_0x2e2e67(0x2ac)!=='uOuYi')_0x19ca04=VisuMZ['CoreEngine'][_0x2e2e67(0x999)][_0x2e2e67(0x77f)](this);else{let _0xc4f6bd=_0x5b65ca[_0x2e2e67(0x98a)](_0xc86786[_0x2e2e67(0x29a)]/0x2+0xc0);_0xc4f6bd-=_0x1c45a1[_0x2e2e67(0xa14)]((_0x50bb11[_0x2e2e67(0x29a)]-_0x27159f[_0x2e2e67(0x73c)])/0x2),_0xc4f6bd+=_0x53b32a*0x20;let _0x5ab586=_0x2abe67[_0x2e2e67(0x1ad)]-0xc8-_0x4adf09[_0x2e2e67(0x739)]()*0x30;_0x5ab586-=_0x2d14a4['floor']((_0x57be99[_0x2e2e67(0x1ad)]-_0x4ba87b['boxHeight'])/0x2),_0x5ab586+=_0x33b7b1*0x30,this['setHome'](_0xc4f6bd,_0x5ab586);}}return this['isMenuButtonAssistEnabled']()&&this[_0x2e2e67(0x82a)]()!==_0x2e2e67(0x462)&&(_0x19ca04-=Window_ButtonAssist[_0x2e2e67(0x781)][_0x2e2e67(0x80a)]()),_0x19ca04;},Scene_MenuBase[_0x4535e7(0x781)][_0x4535e7(0x8a2)]=function(){const _0x464f4a=_0x4535e7;return Graphics[_0x464f4a(0x5cc)]-this['helpAreaHeight']();},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x1e4)]=Scene_MenuBase[_0x4535e7(0x781)][_0x4535e7(0x8b9)],Scene_MenuBase[_0x4535e7(0x781)][_0x4535e7(0x8b9)]=function(){const _0x5281a3=_0x4535e7,_0x299000=VisuMZ['CoreEngine'][_0x5281a3(0x806)][_0x5281a3(0x61f)]['BlurStrength']??0x8;this[_0x5281a3(0x194)]=new PIXI[(_0x5281a3(0x501))][(_0x5281a3(0x635))](_0x299000),this['_backgroundSprite']=new Sprite(),this[_0x5281a3(0x8d3)]['bitmap']=SceneManager[_0x5281a3(0x9b1)](),this['_backgroundSprite']['filters']=[this['_backgroundFilter']],this[_0x5281a3(0x379)](this[_0x5281a3(0x8d3)]),this['setBackgroundOpacity'](0xc0),this[_0x5281a3(0x3dd)](this[_0x5281a3(0x724)]()),this[_0x5281a3(0x590)]();},Scene_MenuBase[_0x4535e7(0x781)]['getBackgroundOpacity']=function(){const _0xd4b5b6=_0x4535e7,_0x20d787=String(this['constructor'][_0xd4b5b6(0x4e4)]),_0x19734e=this['getCustomBackgroundSettings'](_0x20d787);if(_0x19734e){if(_0xd4b5b6(0x759)==='HibsG')return _0x19734e[_0xd4b5b6(0x4d5)];else this[_0xd4b5b6(0x8cb)][_0xd4b5b6(0x55d)]=this['_url'],![]&&this['_image'][_0xd4b5b6(0x29a)]>0x0&&(this['_image']['onload']=null,this[_0xd4b5b6(0x3ca)]());}else return 0xc0;},Scene_MenuBase[_0x4535e7(0x781)]['createCustomBackgroundImages']=function(){const _0x149b4d=_0x4535e7,_0x16623a=String(this[_0x149b4d(0x30f)]['name']),_0x2e6f09=this[_0x149b4d(0x159)](_0x16623a);if(_0x2e6f09&&(_0x2e6f09['BgFilename1']!==''||_0x2e6f09['BgFilename2']!=='')){if(_0x149b4d(0x4f2)==='zmQst'){if(this[_0x149b4d(0x7b3)]!==_0x2b2dce)return _0x59de85[_0x149b4d(0x548)](0x0,this[_0x149b4d(0x7b3)]);return this[_0x149b4d(0x8be)]();}else this[_0x149b4d(0xa2d)]=new Sprite(ImageManager['loadTitle1'](_0x2e6f09[_0x149b4d(0x1f0)])),this[_0x149b4d(0x6d8)]=new Sprite(ImageManager[_0x149b4d(0x5d2)](_0x2e6f09[_0x149b4d(0x4fc)])),this['addChild'](this[_0x149b4d(0xa2d)]),this['addChild'](this['_backSprite2']),this[_0x149b4d(0xa2d)][_0x149b4d(0x7c5)][_0x149b4d(0x74b)](this['adjustSprite'][_0x149b4d(0x8f2)](this,this[_0x149b4d(0xa2d)])),this[_0x149b4d(0x6d8)][_0x149b4d(0x7c5)][_0x149b4d(0x74b)](this['adjustSprite'][_0x149b4d(0x8f2)](this,this['_backSprite2']));}},Scene_MenuBase[_0x4535e7(0x781)][_0x4535e7(0x159)]=function(_0x4c8da8){const _0x51869a=_0x4535e7;return VisuMZ[_0x51869a(0x7ac)][_0x51869a(0x806)][_0x51869a(0x61f)][_0x4c8da8]||VisuMZ['CoreEngine'][_0x51869a(0x806)][_0x51869a(0x61f)]['Scene_Unlisted'];},Scene_MenuBase['prototype'][_0x4535e7(0x2d1)]=function(_0x766e45){const _0x5c6fd6=_0x4535e7;this[_0x5c6fd6(0x9c9)](_0x766e45),this[_0x5c6fd6(0x7b6)](_0x766e45);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x8af)]=Scene_MenuBase[_0x4535e7(0x781)][_0x4535e7(0x3a9)],Scene_MenuBase['prototype'][_0x4535e7(0x3a9)]=function(){const _0x495815=_0x4535e7;VisuMZ['CoreEngine'][_0x495815(0x8af)]['call'](this),SceneManager[_0x495815(0xa37)]()&&this[_0x495815(0x16a)]();},Scene_MenuBase[_0x4535e7(0x781)][_0x4535e7(0x16a)]=function(){const _0x416f3a=_0x4535e7;this[_0x416f3a(0x9d1)]['x']=Graphics[_0x416f3a(0x73c)]+0x4;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0xa0f)]=Scene_MenuBase[_0x4535e7(0x781)][_0x4535e7(0x58e)],Scene_MenuBase['prototype'][_0x4535e7(0x58e)]=function(){const _0x5eb777=_0x4535e7;VisuMZ[_0x5eb777(0x7ac)][_0x5eb777(0xa0f)][_0x5eb777(0x77f)](this),SceneManager[_0x5eb777(0xa37)]()&&(_0x5eb777(0x505)!==_0x5eb777(0x505)?this['_editWindow'][_0x5eb777(0x518)](_0x6d621c[_0x5eb777(0x7c9)]['EditBgType']):this[_0x5eb777(0x5b3)]());},Scene_MenuBase[_0x4535e7(0x781)]['movePageButtonSideButtonLayout']=function(){const _0x1530cc=_0x4535e7;this['_pageupButton']['x']=-0x1*(this[_0x1530cc(0x4a7)][_0x1530cc(0x29a)]+this['_pagedownButton'][_0x1530cc(0x29a)]+0x8),this['_pagedownButton']['x']=-0x1*(this[_0x1530cc(0x4d9)][_0x1530cc(0x29a)]+0x4);},Scene_MenuBase[_0x4535e7(0x781)][_0x4535e7(0x63b)]=function(){const _0x55c9ba=_0x4535e7;return VisuMZ['CoreEngine'][_0x55c9ba(0x806)][_0x55c9ba(0x40d)][_0x55c9ba(0x684)];},Scene_MenuBase[_0x4535e7(0x781)][_0x4535e7(0x82a)]=function(){const _0x1d629d=_0x4535e7;return SceneManager[_0x1d629d(0xa37)]()||SceneManager[_0x1d629d(0x4b4)]()?VisuMZ['CoreEngine'][_0x1d629d(0x806)][_0x1d629d(0x40d)]['Location']:_0x1d629d(0x1ba)===_0x1d629d(0x477)?_0x1d629d(0x1c5):_0x1d629d(0x462);},Scene_MenuBase['prototype'][_0x4535e7(0x163)]=function(){const _0x5e134a=_0x4535e7;if(!this[_0x5e134a(0x63b)]())return;const _0x263ca6=this[_0x5e134a(0x511)]();this[_0x5e134a(0x695)]=new Window_ButtonAssist(_0x263ca6),this[_0x5e134a(0x292)](this[_0x5e134a(0x695)]);},Scene_MenuBase[_0x4535e7(0x781)]['buttonAssistWindowRect']=function(){const _0x4ffbc3=_0x4535e7;return this[_0x4ffbc3(0x82a)]()===_0x4ffbc3(0x462)?this['buttonAssistWindowButtonRect']():this[_0x4ffbc3(0x50f)]();},Scene_MenuBase['prototype'][_0x4535e7(0x3d8)]=function(){const _0x19db66=_0x4535e7,_0x24c5ef=ConfigManager[_0x19db66(0x60e)]?(Sprite_Button[_0x19db66(0x781)][_0x19db66(0x53e)]()+0x6)*0x2:0x0,_0x14b7b1=this[_0x19db66(0x1b2)](),_0x3e8385=Graphics['boxWidth']-_0x24c5ef*0x2,_0x1fe0a4=this[_0x19db66(0x5c9)]();return new Rectangle(_0x24c5ef,_0x14b7b1,_0x3e8385,_0x1fe0a4);},Scene_MenuBase[_0x4535e7(0x781)]['buttonAssistWindowSideRect']=function(){const _0x61040f=_0x4535e7,_0xd832f9=Graphics['boxWidth'],_0x2a5fb8=Window_ButtonAssist[_0x61040f(0x781)][_0x61040f(0x80a)](),_0x18b5b=0x0;let _0xae03e5=0x0;if(this[_0x61040f(0x82a)]()==='top')_0xae03e5=0x0;else{if(_0x61040f(0x890)!==_0x61040f(0x890)){const _0x1bdba6=_0x3360e8[_0x5f291b];_0x1bdba6['name'][_0x61040f(0x27c)](/(.*)\/(.*)/i)&&(_0x1bdba6[_0x61040f(0x4e4)]=_0x22eb23(_0x1660b6['$2']['trim']()));}else _0xae03e5=Graphics[_0x61040f(0x5cc)]-_0x2a5fb8;}return new Rectangle(_0x18b5b,_0xae03e5,_0xd832f9,_0x2a5fb8);},Scene_Menu[_0x4535e7(0x7c9)]=VisuMZ['CoreEngine'][_0x4535e7(0x806)]['MenuLayout'][_0x4535e7(0x565)],VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x6c4)]=Scene_Menu[_0x4535e7(0x781)][_0x4535e7(0x4ec)],Scene_Menu['prototype']['create']=function(){const _0x3f3aa3=_0x4535e7;VisuMZ[_0x3f3aa3(0x7ac)][_0x3f3aa3(0x6c4)][_0x3f3aa3(0x77f)](this),this[_0x3f3aa3(0x93d)]();},Scene_Menu[_0x4535e7(0x781)][_0x4535e7(0x93d)]=function(){const _0x321345=_0x4535e7;this[_0x321345(0x52b)]&&this['_commandWindow'][_0x321345(0x518)](Scene_Menu['layoutSettings'][_0x321345(0x658)]);this['_goldWindow']&&this['_goldWindow'][_0x321345(0x518)](Scene_Menu[_0x321345(0x7c9)][_0x321345(0x596)]);if(this[_0x321345(0x870)]){if(_0x321345(0x998)==='Plkob'){const _0x339658=_0x321345(0x5b0);this['_colorCache']=this[_0x321345(0x94f)]||{};if(this['_colorCache'][_0x339658])return this[_0x321345(0x94f)][_0x339658];const _0x40534b=_0x10fef7[_0x321345(0x7ac)]['Settings'][_0x321345(0x4ba)]['ColorCTGauge2'];return this[_0x321345(0x3ed)](_0x339658,_0x40534b);}else this[_0x321345(0x870)][_0x321345(0x518)](Scene_Menu['layoutSettings'][_0x321345(0x936)]);}},Scene_Menu[_0x4535e7(0x781)][_0x4535e7(0x27f)]=function(){const _0x5850a2=_0x4535e7;return Scene_Menu[_0x5850a2(0x7c9)][_0x5850a2(0x1ec)][_0x5850a2(0x77f)](this);},Scene_Menu[_0x4535e7(0x781)]['goldWindowRect']=function(){const _0x5e4f8a=_0x4535e7;return Scene_Menu[_0x5e4f8a(0x7c9)][_0x5e4f8a(0x9a9)][_0x5e4f8a(0x77f)](this);},Scene_Menu[_0x4535e7(0x781)]['statusWindowRect']=function(){const _0x30a86b=_0x4535e7;return Scene_Menu[_0x30a86b(0x7c9)]['StatusRect'][_0x30a86b(0x77f)](this);},Scene_Item[_0x4535e7(0x7c9)]=VisuMZ['CoreEngine']['Settings'][_0x4535e7(0x5ab)]['ItemMenu'],VisuMZ[_0x4535e7(0x7ac)]['Scene_Item_create']=Scene_Item['prototype'][_0x4535e7(0x4ec)],Scene_Item[_0x4535e7(0x781)][_0x4535e7(0x4ec)]=function(){const _0x1b9a57=_0x4535e7;VisuMZ[_0x1b9a57(0x7ac)][_0x1b9a57(0x40c)][_0x1b9a57(0x77f)](this),this[_0x1b9a57(0x93d)]();},Scene_Item[_0x4535e7(0x781)][_0x4535e7(0x93d)]=function(){const _0x25f552=_0x4535e7;this[_0x25f552(0x236)]&&this['_helpWindow'][_0x25f552(0x518)](Scene_Item['layoutSettings']['HelpBgType']),this[_0x25f552(0x45f)]&&this[_0x25f552(0x45f)]['setBackgroundType'](Scene_Item[_0x25f552(0x7c9)][_0x25f552(0xa1b)]),this[_0x25f552(0x2a5)]&&this[_0x25f552(0x2a5)]['setBackgroundType'](Scene_Item[_0x25f552(0x7c9)][_0x25f552(0x14d)]),this['_actorWindow']&&this[_0x25f552(0x9db)]['setBackgroundType'](Scene_Item[_0x25f552(0x7c9)][_0x25f552(0x402)]);},Scene_Item[_0x4535e7(0x781)][_0x4535e7(0x8eb)]=function(){const _0x52a054=_0x4535e7;return Scene_Item[_0x52a054(0x7c9)][_0x52a054(0x3f3)][_0x52a054(0x77f)](this);},Scene_Item['prototype'][_0x4535e7(0x556)]=function(){const _0x35bdeb=_0x4535e7;return Scene_Item[_0x35bdeb(0x7c9)]['CategoryRect'][_0x35bdeb(0x77f)](this);},Scene_Item[_0x4535e7(0x781)][_0x4535e7(0x443)]=function(){const _0x20e1f2=_0x4535e7;return Scene_Item[_0x20e1f2(0x7c9)][_0x20e1f2(0x1df)]['call'](this);},Scene_Item[_0x4535e7(0x781)]['actorWindowRect']=function(){const _0x35f9b6=_0x4535e7;return Scene_Item[_0x35f9b6(0x7c9)]['ActorRect'][_0x35f9b6(0x77f)](this);},Scene_Skill['layoutSettings']=VisuMZ[_0x4535e7(0x7ac)]['Settings']['MenuLayout'][_0x4535e7(0x162)],VisuMZ['CoreEngine'][_0x4535e7(0x951)]=Scene_Skill[_0x4535e7(0x781)][_0x4535e7(0x4ec)],Scene_Skill[_0x4535e7(0x781)][_0x4535e7(0x4ec)]=function(){const _0x4ddea3=_0x4535e7;VisuMZ[_0x4ddea3(0x7ac)][_0x4ddea3(0x951)][_0x4ddea3(0x77f)](this),this[_0x4ddea3(0x93d)]();},Scene_Skill[_0x4535e7(0x781)]['setCoreEngineUpdateWindowBg']=function(){const _0x193383=_0x4535e7;this[_0x193383(0x236)]&&this['_helpWindow']['setBackgroundType'](Scene_Skill[_0x193383(0x7c9)][_0x193383(0x6a8)]),this[_0x193383(0x3cd)]&&this['_skillTypeWindow'][_0x193383(0x518)](Scene_Skill[_0x193383(0x7c9)]['SkillTypeBgType']),this['_statusWindow']&&this[_0x193383(0x870)]['setBackgroundType'](Scene_Skill['layoutSettings'][_0x193383(0x936)]),this[_0x193383(0x2a5)]&&this['_itemWindow'][_0x193383(0x518)](Scene_Skill['layoutSettings'][_0x193383(0x14d)]),this[_0x193383(0x9db)]&&(_0x193383(0x422)===_0x193383(0x422)?this[_0x193383(0x9db)][_0x193383(0x518)](Scene_Skill['layoutSettings'][_0x193383(0x402)]):_0x3e7e8b['erasePicture'](_0x4e8331));},Scene_Skill[_0x4535e7(0x781)][_0x4535e7(0x8eb)]=function(){const _0x151c5e=_0x4535e7;return Scene_Skill[_0x151c5e(0x7c9)]['HelpRect'][_0x151c5e(0x77f)](this);},Scene_Skill[_0x4535e7(0x781)][_0x4535e7(0x8ce)]=function(){const _0x75c8ee=_0x4535e7;return Scene_Skill['layoutSettings']['SkillTypeRect'][_0x75c8ee(0x77f)](this);},Scene_Skill[_0x4535e7(0x781)][_0x4535e7(0x933)]=function(){const _0x4384f0=_0x4535e7;return Scene_Skill[_0x4384f0(0x7c9)]['StatusRect'][_0x4384f0(0x77f)](this);},Scene_Skill['prototype']['itemWindowRect']=function(){const _0xa34b5b=_0x4535e7;return Scene_Skill['layoutSettings'][_0xa34b5b(0x1df)][_0xa34b5b(0x77f)](this);},Scene_Skill['prototype'][_0x4535e7(0x214)]=function(){const _0x1a8532=_0x4535e7;return Scene_Skill['layoutSettings'][_0x1a8532(0x492)][_0x1a8532(0x77f)](this);},Scene_Equip['layoutSettings']=VisuMZ['CoreEngine'][_0x4535e7(0x806)][_0x4535e7(0x5ab)][_0x4535e7(0x8c5)],VisuMZ[_0x4535e7(0x7ac)]['Scene_Equip_create']=Scene_Equip[_0x4535e7(0x781)][_0x4535e7(0x4ec)],Scene_Equip[_0x4535e7(0x781)][_0x4535e7(0x4ec)]=function(){const _0x34815e=_0x4535e7;VisuMZ[_0x34815e(0x7ac)]['Scene_Equip_create'][_0x34815e(0x77f)](this),this[_0x34815e(0x93d)]();},Scene_Equip[_0x4535e7(0x781)][_0x4535e7(0x93d)]=function(){const _0xa62562=_0x4535e7;this[_0xa62562(0x236)]&&this[_0xa62562(0x236)][_0xa62562(0x518)](Scene_Equip[_0xa62562(0x7c9)][_0xa62562(0x6a8)]);if(this[_0xa62562(0x870)]){if(_0xa62562(0x2b9)!=='iuHWN'){const _0x5a6f5d=_0x23386f[_0xa62562(0x67f)]()[_0xa62562(0x24d)]();for(const _0x2f7db9 in _0x39f2ff[_0xa62562(0x7ac)][_0xa62562(0x7e0)]){if(_0x5a6f5d[_0xa62562(0x454)](_0x2f7db9)){const _0x101605=_0x858520[_0xa62562(0x7ac)][_0xa62562(0x7e0)][_0x2f7db9],_0x187fd6=_0x341882[_0xa62562(0x7ac)][_0xa62562(0x46e)][_0x101605];return _0x187fd6[_0x42eb35]||this[_0xa62562(0x7a8)](_0x459721);}}return this[_0xa62562(0x7a8)](_0x3345ed);}else this[_0xa62562(0x870)][_0xa62562(0x518)](Scene_Equip[_0xa62562(0x7c9)][_0xa62562(0x936)]);}this['_commandWindow']&&this['_commandWindow'][_0xa62562(0x518)](Scene_Equip[_0xa62562(0x7c9)]['CommandBgType']);if(this[_0xa62562(0xa2b)]){if(_0xa62562(0x30c)!=='Cyxtz')return _0x207a5a[_0xa62562(0x548)](0x0,this[_0xa62562(0x7b3)]);else this[_0xa62562(0xa2b)][_0xa62562(0x518)](Scene_Equip[_0xa62562(0x7c9)][_0xa62562(0x152)]);}this['_itemWindow']&&this['_itemWindow'][_0xa62562(0x518)](Scene_Equip[_0xa62562(0x7c9)]['ItemBgType']);},Scene_Equip[_0x4535e7(0x781)][_0x4535e7(0x8eb)]=function(){const _0x46efb5=_0x4535e7;return Scene_Equip['layoutSettings'][_0x46efb5(0x3f3)][_0x46efb5(0x77f)](this);},Scene_Equip[_0x4535e7(0x781)][_0x4535e7(0x933)]=function(){const _0x230c71=_0x4535e7;return Scene_Equip[_0x230c71(0x7c9)][_0x230c71(0x47a)][_0x230c71(0x77f)](this);},Scene_Equip['prototype'][_0x4535e7(0x27f)]=function(){const _0x20d696=_0x4535e7;return Scene_Equip[_0x20d696(0x7c9)][_0x20d696(0x1ec)][_0x20d696(0x77f)](this);},Scene_Equip['prototype'][_0x4535e7(0xa24)]=function(){const _0x4889fe=_0x4535e7;return Scene_Equip[_0x4889fe(0x7c9)]['SlotRect'][_0x4889fe(0x77f)](this);},Scene_Equip[_0x4535e7(0x781)][_0x4535e7(0x443)]=function(){const _0x298092=_0x4535e7;return Scene_Equip[_0x298092(0x7c9)][_0x298092(0x1df)]['call'](this);},Scene_Status['layoutSettings']=VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x806)][_0x4535e7(0x5ab)][_0x4535e7(0x216)],VisuMZ['CoreEngine'][_0x4535e7(0x4c1)]=Scene_Status[_0x4535e7(0x781)]['create'],Scene_Status[_0x4535e7(0x781)][_0x4535e7(0x4ec)]=function(){const _0x262572=_0x4535e7;VisuMZ[_0x262572(0x7ac)]['Scene_Status_create']['call'](this),this[_0x262572(0x93d)]();},Scene_Status[_0x4535e7(0x781)][_0x4535e7(0x93d)]=function(){const _0x1d960a=_0x4535e7;this[_0x1d960a(0x437)]&&this[_0x1d960a(0x437)]['setBackgroundType'](Scene_Status[_0x1d960a(0x7c9)][_0x1d960a(0x250)]);if(this[_0x1d960a(0x870)]){if(_0x1d960a(0x89f)!=='NPOWV'){const _0x59575d=_0xb9f355[_0x1d960a(0x7ac)]['Settings'][_0x1d960a(0x51c)];if(_0x59575d&&_0x59575d['randomJS'])return _0x59575d['randomJS']['call'](this);const _0x5a9875=_0x1b345c[_0x1d960a(0x1bd)]*0.75,_0x46af26=_0xc4cd59[_0x1d960a(0x530)]*0.6,_0x7f4e27=_0x5212ec[_0x1d960a(0x4cf)];this['x']+=_0x4bb878['round'](_0x119bc9[_0x1d960a(0x382)](_0x5a9875)-_0x1d32fd[_0x1d960a(0x382)](_0x46af26))*(_0x59087a[_0x1d960a(0x16c)](_0x7f4e27,0x1e)*0.5),this['y']+=_0x5c8993['round'](_0x55da22['randomInt'](_0x5a9875)-_0x59b5b0[_0x1d960a(0x382)](_0x46af26))*(_0x497723['min'](_0x7f4e27,0x1e)*0.5);}else this[_0x1d960a(0x870)][_0x1d960a(0x518)](Scene_Status[_0x1d960a(0x7c9)][_0x1d960a(0x936)]);}this[_0x1d960a(0x850)]&&this['_statusParamsWindow'][_0x1d960a(0x518)](Scene_Status[_0x1d960a(0x7c9)][_0x1d960a(0x30e)]);if(this[_0x1d960a(0x16d)]){if(_0x1d960a(0x52d)===_0x1d960a(0x5a0)){if(this[_0x1d960a(0x3b0)]===_0x2eb90f)this[_0x1d960a(0xa28)]();if(this[_0x1d960a(0x3b0)][_0x1d960a(0x750)]===_0x4128a5)this[_0x1d960a(0x156)]();this[_0x1d960a(0x3b0)]['BattleSystem']=_0x1b3b40;}else this[_0x1d960a(0x16d)][_0x1d960a(0x518)](Scene_Status[_0x1d960a(0x7c9)][_0x1d960a(0x82d)]);}},Scene_Status['prototype']['profileWindowRect']=function(){const _0x282d45=_0x4535e7;return Scene_Status['layoutSettings'][_0x282d45(0x9ec)][_0x282d45(0x77f)](this);},Scene_Status[_0x4535e7(0x781)][_0x4535e7(0x933)]=function(){const _0xadd026=_0x4535e7;return Scene_Status[_0xadd026(0x7c9)][_0xadd026(0x47a)]['call'](this);},Scene_Status['prototype'][_0x4535e7(0x745)]=function(){const _0x7cc622=_0x4535e7;return Scene_Status[_0x7cc622(0x7c9)][_0x7cc622(0x272)][_0x7cc622(0x77f)](this);},Scene_Status[_0x4535e7(0x781)][_0x4535e7(0x3b8)]=function(){const _0x56a91d=_0x4535e7;return Scene_Status[_0x56a91d(0x7c9)][_0x56a91d(0x271)][_0x56a91d(0x77f)](this);},Scene_Options['layoutSettings']=VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x806)][_0x4535e7(0x5ab)]['OptionsMenu'],VisuMZ['CoreEngine'][_0x4535e7(0x466)]=Scene_Options[_0x4535e7(0x781)]['create'],Scene_Options[_0x4535e7(0x781)][_0x4535e7(0x4ec)]=function(){const _0x4bf42c=_0x4535e7;VisuMZ['CoreEngine'][_0x4bf42c(0x466)][_0x4bf42c(0x77f)](this),this[_0x4bf42c(0x93d)]();},Scene_Options[_0x4535e7(0x781)]['setCoreEngineUpdateWindowBg']=function(){const _0x1e761f=_0x4535e7;if(this[_0x1e761f(0x80c)]){if(_0x1e761f(0x8b8)===_0x1e761f(0x91f))return _0x2b3ea8&&this[_0x1e761f(0x204)]?this['_actor']['canEquip'](_0x243f94):_0x1b1b05['CoreEngine'][_0x1e761f(0x2fe)][_0x1e761f(0x77f)](this,_0x715b0e);else this[_0x1e761f(0x80c)]['setBackgroundType'](Scene_Options['layoutSettings'][_0x1e761f(0x6d9)]);}},Scene_Options[_0x4535e7(0x781)][_0x4535e7(0x413)]=function(){const _0x1efb05=_0x4535e7;return Scene_Options[_0x1efb05(0x7c9)][_0x1efb05(0x230)][_0x1efb05(0x77f)](this);},Scene_Save[_0x4535e7(0x7c9)]=VisuMZ['CoreEngine'][_0x4535e7(0x806)][_0x4535e7(0x5ab)][_0x4535e7(0x18b)],Scene_Save[_0x4535e7(0x781)]['create']=function(){const _0x58867f=_0x4535e7;Scene_File[_0x58867f(0x781)][_0x58867f(0x4ec)][_0x58867f(0x77f)](this),this[_0x58867f(0x93d)]();},Scene_Save['prototype'][_0x4535e7(0x93d)]=function(){const _0x37ed4c=_0x4535e7;this[_0x37ed4c(0x236)]&&this[_0x37ed4c(0x236)]['setBackgroundType'](Scene_Save[_0x37ed4c(0x7c9)][_0x37ed4c(0x6a8)]),this[_0x37ed4c(0x83f)]&&this[_0x37ed4c(0x83f)]['setBackgroundType'](Scene_Save[_0x37ed4c(0x7c9)]['ListBgType']);},Scene_Save[_0x4535e7(0x781)]['helpWindowRect']=function(){const _0x286aba=_0x4535e7;return Scene_Save[_0x286aba(0x7c9)][_0x286aba(0x3f3)][_0x286aba(0x77f)](this);},Scene_Save[_0x4535e7(0x781)][_0x4535e7(0x1aa)]=function(){const _0x1ed783=_0x4535e7;return Scene_Save[_0x1ed783(0x7c9)]['ListRect'][_0x1ed783(0x77f)](this);},Scene_Load[_0x4535e7(0x7c9)]=VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x806)][_0x4535e7(0x5ab)][_0x4535e7(0x660)],Scene_Load[_0x4535e7(0x781)][_0x4535e7(0x4ec)]=function(){const _0x379111=_0x4535e7;Scene_File[_0x379111(0x781)]['create']['call'](this),this[_0x379111(0x93d)]();},Scene_Load['prototype'][_0x4535e7(0x93d)]=function(){const _0x21b9ff=_0x4535e7;this[_0x21b9ff(0x236)]&&('qmpKC'===_0x21b9ff(0x9e7)?this[_0x21b9ff(0x236)][_0x21b9ff(0x518)](Scene_Load[_0x21b9ff(0x7c9)][_0x21b9ff(0x6a8)]):_0x4c64f1[_0x21b9ff(0x7ac)][_0x21b9ff(0x9f4)][_0x21b9ff(0x77f)](this,_0x3b0d16));if(this[_0x21b9ff(0x83f)]){if(_0x21b9ff(0x7a9)==='juTIU')this[_0x21b9ff(0x83f)][_0x21b9ff(0x518)](Scene_Load[_0x21b9ff(0x7c9)][_0x21b9ff(0x2c5)]);else{const _0x5b571b=_0x2fa09e[_0x21b9ff(0x7ac)][_0x21b9ff(0x806)][_0x21b9ff(0x46e)];for(const _0x3e8f91 of _0x5b571b){const _0x314edf=(_0x3e8f91['Name']||'')[_0x21b9ff(0x67f)]()['trim'](),_0x2e8b28=(_0x3e8f91[_0x21b9ff(0x270)]||'')[_0x21b9ff(0x67f)]()[_0x21b9ff(0x24d)]();_0x334a03[_0x21b9ff(0x7ac)][_0x21b9ff(0x46e)][_0x314edf]=_0x3e8f91,_0x5c1569[_0x21b9ff(0x7ac)][_0x21b9ff(0x7e0)][_0x2e8b28]=_0x314edf;}}}},Scene_Load[_0x4535e7(0x781)][_0x4535e7(0x8eb)]=function(){const _0x2cf93a=_0x4535e7;return Scene_Load['layoutSettings'][_0x2cf93a(0x3f3)][_0x2cf93a(0x77f)](this);},Scene_Load['prototype'][_0x4535e7(0x1aa)]=function(){const _0x2d35f0=_0x4535e7;return Scene_Load[_0x2d35f0(0x7c9)]['ListRect'][_0x2d35f0(0x77f)](this);},Scene_GameEnd[_0x4535e7(0x7c9)]=VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x806)][_0x4535e7(0x5ab)]['GameEnd'],VisuMZ[_0x4535e7(0x7ac)]['Scene_GameEnd_createBackground']=Scene_GameEnd[_0x4535e7(0x781)]['createBackground'],Scene_GameEnd[_0x4535e7(0x781)][_0x4535e7(0x8b9)]=function(){const _0x44e544=_0x4535e7;Scene_MenuBase[_0x44e544(0x781)][_0x44e544(0x8b9)][_0x44e544(0x77f)](this);},Scene_GameEnd[_0x4535e7(0x781)][_0x4535e7(0x7b7)]=function(){const _0x5cebdf=_0x4535e7,_0x5e5b54=this[_0x5cebdf(0x27f)]();this[_0x5cebdf(0x52b)]=new Window_GameEnd(_0x5e5b54),this[_0x5cebdf(0x52b)][_0x5cebdf(0x3b5)](_0x5cebdf(0x9d7),this[_0x5cebdf(0x8f0)]['bind'](this)),this[_0x5cebdf(0x292)](this[_0x5cebdf(0x52b)]),this['_commandWindow']['setBackgroundType'](Scene_GameEnd[_0x5cebdf(0x7c9)][_0x5cebdf(0x658)]);},Scene_GameEnd[_0x4535e7(0x781)][_0x4535e7(0x27f)]=function(){const _0x1c158d=_0x4535e7;return Scene_GameEnd['layoutSettings']['CommandRect'][_0x1c158d(0x77f)](this);},Scene_Shop['layoutSettings']=VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x806)][_0x4535e7(0x5ab)][_0x4535e7(0x3fc)],VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x924)]=Scene_Shop[_0x4535e7(0x781)][_0x4535e7(0x4ec)],Scene_Shop['prototype'][_0x4535e7(0x4ec)]=function(){const _0x411a81=_0x4535e7;VisuMZ[_0x411a81(0x7ac)][_0x411a81(0x924)][_0x411a81(0x77f)](this),this[_0x411a81(0x93d)]();},Scene_Shop[_0x4535e7(0x781)]['setCoreEngineUpdateWindowBg']=function(){const _0xda18d8=_0x4535e7;this[_0xda18d8(0x236)]&&this[_0xda18d8(0x236)][_0xda18d8(0x518)](Scene_Shop[_0xda18d8(0x7c9)][_0xda18d8(0x6a8)]);this['_goldWindow']&&this[_0xda18d8(0x853)][_0xda18d8(0x518)](Scene_Shop[_0xda18d8(0x7c9)][_0xda18d8(0x596)]);if(this[_0xda18d8(0x52b)]){if(_0xda18d8(0x3e4)!==_0xda18d8(0x5c5))this[_0xda18d8(0x52b)]['setBackgroundType'](Scene_Shop[_0xda18d8(0x7c9)][_0xda18d8(0x658)]);else{const _0x2a007d=_0x16d6f7['call'](this);return _0x5cc5bf===_0xda18d8(0x578)?_0x449e21[_0xda18d8(0x98a)](_0x2a007d):_0x2a007d;}}this[_0xda18d8(0x7ff)]&&this['_dummyWindow'][_0xda18d8(0x518)](Scene_Shop[_0xda18d8(0x7c9)][_0xda18d8(0x7f0)]);this[_0xda18d8(0x599)]&&this[_0xda18d8(0x599)][_0xda18d8(0x518)](Scene_Shop[_0xda18d8(0x7c9)][_0xda18d8(0x572)]);if(this['_statusWindow']){if(_0xda18d8(0x665)!==_0xda18d8(0x665))return _0x5d8c9d[_0xda18d8(0x7ac)][_0xda18d8(0x746)][_0x29ea3d]||0x0;else this[_0xda18d8(0x870)][_0xda18d8(0x518)](Scene_Shop[_0xda18d8(0x7c9)][_0xda18d8(0x936)]);}this['_buyWindow']&&(_0xda18d8(0x412)!==_0xda18d8(0x412)?_0x7b07d[_0xda18d8(0x47d)](_0x22d450):this[_0xda18d8(0x158)][_0xda18d8(0x518)](Scene_Shop[_0xda18d8(0x7c9)]['BuyBgType']));this[_0xda18d8(0x45f)]&&this['_categoryWindow'][_0xda18d8(0x518)](Scene_Shop[_0xda18d8(0x7c9)][_0xda18d8(0xa1b)]);if(this[_0xda18d8(0x704)]){if(_0xda18d8(0x7bb)!=='BeMOG')this[_0xda18d8(0x704)][_0xda18d8(0x518)](Scene_Shop[_0xda18d8(0x7c9)][_0xda18d8(0x674)]);else{if(this[_0xda18d8(0x450)]===_0x3ed941)this['setupCoreEngine']();return this[_0xda18d8(0x450)];}}},Scene_Shop[_0x4535e7(0x781)][_0x4535e7(0x8eb)]=function(){return Scene_Shop['layoutSettings']['HelpRect']['call'](this);},Scene_Shop[_0x4535e7(0x781)][_0x4535e7(0x463)]=function(){const _0x25e748=_0x4535e7;return Scene_Shop[_0x25e748(0x7c9)][_0x25e748(0x9a9)][_0x25e748(0x77f)](this);},Scene_Shop[_0x4535e7(0x781)][_0x4535e7(0x27f)]=function(){const _0x115115=_0x4535e7;return Scene_Shop[_0x115115(0x7c9)]['CommandRect'][_0x115115(0x77f)](this);},Scene_Shop['prototype']['dummyWindowRect']=function(){const _0x837e23=_0x4535e7;return Scene_Shop[_0x837e23(0x7c9)][_0x837e23(0x50b)][_0x837e23(0x77f)](this);},Scene_Shop[_0x4535e7(0x781)][_0x4535e7(0x863)]=function(){const _0x27484b=_0x4535e7;return Scene_Shop[_0x27484b(0x7c9)][_0x27484b(0x38d)]['call'](this);},Scene_Shop[_0x4535e7(0x781)][_0x4535e7(0x933)]=function(){return Scene_Shop['layoutSettings']['StatusRect']['call'](this);},Scene_Shop[_0x4535e7(0x781)][_0x4535e7(0x95c)]=function(){const _0x1ce885=_0x4535e7;return Scene_Shop[_0x1ce885(0x7c9)][_0x1ce885(0xa00)][_0x1ce885(0x77f)](this);},Scene_Shop[_0x4535e7(0x781)]['categoryWindowRect']=function(){const _0x59fcee=_0x4535e7;return Scene_Shop[_0x59fcee(0x7c9)][_0x59fcee(0x3e9)][_0x59fcee(0x77f)](this);},Scene_Shop['prototype'][_0x4535e7(0x500)]=function(){const _0x1a3a4e=_0x4535e7;return Scene_Shop[_0x1a3a4e(0x7c9)][_0x1a3a4e(0x19b)]['call'](this);},Scene_Name[_0x4535e7(0x7c9)]=VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x806)][_0x4535e7(0x5ab)]['NameMenu'],VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0xa2a)]=Scene_Name[_0x4535e7(0x781)]['create'],Scene_Name[_0x4535e7(0x781)][_0x4535e7(0x4ec)]=function(){const _0x2fe54a=_0x4535e7;VisuMZ[_0x2fe54a(0x7ac)][_0x2fe54a(0xa2a)][_0x2fe54a(0x77f)](this),this[_0x2fe54a(0x93d)]();},Scene_Name[_0x4535e7(0x781)][_0x4535e7(0x93d)]=function(){const _0x14b811=_0x4535e7;this[_0x14b811(0x458)]&&this[_0x14b811(0x458)]['setBackgroundType'](Scene_Name['layoutSettings'][_0x14b811(0x4cb)]),this[_0x14b811(0x3c7)]&&('JYMkx'!==_0x14b811(0x1db)?this[_0x14b811(0x965)]():this[_0x14b811(0x3c7)][_0x14b811(0x518)](Scene_Name[_0x14b811(0x7c9)][_0x14b811(0x5bf)]));},Scene_Name['prototype'][_0x4535e7(0x26e)]=function(){return 0x0;},Scene_Name[_0x4535e7(0x781)][_0x4535e7(0x5f8)]=function(){const _0x78e8b2=_0x4535e7;return Scene_Name['layoutSettings']['EditRect'][_0x78e8b2(0x77f)](this);},Scene_Name[_0x4535e7(0x781)][_0x4535e7(0x867)]=function(){const _0x5b3493=_0x4535e7;return Scene_Name[_0x5b3493(0x7c9)][_0x5b3493(0x3cf)][_0x5b3493(0x77f)](this);},Scene_Name[_0x4535e7(0x781)]['EnableNameInput']=function(){const _0x27203c=_0x4535e7;if(!this[_0x27203c(0x3c7)])return![];return VisuMZ[_0x27203c(0x7ac)][_0x27203c(0x806)][_0x27203c(0x593)][_0x27203c(0x4ce)];},Scene_Name[_0x4535e7(0x781)]['buttonAssistKey1']=function(){const _0x3e34ed=_0x4535e7;if(this[_0x3e34ed(0x4ce)]()&&this['_inputWindow']['_mode']!==_0x3e34ed(0x74e))return _0x3e34ed(0x484)!=='YZnGP'?TextManager[_0x3e34ed(0x811)]('pageup',_0x3e34ed(0x377)):this[_0x3e34ed(0x49d)][_0x3e34ed(0x2ec)]>0x0;return Scene_MenuBase['prototype'][_0x3e34ed(0x314)][_0x3e34ed(0x77f)](this);},Scene_Name[_0x4535e7(0x781)][_0x4535e7(0x9ed)]=function(){const _0x2bc4eb=_0x4535e7;return this[_0x2bc4eb(0x4ce)]()?_0x2bc4eb(0x6d7)===_0x2bc4eb(0x17c)?_0x3bb521['layoutSettings'][_0x2bc4eb(0x47a)]['call'](this):TextManager[_0x2bc4eb(0x5e6)](_0x2bc4eb(0x4ed)):Scene_MenuBase[_0x2bc4eb(0x781)][_0x2bc4eb(0x9ed)][_0x2bc4eb(0x77f)](this);},Scene_Name[_0x4535e7(0x781)][_0x4535e7(0x1a5)]=function(){const _0x7952c=_0x4535e7;if(this[_0x7952c(0x4ce)]()&&this[_0x7952c(0x3c7)][_0x7952c(0x35b)]==='keyboard')return TextManager[_0x7952c(0x417)]([_0x7952c(0x961)]);return Scene_MenuBase[_0x7952c(0x781)][_0x7952c(0x1a5)][_0x7952c(0x77f)](this);},Scene_Name[_0x4535e7(0x781)][_0x4535e7(0x9ea)]=function(){const _0x83b8aa=_0x4535e7;if(this[_0x83b8aa(0x4ce)]()&&this[_0x83b8aa(0x3c7)][_0x83b8aa(0x35b)]===_0x83b8aa(0x74e))return TextManager[_0x83b8aa(0x417)]([_0x83b8aa(0x9bf)]);return Scene_MenuBase['prototype'][_0x83b8aa(0x9ea)]['call'](this);},Scene_Name[_0x4535e7(0x781)][_0x4535e7(0x322)]=function(){const _0x182abb=_0x4535e7;if(this[_0x182abb(0x4ce)]()&&this[_0x182abb(0x3c7)][_0x182abb(0x35b)]!==_0x182abb(0x74e)){const _0x5b85ee=VisuMZ[_0x182abb(0x7ac)][_0x182abb(0x806)][_0x182abb(0x593)];return _0x5b85ee['PageChange']||_0x182abb(0x198);}return Scene_MenuBase[_0x182abb(0x781)][_0x182abb(0x322)][_0x182abb(0x77f)](this);},Scene_Name['prototype'][_0x4535e7(0x8c1)]=function(){const _0x10bfdb=_0x4535e7;if(this[_0x10bfdb(0x4ce)]()){if(_0x10bfdb(0x6ad)===_0x10bfdb(0x1bf)){const _0x23cc48=_0x10bfdb(0x602);this['_colorCache']=this[_0x10bfdb(0x94f)]||{};if(this['_colorCache'][_0x23cc48])return this[_0x10bfdb(0x94f)][_0x23cc48];const _0x5c14b9=_0x2b9b71[_0x10bfdb(0x7ac)][_0x10bfdb(0x806)][_0x10bfdb(0x4ba)][_0x10bfdb(0x478)];return this[_0x10bfdb(0x3ed)](_0x23cc48,_0x5c14b9);}else{const _0x14d900=VisuMZ[_0x10bfdb(0x7ac)][_0x10bfdb(0x806)][_0x10bfdb(0x593)];return this[_0x10bfdb(0x3c7)]['_mode']===_0x10bfdb(0x74e)?_0x14d900[_0x10bfdb(0x22e)]||_0x10bfdb(0x22e):_0x14d900[_0x10bfdb(0x65f)]||'Manual';}}else return Scene_MenuBase[_0x10bfdb(0x781)]['buttonAssistText3'][_0x10bfdb(0x77f)](this);},Scene_Name['prototype'][_0x4535e7(0x6c9)]=function(){const _0x42153d=_0x4535e7;if(this[_0x42153d(0x4ce)]()){if('EkbTt'===_0x42153d(0x53c)){const _0x24adcb=VisuMZ[_0x42153d(0x7ac)][_0x42153d(0x806)][_0x42153d(0x593)];if(this['_inputWindow'][_0x42153d(0x35b)]==='keyboard')return _0x24adcb['Finish']||_0x42153d(0x80f);}else{if(this[_0x42153d(0x2b4)]===_0x358f32)this[_0x42153d(0x697)]();this['_coreEngineShakeStyle']=_0x304f5c[_0x42153d(0x67f)]()['trim']();}}return Scene_MenuBase['prototype'][_0x42153d(0x6c9)][_0x42153d(0x77f)](this);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x470)]=Scene_Name[_0x4535e7(0x781)][_0x4535e7(0x9ff)],Scene_Name['prototype']['onInputOk']=function(){const _0x4e53e7=_0x4535e7;this[_0x4e53e7(0x22c)]()?this[_0x4e53e7(0x69a)]():VisuMZ[_0x4e53e7(0x7ac)][_0x4e53e7(0x470)][_0x4e53e7(0x77f)](this);},Scene_Name[_0x4535e7(0x781)]['doesNameContainBannedWords']=function(){const _0x1d7efb=_0x4535e7,_0x594e2b=VisuMZ[_0x1d7efb(0x7ac)][_0x1d7efb(0x806)][_0x1d7efb(0x593)];if(!_0x594e2b)return![];const _0x596e02=_0x594e2b[_0x1d7efb(0x9ce)];if(!_0x596e02)return![];const _0x170515=this[_0x1d7efb(0x458)]['name']()[_0x1d7efb(0x67f)]();for(const _0x3f8c93 of _0x596e02){if('SnbXU'===_0x1d7efb(0x922)){if(_0x170515[_0x1d7efb(0x454)](_0x3f8c93[_0x1d7efb(0x67f)]()))return!![];}else _0x4898ef['CoreEngine']['Bitmap_fillRect'][_0x1d7efb(0x77f)](this,_0x98102a,_0x7ab013,_0xbf61ef,_0x1c3068,_0x5e6705),this[_0x1d7efb(0x7aa)]();}return![];},Scene_Name[_0x4535e7(0x781)]['onInputBannedWords']=function(){const _0x2f2d91=_0x4535e7;SoundManager[_0x2f2d91(0x838)]();},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x2f1)]=Scene_Battle[_0x4535e7(0x781)][_0x4535e7(0x76e)],Scene_Battle[_0x4535e7(0x781)][_0x4535e7(0x76e)]=function(){const _0x53508d=_0x4535e7;VisuMZ[_0x53508d(0x7ac)]['Scene_Battle_update'][_0x53508d(0x77f)](this);if($gameTemp[_0x53508d(0x21b)])this[_0x53508d(0x26b)]();},Scene_Battle[_0x4535e7(0x781)][_0x4535e7(0x26b)]=function(){const _0x1d2e50=_0x4535e7;if(!BattleManager[_0x1d2e50(0x534)]()&&!this[_0x1d2e50(0x28b)]&&!$gameMessage['isBusy']()){if(_0x1d2e50(0x456)===_0x1d2e50(0x456))this[_0x1d2e50(0x28b)]=!![],this[_0x1d2e50(0x76e)](),SceneManager[_0x1d2e50(0x70e)](),this[_0x1d2e50(0x28b)]=![];else return _0x55f194[_0x1d2e50(0x7c9)][_0x1d2e50(0x3f3)]['call'](this);}},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x6c8)]=Scene_Battle[_0x4535e7(0x781)][_0x4535e7(0x3a9)],Scene_Battle[_0x4535e7(0x781)][_0x4535e7(0x3a9)]=function(){const _0x22a592=_0x4535e7;VisuMZ[_0x22a592(0x7ac)][_0x22a592(0x6c8)][_0x22a592(0x77f)](this),SceneManager[_0x22a592(0xa37)]()&&this[_0x22a592(0x532)]();},Scene_Battle[_0x4535e7(0x781)][_0x4535e7(0x532)]=function(){const _0x9ab95=_0x4535e7;this['_cancelButton']['x']=Graphics[_0x9ab95(0x73c)]+0x4,this[_0x9ab95(0x9f0)]()?this[_0x9ab95(0x9d1)]['y']=Graphics[_0x9ab95(0x5cc)]-this[_0x9ab95(0x5c9)]():_0x9ab95(0x98d)===_0x9ab95(0x736)?this[_0x9ab95(0x5e4)][_0x9ab95(0x71a)]=this['_anglePlus'][_0x9ab95(0x8ca)]:this[_0x9ab95(0x9d1)]['y']=0x0;},VisuMZ['CoreEngine']['Sprite_Button_initialize']=Sprite_Button[_0x4535e7(0x781)][_0x4535e7(0x614)],Sprite_Button['prototype'][_0x4535e7(0x614)]=function(_0x17b389){const _0x365848=_0x4535e7;VisuMZ[_0x365848(0x7ac)][_0x365848(0x61e)][_0x365848(0x77f)](this,_0x17b389),this[_0x365848(0x1b1)]();},Sprite_Button[_0x4535e7(0x781)][_0x4535e7(0x1b1)]=function(){const _0x349755=_0x4535e7,_0x381030=VisuMZ[_0x349755(0x7ac)][_0x349755(0x806)]['UI'];this[_0x349755(0x672)]=![];switch(this['_buttonType']){case'cancel':this[_0x349755(0x672)]=!_0x381030['cancelShowButton'];break;case _0x349755(0x547):case'pagedown':this[_0x349755(0x672)]=!_0x381030[_0x349755(0x1d2)];break;case _0x349755(0x181):case'up':case _0x349755(0x819):case _0x349755(0x268):case'ok':this[_0x349755(0x672)]=!_0x381030[_0x349755(0x3d7)];break;case _0x349755(0x8cd):this[_0x349755(0x672)]=!_0x381030[_0x349755(0x5ef)];break;}},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x6a5)]=Sprite_Button['prototype']['updateOpacity'],Sprite_Button[_0x4535e7(0x781)][_0x4535e7(0x3f8)]=function(){const _0x28c3bd=_0x4535e7;SceneManager[_0x28c3bd(0x4b4)]()||this['_isButtonHidden']?this[_0x28c3bd(0x5b6)]():VisuMZ['CoreEngine'][_0x28c3bd(0x6a5)][_0x28c3bd(0x77f)](this);},Sprite_Button['prototype'][_0x4535e7(0x5b6)]=function(){const _0x22778f=_0x4535e7;this[_0x22778f(0x755)]=![],this[_0x22778f(0x64b)]=0x0,this['x']=Graphics['width']*0xa,this['y']=Graphics['height']*0xa;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x6cf)]=Sprite_Battler[_0x4535e7(0x781)][_0x4535e7(0x985)],Sprite_Battler[_0x4535e7(0x781)][_0x4535e7(0x985)]=function(_0x1b99a6,_0x5d4833,_0x2fe266){const _0x1d8959=_0x4535e7;if(this[_0x1d8959(0x57e)]!==_0x1b99a6||this[_0x1d8959(0x39c)]!==_0x5d4833){if('pRlmB'===_0x1d8959(0x9e5))return _0x14bd7c[_0x1d8959(0x7ac)][_0x1d8959(0x806)]['UI'][_0x1d8959(0x3cb)];else this[_0x1d8959(0x467)](_0x1d8959(0x6b8)),this[_0x1d8959(0x88f)]=_0x2fe266;}VisuMZ[_0x1d8959(0x7ac)][_0x1d8959(0x6cf)][_0x1d8959(0x77f)](this,_0x1b99a6,_0x5d4833,_0x2fe266);},Sprite_Battler[_0x4535e7(0x781)][_0x4535e7(0x467)]=function(_0x2b456e){const _0x58ae99=_0x4535e7;this[_0x58ae99(0x9dd)]=_0x2b456e;},Sprite_Battler[_0x4535e7(0x781)][_0x4535e7(0x7fb)]=function(){const _0x1472e5=_0x4535e7;if(this[_0x1472e5(0x46b)]<=0x0)return;const _0x21949f=this[_0x1472e5(0x46b)],_0x11d568=this['_movementWholeDuration'],_0x32c629=this['_moveEasingType'];this[_0x1472e5(0x4e6)]=this[_0x1472e5(0x8a4)](this['_offsetX'],this['_targetOffsetX'],_0x21949f,_0x11d568,_0x32c629),this[_0x1472e5(0x19a)]=this[_0x1472e5(0x8a4)](this['_offsetY'],this[_0x1472e5(0x39c)],_0x21949f,_0x11d568,_0x32c629),this['_movementDuration']--;if(this['_movementDuration']<=0x0)this[_0x1472e5(0x8ec)]();},Sprite_Battler[_0x4535e7(0x781)]['applyEasing']=function(_0x4a37f6,_0xd441fb,_0xc387fa,_0xb8279e,_0x20ea31){const _0x254d72=_0x4535e7,_0x4c09db=VisuMZ[_0x254d72(0x7e7)]((_0xb8279e-_0xc387fa)/_0xb8279e,_0x20ea31||_0x254d72(0x6b8)),_0x3a74e5=VisuMZ[_0x254d72(0x7e7)]((_0xb8279e-_0xc387fa+0x1)/_0xb8279e,_0x20ea31||_0x254d72(0x6b8)),_0x153e55=(_0x4a37f6-_0xd441fb*_0x4c09db)/(0x1-_0x4c09db);return _0x153e55+(_0xd441fb-_0x153e55)*_0x3a74e5;},VisuMZ['CoreEngine'][_0x4535e7(0xa21)]=Sprite_Actor['prototype'][_0x4535e7(0x56f)],Sprite_Actor[_0x4535e7(0x781)]['setActorHome']=function(_0x160938){const _0x47af2d=_0x4535e7;if(VisuMZ[_0x47af2d(0x7ac)][_0x47af2d(0x806)]['UI'][_0x47af2d(0x8ed)])this[_0x47af2d(0x5ac)](_0x160938);else{if(_0x47af2d(0x43b)===_0x47af2d(0x43b))VisuMZ[_0x47af2d(0x7ac)]['Sprite_Actor_setActorHome'][_0x47af2d(0x77f)](this,_0x160938);else return _0x1581a9[_0x47af2d(0x7ac)]['Settings']['UI'][_0x47af2d(0x563)];}},Sprite_Actor['prototype'][_0x4535e7(0x5ac)]=function(_0x11a0a7){const _0x3af811=_0x4535e7;let _0x383932=Math[_0x3af811(0x98a)](Graphics[_0x3af811(0x29a)]/0x2+0xc0);_0x383932-=Math[_0x3af811(0xa14)]((Graphics[_0x3af811(0x29a)]-Graphics[_0x3af811(0x73c)])/0x2),_0x383932+=_0x11a0a7*0x20;let _0x2f740e=Graphics[_0x3af811(0x1ad)]-0xc8-$gameParty[_0x3af811(0x739)]()*0x30;_0x2f740e-=Math[_0x3af811(0xa14)]((Graphics[_0x3af811(0x1ad)]-Graphics[_0x3af811(0x5cc)])/0x2),_0x2f740e+=_0x11a0a7*0x30,this[_0x3af811(0x6d5)](_0x383932,_0x2f740e);},Sprite_Actor[_0x4535e7(0x781)][_0x4535e7(0x4ac)]=function(){const _0x33f71c=_0x4535e7;this[_0x33f71c(0x985)](0x4b0,0x0,0x78);},Sprite_Animation[_0x4535e7(0x781)][_0x4535e7(0x93c)]=function(_0x1d43b3){const _0x1b3928=_0x4535e7;this[_0x1b3928(0x47c)]=_0x1d43b3;},VisuMZ['CoreEngine'][_0x4535e7(0x8f8)]=Sprite_Animation[_0x4535e7(0x781)][_0x4535e7(0x626)],Sprite_Animation[_0x4535e7(0x781)][_0x4535e7(0x626)]=function(){const _0x1a6918=_0x4535e7;if(this['_muteSound'])return;VisuMZ['CoreEngine'][_0x1a6918(0x8f8)][_0x1a6918(0x77f)](this);},VisuMZ['CoreEngine']['Sprite_Animation_setViewport']=Sprite_Animation[_0x4535e7(0x781)][_0x4535e7(0x5f7)],Sprite_Animation[_0x4535e7(0x781)][_0x4535e7(0x5f7)]=function(_0x31178b){const _0x27a0f5=_0x4535e7;if(this['isAnimationOffsetXMirrored']()){if(_0x27a0f5(0x2d6)!==_0x27a0f5(0x2d6)){const _0x298b54={'x':_0x186790,'y':_0x40a5f8,'animationId':_0x5f342a,'mirror':_0x593dad,'mute':_0x4423c9};this['_pointAnimationQueue'][_0x27a0f5(0x85c)](_0x298b54);}else this['setViewportCoreEngineFix'](_0x31178b);}else VisuMZ['CoreEngine'][_0x27a0f5(0x1d0)][_0x27a0f5(0x77f)](this,_0x31178b);},Sprite_Animation[_0x4535e7(0x781)][_0x4535e7(0x77c)]=function(){const _0x5c0b16=_0x4535e7;if(!this[_0x5c0b16(0x62b)])return![];const _0x42b0a4=this[_0x5c0b16(0x62b)][_0x5c0b16(0x4e4)]||'';if(_0x42b0a4[_0x5c0b16(0x27c)](/<MIRROR OFFSET X>/i))return!![];if(_0x42b0a4[_0x5c0b16(0x27c)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x5c0b16(0x7ac)]['Settings'][_0x5c0b16(0x405)][_0x5c0b16(0x7b9)];},Sprite_Animation[_0x4535e7(0x781)]['setViewportCoreEngineFix']=function(_0x447721){const _0x459912=_0x4535e7,_0x194bec=this['_viewportSize'],_0x2057b5=this[_0x459912(0x2f4)],_0x5df64b=this['_animation']['offsetX']*(this[_0x459912(0x1e6)]?-0x1:0x1)-_0x194bec/0x2,_0x2506a9=this[_0x459912(0x62b)][_0x459912(0x807)]-_0x2057b5/0x2,_0x94ce24=this['targetPosition'](_0x447721);_0x447721['gl']['viewport'](_0x5df64b+_0x94ce24['x'],_0x2506a9+_0x94ce24['y'],_0x194bec,_0x2057b5);},Sprite_Animation['prototype'][_0x4535e7(0x9fe)]=function(_0x5b5d91){const _0xa7f817=_0x4535e7;if(_0x5b5d91[_0xa7f817(0x6a3)]){}const _0x1ccdcd=this['_animation'][_0xa7f817(0x4e4)];let _0x56d91a=_0x5b5d91[_0xa7f817(0x1ad)]*_0x5b5d91['scale']['y'],_0x1f0d90=0x0,_0x22dbb1=-_0x56d91a/0x2;if(_0x1ccdcd[_0xa7f817(0x27c)](/<(?:HEAD|HEADER|TOP)>/i))_0x22dbb1=-_0x56d91a;if(_0x1ccdcd[_0xa7f817(0x27c)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x22dbb1=0x0;if(this[_0xa7f817(0x62b)][_0xa7f817(0x7a6)])_0x22dbb1=0x0;if(_0x1ccdcd[_0xa7f817(0x27c)](/<(?:LEFT)>/i))_0x1f0d90=-_0x5b5d91[_0xa7f817(0x29a)]/0x2;if(_0x1ccdcd[_0xa7f817(0x27c)](/<(?:RIGHT)>/i))_0x1f0d90=_0x5b5d91[_0xa7f817(0x29a)]/0x2;_0x1ccdcd['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0xa7f817(0x441)==='MbjIn'?(_0x4acebe+=_0x12e771,_0x114b7b+=_0xa7f817(0x7ef)[_0xa7f817(0x543)](_0x4df73f,_0x2fc12c['parameters'][0x0]+0x1,_0x5c5986[_0xa7f817(0x67d)][0x1])):_0x1f0d90=Number(RegExp['$1'])*_0x5b5d91[_0xa7f817(0x29a)]);_0x1ccdcd[_0xa7f817(0x27c)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x22dbb1=(0x1-Number(RegExp['$1']))*-_0x56d91a);if(_0x1ccdcd[_0xa7f817(0x27c)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)){if(_0xa7f817(0x9c8)!=='hfifa')_0x1f0d90=Number(RegExp['$1'])*_0x5b5d91[_0xa7f817(0x29a)],_0x22dbb1=(0x1-Number(RegExp['$2']))*-_0x56d91a;else return _0xdf40fe[_0xa7f817(0x7ac)][_0xa7f817(0x754)][_0xa7f817(0x77f)](this);}if(_0x1ccdcd['match'](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x1f0d90+=Number(RegExp['$1']);if(_0x1ccdcd[_0xa7f817(0x27c)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x22dbb1+=Number(RegExp['$1']);_0x1ccdcd[_0xa7f817(0x27c)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&('TIFKS'===_0xa7f817(0x798)?(_0x1f0d90+=Number(RegExp['$1']),_0x22dbb1+=Number(RegExp['$2'])):(this[_0xa7f817(0x64b)]+=this['visible']?this[_0xa7f817(0x5da)]():-0x1*this[_0xa7f817(0x5da)](),this[_0xa7f817(0x64b)]=_0x3ba48c[_0xa7f817(0x16c)](0xc0,this[_0xa7f817(0x64b)])));const _0x161bae=new Point(_0x1f0d90,_0x22dbb1);return _0x5b5d91[_0xa7f817(0x35e)](),_0x5b5d91[_0xa7f817(0x39d)][_0xa7f817(0x239)](_0x161bae);},Sprite_AnimationMV['prototype'][_0x4535e7(0x2b7)]=function(){const _0x17bfef=_0x4535e7;this[_0x17bfef(0x9b7)]=VisuMZ[_0x17bfef(0x7ac)][_0x17bfef(0x806)][_0x17bfef(0x405)][_0x17bfef(0x9dc)]??0x4,this[_0x17bfef(0x3c0)](),this[_0x17bfef(0x9b7)]=this[_0x17bfef(0x9b7)][_0x17bfef(0x15b)](0x1,0xa);},Sprite_AnimationMV[_0x4535e7(0x781)][_0x4535e7(0x3c0)]=function(){const _0x5b0223=_0x4535e7;if(!this['_animation']);const _0x1b4a52=this[_0x5b0223(0x62b)][_0x5b0223(0x4e4)]||'';_0x1b4a52[_0x5b0223(0x27c)](/<RATE:[ ](\d+)>/i)&&(this[_0x5b0223(0x9b7)]=(Number(RegExp['$1'])||0x1)[_0x5b0223(0x15b)](0x1,0xa));},Sprite_AnimationMV[_0x4535e7(0x781)][_0x4535e7(0x93c)]=function(_0x1fe2fd){const _0x100899=_0x4535e7;this[_0x100899(0x47c)]=_0x1fe2fd;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x7c8)]=Sprite_AnimationMV[_0x4535e7(0x781)][_0x4535e7(0x1f8)],Sprite_AnimationMV[_0x4535e7(0x781)][_0x4535e7(0x1f8)]=function(_0x471e51){const _0x231320=_0x4535e7;this[_0x231320(0x47c)]&&(_0x471e51=JsonEx[_0x231320(0x707)](_0x471e51),_0x471e51['se']&&(_0x471e51['se'][_0x231320(0x1e3)]=0x0)),VisuMZ['CoreEngine'][_0x231320(0x7c8)][_0x231320(0x77f)](this,_0x471e51);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x217)]=Sprite_AnimationMV[_0x4535e7(0x781)]['updatePosition'],Sprite_AnimationMV[_0x4535e7(0x781)][_0x4535e7(0x3e6)]=function(){const _0x47c789=_0x4535e7;VisuMZ[_0x47c789(0x7ac)][_0x47c789(0x217)][_0x47c789(0x77f)](this);if(this[_0x47c789(0x62b)][_0x47c789(0x1da)]===0x3){if(this['x']===0x0)this['x']=Math[_0x47c789(0x98a)](Graphics[_0x47c789(0x29a)]/0x2);if(this['y']===0x0)this['y']=Math[_0x47c789(0x98a)](Graphics['height']/0x2);}},Sprite_Damage[_0x4535e7(0x781)][_0x4535e7(0x226)]=function(_0x2605b2){const _0x13eccb=_0x4535e7;let _0x26344f=Math[_0x13eccb(0x9f8)](_0x2605b2)[_0x13eccb(0x427)]();if(this['useDigitGrouping']()){if('OIpxJ'!==_0x13eccb(0x448))return _0x261ba2['CoreEngine'][_0x13eccb(0x947)][_0x2ec66e]===_0x13eccb(0x578)?_0x15e8c8:_0x26c8da((_0x4e272b*0x64)[_0x13eccb(0x20d)](_0x2b57dc))+'%';else _0x26344f=VisuMZ['GroupDigits'](_0x26344f);}const _0x4320b7=this[_0x13eccb(0x855)](),_0x125254=Math[_0x13eccb(0xa14)](_0x4320b7*0.75);for(let _0x457931=0x0;_0x457931<_0x26344f[_0x13eccb(0x2ec)];_0x457931++){if(_0x13eccb(0x96f)===_0x13eccb(0x96f)){const _0x130973=this[_0x13eccb(0x5a5)](_0x125254,_0x4320b7);_0x130973[_0x13eccb(0x7c5)][_0x13eccb(0x256)](_0x26344f[_0x457931],0x0,0x0,_0x125254,_0x4320b7,_0x13eccb(0x9a0)),_0x130973['x']=(_0x457931-(_0x26344f[_0x13eccb(0x2ec)]-0x1)/0x2)*_0x125254,_0x130973['dy']=-_0x457931;}else{_0x230a30+=_0x1839ce;if(_0x1b408e>=_0x32d8ee)_0x52994f=_0x70fe0c-0x1;this['smoothSelect'](_0x377ea7);}}},Sprite_Damage[_0x4535e7(0x781)][_0x4535e7(0x6f3)]=function(){const _0xb4d1d1=_0x4535e7;return VisuMZ[_0xb4d1d1(0x7ac)][_0xb4d1d1(0x806)][_0xb4d1d1(0x405)][_0xb4d1d1(0x9e4)];},Sprite_Damage[_0x4535e7(0x781)][_0x4535e7(0x7dd)]=function(){const _0x12cc18=_0x4535e7;return ColorManager[_0x12cc18(0x8ab)]();},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x875)]=Sprite_Gauge[_0x4535e7(0x781)][_0x4535e7(0x5a2)],Sprite_Gauge[_0x4535e7(0x781)][_0x4535e7(0x5a2)]=function(){const _0x5259ba=_0x4535e7;return VisuMZ[_0x5259ba(0x7ac)][_0x5259ba(0x875)]['call'](this)['clamp'](0x0,0x1);},VisuMZ[_0x4535e7(0x7ac)]['Sprite_Gauge_currentValue']=Sprite_Gauge['prototype'][_0x4535e7(0xa25)],Sprite_Gauge[_0x4535e7(0x781)][_0x4535e7(0xa25)]=function(){const _0x5d6645=_0x4535e7;let _0x49c76d=VisuMZ[_0x5d6645(0x7ac)][_0x5d6645(0x703)][_0x5d6645(0x77f)](this);return _0x49c76d;},Sprite_Gauge['prototype'][_0x4535e7(0x79d)]=function(){const _0x56e329=_0x4535e7;let _0x390d0c=this['currentValue']();this[_0x56e329(0x6f3)]()&&('lszvD'!==_0x56e329(0x6bc)?_0x390d0c=VisuMZ[_0x56e329(0x677)](_0x390d0c):(_0x2f42cf['keyMapper'][0x23]='end',_0x1abc6f['keyMapper'][0x24]='home'));const _0xda67c8=this['bitmapWidth']()-0x1,_0x45e7a1=this[_0x56e329(0x187)]?this[_0x56e329(0x187)]():this['bitmapHeight']();this['setupValueFont'](),this[_0x56e329(0x7c5)][_0x56e329(0x256)](_0x390d0c,0x0,0x0,_0xda67c8,_0x45e7a1,_0x56e329(0x7ae));},Sprite_Gauge['prototype'][_0x4535e7(0x6ed)]=function(){return 0x3;},Sprite_Gauge[_0x4535e7(0x781)][_0x4535e7(0x6f3)]=function(){const _0x107f74=_0x4535e7;return VisuMZ['CoreEngine'][_0x107f74(0x806)][_0x107f74(0x405)][_0x107f74(0x4db)];},Sprite_Gauge[_0x4535e7(0x781)][_0x4535e7(0x7dd)]=function(){const _0x17cf3d=_0x4535e7;return ColorManager[_0x17cf3d(0x9c0)]();},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x6cb)]=Sprite_Picture[_0x4535e7(0x781)][_0x4535e7(0x36d)],Sprite_Picture['prototype'][_0x4535e7(0x36d)]=function(){const _0x4b06cb=_0x4535e7;this[_0x4b06cb(0x57f)]&&this[_0x4b06cb(0x57f)][_0x4b06cb(0x27c)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x4b06cb(0x642)](Number(RegExp['$1'])):_0x4b06cb(0x814)!==_0x4b06cb(0x814)?(this[_0x4b06cb(0x458)]&&this['_editWindow'][_0x4b06cb(0x518)](_0x557b81[_0x4b06cb(0x7c9)]['EditBgType']),this[_0x4b06cb(0x3c7)]&&this['_inputWindow'][_0x4b06cb(0x518)](_0x47ccab[_0x4b06cb(0x7c9)][_0x4b06cb(0x5bf)])):VisuMZ['CoreEngine'][_0x4b06cb(0x6cb)][_0x4b06cb(0x77f)](this);},Sprite_Picture[_0x4535e7(0x781)][_0x4535e7(0x642)]=function(_0x57d94d){const _0x17f7dd=_0x4535e7,_0x411d67=ImageManager[_0x17f7dd(0x6d1)],_0x19a1f5=ImageManager[_0x17f7dd(0x390)],_0x155498=this[_0x17f7dd(0x57f)][_0x17f7dd(0x27c)](/SMOOTH/i);this[_0x17f7dd(0x7c5)]=new Bitmap(_0x411d67,_0x19a1f5);const _0x1d257a=ImageManager[_0x17f7dd(0x81e)](_0x17f7dd(0x9f2)),_0x27b1fd=_0x57d94d%0x10*_0x411d67,_0x30cb3d=Math[_0x17f7dd(0xa14)](_0x57d94d/0x10)*_0x19a1f5;this['bitmap'][_0x17f7dd(0x523)]=_0x155498,this['bitmap']['blt'](_0x1d257a,_0x27b1fd,_0x30cb3d,_0x411d67,_0x19a1f5,0x0,0x0,_0x411d67,_0x19a1f5);};function Sprite_TitlePictureButton(){const _0x3d7e5d=_0x4535e7;this[_0x3d7e5d(0x614)](...arguments);}Sprite_TitlePictureButton['prototype']=Object['create'](Sprite_Clickable[_0x4535e7(0x781)]),Sprite_TitlePictureButton['prototype']['constructor']=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x4535e7(0x781)][_0x4535e7(0x614)]=function(_0x2a5c0c){const _0x4ef4a9=_0x4535e7;Sprite_Clickable[_0x4ef4a9(0x781)][_0x4ef4a9(0x614)][_0x4ef4a9(0x77f)](this),this['_data']=_0x2a5c0c,this[_0x4ef4a9(0x945)]=null,this['setup']();},Sprite_TitlePictureButton[_0x4535e7(0x781)][_0x4535e7(0x389)]=function(){const _0x2b1047=_0x4535e7;this['x']=Graphics['width'],this['y']=Graphics[_0x2b1047(0x1ad)],this[_0x2b1047(0x755)]=![],this[_0x2b1047(0x2f3)]();},Sprite_TitlePictureButton[_0x4535e7(0x781)]['setupButtonImage']=function(){const _0x4797ba=_0x4535e7;this[_0x4797ba(0x7c5)]=ImageManager['loadPicture'](this[_0x4797ba(0x1ea)]['PictureFilename']),this['bitmap'][_0x4797ba(0x74b)](this['onButtonImageLoad'][_0x4797ba(0x8f2)](this));},Sprite_TitlePictureButton[_0x4535e7(0x781)][_0x4535e7(0x4a4)]=function(){const _0x258c36=_0x4535e7;this['_data'][_0x258c36(0x97e)][_0x258c36(0x77f)](this),this[_0x258c36(0x1ea)][_0x258c36(0x457)]['call'](this),this['setClickHandler'](this[_0x258c36(0x1ea)][_0x258c36(0x9fd)][_0x258c36(0x8f2)](this));},Sprite_TitlePictureButton[_0x4535e7(0x781)]['update']=function(){const _0x3611d5=_0x4535e7;Sprite_Clickable[_0x3611d5(0x781)]['update'][_0x3611d5(0x77f)](this),this[_0x3611d5(0x3f8)](),this[_0x3611d5(0x629)]();},Sprite_TitlePictureButton[_0x4535e7(0x781)][_0x4535e7(0x5da)]=function(){const _0x435fa0=_0x4535e7;return VisuMZ['CoreEngine'][_0x435fa0(0x806)][_0x435fa0(0x5ab)][_0x435fa0(0x178)][_0x435fa0(0x86e)];},Sprite_TitlePictureButton[_0x4535e7(0x781)]['updateOpacity']=function(){const _0x1e6c26=_0x4535e7;this['_pressed']||this[_0x1e6c26(0x347)]?this[_0x1e6c26(0x64b)]=0xff:(this[_0x1e6c26(0x64b)]+=this[_0x1e6c26(0x755)]?this['fadeSpeed']():-0x1*this[_0x1e6c26(0x5da)](),this[_0x1e6c26(0x64b)]=Math['min'](0xc0,this[_0x1e6c26(0x64b)]));},Sprite_TitlePictureButton[_0x4535e7(0x781)]['setClickHandler']=function(_0x4ff585){const _0x297285=_0x4535e7;this[_0x297285(0x945)]=_0x4ff585;},Sprite_TitlePictureButton[_0x4535e7(0x781)][_0x4535e7(0x657)]=function(){const _0x24bdb4=_0x4535e7;if(this[_0x24bdb4(0x945)]){if('cVrkB'!==_0x24bdb4(0x85b))return this[_0x24bdb4(0x4ce)]()?_0x3bb7be['getInputButtonString'](_0x24bdb4(0x4ed)):_0x5b4ff1[_0x24bdb4(0x781)][_0x24bdb4(0x9ed)]['call'](this);else this[_0x24bdb4(0x945)]();}},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x981)]=Spriteset_Base['prototype'][_0x4535e7(0x614)],Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x614)]=function(){const _0xb39ab=_0x4535e7;VisuMZ['CoreEngine'][_0xb39ab(0x981)][_0xb39ab(0x77f)](this),this[_0xb39ab(0x816)]();},Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x816)]=function(){const _0x4fa074=_0x4535e7;this[_0x4fa074(0x49d)]=[],this[_0x4fa074(0x608)]=[],this[_0x4fa074(0x8e9)]=this[_0x4fa074(0x150)]['x'],this[_0x4fa074(0x6e5)]=this[_0x4fa074(0x150)]['y'];},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x1a7)]=Spriteset_Base[_0x4535e7(0x781)]['destroy'],Spriteset_Base[_0x4535e7(0x781)]['destroy']=function(_0x7f01c8){const _0x346865=_0x4535e7;this[_0x346865(0x7ee)](),this[_0x346865(0x3a7)](),VisuMZ[_0x346865(0x7ac)]['Spriteset_Base_destroy'][_0x346865(0x77f)](this,_0x7f01c8);},VisuMZ[_0x4535e7(0x7ac)]['Spriteset_Base_update']=Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x76e)],Spriteset_Base[_0x4535e7(0x781)]['update']=function(){const _0x1035ec=_0x4535e7;VisuMZ[_0x1035ec(0x7ac)][_0x1035ec(0x6e1)][_0x1035ec(0x77f)](this),this[_0x1035ec(0x67a)](),this['updatePictureAntiZoom'](),this[_0x1035ec(0x6f1)](),this[_0x1035ec(0x7e2)]();},Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x67a)]=function(){},Spriteset_Base['prototype'][_0x4535e7(0x27d)]=function(){const _0x50b19d=_0x4535e7;if(!VisuMZ[_0x50b19d(0x7ac)][_0x50b19d(0x806)][_0x50b19d(0x405)][_0x50b19d(0x87c)])return;if(this[_0x50b19d(0x8e9)]===this[_0x50b19d(0x150)]['x']&&this[_0x50b19d(0x6e5)]===this[_0x50b19d(0x150)]['y'])return;this[_0x50b19d(0x49c)](),this[_0x50b19d(0x8e9)]=this[_0x50b19d(0x150)]['x'],this[_0x50b19d(0x6e5)]=this['scale']['y'];},Spriteset_Base['prototype'][_0x4535e7(0x49c)]=function(){const _0x3c57d6=_0x4535e7;if(SceneManager[_0x3c57d6(0x94d)]()&&Spriteset_Map[_0x3c57d6(0x75f)]){if(_0x3c57d6(0x4dc)===_0x3c57d6(0x407)){this['_inputSpecialKeyCode']=_0x2e54ac['keyCode'];let _0x508839=_0x47aeed['fromCharCode'](_0x31e058['charCode']);this[_0x3c57d6(0x3e7)]===_0x472841?this[_0x3c57d6(0x3e7)]=_0x508839:this['_inputString']+=_0x508839;}else return;}else{if(SceneManager[_0x3c57d6(0x5ff)]()&&Spriteset_Battle[_0x3c57d6(0x75f)])return;}this[_0x3c57d6(0x150)]['x']!==0x0&&(this[_0x3c57d6(0x88c)]['scale']['x']=0x1/this[_0x3c57d6(0x150)]['x'],this[_0x3c57d6(0x88c)]['x']=-(this['x']/this[_0x3c57d6(0x150)]['x']));if(this[_0x3c57d6(0x150)]['y']!==0x0){if('yYiph'!==_0x3c57d6(0x4f9))return _0xf8110c[_0x3c57d6(0x7ac)][_0x3c57d6(0x994)]['call'](this);else this['_pictureContainer'][_0x3c57d6(0x150)]['y']=0x1/this[_0x3c57d6(0x150)]['y'],this[_0x3c57d6(0x88c)]['y']=-(this['y']/this[_0x3c57d6(0x150)]['y']);}},VisuMZ[_0x4535e7(0x7ac)]['Spriteset_Base_updatePosition']=Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x3e6)],Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x3e6)]=function(){const _0x5242e0=_0x4535e7;VisuMZ['CoreEngine'][_0x5242e0(0x3a8)][_0x5242e0(0x77f)](this),this[_0x5242e0(0x4fd)]();},Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x4fd)]=function(){const _0x30c189=_0x4535e7;if(!$gameScreen)return;if($gameScreen['_shakeDuration']<=0x0)return;this['x']-=Math['round']($gameScreen[_0x30c189(0x2af)]());const _0x8d674=$gameScreen[_0x30c189(0x2b8)]();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case _0x30c189(0x4df):this[_0x30c189(0x3a0)]();break;case _0x30c189(0x73f):this[_0x30c189(0x769)]();break;case _0x30c189(0x6a2):this[_0x30c189(0x9c5)]();break;default:this[_0x30c189(0x287)]();break;}},Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x3a0)]=function(){const _0xe0056e=_0x4535e7,_0x26fe0b=VisuMZ['CoreEngine'][_0xe0056e(0x806)][_0xe0056e(0x51c)];if(_0x26fe0b&&_0x26fe0b[_0xe0056e(0x6ea)])return _0x26fe0b['originalJS']['call'](this);this['x']+=Math[_0xe0056e(0x98a)]($gameScreen[_0xe0056e(0x2af)]());},Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x287)]=function(){const _0x10669f=_0x4535e7,_0x2ce709=VisuMZ[_0x10669f(0x7ac)][_0x10669f(0x806)][_0x10669f(0x51c)];if(_0x2ce709&&_0x2ce709[_0x10669f(0x761)])return _0x2ce709['randomJS']['call'](this);const _0x5b7e97=$gameScreen['_shakePower']*0.75,_0x39cb1e=$gameScreen['_shakeSpeed']*0.6,_0x89906b=$gameScreen['_shakeDuration'];this['x']+=Math['round'](Math[_0x10669f(0x382)](_0x5b7e97)-Math[_0x10669f(0x382)](_0x39cb1e))*(Math['min'](_0x89906b,0x1e)*0.5),this['y']+=Math[_0x10669f(0x98a)](Math['randomInt'](_0x5b7e97)-Math['randomInt'](_0x39cb1e))*(Math[_0x10669f(0x16c)](_0x89906b,0x1e)*0.5);},Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x769)]=function(){const _0x2449e0=_0x4535e7,_0x29f332=VisuMZ[_0x2449e0(0x7ac)][_0x2449e0(0x806)][_0x2449e0(0x51c)];if(_0x29f332&&_0x29f332[_0x2449e0(0x770)]){if('OpJVl'===_0x2449e0(0x300))this['_fauxAnimationQueue']=[];else return _0x29f332['horzJS'][_0x2449e0(0x77f)](this);}const _0x5eb1ee=$gameScreen['_shakePower']*0.75,_0xc9f9f2=$gameScreen[_0x2449e0(0x530)]*0.6,_0x5e88d2=$gameScreen[_0x2449e0(0x4cf)];this['x']+=Math[_0x2449e0(0x98a)](Math[_0x2449e0(0x382)](_0x5eb1ee)-Math[_0x2449e0(0x382)](_0xc9f9f2))*(Math[_0x2449e0(0x16c)](_0x5e88d2,0x1e)*0.5);},Spriteset_Base['prototype']['updatePositionCoreEngineShakeVert']=function(){const _0x132678=_0x4535e7,_0x1f3c31=VisuMZ[_0x132678(0x7ac)][_0x132678(0x806)]['ScreenShake'];if(_0x1f3c31&&_0x1f3c31[_0x132678(0x5e3)]){if(_0x132678(0x59c)!==_0x132678(0x59c))_0xc782e6+=_0x132678(0x436)[_0x132678(0x543)](_0x2d773a[_0x132678(0x67d)][0x0]);else return _0x1f3c31['vertJS'][_0x132678(0x77f)](this);}const _0x19b041=$gameScreen[_0x132678(0x1bd)]*0.75,_0x2d9dcf=$gameScreen['_shakeSpeed']*0.6,_0x38f165=$gameScreen[_0x132678(0x4cf)];this['y']+=Math['round'](Math[_0x132678(0x382)](_0x19b041)-Math['randomInt'](_0x2d9dcf))*(Math['min'](_0x38f165,0x1e)*0.5);},Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x6f1)]=function(){const _0x29b35d=_0x4535e7;for(const _0xd2e888 of this[_0x29b35d(0x49d)]){'nXMSY'===_0x29b35d(0x331)?!_0xd2e888[_0x29b35d(0x2b3)]()&&this['removeFauxAnimation'](_0xd2e888):(_0x3bf7cc=_0x53bb7e(_0x1ee0be['$1'])*_0x3be2cd[_0x29b35d(0x29a)],_0x22df6a=(0x1-_0x3723c0(_0x418155['$2']))*-_0x4f37ad);}this['processFauxAnimationRequests']();},Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x317)]=function(){const _0x5c59f5=_0x4535e7;for(;;){if(_0x5c59f5(0x305)!==_0x5c59f5(0x305))_0x4297bc['pan']=_0x19b2d0,_0x18f77d[_0x5c59f5(0x68d)]=_0x32ba66[_0x5c59f5(0x6dc)][_0x5c59f5(0x47f)](),_0x35c09c[_0x5c59f5(0x6ac)](_0x598c99),_0x1f45c9['playBgs'](_0x70badf,_0x283c78[_0x5c59f5(0x68d)]),_0x11cf46[_0x5c59f5(0x6dc)][_0x5c59f5(0x619)](_0x30eed9[_0x5c59f5(0x68d)]);else{const _0x474911=$gameTemp[_0x5c59f5(0x1ee)]();if(_0x474911)this[_0x5c59f5(0x8b2)](_0x474911);else break;}}},Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x8b2)]=function(_0x1d55cf){const _0x29a41e=_0x4535e7,_0x4486d0=$dataAnimations[_0x1d55cf[_0x29a41e(0x757)]],_0x44969f=_0x1d55cf['targets'],_0x29c217=_0x1d55cf['mirror'],_0x386425=_0x1d55cf[_0x29a41e(0x900)];let _0x257f5b=this['animationBaseDelay']();const _0x56380f=this[_0x29a41e(0x971)]();if(this[_0x29a41e(0x997)](_0x4486d0))for(const _0x3ee905 of _0x44969f){if(_0x29a41e(0x512)==='fWvbi')this[_0x29a41e(0x5e9)]([_0x3ee905],_0x4486d0,_0x29c217,_0x257f5b,_0x386425),_0x257f5b+=_0x56380f;else return _0x38b833['CoreEngine']['Settings'][_0x29a41e(0x405)]['DigitGroupingDamageSprites'];}else this[_0x29a41e(0x5e9)](_0x44969f,_0x4486d0,_0x29c217,_0x257f5b,_0x386425);},Spriteset_Base[_0x4535e7(0x781)]['createAnimationSprite']=function(_0xe9efee,_0xbc7a60,_0x4a6b7e,_0x3fafa9){const _0x3ece2e=_0x4535e7,_0x2c0ca3=this[_0x3ece2e(0x9d4)](_0xbc7a60),_0x4d919b=new(_0x2c0ca3?Sprite_AnimationMV:Sprite_Animation)(),_0x1c7f38=this[_0x3ece2e(0x991)](_0xe9efee),_0x4d956c=this[_0x3ece2e(0x894)](),_0x2dc2c=_0x3fafa9>_0x4d956c?this[_0x3ece2e(0x773)]():null;if(this[_0x3ece2e(0x864)](_0xe9efee[0x0])){if('XVZSa'==='IeLgq')return _0x243f96[_0x3ece2e(0x7ac)][_0x3ece2e(0x806)][_0x3ece2e(0x40d)][_0x3ece2e(0x684)];else _0x4a6b7e=!_0x4a6b7e;}_0x4d919b[_0x3ece2e(0x2f0)]=_0xe9efee,_0x4d919b[_0x3ece2e(0x389)](_0x1c7f38,_0xbc7a60,_0x4a6b7e,_0x3fafa9,_0x2dc2c),this[_0x3ece2e(0x16e)](_0x4d919b),this[_0x3ece2e(0x4e1)][_0x3ece2e(0x85c)](_0x4d919b);},Spriteset_Base['prototype'][_0x4535e7(0x5e9)]=function(_0x1f51ba,_0x33be07,_0x3775f2,_0x3059ae,_0x22821c){const _0x30c064=_0x4535e7,_0x4d6ff9=this[_0x30c064(0x9d4)](_0x33be07),_0x696d7b=new(_0x4d6ff9?Sprite_AnimationMV:Sprite_Animation)(),_0x39dadb=this[_0x30c064(0x991)](_0x1f51ba);if(this[_0x30c064(0x864)](_0x1f51ba[0x0])){if(_0x30c064(0x537)===_0x30c064(0x4d4)){_0x3cb523[_0x30c064(0x395)](_0x8773b5,_0x3bf184);const _0x46673e=_0x26edc0[_0x30c064(0x856)]||0x0;_0x83936c[_0x30c064(0x747)](_0x46673e);}else _0x3775f2=!_0x3775f2;}_0x696d7b[_0x30c064(0x2f0)]=_0x1f51ba,_0x696d7b[_0x30c064(0x389)](_0x39dadb,_0x33be07,_0x3775f2,_0x3059ae),_0x696d7b['setMute'](_0x22821c),this[_0x30c064(0x16e)](_0x696d7b);if(this['_animationSprites'])this[_0x30c064(0x4e1)]['remove'](_0x696d7b);this['_fauxAnimationSprites']['push'](_0x696d7b);},Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x16e)]=function(_0x558e2f){const _0x45d07a=_0x4535e7;this[_0x45d07a(0x3f2)]['addChild'](_0x558e2f);},Spriteset_Base[_0x4535e7(0x781)]['removeAnimation']=function(_0xa7db87){const _0x3cfb71=_0x4535e7;this[_0x3cfb71(0x4e1)]['remove'](_0xa7db87),this['removeAnimationFromContainer'](_0xa7db87);for(const _0x4d1d37 of _0xa7db87[_0x3cfb71(0x2f0)]){_0x4d1d37[_0x3cfb71(0x6c1)]&&_0x4d1d37['endAnimation']();}_0xa7db87[_0x3cfb71(0x4f8)]();},Spriteset_Base['prototype']['removeFauxAnimation']=function(_0xcb788){const _0x23a9f0=_0x4535e7;this[_0x23a9f0(0x49d)][_0x23a9f0(0x775)](_0xcb788),this[_0x23a9f0(0x9ca)](_0xcb788);for(const _0x55d7d2 of _0xcb788['targetObjects']){'Qbccb'!==_0x23a9f0(0x89d)?_0x55d7d2['endAnimation']&&_0x55d7d2['endAnimation']():this[_0x23a9f0(0x474)]=[];}_0xcb788['destroy']();},Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x9ca)]=function(_0x35a84d){const _0x6d46ce=_0x4535e7;this['_effectsContainer'][_0x6d46ce(0x31d)](_0x35a84d);},Spriteset_Base['prototype'][_0x4535e7(0x7ee)]=function(){const _0x335eef=_0x4535e7;for(const _0xa86962 of this['_fauxAnimationSprites']){this[_0x335eef(0x48f)](_0xa86962);}},Spriteset_Base['prototype']['isFauxAnimationPlaying']=function(){const _0x19122e=_0x4535e7;return this[_0x19122e(0x49d)]['length']>0x0;},Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x7e2)]=function(){const _0x5a8284=_0x4535e7;for(const _0x37625d of this[_0x5a8284(0x608)]){if(_0x5a8284(0x912)!=='rLVdi'){if(!_0x37625d[_0x5a8284(0x2b3)]()){if(_0x5a8284(0x42c)!==_0x5a8284(0x42c)){if(this['_mode']===_0x5a8284(0x74e))return;if(_0x5b6d7c[_0x5a8284(0x693)]())return;_0x359e46[_0x5a8284(0x7ac)]['Window_NameInput_cursorPageup'][_0x5a8284(0x77f)](this),this['switchModes']('default');}else this[_0x5a8284(0x354)](_0x37625d);}}else _0x139af6[_0x5a8284(0x880)][_0x5a8284(0x27c)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x1c157d[_0x5a8284(0x223)]=_0x18b782[_0x5a8284(0x548)](_0x36216d(_0x5ed479['$1']),0x1));}this[_0x5a8284(0x3a1)]();},Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x3a1)]=function(){const _0x1585ea=_0x4535e7;for(;;){if(_0x1585ea(0x6be)!=='ozizQ'){_0x4a4855&&_0x5ef227&&_0x1ce081[_0x1585ea(0x880)]&&this[_0x1585ea(0x650)](_0x3f6471[_0x1585ea(0x880)]);const _0xab8994=_0x433d37[_0x40749b];if(_0xab8994){let _0x561b85=_0x588b5e[_0x1585ea(0x706)](_0xab8994['id']);this[_0x1585ea(0x650)](_0x561b85);}}else{const _0x2bfe51=$gameTemp[_0x1585ea(0x3b9)]();if(_0x2bfe51)this[_0x1585ea(0x61d)](_0x2bfe51);else break;}}},Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x61d)]=function(_0x54c63c){const _0x13aae4=_0x4535e7,_0x574da6=$dataAnimations[_0x54c63c[_0x13aae4(0x757)]],_0x44e24b=this[_0x13aae4(0x743)](_0x54c63c),_0x14c522=_0x54c63c[_0x13aae4(0x6e6)],_0x5841cb=_0x54c63c['mute'];let _0x2665b6=this[_0x13aae4(0x894)]();const _0x3579b9=this[_0x13aae4(0x971)]();if(this['isAnimationForEach'](_0x574da6))for(const _0xf8636b of _0x44e24b){this[_0x13aae4(0x1a9)]([_0xf8636b],_0x574da6,_0x14c522,_0x2665b6,_0x5841cb),_0x2665b6+=_0x3579b9;}else{if('RjpWB'===_0x13aae4(0x55e)){const _0x40a0ab=this[_0x13aae4(0x2e1)],_0x124b60=this['_height'],_0x85f035=0x18,_0x25b91b=_0x85f035/0x2,_0x470287=0x60+_0x85f035,_0x3215ec=0x0+_0x85f035;this[_0x13aae4(0x927)][_0x13aae4(0x7c5)]=this[_0x13aae4(0x19c)],this['_downArrowSprite'][_0x13aae4(0x43a)]['x']=0.5,this[_0x13aae4(0x927)][_0x13aae4(0x43a)]['y']=0.5,this[_0x13aae4(0x927)][_0x13aae4(0x95a)](_0x470287+_0x25b91b,_0x3215ec+_0x25b91b+_0x85f035,_0x85f035,_0x25b91b),this[_0x13aae4(0x927)]['move'](_0x4b4219['round'](_0x40a0ab/0x2),_0x45188a['round'](_0x124b60-_0x25b91b)),this[_0x13aae4(0x940)][_0x13aae4(0x7c5)]=this[_0x13aae4(0x19c)],this[_0x13aae4(0x940)][_0x13aae4(0x43a)]['x']=0.5,this[_0x13aae4(0x940)][_0x13aae4(0x43a)]['y']=0.5,this['_upArrowSprite']['setFrame'](_0x470287+_0x25b91b,_0x3215ec,_0x85f035,_0x25b91b),this['_upArrowSprite'][_0x13aae4(0x582)](_0x2be611[_0x13aae4(0x98a)](_0x40a0ab/0x2),_0x274802[_0x13aae4(0x98a)](_0x25b91b));}else this[_0x13aae4(0x1a9)](_0x44e24b,_0x574da6,_0x14c522,_0x2665b6,_0x5841cb);}},Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x743)]=function(_0x42a91a){const _0x144695=_0x4535e7,_0x4306af=new Sprite_Clickable(),_0x384123=this[_0x144695(0x79b)]();_0x4306af['x']=_0x42a91a['x']-_0x384123['x'],_0x4306af['y']=_0x42a91a['y']-_0x384123['y'],_0x4306af['z']=0x64;const _0x234357=this['getPointAnimationLayer']();return _0x234357[_0x144695(0x379)](_0x4306af),[_0x4306af];},Spriteset_Base['prototype'][_0x4535e7(0x79b)]=function(){return this;},Spriteset_Map[_0x4535e7(0x781)][_0x4535e7(0x79b)]=function(){return this['_tilemap']||this;},Spriteset_Battle[_0x4535e7(0x781)]['getPointAnimationLayer']=function(){const _0x226369=_0x4535e7;return this[_0x226369(0x72f)]||this;},Spriteset_Base[_0x4535e7(0x781)]['createPointAnimationSprite']=function(_0x37c419,_0x3a8abd,_0x4cd78d,_0x4650ba,_0x2673fb){const _0x1d59d5=_0x4535e7,_0x502524=this['isMVAnimation'](_0x3a8abd),_0x5737d6=new(_0x502524?Sprite_AnimationMV:Sprite_Animation)();_0x5737d6[_0x1d59d5(0x2f0)]=_0x37c419,_0x5737d6[_0x1d59d5(0x389)](_0x37c419,_0x3a8abd,_0x4cd78d,_0x4650ba),_0x5737d6['setMute'](_0x2673fb),this[_0x1d59d5(0x16e)](_0x5737d6),this['_pointAnimationSprites'][_0x1d59d5(0x85c)](_0x5737d6);},Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x354)]=function(_0x388688){const _0x3346fe=_0x4535e7;this[_0x3346fe(0x608)][_0x3346fe(0x775)](_0x388688),this[_0x3346fe(0x3f2)][_0x3346fe(0x31d)](_0x388688);for(const _0x8c10d9 of _0x388688['targetObjects']){_0x8c10d9[_0x3346fe(0x6c1)]&&('IPtHD'!==_0x3346fe(0x2f7)?_0x8c10d9[_0x3346fe(0x6c1)]():this[_0x3346fe(0x52b)]['setBackgroundType'](_0x1c120a[_0x3346fe(0x7c9)][_0x3346fe(0x658)]));const _0x556dc1=this[_0x3346fe(0x79b)]();if(_0x556dc1)_0x556dc1[_0x3346fe(0x31d)](_0x8c10d9);}_0x388688[_0x3346fe(0x4f8)]();},Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x3a7)]=function(){const _0x381b7e=_0x4535e7;for(const _0x155530 of this[_0x381b7e(0x608)]){this['removePointAnimation'](_0x155530);}},Spriteset_Base['prototype'][_0x4535e7(0x246)]=function(){const _0x3404e0=_0x4535e7;return this[_0x3404e0(0x608)][_0x3404e0(0x2ec)]>0x0;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x39a)]=Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x928)],Spriteset_Base[_0x4535e7(0x781)][_0x4535e7(0x928)]=function(){const _0x45fa87=_0x4535e7;return VisuMZ[_0x45fa87(0x7ac)]['Spriteset_Base_isAnimationPlaying'][_0x45fa87(0x77f)](this)||this[_0x45fa87(0x246)]();},Spriteset_Map['DETACH_PICTURE_CONTAINER']=VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x806)]['QoL'][_0x4535e7(0x37d)]||![],VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x446)]=Scene_Map[_0x4535e7(0x781)][_0x4535e7(0x9e1)],Scene_Map[_0x4535e7(0x781)][_0x4535e7(0x9e1)]=function(){const _0x4562e7=_0x4535e7;VisuMZ[_0x4562e7(0x7ac)]['Scene_Map_createSpriteset_detach'][_0x4562e7(0x77f)](this);if(!Spriteset_Map[_0x4562e7(0x75f)])return;const _0x3df079=this[_0x4562e7(0x170)];if(!_0x3df079)return;this['_pictureContainer']=_0x3df079[_0x4562e7(0x88c)];if(!this[_0x4562e7(0x88c)])return;this[_0x4562e7(0x379)](this[_0x4562e7(0x88c)]);},Spriteset_Battle[_0x4535e7(0x75f)]=VisuMZ[_0x4535e7(0x7ac)]['Settings'][_0x4535e7(0x405)][_0x4535e7(0x242)]||![],VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0xa0c)]=Scene_Battle['prototype'][_0x4535e7(0x9e1)],Scene_Battle['prototype'][_0x4535e7(0x9e1)]=function(){const _0x103ba0=_0x4535e7;VisuMZ['CoreEngine'][_0x103ba0(0xa0c)][_0x103ba0(0x77f)](this);if(!Spriteset_Battle[_0x103ba0(0x75f)])return;const _0xefb71a=this[_0x103ba0(0x170)];if(!_0xefb71a)return;this[_0x103ba0(0x88c)]=_0xefb71a[_0x103ba0(0x88c)];if(!this[_0x103ba0(0x88c)])return;this[_0x103ba0(0x379)](this[_0x103ba0(0x88c)]);},Spriteset_Battle[_0x4535e7(0x781)]['createBackground']=function(){const _0x248328=_0x4535e7;this[_0x248328(0x194)]=new PIXI[(_0x248328(0x501))][(_0x248328(0x635))](clamp=!![]),this[_0x248328(0x8d3)]=new Sprite(),this[_0x248328(0x8d3)][_0x248328(0x7c5)]=SceneManager[_0x248328(0x9b1)](),this['_backgroundSprite']['filters']=[this[_0x248328(0x194)]],this[_0x248328(0x371)][_0x248328(0x379)](this[_0x248328(0x8d3)]);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x3aa)]=Spriteset_Battle['prototype'][_0x4535e7(0x780)],Spriteset_Battle[_0x4535e7(0x781)][_0x4535e7(0x780)]=function(){const _0x49ad8f=_0x4535e7;this[_0x49ad8f(0x2d8)]()&&this[_0x49ad8f(0x6cd)](),VisuMZ[_0x49ad8f(0x7ac)][_0x49ad8f(0x3aa)]['call'](this);},Spriteset_Battle[_0x4535e7(0x781)][_0x4535e7(0x2d8)]=function(){const _0x1cb493=_0x4535e7,_0x441e54=VisuMZ[_0x1cb493(0x7ac)][_0x1cb493(0x806)]['ScreenResolution'];if(!_0x441e54)return![];if(Utils[_0x1cb493(0x2ad)]>='1.3.0'&&!_0x441e54[_0x1cb493(0x442)]){if(_0x1cb493(0x6fa)===_0x1cb493(0x235))_0x3a5611[_0x1cb493(0x7ac)][_0x1cb493(0x7d7)][_0x1cb493(0x77f)](this,_0x2c7906),this[_0x1cb493(0x38a)](),this[_0x1cb493(0x623)](_0x5748b9);else return![];}return _0x441e54[_0x1cb493(0x4b0)];},Spriteset_Battle['prototype']['repositionEnemiesByResolution']=function(){const _0x36abe2=_0x4535e7;for(member of $gameTroop[_0x36abe2(0x3d4)]()){if('pnXBo'!==_0x36abe2(0xa0a))return this['areButtonsHidden']()||this['isSideButtonLayout']();else member['moveRelativeToResolutionChange']();}},VisuMZ['CoreEngine']['Window_Base_initialize']=Window_Base[_0x4535e7(0x781)][_0x4535e7(0x614)],Window_Base['prototype'][_0x4535e7(0x614)]=function(_0x5c1cff){const _0x2ac429=_0x4535e7;_0x5c1cff['x']=Math[_0x2ac429(0x98a)](_0x5c1cff['x']),_0x5c1cff['y']=Math[_0x2ac429(0x98a)](_0x5c1cff['y']),_0x5c1cff[_0x2ac429(0x29a)]=Math[_0x2ac429(0x98a)](_0x5c1cff['width']),_0x5c1cff[_0x2ac429(0x1ad)]=Math[_0x2ac429(0x98a)](_0x5c1cff[_0x2ac429(0x1ad)]),this['initDigitGrouping'](),VisuMZ[_0x2ac429(0x7ac)][_0x2ac429(0x40f)][_0x2ac429(0x77f)](this,_0x5c1cff),this['initCoreEasing']();},Window_Base[_0x4535e7(0x781)][_0x4535e7(0x36f)]=function(){const _0x473868=_0x4535e7;this[_0x473868(0x2c4)]=VisuMZ[_0x473868(0x7ac)][_0x473868(0x806)][_0x473868(0x405)][_0x473868(0x728)],this['_digitGroupingEx']=VisuMZ[_0x473868(0x7ac)]['Settings'][_0x473868(0x405)][_0x473868(0x7e3)];},Window_Base[_0x4535e7(0x781)][_0x4535e7(0x80a)]=function(){const _0x425c87=_0x4535e7;return VisuMZ[_0x425c87(0x7ac)]['Settings']['Window'][_0x425c87(0xa0e)];},Window_Base[_0x4535e7(0x781)][_0x4535e7(0x36e)]=function(){const _0x2e9b7e=_0x4535e7;return VisuMZ['CoreEngine'][_0x2e9b7e(0x806)][_0x2e9b7e(0x70c)][_0x2e9b7e(0x685)];},Window_Base[_0x4535e7(0x781)]['updateBackOpacity']=function(){const _0x3a2ebc=_0x4535e7;$gameSystem[_0x3a2ebc(0x8e7)]?this[_0x3a2ebc(0x92c)]=$gameSystem[_0x3a2ebc(0x8e7)]():this['backOpacity']=VisuMZ[_0x3a2ebc(0x7ac)]['Settings'][_0x3a2ebc(0x70c)][_0x3a2ebc(0x175)];},Window_Base[_0x4535e7(0x781)][_0x4535e7(0x5fd)]=function(){const _0x1fdf5a=_0x4535e7;return VisuMZ[_0x1fdf5a(0x7ac)][_0x1fdf5a(0x806)]['Window']['TranslucentOpacity'];},Window_Base[_0x4535e7(0x781)]['openingSpeed']=function(){const _0x1cf76c=_0x4535e7;return VisuMZ[_0x1cf76c(0x7ac)][_0x1cf76c(0x806)][_0x1cf76c(0x70c)][_0x1cf76c(0x78d)];},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x349)]=Window_Base[_0x4535e7(0x781)][_0x4535e7(0x76e)],Window_Base[_0x4535e7(0x781)][_0x4535e7(0x76e)]=function(){const _0x3c5b44=_0x4535e7;VisuMZ[_0x3c5b44(0x7ac)][_0x3c5b44(0x349)][_0x3c5b44(0x77f)](this),this['updateCoreEasing']();},Window_Base[_0x4535e7(0x781)][_0x4535e7(0x577)]=function(){const _0x30b9a7=_0x4535e7;if(this[_0x30b9a7(0x85a)]){if('tgHcu'===_0x30b9a7(0x715))this[_0x30b9a7(0x3f0)]+=this['openingSpeed'](),this['isOpen']()&&(this[_0x30b9a7(0x85a)]=![]);else return _0x26fcff[_0x30b9a7(0x7c9)][_0x30b9a7(0x9a9)][_0x30b9a7(0x77f)](this);}},Window_Base['prototype']['updateClose']=function(){const _0x3bd3a8=_0x4535e7;if(this[_0x3bd3a8(0x6ff)]){if(_0x3bd3a8(0x705)===_0x3bd3a8(0x335))_0x2b2580[_0x3bd3a8(0x781)]['create'][_0x3bd3a8(0x77f)](this),this[_0x3bd3a8(0x93d)]();else{this[_0x3bd3a8(0x3f0)]-=this[_0x3bd3a8(0x7d8)]();if(this['isClosed']()){if(_0x3bd3a8(0x735)!==_0x3bd3a8(0x7d9))this[_0x3bd3a8(0x6ff)]=![];else{if(this[_0x3bd3a8(0x20f)])_0xf8778d[_0x3bd3a8(0x7ac)][_0x3bd3a8(0x873)]['call'](this);this['destroyCoreEngineMarkedBitmaps']();}}}}},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x234)]=Window_Base[_0x4535e7(0x781)]['drawText'],Window_Base[_0x4535e7(0x781)][_0x4535e7(0x256)]=function(_0x573a0a,_0x3b6a89,_0x2ae124,_0x775b89,_0x417c40){const _0x58d9d4=_0x4535e7;if(this[_0x58d9d4(0x6f3)]())_0x573a0a=VisuMZ[_0x58d9d4(0x677)](_0x573a0a);VisuMZ[_0x58d9d4(0x7ac)][_0x58d9d4(0x234)][_0x58d9d4(0x77f)](this,_0x573a0a,_0x3b6a89,_0x2ae124,_0x775b89,_0x417c40);},Window_Base[_0x4535e7(0x781)][_0x4535e7(0x6f3)]=function(){const _0x4e09ed=_0x4535e7;return this[_0x4e09ed(0x2c4)];},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x7ab)]=Window_Base['prototype'][_0x4535e7(0x7b5)],Window_Base['prototype'][_0x4535e7(0x7b5)]=function(_0x55d6af,_0x2d99b6,_0x54ea0d,_0x38613){const _0x8c8e5b=_0x4535e7;var _0x2596ec=VisuMZ[_0x8c8e5b(0x7ac)][_0x8c8e5b(0x7ab)][_0x8c8e5b(0x77f)](this,_0x55d6af,_0x2d99b6,_0x54ea0d,_0x38613);if(this[_0x8c8e5b(0x2f5)]())_0x2596ec[_0x8c8e5b(0x7a0)]=VisuMZ['GroupDigits'](_0x2596ec[_0x8c8e5b(0x7a0)]);return _0x2596ec;},Window_Base[_0x4535e7(0x781)]['useDigitGroupingEx']=function(){const _0x482a5e=_0x4535e7;return this[_0x482a5e(0x9b3)];},Window_Base[_0x4535e7(0x781)][_0x4535e7(0x408)]=function(_0x498647){const _0x1fc439=_0x4535e7;this[_0x1fc439(0x2c4)]=_0x498647;},Window_Base[_0x4535e7(0x781)][_0x4535e7(0x1be)]=function(_0x3aa836){this['_digitGroupingEx']=_0x3aa836;},VisuMZ['CoreEngine']['Window_Base_drawIcon']=Window_Base[_0x4535e7(0x781)][_0x4535e7(0x157)],Window_Base[_0x4535e7(0x781)][_0x4535e7(0x157)]=function(_0x3178f5,_0x46e712,_0x1e9df9){const _0x2fe779=_0x4535e7;_0x46e712=Math[_0x2fe779(0x98a)](_0x46e712),_0x1e9df9=Math[_0x2fe779(0x98a)](_0x1e9df9),VisuMZ[_0x2fe779(0x7ac)][_0x2fe779(0x3d9)][_0x2fe779(0x77f)](this,_0x3178f5,_0x46e712,_0x1e9df9);},VisuMZ['CoreEngine']['Window_Base_drawFace']=Window_Base[_0x4535e7(0x781)][_0x4535e7(0x414)],Window_Base[_0x4535e7(0x781)][_0x4535e7(0x414)]=function(_0x318923,_0x13ba37,_0x435ce9,_0x28a51f,_0x3c3ff0,_0x14bffb){const _0x46f8e2=_0x4535e7;_0x3c3ff0=_0x3c3ff0||ImageManager['faceWidth'],_0x14bffb=_0x14bffb||ImageManager['faceHeight'],_0x435ce9=Math[_0x46f8e2(0x98a)](_0x435ce9),_0x28a51f=Math[_0x46f8e2(0x98a)](_0x28a51f),_0x3c3ff0=Math[_0x46f8e2(0x98a)](_0x3c3ff0),_0x14bffb=Math[_0x46f8e2(0x98a)](_0x14bffb),VisuMZ[_0x46f8e2(0x7ac)][_0x46f8e2(0x5a3)][_0x46f8e2(0x77f)](this,_0x318923,_0x13ba37,_0x435ce9,_0x28a51f,_0x3c3ff0,_0x14bffb);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x2ab)]=Window_Base[_0x4535e7(0x781)][_0x4535e7(0x90b)],Window_Base[_0x4535e7(0x781)][_0x4535e7(0x90b)]=function(_0x3c7cd2,_0x5d335a,_0x4be640,_0x4284cc){const _0x51fb58=_0x4535e7;_0x4be640=Math[_0x51fb58(0x98a)](_0x4be640),_0x4284cc=Math[_0x51fb58(0x98a)](_0x4284cc),VisuMZ[_0x51fb58(0x7ac)]['Window_Base_drawCharacter']['call'](this,_0x3c7cd2,_0x5d335a,_0x4be640,_0x4284cc);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x7f6)]=Window_Selectable[_0x4535e7(0x781)][_0x4535e7(0xa20)],Window_Selectable[_0x4535e7(0x781)]['itemRect']=function(_0x1afccd){const _0x101e49=_0x4535e7;let _0x18fea9=VisuMZ['CoreEngine'][_0x101e49(0x7f6)][_0x101e49(0x77f)](this,_0x1afccd);return _0x18fea9['x']=Math[_0x101e49(0x98a)](_0x18fea9['x']),_0x18fea9['y']=Math[_0x101e49(0x98a)](_0x18fea9['y']),_0x18fea9[_0x101e49(0x29a)]=Math[_0x101e49(0x98a)](_0x18fea9['width']),_0x18fea9['height']=Math['round'](_0x18fea9['height']),_0x18fea9;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x254)]=Window_StatusBase[_0x4535e7(0x781)][_0x4535e7(0x8df)],Window_StatusBase[_0x4535e7(0x781)]['drawActorSimpleStatus']=function(_0x3b063d,_0x812e5c,_0x1fdac6){const _0xd37896=_0x4535e7;_0x812e5c=Math[_0xd37896(0x98a)](_0x812e5c),_0x1fdac6=Math[_0xd37896(0x98a)](_0x1fdac6),VisuMZ[_0xd37896(0x7ac)][_0xd37896(0x254)][_0xd37896(0x77f)](this,_0x3b063d,_0x812e5c,_0x1fdac6);},Window_Base['prototype'][_0x4535e7(0x190)]=function(){const _0x34e2b1=_0x4535e7;this[_0x34e2b1(0x39b)]={'duration':0x0,'wholeDuration':0x0,'type':_0x34e2b1(0x2c7),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x34e2b1(0x150)]['x'],'targetScaleY':this[_0x34e2b1(0x150)]['y'],'targetOpacity':this['opacity'],'targetBackOpacity':this['backOpacity'],'targetContentsOpacity':this[_0x34e2b1(0x34a)]};},Window_Base[_0x4535e7(0x781)][_0x4535e7(0x571)]=function(){const _0x5692f3=_0x4535e7;if(!this[_0x5692f3(0x39b)])return;if(this['_coreEasing']['duration']<=0x0)return;this['x']=this[_0x5692f3(0x794)](this['x'],this['_coreEasing'][_0x5692f3(0x3f4)]),this['y']=this[_0x5692f3(0x794)](this['y'],this[_0x5692f3(0x39b)][_0x5692f3(0x25d)]),this[_0x5692f3(0x150)]['x']=this[_0x5692f3(0x794)](this[_0x5692f3(0x150)]['x'],this[_0x5692f3(0x39b)][_0x5692f3(0x3b6)]),this[_0x5692f3(0x150)]['y']=this[_0x5692f3(0x794)](this['scale']['y'],this[_0x5692f3(0x39b)][_0x5692f3(0x848)]),this[_0x5692f3(0x64b)]=this[_0x5692f3(0x794)](this['opacity'],this['_coreEasing'][_0x5692f3(0x459)]),this[_0x5692f3(0x92c)]=this[_0x5692f3(0x794)](this[_0x5692f3(0x92c)],this['_coreEasing'][_0x5692f3(0x857)]),this[_0x5692f3(0x34a)]=this[_0x5692f3(0x794)](this[_0x5692f3(0x34a)],this[_0x5692f3(0x39b)][_0x5692f3(0x5f3)]),this['_coreEasing']['duration']--;},Window_Base[_0x4535e7(0x781)][_0x4535e7(0x794)]=function(_0x4de81c,_0x1e75f8){const _0x1f117a=_0x4535e7;if(!this[_0x1f117a(0x39b)])return _0x1e75f8;const _0x4b8119=this['_coreEasing'][_0x1f117a(0x7f2)],_0x2f26e8=this['_coreEasing'][_0x1f117a(0x611)],_0x3cc68d=this[_0x1f117a(0x307)]((_0x2f26e8-_0x4b8119)/_0x2f26e8),_0x4aed5a=this[_0x1f117a(0x307)]((_0x2f26e8-_0x4b8119+0x1)/_0x2f26e8),_0x11218c=(_0x4de81c-_0x1e75f8*_0x3cc68d)/(0x1-_0x3cc68d);return _0x11218c+(_0x1e75f8-_0x11218c)*_0x4aed5a;},Window_Base[_0x4535e7(0x781)]['calcCoreEasing']=function(_0x353030){const _0x152708=_0x4535e7;if(!this[_0x152708(0x39b)])return _0x353030;return VisuMZ['ApplyEasing'](_0x353030,this['_coreEasing'][_0x152708(0x153)]||_0x152708(0x2c7));},Window_Base[_0x4535e7(0x781)][_0x4535e7(0x789)]=function(_0x366f47,_0x51b74c){const _0x832db6=_0x4535e7;if(!this[_0x832db6(0x39b)])return;this['x']=this[_0x832db6(0x39b)]['targetX'],this['y']=this[_0x832db6(0x39b)][_0x832db6(0x25d)],this['scale']['x']=this[_0x832db6(0x39b)][_0x832db6(0x3b6)],this[_0x832db6(0x150)]['y']=this['_coreEasing'][_0x832db6(0x848)],this[_0x832db6(0x64b)]=this[_0x832db6(0x39b)][_0x832db6(0x459)],this[_0x832db6(0x92c)]=this[_0x832db6(0x39b)][_0x832db6(0x857)],this[_0x832db6(0x34a)]=this[_0x832db6(0x39b)][_0x832db6(0x5f3)],this[_0x832db6(0x4ca)](_0x366f47,_0x51b74c,this['x'],this['y'],this[_0x832db6(0x150)]['x'],this[_0x832db6(0x150)]['y'],this[_0x832db6(0x64b)],this[_0x832db6(0x92c)],this[_0x832db6(0x34a)]);},Window_Base[_0x4535e7(0x781)]['setupCoreEasing']=function(_0x5ff6b4,_0x2ab39e,_0x168c2d,_0x472832,_0x404126,_0x27f988,_0x362659,_0x5a2e25,_0x25ab33){const _0x25f1d0=_0x4535e7;this[_0x25f1d0(0x39b)]={'duration':_0x5ff6b4,'wholeDuration':_0x5ff6b4,'type':_0x2ab39e,'targetX':_0x168c2d,'targetY':_0x472832,'targetScaleX':_0x404126,'targetScaleY':_0x27f988,'targetOpacity':_0x362659,'targetBackOpacity':_0x5a2e25,'targetContentsOpacity':_0x25ab33};},Window_Base[_0x4535e7(0x781)][_0x4535e7(0x34d)]=function(_0x2054b3,_0x21770c,_0x21692a,_0x296cde,_0x1d38b0){const _0x4f3e31=_0x4535e7;this[_0x4f3e31(0x9fa)](),this['contents'][_0x4f3e31(0x855)]=VisuMZ['CoreEngine'][_0x4f3e31(0x806)][_0x4f3e31(0x699)][_0x4f3e31(0x564)];const _0x478313=VisuMZ[_0x4f3e31(0x7ac)][_0x4f3e31(0x806)]['Gold'][_0x4f3e31(0x988)];if(_0x478313>0x0&&_0x21770c===TextManager[_0x4f3e31(0x4d0)]){const _0x43546f=_0x296cde+(this[_0x4f3e31(0x80a)]()-ImageManager[_0x4f3e31(0x390)])/0x2;this[_0x4f3e31(0x157)](_0x478313,_0x21692a+(_0x1d38b0-ImageManager[_0x4f3e31(0x6d1)]),_0x43546f),_0x1d38b0-=ImageManager['iconWidth']+0x4;}else this[_0x4f3e31(0x62c)](ColorManager[_0x4f3e31(0x9b4)]()),this[_0x4f3e31(0x256)](_0x21770c,_0x21692a,_0x296cde,_0x1d38b0,_0x4f3e31(0x7ae)),_0x1d38b0-=this[_0x4f3e31(0x4f0)](_0x21770c)+0x6;this[_0x4f3e31(0x828)]();const _0x200213=this['textWidth'](this[_0x4f3e31(0x2c4)]?VisuMZ[_0x4f3e31(0x677)](_0x2054b3):_0x2054b3);if(_0x200213>_0x1d38b0)this[_0x4f3e31(0x256)](VisuMZ[_0x4f3e31(0x7ac)][_0x4f3e31(0x806)][_0x4f3e31(0x699)][_0x4f3e31(0x7b1)],_0x21692a,_0x296cde,_0x1d38b0,_0x4f3e31(0x7ae));else{if(_0x4f3e31(0x71d)===_0x4f3e31(0x71d))this['drawText'](_0x2054b3,_0x21692a,_0x296cde,_0x1d38b0,_0x4f3e31(0x7ae));else for(const _0x293ebb of _0x1324dd[_0x4f3e31(0x32f)]){_0x293ebb[_0x4f3e31(0x880)]['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x293ebb[_0x4f3e31(0x223)]=_0x33847e[_0x4f3e31(0x548)](_0xc8e760(_0x194044['$1']),0x1));}}this[_0x4f3e31(0x9fa)]();},Window_Base[_0x4535e7(0x781)][_0x4535e7(0x510)]=function(_0x518929,_0x341720,_0x4df3b4,_0x31d56d,_0x5c6a97){const _0x48d0d9=_0x4535e7,_0x1cfca1=ImageManager[_0x48d0d9(0x81e)](_0x48d0d9(0x9f2)),_0x70ed0a=ImageManager[_0x48d0d9(0x6d1)],_0x45287f=ImageManager[_0x48d0d9(0x390)],_0x1d7525=_0x518929%0x10*_0x70ed0a,_0x36412b=Math[_0x48d0d9(0xa14)](_0x518929/0x10)*_0x45287f,_0x128e4b=_0x31d56d,_0x381473=_0x31d56d;this[_0x48d0d9(0x74d)][_0x48d0d9(0x430)][_0x48d0d9(0x6bf)]=_0x5c6a97,this[_0x48d0d9(0x74d)]['blt'](_0x1cfca1,_0x1d7525,_0x36412b,_0x70ed0a,_0x45287f,_0x341720,_0x4df3b4,_0x128e4b,_0x381473),this[_0x48d0d9(0x74d)]['_context'][_0x48d0d9(0x6bf)]=!![];},Window_Base[_0x4535e7(0x781)][_0x4535e7(0x318)]=function(_0x4e4b5d,_0x1aa907,_0x218c54,_0x1c2d0d,_0x5a3825,_0x413818){const _0x4eed52=_0x4535e7,_0x1078cd=Math['floor']((_0x218c54-0x2)*_0x1c2d0d),_0x294bd2=Sprite_Gauge[_0x4eed52(0x781)][_0x4eed52(0x1a6)]['call'](this),_0x2425e6=_0x1aa907+this[_0x4eed52(0x80a)]()-_0x294bd2-0x2;this[_0x4eed52(0x74d)][_0x4eed52(0x82c)](_0x4e4b5d,_0x2425e6,_0x218c54,_0x294bd2,ColorManager[_0x4eed52(0x345)]()),this[_0x4eed52(0x74d)][_0x4eed52(0x589)](_0x4e4b5d+0x1,_0x2425e6+0x1,_0x1078cd,_0x294bd2-0x2,_0x5a3825,_0x413818);},Window_Scrollable[_0x4535e7(0x749)]={'enabled':VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x806)][_0x4535e7(0x70c)][_0x4535e7(0x645)]??!![],'thickness':VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x806)][_0x4535e7(0x70c)][_0x4535e7(0x8a0)]??0x2,'offset':VisuMZ[_0x4535e7(0x7ac)]['Settings'][_0x4535e7(0x70c)][_0x4535e7(0x9d8)]??0x2,'bodyColor':VisuMZ[_0x4535e7(0x7ac)]['Settings'][_0x4535e7(0x70c)][_0x4535e7(0x4fb)]??0x0,'offColor':VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x806)][_0x4535e7(0x70c)]['OffBarColor']??0x7,'offOpacity':VisuMZ[_0x4535e7(0x7ac)]['Settings'][_0x4535e7(0x70c)]['OffBarOpacity']??0x80},Window_Base[_0x4535e7(0x781)][_0x4535e7(0x383)]=function(){const _0x15f9f1=_0x4535e7;return Window_Scrollable[_0x15f9f1(0x749)][_0x15f9f1(0x238)]&&Window_Scrollable['SCROLLBAR']['thickness']>0x0;},VisuMZ['CoreEngine'][_0x4535e7(0x701)]=Window_Base[_0x4535e7(0x781)]['createContents'],Window_Base[_0x4535e7(0x781)]['createContents']=function(){const _0x5c7a70=_0x4535e7;VisuMZ[_0x5c7a70(0x7ac)]['Window_Base_createContents'][_0x5c7a70(0x77f)](this),this[_0x5c7a70(0x6d0)](),this['setupScrollBarBitmap'](!![]),this['setupScrollBarBitmap'](![]);},Window_Base[_0x4535e7(0x781)][_0x4535e7(0x6d0)]=function(){const _0x1786db=_0x4535e7;if(!this['isScrollBarVisible']())return;if(this['_scrollBarHorz']||this[_0x1786db(0x882)])return;this[_0x1786db(0x509)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this['_scrollBarHorz']=new Sprite(),this[_0x1786db(0x882)]=new Sprite(),this[_0x1786db(0x379)](this[_0x1786db(0x5e2)]),this[_0x1786db(0x379)](this[_0x1786db(0x882)]);},Window_Base['prototype'][_0x4535e7(0x45c)]=function(_0x336da6){const _0x13c951=_0x4535e7,_0x3db9aa=_0x336da6?this[_0x13c951(0x5e2)]:this['_scrollBarVert'];if(!_0x3db9aa)return;const _0x4ecd8a=Window_Scrollable[_0x13c951(0x749)],_0xe4a410=_0x4ecd8a[_0x13c951(0x9ef)],_0x5d034a=_0x336da6?this[_0x13c951(0x83e)]-_0xe4a410*0x2:_0xe4a410,_0x5a160e=_0x336da6?_0xe4a410:this['innerHeight']-_0xe4a410*0x2;_0x3db9aa[_0x13c951(0x7c5)]=new Bitmap(_0x5d034a,_0x5a160e),_0x3db9aa[_0x13c951(0x95a)](0x0,0x0,_0x5d034a,_0x5a160e),this[_0x13c951(0x4b3)](_0x336da6);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x624)]=Window_Base[_0x4535e7(0x781)][_0x4535e7(0xa27)],Window_Base['prototype'][_0x4535e7(0xa27)]=function(){const _0x3b329e=_0x4535e7;VisuMZ[_0x3b329e(0x7ac)][_0x3b329e(0x624)][_0x3b329e(0x77f)](this),this[_0x3b329e(0x435)]();},Window_Base[_0x4535e7(0x781)][_0x4535e7(0x435)]=function(){const _0x1ecd07=_0x4535e7,_0x12f66b=[this[_0x1ecd07(0x5e2)],this[_0x1ecd07(0x882)]];for(const _0x12c0e4 of _0x12f66b){if(_0x12c0e4&&_0x12c0e4['bitmap'])_0x12c0e4['bitmap']['destroy']();}},VisuMZ['CoreEngine']['Window_Scrollable_update']=Window_Scrollable[_0x4535e7(0x781)]['update'],Window_Scrollable[_0x4535e7(0x781)]['update']=function(){const _0x495531=_0x4535e7;VisuMZ[_0x495531(0x7ac)]['Window_Scrollable_update']['call'](this),this[_0x495531(0x78c)]();},Window_Scrollable['prototype'][_0x4535e7(0x78c)]=function(){const _0x288c23=_0x4535e7;this[_0x288c23(0x38b)](),this['checkScrollBarBitmap'](!![]),this[_0x288c23(0x567)](![]),this['updateScrollBarPosition'](!![]),this[_0x288c23(0x4b3)](![]);},Window_Scrollable[_0x4535e7(0x781)][_0x4535e7(0x38b)]=function(){const _0x25da6d=_0x4535e7,_0x138b7b=[this[_0x25da6d(0x5e2)],this['_scrollBarVert']];for(const _0x42e712 of _0x138b7b){_0x42e712&&(_0x42e712[_0x25da6d(0x755)]=this[_0x25da6d(0x383)]()&&this['isOpen']());}},Window_Scrollable['prototype']['checkScrollBarBitmap']=function(_0x56ab38){const _0xfc1e47=_0x4535e7;if(!this[_0xfc1e47(0x509)])return;const _0x983482=this[_0xfc1e47(0x299)](_0x56ab38),_0x29ea7f=this[_0xfc1e47(0x3fe)](_0x56ab38),_0x9a2550=_0x56ab38?_0xfc1e47(0x2ef):_0xfc1e47(0x51f),_0x2f5894=_0x56ab38?'maxHorz':'maxVert';(this['_lastScrollBarValues'][_0x9a2550]!==_0x983482||this[_0xfc1e47(0x509)][_0x2f5894]!==_0x29ea7f)&&(_0xfc1e47(0x5dd)===_0xfc1e47(0x5dd)?(this[_0xfc1e47(0x509)][_0x9a2550]=_0x983482,this[_0xfc1e47(0x509)][_0x2f5894]=_0x29ea7f,this['refreshScrollBarBitmap'](_0x56ab38,_0x983482,_0x29ea7f)):_0xc03daa[_0xfc1e47(0x7ac)][_0xfc1e47(0x2da)][_0xfc1e47(0x77f)](this,_0x2949ad));},Window_Scrollable['prototype'][_0x4535e7(0x299)]=function(_0x483d0e){const _0x3d1a07=_0x4535e7;if(this[_0x3d1a07(0x7b3)]!==undefined){if(_0x3d1a07(0x5df)!=='dlXNe'){if(this[_0x3d1a07(0x316)](_0x552959))return!![];if(this[_0x3d1a07(0x6da)](_0x445e2b))return!![];}else return _0x483d0e?this[_0x3d1a07(0x33e)]():this[_0x3d1a07(0x1ed)]['y'];}return _0x483d0e?this[_0x3d1a07(0x33e)]():this[_0x3d1a07(0x4b6)]();},Window_Scrollable[_0x4535e7(0x781)]['maxScrollbar']=function(_0x452dd1){const _0x239f3e=_0x4535e7;if(this[_0x239f3e(0x7b3)]!==undefined){if(_0x239f3e(0x224)!=='PHKCF')return _0x452dd1?this[_0x239f3e(0x6f9)]():Math[_0x239f3e(0x548)](0x0,this[_0x239f3e(0x7b3)]-this['innerHeight']);else{if(_0x25edc4[_0x239f3e(0x3a4)]!==_0x3a7732)return _0x195604[_0x239f3e(0x3a4)];if(this['_CoreEngineSettings']===_0x466f43)this[_0x239f3e(0xa28)]();if(this['_CoreEngineSettings'][_0x239f3e(0x750)]===_0x323617)this[_0x239f3e(0x156)]();return this['_CoreEngineSettings'][_0x239f3e(0x750)];}}return _0x452dd1?this[_0x239f3e(0x6f9)]():this['maxScrollY']();},Window_Scrollable['prototype'][_0x4535e7(0x6b9)]=function(){const _0x88da95=_0x4535e7;if(this[_0x88da95(0x7b3)]!==undefined)return Math[_0x88da95(0x548)](0x0,this[_0x88da95(0x7b3)]);return this[_0x88da95(0x8be)]();},Window_Scrollable[_0x4535e7(0x781)][_0x4535e7(0x2a3)]=function(_0x54a680,_0x45361f,_0xdb7f74){const _0x30c68b=_0x4535e7,_0xaa6825=_0x54a680?this[_0x30c68b(0x5e2)]:this[_0x30c68b(0x882)];if(!_0xaa6825)return;if(!_0xaa6825[_0x30c68b(0x7c5)])return;const _0x303c60=_0xaa6825[_0x30c68b(0x7c5)];_0x303c60['clear']();if(_0xdb7f74<=0x0)return;const _0x234a9a=_0x54a680?this[_0x30c68b(0x83e)]/this[_0x30c68b(0x85d)]():this[_0x30c68b(0x288)]/this[_0x30c68b(0x6b9)](),_0x183a20=_0x54a680?Math[_0x30c68b(0x98a)](_0x45361f*_0x234a9a):0x0,_0x416a95=_0x54a680?0x0:Math[_0x30c68b(0x98a)](_0x45361f*_0x234a9a),_0x427c3c=_0x54a680?Math[_0x30c68b(0x98a)](_0x303c60['width']*_0x234a9a):_0x303c60[_0x30c68b(0x29a)],_0x1ed2c8=_0x54a680?_0x303c60['height']:Math[_0x30c68b(0x98a)](_0x303c60[_0x30c68b(0x1ad)]*_0x234a9a),_0x5ddc93=Window_Scrollable[_0x30c68b(0x749)],_0x55682d=ColorManager['getColor'](_0x5ddc93[_0x30c68b(0x643)]),_0x5ec170=ColorManager[_0x30c68b(0x99a)](_0x5ddc93[_0x30c68b(0x872)]),_0x5e59f3=_0x5ddc93['offOpacity'];_0x303c60[_0x30c68b(0x748)]=_0x5e59f3,_0x303c60[_0x30c68b(0x39e)](_0x55682d),_0x303c60[_0x30c68b(0x748)]=0xff,_0x303c60[_0x30c68b(0x82c)](_0x183a20,_0x416a95,_0x427c3c,_0x1ed2c8,_0x5ec170);},Window_Base[_0x4535e7(0x781)]['updateScrollBarPosition']=function(_0x18d898){const _0x2bbdb1=_0x4535e7,_0x1caf18=_0x18d898?this['_scrollBarHorz']:this[_0x2bbdb1(0x882)];if(!_0x1caf18)return;const _0x2b0c83=Window_Scrollable[_0x2bbdb1(0x749)],_0x24646f=_0x2b0c83[_0x2bbdb1(0x9ef)],_0x4437ff=_0x2b0c83[_0x2bbdb1(0x333)];if(!_0x1caf18[_0x2bbdb1(0x891)])return;_0x1caf18['x']=this['padding']+(_0x18d898?_0x24646f:this[_0x2bbdb1(0x83e)]+_0x4437ff),_0x1caf18['y']=this['padding']+(_0x18d898?this[_0x2bbdb1(0x288)]+_0x4437ff:_0x24646f);},Window_Selectable[_0x4535e7(0x781)][_0x4535e7(0x7c0)]=function(_0x551969){const _0xc4b2ab=_0x4535e7;let _0x30476b=this[_0xc4b2ab(0x188)]();const _0x2838c2=this[_0xc4b2ab(0x7eb)](),_0x1507c7=this['maxCols']();if(this[_0xc4b2ab(0x351)]()&&(_0x30476b<_0x2838c2||_0x551969&&_0x1507c7===0x1)){_0x30476b+=_0x1507c7;if(_0x30476b>=_0x2838c2)_0x30476b=_0x2838c2-0x1;this[_0xc4b2ab(0x953)](_0x30476b);}else{if(!this[_0xc4b2ab(0x351)]()){if(_0xc4b2ab(0x5d5)!==_0xc4b2ab(0x60d))(_0x30476b<_0x2838c2-_0x1507c7||_0x551969&&_0x1507c7===0x1)&&this['smoothSelect']((_0x30476b+_0x1507c7)%_0x2838c2);else return _0x45fe4c[_0xc4b2ab(0x5b8)]()?this[_0xc4b2ab(0x6b4)]():_0x50ee54[_0xc4b2ab(0x7ac)][_0xc4b2ab(0x994)][_0xc4b2ab(0x77f)](this);}}},VisuMZ['CoreEngine'][_0x4535e7(0x80e)]=Window_Selectable[_0x4535e7(0x781)][_0x4535e7(0x7c0)],Window_Selectable['prototype'][_0x4535e7(0x7c0)]=function(_0x366a22){const _0x52b466=_0x4535e7;this[_0x52b466(0x351)]()&&_0x366a22&&this[_0x52b466(0x2dc)]()===0x1&&this[_0x52b466(0x188)]()===this['maxItems']()-0x1?this[_0x52b466(0x953)](0x0):VisuMZ[_0x52b466(0x7ac)][_0x52b466(0x80e)][_0x52b466(0x77f)](this,_0x366a22);},Window_Selectable['prototype']['cursorUp']=function(_0xfc2b85){const _0x3503a2=_0x4535e7;let _0x1c86ad=Math[_0x3503a2(0x548)](0x0,this['index']());const _0x9e117a=this['maxItems'](),_0x408492=this[_0x3503a2(0x2dc)]();if(this[_0x3503a2(0x351)]()&&_0x1c86ad>0x0||_0xfc2b85&&_0x408492===0x1){_0x1c86ad-=_0x408492;if(_0x1c86ad<=0x0)_0x1c86ad=0x0;this['smoothSelect'](_0x1c86ad);}else!this[_0x3503a2(0x351)]()&&((_0x1c86ad>=_0x408492||_0xfc2b85&&_0x408492===0x1)&&this[_0x3503a2(0x953)]((_0x1c86ad-_0x408492+_0x9e117a)%_0x9e117a));},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x2da)]=Window_Selectable[_0x4535e7(0x781)]['cursorUp'],Window_Selectable[_0x4535e7(0x781)][_0x4535e7(0x50e)]=function(_0x12853a){const _0x1c81ca=_0x4535e7;this['isUseModernControls']()&&_0x12853a&&this['maxCols']()===0x1&&this[_0x1c81ca(0x188)]()===0x0?_0x1c81ca(0x5a6)!=='IjBbF'?this[_0x1c81ca(0x953)](this[_0x1c81ca(0x7eb)]()-0x1):_0x31ad42[_0x1c81ca(0x838)]():VisuMZ[_0x1c81ca(0x7ac)][_0x1c81ca(0x2da)]['call'](this,_0x12853a);},Window_Selectable['prototype'][_0x4535e7(0x351)]=function(){const _0x57f1d7=_0x4535e7;return VisuMZ[_0x57f1d7(0x7ac)][_0x57f1d7(0x806)][_0x57f1d7(0x405)][_0x57f1d7(0x210)];},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x75b)]=Window_Selectable[_0x4535e7(0x781)][_0x4535e7(0x15a)],Window_Selectable[_0x4535e7(0x781)]['processCursorMove']=function(){const _0x595c13=_0x4535e7;if(this[_0x595c13(0x351)]()){if(_0x595c13(0x2e7)==='YNlLC')return _0x495226;else this[_0x595c13(0x633)](),this['processCursorHomeEndTrigger']();}else VisuMZ[_0x595c13(0x7ac)][_0x595c13(0x75b)][_0x595c13(0x77f)](this);},Window_Selectable[_0x4535e7(0x781)][_0x4535e7(0x7f5)]=function(){return!![];},Window_Selectable['prototype']['processCursorMoveModernControls']=function(){const _0x6a2082=_0x4535e7;if(this[_0x6a2082(0x338)]()){const _0x3f48f7=this['index']();Input[_0x6a2082(0x574)](_0x6a2082(0x181))&&(Input[_0x6a2082(0x94a)](_0x6a2082(0x935))&&this['allowShiftScrolling']()?this[_0x6a2082(0x9de)]():this['cursorDown'](Input[_0x6a2082(0x8bf)](_0x6a2082(0x181))));if(Input[_0x6a2082(0x574)]('up')){if('NrEAo'!==_0x6a2082(0x860)){if(Input['isPressed'](_0x6a2082(0x935))&&this[_0x6a2082(0x7f5)]()){if(_0x6a2082(0x21c)==='iXYgY')return _0x44b37b[_0x6a2082(0x7ac)]['Settings'][_0x6a2082(0x405)][_0x6a2082(0x7d5)];else this['cursorPageup']();}else this[_0x6a2082(0x50e)](Input[_0x6a2082(0x8bf)]('up'));}else{const _0x3a732d=_0x59abdc[_0x6a2082(0x63d)]()[_0x6a2082(0x664)](/\\I\[(\d+)\]/gi,'');this[_0x6a2082(0x256)](_0x4ce32f[_0x6a2082(0x63d)](),_0x36fc23,_0x2ccaf4,_0x32e8fa);}}if(Input['isRepeated']('right')){if(_0x6a2082(0x22f)===_0x6a2082(0x937)){if(this['_mode']===_0x6a2082(0x74e)){this[_0x6a2082(0x74d)][_0x6a2082(0x393)](),this[_0x6a2082(0x5b7)][_0x6a2082(0x393)](),this[_0x6a2082(0x828)]();let _0x2c478c=_0x21e015[_0x6a2082(0x7ac)]['Settings'][_0x6a2082(0x593)][_0x6a2082(0x8ae)]['split']('\x0a'),_0x21e9e5=_0x2c478c['length'],_0x1f6459=(this[_0x6a2082(0x288)]-_0x21e9e5*this['lineHeight']())/0x2;for(let _0x5ded45=0x0;_0x5ded45<_0x21e9e5;++_0x5ded45){let _0x4c8a18=_0x2c478c[_0x5ded45],_0x193796=this[_0x6a2082(0x38f)](_0x4c8a18)[_0x6a2082(0x29a)],_0x32ad34=_0xe8566f[_0x6a2082(0xa14)]((this[_0x6a2082(0x74d)]['width']-_0x193796)/0x2);this['drawTextEx'](_0x4c8a18,_0x32ad34,_0x1f6459),_0x1f6459+=this['lineHeight']();}}else _0x40faef[_0x6a2082(0x7ac)][_0x6a2082(0x27b)][_0x6a2082(0x77f)](this);}else this['cursorRight'](Input[_0x6a2082(0x8bf)](_0x6a2082(0x7ae)));}Input[_0x6a2082(0x574)](_0x6a2082(0x974))&&this['cursorLeft'](Input[_0x6a2082(0x8bf)](_0x6a2082(0x974))),!this['isHandled'](_0x6a2082(0x377))&&Input[_0x6a2082(0x574)]('pagedown')&&this[_0x6a2082(0x9de)](),!this[_0x6a2082(0x7f7)](_0x6a2082(0x547))&&Input[_0x6a2082(0x574)]('pageup')&&this[_0x6a2082(0x965)](),this['index']()!==_0x3f48f7&&(_0x6a2082(0x44b)===_0x6a2082(0x4f5)?this[_0x6a2082(0x158)][_0x6a2082(0x518)](_0x51ce19[_0x6a2082(0x7c9)][_0x6a2082(0x263)]):this[_0x6a2082(0x39f)]());}},Window_Selectable[_0x4535e7(0x781)]['processCursorHomeEndTrigger']=function(){const _0x1ac8a9=_0x4535e7;if(this['isCursorMovable']()){const _0x2b0b99=this[_0x1ac8a9(0x188)]();Input[_0x1ac8a9(0x8bf)](_0x1ac8a9(0x473))&&this[_0x1ac8a9(0x953)](Math[_0x1ac8a9(0x16c)](this[_0x1ac8a9(0x188)](),0x0)),Input[_0x1ac8a9(0x8bf)](_0x1ac8a9(0x753))&&this['smoothSelect'](Math[_0x1ac8a9(0x548)](this[_0x1ac8a9(0x188)](),this[_0x1ac8a9(0x7eb)]()-0x1)),this[_0x1ac8a9(0x188)]()!==_0x2b0b99&&('FqPra'!=='BQJsg'?this['playCursorSound']():this[_0x1ac8a9(0x3a4)]=0x1);}},VisuMZ['CoreEngine'][_0x4535e7(0x37b)]=Window_Selectable[_0x4535e7(0x781)][_0x4535e7(0x629)],Window_Selectable['prototype'][_0x4535e7(0x629)]=function(){const _0x4a3d30=_0x4535e7;this[_0x4a3d30(0x351)]()?'ktNjY'!==_0x4a3d30(0x573)?this[_0x4a3d30(0x644)]():this[_0x4a3d30(0x7db)]():VisuMZ['CoreEngine'][_0x4a3d30(0x37b)]['call'](this);},Window_Selectable[_0x4535e7(0x781)][_0x4535e7(0x644)]=function(){const _0x2a562a=_0x4535e7;VisuMZ[_0x2a562a(0x7ac)][_0x2a562a(0x37b)][_0x2a562a(0x77f)](this);},Window_Selectable[_0x4535e7(0x781)][_0x4535e7(0x830)]=function(){const _0x5a3d15=_0x4535e7;return VisuMZ[_0x5a3d15(0x7ac)][_0x5a3d15(0x806)][_0x5a3d15(0x70c)][_0x5a3d15(0x902)];},Window_Selectable['prototype']['rowSpacing']=function(){const _0x584548=_0x4535e7;return VisuMZ['CoreEngine']['Settings'][_0x584548(0x70c)][_0x584548(0x86d)];},Window_Selectable[_0x4535e7(0x781)][_0x4535e7(0x580)]=function(){const _0x61e9a6=_0x4535e7;return Window_Scrollable[_0x61e9a6(0x781)]['itemHeight'][_0x61e9a6(0x77f)](this)+VisuMZ[_0x61e9a6(0x7ac)][_0x61e9a6(0x806)]['Window'][_0x61e9a6(0x7d0)];;},VisuMZ['CoreEngine'][_0x4535e7(0x962)]=Window_Selectable[_0x4535e7(0x781)]['drawBackgroundRect'],Window_Selectable[_0x4535e7(0x781)][_0x4535e7(0x815)]=function(_0x5acba0){const _0x44e442=_0x4535e7,_0x4fb314=VisuMZ[_0x44e442(0x7ac)][_0x44e442(0x806)][_0x44e442(0x70c)];if(_0x4fb314[_0x44e442(0x588)]===![])return;_0x4fb314['DrawItemBackgroundJS']?'BmECo'===_0x44e442(0x62f)?_0x4fb314[_0x44e442(0x562)][_0x44e442(0x77f)](this,_0x5acba0):_0x407159[_0x44e442(0x7ac)][_0x44e442(0x801)](_0x4c5cc8):VisuMZ[_0x44e442(0x7ac)]['Window_Selectable_drawBackgroundRect']['call'](this,_0x5acba0);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x950)]=Window_Gold[_0x4535e7(0x781)][_0x4535e7(0x358)],Window_Gold[_0x4535e7(0x781)][_0x4535e7(0x358)]=function(){const _0x4da93f=_0x4535e7;this['isItemStyle']()?this[_0x4da93f(0x97f)]():VisuMZ[_0x4da93f(0x7ac)][_0x4da93f(0x950)][_0x4da93f(0x77f)](this);},Window_Gold['prototype'][_0x4535e7(0x1e2)]=function(){const _0x1813f1=_0x4535e7;if(TextManager[_0x1813f1(0x4d0)]!==this[_0x1813f1(0x4d0)]())return![];return VisuMZ[_0x1813f1(0x7ac)]['Settings'][_0x1813f1(0x699)][_0x1813f1(0x995)];},Window_Gold[_0x4535e7(0x781)]['drawGoldItemStyle']=function(){const _0x5f4cd4=_0x4535e7;this[_0x5f4cd4(0x9fa)](),this[_0x5f4cd4(0x74d)][_0x5f4cd4(0x393)](),this[_0x5f4cd4(0x74d)]['fontSize']=VisuMZ['CoreEngine'][_0x5f4cd4(0x806)][_0x5f4cd4(0x699)][_0x5f4cd4(0x564)];const _0x1fb2e1=VisuMZ['CoreEngine']['Settings'][_0x5f4cd4(0x699)]['GoldIcon'],_0x5abdd3=this['itemLineRect'](0x0);if(_0x1fb2e1>0x0){const _0xe7133c=_0x5abdd3['y']+(this['lineHeight']()-ImageManager[_0x5f4cd4(0x390)])/0x2;this['drawIcon'](_0x1fb2e1,_0x5abdd3['x'],_0xe7133c);const _0x40d451=ImageManager[_0x5f4cd4(0x6d1)]+0x4;_0x5abdd3['x']+=_0x40d451,_0x5abdd3[_0x5f4cd4(0x29a)]-=_0x40d451;}this[_0x5f4cd4(0x62c)](ColorManager['systemColor']()),this[_0x5f4cd4(0x256)](this[_0x5f4cd4(0x4d0)](),_0x5abdd3['x'],_0x5abdd3['y'],_0x5abdd3[_0x5f4cd4(0x29a)],_0x5f4cd4(0x974));const _0x19aed=this[_0x5f4cd4(0x4f0)](this[_0x5f4cd4(0x4d0)]())+0x6;;_0x5abdd3['x']+=_0x19aed,_0x5abdd3[_0x5f4cd4(0x29a)]-=_0x19aed,this[_0x5f4cd4(0x828)]();const _0x3e9231=this[_0x5f4cd4(0x856)](),_0x10f17f=this[_0x5f4cd4(0x4f0)](this[_0x5f4cd4(0x2c4)]?VisuMZ[_0x5f4cd4(0x677)](this[_0x5f4cd4(0x856)]()):this['value']());_0x10f17f>_0x5abdd3['width']?_0x5f4cd4(0x1b4)!=='gGraS'?this[_0x5f4cd4(0x256)](VisuMZ[_0x5f4cd4(0x7ac)][_0x5f4cd4(0x806)][_0x5f4cd4(0x699)][_0x5f4cd4(0x7b1)],_0x5abdd3['x'],_0x5abdd3['y'],_0x5abdd3[_0x5f4cd4(0x29a)],'right'):_0x45c7c3['CoreEngine'][_0x5f4cd4(0x91a)][_0x5f4cd4(0x77f)](this):_0x5f4cd4(0x88d)!=='DLJHN'?this[_0x5f4cd4(0x256)](this[_0x5f4cd4(0x856)](),_0x5abdd3['x'],_0x5abdd3['y'],_0x5abdd3['width'],_0x5f4cd4(0x7ae)):_0x5246de['CoreEngine'][_0x5f4cd4(0x80e)][_0x5f4cd4(0x77f)](this,_0x4d2cd6),this[_0x5f4cd4(0x9fa)]();},Window_StatusBase[_0x4535e7(0x781)][_0x4535e7(0x86f)]=function(_0x19a9e2,_0x41568d,_0x46be9e,_0x1b0212,_0x294f3c){const _0x1290a8=_0x4535e7;_0x1b0212=String(_0x1b0212||'')['toUpperCase']();if(VisuMZ[_0x1290a8(0x7ac)][_0x1290a8(0x806)]['Param'][_0x1290a8(0x2f6)]){if(_0x1290a8(0x92e)!==_0x1290a8(0x3c9)){const _0xe96ef2=VisuMZ['GetParamIcon'](_0x1b0212);if(_0x294f3c)this[_0x1290a8(0x510)](_0xe96ef2,_0x19a9e2,_0x41568d,this['gaugeLineHeight']()),_0x46be9e-=this['gaugeLineHeight']()+0x2,_0x19a9e2+=this['gaugeLineHeight']()+0x2;else{if(_0x1290a8(0x942)==='xFqjB')this[_0x1290a8(0x157)](_0xe96ef2,_0x19a9e2+0x2,_0x41568d+0x2),_0x46be9e-=ImageManager[_0x1290a8(0x6d1)]+0x4,_0x19a9e2+=ImageManager[_0x1290a8(0x6d1)]+0x4;else{_0x550655['CoreEngine'][_0x1290a8(0x58a)][_0x1290a8(0x77f)](this,_0x8a266c);if(_0x2b9cbf[_0x1290a8(0x7ac)][_0x1290a8(0x806)][_0x1290a8(0x405)][_0x1290a8(0x3f6)])return;const _0x10872d=_0x345e13['result']();_0x10872d[_0x1290a8(0x189)]&&(0x1-this['itemEva'](_0x485d8e)>this['itemHit'](_0x2b7daf)&&(_0x10872d[_0x1290a8(0x189)]=![],_0x10872d['evaded']=!![]));}}}else _0x4ee45d+=_0x2a4581(_0x13e486['$1']),_0x421783+=_0x26c2f4(_0x4806aa['$2']);}const _0x336557=TextManager['param'](_0x1b0212);this[_0x1290a8(0x9fa)](),this[_0x1290a8(0x62c)](ColorManager[_0x1290a8(0x9b4)]()),_0x294f3c?(this[_0x1290a8(0x74d)][_0x1290a8(0x855)]=this[_0x1290a8(0x82b)](),this['contents']['drawText'](_0x336557,_0x19a9e2,_0x41568d,_0x46be9e,this[_0x1290a8(0x4d2)](),_0x1290a8(0x974))):this[_0x1290a8(0x256)](_0x336557,_0x19a9e2,_0x41568d,_0x46be9e),this[_0x1290a8(0x9fa)]();},Window_StatusBase[_0x4535e7(0x781)][_0x4535e7(0x82b)]=function(){const _0x3170d3=_0x4535e7;return $gameSystem[_0x3170d3(0x24a)]()-0x8;},Window_StatusBase[_0x4535e7(0x781)][_0x4535e7(0x429)]=function(_0x36834d,_0x2eb84b,_0x3b9f02,_0x4bbdac){const _0x2c3d20=_0x4535e7;_0x4bbdac=_0x4bbdac||0xa8,this['resetTextColor']();if(VisuMZ['CoreEngine'][_0x2c3d20(0x806)]['UI'][_0x2c3d20(0x18f)])this[_0x2c3d20(0x4e3)](_0x36834d[_0x2c3d20(0x839)]()[_0x2c3d20(0x4e4)],_0x2eb84b,_0x3b9f02,_0x4bbdac);else{const _0x1fe98e=_0x36834d[_0x2c3d20(0x839)]()['name'][_0x2c3d20(0x664)](/\\I\[(\d+)\]/gi,'');this[_0x2c3d20(0x256)](_0x1fe98e,_0x2eb84b,_0x3b9f02,_0x4bbdac);}},Window_StatusBase[_0x4535e7(0x781)][_0x4535e7(0x1fc)]=function(_0x389628,_0xecdb83,_0x15fc9b,_0xe563a3){const _0x16a539=_0x4535e7;_0xe563a3=_0xe563a3||0x10e,this['resetTextColor']();if(VisuMZ[_0x16a539(0x7ac)][_0x16a539(0x806)]['UI'][_0x16a539(0x8dd)])this['drawTextEx'](_0x389628[_0x16a539(0x63d)](),_0xecdb83,_0x15fc9b,_0xe563a3);else{const _0x5f2925=_0x389628[_0x16a539(0x63d)]()[_0x16a539(0x664)](/\\I\[(\d+)\]/gi,'');this[_0x16a539(0x256)](_0x389628[_0x16a539(0x63d)](),_0xecdb83,_0x15fc9b,_0xe563a3);}},VisuMZ['CoreEngine'][_0x4535e7(0x16b)]=Window_StatusBase[_0x4535e7(0x781)]['drawActorLevel'],Window_StatusBase['prototype'][_0x4535e7(0x5bc)]=function(_0x6e743d,_0x5b39db,_0x4cac68){const _0xb7a3d7=_0x4535e7;if(VisuMZ[_0xb7a3d7(0x7ac)][_0xb7a3d7(0x806)][_0xb7a3d7(0x432)]['ShowActorLevel']===![])return;if(this[_0xb7a3d7(0x553)]())this[_0xb7a3d7(0x87b)](_0x6e743d,_0x5b39db,_0x4cac68);VisuMZ[_0xb7a3d7(0x7ac)][_0xb7a3d7(0x16b)]['call'](this,_0x6e743d,_0x5b39db,_0x4cac68);},Window_StatusBase['prototype'][_0x4535e7(0x553)]=function(){const _0x5a1a06=_0x4535e7;return VisuMZ[_0x5a1a06(0x7ac)][_0x5a1a06(0x806)]['UI'][_0x5a1a06(0x3cb)];},Window_StatusBase[_0x4535e7(0x781)][_0x4535e7(0x87b)]=function(_0x1f0077,_0x59e3aa,_0x3f9bde){const _0x1043ce=_0x4535e7;if(!_0x1f0077)return;if(!_0x1f0077[_0x1043ce(0x7ad)]())return;const _0x32c3df=0x80,_0x2cb45a=_0x1f0077[_0x1043ce(0x9be)]();let _0x44d087=ColorManager['expGaugeColor1'](),_0x455d66=ColorManager[_0x1043ce(0x68e)]();if(_0x2cb45a>=0x1){if('ZJvhF'===_0x1043ce(0x765)){if(!_0x4592bc['isPlaytest']())return;if(!_0x3b0671[_0x1043ce(0x3e2)]())return;if(!_0x3bdfeb)return;if(_0x42d2d3[_0x1043ce(0x45b)]()<=0x0)return;_0x1b1aca[_0x1043ce(0x395)](_0x338a7c,_0x591bd9);const _0x5a5631=_0x1043ce(0x2f8)['format'](_0x2d53c7['mapId']()['padZero'](0x3)),_0x275979=_0x364a7a[_0x1043ce(0x7ac)][_0x1043ce(0x85f)](_0x4b37ec[_0x1043ce(0x45b)]());_0x768532['CoreEngine'][_0x1043ce(0x51e)](_0x275979,_0x5a5631,!![]);}else _0x44d087=ColorManager[_0x1043ce(0x742)](),_0x455d66=ColorManager['maxLvGaugeColor2']();}this[_0x1043ce(0x318)](_0x59e3aa,_0x3f9bde,_0x32c3df,_0x2cb45a,_0x44d087,_0x455d66);},Window_EquipStatus['prototype'][_0x4535e7(0xa07)]=function(){const _0x4eb77c=_0x4535e7;let _0x52b437=0x0;for(const _0x211517 of VisuMZ[_0x4eb77c(0x7ac)][_0x4eb77c(0x806)][_0x4eb77c(0x432)]['DisplayedParams']){const _0x1cc536=this[_0x4eb77c(0x36e)](),_0x54c35a=this['paramY'](_0x52b437);this[_0x4eb77c(0x6c3)](_0x1cc536,_0x54c35a,_0x211517),_0x52b437++;}},Window_EquipStatus[_0x4535e7(0x781)][_0x4535e7(0x763)]=function(_0x1277a1,_0x572964,_0x530731){const _0x41df8b=_0x4535e7,_0x8c879e=this['paramX']()-this['itemPadding']()*0x2;this[_0x41df8b(0x86f)](_0x1277a1,_0x572964,_0x8c879e,_0x530731,![]);},Window_EquipStatus[_0x4535e7(0x781)][_0x4535e7(0x651)]=function(_0x5db9b3,_0x2ef272,_0x21c6b4){const _0x5037fe=_0x4535e7,_0x374016=this[_0x5037fe(0x77b)]();this[_0x5037fe(0x828)](),this[_0x5037fe(0x256)](this['_actor'][_0x5037fe(0x64e)](_0x21c6b4,!![]),_0x5db9b3,_0x2ef272,_0x374016,_0x5037fe(0x7ae));},Window_EquipStatus[_0x4535e7(0x781)][_0x4535e7(0x5fa)]=function(_0x28bf5f,_0xe33ff2){const _0x4ed3a2=_0x4535e7,_0x35f145=this[_0x4ed3a2(0x888)]();this[_0x4ed3a2(0x62c)](ColorManager[_0x4ed3a2(0x9b4)]());const _0x5d5a05=VisuMZ['CoreEngine'][_0x4ed3a2(0x806)]['UI'][_0x4ed3a2(0x180)];this['drawText'](_0x5d5a05,_0x28bf5f,_0xe33ff2,_0x35f145,_0x4ed3a2(0x9a0));},Window_EquipStatus[_0x4535e7(0x781)][_0x4535e7(0x2e4)]=function(_0x11fcf3,_0x1d1ae5,_0x2586a9){const _0x4ac4bf=_0x4535e7,_0x1c06e6=this[_0x4ac4bf(0x77b)](),_0x266478=this['_tempActor'][_0x4ac4bf(0x64e)](_0x2586a9),_0x3a45ad=_0x266478-this[_0x4ac4bf(0x204)][_0x4ac4bf(0x64e)](_0x2586a9);this[_0x4ac4bf(0x62c)](ColorManager[_0x4ac4bf(0x4a0)](_0x3a45ad)),this[_0x4ac4bf(0x256)](this[_0x4ac4bf(0xa1f)][_0x4ac4bf(0x64e)](_0x2586a9,!![]),_0x11fcf3,_0x1d1ae5,_0x1c06e6,_0x4ac4bf(0x7ae));},VisuMZ[_0x4535e7(0x7ac)]['Window_EquipItem_isEnabled']=Window_EquipItem[_0x4535e7(0x781)][_0x4535e7(0x44e)],Window_EquipItem[_0x4535e7(0x781)]['isEnabled']=function(_0x37b308){const _0x1b9eb8=_0x4535e7;if(_0x37b308&&this['_actor'])return _0x1b9eb8(0x952)!==_0x1b9eb8(0x4c9)?this['_actor'][_0x1b9eb8(0x712)](_0x37b308):_0x4b9fac['layoutSettings'][_0x1b9eb8(0x1ec)][_0x1b9eb8(0x77f)](this);else{if(_0x1b9eb8(0x398)!==_0x1b9eb8(0x398))_0x10d9bf[_0x1b9eb8(0x8d1)](_0x439011),!_0x2374d9['_showDevTools']&&(_0x597e07[_0x1b9eb8(0x3e8)]=!![],_0x5313f9[_0x1b9eb8(0x42b)]());else return VisuMZ[_0x1b9eb8(0x7ac)][_0x1b9eb8(0x2fe)][_0x1b9eb8(0x77f)](this,_0x37b308);}},Window_StatusParams[_0x4535e7(0x781)][_0x4535e7(0x7eb)]=function(){const _0x24038b=_0x4535e7;return VisuMZ['CoreEngine'][_0x24038b(0x806)]['Param'][_0x24038b(0x908)][_0x24038b(0x2ec)];},Window_StatusParams[_0x4535e7(0x781)][_0x4535e7(0x6c3)]=function(_0x155b2d){const _0x517e38=_0x4535e7,_0x8d57f7=this[_0x517e38(0x52f)](_0x155b2d),_0x59630a=VisuMZ[_0x517e38(0x7ac)]['Settings'][_0x517e38(0x432)][_0x517e38(0x908)][_0x155b2d],_0x2c4e8a=TextManager[_0x517e38(0x97d)](_0x59630a),_0x4e7b74=this[_0x517e38(0x204)]['paramValueByName'](_0x59630a,!![]);this[_0x517e38(0x86f)](_0x8d57f7['x'],_0x8d57f7['y'],0xa0,_0x59630a,![]),this[_0x517e38(0x828)](),this[_0x517e38(0x256)](_0x4e7b74,_0x8d57f7['x']+0xa0,_0x8d57f7['y'],0x3c,_0x517e38(0x7ae));};if(VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x806)]['KeyboardInput']['EnableNameInput']){VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x806)]['KeyboardInput']['QwertyLayout']&&(Window_NameInput[_0x4535e7(0x2be)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x4535e7(0x198),'OK']);;VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x2cc)]=Window_NameInput['prototype'][_0x4535e7(0x614)],Window_NameInput[_0x4535e7(0x781)][_0x4535e7(0x614)]=function(_0x2963e2){const _0x78e5ef=_0x4535e7;this['_mode']=this[_0x78e5ef(0x636)](),VisuMZ[_0x78e5ef(0x7ac)][_0x78e5ef(0x2cc)][_0x78e5ef(0x77f)](this,_0x2963e2),this[_0x78e5ef(0x35b)]===_0x78e5ef(0x696)?this['select'](0x0):(Input[_0x78e5ef(0x393)](),this[_0x78e5ef(0x61a)]());},Window_NameInput['prototype'][_0x4535e7(0x636)]=function(){const _0x16c722=_0x4535e7;if(Input[_0x16c722(0x919)]())return _0x16c722(0x696);return VisuMZ[_0x16c722(0x7ac)]['Settings']['KeyboardInput'][_0x16c722(0x6e7)]||_0x16c722(0x74e);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x8d7)]=Window_NameInput[_0x4535e7(0x781)]['processHandling'],Window_NameInput[_0x4535e7(0x781)][_0x4535e7(0x634)]=function(){const _0x9b9122=_0x4535e7;if(!this['isOpen']())return;if(!this[_0x9b9122(0x315)])return;if(this[_0x9b9122(0x35b)]===_0x9b9122(0x74e)&&Input[_0x9b9122(0x756)]())this['switchModes'](_0x9b9122(0x696));else{if(Input[_0x9b9122(0x8bb)]('backspace'))_0x9b9122(0x72b)!==_0x9b9122(0x72b)?this['_forcedBattleSys']='PTB':(Input[_0x9b9122(0x393)](),this[_0x9b9122(0x938)]());else{if(Input[_0x9b9122(0x8bf)]('tab'))_0x9b9122(0x209)==='AbLZm'?(Input[_0x9b9122(0x393)](),this[_0x9b9122(0x35b)]===_0x9b9122(0x74e)?this[_0x9b9122(0x1e1)](_0x9b9122(0x696)):this[_0x9b9122(0x1e1)](_0x9b9122(0x74e))):this['_forcedTroopView']='SV';else{if(this[_0x9b9122(0x35b)]===_0x9b9122(0x74e)){if(_0x9b9122(0x87e)!==_0x9b9122(0x87e)){const _0x3bf105=_0x3343b2['CoreEngine']['Settings'][_0x9b9122(0x593)];return _0x3bf105[_0x9b9122(0x8c0)]||_0x9b9122(0x198);}else this[_0x9b9122(0xa31)]();}else{if(Input[_0x9b9122(0x8bb)]('escape'))_0x9b9122(0x70a)===_0x9b9122(0x2d5)?_0x55f5a7+=_0x9b9122(0x5ea):(Input[_0x9b9122(0x393)](),this[_0x9b9122(0x1e1)](_0x9b9122(0x74e)));else{if(_0x9b9122(0x212)!==_0x9b9122(0x212)){if(_0xb84522[_0x9b9122(0x27c)](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0x55425d[_0x9b9122(0x27c)](/enter/i))return this[_0x9b9122(0x6dd)]===0xd;if(_0x2960a8[_0x9b9122(0x27c)](/escape/i))return this[_0x9b9122(0x6dd)]===0x1b;}else VisuMZ[_0x9b9122(0x7ac)][_0x9b9122(0x8d7)][_0x9b9122(0x77f)](this);}}}}}},VisuMZ[_0x4535e7(0x7ac)]['Window_NameInput_processTouch']=Window_NameInput[_0x4535e7(0x781)][_0x4535e7(0x629)],Window_NameInput[_0x4535e7(0x781)][_0x4535e7(0x629)]=function(){const _0x1e1bae=_0x4535e7;if(!this['isOpenAndActive']())return;if(this[_0x1e1bae(0x35b)]===_0x1e1bae(0x74e)){if(TouchInput['isTriggered']()&&this[_0x1e1bae(0x546)]())_0x1e1bae(0x79f)!=='ZEtdf'?(_0x43e632+=_0x5d4283+'\x0a',_0xdabc61+=_0x1e1bae(0x5fe)):this[_0x1e1bae(0x1e1)]('default');else TouchInput[_0x1e1bae(0x3d2)]()&&this[_0x1e1bae(0x1e1)](_0x1e1bae(0x696));}else VisuMZ[_0x1e1bae(0x7ac)][_0x1e1bae(0x91a)]['call'](this);},Window_NameInput[_0x4535e7(0x781)][_0x4535e7(0xa31)]=function(){const _0x118b41=_0x4535e7;if(Input[_0x118b41(0x8bb)](_0x118b41(0x675)))Input[_0x118b41(0x393)](),this[_0x118b41(0x800)]();else{if(Input[_0x118b41(0x3e7)]!==undefined){let _0x73b729=Input['_inputString'],_0x4929eb=_0x73b729[_0x118b41(0x2ec)];for(let _0x68fc1c=0x0;_0x68fc1c<_0x4929eb;++_0x68fc1c){_0x118b41(0x6f7)===_0x118b41(0x7e9)?_0x290b12&&_0x572dd1[_0x118b41(0x76e)]():this[_0x118b41(0x458)][_0x118b41(0x313)](_0x73b729[_0x68fc1c])?SoundManager[_0x118b41(0x8e6)]():SoundManager[_0x118b41(0x838)]();}Input[_0x118b41(0x393)]();}}},Window_NameInput['prototype'][_0x4535e7(0x1e1)]=function(_0x98e8a){const _0x474a74=_0x4535e7;let _0xbc9ce7=this[_0x474a74(0x35b)];this[_0x474a74(0x35b)]=_0x98e8a,_0xbc9ce7!==this[_0x474a74(0x35b)]&&(_0x474a74(0x8c6)!=='GdCyJ'?(_0x11d4dc[_0x474a74(0x7ac)][_0x474a74(0x445)][_0x474a74(0x77f)](this),this[_0x474a74(0x4f6)](),this[_0x474a74(0x4c2)]()):(this[_0x474a74(0x358)](),SoundManager[_0x474a74(0x8e6)](),this[_0x474a74(0x35b)]===_0x474a74(0x696)?this[_0x474a74(0x9c2)](0x0):this[_0x474a74(0x9c2)](-0x1)));},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x931)]=Window_NameInput[_0x4535e7(0x781)]['cursorDown'],Window_NameInput[_0x4535e7(0x781)][_0x4535e7(0x7c0)]=function(_0xdce7dc){const _0x27f21d=_0x4535e7;if(this[_0x27f21d(0x35b)]===_0x27f21d(0x74e)&&!Input[_0x27f21d(0x232)]())return;if(Input[_0x27f21d(0x693)]())return;VisuMZ[_0x27f21d(0x7ac)][_0x27f21d(0x931)]['call'](this,_0xdce7dc),this['switchModes'](_0x27f21d(0x696));},VisuMZ['CoreEngine'][_0x4535e7(0x4ef)]=Window_NameInput[_0x4535e7(0x781)][_0x4535e7(0x50e)],Window_NameInput['prototype'][_0x4535e7(0x50e)]=function(_0x5d9338){const _0x5e2380=_0x4535e7;if(this[_0x5e2380(0x35b)]===_0x5e2380(0x74e)&&!Input[_0x5e2380(0x232)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x5e2380(0x7ac)][_0x5e2380(0x4ef)][_0x5e2380(0x77f)](this,_0x5d9338),this['switchModes'](_0x5e2380(0x696));},VisuMZ[_0x4535e7(0x7ac)]['Window_NameInput_cursorRight']=Window_NameInput[_0x4535e7(0x781)][_0x4535e7(0x1cb)],Window_NameInput[_0x4535e7(0x781)][_0x4535e7(0x1cb)]=function(_0x59e657){const _0x23b3dd=_0x4535e7;if(this['_mode']===_0x23b3dd(0x74e)&&!Input[_0x23b3dd(0x232)]())return;if(Input[_0x23b3dd(0x693)]())return;VisuMZ[_0x23b3dd(0x7ac)][_0x23b3dd(0x5e0)][_0x23b3dd(0x77f)](this,_0x59e657),this[_0x23b3dd(0x1e1)]('default');},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x1f2)]=Window_NameInput[_0x4535e7(0x781)][_0x4535e7(0x5cf)],Window_NameInput[_0x4535e7(0x781)][_0x4535e7(0x5cf)]=function(_0x48e8a0){const _0xe4d53f=_0x4535e7;if(this[_0xe4d53f(0x35b)]===_0xe4d53f(0x74e)&&!Input['isArrowPressed']())return;if(Input[_0xe4d53f(0x693)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorLeft']['call'](this,_0x48e8a0),this[_0xe4d53f(0x1e1)](_0xe4d53f(0x696));},VisuMZ['CoreEngine']['Window_NameInput_cursorPagedown']=Window_NameInput[_0x4535e7(0x781)][_0x4535e7(0x9de)],Window_NameInput[_0x4535e7(0x781)][_0x4535e7(0x9de)]=function(){const _0x5181a3=_0x4535e7;if(this[_0x5181a3(0x35b)]===_0x5181a3(0x74e))return;if(Input[_0x5181a3(0x693)]())return;VisuMZ[_0x5181a3(0x7ac)][_0x5181a3(0x54b)]['call'](this),this[_0x5181a3(0x1e1)](_0x5181a3(0x696));},VisuMZ['CoreEngine'][_0x4535e7(0x9c4)]=Window_NameInput[_0x4535e7(0x781)][_0x4535e7(0x965)],Window_NameInput[_0x4535e7(0x781)][_0x4535e7(0x965)]=function(){const _0x48e4b6=_0x4535e7;if(this[_0x48e4b6(0x35b)]==='keyboard')return;if(Input[_0x48e4b6(0x693)]())return;VisuMZ[_0x48e4b6(0x7ac)]['Window_NameInput_cursorPageup'][_0x48e4b6(0x77f)](this),this['switchModes'](_0x48e4b6(0x696));},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x27b)]=Window_NameInput['prototype'][_0x4535e7(0x358)],Window_NameInput['prototype'][_0x4535e7(0x358)]=function(){const _0x566140=_0x4535e7;if(this[_0x566140(0x35b)]===_0x566140(0x74e)){if(_0x566140(0x326)!=='DjuRg'){this[_0x566140(0x74d)][_0x566140(0x393)](),this[_0x566140(0x5b7)][_0x566140(0x393)](),this[_0x566140(0x828)]();let _0xd7bf82=VisuMZ[_0x566140(0x7ac)][_0x566140(0x806)][_0x566140(0x593)][_0x566140(0x8ae)]['split']('\x0a'),_0x5a0c5b=_0xd7bf82[_0x566140(0x2ec)],_0x27f1d8=(this[_0x566140(0x288)]-_0x5a0c5b*this[_0x566140(0x80a)]())/0x2;for(let _0x2989c6=0x0;_0x2989c6<_0x5a0c5b;++_0x2989c6){let _0x274d51=_0xd7bf82[_0x2989c6],_0x2e6481=this[_0x566140(0x38f)](_0x274d51)['width'],_0x596383=Math[_0x566140(0xa14)]((this['contents'][_0x566140(0x29a)]-_0x2e6481)/0x2);this[_0x566140(0x4e3)](_0x274d51,_0x596383,_0x27f1d8),_0x27f1d8+=this[_0x566140(0x80a)]();}}else{if(!_0x2f1a3f['isPlaytest']())return;const _0x5c041b=_0x373097[_0x566140(0x521)]();_0x3fb461[_0x566140(0x1d6)]&&_0x23f341['clipboard'][_0x566140(0x923)](_0x5c041b);}}else VisuMZ['CoreEngine']['Window_NameInput_refresh']['call'](this);};};VisuMZ['CoreEngine'][_0x4535e7(0x520)]=Window_ShopSell['prototype'][_0x4535e7(0x44e)],Window_ShopSell['prototype'][_0x4535e7(0x44e)]=function(_0x24463a){const _0x8ba17e=_0x4535e7;if(VisuMZ[_0x8ba17e(0x7ac)][_0x8ba17e(0x806)]['QoL']['KeyItemProtect']&&DataManager[_0x8ba17e(0x700)](_0x24463a)){if('RXUIu'!==_0x8ba17e(0x898)){const _0x5bed1e=_0x366373[_0x8ba17e(0x67f)]()['trim'](),_0x14bae8=_0x4cf015['CoreEngine'][_0x8ba17e(0x46e)][_0x5bed1e];if(!_0x14bae8)return this[_0x8ba17e(0x81a)](_0x5e72e9,_0x3c6e54);return _0x14bae8[_0xda4232]||this[_0x8ba17e(0x7a8)](_0x49e37b,_0x1ccae0);}else return![];}else return VisuMZ['CoreEngine'][_0x8ba17e(0x520)][_0x8ba17e(0x77f)](this,_0x24463a);},Window_NumberInput[_0x4535e7(0x781)][_0x4535e7(0x351)]=function(){return![];};VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x806)][_0x4535e7(0x593)]['EnableNumberInput']&&(VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x1a0)]=Window_NumberInput[_0x4535e7(0x781)][_0x4535e7(0x4c6)],Window_NumberInput['prototype']['start']=function(){const _0x47aee6=_0x4535e7;VisuMZ[_0x47aee6(0x7ac)][_0x47aee6(0x1a0)][_0x47aee6(0x77f)](this),this['select'](this[_0x47aee6(0x504)]-0x1),Input[_0x47aee6(0x393)]();},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x692)]=Window_NumberInput[_0x4535e7(0x781)][_0x4535e7(0x18c)],Window_NumberInput[_0x4535e7(0x781)]['processDigitChange']=function(){const _0x25f617=_0x4535e7;if(!this[_0x25f617(0x9bb)]())return;if(Input[_0x25f617(0x693)]())this[_0x25f617(0x6c0)]();else{if(Input['isSpecialCode']('backspace'))this['processKeyboardBackspace']();else{if(Input[_0x25f617(0x6dd)]===0x2e)_0x25f617(0x990)!==_0x25f617(0x8d4)?this[_0x25f617(0x24b)]():(_0x5f3a9a[_0x25f617(0x7ac)]['Scene_Battle_createSpriteset']['call'](this),_0x923ffe=this['_spriteset']);else{if(Input[_0x25f617(0x6dd)]===0x24)this[_0x25f617(0x35d)]();else Input[_0x25f617(0x6dd)]===0x23?this[_0x25f617(0x71f)]():VisuMZ[_0x25f617(0x7ac)][_0x25f617(0x692)][_0x25f617(0x77f)](this);}}}},Window_NumberInput[_0x4535e7(0x781)][_0x4535e7(0x15a)]=function(){const _0x1df66e=_0x4535e7;if(!this[_0x1df66e(0x338)]())return;Input[_0x1df66e(0x693)]()?'XGUIr'==='XGUIr'?this['processKeyboardDigitChange']():(_0x2668ae[_0x1df66e(0x393)](),this['processBack']()):Window_Selectable[_0x1df66e(0x781)][_0x1df66e(0x15a)]['call'](this);},Window_NumberInput[_0x4535e7(0x781)]['processCursorHomeEndTrigger']=function(){},Window_NumberInput[_0x4535e7(0x781)]['processKeyboardDigitChange']=function(){const _0x1b59fc=_0x4535e7;if(String(this[_0x1b59fc(0x160)])[_0x1b59fc(0x2ec)]>=this[_0x1b59fc(0x504)])return;const _0x3b74cc=Number(String(this[_0x1b59fc(0x160)])+Input[_0x1b59fc(0x3e7)]);if(isNaN(_0x3b74cc))return;this[_0x1b59fc(0x160)]=_0x3b74cc;const _0x17f70b='9'[_0x1b59fc(0x777)](this[_0x1b59fc(0x504)]);this['_number']=this['_number'][_0x1b59fc(0x15b)](0x0,_0x17f70b),Input[_0x1b59fc(0x393)](),this[_0x1b59fc(0x358)](),SoundManager[_0x1b59fc(0x8b0)](),this[_0x1b59fc(0x9c2)](this[_0x1b59fc(0x504)]-0x1);},Window_NumberInput[_0x4535e7(0x781)]['processKeyboardBackspace']=function(){const _0x167912=_0x4535e7;this[_0x167912(0x160)]=Number(String(this[_0x167912(0x160)])[_0x167912(0x840)](0x0,-0x1)),this[_0x167912(0x160)]=Math[_0x167912(0x548)](0x0,this[_0x167912(0x160)]),Input[_0x167912(0x393)](),this[_0x167912(0x358)](),SoundManager[_0x167912(0x8b0)](),this[_0x167912(0x9c2)](this['_maxDigits']-0x1);},Window_NumberInput[_0x4535e7(0x781)][_0x4535e7(0x24b)]=function(){const _0x537d26=_0x4535e7;this['_number']=Number(String(this[_0x537d26(0x160)])[_0x537d26(0x659)](0x1)),this[_0x537d26(0x160)]=Math['max'](0x0,this[_0x537d26(0x160)]),Input['clear'](),this['refresh'](),SoundManager[_0x537d26(0x8b0)](),this['select'](this[_0x537d26(0x504)]-0x1);},Window_NumberInput[_0x4535e7(0x781)][_0x4535e7(0x35d)]=function(){const _0x32be32=_0x4535e7;if(this[_0x32be32(0x188)]()===0x0)return;Input[_0x32be32(0x393)](),this[_0x32be32(0x358)](),SoundManager[_0x32be32(0x8b0)](),this['select'](0x0);},Window_NumberInput[_0x4535e7(0x781)]['processKeyboardEnd']=function(){const _0x3d6bae=_0x4535e7;if(this[_0x3d6bae(0x188)]()===this[_0x3d6bae(0x504)]-0x1)return;Input['clear'](),this[_0x3d6bae(0x358)](),SoundManager['playCursor'](),this[_0x3d6bae(0x9c2)](this[_0x3d6bae(0x504)]-0x1);});;VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x19f)]=Window_MapName[_0x4535e7(0x781)]['refresh'],Window_MapName[_0x4535e7(0x781)]['refresh']=function(){const _0x512abf=_0x4535e7;VisuMZ[_0x512abf(0x7ac)][_0x512abf(0x806)][_0x512abf(0x405)]['MapNameTextCode']?this[_0x512abf(0x793)]():VisuMZ[_0x512abf(0x7ac)]['Window_MapName_refresh'][_0x512abf(0x77f)](this);},Window_MapName['prototype'][_0x4535e7(0x793)]=function(){const _0x528787=_0x4535e7;this[_0x528787(0x74d)]['clear']();if($gameMap[_0x528787(0x241)]()){const _0x5c9a75=this[_0x528787(0x83e)];this[_0x528787(0x851)](0x0,0x0,_0x5c9a75,this[_0x528787(0x80a)]());const _0x5dbc3a=this[_0x528787(0x38f)]($gameMap[_0x528787(0x241)]())[_0x528787(0x29a)];this[_0x528787(0x4e3)]($gameMap[_0x528787(0x241)](),Math[_0x528787(0xa14)]((_0x5c9a75-_0x5dbc3a)/0x2),0x0);}},Window_TitleCommand[_0x4535e7(0x768)]=VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x806)][_0x4535e7(0x9da)],Window_TitleCommand[_0x4535e7(0x781)]['makeCommandList']=function(){this['makeCoreEngineCommandList']();},Window_TitleCommand[_0x4535e7(0x781)]['makeCoreEngineCommandList']=function(){const _0x29c67c=_0x4535e7;for(const _0x3ea0c4 of Window_TitleCommand[_0x29c67c(0x768)]){if(_0x29c67c(0x1b0)!==_0x29c67c(0x1b0))return _0x1873e1[_0x29c67c(0x7ac)][_0x29c67c(0x4b7)][_0x29c67c(0x77f)](this,_0x3765fe);else{if(_0x3ea0c4[_0x29c67c(0x167)][_0x29c67c(0x77f)](this)){const _0xa57470=_0x3ea0c4[_0x29c67c(0x3d6)];let _0x4c78a1=_0x3ea0c4[_0x29c67c(0x721)];if(['',_0x29c67c(0x9a8)][_0x29c67c(0x454)](_0x4c78a1))_0x4c78a1=_0x3ea0c4['TextJS'][_0x29c67c(0x77f)](this);const _0x158533=_0x3ea0c4[_0x29c67c(0x805)]['call'](this),_0x457220=_0x3ea0c4['ExtJS'][_0x29c67c(0x77f)](this);this[_0x29c67c(0x48d)](_0x4c78a1,_0xa57470,_0x158533,_0x457220),this[_0x29c67c(0x3b5)](_0xa57470,_0x3ea0c4[_0x29c67c(0x9fd)][_0x29c67c(0x8f2)](this,_0x457220));}}}},VisuMZ[_0x4535e7(0x7ac)]['Window_TitleCommand_selectLast']=Window_TitleCommand[_0x4535e7(0x781)]['selectLast'],Window_TitleCommand[_0x4535e7(0x781)]['selectLast']=function(){const _0x5a8ed0=_0x4535e7;VisuMZ[_0x5a8ed0(0x7ac)]['Window_TitleCommand_selectLast']['call'](this);if(!Window_TitleCommand[_0x5a8ed0(0x2d9)])return;const _0x159335=this['findSymbol'](Window_TitleCommand[_0x5a8ed0(0x2d9)]),_0x4af635=Math[_0x5a8ed0(0xa14)](this['maxVisibleItems']()/0x2)-0x1;this[_0x5a8ed0(0x953)](_0x159335),this[_0x5a8ed0(0x4d3)]>0x1&&(this['_scrollDuration']=0x1,this['updateSmoothScroll']()),this['setTopRow'](_0x159335-_0x4af635);},Window_GameEnd[_0x4535e7(0x768)]=VisuMZ[_0x4535e7(0x7ac)]['Settings']['MenuLayout']['GameEnd'][_0x4535e7(0x785)],Window_GameEnd[_0x4535e7(0x781)][_0x4535e7(0x1af)]=function(){const _0x165abd=_0x4535e7;this[_0x165abd(0x53f)]();},Window_GameEnd['prototype'][_0x4535e7(0x53f)]=function(){const _0x4eb6df=_0x4535e7;for(const _0x52fee4 of Window_GameEnd[_0x4eb6df(0x768)]){if(_0x52fee4[_0x4eb6df(0x167)][_0x4eb6df(0x77f)](this)){const _0x5337c1=_0x52fee4['Symbol'];let _0x37a14a=_0x52fee4[_0x4eb6df(0x721)];if(['',_0x4eb6df(0x9a8)][_0x4eb6df(0x454)](_0x37a14a))_0x37a14a=_0x52fee4['TextJS']['call'](this);const _0x745af0=_0x52fee4[_0x4eb6df(0x805)][_0x4eb6df(0x77f)](this),_0x497bb7=_0x52fee4['ExtJS'][_0x4eb6df(0x77f)](this);this[_0x4eb6df(0x48d)](_0x37a14a,_0x5337c1,_0x745af0,_0x497bb7),this[_0x4eb6df(0x3b5)](_0x5337c1,_0x52fee4['CallHandlerJS'][_0x4eb6df(0x8f2)](this,_0x497bb7));}}};function Window_ButtonAssist(){const _0x125387=_0x4535e7;this[_0x125387(0x614)](...arguments);}Window_ButtonAssist[_0x4535e7(0x781)]=Object[_0x4535e7(0x4ec)](Window_Base[_0x4535e7(0x781)]),Window_ButtonAssist['prototype'][_0x4535e7(0x30f)]=Window_ButtonAssist,Window_ButtonAssist['prototype']['initialize']=function(_0x2e9e4b){const _0x4543e5=_0x4535e7;this['_data']={},Window_Base[_0x4543e5(0x781)][_0x4543e5(0x614)][_0x4543e5(0x77f)](this,_0x2e9e4b),this[_0x4543e5(0x518)](VisuMZ[_0x4543e5(0x7ac)][_0x4543e5(0x806)][_0x4543e5(0x40d)][_0x4543e5(0x885)]||0x0),this['refresh']();},Window_ButtonAssist[_0x4535e7(0x781)][_0x4535e7(0x622)]=function(){const _0x29d85d=_0x4535e7;this[_0x29d85d(0x74d)][_0x29d85d(0x855)]<=0x60&&(this[_0x29d85d(0x74d)][_0x29d85d(0x855)]+=0x6);},Window_ButtonAssist[_0x4535e7(0x781)][_0x4535e7(0xa13)]=function(){const _0x54e741=_0x4535e7;this[_0x54e741(0x74d)]['fontSize']>=0x18&&(this['contents'][_0x54e741(0x855)]-=0x6);},Window_ButtonAssist[_0x4535e7(0x781)][_0x4535e7(0x76e)]=function(){const _0x1f0881=_0x4535e7;Window_Base[_0x1f0881(0x781)][_0x1f0881(0x76e)]['call'](this),this[_0x1f0881(0x964)]();},Window_ButtonAssist[_0x4535e7(0x781)]['updatePadding']=function(){const _0xaf228b=_0x4535e7;this['padding']=SceneManager[_0xaf228b(0x42f)]['getButtonAssistLocation']()!==_0xaf228b(0x462)?0x0:0x8;},Window_ButtonAssist[_0x4535e7(0x781)][_0x4535e7(0x964)]=function(){const _0x8014cb=_0x4535e7,_0x5c6cfb=SceneManager[_0x8014cb(0x42f)];for(let _0x432ac5=0x1;_0x432ac5<=0x5;_0x432ac5++){if(this[_0x8014cb(0x1ea)][_0x8014cb(0x1fe)[_0x8014cb(0x543)](_0x432ac5)]!==_0x5c6cfb[_0x8014cb(0x993)[_0x8014cb(0x543)](_0x432ac5)]())return _0x8014cb(0x202)===_0x8014cb(0x202)?this[_0x8014cb(0x358)]():this['buttonAssistWindowSideRect']();if(this[_0x8014cb(0x1ea)][_0x8014cb(0x58b)[_0x8014cb(0x543)](_0x432ac5)]!==_0x5c6cfb[_0x8014cb(0x453)[_0x8014cb(0x543)](_0x432ac5)]())return this[_0x8014cb(0x358)]();}},Window_ButtonAssist[_0x4535e7(0x781)][_0x4535e7(0x358)]=function(){const _0x112570=_0x4535e7;this[_0x112570(0x74d)][_0x112570(0x393)]();for(let _0x1411c8=0x1;_0x1411c8<=0x5;_0x1411c8++){this[_0x112570(0x5c4)](_0x1411c8);}},Window_ButtonAssist['prototype'][_0x4535e7(0x5c4)]=function(_0x5e8128){const _0x33a8f8=_0x4535e7,_0x391d48=this[_0x33a8f8(0x83e)]/0x5,_0x13c3a2=SceneManager['_scene'],_0x1f5a44=_0x13c3a2[_0x33a8f8(0x993)[_0x33a8f8(0x543)](_0x5e8128)](),_0x3f21cf=_0x13c3a2[_0x33a8f8(0x453)[_0x33a8f8(0x543)](_0x5e8128)]();this['_data']['key%1'[_0x33a8f8(0x543)](_0x5e8128)]=_0x1f5a44,this[_0x33a8f8(0x1ea)]['text%1'[_0x33a8f8(0x543)](_0x5e8128)]=_0x3f21cf;if(_0x1f5a44==='')return;if(_0x3f21cf==='')return;const _0x4681a5=_0x13c3a2[_0x33a8f8(0x8fe)[_0x33a8f8(0x543)](_0x5e8128)](),_0x4af62d=this['itemPadding'](),_0xefd9ab=_0x391d48*(_0x5e8128-0x1)+_0x4af62d+_0x4681a5,_0x5ba1b9=VisuMZ[_0x33a8f8(0x7ac)]['Settings']['ButtonAssist'][_0x33a8f8(0x346)];this[_0x33a8f8(0x4e3)](_0x5ba1b9[_0x33a8f8(0x543)](_0x1f5a44,_0x3f21cf),_0xefd9ab,0x0,_0x391d48-_0x4af62d*0x2);},VisuMZ['CoreEngine'][_0x4535e7(0x709)]=Game_Interpreter[_0x4535e7(0x781)]['updateWaitMode'],Game_Interpreter['prototype']['updateWaitMode']=function(){const _0x54dead=_0x4535e7;if($gameTemp[_0x54dead(0x5c7)]!==undefined){if(_0x54dead(0x846)!==_0x54dead(0x846)){for(const _0x279158 of this[_0x54dead(0x608)]){!_0x279158['isPlaying']()&&this['removePointAnimation'](_0x279158);}this[_0x54dead(0x3a1)]();}else return VisuMZ['CoreEngine'][_0x54dead(0x1d9)]();}return VisuMZ[_0x54dead(0x7ac)][_0x54dead(0x709)]['call'](this);},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x1d9)]=function(){const _0x3985e8=_0x4535e7,_0x577f8b=$gameTemp[_0x3985e8(0x5c7)]||0x0;(_0x577f8b<0x0||_0x577f8b>0x64||TouchInput[_0x3985e8(0x3d2)]()||Input[_0x3985e8(0x8bf)](_0x3985e8(0x9d7)))&&($gameTemp[_0x3985e8(0x5c7)]=undefined,Input[_0x3985e8(0x393)](),TouchInput[_0x3985e8(0x393)]());const _0x652fb4=$gameScreen[_0x3985e8(0x8ee)](_0x577f8b);return _0x652fb4&&(_0x652fb4['_x']=TouchInput['_x'],_0x652fb4['_y']=TouchInput['_y']),VisuMZ['CoreEngine']['updatePictureCoordinates'](),$gameTemp[_0x3985e8(0x5c7)]!==undefined;},VisuMZ['CoreEngine']['updatePictureCoordinates']=function(){const _0x1a57c7=_0x4535e7,_0x21af39=SceneManager[_0x1a57c7(0x42f)];if(!_0x21af39)return;!_0x21af39[_0x1a57c7(0x9f6)]&&(SoundManager[_0x1a57c7(0x4ae)](),_0x21af39[_0x1a57c7(0x9f6)]=new Window_PictureCoordinates(),_0x21af39[_0x1a57c7(0x379)](_0x21af39[_0x1a57c7(0x9f6)])),$gameTemp['_pictureCoordinatesMode']===undefined&&(SoundManager[_0x1a57c7(0x876)](),_0x21af39[_0x1a57c7(0x31d)](_0x21af39[_0x1a57c7(0x9f6)]),_0x21af39[_0x1a57c7(0x9f6)]=undefined);};function Window_PictureCoordinates(){const _0x231c56=_0x4535e7;this[_0x231c56(0x614)](...arguments);}function _0x5575(_0x245778,_0x457f74){const _0x196805=_0x1968();return _0x5575=function(_0x557529,_0x217691){_0x557529=_0x557529-0x14c;let _0x519306=_0x196805[_0x557529];return _0x519306;},_0x5575(_0x245778,_0x457f74);}Window_PictureCoordinates[_0x4535e7(0x781)]=Object[_0x4535e7(0x4ec)](Window_Base[_0x4535e7(0x781)]),Window_PictureCoordinates['prototype'][_0x4535e7(0x30f)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x4535e7(0x781)][_0x4535e7(0x614)]=function(){const _0x3c6123=_0x4535e7;this['_lastOrigin']=_0x3c6123(0x4dd),this[_0x3c6123(0x7a4)]=_0x3c6123(0x4dd),this[_0x3c6123(0x342)]=_0x3c6123(0x4dd);const _0x395e08=this[_0x3c6123(0x32d)]();Window_Base[_0x3c6123(0x781)][_0x3c6123(0x614)][_0x3c6123(0x77f)](this,_0x395e08),this[_0x3c6123(0x518)](0x2);},Window_PictureCoordinates[_0x4535e7(0x781)][_0x4535e7(0x32d)]=function(){const _0x5a6c6f=_0x4535e7;let _0x1edd73=0x0,_0xa8d902=Graphics[_0x5a6c6f(0x1ad)]-this[_0x5a6c6f(0x80a)](),_0x2f7717=Graphics['width'],_0x8b2094=this[_0x5a6c6f(0x80a)]();return new Rectangle(_0x1edd73,_0xa8d902,_0x2f7717,_0x8b2094);},Window_PictureCoordinates[_0x4535e7(0x781)]['updatePadding']=function(){const _0x3d91a2=_0x4535e7;this[_0x3d91a2(0x86a)]=0x0;},Window_PictureCoordinates[_0x4535e7(0x781)][_0x4535e7(0x76e)]=function(){const _0x5b9c36=_0x4535e7;Window_Base['prototype']['update'][_0x5b9c36(0x77f)](this),this['updateData']();},Window_PictureCoordinates['prototype'][_0x4535e7(0x831)]=function(){const _0x489f7e=_0x4535e7;if(!this[_0x489f7e(0x913)]())return;this[_0x489f7e(0x358)]();},Window_PictureCoordinates[_0x4535e7(0x781)][_0x4535e7(0x913)]=function(){const _0x25102d=_0x4535e7,_0x48d456=$gameTemp[_0x25102d(0x5c7)],_0x1d1046=$gameScreen[_0x25102d(0x8ee)](_0x48d456);if(_0x1d1046){if(_0x25102d(0x8e2)===_0x25102d(0x8e2))return this[_0x25102d(0x4e9)]!==_0x1d1046[_0x25102d(0x31e)]||this[_0x25102d(0x7a4)]!==_0x1d1046['_x']||this[_0x25102d(0x342)]!==_0x1d1046['_y'];else _0x33e7d9[_0x25102d(0x678)]&&(this[_0x25102d(0x3a4)]=_0x25102d(0x40e));}else return![];},Window_PictureCoordinates[_0x4535e7(0x781)][_0x4535e7(0x358)]=function(){const _0x4f41d6=_0x4535e7;this[_0x4f41d6(0x74d)][_0x4f41d6(0x393)]();const _0x5a9db1=$gameTemp[_0x4f41d6(0x5c7)],_0x27574d=$gameScreen['picture'](_0x5a9db1);if(!_0x27574d)return;this[_0x4f41d6(0x4e9)]=_0x27574d[_0x4f41d6(0x31e)],this[_0x4f41d6(0x7a4)]=_0x27574d['_x'],this[_0x4f41d6(0x342)]=_0x27574d['_y'];const _0x486a3e=ColorManager[_0x4f41d6(0x810)]();this[_0x4f41d6(0x74d)]['fillRect'](0x0,0x0,this['innerWidth'],this[_0x4f41d6(0x288)],_0x486a3e);const _0xf75739=_0x4f41d6(0x847)[_0x4f41d6(0x543)](_0x27574d[_0x4f41d6(0x31e)]===0x0?_0x4f41d6(0x600):_0x4f41d6(0x5b9)),_0x396696=_0x4f41d6(0x978)[_0x4f41d6(0x543)](_0x27574d['_x']),_0x5eb51d=_0x4f41d6(0x449)[_0x4f41d6(0x543)](_0x27574d['_y']),_0xb329f7=_0x4f41d6(0x8b3)[_0x4f41d6(0x543)](TextManager[_0x4f41d6(0x5e6)](_0x4f41d6(0x9d7)));let _0x2f5a7d=Math[_0x4f41d6(0xa14)](this['innerWidth']/0x4);this[_0x4f41d6(0x256)](_0xf75739,_0x2f5a7d*0x0,0x0,_0x2f5a7d),this[_0x4f41d6(0x256)](_0x396696,_0x2f5a7d*0x1,0x0,_0x2f5a7d,'center'),this[_0x4f41d6(0x256)](_0x5eb51d,_0x2f5a7d*0x2,0x0,_0x2f5a7d,'center');const _0x4a1355=this[_0x4f41d6(0x38f)](_0xb329f7)[_0x4f41d6(0x29a)],_0x5ebec4=this['innerWidth']-_0x4a1355;this[_0x4f41d6(0x4e3)](_0xb329f7,_0x5ebec4,0x0,_0x4a1355);},VisuMZ[_0x4535e7(0x77a)]=function(_0x3632f0){const _0x463049=_0x4535e7;if(Utils['isOptionValid'](_0x463049(0x94c))){var _0x3f407a=require('nw.gui')[_0x463049(0x70c)][_0x463049(0x5f4)]();SceneManager[_0x463049(0x42b)]();if(_0x3632f0)setTimeout(_0x3f407a[_0x463049(0x279)]['bind'](_0x3f407a),0x190);}},VisuMZ['ApplyEasing']=function(_0x5477eb,_0x5bc468){const _0x101590=_0x4535e7;_0x5bc468=_0x5bc468[_0x101590(0x874)]();var _0xe593f=1.70158,_0x23faf8=0.7;switch(_0x5bc468){case _0x101590(0x2c7):return _0x5477eb;case _0x101590(0x7c6):return-0x1*Math[_0x101590(0x620)](_0x5477eb*(Math['PI']/0x2))+0x1;case _0x101590(0xa1c):return Math['sin'](_0x5477eb*(Math['PI']/0x2));case _0x101590(0x14f):return-0.5*(Math['cos'](Math['PI']*_0x5477eb)-0x1);case'INQUAD':return _0x5477eb*_0x5477eb;case _0x101590(0x9a4):return _0x5477eb*(0x2-_0x5477eb);case _0x101590(0x48e):return _0x5477eb<0.5?0x2*_0x5477eb*_0x5477eb:-0x1+(0x4-0x2*_0x5477eb)*_0x5477eb;case _0x101590(0x866):return _0x5477eb*_0x5477eb*_0x5477eb;case _0x101590(0x151):var _0x45469b=_0x5477eb-0x1;return _0x45469b*_0x45469b*_0x45469b+0x1;case _0x101590(0x6b5):return _0x5477eb<0.5?0x4*_0x5477eb*_0x5477eb*_0x5477eb:(_0x5477eb-0x1)*(0x2*_0x5477eb-0x2)*(0x2*_0x5477eb-0x2)+0x1;case _0x101590(0x4c8):return _0x5477eb*_0x5477eb*_0x5477eb*_0x5477eb;case'OUTQUART':var _0x45469b=_0x5477eb-0x1;return 0x1-_0x45469b*_0x45469b*_0x45469b*_0x45469b;case _0x101590(0x639):var _0x45469b=_0x5477eb-0x1;return _0x5477eb<0.5?0x8*_0x5477eb*_0x5477eb*_0x5477eb*_0x5477eb:0x1-0x8*_0x45469b*_0x45469b*_0x45469b*_0x45469b;case _0x101590(0x536):return _0x5477eb*_0x5477eb*_0x5477eb*_0x5477eb*_0x5477eb;case _0x101590(0x260):var _0x45469b=_0x5477eb-0x1;return 0x1+_0x45469b*_0x45469b*_0x45469b*_0x45469b*_0x45469b;case _0x101590(0x3f5):var _0x45469b=_0x5477eb-0x1;return _0x5477eb<0.5?0x10*_0x5477eb*_0x5477eb*_0x5477eb*_0x5477eb*_0x5477eb:0x1+0x10*_0x45469b*_0x45469b*_0x45469b*_0x45469b*_0x45469b;case'INEXPO':if(_0x5477eb===0x0){if(_0x101590(0x4cd)===_0x101590(0x4cd))return 0x0;else _0x2bd1f1=_0x6f3521['boxHeight']-_0x2fcb05;}return Math[_0x101590(0x29e)](0x2,0xa*(_0x5477eb-0x1));case _0x101590(0x2f2):if(_0x5477eb===0x1){if('gkRfF'!==_0x101590(0x34c))this[_0x101590(0x2d8)]()&&this[_0x101590(0x6cd)](),_0x3dfd8c[_0x101590(0x7ac)][_0x101590(0x3aa)][_0x101590(0x77f)](this);else return 0x1;}return-Math['pow'](0x2,-0xa*_0x5477eb)+0x1;case _0x101590(0x44a):if(_0x5477eb===0x0||_0x5477eb===0x1)return _0x5477eb;var _0x20732f=_0x5477eb*0x2,_0x5bb472=_0x20732f-0x1;if(_0x20732f<0x1)return 0.5*Math[_0x101590(0x29e)](0x2,0xa*_0x5bb472);return 0.5*(-Math[_0x101590(0x29e)](0x2,-0xa*_0x5bb472)+0x2);case _0x101590(0x782):var _0x20732f=_0x5477eb/0x1;return-0x1*(Math[_0x101590(0x192)](0x1-_0x20732f*_0x5477eb)-0x1);case _0x101590(0x2a6):var _0x45469b=_0x5477eb-0x1;return Math[_0x101590(0x192)](0x1-_0x45469b*_0x45469b);case'INOUTCIRC':var _0x20732f=_0x5477eb*0x2,_0x5bb472=_0x20732f-0x2;if(_0x20732f<0x1){if(_0x101590(0x75d)==='ELKqw'){const _0x23dbb0=_0x101590(0x2c8)[_0x101590(0x543)](_0x59f1c6[_0x101590(0x4ee)](0x3)),_0x3b7cbe=new _0x150aed(),_0x38377b=_0x101590(0x5d0)+_0x23dbb0;_0x3b7cbe[_0x101590(0x538)](_0x101590(0x8d6),_0x38377b),_0x3b7cbe[_0x101590(0x8c4)](_0x101590(0x5b1)),_0x3b7cbe['onload']=()=>this[_0x101590(0x83c)](_0x3b7cbe,_0x3f5467,_0x23dbb0,_0x38377b),_0x3b7cbe[_0x101590(0x94b)]=()=>_0x18b6ed['onXhrError']('$dataMap',_0x23dbb0,_0x38377b),_0x3b7cbe[_0x101590(0x5fc)]();}else return-0.5*(Math[_0x101590(0x192)](0x1-_0x20732f*_0x20732f)-0x1);}return 0.5*(Math[_0x101590(0x192)](0x1-_0x5bb472*_0x5bb472)+0x1);case'INBACK':return _0x5477eb*_0x5477eb*((_0xe593f+0x1)*_0x5477eb-_0xe593f);case'OUTBACK':var _0x20732f=_0x5477eb/0x1-0x1;return _0x20732f*_0x20732f*((_0xe593f+0x1)*_0x20732f+_0xe593f)+0x1;break;case _0x101590(0x38c):var _0x20732f=_0x5477eb*0x2,_0x1b3199=_0x20732f-0x2,_0x45544c=_0xe593f*1.525;if(_0x20732f<0x1)return 0.5*_0x20732f*_0x20732f*((_0x45544c+0x1)*_0x20732f-_0x45544c);return 0.5*(_0x1b3199*_0x1b3199*((_0x45544c+0x1)*_0x1b3199+_0x45544c)+0x2);case _0x101590(0x513):if(_0x5477eb===0x0||_0x5477eb===0x1){if(_0x101590(0x486)===_0x101590(0x8f7))this[_0x101590(0x793)]();else return _0x5477eb;}var _0x20732f=_0x5477eb/0x1,_0x5bb472=_0x20732f-0x1,_0x1d5ea9=0x1-_0x23faf8,_0x45544c=_0x1d5ea9/(0x2*Math['PI'])*Math[_0x101590(0x581)](0x1);return-(Math[_0x101590(0x29e)](0x2,0xa*_0x5bb472)*Math[_0x101590(0x309)]((_0x5bb472-_0x45544c)*(0x2*Math['PI'])/_0x1d5ea9));case _0x101590(0x774):var _0x1d5ea9=0x1-_0x23faf8,_0x20732f=_0x5477eb*0x2;if(_0x5477eb===0x0||_0x5477eb===0x1)return _0x5477eb;var _0x45544c=_0x1d5ea9/(0x2*Math['PI'])*Math['asin'](0x1);return Math[_0x101590(0x29e)](0x2,-0xa*_0x20732f)*Math[_0x101590(0x309)]((_0x20732f-_0x45544c)*(0x2*Math['PI'])/_0x1d5ea9)+0x1;case _0x101590(0x18a):var _0x1d5ea9=0x1-_0x23faf8;if(_0x5477eb===0x0||_0x5477eb===0x1)return _0x5477eb;var _0x20732f=_0x5477eb*0x2,_0x5bb472=_0x20732f-0x1,_0x45544c=_0x1d5ea9/(0x2*Math['PI'])*Math[_0x101590(0x581)](0x1);if(_0x20732f<0x1){if(_0x101590(0x400)===_0x101590(0x400))return-0.5*(Math[_0x101590(0x29e)](0x2,0xa*_0x5bb472)*Math[_0x101590(0x309)]((_0x5bb472-_0x45544c)*(0x2*Math['PI'])/_0x1d5ea9));else{const _0x381acb=_0x2790f8[_0x101590(0x76c)]();if(_0x381acb)for(const _0x578bf9 of _0x381acb){if(_0x578bf9&&_0x578bf9[_0x101590(0x6c6)]){if(this[_0x101590(0x316)](_0x578bf9))return!![];if(this['isGamepadAxisMoved'](_0x578bf9))return!![];}}}}return Math[_0x101590(0x29e)](0x2,-0xa*_0x5bb472)*Math[_0x101590(0x309)]((_0x5bb472-_0x45544c)*(0x2*Math['PI'])/_0x1d5ea9)*0.5+0x1;case _0x101590(0x15d):var _0x20732f=_0x5477eb/0x1;if(_0x20732f<0x1/2.75)return 7.5625*_0x20732f*_0x20732f;else{if(_0x20732f<0x2/2.75){var _0x1b3199=_0x20732f-1.5/2.75;return 7.5625*_0x1b3199*_0x1b3199+0.75;}else{if(_0x20732f<2.5/2.75){var _0x1b3199=_0x20732f-2.25/2.75;return 7.5625*_0x1b3199*_0x1b3199+0.9375;}else{if(_0x101590(0x892)===_0x101590(0x892)){var _0x1b3199=_0x20732f-2.625/2.75;return 7.5625*_0x1b3199*_0x1b3199+0.984375;}else this['drawText'](_0xf7b6b[_0x101590(0x7ac)][_0x101590(0x806)][_0x101590(0x699)]['GoldOverlap'],_0x306a24['x'],_0x38c478['y'],_0x3a56cc[_0x101590(0x29a)],_0x101590(0x7ae));}}}case _0x101590(0x4ff):var _0x498598=0x1-VisuMZ[_0x101590(0x7e7)](0x1-_0x5477eb,'outbounce');return _0x498598;case'INOUTBOUNCE':if(_0x5477eb<0.5)var _0x498598=VisuMZ['ApplyEasing'](_0x5477eb*0x2,'inbounce')*0.5;else var _0x498598=VisuMZ['ApplyEasing'](_0x5477eb*0x2-0x1,_0x101590(0x6a6))*0.5+0.5;return _0x498598;default:return _0x5477eb;}},VisuMZ[_0x4535e7(0x612)]=function(_0x5c9731){const _0x1e358f=_0x4535e7;_0x5c9731=String(_0x5c9731)[_0x1e358f(0x874)]();const _0x4c4835=VisuMZ['CoreEngine'][_0x1e358f(0x806)][_0x1e358f(0x432)];if(_0x5c9731===_0x1e358f(0x627))return _0x4c4835[_0x1e358f(0x63f)];if(_0x5c9731==='MAXMP')return _0x4c4835[_0x1e358f(0x2d3)];if(_0x5c9731===_0x1e358f(0x57d))return _0x4c4835[_0x1e358f(0xa12)];if(_0x5c9731===_0x1e358f(0x6bd))return _0x4c4835[_0x1e358f(0x72e)];if(_0x5c9731==='MAT')return _0x4c4835[_0x1e358f(0x533)];if(_0x5c9731===_0x1e358f(0x3c6))return _0x4c4835['IconParam5'];if(_0x5c9731===_0x1e358f(0x844))return _0x4c4835[_0x1e358f(0x171)];if(_0x5c9731===_0x1e358f(0x339))return _0x4c4835[_0x1e358f(0x8f3)];if(_0x5c9731===_0x1e358f(0x42e))return _0x4c4835['IconXParam0'];if(_0x5c9731===_0x1e358f(0x7dc))return _0x4c4835[_0x1e358f(0x72d)];if(_0x5c9731===_0x1e358f(0x914))return _0x4c4835[_0x1e358f(0x41b)];if(_0x5c9731===_0x1e358f(0x155))return _0x4c4835[_0x1e358f(0x6ba)];if(_0x5c9731===_0x1e358f(0x41d))return _0x4c4835[_0x1e358f(0x934)];if(_0x5c9731===_0x1e358f(0x7bc))return _0x4c4835['IconXParam5'];if(_0x5c9731==='CNT')return _0x4c4835[_0x1e358f(0x2ff)];if(_0x5c9731===_0x1e358f(0x77d))return _0x4c4835['IconXParam7'];if(_0x5c9731===_0x1e358f(0x87a))return _0x4c4835[_0x1e358f(0x17f)];if(_0x5c9731===_0x1e358f(0x585))return _0x4c4835['IconXParam9'];if(_0x5c9731===_0x1e358f(0x298))return _0x4c4835['IconSParam0'];if(_0x5c9731===_0x1e358f(0x4d6))return _0x4c4835['IconSParam1'];if(_0x5c9731===_0x1e358f(0x20e))return _0x4c4835[_0x1e358f(0x65a)];if(_0x5c9731===_0x1e358f(0x2e8))return _0x4c4835[_0x1e358f(0x788)];if(_0x5c9731===_0x1e358f(0x5ec))return _0x4c4835[_0x1e358f(0x649)];if(_0x5c9731===_0x1e358f(0x26c))return _0x4c4835['IconSParam5'];if(_0x5c9731===_0x1e358f(0x5a4))return _0x4c4835[_0x1e358f(0x529)];if(_0x5c9731===_0x1e358f(0x1e0))return _0x4c4835['IconSParam7'];if(_0x5c9731===_0x1e358f(0x4bd))return _0x4c4835['IconSParam8'];if(_0x5c9731===_0x1e358f(0x25f))return _0x4c4835['IconSParam9'];if(VisuMZ[_0x1e358f(0x7ac)]['CustomParamIcons'][_0x5c9731]){if(_0x1e358f(0x7a7)!=='KtwZG'){this[_0x1e358f(0x74d)][_0x1e358f(0x393)]();const _0xf4f39=_0x25da18['_pictureCoordinatesMode'],_0x36a13f=_0x2fb900[_0x1e358f(0x8ee)](_0xf4f39);if(!_0x36a13f)return;this[_0x1e358f(0x4e9)]=_0x36a13f[_0x1e358f(0x31e)],this['_lastX']=_0x36a13f['_x'],this[_0x1e358f(0x342)]=_0x36a13f['_y'];const _0x4a4c7b=_0x30a95b[_0x1e358f(0x810)]();this['contents'][_0x1e358f(0x82c)](0x0,0x0,this[_0x1e358f(0x83e)],this[_0x1e358f(0x288)],_0x4a4c7b);const _0x29e896=_0x1e358f(0x847)['format'](_0x36a13f['_origin']===0x0?_0x1e358f(0x600):'Center'),_0x2ef6cd=_0x1e358f(0x978)[_0x1e358f(0x543)](_0x36a13f['_x']),_0x2b8728='Y:\x20%1'[_0x1e358f(0x543)](_0x36a13f['_y']),_0x302c4b='%1:\x20Exit\x20'[_0x1e358f(0x543)](_0x515286[_0x1e358f(0x5e6)](_0x1e358f(0x9d7)));let _0x57c6ae=_0x16370d[_0x1e358f(0xa14)](this[_0x1e358f(0x83e)]/0x4);this[_0x1e358f(0x256)](_0x29e896,_0x57c6ae*0x0,0x0,_0x57c6ae),this['drawText'](_0x2ef6cd,_0x57c6ae*0x1,0x0,_0x57c6ae,_0x1e358f(0x9a0)),this[_0x1e358f(0x256)](_0x2b8728,_0x57c6ae*0x2,0x0,_0x57c6ae,'center');const _0x2f8472=this['textSizeEx'](_0x302c4b)[_0x1e358f(0x29a)],_0xd54a3e=this['innerWidth']-_0x2f8472;this['drawTextEx'](_0x302c4b,_0xd54a3e,0x0,_0x2f8472);}else return VisuMZ['CoreEngine'][_0x1e358f(0x746)][_0x5c9731]||0x0;}return 0x0;},VisuMZ[_0x4535e7(0x527)]=function(_0x212432,_0x4eaeb9,_0x1d5146){const _0x2dd8d7=_0x4535e7;if(_0x1d5146===undefined&&_0x212432%0x1===0x0)return _0x212432;if(_0x1d5146!==undefined&&[_0x2dd8d7(0x627),'MAXMP',_0x2dd8d7(0x57d),_0x2dd8d7(0x6bd),_0x2dd8d7(0x972),'MDF',_0x2dd8d7(0x844),_0x2dd8d7(0x339)][_0x2dd8d7(0x454)](String(_0x1d5146)[_0x2dd8d7(0x874)]()['trim']()))return _0x212432;_0x4eaeb9=_0x4eaeb9||0x0;if(VisuMZ[_0x2dd8d7(0x7ac)]['CustomParamAbb'][_0x1d5146]){if(_0x2dd8d7(0x251)===_0x2dd8d7(0x14c)){var _0x1e0961=_0x24a244(_0x3e1069['$1'])/0x64;_0x5828f7+=_0x1e0961;}else{if(VisuMZ[_0x2dd8d7(0x7ac)][_0x2dd8d7(0x947)][_0x1d5146]===_0x2dd8d7(0x578))return _0x212432;else{if(_0x2dd8d7(0x4b1)===_0x2dd8d7(0x4b1))return String((_0x212432*0x64)['toFixed'](_0x4eaeb9))+'%';else{_0x1cb8f8['ConvertParams'](_0x1e5252,_0x5702a8);const _0x160ccd=_0x263386[_0x2dd8d7(0x98a)](_0x3d8499[_0x2dd8d7(0x1e3)])['clamp'](0x0,0x64),_0x16dd07=_0x301253['_currentBgm'];_0x16dd07&&(_0x16dd07['volume']=_0x160ccd,_0x16dd07['pos']=_0x1c7546['_bgmBuffer'][_0x2dd8d7(0x47f)](),_0x24b63b[_0x2dd8d7(0x522)](_0x16dd07),_0x2bb8d6[_0x2dd8d7(0x79e)](_0x16dd07,_0x16dd07['pos']),_0x291fb4['_bgmBuffer'][_0x2dd8d7(0x619)](_0x16dd07[_0x2dd8d7(0x68d)]));}}}}return String((_0x212432*0x64)[_0x2dd8d7(0x20d)](_0x4eaeb9))+'%';},VisuMZ[_0x4535e7(0x677)]=function(_0x8be45){const _0x50750a=_0x4535e7;_0x8be45=String(_0x8be45);if(!_0x8be45)return _0x8be45;if(typeof _0x8be45!==_0x50750a(0x480))return _0x8be45;const _0x4a2e8e=VisuMZ[_0x50750a(0x7ac)]['Settings']['QoL'][_0x50750a(0x8b5)]||'en-US',_0x3b8cd1={'maximumFractionDigits':0x6};_0x8be45=_0x8be45['replace'](/\[(.*?)\]/g,(_0x2f4ab9,_0x525238)=>{const _0x2a2638=_0x50750a;if('Zplyj'===_0x2a2638(0x5c6))return VisuMZ[_0x2a2638(0x282)](_0x525238,'[',']');else this[_0x2a2638(0x48f)](_0x25ff32);}),_0x8be45=_0x8be45[_0x50750a(0x664)](/<(.*?)>/g,(_0x30c5aa,_0x49abc2)=>{const _0x572cfd=_0x50750a;if(_0x572cfd(0x4f7)!=='OLeRN')return VisuMZ[_0x572cfd(0x282)](_0x49abc2,'<','>');else{_0x14366d['CoreEngine'][_0x572cfd(0xa0c)][_0x572cfd(0x77f)](this);if(!_0x5c1cb8[_0x572cfd(0x75f)])return;const _0x3f1da7=this[_0x572cfd(0x170)];if(!_0x3f1da7)return;this[_0x572cfd(0x88c)]=_0x3f1da7[_0x572cfd(0x88c)];if(!this[_0x572cfd(0x88c)])return;this['addChild'](this[_0x572cfd(0x88c)]);}}),_0x8be45=_0x8be45[_0x50750a(0x664)](/\{\{(.*?)\}\}/g,(_0x19b9dd,_0x4d8f8e)=>{return VisuMZ['PreserveNumbers'](_0x4d8f8e,'','');}),_0x8be45=_0x8be45[_0x50750a(0x664)](/(\d+\.?\d*)/g,(_0x5128cc,_0x56cdab)=>{const _0x3f7d58=_0x50750a;if(_0x3f7d58(0x237)!=='aLMEi'){let _0x37f0b6=_0x56cdab;if(_0x37f0b6[0x0]==='0')return _0x37f0b6;if(_0x37f0b6[_0x37f0b6['length']-0x1]==='.')return Number(_0x37f0b6)[_0x3f7d58(0x3fa)](_0x4a2e8e,_0x3b8cd1)+'.';else return _0x37f0b6[_0x37f0b6[_0x3f7d58(0x2ec)]-0x1]===','?Number(_0x37f0b6)[_0x3f7d58(0x3fa)](_0x4a2e8e,_0x3b8cd1)+',':Number(_0x37f0b6)['toLocaleString'](_0x4a2e8e,_0x3b8cd1);}else return this[_0x3f7d58(0x182)];});let _0x10ff74=0x3;while(_0x10ff74--){_0x50750a(0x384)!=='CMHRu'?this[_0x50750a(0x532)]():_0x8be45=VisuMZ['RevertPreserveNumbers'](_0x8be45);}return _0x8be45;},VisuMZ[_0x4535e7(0x282)]=function(_0x538825,_0x3a7fa6,_0x4f5781){const _0x110f34=_0x4535e7;return _0x538825=_0x538825[_0x110f34(0x664)](/(\d)/gi,(_0x459538,_0x5f22aa)=>'PRESERVCONVERSION(%1)'['format'](Number(_0x5f22aa))),_0x110f34(0x58f)['format'](_0x538825,_0x3a7fa6,_0x4f5781);},VisuMZ[_0x4535e7(0x168)]=function(_0x3aff03){const _0x1f9890=_0x4535e7;return _0x3aff03=_0x3aff03[_0x1f9890(0x664)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x3e325a,_0x257373)=>Number(parseInt(_0x257373))),_0x3aff03;},VisuMZ['openURL']=function(_0xd2bd1){const _0x8d2b3c=_0x4535e7;SoundManager['playOk']();if(!Utils['isNwjs']()){if(_0x8d2b3c(0x714)!==_0x8d2b3c(0x714)){_0x3c8bea[_0x8d2b3c(0x7ac)]['Input_update'][_0x8d2b3c(0x77f)](this);if(this[_0x8d2b3c(0x5db)])this[_0x8d2b3c(0x5db)]--;}else{const _0x1f1c6f=window['open'](_0xd2bd1,_0x8d2b3c(0x667));}}else{const _0x2085e4=process['platform']=='darwin'?_0x8d2b3c(0x538):process[_0x8d2b3c(0x845)]==_0x8d2b3c(0x525)?_0x8d2b3c(0x4c6):'xdg-open';require(_0x8d2b3c(0x363))[_0x8d2b3c(0x68a)](_0x2085e4+'\x20'+_0xd2bd1);}},VisuMZ[_0x4535e7(0x930)]=function(_0xbe8436,_0x4a341e){const _0x167d65=_0x4535e7;if(!_0xbe8436)return'';const _0x1835ab=_0xbe8436[_0x167d65(0x75a)]||_0xbe8436['id'];let _0x3a3368='';return _0xbe8436['initialLevel']!==undefined&&_0xbe8436[_0x167d65(0x63d)]!==undefined&&(_0x3a3368=_0x167d65(0x240)[_0x167d65(0x543)](_0x1835ab,_0x4a341e)),_0xbe8436[_0x167d65(0x40a)]!==undefined&&_0xbe8436[_0x167d65(0x32f)]!==undefined&&(_0x3a3368=_0x167d65(0x499)[_0x167d65(0x543)](_0x1835ab,_0x4a341e)),_0xbe8436[_0x167d65(0x868)]!==undefined&&_0xbe8436[_0x167d65(0x7f8)]!==undefined&&(_0x3a3368=_0x167d65(0x6f4)[_0x167d65(0x543)](_0x1835ab,_0x4a341e)),_0xbe8436[_0x167d65(0x528)]!==undefined&&_0xbe8436['consumable']!==undefined&&(_0x3a3368=_0x167d65(0x6e8)[_0x167d65(0x543)](_0x1835ab,_0x4a341e)),_0xbe8436[_0x167d65(0x66a)]!==undefined&&_0xbe8436[_0x167d65(0x24f)]===0x1&&(_0x3a3368='Weapon-%1-%2'[_0x167d65(0x543)](_0x1835ab,_0x4a341e)),_0xbe8436[_0x167d65(0x595)]!==undefined&&_0xbe8436['etypeId']>0x1&&(_0x3a3368=_0x167d65(0x986)[_0x167d65(0x543)](_0x1835ab,_0x4a341e)),_0xbe8436[_0x167d65(0x1d3)]!==undefined&&_0xbe8436[_0x167d65(0x8c3)]!==undefined&&(_0x3a3368=_0x167d65(0x88a)[_0x167d65(0x543)](_0x1835ab,_0x4a341e)),_0xbe8436['autoRemovalTiming']!==undefined&&_0xbe8436[_0x167d65(0x812)]!==undefined&&(_0x3a3368=_0x167d65(0x245)[_0x167d65(0x543)](_0x1835ab,_0x4a341e)),_0x3a3368;},Game_Picture['prototype'][_0x4535e7(0x43a)]=function(){const _0x419376=_0x4535e7;return this[_0x419376(0x4a8)];},VisuMZ[_0x4535e7(0x7ac)]['Game_Picture_initBasic']=Game_Picture[_0x4535e7(0x781)]['initBasic'],Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x559)]=function(){const _0x3af5fc=_0x4535e7;VisuMZ[_0x3af5fc(0x7ac)][_0x3af5fc(0x1c7)][_0x3af5fc(0x77f)](this),this['_anchor']={'x':0x0,'y':0x0},this[_0x3af5fc(0x8d8)]={'x':0x0,'y':0x0};},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x921)]=Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x7fb)],Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x7fb)]=function(){const _0x14b453=_0x4535e7;this[_0x14b453(0x7b0)]();const _0x5ef8d2=this[_0x14b453(0x81f)];VisuMZ[_0x14b453(0x7ac)][_0x14b453(0x921)][_0x14b453(0x77f)](this),_0x5ef8d2>0x0&&this[_0x14b453(0x81f)]<=0x0&&(this['_x']=this['_targetX'],this['_y']=this[_0x14b453(0x69f)],this[_0x14b453(0x9f5)]=this[_0x14b453(0xa17)],this[_0x14b453(0x786)]=this[_0x14b453(0x7d6)],this['_opacity']=this[_0x14b453(0x28d)],this[_0x14b453(0x4a8)]&&(this[_0x14b453(0x4a8)]['x']=this[_0x14b453(0x8d8)]['x'],this[_0x14b453(0x4a8)]['y']=this['_targetAnchor']['y']));},VisuMZ['CoreEngine'][_0x4535e7(0x550)]=Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x25a)],Game_Picture['prototype']['show']=function(_0x14a18e,_0x2513f0,_0xc14dfc,_0x5a20bc,_0x6b8869,_0x41851a,_0x3c4c09,_0x4fd002){const _0x1197e7=_0x4535e7;VisuMZ['CoreEngine'][_0x1197e7(0x550)][_0x1197e7(0x77f)](this,_0x14a18e,_0x2513f0,_0xc14dfc,_0x5a20bc,_0x6b8869,_0x41851a,_0x3c4c09,_0x4fd002),this[_0x1197e7(0x60a)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x2513f0]||{'x':0x0,'y':0x0});},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x59e)]=Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x582)],Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x582)]=function(_0x1a9005,_0x255418,_0x434cfd,_0x4b23cc,_0x33c8c7,_0x2445fc,_0xf409e,_0x2896ff,_0x17c78a){const _0xb73916=_0x4535e7;VisuMZ[_0xb73916(0x7ac)][_0xb73916(0x59e)]['call'](this,_0x1a9005,_0x255418,_0x434cfd,_0x4b23cc,_0x33c8c7,_0x2445fc,_0xf409e,_0x2896ff,_0x17c78a),this['setTargetAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x1a9005]||{'x':0x0,'y':0x0});},Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x7b0)]=function(){const _0x883eaa=_0x4535e7;if(this[_0x883eaa(0x81f)]>0x0){if(_0x883eaa(0xa06)!==_0x883eaa(0xa06))return this['_sideButtonLayout'];else this[_0x883eaa(0x4a8)]['x']=this[_0x883eaa(0x8a4)](this[_0x883eaa(0x4a8)]['x'],this[_0x883eaa(0x8d8)]['x']),this['_anchor']['y']=this[_0x883eaa(0x8a4)](this[_0x883eaa(0x4a8)]['y'],this[_0x883eaa(0x8d8)]['y']);}},Game_Picture[_0x4535e7(0x781)][_0x4535e7(0x60a)]=function(_0x50087b){const _0x1ff3fe=_0x4535e7;this[_0x1ff3fe(0x4a8)]=_0x50087b,this[_0x1ff3fe(0x8d8)]=JsonEx[_0x1ff3fe(0x707)](this[_0x1ff3fe(0x4a8)]);},Game_Picture[_0x4535e7(0x781)]['setTargetAnchor']=function(_0x24a88a){const _0x2bc7e6=_0x4535e7;this[_0x2bc7e6(0x8d8)]=_0x24a88a;},VisuMZ[_0x4535e7(0x7ac)]['Sprite_Picture_updateOrigin']=Sprite_Picture[_0x4535e7(0x781)][_0x4535e7(0x887)],Sprite_Picture[_0x4535e7(0x781)][_0x4535e7(0x887)]=function(){const _0x3dd176=_0x4535e7,_0x46d25d=this[_0x3dd176(0x8ee)]();!_0x46d25d[_0x3dd176(0x43a)]()?VisuMZ['CoreEngine'][_0x3dd176(0x778)][_0x3dd176(0x77f)](this):(this[_0x3dd176(0x43a)]['x']=_0x46d25d[_0x3dd176(0x43a)]()['x'],this[_0x3dd176(0x43a)]['y']=_0x46d25d['anchor']()['y']);},Game_Action[_0x4535e7(0x781)][_0x4535e7(0x3ff)]=function(_0x17f4f1){const _0x2d4739=_0x4535e7;if(_0x17f4f1){if('cWCZm'===_0x2d4739(0x5e7)){const _0x3eb524=_0x17f4f1[_0x2d4739(0x979)];if(_0x3eb524===0x1&&this[_0x2d4739(0x854)]()[_0x2d4739(0x694)]()!==0x1)this['setAttack']();else _0x3eb524===0x2&&this[_0x2d4739(0x854)]()[_0x2d4739(0x752)]()!==0x2?this[_0x2d4739(0x576)]():this['setSkill'](_0x3eb524);}else{if(!_0x30e421[_0x2d4739(0x18e)]())return;if(!_0x3c1899[_0x2d4739(0x3e2)]())return;_0x27fe4c['_scene']['_active']=![],_0x2908b5['CoreEngine']['ExportStrFromAllTroops']();}}else this[_0x2d4739(0x393)]();},Game_Actor[_0x4535e7(0x781)][_0x4535e7(0x61b)]=function(){const _0x4d15e0=_0x4535e7;return this[_0x4d15e0(0x579)]()[_0x4d15e0(0x184)](_0x2ff277=>this[_0x4d15e0(0x4b2)](_0x2ff277)&&this[_0x4d15e0(0xa08)]()[_0x4d15e0(0x454)](_0x2ff277[_0x4d15e0(0x868)]));},Window_Base['prototype']['createDimmerSprite']=function(){const _0xbc38cf=_0x4535e7;this[_0xbc38cf(0x3db)]=new Sprite(),this[_0xbc38cf(0x3db)][_0xbc38cf(0x7c5)]=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0xbc38cf(0x2cd)](this[_0xbc38cf(0x3db)]);},Window_Base[_0x4535e7(0x781)][_0x4535e7(0x1fb)]=function(){const _0x2cc038=_0x4535e7;if(this['_dimmerSprite']){if(_0x2cc038(0x479)===_0x2cc038(0x479)){const _0x3fbd85=this['_dimmerSprite'][_0x2cc038(0x7c5)],_0x3e4d3b=this['width'],_0x3d0e00=this[_0x2cc038(0x1ad)],_0x13cb1f=this[_0x2cc038(0x86a)],_0xec852d=ColorManager[_0x2cc038(0x3f1)](),_0x5c6392=ColorManager['dimColor2']();_0x3fbd85[_0x2cc038(0x352)](_0x3e4d3b,_0x3d0e00),_0x3fbd85[_0x2cc038(0x589)](0x0,0x0,_0x3e4d3b,_0x13cb1f,_0x5c6392,_0xec852d,!![]),_0x3fbd85[_0x2cc038(0x82c)](0x0,_0x13cb1f,_0x3e4d3b,_0x3d0e00-_0x13cb1f*0x2,_0xec852d),_0x3fbd85[_0x2cc038(0x589)](0x0,_0x3d0e00-_0x13cb1f,_0x3e4d3b,_0x13cb1f,_0xec852d,_0x5c6392,!![]),this[_0x2cc038(0x3db)][_0x2cc038(0x95a)](0x0,0x0,_0x3e4d3b,_0x3d0e00);}else{if(this['centerCameraCheckData']()[_0x2cc038(0x35f)]&&_0x49b96c[_0x2cc038(0x977)]()===0x1){this[_0x2cc038(0x2a4)]=this[_0x2cc038(0x2f9)]()[_0x2cc038(0x359)];return;}_0x138195[_0x2cc038(0x7ac)]['Game_Map_scrollUp'][_0x2cc038(0x77f)](this,_0x4877a2);}}},Game_Actor[_0x4535e7(0x781)]['makeAutoBattleActions']=function(){const _0x5281c1=_0x4535e7;for(let _0x1403d7=0x0;_0x1403d7<this[_0x5281c1(0x17e)]();_0x1403d7++){const _0x1bac58=this[_0x5281c1(0x9f7)]();let _0x37af1a=Number['MIN_SAFE_INTEGER'];this[_0x5281c1(0x308)](_0x1403d7,_0x1bac58[0x0]);for(const _0x2b0249 of _0x1bac58){const _0x3f60a4=_0x2b0249[_0x5281c1(0x796)]();_0x3f60a4>_0x37af1a&&(_0x37af1a=_0x3f60a4,this['setAction'](_0x1403d7,_0x2b0249));}}this[_0x5281c1(0x618)]('waiting');},Window_BattleItem['prototype'][_0x4535e7(0x44e)]=function(_0x17ab7a){const _0x9f8b6a=_0x4535e7;return BattleManager[_0x9f8b6a(0x2ea)]()?_0x9f8b6a(0x8bd)===_0x9f8b6a(0x8bd)?BattleManager[_0x9f8b6a(0x2ea)]()[_0x9f8b6a(0x4b2)](_0x17ab7a):this[_0x9f8b6a(0x7f4)]():Window_ItemList['prototype'][_0x9f8b6a(0x44e)]['call'](this,_0x17ab7a);},VisuMZ[_0x4535e7(0x7ac)]['Scene_Map_createSpritesetFix']=Scene_Map[_0x4535e7(0x781)][_0x4535e7(0x9e1)],Scene_Map[_0x4535e7(0x781)][_0x4535e7(0x9e1)]=function(){const _0x4b03e5=_0x4535e7;VisuMZ[_0x4b03e5(0x7ac)]['Scene_Map_createSpritesetFix'][_0x4b03e5(0x77f)](this);const _0x22fcf5=this[_0x4b03e5(0x170)]['_timerSprite'];if(_0x22fcf5)this[_0x4b03e5(0x379)](_0x22fcf5);},VisuMZ['CoreEngine'][_0x4535e7(0x730)]=Scene_Battle[_0x4535e7(0x781)]['createSpriteset'],Scene_Battle['prototype'][_0x4535e7(0x9e1)]=function(){const _0x5e787e=_0x4535e7;VisuMZ[_0x5e787e(0x7ac)][_0x5e787e(0x730)][_0x5e787e(0x77f)](this);const _0x3fcea5=this[_0x5e787e(0x170)][_0x5e787e(0xa32)];if(_0x3fcea5)this[_0x5e787e(0x379)](_0x3fcea5);},Sprite_Actor[_0x4535e7(0x781)][_0x4535e7(0x76e)]=function(){const _0x3975b4=_0x4535e7;Sprite_Battler[_0x3975b4(0x781)][_0x3975b4(0x76e)][_0x3975b4(0x77f)](this),this['updateShadow']();if(this[_0x3975b4(0x204)])this[_0x3975b4(0x7db)]();else this[_0x3975b4(0x91c)]!==''&&(this[_0x3975b4(0x91c)]='');},Window[_0x4535e7(0x781)][_0x4535e7(0x9b5)]=function(){const _0x5b06df=_0x4535e7,_0x4962b3=this[_0x5b06df(0x2e1)],_0x190f16=this[_0x5b06df(0x1e7)],_0x41b80e=0x18,_0x3137d2=_0x41b80e/0x2,_0xd0f5f7=0x60+_0x41b80e,_0x32f102=0x0+_0x41b80e;this[_0x5b06df(0x927)][_0x5b06df(0x7c5)]=this[_0x5b06df(0x19c)],this[_0x5b06df(0x927)][_0x5b06df(0x43a)]['x']=0.5,this[_0x5b06df(0x927)][_0x5b06df(0x43a)]['y']=0.5,this[_0x5b06df(0x927)]['setFrame'](_0xd0f5f7+_0x3137d2,_0x32f102+_0x3137d2+_0x41b80e,_0x41b80e,_0x3137d2),this[_0x5b06df(0x927)][_0x5b06df(0x582)](Math['round'](_0x4962b3/0x2),Math['round'](_0x190f16-_0x3137d2)),this[_0x5b06df(0x940)][_0x5b06df(0x7c5)]=this[_0x5b06df(0x19c)],this[_0x5b06df(0x940)]['anchor']['x']=0.5,this['_upArrowSprite'][_0x5b06df(0x43a)]['y']=0.5,this[_0x5b06df(0x940)][_0x5b06df(0x95a)](_0xd0f5f7+_0x3137d2,_0x32f102,_0x41b80e,_0x3137d2),this[_0x5b06df(0x940)]['move'](Math['round'](_0x4962b3/0x2),Math[_0x5b06df(0x98a)](_0x3137d2));},Window['prototype'][_0x4535e7(0x6af)]=function(){const _0x14acf9=_0x4535e7,_0x12f368=0x90,_0x5c28bc=0x60,_0x558395=0x18;this['_pauseSignSprite']['bitmap']=this[_0x14acf9(0x19c)],this[_0x14acf9(0x670)][_0x14acf9(0x43a)]['x']=0.5,this[_0x14acf9(0x670)][_0x14acf9(0x43a)]['y']=0x1,this[_0x14acf9(0x670)][_0x14acf9(0x582)](Math['round'](this[_0x14acf9(0x2e1)]/0x2),this['_height']),this[_0x14acf9(0x670)][_0x14acf9(0x95a)](_0x12f368,_0x5c28bc,_0x558395,_0x558395),this[_0x14acf9(0x670)]['alpha']=0xff;},Window[_0x4535e7(0x781)][_0x4535e7(0x6f2)]=function(){const _0x5c8675=_0x4535e7,_0x55c569=this[_0x5c8675(0x293)][_0x5c8675(0x39d)][_0x5c8675(0x239)](new Point(0x0,0x0)),_0x303a0f=this['_clientArea'][_0x5c8675(0x903)];_0x303a0f['x']=_0x55c569['x']+this['origin']['x'],_0x303a0f['y']=_0x55c569['y']+this[_0x5c8675(0x1ed)]['y'],_0x303a0f[_0x5c8675(0x29a)]=Math[_0x5c8675(0x45a)](this[_0x5c8675(0x83e)]*this[_0x5c8675(0x150)]['x']),_0x303a0f[_0x5c8675(0x1ad)]=Math[_0x5c8675(0x45a)](this[_0x5c8675(0x288)]*this[_0x5c8675(0x150)]['y']);},Window[_0x4535e7(0x781)]['_refreshBack']=function(){const _0x28705c=_0x4535e7,_0x545aaf=this[_0x28705c(0x8a3)],_0x4556c5=Math[_0x28705c(0x548)](0x0,this[_0x28705c(0x2e1)]-_0x545aaf*0x2),_0x189d91=Math[_0x28705c(0x548)](0x0,this[_0x28705c(0x1e7)]-_0x545aaf*0x2),_0x5746d9=this[_0x28705c(0x28f)],_0x507131=_0x5746d9[_0x28705c(0x360)][0x0];_0x5746d9[_0x28705c(0x7c5)]=this[_0x28705c(0x19c)],_0x5746d9[_0x28705c(0x95a)](0x0,0x0,0x60,0x60),_0x5746d9[_0x28705c(0x582)](_0x545aaf,_0x545aaf),_0x5746d9[_0x28705c(0x150)]['x']=_0x4556c5/0x60,_0x5746d9[_0x28705c(0x150)]['y']=_0x189d91/0x60,_0x507131['bitmap']=this[_0x28705c(0x19c)],_0x507131[_0x28705c(0x95a)](0x0,0x60,0x60,0x60),_0x507131['move'](0x0,0x0,_0x4556c5,_0x189d91),_0x507131[_0x28705c(0x150)]['x']=0x1/_0x5746d9[_0x28705c(0x150)]['x'],_0x507131[_0x28705c(0x150)]['y']=0x1/_0x5746d9[_0x28705c(0x150)]['y'],_0x5746d9['setColorTone'](this[_0x28705c(0x25c)]);},Game_Temp['prototype'][_0x4535e7(0x8b7)]=function(){const _0x28f917=_0x4535e7;this[_0x28f917(0x211)]=[],this[_0x28f917(0x41c)]=[],this[_0x28f917(0x474)]=[],this[_0x28f917(0x3dc)]=[];},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x48b)]=Scene_Base[_0x4535e7(0x781)]['terminate'],Scene_Base['prototype'][_0x4535e7(0x56e)]=function(){const _0x1e791d=_0x4535e7;if($gameTemp)$gameTemp['sceneTerminationClearEffects']();VisuMZ[_0x1e791d(0x7ac)][_0x1e791d(0x48b)]['call'](this);},Bitmap[_0x4535e7(0x781)][_0x4535e7(0x14e)]=function(_0x1502ff){const _0x276010=_0x4535e7,_0x3fa245=this[_0x276010(0x332)];_0x3fa245[_0x276010(0x6fd)](),_0x3fa245[_0x276010(0x99d)]=this[_0x276010(0x679)]();const _0x53e56c=_0x3fa245[_0x276010(0x5cd)](_0x1502ff)['width'];return _0x3fa245['restore'](),_0x53e56c;},Window_Message[_0x4535e7(0x781)][_0x4535e7(0x4f0)]=function(_0x70691b){const _0x986927=_0x4535e7;return this[_0x986927(0x9a7)]()?_0x986927(0x4e7)==='CIJoi'?this[_0x986927(0x74d)][_0x986927(0x14e)](_0x70691b):this[_0x986927(0x4a7)]&&this[_0x986927(0x4a7)][_0x986927(0x755)]?_0x32dd29[_0x986927(0x9a5)]:'':Window_Base[_0x986927(0x781)][_0x986927(0x4f0)]['call'](this,_0x70691b);},Window_Message['prototype']['useFontWidthFix']=function(){const _0x32b805=_0x4535e7;return VisuMZ[_0x32b805(0x7ac)][_0x32b805(0x806)][_0x32b805(0x405)][_0x32b805(0x49e)]??!![];},VisuMZ[_0x4535e7(0x7ac)]['Game_Action_numRepeats']=Game_Action[_0x4535e7(0x781)][_0x4535e7(0x74f)],Game_Action[_0x4535e7(0x781)][_0x4535e7(0x74f)]=function(){const _0x5bbd69=_0x4535e7;if(this['item']()){if(_0x5bbd69(0x30b)===_0x5bbd69(0x734)){if(_0x1cba95[_0x5bbd69(0x258)])return;}else return VisuMZ[_0x5bbd69(0x7ac)]['Game_Action_numRepeats']['call'](this);}else return 0x0;},VisuMZ[_0x4535e7(0x7ac)][_0x4535e7(0x96e)]=Game_Action[_0x4535e7(0x781)][_0x4535e7(0x641)],Game_Action[_0x4535e7(0x781)][_0x4535e7(0x641)]=function(){const _0x562c46=_0x4535e7;this['subject']()&&this[_0x562c46(0x854)]()['canAttack']()?_0x562c46(0x90f)!==_0x562c46(0x3eb)?VisuMZ[_0x562c46(0x7ac)][_0x562c46(0x96e)]['call'](this):this['onInputBannedWords']():this['clear']();},Sprite_Name[_0x4535e7(0x781)][_0x4535e7(0x44f)]=function(){return 0x24;},Sprite_Name[_0x4535e7(0x781)][_0x4535e7(0x69d)]=function(){const _0x2f434d=_0x4535e7,_0x26ef2b=this[_0x2f434d(0x4e4)](),_0xcc0b1c=this[_0x2f434d(0x727)](),_0x1df2f1=this[_0x2f434d(0x44f)]();this[_0x2f434d(0x3a3)](),this[_0x2f434d(0x7c5)][_0x2f434d(0x393)](),this[_0x2f434d(0x7c5)]['drawTextTopAligned'](_0x26ef2b,0x4,0x0,_0xcc0b1c-0xa,_0x1df2f1,'left');},Bitmap['prototype'][_0x4535e7(0x3d1)]=function(_0x330c61,_0x20a4ca,_0x2c04f4,_0x171390,_0x2ebf1f,_0x1cd6a0){const _0x23d9f3=_0x4535e7,_0xc709be=this[_0x23d9f3(0x332)],_0x342730=_0xc709be[_0x23d9f3(0x67b)];_0x171390=_0x171390||0xffffffff;let _0x1b7e85=_0x20a4ca,_0x5e2d2a=Math[_0x23d9f3(0x98a)](_0x2c04f4+0x18/0x2+this[_0x23d9f3(0x855)]*0.35);_0x1cd6a0===_0x23d9f3(0x9a0)&&(_0x23d9f3(0x494)!=='TFfQM'?_0x1b7e85+=_0x171390/0x2:(_0xacfed4=_0x1990ea||_0x4d81ee[_0x23d9f3(0x50c)],_0x27e16c=_0x2c2259||_0x48a081[_0x23d9f3(0x368)],_0x5c629f=_0x1cf50a[_0x23d9f3(0x98a)](_0x4060e8),_0x38300e=_0x92e1d2['round'](_0x948660),_0x39ae23=_0x21173f[_0x23d9f3(0x98a)](_0x7adab0),_0x5e32aa=_0x465fed[_0x23d9f3(0x98a)](_0x6353cf),_0x238e35[_0x23d9f3(0x7ac)]['Window_Base_drawFace'][_0x23d9f3(0x77f)](this,_0x3b8592,_0x3e5c9c,_0x137412,_0x99804b,_0x2c35df,_0x278bdd)));if(_0x1cd6a0==='right'){if(_0x23d9f3(0x56a)===_0x23d9f3(0x56a))_0x1b7e85+=_0x171390;else{if(_0x4c67da[_0x23d9f3(0x2ec)]>0x0)_0xaa30f8+=_0x1dbc61+_0x23d9f3(0x1d5);else{const _0x199c47=_0xbdd2b6[_0x30e66a]['name'];_0x1a7912+=_0xa96677+_0x23d9f3(0x63c)['format'](_0x36abe7,_0x199c47||_0x23d9f3(0x526))+_0x3914bf;}_0x3fbab6+=_0x8a9624[_0x23d9f3(0x543)](_0x4c9d4c,_0x2b22b8,_0x38c6cf,_0x39fe37);}}_0xc709be['save'](),_0xc709be[_0x23d9f3(0x99d)]=this['_makeFontNameText'](),_0xc709be['textAlign']=_0x1cd6a0,_0xc709be['textBaseline']=_0x23d9f3(0x7fe),_0xc709be[_0x23d9f3(0x67b)]=0x1,this[_0x23d9f3(0x2df)](_0x330c61,_0x1b7e85,_0x5e2d2a,_0x171390),_0xc709be[_0x23d9f3(0x67b)]=_0x342730,this[_0x23d9f3(0x3bb)](_0x330c61,_0x1b7e85,_0x5e2d2a,_0x171390),_0xc709be['restore'](),this[_0x23d9f3(0x6aa)][_0x23d9f3(0x76e)]();},VisuMZ[_0x4535e7(0x7ac)]['BattleManager_checkSubstitute']=BattleManager[_0x4535e7(0x861)],BattleManager[_0x4535e7(0x861)]=function(_0x449c87){const _0x414a13=_0x4535e7;if(this[_0x414a13(0x4e2)][_0x414a13(0x21e)]())return![];return VisuMZ[_0x414a13(0x7ac)]['BattleManager_checkSubstitute']['call'](this,_0x449c87);},BattleManager[_0x4535e7(0x55f)]=function(){const _0x20cb6a=_0x4535e7;if(this['_subject'])this['_logWindow'][_0x20cb6a(0x55f)](this['_subject']);this[_0x20cb6a(0x46d)]=_0x20cb6a(0x719),this['_subject']&&this[_0x20cb6a(0x1c8)][_0x20cb6a(0x17e)]()===0x0&&(this[_0x20cb6a(0x852)](this[_0x20cb6a(0x1c8)]),this[_0x20cb6a(0x1c8)]=null);},Bitmap['prototype'][_0x4535e7(0x1f9)]=function(){const _0x2bc9c6=_0x4535e7;this[_0x2bc9c6(0x8cb)]=new Image(),this[_0x2bc9c6(0x8cb)][_0x2bc9c6(0x726)]=this[_0x2bc9c6(0x3ca)]['bind'](this),this[_0x2bc9c6(0x8cb)][_0x2bc9c6(0x94b)]=this['_onError'][_0x2bc9c6(0x8f2)](this),this['_destroyCanvas'](),this[_0x2bc9c6(0x9e2)]='loading';if(Utils['hasEncryptedImages']()){if('APXpX'===_0x2bc9c6(0x82f))this['_startDecrypting']();else{const _0x2d0b56=_0x7f59d4[_0x54ae55]['name'];_0x2f31d9+=_0x39837e+_0x2bc9c6(0x63c)[_0x2bc9c6(0x543)](_0x52f56a,_0x2d0b56||_0x2bc9c6(0x526))+_0x237c5d;}}else this[_0x2bc9c6(0x8cb)][_0x2bc9c6(0x55d)]=this[_0x2bc9c6(0x2a7)],![]&&this[_0x2bc9c6(0x8cb)][_0x2bc9c6(0x29a)]>0x0&&('McrlZ'===_0x2bc9c6(0x4c7)?_0x1899bc['areButtonsHidden']()||this[_0x2bc9c6(0x672)]?this[_0x2bc9c6(0x5b6)]():_0x367431['CoreEngine'][_0x2bc9c6(0x6a5)][_0x2bc9c6(0x77f)](this):(this[_0x2bc9c6(0x8cb)][_0x2bc9c6(0x726)]=null,this[_0x2bc9c6(0x3ca)]()));},Scene_Skill[_0x4535e7(0x781)][_0x4535e7(0x2db)]=function(){const _0x3e16d6=_0x4535e7;Scene_MenuBase[_0x3e16d6(0x781)][_0x3e16d6(0x2db)][_0x3e16d6(0x77f)](this),this[_0x3e16d6(0x795)](),this[_0x3e16d6(0x2a5)][_0x3e16d6(0x1d1)](),this[_0x3e16d6(0x2a5)][_0x3e16d6(0x61a)](),this['_skillTypeWindow'][_0x3e16d6(0xa18)]();},Scene_Skill[_0x4535e7(0x781)]['arePageButtonsEnabled']=function(){const _0x2d0a9d=_0x4535e7;return this['_skillTypeWindow']&&this[_0x2d0a9d(0x3cd)][_0x2d0a9d(0x315)];},Game_Map[_0x4535e7(0x781)][_0x4535e7(0x1e8)]=function(_0x1b4495,_0x4c4d9d,_0x4b1c3b){const _0x30676c=_0x4535e7,_0x4f879a=this[_0x30676c(0x691)](),_0x422bc1=this[_0x30676c(0x420)](_0x1b4495,_0x4c4d9d);for(const _0x5b5e28 of _0x422bc1){if(_0x30676c(0x3d5)===_0x30676c(0x64a))this['_forcedBattleSys']=_0x30676c(0x5f9);else{const _0x5c53a7=_0x4f879a[_0x5b5e28];if(_0x5c53a7===undefined||_0x5c53a7===null){if($gameTemp[_0x30676c(0x18e)]()&&!DataManager[_0x30676c(0x8a8)]()){if(_0x30676c(0x824)!==_0x30676c(0x824))_0x5c905a['CoreEngine'][_0x30676c(0x290)][_0x30676c(0x77f)](this,_0x2eec79);else{let _0x31ebb9=_0x30676c(0xa15)+'\x0a';_0x31ebb9+=_0x30676c(0x2eb)+'\x0a',_0x31ebb9+=_0x30676c(0x365),Imported['VisuMZ_3_EventChainReact']||Imported['VisuMZ_4_UniqueTileEffects']?(alert(_0x31ebb9),SceneManager[_0x30676c(0x5c8)]()):(console[_0x30676c(0x8d1)](_0x31ebb9),!$gameTemp[_0x30676c(0x3e8)]&&(_0x30676c(0x3af)===_0x30676c(0x8e0)?(_0x300802[_0x30676c(0x8d1)](_0x30676c(0x926)),_0x376abd[_0x30676c(0x8d1)](_0x213907)):($gameTemp[_0x30676c(0x3e8)]=!![],SceneManager['showDevTools']())));}}}if((_0x5c53a7&0x10)!==0x0)continue;if((_0x5c53a7&_0x4b1c3b)===0x0)return!![];if((_0x5c53a7&_0x4b1c3b)===_0x4b1c3b)return _0x30676c(0x396)===_0x30676c(0x396)?![]:0.5*_0x478c0e['pow'](0x2,0xa*_0x240b65);}}return![];},Sprite_Animation['prototype'][_0x4535e7(0x4c3)]=function(_0x4e4f9a){!this['_originalViewport']&&(this['_originalViewport']=_0x4e4f9a['gl']['getParameter'](_0x4e4f9a['gl']['VIEWPORT']));};