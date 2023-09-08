//=============================================================================
// VisuStella MZ - Enemy Levels
// VisuMZ_3_EnemyLevels.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_EnemyLevels = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EnemyLevel = VisuMZ.EnemyLevel || {};
VisuMZ.EnemyLevel.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.05] [EnemyLevel]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Enemy_Levels_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Enemies in RPG Maker MZ do not have levels by default, but instead are given
 * static parameters that do not change throughout the game. This plugin adds
 * the functionality to apply levels and level-based parameter changes to all
 * of your enemies, along with control over how their levels are handled.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assign levels to each enemy from exact values to dynamic values based on
 *   the party's levels, variables, etc.
 * * Level variance and and bonus modifiers to make enemies dynamically leveled
 *   even if they're in the same battle.
 * * Decide enemy levels based on the map the player is in.
 * * Have enemies use different images based on what level they are.
 * * Skill effects, item effects, and Plugin Commands that alter the levels
 *   of enemies mid-battle.
 * * Notetags to prevent certain skills from being used until the enemy reaches
 *   a specific level.
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
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
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
 * enemy.level
 *
 * - A new property, 'level' is defined for Game_Enemy and it used to determine
 * the enemy's current level. This allows you, the game dev, to use a.level or
 * b.level in damage formulas and other calculations.
 *
 * ---
 *
 * ============================================================================
 * Parameter Calculations
 * ============================================================================
 *
 * To understand how parameter calculations are made, refer to the formula
 * below for all base parameters, EXP, gold, and drop rate.
 *
 * ---
 *
 * base + (level * base * rate) + (level * flat)
 *
 * Where:
 * - 'base' is the original base value of the parameter found in the database.
 * - 'level' is the previous level of the enemy (minimum: 0).
 * - 'rate' is the rate of growth determined by notetags or Plugin Parameters.
 * - 'flat' is the flat growth value also determined by notetags/parameters.
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
 * === Setup Enemy Level Notetags ===
 *
 * These are the notetags that determine an enemy's level upon creation.
 *
 * ---
 *
 * <Show Level>
 * <Hide Level>
 *
 * - Used for: Enemy Notetags
 * - Lets you show or hide an enemy's level from their name.
 * - This will override the Plugin Parameters => General => Show Enemy Level?
 *   setting.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Sets the enemy's level to a static level of 'x' whenever it's created.
 * - Replace 'x' with a numeric value representing its level.
 * - This will bypass the default level settings and ignore map levels.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * <Level: x to y>
 *
 * - Used for: Enemy Notetags
 * - Sets the enemy's level to a level between 'x' and 'y'  whenever the enemy
 *   is created.
 * - Replace 'x' and 'y' with a numeric values representing its level range.
 * - This will bypass the default level settings and ignore map levels.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * <Level Variable: x>
 *
 * - Used for: Enemy Notetags
 * - Sets the enemy's level to a level represented by the value used inside
 *   Game Variable x.
 * - Replace 'x' with the ID of the Game Variable to reference its value.
 * - This will bypass the default level settings and ignore map levels.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * <Level: Highest Actor Level>
 * <Level: Highest Party Level>
 *
 * <Level: Average Actor Level>
 * <Level: Average Party Level>
 *
 * <Level: Lowest Actor Level>
 * <Level: Lowest Party Level>
 *
 * - Used for: Enemy Notetags
 * - Sets the base level of this enemy equal to either (respectively:
 *   - The highest level of any actor in the player's party.
 *   - The highest level of any actor in the battling party.
 *   - The average level of any actor in the player's party.
 *   - The average level of any actor in the battling party.
 *   - The lowest level of any actor in the player's party.
 *   - The lowest level of any actor in the battling party.
 * - This will bypass the default level settings and ignore map levels.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * <Level Bonus: +x>
 * <Level Bonus: -x>
 *
 * - Used for: Enemy
 * - This will add/subtrack the base level decided using the above notetags
 *   with a specific value.
 * - Replace 'x' with a numeric value on how much to adjust the base level by.
 *
 * ---
 *
 * <Level Variance: x>
 *
 * - Used for: Enemy Notetags
 * - This can allow the level range for the enemy to be anywhere from 'x' less
 *   than the base to 'x' more than the base.
 * - Replace 'x' with a numeric value indicating how much level variance there
 *   is from the base level.
 *
 * ---
 *
 * <Positive Level Variance: x>
 * <Negative Level Variance: x>
 *
 * - Used for: Enemy Notetags
 * - This specifies the positive and negative level variances applied to the
 *   base level, specifying a change anywhere between the negative and positive
 *   modifiers to the base level.
 * - Replace 'x' with a numeric value indicating how much level variance there
 *   is from the base level (negatively or positively).
 *
 * ---
 *
 * <Minimum Level: x>
 * <Maximum Level: x>
 *
 * - Used for: Enemy Notetags
 * - These notetags determine the absolute lowest and absolute highest level
 *   the enemy can be after all other modifiers.
 * - Even if the bonus, variance, and manual level changes are applied, the
 *   enemy's level cannot be less than the minimum or larger than the maximum.
 * - Replace 'x' with numeric values representing the limits of the enemy's
 *   level ranges.
 *
 * ---
 *
 * === JavaScript Notetags: Setup Enemy Level ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine dynamic enemy level setup notetags.
 *
 * ---
 *
 * <JS Level: code>
 *
 * - Used for: Enemy Notetags
 * - Sets the enemy's level to a static level determined by code whenever
 *   it's created.
 * - Replace 'code' with JavaScript code to determine the enemy's base level.
 *
 * ---
 *
 * <JS Level Bonus: code>
 *
 * - Used for: Enemy Notetags
 * - This will add/subtrack the base level decided using the above notetags
 *   by a value determined by JavaScript code.
 * - Replace 'code' with JavaScript code to determine the level bonus.
 *
 * ---
 *
 * <JS Level Variance: code>
 *
 * - Used for: Enemy Notetags
 * - This can allow the level range for the enemy determined by JavaScript code
 *   as variance.
 * - Replace 'code' with JavaScript code to determine the level variance.
 *
 * ---
 *
 * <JS Positive Level Variance: code>
 * <JS Negative Level Variance: code>
 *
 * - Used for: Enemy Notetags
 * - This specifies the positive and negative level variances applied to the
 *   base level, specifying a change anywhere between the negative and positive
 *   modifiers to the base level.
 * - Replace 'code' with JavaScript code to determine the level variance.
 *
 * ---
 * 
 * === Enemy Appearance-Related Notetags ===
 * 
 * These notetags allow you to adjust how enemies look based on their level.
 * These settings will always start with level 1 being the default appearance
 * while changing appearances once they reach a specific level.
 * 
 * ---
 * 
 * <Level x Image: filename>
 *
 * - Used for: Enemy Notetags
 * - Once the enemy reaches level 'x' and above, its image will change to
 *   whatever 'filename' is used until it reaches the next appearance setting.
 * - Replace 'x' with a number representing the level required to reach.
 * - Replace 'filename' with the filename of the enemy in the img/enemies/
 *   and/or img/sv_enemies folder.
 * - Insert multiples of these notetags to give them different image settings
 *   throughout various levels.
 * - If multiple notetags are used, the settings will be arranged from lowest
 *   to highest, giving priority to the highest met level.
 * 
 * ---
 * 
 * <Level Images>
 *  x: filename
 *  x: filename
 *  x: filename
 * </Level Images>
 *
 * - Used for: Enemy Notetags
 * - Once the enemy reaches level 'x' and above, its image will change to
 *   whatever 'filename' is used until it reaches the next appearance setting.
 * - Replace 'x' with a number representing the level required to reach.
 * - Replace 'filename' with the filename of the enemy in the img/enemies/
 *   and/or img/sv_enemies folder.
 * - Insert multiple lines of the 'x: filename' portion of the notetag to
 *   designate multiple settings.
 * - If multiple settings are used, the settings will be arranged from lowest
 *   to highest, giving priority to the highest met level.
 * 
 * ---
 *
 * === Map Notetags that Determine Enemy Levels ===
 *
 * The following are notetags that are placed inside of a map's notebox to
 * determine the levels of enemies fought on that map. These notetags cannot
 * bypass the <Level: x> notetags but will take priority over the default
 * Plugin Parameter settings.
 *
 * ---
 *
 * <Enemy Level: x>
 *
 * - Used for: Map Notetags
 * - Sets the levels of the map's enemies to a static level of 'x' whenever
 *   they're created.
 * - Replace 'x' with a numeric value representing its level.
 * - This will bypass the default level settings but cannot bypass any of the
 *   <Level: x> notetags.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * <Enemy Level: x to y>
 *
 * - Used for: Map Notetags
 * - Sets the map's enemy levels to a level between 'x' and 'y'  whenever they
 *   are created.
 * - Replace 'x' and 'y' with a numeric values representing its level range.
 * - This will bypass the default level settings but cannot bypass any of the
 *   <Level: x> notetags.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * <Enemy Level: Highest Actor Level>
 * <Enemy Level: Highest Party Level>
 *
 * <Enemy Level: Average Actor Level>
 * <Enemy Level: Average Party Level>
 *
 * <Enemy Level: Lowest Actor Level>
 * <Enemy Level: Lowest Party Level>
 *
 * - Used for: Map Notetags
 * - Sets the base level of this map's levels equal to either (respectively:
 *   - The highest level of any actor in the player's party.
 *   - The highest level of any actor in the battling party.
 *   - The average level of any actor in the player's party.
 *   - The average level of any actor in the battling party.
 *   - The lowest level of any actor in the player's party.
 *   - The lowest level of any actor in the battling party.
 * - This will bypass the default level settings but cannot bypass any of the
 *   <Level: x> notetags.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * === JavaScript Notetags: Map Notetags that Determine Enemy Levels ===
 *
 * The following are notetags made for users with JavaScript knowledge to make
 * map-related notetags that determine enemy levels. These notetags cannot
 * bypass the <Level: x> notetags but will take priority over the default
 * Plugin Parameter settings.
 *
 * ---
 *
 * <JS Enemy Level: code>
 *
 * - Used for: Map Notetags
 * - Sets the levels of the map enemies to a static level determined by code
 *   whenever it's created.
 * - Replace 'code' with JavaScript code to determine the enemy's base level.
 *
 * ---
 *
 * === Enemy Level Parameter Notetags ===
 *
 * The growth rate and flat growth amounts can be determined by default in
 * Plugin Parameters => Parameters Growth. However, if you wish for enemies to
 * have special or unique growth, use the following notetags.
 *
 * ---
 *
 * <Growth Rate Per Level>
 *  MaxHP: +x.x
 *  MaxMP: +x.x
 *  ATK: +x.x
 *  DEF: +x.x
 *  MAT: +x.x
 *  MDF: +x.x
 *  AGI: +x.x
 *  LUK: +x.x
 *  EXP: +x.x
 *  Gold: +x.x
 *  Drop: +x.x
 * </Growth Rate Per Level>
 *
 * - Used for: Enemy Notetags
 * - Changes the rate of growth per level for the enemy.
 * - Replace 'x.x' with a positive or negative value on how much to raise the
 *   parameter by for each level relative to the base value.
 *
 * ---
 *
 * <Growth Flat Per Level>
 *  MaxHP: +x.x
 *  MaxMP: +x.x
 *  ATK: +x.x
 *  DEF: +x.x
 *  MAT: +x.x
 *  MDF: +x.x
 *  AGI: +x.x
 *  LUK: +x.x
 *  EXP: +x.x
 *  Gold: +x.x
 *  Drop: +x.x
 * </Growth Flat Per Level>
 *
 * - Used for: Enemy Notetags
 * - Changes the flat growth value per level for the enemy.
 * - Replace 'x.x' with a positive or negative value on how much to raise the
 *   parameter by for each level as a flat value.
 *
 * ---
 *
 * <Static Level Parameters>
 *
 * - Used for: Enemy Notetags
 * - Insert this notetag if you do not wish for the growth modifiers to affect
 *   the enemy and just use the database's parameters as its current parameters
 *   no matter the level.
 *
 * ---
 * 
 * === Enemy Level Skill Requirement Notetags ===
 * 
 * ---
 * 
 * <Enemy Skill id Require Level: x>
 * <Enemy Skill name Require Level: x>
 *
 * - Used for: Enemy Notetags
 * - To make actions for enemies require specific levels, use the above notetag
 *   to define what level the enemy can use the identified skill at.
 * - Replace 'id' with the ID of the skill to assign a level to.
 * - Replace 'name' with the name of the skill to assign a level to.
 * - Insert multiples of this notetag to assign levels to multiple skills.
 * 
 * ---
 *
 * === Enemy Level Change Notetags ===
 *
 * These notetags affect mid-battle level changing effects for enemies.
 *
 * ---
 *
 * <Change Enemy Level: +x>
 * <Change Enemy Level: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the enemy's level by 'x' positively or negatively mid-battle.
 * - This will also alter the enemy's parameters.
 * - Replace 'x' with the amount to raise/drop the level by.
 *
 * ---
 *
 * <Reset Enemy Level>
 *
 * - Used for: Skill, Item Notetags
 * - Resets any level changes made to the enemy from the start of battle.
 *
 * ---
 *
 * <Resist Level Change>
 *
 * - Used for: Enemy, State Notetags
 * - Makes the affected enemy resist level changes.
 *
 * ---
 *
 * === JavaScript Notetags: Enemy Level Change ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * affect mid-battle level changing effects for enemies.
 *
 * ---
 *
 * <JS Change Enemy Level: code>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the enemy's level by a value determined by JavaScript code either
 *   positively or negatively mid-battle.
 * - This will also alter the enemy's parameters.
 * - Replace 'code' with JavaScript code to determine the amount to change the
 *   enemy's level by.
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
 * === Enemy-Related Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Level
 * - Change target enemy(ies) level by a value.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to affect.
 *
 *   Level:
 *   - Changes level by this value.
 *   - You may use JavaScript code.
 *
 *   Bypass Resist?:
 *   - Bypasses <Resist Level Change> effect?
 *
 * ---
 *
 * Enemy: Reset Level
 * - Reset target enemy(ies) level to its original level.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to affect.
 *
 *   Bypass Resist?:
 *   - Bypasses <Resist Level Change> effect?
 *
 * ---
 *
 * Enemy: Set Level
 * - Set target enemy(ies) level to a specific value.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to affect.
 *
 *   Level:
 *   - Sets level to this value.
 *   - You may use JavaScript code.
 *
 *   Bypass Resist?:
 *   - Bypasses <Resist Level Change> effect?
 *
 * ---
 * 
 * === Debug-Related Plugin Commands ===
 * 
 * ---
 *
 * DEBUG: View Level Stats
 * - View the stats of specific enemies for each level.
 * - This will appear in the Debug Console.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to view.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings that pertain to enemy levels, letting you
 * adjust the defaults to how some mechanics work as well as the vocabulary
 * shown for the enemy levels.
 *
 * ---
 *
 * Levels
 * 
 *   Level Type:
 *   - Choose the default level type for all enemies.
 *     - Highest Actor Level
 *     - Highest Party Level
 *     - Average Actor Level
 *     - Average Party Level
 *     - Lowest Actor Level
 *     - Lowest Party Level
 *     - Variable x
 *     - Static x
 *   - Replace 'x' with a number if present.
 * 
 *   Minimum Level:
 *   - Default minimum level for enemies.
 * 
 *   Maximum Level:
 *   - Default maximum level for enemies.
 * 
 *   Negative Variance:
 *   - Default negative level variance.
 * 
 *   Positive Variance:
 *   - Default positive level variance.
 *
 * ---
 *
 * Mechanics
 * 
 *   Preserve HP/MP Rates?:
 *   - If level changing, preserve the enemy's HP/MP rates?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Show Enemy Level?:
 *   - Show enemy levels by default? Use the notetags <Show Level> and
 *     <Hide Level> to determine otherwise.
 * 
 *   Enemy Name Format:
 *   - Text format used for enemy names in battle.
 *   - %1 - Level, %2 - Enemy's Name
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Growth Settings
 * ============================================================================
 *
 * Determine how much growth for each parameter enemies gain by default. These
 * growth settings can be relative to the enemy's base value or increases at a
 * flat amount each level. The formula for each increase is the following:
 *
 *   base + (level * base * rate) + (level * flat)
 *
 * Where:
 * - 'base' is the original base value of the parameter found in the database.
 * - 'level' is the previous level of the enemy (minimum: 0).
 * - 'rate' is the rate of growth determined by notetags or Plugin Parameters.
 * - 'flat' is the flat growth value also determined by notetags/parameters.
 *
 * Build around that formula for the best results.
 *
 * ---
 *
 * MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK, EXP, Gold, Drop Rate
 * 
 *   Growth Rate:
 *   - Default rate of growth relative to parameter base value.
 * 
 *   Flat Growth:
 *   - Default flat growth amount based on level.
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
 * Version 1.05: June 16, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.04: January 1, 2021
 * * Bug Fixes!
 * ** Average Actor/Party Levels should now work properly. Fix made by Yanfly.
 * 
 * Version 1.03: November 29, 2020
 * * Feature Update!
 * ** Minimum level can no longer go under 1 for calculation purposes. Change
 *    made by Arisu. Anything below is unintended usage.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Average Actor Level and Average Party Level will now calculate levels
 *    properly if there is only one actor in the party. Fix made by Irina.
 * 
 * Version 1.01: October 18, 2020
 * * Documentation Update!
 * ** Added notetag information for <Enemy Skill id Require Level: x> which
 *    was previously left out by accident. Update made by Yanfly.
 *
 * Version 1.00 Official Release: October 21, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyLevelChange
 * @text Enemy: Change Level
 * @desc Change target enemy(ies) level by a value.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to affect.
 * @default ["0"]
 *
 * @arg Level:eval
 * @text Level
 * @desc Changes level by this value.
 * You may use JavaScript code.
 * @default +1
 *
 * @arg BypassResist:eval
 * @text Bypass Resist?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypasses <Resist Level Change> effect?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyLevelReset
 * @text Enemy: Reset Level
 * @desc Reset target enemy(ies) level to its original level.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to affect.
 * @default ["0"]
 *
 * @arg BypassResist:eval
 * @text Bypass Resist?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypasses <Resist Level Change> effect?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyLevelSet
 * @text Enemy: Set Level
 * @desc Set target enemy(ies) level to a specific value.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to affect.
 * @default ["0"]
 *
 * @arg Level:eval
 * @text Level
 * @desc Sets level to this value.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg BypassResist:eval
 * @text Bypass Resist?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypasses <Resist Level Change> effect?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugEnemyLevels
 * @text DEBUG: View Level Stats
 * @desc View the stats of specific enemies for each level.
 * This will appear in the Debug Console.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to view.
 * @default ["0"]
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
 * @param EnemyLevel
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
 * @desc General settings regarding enemy levels.
 * @default {"Levels":"","DefaultLevelType:str":"Highest Actor Level","DefaultMinLevel:num":"1","DefaultMaxLevel:num":"99","DefaultNegLevelVariance:num":"2","DefaultPositiveVariance:num":"2","Mechanics":"","PreserveRates:eval":"true","Vocabulary":"","ShowEnemyLv:eval":"true","EnemyNameFmt:str":"Lv%1 %2"}
 *
 * @param Param:struct
 * @text Parameter Growth
 * @type struct<Param>
 * @desc The default parameter growth values for Enemy Levels.
 * @default {"MaxHP":"","MaxHP_Rate:num":"0.32","MaxHP_Flat:num":"0.00","MaxMP":"","MaxMP_Rate:num":"0.16","MaxMP_Flat:num":"0.00","ATK":"","ATK_Rate:num":"0.08","ATK_Flat:num":"0.00","DEF":"","DEF_Rate:num":"0.08","DEF_Flat:num":"0.00","MAT":"","MAT_Rate:num":"0.08","MAT_Flat:num":"0.00","MDF":"","MDF_Rate:num":"0.08","MDF_Flat:num":"0.00","AGI":"","AGI_Rate:num":"0.08","AGI_Flat:num":"0.00","LUK":"","LUK_Rate:num":"0.08","LUK_Flat:num":"0.00","EXP":"","EXP_Rate:num":"0.12","EXP_Flat:num":"0.00","Gold":"","Gold_Rate:num":"0.16","Gold_Flat:num":"0.00","Drop":"","Drop_Rate:num":"0.00","Drop_Flat:num":"0.008"}
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
 * @param Levels
 *
 * @param DefaultLevelType:str
 * @text Level Type
 * @parent Levels
 * @type combo
 * @option Highest Actor Level
 * @option Highest Party Level
 * @option Average Actor Level
 * @option Average Party Level
 * @option Lowest Actor Level
 * @option Lowest Party Level
 * @option Variable x
 * @option Static x
 * @desc Choose the default level type for all enemies.
 * Replace 'x' with a number if present.
 * @default Highest Actor Level
 *
 * @param DefaultMinLevel:num
 * @text Minimum Level
 * @parent Levels
 * @desc Default minimum level for enemies.
 * @default 1
 *
 * @param DefaultMaxLevel:num
 * @text Maximum Level
 * @parent Levels
 * @desc Default maximum level for enemies.
 * @default 99
 *
 * @param DefaultNegLevelVariance:num
 * @text Negative Variance
 * @parent Levels
 * @desc Default negative level variance.
 * @default 2
 *
 * @param DefaultPositiveVariance:num
 * @text Positive Variance
 * @parent Levels
 * @desc Default positive level variance.
 * @default 2
 *
 * @param Mechanics
 *
 * @param PreserveRates:eval
 * @text Preserve HP/MP Rates?
 * @parent Mechanics
 * @type boolean
 * @on Preserve
 * @off Don't
 * @desc If level changing, preserve the enemy's HP/MP rates?
 * @default true
 *
 * @param Vocabulary
 *
 * @param ShowEnemyLv:eval
 * @text Show Enemy Level?
 * @parent Vocabulary
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show enemy levels by default? Use the notetags
 * <Show Level> and <Hide Level> to determine otherwise.
 * @default true
 *
 * @param EnemyNameFmt:str
 * @text Enemy Name Format
 * @parent Vocabulary
 * @desc Text format used for enemy names in battle.
 * %1 - Level, %2 - Enemy's Name
 * @default Lv%1 %2
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Growth Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param MaxHP
 *
 * @param MaxHP_Rate:num
 * @text Growth Rate
 * @parent MaxHP
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.32
 *
 * @param MaxHP_Flat:num
 * @text Flat Growth
 * @parent MaxHP
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param MaxMP
 *
 * @param MaxMP_Rate:num
 * @text Growth Rate
 * @parent MaxMP
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.16
 *
 * @param MaxMP_Flat:num
 * @text Flat Growth
 * @parent MaxMP
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param ATK
 *
 * @param ATK_Rate:num
 * @text Growth Rate
 * @parent ATK
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.08
 *
 * @param ATK_Flat:num
 * @text Flat Growth
 * @parent ATK
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param DEF
 *
 * @param DEF_Rate:num
 * @text Growth Rate
 * @parent DEF
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.08
 *
 * @param DEF_Flat:num
 * @text Flat Growth
 * @parent DEF
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param MAT
 *
 * @param MAT_Rate:num
 * @text Growth Rate
 * @parent MAT
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.08
 *
 * @param MAT_Flat:num
 * @text Flat Growth
 * @parent MAT
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param MDF
 *
 * @param MDF_Rate:num
 * @text Growth Rate
 * @parent MDF
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.08
 *
 * @param MDF_Flat:num
 * @text Flat Growth
 * @parent MDF
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param AGI
 *
 * @param AGI_Rate:num
 * @text Growth Rate
 * @parent AGI
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.08
 *
 * @param AGI_Flat:num
 * @text Flat Growth
 * @parent AGI
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param LUK
 *
 * @param LUK_Rate:num
 * @text Growth Rate
 * @parent LUK
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.08
 *
 * @param LUK_Flat:num
 * @text Flat Growth
 * @parent LUK
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param EXP
 *
 * @param EXP_Rate:num
 * @text Growth Rate
 * @parent EXP
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.12
 *
 * @param EXP_Flat:num
 * @text Flat Growth
 * @parent EXP
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param Gold
 *
 * @param Gold_Rate:num
 * @text Growth Rate
 * @parent Gold
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.16
 *
 * @param Gold_Flat:num
 * @text Flat Growth
 * @parent Gold
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param Drop
 *
 * @param Drop_Rate:num
 * @text Growth Rate
 * @parent Drop
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.00
 *
 * @param Drop_Flat:num
 * @text Flat Growth
 * @parent Drop
 * @desc Default flat growth amount based on level.
 * @default 0.008
 *
 */
//=============================================================================

const _0x169bc1=_0x4700;(function(_0x106fea,_0x5dc204){const _0x6b158f=_0x4700,_0x2b9a8f=_0x106fea();while(!![]){try{const _0x21dcfc=parseInt(_0x6b158f(0x68))/0x1*(parseInt(_0x6b158f(0xaf))/0x2)+parseInt(_0x6b158f(0xb6))/0x3*(parseInt(_0x6b158f(0xbd))/0x4)+parseInt(_0x6b158f(0xb8))/0x5*(-parseInt(_0x6b158f(0x109))/0x6)+parseInt(_0x6b158f(0xb0))/0x7+-parseInt(_0x6b158f(0x95))/0x8*(parseInt(_0x6b158f(0xc7))/0x9)+-parseInt(_0x6b158f(0xea))/0xa*(parseInt(_0x6b158f(0x10f))/0xb)+parseInt(_0x6b158f(0xb9))/0xc;if(_0x21dcfc===_0x5dc204)break;else _0x2b9a8f['push'](_0x2b9a8f['shift']());}catch(_0x283939){_0x2b9a8f['push'](_0x2b9a8f['shift']());}}}(_0x16b5,0xdaf60));function _0x4700(_0x5056f2,_0x2fa2c3){const _0x16b50f=_0x16b5();return _0x4700=function(_0x4700e1,_0x368dc9){_0x4700e1=_0x4700e1-0x66;let _0x4803db=_0x16b50f[_0x4700e1];return _0x4803db;},_0x4700(_0x5056f2,_0x2fa2c3);}var label=_0x169bc1(0x6c),tier=tier||0x0,dependencies=[_0x169bc1(0xa4)],pluginData=$plugins[_0x169bc1(0xde)](function(_0xa63680){const _0x2a1f69=_0x169bc1;return _0xa63680[_0x2a1f69(0xb5)]&&_0xa63680[_0x2a1f69(0xf9)][_0x2a1f69(0xed)]('['+label+']');})[0x0];VisuMZ[label][_0x169bc1(0x11f)]=VisuMZ[label][_0x169bc1(0x11f)]||{},VisuMZ['ConvertParams']=function(_0x3a5f00,_0x4a8485){const _0x314cce=_0x169bc1;for(const _0x5b8b41 in _0x4a8485){if(_0x5b8b41['match'](/(.*):(.*)/i)){const _0x549ce6=String(RegExp['$1']),_0x513714=String(RegExp['$2'])[_0x314cce(0x78)]()[_0x314cce(0x85)]();let _0x1c59d9,_0x59c76f,_0x16f256;switch(_0x513714){case _0x314cce(0xd8):_0x1c59d9=_0x4a8485[_0x5b8b41]!==''?Number(_0x4a8485[_0x5b8b41]):0x0;break;case _0x314cce(0xf6):_0x59c76f=_0x4a8485[_0x5b8b41]!==''?JSON[_0x314cce(0xe8)](_0x4a8485[_0x5b8b41]):[],_0x1c59d9=_0x59c76f[_0x314cce(0x82)](_0x51378a=>Number(_0x51378a));break;case'EVAL':_0x1c59d9=_0x4a8485[_0x5b8b41]!==''?eval(_0x4a8485[_0x5b8b41]):null;break;case _0x314cce(0xfd):_0x59c76f=_0x4a8485[_0x5b8b41]!==''?JSON[_0x314cce(0xe8)](_0x4a8485[_0x5b8b41]):[],_0x1c59d9=_0x59c76f['map'](_0x3f6f0e=>eval(_0x3f6f0e));break;case _0x314cce(0x121):_0x1c59d9=_0x4a8485[_0x5b8b41]!==''?JSON[_0x314cce(0xe8)](_0x4a8485[_0x5b8b41]):'';break;case _0x314cce(0xfc):_0x59c76f=_0x4a8485[_0x5b8b41]!==''?JSON[_0x314cce(0xe8)](_0x4a8485[_0x5b8b41]):[],_0x1c59d9=_0x59c76f[_0x314cce(0x82)](_0x315d53=>JSON[_0x314cce(0xe8)](_0x315d53));break;case _0x314cce(0x87):_0x1c59d9=_0x4a8485[_0x5b8b41]!==''?new Function(JSON[_0x314cce(0xe8)](_0x4a8485[_0x5b8b41])):new Function(_0x314cce(0x8c));break;case _0x314cce(0x90):_0x59c76f=_0x4a8485[_0x5b8b41]!==''?JSON[_0x314cce(0xe8)](_0x4a8485[_0x5b8b41]):[],_0x1c59d9=_0x59c76f[_0x314cce(0x82)](_0x2b76e2=>new Function(JSON['parse'](_0x2b76e2)));break;case'STR':_0x1c59d9=_0x4a8485[_0x5b8b41]!==''?String(_0x4a8485[_0x5b8b41]):'';break;case'ARRAYSTR':_0x59c76f=_0x4a8485[_0x5b8b41]!==''?JSON[_0x314cce(0xe8)](_0x4a8485[_0x5b8b41]):[],_0x1c59d9=_0x59c76f[_0x314cce(0x82)](_0x290b65=>String(_0x290b65));break;case _0x314cce(0x10e):_0x16f256=_0x4a8485[_0x5b8b41]!==''?JSON[_0x314cce(0xe8)](_0x4a8485[_0x5b8b41]):{},_0x1c59d9=VisuMZ[_0x314cce(0xce)]({},_0x16f256);break;case _0x314cce(0xe5):_0x59c76f=_0x4a8485[_0x5b8b41]!==''?JSON[_0x314cce(0xe8)](_0x4a8485[_0x5b8b41]):[],_0x1c59d9=_0x59c76f[_0x314cce(0x82)](_0x359c89=>VisuMZ[_0x314cce(0xce)]({},JSON[_0x314cce(0xe8)](_0x359c89)));break;default:continue;}_0x3a5f00[_0x549ce6]=_0x1c59d9;}}return _0x3a5f00;},(_0x2d9f7e=>{const _0x179240=_0x169bc1,_0x57297a=_0x2d9f7e['name'];for(const _0x46a6b4 of dependencies){if(!Imported[_0x46a6b4]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x179240(0x106)](_0x57297a,_0x46a6b4)),SceneManager[_0x179240(0x96)]();break;}}const _0x46e677=_0x2d9f7e[_0x179240(0xf9)];if(_0x46e677[_0x179240(0x9d)](/\[Version[ ](.*?)\]/i)){const _0x1da051=Number(RegExp['$1']);_0x1da051!==VisuMZ[label][_0x179240(0x99)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x179240(0x106)](_0x57297a,_0x1da051)),SceneManager[_0x179240(0x96)]());}if(_0x46e677['match'](/\[Tier[ ](\d+)\]/i)){const _0x4269e3=Number(RegExp['$1']);_0x4269e3<tier?(alert(_0x179240(0x6b)[_0x179240(0x106)](_0x57297a,_0x4269e3,tier)),SceneManager['exit']()):tier=Math[_0x179240(0xbf)](_0x4269e3,tier);}VisuMZ[_0x179240(0xce)](VisuMZ[label][_0x179240(0x11f)],_0x2d9f7e[_0x179240(0xc6)]);})(pluginData),PluginManager[_0x169bc1(0x9e)](pluginData[_0x169bc1(0x10d)],_0x169bc1(0xe2),_0x176957=>{const _0x2b15b0=_0x169bc1;if(!$gameParty[_0x2b15b0(0x110)]())return;VisuMZ[_0x2b15b0(0xce)](_0x176957,_0x176957);const _0x1e5958=_0x176957['Enemies'][_0x2b15b0(0x82)](_0x55a99a=>$gameTroop[_0x2b15b0(0x120)]()[_0x55a99a])[_0x2b15b0(0x9f)](null),_0x4064ed=_0x176957['Level'],_0xae4fa7=_0x176957[_0x2b15b0(0x118)];for(const _0x4d03d7 of _0x1e5958){if(!_0x4d03d7)continue;if(!_0xae4fa7&&_0x4d03d7[_0x2b15b0(0x8f)]())continue;_0x4d03d7[_0x2b15b0(0x84)](_0x4064ed);}}),PluginManager['registerCommand'](pluginData[_0x169bc1(0x10d)],'EnemyLevelReset',_0x359a6c=>{const _0x276708=_0x169bc1;if(!$gameParty[_0x276708(0x110)]())return;VisuMZ[_0x276708(0xce)](_0x359a6c,_0x359a6c);const _0x31b488=_0x359a6c[_0x276708(0xd6)][_0x276708(0x82)](_0x405b57=>$gameTroop[_0x276708(0x120)]()[_0x405b57])[_0x276708(0x9f)](null),_0x34998e=_0x359a6c[_0x276708(0x118)];for(const _0x2ca602 of _0x31b488){if(!_0x2ca602)continue;if(!_0x34998e&&_0x2ca602[_0x276708(0x8f)]())continue;_0x2ca602['resetLevel']();}}),PluginManager[_0x169bc1(0x9e)](pluginData[_0x169bc1(0x10d)],_0x169bc1(0xda),_0x32b50b=>{const _0x16a9ee=_0x169bc1;if(!$gameParty[_0x16a9ee(0x110)]())return;VisuMZ[_0x16a9ee(0xce)](_0x32b50b,_0x32b50b);const _0x4117d1=_0x32b50b[_0x16a9ee(0xd6)][_0x16a9ee(0x82)](_0x33966f=>$gameTroop['members']()[_0x33966f])['remove'](null),_0x3a09f5=_0x32b50b['Level'],_0x46caf3=_0x32b50b[_0x16a9ee(0x118)];for(const _0x1fe632 of _0x4117d1){if(!_0x1fe632)continue;if(!_0x46caf3&&_0x1fe632[_0x16a9ee(0x8f)]())continue;_0x1fe632[_0x16a9ee(0x7a)](_0x3a09f5);}}),PluginManager[_0x169bc1(0x9e)](pluginData['name'],_0x169bc1(0x79),_0x18a0f9=>{const _0x8fc8b8=_0x169bc1;if(!$gameParty[_0x8fc8b8(0x110)]())return;if(!$gameTemp['isPlaytest']())return;VisuMZ[_0x8fc8b8(0xce)](_0x18a0f9,_0x18a0f9);const _0x1d09a6=_0x18a0f9['Enemies']['map'](_0x352095=>$gameTroop[_0x8fc8b8(0x120)]()[_0x352095])[_0x8fc8b8(0x9f)](null);for(const _0x4a3fb6 of _0x1d09a6){if(!_0x4a3fb6)continue;const _0x1643a9=[];for(let _0x14db0d=_0x4a3fb6['minLevel']();_0x14db0d<=_0x4a3fb6['maxLevel']();_0x14db0d++){const _0xa779ed=_0x4a3fb6[_0x8fc8b8(0x92)](),_0x28f2aa=_0x14db0d-0x1,_0x5558b7={'MaxHP':Math[_0x8fc8b8(0x70)](_0x4a3fb6[_0x8fc8b8(0xf3)](0x0,_0x28f2aa,_0xa779ed[_0x8fc8b8(0xa7)][0x0])),'MaxMP':Math[_0x8fc8b8(0x70)](_0x4a3fb6[_0x8fc8b8(0xf3)](0x1,_0x28f2aa,_0xa779ed['params'][0x1])),'ATK':Math[_0x8fc8b8(0x70)](_0x4a3fb6['paramBaseApplyEnemyLevel'](0x2,_0x28f2aa,_0xa779ed['params'][0x2])),'DEF':Math[_0x8fc8b8(0x70)](_0x4a3fb6[_0x8fc8b8(0xf3)](0x3,_0x28f2aa,_0xa779ed[_0x8fc8b8(0xa7)][0x3])),'MAT':Math[_0x8fc8b8(0x70)](_0x4a3fb6[_0x8fc8b8(0xf3)](0x4,_0x28f2aa,_0xa779ed[_0x8fc8b8(0xa7)][0x4])),'MDF':Math[_0x8fc8b8(0x70)](_0x4a3fb6[_0x8fc8b8(0xf3)](0x5,_0x28f2aa,_0xa779ed['params'][0x5])),'AGI':Math['round'](_0x4a3fb6[_0x8fc8b8(0xf3)](0x6,_0x28f2aa,_0xa779ed[_0x8fc8b8(0xa7)][0x6])),'LUK':Math[_0x8fc8b8(0x70)](_0x4a3fb6[_0x8fc8b8(0xf3)](0x7,_0x28f2aa,_0xa779ed[_0x8fc8b8(0xa7)][0x7])),'Exp':Math['round'](_0x4a3fb6['expApplyEnemyLevel'](_0xa779ed[_0x8fc8b8(0x9c)],_0x28f2aa)),'Gold':Math[_0x8fc8b8(0x70)](_0x4a3fb6[_0x8fc8b8(0xa1)](_0xa779ed[_0x8fc8b8(0x66)],_0x28f2aa)),'Drop':Math[_0x8fc8b8(0x70)](_0x4a3fb6[_0x8fc8b8(0xff)](0x1,_0x28f2aa)*0x64)+'%'};_0x1643a9[_0x14db0d]=_0x5558b7;}console[_0x8fc8b8(0x105)](_0x4a3fb6[_0x8fc8b8(0x10d)]()+_0x8fc8b8(0x10b)),console[_0x8fc8b8(0xcb)](_0x1643a9);}}),VisuMZ[_0x169bc1(0x6c)][_0x169bc1(0xb1)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x169bc1(0xba)]['onDatabaseLoaded']=function(){const _0x439c50=_0x169bc1;VisuMZ[_0x439c50(0x6c)]['Scene_Boot_onDatabaseLoaded'][_0x439c50(0xcf)](this),this[_0x439c50(0xe9)]();},Scene_Boot[_0x169bc1(0xba)][_0x169bc1(0xe9)]=function(){const _0x4c049e=_0x169bc1;this[_0x4c049e(0x75)]();},VisuMZ[_0x169bc1(0x6c)]['RegExp']={'Type1':/<(?:NOTETAG):[ ](\d+)([%％])>/i,'Type2':/<(?:NOTETAG):[ ]([\+\-]\d+)>/i,'Type3':/<(?:NOTETAG):[ ](.*)>/i,'Type3nonGreedy':/<(?:NOTETAG):[ ](.*?)>/i,'Type4':/<(?:NOTETAG):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'Type5':/<(?:NOTETAG):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i,'Type6':/<(?:NOTETAG)>/i,'Type7':/<\/(?:NOTETAG)>/i,'Type8':/<(?:NOTETAG)>\s*([\s\S]*)\s*<\/(?:NOTETAG)>/i,'jsLevel':/<JS LEVEL: (.*)>/i},VisuMZ[_0x169bc1(0x6c)]['JS']={},Scene_Boot['prototype'][_0x169bc1(0x75)]=function(){const _0x42b603=_0x169bc1,_0x30b90c=$dataActors[_0x42b603(0xa5)]($dataClasses,$dataSkills,$dataItems,$dataWeapons,$dataArmors,$dataEnemies,$dataStates);for(const _0x62b51d of _0x30b90c){if(!_0x62b51d)continue;const _0x56be68=_0x42b603(0x114),_0x332f3d=VisuMZ[_0x42b603(0x6c)]['RegExp'][_0x42b603(0x114)];VisuMZ[_0x42b603(0x6c)][_0x42b603(0x76)](_0x62b51d,_0x56be68,_0x332f3d);}},VisuMZ[_0x169bc1(0x6c)]['createJS']=function(_0x4fcdaa,_0x305a58,_0x594915){const _0x3b9fdf=_0x169bc1,_0x4ed36b=_0x4fcdaa[_0x3b9fdf(0xfb)];if(_0x4ed36b[_0x3b9fdf(0x9d)](_0x594915)){const _0x37de71=String(RegExp['$1']),_0x13fa91=_0x3b9fdf(0x69)[_0x3b9fdf(0x106)](_0x37de71),_0xe5afd3=VisuMZ[_0x3b9fdf(0x6c)][_0x3b9fdf(0x89)](_0x4fcdaa,_0x305a58);VisuMZ['EnemyLevel']['JS'][_0xe5afd3]=new Function(_0x13fa91);}},VisuMZ['EnemyLevel']['createKeyJS']=function(_0x208d0c,_0x9aba83){const _0xe79806=_0x169bc1;if(VisuMZ[_0xe79806(0x89)])return VisuMZ[_0xe79806(0x89)](_0x208d0c,_0x9aba83);let _0x3f3d58='';if($dataActors[_0xe79806(0xed)](_0x208d0c))_0x3f3d58='Actor-%1-%2'['format'](_0x208d0c['id'],_0x9aba83);if($dataClasses['includes'](_0x208d0c))_0x3f3d58=_0xe79806(0xf0)[_0xe79806(0x106)](_0x208d0c['id'],_0x9aba83);if($dataSkills[_0xe79806(0xed)](_0x208d0c))_0x3f3d58=_0xe79806(0xca)[_0xe79806(0x106)](_0x208d0c['id'],_0x9aba83);if($dataItems[_0xe79806(0xed)](_0x208d0c))_0x3f3d58=_0xe79806(0xf8)[_0xe79806(0x106)](_0x208d0c['id'],_0x9aba83);if($dataWeapons[_0xe79806(0xed)](_0x208d0c))_0x3f3d58=_0xe79806(0xf4)[_0xe79806(0x106)](_0x208d0c['id'],_0x9aba83);if($dataArmors['includes'](_0x208d0c))_0x3f3d58=_0xe79806(0xcc)['format'](_0x208d0c['id'],_0x9aba83);if($dataEnemies['includes'](_0x208d0c))_0x3f3d58=_0xe79806(0xaa)[_0xe79806(0x106)](_0x208d0c['id'],_0x9aba83);if($dataStates[_0xe79806(0xed)](_0x208d0c))_0x3f3d58=_0xe79806(0xe0)[_0xe79806(0x106)](_0x208d0c['id'],_0x9aba83);return _0x3f3d58;},TextManager[_0x169bc1(0xe4)]=VisuMZ['EnemyLevel'][_0x169bc1(0x11f)][_0x169bc1(0xdf)][_0x169bc1(0x122)],VisuMZ['EnemyLevel']['Game_Action_applyItemUserEffect']=Game_Action[_0x169bc1(0xba)][_0x169bc1(0x116)],Game_Action['prototype'][_0x169bc1(0x116)]=function(_0x34bf32){const _0x29edf3=_0x169bc1;VisuMZ[_0x29edf3(0x6c)][_0x29edf3(0x77)][_0x29edf3(0xcf)](this,_0x34bf32),this[_0x29edf3(0xbc)](_0x34bf32);},Game_Action[_0x169bc1(0xba)][_0x169bc1(0xbc)]=function(_0x3eda3d){const _0x459721=_0x169bc1;if(!_0x3eda3d)return;if(!_0x3eda3d[_0x459721(0x115)]())return;if(_0x3eda3d[_0x459721(0x8f)]())return;const _0x46c681=this['item']()[_0x459721(0xfb)];if(_0x46c681[_0x459721(0x9d)](/<CHANGE ENEMY LEVEL: ([\+\-]\d+)>/i))_0x3eda3d[_0x459721(0x84)](Number(RegExp['$1']));else{if(_0x46c681[_0x459721(0x9d)](/<JS CHANGE ENEMY LEVEL: (.*)>/i))try{_0x3eda3d[_0x459721(0x84)](eval(RegExp['$1'])||0x0);}catch(_0x3a0e5b){if($gameTemp['isPlaytest']())console['log'](_0x3a0e5b);}}_0x46c681[_0x459721(0x9d)](/<RESET ENEMY LEVEL>/i)&&_0x3eda3d[_0x459721(0xe1)]();},VisuMZ[_0x169bc1(0x6c)][_0x169bc1(0xd0)]=Game_BattlerBase[_0x169bc1(0xba)][_0x169bc1(0xa0)],Game_BattlerBase[_0x169bc1(0xba)][_0x169bc1(0xa0)]=function(_0x4f674b){const _0x152461=_0x169bc1;return this[_0x152461(0xa3)](_0x4f674b)&&VisuMZ[_0x152461(0x6c)]['Game_BattlerBase_meetsSkillConditions'][_0x152461(0xcf)](this,_0x4f674b);},Game_BattlerBase[_0x169bc1(0xba)][_0x169bc1(0xa3)]=function(_0x64986){return!![];},Object['defineProperty'](Game_Enemy[_0x169bc1(0xba)],_0x169bc1(0xac),{'get':function(){const _0x220b48=_0x169bc1;return this[_0x220b48(0x11d)]();},'configurable':!![]}),Game_Enemy[_0x169bc1(0xba)]['getLevel']=function(){const _0x35cb71=_0x169bc1;return this[_0x35cb71(0xec)]=this['_level']||this[_0x35cb71(0xfa)](),this[_0x35cb71(0x81)]();},VisuMZ[_0x169bc1(0x6c)][_0x169bc1(0x8a)]=Game_Enemy['prototype']['setup'],Game_Enemy[_0x169bc1(0xba)]['setup']=function(_0x3ff142,_0x47413e,_0x268039){const _0x50e957=_0x169bc1;VisuMZ[_0x50e957(0x6c)][_0x50e957(0x8a)]['call'](this,_0x3ff142,_0x47413e,_0x268039),this['setupEnemyLevels']();},Game_Enemy['prototype'][_0x169bc1(0xc8)]=function(){const _0x18f285=_0x169bc1;this['createLevel'](),this[_0x18f285(0x11e)](),this[_0x18f285(0x7c)](![]),this[_0x18f285(0x67)](![]),this[_0x18f285(0xf1)](),this['recoverAll']();},Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0xfa)]=function(){const _0x53798f=_0x169bc1;this[_0x53798f(0xb3)](),this[_0x53798f(0x88)](),this[_0x53798f(0xc3)](),this['createOriginalLevel']();},Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0xb3)]=function(){const _0x3b30f9=_0x169bc1,_0x3a51b3=this[_0x3b30f9(0x92)]()[_0x3b30f9(0xfb)];this[_0x3b30f9(0xec)]=this['defaultEnemyLevel']();const _0x3514c2=VisuMZ[_0x3b30f9(0x6c)]['createKeyJS'](this[_0x3b30f9(0x92)](),_0x3b30f9(0x114));if(_0x3a51b3['match'](/<LEVEL: (\d+)>/i))this[_0x3b30f9(0xec)]=Number(RegExp['$1'])||0x1;else{if(_0x3a51b3[_0x3b30f9(0x9d)](/<LEVEL: (\d+) TO (\d+)>/i)){const _0x3f0d69=Number(RegExp['$1']),_0x2031b8=Number(RegExp['$2']),_0x5ea1f6=Math[_0x3b30f9(0x11c)](_0x3f0d69,_0x2031b8),_0x1b984d=Math[_0x3b30f9(0xbf)](_0x3f0d69,_0x2031b8);this[_0x3b30f9(0xec)]=Math['floor'](_0x5ea1f6+Math[_0x3b30f9(0xc0)](_0x1b984d-_0x5ea1f6+0x1));}else{if(_0x3a51b3['match'](/LEVEL VARIABLE: (\d+)/i))this[_0x3b30f9(0xec)]=$gameVariables[_0x3b30f9(0x119)](Number(RegExp['$1'])||0x1);else{if(_0x3a51b3[_0x3b30f9(0x9d)](/<LEVEL: (.*)>/i)){const _0x564ee5=String(RegExp['$1'])['toUpperCase']()['trim']();this['_level']=$gameParty[_0x3b30f9(0x6d)](_0x564ee5)||0x1;}else{if(VisuMZ[_0x3b30f9(0x6c)]['JS'][_0x3514c2])this[_0x3b30f9(0xec)]=Math[_0x3b30f9(0xe6)](VisuMZ[_0x3b30f9(0x6c)]['JS'][_0x3514c2]['call'](this,this,this))||0x1;else $gameMap&&$gameMap['hasSetEnemyLevels']()&&(this['_level']=$gameMap[_0x3b30f9(0xd5)]());}}}}},Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0x93)]=function(){const _0x1ddecd=_0x169bc1,_0x5365aa=VisuMZ['EnemyLevel'][_0x1ddecd(0x11f)][_0x1ddecd(0xdf)][_0x1ddecd(0x113)][_0x1ddecd(0x78)]()[_0x1ddecd(0x85)]();if(_0x5365aa['match'](/STATIC (\d+)/i))return Number(RegExp['$1'])||0x1;else{if(_0x5365aa['match'](/VARIABLE (\d+)/i))return $gameVariables['value'](Number(RegExp['$1'])||0x1);else return _0x5365aa[_0x1ddecd(0x9d)](/(ACTOR|PARTY) LEVEL/i)?$gameParty[_0x1ddecd(0x6d)](_0x5365aa):0x1;}},Game_Enemy['prototype'][_0x169bc1(0x88)]=function(){const _0x2e4a02=_0x169bc1,_0x3992ac=this['enemy']()['note'];if(_0x3992ac['match'](/<LEVEL BONUS: ([\+\-]\d+)>/i))this[_0x2e4a02(0xec)]+=Number(RegExp['$1']);else{if(_0x3992ac[_0x2e4a02(0x9d)](/<JS LEVEL BONUS: (.*)>/i))try{this[_0x2e4a02(0xec)]+=Math['floor'](Number(eval(RegExp['$1'])||0x0));}catch(_0x32aef5){if($gameTemp[_0x2e4a02(0xa2)]())console['log'](_0x32aef5);}}},Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0xc3)]=function(){const _0x2e72ee=_0x169bc1;let _0xc6a9e4=VisuMZ[_0x2e72ee(0x6c)]['Settings']['General']['DefaultNegLevelVariance']*-0x1,_0x52a1ab=VisuMZ['EnemyLevel']['Settings']['General']['DefaultPositiveVariance'];const _0x1f45e4=this[_0x2e72ee(0x92)]()[_0x2e72ee(0xfb)];if(_0x1f45e4[_0x2e72ee(0x9d)](/<LEVEL VARIANCE: (\d+)>/i))_0xc6a9e4=-0x1*Number(RegExp['$1']),_0x52a1ab=Number(RegExp['$1']);else{if(_0x1f45e4['match'](/<JS LEVEL VARIANCE: (.*)>/i)){let _0x2df7b9=0x0;try{_0x2df7b9=Math[_0x2e72ee(0xe6)](eval(RegExp['$1'])||0x0);}catch(_0x20307b){if($gameTemp['isPlaytest']())console[_0x2e72ee(0x105)](_0x20307b);}_0xc6a9e4=-0x1*_0x2df7b9,_0x52a1ab=_0x2df7b9;}}if(_0x1f45e4[_0x2e72ee(0x9d)](/<NEGATIVE LEVEL VARIANCE: (\d+)>/i))_0xc6a9e4=-0x1*Number(RegExp['$1']);else{if(_0x1f45e4[_0x2e72ee(0x9d)](/<JS NEGATIVE LEVEL VARIANCE: (.*)>/i))try{_0xc6a9e4=-0x1*Math[_0x2e72ee(0xe6)](eval(RegExp['$1'])||0x0);}catch(_0x18084b){if($gameTemp['isPlaytest']())console[_0x2e72ee(0x105)](_0x18084b);}}if(_0x1f45e4['match'](/<POSITIVE LEVEL VARIANCE: (\d+)>/i))_0x52a1ab=Number(RegExp['$1']);else{if(_0x1f45e4[_0x2e72ee(0x9d)](/<JS POSITIVE LEVEL VARIANCE: (.*)>/i))try{_0x52a1ab=Math[_0x2e72ee(0xe6)](eval(RegExp['$1'])||0x0);}catch(_0xf86319){if($gameTemp[_0x2e72ee(0xa2)]())console[_0x2e72ee(0x105)](_0xf86319);}}if(_0xc6a9e4>_0x52a1ab)_0x52a1ab=_0xc6a9e4;this[_0x2e72ee(0xec)]+=Math[_0x2e72ee(0xe6)](_0xc6a9e4+Math[_0x2e72ee(0xc0)](_0x52a1ab-_0xc6a9e4+0x1));},Game_Enemy['prototype'][_0x169bc1(0xfe)]=function(){const _0x42206d=_0x169bc1;this[_0x42206d(0x112)]=this[_0x42206d(0xec)];},Game_Enemy['prototype'][_0x169bc1(0xe1)]=function(){const _0x43396f=_0x169bc1;this[_0x43396f(0x7a)](this[_0x43396f(0x112)]);},Game_Enemy['prototype'][_0x169bc1(0x81)]=function(){const _0x29a9f5=_0x169bc1;if(this['_level']===undefined)this[_0x29a9f5(0xfa)]();return this['_level']=this[_0x29a9f5(0xec)][_0x29a9f5(0xae)](this['minLevel'](),this['maxLevel']()),this[_0x29a9f5(0xec)];},Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0x9a)]=function(){const _0x6c0f00=_0x169bc1;if(this[_0x6c0f00(0xc1)]!==undefined)return this[_0x6c0f00(0xc1)];const _0x470fc7=this['enemy']()[_0x6c0f00(0xfb)],_0x398a9e=this;this[_0x6c0f00(0xc1)]=VisuMZ[_0x6c0f00(0x6c)][_0x6c0f00(0x11f)][_0x6c0f00(0xdf)]['DefaultMinLevel'];if(_0x470fc7[_0x6c0f00(0x9d)](/<MINIMUM LEVEL: (\d+)>/i))this['_levelMin']=Number(RegExp['$1'])||0x1;else{if(_0x470fc7[_0x6c0f00(0x9d)](/<JS MINIMUM LEVEL: (.*)>/i))try{this[_0x6c0f00(0xc1)]=Math['floor'](eval(RegExp['$1'])||0x1);}catch(_0x33d234){if($gameTemp['isPlaytest']())console['log'](_0x33d234);}}return this[_0x6c0f00(0xc1)]=Math[_0x6c0f00(0xbf)](0x1,this[_0x6c0f00(0xc1)]),this[_0x6c0f00(0xc1)];},Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0xb4)]=function(){const _0x5932dc=_0x169bc1;if(this[_0x5932dc(0xeb)]!==undefined)return this['_levelMax'];const _0x46ac88=this['enemy']()[_0x5932dc(0xfb)],_0x499542=this;this[_0x5932dc(0xeb)]=VisuMZ[_0x5932dc(0x6c)][_0x5932dc(0x11f)][_0x5932dc(0xdf)][_0x5932dc(0x6f)];if(_0x46ac88[_0x5932dc(0x9d)](/<MAXIMUM LEVEL: (\d+)>/i))this[_0x5932dc(0xeb)]=Number(RegExp['$1'])||0x1;else{if(_0x46ac88['match'](/<JS MAXIMUM LEVEL: (.*)>/i))try{this[_0x5932dc(0xeb)]=Math[_0x5932dc(0xe6)](eval(RegExp['$1'])||0x1);}catch(_0x1a3f63){if($gameTemp[_0x5932dc(0xa2)]())console[_0x5932dc(0x105)](_0x1a3f63);}}return this[_0x5932dc(0xeb)];},Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0x7a)]=function(_0x50a10e){const _0x238a06=_0x169bc1;if(this['_level']===undefined)this[_0x238a06(0xfa)]();const _0x1988b3=this[_0x238a06(0x7b)](),_0x169fcc=this[_0x238a06(0x6a)]();this[_0x238a06(0xec)]=_0x50a10e,this['clampLevel'](),this[_0x238a06(0x94)](),VisuMZ[_0x238a06(0x6c)][_0x238a06(0x11f)][_0x238a06(0xdf)]['PreserveRates']?(this['setHp'](Math[_0x238a06(0xdd)](this[_0x238a06(0x9b)]*_0x1988b3)),this['setMp'](Math[_0x238a06(0xdd)](this['mmp']*_0x169fcc))):this[_0x238a06(0xf1)]();},Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0x84)]=function(_0x128a8d){const _0x166012=_0x169bc1;if(this['_level']===undefined)this[_0x166012(0xfa)]();this[_0x166012(0x7a)](this[_0x166012(0xec)]+_0x128a8d);},Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0x8f)]=function(){const _0x1e737a=_0x169bc1;return this['traitObjects']()[_0x1e737a(0x97)](_0x38e31c=>_0x38e31c&&_0x38e31c['note'][_0x1e737a(0x9d)](/<RESIST LEVEL CHANGE>/i));},VisuMZ[_0x169bc1(0x6c)][_0x169bc1(0x7d)]=Game_Enemy[_0x169bc1(0xba)]['name'],Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0x10d)]=function(){const _0x318ece=_0x169bc1,_0x2402db=VisuMZ[_0x318ece(0x6c)]['Game_Enemy_name']['call'](this);if(!this['isShowEnemyLevel']())return _0x2402db;return TextManager[_0x318ece(0xe4)][_0x318ece(0x106)](this[_0x318ece(0xac)],_0x2402db);},Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0xbb)]=function(){const _0x5b22dc=_0x169bc1,_0x1b6321=this[_0x5b22dc(0x92)]()[_0x5b22dc(0xfb)];if(_0x1b6321[_0x5b22dc(0x9d)](/<SHOW LEVEL>/i))return!![];else return _0x1b6321['match'](/<HIDE LEVEL>/i)?![]:VisuMZ['EnemyLevel'][_0x5b22dc(0x11f)][_0x5b22dc(0xdf)][_0x5b22dc(0x111)];},Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0xee)]=function(){const _0x3d54e6=_0x169bc1;return this['enemy']()&&this['enemy']()[_0x3d54e6(0xfb)]['match'](/<STATIC LEVEL PARAMETERS>/i);},VisuMZ[_0x169bc1(0x6c)][_0x169bc1(0xdc)]=Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0xcd)],Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0xcd)]=function(_0x37c7de){const _0x3ca71d=_0x169bc1,_0x37ff93=VisuMZ[_0x3ca71d(0x6c)]['Game_Enemy_paramBase'][_0x3ca71d(0xcf)](this,_0x37c7de),_0x41e1ff=this[_0x3ca71d(0x7e)](),_0x164886=this[_0x3ca71d(0xac)]-0x1;return this['paramBaseApplyEnemyLevel'](_0x37c7de,_0x164886,_0x37ff93+_0x41e1ff);},Game_Enemy['prototype']['otherParamBaseModifiers']=function(_0x214974){return 0x0;},Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0x11e)]=function(){const _0x43d1b4=_0x169bc1;this[_0x43d1b4(0xc5)]=[{'level':0x1,'image':this[_0x43d1b4(0x92)]()[_0x43d1b4(0x103)]}],this[_0x43d1b4(0xbe)](),this[_0x43d1b4(0xc5)][_0x43d1b4(0xd2)]((_0x240032,_0x5902e5)=>_0x240032['level']-_0x5902e5['level']),this['refreshLevelImages']();},Game_Enemy[_0x169bc1(0xba)]['parseLevelImageNotetags']=function(){const _0x5cdff3=_0x169bc1,_0x322376=this['enemy']()['note'],_0x2eb7f1=_0x322376[_0x5cdff3(0x9d)](/<LEVEL[ ](\d+)[ ]IMAGE:[ ](.*)>/gi);if(_0x2eb7f1)for(const _0x19c71d of _0x2eb7f1){if(!_0x19c71d)continue;_0x19c71d['match'](/<LEVEL[ ](\d+)[ ]IMAGE:[ ](.*)>/i);const _0x3e015c=Number(RegExp['$1'])||0x1,_0x55c908=String(RegExp['$2']);this[_0x5cdff3(0xc5)][_0x5cdff3(0xf7)]({'level':_0x3e015c,'image':_0x55c908});}if(_0x322376[_0x5cdff3(0x9d)](/<LEVEL (?:IMAGE|IMAGES)>\s*([\s\S]*)\s*<\/LEVEL (?:IMAGE|IMAGES)>/i)){const _0x4793a9=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x428de0 of _0x4793a9){if(!_0x428de0)continue;if(_0x428de0[_0x5cdff3(0x9d)](/(\d+):[ ](.*)/i)){const _0x2f59ec=Number(RegExp['$1'])||0x1,_0x16f3e4=String(RegExp['$2']);this[_0x5cdff3(0xc5)][_0x5cdff3(0xf7)]({'level':_0x2f59ec,'image':_0x16f3e4});}}}},Game_Enemy['prototype'][_0x169bc1(0x94)]=function(){const _0xf54554=_0x169bc1;this[_0xf54554(0x8d)]=this[_0xf54554(0x92)]()[_0xf54554(0x103)];for(const _0x3df9d9 of this[_0xf54554(0xc5)]){if(!_0x3df9d9)continue;this[_0xf54554(0xec)]>=_0x3df9d9[_0xf54554(0xac)]&&(this[_0xf54554(0x8d)]=_0x3df9d9[_0xf54554(0x8b)]);}},VisuMZ[_0x169bc1(0x6c)][_0x169bc1(0x11a)]=Game_Enemy['prototype'][_0x169bc1(0x103)],Game_Enemy[_0x169bc1(0xba)]['battlerName']=function(){const _0x57577f=_0x169bc1;return this['_levelBattlerName']||VisuMZ['EnemyLevel']['Game_Enemy_battlerName'][_0x57577f(0xcf)](this);},Game_Enemy['prototype'][_0x169bc1(0x7c)]=function(_0x3d4fd4){const _0x27f480=_0x169bc1;if(_0x3d4fd4&&this[_0x27f480(0xe3)]&&this[_0x27f480(0xf5)])return;const _0x439ceb=VisuMZ[_0x27f480(0x6c)][_0x27f480(0x11f)][_0x27f480(0xc4)];this[_0x27f480(0xe3)]={0x0:_0x439ceb['MaxHP_Rate'],0x1:_0x439ceb['MaxMP_Rate'],0x2:_0x439ceb[_0x27f480(0xa9)],0x3:_0x439ceb['DEF_Rate'],0x4:_0x439ceb['MAT_Rate'],0x5:_0x439ceb[_0x27f480(0x101)],0x6:_0x439ceb[_0x27f480(0xd7)],0x7:_0x439ceb[_0x27f480(0xd4)],'exp':_0x439ceb[_0x27f480(0xd1)],'gold':_0x439ceb['Gold_Rate'],'drop':_0x439ceb[_0x27f480(0x71)]},this[_0x27f480(0xf5)]={0x0:_0x439ceb['MaxHP_Flat'],0x1:_0x439ceb[_0x27f480(0xdb)],0x2:_0x439ceb[_0x27f480(0x10c)],0x3:_0x439ceb[_0x27f480(0xf2)],0x4:_0x439ceb[_0x27f480(0xc2)],0x5:_0x439ceb[_0x27f480(0x102)],0x6:_0x439ceb[_0x27f480(0x73)],0x7:_0x439ceb[_0x27f480(0xad)],'exp':_0x439ceb['EXP_Flat'],'gold':_0x439ceb[_0x27f480(0xef)],'drop':_0x439ceb[_0x27f480(0x8e)]};const _0x34fe7b=[_0x27f480(0xd3),_0x27f480(0xa6),_0x27f480(0x91),'DEF','MAT',_0x27f480(0xa8),'AGI',_0x27f480(0x117),_0x27f480(0xb7),'GOLD',_0x27f480(0x7f)],_0x166e28=this[_0x27f480(0x92)]()[_0x27f480(0xfb)];if(_0x166e28['match'](/<GROWTH RATE PER LEVEL>\s*([\s\S]*)\s*<\/GROWTH RATE PER LEVEL>/i)){const _0x331bcc=String(RegExp['$1'])[_0x27f480(0xe7)](/[\r\n]+/);for(const _0x36b4e8 of _0x331bcc){if(_0x36b4e8[_0x27f480(0x9d)](/(.*): (.*)/i)){const _0x255461=String(RegExp['$1'])[_0x27f480(0x78)]()[_0x27f480(0x85)](),_0x5eeefe=Number(eval(RegExp['$2'])||0x0),_0x10b396=_0x34fe7b['indexOf'](_0x255461);if(_0x10b396<0x8)this['_enemyLevel_GrowthRate'][_0x10b396]=_0x5eeefe;else{if(_0x10b396===0x8)this[_0x27f480(0xe3)][_0x27f480(0x9c)]=_0x5eeefe;else{if(_0x10b396===0x9)this[_0x27f480(0xe3)][_0x27f480(0x66)]=_0x5eeefe;else{if(_0x10b396===0xa)this[_0x27f480(0xe3)][_0x27f480(0xb2)]=_0x5eeefe;else continue;}}}}}}if(_0x166e28['match'](/<GROWTH FLAT PER LEVEL>\s*([\s\S]*)\s*<\/GROWTH FLAT PER LEVEL>/i)){const _0x448c0c=String(RegExp['$1'])[_0x27f480(0xe7)](/[\r\n]+/);for(const _0x41ec2c of _0x448c0c){if(_0x41ec2c['match'](/(.*): (.*)/i)){const _0x40d2ff=String(RegExp['$1'])[_0x27f480(0x78)]()['trim'](),_0x18aac7=Number(eval(RegExp['$2'])||0x0),_0x1120eb=_0x34fe7b['indexOf'](_0x40d2ff);if(_0x1120eb<0x8)this[_0x27f480(0xf5)][_0x1120eb]=_0x18aac7;else{if(_0x1120eb===0x8)this[_0x27f480(0xf5)]['exp']=_0x18aac7;else{if(_0x1120eb===0x9)this[_0x27f480(0xf5)][_0x27f480(0x66)]=_0x18aac7;else{if(_0x1120eb===0xa)this[_0x27f480(0xf5)][_0x27f480(0xb2)]=_0x18aac7;else continue;}}}}}}},Game_Enemy['prototype']['paramBaseApplyEnemyLevel']=function(_0xab03b3,_0x33baff,_0x27dc36){const _0x1f9696=_0x169bc1;if(this['isStaticLevelParameters']())return _0x27dc36;this['createEnemyLevelParamGrowth'](!![]);const _0x15a325=this;let _0xf95758=_0x27dc36;const _0x324b81=this[_0x1f9696(0xe3)][_0xab03b3],_0x50b3cd=this[_0x1f9696(0xf5)][_0xab03b3];return _0xf95758=_0x27dc36+_0x33baff*_0x27dc36*_0x324b81+_0x33baff*_0x50b3cd,_0xf95758;},VisuMZ[_0x169bc1(0x6c)][_0x169bc1(0x83)]=Game_Enemy['prototype'][_0x169bc1(0x9c)],Game_Enemy[_0x169bc1(0xba)]['exp']=function(){const _0x1ea7e0=_0x169bc1,_0x2f3f13=VisuMZ['EnemyLevel'][_0x1ea7e0(0x83)]['call'](this),_0x296a3a=this['level']-0x1;return this['expApplyEnemyLevel'](_0x2f3f13,_0x296a3a);},Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0x80)]=function(_0x21ead3,_0x40d7bf){const _0xff2adf=_0x169bc1;if(this[_0xff2adf(0xee)]())return _0x21ead3;this[_0xff2adf(0x7c)](!![]);const _0x35fea2=this;let _0x37c524=_0x21ead3;const _0x2ab06d=this[_0xff2adf(0xe3)][_0xff2adf(0x9c)],_0x3fa17b=this['_enemyLevel_GrowthFlat']['exp'];return _0x37c524=_0x21ead3+_0x40d7bf*_0x21ead3*_0x2ab06d+_0x40d7bf*_0x3fa17b,Math[_0xff2adf(0x70)](_0x37c524);},VisuMZ[_0x169bc1(0x6c)][_0x169bc1(0x10a)]=Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0x66)],Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0x66)]=function(){const _0x3fa3de=_0x169bc1,_0x936b88=VisuMZ[_0x3fa3de(0x6c)][_0x3fa3de(0x10a)]['call'](this),_0xbf49c=this[_0x3fa3de(0xac)]-0x1;return this[_0x3fa3de(0xa1)](_0x936b88,_0xbf49c);},Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0xa1)]=function(_0xb1a639,_0x4fa5c4){const _0x2e09c9=_0x169bc1;if(this[_0x2e09c9(0xee)]())return _0xb1a639;this[_0x2e09c9(0x7c)](!![]);const _0x8fcda8=this;let _0x2d9a39=_0xb1a639;const _0x287567=this[_0x2e09c9(0xe3)][_0x2e09c9(0x66)],_0x41f530=this[_0x2e09c9(0xf5)]['gold'];return _0x2d9a39=_0xb1a639+_0x4fa5c4*_0xb1a639*_0x287567+_0x4fa5c4*_0x41f530,Math['round'](_0x2d9a39);},VisuMZ[_0x169bc1(0x6c)][_0x169bc1(0x6e)]=Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0xd9)],Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0xd9)]=function(){const _0x2e5cd4=_0x169bc1,_0x232c40=VisuMZ[_0x2e5cd4(0x6c)][_0x2e5cd4(0x6e)]['call'](this),_0x1afebd=this[_0x2e5cd4(0xac)]-0x1;return this[_0x2e5cd4(0xff)](_0x232c40,_0x1afebd);},Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0xff)]=function(_0x475a9b,_0x628f06){const _0x3a79e7=_0x169bc1;if(this[_0x3a79e7(0xee)]())return _0x475a9b;this[_0x3a79e7(0x7c)](!![]);const _0x4e7cb9=this;let _0x4326fd=_0x475a9b;const _0x2d3178=this[_0x3a79e7(0xe3)][_0x3a79e7(0xb2)],_0x3215b4=this[_0x3a79e7(0xf5)]['drop'];return _0x4326fd=_0x475a9b+_0x628f06*_0x475a9b*_0x2d3178+_0x628f06*_0x3215b4,_0x4326fd;},Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0xa3)]=function(_0x181a05){const _0x5c2b6c=_0x169bc1;if(!_0x181a05)return![];this['createEnemyLevelSkillRequirements'](!![]);const _0x41941d=_0x181a05[_0x5c2b6c(0x10d)][_0x5c2b6c(0x78)]()[_0x5c2b6c(0x85)]();if(this[_0x5c2b6c(0x107)][_0x41941d])return this['level']>=this[_0x5c2b6c(0x107)][_0x41941d];const _0x2afcaf=_0x181a05['id'];if(this[_0x5c2b6c(0x72)][_0x2afcaf])return this[_0x5c2b6c(0xac)]>=this[_0x5c2b6c(0x72)][_0x2afcaf];return!![];},Game_Enemy['prototype'][_0x169bc1(0x67)]=function(_0x572d9e){const _0x2560e1=_0x169bc1;if(_0x572d9e&&this[_0x2560e1(0x107)]&&this[_0x2560e1(0x72)])return;this[_0x2560e1(0x107)]={},this[_0x2560e1(0x72)]={};const _0x3fc3c8=this[_0x2560e1(0x92)]()[_0x2560e1(0xfb)]['match'](/<ENEMY SKILL (.*) REQUIRE LEVEL: (\d+)>/gi);if(_0x3fc3c8)for(const _0x325cde of _0x3fc3c8){_0x325cde[_0x2560e1(0x9d)](/<ENEMY SKILL (.*) REQUIRE LEVEL: (\d+)>/i);const _0x38eb28=String(RegExp['$1'])[_0x2560e1(0x78)]()[_0x2560e1(0x85)](),_0x4a842c=Number(RegExp['$2']);_0x38eb28[_0x2560e1(0x9d)](/\b(\d+)\b/i)?this[_0x2560e1(0x72)][_0x38eb28]=_0x4a842c:this[_0x2560e1(0x107)][_0x38eb28]=_0x4a842c;}},VisuMZ[_0x169bc1(0x6c)][_0x169bc1(0x104)]=Game_Enemy[_0x169bc1(0xba)][_0x169bc1(0x100)],Game_Enemy['prototype']['transform']=function(_0x16adb7){const _0x4ca5f8=_0x169bc1;VisuMZ[_0x4ca5f8(0x6c)]['Game_Enemy_transform'][_0x4ca5f8(0xcf)](this,_0x16adb7),this['createLevelImages'](),this[_0x4ca5f8(0x7c)](![]),this[_0x4ca5f8(0x67)](![]);},Game_Party[_0x169bc1(0xba)][_0x169bc1(0x6d)]=function(_0x1e1eb2){const _0x305565=_0x169bc1,_0x332430=this['allMembers']()[_0x305565(0xde)](_0x5342fa=>!!_0x5342fa)['map'](_0x1d01c2=>_0x1d01c2[_0x305565(0xac)]),_0x54d840=this['battleMembers']()[_0x305565(0xde)](_0x8e626f=>!!_0x8e626f)[_0x305565(0x82)](_0x271012=>_0x271012[_0x305565(0xac)]);switch(_0x1e1eb2['toUpperCase']()['trim']()){case _0x305565(0xab):return Math['max'](..._0x332430);break;case'HIGHEST\x20PARTY\x20LEVEL':return Math['max'](..._0x54d840);break;case _0x305565(0x86):if(_0x332430[_0x305565(0x74)]<=0x1)return _0x332430[0x0]||0x1;return Math[_0x305565(0x70)](_0x332430[_0x305565(0xc9)]((_0x1479f1,_0x545536)=>_0x1479f1+_0x545536)/_0x332430[_0x305565(0x74)]);break;case _0x305565(0x11b):if(_0x54d840['length']<=0x1)return _0x54d840[0x0]||0x1;return Math[_0x305565(0x70)](_0x54d840[_0x305565(0xc9)]((_0x457f37,_0x11b375)=>_0x457f37+_0x11b375)/_0x54d840[_0x305565(0x74)]);break;case _0x305565(0x98):return Math[_0x305565(0x11c)](..._0x332430[_0x305565(0x82)](_0x51740c=>_0x51740c));break;case'LOWEST\x20PARTY\x20LEVEL':return Math[_0x305565(0x11c)](..._0x54d840[_0x305565(0x82)](_0x347f74=>_0x347f74));break;default:return 0x1;break;}},Game_Map[_0x169bc1(0xba)][_0x169bc1(0x108)]=function(){if(!$dataMap)return![];return!!this['enemyLevel']();},Game_Map[_0x169bc1(0xba)][_0x169bc1(0xd5)]=function(){const _0x5379fc=_0x169bc1;if(!$dataMap)return 0x0;const _0x3f61ab=$dataMap['note'];if(_0x3f61ab[_0x5379fc(0x9d)](/<ENEMY LEVEL: (\d+)>/i))return Number(RegExp['$1'])||0x1;else{if(_0x3f61ab[_0x5379fc(0x9d)](/<ENEMY LEVEL: (\d+) TO (\d+)>/i)){const _0x1d677c=Number(RegExp['$1']),_0x508636=Number(RegExp['$2']),_0x417ef6=Math['min'](_0x1d677c,_0x508636),_0x5b545c=Math[_0x5379fc(0xbf)](_0x1d677c,_0x508636);return Math[_0x5379fc(0xe6)](_0x417ef6+Math[_0x5379fc(0xc0)](_0x5b545c-_0x417ef6+0x1));}else{if(_0x3f61ab[_0x5379fc(0x9d)](/<ENEMY LEVEL: (.*)>/i)){const _0x19c700=String(RegExp['$1'])[_0x5379fc(0x78)]()['trim']();this['_level']=$gameParty[_0x5379fc(0x6d)](_0x19c700)||0x1;}else{if(_0x3f61ab['match'](/<JS ENEMY LEVEL: (.*)>/i))try{return Math[_0x5379fc(0xe6)](eval(RegExp['$1'])||0x0);}catch(_0xaddc6f){if($gameTemp[_0x5379fc(0xa2)]())console[_0x5379fc(0x105)](_0xaddc6f);return 0x0;}else return 0x0;}}}};function _0x16b5(){const _0x2243cf=['createLevelModifiers','Param','_levelImages','parameters','4254507htyxqq','setupEnemyLevels','reduce','Skill-%1-%2','table','Armor-%1-%2','paramBase','ConvertParams','call','Game_BattlerBase_meetsSkillConditions','EXP_Rate','sort','MAXHP','LUK_Rate','enemyLevel','Enemies','AGI_Rate','NUM','dropItemRate','EnemyLevelSet','MaxMP_Flat','Game_Enemy_paramBase','ceil','filter','General','State-%1-%2','resetLevel','EnemyLevelChange','_enemyLevel_GrowthRate','enemyLevelNameFmt','ARRAYSTRUCT','floor','split','parse','process_VisuMZ_EnemyLevel_Notetags','9580ZVgvUL','_levelMax','_level','includes','isStaticLevelParameters','Gold_Flat','Class-%1-%2','refresh','DEF_Flat','paramBaseApplyEnemyLevel','Weapon-%1-%2','_enemyLevel_GrowthFlat','ARRAYNUM','push','Item-%1-%2','description','createLevel','note','ARRAYJSON','ARRAYEVAL','createOriginalLevel','dropItemRateApplyEnemyLevel','transform','MDF_Rate','MDF_Flat','battlerName','Game_Enemy_transform','log','format','_enemyLevelRequired_SkillName','hasSetEnemyLevels','15522VtqYok','Game_Enemy_gold','\x27s\x20Base\x20Parameters\x20for\x20Each\x20Level','ATK_Flat','name','STRUCT','3278cXnVtu','inBattle','ShowEnemyLv','_originalLevel','DefaultLevelType','jsLevel','isEnemy','applyItemUserEffect','LUK','BypassResist','value','Game_Enemy_battlerName','AVERAGE\x20PARTY\x20LEVEL','min','getLevel','createLevelImages','Settings','members','JSON','EnemyNameFmt','gold','createEnemyLevelSkillRequirements','814061OSTaRs','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x201;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20value\x20=\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','mpRate','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','EnemyLevel','getLevelType','Game_Enemy_dropItemRate','DefaultMaxLevel','round','Drop_Rate','_enemyLevelRequired_SkillID','AGI_Flat','length','process_VisuMZ_EnemyLevel_JS','createJS','Game_Action_applyItemUserEffect','toUpperCase','DebugEnemyLevels','setLevel','hpRate','createEnemyLevelParamGrowth','Game_Enemy_name','otherParamBaseModifiers','DROP','expApplyEnemyLevel','clampLevel','map','Game_Enemy_exp','gainLevel','trim','AVERAGE\x20ACTOR\x20LEVEL','FUNC','createLevelBonus','createKeyJS','Game_Enemy_setup','image','return\x200','_levelBattlerName','Drop_Flat','isResistLevelChange','ARRAYFUNC','ATK','enemy','defaultEnemyLevel','refreshLevelImages','16spySaJ','exit','some','LOWEST\x20ACTOR\x20LEVEL','version','minLevel','mhp','exp','match','registerCommand','remove','meetsSkillConditions','goldApplyEnemyLevel','isPlaytest','meetsSkillConditionsEnemyLevel','VisuMZ_0_CoreEngine','concat','MAXMP','params','MDF','ATK_Rate','Enemy-%1-%2','HIGHEST\x20ACTOR\x20LEVEL','level','LUK_Flat','clamp','4RHwFNl','5823251jgKdkK','Scene_Boot_onDatabaseLoaded','drop','createBaseLevel','maxLevel','status','7404EIbFNN','EXP','2270qVSuUv','6553404eQPTDO','prototype','isShowEnemyLevel','applyItemUserEffectEnemyLevel','480mCUYkv','parseLevelImageNotetags','max','randomInt','_levelMin','MAT_Flat'];_0x16b5=function(){return _0x2243cf;};return _0x16b5();}