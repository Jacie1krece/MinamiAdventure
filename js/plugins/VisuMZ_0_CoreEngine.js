//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.78;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.78] [CoreEngine]
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
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
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
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
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
 * @default {"PlayTest":"","NewGameBoot:eval":"true","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
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
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
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

const _0x5443f5=_0x5572;(function(_0x49636e,_0xf37d56){const _0x2c3c0b=_0x5572,_0x51d56b=_0x49636e();while(!![]){try{const _0x4a5e03=parseInt(_0x2c3c0b(0x178))/0x1*(-parseInt(_0x2c3c0b(0x26f))/0x2)+-parseInt(_0x2c3c0b(0x69f))/0x3*(-parseInt(_0x2c3c0b(0x4ea))/0x4)+-parseInt(_0x2c3c0b(0x1fc))/0x5+parseInt(_0x2c3c0b(0x776))/0x6+-parseInt(_0x2c3c0b(0x72a))/0x7*(parseInt(_0x2c3c0b(0x73f))/0x8)+parseInt(_0x2c3c0b(0x25c))/0x9+-parseInt(_0x2c3c0b(0x5eb))/0xa*(-parseInt(_0x2c3c0b(0x949))/0xb);if(_0x4a5e03===_0xf37d56)break;else _0x51d56b['push'](_0x51d56b['shift']());}catch(_0x4ff6aa){_0x51d56b['push'](_0x51d56b['shift']());}}}(_0x2f41,0x32654));var label=_0x5443f5(0x425),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5443f5(0x754)](function(_0x53d606){const _0x201ddd=_0x5443f5;return _0x53d606[_0x201ddd(0x29f)]&&_0x53d606['description'][_0x201ddd(0x53a)]('['+label+']');})[0x0];VisuMZ[label][_0x5443f5(0x446)]=VisuMZ[label][_0x5443f5(0x446)]||{},VisuMZ[_0x5443f5(0x53d)]=function(_0x15e917,_0x4651d8){const _0x5013d3=_0x5443f5;for(const _0x3a3f1c in _0x4651d8){if(_0x3a3f1c['match'](/(.*):(.*)/i)){const _0x1364f1=String(RegExp['$1']),_0x11c860=String(RegExp['$2'])['toUpperCase']()[_0x5013d3(0x7b7)]();let _0x42c714,_0x37ceca,_0x13d20f;switch(_0x11c860){case _0x5013d3(0xe8):_0x42c714=_0x4651d8[_0x3a3f1c]!==''?Number(_0x4651d8[_0x3a3f1c]):0x0;break;case _0x5013d3(0x3a0):_0x37ceca=_0x4651d8[_0x3a3f1c]!==''?JSON['parse'](_0x4651d8[_0x3a3f1c]):[],_0x42c714=_0x37ceca[_0x5013d3(0x624)](_0x54f61d=>Number(_0x54f61d));break;case _0x5013d3(0x3b9):_0x42c714=_0x4651d8[_0x3a3f1c]!==''?eval(_0x4651d8[_0x3a3f1c]):null;break;case'ARRAYEVAL':_0x37ceca=_0x4651d8[_0x3a3f1c]!==''?JSON[_0x5013d3(0x83a)](_0x4651d8[_0x3a3f1c]):[],_0x42c714=_0x37ceca[_0x5013d3(0x624)](_0x573ed1=>eval(_0x573ed1));break;case _0x5013d3(0x956):_0x42c714=_0x4651d8[_0x3a3f1c]!==''?JSON[_0x5013d3(0x83a)](_0x4651d8[_0x3a3f1c]):'';break;case _0x5013d3(0x5a8):_0x37ceca=_0x4651d8[_0x3a3f1c]!==''?JSON['parse'](_0x4651d8[_0x3a3f1c]):[],_0x42c714=_0x37ceca[_0x5013d3(0x624)](_0x1ab6fe=>JSON['parse'](_0x1ab6fe));break;case _0x5013d3(0x139):_0x42c714=_0x4651d8[_0x3a3f1c]!==''?new Function(JSON['parse'](_0x4651d8[_0x3a3f1c])):new Function(_0x5013d3(0x6ac));break;case _0x5013d3(0x89b):_0x37ceca=_0x4651d8[_0x3a3f1c]!==''?JSON[_0x5013d3(0x83a)](_0x4651d8[_0x3a3f1c]):[],_0x42c714=_0x37ceca[_0x5013d3(0x624)](_0x3525f4=>new Function(JSON[_0x5013d3(0x83a)](_0x3525f4)));break;case _0x5013d3(0x2db):_0x42c714=_0x4651d8[_0x3a3f1c]!==''?String(_0x4651d8[_0x3a3f1c]):'';break;case'ARRAYSTR':_0x37ceca=_0x4651d8[_0x3a3f1c]!==''?JSON['parse'](_0x4651d8[_0x3a3f1c]):[],_0x42c714=_0x37ceca[_0x5013d3(0x624)](_0x4cf776=>String(_0x4cf776));break;case _0x5013d3(0x6ce):_0x13d20f=_0x4651d8[_0x3a3f1c]!==''?JSON[_0x5013d3(0x83a)](_0x4651d8[_0x3a3f1c]):{},_0x15e917[_0x1364f1]={},VisuMZ[_0x5013d3(0x53d)](_0x15e917[_0x1364f1],_0x13d20f);continue;case _0x5013d3(0x17f):_0x37ceca=_0x4651d8[_0x3a3f1c]!==''?JSON[_0x5013d3(0x83a)](_0x4651d8[_0x3a3f1c]):[],_0x42c714=_0x37ceca[_0x5013d3(0x624)](_0x397988=>VisuMZ['ConvertParams']({},JSON[_0x5013d3(0x83a)](_0x397988)));break;default:continue;}_0x15e917[_0x1364f1]=_0x42c714;}}return _0x15e917;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x602)]=SceneManager['exit'],SceneManager[_0x5443f5(0x849)]=function(){const _0x463263=_0x5443f5;VisuMZ[_0x463263(0x425)][_0x463263(0x602)]['call'](this);if(Utils['RPGMAKER_VERSION']>=_0x463263(0x748)){if(_0x463263(0x538)!==_0x463263(0x538))this[_0x463263(0x231)][_0x463263(0x3c0)](_0x119ee6[_0x463263(0x6aa)][_0x463263(0xfd)]);else{if(typeof nw===_0x463263(0x19f))nw[_0x463263(0x306)]['quit']();}}},(_0x204a7d=>{const _0x2f905d=_0x5443f5,_0x2a294d=_0x204a7d[_0x2f905d(0x744)];for(const _0x2902c1 of dependencies){if(!Imported[_0x2902c1]){alert(_0x2f905d(0x27f)[_0x2f905d(0x2d3)](_0x2a294d,_0x2902c1)),SceneManager[_0x2f905d(0x849)]();break;}}const _0x26522c=_0x204a7d[_0x2f905d(0x2ec)];if(_0x26522c[_0x2f905d(0x8ee)](/\[Version[ ](.*?)\]/i)){if(_0x2f905d(0x799)==='eLFFd')return _0x2a133a[_0x2f905d(0x425)][_0x2f905d(0x47a)][_0x21ca76]||0x0;else{const _0x113bdd=Number(RegExp['$1']);_0x113bdd!==VisuMZ[label][_0x2f905d(0x74a)]&&(alert(_0x2f905d(0x9ae)[_0x2f905d(0x2d3)](_0x2a294d,_0x113bdd)),SceneManager[_0x2f905d(0x849)]());}}if(_0x26522c[_0x2f905d(0x8ee)](/\[Tier[ ](\d+)\]/i)){const _0x44683b=Number(RegExp['$1']);_0x44683b<tier?(alert(_0x2f905d(0x8bd)[_0x2f905d(0x2d3)](_0x2a294d,_0x44683b,tier)),SceneManager[_0x2f905d(0x849)]()):tier=Math[_0x2f905d(0x8d5)](_0x44683b,tier);}VisuMZ[_0x2f905d(0x53d)](VisuMZ[label][_0x2f905d(0x446)],_0x204a7d[_0x2f905d(0x2f6)]);})(pluginData),((()=>{const _0x4fdb64=_0x5443f5;if(VisuMZ[_0x4fdb64(0x425)][_0x4fdb64(0x446)]['QoL'][_0x4fdb64(0x689)]??!![]){if('JqbtL'==='JqbtL')for(const _0x4d27ba in $plugins){const _0x13efb8=$plugins[_0x4d27ba];_0x13efb8['name'][_0x4fdb64(0x8ee)](/(.*)\/(.*)/i)&&(_0x13efb8[_0x4fdb64(0x744)]=String(RegExp['$2']['trim']()));}else{if(this[_0x4fdb64(0x34c)]==='keyboard'&&!_0x28e6f7['isArrowPressed']())return;if(_0x5aee6b[_0x4fdb64(0x89c)]())return;_0x5358cd[_0x4fdb64(0x425)][_0x4fdb64(0x46c)][_0x4fdb64(0x91b)](this,_0x13957e),this[_0x4fdb64(0x37a)](_0x4fdb64(0x56f));}}})()),PluginManager['registerCommand'](pluginData['name'],'AnimationPoint',_0x1fb333=>{const _0x4ed34e=_0x5443f5;if(!SceneManager[_0x4ed34e(0x970)])return;if(!SceneManager[_0x4ed34e(0x970)]['_spriteset'])return;VisuMZ['ConvertParams'](_0x1fb333,_0x1fb333);const _0xe732d6=Math[_0x4ed34e(0x558)](_0x1fb333[_0x4ed34e(0x855)]),_0x49fd74=Math[_0x4ed34e(0x558)](_0x1fb333[_0x4ed34e(0x839)]);$gameTemp['requestPointAnimation'](_0xe732d6,_0x49fd74,_0x1fb333['AnimationID'],_0x1fb333[_0x4ed34e(0x12e)],_0x1fb333[_0x4ed34e(0x595)]);}),PluginManager['registerCommand'](pluginData[_0x5443f5(0x744)],'AudioChangeBgmVolume',_0x26cf0=>{const _0x3a3cfb=_0x5443f5;VisuMZ[_0x3a3cfb(0x53d)](_0x26cf0,_0x26cf0);const _0xc5db4c=Math[_0x3a3cfb(0x558)](_0x26cf0['volume'])['clamp'](0x0,0x64),_0x2a0ed7=AudioManager[_0x3a3cfb(0x340)];_0x2a0ed7&&(_0x2a0ed7[_0x3a3cfb(0x61e)]=_0xc5db4c,_0x2a0ed7[_0x3a3cfb(0x982)]=AudioManager[_0x3a3cfb(0x4ae)][_0x3a3cfb(0x4e4)](),AudioManager['updateBgmParameters'](_0x2a0ed7),AudioManager[_0x3a3cfb(0x129)](_0x2a0ed7,_0x2a0ed7[_0x3a3cfb(0x982)]),AudioManager[_0x3a3cfb(0x4ae)][_0x3a3cfb(0x4d0)](_0x2a0ed7[_0x3a3cfb(0x982)]));}),PluginManager['registerCommand'](pluginData['name'],_0x5443f5(0xfe),_0x3a1693=>{const _0x37c335=_0x5443f5;VisuMZ[_0x37c335(0x53d)](_0x3a1693,_0x3a1693);const _0x3ee91f=Math['round'](_0x3a1693[_0x37c335(0x5d7)])[_0x37c335(0x19c)](0x32,0x96),_0x81de81=AudioManager[_0x37c335(0x340)];if(_0x81de81){if(_0x37c335(0x75d)===_0x37c335(0x758))return![];else _0x81de81[_0x37c335(0x5d7)]=_0x3ee91f,_0x81de81[_0x37c335(0x982)]=AudioManager[_0x37c335(0x4ae)][_0x37c335(0x4e4)](),AudioManager[_0x37c335(0x7ab)](_0x81de81),AudioManager[_0x37c335(0x129)](_0x81de81,_0x81de81['pos']),AudioManager[_0x37c335(0x4ae)][_0x37c335(0x4d0)](_0x81de81[_0x37c335(0x982)]);}}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],'AudioChangeBgmPan',_0x23c22b=>{const _0x3f4778=_0x5443f5;VisuMZ['ConvertParams'](_0x23c22b,_0x23c22b);const _0x457c21=Math[_0x3f4778(0x558)](_0x23c22b[_0x3f4778(0x3d1)])[_0x3f4778(0x19c)](-0x64,0x64),_0x43b824=AudioManager[_0x3f4778(0x340)];if(_0x43b824){if(_0x3f4778(0x74e)===_0x3f4778(0x74e))_0x43b824[_0x3f4778(0x3d1)]=_0x457c21,_0x43b824[_0x3f4778(0x982)]=AudioManager['_bgmBuffer'][_0x3f4778(0x4e4)](),AudioManager['updateBgmParameters'](_0x43b824),AudioManager['playBgm'](_0x43b824,_0x43b824[_0x3f4778(0x982)]),AudioManager[_0x3f4778(0x4ae)][_0x3f4778(0x4d0)](_0x43b824[_0x3f4778(0x982)]);else return _0x1ac014[_0x3f4778(0x425)][_0x3f4778(0x446)]['UI'][_0x3f4778(0x5ef)];}}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],_0x5443f5(0x71b),_0x106df2=>{const _0x5073e7=_0x5443f5;VisuMZ['ConvertParams'](_0x106df2,_0x106df2);const _0x3886d1=Math['round'](_0x106df2[_0x5073e7(0x61e)])[_0x5073e7(0x19c)](0x0,0x64),_0x14eff2=AudioManager[_0x5073e7(0x130)];_0x14eff2&&(_0x14eff2[_0x5073e7(0x61e)]=_0x3886d1,_0x14eff2[_0x5073e7(0x982)]=AudioManager[_0x5073e7(0x1f4)]['seek'](),AudioManager[_0x5073e7(0x1a8)](_0x14eff2),AudioManager['playBgs'](_0x14eff2,_0x14eff2['pos']),AudioManager[_0x5073e7(0x1f4)]['_startPlaying'](_0x14eff2[_0x5073e7(0x982)]));}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],'AudioChangeBgsPitch',_0x32661f=>{const _0x54895c=_0x5443f5;VisuMZ[_0x54895c(0x53d)](_0x32661f,_0x32661f);const _0x50037c=Math[_0x54895c(0x558)](_0x32661f[_0x54895c(0x5d7)])[_0x54895c(0x19c)](0x32,0x96),_0x125ab2=AudioManager[_0x54895c(0x130)];_0x125ab2&&(_0x125ab2[_0x54895c(0x5d7)]=_0x50037c,_0x125ab2[_0x54895c(0x982)]=AudioManager[_0x54895c(0x1f4)][_0x54895c(0x4e4)](),AudioManager[_0x54895c(0x1a8)](_0x125ab2),AudioManager[_0x54895c(0x877)](_0x125ab2,_0x125ab2['pos']),AudioManager[_0x54895c(0x1f4)][_0x54895c(0x4d0)](_0x125ab2['pos']));}),PluginManager['registerCommand'](pluginData['name'],'AudioChangeBgsPan',_0x151a52=>{const _0x1e3a5f=_0x5443f5;VisuMZ[_0x1e3a5f(0x53d)](_0x151a52,_0x151a52);const _0x377d69=Math[_0x1e3a5f(0x558)](_0x151a52[_0x1e3a5f(0x3d1)])[_0x1e3a5f(0x19c)](-0x64,0x64),_0x2845ad=AudioManager[_0x1e3a5f(0x130)];_0x2845ad&&(_0x2845ad[_0x1e3a5f(0x3d1)]=_0x377d69,_0x2845ad[_0x1e3a5f(0x982)]=AudioManager['_bgsBuffer']['seek'](),AudioManager[_0x1e3a5f(0x1a8)](_0x2845ad),AudioManager[_0x1e3a5f(0x877)](_0x2845ad,_0x2845ad[_0x1e3a5f(0x982)]),AudioManager[_0x1e3a5f(0x1f4)]['_startPlaying'](_0x2845ad[_0x1e3a5f(0x982)]));}),PluginManager['registerCommand'](pluginData[_0x5443f5(0x744)],'DebugConsoleLastControllerID',_0x25ba15=>{const _0x67855c=_0x5443f5;if(!$gameTemp[_0x67855c(0x6b1)]())return;const _0x16cf9f=Input[_0x67855c(0xf5)]();navigator[_0x67855c(0x597)]&&navigator['clipboard']['writeText'](_0x16cf9f);}),PluginManager['registerCommand'](pluginData[_0x5443f5(0x744)],_0x5443f5(0x96b),_0x487830=>{const _0x543260=_0x5443f5;if(!$gameTemp[_0x543260(0x6b1)]())return;if(!Utils['isNwjs']())return;SceneManager['_scene']['_active']=![],VisuMZ[_0x543260(0x425)][_0x543260(0x30b)]();}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],_0x5443f5(0x701),_0x23e871=>{const _0x77c37e=_0x5443f5;if(!$gameTemp[_0x77c37e(0x6b1)]())return;if(!Utils[_0x77c37e(0x630)]())return;SceneManager[_0x77c37e(0x970)][_0x77c37e(0x731)]=![],VisuMZ[_0x77c37e(0x425)][_0x77c37e(0x9e0)]();}),PluginManager['registerCommand'](pluginData[_0x5443f5(0x744)],_0x5443f5(0x4c5),_0x5234f5=>{const _0x16af3e=_0x5443f5;if(!$gameTemp[_0x16af3e(0x6b1)]())return;if(!Utils[_0x16af3e(0x630)]())return;if(!$gameMap)return;if($gameMap[_0x16af3e(0x377)]()<=0x0)return;VisuMZ[_0x16af3e(0x53d)](_0x5234f5,_0x5234f5);const _0x98a82e='Map%1'[_0x16af3e(0x2d3)]($gameMap[_0x16af3e(0x377)]()[_0x16af3e(0x85f)](0x3)),_0x5d7b93=VisuMZ['CoreEngine']['ExtractStrFromMap']($gameMap[_0x16af3e(0x377)]());VisuMZ[_0x16af3e(0x425)]['ExportString'](_0x5d7b93,_0x98a82e,!![]);}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],'ExportCurTroopText',_0x2ae632=>{const _0x334bae=_0x5443f5;if(!$gameTemp[_0x334bae(0x6b1)]())return;if(!Utils[_0x334bae(0x630)]())return;if(!$gameParty[_0x334bae(0x59b)]())return;VisuMZ[_0x334bae(0x53d)](_0x2ae632,_0x2ae632);const _0x58105c=_0x334bae(0x8ba)[_0x334bae(0x2d3)]($gameTroop[_0x334bae(0x927)]['padZero'](0x4)),_0x26d4c9=VisuMZ['CoreEngine']['ExtractStrFromTroop']($gameTroop['_troopId']);VisuMZ['CoreEngine']['ExportString'](_0x26d4c9,_0x58105c,!![]);}),VisuMZ[_0x5443f5(0x425)]['ExportString']=function(_0x53e04a,_0x5b1c9f,_0x228cfe){const _0x138f49=_0x5443f5,_0x5c912d=require('fs');let _0x390ef7=_0x138f49(0x19d)['format'](_0x5b1c9f||'0');_0x5c912d[_0x138f49(0x81f)](_0x390ef7,_0x53e04a,_0x4df678=>{const _0xb2f08c=_0x138f49;if(_0x4df678)throw err;else _0x228cfe&&alert(_0xb2f08c(0x52c)[_0xb2f08c(0x2d3)](_0x390ef7));});},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x30b)]=function(){const _0x319453=_0x5443f5,_0x1ebbc6=[];for(const _0x56c17b of $dataMapInfos){if(_0x319453(0x79b)===_0x319453(0x79b)){if(!_0x56c17b)continue;_0x1ebbc6[_0x319453(0x747)](_0x56c17b['id']);}else return this[_0x319453(0x339)]();}const _0x3c358d=_0x1ebbc6[_0x319453(0x44d)]*0x64+Math[_0x319453(0x751)](0x64);alert(_0x319453(0x63a)[_0x319453(0x2d3)](_0x3c358d)),this[_0x319453(0x3d4)]=[],this[_0x319453(0x4e2)]=$dataMap;for(const _0x22b0d8 of _0x1ebbc6){VisuMZ['CoreEngine'][_0x319453(0x1f2)](_0x22b0d8);}setTimeout(VisuMZ[_0x319453(0x425)][_0x319453(0x434)][_0x319453(0x2ed)](this),_0x3c358d);},VisuMZ[_0x5443f5(0x425)]['loadMapData']=function(_0x31f9fa){const _0x3961f0=_0x5443f5,_0x3f27f0='Map%1.json'[_0x3961f0(0x2d3)](_0x31f9fa[_0x3961f0(0x85f)](0x3)),_0x2acb4a=new XMLHttpRequest(),_0x399d6f=_0x3961f0(0x549)+_0x3f27f0;_0x2acb4a[_0x3961f0(0x3e7)]('GET',_0x399d6f),_0x2acb4a['overrideMimeType'](_0x3961f0(0x86e)),_0x2acb4a['onload']=()=>this[_0x3961f0(0x3b3)](_0x2acb4a,_0x31f9fa,_0x3f27f0,_0x399d6f),_0x2acb4a[_0x3961f0(0x629)]=()=>DataManager[_0x3961f0(0x8a3)](_0x3961f0(0x42d),_0x3f27f0,_0x399d6f),_0x2acb4a[_0x3961f0(0x834)]();},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x3b3)]=function(_0x3aa0f1,_0x2eafe6,_0x210e68,_0x2c1706){const _0x39b6de=_0x5443f5;$dataMap=JSON[_0x39b6de(0x83a)](_0x3aa0f1['responseText']),DataManager[_0x39b6de(0x370)]($dataMap),this[_0x39b6de(0x3d4)][_0x2eafe6]=VisuMZ[_0x39b6de(0x425)][_0x39b6de(0x250)](_0x2eafe6),$dataMap=this[_0x39b6de(0x4e2)];},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x434)]=function(){const _0x3fb8d3=_0x5443f5,_0x1cd606='AllMaps';this[_0x3fb8d3(0x3d4)][_0x3fb8d3(0x2d0)](undefined)[_0x3fb8d3(0x2d0)]('')['remove'](null);const _0x3ff230=this[_0x3fb8d3(0x3d4)][_0x3fb8d3(0x5db)](_0x3fb8d3(0x23c))[_0x3fb8d3(0x7b7)]();VisuMZ[_0x3fb8d3(0x425)][_0x3fb8d3(0x870)](_0x3ff230,_0x1cd606,!![]),SceneManager[_0x3fb8d3(0x970)][_0x3fb8d3(0x731)]=!![];},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x250)]=function(_0x38c960){const _0x8a3227=_0x5443f5;if(!$dataMap)return'';let _0x1f0466='█'[_0x8a3227(0x83e)](0x46)+'\x0a\x0a',_0x1c25ff='═'[_0x8a3227(0x83e)](0x46)+'\x0a\x0a',_0x10f3fe='';this[_0x8a3227(0x28b)]=0x0;for(const _0x17dfd2 of $dataMap['events']){if(!_0x17dfd2)continue;let _0x2049aa=_0x17dfd2['id'],_0xf080e4=_0x17dfd2['name'],_0x58972e=_0x17dfd2['pages'];for(const _0x158e18 of _0x58972e){const _0x32b12c=_0x58972e[_0x8a3227(0x75e)](_0x158e18)+0x1;let _0x56450c=_0x1c25ff+_0x8a3227(0x2eb),_0x57fe78=VisuMZ[_0x8a3227(0x425)][_0x8a3227(0x6c2)](_0x158e18[_0x8a3227(0x797)]);if(_0x57fe78[_0x8a3227(0x44d)]>0x0){if(_0x10f3fe[_0x8a3227(0x44d)]>0x0)_0x10f3fe+=_0x1c25ff+_0x8a3227(0x23c);else{if(_0x8a3227(0x6e9)!==_0x8a3227(0x6e9)){const _0x4ac645=_0x8d8f5[_0x8a3227(0x425)][_0x8a3227(0x446)][_0x8a3227(0x688)];if(!_0x4ac645)return![];const _0x23c188=_0x4ac645[_0x8a3227(0xfc)];if(!_0x23c188)return![];const _0x222421=this[_0x8a3227(0x5ad)][_0x8a3227(0x744)]()[_0x8a3227(0x613)]();for(const _0x2292fa of _0x23c188){if(_0x222421[_0x8a3227(0x53a)](_0x2292fa[_0x8a3227(0x613)]()))return!![];}return![];}else{const _0x1c9db2=$dataMapInfos[_0x38c960][_0x8a3227(0x744)];_0x10f3fe+=_0x1f0466+_0x8a3227(0x3bb)[_0x8a3227(0x2d3)](_0x38c960,_0x1c9db2||'Unnamed')+_0x1f0466;}}_0x10f3fe+=_0x56450c['format'](_0x2049aa,_0xf080e4,_0x32b12c,_0x57fe78);}}}return _0x10f3fe['length']>0x0&&(_0x10f3fe+=_0x1c25ff),_0x10f3fe;},VisuMZ['CoreEngine'][_0x5443f5(0x9e0)]=function(){const _0x5aad89=_0x5443f5,_0x373aa5=$dataTroops[_0x5aad89(0x44d)]*0xa+Math[_0x5aad89(0x751)](0xa);alert(_0x5aad89(0x187)['format'](_0x373aa5));const _0x19c536=[];for(const _0x6f40dc of $dataTroops){if(!_0x6f40dc)continue;const _0x16cd11=_0x6f40dc['id'];_0x19c536[_0x16cd11]=VisuMZ[_0x5aad89(0x425)][_0x5aad89(0x66a)](_0x16cd11);}setTimeout(VisuMZ[_0x5aad89(0x425)]['exportAllTroopStrings']['bind'](this,_0x19c536),_0x373aa5);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x66a)]=function(_0x465541){const _0x22c84a=_0x5443f5;if(!$dataTroops[_0x465541])return'';let _0x3381b7='█'['repeat'](0x46)+'\x0a\x0a',_0x50a6e6='═'['repeat'](0x46)+'\x0a\x0a',_0x407530='';this[_0x22c84a(0x28b)]=0x0;const _0x2ebb61=$dataTroops[_0x465541];let _0x1034f7=_0x2ebb61['pages'];for(const _0x4d4c59 of _0x1034f7){const _0xe8fc78=_0x1034f7[_0x22c84a(0x75e)](_0x4d4c59)+0x1;let _0x3570c9=_0x50a6e6+_0x22c84a(0x2c0),_0x506d12=VisuMZ[_0x22c84a(0x425)][_0x22c84a(0x6c2)](_0x4d4c59[_0x22c84a(0x797)]);_0x506d12[_0x22c84a(0x44d)]>0x0&&(_0x407530[_0x22c84a(0x44d)]>0x0?_0x407530+=_0x50a6e6+'\x0a\x0a\x0a\x0a\x0a':_0x407530+=_0x3381b7+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x22c84a(0x2d3)](_0x465541,_0x2ebb61[_0x22c84a(0x744)]||_0x22c84a(0x6f0))+_0x3381b7,_0x407530+=_0x3570c9['format'](_0xe8fc78,_0x506d12));}return _0x407530[_0x22c84a(0x44d)]>0x0&&(_0x407530+=_0x50a6e6),_0x407530;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x2a7)]=function(_0x3ba433){const _0x54b8f8=_0x5443f5,_0x57af91=_0x54b8f8(0x2c8);_0x3ba433['remove'](undefined)[_0x54b8f8(0x2d0)]('')[_0x54b8f8(0x2d0)](null);const _0x5ca6cd=_0x3ba433[_0x54b8f8(0x5db)](_0x54b8f8(0x23c))['trim']();VisuMZ[_0x54b8f8(0x425)][_0x54b8f8(0x870)](_0x5ca6cd,_0x57af91,!![]),SceneManager[_0x54b8f8(0x970)][_0x54b8f8(0x731)]=!![];},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x6c2)]=function(_0x5e2eef){const _0x386e57=_0x5443f5;let _0x27b69d='\x0a'+'─'[_0x386e57(0x83e)](0x46)+'\x0a',_0x30ece0='\x0a'+'┄'[_0x386e57(0x83e)](0x46)+'\x0a',_0x2ea5ca='';for(const _0x227818 of _0x5e2eef){if(_0x386e57(0x4fc)!==_0x386e57(0x790)){if(!_0x227818)continue;if(_0x227818['code']===0x65)_0x2ea5ca+=_0x27b69d+'\x0a',_0x2ea5ca+=_0x386e57(0xf6),_0x227818[_0x386e57(0x2f6)][0x4]!==''&&_0x227818['parameters'][0x4]!==undefined&&(_0x2ea5ca+=_0x386e57(0x245)['format'](_0x227818[_0x386e57(0x2f6)][0x4]));else{if(_0x227818['code']===0x191)_0x2ea5ca+='%1\x0a'[_0x386e57(0x2d3)](_0x227818['parameters'][0x0]);else{if(_0x227818[_0x386e57(0x8d8)]===0x192){if(_0x386e57(0x7c6)===_0x386e57(0x617)){_0x313619[_0x386e57(0x53d)](_0x3844c3,_0x35e7f9);const _0xf3a9a1=_0x10cb86[_0x386e57(0x408)]||0x0;_0x2d4e19['gainGold'](_0xf3a9a1);}else _0x2ea5ca+=_0x27b69d,_0x2ea5ca+=_0x386e57(0x45f)['format'](_0x30ece0,_0x227818[_0x386e57(0x2f6)][0x0]+0x1,_0x227818[_0x386e57(0x2f6)][0x1]);}else{if(_0x227818['code']===0x193){if(_0x386e57(0x891)==='zRNhY')_0x2ea5ca+=_0x27b69d,_0x2ea5ca+=_0x386e57(0x69d)[_0x386e57(0x2d3)](_0x30ece0);else{const _0x2d7fba=_0x140390[_0x386e57(0x221)]==_0x386e57(0x841)?_0x386e57(0x3e7):_0x3eb36[_0x386e57(0x221)]==_0x386e57(0x785)?_0x386e57(0x6ee):'xdg-open';_0x318b2c(_0x386e57(0x28f))[_0x386e57(0x40b)](_0x2d7fba+'\x20'+_0x31c6b2);}}else{if(_0x227818[_0x386e57(0x8d8)]===0x194)_0x386e57(0x3c5)!==_0x386e57(0x3c5)?this[_0x386e57(0x93c)][_0x386e57(0x3c0)](_0x3d38ff[_0x386e57(0x6aa)][_0x386e57(0x5e9)]):(_0x2ea5ca+=_0x27b69d,_0x2ea5ca+=_0x386e57(0x402)['format'](_0x30ece0));else{if(_0x227818[_0x386e57(0x8d8)]===0x69)'BQaei'===_0x386e57(0x8d6)?this[_0x386e57(0x1e7)]='ETB':(_0x2ea5ca+=_0x27b69d+'\x0a',_0x2ea5ca+=_0x386e57(0x50e));else{if(_0x227818[_0x386e57(0x8d8)]===0x6c){if(_0x386e57(0x7a0)!=='IiWEK')return this['paramName'](_0x3257a7);else _0x2ea5ca+=_0x27b69d+'\x0a',_0x2ea5ca+=_0x386e57(0x524)[_0x386e57(0x2d3)](_0x227818['parameters'][0x0]);}else{if(_0x227818['code']===0x198)_0x2ea5ca+='%1\x0a'[_0x386e57(0x2d3)](_0x227818[_0x386e57(0x2f6)][0x0]);else{if(_0x227818[_0x386e57(0x8d8)]===0x75){const _0x1a686a=$dataCommonEvents[_0x227818[_0x386e57(0x2f6)][0x0]];if(_0x1a686a&&this[_0x386e57(0x28b)]<=0xa){this[_0x386e57(0x28b)]++;let _0x3cf3f3=VisuMZ['CoreEngine']['ExtractStrFromList'](_0x1a686a['list']);_0x3cf3f3[_0x386e57(0x44d)]>0x0&&(_0x386e57(0x6d4)==='VPSzy'?this['_forcedTroopView']='SV':(_0x2ea5ca+=_0x27b69d,_0x2ea5ca+=_0x30ece0,_0x2ea5ca+=_0x386e57(0x20f)[_0x386e57(0x2d3)](_0x1a686a['id'],_0x1a686a[_0x386e57(0x744)]),_0x2ea5ca+=_0x30ece0,_0x2ea5ca+=_0x3cf3f3,_0x2ea5ca+=_0x30ece0,_0x2ea5ca+='〘Common\x20Event\x20%1:\x20%2〙\x20End'['format'](_0x1a686a['id'],_0x1a686a['name']),_0x2ea5ca+=_0x30ece0)),this[_0x386e57(0x28b)]--;}}}}}}}}}}}else{this['contents'][_0x386e57(0x63c)](),this[_0x386e57(0x692)][_0x386e57(0x63c)](),this['resetTextColor']();let _0x163fcd=_0x2bee70[_0x386e57(0x425)]['Settings'][_0x386e57(0x688)][_0x386e57(0x424)][_0x386e57(0x8c3)]('\x0a'),_0x4d1b14=_0x163fcd[_0x386e57(0x44d)],_0x855e92=(this['innerHeight']-_0x4d1b14*this[_0x386e57(0x1eb)]())/0x2;for(let _0x52e0b2=0x0;_0x52e0b2<_0x4d1b14;++_0x52e0b2){let _0x32927f=_0x163fcd[_0x52e0b2],_0x422328=this[_0x386e57(0x59c)](_0x32927f)[_0x386e57(0x786)],_0x5051a1=_0x47a383['floor']((this['contents'][_0x386e57(0x786)]-_0x422328)/0x2);this[_0x386e57(0x4cd)](_0x32927f,_0x5051a1,_0x855e92),_0x855e92+=this[_0x386e57(0x1eb)]();}}}return _0x2ea5ca[_0x386e57(0x44d)]>0x0&&(_0x2ea5ca+=_0x27b69d),_0x2ea5ca;},PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],_0x5443f5(0x3f5),_0x52da20=>{const _0x420c15=_0x5443f5;VisuMZ[_0x420c15(0x53d)](_0x52da20,_0x52da20);const _0x2a35ba=_0x52da20[_0x420c15(0x80a)];VisuMZ[_0x420c15(0x9c3)](_0x2a35ba);}),PluginManager[_0x5443f5(0x559)](pluginData['name'],'GoldChange',_0x413765=>{const _0x2d01ff=_0x5443f5;VisuMZ[_0x2d01ff(0x53d)](_0x413765,_0x413765);const _0xd87824=_0x413765['value']||0x0;$gameParty[_0x2d01ff(0x7ce)](_0xd87824);}),PluginManager['registerCommand'](pluginData['name'],_0x5443f5(0x5d8),_0x4cbfe5=>{const _0x5b065f=_0x5443f5;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x5b065f(0x53d)](_0x4cbfe5,_0x4cbfe5);const _0x46096e=_0x4cbfe5[_0x5b065f(0x1a9)];SceneManager[_0x5b065f(0x970)]['playOnceParallelInterpreter'](_0x46096e);}),PluginManager[_0x5443f5(0x559)](pluginData['name'],'PictureCoordinatesMode',_0x228322=>{const _0x5536b1=_0x5443f5;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x5536b1(0x630)]())return;VisuMZ[_0x5536b1(0x53d)](_0x228322,_0x228322);const _0xae6f6=_0x228322['PictureID']||0x1;$gameTemp['_pictureCoordinatesMode']=_0xae6f6;}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],_0x5443f5(0x196),_0xc407af=>{const _0x2ca742=_0x5443f5;VisuMZ['ConvertParams'](_0xc407af,_0xc407af);const _0x4528d2=_0xc407af['pictureId']||0x1,_0x50ab54=_0xc407af['easingType']||_0x2ca742(0x662),_0x4531d2=$gameScreen[_0x2ca742(0x8dd)](_0x4528d2);_0x4531d2&&_0x4531d2['setEasingType'](_0x50ab54);}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],_0x5443f5(0x29b),_0x4c5f8c=>{const _0x5518f6=_0x5443f5;for(let _0x16df6f=0x1;_0x16df6f<=0x64;_0x16df6f++){$gameScreen[_0x5518f6(0x5b6)](_0x16df6f);}}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],_0x5443f5(0x472),_0xc367b9=>{const _0x4c7c86=_0x5443f5;VisuMZ[_0x4c7c86(0x53d)](_0xc367b9,_0xc367b9);const _0x2a586b=Math[_0x4c7c86(0x2cf)](_0xc367b9[_0x4c7c86(0x529)],_0xc367b9['EndingID']),_0x346e5f=Math[_0x4c7c86(0x8d5)](_0xc367b9[_0x4c7c86(0x529)],_0xc367b9[_0x4c7c86(0x9e8)]);for(let _0x1e8d29=_0x2a586b;_0x1e8d29<=_0x346e5f;_0x1e8d29++){$gameScreen[_0x4c7c86(0x5b6)](_0x1e8d29);}}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],_0x5443f5(0x552),_0x4d2343=>{const _0x43c6ba=_0x5443f5;VisuMZ[_0x43c6ba(0x53d)](_0x4d2343,_0x4d2343);const _0x1cc8e7=Math[_0x43c6ba(0x558)](_0x4d2343[_0x43c6ba(0x7dd)])[_0x43c6ba(0x19c)](0x1,0x64),_0xfc18f5=-Number(_0x4d2343[_0x43c6ba(0x7bc)]||0x0),_0x4b0431=Math['max'](_0x4d2343['Duration']||0x0,0x0),_0x285d0b=_0x4d2343[_0x43c6ba(0x61f)]||_0x43c6ba(0x662),_0x202141=_0x4d2343[_0x43c6ba(0x817)],_0x59c22d=$gameScreen[_0x43c6ba(0x8dd)](_0x1cc8e7);if(!_0x59c22d)return;_0x59c22d[_0x43c6ba(0x102)](_0xfc18f5,_0x4b0431,_0x285d0b);if(_0x202141){const _0x405bcd=$gameTemp[_0x43c6ba(0x847)]();if(_0x405bcd)_0x405bcd[_0x43c6ba(0x41d)](_0x4b0431);}}),PluginManager[_0x5443f5(0x559)](pluginData['name'],_0x5443f5(0x3b1),_0x332cc6=>{const _0x3b7c68=_0x5443f5;VisuMZ[_0x3b7c68(0x53d)](_0x332cc6,_0x332cc6);const _0x1ecb8c=Math['round'](_0x332cc6[_0x3b7c68(0x7dd)])[_0x3b7c68(0x19c)](0x1,0x64),_0x5f0138=-Number(_0x332cc6[_0x3b7c68(0x3c6)]||0x0),_0x31d097=Math[_0x3b7c68(0x8d5)](_0x332cc6[_0x3b7c68(0x400)]||0x0,0x0),_0x3b4af2=_0x332cc6['easingType']||_0x3b7c68(0x662),_0x44e172=_0x332cc6[_0x3b7c68(0x817)],_0x4935c1=$gameScreen[_0x3b7c68(0x8dd)](_0x1ecb8c);if(!_0x4935c1)return;_0x4935c1[_0x3b7c68(0x5ed)](_0x5f0138,_0x31d097,_0x3b4af2);if(_0x44e172){const _0x22cedb=$gameTemp[_0x3b7c68(0x847)]();if(_0x22cedb)_0x22cedb[_0x3b7c68(0x41d)](_0x31d097);}}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],_0x5443f5(0x7c2),_0x219816=>{const _0x17b46d=_0x5443f5;VisuMZ['ConvertParams'](_0x219816,_0x219816);const _0x48d614=Math[_0x17b46d(0x558)](_0x219816[_0x17b46d(0x7dd)])['clamp'](0x1,0x64),_0x2d424e=_0x219816[_0x17b46d(0x446)],_0x49ba15=_0x2d424e['Origin'][_0x17b46d(0x19c)](0x0,0x1),_0x4444b7=Math[_0x17b46d(0x558)](_0x2d424e[_0x17b46d(0x35c)]||0x0),_0x16b576=Math['round'](_0x2d424e[_0x17b46d(0xed)]||0x0),_0x2fe43b=Math[_0x17b46d(0x558)](_0x2d424e['ScaleX']||0x0),_0x277217=Math[_0x17b46d(0x558)](_0x2d424e[_0x17b46d(0x986)]||0x0),_0x5973b7=Math['round'](_0x2d424e[_0x17b46d(0x6b0)])[_0x17b46d(0x19c)](0x0,0xff),_0x4f0272=_0x2d424e[_0x17b46d(0x496)],_0x4e9a95=_0x17b46d(0x6a6),_0x2d40e3=_0x219816['Smooth']?_0x17b46d(0x88e):_0x17b46d(0x5be),_0x20944d=_0x4e9a95[_0x17b46d(0x2d3)](_0x219816['IconIndex'],_0x2d40e3);$gameScreen[_0x17b46d(0x988)](_0x48d614,_0x20944d,_0x49ba15,_0x4444b7,_0x16b576,_0x2fe43b,_0x277217,_0x5973b7,_0x4f0272);}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],_0x5443f5(0x56b),_0x406ef7=>{const _0x4f56eb=_0x5443f5;VisuMZ[_0x4f56eb(0x53d)](_0x406ef7,_0x406ef7);const _0xb5d47a=_0x406ef7['Type']||_0x4f56eb(0x5bb),_0xda83f1=_0x406ef7[_0x4f56eb(0x247)]['clamp'](0x1,0x9),_0x50a90c=_0x406ef7[_0x4f56eb(0x395)][_0x4f56eb(0x19c)](0x1,0x9),_0x25deba=_0x406ef7[_0x4f56eb(0x400)]||0x1,_0x33d0d1=_0x406ef7[_0x4f56eb(0x817)];$gameScreen[_0x4f56eb(0x8a1)](_0xb5d47a),$gameScreen[_0x4f56eb(0x9bc)](_0xda83f1,_0x50a90c,_0x25deba);if(_0x33d0d1){const _0x38ac71=$gameTemp[_0x4f56eb(0x847)]();if(_0x38ac71)_0x38ac71[_0x4f56eb(0x41d)](_0x25deba);}}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],_0x5443f5(0x46b),_0x3397aa=>{const _0x296c2f=_0x5443f5;if($gameParty[_0x296c2f(0x59b)]())return;VisuMZ[_0x296c2f(0x53d)](_0x3397aa,_0x3397aa);const _0x58b4b4=_0x3397aa[_0x296c2f(0x466)],_0x2cd621=(_0x3397aa[_0x296c2f(0x5a2)]||0x0)/0x64;for(const _0x11eb2f of _0x58b4b4){if(_0x296c2f(0x578)==='USNkr'){const _0x2bfc66=Math[_0x296c2f(0x5bb)]()<=_0x2cd621;$gameSwitches['setValue'](_0x11eb2f,_0x2bfc66);}else _0x3dbfef[_0x296c2f(0x491)]('test')&&_0x553f56[_0x296c2f(0x425)][_0x296c2f(0x446)][_0x296c2f(0x5e6)][_0x296c2f(0x274)]?this[_0x296c2f(0x5bf)]():_0x21bd65[_0x296c2f(0x425)][_0x296c2f(0x4a7)][_0x296c2f(0x91b)](this);}}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],_0x5443f5(0x275),_0xf3ccce=>{const _0x5ae176=_0x5443f5;if($gameParty[_0x5ae176(0x59b)]())return;VisuMZ[_0x5ae176(0x53d)](_0xf3ccce,_0xf3ccce);const _0x400d44=Math[_0x5ae176(0x2cf)](_0xf3ccce['StartID'],_0xf3ccce[_0x5ae176(0x9e8)]),_0x373aad=Math['max'](_0xf3ccce[_0x5ae176(0x529)],_0xf3ccce['EndingID']),_0x53907c=(_0xf3ccce[_0x5ae176(0x5a2)]||0x0)/0x64;for(let _0xd0fd6e=_0x400d44;_0xd0fd6e<=_0x373aad;_0xd0fd6e++){if(_0x5ae176(0x9b3)!=='SxwrA'){const _0x4427c2=Math['random']()<=_0x53907c;$gameSwitches[_0x5ae176(0x1c1)](_0xd0fd6e,_0x4427c2);}else _0x3edef5+=_0xc80a3a,_0x15a418+=_0x16cd8a,_0x3e81bb+=_0x5ae176(0x20f)[_0x5ae176(0x2d3)](_0x71a6fd['id'],_0x9edbae[_0x5ae176(0x744)]),_0x200595+=_0x5a2b98,_0x2ff64a+=_0x294a34,_0x56e041+=_0x3abdb5,_0x1936cc+=_0x5ae176(0x7f5)['format'](_0x5902d7['id'],_0x7b80ed['name']),_0x3c4cec+=_0x40db35;}}),PluginManager['registerCommand'](pluginData[_0x5443f5(0x744)],'SwitchToggleOne',_0x58b646=>{const _0x53f2fd=_0x5443f5;if($gameParty[_0x53f2fd(0x59b)]())return;VisuMZ['ConvertParams'](_0x58b646,_0x58b646);const _0x243624=_0x58b646[_0x53f2fd(0x466)];for(const _0x18b83b of _0x243624){if(_0x53f2fd(0x6bf)==='YIviG'){if(!this[_0x53f2fd(0x37c)])return;for(const _0x1e45ad of this['_onceParallelInterpreters']){_0x1e45ad&&_0x1e45ad['update']();}}else{const _0x18e756=$gameSwitches['value'](_0x18b83b);$gameSwitches[_0x53f2fd(0x1c1)](_0x18b83b,!_0x18e756);}}}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],_0x5443f5(0x137),_0x5e5d64=>{const _0x2f61ee=_0x5443f5;if($gameParty[_0x2f61ee(0x59b)]())return;VisuMZ[_0x2f61ee(0x53d)](_0x5e5d64,_0x5e5d64);const _0x429a85=Math[_0x2f61ee(0x2cf)](_0x5e5d64[_0x2f61ee(0x529)],_0x5e5d64['EndingID']),_0x31b576=Math['max'](_0x5e5d64['StartID'],_0x5e5d64['EndingID']);for(let _0x215e62=_0x429a85;_0x215e62<=_0x31b576;_0x215e62++){const _0x1e186a=$gameSwitches['value'](_0x215e62);$gameSwitches[_0x2f61ee(0x1c1)](_0x215e62,!_0x1e186a);}}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],_0x5443f5(0x9b2),_0x340e46=>{const _0x23c5d0=_0x5443f5;VisuMZ[_0x23c5d0(0x53d)](_0x340e46,_0x340e46);const _0x214c5f=_0x340e46[_0x23c5d0(0x3aa)]||0x1;$gameSystem[_0x23c5d0(0x541)](_0x214c5f);}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],_0x5443f5(0x875),_0x1f5cc7=>{const _0x20addf=_0x5443f5;if($gameParty['inBattle']())return;VisuMZ[_0x20addf(0x53d)](_0x1f5cc7,_0x1f5cc7);const _0x515c5d=_0x1f5cc7[_0x20addf(0x3aa)];if(_0x515c5d['match'](/Front/i))'hheLI'===_0x20addf(0x9d2)?(this[_0x20addf(0x37c)]=this['_onceParallelInterpreters']||[],this[_0x20addf(0x37c)][_0x20addf(0x747)](_0x164013)):$gameSystem[_0x20addf(0x36c)](![]);else _0x515c5d[_0x20addf(0x8ee)](/Side/i)?$gameSystem[_0x20addf(0x36c)](!![]):$gameSystem[_0x20addf(0x36c)](!$gameSystem['isSideView']());}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],_0x5443f5(0x175),_0x34dbfb=>{const _0x145ede=_0x5443f5;if($gameParty['inBattle']())return;VisuMZ[_0x145ede(0x53d)](_0x34dbfb,_0x34dbfb);const _0x5959aa=[_0x145ede(0x680),_0x145ede(0x38f),'me','se'];for(const _0x41bdab of _0x5959aa){const _0x3328c7=_0x34dbfb[_0x41bdab],_0x49859d='%1/'[_0x145ede(0x2d3)](_0x41bdab);for(const _0x3699ef of _0x3328c7){'YciYm'!==_0x145ede(0x292)?(_0x200fa9[_0x145ede(0x425)]['Spriteset_Base_initialize'][_0x145ede(0x91b)](this),this['initMembersCoreEngine']()):AudioManager[_0x145ede(0x7c7)](_0x49859d,_0x3699ef);}}}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],_0x5443f5(0x22f),_0x471aa3=>{const _0x367906=_0x5443f5;if($gameParty[_0x367906(0x59b)]())return;VisuMZ[_0x367906(0x53d)](_0x471aa3,_0x471aa3);const _0x540539=[_0x367906(0x884),'battlebacks1',_0x367906(0x52f),'characters','enemies',_0x367906(0x719),'parallaxes',_0x367906(0x344),'sv_actors','sv_enemies',_0x367906(0x2f9),_0x367906(0x7f0),_0x367906(0x100),_0x367906(0x58a)];for(const _0x2fe8da of _0x540539){const _0x4e1133=_0x471aa3[_0x2fe8da],_0x510e2e='img/%1/'[_0x367906(0x2d3)](_0x2fe8da);for(const _0x20bbfc of _0x4e1133){ImageManager[_0x367906(0x203)](_0x510e2e,_0x20bbfc);}}}),PluginManager['registerCommand'](pluginData[_0x5443f5(0x744)],'SystemSetBattleSystem',_0x1808f4=>{const _0xbc97bf=_0x5443f5;if($gameParty[_0xbc97bf(0x59b)]())return;VisuMZ[_0xbc97bf(0x53d)](_0x1808f4,_0x1808f4);const _0x3905f7=_0x1808f4[_0xbc97bf(0x3aa)]['toUpperCase']()[_0xbc97bf(0x7b7)](),_0x276b08=VisuMZ[_0xbc97bf(0x425)][_0xbc97bf(0x9a4)](_0x3905f7);$gameSystem['setBattleSystem'](_0x276b08);}),VisuMZ['CoreEngine'][_0x5443f5(0x9a4)]=function(_0x34c0fa){const _0x3042ac=_0x5443f5;_0x34c0fa=_0x34c0fa||'DATABASE',_0x34c0fa=String(_0x34c0fa)[_0x3042ac(0x1ca)]()['trim']();switch(_0x34c0fa){case'DTB':return 0x0;case _0x3042ac(0xe5):if(Imported[_0x3042ac(0x981)]){if(_0x3042ac(0x880)!==_0x3042ac(0x880)){const _0x289d93=_0x76bd3d[_0x5f0612[_0x3042ac(0x23d)]],_0x3a1680=_0x259b91['targets'],_0x36bc84=_0x134f6f[_0x3042ac(0x3f0)],_0xa25172=_0x4dffdf['mute'];let _0x32c546=this[_0x3042ac(0x7ff)]();const _0x21d697=this[_0x3042ac(0x78d)]();if(this[_0x3042ac(0x798)](_0x289d93))for(const _0x200150 of _0x3a1680){this[_0x3042ac(0x9a8)]([_0x200150],_0x289d93,_0x36bc84,_0x32c546,_0xa25172),_0x32c546+=_0x21d697;}else this[_0x3042ac(0x9a8)](_0x3a1680,_0x289d93,_0x36bc84,_0x32c546,_0xa25172);}else ConfigManager[_0x3042ac(0x1fb)]=!![];}return 0x1;case _0x3042ac(0x201):Imported[_0x3042ac(0x981)]&&(ConfigManager['atbActive']=![]);return 0x2;case'CTB':if(Imported[_0x3042ac(0x443)]){if(_0x3042ac(0x309)!=='uUNbF')return'CTB';else _0x4384df[_0x3042ac(0x425)]['Scene_Base_create'][_0x3042ac(0x91b)](this),_0x535d7b=this;}break;case _0x3042ac(0x1b7):if(Imported[_0x3042ac(0x9c4)])return _0x3042ac(0x1b7);break;case'BTB':if(Imported[_0x3042ac(0x9ca)])return _0x3042ac(0x183);break;case _0x3042ac(0x819):if(Imported[_0x3042ac(0x112)]){if(_0x3042ac(0x382)!==_0x3042ac(0x382))this[_0x3042ac(0x9b6)][_0x3042ac(0x702)]>=0x18&&(this[_0x3042ac(0x9b6)][_0x3042ac(0x702)]-=0x6);else return _0x3042ac(0x819);}break;case _0x3042ac(0x46a):if(Imported[_0x3042ac(0x78b)]){if('lQMWB'===_0x3042ac(0x99e))_0x2d055e['visible']=this['isScrollBarVisible']()&&this[_0x3042ac(0x85d)]();else return _0x3042ac(0x46a);}break;case _0x3042ac(0x88b):if(Imported['VisuMZ_2_BattleSystemETB']){if(_0x3042ac(0x1f8)!==_0x3042ac(0x1f8))this[_0x3042ac(0x71a)](_0x3f0f16['list'],0x0);else return'ETB';}break;case _0x3042ac(0x456):if(Imported[_0x3042ac(0x858)])return'PTB';break;}return $dataSystem[_0x3042ac(0x94d)];},PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],_0x5443f5(0x765),_0x1fe73a=>{const _0x15c3af=_0x5443f5;VisuMZ[_0x15c3af(0x53d)](_0x1fe73a,_0x1fe73a);const _0x52ed2b=_0x1fe73a[_0x15c3af(0x3aa)]||0x1;$gameSystem[_0x15c3af(0x8b7)](_0x52ed2b);}),PluginManager['registerCommand'](pluginData[_0x5443f5(0x744)],_0x5443f5(0x947),_0x320442=>{const _0x474329=_0x5443f5;VisuMZ[_0x474329(0x53d)](_0x320442,_0x320442);const _0x2255dd=_0x320442['id']||0x1,_0x1f7e80=_0x320442[_0x474329(0x58d)],_0x304e4f=_0x320442[_0x474329(0x48d)]||0x0;let _0x31a34b=$gameVariables[_0x474329(0x408)](_0x2255dd)||0x0;switch(_0x1f7e80){case'=':_0x31a34b=_0x304e4f;break;case'+':_0x31a34b+=_0x304e4f;break;case'-':_0x31a34b-=_0x304e4f;break;case'*':_0x31a34b*=_0x304e4f;break;case'/':_0x31a34b/=_0x304e4f;break;case'%':_0x31a34b%=_0x304e4f;break;}_0x31a34b=_0x31a34b||0x0,$gameVariables['setValue'](_0x2255dd,_0x31a34b);}),PluginManager[_0x5443f5(0x559)](pluginData[_0x5443f5(0x744)],'VariableJsBlock',_0x401b7a=>{const _0x2023a1=_0x5443f5;VisuMZ[_0x2023a1(0x53d)](_0x401b7a,_0x401b7a);const _0x5a616b=_0x401b7a['id']()||0x1,_0x152571=_0x401b7a[_0x2023a1(0x58d)],_0x782954=_0x401b7a['operand']()||0x0;let _0x22dc8d=$gameVariables[_0x2023a1(0x408)](_0x5a616b)||0x0;switch(_0x152571){case'=':_0x22dc8d=_0x782954;break;case'+':_0x22dc8d+=_0x782954;break;case'-':_0x22dc8d-=_0x782954;break;case'*':_0x22dc8d*=_0x782954;break;case'/':_0x22dc8d/=_0x782954;break;case'%':_0x22dc8d%=_0x782954;break;}_0x22dc8d=_0x22dc8d||0x0,$gameVariables[_0x2023a1(0x1c1)](_0x5a616b,_0x22dc8d);}),VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x272)]=Scene_Boot['prototype'][_0x5443f5(0xd6)],Scene_Boot[_0x5443f5(0x353)][_0x5443f5(0xd6)]=function(){const _0x410ef3=_0x5443f5;VisuMZ[_0x410ef3(0x425)][_0x410ef3(0x272)]['call'](this),this[_0x410ef3(0x6a8)](),this[_0x410ef3(0x808)](),this[_0x410ef3(0x60c)](),this[_0x410ef3(0x256)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),this['process_VisuMZ_CoreEngine_ControllerButtons'](),VisuMZ[_0x410ef3(0x1af)]();},VisuMZ['CoreEngine'][_0x5443f5(0x76d)]={},Scene_Boot[_0x5443f5(0x353)]['process_VisuMZ_CoreEngine_RegExp']=function(){const _0x4a86fe=_0x5443f5,_0x190f97=[_0x4a86fe(0x60f),_0x4a86fe(0x5da),_0x4a86fe(0x32d),_0x4a86fe(0x5ec),'MAT','MDF',_0x4a86fe(0x579),_0x4a86fe(0x793)],_0x27009b=[_0x4a86fe(0x180),_0x4a86fe(0x782),_0x4a86fe(0x7c5),_0x4a86fe(0x423),_0x4a86fe(0x265),_0x4a86fe(0x4eb),_0x4a86fe(0x421),_0x4a86fe(0x164),'MRG',_0x4a86fe(0x5c5)],_0x1f38e0=['TGR',_0x4a86fe(0x2f2),_0x4a86fe(0x8ac),_0x4a86fe(0x5a0),'MCR',_0x4a86fe(0xef),'PDR','MDR',_0x4a86fe(0x2ae),_0x4a86fe(0x89a)],_0x3fd407=[_0x190f97,_0x27009b,_0x1f38e0],_0x13b16a=[_0x4a86fe(0x4b3),_0x4a86fe(0x5c1),_0x4a86fe(0x887),_0x4a86fe(0x173),_0x4a86fe(0x35a),'Rate1',_0x4a86fe(0x27e),_0x4a86fe(0x8e6),_0x4a86fe(0x16b),_0x4a86fe(0x958)];for(const _0x18269d of _0x3fd407){let _0x5babe7='';if(_0x18269d===_0x190f97)_0x5babe7=_0x4a86fe(0x1d2);if(_0x18269d===_0x27009b)_0x5babe7=_0x4a86fe(0x899);if(_0x18269d===_0x1f38e0)_0x5babe7=_0x4a86fe(0x1d0);for(const _0x100482 of _0x13b16a){let _0x3e252f=_0x4a86fe(0x135)[_0x4a86fe(0x2d3)](_0x5babe7,_0x100482);VisuMZ[_0x4a86fe(0x425)][_0x4a86fe(0x76d)][_0x3e252f]=[],VisuMZ[_0x4a86fe(0x425)][_0x4a86fe(0x76d)][_0x3e252f+'JS']=[];let _0x2c623d=_0x4a86fe(0x5c3);if([_0x4a86fe(0x4b3),_0x4a86fe(0x8e6)][_0x4a86fe(0x53a)](_0x100482))_0x2c623d+='([\x5c+\x5c-]\x5cd+)>';else{if(['Plus1','Flat1'][_0x4a86fe(0x53a)](_0x100482))_0x2c623d+=_0x4a86fe(0x6c3);else{if(['Plus2','Flat2'][_0x4a86fe(0x53a)](_0x100482))_0x4a86fe(0x8c5)===_0x4a86fe(0x6bd)?(_0x4612b9[_0x4a86fe(0x425)][_0x4a86fe(0x5e7)][_0x4a86fe(0x91b)](this),this[_0x4a86fe(0x190)]()):_0x2c623d+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';else{if(_0x100482===_0x4a86fe(0x173))_0x2c623d+=_0x4a86fe(0x76e);else{if(_0x100482==='Rate1'){if('ixYUr'!=='IzLaI')_0x2c623d+='(\x5cd+)([%％])>';else{this[_0x4a86fe(0x576)](),this['contents'][_0x4a86fe(0x63c)](),this[_0x4a86fe(0x9b6)][_0x4a86fe(0x702)]=_0x5bf466['CoreEngine'][_0x4a86fe(0x446)][_0x4a86fe(0x90e)][_0x4a86fe(0x571)];const _0x1867b2=_0x56e508[_0x4a86fe(0x425)]['Settings'][_0x4a86fe(0x90e)][_0x4a86fe(0x192)],_0x31ef9f=this[_0x4a86fe(0x4e0)](0x0);if(_0x1867b2>0x0){const _0x3a09e4=_0x31ef9f['y']+(this['lineHeight']()-_0x5a7d12['iconHeight'])/0x2;this['drawIcon'](_0x1867b2,_0x31ef9f['x'],_0x3a09e4);const _0x44cd48=_0x175917[_0x4a86fe(0x2bf)]+0x4;_0x31ef9f['x']+=_0x44cd48,_0x31ef9f[_0x4a86fe(0x786)]-=_0x44cd48;}this[_0x4a86fe(0x3de)](_0x2b6981['systemColor']()),this['drawText'](this['currencyUnit'](),_0x31ef9f['x'],_0x31ef9f['y'],_0x31ef9f[_0x4a86fe(0x786)],_0x4a86fe(0x824));const _0x17faae=this['textWidth'](this[_0x4a86fe(0x6e7)]())+0x6;;_0x31ef9f['x']+=_0x17faae,_0x31ef9f[_0x4a86fe(0x786)]-=_0x17faae,this[_0x4a86fe(0xdb)]();const _0x4c155c=this[_0x4a86fe(0x408)](),_0x2dac0a=this[_0x4a86fe(0x45b)](this[_0x4a86fe(0x4e1)]?_0x3ea4cb[_0x4a86fe(0x9a2)](this[_0x4a86fe(0x408)]()):this[_0x4a86fe(0x408)]());_0x2dac0a>_0x31ef9f[_0x4a86fe(0x786)]?this[_0x4a86fe(0x972)](_0x2d0614['CoreEngine'][_0x4a86fe(0x446)][_0x4a86fe(0x90e)][_0x4a86fe(0x5c8)],_0x31ef9f['x'],_0x31ef9f['y'],_0x31ef9f[_0x4a86fe(0x786)],_0x4a86fe(0x66d)):this[_0x4a86fe(0x972)](this[_0x4a86fe(0x408)](),_0x31ef9f['x'],_0x31ef9f['y'],_0x31ef9f[_0x4a86fe(0x786)],_0x4a86fe(0x66d)),this[_0x4a86fe(0x576)]();}}else{if(_0x100482===_0x4a86fe(0x27e)){if(_0x4a86fe(0x1e5)===_0x4a86fe(0x7da)){const _0x22d56a=_0x1e8e9e['CoreEngine'][_0x4a86fe(0x446)][_0x4a86fe(0x147)],_0x16aee1=_0x22d56a[_0x4a86fe(0x882)],_0x2584c7=this[_0x4a86fe(0x4f8)](_0x453996),_0x3b6849=this[_0x4a86fe(0x4f8)](_0x259a3d);return _0x16aee1[_0x4a86fe(0x2d3)](_0x2584c7,_0x3b6849);}else _0x2c623d+=_0x4a86fe(0x26b);}}}}}}for(const _0x4accf1 of _0x18269d){let _0x53fdc5=_0x100482['replace'](/[\d+]/g,'')['toUpperCase']();const _0x1a33e6=_0x2c623d['format'](_0x4accf1,_0x53fdc5);VisuMZ[_0x4a86fe(0x425)][_0x4a86fe(0x76d)][_0x3e252f][_0x4a86fe(0x747)](new RegExp(_0x1a33e6,'i'));const _0x2e6d52=_0x4a86fe(0x21c)['format'](_0x4accf1,_0x53fdc5);VisuMZ['CoreEngine'][_0x4a86fe(0x76d)][_0x3e252f+'JS'][_0x4a86fe(0x747)](new RegExp(_0x2e6d52,'i'));}}}},Scene_Boot['prototype'][_0x5443f5(0x808)]=function(){const _0x252659=_0x5443f5;if(VisuMZ[_0x252659(0x1af)])return;},Scene_Boot[_0x5443f5(0x353)][_0x5443f5(0x60c)]=function(){const _0x2aa7f5=_0x5443f5,_0x167a24=VisuMZ[_0x2aa7f5(0x425)][_0x2aa7f5(0x446)];if(_0x167a24[_0x2aa7f5(0x5e6)][_0x2aa7f5(0x872)]){if(_0x2aa7f5(0x78a)==='tRkCW')VisuMZ[_0x2aa7f5(0x943)](!![]);else{let _0x34c4c9=_0x2aa7f5(0x46f)+'\x0a';_0x34c4c9+=_0x2aa7f5(0x9ed)+'\x0a',_0x34c4c9+=_0x2aa7f5(0x572),this[_0x2aa7f5(0x511)]()?(_0x304829(_0x34c4c9),_0x445da3[_0x2aa7f5(0x849)]()):(_0x316418[_0x2aa7f5(0x653)](_0x34c4c9),!_0x370a7e[_0x2aa7f5(0x17c)]&&(_0x27a83d[_0x2aa7f5(0x17c)]=!![],_0x425a57['showDevTools']()));}}_0x167a24[_0x2aa7f5(0x5e6)][_0x2aa7f5(0x523)]&&(_0x2aa7f5(0x151)!==_0x2aa7f5(0x151)?(_0x3f06d2[_0x2aa7f5(0x425)][_0x2aa7f5(0x65c)][_0x2aa7f5(0x91b)](this,_0x3d6cbb,_0x2da531,_0x3ccb3c,_0x34cbca,_0x24d84c),this['markCoreEngineModified']()):(Input['keyMapper'][0x23]=_0x2aa7f5(0x1df),Input[_0x2aa7f5(0x7ed)][0x24]='home'));if(_0x167a24[_0x2aa7f5(0x147)]){const _0x7d3d37=_0x167a24[_0x2aa7f5(0x147)];_0x7d3d37[_0x2aa7f5(0x612)]=_0x7d3d37[_0x2aa7f5(0x612)]||_0x2aa7f5(0x468),_0x7d3d37[_0x2aa7f5(0x77f)]=_0x7d3d37[_0x2aa7f5(0x77f)]||_0x2aa7f5(0x2e3);}_0x167a24['KeyboardInput'][_0x2aa7f5(0x556)]&&(Input[_0x2aa7f5(0x7ed)][0x57]='up',Input[_0x2aa7f5(0x7ed)][0x41]=_0x2aa7f5(0x824),Input[_0x2aa7f5(0x7ed)][0x53]=_0x2aa7f5(0x86f),Input['keyMapper'][0x44]='right',Input[_0x2aa7f5(0x7ed)][0x45]=_0x2aa7f5(0x874)),_0x167a24[_0x2aa7f5(0x688)]['DashToggleR']&&(Input['keyMapper'][0x52]=_0x2aa7f5(0x98c)),_0x167a24['Param'][_0x2aa7f5(0x8ec)]=_0x167a24[_0x2aa7f5(0x36a)][_0x2aa7f5(0x8ec)][_0x2aa7f5(0x624)](_0x2169c7=>_0x2169c7['toUpperCase']()['trim']()),_0x167a24['Param']['ExtDisplayedParams']=_0x167a24[_0x2aa7f5(0x36a)][_0x2aa7f5(0x1ae)][_0x2aa7f5(0x624)](_0x25f37d=>_0x25f37d[_0x2aa7f5(0x1ca)]()['trim']()),_0x167a24[_0x2aa7f5(0x5e6)][_0x2aa7f5(0x5dd)]=_0x167a24[_0x2aa7f5(0x5e6)][_0x2aa7f5(0x5dd)]??!![],_0x167a24[_0x2aa7f5(0x5e6)][_0x2aa7f5(0x52a)]=_0x167a24[_0x2aa7f5(0x5e6)][_0x2aa7f5(0x52a)]??!![];},Scene_Boot[_0x5443f5(0x353)][_0x5443f5(0x256)]=function(){this['process_VisuMZ_CoreEngine_jsQuickFunctions']();},Scene_Boot[_0x5443f5(0x353)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x4f0c99=_0x5443f5,_0x47707f=VisuMZ[_0x4f0c99(0x425)][_0x4f0c99(0x446)]['jsQuickFunc'];for(const _0x1a4095 of _0x47707f){const _0x3be736=_0x1a4095[_0x4f0c99(0x775)][_0x4f0c99(0x6d0)](/[ ]/g,''),_0x48cb50=_0x1a4095[_0x4f0c99(0x4e3)];VisuMZ[_0x4f0c99(0x425)]['createJsQuickFunction'](_0x3be736,_0x48cb50);}},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x3eb)]=function(_0x1f8f39,_0x32c8ca){const _0x57562b=_0x5443f5;if(!!window[_0x1f8f39]){if(_0x57562b(0x246)===_0x57562b(0x545))this['_centerCameraCheck'][_0x57562b(0x584)]=!![],this[_0x57562b(0x61d)][_0x57562b(0x54c)]=_0xfaf8f6[_0x57562b(0x36e)]||0x0;else{if($gameTemp['isPlaytest']())console[_0x57562b(0x653)](_0x57562b(0x471)[_0x57562b(0x2d3)](_0x1f8f39));}}const _0x4b8ee8=_0x57562b(0xf7)[_0x57562b(0x2d3)](_0x1f8f39,_0x32c8ca);window[_0x1f8f39]=new Function(_0x4b8ee8);},Scene_Boot[_0x5443f5(0x353)]['process_VisuMZ_CoreEngine_CustomParameters']=function(){const _0x4a5c26=_0x5443f5,_0x4c27ae=VisuMZ[_0x4a5c26(0x425)]['Settings'][_0x4a5c26(0x1c9)];if(!_0x4c27ae)return;for(const _0x277280 of _0x4c27ae){if(!_0x277280)continue;VisuMZ[_0x4a5c26(0x425)][_0x4a5c26(0x640)](_0x277280);}},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0xf2)]={},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x47a)]={},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x143)]={},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x8db)]={},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x640)]=function(_0x48dfd8){const _0x2d7a18=_0x5443f5,_0x500130=_0x48dfd8[_0x2d7a18(0x224)],_0x19cf2d=_0x48dfd8[_0x2d7a18(0x6b7)],_0x128801=_0x48dfd8[_0x2d7a18(0x64b)],_0x28335c=_0x48dfd8[_0x2d7a18(0x8b2)],_0x492f06=new Function(_0x48dfd8[_0x2d7a18(0x259)]);VisuMZ[_0x2d7a18(0x425)][_0x2d7a18(0xf2)][_0x500130['toUpperCase']()[_0x2d7a18(0x7b7)]()]=_0x19cf2d,VisuMZ[_0x2d7a18(0x425)][_0x2d7a18(0x47a)][_0x500130[_0x2d7a18(0x1ca)]()[_0x2d7a18(0x7b7)]()]=_0x128801,VisuMZ[_0x2d7a18(0x425)][_0x2d7a18(0x143)][_0x500130['toUpperCase']()[_0x2d7a18(0x7b7)]()]=_0x28335c,VisuMZ['CoreEngine']['CustomParamAbb'][_0x500130[_0x2d7a18(0x1ca)]()[_0x2d7a18(0x7b7)]()]=_0x500130,Object[_0x2d7a18(0x14a)](Game_BattlerBase[_0x2d7a18(0x353)],_0x500130,{'get'(){const _0x275e91=_0x2d7a18,_0x1569f7=_0x492f06['call'](this);return _0x28335c==='integer'?Math[_0x275e91(0x558)](_0x1569f7):_0x1569f7;}});},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x1e9)]={},VisuMZ[_0x5443f5(0x425)]['ControllerMatches']={},Scene_Boot[_0x5443f5(0x353)][_0x5443f5(0x6ed)]=function(){const _0x9da9dd=_0x5443f5,_0x55aa81=VisuMZ[_0x9da9dd(0x425)][_0x9da9dd(0x446)][_0x9da9dd(0x1e9)];for(const _0x1008db of _0x55aa81){if(_0x9da9dd(0x4d6)==='aHLkj'){const _0xd266c=(_0x1008db['Name']||'')[_0x9da9dd(0x613)]()[_0x9da9dd(0x7b7)](),_0x4628aa=(_0x1008db[_0x9da9dd(0x87e)]||'')['toLowerCase']()[_0x9da9dd(0x7b7)]();VisuMZ['CoreEngine'][_0x9da9dd(0x1e9)][_0xd266c]=_0x1008db,VisuMZ[_0x9da9dd(0x425)][_0x9da9dd(0x160)][_0x4628aa]=_0xd266c;}else return 0x0;}},VisuMZ['ParseAllNotetags']=function(){const _0x34e587=_0x5443f5;for(const _0x32921f of $dataActors){if(_0x32921f)VisuMZ[_0x34e587(0x68a)](_0x32921f);}for(const _0x1d618a of $dataClasses){if(_0x1d618a)VisuMZ['ParseClassNotetags'](_0x1d618a);}for(const _0x274225 of $dataSkills){if('zOQNn'!==_0x34e587(0x9db)){if(_0x274225)VisuMZ[_0x34e587(0x5ac)](_0x274225);}else return this[_0x34e587(0x25d)]&&this[_0x34e587(0x25d)][_0x34e587(0x5ba)]?_0x2615ae['buttonAssistSwitch']:'';}for(const _0x3d9cbf of $dataItems){if(_0x34e587(0x39d)!==_0x34e587(0x7a4)){if(_0x3d9cbf)VisuMZ[_0x34e587(0x14d)](_0x3d9cbf);}else{const _0x1d22dd=this['_margin'],_0x320b77=_0x474c72[_0x34e587(0x8d5)](0x0,this[_0x34e587(0x826)]-_0x1d22dd*0x2),_0x1557eb=_0x4184b1[_0x34e587(0x8d5)](0x0,this['_height']-_0x1d22dd*0x2),_0x3b39e6=this['_backSprite'],_0x4967c7=_0x3b39e6[_0x34e587(0x9cd)][0x0];_0x3b39e6[_0x34e587(0x55f)]=this['_windowskin'],_0x3b39e6[_0x34e587(0x621)](0x0,0x0,0x60,0x60),_0x3b39e6[_0x34e587(0x26e)](_0x1d22dd,_0x1d22dd),_0x3b39e6[_0x34e587(0x3f2)]['x']=_0x320b77/0x60,_0x3b39e6[_0x34e587(0x3f2)]['y']=_0x1557eb/0x60,_0x4967c7['bitmap']=this[_0x34e587(0x1f3)],_0x4967c7['setFrame'](0x0,0x60,0x60,0x60),_0x4967c7[_0x34e587(0x26e)](0x0,0x0,_0x320b77,_0x1557eb),_0x4967c7[_0x34e587(0x3f2)]['x']=0x1/_0x3b39e6['scale']['x'],_0x4967c7[_0x34e587(0x3f2)]['y']=0x1/_0x3b39e6[_0x34e587(0x3f2)]['y'],_0x3b39e6[_0x34e587(0x62c)](this[_0x34e587(0x622)]);}}for(const _0x3f32ec of $dataWeapons){if(_0x3f32ec)VisuMZ[_0x34e587(0x599)](_0x3f32ec);}for(const _0x5a7c5f of $dataArmors){if(_0x34e587(0x78f)!==_0x34e587(0x9d3)){if(_0x5a7c5f)VisuMZ[_0x34e587(0x124)](_0x5a7c5f);}else this['_anchor']['x']=this[_0x34e587(0x8af)]['x'],this['_anchor']['y']=this[_0x34e587(0x8af)]['y'];}for(const _0x44df0e of $dataEnemies){if(_0x44df0e)VisuMZ['ParseEnemyNotetags'](_0x44df0e);}for(const _0x432687 of $dataStates){if(_0x432687)VisuMZ[_0x34e587(0x540)](_0x432687);}for(const _0x949438 of $dataTilesets){if(_0x949438)VisuMZ['ParseTilesetNotetags'](_0x949438);}},VisuMZ[_0x5443f5(0x68a)]=function(_0x4336b7){},VisuMZ['ParseClassNotetags']=function(_0x2195e0){},VisuMZ['ParseSkillNotetags']=function(_0x21beef){},VisuMZ['ParseItemNotetags']=function(_0x5c4938){},VisuMZ[_0x5443f5(0x599)]=function(_0x3b6b01){},VisuMZ[_0x5443f5(0x124)]=function(_0x4d6218){},VisuMZ[_0x5443f5(0x88f)]=function(_0x48f371){},VisuMZ[_0x5443f5(0x540)]=function(_0x551f12){},VisuMZ[_0x5443f5(0x34e)]=function(_0x8581a6){},VisuMZ['CoreEngine'][_0x5443f5(0x68a)]=VisuMZ[_0x5443f5(0x68a)],VisuMZ[_0x5443f5(0x68a)]=function(_0x2a5889){const _0x58a46e=_0x5443f5;VisuMZ[_0x58a46e(0x425)]['ParseActorNotetags'][_0x58a46e(0x91b)](this,_0x2a5889);const _0x28c03a=_0x2a5889['note'];if(_0x28c03a['match'](/<MAX LEVEL:[ ](\d+)>/i)){if(_0x58a46e(0x975)!==_0x58a46e(0x975))return[0x25,0x26,0x27,0x28][_0x58a46e(0x98a)](this[_0x58a46e(0x574)]);else{_0x2a5889[_0x58a46e(0x9aa)]=Number(RegExp['$1']);if(_0x2a5889[_0x58a46e(0x9aa)]===0x0)_0x2a5889['maxLevel']=Number[_0x58a46e(0x3ae)];}}_0x28c03a['match'](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x2a5889[_0x58a46e(0x4c3)]=Math[_0x58a46e(0x2cf)](Number(RegExp['$1']),_0x2a5889[_0x58a46e(0x9aa)]));},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x84f)]=VisuMZ[_0x5443f5(0x84f)],VisuMZ[_0x5443f5(0x84f)]=function(_0x37feee){const _0x5f2a86=_0x5443f5;VisuMZ[_0x5f2a86(0x425)][_0x5f2a86(0x84f)][_0x5f2a86(0x91b)](this,_0x37feee);if(_0x37feee[_0x5f2a86(0x5f6)]){if('QuPis'===_0x5f2a86(0x8ce))_0x48325e[_0x5f2a86(0x425)][_0x5f2a86(0x506)][_0x5f2a86(0x91b)](this);else for(const _0x2ef1cf of _0x37feee[_0x5f2a86(0x5f6)]){_0x2ef1cf[_0x5f2a86(0xe7)][_0x5f2a86(0x8ee)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x2ef1cf[_0x5f2a86(0x150)]=Math[_0x5f2a86(0x8d5)](Number(RegExp['$1']),0x1));}}},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x88f)]=VisuMZ[_0x5443f5(0x88f)],VisuMZ[_0x5443f5(0x88f)]=function(_0x1ad969){const _0x274945=_0x5443f5;VisuMZ[_0x274945(0x425)][_0x274945(0x88f)][_0x274945(0x91b)](this,_0x1ad969),_0x1ad969[_0x274945(0x150)]=0x1;const _0x36f4d5=_0x1ad969[_0x274945(0xe7)];if(_0x36f4d5[_0x274945(0x8ee)](/<LEVEL:[ ](\d+)>/i))_0x1ad969[_0x274945(0x150)]=Number(RegExp['$1']);if(_0x36f4d5[_0x274945(0x8ee)](/<MAXHP:[ ](\d+)>/i))_0x1ad969[_0x274945(0x4af)][0x0]=Number(RegExp['$1']);if(_0x36f4d5['match'](/<MAXMP:[ ](\d+)>/i))_0x1ad969['params'][0x1]=Number(RegExp['$1']);if(_0x36f4d5['match'](/<ATK:[ ](\d+)>/i))_0x1ad969[_0x274945(0x4af)][0x2]=Number(RegExp['$1']);if(_0x36f4d5['match'](/<DEF:[ ](\d+)>/i))_0x1ad969[_0x274945(0x4af)][0x3]=Number(RegExp['$1']);if(_0x36f4d5[_0x274945(0x8ee)](/<MAT:[ ](\d+)>/i))_0x1ad969['params'][0x4]=Number(RegExp['$1']);if(_0x36f4d5[_0x274945(0x8ee)](/<MDF:[ ](\d+)>/i))_0x1ad969[_0x274945(0x4af)][0x5]=Number(RegExp['$1']);if(_0x36f4d5[_0x274945(0x8ee)](/<AGI:[ ](\d+)>/i))_0x1ad969[_0x274945(0x4af)][0x6]=Number(RegExp['$1']);if(_0x36f4d5[_0x274945(0x8ee)](/<LUK:[ ](\d+)>/i))_0x1ad969[_0x274945(0x4af)][0x7]=Number(RegExp['$1']);if(_0x36f4d5[_0x274945(0x8ee)](/<EXP:[ ](\d+)>/i))_0x1ad969['exp']=Number(RegExp['$1']);if(_0x36f4d5[_0x274945(0x8ee)](/<GOLD:[ ](\d+)>/i))_0x1ad969[_0x274945(0x7d8)]=Number(RegExp['$1']);},VisuMZ['CoreEngine'][_0x5443f5(0x444)]=Graphics[_0x5443f5(0x532)],Graphics[_0x5443f5(0x532)]=function(){const _0x15eee9=_0x5443f5;switch(VisuMZ['CoreEngine'][_0x15eee9(0x446)][_0x15eee9(0x5e6)][_0x15eee9(0x484)]){case'stretch':return!![];case _0x15eee9(0x5bd):return![];default:return VisuMZ[_0x15eee9(0x425)][_0x15eee9(0x444)][_0x15eee9(0x91b)](this);}},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x441)]=Graphics[_0x5443f5(0xe1)],Graphics[_0x5443f5(0xe1)]=function(_0x42d749,_0x1eb46d,_0x51e566=null){const _0x18eb10=_0x5443f5;VisuMZ['CoreEngine'][_0x18eb10(0x441)]['call'](this,_0x42d749,_0x1eb46d,_0x51e566),VisuMZ[_0x18eb10(0x943)](![]);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x647)]=Graphics[_0x5443f5(0x48a)],Graphics[_0x5443f5(0x48a)]=function(_0xad582d){const _0x3ad7f6=_0x5443f5;VisuMZ[_0x3ad7f6(0x425)][_0x3ad7f6(0x647)][_0x3ad7f6(0x91b)](this,_0xad582d),this[_0x3ad7f6(0x5f4)](_0xad582d);},Graphics[_0x5443f5(0x5f4)]=function(_0x4a8434){const _0x173dbe=_0x5443f5;VisuMZ[_0x173dbe(0x425)]['Settings'][_0x173dbe(0x5e6)][_0x173dbe(0x3be)]&&(_0x4a8434['style']['font-smooth']=_0x173dbe(0x337));if(VisuMZ['CoreEngine'][_0x173dbe(0x446)][_0x173dbe(0x5e6)][_0x173dbe(0x8a6)]){if('HROJX'==='HROJX')_0x4a8434[_0x173dbe(0x684)][_0x173dbe(0x70e)]='pixelated';else return _0xbdd84c[_0x173dbe(0x425)][_0x173dbe(0x904)][_0x173dbe(0x91b)](this);}const _0x3a6a6e=Math['max'](0x0,Math[_0x173dbe(0x3fa)](_0x4a8434[_0x173dbe(0x786)]*this[_0x173dbe(0x922)])),_0x37bb5a=Math[_0x173dbe(0x8d5)](0x0,Math['floor'](_0x4a8434[_0x173dbe(0x99b)]*this['_realScale']));_0x4a8434['style'][_0x173dbe(0x786)]=_0x3a6a6e+'px',_0x4a8434['style'][_0x173dbe(0x99b)]=_0x37bb5a+'px';},VisuMZ['CoreEngine'][_0x5443f5(0x7f1)]=Bitmap[_0x5443f5(0x353)][_0x5443f5(0x131)],Bitmap[_0x5443f5(0x353)][_0x5443f5(0x131)]=function(_0x5b0819,_0x47dcab){const _0x4a3267=_0x5443f5;VisuMZ[_0x4a3267(0x425)]['Bitmap_initialize'][_0x4a3267(0x91b)](this,_0x5b0819,_0x47dcab),this['_smooth']=!(VisuMZ[_0x4a3267(0x425)]['Settings'][_0x4a3267(0x5e6)][_0x4a3267(0x8a6)]??!![]);},Bitmap[_0x5443f5(0x353)]['markCoreEngineModified']=function(){this['_customModified']=!![];},VisuMZ['CoreEngine']['Sprite_destroy']=Sprite[_0x5443f5(0x353)]['destroy'],Sprite[_0x5443f5(0x353)][_0x5443f5(0x683)]=function(){const _0x52fcf2=_0x5443f5;if(this[_0x52fcf2(0x476)])VisuMZ[_0x52fcf2(0x425)][_0x52fcf2(0x764)][_0x52fcf2(0x91b)](this);this[_0x52fcf2(0x263)]();},Sprite[_0x5443f5(0x353)][_0x5443f5(0x263)]=function(){const _0x503fde=_0x5443f5;if(!this['bitmap'])return;if(!this[_0x503fde(0x55f)][_0x503fde(0x711)])return;this['bitmap'][_0x503fde(0x202)]&&!this['_bitmap']['_baseTexture'][_0x503fde(0x783)]&&this[_0x503fde(0x55f)][_0x503fde(0x683)]();},VisuMZ[_0x5443f5(0x425)]['Bitmap_resize']=Bitmap[_0x5443f5(0x353)]['resize'],Bitmap[_0x5443f5(0x353)][_0x5443f5(0x2ab)]=function(_0x37b6e9,_0x3e72a7){const _0xca6c1e=_0x5443f5;VisuMZ[_0xca6c1e(0x425)][_0xca6c1e(0x30e)][_0xca6c1e(0x91b)](this,_0x37b6e9,_0x3e72a7),this[_0xca6c1e(0x68d)]();},VisuMZ[_0x5443f5(0x425)]['Bitmap_blt']=Bitmap[_0x5443f5(0x353)][_0x5443f5(0x409)],Bitmap[_0x5443f5(0x353)]['blt']=function(_0x150c9a,_0x57a173,_0xeb9af1,_0x2009a1,_0xa9d6db,_0x588c43,_0x1b4284,_0x11ee63,_0x3b4fe3){const _0x1b3729=_0x5443f5;_0x57a173=Math['round'](_0x57a173),_0xeb9af1=Math[_0x1b3729(0x558)](_0xeb9af1),_0x2009a1=Math[_0x1b3729(0x558)](_0x2009a1),_0xa9d6db=Math[_0x1b3729(0x558)](_0xa9d6db),_0x588c43=Math[_0x1b3729(0x558)](_0x588c43),_0x1b4284=Math['round'](_0x1b4284),VisuMZ[_0x1b3729(0x425)]['Bitmap_blt']['call'](this,_0x150c9a,_0x57a173,_0xeb9af1,_0x2009a1,_0xa9d6db,_0x588c43,_0x1b4284,_0x11ee63,_0x3b4fe3),this[_0x1b3729(0x68d)]();},VisuMZ['CoreEngine'][_0x5443f5(0x3a5)]=Bitmap['prototype'][_0x5443f5(0x3c2)],Bitmap[_0x5443f5(0x353)][_0x5443f5(0x3c2)]=function(_0x2538ca,_0x4781b6,_0xe411db,_0x355932){const _0x14165b=_0x5443f5;VisuMZ[_0x14165b(0x425)][_0x14165b(0x3a5)][_0x14165b(0x91b)](this,_0x2538ca,_0x4781b6,_0xe411db,_0x355932),this['markCoreEngineModified']();},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x65c)]=Bitmap['prototype'][_0x5443f5(0x1e1)],Bitmap[_0x5443f5(0x353)][_0x5443f5(0x1e1)]=function(_0x579bae,_0x3fae57,_0x1893fb,_0x2c7b0f,_0x64f5ec){const _0x259627=_0x5443f5;VisuMZ[_0x259627(0x425)][_0x259627(0x65c)]['call'](this,_0x579bae,_0x3fae57,_0x1893fb,_0x2c7b0f,_0x64f5ec),this['markCoreEngineModified']();},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x7bd)]=Bitmap['prototype']['strokeRect'],Bitmap[_0x5443f5(0x353)][_0x5443f5(0x7a1)]=function(_0x5aa00e,_0x5b4ccc,_0x2a2013,_0x4854b7,_0x2af870){const _0x4fd7e9=_0x5443f5;VisuMZ[_0x4fd7e9(0x425)][_0x4fd7e9(0x7bd)][_0x4fd7e9(0x91b)](this,_0x5aa00e,_0x5b4ccc,_0x2a2013,_0x4854b7,_0x2af870),this[_0x4fd7e9(0x68d)]();},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x7a9)]=Bitmap[_0x5443f5(0x353)][_0x5443f5(0x645)],Bitmap[_0x5443f5(0x353)][_0x5443f5(0x645)]=function(_0x321b4a,_0x4cc98b,_0x4a1a58,_0x4cfbaa,_0x47f723,_0x366e66,_0x524791){const _0x46d3ed=_0x5443f5;VisuMZ[_0x46d3ed(0x425)][_0x46d3ed(0x7a9)]['call'](this,_0x321b4a,_0x4cc98b,_0x4a1a58,_0x4cfbaa,_0x47f723,_0x366e66,_0x524791),this['markCoreEngineModified']();},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x266)]=Bitmap['prototype'][_0x5443f5(0x569)],Bitmap[_0x5443f5(0x353)]['drawCircle']=function(_0x3183ab,_0x18b8ed,_0x58d412,_0x5c43f4){const _0x4f7995=_0x5443f5;_0x3183ab=Math[_0x4f7995(0x558)](_0x3183ab),_0x18b8ed=Math[_0x4f7995(0x558)](_0x18b8ed),_0x58d412=Math[_0x4f7995(0x558)](_0x58d412),VisuMZ[_0x4f7995(0x425)][_0x4f7995(0x266)][_0x4f7995(0x91b)](this,_0x3183ab,_0x18b8ed,_0x58d412,_0x5c43f4),this[_0x4f7995(0x68d)]();},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x281)]=Bitmap[_0x5443f5(0x353)][_0x5443f5(0x2b8)],Bitmap['prototype'][_0x5443f5(0x2b8)]=function(_0x1ce5ad){const _0x22672e=_0x5443f5;return Math[_0x22672e(0x474)](VisuMZ['CoreEngine'][_0x22672e(0x281)][_0x22672e(0x91b)](this,_0x1ce5ad));},VisuMZ['CoreEngine'][_0x5443f5(0x638)]=Bitmap[_0x5443f5(0x353)][_0x5443f5(0x972)],Bitmap[_0x5443f5(0x353)][_0x5443f5(0x972)]=function(_0x1be938,_0x2746cf,_0x326e1e,_0x4e74b6,_0x25df68,_0x3a719e){const _0x129845=_0x5443f5;_0x2746cf=Math[_0x129845(0x558)](_0x2746cf),_0x326e1e=Math[_0x129845(0x558)](_0x326e1e),_0x4e74b6=Math['round'](_0x4e74b6),_0x25df68=Math[_0x129845(0x558)](_0x25df68),VisuMZ[_0x129845(0x425)][_0x129845(0x638)][_0x129845(0x91b)](this,_0x1be938,_0x2746cf,_0x326e1e,_0x4e74b6,_0x25df68,_0x3a719e),this['markCoreEngineModified']();},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x209)]=Bitmap[_0x5443f5(0x353)][_0x5443f5(0x907)],Bitmap[_0x5443f5(0x353)]['_drawTextOutline']=function(_0x496d62,_0x102901,_0x21b20e,_0xa17f73){const _0x2495d3=_0x5443f5;if(VisuMZ[_0x2495d3(0x425)]['Settings'][_0x2495d3(0x5e6)][_0x2495d3(0x40e)]){if('LhbNr'===_0x2495d3(0x287)){const _0x114668=_0x2a29da(_0x51684b['$1']);if(_0x114668['match'](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x2495d3(0x1d8)]='FV';else _0x114668[_0x2495d3(0x8ee)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x2495d3(0x1d8)]='SV');}else this[_0x2495d3(0x1ef)](_0x496d62,_0x102901,_0x21b20e,_0xa17f73);}else{if('MJOaS'==='gfLGz'){if(!_0x5ee38d[_0x2495d3(0x970)])return;if(!_0x42f046['_scene']['_spriteset'])return;_0x457679[_0x2495d3(0x53d)](_0x1bb45e,_0x45b636);const _0x833a3=_0x26580f['round'](_0x3fc6ba['pointX']),_0x378282=_0x12e62f['round'](_0x51c484[_0x2495d3(0x839)]);_0x2aa2a4[_0x2495d3(0x480)](_0x833a3,_0x378282,_0x375818[_0x2495d3(0x4e6)],_0x4ae712[_0x2495d3(0x12e)],_0x386c2d[_0x2495d3(0x595)]);}else VisuMZ['CoreEngine'][_0x2495d3(0x209)][_0x2495d3(0x91b)](this,_0x496d62,_0x102901,_0x21b20e,_0xa17f73);}},Bitmap['prototype'][_0x5443f5(0x1ef)]=function(_0x3a75fb,_0x3e1b55,_0x2ad268,_0x46c68d){const _0x589101=_0x5443f5,_0x26c40b=this['context'];_0x26c40b[_0x589101(0x27c)]=this['outlineColor'],_0x26c40b[_0x589101(0x7e8)](_0x3a75fb,_0x3e1b55+0x2,_0x2ad268+0x2,_0x46c68d);},VisuMZ['CoreEngine'][_0x5443f5(0x4ca)]=Input[_0x5443f5(0x63c)],Input['clear']=function(){const _0x1deeb1=_0x5443f5;VisuMZ['CoreEngine'][_0x1deeb1(0x4ca)]['call'](this),this[_0x1deeb1(0x1be)]=undefined,this[_0x1deeb1(0x574)]=undefined,this['_gamepadWait']=Input[_0x1deeb1(0x926)];},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x96a)]=Input[_0x5443f5(0x5f3)],Input[_0x5443f5(0x5f3)]=function(){const _0x1c4c20=_0x5443f5;VisuMZ[_0x1c4c20(0x425)][_0x1c4c20(0x96a)][_0x1c4c20(0x91b)](this);if(this['_gamepadWait'])this[_0x1c4c20(0x20d)]--;},VisuMZ['CoreEngine'][_0x5443f5(0x672)]=Input[_0x5443f5(0x6cf)],Input[_0x5443f5(0x6cf)]=function(){const _0x1169f5=_0x5443f5;if(this[_0x1169f5(0x20d)])return;VisuMZ['CoreEngine'][_0x1169f5(0x672)][_0x1169f5(0x91b)](this);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x8a9)]=Input[_0x5443f5(0x823)],Input[_0x5443f5(0x823)]=function(){const _0x3cd903=_0x5443f5;VisuMZ[_0x3cd903(0x425)][_0x3cd903(0x8a9)][_0x3cd903(0x91b)](this),document['addEventListener'](_0x3cd903(0x158),this[_0x3cd903(0x945)][_0x3cd903(0x2ed)](this));},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x8bf)]=Input[_0x5443f5(0x238)],Input[_0x5443f5(0x238)]=function(_0x50ebec){const _0x13eb67=_0x5443f5;this[_0x13eb67(0x574)]=_0x50ebec[_0x13eb67(0x464)],VisuMZ['CoreEngine'][_0x13eb67(0x8bf)][_0x13eb67(0x91b)](this,_0x50ebec),this[_0x13eb67(0x3c9)](null);},Input[_0x5443f5(0x945)]=function(_0x55bd92){this['_registerKeyInput'](_0x55bd92);},Input[_0x5443f5(0x325)]=function(_0x1f34c6){const _0x4e72d0=_0x5443f5;this['_inputSpecialKeyCode']=_0x1f34c6[_0x4e72d0(0x464)];let _0x25049d=String['fromCharCode'](_0x1f34c6['charCode']);if(this[_0x4e72d0(0x1be)]===undefined){if('sbyqK'===_0x4e72d0(0x635)){if(_0x2f13ef===_0xbf9a60&&_0x3aebeb%0x1===0x0)return _0x52b24f;if(_0x30ac03!==_0x5333ae&&[_0x4e72d0(0x60f),_0x4e72d0(0x5da),'ATK','DEF',_0x4e72d0(0x1d7),_0x4e72d0(0x420),_0x4e72d0(0x579),_0x4e72d0(0x793)][_0x4e72d0(0x53a)](_0x31ea49(_0x29bc03)[_0x4e72d0(0x1ca)]()['trim']()))return _0x2385a4;_0x2b530b=_0xb4320a||0x0;if(_0x28c516[_0x4e72d0(0x425)][_0x4e72d0(0x8db)][_0xddb13f])return _0x59ba81[_0x4e72d0(0x425)]['CustomParamType'][_0x51155c]===_0x4e72d0(0x531)?_0x3bff21:_0x1128e8((_0x4c310b*0x64)[_0x4e72d0(0x564)](_0x1a02c2))+'%';return _0x24659b((_0x211aad*0x64)['toFixed'](_0x16c845))+'%';}else this[_0x4e72d0(0x1be)]=_0x25049d;}else'iVfUJ'!==_0x4e72d0(0x101)?(this[_0x4e72d0(0x998)]&&(_0x41666c=_0x374863['makeDeepCopy'](_0x1a6dac),_0x3fc968['se']&&(_0x1ce606['se'][_0x4e72d0(0x61e)]=0x0)),_0x38ddbd[_0x4e72d0(0x425)][_0x4e72d0(0x7be)][_0x4e72d0(0x91b)](this,_0x5b1855)):this[_0x4e72d0(0x1be)]+=_0x25049d;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x2fa)]=Input[_0x5443f5(0x3f8)],Input[_0x5443f5(0x3f8)]=function(_0x30b432){const _0x3a5f24=_0x5443f5;if(_0x30b432===0x8)return![];return VisuMZ['CoreEngine']['Input_shouldPreventDefault'][_0x3a5f24(0x91b)](this,_0x30b432);},Input[_0x5443f5(0x454)]=function(_0x2e548d){const _0x106b08=_0x5443f5;if(_0x2e548d['match'](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0x2e548d[_0x106b08(0x8ee)](/enter/i))return this[_0x106b08(0x574)]===0xd;if(_0x2e548d[_0x106b08(0x8ee)](/escape/i))return this[_0x106b08(0x574)]===0x1b;},Input[_0x5443f5(0x89c)]=function(){const _0x16311a=_0x5443f5;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x16311a(0x98a)](this[_0x16311a(0x574)]);},Input['isArrowPressed']=function(){const _0x58b6cb=_0x5443f5;return[0x25,0x26,0x27,0x28]['contains'](this[_0x58b6cb(0x574)]);},Input['isGamepadConnected']=function(){const _0x16c45f=_0x5443f5;if(navigator[_0x16c45f(0x5a3)]){if(_0x16c45f(0x8ef)!==_0x16c45f(0x8ef))this['removePointAnimation'](_0x420f33);else{const _0x221415=navigator['getGamepads']();if(_0x221415)for(const _0x22a102 of _0x221415){if(_0x16c45f(0x703)===_0x16c45f(0x703)){if(_0x22a102&&_0x22a102[_0x16c45f(0x304)])return!![];}else _0x199044=this[_0x16c45f(0x2d4)]();}}}return![];},Input[_0x5443f5(0x2b0)]=function(){const _0x6ce553=_0x5443f5;if(navigator[_0x6ce553(0x5a3)]){if(_0x6ce553(0x708)===_0x6ce553(0x708)){const _0x4b59d0=navigator[_0x6ce553(0x5a3)]();if(_0x4b59d0)for(const _0x1094d2 of _0x4b59d0){if(_0x1094d2&&_0x1094d2[_0x6ce553(0x304)]){if(_0x6ce553(0x910)==='jTCXi')_0x4b8bf2[_0x6ce553(0x425)][_0x6ce553(0x5e5)]['call'](this),this[_0x6ce553(0x60d)](this['_maxDigits']-0x1),_0x3ac92c[_0x6ce553(0x63c)]();else{if(this[_0x6ce553(0x3a7)](_0x1094d2))return!![];if(this[_0x6ce553(0x18a)](_0x1094d2))return!![];}}}}else this[_0x6ce553(0x9b6)][_0x6ce553(0x702)]+=0x6;}return![];},Input[_0x5443f5(0x3a7)]=function(_0x1e988e){const _0x1c3b77=_0x5443f5,_0x54a8a2=_0x1e988e[_0x1c3b77(0x18d)];for(let _0x3f69be=0x0;_0x3f69be<_0x54a8a2['length'];_0x3f69be++){if(_0x1c3b77(0x4bc)!==_0x1c3b77(0x4bc))_0x2d0644[_0x1c3b77(0x425)][_0x1c3b77(0x3ba)][_0x1c3b77(0x91b)](this,_0x2654b7);else{if(_0x54a8a2[_0x3f69be][_0x1c3b77(0x228)])return!![];}}return![];},Input[_0x5443f5(0x18a)]=function(_0x4636a3){const _0x4aec5f=_0x4636a3['axes'],_0x4cc6a1=0.5;if(_0x4aec5f[0x0]<-_0x4cc6a1)return!![];if(_0x4aec5f[0x0]>_0x4cc6a1)return!![];if(_0x4aec5f[0x1]<-_0x4cc6a1)return!![];if(_0x4aec5f[0x1]>_0x4cc6a1)return!![];return![];},Input[_0x5443f5(0x726)]=function(){const _0x28ed24=_0x5443f5;return this[_0x28ed24(0x580)]||null;},Input[_0x5443f5(0x3c9)]=function(_0x3ef52e){this['_lastGamepad']=_0x3ef52e;},VisuMZ['CoreEngine'][_0x5443f5(0x6f5)]=Input[_0x5443f5(0x4ac)],Input['_updateGamepadState']=function(_0x29d860){const _0x3c6d10=_0x5443f5;VisuMZ[_0x3c6d10(0x425)][_0x3c6d10(0x6f5)][_0x3c6d10(0x91b)](this,_0x29d860),(this[_0x3c6d10(0x3a7)](_0x29d860)||this[_0x3c6d10(0x18a)](_0x29d860))&&this[_0x3c6d10(0x3c9)](_0x29d860);},Input[_0x5443f5(0xf5)]=function(){const _0x3f7f4e=_0x5443f5;return this['_lastGamepad']?this['_lastGamepad']['id']:_0x3f7f4e(0x610);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x696)]=Tilemap['prototype'][_0x5443f5(0x295)],Tilemap[_0x5443f5(0x353)]['_addShadow']=function(_0x3c17e9,_0x3886e3,_0x9a6048,_0x2f6582){const _0x21bc95=_0x5443f5;if($gameMap&&$gameMap[_0x21bc95(0x863)]())return;VisuMZ[_0x21bc95(0x425)][_0x21bc95(0x696)][_0x21bc95(0x91b)](this,_0x3c17e9,_0x3886e3,_0x9a6048,_0x2f6582);},Tilemap[_0x5443f5(0x87d)]['prototype'][_0x5443f5(0x3ee)]=function(){const _0x5e141b=_0x5443f5;this['_destroyInternalTextures']();for(let _0x144fb2=0x0;_0x144fb2<Tilemap[_0x5e141b(0x522)][_0x5e141b(0x4de)];_0x144fb2++){const _0x113414=new PIXI[(_0x5e141b(0x1ab))]();_0x113414['setSize'](0x800,0x800);if(VisuMZ['CoreEngine'][_0x5e141b(0x446)][_0x5e141b(0x5e6)]['PixelateImageRendering']){if(_0x5e141b(0x9ea)===_0x5e141b(0x9ea))_0x113414[_0x5e141b(0x4c7)]=PIXI['SCALE_MODES'][_0x5e141b(0x7c0)];else{if(this['centerCameraCheckData']()[_0x5e141b(0x8b4)]&&_0x1d4467[_0x5e141b(0x360)]()===0x1){this[_0x5e141b(0x71c)]=this[_0x5e141b(0x1a2)]()[_0x5e141b(0x2a3)];return;}_0x4b73c7[_0x5e141b(0x425)][_0x5e141b(0x509)][_0x5e141b(0x91b)](this,_0x211a50);}}this[_0x5e141b(0x3ab)][_0x5e141b(0x747)](_0x113414);}},WindowLayer['prototype'][_0x5443f5(0x5fb)]=function(){const _0x177379=_0x5443f5;return SceneManager&&SceneManager['_scene']?SceneManager[_0x177379(0x970)][_0x177379(0x6e1)]():_0x177379(0x1e4)===_0x177379(0x56a)?_0x4b7ba7[_0x177379(0x425)][_0x177379(0x446)][_0x177379(0x134)][_0x177379(0x7e1)]:!![];},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x9be)]=WindowLayer[_0x5443f5(0x353)]['render'],WindowLayer[_0x5443f5(0x353)][_0x5443f5(0x5d3)]=function render(_0x21e7ea){const _0x48f3bf=_0x5443f5;if(this[_0x48f3bf(0x5fb)]()){if(_0x48f3bf(0x8f2)!==_0x48f3bf(0x163))VisuMZ['CoreEngine'][_0x48f3bf(0x9be)][_0x48f3bf(0x91b)](this,_0x21e7ea);else return _0x260524[_0x48f3bf(0x6aa)][_0x48f3bf(0x27d)][_0x48f3bf(0x91b)](this);}else this[_0x48f3bf(0x3d6)](_0x21e7ea);},WindowLayer['prototype']['renderNoMask']=function render(_0x1e93c4){const _0x55c4e9=_0x5443f5;if(!this['visible'])return;const _0x29d3f6=new PIXI['Graphics'](),_0x1182f2=_0x1e93c4['gl'],_0x313ae8=this[_0x55c4e9(0x9cd)][_0x55c4e9(0x526)]();_0x1e93c4[_0x55c4e9(0x4d8)][_0x55c4e9(0x714)](),_0x29d3f6[_0x55c4e9(0x49a)]=this[_0x55c4e9(0x49a)],_0x1e93c4[_0x55c4e9(0x1f6)][_0x55c4e9(0x11d)](),_0x1182f2[_0x55c4e9(0x6a2)](_0x1182f2[_0x55c4e9(0x2fd)]);while(_0x313ae8[_0x55c4e9(0x44d)]>0x0){const _0x204a47=_0x313ae8[_0x55c4e9(0x11a)]();_0x204a47[_0x55c4e9(0x176)]&&_0x204a47[_0x55c4e9(0x5ba)]&&_0x204a47[_0x55c4e9(0x394)]>0x0&&(_0x55c4e9(0x5b5)===_0x55c4e9(0x7bb)?(_0x5bd601[_0x55c4e9(0x425)][_0x55c4e9(0x242)][_0x55c4e9(0x91b)](this),this['updatePictureSettings'](),this[_0x55c4e9(0x6b3)](),this[_0x55c4e9(0x299)](),this['updatePointAnimations']()):(_0x1182f2[_0x55c4e9(0x900)](_0x1182f2[_0x55c4e9(0x3ec)],0x0,~0x0),_0x1182f2['stencilOp'](_0x1182f2[_0x55c4e9(0x5f1)],_0x1182f2['KEEP'],_0x1182f2[_0x55c4e9(0x5f1)]),_0x204a47[_0x55c4e9(0x5d3)](_0x1e93c4),_0x1e93c4[_0x55c4e9(0x1f6)][_0x55c4e9(0x11d)](),_0x29d3f6['clear'](),_0x1182f2[_0x55c4e9(0x900)](_0x1182f2[_0x55c4e9(0x3ea)],0x1,~0x0),_0x1182f2[_0x55c4e9(0x24c)](_0x1182f2[_0x55c4e9(0x916)],_0x1182f2[_0x55c4e9(0x916)],_0x1182f2[_0x55c4e9(0x916)]),_0x1182f2['blendFunc'](_0x1182f2[_0x55c4e9(0xfb)],_0x1182f2['ONE']),_0x29d3f6['render'](_0x1e93c4),_0x1e93c4[_0x55c4e9(0x1f6)]['flush'](),_0x1182f2['blendFunc'](_0x1182f2[_0x55c4e9(0x625)],_0x1182f2['ONE_MINUS_SRC_ALPHA'])));}_0x1182f2[_0x55c4e9(0x912)](_0x1182f2[_0x55c4e9(0x2fd)]),_0x1182f2[_0x55c4e9(0x63c)](_0x1182f2[_0x55c4e9(0x51b)]),_0x1182f2[_0x55c4e9(0x8ab)](0x0),_0x1e93c4[_0x55c4e9(0x1f6)][_0x55c4e9(0x11d)]();for(const _0x454c7a of this[_0x55c4e9(0x9cd)]){if(_0x55c4e9(0x627)===_0x55c4e9(0x627))!_0x454c7a[_0x55c4e9(0x176)]&&_0x454c7a[_0x55c4e9(0x5ba)]&&(_0x55c4e9(0x197)!==_0x55c4e9(0x445)?_0x454c7a[_0x55c4e9(0x5d3)](_0x1e93c4):(_0x8e0beb[_0x55c4e9(0x61e)]=_0x412822,_0xcc6741[_0x55c4e9(0x982)]=_0x4fa770[_0x55c4e9(0x4ae)]['seek'](),_0x3224c8[_0x55c4e9(0x7ab)](_0x312aa9),_0x2b4e6d['playBgm'](_0x360852,_0x172106[_0x55c4e9(0x982)]),_0x87842d[_0x55c4e9(0x4ae)][_0x55c4e9(0x4d0)](_0x17fc0e[_0x55c4e9(0x982)])));else{if(_0x49e9f3[_0x55c4e9(0x6e7)]!==this['currencyUnit']())return![];return _0xae1804[_0x55c4e9(0x425)][_0x55c4e9(0x446)][_0x55c4e9(0x90e)]['ItemStyle'];}}_0x1e93c4[_0x55c4e9(0x1f6)][_0x55c4e9(0x11d)]();},DataManager[_0x5443f5(0x6c5)]=function(_0xa300b9){const _0x3ec920=_0x5443f5;return this['isItem'](_0xa300b9)&&_0xa300b9[_0x3ec920(0x1fa)]===0x2;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x4dc)]=DataManager[_0x5443f5(0x118)],DataManager[_0x5443f5(0x118)]=function(){const _0x274c4a=_0x5443f5;VisuMZ['CoreEngine'][_0x274c4a(0x4dc)][_0x274c4a(0x91b)](this),this[_0x274c4a(0x733)](),this[_0x274c4a(0x5d2)]();},DataManager[_0x5443f5(0x733)]=function(){const _0x1596d4=_0x5443f5;if($gameTemp[_0x1596d4(0x6b1)]()){if(_0x1596d4(0x56c)===_0x1596d4(0x56c)){const _0x4650b0=VisuMZ[_0x1596d4(0x425)][_0x1596d4(0x446)][_0x1596d4(0x5e6)][_0x1596d4(0x3e0)];if(_0x4650b0>0x0)$gameTemp['reserveCommonEvent'](_0x4650b0);}else{var _0x273df1=_0x6217da(_0x47740c['$1']);try{_0xb066ae=_0x4b5df2[_0x1596d4(0x8d5)](_0x4e7c70,_0xa222e8(_0x2781d6(_0x273df1)));}catch(_0x429d3d){if(_0x26174f[_0x1596d4(0x6b1)]())_0x1987d0['log'](_0x429d3d);}}}},DataManager[_0x5443f5(0x5d2)]=function(){const _0x52493f=_0x5443f5,_0x3627e9=VisuMZ[_0x52493f(0x425)][_0x52493f(0x446)][_0x52493f(0x5e6)]['NewGameCommonEventAll']||0x0;if(_0x3627e9>0x0)$gameTemp[_0x52493f(0x21e)](_0x3627e9);},DataManager[_0x5443f5(0x21a)]=function(_0x431e02){const _0x32d612=_0x5443f5,_0x4ce8f1=$dataTroops[_0x431e02];if(!_0x4ce8f1)return'';let _0xc3142f='';_0xc3142f+=_0x4ce8f1[_0x32d612(0x744)];for(const _0x1396dd of _0x4ce8f1[_0x32d612(0x296)]){for(const _0x243613 of _0x1396dd['list']){[0x6c,0x198][_0x32d612(0x53a)](_0x243613[_0x32d612(0x8d8)])&&(_0x32d612(0x45a)===_0x32d612(0x45a)?(_0xc3142f+='\x0a',_0xc3142f+=_0x243613[_0x32d612(0x2f6)][0x0]):(_0x83572d[_0x32d612(0x425)][_0x32d612(0x92a)][_0x32d612(0x91b)](this),this[_0x32d612(0x414)]()));}}return _0xc3142f;};(VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x446)][_0x5443f5(0x5e6)]['ShortcutScripts']??!![])&&($scene=null,VisuMZ['CoreEngine']['Scene_Base_create']=Scene_Base[_0x5443f5(0x353)]['create'],Scene_Base[_0x5443f5(0x353)]['create']=function(){const _0x1966a9=_0x5443f5;VisuMZ[_0x1966a9(0x425)][_0x1966a9(0x4c1)]['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x5443f5(0x425)]['Scene_Map_createSpriteset']=Scene_Map[_0x5443f5(0x353)][_0x5443f5(0x257)],Scene_Map[_0x5443f5(0x353)][_0x5443f5(0x257)]=function(){const _0x505350=_0x5443f5;VisuMZ['CoreEngine'][_0x505350(0x217)][_0x505350(0x91b)](this),$spriteset=this[_0x505350(0x881)];},VisuMZ['CoreEngine'][_0x5443f5(0x9bb)]=Scene_Battle[_0x5443f5(0x353)][_0x5443f5(0x257)],Scene_Battle[_0x5443f5(0x353)]['createSpriteset']=function(){const _0x3e1317=_0x5443f5;VisuMZ[_0x3e1317(0x425)][_0x3e1317(0x9bb)][_0x3e1317(0x91b)](this),$spriteset=this[_0x3e1317(0x881)];},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x646)]=Scene_Base[_0x5443f5(0x353)][_0x5443f5(0xea)],Scene_Base[_0x5443f5(0x353)][_0x5443f5(0xea)]=function(){const _0x21c17a=_0x5443f5;VisuMZ[_0x21c17a(0x425)][_0x21c17a(0x646)][_0x21c17a(0x91b)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ['CoreEngine'][_0x5443f5(0x385)]=BattleManager[_0x5443f5(0x5f3)],BattleManager[_0x5443f5(0x5f3)]=function(_0x49a16e){const _0x50c63f=_0x5443f5;VisuMZ[_0x50c63f(0x425)][_0x50c63f(0x385)]['call'](this,_0x49a16e),$subject=this[_0x50c63f(0x440)],$targets=this[_0x50c63f(0x787)],$target=this[_0x50c63f(0x74c)]||this[_0x50c63f(0x787)][0x0];},$event=null,VisuMZ[_0x5443f5(0x425)]['Game_Event_start']=Game_Event['prototype']['start'],Game_Event[_0x5443f5(0x353)][_0x5443f5(0x6ee)]=function(){const _0x23893e=_0x5443f5;VisuMZ[_0x23893e(0x425)][_0x23893e(0x2c1)][_0x23893e(0x91b)](this),$event=this;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x302)]=Scene_Map[_0x5443f5(0x353)][_0x5443f5(0x5f3)],Scene_Map[_0x5443f5(0x353)][_0x5443f5(0x5f3)]=function(){const _0x919454=_0x5443f5;VisuMZ[_0x919454(0x425)][_0x919454(0x302)][_0x919454(0x91b)](this),$gameMap[_0x919454(0x20e)]();},Game_Map[_0x5443f5(0x353)][_0x5443f5(0x20e)]=function(){const _0x1ae838=_0x5443f5;!this[_0x1ae838(0x5aa)]()&&$event!==null&&($event=null);},$commonEvent=function(_0xbdb9fe){const _0x424da7=_0x5443f5;if($gameTemp)$gameTemp[_0x424da7(0x21e)](_0xbdb9fe);},$onceParallel=function(_0x5b8524){const _0x5526a8=_0x5443f5;if(SceneManager['isSceneMap']())$scene[_0x5526a8(0x8cd)](_0x5b8524);else{if(SceneManager[_0x5526a8(0x378)]()){if(Imported[_0x5526a8(0x9f2)])'hntEj'!==_0x5526a8(0x99a)?$scene[_0x5526a8(0x8cd)](_0x5b8524):_0x435f1e[_0x5526a8(0x78b)]&&(this[_0x5526a8(0x1e7)]='OTB');else $gameTemp&&$gameTemp[_0x5526a8(0x6b1)]()&&alert(_0x5526a8(0x8bc));}else $gameTemp&&$gameTemp[_0x5526a8(0x6b1)]()&&alert(_0x5526a8(0x1d3));}});;StorageManager[_0x5443f5(0x88a)]=function(_0x2601a0){return new Promise((_0x56871d,_0x49bb1c)=>{const _0x6a1ca9=_0x5572;try{if(_0x6a1ca9(0x73c)!==_0x6a1ca9(0x4c8)){const _0x556fff=pako[_0x6a1ca9(0x204)](_0x2601a0,{'to':_0x6a1ca9(0x21f),'level':0x1});if(_0x556fff[_0x6a1ca9(0x44d)]>=0xc350){}_0x56871d(_0x556fff);}else _0x4ffe60[_0x6a1ca9(0x519)]=![],_0x536c2a[_0x6a1ca9(0x9b9)]=!![];}catch(_0x4ca21c){_0x49bb1c(_0x4ca21c);}});},TextManager[_0x5443f5(0x9b8)]=['','','',_0x5443f5(0x5d9),'','','HELP','',_0x5443f5(0x85b),_0x5443f5(0x725),'','',_0x5443f5(0x268),_0x5443f5(0x97a),_0x5443f5(0x729),'',_0x5443f5(0x769),'CTRL',_0x5443f5(0x9e9),_0x5443f5(0x5cd),_0x5443f5(0x2e0),_0x5443f5(0x686),_0x5443f5(0x5ce),_0x5443f5(0x3a2),_0x5443f5(0x604),_0x5443f5(0x5dc),'',_0x5443f5(0x8c1),_0x5443f5(0x16d),_0x5443f5(0x93b),_0x5443f5(0x22d),'MODECHANGE','SPACE',_0x5443f5(0x2aa),_0x5443f5(0x674),_0x5443f5(0x146),_0x5443f5(0x4bd),'LEFT','UP','RIGHT',_0x5443f5(0x9c9),'SELECT',_0x5443f5(0x829),_0x5443f5(0x7ba),'PRINTSCREEN',_0x5443f5(0x430),_0x5443f5(0x71e),'','0','1','2','3','4','5','6','7','8','9','COLON',_0x5443f5(0x3e1),'LESS_THAN','EQUALS','GREATER_THAN',_0x5443f5(0x185),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x5443f5(0x1b4),'','CONTEXT_MENU','',_0x5443f5(0x902),_0x5443f5(0x5e0),'NUMPAD1','NUMPAD2',_0x5443f5(0x138),_0x5443f5(0x3bf),_0x5443f5(0x56d),_0x5443f5(0x181),_0x5443f5(0x54f),_0x5443f5(0x317),_0x5443f5(0x761),_0x5443f5(0x670),_0x5443f5(0x9d4),_0x5443f5(0x6ca),_0x5443f5(0x55e),'DECIMAL',_0x5443f5(0x771),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x5443f5(0x54e),'F11',_0x5443f5(0x4b4),'F13','F14',_0x5443f5(0x79f),_0x5443f5(0x6e5),_0x5443f5(0x42b),_0x5443f5(0x5d4),'F19',_0x5443f5(0x3cf),_0x5443f5(0x788),'F22',_0x5443f5(0x6ad),'F24','','','','','','','','',_0x5443f5(0x996),_0x5443f5(0x327),'WIN_OEM_FJ_JISHO',_0x5443f5(0x7f9),_0x5443f5(0x8a5),_0x5443f5(0x478),_0x5443f5(0x218),'','','','','','','','','',_0x5443f5(0x6de),_0x5443f5(0x417),_0x5443f5(0x447),'HASH',_0x5443f5(0x740),_0x5443f5(0x7cf),_0x5443f5(0x667),_0x5443f5(0x293),'OPEN_PAREN',_0x5443f5(0xd4),'ASTERISK',_0x5443f5(0x4a2),'PIPE',_0x5443f5(0x38b),_0x5443f5(0x343),_0x5443f5(0x7de),_0x5443f5(0x934),'','','','','VOLUME_MUTE',_0x5443f5(0x598),_0x5443f5(0x35b),'','','SEMICOLON',_0x5443f5(0x82f),_0x5443f5(0x5b0),_0x5443f5(0x2ef),_0x5443f5(0x65d),_0x5443f5(0x43e),_0x5443f5(0x3d0),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x5443f5(0x8b0),'BACK_SLASH',_0x5443f5(0x583),_0x5443f5(0x7ca),'','META',_0x5443f5(0x297),'','WIN_ICO_HELP',_0x5443f5(0x467),'',_0x5443f5(0x6fb),'','',_0x5443f5(0x7b0),_0x5443f5(0x5c2),_0x5443f5(0x603),'WIN_OEM_PA2',_0x5443f5(0x1c6),_0x5443f5(0x59d),_0x5443f5(0x216),_0x5443f5(0x5a5),_0x5443f5(0x51d),'WIN_OEM_COPY','WIN_OEM_AUTO','WIN_OEM_ENLW',_0x5443f5(0x3e9),_0x5443f5(0x8ae),_0x5443f5(0x791),'EXSEL',_0x5443f5(0x7d6),_0x5443f5(0x5f9),_0x5443f5(0x3d7),'',_0x5443f5(0x44b),_0x5443f5(0x465),''],TextManager[_0x5443f5(0x759)]=VisuMZ['CoreEngine'][_0x5443f5(0x446)][_0x5443f5(0x147)][_0x5443f5(0x4ab)],TextManager[_0x5443f5(0x17a)]=VisuMZ['CoreEngine'][_0x5443f5(0x446)]['ButtonAssist'][_0x5443f5(0x2b6)],TextManager[_0x5443f5(0x876)]=VisuMZ['CoreEngine'][_0x5443f5(0x446)][_0x5443f5(0x147)]['SwitchActorText'],VisuMZ['CoreEngine']['TextManager_param']=TextManager['param'],TextManager['param']=function(_0x5bcd84){const _0x2479ad=_0x5443f5;if(typeof _0x5bcd84==='number'){if('TbVXe'!==_0x2479ad(0x864))return VisuMZ['CoreEngine'][_0x2479ad(0x1e2)][_0x2479ad(0x91b)](this,_0x5bcd84);else _0x1c7739[_0x2479ad(0x425)]['Input_setupEventHandlers'][_0x2479ad(0x91b)](this),_0x1ba4c4[_0x2479ad(0x950)](_0x2479ad(0x158),this[_0x2479ad(0x945)][_0x2479ad(0x2ed)](this));}else return this['paramName'](_0x5bcd84);},TextManager[_0x5443f5(0x1ed)]=function(_0x2d265f){const _0x36d62f=_0x5443f5;_0x2d265f=String(_0x2d265f||'')[_0x36d62f(0x1ca)]();const _0x103722=VisuMZ[_0x36d62f(0x425)][_0x36d62f(0x446)][_0x36d62f(0x36a)];if(_0x2d265f===_0x36d62f(0x60f))return $dataSystem[_0x36d62f(0x404)][_0x36d62f(0x4af)][0x0];if(_0x2d265f===_0x36d62f(0x5da))return $dataSystem['terms'][_0x36d62f(0x4af)][0x1];if(_0x2d265f===_0x36d62f(0x32d))return $dataSystem[_0x36d62f(0x404)][_0x36d62f(0x4af)][0x2];if(_0x2d265f===_0x36d62f(0x5ec))return $dataSystem['terms'][_0x36d62f(0x4af)][0x3];if(_0x2d265f==='MAT')return $dataSystem[_0x36d62f(0x404)]['params'][0x4];if(_0x2d265f===_0x36d62f(0x420))return $dataSystem['terms'][_0x36d62f(0x4af)][0x5];if(_0x2d265f===_0x36d62f(0x579))return $dataSystem[_0x36d62f(0x404)][_0x36d62f(0x4af)][0x6];if(_0x2d265f==='LUK')return $dataSystem[_0x36d62f(0x404)][_0x36d62f(0x4af)][0x7];if(_0x2d265f===_0x36d62f(0x180))return _0x103722[_0x36d62f(0x8f1)];if(_0x2d265f===_0x36d62f(0x782))return _0x103722[_0x36d62f(0x9a1)];if(_0x2d265f===_0x36d62f(0x7c5))return _0x103722[_0x36d62f(0x9c2)];if(_0x2d265f==='CEV')return _0x103722[_0x36d62f(0x96c)];if(_0x2d265f===_0x36d62f(0x265))return _0x103722['XParamVocab4'];if(_0x2d265f===_0x36d62f(0x4eb))return _0x103722[_0x36d62f(0x1bd)];if(_0x2d265f===_0x36d62f(0x421))return _0x103722[_0x36d62f(0x87b)];if(_0x2d265f===_0x36d62f(0x164))return _0x103722[_0x36d62f(0x330)];if(_0x2d265f===_0x36d62f(0x90d))return _0x103722[_0x36d62f(0x717)];if(_0x2d265f===_0x36d62f(0x5c5))return _0x103722['XParamVocab9'];if(_0x2d265f===_0x36d62f(0x64a))return _0x103722[_0x36d62f(0x78c)];if(_0x2d265f===_0x36d62f(0x2f2))return _0x103722[_0x36d62f(0x68e)];if(_0x2d265f===_0x36d62f(0x8ac))return _0x103722['SParamVocab2'];if(_0x2d265f==='PHA')return _0x103722['SParamVocab3'];if(_0x2d265f===_0x36d62f(0x830))return _0x103722[_0x36d62f(0x6b5)];if(_0x2d265f==='TCR')return _0x103722['SParamVocab5'];if(_0x2d265f===_0x36d62f(0x413))return _0x103722[_0x36d62f(0x937)];if(_0x2d265f===_0x36d62f(0x47d))return _0x103722[_0x36d62f(0x8e0)];if(_0x2d265f===_0x36d62f(0x2ae))return _0x103722[_0x36d62f(0x1b9)];if(_0x2d265f===_0x36d62f(0x89a))return _0x103722[_0x36d62f(0x44f)];if(VisuMZ[_0x36d62f(0x425)][_0x36d62f(0xf2)][_0x2d265f])return VisuMZ[_0x36d62f(0x425)][_0x36d62f(0xf2)][_0x2d265f];return'';},TextManager['getInputButtonString']=function(_0x60ccd8){const _0x52c9d8=_0x5443f5,_0x21b45f=Input[_0x52c9d8(0xf5)]();return _0x21b45f===_0x52c9d8(0x610)?_0x52c9d8(0x5f2)===_0x52c9d8(0x5f2)?this[_0x52c9d8(0x62b)](_0x60ccd8):_0xbfc4bb[_0x52c9d8(0x6aa)]['ItemRect'][_0x52c9d8(0x91b)](this):this[_0x52c9d8(0x634)](_0x21b45f,_0x60ccd8);},TextManager[_0x5443f5(0x62b)]=function(_0x2ab1e8){const _0x388e69=_0x5443f5,_0x14ec22=VisuMZ[_0x388e69(0x425)][_0x388e69(0x446)][_0x388e69(0x147)]['SplitEscape'];if(!_0x14ec22){if(_0x388e69(0x59a)!==_0x388e69(0x59a))return _0x2291ff[_0x388e69(0x789)]||_0x388e69(0x789);else{if(_0x2ab1e8===_0x388e69(0x1d5))_0x2ab1e8=_0x388e69(0x264);if(_0x2ab1e8==='menu')_0x2ab1e8='escape';}}let _0x542bbc=[];for(let _0x5f0f7b in Input['keyMapper']){_0x5f0f7b=Number(_0x5f0f7b);if(_0x5f0f7b>=0x60&&_0x5f0f7b<=0x69)continue;if([0x12,0x20]['includes'](_0x5f0f7b))continue;_0x2ab1e8===Input['keyMapper'][_0x5f0f7b]&&('jkviU'===_0x388e69(0x411)?_0x482a10=_0x388e69(0x7b6)[_0x388e69(0x2d3)](_0x4f7521,_0x588a99):_0x542bbc[_0x388e69(0x747)](_0x5f0f7b));}for(let _0xbd647c=0x0;_0xbd647c<_0x542bbc[_0x388e69(0x44d)];_0xbd647c++){if(_0x388e69(0x8f6)===_0x388e69(0x157))return 0x1;else _0x542bbc[_0xbd647c]=TextManager[_0x388e69(0x9b8)][_0x542bbc[_0xbd647c]];}return this[_0x388e69(0xe4)](_0x542bbc);},TextManager['makeInputButtonString']=function(_0x5c50a9){const _0x1efdc7=_0x5443f5,_0xd504ae=VisuMZ['CoreEngine'][_0x1efdc7(0x446)][_0x1efdc7(0x147)],_0x2b2e9e=_0xd504ae['KeyUnlisted'],_0x1876f7=_0x5c50a9[_0x1efdc7(0x8f3)](),_0x14c96b=_0x1efdc7(0x8d4)[_0x1efdc7(0x2d3)](_0x1876f7);return _0xd504ae[_0x14c96b]?_0xd504ae[_0x14c96b]:_0x2b2e9e[_0x1efdc7(0x2d3)](_0x1876f7);},TextManager[_0x5443f5(0x678)]=function(_0xed366a,_0x57fc59){const _0x4abf79=_0x5443f5,_0x234f25=VisuMZ[_0x4abf79(0x425)][_0x4abf79(0x446)]['ButtonAssist'],_0xbf6529=_0x234f25['MultiKeyFmt'],_0x5f0604=this[_0x4abf79(0x4f8)](_0xed366a),_0x4c9045=this[_0x4abf79(0x4f8)](_0x57fc59);return _0xbf6529[_0x4abf79(0x2d3)](_0x5f0604,_0x4c9045);},TextManager[_0x5443f5(0x634)]=function(_0x5a979e,_0x5d9d44){const _0x4650f1=_0x5443f5,_0x218d68=_0x5a979e[_0x4650f1(0x613)]()[_0x4650f1(0x7b7)](),_0x566161=VisuMZ['CoreEngine'][_0x4650f1(0x1e9)][_0x218d68];if(!_0x566161)return this[_0x4650f1(0x1e0)](_0x5a979e,_0x5d9d44);return _0x566161[_0x5d9d44]||this[_0x4650f1(0x62b)](_0x5a979e,_0x5d9d44);},TextManager[_0x5443f5(0x1e0)]=function(_0x183eb3,_0x21d195){const _0xf6d164=_0x5443f5,_0x39a836=_0x183eb3[_0xf6d164(0x613)]()[_0xf6d164(0x7b7)]();for(const _0x238da0 in VisuMZ[_0xf6d164(0x425)][_0xf6d164(0x160)]){if(_0x39a836['includes'](_0x238da0)){const _0x27e126=VisuMZ['CoreEngine'][_0xf6d164(0x160)][_0x238da0],_0xd7bb47=VisuMZ[_0xf6d164(0x425)][_0xf6d164(0x1e9)][_0x27e126];return _0xd7bb47[_0x21d195]||this[_0xf6d164(0x62b)](_0x21d195);}}return this['getKeyboardInputButtonString'](_0x21d195);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x4a5)]=ColorManager[_0x5443f5(0xec)],ColorManager[_0x5443f5(0xec)]=function(){const _0x2b61c0=_0x5443f5;VisuMZ[_0x2b61c0(0x425)][_0x2b61c0(0x4a5)][_0x2b61c0(0x91b)](this),this[_0x2b61c0(0x436)]=this[_0x2b61c0(0x436)]||{};},ColorManager[_0x5443f5(0x713)]=function(_0x232703,_0x504de4){const _0x2656cd=_0x5443f5;return _0x504de4=String(_0x504de4),this['_colorCache']=this['_colorCache']||{},_0x504de4[_0x2656cd(0x8ee)](/#(.*)/i)?this['_colorCache'][_0x232703]='#%1'[_0x2656cd(0x2d3)](String(RegExp['$1'])):this[_0x2656cd(0x436)][_0x232703]=this[_0x2656cd(0x3b7)](Number(_0x504de4)),this[_0x2656cd(0x436)][_0x232703];},ColorManager[_0x5443f5(0xeb)]=function(_0xa2fde5){const _0x54652b=_0x5443f5;_0xa2fde5=String(_0xa2fde5);if(_0xa2fde5[_0x54652b(0x8ee)](/#(.*)/i)){if(_0x54652b(0x2d7)!==_0x54652b(0x2d7)){const _0x4077dc=_0x5f46be[_0x54652b(0x970)];if(!_0x4077dc)return;!_0x4077dc[_0x54652b(0x5e3)]&&(_0x1fe449['playLoad'](),_0x4077dc[_0x54652b(0x5e3)]=new _0x3b8fe9(),_0x4077dc[_0x54652b(0x83f)](_0x4077dc['_pictureCoordinatesWindow'])),_0x5bf28e[_0x54652b(0x334)]===_0x9cefe8&&(_0x4b627d[_0x54652b(0x240)](),_0x4077dc[_0x54652b(0x14c)](_0x4077dc[_0x54652b(0x5e3)]),_0x4077dc[_0x54652b(0x5e3)]=_0x5b223f);}else return _0x54652b(0x282)[_0x54652b(0x2d3)](String(RegExp['$1']));}else return this[_0x54652b(0x3b7)](Number(_0xa2fde5));},ColorManager[_0x5443f5(0x133)]=function(){this['_colorCache']={};},ColorManager['normalColor']=function(){const _0x3bb3b4=_0x5443f5,_0x47e256=_0x3bb3b4(0x4c2);this[_0x3bb3b4(0x436)]=this[_0x3bb3b4(0x436)]||{};if(this['_colorCache'][_0x47e256])return this[_0x3bb3b4(0x436)][_0x47e256];const _0x2b4dbc=VisuMZ[_0x3bb3b4(0x425)][_0x3bb3b4(0x446)][_0x3bb3b4(0x134)]['ColorNormal'];return this[_0x3bb3b4(0x713)](_0x47e256,_0x2b4dbc);},ColorManager[_0x5443f5(0x68c)]=function(){const _0x34d313=_0x5443f5,_0x1931ab=_0x34d313(0x619);this[_0x34d313(0x436)]=this['_colorCache']||{};if(this[_0x34d313(0x436)][_0x1931ab])return this['_colorCache'][_0x1931ab];const _0x27a7d5=VisuMZ['CoreEngine'][_0x34d313(0x446)]['Color'][_0x34d313(0x723)];return this[_0x34d313(0x713)](_0x1931ab,_0x27a7d5);},ColorManager['crisisColor']=function(){const _0x1f439c=_0x5443f5,_0x354fda=_0x1f439c(0x36f);this[_0x1f439c(0x436)]=this[_0x1f439c(0x436)]||{};if(this['_colorCache'][_0x354fda])return this[_0x1f439c(0x436)][_0x354fda];const _0x294440=VisuMZ[_0x1f439c(0x425)][_0x1f439c(0x446)][_0x1f439c(0x134)][_0x1f439c(0x38d)];return this[_0x1f439c(0x713)](_0x354fda,_0x294440);},ColorManager[_0x5443f5(0x358)]=function(){const _0x206a72=_0x5443f5,_0x30a6a7=_0x206a72(0x772);this[_0x206a72(0x436)]=this[_0x206a72(0x436)]||{};if(this['_colorCache'][_0x30a6a7])return this[_0x206a72(0x436)][_0x30a6a7];const _0x204ea8=VisuMZ[_0x206a72(0x425)]['Settings']['Color'][_0x206a72(0x83b)];return this[_0x206a72(0x713)](_0x30a6a7,_0x204ea8);},ColorManager['gaugeBackColor']=function(){const _0x599318=_0x5443f5,_0x13ad14='_stored_gaugeBackColor';this[_0x599318(0x436)]=this[_0x599318(0x436)]||{};if(this[_0x599318(0x436)][_0x13ad14])return this[_0x599318(0x436)][_0x13ad14];const _0x496219=VisuMZ[_0x599318(0x425)]['Settings'][_0x599318(0x134)][_0x599318(0x620)];return this[_0x599318(0x713)](_0x13ad14,_0x496219);},ColorManager[_0x5443f5(0x9e7)]=function(){const _0x4a9d31=_0x5443f5,_0x4357d4=_0x4a9d31(0x8b5);this[_0x4a9d31(0x436)]=this[_0x4a9d31(0x436)]||{};if(this[_0x4a9d31(0x436)][_0x4357d4])return this[_0x4a9d31(0x436)][_0x4357d4];const _0x35c041=VisuMZ[_0x4a9d31(0x425)][_0x4a9d31(0x446)][_0x4a9d31(0x134)][_0x4a9d31(0x225)];return this[_0x4a9d31(0x713)](_0x4357d4,_0x35c041);},ColorManager['hpGaugeColor2']=function(){const _0x3e9378=_0x5443f5,_0x5b6ab0='_stored_hpGaugeColor2';this[_0x3e9378(0x436)]=this[_0x3e9378(0x436)]||{};if(this[_0x3e9378(0x436)][_0x5b6ab0])return this[_0x3e9378(0x436)][_0x5b6ab0];const _0x5a9630=VisuMZ[_0x3e9378(0x425)][_0x3e9378(0x446)][_0x3e9378(0x134)]['ColorHPGauge2'];return this[_0x3e9378(0x713)](_0x5b6ab0,_0x5a9630);},ColorManager['mpGaugeColor1']=function(){const _0x396508=_0x5443f5,_0x46fc28=_0x396508(0x188);this['_colorCache']=this['_colorCache']||{};if(this[_0x396508(0x436)][_0x46fc28])return this[_0x396508(0x436)][_0x46fc28];const _0x4f7361=VisuMZ[_0x396508(0x425)]['Settings'][_0x396508(0x134)][_0x396508(0x516)];return this['getColorDataFromPluginParameters'](_0x46fc28,_0x4f7361);},ColorManager[_0x5443f5(0x15f)]=function(){const _0x1e0b6c=_0x5443f5,_0x33defa=_0x1e0b6c(0x42f);this[_0x1e0b6c(0x436)]=this[_0x1e0b6c(0x436)]||{};if(this[_0x1e0b6c(0x436)][_0x33defa])return this['_colorCache'][_0x33defa];const _0x3152a1=VisuMZ[_0x1e0b6c(0x425)]['Settings'][_0x1e0b6c(0x134)][_0x1e0b6c(0x5c7)];return this[_0x1e0b6c(0x713)](_0x33defa,_0x3152a1);},ColorManager[_0x5443f5(0x2cb)]=function(){const _0x17c5a7=_0x5443f5,_0x58828d=_0x17c5a7(0x277);this[_0x17c5a7(0x436)]=this[_0x17c5a7(0x436)]||{};if(this['_colorCache'][_0x58828d])return this[_0x17c5a7(0x436)][_0x58828d];const _0x5be01e=VisuMZ['CoreEngine'][_0x17c5a7(0x446)][_0x17c5a7(0x134)][_0x17c5a7(0x429)];return this[_0x17c5a7(0x713)](_0x58828d,_0x5be01e);},ColorManager['powerUpColor']=function(){const _0x4b055a=_0x5443f5,_0x27a000=_0x4b055a(0x33a);this[_0x4b055a(0x436)]=this['_colorCache']||{};if(this[_0x4b055a(0x436)][_0x27a000])return this['_colorCache'][_0x27a000];const _0x1e6daf=VisuMZ[_0x4b055a(0x425)][_0x4b055a(0x446)]['Color'][_0x4b055a(0x39c)];return this[_0x4b055a(0x713)](_0x27a000,_0x1e6daf);},ColorManager[_0x5443f5(0x544)]=function(){const _0x54b254=_0x5443f5,_0x5ec184=_0x54b254(0x70a);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x5ec184])return this[_0x54b254(0x436)][_0x5ec184];const _0x297b3a=VisuMZ[_0x54b254(0x425)][_0x54b254(0x446)][_0x54b254(0x134)][_0x54b254(0x760)];return this[_0x54b254(0x713)](_0x5ec184,_0x297b3a);},ColorManager[_0x5443f5(0x979)]=function(){const _0x91914c=_0x5443f5,_0x4420d0=_0x91914c(0x86d);this[_0x91914c(0x436)]=this[_0x91914c(0x436)]||{};if(this['_colorCache'][_0x4420d0])return this['_colorCache'][_0x4420d0];const _0x27c928=VisuMZ[_0x91914c(0x425)][_0x91914c(0x446)][_0x91914c(0x134)]['ColorCTGauge1'];return this['getColorDataFromPluginParameters'](_0x4420d0,_0x27c928);},ColorManager[_0x5443f5(0x909)]=function(){const _0x187eac=_0x5443f5,_0xa502ff=_0x187eac(0x925);this[_0x187eac(0x436)]=this['_colorCache']||{};if(this[_0x187eac(0x436)][_0xa502ff])return this['_colorCache'][_0xa502ff];const _0x4da970=VisuMZ['CoreEngine'][_0x187eac(0x446)][_0x187eac(0x134)][_0x187eac(0x451)];return this['getColorDataFromPluginParameters'](_0xa502ff,_0x4da970);},ColorManager[_0x5443f5(0x590)]=function(){const _0x4ed47d=_0x5443f5,_0x3d22b4=_0x4ed47d(0x1b1);this[_0x4ed47d(0x436)]=this['_colorCache']||{};if(this['_colorCache'][_0x3d22b4])return this[_0x4ed47d(0x436)][_0x3d22b4];const _0x21f227=VisuMZ[_0x4ed47d(0x425)]['Settings'][_0x4ed47d(0x134)][_0x4ed47d(0x383)];return this['getColorDataFromPluginParameters'](_0x3d22b4,_0x21f227);},ColorManager[_0x5443f5(0x6bb)]=function(){const _0x406cc2=_0x5443f5,_0x3caad2=_0x406cc2(0x906);this[_0x406cc2(0x436)]=this[_0x406cc2(0x436)]||{};if(this[_0x406cc2(0x436)][_0x3caad2])return this['_colorCache'][_0x3caad2];const _0x3b3448=VisuMZ[_0x406cc2(0x425)][_0x406cc2(0x446)][_0x406cc2(0x134)][_0x406cc2(0x7fd)];return this['getColorDataFromPluginParameters'](_0x3caad2,_0x3b3448);},ColorManager[_0x5443f5(0x95b)]=function(){const _0xf75f9=_0x5443f5,_0x12d448=_0xf75f9(0x82a);this['_colorCache']=this[_0xf75f9(0x436)]||{};if(this[_0xf75f9(0x436)][_0x12d448])return this[_0xf75f9(0x436)][_0x12d448];const _0x4a1bed=VisuMZ[_0xf75f9(0x425)][_0xf75f9(0x446)][_0xf75f9(0x134)][_0xf75f9(0x738)];return this['getColorDataFromPluginParameters'](_0x12d448,_0x4a1bed);},ColorManager['pendingColor']=function(){const _0x11b40c=_0x5443f5,_0x444450=_0x11b40c(0x6ab);this[_0x11b40c(0x436)]=this[_0x11b40c(0x436)]||{};if(this[_0x11b40c(0x436)][_0x444450])return this[_0x11b40c(0x436)][_0x444450];const _0x53e015=VisuMZ[_0x11b40c(0x425)][_0x11b40c(0x446)][_0x11b40c(0x134)][_0x11b40c(0x738)];return this[_0x11b40c(0x713)](_0x444450,_0x53e015);},ColorManager[_0x5443f5(0x3cd)]=function(){const _0x47b491=_0x5443f5,_0x311b4a=_0x47b491(0x845);this[_0x47b491(0x436)]=this[_0x47b491(0x436)]||{};if(this['_colorCache'][_0x311b4a])return this[_0x47b491(0x436)][_0x311b4a];const _0x13f83c=VisuMZ[_0x47b491(0x425)]['Settings'][_0x47b491(0x134)][_0x47b491(0x20b)];return this[_0x47b491(0x713)](_0x311b4a,_0x13f83c);},ColorManager['expGaugeColor2']=function(){const _0x1c4c64=_0x5443f5,_0x555bdc=_0x1c4c64(0x865);this[_0x1c4c64(0x436)]=this[_0x1c4c64(0x436)]||{};if(this[_0x1c4c64(0x436)][_0x555bdc])return this[_0x1c4c64(0x436)][_0x555bdc];const _0x565279=VisuMZ['CoreEngine'][_0x1c4c64(0x446)]['Color'][_0x1c4c64(0x4dd)];return this[_0x1c4c64(0x713)](_0x555bdc,_0x565279);},ColorManager[_0x5443f5(0x16e)]=function(){const _0xeefb09=_0x5443f5,_0x3aadbe=_0xeefb09(0x611);this[_0xeefb09(0x436)]=this[_0xeefb09(0x436)]||{};if(this[_0xeefb09(0x436)][_0x3aadbe])return this['_colorCache'][_0x3aadbe];const _0x26bad2=VisuMZ[_0xeefb09(0x425)][_0xeefb09(0x446)][_0xeefb09(0x134)]['ColorMaxLvGauge1'];return this[_0xeefb09(0x713)](_0x3aadbe,_0x26bad2);},ColorManager[_0x5443f5(0xd7)]=function(){const _0x12ee6b=_0x5443f5,_0x6c0a19=_0x12ee6b(0x67f);this[_0x12ee6b(0x436)]=this['_colorCache']||{};if(this[_0x12ee6b(0x436)][_0x6c0a19])return this['_colorCache'][_0x6c0a19];const _0x4ab6c1=VisuMZ['CoreEngine']['Settings'][_0x12ee6b(0x134)]['ColorMaxLvGauge2'];return this[_0x12ee6b(0x713)](_0x6c0a19,_0x4ab6c1);},ColorManager[_0x5443f5(0x1c0)]=function(_0x5f273b){const _0x13535e=_0x5443f5;return VisuMZ['CoreEngine'][_0x13535e(0x446)][_0x13535e(0x134)]['ActorHPColor'][_0x13535e(0x91b)](this,_0x5f273b);},ColorManager[_0x5443f5(0x23e)]=function(_0x79c4bd){const _0x4b0748=_0x5443f5;return VisuMZ[_0x4b0748(0x425)]['Settings']['Color']['ActorMPColor'][_0x4b0748(0x91b)](this,_0x79c4bd);},ColorManager['tpColor']=function(_0x3c78f1){const _0xf39152=_0x5443f5;return VisuMZ[_0xf39152(0x425)][_0xf39152(0x446)][_0xf39152(0x134)][_0xf39152(0x920)]['call'](this,_0x3c78f1);},ColorManager[_0x5443f5(0x520)]=function(_0x288c0e){const _0x19105b=_0x5443f5;return VisuMZ[_0x19105b(0x425)][_0x19105b(0x446)][_0x19105b(0x134)][_0x19105b(0x142)][_0x19105b(0x91b)](this,_0x288c0e);},ColorManager['damageColor']=function(_0x1c99d6){const _0x44c6e4=_0x5443f5;return VisuMZ[_0x44c6e4(0x425)][_0x44c6e4(0x446)]['Color']['DamageColor'][_0x44c6e4(0x91b)](this,_0x1c99d6);},ColorManager[_0x5443f5(0x837)]=function(){const _0x367ddf=_0x5443f5;return VisuMZ[_0x367ddf(0x425)]['Settings'][_0x367ddf(0x134)][_0x367ddf(0x482)];},ColorManager['outlineColorDmg']=function(){const _0x2e673a=_0x5443f5;return VisuMZ[_0x2e673a(0x425)][_0x2e673a(0x446)][_0x2e673a(0x134)][_0x2e673a(0x513)]||_0x2e673a(0x661);},ColorManager['outlineColorGauge']=function(){const _0x413a6b=_0x5443f5;return VisuMZ['CoreEngine'][_0x413a6b(0x446)]['Color']['OutlineColorGauge']||'rgba(0,\x200,\x200,\x201.0)';},ColorManager['dimColor1']=function(){const _0x17a545=_0x5443f5;return VisuMZ['CoreEngine']['Settings'][_0x17a545(0x134)][_0x17a545(0x7e1)];},ColorManager['dimColor2']=function(){const _0x2d69fd=_0x5443f5;return VisuMZ[_0x2d69fd(0x425)][_0x2d69fd(0x446)][_0x2d69fd(0x134)][_0x2d69fd(0x9f3)];},ColorManager[_0x5443f5(0x4f3)]=function(){const _0x1d7f75=_0x5443f5;return VisuMZ[_0x1d7f75(0x425)][_0x1d7f75(0x446)]['Color'][_0x1d7f75(0x9e3)];},ColorManager[_0x5443f5(0x29c)]=function(){const _0x2669ec=_0x5443f5;return VisuMZ['CoreEngine'][_0x2669ec(0x446)][_0x2669ec(0x134)][_0x2669ec(0x51e)];},SceneManager['_storedStack']=[],SceneManager[_0x5443f5(0x378)]=function(){const _0x1b038f=_0x5443f5;return this['_scene']&&this[_0x1b038f(0x970)]['constructor']===Scene_Battle;},SceneManager[_0x5443f5(0x1fe)]=function(){return this['_scene']&&this['_scene']['constructor']===Scene_Map;},SceneManager[_0x5443f5(0x735)]=function(){const _0x2edbf5=_0x5443f5;return this[_0x2edbf5(0x970)]&&this[_0x2edbf5(0x970)]instanceof Scene_Map;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x5e7)]=SceneManager[_0x5443f5(0x131)],SceneManager['initialize']=function(){const _0x49fcce=_0x5443f5;VisuMZ[_0x49fcce(0x425)][_0x49fcce(0x5e7)][_0x49fcce(0x91b)](this),this['initVisuMZCoreEngine']();},VisuMZ[_0x5443f5(0x425)]['SceneManager_onKeyDown']=SceneManager[_0x5443f5(0x4aa)],SceneManager[_0x5443f5(0x4aa)]=function(_0x572d26){const _0x1d07d1=_0x5443f5;if($gameTemp)this[_0x1d07d1(0x7f3)](_0x572d26);VisuMZ[_0x1d07d1(0x425)][_0x1d07d1(0x65f)]['call'](this,_0x572d26);},SceneManager[_0x5443f5(0x7f3)]=function(_0x1fbb36){const _0x5c1338=_0x5443f5;if(!_0x1fbb36['ctrlKey']&&!_0x1fbb36[_0x5c1338(0x4a1)]){if(_0x5c1338(0x585)!==_0x5c1338(0x585))this[_0x5c1338(0x1a2)]()['centerX']=!![],this[_0x5c1338(0x1a2)]()['displayX']=_0xe9349e[_0x5c1338(0x36e)];else switch(_0x1fbb36['keyCode']){case 0x52:this[_0x5c1338(0x548)]();break;case 0x54:this[_0x5c1338(0x3f9)]();break;case 0x75:this[_0x5c1338(0x2ee)]();break;case 0x76:if(Input['isPressed'](_0x5c1338(0x11a))||Input[_0x5c1338(0x801)](_0x5c1338(0x300)))return;this['playTestF7']();break;}}},SceneManager[_0x5443f5(0x2ee)]=function(){const _0x3432a2=_0x5443f5;if($gameTemp[_0x3432a2(0x6b1)]()&&VisuMZ[_0x3432a2(0x425)][_0x3432a2(0x446)][_0x3432a2(0x5e6)][_0x3432a2(0x38c)]){if(ConfigManager[_0x3432a2(0x14e)]!==0x0)ConfigManager['bgmVolume']=0x0,ConfigManager['bgsVolume']=0x0,ConfigManager[_0x3432a2(0x91e)]=0x0,ConfigManager[_0x3432a2(0x14e)]=0x0;else{if(_0x3432a2(0x7b2)===_0x3432a2(0x504)){const _0x27abe6=this[_0x3432a2(0x669)];_0x27abe6[_0x3432a2(0x428)](),_0x27abe6['font']=this[_0x3432a2(0x270)]();const _0x1a7943=_0x27abe6['measureText'](_0x24b9b6)[_0x3432a2(0x786)];return _0x27abe6[_0x3432a2(0x668)](),_0x1a7943;}else ConfigManager[_0x3432a2(0x963)]=0x64,ConfigManager[_0x3432a2(0x114)]=0x64,ConfigManager[_0x3432a2(0x91e)]=0x64,ConfigManager[_0x3432a2(0x14e)]=0x64;}ConfigManager['save']();if(this[_0x3432a2(0x970)]['constructor']===Scene_Options){if(this[_0x3432a2(0x970)]['_optionsWindow'])this[_0x3432a2(0x970)][_0x3432a2(0x231)][_0x3432a2(0x61c)]();if(this[_0x3432a2(0x970)]['_listWindow'])this[_0x3432a2(0x970)][_0x3432a2(0x7af)][_0x3432a2(0x61c)]();}}},SceneManager[_0x5443f5(0x85e)]=function(){const _0x3b4f9c=_0x5443f5;if($gameTemp[_0x3b4f9c(0x6b1)]()&&VisuMZ[_0x3b4f9c(0x425)][_0x3b4f9c(0x446)]['QoL']['F7key']){if(_0x3b4f9c(0x141)===_0x3b4f9c(0x141))$gameTemp[_0x3b4f9c(0x53e)]=!$gameTemp[_0x3b4f9c(0x53e)];else{const _0x519ebc=_0x3b4f9c(0x33a);this[_0x3b4f9c(0x436)]=this[_0x3b4f9c(0x436)]||{};if(this[_0x3b4f9c(0x436)][_0x519ebc])return this[_0x3b4f9c(0x436)][_0x519ebc];const _0xa0005d=_0x23e504[_0x3b4f9c(0x425)][_0x3b4f9c(0x446)][_0x3b4f9c(0x134)]['ColorPowerUp'];return this['getColorDataFromPluginParameters'](_0x519ebc,_0xa0005d);}}},SceneManager['playTestShiftR']=function(){const _0x219f4b=_0x5443f5;if(!VisuMZ[_0x219f4b(0x425)][_0x219f4b(0x446)][_0x219f4b(0x5e6)][_0x219f4b(0x5dd)])return;if(!$gameTemp[_0x219f4b(0x6b1)]())return;if(!SceneManager[_0x219f4b(0x378)]())return;if(!Input['isPressed'](_0x219f4b(0x11a)))return;for(const _0x2c40bf of $gameParty[_0x219f4b(0x356)]()){if(!_0x2c40bf)continue;_0x2c40bf[_0x219f4b(0x9f6)]();}},SceneManager[_0x5443f5(0x3f9)]=function(){const _0x109c36=_0x5443f5;if(!VisuMZ[_0x109c36(0x425)][_0x109c36(0x446)][_0x109c36(0x5e6)][_0x109c36(0x52a)])return;if(!$gameTemp[_0x109c36(0x6b1)]())return;if(!SceneManager[_0x109c36(0x378)]())return;if(!Input['isPressed']('shift'))return;for(const _0x25ac63 of $gameParty[_0x109c36(0x356)]()){if(!_0x25ac63)continue;_0x25ac63[_0x109c36(0xf8)](_0x25ac63[_0x109c36(0x13a)]());}},SceneManager['initVisuMZCoreEngine']=function(){const _0x300605=_0x5443f5;this[_0x300605(0x954)]=![],this[_0x300605(0x1d9)]=!VisuMZ[_0x300605(0x425)][_0x300605(0x446)]['UI'][_0x300605(0x2da)];},SceneManager[_0x5443f5(0x515)]=function(_0x5d1272){const _0x4c0008=_0x5443f5;VisuMZ[_0x4c0008(0x425)]['Settings']['UI'][_0x4c0008(0x928)]&&(this['_sideButtonLayout']=_0x5d1272);},SceneManager[_0x5443f5(0x4ce)]=function(){const _0x405290=_0x5443f5;return this[_0x405290(0x954)];},SceneManager[_0x5443f5(0x7c3)]=function(){const _0x18faf5=_0x5443f5;return this[_0x18faf5(0x1d9)];},SceneManager['areButtonsOutsideMainUI']=function(){const _0x24e60b=_0x5443f5;return this['areButtonsHidden']()||this[_0x24e60b(0x4ce)]();},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x53b)]=SceneManager[_0x5443f5(0x8b8)],SceneManager['isGameActive']=function(){const _0x439f19=_0x5443f5;if(VisuMZ[_0x439f19(0x425)][_0x439f19(0x446)][_0x439f19(0x5e6)][_0x439f19(0x3db)]){if(_0x439f19(0x332)===_0x439f19(0x233))_0x51a487[_0x439f19(0x7c7)](_0x274cb2,_0x1c1974);else return VisuMZ[_0x439f19(0x425)][_0x439f19(0x53b)]['call'](this);}else return!![];},SceneManager[_0x5443f5(0x7b9)]=function(_0x4825a2){const _0x1b7c4e=_0x5443f5;if(_0x4825a2 instanceof Error){if('cLDlL'!==_0x1b7c4e(0x777)){const _0x423591='_stored_mpGaugeColor2';this[_0x1b7c4e(0x436)]=this[_0x1b7c4e(0x436)]||{};if(this[_0x1b7c4e(0x436)][_0x423591])return this['_colorCache'][_0x423591];const _0x51af0=_0x16664f[_0x1b7c4e(0x425)][_0x1b7c4e(0x446)][_0x1b7c4e(0x134)]['ColorMPGauge2'];return this[_0x1b7c4e(0x713)](_0x423591,_0x51af0);}else this['catchNormalError'](_0x4825a2);}else{if(_0x4825a2 instanceof Array&&_0x4825a2[0x0]==='LoadError'){if(_0x1b7c4e(0x4c0)==='ZDVWO'){const _0x3f1db6=this['isMVAnimation'](_0xa3a060),_0x30e232=new(_0x3f1db6?_0x363530:_0xb8440f)(),_0x4a48ba=this[_0x1b7c4e(0x67e)](_0x50a001),_0x5be381=this[_0x1b7c4e(0x7ff)](),_0x31848a=_0x28ebae>_0x5be381?this[_0x1b7c4e(0x105)]():null;this[_0x1b7c4e(0x49d)](_0x42d7f1[0x0])&&(_0x404279=!_0x11ef99),_0x30e232[_0x1b7c4e(0x6b4)]=_0x249c12,_0x30e232[_0x1b7c4e(0x71a)](_0x4a48ba,_0x2f5ae3,_0x3082a3,_0x2fa7fe,_0x31848a),this[_0x1b7c4e(0x9ec)](_0x30e232),this[_0x1b7c4e(0x952)]['push'](_0x30e232);}else this[_0x1b7c4e(0x1ff)](_0x4825a2);}else{if(_0x1b7c4e(0x481)!==_0x1b7c4e(0x481)){this[_0x1b7c4e(0x9b6)][_0x1b7c4e(0x63c)]();if(_0x1962f1['displayName']()){const _0x3c38ce=this[_0x1b7c4e(0x98d)];this[_0x1b7c4e(0x57e)](0x0,0x0,_0x3c38ce,this[_0x1b7c4e(0x1eb)]());const _0x10eabe=this[_0x1b7c4e(0x59c)](_0x7adb22['displayName']())[_0x1b7c4e(0x786)];this['drawTextEx'](_0xe93297[_0x1b7c4e(0x508)](),_0x3daba9[_0x1b7c4e(0x3fa)]((_0x3c38ce-_0x10eabe)/0x2),0x0);}}else this[_0x1b7c4e(0x8c7)](_0x4825a2);}}this[_0x1b7c4e(0x6d6)]();},VisuMZ['CoreEngine'][_0x5443f5(0x410)]=BattleManager[_0x5443f5(0x347)],BattleManager['processEscape']=function(){const _0x202800=_0x5443f5;return VisuMZ[_0x202800(0x425)][_0x202800(0x446)][_0x202800(0x5e6)][_0x202800(0x778)]?this[_0x202800(0x1c3)]():VisuMZ[_0x202800(0x425)][_0x202800(0x410)][_0x202800(0x91b)](this);},BattleManager[_0x5443f5(0x1c3)]=function(){const _0xa48875=_0x5443f5;return $gameParty[_0xa48875(0x871)](),SoundManager[_0xa48875(0x99f)](),this[_0xa48875(0x37f)](),!![];},BattleManager[_0x5443f5(0x97d)]=function(){const _0x359815=_0x5443f5;return $gameSystem[_0x359815(0x70b)]()>=0x1;},BattleManager[_0x5443f5(0x106)]=function(){const _0x10431a=_0x5443f5;return $gameSystem[_0x10431a(0x70b)]()===0x1;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x47f)]=Game_Temp[_0x5443f5(0x353)]['initialize'],Game_Temp[_0x5443f5(0x353)][_0x5443f5(0x131)]=function(){const _0x405d9b=_0x5443f5;VisuMZ[_0x405d9b(0x425)]['Game_Temp_initialize']['call'](this),this[_0x405d9b(0x469)](),this[_0x405d9b(0x3a4)](),this['createPointAnimationQueue']();},Game_Temp[_0x5443f5(0x353)]['forceOutOfPlaytest']=function(){const _0x38c5d4=_0x5443f5;VisuMZ[_0x38c5d4(0x425)][_0x38c5d4(0x446)]['QoL'][_0x38c5d4(0x11e)]&&(this[_0x38c5d4(0x923)]=![]);},Game_Temp['prototype'][_0x5443f5(0x72f)]=function(_0x29a650){const _0x1f2af5=_0x5443f5;this[_0x1f2af5(0x8a4)]=_0x29a650;},Game_Temp['prototype'][_0x5443f5(0x847)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x5443f5(0x353)]['clearForcedGameTroopSettingsCoreEngine']=function(){const _0x43a8c5=_0x5443f5;this[_0x43a8c5(0x1d8)]=undefined,this[_0x43a8c5(0x1e7)]=undefined;},Game_Temp[_0x5443f5(0x353)][_0x5443f5(0xff)]=function(_0x277d8f){const _0x1c4a38=_0x5443f5;$gameMap&&$dataMap&&$dataMap['note']&&(_0x1c4a38(0x737)!==_0x1c4a38(0x737)?this['_cancelButton']['y']=_0x5ec8fd[_0x1c4a38(0x66f)]-this[_0x1c4a38(0x9e4)]():this[_0x1c4a38(0x260)]($dataMap['note']));const _0x5ba3dd=$dataTroops[_0x277d8f];if(_0x5ba3dd){if(_0x1c4a38(0x6da)!=='ZhCLW'){let _0x17f904=DataManager['createTroopNote'](_0x5ba3dd['id']);this['parseForcedGameTroopSettingsCoreEngine'](_0x17f904);}else{if(_0x4419c2&&_0x393971['bitmap'])_0x2088c7[_0x1c4a38(0x55f)][_0x1c4a38(0x683)]();}}},Game_Temp[_0x5443f5(0x353)]['parseForcedGameTroopSettingsCoreEngine']=function(_0x5c5806){const _0x331eb6=_0x5443f5;if(!_0x5c5806)return;if(_0x5c5806['match'](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x331eb6(0x1d8)]='FV';else{if(_0x5c5806[_0x331eb6(0x8ee)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x331eb6(0x1d8)]='SV';else{if(_0x5c5806[_0x331eb6(0x8ee)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if('MIATj'!==_0x331eb6(0x3df)){const _0x4c3db8=String(RegExp['$1']);if(_0x4c3db8[_0x331eb6(0x8ee)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x4c3db8[_0x331eb6(0x8ee)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x331eb6(0x1d8)]='SV');}else{if(!this[_0x331eb6(0x1da)]())return this[_0x331eb6(0x46d)]();else return this['isMenuButtonAssistEnabled']()&&this[_0x331eb6(0x718)]()===_0x331eb6(0x7cb)?_0x1eb6e6[_0x331eb6(0x353)][_0x331eb6(0x1eb)]():0x0;}}}}if(_0x5c5806[_0x331eb6(0x8ee)](/<(?:DTB)>/i))this[_0x331eb6(0x1e7)]=0x0;else{if(_0x5c5806[_0x331eb6(0x8ee)](/<(?:TPB|ATB)[ ]ACTIVE>/i))_0x331eb6(0x67d)===_0x331eb6(0x67d)?this['_forcedBattleSys']=0x1:_0x4f67b7+=_0x331eb6(0x245)[_0x331eb6(0x2d3)](_0x6f5fc1['parameters'][0x4]);else{if(_0x5c5806[_0x331eb6(0x8ee)](/<(?:TPB|ATB)[ ]WAIT>/i))_0x331eb6(0x136)==='sFoDa'?this[_0x331eb6(0x131)](...arguments):this[_0x331eb6(0x1e7)]=0x2;else{if(_0x5c5806[_0x331eb6(0x8ee)](/<(?:CTB)>/i))Imported[_0x331eb6(0x443)]&&(this['_forcedBattleSys']=_0x331eb6(0x1ea));else{if(_0x5c5806[_0x331eb6(0x8ee)](/<(?:STB)>/i))Imported[_0x331eb6(0x9c4)]&&(_0x331eb6(0x3c7)!==_0x331eb6(0x33f)?this['_forcedBattleSys']=_0x331eb6(0x1b7):(_0x2fb195['CoreEngine'][_0x331eb6(0x4a5)][_0x331eb6(0x91b)](this),this[_0x331eb6(0x436)]=this[_0x331eb6(0x436)]||{}));else{if(_0x5c5806['match'](/<(?:BTB)>/i))_0x331eb6(0x742)===_0x331eb6(0x2a0)?this[_0x331eb6(0x812)]():Imported['VisuMZ_2_BattleSystemBTB']&&(this[_0x331eb6(0x1e7)]=_0x331eb6(0x183));else{if(_0x5c5806['match'](/<(?:FTB)>/i)){if(Imported['VisuMZ_2_BattleSystemFTB']){if(_0x331eb6(0x483)===_0x331eb6(0x4f9)){const _0x149762=_0x594bde?this[_0x331eb6(0x9c5)]:this[_0x331eb6(0x230)];if(!_0x149762)return;const _0x1cf3bf=_0x4d85b2[_0x331eb6(0x1ec)],_0x558a66=_0x1cf3bf['thickness'],_0x23209b=_0x5f314e?this[_0x331eb6(0x98d)]-_0x558a66*0x2:_0x558a66,_0x8c43f8=_0x2bfdf9?_0x558a66:this[_0x331eb6(0x547)]-_0x558a66*0x2;_0x149762[_0x331eb6(0x55f)]=new _0x1b496d(_0x23209b,_0x8c43f8),_0x149762['setFrame'](0x0,0x0,_0x23209b,_0x8c43f8),this['updateScrollBarPosition'](_0x50e6c7);}else this[_0x331eb6(0x1e7)]='FTB';}}else{if(_0x5c5806[_0x331eb6(0x8ee)](/<(?:OTB)>/i))'pOWbf'===_0x331eb6(0x31b)?Imported['VisuMZ_2_BattleSystemOTB']&&(this[_0x331eb6(0x1e7)]='OTB'):this[_0x331eb6(0x8a4)]=_0x553dcc;else{if(_0x5c5806['match'](/<(?:ETB)>/i))Imported[_0x331eb6(0x396)]&&(this[_0x331eb6(0x1e7)]=_0x331eb6(0x88b));else{if(_0x5c5806[_0x331eb6(0x8ee)](/<(?:PTB)>/i))Imported['VisuMZ_2_BattleSystemPTB']&&(_0x331eb6(0x888)===_0x331eb6(0x888)?this['_forcedBattleSys']=_0x331eb6(0x456):(this[_0x331eb6(0x8da)](),this['removeAllPointAnimations'](),_0x6cb79b['CoreEngine']['Spriteset_Base_destroy']['call'](this,_0x945768)));else{if(_0x5c5806[_0x331eb6(0x8ee)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if('EbvEY'!==_0x331eb6(0xfa))_0x1f1e1e[_0x331eb6(0x425)][_0x331eb6(0x446)][_0x331eb6(0x5e6)][_0x331eb6(0x40e)]?this[_0x331eb6(0x1ef)](_0x17191c,_0x3f2f45,_0x56bd72,_0x1f1a62):_0x6b40c8[_0x331eb6(0x425)][_0x331eb6(0x209)][_0x331eb6(0x91b)](this,_0x3cd7a0,_0x5b3ed0,_0x5aa1bb,_0x341e48);else{const _0x19ef62=String(RegExp['$1']);if(_0x19ef62[_0x331eb6(0x8ee)](/DTB/i)){if(_0x331eb6(0x9c7)!==_0x331eb6(0x80f))this[_0x331eb6(0x1e7)]=0x0;else return _0x56b0b6['CoreEngine'][_0x331eb6(0x446)]['QoL']['EscapeAlways']?this['processAlwaysEscape']():_0x1bc66a[_0x331eb6(0x425)][_0x331eb6(0x410)][_0x331eb6(0x91b)](this);}else{if(_0x19ef62[_0x331eb6(0x8ee)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x331eb6(0x1e7)]=0x1;else{if(_0x19ef62[_0x331eb6(0x8ee)](/(?:TPB|ATB)[ ]WAIT/i))_0x331eb6(0x2ca)!=='zjwvh'?this['_sellWindow'][_0x331eb6(0x3c0)](_0x15c861[_0x331eb6(0x6aa)]['SellBgType']):this[_0x331eb6(0x1e7)]=0x2;else{if(_0x19ef62[_0x331eb6(0x8ee)](/CTB/i))'sxyqO'!==_0x331eb6(0x5fd)?(_0x597495['playMiss'](),this[_0x331eb6(0x658)](_0x331eb6(0x8ea))):Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0x331eb6(0x1e7)]='CTB');else{if(_0x19ef62['match'](/STB/i))_0x331eb6(0x43f)!=='uDBUi'?_0x31a042=_0x331eb6(0x5df)[_0x331eb6(0x2d3)](_0x1ee303,_0x459f99):Imported[_0x331eb6(0x9c4)]&&(this[_0x331eb6(0x1e7)]='STB');else{if(_0x19ef62['match'](/BTB/i)){if(Imported[_0x331eb6(0x9ca)]){if(_0x331eb6(0x6ba)===_0x331eb6(0x376))return 0.5*_0x433f2d[_0x331eb6(0x7ad)](0x2,0xa*_0x4ec42e);else this['_forcedBattleSys']=_0x331eb6(0x183);}}else{if(_0x19ef62[_0x331eb6(0x8ee)](/FTB/i))_0x331eb6(0x7ef)===_0x331eb6(0x7ef)?Imported[_0x331eb6(0x112)]&&(this[_0x331eb6(0x1e7)]=_0x331eb6(0x819)):_0x45643e=_0x25d752[_0x331eb6(0x8d5)](_0x1cace1,_0x558677(_0x4273a3(_0x41f7ab)));else{if(_0x19ef62[_0x331eb6(0x8ee)](/OTB/i)){if(_0x331eb6(0x1ad)!==_0x331eb6(0x1ad))try{_0x29a66c[_0x331eb6(0x425)][_0x331eb6(0x63b)][_0x331eb6(0x91b)](this,_0x993db5);}catch(_0x127799){if(_0x339e01[_0x331eb6(0x6b1)]())_0x4a979f[_0x331eb6(0x653)](_0x127799);}else{if(Imported['VisuMZ_2_BattleSystemOTB']){if('rLEdy'==='rLEdy')this[_0x331eb6(0x1e7)]=_0x331eb6(0x46a);else{this['_lastOrigin']=_0x331eb6(0x890),this[_0x331eb6(0x681)]=_0x331eb6(0x890),this[_0x331eb6(0x8ad)]=_0x331eb6(0x890);const _0x2e541c=this[_0x331eb6(0x3fe)]();_0x2515e7[_0x331eb6(0x353)][_0x331eb6(0x131)][_0x331eb6(0x91b)](this,_0x2e541c),this[_0x331eb6(0x3c0)](0x2);}}}}else{if(_0x19ef62['match'](/ETB/i)){if(_0x331eb6(0x807)===_0x331eb6(0x26c))_0x5ec15c[_0x331eb6(0x425)][_0x331eb6(0x650)][_0x331eb6(0x91b)](this),_0x50c4ba[_0x331eb6(0x4ce)]()&&this[_0x331eb6(0x869)]();else{if(Imported[_0x331eb6(0x396)]){if('YQZeL'==='YQZeL')this[_0x331eb6(0x1e7)]=_0x331eb6(0x88b);else return!![];}}}else{if(_0x19ef62[_0x331eb6(0x8ee)](/PTB/i)){if(Imported[_0x331eb6(0x858)]){if(_0x331eb6(0x126)!==_0x331eb6(0x126))return _0x426089[_0x331eb6(0x6aa)][_0x331eb6(0x405)][_0x331eb6(0x91b)](this);else this[_0x331eb6(0x1e7)]=_0x331eb6(0x456);}}}}}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x5443f5(0x353)][_0x5443f5(0x3a4)]=function(){const _0x351b78=_0x5443f5;this[_0x351b78(0x3fd)]=[];},Game_Temp[_0x5443f5(0x353)][_0x5443f5(0x588)]=function(_0x131aaa,_0x3f85c0,_0x29dbd8,_0xe330c9){const _0x5d3af1=_0x5443f5;if(!this[_0x5d3af1(0x3d5)]())return;_0x29dbd8=_0x29dbd8||![],_0xe330c9=_0xe330c9||![];if($dataAnimations[_0x3f85c0]){const _0x3328a8={'targets':_0x131aaa,'animationId':_0x3f85c0,'mirror':_0x29dbd8,'mute':_0xe330c9};this[_0x5d3af1(0x3fd)][_0x5d3af1(0x747)](_0x3328a8);for(const _0x5de3a7 of _0x131aaa){if(_0x5de3a7['startAnimation']){if('jOhhs'!==_0x5d3af1(0x6fd))_0x5de3a7[_0x5d3af1(0x3f6)]();else{const _0x311f21=_0x3b02e9['y']+(this[_0x5d3af1(0x1eb)]()-_0x155d53['iconHeight'])/0x2;this[_0x5d3af1(0x605)](_0x3557dd,_0x37478e['x'],_0x311f21);const _0x3d2a57=_0x27de3d[_0x5d3af1(0x2bf)]+0x4;_0x3950c9['x']+=_0x3d2a57,_0x496e32['width']-=_0x3d2a57;}}}}},Game_Temp[_0x5443f5(0x353)][_0x5443f5(0x3d5)]=function(){return!![];},Game_Temp['prototype'][_0x5443f5(0x379)]=function(){const _0x549955=_0x5443f5;return this[_0x549955(0x3fd)]['shift']();},Game_Temp[_0x5443f5(0x353)][_0x5443f5(0x1f0)]=function(){this['_pointAnimationQueue']=[];},Game_Temp[_0x5443f5(0x353)][_0x5443f5(0x480)]=function(_0x479ffd,_0x561cac,_0x3169cf,_0x527e31,_0x125795){const _0x571dda=_0x5443f5;if(!this[_0x571dda(0x284)]())return;_0x527e31=_0x527e31||![],_0x125795=_0x125795||![];if($dataAnimations[_0x3169cf]){const _0x259788={'x':_0x479ffd,'y':_0x561cac,'animationId':_0x3169cf,'mirror':_0x527e31,'mute':_0x125795};this[_0x571dda(0x514)][_0x571dda(0x747)](_0x259788);}},Game_Temp[_0x5443f5(0x353)][_0x5443f5(0x284)]=function(){return!![];},Game_Temp['prototype'][_0x5443f5(0x50a)]=function(){const _0x58f840=_0x5443f5;return this[_0x58f840(0x514)][_0x58f840(0x11a)]();},VisuMZ[_0x5443f5(0x425)]['Game_System_initialize']=Game_System[_0x5443f5(0x353)][_0x5443f5(0x131)],Game_System[_0x5443f5(0x353)][_0x5443f5(0x131)]=function(){const _0x224e12=_0x5443f5;VisuMZ[_0x224e12(0x425)][_0x224e12(0x59e)][_0x224e12(0x91b)](this),this[_0x224e12(0x9f4)]();},Game_System[_0x5443f5(0x353)][_0x5443f5(0x9f4)]=function(){const _0xebf62b=_0x5443f5;this[_0xebf62b(0x72e)]={'SideView':$dataSystem[_0xebf62b(0x935)],'BattleSystem':this[_0xebf62b(0x2cd)](),'FontSize':$dataSystem[_0xebf62b(0x52e)][_0xebf62b(0x702)],'Padding':0xc};},Game_System['prototype'][_0x5443f5(0x227)]=function(){const _0xae8ce6=_0x5443f5;if($gameTemp[_0xae8ce6(0x1d8)]==='SV')return!![];else{if($gameTemp[_0xae8ce6(0x1d8)]==='FV')return![];}if(this['_CoreEngineSettings']===undefined)this[_0xae8ce6(0x9f4)]();if(this[_0xae8ce6(0x72e)][_0xae8ce6(0x691)]===undefined)this['initCoreEngine']();return this[_0xae8ce6(0x72e)][_0xae8ce6(0x691)];},Game_System[_0x5443f5(0x353)]['setSideView']=function(_0x4c341b){const _0x2be032=_0x5443f5;if(this[_0x2be032(0x72e)]===undefined)this['initCoreEngine']();if(this[_0x2be032(0x72e)][_0x2be032(0x691)]===undefined)this[_0x2be032(0x9f4)]();this[_0x2be032(0x72e)]['SideView']=_0x4c341b;},Game_System[_0x5443f5(0x353)][_0x5443f5(0x6dd)]=function(){const _0x19c6de=_0x5443f5;if(this['_CoreEngineSettings']===undefined)this[_0x19c6de(0x9f4)]();this[_0x19c6de(0x72e)][_0x19c6de(0xd9)]=this['initialBattleSystem']();},Game_System[_0x5443f5(0x353)][_0x5443f5(0x2cd)]=function(){const _0x471a2d=_0x5443f5,_0x50c0b5=(VisuMZ[_0x471a2d(0x425)][_0x471a2d(0x446)][_0x471a2d(0xd9)]||_0x471a2d(0x510))[_0x471a2d(0x1ca)]()[_0x471a2d(0x7b7)]();return VisuMZ[_0x471a2d(0x425)][_0x471a2d(0x9a4)](_0x50c0b5);},Game_System[_0x5443f5(0x353)][_0x5443f5(0x70b)]=function(){const _0x3a7d05=_0x5443f5;if($gameTemp[_0x3a7d05(0x1e7)]!==undefined)return $gameTemp[_0x3a7d05(0x1e7)];if(this[_0x3a7d05(0x72e)]===undefined)this[_0x3a7d05(0x9f4)]();if(this['_CoreEngineSettings'][_0x3a7d05(0xd9)]===undefined)this[_0x3a7d05(0x6dd)]();return this[_0x3a7d05(0x72e)][_0x3a7d05(0xd9)];},Game_System[_0x5443f5(0x353)][_0x5443f5(0x6b8)]=function(_0x338bf9){const _0x6ae6c8=_0x5443f5;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x6ae6c8(0x72e)][_0x6ae6c8(0xd9)]===undefined)this['resetBattleSystem']();this[_0x6ae6c8(0x72e)][_0x6ae6c8(0xd9)]=_0x338bf9;},Game_System[_0x5443f5(0x353)][_0x5443f5(0x89e)]=function(){const _0x2f8357=_0x5443f5;if(this['_CoreEngineSettings']===undefined)this[_0x2f8357(0x9f4)]();if(this['_CoreEngineSettings'][_0x2f8357(0x342)]===undefined)this[_0x2f8357(0x9f4)]();return this[_0x2f8357(0x72e)]['FontSize'];},Game_System[_0x5443f5(0x353)]['setMainFontSize']=function(_0x4b4ff0){const _0xa1c35e=_0x5443f5;if(this['_CoreEngineSettings']===undefined)this[_0xa1c35e(0x9f4)]();if(this[_0xa1c35e(0x72e)][_0xa1c35e(0x924)]===undefined)this[_0xa1c35e(0x9f4)]();this[_0xa1c35e(0x72e)][_0xa1c35e(0x342)]=_0x4b4ff0;},Game_System[_0x5443f5(0x353)]['windowPadding']=function(){const _0x1ccd9b=_0x5443f5;if(this[_0x1ccd9b(0x72e)]===undefined)this[_0x1ccd9b(0x9f4)]();if(this[_0x1ccd9b(0x72e)]['Padding']===undefined)this[_0x1ccd9b(0x9f4)]();return this['_CoreEngineSettings']['Padding'];},Game_System['prototype'][_0x5443f5(0x8b7)]=function(_0x3a485d){const _0x5e679a=_0x5443f5;if(this[_0x5e679a(0x72e)]===undefined)this[_0x5e679a(0x9f4)]();if(this['_CoreEngineSettings'][_0x5e679a(0x924)]===undefined)this[_0x5e679a(0x9f4)]();this[_0x5e679a(0x72e)]['Padding']=_0x3a485d;},VisuMZ[_0x5443f5(0x425)]['Game_Screen_initialize']=Game_Screen[_0x5443f5(0x353)][_0x5443f5(0x131)],Game_Screen[_0x5443f5(0x353)][_0x5443f5(0x131)]=function(){const _0x1a346e=_0x5443f5;VisuMZ['CoreEngine'][_0x1a346e(0x499)][_0x1a346e(0x91b)](this),this[_0x1a346e(0x5cc)]();},Game_Screen[_0x5443f5(0x353)][_0x5443f5(0x5cc)]=function(){const _0x358283=_0x5443f5,_0xf720ff=VisuMZ[_0x358283(0x425)][_0x358283(0x446)][_0x358283(0x56b)];this['_coreEngineShakeStyle']=_0xf720ff?.[_0x358283(0x177)]||_0x358283(0x5bb);},Game_Screen[_0x5443f5(0x353)][_0x5443f5(0x4cf)]=function(){const _0x504303=_0x5443f5;if(this[_0x504303(0x48e)]===undefined)this[_0x504303(0x5cc)]();return this[_0x504303(0x48e)];},Game_Screen['prototype'][_0x5443f5(0x8a1)]=function(_0x1c8484){const _0x2fc72f=_0x5443f5;if(this[_0x2fc72f(0x48e)]===undefined)this[_0x2fc72f(0x5cc)]();this[_0x2fc72f(0x48e)]=_0x1c8484[_0x2fc72f(0x613)]()[_0x2fc72f(0x7b7)]();},Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x7e9)]=function(){const _0x57ab36=_0x5443f5;if($gameParty[_0x57ab36(0x59b)]())return![];return this['onlyfilename']()&&this[_0x57ab36(0x2f5)]()[_0x57ab36(0x6cd)](0x0)==='!';},Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x2f5)]=function(){const _0x15122c=_0x5443f5;return this[_0x15122c(0x94f)][_0x15122c(0x8c3)]('/')[_0x15122c(0x8f3)]();},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x68b)]=Game_Picture['prototype']['x'],Game_Picture['prototype']['x']=function(){const _0x55db92=_0x5443f5;if(this[_0x55db92(0x7e9)]())return this[_0x55db92(0x666)]();else{if(_0x55db92(0x4df)!==_0x55db92(0x8cb))return VisuMZ['CoreEngine'][_0x55db92(0x68b)][_0x55db92(0x91b)](this);else this['_forcedTroopView']='FV';}},Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x666)]=function(){const _0x3f43ca=_0x5443f5,_0x5271ee=$gameMap['displayX']()*$gameMap[_0x3f43ca(0x67c)]();return(this['_x']-_0x5271ee)*$gameScreen['zoomScale']();},VisuMZ['CoreEngine']['Game_Picture_y']=Game_Picture[_0x5443f5(0x353)]['y'],Game_Picture[_0x5443f5(0x353)]['y']=function(){const _0x377638=_0x5443f5;return this['isMapScrollLinked']()?'KYqxa'==='VdBGj'?_0x358cdf['layoutSettings'][_0x377638(0x405)][_0x377638(0x91b)](this):this[_0x377638(0x339)]():VisuMZ[_0x377638(0x425)]['Game_Picture_y'][_0x377638(0x91b)](this);},Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x339)]=function(){const _0x50d6f2=_0x5443f5,_0xd500e2=$gameMap['displayY']()*$gameMap[_0x50d6f2(0x755)]();return(this['_y']-_0xd500e2)*$gameScreen['zoomScale']();},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x54d)]=Game_Picture['prototype']['scaleX'],Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x335)]=function(){const _0x2d863f=_0x5443f5;let _0x350e81=VisuMZ[_0x2d863f(0x425)][_0x2d863f(0x54d)][_0x2d863f(0x91b)](this);return this[_0x2d863f(0x7e9)]()&&(_0x350e81*=$gameScreen[_0x2d863f(0x360)]()),_0x350e81;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x746)]=Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x752)],Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x752)]=function(){const _0x2cdd8d=_0x5443f5;let _0x816629=VisuMZ['CoreEngine'][_0x2cdd8d(0x746)][_0x2cdd8d(0x91b)](this);if(this[_0x2cdd8d(0x7e9)]()){if('ZfDpR'===_0x2cdd8d(0x4ff))_0x816629*=$gameScreen['zoomScale']();else{_0x2f74d7=_0x4a5e32||0x10e,this[_0x2cdd8d(0xdb)]();if(_0x2d3f31[_0x2cdd8d(0x425)][_0x2cdd8d(0x446)]['UI'][_0x2cdd8d(0x125)])this[_0x2cdd8d(0x4cd)](_0x36ec1a[_0x2cdd8d(0x41f)](),_0x43418b,_0x30279b,_0x167888);else{const _0x15030b=_0x5eac49[_0x2cdd8d(0x41f)]()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x2cdd8d(0x972)](_0x18c177[_0x2cdd8d(0x41f)](),_0x1e57ea,_0x3a5c31,_0x461a97);}}}return _0x816629;},Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x5ca)]=function(_0x566e41){const _0x3d12fb=_0x5443f5;this[_0x3d12fb(0xf1)]=_0x566e41;},VisuMZ['CoreEngine'][_0x5443f5(0x644)]=Game_Picture['prototype'][_0x5443f5(0x9d0)],Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x9d0)]=function(_0x5dd284){const _0x419e84=_0x5443f5;this[_0x419e84(0xf1)]=this['_coreEasingType']||0x0;if([0x0,0x1,0x2,0x3][_0x419e84(0x53a)](this[_0x419e84(0xf1)]))return _0x419e84(0x9d1)===_0x419e84(0x345)?this[_0x419e84(0x634)](_0x1dfb9b,_0x36edc7):VisuMZ[_0x419e84(0x425)][_0x419e84(0x644)][_0x419e84(0x91b)](this,_0x5dd284);else{if(_0x419e84(0x149)!=='BzPnW')return VisuMZ['ApplyEasing'](_0x5dd284,this[_0x419e84(0xf1)]);else{if(_0x379ce3)_0x5a760c[_0x419e84(0x68a)](_0x4f00a2);}}},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x716)]=Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x843)],Game_Picture[_0x5443f5(0x353)]['initRotation']=function(){const _0xdcfa1b=_0x5443f5;VisuMZ['CoreEngine'][_0xdcfa1b(0x716)][_0xdcfa1b(0x91b)](this),this['initRotationCoreEngine']();},Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x720)]=function(){const _0x39a6ab=_0x5443f5;this['_anglePlus']={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x39a6ab(0x662)};},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x774)]=Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x856)],Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x856)]=function(){const _0x2fa738=_0x5443f5;let _0x277054=VisuMZ[_0x2fa738(0x425)][_0x2fa738(0x774)][_0x2fa738(0x91b)](this);return _0x277054+=this[_0x2fa738(0x9a9)](),_0x277054;},Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x9a9)]=function(){const _0x335e46=_0x5443f5;if(this['_anglePlus']===undefined)this[_0x335e46(0x720)]();return this['_anglePlus']['current']||0x0;},Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x5ed)]=function(_0x4822c6,_0x20d058,_0x1713e1){const _0xfc4214=_0x5443f5;if(this[_0xfc4214(0x5b7)]===undefined)this['initRotationCoreEngine']();this[_0xfc4214(0x5b7)]['target']=_0x4822c6||0x0,this[_0xfc4214(0x5b7)][_0xfc4214(0x1dd)]=_0x20d058||0x0,this['_anglePlus'][_0xfc4214(0x452)]=_0x20d058||0x0,this[_0xfc4214(0x5b7)][_0xfc4214(0x61f)]=_0x1713e1||_0xfc4214(0x662),_0x20d058<=0x0&&(this[_0xfc4214(0x5b7)][_0xfc4214(0x676)]=this[_0xfc4214(0x5b7)][_0xfc4214(0x734)]);},Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x102)]=function(_0x164fc4,_0x2a028a,_0x1b3ef8){const _0x49ccad=_0x5443f5;if(this[_0x49ccad(0x5b7)]===undefined)this[_0x49ccad(0x720)]();this[_0x49ccad(0x5b7)][_0x49ccad(0x734)]+=_0x164fc4||0x0,this[_0x49ccad(0x5b7)][_0x49ccad(0x1dd)]=_0x2a028a||0x0,this['_anglePlus']['wholeDuration']=_0x2a028a||0x0,this[_0x49ccad(0x5b7)]['easingType']=_0x1b3ef8||'Linear',_0x2a028a<=0x0&&(this[_0x49ccad(0x5b7)][_0x49ccad(0x676)]=this['_anglePlus'][_0x49ccad(0x734)]);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x1f9)]=Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x2b7)],Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x2b7)]=function(){const _0x20b330=_0x5443f5;VisuMZ[_0x20b330(0x425)]['Game_Picture_updateRotation'][_0x20b330(0x91b)](this),this[_0x20b330(0x656)]();},Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x656)]=function(){const _0x3574ed=_0x5443f5;if(this[_0x3574ed(0x5b7)]===undefined)this[_0x3574ed(0x720)]();const _0x1406af=this[_0x3574ed(0x5b7)];if(_0x1406af[_0x3574ed(0x1dd)]<=0x0)return;_0x1406af[_0x3574ed(0x676)]=this['applyEasingAnglePlus'](_0x1406af['current'],_0x1406af[_0x3574ed(0x734)]),_0x1406af[_0x3574ed(0x1dd)]--,_0x1406af[_0x3574ed(0x1dd)]<=0x0&&(_0x1406af['current']=_0x1406af['target']);},Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x4ad)]=function(_0x20b61d,_0x350490){const _0x3285c4=_0x5443f5,_0xf272da=this[_0x3285c4(0x5b7)],_0x4ab258=_0xf272da[_0x3285c4(0x61f)],_0x1ad5ad=_0xf272da[_0x3285c4(0x1dd)],_0x4da9fb=_0xf272da['wholeDuration'],_0x3099d0=VisuMZ[_0x3285c4(0x28d)]((_0x4da9fb-_0x1ad5ad)/_0x4da9fb,_0x4ab258),_0x5ebd5c=VisuMZ[_0x3285c4(0x28d)]((_0x4da9fb-_0x1ad5ad+0x1)/_0x4da9fb,_0x4ab258),_0x329e88=(_0x20b61d-_0x350490*_0x3099d0)/(0x1-_0x3099d0);return _0x329e88+(_0x350490-_0x329e88)*_0x5ebd5c;},VisuMZ['CoreEngine'][_0x5443f5(0x494)]=Game_Action[_0x5443f5(0x353)][_0x5443f5(0x10e)],Game_Action['prototype'][_0x5443f5(0x10e)]=function(_0x14b33e){const _0xbd295a=_0x5443f5;if(VisuMZ['CoreEngine']['Settings'][_0xbd295a(0x5e6)][_0xbd295a(0x555)]){if(_0xbd295a(0x90b)!==_0xbd295a(0x9d8))return this[_0xbd295a(0x780)](_0x14b33e);else this[_0xbd295a(0x881)][_0xbd295a(0x5f3)](),this[_0xbd295a(0x628)]['hide'](),this[_0xbd295a(0x985)][_0xbd295a(0x5ba)]=![],_0x1aedf5['snapForBackground']();}else return VisuMZ[_0xbd295a(0x425)][_0xbd295a(0x494)]['call'](this,_0x14b33e);},Game_Action[_0x5443f5(0x353)]['itemHitImprovedAccuracy']=function(_0x3dabab){const _0x2c8873=_0x5443f5,_0x2f73cb=this[_0x2c8873(0x5e8)](_0x3dabab),_0x5a3b9c=this[_0x2c8873(0x977)](_0x3dabab),_0x112ae4=this[_0x2c8873(0x79e)](_0x3dabab);return _0x2f73cb*(_0x5a3b9c-_0x112ae4);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x2c7)]=Game_Action[_0x5443f5(0x353)][_0x5443f5(0x3f7)],Game_Action[_0x5443f5(0x353)]['itemEva']=function(_0x3f14df){const _0x580ff2=_0x5443f5;if(VisuMZ[_0x580ff2(0x425)]['Settings'][_0x580ff2(0x5e6)]['ImprovedAccuracySystem']){if('fKrwW'!==_0x580ff2(0x290)){const _0x392d65=[this[_0x580ff2(0x9c5)],this[_0x580ff2(0x230)]];for(const _0x138499 of _0x392d65){_0x138499&&(_0x138499['visible']=this[_0x580ff2(0x22c)]()&&this['isOpen']());}}else return 0x0;}else return VisuMZ[_0x580ff2(0x425)]['Game_Action_itemEva'][_0x580ff2(0x91b)](this,_0x3f14df);},Game_Action[_0x5443f5(0x353)][_0x5443f5(0x5e8)]=function(_0x41df9c){const _0x2d9d69=_0x5443f5;return this[_0x2d9d69(0x23b)]()['successRate']*0.01;},Game_Action['prototype'][_0x5443f5(0x977)]=function(_0x2879f4){const _0x1cfff0=_0x5443f5;if(VisuMZ['CoreEngine']['Settings'][_0x1cfff0(0x5e6)]['AccuracyBoost']&&this[_0x1cfff0(0x79a)]())return 0x1;if(this[_0x1cfff0(0x7a8)]()){if(VisuMZ[_0x1cfff0(0x425)][_0x1cfff0(0x446)]['QoL'][_0x1cfff0(0x3a1)]&&this[_0x1cfff0(0x8fb)]()[_0x1cfff0(0x6df)]()){if('vnmit'===_0x1cfff0(0x301))return this[_0x1cfff0(0x8fb)]()['hit']+0.05;else{const _0x4a2d70=this['itemSuccessRate'](_0x1d0ac3),_0x5c2ebb=this['subjectHitRate'](_0x18d2ee),_0x4e39ff=this['targetEvaRate'](_0x13be73);return _0x4a2d70*(_0x5c2ebb-_0x4e39ff);}}else{if('epAIW'===_0x1cfff0(0x6eb))_0x20d949=_0x233f81['GroupDigits'](_0xaf8c49);else return this[_0x1cfff0(0x8fb)]()[_0x1cfff0(0x7a6)];}}else return 0x1;},Game_Action[_0x5443f5(0x353)][_0x5443f5(0x79e)]=function(_0x1aa1bb){const _0x5581cb=_0x5443f5;if(this[_0x5581cb(0x8fb)]()[_0x5581cb(0x6df)]()===_0x1aa1bb[_0x5581cb(0x6df)]())return 0x0;if(this[_0x5581cb(0x7a8)]()){if(VisuMZ['CoreEngine'][_0x5581cb(0x446)][_0x5581cb(0x5e6)][_0x5581cb(0x3a1)]&&_0x1aa1bb[_0x5581cb(0x1cc)]()){if(_0x5581cb(0x816)!=='aGtZw'){const _0x1b7bc1=_0x23ae6e[_0x5581cb(0x425)]['Settings'][_0x5581cb(0x56b)];if(_0x1b7bc1&&_0x1b7bc1[_0x5581cb(0x289)])return _0x1b7bc1['horzJS'][_0x5581cb(0x91b)](this);const _0x57f3b3=_0x280b73[_0x5581cb(0x951)]*0.75,_0x453b87=_0x3e37da[_0x5581cb(0x128)]*0.6,_0x43e6af=_0x27d221[_0x5581cb(0x85a)];this['x']+=_0x520ed9['round'](_0x581fa3[_0x5581cb(0x751)](_0x57f3b3)-_0x747c94['randomInt'](_0x453b87))*(_0x25446f['min'](_0x43e6af,0x1e)*0.5);}else return _0x1aa1bb['eva']-0.05;}else return _0x1aa1bb['eva'];}else return this[_0x5581cb(0x565)]()?_0x1aa1bb['mev']:0x0;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x412)]=Game_Action['prototype']['updateLastTarget'],Game_Action['prototype']['updateLastTarget']=function(_0x3d82da){const _0x338a37=_0x5443f5;VisuMZ[_0x338a37(0x425)][_0x338a37(0x412)][_0x338a37(0x91b)](this,_0x3d82da);if(VisuMZ['CoreEngine'][_0x338a37(0x446)]['QoL'][_0x338a37(0x555)])return;const _0x1b1655=_0x3d82da[_0x338a37(0x1f5)]();_0x1b1655[_0x338a37(0x519)]&&(0x1-this[_0x338a37(0x3f7)](_0x3d82da)>this[_0x338a37(0x10e)](_0x3d82da)&&(_0x1b1655[_0x338a37(0x519)]=![],_0x1b1655['evaded']=!![]));},VisuMZ[_0x5443f5(0x425)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x5443f5(0x353)][_0x5443f5(0x2e6)],Game_BattlerBase[_0x5443f5(0x353)][_0x5443f5(0x2e6)]=function(){const _0x55ae23=_0x5443f5;this[_0x55ae23(0x39e)]={},VisuMZ[_0x55ae23(0x425)]['Game_BattlerBase_initMembers'][_0x55ae23(0x91b)](this);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x8d2)]=Game_BattlerBase[_0x5443f5(0x353)][_0x5443f5(0x61c)],Game_BattlerBase['prototype'][_0x5443f5(0x61c)]=function(){const _0x107793=_0x5443f5;this[_0x107793(0x39e)]={},VisuMZ[_0x107793(0x425)][_0x107793(0x8d2)][_0x107793(0x91b)](this);},Game_BattlerBase[_0x5443f5(0x353)][_0x5443f5(0x4c4)]=function(_0x28dc3e){const _0x4b7b28=_0x5443f5;return this[_0x4b7b28(0x39e)]=this[_0x4b7b28(0x39e)]||{},this['_cache'][_0x28dc3e]!==undefined;},Game_BattlerBase['prototype'][_0x5443f5(0x50f)]=function(_0x1aef6f){const _0x34b418=_0x5443f5,_0x29e138=(_0x10013d,_0x3933df)=>{const _0x9075ed=_0x5572;if(_0x9075ed(0x6f6)!==_0x9075ed(0x6f6))this[_0x9075ed(0x528)]=[],this[_0x9075ed(0x6b6)]=[],this['_cacheScaleX']=this['scale']['x'],this[_0x9075ed(0x1a6)]=this['scale']['y'];else{if(!_0x3933df)return _0x10013d;if(_0x3933df['note'][_0x9075ed(0x8ee)](VisuMZ['CoreEngine'][_0x9075ed(0x76d)][_0x9075ed(0x50f)][_0x1aef6f])){var _0x5e6cd0=Number(RegExp['$1']);_0x10013d+=_0x5e6cd0;}if(_0x3933df['note']['match'](VisuMZ[_0x9075ed(0x425)][_0x9075ed(0x76d)]['paramPlusJS'][_0x1aef6f])){if('UIXhG'!=='mjRtu'){var _0x81de40=String(RegExp['$1']);try{_0x10013d+=eval(_0x81de40);}catch(_0x4a6e56){if(_0x9075ed(0x431)!==_0x9075ed(0x5a7)){if($gameTemp[_0x9075ed(0x6b1)]())console[_0x9075ed(0x653)](_0x4a6e56);}else{let _0x48ac0b=0x0,_0x1a54b=_0x58c96d['height']-this[_0x9075ed(0x1eb)](),_0x246ac1=_0x2bc8f8['width'],_0x59a20f=this[_0x9075ed(0x1eb)]();return new _0x4cc8e1(_0x48ac0b,_0x1a54b,_0x246ac1,_0x59a20f);}}}else{this[_0x9075ed(0x528)]['remove'](_0x3a8e30),this[_0x9075ed(0x6d8)](_0x109416);for(const _0x31ebca of _0xd949f4['targetObjects']){_0x31ebca[_0x9075ed(0x9ee)]&&_0x31ebca['endAnimation']();}_0x51705d[_0x9075ed(0x683)]();}}return _0x10013d;}};return this[_0x34b418(0x9dd)]()[_0x34b418(0x7ac)](_0x29e138,this[_0x34b418(0x3e3)][_0x1aef6f]);},Game_BattlerBase[_0x5443f5(0x353)][_0x5443f5(0x649)]=function(_0x1933d4){const _0x244159=_0x5443f5;var _0x2c4805='Basic'+(this[_0x244159(0x6df)]()?_0x244159(0x6db):_0x244159(0x98b))+_0x244159(0x502)+_0x1933d4;if(this[_0x244159(0x4c4)](_0x2c4805))return this['_cache'][_0x2c4805];this[_0x244159(0x39e)][_0x2c4805]=eval(VisuMZ[_0x244159(0x425)][_0x244159(0x446)][_0x244159(0x36a)][_0x2c4805]);const _0x549185=(_0xf2a86a,_0x2e67e6)=>{const _0x15d142=_0x244159;if(!_0x2e67e6)return _0xf2a86a;if(_0x2e67e6[_0x15d142(0xe7)][_0x15d142(0x8ee)](VisuMZ[_0x15d142(0x425)][_0x15d142(0x76d)][_0x15d142(0x649)][_0x1933d4])){if(_0x15d142(0x62e)===_0x15d142(0x9c6))_0x1f4477[_0x15d142(0x425)]['Window_Selectable_drawBackgroundRect']['call'](this,_0x5c709e);else{var _0x59845d=Number(RegExp['$1']);if(_0x59845d===0x0)_0x59845d=Number[_0x15d142(0x3ae)];_0xf2a86a=Math[_0x15d142(0x8d5)](_0xf2a86a,_0x59845d);}}if(_0x2e67e6[_0x15d142(0xe7)][_0x15d142(0x8ee)](VisuMZ['CoreEngine'][_0x15d142(0x76d)][_0x15d142(0x56e)][_0x1933d4])){if(_0x15d142(0x2a5)!==_0x15d142(0x779)){var _0x20ec4b=String(RegExp['$1']);try{if(_0x15d142(0x4f4)!==_0x15d142(0x8ca))_0xf2a86a=Math[_0x15d142(0x8d5)](_0xf2a86a,Number(eval(_0x20ec4b)));else return this[_0x15d142(0x8fb)]()[_0x15d142(0x7a6)]+0.05;}catch(_0x190bb5){if(_0x15d142(0x9ce)==='VLivs')_0x43c2c3['CoreEngine']['Scene_Boot_updateDocumentTitle']['call'](this);else{if($gameTemp['isPlaytest']())console[_0x15d142(0x653)](_0x190bb5);}}}else this[_0x15d142(0x93c)]&&this[_0x15d142(0x93c)][_0x15d142(0x3c0)](_0xedfeae['layoutSettings'][_0x15d142(0x5e9)]),this['_listWindow']&&this[_0x15d142(0x7af)]['setBackgroundType'](_0x27b534[_0x15d142(0x6aa)][_0x15d142(0x154)]);}return _0xf2a86a;};if(this['_cache'][_0x2c4805]===0x0)this['_cache'][_0x2c4805]=Number[_0x244159(0x3ae)];return this[_0x244159(0x39e)][_0x2c4805]=this['traitObjects']()[_0x244159(0x7ac)](_0x549185,this[_0x244159(0x39e)][_0x2c4805]),this[_0x244159(0x39e)][_0x2c4805];},Game_BattlerBase[_0x5443f5(0x353)][_0x5443f5(0x1c8)]=function(_0x4929a9){const _0x81a1c8=_0x5443f5,_0x135d3f=this[_0x81a1c8(0x770)](Game_BattlerBase[_0x81a1c8(0x487)],_0x4929a9),_0x583a56=(_0x570aeb,_0x2956ae)=>{const _0x508260=_0x81a1c8;if(!_0x2956ae)return _0x570aeb;if(_0x2956ae[_0x508260(0xe7)][_0x508260(0x8ee)](VisuMZ[_0x508260(0x425)][_0x508260(0x76d)][_0x508260(0x1ac)][_0x4929a9])){var _0x58508f=Number(RegExp['$1'])/0x64;_0x570aeb*=_0x58508f;}if(_0x2956ae[_0x508260(0xe7)][_0x508260(0x8ee)](VisuMZ[_0x508260(0x425)][_0x508260(0x76d)][_0x508260(0x64e)][_0x4929a9])){if('XZfQj'==='PptMV')_0x5b045f['clear'](),this['deselect']();else{var _0x58508f=Number(RegExp['$1']);_0x570aeb*=_0x58508f;}}if(_0x2956ae[_0x508260(0xe7)][_0x508260(0x8ee)](VisuMZ[_0x508260(0x425)][_0x508260(0x76d)][_0x508260(0x9a0)][_0x4929a9])){if(_0x508260(0x52d)!==_0x508260(0x8bb)){var _0x48ff88=String(RegExp['$1']);try{if(_0x508260(0x47b)===_0x508260(0x867)){const _0x5ebe01=this[_0x508260(0x3ce)]();let _0x5ed105=_0x285a2a[_0x508260(0x14f)];this['setAction'](_0x16f71c,_0x5ebe01[0x0]);for(const _0x9f71e3 of _0x5ebe01){const _0x1c84c7=_0x9f71e3[_0x508260(0x7fe)]();_0x1c84c7>_0x5ed105&&(_0x5ed105=_0x1c84c7,this[_0x508260(0x463)](_0x1719eb,_0x9f71e3));}}else _0x570aeb*=eval(_0x48ff88);}catch(_0x5cac1b){if(_0x508260(0x698)!==_0x508260(0x2a9)){if($gameTemp[_0x508260(0x6b1)]())console[_0x508260(0x653)](_0x5cac1b);}else _0x415c1f&&_0x57b21f[_0x508260(0x747)](_0x20ceaf);}}else return![];}return _0x570aeb;};return this['traitObjects']()['reduce'](_0x583a56,_0x135d3f);},Game_BattlerBase[_0x5443f5(0x353)][_0x5443f5(0x2ea)]=function(_0x574669){const _0x48d44d=_0x5443f5,_0x18479a=(_0x2dba6f,_0x5267de)=>{const _0x59a22=_0x5572;if(!_0x5267de)return _0x2dba6f;if(_0x5267de[_0x59a22(0xe7)][_0x59a22(0x8ee)](VisuMZ[_0x59a22(0x425)]['RegExp'][_0x59a22(0x4fa)][_0x574669])){var _0x4a5fcd=Number(RegExp['$1']);_0x2dba6f+=_0x4a5fcd;}if(_0x5267de['note'][_0x59a22(0x8ee)](VisuMZ['CoreEngine']['RegExp']['paramFlatJS'][_0x574669])){var _0x5b4c3f=String(RegExp['$1']);try{if(_0x59a22(0x6d3)!==_0x59a22(0x6d3)){_0x466c9a['CoreEngine'][_0x59a22(0x96a)][_0x59a22(0x91b)](this);if(this['_gamepadWait'])this[_0x59a22(0x20d)]--;}else _0x2dba6f+=eval(_0x5b4c3f);}catch(_0x55799b){if(_0x59a22(0x5a4)===_0x59a22(0x5e2))for(const _0x4340a4 of _0x3ceb9c[_0x59a22(0x797)]){[0x6c,0x198][_0x59a22(0x53a)](_0x4340a4[_0x59a22(0x8d8)])&&(_0x418cbf+='\x0a',_0x30dc95+=_0x4340a4['parameters'][0x0]);}else{if($gameTemp[_0x59a22(0x6b1)]())console[_0x59a22(0x653)](_0x55799b);}}}return _0x2dba6f;};return this[_0x48d44d(0x9dd)]()[_0x48d44d(0x7ac)](_0x18479a,0x0);},Game_BattlerBase[_0x5443f5(0x353)]['param']=function(_0x5c4040){const _0xc80200=_0x5443f5;let _0x2b9ca8='param'+_0x5c4040+_0xc80200(0x2c2);if(this[_0xc80200(0x4c4)](_0x2b9ca8))return this['_cache'][_0x2b9ca8];return this[_0xc80200(0x39e)][_0x2b9ca8]=Math[_0xc80200(0x558)](VisuMZ[_0xc80200(0x425)][_0xc80200(0x446)]['Param'][_0xc80200(0x31d)]['call'](this,_0x5c4040)),this['_cache'][_0x2b9ca8];},Game_BattlerBase['prototype'][_0x5443f5(0xe9)]=function(_0x480eac){const _0x175628=_0x5443f5,_0x4a00c3=(_0x3385b6,_0x455b22)=>{const _0x1d2ea0=_0x5572;if(!_0x455b22)return _0x3385b6;if(_0x455b22[_0x1d2ea0(0xe7)][_0x1d2ea0(0x8ee)](VisuMZ['CoreEngine'][_0x1d2ea0(0x76d)]['xparamPlus1'][_0x480eac])){if(_0x1d2ea0(0x9f7)===_0x1d2ea0(0x13d))this[_0x1d2ea0(0x72e)]={'SideView':_0x59da0a[_0x1d2ea0(0x935)],'BattleSystem':this[_0x1d2ea0(0x2cd)](),'FontSize':_0xfeffde[_0x1d2ea0(0x52e)][_0x1d2ea0(0x702)],'Padding':0xc};else{var _0x1362db=Number(RegExp['$1'])/0x64;_0x3385b6+=_0x1362db;}}if(_0x455b22['note'][_0x1d2ea0(0x8ee)](VisuMZ[_0x1d2ea0(0x425)][_0x1d2ea0(0x76d)]['xparamPlus2'][_0x480eac])){if(_0x1d2ea0(0x9b7)===_0x1d2ea0(0x280))_0x16fe7e['VisuMZ_2_BattleSystemETB']&&(this[_0x1d2ea0(0x1e7)]=_0x1d2ea0(0x88b));else{var _0x1362db=Number(RegExp['$1']);_0x3385b6+=_0x1362db;}}if(_0x455b22[_0x1d2ea0(0xe7)][_0x1d2ea0(0x8ee)](VisuMZ[_0x1d2ea0(0x425)][_0x1d2ea0(0x76d)][_0x1d2ea0(0x91a)][_0x480eac])){var _0x5a0a3f=String(RegExp['$1']);try{if(_0x1d2ea0(0x71f)===_0x1d2ea0(0x71f))_0x3385b6+=eval(_0x5a0a3f);else{if(!_0x61d4a[_0x1d2ea0(0x6b1)]())return;const _0x5bcdff=_0x5989b1['getLastUsedGamepadType']();_0x49e290[_0x1d2ea0(0x597)]&&_0x104d67[_0x1d2ea0(0x597)][_0x1d2ea0(0x7ea)](_0x5bcdff);}}catch(_0x409088){if($gameTemp['isPlaytest']())console[_0x1d2ea0(0x653)](_0x409088);}}return _0x3385b6;};return this['traitObjects']()[_0x175628(0x7ac)](_0x4a00c3,0x0);},Game_BattlerBase[_0x5443f5(0x353)][_0x5443f5(0x840)]=function(_0x580903){const _0x50c55d=_0x5443f5,_0x40cbbf=(_0x20f3c2,_0x3614a7)=>{const _0x1cf43e=_0x5572;if(_0x1cf43e(0x3bd)!==_0x1cf43e(0x607)){if(!_0x3614a7)return _0x20f3c2;if(_0x3614a7[_0x1cf43e(0xe7)][_0x1cf43e(0x8ee)](VisuMZ[_0x1cf43e(0x425)][_0x1cf43e(0x76d)][_0x1cf43e(0x750)][_0x580903])){var _0x137462=Number(RegExp['$1'])/0x64;_0x20f3c2*=_0x137462;}if(_0x3614a7['note'][_0x1cf43e(0x8ee)](VisuMZ[_0x1cf43e(0x425)][_0x1cf43e(0x76d)]['xparamRate2'][_0x580903])){if(_0x1cf43e(0x685)!=='pNJZQ'){var _0x137462=Number(RegExp['$1']);_0x20f3c2*=_0x137462;}else this[_0x1cf43e(0x833)]=new _0x40f3d9(_0x692190['loadTitle1'](_0x7cf7f0[_0x1cf43e(0x2ac)])),this[_0x1cf43e(0x90a)]=new _0x28029a(_0x2d3036['loadTitle2'](_0x193f14['BgFilename2'])),this[_0x1cf43e(0x83f)](this[_0x1cf43e(0x833)]),this['addChild'](this[_0x1cf43e(0x90a)]),this[_0x1cf43e(0x833)]['bitmap'][_0x1cf43e(0x883)](this[_0x1cf43e(0x298)][_0x1cf43e(0x2ed)](this,this[_0x1cf43e(0x833)])),this[_0x1cf43e(0x90a)]['bitmap'][_0x1cf43e(0x883)](this[_0x1cf43e(0x298)][_0x1cf43e(0x2ed)](this,this[_0x1cf43e(0x90a)]));}if(_0x3614a7[_0x1cf43e(0xe7)]['match'](VisuMZ[_0x1cf43e(0x425)]['RegExp'][_0x1cf43e(0x6d9)][_0x580903])){var _0xa11073=String(RegExp['$1']);try{_0x20f3c2*=eval(_0xa11073);}catch(_0x38e3f5){if('bmfCn'!==_0x1cf43e(0x316))this[_0x1cf43e(0x1e7)]=0x0;else{if($gameTemp[_0x1cf43e(0x6b1)]())console[_0x1cf43e(0x653)](_0x38e3f5);}}}return _0x20f3c2;}else this[_0x1cf43e(0x6a5)]=new _0x3a4635[(_0x1cf43e(0x570))][(_0x1cf43e(0x19b))](_0x4e9c15=!![]),this[_0x1cf43e(0x608)]=new _0x4279cd(),this[_0x1cf43e(0x608)][_0x1cf43e(0x55f)]=_0x237d34[_0x1cf43e(0x2ad)](),this[_0x1cf43e(0x608)][_0x1cf43e(0x570)]=[this[_0x1cf43e(0x6a5)]],this[_0x1cf43e(0x2ff)][_0x1cf43e(0x83f)](this[_0x1cf43e(0x608)]);};return this[_0x50c55d(0x9dd)]()['reduce'](_0x40cbbf,0x1);},Game_BattlerBase[_0x5443f5(0x353)][_0x5443f5(0x8d9)]=function(_0x1b5187){const _0x4d27d1=_0x5443f5,_0x1187c7=(_0xf34d27,_0x1666cf)=>{const _0x2e7008=_0x5572;if(!_0x1666cf)return _0xf34d27;if(_0x1666cf[_0x2e7008(0xe7)][_0x2e7008(0x8ee)](VisuMZ[_0x2e7008(0x425)][_0x2e7008(0x76d)][_0x2e7008(0x29d)][_0x1b5187])){var _0x2dff38=Number(RegExp['$1'])/0x64;_0xf34d27+=_0x2dff38;}if(_0x1666cf[_0x2e7008(0xe7)]['match'](VisuMZ[_0x2e7008(0x425)][_0x2e7008(0x76d)][_0x2e7008(0x91d)][_0x1b5187])){if('wbmNN'!=='wbmNN')_0x23bf9c[_0x2e7008(0x858)]&&(this[_0x2e7008(0x1e7)]=_0x2e7008(0x456));else{var _0x2dff38=Number(RegExp['$1']);_0xf34d27+=_0x2dff38;}}if(_0x1666cf[_0x2e7008(0xe7)][_0x2e7008(0x8ee)](VisuMZ[_0x2e7008(0x425)][_0x2e7008(0x76d)]['xparamFlatJS'][_0x1b5187])){if('GlIQH'===_0x2e7008(0x433))return![];else{var _0x1aad6d=String(RegExp['$1']);try{_0x2e7008(0x60a)==='Yqhzj'?this[_0x2e7008(0x853)]&&this[_0x2e7008(0x853)]():_0xf34d27+=eval(_0x1aad6d);}catch(_0x376f25){if(_0x2e7008(0x642)===_0x2e7008(0x879)){let _0x7005c1=_0x2e7008(0x1d0)+_0x448f19+_0x2e7008(0x2c2);if(this['checkCacheKey'](_0x7005c1))return this['_cache'][_0x7005c1];return this['_cache'][_0x7005c1]=_0x59adf3[_0x2e7008(0x425)][_0x2e7008(0x446)]['Param']['SParameterFormula'][_0x2e7008(0x91b)](this,_0x2d2314),this['_cache'][_0x7005c1];}else{if($gameTemp[_0x2e7008(0x6b1)]())console[_0x2e7008(0x653)](_0x376f25);}}}}return _0xf34d27;};return this[_0x4d27d1(0x9dd)]()[_0x4d27d1(0x7ac)](_0x1187c7,0x0);},Game_BattlerBase[_0x5443f5(0x353)][_0x5443f5(0x899)]=function(_0x381a4c){const _0x2085fc=_0x5443f5;let _0x30dbda='xparam'+_0x381a4c+_0x2085fc(0x2c2);if(this['checkCacheKey'](_0x30dbda))return this[_0x2085fc(0x39e)][_0x30dbda];return this[_0x2085fc(0x39e)][_0x30dbda]=VisuMZ[_0x2085fc(0x425)]['Settings'][_0x2085fc(0x36a)][_0x2085fc(0x493)][_0x2085fc(0x91b)](this,_0x381a4c),this['_cache'][_0x30dbda];},Game_BattlerBase['prototype'][_0x5443f5(0x706)]=function(_0x30dc31){const _0x5834a9=_0x5443f5,_0x585a88=(_0x189ad3,_0x2d92a3)=>{const _0x3f6f45=_0x5572;if(!_0x2d92a3)return _0x189ad3;if(_0x2d92a3[_0x3f6f45(0xe7)][_0x3f6f45(0x8ee)](VisuMZ[_0x3f6f45(0x425)][_0x3f6f45(0x76d)][_0x3f6f45(0x94e)][_0x30dc31])){if('ryhbH'===_0x3f6f45(0x860)){var _0x5ecbed=Number(RegExp['$1'])/0x64;_0x189ad3+=_0x5ecbed;}else return _0x1a9e7e=_0x6f0e63[_0x3f6f45(0x6d0)](/(\d)/gi,(_0x4f4657,_0x567d6d)=>_0x3f6f45(0x50d)[_0x3f6f45(0x2d3)](_0x5a1240(_0x567d6d))),'%2%1%3'[_0x3f6f45(0x2d3)](_0x25ee6b,_0x8027b7,_0x143c31);}if(_0x2d92a3[_0x3f6f45(0xe7)][_0x3f6f45(0x8ee)](VisuMZ[_0x3f6f45(0x425)][_0x3f6f45(0x76d)]['sparamPlus2'][_0x30dc31])){var _0x5ecbed=Number(RegExp['$1']);_0x189ad3+=_0x5ecbed;}if(_0x2d92a3['note'][_0x3f6f45(0x8ee)](VisuMZ[_0x3f6f45(0x425)]['RegExp'][_0x3f6f45(0x364)][_0x30dc31])){var _0x90aaf6=String(RegExp['$1']);try{_0x189ad3+=eval(_0x90aaf6);}catch(_0x2df6e1){if($gameTemp[_0x3f6f45(0x6b1)]())console[_0x3f6f45(0x653)](_0x2df6e1);}}return _0x189ad3;};return this[_0x5834a9(0x9dd)]()['reduce'](_0x585a88,0x0);},Game_BattlerBase[_0x5443f5(0x353)][_0x5443f5(0x657)]=function(_0x127e07){const _0x1c6f14=_0x5443f5,_0x3ef59a=(_0x1b3565,_0x418933)=>{const _0x3512b=_0x5572;if(_0x3512b(0x651)!==_0x3512b(0x97b)){if(!_0x418933)return _0x1b3565;if(_0x418933[_0x3512b(0xe7)][_0x3512b(0x8ee)](VisuMZ[_0x3512b(0x425)][_0x3512b(0x76d)]['sparamRate1'][_0x127e07])){if('pyEfW'===_0x3512b(0x350)){var _0x2fde08=Number(RegExp['$1'])/0x64;_0x1b3565*=_0x2fde08;}else return![];}if(_0x418933[_0x3512b(0xe7)][_0x3512b(0x8ee)](VisuMZ[_0x3512b(0x425)][_0x3512b(0x76d)]['sparamRate2'][_0x127e07])){if(_0x3512b(0x795)===_0x3512b(0x324))this[_0x3512b(0x71d)](_0x266908);else{var _0x2fde08=Number(RegExp['$1']);_0x1b3565*=_0x2fde08;}}if(_0x418933['note'][_0x3512b(0x8ee)](VisuMZ[_0x3512b(0x425)][_0x3512b(0x76d)][_0x3512b(0x3d3)][_0x127e07])){if(_0x3512b(0x81b)!==_0x3512b(0x81b)){const _0x47f619=_0x2d2e8c['call'](this);return _0x321b0d==='integer'?_0x369451[_0x3512b(0x558)](_0x47f619):_0x47f619;}else{var _0x1f5de6=String(RegExp['$1']);try{_0x3512b(0x60b)==='LvbRq'?this[_0x3512b(0x1e7)]=_0x3512b(0x456):_0x1b3565*=eval(_0x1f5de6);}catch(_0x4c8c5d){if(_0x3512b(0x23f)===_0x3512b(0x23f)){if($gameTemp['isPlaytest']())console[_0x3512b(0x653)](_0x4c8c5d);}else _0x569d07[_0x109542]=_0x2dd55f[_0x3512b(0x9b8)][_0x65489b[_0x2fd32b]];}}}return _0x1b3565;}else this[_0x3512b(0x1e7)]=0x0;};return this[_0x1c6f14(0x9dd)]()[_0x1c6f14(0x7ac)](_0x3ef59a,0x1);},Game_BattlerBase['prototype']['sparamFlatBonus']=function(_0x23a9b0){const _0x557b74=_0x5443f5,_0x493dca=(_0x3a50ac,_0x48bbc7)=>{const _0x3f75c2=_0x5572;if(!_0x48bbc7)return _0x3a50ac;if(_0x48bbc7[_0x3f75c2(0xe7)]['match'](VisuMZ[_0x3f75c2(0x425)][_0x3f75c2(0x76d)][_0x3f75c2(0x3ad)][_0x23a9b0])){var _0x12c453=Number(RegExp['$1'])/0x64;_0x3a50ac+=_0x12c453;}if(_0x48bbc7[_0x3f75c2(0xe7)]['match'](VisuMZ[_0x3f75c2(0x425)][_0x3f75c2(0x76d)][_0x3f75c2(0x4fd)][_0x23a9b0])){var _0x12c453=Number(RegExp['$1']);_0x3a50ac+=_0x12c453;}if(_0x48bbc7[_0x3f75c2(0xe7)][_0x3f75c2(0x8ee)](VisuMZ[_0x3f75c2(0x425)][_0x3f75c2(0x76d)][_0x3f75c2(0x895)][_0x23a9b0])){var _0x53e5df=String(RegExp['$1']);try{_0x3a50ac+=eval(_0x53e5df);}catch(_0x5a4baf){if($gameTemp[_0x3f75c2(0x6b1)]())console[_0x3f75c2(0x653)](_0x5a4baf);}}return _0x3a50ac;};return this[_0x557b74(0x9dd)]()[_0x557b74(0x7ac)](_0x493dca,0x0);},Game_BattlerBase[_0x5443f5(0x353)][_0x5443f5(0x1d0)]=function(_0x21dd9b){const _0x1db842=_0x5443f5;let _0x472474='sparam'+_0x21dd9b+_0x1db842(0x2c2);if(this[_0x1db842(0x4c4)](_0x472474))return this[_0x1db842(0x39e)][_0x472474];return this['_cache'][_0x472474]=VisuMZ[_0x1db842(0x425)][_0x1db842(0x446)]['Param']['SParameterFormula'][_0x1db842(0x91b)](this,_0x21dd9b),this['_cache'][_0x472474];},Game_BattlerBase[_0x5443f5(0x353)][_0x5443f5(0x4fe)]=function(_0x10389c,_0xf50c28){const _0x577f21=_0x5443f5;if(typeof paramId===_0x577f21(0x546))return this[_0x577f21(0x1d2)](_0x10389c);_0x10389c=String(_0x10389c||'')[_0x577f21(0x1ca)]();if(_0x10389c===_0x577f21(0x60f))return this[_0x577f21(0x1d2)](0x0);if(_0x10389c==='MAXMP')return this[_0x577f21(0x1d2)](0x1);if(_0x10389c===_0x577f21(0x32d))return this[_0x577f21(0x1d2)](0x2);if(_0x10389c===_0x577f21(0x5ec))return this[_0x577f21(0x1d2)](0x3);if(_0x10389c===_0x577f21(0x1d7))return this[_0x577f21(0x1d2)](0x4);if(_0x10389c===_0x577f21(0x420))return this[_0x577f21(0x1d2)](0x5);if(_0x10389c==='AGI')return this[_0x577f21(0x1d2)](0x6);if(_0x10389c===_0x577f21(0x793))return this['param'](0x7);if(_0x10389c===_0x577f21(0x180))return _0xf50c28?String(Math[_0x577f21(0x558)](this['xparam'](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x10389c===_0x577f21(0x782))return _0xf50c28?String(Math['round'](this[_0x577f21(0x899)](0x1)*0x64))+'%':this['xparam'](0x1);if(_0x10389c===_0x577f21(0x7c5))return _0xf50c28?String(Math['round'](this[_0x577f21(0x899)](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x10389c===_0x577f21(0x423))return _0xf50c28?String(Math[_0x577f21(0x558)](this[_0x577f21(0x899)](0x3)*0x64))+'%':this[_0x577f21(0x899)](0x3);if(_0x10389c===_0x577f21(0x265))return _0xf50c28?String(Math['round'](this['xparam'](0x4)*0x64))+'%':this[_0x577f21(0x899)](0x4);if(_0x10389c==='MRF')return _0xf50c28?String(Math[_0x577f21(0x558)](this[_0x577f21(0x899)](0x5)*0x64))+'%':this['xparam'](0x5);if(_0x10389c===_0x577f21(0x421))return _0xf50c28?String(Math[_0x577f21(0x558)](this[_0x577f21(0x899)](0x6)*0x64))+'%':this[_0x577f21(0x899)](0x6);if(_0x10389c==='HRG')return _0xf50c28?String(Math[_0x577f21(0x558)](this[_0x577f21(0x899)](0x7)*0x64))+'%':this['xparam'](0x7);if(_0x10389c===_0x577f21(0x90d))return _0xf50c28?String(Math[_0x577f21(0x558)](this[_0x577f21(0x899)](0x8)*0x64))+'%':this[_0x577f21(0x899)](0x8);if(_0x10389c===_0x577f21(0x5c5))return _0xf50c28?String(Math[_0x577f21(0x558)](this[_0x577f21(0x899)](0x9)*0x64))+'%':this[_0x577f21(0x899)](0x9);if(_0x10389c==='TGR')return _0xf50c28?String(Math['round'](this[_0x577f21(0x1d0)](0x0)*0x64))+'%':this[_0x577f21(0x1d0)](0x0);if(_0x10389c===_0x577f21(0x2f2))return _0xf50c28?String(Math[_0x577f21(0x558)](this[_0x577f21(0x1d0)](0x1)*0x64))+'%':this[_0x577f21(0x1d0)](0x1);if(_0x10389c===_0x577f21(0x8ac))return _0xf50c28?String(Math[_0x577f21(0x558)](this[_0x577f21(0x1d0)](0x2)*0x64))+'%':this['sparam'](0x2);if(_0x10389c===_0x577f21(0x5a0))return _0xf50c28?String(Math[_0x577f21(0x558)](this['sparam'](0x3)*0x64))+'%':this['sparam'](0x3);if(_0x10389c===_0x577f21(0x830))return _0xf50c28?String(Math[_0x577f21(0x558)](this[_0x577f21(0x1d0)](0x4)*0x64))+'%':this[_0x577f21(0x1d0)](0x4);if(_0x10389c===_0x577f21(0xef))return _0xf50c28?String(Math['round'](this[_0x577f21(0x1d0)](0x5)*0x64))+'%':this[_0x577f21(0x1d0)](0x5);if(_0x10389c===_0x577f21(0x413))return _0xf50c28?String(Math['round'](this[_0x577f21(0x1d0)](0x6)*0x64))+'%':this[_0x577f21(0x1d0)](0x6);if(_0x10389c===_0x577f21(0x47d))return _0xf50c28?String(Math['round'](this[_0x577f21(0x1d0)](0x7)*0x64))+'%':this[_0x577f21(0x1d0)](0x7);if(_0x10389c===_0x577f21(0x2ae))return _0xf50c28?String(Math[_0x577f21(0x558)](this['sparam'](0x8)*0x64))+'%':this['sparam'](0x8);if(_0x10389c===_0x577f21(0x89a))return _0xf50c28?String(Math['round'](this[_0x577f21(0x1d0)](0x9)*0x64))+'%':this[_0x577f21(0x1d0)](0x9);if(VisuMZ[_0x577f21(0x425)][_0x577f21(0x8db)][_0x10389c]){if(_0x577f21(0x234)===_0x577f21(0x994))_0x17b7b3['current']=_0x2fdead[_0x577f21(0x734)];else{const _0x41941b=VisuMZ[_0x577f21(0x425)][_0x577f21(0x8db)][_0x10389c],_0x4f7ec7=this[_0x41941b];if(VisuMZ[_0x577f21(0x425)][_0x577f21(0x143)][_0x10389c]===_0x577f21(0x531)){if(_0x577f21(0x983)!=='YjdPl')return _0x4f7ec7;else this[_0x577f21(0x9a8)](_0xe6e9c5,_0x35697b,_0xaaa329,_0x376548,_0x406890);}else{if(_0x577f21(0x7d3)===_0x577f21(0x7d3))return _0xf50c28?String(Math[_0x577f21(0x558)](_0x4f7ec7*0x64))+'%':_0x4f7ec7;else this['_forcedTroopView']='FV';}}}return'';},Game_BattlerBase['prototype']['isDying']=function(){const _0x503768=_0x5443f5;return this['isAlive']()&&this['_hp']<this[_0x503768(0x687)]*VisuMZ[_0x503768(0x425)]['Settings'][_0x503768(0x36a)][_0x503768(0x5c6)];},Game_Battler[_0x5443f5(0x353)][_0x5443f5(0x626)]=function(){const _0xf6f57c=_0x5443f5;SoundManager[_0xf6f57c(0x50c)](),this[_0xf6f57c(0x658)]('evade');},VisuMZ[_0x5443f5(0x425)]['Game_Actor_paramBase']=Game_Actor['prototype'][_0x5443f5(0x87c)],Game_Actor['prototype'][_0x5443f5(0x87c)]=function(_0xc1a44d){const _0x30b1da=_0x5443f5;if(this[_0x30b1da(0x150)]>0x63)return this[_0x30b1da(0x215)](_0xc1a44d);return VisuMZ[_0x30b1da(0x425)][_0x30b1da(0x9a7)][_0x30b1da(0x91b)](this,_0xc1a44d);},Game_Actor[_0x5443f5(0x353)][_0x5443f5(0x215)]=function(_0x136040){const _0x19e523=_0x5443f5,_0x41f5f7=this[_0x19e523(0x89d)]()['params'][_0x136040][0x63],_0x232459=this[_0x19e523(0x89d)]()[_0x19e523(0x4af)][_0x136040][0x62];return _0x41f5f7+(_0x41f5f7-_0x232459)*(this[_0x19e523(0x150)]-0x63);},VisuMZ['CoreEngine'][_0x5443f5(0x3d2)]=Game_Actor['prototype'][_0x5443f5(0x169)],Game_Actor[_0x5443f5(0x353)][_0x5443f5(0x169)]=function(_0x372f17,_0xa9acce){const _0x59240c=_0x5443f5;$gameTemp['_changingClass']=!![],VisuMZ[_0x59240c(0x425)][_0x59240c(0x3d2)][_0x59240c(0x91b)](this,_0x372f17,_0xa9acce),$gameTemp[_0x59240c(0x53c)]=undefined;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x1fd)]=Game_Actor[_0x5443f5(0x353)][_0x5443f5(0x1b5)],Game_Actor['prototype'][_0x5443f5(0x1b5)]=function(){const _0x199505=_0x5443f5;VisuMZ[_0x199505(0x425)][_0x199505(0x1fd)][_0x199505(0x91b)](this);if(!$gameTemp['_changingClass'])this['levelUpRecovery']();},Game_Actor[_0x5443f5(0x353)][_0x5443f5(0x2f1)]=function(){const _0x413349=_0x5443f5;this[_0x413349(0x39e)]={};if(VisuMZ[_0x413349(0x425)]['Settings'][_0x413349(0x5e6)][_0x413349(0x57f)])this[_0x413349(0x54b)]=this[_0x413349(0x687)];if(VisuMZ['CoreEngine'][_0x413349(0x446)][_0x413349(0x5e6)][_0x413349(0x8c4)])this[_0x413349(0x866)]=this[_0x413349(0x10b)];},Game_Actor[_0x5443f5(0x353)][_0x5443f5(0x805)]=function(){const _0x594d16=_0x5443f5;if(this[_0x594d16(0x10d)]())return 0x1;const _0x1d6f88=this[_0x594d16(0x5d0)]()-this['currentLevelExp'](),_0x1f2965=this['currentExp']()-this[_0x594d16(0x2b5)]();return(_0x1f2965/_0x1d6f88)['clamp'](0x0,0x1);},Game_Actor[_0x5443f5(0x353)]['traitObjects']=function(){const _0x677c95=_0x5443f5,_0x25cd03=Game_Battler[_0x677c95(0x353)][_0x677c95(0x9dd)][_0x677c95(0x91b)](this);for(const _0xe6d886 of this[_0x677c95(0x6c8)]()){_0xe6d886&&_0x25cd03[_0x677c95(0x747)](_0xe6d886);}return _0x25cd03['push'](this[_0x677c95(0x89d)](),this[_0x677c95(0x539)]()),_0x25cd03;},Object['defineProperty'](Game_Enemy[_0x5443f5(0x353)],'level',{'get':function(){const _0x373421=_0x5443f5;return this[_0x373421(0x1b8)]();},'configurable':!![]}),Game_Enemy[_0x5443f5(0x353)][_0x5443f5(0x1b8)]=function(){const _0x540515=_0x5443f5;return this[_0x540515(0x8fc)]()[_0x540515(0x150)];},Game_Enemy[_0x5443f5(0x353)]['moveRelativeToResolutionChange']=function(){const _0x13ab40=_0x5443f5;if(!this[_0x13ab40(0x4a0)]){this[_0x13ab40(0x63e)]+=Math[_0x13ab40(0x558)]((Graphics[_0x13ab40(0x99b)]-0x270)/0x2),this[_0x13ab40(0x63e)]-=Math[_0x13ab40(0x3fa)]((Graphics[_0x13ab40(0x99b)]-Graphics[_0x13ab40(0x66f)])/0x2);if($gameSystem[_0x13ab40(0x227)]())this[_0x13ab40(0x48c)]-=Math['floor']((Graphics[_0x13ab40(0x786)]-Graphics[_0x13ab40(0x76c)])/0x2);else{if(_0x13ab40(0x728)===_0x13ab40(0x307))return _0x40832d[_0x13ab40(0x6aa)][_0x13ab40(0x235)]['call'](this);else this[_0x13ab40(0x48c)]+=Math[_0x13ab40(0x558)]((Graphics[_0x13ab40(0x76c)]-0x330)/0x2);}}this['_repositioned']=!![];},Game_Party[_0x5443f5(0x353)][_0x5443f5(0x110)]=function(){const _0x3c614d=_0x5443f5;return VisuMZ[_0x3c614d(0x425)][_0x3c614d(0x446)][_0x3c614d(0x90e)][_0x3c614d(0x4a3)];},VisuMZ[_0x5443f5(0x425)]['Game_Party_consumeItem']=Game_Party[_0x5443f5(0x353)]['consumeItem'],Game_Party['prototype'][_0x5443f5(0x200)]=function(_0xa1d80c){const _0x4d59a9=_0x5443f5;if(VisuMZ[_0x4d59a9(0x425)][_0x4d59a9(0x446)][_0x4d59a9(0x5e6)][_0x4d59a9(0x86b)]&&DataManager['isKeyItem'](_0xa1d80c))return;VisuMZ['CoreEngine'][_0x4d59a9(0x3f1)][_0x4d59a9(0x91b)](this,_0xa1d80c);},Game_Party[_0x5443f5(0x353)]['setupBattleTestItems']=function(){const _0x254dd4=_0x5443f5,_0x34fd50=VisuMZ[_0x254dd4(0x425)][_0x254dd4(0x446)][_0x254dd4(0x5e6)],_0x10cbc1=_0x34fd50[_0x254dd4(0x643)]??0x63;let _0xc1d8a1=[];(_0x34fd50[_0x254dd4(0x9cb)]??!![])&&(_0xc1d8a1=_0xc1d8a1['concat']($dataItems));(_0x34fd50[_0x254dd4(0x992)]??!![])&&(_0xc1d8a1=_0xc1d8a1[_0x254dd4(0x3f3)]($dataWeapons));if(_0x34fd50[_0x254dd4(0x7e2)]??!![]){if(_0x254dd4(0x28a)===_0x254dd4(0x28a))_0xc1d8a1=_0xc1d8a1['concat']($dataArmors);else return 0.5*_0x256c74*_0x4bd778*((_0x1ec7bc+0x1)*_0x22cbb4-_0x2523eb);}for(const _0x4a3ef6 of _0xc1d8a1){if(!_0x4a3ef6)continue;if(_0x4a3ef6[_0x254dd4(0x744)][_0x254dd4(0x7b7)]()<=0x0)continue;if(_0x4a3ef6['name'][_0x254dd4(0x8ee)](/-----/i))continue;this['gainItem'](_0x4a3ef6,_0x10cbc1);}},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x1b6)]=Game_Troop[_0x5443f5(0x353)]['setup'],Game_Troop[_0x5443f5(0x353)][_0x5443f5(0x71a)]=function(_0xd22b2f){const _0x56b7f4=_0x5443f5;$gameTemp[_0x56b7f4(0x32b)](),$gameTemp[_0x56b7f4(0xff)](_0xd22b2f),VisuMZ[_0x56b7f4(0x425)]['Game_Troop_setup'][_0x56b7f4(0x91b)](this,_0xd22b2f);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x74d)]=Game_Map[_0x5443f5(0x353)][_0x5443f5(0x71a)],Game_Map['prototype'][_0x5443f5(0x71a)]=function(_0x1c9e02){const _0x352e78=_0x5443f5;VisuMZ[_0x352e78(0x425)][_0x352e78(0x74d)][_0x352e78(0x91b)](this,_0x1c9e02),this[_0x352e78(0x5ab)](),this[_0x352e78(0x7c8)](_0x1c9e02);},Game_Map[_0x5443f5(0x353)][_0x5443f5(0x7c8)]=function(){const _0x190dbd=_0x5443f5;this[_0x190dbd(0x113)]=VisuMZ[_0x190dbd(0x425)][_0x190dbd(0x446)][_0x190dbd(0x5e6)][_0x190dbd(0x850)]||![];const _0x17f4c0=VisuMZ[_0x190dbd(0x425)][_0x190dbd(0x446)]['ScreenResolution'],_0x17c5a5=$dataMap?$dataMap[_0x190dbd(0xe7)]||'':'';if(_0x17c5a5[_0x190dbd(0x8ee)](/<SHOW TILE SHADOWS>/i))this[_0x190dbd(0x113)]=![];else _0x17c5a5[_0x190dbd(0x8ee)](/<HIDE TILE SHADOWS>/i)&&(this['_hideTileShadows']=!![]);if(_0x17c5a5['match'](/<SCROLL LOCK X>/i)){if(_0x190dbd(0x95d)==='ENkBq')return!![];else this[_0x190dbd(0x1a2)]()[_0x190dbd(0x584)]=!![],this[_0x190dbd(0x1a2)]()['displayX']=_0x17f4c0['DisplayLockX'];}else _0x17c5a5['match'](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x190dbd(0x1a2)]()['centerX']=!![],this[_0x190dbd(0x1a2)]()[_0x190dbd(0x54c)]=Number(RegExp['$1']));if(_0x17c5a5[_0x190dbd(0x8ee)](/<SCROLL LOCK Y>/i))_0x190dbd(0x1a1)!==_0x190dbd(0x473)?(this[_0x190dbd(0x1a2)]()[_0x190dbd(0x8b4)]=!![],this['centerCameraCheckData']()[_0x190dbd(0x2a3)]=_0x17f4c0[_0x190dbd(0x5a6)]):this[_0x190dbd(0x960)][_0x190dbd(0x3c0)](_0x39c60d[_0x190dbd(0x6aa)][_0x190dbd(0x75a)]);else{if(_0x17c5a5[_0x190dbd(0x8ee)](/<SCROLL LOCK Y: (.*?)>/i)){if(_0x190dbd(0x551)==='dMlqI')this[_0x190dbd(0x1a2)]()[_0x190dbd(0x8b4)]=!![],this[_0x190dbd(0x1a2)]()[_0x190dbd(0x2a3)]=Number(RegExp['$1']);else{const _0x549b24='AllTroops';_0x2d54eb['remove'](_0x45c5d3)['remove']('')[_0x190dbd(0x2d0)](null);const _0x1bdd07=_0x9f6d03['join'](_0x190dbd(0x23c))[_0x190dbd(0x7b7)]();_0x1c76fe[_0x190dbd(0x425)][_0x190dbd(0x870)](_0x1bdd07,_0x549b24,!![]),_0x1749ca[_0x190dbd(0x970)][_0x190dbd(0x731)]=!![];}}}},Game_Map[_0x5443f5(0x353)][_0x5443f5(0x863)]=function(){const _0x3c8d3f=_0x5443f5;if(this[_0x3c8d3f(0x113)]===undefined)this[_0x3c8d3f(0x7c8)]();return this[_0x3c8d3f(0x113)];},Game_Map[_0x5443f5(0x353)][_0x5443f5(0x5ab)]=function(){const _0x4d44ca=_0x5443f5,_0x4938ae=VisuMZ['CoreEngine']['Settings'][_0x4d44ca(0x9a6)];this['_centerCameraCheck']={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x4938ae[_0x4d44ca(0x195)]){const _0x2a2eb8=Graphics[_0x4d44ca(0x786)]/this[_0x4d44ca(0x67c)]();if(_0x2a2eb8%0x1!==0x0&&Math[_0x4d44ca(0x474)](_0x2a2eb8)===this[_0x4d44ca(0x786)]()&&!this[_0x4d44ca(0x23a)]()){if(_0x4d44ca(0x6c0)===_0x4d44ca(0x388))return this['_sideButtonLayout'];else this[_0x4d44ca(0x61d)][_0x4d44ca(0x584)]=!![],this[_0x4d44ca(0x61d)]['displayX']=_0x4938ae[_0x4d44ca(0x36e)]||0x0;}}if(_0x4938ae[_0x4d44ca(0x9ab)]){if('PrdKU'!==_0x4d44ca(0x82c)){const _0x3be167=_0x371506[_0x4d44ca(0x425)][_0x4d44ca(0x8db)][_0x372d66],_0x46c50c=this[_0x3be167];return _0x26e8f9[_0x4d44ca(0x425)][_0x4d44ca(0x143)][_0x7e2f31]===_0x4d44ca(0x531)?_0x46c50c:_0x545e9e?_0x4529e7(_0xff40dd[_0x4d44ca(0x558)](_0x46c50c*0x64))+'%':_0x46c50c;}else{const _0x178acd=Graphics[_0x4d44ca(0x99b)]/this[_0x4d44ca(0x755)]();_0x178acd%0x1!==0x0&&Math[_0x4d44ca(0x474)](_0x178acd)===this[_0x4d44ca(0x99b)]()&&!this[_0x4d44ca(0x851)]()&&(this[_0x4d44ca(0x61d)]['centerY']=!![],this['_centerCameraCheck'][_0x4d44ca(0x2a3)]=_0x4938ae[_0x4d44ca(0x5a6)]||0x0);}}},Game_Map[_0x5443f5(0x353)][_0x5443f5(0x1a2)]=function(){const _0xef6305=_0x5443f5;if(this['_centerCameraCheck']===undefined)this['checkCoreEngineDisplayCenter']();return this[_0xef6305(0x61d)];},VisuMZ['CoreEngine'][_0x5443f5(0x509)]=Game_Map[_0x5443f5(0x353)][_0x5443f5(0x743)],Game_Map[_0x5443f5(0x353)]['scrollDown']=function(_0x4d55f4){const _0x5e6c62=_0x5443f5;if(this[_0x5e6c62(0x1a2)]()[_0x5e6c62(0x8b4)]&&$gameScreen[_0x5e6c62(0x360)]()===0x1){if(_0x5e6c62(0x2d1)==='CTnyi'){this[_0x5e6c62(0x71c)]=this['centerCameraCheckData']()[_0x5e6c62(0x2a3)];return;}else return _0x7ed1fc[_0x5e6c62(0x6aa)][_0x5e6c62(0x235)][_0x5e6c62(0x91b)](this);}VisuMZ[_0x5e6c62(0x425)][_0x5e6c62(0x509)][_0x5e6c62(0x91b)](this,_0x4d55f4);},VisuMZ['CoreEngine'][_0x5443f5(0x5de)]=Game_Map[_0x5443f5(0x353)][_0x5443f5(0x4fb)],Game_Map[_0x5443f5(0x353)]['scrollLeft']=function(_0x5a2e57){const _0x4a0412=_0x5443f5;if(this['centerCameraCheckData']()['centerX']&&$gameScreen[_0x4a0412(0x360)]()===0x1){this[_0x4a0412(0x1a7)]=this[_0x4a0412(0x1a2)]()[_0x4a0412(0x54c)];return;}VisuMZ[_0x4a0412(0x425)][_0x4a0412(0x5de)]['call'](this,_0x5a2e57);},VisuMZ['CoreEngine']['Game_Map_scrollRight']=Game_Map[_0x5443f5(0x353)][_0x5443f5(0x1e8)],Game_Map[_0x5443f5(0x353)][_0x5443f5(0x1e8)]=function(_0x1460ea){const _0x2e9f75=_0x5443f5;if(this[_0x2e9f75(0x1a2)]()['centerX']&&$gameScreen[_0x2e9f75(0x360)]()===0x1){if(_0x2e9f75(0x276)!=='XvdSF'){const _0x1d3d94=_0x33ec68[_0x2e9f75(0x425)][_0x2e9f75(0x446)][_0x2e9f75(0x147)],_0x58c113=_0x1d3d94[_0x2e9f75(0x384)],_0x266adf=_0x17ac36[_0x2e9f75(0x8f3)](),_0x35b830=_0x2e9f75(0x8d4)[_0x2e9f75(0x2d3)](_0x266adf);return _0x1d3d94[_0x35b830]?_0x1d3d94[_0x35b830]:_0x58c113[_0x2e9f75(0x2d3)](_0x266adf);}else{this[_0x2e9f75(0x1a7)]=this[_0x2e9f75(0x1a2)]()[_0x2e9f75(0x54c)];return;}}VisuMZ[_0x2e9f75(0x425)]['Game_Map_scrollRight'][_0x2e9f75(0x91b)](this,_0x1460ea);},VisuMZ['CoreEngine'][_0x5443f5(0x312)]=Game_Map[_0x5443f5(0x353)][_0x5443f5(0x21d)],Game_Map[_0x5443f5(0x353)][_0x5443f5(0x21d)]=function(_0x13b597){const _0x360434=_0x5443f5;if(this[_0x360434(0x1a2)]()['centerY']&&$gameScreen[_0x360434(0x360)]()===0x1){if(_0x360434(0x838)!==_0x360434(0x993)){this[_0x360434(0x71c)]=this[_0x360434(0x1a2)]()[_0x360434(0x2a3)];return;}else{if(_0x5a95ee&&_0x4c202c['areTileShadowsHidden']())return;_0x2624d8[_0x360434(0x425)][_0x360434(0x696)][_0x360434(0x91b)](this,_0x5ee398,_0x1a5ffa,_0x736901,_0x5aaa57);}}VisuMZ[_0x360434(0x425)][_0x360434(0x312)][_0x360434(0x91b)](this,_0x13b597);},VisuMZ['CoreEngine'][_0x5443f5(0x63b)]=Game_Character[_0x5443f5(0x353)][_0x5443f5(0x40f)],Game_Character['prototype'][_0x5443f5(0x40f)]=function(_0x4001ff){const _0x26fa23=_0x5443f5;try{VisuMZ['CoreEngine'][_0x26fa23(0x63b)][_0x26fa23(0x91b)](this,_0x4001ff);}catch(_0x5e2fc2){if(_0x26fa23(0x7aa)!==_0x26fa23(0x3dd)){if($gameTemp[_0x26fa23(0x6b1)]())console[_0x26fa23(0x653)](_0x5e2fc2);}else this['_clickHandler']();}},Game_Player[_0x5443f5(0x353)][_0x5443f5(0x7bf)]=function(){const _0xc2fdca=_0x5443f5,_0x3b0742=$gameMap['encounterStep']();this[_0xc2fdca(0x7d5)]=Math[_0xc2fdca(0x751)](_0x3b0742)+Math[_0xc2fdca(0x751)](_0x3b0742)+this[_0xc2fdca(0x563)]();},Game_Player[_0x5443f5(0x353)][_0x5443f5(0x563)]=function(){const _0x5cc7f2=_0x5443f5;if($dataMap&&$dataMap[_0x5cc7f2(0xe7)]&&$dataMap[_0x5cc7f2(0xe7)][_0x5cc7f2(0x8ee)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i))return Number(RegExp['$1']);else{if('Zbqfa'===_0x5cc7f2(0x699))return VisuMZ[_0x5cc7f2(0x425)]['Settings']['QoL'][_0x5cc7f2(0x47c)];else _0x1d83f2[_0x5cc7f2(0x63c)](),this[_0x5cc7f2(0x37a)](_0x5cc7f2(0x351));}},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x8be)]=Game_Event[_0x5443f5(0x353)][_0x5443f5(0x30c)],Game_Event['prototype'][_0x5443f5(0x30c)]=function(_0x34f4e7,_0x4347b4){const _0x1cf90e=_0x5443f5;return this[_0x1cf90e(0x3a3)]()?this[_0x1cf90e(0x1db)](_0x34f4e7,_0x4347b4):VisuMZ[_0x1cf90e(0x425)][_0x1cf90e(0x8be)][_0x1cf90e(0x91b)](this,_0x34f4e7,_0x4347b4);},Game_Event[_0x5443f5(0x353)][_0x5443f5(0x3a3)]=function(){const _0x400f2f=_0x5443f5;return VisuMZ[_0x400f2f(0x425)]['Settings'][_0x400f2f(0x5e6)]['SmartEventCollisionPriority'];},Game_Event[_0x5443f5(0x353)]['checkSmartEventCollision']=function(_0x33b900,_0x163390){const _0xa86552=_0x5443f5;if(!this[_0xa86552(0x4d9)]()){if(_0xa86552(0x4e8)!==_0xa86552(0x288))return![];else{const _0x253f92=_0x13caf4[_0xa86552(0x425)][_0xa86552(0x446)]['jsQuickFunc'];for(const _0x188ff9 of _0x253f92){const _0x541f0e=_0x188ff9[_0xa86552(0x775)]['replace'](/[ ]/g,''),_0x1aeff8=_0x188ff9['CodeJS'];_0x14bfe0[_0xa86552(0x425)][_0xa86552(0x3eb)](_0x541f0e,_0x1aeff8);}}}else{if(_0xa86552(0x44e)==='QZgnH')_0x1c984e+=_0x282a1d+_0xa86552(0x23c);else{const _0x121889=$gameMap[_0xa86552(0x9d7)](_0x33b900,_0x163390)[_0xa86552(0x754)](_0x3e80c7=>_0x3e80c7[_0xa86552(0x4d9)]());return _0x121889[_0xa86552(0x44d)]>0x0;}}},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x1f1)]=Game_Interpreter[_0x5443f5(0x353)][_0x5443f5(0xf3)],Game_Interpreter['prototype']['command105']=function(_0x1a0bf1){const _0x483439=_0x5443f5,_0x40ab8c=this[_0x483439(0x962)]();return _0x40ab8c[_0x483439(0x8ee)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x483439(0x13f)](_0x40ab8c):VisuMZ[_0x483439(0x425)][_0x483439(0x1f1)][_0x483439(0x91b)](this,_0x1a0bf1);},Game_Interpreter['prototype'][_0x5443f5(0x962)]=function(){const _0x2d4ad7=_0x5443f5;let _0x54ef2a='',_0x3b3f75=this['_index']+0x1;while(this[_0x2d4ad7(0x407)][_0x3b3f75]&&this[_0x2d4ad7(0x407)][_0x3b3f75][_0x2d4ad7(0x8d8)]===0x195){_0x54ef2a+=this[_0x2d4ad7(0x407)][_0x3b3f75][_0x2d4ad7(0x2f6)][0x0]+'\x0a',_0x3b3f75++;}return _0x54ef2a;},Game_Interpreter[_0x5443f5(0x353)][_0x5443f5(0x13f)]=function(_0x4b032a){const _0x458a1f=_0x5443f5;try{eval(_0x4b032a);}catch(_0x5cdefa){_0x458a1f(0x241)!==_0x458a1f(0x241)?(_0x5e1f17[_0x458a1f(0x425)][_0x458a1f(0x30e)][_0x458a1f(0x91b)](this,_0x489d24,_0xadcfe8),this[_0x458a1f(0x68d)]()):$gameTemp[_0x458a1f(0x6b1)]()&&(console['log'](_0x458a1f(0x7ec)),console[_0x458a1f(0x653)](_0x5cdefa));}return!![];},VisuMZ['CoreEngine']['Game_Interpreter_command111']=Game_Interpreter['prototype'][_0x5443f5(0x675)],Game_Interpreter[_0x5443f5(0x353)][_0x5443f5(0x675)]=function(_0xf5fa28){const _0x4ea7ca=_0x5443f5;try{_0x4ea7ca(0x418)!=='CWUjF'?_0x4b102d[_0x4ea7ca(0x443)]&&(this['_forcedBattleSys']=_0x4ea7ca(0x1ea)):VisuMZ[_0x4ea7ca(0x425)][_0x4ea7ca(0x828)]['call'](this,_0xf5fa28);}catch(_0x1c46fd){$gameTemp[_0x4ea7ca(0x6b1)]()&&(console['log']('Conditional\x20Branch\x20Script\x20Error'),console[_0x4ea7ca(0x653)](_0x1c46fd)),this[_0x4ea7ca(0x3f4)]();}return!![];},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x485)]=Game_Interpreter[_0x5443f5(0x353)]['command122'],Game_Interpreter['prototype'][_0x5443f5(0x7f6)]=function(_0x495e45){const _0x5a850e=_0x5443f5;try{VisuMZ[_0x5a850e(0x425)][_0x5a850e(0x485)][_0x5a850e(0x91b)](this,_0x495e45);}catch(_0x2a70d6){_0x5a850e(0x29e)===_0x5a850e(0x8a7)?(_0x162e4d[_0x5a850e(0x425)][_0x5a850e(0x441)][_0x5a850e(0x91b)](this,_0x46b3bd,_0x1a93ff,_0x437acc),_0x271cd1['ShowDevTools'](![])):$gameTemp[_0x5a850e(0x6b1)]()&&(console['log'](_0x5a850e(0x329)),console[_0x5a850e(0x653)](_0x2a70d6));}return!![];},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x517)]=Game_Interpreter[_0x5443f5(0x353)][_0x5443f5(0x3fc)],Game_Interpreter[_0x5443f5(0x353)][_0x5443f5(0x3fc)]=function(){const _0x4e93fc=_0x5443f5;try{VisuMZ[_0x4e93fc(0x425)]['Game_Interpreter_command355'][_0x4e93fc(0x91b)](this);}catch(_0x5d414d){$gameTemp['isPlaytest']()&&(_0x4e93fc(0x7b4)!==_0x4e93fc(0x2b1)?(console['log'](_0x4e93fc(0x77d)),console[_0x4e93fc(0x653)](_0x5d414d)):this[_0x4e93fc(0x448)][_0x4e93fc(0x3c0)](_0x382fbd[_0x4e93fc(0x6aa)]['ItemBgType']));}return!![];},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x781)]=Game_Interpreter[_0x5443f5(0x353)][_0x5443f5(0x389)],Game_Interpreter['prototype'][_0x5443f5(0x389)]=function(_0x25cf06){const _0x54358c=_0x5443f5;return $gameTemp[_0x54358c(0x72f)](this),VisuMZ[_0x54358c(0x425)][_0x54358c(0x781)][_0x54358c(0x91b)](this,_0x25cf06);},Scene_Base['prototype'][_0x5443f5(0x18e)]=function(){const _0x518d8a=_0x5443f5;return VisuMZ['CoreEngine'][_0x518d8a(0x446)]['UI'][_0x518d8a(0x70f)];},Scene_Base[_0x5443f5(0x353)]['isBottomHelpMode']=function(){const _0x106c81=_0x5443f5;return VisuMZ[_0x106c81(0x425)]['Settings']['UI']['BottomHelp'];},Scene_Base[_0x5443f5(0x353)][_0x5443f5(0x48f)]=function(){const _0x1b738b=_0x5443f5;return VisuMZ[_0x1b738b(0x425)][_0x1b738b(0x446)]['UI']['BottomButtons'];},Scene_Base[_0x5443f5(0x353)][_0x5443f5(0x72d)]=function(){const _0x1972d5=_0x5443f5;return VisuMZ[_0x1972d5(0x425)][_0x1972d5(0x446)]['UI'][_0x1972d5(0x991)];},Scene_Base[_0x5443f5(0x353)][_0x5443f5(0x601)]=function(){const _0x139ccb=_0x5443f5;return VisuMZ['CoreEngine'][_0x139ccb(0x446)]['UI']['CommandWidth'];},Scene_Base[_0x5443f5(0x353)][_0x5443f5(0x9e4)]=function(){const _0xf237ec=_0x5443f5;return VisuMZ[_0xf237ec(0x425)]['Settings']['UI'][_0xf237ec(0x50b)];},Scene_Base[_0x5443f5(0x353)]['isWindowMaskingEnabled']=function(){const _0x4c907a=_0x5443f5;return VisuMZ[_0x4c907a(0x425)]['Settings'][_0x4c907a(0x9ad)][_0x4c907a(0x594)];},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x107)]=Scene_Base['prototype']['createWindowLayer'],Scene_Base[_0x5443f5(0x353)][_0x5443f5(0x814)]=function(){const _0xc44be6=_0x5443f5;VisuMZ[_0xc44be6(0x425)]['Scene_Base_createWindowLayer'][_0xc44be6(0x91b)](this),this[_0xc44be6(0x77c)](),this[_0xc44be6(0x985)]['x']=Math[_0xc44be6(0x558)](this[_0xc44be6(0x985)]['x']),this[_0xc44be6(0x985)]['y']=Math[_0xc44be6(0x558)](this[_0xc44be6(0x985)]['y']);},Scene_Base[_0x5443f5(0x353)]['createButtonAssistWindow']=function(){},Scene_Base[_0x5443f5(0x353)][_0x5443f5(0x210)]=function(){const _0x3597bb=_0x5443f5;return TextManager[_0x3597bb(0x678)]('pageup',_0x3597bb(0x874));},Scene_Base[_0x5443f5(0x353)][_0x5443f5(0x4e7)]=function(){const _0x285530=_0x5443f5;return TextManager[_0x285530(0x4f8)]('tab');},Scene_Base['prototype']['buttonAssistKey3']=function(){const _0x34fc44=_0x5443f5;return TextManager[_0x34fc44(0x4f8)](_0x34fc44(0x11a));},Scene_Base[_0x5443f5(0x353)][_0x5443f5(0x12a)]=function(){const _0x3a67cb=_0x5443f5;return TextManager[_0x3a67cb(0x4f8)]('ok');},Scene_Base[_0x5443f5(0x353)][_0x5443f5(0x38a)]=function(){const _0x19ca03=_0x5443f5;return TextManager['getInputButtonString'](_0x19ca03(0x1d5));},Scene_Base[_0x5443f5(0x353)]['buttonAssistText1']=function(){const _0x3a8bd5=_0x5443f5;if(this[_0x3a8bd5(0x25d)]&&this[_0x3a8bd5(0x25d)][_0x3a8bd5(0x5ba)]){if(_0x3a8bd5(0x437)===_0x3a8bd5(0x437))return TextManager[_0x3a8bd5(0x876)];else _0x570278[_0x3a8bd5(0x858)]&&(this['_forcedBattleSys']=_0x3a8bd5(0x456));}else return'';},Scene_Base['prototype']['buttonAssistText2']=function(){return'';},Scene_Base[_0x5443f5(0x353)][_0x5443f5(0x7f2)]=function(){return'';},Scene_Base[_0x5443f5(0x353)][_0x5443f5(0x527)]=function(){return TextManager['buttonAssistOk'];},Scene_Base[_0x5443f5(0x353)]['buttonAssistText5']=function(){const _0x5dc250=_0x5443f5;return TextManager[_0x5dc250(0x17a)];},Scene_Base[_0x5443f5(0x353)][_0x5443f5(0x917)]=function(){return 0x0;},Scene_Base[_0x5443f5(0x353)][_0x5443f5(0x641)]=function(){return 0x0;},Scene_Base[_0x5443f5(0x353)]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base[_0x5443f5(0x353)][_0x5443f5(0x5f8)]=function(){return 0x0;},Scene_Base[_0x5443f5(0x353)]['buttonAssistOffset5']=function(){return 0x0;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x3cb)]=Scene_Boot[_0x5443f5(0x353)][_0x5443f5(0x794)],Scene_Boot[_0x5443f5(0x353)][_0x5443f5(0x794)]=function(){const _0x3b1e8a=_0x5443f5;VisuMZ[_0x3b1e8a(0x425)][_0x3b1e8a(0x3cb)][_0x3b1e8a(0x91b)](this),this[_0x3b1e8a(0x3b4)]();},Scene_Boot[_0x5443f5(0x353)][_0x5443f5(0x3b4)]=function(){const _0x4e8378=_0x5443f5,_0x2f58f6=[_0x4e8378(0x884),'battlebacks1',_0x4e8378(0x52f),_0x4e8378(0x568),_0x4e8378(0x3a9),_0x4e8378(0x719),_0x4e8378(0x3a8),'pictures',_0x4e8378(0x365),_0x4e8378(0x286),_0x4e8378(0x2f9),_0x4e8378(0x7f0),_0x4e8378(0x100),_0x4e8378(0x58a)];for(const _0x26dfcc of _0x2f58f6){if(_0x4e8378(0x40a)!==_0x4e8378(0x40a)){var _0x33bf08=_0x4a28f3(_0x32f65c['$1'])/0x64;_0x33aed7+=_0x33bf08;}else{const _0x17e6fc=VisuMZ[_0x4e8378(0x425)][_0x4e8378(0x446)][_0x4e8378(0x45e)][_0x26dfcc],_0x587858=_0x4e8378(0x818)['format'](_0x26dfcc);for(const _0x25611a of _0x17e6fc){if('mvNEi'!==_0x4e8378(0x95c)){const _0x49db18=_0x1c81c0[_0x546b4b];if(!_0x49db18)return;const _0x26652f=new _0x59462b();this[_0x4e8378(0x416)](_0x26652f),_0x26652f[_0x4e8378(0x2be)](_0x450c82);}else ImageManager['loadBitmap'](_0x587858,_0x25611a);}}}},VisuMZ[_0x5443f5(0x425)]['Scene_Boot_startNormalGame']=Scene_Boot[_0x5443f5(0x353)]['startNormalGame'],Scene_Boot['prototype'][_0x5443f5(0x455)]=function(){const _0x56cd85=_0x5443f5;Utils[_0x56cd85(0x491)](_0x56cd85(0x57a))&&VisuMZ[_0x56cd85(0x425)]['Settings']['QoL'][_0x56cd85(0x274)]?this[_0x56cd85(0x5bf)]():VisuMZ['CoreEngine'][_0x56cd85(0x4a7)][_0x56cd85(0x91b)](this);},Scene_Boot[_0x5443f5(0x353)]['startAutoNewGame']=function(){const _0x19321a=_0x5443f5;this[_0x19321a(0x944)](),DataManager[_0x19321a(0x118)](),SceneManager[_0x19321a(0x8f7)](Scene_Map);},Scene_Boot[_0x5443f5(0x353)][_0x5443f5(0x92c)]=function(){const _0x219fd7=_0x5443f5,_0x5a836a=$dataSystem['advanced']['uiAreaWidth'],_0x2153ce=$dataSystem[_0x219fd7(0x52e)][_0x219fd7(0x1de)],_0x13b819=VisuMZ[_0x219fd7(0x425)]['Settings']['UI']['BoxMargin'];Graphics['boxWidth']=_0x5a836a-_0x13b819*0x2,Graphics[_0x219fd7(0x66f)]=_0x2153ce-_0x13b819*0x2,this[_0x219fd7(0x30d)]();},VisuMZ[_0x5443f5(0x425)]['Scene_Boot_updateDocumentTitle']=Scene_Boot[_0x5443f5(0x353)][_0x5443f5(0x753)],Scene_Boot[_0x5443f5(0x353)][_0x5443f5(0x753)]=function(){const _0x3bf05b=_0x5443f5;this[_0x3bf05b(0x727)]()?this[_0x3bf05b(0x6fc)]():VisuMZ[_0x3bf05b(0x425)][_0x3bf05b(0x5b1)][_0x3bf05b(0x91b)](this);},Scene_Boot[_0x5443f5(0x353)][_0x5443f5(0x727)]=function(){const _0x4fe736=_0x5443f5;if(Scene_Title[_0x4fe736(0x82d)]==='')return![];if(Scene_Title[_0x4fe736(0x82d)]===_0x4fe736(0x3d8))return![];if(Scene_Title['version']==='')return![];if(Scene_Title[_0x4fe736(0x74a)]===_0x4fe736(0x79d))return![];return!![];},Scene_Boot[_0x5443f5(0x353)][_0x5443f5(0x6fc)]=function(){const _0x4abf7f=_0x5443f5,_0x5116bb=$dataSystem[_0x4abf7f(0x79c)],_0x733286=Scene_Title[_0x4abf7f(0x82d)]||'',_0x517bcf=Scene_Title[_0x4abf7f(0x74a)]||'',_0x1ec3e2=VisuMZ[_0x4abf7f(0x425)][_0x4abf7f(0x446)][_0x4abf7f(0x854)][_0x4abf7f(0x251)][_0x4abf7f(0x84c)],_0x1afd3b=_0x1ec3e2['format'](_0x5116bb,_0x733286,_0x517bcf);document[_0x4abf7f(0x3d9)]=_0x1afd3b;},Scene_Boot[_0x5443f5(0x353)]['determineSideButtonLayoutValid']=function(){const _0x101a56=_0x5443f5;if(VisuMZ['CoreEngine']['Settings']['UI'][_0x101a56(0x928)]){if('lfvvQ'==='lfvvQ'){const _0x4001a4=Graphics['width']-Graphics[_0x101a56(0x76c)]-VisuMZ[_0x101a56(0x425)][_0x101a56(0x446)]['UI'][_0x101a56(0x20a)]*0x2,_0x2679ed=Sprite_Button[_0x101a56(0x353)][_0x101a56(0x81c)][_0x101a56(0x91b)](this)*0x4;if(_0x4001a4>=_0x2679ed)SceneManager[_0x101a56(0x515)](!![]);}else this[_0x101a56(0x22e)]();}},Scene_Title[_0x5443f5(0x82d)]=VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x446)]['MenuLayout'][_0x5443f5(0x251)][_0x5443f5(0x3d8)],Scene_Title[_0x5443f5(0x74a)]=VisuMZ['CoreEngine'][_0x5443f5(0x446)][_0x5443f5(0x854)][_0x5443f5(0x251)][_0x5443f5(0x7d9)],Scene_Title[_0x5443f5(0x4da)]=VisuMZ[_0x5443f5(0x425)]['Settings'][_0x5443f5(0x198)],VisuMZ[_0x5443f5(0x425)][_0x5443f5(0xf0)]=Scene_Title[_0x5443f5(0x353)][_0x5443f5(0x3e6)],Scene_Title[_0x5443f5(0x353)]['drawGameTitle']=function(){const _0x4fd8d9=_0x5443f5;VisuMZ['CoreEngine'][_0x4fd8d9(0x446)][_0x4fd8d9(0x854)][_0x4fd8d9(0x251)][_0x4fd8d9(0x3e6)][_0x4fd8d9(0x91b)](this);if(Scene_Title['subtitle']!==''&&Scene_Title[_0x4fd8d9(0x82d)]!==_0x4fd8d9(0x3d8))this[_0x4fd8d9(0x1aa)]();if(Scene_Title[_0x4fd8d9(0x74a)]!==''&&Scene_Title['version']!=='0.00')this[_0x4fd8d9(0x2b3)]();},Scene_Title['prototype'][_0x5443f5(0x1aa)]=function(){const _0x50e391=_0x5443f5;VisuMZ['CoreEngine'][_0x50e391(0x446)][_0x50e391(0x854)][_0x50e391(0x251)][_0x50e391(0x1aa)][_0x50e391(0x91b)](this);},Scene_Title[_0x5443f5(0x353)][_0x5443f5(0x2b3)]=function(){const _0x4892dd=_0x5443f5;VisuMZ[_0x4892dd(0x425)][_0x4892dd(0x446)][_0x4892dd(0x854)]['Title'][_0x4892dd(0x2b3)][_0x4892dd(0x91b)](this);},Scene_Title[_0x5443f5(0x353)]['createCommandWindow']=function(){const _0x283a49=_0x5443f5;this[_0x283a49(0x51c)]();const _0x426038=$dataSystem[_0x283a49(0x2e1)]['background'],_0x1414e4=this[_0x283a49(0x953)]();this[_0x283a49(0x10a)]=new Window_TitleCommand(_0x1414e4),this[_0x283a49(0x10a)][_0x283a49(0x3c0)](_0x426038);const _0x5d625c=this[_0x283a49(0x953)]();this['_commandWindow'][_0x283a49(0x26e)](_0x5d625c['x'],_0x5d625c['y'],_0x5d625c[_0x283a49(0x786)],_0x5d625c[_0x283a49(0x99b)]),this[_0x283a49(0x10a)][_0x283a49(0x1b2)](),this[_0x283a49(0x10a)][_0x283a49(0x61c)](),this[_0x283a49(0x10a)]['selectLast'](),this[_0x283a49(0x6bc)](this[_0x283a49(0x10a)]);},Scene_Title[_0x5443f5(0x353)][_0x5443f5(0x28e)]=function(){const _0x49b614=_0x5443f5;if(this[_0x49b614(0x10a)]){if(_0x49b614(0x45c)!=='ugWdf'){const _0x2d02ef=_0x50896a(this['constructor'][_0x49b614(0x744)]),_0x5998f0=this[_0x49b614(0x73a)](_0x2d02ef);_0x5998f0&&(_0x5998f0[_0x49b614(0x2ac)]!==''||_0x5998f0[_0x49b614(0x53f)]!=='')&&(this['_backSprite1']=new _0xc28785(_0x381a73[_0x49b614(0x82e)](_0x5998f0['BgFilename1'])),this[_0x49b614(0x90a)]=new _0x4802c2(_0x6d55d9[_0x49b614(0x25e)](_0x5998f0[_0x49b614(0x53f)])),this[_0x49b614(0x83f)](this[_0x49b614(0x833)]),this[_0x49b614(0x83f)](this['_backSprite2']),this[_0x49b614(0x833)][_0x49b614(0x55f)][_0x49b614(0x883)](this[_0x49b614(0x298)]['bind'](this,this['_backSprite1'])),this['_backSprite2'][_0x49b614(0x55f)]['addLoadListener'](this[_0x49b614(0x298)][_0x49b614(0x2ed)](this,this[_0x49b614(0x90a)])));}else return this[_0x49b614(0x10a)]['maxItems']();}else return VisuMZ[_0x49b614(0x425)][_0x49b614(0x446)][_0x49b614(0x5b4)][_0x49b614(0x44d)];},Scene_Title[_0x5443f5(0x353)][_0x5443f5(0x953)]=function(){const _0x540dfd=_0x5443f5;return VisuMZ['CoreEngine'][_0x540dfd(0x446)][_0x540dfd(0x854)][_0x540dfd(0x251)][_0x540dfd(0x235)][_0x540dfd(0x91b)](this);},Scene_Title['prototype']['createTitleButtons']=function(){const _0x37a88f=_0x5443f5;for(const _0x504e41 of Scene_Title[_0x37a88f(0x4da)]){const _0x1811c9=new Sprite_TitlePictureButton(_0x504e41);this[_0x37a88f(0x83f)](_0x1811c9);}},VisuMZ[_0x5443f5(0x425)]['Scene_Map_initialize']=Scene_Map[_0x5443f5(0x353)][_0x5443f5(0x131)],Scene_Map['prototype'][_0x5443f5(0x131)]=function(){const _0x54f3cc=_0x5443f5;VisuMZ['CoreEngine'][_0x54f3cc(0x488)][_0x54f3cc(0x91b)](this),$gameTemp[_0x54f3cc(0x32b)](),this[_0x54f3cc(0x9f5)]();},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x74b)]=Scene_Map[_0x5443f5(0x353)]['updateMainMultiply'],Scene_Map[_0x5443f5(0x353)]['updateMainMultiply']=function(){const _0x125950=_0x5443f5;VisuMZ[_0x125950(0x425)]['Scene_Map_updateMainMultiply']['call'](this);if($gameTemp[_0x125950(0x53e)]&&!$gameMessage[_0x125950(0x57d)]()){if(_0x125950(0x283)!==_0x125950(0x357))this['updateMain'](),SceneManager[_0x125950(0x9b4)]();else{if(!_0x3510b6[_0x125950(0x1fe)]())return;_0x1a2519['ConvertParams'](_0x2f385a,_0x1ea5a8);const _0x1e7015=_0x36909d['CommonEventID'];_0x4086e3[_0x125950(0x970)][_0x125950(0x8cd)](_0x1e7015);}}},Scene_Map[_0x5443f5(0x353)][_0x5443f5(0xea)]=function(){const _0x5509c2=_0x5443f5;Scene_Message[_0x5509c2(0x353)]['terminate'][_0x5509c2(0x91b)](this),!SceneManager[_0x5509c2(0x461)](Scene_Battle)&&(this[_0x5509c2(0x881)][_0x5509c2(0x5f3)](),this[_0x5509c2(0x628)]['hide'](),this[_0x5509c2(0x985)][_0x5509c2(0x5ba)]=![],SceneManager[_0x5509c2(0x7d1)]()),$gameScreen[_0x5509c2(0x212)](),this[_0x5509c2(0x9f5)]();},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x543)]=Scene_Map[_0x5443f5(0x353)][_0x5443f5(0x19e)],Scene_Map[_0x5443f5(0x353)]['createMenuButton']=function(){const _0x170f30=_0x5443f5;VisuMZ[_0x170f30(0x425)][_0x170f30(0x543)][_0x170f30(0x91b)](this);if(SceneManager[_0x170f30(0x4ce)]()){if(_0x170f30(0x609)!==_0x170f30(0x3ff))this['moveMenuButtonSideButtonLayout']();else{if(this[_0x170f30(0x34c)]===_0x170f30(0x351))return;if(_0x3415cc['isNumpadPressed']())return;_0x56fca7[_0x170f30(0x425)][_0x170f30(0x9b1)][_0x170f30(0x91b)](this),this[_0x170f30(0x37a)](_0x170f30(0x56f));}}},Scene_Map[_0x5443f5(0x353)][_0x5443f5(0x9bd)]=function(){const _0xa89c77=_0x5443f5;this[_0xa89c77(0x859)]['x']=Graphics[_0xa89c77(0x76c)]+0x4;},VisuMZ[_0x5443f5(0x425)]['Scene_Map_updateScene']=Scene_Map[_0x5443f5(0x353)][_0x5443f5(0x70c)],Scene_Map[_0x5443f5(0x353)][_0x5443f5(0x70c)]=function(){const _0x1fe28c=_0x5443f5;VisuMZ[_0x1fe28c(0x425)]['Scene_Map_updateScene']['call'](this),this[_0x1fe28c(0x97f)]();},Scene_Map[_0x5443f5(0x353)][_0x5443f5(0x97f)]=function(){const _0x19f132=_0x5443f5;if(Input[_0x19f132(0x732)](_0x19f132(0x98c))){if(_0x19f132(0x5bc)===_0x19f132(0x9d9)){const _0x2a7c96=_0x10dda2+(this[_0x19f132(0x1eb)]()-_0x266cc3['iconHeight'])/0x2;this[_0x19f132(0x605)](_0x4babab,_0x32038d+(_0x440981-_0x7f14be[_0x19f132(0x2bf)]),_0x2a7c96),_0x58f9c9-=_0x41de7d['iconWidth']+0x4;}else ConfigManager[_0x19f132(0x359)]=!ConfigManager[_0x19f132(0x359)],ConfigManager[_0x19f132(0x428)]();}},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x2c5)]=Scene_Map[_0x5443f5(0x353)]['updateMain'],Scene_Map[_0x5443f5(0x353)]['updateMain']=function(){const _0x205a59=_0x5443f5;VisuMZ[_0x205a59(0x425)][_0x205a59(0x2c5)][_0x205a59(0x91b)](this),this[_0x205a59(0x507)]();},Scene_Map['prototype'][_0x5443f5(0x9f5)]=function(){const _0x245c2c=_0x5443f5;this[_0x245c2c(0x37c)]=[];},Scene_Map['prototype'][_0x5443f5(0x507)]=function(){const _0x274fee=_0x5443f5;if(!this[_0x274fee(0x37c)])return;for(const _0x5b3288 of this[_0x274fee(0x37c)]){_0x5b3288&&_0x5b3288['update']();}},Scene_Map[_0x5443f5(0x353)][_0x5443f5(0x8cd)]=function(_0x2e1e2a){const _0xf35af8=_0x5443f5,_0x38537b=$dataCommonEvents[_0x2e1e2a];if(!_0x38537b)return;const _0x11b63a=new Game_OnceParallelInterpreter();this[_0xf35af8(0x416)](_0x11b63a),_0x11b63a[_0xf35af8(0x2be)](_0x2e1e2a);},Scene_Map['prototype']['addOnceParallelInterpreter']=function(_0x41cac7){const _0x3c1817=_0x5443f5;this[_0x3c1817(0x37c)]=this[_0x3c1817(0x37c)]||[],this[_0x3c1817(0x37c)][_0x3c1817(0x747)](_0x41cac7);},Scene_Map[_0x5443f5(0x353)]['removeOnceParallelInterpreter']=function(_0x48efef){const _0x35f6cb=_0x5443f5;this[_0x35f6cb(0x37c)]=this[_0x35f6cb(0x37c)]||[],this[_0x35f6cb(0x37c)][_0x35f6cb(0x2d0)](_0x48efef);};function _0x5572(_0x38db94,_0x35fc4a){const _0x2f4150=_0x2f41();return _0x5572=function(_0x557258,_0xc1f2c3){_0x557258=_0x557258-0xd3;let _0x3e8aa5=_0x2f4150[_0x557258];return _0x3e8aa5;},_0x5572(_0x38db94,_0x35fc4a);}function Game_OnceParallelInterpreter(){const _0xaa1b65=_0x5443f5;this[_0xaa1b65(0x131)](...arguments);}Game_OnceParallelInterpreter[_0x5443f5(0x353)]=Object['create'](Game_Interpreter[_0x5443f5(0x353)]),Game_OnceParallelInterpreter[_0x5443f5(0x353)]['constructor']=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter['prototype'][_0x5443f5(0x2be)]=function(_0x449c8e){const _0x1acb52=_0x5443f5,_0x2b2460=$dataCommonEvents[_0x449c8e];_0x2b2460?this[_0x1acb52(0x71a)](_0x2b2460[_0x1acb52(0x797)],0x0):this['terminate']();},Game_OnceParallelInterpreter[_0x5443f5(0x353)]['terminate']=function(){const _0x1033f8=_0x5443f5;if(!SceneManager[_0x1033f8(0x1fe)]())return;SceneManager[_0x1033f8(0x970)][_0x1033f8(0x6f8)](this),Game_Interpreter['prototype'][_0x1033f8(0xea)]['call'](this);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x60e)]=Scene_MenuBase[_0x5443f5(0x353)]['helpAreaTop'],Scene_MenuBase[_0x5443f5(0x353)][_0x5443f5(0x964)]=function(){const _0x20b717=_0x5443f5;let _0xb733a8=0x0;return SceneManager[_0x20b717(0x929)]()?_0xb733a8=this[_0x20b717(0x7fb)]():'vdBry'===_0x20b717(0x167)?_0x1ee660[_0x20b717(0x443)]&&(this[_0x20b717(0x1e7)]=_0x20b717(0x1ea)):_0xb733a8=VisuMZ[_0x20b717(0x425)][_0x20b717(0x60e)][_0x20b717(0x91b)](this),_0xb733a8;},Scene_MenuBase[_0x5443f5(0x353)][_0x5443f5(0x7fb)]=function(){const _0x47ae6f=_0x5443f5;if(this[_0x47ae6f(0x1da)]()){if(_0x47ae6f(0x2d9)===_0x47ae6f(0x39a))_0xc89c2f=_0x54966[_0x47ae6f(0x83a)](_0x37ab86[_0x47ae6f(0x3bc)]),_0x37df85[_0x47ae6f(0x370)](_0x3e16c9),this['_storedMapText'][_0x209635]=_0x417d0a['CoreEngine']['ExtractStrFromMap'](_0x49f4c2),_0x58bbf2=this[_0x47ae6f(0x4e2)];else return this['mainAreaBottom']();}else{if(_0x47ae6f(0x2af)===_0x47ae6f(0x318)){if(this[_0x47ae6f(0x5b7)]===_0x207770)this[_0x47ae6f(0x720)]();const _0x68f569=this[_0x47ae6f(0x5b7)];if(_0x68f569[_0x47ae6f(0x1dd)]<=0x0)return;_0x68f569['current']=this['applyEasingAnglePlus'](_0x68f569['current'],_0x68f569[_0x47ae6f(0x734)]),_0x68f569[_0x47ae6f(0x1dd)]--,_0x68f569[_0x47ae6f(0x1dd)]<=0x0&&(_0x68f569[_0x47ae6f(0x676)]=_0x68f569['target']);}else return 0x0;}},VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaTop']=Scene_MenuBase[_0x5443f5(0x353)][_0x5443f5(0x921)],Scene_MenuBase[_0x5443f5(0x353)][_0x5443f5(0x921)]=function(){const _0xee1106=_0x5443f5;if(SceneManager[_0xee1106(0x929)]()){if('lByVZ'==='lByVZ')return this['mainAreaTopSideButtonLayout']();else{const _0x3847c8=_0x3cbab1['CoreEngine'][_0xee1106(0x446)][_0xee1106(0x56b)];if(_0x3847c8&&_0x3847c8[_0xee1106(0x518)])return _0x3847c8[_0xee1106(0x518)]['call'](this);const _0x510c5c=_0x5c7954['_shakePower']*0.75,_0x48ab02=_0x4eab57['_shakeSpeed']*0.6,_0x34225e=_0x4def17[_0xee1106(0x85a)];this['x']+=_0x307807[_0xee1106(0x558)](_0x1b1e9b['randomInt'](_0x510c5c)-_0xf046b2['randomInt'](_0x48ab02))*(_0x2bd3a1[_0xee1106(0x2cf)](_0x34225e,0x1e)*0.5),this['y']+=_0x2f494a[_0xee1106(0x558)](_0x26d8ca['randomInt'](_0x510c5c)-_0x3c3791['randomInt'](_0x48ab02))*(_0x4853af[_0xee1106(0x2cf)](_0x34225e,0x1e)*0.5);}}else return VisuMZ[_0xee1106(0x425)]['Scene_MenuBase_mainAreaTop'][_0xee1106(0x91b)](this);},Scene_MenuBase[_0x5443f5(0x353)][_0x5443f5(0x3ca)]=function(){const _0x371d81=_0x5443f5;if(!this['isBottomHelpMode']()){if(_0x371d81(0x9eb)==='LtpNG')return this[_0x371d81(0x46d)]();else{const _0x47a58f=_0x5cda25[_0x371d81(0x425)]['Settings']['ScreenShake'];if(_0x47a58f&&_0x47a58f[_0x371d81(0x85c)])return _0x47a58f[_0x371d81(0x85c)]['call'](this);const _0x36c950=_0x417020[_0x371d81(0x951)]*0.75,_0x279866=_0x59753f[_0x371d81(0x128)]*0.6,_0x41dfec=_0x40ea09['_shakeDuration'];this['y']+=_0x2d339b[_0x371d81(0x558)](_0x52f3e8[_0x371d81(0x751)](_0x36c950)-_0x456490[_0x371d81(0x751)](_0x279866))*(_0x3928c3['min'](_0x41dfec,0x1e)*0.5);}}else return this[_0x371d81(0x88d)]()&&this[_0x371d81(0x718)]()==='top'?Window_ButtonAssist[_0x371d81(0x353)]['lineHeight']():0x0;},VisuMZ['CoreEngine'][_0x5443f5(0x6ae)]=Scene_MenuBase[_0x5443f5(0x353)]['mainAreaHeight'],Scene_MenuBase[_0x5443f5(0x353)][_0x5443f5(0x2c6)]=function(){const _0x3a9644=_0x5443f5;let _0x43a8d6=0x0;if(SceneManager[_0x3a9644(0x929)]()){if(_0x3a9644(0x1ce)===_0x3a9644(0x705)){if(this[_0x3a9644(0x48e)]===_0x4352b0)this[_0x3a9644(0x5cc)]();return this[_0x3a9644(0x48e)];}else _0x43a8d6=this[_0x3a9644(0x2d4)]();}else _0x43a8d6=VisuMZ['CoreEngine'][_0x3a9644(0x6ae)][_0x3a9644(0x91b)](this);return this[_0x3a9644(0x88d)]()&&this[_0x3a9644(0x718)]()!==_0x3a9644(0x76b)&&(_0x3a9644(0x2d8)!==_0x3a9644(0x90f)?_0x43a8d6-=Window_ButtonAssist['prototype'][_0x3a9644(0x1eb)]():this[_0x3a9644(0x3ac)][_0x3a9644(0x3c0)](_0x294c6c[_0x3a9644(0x6aa)]['GoldBgType'])),_0x43a8d6;},Scene_MenuBase[_0x5443f5(0x353)]['mainAreaHeightSideButtonLayout']=function(){const _0x469e26=_0x5443f5;return Graphics[_0x469e26(0x66f)]-this[_0x469e26(0x249)]();},VisuMZ[_0x5443f5(0x425)]['Scene_MenuBase_createBackground']=Scene_MenuBase['prototype'][_0x5443f5(0x4b9)],Scene_MenuBase[_0x5443f5(0x353)][_0x5443f5(0x4b9)]=function(){const _0x95b955=_0x5443f5,_0x46a9d0=VisuMZ['CoreEngine'][_0x95b955(0x446)][_0x95b955(0x66c)][_0x95b955(0x99c)]??0x8;this['_backgroundFilter']=new PIXI[(_0x95b955(0x570))][(_0x95b955(0x19b))](_0x46a9d0),this[_0x95b955(0x608)]=new Sprite(),this[_0x95b955(0x608)][_0x95b955(0x55f)]=SceneManager['backgroundBitmap'](),this[_0x95b955(0x608)][_0x95b955(0x570)]=[this[_0x95b955(0x6a5)]],this['addChild'](this[_0x95b955(0x608)]),this[_0x95b955(0x577)](0xc0),this[_0x95b955(0x577)](this[_0x95b955(0x24b)]()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x5443f5(0x353)]['getBackgroundOpacity']=function(){const _0x5ea2fa=_0x5443f5,_0x4f6a6f=String(this[_0x5ea2fa(0x512)]['name']),_0x3c002a=this[_0x5ea2fa(0x73a)](_0x4f6a6f);if(_0x3c002a){if('nPSWp'==='sjLxg')_0x557333[_0x5ea2fa(0x8f9)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20','Page','OK'];else return _0x3c002a['SnapshotOpacity'];}else return 0xc0;},Scene_MenuBase['prototype'][_0x5443f5(0xdd)]=function(){const _0x4fe37d=_0x5443f5,_0x541f44=String(this[_0x4fe37d(0x512)]['name']),_0x2b7b0b=this[_0x4fe37d(0x73a)](_0x541f44);if(_0x2b7b0b&&(_0x2b7b0b[_0x4fe37d(0x2ac)]!==''||_0x2b7b0b['BgFilename2']!=='')){if(_0x4fe37d(0x631)!==_0x4fe37d(0x631)){if(_0x5dd224['VisuMZ_1_BattleCore'])_0x1892c4['playOnceParallelInterpreter'](_0x524b17);else _0x28fb78&&_0x12a06a['isPlaytest']()&&_0x4992b7(_0x4fe37d(0x8bc));}else this[_0x4fe37d(0x833)]=new Sprite(ImageManager['loadTitle1'](_0x2b7b0b[_0x4fe37d(0x2ac)])),this[_0x4fe37d(0x90a)]=new Sprite(ImageManager[_0x4fe37d(0x25e)](_0x2b7b0b[_0x4fe37d(0x53f)])),this['addChild'](this[_0x4fe37d(0x833)]),this[_0x4fe37d(0x83f)](this[_0x4fe37d(0x90a)]),this[_0x4fe37d(0x833)]['bitmap'][_0x4fe37d(0x883)](this['adjustSprite']['bind'](this,this[_0x4fe37d(0x833)])),this['_backSprite2'][_0x4fe37d(0x55f)][_0x4fe37d(0x883)](this[_0x4fe37d(0x298)]['bind'](this,this[_0x4fe37d(0x90a)]));}},Scene_MenuBase[_0x5443f5(0x353)]['getCustomBackgroundSettings']=function(_0x57e447){const _0x4e9de0=_0x5443f5;return VisuMZ[_0x4e9de0(0x425)][_0x4e9de0(0x446)][_0x4e9de0(0x66c)][_0x57e447]||VisuMZ[_0x4e9de0(0x425)][_0x4e9de0(0x446)]['MenuBg'][_0x4e9de0(0x73e)];},Scene_MenuBase['prototype'][_0x5443f5(0x298)]=function(_0x2165cd){const _0x1eb1f3=_0x5443f5;this[_0x1eb1f3(0x262)](_0x2165cd),this[_0x1eb1f3(0x5f5)](_0x2165cd);},VisuMZ['CoreEngine'][_0x5443f5(0x980)]=Scene_MenuBase['prototype'][_0x5443f5(0x18f)],Scene_MenuBase[_0x5443f5(0x353)]['createCancelButton']=function(){const _0x44e1fc=_0x5443f5;VisuMZ[_0x44e1fc(0x425)][_0x44e1fc(0x980)][_0x44e1fc(0x91b)](this),SceneManager['isSideButtonLayout']()&&this['moveCancelButtonSideButtonLayout']();},Scene_MenuBase[_0x5443f5(0x353)]['moveCancelButtonSideButtonLayout']=function(){const _0x4c7014=_0x5443f5;this['_cancelButton']['x']=Graphics[_0x4c7014(0x76c)]+0x4;},VisuMZ['CoreEngine'][_0x5443f5(0x650)]=Scene_MenuBase[_0x5443f5(0x353)]['createPageButtons'],Scene_MenuBase['prototype'][_0x5443f5(0xd8)]=function(){const _0x91964c=_0x5443f5;VisuMZ['CoreEngine'][_0x91964c(0x650)][_0x91964c(0x91b)](this);if(SceneManager[_0x91964c(0x4ce)]()){if(_0x91964c(0x995)===_0x91964c(0x4a9)){var _0xadb052=_0x1674bf(_0x12830f['$1'])/0x64;_0x4dab25+=_0xadb052;}else this[_0x91964c(0x869)]();}},Scene_MenuBase[_0x5443f5(0x353)][_0x5443f5(0x869)]=function(){const _0x4a7708=_0x5443f5;this[_0x4a7708(0x25d)]['x']=-0x1*(this[_0x4a7708(0x25d)][_0x4a7708(0x786)]+this[_0x4a7708(0x39f)][_0x4a7708(0x786)]+0x8),this[_0x4a7708(0x39f)]['x']=-0x1*(this[_0x4a7708(0x39f)]['width']+0x4);},Scene_MenuBase[_0x5443f5(0x353)][_0x5443f5(0x88d)]=function(){const _0x487c7b=_0x5443f5;return VisuMZ[_0x487c7b(0x425)]['Settings'][_0x487c7b(0x147)]['Enable'];},Scene_MenuBase['prototype'][_0x5443f5(0x718)]=function(){const _0x48fe6f=_0x5443f5;return SceneManager['isSideButtonLayout']()||SceneManager[_0x48fe6f(0x7c3)]()?VisuMZ[_0x48fe6f(0x425)]['Settings']['ButtonAssist'][_0x48fe6f(0x9dc)]:_0x48fe6f(0x76b);},Scene_MenuBase[_0x5443f5(0x353)][_0x5443f5(0x77c)]=function(){const _0x500b66=_0x5443f5;if(!this['isMenuButtonAssistEnabled']())return;const _0x47b771=this[_0x500b66(0x4db)]();this[_0x500b66(0x355)]=new Window_ButtonAssist(_0x47b771),this['addWindow'](this['_buttonAssistWindow']);},Scene_MenuBase[_0x5443f5(0x353)]['buttonAssistWindowRect']=function(){const _0x4ea290=_0x5443f5;if(this[_0x4ea290(0x718)]()===_0x4ea290(0x76b)){if(_0x4ea290(0x32a)!==_0x4ea290(0x32a))_0x14742b+=_0x36f4b6(_0x643145);else return this[_0x4ea290(0x741)]();}else return this['buttonAssistWindowSideRect']();},Scene_MenuBase[_0x5443f5(0x353)][_0x5443f5(0x741)]=function(){const _0x17b121=_0x5443f5,_0x5a9221=ConfigManager['touchUI']?(Sprite_Button[_0x17b121(0x353)][_0x17b121(0x81c)]()+0x6)*0x2:0x0,_0x4e0c76=this['buttonY'](),_0x2b7e1a=Graphics[_0x17b121(0x76c)]-_0x5a9221*0x2,_0x542111=this[_0x17b121(0x9e4)]();return new Rectangle(_0x5a9221,_0x4e0c76,_0x2b7e1a,_0x542111);},Scene_MenuBase['prototype'][_0x5443f5(0x148)]=function(){const _0x56379d=_0x5443f5,_0x4b7fcd=Graphics[_0x56379d(0x76c)],_0x3d0633=Window_ButtonAssist['prototype'][_0x56379d(0x1eb)](),_0x41107a=0x0;let _0x449b8d=0x0;if(this[_0x56379d(0x718)]()===_0x56379d(0x7cb))_0x449b8d=0x0;else{if(_0x56379d(0x403)!==_0x56379d(0x403)){if(!this[_0x56379d(0x88d)]())return;const _0x5f234b=this[_0x56379d(0x4db)]();this[_0x56379d(0x355)]=new _0x298c10(_0x5f234b),this[_0x56379d(0x6bc)](this['_buttonAssistWindow']);}else _0x449b8d=Graphics[_0x56379d(0x66f)]-_0x3d0633;}return new Rectangle(_0x41107a,_0x449b8d,_0x4b7fcd,_0x3d0633);},Scene_Menu[_0x5443f5(0x6aa)]=VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x446)][_0x5443f5(0x854)][_0x5443f5(0x1b3)],VisuMZ[_0x5443f5(0x425)]['Scene_Menu_create']=Scene_Menu[_0x5443f5(0x353)][_0x5443f5(0x736)],Scene_Menu[_0x5443f5(0x353)]['create']=function(){const _0xfd04bd=_0x5443f5;VisuMZ[_0xfd04bd(0x425)][_0xfd04bd(0x911)][_0xfd04bd(0x91b)](this),this[_0xfd04bd(0x414)]();},Scene_Menu[_0x5443f5(0x353)][_0x5443f5(0x414)]=function(){const _0x3f7153=_0x5443f5;this[_0x3f7153(0x10a)]&&this['_commandWindow'][_0x3f7153(0x3c0)](Scene_Menu[_0x3f7153(0x6aa)]['CommandBgType']),this['_goldWindow']&&this[_0x3f7153(0x3ac)][_0x3f7153(0x3c0)](Scene_Menu['layoutSettings'][_0x3f7153(0x57c)]),this[_0x3f7153(0x16c)]&&this['_statusWindow'][_0x3f7153(0x3c0)](Scene_Menu[_0x3f7153(0x6aa)][_0x3f7153(0x2b9)]);},Scene_Menu['prototype'][_0x5443f5(0x953)]=function(){const _0x18355f=_0x5443f5;return Scene_Menu[_0x18355f(0x6aa)][_0x18355f(0x235)][_0x18355f(0x91b)](this);},Scene_Menu['prototype'][_0x5443f5(0x1d4)]=function(){const _0x605a62=_0x5443f5;return Scene_Menu[_0x605a62(0x6aa)][_0x605a62(0x9a3)][_0x605a62(0x91b)](this);},Scene_Menu['prototype'][_0x5443f5(0x648)]=function(){const _0x538e12=_0x5443f5;return Scene_Menu[_0x538e12(0x6aa)][_0x538e12(0x5b3)]['call'](this);},Scene_Item['layoutSettings']=VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x446)][_0x5443f5(0x854)][_0x5443f5(0x1a4)],VisuMZ[_0x5443f5(0x425)]['Scene_Item_create']=Scene_Item['prototype'][_0x5443f5(0x736)],Scene_Item['prototype'][_0x5443f5(0x736)]=function(){const _0x353e95=_0x5443f5;VisuMZ[_0x353e95(0x425)]['Scene_Item_create'][_0x353e95(0x91b)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item[_0x5443f5(0x353)][_0x5443f5(0x414)]=function(){const _0x42f6c7=_0x5443f5;if(this[_0x42f6c7(0x93c)]){if('ZXQYa'===_0x42f6c7(0x2ce))return _0x36e6cb[_0x42f6c7(0x425)][_0x42f6c7(0x446)][_0x42f6c7(0x5e6)][_0x42f6c7(0x3db)]?_0x532f04['CoreEngine']['SceneManager_isGameActive'][_0x42f6c7(0x91b)](this):!![];else this[_0x42f6c7(0x93c)]['setBackgroundType'](Scene_Item[_0x42f6c7(0x6aa)]['HelpBgType']);}this[_0x42f6c7(0x6dc)]&&this[_0x42f6c7(0x6dc)][_0x42f6c7(0x3c0)](Scene_Item[_0x42f6c7(0x6aa)][_0x42f6c7(0x70d)]),this[_0x42f6c7(0x448)]&&this['_itemWindow'][_0x42f6c7(0x3c0)](Scene_Item[_0x42f6c7(0x6aa)][_0x42f6c7(0x49e)]),this[_0x42f6c7(0x2cc)]&&this[_0x42f6c7(0x2cc)][_0x42f6c7(0x3c0)](Scene_Item[_0x42f6c7(0x6aa)][_0x42f6c7(0x550)]);},Scene_Item[_0x5443f5(0x353)][_0x5443f5(0x367)]=function(){const _0x1c02e7=_0x5443f5;return Scene_Item[_0x1c02e7(0x6aa)][_0x1c02e7(0x405)][_0x1c02e7(0x91b)](this);},Scene_Item[_0x5443f5(0x353)]['categoryWindowRect']=function(){const _0x524fcb=_0x5443f5;return Scene_Item[_0x524fcb(0x6aa)][_0x524fcb(0x27d)][_0x524fcb(0x91b)](this);},Scene_Item['prototype'][_0x5443f5(0x45d)]=function(){const _0x4b0310=_0x5443f5;return Scene_Item[_0x4b0310(0x6aa)][_0x4b0310(0x66b)][_0x4b0310(0x91b)](this);},Scene_Item[_0x5443f5(0x353)][_0x5443f5(0x22a)]=function(){const _0x2a537f=_0x5443f5;return Scene_Item[_0x2a537f(0x6aa)][_0x2a537f(0x7cd)][_0x2a537f(0x91b)](this);},Scene_Skill['layoutSettings']=VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x446)][_0x5443f5(0x854)][_0x5443f5(0x1c2)],VisuMZ['CoreEngine'][_0x5443f5(0x92a)]=Scene_Skill[_0x5443f5(0x353)][_0x5443f5(0x736)],Scene_Skill['prototype'][_0x5443f5(0x736)]=function(){const _0x390da5=_0x5443f5;VisuMZ[_0x390da5(0x425)]['Scene_Skill_create']['call'](this),this[_0x390da5(0x414)]();},Scene_Skill[_0x5443f5(0x353)]['setCoreEngineUpdateWindowBg']=function(){const _0x20a25e=_0x5443f5;this[_0x20a25e(0x93c)]&&(_0x20a25e(0x33b)===_0x20a25e(0x2f7)?this['_digitGrouping']=_0x522d87:this['_helpWindow'][_0x20a25e(0x3c0)](Scene_Skill[_0x20a25e(0x6aa)][_0x20a25e(0x5e9)]));this[_0x20a25e(0x313)]&&(_0x20a25e(0x26d)!==_0x20a25e(0x458)?this[_0x20a25e(0x313)][_0x20a25e(0x3c0)](Scene_Skill[_0x20a25e(0x6aa)][_0x20a25e(0x42a)]):this['_forcedBattleSys']=0x2);if(this[_0x20a25e(0x16c)]){if(_0x20a25e(0x664)!=='ryLvQ')this[_0x20a25e(0x16c)][_0x20a25e(0x3c0)](Scene_Skill['layoutSettings'][_0x20a25e(0x2b9)]);else return'#%1'[_0x20a25e(0x2d3)](_0x41be6a(_0x45ac8b['$1']));}if(this[_0x20a25e(0x448)]){if(_0x20a25e(0x3af)===_0x20a25e(0x3af))this[_0x20a25e(0x448)]['setBackgroundType'](Scene_Skill[_0x20a25e(0x6aa)][_0x20a25e(0x49e)]);else{const _0x2b11c4=this[_0x20a25e(0x77b)](),_0x48b36b=this[_0x20a25e(0x766)][_0x20a25e(0x4fe)](_0x202140),_0x564972=_0x48b36b-this[_0x20a25e(0x8ed)][_0x20a25e(0x4fe)](_0x2749fe);this[_0x20a25e(0x3de)](_0x263bec[_0x20a25e(0x520)](_0x564972)),this['drawText'](this[_0x20a25e(0x766)]['paramValueByName'](_0x4c1831,!![]),_0x33e52c,_0x21dccf,_0x2b11c4,_0x20a25e(0x66d));}}this[_0x20a25e(0x2cc)]&&this[_0x20a25e(0x2cc)][_0x20a25e(0x3c0)](Scene_Skill[_0x20a25e(0x6aa)]['ActorBgType']);},Scene_Skill[_0x5443f5(0x353)]['helpWindowRect']=function(){const _0x1bb94f=_0x5443f5;return Scene_Skill['layoutSettings'][_0x1bb94f(0x405)][_0x1bb94f(0x91b)](this);},Scene_Skill[_0x5443f5(0x353)][_0x5443f5(0x92b)]=function(){const _0xd6c7f6=_0x5443f5;return Scene_Skill[_0xd6c7f6(0x6aa)][_0xd6c7f6(0x170)][_0xd6c7f6(0x91b)](this);},Scene_Skill[_0x5443f5(0x353)][_0x5443f5(0x648)]=function(){return Scene_Skill['layoutSettings']['StatusRect']['call'](this);},Scene_Skill[_0x5443f5(0x353)][_0x5443f5(0x45d)]=function(){const _0x5164a0=_0x5443f5;return Scene_Skill[_0x5164a0(0x6aa)][_0x5164a0(0x66b)][_0x5164a0(0x91b)](this);},Scene_Skill[_0x5443f5(0x353)][_0x5443f5(0x22a)]=function(){const _0x343e0e=_0x5443f5;return Scene_Skill[_0x343e0e(0x6aa)][_0x343e0e(0x7cd)]['call'](this);},Scene_Equip['layoutSettings']=VisuMZ[_0x5443f5(0x425)]['Settings'][_0x5443f5(0x854)][_0x5443f5(0x19a)],VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x7d7)]=Scene_Equip[_0x5443f5(0x353)][_0x5443f5(0x736)],Scene_Equip[_0x5443f5(0x353)][_0x5443f5(0x736)]=function(){const _0x34b95d=_0x5443f5;VisuMZ[_0x34b95d(0x425)]['Scene_Equip_create'][_0x34b95d(0x91b)](this),this[_0x34b95d(0x414)]();},Scene_Equip[_0x5443f5(0x353)][_0x5443f5(0x414)]=function(){const _0x4693e0=_0x5443f5;if(this[_0x4693e0(0x93c)]){if(_0x4693e0(0x7db)!=='nYzhw')return _0x329adc[_0x4693e0(0x6aa)][_0x4693e0(0x7d0)][_0x4693e0(0x91b)](this);else this['_helpWindow'][_0x4693e0(0x3c0)](Scene_Equip[_0x4693e0(0x6aa)]['HelpBgType']);}this[_0x4693e0(0x16c)]&&this[_0x4693e0(0x16c)][_0x4693e0(0x3c0)](Scene_Equip['layoutSettings']['StatusBgType']),this[_0x4693e0(0x10a)]&&('RNXfH'!==_0x4693e0(0x303)?this[_0x4693e0(0x10a)][_0x4693e0(0x3c0)](Scene_Equip[_0x4693e0(0x6aa)][_0x4693e0(0x2b2)]):this[_0x4693e0(0x2c4)]['setBackgroundType'](_0x12e589['layoutSettings'][_0x4693e0(0x8cc)])),this[_0x4693e0(0x960)]&&this['_slotWindow'][_0x4693e0(0x3c0)](Scene_Equip[_0x4693e0(0x6aa)][_0x4693e0(0x75a)]),this[_0x4693e0(0x448)]&&this[_0x4693e0(0x448)]['setBackgroundType'](Scene_Equip[_0x4693e0(0x6aa)]['ItemBgType']);},Scene_Equip['prototype'][_0x5443f5(0x367)]=function(){const _0x18b59c=_0x5443f5;return Scene_Equip[_0x18b59c(0x6aa)][_0x18b59c(0x405)][_0x18b59c(0x91b)](this);},Scene_Equip[_0x5443f5(0x353)][_0x5443f5(0x648)]=function(){const _0x408768=_0x5443f5;return Scene_Equip[_0x408768(0x6aa)]['StatusRect'][_0x408768(0x91b)](this);},Scene_Equip[_0x5443f5(0x353)]['commandWindowRect']=function(){const _0x106968=_0x5443f5;return Scene_Equip['layoutSettings'][_0x106968(0x235)][_0x106968(0x91b)](this);},Scene_Equip['prototype']['slotWindowRect']=function(){const _0x39ffdb=_0x5443f5;return Scene_Equip[_0x39ffdb(0x6aa)][_0x39ffdb(0x24f)]['call'](this);},Scene_Equip[_0x5443f5(0x353)][_0x5443f5(0x45d)]=function(){const _0x254157=_0x5443f5;return Scene_Equip[_0x254157(0x6aa)][_0x254157(0x66b)][_0x254157(0x91b)](this);},Scene_Status[_0x5443f5(0x6aa)]=VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x446)][_0x5443f5(0x854)][_0x5443f5(0x6c4)],VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x842)]=Scene_Status['prototype'][_0x5443f5(0x736)],Scene_Status[_0x5443f5(0x353)][_0x5443f5(0x736)]=function(){const _0x3ff782=_0x5443f5;VisuMZ[_0x3ff782(0x425)][_0x3ff782(0x842)][_0x3ff782(0x91b)](this),this[_0x3ff782(0x414)]();},Scene_Status[_0x5443f5(0x353)][_0x5443f5(0x414)]=function(){const _0x23a826=_0x5443f5;this['_profileWindow']&&this[_0x23a826(0x553)][_0x23a826(0x3c0)](Scene_Status[_0x23a826(0x6aa)]['ProfileBgType']),this[_0x23a826(0x16c)]&&this[_0x23a826(0x16c)][_0x23a826(0x3c0)](Scene_Status[_0x23a826(0x6aa)]['StatusBgType']),this[_0x23a826(0x724)]&&this[_0x23a826(0x724)][_0x23a826(0x3c0)](Scene_Status['layoutSettings'][_0x23a826(0x40d)]),this['_statusEquipWindow']&&this['_statusEquipWindow'][_0x23a826(0x3c0)](Scene_Status['layoutSettings'][_0x23a826(0x1f7)]);},Scene_Status[_0x5443f5(0x353)][_0x5443f5(0x117)]=function(){const _0x36fe92=_0x5443f5;return Scene_Status[_0x36fe92(0x6aa)][_0x36fe92(0x7d0)]['call'](this);},Scene_Status[_0x5443f5(0x353)][_0x5443f5(0x648)]=function(){const _0x37fce0=_0x5443f5;return Scene_Status[_0x37fce0(0x6aa)][_0x37fce0(0x5b3)][_0x37fce0(0x91b)](this);},Scene_Status[_0x5443f5(0x353)][_0x5443f5(0x21b)]=function(){const _0x511e3a=_0x5443f5;return Scene_Status[_0x511e3a(0x6aa)][_0x511e3a(0x836)][_0x511e3a(0x91b)](this);},Scene_Status[_0x5443f5(0x353)][_0x5443f5(0x191)]=function(){const _0x4d0b5f=_0x5443f5;return Scene_Status[_0x4d0b5f(0x6aa)][_0x4d0b5f(0x2e8)][_0x4d0b5f(0x91b)](this);},Scene_Options[_0x5443f5(0x6aa)]=VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x446)][_0x5443f5(0x854)][_0x5443f5(0x8ff)],VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x5cb)]=Scene_Options[_0x5443f5(0x353)][_0x5443f5(0x736)],Scene_Options[_0x5443f5(0x353)]['create']=function(){const _0x2a0136=_0x5443f5;VisuMZ[_0x2a0136(0x425)][_0x2a0136(0x5cb)]['call'](this),this[_0x2a0136(0x414)]();},Scene_Options['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x2ca15b=_0x5443f5;this['_optionsWindow']&&this[_0x2ca15b(0x231)]['setBackgroundType'](Scene_Options[_0x2ca15b(0x6aa)][_0x2ca15b(0xfd)]);},Scene_Options[_0x5443f5(0x353)][_0x5443f5(0x7e7)]=function(){const _0x1e83bd=_0x5443f5;return Scene_Options[_0x1e83bd(0x6aa)][_0x1e83bd(0x80e)][_0x1e83bd(0x91b)](this);},Scene_Save[_0x5443f5(0x6aa)]=VisuMZ['CoreEngine'][_0x5443f5(0x446)][_0x5443f5(0x854)][_0x5443f5(0x83c)],Scene_Save['prototype'][_0x5443f5(0x736)]=function(){const _0x9d9f24=_0x5443f5;Scene_File[_0x9d9f24(0x353)][_0x9d9f24(0x736)][_0x9d9f24(0x91b)](this),this[_0x9d9f24(0x414)]();},Scene_Save[_0x5443f5(0x353)][_0x5443f5(0x414)]=function(){const _0x20c03d=_0x5443f5;this[_0x20c03d(0x93c)]&&(_0x20c03d(0x495)!==_0x20c03d(0x495)?this[_0x20c03d(0x918)]=_0x56f866['gl'][_0x20c03d(0x381)](_0x42172d['gl'][_0x20c03d(0x65b)]):this[_0x20c03d(0x93c)][_0x20c03d(0x3c0)](Scene_Save[_0x20c03d(0x6aa)][_0x20c03d(0x5e9)])),this[_0x20c03d(0x7af)]&&this[_0x20c03d(0x7af)][_0x20c03d(0x3c0)](Scene_Save['layoutSettings']['ListBgType']);},Scene_Save[_0x5443f5(0x353)][_0x5443f5(0x367)]=function(){const _0x3a566a=_0x5443f5;return Scene_Save[_0x3a566a(0x6aa)][_0x3a566a(0x405)][_0x3a566a(0x91b)](this);},Scene_Save['prototype'][_0x5443f5(0x4d5)]=function(){const _0x260745=_0x5443f5;return Scene_Save[_0x260745(0x6aa)][_0x260745(0x1cf)][_0x260745(0x91b)](this);},Scene_Load[_0x5443f5(0x6aa)]=VisuMZ[_0x5443f5(0x425)]['Settings']['MenuLayout'][_0x5443f5(0x7fc)],Scene_Load[_0x5443f5(0x353)][_0x5443f5(0x736)]=function(){const _0x23ada8=_0x5443f5;Scene_File[_0x23ada8(0x353)][_0x23ada8(0x736)][_0x23ada8(0x91b)](this),this[_0x23ada8(0x414)]();},Scene_Load[_0x5443f5(0x353)]['setCoreEngineUpdateWindowBg']=function(){const _0x25e03d=_0x5443f5;this[_0x25e03d(0x93c)]&&this[_0x25e03d(0x93c)][_0x25e03d(0x3c0)](Scene_Load[_0x25e03d(0x6aa)][_0x25e03d(0x5e9)]);if(this[_0x25e03d(0x7af)]){if(_0x25e03d(0x6f7)===_0x25e03d(0x2dc)){const _0x5b4933=(_0x528905[_0x25e03d(0x425)][_0x25e03d(0x446)]['BattleSystem']||'DATABASE')[_0x25e03d(0x1ca)]()['trim']();return _0x1265b0['CoreEngine'][_0x25e03d(0x9a4)](_0x5b4933);}else this[_0x25e03d(0x7af)][_0x25e03d(0x3c0)](Scene_Load[_0x25e03d(0x6aa)][_0x25e03d(0x154)]);}},Scene_Load[_0x5443f5(0x353)][_0x5443f5(0x367)]=function(){const _0x58f7=_0x5443f5;return Scene_Load[_0x58f7(0x6aa)][_0x58f7(0x405)][_0x58f7(0x91b)](this);},Scene_Load[_0x5443f5(0x353)][_0x5443f5(0x4d5)]=function(){const _0x332067=_0x5443f5;return Scene_Load[_0x332067(0x6aa)][_0x332067(0x1cf)][_0x332067(0x91b)](this);},Scene_GameEnd[_0x5443f5(0x6aa)]=VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x446)]['MenuLayout']['GameEnd'],VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x9f1)]=Scene_GameEnd[_0x5443f5(0x353)]['createBackground'],Scene_GameEnd[_0x5443f5(0x353)]['createBackground']=function(){const _0x457fb3=_0x5443f5;Scene_MenuBase['prototype'][_0x457fb3(0x4b9)][_0x457fb3(0x91b)](this);},Scene_GameEnd['prototype'][_0x5443f5(0x7df)]=function(){const _0x4b7d0a=_0x5443f5,_0x3b333c=this[_0x4b7d0a(0x953)]();this[_0x4b7d0a(0x10a)]=new Window_GameEnd(_0x3b333c),this[_0x4b7d0a(0x10a)][_0x4b7d0a(0x827)]('cancel',this[_0x4b7d0a(0x3da)]['bind'](this)),this['addWindow'](this['_commandWindow']),this[_0x4b7d0a(0x10a)][_0x4b7d0a(0x3c0)](Scene_GameEnd['layoutSettings'][_0x4b7d0a(0x2b2)]);},Scene_GameEnd[_0x5443f5(0x353)][_0x5443f5(0x953)]=function(){const _0xeecb96=_0x5443f5;return Scene_GameEnd['layoutSettings'][_0xeecb96(0x235)]['call'](this);},Scene_Shop[_0x5443f5(0x6aa)]=VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x446)]['MenuLayout'][_0x5443f5(0x4ba)],VisuMZ['CoreEngine'][_0x5443f5(0x932)]=Scene_Shop[_0x5443f5(0x353)]['create'],Scene_Shop[_0x5443f5(0x353)][_0x5443f5(0x736)]=function(){const _0x1d56b1=_0x5443f5;VisuMZ[_0x1d56b1(0x425)]['Scene_Shop_create'][_0x1d56b1(0x91b)](this),this[_0x1d56b1(0x414)]();},Scene_Shop[_0x5443f5(0x353)][_0x5443f5(0x414)]=function(){const _0x8b5eab=_0x5443f5;this[_0x8b5eab(0x93c)]&&this[_0x8b5eab(0x93c)][_0x8b5eab(0x3c0)](Scene_Shop[_0x8b5eab(0x6aa)][_0x8b5eab(0x5e9)]);this['_goldWindow']&&this[_0x8b5eab(0x3ac)][_0x8b5eab(0x3c0)](Scene_Shop[_0x8b5eab(0x6aa)]['GoldBgType']);this[_0x8b5eab(0x10a)]&&this['_commandWindow']['setBackgroundType'](Scene_Shop[_0x8b5eab(0x6aa)][_0x8b5eab(0x2b2)]);if(this[_0x8b5eab(0x58e)]){if('wmaIU'===_0x8b5eab(0x7c4))this[_0x8b5eab(0x58e)][_0x8b5eab(0x3c0)](Scene_Shop[_0x8b5eab(0x6aa)][_0x8b5eab(0x91c)]);else return _0x17ecc8[_0x8b5eab(0x1e7)];}this[_0x8b5eab(0x2c4)]&&this['_numberWindow']['setBackgroundType'](Scene_Shop[_0x8b5eab(0x6aa)]['NumberBgType']);this[_0x8b5eab(0x16c)]&&this[_0x8b5eab(0x16c)][_0x8b5eab(0x3c0)](Scene_Shop['layoutSettings'][_0x8b5eab(0x2b9)]);this[_0x8b5eab(0xf4)]&&this['_buyWindow'][_0x8b5eab(0x3c0)](Scene_Shop['layoutSettings'][_0x8b5eab(0x432)]);if(this[_0x8b5eab(0x6dc)]){if(_0x8b5eab(0x6e3)!=='liIpy')this['_categoryWindow']['setBackgroundType'](Scene_Shop[_0x8b5eab(0x6aa)][_0x8b5eab(0x70d)]);else{const _0x355f95=_0x8b5eab(0x8b5);this['_colorCache']=this['_colorCache']||{};if(this[_0x8b5eab(0x436)][_0x355f95])return this[_0x8b5eab(0x436)][_0x355f95];const _0x49ee3e=_0x5201dd['CoreEngine'][_0x8b5eab(0x446)][_0x8b5eab(0x134)][_0x8b5eab(0x225)];return this[_0x8b5eab(0x713)](_0x355f95,_0x49ee3e);}}this[_0x8b5eab(0x49c)]&&(_0x8b5eab(0x8d0)===_0x8b5eab(0x8d0)?this[_0x8b5eab(0x49c)][_0x8b5eab(0x3c0)](Scene_Shop[_0x8b5eab(0x6aa)][_0x8b5eab(0x4be)]):this[_0x8b5eab(0x127)]());},Scene_Shop[_0x5443f5(0x353)][_0x5443f5(0x367)]=function(){const _0x44e9f7=_0x5443f5;return Scene_Shop[_0x44e9f7(0x6aa)][_0x44e9f7(0x405)]['call'](this);},Scene_Shop[_0x5443f5(0x353)]['goldWindowRect']=function(){const _0x2ff42b=_0x5443f5;return Scene_Shop[_0x2ff42b(0x6aa)][_0x2ff42b(0x9a3)][_0x2ff42b(0x91b)](this);},Scene_Shop['prototype'][_0x5443f5(0x953)]=function(){const _0x2e9274=_0x5443f5;return Scene_Shop[_0x2e9274(0x6aa)]['CommandRect']['call'](this);},Scene_Shop[_0x5443f5(0x353)][_0x5443f5(0x1cb)]=function(){const _0x308554=_0x5443f5;return Scene_Shop[_0x308554(0x6aa)][_0x308554(0x24a)][_0x308554(0x91b)](this);},Scene_Shop['prototype'][_0x5443f5(0x6e2)]=function(){const _0x3998f9=_0x5443f5;return Scene_Shop[_0x3998f9(0x6aa)][_0x3998f9(0x7f4)][_0x3998f9(0x91b)](this);},Scene_Shop[_0x5443f5(0x353)]['statusWindowRect']=function(){const _0x4c659c=_0x5443f5;return Scene_Shop[_0x4c659c(0x6aa)]['StatusRect'][_0x4c659c(0x91b)](this);},Scene_Shop['prototype'][_0x5443f5(0x305)]=function(){const _0x335885=_0x5443f5;return Scene_Shop['layoutSettings'][_0x335885(0x32e)][_0x335885(0x91b)](this);},Scene_Shop['prototype'][_0x5443f5(0x36b)]=function(){const _0x1cbc79=_0x5443f5;return Scene_Shop[_0x1cbc79(0x6aa)]['CategoryRect'][_0x1cbc79(0x91b)](this);},Scene_Shop[_0x5443f5(0x353)][_0x5443f5(0x6e4)]=function(){const _0x29109d=_0x5443f5;return Scene_Shop[_0x29109d(0x6aa)][_0x29109d(0x7eb)][_0x29109d(0x91b)](this);},Scene_Name['layoutSettings']=VisuMZ[_0x5443f5(0x425)]['Settings'][_0x5443f5(0x854)]['NameMenu'],VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x575)]=Scene_Name['prototype'][_0x5443f5(0x736)],Scene_Name[_0x5443f5(0x353)][_0x5443f5(0x736)]=function(){const _0x4c9083=_0x5443f5;VisuMZ['CoreEngine'][_0x4c9083(0x575)][_0x4c9083(0x91b)](this),this[_0x4c9083(0x414)]();},Scene_Name[_0x5443f5(0x353)][_0x5443f5(0x414)]=function(){const _0x31d9fa=_0x5443f5;this['_editWindow']&&this[_0x31d9fa(0x5ad)][_0x31d9fa(0x3c0)](Scene_Name['layoutSettings'][_0x31d9fa(0x86a)]),this['_inputWindow']&&this['_inputWindow'][_0x31d9fa(0x3c0)](Scene_Name['layoutSettings'][_0x31d9fa(0x9f8)]);},Scene_Name[_0x5443f5(0x353)]['helpAreaHeight']=function(){return 0x0;},Scene_Name[_0x5443f5(0x353)][_0x5443f5(0x5f7)]=function(){const _0x7a3efa=_0x5443f5;return Scene_Name[_0x7a3efa(0x6aa)]['EditRect']['call'](this);},Scene_Name['prototype']['inputWindowRect']=function(){const _0x1b95c6=_0x5443f5;return Scene_Name['layoutSettings']['InputRect'][_0x1b95c6(0x91b)](this);},Scene_Name['prototype']['EnableNameInput']=function(){const _0xac5772=_0x5443f5;if(!this[_0xac5772(0x3fb)])return![];return VisuMZ['CoreEngine'][_0xac5772(0x446)][_0xac5772(0x688)][_0xac5772(0x401)];},Scene_Name[_0x5443f5(0x353)][_0x5443f5(0x210)]=function(){const _0x15ffd5=_0x5443f5;if(this[_0x15ffd5(0x401)]()&&this['_inputWindow'][_0x15ffd5(0x34c)]!==_0x15ffd5(0x351))return TextManager['getInputMultiButtonStrings']('pageup',_0x15ffd5(0x874));return Scene_MenuBase[_0x15ffd5(0x353)][_0x15ffd5(0x210)]['call'](this);},Scene_Name['prototype']['buttonAssistKey3']=function(){const _0x1adaa1=_0x5443f5;return this[_0x1adaa1(0x401)]()?TextManager['getInputButtonString']('tab'):Scene_MenuBase[_0x1adaa1(0x353)][_0x1adaa1(0x104)][_0x1adaa1(0x91b)](this);},Scene_Name[_0x5443f5(0x353)][_0x5443f5(0x12a)]=function(){const _0x38a509=_0x5443f5;if(this[_0x38a509(0x401)]()&&this['_inputWindow'][_0x38a509(0x34c)]===_0x38a509(0x351))return TextManager[_0x38a509(0xe4)]([_0x38a509(0x97a)]);return Scene_MenuBase['prototype'][_0x38a509(0x12a)]['call'](this);},Scene_Name['prototype'][_0x5443f5(0x38a)]=function(){const _0x59fc40=_0x5443f5;if(this['EnableNameInput']()&&this['_inputWindow'][_0x59fc40(0x34c)]==='keyboard')return TextManager[_0x59fc40(0xe4)]([_0x59fc40(0x8f8)]);return Scene_MenuBase[_0x59fc40(0x353)][_0x59fc40(0x38a)][_0x59fc40(0x91b)](this);},Scene_Name[_0x5443f5(0x353)][_0x5443f5(0x7f7)]=function(){const _0x4364e2=_0x5443f5;if(this[_0x4364e2(0x401)]()&&this['_inputWindow']['_mode']!=='keyboard'){const _0x5cc165=VisuMZ[_0x4364e2(0x425)][_0x4364e2(0x446)][_0x4364e2(0x688)];return _0x5cc165['PageChange']||_0x4364e2(0x501);}return Scene_MenuBase['prototype'][_0x4364e2(0x7f7)][_0x4364e2(0x91b)](this);},Scene_Name[_0x5443f5(0x353)][_0x5443f5(0x7f2)]=function(){const _0xc81261=_0x5443f5;if(this[_0xc81261(0x401)]()){if(_0xc81261(0x756)!==_0xc81261(0x756))_0x3d3694[_0xc81261(0x425)][_0xc81261(0x980)][_0xc81261(0x91b)](this),_0x2aec2c[_0xc81261(0x4ce)]()&&this[_0xc81261(0x2e7)]();else{const _0x4d7a71=VisuMZ[_0xc81261(0x425)][_0xc81261(0x446)][_0xc81261(0x688)];return this[_0xc81261(0x3fb)][_0xc81261(0x34c)]===_0xc81261(0x351)?_0x4d7a71[_0xc81261(0x610)]||_0xc81261(0x610):_0x4d7a71[_0xc81261(0x6ff)]||_0xc81261(0x6ff);}}else return Scene_MenuBase[_0xc81261(0x353)]['buttonAssistText3'][_0xc81261(0x91b)](this);},Scene_Name[_0x5443f5(0x353)]['buttonAssistText4']=function(){const _0x15cd55=_0x5443f5;if(this[_0x15cd55(0x401)]()){if(_0x15cd55(0x822)!=='RdirB')_0xda17a3[_0x15cd55(0x425)][_0x15cd55(0x815)][_0x15cd55(0x91b)](this),this['destroyScrollBarBitmaps']();else{const _0x32bd6d=VisuMZ[_0x15cd55(0x425)][_0x15cd55(0x446)][_0x15cd55(0x688)];if(this['_inputWindow'][_0x15cd55(0x34c)]==='keyboard'){if(_0x15cd55(0x42c)===_0x15cd55(0x8e4))this[_0x15cd55(0x971)](_0x2d4a88);else return _0x32bd6d[_0x15cd55(0x789)]||'Finish';}}}return Scene_MenuBase[_0x15cd55(0x353)][_0x15cd55(0x527)]['call'](this);},VisuMZ['CoreEngine']['Scene_Name_onInputOk']=Scene_Name[_0x5443f5(0x353)][_0x5443f5(0x34f)],Scene_Name[_0x5443f5(0x353)]['onInputOk']=function(){const _0x2a06ca=_0x5443f5;this[_0x2a06ca(0x254)]()?_0x2a06ca(0x374)!=='pUBvX'?this['onInputBannedWords']():_0x533ad3[_0x2a06ca(0x5b6)](_0x98e00d):VisuMZ[_0x2a06ca(0x425)][_0x2a06ca(0x41e)][_0x2a06ca(0x91b)](this);},Scene_Name[_0x5443f5(0x353)][_0x5443f5(0x254)]=function(){const _0x4f898e=_0x5443f5,_0x201f0d=VisuMZ[_0x4f898e(0x425)][_0x4f898e(0x446)]['KeyboardInput'];if(!_0x201f0d)return![];const _0x54f676=_0x201f0d['BannedWords'];if(!_0x54f676)return![];const _0x403e56=this[_0x4f898e(0x5ad)]['name']()[_0x4f898e(0x613)]();for(const _0x217c28 of _0x54f676){if(_0x4f898e(0x4cc)!=='vJuam')this[_0x4f898e(0x43c)]([_0x33d1cd],_0x5cdb80,_0x352859,_0x1e1159,_0x2414b5),_0x24f949+=_0x42d3ca;else{if(_0x403e56[_0x4f898e(0x53a)](_0x217c28[_0x4f898e(0x613)]()))return!![];}}return![];},Scene_Name[_0x5443f5(0x353)]['onInputBannedWords']=function(){SoundManager['playBuzzer']();},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x8b1)]=Scene_Battle[_0x5443f5(0x353)][_0x5443f5(0x5f3)],Scene_Battle['prototype'][_0x5443f5(0x5f3)]=function(){const _0x2cc59f=_0x5443f5;VisuMZ['CoreEngine']['Scene_Battle_update'][_0x2cc59f(0x91b)](this);if($gameTemp['_playTestFastMode'])this['updatePlayTestF7']();},Scene_Battle[_0x5443f5(0x353)][_0x5443f5(0xdc)]=function(){const _0x53168f=_0x5443f5;if(!BattleManager[_0x53168f(0x596)]()&&!this['_playtestF7Looping']&&!$gameMessage['isBusy']()){if(_0x53168f(0x535)==='aeSqA')this[_0x53168f(0x338)]=!![],this[_0x53168f(0x5f3)](),SceneManager['updateEffekseer'](),this['_playtestF7Looping']=![];else{const _0x5fa589=_0x557580?this[_0x53168f(0x9c5)]:this['_scrollBarVert'];if(!_0x5fa589)return;if(!_0x5fa589[_0x53168f(0x55f)])return;const _0x91a149=_0x5fa589[_0x53168f(0x55f)];_0x91a149[_0x53168f(0x63c)]();if(_0x443bec<=0x0)return;const _0x5ee2a8=_0x22aebf?this[_0x53168f(0x98d)]/this['overallWidth']():this[_0x53168f(0x547)]/this[_0x53168f(0x7a5)](),_0x1f22f1=_0x4bbe2a?_0x22d16a[_0x53168f(0x558)](_0x7ac53a*_0x5ee2a8):0x0,_0x2a861c=_0x546b1c?0x0:_0x2f6af9[_0x53168f(0x558)](_0x3d1e0e*_0x5ee2a8),_0x252757=_0x30a73c?_0x23ee27[_0x53168f(0x558)](_0x91a149[_0x53168f(0x786)]*_0x5ee2a8):_0x91a149[_0x53168f(0x786)],_0x283d46=_0xc028ba?_0x91a149[_0x53168f(0x99b)]:_0x470bc0[_0x53168f(0x558)](_0x91a149[_0x53168f(0x99b)]*_0x5ee2a8),_0x2e0b58=_0x5cc70d['SCROLLBAR'],_0x1a4b69=_0x38fa44[_0x53168f(0xeb)](_0x2e0b58[_0x53168f(0x62a)]),_0x6d1b49=_0xa29588[_0x53168f(0xeb)](_0x2e0b58[_0x53168f(0x8c2)]),_0xec7244=_0x2e0b58[_0x53168f(0x6a4)];_0x91a149[_0x53168f(0x11f)]=_0xec7244,_0x91a149['fillAll'](_0x1a4b69),_0x91a149[_0x53168f(0x11f)]=0xff,_0x91a149[_0x53168f(0x1e1)](_0x1f22f1,_0x2a861c,_0x252757,_0x283d46,_0x6d1b49);}}},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x8a2)]=Scene_Battle['prototype'][_0x5443f5(0x18f)],Scene_Battle['prototype']['createCancelButton']=function(){const _0x1a8659=_0x5443f5;VisuMZ[_0x1a8659(0x425)]['Scene_Battle_createCancelButton'][_0x1a8659(0x91b)](this),SceneManager[_0x1a8659(0x4ce)]()&&(_0x1a8659(0x8c9)===_0x1a8659(0x8e7)?_0x5a0f08[_0x1a8659(0x425)]['Window_MapName_refresh'][_0x1a8659(0x91b)](this):this[_0x1a8659(0x990)]());},Scene_Battle[_0x5443f5(0x353)][_0x5443f5(0x990)]=function(){const _0x3b0437=_0x5443f5;this['_cancelButton']['x']=Graphics[_0x3b0437(0x76c)]+0x4,this[_0x3b0437(0x48f)]()?this[_0x3b0437(0x26a)]['y']=Graphics['boxHeight']-this[_0x3b0437(0x9e4)]():'YGVDm'!==_0x3b0437(0x6c1)?this[_0x3b0437(0x26a)]['y']=0x0:(_0x3430cc[_0x3b0437(0x6b1)]()&&(_0x205436['log'](_0x3b0437(0x9b5)),_0x279cda['log'](_0x1f3e3d)),this[_0x3b0437(0x3f4)]());},VisuMZ[_0x5443f5(0x425)]['Sprite_Button_initialize']=Sprite_Button[_0x5443f5(0x353)][_0x5443f5(0x131)],Sprite_Button[_0x5443f5(0x353)][_0x5443f5(0x131)]=function(_0x4b7339){const _0x400f51=_0x5443f5;VisuMZ[_0x400f51(0x425)]['Sprite_Button_initialize'][_0x400f51(0x91b)](this,_0x4b7339),this['initButtonHidden']();},Sprite_Button[_0x5443f5(0x353)][_0x5443f5(0x91f)]=function(){const _0x746436=_0x5443f5,_0x45a431=VisuMZ['CoreEngine'][_0x746436(0x446)]['UI'];this[_0x746436(0x41c)]=![];switch(this[_0x746436(0x7ae)]){case'cancel':this[_0x746436(0x41c)]=!_0x45a431[_0x746436(0x7b5)];break;case _0x746436(0x560):case _0x746436(0x874):this[_0x746436(0x41c)]=!_0x45a431[_0x746436(0x442)];break;case _0x746436(0x86f):case'up':case _0x746436(0x4bb):case _0x746436(0x121):case'ok':this[_0x746436(0x41c)]=!_0x45a431[_0x746436(0x311)];break;case'menu':this['_isButtonHidden']=!_0x45a431[_0x746436(0x479)];break;}},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x521)]=Sprite_Button[_0x5443f5(0x353)][_0x5443f5(0x95e)],Sprite_Button[_0x5443f5(0x353)][_0x5443f5(0x95e)]=function(){const _0x5c065e=_0x5443f5;SceneManager[_0x5c065e(0x7c3)]()||this['_isButtonHidden']?this['hideButtonFromView']():VisuMZ[_0x5c065e(0x425)][_0x5c065e(0x521)][_0x5c065e(0x91b)](this);},Sprite_Button[_0x5443f5(0x353)][_0x5443f5(0x812)]=function(){const _0x3d324f=_0x5443f5;this[_0x3d324f(0x5ba)]=![],this[_0x3d324f(0x8e5)]=0x0,this['x']=Graphics[_0x3d324f(0x786)]*0xa,this['y']=Graphics[_0x3d324f(0x99b)]*0xa;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x5e4)]=Sprite_Battler['prototype'][_0x5443f5(0x7e6)],Sprite_Battler[_0x5443f5(0x353)][_0x5443f5(0x7e6)]=function(_0x385d01,_0x472f83,_0x20c3a8){const _0x100770=_0x5443f5;(this[_0x100770(0x3c1)]!==_0x385d01||this[_0x100770(0x361)]!==_0x472f83)&&(this[_0x100770(0x84a)](_0x100770(0x662)),this[_0x100770(0x95a)]=_0x20c3a8),VisuMZ['CoreEngine'][_0x100770(0x5e4)]['call'](this,_0x385d01,_0x472f83,_0x20c3a8);},Sprite_Battler[_0x5443f5(0x353)][_0x5443f5(0x84a)]=function(_0x28a7f6){this['_moveEasingType']=_0x28a7f6;},Sprite_Battler[_0x5443f5(0x353)][_0x5443f5(0x2e5)]=function(){const _0x325af6=_0x5443f5;if(this[_0x325af6(0x55d)]<=0x0)return;const _0xd75a0f=this[_0x325af6(0x55d)],_0xf66ac0=this['_movementWholeDuration'],_0xb2b434=this[_0x325af6(0x6cb)];this[_0x325af6(0x997)]=this['applyEasing'](this[_0x325af6(0x997)],this[_0x325af6(0x3c1)],_0xd75a0f,_0xf66ac0,_0xb2b434),this[_0x325af6(0x453)]=this[_0x325af6(0x8e2)](this[_0x325af6(0x453)],this[_0x325af6(0x361)],_0xd75a0f,_0xf66ac0,_0xb2b434),this['_movementDuration']--;if(this[_0x325af6(0x55d)]<=0x0)this['onMoveEnd']();},Sprite_Battler[_0x5443f5(0x353)][_0x5443f5(0x8e2)]=function(_0x52761e,_0x41009a,_0x1157b6,_0x602c73,_0xeef0b7){const _0x5a6631=_0x5443f5,_0x55d8f3=VisuMZ['ApplyEasing']((_0x602c73-_0x1157b6)/_0x602c73,_0xeef0b7||_0x5a6631(0x662)),_0x597fcd=VisuMZ['ApplyEasing']((_0x602c73-_0x1157b6+0x1)/_0x602c73,_0xeef0b7||_0x5a6631(0x662)),_0x5b2f6d=(_0x52761e-_0x41009a*_0x55d8f3)/(0x1-_0x55d8f3);return _0x5b2f6d+(_0x41009a-_0x5b2f6d)*_0x597fcd;},VisuMZ[_0x5443f5(0x425)]['Sprite_Actor_setActorHome']=Sprite_Actor[_0x5443f5(0x353)][_0x5443f5(0x1a3)],Sprite_Actor[_0x5443f5(0x353)][_0x5443f5(0x1a3)]=function(_0x16f2d4){const _0x118e4f=_0x5443f5;VisuMZ[_0x118e4f(0x425)][_0x118e4f(0x446)]['UI']['RepositionActors']?this['setActorHomeRepositioned'](_0x16f2d4):_0x118e4f(0x930)!==_0x118e4f(0x846)?VisuMZ[_0x118e4f(0x425)][_0x118e4f(0x5c9)][_0x118e4f(0x91b)](this,_0x16f2d4):(_0x1c6b0c[_0x118e4f(0x425)]['Scene_Map_createSpriteset'][_0x118e4f(0x91b)](this),_0x569176=this[_0x118e4f(0x881)]);},Sprite_Actor[_0x5443f5(0x353)][_0x5443f5(0x77e)]=function(_0x926b84){const _0x54da7c=_0x5443f5;let _0x1cfc11=Math['round'](Graphics['width']/0x2+0xc0);_0x1cfc11-=Math['floor']((Graphics[_0x54da7c(0x786)]-Graphics['boxWidth'])/0x2),_0x1cfc11+=_0x926b84*0x20;let _0x48f9db=Graphics[_0x54da7c(0x99b)]-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x48f9db-=Math[_0x54da7c(0x3fa)]((Graphics[_0x54da7c(0x99b)]-Graphics['boxHeight'])/0x2),_0x48f9db+=_0x926b84*0x30,this[_0x54da7c(0x174)](_0x1cfc11,_0x48f9db);},Sprite_Actor['prototype'][_0x5443f5(0x62f)]=function(){const _0x196abe=_0x5443f5;this[_0x196abe(0x7e6)](0x4b0,0x0,0x78);},Sprite_Animation[_0x5443f5(0x353)][_0x5443f5(0x931)]=function(_0x4c72b2){const _0xf71bf2=_0x5443f5;this[_0xf71bf2(0x998)]=_0x4c72b2;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x155)]=Sprite_Animation[_0x5443f5(0x353)][_0x5443f5(0x391)],Sprite_Animation[_0x5443f5(0x353)][_0x5443f5(0x391)]=function(){const _0x4af833=_0x5443f5;if(this['_muteSound'])return;VisuMZ[_0x4af833(0x425)][_0x4af833(0x155)][_0x4af833(0x91b)](this);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x3ba)]=Sprite_Animation[_0x5443f5(0x353)]['setViewport'],Sprite_Animation[_0x5443f5(0x353)][_0x5443f5(0x237)]=function(_0x773f){const _0x4503cd=_0x5443f5;if(this[_0x4503cd(0x5ff)]()){if(_0x4503cd(0x66e)!==_0x4503cd(0x66e))return _0x1500a9[_0x4503cd(0x425)]['CustomParamNames'][_0x146ca7];else this[_0x4503cd(0x971)](_0x773f);}else VisuMZ[_0x4503cd(0x425)][_0x4503cd(0x3ba)][_0x4503cd(0x91b)](this,_0x773f);},Sprite_Animation[_0x5443f5(0x353)][_0x5443f5(0x5ff)]=function(){const _0x4b4183=_0x5443f5;if(!this[_0x4b4183(0x3ef)])return![];const _0x54776a=this[_0x4b4183(0x3ef)][_0x4b4183(0x744)]||'';if(_0x54776a[_0x4b4183(0x8ee)](/<MIRROR OFFSET X>/i))return!![];if(_0x54776a[_0x4b4183(0x8ee)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x4b4183(0x425)][_0x4b4183(0x446)][_0x4b4183(0x5e6)][_0x4b4183(0x92e)];},Sprite_Animation[_0x5443f5(0x353)][_0x5443f5(0x971)]=function(_0x331620){const _0x412584=_0x5443f5,_0x535a9a=this['_viewportSize'],_0x48d855=this[_0x412584(0x415)],_0x333e17=this['_animation'][_0x412584(0x6e6)]*(this[_0x412584(0x503)]?-0x1:0x1)-_0x535a9a/0x2,_0x19b973=this['_animation'][_0x412584(0x97e)]-_0x48d855/0x2,_0x1f73b1=this[_0x412584(0x72b)](_0x331620);_0x331620['gl'][_0x412584(0x6e8)](_0x333e17+_0x1f73b1['x'],_0x19b973+_0x1f73b1['y'],_0x535a9a,_0x48d855);},Sprite_Animation['prototype']['targetSpritePosition']=function(_0x2eab12){const _0x4470cc=_0x5443f5;if(_0x2eab12[_0x4470cc(0x5a1)]){}const _0x2b33de=this[_0x4470cc(0x3ef)][_0x4470cc(0x744)];let _0x2923cd=_0x2eab12[_0x4470cc(0x99b)]*_0x2eab12[_0x4470cc(0x3f2)]['y'],_0x1d6bfb=0x0,_0x32a9fb=-_0x2923cd/0x2;if(_0x2b33de[_0x4470cc(0x8ee)](/<(?:HEAD|HEADER|TOP)>/i))_0x32a9fb=-_0x2923cd;if(_0x2b33de[_0x4470cc(0x8ee)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x32a9fb=0x0;if(this[_0x4470cc(0x3ef)][_0x4470cc(0x562)])_0x32a9fb=0x0;if(_0x2b33de[_0x4470cc(0x8ee)](/<(?:LEFT)>/i))_0x1d6bfb=-_0x2eab12[_0x4470cc(0x786)]/0x2;if(_0x2b33de[_0x4470cc(0x8ee)](/<(?:RIGHT)>/i))_0x1d6bfb=_0x2eab12['width']/0x2;_0x2b33de[_0x4470cc(0x8ee)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&('lINHp'!==_0x4470cc(0x554)?(_0x14abd3['CoreEngine']['Scene_Shop_create']['call'](this),this[_0x4470cc(0x414)]()):_0x1d6bfb=Number(RegExp['$1'])*_0x2eab12[_0x4470cc(0x786)]);_0x2b33de[_0x4470cc(0x8ee)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x32a9fb=(0x1-Number(RegExp['$1']))*-_0x2923cd);_0x2b33de[_0x4470cc(0x8ee)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x1d6bfb=Number(RegExp['$1'])*_0x2eab12[_0x4470cc(0x786)],_0x32a9fb=(0x1-Number(RegExp['$2']))*-_0x2923cd);if(_0x2b33de[_0x4470cc(0x8ee)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x1d6bfb+=Number(RegExp['$1']);if(_0x2b33de['match'](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x32a9fb+=Number(RegExp['$1']);_0x2b33de[_0x4470cc(0x8ee)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x1d6bfb+=Number(RegExp['$1']),_0x32a9fb+=Number(RegExp['$2']));const _0x3a0cca=new Point(_0x1d6bfb,_0x32a9fb);return _0x2eab12[_0x4470cc(0x533)](),_0x2eab12[_0x4470cc(0x88c)][_0x4470cc(0x4e9)](_0x3a0cca);},Sprite_AnimationMV[_0x5443f5(0x353)][_0x5443f5(0x9de)]=function(){const _0x598518=_0x5443f5;this[_0x598518(0x80d)]=VisuMZ['CoreEngine'][_0x598518(0x446)]['QoL'][_0x598518(0x2fe)]??0x4,this[_0x598518(0x1e6)](),this[_0x598518(0x80d)]=this[_0x598518(0x80d)][_0x598518(0x19c)](0x1,0xa);},Sprite_AnimationMV[_0x5443f5(0x353)][_0x5443f5(0x1e6)]=function(){const _0x8fd27f=_0x5443f5;if(!this[_0x8fd27f(0x3ef)]);const _0x3b95b4=this[_0x8fd27f(0x3ef)][_0x8fd27f(0x744)]||'';_0x3b95b4[_0x8fd27f(0x8ee)](/<RATE:[ ](\d+)>/i)&&(this[_0x8fd27f(0x80d)]=(Number(RegExp['$1'])||0x1)[_0x8fd27f(0x19c)](0x1,0xa));},Sprite_AnimationMV[_0x5443f5(0x353)]['setMute']=function(_0x22f7f4){const _0x433c69=_0x5443f5;this[_0x433c69(0x998)]=_0x22f7f4;},VisuMZ['CoreEngine'][_0x5443f5(0x7be)]=Sprite_AnimationMV[_0x5443f5(0x353)][_0x5443f5(0x8df)],Sprite_AnimationMV['prototype'][_0x5443f5(0x8df)]=function(_0x1df909){const _0x55261b=_0x5443f5;this['_muteSound']&&('mIZjL'===_0x55261b(0x426)?(_0x1df909=JsonEx[_0x55261b(0x525)](_0x1df909),_0x1df909['se']&&(_0x1df909['se'][_0x55261b(0x61e)]=0x0)):this[_0x55261b(0x459)](_0x4953c9[_0x55261b(0x732)](_0x55261b(0x86f)))),VisuMZ[_0x55261b(0x425)][_0x55261b(0x7be)]['call'](this,_0x1df909);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x7fa)]=Sprite_AnimationMV[_0x5443f5(0x353)][_0x5443f5(0x41a)],Sprite_AnimationMV[_0x5443f5(0x353)][_0x5443f5(0x41a)]=function(){const _0x274cb1=_0x5443f5;VisuMZ['CoreEngine']['Sprite_AnimationMV_updatePosition'][_0x274cb1(0x91b)](this);if(this['_animation']['position']===0x3){if(_0x274cb1(0x244)===_0x274cb1(0x244)){if(this['x']===0x0)this['x']=Math[_0x274cb1(0x558)](Graphics[_0x274cb1(0x786)]/0x2);if(this['y']===0x0)this['y']=Math['round'](Graphics[_0x274cb1(0x99b)]/0x2);}else{const _0x590b8a=_0x3599f8['getLastUsedGamepadType']();return _0x590b8a===_0x274cb1(0x610)?this[_0x274cb1(0x62b)](_0x114911):this['getControllerInputButtonString'](_0x590b8a,_0x44b2ef);}}},Sprite_Damage['prototype'][_0x5443f5(0x24e)]=function(_0x2224d7){const _0x11398f=_0x5443f5;let _0x3cb9c0=Math['abs'](_0x2224d7)[_0x11398f(0x109)]();if(this[_0x11398f(0x6a0)]()){if('sxXQs'!==_0x11398f(0x800))return this[_0x11398f(0x8fb)]()[_0x11398f(0x7a6)];else _0x3cb9c0=VisuMZ[_0x11398f(0x9a2)](_0x3cb9c0);}const _0x14727a=this['fontSize'](),_0xee4ee7=Math[_0x11398f(0x3fa)](_0x14727a*0.75);for(let _0x5b045d=0x0;_0x5b045d<_0x3cb9c0[_0x11398f(0x44d)];_0x5b045d++){const _0x26c2c6=this[_0x11398f(0x1e3)](_0xee4ee7,_0x14727a);_0x26c2c6['bitmap']['drawText'](_0x3cb9c0[_0x5b045d],0x0,0x0,_0xee4ee7,_0x14727a,_0x11398f(0x380)),_0x26c2c6['x']=(_0x5b045d-(_0x3cb9c0[_0x11398f(0x44d)]-0x1)/0x2)*_0xee4ee7,_0x26c2c6['dy']=-_0x5b045d;}},Sprite_Damage[_0x5443f5(0x353)][_0x5443f5(0x6a0)]=function(){const _0x2d2bb0=_0x5443f5;return VisuMZ[_0x2d2bb0(0x425)]['Settings'][_0x2d2bb0(0x5e6)][_0x2d2bb0(0x63d)];},Sprite_Damage[_0x5443f5(0x353)]['valueOutlineColor']=function(){const _0x310b1b=_0x5443f5;return ColorManager[_0x310b1b(0x51a)]();},VisuMZ['CoreEngine']['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0x5443f5(0x353)][_0x5443f5(0x749)],Sprite_Gauge['prototype'][_0x5443f5(0x749)]=function(){const _0x29ef9c=_0x5443f5;return VisuMZ[_0x29ef9c(0x425)][_0x29ef9c(0x84b)]['call'](this)[_0x29ef9c(0x19c)](0x0,0x1);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x1bb)]=Sprite_Gauge[_0x5443f5(0x353)][_0x5443f5(0x665)],Sprite_Gauge[_0x5443f5(0x353)][_0x5443f5(0x665)]=function(){const _0x463eb6=_0x5443f5;let _0x42090c=VisuMZ[_0x463eb6(0x425)]['Sprite_Gauge_currentValue']['call'](this);return _0x42090c;},Sprite_Gauge['prototype'][_0x5443f5(0x7dc)]=function(){const _0x3347b6=_0x5443f5;let _0x22a230=this[_0x3347b6(0x665)]();if(this[_0x3347b6(0x6a0)]()){if('vidIN'===_0x3347b6(0xd3))_0x22a230=VisuMZ[_0x3347b6(0x9a2)](_0x22a230);else{const _0x848d8a=_0x1fcfec[_0x3347b6(0x7fe)]();_0x848d8a>_0x5d687e&&(_0x23bef5=_0x848d8a,this[_0x3347b6(0x463)](_0x2da2e1,_0x43f401));}}const _0x1b6c73=this[_0x3347b6(0x2bc)]()-0x1,_0x20d4e2=this[_0x3347b6(0x8c6)]?this[_0x3347b6(0x8c6)]():this['bitmapHeight']();this[_0x3347b6(0x111)](),this[_0x3347b6(0x55f)]['drawText'](_0x22a230,0x0,0x0,_0x1b6c73,_0x20d4e2,_0x3347b6(0x66d));},Sprite_Gauge[_0x5443f5(0x353)][_0x5443f5(0x4d4)]=function(){return 0x3;},Sprite_Gauge[_0x5443f5(0x353)][_0x5443f5(0x6a0)]=function(){const _0x4f5f03=_0x5443f5;return VisuMZ[_0x4f5f03(0x425)][_0x4f5f03(0x446)][_0x4f5f03(0x5e6)][_0x4f5f03(0x9e5)];},Sprite_Gauge[_0x5443f5(0x353)][_0x5443f5(0x536)]=function(){const _0x513246=_0x5443f5;return ColorManager[_0x513246(0x22b)]();},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x8d7)]=Sprite_Picture[_0x5443f5(0x353)]['loadBitmap'],Sprite_Picture[_0x5443f5(0x353)][_0x5443f5(0x203)]=function(){const _0x4984c3=_0x5443f5;if(this[_0x4984c3(0x1ee)]&&this[_0x4984c3(0x1ee)][_0x4984c3(0x8ee)](/VisuMZ CoreEngine PictureIcon (\d+)/i)){if(_0x4984c3(0x64c)!==_0x4984c3(0x35f))this[_0x4984c3(0x704)](Number(RegExp['$1']));else return _0x21462a['buttonAssistSwitch'];}else'eUNTd'==='PPKHE'?(_0x4106ea[_0x4984c3(0x425)][_0x4984c3(0x4dc)]['call'](this),this['reservePlayTestNewGameCommonEvent'](),this[_0x4984c3(0x5d2)]()):VisuMZ['CoreEngine']['Sprite_Picture_loadBitmap'][_0x4984c3(0x91b)](this);},Sprite_Picture['prototype'][_0x5443f5(0x704)]=function(_0x34e596){const _0x304862=_0x5443f5,_0x40c24a=ImageManager['iconWidth'],_0x278a40=ImageManager['iconHeight'],_0x9cecad=this[_0x304862(0x1ee)][_0x304862(0x8ee)](/SMOOTH/i);this[_0x304862(0x55f)]=new Bitmap(_0x40c24a,_0x278a40);const _0xcdd5e9=ImageManager[_0x304862(0x589)](_0x304862(0x3b6)),_0x41c281=_0x34e596%0x10*_0x40c24a,_0x100934=Math[_0x304862(0x3fa)](_0x34e596/0x10)*_0x278a40;this[_0x304862(0x55f)][_0x304862(0x757)]=_0x9cecad,this[_0x304862(0x55f)][_0x304862(0x409)](_0xcdd5e9,_0x41c281,_0x100934,_0x40c24a,_0x278a40,0x0,0x0,_0x40c24a,_0x278a40);};function Sprite_TitlePictureButton(){const _0x3f2748=_0x5443f5;this[_0x3f2748(0x131)](...arguments);}Sprite_TitlePictureButton[_0x5443f5(0x353)]=Object[_0x5443f5(0x736)](Sprite_Clickable[_0x5443f5(0x353)]),Sprite_TitlePictureButton[_0x5443f5(0x353)][_0x5443f5(0x512)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x5443f5(0x353)][_0x5443f5(0x131)]=function(_0x36f816){const _0x3ad009=_0x5443f5;Sprite_Clickable['prototype'][_0x3ad009(0x131)][_0x3ad009(0x91b)](this),this['_data']=_0x36f816,this[_0x3ad009(0x853)]=null,this[_0x3ad009(0x71a)]();},Sprite_TitlePictureButton[_0x5443f5(0x353)][_0x5443f5(0x71a)]=function(){const _0x440f1d=_0x5443f5;this['x']=Graphics['width'],this['y']=Graphics[_0x440f1d(0x99b)],this['visible']=![],this[_0x440f1d(0x700)]();},Sprite_TitlePictureButton['prototype']['setupButtonImage']=function(){const _0x3ec406=_0x5443f5;this[_0x3ec406(0x55f)]=ImageManager[_0x3ec406(0x58f)](this[_0x3ec406(0x31e)][_0x3ec406(0x4f2)]),this['bitmap']['addLoadListener'](this[_0x3ec406(0x832)][_0x3ec406(0x2ed)](this));},Sprite_TitlePictureButton['prototype'][_0x5443f5(0x832)]=function(){const _0x3d02f1=_0x5443f5;this[_0x3d02f1(0x31e)][_0x3d02f1(0x2d5)][_0x3d02f1(0x91b)](this),this['_data']['PositionJS']['call'](this),this[_0x3d02f1(0xde)](this[_0x3d02f1(0x31e)][_0x3d02f1(0x6d2)][_0x3d02f1(0x2ed)](this));},Sprite_TitlePictureButton[_0x5443f5(0x353)][_0x5443f5(0x5f3)]=function(){const _0x2c3cb9=_0x5443f5;Sprite_Clickable[_0x2c3cb9(0x353)]['update'][_0x2c3cb9(0x91b)](this),this[_0x2c3cb9(0x95e)](),this[_0x2c3cb9(0x4ed)]();},Sprite_TitlePictureButton[_0x5443f5(0x353)][_0x5443f5(0x18e)]=function(){const _0x1a7ca6=_0x5443f5;return VisuMZ[_0x1a7ca6(0x425)][_0x1a7ca6(0x446)][_0x1a7ca6(0x854)][_0x1a7ca6(0x251)][_0x1a7ca6(0x810)];},Sprite_TitlePictureButton[_0x5443f5(0x353)][_0x5443f5(0x95e)]=function(){const _0xdc5cef=_0x5443f5;this[_0xdc5cef(0x820)]||this[_0xdc5cef(0x715)]?this['opacity']=0xff:_0xdc5cef(0x75c)!=='xbYmc'?(this['opacity']+=this['visible']?this['fadeSpeed']():-0x1*this[_0xdc5cef(0x18e)](),this['opacity']=Math[_0xdc5cef(0x2cf)](0xc0,this[_0xdc5cef(0x8e5)])):(_0xf48ed8[_0xdc5cef(0x425)][_0xdc5cef(0x2c1)][_0xdc5cef(0x91b)](this),_0x5df186=this);},Sprite_TitlePictureButton[_0x5443f5(0x353)][_0x5443f5(0xde)]=function(_0x4b1225){const _0x13400b=_0x5443f5;this[_0x13400b(0x853)]=_0x4b1225;},Sprite_TitlePictureButton[_0x5443f5(0x353)][_0x5443f5(0x2a4)]=function(){const _0x2cf699=_0x5443f5;this[_0x2cf699(0x853)]&&this['_clickHandler']();},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x809)]=Spriteset_Base['prototype']['initialize'],Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x131)]=function(){const _0x3f735c=_0x5443f5;VisuMZ[_0x3f735c(0x425)][_0x3f735c(0x809)][_0x3f735c(0x91b)](this),this[_0x3f735c(0x615)]();},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x615)]=function(){const _0x436332=_0x5443f5;this[_0x436332(0x528)]=[],this[_0x436332(0x6b6)]=[],this[_0x436332(0x9c8)]=this['scale']['x'],this[_0x436332(0x1a6)]=this['scale']['y'];},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x722)]=Spriteset_Base[_0x5443f5(0x353)]['destroy'],Spriteset_Base[_0x5443f5(0x353)]['destroy']=function(_0x49fca4){const _0x2d818f=_0x5443f5;this[_0x2d818f(0x8da)](),this[_0x2d818f(0x18b)](),VisuMZ[_0x2d818f(0x425)]['Spriteset_Base_destroy'][_0x2d818f(0x91b)](this,_0x49fca4);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x242)]=Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x5f3)],Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x5f3)]=function(){const _0x59d23c=_0x5443f5;VisuMZ[_0x59d23c(0x425)][_0x59d23c(0x242)][_0x59d23c(0x91b)](this),this['updatePictureSettings'](),this[_0x59d23c(0x6b3)](),this['updateFauxAnimations'](),this['updatePointAnimations']();},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0xe0)]=function(){},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x6b3)]=function(){const _0x45ac97=_0x5443f5;if(!VisuMZ['CoreEngine'][_0x45ac97(0x446)][_0x45ac97(0x5e6)][_0x45ac97(0x52b)])return;if(this[_0x45ac97(0x9c8)]===this['scale']['x']&&this['_cacheScaleY']===this[_0x45ac97(0x3f2)]['y'])return;this['adjustPictureAntiZoom'](),this[_0x45ac97(0x9c8)]=this['scale']['x'],this['_cacheScaleY']=this['scale']['y'];},Spriteset_Base[_0x5443f5(0x353)]['adjustPictureAntiZoom']=function(){const _0x1ae1e3=_0x5443f5;if(SceneManager[_0x1ae1e3(0x1fe)]()&&Spriteset_Map[_0x1ae1e3(0x4d2)])return;else{if(SceneManager[_0x1ae1e3(0x378)]()&&Spriteset_Battle[_0x1ae1e3(0x4d2)]){if(_0x1ae1e3(0x4b1)===_0x1ae1e3(0x4b1))return;else return _0x28b219[_0x1ae1e3(0x6aa)][_0x1ae1e3(0x80e)][_0x1ae1e3(0x91b)](this);}}this['scale']['x']!==0x0&&(_0x1ae1e3(0x582)===_0x1ae1e3(0xdf)?(_0x2fa96a[_0x1ae1e3(0x425)][_0x1ae1e3(0x81e)][_0x1ae1e3(0x91b)](this,_0x27a3b0),this[_0x1ae1e3(0x91f)]()):(this[_0x1ae1e3(0x7b8)][_0x1ae1e3(0x3f2)]['x']=0x1/this[_0x1ae1e3(0x3f2)]['x'],this['_pictureContainer']['x']=-(this['x']/this['scale']['x']))),this['scale']['y']!==0x0&&(_0x1ae1e3(0x69a)==='IlyOO'?(this[_0x1ae1e3(0x7b8)]['scale']['y']=0x1/this[_0x1ae1e3(0x3f2)]['y'],this[_0x1ae1e3(0x7b8)]['y']=-(this['y']/this[_0x1ae1e3(0x3f2)]['y'])):(this['x']=_0x47da19['width'],this['y']=_0x2b36b3[_0x1ae1e3(0x99b)],this['visible']=![],this[_0x1ae1e3(0x700)]()));},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x9c1)]=Spriteset_Base['prototype'][_0x5443f5(0x41a)],Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x41a)]=function(){const _0x5d464c=_0x5443f5;VisuMZ[_0x5d464c(0x425)][_0x5d464c(0x9c1)][_0x5d464c(0x91b)](this),this['updatePositionCoreEngine']();},Spriteset_Base['prototype']['updatePositionCoreEngine']=function(){const _0x59278a=_0x5443f5;if(!$gameScreen)return;if($gameScreen[_0x59278a(0x85a)]<=0x0)return;this['x']-=Math['round']($gameScreen[_0x59278a(0x4a6)]());const _0x1273c7=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen[_0x59278a(0x4cf)]()){case _0x59278a(0x709):this[_0x59278a(0xe6)]();break;case _0x59278a(0x8f4):this[_0x59278a(0x328)]();break;case _0x59278a(0x322):this[_0x59278a(0x5fe)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0xe6)]=function(){const _0x339f94=_0x5443f5,_0x4a4400=VisuMZ['CoreEngine'][_0x339f94(0x446)]['ScreenShake'];if(_0x4a4400&&_0x4a4400['originalJS']){if('FSksr'===_0x339f94(0x8f0))return _0x4a4400['originalJS']['call'](this);else{this['createTitleButtons']();const _0x5415b5=_0x39eae1[_0x339f94(0x2e1)]['background'],_0x5604f9=this['commandWindowRect']();this[_0x339f94(0x10a)]=new _0x45db14(_0x5604f9),this[_0x339f94(0x10a)][_0x339f94(0x3c0)](_0x5415b5);const _0x323bff=this[_0x339f94(0x953)]();this[_0x339f94(0x10a)][_0x339f94(0x26e)](_0x323bff['x'],_0x323bff['y'],_0x323bff[_0x339f94(0x786)],_0x323bff[_0x339f94(0x99b)]),this[_0x339f94(0x10a)][_0x339f94(0x1b2)](),this[_0x339f94(0x10a)][_0x339f94(0x61c)](),this['_commandWindow'][_0x339f94(0x331)](),this[_0x339f94(0x6bc)](this[_0x339f94(0x10a)]);}}this['x']+=Math['round']($gameScreen[_0x339f94(0x4a6)]());},Spriteset_Base['prototype'][_0x5443f5(0x93a)]=function(){const _0x3896f1=_0x5443f5,_0x2f94ba=VisuMZ[_0x3896f1(0x425)][_0x3896f1(0x446)][_0x3896f1(0x56b)];if(_0x2f94ba&&_0x2f94ba[_0x3896f1(0x518)]){if(_0x3896f1(0x94b)===_0x3896f1(0x94b))return _0x2f94ba[_0x3896f1(0x518)]['call'](this);else _0x496480[_0x3896f1(0x732)](_0x3896f1(0x98c))&&(_0x49e961[_0x3896f1(0x359)]=!_0x5455e4[_0x3896f1(0x359)],_0x44273e['save']());}const _0x4d50d8=$gameScreen['_shakePower']*0.75,_0x52a49b=$gameScreen[_0x3896f1(0x128)]*0.6,_0x43eb56=$gameScreen['_shakeDuration'];this['x']+=Math[_0x3896f1(0x558)](Math[_0x3896f1(0x751)](_0x4d50d8)-Math[_0x3896f1(0x751)](_0x52a49b))*(Math[_0x3896f1(0x2cf)](_0x43eb56,0x1e)*0.5),this['y']+=Math[_0x3896f1(0x558)](Math[_0x3896f1(0x751)](_0x4d50d8)-Math['randomInt'](_0x52a49b))*(Math['min'](_0x43eb56,0x1e)*0.5);},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x328)]=function(){const _0x33f57b=_0x5443f5,_0xa218da=VisuMZ[_0x33f57b(0x425)]['Settings']['ScreenShake'];if(_0xa218da&&_0xa218da[_0x33f57b(0x289)]){if('itruw'===_0x33f57b(0x31f))return _0xa218da[_0x33f57b(0x289)][_0x33f57b(0x91b)](this);else _0x14a1d4[_0x33f57b(0x353)][_0x33f57b(0xea)][_0x33f57b(0x91b)](this),!_0x125864[_0x33f57b(0x461)](_0x472666)&&(this[_0x33f57b(0x881)][_0x33f57b(0x5f3)](),this['_mapNameWindow'][_0x33f57b(0x557)](),this['_windowLayer'][_0x33f57b(0x5ba)]=![],_0x1e9195[_0x33f57b(0x7d1)]()),_0x141a8f[_0x33f57b(0x212)](),this[_0x33f57b(0x9f5)]();}const _0x3076b8=$gameScreen[_0x33f57b(0x951)]*0.75,_0x370bfd=$gameScreen['_shakeSpeed']*0.6,_0x12d14a=$gameScreen['_shakeDuration'];this['x']+=Math[_0x33f57b(0x558)](Math[_0x33f57b(0x751)](_0x3076b8)-Math['randomInt'](_0x370bfd))*(Math[_0x33f57b(0x2cf)](_0x12d14a,0x1e)*0.5);},Spriteset_Base[_0x5443f5(0x353)]['updatePositionCoreEngineShakeVert']=function(){const _0x550cb2=_0x5443f5,_0x43f73a=VisuMZ['CoreEngine']['Settings']['ScreenShake'];if(_0x43f73a&&_0x43f73a[_0x550cb2(0x85c)])return _0x43f73a[_0x550cb2(0x85c)][_0x550cb2(0x91b)](this);const _0x433a3f=$gameScreen[_0x550cb2(0x951)]*0.75,_0x122fad=$gameScreen['_shakeSpeed']*0.6,_0x297118=$gameScreen[_0x550cb2(0x85a)];this['y']+=Math[_0x550cb2(0x558)](Math[_0x550cb2(0x751)](_0x433a3f)-Math[_0x550cb2(0x751)](_0x122fad))*(Math['min'](_0x297118,0x1e)*0.5);},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x299)]=function(){const _0x35246b=_0x5443f5;for(const _0x1ec2d5 of this[_0x35246b(0x528)]){if('vHdmn'==='gziVV')return _0x319431['prototype'][_0x35246b(0x1eb)]();else!_0x1ec2d5['isPlaying']()&&this[_0x35246b(0x80b)](_0x1ec2d5);}this['processFauxAnimationRequests']();},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x4d7)]=function(){const _0x47f88e=_0x5443f5;for(;;){const _0x15a3a9=$gameTemp[_0x47f88e(0x379)]();if(_0x15a3a9)this[_0x47f88e(0x71d)](_0x15a3a9);else break;}},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x71d)]=function(_0x5e51a8){const _0x31cb6d=_0x5443f5,_0x2a0cc5=$dataAnimations[_0x5e51a8[_0x31cb6d(0x23d)]],_0x1bfd0c=_0x5e51a8[_0x31cb6d(0x368)],_0x307a10=_0x5e51a8[_0x31cb6d(0x3f0)],_0x3ad60a=_0x5e51a8[_0x31cb6d(0x4f6)];let _0x3029c9=this[_0x31cb6d(0x7ff)]();const _0x35f722=this[_0x31cb6d(0x78d)]();if(this[_0x31cb6d(0x798)](_0x2a0cc5))for(const _0x1749fa of _0x1bfd0c){this['createFauxAnimationSprite']([_0x1749fa],_0x2a0cc5,_0x307a10,_0x3029c9,_0x3ad60a),_0x3029c9+=_0x35f722;}else{if('qCNbM'!==_0x31cb6d(0x3b0))this[_0x31cb6d(0x9a8)](_0x1bfd0c,_0x2a0cc5,_0x307a10,_0x3029c9,_0x3ad60a);else return _0x3d5620[_0x31cb6d(0x425)][_0x31cb6d(0x1e2)][_0x31cb6d(0x91b)](this,_0x509138);}},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x44a)]=function(_0x1589fe,_0x596cff,_0x48b6ee,_0xd6938a){const _0x325d80=_0x5443f5,_0xe79252=this[_0x325d80(0x140)](_0x596cff),_0x151af2=new(_0xe79252?Sprite_AnimationMV:Sprite_Animation)(),_0x5c9a08=this[_0x325d80(0x67e)](_0x1589fe),_0x1c2ebd=this[_0x325d80(0x7ff)](),_0x5198a1=_0xd6938a>_0x1c2ebd?this['lastAnimationSprite']():null;this[_0x325d80(0x49d)](_0x1589fe[0x0])&&(_0x48b6ee=!_0x48b6ee),_0x151af2['targetObjects']=_0x1589fe,_0x151af2[_0x325d80(0x71a)](_0x5c9a08,_0x596cff,_0x48b6ee,_0xd6938a,_0x5198a1),this[_0x325d80(0x9ec)](_0x151af2),this[_0x325d80(0x952)]['push'](_0x151af2);},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x9a8)]=function(_0x416ffe,_0x74d352,_0x397d82,_0x1ad3c0,_0x2bf689){const _0x479f96=_0x5443f5,_0x5889d3=this['isMVAnimation'](_0x74d352),_0xf2cfad=new(_0x5889d3?Sprite_AnimationMV:Sprite_Animation)(),_0x195d19=this[_0x479f96(0x67e)](_0x416ffe);this[_0x479f96(0x49d)](_0x416ffe[0x0])&&(_0x397d82=!_0x397d82);_0xf2cfad['targetObjects']=_0x416ffe,_0xf2cfad[_0x479f96(0x71a)](_0x195d19,_0x74d352,_0x397d82,_0x1ad3c0),_0xf2cfad[_0x479f96(0x931)](_0x2bf689),this[_0x479f96(0x9ec)](_0xf2cfad);if(this[_0x479f96(0x952)])this[_0x479f96(0x952)][_0x479f96(0x2d0)](_0xf2cfad);this[_0x479f96(0x528)][_0x479f96(0x747)](_0xf2cfad);},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x9ec)]=function(_0x5af47b){const _0x4fbf75=_0x5443f5;this[_0x4fbf75(0x2fb)]['addChild'](_0x5af47b);},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x861)]=function(_0x53dd7a){const _0x175171=_0x5443f5;this[_0x175171(0x952)][_0x175171(0x2d0)](_0x53dd7a),this[_0x175171(0x6d8)](_0x53dd7a);for(const _0x5863cd of _0x53dd7a[_0x175171(0x6b4)]){_0x175171(0x58c)===_0x175171(0x58c)?_0x5863cd[_0x175171(0x9ee)]&&(_0x175171(0x6f4)===_0x175171(0x6f4)?_0x5863cd[_0x175171(0x9ee)]():this[_0x175171(0x853)]=_0x1cd068):this[_0x175171(0x341)]();}_0x53dd7a[_0x175171(0x683)]();},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x80b)]=function(_0x57f61d){const _0xcba71f=_0x5443f5;this['_fauxAnimationSprites'][_0xcba71f(0x2d0)](_0x57f61d),this[_0xcba71f(0x6d8)](_0x57f61d);for(const _0x534d8e of _0x57f61d['targetObjects']){'tiTRV'!==_0xcba71f(0x7e3)?(_0x34f695+=_0x1d0fe9,_0x8540db+='%1〘End\x20Choice\x20Selection〙%1'[_0xcba71f(0x2d3)](_0x29bc15)):_0x534d8e[_0xcba71f(0x9ee)]&&_0x534d8e['endAnimation']();}_0x57f61d[_0xcba71f(0x683)]();},Spriteset_Base['prototype']['removeAnimationFromContainer']=function(_0x555eda){const _0x515664=_0x5443f5;this[_0x515664(0x2fb)][_0x515664(0x14c)](_0x555eda);},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x8da)]=function(){const _0x4e9286=_0x5443f5;for(const _0x14c1fa of this[_0x4e9286(0x528)]){this[_0x4e9286(0x80b)](_0x14c1fa);}},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x4bf)]=function(){const _0x3e8b40=_0x5443f5;return this[_0x3e8b40(0x528)][_0x3e8b40(0x44d)]>0x0;},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x9e1)]=function(){const _0x5a7a1b=_0x5443f5;for(const _0x548d2b of this[_0x5a7a1b(0x6b6)]){if(!_0x548d2b[_0x5a7a1b(0x966)]()){if('kYZIC'===_0x5a7a1b(0x7cc))this[_0x5a7a1b(0x682)](_0x548d2b);else return this[_0x5a7a1b(0x79a)](_0x5aee84)&&_0x431f0a[_0x5a7a1b(0x1fa)]===0x2;}}this[_0x5a7a1b(0x7a2)]();},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x7a2)]=function(){const _0xd1d2da=_0x5443f5;for(;;){if('goAXr'==='goAXr'){const _0x13559b=$gameTemp[_0xd1d2da(0x50a)]();if(_0x13559b)'ruJnc'===_0xd1d2da(0x1d6)?this[_0xd1d2da(0x6d5)](_0x13559b):this[_0xd1d2da(0x26a)]['y']=0x0;else break;}else{const _0x325eba=this[_0xd1d2da(0x98d)]/0x5,_0x161e16=_0x572fa4[_0xd1d2da(0x970)],_0x1082c9=_0x161e16['buttonAssistKey%1'[_0xd1d2da(0x2d3)](_0x47e45a)](),_0xccc21a=_0x161e16[_0xd1d2da(0x64f)['format'](_0x498cac)]();this[_0xd1d2da(0x31e)][_0xd1d2da(0x40c)[_0xd1d2da(0x2d3)](_0x337cf8)]=_0x1082c9,this['_data'][_0xd1d2da(0x18c)['format'](_0x1f6b63)]=_0xccc21a;if(_0x1082c9==='')return;if(_0xccc21a==='')return;const _0x23b155=_0x161e16[_0xd1d2da(0x49b)[_0xd1d2da(0x2d3)](_0x4868ed)](),_0x4ee091=this['itemPadding'](),_0x3f4029=_0x325eba*(_0x584b4d-0x1)+_0x4ee091+_0x23b155,_0xf8a342=_0x2311fe[_0xd1d2da(0x425)][_0xd1d2da(0x446)][_0xd1d2da(0x147)][_0xd1d2da(0x7b1)];this[_0xd1d2da(0x4cd)](_0xf8a342['format'](_0x1082c9,_0xccc21a),_0x3f4029,0x0,_0x325eba-_0x4ee091*0x2);}}},Spriteset_Base['prototype'][_0x5443f5(0x6d5)]=function(_0x2eaf04){const _0x3a98d2=_0x5443f5,_0x25b712=$dataAnimations[_0x2eaf04[_0x3a98d2(0x23d)]],_0x48dc1c=this[_0x3a98d2(0x73d)](_0x2eaf04),_0xc84485=_0x2eaf04[_0x3a98d2(0x3f0)],_0x227a55=_0x2eaf04['mute'];let _0x2de0e1=this['animationBaseDelay']();const _0x1369ec=this['animationNextDelay']();if(this[_0x3a98d2(0x798)](_0x25b712)){if(_0x3a98d2(0x51f)===_0x3a98d2(0x51f))for(const _0x15dad6 of _0x48dc1c){this['createPointAnimationSprite']([_0x15dad6],_0x25b712,_0xc84485,_0x2de0e1,_0x227a55),_0x2de0e1+=_0x1369ec;}else _0x3ab8c4=_0x42bc08[_0x3a98d2(0x3f3)](_0x1a70b2);}else this[_0x3a98d2(0x43c)](_0x48dc1c,_0x25b712,_0xc84485,_0x2de0e1,_0x227a55);},Spriteset_Base['prototype'][_0x5443f5(0x73d)]=function(_0x4cce4){const _0x5818ba=_0x5443f5,_0x258d46=new Sprite_Clickable(),_0x3e974b=this[_0x5818ba(0x72c)]();_0x258d46['x']=_0x4cce4['x']-_0x3e974b['x'],_0x258d46['y']=_0x4cce4['y']-_0x3e974b['y'],_0x258d46['z']=0x64;const _0x13a6fc=this[_0x5818ba(0x72c)]();return _0x13a6fc[_0x5818ba(0x83f)](_0x258d46),[_0x258d46];},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x72c)]=function(){return this;},Spriteset_Map[_0x5443f5(0x353)][_0x5443f5(0x72c)]=function(){return this['_tilemap']||this;},Spriteset_Battle[_0x5443f5(0x353)][_0x5443f5(0x72c)]=function(){const _0x374e7e=_0x5443f5;return this[_0x374e7e(0x193)]||this;},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x43c)]=function(_0x44fcc0,_0x11dc53,_0x25622b,_0xec5e20,_0xbb9a10){const _0x4f7e97=_0x5443f5,_0x10e257=this[_0x4f7e97(0x140)](_0x11dc53),_0x197bda=new(_0x10e257?Sprite_AnimationMV:Sprite_Animation)();_0x197bda[_0x4f7e97(0x6b4)]=_0x44fcc0,_0x197bda[_0x4f7e97(0x71a)](_0x44fcc0,_0x11dc53,_0x25622b,_0xec5e20),_0x197bda['setMute'](_0xbb9a10),this[_0x4f7e97(0x9ec)](_0x197bda),this[_0x4f7e97(0x6b6)]['push'](_0x197bda);},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x682)]=function(_0x4de4bb){const _0x1dbf2d=_0x5443f5;this[_0x1dbf2d(0x6b6)][_0x1dbf2d(0x2d0)](_0x4de4bb),this[_0x1dbf2d(0x2fb)][_0x1dbf2d(0x14c)](_0x4de4bb);for(const _0x5a8b5d of _0x4de4bb[_0x1dbf2d(0x6b4)]){if(_0x1dbf2d(0x82b)===_0x1dbf2d(0x82b)){_0x5a8b5d[_0x1dbf2d(0x9ee)]&&_0x5a8b5d[_0x1dbf2d(0x9ee)]();const _0x18deef=this[_0x1dbf2d(0x72c)]();if(_0x18deef)_0x18deef[_0x1dbf2d(0x14c)](_0x5a8b5d);}else{const _0x4aae40=_0x1631b9[_0x1dbf2d(0x52e)]['uiAreaWidth'],_0x190381=_0x58fdd2['advanced'][_0x1dbf2d(0x1de)],_0x470bd6=_0x46cfa5['CoreEngine'][_0x1dbf2d(0x446)]['UI'][_0x1dbf2d(0x20a)];_0x181b36[_0x1dbf2d(0x76c)]=_0x4aae40-_0x470bd6*0x2,_0x22c1c1['boxHeight']=_0x190381-_0x470bd6*0x2,this['determineSideButtonLayoutValid']();}}_0x4de4bb[_0x1dbf2d(0x683)]();},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x18b)]=function(){const _0x349b0f=_0x5443f5;for(const _0xe42399 of this['_pointAnimationSprites']){'ZlRbC'===_0x349b0f(0x844)?this[_0x349b0f(0x682)](_0xe42399):_0x15e5cc[_0x349b0f(0xe7)][_0x349b0f(0x8ee)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x40ad1f[_0x349b0f(0x150)]=_0x5c202d[_0x349b0f(0x8d5)](_0x5814c0(_0x2a9ddd['$1']),0x1));}},Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x470)]=function(){const _0x542fe0=_0x5443f5;return this[_0x542fe0(0x6b6)]['length']>0x0;},VisuMZ['CoreEngine'][_0x5443f5(0x7e0)]=Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x166)],Spriteset_Base[_0x5443f5(0x353)][_0x5443f5(0x166)]=function(){const _0x381c9b=_0x5443f5;return VisuMZ[_0x381c9b(0x425)][_0x381c9b(0x7e0)][_0x381c9b(0x91b)](this)||this[_0x381c9b(0x470)]();},Spriteset_Map[_0x5443f5(0x4d2)]=VisuMZ['CoreEngine'][_0x5443f5(0x446)][_0x5443f5(0x5e6)]['DetachMapPictureContainer']||![],VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x2a1)]=Scene_Map[_0x5443f5(0x353)][_0x5443f5(0x257)],Scene_Map['prototype']['createSpriteset']=function(){const _0x243f4a=_0x5443f5;VisuMZ['CoreEngine'][_0x243f4a(0x2a1)][_0x243f4a(0x91b)](this);if(!Spriteset_Map[_0x243f4a(0x4d2)])return;const _0x6e695c=this[_0x243f4a(0x881)];if(!_0x6e695c)return;this[_0x243f4a(0x7b8)]=_0x6e695c[_0x243f4a(0x7b8)];if(!this['_pictureContainer'])return;this['addChild'](this['_pictureContainer']);},Spriteset_Battle[_0x5443f5(0x4d2)]=VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x446)][_0x5443f5(0x5e6)]['DetachBattlePictureContainer']||![],VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x573)]=Scene_Battle[_0x5443f5(0x353)][_0x5443f5(0x257)],Scene_Battle[_0x5443f5(0x353)][_0x5443f5(0x257)]=function(){const _0x3811ca=_0x5443f5;VisuMZ[_0x3811ca(0x425)][_0x3811ca(0x573)][_0x3811ca(0x91b)](this);if(!Spriteset_Battle[_0x3811ca(0x4d2)])return;const _0x29bfc6=this['_spriteset'];if(!_0x29bfc6)return;this[_0x3811ca(0x7b8)]=_0x29bfc6[_0x3811ca(0x7b8)];if(!this[_0x3811ca(0x7b8)])return;this[_0x3811ca(0x83f)](this['_pictureContainer']);},Spriteset_Battle[_0x5443f5(0x353)][_0x5443f5(0x4b9)]=function(){const _0x185801=_0x5443f5;this[_0x185801(0x6a5)]=new PIXI['filters']['BlurFilter'](clamp=!![]),this[_0x185801(0x608)]=new Sprite(),this[_0x185801(0x608)][_0x185801(0x55f)]=SceneManager[_0x185801(0x2ad)](),this[_0x185801(0x608)][_0x185801(0x570)]=[this[_0x185801(0x6a5)]],this[_0x185801(0x2ff)][_0x185801(0x83f)](this[_0x185801(0x608)]);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x903)]=Spriteset_Battle[_0x5443f5(0x353)][_0x5443f5(0x54a)],Spriteset_Battle['prototype'][_0x5443f5(0x54a)]=function(){const _0x450546=_0x5443f5;if(this[_0x450546(0x8fe)]()){if('OvLYC'!==_0x450546(0x8d1))this['repositionEnemiesByResolution']();else return;}VisuMZ[_0x450546(0x425)][_0x450546(0x903)][_0x450546(0x91b)](this);},Spriteset_Battle[_0x5443f5(0x353)][_0x5443f5(0x8fe)]=function(){const _0x2c06af=_0x5443f5,_0x47580d=VisuMZ[_0x2c06af(0x425)][_0x2c06af(0x446)][_0x2c06af(0x9a6)];if(!_0x47580d)return![];if(Utils[_0x2c06af(0x6c9)]>=_0x2c06af(0x87f)&&!_0x47580d['RepositionEnemies130'])return![];return _0x47580d[_0x2c06af(0x37d)];},Spriteset_Battle[_0x5443f5(0x353)][_0x5443f5(0x341)]=function(){const _0x35227f=_0x5443f5;for(member of $gameTroop[_0x35227f(0x356)]()){member[_0x35227f(0x9df)]();}},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x2fc)]=Window_Base[_0x5443f5(0x353)]['initialize'],Window_Base[_0x5443f5(0x353)]['initialize']=function(_0x298085){const _0x404e07=_0x5443f5;_0x298085['x']=Math[_0x404e07(0x558)](_0x298085['x']),_0x298085['y']=Math['round'](_0x298085['y']),_0x298085[_0x404e07(0x786)]=Math[_0x404e07(0x558)](_0x298085[_0x404e07(0x786)]),_0x298085[_0x404e07(0x99b)]=Math[_0x404e07(0x558)](_0x298085[_0x404e07(0x99b)]),this[_0x404e07(0x4b5)](),VisuMZ[_0x404e07(0x425)][_0x404e07(0x2fc)]['call'](this,_0x298085),this['initCoreEasing']();},Window_Base[_0x5443f5(0x353)][_0x5443f5(0x4b5)]=function(){const _0x3bfb08=_0x5443f5;this[_0x3bfb08(0x4e1)]=VisuMZ[_0x3bfb08(0x425)][_0x3bfb08(0x446)]['QoL']['DigitGroupingStandardText'],this[_0x3bfb08(0x489)]=VisuMZ[_0x3bfb08(0x425)][_0x3bfb08(0x446)][_0x3bfb08(0x5e6)][_0x3bfb08(0x9ba)];},Window_Base[_0x5443f5(0x353)][_0x5443f5(0x1eb)]=function(){const _0x26968c=_0x5443f5;return VisuMZ[_0x26968c(0x425)][_0x26968c(0x446)]['Window']['LineHeight'];},Window_Base[_0x5443f5(0x353)][_0x5443f5(0x94a)]=function(){const _0x9af25d=_0x5443f5;return VisuMZ[_0x9af25d(0x425)][_0x9af25d(0x446)][_0x9af25d(0x9ad)][_0x9af25d(0x73b)];},Window_Base['prototype'][_0x5443f5(0x6af)]=function(){const _0x5b61c8=_0x5443f5;$gameSystem[_0x5b61c8(0x236)]?this[_0x5b61c8(0x7e5)]=$gameSystem[_0x5b61c8(0x236)]():this[_0x5b61c8(0x7e5)]=VisuMZ['CoreEngine']['Settings']['Window'][_0x5b61c8(0x6d7)];},Window_Base[_0x5443f5(0x353)][_0x5443f5(0x258)]=function(){const _0xa061d7=_0x5443f5;return VisuMZ['CoreEngine'][_0xa061d7(0x446)]['Window'][_0xa061d7(0x2a8)];},Window_Base[_0x5443f5(0x353)]['openingSpeed']=function(){const _0x593ae9=_0x5443f5;return VisuMZ[_0x593ae9(0x425)][_0x593ae9(0x446)]['Window'][_0x593ae9(0x637)];},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x6c6)]=Window_Base['prototype'][_0x5443f5(0x5f3)],Window_Base[_0x5443f5(0x353)][_0x5443f5(0x5f3)]=function(){const _0x510002=_0x5443f5;VisuMZ[_0x510002(0x425)][_0x510002(0x6c6)]['call'](this),this[_0x510002(0x348)]();},Window_Base[_0x5443f5(0x353)][_0x5443f5(0x103)]=function(){const _0xb9b8ba=_0x5443f5;this[_0xb9b8ba(0xee)]&&('vGoiV'!==_0xb9b8ba(0x74f)?(this[_0xb9b8ba(0x394)]+=this[_0xb9b8ba(0x498)](),this['isOpen']()&&(this['_opening']=![])):this[_0xb9b8ba(0x63c)]());},Window_Base[_0x5443f5(0x353)][_0x5443f5(0x333)]=function(){const _0x278ef2=_0x5443f5;this[_0x278ef2(0x712)]&&(this['openness']-=this[_0x278ef2(0x498)](),this[_0x278ef2(0x623)]()&&(_0x278ef2(0x600)===_0x278ef2(0x600)?this[_0x278ef2(0x712)]=![]:_0x74849b=_0x3f489b[_0x278ef2(0x9a2)](_0x3df18b)));},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x8b3)]=Window_Base['prototype'][_0x5443f5(0x972)],Window_Base[_0x5443f5(0x353)]['drawText']=function(_0x475cd7,_0x3c0cae,_0x35362b,_0x2ecda0,_0x245810){const _0x27a6bb=_0x5443f5;if(this[_0x27a6bb(0x6a0)]())_0x475cd7=VisuMZ['GroupDigits'](_0x475cd7);VisuMZ[_0x27a6bb(0x425)][_0x27a6bb(0x8b3)][_0x27a6bb(0x91b)](this,_0x475cd7,_0x3c0cae,_0x35362b,_0x2ecda0,_0x245810);},Window_Base[_0x5443f5(0x353)]['useDigitGrouping']=function(){const _0x15e268=_0x5443f5;return this[_0x15e268(0x4e1)];},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x7b3)]=Window_Base['prototype'][_0x5443f5(0x497)],Window_Base[_0x5443f5(0x353)][_0x5443f5(0x497)]=function(_0x14fd8c,_0x3f6bc7,_0x3e79d8,_0x317e82){const _0x9b089d=_0x5443f5;var _0x10cb8f=VisuMZ['CoreEngine'][_0x9b089d(0x7b3)][_0x9b089d(0x91b)](this,_0x14fd8c,_0x3f6bc7,_0x3e79d8,_0x317e82);if(this['useDigitGroupingEx']())_0x10cb8f[_0x9b089d(0x2c3)]=VisuMZ['GroupDigits'](_0x10cb8f[_0x9b089d(0x2c3)]);return _0x10cb8f;},Window_Base[_0x5443f5(0x353)]['useDigitGroupingEx']=function(){return this['_digitGroupingEx'];},Window_Base['prototype'][_0x5443f5(0x37b)]=function(_0xf42639){const _0x42a8ac=_0x5443f5;this[_0x42a8ac(0x4e1)]=_0xf42639;},Window_Base['prototype'][_0x5443f5(0x968)]=function(_0x536915){const _0x4adfee=_0x5443f5;this[_0x4adfee(0x489)]=_0x536915;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x1bf)]=Window_Base['prototype'][_0x5443f5(0x605)],Window_Base[_0x5443f5(0x353)][_0x5443f5(0x605)]=function(_0x506c44,_0x145d2d,_0x13da2f){const _0x21baf6=_0x5443f5;_0x145d2d=Math['round'](_0x145d2d),_0x13da2f=Math[_0x21baf6(0x558)](_0x13da2f),VisuMZ[_0x21baf6(0x425)]['Window_Base_drawIcon'][_0x21baf6(0x91b)](this,_0x506c44,_0x145d2d,_0x13da2f);},VisuMZ['CoreEngine'][_0x5443f5(0x55b)]=Window_Base[_0x5443f5(0x353)][_0x5443f5(0x65e)],Window_Base[_0x5443f5(0x353)]['drawFace']=function(_0x17fbdb,_0x1c70ef,_0x54a8cc,_0x44fbb0,_0x1da00e,_0x1e36c8){const _0x30096e=_0x5443f5;_0x1da00e=_0x1da00e||ImageManager[_0x30096e(0x566)],_0x1e36c8=_0x1e36c8||ImageManager[_0x30096e(0x229)],_0x54a8cc=Math[_0x30096e(0x558)](_0x54a8cc),_0x44fbb0=Math['round'](_0x44fbb0),_0x1da00e=Math['round'](_0x1da00e),_0x1e36c8=Math[_0x30096e(0x558)](_0x1e36c8),VisuMZ['CoreEngine'][_0x30096e(0x55b)][_0x30096e(0x91b)](this,_0x17fbdb,_0x1c70ef,_0x54a8cc,_0x44fbb0,_0x1da00e,_0x1e36c8);},VisuMZ[_0x5443f5(0x425)]['Window_Base_drawCharacter']=Window_Base[_0x5443f5(0x353)][_0x5443f5(0x8c8)],Window_Base[_0x5443f5(0x353)][_0x5443f5(0x8c8)]=function(_0x13c690,_0x2a0601,_0x22a82d,_0x43fe8d){const _0x39f968=_0x5443f5;_0x22a82d=Math[_0x39f968(0x558)](_0x22a82d),_0x43fe8d=Math[_0x39f968(0x558)](_0x43fe8d),VisuMZ[_0x39f968(0x425)][_0x39f968(0x1a0)][_0x39f968(0x91b)](this,_0x13c690,_0x2a0601,_0x22a82d,_0x43fe8d);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x3e4)]=Window_Selectable['prototype'][_0x5443f5(0x3b2)],Window_Selectable[_0x5443f5(0x353)]['itemRect']=function(_0xf6b623){const _0x14a179=_0x5443f5;let _0x37fdf3=VisuMZ['CoreEngine'][_0x14a179(0x3e4)][_0x14a179(0x91b)](this,_0xf6b623);return _0x37fdf3['x']=Math[_0x14a179(0x558)](_0x37fdf3['x']),_0x37fdf3['y']=Math['round'](_0x37fdf3['y']),_0x37fdf3[_0x14a179(0x786)]=Math[_0x14a179(0x558)](_0x37fdf3[_0x14a179(0x786)]),_0x37fdf3[_0x14a179(0x99b)]=Math[_0x14a179(0x558)](_0x37fdf3[_0x14a179(0x99b)]),_0x37fdf3;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x587)]=Window_StatusBase[_0x5443f5(0x353)][_0x5443f5(0x616)],Window_StatusBase['prototype'][_0x5443f5(0x616)]=function(_0x2291da,_0x14f9eb,_0x5e8957){const _0x520a20=_0x5443f5;_0x14f9eb=Math[_0x520a20(0x558)](_0x14f9eb),_0x5e8957=Math[_0x520a20(0x558)](_0x5e8957),VisuMZ['CoreEngine']['Window_StatusBase_drawActorSimpleStatus']['call'](this,_0x2291da,_0x14f9eb,_0x5e8957);},Window_Base[_0x5443f5(0x353)][_0x5443f5(0x5fa)]=function(){const _0x4ba054=_0x5443f5;this[_0x4ba054(0x3b8)]={'duration':0x0,'wholeDuration':0x0,'type':_0x4ba054(0x697),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x4ba054(0x3f2)]['x'],'targetScaleY':this[_0x4ba054(0x3f2)]['y'],'targetOpacity':this['opacity'],'targetBackOpacity':this['backOpacity'],'targetContentsOpacity':this['contentsOpacity']};},Window_Base['prototype'][_0x5443f5(0x348)]=function(){const _0x1ce89a=_0x5443f5;if(!this[_0x1ce89a(0x3b8)])return;if(this['_coreEasing'][_0x1ce89a(0x1dd)]<=0x0)return;this['x']=this[_0x1ce89a(0x84e)](this['x'],this[_0x1ce89a(0x3b8)]['targetX']),this['y']=this['applyCoreEasing'](this['y'],this[_0x1ce89a(0x3b8)][_0x1ce89a(0x226)]),this[_0x1ce89a(0x3f2)]['x']=this[_0x1ce89a(0x84e)](this[_0x1ce89a(0x3f2)]['x'],this[_0x1ce89a(0x3b8)][_0x1ce89a(0x8b9)]),this[_0x1ce89a(0x3f2)]['y']=this[_0x1ce89a(0x84e)](this[_0x1ce89a(0x3f2)]['y'],this[_0x1ce89a(0x3b8)][_0x1ce89a(0x6f1)]),this[_0x1ce89a(0x8e5)]=this[_0x1ce89a(0x84e)](this[_0x1ce89a(0x8e5)],this[_0x1ce89a(0x3b8)][_0x1ce89a(0x208)]),this[_0x1ce89a(0x7e5)]=this['applyCoreEasing'](this[_0x1ce89a(0x7e5)],this[_0x1ce89a(0x3b8)]['targetBackOpacity']),this['contentsOpacity']=this[_0x1ce89a(0x84e)](this['contentsOpacity'],this[_0x1ce89a(0x3b8)]['targetContentsOpacity']),this[_0x1ce89a(0x3b8)]['duration']--;},Window_Base[_0x5443f5(0x353)][_0x5443f5(0x84e)]=function(_0x44441f,_0x41f0f3){const _0x8e5ae=_0x5443f5;if(!this[_0x8e5ae(0x3b8)])return _0x41f0f3;const _0x5263af=this[_0x8e5ae(0x3b8)]['duration'],_0x27a32c=this[_0x8e5ae(0x3b8)]['wholeDuration'],_0x1a0e6a=this[_0x8e5ae(0x84d)]((_0x27a32c-_0x5263af)/_0x27a32c),_0x3fbf7d=this[_0x8e5ae(0x84d)]((_0x27a32c-_0x5263af+0x1)/_0x27a32c),_0x529fc5=(_0x44441f-_0x41f0f3*_0x1a0e6a)/(0x1-_0x1a0e6a);return _0x529fc5+(_0x41f0f3-_0x529fc5)*_0x3fbf7d;},Window_Base[_0x5443f5(0x353)][_0x5443f5(0x84d)]=function(_0x3c102f){const _0x1d7af6=_0x5443f5;if(!this[_0x1d7af6(0x3b8)])return _0x3c102f;return VisuMZ['ApplyEasing'](_0x3c102f,this[_0x1d7af6(0x3b8)][_0x1d7af6(0x119)]||'LINEAR');},Window_Base['prototype'][_0x5443f5(0x186)]=function(_0x9f3501,_0x4cb776){const _0xbf613f=_0x5443f5;if(!this['_coreEasing'])return;this['x']=this['_coreEasing'][_0xbf613f(0x352)],this['y']=this['_coreEasing'][_0xbf613f(0x226)],this['scale']['x']=this['_coreEasing'][_0xbf613f(0x8b9)],this['scale']['y']=this[_0xbf613f(0x3b8)][_0xbf613f(0x6f1)],this['opacity']=this['_coreEasing'][_0xbf613f(0x208)],this['backOpacity']=this[_0xbf613f(0x3b8)][_0xbf613f(0x252)],this['contentsOpacity']=this['_coreEasing'][_0xbf613f(0x4f7)],this[_0xbf613f(0x6fa)](_0x9f3501,_0x4cb776,this['x'],this['y'],this['scale']['x'],this[_0xbf613f(0x3f2)]['y'],this[_0xbf613f(0x8e5)],this[_0xbf613f(0x7e5)],this[_0xbf613f(0x122)]);},Window_Base['prototype'][_0x5443f5(0x6fa)]=function(_0x2b8ec6,_0xbf8849,_0x5cc4fd,_0x528add,_0x742e0e,_0x4b3f7f,_0x54b79a,_0x44b3f2,_0x35ba0f){const _0x10db7e=_0x5443f5;this[_0x10db7e(0x3b8)]={'duration':_0x2b8ec6,'wholeDuration':_0x2b8ec6,'type':_0xbf8849,'targetX':_0x5cc4fd,'targetY':_0x528add,'targetScaleX':_0x742e0e,'targetScaleY':_0x4b3f7f,'targetOpacity':_0x54b79a,'targetBackOpacity':_0x44b3f2,'targetContentsOpacity':_0x35ba0f};},Window_Base[_0x5443f5(0x353)][_0x5443f5(0x893)]=function(_0x468dcf,_0x1e6004,_0x5a433,_0x2c17f9,_0x5d38a4){const _0x38c0d3=_0x5443f5;this[_0x38c0d3(0x576)](),this[_0x38c0d3(0x9b6)]['fontSize']=VisuMZ[_0x38c0d3(0x425)][_0x38c0d3(0x446)]['Gold'][_0x38c0d3(0x571)];const _0x3526b0=VisuMZ['CoreEngine'][_0x38c0d3(0x446)][_0x38c0d3(0x90e)][_0x38c0d3(0x192)];if(_0x3526b0>0x0&&_0x1e6004===TextManager['currencyUnit']){const _0x1d3ddd=_0x2c17f9+(this[_0x38c0d3(0x1eb)]()-ImageManager[_0x38c0d3(0x614)])/0x2;this[_0x38c0d3(0x605)](_0x3526b0,_0x5a433+(_0x5d38a4-ImageManager['iconWidth']),_0x1d3ddd),_0x5d38a4-=ImageManager[_0x38c0d3(0x2bf)]+0x4;}else this[_0x38c0d3(0x3de)](ColorManager[_0x38c0d3(0x68c)]()),this['drawText'](_0x1e6004,_0x5a433,_0x2c17f9,_0x5d38a4,_0x38c0d3(0x66d)),_0x5d38a4-=this['textWidth'](_0x1e6004)+0x6;this['resetTextColor']();const _0x5828ae=this[_0x38c0d3(0x45b)](this[_0x38c0d3(0x4e1)]?VisuMZ[_0x38c0d3(0x9a2)](_0x468dcf):_0x468dcf);if(_0x5828ae>_0x5d38a4)_0x38c0d3(0x633)===_0x38c0d3(0x633)?this[_0x38c0d3(0x972)](VisuMZ[_0x38c0d3(0x425)][_0x38c0d3(0x446)][_0x38c0d3(0x90e)][_0x38c0d3(0x5c8)],_0x5a433,_0x2c17f9,_0x5d38a4,'right'):(_0x28fc48[_0x38c0d3(0x425)][_0x38c0d3(0x55a)]['call'](this,_0x5bdac2,_0x351e8e,_0x5d54b6,_0x44e7c9,_0x47b4a8,_0x23d77f,_0x3f1ba4,_0x2ecf0a,_0x2dba3c),this[_0x38c0d3(0x6b9)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x2dce4c]||{'x':0x0,'y':0x0}));else{if(_0x38c0d3(0x145)!==_0x38c0d3(0x145)){const _0x1805a7=_0x3cf7e6[_0x38c0d3(0x334)]||0x0;(_0x1805a7<0x0||_0x1805a7>0x64||_0x53b04c[_0x38c0d3(0x120)]()||_0x46093e['isTriggered'](_0x38c0d3(0x1d5)))&&(_0xe301c0[_0x38c0d3(0x334)]=_0x1b4073,_0x5b916a[_0x38c0d3(0x63c)](),_0x1af465[_0x38c0d3(0x63c)]());const _0x127706=_0x5e1929['picture'](_0x1805a7);return _0x127706&&(_0x127706['_x']=_0x575094['_x'],_0x127706['_y']=_0x28e6f4['_y']),_0x3b1489[_0x38c0d3(0x425)][_0x38c0d3(0x387)](),_0x147ace[_0x38c0d3(0x334)]!==_0x326bb4;}else this[_0x38c0d3(0x972)](_0x468dcf,_0x5a433,_0x2c17f9,_0x5d38a4,'right');}this['resetFontSettings']();},Window_Base[_0x5443f5(0x353)][_0x5443f5(0x581)]=function(_0x451520,_0x17d173,_0x532959,_0x13e29d,_0x583188){const _0x455b33=_0x5443f5,_0x574585=ImageManager[_0x455b33(0x589)](_0x455b33(0x3b6)),_0x5647fa=ImageManager[_0x455b33(0x2bf)],_0x3dfd2c=ImageManager[_0x455b33(0x614)],_0x2a5098=_0x451520%0x10*_0x5647fa,_0x251c85=Math['floor'](_0x451520/0x10)*_0x3dfd2c,_0x36b0bd=_0x13e29d,_0x27d8a1=_0x13e29d;this[_0x455b33(0x9b6)]['_context'][_0x455b33(0x892)]=_0x583188,this[_0x455b33(0x9b6)][_0x455b33(0x409)](_0x574585,_0x2a5098,_0x251c85,_0x5647fa,_0x3dfd2c,_0x17d173,_0x532959,_0x36b0bd,_0x27d8a1),this[_0x455b33(0x9b6)][_0x455b33(0x567)][_0x455b33(0x892)]=!![];},Window_Base[_0x5443f5(0x353)][_0x5443f5(0x2f4)]=function(_0x1c9a06,_0x442263,_0x406825,_0x5ac8c5,_0x154c1d,_0x43863f){const _0xea435d=_0x5443f5,_0x16b5e3=Math[_0xea435d(0x3fa)]((_0x406825-0x2)*_0x5ac8c5),_0x2383d3=Sprite_Gauge[_0xea435d(0x353)][_0xea435d(0x878)][_0xea435d(0x91b)](this),_0x3505c2=_0x442263+this[_0xea435d(0x1eb)]()-_0x2383d3-0x2;this[_0xea435d(0x9b6)][_0xea435d(0x1e1)](_0x1c9a06,_0x3505c2,_0x406825,_0x2383d3,ColorManager[_0xea435d(0x31a)]()),this[_0xea435d(0x9b6)]['gradientFillRect'](_0x1c9a06+0x1,_0x3505c2+0x1,_0x16b5e3,_0x2383d3-0x2,_0x154c1d,_0x43863f);},Window_Scrollable['SCROLLBAR']={'enabled':VisuMZ[_0x5443f5(0x425)]['Settings'][_0x5443f5(0x9ad)][_0x5443f5(0x5ae)]??!![],'thickness':VisuMZ[_0x5443f5(0x425)]['Settings'][_0x5443f5(0x9ad)][_0x5443f5(0x460)]??0x2,'offset':VisuMZ['CoreEngine'][_0x5443f5(0x446)]['Window']['BarOffset']??0x2,'bodyColor':VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x446)][_0x5443f5(0x9ad)][_0x5443f5(0x537)]??0x0,'offColor':VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x446)][_0x5443f5(0x9ad)]['OffBarColor']??0x7,'offOpacity':VisuMZ['CoreEngine'][_0x5443f5(0x446)]['Window']['OffBarOpacity']??0x80},Window_Base[_0x5443f5(0x353)][_0x5443f5(0x22c)]=function(){const _0x89ad47=_0x5443f5;return Window_Scrollable[_0x89ad47(0x1ec)][_0x89ad47(0x15b)]&&Window_Scrollable[_0x89ad47(0x1ec)]['thickness']>0x0;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x486)]=Window_Base[_0x5443f5(0x353)][_0x5443f5(0x1b2)],Window_Base[_0x5443f5(0x353)]['createContents']=function(){const _0x4ebbb2=_0x5443f5;VisuMZ[_0x4ebbb2(0x425)][_0x4ebbb2(0x486)][_0x4ebbb2(0x91b)](this),this['createScrollBarSprites'](),this[_0x4ebbb2(0x2df)](!![]),this[_0x4ebbb2(0x2df)](![]);},Window_Base['prototype'][_0x5443f5(0x959)]=function(){const _0x1702f7=_0x5443f5;if(!this[_0x1702f7(0x22c)]())return;if(this[_0x1702f7(0x9c5)]||this[_0x1702f7(0x230)])return;this['_lastScrollBarValues']={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x1702f7(0x9c5)]=new Sprite(),this['_scrollBarVert']=new Sprite(),this[_0x1702f7(0x83f)](this['_scrollBarHorz']),this[_0x1702f7(0x83f)](this[_0x1702f7(0x230)]);},Window_Base[_0x5443f5(0x353)][_0x5443f5(0x2df)]=function(_0x16aecc){const _0x9eb766=_0x5443f5,_0x209f31=_0x16aecc?this['_scrollBarHorz']:this['_scrollBarVert'];if(!_0x209f31)return;const _0x57c9db=Window_Scrollable[_0x9eb766(0x1ec)],_0x5df278=_0x57c9db[_0x9eb766(0x10c)],_0x913e5b=_0x16aecc?this[_0x9eb766(0x98d)]-_0x5df278*0x2:_0x5df278,_0x672a00=_0x16aecc?_0x5df278:this[_0x9eb766(0x547)]-_0x5df278*0x2;_0x209f31[_0x9eb766(0x55f)]=new Bitmap(_0x913e5b,_0x672a00),_0x209f31[_0x9eb766(0x621)](0x0,0x0,_0x913e5b,_0x672a00),this[_0x9eb766(0x914)](_0x16aecc);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x815)]=Window_Base['prototype'][_0x5443f5(0x806)],Window_Base[_0x5443f5(0x353)]['destroyContents']=function(){const _0x9eefd1=_0x5443f5;VisuMZ['CoreEngine'][_0x9eefd1(0x815)][_0x9eefd1(0x91b)](this),this[_0x9eefd1(0x179)]();},Window_Base[_0x5443f5(0x353)][_0x5443f5(0x179)]=function(){const _0x4ef101=_0x5443f5,_0x4d8860=[this['_scrollBarHorz'],this['_scrollBarVert']];for(const _0x164c9a of _0x4d8860){if(_0x164c9a&&_0x164c9a[_0x4ef101(0x55f)])_0x164c9a[_0x4ef101(0x55f)]['destroy']();}},VisuMZ['CoreEngine'][_0x5443f5(0x35e)]=Window_Scrollable[_0x5443f5(0x353)][_0x5443f5(0x5f3)],Window_Scrollable[_0x5443f5(0x353)][_0x5443f5(0x5f3)]=function(){const _0x22307f=_0x5443f5;VisuMZ[_0x22307f(0x425)]['Window_Scrollable_update']['call'](this),this['updateScrollBars']();},Window_Scrollable[_0x5443f5(0x353)]['updateScrollBars']=function(){const _0x30402a=_0x5443f5;this['updateScrollBarVisibility'](),this[_0x30402a(0x17b)](!![]),this[_0x30402a(0x17b)](![]),this[_0x30402a(0x914)](!![]),this[_0x30402a(0x914)](![]);},Window_Scrollable[_0x5443f5(0x353)][_0x5443f5(0x15d)]=function(){const _0xf4a4d8=_0x5443f5,_0x3a9fcd=[this['_scrollBarHorz'],this[_0xf4a4d8(0x230)]];for(const _0x4d4e6d of _0x3a9fcd){_0x4d4e6d&&(_0x4d4e6d[_0xf4a4d8(0x5ba)]=this[_0xf4a4d8(0x22c)]()&&this[_0xf4a4d8(0x85d)]());}},Window_Scrollable[_0x5443f5(0x353)][_0x5443f5(0x17b)]=function(_0x17c00e){const _0x2ac820=_0x5443f5;if(!this['_lastScrollBarValues'])return;const _0x803914=this[_0x2ac820(0x857)](_0x17c00e),_0x174db8=this[_0x2ac820(0x2f0)](_0x17c00e),_0x1cbb20=_0x17c00e?_0x2ac820(0x269):_0x2ac820(0x969),_0x5d938c=_0x17c00e?_0x2ac820(0x4e5):'maxVert';(this[_0x2ac820(0x6c7)][_0x1cbb20]!==_0x803914||this[_0x2ac820(0x6c7)][_0x5d938c]!==_0x174db8)&&(_0x2ac820(0x108)===_0x2ac820(0x108)?(this['_lastScrollBarValues'][_0x1cbb20]=_0x803914,this[_0x2ac820(0x6c7)][_0x5d938c]=_0x174db8,this[_0x2ac820(0x81a)](_0x17c00e,_0x803914,_0x174db8)):this[_0x2ac820(0x239)]());},Window_Scrollable[_0x5443f5(0x353)][_0x5443f5(0x857)]=function(_0x53e1be){const _0x48aee1=_0x5443f5;if(this[_0x48aee1(0x6a9)]!==undefined){if(_0x48aee1(0x1c5)!=='UPqfw')return _0x53e1be?this[_0x48aee1(0x9da)]():this[_0x48aee1(0x75f)]['y'];else _0x100efd['CoreEngine'][_0x48aee1(0x842)][_0x48aee1(0x91b)](this),this[_0x48aee1(0x414)]();}return _0x53e1be?this['scrollX']():this[_0x48aee1(0x5b8)]();},Window_Scrollable[_0x5443f5(0x353)][_0x5443f5(0x2f0)]=function(_0x57a93c){const _0x466b37=_0x5443f5;if(this[_0x466b37(0x6a9)]!==undefined){if(_0x466b37(0x2e4)===_0x466b37(0x989))_0x2d4068[_0x466b37(0x425)]['Window_Selectable_processTouch'][_0x466b37(0x91b)](this);else return _0x57a93c?this[_0x466b37(0x68f)]():Math['max'](0x0,this[_0x466b37(0x6a9)]-this[_0x466b37(0x547)]);}return _0x57a93c?this['maxScrollX']():this[_0x466b37(0x205)]();},Window_Scrollable['prototype'][_0x5443f5(0x7a5)]=function(){const _0x2cda45=_0x5443f5;if(this[_0x2cda45(0x6a9)]!==undefined)return Math[_0x2cda45(0x8d5)](0x0,this[_0x2cda45(0x6a9)]);return this[_0x2cda45(0x5fc)]();},Window_Scrollable[_0x5443f5(0x353)][_0x5443f5(0x81a)]=function(_0x40cc31,_0x293f8c,_0x261ffc){const _0x365220=_0x5443f5,_0x11068e=_0x40cc31?this[_0x365220(0x9c5)]:this['_scrollBarVert'];if(!_0x11068e)return;if(!_0x11068e[_0x365220(0x55f)])return;const _0x143950=_0x11068e['bitmap'];_0x143950[_0x365220(0x63c)]();if(_0x261ffc<=0x0)return;const _0x550af8=_0x40cc31?this[_0x365220(0x98d)]/this[_0x365220(0x8e3)]():this[_0x365220(0x547)]/this[_0x365220(0x7a5)](),_0x1f8fa6=_0x40cc31?Math[_0x365220(0x558)](_0x293f8c*_0x550af8):0x0,_0x2c1faf=_0x40cc31?0x0:Math[_0x365220(0x558)](_0x293f8c*_0x550af8),_0x295bbe=_0x40cc31?Math[_0x365220(0x558)](_0x143950[_0x365220(0x786)]*_0x550af8):_0x143950['width'],_0x4c0e13=_0x40cc31?_0x143950[_0x365220(0x99b)]:Math[_0x365220(0x558)](_0x143950['height']*_0x550af8),_0x2d8cbd=Window_Scrollable[_0x365220(0x1ec)],_0x55c0b8=ColorManager['getColor'](_0x2d8cbd[_0x365220(0x62a)]),_0x1789a4=ColorManager[_0x365220(0xeb)](_0x2d8cbd['bodyColor']),_0x3e6f6c=_0x2d8cbd['offOpacity'];_0x143950[_0x365220(0x11f)]=_0x3e6f6c,_0x143950[_0x365220(0x8d3)](_0x55c0b8),_0x143950[_0x365220(0x11f)]=0xff,_0x143950[_0x365220(0x1e1)](_0x1f8fa6,_0x2c1faf,_0x295bbe,_0x4c0e13,_0x1789a4);},Window_Base[_0x5443f5(0x353)]['updateScrollBarPosition']=function(_0x1b1cac){const _0x3435a8=_0x5443f5,_0x5cfc05=_0x1b1cac?this[_0x3435a8(0x9c5)]:this['_scrollBarVert'];if(!_0x5cfc05)return;const _0x33becd=Window_Scrollable[_0x3435a8(0x1ec)],_0x51afcc=_0x33becd['thickness'],_0x2deaa6=_0x33becd['offset'];if(!_0x5cfc05['transform'])return;_0x5cfc05['x']=this['padding']+(_0x1b1cac?_0x51afcc:this['innerWidth']+_0x2deaa6),_0x5cfc05['y']=this[_0x3435a8(0x25a)]+(_0x1b1cac?this[_0x3435a8(0x547)]+_0x2deaa6:_0x51afcc);},Window_Selectable['prototype'][_0x5443f5(0x459)]=function(_0x8476a7){const _0x1f2e6b=_0x5443f5;let _0x414948=this[_0x1f2e6b(0x261)]();const _0x56dc1e=this[_0x1f2e6b(0x67a)](),_0x597076=this[_0x1f2e6b(0x2bb)]();if(this['isUseModernControls']()&&(_0x414948<_0x56dc1e||_0x8476a7&&_0x597076===0x1)){if(_0x1f2e6b(0x6d1)==='BLUbk')_0x2f3cd7['volume']=_0x55bf53,_0x2cecb7[_0x1f2e6b(0x982)]=_0x54801f[_0x1f2e6b(0x1f4)]['seek'](),_0x56be14[_0x1f2e6b(0x1a8)](_0x2e3072),_0x67a263[_0x1f2e6b(0x877)](_0x1deef0,_0x4c6f99[_0x1f2e6b(0x982)]),_0x5e0502[_0x1f2e6b(0x1f4)][_0x1f2e6b(0x4d0)](_0x21e151['pos']);else{_0x414948+=_0x597076;if(_0x414948>=_0x56dc1e)_0x414948=_0x56dc1e-0x1;this['smoothSelect'](_0x414948);}}else!this['isUseModernControls']()&&((_0x414948<_0x56dc1e-_0x597076||_0x8476a7&&_0x597076===0x1)&&this[_0x1f2e6b(0x8c0)]((_0x414948+_0x597076)%_0x56dc1e));},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x9f0)]=Window_Selectable[_0x5443f5(0x353)][_0x5443f5(0x459)],Window_Selectable[_0x5443f5(0x353)][_0x5443f5(0x459)]=function(_0x5643f0){const _0x5afb3c=_0x5443f5;this['isUseModernControls']()&&_0x5643f0&&this[_0x5afb3c(0x2bb)]()===0x1&&this[_0x5afb3c(0x261)]()===this[_0x5afb3c(0x67a)]()-0x1?_0x5afb3c(0x967)!=='ittDw'?this[_0x5afb3c(0x8c0)](0x0):this[_0x5afb3c(0x682)](_0x1fa600):VisuMZ[_0x5afb3c(0x425)][_0x5afb3c(0x9f0)][_0x5afb3c(0x91b)](this,_0x5643f0);},Window_Selectable[_0x5443f5(0x353)][_0x5443f5(0x76a)]=function(_0x39440a){const _0x1071f4=_0x5443f5;let _0x58cc18=Math['max'](0x0,this[_0x1071f4(0x261)]());const _0x3a926f=this[_0x1071f4(0x67a)](),_0x10288f=this['maxCols']();if(this[_0x1071f4(0x30a)]()&&_0x58cc18>0x0||_0x39440a&&_0x10288f===0x1){_0x58cc18-=_0x10288f;if(_0x58cc18<=0x0)_0x58cc18=0x0;this['smoothSelect'](_0x58cc18);}else{if(!this['isUseModernControls']()){if(_0x1071f4(0x3c8)===_0x1071f4(0x3c8))(_0x58cc18>=_0x10288f||_0x39440a&&_0x10288f===0x1)&&(_0x1071f4(0x16a)==='YtIWO'?this[_0x1071f4(0x8c0)]((_0x58cc18-_0x10288f+_0x3a926f)%_0x3a926f):this[_0x1071f4(0x37a)](_0x1071f4(0x56f)));else return _0x7c2596[_0x1071f4(0x70b)]()===0x1;}}},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x427)]=Window_Selectable[_0x5443f5(0x353)][_0x5443f5(0x76a)],Window_Selectable[_0x5443f5(0x353)][_0x5443f5(0x76a)]=function(_0x5d9310){const _0xd4839b=_0x5443f5;this[_0xd4839b(0x30a)]()&&_0x5d9310&&this['maxCols']()===0x1&&this['index']()===0x0?this['smoothSelect'](this['maxItems']()-0x1):VisuMZ['CoreEngine'][_0xd4839b(0x427)][_0xd4839b(0x91b)](this,_0x5d9310);},Window_Selectable['prototype']['isUseModernControls']=function(){const _0xf27962=_0x5443f5;return VisuMZ[_0xf27962(0x425)][_0xf27962(0x446)]['QoL'][_0xf27962(0x523)];},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x506)]=Window_Selectable['prototype'][_0x5443f5(0x6a1)],Window_Selectable[_0x5443f5(0x353)][_0x5443f5(0x6a1)]=function(){const _0x1123ce=_0x5443f5;if(this['isUseModernControls']())this[_0x1123ce(0x8fa)](),this[_0x1123ce(0x3e2)]();else{if(_0x1123ce(0x901)!=='OqNLV')VisuMZ[_0x1123ce(0x425)][_0x1123ce(0x506)][_0x1123ce(0x91b)](this);else return _0x4821d8[_0x1123ce(0x6aa)][_0x1123ce(0x9a3)][_0x1123ce(0x91b)](this);}},Window_Selectable[_0x5443f5(0x353)][_0x5443f5(0x7c1)]=function(){return!![];},Window_Selectable['prototype'][_0x5443f5(0x8fa)]=function(){const _0x30ec72=_0x5443f5;if(this[_0x30ec72(0x314)]()){if('QmtHN'===_0x30ec72(0x632))return this['buttonAssistWindowSideRect']();else{const _0x1f9774=this[_0x30ec72(0x261)]();if(Input[_0x30ec72(0x156)](_0x30ec72(0x86f))){if(Input['isPressed']('shift')&&this[_0x30ec72(0x7c1)]())this[_0x30ec72(0x127)]();else{if(_0x30ec72(0x25b)==='YtIUz')return _0x4ea31c(_0x2b70c9['$1']);else this['cursorDown'](Input['isTriggered'](_0x30ec72(0x86f)));}}Input['isRepeated']('up')&&(Input[_0x30ec72(0x801)]('shift')&&this[_0x30ec72(0x7c1)]()?this[_0x30ec72(0x239)]():this[_0x30ec72(0x76a)](Input[_0x30ec72(0x732)]('up')));Input[_0x30ec72(0x156)](_0x30ec72(0x66d))&&this['cursorRight'](Input['isTriggered'](_0x30ec72(0x66d)));if(Input['isRepeated']('left')){if(_0x30ec72(0x159)===_0x30ec72(0x159))this[_0x30ec72(0x693)](Input[_0x30ec72(0x732)]('left'));else{const _0x36a54e=this[_0x30ec72(0x744)](),_0x39620c=this['bitmapWidth'](),_0xaef751=this[_0x30ec72(0x80c)]();this['setupFont'](),this['bitmap'][_0x30ec72(0x63c)](),this['bitmap'][_0x30ec72(0x939)](_0x36a54e,0x4,0x0,_0x39620c-0xa,_0xaef751,_0x30ec72(0x824));}}!this[_0x30ec72(0x94c)](_0x30ec72(0x874))&&Input[_0x30ec72(0x156)](_0x30ec72(0x874))&&this[_0x30ec72(0x127)](),!this[_0x30ec72(0x94c)](_0x30ec72(0x560))&&Input[_0x30ec72(0x156)]('pageup')&&this[_0x30ec72(0x239)](),this[_0x30ec72(0x261)]()!==_0x1f9774&&this['playCursorSound']();}}},Window_Selectable[_0x5443f5(0x353)][_0x5443f5(0x3e2)]=function(){const _0x2e9e45=_0x5443f5;if(this[_0x2e9e45(0x314)]()){if(_0x2e9e45(0x15e)===_0x2e9e45(0x15e)){const _0x364594=this[_0x2e9e45(0x261)]();if(Input[_0x2e9e45(0x732)](_0x2e9e45(0x8e1))){if(_0x2e9e45(0x9c0)!==_0x2e9e45(0x9c0))return this['_tilemap']||this;else this['smoothSelect'](Math[_0x2e9e45(0x2cf)](this[_0x2e9e45(0x261)](),0x0));}if(Input[_0x2e9e45(0x732)](_0x2e9e45(0x1df))){if('iBrxs'===_0x2e9e45(0x2e2))this[_0x2e9e45(0x8c0)](Math[_0x2e9e45(0x8d5)](this['index'](),this['maxItems']()-0x1));else{if(_0x14b0ca[_0x2e9e45(0x59b)]())return;_0x2bf983[_0x2e9e45(0x53d)](_0x3ff03c,_0x40359a);const _0x507595=['bgm',_0x2e9e45(0x38f),'me','se'];for(const _0x59f75f of _0x507595){const _0x558962=_0x4ca4a7[_0x59f75f],_0x4a6b84=_0x2e9e45(0x784)[_0x2e9e45(0x2d3)](_0x59f75f);for(const _0x28b100 of _0x558962){_0x5d13c1['createBuffer'](_0x4a6b84,_0x28b100);}}}}this['index']()!==_0x364594&&this[_0x2e9e45(0x835)]();}else{if(!this[_0x2e9e45(0x3ef)]);const _0x5146b5=this['_animation'][_0x2e9e45(0x744)]||'';_0x5146b5['match'](/<RATE:[ ](\d+)>/i)&&(this[_0x2e9e45(0x80d)]=(_0x27ea58(_0x395d73['$1'])||0x1)[_0x2e9e45(0x19c)](0x1,0xa));}}},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x398)]=Window_Selectable[_0x5443f5(0x353)][_0x5443f5(0x4ed)],Window_Selectable[_0x5443f5(0x353)][_0x5443f5(0x4ed)]=function(){const _0x46d0fb=_0x5443f5;if(this[_0x46d0fb(0x30a)]())this[_0x46d0fb(0x116)]();else{if('NvCnc'===_0x46d0fb(0x92d)){_0x1f5175[_0x46d0fb(0x425)][_0x46d0fb(0x573)][_0x46d0fb(0x91b)](this);if(!_0x318f6f[_0x46d0fb(0x4d2)])return;const _0x291003=this[_0x46d0fb(0x881)];if(!_0x291003)return;this[_0x46d0fb(0x7b8)]=_0x291003[_0x46d0fb(0x7b8)];if(!this['_pictureContainer'])return;this[_0x46d0fb(0x83f)](this[_0x46d0fb(0x7b8)]);}else VisuMZ[_0x46d0fb(0x425)][_0x46d0fb(0x398)]['call'](this);}},Window_Selectable[_0x5443f5(0x353)]['processTouchModernControls']=function(){const _0x29b478=_0x5443f5;VisuMZ[_0x29b478(0x425)][_0x29b478(0x398)][_0x29b478(0x91b)](this);},Window_Selectable[_0x5443f5(0x353)][_0x5443f5(0x12d)]=function(){const _0x43c1f8=_0x5443f5;return VisuMZ[_0x43c1f8(0x425)][_0x43c1f8(0x446)][_0x43c1f8(0x9ad)][_0x43c1f8(0x592)];},Window_Selectable[_0x5443f5(0x353)][_0x5443f5(0x279)]=function(){const _0x559740=_0x5443f5;return VisuMZ['CoreEngine'][_0x559740(0x446)][_0x559740(0x9ad)][_0x559740(0xd5)];},Window_Selectable[_0x5443f5(0x353)][_0x5443f5(0x86c)]=function(){const _0x301d15=_0x5443f5;return Window_Scrollable[_0x301d15(0x353)][_0x301d15(0x86c)]['call'](this)+VisuMZ['CoreEngine'][_0x301d15(0x446)][_0x301d15(0x9ad)][_0x301d15(0x745)];;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x6a3)]=Window_Selectable[_0x5443f5(0x353)][_0x5443f5(0x5b9)],Window_Selectable[_0x5443f5(0x353)][_0x5443f5(0x5b9)]=function(_0xddff36){const _0x31f38b=_0x5443f5,_0x393c9e=VisuMZ[_0x31f38b(0x425)][_0x31f38b(0x446)][_0x31f38b(0x9ad)];if(_0x393c9e[_0x31f38b(0x3c3)]===![])return;_0x393c9e['DrawItemBackgroundJS']?_0x393c9e[_0x31f38b(0x673)][_0x31f38b(0x91b)](this,_0xddff36):VisuMZ[_0x31f38b(0x425)][_0x31f38b(0x6a3)]['call'](this,_0xddff36);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x831)]=Window_Gold[_0x5443f5(0x353)][_0x5443f5(0x61c)],Window_Gold[_0x5443f5(0x353)][_0x5443f5(0x61c)]=function(){const _0x2cc566=_0x5443f5;this[_0x2cc566(0x9d5)]()?this[_0x2cc566(0x3b5)]():VisuMZ[_0x2cc566(0x425)][_0x2cc566(0x831)][_0x2cc566(0x91b)](this);},Window_Gold[_0x5443f5(0x353)][_0x5443f5(0x9d5)]=function(){const _0x44c0ff=_0x5443f5;if(TextManager['currencyUnit']!==this[_0x44c0ff(0x6e7)]())return![];return VisuMZ[_0x44c0ff(0x425)][_0x44c0ff(0x446)]['Gold']['ItemStyle'];},Window_Gold[_0x5443f5(0x353)][_0x5443f5(0x3b5)]=function(){const _0x3a7328=_0x5443f5;this['resetFontSettings'](),this[_0x3a7328(0x9b6)]['clear'](),this[_0x3a7328(0x9b6)][_0x3a7328(0x702)]=VisuMZ['CoreEngine']['Settings'][_0x3a7328(0x90e)]['GoldFontSize'];const _0x5c31a1=VisuMZ[_0x3a7328(0x425)][_0x3a7328(0x446)]['Gold']['GoldIcon'],_0x4d511e=this[_0x3a7328(0x4e0)](0x0);if(_0x5c31a1>0x0){if(_0x3a7328(0x534)!==_0x3a7328(0x534))return _0x11c3fa[_0x3a7328(0x5a9)][_0x3a7328(0x91b)](this);else{const _0xe99cf5=_0x4d511e['y']+(this[_0x3a7328(0x1eb)]()-ImageManager[_0x3a7328(0x614)])/0x2;this[_0x3a7328(0x605)](_0x5c31a1,_0x4d511e['x'],_0xe99cf5);const _0x1718ad=ImageManager[_0x3a7328(0x2bf)]+0x4;_0x4d511e['x']+=_0x1718ad,_0x4d511e[_0x3a7328(0x786)]-=_0x1718ad;}}this['changeTextColor'](ColorManager[_0x3a7328(0x68c)]()),this[_0x3a7328(0x972)](this['currencyUnit'](),_0x4d511e['x'],_0x4d511e['y'],_0x4d511e[_0x3a7328(0x786)],_0x3a7328(0x824));const _0x5cef73=this['textWidth'](this['currencyUnit']())+0x6;;_0x4d511e['x']+=_0x5cef73,_0x4d511e[_0x3a7328(0x786)]-=_0x5cef73,this[_0x3a7328(0xdb)]();const _0x1c5f67=this[_0x3a7328(0x408)](),_0x627949=this[_0x3a7328(0x45b)](this[_0x3a7328(0x4e1)]?VisuMZ[_0x3a7328(0x9a2)](this['value']()):this['value']());_0x627949>_0x4d511e[_0x3a7328(0x786)]?this[_0x3a7328(0x972)](VisuMZ[_0x3a7328(0x425)][_0x3a7328(0x446)][_0x3a7328(0x90e)]['GoldOverlap'],_0x4d511e['x'],_0x4d511e['y'],_0x4d511e['width'],_0x3a7328(0x66d)):this['drawText'](this[_0x3a7328(0x408)](),_0x4d511e['x'],_0x4d511e['y'],_0x4d511e[_0x3a7328(0x786)],_0x3a7328(0x66d)),this[_0x3a7328(0x576)]();},Window_StatusBase[_0x5443f5(0x353)][_0x5443f5(0x76f)]=function(_0x120590,_0x410307,_0x1f4fc2,_0x4c52f9,_0x488079){const _0x43d38a=_0x5443f5;_0x4c52f9=String(_0x4c52f9||'')[_0x43d38a(0x1ca)]();if(VisuMZ['CoreEngine'][_0x43d38a(0x446)][_0x43d38a(0x36a)][_0x43d38a(0x3a6)]){if(_0x43d38a(0x811)===_0x43d38a(0x811)){const _0x467b8a=VisuMZ[_0x43d38a(0x8a0)](_0x4c52f9);_0x488079?(this[_0x43d38a(0x581)](_0x467b8a,_0x120590,_0x410307,this['gaugeLineHeight']()),_0x1f4fc2-=this[_0x43d38a(0x4c9)]()+0x2,_0x120590+=this[_0x43d38a(0x4c9)]()+0x2):(this['drawIcon'](_0x467b8a,_0x120590+0x2,_0x410307+0x2),_0x1f4fc2-=ImageManager[_0x43d38a(0x2bf)]+0x4,_0x120590+=ImageManager[_0x43d38a(0x2bf)]+0x4);}else return _0x43d38a(0x456);}const _0x167345=TextManager[_0x43d38a(0x1d2)](_0x4c52f9);this[_0x43d38a(0x576)](),this['changeTextColor'](ColorManager[_0x43d38a(0x68c)]()),_0x488079?(this[_0x43d38a(0x9b6)][_0x43d38a(0x702)]=this[_0x43d38a(0x804)](),this[_0x43d38a(0x9b6)][_0x43d38a(0x972)](_0x167345,_0x120590,_0x410307,_0x1f4fc2,this[_0x43d38a(0x4c9)](),_0x43d38a(0x824))):_0x43d38a(0x873)!==_0x43d38a(0x873)?this[_0x43d38a(0x5b7)][_0x43d38a(0x676)]=this[_0x43d38a(0x5b7)][_0x43d38a(0x734)]:this[_0x43d38a(0x972)](_0x167345,_0x120590,_0x410307,_0x1f4fc2),this[_0x43d38a(0x576)]();},Window_StatusBase[_0x5443f5(0x353)][_0x5443f5(0x804)]=function(){const _0x555e11=_0x5443f5;return $gameSystem[_0x555e11(0x89e)]()-0x8;},Window_StatusBase['prototype'][_0x5443f5(0x152)]=function(_0xdf563b,_0x36a389,_0x1ab01f,_0x6911aa){const _0x2a98ab=_0x5443f5;_0x6911aa=_0x6911aa||0xa8,this[_0x2a98ab(0xdb)]();if(VisuMZ['CoreEngine'][_0x2a98ab(0x446)]['UI'][_0x2a98ab(0x6f3)])this[_0x2a98ab(0x4cd)](_0xdf563b['currentClass']()[_0x2a98ab(0x744)],_0x36a389,_0x1ab01f,_0x6911aa);else{const _0x9cab20=_0xdf563b[_0x2a98ab(0x89d)]()[_0x2a98ab(0x744)][_0x2a98ab(0x6d0)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x9cab20,_0x36a389,_0x1ab01f,_0x6911aa);}},Window_StatusBase['prototype']['drawActorNickname']=function(_0x4fd10d,_0x45b76a,_0x9c50b5,_0x195d38){const _0x3cb75c=_0x5443f5;_0x195d38=_0x195d38||0x10e,this['resetTextColor']();if(VisuMZ[_0x3cb75c(0x425)]['Settings']['UI'][_0x3cb75c(0x125)])_0x3cb75c(0x346)===_0x3cb75c(0x6f2)?(this[_0x3cb75c(0x39e)]={},_0x2de1e2[_0x3cb75c(0x425)][_0x3cb75c(0x8d2)][_0x3cb75c(0x91b)](this)):this[_0x3cb75c(0x4cd)](_0x4fd10d[_0x3cb75c(0x41f)](),_0x45b76a,_0x9c50b5,_0x195d38);else{if('pGYwq'!==_0x3cb75c(0x7e4)){const _0x31f4a2=_0x4fd10d[_0x3cb75c(0x41f)]()[_0x3cb75c(0x6d0)](/\\I\[(\d+)\]/gi,'');this[_0x3cb75c(0x972)](_0x4fd10d[_0x3cb75c(0x41f)](),_0x45b76a,_0x9c50b5,_0x195d38);}else this[_0x3cb75c(0x712)]=![];}},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x3cc)]=Window_StatusBase[_0x5443f5(0x353)][_0x5443f5(0x1c7)],Window_StatusBase[_0x5443f5(0x353)][_0x5443f5(0x1c7)]=function(_0x3450ad,_0x46cdd7,_0x4a93ba){const _0x43976a=_0x5443f5;if(VisuMZ[_0x43976a(0x425)][_0x43976a(0x446)][_0x43976a(0x36a)][_0x43976a(0x1c4)]===![])return;if(this['isExpGaugeDrawn']())this[_0x43976a(0x8aa)](_0x3450ad,_0x46cdd7,_0x4a93ba);VisuMZ[_0x43976a(0x425)][_0x43976a(0x3cc)][_0x43976a(0x91b)](this,_0x3450ad,_0x46cdd7,_0x4a93ba);},Window_StatusBase[_0x5443f5(0x353)]['isExpGaugeDrawn']=function(){const _0x15e62a=_0x5443f5;return VisuMZ[_0x15e62a(0x425)][_0x15e62a(0x446)]['UI'][_0x15e62a(0xe2)];},Window_StatusBase[_0x5443f5(0x353)][_0x5443f5(0x8aa)]=function(_0x52e093,_0x1ddf58,_0x3e7aea){const _0x513d9e=_0x5443f5;if(!_0x52e093)return;if(!_0x52e093['isActor']())return;const _0x3a1c57=0x80,_0x346dbd=_0x52e093['expRate']();let _0x2235fb=ColorManager[_0x513d9e(0x3cd)](),_0x54f147=ColorManager[_0x513d9e(0xf9)]();_0x346dbd>=0x1&&(_0x2235fb=ColorManager[_0x513d9e(0x16e)](),_0x54f147=ColorManager['maxLvGaugeColor2']()),this['drawGauge'](_0x1ddf58,_0x3e7aea,_0x3a1c57,_0x346dbd,_0x2235fb,_0x54f147);},Window_EquipStatus[_0x5443f5(0x353)][_0x5443f5(0x2a2)]=function(){const _0xa4eb13=_0x5443f5;let _0x1e5f11=0x0;for(const _0x182e54 of VisuMZ[_0xa4eb13(0x425)][_0xa4eb13(0x446)][_0xa4eb13(0x36a)]['DisplayedParams']){if(_0xa4eb13(0x4cb)!==_0xa4eb13(0x161)){const _0x4227fd=this['itemPadding'](),_0x264a92=this[_0xa4eb13(0x7d2)](_0x1e5f11);this[_0xa4eb13(0x168)](_0x4227fd,_0x264a92,_0x182e54),_0x1e5f11++;}else _0x3f3757[_0xa4eb13(0x112)]&&(this['_forcedBattleSys']='FTB');}},Window_EquipStatus[_0x5443f5(0x353)][_0x5443f5(0x677)]=function(_0x59aaae,_0x1bf871,_0x43a685){const _0x187dd9=_0x5443f5,_0x35bced=this[_0x187dd9(0x243)]()-this['itemPadding']()*0x2;this[_0x187dd9(0x76f)](_0x59aaae,_0x1bf871,_0x35bced,_0x43a685,![]);},Window_EquipStatus['prototype'][_0x5443f5(0x9cc)]=function(_0x4cf596,_0x51097c,_0x1c3cc1){const _0x57df6c=_0x5443f5,_0x4e7271=this[_0x57df6c(0x77b)]();this[_0x57df6c(0xdb)](),this[_0x57df6c(0x972)](this[_0x57df6c(0x8ed)][_0x57df6c(0x4fe)](_0x1c3cc1,!![]),_0x4cf596,_0x51097c,_0x4e7271,_0x57df6c(0x66d));},Window_EquipStatus['prototype'][_0x5443f5(0x397)]=function(_0x2c3fc0,_0x3a438e){const _0x6a6fcb=_0x5443f5,_0x2f6fe4=this['rightArrowWidth']();this['changeTextColor'](ColorManager[_0x6a6fcb(0x68c)]());const _0x2b91be=VisuMZ['CoreEngine'][_0x6a6fcb(0x446)]['UI']['ParamArrow'];this[_0x6a6fcb(0x972)](_0x2b91be,_0x2c3fc0,_0x3a438e,_0x2f6fe4,_0x6a6fcb(0x380));},Window_EquipStatus[_0x5443f5(0x353)][_0x5443f5(0x46e)]=function(_0x541470,_0x5325d0,_0x8d222c){const _0x246a9c=_0x5443f5,_0x3e853e=this[_0x246a9c(0x77b)](),_0x2375f2=this[_0x246a9c(0x766)][_0x246a9c(0x4fe)](_0x8d222c),_0xbd0a28=_0x2375f2-this['_actor']['paramValueByName'](_0x8d222c);this[_0x246a9c(0x3de)](ColorManager[_0x246a9c(0x520)](_0xbd0a28)),this[_0x246a9c(0x972)](this['_tempActor'][_0x246a9c(0x4fe)](_0x8d222c,!![]),_0x541470,_0x5325d0,_0x3e853e,_0x246a9c(0x66d));},VisuMZ['CoreEngine']['Window_EquipItem_isEnabled']=Window_EquipItem[_0x5443f5(0x353)][_0x5443f5(0x162)],Window_EquipItem[_0x5443f5(0x353)][_0x5443f5(0x162)]=function(_0x340a63){const _0x7c3737=_0x5443f5;if(_0x340a63&&this['_actor']){if('Iwhyy'==='Iwhyy')return this[_0x7c3737(0x8ed)][_0x7c3737(0x4ee)](_0x340a63);else this['_helpWindow'][_0x7c3737(0x3c0)](_0x23ff05['layoutSettings'][_0x7c3737(0x5e9)]);}else return VisuMZ[_0x7c3737(0x425)][_0x7c3737(0x936)]['call'](this,_0x340a63);},Window_StatusParams['prototype']['maxItems']=function(){const _0x113511=_0x5443f5;return VisuMZ['CoreEngine'][_0x113511(0x446)]['Param'][_0x113511(0x8ec)][_0x113511(0x44d)];},Window_StatusParams[_0x5443f5(0x353)][_0x5443f5(0x168)]=function(_0x506e39){const _0x1ac731=_0x5443f5,_0x2d7eb3=this[_0x1ac731(0x4e0)](_0x506e39),_0x1ad1a2=VisuMZ[_0x1ac731(0x425)]['Settings'][_0x1ac731(0x36a)][_0x1ac731(0x8ec)][_0x506e39],_0x1d36dd=TextManager[_0x1ac731(0x1d2)](_0x1ad1a2),_0x276c9d=this[_0x1ac731(0x8ed)]['paramValueByName'](_0x1ad1a2,!![]);this[_0x1ac731(0x76f)](_0x2d7eb3['x'],_0x2d7eb3['y'],0xa0,_0x1ad1a2,![]),this[_0x1ac731(0xdb)](),this[_0x1ac731(0x972)](_0x276c9d,_0x2d7eb3['x']+0xa0,_0x2d7eb3['y'],0x3c,_0x1ac731(0x66d));};function _0x2f41(){const _0x1127d0=['XqlSb','Sprite_Picture_loadBitmap','code','xparamFlatBonus','removeAllFauxAnimations','CustomParamAbb','IconSParam3','picture','processKeyboardEnd','processTimingData','SParamVocab7','home','applyEasing','overallWidth','beobp','opacity','Flat','ClWyK','VisuMZ_3_EventChainReact','defaultInputMode','evade','IconParam6','DisplayedParams','_actor','match','Jyqky','FSksr','XParamVocab0','tkICg','pop','horizontal','OUTCUBIC','TpZVA','goto','BKSP','LATIN1','processCursorMoveModernControls','subject','enemy','Window_NameInput_processTouch','coreEngineRepositionEnemies','OptionsMenu','stencilFunc','FTtMv','SLEEP','Spriteset_Battle_createEnemies','Scene_MenuBase_mainAreaTop','OUTSINE','_stored_tpGaugeColor2','_drawTextOutline','mjxFL','ctGaugeColor2','_backSprite2','mjtqL','isEventTest','MRG','Gold','MHdOe','gkPQC','Scene_Menu_create','disable','_animationQueue','updateScrollBarPosition','uSxmC','REPLACE','buttonAssistOffset1','_originalViewport','measureTextWidthNoRounding','xparamPlusJS','call','DummyBgType','xparamFlat2','meVolume','initButtonHidden','ActorTPColor','mainAreaTop','_realScale','_isPlaytest','TimeProgress','_stored_ctGaugeColor2','keyRepeatWait','_troopId','SideButtons','areButtonsOutsideMainUI','Scene_Skill_create','skillTypeWindowRect','adjustBoxSize','QnCPk','AnimationMirrorOffset','_clientArea','HyTbB','setMute','Scene_Shop_create','IhzjM','TILDE','optSideView','Window_EquipItem_isEnabled','SParamVocab6','IconSParam2','drawTextTopAligned','updatePositionCoreEngineShakeRand','NONCONVERT','_helpWindow','setSkill','allTiles','onload','IconXParam1','Window_NameInput_cursorDown','OUTQUAD','ShowDevTools','checkPlayerLocation','_onKeyPress','add','VariableEvalReference','inbounce','11Ycyyou','itemPadding','roxAq','isHandled','battleSystem','sparamPlus1','_name','addEventListener','_shakePower','_animationSprites','commandWindowRect','_sideButtonLayout','DefaultMode','JSON','updatePadding','Flat2','createScrollBarSprites','_movementWholeDuration','tpCostColor','mvNEi','XhIum','updateOpacity','createDimmerSprite','_slotWindow','makeFontBigger','getCombinedScrollingText','bgmVolume','helpAreaTop','sin','isPlaying','oeALV','enableDigitGroupingEx','vert','Input_update','ExportAllMapText','XParamVocab3','_height','IconXParam8','deactivate','_scene','setViewportCoreEngineFix','drawText','_updateFilterArea','IconXParam7','ECrqh','setAnchor','subjectHitRate','iAFOU','ctGaugeColor1','ENTER','moRir','requiredWtypeId1','isTpb','offsetY','updateDashToggle','Scene_MenuBase_createCancelButton','VisuMZ_1_OptionsCore','pos','fWGrN','IconXParam5','_windowLayer','ScaleY','omUrc','showPicture','wlFyu','contains','Enemy','dashToggle','innerWidth','Window_NameInput_processHandling','baseId','repositionCancelButtonSideButtonLayout','RightMenus','BTestWeapons','EXllz','dYVBi','QbcWs','NUM_LOCK','_offsetX','_muteSound','canAttack','sLlin','height','BlurStrength','DvWnK','IWWsz','playEscape','paramRateJS','XParamVocab1','GroupDigits','GoldRect','CreateBattleSystemID','font','ScreenResolution','Game_Actor_paramBase','createFauxAnimationSprite','anglePlus','maxLevel','AutoScrollLockY','oPniL','Window','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_duration','Game_Interpreter_updateWaitMode','Window_NameInput_cursorPageup','SystemSetFontSize','bpYnW','updateEffekseer','Conditional\x20Branch\x20Script\x20Error','contents','hAwqT','stringKeyMap','evaded','DigitGroupingExText','Scene_Battle_createSpriteset','startShake','moveMenuButtonSideButtonLayout','WindowLayer_render','igtbF','jGbna','Spriteset_Base_updatePosition','XParamVocab2','openURL','VisuMZ_2_BattleSystemSTB','_scrollBarHorz','lnepp','RUeCs','_cacheScaleX','DOWN','VisuMZ_2_BattleSystemBTB','BTestItems','drawCurrentParam','children','grmxi','Feozz','calcEasing','XQpVj','rqYuY','rJGNg','ADD','isItemStyle','UfWlZ','eventsXyNt','qypzm','XbTUe','scrollX','oPtUR','Location','traitObjects','setupRate','moveRelativeToResolutionChange','ExportStrFromAllTroops','updatePointAnimations','INOUTEXPO','ItemBackColor1','buttonAreaHeight','DigitGroupingGaugeSprites','ibbFQ','hpGaugeColor1','EndingID','ALT','jPdGJ','LtpNG','addAnimationSpriteToContainer','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','endAnimation','Game_Action_setAttack','Window_Selectable_cursorDown','Scene_GameEnd_createBackground','VisuMZ_1_BattleCore','DimColor2','initCoreEngine','clearOnceParallelInterpreters','recoverAll','uBqSk','InputBgType','vidIN','CLOSE_PAREN','RowSpacing','onDatabaseLoaded','maxLvGaugeColor2','createPageButtons','BattleSystem','_margin','resetTextColor','updatePlayTestF7','createCustomBackgroundImages','setClickHandler','yJRnR','updatePictureSettings','printError','LvExpGauge','initBasic','makeInputButtonString','TPB\x20ACTIVE','updatePositionCoreEngineShakeOriginal','note','NUM','xparamPlus','terminate','getColor','loadWindowskin','PositionY','_opening','TCR','Scene_Title_drawGameTitle','_coreEasingType','CustomParamNames','command105','_buyWindow','getLastUsedGamepadType','〘Show\x20Text〙\x0a','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','gainSilentTp','expGaugeColor2','EbvEY','ZERO','BannedWords','OptionsBgType','AudioChangeBgmPitch','applyForcedGameTroopSettingsCoreEngine','titles1','iVfUJ','changeAnglePlusData','updateOpen','buttonAssistKey3','lastAnimationSprite','isActiveTpb','Scene_Base_createWindowLayer','rBSGA','toString','_commandWindow','mmp','thickness','isMaxLevel','itemHit','HYnZK','maxGold','setupValueFont','VisuMZ_2_BattleSystemFTB','_hideTileShadows','bgsVolume','dUvxo','processTouchModernControls','profileWindowRect','setupNewGame','type','shift','jRBew','updateSmoothScroll','flush','ForceNoPlayTest','paintOpacity','isCancelled','up2','contentsOpacity','IconXParam9','ParseArmorNotetags','TextCodeNicknames','Maaoz','cursorPagedown','_shakeSpeed','playBgm','buttonAssistKey4','Window_NameInput_cursorLeft','_lastOrigin','colSpacing','Mirror','IconParam3','_currentBgs','initialize','updateData','clearCachedKeys','Color','%1%2','yxWbz','SwitchToggleRange','NUMPAD3','FUNC','maxTp','needsUpdate','IconParam1','cVffU','usableSkills','runCombinedScrollingTextAsCode','isMVAnimation','zmSGW','ParamChange','CustomParamType','INELASTIC','BTHHo','END','ButtonAssist','buttonAssistWindowSideRect','feitR','defineProperty','Window_TitleCommand_selectLast','removeChild','ParseItemNotetags','seVolume','MIN_SAFE_INTEGER','level','hiCog','drawActorClass','lhTsp','ListBgType','Sprite_Animation_processSoundTimings','isRepeated','slQkh','keypress','NSNIG','_battlerName','enabled','deselect','updateScrollBarVisibility','FPRpf','mpGaugeColor2','ControllerMatches','gqOTq','isEnabled','LPPJl','HRG','asin','isAnimationPlaying','OezcD','drawItem','changeClass','YtIWO','Flat1','_statusWindow','CONVERT','maxLvGaugeColor1','iRpvl','SkillTypeRect','globalAlpha','_pauseSignSprite','Max','setHome','SystemLoadAudio','_isWindow','DefaultStyle','2jkuAcq','destroyScrollBarBitmaps','buttonAssistCancel','checkScrollBarBitmap','_showDevTools','VKNVB','isTouchedInsideFrame','ARRAYSTRUCT','HIT','NUMPAD6','get','BTB','IconSParam4','QUESTION_MARK','anchorCoreEasing','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','_stored_mpGaugeColor1','VabJL','isGamepadAxisMoved','removeAllPointAnimations','text%1','buttons','fadeSpeed','createCancelButton','initVisuMZCoreEngine','statusEquipWindowRect','GoldIcon','_battleField','_startDecrypting','AutoScrollLockX','PictureEasingType','zJoof','TitlePicButtons','_targetX','EquipMenu','BlurFilter','clamp','Exported_Script_%1.txt','createMenuButton','object','Window_Base_drawCharacter','xmOze','centerCameraCheckData','setActorHome','ItemMenu','measureText','_cacheScaleY','_displayX','updateBgsParameters','CommonEventID','drawGameSubtitle','BaseTexture','paramRate1','MiLok','ExtDisplayedParams','ParseAllNotetags','rTWBb','_stored_tpGaugeColor1','createContents','MainMenu','OS_KEY','levelUp','Game_Troop_setup','STB','getLevel','SParamVocab8','createKeyJS','Sprite_Gauge_currentValue','en-US','XParamVocab5','_inputString','Window_Base_drawIcon','hpColor','setValue','SkillMenu','processAlwaysEscape','ShowActorLevel','awcOk','WIN_OEM_PA3','drawActorLevel','paramRate','CustomParam','toUpperCase','dummyWindowRect','isEnemy','Scene_Battle_createSpritesetFix','fcMyQ','ListRect','sparam','INOUTQUAD','param','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','goldWindowRect','cancel','ruJnc','MAT','_forcedTroopView','_hideButtons','isBottomHelpMode','checkSmartEventCollision','KfzNN','duration','uiAreaHeight','end','getControllerInputButtonMatch','fillRect','TextManager_param','createChildSprite','LVOJR','FGNhI','setupCustomRateCoreEngine','_forcedBattleSys','scrollRight','ControllerButtons','CTB','lineHeight','SCROLLBAR','paramName','_pictureName','_drawTextShadow','createPointAnimationQueue','Game_Interpreter_command105','loadMapData','_windowskin','_bgsBuffer','result','batch','StatusEquipBgType','Xpsti','Game_Picture_updateRotation','itypeId','atbActive','2018100qlWFBH','Game_Actor_levelUp','isSceneMap','catchLoadError','consumeItem','TPB\x20WAIT','_baseTexture','loadBitmap','deflate','maxScrollY','showDevTools','State-%1-%2','targetOpacity','Bitmap_drawTextOutline','BoxMargin','ColorExpGauge1','playOk','_gamepadWait','updateCurrentEvent','〘Common\x20Event\x20%1:\x20%2〙\x20Start','buttonAssistKey1','IconXParam3','clearZoom','TextJS','anchor','paramBaseAboveLevel99','WIN_OEM_CUSEL','Scene_Map_createSpriteset','WIN_OEM_FJ_ROYA','drawSegment','createTroopNote','statusParamsWindowRect','<JS\x20%1\x20%2:[\x20](.*)>','scrollUp','reserveCommonEvent','string','updateKeyText','platform','processKeyboardBackspace','INQUART','Abbreviation','ColorHPGauge1','targetY','isSideView','pressed','faceHeight','actorWindowRect','outlineColorGauge','isScrollBarVisible','ACCEPT','processKeyboardDigitChange','SystemLoadImages','_scrollBarVert','_optionsWindow','bsHLz','lGVjE','tBgrP','CommandRect','windowOpacity','setViewport','_onKeyDown','cursorPageup','isLoopHorizontal','item','\x0a\x0a\x0a\x0a\x0a','animationId','mpColor','efsMh','playCancel','IRBel','Spriteset_Base_update','paramX','YFZlp','【%1】\x0a','znHbW','Power','Game_Picture_initBasic','helpAreaHeight','DummyRect','getBackgroundOpacity','stencilOp','addCommand','createDigits','SlotRect','ExtractStrFromMap','Title','targetBackOpacity','saveViewport','doesNameContainBannedWords','_anchor','process_VisuMZ_CoreEngine_Functions','createSpriteset','translucentOpacity','ValueJS','padding','ddWAN','2415024RGhBjs','_pageupButton','loadTitle2','_dimmerSprite','parseForcedGameTroopSettingsCoreEngine','index','scaleSprite','destroyCoreEngineMarkedBitmaps','escape','MEV','Bitmap_drawCircle','_targetScaleY','CLEAR','horz','_cancelButton','(\x5cd+\x5c.?\x5cd+)>','nEqwK','hVPFy','move','194018GLMnoD','_makeFontNameText','AsUln','Scene_Boot_onDatabaseLoaded','makeCommandList','NewGameBoot','SwitchRandomizeRange','XvdSF','_stored_mpCostColor','IconSParam1','rowSpacing','setGuard','IconParam4','fillStyle','CategoryRect','Rate2','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','foxWZ','Bitmap_measureTextWidth','#%1','gYgjQ','showPointAnimations','cos','sv_enemies','NaXzj','UFTtW','horzJS','gGLRY','_commonEventLayers','playLoad','ApplyEasing','commandWindowRows','child_process','fKrwW','_maxDigits','YciYm','UNDERSCORE','dimColor1','_addShadow','pages','ALTGR','adjustSprite','updateFauxAnimations','AJEoK','PictureEraseAll','itemBackColor2','xparamFlat1','uugFM','status','LbXpm','Scene_Map_createSpriteset_detach','drawAllParams','displayY','onClick','APiVu','RevertPreserveNumbers','exportAllTroopStrings','TranslucentOpacity','tOwFr','PGUP','resize','BgFilename1','backgroundBitmap','FDR','XHjVj','isGamepadTriggered','KfyLh','CommandBgType','drawGameVersion','stypeId','currentLevelExp','CancelText','updateRotation','measureTextWidth','StatusBgType','_backSprite','maxCols','bitmapWidth','processKeyboardHome','setCommonEvent','iconWidth','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','Game_Event_start','Total','text','_numberWindow','Scene_Map_updateMain','mainAreaHeight','Game_Action_itemEva','AllTroops','touchUI','zjwvh','mpCostColor','_actorWindow','initialBattleSystem','pHHZy','min','remove','CTnyi','Game_Picture_updateMove','format','mainAreaHeightSideButtonLayout','OnLoadJS','Sprite_Picture_updateOrigin','OcLrm','qgBqV','QpeuV','ShowButtons','STR','JJZNf','OUTEXPO','skillTypes','setupScrollBarBitmap','CAPSLOCK','titleCommandWindow','iBrxs','\x5c}❪TAB❫\x5c{','HegJq','updateMove','initMembers','moveCancelButtonSideButtonLayout','StatusEquipRect','_loadingState','paramFlatBonus','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','description','bind','playTestF6','MINUS','maxScrollbar','levelUpRecovery','GRD','show','drawGauge','onlyfilename','parameters','Aoqhf','Item-%1-%2','system','Input_shouldPreventDefault','_effectsContainer','Window_Base_initialize','STENCIL_TEST','MvAnimationRate','_baseSprite','ctrl','vnmit','Scene_Map_update','ivdoq','connected','buyWindowRect','App','ukUuq','IconXParam6','yoJWU','isUseModernControls','ExportStrFromAllMaps','isCollidedWithEvents','determineSideButtonLayoutValid','Bitmap_resize','_number','ExtJS','numberShowButton','Game_Map_scrollUp','_skillTypeWindow','isCursorMovable','Y:\x20%1','bmfCn','NUMPAD8','SRdIT','Kkerf','gaugeBackColor','pOWbf','IconXParam4','BasicParameterFormula','_data','itruw','checkSubstitute','skillId','vertical','cErAM','kYSqb','_registerKeyInput','INOUTBOUNCE','SCROLL_LOCK','updatePositionCoreEngineShakeHorz','Control\x20Variables\x20Script\x20Error','rqgKi','clearForcedGameTroopSettingsCoreEngine','VsHGT','ATK','BuyRect','loading','XParamVocab7','selectLast','LWOtM','updateClose','_pictureCoordinatesMode','scaleX','sxPvm','none','_playtestF7Looping','yScrollLinkedOffset','_stored_powerUpColor','guLFw','src','ShowJS','BattleManager_checkSubstitute','aWsHA','_currentBgm','repositionEnemiesByResolution','FontSize','OPEN_CURLY_BRACKET','pictures','DAxcH','VVdDM','processEscape','updateCoreEasing','FontWidthFix','TZMlU','setTopRow','_mode','OUTBACK','ParseTilesetNotetags','onInputOk','pyEfW','keyboard','targetX','prototype','findSymbol','_buttonAssistWindow','members','JVCWb','deathColor','alwaysDash','Rate','VOLUME_UP','PositionX','activate','Window_Scrollable_update','XnXgB','zoomScale','_targetOffsetY','PreserveNumbers','updateWaitMode','sparamPlusJS','sv_actors','X:\x20%1','helpWindowRect','targets','ozeuO','Param','categoryWindowRect','setSideView','_targetY','DisplayLockX','_stored_crisisColor','onLoad','playCursor','endAction','_targetScaleX','VDxHX','Window_NameInput_cursorPagedown','HjjYY','mapId','isSceneBattle','retrieveFauxAnimation','switchModes','enableDigitGrouping','_onceParallelInterpreters','RepositionEnemies','acVra','onEscapeSuccess','center','getParameter','AISpB','ColorTPGauge1','KeyUnlisted','BattleManager_update','ZDiMP','updatePictureCoordinates','yrWzN','command357','buttonAssistKey5','HYPHEN_MINUS','F6key','ColorCrisis','Game_Picture_show','bgs','updateAnchor','processSoundTimings','BZPRV','IconSParam0','openness','Speed','VisuMZ_2_BattleSystemETB','drawRightArrow','Window_Selectable_processTouch','substring','EGqUw','FphMv','ColorPowerUp','wTclz','_cache','_pagedownButton','ARRAYNUM','AccuracyBoost','JUNJA','isSmartEventCollisionOn','createFauxAnimationQueue','Bitmap_clearRect','DrawIcons','isGamepadButtonPressed','parallaxes','enemies','option','_internalTextures','_goldWindow','sparamFlat1','MAX_SAFE_INTEGER','GsTWh','PtUyD','PictureRotate','itemRect','storeMapData','loadGameImagesCoreEngine','drawGoldItemStyle','IconSet','textColor','_coreEasing','EVAL','Sprite_Animation_setViewport','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','responseText','bAdyH','FontSmoothing','NUMPAD4','setBackgroundType','_targetOffsetX','clearRect','ShowItemBackground','maxTurns','afAbk','TargetAngle','CWSMm','vNhny','setLastGamepadUsed','mainAreaTopSideButtonLayout','Scene_Boot_loadSystemImages','Window_StatusBase_drawActorLevel','expGaugeColor1','makeActionList','F20','BACK_QUOTE','pan','Game_Actor_changeClass','sparamRateJS','_storedMapText','showFauxAnimations','renderNoMask','ZOOM','Subtitle','title','popScene','RequireFocus','processDigitChange','zeQtA','changeTextColor','AaUEW','NewGameCommonEvent','SEMICOLON','processCursorHomeEndTrigger','_paramPlus','Window_Selectable_itemRect','numRepeats','drawGameTitle','open','buttonAssistKey%1','WIN_OEM_BACKTAB','ALWAYS','createJsQuickFunction','EQUAL','Game_Action_numRepeats','_createInternalTextures','_animation','mirror','Game_Party_consumeItem','scale','concat','skipBranch','OpenURL','startAnimation','itemEva','_shouldPreventDefault','playTestShiftT','floor','_inputWindow','command355','_fauxAnimationQueue','windowRect','BcTYB','Duration','EnableNameInput','%1〘End\x20Choice\x20Selection〙%1','cOGVC','terms','HelpRect','kbElC','_list','value','blt','GSRbr','exec','key%1','StatusParamsBgType','FontShadows','processMoveCommand','BattleManager_processEscape','EovqR','Game_Action_updateLastTarget','PDR','setCoreEngineUpdateWindowBg','_viewportSize','addOnceParallelInterpreter','EXCLAMATION','CWUjF','sceneTerminationClearEffects','updatePosition','uIJXY','_isButtonHidden','wait','Scene_Name_onInputOk','nickname','MDF','CNT','_balloonQueue','CEV','NameInputMessage','CoreEngine','mIZjL','Window_Selectable_cursorUp','save','ColorMPCost','SkillTypeBgType','F17','gfscs','$dataMap','EKVUe','_stored_mpGaugeColor2','INSERT','SveHV','BuyBgType','YVFLo','exportAllMapStrings','_startLoading','_colorCache','YOQRo','jbbOn','%2%1%3','ConvertNumberToString','yeVwD','createPointAnimationSprite','Center','SLASH','uDBUi','_subject','Graphics_printError','pagedownShowButton','VisuMZ_2_BattleSystemCTB','Graphics_defaultStretchMode','fpQtq','Settings','DOUBLE_QUOTE','_itemWindow','filterArea','createAnimationSprite','PA1','backspace','length','VaApA','SParamVocab9','oGVHP','ColorCTGauge2','wholeDuration','_offsetY','isSpecialCode','startNormalGame','PTB','battlerHue','UmKlX','cursorDown','jhaFr','textWidth','ugWdf','itemWindowRect','ImgLoad','%1〘Choice\x20%2〙\x20%3%1','BarThickness','isNextScene','_smooth','setAction','keyCode','WIN_OEM_CLEAR','IDs','WIN_ICO_00','\x5c}❪SHIFT❫\x5c{','forceOutOfPlaytest','OTB','SwitchRandomizeOne','Window_NameInput_cursorRight','helpAreaBottom','drawNewParam','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','isPointAnimationPlaying','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','PictureEraseRange','tEPRc','ceil','INOUTQUINT','_texture','addChildToBack','WIN_OEM_FJ_LOYA','menuShowButton','CustomParamIcons','rqxQD','EncounterRateMinimum','MDR','_scaleY','Game_Temp_initialize','requestPointAnimation','aSXXR','OutlineColor','pEZUZ','AutoStretch','Game_Interpreter_command122','Window_Base_createContents','TRAIT_PARAM','Scene_Map_initialize','_digitGroupingEx','_centerElement','sqrt','_screenX','operand','_coreEngineShakeStyle','isBottomButtonMode','isGamepadConnected','isOptionValid','processKeyboardDelete','XParameterFormula','Game_Action_itemHit','vlykL','BlendMode','createTextState','openingSpeed','Game_Screen_initialize','transform','buttonAssistOffset%1','_sellWindow','animationShouldMirror','ItemBgType','_blank','_repositioned','altKey','PLUS','GoldMax','etypeId','ColorManager_loadWindowskin','shake','Scene_Boot_startNormalGame','EnableNumberInput','nrcKs','onKeyDown','OkText','_updateGamepadState','applyEasingAnglePlus','_bgmBuffer','params','xdg-open','LNqTz','Window_MapName_refresh','Plus','F12','initDigitGrouping','DigitGroupingLocale','INOUTCIRC','makeCoreEngineCommandList','createBackground','ShopMenu','down2','fLVAS','HOME','SellBgType','isFauxAnimationPlaying','gaUnt','Scene_Base_create','_stored_normalColor','initialLevel','checkCacheKey','ExportCurMapText','isArrowPressed','scaleMode','hzmxA','gaugeLineHeight','Input_clear','qdxVE','vJuam','drawTextEx','isSideButtonLayout','getCoreEngineScreenShakeStyle','_startPlaying','setAttack','DETACH_PICTURE_CONTAINER','dZiNP','valueOutlineWidth','listWindowRect','aHLkj','processFauxAnimationRequests','framebuffer','isNormalPriority','pictureButtons','buttonAssistWindowRect','DataManager_setupNewGame','ColorExpGauge2','MAX_GL_TEXTURES','bifKR','itemLineRect','_digitGrouping','_currentMap','CodeJS','seek','maxHorz','AnimationID','buttonAssistKey2','krfYm','apply','124756heRqgQ','MRF','IconSParam6','processTouch','canEquip','dropItems','BDDAZ','makeAutoBattleActions','PictureFilename','itemBackColor1','ZFKGn','oMdHs','mute','targetContentsOpacity','getInputButtonString','mJvhz','paramFlat','scrollLeft','idyFP','sparamFlat2','paramValueByName','ZfDpR','knKhz','Page','ParamMax','_mirror','NPZTD','%1:\x20Exit\x20','Window_Selectable_processCursorMove','updateOnceParallelInterpreters','displayName','Game_Map_scrollDown','retrievePointAnimation','ButtonHeight','playMiss','PRESERVCONVERSION(%1)','〘Scrolling\x20Text〙\x0a','paramPlus','DATABASE','showIncompleteTilesetError','constructor','OutlineColorDmg','_pointAnimationQueue','setSideButtonLayout','ColorMPGauge1','Game_Interpreter_command355','randomJS','missed','outlineColorDmg','STENCIL_BUFFER_BIT','createTitleButtons','WIN_OEM_FINISH','ItemBackColor2','LOPcN','paramchangeTextColor','Sprite_Button_updateOpacity','Layer','ModernControls','》Comment《\x0a%1\x0a','makeDeepCopy','clone','buttonAssistText4','_fauxAnimationSprites','StartID','ShiftT_Toggle','AntiZoomPictures','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','AZMwH','advanced','battlebacks2','cYewL','integer','_defaultStretchMode','updateTransform','qKpmK','aeSqA','valueOutlineColor','BarBodyColor','nVfss','actor','includes','SceneManager_isGameActive','_changingClass','ConvertParams','_playTestFastMode','BgFilename2','ParseStateNotetags','setMainFontSize','wtypeId','Scene_Map_createMenuButton','powerDownColor','ZpATU','number','innerHeight','playTestShiftR','data/','createEnemies','_hp','displayX','Game_Picture_scaleX','F10','NUMPAD7','ActorBgType','dMlqI','PictureRotateBy','_profileWindow','lINHp','ImprovedAccuracySystem','WASD','hide','round','registerCommand','Game_Picture_move','Window_Base_drawFace','_targetOpacity','_movementDuration','SUBTRACT','bitmap','pageup','Window_NameInput_initialize','alignBottom','encounterStepsMinimum','toFixed','isMagical','faceWidth','_context','characters','drawCircle','qzyMS','ScreenShake','QyKya','NUMPAD5','paramMaxJS','default','filters','GoldFontSize','and\x20add\x20it\x20onto\x20this\x20one.','Scene_Battle_createSpriteset_detach','_inputSpecialKeyCode','Scene_Name_create','resetFontSettings','setBackgroundOpacity','USNkr','AGI','test','IconParam2','GoldBgType','isBusy','drawBackground','LevelUpFullHp','_lastGamepad','drawIconBySize','mYjjL','CLOSE_BRACKET','centerX','bVMoh','cursorRight','Window_StatusBase_drawActorSimpleStatus','requestFauxAnimation','loadSystem','titles2','turn','fkQin','operation','_dummyWindow','loadPicture','tpGaugeColor1','outbounce','ColSpacing','toLocaleString','EnableMasking','Mute','isInputting','clipboard','VOLUME_DOWN','ParseWeaponNotetags','XveYg','inBattle','textSizeEx','WIN_OEM_WSCTRL','Game_System_initialize','isOpenAndActive','PHA','_mainSprite','Chance','getGamepads','fROBK','WIN_OEM_ATTN','DisplayLockY','CPhPw','ARRAYJSON','originalJS','isEventRunning','checkCoreEngineDisplayCenter','ParseSkillNotetags','_editWindow','ShowScrollBar','alphabetic','COMMA','Scene_Boot_updateDocumentTitle','hasEncryptedImages','StatusRect','TitleCommandList','zniNg','erasePicture','_anglePlus','scrollY','drawBackgroundRect','visible','random','jGEBZ','normal','Pixelated','startAutoNewGame','INOUTBACK','Plus1','WIN_OEM_JUMP','<%1\x20%2:[\x20]','IconParam7','TRG','CrisisRate','ColorMPGauge2','GoldOverlap','Sprite_Actor_setActorHome','setEasingType','Scene_Options_create','initCoreEngineScreenShake','PAUSE','EISU','UpdatePictureCoordinates','nextLevelExp','IconSParam7','reserveNewGameCommonEvent','render','F18','GameEnd','setEnemyAction','pitch','MapOnceParallel','CANCEL','MAXMP','join','HANJA','ShiftR_Toggle','Game_Map_scrollLeft','Skill-%1-%2','NUMPAD0','slice','DCbZs','_pictureCoordinatesWindow','Sprite_Battler_startMove','Window_NumberInput_start','QoL','SceneManager_initialize','itemSuccessRate','HelpBgType','makeFontSmaller','2176410OdQXtr','DEF','setAnglePlusData','qLeOY','BottomButtons','updateOrigin','KEEP','HZbDG','update','_centerElementCoreEngine','centerSprite','learnings','editWindowRect','buttonAssistOffset4','PLAY','initCoreEasing','isMaskingEnabled','overallHeight','sxyqO','updatePositionCoreEngineShakeVert','isAnimationOffsetXMirrored','VlwjA','mainCommandWidth','SceneManager_exit','WIN_OEM_PA1','FINAL','drawIcon','EnableJS','RMuck','_backgroundSprite','ECTSy','yGjNm','HBvDI','process_VisuMZ_CoreEngine_Settings','select','Scene_MenuBase_helpAreaTop','MAXHP','Keyboard','_stored_maxLvGaugeColor1','KeySHIFT','toLowerCase','iconHeight','initMembersCoreEngine','drawActorSimpleStatus','PeCqe','enter','_stored_systemColor','IconSParam8','fjfFd','refresh','_centerCameraCheck','volume','easingType','ColorGaugeBack','setFrame','_colorTone','isClosed','map','ONE','performMiss','lLddI','_mapNameWindow','onerror','offColor','getKeyboardInputButtonString','setColorTone','TextStr','JRHey','retreat','isNwjs','RZWqr','cyUMR','ERzjG','getControllerInputButtonString','tEJwz','\x20Origin:\x20%1','OpenSpeed','Bitmap_drawText','Window_NameInput_refresh','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','Game_Character_processMoveCommand','clear','DigitGroupingDamageSprites','_screenY','IDOZY','createCustomParameter','buttonAssistOffset2','kjfjL','BTestAddedQuantity','Game_Picture_calcEasing','gradientFillRect','Scene_Base_terminate','Graphics_centerElement','statusWindowRect','paramMax','TGR','Icon','slvkP','_refreshArrows','paramRate2','buttonAssistText%1','Scene_MenuBase_createPageButtons','nJRXx','IconSParam5','log','tilesetFlags','BgType','updateAnglePlus','sparamRate','requestMotion','_logWindow','Scene_Map_createSpritesetFix','VIEWPORT','Bitmap_fillRect','PERIOD','drawFace','SceneManager_onKeyDown','_refreshBack','rgba(0,\x200,\x200,\x200.7)','Linear','refreshWithTextCodeSupport','YjGIo','currentValue','xScrollLinkedOffset','AMPERSAND','restore','context','ExtractStrFromTroop','ItemRect','MenuBg','right','ojOtO','boxHeight','MULTIPLY','Window_NameInput_cursorUp','Input_pollGamepads','DrawItemBackgroundJS','PGDN','command111','current','drawParamName','getInputMultiButtonStrings','OUTELASTIC','maxItems','CommandList','tileWidth','lmhBO','makeTargetSprites','_stored_maxLvGaugeColor2','bgm','_lastX','removePointAnimation','destroy','style','JkHRD','KANA','mhp','KeyboardInput','SubfolderParse','ParseActorNotetags','Game_Picture_x','systemColor','markCoreEngineModified','SParamVocab1','maxScrollX','IDDVQ','SideView','contentsBack','cursorLeft','VisuMZ_4_UniqueTileEffects','_image','Tilemap_addShadow','LINEAR','hwRPN','Zbqfa','IlyOO','ViXQR','numActions','%1〘Choice\x20Cancel〙%1','lglcY','21rhkNaO','useDigitGrouping','processCursorMove','enable','Window_Selectable_drawBackgroundRect','offOpacity','_backgroundFilter','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','_phase','process_VisuMZ_CoreEngine_RegExp','_allTextHeight','layoutSettings','_stored_pendingColor','return\x200','F23','Scene_MenuBase_mainAreaHeight','updateBackOpacity','Opacity','isPlaytest','Window_ShopSell_isEnabled','updatePictureAntiZoom','targetObjects','SParamVocab4','_pointAnimationSprites','ParamName','setBattleSystem','setTargetAnchor','mDRGQ','tpGaugeColor2','addWindow','iUokV','xAfyn','sViyR','hZgyL','kPBUZ','ExtractStrFromList','([\x5c+\x5c-]\x5cd+)([%％])>','StatusMenu','isKeyItem','Window_Base_update','_lastScrollBarValues','equips','RPGMAKER_VERSION','SEPARATOR','_moveEasingType','IconSParam9','charAt','STRUCT','_pollGamepads','replace','pyQYT','CallHandlerJS','mFeGx','yHQkk','createPointAnimation','stop','BackOpacity','removeAnimationFromContainer','xparamRateJS','LqcTR','Actor','_categoryWindow','resetBattleSystem','CIRCUMFLEX','isActor','_scrollDuration','isWindowMaskingEnabled','numberWindowRect','MUFPx','sellWindowRect','F16','offsetX','currencyUnit','viewport','caBOl','_lastCommandSymbol','cyGSY','Ymcrl','process_VisuMZ_CoreEngine_ControllerButtons','start','TfBle','Unnamed','targetScaleY','uHeKi','TextCodeClassNames','LLmrp','Input_updateGamepadState','BCQWQ','iSiDN','removeOnceParallelInterpreter','nUbZl','setupCoreEasing','WIN_ICO_CLEAR','makeDocumentTitle','ClUVh','INEXPO','Manual','setupButtonImage','ExportAllTroopText','fontSize','hxGqb','loadIconBitmap','mDULH','sparamPlus','nw.gui','fwUGF','original','_stored_powerDownColor','getBattleSystem','updateScene','CategoryBgType','image-rendering','FadeSpeed','TmlSM','_customModified','_closing','getColorDataFromPluginParameters','forceStencil','_hovered','Game_Picture_initRotation','XParamVocab8','getButtonAssistLocation','faces','setup','AudioChangeBgsVolume','_displayY','createFauxAnimation','DELETE','mZNyo','initRotationCoreEngine','INOUTQUART','Spriteset_Base_destroy','ColorSystem','_statusParamsWindow','TAB','getLastGamepadUsed','isFullDocumentTitle','uqSRH','ENTER_SPECIAL','2380kovbRF','targetPosition','getPointAnimationLayer','isRightInputMode','_CoreEngineSettings','setLastPluginCommandInterpreter','FeYDV','_active','isTriggered','reservePlayTestNewGameCommonEvent','target','isInstanceOfSceneMap','create','VhgwS','ColorTPCost','QcPvy','getCustomBackgroundSettings','ItemPadding','JgGFV','createPointAnimationTargets','Scene_Unlisted','3840QhNvKb','DOLLAR','buttonAssistWindowButtonRect','OPUiF','scrollDown','name','ItemHeight','Game_Picture_scaleY','push','1.4.4','gaugeRate','version','Scene_Map_updateMainMultiply','_target','Game_Map_setup','XIVZl','frymS','xparamRate1','randomInt','scaleY','updateDocumentTitle','filter','tileHeight','BCwZu','smooth','Mqimr','buttonAssistOk','SlotBgType','_downArrowSprite','VjrQt','moaLV','indexOf','origin','ColorPowerDown','NUMPAD9','_action','zqApi','Sprite_destroy','SystemSetWindowPadding','_tempActor','Untitled','Upper\x20Left','SHIFT','cursorUp','button','boxWidth','RegExp','(\x5cd+)>','drawParamText','traitsPi','DIVIDE','_stored_deathColor','LVyLc','Game_Picture_angle','FunctionName','1577748POvbOx','cLDlL','EscapeAlways','FRiDU','INCUBIC','paramWidth','createButtonAssistWindow','Script\x20Call\x20Error','setActorHomeRepositioned','KeyTAB','itemHitImprovedAccuracy','Game_Interpreter_PluginCommand','EVA','destroyed','%1/','win32','width','_targets','F21','Finish','tRkCW','VisuMZ_2_BattleSystemOTB','SParamVocab0','animationNextDelay','_scaleX','MBhzZ','Ndxgc','CRSEL','oqjMA','LUK','loadSystemImages','JLMxC','_upArrowSprite','list','isAnimationForEach','tcqcP','isItem','RUnEz','gameTitle','0.00','targetEvaRate','F15','IiWEK','strokeRect','processPointAnimationRequests','active','ckfuf','scrollbarHeight','hit','SZcBN','isPhysical','Bitmap_gradientFillRect','Iloid','updateBgmParameters','reduce','pow','_buttonType','_listWindow','WIN_OEM_RESET','TextFmt','tHdqo','Window_Base_createTextState','tsmWW','cancelShowButton','Enemy-%1-%2','trim','_pictureContainer','catchException','EXECUTE','LoQvB','AdjustAngle','Bitmap_strokeRect','Sprite_AnimationMV_processTimingData','makeEncounterCount','NEAREST','allowShiftScrolling','PictureShowIcon','areButtonsHidden','wmaIU','CRI','HyIhr','createBuffer','setupCoreEngine','useFontWidthFix','QUOTE','top','kYZIC','ActorRect','gainGold','PERCENT','ProfileRect','snapForBackground','paramY','PPdRF','hzcYU','_encounterCount','EREOF','Scene_Equip_create','gold','Version','Gmioa','nYzhw','drawValue','PictureID','CLOSE_CURLY_BRACKET','createCommandWindow','Spriteset_Base_isAnimationPlaying','DimColor1','BTestArmors','tiTRV','haoSl','backOpacity','startMove','optionsWindowRect','fillText','isMapScrollLinked','writeText','SellRect','Show\x20Scrolling\x20Text\x20Script\x20Error','keyMapper','IconParam5','MskWC','tilesets','Bitmap_initialize','buttonAssistText3','onKeyDownKeysF6F7','NumberRect','〘Common\x20Event\x20%1:\x20%2〙\x20End','command122','buttonAssistText1','SLSFf','WIN_OEM_FJ_MASSHOU','Sprite_AnimationMV_updatePosition','helpAreaTopSideButtonLayout','LoadMenu','ColorTPGauge2','evaluate','animationBaseDelay','sxXQs','isPressed','tab','textAlign','smallParamFontSize','expRate','destroyContents','lNMbX','process_VisuMZ_CoreEngine_Notetags','Spriteset_Base_initialize','URL','removeFauxAnimation','bitmapHeight','_rate','OptionsRect','KVUbN','ButtonFadeSpeed','IFYTG','hideButtonFromView','IconXParam2','createWindowLayer','Window_Base_destroyContents','aGtZw','Wait','img/%1/','FTB','refreshScrollBarBitmap','XAodX','blockWidth','IconParam0','Sprite_Button_initialize','writeFile','_pressed','FQIDz','RdirB','_setupEventHandlers','left','_origin','_width','setHandler','Game_Interpreter_command111','PRINT','_stored_tpCostColor','tiLnU','PrdKU','subtitle','loadTitle1','EQUALS','MCR','Window_Gold_refresh','onButtonImageLoad','_backSprite1','send','playCursorSound','StatusParamsRect','outlineColor','eTEDw','pointY','parse','ColorDeath','SaveMenu','onNameOk','repeat','addChild','xparamRate','darwin','Scene_Status_create','initRotation','ZlRbC','_stored_expGaugeColor1','TNvht','getLastPluginCommandInterpreter','Symbol','exit','setMoveEasingType','Sprite_Gauge_gaugeRate','DocumentTitleFmt','calcCoreEasing','applyCoreEasing','ParseClassNotetags','NoTileShadows','isLoopVertical','redraw','_clickHandler','MenuLayout','pointX','angle','scrollbar','VisuMZ_2_BattleSystemPTB','_menuButton','_shakeDuration','BACKSPACE','vertJS','isOpen','playTestF7','padZero','ryhbH','removeAnimation','processKeyboardHandling','areTileShadowsHidden','trOOE','_stored_expGaugeColor2','_mp','zYWda','lzzuU','movePageButtonSideButtonLayout','EditBgType','KeyItemProtect','itemHeight','_stored_ctGaugeColor1','application/json','down','ExportString','performEscape','OpenConsole','rKtKF','pagedown','SystemSetSideView','buttonAssistSwitch','playBgs','gaugeHeight','vYpdN','updateMotion','XParamVocab6','paramBase','Renderer','Match','1.3.0','lFpgx','_spriteset','MultiKeyFmt','addLoadListener','animations','attackSkillId','_refreshPauseSign','Plus2','Kzxne','arePageButtonsEnabled','jsonToZip','ETB','worldTransform','isMenuButtonAssistEnabled','Smooth','ParseEnemyNotetags','nah','zRNhY','imageSmoothingEnabled','drawCurrencyValue','Yrepi','sparamFlatJS','processHandling','onActorChange','AliRe','xparam','EXR','ARRAYFUNC','isNumpadPressed','currentClass','mainFontSize','maxVisibleItems','GetParamIcon','setCoreEngineScreenShakeStyle','Scene_Battle_createCancelButton','onXhrError','_lastPluginCommandInterpreter','WIN_OEM_FJ_TOUROKU','PixelateImageRendering','LAKDh','Armor-%1-%2','Input_setupEventHandlers','drawActorExpGauge','clearStencil','REC','_lastY','ATTN','_targetAnchor','OPEN_BRACKET','Scene_Battle_update','Type','Window_Base_drawText','centerY','_stored_hpGaugeColor1','_commandList','setWindowPadding','isGameActive','targetScaleX','Troop%1','KnEXx','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Game_Event_isCollidedWithEvents','Input_onKeyDown','smoothSelect','ESC','bodyColor','split','LevelUpFullMp','sTzyj','textHeight','catchUnknownError','drawCharacter','sTWlS','PUHot','RJGmp','NumberBgType','playOnceParallelInterpreter','LpVNh','INBACK','myQgC','dIWqG','Game_BattlerBase_refresh','fillAll','Key%1','max'];_0x2f41=function(){return _0x1127d0;};return _0x2f41();}if(VisuMZ['CoreEngine']['Settings'][_0x5443f5(0x688)][_0x5443f5(0x401)]){VisuMZ[_0x5443f5(0x425)]['Settings'][_0x5443f5(0x688)]['QwertyLayout']&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x5443f5(0x501),'OK']);;VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x561)]=Window_NameInput[_0x5443f5(0x353)]['initialize'],Window_NameInput[_0x5443f5(0x353)][_0x5443f5(0x131)]=function(_0x244f3b){const _0xedda84=_0x5443f5;this[_0xedda84(0x34c)]=this[_0xedda84(0x8e9)](),VisuMZ[_0xedda84(0x425)]['Window_NameInput_initialize'][_0xedda84(0x91b)](this,_0x244f3b),this[_0xedda84(0x34c)]===_0xedda84(0x56f)?this['select'](0x0):(Input[_0xedda84(0x63c)](),this[_0xedda84(0x15c)]());},Window_NameInput[_0x5443f5(0x353)][_0x5443f5(0x8e9)]=function(){const _0x57f533=_0x5443f5;if(Input[_0x57f533(0x490)]())return _0x57f533(0x56f);return VisuMZ[_0x57f533(0x425)]['Settings'][_0x57f533(0x688)][_0x57f533(0x955)]||'keyboard';},VisuMZ['CoreEngine'][_0x5443f5(0x98e)]=Window_NameInput[_0x5443f5(0x353)][_0x5443f5(0x896)],Window_NameInput['prototype'][_0x5443f5(0x896)]=function(){const _0x232183=_0x5443f5;if(!this[_0x232183(0x85d)]())return;if(!this[_0x232183(0x7a3)])return;if(this[_0x232183(0x34c)]===_0x232183(0x351)&&Input['isGamepadTriggered']())this[_0x232183(0x37a)](_0x232183(0x56f));else{if(Input[_0x232183(0x454)](_0x232183(0x44c))){if('kAqzJ'!==_0x232183(0x739))Input[_0x232183(0x63c)](),this['processBack']();else return this[_0x232183(0x8ed)][_0x232183(0x4ee)](_0x18236f);}else{if(Input['isTriggered'](_0x232183(0x802))){if(_0x232183(0x710)!==_0x232183(0x34a))Input['clear'](),this[_0x232183(0x34c)]==='keyboard'?this[_0x232183(0x37a)]('default'):this['switchModes'](_0x232183(0x351));else return _0x1d99e2[_0x232183(0x6aa)][_0x232183(0x9a3)][_0x232183(0x91b)](this);}else{if(this[_0x232183(0x34c)]===_0x232183(0x351))this[_0x232183(0x862)]();else{if(Input[_0x232183(0x454)]('escape')){if(_0x232183(0x1dc)==='eLlFH'){_0x1bdaa3[_0x232183(0x53d)](_0x453fce,_0x253ebc);const _0x319899=_0x4041f2[_0x232183(0x3aa)]||0x1;_0x46db23[_0x232183(0x8b7)](_0x319899);}else Input[_0x232183(0x63c)](),this[_0x232183(0x37a)](_0x232183(0x351));}else{if(_0x232183(0x319)==='Kkerf')VisuMZ[_0x232183(0x425)]['Window_NameInput_processHandling'][_0x232183(0x91b)](this);else{if(_0x211e6b['subtitle']==='')return![];if(_0x319346[_0x232183(0x82d)]===_0x232183(0x3d8))return![];if(_0x15f380[_0x232183(0x74a)]==='')return![];if(_0x2cceb3[_0x232183(0x74a)]==='0.00')return![];return!![];}}}}}}},VisuMZ['CoreEngine'][_0x5443f5(0x8fd)]=Window_NameInput[_0x5443f5(0x353)]['processTouch'],Window_NameInput[_0x5443f5(0x353)]['processTouch']=function(){const _0x6611d8=_0x5443f5;if(!this['isOpenAndActive']())return;if(this[_0x6611d8(0x34c)]===_0x6611d8(0x351)){if(TouchInput[_0x6611d8(0x732)]()&&this[_0x6611d8(0x17e)]())this[_0x6611d8(0x37a)]('default');else TouchInput[_0x6611d8(0x120)]()&&this[_0x6611d8(0x37a)](_0x6611d8(0x56f));}else VisuMZ[_0x6611d8(0x425)][_0x6611d8(0x8fd)]['call'](this);},Window_NameInput[_0x5443f5(0x353)][_0x5443f5(0x862)]=function(){const _0x5e471b=_0x5443f5;if(Input[_0x5e471b(0x454)](_0x5e471b(0x618)))Input[_0x5e471b(0x63c)](),this[_0x5e471b(0x83d)]();else{if(Input['_inputString']!==undefined){let _0x366849=Input['_inputString'],_0x4f60f3=_0x366849[_0x5e471b(0x44d)];for(let _0x3179de=0x0;_0x3179de<_0x4f60f3;++_0x3179de){if(_0x5e471b(0x898)===_0x5e471b(0x530))_0x30dd6c[_0x5e471b(0x425)][_0x5e471b(0x398)][_0x5e471b(0x91b)](this);else{if(this[_0x5e471b(0x5ad)][_0x5e471b(0x946)](_0x366849[_0x3179de])){if(_0x5e471b(0x232)===_0x5e471b(0x232))SoundManager[_0x5e471b(0x20c)]();else return this[_0x5e471b(0x4e1)];}else{if(_0x5e471b(0x392)!==_0x5e471b(0x63f))SoundManager['playBuzzer']();else{const _0x5b0f82=_0x5e471b(0x70a);this[_0x5e471b(0x436)]=this[_0x5e471b(0x436)]||{};if(this[_0x5e471b(0x436)][_0x5b0f82])return this[_0x5e471b(0x436)][_0x5b0f82];const _0xcde75b=_0x526955['CoreEngine'][_0x5e471b(0x446)][_0x5e471b(0x134)][_0x5e471b(0x760)];return this[_0x5e471b(0x713)](_0x5b0f82,_0xcde75b);}}}}Input[_0x5e471b(0x63c)]();}}},Window_NameInput[_0x5443f5(0x353)][_0x5443f5(0x37a)]=function(_0x5eff14){const _0x1a6eb3=_0x5443f5;let _0x420b09=this[_0x1a6eb3(0x34c)];this[_0x1a6eb3(0x34c)]=_0x5eff14,_0x420b09!==this[_0x1a6eb3(0x34c)]&&(this['refresh'](),SoundManager['playOk'](),this[_0x1a6eb3(0x34c)]===_0x1a6eb3(0x56f)?this[_0x1a6eb3(0x60d)](0x0):this[_0x1a6eb3(0x60d)](-0x1));},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x941)]=Window_NameInput['prototype'][_0x5443f5(0x459)],Window_NameInput['prototype'][_0x5443f5(0x459)]=function(_0x1fab86){const _0x3343b3=_0x5443f5;if(this[_0x3343b3(0x34c)]==='keyboard'&&!Input[_0x3343b3(0x4c6)]())return;if(Input[_0x3343b3(0x89c)]())return;VisuMZ[_0x3343b3(0x425)][_0x3343b3(0x941)][_0x3343b3(0x91b)](this,_0x1fab86),this[_0x3343b3(0x37a)]('default');},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x671)]=Window_NameInput['prototype'][_0x5443f5(0x76a)],Window_NameInput['prototype']['cursorUp']=function(_0x2437e9){const _0xe3b2f1=_0x5443f5;if(this[_0xe3b2f1(0x34c)]==='keyboard'&&!Input[_0xe3b2f1(0x4c6)]())return;if(Input[_0xe3b2f1(0x89c)]())return;VisuMZ[_0xe3b2f1(0x425)][_0xe3b2f1(0x671)][_0xe3b2f1(0x91b)](this,_0x2437e9),this[_0xe3b2f1(0x37a)](_0xe3b2f1(0x56f));},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x46c)]=Window_NameInput[_0x5443f5(0x353)][_0x5443f5(0x586)],Window_NameInput[_0x5443f5(0x353)][_0x5443f5(0x586)]=function(_0x22f782){const _0x59a66d=_0x5443f5;if(this[_0x59a66d(0x34c)]===_0x59a66d(0x351)&&!Input[_0x59a66d(0x4c6)]())return;if(Input[_0x59a66d(0x89c)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorRight'][_0x59a66d(0x91b)](this,_0x22f782),this[_0x59a66d(0x37a)]('default');},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x12b)]=Window_NameInput[_0x5443f5(0x353)]['cursorLeft'],Window_NameInput[_0x5443f5(0x353)]['cursorLeft']=function(_0x331575){const _0xd8adb3=_0x5443f5;if(this[_0xd8adb3(0x34c)]===_0xd8adb3(0x351)&&!Input[_0xd8adb3(0x4c6)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0xd8adb3(0x425)][_0xd8adb3(0x12b)]['call'](this,_0x331575),this['switchModes'](_0xd8adb3(0x56f));},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x375)]=Window_NameInput['prototype'][_0x5443f5(0x127)],Window_NameInput['prototype']['cursorPagedown']=function(){const _0x30da2f=_0x5443f5;if(this[_0x30da2f(0x34c)]===_0x30da2f(0x351))return;if(Input[_0x30da2f(0x89c)]())return;VisuMZ[_0x30da2f(0x425)][_0x30da2f(0x375)][_0x30da2f(0x91b)](this),this[_0x30da2f(0x37a)](_0x30da2f(0x56f));},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x9b1)]=Window_NameInput['prototype'][_0x5443f5(0x239)],Window_NameInput[_0x5443f5(0x353)][_0x5443f5(0x239)]=function(){const _0x3b2f38=_0x5443f5;if(this[_0x3b2f38(0x34c)]===_0x3b2f38(0x351))return;if(Input[_0x3b2f38(0x89c)]())return;VisuMZ[_0x3b2f38(0x425)]['Window_NameInput_cursorPageup']['call'](this),this[_0x3b2f38(0x37a)](_0x3b2f38(0x56f));},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x639)]=Window_NameInput[_0x5443f5(0x353)][_0x5443f5(0x61c)],Window_NameInput[_0x5443f5(0x353)][_0x5443f5(0x61c)]=function(){const _0x59c824=_0x5443f5;if(this[_0x59c824(0x34c)]===_0x59c824(0x351)){if('OFLsZ'!=='PDkYJ'){this[_0x59c824(0x9b6)]['clear'](),this['contentsBack'][_0x59c824(0x63c)](),this[_0x59c824(0xdb)]();let _0x5669d8=VisuMZ['CoreEngine'][_0x59c824(0x446)][_0x59c824(0x688)]['NameInputMessage'][_0x59c824(0x8c3)]('\x0a'),_0x2c957b=_0x5669d8[_0x59c824(0x44d)],_0xa5f85f=(this[_0x59c824(0x547)]-_0x2c957b*this[_0x59c824(0x1eb)]())/0x2;for(let _0x208cf9=0x0;_0x208cf9<_0x2c957b;++_0x208cf9){if(_0x59c824(0x37e)===_0x59c824(0x37e)){let _0x34c6ec=_0x5669d8[_0x208cf9],_0x5ec63f=this['textSizeEx'](_0x34c6ec)[_0x59c824(0x786)],_0x44080a=Math[_0x59c824(0x3fa)]((this[_0x59c824(0x9b6)][_0x59c824(0x786)]-_0x5ec63f)/0x2);this[_0x59c824(0x4cd)](_0x34c6ec,_0x44080a,_0xa5f85f),_0xa5f85f+=this[_0x59c824(0x1eb)]();}else return _0x40cef6;}}else{_0x53beff=_0xb1be50||0xa8,this['resetTextColor']();if(_0x389fab['CoreEngine'][_0x59c824(0x446)]['UI'][_0x59c824(0x6f3)])this['drawTextEx'](_0x1037dc[_0x59c824(0x89d)]()[_0x59c824(0x744)],_0x51196d,_0x8adbd3,_0x50f33a);else{const _0xca2897=_0x18f6be[_0x59c824(0x89d)]()[_0x59c824(0x744)]['replace'](/\\I\[(\d+)\]/gi,'');this[_0x59c824(0x972)](_0xca2897,_0x249e54,_0x69377b,_0x20120f);}}}else _0x59c824(0x978)===_0x59c824(0x978)?VisuMZ['CoreEngine'][_0x59c824(0x639)][_0x59c824(0x91b)](this):(this[_0x59c824(0x63e)]+=_0x51346e[_0x59c824(0x558)]((_0x40a634[_0x59c824(0x99b)]-0x270)/0x2),this[_0x59c824(0x63e)]-=_0x105f2[_0x59c824(0x3fa)]((_0xdd6ad2[_0x59c824(0x99b)]-_0x96bf8e[_0x59c824(0x66f)])/0x2),_0x38a9e5[_0x59c824(0x227)]()?this['_screenX']-=_0x4c33c8[_0x59c824(0x3fa)]((_0x25415a[_0x59c824(0x786)]-_0x5d927e[_0x59c824(0x76c)])/0x2):this[_0x59c824(0x48c)]+=_0x47d27c[_0x59c824(0x558)]((_0x1dc901[_0x59c824(0x76c)]-0x330)/0x2));};};VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x6b2)]=Window_ShopSell[_0x5443f5(0x353)][_0x5443f5(0x162)],Window_ShopSell[_0x5443f5(0x353)][_0x5443f5(0x162)]=function(_0x47e5a3){const _0x4552e7=_0x5443f5;if(VisuMZ[_0x4552e7(0x425)]['Settings'][_0x4552e7(0x5e6)][_0x4552e7(0x86b)]&&DataManager[_0x4552e7(0x6c5)](_0x47e5a3)){if(_0x4552e7(0x42e)!==_0x4552e7(0x908))return![];else{if(!this[_0x4552e7(0x284)]())return;_0x477ae8=_0x102f47||![],_0x3f7de5=_0x1facd9||![];if(_0x7205c5[_0x588ad1]){const _0x28314a={'x':_0x810bcf,'y':_0x36dd14,'animationId':_0x534b9c,'mirror':_0x3035e8,'mute':_0xf4f30c};this[_0x4552e7(0x514)][_0x4552e7(0x747)](_0x28314a);}}}else return VisuMZ['CoreEngine'][_0x4552e7(0x6b2)][_0x4552e7(0x91b)](this,_0x47e5a3);},Window_NumberInput[_0x5443f5(0x353)][_0x5443f5(0x30a)]=function(){return![];};VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x446)][_0x5443f5(0x688)][_0x5443f5(0x4a8)]&&(VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x5e5)]=Window_NumberInput[_0x5443f5(0x353)][_0x5443f5(0x6ee)],Window_NumberInput[_0x5443f5(0x353)][_0x5443f5(0x6ee)]=function(){const _0x548e2b=_0x5443f5;VisuMZ['CoreEngine'][_0x548e2b(0x5e5)]['call'](this),this[_0x548e2b(0x60d)](this['_maxDigits']-0x1),Input['clear']();},VisuMZ['CoreEngine']['Window_NumberInput_processDigitChange']=Window_NumberInput[_0x5443f5(0x353)][_0x5443f5(0x3dc)],Window_NumberInput['prototype'][_0x5443f5(0x3dc)]=function(){const _0x110141=_0x5443f5;if(!this[_0x110141(0x59f)]())return;if(Input[_0x110141(0x89c)]()){if('DrcAb'!==_0x110141(0x6ef))this[_0x110141(0x22e)]();else return this['_battleField']||this;}else{if(Input[_0x110141(0x454)](_0x110141(0x44c)))'qqhgW'!=='rFOca'?this[_0x110141(0x222)]():_0x15855e['initialLevel']=_0x4e2409[_0x110141(0x2cf)](_0x13e880(_0x5887d9['$1']),_0xb26c9b[_0x110141(0x9aa)]);else{if(Input[_0x110141(0x574)]===0x2e)this[_0x110141(0x492)]();else{if(Input[_0x110141(0x574)]===0x24)_0x110141(0x933)!==_0x110141(0x933)?_0x25966e(_0x110141(0x1d3)):this[_0x110141(0x2bd)]();else Input['_inputSpecialKeyCode']===0x23?this[_0x110141(0x8de)]():VisuMZ[_0x110141(0x425)]['Window_NumberInput_processDigitChange'][_0x110141(0x91b)](this);}}}},Window_NumberInput[_0x5443f5(0x353)][_0x5443f5(0x6a1)]=function(){const _0x4017e8=_0x5443f5;if(!this['isCursorMovable']())return;if(Input[_0x4017e8(0x89c)]()){if(_0x4017e8(0x894)===_0x4017e8(0x6ec)){const _0x48a140=_0x4ba743[_0x4017e8(0x408)](_0x194440);_0x440a4b[_0x4017e8(0x1c1)](_0x18456f,!_0x48a140);}else this[_0x4017e8(0x22e)]();}else Window_Selectable[_0x4017e8(0x353)][_0x4017e8(0x6a1)][_0x4017e8(0x91b)](this);},Window_NumberInput[_0x5443f5(0x353)][_0x5443f5(0x3e2)]=function(){},Window_NumberInput['prototype']['processKeyboardDigitChange']=function(){const _0xfd7086=_0x5443f5;if(String(this[_0xfd7086(0x30f)])['length']>=this[_0xfd7086(0x291)])return;const _0x2b8071=Number(String(this['_number'])+Input[_0xfd7086(0x1be)]);if(isNaN(_0x2b8071))return;this[_0xfd7086(0x30f)]=_0x2b8071;const _0x58c24d='9'[_0xfd7086(0x83e)](this[_0xfd7086(0x291)]);this[_0xfd7086(0x30f)]=this['_number']['clamp'](0x0,_0x58c24d),Input[_0xfd7086(0x63c)](),this[_0xfd7086(0x61c)](),SoundManager[_0xfd7086(0x371)](),this['select'](this[_0xfd7086(0x291)]-0x1);},Window_NumberInput[_0x5443f5(0x353)][_0x5443f5(0x222)]=function(){const _0xef7a8f=_0x5443f5;this[_0xef7a8f(0x30f)]=Number(String(this[_0xef7a8f(0x30f)])[_0xef7a8f(0x5e1)](0x0,-0x1)),this[_0xef7a8f(0x30f)]=Math[_0xef7a8f(0x8d5)](0x0,this['_number']),Input[_0xef7a8f(0x63c)](),this['refresh'](),SoundManager[_0xef7a8f(0x371)](),this[_0xef7a8f(0x60d)](this['_maxDigits']-0x1);},Window_NumberInput['prototype'][_0x5443f5(0x492)]=function(){const _0x1c67db=_0x5443f5;this[_0x1c67db(0x30f)]=Number(String(this[_0x1c67db(0x30f)])[_0x1c67db(0x399)](0x1)),this[_0x1c67db(0x30f)]=Math['max'](0x0,this[_0x1c67db(0x30f)]),Input[_0x1c67db(0x63c)](),this[_0x1c67db(0x61c)](),SoundManager[_0x1c67db(0x371)](),this[_0x1c67db(0x60d)](this[_0x1c67db(0x291)]-0x1);},Window_NumberInput[_0x5443f5(0x353)][_0x5443f5(0x2bd)]=function(){const _0x34bd1c=_0x5443f5;if(this['index']()===0x0)return;Input[_0x34bd1c(0x63c)](),this[_0x34bd1c(0x61c)](),SoundManager[_0x34bd1c(0x371)](),this['select'](0x0);},Window_NumberInput[_0x5443f5(0x353)][_0x5443f5(0x8de)]=function(){const _0x307f81=_0x5443f5;if(this[_0x307f81(0x261)]()===this['_maxDigits']-0x1)return;Input[_0x307f81(0x63c)](),this[_0x307f81(0x61c)](),SoundManager[_0x307f81(0x371)](),this[_0x307f81(0x60d)](this['_maxDigits']-0x1);});;VisuMZ['CoreEngine'][_0x5443f5(0x4b2)]=Window_MapName[_0x5443f5(0x353)]['refresh'],Window_MapName[_0x5443f5(0x353)][_0x5443f5(0x61c)]=function(){const _0x1a8dc9=_0x5443f5;VisuMZ[_0x1a8dc9(0x425)][_0x1a8dc9(0x446)][_0x1a8dc9(0x5e6)]['MapNameTextCode']?this[_0x1a8dc9(0x663)]():VisuMZ['CoreEngine'][_0x1a8dc9(0x4b2)][_0x1a8dc9(0x91b)](this);},Window_MapName[_0x5443f5(0x353)][_0x5443f5(0x663)]=function(){const _0x17b1a5=_0x5443f5;this[_0x17b1a5(0x9b6)]['clear']();if($gameMap[_0x17b1a5(0x508)]()){const _0x4e5afa=this['innerWidth'];this[_0x17b1a5(0x57e)](0x0,0x0,_0x4e5afa,this['lineHeight']());const _0x693ae=this[_0x17b1a5(0x59c)]($gameMap[_0x17b1a5(0x508)]())[_0x17b1a5(0x786)];this[_0x17b1a5(0x4cd)]($gameMap[_0x17b1a5(0x508)](),Math[_0x17b1a5(0x3fa)]((_0x4e5afa-_0x693ae)/0x2),0x0);}},Window_TitleCommand[_0x5443f5(0x8b6)]=VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x446)]['TitleCommandList'],Window_TitleCommand[_0x5443f5(0x353)][_0x5443f5(0x273)]=function(){const _0x3f5d09=_0x5443f5;this[_0x3f5d09(0x4b8)]();},Window_TitleCommand[_0x5443f5(0x353)][_0x5443f5(0x4b8)]=function(){const _0x4c0807=_0x5443f5;for(const _0x20526d of Window_TitleCommand[_0x4c0807(0x8b6)]){if('knKhz'!==_0x4c0807(0x500)){if(!this[_0x4c0807(0x22c)]())return;if(this[_0x4c0807(0x9c5)]||this[_0x4c0807(0x230)])return;this[_0x4c0807(0x6c7)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x4c0807(0x9c5)]=new _0x310dac(),this[_0x4c0807(0x230)]=new _0x41a714(),this['addChild'](this[_0x4c0807(0x9c5)]),this['addChild'](this[_0x4c0807(0x230)]);}else{if(_0x20526d[_0x4c0807(0x33d)][_0x4c0807(0x91b)](this)){if(_0x4c0807(0x730)===_0x4c0807(0x7f8)){const _0x159530=this[_0x4c0807(0x77b)]();this[_0x4c0807(0xdb)](),this[_0x4c0807(0x972)](this[_0x4c0807(0x8ed)]['paramValueByName'](_0x22e1da,!![]),_0x5180c1,_0x3d5a32,_0x159530,_0x4c0807(0x66d));}else{const _0x4dff9e=_0x20526d[_0x4c0807(0x848)];let _0xf465ba=_0x20526d[_0x4c0807(0x62d)];if(['',_0x4c0807(0x767)][_0x4c0807(0x53a)](_0xf465ba))_0xf465ba=_0x20526d['TextJS'][_0x4c0807(0x91b)](this);const _0x15645c=_0x20526d[_0x4c0807(0x606)][_0x4c0807(0x91b)](this),_0x3ccd1a=_0x20526d[_0x4c0807(0x310)][_0x4c0807(0x91b)](this);this[_0x4c0807(0x24d)](_0xf465ba,_0x4dff9e,_0x15645c,_0x3ccd1a),this['setHandler'](_0x4dff9e,_0x20526d['CallHandlerJS']['bind'](this,_0x3ccd1a));}}}}},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x14b)]=Window_TitleCommand[_0x5443f5(0x353)][_0x5443f5(0x331)],Window_TitleCommand[_0x5443f5(0x353)][_0x5443f5(0x331)]=function(){const _0x722d28=_0x5443f5;VisuMZ['CoreEngine'][_0x722d28(0x14b)][_0x722d28(0x91b)](this);if(!Window_TitleCommand[_0x722d28(0x6ea)])return;const _0x537b2a=this[_0x722d28(0x354)](Window_TitleCommand[_0x722d28(0x6ea)]),_0x1641b2=Math['floor'](this[_0x722d28(0x89f)]()/0x2)-0x1;this['smoothSelect'](_0x537b2a);if(this[_0x722d28(0x6e0)]>0x1){if(_0x722d28(0x868)===_0x722d28(0x868))this[_0x722d28(0x6e0)]=0x1,this[_0x722d28(0x11c)]();else return _0x52a23b[_0x722d28(0x425)][_0x722d28(0x446)][_0x722d28(0x134)][_0x722d28(0x513)]||_0x722d28(0x661);}this[_0x722d28(0x34b)](_0x537b2a-_0x1641b2);},Window_GameEnd[_0x5443f5(0x8b6)]=VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x446)][_0x5443f5(0x854)][_0x5443f5(0x5d5)][_0x5443f5(0x67b)],Window_GameEnd[_0x5443f5(0x353)][_0x5443f5(0x273)]=function(){const _0x4c7e33=_0x5443f5;this[_0x4c7e33(0x4b8)]();},Window_GameEnd['prototype'][_0x5443f5(0x4b8)]=function(){const _0x24cf0e=_0x5443f5;for(const _0x20e725 of Window_GameEnd['_commandList']){if(_0x24cf0e(0x987)!==_0x24cf0e(0x369)){if(_0x20e725[_0x24cf0e(0x33d)]['call'](this)){const _0x3076d3=_0x20e725[_0x24cf0e(0x848)];let _0x56e7a7=_0x20e725[_0x24cf0e(0x62d)];if(['',_0x24cf0e(0x767)][_0x24cf0e(0x53a)](_0x56e7a7))_0x56e7a7=_0x20e725[_0x24cf0e(0x213)][_0x24cf0e(0x91b)](this);const _0x10563f=_0x20e725['EnableJS'][_0x24cf0e(0x91b)](this),_0xef3759=_0x20e725[_0x24cf0e(0x310)][_0x24cf0e(0x91b)](this);this[_0x24cf0e(0x24d)](_0x56e7a7,_0x3076d3,_0x10563f,_0xef3759),this[_0x24cf0e(0x827)](_0x3076d3,_0x20e725[_0x24cf0e(0x6d2)][_0x24cf0e(0x2ed)](this,_0xef3759));}}else _0x424656['endAnimation']();}};function Window_ButtonAssist(){const _0x563ece=_0x5443f5;this[_0x563ece(0x131)](...arguments);}Window_ButtonAssist[_0x5443f5(0x353)]=Object[_0x5443f5(0x736)](Window_Base[_0x5443f5(0x353)]),Window_ButtonAssist['prototype'][_0x5443f5(0x512)]=Window_ButtonAssist,Window_ButtonAssist[_0x5443f5(0x353)]['initialize']=function(_0x7f2d53){const _0x575925=_0x5443f5;this['_data']={},Window_Base[_0x575925(0x353)]['initialize']['call'](this,_0x7f2d53),this[_0x575925(0x3c0)](VisuMZ[_0x575925(0x425)]['Settings'][_0x575925(0x147)][_0x575925(0x655)]||0x0),this[_0x575925(0x61c)]();},Window_ButtonAssist[_0x5443f5(0x353)][_0x5443f5(0x961)]=function(){const _0x4aca35=_0x5443f5;if(this[_0x4aca35(0x9b6)]['fontSize']<=0x60){if('lglcY'===_0x4aca35(0x69e))this['contents'][_0x4aca35(0x702)]+=0x6;else{if(!this[_0x4aca35(0x4d9)]())return![];else{const _0x106d3c=_0x14bb30['eventsXyNt'](_0xa1fd52,_0x590837)['filter'](_0xc53b39=>_0xc53b39['isNormalPriority']());return _0x106d3c[_0x4aca35(0x44d)]>0x0;}}}},Window_ButtonAssist[_0x5443f5(0x353)][_0x5443f5(0x5ea)]=function(){const _0x28ff33=_0x5443f5;this[_0x28ff33(0x9b6)][_0x28ff33(0x702)]>=0x18&&(this[_0x28ff33(0x9b6)][_0x28ff33(0x702)]-=0x6);},Window_ButtonAssist[_0x5443f5(0x353)][_0x5443f5(0x5f3)]=function(){const _0x2f8894=_0x5443f5;Window_Base['prototype']['update']['call'](this),this[_0x2f8894(0x220)]();},Window_ButtonAssist['prototype'][_0x5443f5(0x957)]=function(){const _0x584b0a=_0x5443f5;this[_0x584b0a(0x25a)]=SceneManager['_scene'][_0x584b0a(0x718)]()!==_0x584b0a(0x76b)?0x0:0x8;},Window_ButtonAssist[_0x5443f5(0x353)][_0x5443f5(0x220)]=function(){const _0x3d8ced=_0x5443f5,_0x53028c=SceneManager[_0x3d8ced(0x970)];for(let _0x15fc3b=0x1;_0x15fc3b<=0x5;_0x15fc3b++){if(this['_data']['key%1'[_0x3d8ced(0x2d3)](_0x15fc3b)]!==_0x53028c[_0x3d8ced(0x3e8)[_0x3d8ced(0x2d3)](_0x15fc3b)]()){if(_0x3d8ced(0x39b)!==_0x3d8ced(0x39b))_0x46546b[_0x3d8ced(0x425)][_0x3d8ced(0x485)][_0x3d8ced(0x91b)](this,_0x4994cf);else return this[_0x3d8ced(0x61c)]();}if(this[_0x3d8ced(0x31e)][_0x3d8ced(0x18c)[_0x3d8ced(0x2d3)](_0x15fc3b)]!==_0x53028c[_0x3d8ced(0x64f)[_0x3d8ced(0x2d3)](_0x15fc3b)]())return this[_0x3d8ced(0x61c)]();}},Window_ButtonAssist['prototype']['refresh']=function(){const _0x3dcb51=_0x5443f5;this[_0x3dcb51(0x9b6)][_0x3dcb51(0x63c)]();for(let _0x512f95=0x1;_0x512f95<=0x5;_0x512f95++){_0x3dcb51(0x763)!==_0x3dcb51(0x763)?_0x54caa4['DrawItemBackgroundJS'][_0x3dcb51(0x91b)](this,_0x291b95):this[_0x3dcb51(0x219)](_0x512f95);}},Window_ButtonAssist['prototype']['drawSegment']=function(_0x126dfd){const _0x149463=_0x5443f5,_0x22fa63=this[_0x149463(0x98d)]/0x5,_0xcc1c34=SceneManager[_0x149463(0x970)],_0x4cedb8=_0xcc1c34['buttonAssistKey%1'[_0x149463(0x2d3)](_0x126dfd)](),_0x432e9d=_0xcc1c34[_0x149463(0x64f)[_0x149463(0x2d3)](_0x126dfd)]();this[_0x149463(0x31e)]['key%1'['format'](_0x126dfd)]=_0x4cedb8,this[_0x149463(0x31e)][_0x149463(0x18c)[_0x149463(0x2d3)](_0x126dfd)]=_0x432e9d;if(_0x4cedb8==='')return;if(_0x432e9d==='')return;const _0x241de0=_0xcc1c34[_0x149463(0x49b)[_0x149463(0x2d3)](_0x126dfd)](),_0x4f1fea=this[_0x149463(0x94a)](),_0x153555=_0x22fa63*(_0x126dfd-0x1)+_0x4f1fea+_0x241de0,_0x387c30=VisuMZ[_0x149463(0x425)][_0x149463(0x446)]['ButtonAssist'][_0x149463(0x7b1)];this['drawTextEx'](_0x387c30[_0x149463(0x2d3)](_0x4cedb8,_0x432e9d),_0x153555,0x0,_0x22fa63-_0x4f1fea*0x2);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x9b0)]=Game_Interpreter['prototype'][_0x5443f5(0x363)],Game_Interpreter[_0x5443f5(0x353)]['updateWaitMode']=function(){const _0x84a487=_0x5443f5;if($gameTemp[_0x84a487(0x334)]!==undefined){if(_0x84a487(0x915)!==_0x84a487(0x450))return VisuMZ[_0x84a487(0x425)][_0x84a487(0x5cf)]();else{const _0x245e0c=_0x3f4430[_0x2a42cb];_0x245e0c?this[_0x84a487(0x71a)](_0x245e0c[_0x84a487(0x797)],0x0):this[_0x84a487(0xea)]();}}return VisuMZ[_0x84a487(0x425)][_0x84a487(0x9b0)][_0x84a487(0x91b)](this);},VisuMZ[_0x5443f5(0x425)]['UpdatePictureCoordinates']=function(){const _0x4a31e0=_0x5443f5,_0x1463af=$gameTemp[_0x4a31e0(0x334)]||0x0;(_0x1463af<0x0||_0x1463af>0x64||TouchInput['isCancelled']()||Input[_0x4a31e0(0x732)](_0x4a31e0(0x1d5)))&&($gameTemp[_0x4a31e0(0x334)]=undefined,Input[_0x4a31e0(0x63c)](),TouchInput[_0x4a31e0(0x63c)]());const _0x2b74f7=$gameScreen[_0x4a31e0(0x8dd)](_0x1463af);return _0x2b74f7&&(_0x2b74f7['_x']=TouchInput['_x'],_0x2b74f7['_y']=TouchInput['_y']),VisuMZ['CoreEngine'][_0x4a31e0(0x387)](),$gameTemp[_0x4a31e0(0x334)]!==undefined;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x387)]=function(){const _0x235acb=_0x5443f5,_0x520c9d=SceneManager[_0x235acb(0x970)];if(!_0x520c9d)return;!_0x520c9d['_pictureCoordinatesWindow']&&(SoundManager[_0x235acb(0x28c)](),_0x520c9d[_0x235acb(0x5e3)]=new Window_PictureCoordinates(),_0x520c9d['addChild'](_0x520c9d[_0x235acb(0x5e3)])),$gameTemp[_0x235acb(0x334)]===undefined&&(SoundManager['playCancel'](),_0x520c9d['removeChild'](_0x520c9d[_0x235acb(0x5e3)]),_0x520c9d[_0x235acb(0x5e3)]=undefined);};function Window_PictureCoordinates(){const _0x36e874=_0x5443f5;this[_0x36e874(0x131)](...arguments);}Window_PictureCoordinates[_0x5443f5(0x353)]=Object[_0x5443f5(0x736)](Window_Base[_0x5443f5(0x353)]),Window_PictureCoordinates[_0x5443f5(0x353)]['constructor']=Window_PictureCoordinates,Window_PictureCoordinates[_0x5443f5(0x353)]['initialize']=function(){const _0x53ef04=_0x5443f5;this[_0x53ef04(0x12c)]=_0x53ef04(0x890),this['_lastX']=_0x53ef04(0x890),this[_0x53ef04(0x8ad)]=_0x53ef04(0x890);const _0x1a2e2d=this[_0x53ef04(0x3fe)]();Window_Base['prototype']['initialize'][_0x53ef04(0x91b)](this,_0x1a2e2d),this[_0x53ef04(0x3c0)](0x2);},Window_PictureCoordinates[_0x5443f5(0x353)][_0x5443f5(0x3fe)]=function(){const _0x444a47=_0x5443f5;let _0x46192c=0x0,_0x5581d6=Graphics[_0x444a47(0x99b)]-this[_0x444a47(0x1eb)](),_0x3c6c59=Graphics[_0x444a47(0x786)],_0x1f230d=this[_0x444a47(0x1eb)]();return new Rectangle(_0x46192c,_0x5581d6,_0x3c6c59,_0x1f230d);},Window_PictureCoordinates[_0x5443f5(0x353)]['updatePadding']=function(){const _0x22aa94=_0x5443f5;this[_0x22aa94(0x25a)]=0x0;},Window_PictureCoordinates[_0x5443f5(0x353)]['update']=function(){const _0x374e29=_0x5443f5;Window_Base[_0x374e29(0x353)][_0x374e29(0x5f3)]['call'](this),this[_0x374e29(0x132)]();},Window_PictureCoordinates[_0x5443f5(0x353)]['updateData']=function(){const _0x824e83=_0x5443f5;if(!this[_0x824e83(0x13b)]())return;this[_0x824e83(0x61c)]();},Window_PictureCoordinates['prototype'][_0x5443f5(0x13b)]=function(){const _0x5200e5=_0x5443f5,_0x266814=$gameTemp[_0x5200e5(0x334)],_0xdc93e1=$gameScreen['picture'](_0x266814);return _0xdc93e1?this[_0x5200e5(0x12c)]!==_0xdc93e1[_0x5200e5(0x825)]||this[_0x5200e5(0x681)]!==_0xdc93e1['_x']||this[_0x5200e5(0x8ad)]!==_0xdc93e1['_y']:'fjfFd'!==_0x5200e5(0x61b)?_0x2954fa[_0x5200e5(0xe4)]([_0x5200e5(0x97a)]):![];},Window_PictureCoordinates[_0x5443f5(0x353)][_0x5443f5(0x61c)]=function(){const _0x1c9c35=_0x5443f5;this[_0x1c9c35(0x9b6)]['clear']();const _0x40e16b=$gameTemp['_pictureCoordinatesMode'],_0x268ba9=$gameScreen[_0x1c9c35(0x8dd)](_0x40e16b);if(!_0x268ba9)return;this['_lastOrigin']=_0x268ba9[_0x1c9c35(0x825)],this[_0x1c9c35(0x681)]=_0x268ba9['_x'],this['_lastY']=_0x268ba9['_y'];const _0xf89045=ColorManager[_0x1c9c35(0x4f3)]();this[_0x1c9c35(0x9b6)][_0x1c9c35(0x1e1)](0x0,0x0,this[_0x1c9c35(0x98d)],this['innerHeight'],_0xf89045);const _0x199c6b=_0x1c9c35(0x636)['format'](_0x268ba9[_0x1c9c35(0x825)]===0x0?_0x1c9c35(0x768):_0x1c9c35(0x43d)),_0x225bd5=_0x1c9c35(0x366)[_0x1c9c35(0x2d3)](_0x268ba9['_x']),_0x1ad191=_0x1c9c35(0x315)[_0x1c9c35(0x2d3)](_0x268ba9['_y']),_0x2f62bc=_0x1c9c35(0x505)['format'](TextManager[_0x1c9c35(0x4f8)]('cancel'));let _0x3c7cb2=Math[_0x1c9c35(0x3fa)](this[_0x1c9c35(0x98d)]/0x4);this[_0x1c9c35(0x972)](_0x199c6b,_0x3c7cb2*0x0,0x0,_0x3c7cb2),this[_0x1c9c35(0x972)](_0x225bd5,_0x3c7cb2*0x1,0x0,_0x3c7cb2,_0x1c9c35(0x380)),this['drawText'](_0x1ad191,_0x3c7cb2*0x2,0x0,_0x3c7cb2,'center');const _0x148942=this['textSizeEx'](_0x2f62bc)['width'],_0x30338f=this[_0x1c9c35(0x98d)]-_0x148942;this[_0x1c9c35(0x4cd)](_0x2f62bc,_0x30338f,0x0,_0x148942);},VisuMZ[_0x5443f5(0x943)]=function(_0x1a7454){const _0x1551fc=_0x5443f5;if(Utils[_0x1551fc(0x491)](_0x1551fc(0x57a))){var _0x362a64=require(_0x1551fc(0x707))[_0x1551fc(0x9ad)][_0x1551fc(0x182)]();SceneManager['showDevTools']();if(_0x1a7454)setTimeout(_0x362a64['focus'][_0x1551fc(0x2ed)](_0x362a64),0x190);}},VisuMZ[_0x5443f5(0x28d)]=function(_0x32d069,_0xbc43a2){const _0x236bf3=_0x5443f5;_0xbc43a2=_0xbc43a2[_0x236bf3(0x1ca)]();var _0x51c941=1.70158,_0x57aa84=0.7;switch(_0xbc43a2){case _0x236bf3(0x697):return _0x32d069;case'INSINE':return-0x1*Math[_0x236bf3(0x285)](_0x32d069*(Math['PI']/0x2))+0x1;case _0x236bf3(0x905):return Math[_0x236bf3(0x965)](_0x32d069*(Math['PI']/0x2));case'INOUTSINE':return-0.5*(Math['cos'](Math['PI']*_0x32d069)-0x1);case'INQUAD':return _0x32d069*_0x32d069;case _0x236bf3(0x942):return _0x32d069*(0x2-_0x32d069);case _0x236bf3(0x1d1):return _0x32d069<0.5?0x2*_0x32d069*_0x32d069:-0x1+(0x4-0x2*_0x32d069)*_0x32d069;case _0x236bf3(0x77a):return _0x32d069*_0x32d069*_0x32d069;case _0x236bf3(0x8f5):var _0x365571=_0x32d069-0x1;return _0x365571*_0x365571*_0x365571+0x1;case'INOUTCUBIC':return _0x32d069<0.5?0x4*_0x32d069*_0x32d069*_0x32d069:(_0x32d069-0x1)*(0x2*_0x32d069-0x2)*(0x2*_0x32d069-0x2)+0x1;case _0x236bf3(0x223):return _0x32d069*_0x32d069*_0x32d069*_0x32d069;case'OUTQUART':var _0x365571=_0x32d069-0x1;return 0x1-_0x365571*_0x365571*_0x365571*_0x365571;case _0x236bf3(0x721):var _0x365571=_0x32d069-0x1;return _0x32d069<0.5?0x8*_0x32d069*_0x32d069*_0x32d069*_0x32d069:0x1-0x8*_0x365571*_0x365571*_0x365571*_0x365571;case'INQUINT':return _0x32d069*_0x32d069*_0x32d069*_0x32d069*_0x32d069;case'OUTQUINT':var _0x365571=_0x32d069-0x1;return 0x1+_0x365571*_0x365571*_0x365571*_0x365571*_0x365571;case _0x236bf3(0x475):var _0x365571=_0x32d069-0x1;return _0x32d069<0.5?0x10*_0x32d069*_0x32d069*_0x32d069*_0x32d069*_0x32d069:0x1+0x10*_0x365571*_0x365571*_0x365571*_0x365571*_0x365571;case _0x236bf3(0x6fe):if(_0x32d069===0x0)return 0x0;return Math['pow'](0x2,0xa*(_0x32d069-0x1));case _0x236bf3(0x2dd):if(_0x32d069===0x1)return _0x236bf3(0x115)==='DfxNW'?this[_0x236bf3(0x970)]&&this[_0x236bf3(0x970)][_0x236bf3(0x512)]===_0x7ab163:0x1;return-Math[_0x236bf3(0x7ad)](0x2,-0xa*_0x32d069)+0x1;case _0x236bf3(0x9e2):if(_0x32d069===0x0||_0x32d069===0x1)return _0x236bf3(0x4f0)!=='DmAev'?_0x32d069:_0x5157b0[_0x236bf3(0x85c)][_0x236bf3(0x91b)](this);var _0x376159=_0x32d069*0x2,_0x4ee9a9=_0x376159-0x1;if(_0x376159<0x1)return 0.5*Math[_0x236bf3(0x7ad)](0x2,0xa*_0x4ee9a9);return 0.5*(-Math[_0x236bf3(0x7ad)](0x2,-0xa*_0x4ee9a9)+0x2);case'INCIRC':var _0x376159=_0x32d069/0x1;return-0x1*(Math[_0x236bf3(0x48b)](0x1-_0x376159*_0x32d069)-0x1);case'OUTCIRC':var _0x365571=_0x32d069-0x1;return Math['sqrt'](0x1-_0x365571*_0x365571);case _0x236bf3(0x4b7):var _0x376159=_0x32d069*0x2,_0x4ee9a9=_0x376159-0x2;if(_0x376159<0x1)return-0.5*(Math[_0x236bf3(0x48b)](0x1-_0x376159*_0x376159)-0x1);return 0.5*(Math[_0x236bf3(0x48b)](0x1-_0x4ee9a9*_0x4ee9a9)+0x1);case _0x236bf3(0x8cf):return _0x32d069*_0x32d069*((_0x51c941+0x1)*_0x32d069-_0x51c941);case _0x236bf3(0x34d):var _0x376159=_0x32d069/0x1-0x1;return _0x376159*_0x376159*((_0x51c941+0x1)*_0x376159+_0x51c941)+0x1;break;case _0x236bf3(0x5c0):var _0x376159=_0x32d069*0x2,_0x11b35a=_0x376159-0x2,_0x2970e6=_0x51c941*1.525;if(_0x376159<0x1){if(_0x236bf3(0x792)===_0x236bf3(0x189)){const _0x10deff=_0x2f7995[_0x236bf3(0x2c9)]?(_0xa0ac19[_0x236bf3(0x353)][_0x236bf3(0x81c)]()+0x6)*0x2:0x0,_0x4fa216=this['buttonY'](),_0x14309c=_0x39fee1['boxWidth']-_0x10deff*0x2,_0x5d14cc=this[_0x236bf3(0x9e4)]();return new _0x7b0401(_0x10deff,_0x4fa216,_0x14309c,_0x5d14cc);}else return 0.5*_0x376159*_0x376159*((_0x2970e6+0x1)*_0x376159-_0x2970e6);}return 0.5*(_0x11b35a*_0x11b35a*((_0x2970e6+0x1)*_0x11b35a+_0x2970e6)+0x2);case _0x236bf3(0x144):if(_0x32d069===0x0||_0x32d069===0x1){if(_0x236bf3(0x11b)!=='jRBew')_0x50b66e[_0x236bf3(0x425)][_0x236bf3(0x5c9)][_0x236bf3(0x91b)](this,_0x43faef);else return _0x32d069;}var _0x376159=_0x32d069/0x1,_0x4ee9a9=_0x376159-0x1,_0x294b31=0x1-_0x57aa84,_0x2970e6=_0x294b31/(0x2*Math['PI'])*Math['asin'](0x1);return-(Math['pow'](0x2,0xa*_0x4ee9a9)*Math[_0x236bf3(0x965)]((_0x4ee9a9-_0x2970e6)*(0x2*Math['PI'])/_0x294b31));case _0x236bf3(0x679):var _0x294b31=0x1-_0x57aa84,_0x376159=_0x32d069*0x2;if(_0x32d069===0x0||_0x32d069===0x1)return _0x32d069;var _0x2970e6=_0x294b31/(0x2*Math['PI'])*Math[_0x236bf3(0x165)](0x1);return Math[_0x236bf3(0x7ad)](0x2,-0xa*_0x376159)*Math[_0x236bf3(0x965)]((_0x376159-_0x2970e6)*(0x2*Math['PI'])/_0x294b31)+0x1;case'INOUTELASTIC':var _0x294b31=0x1-_0x57aa84;if(_0x32d069===0x0||_0x32d069===0x1)return _0x32d069;var _0x376159=_0x32d069*0x2,_0x4ee9a9=_0x376159-0x1,_0x2970e6=_0x294b31/(0x2*Math['PI'])*Math[_0x236bf3(0x165)](0x1);if(_0x376159<0x1)return-0.5*(Math['pow'](0x2,0xa*_0x4ee9a9)*Math['sin']((_0x4ee9a9-_0x2970e6)*(0x2*Math['PI'])/_0x294b31));return Math[_0x236bf3(0x7ad)](0x2,-0xa*_0x4ee9a9)*Math[_0x236bf3(0x965)]((_0x4ee9a9-_0x2970e6)*(0x2*Math['PI'])/_0x294b31)*0.5+0x1;case'OUTBOUNCE':var _0x376159=_0x32d069/0x1;if(_0x376159<0x1/2.75)return 7.5625*_0x376159*_0x376159;else{if(_0x376159<0x2/2.75){if('fBjtT'===_0x236bf3(0x323)){if(typeof _0x3c009c===_0x236bf3(0x19f))_0x40f581[_0x236bf3(0x306)]['quit']();}else{var _0x11b35a=_0x376159-1.5/2.75;return 7.5625*_0x11b35a*_0x11b35a+0.75;}}else{if(_0x376159<2.5/2.75){var _0x11b35a=_0x376159-2.25/2.75;return 7.5625*_0x11b35a*_0x11b35a+0.9375;}else{if('tOSzm'!=='aGvjY'){var _0x11b35a=_0x376159-2.625/2.75;return 7.5625*_0x11b35a*_0x11b35a+0.984375;}else this[_0x236bf3(0x727)]()?this[_0x236bf3(0x6fc)]():_0x437cf3[_0x236bf3(0x425)][_0x236bf3(0x5b1)][_0x236bf3(0x91b)](this);}}}case'INBOUNCE':var _0x38805c=0x1-VisuMZ[_0x236bf3(0x28d)](0x1-_0x32d069,_0x236bf3(0x591));return _0x38805c;case _0x236bf3(0x326):if(_0x32d069<0.5){if(_0x236bf3(0x9ac)!==_0x236bf3(0x7a7))var _0x38805c=VisuMZ[_0x236bf3(0x28d)](_0x32d069*0x2,_0x236bf3(0x948))*0.5;else{if(_0x456092[_0x236bf3(0x1af)])return;}}else var _0x38805c=VisuMZ['ApplyEasing'](_0x32d069*0x2-0x1,'outbounce')*0.5+0.5;return _0x38805c;default:return _0x32d069;}},VisuMZ[_0x5443f5(0x8a0)]=function(_0x38d7bf){const _0x34c1a5=_0x5443f5;_0x38d7bf=String(_0x38d7bf)['toUpperCase']();const _0x303b86=VisuMZ['CoreEngine']['Settings'][_0x34c1a5(0x36a)];if(_0x38d7bf==='MAXHP')return _0x303b86[_0x34c1a5(0x81d)];if(_0x38d7bf==='MAXMP')return _0x303b86[_0x34c1a5(0x13c)];if(_0x38d7bf===_0x34c1a5(0x32d))return _0x303b86[_0x34c1a5(0x57b)];if(_0x38d7bf==='DEF')return _0x303b86[_0x34c1a5(0x12f)];if(_0x38d7bf===_0x34c1a5(0x1d7))return _0x303b86[_0x34c1a5(0x27b)];if(_0x38d7bf===_0x34c1a5(0x420))return _0x303b86['IconParam5'];if(_0x38d7bf===_0x34c1a5(0x579))return _0x303b86[_0x34c1a5(0x8eb)];if(_0x38d7bf===_0x34c1a5(0x793))return _0x303b86[_0x34c1a5(0x5c4)];if(_0x38d7bf===_0x34c1a5(0x180))return _0x303b86['IconXParam0'];if(_0x38d7bf===_0x34c1a5(0x782))return _0x303b86['IconXParam1'];if(_0x38d7bf==='CRI')return _0x303b86['IconXParam2'];if(_0x38d7bf===_0x34c1a5(0x423))return _0x303b86[_0x34c1a5(0x211)];if(_0x38d7bf===_0x34c1a5(0x265))return _0x303b86[_0x34c1a5(0x31c)];if(_0x38d7bf==='MRF')return _0x303b86[_0x34c1a5(0x984)];if(_0x38d7bf==='CNT')return _0x303b86[_0x34c1a5(0x308)];if(_0x38d7bf===_0x34c1a5(0x164))return _0x303b86['IconXParam7'];if(_0x38d7bf===_0x34c1a5(0x90d))return _0x303b86['IconXParam8'];if(_0x38d7bf===_0x34c1a5(0x5c5))return _0x303b86['IconXParam9'];if(_0x38d7bf===_0x34c1a5(0x64a))return _0x303b86[_0x34c1a5(0x393)];if(_0x38d7bf===_0x34c1a5(0x2f2))return _0x303b86[_0x34c1a5(0x278)];if(_0x38d7bf==='REC')return _0x303b86[_0x34c1a5(0x938)];if(_0x38d7bf==='PHA')return _0x303b86[_0x34c1a5(0x8dc)];if(_0x38d7bf===_0x34c1a5(0x830))return _0x303b86[_0x34c1a5(0x184)];if(_0x38d7bf===_0x34c1a5(0xef))return _0x303b86[_0x34c1a5(0x652)];if(_0x38d7bf===_0x34c1a5(0x413))return _0x303b86[_0x34c1a5(0x4ec)];if(_0x38d7bf===_0x34c1a5(0x47d))return _0x303b86[_0x34c1a5(0x5d1)];if(_0x38d7bf===_0x34c1a5(0x2ae))return _0x303b86[_0x34c1a5(0x61a)];if(_0x38d7bf===_0x34c1a5(0x89a))return _0x303b86[_0x34c1a5(0x6cc)];if(VisuMZ[_0x34c1a5(0x425)][_0x34c1a5(0x47a)][_0x38d7bf])return VisuMZ['CoreEngine'][_0x34c1a5(0x47a)][_0x38d7bf]||0x0;return 0x0;},VisuMZ[_0x5443f5(0x43a)]=function(_0xaed5c6,_0x19ced3,_0x9d4f62){const _0x4346ea=_0x5443f5;if(_0x9d4f62===undefined&&_0xaed5c6%0x1===0x0)return _0xaed5c6;if(_0x9d4f62!==undefined&&[_0x4346ea(0x60f),_0x4346ea(0x5da),'ATK',_0x4346ea(0x5ec),_0x4346ea(0x1d7),_0x4346ea(0x420),'AGI',_0x4346ea(0x793)][_0x4346ea(0x53a)](String(_0x9d4f62)['toUpperCase']()[_0x4346ea(0x7b7)]()))return _0xaed5c6;_0x19ced3=_0x19ced3||0x0;if(VisuMZ[_0x4346ea(0x425)][_0x4346ea(0x8db)][_0x9d4f62])return'FgYBM'===_0x4346ea(0x4d3)?this[_0x4346ea(0x23b)]()?_0x5185fd['CoreEngine'][_0x4346ea(0x3ed)][_0x4346ea(0x91b)](this):0x0:VisuMZ[_0x4346ea(0x425)][_0x4346ea(0x143)][_0x9d4f62]===_0x4346ea(0x531)?_0xaed5c6:_0x4346ea(0x7d4)===_0x4346ea(0x99d)?_0x463475['getInputButtonString'](_0x4346ea(0x1d5)):String((_0xaed5c6*0x64)[_0x4346ea(0x564)](_0x19ced3))+'%';return String((_0xaed5c6*0x64)[_0x4346ea(0x564)](_0x19ced3))+'%';},VisuMZ['GroupDigits']=function(_0x3550ab){const _0x1f45ae=_0x5443f5;_0x3550ab=String(_0x3550ab);if(!_0x3550ab)return _0x3550ab;if(typeof _0x3550ab!==_0x1f45ae(0x21f))return _0x3550ab;const _0x29affb=VisuMZ[_0x1f45ae(0x425)][_0x1f45ae(0x446)][_0x1f45ae(0x5e6)][_0x1f45ae(0x4b6)]||_0x1f45ae(0x1bc),_0x2f2926={'maximumFractionDigits':0x6};_0x3550ab=_0x3550ab[_0x1f45ae(0x6d0)](/\[(.*?)\]/g,(_0x43cd25,_0x45b489)=>{const _0x2720b3=_0x1f45ae;return VisuMZ[_0x2720b3(0x362)](_0x45b489,'[',']');}),_0x3550ab=_0x3550ab['replace'](/<(.*?)>/g,(_0x2047d5,_0x3e3ad2)=>{return VisuMZ['PreserveNumbers'](_0x3e3ad2,'<','>');}),_0x3550ab=_0x3550ab[_0x1f45ae(0x6d0)](/\{\{(.*?)\}\}/g,(_0x1dcfa7,_0x3d2578)=>{const _0x1670c9=_0x1f45ae;if(_0x1670c9(0x9bf)==='igtbF')return VisuMZ['PreserveNumbers'](_0x3d2578,'','');else{const _0xef8ecd=_0x13eea3[_0x1670c9(0x3e7)](_0x2073bc,_0x1670c9(0x49f));}}),_0x3550ab=_0x3550ab[_0x1f45ae(0x6d0)](/(\d+\.?\d*)/g,(_0x22749e,_0x472e86)=>{const _0x2cc47c=_0x1f45ae;if(_0x2cc47c(0x690)===_0x2cc47c(0x690)){let _0x5212a7=_0x472e86;if(_0x5212a7[0x0]==='0')return _0x5212a7;if(_0x5212a7[_0x5212a7['length']-0x1]==='.')return _0x2cc47c(0x43b)===_0x2cc47c(0x43b)?Number(_0x5212a7)[_0x2cc47c(0x593)](_0x29affb,_0x2f2926)+'.':_0x823a52[_0x2cc47c(0x425)][_0x2cc47c(0x53b)]['call'](this);else return _0x5212a7[_0x5212a7['length']-0x1]===','?Number(_0x5212a7)[_0x2cc47c(0x593)](_0x29affb,_0x2f2926)+',':Number(_0x5212a7)[_0x2cc47c(0x593)](_0x29affb,_0x2f2926);}else _0x345c8c['areButtonsHidden']()||this[_0x2cc47c(0x41c)]?this[_0x2cc47c(0x812)]():_0x55221c['CoreEngine'][_0x2cc47c(0x521)][_0x2cc47c(0x91b)](this);});let _0x3be927=0x3;while(_0x3be927--){_0x3550ab=VisuMZ[_0x1f45ae(0x2a6)](_0x3550ab);}return _0x3550ab;},VisuMZ['PreserveNumbers']=function(_0x1488b3,_0x25fe97,_0x8a27d2){const _0x3df35f=_0x5443f5;return _0x1488b3=_0x1488b3[_0x3df35f(0x6d0)](/(\d)/gi,(_0x13a0a9,_0x83a2fd)=>'PRESERVCONVERSION(%1)'[_0x3df35f(0x2d3)](Number(_0x83a2fd))),_0x3df35f(0x439)[_0x3df35f(0x2d3)](_0x1488b3,_0x25fe97,_0x8a27d2);},VisuMZ['RevertPreserveNumbers']=function(_0x2610fb){const _0x255555=_0x5443f5;return _0x2610fb=_0x2610fb[_0x255555(0x6d0)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x4ddbda,_0x5eda3d)=>Number(parseInt(_0x5eda3d))),_0x2610fb;},VisuMZ[_0x5443f5(0x9c3)]=function(_0x27c424){const _0x194994=_0x5443f5;SoundManager['playOk']();if(!Utils[_0x194994(0x630)]()){const _0x57cdad=window[_0x194994(0x3e7)](_0x27c424,_0x194994(0x49f));}else{const _0x4d1070=process['platform']=='darwin'?_0x194994(0x3e7):process['platform']==_0x194994(0x785)?_0x194994(0x6ee):_0x194994(0x4b0);require(_0x194994(0x28f))['exec'](_0x4d1070+'\x20'+_0x27c424);}},VisuMZ[_0x5443f5(0x1ba)]=function(_0x2c6543,_0x477531){const _0x4b3fbd=_0x5443f5;if(!_0x2c6543)return'';const _0x81b015=_0x2c6543[_0x4b3fbd(0x98f)]||_0x2c6543['id'];let _0x5c4fb6='';_0x2c6543[_0x4b3fbd(0x4c3)]!==undefined&&_0x2c6543[_0x4b3fbd(0x41f)]!==undefined&&('kGsoi'==='IJOfV'?(_0x3d40d1['pitch']=_0x373281,_0x1c9395[_0x4b3fbd(0x982)]=_0x11752a[_0x4b3fbd(0x4ae)][_0x4b3fbd(0x4e4)](),_0x59264c[_0x4b3fbd(0x7ab)](_0x42ca19),_0x9a5e1c[_0x4b3fbd(0x129)](_0x28df6f,_0xa7e345['pos']),_0x1aad03[_0x4b3fbd(0x4ae)][_0x4b3fbd(0x4d0)](_0x53afe4[_0x4b3fbd(0x982)])):_0x5c4fb6='Actor-%1-%2'[_0x4b3fbd(0x2d3)](_0x81b015,_0x477531));_0x2c6543['expParams']!==undefined&&_0x2c6543[_0x4b3fbd(0x5f6)]!==undefined&&(_0x5c4fb6='Class-%1-%2'[_0x4b3fbd(0x2d3)](_0x81b015,_0x477531));if(_0x2c6543[_0x4b3fbd(0x2b4)]!==undefined&&_0x2c6543[_0x4b3fbd(0x97c)]!==undefined){if(_0x4b3fbd(0x17d)!==_0x4b3fbd(0x406))_0x5c4fb6=_0x4b3fbd(0x5df)[_0x4b3fbd(0x2d3)](_0x81b015,_0x477531);else return _0x34e67e[_0x4b3fbd(0x6aa)][_0x4b3fbd(0x2e8)][_0x4b3fbd(0x91b)](this);}return _0x2c6543[_0x4b3fbd(0x1fa)]!==undefined&&_0x2c6543['consumable']!==undefined&&(_0x5c4fb6=_0x4b3fbd(0x2f8)['format'](_0x81b015,_0x477531)),_0x2c6543[_0x4b3fbd(0x542)]!==undefined&&_0x2c6543[_0x4b3fbd(0x4a4)]===0x1&&(_0x5c4fb6='Weapon-%1-%2'[_0x4b3fbd(0x2d3)](_0x81b015,_0x477531)),_0x2c6543['atypeId']!==undefined&&_0x2c6543[_0x4b3fbd(0x4a4)]>0x1&&(_0x5c4fb6=_0x4b3fbd(0x8a8)['format'](_0x81b015,_0x477531)),_0x2c6543[_0x4b3fbd(0x4ef)]!==undefined&&_0x2c6543[_0x4b3fbd(0x457)]!==undefined&&(_0x4b3fbd(0x41b)!==_0x4b3fbd(0x336)?_0x5c4fb6=_0x4b3fbd(0x7b6)[_0x4b3fbd(0x2d3)](_0x81b015,_0x477531):(this[_0x4b3fbd(0x255)]=_0x5cd6f7,this[_0x4b3fbd(0x8af)]=_0x32f57a[_0x4b3fbd(0x525)](this['_anchor']))),_0x2c6543['autoRemovalTiming']!==undefined&&_0x2c6543[_0x4b3fbd(0x3c4)]!==undefined&&(_0x4b3fbd(0x821)!=='FQIDz'?_0x2cd524+=_0x4b3fbd(0x26b):_0x5c4fb6=_0x4b3fbd(0x207)[_0x4b3fbd(0x2d3)](_0x81b015,_0x477531)),_0x5c4fb6;},Game_Picture[_0x5443f5(0x353)]['anchor']=function(){return this['_anchor'];},VisuMZ['CoreEngine'][_0x5443f5(0x248)]=Game_Picture['prototype'][_0x5443f5(0xe3)],Game_Picture[_0x5443f5(0x353)][_0x5443f5(0xe3)]=function(){const _0x594c0e=_0x5443f5;VisuMZ[_0x594c0e(0x425)][_0x594c0e(0x248)]['call'](this),this[_0x594c0e(0x255)]={'x':0x0,'y':0x0},this[_0x594c0e(0x8af)]={'x':0x0,'y':0x0};},VisuMZ[_0x5443f5(0x425)]['Game_Picture_updateMove']=Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x2e5)],Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x2e5)]=function(){const _0x4b9834=_0x5443f5;this[_0x4b9834(0x390)]();const _0x4b821a=this[_0x4b9834(0x9af)];VisuMZ['CoreEngine'][_0x4b9834(0x2d2)]['call'](this);if(_0x4b821a>0x0&&this[_0x4b9834(0x9af)]<=0x0){this['_x']=this[_0x4b9834(0x199)],this['_y']=this[_0x4b9834(0x36d)],this[_0x4b9834(0x78e)]=this[_0x4b9834(0x373)],this[_0x4b9834(0x47e)]=this[_0x4b9834(0x267)],this['_opacity']=this[_0x4b9834(0x55c)];if(this[_0x4b9834(0x255)]){if('Wrutn'===_0x4b9834(0x29a))return 0x0;else this[_0x4b9834(0x255)]['x']=this['_targetAnchor']['x'],this[_0x4b9834(0x255)]['y']=this[_0x4b9834(0x8af)]['y'];}}},VisuMZ[_0x5443f5(0x425)]['Game_Picture_show']=Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x2f3)],Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x2f3)]=function(_0x8622c6,_0x341df2,_0xd863b9,_0x401b39,_0x320704,_0x18bc3b,_0x2e5d4c,_0x3a8b2c){const _0x461a3b=_0x5443f5;VisuMZ[_0x461a3b(0x425)][_0x461a3b(0x38e)]['call'](this,_0x8622c6,_0x341df2,_0xd863b9,_0x401b39,_0x320704,_0x18bc3b,_0x2e5d4c,_0x3a8b2c),this[_0x461a3b(0x976)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x341df2]||{'x':0x0,'y':0x0});},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x55a)]=Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x26e)],Game_Picture[_0x5443f5(0x353)][_0x5443f5(0x26e)]=function(_0x26f171,_0x425adf,_0x1d194d,_0x8ea011,_0x441a76,_0x579ceb,_0x2079ef,_0x4067eb,_0x3627ae){const _0x1ca7d8=_0x5443f5;VisuMZ[_0x1ca7d8(0x425)][_0x1ca7d8(0x55a)]['call'](this,_0x26f171,_0x425adf,_0x1d194d,_0x8ea011,_0x441a76,_0x579ceb,_0x2079ef,_0x4067eb,_0x3627ae),this[_0x1ca7d8(0x6b9)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x26f171]||{'x':0x0,'y':0x0});},Game_Picture[_0x5443f5(0x353)]['updateAnchor']=function(){const _0x3124fb=_0x5443f5;this[_0x3124fb(0x9af)]>0x0&&(this['_anchor']['x']=this['applyEasing'](this[_0x3124fb(0x255)]['x'],this[_0x3124fb(0x8af)]['x']),this[_0x3124fb(0x255)]['y']=this['applyEasing'](this[_0x3124fb(0x255)]['y'],this[_0x3124fb(0x8af)]['y']));},Game_Picture['prototype'][_0x5443f5(0x976)]=function(_0x50d8f9){const _0x27de30=_0x5443f5;this['_anchor']=_0x50d8f9,this[_0x27de30(0x8af)]=JsonEx[_0x27de30(0x525)](this[_0x27de30(0x255)]);},Game_Picture['prototype']['setTargetAnchor']=function(_0x35cc63){const _0x4785d1=_0x5443f5;this[_0x4785d1(0x8af)]=_0x35cc63;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x2d6)]=Sprite_Picture['prototype']['updateOrigin'],Sprite_Picture[_0x5443f5(0x353)][_0x5443f5(0x5f0)]=function(){const _0x4c6340=_0x5443f5,_0x4ab447=this[_0x4c6340(0x8dd)]();!_0x4ab447[_0x4c6340(0x214)]()?VisuMZ[_0x4c6340(0x425)][_0x4c6340(0x2d6)]['call'](this):(this[_0x4c6340(0x214)]['x']=_0x4ab447[_0x4c6340(0x214)]()['x'],this[_0x4c6340(0x214)]['y']=_0x4ab447['anchor']()['y']);},Game_Action[_0x5443f5(0x353)][_0x5443f5(0x5d6)]=function(_0x5c2960){const _0x2e8879=_0x5443f5;if(_0x5c2960){if(_0x2e8879(0x6be)!==_0x2e8879(0x6be))_0x5940b2=this['helpAreaTopSideButtonLayout']();else{const _0x4e068d=_0x5c2960[_0x2e8879(0x321)];if(_0x4e068d===0x1&&this[_0x2e8879(0x8fb)]()[_0x2e8879(0x885)]()!==0x1){if('dAeoc'!==_0x2e8879(0x386))this[_0x2e8879(0x4d1)]();else{if(_0x1024f7)_0x1768d4[_0x2e8879(0x5ac)](_0x3da858);}}else _0x4e068d===0x2&&this[_0x2e8879(0x8fb)]()['guardSkillId']()!==0x2?this[_0x2e8879(0x27a)]():this[_0x2e8879(0x93d)](_0x4e068d);}}else this[_0x2e8879(0x63c)]();},Game_Actor['prototype'][_0x5443f5(0x13e)]=function(){const _0x18a443=_0x5443f5;return this['skills']()['filter'](_0x47e979=>this['canUse'](_0x47e979)&&this[_0x18a443(0x2de)]()[_0x18a443(0x53a)](_0x47e979[_0x18a443(0x2b4)]));},Window_Base[_0x5443f5(0x353)][_0x5443f5(0x95f)]=function(){const _0x18f44f=_0x5443f5;this[_0x18f44f(0x25f)]=new Sprite(),this['_dimmerSprite'][_0x18f44f(0x55f)]=new Bitmap(0x0,0x0),this[_0x18f44f(0x25f)]['x']=0x0,this[_0x18f44f(0x477)](this[_0x18f44f(0x25f)]);},Window_Base[_0x5443f5(0x353)]['refreshDimmerBitmap']=function(){const _0x50e74a=_0x5443f5;if(this[_0x50e74a(0x25f)]){const _0x16f2c2=this[_0x50e74a(0x25f)]['bitmap'],_0x32b998=this[_0x50e74a(0x786)],_0x589ed3=this[_0x50e74a(0x99b)],_0x577651=this[_0x50e74a(0x25a)],_0x3fcc4a=ColorManager[_0x50e74a(0x294)](),_0x231fc5=ColorManager['dimColor2']();_0x16f2c2[_0x50e74a(0x2ab)](_0x32b998,_0x589ed3),_0x16f2c2[_0x50e74a(0x645)](0x0,0x0,_0x32b998,_0x577651,_0x231fc5,_0x3fcc4a,!![]),_0x16f2c2[_0x50e74a(0x1e1)](0x0,_0x577651,_0x32b998,_0x589ed3-_0x577651*0x2,_0x3fcc4a),_0x16f2c2[_0x50e74a(0x645)](0x0,_0x589ed3-_0x577651,_0x32b998,_0x577651,_0x3fcc4a,_0x231fc5,!![]),this[_0x50e74a(0x25f)][_0x50e74a(0x621)](0x0,0x0,_0x32b998,_0x589ed3);}},Game_Actor[_0x5443f5(0x353)][_0x5443f5(0x4f1)]=function(){const _0x1ffdc1=_0x5443f5;for(let _0x3ab972=0x0;_0x3ab972<this['numActions']();_0x3ab972++){const _0x4ef221=this['makeActionList']();let _0x596648=Number['MIN_SAFE_INTEGER'];this[_0x1ffdc1(0x463)](_0x3ab972,_0x4ef221[0x0]);for(const _0x3773b8 of _0x4ef221){if(_0x1ffdc1(0x438)!==_0x1ffdc1(0x438)){const _0x2c2108=new _0x20f0e4(_0x7c3de6);this[_0x1ffdc1(0x83f)](_0x2c2108);}else{const _0x369c9d=_0x3773b8['evaluate']();_0x369c9d>_0x596648&&(_0x1ffdc1(0x4f5)!==_0x1ffdc1(0x4f5)?(_0x2a3cb4[_0x1ffdc1(0x425)]['Game_Picture_updateRotation'][_0x1ffdc1(0x91b)](this),this['updateAnglePlus']()):(_0x596648=_0x369c9d,this[_0x1ffdc1(0x463)](_0x3ab972,_0x3773b8)));}}}this['setActionState']('waiting');},Window_BattleItem['prototype'][_0x5443f5(0x162)]=function(_0x51803b){const _0x55df2f=_0x5443f5;if(BattleManager['actor']())return BattleManager[_0x55df2f(0x539)]()['canUse'](_0x51803b);else{if('NbxwC'==='NbxwC')return Window_ItemList['prototype'][_0x55df2f(0x162)]['call'](this,_0x51803b);else _0x551d28[_0x55df2f(0x425)][_0x55df2f(0x7f1)][_0x55df2f(0x91b)](this,_0x2669ff,_0x4e8457),this[_0x55df2f(0x462)]=!(_0x2c23bc[_0x55df2f(0x425)][_0x55df2f(0x446)][_0x55df2f(0x5e6)][_0x55df2f(0x8a6)]??!![]);}},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x65a)]=Scene_Map[_0x5443f5(0x353)][_0x5443f5(0x257)],Scene_Map['prototype']['createSpriteset']=function(){const _0x305d13=_0x5443f5;VisuMZ['CoreEngine'][_0x305d13(0x65a)][_0x305d13(0x91b)](this);const _0x12b7f5=this['_spriteset']['_timerSprite'];if(_0x12b7f5)this[_0x305d13(0x83f)](_0x12b7f5);},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x1cd)]=Scene_Battle['prototype'][_0x5443f5(0x257)],Scene_Battle[_0x5443f5(0x353)][_0x5443f5(0x257)]=function(){const _0x1a201b=_0x5443f5;VisuMZ[_0x1a201b(0x425)][_0x1a201b(0x1cd)]['call'](this);const _0xbaa356=this[_0x1a201b(0x881)]['_timerSprite'];if(_0xbaa356)this[_0x1a201b(0x83f)](_0xbaa356);},Sprite_Actor[_0x5443f5(0x353)][_0x5443f5(0x5f3)]=function(){const _0x338504=_0x5443f5;Sprite_Battler[_0x338504(0x353)][_0x338504(0x5f3)][_0x338504(0x91b)](this),this['updateShadow']();if(this[_0x338504(0x8ed)]){if(_0x338504(0x9d6)==='KnDIB'){if(this['_movementDuration']<=0x0)return;const _0x267c3d=this[_0x338504(0x55d)],_0x52f34f=this[_0x338504(0x95a)],_0x2ba5ef=this[_0x338504(0x6cb)];this[_0x338504(0x997)]=this[_0x338504(0x8e2)](this[_0x338504(0x997)],this[_0x338504(0x3c1)],_0x267c3d,_0x52f34f,_0x2ba5ef),this[_0x338504(0x453)]=this[_0x338504(0x8e2)](this[_0x338504(0x453)],this[_0x338504(0x361)],_0x267c3d,_0x52f34f,_0x2ba5ef),this[_0x338504(0x55d)]--;if(this['_movementDuration']<=0x0)this['onMoveEnd']();}else this[_0x338504(0x87a)]();}else this['_battlerName']!==''&&(_0x338504(0x5ee)===_0x338504(0x16f)?this[_0x338504(0x219)](_0x24b501):this[_0x338504(0x15a)]='');},Window[_0x5443f5(0x353)][_0x5443f5(0x64d)]=function(){const _0x550f71=_0x5443f5,_0x6448a3=this['_width'],_0x3e927c=this[_0x550f71(0x96d)],_0x4fba73=0x18,_0x452fe9=_0x4fba73/0x2,_0x54c06d=0x60+_0x4fba73,_0x1b58ec=0x0+_0x4fba73;this[_0x550f71(0x75b)]['bitmap']=this['_windowskin'],this[_0x550f71(0x75b)]['anchor']['x']=0.5,this[_0x550f71(0x75b)][_0x550f71(0x214)]['y']=0.5,this[_0x550f71(0x75b)]['setFrame'](_0x54c06d+_0x452fe9,_0x1b58ec+_0x452fe9+_0x4fba73,_0x4fba73,_0x452fe9),this[_0x550f71(0x75b)][_0x550f71(0x26e)](Math[_0x550f71(0x558)](_0x6448a3/0x2),Math['round'](_0x3e927c-_0x452fe9)),this['_upArrowSprite']['bitmap']=this['_windowskin'],this['_upArrowSprite']['anchor']['x']=0.5,this[_0x550f71(0x796)]['anchor']['y']=0.5,this[_0x550f71(0x796)][_0x550f71(0x621)](_0x54c06d+_0x452fe9,_0x1b58ec,_0x4fba73,_0x452fe9),this[_0x550f71(0x796)][_0x550f71(0x26e)](Math[_0x550f71(0x558)](_0x6448a3/0x2),Math[_0x550f71(0x558)](_0x452fe9));},Window[_0x5443f5(0x353)][_0x5443f5(0x886)]=function(){const _0x32fcf8=_0x5443f5,_0x1e62ab=0x90,_0xbfa3e4=0x60,_0x30eef1=0x18;this[_0x32fcf8(0x172)][_0x32fcf8(0x55f)]=this[_0x32fcf8(0x1f3)],this[_0x32fcf8(0x172)][_0x32fcf8(0x214)]['x']=0.5,this[_0x32fcf8(0x172)][_0x32fcf8(0x214)]['y']=0x1,this[_0x32fcf8(0x172)][_0x32fcf8(0x26e)](Math[_0x32fcf8(0x558)](this[_0x32fcf8(0x826)]/0x2),this[_0x32fcf8(0x96d)]),this['_pauseSignSprite']['setFrame'](_0x1e62ab,_0xbfa3e4,_0x30eef1,_0x30eef1),this[_0x32fcf8(0x172)]['alpha']=0xff;},Window[_0x5443f5(0x353)][_0x5443f5(0x973)]=function(){const _0x19783d=_0x5443f5,_0x185a1c=this['_clientArea']['worldTransform'][_0x19783d(0x4e9)](new Point(0x0,0x0)),_0x55b4be=this[_0x19783d(0x92f)][_0x19783d(0x449)];_0x55b4be['x']=_0x185a1c['x']+this[_0x19783d(0x75f)]['x'],_0x55b4be['y']=_0x185a1c['y']+this['origin']['y'],_0x55b4be[_0x19783d(0x786)]=Math[_0x19783d(0x474)](this[_0x19783d(0x98d)]*this['scale']['x']),_0x55b4be['height']=Math[_0x19783d(0x474)](this[_0x19783d(0x547)]*this[_0x19783d(0x3f2)]['y']);},Window[_0x5443f5(0x353)][_0x5443f5(0x660)]=function(){const _0x4bdebb=_0x5443f5,_0x295207=this[_0x4bdebb(0xda)],_0x533f31=Math[_0x4bdebb(0x8d5)](0x0,this[_0x4bdebb(0x826)]-_0x295207*0x2),_0xd6e7d4=Math['max'](0x0,this[_0x4bdebb(0x96d)]-_0x295207*0x2),_0xaa336a=this[_0x4bdebb(0x2ba)],_0x5b7f71=_0xaa336a['children'][0x0];_0xaa336a[_0x4bdebb(0x55f)]=this[_0x4bdebb(0x1f3)],_0xaa336a[_0x4bdebb(0x621)](0x0,0x0,0x60,0x60),_0xaa336a[_0x4bdebb(0x26e)](_0x295207,_0x295207),_0xaa336a[_0x4bdebb(0x3f2)]['x']=_0x533f31/0x60,_0xaa336a[_0x4bdebb(0x3f2)]['y']=_0xd6e7d4/0x60,_0x5b7f71['bitmap']=this[_0x4bdebb(0x1f3)],_0x5b7f71[_0x4bdebb(0x621)](0x0,0x60,0x60,0x60),_0x5b7f71['move'](0x0,0x0,_0x533f31,_0xd6e7d4),_0x5b7f71[_0x4bdebb(0x3f2)]['x']=0x1/_0xaa336a[_0x4bdebb(0x3f2)]['x'],_0x5b7f71[_0x4bdebb(0x3f2)]['y']=0x1/_0xaa336a[_0x4bdebb(0x3f2)]['y'],_0xaa336a[_0x4bdebb(0x62c)](this[_0x4bdebb(0x622)]);},Game_Temp[_0x5443f5(0x353)][_0x5443f5(0x419)]=function(){const _0x1e3b8b=_0x5443f5;this[_0x1e3b8b(0x913)]=[],this[_0x1e3b8b(0x3fd)]=[],this[_0x1e3b8b(0x514)]=[],this[_0x1e3b8b(0x422)]=[];},VisuMZ[_0x5443f5(0x425)]['Scene_Base_terminateAnimationClearBugFix']=Scene_Base[_0x5443f5(0x353)][_0x5443f5(0xea)],Scene_Base[_0x5443f5(0x353)]['terminate']=function(){const _0x5d01ca=_0x5443f5;if($gameTemp)$gameTemp[_0x5d01ca(0x419)]();VisuMZ[_0x5d01ca(0x425)]['Scene_Base_terminateAnimationClearBugFix'][_0x5d01ca(0x91b)](this);},Bitmap['prototype'][_0x5443f5(0x919)]=function(_0x49c88f){const _0x37f9de=_0x5443f5,_0x31165b=this[_0x37f9de(0x669)];_0x31165b[_0x37f9de(0x428)](),_0x31165b[_0x37f9de(0x9a5)]=this[_0x37f9de(0x270)]();const _0x25acca=_0x31165b[_0x37f9de(0x1a5)](_0x49c88f)[_0x37f9de(0x786)];return _0x31165b[_0x37f9de(0x668)](),_0x25acca;},Window_Message[_0x5443f5(0x353)]['textWidth']=function(_0x4dc568){const _0xbac6c2=_0x5443f5;return this[_0xbac6c2(0x7c9)]()?this[_0xbac6c2(0x9b6)]['measureTextWidthNoRounding'](_0x4dc568):Window_Base[_0xbac6c2(0x353)][_0xbac6c2(0x45b)][_0xbac6c2(0x91b)](this,_0x4dc568);},Window_Message[_0x5443f5(0x353)][_0x5443f5(0x7c9)]=function(){const _0x2c7aee=_0x5443f5;return VisuMZ[_0x2c7aee(0x425)][_0x2c7aee(0x446)]['QoL'][_0x2c7aee(0x349)]??!![];},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x3ed)]=Game_Action[_0x5443f5(0x353)][_0x5443f5(0x3e5)],Game_Action[_0x5443f5(0x353)][_0x5443f5(0x3e5)]=function(){const _0x2b4cfe=_0x5443f5;return this[_0x2b4cfe(0x23b)]()?VisuMZ[_0x2b4cfe(0x425)][_0x2b4cfe(0x3ed)][_0x2b4cfe(0x91b)](this):0x0;},VisuMZ[_0x5443f5(0x425)][_0x5443f5(0x9ef)]=Game_Action[_0x5443f5(0x353)]['setAttack'],Game_Action[_0x5443f5(0x353)][_0x5443f5(0x4d1)]=function(){const _0x48e484=_0x5443f5;if(this['subject']()&&this[_0x48e484(0x8fb)]()[_0x48e484(0x999)]())VisuMZ[_0x48e484(0x425)]['Game_Action_setAttack']['call'](this);else{if(_0x48e484(0x153)!==_0x48e484(0x69b))this[_0x48e484(0x63c)]();else{let _0x5a4025=this['_mode'];this['_mode']=_0x33d670,_0x5a4025!==this[_0x48e484(0x34c)]&&(this[_0x48e484(0x61c)](),_0x3b2e6b[_0x48e484(0x20c)](),this[_0x48e484(0x34c)]===_0x48e484(0x56f)?this[_0x48e484(0x60d)](0x0):this[_0x48e484(0x60d)](-0x1));}}},Sprite_Name[_0x5443f5(0x353)][_0x5443f5(0x80c)]=function(){return 0x24;},Sprite_Name[_0x5443f5(0x353)][_0x5443f5(0x852)]=function(){const _0x1348b6=_0x5443f5,_0x926154=this[_0x1348b6(0x744)](),_0x4c553e=this[_0x1348b6(0x2bc)](),_0x5d52f9=this[_0x1348b6(0x80c)]();this['setupFont'](),this[_0x1348b6(0x55f)][_0x1348b6(0x63c)](),this['bitmap'][_0x1348b6(0x939)](_0x926154,0x4,0x0,_0x4c553e-0xa,_0x5d52f9,_0x1348b6(0x824));},Bitmap[_0x5443f5(0x353)][_0x5443f5(0x939)]=function(_0x534ea0,_0x3bcf26,_0x221f2c,_0x2dd745,_0x556891,_0x35d2a5){const _0x3dcc03=_0x5443f5,_0x2a4444=this[_0x3dcc03(0x669)],_0x20d617=_0x2a4444[_0x3dcc03(0x171)];_0x2dd745=_0x2dd745||0xffffffff;let _0x2b3757=_0x3bcf26,_0x2ef3f5=Math[_0x3dcc03(0x558)](_0x221f2c+0x18/0x2+this[_0x3dcc03(0x702)]*0.35);_0x35d2a5===_0x3dcc03(0x380)&&(_0x3dcc03(0x6f9)==='nUbZl'?_0x2b3757+=_0x2dd745/0x2:(_0x34899f['CoreEngine'][_0x3dcc03(0x3a5)][_0x3dcc03(0x91b)](this,_0x5dab4d,_0x3584a9,_0x54dbe0,_0x4eeca8),this[_0x3dcc03(0x68d)]())),_0x35d2a5===_0x3dcc03(0x66d)&&(_0x2b3757+=_0x2dd745),_0x2a4444[_0x3dcc03(0x428)](),_0x2a4444['font']=this[_0x3dcc03(0x270)](),_0x2a4444[_0x3dcc03(0x803)]=_0x35d2a5,_0x2a4444['textBaseline']=_0x3dcc03(0x5af),_0x2a4444[_0x3dcc03(0x171)]=0x1,this[_0x3dcc03(0x907)](_0x534ea0,_0x2b3757,_0x2ef3f5,_0x2dd745),_0x2a4444['globalAlpha']=_0x20d617,this['_drawTextBody'](_0x534ea0,_0x2b3757,_0x2ef3f5,_0x2dd745),_0x2a4444[_0x3dcc03(0x668)](),this[_0x3dcc03(0x202)][_0x3dcc03(0x5f3)]();},VisuMZ[_0x5443f5(0x425)]['BattleManager_checkSubstitute']=BattleManager['checkSubstitute'],BattleManager[_0x5443f5(0x320)]=function(_0x3b4ba2){const _0x586ecb=_0x5443f5;if(this[_0x586ecb(0x762)]['isForFriend']())return![];return VisuMZ['CoreEngine'][_0x586ecb(0x33e)][_0x586ecb(0x91b)](this,_0x3b4ba2);},BattleManager[_0x5443f5(0x372)]=function(){const _0x1c0f17=_0x5443f5;if(this['_subject'])this[_0x1c0f17(0x659)][_0x1c0f17(0x372)](this[_0x1c0f17(0x440)]);this[_0x1c0f17(0x6a7)]=_0x1c0f17(0x58b),this[_0x1c0f17(0x440)]&&this['_subject'][_0x1c0f17(0x69c)]()===0x0&&(this['endBattlerActions'](this[_0x1c0f17(0x440)]),this[_0x1c0f17(0x440)]=null);},Bitmap['prototype'][_0x5443f5(0x435)]=function(){const _0x48951e=_0x5443f5;this['_image']=new Image(),this[_0x48951e(0x695)][_0x48951e(0x93f)]=this['_onLoad'][_0x48951e(0x2ed)](this),this[_0x48951e(0x695)][_0x48951e(0x629)]=this['_onError'][_0x48951e(0x2ed)](this),this['_destroyCanvas'](),this[_0x48951e(0x2e9)]=_0x48951e(0x32f);if(Utils[_0x48951e(0x5b2)]())this[_0x48951e(0x194)]();else{this[_0x48951e(0x695)][_0x48951e(0x33c)]=this['_url'];if(![]&&this[_0x48951e(0x695)][_0x48951e(0x786)]>0x0){if(_0x48951e(0x773)!==_0x48951e(0x773))return _0x47413a=_0x22104d[_0x48951e(0x6d0)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x3e76f0,_0x494ea2)=>_0x551f4c(_0x4abd5f(_0x494ea2))),_0x5351e0;else this[_0x48951e(0x695)][_0x48951e(0x93f)]=null,this['_onLoad']();}}},Scene_Skill[_0x5443f5(0x353)][_0x5443f5(0x897)]=function(){const _0x2dd2ce=_0x5443f5;Scene_MenuBase[_0x2dd2ce(0x353)][_0x2dd2ce(0x897)]['call'](this),this['refreshActor'](),this[_0x2dd2ce(0x448)][_0x2dd2ce(0x96f)](),this[_0x2dd2ce(0x448)]['deselect'](),this[_0x2dd2ce(0x313)][_0x2dd2ce(0x35d)]();},Scene_Skill[_0x5443f5(0x353)][_0x5443f5(0x889)]=function(){const _0x5e224d=_0x5443f5;return this[_0x5e224d(0x313)]&&this['_skillTypeWindow'][_0x5e224d(0x7a3)];},Game_Map[_0x5443f5(0x353)]['checkPassage']=function(_0x449429,_0x4e6c7e,_0x367986){const _0x546495=_0x5443f5,_0x11144b=this[_0x546495(0x654)](),_0x3de397=this[_0x546495(0x93e)](_0x449429,_0x4e6c7e);for(const _0x4bda48 of _0x3de397){const _0x442629=_0x11144b[_0x4bda48];if(_0x442629===undefined||_0x442629===null){if('VsHGT'===_0x546495(0x32c)){if($gameTemp[_0x546495(0x6b1)]()&&!DataManager[_0x546495(0x90c)]()){if(_0x546495(0x10f)!==_0x546495(0x9cf)){let _0x354c6c=_0x546495(0x46f)+'\x0a';_0x354c6c+=_0x546495(0x9ed)+'\x0a',_0x354c6c+='and\x20add\x20it\x20onto\x20this\x20one.',this[_0x546495(0x511)]()?(alert(_0x354c6c),SceneManager['exit']()):(console['log'](_0x354c6c),!$gameTemp[_0x546495(0x17c)]&&($gameTemp[_0x546495(0x17c)]=!![],SceneManager[_0x546495(0x206)]()));}else this[_0x546495(0x7b8)][_0x546495(0x3f2)]['y']=0x1/this[_0x546495(0x3f2)]['y'],this[_0x546495(0x7b8)]['y']=-(this['y']/this[_0x546495(0x3f2)]['y']);}}else this[_0x546495(0x5ba)]=![],this[_0x546495(0x8e5)]=0x0,this['x']=_0x4f802b['width']*0xa,this['y']=_0x4c17e3[_0x546495(0x99b)]*0xa;}if((_0x442629&0x10)!==0x0){if(_0x546495(0x9e6)===_0x546495(0x271))_0x4b111d=_0x35e887[_0x546495(0x3f3)](_0x162591);else continue;}if((_0x442629&_0x367986)===0x0){if(_0x546495(0x1b0)===_0x546495(0x1b0))return!![];else{_0x4ec101=_0x3494f8(_0x32e815)['toUpperCase']();const _0xdaf1b8=_0x294f91['CoreEngine'][_0x546495(0x446)][_0x546495(0x36a)];if(_0x595334===_0x546495(0x60f))return _0xdaf1b8[_0x546495(0x81d)];if(_0x257868===_0x546495(0x5da))return _0xdaf1b8[_0x546495(0x13c)];if(_0x452b1d===_0x546495(0x32d))return _0xdaf1b8[_0x546495(0x57b)];if(_0x5a4df9===_0x546495(0x5ec))return _0xdaf1b8[_0x546495(0x12f)];if(_0x164436===_0x546495(0x1d7))return _0xdaf1b8[_0x546495(0x27b)];if(_0x13f2bb===_0x546495(0x420))return _0xdaf1b8[_0x546495(0x7ee)];if(_0x43ec4f==='AGI')return _0xdaf1b8[_0x546495(0x8eb)];if(_0x43fbdd==='LUK')return _0xdaf1b8[_0x546495(0x5c4)];if(_0x530836===_0x546495(0x180))return _0xdaf1b8['IconXParam0'];if(_0x1ebf5d===_0x546495(0x782))return _0xdaf1b8[_0x546495(0x940)];if(_0x1379cc==='CRI')return _0xdaf1b8[_0x546495(0x813)];if(_0x6f3e7===_0x546495(0x423))return _0xdaf1b8[_0x546495(0x211)];if(_0x4c1fd3==='MEV')return _0xdaf1b8[_0x546495(0x31c)];if(_0xbe935b===_0x546495(0x4eb))return _0xdaf1b8['IconXParam5'];if(_0x310664===_0x546495(0x421))return _0xdaf1b8[_0x546495(0x308)];if(_0x848112===_0x546495(0x164))return _0xdaf1b8[_0x546495(0x974)];if(_0x257848==='MRG')return _0xdaf1b8[_0x546495(0x96e)];if(_0x5af327===_0x546495(0x5c5))return _0xdaf1b8[_0x546495(0x123)];if(_0x2952e8===_0x546495(0x64a))return _0xdaf1b8[_0x546495(0x393)];if(_0x4f85e0==='GRD')return _0xdaf1b8[_0x546495(0x278)];if(_0x31fce6===_0x546495(0x8ac))return _0xdaf1b8[_0x546495(0x938)];if(_0x51c381==='PHA')return _0xdaf1b8[_0x546495(0x8dc)];if(_0x318f17===_0x546495(0x830))return _0xdaf1b8[_0x546495(0x184)];if(_0x811c3===_0x546495(0xef))return _0xdaf1b8[_0x546495(0x652)];if(_0x1e1297===_0x546495(0x413))return _0xdaf1b8[_0x546495(0x4ec)];if(_0x288187===_0x546495(0x47d))return _0xdaf1b8['IconSParam7'];if(_0x935f48===_0x546495(0x2ae))return _0xdaf1b8[_0x546495(0x61a)];if(_0x503824===_0x546495(0x89a))return _0xdaf1b8[_0x546495(0x6cc)];if(_0x51acff['CoreEngine'][_0x546495(0x47a)][_0x4e959d])return _0x4b9365[_0x546495(0x425)]['CustomParamIcons'][_0x4492a9]||0x0;return 0x0;}}if((_0x442629&_0x367986)===_0x367986)return![];}return![];},Game_Map[_0x5443f5(0x353)][_0x5443f5(0x511)]=function(){const _0x3eb5ec=_0x5443f5;if(Imported[_0x3eb5ec(0x8e8)])return!![];if(Imported[_0x3eb5ec(0x694)])return!![];return![];},Sprite_Animation[_0x5443f5(0x353)][_0x5443f5(0x253)]=function(_0xe09afa){const _0x1a76c5=_0x5443f5;!this['_originalViewport']&&(this[_0x1a76c5(0x918)]=_0xe09afa['gl'][_0x1a76c5(0x381)](_0xe09afa['gl'][_0x1a76c5(0x65b)]));};