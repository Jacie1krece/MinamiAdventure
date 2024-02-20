//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.81;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.81] [CoreEngine]
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
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
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
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
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
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
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
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
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
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * RPG Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
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
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
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
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
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
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
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
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
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

const _0x25789e=_0x481b;(function(_0x2039a3,_0x17a493){const _0x15c674=_0x481b,_0x368d0c=_0x2039a3();while(!![]){try{const _0x2f009b=-parseInt(_0x15c674(0x8e0))/0x1*(parseInt(_0x15c674(0x3f1))/0x2)+-parseInt(_0x15c674(0x940))/0x3*(parseInt(_0x15c674(0x161))/0x4)+parseInt(_0x15c674(0x4c5))/0x5*(-parseInt(_0x15c674(0x3b4))/0x6)+-parseInt(_0x15c674(0x653))/0x7*(parseInt(_0x15c674(0x349))/0x8)+-parseInt(_0x15c674(0x8b2))/0x9+-parseInt(_0x15c674(0x21b))/0xa+parseInt(_0x15c674(0x854))/0xb*(parseInt(_0x15c674(0x2c1))/0xc);if(_0x2f009b===_0x17a493)break;else _0x368d0c['push'](_0x368d0c['shift']());}catch(_0x158f4e){_0x368d0c['push'](_0x368d0c['shift']());}}}(_0xcfe6,0xcef55));var label=_0x25789e(0xf9),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x25789e(0x3f6)](function(_0x562b37){const _0x37d3cf=_0x25789e;return _0x562b37['status']&&_0x562b37['description'][_0x37d3cf(0x2ec)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x25789e(0x59c)]||{},VisuMZ['ConvertParams']=function(_0x63ed39,_0x2f78eb){const _0x17ec5b=_0x25789e;for(const _0x5a48ba in _0x2f78eb){if(_0x5a48ba[_0x17ec5b(0x8af)](/(.*):(.*)/i)){const _0x3d1cfa=String(RegExp['$1']),_0x4dd223=String(RegExp['$2'])['toUpperCase']()[_0x17ec5b(0x91f)]();let _0x23e2b5,_0x10a539,_0x542b7e;switch(_0x4dd223){case _0x17ec5b(0x2d9):_0x23e2b5=_0x2f78eb[_0x5a48ba]!==''?Number(_0x2f78eb[_0x5a48ba]):0x0;break;case _0x17ec5b(0x750):_0x10a539=_0x2f78eb[_0x5a48ba]!==''?JSON['parse'](_0x2f78eb[_0x5a48ba]):[],_0x23e2b5=_0x10a539[_0x17ec5b(0x8d5)](_0x3b82ad=>Number(_0x3b82ad));break;case _0x17ec5b(0x7d5):_0x23e2b5=_0x2f78eb[_0x5a48ba]!==''?eval(_0x2f78eb[_0x5a48ba]):null;break;case _0x17ec5b(0x684):_0x10a539=_0x2f78eb[_0x5a48ba]!==''?JSON[_0x17ec5b(0x8c2)](_0x2f78eb[_0x5a48ba]):[],_0x23e2b5=_0x10a539[_0x17ec5b(0x8d5)](_0xe3867d=>eval(_0xe3867d));break;case _0x17ec5b(0x4fb):_0x23e2b5=_0x2f78eb[_0x5a48ba]!==''?JSON[_0x17ec5b(0x8c2)](_0x2f78eb[_0x5a48ba]):'';break;case _0x17ec5b(0x7fc):_0x10a539=_0x2f78eb[_0x5a48ba]!==''?JSON[_0x17ec5b(0x8c2)](_0x2f78eb[_0x5a48ba]):[],_0x23e2b5=_0x10a539[_0x17ec5b(0x8d5)](_0x49b9cc=>JSON[_0x17ec5b(0x8c2)](_0x49b9cc));break;case _0x17ec5b(0x9c6):_0x23e2b5=_0x2f78eb[_0x5a48ba]!==''?new Function(JSON[_0x17ec5b(0x8c2)](_0x2f78eb[_0x5a48ba])):new Function(_0x17ec5b(0x369));break;case _0x17ec5b(0x856):_0x10a539=_0x2f78eb[_0x5a48ba]!==''?JSON[_0x17ec5b(0x8c2)](_0x2f78eb[_0x5a48ba]):[],_0x23e2b5=_0x10a539[_0x17ec5b(0x8d5)](_0x48e279=>new Function(JSON['parse'](_0x48e279)));break;case _0x17ec5b(0x469):_0x23e2b5=_0x2f78eb[_0x5a48ba]!==''?String(_0x2f78eb[_0x5a48ba]):'';break;case _0x17ec5b(0x8a5):_0x10a539=_0x2f78eb[_0x5a48ba]!==''?JSON['parse'](_0x2f78eb[_0x5a48ba]):[],_0x23e2b5=_0x10a539[_0x17ec5b(0x8d5)](_0x391e1d=>String(_0x391e1d));break;case _0x17ec5b(0x96e):_0x542b7e=_0x2f78eb[_0x5a48ba]!==''?JSON[_0x17ec5b(0x8c2)](_0x2f78eb[_0x5a48ba]):{},_0x63ed39[_0x3d1cfa]={},VisuMZ['ConvertParams'](_0x63ed39[_0x3d1cfa],_0x542b7e);continue;case _0x17ec5b(0x482):_0x10a539=_0x2f78eb[_0x5a48ba]!==''?JSON[_0x17ec5b(0x8c2)](_0x2f78eb[_0x5a48ba]):[],_0x23e2b5=_0x10a539[_0x17ec5b(0x8d5)](_0x403c5f=>VisuMZ[_0x17ec5b(0x747)]({},JSON['parse'](_0x403c5f)));break;default:continue;}_0x63ed39[_0x3d1cfa]=_0x23e2b5;}}return _0x63ed39;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x57a)]=SceneManager[_0x25789e(0x193)],SceneManager[_0x25789e(0x193)]=function(){const _0x5e34f8=_0x25789e;VisuMZ[_0x5e34f8(0xf9)][_0x5e34f8(0x57a)][_0x5e34f8(0x800)](this);if(Utils[_0x5e34f8(0x637)]>=_0x5e34f8(0x10c)){if(_0x5e34f8(0x25d)==='KlBsH'){if(typeof nw===_0x5e34f8(0x5bb))nw[_0x5e34f8(0x1dc)][_0x5e34f8(0x673)]();}else{const _0x54bad6='_stored_tpGaugeColor1';this[_0x5e34f8(0x7c5)]=this['_colorCache']||{};if(this[_0x5e34f8(0x7c5)][_0x54bad6])return this[_0x5e34f8(0x7c5)][_0x54bad6];const _0x1a8941=_0x56030c[_0x5e34f8(0xf9)][_0x5e34f8(0x59c)][_0x5e34f8(0x9db)]['ColorTPGauge1'];return this[_0x5e34f8(0x607)](_0x54bad6,_0x1a8941);}}},(_0x15105b=>{const _0x5854ed=_0x25789e,_0x269f1e=_0x15105b['name'];for(const _0x5bf8cd of dependencies){if(!Imported[_0x5bf8cd]){if('dbNWI'!=='ZAOfz'){alert(_0x5854ed(0x9b)[_0x5854ed(0x3a8)](_0x269f1e,_0x5bf8cd)),SceneManager['exit']();break;}else this['_forcedBattleGridSystem']=![];}}const _0x251de9=_0x15105b[_0x5854ed(0x2c8)];if(_0x251de9[_0x5854ed(0x8af)](/\[Version[ ](.*?)\]/i)){const _0x5ae09b=Number(RegExp['$1']);_0x5ae09b!==VisuMZ[label]['version']&&(_0x5854ed(0x617)===_0x5854ed(0x6b1)?this[_0x5854ed(0xd9)](_0x3b7d21):(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x5854ed(0x3a8)](_0x269f1e,_0x5ae09b)),SceneManager[_0x5854ed(0x193)]()));}if(_0x251de9[_0x5854ed(0x8af)](/\[Tier[ ](\d+)\]/i)){if(_0x5854ed(0x84f)==='KergZ'){const _0x41c876=Number(RegExp['$1']);if(_0x41c876<tier){if(_0x5854ed(0x449)===_0x5854ed(0x279)){if(this[_0x5854ed(0x26d)]===_0x5854ed(0x715)){this[_0x5854ed(0x890)]['clear'](),this[_0x5854ed(0x89e)]['clear'](),this[_0x5854ed(0x902)]();let _0x57f0b4=_0x50934e[_0x5854ed(0xf9)][_0x5854ed(0x59c)]['KeyboardInput'][_0x5854ed(0x9b5)][_0x5854ed(0x9b9)]('\x0a'),_0x2d582d=_0x57f0b4[_0x5854ed(0x73d)],_0x4d8207=(this[_0x5854ed(0x90f)]-_0x2d582d*this[_0x5854ed(0x99b)]())/0x2;for(let _0x257b36=0x0;_0x257b36<_0x2d582d;++_0x257b36){let _0x2120e6=_0x57f0b4[_0x257b36],_0x2d87d6=this[_0x5854ed(0x341)](_0x2120e6)['width'],_0x162e02=_0x4d82bb['floor']((this[_0x5854ed(0x890)][_0x5854ed(0x59d)]-_0x2d87d6)/0x2);this[_0x5854ed(0x67d)](_0x2120e6,_0x162e02,_0x4d8207),_0x4d8207+=this[_0x5854ed(0x99b)]();}}else _0x1c7565[_0x5854ed(0xf9)][_0x5854ed(0x78b)][_0x5854ed(0x800)](this);}else alert(_0x5854ed(0x8bd)['format'](_0x269f1e,_0x41c876,tier)),SceneManager[_0x5854ed(0x193)]();}else tier=Math[_0x5854ed(0x311)](_0x41c876,tier);}else _0x304282[_0x5854ed(0x904)][0x57]='up',_0x345782[_0x5854ed(0x904)][0x41]='left',_0x6029bc[_0x5854ed(0x904)][0x53]='down',_0x501bdb[_0x5854ed(0x904)][0x44]='right',_0x3013db[_0x5854ed(0x904)][0x45]=_0x5854ed(0x1a3);}VisuMZ['ConvertParams'](VisuMZ[label][_0x5854ed(0x59c)],_0x15105b[_0x5854ed(0x1f3)]);})(pluginData),((()=>{const _0x5ea234=_0x25789e;if(VisuMZ['CoreEngine']['Settings'][_0x5ea234(0x25e)][_0x5ea234(0x2ac)]??!![])for(const _0xfca7ad in $plugins){const _0xec718a=$plugins[_0xfca7ad];if(_0xec718a[_0x5ea234(0x126)][_0x5ea234(0x8af)](/(.*)\/(.*)/i)){if('FGwrq'===_0x5ea234(0x3d5))_0xec718a[_0x5ea234(0x126)]=String(RegExp['$2'][_0x5ea234(0x91f)]());else{let _0x46b43e=_0x2dd280;if(_0x46b43e[0x0]==='0')return _0x46b43e;if(_0x46b43e[_0x46b43e[_0x5ea234(0x73d)]-0x1]==='.')return _0x576049(_0x46b43e)[_0x5ea234(0x9e5)](_0x5af7de,_0x5d7ff7)+'.';else return _0x46b43e[_0x46b43e[_0x5ea234(0x73d)]-0x1]===','?_0xe30a79(_0x46b43e)['toLocaleString'](_0x3cd4f2,_0x3f37f9)+',':_0x53a3a9(_0x46b43e)[_0x5ea234(0x9e5)](_0x46498f,_0x3d356a);}}}})()),PluginManager[_0x25789e(0x9d6)](pluginData[_0x25789e(0x126)],_0x25789e(0x8e2),_0x3fe452=>{const _0xc37e6f=_0x25789e;if(!SceneManager[_0xc37e6f(0x5f4)])return;if(!SceneManager[_0xc37e6f(0x5f4)][_0xc37e6f(0x63e)])return;VisuMZ[_0xc37e6f(0x747)](_0x3fe452,_0x3fe452);const _0x2d32aa=Math[_0xc37e6f(0x997)](_0x3fe452[_0xc37e6f(0x7fa)]),_0x1912e6=Math['round'](_0x3fe452['pointY']);$gameTemp['requestPointAnimation'](_0x2d32aa,_0x1912e6,_0x3fe452[_0xc37e6f(0xee)],_0x3fe452['Mirror'],_0x3fe452[_0xc37e6f(0x217)]);}),PluginManager[_0x25789e(0x9d6)](pluginData['name'],'AudioChangeBgmVolume',_0x9a5527=>{const _0x443ff2=_0x25789e;VisuMZ[_0x443ff2(0x747)](_0x9a5527,_0x9a5527);const _0x4db3d0=Math['round'](_0x9a5527[_0x443ff2(0x745)])['clamp'](0x0,0x64),_0x3b7a2a=AudioManager[_0x443ff2(0x992)];_0x3b7a2a&&(_0x3b7a2a[_0x443ff2(0x745)]=_0x4db3d0,_0x3b7a2a[_0x443ff2(0x5a3)]=AudioManager[_0x443ff2(0xbe)][_0x443ff2(0x2dd)](),AudioManager[_0x443ff2(0x15d)](_0x3b7a2a),AudioManager[_0x443ff2(0x3e9)](_0x3b7a2a,_0x3b7a2a[_0x443ff2(0x5a3)]),AudioManager['_bgmBuffer'][_0x443ff2(0x7f8)](_0x3b7a2a[_0x443ff2(0x5a3)]));}),PluginManager[_0x25789e(0x9d6)](pluginData['name'],_0x25789e(0x7d4),_0x491b7d=>{const _0x1e2c3a=_0x25789e;VisuMZ[_0x1e2c3a(0x747)](_0x491b7d,_0x491b7d);const _0x1bf0fb=Math[_0x1e2c3a(0x997)](_0x491b7d['pitch'])[_0x1e2c3a(0x68d)](0x32,0x96),_0x20bdf7=AudioManager[_0x1e2c3a(0x992)];if(_0x20bdf7){if(_0x1e2c3a(0x3d1)!==_0x1e2c3a(0x3d1))return this['_fauxAnimationSprites'][_0x1e2c3a(0x73d)]>0x0;else _0x20bdf7['pitch']=_0x1bf0fb,_0x20bdf7[_0x1e2c3a(0x5a3)]=AudioManager['_bgmBuffer'][_0x1e2c3a(0x2dd)](),AudioManager[_0x1e2c3a(0x15d)](_0x20bdf7),AudioManager[_0x1e2c3a(0x3e9)](_0x20bdf7,_0x20bdf7['pos']),AudioManager[_0x1e2c3a(0xbe)][_0x1e2c3a(0x7f8)](_0x20bdf7[_0x1e2c3a(0x5a3)]);}}),PluginManager[_0x25789e(0x9d6)](pluginData['name'],'AudioChangeBgmPan',_0x7c5c23=>{const _0x1a0470=_0x25789e;VisuMZ[_0x1a0470(0x747)](_0x7c5c23,_0x7c5c23);const _0x544030=Math[_0x1a0470(0x997)](_0x7c5c23['pan'])['clamp'](-0x64,0x64),_0x2792c4=AudioManager[_0x1a0470(0x992)];_0x2792c4&&('Kvraf'===_0x1a0470(0x422)?(_0x571bb4+=_0x441201,_0x47f5b1+=_0x1a0470(0x910)[_0x1a0470(0x3a8)](_0x30fc3e,_0x390b7c[_0x1a0470(0x1f3)][0x0]+0x1,_0x41cc1e[_0x1a0470(0x1f3)][0x1])):(_0x2792c4[_0x1a0470(0x129)]=_0x544030,_0x2792c4[_0x1a0470(0x5a3)]=AudioManager[_0x1a0470(0xbe)][_0x1a0470(0x2dd)](),AudioManager[_0x1a0470(0x15d)](_0x2792c4),AudioManager[_0x1a0470(0x3e9)](_0x2792c4,_0x2792c4[_0x1a0470(0x5a3)]),AudioManager[_0x1a0470(0xbe)]['_startPlaying'](_0x2792c4[_0x1a0470(0x5a3)])));}),PluginManager[_0x25789e(0x9d6)](pluginData[_0x25789e(0x126)],_0x25789e(0x175),_0x14f538=>{const _0x1a034b=_0x25789e;VisuMZ[_0x1a034b(0x747)](_0x14f538,_0x14f538);const _0x1e5de6=Math[_0x1a034b(0x997)](_0x14f538[_0x1a034b(0x745)])['clamp'](0x0,0x64),_0x144441=AudioManager['_currentBgs'];if(_0x144441){if(_0x1a034b(0x894)!==_0x1a034b(0x894)){const _0x10a517=_0x3ee618[_0x1a034b(0x5f4)]['_textPopupWindow'];_0x10a517['addQueue'](_0x1f6410);}else _0x144441[_0x1a034b(0x745)]=_0x1e5de6,_0x144441[_0x1a034b(0x5a3)]=AudioManager['_bgsBuffer'][_0x1a034b(0x2dd)](),AudioManager['updateBgsParameters'](_0x144441),AudioManager[_0x1a034b(0x536)](_0x144441,_0x144441[_0x1a034b(0x5a3)]),AudioManager[_0x1a034b(0x71c)][_0x1a034b(0x7f8)](_0x144441[_0x1a034b(0x5a3)]);}}),PluginManager[_0x25789e(0x9d6)](pluginData[_0x25789e(0x126)],'AudioChangeBgsPitch',_0x79587c=>{const _0x220cd3=_0x25789e;VisuMZ['ConvertParams'](_0x79587c,_0x79587c);const _0x2f29ea=Math[_0x220cd3(0x997)](_0x79587c[_0x220cd3(0xe7)])[_0x220cd3(0x68d)](0x32,0x96),_0x11e01f=AudioManager[_0x220cd3(0x6e4)];_0x11e01f&&(_0x11e01f[_0x220cd3(0xe7)]=_0x2f29ea,_0x11e01f['pos']=AudioManager[_0x220cd3(0x71c)][_0x220cd3(0x2dd)](),AudioManager[_0x220cd3(0x11c)](_0x11e01f),AudioManager[_0x220cd3(0x536)](_0x11e01f,_0x11e01f[_0x220cd3(0x5a3)]),AudioManager['_bgsBuffer'][_0x220cd3(0x7f8)](_0x11e01f[_0x220cd3(0x5a3)]));}),PluginManager[_0x25789e(0x9d6)](pluginData[_0x25789e(0x126)],_0x25789e(0x426),_0x2b8c78=>{const _0x3b4c8f=_0x25789e;VisuMZ[_0x3b4c8f(0x747)](_0x2b8c78,_0x2b8c78);const _0x25dca8=Math[_0x3b4c8f(0x997)](_0x2b8c78[_0x3b4c8f(0x129)])[_0x3b4c8f(0x68d)](-0x64,0x64),_0x397e9c=AudioManager[_0x3b4c8f(0x6e4)];_0x397e9c&&(_0x397e9c[_0x3b4c8f(0x129)]=_0x25dca8,_0x397e9c['pos']=AudioManager[_0x3b4c8f(0x71c)][_0x3b4c8f(0x2dd)](),AudioManager[_0x3b4c8f(0x11c)](_0x397e9c),AudioManager[_0x3b4c8f(0x536)](_0x397e9c,_0x397e9c['pos']),AudioManager[_0x3b4c8f(0x71c)][_0x3b4c8f(0x7f8)](_0x397e9c['pos']));}),PluginManager['registerCommand'](pluginData['name'],_0x25789e(0x20c),_0x505a46=>{const _0x16f80d=_0x25789e;if(!$gameTemp[_0x16f80d(0x254)]())return;const _0x2a9592=Input[_0x16f80d(0x2ae)]();navigator[_0x16f80d(0x67c)]&&navigator['clipboard']['writeText'](_0x2a9592);}),PluginManager[_0x25789e(0x9d6)](pluginData[_0x25789e(0x126)],_0x25789e(0x267),_0x31458e=>{const _0x1f44eb=_0x25789e;if(!$gameTemp[_0x1f44eb(0x254)]())return;if(!Utils[_0x1f44eb(0x321)]())return;SceneManager[_0x1f44eb(0x5f4)][_0x1f44eb(0x724)]=![],VisuMZ['CoreEngine'][_0x1f44eb(0x524)]();}),PluginManager[_0x25789e(0x9d6)](pluginData['name'],_0x25789e(0x634),_0x341729=>{const _0xb6e76e=_0x25789e;if(!$gameTemp[_0xb6e76e(0x254)]())return;if(!Utils[_0xb6e76e(0x321)]())return;SceneManager[_0xb6e76e(0x5f4)][_0xb6e76e(0x724)]=![],VisuMZ[_0xb6e76e(0xf9)][_0xb6e76e(0x5c3)]();}),PluginManager[_0x25789e(0x9d6)](pluginData['name'],'ExportCurMapText',_0x366cb7=>{const _0x21763a=_0x25789e;if(!$gameTemp[_0x21763a(0x254)]())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap[_0x21763a(0x42c)]()<=0x0)return;VisuMZ[_0x21763a(0x747)](_0x366cb7,_0x366cb7);const _0xc827f7=_0x21763a(0x892)[_0x21763a(0x3a8)]($gameMap[_0x21763a(0x42c)]()['padZero'](0x3)),_0x45e8e6=VisuMZ[_0x21763a(0xf9)][_0x21763a(0x6ed)]($gameMap[_0x21763a(0x42c)]());VisuMZ[_0x21763a(0xf9)]['ExportString'](_0x45e8e6,_0xc827f7,!![]);}),PluginManager[_0x25789e(0x9d6)](pluginData[_0x25789e(0x126)],_0x25789e(0x319),_0x1470b7=>{const _0x151e79=_0x25789e;if(!$gameTemp[_0x151e79(0x254)]())return;if(!Utils[_0x151e79(0x321)]())return;if(!$gameParty[_0x151e79(0x23b)]())return;VisuMZ[_0x151e79(0x747)](_0x1470b7,_0x1470b7);const _0xdbecc4=_0x151e79(0x2f7)[_0x151e79(0x3a8)]($gameTroop[_0x151e79(0x5ed)][_0x151e79(0x4c8)](0x4)),_0x5cb7ac=VisuMZ[_0x151e79(0xf9)][_0x151e79(0x2e9)]($gameTroop['_troopId']);VisuMZ[_0x151e79(0xf9)][_0x151e79(0x6bf)](_0x5cb7ac,_0xdbecc4,!![]);}),VisuMZ[_0x25789e(0xf9)][_0x25789e(0x6bf)]=function(_0x489b67,_0x529c3d,_0x3ff9f0){const _0x1fb405=_0x25789e,_0x59f35b=require('fs');let _0x2a7826='Exported_Script_%1.txt'['format'](_0x529c3d||'0');_0x59f35b[_0x1fb405(0x4d6)](_0x2a7826,_0x489b67,_0x4743c0=>{const _0x52d33b=_0x1fb405;if('vtNMN'!==_0x52d33b(0x518))return _0x3d7bb7[_0x52d33b(0xf9)][_0x52d33b(0x396)]['call'](this);else{if(_0x4743c0)throw err;else _0x3ff9f0&&alert(_0x52d33b(0x313)[_0x52d33b(0x3a8)](_0x2a7826));}});},VisuMZ['CoreEngine'][_0x25789e(0x524)]=function(){const _0x2168a7=_0x25789e,_0x1d1220=[];for(const _0x201f44 of $dataMapInfos){if(_0x2168a7(0x6f2)===_0x2168a7(0x43a))this[_0x2168a7(0x5e4)][_0x2168a7(0x615)](_0x5a37aa['layoutSettings'][_0x2168a7(0xa6)]);else{if(!_0x201f44)continue;_0x1d1220['push'](_0x201f44['id']);}}const _0x56bf9b=_0x1d1220[_0x2168a7(0x73d)]*0x64+Math[_0x2168a7(0x915)](0x64);alert(_0x2168a7(0x734)[_0x2168a7(0x3a8)](_0x56bf9b)),this['_storedMapText']=[],this['_currentMap']=$dataMap;for(const _0x7e298e of _0x1d1220){VisuMZ[_0x2168a7(0xf9)][_0x2168a7(0x1e2)](_0x7e298e);}setTimeout(VisuMZ[_0x2168a7(0xf9)][_0x2168a7(0x597)][_0x2168a7(0x53d)](this),_0x56bf9b);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x1e2)]=function(_0x25becd){const _0x2e753d=_0x25789e,_0x5ecf5a=_0x2e753d(0x8fb)[_0x2e753d(0x3a8)](_0x25becd['padZero'](0x3)),_0x9db721=new XMLHttpRequest(),_0x20cf7a=_0x2e753d(0x730)+_0x5ecf5a;_0x9db721[_0x2e753d(0x388)](_0x2e753d(0x782),_0x20cf7a),_0x9db721[_0x2e753d(0x306)](_0x2e753d(0x436)),_0x9db721[_0x2e753d(0x1e7)]=()=>this[_0x2e753d(0x685)](_0x9db721,_0x25becd,_0x5ecf5a,_0x20cf7a),_0x9db721[_0x2e753d(0x24e)]=()=>DataManager[_0x2e753d(0x3bf)](_0x2e753d(0x8a4),_0x5ecf5a,_0x20cf7a),_0x9db721[_0x2e753d(0x3fb)]();},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x685)]=function(_0x36e887,_0x479767,_0x25212d,_0x187d45){const _0x355f19=_0x25789e;$dataMap=JSON[_0x355f19(0x8c2)](_0x36e887[_0x355f19(0x516)]),DataManager[_0x355f19(0x22a)]($dataMap),this[_0x355f19(0x711)][_0x479767]=VisuMZ['CoreEngine'][_0x355f19(0x6ed)](_0x479767),$dataMap=this[_0x355f19(0x591)];},VisuMZ['CoreEngine']['exportAllMapStrings']=function(){const _0xcb88d3=_0x25789e,_0x11274=_0xcb88d3(0x2e2);this[_0xcb88d3(0x711)][_0xcb88d3(0x253)](undefined)['remove']('')[_0xcb88d3(0x253)](null);const _0x409156=this[_0xcb88d3(0x711)][_0xcb88d3(0x1fe)](_0xcb88d3(0x65d))[_0xcb88d3(0x91f)]();VisuMZ[_0xcb88d3(0xf9)][_0xcb88d3(0x6bf)](_0x409156,_0x11274,!![]),SceneManager['_scene'][_0xcb88d3(0x724)]=!![];},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x6ed)]=function(_0x3149b7){const _0x1f0a73=_0x25789e;if(!$dataMap)return'';let _0xb42d65='█'['repeat'](0x46)+'\x0a\x0a',_0x3dad78='═'[_0x1f0a73(0x4a5)](0x46)+'\x0a\x0a',_0x43769c='';this['_commonEventLayers']=0x0;for(const _0x2fb42b of $dataMap[_0x1f0a73(0x2e6)]){if(!_0x2fb42b)continue;let _0x57d984=_0x2fb42b['id'],_0x3f197c=_0x2fb42b['name'],_0x519f67=_0x2fb42b['pages'];for(const _0x525be1 of _0x519f67){if('CuQkM'!==_0x1f0a73(0x1e4))return this['subject']()[_0x1f0a73(0x91b)];else{const _0x441e9d=_0x519f67[_0x1f0a73(0x14c)](_0x525be1)+0x1;let _0x15a86a=_0x3dad78+_0x1f0a73(0xfe),_0xb806b1=VisuMZ[_0x1f0a73(0xf9)][_0x1f0a73(0x93e)](_0x525be1['list']);if(_0xb806b1['length']>0x0){if(_0x1f0a73(0x62d)!==_0x1f0a73(0x368)){if(_0x43769c[_0x1f0a73(0x73d)]>0x0)_0x1f0a73(0x90e)!==_0x1f0a73(0x885)?_0x43769c+=_0x3dad78+_0x1f0a73(0x65d):_0x4c5ea2[_0x1f0a73(0x9c8)]();else{if(_0x1f0a73(0x1b9)!==_0x1f0a73(0x1b9))return![];else{const _0x538a81=$dataMapInfos[_0x3149b7]['name'];_0x43769c+=_0xb42d65+_0x1f0a73(0x9cb)[_0x1f0a73(0x3a8)](_0x3149b7,_0x538a81||_0x1f0a73(0x494))+_0xb42d65;}}_0x43769c+=_0x15a86a[_0x1f0a73(0x3a8)](_0x57d984,_0x3f197c,_0x441e9d,_0xb806b1);}else this[_0x1f0a73(0x6c3)][_0x1f0a73(0x615)](_0x260004[_0x1f0a73(0xe4)][_0x1f0a73(0x8e4)]);}}}}return _0x43769c['length']>0x0&&('sSKeH'!==_0x1f0a73(0x4b1)?this[_0x1f0a73(0x2a5)]():_0x43769c+=_0x3dad78),_0x43769c;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x5c3)]=function(){const _0xcbafa2=_0x25789e,_0x3c05e7=$dataTroops[_0xcbafa2(0x73d)]*0xa+Math[_0xcbafa2(0x915)](0xa);alert(_0xcbafa2(0x188)[_0xcbafa2(0x3a8)](_0x3c05e7));const _0x15ed15=[];for(const _0x17d06a of $dataTroops){if(_0xcbafa2(0x2d1)!==_0xcbafa2(0x2d1)){_0x421506[_0xcbafa2(0x872)]&&_0xc0c4e1[_0xcbafa2(0x872)]();const _0x591494=this[_0xcbafa2(0x544)]();if(_0x591494)_0x591494[_0xcbafa2(0x2a0)](_0x1b2c21);}else{if(!_0x17d06a)continue;const _0x467dd3=_0x17d06a['id'];_0x15ed15[_0x467dd3]=VisuMZ[_0xcbafa2(0xf9)][_0xcbafa2(0x2e9)](_0x467dd3);}}setTimeout(VisuMZ['CoreEngine'][_0xcbafa2(0x809)]['bind'](this,_0x15ed15),_0x3c05e7);},VisuMZ[_0x25789e(0xf9)]['ExtractStrFromTroop']=function(_0x5f26ca){const _0x26f727=_0x25789e;if(!$dataTroops[_0x5f26ca])return'';let _0x2f0525='█'[_0x26f727(0x4a5)](0x46)+'\x0a\x0a',_0x5dfd7d='═'[_0x26f727(0x4a5)](0x46)+'\x0a\x0a',_0x484d9d='';this[_0x26f727(0x535)]=0x0;const _0xab05a=$dataTroops[_0x5f26ca];let _0xd03571=_0xab05a[_0x26f727(0x284)];for(const _0x2b324c of _0xd03571){const _0x3a8562=_0xd03571[_0x26f727(0x14c)](_0x2b324c)+0x1;let _0x53ae01=_0x5dfd7d+_0x26f727(0x303),_0x15bebd=VisuMZ[_0x26f727(0xf9)]['ExtractStrFromList'](_0x2b324c['list']);_0x15bebd['length']>0x0&&(_0x484d9d[_0x26f727(0x73d)]>0x0?_0x26f727(0x694)===_0x26f727(0x694)?_0x484d9d+=_0x5dfd7d+_0x26f727(0x65d):this[_0x26f727(0x8b9)]={'SideView':_0x35f64d[_0x26f727(0x24f)],'BattleSystem':this['initialBattleSystem'](),'FontSize':_0x20eec6[_0x26f727(0xe8)][_0x26f727(0x92c)],'Padding':0xc}:_0x26f727(0x995)===_0x26f727(0xb0)?this['renderNoMask'](_0x1d6e91):_0x484d9d+=_0x2f0525+_0x26f727(0x542)[_0x26f727(0x3a8)](_0x5f26ca,_0xab05a[_0x26f727(0x126)]||'Unnamed')+_0x2f0525,_0x484d9d+=_0x53ae01[_0x26f727(0x3a8)](_0x3a8562,_0x15bebd));}if(_0x484d9d['length']>0x0){if(_0x26f727(0x92b)==='QbdZD')_0x484d9d+=_0x5dfd7d;else return'';}return _0x484d9d;},VisuMZ[_0x25789e(0xf9)]['exportAllTroopStrings']=function(_0x1e9f94){const _0x12825b=_0x25789e,_0x21d5eb=_0x12825b(0x101);_0x1e9f94[_0x12825b(0x253)](undefined)[_0x12825b(0x253)]('')['remove'](null);const _0x326601=_0x1e9f94['join'](_0x12825b(0x65d))[_0x12825b(0x91f)]();VisuMZ[_0x12825b(0xf9)]['ExportString'](_0x326601,_0x21d5eb,!![]),SceneManager[_0x12825b(0x5f4)][_0x12825b(0x724)]=!![];},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x93e)]=function(_0x15a125){const _0x3bbadf=_0x25789e;let _0x5cb45e='\x0a'+'─'[_0x3bbadf(0x4a5)](0x46)+'\x0a',_0x5bde94='\x0a'+'┄'['repeat'](0x46)+'\x0a',_0x566250='';for(const _0x21d2d7 of _0x15a125){if(_0x3bbadf(0x1e9)===_0x3bbadf(0x1a4))this[_0x3bbadf(0x29e)]=0x0;else{if(!_0x21d2d7)continue;if(_0x21d2d7[_0x3bbadf(0x98f)]===0x65)_0x566250+=_0x5cb45e+'\x0a',_0x566250+='〘Show\x20Text〙\x0a',_0x21d2d7[_0x3bbadf(0x1f3)][0x4]!==''&&_0x21d2d7[_0x3bbadf(0x1f3)][0x4]!==undefined&&(_0x566250+=_0x3bbadf(0x416)['format'](_0x21d2d7['parameters'][0x4]));else{if(_0x21d2d7[_0x3bbadf(0x98f)]===0x191)_0x566250+='%1\x0a'[_0x3bbadf(0x3a8)](_0x21d2d7[_0x3bbadf(0x1f3)][0x0]);else{if(_0x21d2d7[_0x3bbadf(0x98f)]===0x192)_0x566250+=_0x5cb45e,_0x566250+='%1〘Choice\x20%2〙\x20%3%1'[_0x3bbadf(0x3a8)](_0x5bde94,_0x21d2d7['parameters'][0x0]+0x1,_0x21d2d7[_0x3bbadf(0x1f3)][0x1]);else{if(_0x21d2d7[_0x3bbadf(0x98f)]===0x193)_0x566250+=_0x5cb45e,_0x566250+='%1〘Choice\x20Cancel〙%1'['format'](_0x5bde94);else{if(_0x21d2d7[_0x3bbadf(0x98f)]===0x194)_0x3bbadf(0x61f)==='mzfJl'?(_0x4390cc=_0x667ea8['round'](_0x2cca38),_0x4a5754=_0x51579a[_0x3bbadf(0x997)](_0x3c2f09),_0x3019b1[_0x3bbadf(0xf9)][_0x3bbadf(0x88f)][_0x3bbadf(0x800)](this,_0x59700c,_0x5d311b,_0x2eeefc,_0x36d55c)):(_0x566250+=_0x5cb45e,_0x566250+=_0x3bbadf(0x6ba)[_0x3bbadf(0x3a8)](_0x5bde94));else{if(_0x21d2d7[_0x3bbadf(0x98f)]===0x69){if(_0x3bbadf(0x7fd)!==_0x3bbadf(0x33e))_0x566250+=_0x5cb45e+'\x0a',_0x566250+='〘Scrolling\x20Text〙\x0a';else return _0x12ccca[_0x3bbadf(0xe4)][_0x3bbadf(0x105)][_0x3bbadf(0x800)](this);}else{if(_0x21d2d7[_0x3bbadf(0x98f)]===0x6c)_0x566250+=_0x5cb45e+'\x0a',_0x566250+=_0x3bbadf(0x377)[_0x3bbadf(0x3a8)](_0x21d2d7[_0x3bbadf(0x1f3)][0x0]);else{if(_0x21d2d7[_0x3bbadf(0x98f)]===0x198)_0x566250+=_0x3bbadf(0x23e)[_0x3bbadf(0x3a8)](_0x21d2d7[_0x3bbadf(0x1f3)][0x0]);else{if(_0x21d2d7[_0x3bbadf(0x98f)]===0x75){if(_0x3bbadf(0x739)===_0x3bbadf(0x739)){const _0x24174d=$dataCommonEvents[_0x21d2d7[_0x3bbadf(0x1f3)][0x0]];if(_0x24174d&&this[_0x3bbadf(0x535)]<=0xa){this[_0x3bbadf(0x535)]++;let _0x2af3e2=VisuMZ['CoreEngine'][_0x3bbadf(0x93e)](_0x24174d[_0x3bbadf(0x78d)]);if(_0x2af3e2[_0x3bbadf(0x73d)]>0x0){if(_0x3bbadf(0x35f)!==_0x3bbadf(0x35f)){const _0x370453=_0x239292[_0x3bbadf(0x8eb)]()[_0x3bbadf(0x6e7)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x1bf06f[_0x3bbadf(0x8eb)](),_0x112515,_0x48b87d,_0x56bc02);}else _0x566250+=_0x5cb45e,_0x566250+=_0x5bde94,_0x566250+=_0x3bbadf(0x732)[_0x3bbadf(0x3a8)](_0x24174d['id'],_0x24174d[_0x3bbadf(0x126)]),_0x566250+=_0x5bde94,_0x566250+=_0x2af3e2,_0x566250+=_0x5bde94,_0x566250+=_0x3bbadf(0x2bd)[_0x3bbadf(0x3a8)](_0x24174d['id'],_0x24174d[_0x3bbadf(0x126)]),_0x566250+=_0x5bde94;}this[_0x3bbadf(0x535)]--;}}else{if(_0x45a8bd[_0x3bbadf(0x254)]())_0x420984['log'](_0x4ee704);}}}}}}}}}}}}return _0x566250[_0x3bbadf(0x73d)]>0x0&&(_0x566250+=_0x5cb45e),_0x566250;},PluginManager['registerCommand'](pluginData[_0x25789e(0x126)],'OpenURL',_0x47d047=>{const _0x37538e=_0x25789e;VisuMZ[_0x37538e(0x747)](_0x47d047,_0x47d047);const _0x5e8617=_0x47d047[_0x37538e(0x545)];VisuMZ['openURL'](_0x5e8617);}),PluginManager['registerCommand'](pluginData[_0x25789e(0x126)],'GoldChange',_0x4a1157=>{const _0x281254=_0x25789e;VisuMZ[_0x281254(0x747)](_0x4a1157,_0x4a1157);const _0xc591f1=_0x4a1157[_0x281254(0x550)]||0x0;$gameParty['gainGold'](_0xc591f1);}),PluginManager[_0x25789e(0x9d6)](pluginData[_0x25789e(0x126)],_0x25789e(0x803),_0x4c2933=>{const _0x310d07=_0x25789e;if(!SceneManager['isSceneMap']())return;VisuMZ['ConvertParams'](_0x4c2933,_0x4c2933);const _0x2aac14=_0x4c2933[_0x310d07(0x401)];SceneManager['_scene'][_0x310d07(0xa02)](_0x2aac14);}),PluginManager[_0x25789e(0x9d6)](pluginData[_0x25789e(0x126)],_0x25789e(0x7db),_0x3a62ec=>{const _0x557a56=_0x25789e;if(!$gameTemp[_0x557a56(0x254)]())return;if(!Utils['isNwjs']())return;VisuMZ[_0x557a56(0x747)](_0x3a62ec,_0x3a62ec);const _0x23dbff=_0x3a62ec['PictureID']||0x1;$gameTemp[_0x557a56(0x725)]=_0x23dbff;}),PluginManager['registerCommand'](pluginData[_0x25789e(0x126)],_0x25789e(0x2f8),_0x648ef8=>{const _0x25aeb0=_0x25789e;VisuMZ[_0x25aeb0(0x747)](_0x648ef8,_0x648ef8);const _0x2dac02=_0x648ef8[_0x25aeb0(0x1f5)]||0x1,_0x28a65c=_0x648ef8[_0x25aeb0(0x78c)]||_0x25aeb0(0x22d),_0x54ed04=$gameScreen[_0x25aeb0(0x8a2)](_0x2dac02);_0x54ed04&&_0x54ed04[_0x25aeb0(0x312)](_0x28a65c);}),PluginManager['registerCommand'](pluginData[_0x25789e(0x126)],_0x25789e(0x8e9),_0x225bf7=>{const _0x5a9457=_0x25789e;for(let _0x19b808=0x1;_0x19b808<=0x64;_0x19b808++){$gameScreen[_0x5a9457(0x29a)](_0x19b808);}}),PluginManager['registerCommand'](pluginData['name'],_0x25789e(0x749),_0x26aa1f=>{const _0x2e8183=_0x25789e;VisuMZ[_0x2e8183(0x747)](_0x26aa1f,_0x26aa1f);const _0x2c03e6=Math[_0x2e8183(0x16b)](_0x26aa1f[_0x2e8183(0x547)],_0x26aa1f[_0x2e8183(0x7f3)]),_0x37b05d=Math[_0x2e8183(0x311)](_0x26aa1f['StartID'],_0x26aa1f[_0x2e8183(0x7f3)]);for(let _0x24b176=_0x2c03e6;_0x24b176<=_0x37b05d;_0x24b176++){$gameScreen[_0x2e8183(0x29a)](_0x24b176);}}),PluginManager[_0x25789e(0x9d6)](pluginData[_0x25789e(0x126)],_0x25789e(0x510),_0x5633=>{const _0x4c68a9=_0x25789e;VisuMZ['ConvertParams'](_0x5633,_0x5633);const _0x39290c=Math['round'](_0x5633[_0x4c68a9(0x9f7)])[_0x4c68a9(0x68d)](0x1,0x64),_0x332ae4=-Number(_0x5633[_0x4c68a9(0x2a8)]||0x0),_0x585638=Math[_0x4c68a9(0x311)](_0x5633[_0x4c68a9(0x526)]||0x0,0x0),_0x2658b0=_0x5633[_0x4c68a9(0x78c)]||_0x4c68a9(0x22d),_0x41449c=_0x5633['Wait'],_0x3c3090=$gameScreen[_0x4c68a9(0x8a2)](_0x39290c);if(!_0x3c3090)return;_0x3c3090[_0x4c68a9(0x3f5)](_0x332ae4,_0x585638,_0x2658b0);if(_0x41449c){if(_0x4c68a9(0x1de)===_0x4c68a9(0x1de)){const _0x5c36ba=$gameTemp[_0x4c68a9(0xf3)]();if(_0x5c36ba)_0x5c36ba[_0x4c68a9(0x230)](_0x585638);}else this[_0x4c68a9(0x29e)]=_0x4c68a9(0x43b);}}),PluginManager[_0x25789e(0x9d6)](pluginData[_0x25789e(0x126)],'PictureRotate',_0x529a3c=>{const _0x263016=_0x25789e;VisuMZ[_0x263016(0x747)](_0x529a3c,_0x529a3c);const _0x41c72c=Math[_0x263016(0x997)](_0x529a3c[_0x263016(0x9f7)])[_0x263016(0x68d)](0x1,0x64),_0x1c1d8a=-Number(_0x529a3c[_0x263016(0x1b8)]||0x0),_0x4e2452=Math[_0x263016(0x311)](_0x529a3c['Duration']||0x0,0x0),_0x3df9a8=_0x529a3c[_0x263016(0x78c)]||'Linear',_0x2256d9=_0x529a3c[_0x263016(0x42a)],_0x22c196=$gameScreen[_0x263016(0x8a2)](_0x41c72c);if(!_0x22c196)return;_0x22c196[_0x263016(0x40b)](_0x1c1d8a,_0x4e2452,_0x3df9a8);if(_0x2256d9){if(_0x263016(0x1d2)!==_0x263016(0x8fc)){const _0x199ea9=$gameTemp[_0x263016(0xf3)]();if(_0x199ea9)_0x199ea9[_0x263016(0x230)](_0x4e2452);}else return this[_0x263016(0x6b5)]();}}),PluginManager['registerCommand'](pluginData[_0x25789e(0x126)],_0x25789e(0x9e6),_0x12329a=>{const _0x1b0196=_0x25789e;VisuMZ[_0x1b0196(0x747)](_0x12329a,_0x12329a);const _0xfb2826=Math[_0x1b0196(0x997)](_0x12329a['PictureID'])[_0x1b0196(0x68d)](0x1,0x64),_0x9c50b3=_0x12329a[_0x1b0196(0x59c)],_0x368556=_0x9c50b3[_0x1b0196(0x9f8)][_0x1b0196(0x68d)](0x0,0x1),_0x4ef982=Math['round'](_0x9c50b3[_0x1b0196(0x206)]||0x0),_0x23a10a=Math[_0x1b0196(0x997)](_0x9c50b3[_0x1b0196(0x454)]||0x0),_0x4895b0=Math[_0x1b0196(0x997)](_0x9c50b3['ScaleX']||0x0),_0xfba0dd=Math[_0x1b0196(0x997)](_0x9c50b3[_0x1b0196(0x9ca)]||0x0),_0x4fb9e7=Math['round'](_0x9c50b3[_0x1b0196(0x7a2)])['clamp'](0x0,0xff),_0x31ae02=_0x9c50b3[_0x1b0196(0x5aa)],_0x1a0a5d='VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2',_0x45fb67=_0x12329a[_0x1b0196(0x7b0)]?_0x1b0196(0x7b0):_0x1b0196(0x7b8),_0x5138b2=_0x1a0a5d['format'](_0x12329a[_0x1b0196(0x31a)],_0x45fb67);$gameScreen['showPicture'](_0xfb2826,_0x5138b2,_0x368556,_0x4ef982,_0x23a10a,_0x4895b0,_0xfba0dd,_0x4fb9e7,_0x31ae02);}),PluginManager[_0x25789e(0x9d6)](pluginData['name'],'ScreenShake',_0x50771b=>{const _0x6ee697=_0x25789e;VisuMZ[_0x6ee697(0x747)](_0x50771b,_0x50771b);const _0x55ccd2=_0x50771b['Type']||_0x6ee697(0x80f),_0x42d2f7=_0x50771b[_0x6ee697(0x9f6)]['clamp'](0x1,0x9),_0xbfcfd2=_0x50771b[_0x6ee697(0x554)][_0x6ee697(0x68d)](0x1,0x9),_0x33e50f=_0x50771b[_0x6ee697(0x526)]||0x1,_0x488515=_0x50771b[_0x6ee697(0x42a)];$gameScreen[_0x6ee697(0x740)](_0x55ccd2),$gameScreen[_0x6ee697(0x7ad)](_0x42d2f7,_0xbfcfd2,_0x33e50f);if(_0x488515){if(_0x6ee697(0x4af)!==_0x6ee697(0x4af))_0x5c0f0e['isOptionValid'](_0x6ee697(0x884))&&_0x349ecb[_0x6ee697(0xf9)][_0x6ee697(0x59c)][_0x6ee697(0x25e)][_0x6ee697(0x5cc)]?this[_0x6ee697(0x5a9)]():_0x565fff[_0x6ee697(0xf9)][_0x6ee697(0x877)][_0x6ee697(0x800)](this);else{const _0x14b14a=$gameTemp[_0x6ee697(0xf3)]();if(_0x14b14a)_0x14b14a[_0x6ee697(0x230)](_0x33e50f);}}}),PluginManager['registerCommand'](pluginData[_0x25789e(0x126)],_0x25789e(0x18a),_0x420f5d=>{const _0x2c2989=_0x25789e;if($gameParty[_0x2c2989(0x23b)]())return;VisuMZ[_0x2c2989(0x747)](_0x420f5d,_0x420f5d);const _0x49d52f=_0x420f5d['IDs'],_0x4a91bf=(_0x420f5d[_0x2c2989(0x132)]||0x0)/0x64;for(const _0x14971b of _0x49d52f){const _0x13719d=Math[_0x2c2989(0x80f)]()<=_0x4a91bf;$gameSwitches[_0x2c2989(0x5eb)](_0x14971b,_0x13719d);}}),PluginManager[_0x25789e(0x9d6)](pluginData[_0x25789e(0x126)],_0x25789e(0x4d8),_0x49f1a6=>{const _0xe6a806=_0x25789e;if($gameParty[_0xe6a806(0x23b)]())return;VisuMZ[_0xe6a806(0x747)](_0x49f1a6,_0x49f1a6);const _0x13eef5=Math[_0xe6a806(0x16b)](_0x49f1a6[_0xe6a806(0x547)],_0x49f1a6['EndingID']),_0x1d3560=Math[_0xe6a806(0x311)](_0x49f1a6[_0xe6a806(0x547)],_0x49f1a6[_0xe6a806(0x7f3)]),_0x5b2a32=(_0x49f1a6['Chance']||0x0)/0x64;for(let _0x39475a=_0x13eef5;_0x39475a<=_0x1d3560;_0x39475a++){const _0x391137=Math[_0xe6a806(0x80f)]()<=_0x5b2a32;$gameSwitches['setValue'](_0x39475a,_0x391137);}}),PluginManager[_0x25789e(0x9d6)](pluginData[_0x25789e(0x126)],_0x25789e(0x577),_0x201015=>{const _0x324645=_0x25789e;if($gameParty[_0x324645(0x23b)]())return;VisuMZ[_0x324645(0x747)](_0x201015,_0x201015);const _0x2f422c=_0x201015['IDs'];for(const _0x1a29b9 of _0x2f422c){if('elORF'===_0x324645(0x56d)){const _0x3bf165=$gameSwitches[_0x324645(0x550)](_0x1a29b9);$gameSwitches[_0x324645(0x5eb)](_0x1a29b9,!_0x3bf165);}else this[_0x324645(0x333)]=new _0x6dcf7b(),this[_0x324645(0x99d)](this[_0x324645(0x333)]);}}),PluginManager[_0x25789e(0x9d6)](pluginData[_0x25789e(0x126)],_0x25789e(0x149),_0x3a73c7=>{const _0x483b3a=_0x25789e;if($gameParty[_0x483b3a(0x23b)]())return;VisuMZ[_0x483b3a(0x747)](_0x3a73c7,_0x3a73c7);const _0x3a4286=Math[_0x483b3a(0x16b)](_0x3a73c7[_0x483b3a(0x547)],_0x3a73c7[_0x483b3a(0x7f3)]),_0x1622b8=Math['max'](_0x3a73c7[_0x483b3a(0x547)],_0x3a73c7[_0x483b3a(0x7f3)]);for(let _0x3a8bc1=_0x3a4286;_0x3a8bc1<=_0x1622b8;_0x3a8bc1++){const _0xf53085=$gameSwitches['value'](_0x3a8bc1);$gameSwitches[_0x483b3a(0x5eb)](_0x3a8bc1,!_0xf53085);}}),PluginManager['registerCommand'](pluginData[_0x25789e(0x126)],_0x25789e(0xbf),_0x2362c2=>{const _0x1753a5=_0x25789e;VisuMZ[_0x1753a5(0x747)](_0x2362c2,_0x2362c2);const _0x1faaeb=_0x2362c2['option']||0x1;$gameSystem[_0x1753a5(0x789)](_0x1faaeb);}),PluginManager['registerCommand'](pluginData[_0x25789e(0x126)],_0x25789e(0x7f5),_0x5cf302=>{const _0x23514e=_0x25789e;if($gameParty['inBattle']())return;VisuMZ[_0x23514e(0x747)](_0x5cf302,_0x5cf302);const _0x43301b=_0x5cf302['option'];if(_0x43301b[_0x23514e(0x8af)](/Front/i))_0x23514e(0x14d)===_0x23514e(0x445)?this[_0x23514e(0x868)][_0x23514e(0x2a0)](_0x54523e):$gameSystem[_0x23514e(0x6de)](![]);else _0x43301b[_0x23514e(0x8af)](/Side/i)?$gameSystem['setSideView'](!![]):$gameSystem[_0x23514e(0x6de)](!$gameSystem['isSideView']());}),PluginManager['registerCommand'](pluginData['name'],_0x25789e(0x45f),_0x413b34=>{const _0xcbd63d=_0x25789e;if($gameParty[_0xcbd63d(0x23b)]())return;VisuMZ['ConvertParams'](_0x413b34,_0x413b34);const _0x2d62f8=[_0xcbd63d(0x2c6),_0xcbd63d(0x5b9),'me','se'];for(const _0x266bc4 of _0x2d62f8){if(_0xcbd63d(0x908)!==_0xcbd63d(0x7ec)){const _0x2e0524=_0x413b34[_0x266bc4],_0xbc392d=_0xcbd63d(0x19e)['format'](_0x266bc4);for(const _0x5ea122 of _0x2e0524){AudioManager['createBuffer'](_0xbc392d,_0x5ea122);}}else return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0xcbd63d(0x21e)]);}}),PluginManager[_0x25789e(0x9d6)](pluginData[_0x25789e(0x126)],_0x25789e(0x86a),_0x4c7359=>{const _0x4fb2bd=_0x25789e;if($gameParty[_0x4fb2bd(0x23b)]())return;VisuMZ['ConvertParams'](_0x4c7359,_0x4c7359);const _0x525ffa=[_0x4fb2bd(0x2ad),_0x4fb2bd(0x339),_0x4fb2bd(0x562),_0x4fb2bd(0x9a3),_0x4fb2bd(0x48f),'faces',_0x4fb2bd(0x268),_0x4fb2bd(0x571),'sv_actors',_0x4fb2bd(0x70c),_0x4fb2bd(0xae),_0x4fb2bd(0x645),_0x4fb2bd(0x642),_0x4fb2bd(0x6f3)];for(const _0x24fb78 of _0x525ffa){const _0x495b3b=_0x4c7359[_0x24fb78],_0x2c40a5=_0x4fb2bd(0x49d)['format'](_0x24fb78);for(const _0x27735e of _0x495b3b){ImageManager[_0x4fb2bd(0x636)](_0x2c40a5,_0x27735e);}}}),PluginManager[_0x25789e(0x9d6)](pluginData['name'],'SystemSetBattleSystem',_0xe9cea1=>{const _0x1f3192=_0x25789e;if($gameParty['inBattle']())return;VisuMZ[_0x1f3192(0x747)](_0xe9cea1,_0xe9cea1);const _0x4f8939=_0xe9cea1[_0x1f3192(0x153)][_0x1f3192(0x595)]()['trim'](),_0x20540f=VisuMZ['CoreEngine'][_0x1f3192(0x117)](_0x4f8939);$gameSystem[_0x1f3192(0x483)](_0x20540f);}),VisuMZ[_0x25789e(0xf9)][_0x25789e(0x117)]=function(_0x56e683){const _0x13e457=_0x25789e;_0x56e683=_0x56e683||_0x13e457(0x6bb),_0x56e683=String(_0x56e683)['toUpperCase']()[_0x13e457(0x91f)]();switch(_0x56e683){case'DTB':return 0x0;case _0x13e457(0x675):Imported[_0x13e457(0x37a)]&&(ConfigManager[_0x13e457(0x6be)]=!![]);return 0x1;case _0x13e457(0x83f):Imported[_0x13e457(0x37a)]&&('RVuio'!==_0x13e457(0x6b9)?ConfigManager[_0x13e457(0x6be)]=![]:(this[_0x13e457(0x71f)]=new _0x544f7f['filters'][(_0x13e457(0x793))](_0x1d69ab=!![]),this[_0x13e457(0x62f)]=new _0x260155(),this['_backgroundSprite'][_0x13e457(0x6d6)]=_0x5e08dd[_0x13e457(0x1a6)](),this[_0x13e457(0x62f)][_0x13e457(0x4cd)]=[this[_0x13e457(0x71f)]],this[_0x13e457(0x407)][_0x13e457(0x99d)](this[_0x13e457(0x62f)])));return 0x2;case _0x13e457(0x5fe):if(Imported[_0x13e457(0x585)])return'CTB';break;case'STB':if(Imported['VisuMZ_2_BattleSystemSTB'])return'STB';break;case _0x13e457(0x6e9):if(Imported['VisuMZ_2_BattleSystemBTB'])return'BTB';break;case _0x13e457(0x35c):if(Imported[_0x13e457(0x354)])return _0x13e457(0x35c);break;case _0x13e457(0x899):if(Imported[_0x13e457(0x1c5)])return _0x13e457(0x486)!==_0x13e457(0x486)?_0xbcf9c1['vertJS'][_0x13e457(0x800)](this):_0x13e457(0x899);break;case _0x13e457(0x7d8):if(Imported[_0x13e457(0x330)])return'ETB';break;case _0x13e457(0x33f):if(Imported[_0x13e457(0x8d7)])return _0x13e457(0x33f);break;}return $dataSystem[_0x13e457(0x185)];},PluginManager['registerCommand'](pluginData[_0x25789e(0x126)],_0x25789e(0x26c),_0x619fc9=>{const _0x22c604=_0x25789e;VisuMZ[_0x22c604(0x747)](_0x619fc9,_0x619fc9);const _0x2d8791=_0x619fc9[_0x22c604(0x153)]||0x1;$gameSystem['setWindowPadding'](_0x2d8791);}),PluginManager[_0x25789e(0x9d6)](pluginData[_0x25789e(0x126)],_0x25789e(0x850),_0x14e194=>{VisuMZ['ConvertParams'](_0x14e194,_0x14e194);const _0x2b1223=_0x14e194['text']||'';$textPopup(_0x2b1223);}),PluginManager[_0x25789e(0x9d6)](pluginData[_0x25789e(0x126)],'VariableEvalReference',_0x13f7df=>{const _0x515590=_0x25789e;VisuMZ[_0x515590(0x747)](_0x13f7df,_0x13f7df);const _0x332238=_0x13f7df['id']||0x1,_0x182989=_0x13f7df[_0x515590(0x27c)],_0x235af2=_0x13f7df['operand']||0x0;let _0xc5b216=$gameVariables[_0x515590(0x550)](_0x332238)||0x0;switch(_0x182989){case'=':_0xc5b216=_0x235af2;break;case'+':_0xc5b216+=_0x235af2;break;case'-':_0xc5b216-=_0x235af2;break;case'*':_0xc5b216*=_0x235af2;break;case'/':_0xc5b216/=_0x235af2;break;case'%':_0xc5b216%=_0x235af2;break;}_0xc5b216=_0xc5b216||0x0,$gameVariables[_0x515590(0x5eb)](_0x332238,_0xc5b216);}),PluginManager[_0x25789e(0x9d6)](pluginData[_0x25789e(0x126)],_0x25789e(0x82f),_0x569956=>{const _0x3488f4=_0x25789e;VisuMZ[_0x3488f4(0x747)](_0x569956,_0x569956);const _0x517045=_0x569956['id']()||0x1,_0x452399=_0x569956[_0x3488f4(0x27c)],_0x6c49ed=_0x569956['operand']()||0x0;let _0x19c4ae=$gameVariables[_0x3488f4(0x550)](_0x517045)||0x0;switch(_0x452399){case'=':_0x19c4ae=_0x6c49ed;break;case'+':_0x19c4ae+=_0x6c49ed;break;case'-':_0x19c4ae-=_0x6c49ed;break;case'*':_0x19c4ae*=_0x6c49ed;break;case'/':_0x19c4ae/=_0x6c49ed;break;case'%':_0x19c4ae%=_0x6c49ed;break;}_0x19c4ae=_0x19c4ae||0x0,$gameVariables[_0x3488f4(0x5eb)](_0x517045,_0x19c4ae);}),VisuMZ[_0x25789e(0xf9)][_0x25789e(0x28f)]=Scene_Boot[_0x25789e(0x866)][_0x25789e(0x622)],Scene_Boot[_0x25789e(0x866)][_0x25789e(0x622)]=function(){const _0x566e06=_0x25789e;VisuMZ[_0x566e06(0xf9)][_0x566e06(0x28f)][_0x566e06(0x800)](this),this['process_VisuMZ_CoreEngine_RegExp'](),this[_0x566e06(0x7ae)](),this[_0x566e06(0x3d0)](),this[_0x566e06(0x340)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),this[_0x566e06(0x1da)](),VisuMZ[_0x566e06(0x502)]();},VisuMZ[_0x25789e(0xf9)]['RegExp']={},Scene_Boot['prototype'][_0x25789e(0x6c0)]=function(){const _0x5e031e=_0x25789e,_0x481571=[_0x5e031e(0x4a3),'MAXMP',_0x5e031e(0x11a),_0x5e031e(0x5f6),_0x5e031e(0x5cf),'MDF',_0x5e031e(0x1a1),'LUK'],_0xe62ca2=[_0x5e031e(0x909),_0x5e031e(0x985),'CRI',_0x5e031e(0x7ef),'MEV','MRF',_0x5e031e(0x787),_0x5e031e(0x2d5),_0x5e031e(0x3ca),'TRG'],_0x165ad7=[_0x5e031e(0x9bd),'GRD',_0x5e031e(0x7e8),_0x5e031e(0x2b8),_0x5e031e(0x712),_0x5e031e(0x45b),_0x5e031e(0x9af),_0x5e031e(0x4b8),'FDR',_0x5e031e(0x280)],_0x2504a3=[_0x481571,_0xe62ca2,_0x165ad7],_0x20c4cd=[_0x5e031e(0x2ff),_0x5e031e(0x8cb),'Plus2','Max',_0x5e031e(0x70e),_0x5e031e(0x380),_0x5e031e(0x696),_0x5e031e(0x134),_0x5e031e(0x988),_0x5e031e(0x73a)];for(const _0x393b12 of _0x2504a3){if('Egpmh'!==_0x5e031e(0x63b)){let _0x7799d4='';if(_0x393b12===_0x481571)_0x7799d4='param';if(_0x393b12===_0xe62ca2)_0x7799d4=_0x5e031e(0x291);if(_0x393b12===_0x165ad7)_0x7799d4='sparam';for(const _0x10b6a2 of _0x20c4cd){let _0x1cad38=_0x5e031e(0x5f2)[_0x5e031e(0x3a8)](_0x7799d4,_0x10b6a2);VisuMZ[_0x5e031e(0xf9)][_0x5e031e(0x26a)][_0x1cad38]=[],VisuMZ[_0x5e031e(0xf9)][_0x5e031e(0x26a)][_0x1cad38+'JS']=[];let _0x4c2c90=_0x5e031e(0x55e);if([_0x5e031e(0x2ff),_0x5e031e(0x134)]['includes'](_0x10b6a2))_0x5e031e(0x7b7)===_0x5e031e(0x7b7)?_0x4c2c90+=_0x5e031e(0x832):(this[_0x5e031e(0x957)]=new _0x12291d(),this['_image'][_0x5e031e(0x1e7)]=this[_0x5e031e(0xc1)][_0x5e031e(0x53d)](this),this[_0x5e031e(0x957)][_0x5e031e(0x24e)]=this[_0x5e031e(0x917)][_0x5e031e(0x53d)](this),this['_destroyCanvas'](),this[_0x5e031e(0x768)]=_0x5e031e(0x1df),_0x1d68a5['hasEncryptedImages']()?this[_0x5e031e(0x65b)]():(this[_0x5e031e(0x957)][_0x5e031e(0x17b)]=this['_url'],![]&&this[_0x5e031e(0x957)][_0x5e031e(0x59d)]>0x0&&(this[_0x5e031e(0x957)]['onload']=null,this[_0x5e031e(0xc1)]())));else{if(['Plus1',_0x5e031e(0x988)][_0x5e031e(0x2ec)](_0x10b6a2))_0x5e031e(0x5c1)===_0x5e031e(0x5c1)?_0x4c2c90+=_0x5e031e(0x785):_0x20b3e7[_0x5e031e(0x904)][0x52]=_0x5e031e(0x8f1);else{if([_0x5e031e(0x59f),_0x5e031e(0x73a)][_0x5e031e(0x2ec)](_0x10b6a2))_0x4c2c90+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';else{if(_0x10b6a2===_0x5e031e(0xf7))'CKnnx'!==_0x5e031e(0x4fa)?_0x4c2c90+=_0x5e031e(0x384):_0x1bbe9a[_0x5e031e(0x5b2)](_0x19fdc3);else{if(_0x10b6a2===_0x5e031e(0x380))_0x4c2c90+=_0x5e031e(0x1fa);else{if(_0x10b6a2===_0x5e031e(0x696)){if(_0x5e031e(0x414)===_0x5e031e(0x74a))return _0x2eacf8[_0x5e031e(0x754)]()-0x8;else _0x4c2c90+=_0x5e031e(0x570);}}}}}}for(const _0x22357c of _0x393b12){if('MToDy'===_0x5e031e(0x837))return _0x1948b7;else{let _0x19d73b=_0x10b6a2[_0x5e031e(0x6e7)](/[\d+]/g,'')[_0x5e031e(0x595)]();const _0x41b916=_0x4c2c90['format'](_0x22357c,_0x19d73b);VisuMZ['CoreEngine'][_0x5e031e(0x26a)][_0x1cad38][_0x5e031e(0x5b2)](new RegExp(_0x41b916,'i'));const _0x9841ec=_0x5e031e(0x5b0)['format'](_0x22357c,_0x19d73b);VisuMZ[_0x5e031e(0xf9)][_0x5e031e(0x26a)][_0x1cad38+'JS']['push'](new RegExp(_0x9841ec,'i'));}}}}else _0x1ff8b2[_0x5e031e(0xf9)][_0x5e031e(0x7c1)]['call'](this);}},Scene_Boot[_0x25789e(0x866)]['process_VisuMZ_CoreEngine_Notetags']=function(){const _0x50c68b=_0x25789e;if(VisuMZ[_0x50c68b(0x502)])return;},Scene_Boot[_0x25789e(0x866)][_0x25789e(0x3d0)]=function(){const _0x2d6739=_0x25789e,_0x1653f0=VisuMZ[_0x2d6739(0xf9)][_0x2d6739(0x59c)];_0x1653f0['QoL']['OpenConsole']&&VisuMZ[_0x2d6739(0x77d)](!![]);_0x1653f0['QoL'][_0x2d6739(0x69a)]&&(Input[_0x2d6739(0x904)][0x23]=_0x2d6739(0x9f5),Input[_0x2d6739(0x904)][0x24]=_0x2d6739(0x12f));if(_0x1653f0[_0x2d6739(0x39f)]){const _0x57a803=_0x1653f0[_0x2d6739(0x39f)];_0x57a803[_0x2d6739(0xe0)]=_0x57a803['KeySHIFT']||_0x2d6739(0x15f),_0x57a803[_0x2d6739(0x5ae)]=_0x57a803[_0x2d6739(0x5ae)]||_0x2d6739(0x39a);}_0x1653f0[_0x2d6739(0x359)][_0x2d6739(0x9ce)]&&(_0x2d6739(0x76c)!==_0x2d6739(0x29d)?(Input[_0x2d6739(0x904)][0x57]='up',Input['keyMapper'][0x41]=_0x2d6739(0x981),Input[_0x2d6739(0x904)][0x53]=_0x2d6739(0x2cc),Input[_0x2d6739(0x904)][0x44]='right',Input[_0x2d6739(0x904)][0x45]=_0x2d6739(0x1a3)):(_0x417a2f[_0x2d6739(0x927)](_0x2d6739(0x5cb)),_0x2f5e05[_0x2d6739(0x927)](_0x4a8335)));if(_0x1653f0['KeyboardInput']['DashToggleR']){if(_0x2d6739(0x233)!==_0x2d6739(0x233)){const _0x429626=_0x564cf0[_0x2d6739(0x505)]();_0x429626>_0x22a5e1&&(_0x3f01bd=_0x429626,this['setAction'](_0x478bfb,_0x5f2bc5));}else Input['keyMapper'][0x52]=_0x2d6739(0x8f1);}_0x1653f0[_0x2d6739(0x5c0)][_0x2d6739(0xf5)]=_0x1653f0[_0x2d6739(0x5c0)][_0x2d6739(0xf5)][_0x2d6739(0x8d5)](_0x4b8dc6=>_0x4b8dc6['toUpperCase']()[_0x2d6739(0x91f)]()),_0x1653f0[_0x2d6739(0x5c0)][_0x2d6739(0x6a0)]=_0x1653f0[_0x2d6739(0x5c0)][_0x2d6739(0x6a0)]['map'](_0x2c613f=>_0x2c613f['toUpperCase']()[_0x2d6739(0x91f)]()),_0x1653f0[_0x2d6739(0x25e)][_0x2d6739(0x98c)]=_0x1653f0['QoL'][_0x2d6739(0x98c)]??!![],_0x1653f0[_0x2d6739(0x25e)][_0x2d6739(0x7b4)]=_0x1653f0[_0x2d6739(0x25e)]['ShiftT_Toggle']??!![];},Scene_Boot['prototype'][_0x25789e(0x340)]=function(){this['process_VisuMZ_CoreEngine_jsQuickFunctions']();},Scene_Boot['prototype'][_0x25789e(0x714)]=function(){const _0x441260=_0x25789e,_0x2e3aab=VisuMZ['CoreEngine']['Settings'][_0x441260(0x1cd)];for(const _0x2d53a7 of _0x2e3aab){const _0x11e153=_0x2d53a7['FunctionName'][_0x441260(0x6e7)](/[ ]/g,''),_0x2dc39f=_0x2d53a7[_0x441260(0x900)];VisuMZ['CoreEngine'][_0x441260(0x376)](_0x11e153,_0x2dc39f);}},VisuMZ[_0x25789e(0xf9)]['createJsQuickFunction']=function(_0x2a459f,_0x260bb6){const _0x3396c1=_0x25789e;if(!!window[_0x2a459f]){if(_0x3396c1(0x97b)===_0x3396c1(0x97b)){if($gameTemp[_0x3396c1(0x254)]())console[_0x3396c1(0x927)](_0x3396c1(0x3a0)['format'](_0x2a459f));}else this[_0x3396c1(0x2ba)]=0x0;}const _0x436275=_0x3396c1(0x718)['format'](_0x2a459f,_0x260bb6);window[_0x2a459f]=new Function(_0x436275);},Scene_Boot[_0x25789e(0x866)]['process_VisuMZ_CoreEngine_CustomParameters']=function(){const _0x27e43c=_0x25789e,_0x2793a0=VisuMZ[_0x27e43c(0xf9)][_0x27e43c(0x59c)]['CustomParam'];if(!_0x2793a0)return;for(const _0x59f568 of _0x2793a0){if(!_0x59f568)continue;VisuMZ['CoreEngine'][_0x27e43c(0x672)](_0x59f568);}},VisuMZ['CoreEngine']['CustomParamNames']={},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x891)]={},VisuMZ[_0x25789e(0xf9)]['CustomParamType']={},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x85f)]={},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x672)]=function(_0x55bd58){const _0x3fafe7=_0x25789e,_0x236796=_0x55bd58[_0x3fafe7(0x1f8)],_0x468922=_0x55bd58[_0x3fafe7(0x596)],_0x446ccf=_0x55bd58[_0x3fafe7(0x5c6)],_0x2f9f5e=_0x55bd58[_0x3fafe7(0x57d)],_0xb44c3d=new Function(_0x55bd58[_0x3fafe7(0x8ac)]);VisuMZ[_0x3fafe7(0xf9)][_0x3fafe7(0x6da)][_0x236796[_0x3fafe7(0x595)]()['trim']()]=_0x468922,VisuMZ[_0x3fafe7(0xf9)][_0x3fafe7(0x891)][_0x236796[_0x3fafe7(0x595)]()['trim']()]=_0x446ccf,VisuMZ[_0x3fafe7(0xf9)]['CustomParamType'][_0x236796[_0x3fafe7(0x595)]()[_0x3fafe7(0x91f)]()]=_0x2f9f5e,VisuMZ[_0x3fafe7(0xf9)][_0x3fafe7(0x85f)][_0x236796[_0x3fafe7(0x595)]()[_0x3fafe7(0x91f)]()]=_0x236796,Object[_0x3fafe7(0x1ed)](Game_BattlerBase[_0x3fafe7(0x866)],_0x236796,{'get'(){const _0x4bdf39=_0x3fafe7,_0x4e4b3d=_0xb44c3d[_0x4bdf39(0x800)](this);return _0x2f9f5e===_0x4bdf39(0x76b)?Math[_0x4bdf39(0x997)](_0x4e4b3d):_0x4e4b3d;}});},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x3d8)]={},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x924)]={},Scene_Boot[_0x25789e(0x866)]['process_VisuMZ_CoreEngine_ControllerButtons']=function(){const _0x26dc65=_0x25789e,_0x8541ea=VisuMZ[_0x26dc65(0xf9)][_0x26dc65(0x59c)][_0x26dc65(0x3d8)];for(const _0x45f3d1 of _0x8541ea){const _0x410d86=(_0x45f3d1[_0x26dc65(0x1b4)]||'')[_0x26dc65(0x76e)]()[_0x26dc65(0x91f)](),_0x52bb94=(_0x45f3d1[_0x26dc65(0x73c)]||'')['toLowerCase']()[_0x26dc65(0x91f)]();VisuMZ[_0x26dc65(0xf9)][_0x26dc65(0x3d8)][_0x410d86]=_0x45f3d1,VisuMZ['CoreEngine'][_0x26dc65(0x924)][_0x52bb94]=_0x410d86;}},VisuMZ['ParseAllNotetags']=function(){const _0x5b72d8=_0x25789e;for(const _0x2e36d7 of $dataActors){if(_0x2e36d7)VisuMZ[_0x5b72d8(0x43f)](_0x2e36d7);}for(const _0x4ca2ce of $dataClasses){if(_0x5b72d8(0x811)===_0x5b72d8(0x582))this[_0x5b72d8(0x834)](_0x5ec676);else{if(_0x4ca2ce)VisuMZ[_0x5b72d8(0x43c)](_0x4ca2ce);}}for(const _0x5a0ea0 of $dataSkills){if(_0x5a0ea0)VisuMZ['ParseSkillNotetags'](_0x5a0ea0);}for(const _0x5b993f of $dataItems){if(_0x5b993f)VisuMZ[_0x5b72d8(0x329)](_0x5b993f);}for(const _0x4606ff of $dataWeapons){if(_0x4606ff)VisuMZ[_0x5b72d8(0x25a)](_0x4606ff);}for(const _0x3c817a of $dataArmors){if('QAOad'===_0x5b72d8(0x13d)){if(_0x3c817a)VisuMZ[_0x5b72d8(0x9bc)](_0x3c817a);}else{const _0x446afb=this['paramX']()-this[_0x5b72d8(0x10e)]()*0x2;this[_0x5b72d8(0x66e)](_0x3c121d,_0x38e161,_0x446afb,_0x79f7f5,![]);}}for(const _0x597c59 of $dataEnemies){if(_0x597c59)VisuMZ[_0x5b72d8(0x651)](_0x597c59);}for(const _0x4a1b5a of $dataStates){if(_0x4a1b5a)VisuMZ[_0x5b72d8(0x262)](_0x4a1b5a);}for(const _0x4ea987 of $dataTilesets){if(_0x5b72d8(0x9e8)===_0x5b72d8(0x8b8))_0x4710f4[_0x5b72d8(0x872)]();else{if(_0x4ea987)VisuMZ[_0x5b72d8(0x184)](_0x4ea987);}}},VisuMZ[_0x25789e(0x43f)]=function(_0x23fbd8){},VisuMZ['ParseClassNotetags']=function(_0x310807){},VisuMZ['ParseSkillNotetags']=function(_0x3d7ced){},VisuMZ[_0x25789e(0x329)]=function(_0x330fd7){},VisuMZ[_0x25789e(0x25a)]=function(_0x26234b){},VisuMZ['ParseArmorNotetags']=function(_0x59df81){},VisuMZ[_0x25789e(0x651)]=function(_0x50c583){},VisuMZ[_0x25789e(0x262)]=function(_0x568367){},VisuMZ['ParseTilesetNotetags']=function(_0x377dea){},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x43f)]=VisuMZ[_0x25789e(0x43f)],VisuMZ[_0x25789e(0x43f)]=function(_0x604cac){const _0x30d810=_0x25789e;VisuMZ[_0x30d810(0xf9)][_0x30d810(0x43f)]['call'](this,_0x604cac);const _0x3075ab=_0x604cac[_0x30d810(0x881)];if(_0x3075ab[_0x30d810(0x8af)](/<MAX LEVEL:[ ](\d+)>/i)){if(_0x30d810(0x7bf)!==_0x30d810(0x7bf)){if(!this['bitmap'])return;if(!this[_0x30d810(0x6d6)][_0x30d810(0xde)])return;this['bitmap'][_0x30d810(0xd1)]&&!this[_0x30d810(0x41b)][_0x30d810(0xd1)][_0x30d810(0x578)]&&this[_0x30d810(0x6d6)][_0x30d810(0x85c)]();}else{_0x604cac[_0x30d810(0x667)]=Number(RegExp['$1']);if(_0x604cac[_0x30d810(0x667)]===0x0)_0x604cac[_0x30d810(0x667)]=Number[_0x30d810(0x1c6)];}}_0x3075ab[_0x30d810(0x8af)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x604cac[_0x30d810(0x513)]=Math['min'](Number(RegExp['$1']),_0x604cac[_0x30d810(0x667)]));},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x43c)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x25789e(0x43c)]=function(_0x1ce2d0){const _0x15a896=_0x25789e;VisuMZ[_0x15a896(0xf9)][_0x15a896(0x43c)]['call'](this,_0x1ce2d0);if(_0x1ce2d0[_0x15a896(0xa1)]){if(_0x15a896(0x6ca)===_0x15a896(0x6ca))for(const _0x39bdd9 of _0x1ce2d0[_0x15a896(0xa1)]){_0x15a896(0x4d4)!=='FftPg'?(this[_0x15a896(0x569)]=![],this[_0x15a896(0x736)]=!_0x597a7f[_0x15a896(0xf9)][_0x15a896(0x59c)]['UI'][_0x15a896(0x63d)]):_0x39bdd9[_0x15a896(0x881)][_0x15a896(0x8af)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x39bdd9['level']=Math[_0x15a896(0x311)](Number(RegExp['$1']),0x1));}else{const _0x77b9fe=this[_0x15a896(0x1c4)](_0x1094e2),_0x3c1068=new(_0x77b9fe?_0xeff2ac:_0x88e6bf)(),_0x25fba1=this['makeTargetSprites'](_0x3b838e);this['animationShouldMirror'](_0x57b5c4[0x0])&&(_0x5c58cc=!_0x4e5a3d);_0x3c1068[_0x15a896(0x3f2)]=_0x50e403,_0x3c1068[_0x15a896(0x21a)](_0x25fba1,_0x569272,_0x5855e7,_0x3c93f5),_0x3c1068[_0x15a896(0x355)](_0x456d01),this[_0x15a896(0x27a)](_0x3c1068);if(this[_0x15a896(0x447)])this[_0x15a896(0x447)][_0x15a896(0x253)](_0x3c1068);this['_fauxAnimationSprites'][_0x15a896(0x5b2)](_0x3c1068);}}},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x651)]=VisuMZ['ParseEnemyNotetags'],VisuMZ['ParseEnemyNotetags']=function(_0x36bf99){const _0x5079d1=_0x25789e;VisuMZ[_0x5079d1(0xf9)][_0x5079d1(0x651)][_0x5079d1(0x800)](this,_0x36bf99),_0x36bf99[_0x5079d1(0x98e)]=0x1;const _0x48ce7d=_0x36bf99[_0x5079d1(0x881)];if(_0x48ce7d[_0x5079d1(0x8af)](/<LEVEL:[ ](\d+)>/i))_0x36bf99['level']=Number(RegExp['$1']);if(_0x48ce7d[_0x5079d1(0x8af)](/<MAXHP:[ ](\d+)>/i))_0x36bf99[_0x5079d1(0x84a)][0x0]=Number(RegExp['$1']);if(_0x48ce7d[_0x5079d1(0x8af)](/<MAXMP:[ ](\d+)>/i))_0x36bf99[_0x5079d1(0x84a)][0x1]=Number(RegExp['$1']);if(_0x48ce7d[_0x5079d1(0x8af)](/<ATK:[ ](\d+)>/i))_0x36bf99[_0x5079d1(0x84a)][0x2]=Number(RegExp['$1']);if(_0x48ce7d['match'](/<DEF:[ ](\d+)>/i))_0x36bf99[_0x5079d1(0x84a)][0x3]=Number(RegExp['$1']);if(_0x48ce7d[_0x5079d1(0x8af)](/<MAT:[ ](\d+)>/i))_0x36bf99[_0x5079d1(0x84a)][0x4]=Number(RegExp['$1']);if(_0x48ce7d[_0x5079d1(0x8af)](/<MDF:[ ](\d+)>/i))_0x36bf99[_0x5079d1(0x84a)][0x5]=Number(RegExp['$1']);if(_0x48ce7d['match'](/<AGI:[ ](\d+)>/i))_0x36bf99[_0x5079d1(0x84a)][0x6]=Number(RegExp['$1']);if(_0x48ce7d[_0x5079d1(0x8af)](/<LUK:[ ](\d+)>/i))_0x36bf99[_0x5079d1(0x84a)][0x7]=Number(RegExp['$1']);if(_0x48ce7d[_0x5079d1(0x8af)](/<EXP:[ ](\d+)>/i))_0x36bf99['exp']=Number(RegExp['$1']);if(_0x48ce7d['match'](/<GOLD:[ ](\d+)>/i))_0x36bf99[_0x5079d1(0xa4)]=Number(RegExp['$1']);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x8d3)]=Graphics[_0x25789e(0x9bf)],Graphics[_0x25789e(0x9bf)]=function(){const _0x5e64c3=_0x25789e;switch(VisuMZ[_0x5e64c3(0xf9)][_0x5e64c3(0x59c)][_0x5e64c3(0x25e)][_0x5e64c3(0x817)]){case _0x5e64c3(0xe3):return!![];case'normal':return![];default:return VisuMZ[_0x5e64c3(0xf9)][_0x5e64c3(0x8d3)][_0x5e64c3(0x800)](this);}},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x5b8)]=Graphics['printError'],Graphics['printError']=function(_0xd1c7c3,_0x10b969,_0x37b952=null){const _0x6672cb=_0x25789e;VisuMZ[_0x6672cb(0xf9)]['Graphics_printError']['call'](this,_0xd1c7c3,_0x10b969,_0x37b952),VisuMZ[_0x6672cb(0x77d)](![]);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x1a0)]=Graphics[_0x25789e(0x2ea)],Graphics[_0x25789e(0x2ea)]=function(_0x54c768){const _0x58e312=_0x25789e;VisuMZ['CoreEngine']['Graphics_centerElement'][_0x58e312(0x800)](this,_0x54c768),this[_0x58e312(0x966)](_0x54c768);},Graphics[_0x25789e(0x966)]=function(_0x571261){const _0x45d785=_0x25789e;VisuMZ[_0x45d785(0xf9)]['Settings']['QoL']['FontSmoothing']&&(_0x571261['style'][_0x45d785(0xd2)]=_0x45d785(0x87a));VisuMZ['CoreEngine'][_0x45d785(0x59c)][_0x45d785(0x25e)][_0x45d785(0x99a)]&&(_0x45d785(0x6d2)!==_0x45d785(0x662)?_0x571261[_0x45d785(0xbd)][_0x45d785(0x82b)]=_0x45d785(0x5f3):this[_0x45d785(0x1ab)](_0x4b2155));const _0x348f96=Math[_0x45d785(0x311)](0x0,Math[_0x45d785(0x36f)](_0x571261[_0x45d785(0x59d)]*this['_realScale'])),_0x1ac927=Math[_0x45d785(0x311)](0x0,Math['floor'](_0x571261[_0x45d785(0x844)]*this['_realScale']));_0x571261[_0x45d785(0xbd)][_0x45d785(0x59d)]=_0x348f96+'px',_0x571261[_0x45d785(0xbd)]['height']=_0x1ac927+'px';},VisuMZ['CoreEngine'][_0x25789e(0x56f)]=Bitmap[_0x25789e(0x866)][_0x25789e(0x928)],Bitmap[_0x25789e(0x866)][_0x25789e(0x928)]=function(_0x2838ce,_0x8fb230){const _0x367e45=_0x25789e;VisuMZ[_0x367e45(0xf9)][_0x367e45(0x56f)][_0x367e45(0x800)](this,_0x2838ce,_0x8fb230),this[_0x367e45(0x4fc)]=!(VisuMZ[_0x367e45(0xf9)]['Settings'][_0x367e45(0x25e)][_0x367e45(0x99a)]??!![]);},Bitmap[_0x25789e(0x866)][_0x25789e(0x7a0)]=function(){const _0x2b67d7=_0x25789e;this[_0x2b67d7(0xde)]=!![];},VisuMZ[_0x25789e(0xf9)]['Sprite_destroy']=Sprite[_0x25789e(0x866)][_0x25789e(0x85c)],Sprite[_0x25789e(0x866)]['destroy']=function(){const _0x48785a=_0x25789e;if(this[_0x48785a(0x6c5)])VisuMZ['CoreEngine'][_0x48785a(0x4c4)]['call'](this);this['destroyCoreEngineMarkedBitmaps']();},Sprite['prototype'][_0x25789e(0x16c)]=function(){const _0x1957aa=_0x25789e;if(!this['bitmap'])return;if(!this[_0x1957aa(0x6d6)][_0x1957aa(0xde)])return;if(this[_0x1957aa(0x6d6)][_0x1957aa(0xd1)]&&!this['_bitmap'][_0x1957aa(0xd1)][_0x1957aa(0x578)]){if(_0x1957aa(0x7d0)!==_0x1957aa(0x7d0))return _0x539f24[_0x1957aa(0xf9)][_0x1957aa(0x59c)][_0x1957aa(0x36b)][_0x1957aa(0x5b3)];else this[_0x1957aa(0x6d6)][_0x1957aa(0x85c)]();}},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x211)]=Bitmap[_0x25789e(0x866)]['resize'],Bitmap['prototype']['resize']=function(_0x16d523,_0x4ac166){const _0x2e3437=_0x25789e;VisuMZ[_0x2e3437(0xf9)][_0x2e3437(0x211)][_0x2e3437(0x800)](this,_0x16d523,_0x4ac166),this[_0x2e3437(0x7a0)]();},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x498)]=Bitmap[_0x25789e(0x866)][_0x25789e(0x408)],Bitmap[_0x25789e(0x866)][_0x25789e(0x408)]=function(_0x280975,_0x16e468,_0x4d2aa8,_0xc34bcc,_0x10f457,_0x3da9f9,_0x39a8f9,_0xa31aee,_0x5d355b){const _0x3b9bcd=_0x25789e;_0x16e468=Math[_0x3b9bcd(0x997)](_0x16e468),_0x4d2aa8=Math[_0x3b9bcd(0x997)](_0x4d2aa8),_0xc34bcc=Math[_0x3b9bcd(0x997)](_0xc34bcc),_0x10f457=Math['round'](_0x10f457),_0x3da9f9=Math['round'](_0x3da9f9),_0x39a8f9=Math[_0x3b9bcd(0x997)](_0x39a8f9),VisuMZ[_0x3b9bcd(0xf9)][_0x3b9bcd(0x498)][_0x3b9bcd(0x800)](this,_0x280975,_0x16e468,_0x4d2aa8,_0xc34bcc,_0x10f457,_0x3da9f9,_0x39a8f9,_0xa31aee,_0x5d355b),this[_0x3b9bcd(0x7a0)]();},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x11b)]=Bitmap[_0x25789e(0x866)][_0x25789e(0x4b0)],Bitmap[_0x25789e(0x866)][_0x25789e(0x4b0)]=function(_0x2221ec,_0x4d6bcc,_0x20b69a,_0x11530a){const _0x458b12=_0x25789e;VisuMZ['CoreEngine']['Bitmap_clearRect'][_0x458b12(0x800)](this,_0x2221ec,_0x4d6bcc,_0x20b69a,_0x11530a),this[_0x458b12(0x7a0)]();},VisuMZ['CoreEngine'][_0x25789e(0x3fe)]=Bitmap['prototype'][_0x25789e(0x937)],Bitmap['prototype'][_0x25789e(0x937)]=function(_0x28d088,_0xf46ec,_0x1fd086,_0x12f950,_0x1687a1){const _0x2d9be0=_0x25789e;VisuMZ[_0x2d9be0(0xf9)]['Bitmap_fillRect']['call'](this,_0x28d088,_0xf46ec,_0x1fd086,_0x12f950,_0x1687a1),this[_0x2d9be0(0x7a0)]();},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x695)]=Bitmap[_0x25789e(0x866)][_0x25789e(0x3c6)],Bitmap[_0x25789e(0x866)][_0x25789e(0x3c6)]=function(_0x3956ed,_0x15b3a3,_0x3b17e4,_0x1b3e88,_0x1797d5){const _0xdb67cc=_0x25789e;VisuMZ[_0xdb67cc(0xf9)]['Bitmap_strokeRect'][_0xdb67cc(0x800)](this,_0x3956ed,_0x15b3a3,_0x3b17e4,_0x1b3e88,_0x1797d5),this[_0xdb67cc(0x7a0)]();},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x6f8)]=Bitmap[_0x25789e(0x866)][_0x25789e(0x706)],Bitmap[_0x25789e(0x866)]['gradientFillRect']=function(_0x226ffc,_0x55ac7b,_0x58b460,_0x501056,_0xd39bb1,_0x52c297,_0x40c776){const _0x255381=_0x25789e;VisuMZ['CoreEngine'][_0x255381(0x6f8)][_0x255381(0x800)](this,_0x226ffc,_0x55ac7b,_0x58b460,_0x501056,_0xd39bb1,_0x52c297,_0x40c776),this[_0x255381(0x7a0)]();},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x4d7)]=Bitmap[_0x25789e(0x866)][_0x25789e(0x614)],Bitmap[_0x25789e(0x866)][_0x25789e(0x614)]=function(_0x4f01fa,_0x33099a,_0x100a4c,_0x3131d4){const _0x1519cf=_0x25789e;_0x4f01fa=Math[_0x1519cf(0x997)](_0x4f01fa),_0x33099a=Math[_0x1519cf(0x997)](_0x33099a),_0x100a4c=Math[_0x1519cf(0x997)](_0x100a4c),VisuMZ[_0x1519cf(0xf9)][_0x1519cf(0x4d7)][_0x1519cf(0x800)](this,_0x4f01fa,_0x33099a,_0x100a4c,_0x3131d4),this[_0x1519cf(0x7a0)]();},VisuMZ[_0x25789e(0xf9)]['Bitmap_measureTextWidth']=Bitmap[_0x25789e(0x866)][_0x25789e(0x159)],Bitmap[_0x25789e(0x866)][_0x25789e(0x159)]=function(_0x3ec3e7){const _0x5d75bb=_0x25789e;return Math[_0x5d75bb(0x169)](VisuMZ[_0x5d75bb(0xf9)][_0x5d75bb(0x704)][_0x5d75bb(0x800)](this,_0x3ec3e7));},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x9a4)]=Bitmap[_0x25789e(0x866)][_0x25789e(0x44a)],Bitmap['prototype'][_0x25789e(0x44a)]=function(_0x55c43b,_0x1ff8c8,_0x816a27,_0x104899,_0x4fffea,_0x33160f){const _0x480e01=_0x25789e;_0x1ff8c8=Math[_0x480e01(0x997)](_0x1ff8c8),_0x816a27=Math[_0x480e01(0x997)](_0x816a27),_0x104899=Math[_0x480e01(0x997)](_0x104899),_0x4fffea=Math[_0x480e01(0x997)](_0x4fffea),VisuMZ['CoreEngine'][_0x480e01(0x9a4)][_0x480e01(0x800)](this,_0x55c43b,_0x1ff8c8,_0x816a27,_0x104899,_0x4fffea,_0x33160f),this[_0x480e01(0x7a0)]();},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x2ed)]=Bitmap['prototype'][_0x25789e(0x3ea)],Bitmap['prototype'][_0x25789e(0x3ea)]=function(_0x5eb43c,_0x2b7b31,_0x15280d,_0x2731fc){const _0xdeed90=_0x25789e;VisuMZ[_0xdeed90(0xf9)][_0xdeed90(0x59c)]['QoL'][_0xdeed90(0x509)]?this[_0xdeed90(0x64d)](_0x5eb43c,_0x2b7b31,_0x15280d,_0x2731fc):_0xdeed90(0x8ea)!==_0xdeed90(0x8ea)?this['cursorPageup']():VisuMZ[_0xdeed90(0xf9)]['Bitmap_drawTextOutline'][_0xdeed90(0x800)](this,_0x5eb43c,_0x2b7b31,_0x15280d,_0x2731fc);},Bitmap[_0x25789e(0x866)][_0x25789e(0x64d)]=function(_0x15c98c,_0x50e756,_0x3d1e47,_0x5a0e8b){const _0x437009=_0x25789e,_0x5a0fdd=this[_0x437009(0x531)];_0x5a0fdd[_0x437009(0x835)]=this[_0x437009(0x96d)],_0x5a0fdd['fillText'](_0x15c98c,_0x50e756+0x2,_0x3d1e47+0x2,_0x5a0e8b);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0xf6)]=Input[_0x25789e(0x6bc)],Input[_0x25789e(0x6bc)]=function(){const _0xbebe7=_0x25789e;VisuMZ[_0xbebe7(0xf9)][_0xbebe7(0xf6)]['call'](this),this[_0xbebe7(0x16e)]=undefined,this['_inputSpecialKeyCode']=undefined,this[_0xbebe7(0x322)]=Input[_0xbebe7(0x96c)];},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x335)]=Input[_0x25789e(0x91c)],Input[_0x25789e(0x91c)]=function(){const _0x4ab474=_0x25789e;VisuMZ[_0x4ab474(0xf9)]['Input_update'][_0x4ab474(0x800)](this);if(this[_0x4ab474(0x322)])this[_0x4ab474(0x322)]--;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x34b)]=Input[_0x25789e(0x62b)],Input[_0x25789e(0x62b)]=function(){const _0xd12a61=_0x25789e;if(this[_0xd12a61(0x322)])return;VisuMZ[_0xd12a61(0xf9)][_0xd12a61(0x34b)]['call'](this);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x563)]=Input['_setupEventHandlers'],Input['_setupEventHandlers']=function(){const _0x2b3b7b=_0x25789e;VisuMZ[_0x2b3b7b(0xf9)][_0x2b3b7b(0x563)][_0x2b3b7b(0x800)](this),document['addEventListener'](_0x2b3b7b(0x237),this['_onKeyPress']['bind'](this));},VisuMZ[_0x25789e(0xf9)]['Input_onKeyDown']=Input['_onKeyDown'],Input[_0x25789e(0x1ee)]=function(_0x55bfdf){const _0x21ce6b=_0x25789e;this['_inputSpecialKeyCode']=_0x55bfdf['keyCode'],VisuMZ[_0x21ce6b(0xf9)]['Input_onKeyDown'][_0x21ce6b(0x800)](this,_0x55bfdf),this[_0x21ce6b(0x1ab)](null);},Input[_0x25789e(0x8fa)]=function(_0x196a6d){this['_registerKeyInput'](_0x196a6d);},Input['_registerKeyInput']=function(_0x498256){const _0x274589=_0x25789e;this[_0x274589(0x21e)]=_0x498256[_0x274589(0x6d1)];let _0x3b1a26=String['fromCharCode'](_0x498256[_0x274589(0x8bb)]);if(this[_0x274589(0x16e)]===undefined){if(_0x274589(0x713)!==_0x274589(0x31b))this['_inputString']=_0x3b1a26;else return _0x19bd8f[_0x274589(0xf9)]['TextManager_param'][_0x274589(0x800)](this,_0x38d945);}else this[_0x274589(0x16e)]+=_0x3b1a26;},VisuMZ[_0x25789e(0xf9)]['Input_shouldPreventDefault']=Input[_0x25789e(0x8dd)],Input[_0x25789e(0x8dd)]=function(_0x2fc165){const _0x314a9c=_0x25789e;if(_0x2fc165===0x8)return![];return VisuMZ['CoreEngine'][_0x314a9c(0x4e8)][_0x314a9c(0x800)](this,_0x2fc165);},Input[_0x25789e(0x45c)]=function(_0x5d59f4){const _0x550be5=_0x25789e;if(_0x5d59f4[_0x550be5(0x8af)](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0x5d59f4[_0x550be5(0x8af)](/enter/i))return this[_0x550be5(0x21e)]===0xd;if(_0x5d59f4[_0x550be5(0x8af)](/escape/i))return this[_0x550be5(0x21e)]===0x1b;},Input[_0x25789e(0x7e3)]=function(){const _0xfe6c41=_0x25789e;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0xfe6c41(0x2fb)](this['_inputSpecialKeyCode']);},Input[_0x25789e(0x1d6)]=function(){const _0x2f1471=_0x25789e;return[0x25,0x26,0x27,0x28]['contains'](this[_0x2f1471(0x21e)]);},Input['isGamepadConnected']=function(){const _0xb32557=_0x25789e;if(navigator[_0xb32557(0xda)]){const _0x35c1f1=navigator[_0xb32557(0xda)]();if(_0x35c1f1){if(_0xb32557(0x3b9)==='vZePm')(_0x21d132<_0x5c4279-_0x167fd4||_0x9c58a9&&_0x108913===0x1)&&this[_0xb32557(0x8ce)]((_0x52f5e7+_0xadfd70)%_0xa0a2f8);else for(const _0x494192 of _0x35c1f1){if(_0x494192&&_0x494192['connected']){if(_0xb32557(0x572)!==_0xb32557(0x572))this['_cancelButton']['x']=_0xc09f4e[_0xb32557(0x381)]+0x4;else return!![];}}}}return![];},Input[_0x25789e(0x6d3)]=function(){const _0x4806ff=_0x25789e;if(navigator['getGamepads']){if(_0x4806ff(0x9e2)!=='XEZqy')this[_0x4806ff(0x7a9)]=this[_0x4806ff(0x17f)]()[_0x4806ff(0x9ee)];else{const _0x16a592=navigator[_0x4806ff(0xda)]();if(_0x16a592)for(const _0x2e5b27 of _0x16a592){if(_0x4806ff(0x8a6)!==_0x4806ff(0x8a6)){if(this[_0x4806ff(0x857)]===_0x56983d)this[_0x4806ff(0x119)]();return this[_0x4806ff(0x857)];}else{if(_0x2e5b27&&_0x2e5b27[_0x4806ff(0x762)]){if(this[_0x4806ff(0x7ff)](_0x2e5b27))return!![];if(this['isGamepadAxisMoved'](_0x2e5b27))return!![];}}}}}return![];},Input[_0x25789e(0x7ff)]=function(_0x20098d){const _0x25137c=_0x25789e,_0x47143f=_0x20098d[_0x25137c(0xfb)];for(let _0x4ac9cb=0x0;_0x4ac9cb<_0x47143f[_0x25137c(0x73d)];_0x4ac9cb++){if(_0x47143f[_0x4ac9cb][_0x25137c(0x455)])return!![];}return![];},Input[_0x25789e(0x79f)]=function(_0x521fda){const _0x17e920=_0x25789e,_0x19e7e4=_0x521fda[_0x17e920(0x627)],_0x203066=0.5;if(_0x19e7e4[0x0]<-_0x203066)return!![];if(_0x19e7e4[0x0]>_0x203066)return!![];if(_0x19e7e4[0x1]<-_0x203066)return!![];if(_0x19e7e4[0x1]>_0x203066)return!![];return![];},Input[_0x25789e(0x2d2)]=function(){const _0x5417ed=_0x25789e;return this[_0x5417ed(0x302)]||null;},Input[_0x25789e(0x1ab)]=function(_0x3d8e39){const _0xf6b5f=_0x25789e;this[_0xf6b5f(0x302)]=_0x3d8e39;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x771)]=Input['_updateGamepadState'],Input[_0x25789e(0x52a)]=function(_0x519a21){const _0x35257b=_0x25789e;VisuMZ['CoreEngine'][_0x35257b(0x771)][_0x35257b(0x800)](this,_0x519a21),(this[_0x35257b(0x7ff)](_0x519a21)||this[_0x35257b(0x79f)](_0x519a21))&&this[_0x35257b(0x1ab)](_0x519a21);},Input[_0x25789e(0x2ae)]=function(){const _0xb922b2=_0x25789e;return this['_lastGamepad']?this[_0xb922b2(0x302)]['id']:_0xb922b2(0x100);},VisuMZ[_0x25789e(0xf9)]['Tilemap_addShadow']=Tilemap['prototype'][_0x25789e(0x9b7)],Tilemap[_0x25789e(0x866)][_0x25789e(0x9b7)]=function(_0x93950,_0x37f424,_0x2aba65,_0x23536f){const _0x57bb6f=_0x25789e;if($gameMap&&$gameMap[_0x57bb6f(0x25b)]())return;VisuMZ[_0x57bb6f(0xf9)][_0x57bb6f(0x49c)]['call'](this,_0x93950,_0x37f424,_0x2aba65,_0x23536f);},Tilemap[_0x25789e(0x344)][_0x25789e(0x866)][_0x25789e(0x944)]=function(){const _0x1b6a15=_0x25789e;this['_destroyInternalTextures']();for(let _0x4123e5=0x0;_0x4123e5<Tilemap[_0x1b6a15(0x44c)]['MAX_GL_TEXTURES'];_0x4123e5++){const _0x115dc7=new PIXI[(_0x1b6a15(0x52e))]();_0x115dc7[_0x1b6a15(0x573)](0x800,0x800),VisuMZ[_0x1b6a15(0xf9)][_0x1b6a15(0x59c)][_0x1b6a15(0x25e)][_0x1b6a15(0x99a)]&&(_0x115dc7[_0x1b6a15(0x51a)]=PIXI[_0x1b6a15(0x6eb)][_0x1b6a15(0x3ae)]),this['_internalTextures'][_0x1b6a15(0x5b2)](_0x115dc7);}},WindowLayer[_0x25789e(0x866)][_0x25789e(0x7cc)]=function(){const _0xaa6ab9=_0x25789e;if(SceneManager&&SceneManager[_0xaa6ab9(0x5f4)])return SceneManager['_scene']['isWindowMaskingEnabled']();else{if(_0xaa6ab9(0x3c0)==='RHGMF')_0x2a9dd8[_0xaa6ab9(0x872)]();else return!![];}},VisuMZ['CoreEngine'][_0x25789e(0x1e8)]=WindowLayer['prototype'][_0x25789e(0x7f0)],WindowLayer[_0x25789e(0x866)]['render']=function render(_0x19394b){const _0xe237d3=_0x25789e;if(this[_0xe237d3(0x7cc)]())VisuMZ[_0xe237d3(0xf9)][_0xe237d3(0x1e8)][_0xe237d3(0x800)](this,_0x19394b);else{if('stBGK'!==_0xe237d3(0x8fe))this[_0xe237d3(0x113)](_0x19394b);else{if(_0x4f3792)_0x1b76fc[_0xe237d3(0x2ef)](_0x7ed120);}}},WindowLayer[_0x25789e(0x866)][_0x25789e(0x113)]=function render(_0x4ce29a){const _0x28d458=_0x25789e;if(!this[_0x28d458(0x106)])return;const _0x34e510=new PIXI[(_0x28d458(0x85a))](),_0x5153ab=_0x4ce29a['gl'],_0x567396=this[_0x28d458(0x689)]['clone']();_0x4ce29a[_0x28d458(0x6e0)][_0x28d458(0x6b0)](),_0x34e510['transform']=this['transform'],_0x4ce29a['batch'][_0x28d458(0x772)](),_0x5153ab[_0x28d458(0x2d0)](_0x5153ab['STENCIL_TEST']);while(_0x567396[_0x28d458(0x73d)]>0x0){const _0x11fbbe=_0x567396[_0x28d458(0x456)]();_0x11fbbe[_0x28d458(0x87c)]&&_0x11fbbe['visible']&&_0x11fbbe['openness']>0x0&&(_0x5153ab[_0x28d458(0x3f3)](_0x5153ab[_0x28d458(0x8b6)],0x0,~0x0),_0x5153ab['stencilOp'](_0x5153ab[_0x28d458(0x6d8)],_0x5153ab['KEEP'],_0x5153ab[_0x28d458(0x6d8)]),_0x11fbbe[_0x28d458(0x7f0)](_0x4ce29a),_0x4ce29a[_0x28d458(0x9ed)]['flush'](),_0x34e510[_0x28d458(0x6bc)](),_0x5153ab[_0x28d458(0x3f3)](_0x5153ab[_0x28d458(0x64b)],0x1,~0x0),_0x5153ab['stencilOp'](_0x5153ab['REPLACE'],_0x5153ab[_0x28d458(0x82a)],_0x5153ab[_0x28d458(0x82a)]),_0x5153ab[_0x28d458(0x2bf)](_0x5153ab[_0x28d458(0x82e)],_0x5153ab[_0x28d458(0x756)]),_0x34e510[_0x28d458(0x7f0)](_0x4ce29a),_0x4ce29a[_0x28d458(0x9ed)][_0x28d458(0x772)](),_0x5153ab[_0x28d458(0x2bf)](_0x5153ab[_0x28d458(0x756)],_0x5153ab[_0x28d458(0x27e)]));}_0x5153ab[_0x28d458(0x6e3)](_0x5153ab[_0x28d458(0x45a)]),_0x5153ab[_0x28d458(0x6bc)](_0x5153ab['STENCIL_BUFFER_BIT']),_0x5153ab['clearStencil'](0x0),_0x4ce29a[_0x28d458(0x9ed)][_0x28d458(0x772)]();for(const _0x28e832 of this['children']){if(_0x28d458(0x5d9)==='mAZcs'){if(!_0x28e832[_0x28d458(0x87c)]&&_0x28e832['visible']){if(_0x28d458(0x392)===_0x28d458(0x592)){const _0x3f1baa=_0x5c43b7[_0x28d458(0x679)](_0x33bbbb);_0x1602bb?(this['drawIconBySize'](_0x3f1baa,_0x471de1,_0x47cae0,this[_0x28d458(0x864)]()),_0x3fb981-=this['gaugeLineHeight']()+0x2,_0x284894+=this[_0x28d458(0x864)]()+0x2):(this[_0x28d458(0x914)](_0x3f1baa,_0x1a276c+0x2,_0x4c5f95+0x2),_0x310001-=_0x20d8ca[_0x28d458(0x34f)]+0x4,_0x312dd9+=_0x5e44bb[_0x28d458(0x34f)]+0x4);}else _0x28e832[_0x28d458(0x7f0)](_0x4ce29a);}}else this[_0x28d458(0x1d9)]()?this[_0x28d458(0x461)]():_0x3219cd[_0x28d458(0xf9)][_0x28d458(0x802)]['call'](this);}_0x4ce29a['batch'][_0x28d458(0x772)]();},DataManager[_0x25789e(0x3d2)]=function(_0x3c8454){const _0x46c99b=_0x25789e;return this[_0x46c99b(0x8f8)](_0x3c8454)&&_0x3c8454[_0x46c99b(0x342)]===0x2;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0xa5)]=DataManager[_0x25789e(0x710)],DataManager[_0x25789e(0x710)]=function(){const _0x2d7637=_0x25789e;VisuMZ[_0x2d7637(0xf9)][_0x2d7637(0xa5)][_0x2d7637(0x800)](this),this['reservePlayTestNewGameCommonEvent'](),this[_0x2d7637(0x435)]();},DataManager[_0x25789e(0x23c)]=function(){const _0xf9b4fe=_0x25789e;if($gameTemp[_0xf9b4fe(0x254)]()){if(_0xf9b4fe(0x14e)!==_0xf9b4fe(0x247)){const _0x3afd11=VisuMZ[_0xf9b4fe(0xf9)]['Settings']['QoL'][_0xf9b4fe(0x75f)];if(_0x3afd11>0x0)$gameTemp['reserveCommonEvent'](_0x3afd11);}else return _0xf9b4fe(0x32a)[_0xf9b4fe(0x3a8)](_0x5249b5(_0x331a1e['$1']));}},DataManager['reserveNewGameCommonEvent']=function(){const _0x22f124=_0x25789e,_0x3237f1=VisuMZ[_0x22f124(0xf9)][_0x22f124(0x59c)][_0x22f124(0x25e)][_0x22f124(0x70f)]||0x0;if(_0x3237f1>0x0)$gameTemp['reserveCommonEvent'](_0x3237f1);},DataManager[_0x25789e(0x7a1)]=function(_0x2ed48d){const _0x4f4c6a=_0x25789e,_0x4efd42=$dataTroops[_0x2ed48d];if(!_0x4efd42)return'';let _0x8a2f55='';_0x8a2f55+=_0x4efd42[_0x4f4c6a(0x126)];for(const _0x1b255b of _0x4efd42[_0x4f4c6a(0x284)]){for(const _0x2f76df of _0x1b255b[_0x4f4c6a(0x78d)]){if([0x6c,0x198][_0x4f4c6a(0x2ec)](_0x2f76df[_0x4f4c6a(0x98f)])){if('bNuPz'!==_0x4f4c6a(0x443)){const _0x193adf=_0x4f4c6a(0x852);this['_colorCache']=this[_0x4f4c6a(0x7c5)]||{};if(this[_0x4f4c6a(0x7c5)][_0x193adf])return this['_colorCache'][_0x193adf];const _0x28e2a3=_0x224e3b[_0x4f4c6a(0xf9)][_0x4f4c6a(0x59c)]['Color'][_0x4f4c6a(0x9fc)];return this[_0x4f4c6a(0x607)](_0x193adf,_0x28e2a3);}else _0x8a2f55+='\x0a',_0x8a2f55+=_0x2f76df[_0x4f4c6a(0x1f3)][0x0];}}}return _0x8a2f55;};(VisuMZ[_0x25789e(0xf9)]['Settings'][_0x25789e(0x25e)][_0x25789e(0x18c)]??!![])&&($scene=null,VisuMZ[_0x25789e(0xf9)][_0x25789e(0x332)]=Scene_Base['prototype'][_0x25789e(0x468)],Scene_Base[_0x25789e(0x866)][_0x25789e(0x468)]=function(){const _0x596a62=_0x25789e;VisuMZ[_0x596a62(0xf9)][_0x596a62(0x332)][_0x596a62(0x800)](this),$scene=this;},$spriteset=null,VisuMZ[_0x25789e(0xf9)][_0x25789e(0x96b)]=Scene_Map[_0x25789e(0x866)]['createSpriteset'],Scene_Map['prototype'][_0x25789e(0x44b)]=function(){const _0x40f320=_0x25789e;VisuMZ[_0x40f320(0xf9)][_0x40f320(0x96b)]['call'](this),$spriteset=this['_spriteset'];},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x2f9)]=Scene_Battle['prototype'][_0x25789e(0x44b)],Scene_Battle[_0x25789e(0x866)][_0x25789e(0x44b)]=function(){const _0x3d4e3f=_0x25789e;VisuMZ[_0x3d4e3f(0xf9)][_0x3d4e3f(0x2f9)][_0x3d4e3f(0x800)](this),$spriteset=this['_spriteset'];},VisuMZ['CoreEngine'][_0x25789e(0x671)]=Scene_Base[_0x25789e(0x866)]['terminate'],Scene_Base[_0x25789e(0x866)][_0x25789e(0x5b5)]=function(){const _0x288aa7=_0x25789e;VisuMZ[_0x288aa7(0xf9)][_0x288aa7(0x671)][_0x288aa7(0x800)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ['CoreEngine']['BattleManager_update']=BattleManager[_0x25789e(0x91c)],BattleManager['update']=function(_0x2b9704){const _0xb7b5e1=_0x25789e;VisuMZ[_0xb7b5e1(0xf9)]['BattleManager_update'][_0xb7b5e1(0x800)](this,_0x2b9704),$subject=this['_subject'],$targets=this['_targets'],$target=this[_0xb7b5e1(0x130)]||this[_0xb7b5e1(0x5d8)][0x0];},$event=null,VisuMZ['CoreEngine'][_0x25789e(0x81a)]=Game_Event[_0x25789e(0x866)][_0x25789e(0x4f1)],Game_Event[_0x25789e(0x866)][_0x25789e(0x4f1)]=function(){const _0x5ea44f=_0x25789e;VisuMZ[_0x5ea44f(0xf9)][_0x5ea44f(0x81a)][_0x5ea44f(0x800)](this),$event=this;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x6d9)]=Scene_Map[_0x25789e(0x866)][_0x25789e(0x91c)],Scene_Map[_0x25789e(0x866)][_0x25789e(0x91c)]=function(){const _0x4085fd=_0x25789e;VisuMZ[_0x4085fd(0xf9)][_0x4085fd(0x6d9)]['call'](this),$gameMap['updateCurrentEvent']();},Game_Map[_0x25789e(0x866)][_0x25789e(0xf1)]=function(){const _0x371182=_0x25789e;if(!this[_0x371182(0x4f6)]()&&$event!==null){if(_0x371182(0x3ff)!==_0x371182(0x3ff)){const _0x4e6208=_0x3de777['CoreEngine'][_0x371182(0x59c)][_0x371182(0x599)];if(!_0x4e6208)return![];if(_0x5bedf7[_0x371182(0x637)]>=_0x371182(0x4e0)&&!_0x4e6208[_0x371182(0x87d)])return![];return _0x4e6208['RepositionEnemies'];}else $event=null;}},$commonEvent=function(_0x2649c0){const _0x4646c9=_0x25789e;if($gameTemp)$gameTemp[_0x4646c9(0x415)](_0x2649c0);},$onceParallel=function(_0x1d86ac,_0x4a4d9a){const _0x2a800f=_0x25789e;if(SceneManager[_0x2a800f(0x707)]()){if(_0x2a800f(0x699)!=='WvxCQ')return _0x4285b4[_0x2a800f(0x5f8)]-0.05;else $scene['playOnceParallelInterpreter'](_0x1d86ac,_0x4a4d9a);}else{if(SceneManager['isSceneBattle']()){if('yHJot'!==_0x2a800f(0x3c7)){if(Imported[_0x2a800f(0x409)])_0x2a800f(0x648)!==_0x2a800f(0x648)?(_0x169853[_0x2a800f(0xf9)]['Scene_Equip_create'][_0x2a800f(0x800)](this),this[_0x2a800f(0x73e)]()):$scene[_0x2a800f(0xa02)](_0x1d86ac);else $gameTemp&&$gameTemp['isPlaytest']()&&(_0x2a800f(0x34d)==='lFlTc'?(_0x47ba38['missed']=![],_0x7de10b[_0x2a800f(0x1d4)]=!![]):alert(_0x2a800f(0x9b6)));}else{const _0x280f52=_0x8d128e[_0x2a800f(0xf9)][_0x2a800f(0x59c)][_0x2a800f(0x39f)],_0x3ccad1=_0x280f52[_0x2a800f(0x7ed)],_0xbd6d08=_0x114b80['pop'](),_0x53683b=_0x2a800f(0x855)[_0x2a800f(0x3a8)](_0xbd6d08);return _0x280f52[_0x53683b]?_0x280f52[_0x53683b]:_0x3ccad1[_0x2a800f(0x3a8)](_0xbd6d08);}}else{if($gameTemp&&$gameTemp[_0x2a800f(0x254)]()){if(_0x2a800f(0x3c2)!==_0x2a800f(0x3c2))return _0x4b3a45['layoutSettings'][_0x2a800f(0x59b)]['call'](this);else alert(_0x2a800f(0x911));}}}});;StorageManager['jsonToZip']=function(_0x1cbac7){return new Promise((_0x418a15,_0x73658f)=>{const _0x6fbb68=_0x481b;if('SqrRN'===_0x6fbb68(0x38f))_0x439172[_0x6fbb68(0x6bc)](),this[_0x6fbb68(0x8f4)]('keyboard');else try{const _0x2db8fc=pako['deflate'](_0x1cbac7,{'to':_0x6fbb68(0x36d),'level':0x1});if(_0x2db8fc['length']>=0xc350){}_0x418a15(_0x2db8fc);}catch(_0x17a102){if('SMPRS'!==_0x6fbb68(0x145)){if(!this[_0x6fbb68(0x33b)])return;this['x']=this[_0x6fbb68(0x33b)][_0x6fbb68(0x6ef)],this['y']=this[_0x6fbb68(0x33b)]['targetY'],this[_0x6fbb68(0x24b)]['x']=this[_0x6fbb68(0x33b)][_0x6fbb68(0x328)],this[_0x6fbb68(0x24b)]['y']=this['_coreEasing'][_0x6fbb68(0x46e)],this[_0x6fbb68(0x555)]=this[_0x6fbb68(0x33b)][_0x6fbb68(0x3e4)],this[_0x6fbb68(0x921)]=this['_coreEasing'][_0x6fbb68(0x410)],this[_0x6fbb68(0x6f9)]=this[_0x6fbb68(0x33b)][_0x6fbb68(0x140)],this[_0x6fbb68(0x9b0)](_0x33d26e,_0x5f9e8e,this['x'],this['y'],this[_0x6fbb68(0x24b)]['x'],this[_0x6fbb68(0x24b)]['y'],this[_0x6fbb68(0x555)],this[_0x6fbb68(0x921)],this[_0x6fbb68(0x6f9)]);}else _0x73658f(_0x17a102);}});},TextManager[_0x25789e(0x40c)]=['','','',_0x25789e(0x853),'','',_0x25789e(0x35d),'',_0x25789e(0x5a1),'TAB','','',_0x25789e(0x458),'ENTER',_0x25789e(0xa3),'',_0x25789e(0x477),_0x25789e(0xc0),_0x25789e(0x8d4),'PAUSE','CAPSLOCK',_0x25789e(0x63a),'EISU',_0x25789e(0xa9),'FINAL','HANJA','',_0x25789e(0x46d),_0x25789e(0x3c9),'NONCONVERT',_0x25789e(0x6d4),_0x25789e(0x2b7),_0x25789e(0x5e2),_0x25789e(0x3f0),_0x25789e(0x2e4),'END',_0x25789e(0x4d9),_0x25789e(0x9de),'UP',_0x25789e(0x4ab),_0x25789e(0x218),_0x25789e(0x164),_0x25789e(0x564),_0x25789e(0x898),_0x25789e(0x7cf),'INSERT','DELETE','','0','1','2','3','4','5','6','7','8','9','COLON','SEMICOLON',_0x25789e(0x686),_0x25789e(0x867),'GREATER_THAN',_0x25789e(0x315),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x25789e(0x517),'',_0x25789e(0x7c2),'',_0x25789e(0x244),_0x25789e(0x1c7),_0x25789e(0x693),_0x25789e(0x37b),_0x25789e(0x362),_0x25789e(0xba),_0x25789e(0x199),_0x25789e(0x3a1),'NUMPAD7',_0x25789e(0x3ce),_0x25789e(0x1fc),_0x25789e(0x7e6),_0x25789e(0x272),_0x25789e(0x7f9),'SUBTRACT',_0x25789e(0x66c),_0x25789e(0x2e7),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x25789e(0x661),_0x25789e(0x989),_0x25789e(0x107),_0x25789e(0x70d),_0x25789e(0x50a),_0x25789e(0x98d),_0x25789e(0x115),_0x25789e(0x33d),_0x25789e(0x35a),_0x25789e(0x580),_0x25789e(0x62a),_0x25789e(0x978),_0x25789e(0xb6),_0x25789e(0x444),_0x25789e(0x243),'','','','','','','','',_0x25789e(0x299),'SCROLL_LOCK',_0x25789e(0x74b),_0x25789e(0x93c),_0x25789e(0x8aa),'WIN_OEM_FJ_LOYA',_0x25789e(0x261),'','','','','','','','','',_0x25789e(0xd8),'EXCLAMATION','DOUBLE_QUOTE','HASH',_0x25789e(0x53f),_0x25789e(0x5f9),_0x25789e(0x28a),_0x25789e(0xad),'OPEN_PAREN',_0x25789e(0x4ac),_0x25789e(0x795),_0x25789e(0x9c9),_0x25789e(0x612),'HYPHEN_MINUS','OPEN_CURLY_BRACKET',_0x25789e(0x66d),_0x25789e(0x6a6),'','','','','VOLUME_MUTE',_0x25789e(0x6f6),_0x25789e(0x50f),'','',_0x25789e(0x3db),'EQUALS','COMMA',_0x25789e(0x6c1),_0x25789e(0x56a),_0x25789e(0x492),_0x25789e(0x12b),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x25789e(0x556),'BACK_SLASH',_0x25789e(0x7b9),_0x25789e(0x640),'','META',_0x25789e(0x733),'',_0x25789e(0x6bd),_0x25789e(0x80e),'','WIN_ICO_CLEAR','','',_0x25789e(0x255),'WIN_OEM_JUMP',_0x25789e(0x16d),_0x25789e(0x38e),_0x25789e(0x489),_0x25789e(0x583),_0x25789e(0x955),'WIN_OEM_ATTN',_0x25789e(0x60a),_0x25789e(0x363),_0x25789e(0x6b6),_0x25789e(0x42e),_0x25789e(0x3aa),_0x25789e(0x6f0),_0x25789e(0x48d),_0x25789e(0x943),_0x25789e(0x786),_0x25789e(0x181),_0x25789e(0x722),'','PA1',_0x25789e(0x532),''],TextManager[_0x25789e(0x8d1)]=VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)][_0x25789e(0x39f)][_0x25789e(0x423)],TextManager[_0x25789e(0x623)]=VisuMZ['CoreEngine'][_0x25789e(0x59c)][_0x25789e(0x39f)][_0x25789e(0x30a)],TextManager[_0x25789e(0x3dd)]=VisuMZ[_0x25789e(0xf9)]['Settings'][_0x25789e(0x39f)][_0x25789e(0x78e)],VisuMZ[_0x25789e(0xf9)][_0x25789e(0x479)]=TextManager['param'],TextManager[_0x25789e(0x8cd)]=function(_0x550a5f){const _0xcb080a=_0x25789e;return typeof _0x550a5f===_0xcb080a(0x28e)?VisuMZ[_0xcb080a(0xf9)][_0xcb080a(0x479)][_0xcb080a(0x800)](this,_0x550a5f):this[_0xcb080a(0x450)](_0x550a5f);},TextManager[_0x25789e(0x450)]=function(_0x5db1a8){const _0x2fe0c2=_0x25789e;_0x5db1a8=String(_0x5db1a8||'')[_0x2fe0c2(0x595)]();const _0x3494ba=VisuMZ[_0x2fe0c2(0xf9)][_0x2fe0c2(0x59c)][_0x2fe0c2(0x5c0)];if(_0x5db1a8===_0x2fe0c2(0x4a3))return $dataSystem['terms'][_0x2fe0c2(0x84a)][0x0];if(_0x5db1a8===_0x2fe0c2(0x2de))return $dataSystem[_0x2fe0c2(0x55b)][_0x2fe0c2(0x84a)][0x1];if(_0x5db1a8===_0x2fe0c2(0x11a))return $dataSystem['terms'][_0x2fe0c2(0x84a)][0x2];if(_0x5db1a8===_0x2fe0c2(0x5f6))return $dataSystem[_0x2fe0c2(0x55b)][_0x2fe0c2(0x84a)][0x3];if(_0x5db1a8===_0x2fe0c2(0x5cf))return $dataSystem[_0x2fe0c2(0x55b)][_0x2fe0c2(0x84a)][0x4];if(_0x5db1a8==='MDF')return $dataSystem['terms'][_0x2fe0c2(0x84a)][0x5];if(_0x5db1a8===_0x2fe0c2(0x1a1))return $dataSystem[_0x2fe0c2(0x55b)][_0x2fe0c2(0x84a)][0x6];if(_0x5db1a8===_0x2fe0c2(0x4c0))return $dataSystem[_0x2fe0c2(0x55b)][_0x2fe0c2(0x84a)][0x7];if(_0x5db1a8===_0x2fe0c2(0x909))return _0x3494ba[_0x2fe0c2(0x2b3)];if(_0x5db1a8==='EVA')return _0x3494ba['XParamVocab1'];if(_0x5db1a8===_0x2fe0c2(0x4db))return _0x3494ba['XParamVocab2'];if(_0x5db1a8===_0x2fe0c2(0x7ef))return _0x3494ba[_0x2fe0c2(0x74c)];if(_0x5db1a8===_0x2fe0c2(0x87b))return _0x3494ba[_0x2fe0c2(0x383)];if(_0x5db1a8===_0x2fe0c2(0x63c))return _0x3494ba[_0x2fe0c2(0x969)];if(_0x5db1a8===_0x2fe0c2(0x787))return _0x3494ba[_0x2fe0c2(0x81c)];if(_0x5db1a8===_0x2fe0c2(0x2d5))return _0x3494ba['XParamVocab7'];if(_0x5db1a8===_0x2fe0c2(0x3ca))return _0x3494ba[_0x2fe0c2(0x74e)];if(_0x5db1a8===_0x2fe0c2(0xc9))return _0x3494ba['XParamVocab9'];if(_0x5db1a8===_0x2fe0c2(0x9bd))return _0x3494ba[_0x2fe0c2(0x587)];if(_0x5db1a8===_0x2fe0c2(0x320))return _0x3494ba[_0x2fe0c2(0x30f)];if(_0x5db1a8===_0x2fe0c2(0x7e8))return _0x3494ba[_0x2fe0c2(0x979)];if(_0x5db1a8===_0x2fe0c2(0x2b8))return _0x3494ba[_0x2fe0c2(0x1ec)];if(_0x5db1a8===_0x2fe0c2(0x712))return _0x3494ba[_0x2fe0c2(0x8e3)];if(_0x5db1a8==='TCR')return _0x3494ba[_0x2fe0c2(0x31d)];if(_0x5db1a8===_0x2fe0c2(0x9af))return _0x3494ba[_0x2fe0c2(0x234)];if(_0x5db1a8===_0x2fe0c2(0x4b8))return _0x3494ba['SParamVocab7'];if(_0x5db1a8==='FDR')return _0x3494ba['SParamVocab8'];if(_0x5db1a8==='EXR')return _0x3494ba[_0x2fe0c2(0x474)];if(VisuMZ[_0x2fe0c2(0xf9)]['CustomParamNames'][_0x5db1a8])return VisuMZ[_0x2fe0c2(0xf9)][_0x2fe0c2(0x6da)][_0x5db1a8];return'';},TextManager['getInputButtonString']=function(_0x16d491){const _0x1c760e=_0x25789e,_0x31c461=Input[_0x1c760e(0x2ae)]();return _0x31c461===_0x1c760e(0x100)?this[_0x1c760e(0xe5)](_0x16d491):this[_0x1c760e(0x628)](_0x31c461,_0x16d491);},TextManager[_0x25789e(0xe5)]=function(_0xac17c4){const _0x58d5ac=_0x25789e,_0xccdd81=VisuMZ[_0x58d5ac(0xf9)][_0x58d5ac(0x59c)][_0x58d5ac(0x39f)]['SplitEscape'];if(!_0xccdd81){if('SFIyH'==='SFIyH'){if(_0xac17c4===_0x58d5ac(0x994))_0xac17c4=_0x58d5ac(0x472);if(_0xac17c4===_0x58d5ac(0x351))_0xac17c4=_0x58d5ac(0x472);}else _0x436c13[_0x58d5ac(0x5b2)](_0x454404);}let _0x15cf16=[];for(let _0x2848c2 in Input[_0x58d5ac(0x904)]){if(_0x58d5ac(0x345)!==_0x58d5ac(0x403)){_0x2848c2=Number(_0x2848c2);if(_0x2848c2>=0x60&&_0x2848c2<=0x69)continue;if([0x12,0x20][_0x58d5ac(0x2ec)](_0x2848c2))continue;_0xac17c4===Input[_0x58d5ac(0x904)][_0x2848c2]&&_0x15cf16[_0x58d5ac(0x5b2)](_0x2848c2);}else{let _0x2b0c08=this[_0x58d5ac(0x75b)]();this[_0x58d5ac(0x139)]()&&(_0x2b0c08=_0x1f1b88[_0x58d5ac(0x441)](_0x2b0c08));const _0x40b819=this[_0x58d5ac(0x984)]()-0x1,_0x3150b9=this[_0x58d5ac(0x8d6)]?this[_0x58d5ac(0x8d6)]():this[_0x58d5ac(0x417)]();this[_0x58d5ac(0x8a0)](),this[_0x58d5ac(0x6d6)][_0x58d5ac(0x44a)](_0x2b0c08,0x0,0x0,_0x40b819,_0x3150b9,'right');}}for(let _0x4d726c=0x0;_0x4d726c<_0x15cf16[_0x58d5ac(0x73d)];_0x4d726c++){_0x15cf16[_0x4d726c]=TextManager[_0x58d5ac(0x40c)][_0x15cf16[_0x4d726c]];}return this[_0x58d5ac(0x350)](_0x15cf16);},TextManager[_0x25789e(0x350)]=function(_0x419f47){const _0xd19a23=_0x25789e,_0x5ebdd9=VisuMZ[_0xd19a23(0xf9)][_0xd19a23(0x59c)]['ButtonAssist'],_0x202ec6=_0x5ebdd9[_0xd19a23(0x7ed)],_0x256489=_0x419f47[_0xd19a23(0x55f)](),_0x4971f5=_0xd19a23(0x855)[_0xd19a23(0x3a8)](_0x256489);return _0x5ebdd9[_0x4971f5]?_0x5ebdd9[_0x4971f5]:_0x202ec6[_0xd19a23(0x3a8)](_0x256489);},TextManager[_0x25789e(0x46a)]=function(_0x5d2df1,_0xabdb90){const _0x438909=_0x25789e,_0x596aaa=VisuMZ[_0x438909(0xf9)][_0x438909(0x59c)]['ButtonAssist'],_0x28d08e=_0x596aaa[_0x438909(0x11d)],_0x57a3ab=this[_0x438909(0x9a)](_0x5d2df1),_0x16ad2c=this[_0x438909(0x9a)](_0xabdb90);return _0x28d08e[_0x438909(0x3a8)](_0x57a3ab,_0x16ad2c);},TextManager[_0x25789e(0x628)]=function(_0x120477,_0x319f1b){const _0x57e01a=_0x25789e,_0x1c3b71=_0x120477[_0x57e01a(0x76e)]()['trim'](),_0x2f9ea2=VisuMZ['CoreEngine'][_0x57e01a(0x3d8)][_0x1c3b71];if(!_0x2f9ea2)return this[_0x57e01a(0x558)](_0x120477,_0x319f1b);return _0x2f9ea2[_0x319f1b]||this[_0x57e01a(0xe5)](_0x120477,_0x319f1b);},TextManager[_0x25789e(0x558)]=function(_0x56a83f,_0x3673c4){const _0x40f619=_0x25789e,_0x32567b=_0x56a83f[_0x40f619(0x76e)]()[_0x40f619(0x91f)]();for(const _0x98ca1a in VisuMZ[_0x40f619(0xf9)][_0x40f619(0x924)]){if(_0x32567b[_0x40f619(0x2ec)](_0x98ca1a)){const _0x3f8f30=VisuMZ[_0x40f619(0xf9)][_0x40f619(0x924)][_0x98ca1a],_0x49be19=VisuMZ[_0x40f619(0xf9)][_0x40f619(0x3d8)][_0x3f8f30];return _0x49be19[_0x3673c4]||this['getKeyboardInputButtonString'](_0x3673c4);}}return this[_0x40f619(0xe5)](_0x3673c4);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x182)]=ColorManager[_0x25789e(0x3d3)],ColorManager[_0x25789e(0x3d3)]=function(){const _0x1caeed=_0x25789e;VisuMZ[_0x1caeed(0xf9)][_0x1caeed(0x182)][_0x1caeed(0x800)](this),this['_colorCache']=this[_0x1caeed(0x7c5)]||{};},ColorManager[_0x25789e(0x607)]=function(_0x358d7d,_0x31e4cd){const _0x417a06=_0x25789e;return _0x31e4cd=String(_0x31e4cd),this['_colorCache']=this[_0x417a06(0x7c5)]||{},_0x31e4cd[_0x417a06(0x8af)](/#(.*)/i)?_0x417a06(0x76f)===_0x417a06(0x603)?_0x3c44df[_0x417a06(0x29a)](_0x758ef3):this['_colorCache'][_0x358d7d]=_0x417a06(0x32a)[_0x417a06(0x3a8)](String(RegExp['$1'])):_0x417a06(0x294)===_0x417a06(0x294)?this[_0x417a06(0x7c5)][_0x358d7d]=this[_0x417a06(0x2b6)](Number(_0x31e4cd)):this[_0x417a06(0x8ce)]((_0x1975ab-_0x22ef3d+_0x56ffc8)%_0x8c6605),this['_colorCache'][_0x358d7d];},ColorManager['getColor']=function(_0x3cc3fb){const _0x44ec42=_0x25789e;_0x3cc3fb=String(_0x3cc3fb);if(_0x3cc3fb[_0x44ec42(0x8af)](/#(.*)/i)){if('zNeTX'!==_0x44ec42(0x6ac)){if(this[_0x44ec42(0x8e5)][_0x44ec42(0x5fb)]())return![];return _0x552f66[_0x44ec42(0xf9)][_0x44ec42(0x28c)][_0x44ec42(0x800)](this,_0x108226);}else return _0x44ec42(0x32a)[_0x44ec42(0x3a8)](String(RegExp['$1']));}else{if(_0x44ec42(0x88b)!==_0x44ec42(0x88b))_0x307649[_0x44ec42(0x757)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20','Page','OK'];else return this[_0x44ec42(0x2b6)](Number(_0x3cc3fb));}},ColorManager['clearCachedKeys']=function(){const _0x45317f=_0x25789e;this[_0x45317f(0x7c5)]={};},ColorManager[_0x25789e(0x1ca)]=function(){const _0x34b26b=_0x25789e,_0x1fa5b9='_stored_normalColor';this[_0x34b26b(0x7c5)]=this[_0x34b26b(0x7c5)]||{};if(this[_0x34b26b(0x7c5)][_0x1fa5b9])return this[_0x34b26b(0x7c5)][_0x1fa5b9];const _0x595380=VisuMZ[_0x34b26b(0xf9)][_0x34b26b(0x59c)][_0x34b26b(0x9db)][_0x34b26b(0x9fc)];return this[_0x34b26b(0x607)](_0x1fa5b9,_0x595380);},ColorManager[_0x25789e(0x5ca)]=function(){const _0x44a951=_0x25789e,_0x225447=_0x44a951(0xf0);this['_colorCache']=this['_colorCache']||{};if(this[_0x44a951(0x7c5)][_0x225447])return this['_colorCache'][_0x225447];const _0x280978=VisuMZ['CoreEngine'][_0x44a951(0x59c)][_0x44a951(0x9db)][_0x44a951(0x8cf)];return this['getColorDataFromPluginParameters'](_0x225447,_0x280978);},ColorManager[_0x25789e(0x382)]=function(){const _0x2ed423=_0x25789e,_0x5ad0c4=_0x2ed423(0x452);this['_colorCache']=this[_0x2ed423(0x7c5)]||{};if(this[_0x2ed423(0x7c5)][_0x5ad0c4])return this['_colorCache'][_0x5ad0c4];const _0x3bed05=VisuMZ[_0x2ed423(0xf9)][_0x2ed423(0x59c)][_0x2ed423(0x9db)][_0x2ed423(0x1af)];return this[_0x2ed423(0x607)](_0x5ad0c4,_0x3bed05);},ColorManager[_0x25789e(0x236)]=function(){const _0x11dd14=_0x25789e,_0x56e184='_stored_deathColor';this[_0x11dd14(0x7c5)]=this[_0x11dd14(0x7c5)]||{};if(this[_0x11dd14(0x7c5)][_0x56e184])return this[_0x11dd14(0x7c5)][_0x56e184];const _0x12b875=VisuMZ['CoreEngine'][_0x11dd14(0x59c)][_0x11dd14(0x9db)][_0x11dd14(0x618)];return this['getColorDataFromPluginParameters'](_0x56e184,_0x12b875);},ColorManager['gaugeBackColor']=function(){const _0x127ff0=_0x25789e,_0x5b50e5=_0x127ff0(0x8c5);this[_0x127ff0(0x7c5)]=this['_colorCache']||{};if(this[_0x127ff0(0x7c5)][_0x5b50e5])return this[_0x127ff0(0x7c5)][_0x5b50e5];const _0x4e21ad=VisuMZ[_0x127ff0(0xf9)]['Settings'][_0x127ff0(0x9db)]['ColorGaugeBack'];return this[_0x127ff0(0x607)](_0x5b50e5,_0x4e21ad);},ColorManager[_0x25789e(0x8f0)]=function(){const _0x49a9c7=_0x25789e,_0x2728cf=_0x49a9c7(0x138);this[_0x49a9c7(0x7c5)]=this[_0x49a9c7(0x7c5)]||{};if(this[_0x49a9c7(0x7c5)][_0x2728cf])return this['_colorCache'][_0x2728cf];const _0x37d3c6=VisuMZ['CoreEngine'][_0x49a9c7(0x59c)][_0x49a9c7(0x9db)][_0x49a9c7(0x385)];return this[_0x49a9c7(0x607)](_0x2728cf,_0x37d3c6);},ColorManager[_0x25789e(0x379)]=function(){const _0x2efcfd=_0x25789e,_0x2ae509=_0x2efcfd(0x154);this[_0x2efcfd(0x7c5)]=this[_0x2efcfd(0x7c5)]||{};if(this[_0x2efcfd(0x7c5)][_0x2ae509])return this[_0x2efcfd(0x7c5)][_0x2ae509];const _0x476a0e=VisuMZ[_0x2efcfd(0xf9)][_0x2efcfd(0x59c)][_0x2efcfd(0x9db)][_0x2efcfd(0x97a)];return this[_0x2efcfd(0x607)](_0x2ae509,_0x476a0e);},ColorManager[_0x25789e(0x3e6)]=function(){const _0x2e97df=_0x25789e,_0x1eb58b=_0x2e97df(0x874);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x1eb58b])return this[_0x2e97df(0x7c5)][_0x1eb58b];const _0xfc8b0e=VisuMZ['CoreEngine'][_0x2e97df(0x59c)]['Color'][_0x2e97df(0x125)];return this[_0x2e97df(0x607)](_0x1eb58b,_0xfc8b0e);},ColorManager[_0x25789e(0x95b)]=function(){const _0x3c8756=_0x25789e,_0x14eddb=_0x3c8756(0x72d);this[_0x3c8756(0x7c5)]=this['_colorCache']||{};if(this[_0x3c8756(0x7c5)][_0x14eddb])return this[_0x3c8756(0x7c5)][_0x14eddb];const _0x465790=VisuMZ[_0x3c8756(0xf9)][_0x3c8756(0x59c)][_0x3c8756(0x9db)][_0x3c8756(0x442)];return this[_0x3c8756(0x607)](_0x14eddb,_0x465790);},ColorManager[_0x25789e(0x397)]=function(){const _0xec9a00=_0x25789e,_0x1e1c1d=_0xec9a00(0x4a7);this[_0xec9a00(0x7c5)]=this[_0xec9a00(0x7c5)]||{};if(this['_colorCache'][_0x1e1c1d])return this['_colorCache'][_0x1e1c1d];const _0x5c6ec7=VisuMZ[_0xec9a00(0xf9)][_0xec9a00(0x59c)]['Color'][_0xec9a00(0x9e1)];return this['getColorDataFromPluginParameters'](_0x1e1c1d,_0x5c6ec7);},ColorManager[_0x25789e(0x314)]=function(){const _0x3bb1fa=_0x25789e,_0x4c20c4=_0x3bb1fa(0xfc);this[_0x3bb1fa(0x7c5)]=this[_0x3bb1fa(0x7c5)]||{};if(this[_0x3bb1fa(0x7c5)][_0x4c20c4])return this[_0x3bb1fa(0x7c5)][_0x4c20c4];const _0x3122d9=VisuMZ['CoreEngine'][_0x3bb1fa(0x59c)][_0x3bb1fa(0x9db)]['ColorPowerUp'];return this[_0x3bb1fa(0x607)](_0x4c20c4,_0x3122d9);},ColorManager[_0x25789e(0x6c2)]=function(){const _0x43fac0=_0x25789e,_0x59abbb='_stored_powerDownColor';this[_0x43fac0(0x7c5)]=this['_colorCache']||{};if(this[_0x43fac0(0x7c5)][_0x59abbb])return this[_0x43fac0(0x7c5)][_0x59abbb];const _0x37c32f=VisuMZ[_0x43fac0(0xf9)][_0x43fac0(0x59c)][_0x43fac0(0x9db)][_0x43fac0(0x176)];return this[_0x43fac0(0x607)](_0x59abbb,_0x37c32f);},ColorManager[_0x25789e(0x5e5)]=function(){const _0x2187b7=_0x25789e,_0x123f80=_0x2187b7(0x3cb);this[_0x2187b7(0x7c5)]=this[_0x2187b7(0x7c5)]||{};if(this[_0x2187b7(0x7c5)][_0x123f80])return this['_colorCache'][_0x123f80];const _0x3a005e=VisuMZ['CoreEngine'][_0x2187b7(0x59c)][_0x2187b7(0x9db)][_0x2187b7(0x5e9)];return this['getColorDataFromPluginParameters'](_0x123f80,_0x3a005e);},ColorManager[_0x25789e(0x2ab)]=function(){const _0x539181=_0x25789e,_0x50fe39=_0x539181(0x7f4);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x50fe39])return this[_0x539181(0x7c5)][_0x50fe39];const _0x3f11d3=VisuMZ[_0x539181(0xf9)]['Settings'][_0x539181(0x9db)][_0x539181(0x753)];return this[_0x539181(0x607)](_0x50fe39,_0x3f11d3);},ColorManager[_0x25789e(0x57c)]=function(){const _0x31062b=_0x25789e,_0x1a37b7=_0x31062b(0x5e7);this[_0x31062b(0x7c5)]=this[_0x31062b(0x7c5)]||{};if(this['_colorCache'][_0x1a37b7])return this['_colorCache'][_0x1a37b7];const _0x39a94a=VisuMZ[_0x31062b(0xf9)][_0x31062b(0x59c)]['Color'][_0x31062b(0x743)];return this['getColorDataFromPluginParameters'](_0x1a37b7,_0x39a94a);},ColorManager[_0x25789e(0x19c)]=function(){const _0x217568=_0x25789e,_0x362922=_0x217568(0x6f1);this[_0x217568(0x7c5)]=this[_0x217568(0x7c5)]||{};if(this['_colorCache'][_0x362922])return this[_0x217568(0x7c5)][_0x362922];const _0x36227d=VisuMZ[_0x217568(0xf9)][_0x217568(0x59c)][_0x217568(0x9db)][_0x217568(0x50d)];return this['getColorDataFromPluginParameters'](_0x362922,_0x36227d);},ColorManager['tpCostColor']=function(){const _0x24a6d2=_0x25789e,_0x306835='_stored_tpCostColor';this[_0x24a6d2(0x7c5)]=this['_colorCache']||{};if(this[_0x24a6d2(0x7c5)][_0x306835])return this['_colorCache'][_0x306835];const _0x2dc553=VisuMZ[_0x24a6d2(0xf9)][_0x24a6d2(0x59c)][_0x24a6d2(0x9db)][_0x24a6d2(0x10a)];return this[_0x24a6d2(0x607)](_0x306835,_0x2dc553);},ColorManager[_0x25789e(0x1d0)]=function(){const _0x4727b8=_0x25789e,_0x52b3fb=_0x4727b8(0x848);this[_0x4727b8(0x7c5)]=this[_0x4727b8(0x7c5)]||{};if(this['_colorCache'][_0x52b3fb])return this[_0x4727b8(0x7c5)][_0x52b3fb];const _0x395792=VisuMZ[_0x4727b8(0xf9)][_0x4727b8(0x59c)]['Color'][_0x4727b8(0x10a)];return this['getColorDataFromPluginParameters'](_0x52b3fb,_0x395792);},ColorManager[_0x25789e(0x88a)]=function(){const _0x2c0476=_0x25789e,_0x32a52f='_stored_expGaugeColor1';this[_0x2c0476(0x7c5)]=this[_0x2c0476(0x7c5)]||{};if(this['_colorCache'][_0x32a52f])return this[_0x2c0476(0x7c5)][_0x32a52f];const _0x3b36a5=VisuMZ[_0x2c0476(0xf9)][_0x2c0476(0x59c)][_0x2c0476(0x9db)][_0x2c0476(0x61c)];return this[_0x2c0476(0x607)](_0x32a52f,_0x3b36a5);},ColorManager[_0x25789e(0x840)]=function(){const _0x1a94c0=_0x25789e,_0x99d67=_0x1a94c0(0xc6);this[_0x1a94c0(0x7c5)]=this['_colorCache']||{};if(this[_0x1a94c0(0x7c5)][_0x99d67])return this[_0x1a94c0(0x7c5)][_0x99d67];const _0x2cfa4c=VisuMZ['CoreEngine'][_0x1a94c0(0x59c)]['Color'][_0x1a94c0(0x2d3)];return this[_0x1a94c0(0x607)](_0x99d67,_0x2cfa4c);},ColorManager[_0x25789e(0x664)]=function(){const _0x3ac60f=_0x25789e,_0x54c735=_0x3ac60f(0x4ec);this[_0x3ac60f(0x7c5)]=this['_colorCache']||{};if(this[_0x3ac60f(0x7c5)][_0x54c735])return this['_colorCache'][_0x54c735];const _0x394d42=VisuMZ[_0x3ac60f(0xf9)][_0x3ac60f(0x59c)][_0x3ac60f(0x9db)]['ColorMaxLvGauge1'];return this['getColorDataFromPluginParameters'](_0x54c735,_0x394d42);},ColorManager[_0x25789e(0xb2)]=function(){const _0x317d11=_0x25789e,_0x228434='_stored_maxLvGaugeColor2';this[_0x317d11(0x7c5)]=this[_0x317d11(0x7c5)]||{};if(this[_0x317d11(0x7c5)][_0x228434])return this['_colorCache'][_0x228434];const _0x5d67a2=VisuMZ['CoreEngine'][_0x317d11(0x59c)][_0x317d11(0x9db)][_0x317d11(0x742)];return this[_0x317d11(0x607)](_0x228434,_0x5d67a2);},ColorManager[_0x25789e(0x21f)]=function(_0x4ec0bb){const _0x252b35=_0x25789e;return VisuMZ[_0x252b35(0xf9)][_0x252b35(0x59c)]['Color'][_0x252b35(0x2b5)]['call'](this,_0x4ec0bb);},ColorManager[_0x25789e(0x249)]=function(_0x270bb0){const _0x560aff=_0x25789e;return VisuMZ['CoreEngine']['Settings'][_0x560aff(0x9db)]['ActorMPColor']['call'](this,_0x270bb0);},ColorManager[_0x25789e(0x75c)]=function(_0xbe1ae7){const _0x2f9633=_0x25789e;return VisuMZ[_0x2f9633(0xf9)]['Settings'][_0x2f9633(0x9db)][_0x2f9633(0x11f)][_0x2f9633(0x800)](this,_0xbe1ae7);},ColorManager[_0x25789e(0xdd)]=function(_0x511fe4){const _0x58eaaf=_0x25789e;return VisuMZ[_0x58eaaf(0xf9)]['Settings'][_0x58eaaf(0x9db)][_0x58eaaf(0x674)]['call'](this,_0x511fe4);},ColorManager[_0x25789e(0x727)]=function(_0x2bb0ec){const _0x17c4d2=_0x25789e;return VisuMZ[_0x17c4d2(0xf9)][_0x17c4d2(0x59c)][_0x17c4d2(0x9db)][_0x17c4d2(0x2bb)][_0x17c4d2(0x800)](this,_0x2bb0ec);},ColorManager[_0x25789e(0x96d)]=function(){const _0x4161ad=_0x25789e;return VisuMZ[_0x4161ad(0xf9)]['Settings']['Color'][_0x4161ad(0x858)];},ColorManager['outlineColorDmg']=function(){const _0x44196b=_0x25789e;return VisuMZ[_0x44196b(0xf9)][_0x44196b(0x59c)]['Color'][_0x44196b(0x938)]||_0x44196b(0x601);},ColorManager[_0x25789e(0x9a5)]=function(){const _0x4c2384=_0x25789e;return VisuMZ[_0x4c2384(0xf9)][_0x4c2384(0x59c)][_0x4c2384(0x9db)]['OutlineColorGauge']||_0x4c2384(0x364);},ColorManager[_0x25789e(0x631)]=function(){const _0x2a4b69=_0x25789e;return VisuMZ[_0x2a4b69(0xf9)][_0x2a4b69(0x59c)][_0x2a4b69(0x9db)]['DimColor1'];},ColorManager[_0x25789e(0x92e)]=function(){const _0x168d24=_0x25789e;return VisuMZ[_0x168d24(0xf9)][_0x168d24(0x59c)][_0x168d24(0x9db)][_0x168d24(0x86e)];},ColorManager[_0x25789e(0x9ff)]=function(){const _0xf1e5d=_0x25789e;return VisuMZ[_0xf1e5d(0xf9)][_0xf1e5d(0x59c)][_0xf1e5d(0x9db)][_0xf1e5d(0x56b)];},ColorManager[_0x25789e(0x579)]=function(){const _0x4bd6dc=_0x25789e;return VisuMZ[_0x4bd6dc(0xf9)]['Settings'][_0x4bd6dc(0x9db)][_0x4bd6dc(0x551)];},SceneManager['_storedStack']=[],SceneManager[_0x25789e(0x94c)]=function(){const _0x4a5ec6=_0x25789e;return this['_scene']&&this[_0x4a5ec6(0x5f4)]['constructor']===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x29f1c8=_0x25789e;return this[_0x29f1c8(0x5f4)]&&this[_0x29f1c8(0x5f4)][_0x29f1c8(0x49f)]===Scene_Map;},SceneManager[_0x25789e(0x2df)]=function(){const _0x509676=_0x25789e;return this[_0x509676(0x5f4)]&&this[_0x509676(0x5f4)]instanceof Scene_Map;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x5ec)]=SceneManager[_0x25789e(0x928)],SceneManager[_0x25789e(0x928)]=function(){const _0x76ea11=_0x25789e;VisuMZ['CoreEngine'][_0x76ea11(0x5ec)][_0x76ea11(0x800)](this),this[_0x76ea11(0x819)]();},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x947)]=SceneManager['onKeyDown'],SceneManager[_0x25789e(0x316)]=function(_0x508901){const _0x163053=_0x25789e;if($gameTemp)this[_0x163053(0x906)](_0x508901);VisuMZ[_0x163053(0xf9)][_0x163053(0x947)][_0x163053(0x800)](this,_0x508901);},SceneManager[_0x25789e(0x906)]=function(_0x5a5452){const _0x123470=_0x25789e;if(!_0x5a5452['ctrlKey']&&!_0x5a5452[_0x123470(0x931)]){if(_0x123470(0x29b)===_0x123470(0x29b))switch(_0x5a5452[_0x123470(0x6d1)]){case 0x52:this[_0x123470(0x3ab)]();break;case 0x54:this['playTestShiftT']();break;case 0x75:this[_0x123470(0x9e4)]();break;case 0x76:if(Input[_0x123470(0x6ad)](_0x123470(0x456))||Input[_0x123470(0x6ad)](_0x123470(0x196)))return;this['playTestF7']();break;}else _0x3a7d0d[_0x123470(0xf9)][_0x123470(0x59c)][_0x123470(0x25e)][_0x123470(0x509)]?this[_0x123470(0x64d)](_0x4882d9,_0x3ad09b,_0x49e973,_0x77e228):_0x281af9[_0x123470(0xf9)]['Bitmap_drawTextOutline'][_0x123470(0x800)](this,_0x47c9e6,_0x11f959,_0x25e6a9,_0xed6c79);}},SceneManager[_0x25789e(0x9e4)]=function(){const _0x5f41ee=_0x25789e;if($gameTemp[_0x5f41ee(0x254)]()&&VisuMZ[_0x5f41ee(0xf9)][_0x5f41ee(0x59c)][_0x5f41ee(0x25e)][_0x5f41ee(0x697)]){ConfigManager[_0x5f41ee(0x171)]!==0x0?(ConfigManager[_0x5f41ee(0x372)]=0x0,ConfigManager[_0x5f41ee(0x45d)]=0x0,ConfigManager[_0x5f41ee(0x177)]=0x0,ConfigManager[_0x5f41ee(0x171)]=0x0):_0x5f41ee(0x663)!==_0x5f41ee(0x663)?this['removePointAnimation'](_0x11b1d0):(ConfigManager['bgmVolume']=0x64,ConfigManager[_0x5f41ee(0x45d)]=0x64,ConfigManager[_0x5f41ee(0x177)]=0x64,ConfigManager[_0x5f41ee(0x171)]=0x64);ConfigManager['save']();if(this[_0x5f41ee(0x5f4)][_0x5f41ee(0x49f)]===Scene_Options){if(this[_0x5f41ee(0x5f4)]['_optionsWindow'])this[_0x5f41ee(0x5f4)][_0x5f41ee(0x15c)][_0x5f41ee(0x6b5)]();if(this[_0x5f41ee(0x5f4)][_0x5f41ee(0x501)])this[_0x5f41ee(0x5f4)]['_listWindow'][_0x5f41ee(0x6b5)]();}}},SceneManager[_0x25789e(0x778)]=function(){const _0x4d3126=_0x25789e;$gameTemp[_0x4d3126(0x254)]()&&VisuMZ[_0x4d3126(0xf9)]['Settings'][_0x4d3126(0x25e)][_0x4d3126(0x6ee)]&&(_0x4d3126(0x295)!==_0x4d3126(0x30d)?$gameTemp[_0x4d3126(0x8b5)]=!$gameTemp[_0x4d3126(0x8b5)]:this[_0x4d3126(0x4ce)]());},SceneManager[_0x25789e(0x3ab)]=function(){const _0x2f5c58=_0x25789e;if(!VisuMZ['CoreEngine']['Settings']['QoL'][_0x2f5c58(0x98c)])return;if(!$gameTemp[_0x2f5c58(0x254)]())return;if(!SceneManager['isSceneBattle']())return;if(!Input['isPressed']('shift'))return;for(const _0x35cf10 of $gameParty[_0x2f5c58(0x525)]()){if(!_0x35cf10)continue;_0x35cf10[_0x2f5c58(0x1b6)]();}},SceneManager[_0x25789e(0x3ed)]=function(){const _0x22dfde=_0x25789e;if(!VisuMZ[_0x22dfde(0xf9)][_0x22dfde(0x59c)][_0x22dfde(0x25e)][_0x22dfde(0x7b4)])return;if(!$gameTemp[_0x22dfde(0x254)]())return;if(!SceneManager['isSceneBattle']())return;if(!Input[_0x22dfde(0x6ad)](_0x22dfde(0x456)))return;for(const _0x3c113f of $gameParty['members']()){if(!_0x3c113f)continue;_0x3c113f[_0x22dfde(0x48a)](_0x3c113f['maxTp']());}},SceneManager[_0x25789e(0x819)]=function(){const _0x2c411b=_0x25789e;this[_0x2c411b(0x569)]=![],this[_0x2c411b(0x736)]=!VisuMZ[_0x2c411b(0xf9)]['Settings']['UI'][_0x2c411b(0x63d)];},SceneManager[_0x25789e(0x1a8)]=function(_0x23752f){const _0x38c2bf=_0x25789e;if(VisuMZ[_0x38c2bf(0xf9)][_0x38c2bf(0x59c)]['UI']['SideButtons']){if(_0x38c2bf(0x807)!==_0x38c2bf(0x308))this[_0x38c2bf(0x569)]=_0x23752f;else{var _0x308257=_0x27862b(_0x4a8fc4['$1']);try{_0x55bf5b=_0x1d60fb[_0x38c2bf(0x311)](_0x1697db,_0x2bc8a6(_0x3a721f(_0x308257)));}catch(_0x3eb473){if(_0x1ee46a['isPlaytest']())_0x1609b1[_0x38c2bf(0x927)](_0x3eb473);}}}},SceneManager[_0x25789e(0x47c)]=function(){const _0x54f6ec=_0x25789e;return this[_0x54f6ec(0x569)];},SceneManager['areButtonsHidden']=function(){return this['_hideButtons'];},SceneManager[_0x25789e(0x1ff)]=function(){const _0x24397c=_0x25789e;return this['areButtonsHidden']()||this[_0x24397c(0x47c)]();},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x9b3)]=SceneManager[_0x25789e(0x538)],SceneManager[_0x25789e(0x538)]=function(){const _0x58b32a=_0x25789e;if(VisuMZ[_0x58b32a(0xf9)][_0x58b32a(0x59c)][_0x58b32a(0x25e)][_0x58b32a(0x457)]){if(_0x58b32a(0x74f)==='VulKA'){const _0x3dd11c=_0x800d39[_0x58b32a(0x7d3)](_0x2c1ed4,_0x33839f)[_0x58b32a(0x3f6)](_0x2a984d=>_0x2a984d['isNormalPriority']());return _0x3dd11c[_0x58b32a(0x73d)]>0x0;}else return VisuMZ[_0x58b32a(0xf9)][_0x58b32a(0x9b3)]['call'](this);}else return!![];},SceneManager[_0x25789e(0x36c)]=function(_0x3a495f){const _0x3d3e08=_0x25789e;if(_0x3a495f instanceof Error){if(_0x3d3e08(0x334)==='rAxNW'){const _0x3e710a='_stored_mpGaugeColor2';this[_0x3d3e08(0x7c5)]=this[_0x3d3e08(0x7c5)]||{};if(this[_0x3d3e08(0x7c5)][_0x3e710a])return this['_colorCache'][_0x3e710a];const _0x58e875=_0x58b9f6[_0x3d3e08(0xf9)][_0x3d3e08(0x59c)][_0x3d3e08(0x9db)]['ColorMPGauge2'];return this[_0x3d3e08(0x607)](_0x3e710a,_0x58e875);}else this['catchNormalError'](_0x3a495f);}else _0x3a495f instanceof Array&&_0x3a495f[0x0]===_0x3d3e08(0x326)?this[_0x3d3e08(0x14f)](_0x3a495f):'gBJAa'==='nZyVG'?_0x261585[_0x3d3e08(0x67c)][_0x3d3e08(0x644)](_0x5a763e):this[_0x3d3e08(0x3ef)](_0x3a495f);this[_0x3d3e08(0x783)]();},VisuMZ[_0x25789e(0xf9)]['BattleManager_processEscape']=BattleManager[_0x25789e(0x398)],BattleManager['processEscape']=function(){const _0x39960c=_0x25789e;return VisuMZ[_0x39960c(0xf9)]['Settings'][_0x39960c(0x25e)][_0x39960c(0x487)]?this[_0x39960c(0x3c4)]():VisuMZ[_0x39960c(0xf9)]['BattleManager_processEscape'][_0x39960c(0x800)](this);},BattleManager[_0x25789e(0x3c4)]=function(){const _0x377b67=_0x25789e;return $gameParty['performEscape'](),SoundManager[_0x377b67(0x298)](),this['onEscapeSuccess'](),!![];},BattleManager[_0x25789e(0x24a)]=function(){const _0xa0747a=_0x25789e;return $gameSystem[_0xa0747a(0xc7)]()>=0x1;},BattleManager[_0x25789e(0x584)]=function(){const _0x903ded=_0x25789e;return $gameSystem[_0x903ded(0xc7)]()===0x1;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x975)]=Game_Temp[_0x25789e(0x866)][_0x25789e(0x928)],Game_Temp['prototype'][_0x25789e(0x928)]=function(){const _0xc1a0e3=_0x25789e;VisuMZ[_0xc1a0e3(0xf9)][_0xc1a0e3(0x975)]['call'](this),this[_0xc1a0e3(0x952)](),this[_0xc1a0e3(0x5a0)](),this['createPointAnimationQueue']();},Game_Temp[_0x25789e(0x866)][_0x25789e(0x952)]=function(){const _0x32f20a=_0x25789e;VisuMZ['CoreEngine']['Settings'][_0x32f20a(0x25e)][_0x32f20a(0x541)]&&(this[_0x32f20a(0x499)]=![]);},Game_Temp[_0x25789e(0x866)]['setLastPluginCommandInterpreter']=function(_0x71ce9c){const _0x324c79=_0x25789e;this[_0x324c79(0x406)]=_0x71ce9c;},Game_Temp[_0x25789e(0x866)][_0x25789e(0xf3)]=function(){const _0x4eb1e8=_0x25789e;return this[_0x4eb1e8(0x406)];},Game_Temp[_0x25789e(0x866)]['clearForcedGameTroopSettingsCoreEngine']=function(){const _0x5b5edc=_0x25789e;this[_0x5b5edc(0x35b)]=undefined,this[_0x5b5edc(0x29e)]=undefined,this['_forcedBattleGridSystem']=undefined;},Game_Temp[_0x25789e(0x866)][_0x25789e(0x1f0)]=function(_0x4abe5b){const _0x45fe33=_0x25789e;if($gameMap&&$dataMap&&$dataMap[_0x45fe33(0x881)]){if(_0x45fe33(0x300)!==_0x45fe33(0x1b7))this[_0x45fe33(0x65e)]($dataMap[_0x45fe33(0x881)]);else{if(!_0x1296a2[_0x45fe33(0x254)]())return;if(!_0x260190[_0x45fe33(0x321)]())return;_0x1a0ade[_0x45fe33(0x747)](_0x15a628,_0x228ee8);const _0x3fdef9=_0x5e1e26[_0x45fe33(0x9f7)]||0x1;_0x3b4411[_0x45fe33(0x725)]=_0x3fdef9;}}const _0x4ba4a3=$dataTroops[_0x4abe5b];if(_0x4ba4a3){let _0x46dc7c=DataManager['createTroopNote'](_0x4ba4a3['id']);this[_0x45fe33(0x65e)](_0x46dc7c);}},Game_Temp['prototype'][_0x25789e(0x65e)]=function(_0x29b5f4){const _0x5ee5a9=_0x25789e;if(!_0x29b5f4)return;if(_0x29b5f4[_0x5ee5a9(0x8af)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x5ee5a9(0x35b)]='FV';else{if(_0x29b5f4['match'](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x5ee5a9(0x35b)]='SV';else{if(_0x29b5f4[_0x5ee5a9(0x8af)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x999c0=String(RegExp['$1']);if(_0x999c0[_0x5ee5a9(0x8af)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x5ee5a9(0x35b)]='FV';else{if(_0x999c0[_0x5ee5a9(0x8af)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)){if(_0x5ee5a9(0xac)==='MAmVv')return _0x25efef[_0x5ee5a9(0xf9)]['Settings']['UI'][_0x5ee5a9(0x156)];else this['_forcedTroopView']='SV';}}}}}if(_0x29b5f4[_0x5ee5a9(0x8af)](/<(?:DTB)>/i))this[_0x5ee5a9(0x29e)]=0x0;else{if(_0x29b5f4['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x5ee5a9(0x29e)]=0x1;else{if(_0x29b5f4[_0x5ee5a9(0x8af)](/<(?:TPB|ATB)[ ]WAIT>/i))'xwakc'===_0x5ee5a9(0x690)?this[_0x5ee5a9(0x29e)]=0x2:_0x3c6f83(_0x5ee5a9(0x9b6));else{if(_0x29b5f4[_0x5ee5a9(0x8af)](/<(?:CTB)>/i))_0x5ee5a9(0x936)===_0x5ee5a9(0x4f0)?_0x3c4e7d['atbActive']=!![]:Imported['VisuMZ_2_BattleSystemCTB']&&('byTAV'===_0x5ee5a9(0x38b)?this['contents']['fontSize']>=0x18&&(this[_0x5ee5a9(0x890)][_0x5ee5a9(0x92c)]-=0x6):this[_0x5ee5a9(0x29e)]=_0x5ee5a9(0x5fe));else{if(_0x29b5f4[_0x5ee5a9(0x8af)](/<(?:STB)>/i)){if(Imported[_0x5ee5a9(0x6ab)]){if(_0x5ee5a9(0x755)!==_0x5ee5a9(0x709))this[_0x5ee5a9(0x29e)]=_0x5ee5a9(0x43b);else{if(this[_0x5ee5a9(0x7e1)]())return 0x1;const _0xca5989=this[_0x5ee5a9(0xc5)]()-this[_0x5ee5a9(0x136)](),_0x578abe=this[_0x5ee5a9(0x1b0)]()-this[_0x5ee5a9(0x136)]();return(_0x578abe/_0xca5989)[_0x5ee5a9(0x68d)](0x0,0x1);}}}else{if(_0x29b5f4[_0x5ee5a9(0x8af)](/<(?:BTB)>/i))Imported[_0x5ee5a9(0x2d8)]&&(_0x5ee5a9(0x1e6)===_0x5ee5a9(0x1e6)?this[_0x5ee5a9(0x29e)]='BTB':(this[_0x5ee5a9(0x49e)]=_0x27bc09[_0x5ee5a9(0xf9)][_0x5ee5a9(0x59c)][_0x5ee5a9(0x25e)][_0x5ee5a9(0x514)]??0x4,this[_0x5ee5a9(0x1b2)](),this[_0x5ee5a9(0x49e)]=this[_0x5ee5a9(0x49e)]['clamp'](0x1,0xa)));else{if(_0x29b5f4[_0x5ee5a9(0x8af)](/<(?:FTB)>/i))_0x5ee5a9(0x99f)===_0x5ee5a9(0x99f)?Imported['VisuMZ_2_BattleSystemFTB']&&('PnLfP'===_0x5ee5a9(0x17e)?this[_0x5ee5a9(0x29e)]=_0x5ee5a9(0x35c):this[_0x5ee5a9(0x586)][_0x5ee5a9(0x6a7)]=this['_anglePlus'][_0x5ee5a9(0x3b6)]):_0x53ec71[_0x5ee5a9(0x6ad)]('shift')&&this[_0x5ee5a9(0x44e)]()?this[_0x5ee5a9(0x1d7)]():this[_0x5ee5a9(0x1e3)](_0x4e955e['isTriggered'](_0x5ee5a9(0x2cc)));else{if(_0x29b5f4[_0x5ee5a9(0x8af)](/<(?:OTB)>/i))Imported[_0x5ee5a9(0x1c5)]&&('uzorL'===_0x5ee5a9(0x4ee)?_0x23a8e0[_0x5ee5a9(0x6ab)]&&(this[_0x5ee5a9(0x29e)]='STB'):this[_0x5ee5a9(0x29e)]='OTB');else{if(_0x29b5f4[_0x5ee5a9(0x8af)](/<(?:ETB)>/i))Imported[_0x5ee5a9(0x330)]&&(this[_0x5ee5a9(0x29e)]=_0x5ee5a9(0x7d8));else{if(_0x29b5f4['match'](/<(?:PTB)>/i)){if(_0x5ee5a9(0x338)!==_0x5ee5a9(0x80b))Imported[_0x5ee5a9(0x8d7)]&&(this[_0x5ee5a9(0x29e)]='PTB');else{const _0x5c4e9a=_0x39283d[_0x5ee5a9(0x9ee)]()*_0x25adb2['tileWidth']();return(this['_x']-_0x5c4e9a)*_0x490103[_0x5ee5a9(0x859)]();}}else{if(_0x29b5f4[_0x5ee5a9(0x8af)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x5ee5a9(0xdf)==='nfBbO'){const _0x4d807a=String(RegExp['$1']);if(_0x4d807a[_0x5ee5a9(0x8af)](/DTB/i)){if(_0x5ee5a9(0x2f0)!==_0x5ee5a9(0x878))this[_0x5ee5a9(0x29e)]=0x0;else return _0x3acdcc['getInputMultiButtonStrings']('pageup',_0x5ee5a9(0x1a3));}else{if(_0x4d807a['match'](/(?:TPB|ATB)[ ]ACTIVE/i))_0x5ee5a9(0x3a2)!==_0x5ee5a9(0x5a7)?this['_forcedBattleSys']=0x1:this[_0x5ee5a9(0x29e)]=_0x5ee5a9(0x33f);else{if(_0x4d807a['match'](/(?:TPB|ATB)[ ]WAIT/i))this[_0x5ee5a9(0x29e)]=0x2;else{if(_0x4d807a[_0x5ee5a9(0x8af)](/CTB/i))Imported[_0x5ee5a9(0x585)]&&(this[_0x5ee5a9(0x29e)]=_0x5ee5a9(0x5fe));else{if(_0x4d807a[_0x5ee5a9(0x8af)](/STB/i))Imported[_0x5ee5a9(0x6ab)]&&(this[_0x5ee5a9(0x29e)]=_0x5ee5a9(0x43b));else{if(_0x4d807a[_0x5ee5a9(0x8af)](/BTB/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this['_forcedBattleSys']='BTB');else{if(_0x4d807a[_0x5ee5a9(0x8af)](/FTB/i))Imported[_0x5ee5a9(0x354)]&&(this[_0x5ee5a9(0x29e)]='FTB');else{if(_0x4d807a[_0x5ee5a9(0x8af)](/OTB/i))'fioin'!==_0x5ee5a9(0x1fd)?this['catchLoadError'](_0xbc33f5):Imported[_0x5ee5a9(0x1c5)]&&('lprIs'===_0x5ee5a9(0x1d1)?_0x2256f2=_0xc45fb5['GroupDigits'](_0x3e7f7a):this[_0x5ee5a9(0x29e)]=_0x5ee5a9(0x899));else{if(_0x4d807a[_0x5ee5a9(0x8af)](/ETB/i))Imported['VisuMZ_2_BattleSystemETB']&&(_0x5ee5a9(0x9b2)===_0x5ee5a9(0x210)?(_0x478ded[_0x5ee5a9(0xe7)]=_0x48f7c9,_0x53001b['pos']=_0x5308f4[_0x5ee5a9(0x71c)]['seek'](),_0x329877[_0x5ee5a9(0x11c)](_0x53014e),_0x4b2b21[_0x5ee5a9(0x536)](_0x306a63,_0x1196ba[_0x5ee5a9(0x5a3)]),_0x29eeb0['_bgsBuffer'][_0x5ee5a9(0x7f8)](_0x27b01c[_0x5ee5a9(0x5a3)])):this[_0x5ee5a9(0x29e)]=_0x5ee5a9(0x7d8));else{if(_0x4d807a[_0x5ee5a9(0x8af)](/PTB/i)){if(_0x5ee5a9(0x16a)!=='qbhvK'){const _0x5ba703=this[_0x5ee5a9(0x8e7)](),_0x36fc48=this[_0x5ee5a9(0x142)]['paramValueByName'](_0x39a9b4),_0x2ceaf7=_0x36fc48-this['_actor']['paramValueByName'](_0x480ffb);this[_0x5ee5a9(0x18f)](_0x43ace3[_0x5ee5a9(0xdd)](_0x2ceaf7)),this['drawText'](this[_0x5ee5a9(0x142)][_0x5ee5a9(0x195)](_0x101c7c,!![]),_0x14ca09,_0x5adf6a,_0x5ba703,_0x5ee5a9(0xe9));}else Imported[_0x5ee5a9(0x8d7)]&&(_0x5ee5a9(0x190)!==_0x5ee5a9(0x190)?(_0x25f847=_0x1aa03c[_0x5ee5a9(0x664)](),_0x2a6f44=_0x3946df[_0x5ee5a9(0xb2)]()):this[_0x5ee5a9(0x29e)]=_0x5ee5a9(0x33f));}}}}}}}}}}}else this[_0x5ee5a9(0x121)]['x']=_0x1d7a23[_0x5ee5a9(0x381)]+0x4;}}}}}}}}}}}if(_0x29b5f4[_0x5ee5a9(0x8af)](/<(?:|BATTLE )GRID>/i))this[_0x5ee5a9(0x84e)]=!![];else _0x29b5f4[_0x5ee5a9(0x8af)](/<NO (?:|BATTLE )GRID>/i)&&(this[_0x5ee5a9(0x84e)]=![]);},Game_Temp['prototype']['createFauxAnimationQueue']=function(){const _0x1db360=_0x25789e;this[_0x1db360(0x39c)]=[];},Game_Temp[_0x25789e(0x866)][_0x25789e(0x849)]=function(_0x1c1b5f,_0x4f9006,_0x132566,_0x531200){const _0x1e2e06=_0x25789e;if(!this[_0x1e2e06(0x2a9)]())return;_0x132566=_0x132566||![],_0x531200=_0x531200||![];if($dataAnimations[_0x4f9006]){if('rfifq'===_0x1e2e06(0x481)){const _0x4da9bb={'targets':_0x1c1b5f,'animationId':_0x4f9006,'mirror':_0x132566,'mute':_0x531200};this[_0x1e2e06(0x39c)][_0x1e2e06(0x5b2)](_0x4da9bb);for(const _0x1267fa of _0x1c1b5f){if(_0x1e2e06(0x85b)===_0x1e2e06(0x131)){const _0x9bb698=_0x3977b2[_0x1e2e06(0x3a7)][_0x1e2e06(0x126)];if([_0x1e2e06(0x737),_0x1e2e06(0x4a8),_0x1e2e06(0x965),_0x1e2e06(0x941)][_0x1e2e06(0x2ec)](_0x9bb698))return![];return _0x29242d[_0x1e2e06(0xf9)][_0x1e2e06(0x4dc)][_0x1e2e06(0x800)](this);}else _0x1267fa[_0x1e2e06(0x7a5)]&&_0x1267fa[_0x1e2e06(0x7a5)]();}}else return this[_0x1e2e06(0x723)]&&this['_skillTypeWindow'][_0x1e2e06(0x842)];}},Game_Temp[_0x25789e(0x866)][_0x25789e(0x2a9)]=function(){return!![];},Game_Temp[_0x25789e(0x866)][_0x25789e(0x429)]=function(){const _0x2676e8=_0x25789e;return this[_0x2676e8(0x39c)]['shift']();},Game_Temp[_0x25789e(0x866)][_0x25789e(0x2ca)]=function(){const _0x1f8da8=_0x25789e;this[_0x1f8da8(0x264)]=[];},Game_Temp['prototype']['requestPointAnimation']=function(_0x20692c,_0x2c1782,_0x5bb1a8,_0xc5d45e,_0x4aa386){const _0x575ab3=_0x25789e;if(!this[_0x575ab3(0x337)]())return;_0xc5d45e=_0xc5d45e||![],_0x4aa386=_0x4aa386||![];if($dataAnimations[_0x5bb1a8]){const _0x5c9d4e={'x':_0x20692c,'y':_0x2c1782,'animationId':_0x5bb1a8,'mirror':_0xc5d45e,'mute':_0x4aa386};this['_pointAnimationQueue'][_0x575ab3(0x5b2)](_0x5c9d4e);}},Game_Temp[_0x25789e(0x866)][_0x25789e(0x337)]=function(){return!![];},Game_Temp[_0x25789e(0x866)][_0x25789e(0x1eb)]=function(){const _0x3e8df7=_0x25789e;return this['_pointAnimationQueue'][_0x3e8df7(0x456)]();},VisuMZ['CoreEngine'][_0x25789e(0x5bc)]=Game_System[_0x25789e(0x866)][_0x25789e(0x928)],Game_System['prototype'][_0x25789e(0x928)]=function(){const _0x3060ee=_0x25789e;VisuMZ['CoreEngine'][_0x3060ee(0x5bc)]['call'](this),this[_0x3060ee(0xcf)]();},Game_System[_0x25789e(0x866)][_0x25789e(0xcf)]=function(){const _0x2856d3=_0x25789e;this[_0x2856d3(0x8b9)]={'SideView':$dataSystem[_0x2856d3(0x24f)],'BattleSystem':this[_0x2856d3(0xb3)](),'FontSize':$dataSystem[_0x2856d3(0xe8)][_0x2856d3(0x92c)],'Padding':0xc};},Game_System['prototype'][_0x25789e(0x2af)]=function(){const _0x581edd=_0x25789e;if($gameTemp[_0x581edd(0x35b)]==='SV')return!![];else{if($gameTemp[_0x581edd(0x35b)]==='FV')return![];}if(this['_CoreEngineSettings']===undefined)this[_0x581edd(0xcf)]();if(this[_0x581edd(0x8b9)][_0x581edd(0x19a)]===undefined)this[_0x581edd(0xcf)]();return this['_CoreEngineSettings'][_0x581edd(0x19a)];},Game_System[_0x25789e(0x866)][_0x25789e(0x6de)]=function(_0x3d7e78){const _0x34c874=_0x25789e;if(this['_CoreEngineSettings']===undefined)this[_0x34c874(0xcf)]();if(this[_0x34c874(0x8b9)]['SideView']===undefined)this[_0x34c874(0xcf)]();this['_CoreEngineSettings']['SideView']=_0x3d7e78;},Game_System[_0x25789e(0x866)][_0x25789e(0x670)]=function(){const _0x31a18d=_0x25789e;if(this['_CoreEngineSettings']===undefined)this[_0x31a18d(0xcf)]();this[_0x31a18d(0x8b9)][_0x31a18d(0x4a0)]=this[_0x31a18d(0xb3)]();},Game_System[_0x25789e(0x866)][_0x25789e(0xb3)]=function(){const _0x10792c=_0x25789e,_0x3bf050=(VisuMZ['CoreEngine'][_0x10792c(0x59c)]['BattleSystem']||_0x10792c(0x6bb))[_0x10792c(0x595)]()[_0x10792c(0x91f)]();return VisuMZ[_0x10792c(0xf9)]['CreateBattleSystemID'](_0x3bf050);},Game_System[_0x25789e(0x866)][_0x25789e(0xc7)]=function(){const _0x405cad=_0x25789e;if($gameTemp['_forcedBattleSys']!==undefined)return $gameTemp[_0x405cad(0x29e)];if(this[_0x405cad(0x8b9)]===undefined)this[_0x405cad(0xcf)]();if(this['_CoreEngineSettings']['BattleSystem']===undefined)this[_0x405cad(0x670)]();return this[_0x405cad(0x8b9)][_0x405cad(0x4a0)];},Game_System[_0x25789e(0x866)][_0x25789e(0x483)]=function(_0x36e1a7){const _0x259f89=_0x25789e;if(this[_0x259f89(0x8b9)]===undefined)this[_0x259f89(0xcf)]();if(this[_0x259f89(0x8b9)][_0x259f89(0x4a0)]===undefined)this[_0x259f89(0x670)]();this['_CoreEngineSettings'][_0x259f89(0x4a0)]=_0x36e1a7;},Game_System['prototype'][_0x25789e(0x754)]=function(){const _0x3c2d53=_0x25789e;if(this[_0x3c2d53(0x8b9)]===undefined)this[_0x3c2d53(0xcf)]();if(this['_CoreEngineSettings'][_0x3c2d53(0x8a8)]===undefined)this[_0x3c2d53(0xcf)]();return this[_0x3c2d53(0x8b9)]['FontSize'];},Game_System[_0x25789e(0x866)][_0x25789e(0x789)]=function(_0x359fdb){const _0x39e92d=_0x25789e;if(this[_0x39e92d(0x8b9)]===undefined)this[_0x39e92d(0xcf)]();if(this[_0x39e92d(0x8b9)][_0x39e92d(0x165)]===undefined)this[_0x39e92d(0xcf)]();this[_0x39e92d(0x8b9)][_0x39e92d(0x8a8)]=_0x359fdb;},Game_System['prototype'][_0x25789e(0x88c)]=function(){const _0x25cf01=_0x25789e;if(this['_CoreEngineSettings']===undefined)this[_0x25cf01(0xcf)]();if(this[_0x25cf01(0x8b9)][_0x25cf01(0x5fd)]===undefined)this[_0x25cf01(0xcf)]();return this[_0x25cf01(0x8b9)]['Padding'];},Game_System[_0x25789e(0x866)][_0x25789e(0x8d9)]=function(_0x5bba5d){const _0x1f9963=_0x25789e;if(this[_0x1f9963(0x8b9)]===undefined)this['initCoreEngine']();if(this[_0x1f9963(0x8b9)]['TimeProgress']===undefined)this[_0x1f9963(0xcf)]();this[_0x1f9963(0x8b9)][_0x1f9963(0x5fd)]=_0x5bba5d;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x44f)]=Game_Screen[_0x25789e(0x866)]['initialize'],Game_Screen[_0x25789e(0x866)][_0x25789e(0x928)]=function(){const _0x416400=_0x25789e;VisuMZ[_0x416400(0xf9)][_0x416400(0x44f)]['call'](this),this['initCoreEngineScreenShake']();},Game_Screen['prototype'][_0x25789e(0x7e5)]=function(){const _0x58c2b0=_0x25789e,_0x1d51d1=VisuMZ[_0x58c2b0(0xf9)][_0x58c2b0(0x59c)][_0x58c2b0(0x968)];this['_coreEngineShakeStyle']=_0x1d51d1?.[_0x58c2b0(0x301)]||_0x58c2b0(0x80f);},Game_Screen['prototype'][_0x25789e(0x632)]=function(){const _0x46e1be=_0x25789e;if(this[_0x46e1be(0x998)]===undefined)this[_0x46e1be(0x7e5)]();return this[_0x46e1be(0x998)];},Game_Screen[_0x25789e(0x866)][_0x25789e(0x740)]=function(_0x5df68a){const _0x54953e=_0x25789e;if(this['_coreEngineShakeStyle']===undefined)this['initCoreEngineScreenShake']();this[_0x54953e(0x998)]=_0x5df68a[_0x54953e(0x76e)]()[_0x54953e(0x91f)]();},Game_Picture['prototype'][_0x25789e(0x8a3)]=function(){const _0x315ab0=_0x25789e;if($gameParty[_0x315ab0(0x23b)]())return![];return this[_0x315ab0(0x8b1)]()&&this[_0x315ab0(0x8b1)]()['charAt'](0x0)==='!';},Game_Picture[_0x25789e(0x866)][_0x25789e(0x8b1)]=function(){const _0x120ff0=_0x25789e;return this[_0x120ff0(0x9c0)][_0x120ff0(0x9b9)]('/')['pop']();},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x365)]=Game_Picture[_0x25789e(0x866)]['x'],Game_Picture['prototype']['x']=function(){const _0xfa97b4=_0x25789e;if(this['isMapScrollLinked']()){if(_0xfa97b4(0x283)!==_0xfa97b4(0x336))return this[_0xfa97b4(0x4a6)]();else this[_0xfa97b4(0x9fb)][_0xfa97b4(0x615)](_0x1ca90c[_0xfa97b4(0xe4)][_0xfa97b4(0x647)]);}else return VisuMZ[_0xfa97b4(0xf9)]['Game_Picture_x'][_0xfa97b4(0x800)](this);},Game_Picture[_0x25789e(0x866)][_0x25789e(0x4a6)]=function(){const _0x416d0b=_0x25789e,_0xcb1b3b=$gameMap['displayX']()*$gameMap['tileWidth']();return(this['_x']-_0xcb1b3b)*$gameScreen[_0x416d0b(0x859)]();},VisuMZ[_0x25789e(0xf9)]['Game_Picture_y']=Game_Picture[_0x25789e(0x866)]['y'],Game_Picture[_0x25789e(0x866)]['y']=function(){const _0x37c61b=_0x25789e;return this[_0x37c61b(0x8a3)]()?this[_0x37c61b(0x84d)]():VisuMZ[_0x37c61b(0xf9)][_0x37c61b(0x396)]['call'](this);},Game_Picture[_0x25789e(0x866)][_0x25789e(0x84d)]=function(){const _0x38a67=_0x25789e,_0x46624b=$gameMap[_0x38a67(0x9ec)]()*$gameMap[_0x38a67(0x4fe)]();return(this['_y']-_0x46624b)*$gameScreen[_0x38a67(0x859)]();},VisuMZ['CoreEngine'][_0x25789e(0x178)]=Game_Picture[_0x25789e(0x866)][_0x25789e(0x88d)],Game_Picture[_0x25789e(0x866)][_0x25789e(0x88d)]=function(){const _0x3d3714=_0x25789e;let _0x180a4c=VisuMZ['CoreEngine']['Game_Picture_scaleX'][_0x3d3714(0x800)](this);return this['isMapScrollLinked']()&&(_0x180a4c*=$gameScreen[_0x3d3714(0x859)]()),_0x180a4c;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x6b8)]=Game_Picture['prototype'][_0x25789e(0x767)],Game_Picture['prototype'][_0x25789e(0x767)]=function(){const _0x5d9f31=_0x25789e;let _0x420e0f=VisuMZ[_0x5d9f31(0xf9)][_0x5d9f31(0x6b8)]['call'](this);return this['isMapScrollLinked']()&&(_0x420e0f*=$gameScreen[_0x5d9f31(0x859)]()),_0x420e0f;},Game_Picture[_0x25789e(0x866)][_0x25789e(0x312)]=function(_0x1e6372){const _0x53e57d=_0x25789e;this[_0x53e57d(0xa01)]=_0x1e6372;},VisuMZ['CoreEngine']['Game_Picture_calcEasing']=Game_Picture[_0x25789e(0x866)][_0x25789e(0x765)],Game_Picture[_0x25789e(0x866)][_0x25789e(0x765)]=function(_0x1d9528){const _0x25cc17=_0x25789e;return this[_0x25cc17(0xa01)]=this['_coreEasingType']||0x0,[0x0,0x1,0x2,0x3][_0x25cc17(0x2ec)](this['_coreEasingType'])?VisuMZ['CoreEngine']['Game_Picture_calcEasing']['call'](this,_0x1d9528):VisuMZ[_0x25cc17(0x8d0)](_0x1d9528,this[_0x25cc17(0xa01)]);},VisuMZ['CoreEngine']['Game_Picture_initRotation']=Game_Picture['prototype']['initRotation'],Game_Picture['prototype'][_0x25789e(0x48e)]=function(){const _0x2f40f5=_0x25789e;VisuMZ['CoreEngine']['Game_Picture_initRotation'][_0x2f40f5(0x800)](this),this[_0x2f40f5(0x5b4)]();},Game_Picture[_0x25789e(0x866)]['initRotationCoreEngine']=function(){this['_anglePlus']={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':'Linear'};},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x493)]=Game_Picture[_0x25789e(0x866)][_0x25789e(0x7ac)],Game_Picture['prototype'][_0x25789e(0x7ac)]=function(){const _0x19db62=_0x25789e;let _0x4ea1cb=VisuMZ[_0x19db62(0xf9)]['Game_Picture_angle']['call'](this);return _0x4ea1cb+=this[_0x19db62(0x2c4)](),_0x4ea1cb;},Game_Picture[_0x25789e(0x866)]['anglePlus']=function(){const _0xaff6d5=_0x25789e;if(this['_anglePlus']===undefined)this[_0xaff6d5(0x5b4)]();return this['_anglePlus'][_0xaff6d5(0x6a7)]||0x0;},Game_Picture[_0x25789e(0x866)][_0x25789e(0x40b)]=function(_0x795fa3,_0x5bc6be,_0x1cfac4){const _0x40bf9b=_0x25789e;if(this[_0x40bf9b(0x586)]===undefined)this['initRotationCoreEngine']();this['_anglePlus'][_0x40bf9b(0x3b6)]=_0x795fa3||0x0,this[_0x40bf9b(0x586)][_0x40bf9b(0x649)]=_0x5bc6be||0x0,this[_0x40bf9b(0x586)][_0x40bf9b(0x2cd)]=_0x5bc6be||0x0,this['_anglePlus']['easingType']=_0x1cfac4||'Linear',_0x5bc6be<=0x0&&(this[_0x40bf9b(0x586)]['current']=this[_0x40bf9b(0x586)]['target']);},Game_Picture['prototype']['changeAnglePlusData']=function(_0x558bb7,_0x5e22d8,_0x36d384){const _0x34b8a9=_0x25789e;if(this['_anglePlus']===undefined)this[_0x34b8a9(0x5b4)]();this['_anglePlus'][_0x34b8a9(0x3b6)]+=_0x558bb7||0x0,this[_0x34b8a9(0x586)][_0x34b8a9(0x649)]=_0x5e22d8||0x0,this[_0x34b8a9(0x586)][_0x34b8a9(0x2cd)]=_0x5e22d8||0x0,this[_0x34b8a9(0x586)][_0x34b8a9(0x78c)]=_0x36d384||_0x34b8a9(0x22d),_0x5e22d8<=0x0&&(this[_0x34b8a9(0x586)]['current']=this[_0x34b8a9(0x586)]['target']);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x847)]=Game_Picture[_0x25789e(0x866)][_0x25789e(0x548)],Game_Picture['prototype']['updateRotation']=function(){const _0x2838fb=_0x25789e;VisuMZ['CoreEngine']['Game_Picture_updateRotation'][_0x2838fb(0x800)](this),this[_0x2838fb(0x5b1)]();},Game_Picture[_0x25789e(0x866)][_0x25789e(0x5b1)]=function(){const _0x2719d4=_0x25789e;if(this[_0x2719d4(0x586)]===undefined)this[_0x2719d4(0x5b4)]();const _0x2ebe9b=this['_anglePlus'];if(_0x2ebe9b[_0x2719d4(0x649)]<=0x0)return;_0x2ebe9b[_0x2719d4(0x6a7)]=this[_0x2719d4(0x659)](_0x2ebe9b[_0x2719d4(0x6a7)],_0x2ebe9b[_0x2719d4(0x3b6)]),_0x2ebe9b[_0x2719d4(0x649)]--,_0x2ebe9b['duration']<=0x0&&(_0x2719d4(0x305)!==_0x2719d4(0x305)?(this[_0x2719d4(0x6d6)]=_0x160da9[_0x2719d4(0x775)](this[_0x2719d4(0x460)][_0x2719d4(0x1c2)]),this['bitmap'][_0x2719d4(0x880)](this['onButtonImageLoad']['bind'](this))):_0x2ebe9b[_0x2719d4(0x6a7)]=_0x2ebe9b[_0x2719d4(0x3b6)]);},Game_Picture[_0x25789e(0x866)][_0x25789e(0x659)]=function(_0x5c5e32,_0x376c47){const _0x50fa9e=_0x25789e,_0x58e249=this[_0x50fa9e(0x586)],_0x57b189=_0x58e249[_0x50fa9e(0x78c)],_0x792c05=_0x58e249[_0x50fa9e(0x649)],_0x3c44f6=_0x58e249['wholeDuration'],_0x1114f4=VisuMZ[_0x50fa9e(0x8d0)]((_0x3c44f6-_0x792c05)/_0x3c44f6,_0x57b189),_0x2a2faa=VisuMZ[_0x50fa9e(0x8d0)]((_0x3c44f6-_0x792c05+0x1)/_0x3c44f6,_0x57b189),_0x1e1e37=(_0x5c5e32-_0x376c47*_0x1114f4)/(0x1-_0x1114f4);return _0x1e1e37+(_0x376c47-_0x1e1e37)*_0x2a2faa;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x9eb)]=Game_Action[_0x25789e(0x866)][_0x25789e(0x4e5)],Game_Action[_0x25789e(0x866)][_0x25789e(0x4e5)]=function(_0xb44905){const _0x1bb427=_0x25789e;return VisuMZ['CoreEngine'][_0x1bb427(0x59c)]['QoL'][_0x1bb427(0x9cc)]?this['itemHitImprovedAccuracy'](_0xb44905):VisuMZ[_0x1bb427(0xf9)][_0x1bb427(0x9eb)]['call'](this,_0xb44905);},Game_Action['prototype'][_0x25789e(0x25f)]=function(_0x57d189){const _0x4afbe1=_0x25789e,_0x2c08df=this[_0x4afbe1(0x8ab)](_0x57d189),_0x5b3528=this[_0x4afbe1(0x4d1)](_0x57d189),_0x197334=this['targetEvaRate'](_0x57d189);return _0x2c08df*(_0x5b3528-_0x197334);},VisuMZ['CoreEngine'][_0x25789e(0x15b)]=Game_Action[_0x25789e(0x866)][_0x25789e(0x8f9)],Game_Action[_0x25789e(0x866)]['itemEva']=function(_0x1af927){const _0x476ff2=_0x25789e;return VisuMZ['CoreEngine']['Settings']['QoL'][_0x476ff2(0x9cc)]?0x0:VisuMZ['CoreEngine'][_0x476ff2(0x15b)][_0x476ff2(0x800)](this,_0x1af927);},Game_Action[_0x25789e(0x866)][_0x25789e(0x8ab)]=function(_0x2ba0ab){const _0x540ea0=_0x25789e;return this[_0x540ea0(0x4be)]()[_0x540ea0(0x331)]*0.01;},Game_Action['prototype'][_0x25789e(0x4d1)]=function(_0x48972d){const _0x783a=_0x25789e;if(VisuMZ['CoreEngine'][_0x783a(0x59c)]['QoL'][_0x783a(0x194)]&&this[_0x783a(0x8f8)]())return 0x1;if(this[_0x783a(0x687)]()){if('QJFUI'!=='sSdWt'){if(VisuMZ[_0x783a(0xf9)][_0x783a(0x59c)][_0x783a(0x25e)][_0x783a(0x194)]&&this[_0x783a(0x8b3)]()[_0x783a(0x21c)]())return this[_0x783a(0x8b3)]()[_0x783a(0x91b)]+0.05;else{if(_0x783a(0x633)==='AUZkm')this[_0x783a(0x6c3)][_0x783a(0x615)](_0x5c4dfd[_0x783a(0xe4)]['ItemBgType']);else return this[_0x783a(0x8b3)]()[_0x783a(0x91b)];}}else{const _0x1c4463=_0x43d472['width']-_0x5b2607['boxWidth']-_0x4f26a6[_0x783a(0xf9)][_0x783a(0x59c)]['UI'][_0x783a(0x6dc)]*0x2,_0x2d2ede=_0x2e328d[_0x783a(0x866)][_0x783a(0x1ac)][_0x783a(0x800)](this)*0x4;if(_0x1c4463>=_0x2d2ede)_0xfd7fd0['setSideButtonLayout'](!![]);}}else return 0x1;},Game_Action[_0x25789e(0x866)]['targetEvaRate']=function(_0x3eb613){const _0x2f1b4d=_0x25789e;if(this[_0x2f1b4d(0x8b3)]()[_0x2f1b4d(0x21c)]()===_0x3eb613[_0x2f1b4d(0x21c)]())return 0x0;if(this[_0x2f1b4d(0x687)]()){if(_0x2f1b4d(0x7d6)!==_0x2f1b4d(0x7d6))this[_0x2f1b4d(0x29e)]='OTB';else return VisuMZ['CoreEngine'][_0x2f1b4d(0x59c)][_0x2f1b4d(0x25e)][_0x2f1b4d(0x194)]&&_0x3eb613['isEnemy']()?_0x3eb613[_0x2f1b4d(0x5f8)]-0.05:_0x3eb613[_0x2f1b4d(0x5f8)];}else{if(this[_0x2f1b4d(0x9be)]())return _0x3eb613[_0x2f1b4d(0x814)];else{if('wVefA'!==_0x2f1b4d(0x394))this[_0x2f1b4d(0x987)]=!![],this[_0x2f1b4d(0x91c)](),_0x3d9d9c[_0x2f1b4d(0x459)](),this['_playtestF7Looping']=![];else return 0x0;}}},VisuMZ[_0x25789e(0xf9)]['Game_Action_updateLastTarget']=Game_Action['prototype']['updateLastTarget'],Game_Action['prototype'][_0x25789e(0xb5)]=function(_0x5ca668){const _0xaed360=_0x25789e;VisuMZ[_0xaed360(0xf9)][_0xaed360(0x60e)][_0xaed360(0x800)](this,_0x5ca668);if(VisuMZ[_0xaed360(0xf9)][_0xaed360(0x59c)][_0xaed360(0x25e)][_0xaed360(0x9cc)])return;const _0x320c3f=_0x5ca668[_0xaed360(0x3e3)]();if(_0x320c3f[_0xaed360(0x434)]){if('YaYWB'==='YaYWB')0x1-this['itemEva'](_0x5ca668)>this[_0xaed360(0x4e5)](_0x5ca668)&&(_0xaed360(0x54e)!==_0xaed360(0x1f9)?(_0x320c3f['missed']=![],_0x320c3f[_0xaed360(0x1d4)]=!![]):(this['_x']=this[_0xaed360(0x19d)],this['_y']=this[_0xaed360(0x4c6)],this['_scaleX']=this[_0xaed360(0x48c)],this['_scaleY']=this['_targetScaleY'],this[_0xaed360(0x378)]=this['_targetOpacity'],this[_0xaed360(0x9d5)]&&(this[_0xaed360(0x9d5)]['x']=this[_0xaed360(0x950)]['x'],this['_anchor']['y']=this['_targetAnchor']['y'])));else{const _0x32dca1=this[_0xaed360(0x1b1)];this['drawBackground'](0x0,0x0,_0x32dca1,this[_0xaed360(0x99b)]());const _0x1e56ff=this[_0xaed360(0x341)](_0x56b00c[_0xaed360(0x919)]())[_0xaed360(0x59d)];this['drawTextEx'](_0x4bcc25[_0xaed360(0x919)](),_0x5afd0a[_0xaed360(0x36f)]((_0x32dca1-_0x1e56ff)/0x2),0x0);}}},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x348)]=Game_BattlerBase[_0x25789e(0x866)]['initMembers'],Game_BattlerBase[_0x25789e(0x866)][_0x25789e(0x19f)]=function(){const _0x101611=_0x25789e;this['_cache']={},VisuMZ[_0x101611(0xf9)][_0x101611(0x348)]['call'](this);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x967)]=Game_BattlerBase[_0x25789e(0x866)][_0x25789e(0x6b5)],Game_BattlerBase[_0x25789e(0x866)][_0x25789e(0x6b5)]=function(){const _0x4a97ab=_0x25789e;this['_cache']={},VisuMZ[_0x4a97ab(0xf9)][_0x4a97ab(0x967)][_0x4a97ab(0x800)](this);},Game_BattlerBase[_0x25789e(0x866)][_0x25789e(0x770)]=function(_0x4327b5){const _0x9628be=_0x25789e;return this[_0x9628be(0x26e)]=this['_cache']||{},this[_0x9628be(0x26e)][_0x4327b5]!==undefined;},Game_BattlerBase['prototype']['paramPlus']=function(_0x8f3ce5){const _0x23f30b=_0x25789e,_0x156804=(_0x39eb0c,_0x9554be)=>{const _0x50f957=_0x481b;if(!_0x9554be)return _0x39eb0c;if(_0x9554be['note'][_0x50f957(0x8af)](VisuMZ['CoreEngine']['RegExp'][_0x50f957(0x109)][_0x8f3ce5])){if(_0x50f957(0x954)===_0x50f957(0x954)){var _0x34e5c6=Number(RegExp['$1']);_0x39eb0c+=_0x34e5c6;}else{if(_0x1186d9[_0x50f957(0x23b)]())return;_0x50bad1['ConvertParams'](_0x309e40,_0x4a652b);const _0x278493=_0x583a1[_0x50f957(0x16b)](_0x55ec46[_0x50f957(0x547)],_0x2f45a8[_0x50f957(0x7f3)]),_0x2f258c=_0x531467[_0x50f957(0x311)](_0x143fec[_0x50f957(0x547)],_0x1684c7[_0x50f957(0x7f3)]),_0x34b62f=(_0x49939a['Chance']||0x0)/0x64;for(let _0x15f974=_0x278493;_0x15f974<=_0x2f258c;_0x15f974++){const _0x4f6390=_0x36b35c[_0x50f957(0x80f)]()<=_0x34b62f;_0x140130[_0x50f957(0x5eb)](_0x15f974,_0x4f6390);}}}if(_0x9554be['note']['match'](VisuMZ[_0x50f957(0xf9)][_0x50f957(0x26a)][_0x50f957(0x3b1)][_0x8f3ce5])){var _0x185cd2=String(RegExp['$1']);try{_0x39eb0c+=eval(_0x185cd2);}catch(_0x37c83f){if($gameTemp[_0x50f957(0x254)]())console[_0x50f957(0x927)](_0x37c83f);}}return _0x39eb0c;};return this[_0x23f30b(0x22c)]()[_0x23f30b(0x7e2)](_0x156804,this['_paramPlus'][_0x8f3ce5]);},Game_BattlerBase[_0x25789e(0x866)][_0x25789e(0x9e)]=function(_0x5a051d){const _0x37e76b=_0x25789e;var _0xf4d8ab=_0x37e76b(0x65a)+(this['isActor']()?_0x37e76b(0x3e8):'Enemy')+_0x37e76b(0x1bf)+_0x5a051d;if(this[_0x37e76b(0x770)](_0xf4d8ab))return this[_0x37e76b(0x26e)][_0xf4d8ab];this[_0x37e76b(0x26e)][_0xf4d8ab]=eval(VisuMZ[_0x37e76b(0xf9)][_0x37e76b(0x59c)][_0x37e76b(0x5c0)][_0xf4d8ab]);const _0x559407=(_0x170b77,_0x49796f)=>{const _0xd6d9b5=_0x37e76b;if(_0xd6d9b5(0x716)!=='uQsTF'){if(!_0x49796f)return _0x170b77;if(_0x49796f[_0xd6d9b5(0x881)][_0xd6d9b5(0x8af)](VisuMZ['CoreEngine'][_0xd6d9b5(0x26a)][_0xd6d9b5(0x9e)][_0x5a051d])){var _0x43a99e=Number(RegExp['$1']);if(_0x43a99e===0x0)_0x43a99e=Number[_0xd6d9b5(0x1c6)];_0x170b77=Math['max'](_0x170b77,_0x43a99e);}if(_0x49796f[_0xd6d9b5(0x881)]['match'](VisuMZ[_0xd6d9b5(0xf9)][_0xd6d9b5(0x26a)][_0xd6d9b5(0x3e7)][_0x5a051d])){if(_0xd6d9b5(0x708)===_0xd6d9b5(0x6a1))return this[_0xd6d9b5(0x3da)];else{var _0x27638c=String(RegExp['$1']);try{_0x170b77=Math[_0xd6d9b5(0x311)](_0x170b77,Number(eval(_0x27638c)));}catch(_0x2227f8){if('TXnWj'!=='TXnWj')for(const _0x2d6303 in _0x22160d){const _0x3b9afa=_0xc3abd7[_0x2d6303];_0x3b9afa[_0xd6d9b5(0x126)][_0xd6d9b5(0x8af)](/(.*)\/(.*)/i)&&(_0x3b9afa['name']=_0x3d2ec6(_0x27c517['$2'][_0xd6d9b5(0x91f)]()));}else{if($gameTemp['isPlaytest']())console[_0xd6d9b5(0x927)](_0x2227f8);}}}}return _0x170b77;}else this['_helpWindow']['setBackgroundType'](_0x32f4b9['layoutSettings'][_0xd6d9b5(0x717)]);};if(this['_cache'][_0xf4d8ab]===0x0)this[_0x37e76b(0x26e)][_0xf4d8ab]=Number['MAX_SAFE_INTEGER'];return this['_cache'][_0xf4d8ab]=this[_0x37e76b(0x22c)]()['reduce'](_0x559407,this[_0x37e76b(0x26e)][_0xf4d8ab]),this['_cache'][_0xf4d8ab];},Game_BattlerBase[_0x25789e(0x866)][_0x25789e(0x594)]=function(_0x5c1093){const _0x10a8db=_0x25789e,_0x405cc4=this[_0x10a8db(0x275)](Game_BattlerBase['TRAIT_PARAM'],_0x5c1093),_0x3e5d1f=(_0x681e19,_0xbd466b)=>{const _0x11f045=_0x10a8db;if('rbdQl'!=='rbdQl')return this;else{if(!_0xbd466b)return _0x681e19;if(_0xbd466b[_0x11f045(0x881)][_0x11f045(0x8af)](VisuMZ[_0x11f045(0xf9)][_0x11f045(0x26a)][_0x11f045(0x4e1)][_0x5c1093])){var _0x57f1de=Number(RegExp['$1'])/0x64;_0x681e19*=_0x57f1de;}if(_0xbd466b[_0x11f045(0x881)]['match'](VisuMZ['CoreEngine'][_0x11f045(0x26a)]['paramRate2'][_0x5c1093])){var _0x57f1de=Number(RegExp['$1']);_0x681e19*=_0x57f1de;}if(_0xbd466b['note'][_0x11f045(0x8af)](VisuMZ[_0x11f045(0xf9)]['RegExp'][_0x11f045(0x57f)][_0x5c1093])){if(_0x11f045(0x46c)!==_0x11f045(0x46c))_0x3a2105[_0x11f045(0x330)]&&(this[_0x11f045(0x29e)]=_0x11f045(0x7d8));else{var _0x42fd0f=String(RegExp['$1']);try{_0x681e19*=eval(_0x42fd0f);}catch(_0x5e22a2){if($gameTemp['isPlaytest']())console[_0x11f045(0x927)](_0x5e22a2);}}}return _0x681e19;}};return this[_0x10a8db(0x22c)]()[_0x10a8db(0x7e2)](_0x3e5d1f,_0x405cc4);},Game_BattlerBase['prototype'][_0x25789e(0x31e)]=function(_0x5492df){const _0x5b9f4f=_0x25789e,_0x36a2c8=(_0x524f36,_0x483e07)=>{const _0x2be18e=_0x481b;if(!_0x483e07)return _0x524f36;if(_0x483e07[_0x2be18e(0x881)][_0x2be18e(0x8af)](VisuMZ['CoreEngine'][_0x2be18e(0x26a)][_0x2be18e(0x9bb)][_0x5492df])){var _0xb9faf9=Number(RegExp['$1']);_0x524f36+=_0xb9faf9;}if(_0x483e07[_0x2be18e(0x881)][_0x2be18e(0x8af)](VisuMZ[_0x2be18e(0xf9)]['RegExp'][_0x2be18e(0x204)][_0x5492df])){var _0x254bce=String(RegExp['$1']);try{_0x524f36+=eval(_0x254bce);}catch(_0x202d80){if(_0x2be18e(0x763)===_0x2be18e(0x763)){if($gameTemp[_0x2be18e(0x254)]())console['log'](_0x202d80);}else return _0x2be18e(0x5fe);}}return _0x524f36;};return this[_0x5b9f4f(0x22c)]()[_0x5b9f4f(0x7e2)](_0x36a2c8,0x0);},Game_BattlerBase[_0x25789e(0x866)][_0x25789e(0x8cd)]=function(_0x51f3f2){const _0x43b2b2=_0x25789e;let _0x515e91=_0x43b2b2(0x8cd)+_0x51f3f2+_0x43b2b2(0x703);if(this[_0x43b2b2(0x770)](_0x515e91))return this[_0x43b2b2(0x26e)][_0x515e91];return this[_0x43b2b2(0x26e)][_0x515e91]=Math[_0x43b2b2(0x997)](VisuMZ[_0x43b2b2(0xf9)][_0x43b2b2(0x59c)][_0x43b2b2(0x5c0)][_0x43b2b2(0x5de)][_0x43b2b2(0x800)](this,_0x51f3f2)),this[_0x43b2b2(0x26e)][_0x515e91];},Game_BattlerBase['prototype'][_0x25789e(0x7d9)]=function(_0x10295c){const _0x26e44b=_0x25789e,_0x4e28e1=(_0x176b29,_0x28ffae)=>{const _0x3958b0=_0x481b;if(!_0x28ffae)return _0x176b29;if(_0x28ffae[_0x3958b0(0x881)][_0x3958b0(0x8af)](VisuMZ['CoreEngine'][_0x3958b0(0x26a)][_0x3958b0(0x2f2)][_0x10295c])){if(_0x3958b0(0x420)!==_0x3958b0(0x207)){var _0xd8ebcf=Number(RegExp['$1'])/0x64;_0x176b29+=_0xd8ebcf;}else{let _0x5eee8e=this[_0x3958b0(0x26d)];this[_0x3958b0(0x26d)]=_0x579809,_0x5eee8e!==this[_0x3958b0(0x26d)]&&(this[_0x3958b0(0x6b5)](),_0x2fe2db[_0x3958b0(0x66f)](),this['_mode']===_0x3958b0(0x5bf)?this[_0x3958b0(0x7a6)](0x0):this[_0x3958b0(0x7a6)](-0x1));}}if(_0x28ffae['note'][_0x3958b0(0x8af)](VisuMZ[_0x3958b0(0xf9)][_0x3958b0(0x26a)][_0x3958b0(0x2be)][_0x10295c])){if(_0x3958b0(0x99e)!=='BBaWx')_0x3bd309['prototype']['createBackground'][_0x3958b0(0x800)](this);else{var _0xd8ebcf=Number(RegExp['$1']);_0x176b29+=_0xd8ebcf;}}if(_0x28ffae[_0x3958b0(0x881)][_0x3958b0(0x8af)](VisuMZ[_0x3958b0(0xf9)][_0x3958b0(0x26a)][_0x3958b0(0x205)][_0x10295c])){if(_0x3958b0(0x935)!==_0x3958b0(0x935))return this[_0x3958b0(0x264)][_0x3958b0(0x456)]();else{var _0x40860a=String(RegExp['$1']);try{_0x176b29+=eval(_0x40860a);}catch(_0x2ed4c7){if('TGMLo'!=='TGMLo'){const _0x3349e7=_0xced25b[_0x3958b0(0x456)]();_0x3349e7[_0x3958b0(0x87c)]&&_0x3349e7[_0x3958b0(0x106)]&&_0x3349e7['openness']>0x0&&(_0x19dcbd[_0x3958b0(0x3f3)](_0xf982c4[_0x3958b0(0x8b6)],0x0,~0x0),_0x3127bd[_0x3958b0(0x46b)](_0x803a3e[_0x3958b0(0x6d8)],_0x22f0a6[_0x3958b0(0x6d8)],_0x5beb84[_0x3958b0(0x6d8)]),_0x3349e7[_0x3958b0(0x7f0)](_0x3df62e),_0x408643[_0x3958b0(0x9ed)][_0x3958b0(0x772)](),_0xb527fd['clear'](),_0x3be407['stencilFunc'](_0x3368c0['ALWAYS'],0x1,~0x0),_0x505427[_0x3958b0(0x46b)](_0x13adb5['REPLACE'],_0x1a4dcf[_0x3958b0(0x82a)],_0x2535f7['REPLACE']),_0x1da074[_0x3958b0(0x2bf)](_0x5ccb0f[_0x3958b0(0x82e)],_0x1c8732['ONE']),_0x375525[_0x3958b0(0x7f0)](_0x3403c9),_0x32c55b['batch'][_0x3958b0(0x772)](),_0x517c0e[_0x3958b0(0x2bf)](_0xf6c087[_0x3958b0(0x756)],_0x1a765b[_0x3958b0(0x27e)]));}else{if($gameTemp[_0x3958b0(0x254)]())console[_0x3958b0(0x927)](_0x2ed4c7);}}}}return _0x176b29;};return this['traitObjects']()[_0x26e44b(0x7e2)](_0x4e28e1,0x0);},Game_BattlerBase[_0x25789e(0x866)][_0x25789e(0x843)]=function(_0x347a6b){const _0x37a061=_0x25789e,_0x568967=(_0x30b5b0,_0x1a6fc2)=>{const _0x20eb5b=_0x481b;if(!_0x1a6fc2)return _0x30b5b0;if(_0x1a6fc2[_0x20eb5b(0x881)][_0x20eb5b(0x8af)](VisuMZ['CoreEngine']['RegExp'][_0x20eb5b(0x650)][_0x347a6b])){var _0x684742=Number(RegExp['$1'])/0x64;_0x30b5b0*=_0x684742;}if(_0x1a6fc2[_0x20eb5b(0x881)][_0x20eb5b(0x8af)](VisuMZ[_0x20eb5b(0xf9)][_0x20eb5b(0x26a)]['xparamRate2'][_0x347a6b])){var _0x684742=Number(RegExp['$1']);_0x30b5b0*=_0x684742;}if(_0x1a6fc2[_0x20eb5b(0x881)][_0x20eb5b(0x8af)](VisuMZ['CoreEngine'][_0x20eb5b(0x26a)][_0x20eb5b(0x889)][_0x347a6b])){var _0x1037ec=String(RegExp['$1']);try{_0x30b5b0*=eval(_0x1037ec);}catch(_0x2fba70){if($gameTemp['isPlaytest']())console[_0x20eb5b(0x927)](_0x2fba70);}}return _0x30b5b0;};return this['traitObjects']()[_0x37a061(0x7e2)](_0x568967,0x1);},Game_BattlerBase['prototype'][_0x25789e(0x103)]=function(_0x11cf3d){const _0x2d1e96=_0x25789e,_0x58b2cd=(_0x1134ca,_0x453141)=>{const _0x2d1f45=_0x481b;if(_0x2d1f45(0x208)===_0x2d1f45(0x208)){if(!_0x453141)return _0x1134ca;if(_0x453141[_0x2d1f45(0x881)]['match'](VisuMZ[_0x2d1f45(0xf9)][_0x2d1f45(0x26a)][_0x2d1f45(0x620)][_0x11cf3d])){if('UikUL'!==_0x2d1f45(0x8ad))return;else{var _0x3c494f=Number(RegExp['$1'])/0x64;_0x1134ca+=_0x3c494f;}}if(_0x453141[_0x2d1f45(0x881)][_0x2d1f45(0x8af)](VisuMZ[_0x2d1f45(0xf9)]['RegExp'][_0x2d1f45(0x219)][_0x11cf3d])){var _0x3c494f=Number(RegExp['$1']);_0x1134ca+=_0x3c494f;}if(_0x453141[_0x2d1f45(0x881)][_0x2d1f45(0x8af)](VisuMZ['CoreEngine'][_0x2d1f45(0x26a)]['xparamFlatJS'][_0x11cf3d])){var _0x3aa7c7=String(RegExp['$1']);try{_0x1134ca+=eval(_0x3aa7c7);}catch(_0x4e869b){if($gameTemp[_0x2d1f45(0x254)]())console[_0x2d1f45(0x927)](_0x4e869b);}}return _0x1134ca;}else{const _0x202bd9='_stored_powerDownColor';this[_0x2d1f45(0x7c5)]=this[_0x2d1f45(0x7c5)]||{};if(this[_0x2d1f45(0x7c5)][_0x202bd9])return this[_0x2d1f45(0x7c5)][_0x202bd9];const _0x598705=_0x458e45[_0x2d1f45(0xf9)][_0x2d1f45(0x59c)][_0x2d1f45(0x9db)]['ColorPowerDown'];return this[_0x2d1f45(0x607)](_0x202bd9,_0x598705);}};return this[_0x2d1e96(0x22c)]()[_0x2d1e96(0x7e2)](_0x58b2cd,0x0);},Game_BattlerBase[_0x25789e(0x866)]['xparam']=function(_0x48fc72){const _0x306839=_0x25789e;let _0x35e960=_0x306839(0x291)+_0x48fc72+'Total';if(this[_0x306839(0x770)](_0x35e960))return this[_0x306839(0x26e)][_0x35e960];return this['_cache'][_0x35e960]=VisuMZ['CoreEngine'][_0x306839(0x59c)]['Param'][_0x306839(0x776)][_0x306839(0x800)](this,_0x48fc72),this['_cache'][_0x35e960];},Game_BattlerBase[_0x25789e(0x866)][_0x25789e(0x62c)]=function(_0x134cfe){const _0x1f52af=_0x25789e,_0x30b6c1=(_0x124761,_0x5d9999)=>{const _0x646923=_0x481b;if(!_0x5d9999)return _0x124761;if(_0x5d9999[_0x646923(0x881)][_0x646923(0x8af)](VisuMZ[_0x646923(0xf9)][_0x646923(0x26a)][_0x646923(0x769)][_0x134cfe])){if(_0x646923(0x191)===_0x646923(0x357)){const _0x7bc9be=_0x3316d1[_0x646923(0xf9)][_0x646923(0x59c)][_0x646923(0x36b)]['CorrectSkinBleeding']??!![];if(!_0x7bc9be)return _0x5390e2[_0x646923(0xf9)][_0x646923(0x95c)][_0x646923(0x800)](this);const _0x3e03be=this[_0x646923(0x7cb)],_0x3cbbb9=_0xac5bcc[_0x646923(0x311)](0x0,this[_0x646923(0x590)]-_0x3e03be*0x2),_0x11eebb=_0x5891f0[_0x646923(0x311)](0x0,this[_0x646923(0x3d7)]-_0x3e03be*0x2),_0x42ecb2=this['_backSprite'],_0x535e1c=_0x42ecb2[_0x646923(0x689)][0x0];_0x42ecb2[_0x646923(0x6d6)]=this['_windowskin'],_0x42ecb2[_0x646923(0x1ea)](0x0,0x0,0x60,0x60),_0x42ecb2['move'](_0x3e03be,_0x3e03be),_0x42ecb2[_0x646923(0x24b)]['x']=_0x3cbbb9/0x60,_0x42ecb2[_0x646923(0x24b)]['y']=_0x11eebb/0x60,_0x535e1c['bitmap']=this[_0x646923(0x9ef)],_0x535e1c[_0x646923(0x1ea)](0x0,0x60,0x60,0x60),_0x535e1c['move'](0x0,0x0,_0x3cbbb9,_0x11eebb),_0x535e1c['scale']['x']=0x1/_0x42ecb2[_0x646923(0x24b)]['x'],_0x535e1c[_0x646923(0x24b)]['y']=0x1/_0x42ecb2[_0x646923(0x24b)]['y'],_0x42ecb2[_0x646923(0x2dc)](this['_colorTone']);}else{var _0x77aa54=Number(RegExp['$1'])/0x64;_0x124761+=_0x77aa54;}}if(_0x5d9999[_0x646923(0x881)][_0x646923(0x8af)](VisuMZ['CoreEngine'][_0x646923(0x26a)]['sparamPlus2'][_0x134cfe])){var _0x77aa54=Number(RegExp['$1']);_0x124761+=_0x77aa54;}if(_0x5d9999[_0x646923(0x881)]['match'](VisuMZ[_0x646923(0xf9)]['RegExp']['sparamPlusJS'][_0x134cfe])){var _0x358c14=String(RegExp['$1']);try{_0x124761+=eval(_0x358c14);}catch(_0x25308b){if(_0x646923(0x8e1)===_0x646923(0x738)){_0xd439b3['CoreEngine'][_0x646923(0x43c)][_0x646923(0x800)](this,_0x5e5667);if(_0x4ef19a[_0x646923(0xa1)])for(const _0x34b07f of _0x244735['learnings']){_0x34b07f[_0x646923(0x881)][_0x646923(0x8af)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x34b07f[_0x646923(0x98e)]=_0xaf7135['max'](_0x56c4d1(_0x5dad9a['$1']),0x1));}}else{if($gameTemp[_0x646923(0x254)]())console[_0x646923(0x927)](_0x25308b);}}}return _0x124761;};return this[_0x1f52af(0x22c)]()[_0x1f52af(0x7e2)](_0x30b6c1,0x0);},Game_BattlerBase[_0x25789e(0x866)][_0x25789e(0x719)]=function(_0x30cbd9){const _0x7b9745=_0x25789e,_0x5a2ca6=(_0x42b28f,_0x2f47ff)=>{const _0x47545f=_0x481b;if(_0x47545f(0x1a7)==='kPWZR'){if(!_0x2f47ff)return _0x42b28f;if(_0x2f47ff[_0x47545f(0x881)][_0x47545f(0x8af)](VisuMZ[_0x47545f(0xf9)][_0x47545f(0x26a)][_0x47545f(0x7af)][_0x30cbd9])){if(_0x47545f(0x485)!==_0x47545f(0x485))_0x97d803(_0x47545f(0x8bd)[_0x47545f(0x3a8)](_0x9e0ebe,_0x8ea694,_0x21c368)),_0xf27264[_0x47545f(0x193)]();else{var _0x3611c8=Number(RegExp['$1'])/0x64;_0x42b28f*=_0x3611c8;}}if(_0x2f47ff[_0x47545f(0x881)][_0x47545f(0x8af)](VisuMZ['CoreEngine']['RegExp'][_0x47545f(0x151)][_0x30cbd9])){var _0x3611c8=Number(RegExp['$1']);_0x42b28f*=_0x3611c8;}if(_0x2f47ff[_0x47545f(0x881)][_0x47545f(0x8af)](VisuMZ['CoreEngine'][_0x47545f(0x26a)][_0x47545f(0xd3)][_0x30cbd9])){var _0x557a64=String(RegExp['$1']);try{_0x42b28f*=eval(_0x557a64);}catch(_0x30d098){if(_0x47545f(0x2cb)!=='DxkLp')return!![];else{if($gameTemp[_0x47545f(0x254)]())console[_0x47545f(0x927)](_0x30d098);}}}return _0x42b28f;}else return![];};return this[_0x7b9745(0x22c)]()['reduce'](_0x5a2ca6,0x1);},Game_BattlerBase['prototype']['sparamFlatBonus']=function(_0x1ddd57){const _0x1bdfeb=_0x25789e,_0x27472d=(_0x21b883,_0x36d9d5)=>{const _0x508c0f=_0x481b;if(!_0x36d9d5)return _0x21b883;if(_0x36d9d5[_0x508c0f(0x881)][_0x508c0f(0x8af)](VisuMZ[_0x508c0f(0xf9)][_0x508c0f(0x26a)][_0x508c0f(0x80d)][_0x1ddd57])){var _0x116014=Number(RegExp['$1'])/0x64;_0x21b883+=_0x116014;}if(_0x36d9d5[_0x508c0f(0x881)][_0x508c0f(0x8af)](VisuMZ[_0x508c0f(0xf9)][_0x508c0f(0x26a)]['sparamFlat2'][_0x1ddd57])){if(_0x508c0f(0x871)!==_0x508c0f(0xc8)){var _0x116014=Number(RegExp['$1']);_0x21b883+=_0x116014;}else{const _0x26ce2b=_0x4ba4b0[_0x508c0f(0xf9)][_0x508c0f(0x59c)][_0x508c0f(0x25e)][_0x508c0f(0x70f)]||0x0;if(_0x26ce2b>0x0)_0x3d24e3[_0x508c0f(0x415)](_0x26ce2b);}}if(_0x36d9d5['note']['match'](VisuMZ[_0x508c0f(0xf9)][_0x508c0f(0x26a)]['sparamFlatJS'][_0x1ddd57])){if(_0x508c0f(0x144)!==_0x508c0f(0x144))return this[_0x508c0f(0x5f4)]&&this['_scene']instanceof _0x483f4f;else{var _0x858f3d=String(RegExp['$1']);try{_0x508c0f(0x9f2)===_0x508c0f(0x9f2)?_0x21b883+=eval(_0x858f3d):this[_0x508c0f(0x6c3)][_0x508c0f(0x615)](_0x4f5257[_0x508c0f(0xe4)][_0x508c0f(0x8e4)]);}catch(_0x23bcf1){if(_0x508c0f(0x97c)==='xjCiP'){if($gameTemp['isPlaytest']())console[_0x508c0f(0x927)](_0x23bcf1);}else _0x671dab['CoreEngine'][_0x508c0f(0x682)][_0x508c0f(0x800)](this),this[_0x508c0f(0x432)]();}}}return _0x21b883;};return this[_0x1bdfeb(0x22c)]()['reduce'](_0x27472d,0x0);},Game_BattlerBase['prototype']['sparam']=function(_0x1d194a){const _0x4eaa01=_0x25789e;let _0x3d73b5=_0x4eaa01(0x37d)+_0x1d194a+_0x4eaa01(0x703);if(this['checkCacheKey'](_0x3d73b5))return this[_0x4eaa01(0x26e)][_0x3d73b5];return this['_cache'][_0x3d73b5]=VisuMZ[_0x4eaa01(0xf9)][_0x4eaa01(0x59c)][_0x4eaa01(0x5c0)][_0x4eaa01(0x3ec)][_0x4eaa01(0x800)](this,_0x1d194a),this[_0x4eaa01(0x26e)][_0x3d73b5];},Game_BattlerBase['prototype']['paramValueByName']=function(_0xb6d4ea,_0xf6f6e7){const _0x4903e5=_0x25789e;if(typeof paramId==='number')return this[_0x4903e5(0x8cd)](_0xb6d4ea);_0xb6d4ea=String(_0xb6d4ea||'')[_0x4903e5(0x595)]();if(_0xb6d4ea==='MAXHP')return this[_0x4903e5(0x8cd)](0x0);if(_0xb6d4ea===_0x4903e5(0x2de))return this[_0x4903e5(0x8cd)](0x1);if(_0xb6d4ea===_0x4903e5(0x11a))return this[_0x4903e5(0x8cd)](0x2);if(_0xb6d4ea==='DEF')return this[_0x4903e5(0x8cd)](0x3);if(_0xb6d4ea==='MAT')return this['param'](0x4);if(_0xb6d4ea===_0x4903e5(0x805))return this['param'](0x5);if(_0xb6d4ea==='AGI')return this[_0x4903e5(0x8cd)](0x6);if(_0xb6d4ea===_0x4903e5(0x4c0))return this[_0x4903e5(0x8cd)](0x7);if(_0xb6d4ea==='HIT')return _0xf6f6e7?String(Math['round'](this[_0x4903e5(0x291)](0x0)*0x64))+'%':this[_0x4903e5(0x291)](0x0);if(_0xb6d4ea===_0x4903e5(0x985))return _0xf6f6e7?String(Math[_0x4903e5(0x997)](this[_0x4903e5(0x291)](0x1)*0x64))+'%':this[_0x4903e5(0x291)](0x1);if(_0xb6d4ea===_0x4903e5(0x4db))return _0xf6f6e7?String(Math[_0x4903e5(0x997)](this[_0x4903e5(0x291)](0x2)*0x64))+'%':this[_0x4903e5(0x291)](0x2);if(_0xb6d4ea===_0x4903e5(0x7ef))return _0xf6f6e7?String(Math['round'](this[_0x4903e5(0x291)](0x3)*0x64))+'%':this[_0x4903e5(0x291)](0x3);if(_0xb6d4ea===_0x4903e5(0x87b))return _0xf6f6e7?String(Math['round'](this[_0x4903e5(0x291)](0x4)*0x64))+'%':this[_0x4903e5(0x291)](0x4);if(_0xb6d4ea===_0x4903e5(0x63c))return _0xf6f6e7?String(Math[_0x4903e5(0x997)](this[_0x4903e5(0x291)](0x5)*0x64))+'%':this['xparam'](0x5);if(_0xb6d4ea===_0x4903e5(0x787))return _0xf6f6e7?String(Math[_0x4903e5(0x997)](this[_0x4903e5(0x291)](0x6)*0x64))+'%':this[_0x4903e5(0x291)](0x6);if(_0xb6d4ea===_0x4903e5(0x2d5))return _0xf6f6e7?String(Math[_0x4903e5(0x997)](this[_0x4903e5(0x291)](0x7)*0x64))+'%':this[_0x4903e5(0x291)](0x7);if(_0xb6d4ea==='MRG')return _0xf6f6e7?String(Math[_0x4903e5(0x997)](this['xparam'](0x8)*0x64))+'%':this[_0x4903e5(0x291)](0x8);if(_0xb6d4ea===_0x4903e5(0xc9))return _0xf6f6e7?String(Math['round'](this[_0x4903e5(0x291)](0x9)*0x64))+'%':this[_0x4903e5(0x291)](0x9);if(_0xb6d4ea==='TGR')return _0xf6f6e7?String(Math['round'](this['sparam'](0x0)*0x64))+'%':this['sparam'](0x0);if(_0xb6d4ea===_0x4903e5(0x320))return _0xf6f6e7?String(Math[_0x4903e5(0x997)](this[_0x4903e5(0x37d)](0x1)*0x64))+'%':this['sparam'](0x1);if(_0xb6d4ea===_0x4903e5(0x7e8))return _0xf6f6e7?String(Math[_0x4903e5(0x997)](this[_0x4903e5(0x37d)](0x2)*0x64))+'%':this[_0x4903e5(0x37d)](0x2);if(_0xb6d4ea===_0x4903e5(0x2b8))return _0xf6f6e7?String(Math[_0x4903e5(0x997)](this['sparam'](0x3)*0x64))+'%':this[_0x4903e5(0x37d)](0x3);if(_0xb6d4ea===_0x4903e5(0x712))return _0xf6f6e7?String(Math[_0x4903e5(0x997)](this[_0x4903e5(0x37d)](0x4)*0x64))+'%':this[_0x4903e5(0x37d)](0x4);if(_0xb6d4ea==='TCR')return _0xf6f6e7?String(Math[_0x4903e5(0x997)](this[_0x4903e5(0x37d)](0x5)*0x64))+'%':this[_0x4903e5(0x37d)](0x5);if(_0xb6d4ea===_0x4903e5(0x9af))return _0xf6f6e7?String(Math[_0x4903e5(0x997)](this[_0x4903e5(0x37d)](0x6)*0x64))+'%':this[_0x4903e5(0x37d)](0x6);if(_0xb6d4ea===_0x4903e5(0x4b8))return _0xf6f6e7?String(Math['round'](this['sparam'](0x7)*0x64))+'%':this[_0x4903e5(0x37d)](0x7);if(_0xb6d4ea===_0x4903e5(0x4d0))return _0xf6f6e7?String(Math['round'](this[_0x4903e5(0x37d)](0x8)*0x64))+'%':this[_0x4903e5(0x37d)](0x8);if(_0xb6d4ea==='EXR')return _0xf6f6e7?String(Math['round'](this[_0x4903e5(0x37d)](0x9)*0x64))+'%':this[_0x4903e5(0x37d)](0x9);if(VisuMZ[_0x4903e5(0xf9)][_0x4903e5(0x85f)][_0xb6d4ea]){const _0x147f9a=VisuMZ[_0x4903e5(0xf9)][_0x4903e5(0x85f)][_0xb6d4ea],_0x2f6dcf=this[_0x147f9a];if(VisuMZ[_0x4903e5(0xf9)][_0x4903e5(0xe6)][_0xb6d4ea]===_0x4903e5(0x76b)){if(_0x4903e5(0x427)!==_0x4903e5(0x427)){const _0x36085c=_0x4903e5(0x7f4);this[_0x4903e5(0x7c5)]=this[_0x4903e5(0x7c5)]||{};if(this[_0x4903e5(0x7c5)][_0x36085c])return this[_0x4903e5(0x7c5)][_0x36085c];const _0x192691=_0x46678b[_0x4903e5(0xf9)]['Settings'][_0x4903e5(0x9db)][_0x4903e5(0x753)];return this[_0x4903e5(0x607)](_0x36085c,_0x192691);}else return _0x2f6dcf;}else{if(_0x4903e5(0x6e8)===_0x4903e5(0x6e8))return _0xf6f6e7?String(Math[_0x4903e5(0x997)](_0x2f6dcf*0x64))+'%':_0x2f6dcf;else{var _0x4d6a29=_0x2f11c6(_0x25efac['$1']);if(_0x4d6a29===0x0)_0x4d6a29=_0x433684[_0x4903e5(0x1c6)];_0x5e5ddb=_0x48a6ed[_0x4903e5(0x311)](_0x579972,_0x4d6a29);}}}return'';},Game_BattlerBase[_0x25789e(0x866)][_0x25789e(0x1b5)]=function(){const _0x201505=_0x25789e;return this[_0x201505(0x386)]()&&this[_0x201505(0x421)]<this[_0x201505(0x3b8)]*VisuMZ[_0x201505(0xf9)]['Settings'][_0x201505(0x5c0)][_0x201505(0x766)];},Game_Battler[_0x25789e(0x866)][_0x25789e(0x84b)]=function(){const _0x5c1e22=_0x25789e;SoundManager[_0x5c1e22(0xed)](),this[_0x5c1e22(0xe2)](_0x5c1e22(0x172));},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x67e)]=Game_Actor[_0x25789e(0x866)][_0x25789e(0x4c7)],Game_Actor[_0x25789e(0x866)]['paramBase']=function(_0x4ea4aa){const _0x5d0ff7=_0x25789e;if(this[_0x5d0ff7(0x98e)]>0x63)return this['paramBaseAboveLevel99'](_0x4ea4aa);return VisuMZ[_0x5d0ff7(0xf9)][_0x5d0ff7(0x67e)][_0x5d0ff7(0x800)](this,_0x4ea4aa);},Game_Actor[_0x25789e(0x866)][_0x25789e(0x66b)]=function(_0x3514f7){const _0x4e721d=_0x25789e,_0x4d027f=this[_0x4e721d(0x2f1)]()[_0x4e721d(0x84a)][_0x3514f7][0x63],_0x16beeb=this[_0x4e721d(0x2f1)]()['params'][_0x3514f7][0x62];return _0x4d027f+(_0x4d027f-_0x16beeb)*(this['level']-0x63);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x520)]=Game_Actor['prototype'][_0x25789e(0x529)],Game_Actor[_0x25789e(0x866)][_0x25789e(0x529)]=function(_0x80f763,_0x14d68a){const _0x1a7ec1=_0x25789e;$gameTemp[_0x1a7ec1(0x54a)]=!![],VisuMZ['CoreEngine'][_0x1a7ec1(0x520)]['call'](this,_0x80f763,_0x14d68a),$gameTemp[_0x1a7ec1(0x54a)]=undefined;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x5f5)]=Game_Actor['prototype'][_0x25789e(0x307)],Game_Actor[_0x25789e(0x866)][_0x25789e(0x307)]=function(){const _0x1b753e=_0x25789e;VisuMZ[_0x1b753e(0xf9)][_0x1b753e(0x5f5)][_0x1b753e(0x800)](this);if(!$gameTemp['_changingClass'])this[_0x1b753e(0x170)]();},Game_Actor['prototype'][_0x25789e(0x170)]=function(){const _0x510a6a=_0x25789e;this[_0x510a6a(0x26e)]={};if(VisuMZ[_0x510a6a(0xf9)][_0x510a6a(0x59c)][_0x510a6a(0x25e)][_0x510a6a(0x945)])this[_0x510a6a(0x421)]=this[_0x510a6a(0x3b8)];if(VisuMZ['CoreEngine'][_0x510a6a(0x59c)][_0x510a6a(0x25e)][_0x510a6a(0x83a)])this[_0x510a6a(0x810)]=this['mmp'];},Game_Actor[_0x25789e(0x866)][_0x25789e(0x7ca)]=function(){const _0x13a671=_0x25789e;if(this[_0x13a671(0x7e1)]())return 0x1;const _0x457a77=this['nextLevelExp']()-this[_0x13a671(0x136)](),_0x3a7c59=this[_0x13a671(0x1b0)]()-this[_0x13a671(0x136)]();return(_0x3a7c59/_0x457a77)[_0x13a671(0x68d)](0x0,0x1);},Game_Actor['prototype']['traitObjects']=function(){const _0xa384b7=_0x25789e,_0x26d6a9=Game_Battler[_0xa384b7(0x866)][_0xa384b7(0x22c)][_0xa384b7(0x800)](this);for(const _0x18f5d3 of this['equips']()){_0x18f5d3&&_0x26d6a9[_0xa384b7(0x5b2)](_0x18f5d3);}return _0x26d6a9[_0xa384b7(0x5b2)](this[_0xa384b7(0x2f1)](),this[_0xa384b7(0x68f)]()),_0x26d6a9;},Object['defineProperty'](Game_Enemy[_0x25789e(0x866)],_0x25789e(0x98e),{'get':function(){const _0x45a428=_0x25789e;return this[_0x45a428(0x94b)]();},'configurable':!![]}),Game_Enemy[_0x25789e(0x866)][_0x25789e(0x94b)]=function(){const _0x583e89=_0x25789e;return this[_0x583e89(0x68a)]()[_0x583e89(0x98e)];},Game_Enemy[_0x25789e(0x866)]['moveRelativeToResolutionChange']=function(){const _0x143702=_0x25789e;!this['_repositioned']&&(this[_0x143702(0x3f9)]+=Math['round']((Graphics[_0x143702(0x844)]-0x270)/0x2),this[_0x143702(0x3f9)]-=Math[_0x143702(0x36f)]((Graphics[_0x143702(0x844)]-Graphics['boxHeight'])/0x2),$gameSystem['isSideView']()?this[_0x143702(0x2e8)]-=Math[_0x143702(0x36f)]((Graphics['width']-Graphics[_0x143702(0x381)])/0x2):this['_screenX']+=Math[_0x143702(0x997)]((Graphics[_0x143702(0x381)]-0x330)/0x2)),this[_0x143702(0x89b)]=!![];},Game_Party[_0x25789e(0x866)][_0x25789e(0x4d2)]=function(){const _0xed6c74=_0x25789e;return VisuMZ[_0xed6c74(0xf9)][_0xed6c74(0x59c)][_0xed6c74(0x2e0)][_0xed6c74(0x82c)];},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x7dc)]=Game_Party[_0x25789e(0x866)]['consumeItem'],Game_Party[_0x25789e(0x866)]['consumeItem']=function(_0x719eab){const _0x203bdc=_0x25789e;if(VisuMZ['CoreEngine']['Settings']['QoL'][_0x203bdc(0x52b)]&&DataManager[_0x203bdc(0x3d2)](_0x719eab))return;VisuMZ[_0x203bdc(0xf9)][_0x203bdc(0x7dc)]['call'](this,_0x719eab);},Game_Party[_0x25789e(0x866)][_0x25789e(0x282)]=function(){const _0x56ba96=_0x25789e,_0x864ce7=VisuMZ[_0x56ba96(0xf9)][_0x56ba96(0x59c)]['QoL'],_0x4db387=_0x864ce7[_0x56ba96(0x825)]??0x63;let _0x1b8901=[];(_0x864ce7[_0x56ba96(0x3c5)]??!![])&&(_0x1b8901=_0x1b8901[_0x56ba96(0x7c8)]($dataItems));(_0x864ce7[_0x56ba96(0x72b)]??!![])&&(_0x56ba96(0x4f8)===_0x56ba96(0x828)?this[_0x56ba96(0x7a6)](0x0):_0x1b8901=_0x1b8901[_0x56ba96(0x7c8)]($dataWeapons));(_0x864ce7[_0x56ba96(0x141)]??!![])&&(_0x1b8901=_0x1b8901[_0x56ba96(0x7c8)]($dataArmors));for(const _0x1ed259 of _0x1b8901){if(_0x56ba96(0x1db)!==_0x56ba96(0x68c)){if(!_0x1ed259)continue;if(_0x1ed259[_0x56ba96(0x126)]['trim']()<=0x0)continue;if(_0x1ed259[_0x56ba96(0x126)][_0x56ba96(0x8af)](/-----/i))continue;this[_0x56ba96(0x2cf)](_0x1ed259,_0x4db387);}else return _0x1ae5de?this[_0x56ba96(0x6b3)]():_0x21f842[_0x56ba96(0x311)](0x0,this[_0x56ba96(0x258)]-this['innerHeight']);}},VisuMZ[_0x25789e(0xf9)]['Game_Troop_setup']=Game_Troop[_0x25789e(0x866)][_0x25789e(0x21a)],Game_Troop[_0x25789e(0x866)][_0x25789e(0x21a)]=function(_0xc26591){const _0x30bbee=_0x25789e;$gameTemp[_0x30bbee(0x6a2)](),$gameTemp[_0x30bbee(0x1f0)](_0xc26591),VisuMZ['CoreEngine']['Game_Troop_setup'][_0x30bbee(0x800)](this,_0xc26591);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x15a)]=Game_Map['prototype'][_0x25789e(0x21a)],Game_Map[_0x25789e(0x866)][_0x25789e(0x21a)]=function(_0x789118){const _0x46a20b=_0x25789e;VisuMZ['CoreEngine'][_0x46a20b(0x15a)][_0x46a20b(0x800)](this,_0x789118),this['checkCoreEngineDisplayCenter'](),this[_0x46a20b(0x119)](_0x789118);},Game_Map[_0x25789e(0x866)][_0x25789e(0x119)]=function(){const _0xa1d86e=_0x25789e;this[_0xa1d86e(0x857)]=VisuMZ['CoreEngine'][_0xa1d86e(0x59c)][_0xa1d86e(0x25e)]['NoTileShadows']||![];const _0x364f3e=VisuMZ[_0xa1d86e(0xf9)][_0xa1d86e(0x59c)][_0xa1d86e(0x599)],_0x2289dd=$dataMap?$dataMap[_0xa1d86e(0x881)]||'':'';if(_0x2289dd['match'](/<SHOW TILE SHADOWS>/i))this[_0xa1d86e(0x857)]=![];else{if(_0x2289dd['match'](/<HIDE TILE SHADOWS>/i)){if(_0xa1d86e(0x5da)==='AmdYt'){const _0x2a6fb5=this[_0xa1d86e(0x8a2)]();!_0x2a6fb5[_0xa1d86e(0x47a)]()?_0x32e5a3['CoreEngine'][_0xa1d86e(0x7b3)][_0xa1d86e(0x800)](this):(this[_0xa1d86e(0x47a)]['x']=_0x2a6fb5[_0xa1d86e(0x47a)]()['x'],this[_0xa1d86e(0x47a)]['y']=_0x2a6fb5[_0xa1d86e(0x47a)]()['y']);}else this['_hideTileShadows']=!![];}}if(_0x2289dd['match'](/<SCROLL LOCK X>/i)){if(_0xa1d86e(0x6c6)!=='HBWpG'){const _0xa4c0ed={'targets':_0x5164fb,'animationId':_0x7d4778,'mirror':_0x42f130,'mute':_0x1c9fd6};this[_0xa1d86e(0x39c)][_0xa1d86e(0x5b2)](_0xa4c0ed);for(const _0x1509e9 of _0x209285){_0x1509e9[_0xa1d86e(0x7a5)]&&_0x1509e9[_0xa1d86e(0x7a5)]();}}else this[_0xa1d86e(0x17f)]()['centerX']=!![],this['centerCameraCheckData']()['displayX']=_0x364f3e['DisplayLockX'];}else{if(_0x2289dd[_0xa1d86e(0x8af)](/<SCROLL LOCK X: (.*?)>/i)){if(_0xa1d86e(0x4b7)===_0xa1d86e(0x4b7))this[_0xa1d86e(0x17f)]()[_0xa1d86e(0x93a)]=!![],this[_0xa1d86e(0x17f)]()[_0xa1d86e(0x9ee)]=Number(RegExp['$1']);else{const _0x4579ac=new _0x200cb3(0x0,0x0,0x1,0x1);_0x10da7e['prototype']['initialize'][_0xa1d86e(0x800)](this,_0x4579ac),this[_0xa1d86e(0x565)]=0x0,this['_text']='',this[_0xa1d86e(0x389)]=[],this[_0xa1d86e(0x228)]=0x0;}}}if(_0x2289dd[_0xa1d86e(0x8af)](/<SCROLL LOCK Y>/i)){if('AiKGe'!=='AiKGe')return _0x5e2df7[_0xa1d86e(0xf9)][_0xa1d86e(0x95c)][_0xa1d86e(0x800)](this);else this['centerCameraCheckData']()[_0xa1d86e(0x94d)]=!![],this['centerCameraCheckData']()['displayY']=_0x364f3e[_0xa1d86e(0x8ed)];}else _0x2289dd['match'](/<SCROLL LOCK Y: (.*?)>/i)&&(_0xa1d86e(0x12a)!==_0xa1d86e(0x12a)?(_0x144ec0[_0xa1d86e(0xf9)]['Game_Map_setup'][_0xa1d86e(0x800)](this,_0x5ae95f),this[_0xa1d86e(0x6db)](),this[_0xa1d86e(0x119)](_0x32bdf0)):(this[_0xa1d86e(0x17f)]()[_0xa1d86e(0x94d)]=!![],this[_0xa1d86e(0x17f)]()[_0xa1d86e(0x9ec)]=Number(RegExp['$1'])));},Game_Map[_0x25789e(0x866)][_0x25789e(0x25b)]=function(){const _0x58fd8d=_0x25789e;if(this[_0x58fd8d(0x857)]===undefined)this[_0x58fd8d(0x119)]();return this['_hideTileShadows'];},Game_Map['prototype'][_0x25789e(0x6db)]=function(){const _0x3d3692=_0x25789e,_0x122a01=VisuMZ['CoreEngine'][_0x3d3692(0x59c)]['ScreenResolution'];this[_0x3d3692(0x751)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x122a01[_0x3d3692(0x9b4)]){if(_0x3d3692(0x20b)===_0x3d3692(0x5d2))return _0xf5231b[_0x3d3692(0x676)][_0x3d3692(0x800)](this);else{const _0x1cb319=Graphics[_0x3d3692(0x59d)]/this[_0x3d3692(0x5d5)]();if(_0x1cb319%0x1!==0x0&&Math[_0x3d3692(0x169)](_0x1cb319)===this[_0x3d3692(0x59d)]()&&!this[_0x3d3692(0x91a)]()){if(_0x3d3692(0x356)==='DXAnw')this[_0x3d3692(0x751)][_0x3d3692(0x93a)]=!![],this[_0x3d3692(0x751)][_0x3d3692(0x9ee)]=_0x122a01[_0x3d3692(0x8d8)]||0x0;else return _0x57ba4d=_0xde10ea[_0x3d3692(0x6e7)](/(\d)/gi,(_0x2da66f,_0x1a33f5)=>_0x3d3692(0x610)['format'](_0x1e60b3(_0x1a33f5))),'%2%1%3'[_0x3d3692(0x3a8)](_0x47ab42,_0x2fc462,_0x2c481d);}}}if(_0x122a01[_0x3d3692(0x35e)]){const _0x10bed8=Graphics['height']/this['tileHeight']();if(_0x10bed8%0x1!==0x0&&Math[_0x3d3692(0x169)](_0x10bed8)===this['height']()&&!this['isLoopVertical']()){if(_0x3d3692(0x8c1)===_0x3d3692(0x8c1))this[_0x3d3692(0x751)][_0x3d3692(0x94d)]=!![],this[_0x3d3692(0x751)][_0x3d3692(0x9ec)]=_0x122a01[_0x3d3692(0x8ed)]||0x0;else return _0x430a50[_0x3d3692(0xf9)][_0x3d3692(0x59c)][_0x3d3692(0x2e0)][_0x3d3692(0x82c)];}}$gameScreen[_0x3d3692(0x859)]()===0x1&&(this['centerCameraCheckData']()['centerX']&&(this[_0x3d3692(0x7a9)]=this[_0x3d3692(0x17f)]()['displayX']),this[_0x3d3692(0x17f)]()['centerY']&&(this[_0x3d3692(0x895)]=this[_0x3d3692(0x17f)]()[_0x3d3692(0x9ec)]));},VisuMZ['CoreEngine']['Game_Map_setDisplayPos']=Game_Map[_0x25789e(0x866)]['setDisplayPos'],Game_Map['prototype'][_0x25789e(0x70a)]=function(_0x3246a6,_0x1c56e5){const _0x5547e1=_0x25789e;VisuMZ[_0x5547e1(0xf9)][_0x5547e1(0x6cf)][_0x5547e1(0x800)](this,_0x3246a6,_0x1c56e5);if($gameScreen[_0x5547e1(0x859)]()===0x1){if(_0x5547e1(0x270)!==_0x5547e1(0x788))!this[_0x5547e1(0x91a)]()&&this[_0x5547e1(0x17f)]()['centerX']&&(this[_0x5547e1(0x7a9)]=this[_0x5547e1(0x17f)]()['displayX']),!this[_0x5547e1(0x801)]()&&this[_0x5547e1(0x17f)]()[_0x5547e1(0x94d)]&&(this[_0x5547e1(0x895)]=this[_0x5547e1(0x17f)]()[_0x5547e1(0x9ec)]);else{if(this[_0x5547e1(0x179)]()&&this[_0x5547e1(0x232)][_0x5547e1(0x26d)]!==_0x5547e1(0x715))return _0x5c620f['getInputMultiButtonStrings'](_0x5547e1(0x678),_0x5547e1(0x1a3));return _0x34586c[_0x5547e1(0x866)][_0x5547e1(0x609)][_0x5547e1(0x800)](this);}}},Game_Map[_0x25789e(0x866)]['centerCameraCheckData']=function(){const _0x50c4fb=_0x25789e;if(this['_centerCameraCheck']===undefined)this[_0x50c4fb(0x6db)]();return this[_0x50c4fb(0x751)];},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x61a)]=Game_Map[_0x25789e(0x866)][_0x25789e(0x50e)],Game_Map[_0x25789e(0x866)]['scrollDown']=function(_0x2df30d){const _0x33573f=_0x25789e;if(this[_0x33573f(0x17f)]()[_0x33573f(0x94d)]&&$gameScreen[_0x33573f(0x859)]()===0x1){if('WTiPj'===_0x33573f(0x158)){this['_displayY']=this[_0x33573f(0x17f)]()[_0x33573f(0x9ec)];return;}else for(let _0x31ae7d=0x1;_0x31ae7d<=0x64;_0x31ae7d++){_0x109838['erasePicture'](_0x31ae7d);}}VisuMZ[_0x33573f(0xf9)]['Game_Map_scrollDown'][_0x33573f(0x800)](this,_0x2df30d);},VisuMZ[_0x25789e(0xf9)]['Game_Map_scrollLeft']=Game_Map['prototype'][_0x25789e(0x186)],Game_Map[_0x25789e(0x866)][_0x25789e(0x186)]=function(_0xdcff3){const _0x3a824f=_0x25789e;if(this[_0x3a824f(0x17f)]()[_0x3a824f(0x93a)]&&$gameScreen[_0x3a824f(0x859)]()===0x1){if('lwfjL'==='rFTNA')for(const _0x4e4f78 of _0x26ce64[_0x3a824f(0x882)]){if(_0x4e4f78['ShowJS'][_0x3a824f(0x800)](this)){const _0x5855c7=_0x4e4f78[_0x3a824f(0x8c0)];let _0x4e99c1=_0x4e4f78[_0x3a824f(0x534)];if(['','Untitled'][_0x3a824f(0x2ec)](_0x4e99c1))_0x4e99c1=_0x4e4f78[_0x3a824f(0x9c5)]['call'](this);const _0xdd73c=_0x4e4f78['EnableJS'][_0x3a824f(0x800)](this),_0x5b0f33=_0x4e4f78[_0x3a824f(0x110)][_0x3a824f(0x800)](this);this[_0x3a824f(0x964)](_0x4e99c1,_0x5855c7,_0xdd73c,_0x5b0f33),this[_0x3a824f(0x552)](_0x5855c7,_0x4e4f78[_0x3a824f(0x79d)][_0x3a824f(0x53d)](this,_0x5b0f33));}}else{this[_0x3a824f(0x7a9)]=this[_0x3a824f(0x17f)]()['displayX'];return;}}VisuMZ[_0x3a824f(0xf9)][_0x3a824f(0x926)][_0x3a824f(0x800)](this,_0xdcff3);},VisuMZ[_0x25789e(0xf9)]['Game_Map_scrollRight']=Game_Map[_0x25789e(0x866)][_0x25789e(0x657)],Game_Map[_0x25789e(0x866)][_0x25789e(0x657)]=function(_0x3e7cae){const _0x39932d=_0x25789e;if(this[_0x39932d(0x17f)]()[_0x39932d(0x93a)]&&$gameScreen['zoomScale']()===0x1){this['_displayX']=this[_0x39932d(0x17f)]()[_0x39932d(0x9ee)];return;}VisuMZ['CoreEngine'][_0x39932d(0xa00)][_0x39932d(0x800)](this,_0x3e7cae);},VisuMZ[_0x25789e(0xf9)]['Game_Map_scrollUp']=Game_Map[_0x25789e(0x866)][_0x25789e(0x9ea)],Game_Map['prototype'][_0x25789e(0x9ea)]=function(_0x511478){const _0xde90f3=_0x25789e;if(this['centerCameraCheckData']()[_0xde90f3(0x94d)]&&$gameScreen['zoomScale']()===0x1){if(_0xde90f3(0x89c)!=='vKxOo')return this[_0xde90f3(0x5f4)]&&this[_0xde90f3(0x5f4)][_0xde90f3(0x49f)]===_0x26524e;else{this[_0xde90f3(0x895)]=this[_0xde90f3(0x17f)]()[_0xde90f3(0x9ec)];return;}}VisuMZ[_0xde90f3(0xf9)][_0xde90f3(0x173)]['call'](this,_0x511478);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x702)]=Game_Character[_0x25789e(0x866)][_0x25789e(0x5a2)],Game_Character[_0x25789e(0x866)][_0x25789e(0x5a2)]=function(_0x5a986c){const _0x1893e3=_0x25789e;try{_0x1893e3(0x9d3)===_0x1893e3(0x239)?this[_0x1893e3(0x15c)][_0x1893e3(0x615)](_0x3f842f['layoutSettings'][_0x1893e3(0x635)]):VisuMZ['CoreEngine'][_0x1893e3(0x702)][_0x1893e3(0x800)](this,_0x5a986c);}catch(_0x578f58){if(_0x1893e3(0x6b4)!=='ePcjA'){if($gameTemp['isPlaytest']())console[_0x1893e3(0x927)](_0x578f58);}else return![];}},Game_Player[_0x25789e(0x866)]['makeEncounterCount']=function(){const _0x2a505f=_0x25789e,_0x48449b=$gameMap[_0x2a505f(0x779)]();this[_0x2a505f(0x897)]=Math[_0x2a505f(0x915)](_0x48449b)+Math[_0x2a505f(0x915)](_0x48449b)+this[_0x2a505f(0x51e)]();},Game_Player[_0x25789e(0x866)]['encounterStepsMinimum']=function(){const _0x39f952=_0x25789e;if($dataMap&&$dataMap[_0x39f952(0x881)]&&$dataMap['note']['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)){if('UwpAy'!==_0x39f952(0x5ba))this[_0x39f952(0x461)]();else return Number(RegExp['$1']);}else return _0x39f952(0x41c)===_0x39f952(0x41c)?VisuMZ['CoreEngine'][_0x39f952(0x59c)]['QoL'][_0x39f952(0x73f)]:this[_0x39f952(0x2b6)](_0x3ff0f2(_0x49cb78));},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x44d)]=Game_Event[_0x25789e(0x866)]['isCollidedWithEvents'],Game_Event['prototype']['isCollidedWithEvents']=function(_0x3c7891,_0x24af67){const _0x3f1775=_0x25789e;if(this[_0x3f1775(0x9e7)]()){if('yMEIm'!==_0x3f1775(0x6d7))for(const _0xcfe296 of _0x5be29e[_0x3f1775(0x78d)]){[0x6c,0x198]['includes'](_0xcfe296[_0x3f1775(0x98f)])&&(_0x49f83b+='\x0a',_0x4e867c+=_0xcfe296[_0x3f1775(0x1f3)][0x0]);}else return this['checkSmartEventCollision'](_0x3c7891,_0x24af67);}else return VisuMZ['CoreEngine'][_0x3f1775(0x44d)]['call'](this,_0x3c7891,_0x24af67);},Game_Event['prototype']['isSmartEventCollisionOn']=function(){const _0x5677a9=_0x25789e;return VisuMZ[_0x5677a9(0xf9)][_0x5677a9(0x59c)][_0x5677a9(0x25e)][_0x5677a9(0x79a)];},Game_Event['prototype'][_0x25789e(0x808)]=function(_0x360f6d,_0x5c1394){const _0x17dea7=_0x25789e;if(!this['isNormalPriority']())return![];else{const _0x1f381a=$gameMap[_0x17dea7(0x7d3)](_0x360f6d,_0x5c1394)[_0x17dea7(0x3f6)](_0x53f9fd=>_0x53f9fd[_0x17dea7(0x3a4)]());return _0x1f381a['length']>0x0;}},VisuMZ['CoreEngine'][_0x25789e(0x561)]=Game_Interpreter[_0x25789e(0x866)]['command105'],Game_Interpreter[_0x25789e(0x866)]['command105']=function(_0xbefae6){const _0x1d87fc=_0x25789e,_0x43e9fb=this[_0x1d87fc(0x6b7)]();return _0x43e9fb[_0x1d87fc(0x8af)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x1d87fc(0x1f4)](_0x43e9fb):VisuMZ['CoreEngine'][_0x1d87fc(0x561)]['call'](this,_0xbefae6);},Game_Interpreter[_0x25789e(0x866)][_0x25789e(0x6b7)]=function(){const _0x4cc11d=_0x25789e;let _0x42d8aa='',_0x968b33=this[_0x4cc11d(0x269)]+0x1;while(this[_0x4cc11d(0x77e)][_0x968b33]&&this['_list'][_0x968b33]['code']===0x195){'IdFtR'==='YCJXI'?(_0x5cf268=_0x274ed5[_0x4cc11d(0x5cd)](_0xa57bac),_0x3e1210['se']&&(_0x237aa6['se'][_0x4cc11d(0x745)]=0x0)):(_0x42d8aa+=this[_0x4cc11d(0x77e)][_0x968b33][_0x4cc11d(0x1f3)][0x0]+'\x0a',_0x968b33++);}return _0x42d8aa;},Game_Interpreter[_0x25789e(0x866)][_0x25789e(0x1f4)]=function(_0x5ab06a){const _0x43af84=_0x25789e;try{_0x43af84(0x929)!==_0x43af84(0x24c)?eval(_0x5ab06a):_0x41c425(_0x576031);}catch(_0x420aed){if('EyPAf'!==_0x43af84(0x1a5))return this['areButtonsHidden']()||this[_0x43af84(0x47c)]();else{if($gameTemp[_0x43af84(0x254)]()){if(_0x43af84(0x3d4)===_0x43af84(0x3dc)){if(_0x223d40&&_0x1074ee['bitmap'])_0x521063[_0x43af84(0x6d6)][_0x43af84(0x85c)]();}else console[_0x43af84(0x927)](_0x43af84(0x20f)),console[_0x43af84(0x927)](_0x420aed);}}}return!![];},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x643)]=Game_Interpreter[_0x25789e(0x866)]['command111'],Game_Interpreter['prototype'][_0x25789e(0x4da)]=function(_0x548ffc){const _0x1c7e28=_0x25789e;try{VisuMZ[_0x1c7e28(0xf9)][_0x1c7e28(0x643)][_0x1c7e28(0x800)](this,_0x548ffc);}catch(_0x1f2a41){if(_0x1c7e28(0x4bf)===_0x1c7e28(0x5f0))return _0x4d576b['CoreEngine']['Settings'][_0x1c7e28(0x25e)]['DigitGroupingGaugeSprites'];else $gameTemp[_0x1c7e28(0x254)]()&&(console[_0x1c7e28(0x927)](_0x1c7e28(0x7fe)),console[_0x1c7e28(0x927)](_0x1f2a41)),this[_0x1c7e28(0x3ee)]();}return!![];},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x3cf)]=Game_Interpreter[_0x25789e(0x866)][_0x25789e(0x8da)],Game_Interpreter['prototype']['command122']=function(_0x31e391){const _0x38e952=_0x25789e;try{_0x38e952(0x799)===_0x38e952(0x668)?this[_0x38e952(0x8b3)]()&&this[_0x38e952(0x8b3)]()[_0x38e952(0x6fd)]()?_0x203788['CoreEngine'][_0x38e952(0x112)][_0x38e952(0x800)](this):this['clear']():VisuMZ['CoreEngine'][_0x38e952(0x3cf)][_0x38e952(0x800)](this,_0x31e391);}catch(_0x188fd7){if(_0x38e952(0x990)===_0x38e952(0x73b)){if(_0x2db62d)throw _0x402562;else _0x563309&&_0x1663a1(_0x38e952(0x313)['format'](_0xe7d1c2));}else $gameTemp[_0x38e952(0x254)]()&&(_0x38e952(0x90c)==='LOylj'?_0x583019['areButtonsHidden']()||this[_0x38e952(0x7aa)]?this[_0x38e952(0x515)]():_0x493f86['CoreEngine'][_0x38e952(0x2eb)][_0x38e952(0x800)](this):(console[_0x38e952(0x927)](_0x38e952(0x5cb)),console['log'](_0x188fd7)));}return!![];},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x958)]=Game_Interpreter['prototype'][_0x25789e(0x9ad)],Game_Interpreter[_0x25789e(0x866)][_0x25789e(0x9ad)]=function(){const _0x11b556=_0x25789e;try{VisuMZ[_0x11b556(0xf9)][_0x11b556(0x958)][_0x11b556(0x800)](this);}catch(_0x49a643){$gameTemp[_0x11b556(0x254)]()&&(console[_0x11b556(0x927)](_0x11b556(0x677)),console[_0x11b556(0x927)](_0x49a643));}return!![];},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x1cb)]=Game_Interpreter[_0x25789e(0x866)][_0x25789e(0x92f)],Game_Interpreter[_0x25789e(0x866)][_0x25789e(0x92f)]=function(_0x33e978){const _0x30f6d3=_0x25789e;return $gameTemp[_0x30f6d3(0x3bb)](this),VisuMZ['CoreEngine'][_0x30f6d3(0x1cb)][_0x30f6d3(0x800)](this,_0x33e978);},Scene_Base['prototype'][_0x25789e(0x8b0)]=function(){const _0x229770=_0x25789e;return VisuMZ['CoreEngine'][_0x229770(0x59c)]['UI'][_0x229770(0x7a8)];},Scene_Base['prototype']['isBottomHelpMode']=function(){const _0x219511=_0x25789e;return VisuMZ['CoreEngine']['Settings']['UI'][_0x219511(0x58c)];},Scene_Base[_0x25789e(0x866)]['isBottomButtonMode']=function(){const _0x695432=_0x25789e;return VisuMZ[_0x695432(0xf9)][_0x695432(0x59c)]['UI'][_0x695432(0x156)];},Scene_Base[_0x25789e(0x866)][_0x25789e(0x220)]=function(){const _0x562838=_0x25789e;return VisuMZ[_0x562838(0xf9)][_0x562838(0x59c)]['UI'][_0x562838(0x925)];},Scene_Base[_0x25789e(0x866)][_0x25789e(0x533)]=function(){const _0x422247=_0x25789e;return VisuMZ[_0x422247(0xf9)][_0x422247(0x59c)]['UI'][_0x422247(0x8de)];},Scene_Base[_0x25789e(0x866)][_0x25789e(0x6cc)]=function(){const _0x2e6bf6=_0x25789e;return VisuMZ[_0x2e6bf6(0xf9)]['Settings']['UI']['ButtonHeight'];},Scene_Base[_0x25789e(0x866)][_0x25789e(0x27b)]=function(){const _0x1c85f8=_0x25789e;return VisuMZ[_0x1c85f8(0xf9)]['Settings'][_0x1c85f8(0x36b)][_0x1c85f8(0x4d3)];},VisuMZ['CoreEngine'][_0x25789e(0x7c0)]=Scene_Base['prototype'][_0x25789e(0x95d)],Scene_Base[_0x25789e(0x866)][_0x25789e(0x95d)]=function(){const _0x47a036=_0x25789e;VisuMZ[_0x47a036(0xf9)][_0x47a036(0x7c0)][_0x47a036(0x800)](this),this[_0x47a036(0x873)](),this[_0x47a036(0x96a)](),this[_0x47a036(0x18e)]['x']=Math[_0x47a036(0x997)](this['_windowLayer']['x']),this[_0x47a036(0x18e)]['y']=Math['round'](this[_0x47a036(0x18e)]['y']);},Scene_Base[_0x25789e(0x866)][_0x25789e(0x873)]=function(){},Scene_Base[_0x25789e(0x866)]['createTextPopupWindow']=function(){const _0x310836=_0x25789e;this[_0x310836(0x333)]=new Window_TextPopup(),this['addChild'](this[_0x310836(0x333)]);},$textPopup=function(_0x2838dc){const _0x2376a5=_0x25789e,_0x4aa86c=SceneManager[_0x2376a5(0x5f4)][_0x2376a5(0x333)];_0x4aa86c[_0x2376a5(0x986)](_0x2838dc);},Scene_Base[_0x25789e(0x866)][_0x25789e(0x609)]=function(){const _0x1a937c=_0x25789e;return TextManager['getInputMultiButtonStrings'](_0x1a937c(0x678),_0x1a937c(0x1a3));},Scene_Base[_0x25789e(0x866)]['buttonAssistKey2']=function(){const _0x3628d7=_0x25789e;return TextManager[_0x3628d7(0x9a)](_0x3628d7(0x8f6));},Scene_Base[_0x25789e(0x866)]['buttonAssistKey3']=function(){const _0x174cf8=_0x25789e;return TextManager[_0x174cf8(0x9a)](_0x174cf8(0x456));},Scene_Base[_0x25789e(0x866)][_0x25789e(0x655)]=function(){const _0x50d9f5=_0x25789e;return TextManager[_0x50d9f5(0x9a)]('ok');},Scene_Base['prototype'][_0x25789e(0x64c)]=function(){return TextManager['getInputButtonString']('cancel');},Scene_Base[_0x25789e(0x866)][_0x25789e(0x30b)]=function(){const _0x407bf1=_0x25789e;if(this[_0x407bf1(0x27d)]&&this['_pageupButton']['visible']){if(_0x407bf1(0x896)!==_0x407bf1(0x2d6))return TextManager[_0x407bf1(0x3dd)];else{const _0x1648f8=_0x407bf1(0x154);this['_colorCache']=this[_0x407bf1(0x7c5)]||{};if(this['_colorCache'][_0x1648f8])return this[_0x407bf1(0x7c5)][_0x1648f8];const _0x3337c5=_0x197e00[_0x407bf1(0xf9)]['Settings'][_0x407bf1(0x9db)][_0x407bf1(0x97a)];return this[_0x407bf1(0x607)](_0x1648f8,_0x3337c5);}}else{if(_0x407bf1(0x143)==='EEJTD')this['_screenY']+=_0x4ca870[_0x407bf1(0x997)]((_0x55485f['height']-0x270)/0x2),this[_0x407bf1(0x3f9)]-=_0x2a1cc0[_0x407bf1(0x36f)]((_0x192b90[_0x407bf1(0x844)]-_0x2cc218[_0x407bf1(0x81e)])/0x2),_0x1ba166[_0x407bf1(0x2af)]()?this[_0x407bf1(0x2e8)]-=_0x44ce53[_0x407bf1(0x36f)]((_0x4a49b5[_0x407bf1(0x59d)]-_0x43ba16[_0x407bf1(0x381)])/0x2):this['_screenX']+=_0x3b4c67['round']((_0x4a1567[_0x407bf1(0x381)]-0x330)/0x2);else return'';}},Scene_Base[_0x25789e(0x866)][_0x25789e(0x512)]=function(){return'';},Scene_Base[_0x25789e(0x866)][_0x25789e(0x2d4)]=function(){return'';},Scene_Base[_0x25789e(0x866)][_0x25789e(0x47f)]=function(){const _0x231685=_0x25789e;return TextManager[_0x231685(0x8d1)];},Scene_Base[_0x25789e(0x866)][_0x25789e(0x51d)]=function(){return TextManager['buttonAssistCancel'];},Scene_Base[_0x25789e(0x866)][_0x25789e(0x948)]=function(){return 0x0;},Scene_Base[_0x25789e(0x866)][_0x25789e(0x78a)]=function(){return 0x0;},Scene_Base['prototype']['buttonAssistOffset3']=function(){return 0x0;},Scene_Base[_0x25789e(0x866)][_0x25789e(0x222)]=function(){return 0x0;},Scene_Base[_0x25789e(0x866)][_0x25789e(0x5be)]=function(){return 0x0;},VisuMZ['CoreEngine'][_0x25789e(0x78f)]=Scene_Boot['prototype'][_0x25789e(0x5bd)],Scene_Boot[_0x25789e(0x866)][_0x25789e(0x5bd)]=function(){const _0x1395a6=_0x25789e;VisuMZ[_0x1395a6(0xf9)]['Scene_Boot_loadSystemImages'][_0x1395a6(0x800)](this),this['loadGameImagesCoreEngine']();},Scene_Boot[_0x25789e(0x866)][_0x25789e(0x28d)]=function(){const _0x2ac2e3=_0x25789e,_0x12250d=[_0x2ac2e3(0x2ad),_0x2ac2e3(0x339),_0x2ac2e3(0x562),_0x2ac2e3(0x9a3),_0x2ac2e3(0x48f),_0x2ac2e3(0x3c1),'parallaxes',_0x2ac2e3(0x571),_0x2ac2e3(0x72a),'sv_enemies',_0x2ac2e3(0xae),_0x2ac2e3(0x645),_0x2ac2e3(0x642),_0x2ac2e3(0x6f3)];for(const _0x15d5ea of _0x12250d){const _0x5b2d60=VisuMZ[_0x2ac2e3(0xf9)][_0x2ac2e3(0x59c)][_0x2ac2e3(0x198)][_0x15d5ea],_0x13ba95=_0x2ac2e3(0x49d)[_0x2ac2e3(0x3a8)](_0x15d5ea);for(const _0x56f007 of _0x5b2d60){ImageManager['loadBitmap'](_0x13ba95,_0x56f007);}}},VisuMZ[_0x25789e(0xf9)]['Scene_Boot_startNormalGame']=Scene_Boot[_0x25789e(0x866)][_0x25789e(0x5df)],Scene_Boot[_0x25789e(0x866)][_0x25789e(0x5df)]=function(){const _0x4a1765=_0x25789e;Utils[_0x4a1765(0x821)](_0x4a1765(0x884))&&VisuMZ['CoreEngine'][_0x4a1765(0x59c)][_0x4a1765(0x25e)][_0x4a1765(0x5cc)]?_0x4a1765(0x8c9)!=='gnkln'?this['startAutoNewGame']():(_0x5ad2d0[_0x4a1765(0xf9)][_0x4a1765(0x26b)][_0x4a1765(0x800)](this,_0x1e26af),_0x46b774=this[_0x4a1765(0x861)],_0x4b85f6=this['_targets'],_0x5d6c99=this[_0x4a1765(0x130)]||this[_0x4a1765(0x5d8)][0x0]):VisuMZ['CoreEngine'][_0x4a1765(0x877)][_0x4a1765(0x800)](this);},Scene_Boot[_0x25789e(0x866)]['startAutoNewGame']=function(){const _0x4d01d4=_0x25789e;this['checkPlayerLocation'](),DataManager[_0x4d01d4(0x710)](),SceneManager[_0x4d01d4(0x390)](Scene_Map);},Scene_Boot[_0x25789e(0x866)][_0x25789e(0xa2)]=function(){const _0x5bf7a2=_0x25789e,_0x2c0e62=$dataSystem[_0x5bf7a2(0xe8)][_0x5bf7a2(0x903)],_0x3536c8=$dataSystem[_0x5bf7a2(0xe8)][_0x5bf7a2(0x2a1)],_0x568d83=VisuMZ[_0x5bf7a2(0xf9)][_0x5bf7a2(0x59c)]['UI']['BoxMargin'];Graphics['boxWidth']=_0x2c0e62-_0x568d83*0x2,Graphics[_0x5bf7a2(0x81e)]=_0x3536c8-_0x568d83*0x2,this[_0x5bf7a2(0x4ad)]();},VisuMZ[_0x25789e(0xf9)]['Scene_Boot_updateDocumentTitle']=Scene_Boot['prototype'][_0x25789e(0x5db)],Scene_Boot[_0x25789e(0x866)][_0x25789e(0x5db)]=function(){const _0x558f02=_0x25789e;if(this[_0x558f02(0x8c8)]()){if('BcBoy'!==_0x558f02(0x14b))this['makeDocumentTitle']();else{_0x7292be[_0x558f02(0x747)](_0x992102,_0x43cf0b);const _0x3c86da=_0xd7f638[_0x558f02(0x153)]||0x1;_0x24c05e[_0x558f02(0x789)](_0x3c86da);}}else _0x558f02(0x6ea)===_0x558f02(0x6ea)?VisuMZ['CoreEngine'][_0x558f02(0x14a)][_0x558f02(0x800)](this):_0x209f97[_0x558f02(0x585)]&&(this['_forcedBattleSys']=_0x558f02(0x5fe));},Scene_Boot[_0x25789e(0x866)][_0x25789e(0x8c8)]=function(){const _0x9c1bfb=_0x25789e;if(Scene_Title[_0x9c1bfb(0x102)]==='')return![];if(Scene_Title[_0x9c1bfb(0x102)]===_0x9c1bfb(0x1d5))return![];if(Scene_Title[_0x9c1bfb(0x6c4)]==='')return![];if(Scene_Title['version']===_0x9c1bfb(0x951))return![];return!![];},Scene_Boot['prototype'][_0x25789e(0x38c)]=function(){const _0x4d685e=_0x25789e,_0x231f9e=$dataSystem[_0x4d685e(0x5e3)],_0x4325f6=Scene_Title[_0x4d685e(0x102)]||'',_0x2d5dbd=Scene_Title[_0x4d685e(0x6c4)]||'',_0x3a6d42=VisuMZ[_0x4d685e(0xf9)][_0x4d685e(0x59c)][_0x4d685e(0x539)][_0x4d685e(0x497)][_0x4d685e(0x79c)],_0x131ce8=_0x3a6d42[_0x4d685e(0x3a8)](_0x231f9e,_0x4325f6,_0x2d5dbd);document['title']=_0x131ce8;},Scene_Boot[_0x25789e(0x866)][_0x25789e(0x4ad)]=function(){const _0x4f4d3b=_0x25789e;if(VisuMZ[_0x4f4d3b(0xf9)][_0x4f4d3b(0x59c)]['UI'][_0x4f4d3b(0x18d)]){if('pwRof'!==_0x4f4d3b(0x774))this[_0x4f4d3b(0x1ae)]=[];else{const _0x24c0a8=Graphics[_0x4f4d3b(0x59d)]-Graphics['boxWidth']-VisuMZ[_0x4f4d3b(0xf9)]['Settings']['UI'][_0x4f4d3b(0x6dc)]*0x2,_0x27ab3e=Sprite_Button[_0x4f4d3b(0x866)][_0x4f4d3b(0x1ac)]['call'](this)*0x4;if(_0x24c0a8>=_0x27ab3e)SceneManager[_0x4f4d3b(0x1a8)](!![]);}}},Scene_Title[_0x25789e(0x102)]=VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)][_0x25789e(0x539)][_0x25789e(0x497)][_0x25789e(0x1d5)],Scene_Title[_0x25789e(0x6c4)]=VisuMZ['CoreEngine'][_0x25789e(0x59c)][_0x25789e(0x539)]['Title'][_0x25789e(0x764)],Scene_Title[_0x25789e(0x366)]=VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)][_0x25789e(0x371)],VisuMZ[_0x25789e(0xf9)]['Scene_Title_drawGameTitle']=Scene_Title[_0x25789e(0x866)][_0x25789e(0x56c)],Scene_Title['prototype'][_0x25789e(0x56c)]=function(){const _0x8d2fb7=_0x25789e;VisuMZ[_0x8d2fb7(0xf9)][_0x8d2fb7(0x59c)][_0x8d2fb7(0x539)]['Title'][_0x8d2fb7(0x56c)]['call'](this);if(Scene_Title['subtitle']!==''&&Scene_Title['subtitle']!=='Subtitle')this[_0x8d2fb7(0x137)]();if(Scene_Title[_0x8d2fb7(0x6c4)]!==''&&Scene_Title[_0x8d2fb7(0x6c4)]!=='0.00')this[_0x8d2fb7(0x215)]();},Scene_Title['prototype']['drawGameSubtitle']=function(){const _0x222d93=_0x25789e;VisuMZ[_0x222d93(0xf9)][_0x222d93(0x59c)][_0x222d93(0x539)][_0x222d93(0x497)][_0x222d93(0x137)]['call'](this);},Scene_Title[_0x25789e(0x866)]['drawGameVersion']=function(){const _0xd37703=_0x25789e;VisuMZ[_0xd37703(0xf9)][_0xd37703(0x59c)]['MenuLayout'][_0xd37703(0x497)][_0xd37703(0x215)]['call'](this);},Scene_Title[_0x25789e(0x866)][_0x25789e(0x8bc)]=function(){const _0x2a72ef=_0x25789e;this[_0x2a72ef(0x67f)]();const _0x54dadc=$dataSystem[_0x2a72ef(0x3fa)][_0x2a72ef(0x183)],_0x4fe850=this[_0x2a72ef(0x81f)]();this['_commandWindow']=new Window_TitleCommand(_0x4fe850),this[_0x2a72ef(0x9fb)]['setBackgroundType'](_0x54dadc);const _0x4408ce=this[_0x2a72ef(0x81f)]();this['_commandWindow'][_0x2a72ef(0x4a1)](_0x4408ce['x'],_0x4408ce['y'],_0x4408ce[_0x2a72ef(0x59d)],_0x4408ce['height']),this[_0x2a72ef(0x9fb)][_0x2a72ef(0x3fc)](),this[_0x2a72ef(0x9fb)][_0x2a72ef(0x6b5)](),this[_0x2a72ef(0x9fb)]['selectLast'](),this[_0x2a72ef(0x133)](this['_commandWindow']);},Scene_Title[_0x25789e(0x866)][_0x25789e(0x52f)]=function(){const _0x53d0d1=_0x25789e;return this['_commandWindow']?this[_0x53d0d1(0x9fb)]['maxItems']():VisuMZ[_0x53d0d1(0xf9)]['Settings']['TitleCommandList']['length'];},Scene_Title[_0x25789e(0x866)][_0x25789e(0x81f)]=function(){const _0x53979d=_0x25789e;return VisuMZ[_0x53979d(0xf9)][_0x53979d(0x59c)][_0x53979d(0x539)]['Title'][_0x53979d(0x105)][_0x53979d(0x800)](this);},Scene_Title[_0x25789e(0x866)][_0x25789e(0x67f)]=function(){const _0x5e2b6d=_0x25789e;for(const _0x437b95 of Scene_Title['pictureButtons']){if(_0x5e2b6d(0x223)!==_0x5e2b6d(0x223))_0x1afae8[_0x5e2b6d(0x51a)]=_0x35f2bd[_0x5e2b6d(0x6eb)]['NEAREST'];else{const _0x536975=new Sprite_TitlePictureButton(_0x437b95);this[_0x5e2b6d(0x99d)](_0x536975);}}},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x4b6)]=Scene_Map['prototype'][_0x25789e(0x928)],Scene_Map[_0x25789e(0x866)]['initialize']=function(){const _0x33b8cd=_0x25789e;VisuMZ[_0x33b8cd(0xf9)][_0x33b8cd(0x4b6)][_0x33b8cd(0x800)](this),$gameTemp[_0x33b8cd(0x6a2)](),this[_0x33b8cd(0x7fb)]();},VisuMZ[_0x25789e(0xf9)]['Scene_Map_updateMainMultiply']=Scene_Map[_0x25789e(0x866)][_0x25789e(0x54f)],Scene_Map[_0x25789e(0x866)][_0x25789e(0x54f)]=function(){const _0x4bd66d=_0x25789e;VisuMZ['CoreEngine'][_0x4bd66d(0x9ae)][_0x4bd66d(0x800)](this),$gameTemp['_playTestFastMode']&&!$gameMessage[_0x4bd66d(0x5ee)]()&&(this['updateMain'](),SceneManager[_0x4bd66d(0x459)]());},Scene_Map[_0x25789e(0x866)][_0x25789e(0x5b5)]=function(){const _0xe94ef0=_0x25789e;Scene_Message[_0xe94ef0(0x866)]['terminate'][_0xe94ef0(0x800)](this),!SceneManager['isNextScene'](Scene_Battle)&&('vvCVD'!=='vvCVD'?_0x3d17cb[_0xe94ef0(0x50c)]?this[_0xe94ef0(0x921)]=_0x2023ef[_0xe94ef0(0x50c)]():this[_0xe94ef0(0x921)]=_0x5afee6[_0xe94ef0(0xf9)][_0xe94ef0(0x59c)][_0xe94ef0(0x36b)]['BackOpacity']:(this[_0xe94ef0(0x63e)]['update'](),this[_0xe94ef0(0x33c)][_0xe94ef0(0x4fd)](),this['_windowLayer'][_0xe94ef0(0x106)]=![],SceneManager[_0xe94ef0(0x71a)]())),$gameScreen[_0xe94ef0(0x58f)](),this[_0xe94ef0(0x7fb)]();},VisuMZ['CoreEngine'][_0x25789e(0x286)]=Scene_Map[_0x25789e(0x866)][_0x25789e(0x263)],Scene_Map[_0x25789e(0x866)][_0x25789e(0x263)]=function(){const _0x17082b=_0x25789e;VisuMZ[_0x17082b(0xf9)][_0x17082b(0x286)]['call'](this);if(SceneManager[_0x17082b(0x47c)]()){if(_0x17082b(0x6aa)===_0x17082b(0xaa)){if(_0x515289===0x8)return![];return _0x113703[_0x17082b(0xf9)][_0x17082b(0x4e8)]['call'](this,_0x5ba3cd);}else this['moveMenuButtonSideButtonLayout']();}},Scene_Map[_0x25789e(0x866)][_0x25789e(0x5ac)]=function(){const _0x22b380=_0x25789e;this[_0x22b380(0x121)]['x']=Graphics['boxWidth']+0x4;},VisuMZ['CoreEngine']['Scene_Map_updateScene']=Scene_Map['prototype'][_0x25789e(0x428)],Scene_Map[_0x25789e(0x866)]['updateScene']=function(){const _0x147c3c=_0x25789e;VisuMZ[_0x147c3c(0xf9)][_0x147c3c(0x682)][_0x147c3c(0x800)](this),this['updateDashToggle']();},Scene_Map[_0x25789e(0x866)][_0x25789e(0x432)]=function(){const _0x424526=_0x25789e;Input['isTriggered']('dashToggle')&&(ConfigManager[_0x424526(0x5d0)]=!ConfigManager['alwaysDash'],ConfigManager[_0x424526(0x815)]());},VisuMZ['CoreEngine'][_0x25789e(0x437)]=Scene_Map[_0x25789e(0x866)][_0x25789e(0x812)],Scene_Map[_0x25789e(0x866)][_0x25789e(0x812)]=function(){const _0x515b13=_0x25789e;VisuMZ[_0x515b13(0xf9)][_0x515b13(0x437)][_0x515b13(0x800)](this),this['updateOnceParallelInterpreters']();},Scene_Map[_0x25789e(0x866)][_0x25789e(0x7fb)]=function(){const _0x31afe5=_0x25789e;this[_0x31afe5(0x1ae)]=[];},Scene_Map[_0x25789e(0x866)][_0x25789e(0x51b)]=function(){const _0x4604e1=_0x25789e;if(!this[_0x4604e1(0x1ae)])return;for(const _0x535847 of this['_onceParallelInterpreters']){_0x535847&&_0x535847[_0x4604e1(0x91c)]();}},Scene_Map[_0x25789e(0x866)][_0x25789e(0xa02)]=function(_0x23ab89,_0x432bf8){const _0x21f785=_0x25789e,_0x4b5946=$dataCommonEvents[_0x23ab89];if(!_0x4b5946)return;const _0x14110a=new Game_OnceParallelInterpreter();this[_0x21f785(0x30c)](_0x14110a),_0x14110a[_0x21f785(0x3f7)](_0x23ab89),_0x14110a[_0x21f785(0x157)](_0x432bf8);},Scene_Map['prototype'][_0x25789e(0x30c)]=function(_0x36ef72){const _0x24743e=_0x25789e;this['_onceParallelInterpreters']=this[_0x24743e(0x1ae)]||[],this[_0x24743e(0x1ae)][_0x24743e(0x5b2)](_0x36ef72);},Scene_Map[_0x25789e(0x866)][_0x25789e(0x4e2)]=function(_0x52a8c0){const _0x4ed513=_0x25789e;this[_0x4ed513(0x1ae)]=this[_0x4ed513(0x1ae)]||[],this['_onceParallelInterpreters']['remove'](_0x52a8c0);};function Game_OnceParallelInterpreter(){const _0x49633b=_0x25789e;this[_0x49633b(0x928)](...arguments);}Game_OnceParallelInterpreter[_0x25789e(0x866)]=Object[_0x25789e(0x468)](Game_Interpreter[_0x25789e(0x866)]),Game_OnceParallelInterpreter['prototype'][_0x25789e(0x49f)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter['prototype'][_0x25789e(0x3f7)]=function(_0x495428){const _0x11b35d=_0x25789e,_0x527f0e=$dataCommonEvents[_0x495428];if(_0x527f0e)this['setup'](_0x527f0e[_0x11b35d(0x78d)],0x0);else{if(_0x11b35d(0x2c3)===_0x11b35d(0x2c3))this[_0x11b35d(0x5b5)]();else{if(!this[_0x11b35d(0x641)]())return;const _0x287d80=this[_0x11b35d(0x629)]();this[_0x11b35d(0x152)]=new _0x1a909e(_0x287d80),this[_0x11b35d(0x133)](this[_0x11b35d(0x152)]);}}},Game_OnceParallelInterpreter[_0x25789e(0x866)]['setEvent']=function(_0x362c31){this['_eventId']=_0x362c31||0x0;},Game_OnceParallelInterpreter[_0x25789e(0x866)][_0x25789e(0x5b5)]=function(){const _0x2c06d9=_0x25789e;if(!SceneManager[_0x2c06d9(0x707)]())return;SceneManager[_0x2c06d9(0x5f4)][_0x2c06d9(0x4e2)](this),Game_Interpreter[_0x2c06d9(0x866)][_0x2c06d9(0x5b5)][_0x2c06d9(0x800)](this);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x33a)]=Scene_MenuBase[_0x25789e(0x866)][_0x25789e(0x155)],Scene_MenuBase[_0x25789e(0x866)][_0x25789e(0x155)]=function(){const _0xd32cec=_0x25789e;let _0x380b7c=0x0;return SceneManager[_0xd32cec(0x1ff)]()?_0x380b7c=this[_0xd32cec(0x49a)]():_0xd32cec(0x681)==='qdVSk'?_0x380b7c=VisuMZ[_0xd32cec(0xf9)][_0xd32cec(0x33a)][_0xd32cec(0x800)](this):this['_hideTileShadows']=![],_0x380b7c;},Scene_MenuBase[_0x25789e(0x866)][_0x25789e(0x49a)]=function(){const _0x4d4655=_0x25789e;return this[_0x4d4655(0x6fe)]()?this[_0x4d4655(0x324)]():0x0;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x7c9)]=Scene_MenuBase['prototype'][_0x25789e(0x13b)],Scene_MenuBase[_0x25789e(0x866)][_0x25789e(0x13b)]=function(){const _0x25dde2=_0x25789e;return SceneManager[_0x25dde2(0x1ff)]()?_0x25dde2(0x7b5)!==_0x25dde2(0x7b5)?_0x5923c4[_0x25dde2(0xe4)][_0x25dde2(0x47e)]['call'](this):this[_0x25dde2(0x576)]():VisuMZ[_0x25dde2(0xf9)][_0x25dde2(0x7c9)]['call'](this);},Scene_MenuBase[_0x25789e(0x866)][_0x25789e(0x576)]=function(){const _0x40df38=_0x25789e;if(!this[_0x40df38(0x6fe)]())return'lOIcs'===_0x40df38(0x602)?this[_0x40df38(0xbb)]():!![];else{if(this[_0x40df38(0x641)]()&&this[_0x40df38(0x2f3)]()===_0x40df38(0x8be)){if(_0x40df38(0x425)===_0x40df38(0x425))return Window_ButtonAssist[_0x40df38(0x866)]['lineHeight']();else{try{_0x3f2f65['CoreEngine'][_0x40df38(0x643)]['call'](this,_0x27525a);}catch(_0xfdd826){_0x3ef31f['isPlaytest']()&&(_0x551558[_0x40df38(0x927)](_0x40df38(0x7fe)),_0x1f6222[_0x40df38(0x927)](_0xfdd826)),this[_0x40df38(0x3ee)]();}return!![];}}else return'rwDCf'!==_0x40df38(0x6e5)?!![]:0x0;}},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x4b4)]=Scene_MenuBase['prototype']['mainAreaHeight'],Scene_MenuBase[_0x25789e(0x866)][_0x25789e(0x240)]=function(){const _0x18e2a2=_0x25789e;let _0x100085=0x0;SceneManager['areButtonsOutsideMainUI']()?_0x100085=this[_0x18e2a2(0x227)]():_0x100085=VisuMZ['CoreEngine'][_0x18e2a2(0x4b4)][_0x18e2a2(0x800)](this);if(this[_0x18e2a2(0x641)]()&&this[_0x18e2a2(0x2f3)]()!=='button'){if(_0x18e2a2(0xb4)!==_0x18e2a2(0x76a))_0x100085-=Window_ButtonAssist[_0x18e2a2(0x866)][_0x18e2a2(0x99b)]();else{const _0x1ae2f9=_0x578c09?this[_0x18e2a2(0x167)]:this[_0x18e2a2(0x870)];if(!_0x1ae2f9)return;if(!_0x1ae2f9[_0x18e2a2(0x6d6)])return;const _0x454334=_0x1ae2f9[_0x18e2a2(0x6d6)];_0x454334[_0x18e2a2(0x6bc)]();if(_0x13d53e<=0x0)return;const _0x34fcf4=_0x132cb3?this['innerWidth']/this['overallWidth']():this['innerHeight']/this[_0x18e2a2(0x4de)](),_0x2ab006=_0x416fd5?_0x1e0c93[_0x18e2a2(0x997)](_0x29e909*_0x34fcf4):0x0,_0x3ac8a2=_0x3a5467?0x0:_0x571684[_0x18e2a2(0x997)](_0x3e53c2*_0x34fcf4),_0x3c201c=_0x141c28?_0x45ebdd[_0x18e2a2(0x997)](_0x454334['width']*_0x34fcf4):_0x454334[_0x18e2a2(0x59d)],_0x3e6173=_0x3c852b?_0x454334[_0x18e2a2(0x844)]:_0x46ad54[_0x18e2a2(0x997)](_0x454334[_0x18e2a2(0x844)]*_0x34fcf4),_0x4bc981=_0x4209be['SCROLLBAR'],_0x302c8d=_0x2fa05f[_0x18e2a2(0x973)](_0x4bc981['offColor']),_0x33dfdc=_0x3a5522[_0x18e2a2(0x973)](_0x4bc981[_0x18e2a2(0x23a)]),_0x21075a=_0x4bc981['offOpacity'];_0x454334[_0x18e2a2(0x87e)]=_0x21075a,_0x454334['fillAll'](_0x302c8d),_0x454334[_0x18e2a2(0x87e)]=0xff,_0x454334[_0x18e2a2(0x937)](_0x2ab006,_0x3ac8a2,_0x3c201c,_0x3e6173,_0x33dfdc);}}return _0x100085;},Scene_MenuBase[_0x25789e(0x866)][_0x25789e(0x227)]=function(){const _0x22ce5a=_0x25789e;return Graphics[_0x22ce5a(0x81e)]-this[_0x22ce5a(0x5af)]();},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x760)]=Scene_MenuBase[_0x25789e(0x866)][_0x25789e(0x58e)],Scene_MenuBase['prototype'][_0x25789e(0x58e)]=function(){const _0x3004cc=_0x25789e,_0x2a2573=VisuMZ[_0x3004cc(0xf9)][_0x3004cc(0x59c)]['MenuBg'][_0x3004cc(0x9d)]??0x8;this[_0x3004cc(0x71f)]=new PIXI['filters']['BlurFilter'](_0x2a2573),this[_0x3004cc(0x62f)]=new Sprite(),this[_0x3004cc(0x62f)][_0x3004cc(0x6d6)]=SceneManager['backgroundBitmap'](),this['_backgroundSprite'][_0x3004cc(0x4cd)]=[this[_0x3004cc(0x71f)]],this['addChild'](this[_0x3004cc(0x62f)]),this['setBackgroundOpacity'](0xc0),this[_0x3004cc(0x9d1)](this[_0x3004cc(0x476)]()),this[_0x3004cc(0x593)]();},Scene_MenuBase[_0x25789e(0x866)][_0x25789e(0x476)]=function(){const _0xa6ec51=_0x25789e,_0x291b9e=String(this[_0xa6ec51(0x49f)]['name']),_0x556e37=this[_0xa6ec51(0x274)](_0x291b9e);if(_0x556e37){if('ySOSr'==='ySOSr')return _0x556e37[_0xa6ec51(0x698)];else this[_0xa6ec51(0x95e)]['y']=0x0;}else return 0xc0;},Scene_MenuBase[_0x25789e(0x866)][_0x25789e(0x593)]=function(){const _0x1fca71=_0x25789e,_0x360055=String(this[_0x1fca71(0x49f)][_0x1fca71(0x126)]),_0x2552c4=this[_0x1fca71(0x274)](_0x360055);_0x2552c4&&(_0x2552c4['BgFilename1']!==''||_0x2552c4[_0x1fca71(0x2f6)]!=='')&&(this[_0x1fca71(0x31c)]=new Sprite(ImageManager[_0x1fca71(0x918)](_0x2552c4[_0x1fca71(0x7ee)])),this[_0x1fca71(0x7d7)]=new Sprite(ImageManager[_0x1fca71(0x54d)](_0x2552c4[_0x1fca71(0x2f6)])),this[_0x1fca71(0x99d)](this['_backSprite1']),this[_0x1fca71(0x99d)](this[_0x1fca71(0x7d7)]),this['_backSprite1'][_0x1fca71(0x6d6)]['addLoadListener'](this[_0x1fca71(0x4cb)][_0x1fca71(0x53d)](this,this['_backSprite1'])),this[_0x1fca71(0x7d7)]['bitmap'][_0x1fca71(0x880)](this[_0x1fca71(0x4cb)]['bind'](this,this[_0x1fca71(0x7d7)])));},Scene_MenuBase[_0x25789e(0x866)]['getCustomBackgroundSettings']=function(_0x3bf565){const _0x775123=_0x25789e;return VisuMZ['CoreEngine'][_0x775123(0x59c)][_0x775123(0x901)][_0x3bf565]||VisuMZ[_0x775123(0xf9)][_0x775123(0x59c)][_0x775123(0x901)]['Scene_Unlisted'];},Scene_MenuBase[_0x25789e(0x866)][_0x25789e(0x4cb)]=function(_0x38cf7b){const _0x146da1=_0x25789e;this[_0x146da1(0x3b2)](_0x38cf7b),this[_0x146da1(0x87f)](_0x38cf7b);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x794)]=Scene_MenuBase[_0x25789e(0x866)][_0x25789e(0x1d3)],Scene_MenuBase[_0x25789e(0x866)][_0x25789e(0x1d3)]=function(){const _0x58c93f=_0x25789e;VisuMZ[_0x58c93f(0xf9)][_0x58c93f(0x794)][_0x58c93f(0x800)](this);if(SceneManager[_0x58c93f(0x47c)]()){if(_0x58c93f(0x5dc)!==_0x58c93f(0x5dc))return _0x528cbc['CoreEngine']['Window_EquipItem_isEnabled'][_0x58c93f(0x800)](this,_0x5ac4ba);else this[_0x58c93f(0xe1)]();}},Scene_MenuBase[_0x25789e(0x866)]['moveCancelButtonSideButtonLayout']=function(){const _0x143f9d=_0x25789e;this[_0x143f9d(0x95e)]['x']=Graphics[_0x143f9d(0x381)]+0x4;},VisuMZ[_0x25789e(0xf9)]['Scene_MenuBase_createPageButtons']=Scene_MenuBase[_0x25789e(0x866)][_0x25789e(0x17a)],Scene_MenuBase['prototype']['createPageButtons']=function(){const _0x9f0627=_0x25789e;VisuMZ['CoreEngine']['Scene_MenuBase_createPageButtons'][_0x9f0627(0x800)](this),SceneManager[_0x9f0627(0x47c)]()&&this[_0x9f0627(0x86f)]();},Scene_MenuBase[_0x25789e(0x866)][_0x25789e(0x86f)]=function(){const _0x1b9396=_0x25789e;this[_0x1b9396(0x27d)]['x']=-0x1*(this[_0x1b9396(0x27d)][_0x1b9396(0x59d)]+this[_0x1b9396(0x3c3)]['width']+0x8),this['_pagedownButton']['x']=-0x1*(this['_pagedownButton'][_0x1b9396(0x59d)]+0x4);},Scene_MenuBase['prototype'][_0x25789e(0x641)]=function(){const _0x42c47e=_0x25789e;return VisuMZ[_0x42c47e(0xf9)][_0x42c47e(0x59c)][_0x42c47e(0x39f)][_0x42c47e(0x912)];},Scene_MenuBase[_0x25789e(0x866)][_0x25789e(0x2f3)]=function(){const _0x2af09b=_0x25789e;return SceneManager[_0x2af09b(0x47c)]()||SceneManager[_0x2af09b(0x1ce)]()?VisuMZ[_0x2af09b(0xf9)]['Settings'][_0x2af09b(0x39f)][_0x2af09b(0x8c7)]:_0x2af09b(0x260);},Scene_MenuBase[_0x25789e(0x866)][_0x25789e(0x873)]=function(){const _0x386bc5=_0x25789e;if(!this[_0x386bc5(0x641)]())return;const _0x2c506f=this[_0x386bc5(0x629)]();this[_0x386bc5(0x152)]=new Window_ButtonAssist(_0x2c506f),this[_0x386bc5(0x133)](this[_0x386bc5(0x152)]);},Scene_MenuBase['prototype']['buttonAssistWindowRect']=function(){const _0x1c2472=_0x25789e;if(this[_0x1c2472(0x2f3)]()==='button')return this[_0x1c2472(0x4eb)]();else{if(_0x1c2472(0x9b1)!==_0x1c2472(0x9b1))this[_0x1c2472(0x3e0)][_0x1c2472(0x24b)]['x']=0x1/this['scale']['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x1c2472(0x24b)]['x']);else return this[_0x1c2472(0x7dd)]();}},Scene_MenuBase['prototype'][_0x25789e(0x4eb)]=function(){const _0xf24b07=_0x25789e,_0x32e7ec=ConfigManager[_0xf24b07(0x4dd)]?(Sprite_Button[_0xf24b07(0x866)][_0xf24b07(0x1ac)]()+0x6)*0x2:0x0,_0x3dced5=this[_0xf24b07(0x9d9)](),_0x45503f=Graphics[_0xf24b07(0x381)]-_0x32e7ec*0x2,_0x33144d=this[_0xf24b07(0x6cc)]();return new Rectangle(_0x32e7ec,_0x3dced5,_0x45503f,_0x33144d);},Scene_MenuBase['prototype'][_0x25789e(0x7dd)]=function(){const _0x256e2a=_0x25789e,_0x455315=Graphics[_0x256e2a(0x381)],_0x19d35d=Window_ButtonAssist[_0x256e2a(0x866)]['lineHeight'](),_0xdb0f8a=0x0;let _0x4de6bc=0x0;if(this['getButtonAssistLocation']()===_0x256e2a(0x8be))_0x4de6bc=0x0;else{if('uaoJx'!==_0x256e2a(0x94e)){if(typeof _0x304664===_0x256e2a(0x5bb))_0x2b42ca['App']['quit']();}else _0x4de6bc=Graphics['boxHeight']-_0x19d35d;}return new Rectangle(_0xdb0f8a,_0x4de6bc,_0x455315,_0x19d35d);},Scene_Menu[_0x25789e(0xe4)]=VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)][_0x25789e(0x539)][_0x25789e(0x478)],VisuMZ[_0x25789e(0xf9)]['Scene_Menu_create']=Scene_Menu['prototype'][_0x25789e(0x468)],Scene_Menu[_0x25789e(0x866)]['create']=function(){const _0x252cb3=_0x25789e;VisuMZ['CoreEngine']['Scene_Menu_create'][_0x252cb3(0x800)](this),this[_0x252cb3(0x73e)]();},Scene_Menu[_0x25789e(0x866)][_0x25789e(0x73e)]=function(){const _0xca8cf9=_0x25789e;this[_0xca8cf9(0x9fb)]&&this['_commandWindow'][_0xca8cf9(0x615)](Scene_Menu[_0xca8cf9(0xe4)][_0xca8cf9(0x647)]),this[_0xca8cf9(0x259)]&&this[_0xca8cf9(0x259)]['setBackgroundType'](Scene_Menu[_0xca8cf9(0xe4)][_0xca8cf9(0x4b9)]),this['_statusWindow']&&this[_0xca8cf9(0x5e4)][_0xca8cf9(0x615)](Scene_Menu['layoutSettings']['StatusBgType']);},Scene_Menu['prototype'][_0x25789e(0x81f)]=function(){const _0x31f9b6=_0x25789e;return Scene_Menu[_0x31f9b6(0xe4)][_0x31f9b6(0x105)][_0x31f9b6(0x800)](this);},Scene_Menu[_0x25789e(0x866)][_0x25789e(0x1e5)]=function(){const _0x36939=_0x25789e;return Scene_Menu[_0x36939(0xe4)][_0x36939(0x59b)][_0x36939(0x800)](this);},Scene_Menu['prototype'][_0x25789e(0x3a3)]=function(){const _0x149740=_0x25789e;return Scene_Menu[_0x149740(0xe4)][_0x149740(0x8f2)][_0x149740(0x800)](this);},Scene_Item[_0x25789e(0xe4)]=VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)][_0x25789e(0x539)][_0x25789e(0x7ba)],VisuMZ[_0x25789e(0xf9)][_0x25789e(0x5dd)]=Scene_Item['prototype'][_0x25789e(0x468)],Scene_Item[_0x25789e(0x866)][_0x25789e(0x468)]=function(){const _0x2e36a0=_0x25789e;VisuMZ[_0x2e36a0(0xf9)][_0x2e36a0(0x5dd)][_0x2e36a0(0x800)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item[_0x25789e(0x866)][_0x25789e(0x73e)]=function(){const _0xa4ec75=_0x25789e;this['_helpWindow']&&this[_0xa4ec75(0x1bb)]['setBackgroundType'](Scene_Item[_0xa4ec75(0xe4)][_0xa4ec75(0x717)]),this[_0xa4ec75(0x619)]&&this[_0xa4ec75(0x619)][_0xa4ec75(0x615)](Scene_Item['layoutSettings'][_0xa4ec75(0x353)]),this[_0xa4ec75(0x6c3)]&&this[_0xa4ec75(0x6c3)][_0xa4ec75(0x615)](Scene_Item['layoutSettings'][_0xa4ec75(0x8e4)]),this[_0xa4ec75(0x8c4)]&&(_0xa4ec75(0x8f7)===_0xa4ec75(0x22f)?this[_0xa4ec75(0x8f4)](_0xa4ec75(0x5bf)):this[_0xa4ec75(0x8c4)][_0xa4ec75(0x615)](Scene_Item[_0xa4ec75(0xe4)][_0xa4ec75(0x6a3)]));},Scene_Item[_0x25789e(0x866)][_0x25789e(0x34c)]=function(){const _0xd8e09f=_0x25789e;return Scene_Item['layoutSettings'][_0xd8e09f(0x47e)][_0xd8e09f(0x800)](this);},Scene_Item[_0x25789e(0x866)][_0x25789e(0x404)]=function(){const _0x2ec3f5=_0x25789e;return Scene_Item[_0x2ec3f5(0xe4)][_0x2ec3f5(0x8c3)]['call'](this);},Scene_Item['prototype'][_0x25789e(0x1c8)]=function(){const _0x2d60db=_0x25789e;return Scene_Item['layoutSettings'][_0x2d60db(0x242)]['call'](this);},Scene_Item[_0x25789e(0x866)][_0x25789e(0x566)]=function(){const _0x1f6c0a=_0x25789e;return Scene_Item['layoutSettings'][_0x1f6c0a(0x608)][_0x1f6c0a(0x800)](this);},Scene_Skill[_0x25789e(0xe4)]=VisuMZ[_0x25789e(0xf9)]['Settings'][_0x25789e(0x539)]['SkillMenu'],VisuMZ[_0x25789e(0xf9)]['Scene_Skill_create']=Scene_Skill[_0x25789e(0x866)][_0x25789e(0x468)],Scene_Skill[_0x25789e(0x866)][_0x25789e(0x468)]=function(){const _0x412bf7=_0x25789e;VisuMZ[_0x412bf7(0xf9)][_0x412bf7(0x12c)][_0x412bf7(0x800)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill[_0x25789e(0x866)]['setCoreEngineUpdateWindowBg']=function(){const _0x433588=_0x25789e;this[_0x433588(0x1bb)]&&this[_0x433588(0x1bb)][_0x433588(0x615)](Scene_Skill['layoutSettings'][_0x433588(0x717)]);this[_0x433588(0x723)]&&this[_0x433588(0x723)][_0x433588(0x615)](Scene_Skill[_0x433588(0xe4)][_0x433588(0x49b)]);this['_statusWindow']&&this[_0x433588(0x5e4)][_0x433588(0x615)](Scene_Skill[_0x433588(0xe4)][_0x433588(0xa6)]);if(this['_itemWindow']){if(_0x433588(0x6c9)!=='fzRwQ'){let _0x4c26fa=_0x47c8fe['CoreEngine'][_0x433588(0x5ce)][_0x433588(0x800)](this);return _0x4c26fa;}else this[_0x433588(0x6c3)][_0x433588(0x615)](Scene_Skill[_0x433588(0xe4)][_0x433588(0x8e4)]);}if(this[_0x433588(0x8c4)]){if(_0x433588(0xd5)!==_0x433588(0xd5)){let _0x198f86=_0x4cc63e['createTroopNote'](_0x13e7f7['id']);this[_0x433588(0x65e)](_0x198f86);}else this['_actorWindow'][_0x433588(0x615)](Scene_Skill['layoutSettings']['ActorBgType']);}},Scene_Skill[_0x25789e(0x866)][_0x25789e(0x34c)]=function(){const _0x46dd2e=_0x25789e;return Scene_Skill['layoutSettings']['HelpRect'][_0x46dd2e(0x800)](this);},Scene_Skill['prototype'][_0x25789e(0x32b)]=function(){const _0x594eb1=_0x25789e;return Scene_Skill['layoutSettings']['SkillTypeRect'][_0x594eb1(0x800)](this);},Scene_Skill[_0x25789e(0x866)][_0x25789e(0x3a3)]=function(){const _0x56f504=_0x25789e;return Scene_Skill[_0x56f504(0xe4)][_0x56f504(0x8f2)]['call'](this);},Scene_Skill[_0x25789e(0x866)][_0x25789e(0x1c8)]=function(){const _0x1ccf75=_0x25789e;return Scene_Skill[_0x1ccf75(0xe4)]['ItemRect'][_0x1ccf75(0x800)](this);},Scene_Skill[_0x25789e(0x866)][_0x25789e(0x566)]=function(){const _0xe443a4=_0x25789e;return Scene_Skill[_0xe443a4(0xe4)][_0xe443a4(0x608)][_0xe443a4(0x800)](this);},Scene_Equip[_0x25789e(0xe4)]=VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)][_0x25789e(0x539)][_0x25789e(0x5c7)],VisuMZ[_0x25789e(0xf9)][_0x25789e(0x7f7)]=Scene_Equip['prototype'][_0x25789e(0x468)],Scene_Equip['prototype'][_0x25789e(0x468)]=function(){const _0x4ae596=_0x25789e;VisuMZ[_0x4ae596(0xf9)]['Scene_Equip_create']['call'](this),this[_0x4ae596(0x73e)]();},Scene_Equip[_0x25789e(0x866)][_0x25789e(0x73e)]=function(){const _0x4d7689=_0x25789e;this[_0x4d7689(0x1bb)]&&('rcOeM'===_0x4d7689(0x923)?this['_helpWindow'][_0x4d7689(0x615)](Scene_Equip[_0x4d7689(0xe4)][_0x4d7689(0x717)]):this[_0x4d7689(0x540)]=_0x76a4fb),this[_0x4d7689(0x5e4)]&&this[_0x4d7689(0x5e4)][_0x4d7689(0x615)](Scene_Equip[_0x4d7689(0xe4)][_0x4d7689(0xa6)]),this[_0x4d7689(0x9fb)]&&this['_commandWindow'][_0x4d7689(0x615)](Scene_Equip[_0x4d7689(0xe4)][_0x4d7689(0x647)]),this[_0x4d7689(0x3a6)]&&this[_0x4d7689(0x3a6)]['setBackgroundType'](Scene_Equip['layoutSettings'][_0x4d7689(0x38a)]),this[_0x4d7689(0x6c3)]&&this[_0x4d7689(0x6c3)][_0x4d7689(0x615)](Scene_Equip[_0x4d7689(0xe4)][_0x4d7689(0x8e4)]);},Scene_Equip['prototype'][_0x25789e(0x34c)]=function(){const _0xa3f349=_0x25789e;return Scene_Equip['layoutSettings'][_0xa3f349(0x47e)][_0xa3f349(0x800)](this);},Scene_Equip[_0x25789e(0x866)]['statusWindowRect']=function(){const _0x5e5c81=_0x25789e;return Scene_Equip[_0x5e5c81(0xe4)][_0x5e5c81(0x8f2)][_0x5e5c81(0x800)](this);},Scene_Equip['prototype'][_0x25789e(0x81f)]=function(){const _0x22ad95=_0x25789e;return Scene_Equip[_0x22ad95(0xe4)]['CommandRect'][_0x22ad95(0x800)](this);},Scene_Equip['prototype'][_0x25789e(0x290)]=function(){const _0x398bc7=_0x25789e;return Scene_Equip[_0x398bc7(0xe4)][_0x398bc7(0x61e)][_0x398bc7(0x800)](this);},Scene_Equip['prototype'][_0x25789e(0x1c8)]=function(){const _0x9c69ab=_0x25789e;return Scene_Equip[_0x9c69ab(0xe4)][_0x9c69ab(0x242)][_0x9c69ab(0x800)](this);},Scene_Status[_0x25789e(0xe4)]=VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)]['MenuLayout']['StatusMenu'],VisuMZ[_0x25789e(0xf9)][_0x25789e(0x9ba)]=Scene_Status[_0x25789e(0x866)][_0x25789e(0x468)],Scene_Status[_0x25789e(0x866)][_0x25789e(0x468)]=function(){const _0x13b4ed=_0x25789e;VisuMZ[_0x13b4ed(0xf9)]['Scene_Status_create'][_0x13b4ed(0x800)](this),this[_0x13b4ed(0x73e)]();},Scene_Status[_0x25789e(0x866)][_0x25789e(0x73e)]=function(){const _0x4457a5=_0x25789e;this[_0x4457a5(0x2c7)]&&this[_0x4457a5(0x2c7)]['setBackgroundType'](Scene_Status[_0x4457a5(0xe4)][_0x4457a5(0x960)]),this[_0x4457a5(0x5e4)]&&(_0x4457a5(0x946)!==_0x4457a5(0x11e)?this[_0x4457a5(0x5e4)][_0x4457a5(0x615)](Scene_Status['layoutSettings'][_0x4457a5(0xa6)]):this[_0x4457a5(0x501)][_0x4457a5(0x615)](_0x377d85[_0x4457a5(0xe4)]['ListBgType'])),this[_0x4457a5(0x9f1)]&&this['_statusParamsWindow'][_0x4457a5(0x615)](Scene_Status[_0x4457a5(0xe4)][_0x4457a5(0x5c8)]),this[_0x4457a5(0x4df)]&&this[_0x4457a5(0x4df)][_0x4457a5(0x615)](Scene_Status[_0x4457a5(0xe4)][_0x4457a5(0x729)]);},Scene_Status['prototype'][_0x25789e(0x688)]=function(){const _0x18158=_0x25789e;return Scene_Status[_0x18158(0xe4)][_0x18158(0x666)]['call'](this);},Scene_Status[_0x25789e(0x866)]['statusWindowRect']=function(){const _0x4a41de=_0x25789e;return Scene_Status[_0x4a41de(0xe4)][_0x4a41de(0x8f2)][_0x4a41de(0x800)](this);},Scene_Status['prototype']['statusParamsWindowRect']=function(){const _0x44c743=_0x25789e;return Scene_Status[_0x44c743(0xe4)][_0x44c743(0x8ee)][_0x44c743(0x800)](this);},Scene_Status['prototype']['statusEquipWindowRect']=function(){const _0x454e2f=_0x25789e;return Scene_Status[_0x454e2f(0xe4)]['StatusEquipRect']['call'](this);},Scene_Options[_0x25789e(0xe4)]=VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)][_0x25789e(0x539)][_0x25789e(0xa7)],VisuMZ[_0x25789e(0xf9)][_0x25789e(0x20d)]=Scene_Options[_0x25789e(0x866)][_0x25789e(0x468)],Scene_Options[_0x25789e(0x866)][_0x25789e(0x468)]=function(){const _0xa6e147=_0x25789e;VisuMZ[_0xa6e147(0xf9)][_0xa6e147(0x20d)][_0xa6e147(0x800)](this),this[_0xa6e147(0x73e)]();},Scene_Options[_0x25789e(0x866)]['setCoreEngineUpdateWindowBg']=function(){const _0xb448f6=_0x25789e;if(this[_0xb448f6(0x15c)]){if(_0xb448f6(0x413)!==_0xb448f6(0x530))this[_0xb448f6(0x15c)][_0xb448f6(0x615)](Scene_Options['layoutSettings'][_0xb448f6(0x635)]);else return!![];}},Scene_Options['prototype'][_0x25789e(0x20e)]=function(){const _0x1b0d98=_0x25789e;return Scene_Options['layoutSettings']['OptionsRect'][_0x1b0d98(0x800)](this);},Scene_Save['layoutSettings']=VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)][_0x25789e(0x539)]['SaveMenu'],Scene_Save[_0x25789e(0x866)][_0x25789e(0x468)]=function(){const _0x44c9ae=_0x25789e;Scene_File[_0x44c9ae(0x866)][_0x44c9ae(0x468)][_0x44c9ae(0x800)](this),this[_0x44c9ae(0x73e)]();},Scene_Save[_0x25789e(0x866)][_0x25789e(0x73e)]=function(){const _0x10b1c4=_0x25789e;this[_0x10b1c4(0x1bb)]&&this['_helpWindow'][_0x10b1c4(0x615)](Scene_Save[_0x10b1c4(0xe4)][_0x10b1c4(0x717)]),this['_listWindow']&&this[_0x10b1c4(0x501)][_0x10b1c4(0x615)](Scene_Save[_0x10b1c4(0xe4)]['ListBgType']);},Scene_Save[_0x25789e(0x866)][_0x25789e(0x34c)]=function(){const _0xd19f81=_0x25789e;return Scene_Save[_0xd19f81(0xe4)][_0xd19f81(0x47e)][_0xd19f81(0x800)](this);},Scene_Save[_0x25789e(0x866)][_0x25789e(0x85d)]=function(){const _0xa06bb1=_0x25789e;return Scene_Save[_0xa06bb1(0xe4)][_0xa06bb1(0x604)][_0xa06bb1(0x800)](this);},Scene_Load[_0x25789e(0xe4)]=VisuMZ[_0x25789e(0xf9)]['Settings']['MenuLayout'][_0x25789e(0x4cc)],Scene_Load[_0x25789e(0x866)]['create']=function(){const _0x4b3d84=_0x25789e;Scene_File[_0x4b3d84(0x866)][_0x4b3d84(0x468)][_0x4b3d84(0x800)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load[_0x25789e(0x866)][_0x25789e(0x73e)]=function(){const _0x28570e=_0x25789e;this[_0x28570e(0x1bb)]&&this[_0x28570e(0x1bb)][_0x28570e(0x615)](Scene_Load[_0x28570e(0xe4)][_0x28570e(0x717)]),this['_listWindow']&&this[_0x28570e(0x501)]['setBackgroundType'](Scene_Load[_0x28570e(0xe4)][_0x28570e(0x90d)]);},Scene_Load['prototype']['helpWindowRect']=function(){const _0x87426=_0x25789e;return Scene_Load[_0x87426(0xe4)][_0x87426(0x47e)][_0x87426(0x800)](this);},Scene_Load[_0x25789e(0x866)][_0x25789e(0x85d)]=function(){const _0x16a6c1=_0x25789e;return Scene_Load[_0x16a6c1(0xe4)][_0x16a6c1(0x604)][_0x16a6c1(0x800)](this);},Scene_GameEnd['layoutSettings']=VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)][_0x25789e(0x539)][_0x25789e(0x36a)],VisuMZ[_0x25789e(0xf9)][_0x25789e(0x9e9)]=Scene_GameEnd[_0x25789e(0x866)][_0x25789e(0x58e)],Scene_GameEnd[_0x25789e(0x866)][_0x25789e(0x58e)]=function(){const _0x15c307=_0x25789e;Scene_MenuBase[_0x15c307(0x866)][_0x15c307(0x58e)][_0x15c307(0x800)](this);},Scene_GameEnd['prototype']['createCommandWindow']=function(){const _0x4740de=_0x25789e,_0x37864f=this['commandWindowRect']();this[_0x4740de(0x9fb)]=new Window_GameEnd(_0x37864f),this['_commandWindow'][_0x4740de(0x552)](_0x4740de(0x994),this[_0x4740de(0x70b)][_0x4740de(0x53d)](this)),this[_0x4740de(0x133)](this[_0x4740de(0x9fb)]),this[_0x4740de(0x9fb)][_0x4740de(0x615)](Scene_GameEnd[_0x4740de(0xe4)][_0x4740de(0x647)]);},Scene_GameEnd[_0x25789e(0x866)][_0x25789e(0x81f)]=function(){const _0x44480b=_0x25789e;return Scene_GameEnd['layoutSettings'][_0x44480b(0x105)][_0x44480b(0x800)](this);},Scene_Shop[_0x25789e(0xe4)]=VisuMZ['CoreEngine'][_0x25789e(0x59c)]['MenuLayout'][_0x25789e(0x7e7)],VisuMZ[_0x25789e(0xf9)]['Scene_Shop_create']=Scene_Shop[_0x25789e(0x866)][_0x25789e(0x468)],Scene_Shop['prototype'][_0x25789e(0x468)]=function(){const _0xe8718b=_0x25789e;VisuMZ['CoreEngine'][_0xe8718b(0x466)]['call'](this),this[_0xe8718b(0x73e)]();},Scene_Shop[_0x25789e(0x866)][_0x25789e(0x73e)]=function(){const _0x3567fd=_0x25789e;this[_0x3567fd(0x1bb)]&&this['_helpWindow'][_0x3567fd(0x615)](Scene_Shop[_0x3567fd(0xe4)]['HelpBgType']);this[_0x3567fd(0x259)]&&this[_0x3567fd(0x259)][_0x3567fd(0x615)](Scene_Shop[_0x3567fd(0xe4)][_0x3567fd(0x4b9)]);this[_0x3567fd(0x9fb)]&&this[_0x3567fd(0x9fb)][_0x3567fd(0x615)](Scene_Shop[_0x3567fd(0xe4)][_0x3567fd(0x647)]);this[_0x3567fd(0x229)]&&('GLSnJ'!==_0x3567fd(0x77f)?this[_0x3567fd(0x229)][_0x3567fd(0x615)](Scene_Shop[_0x3567fd(0xe4)]['DummyBgType']):(this['checkPlayerLocation'](),_0x36a3b5[_0x3567fd(0x710)](),_0x253635[_0x3567fd(0x390)](_0xc862b)));if(this['_numberWindow']){if(_0x3567fd(0x490)!==_0x3567fd(0x490))return _0x37d998[_0x3567fd(0xf9)]['Settings'][_0x3567fd(0x25e)][_0x3567fd(0x522)]??!![];else this[_0x3567fd(0x37c)]['setBackgroundType'](Scene_Shop[_0x3567fd(0xe4)][_0x3567fd(0x5e1)]);}if(this[_0x3567fd(0x5e4)]){if(_0x3567fd(0x90a)!==_0x3567fd(0x5d1))this[_0x3567fd(0x5e4)][_0x3567fd(0x615)](Scene_Shop['layoutSettings'][_0x3567fd(0xa6)]);else{if(this['_mode']==='keyboard')return;if(_0x3b065d[_0x3567fd(0x7e3)]())return;_0x1726ef[_0x3567fd(0xf9)][_0x3567fd(0x559)]['call'](this),this['switchModes'](_0x3567fd(0x5bf));}}this[_0x3567fd(0x68e)]&&this[_0x3567fd(0x68e)][_0x3567fd(0x615)](Scene_Shop[_0x3567fd(0xe4)]['BuyBgType']),this[_0x3567fd(0x619)]&&('OIciG'===_0x3567fd(0xf8)?this['switchModes'](_0x3567fd(0x5bf)):this[_0x3567fd(0x619)]['setBackgroundType'](Scene_Shop[_0x3567fd(0xe4)][_0x3567fd(0x353)])),this[_0x3567fd(0x71d)]&&this[_0x3567fd(0x71d)][_0x3567fd(0x615)](Scene_Shop['layoutSettings'][_0x3567fd(0x6cd)]);},Scene_Shop[_0x25789e(0x866)][_0x25789e(0x34c)]=function(){const _0xcbb195=_0x25789e;return Scene_Shop[_0xcbb195(0xe4)][_0xcbb195(0x47e)][_0xcbb195(0x800)](this);},Scene_Shop[_0x25789e(0x866)][_0x25789e(0x1e5)]=function(){const _0x43eddc=_0x25789e;return Scene_Shop[_0x43eddc(0xe4)][_0x43eddc(0x59b)]['call'](this);},Scene_Shop[_0x25789e(0x866)][_0x25789e(0x81f)]=function(){const _0x4e391a=_0x25789e;return Scene_Shop[_0x4e391a(0xe4)]['CommandRect'][_0x4e391a(0x800)](this);},Scene_Shop[_0x25789e(0x866)][_0x25789e(0x824)]=function(){const _0xfb45d2=_0x25789e;return Scene_Shop[_0xfb45d2(0xe4)][_0xfb45d2(0x4e9)]['call'](this);},Scene_Shop['prototype'][_0x25789e(0x51f)]=function(){const _0x4c5c4f=_0x25789e;return Scene_Shop[_0x4c5c4f(0xe4)][_0x4c5c4f(0x3b5)]['call'](this);},Scene_Shop[_0x25789e(0x866)]['statusWindowRect']=function(){const _0x28f99a=_0x25789e;return Scene_Shop[_0x28f99a(0xe4)]['StatusRect']['call'](this);},Scene_Shop['prototype'][_0x25789e(0x5f7)]=function(){const _0x40bca6=_0x25789e;return Scene_Shop['layoutSettings']['BuyRect'][_0x40bca6(0x800)](this);},Scene_Shop[_0x25789e(0x866)][_0x25789e(0x404)]=function(){const _0x541f1a=_0x25789e;return Scene_Shop[_0x541f1a(0xe4)]['CategoryRect'][_0x541f1a(0x800)](this);},Scene_Shop[_0x25789e(0x866)]['sellWindowRect']=function(){const _0x56e6a2=_0x25789e;return Scene_Shop[_0x56e6a2(0xe4)][_0x56e6a2(0x4bc)][_0x56e6a2(0x800)](this);},Scene_Name['layoutSettings']=VisuMZ['CoreEngine'][_0x25789e(0x59c)][_0x25789e(0x539)]['NameMenu'],VisuMZ[_0x25789e(0xf9)][_0x25789e(0x916)]=Scene_Name[_0x25789e(0x866)][_0x25789e(0x468)],Scene_Name[_0x25789e(0x866)][_0x25789e(0x468)]=function(){const _0x5e291b=_0x25789e;VisuMZ[_0x5e291b(0xf9)][_0x5e291b(0x916)][_0x5e291b(0x800)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Name['prototype'][_0x25789e(0x73e)]=function(){const _0x478808=_0x25789e;this[_0x478808(0x65f)]&&this[_0x478808(0x65f)]['setBackgroundType'](Scene_Name[_0x478808(0xe4)][_0x478808(0x934)]),this[_0x478808(0x232)]&&this[_0x478808(0x232)][_0x478808(0x615)](Scene_Name[_0x478808(0xe4)][_0x478808(0x961)]);},Scene_Name[_0x25789e(0x866)]['helpAreaHeight']=function(){return 0x0;},Scene_Name[_0x25789e(0x866)][_0x25789e(0x913)]=function(){const _0x3112a7=_0x25789e;return Scene_Name[_0x3112a7(0xe4)]['EditRect'][_0x3112a7(0x800)](this);},Scene_Name[_0x25789e(0x866)][_0x25789e(0xb7)]=function(){const _0x2fb1fe=_0x25789e;return Scene_Name[_0x2fb1fe(0xe4)]['InputRect']['call'](this);},Scene_Name[_0x25789e(0x866)][_0x25789e(0x179)]=function(){const _0x2ee4ff=_0x25789e;if(!this[_0x2ee4ff(0x232)])return![];return VisuMZ[_0x2ee4ff(0xf9)][_0x2ee4ff(0x59c)][_0x2ee4ff(0x359)]['EnableNameInput'];},Scene_Name['prototype'][_0x25789e(0x609)]=function(){const _0x5b1831=_0x25789e;if(this[_0x5b1831(0x179)]()&&this[_0x5b1831(0x232)][_0x5b1831(0x26d)]!==_0x5b1831(0x715))return TextManager[_0x5b1831(0x46a)](_0x5b1831(0x678),_0x5b1831(0x1a3));return Scene_MenuBase[_0x5b1831(0x866)][_0x5b1831(0x609)][_0x5b1831(0x800)](this);},Scene_Name[_0x25789e(0x866)]['buttonAssistKey3']=function(){const _0x43ff0a=_0x25789e;if(this[_0x43ff0a(0x179)]()){if('kipDK'!==_0x43ff0a(0x3a9))this['_forcedBattleSys']='ETB';else return TextManager[_0x43ff0a(0x9a)](_0x43ff0a(0x8f6));}else{if(_0x43ff0a(0xea)===_0x43ff0a(0xea))return Scene_MenuBase[_0x43ff0a(0x866)][_0x43ff0a(0x89d)][_0x43ff0a(0x800)](this);else _0x42c475[_0x43ff0a(0xf9)]['Game_Interpreter_command122'][_0x43ff0a(0x800)](this,_0x46bdd4);}},Scene_Name[_0x25789e(0x866)]['buttonAssistKey4']=function(){const _0x372e4f=_0x25789e;if(this[_0x372e4f(0x179)]()&&this[_0x372e4f(0x232)][_0x372e4f(0x26d)]===_0x372e4f(0x715)){if('bSQTw'==='bSQTw')return TextManager[_0x372e4f(0x350)]([_0x372e4f(0x473)]);else{if(_0x2029a6===_0x372e4f(0x994))_0x4aa22e=_0x372e4f(0x472);if(_0x1eccde==='menu')_0x2319a1=_0x372e4f(0x472);}}return Scene_MenuBase[_0x372e4f(0x866)][_0x372e4f(0x655)][_0x372e4f(0x800)](this);},Scene_Name['prototype'][_0x25789e(0x64c)]=function(){const _0x4dcdb2=_0x25789e;if(this[_0x4dcdb2(0x179)]()&&this[_0x4dcdb2(0x232)]['_mode']===_0x4dcdb2(0x715))return TextManager[_0x4dcdb2(0x350)]([_0x4dcdb2(0x4c2)]);return Scene_MenuBase[_0x4dcdb2(0x866)][_0x4dcdb2(0x64c)][_0x4dcdb2(0x800)](this);},Scene_Name['prototype'][_0x25789e(0x30b)]=function(){const _0x4d23b6=_0x25789e;if(this['EnableNameInput']()&&this['_inputWindow'][_0x4d23b6(0x26d)]!==_0x4d23b6(0x715)){const _0x4b5358=VisuMZ['CoreEngine'][_0x4d23b6(0x59c)][_0x4d23b6(0x359)];return _0x4b5358[_0x4d23b6(0x9c1)]||_0x4d23b6(0x83d);}return Scene_MenuBase[_0x4d23b6(0x866)][_0x4d23b6(0x30b)][_0x4d23b6(0x800)](this);},Scene_Name[_0x25789e(0x866)]['buttonAssistText3']=function(){const _0x2365aa=_0x25789e;if(this[_0x2365aa(0x179)]()){if(_0x2365aa(0x818)===_0x2365aa(0x818)){const _0x43c793=VisuMZ[_0x2365aa(0xf9)][_0x2365aa(0x59c)][_0x2365aa(0x359)];return this['_inputWindow'][_0x2365aa(0x26d)]===_0x2365aa(0x715)?_0x43c793[_0x2365aa(0x100)]||_0x2365aa(0x100):_0x43c793[_0x2365aa(0x721)]||_0x2365aa(0x721);}else{const _0x87684d=(_0x502d59['CoreEngine'][_0x2365aa(0x59c)][_0x2365aa(0x4a0)]||'DATABASE')['toUpperCase']()[_0x2365aa(0x91f)]();return _0xbef2d7['CoreEngine'][_0x2365aa(0x117)](_0x87684d);}}else return Scene_MenuBase[_0x2365aa(0x866)][_0x2365aa(0x2d4)][_0x2365aa(0x800)](this);},Scene_Name[_0x25789e(0x866)]['buttonAssistText4']=function(){const _0x3c12e0=_0x25789e;if(this[_0x3c12e0(0x179)]()){if(_0x3c12e0(0x56e)!==_0x3c12e0(0x56e)){const _0xe7a2b9=this[_0x3c12e0(0x13c)][_0x3c12e0(0x2ee)][_0x3c12e0(0x9f4)](new _0x10a152(0x0,0x0)),_0x2d822e=this[_0x3c12e0(0x13c)][_0x3c12e0(0x4e4)];_0x2d822e['x']=_0xe7a2b9['x']+this['origin']['x'],_0x2d822e['y']=_0xe7a2b9['y']+this[_0x3c12e0(0x5ff)]['y'],_0x2d822e[_0x3c12e0(0x59d)]=_0x325355[_0x3c12e0(0x169)](this[_0x3c12e0(0x1b1)]*this[_0x3c12e0(0x24b)]['x']),_0x2d822e['height']=_0xaf69a1[_0x3c12e0(0x169)](this[_0x3c12e0(0x90f)]*this[_0x3c12e0(0x24b)]['y']);}else{const _0x115202=VisuMZ[_0x3c12e0(0xf9)]['Settings']['KeyboardInput'];if(this[_0x3c12e0(0x232)]['_mode']===_0x3c12e0(0x715))return _0x115202[_0x3c12e0(0x97e)]||_0x3c12e0(0x97e);}}return Scene_MenuBase[_0x3c12e0(0x866)][_0x3c12e0(0x47f)][_0x3c12e0(0x800)](this);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x318)]=Scene_Name['prototype'][_0x25789e(0x37e)],Scene_Name[_0x25789e(0x866)]['onInputOk']=function(){const _0x4efdb4=_0x25789e;if(this[_0x4efdb4(0x42b)]()){if('CWWPA'!==_0x4efdb4(0x162)){if(_0x1e9b4f[_0x4efdb4(0x254)]())_0x2b2b9f[_0x4efdb4(0x927)](_0x44da4f);}else this[_0x4efdb4(0x4ce)]();}else VisuMZ[_0x4efdb4(0xf9)][_0x4efdb4(0x318)][_0x4efdb4(0x800)](this);},Scene_Name['prototype'][_0x25789e(0x42b)]=function(){const _0xe01dfd=_0x25789e,_0x1359cb=VisuMZ[_0xe01dfd(0xf9)][_0xe01dfd(0x59c)][_0xe01dfd(0x359)];if(!_0x1359cb)return![];const _0x135a08=_0x1359cb[_0xe01dfd(0x574)];if(!_0x135a08)return![];const _0x5cd990=this[_0xe01dfd(0x65f)][_0xe01dfd(0x126)]()[_0xe01dfd(0x76e)]();for(const _0x1c3c11 of _0x135a08){if('HxGfr'==='hpBMB'){if(this[_0xe01dfd(0xcc)]<=0x0)return;const _0x5bd730=this[_0xe01dfd(0xcc)],_0x4693d1=this[_0xe01dfd(0x5ab)],_0x3093d5=this[_0xe01dfd(0x963)];this['_offsetX']=this[_0xe01dfd(0x393)](this[_0xe01dfd(0x2c5)],this[_0xe01dfd(0x575)],_0x5bd730,_0x4693d1,_0x3093d5),this['_offsetY']=this[_0xe01dfd(0x393)](this[_0xe01dfd(0x54c)],this['_targetOffsetY'],_0x5bd730,_0x4693d1,_0x3093d5),this['_movementDuration']--;if(this[_0xe01dfd(0xcc)]<=0x0)this[_0xe01dfd(0x8df)]();}else{if(_0x5cd990['includes'](_0x1c3c11[_0xe01dfd(0x76e)]()))return!![];}}return![];},Scene_Name[_0x25789e(0x866)][_0x25789e(0x4ce)]=function(){SoundManager['playBuzzer']();},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x589)]=Scene_Battle['prototype'][_0x25789e(0x91c)],Scene_Battle[_0x25789e(0x866)]['update']=function(){const _0x4e8c2e=_0x25789e;VisuMZ[_0x4e8c2e(0xf9)][_0x4e8c2e(0x589)]['call'](this);if($gameTemp[_0x4e8c2e(0x8b5)])this['updatePlayTestF7']();},Scene_Battle[_0x25789e(0x866)][_0x25789e(0x22b)]=function(){const _0x498bf=_0x25789e;!BattleManager[_0x498bf(0x996)]()&&!this[_0x498bf(0x987)]&&!$gameMessage[_0x498bf(0x5ee)]()&&('tWoXk'!=='FvxiB'?(this['_playtestF7Looping']=!![],this['update'](),SceneManager[_0x498bf(0x459)](),this[_0x498bf(0x987)]=![]):_0x45f45f+=_0x2e233c);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x665)]=Scene_Battle['prototype'][_0x25789e(0x1d3)],Scene_Battle[_0x25789e(0x866)][_0x25789e(0x1d3)]=function(){const _0x575705=_0x25789e;VisuMZ['CoreEngine'][_0x575705(0x665)]['call'](this),SceneManager[_0x575705(0x47c)]()&&this[_0x575705(0x63f)]();},Scene_Battle['prototype'][_0x25789e(0x63f)]=function(){const _0x329224=_0x25789e;this[_0x329224(0x95e)]['x']=Graphics[_0x329224(0x381)]+0x4,this[_0x329224(0x8f3)]()?_0x329224(0x59a)===_0x329224(0x59a)?this[_0x329224(0x95e)]['y']=Graphics[_0x329224(0x81e)]-this[_0x329224(0x6cc)]():this[_0x329224(0x65b)]():this[_0x329224(0x95e)]['y']=0x0;},VisuMZ[_0x25789e(0xf9)]['Sprite_Button_initialize']=Sprite_Button[_0x25789e(0x866)]['initialize'],Sprite_Button['prototype'][_0x25789e(0x928)]=function(_0x512d58){const _0x47e484=_0x25789e;VisuMZ[_0x47e484(0xf9)][_0x47e484(0x962)]['call'](this,_0x512d58),this[_0x47e484(0x5fc)]();},Sprite_Button['prototype']['initButtonHidden']=function(){const _0x4826a7=_0x25789e,_0x8e8804=VisuMZ[_0x4826a7(0xf9)]['Settings']['UI'];this[_0x4826a7(0x7aa)]=![];switch(this[_0x4826a7(0x72c)]){case _0x4826a7(0x994):this[_0x4826a7(0x7aa)]=!_0x8e8804[_0x4826a7(0x8ba)];break;case'pageup':case _0x4826a7(0x1a3):this[_0x4826a7(0x7aa)]=!_0x8e8804[_0x4826a7(0x6a4)];break;case _0x4826a7(0x2cc):case'up':case _0x4826a7(0x21d):case _0x4826a7(0x9f3):case'ok':this[_0x4826a7(0x7aa)]=!_0x8e8804['numberShowButton'];break;case _0x4826a7(0x351):this['_isButtonHidden']=!_0x8e8804[_0x4826a7(0x9b8)];break;}},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x2eb)]=Sprite_Button[_0x25789e(0x866)][_0x25789e(0x7de)],Sprite_Button[_0x25789e(0x866)][_0x25789e(0x7de)]=function(){const _0x16667f=_0x25789e;if(SceneManager[_0x16667f(0x1ce)]()||this[_0x16667f(0x7aa)]){if(_0x16667f(0x68b)==='FKmiD')this[_0x16667f(0x515)]();else return _0x461d60[_0x16667f(0xe4)][_0x16667f(0x105)][_0x16667f(0x800)](this);}else VisuMZ[_0x16667f(0xf9)][_0x16667f(0x2eb)]['call'](this);},Sprite_Button[_0x25789e(0x866)][_0x25789e(0x515)]=function(){const _0x2e46df=_0x25789e;this['visible']=![],this[_0x2e46df(0x555)]=0x0,this['x']=Graphics[_0x2e46df(0x59d)]*0xa,this['y']=Graphics[_0x2e46df(0x844)]*0xa;},VisuMZ[_0x25789e(0xf9)]['Sprite_Battler_startMove']=Sprite_Battler[_0x25789e(0x866)][_0x25789e(0x37f)],Sprite_Battler['prototype'][_0x25789e(0x37f)]=function(_0x8a0aa0,_0x12bdb5,_0x117489){const _0x8c682b=_0x25789e;if(this[_0x8c682b(0x575)]!==_0x8a0aa0||this[_0x8c682b(0x983)]!==_0x12bdb5){if('vAVhb'!=='vAVhb'){const _0x483ba7=this['_viewportSize'],_0x126779=this[_0x8c682b(0x203)],_0x2696a3=this['_animation'][_0x8c682b(0x92d)]*(this['_mirror']?-0x1:0x1)-_0x483ba7/0x2,_0x25d088=this[_0x8c682b(0xff)]['offsetY']-_0x126779/0x2,_0x45b13f=this[_0x8c682b(0x761)](_0x1138d6);_0x1edd4c['gl'][_0x8c682b(0x53b)](_0x2696a3+_0x45b13f['x'],_0x25d088+_0x45b13f['y'],_0x483ba7,_0x126779);}else this[_0x8c682b(0x8f5)]('Linear'),this[_0x8c682b(0x5ab)]=_0x117489;}VisuMZ[_0x8c682b(0xf9)][_0x8c682b(0x60b)][_0x8c682b(0x800)](this,_0x8a0aa0,_0x12bdb5,_0x117489);},Sprite_Battler['prototype'][_0x25789e(0x8f5)]=function(_0x555bba){const _0x27866d=_0x25789e;this[_0x27866d(0x963)]=_0x555bba;},Sprite_Battler[_0x25789e(0x866)]['updateMove']=function(){const _0x26d89e=_0x25789e;if(this[_0x26d89e(0xcc)]<=0x0)return;const _0x4737d8=this[_0x26d89e(0xcc)],_0x38942d=this[_0x26d89e(0x5ab)],_0x3466d5=this['_moveEasingType'];this[_0x26d89e(0x2c5)]=this[_0x26d89e(0x393)](this[_0x26d89e(0x2c5)],this['_targetOffsetX'],_0x4737d8,_0x38942d,_0x3466d5),this['_offsetY']=this[_0x26d89e(0x393)](this['_offsetY'],this[_0x26d89e(0x983)],_0x4737d8,_0x38942d,_0x3466d5),this[_0x26d89e(0xcc)]--;if(this[_0x26d89e(0xcc)]<=0x0)this[_0x26d89e(0x8df)]();},Sprite_Battler['prototype'][_0x25789e(0x393)]=function(_0x14239d,_0x32e926,_0x3221aa,_0x59c61b,_0x5d2401){const _0x365df8=_0x25789e,_0x1f8d5b=VisuMZ[_0x365df8(0x8d0)]((_0x59c61b-_0x3221aa)/_0x59c61b,_0x5d2401||_0x365df8(0x22d)),_0x2ef4be=VisuMZ[_0x365df8(0x8d0)]((_0x59c61b-_0x3221aa+0x1)/_0x59c61b,_0x5d2401||_0x365df8(0x22d)),_0x5286c5=(_0x14239d-_0x32e926*_0x1f8d5b)/(0x1-_0x1f8d5b);return _0x5286c5+(_0x32e926-_0x5286c5)*_0x2ef4be;},VisuMZ[_0x25789e(0xf9)]['Sprite_Actor_setActorHome']=Sprite_Actor[_0x25789e(0x866)]['setActorHome'],Sprite_Actor[_0x25789e(0x866)]['setActorHome']=function(_0x104c36){const _0x5786d6=_0x25789e;VisuMZ[_0x5786d6(0xf9)][_0x5786d6(0x59c)]['UI']['RepositionActors']?this[_0x5786d6(0x99)](_0x104c36):VisuMZ[_0x5786d6(0xf9)][_0x5786d6(0x9f0)][_0x5786d6(0x800)](this,_0x104c36);},Sprite_Actor[_0x25789e(0x866)][_0x25789e(0x99)]=function(_0x20510b){const _0x2db62a=_0x25789e;let _0x3cac31=Math[_0x2db62a(0x997)](Graphics[_0x2db62a(0x59d)]/0x2+0xc0);_0x3cac31-=Math[_0x2db62a(0x36f)]((Graphics[_0x2db62a(0x59d)]-Graphics[_0x2db62a(0x381)])/0x2),_0x3cac31+=_0x20510b*0x20;let _0x3b8969=Graphics[_0x2db62a(0x844)]-0xc8-$gameParty[_0x2db62a(0x93d)]()*0x30;_0x3b8969-=Math[_0x2db62a(0x36f)]((Graphics[_0x2db62a(0x844)]-Graphics['boxHeight'])/0x2),_0x3b8969+=_0x20510b*0x30,this[_0x2db62a(0x4ea)](_0x3cac31,_0x3b8969);},Sprite_Actor['prototype'][_0x25789e(0x72f)]=function(){this['startMove'](0x4b0,0x0,0x78);},Sprite_Animation['prototype'][_0x25789e(0x355)]=function(_0x5b5fe6){const _0x3c9dc6=_0x25789e;this[_0x3c9dc6(0xcb)]=_0x5b5fe6;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x826)]=Sprite_Animation['prototype'][_0x25789e(0x213)],Sprite_Animation[_0x25789e(0x866)][_0x25789e(0x213)]=function(){const _0x2746e4=_0x25789e;if(this[_0x2746e4(0xcb)])return;VisuMZ[_0x2746e4(0xf9)][_0x2746e4(0x826)][_0x2746e4(0x800)](this);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x6b2)]=Sprite_Animation[_0x25789e(0x866)][_0x25789e(0x20a)],Sprite_Animation[_0x25789e(0x866)][_0x25789e(0x20a)]=function(_0x1ccc11){const _0x430375=_0x25789e;this['isAnimationOffsetXMirrored']()?'KkDhk'!==_0x430375(0x922)?(this['centerCameraCheckData']()[_0x430375(0x93a)]&&(this[_0x430375(0x7a9)]=this[_0x430375(0x17f)]()[_0x430375(0x9ee)]),this[_0x430375(0x17f)]()['centerY']&&(this[_0x430375(0x895)]=this[_0x430375(0x17f)]()['displayY'])):this[_0x430375(0x504)](_0x1ccc11):_0x430375(0x84c)!==_0x430375(0x567)?VisuMZ['CoreEngine']['Sprite_Animation_setViewport'][_0x430375(0x800)](this,_0x1ccc11):_0x13b687[_0x430375(0x29a)](_0x2f0a54);},Sprite_Animation[_0x25789e(0x866)]['isAnimationOffsetXMirrored']=function(){const _0x17afe0=_0x25789e;if(!this[_0x17afe0(0xff)])return![];const _0x4a0e4c=this[_0x17afe0(0xff)][_0x17afe0(0x126)]||'';if(_0x4a0e4c[_0x17afe0(0x8af)](/<MIRROR OFFSET X>/i))return!![];if(_0x4a0e4c[_0x17afe0(0x8af)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x17afe0(0xf9)][_0x17afe0(0x59c)][_0x17afe0(0x25e)][_0x17afe0(0x528)];},Sprite_Animation[_0x25789e(0x866)]['setViewportCoreEngineFix']=function(_0x4b6958){const _0x185c81=_0x25789e,_0xbd2bbc=this['_viewportSize'],_0x31a41b=this[_0x185c81(0x203)],_0x439408=this[_0x185c81(0xff)][_0x185c81(0x92d)]*(this[_0x185c81(0x4a2)]?-0x1:0x1)-_0xbd2bbc/0x2,_0x53724f=this[_0x185c81(0xff)][_0x185c81(0x639)]-_0x31a41b/0x2,_0x446542=this['targetPosition'](_0x4b6958);_0x4b6958['gl'][_0x185c81(0x53b)](_0x439408+_0x446542['x'],_0x53724f+_0x446542['y'],_0xbd2bbc,_0x31a41b);},Sprite_Animation['prototype'][_0x25789e(0x9d8)]=function(_0x24e5a8){const _0x44fd67=_0x25789e;if(_0x24e5a8[_0x44fd67(0x471)]){}const _0x3365a7=this['_animation'][_0x44fd67(0x126)];let _0x13fe90=_0x24e5a8[_0x44fd67(0x844)]*_0x24e5a8['scale']['y'],_0x3dafcf=0x0,_0x4d40e0=-_0x13fe90/0x2;if(_0x3365a7[_0x44fd67(0x8af)](/<(?:HEAD|HEADER|TOP)>/i))_0x4d40e0=-_0x13fe90;if(_0x3365a7[_0x44fd67(0x8af)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x4d40e0=0x0;if(this[_0x44fd67(0xff)][_0x44fd67(0x1cf)])_0x4d40e0=0x0;if(_0x3365a7[_0x44fd67(0x8af)](/<(?:LEFT)>/i))_0x3dafcf=-_0x24e5a8['width']/0x2;if(_0x3365a7[_0x44fd67(0x8af)](/<(?:RIGHT)>/i))_0x3dafcf=_0x24e5a8[_0x44fd67(0x59d)]/0x2;_0x3365a7[_0x44fd67(0x8af)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x3dafcf=Number(RegExp['$1'])*_0x24e5a8[_0x44fd67(0x59d)]);_0x3365a7['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x4d40e0=(0x1-Number(RegExp['$1']))*-_0x13fe90);_0x3365a7[_0x44fd67(0x8af)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x3dafcf=Number(RegExp['$1'])*_0x24e5a8[_0x44fd67(0x59d)],_0x4d40e0=(0x1-Number(RegExp['$2']))*-_0x13fe90);if(_0x3365a7['match'](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x3dafcf+=Number(RegExp['$1']);if(_0x3365a7[_0x44fd67(0x8af)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x4d40e0+=Number(RegExp['$1']);_0x3365a7[_0x44fd67(0x8af)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x3dafcf+=Number(RegExp['$1']),_0x4d40e0+=Number(RegExp['$2']));const _0x57203a=new Point(_0x3dafcf,_0x4d40e0);return _0x24e5a8[_0x44fd67(0x99c)](),_0x24e5a8[_0x44fd67(0x2ee)]['apply'](_0x57203a);},Sprite_AnimationMV[_0x25789e(0x866)]['setupRate']=function(){const _0x4d3b7e=_0x25789e;this['_rate']=VisuMZ['CoreEngine']['Settings'][_0x4d3b7e(0x25e)][_0x4d3b7e(0x514)]??0x4,this[_0x4d3b7e(0x1b2)](),this[_0x4d3b7e(0x49e)]=this['_rate'][_0x4d3b7e(0x68d)](0x1,0xa);},Sprite_AnimationMV['prototype'][_0x25789e(0x1b2)]=function(){const _0x58243a=_0x25789e;if(!this[_0x58243a(0xff)]);const _0x3feef2=this['_animation'][_0x58243a(0x126)]||'';_0x3feef2[_0x58243a(0x8af)](/<RATE:[ ](\d+)>/i)&&(this[_0x58243a(0x49e)]=(Number(RegExp['$1'])||0x1)[_0x58243a(0x68d)](0x1,0xa));},Sprite_AnimationMV['prototype'][_0x25789e(0x355)]=function(_0x568ff0){const _0x23103b=_0x25789e;this[_0x23103b(0xcb)]=_0x568ff0;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x879)]=Sprite_AnimationMV[_0x25789e(0x866)][_0x25789e(0x135)],Sprite_AnimationMV[_0x25789e(0x866)][_0x25789e(0x135)]=function(_0x5db5da){const _0x3ae436=_0x25789e;this[_0x3ae436(0xcb)]&&(_0x5db5da=JsonEx['makeDeepCopy'](_0x5db5da),_0x5db5da['se']&&(_0x5db5da['se'][_0x3ae436(0x745)]=0x0)),VisuMZ[_0x3ae436(0xf9)]['Sprite_AnimationMV_processTimingData'][_0x3ae436(0x800)](this,_0x5db5da);},VisuMZ[_0x25789e(0xf9)]['Sprite_AnimationMV_updatePosition']=Sprite_AnimationMV[_0x25789e(0x866)]['updatePosition'],Sprite_AnimationMV[_0x25789e(0x866)][_0x25789e(0x1a2)]=function(){const _0x40fbd5=_0x25789e;VisuMZ[_0x40fbd5(0xf9)][_0x40fbd5(0x86c)][_0x40fbd5(0x800)](this);if(this[_0x40fbd5(0xff)]['position']===0x3){if(this['x']===0x0)this['x']=Math[_0x40fbd5(0x997)](Graphics['width']/0x2);if(this['y']===0x0)this['y']=Math[_0x40fbd5(0x997)](Graphics[_0x40fbd5(0x844)]/0x2);}},Sprite_Damage['prototype'][_0x25789e(0x806)]=function(_0x570174){const _0x21c132=_0x25789e;let _0x70b5e1=Math[_0x21c132(0x546)](_0x570174)[_0x21c132(0x744)]();if(this[_0x21c132(0x139)]()){if(_0x21c132(0x245)!=='pdkSL'){const _0x422d64=this[_0x21c132(0x586)],_0x9ea051=_0x422d64['easingType'],_0x33fccd=_0x422d64[_0x21c132(0x649)],_0x5cfd1a=_0x422d64[_0x21c132(0x2cd)],_0x324852=_0x4b14e8[_0x21c132(0x8d0)]((_0x5cfd1a-_0x33fccd)/_0x5cfd1a,_0x9ea051),_0x3e25d1=_0x40c2f2[_0x21c132(0x8d0)]((_0x5cfd1a-_0x33fccd+0x1)/_0x5cfd1a,_0x9ea051),_0x28c744=(_0x4977ce-_0x301492*_0x324852)/(0x1-_0x324852);return _0x28c744+(_0x36a91e-_0x28c744)*_0x3e25d1;}else _0x70b5e1=VisuMZ[_0x21c132(0x441)](_0x70b5e1);}const _0x355b96=this[_0x21c132(0x92c)](),_0x58fd40=Math['floor'](_0x355b96*0.75);for(let _0x2119b3=0x0;_0x2119b3<_0x70b5e1['length'];_0x2119b3++){const _0x42343c=this[_0x21c132(0x15e)](_0x58fd40,_0x355b96);_0x42343c[_0x21c132(0x6d6)][_0x21c132(0x44a)](_0x70b5e1[_0x2119b3],0x0,0x0,_0x58fd40,_0x355b96,_0x21c132(0x8fd)),_0x42343c['x']=(_0x2119b3-(_0x70b5e1[_0x21c132(0x73d)]-0x1)/0x2)*_0x58fd40,_0x42343c['dy']=-_0x2119b3;}},Sprite_Damage[_0x25789e(0x866)]['useDigitGrouping']=function(){const _0x1cce37=_0x25789e;return VisuMZ[_0x1cce37(0xf9)][_0x1cce37(0x59c)]['QoL'][_0x1cce37(0x36e)];},Sprite_Damage[_0x25789e(0x866)][_0x25789e(0x360)]=function(){const _0x16e2a6=_0x25789e;return ColorManager[_0x16e2a6(0x19b)]();},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x4b3)]=Sprite_Gauge['prototype'][_0x25789e(0xc4)],Sprite_Gauge[_0x25789e(0x866)][_0x25789e(0xc4)]=function(){const _0x32017b=_0x25789e;return VisuMZ[_0x32017b(0xf9)][_0x32017b(0x4b3)][_0x32017b(0x800)](this)[_0x32017b(0x68d)](0x0,0x1);},VisuMZ['CoreEngine'][_0x25789e(0x5ce)]=Sprite_Gauge['prototype'][_0x25789e(0x75b)],Sprite_Gauge[_0x25789e(0x866)][_0x25789e(0x75b)]=function(){const _0x577ca6=_0x25789e;let _0x591a8b=VisuMZ[_0x577ca6(0xf9)]['Sprite_Gauge_currentValue'][_0x577ca6(0x800)](this);return _0x591a8b;},Sprite_Gauge[_0x25789e(0x866)][_0x25789e(0x7f2)]=function(){const _0x297887=_0x25789e;let _0x2994a6=this[_0x297887(0x75b)]();if(this[_0x297887(0x139)]()){if(_0x297887(0x691)!=='USccs')_0x2994a6=VisuMZ[_0x297887(0x441)](_0x2994a6);else{this['_lastOrigin']=_0x297887(0x6dd),this[_0x297887(0x446)]=_0x297887(0x6dd),this['_lastY']=_0x297887(0x6dd);const _0x4013de=this[_0x297887(0x69e)]();_0x378b96[_0x297887(0x866)][_0x297887(0x928)][_0x297887(0x800)](this,_0x4013de),this[_0x297887(0x615)](0x2);}}const _0x4c6ef4=this['bitmapWidth']()-0x1,_0xb78c1f=this[_0x297887(0x8d6)]?this[_0x297887(0x8d6)]():this['bitmapHeight']();this['setupValueFont'](),this[_0x297887(0x6d6)]['drawText'](_0x2994a6,0x0,0x0,_0x4c6ef4,_0xb78c1f,_0x297887(0xe9));},Sprite_Gauge['prototype'][_0x25789e(0x160)]=function(){return 0x3;},Sprite_Gauge[_0x25789e(0x866)]['useDigitGrouping']=function(){const _0x5b9f9b=_0x25789e;return VisuMZ[_0x5b9f9b(0xf9)][_0x5b9f9b(0x59c)][_0x5b9f9b(0x25e)][_0x5b9f9b(0x3cd)];},Sprite_Gauge[_0x25789e(0x866)][_0x25789e(0x360)]=function(){const _0x162a44=_0x25789e;return ColorManager[_0x162a44(0x9a5)]();},VisuMZ[_0x25789e(0xf9)]['Sprite_Picture_loadBitmap']=Sprite_Picture[_0x25789e(0x866)][_0x25789e(0x636)],Sprite_Picture['prototype']['loadBitmap']=function(){const _0xfb1e83=_0x25789e;if(this[_0xfb1e83(0x3ad)]&&this[_0xfb1e83(0x3ad)][_0xfb1e83(0x8af)](/VisuMZ CoreEngine PictureIcon (\d+)/i))_0xfb1e83(0x4f9)!==_0xfb1e83(0x4f9)?this[_0xfb1e83(0x71d)][_0xfb1e83(0x615)](_0x4f80e5[_0xfb1e83(0xe4)][_0xfb1e83(0x6cd)]):this[_0xfb1e83(0x225)](Number(RegExp['$1']));else{if(_0xfb1e83(0x3bc)===_0xfb1e83(0x3bc))VisuMZ[_0xfb1e83(0xf9)][_0xfb1e83(0x60d)][_0xfb1e83(0x800)](this);else return _0x1f9359[_0xfb1e83(0x350)]([_0xfb1e83(0x4c2)]);}},Sprite_Picture[_0x25789e(0x866)][_0x25789e(0x225)]=function(_0x3e8bff){const _0x231ac1=_0x25789e,_0x2086a4=ImageManager[_0x231ac1(0x34f)],_0x39dfda=ImageManager[_0x231ac1(0xd0)],_0x49c789=this['_pictureName'][_0x231ac1(0x8af)](/SMOOTH/i);this[_0x231ac1(0x6d6)]=new Bitmap(_0x2086a4,_0x39dfda);const _0x1cd346=ImageManager[_0x231ac1(0x508)](_0x231ac1(0x1c9)),_0x30939d=_0x3e8bff%0x10*_0x2086a4,_0x37890a=Math[_0x231ac1(0x36f)](_0x3e8bff/0x10)*_0x39dfda;this[_0x231ac1(0x6d6)][_0x231ac1(0x38d)]=_0x49c789,this['bitmap'][_0x231ac1(0x408)](_0x1cd346,_0x30939d,_0x37890a,_0x2086a4,_0x39dfda,0x0,0x0,_0x2086a4,_0x39dfda);};function Sprite_TitlePictureButton(){const _0x1ed1c4=_0x25789e;this[_0x1ed1c4(0x928)](...arguments);}Sprite_TitlePictureButton[_0x25789e(0x866)]=Object[_0x25789e(0x468)](Sprite_Clickable[_0x25789e(0x866)]),Sprite_TitlePictureButton[_0x25789e(0x866)][_0x25789e(0x49f)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x25789e(0x866)][_0x25789e(0x928)]=function(_0x3fac21){const _0x53ead3=_0x25789e;Sprite_Clickable[_0x53ead3(0x866)]['initialize'][_0x53ead3(0x800)](this),this[_0x53ead3(0x460)]=_0x3fac21,this[_0x53ead3(0x1c1)]=null,this[_0x53ead3(0x21a)]();},Sprite_TitlePictureButton[_0x25789e(0x866)][_0x25789e(0x21a)]=function(){const _0x3a0d06=_0x25789e;this['x']=Graphics[_0x3a0d06(0x59d)],this['y']=Graphics[_0x3a0d06(0x844)],this[_0x3a0d06(0x106)]=![],this[_0x3a0d06(0x5e6)]();},Sprite_TitlePictureButton['prototype'][_0x25789e(0x5e6)]=function(){const _0x3c1f47=_0x25789e;this[_0x3c1f47(0x6d6)]=ImageManager[_0x3c1f47(0x775)](this[_0x3c1f47(0x460)]['PictureFilename']),this[_0x3c1f47(0x6d6)][_0x3c1f47(0x880)](this[_0x3c1f47(0x752)][_0x3c1f47(0x53d)](this));},Sprite_TitlePictureButton[_0x25789e(0x866)][_0x25789e(0x752)]=function(){const _0xdc00bc=_0x25789e;this['_data'][_0xdc00bc(0x41d)][_0xdc00bc(0x800)](this),this[_0xdc00bc(0x460)]['PositionJS']['call'](this),this[_0xdc00bc(0x187)](this[_0xdc00bc(0x460)][_0xdc00bc(0x79d)][_0xdc00bc(0x53d)](this));},Sprite_TitlePictureButton[_0x25789e(0x866)]['update']=function(){const _0x3fa14d=_0x25789e;Sprite_Clickable['prototype']['update'][_0x3fa14d(0x800)](this),this[_0x3fa14d(0x7de)](),this[_0x3fa14d(0x127)]();},Sprite_TitlePictureButton[_0x25789e(0x866)][_0x25789e(0x8b0)]=function(){const _0x4231be=_0x25789e;return VisuMZ[_0x4231be(0xf9)][_0x4231be(0x59c)][_0x4231be(0x539)]['Title'][_0x4231be(0x89f)];},Sprite_TitlePictureButton['prototype'][_0x25789e(0x7de)]=function(){const _0x448b72=_0x25789e;this['_pressed']||this[_0x448b72(0x500)]?_0x448b72(0x13e)===_0x448b72(0x31f)?(_0x467c8b[_0x448b72(0x927)](_0x448b72(0x677)),_0x4c14f1[_0x448b72(0x927)](_0x15440)):this[_0x448b72(0x555)]=0xff:(this[_0x448b72(0x555)]+=this[_0x448b72(0x106)]?this['fadeSpeed']():-0x1*this[_0x448b72(0x8b0)](),this[_0x448b72(0x555)]=Math[_0x448b72(0x16b)](0xc0,this[_0x448b72(0x555)]));},Sprite_TitlePictureButton[_0x25789e(0x866)][_0x25789e(0x187)]=function(_0x28f01a){this['_clickHandler']=_0x28f01a;},Sprite_TitlePictureButton['prototype']['onClick']=function(){const _0x319eb1=_0x25789e;this[_0x319eb1(0x1c1)]&&('JlNem'===_0x319eb1(0x399)?this[_0x319eb1(0x1c1)]():this[_0x319eb1(0x29e)]=_0x319eb1(0x43b));},VisuMZ['CoreEngine'][_0x25789e(0x1f7)]=Spriteset_Base['prototype'][_0x25789e(0x928)],Spriteset_Base[_0x25789e(0x866)]['initialize']=function(){const _0x863a18=_0x25789e;VisuMZ[_0x863a18(0xf9)][_0x863a18(0x1f7)]['call'](this),this[_0x863a18(0x949)]();},Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x949)]=function(){const _0x4446aa=_0x25789e;this[_0x4446aa(0x2b2)]=[],this[_0x4446aa(0x6ec)]=[],this[_0x4446aa(0x9d4)]=this['scale']['x'],this['_cacheScaleY']=this[_0x4446aa(0x24b)]['y'];},VisuMZ[_0x25789e(0xf9)]['Spriteset_Base_destroy']=Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x85c)],Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x85c)]=function(_0x46417d){const _0x3d31bc=_0x25789e;this[_0x3d31bc(0x52c)](),this['removeAllPointAnimations'](),VisuMZ[_0x3d31bc(0xf9)][_0x3d31bc(0x7eb)][_0x3d31bc(0x800)](this,_0x46417d);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x48b)]=Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x91c)],Spriteset_Base[_0x25789e(0x866)]['update']=function(){const _0x3e3a5f=_0x25789e;VisuMZ['CoreEngine'][_0x3e3a5f(0x48b)][_0x3e3a5f(0x800)](this),this[_0x3e3a5f(0x1be)](),this[_0x3e3a5f(0x2b0)](),this[_0x3e3a5f(0x9d7)](),this['updatePointAnimations']();},Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x1be)]=function(){},Spriteset_Base[_0x25789e(0x866)]['updatePictureAntiZoom']=function(){const _0x34cb64=_0x25789e;if(!VisuMZ[_0x34cb64(0xf9)][_0x34cb64(0x59c)]['QoL'][_0x34cb64(0x66a)])return;if(this[_0x34cb64(0x9d4)]===this[_0x34cb64(0x24b)]['x']&&this[_0x34cb64(0x488)]===this[_0x34cb64(0x24b)]['y'])return;this[_0x34cb64(0x3c8)](),this['_cacheScaleX']=this[_0x34cb64(0x24b)]['x'],this[_0x34cb64(0x488)]=this[_0x34cb64(0x24b)]['y'];},Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x3c8)]=function(){const _0x6da92c=_0x25789e;if(SceneManager[_0x6da92c(0x707)]()&&Spriteset_Map[_0x6da92c(0x23f)]){if(_0x6da92c(0x2b1)===_0x6da92c(0x2b1))return;else{let _0x489766=_0x6da92c(0x8cd)+_0x40bf66+_0x6da92c(0x703);if(this[_0x6da92c(0x770)](_0x489766))return this[_0x6da92c(0x26e)][_0x489766];return this['_cache'][_0x489766]=_0x66ed08['round'](_0xdd8cce[_0x6da92c(0xf9)]['Settings'][_0x6da92c(0x5c0)][_0x6da92c(0x5de)][_0x6da92c(0x800)](this,_0x239dfd)),this[_0x6da92c(0x26e)][_0x489766];}}else{if(SceneManager[_0x6da92c(0x94c)]()&&Spriteset_Battle[_0x6da92c(0x23f)]){if(_0x6da92c(0x53a)===_0x6da92c(0x8dc))return this[_0x6da92c(0x94b)]();else return;}}if(this['scale']['x']!==0x0){if('qWSPg'!==_0x6da92c(0x683))return _0x40f572[_0x6da92c(0x959)](_0x4ded7a,'[',']');else this[_0x6da92c(0x3e0)][_0x6da92c(0x24b)]['x']=0x1/this[_0x6da92c(0x24b)]['x'],this[_0x6da92c(0x3e0)]['x']=-(this['x']/this['scale']['x']);}this['scale']['y']!==0x0&&(_0x6da92c(0x568)!==_0x6da92c(0x568)?(_0x4866fd[_0x6da92c(0xf9)][_0x6da92c(0x9ba)][_0x6da92c(0x800)](this),this['setCoreEngineUpdateWindowBg']()):(this[_0x6da92c(0x3e0)][_0x6da92c(0x24b)]['y']=0x1/this[_0x6da92c(0x24b)]['y'],this[_0x6da92c(0x3e0)]['y']=-(this['y']/this[_0x6da92c(0x24b)]['y'])));},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x75e)]=Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x1a2)],Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x1a2)]=function(){const _0x5ea921=_0x25789e;VisuMZ[_0x5ea921(0xf9)][_0x5ea921(0x75e)][_0x5ea921(0x800)](this),this[_0x5ea921(0x1e1)]();},Spriteset_Base[_0x25789e(0x866)]['updatePositionCoreEngine']=function(){const _0x4c8e6e=_0x25789e;if(!$gameScreen)return;if($gameScreen[_0x4c8e6e(0x180)]<=0x0)return;this['x']-=Math[_0x4c8e6e(0x997)]($gameScreen['shake']());const _0x2c6960=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen[_0x4c8e6e(0x632)]()){case _0x4c8e6e(0x67a):this[_0x4c8e6e(0x46f)]();break;case'horizontal':this[_0x4c8e6e(0x465)]();break;case _0x4c8e6e(0x128):this[_0x4c8e6e(0x266)]();break;default:this[_0x4c8e6e(0x246)]();break;}},Spriteset_Base[_0x25789e(0x866)]['updatePositionCoreEngineShakeOriginal']=function(){const _0x25bb09=_0x25789e,_0x5e3c7a=VisuMZ['CoreEngine'][_0x25bb09(0x59c)][_0x25bb09(0x968)];if(_0x5e3c7a&&_0x5e3c7a['originalJS'])return _0x25bb09(0x64f)===_0x25bb09(0x64f)?_0x5e3c7a[_0x25bb09(0x893)][_0x25bb09(0x800)](this):_0x4ab6f2[_0x25bb09(0xe4)][_0x25bb09(0x242)][_0x25bb09(0x800)](this);this['x']+=Math[_0x25bb09(0x997)]($gameScreen[_0x25bb09(0x798)]());},Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x246)]=function(){const _0x3d1c9f=_0x25789e,_0x387475=VisuMZ[_0x3d1c9f(0xf9)][_0x3d1c9f(0x59c)][_0x3d1c9f(0x968)];if(_0x387475&&_0x387475[_0x3d1c9f(0x17c)])return _0x387475[_0x3d1c9f(0x17c)][_0x3d1c9f(0x800)](this);const _0x1f3aa0=$gameScreen[_0x3d1c9f(0x9cd)]*0.75,_0x15e99a=$gameScreen[_0x3d1c9f(0x7d2)]*0.6,_0x101d31=$gameScreen['_shakeDuration'];this['x']+=Math[_0x3d1c9f(0x997)](Math['randomInt'](_0x1f3aa0)-Math[_0x3d1c9f(0x915)](_0x15e99a))*(Math[_0x3d1c9f(0x16b)](_0x101d31,0x1e)*0.5),this['y']+=Math[_0x3d1c9f(0x997)](Math[_0x3d1c9f(0x915)](_0x1f3aa0)-Math[_0x3d1c9f(0x915)](_0x15e99a))*(Math[_0x3d1c9f(0x16b)](_0x101d31,0x1e)*0.5);},Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x465)]=function(){const _0x46a2af=_0x25789e,_0x480288=VisuMZ[_0x46a2af(0xf9)][_0x46a2af(0x59c)]['ScreenShake'];if(_0x480288&&_0x480288[_0x46a2af(0x676)]){if(_0x46a2af(0x470)===_0x46a2af(0x5d6)){this[_0x46a2af(0x8b7)]();const _0x516e92=this[_0x46a2af(0x42d)];_0x472fb6['CoreEngine'][_0x46a2af(0x4f3)]['call'](this),_0x516e92>0x0&&this[_0x46a2af(0x42d)]<=0x0&&(this['_x']=this['_targetX'],this['_y']=this[_0x46a2af(0x4c6)],this[_0x46a2af(0x202)]=this['_targetScaleX'],this[_0x46a2af(0x2c9)]=this[_0x46a2af(0x32f)],this[_0x46a2af(0x378)]=this[_0x46a2af(0x462)],this[_0x46a2af(0x9d5)]&&(this[_0x46a2af(0x9d5)]['x']=this['_targetAnchor']['x'],this['_anchor']['y']=this[_0x46a2af(0x950)]['y']));}else return _0x480288[_0x46a2af(0x676)][_0x46a2af(0x800)](this);}const _0x5a51fe=$gameScreen[_0x46a2af(0x9cd)]*0.75,_0x48c026=$gameScreen[_0x46a2af(0x7d2)]*0.6,_0x42b245=$gameScreen['_shakeDuration'];this['x']+=Math[_0x46a2af(0x997)](Math['randomInt'](_0x5a51fe)-Math['randomInt'](_0x48c026))*(Math[_0x46a2af(0x16b)](_0x42b245,0x1e)*0.5);},Spriteset_Base[_0x25789e(0x866)]['updatePositionCoreEngineShakeVert']=function(){const _0x5bea8c=_0x25789e,_0x1d6b2c=VisuMZ[_0x5bea8c(0xf9)][_0x5bea8c(0x59c)][_0x5bea8c(0x968)];if(_0x1d6b2c&&_0x1d6b2c['vertJS'])return _0x1d6b2c[_0x5bea8c(0x2d7)]['call'](this);const _0xef90b6=$gameScreen[_0x5bea8c(0x9cd)]*0.75,_0x129a88=$gameScreen['_shakeSpeed']*0.6,_0x38f0e5=$gameScreen[_0x5bea8c(0x180)];this['y']+=Math[_0x5bea8c(0x997)](Math[_0x5bea8c(0x915)](_0xef90b6)-Math[_0x5bea8c(0x915)](_0x129a88))*(Math[_0x5bea8c(0x16b)](_0x38f0e5,0x1e)*0.5);},Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x9d7)]=function(){const _0xfdddf8=_0x25789e;for(const _0x4cad07 of this[_0xfdddf8(0x2b2)]){if(_0xfdddf8(0x4d5)===_0xfdddf8(0x438)){if(_0x51f240['inBattle']())return;_0x14d69a['ConvertParams'](_0x3c6e73,_0x4411e9);const _0x49f9ac=_0x480129[_0xfdddf8(0x153)];if(_0x49f9ac[_0xfdddf8(0x8af)](/Front/i))_0xcb2908['setSideView'](![]);else _0x49f9ac[_0xfdddf8(0x8af)](/Side/i)?_0x284a0d[_0xfdddf8(0x6de)](!![]):_0x7c3ae4[_0xfdddf8(0x6de)](!_0x108246[_0xfdddf8(0x2af)]());}else!_0x4cad07[_0xfdddf8(0x813)]()&&this[_0xfdddf8(0x834)](_0x4cad07);}this[_0xfdddf8(0x81b)]();},Spriteset_Base['prototype'][_0x25789e(0x81b)]=function(){const _0x1483c7=_0x25789e;for(;;){const _0x3fc160=$gameTemp['retrieveFauxAnimation']();if(_0x3fc160){if('bNlNs'!==_0x1483c7(0x588)){if(_0x277904[_0x1483c7(0x254)]())_0xe7a54e[_0x1483c7(0x927)](_0x264c92);}else this[_0x1483c7(0x6f4)](_0x3fc160);}else{if(_0x1483c7(0x81d)!==_0x1483c7(0x304))break;else{_0x2c0f76[_0x1483c7(0xf9)]['ParseEnemyNotetags'][_0x1483c7(0x800)](this,_0x5ea599),_0x4370e4[_0x1483c7(0x98e)]=0x1;const _0x5c6529=_0x2bc4e7[_0x1483c7(0x881)];if(_0x5c6529[_0x1483c7(0x8af)](/<LEVEL:[ ](\d+)>/i))_0x22aef4[_0x1483c7(0x98e)]=_0x45ec3f(_0x438f1e['$1']);if(_0x5c6529[_0x1483c7(0x8af)](/<MAXHP:[ ](\d+)>/i))_0x5c4dbf[_0x1483c7(0x84a)][0x0]=_0x60f005(_0x4c3c07['$1']);if(_0x5c6529[_0x1483c7(0x8af)](/<MAXMP:[ ](\d+)>/i))_0x388e47[_0x1483c7(0x84a)][0x1]=_0x5b9832(_0x4b35aa['$1']);if(_0x5c6529[_0x1483c7(0x8af)](/<ATK:[ ](\d+)>/i))_0xc4cd48[_0x1483c7(0x84a)][0x2]=_0x6e51b2(_0x53db3c['$1']);if(_0x5c6529[_0x1483c7(0x8af)](/<DEF:[ ](\d+)>/i))_0x5999b4[_0x1483c7(0x84a)][0x3]=_0x560920(_0x4e0934['$1']);if(_0x5c6529[_0x1483c7(0x8af)](/<MAT:[ ](\d+)>/i))_0x4d63bf[_0x1483c7(0x84a)][0x4]=_0x212f23(_0x344526['$1']);if(_0x5c6529['match'](/<MDF:[ ](\d+)>/i))_0x5bd413[_0x1483c7(0x84a)][0x5]=_0x8182b3(_0x7d0e2e['$1']);if(_0x5c6529[_0x1483c7(0x8af)](/<AGI:[ ](\d+)>/i))_0x1a976b[_0x1483c7(0x84a)][0x6]=_0x526d51(_0x36cd83['$1']);if(_0x5c6529[_0x1483c7(0x8af)](/<LUK:[ ](\d+)>/i))_0x328d22[_0x1483c7(0x84a)][0x7]=_0x2a1252(_0x7fb0ba['$1']);if(_0x5c6529['match'](/<EXP:[ ](\d+)>/i))_0xdf5001['exp']=_0x1263ef(_0x5868cb['$1']);if(_0x5c6529[_0x1483c7(0x8af)](/<GOLD:[ ](\d+)>/i))_0x25150c[_0x1483c7(0xa4)]=_0x308d1f(_0x2c1468['$1']);}}}},Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x6f4)]=function(_0x28e5a1){const _0x2be57e=_0x25789e,_0x23f7e8=$dataAnimations[_0x28e5a1[_0x2be57e(0x1f1)]],_0x4ecfdb=_0x28e5a1[_0x2be57e(0x13f)],_0x2d2433=_0x28e5a1[_0x2be57e(0x424)],_0x3281d2=_0x28e5a1['mute'];let _0x4b24fb=this[_0x2be57e(0x53e)]();const _0x54500e=this[_0x2be57e(0x851)]();if(this[_0x2be57e(0x47d)](_0x23f7e8)){if('ROHSW'!==_0x2be57e(0x58d))for(const _0x56b9f5 of _0x4ecfdb){this['createFauxAnimationSprite']([_0x56b9f5],_0x23f7e8,_0x2d2433,_0x4b24fb,_0x3281d2),_0x4b24fb+=_0x54500e;}else return _0x2da556[_0x2be57e(0xf9)]['Settings'][_0x2be57e(0x539)]['Title'][_0x2be57e(0x89f)];}else{if(_0x2be57e(0x9fa)!=='vSthN'){if(this[_0x2be57e(0x26d)]===_0x2be57e(0x715)&&!_0x2b095a[_0x2be57e(0x1d6)]())return;if(_0x1e6160['isNumpadPressed']())return;_0x37dfb4[_0x2be57e(0xf9)][_0x2be57e(0x887)][_0x2be57e(0x800)](this,_0x41490b),this[_0x2be57e(0x8f4)]('default');}else this[_0x2be57e(0x790)](_0x4ecfdb,_0x23f7e8,_0x2d2433,_0x4b24fb,_0x3281d2);}},Spriteset_Base['prototype']['createAnimationSprite']=function(_0x816486,_0x1f8384,_0x293e03,_0x242e68){const _0x437b72=_0x25789e,_0x3147d2=this[_0x437b72(0x1c4)](_0x1f8384),_0x313411=new(_0x3147d2?Sprite_AnimationMV:Sprite_Animation)(),_0x58327c=this[_0x437b72(0x624)](_0x816486),_0x28d0f5=this['animationBaseDelay'](),_0x4cd05d=_0x242e68>_0x28d0f5?this[_0x437b72(0x2aa)]():null;this[_0x437b72(0x3f4)](_0x816486[0x0])&&(_0x293e03=!_0x293e03),_0x313411[_0x437b72(0x3f2)]=_0x816486,_0x313411[_0x437b72(0x21a)](_0x58327c,_0x1f8384,_0x293e03,_0x242e68,_0x4cd05d),this[_0x437b72(0x27a)](_0x313411),this[_0x437b72(0x447)][_0x437b72(0x5b2)](_0x313411);},Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x790)]=function(_0x3343cf,_0x3b7cdc,_0x56ce9a,_0x51dab1,_0x45888f){const _0x3db5f5=_0x25789e,_0x2a9e0e=this[_0x3db5f5(0x1c4)](_0x3b7cdc),_0x315709=new(_0x2a9e0e?Sprite_AnimationMV:Sprite_Animation)(),_0x1c5855=this[_0x3db5f5(0x624)](_0x3343cf);this['animationShouldMirror'](_0x3343cf[0x0])&&(_0x56ce9a=!_0x56ce9a);_0x315709[_0x3db5f5(0x3f2)]=_0x3343cf,_0x315709[_0x3db5f5(0x21a)](_0x1c5855,_0x3b7cdc,_0x56ce9a,_0x51dab1),_0x315709[_0x3db5f5(0x355)](_0x45888f),this[_0x3db5f5(0x27a)](_0x315709);if(this[_0x3db5f5(0x447)])this[_0x3db5f5(0x447)][_0x3db5f5(0x253)](_0x315709);this[_0x3db5f5(0x2b2)][_0x3db5f5(0x5b2)](_0x315709);},Spriteset_Base['prototype'][_0x25789e(0x27a)]=function(_0x19be38){const _0x2ea79d=_0x25789e;this[_0x2ea79d(0x868)][_0x2ea79d(0x99d)](_0x19be38);},Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x869)]=function(_0x159859){const _0x2bd2bb=_0x25789e;this[_0x2bd2bb(0x447)][_0x2bd2bb(0x253)](_0x159859),this[_0x2bd2bb(0xb8)](_0x159859);for(const _0x207b61 of _0x159859[_0x2bd2bb(0x3f2)]){_0x207b61['endAnimation']&&_0x207b61[_0x2bd2bb(0x872)]();}_0x159859[_0x2bd2bb(0x85c)]();},Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x834)]=function(_0x16d1d2){const _0x1f998d=_0x25789e;this[_0x1f998d(0x2b2)][_0x1f998d(0x253)](_0x16d1d2),this['removeAnimationFromContainer'](_0x16d1d2);for(const _0xfa40d5 of _0x16d1d2[_0x1f998d(0x3f2)]){if('tWpyR'!==_0x1f998d(0x974)){if(_0xfa40d5[_0x1f998d(0x872)]){if(_0x1f998d(0x40e)===_0x1f998d(0x40e))_0xfa40d5['endAnimation']();else return'';}}else this['_colorCache'][_0x541bdc]=_0x1f998d(0x32a)[_0x1f998d(0x3a8)](_0x3533e0(_0x4eb1d8['$1']));}_0x16d1d2[_0x1f998d(0x85c)]();},Spriteset_Base[_0x25789e(0x866)][_0x25789e(0xb8)]=function(_0x422dd2){const _0x5e6299=_0x25789e;this[_0x5e6299(0x868)]['removeChild'](_0x422dd2);},Spriteset_Base[_0x25789e(0x866)]['removeAllFauxAnimations']=function(){const _0xd2ac57=_0x25789e;for(const _0x170652 of this[_0xd2ac57(0x2b2)]){this['removeFauxAnimation'](_0x170652);}},Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x26f)]=function(){const _0x5dd677=_0x25789e;return this['_fauxAnimationSprites'][_0x5dd677(0x73d)]>0x0;},Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x6af)]=function(){const _0x2da63b=_0x25789e;for(const _0x358c98 of this[_0x2da63b(0x6ec)]){!_0x358c98[_0x2da63b(0x813)]()&&this[_0x2da63b(0x419)](_0x358c98);}this[_0x2da63b(0x9dc)]();},Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x9dc)]=function(){const _0x248577=_0x25789e;for(;;){if('IlWqw'===_0x248577(0x6fa))_0x58f6af[_0x248577(0x8d7)]&&(this[_0x248577(0x29e)]=_0x248577(0x33f));else{const _0x2b90b9=$gameTemp[_0x248577(0x1eb)]();if(_0x2b90b9)this[_0x248577(0x214)](_0x2b90b9);else{if('KxgME'===_0x248577(0x411))_0x181332[_0x248577(0xf9)][_0x248577(0x5ec)][_0x248577(0x800)](this),this['initVisuMZCoreEngine']();else break;}}}},Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x214)]=function(_0x5aa10d){const _0x42fdaf=_0x25789e,_0x147672=$dataAnimations[_0x5aa10d[_0x42fdaf(0x1f1)]],_0x704926=this[_0x42fdaf(0x40a)](_0x5aa10d),_0x28fce1=_0x5aa10d[_0x42fdaf(0x424)],_0x5c9ebe=_0x5aa10d[_0x42fdaf(0x251)];let _0x57653d=this['animationBaseDelay']();const _0x5193a9=this[_0x42fdaf(0x851)]();if(this[_0x42fdaf(0x47d)](_0x147672))for(const _0x5585a4 of _0x704926){_0x42fdaf(0x9a7)===_0x42fdaf(0x9a7)?(this[_0x42fdaf(0x792)]([_0x5585a4],_0x147672,_0x28fce1,_0x57653d,_0x5c9ebe),_0x57653d+=_0x5193a9):(this[_0x42fdaf(0x6b5)](),_0x4a75e5[_0x42fdaf(0x66f)](),this[_0x42fdaf(0x26d)]===_0x42fdaf(0x5bf)?this['select'](0x0):this[_0x42fdaf(0x7a6)](-0x1));}else{if('NJgFH'!==_0x42fdaf(0x839)){if(_0x24d1ac['inBattle']())return![];return this['onlyfilename']()&&this[_0x42fdaf(0x8b1)]()['charAt'](0x0)==='!';}else this[_0x42fdaf(0x792)](_0x704926,_0x147672,_0x28fce1,_0x57653d,_0x5c9ebe);}},Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x40a)]=function(_0x5e6150){const _0x17f97c=_0x25789e,_0xd2c86e=new Sprite_Clickable(),_0x215ae9=this['getPointAnimationLayer']();_0xd2c86e['x']=_0x5e6150['x']-_0x215ae9['x'],_0xd2c86e['y']=_0x5e6150['y']-_0x215ae9['y'],_0xd2c86e['z']=0x64;const _0x5a02e0=this[_0x17f97c(0x544)]();return _0x5a02e0[_0x17f97c(0x99d)](_0xd2c86e),[_0xd2c86e];},Spriteset_Base[_0x25789e(0x866)]['getPointAnimationLayer']=function(){return this;},Spriteset_Map[_0x25789e(0x866)][_0x25789e(0x544)]=function(){return this['_tilemap']||this;},Spriteset_Battle[_0x25789e(0x866)][_0x25789e(0x544)]=function(){const _0x40ff87=_0x25789e;return this[_0x40ff87(0x5d7)]||this;},Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x792)]=function(_0x52dd5e,_0x2c5d7b,_0x5d6090,_0x32541e,_0x2e0852){const _0x831e0e=_0x25789e,_0x1a3c50=this[_0x831e0e(0x1c4)](_0x2c5d7b),_0x50a7af=new(_0x1a3c50?Sprite_AnimationMV:Sprite_Animation)();_0x50a7af[_0x831e0e(0x3f2)]=_0x52dd5e,_0x50a7af[_0x831e0e(0x21a)](_0x52dd5e,_0x2c5d7b,_0x5d6090,_0x32541e),_0x50a7af['setMute'](_0x2e0852),this[_0x831e0e(0x27a)](_0x50a7af),this[_0x831e0e(0x6ec)][_0x831e0e(0x5b2)](_0x50a7af);},Spriteset_Base['prototype'][_0x25789e(0x419)]=function(_0x5205b2){const _0x574315=_0x25789e;this['_pointAnimationSprites']['remove'](_0x5205b2),this[_0x574315(0x868)][_0x574315(0x2a0)](_0x5205b2);for(const _0x97874a of _0x5205b2['targetObjects']){if(_0x574315(0x71b)==='untab'){if(_0x97874a[_0x574315(0x872)]){if(_0x574315(0x746)!==_0x574315(0xa8))_0x97874a['endAnimation']();else{const _0x3c5ba0='_stored_expGaugeColor1';this['_colorCache']=this[_0x574315(0x7c5)]||{};if(this['_colorCache'][_0x3c5ba0])return this['_colorCache'][_0x3c5ba0];const _0x2c2d45=_0x3af074[_0x574315(0xf9)]['Settings'][_0x574315(0x9db)][_0x574315(0x61c)];return this[_0x574315(0x607)](_0x3c5ba0,_0x2c2d45);}}const _0x120149=this[_0x574315(0x544)]();if(_0x120149)_0x120149['removeChild'](_0x97874a);}else{if(!_0x1f3489['isPlaytest']())return;const _0x5e3429=_0x4cfcb0[_0x574315(0x2ae)]();_0x2cb177[_0x574315(0x67c)]&&_0x26790f[_0x574315(0x67c)]['writeText'](_0x5e3429);}}_0x5205b2['destroy']();},Spriteset_Base[_0x25789e(0x866)][_0x25789e(0x120)]=function(){const _0x2f4551=_0x25789e;for(const _0x3b5eba of this[_0x2f4551(0x6ec)]){if('JVITl'!==_0x2f4551(0x75a))return _0x26a29d['_forcedBattleSys'];else this[_0x2f4551(0x419)](_0x3b5eba);}},Spriteset_Base['prototype']['isPointAnimationPlaying']=function(){const _0x3ad85c=_0x25789e;return this[_0x3ad85c(0x6ec)][_0x3ad85c(0x73d)]>0x0;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x297)]=Spriteset_Base['prototype'][_0x25789e(0xfa)],Spriteset_Base[_0x25789e(0x866)][_0x25789e(0xfa)]=function(){const _0x2eda65=_0x25789e;return VisuMZ[_0x2eda65(0xf9)][_0x2eda65(0x297)]['call'](this)||this[_0x2eda65(0x5a8)]();},Spriteset_Map[_0x25789e(0x23f)]=VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)][_0x25789e(0x25e)][_0x25789e(0x831)]||![],VisuMZ['CoreEngine'][_0x25789e(0x6a5)]=Scene_Map['prototype']['createSpriteset'],Scene_Map[_0x25789e(0x866)][_0x25789e(0x44b)]=function(){const _0x5f1811=_0x25789e;VisuMZ['CoreEngine'][_0x5f1811(0x6a5)][_0x5f1811(0x800)](this);if(!Spriteset_Map[_0x5f1811(0x23f)])return;const _0x39d09e=this[_0x5f1811(0x63e)];if(!_0x39d09e)return;this[_0x5f1811(0x3e0)]=_0x39d09e[_0x5f1811(0x3e0)];if(!this['_pictureContainer'])return;this['addChild'](this[_0x5f1811(0x3e0)]);},Spriteset_Battle[_0x25789e(0x23f)]=VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)]['QoL'][_0x25789e(0x9c3)]||![],VisuMZ[_0x25789e(0xf9)][_0x25789e(0x1f6)]=Scene_Battle[_0x25789e(0x866)][_0x25789e(0x44b)],Scene_Battle[_0x25789e(0x866)][_0x25789e(0x44b)]=function(){const _0x42c506=_0x25789e;VisuMZ['CoreEngine'][_0x42c506(0x1f6)][_0x42c506(0x800)](this);if(!Spriteset_Battle[_0x42c506(0x23f)])return;const _0x36452b=this[_0x42c506(0x63e)];if(!_0x36452b)return;this[_0x42c506(0x3e0)]=_0x36452b['_pictureContainer'];if(!this[_0x42c506(0x3e0)])return;this[_0x42c506(0x99d)](this[_0x42c506(0x3e0)]);},Spriteset_Battle[_0x25789e(0x866)]['createBackground']=function(){const _0x1b73a6=_0x25789e;this[_0x1b73a6(0x71f)]=new PIXI[(_0x1b73a6(0x4cd))][(_0x1b73a6(0x793))](clamp=!![]),this[_0x1b73a6(0x62f)]=new Sprite(),this[_0x1b73a6(0x62f)]['bitmap']=SceneManager[_0x1b73a6(0x1a6)](),this[_0x1b73a6(0x62f)][_0x1b73a6(0x4cd)]=[this[_0x1b73a6(0x71f)]],this[_0x1b73a6(0x407)][_0x1b73a6(0x99d)](this['_backgroundSprite']);},VisuMZ['CoreEngine'][_0x25789e(0xdb)]=Spriteset_Battle[_0x25789e(0x866)][_0x25789e(0x10b)],Spriteset_Battle[_0x25789e(0x866)][_0x25789e(0x10b)]=function(){const _0x13c9df=_0x25789e;this[_0x13c9df(0x221)]()&&this['repositionEnemiesByResolution'](),VisuMZ[_0x13c9df(0xf9)][_0x13c9df(0xdb)][_0x13c9df(0x800)](this);},Spriteset_Battle['prototype'][_0x25789e(0x221)]=function(){const _0x3d634a=_0x25789e,_0x395113=VisuMZ[_0x3d634a(0xf9)][_0x3d634a(0x59c)][_0x3d634a(0x599)];if(!_0x395113)return![];if(Utils['RPGMAKER_VERSION']>=_0x3d634a(0x4e0)&&!_0x395113['RepositionEnemies130'])return![];return _0x395113[_0x3d634a(0x235)];},Spriteset_Battle[_0x25789e(0x866)][_0x25789e(0x8ff)]=function(){for(member of $gameTroop['members']()){member['moveRelativeToResolutionChange']();}},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x700)]=Window_Base['prototype'][_0x25789e(0x928)],Window_Base[_0x25789e(0x866)][_0x25789e(0x928)]=function(_0x29c960){const _0x23a944=_0x25789e;_0x29c960['x']=Math['round'](_0x29c960['x']),_0x29c960['y']=Math[_0x23a944(0x997)](_0x29c960['y']),_0x29c960[_0x23a944(0x59d)]=Math['round'](_0x29c960[_0x23a944(0x59d)]),_0x29c960[_0x23a944(0x844)]=Math['round'](_0x29c960[_0x23a944(0x844)]),this[_0x23a944(0x8db)](),VisuMZ[_0x23a944(0xf9)][_0x23a944(0x700)][_0x23a944(0x800)](this,_0x29c960),this['initCoreEasing']();},Window_Base[_0x25789e(0x866)]['initDigitGrouping']=function(){const _0x15cba2=_0x25789e;this['_digitGrouping']=VisuMZ[_0x15cba2(0xf9)][_0x15cba2(0x59c)][_0x15cba2(0x25e)][_0x15cba2(0x163)],this[_0x15cba2(0x3da)]=VisuMZ[_0x15cba2(0xf9)][_0x15cba2(0x59c)][_0x15cba2(0x25e)][_0x15cba2(0x5c4)];},Window_Base['prototype'][_0x25789e(0x99b)]=function(){const _0x41fcde=_0x25789e;return VisuMZ[_0x41fcde(0xf9)]['Settings'][_0x41fcde(0x36b)][_0x41fcde(0x823)];},Window_Base[_0x25789e(0x866)][_0x25789e(0x10e)]=function(){const _0x4294ef=_0x25789e;return VisuMZ[_0x4294ef(0xf9)]['Settings']['Window']['ItemPadding'];},Window_Base[_0x25789e(0x866)]['updateBackOpacity']=function(){const _0x288740=_0x25789e;$gameSystem['windowOpacity']?'LVQRU'!==_0x288740(0xdc)?this['backOpacity']=$gameSystem[_0x288740(0x50c)]():(_0xa8027[_0x288740(0xf9)]['Bitmap_gradientFillRect']['call'](this,_0x186291,_0x1196f6,_0x21c8ca,_0x4bfacf,_0x2b326a,_0x3de05a,_0xba96de),this['markCoreEngineModified']()):'hUJsL'===_0x288740(0x74d)?_0x161c17[_0x288740(0xbd)][_0x288740(0xd2)]=_0x288740(0x87a):this[_0x288740(0x921)]=VisuMZ[_0x288740(0xf9)][_0x288740(0x59c)]['Window'][_0x288740(0x3be)];},Window_Base['prototype'][_0x25789e(0x317)]=function(){const _0x155a8b=_0x25789e;return VisuMZ['CoreEngine']['Settings'][_0x155a8b(0x36b)]['TranslucentOpacity'];},Window_Base['prototype']['openingSpeed']=function(){const _0x3b6524=_0x25789e;return VisuMZ[_0x3b6524(0xf9)][_0x3b6524(0x59c)][_0x3b6524(0x36b)]['OpenSpeed'];},VisuMZ['CoreEngine'][_0x25789e(0x55d)]=Window_Base[_0x25789e(0x866)][_0x25789e(0x91c)],Window_Base[_0x25789e(0x866)]['update']=function(){const _0x524f32=_0x25789e;VisuMZ[_0x524f32(0xf9)][_0x524f32(0x55d)][_0x524f32(0x800)](this),this[_0x524f32(0x820)]();},Window_Base[_0x25789e(0x866)][_0x25789e(0x784)]=function(){const _0x566d15=_0x25789e;this['_opening']&&(this[_0x566d15(0x565)]+=this[_0x566d15(0x7a7)](),this['isOpen']()&&(this[_0x566d15(0x5b6)]=![]));},Window_Base[_0x25789e(0x866)][_0x25789e(0x4ca)]=function(){const _0x51e40c=_0x25789e;this[_0x51e40c(0x6ff)]&&(_0x51e40c(0x5f1)===_0x51e40c(0x5f1)?(this[_0x51e40c(0x565)]-=this['openingSpeed'](),this[_0x51e40c(0x346)]()&&(this[_0x51e40c(0x6ff)]=![])):_0x278427=_0x51e40c(0x289)[_0x51e40c(0x3a8)](_0x2bc845,_0x25196e));},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x28b)]=Window_Base[_0x25789e(0x866)][_0x25789e(0x44a)],Window_Base[_0x25789e(0x866)][_0x25789e(0x44a)]=function(_0x3e9d30,_0x3068f4,_0x1f0fd7,_0x45a211,_0x233938){const _0x531238=_0x25789e;if(this[_0x531238(0x139)]())_0x3e9d30=VisuMZ['GroupDigits'](_0x3e9d30);VisuMZ[_0x531238(0xf9)]['Window_Base_drawText']['call'](this,_0x3e9d30,_0x3068f4,_0x1f0fd7,_0x45a211,_0x233938);},Window_Base[_0x25789e(0x866)]['useDigitGrouping']=function(){const _0x37d6e1=_0x25789e;return this[_0x37d6e1(0x540)];},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x8bf)]=Window_Base[_0x25789e(0x866)][_0x25789e(0x88e)],Window_Base[_0x25789e(0x866)]['createTextState']=function(_0x26695e,_0x1ff983,_0x5ec172,_0x45bf60){const _0x256306=_0x25789e;var _0x2076fe=VisuMZ[_0x256306(0xf9)][_0x256306(0x8bf)]['call'](this,_0x26695e,_0x1ff983,_0x5ec172,_0x45bf60);if(this[_0x256306(0x833)]())_0x2076fe[_0x256306(0xd7)]=VisuMZ[_0x256306(0x441)](_0x2076fe[_0x256306(0xd7)]);return _0x2076fe;},Window_Base[_0x25789e(0x866)]['useDigitGroupingEx']=function(){const _0x4211b3=_0x25789e;return this[_0x4211b3(0x3da)];},Window_Base[_0x25789e(0x866)][_0x25789e(0x7ce)]=function(_0x2dcd7c){const _0x2af0f7=_0x25789e;this[_0x2af0f7(0x540)]=_0x2dcd7c;},Window_Base[_0x25789e(0x866)]['enableDigitGroupingEx']=function(_0x263a1e){const _0x215917=_0x25789e;this[_0x215917(0x3da)]=_0x263a1e;},VisuMZ['CoreEngine'][_0x25789e(0x2f4)]=Window_Base[_0x25789e(0x866)][_0x25789e(0x914)],Window_Base[_0x25789e(0x866)][_0x25789e(0x914)]=function(_0x13bc0f,_0x3f51ac,_0x4000c4){const _0x4937c9=_0x25789e;_0x3f51ac=Math['round'](_0x3f51ac),_0x4000c4=Math[_0x4937c9(0x997)](_0x4000c4),VisuMZ[_0x4937c9(0xf9)][_0x4937c9(0x2f4)][_0x4937c9(0x800)](this,_0x13bc0f,_0x3f51ac,_0x4000c4);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x4e6)]=Window_Base[_0x25789e(0x866)][_0x25789e(0xec)],Window_Base['prototype'][_0x25789e(0xec)]=function(_0x4476fd,_0x16f020,_0x147c5,_0x5adef4,_0x25bb3a,_0x597ef6){const _0x41f67f=_0x25789e;_0x25bb3a=_0x25bb3a||ImageManager[_0x41f67f(0x58a)],_0x597ef6=_0x597ef6||ImageManager[_0x41f67f(0x846)],_0x147c5=Math['round'](_0x147c5),_0x5adef4=Math[_0x41f67f(0x997)](_0x5adef4),_0x25bb3a=Math[_0x41f67f(0x997)](_0x25bb3a),_0x597ef6=Math[_0x41f67f(0x997)](_0x597ef6),VisuMZ[_0x41f67f(0xf9)][_0x41f67f(0x4e6)][_0x41f67f(0x800)](this,_0x4476fd,_0x16f020,_0x147c5,_0x5adef4,_0x25bb3a,_0x597ef6);},VisuMZ[_0x25789e(0xf9)]['Window_Base_drawCharacter']=Window_Base[_0x25789e(0x866)][_0x25789e(0x7e4)],Window_Base[_0x25789e(0x866)][_0x25789e(0x7e4)]=function(_0x3c754f,_0x240cdc,_0x8f8972,_0x51dbf2){const _0x4feeed=_0x25789e;_0x8f8972=Math[_0x4feeed(0x997)](_0x8f8972),_0x51dbf2=Math[_0x4feeed(0x997)](_0x51dbf2),VisuMZ[_0x4feeed(0xf9)]['Window_Base_drawCharacter'][_0x4feeed(0x800)](this,_0x3c754f,_0x240cdc,_0x8f8972,_0x51dbf2);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x85e)]=Window_Selectable[_0x25789e(0x866)][_0x25789e(0x886)],Window_Selectable[_0x25789e(0x866)][_0x25789e(0x886)]=function(_0x503e5e){const _0x2997be=_0x25789e;let _0x240b0b=VisuMZ['CoreEngine'][_0x2997be(0x85e)][_0x2997be(0x800)](this,_0x503e5e);return _0x240b0b['x']=Math[_0x2997be(0x997)](_0x240b0b['x']),_0x240b0b['y']=Math[_0x2997be(0x997)](_0x240b0b['y']),_0x240b0b['width']=Math[_0x2997be(0x997)](_0x240b0b[_0x2997be(0x59d)]),_0x240b0b[_0x2997be(0x844)]=Math[_0x2997be(0x997)](_0x240b0b[_0x2997be(0x844)]),_0x240b0b;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x9f)]=Window_StatusBase[_0x25789e(0x866)]['drawActorSimpleStatus'],Window_StatusBase[_0x25789e(0x866)][_0x25789e(0x7be)]=function(_0x254b86,_0x21bd85,_0x455a11){const _0x3fbb6c=_0x25789e;_0x21bd85=Math[_0x3fbb6c(0x997)](_0x21bd85),_0x455a11=Math[_0x3fbb6c(0x997)](_0x455a11),VisuMZ[_0x3fbb6c(0xf9)][_0x3fbb6c(0x9f)][_0x3fbb6c(0x800)](this,_0x254b86,_0x21bd85,_0x455a11);},Window_Base[_0x25789e(0x866)][_0x25789e(0x146)]=function(){const _0x5e94d1=_0x25789e;this[_0x5e94d1(0x33b)]={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this[_0x5e94d1(0x24b)]['y'],'targetOpacity':this[_0x5e94d1(0x555)],'targetBackOpacity':this['backOpacity'],'targetContentsOpacity':this[_0x5e94d1(0x6f9)]};},Window_Base[_0x25789e(0x866)][_0x25789e(0x820)]=function(){const _0x3502bb=_0x25789e;if(!this[_0x3502bb(0x33b)])return;if(this['_coreEasing'][_0x3502bb(0x649)]<=0x0)return;this['x']=this[_0x3502bb(0x3e5)](this['x'],this[_0x3502bb(0x33b)]['targetX']),this['y']=this[_0x3502bb(0x3e5)](this['y'],this[_0x3502bb(0x33b)][_0x3502bb(0x8e6)]),this[_0x3502bb(0x24b)]['x']=this[_0x3502bb(0x3e5)](this[_0x3502bb(0x24b)]['x'],this[_0x3502bb(0x33b)][_0x3502bb(0x328)]),this[_0x3502bb(0x24b)]['y']=this['applyCoreEasing'](this['scale']['y'],this['_coreEasing'][_0x3502bb(0x46e)]),this[_0x3502bb(0x555)]=this[_0x3502bb(0x3e5)](this[_0x3502bb(0x555)],this[_0x3502bb(0x33b)]['targetOpacity']),this[_0x3502bb(0x921)]=this[_0x3502bb(0x3e5)](this[_0x3502bb(0x921)],this[_0x3502bb(0x33b)][_0x3502bb(0x410)]),this[_0x3502bb(0x6f9)]=this[_0x3502bb(0x3e5)](this[_0x3502bb(0x6f9)],this[_0x3502bb(0x33b)]['targetContentsOpacity']),this[_0x3502bb(0x33b)][_0x3502bb(0x649)]--;},Window_Base[_0x25789e(0x866)]['applyCoreEasing']=function(_0x13cac5,_0x40dac3){const _0x2e07a4=_0x25789e;if(!this[_0x2e07a4(0x33b)])return _0x40dac3;const _0x40a0f9=this[_0x2e07a4(0x33b)][_0x2e07a4(0x649)],_0x21589c=this[_0x2e07a4(0x33b)]['wholeDuration'],_0x9fcd3a=this[_0x2e07a4(0x75d)]((_0x21589c-_0x40a0f9)/_0x21589c),_0x210def=this['calcCoreEasing']((_0x21589c-_0x40a0f9+0x1)/_0x21589c),_0x3dce61=(_0x13cac5-_0x40dac3*_0x9fcd3a)/(0x1-_0x9fcd3a);return _0x3dce61+(_0x40dac3-_0x3dce61)*_0x210def;},Window_Base[_0x25789e(0x866)]['calcCoreEasing']=function(_0x2fe970){const _0x3afadb=_0x25789e;if(!this[_0x3afadb(0x33b)])return _0x2fe970;return VisuMZ['ApplyEasing'](_0x2fe970,this['_coreEasing'][_0x3afadb(0x549)]||'LINEAR');},Window_Base[_0x25789e(0x866)]['anchorCoreEasing']=function(_0x56287b,_0x269da0){const _0x5f0bb2=_0x25789e;if(!this[_0x5f0bb2(0x33b)])return;this['x']=this['_coreEasing']['targetX'],this['y']=this['_coreEasing'][_0x5f0bb2(0x8e6)],this['scale']['x']=this[_0x5f0bb2(0x33b)][_0x5f0bb2(0x328)],this['scale']['y']=this[_0x5f0bb2(0x33b)]['targetScaleY'],this['opacity']=this['_coreEasing']['targetOpacity'],this[_0x5f0bb2(0x921)]=this['_coreEasing']['targetBackOpacity'],this['contentsOpacity']=this['_coreEasing'][_0x5f0bb2(0x140)],this[_0x5f0bb2(0x9b0)](_0x56287b,_0x269da0,this['x'],this['y'],this[_0x5f0bb2(0x24b)]['x'],this[_0x5f0bb2(0x24b)]['y'],this['opacity'],this['backOpacity'],this[_0x5f0bb2(0x6f9)]);},Window_Base[_0x25789e(0x866)]['setupCoreEasing']=function(_0x478f44,_0x1e4c10,_0x3a5d6c,_0x2dd790,_0x17e59e,_0x2e302f,_0x3ac1b3,_0x3786ca,_0x3436e9){this['_coreEasing']={'duration':_0x478f44,'wholeDuration':_0x478f44,'type':_0x1e4c10,'targetX':_0x3a5d6c,'targetY':_0x2dd790,'targetScaleX':_0x17e59e,'targetScaleY':_0x2e302f,'targetOpacity':_0x3ac1b3,'targetBackOpacity':_0x3786ca,'targetContentsOpacity':_0x3436e9};},Window_Base['prototype'][_0x25789e(0x55c)]=function(_0xdb7c90,_0x4bec7e,_0x1c13c8,_0x1f97d8,_0x5eb2bb){const _0x8afcac=_0x25789e;this[_0x8afcac(0x616)](),this[_0x8afcac(0x890)][_0x8afcac(0x92c)]=VisuMZ[_0x8afcac(0xf9)][_0x8afcac(0x59c)][_0x8afcac(0x2e0)][_0x8afcac(0x32e)];const _0x29e895=VisuMZ[_0x8afcac(0xf9)]['Settings']['Gold']['GoldIcon'];if(_0x29e895>0x0&&_0x4bec7e===TextManager[_0x8afcac(0x77b)]){const _0x50e8d4=_0x1f97d8+(this['lineHeight']()-ImageManager[_0x8afcac(0xd0)])/0x2;this[_0x8afcac(0x914)](_0x29e895,_0x1c13c8+(_0x5eb2bb-ImageManager[_0x8afcac(0x34f)]),_0x50e8d4),_0x5eb2bb-=ImageManager[_0x8afcac(0x34f)]+0x4;}else this['changeTextColor'](ColorManager[_0x8afcac(0x5ca)]()),this['drawText'](_0x4bec7e,_0x1c13c8,_0x1f97d8,_0x5eb2bb,_0x8afcac(0xe9)),_0x5eb2bb-=this[_0x8afcac(0x448)](_0x4bec7e)+0x6;this[_0x8afcac(0x902)]();const _0x807c9c=this[_0x8afcac(0x448)](this[_0x8afcac(0x540)]?VisuMZ[_0x8afcac(0x441)](_0xdb7c90):_0xdb7c90);if(_0x807c9c>_0x5eb2bb)this[_0x8afcac(0x44a)](VisuMZ['CoreEngine'][_0x8afcac(0x59c)]['Gold'][_0x8afcac(0x521)],_0x1c13c8,_0x1f97d8,_0x5eb2bb,'right');else{if(_0x8afcac(0x9e3)!==_0x8afcac(0xab))this[_0x8afcac(0x44a)](_0xdb7c90,_0x1c13c8,_0x1f97d8,_0x5eb2bb,_0x8afcac(0xe9));else{const _0x650ea3=_0x10b46d[_0x56a6cc][_0x8afcac(0x126)];_0x5e4425+=_0x4b4ca2+'〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'['format'](_0x1baa9c,_0x650ea3||_0x8afcac(0x494))+_0x8fd916;}}this[_0x8afcac(0x616)]();},Window_Base['prototype']['drawIconBySize']=function(_0x50d31a,_0x34ccbd,_0x54bc55,_0x4e2060,_0x4f077c){const _0x36ad6b=_0x25789e,_0x27aba6=ImageManager['loadSystem'](_0x36ad6b(0x1c9)),_0xa91304=ImageManager[_0x36ad6b(0x34f)],_0xeca52=ImageManager[_0x36ad6b(0xd0)],_0x5dfa9e=_0x50d31a%0x10*_0xa91304,_0x22b120=Math[_0x36ad6b(0x36f)](_0x50d31a/0x10)*_0xeca52,_0x4b93ae=_0x4e2060,_0x3fe1f3=_0x4e2060;this[_0x36ad6b(0x890)][_0x36ad6b(0x6df)]['imageSmoothingEnabled']=_0x4f077c,this['contents'][_0x36ad6b(0x408)](_0x27aba6,_0x5dfa9e,_0x22b120,_0xa91304,_0xeca52,_0x34ccbd,_0x54bc55,_0x4b93ae,_0x3fe1f3),this['contents'][_0x36ad6b(0x6df)]['imageSmoothingEnabled']=!![];},Window_Base[_0x25789e(0x866)][_0x25789e(0x2a3)]=function(_0x1c8fe2,_0x3def59,_0x486054,_0x57b8db,_0x1f89b0,_0x42b5a5){const _0x486b02=_0x25789e,_0x4889f8=Math['floor']((_0x486054-0x2)*_0x57b8db),_0x37c52b=Sprite_Gauge[_0x486b02(0x866)][_0x486b02(0x646)]['call'](this),_0xe451d5=_0x3def59+this[_0x486b02(0x99b)]()-_0x37c52b-0x2;this['contents'][_0x486b02(0x937)](_0x1c8fe2,_0xe451d5,_0x486054,_0x37c52b,ColorManager[_0x486b02(0x29c)]()),this[_0x486b02(0x890)]['gradientFillRect'](_0x1c8fe2+0x1,_0xe451d5+0x1,_0x4889f8,_0x37c52b-0x2,_0x1f89b0,_0x42b5a5);},Window_Scrollable[_0x25789e(0x1a9)]={'enabled':VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)]['Window'][_0x25789e(0x5ef)]??!![],'thickness':VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)][_0x25789e(0x36b)][_0x25789e(0x18b)]??0x2,'offset':VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)][_0x25789e(0x36b)][_0x25789e(0x4a4)]??0x2,'bodyColor':VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)][_0x25789e(0x36b)][_0x25789e(0x1c0)]??0x0,'offColor':VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)][_0x25789e(0x36b)][_0x25789e(0x8a9)]??0x7,'offOpacity':VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)]['Window']['OffBarOpacity']??0x80},Window_Base[_0x25789e(0x866)]['isScrollBarVisible']=function(){const _0x3e3389=_0x25789e;return Window_Scrollable[_0x3e3389(0x1a9)]['enabled']&&Window_Scrollable[_0x3e3389(0x1a9)][_0x3e3389(0x883)]>0x0;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x971)]=Window_Base[_0x25789e(0x866)][_0x25789e(0x3fc)],Window_Base[_0x25789e(0x866)][_0x25789e(0x3fc)]=function(){const _0x2b876f=_0x25789e;VisuMZ[_0x2b876f(0xf9)][_0x2b876f(0x971)][_0x2b876f(0x800)](this),this['createScrollBarSprites'](),this[_0x2b876f(0x323)](!![]),this['setupScrollBarBitmap'](![]);},Window_Base['prototype'][_0x25789e(0x9ab)]=function(){const _0x2fd17a=_0x25789e;if(!this['isScrollBarVisible']())return;if(this[_0x2fd17a(0x167)]||this[_0x2fd17a(0x870)])return;this[_0x2fd17a(0x7ab)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this['_scrollBarHorz']=new Sprite(),this[_0x2fd17a(0x870)]=new Sprite(),this['addChild'](this[_0x2fd17a(0x167)]),this[_0x2fd17a(0x99d)](this[_0x2fd17a(0x870)]);},Window_Base[_0x25789e(0x866)][_0x25789e(0x323)]=function(_0x27c580){const _0x424140=_0x25789e,_0x4b3bb3=_0x27c580?this[_0x424140(0x167)]:this['_scrollBarVert'];if(!_0x4b3bb3)return;const _0x1e5eb3=Window_Scrollable[_0x424140(0x1a9)],_0x238027=_0x1e5eb3[_0x424140(0x883)],_0x2025fa=_0x27c580?this[_0x424140(0x1b1)]-_0x238027*0x2:_0x238027,_0x1d33ff=_0x27c580?_0x238027:this[_0x424140(0x90f)]-_0x238027*0x2;_0x4b3bb3['bitmap']=new Bitmap(_0x2025fa,_0x1d33ff),_0x4b3bb3[_0x424140(0x1ea)](0x0,0x0,_0x2025fa,_0x1d33ff),this[_0x424140(0x7e9)](_0x27c580);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0xb1)]=Window_Base['prototype'][_0x25789e(0x7a3)],Window_Base[_0x25789e(0x866)]['destroyContents']=function(){const _0x58fa31=_0x25789e;VisuMZ[_0x58fa31(0xf9)][_0x58fa31(0xb1)][_0x58fa31(0x800)](this),this['destroyScrollBarBitmaps']();},Window_Base[_0x25789e(0x866)][_0x25789e(0x970)]=function(){const _0xf100ff=_0x25789e,_0x444f48=[this['_scrollBarHorz'],this[_0xf100ff(0x870)]];for(const _0x3d31d5 of _0x444f48){if(_0x3d31d5&&_0x3d31d5[_0xf100ff(0x6d6)])_0x3d31d5[_0xf100ff(0x6d6)][_0xf100ff(0x85c)]();}},VisuMZ[_0x25789e(0xf9)]['Window_Scrollable_update']=Window_Scrollable[_0x25789e(0x866)][_0x25789e(0x91c)],Window_Scrollable[_0x25789e(0x866)][_0x25789e(0x91c)]=function(){const _0x380302=_0x25789e;VisuMZ['CoreEngine'][_0x380302(0x527)][_0x380302(0x800)](this),this[_0x380302(0x7bd)]();},Window_Scrollable[_0x25789e(0x866)][_0x25789e(0x7bd)]=function(){const _0x39619a=_0x25789e;this['updateScrollBarVisibility'](),this[_0x39619a(0x905)](!![]),this['checkScrollBarBitmap'](![]),this[_0x39619a(0x7e9)](!![]),this[_0x39619a(0x7e9)](![]);},Window_Scrollable['prototype'][_0x25789e(0x9f9)]=function(){const _0x3578ed=_0x25789e,_0x1bb5ac=[this[_0x3578ed(0x167)],this[_0x3578ed(0x870)]];for(const _0xd3e5f6 of _0x1bb5ac){if(_0x3578ed(0x40f)!==_0x3578ed(0x256))_0xd3e5f6&&(_0x3578ed(0x8e8)===_0x3578ed(0x453)?_0x1f5bef[_0x3578ed(0x872)]():_0xd3e5f6[_0x3578ed(0x106)]=this[_0x3578ed(0x212)]()&&this[_0x3578ed(0x5c5)]());else return _0x2277b5[_0x3578ed(0x959)](_0x45db5c,'<','>');}},Window_Scrollable[_0x25789e(0x866)][_0x25789e(0x905)]=function(_0x52494f){const _0x26e562=_0x25789e;if(!this[_0x26e562(0x7ab)])return;const _0x2a8460=this[_0x26e562(0x982)](_0x52494f),_0x199dbe=this[_0x26e562(0x2a6)](_0x52494f),_0x1967e=_0x52494f?_0x26e562(0x40d):_0x26e562(0x124),_0x450cb7=_0x52494f?'maxHorz':_0x26e562(0x387);(this[_0x26e562(0x7ab)][_0x1967e]!==_0x2a8460||this[_0x26e562(0x7ab)][_0x450cb7]!==_0x199dbe)&&(this[_0x26e562(0x7ab)][_0x1967e]=_0x2a8460,this[_0x26e562(0x7ab)][_0x450cb7]=_0x199dbe,this['refreshScrollBarBitmap'](_0x52494f,_0x2a8460,_0x199dbe));},Window_Scrollable[_0x25789e(0x866)][_0x25789e(0x982)]=function(_0x28d56a){const _0x38df22=_0x25789e;if(this[_0x38df22(0x258)]!==undefined){if(_0x38df22(0x90b)!==_0x38df22(0x293))return _0x28d56a?this[_0x38df22(0x61d)]():this[_0x38df22(0x5ff)]['y'];else{if(_0x5312f3[_0x38df22(0x409)])_0x3d45c7['playOnceParallelInterpreter'](_0x41650a);else _0x444127&&_0xd96c23['isPlaytest']()&&_0x2a2955(_0x38df22(0x9b6));}}return _0x28d56a?this['scrollX']():this[_0x38df22(0x4a9)]();},Window_Scrollable[_0x25789e(0x866)][_0x25789e(0x2a6)]=function(_0xda7a91){const _0x379351=_0x25789e;if(this[_0x379351(0x258)]!==undefined)return _0xda7a91?this['maxScrollX']():Math['max'](0x0,this['_allTextHeight']-this['innerHeight']);return _0xda7a91?this[_0x379351(0x6b3)]():this['maxScrollY']();},Window_Scrollable[_0x25789e(0x866)][_0x25789e(0x4de)]=function(){const _0x398155=_0x25789e;if(this['_allTextHeight']!==undefined)return Math[_0x398155(0x311)](0x0,this[_0x398155(0x258)]);return this[_0x398155(0x2a4)]();},Window_Scrollable[_0x25789e(0x866)][_0x25789e(0x375)]=function(_0x3c17b0,_0x59a1fb,_0x5246b8){const _0x2b3dec=_0x25789e,_0x1b933f=_0x3c17b0?this['_scrollBarHorz']:this['_scrollBarVert'];if(!_0x1b933f)return;if(!_0x1b933f[_0x2b3dec(0x6d6)])return;const _0x3fd233=_0x1b933f[_0x2b3dec(0x6d6)];_0x3fd233[_0x2b3dec(0x6bc)]();if(_0x5246b8<=0x0)return;const _0x421393=_0x3c17b0?this['innerWidth']/this[_0x2b3dec(0x391)]():this[_0x2b3dec(0x90f)]/this[_0x2b3dec(0x4de)](),_0x2cb507=_0x3c17b0?Math[_0x2b3dec(0x997)](_0x59a1fb*_0x421393):0x0,_0x147fab=_0x3c17b0?0x0:Math['round'](_0x59a1fb*_0x421393),_0x237c5c=_0x3c17b0?Math['round'](_0x3fd233[_0x2b3dec(0x59d)]*_0x421393):_0x3fd233[_0x2b3dec(0x59d)],_0x32ce62=_0x3c17b0?_0x3fd233[_0x2b3dec(0x844)]:Math[_0x2b3dec(0x997)](_0x3fd233[_0x2b3dec(0x844)]*_0x421393),_0xc1dd1a=Window_Scrollable[_0x2b3dec(0x1a9)],_0x2e3ab3=ColorManager['getColor'](_0xc1dd1a['offColor']),_0x3b34d1=ColorManager[_0x2b3dec(0x973)](_0xc1dd1a[_0x2b3dec(0x23a)]),_0xabac62=_0xc1dd1a[_0x2b3dec(0x325)];_0x3fd233[_0x2b3dec(0x87e)]=_0xabac62,_0x3fd233['fillAll'](_0x2e3ab3),_0x3fd233['paintOpacity']=0xff,_0x3fd233[_0x2b3dec(0x937)](_0x2cb507,_0x147fab,_0x237c5c,_0x32ce62,_0x3b34d1);},Window_Base[_0x25789e(0x866)][_0x25789e(0x7e9)]=function(_0x216e50){const _0x42ae1b=_0x25789e,_0x1256e0=_0x216e50?this[_0x42ae1b(0x167)]:this['_scrollBarVert'];if(!_0x1256e0)return;const _0x454c44=Window_Scrollable[_0x42ae1b(0x1a9)],_0x4c75c2=_0x454c44[_0x42ae1b(0x883)],_0x358801=_0x454c44['offset'];if(!_0x1256e0[_0x42ae1b(0x4f4)])return;_0x1256e0['x']=this['padding']+(_0x216e50?_0x4c75c2:this['innerWidth']+_0x358801),_0x1256e0['y']=this[_0x42ae1b(0x2ba)]+(_0x216e50?this[_0x42ae1b(0x90f)]+_0x358801:_0x4c75c2);},Window_Selectable['prototype'][_0x25789e(0x1e3)]=function(_0x1d1a15){const _0x51d3ba=_0x25789e;let _0xaf25aa=this[_0x51d3ba(0x39b)]();const _0x209c63=this['maxItems'](),_0x484252=this[_0x51d3ba(0x9fd)]();if(this[_0x51d3ba(0x2db)]()&&(_0xaf25aa<_0x209c63||_0x1d1a15&&_0x484252===0x1)){if(_0x51d3ba(0x97f)!==_0x51d3ba(0x97f)){if(_0x2d1195)_0x2d4a3b[_0x51d3ba(0x43c)](_0x2036db);}else{_0xaf25aa+=_0x484252;if(_0xaf25aa>=_0x209c63)_0xaf25aa=_0x209c63-0x1;this[_0x51d3ba(0x8ce)](_0xaf25aa);}}else!this['isUseModernControls']()&&((_0xaf25aa<_0x209c63-_0x484252||_0x1d1a15&&_0x484252===0x1)&&this[_0x51d3ba(0x8ce)]((_0xaf25aa+_0x484252)%_0x209c63));},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x374)]=Window_Selectable[_0x25789e(0x866)][_0x25789e(0x1e3)],Window_Selectable[_0x25789e(0x866)][_0x25789e(0x1e3)]=function(_0x36bb51){const _0x3ad58a=_0x25789e;this[_0x3ad58a(0x2db)]()&&_0x36bb51&&this['maxCols']()===0x1&&this[_0x3ad58a(0x39b)]()===this[_0x3ad58a(0x93b)]()-0x1?_0x3ad58a(0x147)==='iAEKQ'?(!this[_0x3ad58a(0x89b)]&&(this[_0x3ad58a(0x3f9)]+=_0x736bc8[_0x3ad58a(0x997)]((_0x4b68e6[_0x3ad58a(0x844)]-0x270)/0x2),this['_screenY']-=_0x5d9058[_0x3ad58a(0x36f)]((_0x24d4cd[_0x3ad58a(0x844)]-_0x1fda14['boxHeight'])/0x2),_0x1f70eb['isSideView']()?this[_0x3ad58a(0x2e8)]-=_0x46628d['floor']((_0x48c0ba[_0x3ad58a(0x59d)]-_0x1c19c1['boxWidth'])/0x2):this[_0x3ad58a(0x2e8)]+=_0x4aa94c[_0x3ad58a(0x997)]((_0x170581[_0x3ad58a(0x381)]-0x330)/0x2)),this[_0x3ad58a(0x89b)]=!![]):this[_0x3ad58a(0x8ce)](0x0):VisuMZ['CoreEngine'][_0x3ad58a(0x374)][_0x3ad58a(0x800)](this,_0x36bb51);},Window_Selectable[_0x25789e(0x866)][_0x25789e(0x2da)]=function(_0x56be96){const _0x4752e1=_0x25789e;let _0x5f9ab9=Math[_0x4752e1(0x311)](0x0,this[_0x4752e1(0x39b)]());const _0x4fe830=this['maxItems'](),_0x401899=this[_0x4752e1(0x9fd)]();if(this[_0x4752e1(0x2db)]()&&_0x5f9ab9>0x0||_0x56be96&&_0x401899===0x1){if(_0x4752e1(0x9d0)!==_0x4752e1(0x9d0))this['_displayX']=this['centerCameraCheckData']()[_0x4752e1(0x9ee)];else{_0x5f9ab9-=_0x401899;if(_0x5f9ab9<=0x0)_0x5f9ab9=0x0;this[_0x4752e1(0x8ce)](_0x5f9ab9);}}else!this[_0x4752e1(0x2db)]()&&('MjkDn'===_0x4752e1(0x361)?(_0x5f9ab9>=_0x401899||_0x56be96&&_0x401899===0x1)&&(_0x4752e1(0xf2)!==_0x4752e1(0x480)?this[_0x4752e1(0x8ce)]((_0x5f9ab9-_0x401899+_0x4fe830)%_0x4fe830):this[_0x4752e1(0x259)]['setBackgroundType'](_0x556c0d[_0x4752e1(0xe4)]['GoldBgType'])):this[_0x4752e1(0x586)][_0x4752e1(0x6a7)]=this[_0x4752e1(0x586)][_0x4752e1(0x3b6)]);},VisuMZ['CoreEngine'][_0x25789e(0x1d8)]=Window_Selectable[_0x25789e(0x866)]['cursorUp'],Window_Selectable['prototype'][_0x25789e(0x2da)]=function(_0x3903fa){const _0xab240c=_0x25789e;this[_0xab240c(0x2db)]()&&_0x3903fa&&this['maxCols']()===0x1&&this[_0xab240c(0x39b)]()===0x0?this['smoothSelect'](this[_0xab240c(0x93b)]()-0x1):VisuMZ[_0xab240c(0xf9)][_0xab240c(0x1d8)]['call'](this,_0x3903fa);},Window_Selectable[_0x25789e(0x866)][_0x25789e(0x2db)]=function(){const _0x42e7d1=_0x25789e;return VisuMZ['CoreEngine'][_0x42e7d1(0x59c)][_0x42e7d1(0x25e)][_0x42e7d1(0x69a)];},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x7df)]=Window_Selectable[_0x25789e(0x866)][_0x25789e(0x39d)],Window_Selectable[_0x25789e(0x866)][_0x25789e(0x39d)]=function(){const _0x123c42=_0x25789e;this[_0x123c42(0x2db)]()?(this['processCursorMoveModernControls'](),this[_0x123c42(0x39e)]()):'zRRvS'===_0x123c42(0x557)?VisuMZ[_0x123c42(0xf9)]['Window_Selectable_processCursorMove'][_0x123c42(0x800)](this):this['_moveEasingType']=_0x4c5679;},Window_Selectable['prototype'][_0x25789e(0x44e)]=function(){return!![];},Window_Selectable['prototype'][_0x25789e(0x451)]=function(){const _0x498b5e=_0x25789e;if(this[_0x498b5e(0x192)]()){if('dQOsU'!==_0x498b5e(0x625)){const _0x2f436d=this[_0x498b5e(0x39b)]();if(Input[_0x498b5e(0x930)](_0x498b5e(0x2cc))){if(_0x498b5e(0x86d)!=='nzQsr'){if(_0xc38f36 instanceof _0x2050cc)this[_0x498b5e(0x69d)](_0x2c23c7);else _0x421519 instanceof _0x243896&&_0x25b85c[0x0]===_0x498b5e(0x326)?this[_0x498b5e(0x14f)](_0x4267e2):this['catchUnknownError'](_0x5e7a61);this[_0x498b5e(0x783)]();}else Input[_0x498b5e(0x6ad)](_0x498b5e(0x456))&&this[_0x498b5e(0x44e)]()?this['cursorPagedown']():this[_0x498b5e(0x1e3)](Input[_0x498b5e(0x43e)]('down'));}if(Input[_0x498b5e(0x930)]('up')){if(_0x498b5e(0x630)===_0x498b5e(0x2c2))for(const _0x4a17ce of _0x5d1132[_0x498b5e(0x366)]){const _0x7e70f4=new _0x20cad8(_0x4a17ce);this['addChild'](_0x7e70f4);}else{if(Input[_0x498b5e(0x6ad)](_0x498b5e(0x456))&&this[_0x498b5e(0x44e)]()){if(_0x498b5e(0x7e0)!=='mplgp')this[_0x498b5e(0x9cf)]();else return _0x4aebb9['layoutSettings'][_0x498b5e(0x4bc)][_0x498b5e(0x800)](this);}else{if('ryoZk'!==_0x498b5e(0x4bd)){const _0x2c29cd=_0x498b5e(0xfc);this[_0x498b5e(0x7c5)]=this[_0x498b5e(0x7c5)]||{};if(this[_0x498b5e(0x7c5)][_0x2c29cd])return this['_colorCache'][_0x2c29cd];const _0x4f018a=_0x7c12bc[_0x498b5e(0xf9)]['Settings']['Color'][_0x498b5e(0x888)];return this[_0x498b5e(0x607)](_0x2c29cd,_0x4f018a);}else this[_0x498b5e(0x2da)](Input[_0x498b5e(0x43e)]('up'));}}}if(Input['isRepeated']('right')){if(_0x498b5e(0x5ad)!==_0x498b5e(0x5ad)){const _0x43bf5b=_0x226162['getLastPluginCommandInterpreter']();if(_0x43bf5b)_0x43bf5b[_0x498b5e(0x230)](_0x50bd44);}else this['cursorRight'](Input['isTriggered'](_0x498b5e(0xe9)));}Input[_0x498b5e(0x930)](_0x498b5e(0x981))&&this['cursorLeft'](Input['isTriggered']('left'));if(!this['isHandled'](_0x498b5e(0x1a3))&&Input[_0x498b5e(0x930)](_0x498b5e(0x1a3))){if(_0x498b5e(0x6c7)==='lqfSA'){if(_0xc630b0[_0x498b5e(0x35b)]==='SV')return!![];else{if(_0x28ceda[_0x498b5e(0x35b)]==='FV')return![];}if(this[_0x498b5e(0x8b9)]===_0x3c5954)this[_0x498b5e(0xcf)]();if(this[_0x498b5e(0x8b9)][_0x498b5e(0x19a)]===_0x201b8b)this[_0x498b5e(0xcf)]();return this[_0x498b5e(0x8b9)][_0x498b5e(0x19a)];}else this[_0x498b5e(0x1d7)]();}!this[_0x498b5e(0x9c7)]('pageup')&&Input[_0x498b5e(0x930)]('pageup')&&this['cursorPageup']();if(this[_0x498b5e(0x39b)]()!==_0x2f436d){if(_0x498b5e(0x4b2)===_0x498b5e(0x4b2))this[_0x498b5e(0x114)]();else{if(_0x1dd5a7[_0x498b5e(0x821)]('test')){var _0x2fa56c=_0x3b14bf('nw.gui')[_0x498b5e(0x36b)][_0x498b5e(0x841)]();_0x215d62[_0x498b5e(0x271)]();if(_0x484a18)_0x586042(_0x2fa56c[_0x498b5e(0x5a5)][_0x498b5e(0x53d)](_0x2fa56c),0x190);}}}}else _0x3d140a&&(_0x284b3a[_0x498b5e(0x106)]=this[_0x498b5e(0x212)]()&&this['isOpen']());}},Window_Selectable[_0x25789e(0x866)][_0x25789e(0x39e)]=function(){const _0x56bf1b=_0x25789e;if(this[_0x56bf1b(0x192)]()){const _0x37604c=this[_0x56bf1b(0x39b)]();Input['isTriggered'](_0x56bf1b(0x12f))&&('sFtGz'!==_0x56bf1b(0x94f)?this[_0x56bf1b(0x8ce)](Math[_0x56bf1b(0x16b)](this[_0x56bf1b(0x39b)](),0x0)):this[_0x56bf1b(0x264)]=[]),Input[_0x56bf1b(0x43e)](_0x56bf1b(0x9f5))&&this[_0x56bf1b(0x8ce)](Math[_0x56bf1b(0x311)](this[_0x56bf1b(0x39b)](),this[_0x56bf1b(0x93b)]()-0x1)),this[_0x56bf1b(0x39b)]()!==_0x37604c&&this[_0x56bf1b(0x114)]();}},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x1ba)]=Window_Selectable[_0x25789e(0x866)]['processTouch'],Window_Selectable['prototype'][_0x25789e(0x127)]=function(){const _0x322a7b=_0x25789e;if(this[_0x322a7b(0x2db)]()){if('kShzE'===_0x322a7b(0x79b))return _0x214b63['CoreEngine']['Settings'][_0x322a7b(0x36b)][_0x322a7b(0x1b3)];else this[_0x322a7b(0x9ac)]();}else{if(_0x322a7b(0x816)!==_0x322a7b(0x816)){const _0x331906=_0x4b7b7b['CoreEngine'][_0x322a7b(0x59c)][_0x322a7b(0x3d8)];for(const _0x11999e of _0x331906){const _0x224600=(_0x11999e[_0x322a7b(0x1b4)]||'')['toLowerCase']()['trim'](),_0x3c034b=(_0x11999e[_0x322a7b(0x73c)]||'')['toLowerCase']()[_0x322a7b(0x91f)]();_0x498f0c[_0x322a7b(0xf9)][_0x322a7b(0x3d8)][_0x224600]=_0x11999e,_0x45d49b['CoreEngine'][_0x322a7b(0x924)][_0x3c034b]=_0x224600;}}else VisuMZ[_0x322a7b(0xf9)][_0x322a7b(0x1ba)][_0x322a7b(0x800)](this);}},Window_Selectable[_0x25789e(0x866)][_0x25789e(0x9ac)]=function(){const _0xbc6172=_0x25789e;VisuMZ[_0xbc6172(0xf9)][_0xbc6172(0x1ba)]['call'](this);},Window_Selectable[_0x25789e(0x866)][_0x25789e(0x7da)]=function(){const _0x2c7e78=_0x25789e;return VisuMZ['CoreEngine'][_0x2c7e78(0x59c)][_0x2c7e78(0x36b)]['ColSpacing'];},Window_Selectable[_0x25789e(0x866)][_0x25789e(0x3b0)]=function(){const _0x5e1245=_0x25789e;return VisuMZ[_0x5e1245(0xf9)][_0x5e1245(0x59c)][_0x5e1245(0x36b)]['RowSpacing'];},Window_Selectable[_0x25789e(0x866)]['itemHeight']=function(){const _0x35087c=_0x25789e;return Window_Scrollable[_0x35087c(0x866)][_0x35087c(0x4e3)][_0x35087c(0x800)](this)+VisuMZ['CoreEngine']['Settings']['Window'][_0x35087c(0x59e)];;},VisuMZ[_0x25789e(0xf9)]['Window_Selectable_drawBackgroundRect']=Window_Selectable[_0x25789e(0x866)]['drawBackgroundRect'],Window_Selectable[_0x25789e(0x866)][_0x25789e(0x287)]=function(_0x503b4f){const _0x544e4f=_0x25789e,_0x101051=VisuMZ[_0x544e4f(0xf9)]['Settings'][_0x544e4f(0x36b)];if(_0x101051[_0x544e4f(0x9aa)]===![])return;if(_0x101051[_0x544e4f(0x484)]){if(_0x544e4f(0x5d4)!==_0x544e4f(0x463))_0x101051['DrawItemBackgroundJS'][_0x544e4f(0x800)](this,_0x503b4f);else return _0x34e7c5['layoutSettings'][_0x544e4f(0x666)][_0x544e4f(0x800)](this);}else VisuMZ[_0x544e4f(0xf9)]['Window_Selectable_drawBackgroundRect'][_0x544e4f(0x800)](this,_0x503b4f);},VisuMZ['CoreEngine'][_0x25789e(0x802)]=Window_Gold[_0x25789e(0x866)]['refresh'],Window_Gold['prototype'][_0x25789e(0x6b5)]=function(){const _0x46d157=_0x25789e;this[_0x46d157(0x1d9)]()?_0x46d157(0x257)===_0x46d157(0x3fd)?_0x6517e=_0x46d157(0x862)['format'](_0xa8addc,_0x1b9051):this[_0x46d157(0x461)]():VisuMZ[_0x46d157(0xf9)]['Window_Gold_refresh'][_0x46d157(0x800)](this);},Window_Gold['prototype'][_0x25789e(0x1d9)]=function(){const _0xe1144c=_0x25789e;if(TextManager[_0xe1144c(0x77b)]!==this[_0xe1144c(0x77b)]())return![];return VisuMZ[_0xe1144c(0xf9)][_0xe1144c(0x59c)][_0xe1144c(0x2e0)][_0xe1144c(0x4e7)];},Window_Gold[_0x25789e(0x866)][_0x25789e(0x461)]=function(){const _0x304371=_0x25789e;this[_0x304371(0x616)](),this[_0x304371(0x890)][_0x304371(0x6bc)](),this[_0x304371(0x890)][_0x304371(0x92c)]=VisuMZ[_0x304371(0xf9)][_0x304371(0x59c)]['Gold']['GoldFontSize'];const _0x489c1b=VisuMZ[_0x304371(0xf9)][_0x304371(0x59c)][_0x304371(0x2e0)]['GoldIcon'],_0x5dd344=this[_0x304371(0x777)](0x0);if(_0x489c1b>0x0){const _0x4181fc=_0x5dd344['y']+(this['lineHeight']()-ImageManager['iconHeight'])/0x2;this[_0x304371(0x914)](_0x489c1b,_0x5dd344['x'],_0x4181fc);const _0x147cc4=ImageManager[_0x304371(0x34f)]+0x4;_0x5dd344['x']+=_0x147cc4,_0x5dd344[_0x304371(0x59d)]-=_0x147cc4;}this[_0x304371(0x18f)](ColorManager[_0x304371(0x5ca)]()),this[_0x304371(0x44a)](this['currencyUnit'](),_0x5dd344['x'],_0x5dd344['y'],_0x5dd344[_0x304371(0x59d)],'left');const _0x51e8b7=this[_0x304371(0x448)](this[_0x304371(0x77b)]())+0x6;;_0x5dd344['x']+=_0x51e8b7,_0x5dd344[_0x304371(0x59d)]-=_0x51e8b7,this['resetTextColor']();const _0x2b736b=this[_0x304371(0x550)](),_0x318ff2=this[_0x304371(0x448)](this[_0x304371(0x540)]?VisuMZ['GroupDigits'](this[_0x304371(0x550)]()):this[_0x304371(0x550)]());if(_0x318ff2>_0x5dd344[_0x304371(0x59d)]){if(_0x304371(0x373)===_0x304371(0x373))this[_0x304371(0x44a)](VisuMZ[_0x304371(0xf9)][_0x304371(0x59c)]['Gold'][_0x304371(0x521)],_0x5dd344['x'],_0x5dd344['y'],_0x5dd344[_0x304371(0x59d)],_0x304371(0xe9));else return _0x4bcc80[_0x304371(0xf9)]['Scene_MenuBase_mainAreaTop'][_0x304371(0x800)](this);}else{if(_0x304371(0x7c7)===_0x304371(0x7c7))this[_0x304371(0x44a)](this['value'](),_0x5dd344['x'],_0x5dd344['y'],_0x5dd344[_0x304371(0x59d)],_0x304371(0xe9));else{_0x16d2b7[_0x304371(0x747)](_0x483935,_0x5b3999);const _0x589ca5=_0x1ee719[_0x304371(0x997)](_0x4c8a8f[_0x304371(0x745)])[_0x304371(0x68d)](0x0,0x64),_0x35b053=_0x603043[_0x304371(0x6e4)];_0x35b053&&(_0x35b053[_0x304371(0x745)]=_0x589ca5,_0x35b053[_0x304371(0x5a3)]=_0x5e14e3[_0x304371(0x71c)]['seek'](),_0x52c944[_0x304371(0x11c)](_0x35b053),_0x12c238[_0x304371(0x536)](_0x35b053,_0x35b053[_0x304371(0x5a3)]),_0x56b361[_0x304371(0x71c)][_0x304371(0x7f8)](_0x35b053[_0x304371(0x5a3)]));}}this[_0x304371(0x616)]();},Window_StatusBase[_0x25789e(0x866)][_0x25789e(0x66e)]=function(_0x2178d1,_0x44e353,_0x58f590,_0x20c01b,_0x372b60){const _0x56b43a=_0x25789e;_0x20c01b=String(_0x20c01b||'')[_0x56b43a(0x595)]();if(VisuMZ[_0x56b43a(0xf9)][_0x56b43a(0x59c)][_0x56b43a(0x5c0)][_0x56b43a(0x6e6)]){const _0x32c276=VisuMZ[_0x56b43a(0x679)](_0x20c01b);if(_0x372b60){if(_0x56b43a(0x9c)===_0x56b43a(0x9c))this[_0x56b43a(0x83e)](_0x32c276,_0x2178d1,_0x44e353,this[_0x56b43a(0x864)]()),_0x58f590-=this[_0x56b43a(0x864)]()+0x2,_0x2178d1+=this[_0x56b43a(0x864)]()+0x2;else{if(!this[_0x56b43a(0x192)]())return;_0x1779f1[_0x56b43a(0x7e3)]()?this[_0x56b43a(0x2c0)]():_0x4b470b[_0x56b43a(0x866)][_0x56b43a(0x39d)][_0x56b43a(0x800)](this);}}else this[_0x56b43a(0x914)](_0x32c276,_0x2178d1+0x2,_0x44e353+0x2),_0x58f590-=ImageManager[_0x56b43a(0x34f)]+0x4,_0x2178d1+=ImageManager['iconWidth']+0x4;}const _0x23e056=TextManager['param'](_0x20c01b);this['resetFontSettings'](),this[_0x56b43a(0x18f)](ColorManager[_0x56b43a(0x5ca)]()),_0x372b60?(this['contents']['fontSize']=this[_0x56b43a(0x7ea)](),this[_0x56b43a(0x890)][_0x56b43a(0x44a)](_0x23e056,_0x2178d1,_0x44e353,_0x58f590,this[_0x56b43a(0x864)](),_0x56b43a(0x981))):this['drawText'](_0x23e056,_0x2178d1,_0x44e353,_0x58f590),this[_0x56b43a(0x616)]();},Window_StatusBase[_0x25789e(0x866)][_0x25789e(0x7ea)]=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase['prototype']['drawActorClass']=function(_0x32e35f,_0x36638c,_0x4baae5,_0x220eb2){const _0x5408e1=_0x25789e;_0x220eb2=_0x220eb2||0xa8,this[_0x5408e1(0x902)]();if(VisuMZ['CoreEngine'][_0x5408e1(0x59c)]['UI'][_0x5408e1(0x4f2)])_0x5408e1(0x209)!==_0x5408e1(0x62e)?this['drawTextEx'](_0x32e35f[_0x5408e1(0x2f1)]()[_0x5408e1(0x126)],_0x36638c,_0x4baae5,_0x220eb2):this[_0x5408e1(0x1bb)][_0x5408e1(0x615)](_0x50326c[_0x5408e1(0xe4)][_0x5408e1(0x717)]);else{const _0x924fe8=_0x32e35f['currentClass']()[_0x5408e1(0x126)][_0x5408e1(0x6e7)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x924fe8,_0x36638c,_0x4baae5,_0x220eb2);}},Window_StatusBase[_0x25789e(0x866)][_0x25789e(0x4ef)]=function(_0x2e772b,_0x3f3d82,_0x295ed0,_0x3150f8){const _0x48998f=_0x25789e;_0x3150f8=_0x3150f8||0x10e,this['resetTextColor']();if(VisuMZ[_0x48998f(0xf9)][_0x48998f(0x59c)]['UI'][_0x48998f(0x956)])this['drawTextEx'](_0x2e772b[_0x48998f(0x8eb)](),_0x3f3d82,_0x295ed0,_0x3150f8);else{if(_0x48998f(0x273)===_0x48998f(0x41e))_0x79443b[_0x48998f(0xf9)][_0x48998f(0x14a)][_0x48998f(0x800)](this);else{const _0x1ef2f8=_0x2e772b[_0x48998f(0x8eb)]()[_0x48998f(0x6e7)](/\\I\[(\d+)\]/gi,'');this[_0x48998f(0x44a)](_0x2e772b['nickname'](),_0x3f3d82,_0x295ed0,_0x3150f8);}}},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x1c3)]=Window_StatusBase[_0x25789e(0x866)][_0x25789e(0x12d)],Window_StatusBase[_0x25789e(0x866)][_0x25789e(0x12d)]=function(_0x5431db,_0x119418,_0x56b610){const _0x2a58dc=_0x25789e;if(VisuMZ[_0x2a58dc(0xf9)]['Settings'][_0x2a58dc(0x5c0)]['ShowActorLevel']===![])return;if(this[_0x2a58dc(0x495)]())this[_0x2a58dc(0x6c8)](_0x5431db,_0x119418,_0x56b610);VisuMZ[_0x2a58dc(0xf9)][_0x2a58dc(0x1c3)][_0x2a58dc(0x800)](this,_0x5431db,_0x119418,_0x56b610);},Window_StatusBase[_0x25789e(0x866)][_0x25789e(0x495)]=function(){const _0x31331e=_0x25789e;return VisuMZ[_0x31331e(0xf9)][_0x31331e(0x59c)]['UI'][_0x31331e(0x9df)];},Window_StatusBase[_0x25789e(0x866)][_0x25789e(0x6c8)]=function(_0x2f8aea,_0x303d05,_0x280fc8){const _0xc587=_0x25789e;if(!_0x2f8aea)return;if(!_0x2f8aea[_0xc587(0x21c)]())return;const _0x3a5ae3=0x80,_0x4a3d4a=_0x2f8aea[_0xc587(0x7ca)]();let _0x14a2ad=ColorManager[_0xc587(0x88a)](),_0x51c348=ColorManager[_0xc587(0x840)]();_0x4a3d4a>=0x1&&(_0x14a2ad=ColorManager[_0xc587(0x664)](),_0x51c348=ColorManager['maxLvGaugeColor2']()),this['drawGauge'](_0x303d05,_0x280fc8,_0x3a5ae3,_0x4a3d4a,_0x14a2ad,_0x51c348);},Window_EquipStatus[_0x25789e(0x866)][_0x25789e(0x60c)]=function(){const _0x54a841=_0x25789e;let _0x50a508=0x0;for(const _0x15bf0b of VisuMZ['CoreEngine']['Settings']['Param'][_0x54a841(0xf5)]){if(_0x54a841(0x822)!=='fVtRA')try{const _0x1f2dcb=_0xe56653['deflate'](_0x72f3ec,{'to':_0x54a841(0x36d),'level':0x1});if(_0x1f2dcb['length']>=0xc350){}_0x57831f(_0x1f2dcb);}catch(_0x1b30ba){_0x2c5cd5(_0x1b30ba);}else{const _0x35a4df=this[_0x54a841(0x10e)](),_0x294bfc=this[_0x54a841(0x748)](_0x50a508);this[_0x54a841(0x4c9)](_0x35a4df,_0x294bfc,_0x15bf0b),_0x50a508++;}}},Window_EquipStatus[_0x25789e(0x866)][_0x25789e(0x252)]=function(_0xe4d850,_0x27151a,_0x160659){const _0x32aad9=_0x25789e,_0x469484=this['paramX']()-this[_0x32aad9(0x10e)]()*0x2;this[_0x32aad9(0x66e)](_0xe4d850,_0x27151a,_0x469484,_0x160659,![]);},Window_EquipStatus[_0x25789e(0x866)][_0x25789e(0x71e)]=function(_0x42a85c,_0x6dbc72,_0x53fa5e){const _0x139ba7=_0x25789e,_0x29e29e=this[_0x139ba7(0x8e7)]();this[_0x139ba7(0x902)](),this['drawText'](this[_0x139ba7(0x69f)][_0x139ba7(0x195)](_0x53fa5e,!![]),_0x42a85c,_0x6dbc72,_0x29e29e,'right');},Window_EquipStatus[_0x25789e(0x866)]['drawRightArrow']=function(_0x577a8f,_0x1ccaf2){const _0x3387cd=_0x25789e,_0x295a11=this[_0x3387cd(0x285)]();this['changeTextColor'](ColorManager[_0x3387cd(0x5ca)]());const _0x4137a9=VisuMZ[_0x3387cd(0xf9)][_0x3387cd(0x59c)]['UI'][_0x3387cd(0x606)];this[_0x3387cd(0x44a)](_0x4137a9,_0x577a8f,_0x1ccaf2,_0x295a11,_0x3387cd(0x8fd));},Window_EquipStatus[_0x25789e(0x866)]['drawNewParam']=function(_0x313ece,_0xb63d1d,_0x3a5c75){const _0x25758d=_0x25789e,_0x6fb042=this[_0x25758d(0x8e7)](),_0xb633c1=this[_0x25758d(0x142)][_0x25758d(0x195)](_0x3a5c75),_0x3705af=_0xb633c1-this[_0x25758d(0x69f)][_0x25758d(0x195)](_0x3a5c75);this[_0x25758d(0x18f)](ColorManager[_0x25758d(0xdd)](_0x3705af)),this[_0x25758d(0x44a)](this['_tempActor'][_0x25758d(0x195)](_0x3a5c75,!![]),_0x313ece,_0xb63d1d,_0x6fb042,_0x25758d(0xe9));},VisuMZ[_0x25789e(0xf9)]['Window_EquipItem_isEnabled']=Window_EquipItem['prototype'][_0x25789e(0x773)],Window_EquipItem[_0x25789e(0x866)][_0x25789e(0x773)]=function(_0xe8e5){const _0x27f616=_0x25789e;if(_0xe8e5&&this[_0x27f616(0x69f)]){if(_0x27f616(0x9c2)===_0x27f616(0x3e1))this[_0x27f616(0x741)]=_0x595f18(_0x3780ca(this[_0x27f616(0x741)])[_0x27f616(0x91e)](0x1)),this[_0x27f616(0x741)]=_0x5d53f2[_0x27f616(0x311)](0x0,this[_0x27f616(0x741)]),_0x2159cc[_0x27f616(0x6bc)](),this['refresh'](),_0x2eaff3['playCursor'](),this[_0x27f616(0x7a6)](this[_0x27f616(0x4ba)]-0x1);else return this[_0x27f616(0x69f)][_0x27f616(0x4ae)](_0xe8e5);}else{if(_0x27f616(0x976)!==_0x27f616(0x91d))return VisuMZ[_0x27f616(0xf9)][_0x27f616(0x238)]['call'](this,_0xe8e5);else{const _0x212b32=_0x1e8bbb+(this[_0x27f616(0x99b)]()-_0x125b76[_0x27f616(0xd0)])/0x2;this[_0x27f616(0x914)](_0x3e3b32,_0x1b73f2+(_0x2beee1-_0x4e49c0[_0x27f616(0x34f)]),_0x212b32),_0x158d61-=_0x20eb07[_0x27f616(0x34f)]+0x4;}}},Window_StatusParams[_0x25789e(0x866)][_0x25789e(0x93b)]=function(){const _0x3c6b42=_0x25789e;return VisuMZ[_0x3c6b42(0xf9)][_0x3c6b42(0x59c)]['Param'][_0x3c6b42(0xf5)][_0x3c6b42(0x73d)];},Window_StatusParams[_0x25789e(0x866)][_0x25789e(0x4c9)]=function(_0xa5d93d){const _0x339bfa=_0x25789e,_0x522f6c=this[_0x339bfa(0x777)](_0xa5d93d),_0x4cb5a2=VisuMZ['CoreEngine'][_0x339bfa(0x59c)][_0x339bfa(0x5c0)][_0x339bfa(0xf5)][_0xa5d93d],_0x1a5e9f=TextManager[_0x339bfa(0x8cd)](_0x4cb5a2),_0x504e45=this['_actor'][_0x339bfa(0x195)](_0x4cb5a2,!![]);this[_0x339bfa(0x66e)](_0x522f6c['x'],_0x522f6c['y'],0xa0,_0x4cb5a2,![]),this['resetTextColor'](),this[_0x339bfa(0x44a)](_0x504e45,_0x522f6c['x']+0xa0,_0x522f6c['y'],0x3c,_0x339bfa(0xe9));};if(VisuMZ['CoreEngine'][_0x25789e(0x59c)][_0x25789e(0x359)][_0x25789e(0x179)]){VisuMZ['CoreEngine'][_0x25789e(0x59c)]['KeyboardInput'][_0x25789e(0x3bd)]&&(Window_NameInput[_0x25789e(0x757)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x25789e(0x83d),'OK']);;VisuMZ[_0x25789e(0xf9)][_0x25789e(0x97d)]=Window_NameInput[_0x25789e(0x866)][_0x25789e(0x928)],Window_NameInput[_0x25789e(0x866)][_0x25789e(0x928)]=function(_0x3813cf){const _0x4aeaf6=_0x25789e;this[_0x4aeaf6(0x26d)]=this[_0x4aeaf6(0x605)](),VisuMZ[_0x4aeaf6(0xf9)][_0x4aeaf6(0x97d)]['call'](this,_0x3813cf),this[_0x4aeaf6(0x26d)]==='default'?this[_0x4aeaf6(0x7a6)](0x0):_0x4aeaf6(0x519)===_0x4aeaf6(0x519)?(Input['clear'](),this['deselect']()):_0x27a9c5[_0x4aeaf6(0x2d8)]&&(this[_0x4aeaf6(0x29e)]=_0x4aeaf6(0x6e9));},Window_NameInput[_0x25789e(0x866)][_0x25789e(0x605)]=function(){const _0x3067e2=_0x25789e;if(Input[_0x3067e2(0x9dd)]())return _0x3067e2(0x5bf);return VisuMZ[_0x3067e2(0xf9)][_0x3067e2(0x59c)][_0x3067e2(0x359)]['DefaultMode']||_0x3067e2(0x715);},VisuMZ['CoreEngine']['Window_NameInput_processHandling']=Window_NameInput[_0x25789e(0x866)]['processHandling'],Window_NameInput['prototype'][_0x25789e(0x9a9)]=function(){const _0x593755=_0x25789e;if(!this[_0x593755(0x5c5)]())return;if(!this['active'])return;if(this[_0x593755(0x26d)]===_0x593755(0x715)&&Input[_0x593755(0x6d3)]())_0x593755(0x660)!==_0x593755(0x2bc)?this[_0x593755(0x8f4)]('default'):this[_0x593755(0x2db)]()&&_0x518516&&this[_0x593755(0x9fd)]()===0x1&&this[_0x593755(0x39b)]()===0x0?this['smoothSelect'](this['maxItems']()-0x1):_0x32583d[_0x593755(0xf9)]['Window_Selectable_cursorUp'][_0x593755(0x800)](this,_0x1f4cc1);else{if(Input[_0x593755(0x45c)](_0x593755(0x9fe)))_0x593755(0x705)===_0x593755(0x705)?(Input[_0x593755(0x6bc)](),this['processBack']()):this['_hideTileShadows']=!![];else{if(Input[_0x593755(0x43e)]('tab'))Input[_0x593755(0x6bc)](),this['_mode']===_0x593755(0x715)?this[_0x593755(0x8f4)](_0x593755(0x5bf)):this[_0x593755(0x8f4)](_0x593755(0x715));else{if(this[_0x593755(0x26d)]===_0x593755(0x715))this[_0x593755(0x9da)]();else{if(Input[_0x593755(0x45c)](_0x593755(0x472)))Input[_0x593755(0x6bc)](),this['switchModes']('keyboard');else{if(_0x593755(0x3a5)!==_0x593755(0x3a5)){if(_0x46f315[_0x593755(0x2ec)](_0x30d48a)){const _0x43fcc8=_0x4d410f[_0x593755(0xf9)][_0x593755(0x924)][_0xb0d8ec],_0x3ee577=_0x5df152[_0x593755(0xf9)][_0x593755(0x3d8)][_0x43fcc8];return _0x3ee577[_0x3ca154]||this[_0x593755(0xe5)](_0x572468);}}else VisuMZ[_0x593755(0xf9)]['Window_NameInput_processHandling'][_0x593755(0x800)](this);}}}}}},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x537)]=Window_NameInput[_0x25789e(0x866)][_0x25789e(0x127)],Window_NameInput[_0x25789e(0x866)][_0x25789e(0x127)]=function(){const _0x3e1320=_0x25789e;if(!this[_0x3e1320(0x939)]())return;if(this['_mode']===_0x3e1320(0x715)){if('ZHtEG'==='ZHtEG'){if(TouchInput[_0x3e1320(0x43e)]()&&this['isTouchedInsideFrame']())this['switchModes'](_0x3e1320(0x5bf));else TouchInput['isCancelled']()&&this[_0x3e1320(0x8f4)](_0x3e1320(0x5bf));}else this['processKeyboardDigitChange']();}else VisuMZ[_0x3e1320(0xf9)][_0x3e1320(0x537)]['call'](this);},Window_NameInput[_0x25789e(0x866)][_0x25789e(0x9da)]=function(){const _0x2f5234=_0x25789e;if(Input[_0x2f5234(0x45c)](_0x2f5234(0x2f5)))Input[_0x2f5234(0x6bc)](),this['onNameOk']();else{if(Input[_0x2f5234(0x16e)]!==undefined){let _0x4724d7=Input['_inputString'],_0x4b969a=_0x4724d7[_0x2f5234(0x73d)];for(let _0x44d2ee=0x0;_0x44d2ee<_0x4b969a;++_0x44d2ee){_0x2f5234(0x2fa)!==_0x2f5234(0x2fa)?(_0x1a841b[_0x2f5234(0x129)]=_0x293c4f,_0x280316[_0x2f5234(0x5a3)]=_0x5da0d0[_0x2f5234(0xbe)][_0x2f5234(0x2dd)](),_0x1fe9c0[_0x2f5234(0x15d)](_0x25efad),_0x56fd29[_0x2f5234(0x3e9)](_0x58abb8,_0x3f9f2d[_0x2f5234(0x5a3)]),_0x2481c4[_0x2f5234(0xbe)][_0x2f5234(0x7f8)](_0x4518a1[_0x2f5234(0x5a3)])):this[_0x2f5234(0x65f)][_0x2f5234(0x797)](_0x4724d7[_0x44d2ee])?SoundManager['playOk']():SoundManager[_0x2f5234(0x781)]();}Input['clear']();}}},Window_NameInput[_0x25789e(0x866)][_0x25789e(0x8f4)]=function(_0x1a4c44){const _0xd5c1b8=_0x25789e;let _0x1c25d0=this[_0xd5c1b8(0x26d)];this[_0xd5c1b8(0x26d)]=_0x1a4c44,_0x1c25d0!==this[_0xd5c1b8(0x26d)]&&(_0xd5c1b8(0x9d2)!==_0xd5c1b8(0x953)?(this[_0xd5c1b8(0x6b5)](),SoundManager[_0xd5c1b8(0x66f)](),this['_mode']===_0xd5c1b8(0x5bf)?this[_0xd5c1b8(0x7a6)](0x0):this[_0xd5c1b8(0x7a6)](-0x1)):this['hideButtonFromView']());},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x96f)]=Window_NameInput[_0x25789e(0x866)][_0x25789e(0x1e3)],Window_NameInput['prototype'][_0x25789e(0x1e3)]=function(_0x41ffd2){const _0x55de35=_0x25789e;if(this[_0x55de35(0x26d)]==='keyboard'&&!Input[_0x55de35(0x1d6)]())return;if(Input[_0x55de35(0x7e3)]())return;VisuMZ[_0x55de35(0xf9)]['Window_NameInput_cursorDown'][_0x55de35(0x800)](this,_0x41ffd2),this['switchModes'](_0x55de35(0x5bf));},VisuMZ[_0x25789e(0xf9)]['Window_NameInput_cursorUp']=Window_NameInput['prototype']['cursorUp'],Window_NameInput['prototype']['cursorUp']=function(_0x1b490e){const _0x1511c3=_0x25789e;if(this['_mode']==='keyboard'&&!Input['isArrowPressed']())return;if(Input[_0x1511c3(0x7e3)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorUp'][_0x1511c3(0x800)](this,_0x1b490e),this['switchModes'](_0x1511c3(0x5bf));},VisuMZ[_0x25789e(0xf9)]['Window_NameInput_cursorRight']=Window_NameInput['prototype'][_0x25789e(0x804)],Window_NameInput[_0x25789e(0x866)][_0x25789e(0x804)]=function(_0x421eb2){const _0x158b4d=_0x25789e;if(this[_0x158b4d(0x26d)]==='keyboard'&&!Input[_0x158b4d(0x1d6)]())return;if(Input[_0x158b4d(0x7e3)]())return;VisuMZ[_0x158b4d(0xf9)][_0x158b4d(0x863)][_0x158b4d(0x800)](this,_0x421eb2),this[_0x158b4d(0x8f4)](_0x158b4d(0x5bf));},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x887)]=Window_NameInput[_0x25789e(0x866)][_0x25789e(0x60f)],Window_NameInput['prototype'][_0x25789e(0x60f)]=function(_0xeb9ea9){const _0x49caae=_0x25789e;if(this[_0x49caae(0x26d)]===_0x49caae(0x715)&&!Input[_0x49caae(0x1d6)]())return;if(Input[_0x49caae(0x7e3)]())return;VisuMZ[_0x49caae(0xf9)]['Window_NameInput_cursorLeft'][_0x49caae(0x800)](this,_0xeb9ea9),this[_0x49caae(0x8f4)](_0x49caae(0x5bf));},VisuMZ[_0x25789e(0xf9)]['Window_NameInput_cursorPagedown']=Window_NameInput[_0x25789e(0x866)][_0x25789e(0x1d7)],Window_NameInput[_0x25789e(0x866)][_0x25789e(0x1d7)]=function(){const _0x5b8212=_0x25789e;if(this['_mode']==='keyboard')return;if(Input[_0x5b8212(0x7e3)]())return;VisuMZ['CoreEngine'][_0x5b8212(0x4f7)][_0x5b8212(0x800)](this),this[_0x5b8212(0x8f4)]('default');},VisuMZ['CoreEngine'][_0x25789e(0x559)]=Window_NameInput['prototype'][_0x25789e(0x9cf)],Window_NameInput['prototype'][_0x25789e(0x9cf)]=function(){const _0x455770=_0x25789e;if(this['_mode']===_0x455770(0x715))return;if(Input[_0x455770(0x7e3)]())return;VisuMZ[_0x455770(0xf9)][_0x455770(0x559)][_0x455770(0x800)](this),this[_0x455770(0x8f4)]('default');},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x78b)]=Window_NameInput['prototype'][_0x25789e(0x6b5)],Window_NameInput[_0x25789e(0x866)][_0x25789e(0x6b5)]=function(){const _0x3aedda=_0x25789e;if(this[_0x3aedda(0x26d)]===_0x3aedda(0x715)){this[_0x3aedda(0x890)][_0x3aedda(0x6bc)](),this[_0x3aedda(0x89e)][_0x3aedda(0x6bc)](),this[_0x3aedda(0x902)]();let _0x1389fc=VisuMZ[_0x3aedda(0xf9)][_0x3aedda(0x59c)][_0x3aedda(0x359)][_0x3aedda(0x9b5)]['split']('\x0a'),_0xdd3890=_0x1389fc[_0x3aedda(0x73d)],_0x21a88f=(this[_0x3aedda(0x90f)]-_0xdd3890*this[_0x3aedda(0x99b)]())/0x2;for(let _0x4b3240=0x0;_0x4b3240<_0xdd3890;++_0x4b3240){let _0x3fc98a=_0x1389fc[_0x4b3240],_0x37a7ed=this[_0x3aedda(0x341)](_0x3fc98a)[_0x3aedda(0x59d)],_0x13b71d=Math[_0x3aedda(0x36f)]((this['contents']['width']-_0x37a7ed)/0x2);this[_0x3aedda(0x67d)](_0x3fc98a,_0x13b71d,_0x21a88f),_0x21a88f+=this['lineHeight']();}}else VisuMZ[_0x3aedda(0xf9)][_0x3aedda(0x78b)][_0x3aedda(0x800)](this);};};VisuMZ[_0x25789e(0xf9)][_0x25789e(0x200)]=Window_ShopSell[_0x25789e(0x866)][_0x25789e(0x773)],Window_ShopSell[_0x25789e(0x866)][_0x25789e(0x773)]=function(_0x56a4e8){const _0x42b1ff=_0x25789e;return VisuMZ['CoreEngine'][_0x42b1ff(0x59c)][_0x42b1ff(0x25e)]['KeyItemProtect']&&DataManager[_0x42b1ff(0x3d2)](_0x56a4e8)?![]:VisuMZ['CoreEngine'][_0x42b1ff(0x200)][_0x42b1ff(0x800)](this,_0x56a4e8);},Window_NumberInput['prototype'][_0x25789e(0x2db)]=function(){return![];};function _0x481b(_0x5a6cf0,_0x37db44){const _0xcfe674=_0xcfe6();return _0x481b=function(_0x481b90,_0x1fcd76){_0x481b90=_0x481b90-0x99;let _0x1624b1=_0xcfe674[_0x481b90];return _0x1624b1;},_0x481b(_0x5a6cf0,_0x37db44);}VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)][_0x25789e(0x359)]['EnableNumberInput']&&(VisuMZ[_0x25789e(0xf9)][_0x25789e(0x352)]=Window_NumberInput[_0x25789e(0x866)][_0x25789e(0x4f1)],Window_NumberInput['prototype'][_0x25789e(0x4f1)]=function(){const _0x12ea3f=_0x25789e;VisuMZ[_0x12ea3f(0xf9)]['Window_NumberInput_start'][_0x12ea3f(0x800)](this),this[_0x12ea3f(0x7a6)](this['_maxDigits']-0x1),Input['clear']();},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x6d0)]=Window_NumberInput[_0x25789e(0x866)]['processDigitChange'],Window_NumberInput[_0x25789e(0x866)][_0x25789e(0x827)]=function(){const _0x3dfb6f=_0x25789e;if(!this[_0x3dfb6f(0x939)]())return;if(Input[_0x3dfb6f(0x7e3)]())this[_0x3dfb6f(0x2c0)]();else{if(Input[_0x3dfb6f(0x45c)](_0x3dfb6f(0x9fe)))this[_0x3dfb6f(0x3b7)]();else{if(Input['_inputSpecialKeyCode']===0x2e)_0x3dfb6f(0x4cf)==='OgMsq'?this[_0x3dfb6f(0x2b9)]():this['_forcedBattleSys']=_0x3dfb6f(0x35c);else{if(Input[_0x3dfb6f(0x21e)]===0x24)this[_0x3dfb6f(0x265)]();else Input[_0x3dfb6f(0x21e)]===0x23?this['processKeyboardEnd']():VisuMZ['CoreEngine']['Window_NumberInput_processDigitChange'][_0x3dfb6f(0x800)](this);}}}},Window_NumberInput[_0x25789e(0x866)][_0x25789e(0x39d)]=function(){const _0x269a73=_0x25789e;if(!this[_0x269a73(0x192)]())return;Input['isNumpadPressed']()?this[_0x269a73(0x2c0)]():_0x269a73(0x7c6)!==_0x269a73(0x3f8)?Window_Selectable[_0x269a73(0x866)][_0x269a73(0x39d)][_0x269a73(0x800)](this):_0xcee63e[_0x269a73(0x77d)](!![]);},Window_NumberInput[_0x25789e(0x866)][_0x25789e(0x39e)]=function(){},Window_NumberInput['prototype'][_0x25789e(0x2c0)]=function(){const _0x4d646b=_0x25789e;if(String(this[_0x4d646b(0x741)])[_0x4d646b(0x73d)]>=this[_0x4d646b(0x4ba)])return;const _0x488ae6=Number(String(this[_0x4d646b(0x741)])+Input[_0x4d646b(0x16e)]);if(isNaN(_0x488ae6))return;this[_0x4d646b(0x741)]=_0x488ae6;const _0x284283='9'[_0x4d646b(0x4a5)](this[_0x4d646b(0x4ba)]);this[_0x4d646b(0x741)]=this[_0x4d646b(0x741)][_0x4d646b(0x68d)](0x0,_0x284283),Input[_0x4d646b(0x6bc)](),this[_0x4d646b(0x6b5)](),SoundManager[_0x4d646b(0x72e)](),this[_0x4d646b(0x7a6)](this[_0x4d646b(0x4ba)]-0x1);},Window_NumberInput['prototype'][_0x25789e(0x3b7)]=function(){const _0x8128c1=_0x25789e;this[_0x8128c1(0x741)]=Number(String(this[_0x8128c1(0x741)])[_0x8128c1(0x993)](0x0,-0x1)),this['_number']=Math[_0x8128c1(0x311)](0x0,this[_0x8128c1(0x741)]),Input[_0x8128c1(0x6bc)](),this[_0x8128c1(0x6b5)](),SoundManager[_0x8128c1(0x72e)](),this['select'](this[_0x8128c1(0x4ba)]-0x1);},Window_NumberInput[_0x25789e(0x866)][_0x25789e(0x2b9)]=function(){const _0x529a56=_0x25789e;this[_0x529a56(0x741)]=Number(String(this[_0x529a56(0x741)])[_0x529a56(0x91e)](0x1)),this[_0x529a56(0x741)]=Math[_0x529a56(0x311)](0x0,this[_0x529a56(0x741)]),Input[_0x529a56(0x6bc)](),this[_0x529a56(0x6b5)](),SoundManager[_0x529a56(0x72e)](),this[_0x529a56(0x7a6)](this[_0x529a56(0x4ba)]-0x1);},Window_NumberInput[_0x25789e(0x866)]['processKeyboardHome']=function(){const _0x489372=_0x25789e;if(this[_0x489372(0x39b)]()===0x0)return;Input[_0x489372(0x6bc)](),this[_0x489372(0x6b5)](),SoundManager[_0x489372(0x72e)](),this[_0x489372(0x7a6)](0x0);},Window_NumberInput[_0x25789e(0x866)][_0x25789e(0x6d5)]=function(){const _0x3fd19a=_0x25789e;if(this[_0x3fd19a(0x39b)]()===this[_0x3fd19a(0x4ba)]-0x1)return;Input['clear'](),this[_0x3fd19a(0x6b5)](),SoundManager[_0x3fd19a(0x72e)](),this['select'](this['_maxDigits']-0x1);});;function _0xcfe6(){const _0xb1d3e7=['70617QVseqF','keHpr','AnimationPoint','SParamVocab4','ItemBgType','_action','targetY','paramWidth','zAxkl','PictureEraseAll','WNnVl','nickname','showIncompleteTilesetError','DisplayLockY','StatusParamsRect','updateKeyText','hpGaugeColor1','dashToggle','StatusRect','isBottomButtonMode','switchModes','setMoveEasingType','tab','OLssD','isItem','itemEva','_onKeyPress','Map%1.json','JLuBE','center','QOXzn','repositionEnemiesByResolution','CodeJS','MenuBg','resetTextColor','uiAreaWidth','keyMapper','checkScrollBarBitmap','onKeyDownKeysF6F7','_refreshBack','KDqBg','HIT','bUgMv','PyBNZ','AICdJ','ListBgType','JXHrB','innerHeight','%1〘Choice\x20%2〙\x20%3%1','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','Enable','editWindowRect','drawIcon','randomInt','Scene_Name_create','_onError','loadTitle1','displayName','isLoopHorizontal','hit','update','SCVJV','substring','trim','waiting','backOpacity','KkDhk','rcOeM','ControllerMatches','RightMenus','Game_Map_scrollLeft','log','initialize','NuOzp','INQUAD','QbdZD','fontSize','offsetX','dimColor2','command357','isRepeated','altKey','_upArrowSprite','INELASTIC','EditBgType','fzNMm','HVNDN','fillRect','OutlineColorDmg','isOpenAndActive','centerX','maxItems','WIN_OEM_FJ_MASSHOU','maxBattleMembers','ExtractStrFromList','INBOUNCE','3maJOuu','Scene_SingleLoadTransition','%1:\x20Exit\x20','EXSEL','_createInternalTextures','LevelUpFullHp','rISUC','SceneManager_onKeyDown','buttonAssistOffset1','initMembersCoreEngine','IconParam2','getLevel','isSceneBattle','centerY','uaoJx','MHxQK','_targetAnchor','0.00','forceOutOfPlaytest','hEQEI','RYrSu','WIN_OEM_CUSEL','TextCodeNicknames','_image','Game_Interpreter_command355','PreserveNumbers','text%1','mpGaugeColor2','Window_refreshBack','createWindowLayer','_cancelButton','Scene_Map_createSpritesetFix','ProfileBgType','InputBgType','Sprite_Button_initialize','_moveEasingType','addCommand','Scene_TitleTransition','_centerElementCoreEngine','Game_BattlerBase_refresh','ScreenShake','XParamVocab5','createTextPopupWindow','Scene_Map_createSpriteset','keyRepeatWait','outlineColor','STRUCT','Window_NameInput_cursorDown','destroyScrollBarBitmaps','Window_Base_createContents','VjddR','getColor','YHvMB','Game_Temp_initialize','LZyaC','IconXParam0','F21','SParamVocab2','ColorHPGauge2','bfplu','xjCiP','Window_NameInput_initialize','Finish','OsMjS','_pauseSignSprite','left','scrollbar','_targetOffsetY','bitmapWidth','EVA','addQueue','_playtestF7Looping','Flat1','F11','IconXParam2','setEnemyAction','ShiftR_Toggle','F15','level','code','fjjhm','OUTCUBIC','_currentBgm','slice','cancel','coYVA','isInputting','round','_coreEngineShakeStyle','INOUTCUBIC','PixelateImageRendering','lineHeight','updateTransform','addChild','BBaWx','aDCxg','platform','selectLast','_lastOrigin','characters','Bitmap_drawText','outlineColorGauge','Game_Action_numRepeats','tcpRz','NUDCK','processHandling','ShowItemBackground','createScrollBarSprites','processTouchModernControls','command355','Scene_Map_updateMainMultiply','PDR','setupCoreEasing','eNaOu','iLmQD','SceneManager_isGameActive','AutoScrollLockX','NameInputMessage','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','_addShadow','menuShowButton','split','Scene_Status_create','paramFlat','ParseArmorNotetags','TGR','isMagical','_defaultStretchMode','_name','PageChange','zWayF','DetachBattlePictureContainer','setAnchor','TextJS','FUNC','isHandled','moveRelativeToResolutionChange','PLUS','ScaleY','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','ImprovedAccuracySystem','_shakePower','WASD','cursorPageup','yfubQ','setBackgroundOpacity','fCMsi','YzQes','_cacheScaleX','_anchor','registerCommand','updateFauxAnimations','targetSpritePosition','buttonY','processKeyboardHandling','Color','processPointAnimationRequests','isGamepadConnected','LEFT','LvExpGauge','IconSParam4','ColorMPCost','XEZqy','gksiL','playTestF6','toLocaleString','PictureShowIcon','isSmartEventCollisionOn','BZAex','Scene_GameEnd_createBackground','scrollUp','Game_Action_itemHit','displayY','batch','displayX','_windowskin','Sprite_Actor_setActorHome','_statusParamsWindow','QXqYk','up2','apply','end','Power','PictureID','Origin','updateScrollBarVisibility','vSthN','_commandWindow','ColorNormal','maxCols','backspace','itemBackColor1','Game_Map_scrollRight','_coreEasingType','playOnceParallelInterpreter','setActorHomeRepositioned','getInputButtonString','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','NGQBI','BlurStrength','paramMax','Window_StatusBase_drawActorSimpleStatus','OUTQUART','learnings','adjustBoxSize','ENTER_SPECIAL','gold','DataManager_setupNewGame','StatusBgType','OptionsMenu','LNsne','JUNJA','BiaMH','FakFB','GJZJb','UNDERSCORE','system','pow','RSHQt','Window_Base_destroyContents','maxLvGaugeColor2','initialBattleSystem','KJEoU','updateLastTarget','F22','inputWindowRect','removeAnimationFromContainer','and\x20add\x20it\x20onto\x20this\x20one.','NUMPAD4','helpAreaBottom','_lastCommandSymbol','style','_bgmBuffer','SystemSetFontSize','CTRL','_onLoad','sin','makeActionList','gaugeRate','nextLevelExp','_stored_expGaugeColor2','getBattleSystem','rbpad','TRG','outbounce','_muteSound','_movementDuration','qnhVC','dkXUy','initCoreEngine','iconHeight','_baseTexture','font-smooth','sparamRateJS','INOUTQUAD','Zoqye','dropItems','text','CIRCUMFLEX','drawSegment','getGamepads','Spriteset_Battle_createEnemies','QczpB','paramchangeTextColor','_customModified','nfBbO','KeySHIFT','moveCancelButtonSideButtonLayout','requestMotion','stretch','layoutSettings','getKeyboardInputButtonString','CustomParamType','pitch','advanced','right','eDJZo','RwYyW','drawFace','playMiss','AnimationID','requiredWtypeId1','_stored_systemColor','updateCurrentEvent','KnIad','getLastPluginCommandInterpreter','owVmm','DisplayedParams','Input_clear','Max','eSymg','CoreEngine','isAnimationPlaying','buttons','_stored_powerUpColor','setTopRow','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','_animation','Keyboard','AllTroops','subtitle','xparamFlatBonus','show','CommandRect','visible','F12','baseTextRect','paramPlus','ColorTPCost','createEnemies','1.4.4','_updateFilterArea','itemPadding','rzQXG','ExtJS','INBACK','Game_Action_setAttack','renderNoMask','playCursorSound','F16','INOUTQUART','CreateBattleSystemID','BgType','setupCoreEngine','ATK','Bitmap_clearRect','updateBgsParameters','MultiKeyFmt','PDpmE','ActorTPColor','removeAllPointAnimations','_menuButton','INEXPO','UpdatePictureCoordinates','vert','ColorMPGauge1','name','processTouch','vertical','pan','RLyjU','BACK_QUOTE','Scene_Skill_create','drawActorLevel','en-US','home','_target','qkdpi','Chance','addWindow','Flat','processTimingData','currentLevelExp','drawGameSubtitle','_stored_hpGaugeColor1','useDigitGrouping','skillId','mainAreaTop','_clientArea','QAOad','yrHTV','targets','targetContentsOpacity','BTestArmors','_tempActor','zBnsA','uKzmu','SMPRS','initCoreEasing','zwSUq','_stored_maxLvGaugeColor2','SwitchToggleRange','Scene_Boot_updateDocumentTitle','VFteY','indexOf','MwgTZ','lvguJ','catchLoadError','cos','sparamRate2','_buttonAssistWindow','option','_stored_hpGaugeColor2','helpAreaTop','BottomButtons','setEvent','WTiPj','measureTextWidth','Game_Map_setup','Game_Action_itemEva','_optionsWindow','updateBgmParameters','createChildSprite','\x5c}❪SHIFT❫\x5c{','valueOutlineWidth','420248EwDZiN','CWWPA','DigitGroupingStandardText','SELECT','TimeProgress','maxTurns','_scrollBarHorz','IconXParam3','ceil','qbhvK','min','destroyCoreEngineMarkedBitmaps','WIN_OEM_PA1','_inputString','IconXParam1','levelUpRecovery','seVolume','evade','Game_Map_scrollUp','Item-%1-%2','AudioChangeBgsVolume','ColorPowerDown','meVolume','Game_Picture_scaleX','EnableNameInput','createPageButtons','src','randomJS','xNVtq','PnLfP','centerCameraCheckData','_shakeDuration','PLAY','ColorManager_loadWindowskin','background','ParseTilesetNotetags','battleSystem','scrollLeft','setClickHandler','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','AcpzT','SwitchRandomizeOne','BarThickness','ShortcutScripts','SideButtons','_windowLayer','changeTextColor','fgboJ','ngebz','isCursorMovable','exit','AccuracyBoost','paramValueByName','ctrl','saveViewport','ImgLoad','NUMPAD5','SideView','outlineColorDmg','tpGaugeColor2','_targetX','%1/','initMembers','Graphics_centerElement','AGI','updatePosition','pagedown','nMpBF','EyPAf','backgroundBitmap','kPWZR','setSideButtonLayout','SCROLLBAR','updateDuration','setLastGamepadUsed','blockWidth','numActions','_onceParallelInterpreters','ColorCrisis','currentExp','innerWidth','setupCustomRateCoreEngine','RowSpacing','Name','isDying','recoverAll','iGJBs','TargetAngle','cSAqH','Window_Selectable_processTouch','_helpWindow','shouldAutosave','YqavM','updatePictureSettings','ParamMax','BarBodyColor','_clickHandler','PictureFilename','Window_StatusBase_drawActorLevel','isMVAnimation','VisuMZ_2_BattleSystemOTB','MAX_SAFE_INTEGER','NUMPAD0','itemWindowRect','IconSet','normalColor','Game_Interpreter_PluginCommand','NGmDr','jsQuickFunc','areButtonsHidden','alignBottom','pendingColor','SmgfS','iPDCI','createCancelButton','evaded','Subtitle','isArrowPressed','cursorPagedown','Window_Selectable_cursorUp','isItemStyle','process_VisuMZ_CoreEngine_ControllerButtons','NscpJ','App','redraw','vsasj','loading','createDimmerSprite','updatePositionCoreEngine','loadMapData','cursorDown','CuQkM','goldWindowRect','XlSSN','onload','WindowLayer_render','kekzH','setFrame','retrievePointAnimation','SParamVocab3','defineProperty','_onKeyDown','IconSParam5','applyForcedGameTroopSettingsCoreEngine','animationId','openURL','parameters','runCombinedScrollingTextAsCode','pictureId','Scene_Battle_createSpriteset_detach','Spriteset_Base_initialize','Abbreviation','xclTU','(\x5cd+)([%％])>','updateShadow','NUMPAD9','fioin','join','areButtonsOutsideMainUI','Window_ShopSell_isEnabled','baseId','_scaleX','_viewportSize','paramFlatJS','xparamPlusJS','PositionX','xhIdK','tMHNI','YLGSk','setViewport','bkJOP','DebugConsoleLastControllerID','Scene_Options_create','optionsWindowRect','Show\x20Scrolling\x20Text\x20Script\x20Error','SkEBN','Bitmap_resize','isScrollBarVisible','processSoundTimings','createPointAnimation','drawGameVersion','EnableJS','Mute','DOWN','xparamFlat2','setup','5106530NVFdXC','isActor','down2','_inputSpecialKeyCode','hpColor','isRightInputMode','coreEngineRepositionEnemies','buttonAssistOffset4','nDtfx','INQUINT','loadIconBitmap','VisuMZ_4_UniqueTileEffects','mainAreaHeightSideButtonLayout','_timeDuration','_dummyWindow','onLoad','updatePlayTestF7','traitObjects','Linear','xQRIq','jznUM','wait','OUTBACK','_inputWindow','KdmRH','SParamVocab6','RepositionEnemies','deathColor','keypress','Window_EquipItem_isEnabled','TfQlO','bodyColor','inBattle','reservePlayTestNewGameCommonEvent','attackSkillId','%1\x0a','DETACH_PICTURE_CONTAINER','mainAreaHeight','VIEWPORT','ItemRect','F24','SLEEP','pdkSL','updatePositionCoreEngineShakeRand','vuJRS','XiMOe','mpColor','isTpb','scale','mrPRU','INCUBIC','onerror','optSideView','_balloonQueue','mute','drawParamName','remove','isPlaytest','WIN_OEM_RESET','sIeta','qQvvM','_allTextHeight','_goldWindow','ParseWeaponNotetags','areTileShadowsHidden','_scrollDuration','KlBsH','QoL','itemHitImprovedAccuracy','button','WIN_OEM_FJ_ROYA','ParseStateNotetags','createMenuButton','_pointAnimationQueue','processKeyboardHome','updatePositionCoreEngineShakeVert','ExportAllMapText','parallaxes','_index','RegExp','BattleManager_update','SystemSetWindowPadding','_mode','_cache','isFauxAnimationPlaying','LSAvg','showDevTools','ADD','OfzRU','getCustomBackgroundSettings','traitsPi','canUse','dBoOh','isNextScene','dIvJB','addAnimationSpriteToContainer','isWindowMaskingEnabled','operation','_pageupButton','ONE_MINUS_SRC_ALPHA','textAlign','EXR','alphabetic','setupBattleTestItems','rHXGa','pages','rightArrowWidth','Scene_Map_createMenuButton','drawBackgroundRect','useFontWidthFix','Skill-%1-%2','AMPERSAND','Window_Base_drawText','BattleManager_checkSubstitute','loadGameImagesCoreEngine','number','Scene_Boot_onDatabaseLoaded','slotWindowRect','xparam','INOUTCIRC','TkaPB','fFdUa','RvRpZ','Scene_Battle_createSpritesetFix','Spriteset_Base_isAnimationPlaying','playEscape','NUM_LOCK','erasePicture','aVlED','gaugeBackColor','HLqfW','_forcedBattleSys','measureText','removeChild','uiAreaHeight','IconSParam0','drawGauge','overallHeight','setAttack','maxScrollbar','playLoad','AdjustAngle','showFauxAnimations','lastAnimationSprite','ctGaugeColor2','SubfolderParse','animations','getLastUsedGamepadType','isSideView','updatePictureAntiZoom','zRmlw','_fauxAnimationSprites','XParamVocab0','makeCoreEngineCommandList','ActorHPColor','textColor','MODECHANGE','PHA','processKeyboardDelete','padding','DamageColor','feVhO','〘Common\x20Event\x20%1:\x20%2〙\x20End','xparamPlus2','blendFunc','processKeyboardDigitChange','5184zVtodl','nTzSQ','jBvZz','anglePlus','_offsetX','bgm','_profileWindow','description','_scaleY','createPointAnimationQueue','DxkLp','down','wholeDuration','setupFont','gainItem','enable','eNRZx','getLastGamepadUsed','ColorExpGauge2','buttonAssistText3','HRG','mZoPq','vertJS','VisuMZ_2_BattleSystemBTB','NUM','cursorUp','isUseModernControls','setColorTone','seek','MAXMP','isInstanceOfSceneMap','Gold','cXSXg','AllMaps','X:\x20%1','PGDN','dnYoW','events','DIVIDE','_screenX','ExtractStrFromTroop','_centerElement','Sprite_Button_updateOpacity','includes','Bitmap_drawTextOutline','worldTransform','ParseSkillNotetags','oCNAh','currentClass','xparamPlus1','getButtonAssistLocation','Window_Base_drawIcon','enter','BgFilename2','Troop%1','PictureEasingType','Scene_Battle_createSpriteset','RCTPc','contains','child_process','refreshWithTextCodeSupport','_refreshPauseSign','Plus','TlukI','DefaultStyle','_lastGamepad','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','nnCRe','vjzFx','overrideMimeType','levelUp','npnFC','CommandList','CancelText','buttonAssistText1','addOnceParallelInterpreter','ZLxDw','buttonAssistKey%1','SParamVocab1','\x20Origin:\x20%1','max','setEasingType','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','powerUpColor','QUESTION_MARK','onKeyDown','translucentOpacity','Scene_Name_onInputOk','ExportCurTroopText','IconIndex','QgMIW','_backSprite1','SParamVocab5','paramFlatBonus','Mtbfp','GRD','isNwjs','_gamepadWait','setupScrollBarBitmap','mainAreaBottom','offOpacity','LoadError','jsmTp','targetScaleX','ParseItemNotetags','#%1','skillTypeWindowRect','needsUpdate','_destroyCanvas','GoldFontSize','_targetScaleY','VisuMZ_2_BattleSystemETB','successRate','Scene_Base_create','_textPopupWindow','GSGcQ','Input_update','ZgjGi','showPointAnimations','GbiOX','battlebacks1','Scene_MenuBase_helpAreaTop','_coreEasing','_mapNameWindow','F17','CSvIs','PTB','process_VisuMZ_CoreEngine_Functions','textSizeEx','itypeId','IconXParam7','Renderer','PrNFq','isClosed','Upper\x20Left','Game_BattlerBase_initMembers','13254144FNjays','updateText','Input_pollGamepads','helpWindowRect','vTXiJ','dhYhN','iconWidth','makeInputButtonString','menu','Window_NumberInput_start','CategoryBgType','VisuMZ_2_BattleSystemFTB','setMute','DXAnw','BcxpO','createKeyJS','KeyboardInput','F18','_forcedTroopView','FTB','HELP','AutoScrollLockY','SYBxZ','valueOutlineColor','MjkDn','NUMPAD3','WIN_OEM_COPY','rgba(0,\x200,\x200,\x201.0)','Game_Picture_x','pictureButtons','measureTextWidthNoRounding','odSxX','return\x200','GameEnd','Window','catchException','string','DigitGroupingDamageSprites','floor','_animationQueue','TitlePicButtons','bgmVolume','qwHHl','Window_Selectable_cursorDown','refreshScrollBarBitmap','createJsQuickFunction','》Comment《\x0a%1\x0a','_opacity','hpGaugeColor2','VisuMZ_1_OptionsCore','NUMPAD2','_numberWindow','sparam','onInputOk','startMove','Rate1','boxWidth','crisisColor','XParamVocab4','(\x5cd+)>','ColorHPGauge1','isAlive','maxVert','open','_textQueue','SlotBgType','FRfEy','makeDocumentTitle','smooth','WIN_OEM_PA2','AXSJp','goto','overallWidth','EmiyE','applyEasing','wVefA','INOUTBACK','Game_Picture_y','mpCostColor','processEscape','JlNem','\x5c}❪TAB❫\x5c{','index','_fauxAnimationQueue','processCursorMove','processCursorHomeEndTrigger','ButtonAssist','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','NUMPAD6','oUhZi','statusWindowRect','isNormalPriority','dGvKO','_slotWindow','_previousClass','format','kipDK','WIN_OEM_BACKTAB','playTestShiftR','setAction','_pictureName','NEAREST','addChildToBack','rowSpacing','paramPlusJS','scaleSprite','nLbkB','3925338wukfnt','NumberRect','target','processKeyboardBackspace','mhp','vNCFk','hasEncryptedImages','setLastPluginCommandInterpreter','hynOH','QwertyLayout','BackOpacity','onXhrError','fpUYt','faces','SDcxa','_pagedownButton','processAlwaysEscape','BTestItems','strokeRect','HpgIW','adjustPictureAntiZoom','CONVERT','MRG','_stored_ctGaugeColor1','OUTQUINT','DigitGroupingGaugeSprites','NUMPAD8','Game_Interpreter_command122','process_VisuMZ_CoreEngine_Settings','pnlSh','isKeyItem','loadWindowskin','SZrmG','FGwrq','isAutoColorAffected','_height','ControllerButtons','IconSParam7','_digitGroupingEx','SEMICOLON','wpwBQ','buttonAssistSwitch','tooVa','autoRemovalTiming','_pictureContainer','oYJAU','deselect','result','targetOpacity','applyCoreEasing','mpGaugeColor1','paramMaxJS','Actor','playBgm','_drawTextOutline','vtAXu','SParameterFormula','playTestShiftT','skipBranch','catchUnknownError','PGUP','10HsOyih','targetObjects','stencilFunc','animationShouldMirror','changeAnglePlusData','filter','setCommonEvent','XPFvI','_screenY','titleCommandWindow','send','createContents','wehod','Bitmap_fillRect','oLPeQ','Armor-%1-%2','CommonEventID','sqrt','jBYTl','categoryWindowRect','_text','_lastPluginCommandInterpreter','_baseSprite','blt','VisuMZ_1_BattleCore','createPointAnimationTargets','setAnglePlusData','stringKeyMap','horz','UmRJn','CvmvJ','targetBackOpacity','jIxNs','IconXParam4','YMTKC','EyPCX','reserveCommonEvent','【%1】\x0a','bitmapHeight','dndWZ','removePointAnimation','OUTELASTIC','_bitmap','lkrmz','OnLoadJS','xEtTt','skillTypes','IWZdX','_hp','LhNhJ','OkText','mirror','fdErI','AudioChangeBgsPan','FITgM','updateScene','retrieveFauxAnimation','Wait','doesNameContainBannedWords','mapId','_duration','WIN_OEM_ENLW','buttonAssistText%1','Game_Picture_initBasic','MapNameTextCode','updateDashToggle','updateData','missed','reserveNewGameCommonEvent','application/json','Scene_Map_updateMain','FrMRK','MaxDuration','kaOTb','STB','ParseClassNotetags','RypXw','isTriggered','ParseActorNotetags','QOEWm','GroupDigits','ColorMPGauge2','bNuPz','F23','ChgWR','_lastX','_animationSprites','textWidth','pQynu','drawText','createSpriteset','Layer','Game_Event_isCollidedWithEvents','allowShiftScrolling','Game_Screen_initialize','paramName','processCursorMoveModernControls','_stored_crisisColor','XeaZJ','PositionY','pressed','shift','RequireFocus','CLEAR','updateEffekseer','STENCIL_TEST','TCR','isSpecialCode','bgsVolume','setSkill','SystemLoadAudio','_data','drawGoldItemStyle','_targetOpacity','lbCQL','_originalViewport','updatePositionCoreEngineShakeHorz','Scene_Shop_create','RevertPreserveNumbers','create','STR','getInputMultiButtonStrings','stencilOp','hpggn','ESC','targetScaleY','updatePositionCoreEngineShakeOriginal','CYqig','_mainSprite','escape','ENTER','SParamVocab9','updatePadding','getBackgroundOpacity','SHIFT','MainMenu','TextManager_param','anchor','arePageButtonsEnabled','isSideButtonLayout','isAnimationForEach','HelpRect','buttonAssistText4','VbKqx','rfifq','ARRAYSTRUCT','setBattleSystem','DrawItemBackgroundJS','ZAhRw','icnSa','EscapeAlways','_cacheScaleY','WIN_OEM_PA3','gainSilentTp','Spriteset_Base_update','_targetScaleX','CRSEL','initRotation','enemies','LFLEZ','stypeId','SLASH','Game_Picture_angle','Unnamed','isExpGaugeDrawn','IconSParam1','Title','Bitmap_blt','_isPlaytest','helpAreaTopSideButtonLayout','SkillTypeBgType','Tilemap_addShadow','img/%1/','_rate','constructor','BattleSystem','move','_mirror','MAXHP','BarOffset','repeat','xScrollLinkedOffset','_stored_mpCostColor','Scene_Load','scrollY','INOUTSINE','RIGHT','CLOSE_PAREN','determineSideButtonLayoutValid','canEquip','PItUz','clearRect','sSKeH','EmAZD','Sprite_Gauge_gaugeRate','Scene_MenuBase_mainAreaHeight','close','Scene_Map_initialize','iBByj','MDR','GoldBgType','_maxDigits','isTouchedInsideFrame','SellRect','ryoZk','item','tLMFK','LUK','isOpening','BKSP','kpGwS','Sprite_destroy','10hjskcm','_targetY','paramBase','padZero','drawItem','updateClose','adjustSprite','LoadMenu','filters','onInputBannedWords','OgMsq','FDR','subjectHitRate','maxGold','EnableMasking','FftPg','gAPBQ','writeFile','Bitmap_drawCircle','SwitchRandomizeRange','HOME','command111','CRI','Scene_Map_shouldAutosave','touchUI','scrollbarHeight','_statusEquipWindow','1.3.0','paramRate1','removeOnceParallelInterpreter','itemHeight','filterArea','itemHit','Window_Base_drawFace','ItemStyle','Input_shouldPreventDefault','DummyRect','setHome','buttonAssistWindowButtonRect','_stored_maxLvGaugeColor1','battlerHue','lAWBc','drawActorNickname','RELIV','start','TextCodeClassNames','Game_Picture_updateMove','transform','BaKrd','isEventRunning','Window_NameInput_cursorPagedown','HclUP','OfZJb','uZTzu','JSON','_smooth','hide','tileHeight','ConvertNumberToString','_hovered','_listWindow','ParseAllNotetags','zpChE','setViewportCoreEngineFix','evaluate','_refreshArrows','DurationPerChat','loadSystem','FontShadows','F14','Untitled','windowOpacity','ColorTPGauge2','scrollDown','VOLUME_UP','PictureRotateBy','OUTCIRC','buttonAssistText2','initialLevel','MvAnimationRate','hideButtonFromView','responseText','OS_KEY','vtNMN','VYBsL','scaleMode','updateOnceParallelInterpreters','alpha','buttonAssistText5','encounterStepsMinimum','numberWindowRect','Game_Actor_changeClass','GoldOverlap','FontWidthFix','framesMax','ExportStrFromAllMaps','members','Duration','Window_Scrollable_update','AnimationMirrorOffset','changeClass','_updateGamepadState','KeyItemProtect','removeAllFauxAnimations','framesMin','BaseTexture','commandWindowRows','bCmxN','context','WIN_OEM_CLEAR','mainCommandWidth','TextStr','_commonEventLayers','playBgs','Window_NameInput_processTouch','isGameActive','MenuLayout','MrwRs','viewport','maxVisibleItems','bind','animationBaseDelay','DOLLAR','_digitGrouping','ForceNoPlayTest','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','drawTextTopAligned','getPointAnimationLayer','URL','abs','StartID','updateRotation','type','_changingClass','refreshActor','_offsetY','loadTitle2','XViPd','updateMainMultiply','value','ItemBackColor2','setHandler','_pictureCoordinatesWindow','Speed','opacity','OPEN_BRACKET','zRRvS','getControllerInputButtonMatch','Window_NameInput_cursorPageup','Class-%1-%2','terms','drawCurrencyValue','Window_Base_update','<%1\x20%2:[\x20]','pop','LINEAR','Game_Interpreter_command105','battlebacks2','Input_setupEventHandlers','PRINT','openness','actorWindowRect','CriCA','vyaWl','_sideButtonLayout','PERIOD','ItemBackColor1','drawGameTitle','elORF','DsiVH','Bitmap_initialize','(\x5cd+\x5c.?\x5cd+)>','pictures','GQBhT','setSize','BannedWords','_targetOffsetX','mainAreaTopSideButtonLayout','SwitchToggleOne','destroyed','itemBackColor2','SceneManager_exit','INCIRC','tpGaugeColor1','Type','zNVdC','paramRateJS','F19','UifdX','jrtFt','WIN_OEM_WSCTRL','isActiveTpb','VisuMZ_2_BattleSystemCTB','_anglePlus','SParamVocab0','bNlNs','Scene_Battle_update','faceWidth','usableSkills','BottomHelp','UOBtw','createBackground','clearZoom','_width','_currentMap','LYBLL','createCustomBackgroundImages','paramRate','toUpperCase','ParamName','exportAllMapStrings','wZAyB','ScreenResolution','DAlep','GoldRect','Settings','width','ItemHeight','Plus2','createFauxAnimationQueue','BACKSPACE','processMoveCommand','pos','restore','focus','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','wwpUZ','isPointAnimationPlaying','startAutoNewGame','BlendMode','_movementWholeDuration','moveMenuButtonSideButtonLayout','yThmj','KeyTAB','helpAreaHeight','<JS\x20%1\x20%2:[\x20](.*)>','updateAnglePlus','push','ColSpacing','initRotationCoreEngine','terminate','_opening','DigitGroupingLocale','Graphics_printError','bgs','UwpAy','object','Game_System_initialize','loadSystemImages','buttonAssistOffset5','default','Param','kacuV','bQJKm','ExportStrFromAllTroops','DigitGroupingExText','isOpen','Icon','EquipMenu','StatusParamsBgType','_battlerName','systemColor','Control\x20Variables\x20Script\x20Error','NewGameBoot','makeDeepCopy','Sprite_Gauge_currentValue','MAT','alwaysDash','uUxgz','vSKzk','isEventTest','EazCS','tileWidth','IWfxi','_battleField','_targets','mAZcs','vXTWU','updateDocumentTitle','grtIa','Scene_Item_create','BasicParameterFormula','startNormalGame','playCancel','NumberBgType','SPACE','gameTitle','_statusWindow','ctGaugeColor1','setupButtonImage','_stored_tpGaugeColor1','YbTeZ','ColorCTGauge1','Weapon-%1-%2','setValue','SceneManager_initialize','_troopId','isBusy','ShowScrollBar','eNtzL','mPaJu','%1%2','pixelated','_scene','Game_Actor_levelUp','DEF','buyWindowRect','eva','PERCENT','allTiles','isForFriend','initButtonHidden','Padding','CTB','origin','ShowJS','rgba(0,\x200,\x200,\x200.7)','lOIcs','vLfLK','ListRect','defaultInputMode','ParamArrow','getColorDataFromPluginParameters','ActorRect','buttonAssistKey1','WIN_OEM_FINISH','Sprite_Battler_startMove','drawAllParams','Sprite_Picture_loadBitmap','Game_Action_updateLastTarget','cursorLeft','PRESERVCONVERSION(%1)','resize','PIPE','HTiXj','drawCircle','setBackgroundType','resetFontSettings','XrBpv','ColorDeath','_categoryWindow','Game_Map_scrollDown','iqasZ','ColorExpGauge1','scrollX','SlotRect','TicLF','xparamFlat1','makeFontSmaller','onDatabaseLoaded','buttonAssistCancel','makeTargetSprites','BDbZz','IconXParam8','axes','getControllerInputButtonString','buttonAssistWindowRect','F20','_pollGamepads','sparamPlus','JDJqt','UMNmi','_backgroundSprite','igSDC','dimColor1','getCoreEngineScreenShakeStyle','LNHtg','ExportAllTroopText','OptionsBgType','loadBitmap','RPGMAKER_VERSION','SETTINGS','offsetY','KANA','PkYCj','MRF','ShowButtons','_spriteset','repositionCancelButtonSideButtonLayout','QUOTE','isMenuButtonAssistEnabled','titles1','Game_Interpreter_command111','writeText','tilesets','gaugeHeight','CommandBgType','hCgil','duration','Lojch','ALWAYS','buttonAssistKey5','_drawTextShadow','asin','unfpZ','xparamRate1','ParseEnemyNotetags','_makeFontNameText','7OxIpbo','bOksS','buttonAssistKey4','INOUTBOUNCE','scrollRight','Enemy-%1-%2','applyEasingAnglePlus','Basic','_startDecrypting','checkSubstitute','\x0a\x0a\x0a\x0a\x0a','parseForcedGameTroopSettingsCoreEngine','_editWindow','QTFOl','F10','wNxDK','ctjNu','maxLvGaugeColor1','Scene_Battle_createCancelButton','ProfileRect','maxLevel','Yvyjp','Window_MapName_refresh','AntiZoomPictures','paramBaseAboveLevel99','DECIMAL','CLOSE_CURLY_BRACKET','drawParamText','playOk','resetBattleSystem','Scene_Base_terminate','createCustomParameter','quit','ParamChange','TPB\x20ACTIVE','horzJS','Script\x20Call\x20Error','pageup','GetParamIcon','original','SOigH','clipboard','drawTextEx','Game_Actor_paramBase','createTitleButtons','makeFontBigger','qdVSk','Scene_Map_updateScene','qWSPg','ARRAYEVAL','storeMapData','LESS_THAN','isPhysical','profileWindowRect','children','enemy','FKmiD','gnuJt','clamp','_buyWindow','actor','xwakc','lUAbC','AKITY','NUMPAD1','IMMfZ','Bitmap_strokeRect','Rate2','F6key','SnapshotOpacity','WvxCQ','ModernControls','jaglQ','updatePictureCoordinates','catchNormalError','windowRect','_actor','ExtDisplayedParams','dVOSJ','clearForcedGameTroopSettingsCoreEngine','ActorBgType','pagedownShowButton','Scene_Map_createSpriteset_detach','TILDE','current','IconParam5','globalAlpha','hHejg','VisuMZ_2_BattleSystemSTB','zNeTX','isPressed','Y:\x20%1','updatePointAnimations','forceStencil','RgYfI','Sprite_Animation_setViewport','maxScrollX','oPqSY','refresh','WIN_OEM_AUTO','getCombinedScrollingText','Game_Picture_scaleY','uagXs','%1〘End\x20Choice\x20Selection〙%1','DATABASE','clear','WIN_ICO_HELP','atbActive','ExportString','process_VisuMZ_CoreEngine_RegExp','MINUS','powerDownColor','_itemWindow','version','_texture','HBWpG','tlJoq','drawActorExpGauge','fzRwQ','mGGDz','updateOrigin','buttonAreaHeight','SellBgType','vHTmX','Game_Map_setDisplayPos','Window_NumberInput_processDigitChange','keyCode','aJIye','isGamepadTriggered','ACCEPT','processKeyboardEnd','bitmap','yMEIm','KEEP','Scene_Map_update','CustomParamNames','checkCoreEngineDisplayCenter','BoxMargin','nah','setSideView','_context','framebuffer','sceneTerminationClearEffects','lKVnZ','disable','_currentBgs','rwDCf','DrawIcons','replace','eGDzs','BTB','KOsrV','SCALE_MODES','_pointAnimationSprites','ExtractStrFromMap','F7key','targetX','ATTN','_stored_tpGaugeColor2','AmBDB','titles2','createFauxAnimation','enabled','VOLUME_DOWN','Scene_Base_terminateAnimationClearBugFix','Bitmap_gradientFillRect','contentsOpacity','Rmyhh','darwin','IconParam1','canAttack','isBottomHelpMode','_closing','Window_Base_initialize','nLCeI','Game_Character_processMoveCommand','Total','Bitmap_measureTextWidth','qbCww','gradientFillRect','isSceneMap','FFxWD','fySFg','setDisplayPos','popScene','sv_enemies','F13','Rate','NewGameCommonEventAll','setupNewGame','_storedMapText','MCR','BJpnA','process_VisuMZ_CoreEngine_jsQuickFunctions','keyboard','DcYBT','HelpBgType','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','sparamRate','snapForBackground','untab','_bgsBuffer','_sellWindow','drawCurrentParam','_backgroundFilter','_downArrowSprite','Manual','ZOOM','_skillTypeWindow','_active','_pictureCoordinatesMode','State-%1-%2','damageColor','INOUTQUINT','StatusEquipBgType','sv_actors','BTestWeapons','_buttonType','_stored_mpGaugeColor2','playCursor','retreat','data/','OUTQUAD','〘Common\x20Event\x20%1:\x20%2〙\x20Start','ALTGR','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','activate','_hideButtons','Scene_Title','jnZVx','stmXK','Flat2','ClIHi','Match','length','setCoreEngineUpdateWindowBg','EncounterRateMinimum','setCoreEngineScreenShakeStyle','_number','ColorMaxLvGauge2','ColorTPGauge1','toString','volume','QaeRh','ConvertParams','paramY','PictureEraseRange','aCfeo','WIN_OEM_FJ_JISHO','XParamVocab3','jqPAx','XParamVocab8','WNUaV','ARRAYNUM','_centerCameraCheck','onButtonImageLoad','ColorCTGauge2','mainFontSize','ZLVgQ','ONE','LATIN1','findSymbol','checkPassage','JVITl','currentValue','tpColor','calcCoreEasing','Spriteset_Base_updatePosition','NewGameCommonEvent','Scene_MenuBase_createBackground','targetPosition','connected','guLjE','Version','calcEasing','CrisisRate','scaleY','_loadingState','sparamPlus1','XldyR','integer','tJTiQ','etypeId','toLowerCase','QKxcf','checkCacheKey','Input_updateGamepadState','flush','isEnabled','pwRof','loadPicture','XParameterFormula','itemLineRect','playTestF7','encounterStep','_phase','currencyUnit','getParameter','ShowDevTools','_list','srTYw','MIN_SAFE_INTEGER','playBuzzer','GET','stop','updateOpen','([\x5c+\x5c-]\x5cd+)([%％])>','EREOF','CNT','EVweN','setMainFontSize','buttonAssistOffset2','Window_NameInput_refresh','easingType','list','SwitchActorText','Scene_Boot_loadSystemImages','createFauxAnimationSprite','updateSmoothScroll','createPointAnimationSprite','BlurFilter','Scene_MenuBase_createCancelButton','ASTERISK','key%1','add','shake','EYMBb','SmartEventCollisionPriority','gCdPC','DocumentTitleFmt','CallHandlerJS','IconParam6','isGamepadAxisMoved','markCoreEngineModified','createTroopNote','Opacity','destroyContents','setTargetAnchor','startAnimation','select','openingSpeed','FadeSpeed','_displayX','_isButtonHidden','_lastScrollBarValues','angle','startShake','process_VisuMZ_CoreEngine_Notetags','sparamRate1','Smooth','updateMove','makeAutoBattleActions','Sprite_Picture_updateOrigin','ShiftT_Toggle','pXPQo','drawBackground','HjcOd','Pixelated','CLOSE_BRACKET','ItemMenu','Game_Picture_move','updateWaitMode','updateScrollBars','drawActorSimpleStatus','jMwYc','Scene_Base_createWindowLayer','Window_NameInput_processHandling','CONTEXT_MENU','OUTEXPO','isCancelled','_colorCache','dUuYk','qPMgQ','concat','Scene_MenuBase_mainAreaTop','expRate','_margin','isMaskingEnabled','guardSkillId','enableDigitGrouping','PRINTSCREEN','AgSwq','_origin','_shakeSpeed','eventsXyNt','AudioChangeBgmPitch','EVAL','YpmTT','_backSprite2','ETB','xparamPlus','colSpacing','PictureCoordinatesMode','Game_Party_consumeItem','buttonAssistWindowSideRect','updateOpacity','Window_Selectable_processCursorMove','JqlVH','isMaxLevel','reduce','isNumpadPressed','drawCharacter','initCoreEngineScreenShake','MULTIPLY','ShopMenu','REC','updateScrollBarPosition','smallParamFontSize','Spriteset_Base_destroy','FFzKG','KeyUnlisted','BgFilename1','CEV','render','textBaseline','drawValue','EndingID','_stored_ctGaugeColor2','SystemSetSideView','INSINE','Scene_Equip_create','_startPlaying','SEPARATOR','pointX','clearOnceParallelInterpreters','ARRAYJSON','XCPrn','Conditional\x20Branch\x20Script\x20Error','isGamepadButtonPressed','call','isLoopVertical','Window_Gold_refresh','MapOnceParallel','cursorRight','MDF','createDigits','nhZyN','checkSmartEventCollision','exportAllTroopStrings','jskyM','JwfVL','isClosing','sparamFlat1','WIN_ICO_00','random','_mp','PkQZy','updateMain','isPlaying','mev','save','QrTCz','AutoStretch','RfDOk','initVisuMZCoreEngine','Game_Event_start','processFauxAnimationRequests','XParamVocab6','HeFcr','boxHeight','commandWindowRect','updateCoreEasing','isOptionValid','fVtRA','LineHeight','dummyWindowRect','BTestAddedQuantity','Sprite_Animation_processSoundTimings','processDigitChange','OfJCa','_startLoading','REPLACE','image-rendering','GoldMax','rFIHB','ZERO','VariableJsBlock','yiihq','DetachMapPictureContainer','([\x5c+\x5c-]\x5cd+)>','useDigitGroupingEx','removeFauxAnimation','fillStyle','deactivate','iLbGi','IconParam3','NJgFH','LevelUpFullMp','_timerSprite','onActorChange','Page','drawIconBySize','TPB\x20WAIT','expGaugeColor2','get','active','xparamRate','height','IconSParam2','faceHeight','Game_Picture_updateRotation','_stored_pendingColor','requestFauxAnimation','params','performMiss','AYbqB','yScrollLinkedOffset','_forcedBattleGridSystem','KergZ','TextPopupShow','animationNextDelay','_stored_normalColor','CANCEL','134849IUkmUA','Key%1','ARRAYFUNC','_hideTileShadows','OutlineColor','zoomScale','Graphics','wjjhB','destroy','listWindowRect','Window_Selectable_itemRect','CustomParamAbb','ZKnvL','_subject','Actor-%1-%2','Window_NameInput_cursorRight','gaugeLineHeight','INOUTEXPO','prototype','EQUALS','_effectsContainer','removeAnimation','SystemLoadImages','Window_TitleCommand_selectLast','Sprite_AnimationMV_updatePosition','nzQsr','DimColor2','movePageButtonSideButtonLayout','_scrollBarVert','fXPtA','endAnimation','createButtonAssistWindow','_stored_mpGaugeColor1','IconParam4','_lastY','Scene_Boot_startNormalGame','Kfcxb','Sprite_AnimationMV_processTimingData','none','MEV','_isWindow','RepositionEnemies130','paintOpacity','centerSprite','addLoadListener','note','_commandList','thickness','test','zuoNc','itemRect','Window_NameInput_cursorLeft','ColorPowerUp','xparamRateJS','expGaugeColor1','WKvCy','windowPadding','scaleX','createTextState','Window_Base_drawCharacter','contents','CustomParamIcons','Map%1','originalJS','oPbSe','_displayY','HNncj','_encounterCount','EXECUTE','OTB','IconParam0','_repositioned','vKxOo','buttonAssistKey3','contentsBack','ButtonFadeSpeed','setupValueFont','KwepQ','picture','isMapScrollLinked','$dataMap','ARRAYSTR','QGSKh','toFixed','FontSize','OffBarColor','WIN_OEM_FJ_TOUROKU','itemSuccessRate','ValueJS','UikUL','nYBJc','match','fadeSpeed','onlyfilename','4627557JLISZr','subject','MinDuration','_playTestFastMode','EQUAL','updateAnchor','qavIl','_CoreEngineSettings','cancelShowButton','charCode','createCommandWindow','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','top','Window_Base_createTextState','Symbol','dNFka','parse','CategoryRect','_actorWindow','_stored_gaugeBackColor','EpnrX','Location','isFullDocumentTitle','FBGeI','_dimmerSprite','Plus1','refreshDimmerBitmap','param','smoothSelect','ColorSystem','ApplyEasing','buttonAssistOk','TitleCommandList','Graphics_defaultStretchMode','ALT','map','textHeight','VisuMZ_2_BattleSystemPTB','DisplayLockX','setWindowPadding','command122','initDigitGrouping','kaxla','_shouldPreventDefault','CommandWidth','onMoveEnd'];_0xcfe6=function(){return _0xb1d3e7;};return _0xcfe6();}VisuMZ[_0x25789e(0xf9)][_0x25789e(0x669)]=Window_MapName[_0x25789e(0x866)][_0x25789e(0x6b5)],Window_MapName[_0x25789e(0x866)][_0x25789e(0x6b5)]=function(){const _0x151977=_0x25789e;VisuMZ['CoreEngine'][_0x151977(0x59c)][_0x151977(0x25e)][_0x151977(0x431)]?this[_0x151977(0x2fd)]():VisuMZ[_0x151977(0xf9)][_0x151977(0x669)][_0x151977(0x800)](this);},Window_MapName[_0x25789e(0x866)]['refreshWithTextCodeSupport']=function(){const _0x3f32af=_0x25789e;this[_0x3f32af(0x890)][_0x3f32af(0x6bc)]();if($gameMap[_0x3f32af(0x919)]()){if(_0x3f32af(0x64a)===_0x3f32af(0x327)){_0x34c805[_0x3f32af(0xf9)][_0x3f32af(0x296)][_0x3f32af(0x800)](this);const _0x55b521=this[_0x3f32af(0x63e)]['_timerSprite'];if(_0x55b521)this[_0x3f32af(0x99d)](_0x55b521);}else{const _0x5e3ce7=this[_0x3f32af(0x1b1)];this[_0x3f32af(0x7b6)](0x0,0x0,_0x5e3ce7,this[_0x3f32af(0x99b)]());const _0x30a143=this[_0x3f32af(0x341)]($gameMap[_0x3f32af(0x919)]())[_0x3f32af(0x59d)];this[_0x3f32af(0x67d)]($gameMap[_0x3f32af(0x919)](),Math['floor']((_0x5e3ce7-_0x30a143)/0x2),0x0);}}},Window_TitleCommand[_0x25789e(0x882)]=VisuMZ[_0x25789e(0xf9)]['Settings'][_0x25789e(0x8d2)],Window_TitleCommand['prototype']['makeCommandList']=function(){const _0x390285=_0x25789e;this[_0x390285(0x2b4)]();},Window_TitleCommand[_0x25789e(0x866)][_0x25789e(0x2b4)]=function(){const _0x32affb=_0x25789e;for(const _0x3b6989 of Window_TitleCommand[_0x32affb(0x882)]){if(_0x3b6989[_0x32affb(0x600)]['call'](this)){if(_0x32affb(0x581)===_0x32affb(0x581)){const _0x42e428=_0x3b6989[_0x32affb(0x8c0)];let _0x5b2449=_0x3b6989[_0x32affb(0x534)];if(['',_0x32affb(0x50b)]['includes'](_0x5b2449))_0x5b2449=_0x3b6989[_0x32affb(0x9c5)][_0x32affb(0x800)](this);const _0x23f6f2=_0x3b6989[_0x32affb(0x216)][_0x32affb(0x800)](this),_0x2ed448=_0x3b6989[_0x32affb(0x110)][_0x32affb(0x800)](this);this['addCommand'](_0x5b2449,_0x42e428,_0x23f6f2,_0x2ed448),this[_0x32affb(0x552)](_0x42e428,_0x3b6989[_0x32affb(0x79d)][_0x32affb(0x53d)](this,_0x2ed448));}else this[_0x32affb(0x16e)]=_0x390fd7;}}},VisuMZ['CoreEngine'][_0x25789e(0x86b)]=Window_TitleCommand['prototype'][_0x25789e(0x9a1)],Window_TitleCommand['prototype']['selectLast']=function(){const _0x30c79b=_0x25789e;VisuMZ[_0x30c79b(0xf9)][_0x30c79b(0x86b)][_0x30c79b(0x800)](this);if(!Window_TitleCommand[_0x30c79b(0xbc)])return;const _0x1aa899=this[_0x30c79b(0x758)](Window_TitleCommand[_0x30c79b(0xbc)]),_0x871e04=Math['floor'](this[_0x30c79b(0x53c)]()/0x2)-0x1;this[_0x30c79b(0x8ce)](_0x1aa899),this[_0x30c79b(0x25c)]>0x1&&(this[_0x30c79b(0x25c)]=0x1,this[_0x30c79b(0x791)]()),this[_0x30c79b(0xfd)](_0x1aa899-_0x871e04);},Window_GameEnd['_commandList']=VisuMZ[_0x25789e(0xf9)]['Settings']['MenuLayout'][_0x25789e(0x36a)][_0x25789e(0x309)],Window_GameEnd[_0x25789e(0x866)]['makeCommandList']=function(){const _0x22e089=_0x25789e;this[_0x22e089(0x2b4)]();},Window_GameEnd[_0x25789e(0x866)][_0x25789e(0x2b4)]=function(){const _0x5c496c=_0x25789e;for(const _0x743264 of Window_GameEnd[_0x5c496c(0x882)]){if(_0x743264['ShowJS'][_0x5c496c(0x800)](this)){const _0x33cc12=_0x743264[_0x5c496c(0x8c0)];let _0xa95d61=_0x743264[_0x5c496c(0x534)];if(['',_0x5c496c(0x50b)][_0x5c496c(0x2ec)](_0xa95d61))_0xa95d61=_0x743264['TextJS']['call'](this);const _0x95e09=_0x743264[_0x5c496c(0x216)][_0x5c496c(0x800)](this),_0x93a052=_0x743264['ExtJS'][_0x5c496c(0x800)](this);this[_0x5c496c(0x964)](_0xa95d61,_0x33cc12,_0x95e09,_0x93a052),this[_0x5c496c(0x552)](_0x33cc12,_0x743264[_0x5c496c(0x79d)]['bind'](this,_0x93a052));}}};function Window_ButtonAssist(){this['initialize'](...arguments);}Window_ButtonAssist['prototype']=Object[_0x25789e(0x468)](Window_Base[_0x25789e(0x866)]),Window_ButtonAssist[_0x25789e(0x866)][_0x25789e(0x49f)]=Window_ButtonAssist,Window_ButtonAssist['prototype'][_0x25789e(0x928)]=function(_0xe6f038){const _0x2c1b49=_0x25789e;this[_0x2c1b49(0x460)]={},Window_Base['prototype'][_0x2c1b49(0x928)][_0x2c1b49(0x800)](this,_0xe6f038),this['setBackgroundType'](VisuMZ['CoreEngine'][_0x2c1b49(0x59c)][_0x2c1b49(0x39f)][_0x2c1b49(0x118)]||0x0),this['refresh']();},Window_ButtonAssist[_0x25789e(0x866)][_0x25789e(0x680)]=function(){const _0x3cb497=_0x25789e;this[_0x3cb497(0x890)][_0x3cb497(0x92c)]<=0x60&&('HZydW'==='KVJYI'?this['_muteSound']=_0x8f9485:this[_0x3cb497(0x890)][_0x3cb497(0x92c)]+=0x6);},Window_ButtonAssist['prototype'][_0x25789e(0x621)]=function(){const _0x36d50b=_0x25789e;if(this['contents']['fontSize']>=0x18){if('xQRIq'!==_0x36d50b(0x22e)){if(_0x1915aa[_0x36d50b(0x502)])return;}else this[_0x36d50b(0x890)]['fontSize']-=0x6;}},Window_ButtonAssist[_0x25789e(0x866)][_0x25789e(0x91c)]=function(){const _0x2e9b2e=_0x25789e;Window_Base['prototype'][_0x2e9b2e(0x91c)]['call'](this),this[_0x2e9b2e(0x8ef)]();},Window_ButtonAssist[_0x25789e(0x866)]['updatePadding']=function(){const _0x4845e3=_0x25789e;this['padding']=SceneManager[_0x4845e3(0x5f4)][_0x4845e3(0x2f3)]()!==_0x4845e3(0x260)?0x0:0x8;},Window_ButtonAssist[_0x25789e(0x866)][_0x25789e(0x8ef)]=function(){const _0x294fdd=_0x25789e,_0x33e326=SceneManager['_scene'];for(let _0x549518=0x1;_0x549518<=0x5;_0x549518++){if(this[_0x294fdd(0x460)][_0x294fdd(0x796)[_0x294fdd(0x3a8)](_0x549518)]!==_0x33e326[_0x294fdd(0x30e)[_0x294fdd(0x3a8)](_0x549518)]()){if(_0x294fdd(0x17d)!==_0x294fdd(0xcd))return this[_0x294fdd(0x6b5)]();else{const _0x1d40e1=_0x294fdd(0x148);this[_0x294fdd(0x7c5)]=this['_colorCache']||{};if(this[_0x294fdd(0x7c5)][_0x1d40e1])return this[_0x294fdd(0x7c5)][_0x1d40e1];const _0x50323b=_0x5585e9[_0x294fdd(0xf9)][_0x294fdd(0x59c)][_0x294fdd(0x9db)][_0x294fdd(0x742)];return this[_0x294fdd(0x607)](_0x1d40e1,_0x50323b);}}if(this[_0x294fdd(0x460)][_0x294fdd(0x95a)['format'](_0x549518)]!==_0x33e326['buttonAssistText%1'[_0x294fdd(0x3a8)](_0x549518)]())return this[_0x294fdd(0x6b5)]();}},Window_ButtonAssist[_0x25789e(0x866)]['refresh']=function(){const _0x1a0b83=_0x25789e;this[_0x1a0b83(0x890)]['clear']();for(let _0x575cc1=0x1;_0x575cc1<=0x5;_0x575cc1++){this['drawSegment'](_0x575cc1);}},Window_ButtonAssist[_0x25789e(0x866)]['drawSegment']=function(_0x58d87c){const _0x3f8aef=_0x25789e,_0xa2f3b=this['innerWidth']/0x5,_0x22a2b1=SceneManager['_scene'],_0x54c4cb=_0x22a2b1[_0x3f8aef(0x30e)[_0x3f8aef(0x3a8)](_0x58d87c)](),_0x548ae3=_0x22a2b1[_0x3f8aef(0x42f)[_0x3f8aef(0x3a8)](_0x58d87c)]();this[_0x3f8aef(0x460)][_0x3f8aef(0x796)['format'](_0x58d87c)]=_0x54c4cb,this[_0x3f8aef(0x460)]['text%1'[_0x3f8aef(0x3a8)](_0x58d87c)]=_0x548ae3;if(_0x54c4cb==='')return;if(_0x548ae3==='')return;const _0x2e5064=_0x22a2b1['buttonAssistOffset%1'[_0x3f8aef(0x3a8)](_0x58d87c)](),_0x45f47a=this[_0x3f8aef(0x10e)](),_0x15b6f0=_0xa2f3b*(_0x58d87c-0x1)+_0x45f47a+_0x2e5064,_0x254bbe=VisuMZ[_0x3f8aef(0xf9)]['Settings']['ButtonAssist']['TextFmt'];this[_0x3f8aef(0x67d)](_0x254bbe['format'](_0x54c4cb,_0x548ae3),_0x15b6f0,0x0,_0xa2f3b-_0x45f47a*0x2);},VisuMZ[_0x25789e(0xf9)]['Game_Interpreter_updateWaitMode']=Game_Interpreter['prototype'][_0x25789e(0x7bc)],Game_Interpreter[_0x25789e(0x866)]['updateWaitMode']=function(){const _0x3bd94d=_0x25789e;if($gameTemp[_0x3bd94d(0x725)]!==undefined)return VisuMZ['CoreEngine'][_0x3bd94d(0x123)]();return VisuMZ[_0x3bd94d(0xf9)]['Game_Interpreter_updateWaitMode'][_0x3bd94d(0x800)](this);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x123)]=function(){const _0x1501f5=_0x25789e,_0x5a8845=$gameTemp[_0x1501f5(0x725)]||0x0;(_0x5a8845<0x0||_0x5a8845>0x64||TouchInput[_0x1501f5(0x7c4)]()||Input['isTriggered'](_0x1501f5(0x994)))&&($gameTemp[_0x1501f5(0x725)]=undefined,Input[_0x1501f5(0x6bc)](),TouchInput[_0x1501f5(0x6bc)]());const _0x327447=$gameScreen[_0x1501f5(0x8a2)](_0x5a8845);return _0x327447&&(_0x327447['_x']=TouchInput['_x'],_0x327447['_y']=TouchInput['_y']),VisuMZ[_0x1501f5(0xf9)]['updatePictureCoordinates'](),$gameTemp[_0x1501f5(0x725)]!==undefined;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x69c)]=function(){const _0x2e6050=_0x25789e,_0x2e8b8e=SceneManager['_scene'];if(!_0x2e8b8e)return;if(!_0x2e8b8e['_pictureCoordinatesWindow']){if(_0x2e6050(0x6e2)===_0x2e6050(0x61b)){var _0x1fbeaa=_0x2ac149(_0x1677c8['$1']);_0x3f12c8+=_0x1fbeaa;}else SoundManager[_0x2e6050(0x2a7)](),_0x2e8b8e['_pictureCoordinatesWindow']=new Window_PictureCoordinates(),_0x2e8b8e[_0x2e6050(0x99d)](_0x2e8b8e[_0x2e6050(0x553)]);}$gameTemp['_pictureCoordinatesMode']===undefined&&(SoundManager[_0x2e6050(0x5e0)](),_0x2e8b8e[_0x2e6050(0x2a0)](_0x2e8b8e[_0x2e6050(0x553)]),_0x2e8b8e[_0x2e6050(0x553)]=undefined);};function Window_PictureCoordinates(){const _0x4989d3=_0x25789e;this[_0x4989d3(0x928)](...arguments);}Window_PictureCoordinates[_0x25789e(0x866)]=Object[_0x25789e(0x468)](Window_Base['prototype']),Window_PictureCoordinates['prototype'][_0x25789e(0x49f)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x25789e(0x866)]['initialize']=function(){const _0x3c2c9a=_0x25789e;this[_0x3c2c9a(0x9a2)]='nah',this[_0x3c2c9a(0x446)]='nah',this[_0x3c2c9a(0x876)]=_0x3c2c9a(0x6dd);const _0x4a03e4=this[_0x3c2c9a(0x69e)]();Window_Base[_0x3c2c9a(0x866)][_0x3c2c9a(0x928)]['call'](this,_0x4a03e4),this['setBackgroundType'](0x2);},Window_PictureCoordinates['prototype'][_0x25789e(0x69e)]=function(){const _0x923e11=_0x25789e;let _0x4fe7b6=0x0,_0x3ff385=Graphics['height']-this[_0x923e11(0x99b)](),_0x25bf91=Graphics[_0x923e11(0x59d)],_0xd05a04=this[_0x923e11(0x99b)]();return new Rectangle(_0x4fe7b6,_0x3ff385,_0x25bf91,_0xd05a04);},Window_PictureCoordinates[_0x25789e(0x866)][_0x25789e(0x475)]=function(){const _0x1128de=_0x25789e;this[_0x1128de(0x2ba)]=0x0;},Window_PictureCoordinates[_0x25789e(0x866)]['update']=function(){const _0x3da672=_0x25789e;Window_Base[_0x3da672(0x866)][_0x3da672(0x91c)][_0x3da672(0x800)](this),this[_0x3da672(0x433)]();},Window_PictureCoordinates[_0x25789e(0x866)][_0x25789e(0x433)]=function(){const _0x51ff82=_0x25789e;if(!this[_0x51ff82(0x32c)]())return;this[_0x51ff82(0x6b5)]();},Window_PictureCoordinates[_0x25789e(0x866)][_0x25789e(0x32c)]=function(){const _0xca91f7=_0x25789e,_0x2bcc88=$gameTemp[_0xca91f7(0x725)],_0x2ab373=$gameScreen['picture'](_0x2bcc88);return _0x2ab373?this[_0xca91f7(0x9a2)]!==_0x2ab373[_0xca91f7(0x7d1)]||this[_0xca91f7(0x446)]!==_0x2ab373['_x']||this[_0xca91f7(0x876)]!==_0x2ab373['_y']:![];},Window_PictureCoordinates[_0x25789e(0x866)][_0x25789e(0x6b5)]=function(){const _0x5b45f=_0x25789e;this['contents'][_0x5b45f(0x6bc)]();const _0xb90e7f=$gameTemp['_pictureCoordinatesMode'],_0x370054=$gameScreen[_0x5b45f(0x8a2)](_0xb90e7f);if(!_0x370054)return;this[_0x5b45f(0x9a2)]=_0x370054[_0x5b45f(0x7d1)],this[_0x5b45f(0x446)]=_0x370054['_x'],this['_lastY']=_0x370054['_y'];const _0x3230c9=ColorManager['itemBackColor1']();this[_0x5b45f(0x890)][_0x5b45f(0x937)](0x0,0x0,this[_0x5b45f(0x1b1)],this[_0x5b45f(0x90f)],_0x3230c9);const _0x2c6c94=_0x5b45f(0x310)[_0x5b45f(0x3a8)](_0x370054[_0x5b45f(0x7d1)]===0x0?_0x5b45f(0x347):'Center'),_0x1a5936=_0x5b45f(0x2e3)['format'](_0x370054['_x']),_0x4dda06=_0x5b45f(0x6ae)[_0x5b45f(0x3a8)](_0x370054['_y']),_0x117b21=_0x5b45f(0x942)[_0x5b45f(0x3a8)](TextManager['getInputButtonString'](_0x5b45f(0x994)));let _0x3bef49=Math['floor'](this[_0x5b45f(0x1b1)]/0x4);this['drawText'](_0x2c6c94,_0x3bef49*0x0,0x0,_0x3bef49),this['drawText'](_0x1a5936,_0x3bef49*0x1,0x0,_0x3bef49,_0x5b45f(0x8fd)),this['drawText'](_0x4dda06,_0x3bef49*0x2,0x0,_0x3bef49,_0x5b45f(0x8fd));const _0x39cdd7=this[_0x5b45f(0x341)](_0x117b21)['width'],_0x267c9a=this[_0x5b45f(0x1b1)]-_0x39cdd7;this[_0x5b45f(0x67d)](_0x117b21,_0x267c9a,0x0,_0x39cdd7);};function Window_TextPopup(){const _0x17ede5=_0x25789e;this[_0x17ede5(0x928)](...arguments);}Window_TextPopup['prototype']=Object[_0x25789e(0x468)](Window_Base['prototype']),Window_TextPopup[_0x25789e(0x866)][_0x25789e(0x49f)]=Window_TextPopup,Window_TextPopup[_0x25789e(0x638)]={'framesPerChar':VisuMZ[_0x25789e(0xf9)]['Settings'][_0x25789e(0x36b)][_0x25789e(0x507)]??1.5,'framesMin':VisuMZ[_0x25789e(0xf9)][_0x25789e(0x59c)]['Window'][_0x25789e(0x8b4)]??0x5a,'framesMax':VisuMZ['CoreEngine'][_0x25789e(0x59c)]['Window'][_0x25789e(0x439)]??0x12c},Window_TextPopup[_0x25789e(0x866)]['initialize']=function(){const _0x5e03fa=_0x25789e,_0x1cfa86=new Rectangle(0x0,0x0,0x1,0x1);Window_Base[_0x5e03fa(0x866)][_0x5e03fa(0x928)]['call'](this,_0x1cfa86),this[_0x5e03fa(0x565)]=0x0,this[_0x5e03fa(0x405)]='',this[_0x5e03fa(0x389)]=[],this[_0x5e03fa(0x228)]=0x0;},Window_TextPopup[_0x25789e(0x866)][_0x25789e(0x3d6)]=function(){return!![];},Window_TextPopup[_0x25789e(0x866)]['addQueue']=function(_0x451db6){const _0xd095d7=_0x25789e;if(this[_0xd095d7(0x389)][this['_textQueue'][_0xd095d7(0x73d)]-0x1]===_0x451db6)return;this['_textQueue'][_0xd095d7(0x5b2)](_0x451db6),SceneManager[_0xd095d7(0x5f4)]['addChild'](this);},Window_TextPopup[_0x25789e(0x866)]['update']=function(){const _0xe80737=_0x25789e;Window_Base['prototype'][_0xe80737(0x91c)][_0xe80737(0x800)](this),this['updateText'](),this[_0xe80737(0x1aa)]();},Window_TextPopup[_0x25789e(0x866)][_0x25789e(0x34a)]=function(){const _0x48a871=_0x25789e;if(this['_text']!=='')return;if(this[_0x48a871(0x389)][_0x48a871(0x73d)]<=0x0)return;if(!this['isClosed']())return;this['_text']=this[_0x48a871(0x389)][_0x48a871(0x456)]();const _0x2bfcb0=Window_TextPopup[_0x48a871(0x638)],_0x5486d6=Math[_0x48a871(0x169)](this[_0x48a871(0x405)][_0x48a871(0x73d)]*_0x2bfcb0['framesPerChar']);this[_0x48a871(0x228)]=_0x5486d6['clamp'](_0x2bfcb0[_0x48a871(0x52d)],_0x2bfcb0[_0x48a871(0x523)]);const _0x33c6dc=this[_0x48a871(0x341)](this[_0x48a871(0x405)]);let _0x4f7e90=_0x33c6dc[_0x48a871(0x59d)]+this['itemPadding']()*0x2;_0x4f7e90+=$gameSystem[_0x48a871(0x88c)]()*0x2;let _0x40e105=Math[_0x48a871(0x311)](_0x33c6dc[_0x48a871(0x844)],this[_0x48a871(0x99b)]());_0x40e105+=$gameSystem[_0x48a871(0x88c)]()*0x2;const _0x14f8fe=Math['round']((Graphics[_0x48a871(0x59d)]-_0x4f7e90)/0x2),_0x58277a=Math[_0x48a871(0x997)]((Graphics[_0x48a871(0x844)]-_0x40e105)/0x2),_0x54ec06=new Rectangle(_0x14f8fe,_0x58277a,_0x4f7e90,_0x40e105);this[_0x48a871(0x4a1)](_0x54ec06['x'],_0x54ec06['y'],_0x54ec06[_0x48a871(0x59d)],_0x54ec06[_0x48a871(0x844)]),this[_0x48a871(0x3fc)](),this[_0x48a871(0x6b5)](),this[_0x48a871(0x388)](),SceneManager[_0x48a871(0x5f4)][_0x48a871(0x99d)](this);},Window_TextPopup[_0x25789e(0x866)][_0x25789e(0x6b5)]=function(){const _0x4d25bd=_0x25789e,_0xe77c8a=this[_0x4d25bd(0x108)]();this['contents'][_0x4d25bd(0x6bc)](),this[_0x4d25bd(0x67d)](this[_0x4d25bd(0x405)],_0xe77c8a['x'],_0xe77c8a['y'],_0xe77c8a[_0x4d25bd(0x59d)]);},Window_TextPopup['prototype'][_0x25789e(0x1aa)]=function(){const _0xdff4ce=_0x25789e;if(this[_0xdff4ce(0x4c1)]()||this[_0xdff4ce(0x80c)]())return;if(this[_0xdff4ce(0x228)]<=0x0)return;this[_0xdff4ce(0x228)]--,this[_0xdff4ce(0x228)]<=0x0&&('LjnuE'!=='VFISY'?(this[_0xdff4ce(0x4b5)](),this[_0xdff4ce(0x405)]=''):this['moveCancelButtonSideButtonLayout']());},VisuMZ[_0x25789e(0x77d)]=function(_0x377bad){const _0x23aaa9=_0x25789e;if(Utils[_0x23aaa9(0x821)](_0x23aaa9(0x884))){var _0x40ce61=require('nw.gui')[_0x23aaa9(0x36b)][_0x23aaa9(0x841)]();SceneManager['showDevTools']();if(_0x377bad)setTimeout(_0x40ce61[_0x23aaa9(0x5a5)][_0x23aaa9(0x53d)](_0x40ce61),0x190);}},VisuMZ[_0x25789e(0x8d0)]=function(_0x8e7206,_0x2c0ae4){const _0x17b9f2=_0x25789e;_0x2c0ae4=_0x2c0ae4[_0x17b9f2(0x595)]();var _0x492684=1.70158,_0x5d27b4=0.7;switch(_0x2c0ae4){case _0x17b9f2(0x560):return _0x8e7206;case _0x17b9f2(0x7f6):return-0x1*Math[_0x17b9f2(0x150)](_0x8e7206*(Math['PI']/0x2))+0x1;case'OUTSINE':return Math[_0x17b9f2(0xc2)](_0x8e7206*(Math['PI']/0x2));case _0x17b9f2(0x4aa):return-0.5*(Math['cos'](Math['PI']*_0x8e7206)-0x1);case _0x17b9f2(0x92a):return _0x8e7206*_0x8e7206;case _0x17b9f2(0x731):return _0x8e7206*(0x2-_0x8e7206);case _0x17b9f2(0xd4):return _0x8e7206<0.5?0x2*_0x8e7206*_0x8e7206:-0x1+(0x4-0x2*_0x8e7206)*_0x8e7206;case _0x17b9f2(0x24d):return _0x8e7206*_0x8e7206*_0x8e7206;case _0x17b9f2(0x991):var _0x210e95=_0x8e7206-0x1;return _0x210e95*_0x210e95*_0x210e95+0x1;case _0x17b9f2(0x999):return _0x8e7206<0.5?0x4*_0x8e7206*_0x8e7206*_0x8e7206:(_0x8e7206-0x1)*(0x2*_0x8e7206-0x2)*(0x2*_0x8e7206-0x2)+0x1;case'INQUART':return _0x8e7206*_0x8e7206*_0x8e7206*_0x8e7206;case _0x17b9f2(0xa0):var _0x210e95=_0x8e7206-0x1;return 0x1-_0x210e95*_0x210e95*_0x210e95*_0x210e95;case _0x17b9f2(0x116):var _0x210e95=_0x8e7206-0x1;return _0x8e7206<0.5?0x8*_0x8e7206*_0x8e7206*_0x8e7206*_0x8e7206:0x1-0x8*_0x210e95*_0x210e95*_0x210e95*_0x210e95;case _0x17b9f2(0x224):return _0x8e7206*_0x8e7206*_0x8e7206*_0x8e7206*_0x8e7206;case _0x17b9f2(0x3cc):var _0x210e95=_0x8e7206-0x1;return 0x1+_0x210e95*_0x210e95*_0x210e95*_0x210e95*_0x210e95;case _0x17b9f2(0x728):var _0x210e95=_0x8e7206-0x1;return _0x8e7206<0.5?0x10*_0x8e7206*_0x8e7206*_0x8e7206*_0x8e7206*_0x8e7206:0x1+0x10*_0x210e95*_0x210e95*_0x210e95*_0x210e95*_0x210e95;case _0x17b9f2(0x122):if(_0x8e7206===0x0)return 0x0;return Math[_0x17b9f2(0xaf)](0x2,0xa*(_0x8e7206-0x1));case _0x17b9f2(0x7c3):if(_0x8e7206===0x1)return _0x17b9f2(0x80a)==='jskyM'?0x1:_0x136dc9['getInputButtonString'](_0x17b9f2(0x456));return-Math['pow'](0x2,-0xa*_0x8e7206)+0x1;case _0x17b9f2(0x865):if(_0x8e7206===0x0||_0x8e7206===0x1)return _0x8e7206;var _0x551946=_0x8e7206*0x2,_0x2f053d=_0x551946-0x1;if(_0x551946<0x1)return 0.5*Math[_0x17b9f2(0xaf)](0x2,0xa*_0x2f053d);return 0.5*(-Math[_0x17b9f2(0xaf)](0x2,-0xa*_0x2f053d)+0x2);case _0x17b9f2(0x57b):var _0x551946=_0x8e7206/0x1;return-0x1*(Math[_0x17b9f2(0x402)](0x1-_0x551946*_0x8e7206)-0x1);case _0x17b9f2(0x511):var _0x210e95=_0x8e7206-0x1;return Math[_0x17b9f2(0x402)](0x1-_0x210e95*_0x210e95);case _0x17b9f2(0x292):var _0x551946=_0x8e7206*0x2,_0x2f053d=_0x551946-0x2;if(_0x551946<0x1)return'bQJKm'===_0x17b9f2(0x5c2)?-0.5*(Math[_0x17b9f2(0x402)](0x1-_0x551946*_0x551946)-0x1):this[_0x17b9f2(0x5f4)]&&this[_0x17b9f2(0x5f4)][_0x17b9f2(0x49f)]===_0x54d340;return 0.5*(Math[_0x17b9f2(0x402)](0x1-_0x2f053d*_0x2f053d)+0x1);case _0x17b9f2(0x111):return _0x8e7206*_0x8e7206*((_0x492684+0x1)*_0x8e7206-_0x492684);case _0x17b9f2(0x231):var _0x551946=_0x8e7206/0x1-0x1;return _0x551946*_0x551946*((_0x492684+0x1)*_0x551946+_0x492684)+0x1;break;case _0x17b9f2(0x395):var _0x551946=_0x8e7206*0x2,_0x12e6ca=_0x551946-0x2,_0x3803e8=_0x492684*1.525;if(_0x551946<0x1)return 0.5*_0x551946*_0x551946*((_0x3803e8+0x1)*_0x551946-_0x3803e8);return 0.5*(_0x12e6ca*_0x12e6ca*((_0x3803e8+0x1)*_0x12e6ca+_0x3803e8)+0x2);case _0x17b9f2(0x933):if(_0x8e7206===0x0||_0x8e7206===0x1){if(_0x17b9f2(0x5e8)!==_0x17b9f2(0x613))return _0x8e7206;else this[_0x17b9f2(0x114)]();}var _0x551946=_0x8e7206/0x1,_0x2f053d=_0x551946-0x1,_0x3d769b=0x1-_0x5d27b4,_0x3803e8=_0x3d769b/(0x2*Math['PI'])*Math[_0x17b9f2(0x64e)](0x1);return-(Math[_0x17b9f2(0xaf)](0x2,0xa*_0x2f053d)*Math[_0x17b9f2(0xc2)]((_0x2f053d-_0x3803e8)*(0x2*Math['PI'])/_0x3d769b));case _0x17b9f2(0x41a):var _0x3d769b=0x1-_0x5d27b4,_0x551946=_0x8e7206*0x2;if(_0x8e7206===0x0||_0x8e7206===0x1)return _0x8e7206;var _0x3803e8=_0x3d769b/(0x2*Math['PI'])*Math[_0x17b9f2(0x64e)](0x1);return Math[_0x17b9f2(0xaf)](0x2,-0xa*_0x551946)*Math[_0x17b9f2(0xc2)]((_0x551946-_0x3803e8)*(0x2*Math['PI'])/_0x3d769b)+0x1;case'INOUTELASTIC':var _0x3d769b=0x1-_0x5d27b4;if(_0x8e7206===0x0||_0x8e7206===0x1)return _0x17b9f2(0x692)!=='OcFnu'?_0x8e7206:_0x1e259a[_0x17b9f2(0x1ff)]()?this[_0x17b9f2(0x576)]():_0x11a8ee['CoreEngine'][_0x17b9f2(0x7c9)][_0x17b9f2(0x800)](this);var _0x551946=_0x8e7206*0x2,_0x2f053d=_0x551946-0x1,_0x3803e8=_0x3d769b/(0x2*Math['PI'])*Math[_0x17b9f2(0x64e)](0x1);if(_0x551946<0x1)return-0.5*(Math[_0x17b9f2(0xaf)](0x2,0xa*_0x2f053d)*Math[_0x17b9f2(0xc2)]((_0x2f053d-_0x3803e8)*(0x2*Math['PI'])/_0x3d769b));return Math[_0x17b9f2(0xaf)](0x2,-0xa*_0x2f053d)*Math[_0x17b9f2(0xc2)]((_0x2f053d-_0x3803e8)*(0x2*Math['PI'])/_0x3d769b)*0.5+0x1;case'OUTBOUNCE':var _0x551946=_0x8e7206/0x1;if(_0x551946<0x1/2.75){if(_0x17b9f2(0x69b)===_0x17b9f2(0x69b))return 7.5625*_0x551946*_0x551946;else _0xd288dc[_0x17b9f2(0xf9)]['Window_Base_update'][_0x17b9f2(0x800)](this),this['updateCoreEasing']();}else{if(_0x551946<0x2/2.75){if(_0x17b9f2(0x701)!==_0x17b9f2(0x701))this[_0x17b9f2(0x8ca)]=new _0x2fdabb(),this[_0x17b9f2(0x8ca)][_0x17b9f2(0x6d6)]=new _0x424e11(0x0,0x0),this[_0x17b9f2(0x8ca)]['x']=0x0,this[_0x17b9f2(0x3af)](this[_0x17b9f2(0x8ca)]);else{var _0x12e6ca=_0x551946-1.5/2.75;return 7.5625*_0x12e6ca*_0x12e6ca+0.75;}}else{if(_0x551946<2.5/2.75){var _0x12e6ca=_0x551946-2.25/2.75;return 7.5625*_0x12e6ca*_0x12e6ca+0.9375;}else{var _0x12e6ca=_0x551946-2.625/2.75;return 7.5625*_0x12e6ca*_0x12e6ca+0.984375;}}}case _0x17b9f2(0x93f):var _0x1902e1=0x1-VisuMZ['ApplyEasing'](0x1-_0x8e7206,_0x17b9f2(0xca));return _0x1902e1;case _0x17b9f2(0x656):if(_0x8e7206<0.5){if(_0x17b9f2(0x8a1)!==_0x17b9f2(0x8a1))this[_0x17b9f2(0xde)]=!![];else var _0x1902e1=VisuMZ[_0x17b9f2(0x8d0)](_0x8e7206*0x2,'inbounce')*0.5;}else var _0x1902e1=VisuMZ[_0x17b9f2(0x8d0)](_0x8e7206*0x2-0x1,_0x17b9f2(0xca))*0.5+0.5;return _0x1902e1;default:return _0x8e7206;}},VisuMZ[_0x25789e(0x679)]=function(_0x5823a0){const _0x366b3d=_0x25789e;_0x5823a0=String(_0x5823a0)['toUpperCase']();const _0x586008=VisuMZ['CoreEngine'][_0x366b3d(0x59c)][_0x366b3d(0x5c0)];if(_0x5823a0===_0x366b3d(0x4a3))return _0x586008[_0x366b3d(0x89a)];if(_0x5823a0===_0x366b3d(0x2de))return _0x586008[_0x366b3d(0x6fc)];if(_0x5823a0==='ATK')return _0x586008[_0x366b3d(0x94a)];if(_0x5823a0===_0x366b3d(0x5f6))return _0x586008[_0x366b3d(0x838)];if(_0x5823a0==='MAT')return _0x586008[_0x366b3d(0x875)];if(_0x5823a0===_0x366b3d(0x805))return _0x586008[_0x366b3d(0x6a8)];if(_0x5823a0===_0x366b3d(0x1a1))return _0x586008[_0x366b3d(0x79e)];if(_0x5823a0===_0x366b3d(0x4c0))return _0x586008['IconParam7'];if(_0x5823a0===_0x366b3d(0x909))return _0x586008[_0x366b3d(0x977)];if(_0x5823a0==='EVA')return _0x586008[_0x366b3d(0x16f)];if(_0x5823a0===_0x366b3d(0x4db))return _0x586008[_0x366b3d(0x98a)];if(_0x5823a0===_0x366b3d(0x7ef))return _0x586008[_0x366b3d(0x168)];if(_0x5823a0==='MEV')return _0x586008[_0x366b3d(0x412)];if(_0x5823a0==='MRF')return _0x586008['IconXParam5'];if(_0x5823a0===_0x366b3d(0x787))return _0x586008['IconXParam6'];if(_0x5823a0===_0x366b3d(0x2d5))return _0x586008[_0x366b3d(0x343)];if(_0x5823a0===_0x366b3d(0x3ca))return _0x586008[_0x366b3d(0x626)];if(_0x5823a0===_0x366b3d(0xc9))return _0x586008['IconXParam9'];if(_0x5823a0===_0x366b3d(0x9bd))return _0x586008[_0x366b3d(0x2a2)];if(_0x5823a0===_0x366b3d(0x320))return _0x586008[_0x366b3d(0x496)];if(_0x5823a0===_0x366b3d(0x7e8))return _0x586008[_0x366b3d(0x845)];if(_0x5823a0===_0x366b3d(0x2b8))return _0x586008['IconSParam3'];if(_0x5823a0==='MCR')return _0x586008[_0x366b3d(0x9e0)];if(_0x5823a0==='TCR')return _0x586008[_0x366b3d(0x1ef)];if(_0x5823a0===_0x366b3d(0x9af))return _0x586008['IconSParam6'];if(_0x5823a0===_0x366b3d(0x4b8))return _0x586008[_0x366b3d(0x3d9)];if(_0x5823a0===_0x366b3d(0x4d0))return _0x586008['IconSParam8'];if(_0x5823a0===_0x366b3d(0x280))return _0x586008['IconSParam9'];if(VisuMZ[_0x366b3d(0xf9)][_0x366b3d(0x891)][_0x5823a0]){if(_0x366b3d(0x67b)!=='SvwLb')return VisuMZ['CoreEngine'][_0x366b3d(0x891)][_0x5823a0]||0x0;else this[_0x366b3d(0x26e)]={},_0x3f3fad['CoreEngine'][_0x366b3d(0x348)][_0x366b3d(0x800)](this);}return 0x0;},VisuMZ[_0x25789e(0x4ff)]=function(_0x5639d1,_0x2dde8d,_0x3ea762){const _0x4cc6ee=_0x25789e;if(_0x3ea762===undefined&&_0x5639d1%0x1===0x0)return _0x5639d1;if(_0x3ea762!==undefined&&[_0x4cc6ee(0x4a3),'MAXMP','ATK',_0x4cc6ee(0x5f6),_0x4cc6ee(0x5cf),_0x4cc6ee(0x805),'AGI',_0x4cc6ee(0x4c0)]['includes'](String(_0x3ea762)[_0x4cc6ee(0x595)]()[_0x4cc6ee(0x91f)]()))return _0x5639d1;_0x2dde8d=_0x2dde8d||0x0;if(VisuMZ[_0x4cc6ee(0xf9)]['CustomParamAbb'][_0x3ea762]){if(VisuMZ[_0x4cc6ee(0xf9)][_0x4cc6ee(0xe6)][_0x3ea762]===_0x4cc6ee(0x76b)){if(_0x4cc6ee(0x57e)===_0x4cc6ee(0x57e))return _0x5639d1;else{if(!this[_0x4cc6ee(0x33b)])return _0x1785d7;const _0x37d331=this[_0x4cc6ee(0x33b)][_0x4cc6ee(0x649)],_0x454b00=this[_0x4cc6ee(0x33b)][_0x4cc6ee(0x2cd)],_0x473351=this['calcCoreEasing']((_0x454b00-_0x37d331)/_0x454b00),_0x5492af=this[_0x4cc6ee(0x75d)]((_0x454b00-_0x37d331+0x1)/_0x454b00),_0x484d2a=(_0x341107-_0x61ee97*_0x473351)/(0x1-_0x473351);return _0x484d2a+(_0x445443-_0x484d2a)*_0x5492af;}}else return String((_0x5639d1*0x64)['toFixed'](_0x2dde8d))+'%';}return String((_0x5639d1*0x64)[_0x4cc6ee(0x8a7)](_0x2dde8d))+'%';},VisuMZ[_0x25789e(0x441)]=function(_0x598acc){const _0x14c06f=_0x25789e;_0x598acc=String(_0x598acc);if(!_0x598acc)return _0x598acc;if(typeof _0x598acc!=='string')return _0x598acc;const _0x5c7a02=VisuMZ['CoreEngine']['Settings'][_0x14c06f(0x25e)][_0x14c06f(0x5b7)]||_0x14c06f(0x12e),_0x457c8f={'maximumFractionDigits':0x6};_0x598acc=_0x598acc[_0x14c06f(0x6e7)](/\[(.*?)\]/g,(_0x56c6d4,_0x11400f)=>{const _0x42509a=_0x14c06f;return VisuMZ[_0x42509a(0x959)](_0x11400f,'[',']');}),_0x598acc=_0x598acc['replace'](/<(.*?)>/g,(_0x3ee11b,_0x346d27)=>{const _0xcae7fb=_0x14c06f;if(_0xcae7fb(0x82d)===_0xcae7fb(0x82d))return VisuMZ['PreserveNumbers'](_0x346d27,'<','>');else{if(this[_0xcae7fb(0x8b9)]===_0x2cefb1)this[_0xcae7fb(0xcf)]();if(this[_0xcae7fb(0x8b9)]['Padding']===_0x327ed0)this[_0xcae7fb(0xcf)]();return this[_0xcae7fb(0x8b9)][_0xcae7fb(0x5fd)];}}),_0x598acc=_0x598acc[_0x14c06f(0x6e7)](/\{\{(.*?)\}\}/g,(_0xe79fda,_0x4ece31)=>{return VisuMZ['PreserveNumbers'](_0x4ece31,'','');}),_0x598acc=_0x598acc['replace'](/(\d+\.?\d*)/g,(_0x1e8e15,_0x423ee0)=>{const _0x4283f5=_0x14c06f;let _0x5e3a36=_0x423ee0;if(_0x5e3a36[0x0]==='0')return _0x5e3a36;if(_0x5e3a36[_0x5e3a36[_0x4283f5(0x73d)]-0x1]==='.'){if('XiMOe'!==_0x4283f5(0x248)){let _0x3e4102=0x0;return _0x1037fb[_0x4283f5(0x1ff)]()?_0x3e4102=this[_0x4283f5(0x49a)]():_0x3e4102=_0x2df478[_0x4283f5(0xf9)][_0x4283f5(0x33a)][_0x4283f5(0x800)](this),_0x3e4102;}else return Number(_0x5e3a36)['toLocaleString'](_0x5c7a02,_0x457c8f)+'.';}else return _0x5e3a36[_0x5e3a36[_0x4283f5(0x73d)]-0x1]===','?_0x4283f5(0x1cc)!==_0x4283f5(0x418)?Number(_0x5e3a36)[_0x4283f5(0x9e5)](_0x5c7a02,_0x457c8f)+',':_0x2e5692[_0x4283f5(0x1a9)][_0x4283f5(0x6f5)]&&_0x93f6e0[_0x4283f5(0x1a9)][_0x4283f5(0x883)]>0x0:Number(_0x5e3a36)[_0x4283f5(0x9e5)](_0x5c7a02,_0x457c8f);});let _0x5b5092=0x3;while(_0x5b5092--){_0x598acc=VisuMZ[_0x14c06f(0x467)](_0x598acc);}return _0x598acc;},VisuMZ['PreserveNumbers']=function(_0x159cc7,_0x27e310,_0x342863){const _0x54250e=_0x25789e;return _0x159cc7=_0x159cc7[_0x54250e(0x6e7)](/(\d)/gi,(_0x4d70da,_0x17544a)=>_0x54250e(0x610)['format'](Number(_0x17544a))),'%2%1%3'[_0x54250e(0x3a8)](_0x159cc7,_0x27e310,_0x342863);},VisuMZ[_0x25789e(0x467)]=function(_0x35fc00){const _0x129ecb=_0x25789e;return _0x35fc00=_0x35fc00[_0x129ecb(0x6e7)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x2d07e3,_0x4042aa)=>Number(parseInt(_0x4042aa))),_0x35fc00;},VisuMZ[_0x25789e(0x1f2)]=function(_0x482fcf){const _0x38a453=_0x25789e;SoundManager[_0x38a453(0x66f)]();if(!Utils['isNwjs']()){if(_0x38a453(0x9a8)!==_0x38a453(0xeb)){const _0x233e08=window[_0x38a453(0x388)](_0x482fcf,'_blank');}else{if(_0x224f0c[_0x38a453(0x43e)]()&&this[_0x38a453(0x4bb)]())this['switchModes'](_0x38a453(0x5bf));else _0x21cbd4['isCancelled']()&&this[_0x38a453(0x8f4)](_0x38a453(0x5bf));}}else{const _0x2f06c1=process[_0x38a453(0x9a0)]==_0x38a453(0x6fb)?_0x38a453(0x388):process[_0x38a453(0x9a0)]=='win32'?_0x38a453(0x4f1):'xdg-open';require(_0x38a453(0x2fc))['exec'](_0x2f06c1+'\x20'+_0x482fcf);}},VisuMZ[_0x25789e(0x358)]=function(_0x1fa62b,_0x549bcd){const _0x49901e=_0x25789e;if(!_0x1fa62b)return'';const _0x12adb7=_0x1fa62b[_0x49901e(0x201)]||_0x1fa62b['id'];let _0x1da522='';if(_0x1fa62b[_0x49901e(0x513)]!==undefined&&_0x1fa62b['nickname']!==undefined){if(_0x49901e(0x2e5)===_0x49901e(0x2e5))_0x1da522=_0x49901e(0x862)[_0x49901e(0x3a8)](_0x12adb7,_0x549bcd);else{let _0x5cb7fc=0x0;return _0x547002[_0x49901e(0x1ff)]()?_0x5cb7fc=this['mainAreaHeightSideButtonLayout']():_0x5cb7fc=_0x4b93c9[_0x49901e(0xf9)][_0x49901e(0x4b4)][_0x49901e(0x800)](this),this[_0x49901e(0x641)]()&&this[_0x49901e(0x2f3)]()!==_0x49901e(0x260)&&(_0x5cb7fc-=_0x96ab97[_0x49901e(0x866)][_0x49901e(0x99b)]()),_0x5cb7fc;}}_0x1fa62b['expParams']!==undefined&&_0x1fa62b[_0x49901e(0xa1)]!==undefined&&(_0x1da522=_0x49901e(0x55a)[_0x49901e(0x3a8)](_0x12adb7,_0x549bcd));_0x1fa62b[_0x49901e(0x491)]!==undefined&&_0x1fa62b[_0x49901e(0xef)]!==undefined&&(_0x1da522='Skill-%1-%2'[_0x49901e(0x3a8)](_0x12adb7,_0x549bcd));_0x1fa62b['itypeId']!==undefined&&_0x1fa62b['consumable']!==undefined&&(_0x49901e(0x3de)===_0x49901e(0x830)?_0x23ecfc+=_0x5cfa73:_0x1da522=_0x49901e(0x174)[_0x49901e(0x3a8)](_0x12adb7,_0x549bcd));_0x1fa62b['wtypeId']!==undefined&&_0x1fa62b['etypeId']===0x1&&(_0x1da522=_0x49901e(0x5ea)[_0x49901e(0x3a8)](_0x12adb7,_0x549bcd));_0x1fa62b['atypeId']!==undefined&&_0x1fa62b[_0x49901e(0x76d)]>0x1&&(_0x1da522=_0x49901e(0x400)[_0x49901e(0x3a8)](_0x12adb7,_0x549bcd));if(_0x1fa62b[_0x49901e(0xd6)]!==undefined&&_0x1fa62b[_0x49901e(0x4ed)]!==undefined){if(_0x49901e(0x3eb)!=='vtAXu'){this[_0x49901e(0x447)]['remove'](_0x107f72),this[_0x49901e(0xb8)](_0x45eff5);for(const _0x4df933 of _0x52ec04[_0x49901e(0x3f2)]){_0x4df933[_0x49901e(0x872)]&&_0x4df933[_0x49901e(0x872)]();}_0x29ad28[_0x49901e(0x85c)]();}else _0x1da522=_0x49901e(0x658)['format'](_0x12adb7,_0x549bcd);}return _0x1fa62b[_0x49901e(0x3df)]!==undefined&&_0x1fa62b[_0x49901e(0x166)]!==undefined&&(_0x1da522=_0x49901e(0x726)['format'](_0x12adb7,_0x549bcd)),_0x1da522;},Game_Picture['prototype'][_0x25789e(0x47a)]=function(){return this['_anchor'];},VisuMZ['CoreEngine'][_0x25789e(0x430)]=Game_Picture['prototype']['initBasic'],Game_Picture[_0x25789e(0x866)]['initBasic']=function(){const _0x1a8f95=_0x25789e;VisuMZ[_0x1a8f95(0xf9)][_0x1a8f95(0x430)][_0x1a8f95(0x800)](this),this[_0x1a8f95(0x9d5)]={'x':0x0,'y':0x0},this[_0x1a8f95(0x950)]={'x':0x0,'y':0x0};},VisuMZ[_0x25789e(0xf9)]['Game_Picture_updateMove']=Game_Picture[_0x25789e(0x866)][_0x25789e(0x7b1)],Game_Picture[_0x25789e(0x866)][_0x25789e(0x7b1)]=function(){const _0x1958d5=_0x25789e;this['updateAnchor']();const _0x30cd62=this['_duration'];VisuMZ[_0x1958d5(0xf9)][_0x1958d5(0x4f3)][_0x1958d5(0x800)](this),_0x30cd62>0x0&&this[_0x1958d5(0x42d)]<=0x0&&(this['_x']=this['_targetX'],this['_y']=this[_0x1958d5(0x4c6)],this['_scaleX']=this['_targetScaleX'],this[_0x1958d5(0x2c9)]=this['_targetScaleY'],this[_0x1958d5(0x378)]=this[_0x1958d5(0x462)],this['_anchor']&&(this[_0x1958d5(0x9d5)]['x']=this[_0x1958d5(0x950)]['x'],this[_0x1958d5(0x9d5)]['y']=this[_0x1958d5(0x950)]['y']));},VisuMZ['CoreEngine']['Game_Picture_show']=Game_Picture[_0x25789e(0x866)][_0x25789e(0x104)],Game_Picture['prototype'][_0x25789e(0x104)]=function(_0x31bb2b,_0x5e81a4,_0x17bb59,_0x5c1085,_0x4b6e3f,_0x386764,_0x907b1e,_0x23a6c0){const _0x1430c0=_0x25789e;VisuMZ[_0x1430c0(0xf9)]['Game_Picture_show'][_0x1430c0(0x800)](this,_0x31bb2b,_0x5e81a4,_0x17bb59,_0x5c1085,_0x4b6e3f,_0x386764,_0x907b1e,_0x23a6c0),this[_0x1430c0(0x9c4)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x5e81a4]||{'x':0x0,'y':0x0});},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x7bb)]=Game_Picture[_0x25789e(0x866)][_0x25789e(0x4a1)],Game_Picture['prototype'][_0x25789e(0x4a1)]=function(_0x10ac05,_0x2cb556,_0x45bf09,_0x59d75a,_0xe00b38,_0x7147e4,_0x13e20f,_0x2e9f3d,_0x4b3396){const _0x73384f=_0x25789e;VisuMZ[_0x73384f(0xf9)][_0x73384f(0x7bb)]['call'](this,_0x10ac05,_0x2cb556,_0x45bf09,_0x59d75a,_0xe00b38,_0x7147e4,_0x13e20f,_0x2e9f3d,_0x4b3396),this[_0x73384f(0x7a4)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x10ac05]||{'x':0x0,'y':0x0});},Game_Picture[_0x25789e(0x866)][_0x25789e(0x8b7)]=function(){const _0x5ed5c6=_0x25789e;this[_0x5ed5c6(0x42d)]>0x0&&(_0x5ed5c6(0x8c6)===_0x5ed5c6(0x4f5)?(_0x4a53bf+='\x0a',_0x3e2235+=_0x4704fb['parameters'][0x0]):(this[_0x5ed5c6(0x9d5)]['x']=this[_0x5ed5c6(0x393)](this[_0x5ed5c6(0x9d5)]['x'],this['_targetAnchor']['x']),this[_0x5ed5c6(0x9d5)]['y']=this[_0x5ed5c6(0x393)](this[_0x5ed5c6(0x9d5)]['y'],this['_targetAnchor']['y'])));},Game_Picture['prototype'][_0x25789e(0x9c4)]=function(_0xcba0e1){const _0xf21610=_0x25789e;this[_0xf21610(0x9d5)]=_0xcba0e1,this[_0xf21610(0x950)]=JsonEx[_0xf21610(0x5cd)](this[_0xf21610(0x9d5)]);},Game_Picture[_0x25789e(0x866)][_0x25789e(0x7a4)]=function(_0x3909bd){const _0x3afe8e=_0x25789e;this[_0x3afe8e(0x950)]=_0x3909bd;},VisuMZ[_0x25789e(0xf9)]['Sprite_Picture_updateOrigin']=Sprite_Picture[_0x25789e(0x866)][_0x25789e(0x6cb)],Sprite_Picture[_0x25789e(0x866)][_0x25789e(0x6cb)]=function(){const _0x381562=_0x25789e,_0x3ecc85=this['picture']();!_0x3ecc85[_0x381562(0x47a)]()?VisuMZ[_0x381562(0xf9)]['Sprite_Picture_updateOrigin']['call'](this):(this[_0x381562(0x47a)]['x']=_0x3ecc85[_0x381562(0x47a)]()['x'],this['anchor']['y']=_0x3ecc85[_0x381562(0x47a)]()['y']);},Game_Action[_0x25789e(0x866)][_0x25789e(0x98b)]=function(_0x34bcb5){const _0xd6393b=_0x25789e;if(_0x34bcb5){const _0x389e71=_0x34bcb5[_0xd6393b(0x13a)];if(_0x389e71===0x1&&this[_0xd6393b(0x8b3)]()[_0xd6393b(0x23d)]()!==0x1)this[_0xd6393b(0x2a5)]();else _0x389e71===0x2&&this[_0xd6393b(0x8b3)]()[_0xd6393b(0x7cd)]()!==0x2?'QOEWm'!==_0xd6393b(0x440)?(!this[_0xd6393b(0x91a)]()&&this[_0xd6393b(0x17f)]()[_0xd6393b(0x93a)]&&(this[_0xd6393b(0x7a9)]=this[_0xd6393b(0x17f)]()[_0xd6393b(0x9ee)]),!this[_0xd6393b(0x801)]()&&this['centerCameraCheckData']()[_0xd6393b(0x94d)]&&(this[_0xd6393b(0x895)]=this[_0xd6393b(0x17f)]()['displayY'])):this['setGuard']():this[_0xd6393b(0x45e)](_0x389e71);}else this['clear']();},Game_Actor['prototype'][_0x25789e(0x58b)]=function(){const _0x4ba034=_0x25789e;return this['skills']()['filter'](_0x27692a=>this['canUse'](_0x27692a)&&this[_0x4ba034(0x41f)]()[_0x4ba034(0x2ec)](_0x27692a[_0x4ba034(0x491)]));},Window_Base[_0x25789e(0x866)][_0x25789e(0x1e0)]=function(){const _0x116299=_0x25789e;this['_dimmerSprite']=new Sprite(),this[_0x116299(0x8ca)][_0x116299(0x6d6)]=new Bitmap(0x0,0x0),this[_0x116299(0x8ca)]['x']=0x0,this['addChildToBack'](this[_0x116299(0x8ca)]);},Window_Base[_0x25789e(0x866)][_0x25789e(0x8cc)]=function(){const _0x4d5876=_0x25789e;if(this[_0x4d5876(0x8ca)]){const _0x5b98c9=this[_0x4d5876(0x8ca)]['bitmap'],_0x3d5fbf=this[_0x4d5876(0x59d)],_0x6370e3=this['height'],_0x28762c=this['padding'],_0x2160ec=ColorManager['dimColor1'](),_0x4cf92e=ColorManager[_0x4d5876(0x92e)]();_0x5b98c9[_0x4d5876(0x611)](_0x3d5fbf,_0x6370e3),_0x5b98c9[_0x4d5876(0x706)](0x0,0x0,_0x3d5fbf,_0x28762c,_0x4cf92e,_0x2160ec,!![]),_0x5b98c9['fillRect'](0x0,_0x28762c,_0x3d5fbf,_0x6370e3-_0x28762c*0x2,_0x2160ec),_0x5b98c9[_0x4d5876(0x706)](0x0,_0x6370e3-_0x28762c,_0x3d5fbf,_0x28762c,_0x2160ec,_0x4cf92e,!![]),this[_0x4d5876(0x8ca)][_0x4d5876(0x1ea)](0x0,0x0,_0x3d5fbf,_0x6370e3);}},Game_Actor[_0x25789e(0x866)][_0x25789e(0x7b2)]=function(){const _0x1c69ec=_0x25789e;for(let _0x2d6dc1=0x0;_0x2d6dc1<this[_0x1c69ec(0x1ad)]();_0x2d6dc1++){const _0x3c2c03=this[_0x1c69ec(0xc3)]();let _0x2f5b1d=Number[_0x1c69ec(0x780)];this[_0x1c69ec(0x3ac)](_0x2d6dc1,_0x3c2c03[0x0]);for(const _0x56736f of _0x3c2c03){const _0x4b1e8c=_0x56736f['evaluate']();if(_0x4b1e8c>_0x2f5b1d){if(_0x1c69ec(0x4c3)===_0x1c69ec(0x4c3))_0x2f5b1d=_0x4b1e8c,this[_0x1c69ec(0x3ac)](_0x2d6dc1,_0x56736f);else{const _0x2e0e09=this['isMVAnimation'](_0x139ce3),_0x429029=new(_0x2e0e09?_0x4c841d:_0x4cc5c)(),_0x4b6188=this[_0x1c69ec(0x624)](_0x9c3ff),_0x16fa79=this[_0x1c69ec(0x53e)](),_0x1d078f=_0x303a45>_0x16fa79?this['lastAnimationSprite']():null;this[_0x1c69ec(0x3f4)](_0x1400f2[0x0])&&(_0x581c0c=!_0x4c37b7),_0x429029[_0x1c69ec(0x3f2)]=_0x47cbf1,_0x429029['setup'](_0x4b6188,_0x534018,_0x7f3ece,_0x561b3f,_0x1d078f),this[_0x1c69ec(0x27a)](_0x429029),this[_0x1c69ec(0x447)][_0x1c69ec(0x5b2)](_0x429029);}}}}this['setActionState'](_0x1c69ec(0x920));},Window_BattleItem[_0x25789e(0x866)]['isEnabled']=function(_0x37cd41){const _0x5a4dba=_0x25789e;return BattleManager[_0x5a4dba(0x68f)]()?BattleManager[_0x5a4dba(0x68f)]()[_0x5a4dba(0x276)](_0x37cd41):Window_ItemList['prototype'][_0x5a4dba(0x773)][_0x5a4dba(0x800)](this,_0x37cd41);},VisuMZ['CoreEngine'][_0x25789e(0x95f)]=Scene_Map[_0x25789e(0x866)][_0x25789e(0x44b)],Scene_Map[_0x25789e(0x866)]['createSpriteset']=function(){const _0x3c68e5=_0x25789e;VisuMZ['CoreEngine'][_0x3c68e5(0x95f)]['call'](this);const _0x4d8cb8=this[_0x3c68e5(0x63e)][_0x3c68e5(0x83b)];if(_0x4d8cb8)this[_0x3c68e5(0x99d)](_0x4d8cb8);},VisuMZ[_0x25789e(0xf9)]['Scene_Battle_createSpritesetFix']=Scene_Battle[_0x25789e(0x866)][_0x25789e(0x44b)],Scene_Battle[_0x25789e(0x866)][_0x25789e(0x44b)]=function(){const _0x2e4200=_0x25789e;VisuMZ[_0x2e4200(0xf9)][_0x2e4200(0x296)]['call'](this);const _0x5154cf=this[_0x2e4200(0x63e)][_0x2e4200(0x83b)];if(_0x5154cf)this['addChild'](_0x5154cf);},Sprite_Actor[_0x25789e(0x866)]['update']=function(){const _0x5878e1=_0x25789e;Sprite_Battler[_0x5878e1(0x866)]['update'][_0x5878e1(0x800)](this),this[_0x5878e1(0x1fb)]();if(this['_actor']){if(_0x5878e1(0x1bd)!==_0x5878e1(0x972))this['updateMotion']();else{if(this[_0x5878e1(0x751)]===_0x2cbd76)this[_0x5878e1(0x6db)]();return this[_0x5878e1(0x751)];}}else this[_0x5878e1(0x5c9)]!==''&&(this[_0x5878e1(0x5c9)]='');},Window[_0x25789e(0x866)][_0x25789e(0x506)]=function(){const _0x373a9f=_0x25789e,_0x198e96=this[_0x373a9f(0x590)],_0x54657b=this[_0x373a9f(0x3d7)],_0x5a2f2d=0x18,_0x512938=_0x5a2f2d/0x2,_0x421c53=0x60+_0x5a2f2d,_0x27f621=0x0+_0x5a2f2d;this[_0x373a9f(0x720)]['bitmap']=this['_windowskin'],this[_0x373a9f(0x720)][_0x373a9f(0x47a)]['x']=0.5,this[_0x373a9f(0x720)]['anchor']['y']=0.5,this[_0x373a9f(0x720)][_0x373a9f(0x1ea)](_0x421c53+_0x512938,_0x27f621+_0x512938+_0x5a2f2d,_0x5a2f2d,_0x512938),this[_0x373a9f(0x720)][_0x373a9f(0x4a1)](Math[_0x373a9f(0x997)](_0x198e96/0x2),Math[_0x373a9f(0x997)](_0x54657b-_0x512938)),this['_upArrowSprite'][_0x373a9f(0x6d6)]=this[_0x373a9f(0x9ef)],this[_0x373a9f(0x932)][_0x373a9f(0x47a)]['x']=0.5,this[_0x373a9f(0x932)][_0x373a9f(0x47a)]['y']=0.5,this[_0x373a9f(0x932)][_0x373a9f(0x1ea)](_0x421c53+_0x512938,_0x27f621,_0x5a2f2d,_0x512938),this[_0x373a9f(0x932)][_0x373a9f(0x4a1)](Math[_0x373a9f(0x997)](_0x198e96/0x2),Math[_0x373a9f(0x997)](_0x512938));},Window[_0x25789e(0x866)][_0x25789e(0x2fe)]=function(){const _0x25fde8=_0x25789e,_0x223e80=0x90,_0x8a9e44=0x60,_0x2b67f3=0x18;this[_0x25fde8(0x980)]['bitmap']=this[_0x25fde8(0x9ef)],this['_pauseSignSprite'][_0x25fde8(0x47a)]['x']=0.5,this['_pauseSignSprite']['anchor']['y']=0x1,this[_0x25fde8(0x980)][_0x25fde8(0x4a1)](Math[_0x25fde8(0x997)](this[_0x25fde8(0x590)]/0x2),this[_0x25fde8(0x3d7)]),this['_pauseSignSprite']['setFrame'](_0x223e80,_0x8a9e44,_0x2b67f3,_0x2b67f3),this[_0x25fde8(0x980)][_0x25fde8(0x51c)]=0xff;},Window['prototype'][_0x25789e(0x10d)]=function(){const _0x158b5a=_0x25789e,_0x486580=this[_0x158b5a(0x13c)]['worldTransform'][_0x158b5a(0x9f4)](new Point(0x0,0x0)),_0x28a45c=this[_0x158b5a(0x13c)]['filterArea'];_0x28a45c['x']=_0x486580['x']+this[_0x158b5a(0x5ff)]['x'],_0x28a45c['y']=_0x486580['y']+this[_0x158b5a(0x5ff)]['y'],_0x28a45c[_0x158b5a(0x59d)]=Math[_0x158b5a(0x169)](this[_0x158b5a(0x1b1)]*this[_0x158b5a(0x24b)]['x']),_0x28a45c[_0x158b5a(0x844)]=Math['ceil'](this[_0x158b5a(0x90f)]*this[_0x158b5a(0x24b)]['y']);},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x95c)]=Window[_0x25789e(0x866)][_0x25789e(0x907)],Window[_0x25789e(0x866)]['_refreshBack']=function(){const _0x1ded7c=_0x25789e,_0x532729=VisuMZ[_0x1ded7c(0xf9)]['Settings'][_0x1ded7c(0x36b)]['CorrectSkinBleeding']??!![];if(!_0x532729){if(_0x1ded7c(0x503)===_0x1ded7c(0x503))return VisuMZ[_0x1ded7c(0xf9)][_0x1ded7c(0x95c)][_0x1ded7c(0x800)](this);else _0x3d3a28['prototype'][_0x1ded7c(0x5b5)]['call'](this),!_0x53d033[_0x1ded7c(0x278)](_0x3c4b26)&&(this[_0x1ded7c(0x63e)][_0x1ded7c(0x91c)](),this['_mapNameWindow'][_0x1ded7c(0x4fd)](),this[_0x1ded7c(0x18e)][_0x1ded7c(0x106)]=![],_0xd3c4cf[_0x1ded7c(0x71a)]()),_0x26e34e[_0x1ded7c(0x58f)](),this[_0x1ded7c(0x7fb)]();}const _0x3b8960=this[_0x1ded7c(0x7cb)],_0x1475c3=Math[_0x1ded7c(0x311)](0x0,this[_0x1ded7c(0x590)]-_0x3b8960*0x2),_0x4ce671=Math[_0x1ded7c(0x311)](0x0,this[_0x1ded7c(0x3d7)]-_0x3b8960*0x2),_0x8696c4=this['_backSprite'],_0x312b2e=_0x8696c4[_0x1ded7c(0x689)][0x0];_0x8696c4[_0x1ded7c(0x6d6)]=this[_0x1ded7c(0x9ef)],_0x8696c4[_0x1ded7c(0x1ea)](0x0,0x0,0x60,0x60),_0x8696c4['move'](_0x3b8960,_0x3b8960),_0x8696c4[_0x1ded7c(0x24b)]['x']=_0x1475c3/0x60,_0x8696c4['scale']['y']=_0x4ce671/0x60,_0x312b2e[_0x1ded7c(0x6d6)]=this[_0x1ded7c(0x9ef)],_0x312b2e[_0x1ded7c(0x1ea)](0x0,0x60,0x60,0x60),_0x312b2e[_0x1ded7c(0x4a1)](0x0,0x0,_0x1475c3,_0x4ce671),_0x312b2e[_0x1ded7c(0x24b)]['x']=0x1/_0x8696c4[_0x1ded7c(0x24b)]['x'],_0x312b2e[_0x1ded7c(0x24b)]['y']=0x1/_0x8696c4['scale']['y'],_0x8696c4[_0x1ded7c(0x2dc)](this['_colorTone']);},Game_Temp[_0x25789e(0x866)][_0x25789e(0x6e1)]=function(){const _0x463c5b=_0x25789e;this[_0x463c5b(0x370)]=[],this[_0x463c5b(0x39c)]=[],this[_0x463c5b(0x264)]=[],this[_0x463c5b(0x250)]=[];},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x6f7)]=Scene_Base[_0x25789e(0x866)][_0x25789e(0x5b5)],Scene_Base[_0x25789e(0x866)]['terminate']=function(){const _0x1e891a=_0x25789e;if($gameTemp)$gameTemp[_0x1e891a(0x6e1)]();VisuMZ[_0x1e891a(0xf9)][_0x1e891a(0x6f7)][_0x1e891a(0x800)](this);},Bitmap[_0x25789e(0x866)][_0x25789e(0x367)]=function(_0x22180e){const _0x1f849e=_0x25789e,_0x5e8ac5=this[_0x1f849e(0x531)];_0x5e8ac5[_0x1f849e(0x815)](),_0x5e8ac5['font']=this[_0x1f849e(0x652)]();const _0x2c9f18=_0x5e8ac5[_0x1f849e(0x29f)](_0x22180e)[_0x1f849e(0x59d)];return _0x5e8ac5[_0x1f849e(0x5a4)](),_0x2c9f18;},Window_Message[_0x25789e(0x866)][_0x25789e(0x448)]=function(_0x358bf9){const _0x328149=_0x25789e;if(this['useFontWidthFix']())return this[_0x328149(0x890)][_0x328149(0x367)](_0x358bf9);else{if(_0x328149(0x189)===_0x328149(0x3b3)){for(const _0x3f1011 of this[_0x328149(0x2b2)]){!_0x3f1011['isPlaying']()&&this[_0x328149(0x834)](_0x3f1011);}this['processFauxAnimationRequests']();}else return Window_Base['prototype'][_0x328149(0x448)][_0x328149(0x800)](this,_0x358bf9);}},Window_Message[_0x25789e(0x866)][_0x25789e(0x288)]=function(){const _0x3ac7f4=_0x25789e;return VisuMZ[_0x3ac7f4(0xf9)][_0x3ac7f4(0x59c)][_0x3ac7f4(0x25e)]['FontWidthFix']??!![];},VisuMZ[_0x25789e(0xf9)]['Game_Action_numRepeats']=Game_Action[_0x25789e(0x866)]['numRepeats'],Game_Action[_0x25789e(0x866)]['numRepeats']=function(){const _0xdc85ef=_0x25789e;return this[_0xdc85ef(0x4be)]()?VisuMZ['CoreEngine'][_0xdc85ef(0x9a6)][_0xdc85ef(0x800)](this):0x0;},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x112)]=Game_Action['prototype'][_0x25789e(0x2a5)],Game_Action[_0x25789e(0x866)][_0x25789e(0x2a5)]=function(){const _0x1eef9d=_0x25789e;this[_0x1eef9d(0x8b3)]()&&this[_0x1eef9d(0x8b3)]()['canAttack']()?VisuMZ[_0x1eef9d(0xf9)][_0x1eef9d(0x112)][_0x1eef9d(0x800)](this):this['clear']();},Sprite_Name['prototype'][_0x25789e(0x417)]=function(){return 0x24;},Sprite_Name[_0x25789e(0x866)][_0x25789e(0x1dd)]=function(){const _0x2f1c8f=_0x25789e,_0x2aa591=this[_0x2f1c8f(0x126)](),_0x2bd828=this[_0x2f1c8f(0x984)](),_0x9ac13d=this[_0x2f1c8f(0x417)]();this[_0x2f1c8f(0x2ce)](),this[_0x2f1c8f(0x6d6)]['clear'](),this[_0x2f1c8f(0x6d6)][_0x2f1c8f(0x543)](_0x2aa591,0x4,0x0,_0x2bd828-0xa,_0x9ac13d,_0x2f1c8f(0x981));},Bitmap[_0x25789e(0x866)][_0x25789e(0x543)]=function(_0x114a64,_0x14016e,_0x5aae82,_0x4ea4d7,_0x58a653,_0x136d26){const _0x222511=_0x25789e,_0x208989=this[_0x222511(0x531)],_0x550c02=_0x208989['globalAlpha'];_0x4ea4d7=_0x4ea4d7||0xffffffff;let _0x3b0356=_0x14016e,_0x5c975b=Math[_0x222511(0x997)](_0x5aae82+0x18/0x2+this[_0x222511(0x92c)]*0.35);_0x136d26==='center'&&(_0x222511(0x860)!==_0x222511(0x860)?this[_0x222511(0x3da)]=_0x5369e6:_0x3b0356+=_0x4ea4d7/0x2),_0x136d26==='right'&&('dhYhN'===_0x222511(0x34e)?_0x3b0356+=_0x4ea4d7:this[_0x222511(0x114)]()),_0x208989[_0x222511(0x815)](),_0x208989['font']=this[_0x222511(0x652)](),_0x208989[_0x222511(0x27f)]=_0x136d26,_0x208989[_0x222511(0x7f1)]=_0x222511(0x281),_0x208989[_0x222511(0x6a9)]=0x1,this['_drawTextOutline'](_0x114a64,_0x3b0356,_0x5c975b,_0x4ea4d7),_0x208989[_0x222511(0x6a9)]=_0x550c02,this['_drawTextBody'](_0x114a64,_0x3b0356,_0x5c975b,_0x4ea4d7),_0x208989[_0x222511(0x5a4)](),this['_baseTexture'][_0x222511(0x91c)]();},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x28c)]=BattleManager[_0x25789e(0x65c)],BattleManager['checkSubstitute']=function(_0x1459a6){const _0x580212=_0x25789e;if(this[_0x580212(0x8e5)][_0x580212(0x5fb)]())return![];return VisuMZ['CoreEngine'][_0x580212(0x28c)][_0x580212(0x800)](this,_0x1459a6);},BattleManager['endAction']=function(){const _0x1424a4=_0x25789e;if(this[_0x1424a4(0x861)])this['_logWindow']['endAction'](this['_subject']);this[_0x1424a4(0x77a)]='turn',this[_0x1424a4(0x861)]&&this['_subject'][_0x1424a4(0x1ad)]()===0x0&&(this['endBattlerActions'](this['_subject']),this['_subject']=null);},Bitmap[_0x25789e(0x866)][_0x25789e(0x829)]=function(){const _0x42efd3=_0x25789e;this['_image']=new Image(),this[_0x42efd3(0x957)][_0x42efd3(0x1e7)]=this[_0x42efd3(0xc1)][_0x42efd3(0x53d)](this),this[_0x42efd3(0x957)][_0x42efd3(0x24e)]=this[_0x42efd3(0x917)][_0x42efd3(0x53d)](this),this[_0x42efd3(0x32d)](),this[_0x42efd3(0x768)]='loading',Utils[_0x42efd3(0x3ba)]()?this[_0x42efd3(0x65b)]():(this[_0x42efd3(0x957)][_0x42efd3(0x17b)]=this['_url'],![]&&this[_0x42efd3(0x957)][_0x42efd3(0x59d)]>0x0&&(this[_0x42efd3(0x957)]['onload']=null,this[_0x42efd3(0xc1)]()));},Scene_Skill[_0x25789e(0x866)][_0x25789e(0x83c)]=function(){const _0x8bab0a=_0x25789e;Scene_MenuBase[_0x8bab0a(0x866)][_0x8bab0a(0x83c)][_0x8bab0a(0x800)](this),this[_0x8bab0a(0x54b)](),this['_itemWindow'][_0x8bab0a(0x836)](),this['_itemWindow'][_0x8bab0a(0x3e2)](),this[_0x8bab0a(0x723)][_0x8bab0a(0x735)]();},Scene_Skill[_0x25789e(0x866)][_0x25789e(0x47b)]=function(){const _0x12f0bb=_0x25789e;return this[_0x12f0bb(0x723)]&&this[_0x12f0bb(0x723)][_0x12f0bb(0x842)];},Game_Map['prototype'][_0x25789e(0x759)]=function(_0x5e3ddc,_0x32b357,_0x34413d){const _0x493e53=_0x25789e,_0x2a6e2b=this['tilesetFlags'](),_0x5738c0=this[_0x493e53(0x5fa)](_0x5e3ddc,_0x32b357);for(const _0x5e23a2 of _0x5738c0){if(_0x493e53(0x8ae)===_0x493e53(0xce)){var _0x1eae10=_0x2c6587(_0xabe1c['$1']);_0x3d3a42*=_0x1eae10;}else{const _0x2ba255=_0x2a6e2b[_0x5e23a2];if(_0x2ba255===undefined||_0x2ba255===null){if($gameTemp[_0x493e53(0x254)]()&&!DataManager[_0x493e53(0x5d3)]()){if(_0x493e53(0x6ce)===_0x493e53(0xf4)){_0x363f53[_0x493e53(0xf9)][_0x493e53(0x95f)][_0x493e53(0x800)](this);const _0x1d6ad5=this[_0x493e53(0x63e)][_0x493e53(0x83b)];if(_0x1d6ad5)this[_0x493e53(0x99d)](_0x1d6ad5);}else{let _0x3c6d42='Current\x20tileset\x20has\x20incomplete\x20flag\x20data.'+'\x0a';_0x3c6d42+=_0x493e53(0x5a6)+'\x0a',_0x3c6d42+=_0x493e53(0xb9),this[_0x493e53(0x8ec)]()?_0x493e53(0x654)===_0x493e53(0x43d)?_0x5dd615['VisuMZ_2_BattleSystemETB']&&(this[_0x493e53(0x29e)]=_0x493e53(0x7d8)):(alert(_0x3c6d42),SceneManager['exit']()):_0x493e53(0x277)!=='SZHqU'?(console['log'](_0x3c6d42),!$gameTemp['_showDevTools']&&($gameTemp['_showDevTools']=!![],SceneManager[_0x493e53(0x271)]())):this[_0x493e53(0x9f1)]['setBackgroundType'](_0x5474d8['layoutSettings'][_0x493e53(0x5c8)]);}}}if((_0x2ba255&0x10)!==0x0){if(_0x493e53(0x10f)===_0x493e53(0x598))this['_forcedTroopView']='FV';else continue;}if((_0x2ba255&_0x34413d)===0x0)return!![];if((_0x2ba255&_0x34413d)===_0x34413d){if('cXSXg'!==_0x493e53(0x2e1)){if(this[_0x493e53(0x998)]===_0x1c921e)this['initCoreEngineScreenShake']();this[_0x493e53(0x998)]=_0x18411b['toLowerCase']()['trim']();}else return![];}}}return![];},Game_Map[_0x25789e(0x866)][_0x25789e(0x8ec)]=function(){const _0x147009=_0x25789e;if(Imported['VisuMZ_3_EventChainReact'])return!![];if(Imported[_0x147009(0x226)])return!![];return![];},Sprite_Animation[_0x25789e(0x866)][_0x25789e(0x197)]=function(_0x8b00af){const _0x13a589=_0x25789e;!this[_0x13a589(0x464)]&&(this['_originalViewport']=_0x8b00af['gl'][_0x13a589(0x77c)](_0x8b00af['gl'][_0x13a589(0x241)]));},VisuMZ[_0x25789e(0xf9)][_0x25789e(0x4dc)]=Scene_Map['prototype']['shouldAutosave'],Scene_Map[_0x25789e(0x866)][_0x25789e(0x1bc)]=function(){const _0x1b418c=_0x25789e,_0x39feb8=SceneManager[_0x1b418c(0x3a7)]['name'];if([_0x1b418c(0x737),_0x1b418c(0x4a8),'Scene_TitleTransition',_0x1b418c(0x941)][_0x1b418c(0x2ec)](_0x39feb8))return![];return VisuMZ[_0x1b418c(0xf9)][_0x1b418c(0x4dc)][_0x1b418c(0x800)](this);};