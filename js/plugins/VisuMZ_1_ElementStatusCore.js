//=============================================================================
// VisuStella MZ - Elements & Status Menu Core
// VisuMZ_1_ElementStatusCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ElementStatusCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ElementStatusCore = VisuMZ.ElementStatusCore || {};
VisuMZ.ElementStatusCore.version = 1.23;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.23] [ElementStatusCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Elements_and_Status_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Elements & Status Menu Core plugin gives you more control over in-game
 * elemental rate calculations, providing Trait Sets to streamline assigning
 * elements to actors and enemies, and updating the Status Menu to display all
 * that information properly.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Element Rate control from target side and user side.
 * * Elemental Absorption and Elemental Reflection added.
 * * Assign items and skills to have multiple elements.
 * * Elemental rates can be adjusted from additive and multiplicative notetags.
 * * Forcing Elemental Rates and nullifying Elemental properties.
 * * Trait Sets added to mass assign traits through the usage of notetags.
 * * Trait Sets used to assign Elements, SubElements, Genders, Races, Natures,
 *   Alignments, Blessings, Curses, Zodiacs, and Variants.
 * * Randomized Trait Sets with weights to make enemies more dynamic.
 * * The ability to change traits midway through the game by Plugin Commands.
 * * Updated Status Menu Layout to display all this new information.
 * * Control over the information category tabs in the Status Menu.
 * * Change up the actor's Biography midway through the game by Plugin Command.
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
 * Element Damage Calculation
 *
 * - Elemental damage was calculated in one very specific way in RPG Maker MZ:
 * getting the target's elemental resistance found across various database
 * objects and applying the damage to that rate. This plugin extends that by
 * giving more ways to extend the target's elemental damage rate as add in a
 * facet which introduces the attacker's elemental bonus damage, too.
 *
 * ---
 *
 * Multi-Elemental Calculation
 *
 * - By default in RPG Maker MZ, if there are multiple elements assigned to an
 * action, then the element with the highest rate is taken. This plugin will
 * give you, the game dev, the decision on how this is handled: the default
 * maximum rate, a minimum rate, a multiplicative product, an additive sum, or
 * an average of all the elemental rates calculated.
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
 * === Element-Related Notetags ===
 *
 * The following are element-related notetags.
 *
 * ---
 *
 * <Multi-Element: x>
 * <Multi-Element: x,x,x>
 *
 * <Multi-Element: name>
 * <Multi-Element: name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - Gives this action an additional element (alongside the Damage element)
 *   when calculating damage.
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <Multi-Element Rule: Maximum>
 * <Multi-Element Rule: Minimum>
 * <Multi-Element Rule: Multiply>
 * <Multi-Element Rule: Additive>
 * <Multi-Element Rule: Average>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the multi-element ruling for this action to either 'Maximum',
 *   'Minimum', 'Multiply', 'Additive', or 'Average'.
 * - If this notetag is not used, refer to the default ruling set by the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Force Action Element: Null>
 *
 * <Force Action Element: x>
 * <Force Action Element: x,x,x>
 *
 * <Force Action Element: name>
 * <Force Action Element: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces any actions performed by this unit to be the specific element(s).
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - If multiples of this notetag are found across various Database objects,
 *   priority will go in the order of states, actor, enemy, class, equips.
 *
 * ---
 *
 * <Force Received Element id Rate: x%>
 * <Force Received Element id Rate: x.x>
 *
 * <Force Received Element name Rate: x%>
 * <Force Received Element name Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces the unit to receive elemental damage at x multiplier.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <Received Element id Plus: +x%>
 * <Received Element id Plus: +x.x>
 *
 * <Received Element name Plus: +x%>
 * <Received Element name Plus: +x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively before applying rates and
 *   flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 * - This does not add on flat bonus damages after calculating elemental rates.
 *   This merely adds onto it at the end after applying rates if the formula
 *   from above is unchanged.
 *
 * ---
 *
 * <Received Element id Rate: x%>
 * <Received Element id Rate: x.x>
 *
 * <Received Element name Rate: x%>
 * <Received Element name Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage multiplicatively after applying plus
 *   and before applying flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 *
 * ---
 *
 * <Received Element id Flat: +x%>
 * <Received Element id Flat: +x.x>
 *
 * <Received Element name Flat: +x%>
 * <Received Element name Flat: +x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively after applying rates and
 *   plus bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 * - This does not add on flat bonus damages after calculating elemental rates.
 *   This merely adds onto it at the end after applying rates if the formula
 *   from above is unchanged.
 *
 * ---
 *
 * <Dealt Element id Plus: +x%>
 * <Dealt Element id Plus: +x.x>
 *
 * <Dealt Element name Plus: +x%>
 * <Dealt Element name Plus: +x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively before applying rates and
 *   flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 * - This does not add on flat bonus damages after calculating elemental rates.
 *   This merely adds onto it at the end after applying rates if the formula
 *   from above is unchanged.
 *
 * ---
 *
 * <Dealt Element id Rate: x%>
 * <Dealt Element id Rate: x.x>
 *
 * <Dealt Element name Rate: x%>
 * <Dealt Element name Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage multiplicatively after applying plus and
 *   before applying flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 *
 * ---
 *
 * <Dealt Element id Flat: +x%>
 * <Dealt Element id Flat: +x.x>
 *
 * <Dealt Element name Flat: +x%>
 * <Dealt Element name Flat: +x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively after applying rates and
 *   plus bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 * - This does not add on flat bonus damages after calculating elemental rates.
 *   This merely adds onto it at the end after applying rates if the formula
 *   from above is unchanged.
 *
 * ---
 *
 * <Element Absorb: x>
 * <Element Absorb: x,x,x>
 *
 * <Element Absorb: name>
 * <Element Absorb: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Gives the unit the ability to absorb damage from element.
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to absorb more elements.
 * - Absorption is calculated after all other element rates have been made.
 *
 * ---
 *
 * <Element Reflect: x>
 * <Element Reflect: x,x,x>
 *
 * <Element Reflect: name>
 * <Element Reflect: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Gives the unit the ability to reflect damage from element.
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to reflect more elements.
 * - Reflection occurs before any damage is calculated and dealt.
 * - Elemental Reflection will take priority over Magic Reflection.
 *
 * ---
 *
 * <Bypass Element Reflect>
 *
 * - Used for: Skill, Item Notetags
 * - Makes this skill/item unable to be reflected by Element Reflect effect.
 *
 * ---
 * 
 * <Element Pierce: x>
 * <Element Pierce: x,x,x>
 * 
 * <Element Pierce: name>
 * <Element Pierce: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Gives the unit the ability to attack with the element and bypass any kinds
 *   of damage immunities, reflections, and absorptions.
 *   - Actions can still miss or be countered, however.
 * - If an action has multiple elements, as long as one element has pierce, the
 *   action will go through.
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to reflect more elements.
 * 
 * ---
 *
 * <Element Pierce>
 *
 * - Used for: Skill, Item Notetags
 * - Makes this skill/item bypass any kinds of damage immunities, reflections,
 *   and absorptions.
 *   - Action can still miss or be countered, however.
 *
 * ---
 *
 * === JavaScript Notetags: Element-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine dynamic element-related effects.
 *
 * ---
 *
 * <JS Force Received Element id Rate: code>
 * <JS Force Received Element name Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces the unit to receive elemental damage at a code-determined rate.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Received Element id Plus: code>
 * <JS Received Element name Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively before applying rates and
 *   flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Received Element id Rate: code>
 * <JS Received Element name Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively after applying plus and
 *   before applying flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Received Element id Flat: code>
 * <JS Received Element name Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively after applying rates and
 *   plus bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Dealt Element id Plus: code>
 * <JS Dealt Element name Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively before applying rates and
 *   flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Dealt Element id Rate: code>
 * <JS Dealt Element name Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively after applying plus and
 *   before applying flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Dealt Element id Flat: code>
 * <JS Dealt Element name Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively after applying rates and
 *   plus bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * === Trait Set Notetags ===
 *
 * Trait Sets are used to apply various properties to actor and enemy units as
 * a whole depending on what the trait set is. Use the following notetags to
 * determine how to properly assign the desired Trait Set.
 *
 * WARNING: Trait Sets only work if they are enabled in the Plugin Parameters:
 * ElementStatusCore => General Trait Set Settings => Enable Trait Sets?
 *
 * ---
 *
 * <Element: name>
 * <SubElement: name>
 * <Gender: name>
 * <Race: name>
 * <Nature: name>
 * <Alignment: name>
 * <Blessing: name>
 * <Curse: name>
 * <Zodiac: name>
 * <Variant: name>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the specific Trait Set(s) for the actor or enemy unit.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - If any of these notetags are unused, the Trait Set will default to the one
 *   determined in the Plugin Parameters.
 *
 * Examples:
 *
 * <Element: Fire>
 * <SubElement: Thunder>
 * <Gender: Male>
 * <Nature: Jolly>
 * <Alignment: Chaotic Good>
 * <Zodiac: Aries>
 *
 * ---
 *
 * <Trait Sets>
 *  Element:    name
 *  SubElement: name
 *  Gender:     name
 *  Race:       name
 *  Nature:     name
 *  Alignment:  name
 *  Blessing:   name
 *  Curse:      name
 *  Zodiac:     name
 *  Variant:    name
 * </Trait Sets>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the Trait Set(s) for the actor or enemy unit.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - You may remove the Trait Set types (ie. Blessing and Curse) that you don't
 *   want to assign anything to from the list.
 * - If any of these sets are unused, the Trait Set will default to the one
 *   determined in the Plugin Parameters.
 *
 * Example:
 *
 * <Trait Sets>
 *  Element:    Fire
 *  SubElement: Thunder
 *  Gender:     Male
 *  Nature:     Jolly
 *  Alignment:  Chaotic Good
 *  Zodiac:     Aries
 * </Trait Sets>
 *
 * ---
 *
 * <Random type>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Random type>
 *
 * - Used for: Actor, Enemy Notetags
 * - Assigns a random Trait Set for this Trait Set 'type'.
 * - Replace 'type' with 'Element', 'SubElement', 'Gender', 'Race', 'Nature',
 *   'Alignment', 'Blessing', 'Curse', 'Zodiac', or 'Variant' depending on
 *   which you're trying to randomize.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - This would bypass the innate settings determined in the Plugin Parameters.
 *
 * Examples:
 *
 * <Random Gender>
 *  Male: 75
 *  Female: 25
 * </Random Gender>
 * 
 * <Random Variant>
 *  Mighty: 10
 *  Major: 20
 *  Greater: 60
 *  Normal: 200
 *  Lesser: 10
 *  Minor
 *  Puny
 * </Random Variant>
 *
 * ---
 *
 * <No Random Trait Sets>
 *
 * - Used for: Actor, Enemy Notetags
 * - Prevents random Trait Sets from being assigned to this actor/enemy unit.
 *
 * ---
 *
 * <Trait Set Name Format>
 *  text
 * </Trait Set Name Format>
 *
 * - Used for: Enemy Notetags
 * - Enemy names can be affected by the Trait Sets they have. Replace 'text'
 *   with the format you wish to see them have.
 * - Insert [Name] into 'text' to determine where the enemy's name goes.
 * - Insert [Letter] into 'text' to determine where the enemy's letter goes.
 * - Insert [Element] into 'text' to determine where the format text goes.
 * - Insert [SubElement] into 'text' to determine where the format text goes.
 * - Insert [Gender] into 'text' to determine where the format text goes.
 * - Insert [Race] into 'text' to determine where the format text goes.
 * - Insert [Nature] into 'text' to determine where the format text goes.
 * - Insert [Alignment] into 'text' to determine where the format text goes.
 * - Insert [Blessing] into 'text' to determine where the format text goes.
 * - Insert [Curse] into 'text' to determine where the format text goes.
 * - Insert [Zodiac] into 'text' to determine where the format text goes.
 * - Insert [Variant] into 'text' to determine where the format text goes.
 * 
 * Example:
 *
 * <Trait Set Name Format>
 *  [Alignment] [Nature] [Element] [Name][Gender] [Letter]
 * </Trait Set Name Format>
 *
 * ---
 *
 * <traitname Battler Name: filename>
 *
 * <traitname Battler Names>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </traitname Battler Names>
 *
 * - Used for: Enemy Notetags
 * - Allows certain Trait Sets to cause battlers to have a unique appearance.
 * - Replace 'traitname' with the name of the Trait Set (ie. Male, Female).
 * - Replace 'filename' with the battler graphic to associate with that
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 *   Trait Set.
 *
 * Examples:
 *
 * <Male Battler Name: Spider1>
 * <Female Battler Name: Spider2>
 *
 * <Male Battler Names>
 *  Rogue: 25
 *  Fighter: 10
 *  Warrior
 * </Male Battler Names>
 *
 * ---
 *
 * <traitname Battler Hue: x>
 *
 * <traitname Battler Hues>
 *  x: weight
 *  x: weight
 *  x: weight
 * </traitname Battler Hues>
 *
 * - Used for: Enemy Notetags
 * - Allows certain Trait Sets to cause battlers to use a different hue.
 * - Replace 'traitname' with the name of the Trait Set (ie. Male, Female).
 * - Replace 'x' with a number from 0 to 360 depicting the hue to become.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 *
 * Examples:
 *
 * <Male Battler Hue: 160>
 * <Female Battler Hue: 275>
 *
 * <Female Battler Hues>
 *  275: 10
 *  325: 5
 *  345
 * </Female Battler Hues>
 *
 * ---
 * 
 * <Equip Trait Requirement: name>
 * <Equip Trait Requirement: name, name, name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Makes this piece of equipment equippable by only actors with those traits.
 * - If there are multiple traits required, all of them have to be met.
 * - If multiple trait types share the same trait name, the listed name will
 *   count for all of them.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Changing trait sets mid-game will remove unmatched traits.
 * - Usage Example: <Equip Trait Requirement: Female> makes the item only
 *   equippable by female actors as long as they are tagged as female.
 * 
 * ---
 * 
 * <Damage VS name Trait: x%>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on a skill or item, the action will perform 'x%' damage versus any
 *   targets with 'name' trait sets (any of them).
 * - If present in an actor, class, weapon, armor, enemy, or state's notebox,
 *   all damage types will be multiplied by 'x%' versus targets with 'name'
 *   trait sets (any of them).
 * - This notetag does not affect healing.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Replace 'x' with a number representing a percentage value to augment
 *   damage by.
 * - Use multiple notetags to affect multiple trait types. If multiple effects
 *   manage to stack, they will stack multiplicatively.
 * 
 * ---
 * 
 * <Healing VS name Trait: x%>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on a skill or item, the action will perform 'x%' heals versus any
 *   targets with 'name' trait sets (any of them).
 * - If present in an actor, class, weapon, armor, enemy, or state's notebox,
 *   all heal types will be multiplied by 'x%' versus targets with 'name'
 *   trait sets (any of them).
 * - This notetag does not affect damage.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Replace 'x' with a number representing a percentage value to augment
 *   heals by.
 * - Use multiple notetags to affect multiple trait types. If multiple effects
 *   manage to stack, they will stack multiplicatively.
 * 
 * ---
 * 
 * <Accuracy VS name Trait: x%>
 * <Accuracy VS name Trait: +x%>
 * <Accuracy VS name Trait: -x%>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on a skill or item, the action will have 'x%', '+x%', or '-x%'
 *   accuracy against any targets with 'name' trait sets (any of them).
 * - If present in an actor, class, weapon, armor, enemy, or state's notebox,
 *   all actions will have 'x%', '+x%', or '-x%' accuracy against any targets
 *   with 'name' trait sets (any of them).
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Replace 'x' respectively for percentile or additive/subtractive values.
 *   - 'x%' means an action with an accuracy rate of 20% will be (20% * x%).
 *   - '+x%' means an action with an accuracy rate of 20% will be (20% + x%).
 *   - '-x%' means an action with an accuracy rate of 20% will be (20% - x%).
 * - Multiple 'x%' notetags will stack multiplicatively.
 * - Multiple '+x' and '-x' notetags will stack additively.
 * 
 * ---
 * 
 * <Critical VS name Trait: x%>
 * <Critical VS name Trait: +x%>
 * <Critical VS name Trait: -x%>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on a skill or item, the action will have 'x%', '+x%', or '-x%'
 *   crtical rate against any targets with 'name' trait sets (any of them).
 * - If present in an actor, class, weapon, armor, enemy, or state's notebox,
 *   all actions will have 'x%', '+x%', or '-x%' crtical rate against any
 *   targets with 'name' trait sets (any of them).
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Replace 'x' respectively for percentile or additive/subtractive values.
 *   - 'x%' means an action with a critical rate of 20% will be (20% * x%).
 *   - '+x%' means an action with a critical rate of 20% will be (20% + x%).
 *   - '-x%' means an action with a critical rate of 20% will be (20% - x%).
 * - Multiple 'x%' notetags will stack multiplicatively.
 * - Multiple '+x' and '-x' notetags will stack additively.
 * 
 * ---
 *
 * === Actor Biography Notetag ===
 *
 * The following notetag is used for the Status Menu if the updated Status Menu
 * Layout option has been enabled from the Plugin Parameters.
 *
 * ---
 *
 * <Biography>
 *  text
 *  text
 *  text
 * </Biography>
 *
 * - Used for: Actor Notetags
 * - Determines the actor's biography shown in the Status Menu.
 * - Replace 'text' with the text intended.
 * - Text Codes are allowed.
 * - The biography can be changed mid-game through Plugin Commands.
 * - If this notetag isn't used, then the actor's profile message is displayed
 *   as the biography.
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
 * Actor: Change Biography (Group)
 * Actor: Change Biography (Range)
 * Actor: Change Biography (JS)
 * - Changes the biography of the selected actor(s).
 * - Each version has a different means of selecting Actor ID's.
 * 
 *   Step 1: Target ID
 *   - Select which Actor ID(s) to affect.
 *
 *   Step 2: Biography
 *   - Change the biography for target actor(s) to this.
 *   - Text codes allowed. 
 *   - %1 - Actor's name.
 *
 * ---
 *
 * Actor: Change Trait Sets (Group)
 * Actor: Change Trait Sets (Range)
 * Actor: Change Trait Sets (JS)
 * - Changes the Trait Set(s) of the selected actor(s).
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Step 1: Target ID
 *   - Select which Actor ID(s) to affect.
 *
 *   Step 2: Change Trait Set
 *   - Element
 *   - SubElement
 *   - Gender
 *   - Race
 *   - Nature
 *   - Alignment
 *   - Blessing
 *   - Curse
 *   - Zodiac
 *   - Variant
 *     - Change to the name of the Trait Set to switch actor(s) to.
 *     - "Unchanged" to leave alone.
 *     - "Random" to randomize.
 *       - Random will use the random pool dictated by the Plugin Parameters
 *         and the Trait Set weights determined there as well.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Trait Sets (Group)
 * Enemy: Change Trait Sets (Range)
 * Enemy: Change Trait Sets (JS)
 * - Changes the Trait Set(s) of the selected enemy(ies).
 * - Each version has a different means of selecting Enemy Indexes.
 *
 *   Step 1: Target ID
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Change Trait Set
 *   - Element
 *   - SubElement
 *   - Gender
 *   - Race
 *   - Nature
 *   - Alignment
 *   - Blessing
 *   - Curse
 *   - Zodiac
 *   - Variant
 *     - Change to the name of the Trait Set to switch target(s) to.
 *     - "Unchanged" to leave alone.
 *     - "Random" to randomize.
 *       - Random will use the random pool dictated by the Plugin Parameters
 *         and the Trait Set weights determined there as well.
 *
 * ---
 *
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * The following are Script Calls that can be used with this plugin. These are
 * made for JavaScript proficient users. We are not responsible if you use them
 * incorrectly or for unintended usage.
 *
 * ---
 * 
 * === Trait Set-Related Script Calls ===
 * 
 * ---
 *
 * battler.hasTraitSet(typeName)
 * 
 * - Returns a 'true' or 'false' value if the battler has a specific trait set.
 * - This will check all 10 trait set categories (elements, subelements,
 *   gender, race, nature, alignment, blessing, curse, zodiac, variant) and if
 *   any of them match, this will return 'true'. If not, returns 'false'.
 * - 'battler' references a Game_Actor or Game_Enemy.
 * - Replace 'typeName' with a string representing the trait set key name
 *   (ie. 'male' or 'female' or 'goblin' or 'human').
 * 
 * Examples:
 * 
 *   $gameActors.actor(1).hasTraitSet('male')
 *   $gameParty.leader().hasTraitSet('female')
 *   $gameTroop.members()[0].hasTraitSet('goblin')
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Element Rulings
 * ============================================================================
 *
 * These Plugin Parameters control the rulings for Element-related mechanics.
 * These play an important part in determine what to do when multiple elements
 * are present, how to calculate the elemental rates, and 
 *
 * ---
 *
 * Rulings
 * 
 *   Multi-Element Ruling:
 *   - Ruling on how to calculate element rate when there are  multiple
 *     elements used for damage calculation.
 *     - Maximum (largest rate of all elements)
 *     - Minimum (smallest rate of all elements)
 *     - Multiplicative (product of all elements used)
 *     - Additive (sum of all elements used)
 *     - Average (of all the elements used)
 * 
 *   JS: Maximum Rate:
 *   - Determine how maximum element rate is calculated.
 * 
 *   JS: Minimum Rate:
 *   - Determine how minimum element rate is calculated.
 * 
 *   JS: Multiply Rate:
 *   - Determine how a multiplied element rate is calculated.
 * 
 *   JS: Additive Rate:
 *   - Determine how an additive element rate is calculated.
 * 
 *   JS: Average Rate:
 *   - Determine how an average element rate is calculated.
 *
 * ---
 *
 * Formulas
 * 
 *   JS: Received Rate:
 *   - Determine how the element rate for the receiving target is calculated.
 * 
 *   JS: Finalize Rate:
 *   - Determine how the finalized element rate before damage is calculated.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Menu Settings
 * ============================================================================
 *
 * The Status Menu Settings determine how the Status Menu appears and the
 * various objects that exist within it. The option to update it to a more
 * updated menu also exists, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Status Menu Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the
 *     menu scene layout?
 *     - Upper Help, Top Category
 *     - Upper Help, Bottom Category
 *     - Lower Help, Top Category
 *     - Lower Help, Bottom Category
 * 
 *   Trait Set Font Size:
 *   - The font size used for Trait Set Descriptions.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Category Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Category Window.
 *
 * ---
 *
 * Displayed Parameters
 * 
 *   Column 1:
 *   Column 2:
 *   Column 3:
 *   - A list of the parameters that will be displayed in column 1.
 *   - Basic Parameters (ie. MaxHP, ATK, LUK)
 *   - X Parameters (ie. HIT, EVA, CRI)
 *   - S Parameters (ie. PDR, MDR, EXR)
 *
 * ---
 *
 * Elements
 * 
 *   Excluded Elements:
 *   - These element ID's are excluded from the Status Menu list.
 * 
 *   IDs: Column 1:
 *   IDs: Column 2:
 *   - The list of element ID's to show in column 1/2.
 *   - If neither column has ID's, list all elements.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Biography:
 *   - Vocabulary for 'Biography'.
 * 
 *   Damage: Absorb:
 *   - Vocabulary for 'Damage: Absorb'.
 * 
 *   Damage: Received:
 *   - Vocabulary for 'Damage: Received'.
 * 
 *   Damage: Dealt:
 *   - Vocabulary for 'Damage: Dealt'.
 * 
 *   Skill Types:
 *   - Vocabulary for 'Skill Types'.
 * 
 *   Weapon Types:
 *   - Vocabulary for 'Weapon Types'.
 * 
 *   Armor Types:
 *   - Vocabulary for 'Armor Types'.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Menu Categories
 * ============================================================================
 *
 * These Plugin Parameters allow you, the game dev, to add new categories to
 * the Status Menu as you please, and change up how the information is found
 * and displayed within the Status Menu. This will only apply if the Updated
 * Status Menu Layout is enabled.
 *
 * ---
 *
 * Category
 * 
 *   Symbol:
 *   - Symbol used for this category.
 * 
 *   Icon:
 *   - Icon used for this category.
 *   - Use 0 for no icon.
 * 
 *   Text:
 *   - Text name used for this category.
 * 
 *   JS: Draw Data:
 *   - Code used to determine what appears in the data window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Trait Set Settings
 * ============================================================================
 *
 * Trait Sets are new properties added to RPG Maker MZ through this plugin.
 * They're used to streamline the process of applying traits to actors and
 * enemies through the database.
 *
 * Instead of having to manually adjust the elemental rate of each enemy,
 * you can now assign them to a Trait Set (through the Plugin Parameters) and
 * then assign that Trait Set to an enemy or batch of enemies instead. This
 * means that all enemies with <Element: Fire> would be weak and resistance to
 * the same elements determined by the Elemental Fire Trait Set.
 *
 * These Plugin Parameters adjust how Trait Sets are handled on a general scale
 * within your game.
 *
 * ---
 *
 * General
 * 
 *   Enable Trait Sets?:
 *   - Enable Trait Sets? This must be enabled for Trait Sets to have any kind
 *     of effect on battlers.
 * 
 *   Enemy Name Format:
 *   - Enemy name format on how Trait Sets affect how enemy names appear.
 *   - Choose from the list or customize it.
 *     - [name] [letter]
 *     - [element] [name] [letter]
 *     - [element] [subelement] [name] [letter]
 *     - [name][gender] [letter]
 *     - [race] [name][gender] [letter]
 *     - [alignment] [name][gender] [letter]
 *     - [blessing] [name][gender] [letter]
 *     - [curse] [name][gender] [letter]
 *     - [name][gender]([zodiac]) [letter]
 *     - [variant] [name][gender] [letter]
 *     - [variant] [nature] [name][gender] [letter]
 *     - [variant] [nature] [element] [name][gender] [letter]
 *     - [alignment] [variant] [nature] [element] [name][gender] [letter]
 *     - ...and more...
 *
 * ---
 *
 * Trait Columns
 *
 *   Column 1 Traits:
 *   Column 2 Traits:
 *   - List of the traits that appear in this column.
 *   - Used by default in the Properties category.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Trait Set Types
 * ============================================================================
 *
 * Trait Sets are new properties added to RPG Maker MZ through this plugin.
 * They're used to streamline the process of applying traits to actors and
 * enemies through the database.
 *
 * Instead of having to manually adjust the elemental rate of each enemy,
 * you can now assign them to a Trait Set (through the Plugin Parameters) and
 * then assign that Trait Set to an enemy or batch of enemies instead. This
 * means that all enemies with <Element: Fire> would be weak and resistance to
 * the same elements determined by the Elemental Fire Trait Set.
 *
 * There are 10 different types of Trait Set Types out there that you can
 * assign to actors and enemies and they all work the same way, just under
 * different categories.
 *
 * ---
 *
 * Element
 * SubElement
 * Gender
 * Race
 * Nature
 * Alignment
 * Blessing
 * Curse
 * Zodiac
 * Variant
 * 
 *   Name:
 *   - Name of this Trait Set. Also used as a reference key
 * 
 *   Display Text:
 *   - How the Trait Set is displayed in game when selected.
 *   - Text codes are allowed.
 * 
 *   Help Description:
 *   - Help description for this Trait Set if required.
 * 
 *   Format Text:
 *   - The text that's added onto an enemy's name if this Trait Set is used.
 * 
 *   Valid for Random?:
 *   - Is this Trait Set valid for random selection?
 * 
 *   Random Weight:
 *   - Default weight of this Trait Set if valid for random.
 * 
 *   Traits:
 * 
 *   Element Rates:
 *   - The elemental damage rates received for this Trait Set.
 *   - The modifiers are multiplicative.
 * 
 *   Basic Parameters:
 *   - The basic parameter rates altered by this Trait set.
 *   - The modifiers are multiplicative.
 * 
 *   X Parameters:
 *   - The X parameter rates altered by this Trait set.
 *   - The modifiers are additive.
 * 
 *   S Parameters:
 *   - The S parameter rates altered by this Trait set.
 *   - The modifiers are multiplicative.
 * 
 *   Passive States:
 *   - Passive states that are applied to this Trait Set.
 *   - Requires VisuMZ_1_SkillsStatesCore.
 *   - Refer to VisuMZ_1_SkillsStatesCore's documentation for more details.
 * 
 *   Equipment:
 * 
 *   Weapon Types:
 *   - Additional weapon types usable by this Trait Set.
 * 
 *   Armor Types:
 *   - Additional armor types usable by this Trait Set.
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
 * Version 1.23: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Damage vs name Trait: x%>
 * *** <Healing vs name Trait: x%>
 * *** <Accuracy VS name Trait: x%>
 * *** <Critical VS name Trait: x%>
 * **** New notetags that enhance actions and trait objects to augment damage,
 *      healing, accuracy, and critical hit rates against targets with specific
 *      trait sets.
 * ** New script calls added by Arisu:
 * *** battler.hasTraitSet(typeName)
 * **** This will check all 10 trait set categories (elements, subelements,
 *      gender, race, nature, alignment, blessing, curse, zodiac, variant) and
 *      if any of them match, this will return 'true'. If not, returns 'false'.
 * 
 * Version 1.22: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented "max" element rate rulings to disable element
 *    absorption. Fix made by Arisu.
 * 
 * Version 1.21: March 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.20: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: January 20, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Notetags added by Olivia and sponsored by Anon:
 * ** Trait Object Notetag: <Element Pierce: x,x,x>
 * *** Gives the unit the ability to attack with the element and bypass any
 *     kinds of damage immunities, reflections, and absorptions. Actions can
 *     still miss or be countered, however.
 * ** Action Object Notetag: <Element Pierce>
 * *** Makes this skill/item bypass any kinds of damage immunities,
 *     reflections, and absorptions. Action can still miss or be countered.
 * 
 * Version 1.18: August 18, 2022
 * * Feature Update!
 * ** When enemy traits are changed, their visuals will reflect the change.
 *    Update made by Arisu.
 * 
 * Version 1.17: April 28, 2022
 * * Bug Fixes!
 * ** Fixed a problem with certain trait affinities ignoring zero values.
 *    Fix made by Olivia.
 * 
 * Version 1.16: October 14, 2021
 * * Compatibility Update!
 * ** Those using the updated layout of the Status Menu will now have the
 *    windows inherit the background type of the previous layout's Status
 *    Window Background Type from the Core Engine settings. Update by Irina.
 * 
 * Version 1.15: July 23, 2021
 * * Bug Fixes!
 * ** Fixed trait blessing calculations for X Parameters to make more sense and
 *    not snuff out if the base value is 0%.
 *    Fix made by Arisu.
 * 
 * Version 1.14: May 28, 2021
 * * Bug Fixes!
 * ** Added fail safe to prevent passive state melding from traits to crash the
 *    game when cache fails to collect data. Fix by Irina.
 * 
 * Version 1.13: May 21, 2021
 * * Documentation Update
 * ** Added for Trait "Passive States" section:
 * *** Refer to VisuMZ_1_SkillsStatesCore's documentation for more details.
 * 
 * Version 1.12: April 30, 2021
 * * Bug Fixes!
 * ** When changing traits to a random value, load up any passive states and
 *    other effects that may have changed. Fix made by Arisu.
 * 
 * Version 1.11: February 26, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 29, 2021
 * * Bug Fixes!
 * ** <Multi-Element: x> notetags should now work properly. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Irina:
 * *** <Equip Trait Requirement: name>
 * **** Makes this piece of equipment equippable by only actors with those
 *      traits. If there are multiple traits required, all of them have to be
 *      met. If multiple trait types share the same trait name, the listed name
 *      will count for all of them.
 * **** Usage Example: <Equip Trait Requirement: Female> makes the item only
 *      equippable by female actors as long as they are tagged as female.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL.
 * *** Status Menu Settings > Elements > IDs: Column 1 added
 * *** Status Menu Settings > Elements > IDs: Column 2 added
 * **** The list of element ID's to show in column 1/2.
 * **** If neither column has ID's, list all elements.
 * ***** If you do not update the drawn JS found in the Status Menu Categories
 *       Plugin Parameters, these new settings won't do anything.
 * * Feature Update!
 * ** Plugin Parameter updates made by Irina and sponsored by AndyL.
 * *** Status Menu Categories > Parameters updated
 * **** Default draw options now have a slightly thicker padding to make the
 *      parameter values easier to read.
 * *** Status Menu Categories > Elements updated
 * **** Default draw options now factor in multiple columns as applied by the
 *      new plugin parameters above.
 * *** Status Menu Categories > Access updated
 * **** Skill Types, Weapon Types, and Armor Types are now centered in the
 *      various data columns to allow for better reading.
 * ** Default settings have been added to the Plugin Parameters. If you want to
 *    acquire these settings for an already-existing project, do either of the
 *    following:
 * *** Delete the existing VisuMZ_1_ElementStatusCore.js in the Plugin Manager
 *     list and install the newest version.
 * *** Or create a new project, install VisuMZ_1_ElementStatusCore.js there,
 *     then copy over the "Status Menu Categories" parameters found in the
 *     Plugin Parameters to your current project.
 *
 * Version 1.09: January 8, 2021
 * * Bug Fixes!
 * ** Default "JS: Draw Data" code for Plugin Parameters > Status Menu
 *    Categories > Elements has been updated to account for Trait Type
 *    visibility for both Element and Sub-Element. This won't update normally
 *    as it is a part of the Plugin Parameters. You will need to either delete
 *    the reinstall the plugin into the Plugin Manager list or copy and paste
 *    the Status Menu Categories plugin parameters from a fresh install. Fix
 *    made by Irina.
 * 
 * Version 1.08: November 29, 2020
 * * Bug Fixes!
 * ** Trait Set bonuses for X Parameters and S Parameters no longer increase
 *    exponentially with each other. Fix made by Arisu.
 * 
 * Version 1.07: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.06: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Yanfly.
 *
 * Version 1.05: October 4, 2020
 * * Bug Fixes!
 * ** Main Menu Portraits are now forced to pre-load prior to entering the
 *    Status Menu scene to ensure images will properly appear.
 *    Fix made by Irina.
 * 
 * Version 1.04: September 20, 2020
 * * Bug Fixes!
 * ** The "Column 1 and 2 Traits" plugin parameters for "General Trait Set"
 *    should now work. You will need to readjust them again. Fix by Arisu.
 * ** The "Elements" Status Menu Categories tab has its "JS: Draw Data"
 *    updated to display the percentages properly for Dealt Damage bonuses.
 *    This won't update normally as it's a part of the plugin parameters. You
 *    would need to do either a fresh install, copy from the sample project,
 *    or change the code bit yourself. To change to code bit, look for this:
 *      let dealtText = '%1%'.format(dealt);
 *    and change it to:
 *      let dealtText = '%1%'.format(Math.round(dealt * 100));
 *    Fix made by Irina.
 * 
 * Version 1.03: September 6, 2020
 * * Documentation Update!
 * ** <Dealt Element id Flat: +x%> notetag gets a more indepth explanation.
 * *** This does not add on flat bonus damages after calculating elemental
 *     rates. This merely adds onto it at the end after applying rates if
 *     the formula from above is unchanged.
 * * New Features!
 * ** New Plugin Parameters added in Status Menu Settings for disabling the
 *    back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** Trait Set bonuses for X Parameters and S Parameters now show up properly
 *    in the Status Menu. Fix made by Yanfly.
 * ** Trait Set Sideview Battler Solo Weapon and Solo Motion notetags are now
 *    fixed to register properly with Battle Core. Fix made by Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states now work with Skills & States Core. Fix made by Yanfly.
 * ** Fixed S parameters not working. Fix made by Yanfly.
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
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeBiographyGroup
 * @text Actor: Change Biography (Group)
 * @desc Changes the biography of the selected actor(s).
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Biography:json
 * @text Step 2: Biography
 * @type note
 * @desc Change the biography for target actor(s) to this.
 * Text codes allowed. %1 - Actor's name.
 * @default "This is %1's new biography."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeBiographyRange
 * @text Actor: Change Biography (Range)
 * @desc Changes the biography of the selected actor(s).
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Biography:json
 * @text Step 2: Biography
 * @type note
 * @desc Change the biography for target actor(s) to this.
 * Text codes allowed. %1 - Actor's name.
 * @default "This is %1's new biography."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeBiographyJS
 * @text Actor: Change Biography (JS)
 * @desc Changes the biography of the selected actor(s).
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Biography:json
 * @text Step 2: Biography
 * @type note
 * @desc Change the biography for target actor(s) to this.
 * Text codes allowed. %1 - Actor's name.
 * @default "This is %1's new biography."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTraitSetsGroup
 * @text Actor: Change Trait Sets (Group)
 * @desc Changes the Trait Set(s) of the selected actor(s).
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTraitSetsRange
 * @text Actor: Change Trait Sets (Range)
 * @desc Changes the Trait Set(s) of the selected actor(s).
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTraitSetsJS
 * @text Actor: Change Trait Sets (JS)
 * @desc Changes the Trait Set(s) of the selected actor(s).
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Enemy
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTraitSetsGroup
 * @text Enemy: Change Trait Sets (Group)
 * @desc Changes the Trait Set(s) of the selected enemy(ies).
 * Select from a group of enemy indexes to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type number[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTraitSetsRange
 * @text Enemy: Change Trait Sets (Range)
 * @desc Changes the Trait Set(s) of the selected enemy(ies).
 * Select from a range of enemy indexes to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type number
 * @desc Select which Enemy Index to start from.
 * @default 0
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type number
 * @desc Select which Index to end at.
 * @default 7
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTraitSetsJS
 * @text Enemy: Change Trait Sets (JS)
 * @desc Changes the Trait Set(s) of the selected enemy(ies).
 * Select from a group of enemy indexes using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Enemy Indexes to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
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
 * @param ElementStatusCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ElementRules:struct
 * @text Element Rulings
 * @type struct<ElementRules>
 * @desc The rulings for Element-related mechanics.
 * @default {"Rulings":"","MultiRule:str":"multiply","RuleMaxCalcJSa:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet max = -1000;\\nfor (const elementId of elements) {\\n    const sign = absorbed.includes(elementId) ? -1 : 1;\\n    max = Math.max(max, target.elementRate(elementId) * sign);\\n}\\nreturn max;\"","RuleMinCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet min = 0;\\nfor (const elementId of elements) {\\n    const sign = absorbed.includes(elementId) ? -1 : 1;\\n    min = Math.min(min, target.elementRate(elementId) * sign);\\n}\\nreturn min;\"","RuleMultiplyCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet rate = 1;\\nlet sign = 1;\\nfor (const elementId of elements) {\\n    if (absorbed.includes(elementId)) sign = -1;\\n    rate *= target.elementRate(elementId);\\n}\\nreturn rate * sign;\"","RuleAdditiveCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet rate = 0;\\nfor (const elementId of elements) {\\n    const sign = absorbed.includes(elementId) ? -1 : 1;\\n    rate += target.elementRate(elementId) * sign;\\n}\\nreturn rate;\"","RuleAverageCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst rate = action.elementsRateSum(target, elements);\\nreturn rate / elements.length;\"","Formulas":"","ReceivedRateJS:func":"\"// Declare Constants\\nconst elementId = arguments[0];\\nconst target = this;\\nconst base = 1;\\nconst plus = target.getReceiveElementPlus(elementId);\\nconst rate = target.getReceiveElementRate(elementId);\\nconst flat = target.getReceiveElementFlat(elementId);\\n\\n// Determine Return Value\\nreturn Math.max(0, (base + plus) * rate + flat);\"","FinalizeRateJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst action = this;\\nconst elements = action.elements();\\nconst targetRate = action.calcTargetElementRate(target, elements);\\nconst sign = targetRate >= 0 ? 1 : -1;\\nconst base = Math.abs(targetRate);\\nconst plus = action.calcUserElementDamagePlus(target, elements);\\nconst rate = action.calcUserElementDamageRate(target, elements);\\nconst flat = action.calcUserElementDamageFlat(target, elements);\\n\\n// Determine Return Value\\nreturn sign * Math.max((base + plus) * rate + flat, 0);;\""}
 *
 * @param StatusMenu:struct
 * @text Status Menu Settings
 * @type struct<StatusMenu>
 * @desc The settings for the Status Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/top","TraitDescriptionFontSize:num":"18","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"icon","CmdTextAlign:str":"center","Parameters":"","Col1:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","Col2:arraystr":"[\"HIT\",\"EVA\",\"CRI\",\"CEV\",\"MEV\",\"MRF\",\"CNT\",\"HRG\",\"MRG\",\"TRG\"]","Col3:arraystr":"[\"TGR\",\"GRD\",\"REC\",\"PHA\",\"MCR\",\"TCR\",\"PDR\",\"MDR\",\"FDR\",\"EXR\"]","Elements":"","ExcludeElements:arraynum":"[]","ElementsCol1:arraynum":"[]","ElementsCol2:arraynum":"[]","Vocabulary":"","VocabBiography:str":"Biography","VocabDmgAbsorb:str":"Absorbs %1%","VocabDmgReceive:str":"Elemental Resistance","VocabDmgDealt:str":"Bonus Damage","VocabStype:str":"Skill Types","VocabWtype:str":"Weapon Types","VocabAtype:str":"Armor Types"}
 *
 * @param StatusMenuList:arraystruct
 * @text Status Menu Categories
 * @parent StatusMenu:struct
 * @type struct<StatusCategory>[]
 * @desc This is a list of categories that appear in the 
 * Status Menu Scene.
 * @default ["{\"Symbol:str\":\"general\",\"Icon:num\":\"84\",\"Text:str\":\"General\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst maxExp = '-------';\\\\nconst lineHeight = this.lineHeight();\\\\nconst gaugeLineHeight = this.gaugeLineHeight();\\\\nconst basicDataHeight = lineHeight * 6.5;\\\\nconst actor = this._actor;\\\\nconst padding = this.itemPadding();\\\\nconst halfWidth = this.innerWidth / 2;\\\\nlet rect = new Rectangle(0, 0, halfWidth, this.innerHeight);\\\\nlet x = 0;\\\\nlet y = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, this.innerWidth / 2);\\\\n\\\\n// Declare Smaller Data Area\\\\nlet sx = rect.x;\\\\nlet sy = Math.max(rect.y, rect.y + (rect.height - basicDataHeight));\\\\nlet sw = rect.width;\\\\nlet sh = rect.y + rect.height - sy;\\\\n\\\\n// Draw Actor Name\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight, 2);\\\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\\\n\\\\n// Draw Actor Level\\\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight);\\\\nthis.drawActorLevel(actor, sx, sy);\\\\n\\\\n// Draw Actor Class\\\\nconst className = actor.currentClass().name;\\\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight);\\\\nthis.drawTextEx(className, sx, sy, sw);\\\\n\\\\n// Draw Actor Icons\\\\nsx = rect.x + Math.round((rect.width - 144) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight);\\\\nthis.drawActorIcons(actor, sx, sy);\\\\n\\\\n// Draw Gauges\\\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, this.innerHeight - sy);\\\\nthis.placeGauge(actor, \\\\\\\"hp\\\\\\\", sx, sy);\\\\nsy += gaugeLineHeight;\\\\nthis.placeGauge(actor, \\\\\\\"mp\\\\\\\", sx, sy);\\\\nsy += gaugeLineHeight;\\\\nif ($dataSystem.optDisplayTp) {\\\\n    this.placeGauge(actor, \\\\\\\"tp\\\\\\\", sx, sy);\\\\n}\\\\n\\\\n// Declare Second Half\\\\nrect = new Rectangle(halfWidth, 0, halfWidth, this.innerHeight);\\\\n\\\\n// Draw EXP\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawItemDarkRect(rect.x, rect.y, rect.width, lineHeight, 2);\\\\nthis.drawText(TextManager.exp, rect.x, rect.y, rect.width, 'center');\\\\nconst expHeight = lineHeight * 5;\\\\nthis.drawItemDarkRect(rect.x, rect.y + lineHeight * 1, rect.width, lineHeight * 2);\\\\nthis.drawItemDarkRect(rect.x, rect.y + lineHeight * 3, rect.width, lineHeight * 2);\\\\nconst expTotal = TextManager.expTotal.format(TextManager.exp);\\\\nconst expNext = TextManager.expNext.format(TextManager.level);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(expTotal, rect.x + padding, rect.y + lineHeight * 1, rect.width - padding * 2);\\\\nthis.drawText(expNext, rect.x + padding, rect.y + lineHeight * 3, rect.width - padding * 2);\\\\nthis.resetTextColor();\\\\nconst expTotalValue = actor.currentExp();\\\\nconst expNextValue = actor.isMaxLevel() ? maxExp : actor.nextRequiredExp();\\\\nthis.drawText(expTotalValue, rect.x + padding, rect.y + lineHeight * 1, rect.width - padding * 2, 'right');\\\\nthis.drawText(expNextValue, rect.x + padding, rect.y + lineHeight * 3, rect.width - padding * 2, 'right');\\\\n\\\\n// Write Actor Biography\\\\ny = rect.y + expHeight;\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, lineHeight, 2);\\\\nthis.drawText(TextManager.statusMenuBiography, rect.x, y, rect.width, 'center');\\\\nthis.resetTextColor();\\\\ny += lineHeight;\\\\nconst bioText = actor.getBiography();\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\\nthis.drawTextEx(bioText, rect.x + padding, y, rect.width - padding * 2);\\\"\"}","{\"Symbol:str\":\"parameters\",\"Icon:num\":\"87\",\"Text:str\":\"Parameters\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst lineHeight = this.lineHeight();\\\\nconst gaugeLineHeight = this.gaugeLineHeight();\\\\nconst basicDataHeight = this.basicDataHeight();\\\\nconst padding = this.itemPadding() * 2;\\\\nconst thirdWidth = Math.floor(this.innerWidth / 3);\\\\nlet x = 0;\\\\nlet y = 0;\\\\nlet paramWidth = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, this.innerWidth / 2);\\\\n\\\\n// Declare Parameter Rect\\\\nlet rect = new Rectangle(0, 0, thirdWidth, this.innerHeight);\\\\n\\\\n// Declare Parameters\\\\nconst params1 = this.getParameterList(1);\\\\nconst params2 = this.getParameterList(2);\\\\nconst params3 = this.getParameterList(3);\\\\nconst maxLength = Math.max(params1.length, params2.length, params3.length);\\\\nconst nameWidth = rect.width - padding * 2 - this.textWidth('88888');\\\\nconst topY = Math.max((this.innerHeight - (maxLength * lineHeight)) / 2, 0);\\\\n\\\\n// Draw Parameters 1\\\\nx = rect.x + padding;\\\\ny = topY;\\\\nparamWidth = rect.width - (padding * 2);\\\\nif (y !== 0) this.drawItemDarkRect(rect.x, 0, rect.width, y);\\\\nfor (const paramId of params1) {\\\\n    this.drawItemDarkRect(rect.x, y, rect.width, lineHeight);\\\\n    this.drawParamName(paramId, x, y, nameWidth);\\\\n    this.drawParamValue(paramId, x, y, paramWidth);\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Parameters 2\\\\nrect.x += rect.width;\\\\nx = rect.x + padding;\\\\ny = topY;\\\\nparamWidth = rect.width - (padding * 2);\\\\nif (y !== 0) this.drawItemDarkRect(rect.x, 0, rect.width, y);\\\\nfor (const paramId of params2) {\\\\n    this.drawItemDarkRect(rect.x, y, rect.width, lineHeight);\\\\n    this.drawParamName(paramId, x, y, nameWidth);\\\\n    this.drawParamValue(paramId, x, y, paramWidth);\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Parameters 3\\\\nrect.x += rect.width;\\\\nrect.width = this.innerWidth - rect.x;\\\\nx = rect.x + padding;\\\\ny = topY;\\\\nparamWidth = rect.width - (padding * 2);\\\\nif (y !== 0) this.drawItemDarkRect(rect.x, 0, rect.width, y);\\\\nfor (const paramId of params3) {\\\\n    this.drawItemDarkRect(rect.x, y, rect.width, lineHeight);\\\\n    this.drawParamName(paramId, x, y, nameWidth);\\\\n    this.drawParamValue(paramId, x, y, paramWidth);\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\"\"}","{\"Symbol:str\":\"properties\",\"Icon:num\":\"83\",\"Text:str\":\"Properties\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst traitCol1 = Window_StatusData.traitCol1;\\\\nconst traitCol2 = Window_StatusData.traitCol2;\\\\nconst lineHeight = this.lineHeight();\\\\nconst actor = this._actor;\\\\nconst padding = this.itemPadding();\\\\nconst traitHeight = (this.innerHeight / Math.max(traitCol1.length, traitCol2.length)) - lineHeight;\\\\nconst width = this.innerWidth / 2;\\\\nlet x = 0;\\\\nlet y = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, width);\\\\n\\\\n// Draw Trait Set 1\\\\nfor (const type of traitCol1) {\\\\n    const traitType = DataManager.traitSetType(type);\\\\n    const traitSet = actor.traitSet(type);\\\\n    this.drawItemDarkRect(0, y, width, lineHeight, 2);\\\\n    const labelText = '\\\\\\\\\\\\\\\\C[16]%1: \\\\\\\\\\\\\\\\C[0]%2'.format(traitType.Label, traitSet.Display);\\\\n    this.drawTextEx(labelText, padding, y, width - padding * 2);\\\\n    y += lineHeight;\\\\n    this.setDescriptionFontSizeToTraitSet();\\\\n    this.drawItemDarkRect(0, y, width, traitHeight);\\\\n    this.drawTextEx(traitSet.Description, padding, y, width - padding * 2);\\\\n    y += traitHeight;\\\\n    this.resetDescriptionFontSize();\\\\n}\\\\n\\\\n// Draw Filler Rect 1\\\\nif (this.innerHeight - y > 0) {\\\\n    this.drawItemDarkRect(0, y, width, this.innerHeight - y);\\\\n}\\\\n\\\\n// Draw Trait Set 2\\\\ny = 0;\\\\nfor (const type of traitCol2) {\\\\n    const traitType = DataManager.traitSetType(type);\\\\n    const traitSet = actor.traitSet(type);\\\\n    this.drawItemDarkRect(width, y, width, lineHeight, 2);\\\\n    const labelText = '\\\\\\\\\\\\\\\\C[16]%1: \\\\\\\\\\\\\\\\C[0]%2'.format(traitType.Label, traitSet.Display);\\\\n    this.drawTextEx(labelText, width + padding, y, width - padding * 2);\\\\n    y += lineHeight;\\\\n    this.setDescriptionFontSizeToTraitSet();\\\\n    this.drawItemDarkRect(width, y, width, traitHeight);\\\\n    this.drawTextEx(traitSet.Description, width + padding, y, width - padding * 2);\\\\n    y += traitHeight;\\\\n    this.resetDescriptionFontSize();\\\\n}\\\\n\\\\n// Draw Filler Rect 1\\\\nif (this.innerHeight - y > 0) {\\\\n    this.drawItemDarkRect(width, y, width, this.innerHeight - y);\\\\n}\\\"\"}","{\"Symbol:str\":\"elements\",\"Icon:num\":\"64\",\"Text:str\":\"Elements\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst lineHeight = this.lineHeight();\\\\nconst actor = this._actor;\\\\nconst padding = this.itemPadding();\\\\nconst labelFmt = '\\\\\\\\\\\\\\\\C[16]%1: \\\\\\\\\\\\\\\\C[0]%2';\\\\nconst traitType1 = DataManager.traitSetType('Element');\\\\nconst traitSet1 = actor.traitSet('Element');\\\\nconst traitType2 = DataManager.traitSetType('SubElement');\\\\nconst traitSet2 = actor.traitSet('SubElement');\\\\nconst traitHeight = (this.innerHeight / Math.max(Window_StatusData.traitCol1.length, Window_StatusData.traitCol2.length)) - lineHeight;\\\\nlet x = 0;\\\\nlet y = 0;\\\\nlet width = this.innerWidth / 2;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, width);\\\\n\\\\n// Draw Element Trait Sets\\\\nif (traitType1.Visible || traitType2.Visible) {\\\\n    this.drawItemDarkRect(x, y, width, lineHeight, 2);\\\\n    this.drawItemDarkRect(width, y, width, lineHeight, 2);\\\\n    if (traitType1.Visible) {\\\\n        this.drawTextEx(labelFmt.format(traitType1.Label, traitSet1.Display), padding, y, width - padding * 2);\\\\n    }\\\\n    if (traitType2.Visible) {\\\\n        this.drawTextEx(labelFmt.format(traitType2.Label, traitSet2.Display), width + padding, y, width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n    this.setDescriptionFontSizeToTraitSet();\\\\n    this.drawItemDarkRect(x, y, width, traitHeight);\\\\n    this.drawItemDarkRect(width, y, width, traitHeight);\\\\n    if (traitType1.Visible) {\\\\n        this.drawTextEx(traitSet1.Description, padding, y, width - padding * 2);\\\\n    }\\\\n    if (traitType2.Visible) {\\\\n        this.drawTextEx(traitSet2.Description, width + padding, y, width - padding * 2);\\\\n    }\\\\n    this.resetDescriptionFontSize();\\\\n    this.resetFontSettings();\\\\n    y += traitHeight;\\\\n}\\\\nconst topY = y;\\\\n\\\\n// Prepare Elemental Data\\\\nconst elementCol1 = this.getElementIDsCol1();\\\\nconst elementCol2 = this.getElementIDsCol2();\\\\nlet columnData;\\\\nif (elementCol2.length > 0) {\\\\n    columnData = ['Resist','Resist','Bonus','Bonus'];\\\\n} else {\\\\n    columnData = ['Resist','Bonus'];\\\\n}\\\\nconst dataRows = Math.max(elementCol1.length, elementCol2.length, 1);\\\\nconst dataCols = columnData.length;\\\\n\\\\n// Draw Elemental Data\\\\nthis.drawItemDarkRect(width * 0, y, width, lineHeight, 2);\\\\nthis.drawItemDarkRect(width * 1, y, width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuDmgReceive, width * 0, y, width, 'center');\\\\nthis.drawText(TextManager.statusMenuDmgDealt, width * 1, y, width, 'center');\\\\ny += lineHeight;\\\\nthis.setDescriptionFontSizeToTraitSet();\\\\nconst smallLineHeight = this.textSizeEx(' ').height;\\\\n\\\\n// Draw Elemental Table\\\\nfor (let i = 0; i < dataRows; i++) {\\\\n    for (let j = 0; j < dataCols; j++) {\\\\n        // Draw Dark Rect\\\\n        const colWidth = this.innerWidth / dataCols;\\\\n        this.drawItemDarkRect(colWidth * j, y, colWidth, smallLineHeight);\\\\n\\\\n        // Draw Element Name\\\\n        let elementID = elementCol1[i];\\\\n        if (dataCols === 4) {\\\\n            elementID = (j % 2 === 0) ? elementCol1[i] : elementCol2[i];\\\\n        }\\\\n        if (!elementID) continue;\\\\n        const name = $dataSystem.elements[elementID];\\\\n        this.drawTextEx(name, colWidth * (j + 1/3) + padding, y, colWidth*2/3);\\\\n        const type = columnData[j];\\\\n\\\\n        // Draw Resistance Data\\\\n        this.resetFontSettings();\\\\n        let drawText = '';\\\\n        if (type === 'Resist') {\\\\n            const rate = actor.elementRate(elementID);\\\\n            const flippedRate = (rate - 1) * -1;\\\\n            this.changeTextColor(ColorManager.paramchangeTextColor(flippedRate));\\\\n            drawText = '%1%'.format(Math.round(flippedRate * 100));\\\\n            if (actor.getAbsorbedElements().includes(elementID)) {\\\\n                this.changeTextColor(ColorManager.powerUpColor());\\\\n                drawText = TextManager.statusMenuDmgAbsorb.format(Math.round(rate * 100));\\\\n            } else if (rate > 1) {\\\\n                drawText = '%1'.format(drawText);\\\\n            } else if (rate <= 1) {\\\\n                drawText = '+%1'.format(drawText);\\\\n            }\\\\n\\\\n        // Draw Bonus Damage Data\\\\n        } else if (type === 'Bonus') {\\\\n            const dealtPlus = actor.getDealtElementPlus(elementID);\\\\n            const dealtRate = actor.getDealtElementRate(elementID);\\\\n            const dealtFlat = actor.getDealtElementFlat(elementID);\\\\n            const dealt = ((1 + dealtPlus) * dealtRate + dealtFlat) - 1;\\\\n            this.changeTextColor(ColorManager.paramchangeTextColor(dealt));\\\\n            drawText = '%1%'.format(Math.round(dealt * 100));\\\\n            if (dealt >= 0) drawText = '+%1'.format(drawText);\\\\n        }\\\\n\\\\n        // Draw Value\\\\n        this.contents.drawText(drawText, colWidth * j, y, (colWidth/3) - padding, smallLineHeight, 'right');\\\\n    }\\\\n    y += smallLineHeight;\\\\n}\\\\n\\\\n// Closing the Table\\\\nfor (let j = 0; j < dataCols; j++) {\\\\n    const colWidth = this.innerWidth / dataCols;\\\\n    this.drawItemDarkRect(colWidth * j, y, colWidth, this.innerHeight - y);\\\\n}\\\"\"}","{\"Symbol:str\":\"access\",\"Icon:num\":\"137\",\"Text:str\":\"Access\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst lineHeight = this.lineHeight();\\\\nconst actor = this._actor;\\\\nconst thirdWidth = Math.floor(this.innerWidth / 3);\\\\nlet x = 0;\\\\nlet y = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, this.innerWidth / 2);\\\\n\\\\n// Declare Parameter Rect\\\\nlet rect = new Rectangle(0, 0, thirdWidth, this.innerHeight);\\\\n\\\\n// Draw Skill Types\\\\nx = rect.x;\\\\ny = 0;\\\\nthis.resetFontSettings();\\\\nthis.drawItemDarkRect(x, y, rect.width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuStype, x, y, rect.width, 'center');\\\\ny += lineHeight;\\\\nfor (const stypeId of actor.skillTypes()) {\\\\n    this.drawItemDarkRect(x, y, rect.width, lineHeight);\\\\n    if (stypeId > 0) {\\\\n        const text = $dataSystem.skillTypes[stypeId];\\\\n        const padding = Math.round((rect.width - this.stypeWidth()) / 2);\\\\n        this.drawTextEx(text, x + padding, y, rect.width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Weapon Types\\\\nrect.x += rect.width;\\\\nx = rect.x;\\\\ny = 0;\\\\nthis.resetFontSettings();\\\\nthis.drawItemDarkRect(x, y, rect.width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuWtype, x, y, rect.width, 'center');\\\\ny += lineHeight;\\\\nfor (const wtypeId of actor.weaponTypes()) {\\\\n    this.drawItemDarkRect(x, y, rect.width, lineHeight);\\\\n    if (wtypeId > 0) {\\\\n        const text = $dataSystem.weaponTypes[wtypeId];\\\\n        const padding = Math.round((rect.width - this.wtypeWidth()) / 2);\\\\n        this.drawTextEx(text, x + padding, y, rect.width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Armor Types\\\\nrect.x += rect.width;\\\\nx = rect.x;\\\\ny = 0;\\\\nrect.width = this.innerWidth - rect.x;\\\\nthis.resetFontSettings();\\\\nthis.drawItemDarkRect(x, y, rect.width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuAtype, x, y, rect.width, 'center');\\\\ny += lineHeight;\\\\nfor (const atypeId of actor.armorTypes()) {\\\\n    this.drawItemDarkRect(x, y, rect.width, lineHeight);\\\\n    if (atypeId > 0) {\\\\n        const text = $dataSystem.armorTypes[atypeId];\\\\n        const padding = Math.round((rect.width - this.atypeWidth()) / 2);\\\\n        this.drawTextEx(text, x + padding, y, rect.width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(x, y, rect.width, this.innerHeight - y);\\\"\"}","{\"Symbol:str\":\"cancel\",\"Icon:num\":\"82\",\"Text:str\":\"Finish\",\"DrawJS:func\":\"\\\"this.drawFirstCategoryData();\\\"\"}"]
 *
 * @param TraitBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param TraitSetSettings:struct
 * @text General Trait Set Settings
 * @type struct<TraitSetSettings>
 * @desc The settings for Trait Sets as a whole.
 * @default {"General":"","Enable:eval":"true","EnemyNameFmt:str":"[variant] [name][gender] [letter]","TraitColumns":"","TraitCol1:arraystr":"[\"Gender\",\"Nature\",\"Blessing\",\"Zodiac\"]","TraitCol2:arraystr":"[\"Race\",\"Alignment\",\"Curse\",\"Variant\"]"}
 *
 * @param Element:struct
 * @text Main Element Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Element","Label:str":"Element","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Neutral\",\"Display:str\":\"\\\\i[160]Neutral\",\"Description:json\":\"\\\"No strengths or weaknesses.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"8\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Fire\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[64]Fire\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[64]Fire and \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Flame\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Ice\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[65]Ice\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[65]Ice and \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Frost\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Thunder\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[66]Thunder\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[66]Thunder and \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Electric\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Water\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[67]Water\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[67]Water and \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Aqua\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Earth\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[68]Earth\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[68]Earth and \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Stone\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wind\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[69]Wind\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[69]Wind and \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Air\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Light\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Light\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bright\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Darkness\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Darkness\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Shadow\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param SubElement:struct
 * @text Sub Element Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Sub-Element","Label:str":"Sub-Element","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"-\",\"Display:str\":\"-\",\"Description:json\":\"\\\"\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"8\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Fire\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[64]Fire\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[64]Fire and \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Flame\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Ice\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[65]Ice\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[65]Ice and \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Frost\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Thunder\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[66]Thunder\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[66]Thunder and \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Electric\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Water\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[67]Water\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[67]Water and \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Aqua\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Earth\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[68]Earth\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[68]Earth and \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Stone\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wind\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[69]Wind\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[69]Wind and \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Air\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Light\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Light\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bright\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Darkness\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Darkness\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Shadow\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Gender:struct
 * @text Gender Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Gender","Label:str":"Gender","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Unknown\",\"Display:str\":\"\\\\I[160]Unknown\",\"Description:json\":\"\\\"Uncertain to this unit's gender.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"false\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Male\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[165]Male\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has stronger physical attributes.\\\\\\\\nThis unit has weaker magical attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♂\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"50\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.95\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Female\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[162]Female\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has stronger magical attributes.\\\\\\\\nThis unit has weaker physical attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♀\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"50\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.05\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Both\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[84]Both\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"⚥\\\",\\\"RandomValid:eval\\\":\\\"false\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.10\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Race:struct
 * @text Race Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Race","Label:str":"Race","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Uncategorized\",\"Display:str\":\"\\\\I[16]Uncategorized\",\"Description:json\":\"\\\"This race's attributes have not been determined.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Human\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[82]Human\\\",\\\"Description:json\\\":\\\"\\\\\\\"This race has neutral attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Human\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"High Elf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[101]High Elf\\\",\\\"Description:json\\\":\\\"\\\\\\\"High Elves have more MaxMP and less MaxHP.\\\\\\\\nHigh Elves can equip Canes and Magic Armor.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"High Elven\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"6\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"2\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wood Elf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[102]Wood Elf\\\",\\\"Description:json\\\":\\\"\\\\\\\"Wood Elves have more AGI and less DEF.\\\\\\\\nWood Elves can equip Bows and Crossbows.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Wood Elven\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"7\\\\\\\",\\\\\\\"8\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Dark Elf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Dark Elf\\\",\\\"Description:json\\\":\\\"\\\\\\\"Dark Elves have more ATK and less MAT.\\\\\\\\nDark Elves can equip Daggers and Swords.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dark Elven\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"1\\\\\\\",\\\\\\\"2\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Dwarf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[223]Dwarf\\\",\\\"Description:json\\\":\\\"\\\\\\\"Dwarves have more MaxHP and less AGI.\\\\\\\\nDwarves can equip Flails and Heavy Armor.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dwarvin\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"3\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"4\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Gnome\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[140]Gnome\\\",\\\"Description:json\\\":\\\"\\\\\\\"Gnomes have more AGI and less DEF.\\\\\\\\nGnomes can equip Daggers and Light Armor.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Gnomish\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"1\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"3\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Halfling\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[142]Halfling\\\",\\\"Description:json\\\":\\\"\\\\\\\"Halflings have more LUK and less MaxMP.\\\\\\\\nHalflings can equip Sword and Small Shields.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Hafling\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.10\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"2\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"5\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wolfkin\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[105]Wolfkin\\\",\\\"Description:json\\\":\\\"\\\\\\\"Wolfkin have more ATK and less MAT.\\\\\\\\nWolfkin can equip Claws and Gloves.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Wolfkin\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"10\\\\\\\",\\\\\\\"11\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Felyne\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[100]Felyne\\\",\\\"Description:json\\\":\\\"\\\\\\\"Felyne have more MAT and less ATK.\\\\\\\\nFelyne can equip Whips and Canes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Felyne\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"5\\\\\\\",\\\\\\\"6\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lizardman\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[99]Lizardman\\\",\\\"Description:json\\\":\\\"\\\\\\\"Lizardmen have more DEF and less LUK.\\\\\\\\nLizardmen can equip Axes and Spears.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lizardman\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.90\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"4\\\\\\\",\\\\\\\"12\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Nature:struct
 * @text Nature Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Nature","Label:str":"Nature","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Chill\",\"Display:str\":\"\\\\I[84]Chill\",\"Description:json\":\"\\\"This unit has neutral parameters.\\\"\",\"FmtText:str\":\"Chill\",\"RandomValid:eval\":\"false\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Hardy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[50]Hardy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Hardy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lonely\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[51]Lonely\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lonely\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Adamant\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[52]Adamant\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Adamant\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Naughty\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[53]Naughty\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Naughty\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Brave\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[54]Brave\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Brave\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Bold\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[50]Bold\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bold\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Docile\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[51]Docile\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Docile\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Impish\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[52]Impish\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Impish\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lax\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[53]Lax\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lax\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Relaxed\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[54]Relaxed\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Relaxed\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Modest\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[50]Modest\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Modest\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Mild\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[51]Mild\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Mild\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Bashful\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[52]Bashful\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bashful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Rash\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[53]Rash\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Rash\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Quiet\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[54]Quiet\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Quiet\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Calm\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[50]Calm\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Calm\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Gentle\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[51]Gentle\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Gentle\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Careful\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[52]Careful\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Careful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Quirky\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[53]Quirky\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Quirky\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Sassy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[54]Sassy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Sassy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Timid\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[50]Timid\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Timid\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Hasty\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[51]Hasty\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Hasty\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Jolly\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[52]Jolly\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Jolly\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Naive\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[53]Naive\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Naive\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Serious\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[54]Serious\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Serious\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Alignment:struct
 * @text Alignment Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Alignment","Label:str":"Alignment","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Neutral\",\"Display:str\":\"\\\\I[160]Neutral\",\"Description:json\":\"\\\"This unit's alignment is completely neutral.\\\"\",\"FmtText:str\":\"Neutral\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Lawful Good\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Lawful Good\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Good\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Neutral Good\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Neutral Good\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Good\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Chaotic Good\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Chaotic Good\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Good\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lawful Neutral\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[160]Lawful Neutral\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[67]Water, \\\\\\\\\\\\\\\\I[68]Earth, \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[64]Fire, \\\\\\\\\\\\\\\\I[65]Ice, \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Neutral\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Chaotic Neutral\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[160]Chaotic Neutral\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[64]Fire, \\\\\\\\\\\\\\\\I[65]Ice, \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[67]Water, \\\\\\\\\\\\\\\\I[68]Earth, \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Neutral\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lawful Evil\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Lawful Evil\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Evil\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Neutral Evil\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Neutral Evil\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Evil\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Chaotic Evil\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Chaotic Evil\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Evil\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Blessing:struct
 * @text Blessing Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Blessing","Label:str":"Blessing","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"No Blessing\",\"Display:str\":\"\\\\I[160]No Blessing\",\"Description:json\":\"\\\"This unit has not received a blessing.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"6\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Dextrous\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Dextrous\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased HIT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dextrous\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.20\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Elusive\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Elusive\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased EVA.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Elusive\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.20\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Impact\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Impact\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased CRI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Impactful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.20\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Healthy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Healthy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has innate HP Regeneration.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Healthy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.05\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Focused\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Focused\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has innate MP Regeneration.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Focused\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.05\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Energetic\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Energetic\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has innate TP Regeneration.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Energetic\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.05\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Curse:struct
 * @text Curse Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Curse","Label:str":"Curse","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"No Curse\",\"Display:str\":\"\\\\I[160]No Curse\",\"Description:json\":\"\\\"This unit has not been cursed.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"6\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Clumsy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Clumsy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has less HIT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Clumsy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Dazed\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Dazed\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has less EVA.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dazed\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Fitful\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Fitful\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has less CRI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Fitful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Drained\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Drained\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit receives less healing.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Drained\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{\\\\\\\"SParam0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam2:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"SParam3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam9:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Inefficient\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Inefficient\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit uses more MP.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Inefficient\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{\\\\\\\"SParam0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam4:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"SParam5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam9:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Unmotivated\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Unmotivated\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit gaines less TP.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Unmotivated\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{\\\\\\\"SParam0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam5:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"SParam6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam9:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Zodiac:struct
 * @text Zodiac Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Zodiac","Label:str":"Zodiac","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Unknown\",\"Display:str\":\"\\\\I[160]Unknown\",\"Description:json\":\"\\\"This unit's Zodiac is unknown.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"false\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Aries\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Aries\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♈\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Taurus\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Taurus\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♋\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Gemini\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Gemini\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♊\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Cancer\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Cancer\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♋\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Leo\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Leo\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♌\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Virgo\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Virgo\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♍\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Libra\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Libra\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♎\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Scorpio\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Scorpio\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♏\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Sagittarius\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Sagittarius\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to LUK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♐\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.05\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Capricorn\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Capricorn\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♑\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Aquarius\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Aquarius\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♒\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Pisces\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Pisces\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♓\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Ophiuchus\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Ophiuchus\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit is the rare Ophiuchus zodiac.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"⛎\\\",\\\"RandomValid:eval\\\":\\\"false\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Variant:struct
 * @text Variant Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Variant","Label:str":"Variant","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Normal\",\"Display:str\":\"\\\\I[160]Normal\",\"Description:json\":\"\\\"This is your average unit.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"100\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Mighty\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Mighty\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Mighty\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"5\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.30\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.30\\\",\\\"GoldRate:num\\\":\\\"1.50\\\",\\\"DropRate:num\\\":\\\"2.00\\\"}\",\"{\\\"Name:str\\\":\\\"Major\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Major\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Major\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.20\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.20\\\",\\\"GoldRate:num\\\":\\\"1.25\\\",\\\"DropRate:num\\\":\\\"1.50\\\"}\",\"{\\\"Name:str\\\":\\\"Greater\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Greater\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Greater\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"20\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.10\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.10\\\",\\\"GoldRate:num\\\":\\\"1.15\\\",\\\"DropRate:num\\\":\\\"1.25\\\"}\",\"{\\\"Name:str\\\":\\\"Lesser\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Lesser\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has decreased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lesser\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"20\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.90\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"0.90\\\",\\\"GoldRate:num\\\":\\\"0.95\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Minor\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Minor\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has decreased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Minor\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.80\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"0.80\\\",\\\"GoldRate:num\\\":\\\"0.90\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Puny\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Puny\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has decreased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Puny\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"5\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.70\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"0.70\\\",\\\"GoldRate:num\\\":\\\"0.85\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
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
 * Element Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~ElementRules:
 *
 * @param Rulings
 *
 * @param MultiRule:str
 * @text Multi-Element Ruling
 * @parent Rulings
 * @type select
 * @option Maximum (largest rate of all elements)
 * @value max
 * @option Minimum (smallest rate of all elements)
 * @value min
 * @option Multiplicative (product of all elements used)
 * @value multiply
 * @option Additive (sum of all elements used)
 * @value additive
 * @option Average (of all the elements used)
 * @value average
 * @desc Ruling on how to calculate element rate when there are 
 * multiple elements used for damage calculation.
 * @default multiply
 *
 * @param RuleMaxCalcJSa:func
 * @text JS: Maximum Rate
 * @parent Rulings
 * @type note
 * @desc Determine how maximum element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet max = -1000;\nfor (const elementId of elements) {\n    const sign = absorbed.includes(elementId) ? -1 : 1;\n    max = Math.max(max, target.elementRate(elementId) * sign);\n}\nreturn max;"
 *
 * @param RuleMinCalcJS:func
 * @text JS: Minimum Rate
 * @parent Rulings
 * @type note
 * @desc Determine how minimum element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet min = 0;\nfor (const elementId of elements) {\n    const sign = absorbed.includes(elementId) ? -1 : 1;\n    min = Math.min(min, target.elementRate(elementId) * sign);\n}\nreturn min;"
 *
 * @param RuleMultiplyCalcJS:func
 * @text JS: Multiply Rate
 * @parent Rulings
 * @type note
 * @desc Determine how a multiplied element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet rate = 1;\nlet sign = 1;\nfor (const elementId of elements) {\n    if (absorbed.includes(elementId)) sign = -1;\n    rate *= target.elementRate(elementId);\n}\nreturn rate * sign;"
 *
 * @param RuleAdditiveCalcJS:func
 * @text JS: Additive Rate
 * @parent Rulings
 * @type note
 * @desc Determine how an additive element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet rate = 0;\nfor (const elementId of elements) {\n    const sign = absorbed.includes(elementId) ? -1 : 1;\n    rate += target.elementRate(elementId) * sign;\n}\nreturn rate;"
 *
 * @param RuleAverageCalcJS:func
 * @text JS: Average Rate
 * @parent Rulings
 * @type note
 * @desc Determine how an average element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst rate = action.elementsRateSum(target, elements);\nreturn rate / elements.length;"
 *
 * @param Formulas
 *
 * @param ReceivedRateJS:func
 * @text JS: Received Rate
 * @parent Formulas
 * @type note
 * @desc Determine how the element rate for the receiving target is calculated.
 * @default "// Declare Constants\nconst elementId = arguments[0];\nconst target = this;\nconst base = 1;\nconst plus = target.getReceiveElementPlus(elementId);\nconst rate = target.getReceiveElementRate(elementId);\nconst flat = target.getReceiveElementFlat(elementId);\n\n// Determine Return Value\nreturn Math.max(0, (base + plus) * rate + flat);"
 *
 * @param FinalizeRateJS:func
 * @text JS: Finalize Rate
 * @parent Formulas
 * @type note
 * @desc Determine how the finalized element rate before damage is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst action = this;\nconst elements = action.elements();\nconst targetRate = action.calcTargetElementRate(target, elements);\nconst sign = targetRate >= 0 ? 1 : -1;\nconst base = Math.abs(targetRate);\nconst plus = action.calcUserElementDamagePlus(target, elements);\nconst rate = action.calcUserElementDamageRate(target, elements);\nconst flat = action.calcUserElementDamageFlat(target, elements);\n\n// Determine Return Value\nreturn sign * Math.max((base + plus) * rate + flat, 0);;"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Status Menu Layout provided by this plugin?
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Top Category
 * @value upper/top
 * @option Upper Help, Bottom Category
 * @value upper/bottom
 * @option Lower Help, Top Category
 * @value lower/top
 * @option Lower Help, Bottom Category
 * @value lower/bottom
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/top
 *
 * @param TraitDescriptionFontSize:num
 * @text Trait Set Font Size
 * @parent General
 * @type number
 * @min 1
 * @desc The font size used for Trait Set Descriptions.
 * @default 18
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Category Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Category Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Category Window.
 * @default center
 *
 * @param Parameters
 * @text Displayed Parameters
 * 
 * @param Col1:arraystr
 * @text Column 1
 * @parent Parameters
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
 * @desc A list of the parameters that will be displayed in column 1.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param Col2:arraystr
 * @text Column 2
 * @parent Parameters
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
 * @desc A list of the parameters that will be displayed in column 2.
 * @default ["HIT","EVA","CRI","CEV","MEV","MRF","CNT","HRG","MRG","TRG"]
 *
 * @param Col3:arraystr
 * @text Column 3
 * @parent Parameters
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
 * @desc A list of the parameters that will be displayed in column 3.
 * @default ["TGR","GRD","REC","PHA","MCR","TCR","PDR","MDR","FDR","EXR"]
 *
 * @param Elements
 *
 * @param ExcludeElements:arraynum
 * @text Excluded Elements
 * @parent Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc These element ID's are excluded from the Status Menu list.
 * @default []
 *
 * @param ElementsCol1:arraynum
 * @text IDs: Column 1
 * @parent Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc The list of element ID's to show in column 1.
 * If neither column has ID's, list all elements.
 * @default []
 *
 * @param ElementsCol2:arraynum
 * @text IDs: Column 2
 * @parent Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc The list of element ID's to show in column 2.
 * If neither column has ID's, list all elements.
 * @default []
 *
 * @param Vocabulary
 *
 * @param VocabBiography:str
 * @text Biography
 * @parent Vocabulary
 * @desc Vocabulary for 'Biography'.
 * @default Biography
 *
 * @param VocabDmgAbsorb:str
 * @text Damage: Absorb
 * @parent Vocabulary
 * @desc Vocabulary for 'Damage: Absorb'.
 * @default Absorbs %1%
 *
 * @param VocabDmgReceive:str
 * @text Damage: Received
 * @parent Vocabulary
 * @desc Vocabulary for 'Damage: Received'.
 * @default Elemental Resistance
 *
 * @param VocabDmgDealt:str
 * @text Damage: Dealt
 * @parent Vocabulary
 * @desc Vocabulary for 'Damage: Dealt'.
 * @default Bonus Damage
 *
 * @param VocabStype:str
 * @text Skill Types
 * @parent Vocabulary
 * @desc Vocabulary for 'Skill Types'.
 * @default Skill Types
 *
 * @param VocabWtype:str
 * @text Weapon Types
 * @parent Vocabulary
 * @desc Vocabulary for 'Weapon Types'.
 * @default Weapon Types
 *
 * @param VocabAtype:str
 * @text Armor Types
 * @parent Vocabulary
 * @desc Vocabulary for 'Armor Types'.
 * @default Armor Types
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusCategory:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc Symbol used for this category.
 * @default Symbol
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc Text name used for this category.
 * @default Untitled
 *
 * @param DrawJS:func
 * @text JS: Draw Data
 * @type note
 * @desc Code used to determine what appears in the data window.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * General Trait Set Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TraitSetSettings:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Trait Sets?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Trait Sets? This must be enabled for Trait Sets to
 * have any kind of effect on battlers.
 * @default false
 *
 * @param EnemyNameFmt:str
 * @text Enemy Name Format
 * @parent General
 * @type combo
 * @option [name] [letter]
 * @option [element] [name] [letter]
 * @option [element] [subelement] [name] [letter]
 * @option [name][gender] [letter]
 * @option [race] [name][gender] [letter]
 * @option [alignment] [name][gender] [letter]
 * @option [blessing] [name][gender] [letter]
 * @option [curse] [name][gender] [letter]
 * @option [name][gender]([zodiac]) [letter]
 * @option [variant] [name][gender] [letter]
 * @option [variant] [nature] [name][gender] [letter]
 * @option [variant] [nature] [element] [name][gender] [letter]
 * @option [alignment] [variant] [nature] [element] [name][gender] [letter]
 * @option [alignment] [variant] [nature] [blessing] [element] [name][gender] [letter]
 * @option [alignment] [variant] [nature] [curse] [element] [name][gender] [letter]
 * @desc Enemy name format on how Trait Sets affect how enemy names
 * appear. Choose from the list or customize it.
 * @default [variant] [name][gender] [letter]
 *
 * @param TraitColumns
 * @text Trait Columns
 *
 * @param TraitCol1:arraystr
 * @text Column 1 Traits
 * @parent TraitColumns
 * @type select[]
 * @option Main Element
 * @value Element
 * @option Sub Element
 * @value SubElement
 * @option Gender
 * @value Gender
 * @option Race
 * @value Race
 * @option Nature
 * @value Nature
 * @option Alignment
 * @value Alignment
 * @option Blessing
 * @value Blessing
 * @option Curse
 * @value Curse
 * @option Zodiac
 * @value Zodiac
 * @option Variant
 * @value Variant
 * @desc List of the traits that appear in this column.
 * Used by default in the Properties category.
 * @default ["Gender","Nature","Blessing","Zodiac"]
 *
 * @param TraitCol2:arraystr
 * @text Column 2 Traits
 * @parent TraitColumns
 * @type select[]
 * @option Main Element
 * @value Element
 * @option Sub Element
 * @value SubElement
 * @option Gender
 * @value Gender
 * @option Race
 * @value Race
 * @option Nature
 * @value Nature
 * @option Alignment
 * @value Alignment
 * @option Blessing
 * @value Blessing
 * @option Curse
 * @value Curse
 * @option Zodiac
 * @value Zodiac
 * @option Variant
 * @value Variant
 * @desc List of the traits that appear in this column.
 * Used by default in the Properties category.
 * @default ["Race","Alignment","Curse","Variant"]
 *
 */
/* ----------------------------------------------------------------------------
 * Trait Set Type Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TraitSetType:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Trait Set Type.
 * @default Untitled
 *
 * @param Label:str
 * @text Label
 * @desc How this Trait Set Type is labeled in the Status Menu.
 * Text codes are allowed.
 * @default Untitled
 *
 * @param Visible:eval
 * @text Visible
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Is this Trait Set Type visible in the Status Menu?
 * @default true
 *
 * @param RandomizeActor:eval
 * @text Randomize for Actors?
 * @type boolean
 * @on Randomize
 * @off Default
 * @desc On actor creation, obtain a random trait from this list?
 * @default false
 *
 * @param RandomizeEnemy:eval
 * @text Randomize for Enemies?
 * @type boolean
 * @on Randomize
 * @off Default
 * @desc On enemy creation, obtain a random trait from this list?
 * @default false
 *
 * @param Default:struct
 * @text Default Trait Set
 * @type struct<TraitSet>
 * @desc If no Trait Set is declared by notetags, 
 * use this Trait Set as a default.
 * @default {}
 *
 * @param List:arraystruct
 * @text Trait Set List
 * @type struct<TraitSet>[]
 * @desc A list of all the Trait Sets available to this 
 * Trait Set Type.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Trait Set Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TraitSet:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Trait Set. Also used as a reference key.
 * @default Untitled
 *
 * @param Display:str
 * @text Display Text
 * @desc How the Trait Set is displayed in game when selected.
 * Text codes are allowed.
 * @default Untitled
 *
 * @param Description:json
 * @text Help Description
 * @type note
 * @desc Help description for this Trait Set if required.
 * @default ""
 *
 * @param FmtText:str
 * @text Format Text
 * @desc The text that's added onto an enemy's name if this
 * Trait Set is used.
 * @default 
 *
 * @param RandomValid:eval
 * @text Valid for Random?
 * @type boolean
 * @on Valid
 * @off Ignore
 * @desc Is this Trait Set valid for random selection?
 * @default true
 *
 * @param RandomWeight:num
 * @text Random Weight
 * @type number
 * @desc Default weight of this Trait Set if valid for random.
 * @default 1
 *
 * @param Traits
 *
 * @param ElementRate:struct
 * @text Element Rates
 * @parent Traits
 * @type struct<ElementChanges>
 * @desc The elemental damage rates received for this Trait Set.
 * The modifiers are multiplicative.
 * @default {}
 *
 * @param Params:struct
 * @text Basic Parameters
 * @parent Traits
 * @type struct<Params>
 * @desc The basic parameter rates altered by this Trait set.
 * The modifiers are multiplicative.
 * @default {}
 *
 * @param XParams:struct
 * @text X Parameters
 * @parent Traits
 * @type struct<XParams>
 * @desc The X parameter rates altered by this Trait set.
 * The modifiers are additive.
 * @default {}
 *
 * @param SParams:struct
 * @text S Parameters
 * @parent Traits
 * @type struct<SParams>
 * @desc The S parameter rates altered by this Trait set.
 * The modifiers are multiplicative.
 * @default {}
 *
 * @param PassiveStates:arraynum
 * @text Passive States
 * @parent Traits
 * @type state[]
 * @desc Passive states that are applied to this Trait Set.
 * Requires VisuMZ_1_SkillsStatesCore.
 * @default []
 *
 * @param Equipment
 *
 * @param Wtypes:arraynum
 * @text Weapon Types
 * @parent Equipment
 * @type number[]
 * @min 1
 * @max 99
 * @desc Additional weapon types usable by this Trait Set.
 * @default []
 *
 * @param Atypes:arraynum
 * @text Armor Types
 * @parent Equipment
 * @type number[]
 * @min 1
 * @max 99
 * @desc Additional armor types usable by this Trait Set.
 * @default []
 *
 * @param EnemyRewards
 * @text Enemy Rewards
 *
 * @param EXPRate:num
 * @text EXP Rate
 * @parent EnemyRewards
 * @desc EXP rate given by a defeated enemy with this Trait Set.
 * @default 1.00
 *
 * @param GoldRate:num
 * @text Gold Rate
 * @parent EnemyRewards
 * @desc Gold rate given by a defeated enemy with this Trait Set.
 * @default 1.00
 *
 * @param DropRate:num
 * @text Drop Rate
 * @parent EnemyRewards
 * @desc Drop rate given by a defeated enemy with this Trait Set.
 * @default 1.00
 *
 */
/* ----------------------------------------------------------------------------
 * Element Changes
 * ----------------------------------------------------------------------------
 */
/*~struct~ElementChanges:
 *
 * @param Element1:num
 * @text Element 1 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element2:num
 * @text Element 2 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element3:num
 * @text Element 3 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element4:num
 * @text Element 4 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element5:num
 * @text Element 5 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element6:num
 * @text Element 6 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element7:num
 * @text Element 7 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element8:num
 * @text Element 8 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element9:num
 * @text Element 9 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element10:num
 * @text Element 10 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element11:num
 * @text Element 11 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element12:num
 * @text Element 12 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element13:num
 * @text Element 13 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element14:num
 * @text Element 14 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element15:num
 * @text Element 15 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element16:num
 * @text Element 16 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element17:num
 * @text Element 17 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element18:num
 * @text Element 18 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element19:num
 * @text Element 19 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element20:num
 * @text Element 20 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element21:num
 * @text Element 21 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element22:num
 * @text Element 22 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element23:num
 * @text Element 23 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element24:num
 * @text Element 24 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element25:num
 * @text Element 25 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element26:num
 * @text Element 26 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element27:num
 * @text Element 27 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element28:num
 * @text Element 28 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element29:num
 * @text Element 29 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element30:num
 * @text Element 30 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element31:num
 * @text Element 31 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element32:num
 * @text Element 32 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element33:num
 * @text Element 33 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element34:num
 * @text Element 34 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element35:num
 * @text Element 35 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element36:num
 * @text Element 36 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element37:num
 * @text Element 37 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element38:num
 * @text Element 38 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element39:num
 * @text Element 39 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element40:num
 * @text Element 40 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element41:num
 * @text Element 41 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element42:num
 * @text Element 42 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element43:num
 * @text Element 43 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element44:num
 * @text Element 44 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element45:num
 * @text Element 45 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element46:num
 * @text Element 46 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element47:num
 * @text Element 47 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element48:num
 * @text Element 48 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element49:num
 * @text Element 49 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element50:num
 * @text Element 50 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element51:num
 * @text Element 51 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element52:num
 * @text Element 52 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element53:num
 * @text Element 53 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element54:num
 * @text Element 54 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element55:num
 * @text Element 55 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element56:num
 * @text Element 56 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element57:num
 * @text Element 57 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element58:num
 * @text Element 58 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element59:num
 * @text Element 59 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element60:num
 * @text Element 60 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element61:num
 * @text Element 61 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element62:num
 * @text Element 62 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element63:num
 * @text Element 63 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element64:num
 * @text Element 64 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element65:num
 * @text Element 65 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element66:num
 * @text Element 66 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element67:num
 * @text Element 67 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element68:num
 * @text Element 68 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element69:num
 * @text Element 69 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element70:num
 * @text Element 70 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element71:num
 * @text Element 71 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element72:num
 * @text Element 72 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element73:num
 * @text Element 73 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element74:num
 * @text Element 74 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element75:num
 * @text Element 75 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element76:num
 * @text Element 76 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element77:num
 * @text Element 77 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element78:num
 * @text Element 78 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element79:num
 * @text Element 79 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element80:num
 * @text Element 80 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element81:num
 * @text Element 81 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element82:num
 * @text Element 82 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element83:num
 * @text Element 83 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element84:num
 * @text Element 84 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element85:num
 * @text Element 85 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element86:num
 * @text Element 86 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element87:num
 * @text Element 87 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element88:num
 * @text Element 88 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element89:num
 * @text Element 89 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element90:num
 * @text Element 90 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element91:num
 * @text Element 91 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element92:num
 * @text Element 92 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element93:num
 * @text Element 93 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element94:num
 * @text Element 94 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element95:num
 * @text Element 95 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element96:num
 * @text Element 96 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element97:num
 * @text Element 97 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element98:num
 * @text Element 98 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element99:num
 * @text Element 99 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 */
/* ----------------------------------------------------------------------------
 * Basic Parameters
 * ----------------------------------------------------------------------------
 */
/*~struct~Params:
 *
 * @param Param0:num
 * @text MaxHP Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param1:num
 * @text MaxMP Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param2:num
 * @text ATK Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param3:num
 * @text DEF Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param4:num
 * @text MAT Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param5:num
 * @text MDF Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param6:num
 * @text AGI Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param7:num
 * @text LUK Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 */
/* ----------------------------------------------------------------------------
 * X Parameters
 * ----------------------------------------------------------------------------
 */
/*~struct~XParams:
 *
 * @param XParam0:num
 * @text HIT Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam1:num
 * @text EVA Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam2:num
 * @text CRI Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam3:num
 * @text CEV Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam4:num
 * @text MEV Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam5:num
 * @text MRF Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam6:num
 * @text CNT Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam7:num
 * @text HRG Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam8:num
 * @text MRG Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam9:num
 * @text TRG Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 */
/* ----------------------------------------------------------------------------
 * S Parameters
 * ----------------------------------------------------------------------------
 */
/*~struct~SParams:
 *
 * @param SParam0:num
 * @text TGR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam1:num
 * @text GRD Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam2:num
 * @text REC Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam3:num
 * @text PHA Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam4:num
 * @text MCR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam5:num
 * @text TCR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam6:num
 * @text PDR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam7:num
 * @text MDR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam8:num
 * @text FDR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam9:num
 * @text EXR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 */
//=============================================================================

const _0x1aecd6=_0x20bf;(function(_0x13d6f8,_0x348315){const _0x454e17=_0x20bf,_0x5d0056=_0x13d6f8();while(!![]){try{const _0x350546=-parseInt(_0x454e17(0x2d3))/0x1+-parseInt(_0x454e17(0x2e1))/0x2+-parseInt(_0x454e17(0x294))/0x3+-parseInt(_0x454e17(0x3d7))/0x4*(parseInt(_0x454e17(0x2a5))/0x5)+parseInt(_0x454e17(0x28a))/0x6*(-parseInt(_0x454e17(0x1a8))/0x7)+parseInt(_0x454e17(0x37e))/0x8*(parseInt(_0x454e17(0x23f))/0x9)+parseInt(_0x454e17(0x330))/0xa;if(_0x350546===_0x348315)break;else _0x5d0056['push'](_0x5d0056['shift']());}catch(_0x19049e){_0x5d0056['push'](_0x5d0056['shift']());}}}(_0x676f,0x939ed));var label=_0x1aecd6(0x379),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x5df978){const _0x291383=_0x1aecd6;return _0x5df978['status']&&_0x5df978[_0x291383(0x200)][_0x291383(0x3c8)]('['+label+']');})[0x0];VisuMZ[label][_0x1aecd6(0x34d)]=VisuMZ[label][_0x1aecd6(0x34d)]||{},VisuMZ[_0x1aecd6(0x3dc)]=function(_0x669876,_0x5450a8){const _0x4d46f6=_0x1aecd6;for(const _0x36855e in _0x5450a8){if(_0x36855e['match'](/(.*):(.*)/i)){const _0x434657=String(RegExp['$1']),_0x21536e=String(RegExp['$2'])[_0x4d46f6(0x348)]()[_0x4d46f6(0x173)]();let _0x2000f3,_0x41e16c,_0x1991d9;switch(_0x21536e){case'NUM':_0x2000f3=_0x5450a8[_0x36855e]!==''?Number(_0x5450a8[_0x36855e]):0x0;break;case'ARRAYNUM':_0x41e16c=_0x5450a8[_0x36855e]!==''?JSON[_0x4d46f6(0x313)](_0x5450a8[_0x36855e]):[],_0x2000f3=_0x41e16c[_0x4d46f6(0x290)](_0x50494a=>Number(_0x50494a));break;case _0x4d46f6(0x2bd):_0x2000f3=_0x5450a8[_0x36855e]!==''?eval(_0x5450a8[_0x36855e]):null;break;case'ARRAYEVAL':_0x41e16c=_0x5450a8[_0x36855e]!==''?JSON[_0x4d46f6(0x313)](_0x5450a8[_0x36855e]):[],_0x2000f3=_0x41e16c['map'](_0x511ec3=>eval(_0x511ec3));break;case _0x4d46f6(0x19f):_0x2000f3=_0x5450a8[_0x36855e]!==''?JSON[_0x4d46f6(0x313)](_0x5450a8[_0x36855e]):'';break;case _0x4d46f6(0x1b6):_0x41e16c=_0x5450a8[_0x36855e]!==''?JSON['parse'](_0x5450a8[_0x36855e]):[],_0x2000f3=_0x41e16c[_0x4d46f6(0x290)](_0x86e677=>JSON[_0x4d46f6(0x313)](_0x86e677));break;case _0x4d46f6(0x3da):_0x2000f3=_0x5450a8[_0x36855e]!==''?new Function(JSON['parse'](_0x5450a8[_0x36855e])):new Function(_0x4d46f6(0x449));break;case _0x4d46f6(0x34b):_0x41e16c=_0x5450a8[_0x36855e]!==''?JSON['parse'](_0x5450a8[_0x36855e]):[],_0x2000f3=_0x41e16c['map'](_0x784287=>new Function(JSON['parse'](_0x784287)));break;case _0x4d46f6(0x3ac):_0x2000f3=_0x5450a8[_0x36855e]!==''?String(_0x5450a8[_0x36855e]):'';break;case'ARRAYSTR':_0x41e16c=_0x5450a8[_0x36855e]!==''?JSON[_0x4d46f6(0x313)](_0x5450a8[_0x36855e]):[],_0x2000f3=_0x41e16c['map'](_0x27782a=>String(_0x27782a));break;case _0x4d46f6(0x1b9):_0x1991d9=_0x5450a8[_0x36855e]!==''?JSON[_0x4d46f6(0x313)](_0x5450a8[_0x36855e]):{},_0x669876[_0x434657]={},VisuMZ['ConvertParams'](_0x669876[_0x434657],_0x1991d9);continue;case _0x4d46f6(0x224):_0x41e16c=_0x5450a8[_0x36855e]!==''?JSON['parse'](_0x5450a8[_0x36855e]):[],_0x2000f3=_0x41e16c[_0x4d46f6(0x290)](_0x565cf8=>VisuMZ[_0x4d46f6(0x3dc)]({},JSON[_0x4d46f6(0x313)](_0x565cf8)));break;default:continue;}_0x669876[_0x434657]=_0x2000f3;}}return _0x669876;},(_0x16285e=>{const _0x2f4027=_0x1aecd6,_0x9b82f0=_0x16285e[_0x2f4027(0x38c)];for(const _0x5c6c2a of dependencies){if(_0x2f4027(0x3ba)!==_0x2f4027(0x3ba))this['_actor']=_0x1d30e2,this[_0x2f4027(0x1ec)]();else{if(!Imported[_0x5c6c2a]){alert(_0x2f4027(0x183)['format'](_0x9b82f0,_0x5c6c2a)),SceneManager[_0x2f4027(0x1e0)]();break;}}}const _0x3ee133=_0x16285e['description'];if(_0x3ee133[_0x2f4027(0x351)](/\[Version[ ](.*?)\]/i)){const _0x59263e=Number(RegExp['$1']);_0x59263e!==VisuMZ[label][_0x2f4027(0x445)]&&(alert(_0x2f4027(0x35b)[_0x2f4027(0x411)](_0x9b82f0,_0x59263e)),SceneManager['exit']());}if(_0x3ee133[_0x2f4027(0x351)](/\[Tier[ ](\d+)\]/i)){if(_0x2f4027(0x208)===_0x2f4027(0x26c)){if(this[_0x2f4027(0x291)]===_0x5de29f)this[_0x2f4027(0x1f8)]();if(this[_0x2f4027(0x291)][_0x4e30fb]===_0x3cab6a)this[_0x2f4027(0x1f8)]();const _0x22286b=this[_0x2f4027(0x291)][_0x19e23c];return _0x1575c7[_0x2f4027(0x3e4)](_0x100fc0,_0x22286b);}else{const _0x5bf0dc=Number(RegExp['$1']);_0x5bf0dc<tier?(alert(_0x2f4027(0x33d)[_0x2f4027(0x411)](_0x9b82f0,_0x5bf0dc,tier)),SceneManager['exit']()):_0x2f4027(0x3c4)!==_0x2f4027(0x32d)?tier=Math[_0x2f4027(0x32e)](_0x5bf0dc,tier):_0x524dc5='%1'[_0x2f4027(0x411)](_0x9fd6ea);}}VisuMZ[_0x2f4027(0x3dc)](VisuMZ[label][_0x2f4027(0x34d)],_0x16285e[_0x2f4027(0x31e)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x1aecd6(0x38c)],'ActorChangeBiographyGroup',_0x5a375f=>{const _0x5d9875=_0x1aecd6;VisuMZ[_0x5d9875(0x3dc)](_0x5a375f,_0x5a375f);const _0x3b5286=_0x5a375f['Step1'];for(const _0x867c39 of _0x3b5286){if(_0x5d9875(0x299)===_0x5d9875(0x36b))this['_specialBattler'][_0x5d9875(0x38c)]=_0x3620a3(_0x1b9fd2['$1']);else{const _0xb82f82=$gameActors[_0x5d9875(0x1a5)](_0x867c39);if(!_0xb82f82)continue;_0xb82f82[_0x5d9875(0x2c2)](_0x5a375f[_0x5d9875(0x26f)][_0x5d9875(0x411)](_0x5d9875(0x41f)['format'](_0xb82f82[_0x5d9875(0x258)]())));}}}),PluginManager[_0x1aecd6(0x234)](pluginData[_0x1aecd6(0x38c)],_0x1aecd6(0x1ce),_0x88b33c=>{const _0x2ddc58=_0x1aecd6;VisuMZ[_0x2ddc58(0x3dc)](_0x88b33c,_0x88b33c);const _0x23460c=_0x88b33c[_0x2ddc58(0x286)]>=_0x88b33c[_0x2ddc58(0x3e9)]?_0x88b33c[_0x2ddc58(0x3e9)]:_0x88b33c[_0x2ddc58(0x286)],_0x253aa5=_0x88b33c[_0x2ddc58(0x286)]>=_0x88b33c[_0x2ddc58(0x3e9)]?_0x88b33c[_0x2ddc58(0x286)]:_0x88b33c[_0x2ddc58(0x3e9)],_0x60da98=Array(_0x253aa5-_0x23460c+0x1)['fill']()[_0x2ddc58(0x290)]((_0x43c899,_0x43f110)=>_0x23460c+_0x43f110);for(const _0x147a69 of _0x60da98){const _0x4c5457=$gameActors['actor'](_0x147a69);if(!_0x4c5457)continue;_0x4c5457[_0x2ddc58(0x2c2)](_0x88b33c[_0x2ddc58(0x26f)][_0x2ddc58(0x411)](_0x2ddc58(0x41f)['format'](_0x4c5457[_0x2ddc58(0x258)]())));}}),PluginManager[_0x1aecd6(0x234)](pluginData['name'],_0x1aecd6(0x1e6),_0x481924=>{const _0x530ecb=_0x1aecd6;VisuMZ['ConvertParams'](_0x481924,_0x481924);const _0x101f15=_0x481924[_0x530ecb(0x393)];let _0x388b9f=[];while(_0x101f15[_0x530ecb(0x1bc)]>0x0){const _0x2a0cb6=_0x101f15[_0x530ecb(0x387)]();if(Array['isArray'](_0x2a0cb6))_0x388b9f=_0x388b9f[_0x530ecb(0x43e)](_0x2a0cb6);else{if(_0x530ecb(0x339)!==_0x530ecb(0x339)){const _0xe5ef40=this['getTraitSet'](_0x36ed80),_0x2ae90e=_0x3d44e2[_0x530ecb(0x3e4)](_0x1e43ad,_0xe5ef40);_0x244b44*=_0x2ae90e[_0x530ecb(0x1d3)]!==_0x42c17c?_0x2ae90e[_0x530ecb(0x1d3)]:0x1;}else _0x388b9f['push'](_0x2a0cb6);}}for(const _0x26881e of _0x388b9f){const _0x12a0ed=$gameActors[_0x530ecb(0x1a5)](_0x26881e);if(!_0x12a0ed)continue;_0x12a0ed['setBiography'](_0x481924[_0x530ecb(0x26f)][_0x530ecb(0x411)](_0x530ecb(0x41f)['format'](_0x12a0ed[_0x530ecb(0x258)]())));}}),PluginManager[_0x1aecd6(0x234)](pluginData[_0x1aecd6(0x38c)],_0x1aecd6(0x25b),_0x2c1195=>{const _0x29478b=_0x1aecd6;VisuMZ['ConvertParams'](_0x2c1195,_0x2c1195);const _0x35501f=_0x2c1195[_0x29478b(0x393)],_0x2e85da=Game_BattlerBase['prototype']['getTraitSetKeys']();for(const _0x29e330 of _0x35501f){const _0x57701d=$gameActors[_0x29478b(0x1a5)](_0x29e330);if(!_0x57701d)continue;for(const _0xba349e of _0x2e85da){if(_0x29478b(0x375)!==_0x29478b(0x375)){const _0x534f09=_0x4941f6[_0x29478b(0x239)][_0x29478b(0x348)]()['trim']();_0x47f1ac[_0x29478b(0x291)][_0x253dd2][_0x534f09]=_0x10c040;}else{if(!_0x2c1195[_0xba349e])continue;if(_0x2c1195[_0xba349e][_0x29478b(0x351)](/UNCHANGED/i))continue;_0x2c1195[_0xba349e]['match'](/RANDOM/i)?_0x57701d[_0x29478b(0x3db)](_0xba349e):_0x57701d['setTraitSet'](_0xba349e,_0x2c1195[_0xba349e]);}}}}),PluginManager['registerCommand'](pluginData['name'],_0x1aecd6(0x2a7),_0x12c1ec=>{const _0x1ad939=_0x1aecd6;VisuMZ[_0x1ad939(0x3dc)](_0x12c1ec,_0x12c1ec);const _0x80dd17=_0x12c1ec[_0x1ad939(0x286)]>=_0x12c1ec[_0x1ad939(0x3e9)]?_0x12c1ec[_0x1ad939(0x3e9)]:_0x12c1ec['Step1End'],_0x2d72ef=_0x12c1ec[_0x1ad939(0x286)]>=_0x12c1ec['Step1Start']?_0x12c1ec[_0x1ad939(0x286)]:_0x12c1ec[_0x1ad939(0x3e9)],_0x2977b0=Array(_0x2d72ef-_0x80dd17+0x1)[_0x1ad939(0x334)]()[_0x1ad939(0x290)]((_0x12ce71,_0x23c01a)=>_0x80dd17+_0x23c01a),_0x5a6b59=Game_BattlerBase['prototype'][_0x1ad939(0x22e)]();for(const _0x51d819 of _0x2977b0){if('JIVmf'==='JIVmf'){const _0x33c12d=$gameActors['actor'](_0x51d819);if(!_0x33c12d)continue;for(const _0x432b26 of _0x5a6b59){if(_0x1ad939(0x436)===_0x1ad939(0x39a)){const _0x22ab7c=this[_0x1ad939(0x187)](_0x58a615);if(_0x22ab7c===_0x1ad939(0x341))this[_0x1ad939(0x34a)](_0x5e8f87);else _0x22ab7c===_0x1ad939(0x248)?this[_0x1ad939(0x323)](_0x6d7c4a):_0x419ebb['prototype'][_0x1ad939(0x2ac)][_0x1ad939(0x38d)](this,_0x185d11);}else{if(!_0x12c1ec[_0x432b26])continue;if(_0x12c1ec[_0x432b26]['match'](/UNCHANGED/i))continue;if(_0x12c1ec[_0x432b26]['match'](/RANDOM/i))_0x33c12d[_0x1ad939(0x3db)](_0x432b26);else{if(_0x1ad939(0x3e8)!==_0x1ad939(0x287))_0x33c12d['setTraitSet'](_0x432b26,_0x12c1ec[_0x432b26]);else{const _0xac123f=_0x1ad939(0x429);if(this[_0x1ad939(0x19c)](_0xac123f))return this['_cache'][_0xac123f][_0x1ad939(0x3c8)](_0x42cf15);return this[_0x1ad939(0x252)][_0xac123f]=this[_0x1ad939(0x338)](_0xc46953[_0x1ad939(0x413)]),this[_0x1ad939(0x252)][_0xac123f]=this['_cache'][_0xac123f][_0x1ad939(0x43e)](this['wtypeOkTraitSets']()),this['_cache'][_0xac123f][_0x1ad939(0x3c8)](_0x34e8fe);}}}}}else _0xcb20a7[_0x41ea0b]=this[_0x1ad939(0x27b)](_0x7e7721['$1']);}}),PluginManager[_0x1aecd6(0x234)](pluginData[_0x1aecd6(0x38c)],_0x1aecd6(0x2b0),_0x2c394d=>{const _0x36f9b7=_0x1aecd6;VisuMZ[_0x36f9b7(0x3dc)](_0x2c394d,_0x2c394d);const _0x4e5120=_0x2c394d['Step1'];let _0x5e0b42=[];while(_0x4e5120['length']>0x0){if(_0x36f9b7(0x1af)!==_0x36f9b7(0x1af)){const _0x34f2e8=this['itemPadding']();_0x24d571-=_0x34f2e8*0x2;if(_0x5b49d8[_0x36f9b7(0x1b1)])this['drawParamText'](_0x2f4db6+_0x34f2e8,_0xbfc5f7,_0x141690,_0x203c34,![]);else{const _0x3f8ce4=this[_0x36f9b7(0x1dc)](_0x36b0de);this[_0x36f9b7(0x283)](_0x1ade45['systemColor']()),this[_0x36f9b7(0x1d2)](_0x3f8ce4,_0x4ff3a6+_0x34f2e8,_0x284267,_0x4b2dbf);}}else{const _0x53a940=_0x4e5120['shift']();if(Array[_0x36f9b7(0x389)](_0x53a940)){if(_0x36f9b7(0x3de)!==_0x36f9b7(0x3de)){const _0xe34d98=_0x44228b['loadSystem'](_0x36f9b7(0x322)),_0x41391e=_0xe308fe['iconWidth'],_0x30fd08=_0x1242c3['iconHeight'],_0x5e8d87=_0x1c1aac%0x10*_0x41391e,_0x5729ae=_0x173167[_0x36f9b7(0x371)](_0x39419e/0x10)*_0x30fd08,_0x4bbd76=_0xe3bb5c[_0x36f9b7(0x1de)](_0x41391e*this[_0x36f9b7(0x3bb)]()),_0x3913a7=_0x1e9814['ceil'](_0x30fd08*this['fontSizeRatio']());this['contents'][_0x36f9b7(0x41d)](_0xe34d98,_0x5e8d87,_0x5729ae,_0x41391e,_0x30fd08,_0x45f4e6,_0x55d018,_0x4bbd76,_0x3913a7);}else _0x5e0b42=_0x5e0b42[_0x36f9b7(0x43e)](_0x53a940);}else{if('jkcTl'===_0x36f9b7(0x34f)){if(_0x464f27[_0x36f9b7(0x245)]())_0x306af5['log'](_0x201266);return![];}else _0x5e0b42['push'](_0x53a940);}}}const _0x2b3ef8=Game_BattlerBase['prototype'][_0x36f9b7(0x22e)]();for(const _0x398cbb of _0x5e0b42){const _0x4ae84a=$gameActors[_0x36f9b7(0x1a5)](_0x398cbb);if(!_0x4ae84a)continue;for(const _0x34f325 of _0x2b3ef8){if(!_0x2c394d[_0x34f325])continue;if(_0x2c394d[_0x34f325]['match'](/UNCHANGED/i))continue;if(_0x2c394d[_0x34f325][_0x36f9b7(0x351)](/RANDOM/i))_0x4ae84a['createRandomTraitSet'](_0x34f325);else{if(_0x36f9b7(0x17d)===_0x36f9b7(0x179)){const _0x56ef7b=this[_0x36f9b7(0x318)](_0x1bb6c2),_0x397d12=_0x2bfb03[_0x36f9b7(0x3e4)](_0x48d718,_0x56ef7b);_0x50fe72*=_0x397d12[_0x36f9b7(0x36d)]!==_0x5878c1?_0x397d12[_0x36f9b7(0x36d)]:0x1;}else _0x4ae84a[_0x36f9b7(0x36e)](_0x34f325,_0x2c394d[_0x34f325]);}}}}),PluginManager[_0x1aecd6(0x234)](pluginData['name'],_0x1aecd6(0x210),_0x5f0d4c=>{const _0x5467a3=_0x1aecd6;if(!$gameParty['inBattle']())return;VisuMZ[_0x5467a3(0x3dc)](_0x5f0d4c,_0x5f0d4c);const _0x16764b=_0x5f0d4c['Step1'],_0x174edb=Game_BattlerBase['prototype'][_0x5467a3(0x22e)]();for(const _0x156e37 of _0x16764b){const _0x499bdc=$gameTroop[_0x5467a3(0x289)]()[_0x156e37];if(!_0x499bdc)continue;for(const _0x32767f of _0x174edb){if(!_0x5f0d4c[_0x32767f])continue;if(_0x5f0d4c[_0x32767f]['match'](/UNCHANGED/i))continue;_0x5f0d4c[_0x32767f][_0x5467a3(0x351)](/RANDOM/i)?_0x499bdc['createRandomTraitSet'](_0x32767f):_0x499bdc[_0x5467a3(0x36e)](_0x32767f,_0x5f0d4c[_0x32767f]);}}$gameTroop['onChangeEnemyTraits']();}),PluginManager[_0x1aecd6(0x234)](pluginData[_0x1aecd6(0x38c)],_0x1aecd6(0x2fb),_0x1e6c14=>{const _0x1c1f9c=_0x1aecd6;if(!$gameParty[_0x1c1f9c(0x3cf)]())return;VisuMZ['ConvertParams'](_0x1e6c14,_0x1e6c14);const _0x2d592f=_0x1e6c14[_0x1c1f9c(0x286)]>=_0x1e6c14['Step1Start']?_0x1e6c14[_0x1c1f9c(0x3e9)]:_0x1e6c14[_0x1c1f9c(0x286)],_0x38b4dd=_0x1e6c14[_0x1c1f9c(0x286)]>=_0x1e6c14[_0x1c1f9c(0x3e9)]?_0x1e6c14[_0x1c1f9c(0x286)]:_0x1e6c14['Step1Start'],_0x1b715a=Array(_0x38b4dd-_0x2d592f+0x1)[_0x1c1f9c(0x334)]()[_0x1c1f9c(0x290)]((_0x12f8f7,_0x3c628d)=>_0x2d592f+_0x3c628d),_0x51c342=Game_BattlerBase['prototype'][_0x1c1f9c(0x22e)]();for(const _0x196f25 of _0x1b715a){const _0x3df145=$gameTroop[_0x1c1f9c(0x289)]()[_0x196f25];if(!_0x3df145)continue;for(const _0x19c8b5 of _0x51c342){if(!_0x1e6c14[_0x19c8b5])continue;if(_0x1e6c14[_0x19c8b5][_0x1c1f9c(0x351)](/UNCHANGED/i))continue;_0x1e6c14[_0x19c8b5][_0x1c1f9c(0x351)](/RANDOM/i)?_0x1c1f9c(0x2fc)===_0x1c1f9c(0x2fc)?_0x3df145['createRandomTraitSet'](_0x19c8b5):_0x5733ba=this[_0x1c1f9c(0x33b)]():_0x3df145[_0x1c1f9c(0x36e)](_0x19c8b5,_0x1e6c14[_0x19c8b5]);}}$gameTroop['onChangeEnemyTraits']();}),PluginManager['registerCommand'](pluginData[_0x1aecd6(0x38c)],_0x1aecd6(0x2dd),_0x15c8d0=>{const _0x2d5354=_0x1aecd6;if(!$gameParty[_0x2d5354(0x3cf)]())return;VisuMZ[_0x2d5354(0x3dc)](_0x15c8d0,_0x15c8d0);const _0x2c0403=_0x15c8d0['Step1'];let _0x514498=[];while(_0x2c0403[_0x2d5354(0x1bc)]>0x0){const _0x51951c=_0x2c0403[_0x2d5354(0x387)]();if(Array['isArray'](_0x51951c))_0x514498=_0x514498['concat'](_0x51951c);else{if(_0x2d5354(0x1a2)==='TGvJK'){const _0x500dae=_0x9fb632[_0x2d5354(0x35f)](_0x4aced8[_0x2d5354(0x1c4)](_0x1c58f1));return _0x2d5354(0x1a7)[_0x2d5354(0x411)](_0x50337b[_0x2d5354(0x309)](_0x500dae*0x64));}else _0x514498[_0x2d5354(0x355)](_0x51951c);}}const _0x1f2afc=Game_BattlerBase[_0x2d5354(0x3fc)][_0x2d5354(0x22e)]();for(const _0x8c74f1 of _0x514498){const _0x48492e=$gameTroop[_0x2d5354(0x289)]()[_0x8c74f1];if(!_0x48492e)continue;for(const _0x280572 of _0x1f2afc){if(_0x2d5354(0x2d1)!=='pVQkA'){const _0x5fd55b=_0x1238ed(_0xbcc775['$1'])['split'](/[\r\n]+/)[_0x2d5354(0x3f4)](''),_0x4bf7d5=_0x385020[_0x2d5354(0x22d)](_0x5fd55b);_0x343e94[_0x2d5354(0x1bb)]=_0x163815[_0x2d5354(0x435)](_0x4bf7d5);}else{if(!_0x15c8d0[_0x280572])continue;if(_0x15c8d0[_0x280572][_0x2d5354(0x351)](/UNCHANGED/i))continue;_0x15c8d0[_0x280572][_0x2d5354(0x351)](/RANDOM/i)?_0x48492e['createRandomTraitSet'](_0x280572):_0x48492e[_0x2d5354(0x36e)](_0x280572,_0x15c8d0[_0x280572]);}}}$gameTroop[_0x2d5354(0x1b7)]();}),VisuMZ[_0x1aecd6(0x379)][_0x1aecd6(0x20f)]=Scene_Boot[_0x1aecd6(0x3fc)][_0x1aecd6(0x1ae)],Scene_Boot['prototype'][_0x1aecd6(0x1ae)]=function(){const _0x1e509d=_0x1aecd6;VisuMZ[_0x1e509d(0x379)][_0x1e509d(0x20f)]['call'](this),this[_0x1e509d(0x41a)](),this[_0x1e509d(0x238)](),this[_0x1e509d(0x417)](),this[_0x1e509d(0x2ca)](),this[_0x1e509d(0x3f8)]();},Scene_Boot[_0x1aecd6(0x3fc)][_0x1aecd6(0x41a)]=function(){const _0x4af108=_0x1aecd6,_0x2ab9a8=VisuMZ[_0x4af108(0x379)][_0x4af108(0x34d)][_0x4af108(0x1fd)];Window_StatusData[_0x4af108(0x39e)]=(_0x2ab9a8[_0x4af108(0x3fe)]||Window_StatusData[_0x4af108(0x39e)])['filter'](_0x41be18=>{const _0xd897eb=_0x4af108;if(_0xd897eb(0x305)===_0xd897eb(0x42d))this['_cache'][_0x1cf301]=_0x3cf2e7[_0xd897eb(0x379)][_0xd897eb(0x34d)]['ElementRules']['ReceivedRateJS'][_0xd897eb(0x38d)](this,_0x274af9);else{const _0xea14da=DataManager[_0xd897eb(0x301)](_0x41be18);return _0xea14da&&_0xea14da[_0xd897eb(0x353)];}}),Window_StatusData[_0x4af108(0x431)]=(_0x2ab9a8[_0x4af108(0x37b)]||Window_StatusData['traitCol2'])[_0x4af108(0x42f)](_0x2c4b21=>{const _0x233bc8=_0x4af108,_0x17a30a=DataManager[_0x233bc8(0x301)](_0x2c4b21);return _0x17a30a&&_0x17a30a['Visible'];});},Scene_Boot[_0x1aecd6(0x3fc)][_0x1aecd6(0x238)]=function(){const _0x2bf885=_0x1aecd6,_0x1110c2=VisuMZ[_0x2bf885(0x379)][_0x2bf885(0x34d)],_0xa72337=Game_BattlerBase[_0x2bf885(0x3fc)][_0x2bf885(0x22e)]();DataManager[_0x2bf885(0x291)]={};for(const _0x488a91 of _0xa72337){const _0x9e113c=_0x488a91[_0x2bf885(0x348)]()[_0x2bf885(0x173)]();DataManager['_traitSets'][_0x9e113c]={},DataManager[_0x2bf885(0x291)][_0x9e113c][_0x2bf885(0x1d4)]=_0x1110c2[_0x488a91][_0x2bf885(0x1ac)];const _0x454763=_0x1110c2[_0x488a91]['Default'][_0x2bf885(0x239)][_0x2bf885(0x348)]()[_0x2bf885(0x173)]();DataManager[_0x2bf885(0x291)][_0x9e113c][_0x454763]=_0x1110c2[_0x488a91][_0x2bf885(0x1ac)];const _0xd76b2b=_0x1110c2[_0x488a91][_0x2bf885(0x1a1)];for(const _0x52dd26 of _0xd76b2b){if(_0x2bf885(0x3bf)!==_0x2bf885(0x3bf)){if(_0x4cec85[_0x2bf885(0x245)]())_0x3a6272[_0x2bf885(0x404)](_0x10cc03);}else{const _0x15f474=_0x52dd26['Name']['toUpperCase']()[_0x2bf885(0x173)]();DataManager[_0x2bf885(0x291)][_0x9e113c][_0x15f474]=_0x52dd26;}}}},VisuMZ['ElementStatusCore']['RegExp']={},Scene_Boot[_0x1aecd6(0x3fc)][_0x1aecd6(0x417)]=function(){const _0x392dcc=_0x1aecd6,_0x4520f7=VisuMZ['ElementStatusCore']['RegExp'],_0x1a913d=$dataSystem['elements'],_0x3340bc='<%1RECEIVED\x20ELEMENT\x20%2\x20%3:[\x20]%4>',_0x27be46=_0x392dcc(0x3fd),_0x4ea5d3=_0x392dcc(0x293),_0x1e36c0=_0x392dcc(0x29b),_0x58f8c9=_0x392dcc(0x29d),_0x3ce4ac='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)',_0x535a1e='(.*)',_0x3dbcc1=[_0x392dcc(0x228),_0x392dcc(0x31d)],_0x7a33f2=[_0x392dcc(0x328),_0x392dcc(0x25e),'Flat'],_0x3293d5=[_0x392dcc(0x227),_0x392dcc(0x398),'JS'],_0x5823d6=[_0x58f8c9,_0x3ce4ac,_0x535a1e],_0xdedef6=[_0x4ea5d3,_0x1e36c0,_0x535a1e],_0x4725f1=_0x392dcc(0x297);_0x4520f7[_0x392dcc(0x26e)]=[],_0x4520f7['EleForceFlt']=[],_0x4520f7[_0x392dcc(0x3d8)]=[];for(let _0x181242=0x0;_0x181242<_0x1a913d[_0x392dcc(0x1bc)];_0x181242++){let _0x55dd68=_0x1a913d[_0x181242]['toUpperCase']()[_0x392dcc(0x173)]();_0x55dd68=_0x55dd68[_0x392dcc(0x308)](/\x1I\[(\d+)\]/gi,''),_0x55dd68=_0x55dd68[_0x392dcc(0x308)](/\\I\[(\d+)\]/gi,'');for(const _0x137f3c of _0x3dbcc1){if(_0x392dcc(0x433)===_0x392dcc(0x433))for(const _0x1dd737 of _0x7a33f2){for(const _0x50f901 of _0x3293d5){const _0x43b554=_0x392dcc(0x2c6)[_0x392dcc(0x411)](_0x137f3c,_0x1dd737,_0x50f901);_0x4520f7[_0x43b554]=_0x4520f7[_0x43b554]||[];const _0x1c772=_0x137f3c===_0x392dcc(0x228)?_0x3340bc:_0x27be46,_0x10931f=_0x50f901[_0x392dcc(0x351)](/JS/i)?_0x392dcc(0x193):'',_0x2ab839='(?:%1|%2)'[_0x392dcc(0x411)](_0x55dd68,_0x181242),_0x1b9c12=_0x1dd737[_0x392dcc(0x348)](),_0x4dea3f=_0x1dd737[_0x392dcc(0x351)](/RATE/i)?_0xdedef6:_0x5823d6,_0x44af38=_0x4dea3f[_0x3293d5[_0x392dcc(0x1c4)](_0x50f901)];_0x4520f7[_0x43b554][_0x181242]=new RegExp(_0x1c772[_0x392dcc(0x411)](_0x10931f,_0x2ab839,_0x1b9c12,_0x44af38),'i');}}else this[_0x392dcc(0x2a1)](_0xfa56d6['x'],_0xcac77e,_0x342951[_0x392dcc(0x3ee)],_0xe5682d),this[_0x392dcc(0x43f)](_0x5a93c2,_0x329f7a,_0x4b5326,_0x2ef9a8),this[_0x392dcc(0x22f)](_0x1c4be2,_0x2361f2,_0x5e9a37,_0x5e8e19),_0x127cfb+=_0x2413a2;}_0x4520f7[_0x392dcc(0x26e)][_0x181242]=new RegExp(_0x4725f1['format']('',_0x55dd68,_0x181242,_0x4ea5d3),'i'),_0x4520f7['EleForceFlt'][_0x181242]=new RegExp(_0x4725f1[_0x392dcc(0x411)]('',_0x55dd68,_0x181242,_0x1e36c0),'i'),_0x4520f7[_0x392dcc(0x3d8)][_0x181242]=new RegExp(_0x4725f1[_0x392dcc(0x411)]('JS\x20',_0x55dd68,_0x181242,_0x535a1e),'i');}},Scene_Boot[_0x1aecd6(0x3fc)][_0x1aecd6(0x2ca)]=function(){const _0x4fc677=_0x1aecd6,_0x3bea0c=Game_BattlerBase[_0x4fc677(0x3fc)][_0x4fc677(0x22e)](),_0x3e9fdb='<%1\x20BATTLER\x20NAME:\x20(.*)>',_0x194912='<%1\x20BATTLER\x20HUE:\x20(\x5cd+)>',_0x29edd9='<%1\x20BATTLER\x20NAMES>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20BATTLER\x20NAMES>',_0x37b21b=_0x4fc677(0x20b);for(const _0x2246f5 of _0x3bea0c){const _0x4d4d39=_0x2246f5[_0x4fc677(0x348)]()[_0x4fc677(0x173)]();for(const _0x4ad76c in DataManager['_traitSets'][_0x4d4d39]){const _0x45d5df='BattlerNameSolo-%1-%2'['format'](_0x4d4d39,_0x4ad76c);VisuMZ['ElementStatusCore'][_0x4fc677(0x3f3)][_0x45d5df]=new RegExp(_0x3e9fdb[_0x4fc677(0x411)](_0x4ad76c),'i');const _0xddd20b=_0x4fc677(0x403)[_0x4fc677(0x411)](_0x4d4d39,_0x4ad76c);VisuMZ[_0x4fc677(0x379)][_0x4fc677(0x3f3)][_0xddd20b]=new RegExp(_0x194912['format'](_0x4ad76c),'i');const _0x58eb6f=_0x4fc677(0x421)[_0x4fc677(0x411)](_0x4d4d39,_0x4ad76c);VisuMZ[_0x4fc677(0x379)]['RegExp'][_0x58eb6f]=new RegExp(_0x29edd9[_0x4fc677(0x411)](_0x4ad76c),'i');const _0x37e85e=_0x4fc677(0x315)[_0x4fc677(0x411)](_0x4d4d39,_0x4ad76c);VisuMZ[_0x4fc677(0x379)]['RegExp'][_0x37e85e]=new RegExp(_0x37b21b[_0x4fc677(0x411)](_0x4ad76c),'i');}}},Scene_Boot[_0x1aecd6(0x3fc)][_0x1aecd6(0x3f8)]=function(){const _0x4cb2c5=_0x1aecd6,_0x50d232=Game_BattlerBase[_0x4cb2c5(0x3fc)]['getTraitSetKeys']();if(Imported[_0x4cb2c5(0x2a8)]){const _0x2a5ffa=_0x4cb2c5(0x3b5),_0x1ba858='<%1\x20SIDEVIEW\x20WEAPON:\x20(.*)>',_0x513bee=_0x4cb2c5(0x2eb),_0x1835f3=_0x4cb2c5(0x3bc),_0x419886=_0x4cb2c5(0x23a),_0x321113=_0x4cb2c5(0x260);for(const _0x25eeeb of _0x50d232){if('wdnPX'!==_0x4cb2c5(0x2f5)){const _0x57891e=_0x25eeeb[_0x4cb2c5(0x348)]()[_0x4cb2c5(0x173)]();for(const _0x5efa43 in DataManager[_0x4cb2c5(0x291)][_0x57891e]){const _0x194e3f=_0x4cb2c5(0x2a0)[_0x4cb2c5(0x411)](_0x57891e,_0x5efa43);VisuMZ[_0x4cb2c5(0x379)][_0x4cb2c5(0x3f3)][_0x194e3f]=new RegExp(_0x2a5ffa[_0x4cb2c5(0x411)](_0x5efa43),'i');const _0x53f83e='SvWeaponSolo-%1-%2'['format'](_0x57891e,_0x5efa43);VisuMZ[_0x4cb2c5(0x379)][_0x4cb2c5(0x3f3)][_0x53f83e]=new RegExp(_0x1ba858[_0x4cb2c5(0x411)](_0x5efa43),'i');const _0x33764e=_0x4cb2c5(0x33a)['format'](_0x57891e,_0x5efa43);VisuMZ[_0x4cb2c5(0x379)][_0x4cb2c5(0x3f3)][_0x33764e]=new RegExp(_0x513bee[_0x4cb2c5(0x411)](_0x5efa43),'i');const _0x22d760='SvBattlerMass-%1-%2'[_0x4cb2c5(0x411)](_0x57891e,_0x5efa43);VisuMZ[_0x4cb2c5(0x379)][_0x4cb2c5(0x3f3)][_0x22d760]=new RegExp(_0x1835f3[_0x4cb2c5(0x411)](_0x5efa43),'i');const _0x50f4e8=_0x4cb2c5(0x21a)[_0x4cb2c5(0x411)](_0x57891e,_0x5efa43);VisuMZ[_0x4cb2c5(0x379)][_0x4cb2c5(0x3f3)][_0x50f4e8]=new RegExp(_0x419886['format'](_0x5efa43),'i');const _0x1e1d9c=_0x4cb2c5(0x26b)[_0x4cb2c5(0x411)](_0x57891e,_0x5efa43);VisuMZ['ElementStatusCore']['RegExp'][_0x1e1d9c]=new RegExp(_0x321113['format'](_0x5efa43),'i');}}else _0x2e799d=this[_0x4cb2c5(0x1d6)]()-_0x8422b6;}}},DataManager[_0x1aecd6(0x1f3)]=function(){const _0x508585=_0x1aecd6;return VisuMZ['ElementStatusCore'][_0x508585(0x34d)]['TraitSetSettings'][_0x508585(0x194)];},DataManager[_0x1aecd6(0x301)]=function(_0x1087ff){const _0x5cd946=_0x1aecd6;return VisuMZ['ElementStatusCore'][_0x5cd946(0x34d)][_0x1087ff];},DataManager['traitSet']=function(_0x4cbdc7,_0x104b13){const _0x1af4ca=_0x1aecd6;_0x4cbdc7=_0x4cbdc7['toUpperCase']()[_0x1af4ca(0x173)](),_0x104b13=_0x104b13[_0x1af4ca(0x348)]()['trim']();if(this[_0x1af4ca(0x291)][_0x4cbdc7][_0x104b13])return _0x1af4ca(0x35a)===_0x1af4ca(0x277)?_0x39ee66[_0x1af4ca(0x379)][_0x1af4ca(0x34d)][_0x1af4ca(0x43d)][_0x1af4ca(0x1bc)]:this['_traitSets'][_0x4cbdc7][_0x104b13];else{if(_0x1af4ca(0x451)===_0x1af4ca(0x2c0)){_0x4cc720=_0x2228ed||this[_0x1af4ca(0x1aa)](),this[_0x1af4ca(0x17a)][_0x1af4ca(0x1ed)]=0xa0;const _0x17f078=_0x1a8ffb[_0x1af4ca(0x438)]();this[_0x1af4ca(0x17a)][_0x1af4ca(0x325)](_0x12792a+0x1,_0x4eefd5+0x1,_0xf40b8-0x2,_0x914400-0x2,_0x17f078),this[_0x1af4ca(0x17a)][_0x1af4ca(0x1ed)]=0xff;}else return this['_traitSets'][_0x4cbdc7]['DEFAULT'];}},DataManager[_0x1aecd6(0x317)]=function(_0x19acab,_0x21c8ee){const _0x18b453=_0x1aecd6;if(!_0x21c8ee)return;this[_0x18b453(0x3cc)](_0x19acab,_0x21c8ee),this[_0x18b453(0x192)](_0x19acab,_0x21c8ee),this['makeRandomSingularTraitSetFromNotetags'](_0x19acab,_0x21c8ee);},DataManager['getRandomTraitSetFromString']=function(_0x587673){const _0x8a5ce4=_0x1aecd6;return data=_0x587673[_0x8a5ce4(0x178)](','),data[Math['randomInt'](data[_0x8a5ce4(0x1bc)])][_0x8a5ce4(0x173)]();},DataManager['makeMassTraitSetFromNotetags']=function(_0x5890ab,_0x26b215){const _0xd6f9ce=_0x1aecd6,_0x2b0f7e={'ELEMENT':_0xd6f9ce(0x3f2),'SUBELEMENT':_0xd6f9ce(0x261),'GENDER':'Gender','RACE':_0xd6f9ce(0x352),'NATURE':'Nature','ALIGNMENT':_0xd6f9ce(0x233),'BLESSING':'Blessing','CURSE':_0xd6f9ce(0x218),'ZODIAC':_0xd6f9ce(0x3a2),'VARIANT':'Variant'},_0xee5697=_0x26b215[_0xd6f9ce(0x3a9)];if(_0xee5697[_0xd6f9ce(0x351)](/<TRAIT SETS>\s*([\s\S]*)\s*<\/TRAIT SETS>/i)){const _0x45a66b=String(RegExp['$1'])[_0xd6f9ce(0x178)](/[\r\n]+/);for(const _0x55f387 of _0x45a66b){if(_0x55f387['match'](/(.*):[ ](.*)/i)){if(_0xd6f9ce(0x3b3)===_0xd6f9ce(0x441)){const _0x537034=_0x219446['split'](',');for(const _0x5dd734 of _0x537034){const _0x4d5364=_0x511465[_0xd6f9ce(0x1c6)](_0x5dd734);if(_0x4d5364)_0x2c5fe7['push'](_0x4d5364);}}else{const _0x38b918=String(RegExp['$1'])[_0xd6f9ce(0x348)]()[_0xd6f9ce(0x173)](),_0x21608f=String(RegExp['$2']),_0x2cc621=_0x2b0f7e[_0x38b918];_0x2cc621&&(_0xd6f9ce(0x1f6)===_0xd6f9ce(0x343)?_0x327f09[_0xd6f9ce(0x3db)](_0x1323f2):_0x5890ab[_0x2cc621]=this[_0xd6f9ce(0x27b)](_0x21608f));}}}}},DataManager[_0x1aecd6(0x192)]=function(_0x1b5cd2,_0x595e97){const _0x1eda88=_0x1aecd6,_0x21c28f=_0x595e97[_0x1eda88(0x3a9)],_0x181532={'Element':/<ELEMENT:[ ](.*)>/i,'SubElement':/<SUBELEMENT:[ ](.*)>/i,'Gender':/<GENDER:[ ](.*)>/i,'Race':/<RACE:[ ](.*)>/i,'Nature':/<NATURE:[ ](.*)>/i,'Alignment':/<ALIGNMENT:[ ](.*)>/i,'Blessing':/<BLESSING:[ ](.*)>/i,'Curse':/<CURSE:[ ](.*)>/i,'Zodiac':/<ZODIAC:[ ](.*)>/i,'Variant':/<VARIANT:[ ](.*)>/i};for(const _0x3e8b7d in _0x181532){const _0x2751a4=_0x181532[_0x3e8b7d];_0x21c28f[_0x1eda88(0x351)](_0x2751a4)&&(_0x1b5cd2[_0x3e8b7d]=this[_0x1eda88(0x27b)](RegExp['$1']));}_0x21c28f[_0x1eda88(0x351)](/<ELEMENT:[ ](.*)\/(.*)>/i)&&(_0x1b5cd2[_0x1eda88(0x3f2)]=String(RegExp['$1'])[_0x1eda88(0x173)](),_0x1b5cd2[_0x1eda88(0x261)]=String(RegExp['$2'])[_0x1eda88(0x173)]());},DataManager[_0x1aecd6(0x185)]=function(_0x1d2ee6,_0x3424ec){const _0x62c9e3=_0x1aecd6,_0x99e5af=_0x3424ec[_0x62c9e3(0x3a9)],_0x480704={'Element':/<RANDOM ELEMENT>\s*([\s\S]*)\s*<\/RANDOM ELEMENT>/i,'SubElement':/<RANDOM SUBELEMENT>\s*([\s\S]*)\s*<\/RANDOM SUBELEMENT>/i,'Gender':/<RANDOM GENDER>\s*([\s\S]*)\s*<\/RANDOM GENDER>/i,'Race':/<RANDOM RACE>\s*([\s\S]*)\s*<\/RANDOM RACE>/i,'Nature':/<RANDOM NATURE>\s*([\s\S]*)\s*<\/RANDOM NATURE>/i,'Alignment':/<RANDOM ALIGNMENT>\s*([\s\S]*)\s*<\/RANDOM ALIGNMENT>/i,'Blessing':/<RANDOM BLESSING>\s*([\s\S]*)\s*<\/RANDOM BLESSING>/i,'Curse':/<RANDOM CURSE>\s*([\s\S]*)\s*<\/RANDOM CURSE>/i,'Zodiac':/<RANDOM ZODIAC>\s*([\s\S]*)\s*<\/RANDOM ZODIAC>/i,'Variant':/<RANDOM VARIANT>\s*([\s\S]*)\s*<\/RANDOM VARIANT>/i};for(const _0xa178f5 in _0x480704){const _0xe25864=_0x480704[_0xa178f5];if(_0x99e5af[_0x62c9e3(0x351)](_0xe25864)){if('rJUAZ'!=='rJUAZ'){var _0x35e74d=_0x373240(_0x12b577['$1'])/0x64;_0x1eaff4*=_0x35e74d;}else{const _0x42eaf4=String(RegExp['$1'])[_0x62c9e3(0x178)](/[\r\n]+/)[_0x62c9e3(0x3f4)]('');_0x1d2ee6[_0xa178f5]=this[_0x62c9e3(0x22d)](_0x42eaf4);}}}},DataManager[_0x1aecd6(0x22d)]=function(_0x58c9fd){const _0x4af13e=_0x1aecd6;let _0x2dc5a5=0x0;const _0x4edb4c={};for(const _0x2b7c12 of _0x58c9fd){if(_0x2b7c12[_0x4af13e(0x351)](/(.*):[ ](\d+)/i)){if('vWkCO'==='vWkCO'){const _0x35765a=String(RegExp['$1'])['trim'](),_0x295402=Number(RegExp['$2']);_0x4edb4c[_0x35765a]=_0x295402,_0x2dc5a5+=_0x295402;}else{_0x48a94e['prototype'][_0x4af13e(0x1ec)][_0x4af13e(0x38d)](this),this[_0x4af13e(0x240)](),this[_0x4af13e(0x1fe)](),this[_0x4af13e(0x18d)]();if(this[_0x4af13e(0x356)]&&this[_0x4af13e(0x2fa)])this[_0x4af13e(0x2fa)]['call'](this);}}else{if(_0x2b7c12['match'](/(.*):[ ](\d+\.?\d+)/i)){if(_0x4af13e(0x2ff)!==_0x4af13e(0x2ff)){if(_0x2aa708[_0x4af13e(0x1bc)]<=0x0)return 0x0;return _0x4762a6[_0x4af13e(0x2ae)]((_0x51d552,_0x1a6b56)=>_0x51d552+this[_0x4af13e(0x2bb)]()[_0x4af13e(0x422)](_0x1a6b56),0x0);}else{const _0x4f0659=String(RegExp['$1'])[_0x4af13e(0x173)](),_0x437d0a=Number(RegExp['$2']);_0x4edb4c[_0x4f0659]=_0x437d0a,_0x2dc5a5+=_0x437d0a;}}else _0x2b7c12!==''&&(_0x4edb4c[_0x2b7c12]=0x1,_0x2dc5a5++);}}if(_0x2dc5a5<=0x0)return'';let _0x30b947=Math[_0x4af13e(0x365)]()*_0x2dc5a5;for(const _0x34d3da in _0x4edb4c){if(_0x4af13e(0x344)!==_0x4af13e(0x344)){const _0x416249=_0x5e7925[_0x4af13e(0x1c6)](_0x20aeec);if(_0x416249)_0x14249f[_0x4af13e(0x355)](_0x416249);}else{_0x30b947-=_0x4edb4c[_0x34d3da];if(_0x30b947<=0x0)return _0x34d3da;}}return'';},DataManager[_0x1aecd6(0x40a)]=function(_0x541c73){const _0x20affc=_0x1aecd6;let _0x2376a6=[],_0x1939f6=0x0;_0x541c73=_0x541c73[_0x20affc(0x348)]()[_0x20affc(0x173)]();const _0x4c2eba=this[_0x20affc(0x291)][_0x541c73];for(const _0xdfcc55 in _0x4c2eba){if(_0x20affc(0x335)===_0x20affc(0x335)){const _0x289257=_0x4c2eba[_0xdfcc55];if(_0x289257[_0x20affc(0x3b7)]){if('uadGn'!==_0x20affc(0x21e))_0x2376a6['push'](_0xdfcc55),_0x1939f6+=_0x289257[_0x20affc(0x2b1)];else{var _0x5502e5=_0x91d2c8(_0x1591a2['$1']);try{_0x43e587+=_0x1ce411(_0x5502e5);}catch(_0x14b8c4){if(_0x2618f9['isPlaytest']())_0x3adc46[_0x20affc(0x404)](_0x14b8c4);}}}}else{var _0x45459d=_0x31c309(_0x5cef1e['$1']);try{return _0x4e56c7(_0x45459d);}catch(_0x351a04){if(_0x1c2b0e[_0x20affc(0x245)]())_0x576e4b[_0x20affc(0x404)](_0x351a04);return![];}}}if(_0x1939f6<=0x0)return'';let _0x4a1868=Math['random']()*_0x1939f6;for(const _0x1df534 of _0x2376a6){if('pnTsB'!==_0x20affc(0x2e2)){_0x4a1868-=_0x4c2eba[_0x1df534]['RandomWeight'];if(_0x4a1868<=0x0)return _0x1df534;}else{const _0x19f087=this['commandName'](_0xce5777);if(_0x19f087[_0x20affc(0x351)](/\\I\[(\d+)\]/i)){const _0x50cc4d=this[_0x20affc(0x1ef)](_0x36877e),_0x35608c=this['textSizeEx'](_0x19f087)[_0x20affc(0x3ee)];return _0x35608c<=_0x50cc4d[_0x20affc(0x3ee)]?'iconText':_0x20affc(0x248);}}}return'';},DataManager[_0x1aecd6(0x1c6)]=function(_0x266f1a){const _0x4a0e7f=_0x1aecd6;_0x266f1a=_0x266f1a[_0x4a0e7f(0x348)]()[_0x4a0e7f(0x173)](),this['_elementIDs']=this[_0x4a0e7f(0x2ab)]||{};if(this[_0x4a0e7f(0x2ab)][_0x266f1a])return this[_0x4a0e7f(0x2ab)][_0x266f1a];let _0x5f49ac=0x1;for(const _0x25c837 of $dataSystem[_0x4a0e7f(0x213)]){if(!_0x25c837)continue;let _0x4ff75d=_0x25c837['toUpperCase']();_0x4ff75d=_0x4ff75d['replace'](/\x1I\[(\d+)\]/gi,''),_0x4ff75d=_0x4ff75d['replace'](/\\I\[(\d+)\]/gi,''),this['_elementIDs'][_0x4ff75d]=_0x5f49ac,_0x5f49ac++;}return this[_0x4a0e7f(0x2ab)][_0x266f1a]||0x0;},DataManager[_0x1aecd6(0x3e6)]=function(_0x15b611){const _0x376740=_0x1aecd6;let _0x486a2d=[];const _0x203427=_0x15b611[_0x376740(0x3a9)][_0x376740(0x351)](/<MULTI-ELEMENT:[ ](.*)>/gi);if(_0x203427)for(const _0x5aaadb of _0x203427){if(_0x376740(0x39b)==='olFWu'){const _0x3e0d65=_0xd35d7c[_0x376740(0x379)]['Settings'][_0x376740(0x1fd)];_0x5dedd8[_0x376740(0x39e)]=(_0x3e0d65[_0x376740(0x3fe)]||_0x3a9f21[_0x376740(0x39e)])[_0x376740(0x42f)](_0x54bc98=>{const _0x16e804=_0x376740,_0x393920=_0x6ce956[_0x16e804(0x301)](_0x54bc98);return _0x393920&&_0x393920[_0x16e804(0x353)];}),_0x185e6e[_0x376740(0x431)]=(_0x3e0d65[_0x376740(0x37b)]||_0x4326a9[_0x376740(0x431)])['filter'](_0x370dc1=>{const _0x3db144=_0x376740,_0x126755=_0x4cfa5f[_0x3db144(0x301)](_0x370dc1);return _0x126755&&_0x126755[_0x3db144(0x353)];});}else{_0x5aaadb[_0x376740(0x351)](/<MULTI-ELEMENT:[ ](.*)>/gi);const _0x4ef804=String(RegExp['$1'])[_0x376740(0x178)](',')['map'](_0x427b63=>_0x427b63['trim']());for(const _0x4a62d2 of _0x4ef804){const _0x29dbf7=/^\d+$/['test'](_0x4a62d2);if(_0x29dbf7)_0x486a2d[_0x376740(0x355)](Number(_0x4a62d2));else{const _0x46f140=this[_0x376740(0x1c6)](_0x4a62d2);if(_0x46f140)_0x486a2d[_0x376740(0x355)](_0x46f140);}}}}return _0x486a2d;},TextManager['statusMenuBiography']=VisuMZ[_0x1aecd6(0x379)][_0x1aecd6(0x34d)][_0x1aecd6(0x26a)][_0x1aecd6(0x2a4)],TextManager[_0x1aecd6(0x366)]=VisuMZ[_0x1aecd6(0x379)][_0x1aecd6(0x34d)][_0x1aecd6(0x26a)][_0x1aecd6(0x1f7)],TextManager['statusMenuDmgReceive']=VisuMZ[_0x1aecd6(0x379)]['Settings'][_0x1aecd6(0x26a)][_0x1aecd6(0x2fd)],TextManager[_0x1aecd6(0x30a)]=VisuMZ[_0x1aecd6(0x379)][_0x1aecd6(0x34d)]['StatusMenu'][_0x1aecd6(0x232)],TextManager['statusMenuStype']=VisuMZ['ElementStatusCore'][_0x1aecd6(0x34d)][_0x1aecd6(0x26a)]['VocabStype'],TextManager[_0x1aecd6(0x370)]=VisuMZ['ElementStatusCore'][_0x1aecd6(0x34d)][_0x1aecd6(0x26a)][_0x1aecd6(0x380)],TextManager[_0x1aecd6(0x310)]=VisuMZ[_0x1aecd6(0x379)][_0x1aecd6(0x34d)]['StatusMenu'][_0x1aecd6(0x3ed)],ColorManager[_0x1aecd6(0x3a1)]=function(_0x23e4d4){const _0xe9c54a=_0x1aecd6;_0x23e4d4=String(_0x23e4d4);if(_0x23e4d4[_0xe9c54a(0x351)](/#(.*)/i)){if(_0xe9c54a(0x41b)===_0xe9c54a(0x41b))return _0xe9c54a(0x271)[_0xe9c54a(0x411)](String(RegExp['$1']));else _0x94c13b*=_0x298444(_0xacf72d);}else return this['textColor'](Number(_0x23e4d4));},VisuMZ[_0x1aecd6(0x379)][_0x1aecd6(0x378)]=Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x28e)],Game_Action[_0x1aecd6(0x3fc)]['clear']=function(){const _0x37b0ab=_0x1aecd6;VisuMZ[_0x37b0ab(0x379)][_0x37b0ab(0x378)][_0x37b0ab(0x38d)](this),this['clearElementChanges']();},Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x1b0)]=function(){const _0x112aec=_0x1aecd6;this[_0x112aec(0x381)]=![],this['_battleCoreForcedElements']=[],this[_0x112aec(0x2d5)]=[];},Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x213)]=function(){const _0x3c668e=_0x1aecd6;if(!this['item']())return[];if(this[_0x3c668e(0x2bb)]()[_0x3c668e(0x3d1)]())return[];if(this[_0x3c668e(0x381)])return[];if(this['_battleCoreForcedElements'][_0x3c668e(0x1bc)]>0x0)return this[_0x3c668e(0x2f6)];const _0x403bfc=this[_0x3c668e(0x2bb)]()[_0x3c668e(0x274)]();if(_0x403bfc[_0x3c668e(0x1bc)]>0x0)return _0x403bfc;let _0x350a3a=[];const _0x355abc=this[_0x3c668e(0x345)]()['damage'][_0x3c668e(0x3bd)];return _0x355abc<0x0?_0x3c668e(0x414)!==_0x3c668e(0x414)?_0x10a34a+=_0x13cca6[_0x3c668e(0x379)][_0x3c668e(0x361)](_0x101ed7,_0x2cac72,_0x57eb43):_0x350a3a=_0x350a3a[_0x3c668e(0x43e)](this['subject']()[_0x3c668e(0x3ab)]()):_0x350a3a[_0x3c668e(0x355)](_0x355abc),_0x350a3a=_0x350a3a[_0x3c668e(0x43e)](this['_battleCoreAddedElements']),_0x350a3a=_0x350a3a[_0x3c668e(0x43e)](DataManager[_0x3c668e(0x3e6)](this['item']())),_0x350a3a[_0x3c668e(0x42f)]((_0x81b6e9,_0x234a7c,_0xee6956)=>_0xee6956[_0x3c668e(0x1c4)](_0x81b6e9)===_0x234a7c);},VisuMZ[_0x1aecd6(0x379)]['Game_Action_itemMrf']=Game_Action['prototype'][_0x1aecd6(0x399)],Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x399)]=function(_0x4226f8){const _0x562673=_0x1aecd6;if(this['canPierceElement']())return 0x0;const _0x5bebc1=_0x4226f8[_0x562673(0x44b)]();if(this[_0x562673(0x213)]()['filter'](_0x42245b=>_0x5bebc1['includes'](_0x42245b))[_0x562673(0x1bc)]>0x0){if(_0x562673(0x2fe)!==_0x562673(0x2fe))this['changeTextColor'](_0x4a21ab[_0x562673(0x1d1)]()),_0xa83ba8=_0xba599c[_0x562673(0x366)][_0x562673(0x411)](_0x5bd25d['round'](_0x56f3a6*0x64));else{const _0x46b855=this['subject']()?this[_0x562673(0x2bb)]()[_0x562673(0x424)]():[];if(_0x5bebc1[_0x562673(0x247)](_0x4c7fe7=>_0x46b855[_0x562673(0x3c8)](_0x4c7fe7)))return 0x0;if(this[_0x562673(0x1f2)]())return 0x0;return 0x1;}}return VisuMZ[_0x562673(0x379)][_0x562673(0x37f)][_0x562673(0x38d)](this,_0x4226f8);},Game_Action['prototype'][_0x1aecd6(0x1ea)]=function(_0x43d212){const _0x43c895=_0x1aecd6;let _0x2bb786=VisuMZ[_0x43c895(0x379)][_0x43c895(0x34d)]['ElementRules'][_0x43c895(0x2f4)][_0x43c895(0x38d)](this,_0x43d212);const _0x2e77e5=this[_0x43c895(0x2bb)]()?this[_0x43c895(0x2bb)]()['getPiercedElements']():[];return this[_0x43c895(0x213)]()[_0x43c895(0x247)](_0x4dc8b5=>_0x2e77e5[_0x43c895(0x3c8)](_0x4dc8b5))&&(_0x2bb786=Math[_0x43c895(0x32e)](0x1,_0x2bb786)),this[_0x43c895(0x442)]()&&(_0x43c895(0x1cc)!==_0x43c895(0x2c3)?_0x2bb786=Math[_0x43c895(0x32e)](0x1,_0x2bb786):this[_0x43c895(0x236)](_0x2d16fa,'tp',_0x1373fa,_0x2d7830)),_0x2bb786;},Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x288)]=function(_0x2fe30d,_0x55448b){const _0xd158a6=_0x1aecd6,_0x57e1b2=this['elementRateRuling']();switch(_0x57e1b2){case _0xd158a6(0x346):return this[_0xd158a6(0x316)](_0x2fe30d,_0x55448b);break;case _0xd158a6(0x2d9):return this[_0xd158a6(0x2a6)](_0x2fe30d,_0x55448b);break;case _0xd158a6(0x2ec):return this[_0xd158a6(0x383)](_0x2fe30d,_0x55448b);break;case _0xd158a6(0x3a7):return this['elementsAverageRate'](_0x2fe30d,_0x55448b);break;default:return this['elementsMaxRate'](_0x2fe30d,_0x55448b);break;}},Game_Action[_0x1aecd6(0x3fc)]['elementRateRuling']=function(){const _0x18d71a=_0x1aecd6;if(this['item']()['note'][_0x18d71a(0x351)](/<MULTI-ELEMENT RULE:[ ](.*)>/i)){const _0x7ee325=String(RegExp['$1'])['trim']()[_0x18d71a(0x432)]();switch(_0x7ee325){case _0x18d71a(0x32e):case'maximum':case _0x18d71a(0x19e):return _0x18d71a(0x32e);break;case _0x18d71a(0x346):case'minimum':case'lowest':return'min';break;case _0x18d71a(0x2d9):case _0x18d71a(0x1be):case'product':return _0x18d71a(0x2d9);break;case _0x18d71a(0x2ec):case'add':case _0x18d71a(0x416):return _0x18d71a(0x2ec);break;case'average':case _0x18d71a(0x40e):return _0x18d71a(0x3a7);break;}}return VisuMZ[_0x18d71a(0x379)][_0x18d71a(0x34d)]['ElementRules'][_0x18d71a(0x270)];},Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x44d)]=function(_0x3f6ba8,_0x3833e5){const _0x498cfb=_0x1aecd6;if(_0x3833e5[_0x498cfb(0x1bc)]>0x0){if(VisuMZ[_0x498cfb(0x379)][_0x498cfb(0x34d)]['ElementRules']['RuleMaxCalcJSa']){if('LHRit'==='LHRit')return VisuMZ[_0x498cfb(0x379)]['Settings'][_0x498cfb(0x201)][_0x498cfb(0x1da)][_0x498cfb(0x38d)](this,_0x3f6ba8,_0x3833e5);else{if(_0x1ce201>0x0)_0x4889b8*=this[_0x498cfb(0x24b)](_0x3f4428),_0x4f217e*=this[_0x498cfb(0x2bb)]()[_0x498cfb(0x24b)](_0x45590d),_0x4ee341=_0x41f24a['round'](_0x36b985);else _0x123b02<0x0&&(_0xb8ed2a*=this[_0x498cfb(0x3ce)](_0x5ab915),_0x3e5e93*=this[_0x498cfb(0x2bb)]()[_0x498cfb(0x3ce)](_0x428f33),_0x3e614c=_0x1e45f9[_0x498cfb(0x309)](_0x224599));return _0x59ebeb[_0x498cfb(0x379)]['Game_Action_executeDamage'][_0x498cfb(0x38d)](this,_0x13c123,_0x570c80);}}const _0x467069=this['isRecover']()?[]:_0x3f6ba8[_0x498cfb(0x3c3)]();let _0x5cf5b7=-0x3e8;for(const _0x1de1a6 of _0x3833e5){const _0x3fb84b=_0x467069['includes'](_0x1de1a6)?-0x1:0x1;_0x5cf5b7=Math[_0x498cfb(0x32e)](_0x5cf5b7,_0x3f6ba8[_0x498cfb(0x2a9)](_0x1de1a6)*_0x3fb84b);}return _0x5cf5b7;}else return 0x1;},Game_Action[_0x1aecd6(0x3fc)]['elementsMinRate']=function(_0x1becbc,_0x2a4200){const _0xc7fe7c=_0x1aecd6;if(_0x2a4200['length']>0x0)return VisuMZ[_0xc7fe7c(0x379)]['Settings'][_0xc7fe7c(0x201)][_0xc7fe7c(0x304)][_0xc7fe7c(0x38d)](this,_0x1becbc,_0x2a4200);else{if('oRGJA'===_0xc7fe7c(0x1ba)){_0x558994['match'](/<ELEMENT REFLECT:[ ](.*)>/i);const _0x5b6762=_0xbbf041['$1'];if(_0x5b6762[_0xc7fe7c(0x351)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x2b0380=_0xd8978e['parse']('['+_0x1bfa24['$1'][_0xc7fe7c(0x351)](/\d+/g)+']');_0x192662=_0x39b3c3[_0xc7fe7c(0x43e)](_0x2b0380);}else{const _0x400d19=_0x5b6762[_0xc7fe7c(0x178)](',');for(const _0x512fc6 of _0x400d19){const _0x447808=_0x59d46d[_0xc7fe7c(0x1c6)](_0x512fc6);if(_0x447808)_0x49a89e['push'](_0x447808);}}}else return 0x1;}},Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x2a6)]=function(_0x10f3e8,_0x4057ab){const _0x582975=_0x1aecd6;if(_0x4057ab[_0x582975(0x1bc)]>0x0){if('BGIwp'!=='lkgni')return VisuMZ[_0x582975(0x379)]['Settings']['ElementRules'][_0x582975(0x21d)][_0x582975(0x38d)](this,_0x10f3e8,_0x4057ab);else{_0x4cce1d[_0x582975(0x3a5)]&&this[_0x582975(0x29c)](_0x58e713,_0x5b42f8['x'],_0x5056f4['y']+0x2);_0x5e2798['x']+=_0x31aaed[_0x582975(0x1de)](_0xed10c6['iconWidth']*this['fontSizeRatio']());if(this['fontSizeRatio']()===0x1)_0x5ece84['x']+=0x4;}}else return 0x1;},Game_Action[_0x1aecd6(0x3fc)]['elementsRateSum']=function(_0x3a0e27,_0x3bef5b){const _0x4c93e2=_0x1aecd6;return _0x3bef5b['length']>0x0?VisuMZ[_0x4c93e2(0x379)][_0x4c93e2(0x34d)][_0x4c93e2(0x201)][_0x4c93e2(0x295)][_0x4c93e2(0x38d)](this,_0x3a0e27,_0x3bef5b):0x1;},Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x3f6)]=function(_0x4d2cb5,_0xc18a46){const _0x4a132b=_0x1aecd6;return _0xc18a46[_0x4a132b(0x1bc)]>0x0?'RiGnX'!==_0x4a132b(0x230)?VisuMZ[_0x4a132b(0x379)][_0x4a132b(0x34d)][_0x4a132b(0x201)][_0x4a132b(0x397)][_0x4a132b(0x38d)](this,_0x4d2cb5,_0xc18a46):0x1:0x1;},Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x430)]=function(_0x39df72,_0x5be6d1){const _0x12ae36=_0x1aecd6;if(_0x5be6d1[_0x12ae36(0x1bc)]<=0x0)return 0x0;return _0x5be6d1[_0x12ae36(0x2ae)]((_0x55ac41,_0x6e2955)=>_0x55ac41+this['subject']()['getDealtElementPlus'](_0x6e2955),0x0);},Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x38f)]=function(_0x5c21a0,_0x57b1e8){const _0x34aaba=_0x1aecd6;if(_0x57b1e8[_0x34aaba(0x1bc)]<=0x0)return 0x1;return _0x57b1e8[_0x34aaba(0x2ae)]((_0x3b9999,_0x340daa)=>_0x3b9999*this['subject']()[_0x34aaba(0x41c)](_0x340daa),0x1);},Game_Action['prototype'][_0x1aecd6(0x1cf)]=function(_0x22593b,_0x58c4f6){const _0x9ee0c=_0x1aecd6;if(_0x58c4f6[_0x9ee0c(0x1bc)]<=0x0)return 0x0;return _0x58c4f6[_0x9ee0c(0x2ae)]((_0x231a94,_0x74df68)=>_0x231a94+this[_0x9ee0c(0x2bb)]()[_0x9ee0c(0x412)](_0x74df68),0x0);},Game_Action['prototype']['canBypassElementReflect']=function(){const _0x20fd10=_0x1aecd6;if(!this['item']())return![];if(!this[_0x20fd10(0x345)]()[_0x20fd10(0x3a9)])return![];return this[_0x20fd10(0x345)]()[_0x20fd10(0x3a9)][_0x20fd10(0x351)](/<BYPASS ELEMENT REFLECT>/i);},Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x442)]=function(){const _0x26aacb=_0x1aecd6;if(!this[_0x26aacb(0x345)]())return![];if(!this[_0x26aacb(0x345)]()['note'])return![];return this[_0x26aacb(0x345)]()['note']['match'](/<(?:ELEMENT |)PIERCE>/i);},VisuMZ[_0x1aecd6(0x379)]['Game_Action_itemHit']=Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x42c)],Game_Action['prototype'][_0x1aecd6(0x42c)]=function(_0x24ccdf){const _0x1bd655=_0x1aecd6;let _0x7298a8=VisuMZ[_0x1bd655(0x379)][_0x1bd655(0x3cb)]['call'](this,_0x24ccdf);if(Imported[_0x1bd655(0x2a8)]){const _0x1c2a35=this[_0x1bd655(0x345)]()[_0x1bd655(0x3a9)]||'';if(_0x1c2a35[_0x1bd655(0x351)](/<ALWAYS HIT>/i))return 0x1;if(_0x1c2a35[_0x1bd655(0x351)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return Number(RegExp['$1'])/0x64;}return _0x7298a8*=this['traitHitRateMultipliersVs'](_0x24ccdf),_0x7298a8*=this[_0x1bd655(0x2bb)]()[_0x1bd655(0x3c6)](_0x24ccdf),_0x7298a8+=this[_0x1bd655(0x443)](_0x24ccdf),_0x7298a8+=this[_0x1bd655(0x2bb)]()['traitHitPlusMultipliersVs'](_0x24ccdf),_0x7298a8;},VisuMZ[_0x1aecd6(0x379)][_0x1aecd6(0x1e1)]=Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x38e)],Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x38e)]=function(_0x4e8316){const _0x1d4d4d=_0x1aecd6;let _0x2ecc22=VisuMZ[_0x1d4d4d(0x379)]['Game_Action_itemCri'][_0x1d4d4d(0x38d)](this,_0x4e8316);if(!this['item']()[_0x1d4d4d(0x43a)]['critical'])return _0x2ecc22;if(Imported[_0x1d4d4d(0x2a8)]){if(_0x1d4d4d(0x17c)==='ShGjn'){const _0x911d6e=this['item']()['note']||'';if(_0x911d6e[_0x1d4d4d(0x351)](/<ALWAYS CRITICAL>/i))return 0x1;}else{var _0x2ced3=_0x3783fb(_0x426e2b['$1']);try{_0x31e213+=_0x51ce11(_0x2ced3);}catch(_0x13b128){if(_0x22569f[_0x1d4d4d(0x245)]())_0x254d43[_0x1d4d4d(0x404)](_0x13b128);}}}return _0x2ecc22*=this[_0x1d4d4d(0x1c1)](_0x4e8316),_0x2ecc22*=this['subject']()['traitCriticalRateMultipliersVs'](_0x4e8316),_0x2ecc22+=this[_0x1d4d4d(0x1ab)](_0x4e8316),_0x2ecc22+=this[_0x1d4d4d(0x2bb)]()[_0x1d4d4d(0x1ab)](_0x4e8316),_0x2ecc22;},VisuMZ['ElementStatusCore'][_0x1aecd6(0x1d0)]=Game_Action['prototype'][_0x1aecd6(0x34c)],Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x34c)]=function(_0x110cb1,_0x4caa48){const _0xc98f42=_0x1aecd6;if(_0x4caa48>0x0)_0x4caa48*=this[_0xc98f42(0x24b)](_0x110cb1),_0x4caa48*=this[_0xc98f42(0x2bb)]()[_0xc98f42(0x24b)](_0x110cb1),_0x4caa48=Math[_0xc98f42(0x309)](_0x4caa48);else _0x4caa48<0x0&&('QqtJh'===_0xc98f42(0x3d0)?this['drawTextEx'](_0x172bac,_0x44a682['x']+_0x224d6b['width']-_0x512453,_0x5da8c1['y'],_0x3397c0):(_0x4caa48*=this[_0xc98f42(0x3ce)](_0x110cb1),_0x4caa48*=this['subject']()['traitHealMultipliersVs'](_0x110cb1),_0x4caa48=Math[_0xc98f42(0x309)](_0x4caa48)));return VisuMZ[_0xc98f42(0x379)][_0xc98f42(0x1d0)][_0xc98f42(0x38d)](this,_0x110cb1,_0x4caa48);},VisuMZ[_0x1aecd6(0x379)][_0x1aecd6(0x1c8)]=function(_0xa6b6cf,_0x1d71d0,_0x305daf){const _0x860e41=_0x1aecd6;let _0x5ce66b=0x1;if(!_0x1d71d0)return _0x5ce66b;const _0x1cb337=_0x1d71d0[_0x860e41(0x3a9)]||'',_0x3673a3=_0x1cb337[_0x860e41(0x351)](_0x305daf);if(_0x3673a3)for(const _0x512ca9 of _0x3673a3){if(_0x860e41(0x2d7)==='oAFjo'){_0x512ca9['match'](_0x305daf);const _0x3009a1=String(RegExp['$1']),_0x46811e=Number(RegExp['$2'])*0.01;if(_0xa6b6cf['hasTraitSet'](_0x3009a1)){if(_0x860e41(0x2ea)!=='RsjBA')return _0xbd531b(_0x12fa31['$1'])/0x64;else _0x5ce66b*=_0x46811e;}}else return _0x50c790[_0x860e41(0x1bc)]>0x0?_0x5254bc[_0x860e41(0x379)][_0x860e41(0x34d)][_0x860e41(0x201)][_0x860e41(0x397)]['call'](this,_0x12e1ac,_0x446947):0x1;}return _0x5ce66b;},VisuMZ['ElementStatusCore'][_0x1aecd6(0x361)]=function(_0x3a557e,_0xbb2393,_0x35ced6){const _0x72d4c4=_0x1aecd6;let _0x316721=0x0;if(!_0xbb2393)return _0x316721;const _0x29ff90=_0xbb2393['note']||'',_0x297ae5=_0x29ff90[_0x72d4c4(0x351)](_0x35ced6);if(_0x297ae5)for(const _0xe07347 of _0x297ae5){_0xe07347[_0x72d4c4(0x351)](_0x35ced6);const _0x211239=String(RegExp['$1']),_0x431fa5=Number(RegExp['$2'])*0.01;_0x3a557e['hasTraitSet'](_0x211239)&&(_0x316721+=_0x431fa5);}return _0x316721;},Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x24b)]=function(_0x5b714f){const _0x417d1d=_0x1aecd6;let _0x5dfab1=0x1;if(!_0x5b714f)return _0x5dfab1;const _0x30942f=/<DAMAGE VS (.*) TRAIT:[ ](\d+)([%％])>/gi;return VisuMZ['ElementStatusCore'][_0x417d1d(0x1c8)](_0x5b714f,this['item'](),_0x30942f);},Game_BattlerBase['prototype'][_0x1aecd6(0x24b)]=function(_0x29309a){const _0x374379=_0x1aecd6;let _0x5cd399=0x1;if(!_0x29309a)return _0x5cd399;const _0x561f0f=/<DAMAGE VS (.*) TRAIT:[ ](\d+)([%％])>/gi,_0x90ff16=this[_0x374379(0x1df)]();for(const _0x2aad5e of _0x90ff16){_0x5cd399*=VisuMZ['ElementStatusCore'][_0x374379(0x1c8)](_0x29309a,_0x2aad5e,_0x561f0f);}return _0x5cd399;},Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x3ce)]=function(_0xeaba99){const _0x11001d=_0x1aecd6;let _0xacc31e=0x1;if(!_0xeaba99)return _0xacc31e;const _0x20fef1=/<HEALING VS (.*) TRAIT:[ ](\d+)([%％])>/gi;return VisuMZ[_0x11001d(0x379)][_0x11001d(0x1c8)](_0xeaba99,this[_0x11001d(0x345)](),_0x20fef1);},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x3ce)]=function(_0x159b47){const _0x2c224a=_0x1aecd6;let _0x288bbe=0x1;if(!_0x159b47)return _0x288bbe;const _0x28adce=/<HEALING VS (.*) TRAIT:[ ](\d+)([%％])>/gi,_0x49f9c1=this[_0x2c224a(0x1df)]();for(const _0x44ffeb of _0x49f9c1){_0x2c224a(0x1e8)===_0x2c224a(0x1e8)?_0x288bbe*=VisuMZ[_0x2c224a(0x379)][_0x2c224a(0x1c8)](_0x159b47,_0x44ffeb,_0x28adce):_0x2790c0=_0x11f354[_0x2c224a(0x32e)](0x1,_0x6bf6d1);}return _0x288bbe;},Game_Action['prototype'][_0x1aecd6(0x3c6)]=function(_0x31b1b3){const _0x233579=_0x1aecd6;let _0x13e040=0x1;if(!_0x31b1b3)return _0x13e040;const _0x31b101=/<ACCURACY VS (.*) TRAIT:[ ](\d+)([%％])>/gi;return VisuMZ[_0x233579(0x379)][_0x233579(0x1c8)](_0x31b1b3,this[_0x233579(0x345)](),_0x31b101);},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x3c6)]=function(_0x479752){const _0x2f43bc=_0x1aecd6;let _0x4c70af=0x1;if(!_0x479752)return _0x4c70af;const _0x178abb=/<ACCURACY VS (.*) TRAIT:[ ](\d+)([%％])>/gi,_0x220a4f=this[_0x2f43bc(0x1df)]();for(const _0x549b51 of _0x220a4f){_0x4c70af*=VisuMZ[_0x2f43bc(0x379)]['TraitCheckNotetagRate'](_0x479752,_0x549b51,_0x178abb);}return _0x4c70af;},Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x443)]=function(_0x5a91c5){const _0x3666b8=_0x1aecd6;let _0x5331c5=0x0;if(!_0x5a91c5)return _0x5331c5;const _0x14ad09=/<ACCURACY VS (.*) TRAIT:[ ]([\+\-]\d+)([%％])>/gi;return VisuMZ[_0x3666b8(0x379)][_0x3666b8(0x361)](_0x5a91c5,this[_0x3666b8(0x345)](),_0x14ad09);},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x443)]=function(_0x4ddfc2){const _0x16efc3=_0x1aecd6;let _0x581151=0x0;if(!_0x4ddfc2)return _0x581151;const _0x5ca76d=/<ACCURACY VS (.*) TRAIT:[ ]([\+\-]\d+)([%％])>/gi,_0x3228c1=this[_0x16efc3(0x1df)]();for(const _0x16ff43 of _0x3228c1){if('vBvAf'!==_0x16efc3(0x203))_0x581151+=VisuMZ[_0x16efc3(0x379)][_0x16efc3(0x361)](_0x4ddfc2,_0x16ff43,_0x5ca76d);else{var _0x3b11e0=_0x32ca72(_0x3db821['$1']);_0x590c3b*=_0x3b11e0;}}return _0x581151;},Game_Action[_0x1aecd6(0x3fc)][_0x1aecd6(0x1c1)]=function(_0x1f1628){const _0xea577c=_0x1aecd6;let _0x5b8a7=0x1;if(!_0x1f1628)return _0x5b8a7;const _0x177adb=/<CRITICAL VS (.*) TRAIT:[ ](\d+)([%％])>/gi;return VisuMZ['ElementStatusCore'][_0xea577c(0x1c8)](_0x1f1628,this[_0xea577c(0x345)](),_0x177adb);},Game_BattlerBase[_0x1aecd6(0x3fc)]['traitCriticalRateMultipliersVs']=function(_0x52925c){const _0x3d1a5b=_0x1aecd6;let _0x4974f9=0x1;if(!_0x52925c)return _0x4974f9;const _0x1b4ec2=/<CRITICAL VS (.*) TRAIT:[ ](\d+)([%％])>/gi,_0x5b8dd7=this[_0x3d1a5b(0x1df)]();for(const _0x219c33 of _0x5b8dd7){if(_0x3d1a5b(0x36a)==='PuFCo'){const _0x18c8d4=_0x2822e0(_0x1f9f74['$1']);_0x18c8d4!==_0xe7178f[_0x4dfabe]['version']&&(_0x3c5ea0(_0x3d1a5b(0x35b)[_0x3d1a5b(0x411)](_0x5c9d76,_0x18c8d4)),_0x4a6bd3['exit']());}else _0x4974f9*=VisuMZ[_0x3d1a5b(0x379)][_0x3d1a5b(0x1c8)](_0x52925c,_0x219c33,_0x1b4ec2);}return _0x4974f9;},Game_Action[_0x1aecd6(0x3fc)]['traitCriticalPlusMultipliersVs']=function(_0x4d561b){const _0x2891c9=_0x1aecd6;let _0x30fc54=0x0;if(!_0x4d561b)return _0x30fc54;const _0xe43331=/<CRITICAL VS (.*) TRAIT:[ ]([\+\-]\d+)([%％])>/gi;return VisuMZ[_0x2891c9(0x379)][_0x2891c9(0x361)](_0x4d561b,this['item'](),_0xe43331);},Game_BattlerBase['prototype'][_0x1aecd6(0x1ab)]=function(_0xa9b47e){const _0x1e25ec=_0x1aecd6;let _0x53a522=0x0;if(!_0xa9b47e)return _0x53a522;const _0x17f0ee=/<CRITICAL VS (.*) TRAIT:[ ]([\+\-]\d+)([%％])>/gi,_0x1e1a6b=this[_0x1e25ec(0x1df)]();for(const _0xb4bcdc of _0x1e1a6b){if('GoZkw'===_0x1e25ec(0x1e4))_0x53a522+=VisuMZ[_0x1e25ec(0x379)][_0x1e25ec(0x361)](_0xa9b47e,_0xb4bcdc,_0x17f0ee);else{const _0x447159=[0x0][_0x1e25ec(0x43e)](this[_0x1e25ec(0x319)]());let _0x468663=_0x17b23f[_0x1e25ec(0x379)][_0x1e25ec(0x34d)][_0x1e25ec(0x26a)]['ElementsCol%1'[_0x1e25ec(0x411)](_0xf65f6d)]??[];return _0x468663[_0x1e25ec(0x42f)](_0x10032a=>!_0x447159[_0x1e25ec(0x3c8)](_0x10032a));}}return _0x53a522;},VisuMZ[_0x1aecd6(0x379)][_0x1aecd6(0x306)]=Game_BattlerBase[_0x1aecd6(0x3fc)]['initMembers'],Game_BattlerBase['prototype'][_0x1aecd6(0x368)]=function(){const _0x1ae2a9=_0x1aecd6;this[_0x1ae2a9(0x252)]={},VisuMZ[_0x1ae2a9(0x379)][_0x1ae2a9(0x306)][_0x1ae2a9(0x38d)](this);},VisuMZ['ElementStatusCore'][_0x1aecd6(0x2d8)]=Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x1ec)],Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x1ec)]=function(){const _0x18d2ab=_0x1aecd6;this['_cache']={},this[_0x18d2ab(0x3d4)]=this['_tp'][_0x18d2ab(0x333)](0x0,this[_0x18d2ab(0x2ed)]()),VisuMZ[_0x18d2ab(0x379)][_0x18d2ab(0x2d8)]['call'](this);},Game_BattlerBase[_0x1aecd6(0x3fc)]['checkCacheKey']=function(_0x423b81){const _0x5305af=_0x1aecd6;return this['_cache']=this[_0x5305af(0x252)]||{},this[_0x5305af(0x252)][_0x423b81]!==undefined;},Game_BattlerBase[_0x1aecd6(0x3fc)]['initElementStatusCore']=function(){const _0x2d9f15=_0x1aecd6;this[_0x2d9f15(0x291)]={};const _0x2a9af2=this['getTraitSetKeys']();for(const _0x412d77 of _0x2a9af2){this[_0x2d9f15(0x291)][_0x412d77]='';}this[_0x2d9f15(0x312)](),this[_0x2d9f15(0x41e)]();},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x312)]=function(){},Game_BattlerBase['prototype']['applyTraitSetsByObjectNotetag']=function(){const _0x245b57=_0x1aecd6,_0x432f61=this[_0x245b57(0x202)]();DataManager[_0x245b57(0x317)](this[_0x245b57(0x291)],_0x432f61);},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x202)]=function(){return null;},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x22e)]=function(){const _0x6e6525=_0x1aecd6;return[_0x6e6525(0x3f2),_0x6e6525(0x261),_0x6e6525(0x376),_0x6e6525(0x352),'Nature',_0x6e6525(0x233),_0x6e6525(0x2cc),_0x6e6525(0x218),_0x6e6525(0x3a2),_0x6e6525(0x44c)];},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x318)]=function(_0x363a20){const _0x5f2788=_0x1aecd6;if(this[_0x5f2788(0x291)]===undefined)this[_0x5f2788(0x1f8)]();if(this[_0x5f2788(0x291)][_0x363a20]===undefined)this[_0x5f2788(0x1f8)]();return this['_traitSets'][_0x363a20];},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x36e)]=function(_0x30057c,_0x17dafb){const _0x42e9a0=_0x1aecd6;if(this[_0x42e9a0(0x291)]===undefined)this['initElementStatusCore']();if(this[_0x42e9a0(0x291)][_0x30057c]===undefined)this[_0x42e9a0(0x1f8)]();this[_0x42e9a0(0x291)][_0x30057c]=_0x17dafb,this['refresh']();},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x3e4)]=function(_0x282074){const _0x1ff70d=_0x1aecd6;if(this[_0x1ff70d(0x291)]===undefined)this[_0x1ff70d(0x1f8)]();if(this[_0x1ff70d(0x291)][_0x282074]===undefined)this[_0x1ff70d(0x1f8)]();const _0x3d2333=this['_traitSets'][_0x282074];return DataManager['traitSet'](_0x282074,_0x3d2333);},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x32c)]=function(){const _0x24daaa=_0x1aecd6;if($gameTemp[_0x24daaa(0x245)]()){console[_0x24daaa(0x404)](_0x24daaa(0x3a4)[_0x24daaa(0x411)](this[_0x24daaa(0x38c)]()));for(const _0x4c95d6 in this[_0x24daaa(0x291)]){if(_0x24daaa(0x418)!=='kbTdQ')console[_0x24daaa(0x404)](_0x24daaa(0x21f)[_0x24daaa(0x411)](_0x4c95d6,this[_0x24daaa(0x291)][_0x4c95d6]));else{let _0x40e495=_0x5dfb69[_0x24daaa(0x379)][_0x24daaa(0x1dd)]['call'](this);return this[_0x24daaa(0x2db)](_0x40e495);}}console[_0x24daaa(0x404)](_0x24daaa(0x426));}},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x3db)]=function(_0x42f6c8){const _0x1cef58=_0x1aecd6;this['_traitSets'][_0x42f6c8]=DataManager[_0x1cef58(0x40a)](_0x42f6c8),!this[_0x1cef58(0x377)]&&this[_0x1cef58(0x1ec)]();},VisuMZ[_0x1aecd6(0x379)]['Game_BattlerBase_canEquip']=Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x30f)],Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x30f)]=function(_0x479ebd){const _0xd18f26=_0x1aecd6;return VisuMZ[_0xd18f26(0x379)][_0xd18f26(0x36c)][_0xd18f26(0x38d)](this,_0x479ebd)&&this['meetsEquipTraitRequirements'](_0x479ebd);},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x172)]=function(_0x1b9896){const _0x35bea7=_0x1aecd6;if(!_0x1b9896)return!![];if(_0x1b9896[_0x35bea7(0x3a9)][_0x35bea7(0x351)](/<EQUIP TRAIT (?:REQUIREMENT|REQUIREMENTS):[ ](.*)>/i)){const _0x3ae520=this[_0x35bea7(0x22e)](),_0x6ae49e=String(RegExp['$1'])[_0x35bea7(0x178)](',')[_0x35bea7(0x290)](_0x788c8b=>_0x788c8b['toUpperCase']()['trim']());for(const _0x1ea57a of _0x6ae49e){if(_0x3ae520[_0x35bea7(0x247)](_0x6221fa=>this[_0x35bea7(0x318)](_0x6221fa)[_0x35bea7(0x348)]()['trim']()===_0x1ea57a))continue;return![];}}return!![];},Game_BattlerBase[_0x1aecd6(0x3fc)]['hasTraitSet']=function(_0x5d2729){const _0x2cfced=_0x1aecd6;_0x5d2729=_0x5d2729[_0x2cfced(0x348)]();const _0x83785b=this[_0x2cfced(0x22e)]();return _0x83785b[_0x2cfced(0x247)](_0x4a3965=>this[_0x2cfced(0x318)](_0x4a3965)['toUpperCase']()[_0x2cfced(0x173)]()===_0x5d2729);},VisuMZ['ElementStatusCore'][_0x1aecd6(0x222)]=Game_BattlerBase[_0x1aecd6(0x3fc)]['elementRate'],Game_BattlerBase['prototype'][_0x1aecd6(0x2a9)]=function(_0x41a7b1){const _0x351113=_0x1aecd6;if(_0x41a7b1<=0x0)return 0x1;const _0x1c27da=_0x351113(0x2cb)[_0x351113(0x411)](_0x41a7b1);if(this[_0x351113(0x19c)](_0x1c27da))return this[_0x351113(0x252)][_0x1c27da];const _0x17d472=this[_0x351113(0x39d)](_0x41a7b1);return _0x17d472===![]?this[_0x351113(0x252)][_0x1c27da]=VisuMZ[_0x351113(0x379)][_0x351113(0x34d)]['ElementRules']['ReceivedRateJS']['call'](this,_0x41a7b1):this[_0x351113(0x252)][_0x1c27da]=_0x17d472,this[_0x351113(0x252)][_0x1c27da];},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x39d)]=function(_0x3fc45b){const _0x2a91bf=_0x1aecd6,_0x3c34d6=VisuMZ[_0x2a91bf(0x379)][_0x2a91bf(0x3f3)];for(const _0x1e5fb1 of this[_0x2a91bf(0x1df)]()){if(!_0x1e5fb1)continue;const _0x417c25=_0x1e5fb1[_0x2a91bf(0x3a9)];if(_0x417c25[_0x2a91bf(0x351)](_0x3c34d6[_0x2a91bf(0x26e)][_0x3fc45b])){if(_0x2a91bf(0x2f1)!==_0x2a91bf(0x2f1)){if(_0x3040c8['VisuMZ_1_MessageCore'])_0x4a1029['prototype'][_0x2a91bf(0x18d)][_0x2a91bf(0x38d)](this);}else return Number(RegExp['$1'])/0x64;}else{if(_0x417c25[_0x2a91bf(0x351)](_0x3c34d6[_0x2a91bf(0x25a)][_0x3fc45b]))_0x2a91bf(0x235)==='ZilEE'?(_0xc3a952[_0x2a91bf(0x3fc)][_0x2a91bf(0x311)]['call'](this),this[_0x2a91bf(0x3b0)](),this[_0x2a91bf(0x276)][_0x2a91bf(0x3af)]()):Number(RegExp['$1']);else{if(_0x417c25[_0x2a91bf(0x351)](_0x3c34d6[_0x2a91bf(0x3d8)][_0x3fc45b])){var _0x87d957=String(RegExp['$1']);try{return eval(_0x87d957);}catch(_0x1a6f80){if($gameTemp[_0x2a91bf(0x245)]())console[_0x2a91bf(0x404)](_0x1a6f80);return![];}}}}}return![];},Game_BattlerBase['prototype']['getReceiveElementPlus']=function(_0x29d9a3){const _0x4132f2=_0x1aecd6,_0xc1c458=VisuMZ[_0x4132f2(0x379)][_0x4132f2(0x3f3)],_0x4ce809=(_0x1f7129,_0x5b80e1)=>{const _0x5ab414=_0x4132f2;if(_0x5ab414(0x448)==='bJmgq'){if(!_0x5b80e1)return _0x1f7129;const _0x19564f=_0x5b80e1['note'];if(_0x19564f[_0x5ab414(0x351)](_0xc1c458[_0x5ab414(0x407)][_0x29d9a3])){if(_0x5ab414(0x181)!==_0x5ab414(0x181)){if(!_0x23a23f['traitSetsEnabled']())return[];let _0x3dfbcf=[];const _0x129973=this[_0x5ab414(0x22e)]();for(const _0x719760 of _0x129973){const _0x225351=this[_0x5ab414(0x318)](_0x719760),_0x2523ec=_0x3ccb4c[_0x5ab414(0x3e4)](_0x719760,_0x225351);_0x3dfbcf=_0x3dfbcf['concat'](_0x2523ec[_0x5ab414(0x367)]);}return _0x3dfbcf;}else{var _0x3b40bf=Number(RegExp['$1'])/0x64;_0x1f7129+=_0x3b40bf;}}if(_0x19564f[_0x5ab414(0x351)](_0xc1c458[_0x5ab414(0x3f9)][_0x29d9a3])){if(_0x5ab414(0x3d2)===_0x5ab414(0x336))_0x5435a7+=_0x450298;else{var _0x3b40bf=Number(RegExp['$1']);_0x1f7129+=_0x3b40bf;}}if(_0x19564f[_0x5ab414(0x351)](_0xc1c458[_0x5ab414(0x1b5)][_0x29d9a3])){if(_0x5ab414(0x298)===_0x5ab414(0x298)){var _0x5e3f6a=String(RegExp['$1']);try{if(_0x5ab414(0x2e3)!=='tbYZY')for(const _0x570e5b of _0x47df03){_0x570e5b[_0x5ab414(0x351)](_0x15e9d4);const _0x303950=_0x251b78(_0x1c40c8['$1']),_0x5005a5=_0x139fef(_0x4f8493['$2'])*0.01;_0xd9a4d7[_0x5ab414(0x2ad)](_0x303950)&&(_0x4277e3*=_0x5005a5);}else _0x1f7129+=eval(_0x5e3f6a);}catch(_0x232fd0){if($gameTemp[_0x5ab414(0x245)]())console[_0x5ab414(0x404)](_0x232fd0);}}else{var _0x3bca10=_0x6de322(_0x586cf9['$1'])/0x64;_0x22db0e+=_0x3bca10;}}return _0x1f7129;}else _0x44ecab[_0x5ab414(0x379)][_0x5ab414(0x359)]['call'](this,_0x343486),this[_0x5ab414(0x1f8)](),this[_0x5ab414(0x197)]();};return this[_0x4132f2(0x1df)]()[_0x4132f2(0x2ae)](_0x4ce809,0x0);},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x360)]=function(_0x4b33b8){const _0x228487=_0x1aecd6;let _0x5c4d12=VisuMZ[_0x228487(0x379)][_0x228487(0x222)]['call'](this,_0x4b33b8);const _0x376002=this[_0x228487(0x22e)](),_0x5ad9ac=_0x228487(0x401)[_0x228487(0x411)](_0x4b33b8);for(const _0x489d6b of _0x376002){if('fBwpB'===_0x228487(0x28b)){const _0x321ab7=this[_0x228487(0x318)](_0x489d6b),_0x2e3f35=DataManager['traitSet'](_0x489d6b,_0x321ab7);_0x5c4d12*=_0x2e3f35[_0x228487(0x43c)][_0x5ad9ac]??0x1;}else return _0xd7c952[_0x228487(0x379)][_0x228487(0x34d)][_0x228487(0x201)][_0x228487(0x295)][_0x228487(0x38d)](this,_0xfdea2,_0x3627e5);}const _0x2002dd=VisuMZ[_0x228487(0x379)][_0x228487(0x3f3)],_0x54c2f2=(_0x1500b3,_0x2ee292)=>{const _0x340104=_0x228487;if(_0x340104(0x184)===_0x340104(0x184)){if(!_0x2ee292)return _0x1500b3;const _0xe16531=_0x2ee292[_0x340104(0x3a9)];if(_0xe16531[_0x340104(0x351)](_0x2002dd[_0x340104(0x440)][_0x4b33b8])){var _0x384939=Number(RegExp['$1'])/0x64;_0x1500b3*=_0x384939;}if(_0xe16531['match'](_0x2002dd[_0x340104(0x177)][_0x4b33b8])){var _0x384939=Number(RegExp['$1']);_0x1500b3*=_0x384939;}if(_0xe16531[_0x340104(0x351)](_0x2002dd[_0x340104(0x303)][_0x4b33b8])){var _0x1b1bc8=String(RegExp['$1']);try{if(_0x340104(0x244)===_0x340104(0x244))_0x1500b3*=eval(_0x1b1bc8);else{const _0x2ce417=this[_0x340104(0x1ef)](_0x47d553),_0xc0476=this[_0x340104(0x2c8)](_0x465867)[_0x340104(0x3ee)];return _0xc0476<=_0x2ce417[_0x340104(0x3ee)]?_0x340104(0x341):_0x340104(0x248);}}catch(_0x5ac6ce){if(_0x340104(0x2b5)!==_0x340104(0x2b5))this['_cache']={},this[_0x340104(0x3d4)]=this[_0x340104(0x3d4)][_0x340104(0x333)](0x0,this['maxTp']()),_0x242b33[_0x340104(0x379)][_0x340104(0x2d8)][_0x340104(0x38d)](this);else{if($gameTemp['isPlaytest']())console[_0x340104(0x404)](_0x5ac6ce);}}}return _0x1500b3;}else{for(const _0x1587a4 of this[_0x340104(0x289)]()){_0x1587a4&&(_0x1587a4[_0x340104(0x29f)]='',_0x1587a4[_0x340104(0x1c3)]=![],_0x1587a4[_0x340104(0x23c)]());}this[_0x340104(0x285)]={},this[_0x340104(0x2a3)]();}};return this[_0x228487(0x1df)]()[_0x228487(0x2ae)](_0x54c2f2,_0x5c4d12);},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x3b2)]=function(_0x2affc1){const _0x1c552b=_0x1aecd6,_0x444aa8=VisuMZ[_0x1c552b(0x379)][_0x1c552b(0x3f3)],_0x307148=(_0x4e47d9,_0x414cef)=>{const _0x33e79d=_0x1c552b;if(!_0x414cef)return _0x4e47d9;const _0x1dc33d=_0x414cef[_0x33e79d(0x3a9)];if(_0x1dc33d[_0x33e79d(0x351)](_0x444aa8[_0x33e79d(0x280)][_0x2affc1])){if('nTzsF'===_0x33e79d(0x1b2)){var _0x152d5c=Number(RegExp['$1'])/0x64;_0x4e47d9+=_0x152d5c;}else return _0x35ae04[_0x33e79d(0x379)][_0x33e79d(0x34d)][_0x33e79d(0x26a)]['CmdTextAlign'];}if(_0x1dc33d['match'](_0x444aa8[_0x33e79d(0x31c)][_0x2affc1])){if('etfnK'!==_0x33e79d(0x31a)){var _0x50a94a=_0x458ae7(_0x2fa5da['$1']);_0x4e7f1c+=_0x50a94a;}else{var _0x152d5c=Number(RegExp['$1']);_0x4e47d9+=_0x152d5c;}}if(_0x1dc33d['match'](_0x444aa8[_0x33e79d(0x439)][_0x2affc1])){if(_0x33e79d(0x364)===_0x33e79d(0x1b8)){let _0x8a36be=_0x262d2b['ElementStatusCore'][_0x33e79d(0x188)][_0x33e79d(0x38d)](this);return this[_0x33e79d(0x1e9)](_0x8a36be);}else{var _0x2e2b93=String(RegExp['$1']);try{_0x33e79d(0x198)===_0x33e79d(0x198)?_0x4e47d9+=eval(_0x2e2b93):this[_0x33e79d(0x24f)]=_0x5cca85['mainFontSize']();}catch(_0x43712f){if(_0x33e79d(0x1fa)===_0x33e79d(0x3a6)){const _0x36d215=_0x33e79d(0x225)['format'](_0x51cff6);return _0x337a50[_0x33e79d(0x379)][_0x33e79d(0x34d)]['StatusMenu'][_0x36d215];}else{if($gameTemp['isPlaytest']())console[_0x33e79d(0x404)](_0x43712f);}}}}return _0x4e47d9;};return this[_0x1c552b(0x1df)]()[_0x1c552b(0x2ae)](_0x307148,0x0);},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x422)]=function(_0x1fc122){const _0x480366=_0x1aecd6,_0x45b816=VisuMZ[_0x480366(0x379)][_0x480366(0x3f3)],_0x2c9707=(_0xc55636,_0x205ba9)=>{const _0xe8f129=_0x480366;if(!_0x205ba9)return _0xc55636;const _0x202d0f=_0x205ba9[_0xe8f129(0x3a9)];if(_0x202d0f[_0xe8f129(0x351)](_0x45b816[_0xe8f129(0x3c1)][_0x1fc122])){if(_0xe8f129(0x278)===_0xe8f129(0x38b))_0x152713*=_0x27c095(_0x56cd49);else{var _0x432fbe=Number(RegExp['$1'])/0x64;_0xc55636+=_0x432fbe;}}if(_0x202d0f[_0xe8f129(0x351)](_0x45b816['EleDmgPlusFlt'][_0x1fc122])){var _0x432fbe=Number(RegExp['$1']);console[_0xe8f129(0x404)](_0x45b816[_0xe8f129(0x444)][_0x1fc122],_0x432fbe),_0xc55636+=_0x432fbe;}if(_0x202d0f['match'](_0x45b816['EleDmgPlusJS'][_0x1fc122])){var _0x5b9256=String(RegExp['$1']);try{_0xc55636+=eval(_0x5b9256);}catch(_0x27b0fc){if($gameTemp[_0xe8f129(0x245)]())console['log'](_0x27b0fc);}}return _0xc55636;};return this[_0x480366(0x1df)]()[_0x480366(0x2ae)](_0x2c9707,0x0);},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x41c)]=function(_0x26a56b){const _0x5b12e2=_0x1aecd6,_0x2660a5=VisuMZ[_0x5b12e2(0x379)][_0x5b12e2(0x3f3)],_0xc19aa8=(_0x522c97,_0x3c5ea8)=>{const _0x59a849=_0x5b12e2;if(_0x59a849(0x388)!==_0x59a849(0x388))this[_0x59a849(0x2a1)](_0x430bd5,_0xa742e5,_0x405891,this['innerHeight']-_0x106e0f);else{if(!_0x3c5ea8)return _0x522c97;const _0x91a9e3=_0x3c5ea8['note'];if(_0x91a9e3[_0x59a849(0x351)](_0x2660a5[_0x59a849(0x2f8)][_0x26a56b])){if('HmPNH'==='HmPNH'){var _0x2735c8=Number(RegExp['$1'])/0x64;_0x522c97*=_0x2735c8;}else this['_battleCoreNoElement']=![],this[_0x59a849(0x2f6)]=[],this[_0x59a849(0x2d5)]=[];}if(_0x91a9e3[_0x59a849(0x351)](_0x2660a5[_0x59a849(0x395)][_0x26a56b])){var _0x2735c8=Number(RegExp['$1']);_0x522c97*=_0x2735c8;}if(_0x91a9e3[_0x59a849(0x351)](_0x2660a5[_0x59a849(0x175)][_0x26a56b])){var _0x5b4884=String(RegExp['$1']);try{if(_0x59a849(0x358)!=='kglhS')_0x522c97*=eval(_0x5b4884);else{const _0x3ed767=_0x1768e2['x']+_0x2b4a16[_0x59a849(0x371)]((_0x51ce4e[_0x59a849(0x3ee)]-_0x2a0548)/0x2);this[_0x59a849(0x182)](_0x32862c,_0x3ed767,_0x4d9b52['y'],_0x5b5158);}}catch(_0x620462){if($gameTemp[_0x59a849(0x245)]())console[_0x59a849(0x404)](_0x620462);}}return _0x522c97;}};return this['traitObjects']()['reduce'](_0xc19aa8,0x1);},Game_BattlerBase[_0x1aecd6(0x3fc)]['getDealtElementFlat']=function(_0x543bc2){const _0x103a69=_0x1aecd6,_0x1f5474=VisuMZ[_0x103a69(0x379)][_0x103a69(0x3f3)],_0x736b60=(_0x3903ea,_0xf83f3c)=>{const _0x23b8cf=_0x103a69;if(!_0xf83f3c)return _0x3903ea;const _0x15752b=_0xf83f3c['note'];if(_0x15752b[_0x23b8cf(0x351)](_0x1f5474[_0x23b8cf(0x19b)][_0x543bc2])){if(_0x23b8cf(0x2cd)!=='VzIJI'){var _0x35d4d8=Number(RegExp['$1'])/0x64;_0x3903ea+=_0x35d4d8;}else return _0x160084[_0x23b8cf(0x1ad)](_0x12fc9f[_0x23b8cf(0x1c4)](_0x7f33b6));}if(_0x15752b[_0x23b8cf(0x351)](_0x1f5474[_0x23b8cf(0x33f)][_0x543bc2])){if(_0x23b8cf(0x2dc)!=='jPHnU'){const _0x2c1f99=_0xec3264['parse']('['+_0x208565['$1'][_0x23b8cf(0x351)](/\d+/g)+']');_0x7b7875=_0x3aee44[_0x23b8cf(0x43e)](_0x2c1f99);}else{var _0x35d4d8=Number(RegExp['$1']);_0x3903ea+=_0x35d4d8;}}if(_0x15752b[_0x23b8cf(0x351)](_0x1f5474[_0x23b8cf(0x3d5)][_0x543bc2])){var _0x3a8292=String(RegExp['$1']);try{_0x3903ea+=eval(_0x3a8292);}catch(_0x5acc2a){if($gameTemp['isPlaytest']())console['log'](_0x5acc2a);}}return _0x3903ea;};return this[_0x103a69(0x1df)]()[_0x103a69(0x2ae)](_0x736b60,0x0);},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x3c3)]=function(){const _0x533daa=_0x1aecd6;let _0x5f44e4=[];for(const _0x4b6062 of this[_0x533daa(0x1df)]()){if(!_0x4b6062)continue;const _0x5684dd=_0x4b6062['note'][_0x533daa(0x351)](/<ELEMENT ABSORB:[ ](.*)>/gi);if(_0x5684dd)for(const _0x208a5e of _0x5684dd){_0x208a5e[_0x533daa(0x351)](/<ELEMENT ABSORB:[ ](.*)>/i);const _0x28bf78=RegExp['$1'];if(_0x28bf78[_0x533daa(0x351)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x22d522=JSON['parse']('['+RegExp['$1'][_0x533daa(0x351)](/\d+/g)+']');_0x5f44e4=_0x5f44e4['concat'](_0x22d522);}else{const _0x2d28e8=_0x28bf78[_0x533daa(0x178)](',');for(const _0x2949ce of _0x2d28e8){const _0x2c039e=DataManager['getElementIdWithName'](_0x2949ce);if(_0x2c039e)_0x5f44e4['push'](_0x2c039e);}}}}return _0x5f44e4;},Game_BattlerBase['prototype'][_0x1aecd6(0x44b)]=function(){const _0x47d692=_0x1aecd6;let _0x3b5d65=[];for(const _0xbfda02 of this[_0x47d692(0x1df)]()){if(!_0xbfda02)continue;const _0x292d57=_0xbfda02[_0x47d692(0x3a9)][_0x47d692(0x351)](/<ELEMENT REFLECT:[ ](.*)>/gi);if(_0x292d57){if(_0x47d692(0x27a)!=='Rcgdo')for(const _0x4f9458 of _0x292d57){_0x4f9458[_0x47d692(0x351)](/<ELEMENT REFLECT:[ ](.*)>/i);const _0x3af620=RegExp['$1'];if(_0x3af620[_0x47d692(0x351)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x134454=JSON[_0x47d692(0x313)]('['+RegExp['$1'][_0x47d692(0x351)](/\d+/g)+']');_0x3b5d65=_0x3b5d65[_0x47d692(0x43e)](_0x134454);}else{const _0x4004d9=_0x3af620[_0x47d692(0x178)](',');for(const _0x1ffd97 of _0x4004d9){if(_0x47d692(0x1e3)!==_0x47d692(0x1e3))return this[_0x47d692(0x291)][_0x5e53b6][_0x47d692(0x1d4)];else{const _0x1c1be2=DataManager['getElementIdWithName'](_0x1ffd97);if(_0x1c1be2)_0x3b5d65[_0x47d692(0x355)](_0x1c1be2);}}}}else{if(!_0x2e6687[_0x47d692(0x1f3)]())return[];this[_0x47d692(0x377)]=!![],this[_0x47d692(0x252)][_0x47d692(0x17b)]=this[_0x47d692(0x252)][_0x47d692(0x17b)]||[];const _0x5afa23=this[_0x47d692(0x22e)]();for(const _0x3a1cdb of _0x5afa23){const _0x3adff9=this['getTraitSet'](_0x3a1cdb),_0x26c01b=_0x5babca[_0x47d692(0x3e4)](_0x3a1cdb,_0x3adff9);this[_0x47d692(0x252)][_0x47d692(0x17b)]=this[_0x47d692(0x252)][_0x47d692(0x17b)][_0x47d692(0x43e)](_0x26c01b['PassiveStates']);}this['_addingPassiveStateTraitSets']=_0x3dd737;}}}return _0x3b5d65;},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x424)]=function(){const _0x95daa7=_0x1aecd6;let _0x4cbee2=[];for(const _0x3e8603 of this['traitObjects']()){if(!_0x3e8603)continue;const _0x2d4ff8=_0x3e8603[_0x95daa7(0x3a9)][_0x95daa7(0x351)](/<ELEMENT PIERCE:[ ](.*)>/gi);if(_0x2d4ff8)for(const _0x5c693b of _0x2d4ff8){if('UYCme'==='pzKFv'){const _0x8265d=_0x5f0965-_0x3f0613[_0x95daa7(0x3ee)];_0x22f960+=_0x8265d/0x2;if(_0x8265d<0x0)_0x3a3f51-=_0x8265d;_0x5ead75=(_0x3a740a||_0x5b7b58[_0x95daa7(0x3e1)])-0x2,_0x56da8c=(_0x4cf6e4||_0x5c65d4['faceHeight'])-0x2;const _0x5ca861=_0x1f7ccf[_0x95daa7(0x3ee)],_0x1f0223=_0x103ef4[_0x95daa7(0x217)],_0x3dc413=_0x524907,_0x5ab0ca=_0x21c9f2-0x2,_0x340758=_0x3968d8+_0xafb071[_0x95daa7(0x371)](_0x3dc413/0x2),_0x3b2e81=_0x3aca2f+_0x593d00[_0x95daa7(0x1de)]((_0x49819f+_0x1f0223)/0x2),_0x1ee36f=_0xb67e50['min'](_0x4d44f3,_0x5ca861),_0x80523b=_0x6681bf[_0x95daa7(0x346)](_0x4da0b0,_0x1f0223),_0x48da7f=_0x3cecac+0x1,_0x55e239=_0x175cc6[_0x95daa7(0x32e)](_0x3ff801+0x1,_0x17c933+_0x5ab0ca-_0x1f0223+0x3),_0x129848=(_0x5ca861-_0x1ee36f)/0x2,_0x19b083=(_0x1f0223-_0x80523b)/0x2;this[_0x95daa7(0x1f0)][_0x95daa7(0x41d)](_0x1608ed,_0x129848,_0x19b083,_0x1ee36f,_0x80523b,_0x48da7f,_0x55e239);}else{_0x5c693b[_0x95daa7(0x351)](/<ELEMENT PIERCE:[ ](.*)>/i);const _0x867c4b=RegExp['$1'];if(_0x867c4b['match'](/(\d+(?:\s*,\s*\d+)*)/i)){if(_0x95daa7(0x2e8)==='UALeG'){const _0x52e9a5=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');_0x4cbee2=_0x4cbee2[_0x95daa7(0x43e)](_0x52e9a5);}else{let _0x3338e2=_0x4f63aa[_0x95daa7(0x379)][_0x95daa7(0x1e1)][_0x95daa7(0x38d)](this,_0x44bb04);if(!this[_0x95daa7(0x345)]()['damage'][_0x95daa7(0x320)])return _0x3338e2;if(_0x3cb4c2['VisuMZ_1_BattleCore']){const _0x1b955c=this['item']()[_0x95daa7(0x3a9)]||'';if(_0x1b955c[_0x95daa7(0x351)](/<ALWAYS CRITICAL>/i))return 0x1;}return _0x3338e2*=this[_0x95daa7(0x1c1)](_0x2cd9ef),_0x3338e2*=this[_0x95daa7(0x2bb)]()['traitCriticalRateMultipliersVs'](_0x1991f4),_0x3338e2+=this['traitCriticalPlusMultipliersVs'](_0x5196dc),_0x3338e2+=this[_0x95daa7(0x2bb)]()[_0x95daa7(0x1ab)](_0x32447a),_0x3338e2;}}else{const _0x5e98e1=_0x867c4b['split'](',');for(const _0x37123b of _0x5e98e1){if('GOVgU'===_0x95daa7(0x420)){const _0x2bd199=_0x3dc731[_0x95daa7(0x348)]()[_0x95daa7(0x173)]();for(const _0x58de11 in _0x3fb23b[_0x95daa7(0x291)][_0x2bd199]){const _0x25fe2b=_0x95daa7(0x2a0)[_0x95daa7(0x411)](_0x2bd199,_0x58de11);_0x176044[_0x95daa7(0x379)][_0x95daa7(0x3f3)][_0x25fe2b]=new _0x4aad5f(_0x1d93b7[_0x95daa7(0x411)](_0x58de11),'i');const _0xc1efb7=_0x95daa7(0x27f)[_0x95daa7(0x411)](_0x2bd199,_0x58de11);_0x3ff042[_0x95daa7(0x379)]['RegExp'][_0xc1efb7]=new _0x5a7678(_0x549231[_0x95daa7(0x411)](_0x58de11),'i');const _0x1c6dee=_0x95daa7(0x33a)['format'](_0x2bd199,_0x58de11);_0x3d7425['ElementStatusCore'][_0x95daa7(0x3f3)][_0x1c6dee]=new _0x2976ac(_0xbf9de7[_0x95daa7(0x411)](_0x58de11),'i');const _0x522421=_0x95daa7(0x1f9)[_0x95daa7(0x411)](_0x2bd199,_0x58de11);_0x2740ac[_0x95daa7(0x379)]['RegExp'][_0x522421]=new _0x2baaa5(_0x375908[_0x95daa7(0x411)](_0x58de11),'i');const _0x3027df=_0x95daa7(0x21a)[_0x95daa7(0x411)](_0x2bd199,_0x58de11);_0x481239[_0x95daa7(0x379)][_0x95daa7(0x3f3)][_0x3027df]=new _0x46727a(_0x4ceebb[_0x95daa7(0x411)](_0x58de11),'i');const _0x2e59b2=_0x95daa7(0x26b)[_0x95daa7(0x411)](_0x2bd199,_0x58de11);_0x48bafd['ElementStatusCore']['RegExp'][_0x2e59b2]=new _0x1392af(_0x445276[_0x95daa7(0x411)](_0x58de11),'i');}}else{const _0x1cd68b=DataManager[_0x95daa7(0x1c6)](_0x37123b);if(_0x1cd68b)_0x4cbee2[_0x95daa7(0x355)](_0x1cd68b);}}}}}}return _0x4cbee2;},Game_BattlerBase[_0x1aecd6(0x3fc)]['isElementNull']=function(){const _0x24528a=_0x1aecd6;for(const _0x162b16 of this[_0x24528a(0x1df)]()){if(_0x24528a(0x3f5)===_0x24528a(0x43b))return 0x1;else{if(!_0x162b16)continue;if(_0x162b16[_0x24528a(0x3a9)][_0x24528a(0x351)](/<FORCE ACTION ELEMENT:[ ]NULL>/i))return!![];}}return![];},Game_BattlerBase[_0x1aecd6(0x3fc)]['getForcedActionElement']=function(){const _0x380f57=_0x1aecd6;for(const _0x2cc7a6 of this['traitObjects']()){if(_0x380f57(0x216)!==_0x380f57(0x216)){var _0x1b0f9b=_0x213425(_0x2a38cf['$1']);_0x55531b+=_0x1b0f9b;}else{if(!_0x2cc7a6)continue;if(_0x2cc7a6[_0x380f57(0x3a9)][_0x380f57(0x351)](/<FORCE ACTION ELEMENT:[ ](.*)>/i)){if('lmzBJ'!=='JHKMt'){const _0x5cdccd=RegExp['$1'];if(_0x5cdccd['match'](/(\d+(?:\s*,\s*\d+)*)/i))return JSON['parse']('['+RegExp['$1'][_0x380f57(0x351)](/\d+/g)+']');else{const _0x536423=_0x5cdccd['split'](',');let _0x21dbc3=[];for(const _0x394109 of _0x536423){const _0x79eda0=DataManager[_0x380f57(0x1c6)](_0x394109);if(_0x79eda0)_0x21dbc3[_0x380f57(0x355)](_0x79eda0);}return _0x21dbc3;}}else{let _0x448913=_0x4144ed[_0x380f57(0x379)][_0x380f57(0x209)][_0x380f57(0x38d)](this);return this[_0x380f57(0x44f)](_0x448913);}}}}return[];},VisuMZ[_0x1aecd6(0x379)][_0x1aecd6(0x246)]=Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x2e7)],Game_BattlerBase[_0x1aecd6(0x3fc)]['paramRate']=function(_0x1493e9){const _0x41be26=_0x1aecd6;let _0x357b06=VisuMZ['ElementStatusCore'][_0x41be26(0x246)][_0x41be26(0x38d)](this,_0x1493e9);return this['paramRateTraitSets'](_0x1493e9,_0x357b06);},Game_BattlerBase['prototype']['paramRateTraitSets']=function(_0x268e76,_0x237195){const _0x2f6079=_0x1aecd6;if(!DataManager[_0x2f6079(0x1f3)]())return _0x237195;const _0xa71e=this[_0x2f6079(0x22e)](),_0x17f654=_0x2f6079(0x1c5)['format'](_0x268e76);for(const _0x450850 of _0xa71e){const _0x29201f=this[_0x2f6079(0x318)](_0x450850),_0x4e4452=DataManager['traitSet'](_0x450850,_0x29201f);_0x237195*=_0x4e4452[_0x2f6079(0x390)][_0x17f654]??0x1;}return _0x237195;},VisuMZ[_0x1aecd6(0x379)]['Game_BattlerBase_xparam']=Game_BattlerBase[_0x1aecd6(0x3fc)]['xparam'],Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x35f)]=function(_0x198059){const _0x554d75=_0x1aecd6;let _0x43cff7=VisuMZ[_0x554d75(0x379)][_0x554d75(0x18f)][_0x554d75(0x38d)](this,_0x198059);if(Imported['VisuMZ_0_CoreEngine'])return _0x43cff7;return this['xparamRateTraitSets'](_0x198059,_0x43cff7);},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x3a0)]=function(_0x5767ab,_0x14570f){const _0x36f5ef=_0x1aecd6;if(!DataManager[_0x36f5ef(0x1f3)]())return _0x14570f;const _0x514374=this[_0x36f5ef(0x22e)](),_0x20109f=_0x36f5ef(0x264)[_0x36f5ef(0x411)](_0x5767ab);for(const _0x47c7a6 of _0x514374){const _0x30be6e=this['getTraitSet'](_0x47c7a6),_0x129e80=DataManager[_0x36f5ef(0x3e4)](_0x47c7a6,_0x30be6e);_0x14570f+=_0x129e80[_0x36f5ef(0x2f2)][_0x20109f]||0x0;}return _0x14570f;},VisuMZ[_0x1aecd6(0x379)]['Game_BattlerBase_sparam']=Game_BattlerBase['prototype']['sparam'],Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x34e)]=function(_0x203aab){const _0x4a51d1=_0x1aecd6;let _0x270252=VisuMZ[_0x4a51d1(0x379)]['Game_BattlerBase_sparam'][_0x4a51d1(0x38d)](this,_0x203aab);if(Imported['VisuMZ_0_CoreEngine'])return _0x270252;return this['sparamRateTraitSets'](_0x203aab,_0x270252);},Game_BattlerBase['prototype']['sparamRateTraitSets']=function(_0x11fd5a,_0x187614){const _0xf99f12=_0x1aecd6;if(!DataManager[_0xf99f12(0x1f3)]())return _0x187614;const _0xdc8d72=this[_0xf99f12(0x22e)](),_0x41e0d0=_0xf99f12(0x38a)[_0xf99f12(0x411)](_0x11fd5a);for(const _0x2d6133 of _0xdc8d72){const _0x1a2478=this[_0xf99f12(0x318)](_0x2d6133),_0x47ca04=DataManager[_0xf99f12(0x3e4)](_0x2d6133,_0x1a2478);_0x187614*=_0x47ca04[_0xf99f12(0x27d)][_0x41e0d0]??0x1;}return _0x187614;};Imported[_0x1aecd6(0x1b1)]&&(VisuMZ[_0x1aecd6(0x379)]['Game_BattlerBase_xparamPlus']=Game_BattlerBase['prototype'][_0x1aecd6(0x174)],Game_BattlerBase[_0x1aecd6(0x3fc)]['xparamPlus']=function(_0x3379af){const _0x3a09fe=_0x1aecd6;let _0x5bc7b6=VisuMZ['ElementStatusCore'][_0x3a09fe(0x2e0)][_0x3a09fe(0x38d)](this,_0x3379af);return _0x5bc7b6=this['xparamRateTraitSets'](_0x3379af,_0x5bc7b6),_0x5bc7b6;},VisuMZ[_0x1aecd6(0x379)][_0x1aecd6(0x1c7)]=Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x3eb)],Game_BattlerBase['prototype']['sparamRate']=function(_0x58c6e8){const _0x565691=_0x1aecd6;let _0x1271d6=VisuMZ[_0x565691(0x379)][_0x565691(0x1c7)][_0x565691(0x38d)](this,_0x58c6e8);return _0x1271d6=this['sparamRateTraitSets'](_0x58c6e8,_0x1271d6),_0x1271d6;});;Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x1bf)]=function(_0x5882ec){const _0x4dd0dd=_0x1aecd6,_0xfe96b9=_0x4dd0dd(0x429);if(this[_0x4dd0dd(0x19c)](_0xfe96b9))return this[_0x4dd0dd(0x252)][_0xfe96b9][_0x4dd0dd(0x3c8)](_0x5882ec);return this['_cache'][_0xfe96b9]=this[_0x4dd0dd(0x338)](Game_BattlerBase[_0x4dd0dd(0x413)]),this['_cache'][_0xfe96b9]=this[_0x4dd0dd(0x252)][_0xfe96b9]['concat'](this[_0x4dd0dd(0x3a8)]()),this[_0x4dd0dd(0x252)][_0xfe96b9][_0x4dd0dd(0x3c8)](_0x5882ec);},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x3a8)]=function(){const _0x509c56=_0x1aecd6;if(!DataManager[_0x509c56(0x1f3)]())return[];let _0x3c96f5=[];const _0x38efac=this['getTraitSetKeys']();for(const _0xcd3255 of _0x38efac){const _0x524777=this[_0x509c56(0x318)](_0xcd3255),_0x18b8b6=DataManager[_0x509c56(0x3e4)](_0xcd3255,_0x524777);_0x3c96f5=_0x3c96f5[_0x509c56(0x43e)](_0x18b8b6[_0x509c56(0x1f5)]);}return _0x3c96f5;},Game_BattlerBase[_0x1aecd6(0x3fc)][_0x1aecd6(0x30b)]=function(_0x19a996){const _0x2a2179=_0x1aecd6,_0x2c0721='AtypeOk';if(this[_0x2a2179(0x19c)](_0x2c0721))return this[_0x2a2179(0x252)][_0x2c0721][_0x2a2179(0x3c8)](_0x19a996);return this['_cache'][_0x2c0721]=this[_0x2a2179(0x338)](Game_BattlerBase[_0x2a2179(0x1fc)]),this[_0x2a2179(0x252)][_0x2c0721]=this[_0x2a2179(0x252)][_0x2c0721][_0x2a2179(0x43e)](this[_0x2a2179(0x1d7)]()),this[_0x2a2179(0x252)][_0x2c0721][_0x2a2179(0x3c8)](_0x19a996);},Game_BattlerBase[_0x1aecd6(0x3fc)]['atypeOkTraitSets']=function(){const _0x1c2acf=_0x1aecd6;if(!DataManager[_0x1c2acf(0x1f3)]())return[];let _0x4d31da=[];const _0x25efe0=this[_0x1c2acf(0x22e)]();for(const _0x40715f of _0x25efe0){const _0x54e880=this[_0x1c2acf(0x318)](_0x40715f),_0x42e053=DataManager[_0x1c2acf(0x3e4)](_0x40715f,_0x54e880);_0x4d31da=_0x4d31da[_0x1c2acf(0x43e)](_0x42e053[_0x1c2acf(0x367)]);}return _0x4d31da;},Game_BattlerBase[_0x1aecd6(0x3fc)]['addPassiveStatesTraitSets']=function(){const _0x288a8e=_0x1aecd6;if(!DataManager[_0x288a8e(0x1f3)]())return[];this[_0x288a8e(0x377)]=!![],this['_cache'][_0x288a8e(0x17b)]=this['_cache'][_0x288a8e(0x17b)]||[];const _0x1b7308=this[_0x288a8e(0x22e)]();for(const _0x32f09d of _0x1b7308){const _0x103b2f=this[_0x288a8e(0x318)](_0x32f09d),_0x169213=DataManager[_0x288a8e(0x3e4)](_0x32f09d,_0x103b2f);this[_0x288a8e(0x252)][_0x288a8e(0x17b)]=this[_0x288a8e(0x252)][_0x288a8e(0x17b)][_0x288a8e(0x43e)](_0x169213[_0x288a8e(0x386)]);}this['_addingPassiveStateTraitSets']=undefined;},Game_Actor[_0x1aecd6(0x3fc)]['getTraitSetObject']=function(){const _0x1c7a4c=_0x1aecd6;return this[_0x1c7a4c(0x1a5)]();},VisuMZ['ElementStatusCore'][_0x1aecd6(0x359)]=Game_Actor[_0x1aecd6(0x3fc)][_0x1aecd6(0x3ea)],Game_Actor[_0x1aecd6(0x3fc)][_0x1aecd6(0x3ea)]=function(_0xab7455){const _0x10897d=_0x1aecd6;VisuMZ[_0x10897d(0x379)][_0x10897d(0x359)][_0x10897d(0x38d)](this,_0xab7455),this['initElementStatusCore'](),this[_0x10897d(0x197)]();},Game_Actor[_0x1aecd6(0x3fc)]['initElementStatusCore']=function(){const _0x26cc45=_0x1aecd6;Game_Battler[_0x26cc45(0x3fc)]['initElementStatusCore'][_0x26cc45(0x38d)](this),this[_0x26cc45(0x20e)]();},Game_Actor[_0x1aecd6(0x3fc)][_0x1aecd6(0x312)]=function(){const _0x497358=_0x1aecd6;if(this[_0x497358(0x1a5)]()[_0x497358(0x3a9)][_0x497358(0x351)](/<NO RANDOM TRAIT SETS>/i))return;const _0x5a21c0=this[_0x497358(0x22e)](),_0x51f1ec=VisuMZ[_0x497358(0x379)][_0x497358(0x34d)];for(const _0x1da905 of _0x5a21c0){_0x51f1ec['RandomizeActor']&&this['createRandomTraitSet'](_0x1da905);}},Game_Actor[_0x1aecd6(0x3fc)]['initBiography']=function(){const _0x265b50=_0x1aecd6;this[_0x265b50(0x3b1)]=this[_0x265b50(0x2d6)](),this['actor']()[_0x265b50(0x3a9)][_0x265b50(0x351)](/<BIOGRAPHY>\s*([\s\S]*)\s*<\/BIOGRAPHY>/i)&&this[_0x265b50(0x2c2)](RegExp['$1']);},Game_Actor[_0x1aecd6(0x3fc)]['getBiography']=function(){const _0x187519=_0x1aecd6;if(this['_biography']===undefined)this[_0x187519(0x20e)]();return this[_0x187519(0x3b1)];},Game_Actor[_0x1aecd6(0x3fc)]['setBiography']=function(_0x43f25e){const _0x25b63a=_0x1aecd6;if(this['_biography']===undefined)this[_0x25b63a(0x20e)]();this['_biography']=_0x43f25e;},Game_Actor[_0x1aecd6(0x3fc)][_0x1aecd6(0x3fa)]=function(){const _0x52a24d=_0x1aecd6,_0x53fee7=this[_0x52a24d(0x338)](Game_BattlerBase[_0x52a24d(0x413)])['sort']((_0x3a1429,_0x17f267)=>_0x3a1429-_0x17f267);return _0x53fee7[_0x52a24d(0x42f)]((_0x3caf16,_0x576e68,_0x48964d)=>_0x48964d[_0x52a24d(0x1c4)](_0x3caf16)===_0x576e68);},Game_Actor[_0x1aecd6(0x3fc)][_0x1aecd6(0x275)]=function(){const _0x2736a3=_0x1aecd6,_0x49d392=this['traitsSet'](Game_BattlerBase['TRAIT_EQUIP_ATYPE'])[_0x2736a3(0x21c)]((_0x467d33,_0x20f093)=>_0x467d33-_0x20f093);return _0x49d392['filter']((_0x2aa83f,_0x2d9a5f,_0xb93442)=>_0xb93442[_0x2736a3(0x1c4)](_0x2aa83f)===_0x2d9a5f);},Game_Enemy[_0x1aecd6(0x3fc)]['getTraitSetObject']=function(){const _0x4875c0=_0x1aecd6;return this[_0x4875c0(0x251)]();},VisuMZ['ElementStatusCore'][_0x1aecd6(0x27e)]=Game_Enemy[_0x1aecd6(0x3fc)][_0x1aecd6(0x3ea)],Game_Enemy[_0x1aecd6(0x3fc)]['setup']=function(_0x2a2e3b,_0x46a251,_0x1d015b){const _0xa113ce=_0x1aecd6;VisuMZ[_0xa113ce(0x379)][_0xa113ce(0x27e)][_0xa113ce(0x38d)](this,_0x2a2e3b,_0x46a251,_0x1d015b),!Imported[_0xa113ce(0x2a8)]&&this[_0xa113ce(0x1f8)](),this[_0xa113ce(0x1ec)](),this[_0xa113ce(0x197)]();},Game_Enemy[_0x1aecd6(0x3fc)][_0x1aecd6(0x1f8)]=function(){const _0x27d11d=_0x1aecd6;Game_Battler[_0x27d11d(0x3fc)]['initElementStatusCore'][_0x27d11d(0x38d)](this),this[_0x27d11d(0x273)]();},Game_Enemy[_0x1aecd6(0x3fc)][_0x1aecd6(0x312)]=function(){const _0x5df924=_0x1aecd6;if(this['enemy']()[_0x5df924(0x3a9)][_0x5df924(0x351)](/<NO RANDOM TRAIT SETS>/i))return;const _0x289328=this['getTraitSetKeys'](),_0x16e585=VisuMZ[_0x5df924(0x379)][_0x5df924(0x34d)];for(const _0x364406 of _0x289328){_0x16e585[_0x364406][_0x5df924(0x23b)]&&this['createRandomTraitSet'](_0x364406);}},VisuMZ['ElementStatusCore'][_0x1aecd6(0x369)]=Game_Enemy['prototype'][_0x1aecd6(0x38c)],Game_Enemy[_0x1aecd6(0x3fc)][_0x1aecd6(0x38c)]=function(){const _0x312652=_0x1aecd6;if(DataManager[_0x312652(0x1f3)]()){if(_0x312652(0x1ca)==='sagkW')return this[_0x312652(0x450)]();else{_0x40a86c[_0x312652(0x351)](/<ELEMENT ABSORB:[ ](.*)>/i);const _0x32aba8=_0x57bd48['$1'];if(_0x32aba8[_0x312652(0x351)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x175cef=_0x5db94d[_0x312652(0x313)]('['+_0x1e9f71['$1'][_0x312652(0x351)](/\d+/g)+']');_0x640fbd=_0x1f5c61[_0x312652(0x43e)](_0x175cef);}else{const _0x2ecc76=_0x32aba8[_0x312652(0x178)](',');for(const _0x16ad0d of _0x2ecc76){const _0x37d215=_0x10e668[_0x312652(0x1c6)](_0x16ad0d);if(_0x37d215)_0x1ec937['push'](_0x37d215);}}}}else{if('EKPkq'===_0x312652(0x189))return VisuMZ[_0x312652(0x379)][_0x312652(0x369)][_0x312652(0x38d)](this);else{const _0x131303=this[_0x312652(0x17e)];_0x131303['contents'][_0x312652(0x28e)]();const _0xc7d1a3=this[_0x312652(0x187)](this['index']());if(_0xc7d1a3===_0x312652(0x248)){const _0x59edfb=this[_0x312652(0x1ef)](this[_0x312652(0x39c)]());let _0x4ae8eb=this['commandName'](this['index']());_0x4ae8eb=_0x4ae8eb[_0x312652(0x308)](/\\I\[(\d+)\]/gi,''),_0x131303[_0x312652(0x1fe)](),this[_0x312652(0x2c1)](_0x4ae8eb,_0x59edfb),this[_0x312652(0x40c)](_0x4ae8eb,_0x59edfb),this[_0x312652(0x3ef)](_0x4ae8eb,_0x59edfb);}}}},Game_Enemy[_0x1aecd6(0x3fc)][_0x1aecd6(0x450)]=function(){const _0xbe138e=_0x1aecd6,_0x1b0f6b=_0xbe138e(0x38c);if(this[_0xbe138e(0x19c)](_0x1b0f6b))return this[_0xbe138e(0x252)][_0x1b0f6b];const _0xe51a9b=this[_0xbe138e(0x3cd)]();return _0xe51a9b[_0xbe138e(0x411)](this[_0xbe138e(0x3e4)](_0xbe138e(0x3f2))[_0xbe138e(0x2b2)]||'',this[_0xbe138e(0x3e4)]('SubElement')['FmtText']||'',this[_0xbe138e(0x3e4)]('Gender')[_0xbe138e(0x2b2)]||'',this[_0xbe138e(0x3e4)](_0xbe138e(0x352))['FmtText']||'',this['traitSet'](_0xbe138e(0x1b3))[_0xbe138e(0x2b2)]||'',this[_0xbe138e(0x3e4)](_0xbe138e(0x233))[_0xbe138e(0x2b2)]||'',this[_0xbe138e(0x3e4)](_0xbe138e(0x2cc))[_0xbe138e(0x2b2)]||'',this[_0xbe138e(0x3e4)](_0xbe138e(0x218))['FmtText']||'',this[_0xbe138e(0x3e4)](_0xbe138e(0x3a2))[_0xbe138e(0x2b2)]||'',this[_0xbe138e(0x3e4)]('Variant')[_0xbe138e(0x2b2)]||'',this['originalName'](),this[_0xbe138e(0x1c3)]?this[_0xbe138e(0x29f)]:'')[_0xbe138e(0x308)](/[\s\n\r]+/g,'\x20')[_0xbe138e(0x173)]();},Game_Enemy['prototype'][_0x1aecd6(0x3cd)]=function(){const _0x346fc0=_0x1aecd6;let _0xf36954=VisuMZ[_0x346fc0(0x379)][_0x346fc0(0x34d)][_0x346fc0(0x1fd)][_0x346fc0(0x415)];if(this['enemy']()[_0x346fc0(0x3a9)][_0x346fc0(0x351)](/<TRAIT SET NAME FORMAT>\s*([\s\S]*)\s*<\/TRAIT SET NAME FORMAT>/i)){if(_0x346fc0(0x2af)==='LOFXC')_0xf36954=String(RegExp['$1']);else{let _0x19382d=0x1;if(!_0x290b01)return _0x19382d;const _0x225722=/<DAMAGE VS (.*) TRAIT:[ ](\d+)([%％])>/gi,_0x3d406b=this['traitObjects']();for(const _0x3af081 of _0x3d406b){_0x19382d*=_0x17d642[_0x346fc0(0x379)][_0x346fc0(0x1c8)](_0x1423a0,_0x3af081,_0x225722);}return _0x19382d;}}return _0xf36954=_0xf36954[_0x346fc0(0x308)](/\[ELEMENT\]/gi,'%1'),_0xf36954=_0xf36954[_0x346fc0(0x308)](/\[SUBELEMENT\]/gi,'%2'),_0xf36954=_0xf36954[_0x346fc0(0x308)](/\[GENDER\]/gi,'%3'),_0xf36954=_0xf36954[_0x346fc0(0x308)](/\[RACE\]/gi,'%4'),_0xf36954=_0xf36954['replace'](/\[NATURE\]/gi,'%5'),_0xf36954=_0xf36954[_0x346fc0(0x308)](/\[ALIGNMENT\]/gi,'%6'),_0xf36954=_0xf36954['replace'](/\[BLESSING\]/gi,'%7'),_0xf36954=_0xf36954['replace'](/\[CURSE\]/gi,'%8'),_0xf36954=_0xf36954[_0x346fc0(0x308)](/\[ZODIAC\]/gi,'%9'),_0xf36954=_0xf36954[_0x346fc0(0x308)](/\[VARIANT\]/gi,_0x346fc0(0x18e)),_0xf36954=_0xf36954[_0x346fc0(0x308)](/\[NAME\]/gi,_0x346fc0(0x394)),_0xf36954=_0xf36954['replace'](/\[LETTER\]/gi,_0x346fc0(0x40b)),_0xf36954;},VisuMZ[_0x1aecd6(0x379)][_0x1aecd6(0x3aa)]=Game_Enemy[_0x1aecd6(0x3fc)]['setLetter'],Game_Enemy[_0x1aecd6(0x3fc)][_0x1aecd6(0x229)]=function(_0x9c65a3){const _0x241427=_0x1aecd6;this[_0x241427(0x252)]={},VisuMZ[_0x241427(0x379)][_0x241427(0x3aa)][_0x241427(0x38d)](this,_0x9c65a3);},VisuMZ[_0x1aecd6(0x379)][_0x1aecd6(0x176)]=Game_Enemy['prototype'][_0x1aecd6(0x220)],Game_Enemy[_0x1aecd6(0x3fc)][_0x1aecd6(0x220)]=function(_0x4bc84d){const _0x38d5b0=_0x1aecd6;this[_0x38d5b0(0x252)]={},VisuMZ[_0x38d5b0(0x379)][_0x38d5b0(0x176)][_0x38d5b0(0x38d)](this,_0x4bc84d);},VisuMZ[_0x1aecd6(0x379)][_0x1aecd6(0x1dd)]=Game_Enemy[_0x1aecd6(0x3fc)][_0x1aecd6(0x219)],Game_Enemy[_0x1aecd6(0x3fc)][_0x1aecd6(0x219)]=function(){const _0x2a99f2=_0x1aecd6;let _0x57e07e=VisuMZ[_0x2a99f2(0x379)][_0x2a99f2(0x1dd)][_0x2a99f2(0x38d)](this);return this[_0x2a99f2(0x2db)](_0x57e07e);},VisuMZ[_0x1aecd6(0x379)]['Game_Enemy_gold']=Game_Enemy['prototype'][_0x1aecd6(0x329)],Game_Enemy[_0x1aecd6(0x3fc)]['gold']=function(){const _0x5ed634=_0x1aecd6;let _0x588bf6=VisuMZ[_0x5ed634(0x379)][_0x5ed634(0x188)]['call'](this);return this[_0x5ed634(0x1e9)](_0x588bf6);},VisuMZ['ElementStatusCore'][_0x1aecd6(0x209)]=Game_Enemy[_0x1aecd6(0x3fc)]['dropItemRate'],Game_Enemy[_0x1aecd6(0x3fc)]['dropItemRate']=function(){const _0x59b03f=_0x1aecd6;let _0x4f8f16=VisuMZ[_0x59b03f(0x379)][_0x59b03f(0x209)][_0x59b03f(0x38d)](this);return this[_0x59b03f(0x44f)](_0x4f8f16);},Game_Enemy[_0x1aecd6(0x3fc)]['expTraitSets']=function(_0x501bdb){const _0x21c2aa=_0x1aecd6;if(!DataManager[_0x21c2aa(0x1f3)]())return _0x501bdb;const _0x6c4b62=this[_0x21c2aa(0x22e)]();for(const _0x1f3bc0 of _0x6c4b62){const _0x42f388=this[_0x21c2aa(0x318)](_0x1f3bc0),_0x2b42b2=DataManager[_0x21c2aa(0x3e4)](_0x1f3bc0,_0x42f388);_0x501bdb*=_0x2b42b2[_0x21c2aa(0x36d)]!==undefined?_0x2b42b2[_0x21c2aa(0x36d)]:0x1;}return Math[_0x21c2aa(0x309)](_0x501bdb);},Game_Enemy[_0x1aecd6(0x3fc)][_0x1aecd6(0x1e9)]=function(_0xf8dfb){const _0x55558f=_0x1aecd6;if(!DataManager[_0x55558f(0x1f3)]())return _0xf8dfb;const _0x57ac50=this[_0x55558f(0x22e)]();for(const _0x4270af of _0x57ac50){const _0x721fbe=this[_0x55558f(0x318)](_0x4270af),_0x5e1406=DataManager[_0x55558f(0x3e4)](_0x4270af,_0x721fbe);_0xf8dfb*=_0x5e1406['GoldRate']!==undefined?_0x5e1406[_0x55558f(0x255)]:0x1;}return Math[_0x55558f(0x309)](_0xf8dfb);},Game_Enemy[_0x1aecd6(0x3fc)][_0x1aecd6(0x44f)]=function(_0xb54b55){const _0x392f90=_0x1aecd6;if(!DataManager[_0x392f90(0x1f3)]())return _0xb54b55;const _0x27bb3a=this[_0x392f90(0x22e)]();for(const _0x5ec1cb of _0x27bb3a){if(_0x392f90(0x1eb)==='dwLkU'){const _0x30e282=_0x41ba66['note'],_0x49693e={'Element':/<RANDOM ELEMENT>\s*([\s\S]*)\s*<\/RANDOM ELEMENT>/i,'SubElement':/<RANDOM SUBELEMENT>\s*([\s\S]*)\s*<\/RANDOM SUBELEMENT>/i,'Gender':/<RANDOM GENDER>\s*([\s\S]*)\s*<\/RANDOM GENDER>/i,'Race':/<RANDOM RACE>\s*([\s\S]*)\s*<\/RANDOM RACE>/i,'Nature':/<RANDOM NATURE>\s*([\s\S]*)\s*<\/RANDOM NATURE>/i,'Alignment':/<RANDOM ALIGNMENT>\s*([\s\S]*)\s*<\/RANDOM ALIGNMENT>/i,'Blessing':/<RANDOM BLESSING>\s*([\s\S]*)\s*<\/RANDOM BLESSING>/i,'Curse':/<RANDOM CURSE>\s*([\s\S]*)\s*<\/RANDOM CURSE>/i,'Zodiac':/<RANDOM ZODIAC>\s*([\s\S]*)\s*<\/RANDOM ZODIAC>/i,'Variant':/<RANDOM VARIANT>\s*([\s\S]*)\s*<\/RANDOM VARIANT>/i};for(const _0x3a18b4 in _0x49693e){const _0x13fef7=_0x49693e[_0x3a18b4];if(_0x30e282['match'](_0x13fef7)){const _0x22f2b6=_0x4176a7(_0x4b826c['$1'])[_0x392f90(0x178)](/[\r\n]+/)[_0x392f90(0x3f4)]('');_0x39fd59[_0x3a18b4]=this['processRandomizedData'](_0x22f2b6);}}}else{const _0x3e14e7=this[_0x392f90(0x318)](_0x5ec1cb),_0x1f3d67=DataManager[_0x392f90(0x3e4)](_0x5ec1cb,_0x3e14e7);_0xb54b55*=_0x1f3d67['DropRate']!==undefined?_0x1f3d67[_0x392f90(0x1d3)]:0x1;}}return _0xb54b55;},Game_Enemy[_0x1aecd6(0x3fc)][_0x1aecd6(0x273)]=function(){const _0x2dc578=_0x1aecd6;this[_0x2dc578(0x385)]={'name':this[_0x2dc578(0x251)]()['battlerName'],'hue':this[_0x2dc578(0x251)]()[_0x2dc578(0x2c4)]};const _0x17890a=this['enemy']()[_0x2dc578(0x3a9)],_0x13db8c=this['getTraitSetKeys']();for(const _0x243dd4 of _0x13db8c){if('PfApN'!==_0x2dc578(0x44a)){if(this['enemy']()[_0x2dc578(0x3a9)][_0x2dc578(0x351)](/<NO RANDOM TRAIT SETS>/i))return;const _0x1bccee=this[_0x2dc578(0x22e)](),_0x56505f=_0x1800df[_0x2dc578(0x379)][_0x2dc578(0x34d)];for(const _0x2156bd of _0x1bccee){_0x56505f[_0x2156bd][_0x2dc578(0x23b)]&&this[_0x2dc578(0x3db)](_0x2156bd);}}else{const _0x31189e=this[_0x2dc578(0x3e4)](_0x243dd4)[_0x2dc578(0x239)][_0x2dc578(0x348)]()[_0x2dc578(0x173)](),_0x3c7504=_0x243dd4[_0x2dc578(0x348)]()['trim']();if(_0x17890a[_0x2dc578(0x351)](VisuMZ['ElementStatusCore'][_0x2dc578(0x3f3)][_0x2dc578(0x257)[_0x2dc578(0x411)](_0x3c7504,_0x31189e)])){if(_0x2dc578(0x2f0)===_0x2dc578(0x2f0))this[_0x2dc578(0x385)][_0x2dc578(0x38c)]=String(RegExp['$1']);else{const _0x2f062=_0x2c4c6d[_0x2dc578(0x3ee)],_0x53482c=_0xf4c37b[_0x2dc578(0x217)],_0x43661d=_0x355067['x'],_0x88a969=_0x5b668d['y'];this[_0x2dc578(0x25d)](_0x4921ef,_0x43661d,_0x88a969,_0x2f062,_0x53482c);}}else{if(_0x17890a[_0x2dc578(0x351)](VisuMZ['ElementStatusCore'][_0x2dc578(0x3f3)][_0x2dc578(0x421)[_0x2dc578(0x411)](_0x3c7504,_0x31189e)])){if('fpGDg'!==_0x2dc578(0x446)){const _0x1367f7=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x2dc578(0x3f4)]('');this[_0x2dc578(0x385)]['name']=DataManager[_0x2dc578(0x22d)](_0x1367f7);}else{const _0x388118=_0x2dc578(0x2c6)[_0x2dc578(0x411)](_0x3ab86c,_0x113f09,_0x22b5f1);_0x5f14a8[_0x388118]=_0x1c139a[_0x388118]||[];const _0x25f522=_0x39f626===_0x2dc578(0x228)?_0x9dd709:_0x5e7a28,_0x3e9f4f=_0x3679a3[_0x2dc578(0x351)](/JS/i)?_0x2dc578(0x193):'',_0x3eb2e0=_0x2dc578(0x2de)[_0x2dc578(0x411)](_0x62bb32,_0xe0d315),_0x130650=_0x401b45[_0x2dc578(0x348)](),_0x3eb298=_0x3f9b25[_0x2dc578(0x351)](/RATE/i)?_0x494c8a:_0x5a7571,_0x4f905b=_0x3eb298[_0x398c0d[_0x2dc578(0x1c4)](_0x599454)];_0x1a0609[_0x388118][_0x3220cb]=new _0x2e0207(_0x25f522[_0x2dc578(0x411)](_0x3e9f4f,_0x3eb2e0,_0x130650,_0x4f905b),'i');}}}if(_0x17890a[_0x2dc578(0x351)](VisuMZ[_0x2dc578(0x379)][_0x2dc578(0x3f3)][_0x2dc578(0x403)[_0x2dc578(0x411)](_0x3c7504,_0x31189e)]))this[_0x2dc578(0x385)][_0x2dc578(0x28d)]=Number(RegExp['$1'])[_0x2dc578(0x333)](0x0,0x168);else{if(_0x17890a[_0x2dc578(0x351)](VisuMZ[_0x2dc578(0x379)][_0x2dc578(0x3f3)][_0x2dc578(0x315)['format'](_0x3c7504,_0x31189e)])){const _0x252554=String(RegExp['$1'])[_0x2dc578(0x178)](/[\r\n]+/)[_0x2dc578(0x3f4)]('');this['_specialBattler']['hue']=Number(DataManager[_0x2dc578(0x22d)](_0x252554))[_0x2dc578(0x333)](0x0,0x168);}}}}},Game_Enemy[_0x1aecd6(0x3fc)]['updateSpecialBattlers']=function(){const _0x383ab1=_0x1aecd6;this[_0x383ab1(0x273)]();if(!Imported[_0x383ab1(0x2a8)])return;this[_0x383ab1(0x326)]=this[_0x383ab1(0x326)]||{'name':'','wtypeId':settings['WtypeId'],'collapse':settings[_0x383ab1(0x24e)],'motionIdle':settings[_0x383ab1(0x427)],'width':settings[_0x383ab1(0x1fb)]||0x40,'height':settings['Height']||0x40,'anchorX':settings['AnchorX']||0x0,'anchorY':settings[_0x383ab1(0x241)]||0x0,'shadow':settings[_0x383ab1(0x423)]};const _0x29079c=this[_0x383ab1(0x326)],_0x3cf6b3=this[_0x383ab1(0x251)]()[_0x383ab1(0x3a9)],_0x320e76=this[_0x383ab1(0x22e)]();for(const _0x108dd0 of _0x320e76){if('yWEyR'===_0x383ab1(0x3ca))this[_0x383ab1(0x34a)](_0x49993e);else{const _0x3a894c=this['traitSet'](_0x108dd0)[_0x383ab1(0x239)]['toUpperCase']()[_0x383ab1(0x173)](),_0x4f0b75=_0x108dd0['toUpperCase']()['trim']();if(_0x3cf6b3[_0x383ab1(0x351)](VisuMZ[_0x383ab1(0x379)][_0x383ab1(0x3f3)][_0x383ab1(0x2a0)[_0x383ab1(0x411)](_0x4f0b75,_0x3a894c)])){if('FLgJY'!=='EYlsx')_0x29079c[_0x383ab1(0x38c)]=String(RegExp['$1']);else{const _0x421eff=_0x550d8f[_0x383ab1(0x422)](_0x57778f),_0x331975=_0x35cc6b[_0x383ab1(0x41c)](_0x340e12),_0x139459=_0x771e19[_0x383ab1(0x412)](_0x3ec9b2),_0x24d1a4=(0x1+_0x421eff)*_0x331975+_0x139459-0x1;this['changeTextColor'](_0x497a3f[_0x383ab1(0x206)](_0x24d1a4)),_0x2e604e=_0x383ab1(0x1a7)[_0x383ab1(0x411)](_0x5f06ad[_0x383ab1(0x309)](_0x24d1a4*0x64));if(_0x24d1a4>=0x0)_0x286969=_0x383ab1(0x3ff)[_0x383ab1(0x411)](_0x263952);}}else{if(_0x3cf6b3[_0x383ab1(0x351)](VisuMZ[_0x383ab1(0x379)][_0x383ab1(0x3f3)][_0x383ab1(0x1f9)[_0x383ab1(0x411)](_0x4f0b75,_0x3a894c)])){if(_0x383ab1(0x195)===_0x383ab1(0x18b))return _0x56b1fa[_0x383ab1(0x379)]['Settings'][_0x383ab1(0x201)][_0x383ab1(0x1da)][_0x383ab1(0x38d)](this,_0x550fd6,_0x965401);else{const _0x42fdf7=String(RegExp['$1'])[_0x383ab1(0x178)](/[\r\n]+/)[_0x383ab1(0x3f4)]('');_0x29079c[_0x383ab1(0x38c)]=DataManager[_0x383ab1(0x22d)](_0x42fdf7),console[_0x383ab1(0x404)](_0x29079c[_0x383ab1(0x38c)]);}}}if(_0x3cf6b3['match'](VisuMZ['ElementStatusCore'][_0x383ab1(0x3f3)]['SvWeaponSolo-%1-%2'[_0x383ab1(0x411)](_0x4f0b75,_0x3a894c)])){if(_0x383ab1(0x3a3)===_0x383ab1(0x3a3))_0x29079c['wtypeId']=DataManager[_0x383ab1(0x435)](RegExp['$1']);else{const _0x320155=new _0x40ab6a(0x0,0x0,_0x468661['width'],_0x31911e['height']);this[_0x383ab1(0x17e)]=new _0x146d23(_0x320155),this['_commandNameWindow'][_0x383ab1(0x211)]=0x0,this[_0x383ab1(0x292)](this['_commandNameWindow']),this[_0x383ab1(0x191)]();}}else{if(_0x3cf6b3[_0x383ab1(0x351)](VisuMZ['ElementStatusCore'][_0x383ab1(0x3f3)][_0x383ab1(0x21a)[_0x383ab1(0x411)](_0x4f0b75,_0x3a894c)])){const _0x43e420=String(RegExp['$1'])[_0x383ab1(0x178)](/[\r\n]+/)[_0x383ab1(0x3f4)](''),_0x27730a=DataManager[_0x383ab1(0x22d)](_0x43e420);_0x29079c['wtypeId']=DataManager[_0x383ab1(0x435)](_0x27730a);}}if(_0x3cf6b3[_0x383ab1(0x351)](VisuMZ[_0x383ab1(0x379)][_0x383ab1(0x3f3)][_0x383ab1(0x33a)[_0x383ab1(0x411)](_0x4f0b75,_0x3a894c)]))_0x29079c[_0x383ab1(0x40d)]=String(RegExp['$1'])[_0x383ab1(0x432)]()['trim']();else{if(_0x3cf6b3[_0x383ab1(0x351)](VisuMZ[_0x383ab1(0x379)][_0x383ab1(0x3f3)]['SvMotionIdleMass-%1-%2'[_0x383ab1(0x411)](_0x4f0b75,_0x3a894c)])){if(_0x383ab1(0x266)!==_0x383ab1(0x266)){const _0x86408c=_0x5f19c3[_0x383ab1(0x348)]()[_0x383ab1(0x173)]();for(const _0x20e86b in _0x429398['_traitSets'][_0x86408c]){const _0x3bf78a=_0x383ab1(0x257)[_0x383ab1(0x411)](_0x86408c,_0x20e86b);_0x29ef5f[_0x383ab1(0x379)][_0x383ab1(0x3f3)][_0x3bf78a]=new _0x31098b(_0x2433b5[_0x383ab1(0x411)](_0x20e86b),'i');const _0x4c6d3b=_0x383ab1(0x403)[_0x383ab1(0x411)](_0x86408c,_0x20e86b);_0x3f499d['ElementStatusCore']['RegExp'][_0x4c6d3b]=new _0x14324a(_0x56d11e['format'](_0x20e86b),'i');const _0x3fdffb=_0x383ab1(0x421)[_0x383ab1(0x411)](_0x86408c,_0x20e86b);_0x3f2059['ElementStatusCore'][_0x383ab1(0x3f3)][_0x3fdffb]=new _0x2503c1(_0xada13e[_0x383ab1(0x411)](_0x20e86b),'i');const _0x4768db='BattlerHueMass-%1-%2'[_0x383ab1(0x411)](_0x86408c,_0x20e86b);_0x1e998e[_0x383ab1(0x379)]['RegExp'][_0x4768db]=new _0x32062f(_0x134b65[_0x383ab1(0x411)](_0x20e86b),'i');}}else{const _0x175226=String(RegExp['$1'])[_0x383ab1(0x178)](/[\r\n]+/)[_0x383ab1(0x3f4)]('');_0x29079c[_0x383ab1(0x40d)]=DataManager[_0x383ab1(0x22d)](_0x175226);}}}}}},Game_Enemy[_0x1aecd6(0x3fc)][_0x1aecd6(0x2ce)]=function(){const _0x5c74cb=_0x1aecd6;if(!this[_0x5c74cb(0x385)])this[_0x5c74cb(0x273)]();return this[_0x5c74cb(0x385)]['name'];},Game_Enemy[_0x1aecd6(0x3fc)][_0x1aecd6(0x2c4)]=function(){const _0x2a8d7b=_0x1aecd6;if(!this['_specialBattler'])this[_0x2a8d7b(0x273)]();return this[_0x2a8d7b(0x385)][_0x2a8d7b(0x28d)];},VisuMZ[_0x1aecd6(0x379)][_0x1aecd6(0x347)]=Game_Enemy[_0x1aecd6(0x3fc)][_0x1aecd6(0x2bf)],Game_Enemy[_0x1aecd6(0x3fc)]['transform']=function(_0x34bfd0){const _0x5d638c=_0x1aecd6;VisuMZ[_0x5d638c(0x379)][_0x5d638c(0x347)][_0x5d638c(0x38d)](this,_0x34bfd0),this[_0x5d638c(0x273)]();},Game_Troop[_0x1aecd6(0x3fc)][_0x1aecd6(0x1b7)]=function(){const _0x4dd4d0=_0x1aecd6;for(const _0x2ed0c0 of this[_0x4dd4d0(0x289)]()){_0x4dd4d0(0x1bd)===_0x4dd4d0(0x408)?_0x2e1300+=_0x1f65a4(_0x120c7d):_0x2ed0c0&&(_0x4dd4d0(0x2ee)===_0x4dd4d0(0x2ee)?(_0x2ed0c0[_0x4dd4d0(0x29f)]='',_0x2ed0c0[_0x4dd4d0(0x1c3)]=![],_0x2ed0c0['updateSpecialBattlers']()):_0x126aea+=_0x4a853d[_0x4dd4d0(0x379)][_0x4dd4d0(0x361)](_0x14b5e0,_0x5f4148,_0x42b0fe));}this[_0x4dd4d0(0x285)]={},this[_0x4dd4d0(0x2a3)]();},Scene_Status[_0x1aecd6(0x3fc)][_0x1aecd6(0x39f)]=function(){const _0x234c3c=_0x1aecd6;if(ConfigManager[_0x234c3c(0x267)]&&ConfigManager[_0x234c3c(0x37c)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x234c3c(0x3f7)]())return this['updatedLayoutStyle']()['match'](/LOWER/i);else Scene_MenuBase['prototype'][_0x234c3c(0x2e5)]['call'](this);}},Scene_Status[_0x1aecd6(0x3fc)][_0x1aecd6(0x327)]=function(){const _0x129f9b=_0x1aecd6;return VisuMZ[_0x129f9b(0x379)][_0x129f9b(0x34d)]['StatusMenu'][_0x129f9b(0x1d9)];},Scene_Status[_0x1aecd6(0x3fc)]['isUseElementStatusCoreUpdatedLayout']=function(){const _0x137a29=_0x1aecd6;return VisuMZ['ElementStatusCore']['Settings']['StatusMenu'][_0x137a29(0x405)];},VisuMZ[_0x1aecd6(0x379)][_0x1aecd6(0x349)]=Scene_Status[_0x1aecd6(0x3fc)][_0x1aecd6(0x242)],Scene_Status[_0x1aecd6(0x3fc)][_0x1aecd6(0x242)]=function(){const _0x5838af=_0x1aecd6;this['isUseElementStatusCoreUpdatedLayout']()?(this[_0x5838af(0x32a)](),this[_0x5838af(0x20a)]()):VisuMZ[_0x5838af(0x379)][_0x5838af(0x349)]['call'](this);},Scene_Status['prototype'][_0x1aecd6(0x32a)]=function(){const _0x3b5183=_0x1aecd6;Scene_MenuBase[_0x3b5183(0x3fc)][_0x3b5183(0x242)][_0x3b5183(0x38d)](this),this[_0x3b5183(0x1ee)](),this['createCategoryWindow'](),this[_0x3b5183(0x40f)]();},Scene_Status['prototype']['updateElementStatusCoreWindowBg']=function(){const _0xe1a5b9=_0x1aecd6;if(!Imported[_0xe1a5b9(0x1b1)])return;const _0xc1702e=Scene_Status[_0xe1a5b9(0x1f1)]['StatusBgType'];this['_helpWindow']['setBackgroundType'](_0xc1702e),this['_categoryWindow']['setBackgroundType'](_0xc1702e),this[_0xe1a5b9(0x447)]['setBackgroundType'](_0xc1702e);},Scene_Status[_0x1aecd6(0x3fc)][_0x1aecd6(0x1a4)]=function(){const _0x430476=_0x1aecd6;return this[_0x430476(0x3f7)]()?Scene_MenuBase[_0x430476(0x3fc)][_0x430476(0x1a4)]['call'](this):0x0;},Scene_Status[_0x1aecd6(0x3fc)][_0x1aecd6(0x3c5)]=function(){const _0x5d7dbd=_0x1aecd6;return this[_0x5d7dbd(0x3f7)]()?this[_0x5d7dbd(0x36f)]():Scene_MenuBase[_0x5d7dbd(0x3fc)]['helpWindowRect'][_0x5d7dbd(0x38d)](this);},Scene_Status[_0x1aecd6(0x3fc)][_0x1aecd6(0x36f)]=function(){const _0x282839=_0x1aecd6,_0x1f1f4f=0x0,_0x10fbb9=this[_0x282839(0x1a3)](),_0x2ecc59=Graphics[_0x282839(0x205)],_0x2d8b4d=this[_0x282839(0x1a4)]();return new Rectangle(_0x1f1f4f,_0x10fbb9,_0x2ecc59,_0x2d8b4d);},Scene_Status[_0x1aecd6(0x3fc)]['createCategoryWindow']=function(){const _0x249733=_0x1aecd6,_0x4b662b=this[_0x249733(0x33e)]();this[_0x249733(0x276)]=new Window_StatusCategory(_0x4b662b),this['_categoryWindow'][_0x249733(0x2e9)](_0x249733(0x268),this['popScene'][_0x249733(0x3e2)](this)),this['_categoryWindow']['setHandler'](_0x249733(0x391),this[_0x249733(0x35d)][_0x249733(0x3e2)](this)),this[_0x249733(0x276)][_0x249733(0x2e9)](_0x249733(0x204),this['previousActor'][_0x249733(0x3e2)](this)),this['addWindow'](this[_0x249733(0x276)]);},Scene_Status['prototype']['categoryWindowRect']=function(){const _0x2caa3a=_0x1aecd6,_0x52fdb1=Graphics[_0x2caa3a(0x205)],_0x18b876=this[_0x2caa3a(0x249)](0x1,!![]),_0x1de859=0x0;let _0x1caf60=0x0;if(this[_0x2caa3a(0x327)]()['match'](/TOP/i)){if('yPNxx'!==_0x2caa3a(0x32f)){if(_0x2779d3[_0x2caa3a(0x425)])_0x363588[_0x2caa3a(0x3fc)][_0x2caa3a(0x2c5)][_0x2caa3a(0x38d)](this,_0x2c76f9);return'';}else _0x1caf60=this[_0x2caa3a(0x33b)]();}else _0x1caf60=this[_0x2caa3a(0x1d6)]()-_0x18b876;return new Rectangle(_0x1de859,_0x1caf60,_0x52fdb1,_0x18b876);},Scene_Status[_0x1aecd6(0x3fc)][_0x1aecd6(0x40f)]=function(){const _0x245738=_0x1aecd6,_0x5947dc=this['dataWindowRect']();this[_0x245738(0x447)]=new Window_StatusData(_0x5947dc),this['addWindow'](this[_0x245738(0x447)]),this[_0x245738(0x276)][_0x245738(0x20d)](this[_0x245738(0x447)]);},Scene_Status['prototype'][_0x1aecd6(0x1a9)]=function(){const _0x1f2cae=_0x1aecd6,_0x533d48=Graphics[_0x1f2cae(0x205)],_0x4434b1=this[_0x1f2cae(0x281)]()-this['_categoryWindow'][_0x1f2cae(0x217)],_0x559294=0x0;let _0xf4d9dc=0x0;return this[_0x1f2cae(0x327)]()['match'](/TOP/i)?_0xf4d9dc=this[_0x1f2cae(0x276)]['y']+this[_0x1f2cae(0x276)][_0x1f2cae(0x217)]:_0xf4d9dc=this[_0x1f2cae(0x33b)](),new Rectangle(_0x559294,_0xf4d9dc,_0x533d48,_0x4434b1);},VisuMZ[_0x1aecd6(0x379)]['Scene_Status_refreshActor']=Scene_Status[_0x1aecd6(0x3fc)][_0x1aecd6(0x3b0)],Scene_Status[_0x1aecd6(0x3fc)][_0x1aecd6(0x3b0)]=function(){const _0x4d68e9=_0x1aecd6;if(this[_0x4d68e9(0x3f7)]()){if(_0x4d68e9(0x396)!==_0x4d68e9(0x2a2))this[_0x4d68e9(0x384)]();else{const _0x62fe63=_0x152f1d[_0x4d68e9(0x3e1)],_0x506113=_0x36a27b['faceHeight'],_0x5cea92=_0x132785['x']+_0x449559[_0x4d68e9(0x371)]((_0x356e10[_0x4d68e9(0x3ee)]-_0x62fe63)/0x2),_0x1fbc9e=_0x5a4790['y']+_0x16637f[_0x4d68e9(0x371)]((this[_0x4d68e9(0x2b8)]-_0x17458e-_0x506113)/0x2);this['drawActorFaceBack'](_0x3ab7ff,_0x5cea92,_0x1fbc9e,_0x62fe63,_0x506113);}}else VisuMZ[_0x4d68e9(0x379)][_0x4d68e9(0x20c)][_0x4d68e9(0x38d)](this);},Scene_Status[_0x1aecd6(0x3fc)][_0x1aecd6(0x384)]=function(){const _0x260cdf=_0x1aecd6,_0x236c61=this[_0x260cdf(0x1a5)]();this[_0x260cdf(0x19a)][_0x260cdf(0x392)](_0x236c61[_0x260cdf(0x2d6)]()),this[_0x260cdf(0x447)][_0x260cdf(0x3c0)](_0x236c61);},VisuMZ[_0x1aecd6(0x379)][_0x1aecd6(0x1c2)]=Scene_Status[_0x1aecd6(0x3fc)][_0x1aecd6(0x311)],Scene_Status[_0x1aecd6(0x3fc)]['onActorChange']=function(){const _0x5e1036=_0x1aecd6;if(this[_0x5e1036(0x3f7)]()){if('Fnngf'===_0x5e1036(0x300))this['onActorChangeElementStatusCore']();else return this[_0x5e1036(0x327)]()[_0x5e1036(0x351)](/LOWER/i);}else VisuMZ[_0x5e1036(0x379)][_0x5e1036(0x1c2)]['call'](this);},Scene_Status[_0x1aecd6(0x3fc)][_0x1aecd6(0x2b9)]=function(){const _0x4d39e8=_0x1aecd6;Scene_MenuBase[_0x4d39e8(0x3fc)]['onActorChange']['call'](this),this[_0x4d39e8(0x3b0)](),this[_0x4d39e8(0x276)][_0x4d39e8(0x3af)]();},Window_Base[_0x1aecd6(0x3fc)][_0x1aecd6(0x2a1)]=function(_0x313b1c,_0x5f07db,_0x5378e5,_0x4b6a8a,_0x18f3c3){const _0x4ca481=_0x1aecd6;_0x18f3c3=Math['max'](_0x18f3c3||0x1,0x1);while(_0x18f3c3--){if(_0x4ca481(0x296)===_0x4ca481(0x296)){_0x4b6a8a=_0x4b6a8a||this['lineHeight'](),this[_0x4ca481(0x1f0)][_0x4ca481(0x1ed)]=0xa0;const _0x358466=ColorManager[_0x4ca481(0x1db)]();this[_0x4ca481(0x1f0)][_0x4ca481(0x325)](_0x313b1c+0x1,_0x5f07db+0x1,_0x5378e5-0x2,_0x4b6a8a-0x2,_0x358466),this[_0x4ca481(0x1f0)][_0x4ca481(0x1ed)]=0xff;}else{const _0xdddb88=this['getTraitSet'](_0x516b20),_0x3bc686=_0x46c393[_0x4ca481(0x3e4)](_0x51a1c4,_0xdddb88);_0x4571c7*=_0x3bc686['GoldRate']!==_0x3ae664?_0x3bc686[_0x4ca481(0x255)]:0x1;}}};function Window_StatusCategory(){this['initialize'](...arguments);}Window_StatusCategory['_commandList']=VisuMZ[_0x1aecd6(0x379)]['Settings']['StatusMenuList'],Window_StatusCategory[_0x1aecd6(0x3fc)]=Object[_0x1aecd6(0x242)](Window_HorzCommand['prototype']),Window_StatusCategory[_0x1aecd6(0x3fc)][_0x1aecd6(0x30d)]=Window_StatusCategory,Window_StatusCategory[_0x1aecd6(0x3fc)]['initialize']=function(_0x47f1af){const _0x4c4d58=_0x1aecd6;Window_HorzCommand[_0x4c4d58(0x3fc)][_0x4c4d58(0x25c)][_0x4c4d58(0x38d)](this,_0x47f1af),this[_0x4c4d58(0x37d)](_0x47f1af);},Window_StatusCategory[_0x1aecd6(0x3fc)][_0x1aecd6(0x37d)]=function(_0x6a3121){const _0x3b5ba0=_0x1aecd6,_0x56f3ad=new Rectangle(0x0,0x0,_0x6a3121[_0x3b5ba0(0x3ee)],_0x6a3121['height']);this['_commandNameWindow']=new Window_Base(_0x56f3ad),this['_commandNameWindow'][_0x3b5ba0(0x211)]=0x0,this[_0x3b5ba0(0x292)](this[_0x3b5ba0(0x17e)]),this[_0x3b5ba0(0x191)]();},Window_StatusCategory[_0x1aecd6(0x3fc)]['callUpdateHelp']=function(){const _0x22e29a=_0x1aecd6;Window_HorzCommand[_0x22e29a(0x3fc)][_0x22e29a(0x3fb)][_0x22e29a(0x38d)](this);if(this['_commandNameWindow'])this['updateCommandNameWindow']();},Window_StatusCategory[_0x1aecd6(0x3fc)]['updateCommandNameWindow']=function(){const _0x14056f=_0x1aecd6,_0x2678b8=this[_0x14056f(0x17e)];_0x2678b8['contents'][_0x14056f(0x28e)]();const _0x46efac=this[_0x14056f(0x187)](this['index']());if(_0x46efac===_0x14056f(0x248)){if(_0x14056f(0x1ff)===_0x14056f(0x1f4)){let _0x2fc8a9=0x0;if(!_0x145dcd)return _0x2fc8a9;const _0x2e5feb=_0x515225[_0x14056f(0x3a9)]||'',_0x29a712=_0x2e5feb[_0x14056f(0x351)](_0x4827cc);if(_0x29a712)for(const _0x4fee05 of _0x29a712){_0x4fee05[_0x14056f(0x351)](_0x125833);const _0x1d36a9=_0xd31253(_0x5f0baa['$1']),_0x244f32=_0x5d6bfd(_0x1c036a['$2'])*0.01;_0x10c8c5[_0x14056f(0x2ad)](_0x1d36a9)&&(_0x2fc8a9+=_0x244f32);}return _0x2fc8a9;}else{const _0x41a94e=this[_0x14056f(0x1ef)](this[_0x14056f(0x39c)]());let _0x597af8=this[_0x14056f(0x3c7)](this['index']());_0x597af8=_0x597af8[_0x14056f(0x308)](/\\I\[(\d+)\]/gi,''),_0x2678b8[_0x14056f(0x1fe)](),this[_0x14056f(0x2c1)](_0x597af8,_0x41a94e),this[_0x14056f(0x40c)](_0x597af8,_0x41a94e),this[_0x14056f(0x3ef)](_0x597af8,_0x41a94e);}}},Window_StatusCategory[_0x1aecd6(0x3fc)]['commandNameWindowDrawBackground']=function(_0x4341c9,_0xe3a167){},Window_StatusCategory['prototype'][_0x1aecd6(0x40c)]=function(_0x1a65e9,_0x33f9b2){const _0x24d5fd=_0x1aecd6,_0x548dab=this[_0x24d5fd(0x17e)];_0x548dab[_0x24d5fd(0x1d2)](_0x1a65e9,0x0,_0x33f9b2['y'],_0x548dab[_0x24d5fd(0x1cb)],_0x24d5fd(0x32b));},Window_StatusCategory[_0x1aecd6(0x3fc)][_0x1aecd6(0x3ef)]=function(_0x3b48ec,_0x59e876){const _0xbe0145=_0x1aecd6,_0x33d884=this[_0xbe0145(0x17e)],_0x29c903=$gameSystem[_0xbe0145(0x1d5)](),_0x231584=_0x59e876['x']+Math[_0xbe0145(0x371)](_0x59e876[_0xbe0145(0x3ee)]/0x2)+_0x29c903;_0x33d884['x']=_0x33d884[_0xbe0145(0x3ee)]/-0x2+_0x231584,_0x33d884['y']=Math[_0xbe0145(0x371)](_0x59e876['height']/0x2);},Window_StatusCategory[_0x1aecd6(0x3fc)][_0x1aecd6(0x26d)]=function(){const _0x438681=_0x1aecd6;return VisuMZ[_0x438681(0x379)][_0x438681(0x34d)][_0x438681(0x43d)]['length'];},Window_StatusCategory[_0x1aecd6(0x3fc)][_0x1aecd6(0x428)]=function(){const _0x3b6aa3=_0x1aecd6;Window_HorzCommand['prototype'][_0x3b6aa3(0x428)]['call'](this);if(this[_0x3b6aa3(0x3ad)]){if(_0x3b6aa3(0x2da)!==_0x3b6aa3(0x3f0))this['_itemWindow'][_0x3b6aa3(0x28f)](this[_0x3b6aa3(0x2ba)]());else return _0x2df298[_0x3b6aa3(0x1bc)]>0x0?_0x483509[_0x3b6aa3(0x379)]['Settings'][_0x3b6aa3(0x201)]['RuleAdditiveCalcJS'][_0x3b6aa3(0x38d)](this,_0x1ec0ca,_0x40d5d9):0x1;}},Window_StatusCategory[_0x1aecd6(0x3fc)]['setItemWindow']=function(_0x4a9fed){const _0x325258=_0x1aecd6;this[_0x325258(0x3ad)]=_0x4a9fed;},Window_StatusCategory['prototype'][_0x1aecd6(0x262)]=function(){const _0x436711=_0x1aecd6;for(const _0x24f16a of Window_StatusCategory[_0x436711(0x3c9)]){const _0x222cb4=_0x24f16a['Symbol'],_0x3279cf=_0x24f16a['Icon'];let _0x44c05a=_0x24f16a['Text'];if(['',_0x436711(0x406)][_0x436711(0x3c8)](_0x44c05a))continue;_0x3279cf>0x0&&this[_0x436711(0x226)]()!=='text'&&(_0x44c05a=_0x436711(0x1b4)['format'](_0x3279cf,_0x44c05a));const _0x58e6f4=_0x24f16a[_0x436711(0x1e2)];this[_0x436711(0x18c)](_0x44c05a,_0x222cb4,!![],_0x58e6f4);}},Window_StatusCategory[_0x1aecd6(0x3fc)][_0x1aecd6(0x1c0)]=function(){const _0x246601=_0x1aecd6;return VisuMZ['ElementStatusCore'][_0x246601(0x34d)][_0x246601(0x26a)]['CmdTextAlign'];},Window_StatusCategory['prototype'][_0x1aecd6(0x2ac)]=function(_0x3c1374){const _0x52416d=_0x1aecd6,_0x514669=this['commandStyleCheck'](_0x3c1374);if(_0x514669===_0x52416d(0x341))this['drawItemStyleIconText'](_0x3c1374);else _0x514669===_0x52416d(0x248)?this[_0x52416d(0x323)](_0x3c1374):Window_HorzCommand[_0x52416d(0x3fc)]['drawItem'][_0x52416d(0x38d)](this,_0x3c1374);},Window_StatusCategory[_0x1aecd6(0x3fc)]['commandStyle']=function(){const _0x539d8f=_0x1aecd6;return VisuMZ[_0x539d8f(0x379)][_0x539d8f(0x34d)]['StatusMenu'][_0x539d8f(0x17f)];},Window_StatusCategory[_0x1aecd6(0x3fc)][_0x1aecd6(0x187)]=function(_0xc9d0df){const _0x3f8d0d=_0x1aecd6;if(_0xc9d0df<0x0)return _0x3f8d0d(0x21b);const _0x35bd22=this['commandStyle']();if(_0x35bd22!=='auto')return _0x35bd22;else{if(this[_0x3f8d0d(0x35c)]()>0x0){const _0x3efeb9=this[_0x3f8d0d(0x3c7)](_0xc9d0df);if(_0x3efeb9[_0x3f8d0d(0x351)](/\\I\[(\d+)\]/i)){if('zenQe'!==_0x3f8d0d(0x284)){const _0x18d12a=this['itemLineRect'](_0xc9d0df),_0x3e7629=this[_0x3f8d0d(0x2c8)](_0x3efeb9)[_0x3f8d0d(0x3ee)];if(_0x3e7629<=_0x18d12a[_0x3f8d0d(0x3ee)])return _0x3f8d0d(0x341);else{if('wJvCY'==='bhfki'){var _0x157c2e=_0x2aa143(_0x550a43['$1']);try{_0x45cfab+=_0x3af5da(_0x157c2e);}catch(_0xe7ed2c){if(_0x35988b['isPlaytest']())_0x38cd50[_0x3f8d0d(0x404)](_0xe7ed2c);}}else return'icon';}}else return _0x5ddabd[_0x3f8d0d(0x3fc)][_0x3f8d0d(0x3c5)][_0x3f8d0d(0x38d)](this);}}}return'text';},Window_StatusCategory[_0x1aecd6(0x3fc)][_0x1aecd6(0x34a)]=function(_0x8e7fb9){const _0x571de2=_0x1aecd6,_0x14bc0b=this[_0x571de2(0x1ef)](_0x8e7fb9),_0x2a4822=this['commandName'](_0x8e7fb9),_0x378f42=this[_0x571de2(0x2c8)](_0x2a4822)[_0x571de2(0x3ee)];this[_0x571de2(0x3be)](this['isCommandEnabled'](_0x8e7fb9));const _0x434ab2=this[_0x571de2(0x1c0)]();if(_0x434ab2==='right')this[_0x571de2(0x182)](_0x2a4822,_0x14bc0b['x']+_0x14bc0b[_0x571de2(0x3ee)]-_0x378f42,_0x14bc0b['y'],_0x378f42);else{if(_0x434ab2===_0x571de2(0x32b)){if(_0x571de2(0x3d3)!==_0x571de2(0x3d3)){const _0x210acd=_0x3fee70(_0x4b92ea['$1'])[_0x571de2(0x173)](),_0xf6d07f=_0x294e77(_0x5aa24f['$2']);_0x1923d4[_0x210acd]=_0xf6d07f,_0x2aa147+=_0xf6d07f;}else{const _0x1563ea=_0x14bc0b['x']+Math[_0x571de2(0x371)]((_0x14bc0b[_0x571de2(0x3ee)]-_0x378f42)/0x2);this['drawTextEx'](_0x2a4822,_0x1563ea,_0x14bc0b['y'],_0x378f42);}}else _0x571de2(0x434)==='IxICA'?this[_0x571de2(0x2a1)](0x0,_0x3a3759,_0x5303de,this[_0x571de2(0x2b8)]-_0x464523):this['drawTextEx'](_0x2a4822,_0x14bc0b['x'],_0x14bc0b['y'],_0x378f42);}},Window_StatusCategory[_0x1aecd6(0x3fc)]['drawItemStyleIcon']=function(_0x5144cc){const _0x5ccbe4=_0x1aecd6;this[_0x5ccbe4(0x3c7)](_0x5144cc)[_0x5ccbe4(0x351)](/\\I\[(\d+)\]/i);const _0x1aee86=Number(RegExp['$1'])||0x0,_0x1d87ac=this['itemLineRect'](_0x5144cc),_0x51812f=_0x1d87ac['x']+Math[_0x5ccbe4(0x371)]((_0x1d87ac[_0x5ccbe4(0x3ee)]-ImageManager[_0x5ccbe4(0x331)])/0x2),_0x549116=_0x1d87ac['y']+(_0x1d87ac[_0x5ccbe4(0x217)]-ImageManager[_0x5ccbe4(0x307)])/0x2;this['drawIcon'](_0x1aee86,_0x51812f,_0x549116);};function Window_StatusData(){const _0x44fd36=_0x1aecd6;this[_0x44fd36(0x25c)](...arguments);}Window_StatusData['prototype']=Object['create'](Window_StatusBase['prototype']),Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x30d)]=Window_MenuStatus,Window_StatusData['traitCol1']=[_0x1aecd6(0x376),'Nature',_0x1aecd6(0x2cc),_0x1aecd6(0x3a2)][_0x1aecd6(0x42f)](_0x1a3906=>{const _0x813b3b=_0x1aecd6,_0x14dc9b=DataManager[_0x813b3b(0x301)](_0x1a3906);return _0x14dc9b&&_0x14dc9b['Visible'];}),Window_StatusData['traitCol2']=['Race','Alignment','Curse',_0x1aecd6(0x44c)]['filter'](_0x5cf6ec=>{const _0x3c184d=_0x1aecd6,_0x29cfd7=DataManager[_0x3c184d(0x301)](_0x5cf6ec);return _0x29cfd7&&_0x29cfd7[_0x3c184d(0x353)];}),Window_StatusData[_0x1aecd6(0x3fc)]['initialize']=function(_0x396486){const _0x5e0b4c=_0x1aecd6;this[_0x5e0b4c(0x24f)]=$gameSystem[_0x5e0b4c(0x409)](),Window_StatusBase[_0x5e0b4c(0x3fc)]['initialize']['call'](this,_0x396486),this[_0x5e0b4c(0x356)]=null,this[_0x5e0b4c(0x2fa)]=null;},Window_StatusData[_0x1aecd6(0x3fc)]['resetFontSettings']=function(){const _0x133ec8=_0x1aecd6;Window_StatusBase[_0x133ec8(0x3fc)][_0x133ec8(0x1fe)]['call'](this),this[_0x133ec8(0x17a)][_0x133ec8(0x223)]=this[_0x133ec8(0x24f)];},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x3bb)]=function(){const _0x525085=_0x1aecd6;return this[_0x525085(0x17a)][_0x525085(0x223)]/$gameSystem[_0x525085(0x409)]();},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x29c)]=function(_0x334a99,_0x2612a1,_0x12eabe){const _0x56278a=_0x1aecd6,_0x1f984a=ImageManager[_0x56278a(0x372)](_0x56278a(0x322)),_0x57bac9=ImageManager[_0x56278a(0x331)],_0x5e3d8a=ImageManager[_0x56278a(0x307)],_0x2aac98=_0x334a99%0x10*_0x57bac9,_0x3e81e5=Math['floor'](_0x334a99/0x10)*_0x5e3d8a,_0x196d48=Math['ceil'](_0x57bac9*this[_0x56278a(0x3bb)]()),_0xd29d01=Math[_0x56278a(0x1de)](_0x5e3d8a*this['fontSizeRatio']());this['contents']['blt'](_0x1f984a,_0x2aac98,_0x3e81e5,_0x57bac9,_0x5e3d8a,_0x2612a1,_0x12eabe,_0x196d48,_0xd29d01);},Window_StatusData[_0x1aecd6(0x3fc)]['processDrawIcon']=function(_0x475331,_0x4a6d3b){const _0x5ca27f=_0x1aecd6;if(_0x4a6d3b[_0x5ca27f(0x3a5)]){if(_0x5ca27f(0x180)!==_0x5ca27f(0x180)){let _0x3b0f0f=0x1;if(!_0x22757b)return _0x3b0f0f;const _0x26127d=/<CRITICAL VS (.*) TRAIT:[ ](\d+)([%％])>/gi;return _0x1df713[_0x5ca27f(0x379)]['TraitCheckNotetagRate'](_0x5ecf3d,this[_0x5ca27f(0x345)](),_0x26127d);}else this['drawIcon'](_0x475331,_0x4a6d3b['x'],_0x4a6d3b['y']+0x2);}_0x4a6d3b['x']+=Math[_0x5ca27f(0x1de)](ImageManager[_0x5ca27f(0x331)]*this[_0x5ca27f(0x3bb)]());if(this[_0x5ca27f(0x3bb)]()===0x1)_0x4a6d3b['x']+=0x4;},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x3c0)]=function(_0x30c36b){const _0x3d6f03=_0x1aecd6;this[_0x3d6f03(0x356)]!==_0x30c36b&&(this[_0x3d6f03(0x356)]=_0x30c36b,this[_0x3d6f03(0x1ec)]());},Window_StatusData['prototype']['setDrawData']=function(_0x347891){const _0xb23d87=_0x1aecd6;if(this[_0xb23d87(0x2fa)]!==_0x347891){if(_0xb23d87(0x282)===_0xb23d87(0x3d9))return 0x0;else this[_0xb23d87(0x2fa)]=_0x347891,this[_0xb23d87(0x1ec)]();}},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x2c5)]=function(_0x1c6995){const _0x1f4766=_0x1aecd6;if(Imported[_0x1f4766(0x425)])Window_Base[_0x1f4766(0x3fc)][_0x1f4766(0x2c5)][_0x1f4766(0x38d)](this,_0x1c6995);return'';},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x18d)]=function(){const _0xc0f406=_0x1aecd6;if(Imported[_0xc0f406(0x425)])Window_StatusBase[_0xc0f406(0x3fc)]['resetWordWrap'][_0xc0f406(0x38d)](this);},Window_StatusData[_0x1aecd6(0x3fc)]['drawTextEx']=function(_0x188d23,_0x273a6c,_0x4cfe0b,_0x4e4c44){const _0x2ce274=_0x1aecd6,_0x346cf9=Window_StatusBase[_0x2ce274(0x3fc)][_0x2ce274(0x182)][_0x2ce274(0x38d)](this,_0x188d23,_0x273a6c,_0x4cfe0b,_0x4e4c44);return this[_0x2ce274(0x18d)](),_0x346cf9;},Window_StatusData[_0x1aecd6(0x3fc)]['refresh']=function(){const _0x495544=_0x1aecd6;Window_StatusBase[_0x495544(0x3fc)][_0x495544(0x1ec)][_0x495544(0x38d)](this),this[_0x495544(0x240)](),this['resetFontSettings'](),this[_0x495544(0x18d)]();if(this['_actor']&&this['_drawData'])this[_0x495544(0x2fa)][_0x495544(0x38d)](this);},Window_StatusData[_0x1aecd6(0x3fc)]['isActorMenuImageAvailable']=function(){const _0x23d0ca=_0x1aecd6;return Imported[_0x23d0ca(0x419)]&&this[_0x23d0ca(0x356)][_0x23d0ca(0x23d)]()!=='';},Window_StatusData['prototype'][_0x1aecd6(0x25d)]=function(_0x254844,_0x91a4c5,_0x815dbf,_0x2ceee8,_0x5b0bf2){const _0x38ad42=_0x1aecd6,_0x4b524d=ImageManager[_0x38ad42(0x337)](_0x254844['getMenuImage']());_0x4b524d[_0x38ad42(0x2b4)](this[_0x38ad42(0x23e)][_0x38ad42(0x3e2)](this,_0x4b524d,_0x254844,_0x91a4c5,_0x815dbf,_0x2ceee8,_0x5b0bf2));},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x23e)]=function(_0x27b949,_0x1a3eda,_0x141d40,_0x5d8230,_0x4c165a,_0x5d31c0){const _0x442768=_0x1aecd6,_0x63cc06=_0x4c165a-_0x27b949[_0x442768(0x3ee)];_0x141d40+=_0x63cc06/0x2;if(_0x63cc06<0x0)_0x4c165a-=_0x63cc06;_0x4c165a=(_0x4c165a||ImageManager[_0x442768(0x3e1)])-0x2,_0x5d31c0=(_0x5d31c0||ImageManager[_0x442768(0x279)])-0x2;const _0x1fddee=_0x27b949[_0x442768(0x3ee)],_0x184ad6=_0x27b949[_0x442768(0x217)],_0x1d884c=_0x4c165a,_0x544173=_0x5d31c0-0x2,_0x2b2e27=_0x141d40+Math[_0x442768(0x371)](_0x1d884c/0x2),_0x5551ab=_0x5d8230+Math[_0x442768(0x1de)]((_0x5d31c0+_0x184ad6)/0x2),_0x103493=Math[_0x442768(0x346)](_0x4c165a,_0x1fddee),_0x35f1e2=Math['min'](_0x5d31c0,_0x184ad6),_0x59f80f=_0x141d40+0x1,_0x104531=Math['max'](_0x5d8230+0x1,_0x5d8230+_0x544173-_0x184ad6+0x3),_0x931621=(_0x1fddee-_0x103493)/0x2,_0x5643f8=(_0x184ad6-_0x35f1e2)/0x2;this[_0x442768(0x1f0)]['blt'](_0x27b949,_0x931621,_0x5643f8,_0x103493,_0x35f1e2,_0x59f80f,_0x104531);},Window_StatusData[_0x1aecd6(0x3fc)]['basicDataHeight']=function(){const _0x835371=_0x1aecd6;let _0x5843b1=0x5;return this[_0x835371(0x2b8)]-this[_0x835371(0x1aa)]()*0x5<this[_0x835371(0x1aa)]()*0x6&&(_0x835371(0x237)!=='xECzD'?_0x5843b1=0x4:_0x5d2929*=_0x223c70['ElementStatusCore'][_0x835371(0x1c8)](_0x11ff75,_0x250f63,_0xd4c4f8)),this[_0x835371(0x2b8)]-this[_0x835371(0x1aa)]()*_0x5843b1;},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x253)]=function(_0x606ebb,_0x29b5d8){const _0x34c2a6=_0x1aecd6,_0x3201bf=this['_actor'],_0x4bbb0e=new Rectangle(_0x606ebb,0x0,_0x29b5d8,this[_0x34c2a6(0x2b8)]),_0x488505=this['basicDataHeight']();if(this['isActorMenuImageAvailable']()){const _0x4a1028=_0x4bbb0e['width'],_0x3a404d=_0x4bbb0e[_0x34c2a6(0x217)],_0x594e46=_0x4bbb0e['x'],_0x101e65=_0x4bbb0e['y'];this['drawItemActorMenuImage'](_0x3201bf,_0x594e46,_0x101e65,_0x4a1028,_0x3a404d);}else{const _0x208b32=ImageManager[_0x34c2a6(0x3e1)],_0x4b0f11=ImageManager['faceHeight'],_0x474e32=_0x4bbb0e['x']+Math[_0x34c2a6(0x371)]((_0x4bbb0e[_0x34c2a6(0x3ee)]-_0x208b32)/0x2),_0x11ef11=_0x4bbb0e['y']+Math[_0x34c2a6(0x371)]((this[_0x34c2a6(0x2b8)]-_0x488505-_0x4b0f11)/0x2);this[_0x34c2a6(0x2f9)](_0x3201bf,_0x474e32,_0x11ef11,_0x208b32,_0x4b0f11);}},Window_Base[_0x1aecd6(0x3fc)]['drawActorFaceBack']=function(_0x210a7a,_0x2a227a,_0x553576,_0x2f2144,_0x2343f8){const _0x22174a=_0x1aecd6,_0x3cf2e2=_0x210a7a[_0x22174a(0x363)](),_0x14174c=_0x210a7a[_0x22174a(0x265)]();_0x2f2144=_0x2f2144||ImageManager[_0x22174a(0x3e1)],_0x2343f8=_0x2343f8||ImageManager[_0x22174a(0x279)];const _0x3817a0=ImageManager[_0x22174a(0x2b3)](_0x3cf2e2),_0x294ff2=ImageManager[_0x22174a(0x3e1)],_0x3b2375=ImageManager[_0x22174a(0x279)],_0xc1db76=Math['min'](_0x2f2144,_0x294ff2),_0x3b8629=Math[_0x22174a(0x346)](_0x2343f8,_0x3b2375),_0x7d7535=Math[_0x22174a(0x371)](_0x2a227a+Math[_0x22174a(0x32e)](_0x2f2144-_0x294ff2,0x0)/0x2),_0x2332db=Math[_0x22174a(0x371)](_0x553576+Math['max'](_0x2343f8-_0x3b2375,0x0)/0x2),_0x2e9dfc=_0x14174c%0x4*_0x294ff2+(_0x294ff2-_0xc1db76)/0x2,_0xc228a4=Math['floor'](_0x14174c/0x4)*_0x3b2375+(_0x3b2375-_0x3b8629)/0x2;this['contentsBack'][_0x22174a(0x41d)](_0x3817a0,_0x2e9dfc,_0xc228a4,_0xc1db76,_0x3b8629,_0x7d7535,_0x2332db);},Window_StatusData['prototype'][_0x1aecd6(0x42e)]=function(_0x575209){const _0x38d72b=_0x1aecd6,_0xbfb5ef=_0x38d72b(0x225)['format'](_0x575209);return VisuMZ[_0x38d72b(0x379)][_0x38d72b(0x34d)][_0x38d72b(0x26a)][_0xbfb5ef];},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x43f)]=function(_0x14510b,_0x462d3b,_0x3b7058,_0x458a39){const _0x473db3=_0x1aecd6,_0x50a8bf=this[_0x473db3(0x215)]();_0x458a39-=_0x50a8bf*0x2;if(Imported[_0x473db3(0x1b1)])this['drawParamText'](_0x462d3b+_0x50a8bf,_0x3b7058,_0x458a39,_0x14510b,![]);else{const _0x54570e=this[_0x473db3(0x1dc)](_0x14510b);this[_0x473db3(0x283)](ColorManager[_0x473db3(0x22a)]()),this[_0x473db3(0x1d2)](_0x54570e,_0x462d3b+_0x50a8bf,_0x3b7058,_0x458a39);}},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x1dc)]=function(_0x11849c){const _0x1f2856=_0x1aecd6;_0x11849c=_0x11849c[_0x1f2856(0x348)]()['trim']();const _0x5ddda1=[_0x1f2856(0x19d),_0x1f2856(0x400),_0x1f2856(0x37a),_0x1f2856(0x332),'MAT',_0x1f2856(0x196),_0x1f2856(0x357),'LUK'],_0x19f4ed=['HIT',_0x1f2856(0x3f1),'CRI',_0x1f2856(0x3e5),_0x1f2856(0x2d2),'MRF','CNT',_0x1f2856(0x3c2),_0x1f2856(0x3dd),_0x1f2856(0x2be)],_0x2db45c=[_0x1f2856(0x324),_0x1f2856(0x2d0),_0x1f2856(0x1a0),_0x1f2856(0x35e),_0x1f2856(0x42a),_0x1f2856(0x2df),_0x1f2856(0x3e3),_0x1f2856(0x402),_0x1f2856(0x190),'EXR'];if(_0x5ddda1[_0x1f2856(0x3c8)](_0x11849c))return TextManager[_0x1f2856(0x1ad)](_0x5ddda1[_0x1f2856(0x1c4)](_0x11849c));return _0x11849c;},Window_StatusData['prototype']['drawParamValue']=function(_0x4af3aa,_0x3ae833,_0x15f9c0,_0x331804){const _0x14e023=_0x1aecd6;this[_0x14e023(0x1fe)]();const _0x29939f=this[_0x14e023(0x215)](),_0x252e42=this[_0x14e023(0x321)](_0x4af3aa);this['drawText'](_0x252e42,_0x3ae833+_0x29939f,_0x15f9c0,_0x331804-_0x29939f*0x2,_0x14e023(0x2d4));},Window_StatusData['prototype'][_0x1aecd6(0x321)]=function(_0x1d148e){const _0x41c5cb=_0x1aecd6;_0x1d148e=_0x1d148e['toUpperCase']()[_0x41c5cb(0x173)]();const _0x2765f6=this[_0x41c5cb(0x356)];if(Imported[_0x41c5cb(0x1b1)]){if(_0x41c5cb(0x2ef)===_0x41c5cb(0x2ef))return _0x2765f6[_0x41c5cb(0x362)](_0x1d148e,!![]);else{var _0x533fef=_0x17cf08(_0x1417c2['$1']);_0x471392[_0x41c5cb(0x404)](_0x1a2338[_0x41c5cb(0x444)][_0x19a585],_0x533fef),_0x5595a4+=_0x533fef;}}else{const _0x39f325=[_0x41c5cb(0x19d),'MAXMP',_0x41c5cb(0x37a),_0x41c5cb(0x332),_0x41c5cb(0x28c),_0x41c5cb(0x196),'AGI','LUK'],_0x282bb2=[_0x41c5cb(0x3e0),'EVA',_0x41c5cb(0x31b),_0x41c5cb(0x3e5),_0x41c5cb(0x2d2),_0x41c5cb(0x410),_0x41c5cb(0x1a6),_0x41c5cb(0x3c2),'MRG',_0x41c5cb(0x2be)],_0x2d0b3e=[_0x41c5cb(0x324),_0x41c5cb(0x2d0),_0x41c5cb(0x1a0),_0x41c5cb(0x35e),_0x41c5cb(0x42a),'TCR','PDR','MDR',_0x41c5cb(0x190),'EXR'];if(_0x39f325[_0x41c5cb(0x3c8)](_0x1d148e)){if(_0x41c5cb(0x2f3)===_0x41c5cb(0x3b9)){const _0x1d0969=this['subject']()?this[_0x41c5cb(0x2bb)]()[_0x41c5cb(0x424)]():[];if(_0x5d7a58['some'](_0x517adb=>_0x1d0969[_0x41c5cb(0x3c8)](_0x517adb)))return 0x0;if(this['canBypassElementReflect']())return 0x0;return 0x1;}else return _0x2765f6[_0x41c5cb(0x1ad)](_0x39f325[_0x41c5cb(0x1c4)](_0x1d148e));}else{if(_0x282bb2[_0x41c5cb(0x3c8)](_0x1d148e)){const _0x539a6f=_0x2765f6[_0x41c5cb(0x35f)](_0x282bb2['indexOf'](_0x1d148e));return _0x41c5cb(0x1a7)[_0x41c5cb(0x411)](Math[_0x41c5cb(0x309)](_0x539a6f*0x64));}else{if(_0x2d0b3e[_0x41c5cb(0x3c8)](_0x1d148e)){if(_0x41c5cb(0x2e6)===_0x41c5cb(0x2e6)){const _0x19ff24=_0x2765f6['sparam'](_0x2d0b3e[_0x41c5cb(0x1c4)](_0x1d148e));return _0x41c5cb(0x1a7)[_0x41c5cb(0x411)](Math[_0x41c5cb(0x309)](_0x19ff24*0x64));}else{const _0xd06fec=this[_0x41c5cb(0x1c6)](_0x4d311e);if(_0xd06fec)_0x272a88['push'](_0xd06fec);}}}}}},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x221)]=function(){const _0x4d4acb=_0x1aecd6;VisuMZ[_0x4d4acb(0x379)][_0x4d4acb(0x34d)][_0x4d4acb(0x43d)][0x0][_0x4d4acb(0x1e2)]['call'](this);},Window_StatusData[_0x1aecd6(0x3fc)]['setDescriptionFontSizeToTraitSet']=function(){const _0x27a221=_0x1aecd6;this[_0x27a221(0x24f)]=VisuMZ[_0x27a221(0x379)]['Settings'][_0x27a221(0x26a)][_0x27a221(0x33c)];},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x240)]=function(){const _0x1284c9=_0x1aecd6;this[_0x1284c9(0x24f)]=$gameSystem[_0x1284c9(0x409)]();},Window_StatusData['prototype'][_0x1aecd6(0x2a1)]=function(_0x418c3e,_0x5e4c4a,_0x44badc,_0x22bffd,_0x3ec3af){const _0x5ba5a5=_0x1aecd6;if(VisuMZ['ElementStatusCore'][_0x5ba5a5(0x34d)]['StatusMenu'][_0x5ba5a5(0x243)]===![])return;_0x3ec3af=Math[_0x5ba5a5(0x32e)](_0x3ec3af||0x1,0x1);while(_0x3ec3af--){if(_0x5ba5a5(0x2e4)!==_0x5ba5a5(0x30e)){_0x22bffd=_0x22bffd||this[_0x5ba5a5(0x1aa)](),this['contents'][_0x5ba5a5(0x1ed)]=0xa0;const _0x28e050=ColorManager[_0x5ba5a5(0x438)]();this[_0x5ba5a5(0x17a)][_0x5ba5a5(0x325)](_0x418c3e+0x1,_0x5e4c4a+0x1,_0x44badc-0x2,_0x22bffd-0x2,_0x28e050),this[_0x5ba5a5(0x17a)][_0x5ba5a5(0x1ed)]=0xff;}else{const _0x5dee6d=this['dataWindowRect']();this[_0x5ba5a5(0x447)]=new _0x1f148f(_0x5dee6d),this[_0x5ba5a5(0x207)](this[_0x5ba5a5(0x447)]),this[_0x5ba5a5(0x276)][_0x5ba5a5(0x20d)](this[_0x5ba5a5(0x447)]);}}},ColorManager[_0x1aecd6(0x438)]=function(){const _0x41e1f8=_0x1aecd6,_0x421adc=VisuMZ[_0x41e1f8(0x379)][_0x41e1f8(0x34d)]['StatusMenu'];let _0x525b6a=_0x421adc[_0x41e1f8(0x42b)]!==undefined?_0x421adc[_0x41e1f8(0x42b)]:0x13;return ColorManager[_0x41e1f8(0x3a1)](_0x525b6a);},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x25f)]=function(){const _0x5737d7=_0x1aecd6,_0x5a4027='-------',_0x5e1e3d=this[_0x5737d7(0x1aa)](),_0x13b87e=this[_0x5737d7(0x24c)](),_0x55806c=this['basicDataHeight'](),_0x2dcabe=this[_0x5737d7(0x356)],_0x2e2971=this[_0x5737d7(0x215)](),_0x1c45ca=this[_0x5737d7(0x1cb)]/0x2;let _0x4e7293=new Rectangle(0x0,0x0,_0x1c45ca,this[_0x5737d7(0x2b8)]),_0x31bdcb=0x0,_0x4b8008=0x0;this['drawActorGraphic'](0x0,this[_0x5737d7(0x1cb)]/0x2);let _0x49f6af=_0x4e7293['x'],_0xb5257e=Math[_0x5737d7(0x32e)](_0x4e7293['y'],_0x4e7293['y']+(_0x4e7293[_0x5737d7(0x217)]-_0x55806c)),_0x3784b5=_0x4e7293[_0x5737d7(0x3ee)],_0x513622=_0x4e7293['y']+_0x4e7293[_0x5737d7(0x217)]-_0xb5257e;this[_0x5737d7(0x2a1)](0x0,_0xb5257e,_0x3784b5,_0x5e1e3d,0x2),this[_0x5737d7(0x1d2)](_0x2dcabe[_0x5737d7(0x38c)](),_0x49f6af,_0xb5257e,_0x3784b5,_0x5737d7(0x32b)),_0x49f6af=_0x4e7293['x']+Math[_0x5737d7(0x309)]((_0x4e7293[_0x5737d7(0x3ee)]-0x80)/0x2),_0xb5257e+=_0x5e1e3d,this[_0x5737d7(0x2a1)](0x0,_0xb5257e,_0x3784b5,_0x5e1e3d),this[_0x5737d7(0x254)](_0x2dcabe,_0x49f6af,_0xb5257e);const _0x1ce36a=_0x2dcabe[_0x5737d7(0x29e)]()['name'];_0x49f6af=_0x4e7293['x']+Math[_0x5737d7(0x309)]((_0x4e7293[_0x5737d7(0x3ee)]-this[_0x5737d7(0x2c8)](_0x1ce36a)[_0x5737d7(0x3ee)])/0x2),_0xb5257e+=_0x5e1e3d,this[_0x5737d7(0x2a1)](0x0,_0xb5257e,_0x3784b5,_0x5e1e3d),this[_0x5737d7(0x182)](_0x1ce36a,_0x49f6af,_0xb5257e,_0x3784b5),_0x49f6af=_0x4e7293['x']+Math[_0x5737d7(0x309)]((_0x4e7293['width']-0x90)/0x2),_0xb5257e+=_0x5e1e3d,this[_0x5737d7(0x2a1)](0x0,_0xb5257e,_0x3784b5,_0x5e1e3d),this[_0x5737d7(0x199)](_0x2dcabe,_0x49f6af,_0xb5257e),_0x49f6af=_0x4e7293['x']+Math['round']((_0x4e7293['width']-0x80)/0x2),_0xb5257e+=_0x5e1e3d,this[_0x5737d7(0x2a1)](0x0,_0xb5257e,_0x3784b5,this[_0x5737d7(0x2b8)]-_0xb5257e),this[_0x5737d7(0x236)](_0x2dcabe,'hp',_0x49f6af,_0xb5257e),_0xb5257e+=_0x13b87e,this[_0x5737d7(0x236)](_0x2dcabe,'mp',_0x49f6af,_0xb5257e),_0xb5257e+=_0x13b87e;$dataSystem[_0x5737d7(0x259)]&&this['placeGauge'](_0x2dcabe,'tp',_0x49f6af,_0xb5257e);_0x4e7293=new Rectangle(_0x1c45ca,0x0,_0x1c45ca,this[_0x5737d7(0x2b8)]),this[_0x5737d7(0x283)](ColorManager[_0x5737d7(0x22a)]()),this['drawItemDarkRect'](_0x4e7293['x'],_0x4e7293['y'],_0x4e7293[_0x5737d7(0x3ee)],_0x5e1e3d,0x2),this[_0x5737d7(0x1d2)](TextManager[_0x5737d7(0x219)],_0x4e7293['x'],_0x4e7293['y'],_0x4e7293[_0x5737d7(0x3ee)],_0x5737d7(0x32b));const _0x48e414=_0x5e1e3d*0x5;this[_0x5737d7(0x2a1)](_0x4e7293['x'],_0x4e7293['y']+_0x5e1e3d*0x1,_0x4e7293[_0x5737d7(0x3ee)],_0x5e1e3d*0x2),this[_0x5737d7(0x2a1)](_0x4e7293['x'],_0x4e7293['y']+_0x5e1e3d*0x3,_0x4e7293[_0x5737d7(0x3ee)],_0x5e1e3d*0x2);const _0x10ccb9=TextManager[_0x5737d7(0x2b7)]['format'](TextManager[_0x5737d7(0x219)]),_0x24cea5=TextManager['expNext'][_0x5737d7(0x411)](TextManager['level']);this['changeTextColor'](ColorManager[_0x5737d7(0x22a)]()),this[_0x5737d7(0x1d2)](_0x10ccb9,_0x4e7293['x']+_0x2e2971,_0x4e7293['y']+_0x5e1e3d*0x1,_0x4e7293[_0x5737d7(0x3ee)]-_0x2e2971*0x2),this[_0x5737d7(0x1d2)](_0x24cea5,_0x4e7293['x']+_0x2e2971,_0x4e7293['y']+_0x5e1e3d*0x3,_0x4e7293[_0x5737d7(0x3ee)]-_0x2e2971*0x2),this[_0x5737d7(0x2f7)]();const _0x3c4320=_0x2dcabe[_0x5737d7(0x3d6)](),_0x2a91c8=_0x2dcabe[_0x5737d7(0x1e7)]()?_0x5a4027:_0x2dcabe['nextRequiredExp']();this[_0x5737d7(0x1d2)](_0x3c4320,_0x4e7293['x']+_0x2e2971,_0x4e7293['y']+_0x5e1e3d*0x1,_0x4e7293[_0x5737d7(0x3ee)]-_0x2e2971*0x2,_0x5737d7(0x2d4)),this['drawText'](_0x2a91c8,_0x4e7293['x']+_0x2e2971,_0x4e7293['y']+_0x5e1e3d*0x3,_0x4e7293[_0x5737d7(0x3ee)]-_0x2e2971*0x2,_0x5737d7(0x2d4)),_0x4b8008=_0x4e7293['y']+_0x48e414,this['changeTextColor'](ColorManager['systemColor']()),this[_0x5737d7(0x2a1)](_0x4e7293['x'],_0x4b8008,_0x4e7293[_0x5737d7(0x3ee)],_0x5e1e3d,0x2),this[_0x5737d7(0x1d2)](TextManager[_0x5737d7(0x31f)],_0x4e7293['x'],_0x4b8008,_0x4e7293[_0x5737d7(0x3ee)],_0x5737d7(0x32b)),this[_0x5737d7(0x2f7)](),_0x4b8008+=_0x5e1e3d;const _0x33f4fc=_0x2dcabe['getBiography']();this['drawItemDarkRect'](_0x4e7293['x'],_0x4b8008,_0x4e7293[_0x5737d7(0x3ee)],this[_0x5737d7(0x2b8)]-_0x4b8008),this['drawTextEx'](_0x33f4fc,_0x4e7293['x']+_0x2e2971,_0x4b8008,_0x4e7293['width']-_0x2e2971*0x2);},Window_StatusData['prototype'][_0x1aecd6(0x2c7)]=function(){const _0x4db402=_0x1aecd6,_0x20d3ae=this[_0x4db402(0x1aa)](),_0x4c93ca=this['gaugeLineHeight'](),_0x4efd1f=this[_0x4db402(0x263)](),_0x20f183=this[_0x4db402(0x215)]()*0x2,_0x529ff8=Math[_0x4db402(0x371)](this[_0x4db402(0x1cb)]/0x3);let _0x1f942a=0x0,_0x38d834=0x0,_0x16e4aa=0x0;this[_0x4db402(0x253)](0x0,this[_0x4db402(0x1cb)]/0x2);let _0x354141=new Rectangle(0x0,0x0,_0x529ff8,this[_0x4db402(0x2b8)]);const _0x4bc31b=this['getParameterList'](0x1),_0x48b108=this[_0x4db402(0x42e)](0x2),_0x14434e=this[_0x4db402(0x42e)](0x3),_0x33ace8=Math[_0x4db402(0x32e)](_0x4bc31b['length'],_0x48b108[_0x4db402(0x1bc)],_0x14434e[_0x4db402(0x1bc)]),_0xfa8c86=_0x354141[_0x4db402(0x3ee)]-_0x20f183*0x2-this[_0x4db402(0x250)](_0x4db402(0x231)),_0x56aa4f=Math[_0x4db402(0x32e)]((this[_0x4db402(0x2b8)]-_0x33ace8*_0x20d3ae)/0x2,0x0);_0x1f942a=_0x354141['x']+_0x20f183,_0x38d834=_0x56aa4f,_0x16e4aa=_0x354141[_0x4db402(0x3ee)]-_0x20f183*0x2;if(_0x38d834!==0x0)this[_0x4db402(0x2a1)](_0x354141['x'],0x0,_0x354141[_0x4db402(0x3ee)],_0x38d834);for(const _0x27b7ed of _0x4bc31b){this[_0x4db402(0x2a1)](_0x354141['x'],_0x38d834,_0x354141[_0x4db402(0x3ee)],_0x20d3ae),this['drawParamName'](_0x27b7ed,_0x1f942a,_0x38d834,_0xfa8c86),this[_0x4db402(0x22f)](_0x27b7ed,_0x1f942a,_0x38d834,_0x16e4aa),_0x38d834+=_0x20d3ae;}this[_0x4db402(0x2a1)](_0x354141['x'],_0x38d834,_0x354141[_0x4db402(0x3ee)],this['innerHeight']-_0x38d834),_0x354141['x']+=_0x354141['width'],_0x1f942a=_0x354141['x']+_0x20f183,_0x38d834=_0x56aa4f,_0x16e4aa=_0x354141[_0x4db402(0x3ee)]-_0x20f183*0x2;if(_0x38d834!==0x0)this[_0x4db402(0x2a1)](_0x354141['x'],0x0,_0x354141[_0x4db402(0x3ee)],_0x38d834);for(const _0x228800 of _0x48b108){this[_0x4db402(0x2a1)](_0x354141['x'],_0x38d834,_0x354141[_0x4db402(0x3ee)],_0x20d3ae),this[_0x4db402(0x43f)](_0x228800,_0x1f942a,_0x38d834,_0xfa8c86),this[_0x4db402(0x22f)](_0x228800,_0x1f942a,_0x38d834,_0x16e4aa),_0x38d834+=_0x20d3ae;}this[_0x4db402(0x2a1)](_0x354141['x'],_0x38d834,_0x354141[_0x4db402(0x3ee)],this[_0x4db402(0x2b8)]-_0x38d834),_0x354141['x']+=_0x354141['width'],_0x354141['width']=this[_0x4db402(0x1cb)]-_0x354141['x'],_0x1f942a=_0x354141['x']+_0x20f183,_0x38d834=_0x56aa4f,_0x16e4aa=_0x354141[_0x4db402(0x3ee)]-_0x20f183*0x2;if(_0x38d834!==0x0)this[_0x4db402(0x2a1)](_0x354141['x'],0x0,_0x354141[_0x4db402(0x3ee)],_0x38d834);for(const _0x723380 of _0x14434e){this[_0x4db402(0x2a1)](_0x354141['x'],_0x38d834,_0x354141['width'],_0x20d3ae),this['drawParamName'](_0x723380,_0x1f942a,_0x38d834,_0xfa8c86),this[_0x4db402(0x22f)](_0x723380,_0x1f942a,_0x38d834,_0x16e4aa),_0x38d834+=_0x20d3ae;}this['drawItemDarkRect'](_0x354141['x'],_0x38d834,_0x354141[_0x4db402(0x3ee)],this[_0x4db402(0x2b8)]-_0x38d834);},Window_StatusData[_0x1aecd6(0x3fc)]['drawProperties']=function(){const _0x1a5ac6=_0x1aecd6,_0x5cc0a6=Window_StatusData[_0x1a5ac6(0x39e)],_0x32b17e=Window_StatusData[_0x1a5ac6(0x431)],_0xfb89e6=this[_0x1a5ac6(0x1aa)](),_0x50c046=this[_0x1a5ac6(0x356)],_0x30fab5=this[_0x1a5ac6(0x215)](),_0x5cad49=this[_0x1a5ac6(0x2b8)]/Math[_0x1a5ac6(0x32e)](_0x5cc0a6['length'],_0x32b17e['length'])-_0xfb89e6,_0x14802d=this[_0x1a5ac6(0x1cb)]/0x2;let _0x54ea9d=0x0,_0x4b0547=0x0;this[_0x1a5ac6(0x253)](0x0,_0x14802d);for(const _0x2a2c75 of _0x5cc0a6){if(_0x1a5ac6(0x22b)===_0x1a5ac6(0x22b)){const _0x3ec916=DataManager[_0x1a5ac6(0x301)](_0x2a2c75),_0x1ca840=_0x50c046[_0x1a5ac6(0x3e4)](_0x2a2c75);this[_0x1a5ac6(0x2a1)](0x0,_0x4b0547,_0x14802d,_0xfb89e6,0x2);const _0x258ee0=_0x1a5ac6(0x437)[_0x1a5ac6(0x411)](_0x3ec916['Label'],_0x1ca840[_0x1a5ac6(0x302)]);this[_0x1a5ac6(0x182)](_0x258ee0,_0x30fab5,_0x4b0547,_0x14802d-_0x30fab5*0x2),_0x4b0547+=_0xfb89e6,this['setDescriptionFontSizeToTraitSet'](),this['drawItemDarkRect'](0x0,_0x4b0547,_0x14802d,_0x5cad49),this[_0x1a5ac6(0x182)](_0x1ca840[_0x1a5ac6(0x186)],_0x30fab5,_0x4b0547,_0x14802d-_0x30fab5*0x2),_0x4b0547+=_0x5cad49,this[_0x1a5ac6(0x240)]();}else{let _0x447281=0x1;if(!_0x47f16a)return _0x447281;const _0x6c48bd=/<ACCURACY VS (.*) TRAIT:[ ](\d+)([%％])>/gi;return _0x589454[_0x1a5ac6(0x379)][_0x1a5ac6(0x1c8)](_0x5e8294,this[_0x1a5ac6(0x345)](),_0x6c48bd);}}this[_0x1a5ac6(0x2b8)]-_0x4b0547>0x0&&(_0x1a5ac6(0x342)!==_0x1a5ac6(0x256)?this[_0x1a5ac6(0x2a1)](0x0,_0x4b0547,_0x14802d,this[_0x1a5ac6(0x2b8)]-_0x4b0547):(_0x537b1b=this[_0x1a5ac6(0x2bc)](0x2),_0x37815b['length']<=0x0&&(_0x1eb4b6=this[_0x1a5ac6(0x373)]())));_0x4b0547=0x0;for(const _0x530014 of _0x32b17e){const _0x542f78=DataManager[_0x1a5ac6(0x301)](_0x530014),_0x473733=_0x50c046[_0x1a5ac6(0x3e4)](_0x530014);this[_0x1a5ac6(0x2a1)](_0x14802d,_0x4b0547,_0x14802d,_0xfb89e6,0x2);const _0x17f5cf=_0x1a5ac6(0x437)[_0x1a5ac6(0x411)](_0x542f78[_0x1a5ac6(0x24d)],_0x473733['Display']);this['drawTextEx'](_0x17f5cf,_0x14802d+_0x30fab5,_0x4b0547,_0x14802d-_0x30fab5*0x2),_0x4b0547+=_0xfb89e6,this['setDescriptionFontSizeToTraitSet'](),this['drawItemDarkRect'](_0x14802d,_0x4b0547,_0x14802d,_0x5cad49),this[_0x1a5ac6(0x182)](_0x473733[_0x1a5ac6(0x186)],_0x14802d+_0x30fab5,_0x4b0547,_0x14802d-_0x30fab5*0x2),_0x4b0547+=_0x5cad49,this[_0x1a5ac6(0x240)]();}if(this[_0x1a5ac6(0x2b8)]-_0x4b0547>0x0){if(_0x1a5ac6(0x24a)===_0x1a5ac6(0x24a))this['drawItemDarkRect'](_0x14802d,_0x4b0547,_0x14802d,this[_0x1a5ac6(0x2b8)]-_0x4b0547);else{let _0x3ce1ae=_0x1cb3a5[_0x1a5ac6(0x379)][_0x1a5ac6(0x34d)][_0x1a5ac6(0x1fd)]['EnemyNameFmt'];return this['enemy']()['note'][_0x1a5ac6(0x351)](/<TRAIT SET NAME FORMAT>\s*([\s\S]*)\s*<\/TRAIT SET NAME FORMAT>/i)&&(_0x3ce1ae=_0x9ff515(_0x5305e1['$1'])),_0x3ce1ae=_0x3ce1ae[_0x1a5ac6(0x308)](/\[ELEMENT\]/gi,'%1'),_0x3ce1ae=_0x3ce1ae[_0x1a5ac6(0x308)](/\[SUBELEMENT\]/gi,'%2'),_0x3ce1ae=_0x3ce1ae[_0x1a5ac6(0x308)](/\[GENDER\]/gi,'%3'),_0x3ce1ae=_0x3ce1ae[_0x1a5ac6(0x308)](/\[RACE\]/gi,'%4'),_0x3ce1ae=_0x3ce1ae[_0x1a5ac6(0x308)](/\[NATURE\]/gi,'%5'),_0x3ce1ae=_0x3ce1ae[_0x1a5ac6(0x308)](/\[ALIGNMENT\]/gi,'%6'),_0x3ce1ae=_0x3ce1ae[_0x1a5ac6(0x308)](/\[BLESSING\]/gi,'%7'),_0x3ce1ae=_0x3ce1ae[_0x1a5ac6(0x308)](/\[CURSE\]/gi,'%8'),_0x3ce1ae=_0x3ce1ae[_0x1a5ac6(0x308)](/\[ZODIAC\]/gi,'%9'),_0x3ce1ae=_0x3ce1ae[_0x1a5ac6(0x308)](/\[VARIANT\]/gi,_0x1a5ac6(0x18e)),_0x3ce1ae=_0x3ce1ae[_0x1a5ac6(0x308)](/\[NAME\]/gi,_0x1a5ac6(0x394)),_0x3ce1ae=_0x3ce1ae[_0x1a5ac6(0x308)](/\[LETTER\]/gi,_0x1a5ac6(0x40b)),_0x3ce1ae;}}},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x373)]=function(){const _0x7be4a0=_0x1aecd6,_0x1006c3=[0x0][_0x7be4a0(0x43e)](this[_0x7be4a0(0x319)]());return[...Array($dataSystem[_0x7be4a0(0x213)][_0x7be4a0(0x1bc)])['keys']()][_0x7be4a0(0x42f)](_0xa3b213=>!_0x1006c3[_0x7be4a0(0x3c8)](_0xa3b213));},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x319)]=function(){const _0x543e97=_0x1aecd6;return[0x0][_0x543e97(0x43e)](VisuMZ[_0x543e97(0x379)]['Settings'][_0x543e97(0x26a)][_0x543e97(0x3df)]);},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x3e7)]=function(){const _0x46853d=_0x1aecd6,_0x95020=[0x0][_0x46853d(0x43e)](this[_0x46853d(0x319)]());let _0x4b1d6c=this[_0x46853d(0x2bc)](0x1);if(_0x4b1d6c['length']<=0x0){_0x4b1d6c=this[_0x46853d(0x2bc)](0x2);if(_0x4b1d6c[_0x46853d(0x1bc)]<=0x0){if(_0x46853d(0x22c)===_0x46853d(0x22c))_0x4b1d6c=this[_0x46853d(0x373)]();else{const _0xcef932=_0x3123c6['parse']('['+_0x2ccdee['$1'][_0x46853d(0x351)](/\d+/g)+']');_0x22f2ea=_0xf01a30['concat'](_0xcef932);}}}return _0x4b1d6c[_0x46853d(0x42f)](_0x49442f=>!_0x95020[_0x46853d(0x3c8)](_0x49442f));},Window_StatusData['prototype']['getElementIDsCol2']=function(){const _0x218c3f=_0x1aecd6,_0x19f2af=[0x0][_0x218c3f(0x43e)](this[_0x218c3f(0x319)]());let _0x249b16=this['getElementIDsColRaw'](0x2);return _0x249b16[_0x218c3f(0x42f)](_0x584545=>!_0x19f2af[_0x218c3f(0x3c8)](_0x584545));},Window_StatusData[_0x1aecd6(0x3fc)]['getElementIDsColRaw']=function(_0x54d36e){const _0x55ee81=_0x1aecd6,_0x13a25f=[0x0][_0x55ee81(0x43e)](this[_0x55ee81(0x319)]());let _0x4197f2=VisuMZ[_0x55ee81(0x379)][_0x55ee81(0x34d)]['StatusMenu']['ElementsCol%1'[_0x55ee81(0x411)](_0x54d36e)]??[];return _0x4197f2[_0x55ee81(0x42f)](_0x1fb876=>!_0x13a25f[_0x55ee81(0x3c8)](_0x1fb876));},Window_StatusData['prototype'][_0x1aecd6(0x350)]=function(){const _0x49a456=_0x1aecd6,_0xda6ad3=this['lineHeight'](),_0x8050a7=this['_actor'],_0x4e4d86=this[_0x49a456(0x215)](),_0x4f76f1=_0x49a456(0x437),_0x1727ee=DataManager[_0x49a456(0x301)]('Element'),_0x2e427a=_0x8050a7[_0x49a456(0x3e4)]('Element'),_0x126ce0=DataManager[_0x49a456(0x301)](_0x49a456(0x261)),_0x2e1100=_0x8050a7['traitSet'](_0x49a456(0x261)),_0x3a6947=this[_0x49a456(0x2b8)]/Math[_0x49a456(0x32e)](Window_StatusData[_0x49a456(0x39e)][_0x49a456(0x1bc)],Window_StatusData[_0x49a456(0x431)][_0x49a456(0x1bc)])-_0xda6ad3;let _0x9d60fb=0x0,_0x4e5a29=0x0,_0x519db3=this[_0x49a456(0x1cb)]/0x2;this[_0x49a456(0x253)](0x0,_0x519db3);if(_0x1727ee['Visible']||_0x126ce0[_0x49a456(0x353)]){if(_0x49a456(0x1e5)===_0x49a456(0x3b4)){let _0x4744b2=0x0;if(!_0x596915)return _0x4744b2;const _0x26da4f=/<ACCURACY VS (.*) TRAIT:[ ]([\+\-]\d+)([%％])>/gi;return _0x30cf15[_0x49a456(0x379)]['TraitCheckNotetagPlus'](_0x558928,this[_0x49a456(0x345)](),_0x26da4f);}else{this[_0x49a456(0x2a1)](_0x9d60fb,_0x4e5a29,_0x519db3,_0xda6ad3,0x2),this[_0x49a456(0x2a1)](_0x519db3,_0x4e5a29,_0x519db3,_0xda6ad3,0x2);_0x1727ee[_0x49a456(0x353)]&&this[_0x49a456(0x182)](_0x4f76f1[_0x49a456(0x411)](_0x1727ee[_0x49a456(0x24d)],_0x2e427a['Display']),_0x4e4d86,_0x4e5a29,_0x519db3-_0x4e4d86*0x2);if(_0x126ce0['Visible']){if(_0x49a456(0x29a)===_0x49a456(0x29a))this[_0x49a456(0x182)](_0x4f76f1[_0x49a456(0x411)](_0x126ce0[_0x49a456(0x24d)],_0x2e1100[_0x49a456(0x302)]),_0x519db3+_0x4e4d86,_0x4e5a29,_0x519db3-_0x4e4d86*0x2);else{const _0x1fe391=this[_0x49a456(0x318)](_0x4cdd99),_0x5c543e=_0x5c3436[_0x49a456(0x3e4)](_0x5a5bbd,_0x1fe391);_0x2f5fcb=_0x1635b1[_0x49a456(0x43e)](_0x5c543e[_0x49a456(0x367)]);}}_0x4e5a29+=_0xda6ad3,this[_0x49a456(0x314)](),this[_0x49a456(0x2a1)](_0x9d60fb,_0x4e5a29,_0x519db3,_0x3a6947),this[_0x49a456(0x2a1)](_0x519db3,_0x4e5a29,_0x519db3,_0x3a6947),_0x1727ee[_0x49a456(0x353)]&&this[_0x49a456(0x182)](_0x2e427a[_0x49a456(0x186)],_0x4e4d86,_0x4e5a29,_0x519db3-_0x4e4d86*0x2),_0x126ce0['Visible']&&this[_0x49a456(0x182)](_0x2e1100['Description'],_0x519db3+_0x4e4d86,_0x4e5a29,_0x519db3-_0x4e4d86*0x2),this[_0x49a456(0x240)](),this[_0x49a456(0x1fe)](),_0x4e5a29+=_0x3a6947;}}const _0x47c38b=_0x4e5a29,_0x3cac29=this[_0x49a456(0x3e7)](),_0x38bb96=this[_0x49a456(0x374)]();let _0x52a7d5;_0x38bb96[_0x49a456(0x1bc)]>0x0?_0x52a7d5=[_0x49a456(0x3ae),'Resist','Bonus','Bonus']:_0x52a7d5=[_0x49a456(0x3ae),_0x49a456(0x452)];const _0x545bb6=Math[_0x49a456(0x32e)](_0x3cac29['length'],_0x38bb96[_0x49a456(0x1bc)],0x1),_0xfe9d30=_0x52a7d5[_0x49a456(0x1bc)];this[_0x49a456(0x2a1)](_0x519db3*0x0,_0x4e5a29,_0x519db3,_0xda6ad3,0x2),this['drawItemDarkRect'](_0x519db3*0x1,_0x4e5a29,_0x519db3,_0xda6ad3,0x2),this[_0x49a456(0x283)](ColorManager[_0x49a456(0x22a)]()),this['drawText'](TextManager[_0x49a456(0x1cd)],_0x519db3*0x0,_0x4e5a29,_0x519db3,_0x49a456(0x32b)),this[_0x49a456(0x1d2)](TextManager[_0x49a456(0x30a)],_0x519db3*0x1,_0x4e5a29,_0x519db3,_0x49a456(0x32b)),_0x4e5a29+=_0xda6ad3,this[_0x49a456(0x314)]();const _0x31e1f6=this[_0x49a456(0x2c8)]('\x20')['height'];for(let _0x32457b=0x0;_0x32457b<_0x545bb6;_0x32457b++){for(let _0x1cd561=0x0;_0x1cd561<_0xfe9d30;_0x1cd561++){if(_0x49a456(0x27c)!=='LafoM'){const _0xb57046=/^\d+$/[_0x49a456(0x30c)](_0x596bcd);if(_0xb57046)_0x461da4['push'](_0x154852(_0x42a79e));else{const _0x188bf4=this[_0x49a456(0x1c6)](_0x1a2d5b);if(_0x188bf4)_0x17cd35[_0x49a456(0x355)](_0x188bf4);}}else{const _0x264a04=this['innerWidth']/_0xfe9d30;this['drawItemDarkRect'](_0x264a04*_0x1cd561,_0x4e5a29,_0x264a04,_0x31e1f6);let _0x414d28=_0x3cac29[_0x32457b];if(_0xfe9d30===0x4){if(_0x49a456(0x1d8)===_0x49a456(0x1d8))_0x414d28=_0x1cd561%0x2===0x0?_0x3cac29[_0x32457b]:_0x38bb96[_0x32457b];else return this[_0x49a456(0x251)]();}if(!_0x414d28)continue;const _0x597df6=$dataSystem[_0x49a456(0x213)][_0x414d28];this[_0x49a456(0x182)](_0x597df6,_0x264a04*(_0x1cd561+0x1/0x3)+_0x4e4d86,_0x4e5a29,_0x264a04*0x2/0x3);const _0x24e693=_0x52a7d5[_0x1cd561];this[_0x49a456(0x1fe)]();let _0xb349d6='';if(_0x24e693===_0x49a456(0x3ae)){if(_0x49a456(0x272)===_0x49a456(0x272)){const _0x38a2c6=_0x8050a7[_0x49a456(0x2a9)](_0x414d28),_0x18373f=(_0x38a2c6-0x1)*-0x1;this['changeTextColor'](ColorManager[_0x49a456(0x206)](_0x18373f)),_0xb349d6=_0x49a456(0x1a7)['format'](Math['round'](_0x18373f*0x64));if(_0x8050a7[_0x49a456(0x3c3)]()[_0x49a456(0x3c8)](_0x414d28))this['changeTextColor'](ColorManager[_0x49a456(0x1d1)]()),_0xb349d6=TextManager[_0x49a456(0x366)][_0x49a456(0x411)](Math[_0x49a456(0x309)](_0x38a2c6*0x64));else{if(_0x38a2c6>0x1)_0xb349d6='%1'[_0x49a456(0x411)](_0xb349d6);else _0x38a2c6<=0x1&&(_0xb349d6=_0x49a456(0x3ff)[_0x49a456(0x411)](_0xb349d6));}}else _0x1f9a06=_0x4f7df2[_0x49a456(0x43e)](this[_0x49a456(0x2bb)]()['attackElements']());}else{if(_0x24e693==='Bonus'){if('crrof'!==_0x49a456(0x212)){const _0x1a7b7c=_0x8050a7[_0x49a456(0x422)](_0x414d28),_0x28d4fb=_0x8050a7[_0x49a456(0x41c)](_0x414d28),_0x378d9d=_0x8050a7[_0x49a456(0x412)](_0x414d28),_0x54af2e=(0x1+_0x1a7b7c)*_0x28d4fb+_0x378d9d-0x1;this['changeTextColor'](ColorManager[_0x49a456(0x206)](_0x54af2e)),_0xb349d6=_0x49a456(0x1a7)[_0x49a456(0x411)](Math[_0x49a456(0x309)](_0x54af2e*0x64));if(_0x54af2e>=0x0)_0xb349d6=_0x49a456(0x3ff)[_0x49a456(0x411)](_0xb349d6);}else _0x47ee44=this[_0x49a456(0x276)]['y']+this[_0x49a456(0x276)]['height'];}}this['contents'][_0x49a456(0x1d2)](_0xb349d6,_0x264a04*_0x1cd561,_0x4e5a29,_0x264a04/0x3-_0x4e4d86,_0x31e1f6,_0x49a456(0x2d4));}}_0x4e5a29+=_0x31e1f6;}for(let _0xde31ca=0x0;_0xde31ca<_0xfe9d30;_0xde31ca++){const _0x264005=this['innerWidth']/_0xfe9d30;this[_0x49a456(0x2a1)](_0x264005*_0xde31ca,_0x4e5a29,_0x264005,this[_0x49a456(0x2b8)]-_0x4e5a29);}},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x354)]=function(_0x167050){const _0x2365f8=_0x1aecd6;this[_0x2365f8(0x1fe)]();let _0x59ed9c=0x0;for(const _0x438926 of _0x167050){if(_0x2365f8(0x2c9)===_0x2365f8(0x340))this['initialize'](...arguments);else{if(!_0x438926)continue;if(_0x438926[_0x2365f8(0x173)]()==='')continue;if(_0x438926[_0x2365f8(0x351)](/-----/i))continue;_0x59ed9c=Math[_0x2365f8(0x32e)](_0x59ed9c,this['textSizeEx'](_0x438926[_0x2365f8(0x173)]())[_0x2365f8(0x3ee)]);}}return _0x59ed9c;},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x3b6)]=function(){const _0x9b6794=_0x1aecd6;if(this[_0x9b6794(0x2cf)])return this['_stypeWidth'];return this[_0x9b6794(0x2cf)]=this[_0x9b6794(0x354)]($dataSystem[_0x9b6794(0x269)]),this[_0x9b6794(0x2cf)];},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x214)]=function(){const _0x7955c1=_0x1aecd6;if(this['_wtypeWidth'])return this[_0x7955c1(0x3b8)];return this[_0x7955c1(0x3b8)]=this['getDataSystemTypesWidth']($dataSystem[_0x7955c1(0x3fa)]),this[_0x7955c1(0x3b8)];},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x2aa)]=function(){const _0x5062fd=_0x1aecd6;if(this['_atypeWidth'])return this['_atypeWidth'];return this['_atypeWidth']=this['getDataSystemTypesWidth']($dataSystem[_0x5062fd(0x275)]),this['_atypeWidth'];},Window_StatusData[_0x1aecd6(0x3fc)][_0x1aecd6(0x2b6)]=function(){const _0x12df35=_0x1aecd6,_0x78efb4=this[_0x12df35(0x1aa)](),_0x24f041=this['_actor'],_0x30331c=Math[_0x12df35(0x371)](this[_0x12df35(0x1cb)]/0x3);let _0x363853=0x0,_0x5c9159=0x0;this[_0x12df35(0x253)](0x0,this[_0x12df35(0x1cb)]/0x2);let _0x31b352=new Rectangle(0x0,0x0,_0x30331c,this[_0x12df35(0x2b8)]);_0x363853=_0x31b352['x'],_0x5c9159=0x0,this[_0x12df35(0x1fe)](),this[_0x12df35(0x2a1)](_0x363853,_0x5c9159,_0x31b352['width'],_0x78efb4,0x2),this['changeTextColor'](ColorManager[_0x12df35(0x22a)]()),this[_0x12df35(0x1d2)](TextManager['statusMenuStype'],_0x363853,_0x5c9159,_0x31b352[_0x12df35(0x3ee)],_0x12df35(0x32b)),_0x5c9159+=_0x78efb4;for(const _0x4c0670 of _0x24f041[_0x12df35(0x269)]()){this[_0x12df35(0x2a1)](_0x363853,_0x5c9159,_0x31b352[_0x12df35(0x3ee)],_0x78efb4);if(_0x4c0670>0x0){if(_0x12df35(0x3ec)==='CCGpC'){const _0x36b938=$dataSystem[_0x12df35(0x269)][_0x4c0670],_0x21b652=Math['round']((_0x31b352[_0x12df35(0x3ee)]-this['stypeWidth']())/0x2);this[_0x12df35(0x182)](_0x36b938,_0x363853+_0x21b652,_0x5c9159,_0x31b352[_0x12df35(0x3ee)]-_0x21b652*0x2);}else{if(this[_0x12df35(0x291)]===_0x3eeeaf)this[_0x12df35(0x1f8)]();if(this[_0x12df35(0x291)][_0x356159]===_0x459a2a)this[_0x12df35(0x1f8)]();return this['_traitSets'][_0x1ea26e];}}_0x5c9159+=_0x78efb4;}this[_0x12df35(0x2a1)](_0x363853,_0x5c9159,_0x31b352[_0x12df35(0x3ee)],this['innerHeight']-_0x5c9159),_0x31b352['x']+=_0x31b352[_0x12df35(0x3ee)],_0x363853=_0x31b352['x'],_0x5c9159=0x0,this['resetFontSettings'](),this['drawItemDarkRect'](_0x363853,_0x5c9159,_0x31b352[_0x12df35(0x3ee)],_0x78efb4,0x2),this[_0x12df35(0x283)](ColorManager[_0x12df35(0x22a)]()),this[_0x12df35(0x1d2)](TextManager['statusMenuWtype'],_0x363853,_0x5c9159,_0x31b352[_0x12df35(0x3ee)],_0x12df35(0x32b)),_0x5c9159+=_0x78efb4;for(const _0x45eabc of _0x24f041[_0x12df35(0x3fa)]()){this[_0x12df35(0x2a1)](_0x363853,_0x5c9159,_0x31b352['width'],_0x78efb4);if(_0x45eabc>0x0){const _0x2b20bd=$dataSystem['weaponTypes'][_0x45eabc],_0x1316ef=Math[_0x12df35(0x309)]((_0x31b352[_0x12df35(0x3ee)]-this['wtypeWidth']())/0x2);this[_0x12df35(0x182)](_0x2b20bd,_0x363853+_0x1316ef,_0x5c9159,_0x31b352[_0x12df35(0x3ee)]-_0x1316ef*0x2);}_0x5c9159+=_0x78efb4;}this[_0x12df35(0x2a1)](_0x363853,_0x5c9159,_0x31b352[_0x12df35(0x3ee)],this['innerHeight']-_0x5c9159),_0x31b352['x']+=_0x31b352[_0x12df35(0x3ee)],_0x363853=_0x31b352['x'],_0x5c9159=0x0,_0x31b352[_0x12df35(0x3ee)]=this[_0x12df35(0x1cb)]-_0x31b352['x'],this[_0x12df35(0x1fe)](),this[_0x12df35(0x2a1)](_0x363853,_0x5c9159,_0x31b352[_0x12df35(0x3ee)],_0x78efb4,0x2),this[_0x12df35(0x283)](ColorManager[_0x12df35(0x22a)]()),this[_0x12df35(0x1d2)](TextManager[_0x12df35(0x310)],_0x363853,_0x5c9159,_0x31b352['width'],_0x12df35(0x32b)),_0x5c9159+=_0x78efb4;for(const _0x3f1d1a of _0x24f041[_0x12df35(0x275)]()){if(_0x12df35(0x18a)!==_0x12df35(0x1c9)){this[_0x12df35(0x2a1)](_0x363853,_0x5c9159,_0x31b352[_0x12df35(0x3ee)],_0x78efb4);if(_0x3f1d1a>0x0){if(_0x12df35(0x44e)!==_0x12df35(0x382)){const _0x38a72a=$dataSystem['armorTypes'][_0x3f1d1a],_0x214ba4=Math[_0x12df35(0x309)]((_0x31b352[_0x12df35(0x3ee)]-this['atypeWidth']())/0x2);this[_0x12df35(0x182)](_0x38a72a,_0x363853+_0x214ba4,_0x5c9159,_0x31b352[_0x12df35(0x3ee)]-_0x214ba4*0x2);}else{var _0x5690c0=_0x1eeb6c(_0x5900be['$1']);try{_0x2c01a0*=_0x2e9b0c(_0x5690c0);}catch(_0x171dcd){if(_0x3f0e16['isPlaytest']())_0x575451[_0x12df35(0x404)](_0x171dcd);}}}_0x5c9159+=_0x78efb4;}else this[_0x12df35(0x323)](_0xfb6aa9);}this['drawItemDarkRect'](_0x363853,_0x5c9159,_0x31b352[_0x12df35(0x3ee)],this['innerHeight']-_0x5c9159);};function _0x20bf(_0xae0129,_0x2403ee){const _0x676f5=_0x676f();return _0x20bf=function(_0x20bf8d,_0x2b4315){_0x20bf8d=_0x20bf8d-0x172;let _0x4efbfe=_0x676f5[_0x20bf8d];return _0x4efbfe;},_0x20bf(_0xae0129,_0x2403ee);}function _0x676f(){const _0x1f5a97=['IconSet','drawItemStyleIcon','TGR','fillRect','_svBattlerData','updatedLayoutStyle','Plus','gold','createElementStatusCore','center','logTraitSets','atRKw','max','yPNxx','30358100Neaslg','iconWidth','DEF','clamp','fill','vDQcv','FvWbP','loadPicture','traitsSet','QDLiW','SvMotionIdleSolo-%1-%2','mainAreaTop','TraitDescriptionFontSize','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','categoryWindowRect','EleDmgFlatFlt','RqxWJ','iconText','uokvP','mtKqg','jmHwK','item','min','Game_Enemy_transform','toUpperCase','Scene_Status_create','drawItemStyleIconText','ARRAYFUNC','executeDamage','Settings','sparam','FuKhz','drawElements','match','Race','Visible','getDataSystemTypesWidth','push','_actor','AGI','FTstS','Game_Actor_setup','uFkLO','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','maxItems','nextActor','PHA','xparam','getReceiveElementRate','TraitCheckNotetagPlus','paramValueByName','faceName','zbmor','random','statusMenuDmgAbsorb','Atypes','initMembers','Game_Enemy_name','CUCrN','iwrCY','Game_BattlerBase_canEquip','EXPRate','setTraitSet','helpWindowRectElementStatusCore','statusMenuWtype','floor','loadSystem','getElementIDs','getElementIDsCol2','fZvai','Gender','_addingPassiveStateTraitSets','Game_Action_clear','ElementStatusCore','ATK','TraitCol2','uiHelpPosition','createCommandNameWindow','4144XGwCgN','Game_Action_itemMrf','VocabWtype','_battleCoreNoElement','eGPcV','elementsRateSum','refreshActorElementStatusCore','_specialBattler','PassiveStates','shift','lbDqh','isArray','SParam%1','LHEXi','name','call','itemCri','calcUserElementDamageRate','Params','pagedown','setText','Step1','%11','EleDmgRateFlt','sPeZU','RuleAverageCalcJS','Flt','itemMrf','GJahM','nRkYG','index','getForceReceivedElementRate','traitCol1','isBottomHelpMode','xparamRateTraitSets','getColor','Zodiac','tdyQw','===\x20%1\x27s\x20Trait\x20Sets\x20===','drawing','vDgOQ','average','wtypeOkTraitSets','note','Game_Enemy_setLetter','attackElements','STR','_itemWindow','Resist','activate','refreshActor','_biography','getReceiveElementFlat','TFplE','ayFBI','<%1\x20SIDEVIEW\x20BATTLER:\x20(.*)>','stypeWidth','RandomValid','_wtypeWidth','XUYnU','uxPNH','fontSizeRatio','<%1\x20SIDEVIEW\x20BATTLERS>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20SIDEVIEW\x20BATTLERS>','elementId','changePaintOpacity','nZtek','setActor','EleDmgPlusPer','HRG','getAbsorbedElements','OPezs','helpWindowRect','traitHitRateMultipliersVs','commandName','includes','_commandList','aFQQQ','Game_Action_itemHit','makeMassTraitSetFromNotetags','nameFormat','traitHealMultipliersVs','inBattle','YMTQd','isElementNull','LbVfL','POQKT','_tp','EleDmgFlatJS','currentExp','4AXwTSX','EleForceJS','zxrHw','FUNC','createRandomTraitSet','ConvertParams','MRG','MigeZ','ExcludeElements','HIT','faceWidth','bind','PDR','traitSet','CEV','getActionObjectElements','getElementIDsCol1','fcyOu','Step1Start','setup','sparamRate','CCGpC','VocabAtype','width','commandNameWindowCenter','eYZyg','EVA','Element','RegExp','remove','rOLyP','elementsAverageRate','isUseElementStatusCoreUpdatedLayout','process_VisuMZ_ElementStatusCore_Compatible_RegExp','EleRecPlusFlt','weaponTypes','callUpdateHelp','prototype','<%1DEALT\x20ELEMENT\x20%2\x20%3:[\x20]%4>','TraitCol1','+%1','MAXMP','Element%1','MDR','BattlerHueSolo-%1-%2','log','EnableLayout','Untitled','EleRecPlusPer','yFuWQ','mainFontSize','getRandomTraitSetFromList','%12','commandNameWindowDrawText','motionIdle','avg','createDataWindow','MRF','format','getDealtElementFlat','TRAIT_EQUIP_WTYPE','oaVrC','EnemyNameFmt','sum','process_VisuMZ_ElementStatusCore_RegExp','eYSle','VisuMZ_1_MainMenuCore','process_VisuMZ_ElementStatusCore_Parameters','LAwUw','getDealtElementRate','blt','applyTraitSetsByObjectNotetag','\x5cN[%1]','zSgoD','BattlerNameMass-%1-%2','getDealtElementPlus','Shadow','getPiercedElements','VisuMZ_1_MessageCore','========================','MotionIdle','update','WtypeOk','MCR','BackRectColor','itemHit','nKmLl','getParameterList','filter','calcUserElementDamagePlus','traitCol2','toLowerCase','dOVAh','eeuOR','getWtypeIdWithName','MTdJJ','\x5cC[16]%1:\x20\x5cC[0]%2','getElementStatusCoreBackColor','EleRecFlatJS','damage','BGRTi','ElementRate','StatusMenuList','concat','drawParamName','EleRecRatePer','VjcZu','canPierceElement','traitHitPlusMultipliersVs','EleDmgPlusFlt','version','MaWtc','_dataWindow','bJmgq','return\x200','PfApN','getReflectedElements','Variant','elementsMaxRate','iYuFJ','dropItemRateTraitSets','nameElementStatusCore','REOwX','Bonus','meetsEquipTraitRequirements','trim','xparamPlus','EleDmgRateJS','Game_Enemy_setPlural','EleRecRateFlt','split','PtpxY','contents','passiveStates','ShGjn','drmWX','_commandNameWindow','CmdStyle','GEItX','eypDc','drawTextEx','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ajgtM','makeRandomSingularTraitSetFromNotetags','Description','commandStyleCheck','Game_Enemy_gold','EKPkq','SmHit','vqCgu','addCommand','resetWordWrap','%10','Game_BattlerBase_xparam','FDR','updateCommandNameWindow','makeSingularTraitSetFromNotetags','JS\x20','Enable','ggzFt','MDF','recoverAll','NanRS','drawActorIcons','_helpWindow','EleDmgFlatPer','checkCacheKey','MAXHP','highest','JSON','REC','List','InqhF','helpAreaTop','helpAreaHeight','actor','CNT','%1%','7KKndbt','dataWindowRect','lineHeight','traitCriticalPlusMultipliersVs','Default','param','onDatabaseLoaded','EBEBa','clearElementChanges','VisuMZ_0_CoreEngine','nTzsF','Nature','\x5cI[%1]%2','EleRecPlusJS','ARRAYJSON','onChangeEnemyTraits','AtbXD','STRUCT','NjZXQ','wtypeId','length','LZGLH','multiplicative','isEquipWtypeOk','itemTextAlign','traitCriticalRateMultipliersVs','Scene_Status_onActorChange','_plural','indexOf','Param%1','getElementIdWithName','Game_BattlerBase_sparamRate','TraitCheckNotetagRate','yamtP','sagkW','innerWidth','JkaMI','statusMenuDmgReceive','ActorChangeBiographyRange','calcUserElementDamageFlat','Game_Action_executeDamage','powerUpColor','drawText','DropRate','DEFAULT','windowPadding','mainAreaBottom','atypeOkTraitSets','lNPEs','LayoutStyle','RuleMaxCalcJSa','gaugeBackColor','getParamName','Game_Enemy_exp','ceil','traitObjects','exit','Game_Action_itemCri','DrawJS','LClig','GoZkw','eTsgO','ActorChangeBiographyJS','isMaxLevel','oQknT','goldTraitSets','calcElementRate','pzZpb','refresh','paintOpacity','createHelpWindow','itemLineRect','contentsBack','layoutSettings','canBypassElementReflect','traitSetsEnabled','DDUAt','Wtypes','iecBC','VocabDmgAbsorb','initElementStatusCore','SvBattlerMass-%1-%2','IRike','Width','TRAIT_EQUIP_ATYPE','TraitSetSettings','resetFontSettings','vauKH','description','ElementRules','getTraitSetObject','ywnHZ','pageup','boxWidth','paramchangeTextColor','addWindow','xHQcL','Game_Enemy_dropItemRate','updateElementStatusCoreWindowBg','<%1\x20BATTLER\x20HUES>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20BATTLER\x20HUES>','Scene_Status_refreshActor','setItemWindow','initBiography','Scene_Boot_onDatabaseLoaded','EnemyChangeTraitSetsGroup','opacity','uVSQg','elements','wtypeWidth','itemPadding','nMgJT','height','Curse','exp','SvWeaponMass-%1-%2','text','sort','RuleMultiplyCalcJS','PtMPc','%1:\x20%2','setPlural','drawFirstCategoryData','Game_BattlerBase_elementRate','fontSize','ARRAYSTRUCT','Col%1','commandStyle','Per','EleRec','setLetter','systemColor','ApSPn','xALho','processRandomizedData','getTraitSetKeys','drawParamValue','BKkKg','88888','VocabDmgDealt','Alignment','registerCommand','EsVpD','placeGauge','oYSrX','process_VisuMZ_ElementStatusCore_TraitSets','Name','<%1\x20SIDEVIEW\x20WEAPONS>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20SIDEVIEW\x20WEAPONS>','RandomizeEnemy','updateSpecialBattlers','getMenuImage','onLoadDrawItemActorMenuImage','792hpYuOU','resetDescriptionFontSize','AnchorY','create','DrawBackRect','cPuzy','isPlaytest','Game_BattlerBase_paramRate','some','icon','calcWindowHeight','ALVaK','traitDmgMultipliersVs','gaugeLineHeight','Label','AllowCollapse','_resetFontSize','textWidth','enemy','_cache','drawActorGraphic','drawActorLevel','GoldRate','uFQzg','BattlerNameSolo-%1-%2','actorId','optDisplayTp','EleForceFlt','ActorChangeTraitSetsGroup','initialize','drawItemActorMenuImage','Rate','drawGeneral','<%1\x20SIDEVIEW\x20IDLE\x20MOTIONS>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20SIDEVIEW\x20IDLE\x20MOTIONS>','SubElement','makeCommandList','basicDataHeight','XParam%1','faceIndex','fVvyH','uiMenuStyle','cancel','skillTypes','StatusMenu','SvMotionIdleMass-%1-%2','KShzG','maxCols','EleForcePer','Biography','MultiRule','#%1','zIcAE','createSpecialBattlers','getForcedActionElement','armorTypes','_categoryWindow','aGjkx','eNzjs','faceHeight','lpuaB','getRandomTraitSetFromString','LafoM','SParams','Game_Enemy_setup','SvWeaponSolo-%1-%2','EleRecFlatPer','mainAreaHeight','NBssq','changeTextColor','pElUu','_namesCount','Step1End','mvTzw','calcTargetElementRate','members','1796154HhgHkS','fBwpB','MAT','hue','clear','setDrawData','map','_traitSets','addChild','(\x5cd+)([%％])','3545868UhInlQ','RuleAdditiveCalcJS','XdYlE','<%1FORCE\x20RECEIVED\x20ELEMENT\x20(?:%2|%3)\x20RATE:[\x20]%4>','swKeD','JvkVl','YAjrp','(\x5cd+\x5c.?\x5cd+)','drawIcon','([\x5c+\x5c-]\x5cd+)([%％])','currentClass','_letter','SvBattlerSolo-%1-%2','drawItemDarkRect','RNQaP','makeUniqueNames','VocabBiography','1194365HgIizK','elementsRateProduct','ActorChangeTraitSetsRange','VisuMZ_1_BattleCore','elementRate','atypeWidth','_elementIDs','drawItem','hasTraitSet','reduce','LOFXC','ActorChangeTraitSetsJS','RandomWeight','FmtText','loadFace','addLoadListener','YIMtf','drawAccess','expTotal','innerHeight','onActorChangeElementStatusCore','currentExt','subject','getElementIDsColRaw','EVAL','TRG','transform','xHDiG','commandNameWindowDrawBackground','setBiography','liDKE','battlerHue','setWordWrap','%1%2%3','drawParameters','textSizeEx','GtNNl','process_VisuMZ_ElementStatusCore_Battler_RegExp','Element-%1','Blessing','jHOsG','battlerName','_stypeWidth','GRD','pVQkA','MEV','172133TNBMFn','right','_battleCoreAddedElements','profile','oAFjo','Game_BattlerBase_refresh','multiply','jBLoT','expTraitSets','jPHnU','EnemyChangeTraitSetsJS','(?:%1|%2)','TCR','Game_BattlerBase_xparamPlus','1168840wyLAxT','oQzqw','tbYZY','zwOOe','isRightInputMode','cKNXp','paramRate','UALeG','setHandler','RsjBA','<%1\x20SIDEVIEW\x20IDLE\x20MOTION:\x20(.*)>','additive','maxTp','zELpH','IAuyJ','TTlWu','GvrBt','XParams','kndlj','FinalizeRateJS','EBBTL','_battleCoreForcedElements','resetTextColor','EleDmgRatePer','drawActorFaceBack','_drawData','EnemyChangeTraitSetsRange','qhOxf','VocabDmgReceive','BJdbC','tkKWK','Fnngf','traitSetType','Display','EleRecRateJS','RuleMinCalcJS','svfmb','Game_BattlerBase_initMembers','iconHeight','replace','round','statusMenuDmgDealt','isEquipAtypeOk','test','constructor','czzUv','canEquip','statusMenuAtype','onActorChange','applyRandomTraitSets','parse','setDescriptionFontSizeToTraitSet','BattlerHueMass-%1-%2','elementsMinRate','makeTraitSetFromNotetags','getTraitSet','getExcludedElementIDs','etfnK','CRI','EleRecFlatFlt','EleDmg','parameters','statusMenuBiography','critical','getParamValue'];_0x676f=function(){return _0x1f5a97;};return _0x676f();}