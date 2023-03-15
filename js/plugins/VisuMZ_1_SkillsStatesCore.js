//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.38;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.38] [SkillsStatesCore]
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
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
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

const _0x431870=_0x17c0;function _0x17c0(_0x31bd81,_0x3872b0){const _0x2065ab=_0x2065();return _0x17c0=function(_0x17c06e,_0x5888d3){_0x17c06e=_0x17c06e-0x186;let _0xc7631e=_0x2065ab[_0x17c06e];return _0xc7631e;},_0x17c0(_0x31bd81,_0x3872b0);}(function(_0x1d0e73,_0x1e80cc){const _0x310bcc=_0x17c0,_0xf2c4af=_0x1d0e73();while(!![]){try{const _0x45fa88=parseInt(_0x310bcc(0x216))/0x1*(-parseInt(_0x310bcc(0x20c))/0x2)+-parseInt(_0x310bcc(0x32b))/0x3*(-parseInt(_0x310bcc(0x21b))/0x4)+parseInt(_0x310bcc(0x3c4))/0x5+-parseInt(_0x310bcc(0x1fa))/0x6*(-parseInt(_0x310bcc(0x3c3))/0x7)+-parseInt(_0x310bcc(0x226))/0x8*(-parseInt(_0x310bcc(0x25a))/0x9)+parseInt(_0x310bcc(0x1e8))/0xa*(parseInt(_0x310bcc(0x223))/0xb)+parseInt(_0x310bcc(0x2aa))/0xc*(-parseInt(_0x310bcc(0x24d))/0xd);if(_0x45fa88===_0x1e80cc)break;else _0xf2c4af['push'](_0xf2c4af['shift']());}catch(_0x152425){_0xf2c4af['push'](_0xf2c4af['shift']());}}}(_0x2065,0x1cbc4));var label=_0x431870(0x371),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x5e03b2){const _0x25b403=_0x431870;return _0x5e03b2[_0x25b403(0x2b9)]&&_0x5e03b2[_0x25b403(0x358)]['includes']('['+label+']');})[0x0];function _0x2065(){const _0x5a00da=['meetsSkillConditions','Game_BattlerBase_meetsSkillConditions','alterSkillName','bitmap','isSkillUsableForAutoBattle','applyItemUserEffect','mainFontSize','_battler','STRUCT','_buffs','ConvertParams','<actor-%1>','reset','isPlaytest','_stateOrigin','match','normalColor','_animationIndex','prototype','makeCommandList','length','ColorDebuff','getStateIdWithName','gainHp','onAddDebuff','Window_SkillStatus_refresh','Game_BattlerBase_increaseBuff','Window_SkillList_drawItem','isPassiveStateStackable','_shopStatusWindow','labelFontSize','Game_BattlerBase_initMembers','CmdWidth','createTurnDisplaySprite','Sprite_StateIcon_updateFrame','ARRAYNUM','meetsPassiveStateConditionJS','setStateTurns','AGI','mpDamage','paySkillCost','mpCost','mainCommandWidth','getColor','Costs','addPassiveStatesByNotetag','Scene_Skill_statusWindowRect','commandName','getStateOriginByKey','meetsPassiveStateGlobalConditionJS','Scene_Skill_helpWindowRect','endAction','resetTextColor','DataOffsetX','testSkillStatesCoreNotetags','_stored_buffColor','_checkingPassiveStates','Game_BattlerBase_resetStateCounts','members','gaugeColor1','rgba(0,\x200,\x200,\x201)','_actor','stateHpSlipHealJS','fontBold','setupSkillsStatesCore','Sprite_Gauge_gaugeRate','onAddStateCustomJS','Sprite_Gauge_setup','hasStateCategory','exit','81669SxfEaY','enemyId','SkillMenuStatusRect','changeTextColor','innerHeight','placeGauge','debuffColor','isStateRemoved','index','canPaySkillCost','resetFontSettings','statusWidth','success','lineHeight','CoreEngine','gaugeBackColor','_skillTypeWindow','States','currentMaxValueSkillsStatesCore','getCurrentStateActiveUser','makeCommandName','isBuffOrDebuffAffected','setItem','onEraseStateCustomJS','drawParamText','text','makeResistedStateCategories','_tempActor','_stateDisplay','Game_BattlerBase_buffIconIndex','return\x200','Window_SkillList_maxCols','PassiveStates','onExpireBuff','ListWindowCols','NEGATIVE','Game_BattlerBase_recoverAll','setPassiveStateSlipDamageJS','round','addBuff','TurnOffsetX','clearStates','buff','stateMpSlipDamageJS','createSkillCostText','description','numberFontFace','PresetLabelGaugeColor','user','placeExactGauge','outlineColor','stateTpSlipDamageJS','regenerateAllSkillsStatesCore','Game_BattlerBase_skillTpCost','innerWidth','filter','%1\x20%2\x20%3','DisplayedParams','iconIndex','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Window_StatusBase_placeGauge','active','loadBitmap','GaugeDrawJS','drawIcon','ShowShopStatus','_stypeId','_lastStatesActionEndFrameCount','drawItem','getSkillIdWithName','SkillsStatesCore','isActor','split','getStateData','isSceneBattle','testApply','createAllSkillCostText','changeOutlineColor','onAddStateGlobalJS','Game_Unit_isAllDead','resetStateCounts','Game_Variables_onChange','isSkillHidden','updateStatesActionEnd','_checkingTraitsSetSkillsStatesCore','Parse_Notetags_State_ApplyRemoveLeaveJS','isMaxBuffAffected','addChild','SkillConditionJS','windowPadding','_stypeIDs','buttonAssistText1','Actor','onEraseBuffJS','getColorDataFromPluginParameters','clearStatesWithStateRetain','refresh','gainSilentTp','_subject','ARRAYSTR','_classIDs','CmdStyle','_stateData','Parse_Notetags_Skill_Cost','sort','addDebuffTurns','removeState','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','isStateExpired','Scene_Skill_createItemWindow','inBattle','canClearState','Game_Actor_forgetSkill','statePassiveConditionJS','process_VisuMZ_SkillsStatesCore_Notetags','drawText','updateCommandNameWindow','restriction','drawExtendedParameter','Sprite_Gauge_redraw','push','RefreshCacheVar','untitled','TurnOffsetY','actorId','_tempBattler','removeStatesByCategoryAll','checkCacheKey','isStateResist','Parse_Notetags_State_PassiveJS','_skillIDs','isSkillTypeMatchForUse','Game_BattlerBase_overwriteBuffTurns','Game_BattlerBase_die','drawActorStateTurns','clearStateData','enemy','opacity','_stateSteps','isStateAddable','EnableLayout','totalStateCategory','Parse_Notetags_State_SlipEffectJS','add','GaugeMaxJS','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','item','isUseSkillsStatesCoreUpdatedLayout','GroupDigits','helpWindowRect','toLowerCase','replace','14NiiSHi','1163600AMxgXk','redraw','TextJS','currentMaxValue','parse','allBattleMembers','constructor','onAddStateMakeCustomSlipValues','retrieveStateColor','Parse_Notetags_Skill_JS','shift','parameters','MatchLabelGaugeColor','iconHeight','callUpdateHelp','itemWindowRectSkillsStatesCore','ignore','allowCreateShopStatusWindow','maxCols','process_VisuMZ_SkillsStatesCore_State_Notetags','labelOutlineWidth','VisuMZ_0_CoreEngine','removeBuffsAuto','onAddBuff','ARRAYEVAL','_stateMaxTurns','ReapplyRules','ParseClassIDs','isUseModernControls','isAllDead','clearStateOrigin','_costSettings','FUNC','BattleManager_endAction','adjustItemWidthByShopStatus','value','LabelOutlineSolid','isBuffExpired','MAXMP','CheckVisibleSwitchNotetags','meetsSkillConditionsEnableJS','concat','onEraseStateJS','statusWindowRectSkillsStatesCore','MDF','icon','Buffs','passiveStateObjects','Game_BattlerBase_states','note','Game_BattlerBase_clearStates','drawSkillCost','Gauge','VisuMZ_1_ElementStatusCore','<troop-%1>','toUpperCase','SkillSceneAdjustSkillList','_skills','priority','onDatabaseLoaded','textColor','CheckIncompatibleStates','_currentTroopUniqueID','maxSlipDamage','setDebuffTurns','setStatusWindow','ValueOutlineSolid','addPassiveStatesByPluginParameters','iconText','meetsPassiveStateConditions','CalcJS','getStypeIdWithName','stypeId','_statusWindow','process_VisuMZ_SkillsStatesCore_Skill_Notetags','helpAreaHeight','Game_Battler_addBuff','skillVisibleJS','labelOutlineColor','helpWindowRectSkillsStatesCore','statesByCategory','addWindow','onRegenerateCustomStateDamageOverTime','POSITIVE','onAddDebuffJS','updateFrame','Sprite_Gauge_currentMaxValue','Sprite_StateIcon_loadBitmap','ARRAYSTRUCT','Game_BattlerBase_eraseBuff','recalculateSlipDamageJS','indexOf','updateStateTurns','getSkillTypes','ValueFontMainType','states','buffLength','state','aliveMembers','slipHp','frameCount','_stateTurns','checkShowHideJS','helpAreaTop','onExpireStateGlobalJS','Game_BattlerBase_skillMpCost','learnSkill','buffTurns','drawActorStateData','Window_SkillType_initialize','iconWidth','uiInputPosition','LabelFontMainType','TurnFontSize','recover\x20all','Game_Battler_isStateAddable','currentClass','Game_Battler_regenerateAll','_scene','onExpireStateCustomJS','checkShowHideNotetags','gradientFillRect','checkSkillConditionsNotetags','Game_BattlerBase_eraseState','commandStyleCheck','getCurrentStateOriginKey','ValueOutlineWidth','ParseSkillNotetags','Game_Action_applyItemUserEffect','redrawSkillsStatesCore','getStateReapplyRulings','useDigitGrouping','Game_BattlerBase_isStateResist','meetsPassiveStateConditionSwitches','Name','itemAt','Game_Unit_deadMembers','meetsStateCondition','updateTurnDisplaySprite','magicSkills','statusWindowRect','drawActorBuffTurns','trim','stateData','stateMpSlipHealJS','number','PassiveConditionJS','checkSkillTypeMatch','itemLineRect','deadMembers','fontSize','skillMpCost','version','addCommand','980HYUBnw','_states','drawTextEx','_phase','initMembers','MAT','multiclasses','addPassiveStatesTraitSets','traitObjects','mainAreaHeight','Game_Battler_addState','convertTargetToStateOriginKey','currentValue','onExpireBuffJS','Window_StatusBase_drawActorIcons','HiddenSkillTypes','onAddState','Settings','310728UgKzGm','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','createItemWindow','VisuMZ_1_MainMenuCore','shopStatusWidth','onEraseDebuff','decreaseBuff','isSkillCostShown','stateHpSlipDamageJS','isDebuffAffected','isLearnedSkill','onEraseBuff','overwriteBuffTurns','onEraseDebuffGlobalJS','Game_BattlerBase_traitsSet','Parse_Notetags_State_Category','floor','stateColor','16ejvhUB','_result','hasSkill','getStateRetainType','call','map','clamp','_buffTurns','ShowTurns','addDebuff','26927KuCtIh','isStateCategoryResisted','onAddStateJS','_turnDisplaySprite','right','8wsjKul','JSON','convertPassiveStates','DataOffsetY','Game_BattlerBase_decreaseBuff','meetsSkillConditionsGlobalJS','gaugeColor2','name','20108EQoazb','fontFace','getStateDisplay','114408HUHVmo','applyStateTurnManipulationEffects','RefreshCacheSwitch','VisuMZ_1_ItemsEquipsCore','stateId','_commandNameWindow','commandNameWindowDrawBackground','drawExtendedSkillsStatesCoreStatus','LUK','includes','slipMp','valueOutlineColor','currentValueSkillsStatesCore','gaugeLineHeight','setStateOrigin','onEraseStateGlobalJS','_itemWindow','drawItemStyleIcon','labelColor','height','_passiveStateResults','stateMaximumTurns','removeStatesAuto','center','autoRemovalTiming','usableSkills','_colorCache','ActionEndUpdate','uiHelpPosition','passiveStates','skillTypes','setStateData','Scene_Skill_skillTypeWindowRect','Game_Troop_setup','mainAreaTop','recoverAll','initialize','makeAdditionalSkillCostText','Game_Switches_onChange','862459WqDtBS','keys','ShowData','convertGaugeTypeSkillsStatesCore','itemTextAlign','canUse','valueFontSize','removeBuff','applySkillsStatesCoreEffects','Param','_stored_state-%1-color','maxItems','stateAddJS','18djJKbe','eraseBuff','remove','Sprite_Gauge_currentValue','textSizeEx','heal','isAlive','log','isRightInputMode','Scene_Skill_itemWindowRect','addState','MultiplierJS','makeCurrentTroopUniqueID','ATK','onChange','onExpireBuffGlobalJS','die','CheckVisibleSkillNotetags','applyBuffTurnManipulationEffects','meetsPassiveStateConditionClasses','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','initMembersSkillsStatesCore','isStateAffected','categories','addPassiveStatesFromOtherPlugins','_endingBattle','clearStateDisplay','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','currentDisplayedValue','isStateCategoryAffected','ALL','createCommandNameWindow','slipTp','DataFontSize','removeOtherStatesOfSameCategory','itemWindowRect','format','Enemy','onExpireDebuffJS','drawFullGauge','isBuffPrevented','Game_Battler_addDebuff','isGroupDefeatStateAffected','skillCostSeparator','_cache','getClassIdWithName','updateHelp','width','buffIconIndex','setStateRetainType','contents','test','Scene_Boot_onDatabaseLoaded','getCurrentTroopUniqueID','\x5cI[%1]%2','skillTpCost','none','isPartyAllAffectedByGroupDefeatStates','onExpireDebuffGlobalJS','MaxTurns','stateTurns','onEraseBuffGlobalJS','drawActorIcons','commandNameWindowCenter','gaugeRate','removeStatesByCategory','rgba(0,\x200,\x200,\x200)','NUM','_stateRetainType','groupDefeat','skill','hasState','Window_SkillList_updateHelp','regenerateAll','boxWidth','makeSuccess','stateEraseJS','greater','shopStatusWindowRectSkillsStatesCore','setActor','48dvlMhR','includesSkillsStatesCore','isBuffAffected','_stateIDs','Skills','setBuffTurns','ColorBuff','skillTypeWindowRect','Game_Action_testApply','Game_Actor_learnSkill','onExpireStateJS','DEF','StackBuffMax','stateTpSlipHealJS','calcWindowHeight','status','_hidden','_checkingVisuMzPassiveStateObjects','onRemoveState','clearStateRetainType','createShopStatusWindow','addBuffTurns','isMaxDebuffAffected','LayoutStyle','<enemy-%1>','ColorPositive','equips','skillTypeWindowRectSkillsStatesCore','ParseStateNotetags','checkSkillConditionsSwitchNotetags','paramBuffRate','onExpireDebuff','Game_BattlerBase_refresh','IconStypeNorm','Global','max','applyDebuffTurnManipulationEffects','valueOutlineWidth','stateExpireJS','commandStyle','_categoryWindow','Window_SkillList_includes','updateVisibility','skillEnableJS','actions','onEraseDebuffJS','damage','MAXHP','drawActorIconsAllTurnCounters','adjustSkillCost','Game_Actor_skillTypes','mainFontFace','eraseState','updatedLayoutStyle','uiMenuStyle','totalStateCategoryAffected','applyStateCategoryRemovalEffects','anchor','forgetSkill'];_0x2065=function(){return _0x5a00da;};return _0x2065();}VisuMZ[label][_0x431870(0x1f9)]=VisuMZ[label][_0x431870(0x1f9)]||{},VisuMZ[_0x431870(0x2ef)]=function(_0x329a8e,_0x4a5442){const _0x4a0c8b=_0x431870;for(const _0x582e2a in _0x4a5442){if(_0x582e2a['match'](/(.*):(.*)/i)){const _0x35a729=String(RegExp['$1']),_0x224080=String(RegExp['$2'])[_0x4a0c8b(0x3fb)]()[_0x4a0c8b(0x1dc)]();let _0x4633fd,_0x5b2f6b,_0x1fb5aa;switch(_0x224080){case _0x4a0c8b(0x29d):_0x4633fd=_0x4a5442[_0x582e2a]!==''?Number(_0x4a5442[_0x582e2a]):0x0;break;case _0x4a0c8b(0x308):_0x5b2f6b=_0x4a5442[_0x582e2a]!==''?JSON[_0x4a0c8b(0x3c8)](_0x4a5442[_0x582e2a]):[],_0x4633fd=_0x5b2f6b[_0x4a0c8b(0x211)](_0x4e8e68=>Number(_0x4e8e68));break;case'EVAL':_0x4633fd=_0x4a5442[_0x582e2a]!==''?eval(_0x4a5442[_0x582e2a]):null;break;case _0x4a0c8b(0x3dc):_0x5b2f6b=_0x4a5442[_0x582e2a]!==''?JSON[_0x4a0c8b(0x3c8)](_0x4a5442[_0x582e2a]):[],_0x4633fd=_0x5b2f6b[_0x4a0c8b(0x211)](_0x241baa=>eval(_0x241baa));break;case _0x4a0c8b(0x21c):_0x4633fd=_0x4a5442[_0x582e2a]!==''?JSON[_0x4a0c8b(0x3c8)](_0x4a5442[_0x582e2a]):'';break;case'ARRAYJSON':_0x5b2f6b=_0x4a5442[_0x582e2a]!==''?JSON['parse'](_0x4a5442[_0x582e2a]):[],_0x4633fd=_0x5b2f6b['map'](_0x6ed20c=>JSON[_0x4a0c8b(0x3c8)](_0x6ed20c));break;case _0x4a0c8b(0x3e4):_0x4633fd=_0x4a5442[_0x582e2a]!==''?new Function(JSON[_0x4a0c8b(0x3c8)](_0x4a5442[_0x582e2a])):new Function(_0x4a0c8b(0x349));break;case'ARRAYFUNC':_0x5b2f6b=_0x4a5442[_0x582e2a]!==''?JSON[_0x4a0c8b(0x3c8)](_0x4a5442[_0x582e2a]):[],_0x4633fd=_0x5b2f6b[_0x4a0c8b(0x211)](_0x899f49=>new Function(JSON[_0x4a0c8b(0x3c8)](_0x899f49)));break;case'STR':_0x4633fd=_0x4a5442[_0x582e2a]!==''?String(_0x4a5442[_0x582e2a]):'';break;case _0x4a0c8b(0x38e):_0x5b2f6b=_0x4a5442[_0x582e2a]!==''?JSON['parse'](_0x4a5442[_0x582e2a]):[],_0x4633fd=_0x5b2f6b[_0x4a0c8b(0x211)](_0x57d61e=>String(_0x57d61e));break;case _0x4a0c8b(0x2ed):_0x1fb5aa=_0x4a5442[_0x582e2a]!==''?JSON['parse'](_0x4a5442[_0x582e2a]):{},_0x329a8e[_0x35a729]={},VisuMZ[_0x4a0c8b(0x2ef)](_0x329a8e[_0x35a729],_0x1fb5aa);continue;case _0x4a0c8b(0x1a6):_0x5b2f6b=_0x4a5442[_0x582e2a]!==''?JSON[_0x4a0c8b(0x3c8)](_0x4a5442[_0x582e2a]):[],_0x4633fd=_0x5b2f6b[_0x4a0c8b(0x211)](_0x418142=>VisuMZ[_0x4a0c8b(0x2ef)]({},JSON['parse'](_0x418142)));break;default:continue;}_0x329a8e[_0x35a729]=_0x4633fd;}}return _0x329a8e;},(_0x5d3155=>{const _0x37cffd=_0x431870,_0x4b1dde=_0x5d3155[_0x37cffd(0x222)];for(const _0x1941ca of dependencies){if(!Imported[_0x1941ca]){alert(_0x37cffd(0x366)[_0x37cffd(0x27e)](_0x4b1dde,_0x1941ca)),SceneManager['exit']();break;}}const _0x353524=_0x5d3155[_0x37cffd(0x358)];if(_0x353524[_0x37cffd(0x2f4)](/\[Version[ ](.*?)\]/i)){const _0x57090c=Number(RegExp['$1']);_0x57090c!==VisuMZ[label][_0x37cffd(0x1e6)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x37cffd(0x27e)](_0x4b1dde,_0x57090c)),SceneManager[_0x37cffd(0x32a)]());}if(_0x353524[_0x37cffd(0x2f4)](/\[Tier[ ](\d+)\]/i)){const _0x5f1192=Number(RegExp['$1']);_0x5f1192<tier?(alert(_0x37cffd(0x26e)[_0x37cffd(0x27e)](_0x4b1dde,_0x5f1192,tier)),SceneManager[_0x37cffd(0x32a)]()):tier=Math['max'](_0x5f1192,tier);}VisuMZ[_0x37cffd(0x2ef)](VisuMZ[label][_0x37cffd(0x1f9)],_0x5d3155[_0x37cffd(0x3cf)]);})(pluginData),VisuMZ[_0x431870(0x371)][_0x431870(0x28e)]=Scene_Boot['prototype'][_0x431870(0x189)],Scene_Boot[_0x431870(0x2f7)]['onDatabaseLoaded']=function(){const _0x30a99a=_0x431870;VisuMZ[_0x30a99a(0x371)][_0x30a99a(0x28e)][_0x30a99a(0x210)](this),this['process_VisuMZ_SkillsStatesCore_Notetags'](),VisuMZ[_0x30a99a(0x371)][_0x30a99a(0x18b)]();},Scene_Boot[_0x431870(0x2f7)][_0x431870(0x39d)]=function(){const _0x50fa99=_0x431870;if(VisuMZ['ParseAllNotetags'])return;this['process_VisuMZ_SkillsStatesCore_Skill_Notetags'](),this[_0x50fa99(0x3d7)]();},Scene_Boot[_0x431870(0x2f7)][_0x431870(0x198)]=function(){const _0xe25d36=_0x431870;for(const _0xd37655 of $dataSkills){if(!_0xd37655)continue;VisuMZ[_0xe25d36(0x371)][_0xe25d36(0x392)](_0xd37655),VisuMZ['SkillsStatesCore'][_0xe25d36(0x3cd)](_0xd37655);}},Scene_Boot['prototype']['process_VisuMZ_SkillsStatesCore_State_Notetags']=function(){const _0x1aaf48=_0x431870;for(const _0x4f85e2 of $dataStates){if(!_0x4f85e2)continue;VisuMZ[_0x1aaf48(0x371)][_0x1aaf48(0x209)](_0x4f85e2),VisuMZ[_0x1aaf48(0x371)][_0x1aaf48(0x3ac)](_0x4f85e2),VisuMZ['SkillsStatesCore']['Parse_Notetags_State_SlipEffectJS'](_0x4f85e2),VisuMZ['SkillsStatesCore'][_0x1aaf48(0x380)](_0x4f85e2);}},VisuMZ[_0x431870(0x371)][_0x431870(0x1cd)]=VisuMZ[_0x431870(0x1cd)],VisuMZ[_0x431870(0x1cd)]=function(_0x5be4c4){const _0x1056b3=_0x431870;VisuMZ[_0x1056b3(0x371)][_0x1056b3(0x1cd)][_0x1056b3(0x210)](this,_0x5be4c4),VisuMZ[_0x1056b3(0x371)][_0x1056b3(0x392)](_0x5be4c4),VisuMZ[_0x1056b3(0x371)][_0x1056b3(0x3cd)](_0x5be4c4);},VisuMZ[_0x431870(0x371)][_0x431870(0x2c6)]=VisuMZ[_0x431870(0x2c6)],VisuMZ[_0x431870(0x2c6)]=function(_0xf62fad){const _0x26b1db=_0x431870;VisuMZ[_0x26b1db(0x371)]['ParseStateNotetags'][_0x26b1db(0x210)](this,_0xf62fad),VisuMZ[_0x26b1db(0x371)][_0x26b1db(0x209)](_0xf62fad),VisuMZ[_0x26b1db(0x371)][_0x26b1db(0x3ac)](_0xf62fad),VisuMZ[_0x26b1db(0x371)]['Parse_Notetags_State_SlipEffectJS'](_0xf62fad),VisuMZ['SkillsStatesCore'][_0x26b1db(0x380)](_0xf62fad);},VisuMZ['SkillsStatesCore'][_0x431870(0x392)]=function(_0x4f51fe){const _0x32066d=_0x431870,_0x38c7cd=_0x4f51fe[_0x32066d(0x3f5)];_0x38c7cd[_0x32066d(0x2f4)](/<MP COST:[ ](\d+)>/i)&&(_0x4f51fe[_0x32066d(0x30e)]=Number(RegExp['$1'])),_0x38c7cd['match'](/<TP COST:[ ](\d+)>/i)&&(_0x4f51fe['tpCost']=Number(RegExp['$1']));},VisuMZ[_0x431870(0x371)][_0x431870(0x2d5)]={},VisuMZ['SkillsStatesCore'][_0x431870(0x19b)]={},VisuMZ[_0x431870(0x371)][_0x431870(0x3cd)]=function(_0xba0fe4){const _0xcb0aa4=_0x431870,_0x202707=_0xba0fe4[_0xcb0aa4(0x3f5)];if(_0x202707['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x51d88b=String(RegExp['$1']),_0x1606e9=_0xcb0aa4(0x275)[_0xcb0aa4(0x27e)](_0x51d88b);VisuMZ[_0xcb0aa4(0x371)]['skillEnableJS'][_0xba0fe4['id']]=new Function('skill',_0x1606e9);}if(_0x202707[_0xcb0aa4(0x2f4)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x3d40e2=String(RegExp['$1']),_0x4e53c9='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0xcb0aa4(0x27e)](_0x3d40e2);VisuMZ[_0xcb0aa4(0x371)][_0xcb0aa4(0x19b)][_0xba0fe4['id']]=new Function(_0xcb0aa4(0x2a0),_0x4e53c9);}},VisuMZ[_0x431870(0x371)][_0x431870(0x209)]=function(_0x3dac60){const _0x3fb8ee=_0x431870;_0x3dac60[_0x3fb8ee(0x271)]=[_0x3fb8ee(0x278),'ANY'];const _0x16cf41=_0x3dac60[_0x3fb8ee(0x3f5)],_0x191416=_0x16cf41[_0x3fb8ee(0x2f4)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x191416)for(const _0x361d96 of _0x191416){_0x361d96['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x434e69=String(RegExp['$1'])[_0x3fb8ee(0x3fb)]()[_0x3fb8ee(0x1dc)]()[_0x3fb8ee(0x373)](',');for(const _0x369c0d of _0x434e69){_0x3dac60[_0x3fb8ee(0x271)][_0x3fb8ee(0x3a3)](_0x369c0d[_0x3fb8ee(0x1dc)]());}}if(_0x16cf41['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x54b3c9=RegExp['$1'][_0x3fb8ee(0x373)](/[\r\n]+/);for(const _0x112599 of _0x54b3c9){_0x3dac60[_0x3fb8ee(0x271)][_0x3fb8ee(0x3a3)](_0x112599['toUpperCase']()[_0x3fb8ee(0x1dc)]());}}_0x16cf41[_0x3fb8ee(0x2f4)](/<POSITIVE STATE>/i)&&_0x3dac60[_0x3fb8ee(0x271)]['push'](_0x3fb8ee(0x1a1)),_0x16cf41['match'](/<NEGATIVE STATE>/i)&&_0x3dac60[_0x3fb8ee(0x271)][_0x3fb8ee(0x3a3)](_0x3fb8ee(0x34e));},VisuMZ['SkillsStatesCore'][_0x431870(0x39c)]={},VisuMZ[_0x431870(0x371)][_0x431870(0x3ac)]=function(_0x4e1524){const _0xc78edf=_0x431870,_0x5c7cfb=_0x4e1524[_0xc78edf(0x3f5)];if(_0x5c7cfb[_0xc78edf(0x2f4)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x362c4e=String(RegExp['$1']),_0x2221b5=_0xc78edf(0x1fb)[_0xc78edf(0x27e)](_0x362c4e);VisuMZ[_0xc78edf(0x371)][_0xc78edf(0x39c)][_0x4e1524['id']]=new Function(_0xc78edf(0x1af),_0x2221b5);}},VisuMZ['SkillsStatesCore'][_0x431870(0x202)]={},VisuMZ['SkillsStatesCore'][_0x431870(0x323)]={},VisuMZ[_0x431870(0x371)][_0x431870(0x356)]={},VisuMZ['SkillsStatesCore']['stateMpSlipHealJS']={},VisuMZ['SkillsStatesCore'][_0x431870(0x35e)]={},VisuMZ[_0x431870(0x371)]['stateTpSlipHealJS']={},VisuMZ['SkillsStatesCore'][_0x431870(0x3b9)]=function(_0x34be68){const _0x4c9c3e=_0x431870,_0x1a0b66=_0x34be68[_0x4c9c3e(0x3f5)],_0x3ab29e=_0x4c9c3e(0x3bc);if(_0x1a0b66[_0x4c9c3e(0x2f4)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x3b22ae=String(RegExp['$1']),_0x45a18d=_0x3ab29e['format'](_0x3b22ae,_0x4c9c3e(0x2d8),-0x1,_0x4c9c3e(0x1b1));VisuMZ['SkillsStatesCore'][_0x4c9c3e(0x202)][_0x34be68['id']]=new Function(_0x4c9c3e(0x22a),_0x45a18d);}else{if(_0x1a0b66[_0x4c9c3e(0x2f4)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x1f1496=String(RegExp['$1']),_0x520716=_0x3ab29e[_0x4c9c3e(0x27e)](_0x1f1496,_0x4c9c3e(0x25f),0x1,_0x4c9c3e(0x1b1));VisuMZ[_0x4c9c3e(0x371)][_0x4c9c3e(0x323)][_0x34be68['id']]=new Function('stateId',_0x520716);}}if(_0x1a0b66[_0x4c9c3e(0x2f4)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x477706=String(RegExp['$1']),_0x5175aa=_0x3ab29e[_0x4c9c3e(0x27e)](_0x477706,_0x4c9c3e(0x2d8),-0x1,_0x4c9c3e(0x230));VisuMZ[_0x4c9c3e(0x371)][_0x4c9c3e(0x356)][_0x34be68['id']]=new Function(_0x4c9c3e(0x22a),_0x5175aa);}else{if(_0x1a0b66[_0x4c9c3e(0x2f4)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x1852fb=String(RegExp['$1']),_0x1b2b29=_0x3ab29e[_0x4c9c3e(0x27e)](_0x1852fb,_0x4c9c3e(0x25f),0x1,_0x4c9c3e(0x230));VisuMZ[_0x4c9c3e(0x371)][_0x4c9c3e(0x1de)][_0x34be68['id']]=new Function(_0x4c9c3e(0x22a),_0x1b2b29);}}if(_0x1a0b66[_0x4c9c3e(0x2f4)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x39d7d4=String(RegExp['$1']),_0x2b6422=_0x3ab29e['format'](_0x39d7d4,'damage',-0x1,_0x4c9c3e(0x27a));VisuMZ[_0x4c9c3e(0x371)][_0x4c9c3e(0x35e)][_0x34be68['id']]=new Function('stateId',_0x2b6422);}else{if(_0x1a0b66['match'](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x57c593=String(RegExp['$1']),_0x35f2ae=_0x3ab29e['format'](_0x57c593,_0x4c9c3e(0x25f),0x1,_0x4c9c3e(0x27a));VisuMZ['SkillsStatesCore']['stateTpSlipHealJS'][_0x34be68['id']]=new Function('stateId',_0x35f2ae);}}},VisuMZ[_0x431870(0x371)][_0x431870(0x259)]={},VisuMZ[_0x431870(0x371)][_0x431870(0x2a6)]={},VisuMZ[_0x431870(0x371)][_0x431870(0x2d0)]={},VisuMZ[_0x431870(0x371)][_0x431870(0x380)]=function(_0x3ab7e9){const _0x4a535c=_0x431870,_0x5c6d98=_0x3ab7e9[_0x4a535c(0x3f5)],_0x5d9678=_0x4a535c(0x396);if(_0x5c6d98['match'](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x9bbe2=String(RegExp['$1']),_0x216968=_0x5d9678[_0x4a535c(0x27e)](_0x9bbe2);VisuMZ[_0x4a535c(0x371)][_0x4a535c(0x259)][_0x3ab7e9['id']]=new Function(_0x4a535c(0x22a),_0x216968);}if(_0x5c6d98[_0x4a535c(0x2f4)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x2a070a=String(RegExp['$1']),_0x8f7c98=_0x5d9678[_0x4a535c(0x27e)](_0x2a070a);VisuMZ[_0x4a535c(0x371)][_0x4a535c(0x2a6)][_0x3ab7e9['id']]=new Function(_0x4a535c(0x22a),_0x8f7c98);}if(_0x5c6d98['match'](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x1e67d2=String(RegExp['$1']),_0x2db9d6=_0x5d9678['format'](_0x1e67d2);VisuMZ[_0x4a535c(0x371)][_0x4a535c(0x2d0)][_0x3ab7e9['id']]=new Function(_0x4a535c(0x22a),_0x2db9d6);}},VisuMZ[_0x431870(0x371)][_0x431870(0x18b)]=function(){const _0x5533d9=_0x431870;if(!VisuMZ['SkillsStatesCore'][_0x5533d9(0x1f9)]['States'][_0x5533d9(0x241)])return;for(const _0xe1b390 of $dataStates){if(!_0xe1b390)continue;_0xe1b390[_0x5533d9(0x3a0)]===0x4&&_0xe1b390[_0x5533d9(0x23e)]===0x1&&(_0xe1b390[_0x5533d9(0x23e)]=0x2);}},DataManager['getClassIdWithName']=function(_0x41fb5c){const _0xa2884d=_0x431870;_0x41fb5c=_0x41fb5c['toUpperCase']()['trim'](),this[_0xa2884d(0x38f)]=this[_0xa2884d(0x38f)]||{};if(this['_classIDs'][_0x41fb5c])return this['_classIDs'][_0x41fb5c];for(const _0x35249a of $dataClasses){if(!_0x35249a)continue;let _0x2f8d7e=_0x35249a[_0xa2884d(0x222)];_0x2f8d7e=_0x2f8d7e['replace'](/\x1I\[(\d+)\]/gi,''),_0x2f8d7e=_0x2f8d7e[_0xa2884d(0x3c2)](/\\I\[(\d+)\]/gi,''),this[_0xa2884d(0x38f)][_0x2f8d7e['toUpperCase']()[_0xa2884d(0x1dc)]()]=_0x35249a['id'];}return this[_0xa2884d(0x38f)][_0x41fb5c]||0x0;},DataManager[_0x431870(0x1ab)]=function(_0x9ef6b2){const _0x27541f=_0x431870;this[_0x27541f(0x385)]=this['_stypeIDs']||{};if(this[_0x27541f(0x385)][_0x9ef6b2['id']])return this['_stypeIDs'][_0x9ef6b2['id']];this[_0x27541f(0x385)][_0x9ef6b2['id']]=[_0x9ef6b2[_0x27541f(0x196)]];if(_0x9ef6b2[_0x27541f(0x3f5)][_0x27541f(0x2f4)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x411f4e=JSON[_0x27541f(0x3c8)]('['+RegExp['$1'][_0x27541f(0x2f4)](/\d+/g)+']');this['_stypeIDs'][_0x9ef6b2['id']]=this[_0x27541f(0x385)][_0x9ef6b2['id']][_0x27541f(0x3ed)](_0x411f4e);}else{if(_0x9ef6b2['note'][_0x27541f(0x2f4)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x2d13ec=RegExp['$1'][_0x27541f(0x373)](',');for(const _0x553a19 of _0x2d13ec){const _0x4656ac=DataManager[_0x27541f(0x195)](_0x553a19);if(_0x4656ac)this[_0x27541f(0x385)][_0x9ef6b2['id']][_0x27541f(0x3a3)](_0x4656ac);}}}return this['_stypeIDs'][_0x9ef6b2['id']];},DataManager[_0x431870(0x195)]=function(_0x3a2c3d){const _0x25a93a=_0x431870;_0x3a2c3d=_0x3a2c3d['toUpperCase']()['trim'](),this['_stypeIDs']=this[_0x25a93a(0x385)]||{};if(this['_stypeIDs'][_0x3a2c3d])return this[_0x25a93a(0x385)][_0x3a2c3d];for(let _0x30640a=0x1;_0x30640a<0x64;_0x30640a++){if(!$dataSystem[_0x25a93a(0x244)][_0x30640a])continue;let _0x2854ac=$dataSystem[_0x25a93a(0x244)][_0x30640a][_0x25a93a(0x3fb)]()[_0x25a93a(0x1dc)]();_0x2854ac=_0x2854ac[_0x25a93a(0x3c2)](/\x1I\[(\d+)\]/gi,''),_0x2854ac=_0x2854ac[_0x25a93a(0x3c2)](/\\I\[(\d+)\]/gi,''),this[_0x25a93a(0x385)][_0x2854ac]=_0x30640a;}return this[_0x25a93a(0x385)][_0x3a2c3d]||0x0;},DataManager[_0x431870(0x370)]=function(_0x4a8387){const _0x1d8f62=_0x431870;_0x4a8387=_0x4a8387[_0x1d8f62(0x3fb)]()[_0x1d8f62(0x1dc)](),this['_skillIDs']=this[_0x1d8f62(0x3ad)]||{};if(this[_0x1d8f62(0x3ad)][_0x4a8387])return this[_0x1d8f62(0x3ad)][_0x4a8387];for(const _0x47416b of $dataSkills){if(!_0x47416b)continue;this[_0x1d8f62(0x3ad)][_0x47416b['name']['toUpperCase']()[_0x1d8f62(0x1dc)]()]=_0x47416b['id'];}return this[_0x1d8f62(0x3ad)][_0x4a8387]||0x0;},DataManager['getStateIdWithName']=function(_0x444ab4){const _0x22e20c=_0x431870;_0x444ab4=_0x444ab4[_0x22e20c(0x3fb)]()[_0x22e20c(0x1dc)](),this[_0x22e20c(0x2ad)]=this[_0x22e20c(0x2ad)]||{};if(this['_stateIDs'][_0x444ab4])return this['_stateIDs'][_0x444ab4];for(const _0x3294b9 of $dataStates){if(!_0x3294b9)continue;this[_0x22e20c(0x2ad)][_0x3294b9[_0x22e20c(0x222)]['toUpperCase']()[_0x22e20c(0x1dc)]()]=_0x3294b9['id'];}return this[_0x22e20c(0x2ad)][_0x444ab4]||0x0;},DataManager[_0x431870(0x23b)]=function(_0x4c346){const _0x2f7d36=_0x431870;this['_stateMaxTurns']=this[_0x2f7d36(0x3dd)]||{};if(this[_0x2f7d36(0x3dd)][_0x4c346])return this[_0x2f7d36(0x3dd)][_0x4c346];return $dataStates[_0x4c346]['note'][_0x2f7d36(0x2f4)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x2f7d36(0x3dd)][_0x4c346]=Number(RegExp['$1']):this[_0x2f7d36(0x3dd)][_0x4c346]=VisuMZ[_0x2f7d36(0x371)]['Settings'][_0x2f7d36(0x33c)][_0x2f7d36(0x295)],this[_0x2f7d36(0x3dd)][_0x4c346];},ColorManager[_0x431870(0x389)]=function(_0x52e018,_0x2bff3e){const _0x161c69=_0x431870;return _0x2bff3e=String(_0x2bff3e),this[_0x161c69(0x240)]=this[_0x161c69(0x240)]||{},_0x2bff3e[_0x161c69(0x2f4)](/#(.*)/i)?this['_colorCache'][_0x52e018]='#%1'[_0x161c69(0x27e)](String(RegExp['$1'])):this[_0x161c69(0x240)][_0x52e018]=this[_0x161c69(0x18a)](Number(_0x2bff3e)),this[_0x161c69(0x240)][_0x52e018];},ColorManager['getColor']=function(_0x288665){const _0x3bcd07=_0x431870;return _0x288665=String(_0x288665),_0x288665[_0x3bcd07(0x2f4)](/#(.*)/i)?'#%1'[_0x3bcd07(0x27e)](String(RegExp['$1'])):this[_0x3bcd07(0x18a)](Number(_0x288665));},ColorManager[_0x431870(0x20b)]=function(_0xdef547){const _0x391168=_0x431870;if(typeof _0xdef547==='number')_0xdef547=$dataStates[_0xdef547];const _0x4641a0=_0x391168(0x257)['format'](_0xdef547['id']);this[_0x391168(0x240)]=this[_0x391168(0x240)]||{};if(this[_0x391168(0x240)][_0x4641a0])return this[_0x391168(0x240)][_0x4641a0];const _0x3e5332=this[_0x391168(0x3cc)](_0xdef547);return this['getColorDataFromPluginParameters'](_0x4641a0,_0x3e5332);},ColorManager[_0x431870(0x3cc)]=function(_0x2e226d){const _0x5360b2=_0x431870,_0x15a816=_0x2e226d[_0x5360b2(0x3f5)];if(_0x15a816[_0x5360b2(0x2f4)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x15a816[_0x5360b2(0x2f4)](/<POSITIVE STATE>/i))return VisuMZ[_0x5360b2(0x371)]['Settings']['States'][_0x5360b2(0x2c3)];else return _0x15a816[_0x5360b2(0x2f4)](/<NEGATIVE STATE>/i)?VisuMZ[_0x5360b2(0x371)][_0x5360b2(0x1f9)][_0x5360b2(0x33c)]['ColorNegative']:VisuMZ[_0x5360b2(0x371)][_0x5360b2(0x1f9)][_0x5360b2(0x33c)]['ColorNeutral'];}},ColorManager['buffColor']=function(){const _0x332d79=_0x431870,_0x5f3270=_0x332d79(0x31c);this[_0x332d79(0x240)]=this[_0x332d79(0x240)]||{};if(this[_0x332d79(0x240)][_0x5f3270])return this[_0x332d79(0x240)][_0x5f3270];const _0x4bf1b1=VisuMZ[_0x332d79(0x371)][_0x332d79(0x1f9)][_0x332d79(0x3f2)][_0x332d79(0x2b0)];return this[_0x332d79(0x389)](_0x5f3270,_0x4bf1b1);},ColorManager[_0x431870(0x331)]=function(){const _0x36a585=_0x431870,_0x31ed4e='_stored_debuffColor';this[_0x36a585(0x240)]=this['_colorCache']||{};if(this['_colorCache'][_0x31ed4e])return this[_0x36a585(0x240)][_0x31ed4e];const _0x44731a=VisuMZ[_0x36a585(0x371)][_0x36a585(0x1f9)][_0x36a585(0x3f2)][_0x36a585(0x2fa)];return this[_0x36a585(0x389)](_0x31ed4e,_0x44731a);},SceneManager[_0x431870(0x375)]=function(){const _0x499c8d=_0x431870;return this[_0x499c8d(0x1c4)]&&this[_0x499c8d(0x1c4)][_0x499c8d(0x3ca)]===Scene_Battle;},VisuMZ['SkillsStatesCore'][_0x431870(0x3e5)]=BattleManager[_0x431870(0x318)],BattleManager[_0x431870(0x318)]=function(){const _0x2bc085=_0x431870;this[_0x2bc085(0x37e)](),VisuMZ[_0x2bc085(0x371)]['BattleManager_endAction']['call'](this);},BattleManager['updateStatesActionEnd']=function(){const _0x5f5699=_0x431870,_0x26c1c7=VisuMZ[_0x5f5699(0x371)][_0x5f5699(0x1f9)][_0x5f5699(0x33c)];if(!_0x26c1c7)return;if(_0x26c1c7[_0x5f5699(0x241)]===![])return;if(!this[_0x5f5699(0x38d)])return;this[_0x5f5699(0x38d)]['updateStatesActionEnd']();},Game_Battler[_0x431870(0x2f7)][_0x431870(0x37e)]=function(){const _0x54acf6=_0x431870;if(BattleManager[_0x54acf6(0x1eb)]!=='action')return;if(this[_0x54acf6(0x36e)]===Graphics[_0x54acf6(0x1b2)])return;this[_0x54acf6(0x36e)]=Graphics['frameCount'];for(const _0xb750a5 of this['_states']){const _0x179d46=$dataStates[_0xb750a5];if(!_0x179d46)continue;if(_0x179d46[_0x54acf6(0x23e)]!==0x1)continue;this[_0x54acf6(0x1b3)][_0xb750a5]>0x0&&this[_0x54acf6(0x1b3)][_0xb750a5]--;}this[_0x54acf6(0x23c)](0x1);},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x1aa)]=function(){const _0x4eb805=_0x431870,_0x26f0ed=VisuMZ['SkillsStatesCore'][_0x4eb805(0x1f9)][_0x4eb805(0x33c)];for(const _0x272ed9 of this[_0x4eb805(0x1e9)]){const _0x4709d7=$dataStates[_0x272ed9];if(_0x26f0ed&&_0x26f0ed['ActionEndUpdate']!==![]){if(_0x4709d7&&_0x4709d7[_0x4eb805(0x23e)]===0x1)continue;}this[_0x4eb805(0x1b3)][_0x272ed9]>0x0&&this[_0x4eb805(0x1b3)][_0x272ed9]--;}},VisuMZ[_0x431870(0x371)]['Game_Switches_onChange']=Game_Switches[_0x431870(0x2f7)][_0x431870(0x268)],Game_Switches[_0x431870(0x2f7)][_0x431870(0x268)]=function(){const _0x3de5f8=_0x431870;VisuMZ[_0x3de5f8(0x371)][_0x3de5f8(0x24c)]['call'](this);const _0x11dc6b=VisuMZ['SkillsStatesCore'][_0x3de5f8(0x1f9)]['PassiveStates'][_0x3de5f8(0x228)]??!![];if(!_0x11dc6b)return;if(SceneManager[_0x3de5f8(0x375)]())for(const _0x5af8b1 of BattleManager[_0x3de5f8(0x3c9)]()){if(_0x5af8b1)_0x5af8b1[_0x3de5f8(0x38b)]();}},VisuMZ[_0x431870(0x371)][_0x431870(0x37c)]=Game_Variables['prototype'][_0x431870(0x268)],Game_Variables['prototype'][_0x431870(0x268)]=function(){const _0x454671=_0x431870;VisuMZ['SkillsStatesCore']['Game_Variables_onChange'][_0x454671(0x210)](this);const _0x2dfda5=VisuMZ[_0x454671(0x371)][_0x454671(0x1f9)][_0x454671(0x34b)][_0x454671(0x3a4)]??!![];if(!_0x2dfda5)return;if(SceneManager['isSceneBattle']())for(const _0x34bfd1 of BattleManager[_0x454671(0x3c9)]()){if(_0x34bfd1)_0x34bfd1['refresh']();}},VisuMZ[_0x431870(0x371)][_0x431870(0x1ce)]=Game_Action[_0x431870(0x2f7)]['applyItemUserEffect'],Game_Action[_0x431870(0x2f7)][_0x431870(0x2ea)]=function(_0x5a06a3){const _0x48eda2=_0x431870;VisuMZ[_0x48eda2(0x371)][_0x48eda2(0x1ce)][_0x48eda2(0x210)](this,_0x5a06a3),this[_0x48eda2(0x255)](_0x5a06a3);},Game_Action['prototype'][_0x431870(0x255)]=function(_0x226a32){const _0x2f12a2=_0x431870;this[_0x2f12a2(0x2e2)](_0x226a32),this[_0x2f12a2(0x227)](_0x226a32),this[_0x2f12a2(0x26c)](_0x226a32),this[_0x2f12a2(0x2ce)](_0x226a32);},VisuMZ['SkillsStatesCore'][_0x431870(0x2b2)]=Game_Action[_0x431870(0x2f7)]['testApply'],Game_Action[_0x431870(0x2f7)][_0x431870(0x376)]=function(_0x267515){const _0x4ae425=_0x431870;if(this[_0x4ae425(0x31b)](_0x267515))return!![];return VisuMZ['SkillsStatesCore']['Game_Action_testApply']['call'](this,_0x267515);},Game_Action[_0x431870(0x2f7)][_0x431870(0x31b)]=function(_0x3e2d7e){const _0x4e4f67=_0x431870;if(!this[_0x4e4f67(0x3bd)]())return;const _0x4b516c=this[_0x4e4f67(0x3bd)]()[_0x4e4f67(0x3f5)];if(_0x4b516c['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x5afd46=String(RegExp['$1']);if(_0x3e2d7e[_0x4e4f67(0x277)](_0x5afd46))return!![];}if(_0x4b516c[_0x4e4f67(0x2f4)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x4b4282=Number(RegExp['$1']);if(_0x3e2d7e['isStateAffected'](_0x4b4282))return!![];}else{if(_0x4b516c[_0x4e4f67(0x2f4)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x2ddcff=DataManager['getStateIdWithName'](RegExp['$1']);if(_0x3e2d7e[_0x4e4f67(0x270)](_0x2ddcff))return!![];}}return![];},Game_Action[_0x431870(0x2f7)][_0x431870(0x2e2)]=function(_0x41e8b9){const _0x15ae34=_0x431870;if(_0x41e8b9[_0x15ae34(0x1ad)]()['length']<=0x0)return;const _0x316d8d=this['item']()['note'];{const _0x2533b4=_0x316d8d[_0x15ae34(0x2f4)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x2533b4)for(const _0x208489 of _0x2533b4){_0x208489[_0x15ae34(0x2f4)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x298261=String(RegExp['$1']);_0x41e8b9[_0x15ae34(0x3a9)](_0x298261);}}{const _0x4bc170=_0x316d8d[_0x15ae34(0x2f4)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x4bc170)for(const _0x418f02 of _0x4bc170){_0x418f02['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x14ee42=String(RegExp['$1']),_0x245fed=Number(RegExp['$2']);_0x41e8b9[_0x15ae34(0x29b)](_0x14ee42,_0x245fed);}}},Game_Action[_0x431870(0x2f7)]['applyStateTurnManipulationEffects']=function(_0x1cbb22){const _0x3c2221=_0x431870,_0x1dc174=this[_0x3c2221(0x3bd)]()[_0x3c2221(0x3f5)],_0x358f80=_0x1dc174[_0x3c2221(0x2f4)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x358f80)for(const _0x545fff of _0x358f80){let _0x15fd6d=0x0,_0x4b191d=0x0;if(_0x545fff[_0x3c2221(0x2f4)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x15fd6d=Number(RegExp['$1']),_0x4b191d=Number(RegExp['$2']);else _0x545fff[_0x3c2221(0x2f4)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x15fd6d=DataManager[_0x3c2221(0x2fb)](RegExp['$1']),_0x4b191d=Number(RegExp['$2']));_0x1cbb22['setStateTurns'](_0x15fd6d,_0x4b191d),this[_0x3c2221(0x2a5)](_0x1cbb22);}const _0x335b8=_0x1dc174[_0x3c2221(0x2f4)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x335b8)for(const _0x53c57a of _0x335b8){let _0x11bb92=0x0,_0x3e3269=0x0;if(_0x53c57a[_0x3c2221(0x2f4)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x11bb92=Number(RegExp['$1']),_0x3e3269=Number(RegExp['$2']);else _0x53c57a[_0x3c2221(0x2f4)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x11bb92=DataManager[_0x3c2221(0x2fb)](RegExp['$1']),_0x3e3269=Number(RegExp['$2']));_0x1cbb22['addStateTurns'](_0x11bb92,_0x3e3269),this[_0x3c2221(0x2a5)](_0x1cbb22);}},Game_Action[_0x431870(0x2f7)]['applyBuffTurnManipulationEffects']=function(_0x3da73e){const _0x354c4d=_0x431870,_0x5b09de=[_0x354c4d(0x2d9),_0x354c4d(0x3ea),'ATK',_0x354c4d(0x2b5),'MAT',_0x354c4d(0x3f0),_0x354c4d(0x30b),_0x354c4d(0x22e)],_0x4faa97=this[_0x354c4d(0x3bd)]()[_0x354c4d(0x3f5)],_0x4cac59=_0x4faa97['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x4cac59)for(const _0x33bb9a of _0x4cac59){_0x33bb9a[_0x354c4d(0x2f4)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x4d6fbf=_0x5b09de[_0x354c4d(0x1a9)](String(RegExp['$1'])[_0x354c4d(0x3fb)]()),_0x4028eb=Number(RegExp['$2']);_0x4d6fbf>=0x0&&(_0x3da73e['setBuffTurns'](_0x4d6fbf,_0x4028eb),this[_0x354c4d(0x2a5)](_0x3da73e));}const _0x4e174f=_0x4faa97[_0x354c4d(0x2f4)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x4e174f)for(const _0x156013 of _0x4cac59){_0x156013[_0x354c4d(0x2f4)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x445816=_0x5b09de[_0x354c4d(0x1a9)](String(RegExp['$1'])[_0x354c4d(0x3fb)]()),_0x22977d=Number(RegExp['$2']);_0x445816>=0x0&&(_0x3da73e[_0x354c4d(0x2bf)](_0x445816,_0x22977d),this[_0x354c4d(0x2a5)](_0x3da73e));}},Game_Action[_0x431870(0x2f7)][_0x431870(0x2ce)]=function(_0x33cf9b){const _0x87954c=_0x431870,_0x2f4ae5=[_0x87954c(0x2d9),_0x87954c(0x3ea),_0x87954c(0x267),'DEF',_0x87954c(0x1ed),_0x87954c(0x3f0),_0x87954c(0x30b),_0x87954c(0x22e)],_0x2fb0ad=this[_0x87954c(0x3bd)]()[_0x87954c(0x3f5)],_0x5d3f63=_0x2fb0ad[_0x87954c(0x2f4)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x5d3f63)for(const _0x7c3532 of _0x5d3f63){_0x7c3532[_0x87954c(0x2f4)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x5b124c=_0x2f4ae5[_0x87954c(0x1a9)](String(RegExp['$1'])[_0x87954c(0x3fb)]()),_0x4c2238=Number(RegExp['$2']);_0x5b124c>=0x0&&(_0x33cf9b[_0x87954c(0x18e)](_0x5b124c,_0x4c2238),this['makeSuccess'](_0x33cf9b));}const _0x110d34=_0x2fb0ad[_0x87954c(0x2f4)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x110d34)for(const _0x1754a1 of _0x5d3f63){_0x1754a1[_0x87954c(0x2f4)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x456e13=_0x2f4ae5[_0x87954c(0x1a9)](String(RegExp['$1'])[_0x87954c(0x3fb)]()),_0x46c828=Number(RegExp['$2']);_0x456e13>=0x0&&(_0x33cf9b[_0x87954c(0x394)](_0x456e13,_0x46c828),this['makeSuccess'](_0x33cf9b));}},VisuMZ['SkillsStatesCore'][_0x431870(0x304)]=Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x1ec)],Game_BattlerBase[_0x431870(0x2f7)]['initMembers']=function(){const _0x43a503=_0x431870;this[_0x43a503(0x286)]={},this[_0x43a503(0x26f)](),VisuMZ[_0x43a503(0x371)]['Game_BattlerBase_initMembers']['call'](this);},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x26f)]=function(){const _0x8cf19b=_0x431870;this[_0x8cf19b(0x29e)]='',this[_0x8cf19b(0x391)]={},this[_0x8cf19b(0x347)]={},this[_0x8cf19b(0x2f3)]={};},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x3aa)]=function(_0xa60f41){const _0x3cdf66=_0x431870;return this[_0x3cdf66(0x286)]=this['_cache']||{},this[_0x3cdf66(0x286)][_0xa60f41]!==undefined;},VisuMZ[_0x431870(0x371)][_0x431870(0x2ca)]=Game_BattlerBase[_0x431870(0x2f7)]['refresh'],Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x38b)]=function(){const _0x191671=_0x431870;this[_0x191671(0x286)]={},VisuMZ[_0x191671(0x371)][_0x191671(0x2ca)]['call'](this);},VisuMZ['SkillsStatesCore'][_0x431870(0x1c9)]=Game_BattlerBase['prototype'][_0x431870(0x2de)],Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x2de)]=function(_0x39cb2e){const _0x2d311f=_0x431870;let _0x3628ce=this[_0x2d311f(0x270)](_0x39cb2e);VisuMZ[_0x2d311f(0x371)]['Game_BattlerBase_eraseState'][_0x2d311f(0x210)](this,_0x39cb2e);if(_0x3628ce&&!this['isStateAffected'](_0x39cb2e))this[_0x2d311f(0x2bc)](_0x39cb2e);},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x2bc)]=function(_0x8d974b){const _0x73668=_0x431870;this[_0x73668(0x3b2)](_0x8d974b),this['clearStateDisplay'](_0x8d974b),this[_0x73668(0x3e2)](_0x8d974b);},VisuMZ['SkillsStatesCore'][_0x431870(0x31e)]=Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x37b)],Game_BattlerBase[_0x431870(0x2f7)]['resetStateCounts']=function(_0x3912e3){const _0xe68018=_0x431870,_0x4b9f9b=$dataStates[_0x3912e3],_0x2e03cb=this[_0xe68018(0x296)](_0x3912e3),_0x71397c=this[_0xe68018(0x1d0)](_0x4b9f9b)[_0xe68018(0x3c1)]()[_0xe68018(0x1dc)]();switch(_0x71397c){case _0xe68018(0x3d4):if(_0x2e03cb<=0x0)VisuMZ[_0xe68018(0x371)][_0xe68018(0x31e)][_0xe68018(0x210)](this,_0x3912e3);break;case _0xe68018(0x2f1):VisuMZ[_0xe68018(0x371)][_0xe68018(0x31e)][_0xe68018(0x210)](this,_0x3912e3);break;case _0xe68018(0x2a7):VisuMZ[_0xe68018(0x371)]['Game_BattlerBase_resetStateCounts']['call'](this,_0x3912e3),this['_stateTurns'][_0x3912e3]=Math[_0xe68018(0x2cd)](this['_stateTurns'][_0x3912e3],_0x2e03cb);break;case _0xe68018(0x3ba):VisuMZ[_0xe68018(0x371)]['Game_BattlerBase_resetStateCounts']['call'](this,_0x3912e3),this[_0xe68018(0x1b3)][_0x3912e3]+=_0x2e03cb;break;default:VisuMZ['SkillsStatesCore']['Game_BattlerBase_resetStateCounts'][_0xe68018(0x210)](this,_0x3912e3);break;}},Game_BattlerBase['prototype']['getStateReapplyRulings']=function(_0x71133b){const _0x16d183=_0x431870,_0x19fc17=_0x71133b[_0x16d183(0x3f5)];return _0x19fc17['match'](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ['SkillsStatesCore']['Settings'][_0x16d183(0x33c)][_0x16d183(0x3de)];},VisuMZ['SkillsStatesCore']['Game_BattlerBase_overwriteBuffTurns']=Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x206)],Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x206)]=function(_0x3e3602,_0x6b7ec1){const _0x2a29ec=_0x431870,_0x29f107=VisuMZ[_0x2a29ec(0x371)][_0x2a29ec(0x1f9)][_0x2a29ec(0x3f2)][_0x2a29ec(0x3de)],_0x20f3a2=this[_0x2a29ec(0x1b9)](_0x3e3602);switch(_0x29f107){case _0x2a29ec(0x3d4):if(_0x20f3a2<=0x0)this[_0x2a29ec(0x213)][_0x3e3602]=_0x6b7ec1;break;case _0x2a29ec(0x2f1):this[_0x2a29ec(0x213)][_0x3e3602]=_0x6b7ec1;break;case _0x2a29ec(0x2a7):this[_0x2a29ec(0x213)][_0x3e3602]=Math[_0x2a29ec(0x2cd)](_0x20f3a2,_0x6b7ec1);break;case _0x2a29ec(0x3ba):this[_0x2a29ec(0x213)][_0x3e3602]+=_0x6b7ec1;break;default:VisuMZ[_0x2a29ec(0x371)][_0x2a29ec(0x3af)][_0x2a29ec(0x210)](this,_0x3e3602,_0x6b7ec1);break;}const _0x1652fa=VisuMZ['SkillsStatesCore'][_0x2a29ec(0x1f9)][_0x2a29ec(0x3f2)]['MaxTurns'];this[_0x2a29ec(0x213)][_0x3e3602]=this[_0x2a29ec(0x213)][_0x3e3602]['clamp'](0x0,_0x1652fa);},Game_BattlerBase[_0x431870(0x2f7)]['isGroupDefeatStateAffected']=function(){const _0x53b9c6=_0x431870;if(this[_0x53b9c6(0x286)][_0x53b9c6(0x29f)]!==undefined)return this[_0x53b9c6(0x286)][_0x53b9c6(0x29f)];this[_0x53b9c6(0x286)][_0x53b9c6(0x29f)]=![];const _0x338a9d=this[_0x53b9c6(0x1ad)]();for(const _0xa61cd5 of _0x338a9d){if(!_0xa61cd5)continue;if(_0xa61cd5[_0x53b9c6(0x3f5)][_0x53b9c6(0x2f4)](/<GROUP DEFEAT>/i)){this[_0x53b9c6(0x286)][_0x53b9c6(0x29f)]=!![];break;}}return this[_0x53b9c6(0x286)][_0x53b9c6(0x29f)];},VisuMZ[_0x431870(0x371)][_0x431870(0x1d6)]=Game_Unit[_0x431870(0x2f7)][_0x431870(0x1e3)],Game_Unit[_0x431870(0x2f7)][_0x431870(0x1e3)]=function(){const _0x241c2d=_0x431870;let _0x6207ab=VisuMZ[_0x241c2d(0x371)][_0x241c2d(0x1d6)][_0x241c2d(0x210)](this);return BattleManager[_0x241c2d(0x273)]&&(_0x6207ab=_0x6207ab[_0x241c2d(0x3ed)](this[_0x241c2d(0x31f)]()['filter'](_0x1a2b26=>_0x1a2b26[_0x241c2d(0x284)]()))),_0x6207ab;},VisuMZ['SkillsStatesCore'][_0x431870(0x3f6)]=Game_BattlerBase[_0x431870(0x2f7)]['clearStates'],Game_BattlerBase[_0x431870(0x2f7)]['clearStates']=function(){const _0x3a8fb4=_0x431870;this[_0x3a8fb4(0x20f)]()!==''?this[_0x3a8fb4(0x38a)]():(VisuMZ[_0x3a8fb4(0x371)][_0x3a8fb4(0x3f6)][_0x3a8fb4(0x210)](this),this['initMembersSkillsStatesCore']());},Game_Actor[_0x431870(0x2f7)][_0x431870(0x354)]=function(){const _0x300539=_0x431870;this['_stateSteps']=this[_0x300539(0x3b5)]||{},Game_Battler[_0x300539(0x2f7)]['clearStates'][_0x300539(0x210)](this);},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x38a)]=function(){const _0x3528aa=_0x431870,_0xee1115=this[_0x3528aa(0x1ad)]();for(const _0x487095 of _0xee1115){if(_0x487095&&this[_0x3528aa(0x39a)](_0x487095))this[_0x3528aa(0x2de)](_0x487095['id']);}this[_0x3528aa(0x286)]={};},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x39a)]=function(_0xccb7ab){const _0x34fdcf=_0x431870,_0x1ca66b=this[_0x34fdcf(0x20f)]();if(_0x1ca66b!==''){const _0x19b05a=_0xccb7ab['note'];if(_0x1ca66b==='death'&&_0x19b05a[_0x34fdcf(0x2f4)](/<NO DEATH CLEAR>/i))return![];if(_0x1ca66b==='recover\x20all'&&_0x19b05a[_0x34fdcf(0x2f4)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x34fdcf(0x270)](_0xccb7ab['id']);},Game_BattlerBase['prototype'][_0x431870(0x20f)]=function(){const _0x4dbe99=_0x431870;return this[_0x4dbe99(0x29e)];},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x28b)]=function(_0x1652c8){this['_stateRetainType']=_0x1652c8;},Game_BattlerBase['prototype'][_0x431870(0x2bd)]=function(){const _0x208bb2=_0x431870;this[_0x208bb2(0x29e)]='';},VisuMZ[_0x431870(0x371)][_0x431870(0x3b0)]=Game_BattlerBase[_0x431870(0x2f7)]['die'],Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x26a)]=function(){const _0x3c00a6=_0x431870;this[_0x3c00a6(0x28b)]('death'),VisuMZ[_0x3c00a6(0x371)][_0x3c00a6(0x3b0)]['call'](this),this[_0x3c00a6(0x2bd)]();},VisuMZ['SkillsStatesCore'][_0x431870(0x34f)]=Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x249)],Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x249)]=function(){const _0x22309e=_0x431870;this[_0x22309e(0x28b)](_0x22309e(0x1c0)),VisuMZ[_0x22309e(0x371)][_0x22309e(0x34f)]['call'](this),this[_0x22309e(0x2bd)]();},Game_BattlerBase['prototype'][_0x431870(0x2db)]=function(_0x509d67,_0x259812,_0x1fcbde){return _0x259812;},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x334)]=function(_0x13971f){const _0x104223=_0x431870;for(settings of VisuMZ[_0x104223(0x371)]['Settings']['Costs']){let _0x23c56a=settings[_0x104223(0x194)]['call'](this,_0x13971f);_0x23c56a=this['adjustSkillCost'](_0x13971f,_0x23c56a,settings);if(!settings['CanPayJS'][_0x104223(0x210)](this,_0x13971f,_0x23c56a))return![];}return!![];},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x30d)]=function(_0x1d87cf){const _0x2bc53b=_0x431870;for(settings of VisuMZ['SkillsStatesCore']['Settings'][_0x2bc53b(0x311)]){let _0x118f69=settings[_0x2bc53b(0x194)][_0x2bc53b(0x210)](this,_0x1d87cf);_0x118f69=this['adjustSkillCost'](_0x1d87cf,_0x118f69,settings),settings['PayJS'][_0x2bc53b(0x210)](this,_0x1d87cf,_0x118f69);}},VisuMZ[_0x431870(0x371)][_0x431870(0x2e6)]=Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x2e5)],Game_BattlerBase['prototype'][_0x431870(0x2e5)]=function(_0x4a1d14){const _0x2e6ba9=_0x431870;if(!_0x4a1d14)return![];if(!VisuMZ[_0x2e6ba9(0x371)][_0x2e6ba9(0x2e6)][_0x2e6ba9(0x210)](this,_0x4a1d14))return![];if(!this[_0x2e6ba9(0x1c8)](_0x4a1d14))return![];if(!this['meetsSkillConditionsEnableJS'](_0x4a1d14))return![];if(!this[_0x2e6ba9(0x220)](_0x4a1d14))return![];return!![];},Game_BattlerBase['prototype'][_0x431870(0x1c8)]=function(_0x16d658){const _0x551fb3=_0x431870;if(!this[_0x551fb3(0x2c7)](_0x16d658))return![];return!![];},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x2c7)]=function(_0x410e6c){const _0x3f8972=_0x431870,_0x55b905=_0x410e6c[_0x3f8972(0x3f5)];if(_0x55b905[_0x3f8972(0x2f4)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x23f9d9=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2212fb of _0x23f9d9){if(!$gameSwitches[_0x3f8972(0x3e7)](_0x2212fb))return![];}return!![];}if(_0x55b905['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x49af32=JSON[_0x3f8972(0x3c8)]('['+RegExp['$1'][_0x3f8972(0x2f4)](/\d+/g)+']');for(const _0x25f67f of _0x49af32){if(!$gameSwitches[_0x3f8972(0x3e7)](_0x25f67f))return![];}return!![];}if(_0x55b905[_0x3f8972(0x2f4)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x28f0b4=JSON[_0x3f8972(0x3c8)]('['+RegExp['$1'][_0x3f8972(0x2f4)](/\d+/g)+']');for(const _0x195ba1 of _0x28f0b4){if($gameSwitches['value'](_0x195ba1))return!![];}return![];}if(_0x55b905['match'](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5b5b8d=JSON[_0x3f8972(0x3c8)]('['+RegExp['$1'][_0x3f8972(0x2f4)](/\d+/g)+']');for(const _0x33c043 of _0x5b5b8d){if(!$gameSwitches[_0x3f8972(0x3e7)](_0x33c043))return!![];}return![];}if(_0x55b905[_0x3f8972(0x2f4)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x44b5b5=JSON[_0x3f8972(0x3c8)]('['+RegExp['$1'][_0x3f8972(0x2f4)](/\d+/g)+']');for(const _0x5f0b21 of _0x44b5b5){if(!$gameSwitches[_0x3f8972(0x3e7)](_0x5f0b21))return!![];}return![];}if(_0x55b905[_0x3f8972(0x2f4)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x460092=JSON[_0x3f8972(0x3c8)]('['+RegExp['$1'][_0x3f8972(0x2f4)](/\d+/g)+']');for(const _0x50a0ea of _0x460092){if($gameSwitches[_0x3f8972(0x3e7)](_0x50a0ea))return![];}return!![];}return!![];},Game_BattlerBase['prototype'][_0x431870(0x3ec)]=function(_0xc9f174){const _0x47472e=_0x431870,_0x429148=_0xc9f174['note'],_0xf578f3=VisuMZ[_0x47472e(0x371)]['skillEnableJS'];return _0xf578f3[_0xc9f174['id']]?_0xf578f3[_0xc9f174['id']][_0x47472e(0x210)](this,_0xc9f174):!![];},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x220)]=function(_0x5a5c09){const _0x8ca7f=_0x431870;return VisuMZ[_0x8ca7f(0x371)][_0x8ca7f(0x1f9)][_0x8ca7f(0x2ae)][_0x8ca7f(0x383)][_0x8ca7f(0x210)](this,_0x5a5c09);},VisuMZ[_0x431870(0x371)]['Game_BattlerBase_skillMpCost']=Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x1e5)],Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x1e5)]=function(_0x5c0a2e){const _0x24e048=_0x431870;for(settings of VisuMZ[_0x24e048(0x371)]['Settings'][_0x24e048(0x311)]){if(settings[_0x24e048(0x1d4)][_0x24e048(0x3fb)]()==='MP'){let _0xcd484=settings['CalcJS']['call'](this,_0x5c0a2e);return _0xcd484=this[_0x24e048(0x2db)](_0x5c0a2e,_0xcd484,settings),_0xcd484;}}return VisuMZ[_0x24e048(0x371)][_0x24e048(0x1b7)][_0x24e048(0x210)](this,_0x5c0a2e);},VisuMZ[_0x431870(0x371)]['Game_BattlerBase_skillTpCost']=Game_BattlerBase['prototype'][_0x431870(0x291)],Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x291)]=function(_0x1c9e63){const _0x549437=_0x431870;for(settings of VisuMZ[_0x549437(0x371)][_0x549437(0x1f9)][_0x549437(0x311)]){if(settings['Name']['toUpperCase']()==='TP'){let _0x523f82=settings[_0x549437(0x194)][_0x549437(0x210)](this,_0x1c9e63);return _0x523f82=this[_0x549437(0x2db)](_0x1c9e63,_0x523f82,settings),_0x523f82;}}return VisuMZ[_0x549437(0x371)][_0x549437(0x360)][_0x549437(0x210)](this,_0x1c9e63);},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x2a1)]=function(_0xf01abf){const _0x18f25b=_0x431870;if(typeof _0xf01abf==='number')_0xf01abf=$dataStates[_0xf01abf];return this[_0x18f25b(0x1ad)]()[_0x18f25b(0x22f)](_0xf01abf);},VisuMZ[_0x431870(0x371)]['Game_BattlerBase_states']=Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x1ad)],Game_BattlerBase['prototype']['states']=function(){const _0x254d9d=_0x431870;let _0x236f08=VisuMZ[_0x254d9d(0x371)][_0x254d9d(0x3f4)][_0x254d9d(0x210)](this);if($gameTemp[_0x254d9d(0x31d)])return _0x236f08;return $gameTemp['_checkingPassiveStates']=!![],this['addPassiveStates'](_0x236f08),$gameTemp['_checkingPassiveStates']=undefined,_0x236f08;},Game_BattlerBase[_0x431870(0x2f7)]['addPassiveStates']=function(_0x29d93a){const _0x571189=_0x431870,_0x4e9f06=this['passiveStates']();for(state of _0x4e9f06){if(!state)continue;if(!this[_0x571189(0x301)](state)&&_0x29d93a['includes'](state))continue;_0x29d93a[_0x571189(0x3a3)](state);}_0x4e9f06[_0x571189(0x2f9)]>0x0&&_0x29d93a[_0x571189(0x393)]((_0x5f0aaa,_0x278412)=>{const _0x2b8455=_0x571189,_0x487f65=_0x5f0aaa['priority'],_0x521a20=_0x278412[_0x2b8455(0x188)];if(_0x487f65!==_0x521a20)return _0x521a20-_0x487f65;return _0x5f0aaa-_0x278412;});},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x301)]=function(_0x5ec7dd){const _0x4f0ebc=_0x431870;return _0x5ec7dd[_0x4f0ebc(0x3f5)][_0x4f0ebc(0x2f4)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x431870(0x371)]['Game_BattlerBase_traitsSet']=Game_BattlerBase[_0x431870(0x2f7)]['traitsSet'],Game_BattlerBase['prototype']['traitsSet']=function(_0x2fae23){const _0x3e04da=_0x431870;this[_0x3e04da(0x37f)]=!![];let _0x138baa=VisuMZ['SkillsStatesCore'][_0x3e04da(0x208)][_0x3e04da(0x210)](this,_0x2fae23);return this[_0x3e04da(0x37f)]=undefined,_0x138baa;},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x21d)]=function(){const _0x5c167b=_0x431870;let _0x4f2dfc=[];this[_0x5c167b(0x23a)]=this[_0x5c167b(0x23a)]||{};for(;;){_0x4f2dfc=[];let _0x45e05f=!![];for(const _0x3485e1 of this[_0x5c167b(0x286)]['passiveStates']){const _0x55554e=$dataStates[_0x3485e1];if(!_0x55554e)continue;let _0x45987e=this[_0x5c167b(0x193)](_0x55554e);this['_passiveStateResults'][_0x3485e1]!==_0x45987e&&(_0x45e05f=![],this[_0x5c167b(0x23a)][_0x3485e1]=_0x45987e);if(!_0x45987e)continue;_0x4f2dfc['push'](_0x55554e);}if(_0x45e05f)break;else{if(!this[_0x5c167b(0x37f)])this[_0x5c167b(0x38b)]();this['createPassiveStatesCache']();}}return _0x4f2dfc;},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x193)]=function(_0x33700f){const _0x59e652=_0x431870;if(!this[_0x59e652(0x26d)](_0x33700f))return![];if(!this[_0x59e652(0x1d3)](_0x33700f))return![];if(!this[_0x59e652(0x309)](_0x33700f))return![];if(!this[_0x59e652(0x316)](_0x33700f))return![];return!![];},Game_BattlerBase['prototype'][_0x431870(0x26d)]=function(_0x4afbcc){return!![];},Game_Actor[_0x431870(0x2f7)][_0x431870(0x26d)]=function(_0x254c8b){const _0x52a02a=_0x431870,_0x1afe85=_0x254c8b[_0x52a02a(0x3f5)];if(_0x1afe85[_0x52a02a(0x2f4)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x595ebf=String(RegExp['$1'])[_0x52a02a(0x373)](',')[_0x52a02a(0x211)](_0x1e8c48=>_0x1e8c48['trim']()),_0xb6b3fe=VisuMZ[_0x52a02a(0x371)][_0x52a02a(0x3df)](_0x595ebf);return _0xb6b3fe[_0x52a02a(0x22f)](this[_0x52a02a(0x1c2)]());}if(_0x1afe85[_0x52a02a(0x2f4)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x2bb6be=String(RegExp['$1'])['split'](',')['map'](_0x183cca=>_0x183cca['trim']()),_0x24cce5=VisuMZ[_0x52a02a(0x371)]['ParseClassIDs'](_0x2bb6be);let _0x577fd1=[this[_0x52a02a(0x1c2)]()];return Imported['VisuMZ_2_ClassChangeSystem']&&this[_0x52a02a(0x1ee)]&&(_0x577fd1=this[_0x52a02a(0x1ee)]()),_0x24cce5[_0x52a02a(0x362)](_0x29a6dd=>_0x577fd1['includes'](_0x29a6dd))[_0x52a02a(0x2f9)]>0x0;}return Game_BattlerBase[_0x52a02a(0x2f7)]['meetsPassiveStateConditionClasses'][_0x52a02a(0x210)](this,_0x254c8b);},VisuMZ[_0x431870(0x371)][_0x431870(0x3df)]=function(_0x42bb8c){const _0x5b3fb0=_0x431870,_0x2ef6ce=[];for(let _0x33c2cd of _0x42bb8c){_0x33c2cd=(String(_0x33c2cd)||'')[_0x5b3fb0(0x1dc)]();const _0x3bfcc9=/^\d+$/[_0x5b3fb0(0x28d)](_0x33c2cd);_0x3bfcc9?_0x2ef6ce[_0x5b3fb0(0x3a3)](Number(_0x33c2cd)):_0x2ef6ce[_0x5b3fb0(0x3a3)](DataManager[_0x5b3fb0(0x287)](_0x33c2cd));}return _0x2ef6ce['map'](_0x99881b=>$dataClasses[Number(_0x99881b)])[_0x5b3fb0(0x25c)](null);},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x1d3)]=function(_0x15c3e7){const _0x2acec5=_0x431870,_0x4221af=_0x15c3e7['note'];if(_0x4221af[_0x2acec5(0x2f4)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3dc8b0=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x42c541 of _0x3dc8b0){if(!$gameSwitches[_0x2acec5(0x3e7)](_0x42c541))return![];}return!![];}if(_0x4221af[_0x2acec5(0x2f4)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x373ea9=JSON['parse']('['+RegExp['$1'][_0x2acec5(0x2f4)](/\d+/g)+']');for(const _0x4e6151 of _0x373ea9){if(!$gameSwitches['value'](_0x4e6151))return![];}return!![];}if(_0x4221af['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4884c9=JSON[_0x2acec5(0x3c8)]('['+RegExp['$1'][_0x2acec5(0x2f4)](/\d+/g)+']');for(const _0x4c02b4 of _0x4884c9){if($gameSwitches['value'](_0x4c02b4))return!![];}return![];}if(_0x4221af['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x162f49=JSON['parse']('['+RegExp['$1'][_0x2acec5(0x2f4)](/\d+/g)+']');for(const _0x5f17a2 of _0x162f49){if(!$gameSwitches[_0x2acec5(0x3e7)](_0x5f17a2))return!![];}return![];}if(_0x4221af[_0x2acec5(0x2f4)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x26e466=JSON[_0x2acec5(0x3c8)]('['+RegExp['$1'][_0x2acec5(0x2f4)](/\d+/g)+']');for(const _0x49c059 of _0x26e466){if(!$gameSwitches[_0x2acec5(0x3e7)](_0x49c059))return!![];}return![];}if(_0x4221af[_0x2acec5(0x2f4)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x20d662=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x180968 of _0x20d662){if($gameSwitches[_0x2acec5(0x3e7)](_0x180968))return![];}return!![];}return!![];},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x309)]=function(_0x39d592){const _0x437621=_0x431870,_0x22d7b3=VisuMZ['SkillsStatesCore'][_0x437621(0x39c)];if(_0x22d7b3[_0x39d592['id']]&&!_0x22d7b3[_0x39d592['id']][_0x437621(0x210)](this,_0x39d592))return![];return!![];},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x316)]=function(_0x5c387d){const _0x10179d=_0x431870;return VisuMZ[_0x10179d(0x371)][_0x10179d(0x1f9)][_0x10179d(0x34b)][_0x10179d(0x1e0)][_0x10179d(0x210)](this,_0x5c387d);},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x243)]=function(){const _0x50f6f2=_0x431870;if(this[_0x50f6f2(0x3aa)](_0x50f6f2(0x243)))return this[_0x50f6f2(0x21d)]();if(this['_checkingVisuMzPassiveStateObjects'])return[];return this[_0x50f6f2(0x2bb)]=!![],this['createPassiveStatesCache'](),this[_0x50f6f2(0x2bb)]=undefined,this[_0x50f6f2(0x21d)]();},Game_BattlerBase[_0x431870(0x2f7)]['createPassiveStatesCache']=function(){const _0x1b25f0=_0x431870;this['_checkingVisuMzPassiveStateObjects']=!![],this['_cache'][_0x1b25f0(0x243)]=[],this['addPassiveStatesFromOtherPlugins'](),this['addPassiveStatesByNotetag'](),this[_0x1b25f0(0x191)](),this[_0x1b25f0(0x2bb)]=undefined;},Game_BattlerBase['prototype'][_0x431870(0x272)]=function(){const _0xd16708=_0x431870;if(Imported[_0xd16708(0x3f9)])this[_0xd16708(0x1ef)]();},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x3f3)]=function(){return[];},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x312)]=function(){const _0xb4f58a=_0x431870,_0x177c10=this[_0xb4f58a(0x3f3)]();for(const _0x4912c3 of _0x177c10){if(!_0x4912c3)continue;const _0x3a19ee=_0x4912c3[_0xb4f58a(0x3f5)]['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x3a19ee)for(const _0x40796b of _0x3a19ee){_0x40796b['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x55cfd3=RegExp['$1'];if(_0x55cfd3['match'](/(\d+(?:\s*,\s*\d+)*)/i)){const _0xa13cd=JSON['parse']('['+RegExp['$1'][_0xb4f58a(0x2f4)](/\d+/g)+']');this[_0xb4f58a(0x286)][_0xb4f58a(0x243)]=this[_0xb4f58a(0x286)]['passiveStates']['concat'](_0xa13cd);}else{const _0x1b24a4=_0x55cfd3[_0xb4f58a(0x373)](',');for(const _0x3393fd of _0x1b24a4){const _0x51f0ac=DataManager['getStateIdWithName'](_0x3393fd);if(_0x51f0ac)this[_0xb4f58a(0x286)][_0xb4f58a(0x243)]['push'](_0x51f0ac);}}}}},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x191)]=function(){const _0x533984=_0x431870,_0xb0b636=VisuMZ[_0x533984(0x371)][_0x533984(0x1f9)][_0x533984(0x34b)][_0x533984(0x2cc)];this[_0x533984(0x286)][_0x533984(0x243)]=this[_0x533984(0x286)][_0x533984(0x243)][_0x533984(0x3ed)](_0xb0b636);},Game_BattlerBase[_0x431870(0x2f7)]['stateTurns']=function(_0x5b439d){const _0x2bb188=_0x431870;if(typeof _0x5b439d!==_0x2bb188(0x1df))_0x5b439d=_0x5b439d['id'];return this['_stateTurns'][_0x5b439d]||0x0;},Game_BattlerBase['prototype'][_0x431870(0x30a)]=function(_0x2b94e4,_0x282820){const _0x1efbd6=_0x431870;if(typeof _0x2b94e4!==_0x1efbd6(0x1df))_0x2b94e4=_0x2b94e4['id'];if(this[_0x1efbd6(0x270)](_0x2b94e4)){const _0x12c475=DataManager[_0x1efbd6(0x23b)](_0x2b94e4);this['_stateTurns'][_0x2b94e4]=_0x282820[_0x1efbd6(0x212)](0x0,_0x12c475);if(this['_stateTurns'][_0x2b94e4]<=0x0)this[_0x1efbd6(0x395)](_0x2b94e4);}},Game_BattlerBase[_0x431870(0x2f7)]['addStateTurns']=function(_0x1953fd,_0x57c3d2){const _0x18c2d4=_0x431870;if(typeof _0x1953fd!=='number')_0x1953fd=_0x1953fd['id'];this[_0x18c2d4(0x270)](_0x1953fd)&&(_0x57c3d2+=this[_0x18c2d4(0x296)](_0x1953fd),this[_0x18c2d4(0x30a)](_0x1953fd,_0x57c3d2));},VisuMZ[_0x431870(0x371)][_0x431870(0x1a7)]=Game_BattlerBase[_0x431870(0x2f7)]['eraseBuff'],Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x25b)]=function(_0x5153e5){const _0x1dda04=_0x431870,_0x4a4190=this[_0x1dda04(0x2ee)][_0x5153e5];VisuMZ[_0x1dda04(0x371)][_0x1dda04(0x1a7)]['call'](this,_0x5153e5);if(_0x4a4190>0x0)this['onEraseBuff'](_0x5153e5);if(_0x4a4190<0x0)this[_0x1dda04(0x1ff)](_0x5153e5);},VisuMZ[_0x431870(0x371)][_0x431870(0x2ff)]=Game_BattlerBase['prototype']['increaseBuff'],Game_BattlerBase[_0x431870(0x2f7)]['increaseBuff']=function(_0x501701){const _0x1fc8bb=_0x431870;VisuMZ[_0x1fc8bb(0x371)]['Game_BattlerBase_increaseBuff']['call'](this,_0x501701);if(!this[_0x1fc8bb(0x340)](_0x501701))this['eraseBuff'](_0x501701);},VisuMZ[_0x431870(0x371)][_0x431870(0x21f)]=Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x200)],Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x200)]=function(_0x189a0f){const _0x1f4bad=_0x431870;VisuMZ['SkillsStatesCore']['Game_BattlerBase_decreaseBuff'][_0x1f4bad(0x210)](this,_0x189a0f);if(!this[_0x1f4bad(0x340)](_0x189a0f))this['eraseBuff'](_0x189a0f);},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x205)]=function(_0xb4462f){},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x1ff)]=function(_0x538d99){},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x381)]=function(_0x5554c5){const _0x3af464=_0x431870;return this[_0x3af464(0x2ee)][_0x5554c5]===VisuMZ[_0x3af464(0x371)][_0x3af464(0x1f9)][_0x3af464(0x3f2)][_0x3af464(0x2b6)];},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x2c0)]=function(_0x124658){const _0x293bc1=_0x431870;return this[_0x293bc1(0x2ee)][_0x124658]===-VisuMZ[_0x293bc1(0x371)]['Settings']['Buffs']['StackDebuffMax'];},VisuMZ[_0x431870(0x371)][_0x431870(0x348)]=Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x28a)],Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x28a)]=function(_0x36f89f,_0x52e598){const _0xce43eb=_0x431870;return _0x36f89f=_0x36f89f['clamp'](-0x2,0x2),VisuMZ[_0xce43eb(0x371)][_0xce43eb(0x348)][_0xce43eb(0x210)](this,_0x36f89f,_0x52e598);},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x2c8)]=function(_0x469861){const _0x5d1a66=_0x431870,_0x1d47ce=this[_0x5d1a66(0x2ee)][_0x469861];return VisuMZ['SkillsStatesCore'][_0x5d1a66(0x1f9)]['Buffs'][_0x5d1a66(0x265)][_0x5d1a66(0x210)](this,_0x469861,_0x1d47ce);},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x1b9)]=function(_0x12bdbb){return this['_buffTurns'][_0x12bdbb]||0x0;},Game_BattlerBase['prototype']['debuffTurns']=function(_0xc2e059){return this['buffTurns'](_0xc2e059);},Game_BattlerBase[_0x431870(0x2f7)]['setBuffTurns']=function(_0x4513d7,_0x4fbd62){const _0x3a487e=_0x431870;if(this[_0x3a487e(0x2ac)](_0x4513d7)){const _0x4ef625=VisuMZ[_0x3a487e(0x371)][_0x3a487e(0x1f9)][_0x3a487e(0x3f2)][_0x3a487e(0x295)];this['_buffTurns'][_0x4513d7]=_0x4fbd62[_0x3a487e(0x212)](0x0,_0x4ef625);}},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x2bf)]=function(_0x352986,_0xbc4536){const _0x555a54=_0x431870;this[_0x555a54(0x2ac)](_0x352986)&&(_0xbc4536+=this[_0x555a54(0x1b9)](stateId),this[_0x555a54(0x2af)](_0x352986,_0xbc4536));},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x18e)]=function(_0x1072a3,_0xde71b9){const _0x25e503=_0x431870;if(this[_0x25e503(0x203)](_0x1072a3)){const _0x314d9b=VisuMZ[_0x25e503(0x371)]['Settings'][_0x25e503(0x3f2)][_0x25e503(0x295)];this[_0x25e503(0x213)][_0x1072a3]=_0xde71b9[_0x25e503(0x212)](0x0,_0x314d9b);}},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x394)]=function(_0x10a9af,_0x2d6511){const _0x29ca69=_0x431870;this[_0x29ca69(0x203)](_0x10a9af)&&(_0x2d6511+=this['buffTurns'](stateId),this['setDebuffTurns'](_0x10a9af,_0x2d6511));},Game_BattlerBase[_0x431870(0x2f7)]['stateData']=function(_0x5451bc){const _0x231209=_0x431870;if(typeof _0x5451bc!==_0x231209(0x1df))_0x5451bc=_0x5451bc['id'];return this[_0x231209(0x391)]=this[_0x231209(0x391)]||{},this[_0x231209(0x391)][_0x5451bc]=this['_stateData'][_0x5451bc]||{},this[_0x231209(0x391)][_0x5451bc];},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x374)]=function(_0x368273,_0x38aa41){const _0x3d4797=_0x431870;if(typeof _0x368273!==_0x3d4797(0x1df))_0x368273=_0x368273['id'];const _0x3beb01=this[_0x3d4797(0x1dd)](_0x368273);return _0x3beb01[_0x38aa41];},Game_BattlerBase['prototype'][_0x431870(0x245)]=function(_0x329c4c,_0x1f528f,_0x2be3a){const _0x121eab=_0x431870;if(typeof _0x329c4c!==_0x121eab(0x1df))_0x329c4c=_0x329c4c['id'];const _0x221200=this['stateData'](_0x329c4c);_0x221200[_0x1f528f]=_0x2be3a;},Game_BattlerBase[_0x431870(0x2f7)]['clearStateData']=function(_0x105c5a){const _0x145672=_0x431870;if(typeof _0x105c5a!==_0x145672(0x1df))_0x105c5a=_0x105c5a['id'];this[_0x145672(0x391)]=this['_stateData']||{},this[_0x145672(0x391)][_0x105c5a]={};},Game_BattlerBase['prototype']['getStateDisplay']=function(_0x3839c2){const _0x43657c=_0x431870;if(typeof _0x3839c2!==_0x43657c(0x1df))_0x3839c2=_0x3839c2['id'];return this[_0x43657c(0x347)]=this['_stateDisplay']||{},this[_0x43657c(0x347)][_0x3839c2]===undefined&&(this[_0x43657c(0x347)][_0x3839c2]=''),this[_0x43657c(0x347)][_0x3839c2];},Game_BattlerBase[_0x431870(0x2f7)]['setStateDisplay']=function(_0x32e631,_0x3a0c5c){const _0x43fd2b=_0x431870;if(typeof _0x32e631!=='number')_0x32e631=_0x32e631['id'];this['_stateDisplay']=this[_0x43fd2b(0x347)]||{},this[_0x43fd2b(0x347)][_0x32e631]=_0x3a0c5c;},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x274)]=function(_0x44f256){const _0x34ed7a=_0x431870;if(typeof _0x44f256!==_0x34ed7a(0x1df))_0x44f256=_0x44f256['id'];this['_stateDisplay']=this[_0x34ed7a(0x347)]||{},this[_0x34ed7a(0x347)][_0x44f256]='';},Game_BattlerBase['prototype']['getStateOrigin']=function(_0x5eac86){const _0x3c2176=_0x431870;if(typeof _0x5eac86!==_0x3c2176(0x1df))_0x5eac86=_0x5eac86['id'];this['_stateOrigin']=this[_0x3c2176(0x2f3)]||{},this[_0x3c2176(0x2f3)][_0x5eac86]=this[_0x3c2176(0x2f3)][_0x5eac86]||_0x3c2176(0x35b);const _0x9be9e0=this[_0x3c2176(0x2f3)][_0x5eac86];return this[_0x3c2176(0x315)](_0x9be9e0);},Game_BattlerBase['prototype'][_0x431870(0x234)]=function(_0x11390f,_0x4943c5){const _0x37eaa4=_0x431870;this[_0x37eaa4(0x2f3)]=this[_0x37eaa4(0x2f3)]||{};const _0x3b2bea=_0x4943c5?this[_0x37eaa4(0x1f3)](_0x4943c5):this[_0x37eaa4(0x1cb)]();this[_0x37eaa4(0x2f3)][_0x11390f]=_0x3b2bea;},Game_BattlerBase['prototype'][_0x431870(0x3e2)]=function(_0x487082){const _0x474a5b=_0x431870;this[_0x474a5b(0x2f3)]=this[_0x474a5b(0x2f3)]||{},delete this[_0x474a5b(0x2f3)][_0x487082];},Game_BattlerBase['prototype'][_0x431870(0x1cb)]=function(){const _0x35fa22=_0x431870,_0x39da3d=this['getCurrentStateActiveUser']();return this[_0x35fa22(0x1f3)](_0x39da3d);},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x33e)]=function(){const _0x47ec24=_0x431870;if($gameParty[_0x47ec24(0x399)]()){if(BattleManager[_0x47ec24(0x38d)])return BattleManager[_0x47ec24(0x38d)];else{if(BattleManager['_currentActor'])return BattleManager['_currentActor'];}}else{const _0x1b5039=SceneManager[_0x47ec24(0x1c4)];if(![Scene_Map,Scene_Item]['includes'](_0x1b5039[_0x47ec24(0x3ca)]))return $gameParty['menuActor']();}return this;},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x1f3)]=function(_0x16a3cb){const _0x4fd986=_0x431870;if(!_0x16a3cb)return _0x4fd986(0x35b);if(_0x16a3cb[_0x4fd986(0x372)]())return _0x4fd986(0x2f0)[_0x4fd986(0x27e)](_0x16a3cb[_0x4fd986(0x3a7)]());else{const _0x54c299=_0x4fd986(0x2c2)[_0x4fd986(0x27e)](_0x16a3cb[_0x4fd986(0x32c)]()),_0x3cd0f2='<member-%1>'[_0x4fd986(0x27e)](_0x16a3cb[_0x4fd986(0x333)]()),_0x418ef5=_0x4fd986(0x3fa)[_0x4fd986(0x27e)]($gameTroop[_0x4fd986(0x28f)]());return _0x4fd986(0x363)['format'](_0x54c299,_0x3cd0f2,_0x418ef5);}return _0x4fd986(0x35b);},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x315)]=function(_0x53cced){const _0x42dfea=_0x431870;if(_0x53cced===_0x42dfea(0x35b))return this;else{if(_0x53cced[_0x42dfea(0x2f4)](/<actor-(\d+)>/i))return $gameActors['actor'](Number(RegExp['$1']));else{if($gameParty[_0x42dfea(0x399)]()&&_0x53cced[_0x42dfea(0x2f4)](/<troop-(\d+)>/i)){const _0x1cb1f3=Number(RegExp['$1']);if(_0x1cb1f3===$gameTroop[_0x42dfea(0x28f)]()){if(_0x53cced[_0x42dfea(0x2f4)](/<member-(\d+)>/i))return $gameTroop[_0x42dfea(0x31f)]()[Number(RegExp['$1'])];}}if(_0x53cced['match'](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ[_0x431870(0x371)]['Game_Battler_addState']=Game_Battler[_0x431870(0x2f7)][_0x431870(0x264)],Game_Battler['prototype'][_0x431870(0x264)]=function(_0x3afe60){const _0x370d71=_0x431870,_0x2667f5=this[_0x370d71(0x3b6)](_0x3afe60);VisuMZ[_0x370d71(0x371)][_0x370d71(0x1f2)][_0x370d71(0x210)](this,_0x3afe60);if(_0x2667f5&&this['hasState']($dataStates[_0x3afe60])){this[_0x370d71(0x1f8)](_0x3afe60);;}},VisuMZ[_0x431870(0x371)][_0x431870(0x1c1)]=Game_Battler['prototype'][_0x431870(0x3b6)],Game_Battler[_0x431870(0x2f7)][_0x431870(0x3b6)]=function(_0x21c295){const _0x32342a=_0x431870,_0x3b55b3=$dataStates[_0x21c295];if(_0x3b55b3&&_0x3b55b3[_0x32342a(0x3f5)][_0x32342a(0x2f4)](/<NO DEATH CLEAR>/i))return!this['isStateResist'](_0x21c295)&&!this['isStateRestrict'](_0x21c295)&&!this[_0x32342a(0x20d)][_0x32342a(0x332)](_0x21c295);return VisuMZ[_0x32342a(0x371)][_0x32342a(0x1c1)][_0x32342a(0x210)](this,_0x21c295);},Game_Battler['prototype'][_0x431870(0x1f8)]=function(_0x512dcd){const _0x1b784e=_0x431870;this['setStateOrigin'](_0x512dcd),this[_0x1b784e(0x27c)](_0x512dcd),this[_0x1b784e(0x3cb)](_0x512dcd),this[_0x1b784e(0x327)](_0x512dcd),this[_0x1b784e(0x379)](_0x512dcd);},Game_Battler[_0x431870(0x2f7)]['onRemoveState']=function(_0x227b38){const _0x34c48f=_0x431870;this[_0x34c48f(0x342)](_0x227b38),this['onEraseStateGlobalJS'](_0x227b38),Game_BattlerBase[_0x34c48f(0x2f7)][_0x34c48f(0x2bc)][_0x34c48f(0x210)](this,_0x227b38);},Game_Battler[_0x431870(0x2f7)][_0x431870(0x23c)]=function(_0x236e30){const _0x4b3706=_0x431870;for(const _0x160044 of this[_0x4b3706(0x1ad)]()){this[_0x4b3706(0x397)](_0x160044['id'])&&_0x160044['autoRemovalTiming']===_0x236e30&&(this[_0x4b3706(0x395)](_0x160044['id']),this['onExpireState'](_0x160044['id']),this[_0x4b3706(0x1b6)](_0x160044['id']));}},Game_Battler['prototype']['onExpireState']=function(_0x1323d7){const _0x29c49d=_0x431870;this[_0x29c49d(0x1c5)](_0x1323d7);},Game_Battler['prototype'][_0x431870(0x327)]=function(_0x1b7cc1){const _0x1b207a=_0x431870;if(this['_tempActor']||this[_0x1b207a(0x3a8)])return;const _0x5c6cc5=VisuMZ[_0x1b207a(0x371)][_0x1b207a(0x259)];if(_0x5c6cc5[_0x1b7cc1])_0x5c6cc5[_0x1b7cc1][_0x1b207a(0x210)](this,_0x1b7cc1);},Game_Battler['prototype']['onEraseStateCustomJS']=function(_0x3bc460){const _0x4580c2=_0x431870;if(this[_0x4580c2(0x346)]||this[_0x4580c2(0x3a8)])return;const _0xd1d25a=VisuMZ[_0x4580c2(0x371)][_0x4580c2(0x2a6)];if(_0xd1d25a[_0x3bc460])_0xd1d25a[_0x3bc460][_0x4580c2(0x210)](this,_0x3bc460);},Game_Battler[_0x431870(0x2f7)][_0x431870(0x1c5)]=function(_0x35642e){const _0x4945fc=_0x431870;if(this[_0x4945fc(0x346)]||this[_0x4945fc(0x3a8)])return;const _0x18238a=VisuMZ[_0x4945fc(0x371)][_0x4945fc(0x2d0)];if(_0x18238a[_0x35642e])_0x18238a[_0x35642e][_0x4945fc(0x210)](this,_0x35642e);},Game_Battler[_0x431870(0x2f7)][_0x431870(0x379)]=function(_0x13c8a7){const _0xf93f3f=_0x431870;if(this[_0xf93f3f(0x346)]||this['_tempBattler'])return;try{VisuMZ[_0xf93f3f(0x371)]['Settings'][_0xf93f3f(0x33c)][_0xf93f3f(0x218)][_0xf93f3f(0x210)](this,_0x13c8a7);}catch(_0x30c5b5){if($gameTemp[_0xf93f3f(0x2f2)]())console[_0xf93f3f(0x261)](_0x30c5b5);}},Game_Battler[_0x431870(0x2f7)][_0x431870(0x235)]=function(_0x519ed4){const _0x387160=_0x431870;if(this[_0x387160(0x346)]||this[_0x387160(0x3a8)])return;try{VisuMZ[_0x387160(0x371)][_0x387160(0x1f9)]['States'][_0x387160(0x3ee)]['call'](this,_0x519ed4);}catch(_0x26af27){if($gameTemp[_0x387160(0x2f2)]())console[_0x387160(0x261)](_0x26af27);}},Game_Battler[_0x431870(0x2f7)][_0x431870(0x1b6)]=function(_0x57955d){const _0x290931=_0x431870;if(this[_0x290931(0x346)]||this[_0x290931(0x3a8)])return;try{VisuMZ[_0x290931(0x371)][_0x290931(0x1f9)][_0x290931(0x33c)][_0x290931(0x2b4)][_0x290931(0x210)](this,_0x57955d);}catch(_0x33245c){if($gameTemp[_0x290931(0x2f2)]())console['log'](_0x33245c);}},Game_Battler[_0x431870(0x2f7)]['statesByCategory']=function(_0x5d931f){const _0x511511=_0x431870;return _0x5d931f=_0x5d931f[_0x511511(0x3fb)]()[_0x511511(0x1dc)](),this['states']()[_0x511511(0x362)](_0x2aaec4=>_0x2aaec4[_0x511511(0x271)][_0x511511(0x22f)](_0x5d931f));},Game_Battler[_0x431870(0x2f7)][_0x431870(0x29b)]=function(_0x5cfa66,_0xf459cf){const _0x549367=_0x431870;_0x5cfa66=_0x5cfa66[_0x549367(0x3fb)]()[_0x549367(0x1dc)](),_0xf459cf=_0xf459cf||0x0;const _0x1d1903=this[_0x549367(0x19e)](_0x5cfa66),_0x493379=[];for(const _0x673ae of _0x1d1903){if(!_0x673ae)continue;if(_0xf459cf<=0x0)break;_0x493379[_0x549367(0x3a3)](_0x673ae['id']),this['_result']['success']=!![],_0xf459cf--;}while(_0x493379[_0x549367(0x2f9)]>0x0){this[_0x549367(0x395)](_0x493379[_0x549367(0x3ce)]());}},Game_Battler[_0x431870(0x2f7)][_0x431870(0x3a9)]=function(_0x2ca6fb,_0x1c094d){const _0x2fcafc=_0x431870;_0x2ca6fb=_0x2ca6fb[_0x2fcafc(0x3fb)]()[_0x2fcafc(0x1dc)](),_0x1c094d=_0x1c094d||[];const _0x441911=this[_0x2fcafc(0x19e)](_0x2ca6fb),_0x4c4878=[];for(const _0x12b6f8 of _0x441911){if(!_0x12b6f8)continue;if(_0x1c094d[_0x2fcafc(0x22f)](_0x12b6f8))continue;_0x4c4878[_0x2fcafc(0x3a3)](_0x12b6f8['id']),this['_result'][_0x2fcafc(0x337)]=!![];}while(_0x4c4878[_0x2fcafc(0x2f9)]>0x0){this[_0x2fcafc(0x395)](_0x4c4878[_0x2fcafc(0x3ce)]());}},Game_Battler[_0x431870(0x2f7)][_0x431870(0x277)]=function(_0x4e44c0){const _0x236314=_0x431870;return this[_0x236314(0x2e1)](_0x4e44c0)>0x0;},Game_Battler[_0x431870(0x2f7)][_0x431870(0x329)]=function(_0x2cb872){const _0x2050b6=_0x431870;return this[_0x2050b6(0x3b8)](_0x2cb872)>0x0;},Game_Battler['prototype'][_0x431870(0x2e1)]=function(_0x22a808){const _0x1c1895=_0x431870,_0x3c975f=this[_0x1c1895(0x19e)](_0x22a808)[_0x1c1895(0x362)](_0x3b8afe=>this[_0x1c1895(0x270)](_0x3b8afe['id']));return _0x3c975f['length'];},Game_Battler[_0x431870(0x2f7)]['totalStateCategory']=function(_0x5c9519){const _0x1c786f=_0x431870,_0x3b1580=this[_0x1c786f(0x19e)](_0x5c9519);return _0x3b1580[_0x1c786f(0x2f9)];},VisuMZ['SkillsStatesCore'][_0x431870(0x1d2)]=Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x3ab)],Game_BattlerBase['prototype']['isStateResist']=function(_0x4cda3d){const _0x1b2c80=_0x431870,_0x42c112=$dataStates[_0x4cda3d];if(_0x42c112&&_0x42c112[_0x1b2c80(0x271)]['length']>0x0)for(const _0x3a378d of _0x42c112[_0x1b2c80(0x271)]){if(this[_0x1b2c80(0x217)](_0x3a378d))return!![];}return VisuMZ[_0x1b2c80(0x371)][_0x1b2c80(0x1d2)]['call'](this,_0x4cda3d);},Game_BattlerBase['prototype']['isStateCategoryResisted']=function(_0x476c63){const _0x2082af=_0x431870;let _0x19d430='stateCategoriesResisted';if(this[_0x2082af(0x3aa)](_0x19d430))return this[_0x2082af(0x286)][_0x19d430][_0x2082af(0x22f)](_0x476c63);return this[_0x2082af(0x286)][_0x19d430]=this[_0x2082af(0x345)](),this['_cache'][_0x19d430][_0x2082af(0x22f)](_0x476c63);},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x345)]=function(){const _0x4f7fb1=_0x431870,_0x9bac14=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x71b3eb=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x4e9077=[];for(const _0x351506 of this[_0x4f7fb1(0x1f0)]()){if(!_0x351506)continue;const _0x1d7fb7=_0x351506[_0x4f7fb1(0x3f5)],_0x2d240d=_0x1d7fb7[_0x4f7fb1(0x2f4)](_0x9bac14);if(_0x2d240d)for(const _0xf4d174 of _0x2d240d){_0xf4d174['match'](_0x9bac14);const _0x414e34=String(RegExp['$1'])[_0x4f7fb1(0x373)](',')['map'](_0x3d92d2=>String(_0x3d92d2)[_0x4f7fb1(0x3fb)]()[_0x4f7fb1(0x1dc)]());_0x4e9077=_0x4e9077['concat'](_0x414e34);}if(_0x1d7fb7[_0x4f7fb1(0x2f4)](_0x71b3eb)){const _0x87d057=String(RegExp['$1'])[_0x4f7fb1(0x373)](/[\r\n]+/)[_0x4f7fb1(0x211)](_0x439dad=>String(_0x439dad)[_0x4f7fb1(0x3fb)]()[_0x4f7fb1(0x1dc)]());_0x4e9077=_0x4e9077['concat'](_0x87d057);}}return _0x4e9077;},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x27c)]=function(_0x105246){const _0x5b393b=_0x431870,_0x56b062=$dataStates[_0x105246];if(!_0x56b062)return;const _0x471138=_0x56b062['note']||'',_0x1dc446=_0x471138['match'](/<REMOVE OTHER (.*) STATES>/gi);if(_0x1dc446){const _0x290bac=[_0x56b062];for(const _0x1ed95b of _0x1dc446){_0x1ed95b[_0x5b393b(0x2f4)](/<REMOVE OTHER (.*) STATES>/i);const _0x599408=String(RegExp['$1']);this[_0x5b393b(0x3a9)](_0x599408,_0x290bac);}}},VisuMZ['SkillsStatesCore'][_0x431870(0x19a)]=Game_Battler['prototype'][_0x431870(0x352)],Game_Battler[_0x431870(0x2f7)][_0x431870(0x352)]=function(_0x3e716d,_0x5c9269){const _0x42e5cd=_0x431870;VisuMZ[_0x42e5cd(0x371)][_0x42e5cd(0x19a)][_0x42e5cd(0x210)](this,_0x3e716d,_0x5c9269),this[_0x42e5cd(0x2ac)](_0x3e716d)&&this[_0x42e5cd(0x3db)](_0x3e716d,_0x5c9269);},Game_Battler[_0x431870(0x2f7)][_0x431870(0x282)]=function(_0x18036a){},VisuMZ[_0x431870(0x371)]['Game_Battler_addDebuff']=Game_Battler['prototype'][_0x431870(0x215)],Game_Battler[_0x431870(0x2f7)][_0x431870(0x215)]=function(_0x43e21c,_0x5acb33){const _0x3e8dcb=_0x431870;VisuMZ[_0x3e8dcb(0x371)][_0x3e8dcb(0x283)][_0x3e8dcb(0x210)](this,_0x43e21c,_0x5acb33),this['isDebuffAffected'](_0x43e21c)&&this[_0x3e8dcb(0x2fd)](_0x43e21c,_0x5acb33);},Game_Battler[_0x431870(0x2f7)][_0x431870(0x3da)]=function(){const _0x16bdcd=_0x431870;for(let _0x3b0f1a=0x0;_0x3b0f1a<this[_0x16bdcd(0x1ae)]();_0x3b0f1a++){if(this[_0x16bdcd(0x3e9)](_0x3b0f1a)){const _0x5d9b49=this[_0x16bdcd(0x2ee)][_0x3b0f1a];this[_0x16bdcd(0x254)](_0x3b0f1a);if(_0x5d9b49>0x0)this['onExpireBuff'](_0x3b0f1a);if(_0x5d9b49<0x0)this[_0x16bdcd(0x2c9)](_0x3b0f1a);}}},Game_Battler['prototype']['onAddBuff']=function(_0x50b465,_0x4eab35){this['onAddBuffGlobalJS'](_0x50b465,_0x4eab35);},Game_Battler[_0x431870(0x2f7)]['onAddDebuff']=function(_0x411be9,_0x35d837){this['onAddDebuffGlobalJS'](_0x411be9,_0x35d837);},Game_Battler[_0x431870(0x2f7)][_0x431870(0x205)]=function(_0x3f916f){const _0x257833=_0x431870;Game_BattlerBase[_0x257833(0x2f7)][_0x257833(0x205)]['call'](this,_0x3f916f),this['onEraseBuffGlobalJS'](_0x3f916f);},Game_Battler[_0x431870(0x2f7)]['onEraseDebuff']=function(_0x1d0a0f){const _0x2f519d=_0x431870;Game_BattlerBase[_0x2f519d(0x2f7)][_0x2f519d(0x1ff)][_0x2f519d(0x210)](this,_0x1d0a0f),this[_0x2f519d(0x207)](_0x1d0a0f);},Game_Battler['prototype'][_0x431870(0x34c)]=function(_0xbefe28){this['onExpireBuffGlobalJS'](_0xbefe28);},Game_Battler['prototype']['onExpireDebuff']=function(_0x55b7a0){this['onExpireDebuffGlobalJS'](_0x55b7a0);},Game_Battler[_0x431870(0x2f7)]['onAddBuffGlobalJS']=function(_0x12b795,_0x5d7c08){const _0x24b19c=_0x431870;VisuMZ['SkillsStatesCore'][_0x24b19c(0x1f9)]['Buffs']['onAddBuffJS'][_0x24b19c(0x210)](this,_0x12b795,_0x5d7c08);},Game_Battler['prototype']['onAddDebuffGlobalJS']=function(_0x1ecf00,_0x1639a3){const _0x27b775=_0x431870;VisuMZ[_0x27b775(0x371)][_0x27b775(0x1f9)][_0x27b775(0x3f2)][_0x27b775(0x1a2)][_0x27b775(0x210)](this,_0x1ecf00,_0x1639a3);},Game_BattlerBase['prototype'][_0x431870(0x297)]=function(_0x1337c4){const _0x22fbe9=_0x431870;VisuMZ['SkillsStatesCore'][_0x22fbe9(0x1f9)][_0x22fbe9(0x3f2)][_0x22fbe9(0x388)][_0x22fbe9(0x210)](this,_0x1337c4);},Game_BattlerBase[_0x431870(0x2f7)][_0x431870(0x207)]=function(_0x837679){const _0x321c9c=_0x431870;VisuMZ[_0x321c9c(0x371)][_0x321c9c(0x1f9)][_0x321c9c(0x3f2)][_0x321c9c(0x2d7)][_0x321c9c(0x210)](this,_0x837679);},Game_Battler[_0x431870(0x2f7)][_0x431870(0x269)]=function(_0xa0f883){const _0x372649=_0x431870;VisuMZ['SkillsStatesCore'][_0x372649(0x1f9)]['Buffs'][_0x372649(0x1f5)][_0x372649(0x210)](this,_0xa0f883);},Game_Battler[_0x431870(0x2f7)][_0x431870(0x294)]=function(_0x3ed958){const _0x3a572a=_0x431870;VisuMZ['SkillsStatesCore'][_0x3a572a(0x1f9)][_0x3a572a(0x3f2)][_0x3a572a(0x280)][_0x3a572a(0x210)](this,_0x3ed958);},Game_Battler[_0x431870(0x2f7)][_0x431870(0x3cb)]=function(_0xfb89a){const _0x5e04c1=_0x431870,_0x3cd901=VisuMZ['SkillsStatesCore'],_0x5e9469=['stateHpSlipDamageJS',_0x5e04c1(0x323),_0x5e04c1(0x356),_0x5e04c1(0x1de),_0x5e04c1(0x35e),_0x5e04c1(0x2b7)];for(const _0x467e1f of _0x5e9469){_0x3cd901[_0x467e1f][_0xfb89a]&&_0x3cd901[_0x467e1f][_0xfb89a]['call'](this,_0xfb89a);}},VisuMZ[_0x431870(0x371)][_0x431870(0x1c3)]=Game_Battler['prototype'][_0x431870(0x2a3)],Game_Battler[_0x431870(0x2f7)][_0x431870(0x2a3)]=function(){const _0x367e8f=_0x431870;this[_0x367e8f(0x1a8)](),VisuMZ[_0x367e8f(0x371)][_0x367e8f(0x1c3)][_0x367e8f(0x210)](this),this[_0x367e8f(0x350)](),this['regenerateAllSkillsStatesCore']();},Game_Battler[_0x431870(0x2f7)]['setPassiveStateSlipDamageJS']=function(){const _0x4f1dd6=_0x431870;for(const _0x3a1a5c of this[_0x4f1dd6(0x243)]()){if(!_0x3a1a5c)continue;this[_0x4f1dd6(0x3cb)](_0x3a1a5c['id']);}},Game_Battler['prototype'][_0x431870(0x1a8)]=function(){const _0x352849=_0x431870;for(const _0x379421 of this[_0x352849(0x1ad)]()){if(!_0x379421)continue;_0x379421[_0x352849(0x3f5)]['match'](/<JS SLIP REFRESH>/i)&&this[_0x352849(0x3cb)](_0x379421['id']);}},Game_Battler['prototype'][_0x431870(0x35f)]=function(){const _0x31fe5a=_0x431870;if(!this[_0x31fe5a(0x260)]())return;const _0x9f5fbe=this[_0x31fe5a(0x1ad)]();for(const _0x48642c of _0x9f5fbe){if(!_0x48642c)continue;this[_0x31fe5a(0x1a0)](_0x48642c);}},Game_Battler[_0x431870(0x2f7)][_0x431870(0x1a0)]=function(_0x569211){const _0x17b663=_0x431870,_0xe7f3b8=this[_0x17b663(0x374)](_0x569211['id'],_0x17b663(0x1b1))||0x0,_0x25aaed=-this[_0x17b663(0x18d)](),_0xe011d8=Math['max'](_0xe7f3b8,_0x25aaed);if(_0xe011d8!==0x0){const _0xc5fdd=this['_result']['hpDamage']||0x0;this[_0x17b663(0x2fc)](_0xe011d8),this[_0x17b663(0x20d)]['hpDamage']+=_0xc5fdd;}const _0x4fd9a9=this[_0x17b663(0x374)](_0x569211['id'],_0x17b663(0x230))||0x0;if(_0x4fd9a9!==0x0){const _0x2d7859=this[_0x17b663(0x20d)][_0x17b663(0x30c)]||0x0;this['gainMp'](_0x4fd9a9),this['_result'][_0x17b663(0x30c)]+=_0x2d7859;}const _0x39a27c=this[_0x17b663(0x374)](_0x569211['id'],_0x17b663(0x27a))||0x0;_0x39a27c!==0x0&&this[_0x17b663(0x38c)](_0x39a27c);},VisuMZ['SkillsStatesCore'][_0x431870(0x2dc)]=Game_Actor[_0x431870(0x2f7)][_0x431870(0x244)],Game_Actor[_0x431870(0x2f7)][_0x431870(0x244)]=function(){const _0x1fbfa7=_0x431870,_0x396e7c=VisuMZ['SkillsStatesCore'][_0x1fbfa7(0x2dc)][_0x1fbfa7(0x210)](this),_0x50af07=VisuMZ[_0x1fbfa7(0x371)][_0x1fbfa7(0x1f9)]['Skills'];let _0x28e842=_0x50af07[_0x1fbfa7(0x1f7)];return $gameParty[_0x1fbfa7(0x399)]()&&(_0x28e842=_0x28e842[_0x1fbfa7(0x3ed)](_0x50af07['BattleHiddenSkillTypes'])),_0x396e7c[_0x1fbfa7(0x362)](_0x105bf3=>!_0x28e842[_0x1fbfa7(0x22f)](_0x105bf3));},Game_Actor['prototype'][_0x431870(0x23f)]=function(){const _0x2dc372=_0x431870;return this['skills']()[_0x2dc372(0x362)](_0x43d679=>this[_0x2dc372(0x2e9)](_0x43d679));},Game_Actor[_0x431870(0x2f7)][_0x431870(0x2e9)]=function(_0x1c6c34){const _0x27ae3f=_0x431870;if(!this[_0x27ae3f(0x252)](_0x1c6c34))return![];if(!_0x1c6c34)return![];if(!this[_0x27ae3f(0x3ae)](_0x1c6c34))return![];if(this[_0x27ae3f(0x37d)](_0x1c6c34))return![];return!![];},Game_Actor[_0x431870(0x2f7)][_0x431870(0x3ae)]=function(_0x172740){const _0x136a21=_0x431870,_0x41ff45=this[_0x136a21(0x244)](),_0x48a63b=DataManager['getSkillTypes'](_0x172740),_0xc59482=_0x41ff45['filter'](_0x1a7deb=>_0x48a63b[_0x136a21(0x22f)](_0x1a7deb));return _0xc59482['length']>0x0;},Game_Actor['prototype'][_0x431870(0x37d)]=function(_0x46c689){const _0x3ce1bb=_0x431870;if(!VisuMZ[_0x3ce1bb(0x371)]['CheckVisibleBattleNotetags'](this,_0x46c689))return!![];if(!VisuMZ[_0x3ce1bb(0x371)][_0x3ce1bb(0x3eb)](this,_0x46c689))return!![];if(!VisuMZ[_0x3ce1bb(0x371)][_0x3ce1bb(0x26b)](this,_0x46c689))return!![];return![];},Game_Actor['prototype'][_0x431870(0x3f3)]=function(){const _0x26e300=_0x431870;let _0x4b6750=[this['actor'](),this[_0x26e300(0x1c2)]()];_0x4b6750=_0x4b6750['concat'](this[_0x26e300(0x2c4)]()[_0x26e300(0x362)](_0x311173=>_0x311173));for(const _0x32e8a2 of this[_0x26e300(0x187)]){const _0x25f906=$dataSkills[_0x32e8a2];if(_0x25f906)_0x4b6750['push'](_0x25f906);}return _0x4b6750;},Game_Actor[_0x431870(0x2f7)][_0x431870(0x191)]=function(){const _0x3c6c1c=_0x431870;Game_Battler[_0x3c6c1c(0x2f7)][_0x3c6c1c(0x191)][_0x3c6c1c(0x210)](this);const _0x3d03bf=VisuMZ[_0x3c6c1c(0x371)]['Settings']['PassiveStates'][_0x3c6c1c(0x387)];this[_0x3c6c1c(0x286)][_0x3c6c1c(0x243)]=this['_cache'][_0x3c6c1c(0x243)][_0x3c6c1c(0x3ed)](_0x3d03bf);},VisuMZ[_0x431870(0x371)][_0x431870(0x2b3)]=Game_Actor['prototype'][_0x431870(0x1b8)],Game_Actor[_0x431870(0x2f7)][_0x431870(0x1b8)]=function(_0x1a7850){const _0x5d7db0=_0x431870;VisuMZ[_0x5d7db0(0x371)][_0x5d7db0(0x2b3)][_0x5d7db0(0x210)](this,_0x1a7850),this[_0x5d7db0(0x286)]={},this['passiveStates']();},VisuMZ[_0x431870(0x371)][_0x431870(0x39b)]=Game_Actor[_0x431870(0x2f7)]['forgetSkill'],Game_Actor[_0x431870(0x2f7)][_0x431870(0x2e4)]=function(_0x220d90){const _0x2b2aec=_0x431870;VisuMZ[_0x2b2aec(0x371)][_0x2b2aec(0x39b)][_0x2b2aec(0x210)](this,_0x220d90),this['_cache']={},this[_0x2b2aec(0x243)]();},Game_Actor['prototype']['stepsForTurn']=function(){const _0x478a5a=_0x431870;return VisuMZ[_0x478a5a(0x371)][_0x478a5a(0x1f9)][_0x478a5a(0x33c)]['TurnEndOnMap']??0x14;},Game_Enemy['prototype'][_0x431870(0x3f3)]=function(){const _0x41dc1b=_0x431870;let _0x2fb7d6=[this[_0x41dc1b(0x3b3)]()];return _0x2fb7d6['concat'](this['skills']());},Game_Enemy[_0x431870(0x2f7)][_0x431870(0x191)]=function(){const _0xc84c3e=_0x431870;Game_Battler[_0xc84c3e(0x2f7)]['addPassiveStatesByPluginParameters']['call'](this);const _0xa81ceb=VisuMZ[_0xc84c3e(0x371)]['Settings'][_0xc84c3e(0x34b)][_0xc84c3e(0x27f)];this[_0xc84c3e(0x286)]['passiveStates']=this[_0xc84c3e(0x286)]['passiveStates'][_0xc84c3e(0x3ed)](_0xa81ceb);},Game_Enemy[_0x431870(0x2f7)]['skills']=function(){const _0x40f5fb=_0x431870,_0x44edc1=[];for(const _0x39a4f7 of this['enemy']()[_0x40f5fb(0x2d6)]){const _0x50eb4e=$dataSkills[_0x39a4f7['skillId']];if(_0x50eb4e&&!_0x44edc1[_0x40f5fb(0x22f)](_0x50eb4e))_0x44edc1[_0x40f5fb(0x3a3)](_0x50eb4e);}return _0x44edc1;},Game_Enemy[_0x431870(0x2f7)][_0x431870(0x1d7)]=function(_0x4a8d46){return this['hasState']($dataStates[_0x4a8d46]);},VisuMZ[_0x431870(0x371)][_0x431870(0x37a)]=Game_Unit[_0x431870(0x2f7)]['isAllDead'],Game_Unit[_0x431870(0x2f7)][_0x431870(0x3e1)]=function(){const _0xda6c6=_0x431870;if(this[_0xda6c6(0x293)]())return!![];return VisuMZ['SkillsStatesCore'][_0xda6c6(0x37a)][_0xda6c6(0x210)](this);},Game_Unit[_0x431870(0x2f7)]['isPartyAllAffectedByGroupDefeatStates']=function(){const _0x2c9c6a=_0x431870,_0x56045c=this[_0x2c9c6a(0x1b0)]();for(const _0xed4f47 of _0x56045c){if(!_0xed4f47['isGroupDefeatStateAffected']())return![];}return!![];},VisuMZ[_0x431870(0x371)][_0x431870(0x247)]=Game_Troop[_0x431870(0x2f7)]['setup'],Game_Troop[_0x431870(0x2f7)]['setup']=function(_0x25f5b5){const _0x1f79a8=_0x431870;VisuMZ[_0x1f79a8(0x371)][_0x1f79a8(0x247)][_0x1f79a8(0x210)](this,_0x25f5b5),this[_0x1f79a8(0x266)]();},Game_Troop[_0x431870(0x2f7)][_0x431870(0x266)]=function(){const _0x91e645=_0x431870;this[_0x91e645(0x18c)]=Graphics[_0x91e645(0x1b2)];},Game_Troop['prototype'][_0x431870(0x28f)]=function(){const _0x25b1d0=_0x431870;return this[_0x25b1d0(0x18c)]=this[_0x25b1d0(0x18c)]||Graphics[_0x25b1d0(0x1b2)],this[_0x25b1d0(0x18c)];},Scene_Skill[_0x431870(0x2f7)]['isBottomHelpMode']=function(){const _0x1e0e3a=_0x431870;if(ConfigManager[_0x1e0e3a(0x2e0)]&&ConfigManager[_0x1e0e3a(0x242)]!==undefined)return ConfigManager[_0x1e0e3a(0x242)];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x1e0e3a(0x2df)]()['match'](/LOWER/i);else Scene_ItemBase['prototype'][_0x1e0e3a(0x262)][_0x1e0e3a(0x210)](this);}},Scene_Skill[_0x431870(0x2f7)][_0x431870(0x262)]=function(){const _0x46f881=_0x431870;if(ConfigManager[_0x46f881(0x2e0)]&&ConfigManager[_0x46f881(0x1bd)]!==undefined)return ConfigManager[_0x46f881(0x1bd)];else return this[_0x46f881(0x3be)]()?this[_0x46f881(0x2df)]()[_0x46f881(0x2f4)](/RIGHT/i):Scene_ItemBase[_0x46f881(0x2f7)][_0x46f881(0x262)][_0x46f881(0x210)](this);},Scene_Skill['prototype'][_0x431870(0x2df)]=function(){const _0x2271f0=_0x431870;return VisuMZ['SkillsStatesCore'][_0x2271f0(0x1f9)][_0x2271f0(0x2ae)][_0x2271f0(0x2c1)];},Scene_Skill['prototype'][_0x431870(0x3e0)]=function(){const _0xe138db=_0x431870;return this[_0xe138db(0x2d2)]&&this[_0xe138db(0x2d2)][_0xe138db(0x3e0)]();},Scene_Skill['prototype'][_0x431870(0x3be)]=function(){const _0x352932=_0x431870;return VisuMZ[_0x352932(0x371)]['Settings'][_0x352932(0x2ae)][_0x352932(0x3b7)];},VisuMZ[_0x431870(0x371)][_0x431870(0x317)]=Scene_Skill[_0x431870(0x2f7)][_0x431870(0x3c0)],Scene_Skill[_0x431870(0x2f7)][_0x431870(0x3c0)]=function(){const _0x917294=_0x431870;return this[_0x917294(0x3be)]()?this['helpWindowRectSkillsStatesCore']():VisuMZ[_0x917294(0x371)][_0x917294(0x317)][_0x917294(0x210)](this);},Scene_Skill[_0x431870(0x2f7)][_0x431870(0x19d)]=function(){const _0x2b4393=_0x431870,_0x7ebd2=0x0,_0x21594d=this[_0x2b4393(0x1b5)](),_0x1a3fad=Graphics[_0x2b4393(0x2a4)],_0x224516=this[_0x2b4393(0x199)]();return new Rectangle(_0x7ebd2,_0x21594d,_0x1a3fad,_0x224516);},VisuMZ[_0x431870(0x371)]['Scene_Skill_skillTypeWindowRect']=Scene_Skill[_0x431870(0x2f7)][_0x431870(0x2b1)],Scene_Skill['prototype']['skillTypeWindowRect']=function(){const _0x529b36=_0x431870;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x529b36(0x2c5)]():VisuMZ['SkillsStatesCore'][_0x529b36(0x246)][_0x529b36(0x210)](this);},Scene_Skill[_0x431870(0x2f7)]['mainCommandWidth']=function(){const _0x2d1c59=_0x431870;return VisuMZ[_0x2d1c59(0x371)][_0x2d1c59(0x1f9)]['Skills'][_0x2d1c59(0x305)]??Scene_MenuBase[_0x2d1c59(0x2f7)][_0x2d1c59(0x30f)][_0x2d1c59(0x210)](this);},Scene_Skill[_0x431870(0x2f7)]['skillTypeWindowRectSkillsStatesCore']=function(){const _0x5055d5=_0x431870,_0xa5d62e=this[_0x5055d5(0x30f)](),_0x55637b=this[_0x5055d5(0x2b8)](0x3,!![]),_0x175743=this[_0x5055d5(0x262)]()?Graphics[_0x5055d5(0x2a4)]-_0xa5d62e:0x0,_0xd606e1=this[_0x5055d5(0x248)]();return new Rectangle(_0x175743,_0xd606e1,_0xa5d62e,_0x55637b);},VisuMZ[_0x431870(0x371)]['Scene_Skill_statusWindowRect']=Scene_Skill['prototype'][_0x431870(0x1da)],Scene_Skill[_0x431870(0x2f7)][_0x431870(0x1da)]=function(){const _0x1cb914=_0x431870;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x1cb914(0x3ef)]():VisuMZ[_0x1cb914(0x371)][_0x1cb914(0x313)][_0x1cb914(0x210)](this);},Scene_Skill[_0x431870(0x2f7)][_0x431870(0x3ef)]=function(){const _0x203be7=_0x431870,_0x5135af=Graphics[_0x203be7(0x2a4)]-this[_0x203be7(0x30f)](),_0x4e1416=this['_skillTypeWindow'][_0x203be7(0x239)],_0x3efb91=this[_0x203be7(0x262)]()?0x0:Graphics['boxWidth']-_0x5135af,_0xa53b6c=this['mainAreaTop']();return new Rectangle(_0x3efb91,_0xa53b6c,_0x5135af,_0x4e1416);},VisuMZ[_0x431870(0x371)][_0x431870(0x398)]=Scene_Skill[_0x431870(0x2f7)]['createItemWindow'],Scene_Skill[_0x431870(0x2f7)][_0x431870(0x1fc)]=function(){const _0xf14b5d=_0x431870;VisuMZ[_0xf14b5d(0x371)]['Scene_Skill_createItemWindow'][_0xf14b5d(0x210)](this),this[_0xf14b5d(0x3d5)]()&&this[_0xf14b5d(0x2be)]();},VisuMZ['SkillsStatesCore'][_0x431870(0x263)]=Scene_Skill[_0x431870(0x2f7)][_0x431870(0x27d)],Scene_Skill[_0x431870(0x2f7)][_0x431870(0x27d)]=function(){const _0x145511=_0x431870;if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x145511(0x3d3)]();else{const _0x873022=VisuMZ[_0x145511(0x371)]['Scene_Skill_itemWindowRect'][_0x145511(0x210)](this);return this[_0x145511(0x3d5)]()&&this[_0x145511(0x3e6)]()&&(_0x873022[_0x145511(0x289)]-=this['shopStatusWidth']()),_0x873022;}},Scene_Skill['prototype'][_0x431870(0x3d3)]=function(){const _0x2edfe2=_0x431870,_0x244fbf=Graphics['boxWidth']-this[_0x2edfe2(0x1fe)](),_0x32837f=this[_0x2edfe2(0x1f1)]()-this['_statusWindow'][_0x2edfe2(0x239)],_0xd9039=this[_0x2edfe2(0x262)]()?Graphics['boxWidth']-_0x244fbf:0x0,_0x16d151=this[_0x2edfe2(0x197)]['y']+this[_0x2edfe2(0x197)][_0x2edfe2(0x239)];return new Rectangle(_0xd9039,_0x16d151,_0x244fbf,_0x32837f);},Scene_Skill[_0x431870(0x2f7)]['allowCreateShopStatusWindow']=function(){const _0x326fd2=_0x431870;if(!Imported[_0x326fd2(0x229)])return![];else return this[_0x326fd2(0x3be)]()?!![]:VisuMZ[_0x326fd2(0x371)][_0x326fd2(0x1f9)]['Skills'][_0x326fd2(0x36c)];},Scene_Skill['prototype'][_0x431870(0x3e6)]=function(){const _0x3cf307=_0x431870;return VisuMZ[_0x3cf307(0x371)][_0x3cf307(0x1f9)]['Skills'][_0x3cf307(0x186)];},Scene_Skill[_0x431870(0x2f7)]['createShopStatusWindow']=function(){const _0x54d2b1=_0x431870,_0x3a0661=this['shopStatusWindowRect']();this[_0x54d2b1(0x302)]=new Window_ShopStatus(_0x3a0661),this[_0x54d2b1(0x19f)](this[_0x54d2b1(0x302)]),this[_0x54d2b1(0x236)][_0x54d2b1(0x18f)](this[_0x54d2b1(0x302)]);const _0x2deefa=VisuMZ['SkillsStatesCore'][_0x54d2b1(0x1f9)][_0x54d2b1(0x2ae)]['SkillSceneStatusBgType'];this[_0x54d2b1(0x302)]['setBackgroundType'](_0x2deefa||0x0);},Scene_Skill[_0x431870(0x2f7)]['shopStatusWindowRect']=function(){const _0x5df89c=_0x431870;return this[_0x5df89c(0x3be)]()?this[_0x5df89c(0x2a8)]():VisuMZ[_0x5df89c(0x371)]['Settings'][_0x5df89c(0x2ae)][_0x5df89c(0x32d)][_0x5df89c(0x210)](this);},Scene_Skill[_0x431870(0x2f7)]['shopStatusWindowRectSkillsStatesCore']=function(){const _0x4cf024=_0x431870,_0x31bd44=this[_0x4cf024(0x1fe)](),_0x30584e=this[_0x4cf024(0x236)]['height'],_0x4f52d1=this['isRightInputMode']()?0x0:Graphics['boxWidth']-this[_0x4cf024(0x1fe)](),_0x2580df=this['_itemWindow']['y'];return new Rectangle(_0x4f52d1,_0x2580df,_0x31bd44,_0x30584e);},Scene_Skill['prototype']['shopStatusWidth']=function(){const _0x12d6a0=_0x431870;return Imported[_0x12d6a0(0x229)]?Scene_Shop[_0x12d6a0(0x2f7)][_0x12d6a0(0x336)]():0x0;},Scene_Skill[_0x431870(0x2f7)][_0x431870(0x386)]=function(){const _0x28a73b=_0x431870;return this[_0x28a73b(0x33b)]&&this['_skillTypeWindow'][_0x28a73b(0x368)]?TextManager['buttonAssistSwitch']:'';},VisuMZ['SkillsStatesCore']['Sprite_Gauge_initMembers']=Sprite_Gauge[_0x431870(0x2f7)]['initMembers'],Sprite_Gauge['prototype'][_0x431870(0x1ec)]=function(){const _0x1a2816=_0x431870;VisuMZ['SkillsStatesCore']['Sprite_Gauge_initMembers'][_0x1a2816(0x210)](this),this[_0x1a2816(0x3e3)]=null;},VisuMZ[_0x431870(0x371)][_0x431870(0x328)]=Sprite_Gauge['prototype']['setup'],Sprite_Gauge[_0x431870(0x2f7)]['setup']=function(_0x1e4135,_0x24f5a5){const _0x581215=_0x431870;this['setupSkillsStatesCore'](_0x1e4135,_0x24f5a5),_0x24f5a5=_0x24f5a5[_0x581215(0x3c1)](),VisuMZ[_0x581215(0x371)]['Sprite_Gauge_setup']['call'](this,_0x1e4135,_0x24f5a5);},Sprite_Gauge['prototype'][_0x431870(0x325)]=function(_0x438282,_0x5a16a2){const _0x1bf04c=_0x431870,_0x596655=VisuMZ[_0x1bf04c(0x371)][_0x1bf04c(0x1f9)][_0x1bf04c(0x311)][_0x1bf04c(0x362)](_0x55281f=>_0x55281f[_0x1bf04c(0x1d4)]['toUpperCase']()===_0x5a16a2[_0x1bf04c(0x3fb)]());_0x596655[_0x1bf04c(0x2f9)]>=0x1?this['_costSettings']=_0x596655[0x0]:this[_0x1bf04c(0x3e3)]=null;},VisuMZ[_0x431870(0x371)][_0x431870(0x25d)]=Sprite_Gauge['prototype']['currentValue'],Sprite_Gauge[_0x431870(0x2f7)][_0x431870(0x1f4)]=function(){const _0x2c081f=_0x431870;return this[_0x2c081f(0x2ec)]&&this[_0x2c081f(0x3e3)]?this[_0x2c081f(0x232)]():VisuMZ[_0x2c081f(0x371)][_0x2c081f(0x25d)][_0x2c081f(0x210)](this);},Sprite_Gauge[_0x431870(0x2f7)][_0x431870(0x232)]=function(){const _0x5e6eb3=_0x431870;return this[_0x5e6eb3(0x3e3)]['GaugeCurrentJS'][_0x5e6eb3(0x210)](this[_0x5e6eb3(0x2ec)]);},VisuMZ[_0x431870(0x371)][_0x431870(0x1a4)]=Sprite_Gauge[_0x431870(0x2f7)][_0x431870(0x3c7)],Sprite_Gauge[_0x431870(0x2f7)][_0x431870(0x3c7)]=function(){const _0x178589=_0x431870;return this[_0x178589(0x2ec)]&&this[_0x178589(0x3e3)]?this[_0x178589(0x33d)]():VisuMZ[_0x178589(0x371)][_0x178589(0x1a4)][_0x178589(0x210)](this);},Sprite_Gauge['prototype'][_0x431870(0x33d)]=function(){const _0x4693fe=_0x431870;return this[_0x4693fe(0x3e3)][_0x4693fe(0x3bb)][_0x4693fe(0x210)](this[_0x4693fe(0x2ec)]);},VisuMZ[_0x431870(0x371)][_0x431870(0x326)]=Sprite_Gauge[_0x431870(0x2f7)][_0x431870(0x29a)],Sprite_Gauge[_0x431870(0x2f7)][_0x431870(0x29a)]=function(){const _0x323f09=_0x431870,_0x5d5bf4=VisuMZ['SkillsStatesCore'][_0x323f09(0x326)][_0x323f09(0x210)](this);return _0x5d5bf4[_0x323f09(0x212)](0x0,0x1);},VisuMZ[_0x431870(0x371)][_0x431870(0x3a2)]=Sprite_Gauge[_0x431870(0x2f7)][_0x431870(0x3c5)],Sprite_Gauge[_0x431870(0x2f7)][_0x431870(0x3c5)]=function(){const _0x117ed6=_0x431870;this[_0x117ed6(0x2ec)]&&this['_costSettings']?(this[_0x117ed6(0x2e8)]['clear'](),this[_0x117ed6(0x1cf)]()):VisuMZ[_0x117ed6(0x371)][_0x117ed6(0x3a2)][_0x117ed6(0x210)](this);},Sprite_Gauge[_0x431870(0x2f7)][_0x431870(0x276)]=function(){const _0x2c4242=_0x431870;let _0x5aaf0c=this[_0x2c4242(0x1f4)]();return Imported[_0x2c4242(0x3d9)]&&this[_0x2c4242(0x1d1)]()&&(_0x5aaf0c=VisuMZ[_0x2c4242(0x3bf)](_0x5aaf0c)),_0x5aaf0c;},Sprite_Gauge[_0x431870(0x2f7)][_0x431870(0x1cf)]=function(){const _0x11e69e=_0x431870;this[_0x11e69e(0x2e8)]['clear'](),this[_0x11e69e(0x3e3)][_0x11e69e(0x36a)]['call'](this);},Sprite_Gauge[_0x431870(0x2f7)][_0x431870(0x281)]=function(_0x29661a,_0x2e1029,_0x541c13,_0x3310f5,_0x28725f,_0xded73a){const _0x42e525=_0x431870,_0x3faf92=this[_0x42e525(0x29a)](),_0x266471=Math[_0x42e525(0x20a)]((_0x28725f-0x2)*_0x3faf92),_0x968166=_0xded73a-0x2,_0x4a2a2f=this[_0x42e525(0x33a)]();this['bitmap']['fillRect'](_0x541c13,_0x3310f5,_0x28725f,_0xded73a,_0x4a2a2f),this[_0x42e525(0x2e8)][_0x42e525(0x1c7)](_0x541c13+0x1,_0x3310f5+0x1,_0x266471,_0x968166,_0x29661a,_0x2e1029);},Sprite_Gauge[_0x431870(0x2f7)]['labelFontFace']=function(){const _0x444b9a=_0x431870,_0x55c8b2=VisuMZ['SkillsStatesCore'][_0x444b9a(0x1f9)][_0x444b9a(0x3f8)];return _0x55c8b2[_0x444b9a(0x1be)]===_0x444b9a(0x1df)?$gameSystem['numberFontFace']():$gameSystem[_0x444b9a(0x2dd)]();},Sprite_Gauge[_0x431870(0x2f7)][_0x431870(0x303)]=function(){const _0x457aee=_0x431870,_0x117ea0=VisuMZ[_0x457aee(0x371)]['Settings']['Gauge'];return _0x117ea0[_0x457aee(0x1be)]==='number'?$gameSystem[_0x457aee(0x2eb)]()-0x6:$gameSystem[_0x457aee(0x2eb)]()-0x2;},Sprite_Gauge[_0x431870(0x2f7)]['valueFontFace']=function(){const _0x1e6c1e=_0x431870,_0x5699cd=VisuMZ[_0x1e6c1e(0x371)]['Settings'][_0x1e6c1e(0x3f8)];return _0x5699cd['ValueFontMainType']===_0x1e6c1e(0x1df)?$gameSystem[_0x1e6c1e(0x359)]():$gameSystem['mainFontFace']();},Sprite_Gauge[_0x431870(0x2f7)][_0x431870(0x253)]=function(){const _0x1c8dc5=_0x431870,_0x2ce9dc=VisuMZ[_0x1c8dc5(0x371)][_0x1c8dc5(0x1f9)]['Gauge'];return _0x2ce9dc[_0x1c8dc5(0x1ac)]===_0x1c8dc5(0x1df)?$gameSystem[_0x1c8dc5(0x2eb)]()-0x6:$gameSystem[_0x1c8dc5(0x2eb)]()-0x2;},Sprite_Gauge[_0x431870(0x2f7)][_0x431870(0x238)]=function(){const _0xee1e76=_0x431870,_0x2d6441=VisuMZ[_0xee1e76(0x371)][_0xee1e76(0x1f9)][_0xee1e76(0x3f8)];if(_0x2d6441['MatchLabelColor']){if(_0x2d6441[_0xee1e76(0x3d0)]===0x1)return this[_0xee1e76(0x320)]();else{if(_0x2d6441[_0xee1e76(0x3d0)]===0x2)return this[_0xee1e76(0x221)]();}}const _0x46df5d=_0x2d6441[_0xee1e76(0x35a)];return ColorManager[_0xee1e76(0x310)](_0x46df5d);},Sprite_Gauge[_0x431870(0x2f7)][_0x431870(0x19c)]=function(){const _0x26b9de=_0x431870,_0x4b3278=VisuMZ[_0x26b9de(0x371)][_0x26b9de(0x1f9)][_0x26b9de(0x3f8)];if(this[_0x26b9de(0x3d8)]()<=0x0)return _0x26b9de(0x29c);else return _0x4b3278[_0x26b9de(0x3e8)]?'rgba(0,\x200,\x200,\x201)':ColorManager[_0x26b9de(0x35d)]();},Sprite_Gauge[_0x431870(0x2f7)]['labelOutlineWidth']=function(){const _0x5b1d26=_0x431870;return VisuMZ[_0x5b1d26(0x371)][_0x5b1d26(0x1f9)]['Gauge']['LabelOutlineWidth']||0x0;},Sprite_Gauge[_0x431870(0x2f7)][_0x431870(0x231)]=function(){const _0x30fb87=_0x431870,_0x1aa39f=VisuMZ[_0x30fb87(0x371)]['Settings'][_0x30fb87(0x3f8)];if(this['valueOutlineWidth']()<=0x0)return'rgba(0,\x200,\x200,\x200)';else return _0x1aa39f[_0x30fb87(0x190)]?_0x30fb87(0x321):ColorManager[_0x30fb87(0x35d)]();},Sprite_Gauge[_0x431870(0x2f7)][_0x431870(0x2cf)]=function(){const _0x4fab93=_0x431870;return VisuMZ[_0x4fab93(0x371)][_0x4fab93(0x1f9)][_0x4fab93(0x3f8)][_0x4fab93(0x1cc)]||0x0;},VisuMZ[_0x431870(0x371)][_0x431870(0x1a5)]=Sprite_StateIcon['prototype'][_0x431870(0x369)],Sprite_StateIcon['prototype']['loadBitmap']=function(){const _0x1997de=_0x431870;VisuMZ[_0x1997de(0x371)][_0x1997de(0x1a5)][_0x1997de(0x210)](this),this[_0x1997de(0x306)]();},Sprite_StateIcon[_0x431870(0x2f7)]['createTurnDisplaySprite']=function(){const _0x510115=_0x431870,_0x40fd76=Window_Base[_0x510115(0x2f7)][_0x510115(0x338)]();this[_0x510115(0x219)]=new Sprite(),this[_0x510115(0x219)][_0x510115(0x2e8)]=new Bitmap(ImageManager['iconWidth'],_0x40fd76),this[_0x510115(0x219)][_0x510115(0x2e3)]['x']=this['anchor']['x'],this['_turnDisplaySprite'][_0x510115(0x2e3)]['y']=this['anchor']['y'],this[_0x510115(0x382)](this[_0x510115(0x219)]),this[_0x510115(0x28c)]=this[_0x510115(0x219)][_0x510115(0x2e8)];},VisuMZ['SkillsStatesCore'][_0x431870(0x307)]=Sprite_StateIcon['prototype']['updateFrame'],Sprite_StateIcon[_0x431870(0x2f7)][_0x431870(0x1a3)]=function(){const _0x1b44e2=_0x431870;VisuMZ[_0x1b44e2(0x371)][_0x1b44e2(0x307)][_0x1b44e2(0x210)](this),this[_0x1b44e2(0x1d8)]();},Sprite_StateIcon['prototype'][_0x431870(0x39e)]=function(_0x11252f,_0x50a9da,_0x1b9904,_0x28207c,_0x43d3c4){const _0x3e9e65=_0x431870;this[_0x3e9e65(0x28c)][_0x3e9e65(0x39e)](_0x11252f,_0x50a9da,_0x1b9904,_0x28207c,this['contents']['height'],_0x43d3c4);},Sprite_StateIcon['prototype']['updateTurnDisplaySprite']=function(){const _0x273df2=_0x431870;this[_0x273df2(0x335)](),this['contents']['clear']();const _0x253bee=this[_0x273df2(0x2ec)];if(!_0x253bee)return;const _0x3efdd5=_0x253bee[_0x273df2(0x1ad)]()[_0x273df2(0x362)](_0x350778=>_0x350778[_0x273df2(0x365)]>0x0),_0x1a1202=[...Array(0x8)['keys']()]['filter'](_0x5063a7=>_0x253bee[_0x273df2(0x355)](_0x5063a7)!==0x0),_0x256678=this[_0x273df2(0x2f6)],_0x26503d=_0x3efdd5[_0x256678];if(_0x26503d)Window_Base[_0x273df2(0x2f7)][_0x273df2(0x3b1)]['call'](this,_0x253bee,_0x26503d,0x0,0x0),Window_Base[_0x273df2(0x2f7)][_0x273df2(0x1ba)][_0x273df2(0x210)](this,_0x253bee,_0x26503d,0x0,0x0);else{const _0x63bb82=_0x1a1202[_0x256678-_0x3efdd5['length']];if(_0x63bb82===undefined)return;Window_Base['prototype'][_0x273df2(0x1db)]['call'](this,_0x253bee,_0x63bb82,0x0,0x0),Window_Base[_0x273df2(0x2f7)]['drawActorBuffRates'][_0x273df2(0x210)](this,_0x253bee,_0x63bb82,0x0,0x0);}},Sprite_StateIcon[_0x431870(0x2f7)]['resetFontSettings']=function(){const _0x114757=_0x431870;this[_0x114757(0x28c)][_0x114757(0x224)]=$gameSystem[_0x114757(0x2dd)](),this[_0x114757(0x28c)]['fontSize']=$gameSystem[_0x114757(0x2eb)](),this[_0x114757(0x319)]();},Sprite_StateIcon['prototype'][_0x431870(0x319)]=function(){const _0x553140=_0x431870;this[_0x553140(0x32e)](ColorManager['normalColor']()),this['changeOutlineColor'](ColorManager[_0x553140(0x35d)]());},Sprite_StateIcon[_0x431870(0x2f7)][_0x431870(0x32e)]=function(_0x1c1fa7){const _0x3ea378=_0x431870;this['contents'][_0x3ea378(0x18a)]=_0x1c1fa7;},Sprite_StateIcon[_0x431870(0x2f7)][_0x431870(0x378)]=function(_0x3cac24){const _0x39e93f=_0x431870;this[_0x39e93f(0x28c)]['outlineColor']=_0x3cac24;},Sprite_StateIcon[_0x431870(0x2f7)]['hide']=function(){const _0x397bce=_0x431870;this[_0x397bce(0x2ba)]=!![],this[_0x397bce(0x2d4)]();},Window_Base[_0x431870(0x2f7)][_0x431870(0x3f7)]=function(_0x19e14a,_0x237ae2,_0x2b898,_0x3d8ff6,_0x3b8432){const _0x5168de=_0x431870,_0x560ea5=this[_0x5168de(0x377)](_0x19e14a,_0x237ae2),_0x1615e2=this['textSizeEx'](_0x560ea5,_0x2b898,_0x3d8ff6,_0x3b8432),_0x5b4ea9=_0x2b898+_0x3b8432-_0x1615e2[_0x5168de(0x289)];this['drawTextEx'](_0x560ea5,_0x5b4ea9,_0x3d8ff6,_0x3b8432),this[_0x5168de(0x335)]();},Window_Base[_0x431870(0x2f7)][_0x431870(0x377)]=function(_0x4cdbe6,_0x59b234){const _0x3ab145=_0x431870;let _0x28cb96='';for(settings of VisuMZ[_0x3ab145(0x371)][_0x3ab145(0x1f9)][_0x3ab145(0x311)]){if(!this[_0x3ab145(0x201)](_0x4cdbe6,_0x59b234,settings))continue;if(_0x28cb96[_0x3ab145(0x2f9)]>0x0)_0x28cb96+=this['skillCostSeparator']();_0x28cb96+=this[_0x3ab145(0x357)](_0x4cdbe6,_0x59b234,settings);}_0x28cb96=this[_0x3ab145(0x24b)](_0x4cdbe6,_0x59b234,_0x28cb96);if(_0x59b234['note'][_0x3ab145(0x2f4)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x28cb96['length']>0x0)_0x28cb96+=this[_0x3ab145(0x285)]();_0x28cb96+=String(RegExp['$1']);}return _0x28cb96;},Window_Base['prototype'][_0x431870(0x24b)]=function(_0x561f57,_0x37b485,_0x93f3d2){return _0x93f3d2;},Window_Base[_0x431870(0x2f7)][_0x431870(0x201)]=function(_0x468654,_0x3b935e,_0x136d3b){const _0x42bf05=_0x431870;let _0x3bb6a0=_0x136d3b['CalcJS'][_0x42bf05(0x210)](_0x468654,_0x3b935e);return _0x3bb6a0=_0x468654['adjustSkillCost'](_0x3b935e,_0x3bb6a0,_0x136d3b),_0x136d3b['ShowJS'][_0x42bf05(0x210)](_0x468654,_0x3b935e,_0x3bb6a0,_0x136d3b);},Window_Base[_0x431870(0x2f7)][_0x431870(0x357)]=function(_0x3bd698,_0x3a751a,_0x4939f3){const _0x20d66f=_0x431870;let _0x1256b6=_0x4939f3[_0x20d66f(0x194)]['call'](_0x3bd698,_0x3a751a);return _0x1256b6=_0x3bd698['adjustSkillCost'](_0x3a751a,_0x1256b6,_0x4939f3),_0x4939f3[_0x20d66f(0x3c6)][_0x20d66f(0x210)](_0x3bd698,_0x3a751a,_0x1256b6,_0x4939f3);},Window_Base[_0x431870(0x2f7)][_0x431870(0x285)]=function(){return'\x20';},Window_Base['prototype'][_0x431870(0x298)]=function(_0x1c7b3f,_0x5d104a,_0x15b51a,_0x59d28a){const _0x20860b=_0x431870;if(!_0x1c7b3f)return;VisuMZ[_0x20860b(0x371)][_0x20860b(0x1f6)][_0x20860b(0x210)](this,_0x1c7b3f,_0x5d104a,_0x15b51a,_0x59d28a),this[_0x20860b(0x2da)](_0x1c7b3f,_0x5d104a,_0x15b51a,_0x59d28a);},Window_Base['prototype'][_0x431870(0x2da)]=function(_0xc03a2c,_0xb77c4c,_0x25e481,_0x5752ba){const _0x559730=_0x431870;_0x5752ba=_0x5752ba||0x90;const _0x42a4f5=ImageManager[_0x559730(0x1bc)],_0x2e4606=_0xc03a2c['allIcons']()['slice'](0x0,Math['floor'](_0x5752ba/_0x42a4f5)),_0x409ff9=_0xc03a2c[_0x559730(0x1ad)]()[_0x559730(0x362)](_0x4d411a=>_0x4d411a['iconIndex']>0x0),_0x4fbfa3=[...Array(0x8)[_0x559730(0x24e)]()][_0x559730(0x362)](_0x58ae0b=>_0xc03a2c[_0x559730(0x355)](_0x58ae0b)!==0x0),_0x33f76d=[];let _0x3e3091=_0xb77c4c;for(let _0x8098f1=0x0;_0x8098f1<_0x2e4606[_0x559730(0x2f9)];_0x8098f1++){this[_0x559730(0x335)]();const _0x17b7d4=_0x409ff9[_0x8098f1];if(_0x17b7d4)!_0x33f76d[_0x559730(0x22f)](_0x17b7d4)&&this[_0x559730(0x3b1)](_0xc03a2c,_0x17b7d4,_0x3e3091,_0x25e481),this[_0x559730(0x1ba)](_0xc03a2c,_0x17b7d4,_0x3e3091,_0x25e481),_0x33f76d['push'](_0x17b7d4);else{const _0x31ac84=_0x4fbfa3[_0x8098f1-_0x409ff9[_0x559730(0x2f9)]];this[_0x559730(0x1db)](_0xc03a2c,_0x31ac84,_0x3e3091,_0x25e481),this['drawActorBuffRates'](_0xc03a2c,_0x31ac84,_0x3e3091,_0x25e481);}_0x3e3091+=_0x42a4f5;}},Window_Base[_0x431870(0x2f7)][_0x431870(0x3b1)]=function(_0xd6383d,_0x28a465,_0x9248b4,_0x422ab5){const _0x274aca=_0x431870;if(!VisuMZ[_0x274aca(0x371)][_0x274aca(0x1f9)][_0x274aca(0x33c)][_0x274aca(0x214)])return;if(!_0xd6383d['isStateAffected'](_0x28a465['id']))return;if(_0x28a465[_0x274aca(0x23e)]===0x0)return;if(_0x28a465[_0x274aca(0x3f5)][_0x274aca(0x2f4)](/<HIDE STATE TURNS>/i))return;const _0x3b41fa=_0xd6383d['stateTurns'](_0x28a465['id']),_0x28a084=ImageManager[_0x274aca(0x1bc)],_0x896241=ColorManager['stateColor'](_0x28a465);this[_0x274aca(0x32e)](_0x896241),this[_0x274aca(0x378)](_0x274aca(0x321)),this['contents'][_0x274aca(0x324)]=!![],this['contents'][_0x274aca(0x1e4)]=VisuMZ[_0x274aca(0x371)][_0x274aca(0x1f9)]['States'][_0x274aca(0x1bf)],_0x9248b4+=VisuMZ[_0x274aca(0x371)][_0x274aca(0x1f9)][_0x274aca(0x33c)][_0x274aca(0x353)],_0x422ab5+=VisuMZ[_0x274aca(0x371)][_0x274aca(0x1f9)][_0x274aca(0x33c)][_0x274aca(0x3a6)],this['drawText'](_0x3b41fa,_0x9248b4,_0x422ab5,_0x28a084,'right'),this[_0x274aca(0x28c)]['fontBold']=![],this['resetFontSettings']();},Window_Base[_0x431870(0x2f7)][_0x431870(0x1ba)]=function(_0xc7eaee,_0x476673,_0x2d95a3,_0x5c9908){const _0x3ce3d3=_0x431870;if(!VisuMZ[_0x3ce3d3(0x371)][_0x3ce3d3(0x1f9)]['States'][_0x3ce3d3(0x24f)])return;const _0x5460e0=ImageManager[_0x3ce3d3(0x1bc)],_0x252209=ImageManager[_0x3ce3d3(0x3d1)]/0x2,_0x377d26=ColorManager[_0x3ce3d3(0x2f5)]();this['changeTextColor'](_0x377d26),this[_0x3ce3d3(0x378)](_0x3ce3d3(0x321)),this[_0x3ce3d3(0x28c)][_0x3ce3d3(0x324)]=!![],this[_0x3ce3d3(0x28c)][_0x3ce3d3(0x1e4)]=VisuMZ[_0x3ce3d3(0x371)][_0x3ce3d3(0x1f9)][_0x3ce3d3(0x33c)][_0x3ce3d3(0x27b)],_0x2d95a3+=VisuMZ[_0x3ce3d3(0x371)][_0x3ce3d3(0x1f9)][_0x3ce3d3(0x33c)][_0x3ce3d3(0x31a)],_0x5c9908+=VisuMZ[_0x3ce3d3(0x371)][_0x3ce3d3(0x1f9)][_0x3ce3d3(0x33c)][_0x3ce3d3(0x21e)];const _0x18a595=String(_0xc7eaee[_0x3ce3d3(0x225)](_0x476673['id']));this[_0x3ce3d3(0x39e)](_0x18a595,_0x2d95a3,_0x5c9908,_0x5460e0,'center'),this[_0x3ce3d3(0x28c)][_0x3ce3d3(0x324)]=![],this[_0x3ce3d3(0x335)]();},Window_Base[_0x431870(0x2f7)][_0x431870(0x1db)]=function(_0x28d5c0,_0x2f369e,_0x249f2e,_0x531a19){const _0x24dc37=_0x431870;if(!VisuMZ[_0x24dc37(0x371)]['Settings'][_0x24dc37(0x3f2)]['ShowTurns'])return;const _0x5241bf=_0x28d5c0[_0x24dc37(0x355)](_0x2f369e);if(_0x5241bf===0x0)return;const _0x1e6db2=_0x28d5c0[_0x24dc37(0x1b9)](_0x2f369e),_0x450deb=ImageManager[_0x24dc37(0x1bc)],_0x8be5d1=_0x5241bf>0x0?ColorManager['buffColor']():ColorManager[_0x24dc37(0x331)]();this[_0x24dc37(0x32e)](_0x8be5d1),this[_0x24dc37(0x378)](_0x24dc37(0x321)),this[_0x24dc37(0x28c)][_0x24dc37(0x324)]=!![],this[_0x24dc37(0x28c)][_0x24dc37(0x1e4)]=VisuMZ['SkillsStatesCore']['Settings']['Buffs'][_0x24dc37(0x1bf)],_0x249f2e+=VisuMZ[_0x24dc37(0x371)]['Settings']['Buffs'][_0x24dc37(0x353)],_0x531a19+=VisuMZ[_0x24dc37(0x371)][_0x24dc37(0x1f9)][_0x24dc37(0x3f2)][_0x24dc37(0x3a6)],this[_0x24dc37(0x39e)](_0x1e6db2,_0x249f2e,_0x531a19,_0x450deb,_0x24dc37(0x21a)),this[_0x24dc37(0x28c)]['fontBold']=![],this[_0x24dc37(0x335)]();},Window_Base[_0x431870(0x2f7)]['drawActorBuffRates']=function(_0x3a1155,_0xcf5093,_0x35dd93,_0x9a7377){const _0x167ace=_0x431870;if(!VisuMZ[_0x167ace(0x371)][_0x167ace(0x1f9)][_0x167ace(0x3f2)][_0x167ace(0x24f)])return;const _0x1063e5=_0x3a1155['paramBuffRate'](_0xcf5093),_0x30afda=_0x3a1155[_0x167ace(0x355)](_0xcf5093),_0x4878e7=ImageManager[_0x167ace(0x1bc)],_0x5d9cb4=ImageManager[_0x167ace(0x3d1)]/0x2,_0x29301d=_0x30afda>0x0?ColorManager['buffColor']():ColorManager[_0x167ace(0x331)]();this[_0x167ace(0x32e)](_0x29301d),this['changeOutlineColor'](_0x167ace(0x321)),this[_0x167ace(0x28c)][_0x167ace(0x324)]=!![],this['contents'][_0x167ace(0x1e4)]=VisuMZ[_0x167ace(0x371)][_0x167ace(0x1f9)][_0x167ace(0x3f2)][_0x167ace(0x27b)],_0x35dd93+=VisuMZ['SkillsStatesCore'][_0x167ace(0x1f9)][_0x167ace(0x3f2)][_0x167ace(0x31a)],_0x9a7377+=VisuMZ[_0x167ace(0x371)][_0x167ace(0x1f9)]['Buffs'][_0x167ace(0x21e)];const _0x40832d='%1%'['format'](Math[_0x167ace(0x351)](_0x1063e5*0x64));this[_0x167ace(0x39e)](_0x40832d,_0x35dd93,_0x9a7377,_0x4878e7,_0x167ace(0x23d)),this['contents']['fontBold']=![],this[_0x167ace(0x335)]();},VisuMZ['SkillsStatesCore'][_0x431870(0x367)]=Window_StatusBase[_0x431870(0x2f7)][_0x431870(0x330)],Window_StatusBase[_0x431870(0x2f7)][_0x431870(0x330)]=function(_0x567aea,_0x1a50ac,_0x167aa2,_0x42797b){const _0x1c1547=_0x431870;if(_0x567aea[_0x1c1547(0x372)]())_0x1a50ac=this[_0x1c1547(0x250)](_0x567aea,_0x1a50ac);this[_0x1c1547(0x35c)](_0x567aea,_0x1a50ac,_0x167aa2,_0x42797b);},Window_StatusBase['prototype'][_0x431870(0x35c)]=function(_0x1278d9,_0x40359c,_0x119bb4,_0x2001c1){const _0xcf6f10=_0x431870;if([_0xcf6f10(0x292),_0xcf6f10(0x3a5)]['includes'](_0x40359c[_0xcf6f10(0x3c1)]()))return;VisuMZ[_0xcf6f10(0x371)][_0xcf6f10(0x367)][_0xcf6f10(0x210)](this,_0x1278d9,_0x40359c,_0x119bb4,_0x2001c1);},Window_StatusBase[_0x431870(0x2f7)][_0x431870(0x250)]=function(_0x3b5282,_0x1b4af5){const _0x2818f2=_0x431870,_0x55d3ed=_0x3b5282[_0x2818f2(0x1c2)]()[_0x2818f2(0x3f5)];if(_0x1b4af5==='hp'&&_0x55d3ed[_0x2818f2(0x2f4)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x1b4af5==='mp'&&_0x55d3ed['match'](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x1b4af5==='tp'&&_0x55d3ed['match'](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x1b4af5;}},VisuMZ['SkillsStatesCore'][_0x431870(0x1f6)]=Window_StatusBase[_0x431870(0x2f7)][_0x431870(0x298)],Window_StatusBase[_0x431870(0x2f7)][_0x431870(0x298)]=function(_0x5b3e23,_0x5a6d75,_0x1a6937,_0x937e5b){const _0x516669=_0x431870;if(!_0x5b3e23)return;Window_Base[_0x516669(0x2f7)][_0x516669(0x298)][_0x516669(0x210)](this,_0x5b3e23,_0x5a6d75,_0x1a6937,_0x937e5b);},VisuMZ['SkillsStatesCore'][_0x431870(0x1bb)]=Window_SkillType[_0x431870(0x2f7)][_0x431870(0x24a)],Window_SkillType['prototype'][_0x431870(0x24a)]=function(_0x2152c9){const _0x287080=_0x431870;VisuMZ[_0x287080(0x371)][_0x287080(0x1bb)]['call'](this,_0x2152c9),this['createCommandNameWindow'](_0x2152c9);},Window_SkillType[_0x431870(0x2f7)][_0x431870(0x279)]=function(_0x208926){const _0x7a7cc4=_0x431870,_0x2d64a1=new Rectangle(0x0,0x0,_0x208926['width'],_0x208926['height']);this['_commandNameWindow']=new Window_Base(_0x2d64a1),this['_commandNameWindow'][_0x7a7cc4(0x3b4)]=0x0,this[_0x7a7cc4(0x382)](this[_0x7a7cc4(0x22b)]),this[_0x7a7cc4(0x39f)]();},Window_SkillType[_0x431870(0x2f7)][_0x431870(0x3d2)]=function(){const _0x2aa242=_0x431870;Window_Command[_0x2aa242(0x2f7)][_0x2aa242(0x3d2)][_0x2aa242(0x210)](this);if(this[_0x2aa242(0x22b)])this[_0x2aa242(0x39f)]();},Window_SkillType[_0x431870(0x2f7)][_0x431870(0x39f)]=function(){const _0x4375c5=_0x431870,_0x59f531=this[_0x4375c5(0x22b)];_0x59f531['contents']['clear']();const _0x1004f3=this[_0x4375c5(0x1ca)](this['index']());if(_0x1004f3==='icon'&&this['maxItems']()>0x0){const _0x4362e7=this[_0x4375c5(0x1e2)](this[_0x4375c5(0x333)]());let _0x884b5=this['commandName'](this['index']());_0x884b5=_0x884b5[_0x4375c5(0x3c2)](/\\I\[(\d+)\]/gi,''),_0x59f531[_0x4375c5(0x335)](),this[_0x4375c5(0x22c)](_0x884b5,_0x4362e7),this['commandNameWindowDrawText'](_0x884b5,_0x4362e7),this[_0x4375c5(0x299)](_0x884b5,_0x4362e7);}},Window_SkillType['prototype'][_0x431870(0x22c)]=function(_0x37ea05,_0x28b810){},Window_SkillType['prototype']['commandNameWindowDrawText']=function(_0x47e2db,_0x3995ff){const _0x788272=_0x431870,_0x3a22da=this[_0x788272(0x22b)];_0x3a22da[_0x788272(0x39e)](_0x47e2db,0x0,_0x3995ff['y'],_0x3a22da[_0x788272(0x361)],_0x788272(0x23d));},Window_SkillType[_0x431870(0x2f7)]['commandNameWindowCenter']=function(_0x3059c7,_0x4cbdb9){const _0x445462=_0x431870,_0x2c2984=this['_commandNameWindow'],_0x88bf69=$gameSystem[_0x445462(0x384)](),_0x446302=_0x4cbdb9['x']+Math[_0x445462(0x20a)](_0x4cbdb9[_0x445462(0x289)]/0x2)+_0x88bf69;_0x2c2984['x']=_0x2c2984[_0x445462(0x289)]/-0x2+_0x446302,_0x2c2984['y']=Math[_0x445462(0x20a)](_0x4cbdb9[_0x445462(0x239)]/0x2);},Window_SkillType['prototype']['isUseModernControls']=function(){const _0x54f460=_0x431870;return Imported[_0x54f460(0x3d9)]&&Window_Command[_0x54f460(0x2f7)][_0x54f460(0x3e0)][_0x54f460(0x210)](this);},Window_SkillType[_0x431870(0x2f7)][_0x431870(0x2f8)]=function(){const _0x296e8e=_0x431870;if(!this['_actor'])return;const _0x270f13=this['_actor'][_0x296e8e(0x244)]();for(const _0x6f80f0 of _0x270f13){const _0x36113e=this[_0x296e8e(0x33f)](_0x6f80f0);this[_0x296e8e(0x1e7)](_0x36113e,_0x296e8e(0x2a0),!![],_0x6f80f0);}},Window_SkillType[_0x431870(0x2f7)][_0x431870(0x33f)]=function(_0x5d2907){const _0x320156=_0x431870;let _0x3a9ef9=$dataSystem[_0x320156(0x244)][_0x5d2907];if(_0x3a9ef9[_0x320156(0x2f4)](/\\I\[(\d+)\]/i))return _0x3a9ef9;if(this[_0x320156(0x2d1)]()===_0x320156(0x344))return _0x3a9ef9;const _0x53369b=VisuMZ[_0x320156(0x371)][_0x320156(0x1f9)][_0x320156(0x2ae)],_0x4e0db8=$dataSystem[_0x320156(0x1d9)]['includes'](_0x5d2907),_0x293303=_0x4e0db8?_0x53369b['IconStypeMagic']:_0x53369b[_0x320156(0x2cb)];return _0x320156(0x290)['format'](_0x293303,_0x3a9ef9);},Window_SkillType['prototype'][_0x431870(0x251)]=function(){const _0x52d70f=_0x431870;return VisuMZ['SkillsStatesCore'][_0x52d70f(0x1f9)][_0x52d70f(0x2ae)]['CmdTextAlign'];},Window_SkillType['prototype']['drawItem']=function(_0x357fb0){const _0x4aea3d=_0x431870,_0x236233=this[_0x4aea3d(0x1ca)](_0x357fb0);if(_0x236233===_0x4aea3d(0x192))this['drawItemStyleIconText'](_0x357fb0);else _0x236233===_0x4aea3d(0x3f1)?this['drawItemStyleIcon'](_0x357fb0):Window_Command[_0x4aea3d(0x2f7)][_0x4aea3d(0x36f)][_0x4aea3d(0x210)](this,_0x357fb0);},Window_SkillType['prototype']['commandStyle']=function(){const _0x1933f4=_0x431870;return VisuMZ['SkillsStatesCore'][_0x1933f4(0x1f9)][_0x1933f4(0x2ae)][_0x1933f4(0x390)];},Window_SkillType[_0x431870(0x2f7)][_0x431870(0x1ca)]=function(_0x32b4ba){const _0x2c4614=_0x431870;if(_0x32b4ba<0x0)return _0x2c4614(0x344);const _0x367f5f=this[_0x2c4614(0x2d1)]();if(_0x367f5f!=='auto')return _0x367f5f;else{if(this[_0x2c4614(0x258)]()>0x0){const _0x5d648d=this[_0x2c4614(0x314)](_0x32b4ba);if(_0x5d648d[_0x2c4614(0x2f4)](/\\I\[(\d+)\]/i)){const _0x57172c=this[_0x2c4614(0x1e2)](_0x32b4ba),_0x548553=this[_0x2c4614(0x25e)](_0x5d648d)[_0x2c4614(0x289)];return _0x548553<=_0x57172c['width']?_0x2c4614(0x192):'icon';}}}return'text';},Window_SkillType[_0x431870(0x2f7)]['drawItemStyleIconText']=function(_0xdb269e){const _0x502dc2=_0x431870,_0x12a5c1=this[_0x502dc2(0x1e2)](_0xdb269e),_0x400f31=this[_0x502dc2(0x314)](_0xdb269e),_0x4c026e=this['textSizeEx'](_0x400f31)[_0x502dc2(0x289)];this['changePaintOpacity'](this['isCommandEnabled'](_0xdb269e));const _0x60bfec=this[_0x502dc2(0x251)]();if(_0x60bfec===_0x502dc2(0x21a))this[_0x502dc2(0x1ea)](_0x400f31,_0x12a5c1['x']+_0x12a5c1[_0x502dc2(0x289)]-_0x4c026e,_0x12a5c1['y'],_0x4c026e);else{if(_0x60bfec===_0x502dc2(0x23d)){const _0x31b351=_0x12a5c1['x']+Math[_0x502dc2(0x20a)]((_0x12a5c1[_0x502dc2(0x289)]-_0x4c026e)/0x2);this['drawTextEx'](_0x400f31,_0x31b351,_0x12a5c1['y'],_0x4c026e);}else this[_0x502dc2(0x1ea)](_0x400f31,_0x12a5c1['x'],_0x12a5c1['y'],_0x4c026e);}},Window_SkillType[_0x431870(0x2f7)][_0x431870(0x237)]=function(_0x6a9864){const _0x551f0b=_0x431870;this[_0x551f0b(0x314)](_0x6a9864)[_0x551f0b(0x2f4)](/\\I\[(\d+)\]/i);const _0x1d393a=Number(RegExp['$1'])||0x0,_0x1d08b8=this[_0x551f0b(0x1e2)](_0x6a9864),_0x2a10bb=_0x1d08b8['x']+Math['floor']((_0x1d08b8[_0x551f0b(0x289)]-ImageManager[_0x551f0b(0x1bc)])/0x2),_0x430430=_0x1d08b8['y']+(_0x1d08b8[_0x551f0b(0x239)]-ImageManager[_0x551f0b(0x3d1)])/0x2;this[_0x551f0b(0x36b)](_0x1d393a,_0x2a10bb,_0x430430);},VisuMZ[_0x431870(0x371)][_0x431870(0x2fe)]=Window_SkillStatus[_0x431870(0x2f7)][_0x431870(0x38b)],Window_SkillStatus[_0x431870(0x2f7)][_0x431870(0x38b)]=function(){const _0x554396=_0x431870;VisuMZ['SkillsStatesCore'][_0x554396(0x2fe)][_0x554396(0x210)](this);if(this['_actor'])this[_0x554396(0x22d)]();},Window_SkillStatus[_0x431870(0x2f7)]['drawExtendedSkillsStatesCoreStatus']=function(){const _0x37e828=_0x431870;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!Imported[_0x37e828(0x1fd)])return;const _0x5832f2=this[_0x37e828(0x233)]();let _0x53ef5f=this['colSpacing']()/0x2+0xb4+0xb4+0xb4,_0x30dab1=this['innerWidth']-_0x53ef5f-0x2;if(_0x30dab1>=0x12c){const _0xf66bd5=VisuMZ[_0x37e828(0x339)]['Settings'][_0x37e828(0x256)][_0x37e828(0x364)],_0x14b8dc=Math['floor'](_0x30dab1/0x2)-0x18;let _0x11311a=_0x53ef5f,_0xf60c7f=Math[_0x37e828(0x20a)]((this[_0x37e828(0x32f)]-Math['ceil'](_0xf66bd5[_0x37e828(0x2f9)]/0x2)*_0x5832f2)/0x2),_0x4c7462=0x0;for(const _0x1846ab of _0xf66bd5){this[_0x37e828(0x3a1)](_0x11311a,_0xf60c7f,_0x14b8dc,_0x1846ab),_0x4c7462++,_0x4c7462%0x2===0x0?(_0x11311a=_0x53ef5f,_0xf60c7f+=_0x5832f2):_0x11311a+=_0x14b8dc+0x18;}}this[_0x37e828(0x335)]();},Window_SkillStatus['prototype'][_0x431870(0x3a1)]=function(_0x213c76,_0x33ecc6,_0x9f29,_0x49addf){const _0x113e5e=_0x431870,_0x4e638c=this[_0x113e5e(0x233)]();this[_0x113e5e(0x335)](),this[_0x113e5e(0x343)](_0x213c76,_0x33ecc6,_0x9f29,_0x49addf,!![]),this[_0x113e5e(0x319)](),this[_0x113e5e(0x28c)][_0x113e5e(0x1e4)]-=0x8;const _0x680bdb=this[_0x113e5e(0x322)]['paramValueByName'](_0x49addf,!![]);this[_0x113e5e(0x28c)]['drawText'](_0x680bdb,_0x213c76,_0x33ecc6,_0x9f29,_0x4e638c,_0x113e5e(0x21a));},VisuMZ[_0x431870(0x371)][_0x431870(0x2d3)]=Window_SkillList[_0x431870(0x2f7)][_0x431870(0x22f)],Window_SkillList[_0x431870(0x2f7)][_0x431870(0x22f)]=function(_0x5c75cc){return this['includesSkillsStatesCore'](_0x5c75cc);},VisuMZ[_0x431870(0x371)][_0x431870(0x34a)]=Window_SkillList[_0x431870(0x2f7)][_0x431870(0x3d6)],Window_SkillList['prototype'][_0x431870(0x3d6)]=function(){const _0x33aade=_0x431870;return SceneManager[_0x33aade(0x1c4)][_0x33aade(0x3ca)]===Scene_Battle?VisuMZ[_0x33aade(0x371)][_0x33aade(0x34a)][_0x33aade(0x210)](this):VisuMZ['SkillsStatesCore'][_0x33aade(0x1f9)][_0x33aade(0x2ae)][_0x33aade(0x34d)];},VisuMZ['SkillsStatesCore']['Window_SkillList_setActor']=Window_SkillList[_0x431870(0x2f7)]['setActor'],Window_SkillList[_0x431870(0x2f7)][_0x431870(0x2a9)]=function(_0x5a0efa){const _0x350329=_0x431870,_0x14cdb8=this['_actor']!==_0x5a0efa;VisuMZ[_0x350329(0x371)]['Window_SkillList_setActor']['call'](this,_0x5a0efa),_0x14cdb8&&(this['_statusWindow']&&this[_0x350329(0x197)]['constructor']===Window_ShopStatus&&this[_0x350329(0x197)]['setItem'](this['itemAt'](0x0)));},Window_SkillList[_0x431870(0x2f7)]['setStypeId']=function(_0x15ad91){const _0x5aa32f=_0x431870;if(this[_0x5aa32f(0x36d)]===_0x15ad91)return;this[_0x5aa32f(0x36d)]=_0x15ad91,this[_0x5aa32f(0x38b)](),this['scrollTo'](0x0,0x0),this['_statusWindow']&&this['_statusWindow'][_0x5aa32f(0x3ca)]===Window_ShopStatus&&this[_0x5aa32f(0x197)][_0x5aa32f(0x341)](this['itemAt'](0x0));},Window_SkillList[_0x431870(0x2f7)][_0x431870(0x2ab)]=function(_0x4d5bde){const _0x2a1433=_0x431870;if(!_0x4d5bde)return VisuMZ[_0x2a1433(0x371)][_0x2a1433(0x2d3)][_0x2a1433(0x210)](this,_0x4d5bde);if(!this[_0x2a1433(0x1e1)](_0x4d5bde))return![];if(!this[_0x2a1433(0x1c6)](_0x4d5bde))return![];if(!this['checkShowHideJS'](_0x4d5bde))return![];return!![];},Window_SkillList[_0x431870(0x2f7)][_0x431870(0x1e1)]=function(_0x10f905){const _0x3846b3=_0x431870;return DataManager[_0x3846b3(0x1ab)](_0x10f905)['includes'](this[_0x3846b3(0x36d)]);},Window_SkillList[_0x431870(0x2f7)][_0x431870(0x1c6)]=function(_0x450aea){const _0x197e9e=_0x431870;if(!VisuMZ[_0x197e9e(0x371)]['CheckVisibleBattleNotetags'](this['_actor'],_0x450aea))return![];if(!VisuMZ[_0x197e9e(0x371)][_0x197e9e(0x3eb)](this['_actor'],_0x450aea))return![];if(!VisuMZ[_0x197e9e(0x371)]['CheckVisibleSkillNotetags'](this['_actor'],_0x450aea))return![];return!![];},VisuMZ[_0x431870(0x371)]['CheckVisibleBattleNotetags']=function(_0x39e59f,_0x29b173){const _0x261aff=_0x431870,_0x277366=_0x29b173[_0x261aff(0x3f5)];if(_0x277366[_0x261aff(0x2f4)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x261aff(0x399)]())return![];else return _0x277366['match'](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x261aff(0x399)]()?![]:!![];},VisuMZ[_0x431870(0x371)][_0x431870(0x3eb)]=function(_0x243e7d,_0x33dd28){const _0x2785ca=_0x431870,_0x23b744=_0x33dd28[_0x2785ca(0x3f5)];if(_0x23b744[_0x2785ca(0x2f4)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x15b91f=JSON[_0x2785ca(0x3c8)]('['+RegExp['$1'][_0x2785ca(0x2f4)](/\d+/g)+']');for(const _0x5cc234 of _0x15b91f){if(!$gameSwitches['value'](_0x5cc234))return![];}return!![];}if(_0x23b744[_0x2785ca(0x2f4)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x161715=JSON['parse']('['+RegExp['$1'][_0x2785ca(0x2f4)](/\d+/g)+']');for(const _0x168e58 of _0x161715){if(!$gameSwitches[_0x2785ca(0x3e7)](_0x168e58))return![];}return!![];}if(_0x23b744[_0x2785ca(0x2f4)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1a87aa=JSON['parse']('['+RegExp['$1'][_0x2785ca(0x2f4)](/\d+/g)+']');for(const _0x5babb8 of _0x1a87aa){if($gameSwitches['value'](_0x5babb8))return!![];}return![];}if(_0x23b744[_0x2785ca(0x2f4)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x166c1a=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1779eb of _0x166c1a){if(!$gameSwitches[_0x2785ca(0x3e7)](_0x1779eb))return!![];}return![];}if(_0x23b744[_0x2785ca(0x2f4)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xdcc17a=JSON[_0x2785ca(0x3c8)]('['+RegExp['$1'][_0x2785ca(0x2f4)](/\d+/g)+']');for(const _0x43880a of _0xdcc17a){if(!$gameSwitches['value'](_0x43880a))return!![];}return![];}if(_0x23b744[_0x2785ca(0x2f4)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1d26d6=JSON[_0x2785ca(0x3c8)]('['+RegExp['$1'][_0x2785ca(0x2f4)](/\d+/g)+']');for(const _0x873a79 of _0x1d26d6){if($gameSwitches[_0x2785ca(0x3e7)](_0x873a79))return![];}return!![];}return!![];},VisuMZ[_0x431870(0x371)][_0x431870(0x26b)]=function(_0x7a1120,_0x53d469){const _0x47426a=_0x431870,_0x511e95=_0x53d469[_0x47426a(0x3f5)];if(_0x511e95[_0x47426a(0x2f4)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xdc4d13=JSON[_0x47426a(0x3c8)]('['+RegExp['$1'][_0x47426a(0x2f4)](/\d+/g)+']');for(const _0x33e6d1 of _0xdc4d13){if(!_0x7a1120['isLearnedSkill'](_0x33e6d1))return![];}return!![];}else{if(_0x511e95['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2e3e00=RegExp['$1']['split'](',');for(const _0x3294e9 of _0x2e3e00){const _0x3ee878=DataManager[_0x47426a(0x370)](_0x3294e9);if(!_0x3ee878)continue;if(!_0x7a1120['isLearnedSkill'](_0x3ee878))return![];}return!![];}}if(_0x511e95[_0x47426a(0x2f4)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x57d997=JSON[_0x47426a(0x3c8)]('['+RegExp['$1'][_0x47426a(0x2f4)](/\d+/g)+']');for(const _0x56034b of _0x57d997){if(!_0x7a1120[_0x47426a(0x204)](_0x56034b))return![];}return!![];}else{if(_0x511e95[_0x47426a(0x2f4)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xa14a35=RegExp['$1']['split'](',');for(const _0x9c96c8 of _0xa14a35){const _0x427d3b=DataManager[_0x47426a(0x370)](_0x9c96c8);if(!_0x427d3b)continue;if(!_0x7a1120[_0x47426a(0x204)](_0x427d3b))return![];}return!![];}}if(_0x511e95[_0x47426a(0x2f4)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1c0d29=JSON['parse']('['+RegExp['$1'][_0x47426a(0x2f4)](/\d+/g)+']');for(const _0x15ebb6 of _0x1c0d29){if(_0x7a1120['isLearnedSkill'](_0x15ebb6))return!![];}return![];}else{if(_0x511e95[_0x47426a(0x2f4)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1a71af=RegExp['$1'][_0x47426a(0x373)](',');for(const _0x33cea0 of _0x1a71af){const _0x256cf4=DataManager[_0x47426a(0x370)](_0x33cea0);if(!_0x256cf4)continue;if(_0x7a1120[_0x47426a(0x204)](_0x256cf4))return!![];}return![];}}if(_0x511e95[_0x47426a(0x2f4)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3dde6e=JSON[_0x47426a(0x3c8)]('['+RegExp['$1'][_0x47426a(0x2f4)](/\d+/g)+']');for(const _0x2f33a5 of _0x3dde6e){if(!_0x7a1120[_0x47426a(0x204)](_0x2f33a5))return!![];}return![];}else{if(_0x511e95['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x348191=RegExp['$1'][_0x47426a(0x373)](',');for(const _0x302b1d of _0x348191){const _0x4fdacc=DataManager[_0x47426a(0x370)](_0x302b1d);if(!_0x4fdacc)continue;if(!_0x7a1120[_0x47426a(0x204)](_0x4fdacc))return!![];}return![];}}if(_0x511e95[_0x47426a(0x2f4)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x57d036=JSON[_0x47426a(0x3c8)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x221fb0 of _0x57d036){if(!_0x7a1120[_0x47426a(0x204)](_0x221fb0))return!![];}return![];}else{if(_0x511e95[_0x47426a(0x2f4)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x415680=RegExp['$1'][_0x47426a(0x373)](',');for(const _0x4ad747 of _0x415680){const _0x5c3bc8=DataManager[_0x47426a(0x370)](_0x4ad747);if(!_0x5c3bc8)continue;if(!_0x7a1120[_0x47426a(0x204)](_0x5c3bc8))return!![];}return![];}}if(_0x511e95[_0x47426a(0x2f4)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x548744=JSON[_0x47426a(0x3c8)]('['+RegExp['$1'][_0x47426a(0x2f4)](/\d+/g)+']');for(const _0x2e75d2 of _0x548744){if(_0x7a1120[_0x47426a(0x204)](_0x2e75d2))return![];}return!![];}else{if(_0x511e95['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x55296e=RegExp['$1'][_0x47426a(0x373)](',');for(const _0x3616ff of _0x55296e){const _0xea9222=DataManager[_0x47426a(0x370)](_0x3616ff);if(!_0xea9222)continue;if(_0x7a1120[_0x47426a(0x204)](_0xea9222))return![];}return!![];}}if(_0x511e95[_0x47426a(0x2f4)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x52a8a5=JSON[_0x47426a(0x3c8)]('['+RegExp['$1'][_0x47426a(0x2f4)](/\d+/g)+']');for(const _0x2c426c of _0x52a8a5){if(!_0x7a1120[_0x47426a(0x20e)](_0x2c426c))return![];}return!![];}else{if(_0x511e95[_0x47426a(0x2f4)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5b6d1b=RegExp['$1'][_0x47426a(0x373)](',');for(const _0x3f21f2 of _0x5b6d1b){const _0x4a17a3=DataManager[_0x47426a(0x370)](_0x3f21f2);if(!_0x4a17a3)continue;if(!_0x7a1120[_0x47426a(0x20e)](_0x4a17a3))return![];}return!![];}}if(_0x511e95[_0x47426a(0x2f4)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2d74cd=JSON[_0x47426a(0x3c8)]('['+RegExp['$1'][_0x47426a(0x2f4)](/\d+/g)+']');for(const _0x3d2905 of _0x2d74cd){if(!_0x7a1120[_0x47426a(0x20e)](_0x3d2905))return![];}return!![];}else{if(_0x511e95['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x31294b=RegExp['$1'][_0x47426a(0x373)](',');for(const _0xef7722 of _0x31294b){const _0x2a7d99=DataManager[_0x47426a(0x370)](_0xef7722);if(!_0x2a7d99)continue;if(!_0x7a1120['hasSkill'](_0x2a7d99))return![];}return!![];}}if(_0x511e95['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1633bd=JSON[_0x47426a(0x3c8)]('['+RegExp['$1'][_0x47426a(0x2f4)](/\d+/g)+']');for(const _0x48cf8e of _0x1633bd){if(_0x7a1120[_0x47426a(0x20e)](_0x48cf8e))return!![];}return![];}else{if(_0x511e95['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x512580=RegExp['$1'][_0x47426a(0x373)](',');for(const _0x33379f of _0x512580){const _0x7bd640=DataManager['getSkillIdWithName'](_0x33379f);if(!_0x7bd640)continue;if(_0x7a1120[_0x47426a(0x20e)](_0x7bd640))return!![];}return![];}}if(_0x511e95[_0x47426a(0x2f4)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x96572f=JSON[_0x47426a(0x3c8)]('['+RegExp['$1'][_0x47426a(0x2f4)](/\d+/g)+']');for(const _0x51ac63 of _0x96572f){if(!_0x7a1120['hasSkill'](_0x51ac63))return!![];}return![];}else{if(_0x511e95[_0x47426a(0x2f4)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2e2880=RegExp['$1']['split'](',');for(const _0x1efc23 of _0x2e2880){const _0x11fae5=DataManager[_0x47426a(0x370)](_0x1efc23);if(!_0x11fae5)continue;if(!_0x7a1120[_0x47426a(0x20e)](_0x11fae5))return!![];}return![];}}if(_0x511e95[_0x47426a(0x2f4)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x49e24b=JSON[_0x47426a(0x3c8)]('['+RegExp['$1'][_0x47426a(0x2f4)](/\d+/g)+']');for(const _0x2cb7f5 of _0x49e24b){if(!_0x7a1120[_0x47426a(0x20e)](_0x2cb7f5))return!![];}return![];}else{if(_0x511e95[_0x47426a(0x2f4)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x76b089=RegExp['$1'][_0x47426a(0x373)](',');for(const _0x45bdbb of _0x76b089){const _0x5dd9d1=DataManager[_0x47426a(0x370)](_0x45bdbb);if(!_0x5dd9d1)continue;if(!_0x7a1120['hasSkill'](_0x5dd9d1))return!![];}return![];}}if(_0x511e95[_0x47426a(0x2f4)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x293d1a=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x38acef of _0x293d1a){if(_0x7a1120[_0x47426a(0x20e)](_0x38acef))return![];}return!![];}else{if(_0x511e95[_0x47426a(0x2f4)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1c907b=RegExp['$1'][_0x47426a(0x373)](',');for(const _0x5d10cd of _0x1c907b){const _0x12754e=DataManager['getSkillIdWithName'](_0x5d10cd);if(!_0x12754e)continue;if(_0x7a1120[_0x47426a(0x20e)](_0x12754e))return![];}return!![];}}return!![];},Window_SkillList[_0x431870(0x2f7)][_0x431870(0x1b4)]=function(_0x1674cd){const _0x4aef7e=_0x431870,_0x2a7319=_0x1674cd[_0x4aef7e(0x3f5)],_0x106cb5=VisuMZ[_0x4aef7e(0x371)]['skillVisibleJS'];return _0x106cb5[_0x1674cd['id']]?_0x106cb5[_0x1674cd['id']]['call'](this,_0x1674cd):!![];},VisuMZ[_0x431870(0x371)][_0x431870(0x300)]=Window_SkillList[_0x431870(0x2f7)][_0x431870(0x36f)],Window_SkillList['prototype'][_0x431870(0x36f)]=function(_0x3bcef3){const _0x4738c6=_0x431870,_0x1fddcb=this[_0x4738c6(0x1d5)](_0x3bcef3),_0x55e819=_0x1fddcb?_0x1fddcb[_0x4738c6(0x222)]:'';if(_0x1fddcb)this[_0x4738c6(0x2e7)](_0x1fddcb);VisuMZ[_0x4738c6(0x371)][_0x4738c6(0x300)][_0x4738c6(0x210)](this,_0x3bcef3);if(_0x1fddcb)_0x1fddcb[_0x4738c6(0x222)]=_0x55e819;},Window_SkillList[_0x431870(0x2f7)][_0x431870(0x2e7)]=function(_0x412eac){const _0x22cac8=_0x431870;if(_0x412eac&&_0x412eac[_0x22cac8(0x3f5)]['match'](/<LIST NAME:[ ](.*)>/i)){_0x412eac['name']=String(RegExp['$1'])[_0x22cac8(0x1dc)]();for(;;){if(_0x412eac[_0x22cac8(0x222)][_0x22cac8(0x2f4)](/\\V\[(\d+)\]/gi))_0x412eac[_0x22cac8(0x222)]=_0x412eac[_0x22cac8(0x222)][_0x22cac8(0x3c2)](/\\V\[(\d+)\]/gi,(_0x508b1c,_0x53a26b)=>$gameVariables['value'](parseInt(_0x53a26b)));else break;}}},Window_SkillList[_0x431870(0x2f7)][_0x431870(0x3f7)]=function(_0x4786c3,_0x30a98b,_0x1e3231,_0x51fb64){const _0x3406df=_0x431870;Window_Base[_0x3406df(0x2f7)][_0x3406df(0x3f7)][_0x3406df(0x210)](this,this[_0x3406df(0x322)],_0x4786c3,_0x30a98b,_0x1e3231,_0x51fb64);},Window_SkillList[_0x431870(0x2f7)][_0x431870(0x18f)]=function(_0x83761b){const _0x54f638=_0x431870;this[_0x54f638(0x197)]=_0x83761b,this[_0x54f638(0x3d2)]();},VisuMZ[_0x431870(0x371)]['Window_SkillList_updateHelp']=Window_SkillList[_0x431870(0x2f7)][_0x431870(0x288)],Window_SkillList[_0x431870(0x2f7)][_0x431870(0x288)]=function(){const _0x1e439d=_0x431870;VisuMZ[_0x1e439d(0x371)][_0x1e439d(0x2a2)][_0x1e439d(0x210)](this),this[_0x1e439d(0x197)]&&this[_0x1e439d(0x197)][_0x1e439d(0x3ca)]===Window_ShopStatus&&this[_0x1e439d(0x197)][_0x1e439d(0x341)](this[_0x1e439d(0x3bd)]());};