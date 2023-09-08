//=============================================================================
// VisuStella MZ - Battle System CTB - Charge Turn Battle
// VisuMZ_2_BattleSystemCTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemCTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemCTB = VisuMZ.BattleSystemCTB || {};
VisuMZ.BattleSystemCTB.version = 1.22;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.22] [BattleSystemCTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_CTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin creates a Charge Turn Battle (CTB) system using RPG Maker MZ's
 * TPB as a base. CTB functions by calculating the speed of every battler and
 * balancing them relative to one another. When it's a battler's turn, the
 * battler will either choose an action to perform immediately or charge it
 * for later depending if the skill requires charging.
 * 
 * This is a battle system where agility plays an important factor in the
 * progress of battle where higher agility values give battlers more advantage
 * and additional turns over lower agility values, which give battlers less
 * advantage and less turns.
 * 
 * A turn order display will appear to compensate for the removal of gauges.
 * The turn order display will show a preview of what the turn order could
 * possibly be like. This turn order display is variable and can be changed
 * due to player and enemy influence by using different action speeds, effects
 * provided by this plugin that alter the turn order, and more!
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB integrated mechanics converted for CTB such as
 *   speed, calculations, etc.
 * * No more waiting for gauges to show up! In fact, you won't even see the
 *   TPB gauge in-game.
 * * A turn order display that previews a potential lineup for how the
 *   participating battlers in battle will play out.
 * * Notetags that give skills and items access to manipulating a battler's
 *   CTB speed.
 * * Notetags that give skills and items access to directly manipulate a target
 *   batter's position on the Turn Order display.
 * * These mechanics are separate from ATB and TPB itself, so you can still use
 *   either battle system without affecting both of them.
 * * Through the Core Engine, you can switch in and out of CTB for a different
 *   battle system.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
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
 * Turn Order Display
 * 
 * Despite the fact that the Battle System CTB plugin uses RPG Maker MZ's TPB
 * as a base, it does not have any gauges to depict the time it takes for a
 * battler's turn to appear. Instead, a turn order display appears on the
 * screen (you pick where it can appear: top, bottom, left, or right) and shows
 * a possible preview of the battler turn order.
 * 
 * This is only a preview of what can happen because lots of different things
 * can influence the position and ordering of the turn order display, ranging
 * from skill/item speeds, notetag effects, changes in AGI, etc. What is seen
 * on the turn order display is the most likely possibility instead of the
 * exact order to occur due to the external influences.
 * 
 * ---
 * 
 * Skill & Item Speeds
 * 
 * With TPB, skills and items with negative speed values will cause the battler
 * to enter a "casting" state, meaning they have to wait extra time before the
 * action takes off. With this delayed action execution, one might assume that
 * if there is a positive speed value, the battler would require less time for
 * their next turn.
 * 
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to CTB,
 * skills and items with positive speed values will have an impact on how full
 * their CTB Speed will be in the following turn. A value of 2000 will put the
 * turn at 50% ready, 1000 will put the gauge at 25% ready, 500 will put it at
 * 12.5% ready, and so on. Notetags can also be used to influence this.
 * 
 * ---
 * 
 * JS Calculation Mechanics
 * 
 * While the calculation mechanics aren't changed from their original RPG Maker
 * MZ formulas, the functions for them have been overwritten to allow you, the
 * game developer, to alter them as you see fit.
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
 * === General CTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <CTB Help>
 *  description
 *  description
 * </CTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under CTB.
 * - This is primarily used if the skill behaves differently in CTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to CTB.
 *
 * ---
 * 
 * === CTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the CTB Turn Order Display
 * 
 * ---
 *
 * <CTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <CTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <CTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === CTB Speed Manipulation-Related Notetags ===
 * 
 * These notetags are used for CTB Speed manipulation purposes.
 * 
 * ---
 *
 * <CTB Set Order: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position to exactly x.
 * - Replace 'x' with a number value depicting the exact position of the turn
 *   order position. 0 is the currently active battler and cannot be used.
 *   1 is closest to taking a turn. Higher numbers are further away.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB Change Order: +x>
 * <CTB Change Order: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position by x slots.
 * - Replace 'x' with a number value indicating the increase or decrease.
 *   Negative values decrease the turns needed to wait while positive values
 *   increase the turns needed.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB After Speed: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's CTB Speed will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   CTB Speed to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <CTB Charge Speed: x%>
 * <CTB Charge Speed: +x%>
 * <CTB Charge Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <CTB Cast Speed: x%>
 * <CTB Cast Speed: +x%>
 * <CTB Cast Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 * 
 * === JavaScript Notetags: CTB Speed Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional CTB Speed Manipulation.
 * 
 * ---
 * 
 * <JS CTB Order>
 *  code
 *  code
 *  order = code;
 * </JS CTB Order>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine where to set the target's
 *   order on the CTB Turn Order Display to.
 * - The 'order' variable represents the final position on the Turn Order
 *   Display to place the target.
 * - The 'position' variable represents the target's current position on the
 *   Turn Order Display.
 * - This does not affect the currently active battler.
 * 
 * ---
 * 
 * <JS CTB Charge Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Charge Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a charging state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS CTB Cast Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Cast Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a casting state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS CTB After Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB After Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to after performing this skill/item action.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to 0.
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
 * Actor: Change CTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the CTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change CTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the CTB Turn Order.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   Face Name:
 *   - This is the filename for the target face graphic.
 * 
 *   Face Index:
 *   - This is the index for the target face graphic.
 * 
 * ---
 *
 * Actor: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change CTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change CTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 * 
 * System: CTB Turn Order Visibility
 * - Determine the visibility of the CTB Turn Order Display.
 * 
 *   Visibility:
 *   - Changes the visibility of the CTB Turn Order Display.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System CTB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * General
 * 
 *   Device Friendly:
 *   - Make the calculations more device friendly?
 *   - Or make it for desktop at full strength?
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Initial Speed:
 *   - JavaScript code to determine how much speed to give each battler at the
 *     start of battle.
 * 
 *   JS: Speed:
 *   - JavaScript code to determine how much speed a battler has.
 * 
 *   JS: Base Speed:
 *   - JavaScript code to determine how much base speed a battler has.
 * 
 *   JS: Relative Speed:
 *   - JavaScript code to determine what is the relative speed of a battler.
 * 
 *   JS: Acceleration:
 *   - JavaScript code to determine how much gauges accelerate by relative to
 *     reference time.
 * 
 *   JS: Cast Time:
 *   - JavaScript code to determine how much cast time is used for skills/items
 *     with negative speed modifiers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Order Change Effects Settings
 * ============================================================================
 * 
 * Whenever the turn order a battler is changed by a CTB Order notetag, play
 * these effects on the target battler. These effects do not play if the order
 * was changed due to speed changes and only through the specific notetags.
 *
 * ---
 *
 * Delay Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is delayed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is delayed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is delayed.
 *
 * ---
 *
 * Delay Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is delayed.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * Rush Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is rushed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is rushed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is rushed.
 *
 * ---
 *
 * Rush Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is rushed.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System CTB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Total Horizontal:
 *   - How many slots do you want to display for top and bottom Turn Order
 *     Display positions?
 * 
 *   Total Vertical:
 *   - How many slots do you want to display for left and right Turn Order
 *     Display positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
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
 * Version 1.22: July 13, 2023
 * * Bug Fixes!
 * ** Fixed turn order gauge sprite swapping bug for battlers with similar AGI
 *    values. Fix made by Olivia.
 * 
 * Version 1.21: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.20: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the CTB Turn Order faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.19: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 * 
 * Version 1.18: June 2, 2022
 * * Bug Fixes!
 * ** Notetag effect for <CTB After Speed: x%> should now be working properly.
 *    Fix made by Olivia.
 * ** Notetag effect for <JS CTB After Speed> should now be working properly.
 *    Fix made by Olivia.
 * 
 * Version 1.17: May 2, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: April 28, 2022
 * * Feature Update!
 * ** Added update for CTB-specific idle time to allow a more consistent turn
 *    end processing for actors and enemies with higher than normal AGI values.
 *    Update made by Olivia.
 * 
 * Version 1.15: April 21, 2022
 * * Bug Fixes!
 * ** The endless softlock has been fixed! Much thanks to AndyL for providing a
 *    project that can easily replicate it! Fix made by Yanfly.
 * * Feature Update!
 * ** Slightly more accurate turn order forecasting. However, there is only so
 *    much I can do due to JavaScript's "accuracy" with decimal values. Update
 *    made by Yanfly.
 * 
 * Version 1.14: March 31, 2022
 * * Feature Update!
 * ** Updated anti-softlock check at 180 frames (3 seconds) to automatically
 *    clear any battle states to see if they're the cause of the hangup.
 * ** Updated anti-softlock check at 300 frames (5 seconds) to automatically
 *    clear all states to see if they're the cause of the hangup.
 * ** Updated anti-softlock check at 600 frames (10 seconds) to automatically
 *    abort the battle to salvage the game from freezing.
 * 
 * Version 1.13: March 3, 2022
 * * Feature Update!
 * ** Reserved common events for non-action sequence skills now function
 *    separately from one another when used by a battler with Action Times+.
 *    Update made by Olivia.
 * 
 * Version 1.12: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.10: June 18, 2021
 * * Bug Fixes!
 * ** Fixed turn order icon reappearing for a dying battler. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > Mechanics > General > Device Friendly
 * **** Make the calculations more device friendly? Or make it for desktop at
 *      full strength?
 * 
 * Version 1.09: June 11, 2021
 * * Bug Fixes!
 * ** Plugin Command: "Enemy: Change CTB Turn Order Face" should now properly
 *    change to the correct face index. Fix made by Arisu.
 * 
 * Version 1.08: April 23, 2021
 * * Feature Update!
 * ** When using 100% for After Speed notetag, no other battler is able to
 *    interrupt the action. Update made by Olivia.
 * 
 * Version 1.07: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.06: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * ** Added in a built-in anti-softlock check.
 * 
 * Version 1.05: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Optimization Update!
 * ** Uses less resources for turn order display.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change CTB Turn Order Face
 * **** Changes the faces used for the specific actor(s) on the CTB Turn Order.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Turn Order icons no longer stay invisible after rotating out completely.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <CTB Turn Order Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Action times + should no longer freeze the game. Fix made by Yanfly.
 * ** Actors and enemies without actions will no longer softlock the game.
 *    Fix made by Yanfly.
 * ** Auto-battle during CTB should no longer lock the game! Fix by Yanfly.
 * ** Enemies without any actions should no longer cause endless loops.
 *    Fix made by Yanfly.
 * ** SV_Actor graphics on the Turn Order display are now centered.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release: October 19, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderActorIcon
 * @text Actor: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the CTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderActorFace
 * @text Actor: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the CTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderClearActorGraphic
 * @text Actor: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderEnemyIcon
 * @text Enemy: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderEnemyFace
 * @text Enemy: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: CTB Turn Order Visibility
 * @desc Determine the visibility of the CTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the CTB Turn Order Display.
 * @default true
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
 * @param BattleSystemCTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings used for Battle System CTB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.50","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Effect:struct
 * @text Order Change Effects
 * @type struct<Effect>
 * @desc Effects to play when the Turn Order is changed in CTB.
 * @default {"Delay":"","DelayAnimation":"","DelayAnimationID:num":"54","DelayMirror:eval":"false","DelayMute:eval":"false","DelayPopups":"","DelayPopupText:str":"DELAY","DelayTextColor:str":"25","DelayFlashColor:eval":"[255, 0, 0, 160]","DelayFlashDuration:num":"60","Rush":"","RushAnimation":"","RushAnimationID:num":"51","RushMirror:eval":"false","RushMute:eval":"false","RushPopups":"","RushPopupText:str":"RUSH","RushTextColor:str":"24","RushFlashColor:eval":"[0, 255, 0, 160]","RushFlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System CTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","TotalHorzSprites:num":"16","TotalVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 *
 * @param DeviceFriendly:eval
 * @text Device Friendly
 * @parent General
 * @type boolean
 * @on Device Friendly
 * @off For Desktops
 * @desc Make the calculations more device friendly?
 * Or make it for desktop at full strength?
 * @default false
 * 
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Speed
 * @parent JavaScript
 * @desc JavaScript code to determine how much speed to give
 * each battler at the start of battle.
 * @default Math.random() * 0.5
 *
 * @param TpbSpeedCalcJS:func
 * @text JS: Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much speed a battler has.
 * @default "// Declare Constants\nconst user = this;\n\n// Process Calculation\nlet speed = Math.sqrt(user.agi) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param TpbBaseSpeedCalcJS:func
 * @text JS: Base Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much base speed a battler has.
 * @default "// Declare Constants\nconst user = this;\nconst baseAgility = user.paramBasePlus(6);\n\n// Process Calculation\nlet speed = Math.sqrt(baseAgility) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param BattlerRelativeSpeedJS:func
 * @text JS: Relative Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine what is the relative speed of a battler.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbSpeed()\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\n\n// Process Calculation\nlet relativeSpeed = speed / partyBaseSpeed;\n\n// Return Value\nreturn relativeSpeed;"
 * 
 * @param TpbAccelerationJS:func
 * @text JS: Acceleration
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much gauges accelerate by relative to reference time.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbRelativeSpeed();\nconst referenceTime = $gameParty.tpbReferenceTime();\n\n// Process Calculation\nlet acceleration = speed / referenceTime;\n\n// Return Value\nreturn acceleration;"
 * 
 * @param TpbCastTimeJS:func
 * @text JS: Cast Time
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much cast time is used for skills/items with negative speed modifiers.
 * @default "// Declare Constants\nconst user = this;\nconst actions = user._actions.filter(action => action.isValid());\nconst items = actions.map(action => action.item());\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\n\n// Process Calculation\nlet time = Math.sqrt(delay) / user.tpbSpeed();\n\n// Return Value\nreturn time;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Effect:
 *
 * @param Delay
 * @text Delay Turn Order
 * 
 * @param DelayAnimation
 * @text Animation
 * @parent Delay
 *
 * @param DelayAnimationID:num
 * @text Animation ID
 * @parent DelayAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is delayed.
 * @default 54
 *
 * @param DelayMirror:eval
 * @text Mirror Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayMute:eval
 * @text Mute Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayPopups
 * @text Popups
 * @parent Delay
 *
 * @param DelayPopupText:str
 * @text Text
 * @parent DelayPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is delayed.
 * @default DELAY
 *
 * @param DelayTextColor:str
 * @text Text Color
 * @parent DelayPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param DelayFlashColor:eval
 * @text Flash Color
 * @parent DelayPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DelayFlashDuration:num
 * @text Flash Duration
 * @parent DelayPopups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Rush
 * @text Rush Turn Order
 * 
 * @param RushAnimation
 * @text Animation
 * @parent Rush
 *
 * @param RushAnimationID:num
 * @text Animation ID
 * @parent RushAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is rushed.
 * @default 51
 *
 * @param RushMirror:eval
 * @text Mirror Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushMute:eval
 * @text Mute Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushPopups
 * @text Popups
 * @parent Rush
 *
 * @param RushPopupText:str
 * @text Text
 * @parent RushPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is rushed.
 * @default RUSH
 *
 * @param RushTextColor:str
 * @text Text Color
 * @parent RushPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param RushFlashColor:eval
 * @text Flash Color
 * @parent RushPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param RushFlashDuration:num
 * @text Flash Duration
 * @parent RushPopups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 96
 * 
 * @param Slots
 *
 * @param TotalHorzSprites:num
 * @text Total Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param TotalVertSprites:num
 * @text Total Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
//=============================================================================

const _0x3c9213=_0xd5ad;function _0x5781(){const _0x341ec8=['BorderThickness','Window_StatusBase_placeGauge','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Ticks\x20to\x20Goal:\x20','createTurnOrderCTBGraphicType','createTestBitmap','otherCtbChecksPassed','UpdateFrames','qqjWs','BattleManager_updateTpbInput','tToia','EnemyBattlerIcon','%1FlashColor','_isAlive','BattleManager_battleSys','qEhoT','Game_Battler_tpbBaseSpeed','Game_Battler_updateTpbChargeTime','5279516eYFrvX','kloof','EnemyBattlerDrawLetter','ScreenBuffer','createTurnOrderCTBGraphicFaceName','onRestrict','isActing','_logWindow','getBattleSystem','setItem','KzagH','createChildren','isSceneBattle','item','_actionBattlers','xdhAa','note','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','undecided','_graphicType','prepare','TpbBaseSpeedCalcJS','battlerHue','some','TotalHorzSprites','LWlIy','GddRw','isTpbCharged','TotalVertSprites','OrderJS','setBlendColor','applyItemUserEffect','_graphicHue','_ctbTurnOrderIconIndex','Game_Battler_initTpbChargeTime','fnFNx','DWtJF','ceil','postEndActionCTB','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_ctbTurnOrderGraphicType','initTpbChargeTime','battler','face','KlTeW','applyItemBattleSystemCTBUserEffect','ARRAYFUNC','applyBattleSystemCTBUserEffect','BattleManager_isTpb','OrderDirection','setText','ShowMarkerBorder','_fadeTarget','maxBattleMembers','OPvKD','isCtbChargingState','_homeY','svBattlerName','bind','tpbSpeed','center','name','_autoBattle','battleEnd','RepositionTopHelpY','isAttack','ySkJy','Actor-%1-%2','_dupe','ARRAYNUM','casting','update','_graphicSprite','MAX_SAFE_INTEGER','updateLetter','endAction','_isBattleOver','BattleManager_startBattle','tpbBaseSpeed','svActorHorzCells','isAppeared','length','zPcfD','top','ZobXF','onTpbCharged','ParseItemNotetags','EnemyBattlerFontFace','_onRestrictBypassCtbReset','izdYY','ARRAYSTRUCT','SpriteThin','call','_ctbAfterSpeed','updateTpbInput','Anti-CTB\x20Softlock\x20Count:','_forcing','yvHuQ','crfNa','Weapon-%1-%2','currentAction','clearStates','defaultPosition','bqWjk','getColor','prototype','_ogWindowLayerY','changeCtbChargeTime','isInputting','_turnOrderInnerSprite','fPIJx','createAllWindows','%1FlashDuration','applyCTBPenalty','_graphicFaceIndex','isCTB','isAnyBattlerReadyCTB','_fadeDuration','onCtbOrderChange','8562895UWUtLz','clear','RepositionTopHelpX','MUiDj','Window_Help_setItem','iconWidth','BattleSystemCTB','Enemy','updateTpbChargeTime','changeEnemyGraphicBitmap','initBattleSystemCTB','createTurnOrderCTBGraphicFaceIndex','Armor-%1-%2','sort','getChildIndex','cNbdr','_positionTargetX','containerPosition','_positionTargetY','kxdNi','cRKXS','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Game_System_initialize','changeCtbCastTime','STRUCT','reduce','EnemyBattlerFaceIndex','updateVisibility','createLetterSprite','3lThwFq','Ipszl','onDatabaseLoaded','isPlaytest','pJgGH','TurnOrderCTBGraphicFaceIndex','startAction','speed','createKeyJS','width','EVAL','CtbTurnOrderEnemyFace','max','xdjgF','updateGraphicHue','_ctbTurnOrderFaceIndex','CQygE','pZmBF','DisplayOffsetY','MvJop','Visible','EnemyBattlerFaceName','After','Game_Battler_tpbAcceleration','updateTurnCTB','find','updateTpbCastTimeCTB','turn','BattleManager_isActiveTpb','EnemyBattlerType','updateTpbChargeTimeCTB','TurnOrderCTBGraphicFaceName','IconSet','height','FUNC','InitialGaugeJS','compareBattlerSprites','%1\x20%2\x20%3','createBackgroundSprite','BattleManager_updateAllTpbBattlers','members','svActorVertCells','isAlive','preEndActionCTB','_plural','BQLBu','canMove','initialize','checkOpacity','Game_Battler_applyTpbPenalty','faceHeight','setCtbAfterSpeed','tpbAcceleration','TurnOrderCTBGraphicIconIndex','removeBattleStates','_backgroundSprite','lqDdn','YoYvC','onBattleStart','lhgLX','TpbSpeedCalcJS','RepositionLogWindow','BattleManager_processTurn','_graphicIconIndex','processTurn','ILXOW','Wwxbo','setCtbCastTime','_letter','ActorBattlerType','Game_BattlerBase_appear','checkTpbTurnEnd','exit','processUpdateGraphic','tpbChargeTime','Enemies','ActorBattlerIcon','Game_Action_applyGlobal','setCtbChargeTime','svactor','ready','BGRnP','KVlIE','clearRect','round','rotateDupeNumber','_homeX','drawText','startActorInput','repositionLogWindowCTB','registerCommand','_letterSprite','HkTeq','description','tmnhf','updatePadding','createCTBTurnOrderWindow','_tpbCastTime','updateTpbCtb','_ctbTurnOrderWindow','Game_Battler_tpbRelativeSpeed','_unit','initMembers','DisplayOffsetX','UxsTr','isCtbCastingState','efXyw','parameters','tpbRequiredCastTime','_inputting','battlerName','EnemyBattlerFontSize','min','isDead','updateTpbIdleTimeCTB','GftCQ','TurnOrderCTBGraphicType','updateTpbIdleTime','mainFontFace','llHGX','bitmapWidth','removeCurrentAction','loadSystem','time','IyjbK','createBattlerSprites','CtbTurnOrderActorIcon','updateGraphic','isActiveTpb','BattleManager_endAction','filter','createRateJS','_position','isActor','updateTpb','left','Scene_Battle_selectNextCommand','NUM','JSON','isSideView','charging','updateOpacity','updateTurnOrderCTB','isPassCTB','processTurnOrderChangeCTB','_index','ARRAYEVAL','KwOQH','getCurrentTurnOrderPositionCTB','tpbRelativeSpeed','MJXAY','clearTpbChargeTime','520FlOGeh','isTpbReady','_ogWindowLayerX','ParseSkillNotetags','biJih','Actors','updateTurnOrder','loadFace','changeTurnOrderByCTB','wBRSp','Game_BattlerBase_hide','version','_tpbState','isHorz','_actionState','addInnerChild','zbTou','rotateCTBSprites','nSvKO','bFOAe','Aborting\x20Battle.\x20Softlock\x20cannot\x20be\x20fixed.','applyTpbPenalty','updateSelectionEffect','Game_Battler_updateTpb','xUqGf','anchor','562070XlIgag','Game_Battler_onRestrict','%1BorderColor','ctbHasInstantActionAfter','ConvertParams','_isAppeared','opacity','RsaLd','actor','#000000','fontSize','allBattleMembers','bitmapHeight','Settings','PvupH','iconHeight','BUrdR','clamp','createGraphicSprite','caVUP','SubjectDistance','MIN_SAFE_INTEGER','updateBattleContainerOrder','format','CtbTurnOrderClearActorGraphic','changeSvActorGraphicBitmap','(?:CTB)','Enemy-%1-%2','CTB','OflQT','OQukB','Cast','qNUUl','QZERT','_statusWindow','_subject','isValid','isEnemy','_tpbTurnCount','updateTurn','createBorderSprite','rdesZ','Scene_Battle_createAllWindows','Order','qucPn','_graphicEnemy','constructor','ghOpZ','traitObjects','30355pnInRJ','CJpTD','Game_Battler_tpbRequiredCastTime','containerWindow','icon','enemy','ctbStopped','addChild','HbiuI','%1BgColor2','RepositionTopForHelp','updateAllTpbBattlersCTB','createTurnOrderCTBGraphicIconIndex','setCTBGraphicIconIndex','subject','GpMYj','Game_Action_applyItemUserEffect','blt','hrFip','OiHpQ','setTurnOrderCTB','Parse_Notetags_CreateJS','IconIndex','Item-%1-%2','fontFace','Delay','kqIcl','1850902eAYSEB','setupTextPopup','bitmap','VisuMZ_0_CoreEngine','FaceName','FaceIndex','_turnOrderContainer','Mechanics','updateTpbCastTime','xyuQL','BattleManager_updateTurn','isBattleSystemCTBTurnOrderVisible','Game_Battler_clearTpbChargeTime','initTpbChargeTimeCTB','_graphicFaceName','_scene','log','map','children','setHue','fillRect','xAcOc','Rush','WHAwq','%1SystemBg','BattleManager_startActorInput','trim','setBattleSystemCTBTurnOrderVisible','xRnwe','SpriteLength','Charge','processTurnCTB','indexOf','DisplayPosition','process_VisuMZ_BattleSystemCTB_CreateRegExp','isRestricted','dPeix','nhFTy','rotateCTBSprite','_tpbChargeTime','gradientFillRect','Scene_Boot_onDatabaseLoaded','requestFauxAnimation','faceWidth','REYEr','TurnOrder','applyGlobal','getCtbCastTimeRate','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20position\x20=\x20target.getCurrentTurnOrderPositionCTB();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20order\x20=\x20position;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(order)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20order\x20=\x20position;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20order;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','qHprn','CXPmV','clearTpbChargeTimeCTB','%1Mute','810UHPUjo','loadSvEnemy','logCtbData','_ctbTurnOrderVisible','BattleManager_updateTpb','floor','faceName','skills','uhnrt','_windowLayer','startFade','processCtbAntiSoftlock','%1Mirror','RegExp','_anti_CTB_SoftlockCount','Game_Battler_updateTpbCastTime','includes','toUpperCase','Game_Battler_tpbSpeed','cHqgh','return\x200','startBattle','windowRect','174937ihYOYn','RVruB','_phase','processAbort','concat','350iVJvJx','loadEnemy','right','setActionState','battleSys','_positionDuration','SystemTurnOrderVisibility','Actor','parse','applyGlobalBattleSystemCTBEffects','State-%1-%2','VisuMZ_1_BattleCore','SUaee','changeFaceGraphicBitmap','uzIfe','visible','TpbCastTimeJS','TpbAccelerationJS','loadSvActor','addChildAt','%1TextColor','hasSvBattler','_graphicSv','xOiiI','changeIconGraphicBitmap','bottom','match','_ctbTurnOrderFaceName','checkPosition','addLoadListener','ticksLeft','Game_Battler_updateTpbIdleTime','process_VisuMZ_BattleSystemCTB_JS_Notetags','updateAllTpbBattlers','SHMVh','_debutCTB','CtbTurnOrderClearEnemyGraphic','updatePosition','clearTurnOrderCTBGraphics','185067TOoQrI','%1AnimationID','%1PopupText','TycOa','ctbTicksToGoal','gPPPK','selectNextCommand'];_0x5781=function(){return _0x341ec8;};return _0x5781();}(function(_0x32b6df,_0x458f2e){const _0x2efc27=_0xd5ad,_0x4205c9=_0x32b6df();while(!![]){try{const _0x2ae331=parseInt(_0x2efc27(0x74))/0x1+parseInt(_0x2efc27(0xc0))/0x2+parseInt(_0x2efc27(0x1e5))/0x3*(-parseInt(_0x2efc27(0x151))/0x4)+-parseInt(_0x2efc27(0xa5))/0x5*(-parseInt(_0x2efc27(0xf5))/0x6)+-parseInt(_0x2efc27(0x10c))/0x7*(parseInt(_0x2efc27(0x27d))/0x8)+parseInt(_0x2efc27(0x138))/0x9*(parseInt(_0x2efc27(0x111))/0xa)+parseInt(_0x2efc27(0x1c8))/0xb;if(_0x2ae331===_0x458f2e)break;else _0x4205c9['push'](_0x4205c9['shift']());}catch(_0x2adfc3){_0x4205c9['push'](_0x4205c9['shift']());}}}(_0x5781,0xd2322));var label=_0x3c9213(0x1ce),tier=tier||0x0,dependencies=[_0x3c9213(0xc3),_0x3c9213(0x11c)],pluginData=$plugins[_0x3c9213(0x267)](function(_0xce5f8f){const _0x5b98c4=_0x3c9213;return _0xce5f8f['status']&&_0xce5f8f['description'][_0x5b98c4(0x105)]('['+label+']');})[0x0];VisuMZ[label][_0x3c9213(0x81)]=VisuMZ[label][_0x3c9213(0x81)]||{},VisuMZ[_0x3c9213(0x78)]=function(_0x289fe0,_0x4f3144){const _0x42a46c=_0x3c9213;for(const _0x206482 in _0x4f3144){if(_0x42a46c(0xa3)==='GCQEZ')this['x']=this[_0x42a46c(0x23b)]+(_0x2d4906['RepositionTopHelpX']||0x0),this['y']=this[_0x42a46c(0x189)]+(_0x5b329a['RepositionTopHelpY']||0x0);else{if(_0x206482[_0x42a46c(0x12b)](/(.*):(.*)/i)){if('WJRUe'===_0x42a46c(0x236))_0x5b8c6d[_0x42a46c(0xc2)]=_0x5c90b7[_0x42a46c(0x25f)](_0xca37db[_0x2b7042]);else{const _0x168d6d=String(RegExp['$1']),_0x40066d=String(RegExp['$2'])[_0x42a46c(0x106)]()[_0x42a46c(0xda)]();let _0x289bb8,_0x157e30,_0x4ddee8;switch(_0x40066d){case _0x42a46c(0x26e):_0x289bb8=_0x4f3144[_0x206482]!==''?Number(_0x4f3144[_0x206482]):0x0;break;case _0x42a46c(0x196):_0x157e30=_0x4f3144[_0x206482]!==''?JSON[_0x42a46c(0x119)](_0x4f3144[_0x206482]):[],_0x289bb8=_0x157e30[_0x42a46c(0xd1)](_0x150dd3=>Number(_0x150dd3));break;case _0x42a46c(0x1ef):_0x289bb8=_0x4f3144[_0x206482]!==''?eval(_0x4f3144[_0x206482]):null;break;case _0x42a46c(0x277):_0x157e30=_0x4f3144[_0x206482]!==''?JSON['parse'](_0x4f3144[_0x206482]):[],_0x289bb8=_0x157e30['map'](_0x1575cf=>eval(_0x1575cf));break;case _0x42a46c(0x26f):_0x289bb8=_0x4f3144[_0x206482]!==''?JSON['parse'](_0x4f3144[_0x206482]):'';break;case'ARRAYJSON':_0x157e30=_0x4f3144[_0x206482]!==''?JSON['parse'](_0x4f3144[_0x206482]):[],_0x289bb8=_0x157e30[_0x42a46c(0xd1)](_0xf16fc4=>JSON[_0x42a46c(0x119)](_0xf16fc4));break;case _0x42a46c(0x207):_0x289bb8=_0x4f3144[_0x206482]!==''?new Function(JSON[_0x42a46c(0x119)](_0x4f3144[_0x206482])):new Function(_0x42a46c(0x109));break;case _0x42a46c(0x17f):_0x157e30=_0x4f3144[_0x206482]!==''?JSON['parse'](_0x4f3144[_0x206482]):[],_0x289bb8=_0x157e30[_0x42a46c(0xd1)](_0x39d7ba=>new Function(JSON['parse'](_0x39d7ba)));break;case'STR':_0x289bb8=_0x4f3144[_0x206482]!==''?String(_0x4f3144[_0x206482]):'';break;case'ARRAYSTR':_0x157e30=_0x4f3144[_0x206482]!==''?JSON['parse'](_0x4f3144[_0x206482]):[],_0x289bb8=_0x157e30[_0x42a46c(0xd1)](_0x3ff7d4=>String(_0x3ff7d4));break;case _0x42a46c(0x1e0):_0x4ddee8=_0x4f3144[_0x206482]!==''?JSON[_0x42a46c(0x119)](_0x4f3144[_0x206482]):{},_0x289bb8=VisuMZ[_0x42a46c(0x78)]({},_0x4ddee8);break;case _0x42a46c(0x1ab):_0x157e30=_0x4f3144[_0x206482]!==''?JSON[_0x42a46c(0x119)](_0x4f3144[_0x206482]):[],_0x289bb8=_0x157e30[_0x42a46c(0xd1)](_0x15cb9c=>VisuMZ[_0x42a46c(0x78)]({},JSON[_0x42a46c(0x119)](_0x15cb9c)));break;default:continue;}_0x289fe0[_0x168d6d]=_0x289bb8;}}}}return _0x289fe0;},(_0x4c848d=>{const _0x30fdc5=_0x3c9213,_0x3b4d54=_0x4c848d['name'];for(const _0x3faa65 of dependencies){if(!Imported[_0x3faa65]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x30fdc5(0x8b)](_0x3b4d54,_0x3faa65)),SceneManager[_0x30fdc5(0x22d)]();break;}}const _0x5df70e=_0x4c848d[_0x30fdc5(0x242)];if(_0x5df70e[_0x30fdc5(0x12b)](/\[Version[ ](.*?)\]/i)){const _0xd278c8=Number(RegExp['$1']);if(_0xd278c8!==VisuMZ[label][_0x30fdc5(0x288)]){if(_0x30fdc5(0x1b3)===_0x30fdc5(0x14e))return this[_0x30fdc5(0x24e)]()?this[_0x30fdc5(0x246)]/this[_0x30fdc5(0x251)]():0x0;else alert(_0x30fdc5(0x141)[_0x30fdc5(0x8b)](_0x3b4d54,_0xd278c8)),SceneManager[_0x30fdc5(0x22d)]();}}if(_0x5df70e[_0x30fdc5(0x12b)](/\[Tier[ ](\d+)\]/i)){const _0x120dbc=Number(RegExp['$1']);_0x120dbc<tier?(alert(_0x30fdc5(0x1dd)['format'](_0x3b4d54,_0x120dbc,tier)),SceneManager[_0x30fdc5(0x22d)]()):tier=Math[_0x30fdc5(0x1f1)](_0x120dbc,tier);}VisuMZ[_0x30fdc5(0x78)](VisuMZ[label][_0x30fdc5(0x81)],_0x4c848d[_0x30fdc5(0x250)]);})(pluginData),PluginManager[_0x3c9213(0x23f)](pluginData['name'],_0x3c9213(0x263),_0x5d36c5=>{const _0x32572c=_0x3c9213;VisuMZ[_0x32572c(0x78)](_0x5d36c5,_0x5d36c5);const _0x4869a2=_0x5d36c5['Actors'],_0x4a53b1=_0x5d36c5[_0x32572c(0xbb)];for(const _0x16ff08 of _0x4869a2){if(_0x32572c(0x258)!==_0x32572c(0x286)){const _0x28c2da=$gameActors[_0x32572c(0x7c)](_0x16ff08);if(!_0x28c2da)continue;_0x28c2da['_ctbTurnOrderGraphicType']=_0x32572c(0xa9),_0x28c2da[_0x32572c(0x172)]=_0x4a53b1;}else this[_0x32572c(0xb0)]();}}),PluginManager[_0x3c9213(0x23f)](pluginData['name'],'CtbTurnOrderActorFace',_0x38ce11=>{const _0x98a1f1=_0x3c9213;VisuMZ['ConvertParams'](_0x38ce11,_0x38ce11);const _0x50a0c0=_0x38ce11[_0x98a1f1(0x282)],_0x55680d=_0x38ce11['FaceName'],_0x2efaf5=_0x38ce11['FaceIndex'];for(const _0x340aed of _0x50a0c0){const _0x40d922=$gameActors['actor'](_0x340aed);if(!_0x40d922)continue;_0x40d922['_ctbTurnOrderGraphicType']=_0x98a1f1(0x17c),_0x40d922['_ctbTurnOrderFaceName']=_0x55680d,_0x40d922[_0x98a1f1(0x1f4)]=_0x2efaf5;}}),PluginManager[_0x3c9213(0x23f)](pluginData[_0x3c9213(0x18e)],_0x3c9213(0x8c),_0x235d5e=>{const _0x51ee72=_0x3c9213;VisuMZ[_0x51ee72(0x78)](_0x235d5e,_0x235d5e);const _0x504985=_0x235d5e[_0x51ee72(0x282)];for(const _0x4cec34 of _0x504985){const _0x488a77=$gameActors['actor'](_0x4cec34);if(!_0x488a77)continue;_0x488a77['clearTurnOrderCTBGraphics']();}}),PluginManager[_0x3c9213(0x23f)](pluginData['name'],'CtbTurnOrderEnemyIcon',_0xd6870a=>{const _0x23be2d=_0x3c9213;VisuMZ[_0x23be2d(0x78)](_0xd6870a,_0xd6870a);const _0x5c189f=_0xd6870a[_0x23be2d(0x230)],_0x46e166=_0xd6870a[_0x23be2d(0xbb)];for(const _0x1eb22e of _0x5c189f){const _0x13c6ff=$gameTroop[_0x23be2d(0x20d)]()[_0x1eb22e];if(!_0x13c6ff)continue;_0x13c6ff[_0x23be2d(0x179)]=_0x23be2d(0xa9),_0x13c6ff['_ctbTurnOrderIconIndex']=_0x46e166;}}),PluginManager[_0x3c9213(0x23f)](pluginData[_0x3c9213(0x18e)],_0x3c9213(0x1f0),_0xca2f75=>{const _0x493d88=_0x3c9213;VisuMZ[_0x493d88(0x78)](_0xca2f75,_0xca2f75);const _0x320c9b=_0xca2f75[_0x493d88(0x230)],_0x2d8e3b=_0xca2f75[_0x493d88(0xc4)],_0x42bcf7=_0xca2f75[_0x493d88(0xc5)];for(const _0x1d6e1f of _0x320c9b){const _0x59f552=$gameTroop[_0x493d88(0x20d)]()[_0x1d6e1f];if(!_0x59f552)continue;_0x59f552[_0x493d88(0x179)]=_0x493d88(0x17c),_0x59f552['_ctbTurnOrderFaceName']=_0x2d8e3b,_0x59f552['_ctbTurnOrderFaceIndex']=_0x42bcf7;}}),PluginManager[_0x3c9213(0x23f)](pluginData[_0x3c9213(0x18e)],_0x3c9213(0x135),_0x5b6e15=>{const _0x2aac84=_0x3c9213;VisuMZ[_0x2aac84(0x78)](_0x5b6e15,_0x5b6e15);const _0x17fe23=_0x5b6e15[_0x2aac84(0x230)];for(const _0x244eec of _0x17fe23){const _0x327d65=$gameTroop[_0x2aac84(0x20d)]()[_0x244eec];if(!_0x327d65)continue;_0x327d65[_0x2aac84(0x137)]();}}),PluginManager[_0x3c9213(0x23f)](pluginData[_0x3c9213(0x18e)],_0x3c9213(0x117),_0x2146bb=>{const _0x2acca1=_0x3c9213;VisuMZ['ConvertParams'](_0x2146bb,_0x2146bb);const _0x303ece=_0x2146bb[_0x2acca1(0x1f9)];$gameSystem[_0x2acca1(0xdb)](_0x303ece);}),VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0xe9)]=Scene_Boot[_0x3c9213(0x1ba)][_0x3c9213(0x1e7)],Scene_Boot[_0x3c9213(0x1ba)]['onDatabaseLoaded']=function(){const _0x442cd6=_0x3c9213;this['process_VisuMZ_BattleSystemCTB_CreateRegExp'](),VisuMZ[_0x442cd6(0x1ce)][_0x442cd6(0xe9)][_0x442cd6(0x1ad)](this),this[_0x442cd6(0x131)]();},VisuMZ[_0x3c9213(0x1ce)]['RegExp']={},Scene_Boot[_0x3c9213(0x1ba)][_0x3c9213(0xe2)]=function(){const _0x117efd=_0x3c9213,_0x2628b3=VisuMZ[_0x117efd(0x1ce)][_0x117efd(0x102)],_0x2194d9=_0x117efd(0x162),_0x20b95a=[_0x117efd(0xde),_0x117efd(0x93),_0x117efd(0x1fb)];for(const _0x41754f of _0x20b95a){const _0x18f519=_0x2194d9[_0x117efd(0x8b)](_0x41754f[_0x117efd(0x106)]()[_0x117efd(0xda)](),_0x117efd(0x8e),'(?:GAUGE|TIME|SPEED)'),_0x1cc94f=new RegExp(_0x18f519,'i');VisuMZ[_0x117efd(0x1ce)][_0x117efd(0x102)][_0x41754f]=_0x1cc94f;}VisuMZ[_0x117efd(0x1ce)][_0x117efd(0x102)][_0x117efd(0x16e)]=/<JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>\s*([\s\S]*)\s*<\/JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>/i;},Scene_Boot[_0x3c9213(0x1ba)][_0x3c9213(0x131)]=function(){const _0x595eea=_0x3c9213;if(VisuMZ['ParseAllNotetags'])return;const _0x3fa911=$dataSkills[_0x595eea(0x110)]($dataItems);for(const _0x18f31d of _0x3fa911){if(_0x595eea(0x1f6)!==_0x595eea(0x1f6))return _0x566d57['status']&&_0x427b37[_0x595eea(0x242)]['includes']('['+_0x4f261c+']');else{if(!_0x18f31d)continue;VisuMZ[_0x595eea(0x1ce)][_0x595eea(0xba)](_0x18f31d);}}},VisuMZ['BattleSystemCTB'][_0x3c9213(0x280)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x3c9213(0x280)]=function(_0x2f2b59){const _0x4f8767=_0x3c9213;VisuMZ[_0x4f8767(0x1ce)][_0x4f8767(0x280)][_0x4f8767(0x1ad)](this,_0x2f2b59),VisuMZ['BattleSystemCTB']['Parse_Notetags_CreateJS'](_0x2f2b59);},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x1a7)]=VisuMZ[_0x3c9213(0x1a7)],VisuMZ[_0x3c9213(0x1a7)]=function(_0x1eddd0){const _0xdc6d0d=_0x3c9213;VisuMZ['BattleSystemCTB'][_0xdc6d0d(0x1a7)][_0xdc6d0d(0x1ad)](this,_0x1eddd0),VisuMZ[_0xdc6d0d(0x1ce)][_0xdc6d0d(0xba)](_0x1eddd0);},VisuMZ['BattleSystemCTB'][_0x3c9213(0xba)]=function(_0x15abfb){const _0x194f17=_0x3c9213,_0x37eb68=[_0x194f17(0xde),_0x194f17(0x93),_0x194f17(0x1fb)];for(const _0x3c34aa of _0x37eb68){'REYDg'!=='REYDg'?this[_0x194f17(0xff)](0xff):VisuMZ[_0x194f17(0x1ce)][_0x194f17(0x268)](_0x15abfb,_0x3c34aa);}VisuMZ[_0x194f17(0x1ce)]['createOrderJS'](_0x15abfb,_0x194f17(0x9f));},VisuMZ[_0x3c9213(0x1ce)]['JS']={},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x268)]=function(_0x4a648c,_0x94b367){const _0x58b145=_0x3c9213,_0x53c7e2=_0x4a648c[_0x58b145(0x161)];if(_0x53c7e2[_0x58b145(0x12b)](VisuMZ[_0x58b145(0x1ce)][_0x58b145(0x102)][_0x94b367])){const _0x144036=String(RegExp['$1']),_0x3fa8b9=_0x58b145(0x178)[_0x58b145(0x8b)](_0x144036,_0x94b367),_0x3e3fde=VisuMZ[_0x58b145(0x1ce)][_0x58b145(0x1ed)](_0x4a648c,_0x94b367);VisuMZ[_0x58b145(0x1ce)]['JS'][_0x3e3fde]=new Function(_0x3fa8b9);}},VisuMZ[_0x3c9213(0x1ce)]['createOrderJS']=function(_0x69d1d,_0x2c5e37){const _0x54a609=_0x3c9213,_0x2951fc=_0x69d1d[_0x54a609(0x161)];if(_0x2951fc['match'](VisuMZ[_0x54a609(0x1ce)][_0x54a609(0x102)][_0x54a609(0x16e)])){const _0x756000=String(RegExp['$1']),_0x32b350=_0x54a609(0xf0)[_0x54a609(0x8b)](_0x756000,_0x2c5e37),_0x478a45=VisuMZ[_0x54a609(0x1ce)][_0x54a609(0x1ed)](_0x69d1d,_0x2c5e37);VisuMZ['BattleSystemCTB']['JS'][_0x478a45]=new Function(_0x32b350);}},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x1ed)]=function(_0x2bdada,_0x138b55){const _0x558d01=_0x3c9213;if(VisuMZ[_0x558d01(0x1ed)])return VisuMZ[_0x558d01(0x1ed)](_0x2bdada,_0x138b55);let _0x15ecab='';if($dataActors['includes'](_0x2bdada))_0x15ecab=_0x558d01(0x194)[_0x558d01(0x8b)](_0x2bdada['id'],_0x138b55);if($dataClasses[_0x558d01(0x105)](_0x2bdada))_0x15ecab='Class-%1-%2'[_0x558d01(0x8b)](_0x2bdada['id'],_0x138b55);if($dataSkills[_0x558d01(0x105)](_0x2bdada))_0x15ecab='Skill-%1-%2'[_0x558d01(0x8b)](_0x2bdada['id'],_0x138b55);if($dataItems[_0x558d01(0x105)](_0x2bdada))_0x15ecab=_0x558d01(0xbc)[_0x558d01(0x8b)](_0x2bdada['id'],_0x138b55);if($dataWeapons[_0x558d01(0x105)](_0x2bdada))_0x15ecab=_0x558d01(0x1b4)[_0x558d01(0x8b)](_0x2bdada['id'],_0x138b55);if($dataArmors[_0x558d01(0x105)](_0x2bdada))_0x15ecab=_0x558d01(0x1d4)[_0x558d01(0x8b)](_0x2bdada['id'],_0x138b55);if($dataEnemies[_0x558d01(0x105)](_0x2bdada))_0x15ecab=_0x558d01(0x8f)['format'](_0x2bdada['id'],_0x138b55);if($dataStates[_0x558d01(0x105)](_0x2bdada))_0x15ecab=_0x558d01(0x11b)[_0x558d01(0x8b)](_0x2bdada['id'],_0x138b55);return _0x15ecab;},ImageManager[_0x3c9213(0x1a0)]=ImageManager['svActorHorzCells']||0x9,ImageManager['svActorVertCells']=ImageManager[_0x3c9213(0x20e)]||0x6,VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x14d)]=BattleManager[_0x3c9213(0x115)],BattleManager[_0x3c9213(0x115)]=function(){const _0x35f1b2=_0x3c9213;if(this[_0x35f1b2(0x1c4)]())return _0x35f1b2(0x90);return VisuMZ[_0x35f1b2(0x1ce)]['BattleManager_battleSys']['call'](this);},BattleManager[_0x3c9213(0x1c4)]=function(){const _0xc72a0d=_0x3c9213;return $gameSystem[_0xc72a0d(0x159)]()==='CTB';},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x181)]=BattleManager['isTpb'],BattleManager['isTpb']=function(){const _0x43c8b7=_0x3c9213;if(this['isCTB']())return!![];return VisuMZ[_0x43c8b7(0x1ce)][_0x43c8b7(0x181)]['call'](this);},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x201)]=BattleManager[_0x3c9213(0x265)],BattleManager['isActiveTpb']=function(){const _0x2b2936=_0x3c9213;if(this[_0x2b2936(0x1c4)]())return![];return VisuMZ['BattleSystemCTB']['BattleManager_isActiveTpb'][_0x2b2936(0x1ad)](this);},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0xca)]=BattleManager[_0x3c9213(0x9b)],BattleManager[_0x3c9213(0x9b)]=function(_0x1b46b5){const _0x4d0de1=_0x3c9213;this[_0x4d0de1(0x1c4)]()?_0x4d0de1(0x1aa)!==_0x4d0de1(0x1aa)?_0x8a72e9[_0x4d0de1(0x1ce)][_0x4d0de1(0x223)][_0x4d0de1(0x1ad)](this):this[_0x4d0de1(0x1fd)](_0x1b46b5):VisuMZ[_0x4d0de1(0x1ce)][_0x4d0de1(0xca)][_0x4d0de1(0x1ad)](this,_0x1b46b5);},BattleManager[_0x3c9213(0x1fd)]=function(_0x5c5d13){const _0x54985b=_0x3c9213;return VisuMZ['BattleSystemCTB'][_0x54985b(0xca)]['call'](this,_0x5c5d13);},VisuMZ['BattleSystemCTB'][_0x3c9213(0x223)]=BattleManager['processTurn'],BattleManager[_0x3c9213(0x225)]=function(){const _0xae6acd=_0x3c9213;this[_0xae6acd(0x1c4)]()?this[_0xae6acd(0xdf)]():VisuMZ[_0xae6acd(0x1ce)][_0xae6acd(0x223)][_0xae6acd(0x1ad)](this);},BattleManager[_0x3c9213(0xdf)]=function(){const _0x1a04a6=_0x3c9213,_0x521361=this[_0x1a04a6(0x97)],_0x590b54=_0x521361[_0x1a04a6(0x1b5)]();if(_0x590b54){if('uzIfe'===_0x1a04a6(0x11f)){_0x590b54[_0x1a04a6(0x165)]();if(_0x590b54[_0x1a04a6(0x98)]()){if('OQukB'===_0x1a04a6(0x92))this[_0x1a04a6(0x1eb)]();else{if(!_0x42a8a9['isCTB']())return;if(!_0x5c5a63[_0x1a04a6(0x15d)]())return;if(this===_0x1336b8[_0x1a04a6(0x7c)]())return;if(this===_0x2c992a[_0x1a04a6(0x97)])return;const _0x4c866d=this[_0x1a04a6(0x279)]();if(_0x4c866d<0x0)return;this[_0x1a04a6(0xb9)](_0x4c866d+_0x363108);}}_0x521361[_0x1a04a6(0x25e)]();}else this['applyCTBPenalty']();}else _0x521361[_0x1a04a6(0x218)](0x0),this[_0x1a04a6(0x19c)](),this[_0x1a04a6(0x97)]=null;},BattleManager[_0x3c9213(0x1c5)]=function(){const _0x355ebb=_0x3c9213;if(this['_subject'])return!![];if(this[_0x355ebb(0x10e)]!==_0x355ebb(0x200))return!![];if(this[_0x355ebb(0x18f)])return![];const _0x4e710b=this['allBattleMembers']()[_0x355ebb(0x267)](_0x2b3046=>_0x2b3046&&_0x2b3046[_0x355ebb(0x1a1)]());return _0x4e710b[_0x355ebb(0x168)](_0x88b790=>_0x88b790[_0x355ebb(0x274)]());},Game_Battler[_0x3c9213(0x1ba)]['isPassCTB']=function(){const _0x495818=_0x3c9213;if(this[_0x495818(0x16c)]())return!![];if(this[_0x495818(0x27e)]())return!![];if(this[_0x495818(0x157)]())return!![];return![];},BattleManager['checkCtbAntiSoftlock']=function(){const _0x4adc5e=_0x3c9213;let _0x2f66be=VisuMZ[_0x4adc5e(0x1ce)]['Settings'][_0x4adc5e(0xc7)]['DeviceFriendly']?0x1e:0xa;if(this['isAnyBattlerReadyCTB']()&&this[_0x4adc5e(0x145)]()){if(_0x4adc5e(0x1e9)!==_0x4adc5e(0x212)){this[_0x4adc5e(0x103)]=this[_0x4adc5e(0x103)]||0x0,this[_0x4adc5e(0x103)]++;if(this[_0x4adc5e(0x103)]>=_0x2f66be){if(_0x4adc5e(0x72)===_0x4adc5e(0x72))this[_0x4adc5e(0x100)]();else return this['processUpdateGraphic']();}}else this['_tpbChargeTime']=0x1-_0x4f0834;}else this[_0x4adc5e(0x103)]=0x0;},BattleManager[_0x3c9213(0x145)]=function(){const _0x2b0e7a=_0x3c9213;if(this['_subject'])return![];if(this['_phase']!==_0x2b0e7a(0x200))return![];if(this[_0x2b0e7a(0x1bd)]())return![];return!![];},BattleManager[_0x3c9213(0x100)]=function(){const _0x3d0cb6=_0x3c9213;$gameTemp[_0x3d0cb6(0x1e8)]()&&this[_0x3d0cb6(0x103)]>=0x14&&console[_0x3d0cb6(0xd0)](_0x3d0cb6(0x1b0),this['_anti_CTB_SoftlockCount']);this['_subject']=null,this[_0x3d0cb6(0x10e)]=_0x3d0cb6(0x200),this[_0x3d0cb6(0x252)]=![],this[_0x3d0cb6(0x134)]=!![];for(const _0x211f27 of this[_0x3d0cb6(0x7f)]()){if(!_0x211f27)continue;if(_0x211f27[_0x3d0cb6(0x20f)]()){_0x211f27[_0x3d0cb6(0x114)](_0x3d0cb6(0x163)),_0x211f27[_0x3d0cb6(0x289)]='charging';const _0x3fa25b=_0x211f27[_0x3d0cb6(0x9a)],_0x11ab9d=_0x211f27[_0x3d0cb6(0xe7)]||0x0;_0x211f27[_0x3d0cb6(0x21f)](![]),_0x211f27[_0x3d0cb6(0x9a)]=_0x3fa25b,_0x211f27[_0x3d0cb6(0xe7)]=Math[_0x3d0cb6(0x255)](_0x11ab9d,0.99),_0x211f27['updateTpb']();}}if(this['_anti_CTB_SoftlockCount']===0xb4){if(_0x3d0cb6(0x1b2)===_0x3d0cb6(0x1b2))$gameParty[_0x3d0cb6(0x21b)](),$gameParty[_0x3d0cb6(0x21b)]['call']($gameTroop);else{if(this[_0x3d0cb6(0x97)])return![];if(this['_phase']!==_0x3d0cb6(0x200))return![];if(this[_0x3d0cb6(0x1bd)]())return![];return!![];}}if(this['_anti_CTB_SoftlockCount']===0x12c){if(_0x3d0cb6(0x243)===_0x3d0cb6(0x82)){const _0x505bd2=this[_0x3d0cb6(0x7c)]()['note'];if(_0x505bd2[_0x3d0cb6(0x12b)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x3d0cb6(0x17c);else{if(_0x505bd2['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return _0x186e70[_0x3d0cb6(0x81)][_0x3d0cb6(0x22a)];}else for(const _0x3acc99 of this[_0x3d0cb6(0x7f)]()){if(!_0x3acc99)continue;if(_0x3acc99[_0x3d0cb6(0x256)]())continue;_0x3acc99[_0x3d0cb6(0x1b6)]();}}if(this[_0x3d0cb6(0x103)]>=0x258){BattleManager[_0x3d0cb6(0x10f)]();if($gameTemp[_0x3d0cb6(0x1e8)]()){if('sqxcw'!==_0x3d0cb6(0x174))console[_0x3d0cb6(0xd0)]('Aborting\x20Battle.\x20Softlock\x20cannot\x20be\x20fixed.');else{const _0x3cef13=this['_subject'],_0x55e21f=_0x3cef13[_0x3d0cb6(0x1b5)]();_0x55e21f?(_0x55e21f[_0x3d0cb6(0x165)](),_0x55e21f[_0x3d0cb6(0x98)]()&&this['startAction'](),_0x3cef13[_0x3d0cb6(0x25e)]()):(_0x3cef13[_0x3d0cb6(0x218)](0x0),this[_0x3d0cb6(0x19c)](),this[_0x3d0cb6(0x97)]=null);}}}},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x20c)]=BattleManager['updateAllTpbBattlers'],BattleManager[_0x3c9213(0x132)]=function(){const _0x4ad426=_0x3c9213;if(this['isCTB']())this[_0x4ad426(0xb0)]();else{if('ibnUI'!==_0x4ad426(0x24f))VisuMZ[_0x4ad426(0x1ce)][_0x4ad426(0x20c)][_0x4ad426(0x1ad)](this);else return _0xa4fb13['BattleSystemCTB'][_0x4ad426(0x81)][_0x4ad426(0xc7)][_0x4ad426(0x121)][_0x4ad426(0x1ad)](this,this);}},BattleManager[_0x3c9213(0xb0)]=function(){const _0x1a5671=_0x3c9213,_0x4a6df2=this[_0x1a5671(0x7f)]();_0x4a6df2[_0x1a5671(0x1d5)]((_0x41703a,_0x4e5557)=>{const _0xa186c2=_0x1a5671;return _0x41703a[_0xa186c2(0x13c)](0x1)-_0x4e5557[_0xa186c2(0x13c)](0x1);});for(const _0x30edee of _0x4a6df2){this['updateTpbBattler'](_0x30edee);}},VisuMZ['BattleSystemCTB'][_0x3c9213(0x19e)]=BattleManager['startBattle'],BattleManager[_0x3c9213(0x10a)]=function(){const _0x1ff658=_0x3c9213;VisuMZ[_0x1ff658(0x1ce)][_0x1ff658(0x19e)][_0x1ff658(0x1ad)](this),this[_0x1ff658(0x273)](!![]);},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x266)]=BattleManager[_0x3c9213(0x19c)],BattleManager[_0x3c9213(0x19c)]=function(){const _0x2826ec=_0x3c9213;this[_0x2826ec(0x210)](),VisuMZ[_0x2826ec(0x1ce)][_0x2826ec(0x266)]['call'](this),this[_0x2826ec(0x177)]();},BattleManager[_0x3c9213(0x210)]=function(){const _0x24d56f=_0x3c9213;if(!this['isCTB']())return;this[_0x24d56f(0x97)]&&this[_0x24d56f(0x97)]['numActions']()<=0x0&&(this[_0x24d56f(0x28e)](),this['_subject']['setActionState'](_0x24d56f(0x163)));},BattleManager[_0x3c9213(0x177)]=function(){const _0x50cd01=_0x3c9213;if(!this['isCTB']())return;if(this['_subject']&&$gameTemp['isCommonEventReserved']()){this[_0x50cd01(0x97)]['_tpbState']='ready',this[_0x50cd01(0x97)][_0x50cd01(0x28b)]='acting';return;}this[_0x50cd01(0x273)](),this[_0x50cd01(0x97)]&&this[_0x50cd01(0x225)]();},VisuMZ['BattleSystemCTB'][_0x3c9213(0xd9)]=BattleManager['startActorInput'],BattleManager[_0x3c9213(0x23d)]=function(){const _0x5e28e2=_0x3c9213;this[_0x5e28e2(0x273)](),VisuMZ[_0x5e28e2(0x1ce)][_0x5e28e2(0xd9)][_0x5e28e2(0x1ad)](this);},BattleManager[_0x3c9213(0x273)]=function(_0x267785){const _0x2928e9=_0x3c9213;if(!this[_0x2928e9(0x1c4)]())return;const _0x5e3f26=SceneManager['_scene']['_ctbTurnOrderWindow'];if(!_0x5e3f26)return;_0x5e3f26[_0x2928e9(0x283)](_0x267785);},BattleManager[_0x3c9213(0x28e)]=function(){const _0x4adc0d=_0x3c9213;if(!this[_0x4adc0d(0x1c4)]())return;const _0x436bdf=SceneManager['_scene']['_ctbTurnOrderWindow'];if(!_0x436bdf)return;_0x436bdf[_0x4adc0d(0xe6)](this[_0x4adc0d(0x97)]);},BattleManager[_0x3c9213(0xf7)]=function(){const _0x59f445=_0x3c9213,_0x4f482a=this['allBattleMembers']()[_0x59f445(0xd1)](_0x54e4dd=>String([_0x54e4dd[_0x59f445(0x18e)](),_0x59f445(0x142)+_0x54e4dd['ctbTicksToGoal'](0x1)]));console[_0x59f445(0xd0)](_0x4f482a);},VisuMZ[_0x3c9213(0x1ce)]['BattleManager_updateTpb']=BattleManager[_0x3c9213(0x26b)],BattleManager[_0x3c9213(0x26b)]=function(){const _0xe05c03=_0x3c9213;this['isCTB']()?_0xe05c03(0x278)===_0xe05c03(0x7b)?_0xf43aad[_0xe05c03(0x1c4)]()?this[_0xe05c03(0x1c2)]():_0x1e59a1[_0xe05c03(0x1ce)][_0xe05c03(0x216)]['call'](this):this['updateTpbCtb']():VisuMZ[_0xe05c03(0x1ce)][_0xe05c03(0xf9)][_0xe05c03(0x1ad)](this);},BattleManager['updateTpbCtb']=function(){const _0x518bb3=_0x3c9213,_0x3e2fd7=this['allBattleMembers']();_0x3e2fd7[_0x518bb3(0x1d5)]((_0x57c12a,_0x38e216)=>{const _0x1b3397=_0x518bb3;if(_0x1b3397(0x1db)===_0x1b3397(0x1b8)){if(this[_0x1b3397(0x1c4)]())return![];return _0x55984a[_0x1b3397(0x1ce)][_0x1b3397(0x201)][_0x1b3397(0x1ad)](this);}else return _0x57c12a[_0x1b3397(0x13c)](0x1)-_0x38e216[_0x1b3397(0x13c)](0x1);});for(const _0x19c97f of _0x3e2fd7){_0x19c97f[_0x518bb3(0x26b)]();}this[_0x518bb3(0x132)](),this['checkTpbTurnEnd']();},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x148)]=BattleManager['updateTpbInput'],BattleManager[_0x3c9213(0x1af)]=function(){const _0x54902c=_0x3c9213;if(this['isCTB']()){if(_0x54902c(0x261)!==_0x54902c(0xdc)){const _0x3a8638=this[_0x54902c(0x7f)]();_0x3a8638['sort']((_0x4e1d31,_0x159a3f)=>{const _0x1427f5=_0x54902c;if('lvLoV'!==_0x1427f5(0x1a3))return _0x4e1d31[_0x1427f5(0x13c)](0x1)-_0x159a3f['ctbTicksToGoal'](0x1);else _0x27731c=_0x213641[_0x1427f5(0x1f1)](_0x326c39,_0x3c9702);});if(!_0x3a8638[0x0][_0x54902c(0x26a)]())return;}else return this[_0x54902c(0x22e)]();}VisuMZ[_0x54902c(0x1ce)][_0x54902c(0x148)]['call'](this);},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x1de)]=Game_System[_0x3c9213(0x1ba)][_0x3c9213(0x214)],Game_System[_0x3c9213(0x1ba)][_0x3c9213(0x214)]=function(){const _0x18bd70=_0x3c9213;VisuMZ[_0x18bd70(0x1ce)]['Game_System_initialize'][_0x18bd70(0x1ad)](this),this['initBattleSystemCTB']();},Game_System[_0x3c9213(0x1ba)][_0x3c9213(0x1d2)]=function(){const _0x3b85b3=_0x3c9213;this[_0x3b85b3(0xf8)]=!![];},Game_System['prototype'][_0x3c9213(0xcb)]=function(){const _0xa05fd2=_0x3c9213;return this[_0xa05fd2(0xf8)]===undefined&&this['initBattleSystemCTB'](),this[_0xa05fd2(0xf8)];},Game_System['prototype'][_0x3c9213(0xdb)]=function(_0x3cbfa5){const _0x28db72=_0x3c9213;this[_0x28db72(0xf8)]===undefined&&this[_0x28db72(0x1d2)](),this[_0x28db72(0xf8)]=_0x3cbfa5;},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0xb5)]=Game_Action[_0x3c9213(0x1ba)][_0x3c9213(0x170)],Game_Action[_0x3c9213(0x1ba)]['applyItemUserEffect']=function(_0x19674c){const _0x2795fd=_0x3c9213;VisuMZ[_0x2795fd(0x1ce)]['Game_Action_applyItemUserEffect'][_0x2795fd(0x1ad)](this,_0x19674c),this[_0x2795fd(0x180)](_0x19674c);},Game_Action['prototype']['applyBattleSystemCTBUserEffect']=function(_0x4788d3){const _0x4f574f=_0x3c9213;if(!SceneManager[_0x4f574f(0x15d)]())return;if(!BattleManager['isCTB']())return;if(this[_0x4f574f(0x15e)]())this[_0x4f574f(0x17e)](_0x4788d3);},Game_Action[_0x3c9213(0x1ba)][_0x3c9213(0x17e)]=function(_0x96f6ff){const _0x27b0a2=_0x3c9213,_0x51286f=this[_0x27b0a2(0x15e)]()[_0x27b0a2(0x161)];if(_0x96f6ff['isCtbChargingState']()){if('MUiDj'===_0x27b0a2(0x1cb)){const _0x311fca=VisuMZ[_0x27b0a2(0x1ce)]['createKeyJS'](this['item'](),_0x27b0a2(0xde));if(VisuMZ[_0x27b0a2(0x1ce)]['JS'][_0x311fca]){if(_0x27b0a2(0x95)!==_0x27b0a2(0x1bf)){const _0x329360=VisuMZ[_0x27b0a2(0x1ce)]['JS'][_0x311fca][_0x27b0a2(0x1ad)](this,this['subject'](),_0x96f6ff);_0x96f6ff[_0x27b0a2(0x233)](_0x329360);}else _0x393ce3[_0x27b0a2(0x1ba)][_0x27b0a2(0x198)][_0x27b0a2(0x1ad)](this),this['checkPosition'](),this[_0x27b0a2(0x136)](),this['checkOpacity'](),this[_0x27b0a2(0x272)](),this[_0x27b0a2(0x264)](),this['updateGraphicHue'](),this[_0x27b0a2(0x19b)](),this[_0x27b0a2(0x293)]();}_0x51286f[_0x27b0a2(0x12b)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x96f6ff[_0x27b0a2(0x233)](Number(RegExp['$1'])*0.01),_0x51286f['match'](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&(_0x27b0a2(0x25c)!==_0x27b0a2(0x220)?_0x96f6ff[_0x27b0a2(0x1bc)](Number(RegExp['$1'])*0.01):(this['_graphicSv']=_0x47b94c[_0x27b0a2(0x18a)](),_0x43940f=_0xd4f962['loadSvActor'](this[_0x27b0a2(0x127)]),_0x4973d4[_0x27b0a2(0x12e)](this[_0x27b0a2(0x8d)][_0x27b0a2(0x18b)](this,_0x474388))));}else{const _0xb865a2=_0x205b30[_0x27b0a2(0x1ce)]['JS'][_0x19d69d][_0x27b0a2(0x1ad)](this,this[_0x27b0a2(0xb3)](),_0x1fc5a1);_0x51cacb[_0x27b0a2(0xb9)](_0xb865a2);}}else{if(_0x96f6ff[_0x27b0a2(0x24e)]()){if('EGkHL'===_0x27b0a2(0x1f5)){const _0x556f63=this[_0x27b0a2(0x7c)]()[_0x27b0a2(0x161)];if(_0x556f63[_0x27b0a2(0x12b)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x20df5f(_0x27ac17['$1']);return _0x5a9447['Settings'][_0x27b0a2(0x231)];}else{const _0x27e87d=VisuMZ[_0x27b0a2(0x1ce)][_0x27b0a2(0x1ed)](this['item'](),_0x27b0a2(0x93));if(VisuMZ['BattleSystemCTB']['JS'][_0x27e87d]){const _0x90c55=VisuMZ[_0x27b0a2(0x1ce)]['JS'][_0x27e87d][_0x27b0a2(0x1ad)](this,this[_0x27b0a2(0xb3)](),_0x96f6ff);_0x96f6ff[_0x27b0a2(0x228)](_0x90c55);}_0x51286f[_0x27b0a2(0x12b)](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x96f6ff['setCtbCastTime'](Number(RegExp['$1'])*0.01);if(_0x51286f[_0x27b0a2(0x12b)](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)){if(_0x27b0a2(0x87)!=='jSpfq')_0x96f6ff[_0x27b0a2(0x1df)](Number(RegExp['$1'])*0.01);else{const _0x5be50e=this[_0x27b0a2(0x251)]();this[_0x27b0a2(0x246)]=_0x5be50e*_0x11d0c9;}}}}}const _0x5324d8=VisuMZ[_0x27b0a2(0x1ce)]['createKeyJS'](this[_0x27b0a2(0x15e)](),_0x27b0a2(0x9f));if(VisuMZ['BattleSystemCTB']['JS'][_0x5324d8]){const _0x238824=VisuMZ[_0x27b0a2(0x1ce)]['JS'][_0x5324d8][_0x27b0a2(0x1ad)](this,this['subject'](),_0x96f6ff);_0x96f6ff[_0x27b0a2(0xb9)](_0x238824);}_0x51286f['match'](/<(?:CTB) (?:SET|MAKE|EXACT) ORDER:[ ](\d+)>/i)&&('JLmDw'===_0x27b0a2(0xf2)?this[_0x27b0a2(0xf8)]=!![]:_0x96f6ff[_0x27b0a2(0xb9)](Number(RegExp['$1']))),_0x51286f[_0x27b0a2(0x12b)](/<(?:CTB) (?:CHANGE|DELAY|RUSH|SHIFT) ORDER:[ ]([\+\-]\d+)>/i)&&(_0x27b0a2(0xb8)==='GpdbI'?this['initialize'](...arguments):_0x96f6ff['changeTurnOrderByCTB'](Number(RegExp['$1'])));},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x232)]=Game_Action[_0x3c9213(0x1ba)][_0x3c9213(0xee)],Game_Action[_0x3c9213(0x1ba)][_0x3c9213(0xee)]=function(){const _0x170dc3=_0x3c9213;VisuMZ[_0x170dc3(0x1ce)][_0x170dc3(0x232)][_0x170dc3(0x1ad)](this),this[_0x170dc3(0x11a)]();},Game_Action[_0x3c9213(0x1ba)][_0x3c9213(0x11a)]=function(){const _0x11b380=_0x3c9213;if(!this['item']())return;if(!BattleManager[_0x11b380(0x1c4)]())return;const _0x3c32f7=this[_0x11b380(0x15e)]()[_0x11b380(0x161)];let _0x4ef9d8=0x0;this[_0x11b380(0x1b1)]&&('zbTou'===_0x11b380(0x28d)?_0x4ef9d8=this[_0x11b380(0xb3)]()[_0x11b380(0xe7)]:this[_0x11b380(0x164)]=_0x11b380(0x17c));const _0x10b548=VisuMZ[_0x11b380(0x1ce)]['createKeyJS'](this[_0x11b380(0x15e)](),_0x11b380(0x1fb));if(VisuMZ['BattleSystemCTB']['JS'][_0x10b548]){if(_0x11b380(0x290)!==_0x11b380(0xa0))_0x4ef9d8=VisuMZ[_0x11b380(0x1ce)]['JS'][_0x10b548][_0x11b380(0x1ad)](this,this[_0x11b380(0xb3)](),this[_0x11b380(0xb3)]());else return _0x40131a[_0x11b380(0x81)][_0x11b380(0x14a)];}let _0x289f36=this[_0x11b380(0x15e)]()[_0x11b380(0x1ec)]>0x0?this[_0x11b380(0x15e)]()[_0x11b380(0x1ec)]:0x0;if(this[_0x11b380(0x192)]())_0x289f36+=this[_0x11b380(0xb3)]()['attackSpeed']();_0x4ef9d8+=(_0x289f36/0xfa0)[_0x11b380(0x85)](0x0,0x1);_0x3c32f7['match'](/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x4ef9d8=Number(RegExp['$1'])*0.01);const _0x4aafa9=this['subject']()[_0x11b380(0xa4)]()[_0x11b380(0x110)](this[_0x11b380(0xb3)]()[_0x11b380(0xfc)]()),_0x1387b3=/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x557c88=_0x4aafa9['map'](_0x198ccc=>_0x198ccc&&_0x198ccc[_0x11b380(0x161)][_0x11b380(0x12b)](_0x1387b3)?Number(RegExp['$1'])*0.01:0x0);_0x4ef9d8=_0x557c88['reduce']((_0x502c06,_0x384d0b)=>_0x502c06+_0x384d0b,_0x4ef9d8),this[_0x11b380(0xb3)]()[_0x11b380(0x218)](_0x4ef9d8);},Game_BattlerBase['prototype'][_0x3c9213(0x233)]=function(_0x1ec830){const _0x39dd7e=_0x3c9213;this[_0x39dd7e(0xe7)]=_0x1ec830;},Game_BattlerBase['prototype']['changeCtbChargeTime']=function(_0x84a0c3){const _0x4c3e03=_0x3c9213;this[_0x4c3e03(0x233)](this[_0x4c3e03(0xe7)]+_0x84a0c3);},Game_BattlerBase[_0x3c9213(0x1ba)][_0x3c9213(0x228)]=function(_0x3f3e79){const _0x540132=_0x3c9213,_0x25609b=this[_0x540132(0x251)]();this['_tpbCastTime']=_0x25609b*_0x3f3e79;},Game_BattlerBase['prototype']['changeCtbCastTime']=function(_0x351e3f){const _0x18dafe=_0x3c9213,_0x315be4=this[_0x18dafe(0x251)](),_0x308013=_0x315be4*_0x351e3f;this['_tpbCastTime']=this[_0x18dafe(0x246)]+_0x308013;},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x22b)]=Game_BattlerBase[_0x3c9213(0x1ba)]['appear'],Game_BattlerBase[_0x3c9213(0x1ba)]['appear']=function(){const _0x10b896=_0x3c9213;VisuMZ['BattleSystemCTB']['Game_BattlerBase_appear'][_0x10b896(0x1ad)](this),BattleManager['updateTurnOrderCTB']();},VisuMZ['BattleSystemCTB'][_0x3c9213(0x287)]=Game_BattlerBase[_0x3c9213(0x1ba)]['hide'],Game_BattlerBase['prototype']['hide']=function(){const _0x5b4fe1=_0x3c9213;VisuMZ[_0x5b4fe1(0x1ce)]['Game_BattlerBase_hide'][_0x5b4fe1(0x1ad)](this),BattleManager['updateTurnOrderCTB']();},Game_BattlerBase[_0x3c9213(0x1ba)][_0x3c9213(0x137)]=function(){const _0x1381a1=_0x3c9213;delete this[_0x1381a1(0x179)],delete this[_0x1381a1(0x12c)],delete this[_0x1381a1(0x1f4)],delete this[_0x1381a1(0x172)];},Game_BattlerBase[_0x3c9213(0x1ba)][_0x3c9213(0x259)]=function(){const _0x363dc1=_0x3c9213;return this[_0x363dc1(0x179)]===undefined&&(this['_ctbTurnOrderGraphicType']=this[_0x363dc1(0x143)]()),this[_0x363dc1(0x179)];},Game_BattlerBase[_0x3c9213(0x1ba)][_0x3c9213(0x143)]=function(){const _0x49290d=_0x3c9213;return Window_CTB_TurnOrder['Settings'][_0x49290d(0x202)];},Game_BattlerBase[_0x3c9213(0x1ba)]['TurnOrderCTBGraphicFaceName']=function(){const _0x1fe969=_0x3c9213;return this[_0x1fe969(0x12c)]===undefined&&(this[_0x1fe969(0x12c)]=this[_0x1fe969(0x155)]()),this[_0x1fe969(0x12c)];},Game_BattlerBase[_0x3c9213(0x1ba)][_0x3c9213(0x155)]=function(){const _0x10acbc=_0x3c9213;return Window_CTB_TurnOrder[_0x10acbc(0x81)][_0x10acbc(0x1fa)];},Game_BattlerBase[_0x3c9213(0x1ba)][_0x3c9213(0x1ea)]=function(){const _0x2281eb=_0x3c9213;if(this[_0x2281eb(0x1f4)]===undefined){if('dPeix'!==_0x2281eb(0xe4)){let _0x24790d=this[_0x2281eb(0x25d)](),_0x51dc0b=this[_0x2281eb(0x80)](),_0x1db337=_0x567c65[_0x2281eb(0x13f)];_0x1d63eb[_0x2281eb(0xc2)]=new _0x4bd2ed(_0x24790d,_0x51dc0b);const _0x3ce864='#000000',_0x47a8c7=_0x145be7[_0x2281eb(0x1b9)](_0x393212[_0x2281eb(0x76)[_0x2281eb(0x8b)](_0x99e2ea)]);_0x1d5fe8[_0x2281eb(0xc2)][_0x2281eb(0xd4)](0x0,0x0,_0x24790d,_0x51dc0b,_0x3ce864),_0x24790d-=0x2,_0x51dc0b-=0x2,_0x1461cd[_0x2281eb(0xc2)][_0x2281eb(0xd4)](0x1,0x1,_0x24790d,_0x51dc0b,_0x47a8c7),_0x24790d-=_0x1db337*0x2,_0x51dc0b-=_0x1db337*0x2,_0x26f336[_0x2281eb(0xc2)]['fillRect'](0x1+_0x1db337,0x1+_0x1db337,_0x24790d,_0x51dc0b,_0x3ce864),_0x24790d-=0x2,_0x51dc0b-=0x2,_0x1db337+=0x1,_0x28e8be[_0x2281eb(0xc2)]['clearRect'](0x1+_0x1db337,0x1+_0x1db337,_0x24790d,_0x51dc0b);}else this[_0x2281eb(0x1f4)]=this[_0x2281eb(0x1d3)]();}return this[_0x2281eb(0x1f4)];},Game_BattlerBase[_0x3c9213(0x1ba)]['createTurnOrderCTBGraphicFaceIndex']=function(){const _0x58a2a7=_0x3c9213;return Window_CTB_TurnOrder[_0x58a2a7(0x81)][_0x58a2a7(0x1e2)];},Game_BattlerBase['prototype'][_0x3c9213(0x21a)]=function(){const _0x33520c=_0x3c9213;return this['_ctbTurnOrderIconIndex']===undefined&&('hYaOz'==='ppdld'?this[_0x33520c(0xcd)](_0x19d5c8):this[_0x33520c(0x172)]=this[_0x33520c(0xb1)]()),this['_ctbTurnOrderIconIndex'];},Game_BattlerBase[_0x3c9213(0x1ba)]['createTurnOrderCTBGraphicIconIndex']=function(){const _0x831b6d=_0x3c9213;return Window_CTB_TurnOrder[_0x831b6d(0x81)][_0x831b6d(0x14a)];},Game_BattlerBase[_0x3c9213(0x1ba)][_0x3c9213(0xb2)]=function(_0x1cc2d6){const _0x6e2528=_0x3c9213;this[_0x6e2528(0x172)]=_0x1cc2d6;},Game_BattlerBase['prototype']['ctbTicksToGoal']=function(_0x370334,_0x3cee07){const _0x192a3d=_0x3c9213;if(this[_0x192a3d(0x256)]())return Number[_0x192a3d(0x19a)];if(!this['isAppeared']())return Number[_0x192a3d(0x19a)];const _0xd6b801=0x1;_0x370334*=_0xd6b801;if(_0x370334===_0xd6b801&&!_0x3cee07){if(this===BattleManager[_0x192a3d(0x97)])return Number[_0x192a3d(0x89)]/0xa;if(this===BattleManager[_0x192a3d(0x7c)]())return Number['MIN_SAFE_INTEGER']/0xa;if(BattleManager[_0x192a3d(0x15f)]&&BattleManager[_0x192a3d(0x15f)][_0x192a3d(0x105)](this)){if(_0x192a3d(0x94)===_0x192a3d(0x17d))this[_0x192a3d(0x1c7)](_0x2ba96a-_0x359eca);else{let _0x58f5c7=Number[_0x192a3d(0x89)]/0x1388;return _0x58f5c7+=BattleManager[_0x192a3d(0x15f)][_0x192a3d(0xe0)](this)*0x5,_0x58f5c7;}}if(this[_0x192a3d(0x289)]==='casting'&&this['currentAction']()&&this['currentAction']()[_0x192a3d(0x15e)]()&&this[_0x192a3d(0x1b5)]()[_0x192a3d(0x15e)]()[_0x192a3d(0x1ec)]<0x0)return(this[_0x192a3d(0x251)]()*_0xd6b801-this['_tpbCastTime'])/this[_0x192a3d(0x219)]();}return _0x370334-=this[_0x192a3d(0x22f)]()*_0xd6b801,this['_tpbState']==='casting'&&this[_0x192a3d(0x1b5)]()&&this[_0x192a3d(0x1b5)]()['item']()&&this[_0x192a3d(0x1b5)]()[_0x192a3d(0x15e)]()['speed']<0x0&&(_0x370334+=this['tpbRequiredCastTime']()*_0xd6b801-this[_0x192a3d(0x246)]),_0x370334/=this[_0x192a3d(0x219)]()*_0xd6b801,_0x370334||0x0;},Game_BattlerBase[_0x3c9213(0x1ba)]['ctbTicksToGoalAddedCastTime']=function(){const _0x29f394=_0x3c9213;return this[_0x29f394(0x289)]===_0x29f394(0x197)?(this[_0x29f394(0x251)]()-this[_0x29f394(0x246)])/this[_0x29f394(0x219)]():0x0;},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x173)]=Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x17a)],Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x17a)]=function(_0x1954ee){const _0x14ed02=_0x3c9213;BattleManager[_0x14ed02(0x1c4)]()?_0x14ed02(0x21d)!=='RvViH'?this[_0x14ed02(0xcd)](_0x1954ee):(_0x1b7f22[_0x14ed02(0x1ce)]['ParseItemNotetags'][_0x14ed02(0x1ad)](this,_0x5e030c),_0x9db25b['BattleSystemCTB'][_0x14ed02(0xba)](_0x2fb0b0)):VisuMZ['BattleSystemCTB']['Game_Battler_initTpbChargeTime']['call'](this,_0x1954ee);},Game_Battler['prototype']['initTpbChargeTimeCTB']=function(_0x4f0544){const _0x4dbb89=_0x3c9213,_0x4ae387=VisuMZ[_0x4dbb89(0x1ce)][_0x4dbb89(0x81)][_0x4dbb89(0xc7)];let _0x47499e=this[_0x4dbb89(0x27a)]()*eval(_0x4ae387[_0x4dbb89(0x208)]);const _0x13b2fb=this[_0x4dbb89(0xa4)]()[_0x4dbb89(0x110)](this[_0x4dbb89(0xfc)]()),_0x7df639=/<(?:CTB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x496723=_0x13b2fb[_0x4dbb89(0xd1)](_0x2c787b=>_0x2c787b&&_0x2c787b[_0x4dbb89(0x161)][_0x4dbb89(0x12b)](_0x7df639)?Number(RegExp['$1'])*0.01:0x0);_0x47499e=_0x496723[_0x4dbb89(0x1e1)]((_0x2d9762,_0xdf9698)=>_0x2d9762+_0xdf9698,_0x47499e),this[_0x4dbb89(0x289)]=_0x4dbb89(0x271),this['_tpbChargeTime']=(_0x4f0544?0x1:_0x47499e)[_0x4dbb89(0x85)](0x0,0x1),this[_0x4dbb89(0xe3)]()&&(_0x4dbb89(0xd5)==='xAcOc'?this[_0x4dbb89(0xe7)]=0x0:this[_0x4dbb89(0x1d2)]());},Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x188)]=function(){const _0x405ed1=_0x3c9213;return this[_0x405ed1(0x289)]===_0x405ed1(0x271);},Game_Battler[_0x3c9213(0x1ba)]['isCtbCastingState']=function(){const _0x2723f7=_0x3c9213;return this[_0x2723f7(0x289)]===_0x2723f7(0x197)&&this[_0x2723f7(0x1b5)]()&&this[_0x2723f7(0x1b5)]()[_0x2723f7(0x15e)]()&&this[_0x2723f7(0x1b5)]()['item']()[_0x2723f7(0x1ec)]<0x0;},Game_BattlerBase[_0x3c9213(0x1ba)][_0x3c9213(0xef)]=function(){const _0x290abd=_0x3c9213;return this['isCtbCastingState']()?this[_0x290abd(0x246)]/this['tpbRequiredCastTime']():0x0;},Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0xab)]=function(){const _0x21e2b3=_0x3c9213;return!this[_0x21e2b3(0x213)]();},Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x218)]=function(_0x44a255){const _0x338f64=_0x3c9213;this[_0x338f64(0x1ae)]=_0x44a255;},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x130)]=Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x25a)],Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x25a)]=function(){const _0xead8cb=_0x3c9213;BattleManager[_0xead8cb(0x1c4)]()?this[_0xead8cb(0x257)]():VisuMZ[_0xead8cb(0x1ce)][_0xead8cb(0x130)][_0xead8cb(0x1ad)](this);},Game_Battler['prototype'][_0x3c9213(0x257)]=function(){const _0x37d8d0=_0x3c9213;!this['canMove']()&&(this['_tpbIdleTime']+=this[_0x37d8d0(0x219)]());},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x75)]=Game_Battler['prototype'][_0x3c9213(0x156)],Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x156)]=function(){const _0x89eee7=_0x3c9213;this[_0x89eee7(0x1a9)]=BattleManager[_0x89eee7(0x1c4)](),VisuMZ[_0x89eee7(0x1ce)][_0x89eee7(0x75)][_0x89eee7(0x1ad)](this),this['_onRestrictBypassCtbReset']=undefined;},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0xcc)]=Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x27c)],Game_Battler['prototype']['clearTpbChargeTime']=function(){const _0x527f7d=_0x3c9213;if(BattleManager['isCTB']()){if('LMpzk'!==_0x527f7d(0x13b))this[_0x527f7d(0xf3)]();else{_0x155ceb['setActionState'](_0x527f7d(0x163)),_0x207a17[_0x527f7d(0x289)]='charging';const _0x2a92fb=_0x181d52[_0x527f7d(0x9a)],_0x40a0a3=_0xaea7cc[_0x527f7d(0xe7)]||0x0;_0x1e53e2[_0x527f7d(0x21f)](![]),_0x1927cc[_0x527f7d(0x9a)]=_0x2a92fb,_0x3f1238[_0x527f7d(0xe7)]=_0x3a34af['min'](_0x40a0a3,0.99),_0x40b987[_0x527f7d(0x26b)]();}}else VisuMZ[_0x527f7d(0x1ce)][_0x527f7d(0xcc)][_0x527f7d(0x1ad)](this);},Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0xf3)]=function(){const _0x35d977=_0x3c9213;if(this[_0x35d977(0x1a9)])return;this[_0x35d977(0x289)]='charging',this['_tpbChargeTime']-=0x1,this[_0x35d977(0xe7)]+=this[_0x35d977(0x1ae)]||0x0;},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x216)]=Game_Battler['prototype']['applyTpbPenalty'],Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x292)]=function(){const _0x58490d=_0x3c9213;if(BattleManager[_0x58490d(0x1c4)]()){if(_0x58490d(0xb4)===_0x58490d(0x227))return this[_0x58490d(0x1f4)]===_0x3a684d&&(this[_0x58490d(0x1f4)]=this[_0x58490d(0x1d3)]()),this[_0x58490d(0x1f4)];else this[_0x58490d(0x1c2)]();}else _0x58490d(0x27b)!==_0x58490d(0x27b)?this[_0x58490d(0x1c4)]()?this['updateTpbCtb']():_0x2d6f85[_0x58490d(0x1ce)][_0x58490d(0xf9)][_0x58490d(0x1ad)](this):VisuMZ['BattleSystemCTB'][_0x58490d(0x216)]['call'](this);},Game_Battler[_0x3c9213(0x1ba)]['applyCTBPenalty']=function(){const _0x4034b0=_0x3c9213;this[_0x4034b0(0x289)]=_0x4034b0(0x271),this['_tpbChargeTime']+=VisuMZ[_0x4034b0(0x1ce)][_0x4034b0(0x81)]['Mechanics']['EscapeFailPenalty']||0x0;},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x107)]=Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x18c)],Game_Battler[_0x3c9213(0x1ba)]['tpbSpeed']=function(){const _0x2660aa=_0x3c9213;return BattleManager[_0x2660aa(0x1c4)]()?VisuMZ[_0x2660aa(0x1ce)][_0x2660aa(0x81)][_0x2660aa(0xc7)][_0x2660aa(0x221)]['call'](this,this):VisuMZ['BattleSystemCTB'][_0x2660aa(0x107)][_0x2660aa(0x1ad)](this);},VisuMZ['BattleSystemCTB'][_0x3c9213(0x14f)]=Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x19f)],Game_Battler['prototype'][_0x3c9213(0x19f)]=function(){const _0x424b37=_0x3c9213;return BattleManager['isCTB']()?VisuMZ[_0x424b37(0x1ce)][_0x424b37(0x81)][_0x424b37(0xc7)][_0x424b37(0x166)][_0x424b37(0x1ad)](this,this):VisuMZ[_0x424b37(0x1ce)]['Game_Battler_tpbBaseSpeed']['call'](this);},VisuMZ[_0x3c9213(0x1ce)]['Game_Battler_tpbRelativeSpeed']=Game_Battler['prototype'][_0x3c9213(0x27a)],Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x27a)]=function(){const _0x231c17=_0x3c9213;if(BattleManager[_0x231c17(0x1c4)]())return _0x231c17(0x160)!==_0x231c17(0x160)?_0x1322af['y']-_0x3dd11b['y']:VisuMZ[_0x231c17(0x1ce)][_0x231c17(0x81)][_0x231c17(0xc7)]['BattlerRelativeSpeedJS'][_0x231c17(0x1ad)](this,this);else{if('uQeZT'!=='uQeZT')this['_tpbCastTime']+=this['tpbAcceleration'](),this[_0x231c17(0x246)]>=this[_0x231c17(0x251)]()&&(this['_tpbState']=_0x231c17(0x235));else return VisuMZ[_0x231c17(0x1ce)][_0x231c17(0x249)][_0x231c17(0x1ad)](this);}},VisuMZ['BattleSystemCTB'][_0x3c9213(0x1fc)]=Game_Battler['prototype']['tpbAcceleration'],Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x219)]=function(){const _0x485f78=_0x3c9213;if(BattleManager[_0x485f78(0x1c4)]()){let _0x7d921c=VisuMZ['BattleSystemCTB'][_0x485f78(0x81)][_0x485f78(0xc7)][_0x485f78(0x122)][_0x485f78(0x1ad)](this,this);const _0x135c62=0x0;return _0x7d921c+_0x135c62;}else{if('nSvKO'===_0x485f78(0x28f))return VisuMZ[_0x485f78(0x1ce)][_0x485f78(0x1fc)][_0x485f78(0x1ad)](this);else this[_0x485f78(0x12d)](),this[_0x485f78(0x116)]=0x0,this[_0x485f78(0x136)](),this['opacity']=this[_0x485f78(0x185)];}},VisuMZ[_0x3c9213(0x1ce)]['Game_Battler_tpbRequiredCastTime']=Game_Battler['prototype'][_0x3c9213(0x251)],Game_Battler['prototype'][_0x3c9213(0x251)]=function(){const _0x3a55f9=_0x3c9213;return BattleManager[_0x3a55f9(0x1c4)]()?VisuMZ[_0x3a55f9(0x1ce)][_0x3a55f9(0x81)][_0x3a55f9(0xc7)]['TpbCastTimeJS']['call'](this,this):VisuMZ[_0x3a55f9(0x1ce)][_0x3a55f9(0xa7)][_0x3a55f9(0x1ad)](this);},Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x279)]=function(){const _0x517130=_0x3c9213,_0xf3a882=SceneManager[_0x517130(0xcf)][_0x517130(0x248)];if(!_0xf3a882)return-0x1;const _0x3fffd9=_0xf3a882['_turnOrderContainer'];if(!_0x3fffd9)return-0x1;const _0x11ea5f=_0x3fffd9[_0x517130(0x1fe)](_0xd71698=>_0xd71698[_0x517130(0x17b)]()===this);return _0x3fffd9[_0x517130(0xe0)](_0x11ea5f);},Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x285)]=function(_0x54a094){const _0x4675ec=_0x3c9213;if(!BattleManager['isCTB']())return;if(!SceneManager[_0x4675ec(0x15d)]())return;if(this===BattleManager[_0x4675ec(0x7c)]())return;if(this===BattleManager[_0x4675ec(0x97)])return;const _0x1ad7eb=this[_0x4675ec(0x279)]();if(_0x1ad7eb<0x0)return;this[_0x4675ec(0xb9)](_0x1ad7eb+_0x54a094);},Game_Battler['prototype'][_0x3c9213(0xb9)]=function(_0x43171e){const _0xc93e9d=_0x3c9213;if(!BattleManager[_0xc93e9d(0x1c4)]())return;if(!SceneManager[_0xc93e9d(0x15d)]())return;if(this===BattleManager['actor']())return;if(this===BattleManager['_subject'])return;_0x43171e=Math['max'](_0x43171e,0x1),this[_0xc93e9d(0x275)](_0x43171e);},Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x275)]=function(_0x13cd10){const _0x262280=_0x3c9213;if(!BattleManager['isCTB']())return;if(!SceneManager[_0x262280(0x15d)]())return;if(this===BattleManager[_0x262280(0x7c)]())return;if(this===BattleManager[_0x262280(0x97)])return;const _0x2b9f2f=SceneManager['_scene'][_0x262280(0x248)];if(!_0x2b9f2f)return;const _0x1923b5=_0x2b9f2f['_turnOrderContainer'];if(!_0x1923b5)return;const _0x70a59d=this[_0x262280(0x279)]();_0x70a59d!==_0x13cd10&&('nhFTy'!==_0x262280(0xe5)?this[_0x262280(0x172)]=_0x2b0fa8:this['onCtbOrderChange'](_0x13cd10-_0x70a59d));let _0x37a63=_0x13cd10,_0x4d8014=_0x13cd10;_0x70a59d>_0x13cd10?_0x37a63-=0x1:_0x4d8014+=0x1;const _0x4a15a6=_0x1923b5[_0x37a63][_0x262280(0x12f)](!![]),_0x539811=_0x1923b5[_0x4d8014]['ticksLeft'](!![]),_0x1bcf14=(_0x4a15a6+_0x539811)/0x2;let _0x2f7a62=_0x1bcf14*this[_0x262280(0x219)]();if(this[_0x262280(0x289)]==='charging'){if('LUNmC'!=='LUNmC')return _0x84c8ed(_0x146b72['$1']);else this[_0x262280(0xe7)]=0x1-_0x2f7a62;}else{if(this[_0x262280(0x289)]===_0x262280(0x197)){if(_0x262280(0xbf)!==_0x262280(0xbf)){const _0x27a8cc=this[_0x262280(0x7f)]();_0x27a8cc[_0x262280(0x1d5)]((_0x5805a4,_0x37cdb5)=>{return _0x5805a4['ctbTicksToGoal'](0x1)-_0x37cdb5['ctbTicksToGoal'](0x1);});for(const _0x45f309 of _0x27a8cc){_0x45f309['updateTpb']();}this[_0x262280(0x132)](),this[_0x262280(0x22c)]();}else this['_tpbCastTime']=this['tpbRequiredCastTime']()-_0x2f7a62;}}BattleManager[_0x262280(0x15f)]=[],BattleManager[_0x262280(0x273)]();},Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x1c7)]=function(_0x59d03f){const _0x222fec=_0x3c9213,_0x1c1381=VisuMZ['BattleSystemCTB']['Settings']['Effect'],_0x116c21=_0x59d03f>0x0?_0x222fec(0xbe):_0x222fec(0xd6);if(_0x1c1381[_0x222fec(0x139)[_0x222fec(0x8b)](_0x116c21)]){const _0x5f0a82=_0x1c1381[_0x222fec(0x139)[_0x222fec(0x8b)](_0x116c21)],_0x4bf788=_0x1c1381[_0x222fec(0x101)[_0x222fec(0x8b)](_0x116c21)],_0x174986=_0x1c1381[_0x222fec(0xf4)[_0x222fec(0x8b)](_0x116c21)];$gameTemp[_0x222fec(0xea)]([this],_0x5f0a82,_0x4bf788,_0x174986);}if(this[_0x222fec(0x17b)]()&&_0x1c1381[_0x222fec(0x13a)[_0x222fec(0x8b)](_0x116c21)][_0x222fec(0x1a2)]>0x0){const _0x5799f9=_0x1c1381[_0x222fec(0x13a)[_0x222fec(0x8b)](_0x116c21)],_0x29a094={'textColor':ColorManager[_0x222fec(0x1b9)](_0x1c1381[_0x222fec(0x125)[_0x222fec(0x8b)](_0x116c21)]),'flashColor':_0x1c1381[_0x222fec(0x14b)[_0x222fec(0x8b)](_0x116c21)],'flashDuration':_0x1c1381[_0x222fec(0x1c1)['format'](_0x116c21)]};this[_0x222fec(0xc1)](_0x5799f9,_0x29a094);}},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x71)]=Game_Battler['prototype'][_0x3c9213(0x26b)],Game_Battler['prototype']['updateTpb']=function(){const _0x143d7a=_0x3c9213;if(BattleManager[_0x143d7a(0x77)](this))return;VisuMZ[_0x143d7a(0x1ce)][_0x143d7a(0x71)][_0x143d7a(0x1ad)](this);},BattleManager[_0x3c9213(0x77)]=function(_0x26ac6f){const _0x474fc6=_0x3c9213;return BattleManager[_0x474fc6(0x7f)]()['filter'](_0x212248=>_0x212248!==_0x26ac6f)[_0x474fc6(0x168)](_0x218003=>_0x218003[_0x474fc6(0x20f)]()&&_0x218003['canMove']()&&_0x218003[_0x474fc6(0x1ae)]>=0x1);},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x150)]=Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x1d0)],Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x1d0)]=function(){const _0x4702ec=_0x3c9213;BattleManager[_0x4702ec(0x1c4)]()?_0x4702ec(0x187)==='KEpLC'?(this[_0x4702ec(0x210)](),_0x1714c6[_0x4702ec(0x1ce)][_0x4702ec(0x266)][_0x4702ec(0x1ad)](this),this[_0x4702ec(0x177)]()):this['updateTpbChargeTimeCTB']():VisuMZ['BattleSystemCTB'][_0x4702ec(0x150)][_0x4702ec(0x1ad)](this);},Game_Battler['prototype'][_0x3c9213(0x203)]=function(){const _0x41fe70=_0x3c9213;if(this[_0x41fe70(0x289)]===_0x41fe70(0x271)){this[_0x41fe70(0xe7)]+=this[_0x41fe70(0x219)]();if(this[_0x41fe70(0xe7)]>=0x1){if(_0x41fe70(0x11d)===_0x41fe70(0x175)){const _0x59c937=[_0x41fe70(0xde),_0x41fe70(0x93),'After'];for(const _0x5d2ce1 of _0x59c937){_0x2c38a1['BattleSystemCTB'][_0x41fe70(0x268)](_0x58f99a,_0x5d2ce1);}_0x52cc7c['BattleSystemCTB']['createOrderJS'](_0x5e8841,_0x41fe70(0x9f));}else this[_0x41fe70(0x1a6)]();}}},VisuMZ['BattleSystemCTB'][_0x3c9213(0x104)]=Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0xc8)],Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0xc8)]=function(){const _0x4f58b4=_0x3c9213;BattleManager['isCTB']()?_0x4f58b4(0xad)!==_0x4f58b4(0x10d)?this[_0x4f58b4(0x1ff)]():(_0x10f893['processAbort'](),_0x554870['isPlaytest']()&&_0xc7cda1[_0x4f58b4(0xd0)](_0x4f58b4(0x291))):VisuMZ[_0x4f58b4(0x1ce)][_0x4f58b4(0x104)][_0x4f58b4(0x1ad)](this);},Game_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x1ff)]=function(){const _0x434dae=_0x3c9213;this[_0x434dae(0x289)]==='casting'&&(this[_0x434dae(0x246)]+=this[_0x434dae(0x219)](),this[_0x434dae(0x246)]>=this[_0x434dae(0x251)]()&&(_0x434dae(0xa6)===_0x434dae(0xa6)?this[_0x434dae(0x289)]='ready':_0xf7caef['BattleSystemCTB'][_0x434dae(0x130)][_0x434dae(0x1ad)](this)));},Game_Actor[_0x3c9213(0x1ba)]['createTurnOrderCTBGraphicType']=function(){const _0x1ebc11=_0x3c9213,_0x37cc25=this[_0x1ebc11(0x7c)]()[_0x1ebc11(0x161)];if(_0x37cc25[_0x1ebc11(0x12b)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x1ebc11(0x21e)!==_0x1ebc11(0x21e)?_0x50073c[_0x1ebc11(0x81)][_0x1ebc11(0x169)]*0x14:_0x1ebc11(0x17c);else{if(_0x37cc25['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x1ebc11(0xa9);}return Window_CTB_TurnOrder[_0x1ebc11(0x81)][_0x1ebc11(0x22a)];},Game_Actor[_0x3c9213(0x1ba)][_0x3c9213(0x155)]=function(){const _0x3c702c=_0x3c9213,_0x128817=this[_0x3c702c(0x7c)]()[_0x3c702c(0x161)];if(_0x128817[_0x3c702c(0x12b)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x3c702c(0xfd)===_0x3c702c(0xfd))return String(RegExp['$1']);else this[_0x3c702c(0x1c4)]()?this[_0x3c702c(0xb0)]():_0xe14bc2[_0x3c702c(0x1ce)][_0x3c702c(0x20c)]['call'](this);}return this[_0x3c702c(0xfb)]();},Game_Actor[_0x3c9213(0x1ba)][_0x3c9213(0x1d3)]=function(){const _0x929789=_0x3c9213,_0x23648c=this[_0x929789(0x7c)]()[_0x929789(0x161)];if(_0x23648c[_0x929789(0x12b)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this['faceIndex']();},Game_Actor[_0x3c9213(0x1ba)]['createTurnOrderCTBGraphicIconIndex']=function(){const _0x547e9d=_0x3c9213,_0x14f4d0=this[_0x547e9d(0x7c)]()[_0x547e9d(0x161)];if(_0x14f4d0['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder[_0x547e9d(0x81)]['ActorBattlerIcon'];},Game_Enemy[_0x3c9213(0x1ba)][_0x3c9213(0x143)]=function(){const _0x55cf34=_0x3c9213,_0x8be444=this[_0x55cf34(0xaa)]()[_0x55cf34(0x161)];if(_0x8be444[_0x55cf34(0x12b)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x55cf34(0x1a5)!==_0x55cf34(0x1f8))return _0x55cf34(0x17c);else _0x3f2fa[_0x55cf34(0x1ce)][_0x55cf34(0x268)](_0x20a22e,_0x346615);}else{if(_0x8be444[_0x55cf34(0x12b)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return Window_CTB_TurnOrder[_0x55cf34(0x81)][_0x55cf34(0x202)];},Game_Enemy[_0x3c9213(0x1ba)][_0x3c9213(0x155)]=function(){const _0x1b6ae7=_0x3c9213,_0x58e54e=this['enemy']()['note'];if(_0x58e54e[_0x1b6ae7(0x12b)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_CTB_TurnOrder[_0x1b6ae7(0x81)][_0x1b6ae7(0x1fa)];},Game_Enemy[_0x3c9213(0x1ba)]['createTurnOrderCTBGraphicFaceIndex']=function(){const _0x18452b=_0x3c9213,_0x4f203a=this[_0x18452b(0xaa)]()[_0x18452b(0x161)];if(_0x4f203a[_0x18452b(0x12b)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_CTB_TurnOrder[_0x18452b(0x81)][_0x18452b(0x1e2)];},Game_Enemy['prototype'][_0x3c9213(0xb1)]=function(){const _0x3b7422=_0x3c9213,_0x18a4c1=this['enemy']()[_0x3b7422(0x161)];if(_0x18a4c1[_0x3b7422(0x12b)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder[_0x3b7422(0x81)][_0x3b7422(0x14a)];},VisuMZ[_0x3c9213(0x1ce)]['Scene_Battle_createAllWindows']=Scene_Battle[_0x3c9213(0x1ba)][_0x3c9213(0x1c0)],Scene_Battle['prototype']['createAllWindows']=function(){const _0x4b526d=_0x3c9213;VisuMZ[_0x4b526d(0x1ce)][_0x4b526d(0x9e)][_0x4b526d(0x1ad)](this),this[_0x4b526d(0x245)]();},Scene_Battle[_0x3c9213(0x1ba)][_0x3c9213(0x245)]=function(){const _0x5aca68=_0x3c9213;if(!BattleManager[_0x5aca68(0x1c4)]())return;this['_ctbTurnOrderWindow']=new Window_CTB_TurnOrder();const _0x5448bf=this[_0x5aca68(0x1d6)](this['_windowLayer']);this[_0x5aca68(0x124)](this[_0x5aca68(0x248)],_0x5448bf),this['repositionLogWindowCTB'](),BattleManager[_0x5aca68(0x273)](!![]);},Scene_Battle['prototype'][_0x3c9213(0x23e)]=function(){const _0x3618fe=_0x3c9213,_0x40070f=Window_CTB_TurnOrder[_0x3618fe(0x81)];if(_0x40070f[_0x3618fe(0xe1)]!==_0x3618fe(0x1a4))return;if(!_0x40070f[_0x3618fe(0x222)])return;if(!this[_0x3618fe(0x158)])return;const _0x54724b=this[_0x3618fe(0x248)]['y']-Math['round']((Graphics[_0x3618fe(0x206)]-Graphics['boxHeight'])/0x2),_0x268dbe=_0x54724b+this[_0x3618fe(0x248)][_0x3618fe(0x206)];this[_0x3618fe(0x158)]['y']=_0x268dbe+_0x40070f[_0x3618fe(0x154)];};function _0xd5ad(_0x55ddbd,_0x35d494){const _0x57817d=_0x5781();return _0xd5ad=function(_0xd5ad29,_0x43b32c){_0xd5ad29=_0xd5ad29-0x71;let _0x17d8f7=_0x57817d[_0xd5ad29];return _0x17d8f7;},_0xd5ad(_0x55ddbd,_0x35d494);}function Sprite_CTB_TurnOrder_Battler(){this['initialize'](...arguments);}Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)]=Object['create'](Sprite_Clickable[_0x3c9213(0x1ba)]),Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)]['constructor']=Sprite_CTB_TurnOrder_Battler,Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x214)]=function(_0x385a4d,_0x1431ad,_0x3465e1){const _0x3b25a2=_0x3c9213;this[_0x3b25a2(0x24b)](_0x385a4d,_0x1431ad,_0x3465e1),Sprite_Clickable[_0x3b25a2(0x1ba)][_0x3b25a2(0x214)][_0x3b25a2(0x1ad)](this),this[_0x3b25a2(0x15c)]();},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x24b)]=function(_0x39c851,_0x365de6,_0x47001b){const _0xa0f372=_0x3c9213;this[_0xa0f372(0x24a)]=_0x39c851,this['_index']=_0x365de6,this['_dupe']=_0x47001b;const _0x232912=Window_CTB_TurnOrder[_0xa0f372(0x81)],_0x342a18=this[_0xa0f372(0x28a)](),_0xa09ae5=this['defaultPosition']();this[_0xa0f372(0x116)]=0x0,this[_0xa0f372(0x1d8)]=_0x342a18?_0x232912[_0xa0f372(0x1ac)]*_0xa09ae5:0x0,this['_positionTargetY']=_0x342a18?0x0:_0x232912[_0xa0f372(0x1ac)]*_0xa09ae5,this[_0xa0f372(0x1c6)]=0x0,this[_0xa0f372(0x185)]=0xff,this['_isAlive']=!![],this[_0xa0f372(0x79)]=!![];},Sprite_CTB_TurnOrder_Battler['prototype'][_0x3c9213(0x15c)]=function(){const _0x39383f=_0x3c9213;this['createInitialPositions'](),this[_0x39383f(0x20b)](),this[_0x39383f(0x86)](),this[_0x39383f(0x9c)](),this['createLetterSprite']();},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)]['createInitialPositions']=function(){const _0x5a6a50=_0x3c9213;this['x']=this[_0x5a6a50(0x1d8)],this['y']=this[_0x5a6a50(0x1da)];},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x28a)]=function(){const _0x4f9755=_0x3c9213,_0x265e3b=Window_CTB_TurnOrder[_0x4f9755(0x81)],_0xa40f20=[_0x4f9755(0x1a4),_0x4f9755(0x12a)]['includes'](_0x265e3b[_0x4f9755(0xe1)]);return _0xa40f20;},Sprite_CTB_TurnOrder_Battler['prototype'][_0x3c9213(0x25d)]=function(){const _0x407f4c=_0x3c9213,_0xd32f47=Window_CTB_TurnOrder['Settings'];return this['isHorz']()?_0xd32f47[_0x407f4c(0x1ac)]:_0xd32f47['SpriteLength'];},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)]['bitmapHeight']=function(){const _0x4ef7cb=_0x3c9213,_0x374b5c=Window_CTB_TurnOrder[_0x4ef7cb(0x81)];return this[_0x4ef7cb(0x28a)]()?_0x374b5c[_0x4ef7cb(0xdd)]:_0x374b5c[_0x4ef7cb(0x1ac)];},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x144)]=function(){const _0x37b155=_0x3c9213;this[_0x37b155(0xc2)]=new Bitmap(0x48,0x24);const _0x2abc19=this['battler']()?this[_0x37b155(0x17b)]()['name']():_0x37b155(0x20a)['format'](this[_0x37b155(0x24a)],this[_0x37b155(0x276)],this[_0x37b155(0x195)]);this[_0x37b155(0xc2)][_0x37b155(0x23c)](_0x2abc19,0x0,0x0,0x48,0x24,_0x37b155(0x18d));},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)]['createBackgroundSprite']=function(){const _0x284f49=_0x3c9213;if(!Window_CTB_TurnOrder[_0x284f49(0x81)]['ShowMarkerBg'])return;const _0x289280=Window_CTB_TurnOrder['Settings'],_0x7ba316=this['_unit']===$gameParty?'Actor':_0x284f49(0x1cf),_0x3ba2f3=_0x284f49(0xd8)[_0x284f49(0x8b)](_0x7ba316),_0x11420a=new Sprite();_0x11420a[_0x284f49(0x73)]['x']=this[_0x284f49(0x73)]['x'],_0x11420a['anchor']['y']=this[_0x284f49(0x73)]['y'];if(_0x289280[_0x3ba2f3])_0x11420a[_0x284f49(0xc2)]=ImageManager[_0x284f49(0x25f)](_0x289280[_0x3ba2f3]);else{if(_0x284f49(0x237)===_0x284f49(0x147)){if(_0x41aa77[_0x284f49(0x1c4)]()&&_0x299077==='time')return;_0x2f3991[_0x284f49(0x1ce)]['Window_StatusBase_placeGauge']['call'](this,_0x4fae81,_0x5a09fb,_0x5f5440,_0x22bfcf);}else{const _0x382aed=this[_0x284f49(0x25d)](),_0x28d4be=this[_0x284f49(0x80)]();_0x11420a['bitmap']=new Bitmap(_0x382aed,_0x28d4be);const _0x172055=ColorManager[_0x284f49(0x1b9)](_0x289280['%1BgColor1'['format'](_0x7ba316)]),_0x4e81b6=ColorManager[_0x284f49(0x1b9)](_0x289280[_0x284f49(0xae)[_0x284f49(0x8b)](_0x7ba316)]);_0x11420a[_0x284f49(0xc2)][_0x284f49(0xe8)](0x0,0x0,_0x382aed,_0x28d4be,_0x172055,_0x4e81b6,!![]);}}this[_0x284f49(0x21c)]=_0x11420a,this[_0x284f49(0xac)](this[_0x284f49(0x21c)]),this['width']=this[_0x284f49(0x21c)]['width'],this[_0x284f49(0x206)]=this['_backgroundSprite'][_0x284f49(0x206)];},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x86)]=function(){const _0x508073=_0x3c9213,_0x2e4a83=new Sprite();_0x2e4a83['anchor']['x']=this['anchor']['x'],_0x2e4a83[_0x508073(0x73)]['y']=this[_0x508073(0x73)]['y'],this[_0x508073(0x199)]=_0x2e4a83,this[_0x508073(0xac)](this['_graphicSprite']),this[_0x508073(0x22e)]();},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x9c)]=function(){const _0x2bcf04=_0x3c9213;if(!Window_CTB_TurnOrder['Settings'][_0x2bcf04(0x184)])return;const _0x4e82c8=Window_CTB_TurnOrder['Settings'],_0x3cd9ba=this[_0x2bcf04(0x24a)]===$gameParty?'Actor':_0x2bcf04(0x1cf),_0x99ab59='%1SystemBorder'[_0x2bcf04(0x8b)](_0x3cd9ba),_0x271b6b=new Sprite();_0x271b6b[_0x2bcf04(0x73)]['x']=this[_0x2bcf04(0x73)]['x'],_0x271b6b[_0x2bcf04(0x73)]['y']=this['anchor']['y'];if(_0x4e82c8[_0x99ab59]){if('GYbza'==='DDdnn'){if(this['isCTB']())return!![];return _0x4cbac8[_0x2bcf04(0x1ce)][_0x2bcf04(0x181)][_0x2bcf04(0x1ad)](this);}else _0x271b6b[_0x2bcf04(0xc2)]=ImageManager[_0x2bcf04(0x25f)](_0x4e82c8[_0x99ab59]);}else{let _0xa8d225=this[_0x2bcf04(0x25d)](),_0x256dbf=this[_0x2bcf04(0x80)](),_0x474f54=_0x4e82c8['BorderThickness'];_0x271b6b[_0x2bcf04(0xc2)]=new Bitmap(_0xa8d225,_0x256dbf);const _0x45ad4c=_0x2bcf04(0x7d),_0x550b07=ColorManager[_0x2bcf04(0x1b9)](_0x4e82c8[_0x2bcf04(0x76)[_0x2bcf04(0x8b)](_0x3cd9ba)]);_0x271b6b[_0x2bcf04(0xc2)]['fillRect'](0x0,0x0,_0xa8d225,_0x256dbf,_0x45ad4c),_0xa8d225-=0x2,_0x256dbf-=0x2,_0x271b6b[_0x2bcf04(0xc2)]['fillRect'](0x1,0x1,_0xa8d225,_0x256dbf,_0x550b07),_0xa8d225-=_0x474f54*0x2,_0x256dbf-=_0x474f54*0x2,_0x271b6b[_0x2bcf04(0xc2)][_0x2bcf04(0xd4)](0x1+_0x474f54,0x1+_0x474f54,_0xa8d225,_0x256dbf,_0x45ad4c),_0xa8d225-=0x2,_0x256dbf-=0x2,_0x474f54+=0x1,_0x271b6b[_0x2bcf04(0xc2)][_0x2bcf04(0x238)](0x1+_0x474f54,0x1+_0x474f54,_0xa8d225,_0x256dbf);}this[_0x2bcf04(0x21c)]=_0x271b6b,this[_0x2bcf04(0xac)](this[_0x2bcf04(0x21c)]);},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x1e4)]=function(){const _0x1d167e=_0x3c9213,_0x4e6179=Window_CTB_TurnOrder['Settings'];if(!_0x4e6179[_0x1d167e(0x153)])return;if(this['_unit']===$gameParty)return;const _0x4aa3bf=this[_0x1d167e(0x25d)](),_0x287b1d=this[_0x1d167e(0x80)](),_0x2bdbe9=new Sprite();_0x2bdbe9[_0x1d167e(0x73)]['x']=this['anchor']['x'],_0x2bdbe9[_0x1d167e(0x73)]['y']=this[_0x1d167e(0x73)]['y'],_0x2bdbe9[_0x1d167e(0xc2)]=new Bitmap(_0x4aa3bf,_0x287b1d),this['_letterSprite']=_0x2bdbe9,this[_0x1d167e(0xac)](this[_0x1d167e(0x240)]);},Sprite_CTB_TurnOrder_Battler['prototype']['battler']=function(){const _0x1ec7f3=_0x3c9213;return this[_0x1ec7f3(0x24a)]?this['_unit'][_0x1ec7f3(0x20d)]()[this[_0x1ec7f3(0x276)]]:null;},Sprite_CTB_TurnOrder_Battler['prototype'][_0x3c9213(0x12f)]=function(_0x42714a){const _0x1f7efc=_0x3c9213,_0x464b8a=this[_0x1f7efc(0x17b)]();if(!_0x464b8a)return Number[_0x1f7efc(0x19a)];const _0xde65bf=0x1*(this[_0x1f7efc(0x195)]+0x1);return _0x464b8a[_0x1f7efc(0x13c)](_0xde65bf,_0x42714a);},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x198)]=function(){const _0x21f8fa=_0x3c9213;Sprite_Clickable[_0x21f8fa(0x1ba)][_0x21f8fa(0x198)]['call'](this),this[_0x21f8fa(0x12d)](),this[_0x21f8fa(0x136)](),this[_0x21f8fa(0x215)](),this[_0x21f8fa(0x272)](),this[_0x21f8fa(0x264)](),this[_0x21f8fa(0x1f3)](),this[_0x21f8fa(0x19b)](),this['updateSelectionEffect']();},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)]['checkPosition']=function(){const _0x1771f8=_0x3c9213,_0x21600f=this[_0x1771f8(0x1d9)]();if(this[_0x1771f8(0x269)]===_0x21600f)return;this['_position']=_0x21600f;const _0x584001=Window_CTB_TurnOrder[_0x1771f8(0x81)],_0x28bce1=this[_0x1771f8(0x28a)](),_0x3f44e8=_0x584001[_0x1771f8(0x182)],_0x362872=_0x584001[_0x1771f8(0x88)],_0x5843bf=SceneManager['_scene'][_0x1771f8(0x248)];if(!_0x5843bf)return;this[_0x1771f8(0x116)]=_0x584001[_0x1771f8(0x146)],this[_0x1771f8(0x1d8)]=_0x28bce1?_0x584001[_0x1771f8(0x1ac)]*_0x21600f:0x0,this['_positionTargetY']=_0x28bce1?0x0:_0x584001[_0x1771f8(0x1ac)]*_0x21600f;_0x21600f>0x0&&(this[_0x1771f8(0x1d8)]+=_0x28bce1?_0x362872:0x0,this[_0x1771f8(0x1da)]+=_0x28bce1?0x0:_0x362872);if(_0x3f44e8)_0x1771f8(0x91)===_0x1771f8(0x108)?_0x46e277+=this[_0x1771f8(0x251)]()*_0x1c2f1e-this[_0x1771f8(0x246)]:this[_0x1771f8(0x1d8)]=_0x28bce1?_0x5843bf[_0x1771f8(0x1ee)]-this[_0x1771f8(0x1d8)]-_0x584001['SpriteThin']:0x0;else{if(_0x1771f8(0x1f2)!==_0x1771f8(0x1f2)){if(!this[_0x1771f8(0x240)])return;const _0x160b6a=this['battler']();if(!_0x160b6a)return;if(this['_letter']===_0x160b6a[_0x1771f8(0x229)]&&this['_plural']===_0x160b6a[_0x1771f8(0x211)])return;this[_0x1771f8(0x229)]=_0x160b6a[_0x1771f8(0x229)],this[_0x1771f8(0x211)]=_0x160b6a[_0x1771f8(0x211)];const _0xd33756=_0x1314f7[_0x1771f8(0x81)],_0x347025=this[_0x1771f8(0x28a)](),_0xf797ff=this[_0x1771f8(0x25d)](),_0x5db106=this[_0x1771f8(0x80)](),_0x5d075c=this['_letterSprite'][_0x1771f8(0xc2)];_0x5d075c[_0x1771f8(0x1c9)]();if(!this['_plural'])return;_0x5d075c[_0x1771f8(0xbd)]=_0xd33756['EnemyBattlerFontFace']||_0x181445[_0x1771f8(0x25b)](),_0x5d075c[_0x1771f8(0x7e)]=_0xd33756[_0x1771f8(0x254)]||0x10,_0x347025?_0x5d075c[_0x1771f8(0x23c)](this[_0x1771f8(0x229)][_0x1771f8(0xda)](),0x0,_0x5db106/0x2,_0xf797ff,_0x5db106/0x2,_0x1771f8(0x18d)):_0x5d075c[_0x1771f8(0x23c)](this[_0x1771f8(0x229)][_0x1771f8(0xda)](),0x0,0x2,_0xf797ff-0x8,_0x5db106-0x4,_0x1771f8(0x113));}else this[_0x1771f8(0x1da)]=_0x28bce1?0x0:_0x5843bf[_0x1771f8(0x206)]-this['_positionTargetY']-_0x584001[_0x1771f8(0x1ac)];}},Sprite_CTB_TurnOrder_Battler['prototype'][_0x3c9213(0x136)]=function(){const _0x5c6bc7=_0x3c9213;if(this[_0x5c6bc7(0x1c6)]>0x0)return;if(this[_0x5c6bc7(0x116)]>0x0){const _0x5c67b3=this[_0x5c6bc7(0x116)];this['x']=(this['x']*(_0x5c67b3-0x1)+this['_positionTargetX'])/_0x5c67b3,this['y']=(this['y']*(_0x5c67b3-0x1)+this[_0x5c6bc7(0x1da)])/_0x5c67b3,this[_0x5c6bc7(0x116)]--;}this[_0x5c6bc7(0x116)]<=0x0&&this[_0x5c6bc7(0x14c)]&&(this['x']=this[_0x5c6bc7(0x1d8)],this['y']=this[_0x5c6bc7(0x1da)],this[_0x5c6bc7(0x7a)]<=0x0&&!this[_0x5c6bc7(0x19d)]&&this[_0x5c6bc7(0xff)](0xff));},Sprite_CTB_TurnOrder_Battler['prototype'][_0x3c9213(0x1b7)]=function(){const _0x33d39b=_0x3c9213;return Window_CTB_TurnOrder['Settings'][_0x33d39b(0x169)]*0x14;},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)][_0x3c9213(0xa8)]=function(){return SceneManager['_scene']['_ctbTurnOrderWindow'];},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)]['containerPosition']=function(){const _0x2bf90f=_0x3c9213;if(!this['containerWindow']())return this[_0x2bf90f(0x1b7)]();const _0x1c77d9=this['containerWindow']()['_turnOrderContainer'];return _0x1c77d9[_0x2bf90f(0xe0)](this);},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x23a)]=function(){const _0x1dc4b3=_0x3c9213,_0x4464b1=Window_CTB_TurnOrder['Settings'],_0x12b4ca=this[_0x1dc4b3(0x28a)](),_0x432d82=_0x12b4ca?_0x4464b1['TotalHorzSprites']:_0x4464b1[_0x1dc4b3(0x16d)];this['_dupe']-=0x1,this[_0x1dc4b3(0x195)]<0x0&&('gPPPK'!==_0x1dc4b3(0x13d)?(_0x175e48[_0x1dc4b3(0x1ce)][_0x1dc4b3(0x280)][_0x1dc4b3(0x1ad)](this,_0x2ae7f1),_0x3541ca[_0x1dc4b3(0x1ce)][_0x1dc4b3(0xba)](_0xb90a07)):(this[_0x1dc4b3(0x195)]=_0x432d82-0x1,this[_0x1dc4b3(0xff)](0x0)));},Sprite_CTB_TurnOrder_Battler['prototype']['startFade']=function(_0x47e6ae){const _0x4230c4=_0x3c9213,_0xc150ac=Window_CTB_TurnOrder[_0x4230c4(0x81)];this[_0x4230c4(0x1c6)]=_0xc150ac[_0x4230c4(0x146)],this[_0x4230c4(0x185)]=_0x47e6ae;},Sprite_CTB_TurnOrder_Battler['prototype'][_0x3c9213(0x215)]=function(){const _0xfaa6ca=_0x3c9213,_0x279581=this['battler']();if(!_0x279581)return;if(this[_0xfaa6ca(0x14c)]===_0x279581[_0xfaa6ca(0x20f)]()&&this[_0xfaa6ca(0x79)]===_0x279581[_0xfaa6ca(0x1a1)]())return;this[_0xfaa6ca(0x14c)]=_0x279581['isAlive'](),this['_isAppeared']=_0x279581[_0xfaa6ca(0x1a1)]();let _0x5907c6=this[_0xfaa6ca(0x14c)]&&this[_0xfaa6ca(0x79)]?0xff:0x0;this[_0xfaa6ca(0xff)](_0x5907c6);},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)]['updateOpacity']=function(){const _0x22756d=_0x3c9213;if(this[_0x22756d(0x1c6)]>0x0){const _0x126150=this[_0x22756d(0x1c6)];this['opacity']=(this[_0x22756d(0x7a)]*(_0x126150-0x1)+this['_fadeTarget'])/_0x126150,this[_0x22756d(0x1c6)]--,this[_0x22756d(0x1c6)]<=0x0&&(this[_0x22756d(0x12d)](),this[_0x22756d(0x116)]=0x0,this[_0x22756d(0x136)](),this[_0x22756d(0x7a)]=this['_fadeTarget']);}if(this[_0x22756d(0x19d)])return;BattleManager[_0x22756d(0x10e)]===_0x22756d(0x190)&&(_0x22756d(0x149)===_0x22756d(0x149)?(this['_isBattleOver']=!![],this['startFade'](0x0)):(this[_0x22756d(0xa1)]=_0xf63690[_0x22756d(0x253)](),_0x538908=_0x8e959d[_0x22756d(0x112)](this[_0x22756d(0xa1)]),_0x58ab24['addLoadListener'](this[_0x22756d(0x1d1)][_0x22756d(0x18b)](this,_0x4121eb))));},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x264)]=function(){const _0x1f1ea4=_0x3c9213,_0x79c4f9=this['battler']();if(!_0x79c4f9)return;const _0xcdcfe1=Window_CTB_TurnOrder[_0x1f1ea4(0x81)],_0x26a4e0=this[_0x1f1ea4(0x24a)]===$gameParty?_0x1f1ea4(0x118):_0x1f1ea4(0x1cf);let _0x376303=_0x79c4f9[_0x1f1ea4(0x259)]();if(_0x79c4f9[_0x1f1ea4(0x26a)]()&&_0x376303===_0x1f1ea4(0xaa))_0x376303='face';else _0x79c4f9['isEnemy']()&&_0x376303===_0x1f1ea4(0x234)&&(_0x376303=_0x1f1ea4(0xaa));if(this[_0x1f1ea4(0x164)]!==_0x376303)return this[_0x1f1ea4(0x22e)]();switch(this[_0x1f1ea4(0x164)]){case _0x1f1ea4(0x17c):if(this[_0x1f1ea4(0xce)]!==_0x79c4f9[_0x1f1ea4(0x204)]())return this['processUpdateGraphic']();if(this[_0x1f1ea4(0x1c3)]!==_0x79c4f9[_0x1f1ea4(0x1ea)]()){if(_0x1f1ea4(0x1e6)==='Ipszl')return this[_0x1f1ea4(0x22e)]();else{const _0x1335d8=this[_0x1f1ea4(0xaa)]()[_0x1f1ea4(0x161)];if(_0x1335d8['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x6b1c56(_0x32ba83['$1']);return _0x25c5e7[_0x1f1ea4(0x81)][_0x1f1ea4(0x14a)];}}break;case _0x1f1ea4(0xa9):if(this[_0x1f1ea4(0x224)]!==_0x79c4f9['TurnOrderCTBGraphicIconIndex']())return this[_0x1f1ea4(0x22e)]();break;case _0x1f1ea4(0xaa):if(_0x79c4f9[_0x1f1ea4(0x126)]()){if(this['_graphicSv']!==_0x79c4f9['svBattlerName']()){if('xOiiI'!==_0x1f1ea4(0x128)){const _0x3f0b8a=_0x256c8a[_0x1f1ea4(0x1ce)][_0x1f1ea4(0x81)][_0x1f1ea4(0xc7)];let _0x1d4bca=this['tpbRelativeSpeed']()*_0x2be8db(_0x3f0b8a['InitialGaugeJS']);const _0x464727=this[_0x1f1ea4(0xa4)]()[_0x1f1ea4(0x110)](this[_0x1f1ea4(0xfc)]()),_0x56f422=/<(?:CTB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x45bdf8=_0x464727[_0x1f1ea4(0xd1)](_0xebc5c8=>_0xebc5c8&&_0xebc5c8[_0x1f1ea4(0x161)][_0x1f1ea4(0x12b)](_0x56f422)?_0x4ad58e(_0x3fc7ef['$1'])*0.01:0x0);_0x1d4bca=_0x45bdf8[_0x1f1ea4(0x1e1)]((_0x2d3d8e,_0x1598c2)=>_0x2d3d8e+_0x1598c2,_0x1d4bca),this[_0x1f1ea4(0x289)]=_0x1f1ea4(0x271),this[_0x1f1ea4(0xe7)]=(_0x3b7d1d?0x1:_0x1d4bca)[_0x1f1ea4(0x85)](0x0,0x1),this[_0x1f1ea4(0xe3)]()&&(this[_0x1f1ea4(0xe7)]=0x0);}else return this[_0x1f1ea4(0x22e)]();}}else{if(this[_0x1f1ea4(0xa1)]!==_0x79c4f9[_0x1f1ea4(0x253)]()){if('KzagH'===_0x1f1ea4(0x15b))return this[_0x1f1ea4(0x22e)]();else _0xdfeb08=this[_0x1f1ea4(0xb3)]()[_0x1f1ea4(0xe7)];}}break;case'svactor':if(_0x79c4f9[_0x1f1ea4(0x26a)]()){if(this['_graphicSv']!==_0x79c4f9[_0x1f1ea4(0x253)]()){if(_0x1f1ea4(0x16b)!==_0x1f1ea4(0x16b)){const _0x46a386=this[_0x1f1ea4(0x17b)]();if(!_0x46a386)return;if(!_0x46a386[_0x1f1ea4(0x99)]())return;if(this[_0x1f1ea4(0x171)]===_0x46a386[_0x1f1ea4(0x167)]())return;this[_0x1f1ea4(0x171)]=_0x46a386[_0x1f1ea4(0x167)](),this[_0x1f1ea4(0x199)][_0x1f1ea4(0xd3)](_0x46a386['hasSvBattler']()?0x0:this['_graphicHue']);}else return this[_0x1f1ea4(0x22e)]();}}else{if(this[_0x1f1ea4(0xa1)]!==_0x79c4f9[_0x1f1ea4(0x253)]())return this['processUpdateGraphic']();}break;}},Sprite_CTB_TurnOrder_Battler['prototype'][_0x3c9213(0x22e)]=function(){const _0xfeaa30=_0x3c9213,_0x3c6109=this[_0xfeaa30(0x17b)]();if(!_0x3c6109)return;this[_0xfeaa30(0x164)]=_0x3c6109[_0xfeaa30(0x259)]();if(_0x3c6109[_0xfeaa30(0x26a)]()&&this[_0xfeaa30(0x164)]==='enemy')_0xfeaa30(0xb7)!==_0xfeaa30(0xec)?this['_graphicType']='face':(this[_0xfeaa30(0xe7)]+=this[_0xfeaa30(0x219)](),this[_0xfeaa30(0xe7)]>=0x1&&this[_0xfeaa30(0x1a6)]());else _0x3c6109[_0xfeaa30(0x99)]()&&this['_graphicType']==='svactor'&&(this[_0xfeaa30(0x164)]=_0xfeaa30(0xaa));let _0x2d09ee;switch(this[_0xfeaa30(0x164)]){case'face':this[_0xfeaa30(0xce)]=_0x3c6109[_0xfeaa30(0x204)](),this[_0xfeaa30(0x1c3)]=_0x3c6109[_0xfeaa30(0x1ea)](),_0x2d09ee=ImageManager[_0xfeaa30(0x284)](this[_0xfeaa30(0xce)]),_0x2d09ee[_0xfeaa30(0x12e)](this[_0xfeaa30(0x11e)][_0xfeaa30(0x18b)](this,_0x2d09ee));break;case _0xfeaa30(0xa9):this['_graphicIconIndex']=_0x3c6109[_0xfeaa30(0xb1)](),_0x2d09ee=ImageManager[_0xfeaa30(0x25f)](_0xfeaa30(0x205)),_0x2d09ee[_0xfeaa30(0x12e)](this[_0xfeaa30(0x129)]['bind'](this,_0x2d09ee));break;case _0xfeaa30(0xaa):if(_0x3c6109[_0xfeaa30(0x126)]()){if('biJih'===_0xfeaa30(0x281))this['_graphicSv']=_0x3c6109[_0xfeaa30(0x18a)](),_0x2d09ee=ImageManager[_0xfeaa30(0x123)](this['_graphicSv']),_0x2d09ee[_0xfeaa30(0x12e)](this[_0xfeaa30(0x8d)][_0xfeaa30(0x18b)](this,_0x2d09ee));else return 0x0;}else $gameSystem[_0xfeaa30(0x270)]()?(this[_0xfeaa30(0xa1)]=_0x3c6109[_0xfeaa30(0x253)](),_0x2d09ee=ImageManager[_0xfeaa30(0xf6)](this[_0xfeaa30(0xa1)]),_0x2d09ee['addLoadListener'](this[_0xfeaa30(0x1d1)][_0xfeaa30(0x18b)](this,_0x2d09ee))):(this[_0xfeaa30(0xa1)]=_0x3c6109['battlerName'](),_0x2d09ee=ImageManager[_0xfeaa30(0x112)](this[_0xfeaa30(0xa1)]),_0x2d09ee[_0xfeaa30(0x12e)](this['changeEnemyGraphicBitmap'][_0xfeaa30(0x18b)](this,_0x2d09ee)));break;case _0xfeaa30(0x234):this[_0xfeaa30(0x127)]=_0x3c6109[_0xfeaa30(0x253)](),_0x2d09ee=ImageManager['loadSvActor'](this['_graphicSv']),_0x2d09ee[_0xfeaa30(0x12e)](this[_0xfeaa30(0x8d)][_0xfeaa30(0x18b)](this,_0x2d09ee));break;}},Sprite_CTB_TurnOrder_Battler['prototype'][_0x3c9213(0x11e)]=function(_0x21faf2){const _0xe566bc=_0x3c9213,_0x36d216=this[_0xe566bc(0x1c3)],_0xb0d411=this[_0xe566bc(0x25d)](),_0x59b26f=this[_0xe566bc(0x80)](),_0x47702c=Math[_0xe566bc(0x1f1)](_0xb0d411,_0x59b26f);this[_0xe566bc(0x199)][_0xe566bc(0xc2)]=new Bitmap(_0xb0d411,_0x59b26f);const _0x379d60=this[_0xe566bc(0x199)][_0xe566bc(0xc2)],_0x1a3959=ImageManager[_0xe566bc(0xeb)],_0x4b8067=ImageManager[_0xe566bc(0x217)],_0x4ecf6d=_0x47702c/Math[_0xe566bc(0x1f1)](_0x1a3959,_0x4b8067),_0x54235e=ImageManager[_0xe566bc(0xeb)],_0x5b3403=ImageManager[_0xe566bc(0x217)],_0x586845=_0x36d216%0x4*_0x1a3959+(_0x1a3959-_0x54235e)/0x2,_0x3c6978=Math[_0xe566bc(0xfa)](_0x36d216/0x4)*_0x4b8067+(_0x4b8067-_0x5b3403)/0x2,_0x59f15=(_0xb0d411-_0x1a3959*_0x4ecf6d)/0x2,_0xfa556c=(_0x59b26f-_0x4b8067*_0x4ecf6d)/0x2;_0x379d60[_0xe566bc(0xb6)](_0x21faf2,_0x586845,_0x3c6978,_0x54235e,_0x5b3403,_0x59f15,_0xfa556c,_0x47702c,_0x47702c);},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x129)]=function(_0x327991){const _0x4e4814=_0x3c9213,_0x4b6263=this['_graphicIconIndex'],_0x467b84=this[_0x4e4814(0x25d)](),_0x18cfb7=this[_0x4e4814(0x80)]();this['_graphicSprite'][_0x4e4814(0xc2)]=new Bitmap(_0x467b84,_0x18cfb7);const _0x158be7=this[_0x4e4814(0x199)][_0x4e4814(0xc2)],_0x5cdaa1=ImageManager[_0x4e4814(0x1cd)],_0x127a2e=ImageManager[_0x4e4814(0x83)],_0x1cf029=Math[_0x4e4814(0x255)](_0x5cdaa1,_0x127a2e,_0x467b84,_0x18cfb7),_0x34a54d=_0x4b6263%0x10*_0x5cdaa1,_0x8eb19=Math['floor'](_0x4b6263/0x10)*_0x127a2e,_0x3a214f=Math[_0x4e4814(0xfa)](Math[_0x4e4814(0x1f1)](_0x467b84-_0x1cf029,0x0)/0x2),_0x2ce7b1=Math[_0x4e4814(0xfa)](Math['max'](_0x18cfb7-_0x1cf029,0x0)/0x2);_0x158be7[_0x4e4814(0xb6)](_0x327991,_0x34a54d,_0x8eb19,_0x5cdaa1,_0x127a2e,_0x3a214f,_0x2ce7b1,_0x1cf029,_0x1cf029);},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x8d)]=function(_0x303e4c){const _0x436725=_0x3c9213,_0x1dca1e=this[_0x436725(0x25d)](),_0xd6b335=this[_0x436725(0x80)](),_0x256c7a=Math['min'](_0x1dca1e,_0xd6b335);this[_0x436725(0x199)][_0x436725(0xc2)]=new Bitmap(_0x1dca1e,_0xd6b335);const _0x190c5e=this[_0x436725(0x199)][_0x436725(0xc2)],_0x21a8f9=this[_0x436725(0x127)][_0x436725(0x12b)](/\$/i),_0x2ec23a=_0x21a8f9?0x1:ImageManager[_0x436725(0x1a0)],_0x12219d=_0x21a8f9?0x1:ImageManager[_0x436725(0x20e)],_0x44f4b0=_0x303e4c[_0x436725(0x1ee)]/_0x2ec23a,_0x4d61bc=_0x303e4c['height']/_0x12219d,_0x29082a=Math[_0x436725(0x255)](0x1,_0x256c7a/_0x44f4b0,_0x256c7a/_0x4d61bc),_0xf0ec16=_0x44f4b0*_0x29082a,_0x189ef4=_0x4d61bc*_0x29082a,_0x26d7d7=Math[_0x436725(0x239)]((_0x1dca1e-_0xf0ec16)/0x2),_0x37c639=Math[_0x436725(0x239)]((_0xd6b335-_0x189ef4)/0x2);_0x190c5e[_0x436725(0xb6)](_0x303e4c,0x0,0x0,_0x44f4b0,_0x4d61bc,_0x26d7d7,_0x37c639,_0xf0ec16,_0x189ef4);},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x1d1)]=function(_0x49f883){const _0x1cede1=_0x3c9213,_0x38da8e=Window_CTB_TurnOrder['Settings'],_0x449427=this[_0x1cede1(0x25d)](),_0x189d65=this[_0x1cede1(0x80)](),_0x3e6b03=Math[_0x1cede1(0x255)](_0x449427,_0x189d65);this[_0x1cede1(0x199)][_0x1cede1(0xc2)]=new Bitmap(_0x449427,_0x189d65);const _0x2ff524=this[_0x1cede1(0x199)][_0x1cede1(0xc2)],_0x3c4ea5=Math['min'](0x1,_0x3e6b03/_0x49f883[_0x1cede1(0x1ee)],_0x3e6b03/_0x49f883[_0x1cede1(0x206)]),_0x369d0d=_0x49f883[_0x1cede1(0x1ee)]*_0x3c4ea5,_0x1a94fd=_0x49f883['height']*_0x3c4ea5,_0x497acd=Math[_0x1cede1(0x239)]((_0x449427-_0x369d0d)/0x2),_0x14b893=Math['round']((_0x189d65-_0x1a94fd)/0x2);_0x2ff524[_0x1cede1(0xb6)](_0x49f883,0x0,0x0,_0x49f883[_0x1cede1(0x1ee)],_0x49f883['height'],_0x497acd,_0x14b893,_0x369d0d,_0x1a94fd);},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)]['updateGraphicHue']=function(){const _0x3fa935=_0x3c9213,_0x2fde16=this[_0x3fa935(0x17b)]();if(!_0x2fde16)return;if(!_0x2fde16['isEnemy']())return;if(this[_0x3fa935(0x171)]===_0x2fde16[_0x3fa935(0x167)]())return;this[_0x3fa935(0x171)]=_0x2fde16[_0x3fa935(0x167)](),this[_0x3fa935(0x199)][_0x3fa935(0xd3)](_0x2fde16[_0x3fa935(0x126)]()?0x0:this[_0x3fa935(0x171)]);},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x19b)]=function(){const _0x41867f=_0x3c9213;if(!this['_letterSprite'])return;const _0x3e3550=this['battler']();if(!_0x3e3550)return;if(this[_0x41867f(0x229)]===_0x3e3550[_0x41867f(0x229)]&&this[_0x41867f(0x211)]===_0x3e3550[_0x41867f(0x211)])return;this['_letter']=_0x3e3550[_0x41867f(0x229)],this[_0x41867f(0x211)]=_0x3e3550[_0x41867f(0x211)];const _0x47dea8=Window_CTB_TurnOrder[_0x41867f(0x81)],_0x4a35dc=this['isHorz'](),_0x4d5958=this['bitmapWidth'](),_0x324c3f=this[_0x41867f(0x80)](),_0x3d564e=this[_0x41867f(0x240)][_0x41867f(0xc2)];_0x3d564e[_0x41867f(0x1c9)]();if(!this[_0x41867f(0x211)])return;_0x3d564e['fontFace']=_0x47dea8[_0x41867f(0x1a8)]||$gameSystem[_0x41867f(0x25b)](),_0x3d564e[_0x41867f(0x7e)]=_0x47dea8[_0x41867f(0x254)]||0x10,_0x4a35dc?_0x3d564e[_0x41867f(0x23c)](this[_0x41867f(0x229)][_0x41867f(0xda)](),0x0,_0x324c3f/0x2,_0x4d5958,_0x324c3f/0x2,_0x41867f(0x18d)):_0x3d564e[_0x41867f(0x23c)](this[_0x41867f(0x229)][_0x41867f(0xda)](),0x0,0x2,_0x4d5958-0x8,_0x324c3f-0x4,_0x41867f(0x113));},Sprite_CTB_TurnOrder_Battler[_0x3c9213(0x1ba)][_0x3c9213(0x293)]=function(){const _0xc6e654=_0x3c9213,_0x27282b=this[_0xc6e654(0x17b)]();if(!_0x27282b)return;const _0x4a01ab=_0x27282b['battler']();if(!_0x4a01ab)return;const _0xb237fd=_0x4a01ab['mainSprite']();if(!_0xb237fd)return;this[_0xc6e654(0x16f)](_0xb237fd['_blendColor']);},Sprite_CTB_TurnOrder_Battler['prototype']['getStateTooltipBattler']=function(){const _0x5c6827=_0x3c9213;return this[_0x5c6827(0x17b)]();},VisuMZ[_0x3c9213(0x1ce)]['Window_Help_setItem']=Window_Help[_0x3c9213(0x1ba)][_0x3c9213(0x15a)],Window_Help[_0x3c9213(0x1ba)][_0x3c9213(0x15a)]=function(_0x448847){const _0x35b759=_0x3c9213;if(BattleManager[_0x35b759(0x1c4)]()&&_0x448847&&_0x448847[_0x35b759(0x161)]&&_0x448847['note'][_0x35b759(0x12b)](/<(?:CTB) HELP>\s*([\s\S]*)\s*<\/(?:CTB) HELP>/i))_0x35b759(0x152)!=='kloof'?_0x280ce4[_0x35b759(0x1ce)][_0x35b759(0x20c)][_0x35b759(0x1ad)](this):this[_0x35b759(0x183)](String(RegExp['$1']));else{if('ueVWW'==='ueVWW')VisuMZ[_0x35b759(0x1ce)][_0x35b759(0x1cc)][_0x35b759(0x1ad)](this,_0x448847);else return _0x2dabd9['ctbTicksToGoal'](0x1)-_0x54e9eb[_0x35b759(0x13c)](0x1);}},VisuMZ[_0x3c9213(0x1ce)][_0x3c9213(0x140)]=Window_StatusBase[_0x3c9213(0x1ba)]['placeGauge'],Window_StatusBase[_0x3c9213(0x1ba)]['placeGauge']=function(_0x55abe4,_0x4ab279,_0x458f59,_0x456311){const _0x450a77=_0x3c9213;if(BattleManager[_0x450a77(0x1c4)]()&&_0x4ab279===_0x450a77(0x260))return;VisuMZ[_0x450a77(0x1ce)][_0x450a77(0x140)][_0x450a77(0x1ad)](this,_0x55abe4,_0x4ab279,_0x458f59,_0x456311);};function Window_CTB_TurnOrder(){const _0x4b49c3=_0x3c9213;this[_0x4b49c3(0x214)](...arguments);}Window_CTB_TurnOrder['prototype']=Object['create'](Window_Base[_0x3c9213(0x1ba)]),Window_CTB_TurnOrder['prototype'][_0x3c9213(0xa2)]=Window_CTB_TurnOrder,Window_CTB_TurnOrder[_0x3c9213(0x81)]=VisuMZ['BattleSystemCTB'][_0x3c9213(0x81)][_0x3c9213(0xed)],Window_CTB_TurnOrder[_0x3c9213(0x1ba)][_0x3c9213(0x214)]=function(){const _0x2e6519=_0x3c9213,_0x5942d4=this[_0x2e6519(0x10b)]();this['_homeX']=_0x5942d4['x'],this[_0x2e6519(0x189)]=_0x5942d4['y'],Window_Base[_0x2e6519(0x1ba)][_0x2e6519(0x214)][_0x2e6519(0x1ad)](this,_0x5942d4),this[_0x2e6519(0x262)](),this[_0x2e6519(0x1e3)](),this[_0x2e6519(0x7a)]=0x0;},Window_CTB_TurnOrder[_0x3c9213(0x1ba)][_0x3c9213(0x10b)]=function(){const _0x203236=_0x3c9213,_0x306b85=Window_CTB_TurnOrder[_0x203236(0x81)],_0x1bcf9a=SceneManager[_0x203236(0xcf)][_0x203236(0x96)][_0x203236(0x206)],_0x621fe7=SceneManager[_0x203236(0xcf)]['_helpWindow'][_0x203236(0x206)],_0x242bd1=_0x306b85[_0x203236(0x88)];let _0x3e366c=0x0,_0x331f15=0x0,_0x5cf301=0x0,_0x4844bb=0x0;switch(_0x306b85[_0x203236(0xe1)]){case _0x203236(0x1a4):_0x3e366c=_0x306b85[_0x203236(0x1ac)]*_0x306b85['TotalHorzSprites']+_0x242bd1,_0x331f15=_0x306b85[_0x203236(0xdd)],_0x5cf301=Math[_0x203236(0x176)]((Graphics['width']-_0x3e366c)/0x2),_0x4844bb=_0x306b85['ScreenBuffer'];break;case'bottom':_0x3e366c=_0x306b85[_0x203236(0x1ac)]*_0x306b85[_0x203236(0x169)]+_0x242bd1,_0x331f15=_0x306b85[_0x203236(0xdd)],_0x5cf301=Math[_0x203236(0x176)]((Graphics['width']-_0x3e366c)/0x2),_0x4844bb=Graphics[_0x203236(0x206)]-_0x1bcf9a-_0x331f15-_0x306b85['ScreenBuffer'];break;case _0x203236(0x26c):_0x3e366c=_0x306b85[_0x203236(0xdd)],_0x331f15=_0x306b85[_0x203236(0x1ac)]*_0x306b85[_0x203236(0x16d)]+_0x242bd1,_0x5cf301=_0x306b85[_0x203236(0x154)],_0x4844bb=Math[_0x203236(0x176)]((Graphics[_0x203236(0x206)]-_0x1bcf9a+_0x621fe7-_0x331f15)/0x2);break;case _0x203236(0x113):_0x3e366c=_0x306b85[_0x203236(0xdd)],_0x331f15=_0x306b85[_0x203236(0x1ac)]*_0x306b85[_0x203236(0x16d)]+_0x242bd1,_0x5cf301=Graphics['width']-_0x3e366c-_0x306b85[_0x203236(0x154)],_0x4844bb=Math[_0x203236(0x176)]((Graphics['height']-_0x1bcf9a+_0x621fe7-_0x331f15)/0x2);break;}return _0x5cf301+=_0x306b85[_0x203236(0x24c)],_0x4844bb+=_0x306b85[_0x203236(0x1f7)],new Rectangle(_0x5cf301,_0x4844bb,_0x3e366c,_0x331f15);},Window_CTB_TurnOrder['prototype'][_0x3c9213(0x244)]=function(){this['padding']=0x0;},Window_CTB_TurnOrder[_0x3c9213(0x1ba)][_0x3c9213(0x28a)]=function(){const _0x33236d=_0x3c9213,_0x155847=Window_CTB_TurnOrder[_0x33236d(0x81)],_0x549afb=[_0x33236d(0x1a4),'bottom'][_0x33236d(0x105)](_0x155847[_0x33236d(0xe1)]);return _0x549afb;},Window_CTB_TurnOrder[_0x3c9213(0x1ba)]['createBattlerSprites']=function(){const _0x59e65e=_0x3c9213,_0x538f31=Window_CTB_TurnOrder[_0x59e65e(0x81)],_0x5b436b=this[_0x59e65e(0x28a)](),_0x4b169b=_0x5b436b?_0x538f31['TotalHorzSprites']:_0x538f31[_0x59e65e(0x16d)];this[_0x59e65e(0x1be)]=new Sprite(),this[_0x59e65e(0x28c)](this[_0x59e65e(0x1be)]),this[_0x59e65e(0xc6)]=[];for(let _0x52404d=0x0;_0x52404d<$gameParty[_0x59e65e(0x186)]();_0x52404d++){for(let _0x24b04e=0x0;_0x24b04e<_0x4b169b;_0x24b04e++){const _0x3f0820=new Sprite_CTB_TurnOrder_Battler($gameParty,_0x52404d,_0x24b04e);this[_0x59e65e(0x1be)][_0x59e65e(0xac)](_0x3f0820),this[_0x59e65e(0xc6)]['push'](_0x3f0820);}}for(let _0x47b70c=0x0;_0x47b70c<$gameTroop[_0x59e65e(0x20d)]()[_0x59e65e(0x1a2)];_0x47b70c++){if(_0x59e65e(0xf1)==='LZbzI')_0x26182f[_0x59e65e(0x1ce)][_0x59e65e(0x104)]['call'](this);else for(let _0xfc3ff5=0x0;_0xfc3ff5<_0x4b169b;_0xfc3ff5++){if('cRKXS'===_0x59e65e(0x1dc)){const _0x3b90cd=new Sprite_CTB_TurnOrder_Battler($gameTroop,_0x47b70c,_0xfc3ff5);this['_turnOrderInnerSprite'][_0x59e65e(0xac)](_0x3b90cd),this[_0x59e65e(0xc6)]['push'](_0x3b90cd);}else return this['_tpbState']===_0x59e65e(0x197)?(this[_0x59e65e(0x251)]()-this[_0x59e65e(0x246)])/this['tpbAcceleration']():0x0;}}},Window_CTB_TurnOrder[_0x3c9213(0x1ba)][_0x3c9213(0x198)]=function(){const _0x6da472=_0x3c9213;Window_Base[_0x6da472(0x1ba)][_0x6da472(0x198)][_0x6da472(0x1ad)](this),this['updatePosition'](),this[_0x6da472(0x1e3)]();},Window_CTB_TurnOrder[_0x3c9213(0x1ba)][_0x3c9213(0x136)]=function(){const _0x396f89=_0x3c9213,_0x22253a=Window_CTB_TurnOrder[_0x396f89(0x81)];if(_0x22253a[_0x396f89(0xe1)]!==_0x396f89(0x1a4))return;if(!_0x22253a[_0x396f89(0xaf)])return;const _0x4a4ee5=SceneManager[_0x396f89(0xcf)]['_helpWindow'];if(!_0x4a4ee5)return;_0x4a4ee5['visible']?(this['x']=this[_0x396f89(0x23b)]+(_0x22253a[_0x396f89(0x1ca)]||0x0),this['y']=this[_0x396f89(0x189)]+(_0x22253a[_0x396f89(0x191)]||0x0)):_0x396f89(0xd7)!==_0x396f89(0x241)?(this['x']=this[_0x396f89(0x23b)],this['y']=this[_0x396f89(0x189)]):_0x2b8e73[_0x396f89(0x1ce)][_0x396f89(0xca)]['call'](this,_0xf435fd);const _0x39985d=SceneManager['_scene'][_0x396f89(0xfe)];Window_CTB_TurnOrder['_ogWindowLayerX']===undefined&&(_0x396f89(0x9d)===_0x396f89(0x16a)?(_0x18a440[_0x396f89(0x1ce)][_0x396f89(0x9e)][_0x396f89(0x1ad)](this),this[_0x396f89(0x245)]()):(Window_CTB_TurnOrder['_ogWindowLayerX']=Math[_0x396f89(0x239)]((Graphics[_0x396f89(0x1ee)]-Math[_0x396f89(0x255)](Graphics['boxWidth'],_0x39985d[_0x396f89(0x1ee)]))/0x2),Window_CTB_TurnOrder[_0x396f89(0x1bb)]=Math[_0x396f89(0x239)]((Graphics['height']-Math['min'](Graphics['boxHeight'],_0x39985d['height']))/0x2))),this['x']+=_0x39985d['x']-Window_CTB_TurnOrder[_0x396f89(0x27f)],this['y']+=_0x39985d['y']-Window_CTB_TurnOrder['_ogWindowLayerY'];},Window_CTB_TurnOrder[_0x3c9213(0x1ba)][_0x3c9213(0x8a)]=function(){const _0x5dce62=_0x3c9213;if(!this['_turnOrderInnerSprite'])return;const _0x4abfce=this[_0x5dce62(0x1be)][_0x5dce62(0xd2)];if(!_0x4abfce)return;_0x4abfce['sort'](this[_0x5dce62(0x209)][_0x5dce62(0x18b)](this));},Window_CTB_TurnOrder[_0x3c9213(0x1ba)]['compareBattlerSprites']=function(_0x280e36,_0x92e0c2){const _0x10d84d=_0x3c9213,_0x32e176=this[_0x10d84d(0x28a)](),_0x37302c=Window_CTB_TurnOrder[_0x10d84d(0x81)][_0x10d84d(0x182)];if(_0x32e176&&!_0x37302c)return _0x280e36['x']-_0x92e0c2['x'];else{if(_0x32e176&&_0x37302c){if('xyuQL'===_0x10d84d(0xc9))return _0x92e0c2['x']-_0x280e36['x'];else _0x5713f4[_0x10d84d(0x23c)](this[_0x10d84d(0x229)][_0x10d84d(0xda)](),0x0,0x2,_0x43fce7-0x8,_0x19c013-0x4,_0x10d84d(0x113));}else{if(!_0x32e176&&_0x37302c){if(_0x10d84d(0x1d7)==='cNbdr')return _0x280e36['y']-_0x92e0c2['y'];else this[_0x10d84d(0x247)]();}else{if(!_0x32e176&&!_0x37302c)return _0x92e0c2['y']-_0x280e36['y'];}}}},Window_CTB_TurnOrder['prototype']['updateVisibility']=function(){const _0x5041d1=_0x3c9213;this[_0x5041d1(0x120)]=$gameSystem[_0x5041d1(0xcb)]();},Window_CTB_TurnOrder[_0x3c9213(0x1ba)][_0x3c9213(0x283)]=function(_0x2bc236){const _0x35b4a2=_0x3c9213;this[_0x35b4a2(0x8a)](),this[_0x35b4a2(0xc6)][_0x35b4a2(0x1d5)]((_0x3c9bf9,_0x53b152)=>{const _0x301379=_0x35b4a2;return _0x301379(0x133)===_0x301379(0x24d)?this[_0x301379(0x22e)]():_0x3c9bf9[_0x301379(0x12f)]()-_0x53b152[_0x301379(0x12f)]();});if(![]){if(_0x35b4a2(0x84)===_0x35b4a2(0x84))console[_0x35b4a2(0xd0)](this[_0x35b4a2(0xc6)][_0x35b4a2(0x267)](_0x59e0a8=>_0x59e0a8[_0x35b4a2(0x17b)]())[_0x35b4a2(0xd1)](_0x35a31d=>_0x35a31d['battler']()[_0x35b4a2(0x18e)]()+':\x20'+_0x35a31d[_0x35b4a2(0x12f)]()));else{const _0x7ccaf9=_0x305d90[_0x35b4a2(0x1ce)][_0x35b4a2(0x102)],_0x4e9be8=_0x35b4a2(0x162),_0x432ba0=['Charge',_0x35b4a2(0x93),_0x35b4a2(0x1fb)];for(const _0x5ae7e1 of _0x432ba0){const _0x52cd69=_0x4e9be8['format'](_0x5ae7e1['toUpperCase']()['trim'](),_0x35b4a2(0x8e),'(?:GAUGE|TIME|SPEED)'),_0x3ed2f6=new _0x54a63(_0x52cd69,'i');_0x2b7c79[_0x35b4a2(0x1ce)][_0x35b4a2(0x102)][_0x5ae7e1]=_0x3ed2f6;}_0x8c353b[_0x35b4a2(0x1ce)]['RegExp'][_0x35b4a2(0x16e)]=/<JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>\s*([\s\S]*)\s*<\/JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>/i;}}if(!_0x2bc236)return;for(const _0x248a54 of this[_0x35b4a2(0xc6)]){if(_0x35b4a2(0x226)!=='ILXOW')this[_0x35b4a2(0xe7)]=0x0;else{if(!_0x248a54)continue;_0x248a54['update'](),_0x248a54[_0x35b4a2(0x116)]=0x0;}}},VisuMZ[_0x3c9213(0x1ce)]['Scene_Battle_selectNextCommand']=Scene_Battle[_0x3c9213(0x1ba)][_0x3c9213(0x13e)],Scene_Battle[_0x3c9213(0x1ba)][_0x3c9213(0x13e)]=function(){const _0x5097db=_0x3c9213;VisuMZ['BattleSystemCTB'][_0x5097db(0x26d)][_0x5097db(0x1ad)](this),BattleManager['updateTurnOrderCTB']();},Window_CTB_TurnOrder[_0x3c9213(0x1ba)]['rotateCTBSprite']=function(_0x389aea){const _0x153cf4=_0x3c9213;for(const _0x2ed4da of this[_0x153cf4(0xc6)]){if(_0x153cf4(0x193)===_0x153cf4(0x193)){if(!_0x2ed4da)continue;if(_0x2ed4da['battler']()!==_0x389aea)continue;_0x2ed4da['rotateDupeNumber']();}else return(this['tpbRequiredCastTime']()-this[_0x153cf4(0x246)])/this[_0x153cf4(0x219)]();}};