//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.40;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.40] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the cost of any skill that uses the
 *   'type' cost by a specified amount.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 *   - Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 * 
 * === Item Cost-Related Notetags ===
 * 
 * ---
 * 
 * <Item Cost: x name>
 * <Weapon Cost: x name>
 * <Armor Cost: x name>
 * 
 * - Used for: Skill Notetags
 * - The skill will consume items, weapons, and/or armors in order to be used.
 *   - Even non-consumable items will be consumed.
 * - Replace 'x' with a number representing the respective item cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: 5 Magic Water>
 *   <Item Cost: 2 Antidote>
 *   <Weapon Cost: 1 Short Sword>
 *   <Armor Cost: 3 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost Max: x name>
 * <Item Cost Min: x name>
 *
 * <Weapon Cost Max: x name>
 * <Weapon Cost Min: x name>
 *
 * <Armor Cost Max: x name>
 * <Armor Cost Min: x name>
 * 
 * - Used for: Skill Notetags
 * - Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * - Replace 'x' with a number representing the maximum or minimum cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * 
 * Examples:
 * 
 *   <Item Cost Max: 10 Magic Water>
 *   <Item Cost Min: 2 Antidote>
 *   <Weapon Cost Max: 3 Short Sword>
 *   <Armor Cost Min: 1 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost: +x name>
 * <Item Cost: -x name>
 *
 * <Weapon Cost: +x name>
 * <Weapon Cost: -x name>
 *
 * <Armor Cost: +x name>
 * <Armor Cost: -x name>
 * 
 * <Item Cost: x% name>
 * <Weapon Cost: x% name>
 * <Armor Cost: x% name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the item, weapon, and/or armor costs of
 *   any skill that costs those items, weapons, and/or armors by x%.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: +1 Magic Water>
 *   <Item Cost: -2 Antidote>
 *   <Weapon Cost: 50% Short Sword>
 *   <Armor Cost: 200% Cloth Armor>
 * 
 * ---
 * 
 * <Replace Item name1 Cost: name2>
 * <Replace Weapon name1 Cost: name2>
 * <Replace Armor name1 Cost: name2>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will not consume 'name1' items, weapons, or armors.
 *   Instead, the cost will be redirected to 'name2' items, weapons, or armors.
 *   - Even non-consumable items will be consumed.
 * - Replace 'name1' with text representing the respective item, weapon, or
 *   armor that is the original cost type.
 * - Replace 'name2' with text representing the respective item, weapon, or
 *   armor that will be consumed instead.
 * 
 * Examples:
 * 
 *   <Replace Item Magic Water Cost: Potion>
 *   <Replace Item Antidote Cost: Dispel Herb>
 *   <Replace Weapon Short Sword Cost: Falchion>
 *   <Replace Armor Cloth Armor Cost: Leather Armor>
 * 
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
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
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 * 
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - States with "Action End" auto-removal will also update turns at the end
 *     of each action instead of all actions.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.40: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving the "Item Cost" skill cost type found in the Plugin
 *    Parameters when involving consumable items.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.39: July 13, 2023
 * * Feature Update!
 * ** Updated the "Item Cost" skill cost type found in the Plugin Parameters to
 *    no longer consume items that are key items or nonconsumable.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.38: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added segment to <Replace x Gauge: type> in documentation:
 * *** Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * * New Features!
 * ** New "Skill Cost Type" and notetags added by Arisu and sponsored by FAQ.
 * *** <Item Cost: x name>
 * *** <Weapon Cost: x name>
 * *** <Armor Cost: x name>
 * **** The skill will consume items, weapons, and/or armors in order to be
 *      used. Even non-consumable items will be consumed.
 * *** <Item Cost Max/Min: x name>
 * *** <Weapon Cost Max/Min: x name>
 * *** <Armor Cost Max/Min: x name>
 * **** Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * *** <Item Cost: x% name>
 * *** <Weapon Cost: x% name>
 * *** <Armor Cost: x% name>
 * **** Alters cost rate of skills that would consume item, weapon, or armor.
 * *** <Item Cost: +/-x name>
 * *** <Weapon Cost: +/-x name>
 * *** <Armor Cost: +/-x name>
 * **** Alters flat costs of skills that would consume item, weapon, or armor.
 * *** <Replace Item name1 Cost: name2>
 * *** <Replace Weapon name1 Cost: name2>
 * *** <Replace Armor name1 Cost: name2>
 * **** Replaces item, weapon, or armor to be consumed for another type.
 * *** Projects with the Skills and States Core already installed will not have
 *     this update, but you can copy over the settings from a new project with
 *     the following steps:
 * **** Create a new project. Install Skills and States Core. Open up the new
 *      project's 'Skill Cost Types'.
 * **** Right click the 'Item Cost' option(s) and click copy.
 * **** Go to the target project's Skills and States Core's 'Skill Cost Types'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Only 'Item Cost' is needed as it encompasses all three types for item,
 *      weapon, and armor costs.
 * 
 * Version 1.38: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj && obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items[id];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
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
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
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
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:num
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

function _0x4254(_0x3a4f8d,_0x4018fc){const _0xb9f9ac=_0xb9f9();return _0x4254=function(_0x425446,_0x490fd0){_0x425446=_0x425446-0xb3;let _0x4ac270=_0xb9f9ac[_0x425446];return _0x4ac270;},_0x4254(_0x3a4f8d,_0x4018fc);}const _0x34766e=_0x4254;(function(_0x476aba,_0x36bee5){const _0x3412c3=_0x4254,_0x9547ea=_0x476aba();while(!![]){try{const _0x2e6163=-parseInt(_0x3412c3(0xe8))/0x1+parseInt(_0x3412c3(0x18a))/0x2*(-parseInt(_0x3412c3(0x2b1))/0x3)+-parseInt(_0x3412c3(0x314))/0x4*(parseInt(_0x3412c3(0x214))/0x5)+parseInt(_0x3412c3(0x136))/0x6+-parseInt(_0x3412c3(0x318))/0x7+parseInt(_0x3412c3(0x242))/0x8+parseInt(_0x3412c3(0x13d))/0x9;if(_0x2e6163===_0x36bee5)break;else _0x9547ea['push'](_0x9547ea['shift']());}catch(_0x16ca6e){_0x9547ea['push'](_0x9547ea['shift']());}}}(_0xb9f9,0xc3871));var label='SkillsStatesCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x34766e(0xc7)](function(_0x224bf9){const _0x558a0b=_0x34766e;return _0x224bf9[_0x558a0b(0x14b)]&&_0x224bf9[_0x558a0b(0x309)]['includes']('['+label+']');})[0x0];function _0xb9f9(){const _0x452476=['clearStateDisplay','user','ShowTurns','Game_BattlerBase_recoverAll','initMembersSkillsStatesCore','Parse_Notetags_Skill_JS','ParseSkillNotetags','jwaJk','isDcg','RefreshCacheSwitch','<troop-%1>','currentMaxValue','yhJGx','isGroupDefeatStateAffected','uUIvY','traitsSet','YUoOo','passiveStateObjects','ceil','damage','DataOffsetX','_lastStatesActionEndFrameCount','Parse_Notetags_State_ApplyRemoveLeaveJS','debuffTurns','Game_BattlerBase_buffIconIndex','Window_SkillList_maxCols','meetsSkillConditions','addPassiveStatesByNotetag','Game_BattlerBase_overwriteBuffTurns','isLearnedSkill','note','changeTextColor','CmdTextAlign','slipMp','isStateRemoved','isSkillHidden','icon','zOTSk','stateTpSlipHealJS','ICWQI','DataOffsetY','parameters','slipHp','_checkingTraitsSetSkillsStatesCore','drawExtendedParameter','_stored_debuffColor','placeGauge','removeOtherStatesOfSameCategory','Game_BattlerBase_meetsSkillConditions','valueOutlineWidth','Scene_Skill_itemWindowRect','fontSize','onEraseStateCustomJS','onDatabaseLoaded','canPaySkillCost','resetFontSettings','windowPadding','drawActorIcons','onAddStateCustomJS','meetsPassiveStateConditionSwitches','allowCreateShopStatusWindow','shopStatusWindowRect','PTIew','_stypeIDs','IconStypeMagic','isStateAddable','skillCostSeparator','deadMembers','gradientFillRect','ARRAYJSON','NUM','ayPfQ','CheckVisibleBattleNotetags','addBuff','isSkillUsableForAutoBattle','valueFontFace','eraseState','SkillMenuStatusRect','VPnUu','menuActor','auto','Game_BattlerBase_die','addPassiveStatesByPluginParameters','35967kSoEtd','onExpireDebuff','tZvAc','labelOutlineColor','HbiGu','magicSkills','clearStatesWithStateRetain','sort','skillVisibleJS','Game_Variables_onChange','%1%','Enemy','applySkillsStatesCoreEffects','indexOf','sQgyR','Aqyvj','_stateIDs','heal','Window_SkillStatus_refresh','checkShowHideJS','max','QqXgH','onExpireState','buffColor','currentDisplayedValue','onAddDebuffGlobalJS','mWHBR','addPassiveStatesFromOtherPlugins','\x5cI[%1]%2','getCurrentStateOriginKey','dvcUl','_currentTroopUniqueID','ShowData','makeCommandName','Window_SkillList_setActor','meetsSkillConditionsEnableJS','MAXHP','onRemoveState','SUCYg','TurnFontSize','KOAcJ','Game_BattlerBase_eraseBuff','skillId','ueZKW','fIxFp','SnEGs','DUWiz','WFbUl','helpWindowRectSkillsStatesCore','commandStyleCheck','skillTypeWindowRectSkillsStatesCore','Window_StatusBase_placeGauge','RTOIs','hBmfZ','eDXjb','_stateRetainType','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','drawTextEx','stateEraseJS','dMAbN','drawText','stateTpSlipDamageJS','_tempActor','skill','actorId','GaugeDrawJS','iconIndex','CoreEngine','NcUrv','iconText','MAXMP','createPassiveStatesCache','VisuMZ_2_ClassChangeSystem','skillTypeWindowRect','blOHh','MHfjb','statePassiveConditionJS','GIfvh','updateStateTurns','makeAdditionalSkillCostText','Sprite_Gauge_currentMaxValue','CmdWidth','Window_SkillList_updateHelp','isSkillTypeMatchForUse','lineHeight','createAllSkillCostText','<actor-%1>','numberFontFace','description','hMMpK','cfSwF','redraw','contents','ZwRpe','MlnHY','getStateData','buff','buffLength','_stateSteps','96jqcEVa','regenerateAll','createTurnDisplaySprite','stateAddJS','5869367SyDEcR','<enemy-%1>','GaugeMaxJS','Name','_itemWindow','prototype','onRegenerateCustomStateDamageOverTime','fontBold','uiInputPosition','hasSkill','drawParamText','qdubX','Window_StatusBase_drawActorIcons','YOySZ','setDebuffTurns','MAT','getColor','normalColor','commandName','ejrJR','gccjV','remove','GaugeCurrentJS','shopStatusWindowRectSkillsStatesCore','addCommand','#%1','WRNys','convertPassiveStates','TextJS','textSizeEx','vRfAk','dSfpw','uKRaS','Game_BattlerBase_initMembers','SkillsStatesCore','Window_SkillList_drawItem','states','getStateRetainType','Game_Unit_isAllDead','decreaseBuff','createItemWindow','PwFJT','MatchLabelGaugeColor','includesSkillsStatesCore','getClassIdWithName','statusWindowRectSkillsStatesCore','stateHpSlipHealJS','mainFontFace','removeBuff','die','LCwVA','match','version','UrRej','ATK','IconStypeNorm','ReapplyRules','onEraseDebuff','ListWindowCols','TurnOffsetX','uhZyV','getStypeIdWithName','onExpireBuffGlobalJS','FMaMB','iOinx','eraseBuff','updateStatesActionEnd','maxCols','gbCDs','Sprite_StateIcon_loadBitmap','maxItems','equips','drawExtendedSkillsStatesCoreStatus','addStateTurns','RLxRq','LTLsG','alterSkillName','UUOTv','concat','placeExactGauge','MaxTurns','canUse','itemTextAlign','Game_Switches_onChange','XZwJs','onAddState','YAbUT','currentClass','createShopStatusWindow','ezPeh','sTKwT','wVbgH','getStateOriginByKey','maxSlipDamage','commandNameWindowDrawText','clamp','_turnDisplaySprite','isStateResist','bKKvo','cEsls','onEraseDebuffGlobalJS','Game_BattlerBase_skillTpCost','skillMpCost','ijUxh','initMembers','kabbL','isPlaytest','Parse_Notetags_State_SlipEffectJS','_commandNameWindow','Game_Battler_addState','yOBdl','cSrQK','itemWindowRect','mpCost','greater','members','isRightInputMode','meetsPassiveStateConditionClasses','addDebuffTurns','_statusWindow','Game_BattlerBase_clearStates','bHXCn','NYsMU','statusWidth','_stypeId','getSkillTypes','enemy','Game_Battler_isStateAddable','removeStatesAuto','KsIUE','learnSkill','convertTargetToStateOriginKey','gainSilentTp','stateTurns','rLDFp','izjwD','tpCost','number','CVbjt','paramBuffRate','koctZ','Game_Unit_deadMembers','ColorNeutral','HqhLu','setStatusWindow','ARRAYSTR','NSdmw','gaugeRate','LfswR','ValueOutlineWidth','stepsForTurn','gaugeColor2','mpDamage','hasState','updateVisibility','resetStateCounts','SkillSceneAdjustSkillList','coAfE','process_VisuMZ_SkillsStatesCore_Skill_Notetags','SkillConditionJS','pVGhK','AGI','gaugeLineHeight','checkCacheKey','isBottomHelpMode','addWindow','PMPnj','call','_scene','split','Kgrad','regenerateAllSkillsStatesCore','scrollTo','NDNuI','getStateOrigin','callUpdateHelp','stateMpSlipDamageJS','_skillTypeWindow','CatOn','YUibB','anchor','Game_Actor_skillTypes','_stateMaxTurns','VisuMZ_1_MainMenuCore','DUaua','onAddStateGlobalJS','stypeId','VoRsZ','aEKuN','RBOJQ','resetTextColor','ColorPositive','inBattle','onExpireDebuffJS','updatedLayoutStyle','Global','setStateRetainType','_costSettings','setupSkillsStatesCore','map','TurnEndOnMap','isDebuffAffected','hide','NEGATIVE','wBPAW','testApply','aTmMa','drawActorBuffTurns','VisuMZ_1_ElementStatusCore','ARRAYNUM','toUpperCase','categories','isUseModernControls','makeSuccess','drawSkillCost','enemyId','wTaPZ','active','getStateReapplyRulings','bitmap','Buffs','_subject','ARRAYSTRUCT','_stored_state-%1-color','RefreshCacheVar','MDF','Game_BattlerBase_refresh','PGdBh','EnableLayout','refresh','ColorNegative','meetsPassiveStateConditionJS','setStateDisplay','Parse_Notetags_State_Category','JfTlH','format','Game_BattlerBase_decreaseBuff','pnUjs','boxWidth','filter','Game_BattlerBase_traitsSet','onAddDebuffJS','checkSkillConditionsNotetags','innerHeight','_shopStatusWindow','dUIlZ','KQuQf','VvVoS','Parse_Notetags_State_PassiveJS','stateColor','phZyD','%1\x20%2\x20%3','_skillIDs','aliveMembers','innerWidth','GroupDigits','isPartyAllAffectedByGroupDefeatStates','Sprite_Gauge_redraw','isSceneBattle','outlineColor','stateExpireJS','add','clearStates','shift','_endingBattle','meetsPassiveStateGlobalConditionJS','process_VisuMZ_SkillsStatesCore_State_Notetags','LabelOutlineWidth','ParseStateNotetags','vqHWg','_classIDs','Game_Battler_addBuff','500422aTnFAm','Costs','uuHyn','recalculateSlipDamageJS','test','_buffs','frameCount','setBuffTurns','getSkillIdWithName','setPassiveStateSlipDamageJS','drawActorStateTurns','checkShowHideNotetags','ShowJS','getStateDisplay','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Game_Actor_forgetSkill','parse','EKRJa','rgba(0,\x200,\x200,\x201)','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','itemLineRect','commandStyle','Scene_Skill_skillTypeWindowRect','isAllDead','oxwHg','stateHpSlipDamageJS','udcpB','Sprite_Gauge_currentValue','CgbAL','zhPRh','isActor','buffTurns','qIMJn','itemWindowRectSkillsStatesCore','PvULT','iconWidth','Window_SkillList_includes','RmZJx','Settings','applyStateCategoryRemovalEffects','VisuMZ_1_ItemsEquipsCore','wUEDW','CheckIncompatibleStates','onAddDebuff','CheckVisibleSwitchNotetags','DataFontSize','onEraseBuff','_buffTurns','LayoutStyle','setBackgroundType','valueFontSize','constructor','removeStatesByCategoryAll','isBuffOrDebuffAffected','HmhNX','isMaxBuffAffected','isStateCategoryResisted','increaseBuff','priority','updateFrame','nnQeG','checkSkillConditionsSwitchNotetags','_stateData','gainMp','fillRect','item','drawActorBuffRates','onEraseStateJS','process_VisuMZ_SkillsStatesCore_Notetags','States','shopStatusWidth','qyntz','JLlDM','gaCvH','buffIconIndex','drawActorIconsAllTurnCounters','helpAreaTop','lKhmq','4454556tzijzF','round','RmBPY','groupDefeat','Game_Battler_regenerateAll','removeState','QVtlu','14827194JqfPSn','recover\x20all','Param','success','STodU','_hidden','SQTmS','FEjct','_checkingVisuMzPassiveStateObjects','ConvertParams','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','stateCategoriesResisted','Parse_Notetags_Skill_Cost','changeOutlineColor','status','eFOlW','eOvOm','setStateTurns','pOSvh','PassiveStates','endAction','setStateData','onExpireStateCustomJS','byWye','oZvUe','usableSkills','statesByCategory','updateHelp','clearStateData','ParseClassIDs','sAhuN','_result','PresetLabelGaugeColor','drawItemStyleIcon','autoRemovalTiming','width','onEraseBuffGlobalJS','MatchLabelColor','CheckVisibleSkillNotetags','makeCurrentTroopUniqueID','cINXa','Window_SkillType_initialize','_checkingPassiveStates','gainHp','_passiveStateResults','stateMpSlipHealJS','height','checkSkillTypeMatch','allBattleMembers','Game_BattlerBase_eraseState','tkthR','buttonAssistText1','removeStatesByCategory','BattleHiddenSkillTypes','PvEFs','passiveStates','xnRXT','keys','setStateOrigin','Actor','currentMaxValueSkillsStatesCore','commandNameWindowDrawBackground','state','applyStateTurnManipulationEffects','_stateDisplay','_colorCache','hRejg','applyBuffTurnManipulationEffects','Game_BattlerBase_states','mainAreaTop','includes','setItem','helpWindowRect','gaugeColor1','ColorBuff','DEF','textColor','90XSsAQx','onEraseStateGlobalJS','_stateTurns','_battler','CmdStyle','action','NRrXy','_cache','allIcons','ZkKUQ','value','currentValue','Sprite_Gauge_gaugeRate','tTVbc','length','VisuMZ_0_CoreEngine','log','clear','colSpacing','replace','mainFontSize','clearStateRetainType','jazvH','LabelFontMainType','IlWGf','itemAt','updateTurnDisplaySprite','drawIcon','Game_Action_testApply','uXbai','redrawSkillsStatesCore','syskN','_stored_buffColor','isBuffExpired','ValueFontMainType','StackBuffMax','Gauge','zuVMe','debuffColor','text','VKlQn','slipTp','FvSWa','onExpireStateGlobalJS','applyDebuffTurnManipulationEffects','JSON','bsVbI','return\x200','TurnOffsetY','AHFYt','getColorDataFromPluginParameters','labelOutlineWidth','stateId','isBuffAffected','addPassiveStates','ZNCsH','getStateIdWithName','helpAreaHeight','mainCommandWidth','trim','iconHeight','ALL','Skills','_currentActor','slice','sBHtQ','RefUS','MRmws','skills','canClearState','_actor','nQrEQ','BattleManager_endAction','TImUP','Vnigf','paramValueByName','stateData','_stateOrigin','MjHcy','<member-%1>','Sprite_Gauge_initMembers','fDjwT','eALJM','Game_Troop_setup','ignore','_tempBattler','uZQfy','convertGaugeTypeSkillsStatesCore','PassiveConditionJS','uiMenuStyle','Game_Battler_addDebuff','Game_BattlerBase_resetStateCounts','mainAreaHeight','kKQUi','onChange','statusWindowRect','gtXkz','ParseAllNotetags','rgba(0,\x200,\x200,\x200)','adjustSkillCost','totalStateCategoryAffected','isSkillCostShown','applyItemUserEffect','clearStateOrigin','Scene_Skill_helpWindowRect','initialize','meetsSkillConditionsGlobalJS','drawItemStyleIconText','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','isCommandEnabled','getCurrentTroopUniqueID','skillEnableJS','exit','PqdHM','dpbIC','CLsFS','onExpireDebuffGlobalJS','sBHBd','onAddBuff','adjustItemWidthByShopStatus','wcjQD','toLowerCase','meetsPassiveStateConditions','name','updateCommandNameWindow','YzZun','setup','addState','isBuffPrevented','bhorp','drawActorStateData','labelFontFace','fontFace','RqfOZ','isMaxDebuffAffected','stateMaximumTurns','actor','MsNAS','177565KsNNZy','isStateAffected','getCurrentStateActiveUser','addChild','buttonAssistSwitch','Game_Action_applyItemUserEffect','ccMEM','isStateExpired','overwriteBuffTurns','actions','onAddBuffGlobalJS','currentValueSkillsStatesCore','setStypeId','createSkillCostText','Scene_Skill_statusWindowRect','ZqRWw','JclZt','LUK','floor','recoverAll','multiclasses','lPkAG','skillTypes','onExpireBuff','retrieveStateColor','commandNameWindowCenter','Sprite_StateIcon_updateFrame','center','Scene_Boot_onDatabaseLoaded','VzWkw','drawItem','_categoryWindow','addDebuff','KjPab','ActionEndUpdate','gaugeBackColor','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','right','onEraseDebuffJS','isUseSkillsStatesCoreUpdatedLayout','NEHSL','mYGfX','_phase','CanPayJS','setActor','push','9133672AFXHVJ','isStateRestrict','isStateCategoryAffected','onAddStateJS','reset','cdEwR','TvYln','WREZv','totalStateCategory','index','uiHelpPosition','Sprite_Gauge_setup','death','SnQWl','ANY','CalcJS','wMtoF','Game_Actor_learnSkill','testSkillStatesCoreNotetags','Game_BattlerBase_increaseBuff','restriction','URlWk','JJoIB','nsuSC','paySkillCost','ValueOutlineSolid','HUKoR','onAddStateMakeCustomSlipValues'];_0xb9f9=function(){return _0x452476;};return _0xb9f9();}VisuMZ[label][_0x34766e(0x10e)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x34766e(0x146)]=function(_0x5ae1c4,_0x4e0c88){const _0x371506=_0x34766e;for(const _0x20792b in _0x4e0c88){if(_0x20792b[_0x371506(0x34b)](/(.*):(.*)/i)){const _0x42af26=String(RegExp['$1']),_0x532ea1=String(RegExp['$2'])[_0x371506(0x3ea)]()[_0x371506(0x1c5)]();let _0x5e04d2,_0x219cc6,_0x5bbe4f;switch(_0x532ea1){case _0x371506(0x2a4):_0x5e04d2=_0x4e0c88[_0x20792b]!==''?Number(_0x4e0c88[_0x20792b]):0x0;break;case _0x371506(0x3e9):_0x219cc6=_0x4e0c88[_0x20792b]!==''?JSON['parse'](_0x4e0c88[_0x20792b]):[],_0x5e04d2=_0x219cc6[_0x371506(0x3df)](_0x4969a0=>Number(_0x4969a0));break;case'EVAL':_0x5e04d2=_0x4e0c88[_0x20792b]!==''?eval(_0x4e0c88[_0x20792b]):null;break;case'ARRAYEVAL':_0x219cc6=_0x4e0c88[_0x20792b]!==''?JSON[_0x371506(0xf8)](_0x4e0c88[_0x20792b]):[],_0x5e04d2=_0x219cc6[_0x371506(0x3df)](_0x4c3d85=>eval(_0x4c3d85));break;case _0x371506(0x1b7):_0x5e04d2=_0x4e0c88[_0x20792b]!==''?JSON[_0x371506(0xf8)](_0x4e0c88[_0x20792b]):'';break;case _0x371506(0x2a3):_0x219cc6=_0x4e0c88[_0x20792b]!==''?JSON[_0x371506(0xf8)](_0x4e0c88[_0x20792b]):[],_0x5e04d2=_0x219cc6[_0x371506(0x3df)](_0x4ccd04=>JSON[_0x371506(0xf8)](_0x4ccd04));break;case'FUNC':_0x5e04d2=_0x4e0c88[_0x20792b]!==''?new Function(JSON['parse'](_0x4e0c88[_0x20792b])):new Function(_0x371506(0x1b9));break;case'ARRAYFUNC':_0x219cc6=_0x4e0c88[_0x20792b]!==''?JSON[_0x371506(0xf8)](_0x4e0c88[_0x20792b]):[],_0x5e04d2=_0x219cc6[_0x371506(0x3df)](_0x306a8a=>new Function(JSON[_0x371506(0xf8)](_0x306a8a)));break;case'STR':_0x5e04d2=_0x4e0c88[_0x20792b]!==''?String(_0x4e0c88[_0x20792b]):'';break;case _0x371506(0x3a9):_0x219cc6=_0x4e0c88[_0x20792b]!==''?JSON['parse'](_0x4e0c88[_0x20792b]):[],_0x5e04d2=_0x219cc6[_0x371506(0x3df)](_0x4ec34c=>String(_0x4ec34c));break;case'STRUCT':_0x5bbe4f=_0x4e0c88[_0x20792b]!==''?JSON[_0x371506(0xf8)](_0x4e0c88[_0x20792b]):{},_0x5ae1c4[_0x42af26]={},VisuMZ[_0x371506(0x146)](_0x5ae1c4[_0x42af26],_0x5bbe4f);continue;case _0x371506(0xb6):_0x219cc6=_0x4e0c88[_0x20792b]!==''?JSON[_0x371506(0xf8)](_0x4e0c88[_0x20792b]):[],_0x5e04d2=_0x219cc6[_0x371506(0x3df)](_0x554914=>VisuMZ[_0x371506(0x146)]({},JSON[_0x371506(0xf8)](_0x554914)));break;default:continue;}_0x5ae1c4[_0x42af26]=_0x5e04d2;}}return _0x5ae1c4;},(_0x471d19=>{const _0x3b31ab=_0x34766e,_0x5c6338=_0x471d19['name'];for(const _0x35e0e6 of dependencies){if('CtIFn'!==_0x3b31ab(0x23c)){if(!Imported[_0x35e0e6]){alert(_0x3b31ab(0x238)[_0x3b31ab(0xc3)](_0x5c6338,_0x35e0e6)),SceneManager['exit']();break;}}else{let _0x233c4f=_0x508744[_0x3b31ab(0x251)]['call'](_0x77385d,_0x364731);return _0x233c4f=_0x29fa85[_0x3b31ab(0x1ed)](_0xc633b9,_0x233c4f,_0x2fee49),_0x4044fe[_0x3b31ab(0xf4)]['call'](_0x2f3815,_0x2b72a7,_0x233c4f,_0x2832cd);}}const _0x550e6e=_0x471d19['description'];if(_0x550e6e[_0x3b31ab(0x34b)](/\[Version[ ](.*?)\]/i)){const _0x1513ae=Number(RegExp['$1']);if(_0x1513ae!==VisuMZ[label][_0x3b31ab(0x34c)]){if(_0x3b31ab(0x15b)!=='sAhuN')return _0x5ed878[_0x3b31ab(0x33a)][_0x3b31ab(0x10e)]['Skills'][_0x3b31ab(0x3b4)];else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x3b31ab(0xc3)](_0x5c6338,_0x1513ae)),SceneManager['exit']();}}if(_0x550e6e[_0x3b31ab(0x34b)](/\[Tier[ ](\d+)\]/i)){if('RTOIs'!==_0x3b31ab(0x2e5))for(const _0x3bee83 of _0x19e734){_0x3bee83[_0x3b31ab(0x34b)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x4e26c9=_0x29113f[_0x3b31ab(0x2be)](_0x4f2149(_0x2fe147['$1'])[_0x3b31ab(0x3ea)]()),_0x13007f=_0x3cdb6c(_0x4e2fa3['$2']);_0x4e26c9>=0x0&&(_0x531a49[_0x3b31ab(0xef)](_0x4e26c9,_0x13007f),this[_0x3b31ab(0x3ed)](_0x147293));}else{const _0x440569=Number(RegExp['$1']);if(_0x440569<tier){if('ioqKf'===_0x3b31ab(0x1b8))return this[_0x3b31ab(0x345)]();else alert(_0x3b31ab(0x2e9)[_0x3b31ab(0xc3)](_0x5c6338,_0x440569,tier)),SceneManager[_0x3b31ab(0x1fa)]();}else tier=Math[_0x3b31ab(0x2c5)](_0x440569,tier);}}VisuMZ['ConvertParams'](VisuMZ[label][_0x3b31ab(0x10e)],_0x471d19[_0x3b31ab(0x287)]);})(pluginData),VisuMZ[_0x34766e(0x33a)][_0x34766e(0x230)]=Scene_Boot[_0x34766e(0x31d)][_0x34766e(0x293)],Scene_Boot[_0x34766e(0x31d)]['onDatabaseLoaded']=function(){const _0x4ac19d=_0x34766e;VisuMZ['SkillsStatesCore'][_0x4ac19d(0x230)][_0x4ac19d(0x3bf)](this),this[_0x4ac19d(0x12c)](),VisuMZ[_0x4ac19d(0x33a)][_0x4ac19d(0x112)]();},Scene_Boot[_0x34766e(0x31d)][_0x34766e(0x12c)]=function(){const _0x5060ea=_0x34766e;if(VisuMZ[_0x5060ea(0x1eb)])return;this[_0x5060ea(0x3b6)](),this[_0x5060ea(0xe2)]();},Scene_Boot[_0x34766e(0x31d)][_0x34766e(0x3b6)]=function(){const _0xdd3e20=_0x34766e;for(const _0x1cced5 of $dataSkills){if(_0xdd3e20(0x13c)==='QVtlu'){if(!_0x1cced5)continue;VisuMZ[_0xdd3e20(0x33a)][_0xdd3e20(0x149)](_0x1cced5),VisuMZ['SkillsStatesCore'][_0xdd3e20(0x263)](_0x1cced5);}else{const _0x14cfc5=_0x5eb365['parse']('['+_0x33d6af['$1']['match'](/\d+/g)+']');for(const _0x30a96d of _0x14cfc5){if(_0xda0c31[_0xdd3e20(0x27b)](_0x30a96d))return!![];}return![];}}},Scene_Boot[_0x34766e(0x31d)]['process_VisuMZ_SkillsStatesCore_State_Notetags']=function(){const _0x5cccbf=_0x34766e;for(const _0x5e30fc of $dataStates){if('jwaJk'===_0x5cccbf(0x265)){if(!_0x5e30fc)continue;VisuMZ[_0x5cccbf(0x33a)]['Parse_Notetags_State_Category'](_0x5e30fc),VisuMZ['SkillsStatesCore'][_0x5cccbf(0xd0)](_0x5e30fc),VisuMZ[_0x5cccbf(0x33a)][_0x5cccbf(0x383)](_0x5e30fc),VisuMZ[_0x5cccbf(0x33a)]['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x5e30fc);}else this['_statusWindow']=_0x5308e2,this[_0x5cccbf(0x3c7)]();}},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x264)]=VisuMZ['ParseSkillNotetags'],VisuMZ['ParseSkillNotetags']=function(_0x36e080){const _0x6da6a3=_0x34766e;VisuMZ[_0x6da6a3(0x33a)][_0x6da6a3(0x264)][_0x6da6a3(0x3bf)](this,_0x36e080),VisuMZ[_0x6da6a3(0x33a)]['Parse_Notetags_Skill_Cost'](_0x36e080),VisuMZ[_0x6da6a3(0x33a)]['Parse_Notetags_Skill_JS'](_0x36e080);},VisuMZ[_0x34766e(0x33a)]['ParseStateNotetags']=VisuMZ[_0x34766e(0xe4)],VisuMZ['ParseStateNotetags']=function(_0x8009f7){const _0x194ce1=_0x34766e;VisuMZ[_0x194ce1(0x33a)][_0x194ce1(0xe4)][_0x194ce1(0x3bf)](this,_0x8009f7),VisuMZ[_0x194ce1(0x33a)]['Parse_Notetags_State_Category'](_0x8009f7),VisuMZ['SkillsStatesCore'][_0x194ce1(0xd0)](_0x8009f7),VisuMZ[_0x194ce1(0x33a)][_0x194ce1(0x383)](_0x8009f7),VisuMZ[_0x194ce1(0x33a)][_0x194ce1(0x274)](_0x8009f7);},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x149)]=function(_0x550f83){const _0x43f172=_0x34766e,_0x4c900f=_0x550f83[_0x43f172(0x27c)];_0x4c900f['match'](/<MP COST:[ ](\d+)>/i)&&(_0x550f83[_0x43f172(0x389)]=Number(RegExp['$1']));if(_0x4c900f['match'](/<TP COST:[ ](\d+)>/i)){if(_0x43f172(0x1cb)==='sBHtQ')_0x550f83[_0x43f172(0x3a0)]=Number(RegExp['$1']);else{const _0x4dfd45=[];for(const _0x488791 of this[_0x43f172(0x396)]()[_0x43f172(0x21d)]){const _0x5a2bb6=_0x4ac12d[_0x488791[_0x43f172(0x2db)]];if(_0x5a2bb6&&!_0x4dfd45[_0x43f172(0x183)](_0x5a2bb6))_0x4dfd45['push'](_0x5a2bb6);}return _0x4dfd45;}}},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x1f9)]={},VisuMZ[_0x34766e(0x33a)]['skillVisibleJS']={},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x263)]=function(_0x23fda3){const _0x13296f=_0x34766e,_0x52ba9d=_0x23fda3['note'];if(_0x52ba9d['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x438c14=String(RegExp['$1']),_0x96f754=_0x13296f(0xf6)['format'](_0x438c14);VisuMZ[_0x13296f(0x33a)]['skillEnableJS'][_0x23fda3['id']]=new Function(_0x13296f(0x2f0),_0x96f754);}if(_0x52ba9d[_0x13296f(0x34b)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x4b8610=String(RegExp['$1']),_0x48ae58=_0x13296f(0x1f6)[_0x13296f(0xc3)](_0x4b8610);VisuMZ[_0x13296f(0x33a)][_0x13296f(0x2b9)][_0x23fda3['id']]=new Function('skill',_0x48ae58);}},VisuMZ['SkillsStatesCore'][_0x34766e(0xc1)]=function(_0x3af0ce){const _0x2a3c87=_0x34766e;_0x3af0ce[_0x2a3c87(0x3eb)]=[_0x2a3c87(0x1c7),_0x2a3c87(0x250)];const _0x11a6f9=_0x3af0ce[_0x2a3c87(0x27c)],_0x3baab2=_0x11a6f9[_0x2a3c87(0x34b)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x3baab2){if('KOAcJ'!==_0x2a3c87(0x2d9))this[_0x2a3c87(0x1d7)]=this[_0x2a3c87(0x1d7)]||{},delete this[_0x2a3c87(0x1d7)][_0xa14a6d];else for(const _0x1588b7 of _0x3baab2){if(_0x2a3c87(0x231)!==_0x2a3c87(0x100)){_0x1588b7['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x353161=String(RegExp['$1'])[_0x2a3c87(0x3ea)]()[_0x2a3c87(0x1c5)]()['split'](',');for(const _0x5b529b of _0x353161){_0x3af0ce[_0x2a3c87(0x3eb)][_0x2a3c87(0x241)](_0x5b529b['trim']());}}else return _0x2a3c87(0x2f6);}}if(_0x11a6f9[_0x2a3c87(0x34b)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if(_0x2a3c87(0x173)!==_0x2a3c87(0x1bb)){const _0x3a06c3=RegExp['$1']['split'](/[\r\n]+/);for(const _0x55ff87 of _0x3a06c3){_0x3af0ce[_0x2a3c87(0x3eb)][_0x2a3c87(0x241)](_0x55ff87['toUpperCase']()[_0x2a3c87(0x1c5)]());}}else{const _0x1c9269=_0x3f3fca['getStypeIdWithName'](_0x2a5bcf);if(_0x1c9269)this[_0x2a3c87(0x29d)][_0x51ff70['id']][_0x2a3c87(0x241)](_0x1c9269);}}if(_0x11a6f9[_0x2a3c87(0x34b)](/<POSITIVE STATE>/i)){if(_0x2a3c87(0x39f)===_0x2a3c87(0x39f))_0x3af0ce[_0x2a3c87(0x3eb)][_0x2a3c87(0x241)]('POSITIVE');else{const _0x250f12=_0x4a1022(_0x13018e['$1']);_0x250f12<_0x4c5f9f?(_0x3f3896('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x2a3c87(0xc3)](_0x6c45f9,_0x250f12,_0x465842)),_0x821f1d['exit']()):_0x2a3bf3=_0x532c0a[_0x2a3c87(0x2c5)](_0x250f12,_0x2a365e);}}_0x11a6f9[_0x2a3c87(0x34b)](/<NEGATIVE STATE>/i)&&(_0x2a3c87(0x141)==='STodU'?_0x3af0ce[_0x2a3c87(0x3eb)][_0x2a3c87(0x241)](_0x2a3c87(0x3e3)):(_0x9b0a92=_0x3fa034(_0x528e39['$1']),_0x3c5a5c=_0x57ff4e(_0x132e8d['$2'])));},VisuMZ['SkillsStatesCore'][_0x34766e(0x2fd)]={},VisuMZ[_0x34766e(0x33a)][_0x34766e(0xd0)]=function(_0x2bc847){const _0x41803b=_0x34766e,_0x3458eb=_0x2bc847[_0x41803b(0x27c)];if(_0x3458eb[_0x41803b(0x34b)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x3cc498=String(RegExp['$1']),_0x47141f=_0x41803b(0xfb)[_0x41803b(0xc3)](_0x3cc498);VisuMZ['SkillsStatesCore'][_0x41803b(0x2fd)][_0x2bc847['id']]=new Function(_0x41803b(0x17b),_0x47141f);}},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x101)]={},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x346)]={},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x3c8)]={},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x16a)]={},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x2ee)]={},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x284)]={},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x383)]=function(_0x1a9ea3){const _0x3b6ced=_0x34766e,_0x3da067=_0x1a9ea3[_0x3b6ced(0x27c)],_0x570bd6=_0x3b6ced(0x147);if(_0x3da067[_0x3b6ced(0x34b)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x5599a2=String(RegExp['$1']),_0x8cc01c=_0x570bd6[_0x3b6ced(0xc3)](_0x5599a2,_0x3b6ced(0x271),-0x1,'slipHp');VisuMZ[_0x3b6ced(0x33a)][_0x3b6ced(0x101)][_0x1a9ea3['id']]=new Function(_0x3b6ced(0x1be),_0x8cc01c);}else{if(_0x3da067[_0x3b6ced(0x34b)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x2c5353=String(RegExp['$1']),_0x4e056c=_0x570bd6['format'](_0x2c5353,_0x3b6ced(0x2c2),0x1,'slipHp');VisuMZ[_0x3b6ced(0x33a)][_0x3b6ced(0x346)][_0x1a9ea3['id']]=new Function(_0x3b6ced(0x1be),_0x4e056c);}}if(_0x3da067[_0x3b6ced(0x34b)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){if(_0x3b6ced(0x2fe)!=='nyBYH'){const _0x40ed74=String(RegExp['$1']),_0x5a2a25=_0x570bd6[_0x3b6ced(0xc3)](_0x40ed74,_0x3b6ced(0x271),-0x1,'slipMp');VisuMZ[_0x3b6ced(0x33a)][_0x3b6ced(0x3c8)][_0x1a9ea3['id']]=new Function(_0x3b6ced(0x1be),_0x5a2a25);}else{if(_0x5b527e[_0x3b6ced(0x194)](_0x1239b2))return!![];}}else{if(_0x3da067[_0x3b6ced(0x34b)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x30bead=String(RegExp['$1']),_0x428826=_0x570bd6[_0x3b6ced(0xc3)](_0x30bead,_0x3b6ced(0x2c2),0x1,_0x3b6ced(0x27f));VisuMZ[_0x3b6ced(0x33a)][_0x3b6ced(0x16a)][_0x1a9ea3['id']]=new Function(_0x3b6ced(0x1be),_0x428826);}}if(_0x3da067[_0x3b6ced(0x34b)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x4b57a1=String(RegExp['$1']),_0x15241f=_0x570bd6[_0x3b6ced(0xc3)](_0x4b57a1,_0x3b6ced(0x271),-0x1,_0x3b6ced(0x1b3));VisuMZ[_0x3b6ced(0x33a)]['stateTpSlipDamageJS'][_0x1a9ea3['id']]=new Function('stateId',_0x15241f);}else{if(_0x3da067['match'](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x49c744=String(RegExp['$1']),_0x10b7c4=_0x570bd6['format'](_0x49c744,_0x3b6ced(0x2c2),0x1,_0x3b6ced(0x1b3));VisuMZ[_0x3b6ced(0x33a)][_0x3b6ced(0x284)][_0x1a9ea3['id']]=new Function(_0x3b6ced(0x1be),_0x10b7c4);}}},VisuMZ['SkillsStatesCore'][_0x34766e(0x317)]={},VisuMZ[_0x34766e(0x33a)]['stateEraseJS']={},VisuMZ['SkillsStatesCore'][_0x34766e(0xdc)]={},VisuMZ[_0x34766e(0x33a)]['Parse_Notetags_State_ApplyRemoveLeaveJS']=function(_0x19c8ae){const _0x3f03cc=_0x34766e,_0xb44de6=_0x19c8ae[_0x3f03cc(0x27c)],_0x56d8f7='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0xb44de6['match'](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){if('HEZZI'!==_0x3f03cc(0x207)){const _0x5ba6d3=String(RegExp['$1']),_0x4b4688=_0x56d8f7[_0x3f03cc(0xc3)](_0x5ba6d3);VisuMZ['SkillsStatesCore'][_0x3f03cc(0x317)][_0x19c8ae['id']]=new Function('stateId',_0x4b4688);}else{if(!_0x42c486['isLearnedSkill'](_0x49e81a))return![];}}if(_0xb44de6[_0x3f03cc(0x34b)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x402bad=String(RegExp['$1']),_0x309e45=_0x56d8f7[_0x3f03cc(0xc3)](_0x402bad);VisuMZ['SkillsStatesCore'][_0x3f03cc(0x2eb)][_0x19c8ae['id']]=new Function('stateId',_0x309e45);}if(_0xb44de6['match'](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x48e45a=String(RegExp['$1']),_0x6d9c44=_0x56d8f7['format'](_0x48e45a);VisuMZ[_0x3f03cc(0x33a)][_0x3f03cc(0xdc)][_0x19c8ae['id']]=new Function(_0x3f03cc(0x1be),_0x6d9c44);}},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x112)]=function(){const _0x36134c=_0x34766e;if(!VisuMZ[_0x36134c(0x33a)][_0x36134c(0x10e)][_0x36134c(0x12d)][_0x36134c(0x236)])return;for(const _0x397e32 of $dataStates){if(!_0x397e32)continue;_0x397e32[_0x36134c(0x256)]===0x4&&_0x397e32[_0x36134c(0x15f)]===0x1&&(_0x36134c(0x213)===_0x36134c(0x1e7)?(_0x2632a9[_0x36134c(0x33a)][_0x36134c(0x22e)][_0x36134c(0x3bf)](this),this[_0x36134c(0x1a4)]()):_0x397e32['autoRemovalTiming']=0x2);}},DataManager['getClassIdWithName']=function(_0x1bf90a){const _0x228a97=_0x34766e;_0x1bf90a=_0x1bf90a[_0x228a97(0x3ea)]()[_0x228a97(0x1c5)](),this[_0x228a97(0xe6)]=this['_classIDs']||{};if(this[_0x228a97(0xe6)][_0x1bf90a])return this['_classIDs'][_0x1bf90a];for(const _0x369e43 of $dataClasses){if(!_0x369e43)continue;let _0x17f957=_0x369e43[_0x228a97(0x205)];_0x17f957=_0x17f957['replace'](/\x1I\[(\d+)\]/gi,''),_0x17f957=_0x17f957[_0x228a97(0x19d)](/\\I\[(\d+)\]/gi,''),this[_0x228a97(0xe6)][_0x17f957[_0x228a97(0x3ea)]()[_0x228a97(0x1c5)]()]=_0x369e43['id'];}return this['_classIDs'][_0x1bf90a]||0x0;},DataManager[_0x34766e(0x395)]=function(_0x43033e){const _0x1e98d9=_0x34766e;this[_0x1e98d9(0x29d)]=this[_0x1e98d9(0x29d)]||{};if(this[_0x1e98d9(0x29d)][_0x43033e['id']])return this[_0x1e98d9(0x29d)][_0x43033e['id']];this[_0x1e98d9(0x29d)][_0x43033e['id']]=[_0x43033e[_0x1e98d9(0x3d2)]];if(_0x43033e[_0x1e98d9(0x27c)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('FvSWa'===_0x1e98d9(0x1b4)){const _0x1c1e0b=JSON[_0x1e98d9(0xf8)]('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x1e98d9(0x29d)][_0x43033e['id']]=this['_stypeIDs'][_0x43033e['id']][_0x1e98d9(0x366)](_0x1c1e0b);}else{let _0x23e5eb=_0x50602e[_0x1e98d9(0x33a)][_0x1e98d9(0x3a5)]['call'](this);return _0x36c96b[_0x1e98d9(0xe0)]&&(_0x23e5eb=_0x23e5eb[_0x1e98d9(0x366)](this[_0x1e98d9(0x38b)]()['filter'](_0x420c47=>_0x420c47['isGroupDefeatStateAffected']()))),_0x23e5eb;}}else{if(_0x43033e[_0x1e98d9(0x27c)][_0x1e98d9(0x34b)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x545c9b=RegExp['$1']['split'](',');for(const _0x257d7d of _0x545c9b){if(_0x1e98d9(0x3c5)===_0x1e98d9(0x3c5)){const _0x5c62de=DataManager['getStypeIdWithName'](_0x257d7d);if(_0x5c62de)this[_0x1e98d9(0x29d)][_0x43033e['id']][_0x1e98d9(0x241)](_0x5c62de);}else _0x54eff0=![],this[_0x1e98d9(0x169)][_0x438c96]=_0x2ea054;}}}return this['_stypeIDs'][_0x43033e['id']];},DataManager[_0x34766e(0x355)]=function(_0x5ca8e2){const _0x1809b6=_0x34766e;_0x5ca8e2=_0x5ca8e2[_0x1809b6(0x3ea)]()[_0x1809b6(0x1c5)](),this[_0x1809b6(0x29d)]=this['_stypeIDs']||{};if(this[_0x1809b6(0x29d)][_0x5ca8e2])return this['_stypeIDs'][_0x5ca8e2];for(let _0x1e757b=0x1;_0x1e757b<0x64;_0x1e757b++){if(_0x1809b6(0x1db)===_0x1809b6(0x1db)){if(!$dataSystem[_0x1809b6(0x22a)][_0x1e757b])continue;let _0x29600d=$dataSystem[_0x1809b6(0x22a)][_0x1e757b][_0x1809b6(0x3ea)]()[_0x1809b6(0x1c5)]();_0x29600d=_0x29600d[_0x1809b6(0x19d)](/\x1I\[(\d+)\]/gi,''),_0x29600d=_0x29600d[_0x1809b6(0x19d)](/\\I\[(\d+)\]/gi,''),this[_0x1809b6(0x29d)][_0x29600d]=_0x1e757b;}else{if(!_0x1f147f[_0x1809b6(0x194)](_0x1389bd))return!![];}}return this[_0x1809b6(0x29d)][_0x5ca8e2]||0x0;},DataManager[_0x34766e(0xf0)]=function(_0x5b00ad){const _0x46ef31=_0x34766e;_0x5b00ad=_0x5b00ad['toUpperCase']()[_0x46ef31(0x1c5)](),this[_0x46ef31(0xd4)]=this[_0x46ef31(0xd4)]||{};if(this[_0x46ef31(0xd4)][_0x5b00ad])return this[_0x46ef31(0xd4)][_0x5b00ad];for(const _0x3eddcc of $dataSkills){if(_0x46ef31(0x1d4)!=='dnBaD'){if(!_0x3eddcc)continue;this['_skillIDs'][_0x3eddcc[_0x46ef31(0x205)][_0x46ef31(0x3ea)]()['trim']()]=_0x3eddcc['id'];}else this['isStateExpired'](_0x44d566['id'])&&_0x21e7cd[_0x46ef31(0x15f)]===_0x2b1198&&(this[_0x46ef31(0x13b)](_0x443ee3['id']),this['onExpireState'](_0x2431c3['id']),this[_0x46ef31(0x1b5)](_0x401127['id']));}return this['_skillIDs'][_0x5b00ad]||0x0;},DataManager['getStateIdWithName']=function(_0x41ecca){const _0x27a636=_0x34766e;_0x41ecca=_0x41ecca[_0x27a636(0x3ea)]()[_0x27a636(0x1c5)](),this[_0x27a636(0x2c1)]=this[_0x27a636(0x2c1)]||{};if(this[_0x27a636(0x2c1)][_0x41ecca])return this['_stateIDs'][_0x41ecca];for(const _0x2e1531 of $dataStates){if(!_0x2e1531)continue;this[_0x27a636(0x2c1)][_0x2e1531[_0x27a636(0x205)][_0x27a636(0x3ea)]()[_0x27a636(0x1c5)]()]=_0x2e1531['id'];}return this[_0x27a636(0x2c1)][_0x41ecca]||0x0;},DataManager[_0x34766e(0x211)]=function(_0x3e85ee){const _0x42ff58=_0x34766e;this[_0x42ff58(0x3ce)]=this[_0x42ff58(0x3ce)]||{};if(this[_0x42ff58(0x3ce)][_0x3e85ee])return this['_stateMaxTurns'][_0x3e85ee];return $dataStates[_0x3e85ee][_0x42ff58(0x27c)][_0x42ff58(0x34b)](/<MAX TURNS:[ ](\d+)>/i)?this['_stateMaxTurns'][_0x3e85ee]=Number(RegExp['$1']):this[_0x42ff58(0x3ce)][_0x3e85ee]=VisuMZ[_0x42ff58(0x33a)][_0x42ff58(0x10e)][_0x42ff58(0x12d)]['MaxTurns'],this['_stateMaxTurns'][_0x3e85ee];},ColorManager['getColorDataFromPluginParameters']=function(_0x5ac6b3,_0x486a4c){const _0x38772a=_0x34766e;_0x486a4c=String(_0x486a4c),this[_0x38772a(0x17e)]=this[_0x38772a(0x17e)]||{};if(_0x486a4c[_0x38772a(0x34b)](/#(.*)/i)){if(_0x38772a(0x338)===_0x38772a(0x338))this['_colorCache'][_0x5ac6b3]=_0x38772a(0x331)[_0x38772a(0xc3)](String(RegExp['$1']));else for(const _0x1c3dcd of _0xa67455){_0x1c3dcd[_0x38772a(0x34b)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x2a8df3=_0x1c002f[_0x38772a(0x2be)](_0x2134e1(_0x4b608d['$1'])[_0x38772a(0x3ea)]()),_0x589dfd=_0x9f4623(_0x5dad9d['$2']);_0x2a8df3>=0x0&&(_0x30229d[_0x38772a(0x326)](_0x2a8df3,_0x589dfd),this[_0x38772a(0x3ed)](_0x12786d));}}else this[_0x38772a(0x17e)][_0x5ac6b3]=this[_0x38772a(0x189)](Number(_0x486a4c));return this[_0x38772a(0x17e)][_0x5ac6b3];},ColorManager[_0x34766e(0x328)]=function(_0x17f795){const _0x21d8b9=_0x34766e;return _0x17f795=String(_0x17f795),_0x17f795['match'](/#(.*)/i)?_0x21d8b9(0x331)['format'](String(RegExp['$1'])):_0x21d8b9(0x2e7)===_0x21d8b9(0x34d)?_0x19bc50['prototype'][_0x21d8b9(0x393)]():this[_0x21d8b9(0x189)](Number(_0x17f795));},ColorManager[_0x34766e(0xd1)]=function(_0x11c2fd){const _0x3dbb8a=_0x34766e;if(typeof _0x11c2fd===_0x3dbb8a(0x3a1))_0x11c2fd=$dataStates[_0x11c2fd];const _0x106265=_0x3dbb8a(0xb7)[_0x3dbb8a(0xc3)](_0x11c2fd['id']);this[_0x3dbb8a(0x17e)]=this[_0x3dbb8a(0x17e)]||{};if(this[_0x3dbb8a(0x17e)][_0x106265])return this[_0x3dbb8a(0x17e)][_0x106265];const _0x447347=this['retrieveStateColor'](_0x11c2fd);return this[_0x3dbb8a(0x1bc)](_0x106265,_0x447347);},ColorManager['retrieveStateColor']=function(_0x141986){const _0x33d444=_0x34766e,_0x5befce=_0x141986[_0x33d444(0x27c)];if(_0x5befce[_0x33d444(0x34b)](/<TURN COLOR:[ ](.*)>/i)){if('Ykoss'==='Ykoss')return String(RegExp['$1']);else{const _0x4f86a4=_0x93d687['note'];if(_0x4f86a4[_0x33d444(0x34b)](/<HIDE IN BATTLE>/i)&&_0xccd6a4[_0x33d444(0x3d8)]())return![];else return _0x4f86a4[_0x33d444(0x34b)](/<HIDE OUTSIDE BATTLE>/i)&&!_0x3c2def[_0x33d444(0x3d8)]()?![]:!![];}}else{if(_0x5befce[_0x33d444(0x34b)](/<POSITIVE STATE>/i)){if(_0x33d444(0xcd)!==_0x33d444(0xcd))this['contents'][_0x33d444(0xdb)]=_0x4a2f0f;else return VisuMZ[_0x33d444(0x33a)]['Settings'][_0x33d444(0x12d)][_0x33d444(0x3d7)];}else return _0x5befce[_0x33d444(0x34b)](/<NEGATIVE STATE>/i)?VisuMZ[_0x33d444(0x33a)][_0x33d444(0x10e)][_0x33d444(0x12d)][_0x33d444(0xbe)]:VisuMZ[_0x33d444(0x33a)][_0x33d444(0x10e)][_0x33d444(0x12d)][_0x33d444(0x3a6)];}},ColorManager[_0x34766e(0x2c8)]=function(){const _0x105f9a=_0x34766e,_0x1586c3=_0x105f9a(0x1aa);this[_0x105f9a(0x17e)]=this[_0x105f9a(0x17e)]||{};if(this[_0x105f9a(0x17e)][_0x1586c3])return this['_colorCache'][_0x1586c3];const _0x331673=VisuMZ[_0x105f9a(0x33a)][_0x105f9a(0x10e)]['Buffs'][_0x105f9a(0x187)];return this[_0x105f9a(0x1bc)](_0x1586c3,_0x331673);},ColorManager['debuffColor']=function(){const _0x414b1f=_0x34766e,_0x3c24c6=_0x414b1f(0x28b);this[_0x414b1f(0x17e)]=this[_0x414b1f(0x17e)]||{};if(this[_0x414b1f(0x17e)][_0x3c24c6])return this[_0x414b1f(0x17e)][_0x3c24c6];const _0x2810ee=VisuMZ[_0x414b1f(0x33a)][_0x414b1f(0x10e)]['Buffs']['ColorDebuff'];return this[_0x414b1f(0x1bc)](_0x3c24c6,_0x2810ee);},SceneManager['isSceneBattle']=function(){const _0xa35459=_0x34766e;return this[_0xa35459(0x3c0)]&&this[_0xa35459(0x3c0)]['constructor']===Scene_Battle;},VisuMZ['SkillsStatesCore'][_0x34766e(0x1d2)]=BattleManager[_0x34766e(0x151)],BattleManager[_0x34766e(0x151)]=function(){const _0x98bbb9=_0x34766e;this[_0x98bbb9(0x35a)](),VisuMZ['SkillsStatesCore']['BattleManager_endAction']['call'](this);},BattleManager[_0x34766e(0x35a)]=function(){const _0x43450f=_0x34766e,_0x1e5cc3=VisuMZ[_0x43450f(0x33a)][_0x43450f(0x10e)][_0x43450f(0x12d)];if(!_0x1e5cc3)return;if(_0x1e5cc3['ActionEndUpdate']===![])return;if(!this[_0x43450f(0xb5)])return;this[_0x43450f(0xb5)][_0x43450f(0x35a)]();},Game_Battler[_0x34766e(0x31d)][_0x34766e(0x35a)]=function(){const _0x4beac4=_0x34766e;if(BattleManager[_0x4beac4(0x23e)]!==_0x4beac4(0x18f))return;if(this[_0x4beac4(0x273)]===Graphics['frameCount'])return;this[_0x4beac4(0x273)]=Graphics[_0x4beac4(0xee)];for(const _0x176b60 of this['_states']){const _0x3bf621=$dataStates[_0x176b60];if(!_0x3bf621)continue;if(_0x3bf621[_0x4beac4(0x15f)]!==0x1)continue;this['_stateTurns'][_0x176b60]>0x0&&(_0x4beac4(0x10d)!==_0x4beac4(0x26a)?this[_0x4beac4(0x18c)][_0x176b60]--:this[_0x4beac4(0x33d)]()!==''?this[_0x4beac4(0x2b7)]():(_0xf7b469[_0x4beac4(0x33a)][_0x4beac4(0x390)][_0x4beac4(0x3bf)](this),this['initMembersSkillsStatesCore']()));}this[_0x4beac4(0x398)](0x1);},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x2ff)]=function(){const _0xfb1f09=_0x34766e,_0x1b1967=VisuMZ[_0xfb1f09(0x33a)][_0xfb1f09(0x10e)][_0xfb1f09(0x12d)];for(const _0x2f794b of this['_states']){const _0x4960bb=$dataStates[_0x2f794b];if(_0x1b1967&&_0x1b1967[_0xfb1f09(0x236)]!==![]){if(_0x4960bb&&_0x4960bb[_0xfb1f09(0x15f)]===0x1)continue;}this[_0xfb1f09(0x18c)][_0x2f794b]>0x0&&this[_0xfb1f09(0x18c)][_0x2f794b]--;}},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x36b)]=Game_Switches[_0x34766e(0x31d)][_0x34766e(0x1e8)],Game_Switches[_0x34766e(0x31d)]['onChange']=function(){const _0x1092a2=_0x34766e;VisuMZ[_0x1092a2(0x33a)][_0x1092a2(0x36b)][_0x1092a2(0x3bf)](this);const _0x563039=VisuMZ[_0x1092a2(0x33a)][_0x1092a2(0x10e)]['PassiveStates'][_0x1092a2(0x267)]??!![];if(!_0x563039)return;if(SceneManager[_0x1092a2(0xda)]()){if(_0x1092a2(0x2ac)==='nvChe')for(const _0x3879a6 of _0x3dfa57){_0x3879a6[_0x1092a2(0x34b)](_0x4985a1);const _0x410bf0=_0x494e2a(_0x1e2b93['$1'])[_0x1092a2(0x3c1)](',')[_0x1092a2(0x3df)](_0x5a5027=>_0x1e16fa(_0x5a5027)[_0x1092a2(0x3ea)]()['trim']());_0x258b0b=_0x974fe4[_0x1092a2(0x366)](_0x410bf0);}else for(const _0x286fed of BattleManager[_0x1092a2(0x16d)]()){if(_0x1092a2(0x3aa)!==_0x1092a2(0x1cc)){if(_0x286fed)_0x286fed[_0x1092a2(0xbd)]();}else{let _0x2f04d9=_0x45a0b1[_0x1092a2(0x251)][_0x1092a2(0x3bf)](this,_0x44768f);return _0x2f04d9=this[_0x1092a2(0x1ed)](_0x42cce0,_0x2f04d9,_0x552e54),_0x2f04d9;}}}},VisuMZ['SkillsStatesCore'][_0x34766e(0x2ba)]=Game_Variables['prototype'][_0x34766e(0x1e8)],Game_Variables[_0x34766e(0x31d)][_0x34766e(0x1e8)]=function(){const _0x52d389=_0x34766e;VisuMZ[_0x52d389(0x33a)]['Game_Variables_onChange'][_0x52d389(0x3bf)](this);const _0x423725=VisuMZ[_0x52d389(0x33a)][_0x52d389(0x10e)][_0x52d389(0x150)][_0x52d389(0xb8)]??!![];if(!_0x423725)return;if(SceneManager['isSceneBattle']())for(const _0x1baa53 of BattleManager['allBattleMembers']()){if('CVbjt'!==_0x52d389(0x3a2))return _0x37286e;else{if(_0x1baa53)_0x1baa53[_0x52d389(0xbd)]();}}},VisuMZ[_0x34766e(0x33a)]['Game_Action_applyItemUserEffect']=Game_Action[_0x34766e(0x31d)][_0x34766e(0x1f0)],Game_Action['prototype'][_0x34766e(0x1f0)]=function(_0x496d8e){const _0x2d2662=_0x34766e;VisuMZ[_0x2d2662(0x33a)][_0x2d2662(0x219)][_0x2d2662(0x3bf)](this,_0x496d8e),this[_0x2d2662(0x2bd)](_0x496d8e);},Game_Action[_0x34766e(0x31d)]['applySkillsStatesCoreEffects']=function(_0x43df57){const _0x3167e2=_0x34766e;this[_0x3167e2(0x10f)](_0x43df57),this[_0x3167e2(0x17c)](_0x43df57),this[_0x3167e2(0x180)](_0x43df57),this[_0x3167e2(0x1b6)](_0x43df57);},VisuMZ[_0x34766e(0x33a)]['Game_Action_testApply']=Game_Action[_0x34766e(0x31d)]['testApply'],Game_Action[_0x34766e(0x31d)][_0x34766e(0x3e5)]=function(_0x56a27e){const _0x2db32e=_0x34766e;if(this[_0x2db32e(0x254)](_0x56a27e))return!![];return VisuMZ[_0x2db32e(0x33a)][_0x2db32e(0x1a6)][_0x2db32e(0x3bf)](this,_0x56a27e);},Game_Action[_0x34766e(0x31d)][_0x34766e(0x254)]=function(_0x5b1633){const _0x511a4f=_0x34766e;if(!this[_0x511a4f(0x129)]())return;const _0xa2fb29=this[_0x511a4f(0x129)]()[_0x511a4f(0x27c)];if(_0xa2fb29[_0x511a4f(0x34b)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x13d0d5=String(RegExp['$1']);if(_0x5b1633[_0x511a4f(0x244)](_0x13d0d5))return!![];}if(_0xa2fb29[_0x511a4f(0x34b)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x251d43=Number(RegExp['$1']);if(_0x5b1633[_0x511a4f(0x215)](_0x251d43))return!![];}else{if(_0xa2fb29[_0x511a4f(0x34b)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){if(_0x511a4f(0xea)===_0x511a4f(0xea)){const _0x29aac5=DataManager['getStateIdWithName'](RegExp['$1']);if(_0x5b1633[_0x511a4f(0x215)](_0x29aac5))return!![];}else{const _0x59ce7b=_0x3daf3d[_0x511a4f(0x33a)][_0x511a4f(0x10e)][_0x511a4f(0x150)][_0x511a4f(0x3db)];this['_cache'][_0x511a4f(0x174)]=this['_cache']['passiveStates'][_0x511a4f(0x366)](_0x59ce7b);}}}return![];},Game_Action[_0x34766e(0x31d)][_0x34766e(0x10f)]=function(_0xdb7192){const _0x3b9c1b=_0x34766e;if(_0xdb7192[_0x3b9c1b(0x33c)]()[_0x3b9c1b(0x198)]<=0x0)return;const _0x7bfac8=this['item']()[_0x3b9c1b(0x27c)];{const _0x496102=_0x7bfac8['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x496102){if('VxBzY'===_0x3b9c1b(0x143)){if(_0x1b2d7d[_0x3b9c1b(0x31b)][_0x3b9c1b(0x3ea)]()==='TP'){let _0x592f2a=_0x531638[_0x3b9c1b(0x251)][_0x3b9c1b(0x3bf)](this,_0x1630d4);return _0x592f2a=this['adjustSkillCost'](_0x47e634,_0x592f2a,_0x39446e),_0x592f2a;}}else for(const _0x54117a of _0x496102){_0x54117a[_0x3b9c1b(0x34b)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x371148=String(RegExp['$1']);_0xdb7192['removeStatesByCategoryAll'](_0x371148);}}}{const _0x3c64e5=_0x7bfac8[_0x3b9c1b(0x34b)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x3c64e5){if(_0x3b9c1b(0x30b)===_0x3b9c1b(0x30b))for(const _0x4eb002 of _0x3c64e5){if(_0x3b9c1b(0x1d3)===_0x3b9c1b(0x1d3)){_0x4eb002['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0xb1acfc=String(RegExp['$1']),_0x211e8a=Number(RegExp['$2']);_0xdb7192['removeStatesByCategory'](_0xb1acfc,_0x211e8a);}else return this[_0x3b9c1b(0x109)]();}else{const _0x1e5506=_0x6809f4(_0x5022e9['$1']),_0x172775=_0x29d0b8[_0x3b9c1b(0xc3)](_0x1e5506);_0x5a9aec[_0x3b9c1b(0x33a)]['stateEraseJS'][_0x42fea1['id']]=new _0x19d7fc(_0x3b9c1b(0x1be),_0x172775);}}}},Game_Action['prototype'][_0x34766e(0x17c)]=function(_0x39d898){const _0x1a4af9=_0x34766e,_0x4f6d92=this['item']()[_0x1a4af9(0x27c)],_0x4f3ea1=_0x4f6d92[_0x1a4af9(0x34b)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x4f3ea1)for(const _0x5ded56 of _0x4f3ea1){if(_0x1a4af9(0x30a)!==_0x1a4af9(0x35c)){let _0x5f2c89=0x0,_0x25750d=0x0;if(_0x5ded56[_0x1a4af9(0x34b)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x1a4af9(0x1af)!==_0x1a4af9(0x1af)?(this[_0x1a4af9(0x30d)]['fontFace']=_0x454197[_0x1a4af9(0x347)](),this[_0x1a4af9(0x30d)][_0x1a4af9(0x291)]=_0x428b65['mainFontSize'](),this[_0x1a4af9(0x3d6)]()):(_0x5f2c89=Number(RegExp['$1']),_0x25750d=Number(RegExp['$2']));else _0x5ded56['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x5f2c89=DataManager[_0x1a4af9(0x1c2)](RegExp['$1']),_0x25750d=Number(RegExp['$2']));_0x39d898['setStateTurns'](_0x5f2c89,_0x25750d),this[_0x1a4af9(0x3ed)](_0x39d898);}else{const _0x558a51=_0x59f770[_0x1a4af9(0x33a)][_0x1a4af9(0x10e)][_0x1a4af9(0x1ae)];return _0x558a51[_0x1a4af9(0x1ac)]===_0x1a4af9(0x3a1)?_0x289f57[_0x1a4af9(0x308)]():_0x20ff91[_0x1a4af9(0x347)]();}}const _0x246b41=_0x4f6d92[_0x1a4af9(0x34b)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x246b41)for(const _0x47de69 of _0x246b41){let _0x25b9ad=0x0,_0x108d82=0x0;if(_0x47de69[_0x1a4af9(0x34b)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i)){if(_0x1a4af9(0x26c)===_0x1a4af9(0x29c)){const _0x73241c=_0x3a640e[_0x1a4af9(0x27c)];return _0x73241c[_0x1a4af9(0x34b)](/<REAPPLY RULES:[ ](.*)>/i)?_0x1c75e5(_0x5a9020['$1']):_0x2850c3[_0x1a4af9(0x33a)]['Settings'][_0x1a4af9(0x12d)]['ReapplyRules'];}else _0x25b9ad=Number(RegExp['$1']),_0x108d82=Number(RegExp['$2']);}else _0x47de69[_0x1a4af9(0x34b)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x25b9ad=DataManager['getStateIdWithName'](RegExp['$1']),_0x108d82=Number(RegExp['$2']));_0x39d898[_0x1a4af9(0x361)](_0x25b9ad,_0x108d82),this['makeSuccess'](_0x39d898);}},Game_Action[_0x34766e(0x31d)]['applyBuffTurnManipulationEffects']=function(_0x386e79){const _0x14e5b1=_0x34766e,_0x14aa02=['MAXHP',_0x14e5b1(0x2f7),_0x14e5b1(0x34e),_0x14e5b1(0x188),_0x14e5b1(0x327),_0x14e5b1(0xb9),_0x14e5b1(0x3b9),_0x14e5b1(0x225)],_0x7b83f3=this[_0x14e5b1(0x129)]()[_0x14e5b1(0x27c)],_0x1c7151=_0x7b83f3['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x1c7151)for(const _0xcfcf9d of _0x1c7151){if('QgTND'===_0x14e5b1(0x20f))return this[_0x14e5b1(0x23b)]()?this[_0x14e5b1(0x345)]():_0x15547a['SkillsStatesCore']['Scene_Skill_statusWindowRect']['call'](this);else{_0xcfcf9d[_0x14e5b1(0x34b)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x14e1bb=_0x14aa02[_0x14e5b1(0x2be)](String(RegExp['$1'])['toUpperCase']()),_0x2dcd0b=Number(RegExp['$2']);_0x14e1bb>=0x0&&(_0x386e79[_0x14e5b1(0xef)](_0x14e1bb,_0x2dcd0b),this[_0x14e5b1(0x3ed)](_0x386e79));}}const _0x379b55=_0x7b83f3[_0x14e5b1(0x34b)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x379b55){if('ylqBV'===_0x14e5b1(0x2b3)){const _0x414eca=_0x2dd253(_0x554f5a['$1']),_0x12705e=_0x3845fa[_0x14e5b1(0xc3)](_0x414eca,_0x14e5b1(0x271),-0x1,_0x14e5b1(0x288));_0x45e75a[_0x14e5b1(0x33a)][_0x14e5b1(0x101)][_0x586fcc['id']]=new _0x572ca2('stateId',_0x12705e);}else for(const _0x52f40b of _0x1c7151){if(_0x14e5b1(0x2cf)!==_0x14e5b1(0x2cf)){const _0x57b347=_0x4fa027(_0x44e3ff['$1'])[_0x14e5b1(0x3c1)](',')[_0x14e5b1(0x3df)](_0x19a478=>_0x19a478[_0x14e5b1(0x1c5)]()),_0x39c2fb=_0x590434[_0x14e5b1(0x33a)][_0x14e5b1(0x15a)](_0x57b347);let _0x5887c2=[this[_0x14e5b1(0x36f)]()];return _0xa20a0e[_0x14e5b1(0x2f9)]&&this[_0x14e5b1(0x228)]&&(_0x5887c2=this[_0x14e5b1(0x228)]()),_0x39c2fb['filter'](_0x18629b=>_0x5887c2['includes'](_0x18629b))[_0x14e5b1(0x198)]>0x0;}else{_0x52f40b[_0x14e5b1(0x34b)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x243ded=_0x14aa02[_0x14e5b1(0x2be)](String(RegExp['$1'])[_0x14e5b1(0x3ea)]()),_0x36317b=Number(RegExp['$2']);if(_0x243ded>=0x0){if(_0x14e5b1(0x25c)!==_0x14e5b1(0x25c)){const _0x218685=this[_0x14e5b1(0xd5)]();for(const _0x479d1b of _0x218685){if(!_0x479d1b['isGroupDefeatStateAffected']())return![];}return!![];}else _0x386e79['addBuffTurns'](_0x243ded,_0x36317b),this['makeSuccess'](_0x386e79);}}}}},Game_Action[_0x34766e(0x31d)][_0x34766e(0x1b6)]=function(_0x1864d6){const _0x5ccab1=_0x34766e,_0x143ecd=[_0x5ccab1(0x2d5),'MAXMP',_0x5ccab1(0x34e),_0x5ccab1(0x188),_0x5ccab1(0x327),_0x5ccab1(0xb9),'AGI','LUK'],_0x5d1615=this[_0x5ccab1(0x129)]()[_0x5ccab1(0x27c)],_0x4ad7b8=_0x5d1615[_0x5ccab1(0x34b)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x4ad7b8)for(const _0x34e4d2 of _0x4ad7b8){_0x34e4d2[_0x5ccab1(0x34b)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x41d9f9=_0x143ecd[_0x5ccab1(0x2be)](String(RegExp['$1'])[_0x5ccab1(0x3ea)]()),_0x3ae939=Number(RegExp['$2']);if(_0x41d9f9>=0x0){if(_0x5ccab1(0x229)===_0x5ccab1(0x229))_0x1864d6[_0x5ccab1(0x326)](_0x41d9f9,_0x3ae939),this[_0x5ccab1(0x3ed)](_0x1864d6);else{const _0x196063=_0x41f29f[_0x5ccab1(0xf8)]('['+_0x36e133['$1'][_0x5ccab1(0x34b)](/\d+/g)+']');for(const _0x24febe of _0x196063){if(!_0x1e1e1f[_0x5ccab1(0x194)](_0x24febe))return!![];}return![];}}}const _0x46d078=_0x5d1615[_0x5ccab1(0x34b)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x46d078){if(_0x5ccab1(0x2df)!==_0x5ccab1(0x2df)){_0x4c8d63[_0x5ccab1(0x31d)][_0x5ccab1(0x2b0)]['call'](this);const _0x50ce3a=_0x3a1d0c[_0x5ccab1(0x33a)][_0x5ccab1(0x10e)][_0x5ccab1(0x150)]['Actor'];this[_0x5ccab1(0x191)][_0x5ccab1(0x174)]=this[_0x5ccab1(0x191)]['passiveStates'][_0x5ccab1(0x366)](_0x50ce3a);}else for(const _0x5dcdb7 of _0x4ad7b8){_0x5dcdb7[_0x5ccab1(0x34b)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x484555=_0x143ecd[_0x5ccab1(0x2be)](String(RegExp['$1'])[_0x5ccab1(0x3ea)]()),_0x3f367f=Number(RegExp['$2']);_0x484555>=0x0&&(_0x5ccab1(0x16f)!==_0x5ccab1(0x16f)?(_0x514c52[_0x5ccab1(0x33a)]['ParseSkillNotetags'][_0x5ccab1(0x3bf)](this,_0x5dfdea),_0x249189[_0x5ccab1(0x33a)]['Parse_Notetags_Skill_Cost'](_0x4088c0),_0x358cb2[_0x5ccab1(0x33a)][_0x5ccab1(0x263)](_0x2c8990)):(_0x1864d6[_0x5ccab1(0x38e)](_0x484555,_0x3f367f),this[_0x5ccab1(0x3ed)](_0x1864d6)));}}},VisuMZ[_0x34766e(0x33a)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x380)],Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x380)]=function(){const _0x1bdd1f=_0x34766e;this[_0x1bdd1f(0x191)]={},this[_0x1bdd1f(0x262)](),VisuMZ[_0x1bdd1f(0x33a)][_0x1bdd1f(0x339)]['call'](this);},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x262)]=function(){const _0x3748e4=_0x34766e;this[_0x3748e4(0x2e8)]='',this[_0x3748e4(0x126)]={},this[_0x3748e4(0x17d)]={},this[_0x3748e4(0x1d7)]={};},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x3bb)]=function(_0x540dd2){const _0x230b80=_0x34766e;return this[_0x230b80(0x191)]=this[_0x230b80(0x191)]||{},this[_0x230b80(0x191)][_0x540dd2]!==undefined;},VisuMZ['SkillsStatesCore'][_0x34766e(0xba)]=Game_BattlerBase['prototype'][_0x34766e(0xbd)],Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0xbd)]=function(){const _0x5d3abb=_0x34766e;this['_cache']={},VisuMZ['SkillsStatesCore'][_0x5d3abb(0xba)]['call'](this);},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x16e)]=Game_BattlerBase['prototype']['eraseState'],Game_BattlerBase['prototype'][_0x34766e(0x2aa)]=function(_0x5c9bc1){const _0xadee1a=_0x34766e;let _0x903a1c=this['isStateAffected'](_0x5c9bc1);VisuMZ[_0xadee1a(0x33a)][_0xadee1a(0x16e)]['call'](this,_0x5c9bc1);if(_0x903a1c&&!this[_0xadee1a(0x215)](_0x5c9bc1))this[_0xadee1a(0x2d6)](_0x5c9bc1);},Game_BattlerBase['prototype']['onRemoveState']=function(_0x38258c){const _0x461d7b=_0x34766e;this[_0x461d7b(0x159)](_0x38258c),this[_0x461d7b(0x25e)](_0x38258c),this['clearStateOrigin'](_0x38258c);},VisuMZ['SkillsStatesCore'][_0x34766e(0x1e5)]=Game_BattlerBase['prototype'][_0x34766e(0x3b3)],Game_BattlerBase['prototype'][_0x34766e(0x3b3)]=function(_0x1a895e){const _0x2db9ff=_0x34766e,_0x2ddbeb=$dataStates[_0x1a895e],_0x2369b6=this[_0x2db9ff(0x39d)](_0x1a895e),_0x30da18=this[_0x2db9ff(0x3f2)](_0x2ddbeb)[_0x2db9ff(0x203)]()['trim']();switch(_0x30da18){case _0x2db9ff(0x1de):if(_0x2369b6<=0x0)VisuMZ[_0x2db9ff(0x33a)][_0x2db9ff(0x1e5)][_0x2db9ff(0x3bf)](this,_0x1a895e);break;case _0x2db9ff(0x246):VisuMZ[_0x2db9ff(0x33a)][_0x2db9ff(0x1e5)]['call'](this,_0x1a895e);break;case'greater':VisuMZ[_0x2db9ff(0x33a)][_0x2db9ff(0x1e5)][_0x2db9ff(0x3bf)](this,_0x1a895e),this['_stateTurns'][_0x1a895e]=Math[_0x2db9ff(0x2c5)](this[_0x2db9ff(0x18c)][_0x1a895e],_0x2369b6);break;case'add':VisuMZ[_0x2db9ff(0x33a)][_0x2db9ff(0x1e5)]['call'](this,_0x1a895e),this[_0x2db9ff(0x18c)][_0x1a895e]+=_0x2369b6;break;default:VisuMZ[_0x2db9ff(0x33a)][_0x2db9ff(0x1e5)]['call'](this,_0x1a895e);break;}},Game_BattlerBase['prototype'][_0x34766e(0x3f2)]=function(_0x26957b){const _0x4762f6=_0x34766e,_0x2282b4=_0x26957b[_0x4762f6(0x27c)];if(_0x2282b4[_0x4762f6(0x34b)](/<REAPPLY RULES:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x4762f6(0xce)!=='KQuQf')this[_0x4762f6(0x2e8)]='',this[_0x4762f6(0x126)]={},this[_0x4762f6(0x17d)]={},this[_0x4762f6(0x1d7)]={};else return VisuMZ[_0x4762f6(0x33a)][_0x4762f6(0x10e)][_0x4762f6(0x12d)][_0x4762f6(0x350)];}},VisuMZ['SkillsStatesCore'][_0x34766e(0x27a)]=Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x21c)],Game_BattlerBase[_0x34766e(0x31d)]['overwriteBuffTurns']=function(_0xe4ebb3,_0x131667){const _0x1f972c=_0x34766e,_0x5b9bb2=VisuMZ[_0x1f972c(0x33a)][_0x1f972c(0x10e)][_0x1f972c(0xb4)][_0x1f972c(0x350)],_0x3d02d6=this[_0x1f972c(0x107)](_0xe4ebb3);switch(_0x5b9bb2){case _0x1f972c(0x1de):if(_0x3d02d6<=0x0)this['_buffTurns'][_0xe4ebb3]=_0x131667;break;case _0x1f972c(0x246):this[_0x1f972c(0x117)][_0xe4ebb3]=_0x131667;break;case _0x1f972c(0x38a):this['_buffTurns'][_0xe4ebb3]=Math['max'](_0x3d02d6,_0x131667);break;case _0x1f972c(0xdd):this[_0x1f972c(0x117)][_0xe4ebb3]+=_0x131667;break;default:VisuMZ[_0x1f972c(0x33a)][_0x1f972c(0x27a)][_0x1f972c(0x3bf)](this,_0xe4ebb3,_0x131667);break;}const _0x55aa0c=VisuMZ['SkillsStatesCore'][_0x1f972c(0x10e)][_0x1f972c(0xb4)][_0x1f972c(0x368)];this[_0x1f972c(0x117)][_0xe4ebb3]=this[_0x1f972c(0x117)][_0xe4ebb3]['clamp'](0x0,_0x55aa0c);},Game_BattlerBase['prototype'][_0x34766e(0x26b)]=function(){const _0x33d310=_0x34766e;if(this[_0x33d310(0x191)]['groupDefeat']!==undefined)return this[_0x33d310(0x191)][_0x33d310(0x139)];this['_cache'][_0x33d310(0x139)]=![];const _0xb8e85d=this[_0x33d310(0x33c)]();for(const _0x197142 of _0xb8e85d){if(!_0x197142)continue;if(_0x197142[_0x33d310(0x27c)]['match'](/<GROUP DEFEAT>/i)){this[_0x33d310(0x191)][_0x33d310(0x139)]=!![];break;}}return this[_0x33d310(0x191)][_0x33d310(0x139)];},VisuMZ['SkillsStatesCore'][_0x34766e(0x3a5)]=Game_Unit[_0x34766e(0x31d)][_0x34766e(0x2a1)],Game_Unit[_0x34766e(0x31d)]['deadMembers']=function(){const _0x1a0841=_0x34766e;let _0x7a61f8=VisuMZ[_0x1a0841(0x33a)][_0x1a0841(0x3a5)][_0x1a0841(0x3bf)](this);return BattleManager[_0x1a0841(0xe0)]&&(_0x7a61f8=_0x7a61f8[_0x1a0841(0x366)](this[_0x1a0841(0x38b)]()[_0x1a0841(0xc7)](_0x262503=>_0x262503[_0x1a0841(0x26b)]()))),_0x7a61f8;},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x390)]=Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0xde)],Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0xde)]=function(){const _0x22067a=_0x34766e;if(this[_0x22067a(0x33d)]()!=='')this[_0x22067a(0x2b7)]();else{if('ZwRpe'!==_0x22067a(0x30e)){if(_0x43eb3f[_0x22067a(0x106)]())_0x4786a7=this[_0x22067a(0x1e1)](_0x25aaf6,_0x1b8eed);this[_0x22067a(0x367)](_0x39102a,_0x35da5c,_0x47bde5,_0x120beb);}else VisuMZ[_0x22067a(0x33a)][_0x22067a(0x390)]['call'](this),this[_0x22067a(0x262)]();}},Game_Actor[_0x34766e(0x31d)][_0x34766e(0xde)]=function(){const _0x50a1cd=_0x34766e;this[_0x50a1cd(0x313)]=this[_0x50a1cd(0x313)]||{},Game_Battler[_0x50a1cd(0x31d)][_0x50a1cd(0xde)][_0x50a1cd(0x3bf)](this);},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x2b7)]=function(){const _0x3469ce=_0x34766e,_0x4fadd2=this['states']();for(const _0x53c731 of _0x4fadd2){if(_0x3469ce(0x365)!==_0x3469ce(0x36e)){if(_0x53c731&&this[_0x3469ce(0x1cf)](_0x53c731))this[_0x3469ce(0x2aa)](_0x53c731['id']);}else return![];}this['_cache']={};},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x1cf)]=function(_0x1027f9){const _0x5e134a=_0x34766e,_0x51c6b1=this['getStateRetainType']();if(_0x51c6b1!==''){if(_0x5e134a(0x154)===_0x5e134a(0x154)){const _0x4cc082=_0x1027f9['note'];if(_0x51c6b1===_0x5e134a(0x24e)&&_0x4cc082[_0x5e134a(0x34b)](/<NO DEATH CLEAR>/i))return![];if(_0x51c6b1===_0x5e134a(0x13e)&&_0x4cc082[_0x5e134a(0x34b)](/<NO RECOVER ALL CLEAR>/i))return![];}else{const _0x1995b4=_0x4ef622(_0x5cda1b['$1']);if(_0xa77bcd[_0x5e134a(0x244)](_0x1995b4))return!![];}}return this[_0x5e134a(0x215)](_0x1027f9['id']);},Game_BattlerBase[_0x34766e(0x31d)]['getStateRetainType']=function(){const _0x2679eb=_0x34766e;return this[_0x2679eb(0x2e8)];},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x3dc)]=function(_0x5b5014){const _0x2e087b=_0x34766e;this[_0x2e087b(0x2e8)]=_0x5b5014;},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x19f)]=function(){const _0x5c3fee=_0x34766e;this[_0x5c3fee(0x2e8)]='';},VisuMZ['SkillsStatesCore'][_0x34766e(0x2af)]=Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x349)],Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x349)]=function(){const _0x32340d=_0x34766e;this[_0x32340d(0x3dc)](_0x32340d(0x24e)),VisuMZ['SkillsStatesCore'][_0x32340d(0x2af)][_0x32340d(0x3bf)](this),this[_0x32340d(0x19f)]();},VisuMZ[_0x34766e(0x33a)]['Game_BattlerBase_recoverAll']=Game_BattlerBase[_0x34766e(0x31d)]['recoverAll'],Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x227)]=function(){const _0x163179=_0x34766e;this[_0x163179(0x3dc)]('recover\x20all'),VisuMZ[_0x163179(0x33a)][_0x163179(0x261)][_0x163179(0x3bf)](this),this[_0x163179(0x19f)]();},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x1ed)]=function(_0x4bbf92,_0x575e93,_0x4a4696){return _0x575e93;},Game_BattlerBase['prototype'][_0x34766e(0x294)]=function(_0x297e76){const _0xadd76a=_0x34766e;for(settings of VisuMZ[_0xadd76a(0x33a)][_0xadd76a(0x10e)][_0xadd76a(0xe9)]){if(_0xadd76a(0x3d4)===_0xadd76a(0x3d4)){let _0x1bd43b=settings[_0xadd76a(0x251)][_0xadd76a(0x3bf)](this,_0x297e76);_0x1bd43b=this['adjustSkillCost'](_0x297e76,_0x1bd43b,settings);if(!settings[_0xadd76a(0x23f)][_0xadd76a(0x3bf)](this,_0x297e76,_0x1bd43b))return![];}else return _0x533d1b[_0xadd76a(0x14b)]&&_0x5caf59[_0xadd76a(0x309)][_0xadd76a(0x183)]('['+_0xf5b206+']');}return!![];},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x25a)]=function(_0x3d81a2){const _0x22b302=_0x34766e;for(settings of VisuMZ[_0x22b302(0x33a)][_0x22b302(0x10e)][_0x22b302(0xe9)]){if(_0x22b302(0x337)===_0x22b302(0x39e))_0x41e8ed['SkillsStatesCore'][_0x22b302(0x1e4)][_0x22b302(0x3bf)](this,_0x470942,_0x1d867f),this[_0x22b302(0x3e1)](_0x326bc9)&&this[_0x22b302(0x113)](_0x52b722,_0x505a8f);else{let _0x2ae838=settings[_0x22b302(0x251)][_0x22b302(0x3bf)](this,_0x3d81a2);_0x2ae838=this['adjustSkillCost'](_0x3d81a2,_0x2ae838,settings),settings['PayJS']['call'](this,_0x3d81a2,_0x2ae838);}}},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x28e)]=Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x278)],Game_BattlerBase[_0x34766e(0x31d)]['meetsSkillConditions']=function(_0x28e162){const _0x1a312e=_0x34766e;if(!_0x28e162)return![];if(!VisuMZ[_0x1a312e(0x33a)][_0x1a312e(0x28e)][_0x1a312e(0x3bf)](this,_0x28e162))return![];if(!this[_0x1a312e(0xca)](_0x28e162))return![];if(!this[_0x1a312e(0x2d4)](_0x28e162))return![];if(!this[_0x1a312e(0x1f4)](_0x28e162))return![];return!![];},Game_BattlerBase[_0x34766e(0x31d)]['checkSkillConditionsNotetags']=function(_0x284f0b){const _0x8a54c3=_0x34766e;if(!this[_0x8a54c3(0x125)](_0x284f0b))return![];return!![];},Game_BattlerBase['prototype'][_0x34766e(0x125)]=function(_0x53488e){const _0x2bd110=_0x34766e,_0x5c4e0a=_0x53488e[_0x2bd110(0x27c)];if(_0x5c4e0a[_0x2bd110(0x34b)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x232185=JSON['parse']('['+RegExp['$1'][_0x2bd110(0x34b)](/\d+/g)+']');for(const _0x45938f of _0x232185){if(!$gameSwitches['value'](_0x45938f))return![];}return!![];}if(_0x5c4e0a[_0x2bd110(0x34b)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2bd110(0x373)==='rRgta'){const _0x360401=_0x1e3cd[_0x2bd110(0x2f4)][_0x2bd110(0x10e)][_0x2bd110(0x13f)]['DisplayedParams'],_0x2c2406=_0x557739[_0x2bd110(0x226)](_0x2bf895/0x2)-0x18;let _0x2dfdaa=_0x2e6f0c,_0x4b0438=_0x165e54[_0x2bd110(0x226)]((this[_0x2bd110(0xcb)]-_0x11ab18[_0x2bd110(0x270)](_0x360401[_0x2bd110(0x198)]/0x2)*_0x47a32a)/0x2),_0x16640d=0x0;for(const _0x182ce7 of _0x360401){this['drawExtendedParameter'](_0x2dfdaa,_0x4b0438,_0x2c2406,_0x182ce7),_0x16640d++,_0x16640d%0x2===0x0?(_0x2dfdaa=_0x78909d,_0x4b0438+=_0x5d8188):_0x2dfdaa+=_0x2c2406+0x18;}}else{const _0x4df6b6=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xcfd692 of _0x4df6b6){if('pnUjs'===_0x2bd110(0xc5)){if(!$gameSwitches[_0x2bd110(0x194)](_0xcfd692))return![];}else return this[_0x2bd110(0x3af)]();}return!![];}}if(_0x5c4e0a[_0x2bd110(0x34b)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3b3a04=JSON['parse']('['+RegExp['$1'][_0x2bd110(0x34b)](/\d+/g)+']');for(const _0x590b0d of _0x3b3a04){if($gameSwitches[_0x2bd110(0x194)](_0x590b0d))return!![];}return![];}if(_0x5c4e0a[_0x2bd110(0x34b)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2f5100=JSON[_0x2bd110(0xf8)]('['+RegExp['$1'][_0x2bd110(0x34b)](/\d+/g)+']');for(const _0x20434d of _0x2f5100){if(_0x2bd110(0x32c)!==_0x2bd110(0x32c)){_0x559d32[_0x2bd110(0x34b)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x2dd218=_0x27a319(_0x275547['$1'])[_0x2bd110(0x3ea)]()[_0x2bd110(0x1c5)]()[_0x2bd110(0x3c1)](',');for(const _0x2aa4ca of _0x2dd218){_0x184cfb[_0x2bd110(0x3eb)][_0x2bd110(0x241)](_0x2aa4ca[_0x2bd110(0x1c5)]());}}else{if(!$gameSwitches['value'](_0x20434d))return!![];}}return![];}if(_0x5c4e0a[_0x2bd110(0x34b)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2bd110(0x259)===_0x2bd110(0x2dd)){if(!_0x39c605['value'](_0x12670c))return!![];}else{const _0x5dedc0=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x16ebcb of _0x5dedc0){if(!$gameSwitches[_0x2bd110(0x194)](_0x16ebcb))return!![];}return![];}}if(_0x5c4e0a[_0x2bd110(0x34b)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2bd110(0x30f)!==_0x2bd110(0x30f))return _0x2bbf8b[_0x2bd110(0x2ad)]();else{const _0x29b134=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x44654b of _0x29b134){if('mQtEh'===_0x2bd110(0x124)){if(_0x2ec8a3[_0x2bd110(0x1e3)]&&_0x21707e[_0x2bd110(0x320)]!==_0x14b244)return _0x1b11d6['uiInputPosition'];else return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x2bd110(0x3da)]()['match'](/RIGHT/i):_0x31632a[_0x2bd110(0x31d)][_0x2bd110(0x38c)][_0x2bd110(0x3bf)](this);}else{if($gameSwitches[_0x2bd110(0x194)](_0x44654b))return![];}}return!![];}}return!![];},Game_BattlerBase[_0x34766e(0x31d)]['meetsSkillConditionsEnableJS']=function(_0x3e83ef){const _0xc63474=_0x34766e,_0x5dd856=_0x3e83ef[_0xc63474(0x27c)],_0x5e71dc=VisuMZ[_0xc63474(0x33a)][_0xc63474(0x1f9)];if(_0x5e71dc[_0x3e83ef['id']]){if(_0xc63474(0x14f)===_0xc63474(0x14f))return _0x5e71dc[_0x3e83ef['id']][_0xc63474(0x3bf)](this,_0x3e83ef);else{const _0x5b20ba=_0x53d92f['parse']('['+_0x5cac55['$1']['match'](/\d+/g)+']');for(const _0x1da5da of _0x5b20ba){if(!_0x3daeaa['value'](_0x1da5da))return!![];}return![];}}else return!![];},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x1f4)]=function(_0x26afb0){const _0x1495f3=_0x34766e;return VisuMZ[_0x1495f3(0x33a)][_0x1495f3(0x10e)][_0x1495f3(0x1c8)][_0x1495f3(0x3b7)][_0x1495f3(0x3bf)](this,_0x26afb0);},VisuMZ[_0x34766e(0x33a)]['Game_BattlerBase_skillMpCost']=Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x37e)],Game_BattlerBase[_0x34766e(0x31d)]['skillMpCost']=function(_0x24e5fc){const _0x4e63a6=_0x34766e;for(settings of VisuMZ['SkillsStatesCore'][_0x4e63a6(0x10e)][_0x4e63a6(0xe9)]){if(settings[_0x4e63a6(0x31b)][_0x4e63a6(0x3ea)]()==='MP'){let _0x4b4c7c=settings[_0x4e63a6(0x251)][_0x4e63a6(0x3bf)](this,_0x24e5fc);return _0x4b4c7c=this[_0x4e63a6(0x1ed)](_0x24e5fc,_0x4b4c7c,settings),_0x4b4c7c;}}return VisuMZ[_0x4e63a6(0x33a)]['Game_BattlerBase_skillMpCost']['call'](this,_0x24e5fc);},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x37d)]=Game_BattlerBase[_0x34766e(0x31d)]['skillTpCost'],Game_BattlerBase[_0x34766e(0x31d)]['skillTpCost']=function(_0x2a3604){const _0x521ce5=_0x34766e;for(settings of VisuMZ[_0x521ce5(0x33a)]['Settings']['Costs']){if('fGEdl'===_0x521ce5(0xe5))return this[_0x521ce5(0x23b)]()?this['skillTypeWindowRectSkillsStatesCore']():_0x136419[_0x521ce5(0x33a)][_0x521ce5(0xfe)][_0x521ce5(0x3bf)](this);else{if(settings[_0x521ce5(0x31b)][_0x521ce5(0x3ea)]()==='TP'){if(_0x521ce5(0x1ea)!==_0x521ce5(0x1ea))return _0x1b6484[_0x521ce5(0xdb)]();else{let _0x3de5ec=settings[_0x521ce5(0x251)][_0x521ce5(0x3bf)](this,_0x2a3604);return _0x3de5ec=this['adjustSkillCost'](_0x2a3604,_0x3de5ec,settings),_0x3de5ec;}}}}return VisuMZ[_0x521ce5(0x33a)][_0x521ce5(0x37d)][_0x521ce5(0x3bf)](this,_0x2a3604);},Game_BattlerBase['prototype'][_0x34766e(0x3b1)]=function(_0x3a70e0){const _0x559f60=_0x34766e;if(typeof _0x3a70e0===_0x559f60(0x3a1))_0x3a70e0=$dataStates[_0x3a70e0];return this[_0x559f60(0x33c)]()[_0x559f60(0x183)](_0x3a70e0);},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x181)]=Game_BattlerBase['prototype'][_0x34766e(0x33c)],Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x33c)]=function(){const _0xa05ac0=_0x34766e;let _0x20fc6d=VisuMZ[_0xa05ac0(0x33a)][_0xa05ac0(0x181)][_0xa05ac0(0x3bf)](this);if($gameTemp[_0xa05ac0(0x167)])return _0x20fc6d;return $gameTemp[_0xa05ac0(0x167)]=!![],this['addPassiveStates'](_0x20fc6d),$gameTemp['_checkingPassiveStates']=undefined,_0x20fc6d;},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x1c0)]=function(_0x2a0dde){const _0x49df57=_0x34766e,_0x5a7db7=this[_0x49df57(0x174)]();for(state of _0x5a7db7){if(!state)continue;if(!this['isPassiveStateStackable'](state)&&_0x2a0dde[_0x49df57(0x183)](state))continue;_0x2a0dde[_0x49df57(0x241)](state);}if(_0x5a7db7[_0x49df57(0x198)]>0x0){if(_0x49df57(0x381)!==_0x49df57(0x381))return _0xf48cb5['numberFontFace']();else _0x2a0dde[_0x49df57(0x2b8)]((_0x21ebb8,_0x2fff6c)=>{const _0x431af6=_0x49df57,_0x5b1dad=_0x21ebb8[_0x431af6(0x122)],_0x5060c5=_0x2fff6c['priority'];if(_0x5b1dad!==_0x5060c5)return _0x5060c5-_0x5b1dad;return _0x21ebb8-_0x2fff6c;});}},Game_BattlerBase['prototype']['isPassiveStateStackable']=function(_0x2ff618){const _0x532ddf=_0x34766e;return _0x2ff618[_0x532ddf(0x27c)]['match'](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x34766e(0x33a)][_0x34766e(0xc8)]=Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x26d)],Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x26d)]=function(_0x3ebf5f){const _0x2b896b=_0x34766e;this['_checkingTraitsSetSkillsStatesCore']=!![];let _0x5b35d9=VisuMZ[_0x2b896b(0x33a)][_0x2b896b(0xc8)][_0x2b896b(0x3bf)](this,_0x3ebf5f);return this['_checkingTraitsSetSkillsStatesCore']=undefined,_0x5b35d9;},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x333)]=function(){const _0x37a66a=_0x34766e;let _0xa527c=[];this[_0x37a66a(0x169)]=this[_0x37a66a(0x169)]||{};for(;;){if('aTmMa'!==_0x37a66a(0x3e6)){if(typeof _0x153534!=='number')_0x4b5ea7=_0x406669['id'];this[_0x37a66a(0x215)](_0x425b63)&&(_0x5b4e82+=this[_0x37a66a(0x39d)](_0x533fe8),this[_0x37a66a(0x14e)](_0x15c8b9,_0x59ee91));}else{_0xa527c=[];let _0x4b3cb0=!![];for(const _0x454d7a of this[_0x37a66a(0x191)][_0x37a66a(0x174)]){const _0xef6980=$dataStates[_0x454d7a];if(!_0xef6980)continue;let _0x2acee4=this[_0x37a66a(0x204)](_0xef6980);this[_0x37a66a(0x169)][_0x454d7a]!==_0x2acee4&&(_0x4b3cb0=![],this['_passiveStateResults'][_0x454d7a]=_0x2acee4);if(!_0x2acee4)continue;_0xa527c[_0x37a66a(0x241)](_0xef6980);}if(_0x4b3cb0)break;else{if(!this[_0x37a66a(0x289)])this[_0x37a66a(0xbd)]();this[_0x37a66a(0x2f8)]();}}}return _0xa527c;},Game_BattlerBase[_0x34766e(0x31d)]['meetsPassiveStateConditions']=function(_0x3844e7){const _0x246df6=_0x34766e;if(!this[_0x246df6(0x38d)](_0x3844e7))return![];if(!this[_0x246df6(0x299)](_0x3844e7))return![];if(!this[_0x246df6(0xbf)](_0x3844e7))return![];if(!this[_0x246df6(0xe1)](_0x3844e7))return![];return!![];},Game_BattlerBase['prototype'][_0x34766e(0x38d)]=function(_0x52d1aa){return!![];},Game_Actor[_0x34766e(0x31d)][_0x34766e(0x38d)]=function(_0x290ead){const _0x46ed6a=_0x34766e,_0x12a81b=_0x290ead[_0x46ed6a(0x27c)];if(_0x12a81b['match'](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x423758=String(RegExp['$1'])[_0x46ed6a(0x3c1)](',')[_0x46ed6a(0x3df)](_0x201aa7=>_0x201aa7[_0x46ed6a(0x1c5)]()),_0x513131=VisuMZ[_0x46ed6a(0x33a)][_0x46ed6a(0x15a)](_0x423758);return _0x513131['includes'](this['currentClass']());}if(_0x12a81b[_0x46ed6a(0x34b)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){if(_0x46ed6a(0x248)!=='EHfpt'){const _0x502dae=String(RegExp['$1'])[_0x46ed6a(0x3c1)](',')[_0x46ed6a(0x3df)](_0x487995=>_0x487995[_0x46ed6a(0x1c5)]()),_0x300981=VisuMZ[_0x46ed6a(0x33a)][_0x46ed6a(0x15a)](_0x502dae);let _0x371978=[this[_0x46ed6a(0x36f)]()];return Imported[_0x46ed6a(0x2f9)]&&this[_0x46ed6a(0x228)]&&(_0x371978=this[_0x46ed6a(0x228)]()),_0x300981[_0x46ed6a(0xc7)](_0x34071f=>_0x371978['includes'](_0x34071f))[_0x46ed6a(0x198)]>0x0;}else _0x379ff3=_0x53c494,_0xcda9+=_0x6d6175;}return Game_BattlerBase[_0x46ed6a(0x31d)][_0x46ed6a(0x38d)][_0x46ed6a(0x3bf)](this,_0x290ead);},VisuMZ[_0x34766e(0x33a)]['ParseClassIDs']=function(_0x1d0d57){const _0x3556c9=_0x34766e,_0x41104f=[];for(let _0xf762a9 of _0x1d0d57){if(_0x3556c9(0x10a)!==_0x3556c9(0x10a))_0x2284fe[_0x3556c9(0x33a)][_0x3556c9(0x303)]['call'](this),this[_0x3556c9(0x38f)]&&this[_0x3556c9(0x38f)]['constructor']===_0x2aa1b8&&this[_0x3556c9(0x38f)][_0x3556c9(0x184)](this['item']());else{_0xf762a9=(String(_0xf762a9)||'')[_0x3556c9(0x1c5)]();const _0x26f935=/^\d+$/[_0x3556c9(0xec)](_0xf762a9);_0x26f935?_0x41104f['push'](Number(_0xf762a9)):_0x41104f[_0x3556c9(0x241)](DataManager[_0x3556c9(0x344)](_0xf762a9));}}return _0x41104f[_0x3556c9(0x3df)](_0x49a739=>$dataClasses[Number(_0x49a739)])[_0x3556c9(0x32d)](null);},Game_BattlerBase['prototype'][_0x34766e(0x299)]=function(_0x1d52c2){const _0x218cd3=_0x34766e,_0x59f438=_0x1d52c2[_0x218cd3(0x27c)];if(_0x59f438[_0x218cd3(0x34b)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x218cd3(0x2fc)!==_0x218cd3(0x2fc)){for(_0x4cd466 of _0x581935['SkillsStatesCore'][_0x218cd3(0x10e)][_0x218cd3(0xe9)]){if(_0x4b5fc4[_0x218cd3(0x31b)]['toUpperCase']()==='TP'){let _0x564e06=_0x1637de[_0x218cd3(0x251)][_0x218cd3(0x3bf)](this,_0x2e8705);return _0x564e06=this[_0x218cd3(0x1ed)](_0x114036,_0x564e06,_0x39109e),_0x564e06;}}return _0x597a01[_0x218cd3(0x33a)]['Game_BattlerBase_skillTpCost']['call'](this,_0x5e7dc4);}else{const _0x335ea8=JSON[_0x218cd3(0xf8)]('['+RegExp['$1'][_0x218cd3(0x34b)](/\d+/g)+']');for(const _0x4159e1 of _0x335ea8){if(_0x218cd3(0x2dc)!==_0x218cd3(0x386)){if(!$gameSwitches[_0x218cd3(0x194)](_0x4159e1))return![];}else{const _0x207fd6=_0x444410['x']+_0x246bce[_0x218cd3(0x226)]((_0x4812ea['width']-_0x10245e)/0x2);this[_0x218cd3(0x2ea)](_0x1097cd,_0x207fd6,_0x535518['y'],_0x302bdd);}}return!![];}}if(_0x59f438[_0x218cd3(0x34b)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5b5658=JSON[_0x218cd3(0xf8)]('['+RegExp['$1'][_0x218cd3(0x34b)](/\d+/g)+']');for(const _0xee3cef of _0x5b5658){if(_0x218cd3(0x130)!==_0x218cd3(0x111)){if(!$gameSwitches[_0x218cd3(0x194)](_0xee3cef))return![];}else{this[_0x218cd3(0x1d7)]=this['_stateOrigin']||{};const _0x3f5e34=_0x247479?this['convertTargetToStateOriginKey'](_0x51cabe):this[_0x218cd3(0x2ce)]();this[_0x218cd3(0x1d7)][_0xaff983]=_0x3f5e34;}}return!![];}if(_0x59f438['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x218cd3(0x155)===_0x218cd3(0x155)){const _0x3bd796=JSON[_0x218cd3(0xf8)]('['+RegExp['$1'][_0x218cd3(0x34b)](/\d+/g)+']');for(const _0x3043ab of _0x3bd796){if(_0x218cd3(0x193)===_0x218cd3(0x2c6)){_0x4d4ca5['SkillsStatesCore'][_0x218cd3(0x255)][_0x218cd3(0x3bf)](this,_0x4fdfc5);if(!this[_0x218cd3(0x11d)](_0x396979))this['eraseBuff'](_0x113990);}else{if($gameSwitches[_0x218cd3(0x194)](_0x3043ab))return!![];}}return![];}else{const _0x35b284=_0x20aa47[_0x218cd3(0xf8)]('['+_0x30973e['$1'][_0x218cd3(0x34b)](/\d+/g)+']');for(const _0x143bac of _0x35b284){if(_0x2b1829[_0x218cd3(0x321)](_0x143bac))return!![];}return![];}}if(_0x59f438['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2cca20=JSON[_0x218cd3(0xf8)]('['+RegExp['$1'][_0x218cd3(0x34b)](/\d+/g)+']');for(const _0x2c8af2 of _0x2cca20){if(!$gameSwitches[_0x218cd3(0x194)](_0x2c8af2))return!![];}return![];}if(_0x59f438[_0x218cd3(0x34b)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x519ac5=JSON[_0x218cd3(0xf8)]('['+RegExp['$1'][_0x218cd3(0x34b)](/\d+/g)+']');for(const _0x1db80b of _0x519ac5){if(!$gameSwitches[_0x218cd3(0x194)](_0x1db80b))return!![];}return![];}if(_0x59f438[_0x218cd3(0x34b)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x218cd3(0x165)===_0x218cd3(0x165)){const _0x4491fc=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x19c8ec of _0x4491fc){if(_0x218cd3(0x3d5)!=='RBOJQ'){const _0x16f546=_0x55e6b4[_0x218cd3(0x27c)],_0x5602a5=_0x31f54d[_0x218cd3(0x33a)][_0x218cd3(0x2b9)];return _0x5602a5[_0xca9120['id']]?_0x5602a5[_0xf62669['id']][_0x218cd3(0x3bf)](this,_0x12ad79):!![];}else{if($gameSwitches[_0x218cd3(0x194)](_0x19c8ec))return![];}}return!![];}else _0x440c24('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x1f75ea,_0x479879,_0x2b4bf6)),_0x3d3c06['exit']();}return!![];},Game_BattlerBase[_0x34766e(0x31d)]['meetsPassiveStateConditionJS']=function(_0x1458e1){const _0x37a6ae=_0x34766e,_0x478831=VisuMZ[_0x37a6ae(0x33a)][_0x37a6ae(0x2fd)];if(_0x478831[_0x1458e1['id']]&&!_0x478831[_0x1458e1['id']][_0x37a6ae(0x3bf)](this,_0x1458e1))return![];return!![];},Game_BattlerBase[_0x34766e(0x31d)]['meetsPassiveStateGlobalConditionJS']=function(_0x56207d){const _0xf6e7d9=_0x34766e;return VisuMZ[_0xf6e7d9(0x33a)][_0xf6e7d9(0x10e)][_0xf6e7d9(0x150)]['PassiveConditionJS']['call'](this,_0x56207d);},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x174)]=function(){const _0x2fb9a1=_0x34766e;if(this[_0x2fb9a1(0x3bb)]('passiveStates'))return this['convertPassiveStates']();if(this[_0x2fb9a1(0x145)])return[];return this['_checkingVisuMzPassiveStateObjects']=!![],this[_0x2fb9a1(0x2f8)](),this[_0x2fb9a1(0x145)]=undefined,this['convertPassiveStates']();},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x2f8)]=function(){const _0x3ed0a0=_0x34766e;this['_checkingVisuMzPassiveStateObjects']=!![],this[_0x3ed0a0(0x191)][_0x3ed0a0(0x174)]=[],this[_0x3ed0a0(0x2cc)](),this[_0x3ed0a0(0x279)](),this[_0x3ed0a0(0x2b0)](),this[_0x3ed0a0(0x145)]=undefined;},Game_BattlerBase['prototype'][_0x34766e(0x2cc)]=function(){const _0x439e59=_0x34766e;if(Imported[_0x439e59(0x3e8)])this['addPassiveStatesTraitSets']();},Game_BattlerBase['prototype'][_0x34766e(0x26f)]=function(){return[];},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x279)]=function(){const _0x33e681=_0x34766e,_0x350e0c=this[_0x33e681(0x26f)]();for(const _0x502a23 of _0x350e0c){if(_0x33e681(0x2d7)!==_0x33e681(0x3b5)){if(!_0x502a23)continue;const _0x18f846=_0x502a23[_0x33e681(0x27c)][_0x33e681(0x34b)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x18f846)for(const _0x5de35a of _0x18f846){if(_0x33e681(0x37a)===_0x33e681(0x37a)){_0x5de35a[_0x33e681(0x34b)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x24754a=RegExp['$1'];if(_0x24754a[_0x33e681(0x34b)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x327577=JSON[_0x33e681(0xf8)]('['+RegExp['$1'][_0x33e681(0x34b)](/\d+/g)+']');this['_cache'][_0x33e681(0x174)]=this[_0x33e681(0x191)][_0x33e681(0x174)][_0x33e681(0x366)](_0x327577);}else{const _0x4f3ba8=_0x24754a[_0x33e681(0x3c1)](',');for(const _0x271eaf of _0x4f3ba8){const _0x2df858=DataManager[_0x33e681(0x1c2)](_0x271eaf);if(_0x2df858)this[_0x33e681(0x191)][_0x33e681(0x174)]['push'](_0x2df858);}}}else _0x19dc4f[_0x33e681(0x33a)][_0x33e681(0x10e)][_0x33e681(0xb4)]['onAddBuffJS'][_0x33e681(0x3bf)](this,_0x433499,_0x16252e);}}else return this[_0x33e681(0x179)]();}},Game_BattlerBase['prototype'][_0x34766e(0x2b0)]=function(){const _0x1360e2=_0x34766e,_0x58b429=VisuMZ[_0x1360e2(0x33a)][_0x1360e2(0x10e)]['PassiveStates'][_0x1360e2(0x3db)];this[_0x1360e2(0x191)]['passiveStates']=this[_0x1360e2(0x191)][_0x1360e2(0x174)][_0x1360e2(0x366)](_0x58b429);},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x39d)]=function(_0x4ec875){const _0x446a84=_0x34766e;if(typeof _0x4ec875!==_0x446a84(0x3a1))_0x4ec875=_0x4ec875['id'];return this[_0x446a84(0x18c)][_0x4ec875]||0x0;},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x14e)]=function(_0x4d7e54,_0x5e26fe){const _0x504dad=_0x34766e;if(typeof _0x4d7e54!==_0x504dad(0x3a1))_0x4d7e54=_0x4d7e54['id'];if(this[_0x504dad(0x215)](_0x4d7e54)){if('KYjCq'!=='KYjCq')_0x462dec+=this['buffTurns'](_0x2bb455),this['setBuffTurns'](_0x17f7ca,_0x5ad19f);else{const _0x2b9e69=DataManager[_0x504dad(0x211)](_0x4d7e54);this[_0x504dad(0x18c)][_0x4d7e54]=_0x5e26fe[_0x504dad(0x377)](0x0,_0x2b9e69);if(this['_stateTurns'][_0x4d7e54]<=0x0)this[_0x504dad(0x13b)](_0x4d7e54);}}},Game_BattlerBase['prototype'][_0x34766e(0x361)]=function(_0x5d15e9,_0x33e0fb){const _0x18d3fe=_0x34766e;if(typeof _0x5d15e9!==_0x18d3fe(0x3a1))_0x5d15e9=_0x5d15e9['id'];this[_0x18d3fe(0x215)](_0x5d15e9)&&(_0x33e0fb+=this[_0x18d3fe(0x39d)](_0x5d15e9),this['setStateTurns'](_0x5d15e9,_0x33e0fb));},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x2da)]=Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x359)],Game_BattlerBase['prototype']['eraseBuff']=function(_0x39d297){const _0x26e4a1=_0x34766e,_0x385c07=this[_0x26e4a1(0xed)][_0x39d297];VisuMZ[_0x26e4a1(0x33a)][_0x26e4a1(0x2da)][_0x26e4a1(0x3bf)](this,_0x39d297);if(_0x385c07>0x0)this[_0x26e4a1(0x116)](_0x39d297);if(_0x385c07<0x0)this[_0x26e4a1(0x351)](_0x39d297);},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x255)]=Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x121)],Game_BattlerBase['prototype'][_0x34766e(0x121)]=function(_0x1d89d0){const _0x171688=_0x34766e;VisuMZ['SkillsStatesCore'][_0x171688(0x255)]['call'](this,_0x1d89d0);if(!this['isBuffOrDebuffAffected'](_0x1d89d0))this['eraseBuff'](_0x1d89d0);},VisuMZ[_0x34766e(0x33a)][_0x34766e(0xc4)]=Game_BattlerBase['prototype'][_0x34766e(0x33f)],Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x33f)]=function(_0x414b81){const _0x4a523a=_0x34766e;VisuMZ['SkillsStatesCore']['Game_BattlerBase_decreaseBuff'][_0x4a523a(0x3bf)](this,_0x414b81);if(!this[_0x4a523a(0x11d)](_0x414b81))this[_0x4a523a(0x359)](_0x414b81);},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x116)]=function(_0x205a33){},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x351)]=function(_0x3e5033){},Game_BattlerBase['prototype'][_0x34766e(0x11f)]=function(_0x3dceb3){const _0x5a55aa=_0x34766e;return this[_0x5a55aa(0xed)][_0x3dceb3]===VisuMZ[_0x5a55aa(0x33a)][_0x5a55aa(0x10e)][_0x5a55aa(0xb4)]['StackBuffMax'];},Game_BattlerBase['prototype'][_0x34766e(0x210)]=function(_0x4a432a){const _0x64c352=_0x34766e;return this[_0x64c352(0xed)][_0x4a432a]===-VisuMZ[_0x64c352(0x33a)]['Settings'][_0x64c352(0xb4)]['StackDebuffMax'];},VisuMZ['SkillsStatesCore'][_0x34766e(0x276)]=Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x132)],Game_BattlerBase[_0x34766e(0x31d)]['buffIconIndex']=function(_0x41a103,_0x10ee71){const _0x3b5a7e=_0x34766e;return _0x41a103=_0x41a103[_0x3b5a7e(0x377)](-0x2,0x2),VisuMZ[_0x3b5a7e(0x33a)][_0x3b5a7e(0x276)][_0x3b5a7e(0x3bf)](this,_0x41a103,_0x10ee71);},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x3a3)]=function(_0x454a86){const _0x5db6b9=_0x34766e,_0x233aef=this[_0x5db6b9(0xed)][_0x454a86];return VisuMZ[_0x5db6b9(0x33a)]['Settings']['Buffs']['MultiplierJS'][_0x5db6b9(0x3bf)](this,_0x454a86,_0x233aef);},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x107)]=function(_0xaf68a4){const _0x4f7080=_0x34766e;return this[_0x4f7080(0x117)][_0xaf68a4]||0x0;},Game_BattlerBase['prototype'][_0x34766e(0x275)]=function(_0x463c0e){const _0x58e88f=_0x34766e;return this[_0x58e88f(0x107)](_0x463c0e);},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0xef)]=function(_0x14fb53,_0x626bc3){const _0x292fcd=_0x34766e;if(this[_0x292fcd(0x1bf)](_0x14fb53)){if(_0x292fcd(0x26e)!==_0x292fcd(0x26e)){const _0x5a3440=_0x4ef9d9[_0x462fbd[_0x292fcd(0x2db)]];if(_0x5a3440&&!_0x21cf18[_0x292fcd(0x183)](_0x5a3440))_0x215d51['push'](_0x5a3440);}else{const _0x24996c=VisuMZ[_0x292fcd(0x33a)][_0x292fcd(0x10e)]['Buffs'][_0x292fcd(0x368)];this[_0x292fcd(0x117)][_0x14fb53]=_0x626bc3[_0x292fcd(0x377)](0x0,_0x24996c);}}},Game_BattlerBase[_0x34766e(0x31d)]['addBuffTurns']=function(_0x471280,_0x579813){const _0x25d4bb=_0x34766e;this['isBuffAffected'](_0x471280)&&(_0x579813+=this[_0x25d4bb(0x107)](stateId),this[_0x25d4bb(0xef)](_0x471280,_0x579813));},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x326)]=function(_0x168af8,_0x5c80d1){const _0x47bf77=_0x34766e;if(this[_0x47bf77(0x3e1)](_0x168af8)){if('VoRsZ'!==_0x47bf77(0x3d3)){const _0x471fe4=this[_0x47bf77(0x1d0)]!==_0x3cdf8e;_0x380acc[_0x47bf77(0x33a)][_0x47bf77(0x2d3)][_0x47bf77(0x3bf)](this,_0x22cbc1),_0x471fe4&&(this[_0x47bf77(0x38f)]&&this['_statusWindow'][_0x47bf77(0x11b)]===_0x1d65ba&&this[_0x47bf77(0x38f)][_0x47bf77(0x184)](this[_0x47bf77(0x1a3)](0x0)));}else{const _0x104246=VisuMZ[_0x47bf77(0x33a)][_0x47bf77(0x10e)]['Buffs']['MaxTurns'];this[_0x47bf77(0x117)][_0x168af8]=_0x5c80d1[_0x47bf77(0x377)](0x0,_0x104246);}}},Game_BattlerBase[_0x34766e(0x31d)]['addDebuffTurns']=function(_0x1665fd,_0x38d548){const _0x3ecc5c=_0x34766e;this[_0x3ecc5c(0x3e1)](_0x1665fd)&&(_0x38d548+=this['buffTurns'](stateId),this[_0x3ecc5c(0x326)](_0x1665fd,_0x38d548));},Game_BattlerBase['prototype'][_0x34766e(0x1d6)]=function(_0x49d2f6){const _0x29f9e9=_0x34766e;if(typeof _0x49d2f6!==_0x29f9e9(0x3a1))_0x49d2f6=_0x49d2f6['id'];return this[_0x29f9e9(0x126)]=this['_stateData']||{},this[_0x29f9e9(0x126)][_0x49d2f6]=this[_0x29f9e9(0x126)][_0x49d2f6]||{},this[_0x29f9e9(0x126)][_0x49d2f6];},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x310)]=function(_0x3aea3a,_0xb37a83){const _0x33d32f=_0x34766e;if(typeof _0x3aea3a!==_0x33d32f(0x3a1))_0x3aea3a=_0x3aea3a['id'];const _0x5c3c76=this[_0x33d32f(0x1d6)](_0x3aea3a);return _0x5c3c76[_0xb37a83];},Game_BattlerBase['prototype'][_0x34766e(0x152)]=function(_0x2b6f86,_0x41f9b1,_0x26041c){const _0x3ea3e4=_0x34766e;if(typeof _0x2b6f86!==_0x3ea3e4(0x3a1))_0x2b6f86=_0x2b6f86['id'];const _0xd4c0d3=this[_0x3ea3e4(0x1d6)](_0x2b6f86);_0xd4c0d3[_0x41f9b1]=_0x26041c;},Game_BattlerBase['prototype'][_0x34766e(0x159)]=function(_0x3785e1){const _0x1a35a6=_0x34766e;if(typeof _0x3785e1!=='number')_0x3785e1=_0x3785e1['id'];this[_0x1a35a6(0x126)]=this[_0x1a35a6(0x126)]||{},this['_stateData'][_0x3785e1]={};},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0xf5)]=function(_0x1bd373){const _0x1e92cd=_0x34766e;if(typeof _0x1bd373!==_0x1e92cd(0x3a1))_0x1bd373=_0x1bd373['id'];return this[_0x1e92cd(0x17d)]=this['_stateDisplay']||{},this['_stateDisplay'][_0x1bd373]===undefined&&(this[_0x1e92cd(0x17d)][_0x1bd373]=''),this['_stateDisplay'][_0x1bd373];},Game_BattlerBase['prototype'][_0x34766e(0xc0)]=function(_0x394ae4,_0x11eaf8){const _0x34efca=_0x34766e;if(typeof _0x394ae4!==_0x34efca(0x3a1))_0x394ae4=_0x394ae4['id'];this[_0x34efca(0x17d)]=this[_0x34efca(0x17d)]||{},this[_0x34efca(0x17d)][_0x394ae4]=_0x11eaf8;},Game_BattlerBase[_0x34766e(0x31d)]['clearStateDisplay']=function(_0x4e1e91){const _0xab1061=_0x34766e;if(typeof _0x4e1e91!==_0xab1061(0x3a1))_0x4e1e91=_0x4e1e91['id'];this[_0xab1061(0x17d)]=this[_0xab1061(0x17d)]||{},this['_stateDisplay'][_0x4e1e91]='';},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x3c6)]=function(_0x3dc32c){const _0x38c9c9=_0x34766e;if(typeof _0x3dc32c!==_0x38c9c9(0x3a1))_0x3dc32c=_0x3dc32c['id'];this[_0x38c9c9(0x1d7)]=this[_0x38c9c9(0x1d7)]||{},this[_0x38c9c9(0x1d7)][_0x3dc32c]=this[_0x38c9c9(0x1d7)][_0x3dc32c]||_0x38c9c9(0x25f);const _0x3ebea5=this['_stateOrigin'][_0x3dc32c];return this[_0x38c9c9(0x374)](_0x3ebea5);},Game_BattlerBase['prototype'][_0x34766e(0x177)]=function(_0x4b3adc,_0x5a52a9){const _0x432461=_0x34766e;this[_0x432461(0x1d7)]=this[_0x432461(0x1d7)]||{};const _0x2b6119=_0x5a52a9?this[_0x432461(0x39b)](_0x5a52a9):this[_0x432461(0x2ce)]();this['_stateOrigin'][_0x4b3adc]=_0x2b6119;},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x1f1)]=function(_0x5be5b4){const _0x7525ef=_0x34766e;this[_0x7525ef(0x1d7)]=this[_0x7525ef(0x1d7)]||{},delete this['_stateOrigin'][_0x5be5b4];},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x2ce)]=function(){const _0x3b99bc=this['getCurrentStateActiveUser']();return this['convertTargetToStateOriginKey'](_0x3b99bc);},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x216)]=function(){const _0x2dfee2=_0x34766e;if($gameParty['inBattle']()){if(BattleManager[_0x2dfee2(0xb5)])return BattleManager['_subject'];else{if(BattleManager[_0x2dfee2(0x1c9)])return BattleManager[_0x2dfee2(0x1c9)];}}else{const _0x200708=SceneManager[_0x2dfee2(0x3c0)];if(![Scene_Map,Scene_Item][_0x2dfee2(0x183)](_0x200708['constructor'])){if('UmxSC'!==_0x2dfee2(0x235))return $gameParty[_0x2dfee2(0x2ad)]();else{const _0x322e7f=this[_0x2dfee2(0x3ab)](),_0x5cb60b=_0x17636c[_0x2dfee2(0x226)]((_0x2f903a-0x2)*_0x322e7f),_0x3a7326=_0x44da41-0x2,_0x4cf48d=this['gaugeBackColor']();this[_0x2dfee2(0xb3)][_0x2dfee2(0x128)](_0x159b49,_0x66d0d1,_0x5ab6ee,_0x2f8c9e,_0x4cf48d),this[_0x2dfee2(0xb3)][_0x2dfee2(0x2a2)](_0x46be1b+0x1,_0x54d465+0x1,_0x5cb60b,_0x3a7326,_0x201896,_0x37159a);}}}return this;},Game_BattlerBase[_0x34766e(0x31d)]['convertTargetToStateOriginKey']=function(_0xec5f9d){const _0x51c3af=_0x34766e;if(!_0xec5f9d)return _0x51c3af(0x25f);if(_0xec5f9d[_0x51c3af(0x106)]()){if(_0x51c3af(0x3ca)==='CatOn')return _0x51c3af(0x307)[_0x51c3af(0xc3)](_0xec5f9d[_0x51c3af(0x2f1)]());else{const _0x369457=_0x428b6f[_0x51c3af(0x33a)][_0x51c3af(0x10e)]['Gauge'];if(_0x369457['MatchLabelColor']){if(_0x369457[_0x51c3af(0x342)]===0x1)return this[_0x51c3af(0x186)]();else{if(_0x369457[_0x51c3af(0x342)]===0x2)return this[_0x51c3af(0x3af)]();}}const _0xae38db=_0x369457['PresetLabelGaugeColor'];return _0x28aab7[_0x51c3af(0x328)](_0xae38db);}}else{const _0x1baf55=_0x51c3af(0x319)[_0x51c3af(0xc3)](_0xec5f9d[_0x51c3af(0x3ef)]()),_0x533f86=_0x51c3af(0x1d9)['format'](_0xec5f9d[_0x51c3af(0x24b)]()),_0x3e637e=_0x51c3af(0x268)['format']($gameTroop[_0x51c3af(0x1f8)]());return _0x51c3af(0xd3)[_0x51c3af(0xc3)](_0x1baf55,_0x533f86,_0x3e637e);}return _0x51c3af(0x25f);},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x374)]=function(_0x3c0a8c){const _0xd56a06=_0x34766e;if(_0x3c0a8c==='user')return this;else{if(_0x3c0a8c[_0xd56a06(0x34b)](/<actor-(\d+)>/i))return _0xd56a06(0x2de)!=='SnEGs'?_0x5e8dd[_0xd56a06(0x33a)][_0xd56a06(0x10e)][_0xd56a06(0x1c8)][_0xd56a06(0x2ab)]['call'](this):$gameActors['actor'](Number(RegExp['$1']));else{if($gameParty[_0xd56a06(0x3d8)]()&&_0x3c0a8c[_0xd56a06(0x34b)](/<troop-(\d+)>/i)){if('VKlQn'===_0xd56a06(0x1b2)){const _0x56bb4c=Number(RegExp['$1']);if(_0x56bb4c===$gameTroop[_0xd56a06(0x1f8)]()){if(_0x3c0a8c[_0xd56a06(0x34b)](/<member-(\d+)>/i)){if(_0xd56a06(0x3ac)!==_0xd56a06(0x387))return $gameTroop[_0xd56a06(0x38b)]()[Number(RegExp['$1'])];else _0x111c1a[_0xd56a06(0x33a)][_0xd56a06(0xf7)]['call'](this,_0x139c14),this[_0xd56a06(0x191)]={},this[_0xd56a06(0x174)]();}}}else _0x1b6d3f[_0xd56a06(0x33a)][_0xd56a06(0x1dd)][_0xd56a06(0x3bf)](this,_0x14cee3),this[_0xd56a06(0x164)]();}if(_0x3c0a8c[_0xd56a06(0x34b)](/<enemy-(\d+)>/i)){if(_0xd56a06(0x1a7)===_0xd56a06(0x1a7))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);else _0x7ebe02+=this['buffTurns'](_0x2dc534),this[_0xd56a06(0x326)](_0x17fd21,_0x1110c6);}}}return this;},VisuMZ[_0x34766e(0x33a)]['Game_Battler_addState']=Game_Battler['prototype'][_0x34766e(0x209)],Game_Battler[_0x34766e(0x31d)]['addState']=function(_0x8afcfd){const _0x16a340=_0x34766e,_0x477b94=this[_0x16a340(0x29f)](_0x8afcfd);VisuMZ[_0x16a340(0x33a)][_0x16a340(0x385)][_0x16a340(0x3bf)](this,_0x8afcfd);if(_0x477b94&&this[_0x16a340(0x3b1)]($dataStates[_0x8afcfd])){this[_0x16a340(0x36d)](_0x8afcfd);;}},VisuMZ['SkillsStatesCore']['Game_Battler_isStateAddable']=Game_Battler[_0x34766e(0x31d)]['isStateAddable'],Game_Battler[_0x34766e(0x31d)][_0x34766e(0x29f)]=function(_0x54732f){const _0x4f546d=_0x34766e,_0x55c29c=$dataStates[_0x54732f];if(_0x55c29c&&_0x55c29c['note'][_0x4f546d(0x34b)](/<NO DEATH CLEAR>/i))return!this[_0x4f546d(0x379)](_0x54732f)&&!this[_0x4f546d(0x243)](_0x54732f)&&!this[_0x4f546d(0x15c)][_0x4f546d(0x280)](_0x54732f);return VisuMZ[_0x4f546d(0x33a)][_0x4f546d(0x397)][_0x4f546d(0x3bf)](this,_0x54732f);},Game_Battler[_0x34766e(0x31d)][_0x34766e(0x36d)]=function(_0xdad574){const _0x56bd7d=_0x34766e;this['setStateOrigin'](_0xdad574),this['removeOtherStatesOfSameCategory'](_0xdad574),this[_0x56bd7d(0x25d)](_0xdad574),this[_0x56bd7d(0x298)](_0xdad574),this[_0x56bd7d(0x3d1)](_0xdad574);},Game_Battler[_0x34766e(0x31d)]['onRemoveState']=function(_0x420178){const _0x5b4d61=_0x34766e;this[_0x5b4d61(0x292)](_0x420178),this[_0x5b4d61(0x18b)](_0x420178),Game_BattlerBase[_0x5b4d61(0x31d)][_0x5b4d61(0x2d6)][_0x5b4d61(0x3bf)](this,_0x420178);},Game_Battler['prototype'][_0x34766e(0x398)]=function(_0x47e370){const _0x462968=_0x34766e;for(const _0x927863 of this[_0x462968(0x33c)]()){if(_0x462968(0x2f5)!=='PWaiT'){if(this[_0x462968(0x21b)](_0x927863['id'])&&_0x927863[_0x462968(0x15f)]===_0x47e370){if(_0x462968(0x1c1)!==_0x462968(0x1c1)){let _0x43eaa0=this[_0x462968(0x215)](_0x5e5e95);_0x39eeb6[_0x462968(0x33a)]['Game_BattlerBase_eraseState'][_0x462968(0x3bf)](this,_0xbc0134);if(_0x43eaa0&&!this[_0x462968(0x215)](_0x58257c))this[_0x462968(0x2d6)](_0x1bdc9f);}else this[_0x462968(0x13b)](_0x927863['id']),this['onExpireState'](_0x927863['id']),this['onExpireStateGlobalJS'](_0x927863['id']);}}else this[_0x462968(0x2e8)]='';}},Game_Battler[_0x34766e(0x31d)][_0x34766e(0x2c7)]=function(_0x550d24){const _0x5ae891=_0x34766e;this[_0x5ae891(0x153)](_0x550d24);},Game_Battler[_0x34766e(0x31d)]['onAddStateCustomJS']=function(_0x3ee3ed){const _0x472f10=_0x34766e;if(this[_0x472f10(0x2ef)]||this[_0x472f10(0x1df)])return;const _0x9f1fd2=VisuMZ[_0x472f10(0x33a)][_0x472f10(0x317)];if(_0x9f1fd2[_0x3ee3ed])_0x9f1fd2[_0x3ee3ed][_0x472f10(0x3bf)](this,_0x3ee3ed);},Game_Battler[_0x34766e(0x31d)][_0x34766e(0x292)]=function(_0x2f2665){const _0x3b7a17=_0x34766e;if(this[_0x3b7a17(0x2ef)]||this['_tempBattler'])return;const _0x8427c6=VisuMZ['SkillsStatesCore']['stateEraseJS'];if(_0x8427c6[_0x2f2665])_0x8427c6[_0x2f2665][_0x3b7a17(0x3bf)](this,_0x2f2665);},Game_Battler[_0x34766e(0x31d)][_0x34766e(0x153)]=function(_0x26e45b){const _0x6ff03e=_0x34766e;if(this[_0x6ff03e(0x2ef)]||this[_0x6ff03e(0x1df)])return;const _0x2c6810=VisuMZ['SkillsStatesCore']['stateExpireJS'];if(_0x2c6810[_0x26e45b])_0x2c6810[_0x26e45b][_0x6ff03e(0x3bf)](this,_0x26e45b);},Game_Battler[_0x34766e(0x31d)][_0x34766e(0x3d1)]=function(_0x206ac6){const _0x371f65=_0x34766e;if(this[_0x371f65(0x2ef)]||this[_0x371f65(0x1df)])return;try{VisuMZ[_0x371f65(0x33a)][_0x371f65(0x10e)]['States'][_0x371f65(0x245)][_0x371f65(0x3bf)](this,_0x206ac6);}catch(_0x98f2f2){if($gameTemp[_0x371f65(0x382)]())console[_0x371f65(0x19a)](_0x98f2f2);}},Game_Battler[_0x34766e(0x31d)][_0x34766e(0x18b)]=function(_0x3bbd22){const _0x255fb0=_0x34766e;if(this[_0x255fb0(0x2ef)]||this[_0x255fb0(0x1df)])return;try{if(_0x255fb0(0x1a9)===_0x255fb0(0x1ff)){if(_0x45c55c[_0x255fb0(0x382)]())_0x556153[_0x255fb0(0x19a)](_0x494368);}else VisuMZ[_0x255fb0(0x33a)][_0x255fb0(0x10e)][_0x255fb0(0x12d)][_0x255fb0(0x12b)][_0x255fb0(0x3bf)](this,_0x3bbd22);}catch(_0x49e63b){if(_0x255fb0(0x357)!==_0x255fb0(0x357)){const _0x54b41c=_0x16864a[_0x255fb0(0xf8)]('['+_0x8e81bc['$1'][_0x255fb0(0x34b)](/\d+/g)+']');for(const _0x19c649 of _0x54b41c){if(!_0x47d9fb[_0x255fb0(0x194)](_0x19c649))return![];}return!![];}else{if($gameTemp['isPlaytest']())console[_0x255fb0(0x19a)](_0x49e63b);}}},Game_Battler[_0x34766e(0x31d)]['onExpireStateGlobalJS']=function(_0x5c6629){const _0x53219a=_0x34766e;if(this[_0x53219a(0x2ef)]||this[_0x53219a(0x1df)])return;try{VisuMZ[_0x53219a(0x33a)]['Settings'][_0x53219a(0x12d)]['onExpireStateJS'][_0x53219a(0x3bf)](this,_0x5c6629);}catch(_0x196aaf){if($gameTemp[_0x53219a(0x382)]())console[_0x53219a(0x19a)](_0x196aaf);}},Game_Battler[_0x34766e(0x31d)]['statesByCategory']=function(_0x3374d3){const _0x23875f=_0x34766e;return _0x3374d3=_0x3374d3['toUpperCase']()['trim'](),this[_0x23875f(0x33c)]()[_0x23875f(0xc7)](_0x36bdc2=>_0x36bdc2[_0x23875f(0x3eb)]['includes'](_0x3374d3));},Game_Battler['prototype'][_0x34766e(0x171)]=function(_0x5b2365,_0x3f4a62){const _0x46f03e=_0x34766e;_0x5b2365=_0x5b2365['toUpperCase']()[_0x46f03e(0x1c5)](),_0x3f4a62=_0x3f4a62||0x0;const _0x4a8d26=this[_0x46f03e(0x157)](_0x5b2365),_0xb6b81f=[];for(const _0x1da3f8 of _0x4a8d26){if(_0x46f03e(0x2ec)!==_0x46f03e(0x2ec)){if(this[_0x46f03e(0x1bf)](_0x2ced93)){const _0x4fcca6=_0xb405e9['SkillsStatesCore'][_0x46f03e(0x10e)][_0x46f03e(0xb4)][_0x46f03e(0x368)];this[_0x46f03e(0x117)][_0x10c039]=_0x289dca[_0x46f03e(0x377)](0x0,_0x4fcca6);}}else{if(!_0x1da3f8)continue;if(_0x3f4a62<=0x0)break;_0xb6b81f[_0x46f03e(0x241)](_0x1da3f8['id']),this[_0x46f03e(0x15c)][_0x46f03e(0x140)]=!![],_0x3f4a62--;}}while(_0xb6b81f[_0x46f03e(0x198)]>0x0){this[_0x46f03e(0x13b)](_0xb6b81f[_0x46f03e(0xdf)]());}},Game_Battler[_0x34766e(0x31d)][_0x34766e(0x11c)]=function(_0x6fb14d,_0x1819a4){const _0xf15b08=_0x34766e;_0x6fb14d=_0x6fb14d[_0xf15b08(0x3ea)]()[_0xf15b08(0x1c5)](),_0x1819a4=_0x1819a4||[];const _0x3d938c=this['statesByCategory'](_0x6fb14d),_0x70504d=[];for(const _0x1baba8 of _0x3d938c){if(!_0x1baba8)continue;if(_0x1819a4[_0xf15b08(0x183)](_0x1baba8))continue;_0x70504d['push'](_0x1baba8['id']),this[_0xf15b08(0x15c)][_0xf15b08(0x140)]=!![];}while(_0x70504d[_0xf15b08(0x198)]>0x0){this['removeState'](_0x70504d[_0xf15b08(0xdf)]());}},Game_Battler['prototype'][_0x34766e(0x244)]=function(_0x26ec94){const _0x325770=_0x34766e;return this[_0x325770(0x1ee)](_0x26ec94)>0x0;},Game_Battler[_0x34766e(0x31d)]['hasStateCategory']=function(_0x225bf8){const _0x189019=_0x34766e;return this[_0x189019(0x24a)](_0x225bf8)>0x0;},Game_Battler['prototype'][_0x34766e(0x1ee)]=function(_0x2c1b7b){const _0xd55b9c=_0x34766e,_0x4b4906=this['statesByCategory'](_0x2c1b7b)[_0xd55b9c(0xc7)](_0x53221c=>this[_0xd55b9c(0x215)](_0x53221c['id']));return _0x4b4906['length'];},Game_Battler[_0x34766e(0x31d)][_0x34766e(0x24a)]=function(_0x5b9221){const _0x4913f0=_0x34766e,_0x230503=this[_0x4913f0(0x157)](_0x5b9221);return _0x230503['length'];},VisuMZ[_0x34766e(0x33a)]['Game_BattlerBase_isStateResist']=Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x379)],Game_BattlerBase['prototype'][_0x34766e(0x379)]=function(_0x3b4b80){const _0x31a346=_0x34766e,_0x3bb7c7=$dataStates[_0x3b4b80];if(_0x3bb7c7&&_0x3bb7c7[_0x31a346(0x3eb)][_0x31a346(0x198)]>0x0)for(const _0x1aa961 of _0x3bb7c7[_0x31a346(0x3eb)]){if('tsXbY'===_0x31a346(0x1fc)){if(!_0x1c37ad)return![];if(!_0x5c3af0[_0x31a346(0x33a)]['Game_BattlerBase_meetsSkillConditions'][_0x31a346(0x3bf)](this,_0x3e4ded))return![];if(!this[_0x31a346(0xca)](_0x2dd478))return![];if(!this['meetsSkillConditionsEnableJS'](_0x140725))return![];if(!this[_0x31a346(0x1f4)](_0x28d72e))return![];return!![];}else{if(this[_0x31a346(0x120)](_0x1aa961))return!![];}}return VisuMZ[_0x31a346(0x33a)]['Game_BattlerBase_isStateResist'][_0x31a346(0x3bf)](this,_0x3b4b80);},Game_BattlerBase['prototype']['isStateCategoryResisted']=function(_0x4b0136){const _0x567199=_0x34766e;let _0x15baa2=_0x567199(0x148);if(this['checkCacheKey'](_0x15baa2))return this['_cache'][_0x15baa2][_0x567199(0x183)](_0x4b0136);return this['_cache'][_0x15baa2]=this['makeResistedStateCategories'](),this[_0x567199(0x191)][_0x15baa2][_0x567199(0x183)](_0x4b0136);},Game_BattlerBase[_0x34766e(0x31d)]['makeResistedStateCategories']=function(){const _0x33a16f=_0x34766e,_0x5042ea=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x37f4d8=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x1023c0=[];for(const _0x233ad1 of this['traitObjects']()){if(!_0x233ad1)continue;const _0x29887b=_0x233ad1[_0x33a16f(0x27c)],_0x255c49=_0x29887b[_0x33a16f(0x34b)](_0x5042ea);if(_0x255c49){if(_0x33a16f(0x258)==='TQsJr'){const _0x487eef=_0x33a16f(0x1aa);this[_0x33a16f(0x17e)]=this[_0x33a16f(0x17e)]||{};if(this[_0x33a16f(0x17e)][_0x487eef])return this[_0x33a16f(0x17e)][_0x487eef];const _0x289ce0=_0xb6720d[_0x33a16f(0x33a)][_0x33a16f(0x10e)][_0x33a16f(0xb4)][_0x33a16f(0x187)];return this[_0x33a16f(0x1bc)](_0x487eef,_0x289ce0);}else for(const _0x5d2653 of _0x255c49){_0x5d2653[_0x33a16f(0x34b)](_0x5042ea);const _0x4e9440=String(RegExp['$1'])[_0x33a16f(0x3c1)](',')[_0x33a16f(0x3df)](_0x49ba2f=>String(_0x49ba2f)[_0x33a16f(0x3ea)]()['trim']());_0x1023c0=_0x1023c0['concat'](_0x4e9440);}}if(_0x29887b[_0x33a16f(0x34b)](_0x37f4d8)){if(_0x33a16f(0x11e)!=='HmhNX')_0x329373[_0x33a16f(0x33a)]['Scene_Skill_createItemWindow'][_0x33a16f(0x3bf)](this),this[_0x33a16f(0x29a)]()&&this[_0x33a16f(0x370)]();else{const _0x5761ac=String(RegExp['$1'])[_0x33a16f(0x3c1)](/[\r\n]+/)[_0x33a16f(0x3df)](_0x160adc=>String(_0x160adc)[_0x33a16f(0x3ea)]()[_0x33a16f(0x1c5)]());_0x1023c0=_0x1023c0[_0x33a16f(0x366)](_0x5761ac);}}}return _0x1023c0;},Game_BattlerBase['prototype'][_0x34766e(0x28d)]=function(_0x55d778){const _0x20ea82=_0x34766e,_0x3c0938=$dataStates[_0x55d778];if(!_0x3c0938)return;const _0x120e63=_0x3c0938[_0x20ea82(0x27c)]||'',_0x19a9b5=_0x120e63['match'](/<REMOVE OTHER (.*) STATES>/gi);if(_0x19a9b5){const _0x175961=[_0x3c0938];for(const _0x3716b5 of _0x19a9b5){if(_0x20ea82(0x2e0)!==_0x20ea82(0x2e0))this[_0x20ea82(0x15e)](_0x5e684c);else{_0x3716b5[_0x20ea82(0x34b)](/<REMOVE OTHER (.*) STATES>/i);const _0x9455e5=String(RegExp['$1']);this['removeStatesByCategoryAll'](_0x9455e5,_0x175961);}}}},VisuMZ[_0x34766e(0x33a)][_0x34766e(0xe7)]=Game_Battler['prototype']['addBuff'],Game_Battler[_0x34766e(0x31d)][_0x34766e(0x2a7)]=function(_0x188200,_0x57f920){const _0x46d37b=_0x34766e;VisuMZ['SkillsStatesCore']['Game_Battler_addBuff']['call'](this,_0x188200,_0x57f920),this[_0x46d37b(0x1bf)](_0x188200)&&this['onAddBuff'](_0x188200,_0x57f920);},Game_Battler[_0x34766e(0x31d)][_0x34766e(0x20a)]=function(_0xcd3735){},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x1e4)]=Game_Battler[_0x34766e(0x31d)][_0x34766e(0x234)],Game_Battler['prototype'][_0x34766e(0x234)]=function(_0xc89bed,_0x1bc8cc){const _0x404201=_0x34766e;VisuMZ['SkillsStatesCore']['Game_Battler_addDebuff']['call'](this,_0xc89bed,_0x1bc8cc),this[_0x404201(0x3e1)](_0xc89bed)&&(_0x404201(0xbb)!=='ibOCI'?this['onAddDebuff'](_0xc89bed,_0x1bc8cc):this['drawTextEx'](_0xd15262,_0x1308c4['x'],_0x3e8e4a['y'],_0x402cf0));},Game_Battler[_0x34766e(0x31d)]['removeBuffsAuto']=function(){const _0x2a063c=_0x34766e;for(let _0x55577c=0x0;_0x55577c<this[_0x2a063c(0x312)]();_0x55577c++){if(this['isBuffExpired'](_0x55577c)){if(_0x2a063c(0x1cd)!=='NgdGl'){const _0x4ab7b4=this[_0x2a063c(0xed)][_0x55577c];this[_0x2a063c(0x348)](_0x55577c);if(_0x4ab7b4>0x0)this[_0x2a063c(0x22b)](_0x55577c);if(_0x4ab7b4<0x0)this[_0x2a063c(0x2b2)](_0x55577c);}else{const _0x4983f3=_0x5f254c(_0x26c83e['$1']),_0x229e15=_0x5654a4[_0x2a063c(0xc3)](_0x4983f3);_0x4fcceb[_0x2a063c(0x33a)][_0x2a063c(0x317)][_0x48b998['id']]=new _0x346f14('stateId',_0x229e15);}}}},Game_Battler[_0x34766e(0x31d)][_0x34766e(0x200)]=function(_0x4601d1,_0x4ddcb0){const _0x1170c7=_0x34766e;this[_0x1170c7(0x21e)](_0x4601d1,_0x4ddcb0);},Game_Battler[_0x34766e(0x31d)]['onAddDebuff']=function(_0x1cab86,_0x112c83){const _0x32c14f=_0x34766e;this[_0x32c14f(0x2ca)](_0x1cab86,_0x112c83);},Game_Battler['prototype'][_0x34766e(0x116)]=function(_0x30b037){const _0x243200=_0x34766e;Game_BattlerBase['prototype'][_0x243200(0x116)]['call'](this,_0x30b037),this[_0x243200(0x161)](_0x30b037);},Game_Battler[_0x34766e(0x31d)][_0x34766e(0x351)]=function(_0x3ae2e7){const _0x2c4717=_0x34766e;Game_BattlerBase[_0x2c4717(0x31d)][_0x2c4717(0x351)][_0x2c4717(0x3bf)](this,_0x3ae2e7),this['onEraseDebuffGlobalJS'](_0x3ae2e7);},Game_Battler['prototype']['onExpireBuff']=function(_0x127f0d){const _0x22c865=_0x34766e;this[_0x22c865(0x356)](_0x127f0d);},Game_Battler[_0x34766e(0x31d)]['onExpireDebuff']=function(_0x534e39){this['onExpireDebuffGlobalJS'](_0x534e39);},Game_Battler[_0x34766e(0x31d)]['onAddBuffGlobalJS']=function(_0x5d89a9,_0x42b48b){const _0x4eec31=_0x34766e;VisuMZ[_0x4eec31(0x33a)][_0x4eec31(0x10e)]['Buffs']['onAddBuffJS']['call'](this,_0x5d89a9,_0x42b48b);},Game_Battler[_0x34766e(0x31d)]['onAddDebuffGlobalJS']=function(_0x753682,_0x417219){const _0x594220=_0x34766e;VisuMZ[_0x594220(0x33a)]['Settings'][_0x594220(0xb4)][_0x594220(0xc9)]['call'](this,_0x753682,_0x417219);},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x161)]=function(_0x5d180f){const _0x46fb1f=_0x34766e;VisuMZ[_0x46fb1f(0x33a)][_0x46fb1f(0x10e)]['Buffs']['onEraseBuffJS']['call'](this,_0x5d180f);},Game_BattlerBase[_0x34766e(0x31d)][_0x34766e(0x37c)]=function(_0x5c844e){const _0x38e420=_0x34766e;VisuMZ['SkillsStatesCore'][_0x38e420(0x10e)][_0x38e420(0xb4)][_0x38e420(0x23a)][_0x38e420(0x3bf)](this,_0x5c844e);},Game_Battler[_0x34766e(0x31d)]['onExpireBuffGlobalJS']=function(_0x418dd6){const _0x1f2f81=_0x34766e;VisuMZ[_0x1f2f81(0x33a)][_0x1f2f81(0x10e)]['Buffs']['onExpireBuffJS'][_0x1f2f81(0x3bf)](this,_0x418dd6);},Game_Battler['prototype'][_0x34766e(0x1fe)]=function(_0x2545fb){const _0x711c4c=_0x34766e;VisuMZ[_0x711c4c(0x33a)]['Settings'][_0x711c4c(0xb4)][_0x711c4c(0x3d9)]['call'](this,_0x2545fb);},Game_Battler[_0x34766e(0x31d)][_0x34766e(0x25d)]=function(_0x406eea){const _0x100509=_0x34766e,_0x59a5d5=VisuMZ[_0x100509(0x33a)],_0x1f1715=[_0x100509(0x101),_0x100509(0x346),_0x100509(0x3c8),'stateMpSlipHealJS',_0x100509(0x2ee),_0x100509(0x284)];for(const _0x479f89 of _0x1f1715){if(_0x59a5d5[_0x479f89][_0x406eea]){if('pyXpB'===_0x100509(0x3cb))return this[_0x100509(0x343)](_0x57b00d);else _0x59a5d5[_0x479f89][_0x406eea][_0x100509(0x3bf)](this,_0x406eea);}}},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x13a)]=Game_Battler['prototype'][_0x34766e(0x315)],Game_Battler[_0x34766e(0x31d)][_0x34766e(0x315)]=function(){const _0xaed2c2=_0x34766e;this['recalculateSlipDamageJS'](),VisuMZ['SkillsStatesCore'][_0xaed2c2(0x13a)][_0xaed2c2(0x3bf)](this),this[_0xaed2c2(0xf1)](),this[_0xaed2c2(0x3c3)]();},Game_Battler[_0x34766e(0x31d)]['setPassiveStateSlipDamageJS']=function(){for(const _0x2c02a2 of this['passiveStates']()){if(!_0x2c02a2)continue;this['onAddStateMakeCustomSlipValues'](_0x2c02a2['id']);}},Game_Battler[_0x34766e(0x31d)][_0x34766e(0xeb)]=function(){const _0x95316f=_0x34766e;for(const _0xa72b6e of this[_0x95316f(0x33c)]()){if(_0x95316f(0x362)===_0x95316f(0x37b)){if(_0x18d445[_0x95316f(0x382)]())_0x9945d3[_0x95316f(0x19a)](_0x506fee);}else{if(!_0xa72b6e)continue;if(_0xa72b6e['note'][_0x95316f(0x34b)](/<JS SLIP REFRESH>/i)){if('zOTSk'===_0x95316f(0x283))this[_0x95316f(0x25d)](_0xa72b6e['id']);else{if(typeof _0x4b25d6!=='number')_0x408142=_0x1a6580['id'];const _0x44459a=this[_0x95316f(0x1d6)](_0x1524fd);_0x44459a[_0x56f868]=_0x3b56f4;}}}}},Game_Battler[_0x34766e(0x31d)]['regenerateAllSkillsStatesCore']=function(){const _0x5924c6=_0x34766e;if(!this['isAlive']())return;const _0x12f271=this[_0x5924c6(0x33c)]();for(const _0xc61cab of _0x12f271){if(!_0xc61cab)continue;this['onRegenerateCustomStateDamageOverTime'](_0xc61cab);}},Game_Battler[_0x34766e(0x31d)][_0x34766e(0x31e)]=function(_0x5e910f){const _0x170639=_0x34766e,_0x1a755a=this[_0x170639(0x310)](_0x5e910f['id'],_0x170639(0x288))||0x0,_0x5c9e75=-this[_0x170639(0x375)](),_0x7285a8=Math['max'](_0x1a755a,_0x5c9e75);if(_0x7285a8!==0x0){const _0x43edbd=this[_0x170639(0x15c)]['hpDamage']||0x0;this[_0x170639(0x168)](_0x7285a8),this[_0x170639(0x15c)]['hpDamage']+=_0x43edbd;}const _0x345585=this[_0x170639(0x310)](_0x5e910f['id'],_0x170639(0x27f))||0x0;if(_0x345585!==0x0){const _0x387e00=this[_0x170639(0x15c)][_0x170639(0x3b0)]||0x0;this[_0x170639(0x127)](_0x345585),this['_result'][_0x170639(0x3b0)]+=_0x387e00;}const _0x20204b=this['getStateData'](_0x5e910f['id'],_0x170639(0x1b3))||0x0;_0x20204b!==0x0&&this[_0x170639(0x39c)](_0x20204b);},VisuMZ['SkillsStatesCore'][_0x34766e(0x3cd)]=Game_Actor[_0x34766e(0x31d)]['skillTypes'],Game_Actor['prototype'][_0x34766e(0x22a)]=function(){const _0x633bfd=_0x34766e,_0x5a44e3=VisuMZ[_0x633bfd(0x33a)][_0x633bfd(0x3cd)]['call'](this),_0x2c4578=VisuMZ[_0x633bfd(0x33a)][_0x633bfd(0x10e)][_0x633bfd(0x1c8)];let _0x1ef4e3=_0x2c4578['HiddenSkillTypes'];if($gameParty[_0x633bfd(0x3d8)]()){if(_0x633bfd(0x1a2)==='IlWGf')_0x1ef4e3=_0x1ef4e3[_0x633bfd(0x366)](_0x2c4578[_0x633bfd(0x172)]);else return _0x41321f[_0x633bfd(0x33a)][_0x633bfd(0x10e)]['States'][_0x633bfd(0x350)];}return _0x5a44e3[_0x633bfd(0xc7)](_0x46560a=>!_0x1ef4e3['includes'](_0x46560a));},Game_Actor['prototype'][_0x34766e(0x156)]=function(){const _0x52f762=_0x34766e;return this[_0x52f762(0x1ce)]()[_0x52f762(0xc7)](_0xa6c949=>this[_0x52f762(0x2a8)](_0xa6c949));},Game_Actor[_0x34766e(0x31d)]['isSkillUsableForAutoBattle']=function(_0x1e3ffc){const _0x15dbe2=_0x34766e;if(!this[_0x15dbe2(0x369)](_0x1e3ffc))return![];if(!_0x1e3ffc)return![];if(!this['isSkillTypeMatchForUse'](_0x1e3ffc))return![];if(this['isSkillHidden'](_0x1e3ffc))return![];return!![];},Game_Actor[_0x34766e(0x31d)][_0x34766e(0x304)]=function(_0xc11518){const _0xa52a04=_0x34766e,_0x405f08=this[_0xa52a04(0x22a)](),_0x222c62=DataManager[_0xa52a04(0x395)](_0xc11518),_0x3aafc9=_0x405f08[_0xa52a04(0xc7)](_0x515dde=>_0x222c62[_0xa52a04(0x183)](_0x515dde));return _0x3aafc9['length']>0x0;},Game_Actor['prototype'][_0x34766e(0x281)]=function(_0x52d651){const _0x1c879b=_0x34766e;if(!VisuMZ[_0x1c879b(0x33a)][_0x1c879b(0x2a6)](this,_0x52d651))return!![];if(!VisuMZ['SkillsStatesCore']['CheckVisibleSwitchNotetags'](this,_0x52d651))return!![];if(!VisuMZ[_0x1c879b(0x33a)][_0x1c879b(0x163)](this,_0x52d651))return!![];return![];},Game_Actor[_0x34766e(0x31d)][_0x34766e(0x26f)]=function(){const _0x1ecd8c=_0x34766e;let _0x30deec=[this[_0x1ecd8c(0x212)](),this['currentClass']()];_0x30deec=_0x30deec[_0x1ecd8c(0x366)](this[_0x1ecd8c(0x35f)]()[_0x1ecd8c(0xc7)](_0x43e7ea=>_0x43e7ea));for(const _0x32e486 of this['_skills']){const _0x26244c=$dataSkills[_0x32e486];if(_0x26244c)_0x30deec['push'](_0x26244c);}return _0x30deec;},Game_Actor[_0x34766e(0x31d)][_0x34766e(0x2b0)]=function(){const _0x2c634d=_0x34766e;Game_Battler[_0x2c634d(0x31d)][_0x2c634d(0x2b0)][_0x2c634d(0x3bf)](this);const _0x16f26d=VisuMZ[_0x2c634d(0x33a)][_0x2c634d(0x10e)]['PassiveStates'][_0x2c634d(0x178)];this[_0x2c634d(0x191)][_0x2c634d(0x174)]=this[_0x2c634d(0x191)][_0x2c634d(0x174)][_0x2c634d(0x366)](_0x16f26d);},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x253)]=Game_Actor[_0x34766e(0x31d)][_0x34766e(0x39a)],Game_Actor[_0x34766e(0x31d)][_0x34766e(0x39a)]=function(_0x2554cf){const _0x901fee=_0x34766e;VisuMZ[_0x901fee(0x33a)][_0x901fee(0x253)][_0x901fee(0x3bf)](this,_0x2554cf),this['_cache']={},this[_0x901fee(0x174)]();},VisuMZ[_0x34766e(0x33a)][_0x34766e(0xf7)]=Game_Actor[_0x34766e(0x31d)]['forgetSkill'],Game_Actor[_0x34766e(0x31d)]['forgetSkill']=function(_0x356be7){const _0x162743=_0x34766e;VisuMZ['SkillsStatesCore']['Game_Actor_forgetSkill'][_0x162743(0x3bf)](this,_0x356be7),this[_0x162743(0x191)]={},this[_0x162743(0x174)]();},Game_Actor[_0x34766e(0x31d)][_0x34766e(0x3ae)]=function(){const _0x243673=_0x34766e;return VisuMZ['SkillsStatesCore'][_0x243673(0x10e)][_0x243673(0x12d)][_0x243673(0x3e0)]??0x14;},Game_Enemy[_0x34766e(0x31d)]['passiveStateObjects']=function(){const _0x512b76=_0x34766e;let _0x31df87=[this[_0x512b76(0x396)]()];return _0x31df87['concat'](this[_0x512b76(0x1ce)]());},Game_Enemy[_0x34766e(0x31d)][_0x34766e(0x2b0)]=function(){const _0x4da2f1=_0x34766e;Game_Battler['prototype'][_0x4da2f1(0x2b0)]['call'](this);const _0x4210ff=VisuMZ[_0x4da2f1(0x33a)][_0x4da2f1(0x10e)][_0x4da2f1(0x150)][_0x4da2f1(0x2bc)];this[_0x4da2f1(0x191)][_0x4da2f1(0x174)]=this[_0x4da2f1(0x191)][_0x4da2f1(0x174)]['concat'](_0x4210ff);},Game_Enemy[_0x34766e(0x31d)]['skills']=function(){const _0x4c1a76=_0x34766e,_0x7ac87a=[];for(const _0x32cef2 of this[_0x4c1a76(0x396)]()[_0x4c1a76(0x21d)]){const _0x577dac=$dataSkills[_0x32cef2[_0x4c1a76(0x2db)]];if(_0x577dac&&!_0x7ac87a[_0x4c1a76(0x183)](_0x577dac))_0x7ac87a['push'](_0x577dac);}return _0x7ac87a;},Game_Enemy['prototype']['meetsStateCondition']=function(_0x21f609){return this['hasState']($dataStates[_0x21f609]);},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x33e)]=Game_Unit[_0x34766e(0x31d)][_0x34766e(0xff)],Game_Unit['prototype'][_0x34766e(0xff)]=function(){const _0x373dd1=_0x34766e;if(this[_0x373dd1(0xd8)]())return!![];return VisuMZ[_0x373dd1(0x33a)][_0x373dd1(0x33e)][_0x373dd1(0x3bf)](this);},Game_Unit[_0x34766e(0x31d)][_0x34766e(0xd8)]=function(){const _0x20dd64=_0x34766e,_0x8366a1=this[_0x20dd64(0xd5)]();for(const _0x394f5e of _0x8366a1){if(!_0x394f5e['isGroupDefeatStateAffected']())return![];}return!![];},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x1dd)]=Game_Troop[_0x34766e(0x31d)][_0x34766e(0x208)],Game_Troop[_0x34766e(0x31d)][_0x34766e(0x208)]=function(_0x1a96bf){const _0x34065a=_0x34766e;VisuMZ[_0x34065a(0x33a)][_0x34065a(0x1dd)][_0x34065a(0x3bf)](this,_0x1a96bf),this[_0x34065a(0x164)]();},Game_Troop[_0x34766e(0x31d)]['makeCurrentTroopUniqueID']=function(){const _0x54e910=_0x34766e;this[_0x54e910(0x2d0)]=Graphics['frameCount'];},Game_Troop[_0x34766e(0x31d)][_0x34766e(0x1f8)]=function(){const _0x500e2c=_0x34766e;return this[_0x500e2c(0x2d0)]=this['_currentTroopUniqueID']||Graphics['frameCount'],this[_0x500e2c(0x2d0)];},Scene_Skill[_0x34766e(0x31d)][_0x34766e(0x3bc)]=function(){const _0x56fd9a=_0x34766e;if(ConfigManager[_0x56fd9a(0x1e3)]&&ConfigManager[_0x56fd9a(0x24c)]!==undefined)return ConfigManager[_0x56fd9a(0x24c)];else{if(this[_0x56fd9a(0x23b)]()){if(_0x56fd9a(0x1e0)===_0x56fd9a(0x1e0))return this[_0x56fd9a(0x3da)]()[_0x56fd9a(0x34b)](/LOWER/i);else for(const _0x18d4fd of _0x58a72e[_0x56fd9a(0x16d)]()){if(_0x18d4fd)_0x18d4fd[_0x56fd9a(0xbd)]();}}else Scene_ItemBase[_0x56fd9a(0x31d)]['isRightInputMode'][_0x56fd9a(0x3bf)](this);}},Scene_Skill[_0x34766e(0x31d)][_0x34766e(0x38c)]=function(){const _0xf8b8de=_0x34766e;if(ConfigManager[_0xf8b8de(0x1e3)]&&ConfigManager[_0xf8b8de(0x320)]!==undefined)return ConfigManager[_0xf8b8de(0x320)];else return this[_0xf8b8de(0x23b)]()?this[_0xf8b8de(0x3da)]()[_0xf8b8de(0x34b)](/RIGHT/i):Scene_ItemBase[_0xf8b8de(0x31d)][_0xf8b8de(0x38c)]['call'](this);},Scene_Skill[_0x34766e(0x31d)][_0x34766e(0x3da)]=function(){const _0x5f0e69=_0x34766e;return VisuMZ['SkillsStatesCore']['Settings'][_0x5f0e69(0x1c8)][_0x5f0e69(0x118)];},Scene_Skill[_0x34766e(0x31d)]['isUseModernControls']=function(){const _0x18bcff=_0x34766e;return this[_0x18bcff(0x233)]&&this['_categoryWindow'][_0x18bcff(0x3ec)]();},Scene_Skill[_0x34766e(0x31d)][_0x34766e(0x23b)]=function(){const _0x1dab72=_0x34766e;return VisuMZ[_0x1dab72(0x33a)][_0x1dab72(0x10e)][_0x1dab72(0x1c8)][_0x1dab72(0xbc)];},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x1f2)]=Scene_Skill['prototype'][_0x34766e(0x185)],Scene_Skill['prototype']['helpWindowRect']=function(){const _0x54ccd4=_0x34766e;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x54ccd4(0x2e1)]():VisuMZ['SkillsStatesCore'][_0x54ccd4(0x1f2)][_0x54ccd4(0x3bf)](this);},Scene_Skill[_0x34766e(0x31d)][_0x34766e(0x2e1)]=function(){const _0x4a59c4=_0x34766e,_0x3db5f3=0x0,_0x4f1f68=this[_0x4a59c4(0x134)](),_0xc3a212=Graphics['boxWidth'],_0x58e9ae=this[_0x4a59c4(0x1c3)]();return new Rectangle(_0x3db5f3,_0x4f1f68,_0xc3a212,_0x58e9ae);},VisuMZ[_0x34766e(0x33a)][_0x34766e(0xfe)]=Scene_Skill['prototype'][_0x34766e(0x2fa)],Scene_Skill[_0x34766e(0x31d)][_0x34766e(0x2fa)]=function(){const _0x282f40=_0x34766e;if(this[_0x282f40(0x23b)]())return this[_0x282f40(0x2e3)]();else{if('OlkKv'===_0x282f40(0x190))this[_0x282f40(0x3ce)][_0x354435]=_0x2c2da4(_0x5dba90['$1']);else return VisuMZ[_0x282f40(0x33a)][_0x282f40(0xfe)]['call'](this);}},Scene_Skill[_0x34766e(0x31d)][_0x34766e(0x1c4)]=function(){const _0x46b646=_0x34766e;return VisuMZ[_0x46b646(0x33a)][_0x46b646(0x10e)]['Skills'][_0x46b646(0x302)]??Scene_MenuBase[_0x46b646(0x31d)]['mainCommandWidth'][_0x46b646(0x3bf)](this);},Scene_Skill['prototype']['skillTypeWindowRectSkillsStatesCore']=function(){const _0x49b271=_0x34766e,_0x2c0b93=this[_0x49b271(0x1c4)](),_0x455216=this['calcWindowHeight'](0x3,!![]),_0x52c5b2=this[_0x49b271(0x38c)]()?Graphics['boxWidth']-_0x2c0b93:0x0,_0x380d46=this[_0x49b271(0x182)]();return new Rectangle(_0x52c5b2,_0x380d46,_0x2c0b93,_0x455216);},VisuMZ[_0x34766e(0x33a)]['Scene_Skill_statusWindowRect']=Scene_Skill[_0x34766e(0x31d)]['statusWindowRect'],Scene_Skill[_0x34766e(0x31d)][_0x34766e(0x1e9)]=function(){const _0x20f1e3=_0x34766e;return this[_0x20f1e3(0x23b)]()?this[_0x20f1e3(0x345)]():VisuMZ[_0x20f1e3(0x33a)][_0x20f1e3(0x222)][_0x20f1e3(0x3bf)](this);},Scene_Skill['prototype']['statusWindowRectSkillsStatesCore']=function(){const _0x1cd09f=_0x34766e,_0x48f331=Graphics[_0x1cd09f(0xc6)]-this[_0x1cd09f(0x1c4)](),_0x5892f8=this[_0x1cd09f(0x3c9)][_0x1cd09f(0x16b)],_0x56d006=this[_0x1cd09f(0x38c)]()?0x0:Graphics[_0x1cd09f(0xc6)]-_0x48f331,_0x2adf7c=this[_0x1cd09f(0x182)]();return new Rectangle(_0x56d006,_0x2adf7c,_0x48f331,_0x5892f8);},VisuMZ[_0x34766e(0x33a)]['Scene_Skill_createItemWindow']=Scene_Skill[_0x34766e(0x31d)][_0x34766e(0x340)],Scene_Skill[_0x34766e(0x31d)][_0x34766e(0x340)]=function(){const _0x2cb080=_0x34766e;VisuMZ[_0x2cb080(0x33a)]['Scene_Skill_createItemWindow'][_0x2cb080(0x3bf)](this),this[_0x2cb080(0x29a)]()&&this['createShopStatusWindow']();},VisuMZ[_0x34766e(0x33a)]['Scene_Skill_itemWindowRect']=Scene_Skill[_0x34766e(0x31d)][_0x34766e(0x388)],Scene_Skill['prototype'][_0x34766e(0x388)]=function(){const _0x3e8d6b=_0x34766e;if(this[_0x3e8d6b(0x23b)]()){if(_0x3e8d6b(0x14c)!==_0x3e8d6b(0x21a))return this[_0x3e8d6b(0x109)]();else{const _0x7ea2f0=this[_0x3e8d6b(0xed)][_0xd2809];this[_0x3e8d6b(0x348)](_0x5e75f9);if(_0x7ea2f0>0x0)this['onExpireBuff'](_0x39a31b);if(_0x7ea2f0<0x0)this['onExpireDebuff'](_0x43f979);}}else{const _0x394c59=VisuMZ[_0x3e8d6b(0x33a)][_0x3e8d6b(0x290)]['call'](this);return this[_0x3e8d6b(0x29a)]()&&this[_0x3e8d6b(0x201)]()&&(_0x394c59[_0x3e8d6b(0x160)]-=this[_0x3e8d6b(0x12e)]()),_0x394c59;}},Scene_Skill[_0x34766e(0x31d)][_0x34766e(0x109)]=function(){const _0x43db86=_0x34766e,_0x3ef922=Graphics['boxWidth']-this['shopStatusWidth'](),_0x5d54a3=this[_0x43db86(0x1e6)]()-this[_0x43db86(0x38f)][_0x43db86(0x16b)],_0x38cff8=this['isRightInputMode']()?Graphics[_0x43db86(0xc6)]-_0x3ef922:0x0,_0x45c9da=this['_statusWindow']['y']+this[_0x43db86(0x38f)][_0x43db86(0x16b)];return new Rectangle(_0x38cff8,_0x45c9da,_0x3ef922,_0x5d54a3);},Scene_Skill['prototype'][_0x34766e(0x29a)]=function(){const _0x329dc4=_0x34766e;if(!Imported[_0x329dc4(0x110)]){if(_0x329dc4(0x17f)===_0x329dc4(0x17f))return![];else{this[_0x329dc4(0x32a)](_0x220b75)[_0x329dc4(0x34b)](/\\I\[(\d+)\]/i);const _0x54a275=_0x3eaa1d(_0x367845['$1'])||0x0,_0x23b710=this['itemLineRect'](_0xc43405),_0x1e51c3=_0x23b710['x']+_0x3cfb84[_0x329dc4(0x226)]((_0x23b710[_0x329dc4(0x160)]-_0x1a4b6a[_0x329dc4(0x10b)])/0x2),_0xd2a673=_0x23b710['y']+(_0x23b710['height']-_0x1bf7ab['iconHeight'])/0x2;this[_0x329dc4(0x1a5)](_0x54a275,_0x1e51c3,_0xd2a673);}}else{if(this[_0x329dc4(0x23b)]())return!![];else{if(_0x329dc4(0x108)!==_0x329dc4(0x108)){const _0x30bd36=_0x421261[_0x329dc4(0xf8)]('['+_0x19fa4e['$1'][_0x329dc4(0x34b)](/\d+/g)+']');for(const _0x31174e of _0x30bd36){if(!_0x49033e[_0x329dc4(0x194)](_0x31174e))return![];}return!![];}else return VisuMZ['SkillsStatesCore'][_0x329dc4(0x10e)][_0x329dc4(0x1c8)]['ShowShopStatus'];}}},Scene_Skill['prototype'][_0x34766e(0x201)]=function(){const _0x58a921=_0x34766e;return VisuMZ[_0x58a921(0x33a)][_0x58a921(0x10e)][_0x58a921(0x1c8)][_0x58a921(0x3b4)];},Scene_Skill['prototype'][_0x34766e(0x370)]=function(){const _0x3b7563=_0x34766e,_0x2367e2=this[_0x3b7563(0x29b)]();this[_0x3b7563(0xcc)]=new Window_ShopStatus(_0x2367e2),this[_0x3b7563(0x3bd)](this[_0x3b7563(0xcc)]),this[_0x3b7563(0x31c)]['setStatusWindow'](this[_0x3b7563(0xcc)]);const _0x3cf1ae=VisuMZ[_0x3b7563(0x33a)][_0x3b7563(0x10e)][_0x3b7563(0x1c8)]['SkillSceneStatusBgType'];this[_0x3b7563(0xcc)][_0x3b7563(0x119)](_0x3cf1ae||0x0);},Scene_Skill['prototype']['shopStatusWindowRect']=function(){const _0x1b6e01=_0x34766e;return this[_0x1b6e01(0x23b)]()?this[_0x1b6e01(0x32f)]():'zhPRh'!==_0x1b6e01(0x105)?_0x1b6e01(0xfa):VisuMZ[_0x1b6e01(0x33a)][_0x1b6e01(0x10e)][_0x1b6e01(0x1c8)]['SkillMenuStatusRect'][_0x1b6e01(0x3bf)](this);},Scene_Skill[_0x34766e(0x31d)]['shopStatusWindowRectSkillsStatesCore']=function(){const _0x2edfc0=_0x34766e,_0x2c650a=this[_0x2edfc0(0x12e)](),_0x3dbf5a=this['_itemWindow'][_0x2edfc0(0x16b)],_0x3190af=this[_0x2edfc0(0x38c)]()?0x0:Graphics[_0x2edfc0(0xc6)]-this[_0x2edfc0(0x12e)](),_0x493f6f=this['_itemWindow']['y'];return new Rectangle(_0x3190af,_0x493f6f,_0x2c650a,_0x3dbf5a);},Scene_Skill[_0x34766e(0x31d)][_0x34766e(0x12e)]=function(){return Imported['VisuMZ_1_ItemsEquipsCore']?Scene_Shop['prototype']['statusWidth']():0x0;},Scene_Skill['prototype'][_0x34766e(0x170)]=function(){const _0x5ef61a=_0x34766e;if(this[_0x5ef61a(0x3c9)]&&this[_0x5ef61a(0x3c9)][_0x5ef61a(0x3f1)])return TextManager[_0x5ef61a(0x218)];else{if(_0x5ef61a(0x2c0)!==_0x5ef61a(0x175))return'';else{if(!_0x48b1bb)return;_0x18905c['SkillsStatesCore'][_0x5ef61a(0x324)][_0x5ef61a(0x3bf)](this,_0x202a9b,_0x442b56,_0x33008a,_0x12ca80),this[_0x5ef61a(0x133)](_0x200439,_0x867175,_0x413ef2,_0x1491e2);}}},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x1da)]=Sprite_Gauge['prototype'][_0x34766e(0x380)],Sprite_Gauge[_0x34766e(0x31d)][_0x34766e(0x380)]=function(){const _0xd97088=_0x34766e;VisuMZ[_0xd97088(0x33a)][_0xd97088(0x1da)][_0xd97088(0x3bf)](this),this['_costSettings']=null;},VisuMZ['SkillsStatesCore'][_0x34766e(0x24d)]=Sprite_Gauge['prototype'][_0x34766e(0x208)],Sprite_Gauge[_0x34766e(0x31d)][_0x34766e(0x208)]=function(_0x2488fc,_0x43555c){const _0x4e633b=_0x34766e;this[_0x4e633b(0x3de)](_0x2488fc,_0x43555c),_0x43555c=_0x43555c[_0x4e633b(0x203)](),VisuMZ[_0x4e633b(0x33a)][_0x4e633b(0x24d)][_0x4e633b(0x3bf)](this,_0x2488fc,_0x43555c);},Sprite_Gauge['prototype']['setupSkillsStatesCore']=function(_0x236d3e,_0xf09f77){const _0xa05a38=_0x34766e,_0x1bbb4f=VisuMZ[_0xa05a38(0x33a)]['Settings']['Costs'][_0xa05a38(0xc7)](_0x2fd4f0=>_0x2fd4f0[_0xa05a38(0x31b)][_0xa05a38(0x3ea)]()===_0xf09f77[_0xa05a38(0x3ea)]());if(_0x1bbb4f['length']>=0x1){if('isDcg'!==_0xa05a38(0x266)){const _0x43890a=this[_0xa05a38(0xed)][_0x41682d];_0x2528c8[_0xa05a38(0x33a)][_0xa05a38(0x2da)][_0xa05a38(0x3bf)](this,_0x27b9a2);if(_0x43890a>0x0)this[_0xa05a38(0x116)](_0x1d8710);if(_0x43890a<0x0)this[_0xa05a38(0x351)](_0x390009);}else this['_costSettings']=_0x1bbb4f[0x0];}else this[_0xa05a38(0x3dd)]=null;},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x103)]=Sprite_Gauge[_0x34766e(0x31d)]['currentValue'],Sprite_Gauge[_0x34766e(0x31d)][_0x34766e(0x195)]=function(){const _0x8e8427=_0x34766e;return this[_0x8e8427(0x18d)]&&this['_costSettings']?this['currentValueSkillsStatesCore']():VisuMZ[_0x8e8427(0x33a)]['Sprite_Gauge_currentValue'][_0x8e8427(0x3bf)](this);},Sprite_Gauge[_0x34766e(0x31d)][_0x34766e(0x21f)]=function(){const _0x341b2a=_0x34766e;return this[_0x341b2a(0x3dd)][_0x341b2a(0x32e)][_0x341b2a(0x3bf)](this[_0x341b2a(0x18d)]);},VisuMZ['SkillsStatesCore'][_0x34766e(0x301)]=Sprite_Gauge[_0x34766e(0x31d)][_0x34766e(0x269)],Sprite_Gauge['prototype'][_0x34766e(0x269)]=function(){const _0x2c6053=_0x34766e;return this[_0x2c6053(0x18d)]&&this[_0x2c6053(0x3dd)]?this[_0x2c6053(0x179)]():_0x2c6053(0x341)==='TBQsF'?this[_0x2c6053(0x2e3)]():VisuMZ[_0x2c6053(0x33a)][_0x2c6053(0x301)][_0x2c6053(0x3bf)](this);},Sprite_Gauge[_0x34766e(0x31d)][_0x34766e(0x179)]=function(){const _0x12b745=_0x34766e;return this['_costSettings'][_0x12b745(0x31a)]['call'](this[_0x12b745(0x18d)]);},VisuMZ['SkillsStatesCore'][_0x34766e(0x196)]=Sprite_Gauge[_0x34766e(0x31d)]['gaugeRate'],Sprite_Gauge['prototype'][_0x34766e(0x3ab)]=function(){const _0x449bbc=_0x34766e,_0x300b9a=VisuMZ['SkillsStatesCore'][_0x449bbc(0x196)][_0x449bbc(0x3bf)](this);return _0x300b9a[_0x449bbc(0x377)](0x0,0x1);},VisuMZ[_0x34766e(0x33a)][_0x34766e(0xd9)]=Sprite_Gauge[_0x34766e(0x31d)][_0x34766e(0x30c)],Sprite_Gauge[_0x34766e(0x31d)][_0x34766e(0x30c)]=function(){const _0x20dbd3=_0x34766e;this[_0x20dbd3(0x18d)]&&this[_0x20dbd3(0x3dd)]?(this[_0x20dbd3(0xb3)][_0x20dbd3(0x19b)](),this[_0x20dbd3(0x1a8)]()):VisuMZ[_0x20dbd3(0x33a)][_0x20dbd3(0xd9)][_0x20dbd3(0x3bf)](this);},Sprite_Gauge[_0x34766e(0x31d)][_0x34766e(0x2c9)]=function(){const _0x3459d6=_0x34766e;let _0x5d063d=this[_0x3459d6(0x195)]();return Imported[_0x3459d6(0x199)]&&this['useDigitGrouping']()&&(_0x5d063d=VisuMZ[_0x3459d6(0xd7)](_0x5d063d)),_0x5d063d;},Sprite_Gauge[_0x34766e(0x31d)][_0x34766e(0x1a8)]=function(){const _0x340560=_0x34766e;this[_0x340560(0xb3)]['clear'](),this[_0x340560(0x3dd)]['GaugeDrawJS'][_0x340560(0x3bf)](this);},Sprite_Gauge[_0x34766e(0x31d)]['drawFullGauge']=function(_0x31e9ce,_0x16be3c,_0x4f45b6,_0x4ddbec,_0x1d1c39,_0x296253){const _0x306988=_0x34766e,_0x7df733=this['gaugeRate'](),_0x543124=Math['floor']((_0x1d1c39-0x2)*_0x7df733),_0x140d0c=_0x296253-0x2,_0x477b82=this[_0x306988(0x237)]();this[_0x306988(0xb3)][_0x306988(0x128)](_0x4f45b6,_0x4ddbec,_0x1d1c39,_0x296253,_0x477b82),this['bitmap']['gradientFillRect'](_0x4f45b6+0x1,_0x4ddbec+0x1,_0x543124,_0x140d0c,_0x31e9ce,_0x16be3c);},Sprite_Gauge['prototype'][_0x34766e(0x20d)]=function(){const _0x58b477=_0x34766e,_0xc8f74e=VisuMZ[_0x58b477(0x33a)]['Settings']['Gauge'];return _0xc8f74e['LabelFontMainType']===_0x58b477(0x3a1)?$gameSystem[_0x58b477(0x308)]():$gameSystem[_0x58b477(0x347)]();},Sprite_Gauge['prototype']['labelFontSize']=function(){const _0x542ed3=_0x34766e,_0x41723c=VisuMZ['SkillsStatesCore'][_0x542ed3(0x10e)][_0x542ed3(0x1ae)];return _0x41723c[_0x542ed3(0x1a1)]===_0x542ed3(0x3a1)?$gameSystem[_0x542ed3(0x19e)]()-0x6:$gameSystem[_0x542ed3(0x19e)]()-0x2;},Sprite_Gauge[_0x34766e(0x31d)][_0x34766e(0x2a9)]=function(){const _0x636490=_0x34766e,_0x5866a9=VisuMZ[_0x636490(0x33a)][_0x636490(0x10e)][_0x636490(0x1ae)];if(_0x5866a9[_0x636490(0x1ac)]==='number'){if(_0x636490(0x3c2)===_0x636490(0xf9))_0x17e4aa['prototype'][_0x636490(0x351)][_0x636490(0x3bf)](this,_0x44efd0),this[_0x636490(0x37c)](_0x15fbc6);else return $gameSystem['numberFontFace']();}else{if(_0x636490(0x3b8)!=='twTPl')return $gameSystem[_0x636490(0x347)]();else{const _0x3b8214=_0x636490(0x319)['format'](_0x16e00a[_0x636490(0x3ef)]()),_0x280313=_0x636490(0x1d9)[_0x636490(0xc3)](_0x431593[_0x636490(0x24b)]()),_0x550ef2=_0x636490(0x268)[_0x636490(0xc3)](_0x19338f[_0x636490(0x1f8)]());return _0x636490(0xd3)[_0x636490(0xc3)](_0x3b8214,_0x280313,_0x550ef2);}}},Sprite_Gauge[_0x34766e(0x31d)][_0x34766e(0x11a)]=function(){const _0x530d20=_0x34766e,_0x554881=VisuMZ[_0x530d20(0x33a)][_0x530d20(0x10e)][_0x530d20(0x1ae)];if(_0x554881[_0x530d20(0x1ac)]===_0x530d20(0x3a1)){if('ePuAF'===_0x530d20(0x2fb)){const _0x432f72=_0x3b1739[_0x530d20(0x27c)];if(_0x432f72[_0x530d20(0x34b)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x43fe75=_0x1af15c(_0x55630a['$1']),_0x139acc='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x530d20(0xc3)](_0x43fe75);_0x25ceac[_0x530d20(0x33a)][_0x530d20(0x2fd)][_0x14213c['id']]=new _0x2a2e64(_0x530d20(0x17b),_0x139acc);}}else return $gameSystem[_0x530d20(0x19e)]()-0x6;}else return $gameSystem[_0x530d20(0x19e)]()-0x2;},Sprite_Gauge[_0x34766e(0x31d)]['labelColor']=function(){const _0x1dd0e9=_0x34766e,_0x3760b3=VisuMZ[_0x1dd0e9(0x33a)][_0x1dd0e9(0x10e)][_0x1dd0e9(0x1ae)];if(_0x3760b3[_0x1dd0e9(0x162)]){if(_0x3760b3[_0x1dd0e9(0x342)]===0x1)return this['gaugeColor1']();else{if(_0x3760b3['MatchLabelGaugeColor']===0x2)return this[_0x1dd0e9(0x3af)]();}}const _0x3d1fb5=_0x3760b3[_0x1dd0e9(0x15d)];return ColorManager['getColor'](_0x3d1fb5);},Sprite_Gauge['prototype'][_0x34766e(0x2b4)]=function(){const _0x1ceb92=_0x34766e,_0x505393=VisuMZ[_0x1ceb92(0x33a)][_0x1ceb92(0x10e)]['Gauge'];if(this[_0x1ceb92(0x1bd)]()<=0x0){if(_0x1ceb92(0x325)===_0x1ceb92(0x325))return _0x1ceb92(0x1ec);else{const _0x1ff9da=_0x216549[_0x1ceb92(0x33a)][_0x1ceb92(0x2fd)];if(_0x1ff9da[_0x2a6a81['id']]&&!_0x1ff9da[_0x4ee270['id']][_0x1ceb92(0x3bf)](this,_0x42ba4a))return![];return!![];}}else{if(_0x505393['LabelOutlineSolid']){if(_0x1ceb92(0x3e4)!=='olFoe')return _0x1ceb92(0xfa);else{let _0x40d580=_0x10c30b[_0x1ceb92(0x251)]['call'](this,_0x373a76);_0x40d580=this['adjustSkillCost'](_0x544c0c,_0x40d580,_0x37360a),_0x4edf50['PayJS']['call'](this,_0x21adfa,_0x40d580);}}else return ColorManager[_0x1ceb92(0xdb)]();}},Sprite_Gauge[_0x34766e(0x31d)]['labelOutlineWidth']=function(){const _0x136c2d=_0x34766e;return VisuMZ[_0x136c2d(0x33a)][_0x136c2d(0x10e)][_0x136c2d(0x1ae)][_0x136c2d(0xe3)]||0x0;},Sprite_Gauge[_0x34766e(0x31d)]['valueOutlineColor']=function(){const _0xe523e0=_0x34766e,_0x127fcc=VisuMZ[_0xe523e0(0x33a)][_0xe523e0(0x10e)]['Gauge'];if(this[_0xe523e0(0x28f)]()<=0x0)return _0xe523e0(0x1ec);else return _0x127fcc[_0xe523e0(0x25b)]?'rgba(0,\x200,\x200,\x201)':ColorManager['outlineColor']();},Sprite_Gauge[_0x34766e(0x31d)][_0x34766e(0x28f)]=function(){const _0x5b83da=_0x34766e;return VisuMZ[_0x5b83da(0x33a)][_0x5b83da(0x10e)][_0x5b83da(0x1ae)][_0x5b83da(0x3ad)]||0x0;},VisuMZ[_0x34766e(0x33a)]['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon[_0x34766e(0x31d)]['loadBitmap'],Sprite_StateIcon['prototype']['loadBitmap']=function(){const _0x241c08=_0x34766e;VisuMZ['SkillsStatesCore'][_0x241c08(0x35d)]['call'](this),this[_0x241c08(0x316)]();},Sprite_StateIcon['prototype']['createTurnDisplaySprite']=function(){const _0x193349=_0x34766e,_0x47d9d0=Window_Base[_0x193349(0x31d)][_0x193349(0x305)]();this[_0x193349(0x378)]=new Sprite(),this[_0x193349(0x378)][_0x193349(0xb3)]=new Bitmap(ImageManager[_0x193349(0x10b)],_0x47d9d0),this[_0x193349(0x378)][_0x193349(0x3cc)]['x']=this['anchor']['x'],this[_0x193349(0x378)][_0x193349(0x3cc)]['y']=this['anchor']['y'],this[_0x193349(0x217)](this[_0x193349(0x378)]),this[_0x193349(0x30d)]=this[_0x193349(0x378)]['bitmap'];},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x22e)]=Sprite_StateIcon[_0x34766e(0x31d)][_0x34766e(0x123)],Sprite_StateIcon['prototype']['updateFrame']=function(){const _0x51e2ac=_0x34766e;VisuMZ[_0x51e2ac(0x33a)][_0x51e2ac(0x22e)]['call'](this),this[_0x51e2ac(0x1a4)]();},Sprite_StateIcon['prototype'][_0x34766e(0x2ed)]=function(_0x1acc80,_0x6df845,_0x1f7a04,_0x535e67,_0x2caa9e){const _0x40a201=_0x34766e;this[_0x40a201(0x30d)]['drawText'](_0x1acc80,_0x6df845,_0x1f7a04,_0x535e67,this[_0x40a201(0x30d)][_0x40a201(0x16b)],_0x2caa9e);},Sprite_StateIcon[_0x34766e(0x31d)][_0x34766e(0x1a4)]=function(){const _0x1ea6bb=_0x34766e;this['resetFontSettings'](),this[_0x1ea6bb(0x30d)][_0x1ea6bb(0x19b)]();const _0x42d6f4=this[_0x1ea6bb(0x18d)];if(!_0x42d6f4)return;const _0x506fab=_0x42d6f4[_0x1ea6bb(0x33c)]()[_0x1ea6bb(0xc7)](_0x5f2323=>_0x5f2323[_0x1ea6bb(0x2f3)]>0x0),_0x22dbf4=[...Array(0x8)[_0x1ea6bb(0x176)]()][_0x1ea6bb(0xc7)](_0x4107a6=>_0x42d6f4[_0x1ea6bb(0x311)](_0x4107a6)!==0x0),_0x272586=this['_animationIndex'],_0xa4b4d7=_0x506fab[_0x272586];if(_0xa4b4d7)_0x1ea6bb(0x354)===_0x1ea6bb(0x354)?(Window_Base[_0x1ea6bb(0x31d)][_0x1ea6bb(0xf2)][_0x1ea6bb(0x3bf)](this,_0x42d6f4,_0xa4b4d7,0x0,0x0),Window_Base[_0x1ea6bb(0x31d)]['drawActorStateData'][_0x1ea6bb(0x3bf)](this,_0x42d6f4,_0xa4b4d7,0x0,0x0)):_0xe3a76[_0x1ea6bb(0x33a)]['Settings'][_0x1ea6bb(0x12d)]['onExpireStateJS'][_0x1ea6bb(0x3bf)](this,_0xb1779f);else{if(_0x1ea6bb(0x138)!=='RmBPY'){if(_0x514e64[_0x1ea6bb(0x321)](_0x523b9f))return![];}else{const _0x5d3039=_0x22dbf4[_0x272586-_0x506fab['length']];if(_0x5d3039===undefined)return;Window_Base[_0x1ea6bb(0x31d)][_0x1ea6bb(0x3e7)][_0x1ea6bb(0x3bf)](this,_0x42d6f4,_0x5d3039,0x0,0x0),Window_Base[_0x1ea6bb(0x31d)][_0x1ea6bb(0x12a)][_0x1ea6bb(0x3bf)](this,_0x42d6f4,_0x5d3039,0x0,0x0);}}},Sprite_StateIcon[_0x34766e(0x31d)][_0x34766e(0x295)]=function(){const _0x50c6ae=_0x34766e;this[_0x50c6ae(0x30d)][_0x50c6ae(0x20e)]=$gameSystem['mainFontFace'](),this[_0x50c6ae(0x30d)]['fontSize']=$gameSystem['mainFontSize'](),this[_0x50c6ae(0x3d6)]();},Sprite_StateIcon[_0x34766e(0x31d)][_0x34766e(0x3d6)]=function(){const _0x19617d=_0x34766e;this[_0x19617d(0x27d)](ColorManager['normalColor']()),this[_0x19617d(0x14a)](ColorManager[_0x19617d(0xdb)]());},Sprite_StateIcon[_0x34766e(0x31d)][_0x34766e(0x27d)]=function(_0x50c628){const _0x352a37=_0x34766e;this[_0x352a37(0x30d)][_0x352a37(0x189)]=_0x50c628;},Sprite_StateIcon[_0x34766e(0x31d)][_0x34766e(0x14a)]=function(_0x38e2e8){const _0x452b05=_0x34766e;this[_0x452b05(0x30d)][_0x452b05(0xdb)]=_0x38e2e8;},Sprite_StateIcon[_0x34766e(0x31d)][_0x34766e(0x3e2)]=function(){const _0x3991d8=_0x34766e;this[_0x3991d8(0x142)]=!![],this[_0x3991d8(0x3b2)]();},Window_Base[_0x34766e(0x31d)][_0x34766e(0x3ee)]=function(_0x598fe6,_0x4fbb34,_0x2af7bb,_0x8099ab,_0x118870){const _0x3538b1=_0x34766e,_0x5ef337=this[_0x3538b1(0x306)](_0x598fe6,_0x4fbb34),_0x45ae8b=this[_0x3538b1(0x335)](_0x5ef337,_0x2af7bb,_0x8099ab,_0x118870),_0x4bf356=_0x2af7bb+_0x118870-_0x45ae8b[_0x3538b1(0x160)];this[_0x3538b1(0x2ea)](_0x5ef337,_0x4bf356,_0x8099ab,_0x118870),this[_0x3538b1(0x295)]();},Window_Base[_0x34766e(0x31d)]['createAllSkillCostText']=function(_0x587ebd,_0xd82081){const _0x390c8b=_0x34766e;let _0xecadf0='';for(settings of VisuMZ['SkillsStatesCore'][_0x390c8b(0x10e)][_0x390c8b(0xe9)]){if(_0x390c8b(0x23d)!=='rhDds'){if(!this['isSkillCostShown'](_0x587ebd,_0xd82081,settings))continue;if(_0xecadf0[_0x390c8b(0x198)]>0x0)_0xecadf0+=this[_0x390c8b(0x2a0)]();_0xecadf0+=this[_0x390c8b(0x221)](_0x587ebd,_0xd82081,settings);}else{if(!_0x1a412d[_0x390c8b(0x194)](_0x4d1192))return![];}}_0xecadf0=this[_0x390c8b(0x300)](_0x587ebd,_0xd82081,_0xecadf0);if(_0xd82081[_0x390c8b(0x27c)][_0x390c8b(0x34b)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if('JfTlH'===_0x390c8b(0xc2)){if(_0xecadf0[_0x390c8b(0x198)]>0x0)_0xecadf0+=this[_0x390c8b(0x2a0)]();_0xecadf0+=String(RegExp['$1']);}else{const _0x306ffb=_0x54a42c[_0x390c8b(0x33a)][_0x390c8b(0x10e)]['Gauge'];return _0x306ffb['ValueFontMainType']==='number'?_0x40e039[_0x390c8b(0x19e)]()-0x6:_0x55cd1f[_0x390c8b(0x19e)]()-0x2;}}return _0xecadf0;},Window_Base[_0x34766e(0x31d)][_0x34766e(0x300)]=function(_0x585e23,_0x4a86d6,_0x5e8372){return _0x5e8372;},Window_Base[_0x34766e(0x31d)][_0x34766e(0x1ef)]=function(_0x16b1d0,_0x3ce489,_0x2628d8){const _0x1ceda1=_0x34766e;let _0x1845d7=_0x2628d8[_0x1ceda1(0x251)]['call'](_0x16b1d0,_0x3ce489);return _0x1845d7=_0x16b1d0['adjustSkillCost'](_0x3ce489,_0x1845d7,_0x2628d8),_0x2628d8['ShowJS'][_0x1ceda1(0x3bf)](_0x16b1d0,_0x3ce489,_0x1845d7,_0x2628d8);},Window_Base[_0x34766e(0x31d)]['createSkillCostText']=function(_0x1eb2d6,_0x3d36da,_0x174233){const _0x39b17b=_0x34766e;let _0x4e4192=_0x174233[_0x39b17b(0x251)][_0x39b17b(0x3bf)](_0x1eb2d6,_0x3d36da);return _0x4e4192=_0x1eb2d6[_0x39b17b(0x1ed)](_0x3d36da,_0x4e4192,_0x174233),_0x174233[_0x39b17b(0x334)][_0x39b17b(0x3bf)](_0x1eb2d6,_0x3d36da,_0x4e4192,_0x174233);},Window_Base['prototype']['skillCostSeparator']=function(){return'\x20';},Window_Base[_0x34766e(0x31d)][_0x34766e(0x297)]=function(_0x1be948,_0x589be1,_0x24fc4d,_0x3936aa){const _0x1a4f05=_0x34766e;if(!_0x1be948)return;VisuMZ['SkillsStatesCore']['Window_StatusBase_drawActorIcons']['call'](this,_0x1be948,_0x589be1,_0x24fc4d,_0x3936aa),this[_0x1a4f05(0x133)](_0x1be948,_0x589be1,_0x24fc4d,_0x3936aa);},Window_Base[_0x34766e(0x31d)][_0x34766e(0x133)]=function(_0x4f195d,_0x3cbfa5,_0x3ece93,_0x489392){const _0x33dd34=_0x34766e;_0x489392=_0x489392||0x90;const _0x16fa54=ImageManager[_0x33dd34(0x10b)],_0x4db02e=_0x4f195d[_0x33dd34(0x192)]()[_0x33dd34(0x1ca)](0x0,Math['floor'](_0x489392/_0x16fa54)),_0x2f5296=_0x4f195d['states']()[_0x33dd34(0xc7)](_0x2a1753=>_0x2a1753[_0x33dd34(0x2f3)]>0x0),_0x3e68d7=[...Array(0x8)[_0x33dd34(0x176)]()][_0x33dd34(0xc7)](_0x2e29f1=>_0x4f195d[_0x33dd34(0x311)](_0x2e29f1)!==0x0),_0x1a79fa=[];let _0x594876=_0x3cbfa5;for(let _0x381dd5=0x0;_0x381dd5<_0x4db02e[_0x33dd34(0x198)];_0x381dd5++){this['resetFontSettings']();const _0x1d3a22=_0x2f5296[_0x381dd5];if(_0x1d3a22){if(!_0x1a79fa[_0x33dd34(0x183)](_0x1d3a22)){if(_0x33dd34(0x144)!=='QGjRj')this[_0x33dd34(0xf2)](_0x4f195d,_0x1d3a22,_0x594876,_0x3ece93);else return _0x31de3d;}this[_0x33dd34(0x20c)](_0x4f195d,_0x1d3a22,_0x594876,_0x3ece93),_0x1a79fa[_0x33dd34(0x241)](_0x1d3a22);}else{if(_0x33dd34(0x202)===_0x33dd34(0x202)){const _0x1eeeb6=_0x3e68d7[_0x381dd5-_0x2f5296[_0x33dd34(0x198)]];this[_0x33dd34(0x3e7)](_0x4f195d,_0x1eeeb6,_0x594876,_0x3ece93),this[_0x33dd34(0x12a)](_0x4f195d,_0x1eeeb6,_0x594876,_0x3ece93);}else{if(typeof _0x919579===_0x33dd34(0x3a1))_0x3faa8d=_0x2dd5a0[_0x555b70];const _0x1a6064=_0x33dd34(0xb7)[_0x33dd34(0xc3)](_0xe41238['id']);this['_colorCache']=this[_0x33dd34(0x17e)]||{};if(this['_colorCache'][_0x1a6064])return this[_0x33dd34(0x17e)][_0x1a6064];const _0x4d9c79=this[_0x33dd34(0x22c)](_0x527496);return this[_0x33dd34(0x1bc)](_0x1a6064,_0x4d9c79);}}_0x594876+=_0x16fa54;}},Window_Base['prototype']['drawActorStateTurns']=function(_0x5e051b,_0x65385d,_0xd06fae,_0x4de517){const _0x1a9b9f=_0x34766e;if(!VisuMZ[_0x1a9b9f(0x33a)][_0x1a9b9f(0x10e)][_0x1a9b9f(0x12d)][_0x1a9b9f(0x260)])return;if(!_0x5e051b[_0x1a9b9f(0x215)](_0x65385d['id']))return;if(_0x65385d['autoRemovalTiming']===0x0)return;if(_0x65385d[_0x1a9b9f(0x27c)][_0x1a9b9f(0x34b)](/<HIDE STATE TURNS>/i))return;const _0x6bf277=_0x5e051b['stateTurns'](_0x65385d['id']),_0x56e431=ImageManager[_0x1a9b9f(0x10b)],_0x47c7f8=ColorManager['stateColor'](_0x65385d);this[_0x1a9b9f(0x27d)](_0x47c7f8),this[_0x1a9b9f(0x14a)]('rgba(0,\x200,\x200,\x201)'),this[_0x1a9b9f(0x30d)][_0x1a9b9f(0x31f)]=!![],this[_0x1a9b9f(0x30d)][_0x1a9b9f(0x291)]=VisuMZ[_0x1a9b9f(0x33a)][_0x1a9b9f(0x10e)][_0x1a9b9f(0x12d)][_0x1a9b9f(0x2d8)],_0xd06fae+=VisuMZ[_0x1a9b9f(0x33a)][_0x1a9b9f(0x10e)][_0x1a9b9f(0x12d)][_0x1a9b9f(0x353)],_0x4de517+=VisuMZ['SkillsStatesCore'][_0x1a9b9f(0x10e)]['States'][_0x1a9b9f(0x1ba)],this[_0x1a9b9f(0x2ed)](_0x6bf277,_0xd06fae,_0x4de517,_0x56e431,_0x1a9b9f(0x239)),this['contents'][_0x1a9b9f(0x31f)]=![],this['resetFontSettings']();},Window_Base[_0x34766e(0x31d)][_0x34766e(0x20c)]=function(_0x58454e,_0x4d87da,_0x536a2c,_0x4e3170){const _0x388741=_0x34766e;if(!VisuMZ[_0x388741(0x33a)]['Settings'][_0x388741(0x12d)][_0x388741(0x2d1)])return;const _0x2f668b=ImageManager[_0x388741(0x10b)],_0x280a87=ImageManager[_0x388741(0x1c6)]/0x2,_0x112529=ColorManager[_0x388741(0x329)]();this['changeTextColor'](_0x112529),this[_0x388741(0x14a)](_0x388741(0xfa)),this[_0x388741(0x30d)][_0x388741(0x31f)]=!![],this[_0x388741(0x30d)][_0x388741(0x291)]=VisuMZ[_0x388741(0x33a)][_0x388741(0x10e)][_0x388741(0x12d)][_0x388741(0x115)],_0x536a2c+=VisuMZ[_0x388741(0x33a)]['Settings'][_0x388741(0x12d)][_0x388741(0x272)],_0x4e3170+=VisuMZ['SkillsStatesCore'][_0x388741(0x10e)]['States']['DataOffsetY'];const _0x5e1a94=String(_0x58454e[_0x388741(0xf5)](_0x4d87da['id']));this['drawText'](_0x5e1a94,_0x536a2c,_0x4e3170,_0x2f668b,_0x388741(0x22f)),this[_0x388741(0x30d)][_0x388741(0x31f)]=![],this[_0x388741(0x295)]();},Window_Base[_0x34766e(0x31d)][_0x34766e(0x3e7)]=function(_0x1c6daa,_0x5eac23,_0x3b52a7,_0x39909f){const _0x49a517=_0x34766e;if(!VisuMZ[_0x49a517(0x33a)][_0x49a517(0x10e)]['Buffs'][_0x49a517(0x260)])return;const _0xfcc89f=_0x1c6daa[_0x49a517(0x311)](_0x5eac23);if(_0xfcc89f===0x0)return;const _0x6300e5=_0x1c6daa[_0x49a517(0x107)](_0x5eac23),_0x3de45b=ImageManager[_0x49a517(0x10b)],_0x1b289e=_0xfcc89f>0x0?ColorManager[_0x49a517(0x2c8)]():ColorManager[_0x49a517(0x1b0)]();this[_0x49a517(0x27d)](_0x1b289e),this[_0x49a517(0x14a)]('rgba(0,\x200,\x200,\x201)'),this[_0x49a517(0x30d)][_0x49a517(0x31f)]=!![],this['contents']['fontSize']=VisuMZ[_0x49a517(0x33a)][_0x49a517(0x10e)][_0x49a517(0xb4)][_0x49a517(0x2d8)],_0x3b52a7+=VisuMZ['SkillsStatesCore'][_0x49a517(0x10e)][_0x49a517(0xb4)][_0x49a517(0x353)],_0x39909f+=VisuMZ[_0x49a517(0x33a)][_0x49a517(0x10e)]['Buffs'][_0x49a517(0x1ba)],this['drawText'](_0x6300e5,_0x3b52a7,_0x39909f,_0x3de45b,'right'),this[_0x49a517(0x30d)][_0x49a517(0x31f)]=![],this[_0x49a517(0x295)]();},Window_Base[_0x34766e(0x31d)]['drawActorBuffRates']=function(_0x5ccdfe,_0x3f3fe2,_0x2d91bf,_0x4a043d){const _0x1b25e4=_0x34766e;if(!VisuMZ[_0x1b25e4(0x33a)][_0x1b25e4(0x10e)][_0x1b25e4(0xb4)]['ShowData'])return;const _0x480549=_0x5ccdfe['paramBuffRate'](_0x3f3fe2),_0x1059ca=_0x5ccdfe['buff'](_0x3f3fe2),_0x4a2437=ImageManager[_0x1b25e4(0x10b)],_0xb32954=ImageManager[_0x1b25e4(0x1c6)]/0x2,_0x11ac16=_0x1059ca>0x0?ColorManager['buffColor']():ColorManager['debuffColor']();this['changeTextColor'](_0x11ac16),this[_0x1b25e4(0x14a)](_0x1b25e4(0xfa)),this[_0x1b25e4(0x30d)]['fontBold']=!![],this[_0x1b25e4(0x30d)]['fontSize']=VisuMZ['SkillsStatesCore']['Settings']['Buffs'][_0x1b25e4(0x115)],_0x2d91bf+=VisuMZ['SkillsStatesCore'][_0x1b25e4(0x10e)]['Buffs']['DataOffsetX'],_0x4a043d+=VisuMZ['SkillsStatesCore'][_0x1b25e4(0x10e)][_0x1b25e4(0xb4)][_0x1b25e4(0x286)];const _0x41deb7=_0x1b25e4(0x2bb)['format'](Math[_0x1b25e4(0x137)](_0x480549*0x64));this[_0x1b25e4(0x2ed)](_0x41deb7,_0x2d91bf,_0x4a043d,_0x4a2437,_0x1b25e4(0x22f)),this[_0x1b25e4(0x30d)][_0x1b25e4(0x31f)]=![],this[_0x1b25e4(0x295)]();},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x2e4)]=Window_StatusBase[_0x34766e(0x31d)][_0x34766e(0x28c)],Window_StatusBase[_0x34766e(0x31d)][_0x34766e(0x28c)]=function(_0x319bd8,_0x44a956,_0xa8650b,_0x35b17b){const _0x42b5e8=_0x34766e;if(_0x319bd8[_0x42b5e8(0x106)]())_0x44a956=this[_0x42b5e8(0x1e1)](_0x319bd8,_0x44a956);this[_0x42b5e8(0x367)](_0x319bd8,_0x44a956,_0xa8650b,_0x35b17b);},Window_StatusBase[_0x34766e(0x31d)][_0x34766e(0x367)]=function(_0xf43983,_0x5b4dbc,_0x3d91ef,_0x15f0ff){const _0x3be4d3=_0x34766e;if(['none','untitled'][_0x3be4d3(0x183)](_0x5b4dbc['toLowerCase']()))return;VisuMZ[_0x3be4d3(0x33a)][_0x3be4d3(0x2e4)][_0x3be4d3(0x3bf)](this,_0xf43983,_0x5b4dbc,_0x3d91ef,_0x15f0ff);},Window_StatusBase[_0x34766e(0x31d)][_0x34766e(0x1e1)]=function(_0x3c6c9d,_0x5d7894){const _0x20792c=_0x34766e,_0x5a9250=_0x3c6c9d['currentClass']()[_0x20792c(0x27c)];if(_0x5d7894==='hp'&&_0x5a9250['match'](/<REPLACE HP GAUGE:[ ](.*)>/i))return _0x20792c(0x358)!==_0x20792c(0x358)?_0x511bec(_0x5a971d['$1']):String(RegExp['$1']);else{if(_0x5d7894==='mp'&&_0x5a9250[_0x20792c(0x34b)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x5d7894==='tp'&&_0x5a9250[_0x20792c(0x34b)](/<REPLACE TP GAUGE:[ ](.*)>/i)?_0x20792c(0x2e6)===_0x20792c(0x363)?this[_0x20792c(0x2e8)]:String(RegExp['$1']):_0x5d7894;}},VisuMZ['SkillsStatesCore']['Window_StatusBase_drawActorIcons']=Window_StatusBase[_0x34766e(0x31d)]['drawActorIcons'],Window_StatusBase[_0x34766e(0x31d)]['drawActorIcons']=function(_0x19a6c0,_0x45874c,_0x44609a,_0x216002){const _0x49d717=_0x34766e;if(!_0x19a6c0)return;Window_Base[_0x49d717(0x31d)][_0x49d717(0x297)][_0x49d717(0x3bf)](this,_0x19a6c0,_0x45874c,_0x44609a,_0x216002);},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x166)]=Window_SkillType[_0x34766e(0x31d)][_0x34766e(0x1f3)],Window_SkillType[_0x34766e(0x31d)][_0x34766e(0x1f3)]=function(_0x4ffef1){const _0x5d66eb=_0x34766e;VisuMZ[_0x5d66eb(0x33a)][_0x5d66eb(0x166)]['call'](this,_0x4ffef1),this['createCommandNameWindow'](_0x4ffef1);},Window_SkillType[_0x34766e(0x31d)]['createCommandNameWindow']=function(_0x17edb6){const _0x249abe=_0x34766e,_0x2e08f3=new Rectangle(0x0,0x0,_0x17edb6[_0x249abe(0x160)],_0x17edb6[_0x249abe(0x16b)]);this[_0x249abe(0x384)]=new Window_Base(_0x2e08f3),this[_0x249abe(0x384)]['opacity']=0x0,this[_0x249abe(0x217)](this[_0x249abe(0x384)]),this[_0x249abe(0x206)]();},Window_SkillType[_0x34766e(0x31d)][_0x34766e(0x3c7)]=function(){const _0x384a4c=_0x34766e;Window_Command[_0x384a4c(0x31d)]['callUpdateHelp'][_0x384a4c(0x3bf)](this);if(this['_commandNameWindow'])this[_0x384a4c(0x206)]();},Window_SkillType[_0x34766e(0x31d)][_0x34766e(0x206)]=function(){const _0x31ae75=_0x34766e,_0x1cb073=this[_0x31ae75(0x384)];_0x1cb073[_0x31ae75(0x30d)][_0x31ae75(0x19b)]();const _0xa93f7f=this[_0x31ae75(0x2e2)](this['index']());if(_0xa93f7f===_0x31ae75(0x282)&&this['maxItems']()>0x0){const _0x460450=this[_0x31ae75(0xfc)](this[_0x31ae75(0x24b)]());let _0x195d8d=this[_0x31ae75(0x32a)](this[_0x31ae75(0x24b)]());_0x195d8d=_0x195d8d[_0x31ae75(0x19d)](/\\I\[(\d+)\]/gi,''),_0x1cb073[_0x31ae75(0x295)](),this[_0x31ae75(0x17a)](_0x195d8d,_0x460450),this[_0x31ae75(0x376)](_0x195d8d,_0x460450),this[_0x31ae75(0x22d)](_0x195d8d,_0x460450);}},Window_SkillType[_0x34766e(0x31d)]['commandNameWindowDrawBackground']=function(_0x479338,_0x3563d8){},Window_SkillType[_0x34766e(0x31d)]['commandNameWindowDrawText']=function(_0x49da89,_0x41027e){const _0x1db2c5=_0x34766e,_0x1c1ec2=this['_commandNameWindow'];_0x1c1ec2[_0x1db2c5(0x2ed)](_0x49da89,0x0,_0x41027e['y'],_0x1c1ec2[_0x1db2c5(0xd6)],_0x1db2c5(0x22f));},Window_SkillType[_0x34766e(0x31d)][_0x34766e(0x22d)]=function(_0x1b6f79,_0x13c01a){const _0x21a35c=_0x34766e,_0xb760a8=this[_0x21a35c(0x384)],_0x34d24e=$gameSystem[_0x21a35c(0x296)](),_0x5e6107=_0x13c01a['x']+Math['floor'](_0x13c01a['width']/0x2)+_0x34d24e;_0xb760a8['x']=_0xb760a8[_0x21a35c(0x160)]/-0x2+_0x5e6107,_0xb760a8['y']=Math[_0x21a35c(0x226)](_0x13c01a[_0x21a35c(0x16b)]/0x2);},Window_SkillType[_0x34766e(0x31d)][_0x34766e(0x3ec)]=function(){const _0x47a8d1=_0x34766e;return Imported[_0x47a8d1(0x199)]&&Window_Command['prototype'][_0x47a8d1(0x3ec)]['call'](this);},Window_SkillType[_0x34766e(0x31d)]['makeCommandList']=function(){const _0x1c39fb=_0x34766e;if(!this[_0x1c39fb(0x1d0)])return;const _0x38c59d=this[_0x1c39fb(0x1d0)][_0x1c39fb(0x22a)]();for(const _0x16bc46 of _0x38c59d){if(_0x1c39fb(0x257)===_0x1c39fb(0x257)){const _0x532bfe=this['makeCommandName'](_0x16bc46);this[_0x1c39fb(0x330)](_0x532bfe,_0x1c39fb(0x2f0),!![],_0x16bc46);}else return _0x1c39fb(0x1ec);}},Window_SkillType['prototype'][_0x34766e(0x2d2)]=function(_0x127a0a){const _0x1e7735=_0x34766e;let _0x3c6e42=$dataSystem[_0x1e7735(0x22a)][_0x127a0a];if(_0x3c6e42[_0x1e7735(0x34b)](/\\I\[(\d+)\]/i))return _0x3c6e42;if(this[_0x1e7735(0xfd)]()===_0x1e7735(0x1b1))return _0x3c6e42;const _0x30eeb6=VisuMZ['SkillsStatesCore']['Settings']['Skills'],_0x4752d1=$dataSystem[_0x1e7735(0x2b6)][_0x1e7735(0x183)](_0x127a0a),_0xc79bb4=_0x4752d1?_0x30eeb6['IconStypeMagic']:_0x30eeb6[_0x1e7735(0x34f)];return _0x1e7735(0x2cd)[_0x1e7735(0xc3)](_0xc79bb4,_0x3c6e42);},Window_SkillType[_0x34766e(0x31d)][_0x34766e(0x36a)]=function(){const _0x2c4ac1=_0x34766e;return VisuMZ[_0x2c4ac1(0x33a)][_0x2c4ac1(0x10e)][_0x2c4ac1(0x1c8)][_0x2c4ac1(0x27e)];},Window_SkillType[_0x34766e(0x31d)][_0x34766e(0x232)]=function(_0x289278){const _0x12ebc3=_0x34766e,_0x59f25a=this[_0x12ebc3(0x2e2)](_0x289278);if(_0x59f25a===_0x12ebc3(0x2f6))this[_0x12ebc3(0x1f5)](_0x289278);else{if(_0x59f25a===_0x12ebc3(0x282)){if(_0x12ebc3(0x12f)===_0x12ebc3(0x12f))this['drawItemStyleIcon'](_0x289278);else{const _0x2bcfb7=_0x313de3['parse']('['+_0x3b31f4['$1'][_0x12ebc3(0x34b)](/\d+/g)+']');for(const _0x3608a5 of _0x2bcfb7){if(!_0x5871e0[_0x12ebc3(0x194)](_0x3608a5))return![];}return!![];}}else{if(_0x12ebc3(0x3a4)===_0x12ebc3(0x3a4))Window_Command['prototype'][_0x12ebc3(0x232)]['call'](this,_0x289278);else{this['_stypeIDs']=this[_0x12ebc3(0x29d)]||{};if(this[_0x12ebc3(0x29d)][_0x164661['id']])return this['_stypeIDs'][_0x47ba49['id']];this[_0x12ebc3(0x29d)][_0x302209['id']]=[_0x248058[_0x12ebc3(0x3d2)]];if(_0x2b8025[_0x12ebc3(0x27c)][_0x12ebc3(0x34b)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x452307=_0x14e1f3[_0x12ebc3(0xf8)]('['+_0x268664['$1'][_0x12ebc3(0x34b)](/\d+/g)+']');this['_stypeIDs'][_0x2382dd['id']]=this['_stypeIDs'][_0x4f5aa9['id']][_0x12ebc3(0x366)](_0x452307);}else{if(_0x12f867['note']['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x1e21b5=_0x316618['$1'][_0x12ebc3(0x3c1)](',');for(const _0x1f0dd0 of _0x1e21b5){const _0x10bb65=_0x13ab59[_0x12ebc3(0x355)](_0x1f0dd0);if(_0x10bb65)this[_0x12ebc3(0x29d)][_0x365d5d['id']][_0x12ebc3(0x241)](_0x10bb65);}}}return this['_stypeIDs'][_0x4754ab['id']];}}}},Window_SkillType[_0x34766e(0x31d)][_0x34766e(0xfd)]=function(){const _0x446763=_0x34766e;return VisuMZ[_0x446763(0x33a)][_0x446763(0x10e)][_0x446763(0x1c8)][_0x446763(0x18e)];},Window_SkillType[_0x34766e(0x31d)][_0x34766e(0x2e2)]=function(_0x4550fb){const _0x3e0592=_0x34766e;if(_0x4550fb<0x0)return _0x3e0592(0x1b1);const _0x4107a3=this[_0x3e0592(0xfd)]();if(_0x4107a3!==_0x3e0592(0x2ae)){if('syiLE'==='SmJSV'){let _0x3f31fb=_0x36d30a[_0x3e0592(0x22a)][_0x2836a5];if(_0x3f31fb[_0x3e0592(0x34b)](/\\I\[(\d+)\]/i))return _0x3f31fb;if(this[_0x3e0592(0xfd)]()===_0x3e0592(0x1b1))return _0x3f31fb;const _0x1ebc1e=_0x1fccef[_0x3e0592(0x33a)]['Settings'][_0x3e0592(0x1c8)],_0x43f1d7=_0x12f79a[_0x3e0592(0x2b6)]['includes'](_0x5bc77c),_0x54db40=_0x43f1d7?_0x1ebc1e[_0x3e0592(0x29e)]:_0x1ebc1e[_0x3e0592(0x34f)];return _0x3e0592(0x2cd)['format'](_0x54db40,_0x3f31fb);}else return _0x4107a3;}else{if(this[_0x3e0592(0x35e)]()>0x0){const _0x28f1ab=this[_0x3e0592(0x32a)](_0x4550fb);if(_0x28f1ab[_0x3e0592(0x34b)](/\\I\[(\d+)\]/i)){const _0x5b7d58=this['itemLineRect'](_0x4550fb),_0xf68520=this[_0x3e0592(0x335)](_0x28f1ab)['width'];if(_0xf68520<=_0x5b7d58['width']){if('ZQULS'!==_0x3e0592(0x135))return _0x3e0592(0x2f6);else{_0x5b85de[_0x3e0592(0x34b)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x46c031=_0x63dd12[_0x3e0592(0x2be)](_0x2d8fc7(_0x34c54a['$1'])[_0x3e0592(0x3ea)]()),_0x303c72=_0x1d1665(_0x52d03a['$2']);_0x46c031>=0x0&&(_0x497b26[_0x3e0592(0xef)](_0x46c031,_0x303c72),this[_0x3e0592(0x3ed)](_0x529b41));}}else return _0x3e0592(0x282);}}}return'text';},Window_SkillType['prototype'][_0x34766e(0x1f5)]=function(_0x1553f8){const _0x6cc4ae=_0x34766e,_0x5c6e2c=this[_0x6cc4ae(0xfc)](_0x1553f8),_0x19d86a=this[_0x6cc4ae(0x32a)](_0x1553f8),_0x1a25fb=this['textSizeEx'](_0x19d86a)[_0x6cc4ae(0x160)];this['changePaintOpacity'](this[_0x6cc4ae(0x1f7)](_0x1553f8));const _0x5a99b5=this['itemTextAlign']();if(_0x5a99b5==='right')this[_0x6cc4ae(0x2ea)](_0x19d86a,_0x5c6e2c['x']+_0x5c6e2c[_0x6cc4ae(0x160)]-_0x1a25fb,_0x5c6e2c['y'],_0x1a25fb);else{if(_0x5a99b5==='center'){const _0x38d684=_0x5c6e2c['x']+Math[_0x6cc4ae(0x226)]((_0x5c6e2c['width']-_0x1a25fb)/0x2);this[_0x6cc4ae(0x2ea)](_0x19d86a,_0x38d684,_0x5c6e2c['y'],_0x1a25fb);}else this['drawTextEx'](_0x19d86a,_0x5c6e2c['x'],_0x5c6e2c['y'],_0x1a25fb);}},Window_SkillType['prototype'][_0x34766e(0x15e)]=function(_0x4cb277){const _0x6d2b8e=_0x34766e;this[_0x6d2b8e(0x32a)](_0x4cb277)['match'](/\\I\[(\d+)\]/i);const _0x43a801=Number(RegExp['$1'])||0x0,_0x344fe5=this[_0x6d2b8e(0xfc)](_0x4cb277),_0x277d44=_0x344fe5['x']+Math[_0x6d2b8e(0x226)]((_0x344fe5[_0x6d2b8e(0x160)]-ImageManager[_0x6d2b8e(0x10b)])/0x2),_0x30bbd9=_0x344fe5['y']+(_0x344fe5[_0x6d2b8e(0x16b)]-ImageManager[_0x6d2b8e(0x1c6)])/0x2;this[_0x6d2b8e(0x1a5)](_0x43a801,_0x277d44,_0x30bbd9);},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x2c3)]=Window_SkillStatus[_0x34766e(0x31d)][_0x34766e(0xbd)],Window_SkillStatus[_0x34766e(0x31d)]['refresh']=function(){const _0xf8abb2=_0x34766e;VisuMZ[_0xf8abb2(0x33a)][_0xf8abb2(0x2c3)][_0xf8abb2(0x3bf)](this);if(this[_0xf8abb2(0x1d0)])this['drawExtendedSkillsStatesCoreStatus']();},Window_SkillStatus[_0x34766e(0x31d)][_0x34766e(0x360)]=function(){const _0x3ba3a5=_0x34766e;if(!Imported[_0x3ba3a5(0x199)])return;if(!Imported[_0x3ba3a5(0x3cf)])return;const _0x18acf4=this[_0x3ba3a5(0x3ba)]();let _0x54b76f=this[_0x3ba3a5(0x19c)]()/0x2+0xb4+0xb4+0xb4,_0x4b7c29=this[_0x3ba3a5(0xd6)]-_0x54b76f-0x2;if(_0x4b7c29>=0x12c){const _0x27151d=VisuMZ['CoreEngine'][_0x3ba3a5(0x10e)][_0x3ba3a5(0x13f)]['DisplayedParams'],_0x166fc0=Math[_0x3ba3a5(0x226)](_0x4b7c29/0x2)-0x18;let _0x8dfc95=_0x54b76f,_0x37075f=Math[_0x3ba3a5(0x226)]((this['innerHeight']-Math[_0x3ba3a5(0x270)](_0x27151d[_0x3ba3a5(0x198)]/0x2)*_0x18acf4)/0x2),_0x3494e0=0x0;for(const _0x572ea6 of _0x27151d){if(_0x3ba3a5(0x3d0)===_0x3ba3a5(0x24f))this['bitmap']['clear'](),this[_0x3ba3a5(0x3dd)][_0x3ba3a5(0x2f2)][_0x3ba3a5(0x3bf)](this);else{this[_0x3ba3a5(0x28a)](_0x8dfc95,_0x37075f,_0x166fc0,_0x572ea6),_0x3494e0++;if(_0x3494e0%0x2===0x0)_0x3ba3a5(0x332)==='WRNys'?(_0x8dfc95=_0x54b76f,_0x37075f+=_0x18acf4):(_0x5eee9c['SkillsStatesCore']['Scene_Boot_onDatabaseLoaded'][_0x3ba3a5(0x3bf)](this),this[_0x3ba3a5(0x12c)](),_0x36905b['SkillsStatesCore'][_0x3ba3a5(0x112)]());else{if(_0x3ba3a5(0x1d1)!==_0x3ba3a5(0x1d1)){const _0x1dfff4=_0x5054e1[_0x3ba3a5(0x33a)][_0x3ba3a5(0x10e)]['Gauge'];if(this[_0x3ba3a5(0x1bd)]()<=0x0)return _0x3ba3a5(0x1ec);else return _0x1dfff4['LabelOutlineSolid']?_0x3ba3a5(0xfa):_0x31497f[_0x3ba3a5(0xdb)]();}else _0x8dfc95+=_0x166fc0+0x18;}}}}this[_0x3ba3a5(0x295)]();},Window_SkillStatus['prototype'][_0x34766e(0x28a)]=function(_0x93f1b2,_0x4a8743,_0x370f73,_0x235fbb){const _0x2d419c=_0x34766e,_0x4bba73=this[_0x2d419c(0x3ba)]();this[_0x2d419c(0x295)](),this[_0x2d419c(0x322)](_0x93f1b2,_0x4a8743,_0x370f73,_0x235fbb,!![]),this[_0x2d419c(0x3d6)](),this[_0x2d419c(0x30d)][_0x2d419c(0x291)]-=0x8;const _0x1852e7=this['_actor'][_0x2d419c(0x1d5)](_0x235fbb,!![]);this['contents'][_0x2d419c(0x2ed)](_0x1852e7,_0x93f1b2,_0x4a8743,_0x370f73,_0x4bba73,'right');},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x10c)]=Window_SkillList['prototype'][_0x34766e(0x183)],Window_SkillList['prototype']['includes']=function(_0x189f06){const _0x406289=_0x34766e;return this[_0x406289(0x343)](_0x189f06);},VisuMZ[_0x34766e(0x33a)]['Window_SkillList_maxCols']=Window_SkillList[_0x34766e(0x31d)][_0x34766e(0x35b)],Window_SkillList[_0x34766e(0x31d)][_0x34766e(0x35b)]=function(){const _0x28edf0=_0x34766e;if(SceneManager['_scene'][_0x28edf0(0x11b)]===Scene_Battle){if(_0x28edf0(0x372)!==_0x28edf0(0x3f0))return VisuMZ[_0x28edf0(0x33a)][_0x28edf0(0x277)][_0x28edf0(0x3bf)](this);else{if(this[_0x28edf0(0x3e1)](_0x4abc27)){const _0x48146d=_0x50cf41[_0x28edf0(0x33a)]['Settings'][_0x28edf0(0xb4)][_0x28edf0(0x368)];this[_0x28edf0(0x117)][_0x2a5c71]=_0x533552[_0x28edf0(0x377)](0x0,_0x48146d);}}}else{if(_0x28edf0(0x2a5)!==_0x28edf0(0x252))return VisuMZ['SkillsStatesCore'][_0x28edf0(0x10e)][_0x28edf0(0x1c8)][_0x28edf0(0x352)];else this[_0x28edf0(0x200)](_0x351bd1,_0x4080b4);}},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x2d3)]=Window_SkillList[_0x34766e(0x31d)][_0x34766e(0x240)],Window_SkillList['prototype'][_0x34766e(0x240)]=function(_0x2d6618){const _0x21e4dd=_0x34766e,_0x5c83ff=this[_0x21e4dd(0x1d0)]!==_0x2d6618;VisuMZ[_0x21e4dd(0x33a)][_0x21e4dd(0x2d3)]['call'](this,_0x2d6618),_0x5c83ff&&(this[_0x21e4dd(0x38f)]&&this[_0x21e4dd(0x38f)][_0x21e4dd(0x11b)]===Window_ShopStatus&&this['_statusWindow']['setItem'](this[_0x21e4dd(0x1a3)](0x0)));},Window_SkillList[_0x34766e(0x31d)][_0x34766e(0x220)]=function(_0x327e3b){const _0x46f135=_0x34766e;if(this[_0x46f135(0x394)]===_0x327e3b)return;this[_0x46f135(0x394)]=_0x327e3b,this['refresh'](),this[_0x46f135(0x3c4)](0x0,0x0);if(this['_statusWindow']&&this[_0x46f135(0x38f)][_0x46f135(0x11b)]===Window_ShopStatus){if(_0x46f135(0x1fd)===_0x46f135(0x1fd))this[_0x46f135(0x38f)][_0x46f135(0x184)](this[_0x46f135(0x1a3)](0x0));else return _0x21f2fc[_0x46f135(0x33a)][_0x46f135(0x10e)]['Skills'][_0x46f135(0xbc)];}},Window_SkillList['prototype'][_0x34766e(0x343)]=function(_0x3d52f8){const _0x52dd48=_0x34766e;if(!_0x3d52f8)return VisuMZ[_0x52dd48(0x33a)][_0x52dd48(0x10c)][_0x52dd48(0x3bf)](this,_0x3d52f8);if(!this[_0x52dd48(0x16c)](_0x3d52f8))return![];if(!this[_0x52dd48(0xf3)](_0x3d52f8))return![];if(!this[_0x52dd48(0x2c4)](_0x3d52f8))return![];return!![];},Window_SkillList[_0x34766e(0x31d)]['checkSkillTypeMatch']=function(_0x2473d7){const _0x490899=_0x34766e;return DataManager['getSkillTypes'](_0x2473d7)[_0x490899(0x183)](this[_0x490899(0x394)]);},Window_SkillList[_0x34766e(0x31d)][_0x34766e(0xf3)]=function(_0x1f4506){const _0x4afe34=_0x34766e;if(!VisuMZ[_0x4afe34(0x33a)][_0x4afe34(0x2a6)](this[_0x4afe34(0x1d0)],_0x1f4506))return![];if(!VisuMZ[_0x4afe34(0x33a)][_0x4afe34(0x114)](this[_0x4afe34(0x1d0)],_0x1f4506))return![];if(!VisuMZ['SkillsStatesCore'][_0x4afe34(0x163)](this[_0x4afe34(0x1d0)],_0x1f4506))return![];return!![];},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x2a6)]=function(_0x328674,_0x1a9381){const _0x485df4=_0x34766e,_0x10319a=_0x1a9381[_0x485df4(0x27c)];if(_0x10319a['match'](/<HIDE IN BATTLE>/i)&&$gameParty[_0x485df4(0x3d8)]())return![];else{if(_0x10319a[_0x485df4(0x34b)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x485df4(0x3d8)]()){if(_0x485df4(0x2bf)!==_0x485df4(0x2bf))_0xacbff=_0x51a870(_0x44528b['$1']),_0x3e4e3e=_0x53b864(_0x2c3816['$2']);else return![];}else return!![];}},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x114)]=function(_0x4e57bd,_0x15faa8){const _0x9cee73=_0x34766e,_0x111ffd=_0x15faa8[_0x9cee73(0x27c)];if(_0x111ffd[_0x9cee73(0x34b)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x297b7a=JSON[_0x9cee73(0xf8)]('['+RegExp['$1'][_0x9cee73(0x34b)](/\d+/g)+']');for(const _0x5561ef of _0x297b7a){if(_0x9cee73(0x223)===_0x9cee73(0x392))return this['totalStateCategoryAffected'](_0x4cd77e)>0x0;else{if(!$gameSwitches[_0x9cee73(0x194)](_0x5561ef))return![];}}return!![];}if(_0x111ffd[_0x9cee73(0x34b)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x9cee73(0x1d8)!==_0x9cee73(0x104)){const _0x47215d=JSON[_0x9cee73(0xf8)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x55b2b2 of _0x47215d){if(_0x9cee73(0x131)===_0x9cee73(0x131)){if(!$gameSwitches[_0x9cee73(0x194)](_0x55b2b2))return![];}else this[_0x9cee73(0xeb)](),_0x141275[_0x9cee73(0x33a)][_0x9cee73(0x13a)][_0x9cee73(0x3bf)](this),this[_0x9cee73(0xf1)](),this[_0x9cee73(0x3c3)]();}return!![];}else{_0xf7e8ff[_0x9cee73(0x33a)][_0x9cee73(0x2c3)][_0x9cee73(0x3bf)](this);if(this[_0x9cee73(0x1d0)])this[_0x9cee73(0x360)]();}}if(_0x111ffd[_0x9cee73(0x34b)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x9cee73(0x32b)!=='ejrJR'){const _0x1ad16c=0x0,_0xcf4164=this[_0x9cee73(0x134)](),_0x3463f1=_0x2a1d41['boxWidth'],_0x4905ed=this[_0x9cee73(0x1c3)]();return new _0x19967b(_0x1ad16c,_0xcf4164,_0x3463f1,_0x4905ed);}else{const _0x1e13fc=JSON[_0x9cee73(0xf8)]('['+RegExp['$1'][_0x9cee73(0x34b)](/\d+/g)+']');for(const _0x182220 of _0x1e13fc){if(_0x9cee73(0x1dc)!==_0x9cee73(0x1dc))_0x1a1b2d[_0x9cee73(0x33a)]['Game_Action_applyItemUserEffect']['call'](this,_0x51a5f1),this[_0x9cee73(0x2bd)](_0x739245);else{if($gameSwitches[_0x9cee73(0x194)](_0x182220))return!![];}}return![];}}if(_0x111ffd[_0x9cee73(0x34b)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('ezPeh'!==_0x9cee73(0x371)){const _0x5efaa5=_0x277669[_0x9cee73(0x31d)][_0x9cee73(0x305)]();this[_0x9cee73(0x378)]=new _0x184c29(),this[_0x9cee73(0x378)][_0x9cee73(0xb3)]=new _0xd07fac(_0xe892f[_0x9cee73(0x10b)],_0x5efaa5),this[_0x9cee73(0x378)][_0x9cee73(0x3cc)]['x']=this[_0x9cee73(0x3cc)]['x'],this[_0x9cee73(0x378)][_0x9cee73(0x3cc)]['y']=this[_0x9cee73(0x3cc)]['y'],this['addChild'](this[_0x9cee73(0x378)]),this[_0x9cee73(0x30d)]=this[_0x9cee73(0x378)]['bitmap'];}else{const _0x4283e0=JSON[_0x9cee73(0xf8)]('['+RegExp['$1'][_0x9cee73(0x34b)](/\d+/g)+']');for(const _0x4c1c7c of _0x4283e0){if(!$gameSwitches[_0x9cee73(0x194)](_0x4c1c7c))return!![];}return![];}}if(_0x111ffd['match'](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4538ff=JSON['parse']('['+RegExp['$1'][_0x9cee73(0x34b)](/\d+/g)+']');for(const _0x2310cc of _0x4538ff){if(!$gameSwitches['value'](_0x2310cc))return!![];}return![];}if(_0x111ffd['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4db4fa=JSON['parse']('['+RegExp['$1'][_0x9cee73(0x34b)](/\d+/g)+']');for(const _0x40d846 of _0x4db4fa){if($gameSwitches[_0x9cee73(0x194)](_0x40d846))return![];}return!![];}return!![];},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x163)]=function(_0x1680f7,_0x3ff19f){const _0x24f883=_0x34766e,_0x17aa91=_0x3ff19f[_0x24f883(0x27c)];if(_0x17aa91[_0x24f883(0x34b)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2625b1=JSON[_0x24f883(0xf8)]('['+RegExp['$1'][_0x24f883(0x34b)](/\d+/g)+']');for(const _0x4e3634 of _0x2625b1){if(_0x24f883(0x224)==='Boquj')_0x4a6053[_0x24f883(0x326)](_0x432ecb,_0x1b1594),this[_0x24f883(0x3ed)](_0x28f1c7);else{if(!_0x1680f7['isLearnedSkill'](_0x4e3634))return![];}}return!![];}else{if(_0x17aa91[_0x24f883(0x34b)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x336b97=RegExp['$1'][_0x24f883(0x3c1)](',');for(const _0x3f4458 of _0x336b97){const _0x190696=DataManager[_0x24f883(0xf0)](_0x3f4458);if(!_0x190696)continue;if(!_0x1680f7['isLearnedSkill'](_0x190696))return![];}return!![];}}if(_0x17aa91[_0x24f883(0x34b)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2253e8=JSON['parse']('['+RegExp['$1'][_0x24f883(0x34b)](/\d+/g)+']');for(const _0x480ace of _0x2253e8){if(!_0x1680f7[_0x24f883(0x27b)](_0x480ace))return![];}return!![];}else{if(_0x17aa91[_0x24f883(0x34b)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x47ca6f=RegExp['$1']['split'](',');for(const _0x29c0f1 of _0x47ca6f){if(_0x24f883(0x36c)!==_0x24f883(0x36c))return!![];else{const _0x5ab95c=DataManager[_0x24f883(0xf0)](_0x29c0f1);if(!_0x5ab95c)continue;if(!_0x1680f7[_0x24f883(0x27b)](_0x5ab95c))return![];}}return!![];}}if(_0x17aa91['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('tNkvw'!==_0x24f883(0x14d)){const _0x186001=JSON[_0x24f883(0xf8)]('['+RegExp['$1'][_0x24f883(0x34b)](/\d+/g)+']');for(const _0x1843a8 of _0x186001){if(_0x1680f7['isLearnedSkill'](_0x1843a8))return!![];}return![];}else{if(this[_0x24f883(0x1ab)](_0x5b0da1)){const _0x362d06=this[_0x24f883(0xed)][_0x181e6d];this[_0x24f883(0x348)](_0x35791c);if(_0x362d06>0x0)this[_0x24f883(0x22b)](_0xd2f777);if(_0x362d06<0x0)this[_0x24f883(0x2b2)](_0x180deb);}}}else{if(_0x17aa91[_0x24f883(0x34b)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4e1630=RegExp['$1'][_0x24f883(0x3c1)](',');for(const _0x34b532 of _0x4e1630){const _0x2b21ce=DataManager['getSkillIdWithName'](_0x34b532);if(!_0x2b21ce)continue;if(_0x1680f7[_0x24f883(0x27b)](_0x2b21ce))return!![];}return![];}}if(_0x17aa91[_0x24f883(0x34b)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x24f883(0x3be)!==_0x24f883(0x3be)){if(_0x36920e[_0x24f883(0x382)]())_0x29e72e[_0x24f883(0x19a)](_0x9e86e9);}else{const _0x1fb93f=JSON[_0x24f883(0xf8)]('['+RegExp['$1'][_0x24f883(0x34b)](/\d+/g)+']');for(const _0x351931 of _0x1fb93f){if(!_0x1680f7[_0x24f883(0x27b)](_0x351931))return!![];}return![];}}else{if(_0x17aa91[_0x24f883(0x34b)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x24f883(0x249)==='WREZv'){const _0x9b5572=RegExp['$1'][_0x24f883(0x3c1)](',');for(const _0x4dff06 of _0x9b5572){const _0x406a68=DataManager[_0x24f883(0xf0)](_0x4dff06);if(!_0x406a68)continue;if(!_0x1680f7['isLearnedSkill'](_0x406a68))return!![];}return![];}else return _0x2e6c3e['mainFontFace']();}}if(_0x17aa91[_0x24f883(0x34b)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x71dadf=JSON[_0x24f883(0xf8)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x6c7319 of _0x71dadf){if(!_0x1680f7[_0x24f883(0x27b)](_0x6c7319))return!![];}return![];}else{if(_0x17aa91[_0x24f883(0x34b)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x599de9=RegExp['$1'][_0x24f883(0x3c1)](',');for(const _0x100635 of _0x599de9){if('bHXCn'===_0x24f883(0x391)){const _0x2886fe=DataManager[_0x24f883(0xf0)](_0x100635);if(!_0x2886fe)continue;if(!_0x1680f7['isLearnedSkill'](_0x2886fe))return!![];}else return this[_0x24f883(0x21f)]();}return![];}}if(_0x17aa91['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x334068=JSON[_0x24f883(0xf8)]('['+RegExp['$1'][_0x24f883(0x34b)](/\d+/g)+']');for(const _0x4e6546 of _0x334068){if(_0x24f883(0xd2)==='qJfpv')return[];else{if(_0x1680f7['isLearnedSkill'](_0x4e6546))return![];}}return!![];}else{if(_0x17aa91['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('uhNob'==='uhNob'){const _0x3586b5=RegExp['$1'][_0x24f883(0x3c1)](',');for(const _0x318d18 of _0x3586b5){if('vyFGu'!=='vyFGu')_0x37eb90[_0x24f883(0x15f)]=0x2;else{const _0x27249e=DataManager['getSkillIdWithName'](_0x318d18);if(!_0x27249e)continue;if(_0x1680f7[_0x24f883(0x27b)](_0x27249e))return![];}}return!![];}else{const _0x48b743=this[_0x24f883(0x1a3)](_0x3c93a5),_0x484ffb=_0x48b743?_0x48b743[_0x24f883(0x205)]:'';if(_0x48b743)this[_0x24f883(0x364)](_0x48b743);_0x182764[_0x24f883(0x33a)][_0x24f883(0x33b)][_0x24f883(0x3bf)](this,_0x1a91ee);if(_0x48b743)_0x48b743[_0x24f883(0x205)]=_0x484ffb;}}}if(_0x17aa91[_0x24f883(0x34b)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x24f883(0x1a0)==='tUbAa'){const _0x3cf75a=this[_0x24f883(0xfc)](_0x39e474),_0x2c6760=this[_0x24f883(0x335)](_0x2e4e5e)[_0x24f883(0x160)];return _0x2c6760<=_0x3cf75a[_0x24f883(0x160)]?_0x24f883(0x2f6):_0x24f883(0x282);}else{const _0x1848f2=JSON['parse']('['+RegExp['$1'][_0x24f883(0x34b)](/\d+/g)+']');for(const _0x115400 of _0x1848f2){if(_0x24f883(0x1fb)===_0x24f883(0x1fb)){if(!_0x1680f7[_0x24f883(0x321)](_0x115400))return![];}else return _0x4b1789[_0x24f883(0x33a)][_0x24f883(0x10e)][_0x24f883(0x12d)][_0x24f883(0x3e0)]??0x14;}return!![];}}else{if(_0x17aa91[_0x24f883(0x34b)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x54e05a=RegExp['$1']['split'](',');for(const _0x79de54 of _0x54e05a){const _0x413515=DataManager[_0x24f883(0xf0)](_0x79de54);if(!_0x413515)continue;if(!_0x1680f7[_0x24f883(0x321)](_0x413515))return![];}return!![];}}if(_0x17aa91['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x24f883(0x197)!==_0x24f883(0x247)){const _0x5eb625=JSON[_0x24f883(0xf8)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2b4b28 of _0x5eb625){if(_0x24f883(0x2b5)!==_0x24f883(0x2b5))_0x26d630[_0x24f883(0x33a)]['Sprite_Gauge_initMembers'][_0x24f883(0x3bf)](this),this[_0x24f883(0x3dd)]=null;else{if(!_0x1680f7[_0x24f883(0x321)](_0x2b4b28))return![];}}return!![];}else{const _0x5486ad=this[_0x24f883(0x384)],_0x37771d=_0x158738[_0x24f883(0x296)](),_0x1028df=_0x1e104e['x']+_0x5aece6[_0x24f883(0x226)](_0x256c35[_0x24f883(0x160)]/0x2)+_0x37771d;_0x5486ad['x']=_0x5486ad['width']/-0x2+_0x1028df,_0x5486ad['y']=_0x792bea['floor'](_0x22e01b['height']/0x2);}}else{if(_0x17aa91[_0x24f883(0x34b)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4ffa5a=RegExp['$1'][_0x24f883(0x3c1)](',');for(const _0x2e1f70 of _0x4ffa5a){if(_0x24f883(0x336)!==_0x24f883(0x336)){const _0x156a6d=_0x2f61ca['parse']('['+_0x2b5f1b['$1'][_0x24f883(0x34b)](/\d+/g)+']');for(const _0x17a6f4 of _0x156a6d){if(!_0x17a21d[_0x24f883(0x194)](_0x17a6f4))return![];}return!![];}else{const _0x7afbbe=DataManager[_0x24f883(0xf0)](_0x2e1f70);if(!_0x7afbbe)continue;if(!_0x1680f7['hasSkill'](_0x7afbbe))return![];}}return!![];}}if(_0x17aa91[_0x24f883(0x34b)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x357863=JSON['parse']('['+RegExp['$1'][_0x24f883(0x34b)](/\d+/g)+']');for(const _0x567b1e of _0x357863){if(_0x1680f7[_0x24f883(0x321)](_0x567b1e))return!![];}return![];}else{if(_0x17aa91[_0x24f883(0x34b)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('DeVbh'===_0x24f883(0x3a7)){if(!_0x205319[_0x24f883(0x110)])return![];else return this[_0x24f883(0x23b)]()?!![]:_0xacf306['SkillsStatesCore'][_0x24f883(0x10e)][_0x24f883(0x1c8)]['ShowShopStatus'];}else{const _0x56fd69=RegExp['$1'][_0x24f883(0x3c1)](',');for(const _0x107f85 of _0x56fd69){const _0x490903=DataManager[_0x24f883(0xf0)](_0x107f85);if(!_0x490903)continue;if(_0x1680f7[_0x24f883(0x321)](_0x490903))return!![];}return![];}}}if(_0x17aa91['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x58a797=JSON[_0x24f883(0xf8)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3372a7 of _0x58a797){if('udcpB'!==_0x24f883(0x102))return _0x3c2e02[_0x24f883(0x33a)]['Sprite_Gauge_currentValue'][_0x24f883(0x3bf)](this);else{if(!_0x1680f7[_0x24f883(0x321)](_0x3372a7))return!![];}}return![];}else{if(_0x17aa91[_0x24f883(0x34b)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x24f883(0x285)==='ICWQI'){const _0x19e663=RegExp['$1'][_0x24f883(0x3c1)](',');for(const _0x55fbda of _0x19e663){if(_0x24f883(0x2cb)!==_0x24f883(0x2cb)){const _0x2138ad=_0x10dd27[_0x24f883(0xf8)]('['+_0x34a9df['$1'][_0x24f883(0x34b)](/\d+/g)+']');for(const _0x193865 of _0x2138ad){if(!_0xb5d63f[_0x24f883(0x27b)](_0x193865))return![];}return!![];}else{const _0x2fa13a=DataManager[_0x24f883(0xf0)](_0x55fbda);if(!_0x2fa13a)continue;if(!_0x1680f7[_0x24f883(0x321)](_0x2fa13a))return!![];}}return![];}else return this[_0x24f883(0xed)][_0x15bc86]===_0x54ed5c['SkillsStatesCore'][_0x24f883(0x10e)][_0x24f883(0xb4)][_0x24f883(0x1ad)];}}if(_0x17aa91[_0x24f883(0x34b)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x501398=JSON[_0x24f883(0xf8)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2f3d65 of _0x501398){if(!_0x1680f7['hasSkill'](_0x2f3d65))return!![];}return![];}else{if(_0x17aa91[_0x24f883(0x34b)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x24f883(0x20b)==='bhorp'){const _0x16dc07=RegExp['$1'][_0x24f883(0x3c1)](',');for(const _0x2bd896 of _0x16dc07){const _0x229063=DataManager['getSkillIdWithName'](_0x2bd896);if(!_0x229063)continue;if(!_0x1680f7[_0x24f883(0x321)](_0x229063))return!![];}return![];}else{_0x112ac9['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x33588e=_0x22d590[_0x24f883(0x2be)](_0x23ef5e(_0x3c80df['$1'])['toUpperCase']()),_0x12f752=_0x2f3f2c(_0x481829['$2']);_0x33588e>=0x0&&(_0x19748b[_0x24f883(0x326)](_0x33588e,_0x12f752),this[_0x24f883(0x3ed)](_0x568753));}}}if(_0x17aa91[_0x24f883(0x34b)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x54329c=JSON[_0x24f883(0xf8)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x36f63b of _0x54329c){if(_0x1680f7[_0x24f883(0x321)](_0x36f63b))return![];}return!![];}else{if(_0x17aa91[_0x24f883(0x34b)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x81a640=RegExp['$1'][_0x24f883(0x3c1)](',');for(const _0x328013 of _0x81a640){if(_0x24f883(0xcf)!==_0x24f883(0xcf))this[_0x24f883(0x3de)](_0x4b4347,_0x1d3e2a),_0x26d4ff=_0x17e544[_0x24f883(0x203)](),_0x530ba4[_0x24f883(0x33a)][_0x24f883(0x24d)][_0x24f883(0x3bf)](this,_0x2f2185,_0x4c589f);else{const _0x43e159=DataManager[_0x24f883(0xf0)](_0x328013);if(!_0x43e159)continue;if(_0x1680f7[_0x24f883(0x321)](_0x43e159))return![];}}return!![];}}return!![];},Window_SkillList[_0x34766e(0x31d)][_0x34766e(0x2c4)]=function(_0x27c3ea){const _0x31c140=_0x34766e,_0xa8937c=_0x27c3ea[_0x31c140(0x27c)],_0x2b14ce=VisuMZ['SkillsStatesCore'][_0x31c140(0x2b9)];return _0x2b14ce[_0x27c3ea['id']]?_0x2b14ce[_0x27c3ea['id']][_0x31c140(0x3bf)](this,_0x27c3ea):!![];},VisuMZ[_0x34766e(0x33a)][_0x34766e(0x33b)]=Window_SkillList[_0x34766e(0x31d)][_0x34766e(0x232)],Window_SkillList[_0x34766e(0x31d)][_0x34766e(0x232)]=function(_0x7f7412){const _0x272749=_0x34766e,_0x18bd92=this['itemAt'](_0x7f7412),_0x1e898d=_0x18bd92?_0x18bd92[_0x272749(0x205)]:'';if(_0x18bd92)this[_0x272749(0x364)](_0x18bd92);VisuMZ['SkillsStatesCore'][_0x272749(0x33b)]['call'](this,_0x7f7412);if(_0x18bd92)_0x18bd92[_0x272749(0x205)]=_0x1e898d;},Window_SkillList['prototype'][_0x34766e(0x364)]=function(_0x1bfdf5){const _0x1639b8=_0x34766e;if(_0x1bfdf5&&_0x1bfdf5['note'][_0x1639b8(0x34b)](/<LIST NAME:[ ](.*)>/i)){if(_0x1639b8(0x37f)!==_0x1639b8(0x37f))return _0x1276eb[_0x1639b8(0x33a)][_0x1639b8(0x10e)][_0x1639b8(0x150)][_0x1639b8(0x1e2)][_0x1639b8(0x3bf)](this,_0x4f178e);else{_0x1bfdf5[_0x1639b8(0x205)]=String(RegExp['$1'])[_0x1639b8(0x1c5)]();for(;;){if(_0x1639b8(0x34a)==='qebml'){for(_0x530b5d of _0x2a27b7['SkillsStatesCore'][_0x1639b8(0x10e)][_0x1639b8(0xe9)]){if(_0xacf22c[_0x1639b8(0x31b)][_0x1639b8(0x3ea)]()==='MP'){let _0x1a0991=_0x56c44e[_0x1639b8(0x251)][_0x1639b8(0x3bf)](this,_0x86a59d);return _0x1a0991=this['adjustSkillCost'](_0xad322e,_0x1a0991,_0x16b37b),_0x1a0991;}}return _0x45b699['SkillsStatesCore']['Game_BattlerBase_skillMpCost'][_0x1639b8(0x3bf)](this,_0x2eddc9);}else{if(_0x1bfdf5['name'][_0x1639b8(0x34b)](/\\V\[(\d+)\]/gi)){if(_0x1639b8(0x399)===_0x1639b8(0x399))_0x1bfdf5[_0x1639b8(0x205)]=_0x1bfdf5[_0x1639b8(0x205)][_0x1639b8(0x19d)](/\\V\[(\d+)\]/gi,(_0x3e57ee,_0x51e589)=>$gameVariables[_0x1639b8(0x194)](parseInt(_0x51e589)));else{let _0x4739e0=0x0,_0x246dad=0x0;if(_0x29ca3d[_0x1639b8(0x34b)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x4739e0=_0x51cc7a(_0x5a2ffc['$1']),_0x246dad=_0x2b702b(_0x4ff83e['$2']);else _0x58bfc5[_0x1639b8(0x34b)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x4739e0=_0x413cdd[_0x1639b8(0x1c2)](_0x18f360['$1']),_0x246dad=_0xa141d8(_0x30b3a3['$2']));_0x3f8259['addStateTurns'](_0x4739e0,_0x246dad),this[_0x1639b8(0x3ed)](_0x5ce7f2);}}else break;}}}}},Window_SkillList[_0x34766e(0x31d)][_0x34766e(0x3ee)]=function(_0x6d7e4f,_0x2ac8cc,_0x1682f0,_0x45d202){const _0x3febb7=_0x34766e;Window_Base[_0x3febb7(0x31d)]['drawSkillCost'][_0x3febb7(0x3bf)](this,this['_actor'],_0x6d7e4f,_0x2ac8cc,_0x1682f0,_0x45d202);},Window_SkillList[_0x34766e(0x31d)][_0x34766e(0x3a8)]=function(_0x4b6b62){const _0x2204e1=_0x34766e;this['_statusWindow']=_0x4b6b62,this[_0x2204e1(0x3c7)]();},VisuMZ['SkillsStatesCore']['Window_SkillList_updateHelp']=Window_SkillList[_0x34766e(0x31d)]['updateHelp'],Window_SkillList[_0x34766e(0x31d)][_0x34766e(0x158)]=function(){const _0x2a6008=_0x34766e;VisuMZ[_0x2a6008(0x33a)]['Window_SkillList_updateHelp'][_0x2a6008(0x3bf)](this);if(this[_0x2a6008(0x38f)]&&this[_0x2a6008(0x38f)][_0x2a6008(0x11b)]===Window_ShopStatus){if(_0x2a6008(0x323)===_0x2a6008(0x323))this[_0x2a6008(0x38f)]['setItem'](this[_0x2a6008(0x129)]());else return'<actor-%1>'[_0x2a6008(0xc3)](_0x312a3e['actorId']());}};