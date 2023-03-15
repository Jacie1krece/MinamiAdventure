//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.49;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.49] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 *   - If '0' is used for the Map ID, reference the current map.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Custom Z: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number value to determine the event sprite's Z value
 *   relative to the tilemap.
 * - For reference from rmmz_core.js:
 *   - 0 : Lower tiles
 *   - 1 : Lower characters
 *   - 3 : Normal characters
 *   - 4 : Upper tiles
 *   - 5 : Upper characters
 *   - 6 : Airship shadow
 *   - 7 : Balloon
 *   - 8 : Animation
 *   - 9 : Destination
 * - You can use numbers below 0 and above 9.
 *   - Values under 0 go below the tilemap.
 *   - Values above 9 go above everything else on the tilemap.
 *   - These values do NOT go below or above other screen objects that are
 *     NOT attached to the tilemap layer such as parallaxes or weather or
 *     windows because that's simply not how z-axis work with sprite layers.
 * 
 * ---
 * 
 * <Exit Reset Self Data>
 * 
 * - Used for: Event Notetags ONLY
 * - When the player leaves the current map, all Self Switches and Self
 *   Variables related to this event will be reset.
 * 
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Mirror Sprite>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - The event sprite's visual appearance is mirrored.
 * 
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Synch Distance Opacity: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity of the event based on the distance between it and its
 *   move synched target. Closer means more opaque. Further away means more
 *   transparent.
 * - Replace 'x' with a number representing the opacity change per pixel
 *   distance away. 'x' can use decimal values like 1.05 and 1.5.
 * 
 * ---
 * 
 * <Picture Filename: filename>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Applies a picture graphic from the /img/pictures/ folder of your project.
 * - This graphic will be on top of the character sprite but below the event
 *   icon sprite.
 *   - The picture priority will be the same as the event's priority.
 *   - If it is "below characters", the player can walk on top of it.
 *   - If it is "above characters", the player will behind it.
 *   - If it is "same as characters", the priority will be based on the
 *     current relative Y position. This also means, if the picture is big
 *     enough, it can clip into the top of tree tiles and such.
 * - Replace 'filename' with a filename from the game project's /img/pictures/
 *   folder. This is case sensitive. Do NOT include the file extension.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Max Size: x>
 * <Picture Scale: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - If the "Max Size" or "Scale" supplementary notetags are used, the picture
 *   graphic will be scaled proportionally to fit either the exact pixel size
 *   for "Max Size" or the "Scale" ratio.
 *   - Both the "Max Size" and "Scale" notetags require the "Filename" notetag.
 * - Replace 'x' with a number value representing the exact pixel size for the
 *   "Max Size" notetag.
 * - Replace 'y' with a number value representing the scale on which to shrink
 *   or enlarge the picture. 100% is normal size. 50% is half size. 200% is
 *   double size.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Picture Offset X: +x>
 * <Picture Offset X: -x>
 *
 * <Picture Offset Y: +x>
 * <Picture Offset Y: -x>
 *
 * <Picture Offset: +x, +y>
 * <Picture Offset: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Offsets the X and Y position of the event picture relative to the event
 *   sprite's own position.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Wait Frames: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Requires VisuMZ_4_AnimatedPictures!
 * - "Wait Frames" is used with VisuMZ's Animated Pictures plugin. This
 *   determines the delay inbetween frame changes.
 * - Replace 'x' with a number representing the amount of frames to wait
 *   inbetween frame changes.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Playtest>
 * 
 * - Used for: Event Notetags.
 * - This does NOT work when it's in the Event Page Comment Tags.
 * - If this notetag is found in the event's notebox (NOT comments), then the
 *   event will only appear during a playtest session. It will not appear in a
 *   deployed game where the playtest flag is not on.
 * 
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Scale: x%>
 * 
 * <Scale X: x%>
 * <Scale Y: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the scale of the sprite to the designated size.
 * - For <Scale: x%> variant: replace 'x' with a number representing the
 *   scaling overall percentage to be used.
 * - For <Scale X: x%> variant, replace 'x' with a number representing the x
 *   factor for the horizontal scaling percentage to be used.
 * - For <Scale Y: y%> variant, replace 'y' with a number representing the y
 *   factor for the vertical scaling percentage to be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Data Plugin Commands ===
 * 
 * ---
 * 
 * Self Data: Reset All
 * - Reset the Self Switch and Self Variable data of all events within the
 *   specified map.
 * 
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This refers to the original position's X/Y on the map.
 * - The event will turn and face the tile that is its original X/Y location.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Sprite Based?:
 *   - Use sprite-based labels instead of legacy-window version.
 *   - Legacy-window version will not be supported in future.
 *   - Sprite-based labels are more memory efficient and work better
 *     compatibility-wise.
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Dash on Ladder?
 *   - Allow dashing while on a ladder or rope?
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 *   Shift Y:
 *   - How many pixels should non-tile characters be shifted by?
 *   - Negative: up. Positive: down.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 * 
 * Wall Bump
 * 
 *   Enable?:
 *   - Enable the sound effect to be played when bumping into a wall?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.49: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Event Notetag and Comment Tags added by Arisu:
 * *** <Scale: x%>
 * *** <Scale X: x%>
 * *** <Scale Y: y%>
 * **** Changes the scale of the sprite to the designated size.
 * 
 * Version 1.48: January 20, 2023
 * * Feature Update!
 * ** <Move Synch> for certain types will also copy facing directions even if
 *    there are no tile movements (ie changing directions when pressed up
 *    against and obstacle). Update made by Arisu.
 * 
 * Version 1.47: November 10, 2022
 * * Feature Update!
 * ** If "Follower: Set Global Chase" is set to false, followers will no longer
 *    jump towards the player location when the player jumps. This does NOT
 *    apply to gather or location changing players. Followers will still have
 *    to synchronize their positions there regardless in order to maintain
 *    consistency. Update made by Olivia.
 * 
 * Version 1.46: September 29, 2022
 * * Bug Fixes!
 * ** Altered the self switch auto-reset timing to reduce errors. Fix by Arisu.
 * * Feature Update!
 * ** Added self-movement prevention whenever scenes are deactivated. Update
 *    made by Arisu.
 * 
 * Version 1.45: August 18, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused event labels with variables from refreshing
 *    properly. Fix made by Arisu.
 * 
 * Version 1.44: July 21, 2022
 * * Bug Fixes!
 * ** Fixed a problem that caused <Exit Reset Self Data> notetag to not work.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Diagonal pathfinding is now disabled when there are too many events on a
 *    map, causing extra collission checks. This value is set to 100 for the
 *    time being until we can figure out a better way to calculate diagonal
 *    pathfinding. Update made by Irina.
 * 
 * Version 1.43: July 14, 2022
 * * Bug Fixes!
 * ** Move to Player for events should no longer cause hang ups. Fix by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added caching function for pathfinding when using touch movement for a
 *    smoother experience. When touch movement is held down, pathfinding will
 *    utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Update made by Arisu.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Playtest>
 * **** If this notetag is found in the event's notebox (NOT comments), then
 *      the event will only appear during a playtest session. It will not
 *      appear in a deployed game where the playtest flag is not on.
 * 
 * Version 1.42: June 23, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added to <Copy Event: x, y> notetag help:
 * *** - If '0' is used for the Map ID, reference the current map.
 * * Feature Update!
 * ** Default MZ behavior would have "below characters" trigger events with
 *    only comments lock out facing "same as characters" trigger events. This
 *    is now bypassed. Update made by Arisu.
 * ** The <Copy Event: mapID, eventID> notetags now allow usage of '0' for the
 *    mapID to reference the current map. Update made by Arisu.
 * ** <Save Event Location> should now work more efficiently. Update by Arisu.
 * ** Dashing animations for followers will no longer look weird after having
 *    gathered up and then proceeding to dash. Update made by Irina.
 * * New Features!
 * ** New event notetag added by Arisu:
 * *** <Exit Reset Self Data>
 * **** When the player leaves the current map, all Self Switches and Self
 *      Variables related to this event will be reset.
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Self Data: Reset All
 * **** Reset the Self Switch and Self Variable data of all events within the
 *      specified map.
 * ** New Plugin Parameter added by Arisu and sponsored by Anon:
 * *** Plugin Params > Movement Settings > Dash > Dash on Ladder?
 * **** Allow dashing while on a ladder or rope?
 * 
 * Version 1.41: June 1, 2022
 * * Bug Fixes!
 * ** Parallel Process Common Events above 1000 should no longer crash the
 *    game. Bug fixed by Irina.
 * 
 * Version 1.40: May 19, 2022
 * * Bug Fixes!
 * ** Sprite Event Labels with distance properties will now work properly
 *    when changing from a non-met page condition to a met page condition.
 *    Fix made by Arisu.
 * 
 * Version 1.39: May 5, 2022
 * * Bug Fixes!
 * ** Save event location should now work properly with Set Event Location
 *    command. Fix made by Arisu.
 * ** Sprite Event Labels with distance properties will no longer be visible
 *    when constantly entering/exiting the Main Menu. Fix made by Arisu.
 * 
 * Version 1.38: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu and sponsored by Archeia:
 * *** Plugin Parameters > Movement Settings > Event Movement > Shift Y
 * **** How many pixels should non-tile characters be shifted by?
 * ** New Notetags added by Arisu and sponsored by Archeia:
 * *** <Picture Filename: filename>
 * **** applies a picture graphic from the /img/pictures/ folder of your
 *      game project.
 * **** This graphic will be on top of the character sprite but below the event
 *      icon sprite.
 * **** The picture priority will be the same as the event's priority. If it is
 *      "below characters", the player can walk on top of it. If it is "above
 *      characters", the player will behind it. If it is "same as characters",
 *      the priority will be based on the current relative Y position.
 * *** <Picture Max Size: x>
 * *** <Picture Scale: y%>
 * **** If the "Max Size" or "Scale" supplementary notetags are used, the
 *      picture graphic will be scaled proportionally to fit either the exact
 *      pixel size for "Max Size" or the "Scale" ratio.
 * *** <Picture Offset: +x, +y>
 * *** <Picture Offset: -x, -y>
 * **** Offsets the X and Y position of the event picture relative to the event
 *      sprite's own position.
 * *** <Picture Wait Frames: x>
 * **** Requires VisuMZ_4_AnimatedPictures! "Wait Frames" is used with VisuMZ's
 *      Animated Pictures plugin. This determines the delay inbetween
 *      frame changes.
 * 
 * Version 1.37: March 24, 2022
 * * Documentation Update!
 * ** Added extra clarity to "Turn to Home" Movement Command.
 * *** This refers to the original position's X/Y on the map.
 * *** The event will turn and face the tile that is its original X/Y location.
 * 
 * Version 1.36: March 17, 2022
 * * Bug Fixes!
 * ** "Turn To Home" movement command now properly faces the home position.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.35: March 3, 2022
 * * IMPORTANT! Compatibility Update!
 * ** Compatibility Update with RPG Maker MZ 1.4.4.
 * *** For some reason this update broke any saves made before 1.4.4 was
 *     updated and they cannot be loaded. The only way saves would load is if
 *     you made a safe after 1.4.4 was done. This should be fixed and saves
 *     made with 1.4.3 and before should now be working. Update made by Irina.
 * 
 * Version 1.34: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** Arisu has created new event notetag/comment tags:
 * *** <Custom Z: x>
 * **** Replace 'x' with a number value to determine the event sprite's Z value
 *      relative to the tilemap.
 * **** View the helpfile for more information.
 * *** <Mirror Sprite>
 * **** The event sprite's visual appearance is mirrored.
 * *** <Move Synch Distance Opacity: x>
 * **** Changes the opacity of the event based on the distance between it and
 *      its move synched target. Closer means more opaque. Further away means
 *      more transparent.
 * ** Irina has created a more memory efficient version of Event Labels.
 * *** Plugin Parameters > Event Label Settings > Sprite Based?
 * **** Use sprite-based labels instead of legacy-window version.
 * **** Legacy-window version will not be supported in future.
 * 
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command Separator_AutoMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_CallEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DashEnable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLabel
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLocation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventTimer
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Follower
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MorphEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfData
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfDataResetAll
 * @text Self Data: Reset All
 * @desc Reset the Self Switch and Self Variable data of all events
 * within the specified map.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SpawnEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param SpriteBased:eval
 * @text Sprite Based?
 * @type boolean
 * @on Sprite-Based
 * @off Legacy-Window
 * @desc Use sprite-based labels instead of legacy-window version.
 * Legacy-window version will not be supported in future.
 * @default true
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param DashOnLadder:eval
 * @text Dash On Ladder?
 * @parent Dash
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow dashing while on a ladder or rope?
 * @default false
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param ShiftY:num
 * @text Shift Y
 * @parent EventMove
 * @desc How many pixels should non-tile characters be shifted by?
 * Negative: up. Positive: down.
 * @default -6
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x292080=_0x45a6;(function(_0x57c388,_0x51d4fb){const _0x47f882=_0x45a6,_0x399b7c=_0x57c388();while(!![]){try{const _0x25d6e0=-parseInt(_0x47f882(0x448))/0x1*(parseInt(_0x47f882(0x14d))/0x2)+parseInt(_0x47f882(0x248))/0x3+parseInt(_0x47f882(0x458))/0x4+-parseInt(_0x47f882(0x429))/0x5*(parseInt(_0x47f882(0x1ed))/0x6)+parseInt(_0x47f882(0x2bf))/0x7*(-parseInt(_0x47f882(0x15a))/0x8)+-parseInt(_0x47f882(0x249))/0x9*(parseInt(_0x47f882(0x496))/0xa)+parseInt(_0x47f882(0x454))/0xb;if(_0x25d6e0===_0x51d4fb)break;else _0x399b7c['push'](_0x399b7c['shift']());}catch(_0x210288){_0x399b7c['push'](_0x399b7c['shift']());}}}(_0x2446,0xc73ed));var label=_0x292080(0x364),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x292080(0x32c)](function(_0x245445){const _0x1a9daf=_0x292080;return _0x245445[_0x1a9daf(0x230)]&&_0x245445[_0x1a9daf(0x493)][_0x1a9daf(0x539)]('['+label+']');})[0x0];function _0x45a6(_0x48cbf8,_0x63dad4){const _0x244647=_0x2446();return _0x45a6=function(_0x45a640,_0xb2ecab){_0x45a640=_0x45a640-0x126;let _0x4de454=_0x244647[_0x45a640];return _0x4de454;},_0x45a6(_0x48cbf8,_0x63dad4);}VisuMZ[label]['Settings']=VisuMZ[label][_0x292080(0x411)]||{},VisuMZ['ConvertParams']=function(_0xa324a2,_0x528dc2){const _0x420323=_0x292080;for(const _0x46b536 in _0x528dc2){if(_0x46b536[_0x420323(0x173)](/(.*):(.*)/i)){const _0xf8c69a=String(RegExp['$1']),_0x40ae37=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x25a21a,_0x2f0dcd,_0x12a36f;switch(_0x40ae37){case _0x420323(0x3de):_0x25a21a=_0x528dc2[_0x46b536]!==''?Number(_0x528dc2[_0x46b536]):0x0;break;case _0x420323(0x3a2):_0x2f0dcd=_0x528dc2[_0x46b536]!==''?JSON['parse'](_0x528dc2[_0x46b536]):[],_0x25a21a=_0x2f0dcd[_0x420323(0x1b5)](_0x46142b=>Number(_0x46142b));break;case _0x420323(0x459):_0x25a21a=_0x528dc2[_0x46b536]!==''?eval(_0x528dc2[_0x46b536]):null;break;case _0x420323(0x16e):_0x2f0dcd=_0x528dc2[_0x46b536]!==''?JSON['parse'](_0x528dc2[_0x46b536]):[],_0x25a21a=_0x2f0dcd[_0x420323(0x1b5)](_0x261826=>eval(_0x261826));break;case _0x420323(0x30d):_0x25a21a=_0x528dc2[_0x46b536]!==''?JSON[_0x420323(0x235)](_0x528dc2[_0x46b536]):'';break;case'ARRAYJSON':_0x2f0dcd=_0x528dc2[_0x46b536]!==''?JSON[_0x420323(0x235)](_0x528dc2[_0x46b536]):[],_0x25a21a=_0x2f0dcd[_0x420323(0x1b5)](_0x186d4c=>JSON[_0x420323(0x235)](_0x186d4c));break;case _0x420323(0x350):_0x25a21a=_0x528dc2[_0x46b536]!==''?new Function(JSON[_0x420323(0x235)](_0x528dc2[_0x46b536])):new Function(_0x420323(0x353));break;case'ARRAYFUNC':_0x2f0dcd=_0x528dc2[_0x46b536]!==''?JSON[_0x420323(0x235)](_0x528dc2[_0x46b536]):[],_0x25a21a=_0x2f0dcd[_0x420323(0x1b5)](_0x5c4b03=>new Function(JSON[_0x420323(0x235)](_0x5c4b03)));break;case'STR':_0x25a21a=_0x528dc2[_0x46b536]!==''?String(_0x528dc2[_0x46b536]):'';break;case _0x420323(0x271):_0x2f0dcd=_0x528dc2[_0x46b536]!==''?JSON[_0x420323(0x235)](_0x528dc2[_0x46b536]):[],_0x25a21a=_0x2f0dcd[_0x420323(0x1b5)](_0x4fa335=>String(_0x4fa335));break;case _0x420323(0x299):_0x12a36f=_0x528dc2[_0x46b536]!==''?JSON[_0x420323(0x235)](_0x528dc2[_0x46b536]):{},_0xa324a2[_0xf8c69a]={},VisuMZ['ConvertParams'](_0xa324a2[_0xf8c69a],_0x12a36f);continue;case _0x420323(0x174):_0x2f0dcd=_0x528dc2[_0x46b536]!==''?JSON[_0x420323(0x235)](_0x528dc2[_0x46b536]):[],_0x25a21a=_0x2f0dcd[_0x420323(0x1b5)](_0x7368a1=>VisuMZ[_0x420323(0x2be)]({},JSON[_0x420323(0x235)](_0x7368a1)));break;default:continue;}_0xa324a2[_0xf8c69a]=_0x25a21a;}}return _0xa324a2;},(_0x17ce86=>{const _0x3ae51b=_0x292080,_0x249920=_0x17ce86['name'];for(const _0x34be32 of dependencies){if(!Imported[_0x34be32]){alert(_0x3ae51b(0x2d6)[_0x3ae51b(0x193)](_0x249920,_0x34be32)),SceneManager[_0x3ae51b(0x39d)]();break;}}const _0x55add9=_0x17ce86[_0x3ae51b(0x493)];if(_0x55add9[_0x3ae51b(0x173)](/\[Version[ ](.*?)\]/i)){const _0x156efd=Number(RegExp['$1']);_0x156efd!==VisuMZ[label][_0x3ae51b(0x4e9)]&&(alert(_0x3ae51b(0x25f)[_0x3ae51b(0x193)](_0x249920,_0x156efd)),SceneManager[_0x3ae51b(0x39d)]());}if(_0x55add9[_0x3ae51b(0x173)](/\[Tier[ ](\d+)\]/i)){const _0x239e84=Number(RegExp['$1']);_0x239e84<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x3ae51b(0x193)](_0x249920,_0x239e84,tier)),SceneManager['exit']()):tier=Math[_0x3ae51b(0x13e)](_0x239e84,tier);}VisuMZ[_0x3ae51b(0x2be)](VisuMZ[label][_0x3ae51b(0x411)],_0x17ce86[_0x3ae51b(0x42c)]);})(pluginData),VisuMZ[_0x292080(0x389)]=function(_0x455333,_0x10e27c,_0x37c020){switch(_0x37c020){case'=':return _0x10e27c;break;case'+':return _0x455333+_0x10e27c;break;case'-':return _0x455333-_0x10e27c;break;case'*':return _0x455333*_0x10e27c;break;case'/':return _0x455333/_0x10e27c;break;case'%':return _0x455333%_0x10e27c;break;}return _0x455333;},PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],_0x292080(0x4b6),_0x1050b8=>{const _0x556b89=_0x292080;VisuMZ['ConvertParams'](_0x1050b8,_0x1050b8);switch(_0x1050b8[_0x556b89(0x327)]){case _0x556b89(0x247):$gameSystem[_0x556b89(0x461)](!![]);break;case _0x556b89(0x511):$gameSystem[_0x556b89(0x461)](![]);break;case _0x556b89(0x1c4):$gameSystem['setAllowEventAutoMovement'](!$gameSystem[_0x556b89(0x517)]());break;}}),PluginManager['registerCommand'](pluginData[_0x292080(0x24f)],_0x292080(0x4b4),_0x1253cb=>{const _0x8e501b=_0x292080;VisuMZ[_0x8e501b(0x2be)](_0x1253cb,_0x1253cb);const _0x28e729=$gameTemp['getLastPluginCommandInterpreter'](),_0x5d1a8f={'mapId':_0x1253cb[_0x8e501b(0x558)],'eventId':_0x1253cb['EventId']||_0x28e729[_0x8e501b(0x35a)](),'pageId':_0x1253cb[_0x8e501b(0x47a)]};if(_0x5d1a8f['mapId']<=0x0)_0x5d1a8f['mapId']=$gameMap?$gameMap[_0x8e501b(0x51b)]():0x1;$gameTemp['getLastPluginCommandInterpreter']()[_0x8e501b(0x1ce)](_0x5d1a8f);}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],_0x292080(0x2c4),_0x174773=>{const _0x351292=_0x292080;VisuMZ[_0x351292(0x2be)](_0x174773,_0x174773);switch(_0x174773[_0x351292(0x327)]){case _0x351292(0x338):$gameSystem[_0x351292(0x4d3)](!![]);break;case _0x351292(0x51c):$gameSystem[_0x351292(0x4d3)](![]);break;case _0x351292(0x1c4):$gameSystem[_0x351292(0x4d3)](!$gameSystem[_0x351292(0x224)]());break;}}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],_0x292080(0x3d9),_0x732e30=>{const _0x3faef7=_0x292080;VisuMZ[_0x3faef7(0x2be)](_0x732e30,_0x732e30);const _0x25648c=$gameTemp[_0x3faef7(0x161)]();_0x732e30[_0x3faef7(0x558)]=_0x732e30[_0x3faef7(0x558)]||$gameMap[_0x3faef7(0x51b)](),$gameSystem[_0x3faef7(0x1ad)](_0x732e30[_0x3faef7(0x558)],_0x732e30['EventId']||_0x25648c[_0x3faef7(0x35a)](),_0x732e30['IconIndex'],_0x732e30['IconBufferX'],_0x732e30[_0x3faef7(0x265)],_0x732e30[_0x3faef7(0x2a3)]);}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],'EventIconDelete',_0x2d4d44=>{const _0x1d7bce=_0x292080;VisuMZ[_0x1d7bce(0x2be)](_0x2d4d44,_0x2d4d44);const _0x249b49=$gameTemp['getLastPluginCommandInterpreter']();_0x2d4d44[_0x1d7bce(0x558)]=_0x2d4d44[_0x1d7bce(0x558)]||$gameMap[_0x1d7bce(0x51b)](),$gameSystem[_0x1d7bce(0x320)](_0x2d4d44[_0x1d7bce(0x558)],_0x2d4d44[_0x1d7bce(0x3a9)]||_0x249b49[_0x1d7bce(0x35a)]());}),PluginManager['registerCommand'](pluginData['name'],_0x292080(0x32b),_0xa80a66=>{const _0x3c722f=_0x292080;if($gameMap)for(const _0x25b42e of $gameMap['events']()){_0x25b42e[_0x3c722f(0x191)](),_0x25b42e[_0x3c722f(0x211)]();}if(SceneManager[_0x3c722f(0x1d1)]()){const _0x1cc489=SceneManager[_0x3c722f(0x28c)][_0x3c722f(0x2b9)];if(_0x1cc489)_0x1cc489[_0x3c722f(0x4c2)]();}}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],_0x292080(0x212),_0x41a530=>{const _0x4e2d4b=_0x292080;VisuMZ[_0x4e2d4b(0x2be)](_0x41a530,_0x41a530);switch(_0x41a530[_0x4e2d4b(0x25b)]){case _0x4e2d4b(0x2b2):$gameSystem['setEventLabelsVisible'](!![]);break;case _0x4e2d4b(0x197):$gameSystem[_0x4e2d4b(0x3ce)](![]);break;case _0x4e2d4b(0x1c4):$gameSystem[_0x4e2d4b(0x3ce)](!$gameSystem[_0x4e2d4b(0x3db)]());break;}}),PluginManager[_0x292080(0x4be)](pluginData['name'],_0x292080(0x51a),_0x51f053=>{const _0x1b518a=_0x292080;VisuMZ[_0x1b518a(0x2be)](_0x51f053,_0x51f053);const _0x30763e=$gameTemp[_0x1b518a(0x161)]();if(!$gameMap)return;const _0xf0677e=$gameMap[_0x1b518a(0x47f)](_0x51f053[_0x1b518a(0x3a9)]||_0x30763e[_0x1b518a(0x35a)]());if(_0xf0677e)_0xf0677e[_0x1b518a(0x560)]();}),PluginManager[_0x292080(0x4be)](pluginData['name'],_0x292080(0x17a),_0x24a497=>{const _0x2c334a=_0x292080;VisuMZ[_0x2c334a(0x2be)](_0x24a497,_0x24a497);const _0x4f17f1=$gameTemp[_0x2c334a(0x161)](),_0x434b97=_0x24a497[_0x2c334a(0x558)]||$gameMap[_0x2c334a(0x51b)](),_0x1e68f0=_0x24a497[_0x2c334a(0x3a9)]||_0x4f17f1[_0x2c334a(0x35a)](),_0x3a37bf=_0x24a497['PosX']||0x0,_0xe71d84=_0x24a497['PosY']||0x0,_0x484d75=_0x24a497['Direction']||0x2,_0x4fb473=((_0x24a497[_0x2c334a(0x47a)]||0x1)-0x1)['clamp'](0x0,0x13),_0x233150=_0x24a497['MoveRouteIndex']||0x0;$gameSystem[_0x2c334a(0x382)](_0x434b97,_0x1e68f0,_0x3a37bf,_0xe71d84,_0x484d75,_0x4fb473,_0x233150);}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],_0x292080(0x2f8),_0x25cab5=>{const _0x49c0b0=_0x292080;VisuMZ[_0x49c0b0(0x2be)](_0x25cab5,_0x25cab5);const _0x431f02=$gameTemp[_0x49c0b0(0x161)](),_0x4faa64=_0x25cab5[_0x49c0b0(0x558)]||$gameMap[_0x49c0b0(0x51b)](),_0x116309=_0x25cab5[_0x49c0b0(0x3a9)]||_0x431f02[_0x49c0b0(0x35a)]();$gameSystem[_0x49c0b0(0x549)](_0x4faa64,_0x116309);}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],'EventTimerExpireEvent',_0x3f411a=>{const _0x52270a=_0x292080;VisuMZ[_0x52270a(0x2be)](_0x3f411a,_0x3f411a);const _0x12d4e1=_0x3f411a[_0x52270a(0x3b4)];$gameTimer[_0x52270a(0x23e)](_0x12d4e1);}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],_0x292080(0x418),_0x3a9e94=>{const _0x32dbfa=_0x292080;$gameTimer[_0x32dbfa(0x23e)](0x0);}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],'EventTimerFramesGain',_0x5d6329=>{const _0x2cd219=_0x292080;if(!$gameTimer[_0x2cd219(0x172)]())return;VisuMZ[_0x2cd219(0x2be)](_0x5d6329,_0x5d6329);let _0x15b38b=0x0;_0x15b38b+=_0x5d6329[_0x2cd219(0x4cd)],_0x15b38b+=_0x5d6329['Seconds']*0x3c,_0x15b38b+=_0x5d6329[_0x2cd219(0x2fe)]*0x3c*0x3c,_0x15b38b+=_0x5d6329['Hours']*0x3c*0x3c*0x3c,$gameTimer[_0x2cd219(0x27c)](_0x15b38b);}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],_0x292080(0x194),_0x385c7b=>{const _0x4e419a=_0x292080;if(!$gameTimer['isWorking']())return;VisuMZ[_0x4e419a(0x2be)](_0x385c7b,_0x385c7b);let _0x13c525=0x0;_0x13c525+=_0x385c7b[_0x4e419a(0x4cd)],_0x13c525+=_0x385c7b[_0x4e419a(0x443)]*0x3c,_0x13c525+=_0x385c7b[_0x4e419a(0x2fe)]*0x3c*0x3c,_0x13c525+=_0x385c7b[_0x4e419a(0x2dc)]*0x3c*0x3c*0x3c,$gameTimer[_0x4e419a(0x2b5)](_0x13c525);}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],_0x292080(0x540),_0x5894d3=>{const _0x3bf7e6=_0x292080;if(!$gameTimer[_0x3bf7e6(0x172)]())return;$gameTimer['pause']();}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],_0x292080(0x4b0),_0x7c9fb0=>{const _0x255585=_0x292080;if(!$gameTimer['isWorking']())return;$gameTimer[_0x255585(0x1be)]();}),PluginManager['registerCommand'](pluginData[_0x292080(0x24f)],_0x292080(0x2cf),_0x3632b4=>{const _0x320f16=_0x292080;VisuMZ[_0x320f16(0x2be)](_0x3632b4,_0x3632b4);const _0x71a964=_0x3632b4[_0x320f16(0x376)]||0x0;$gameTimer[_0x320f16(0x444)](_0x71a964);}),PluginManager['registerCommand'](pluginData['name'],_0x292080(0x337),_0xfba67c=>{const _0x59e962=_0x292080;VisuMZ[_0x59e962(0x2be)](_0xfba67c,_0xfba67c);const _0x59f7fc=!_0xfba67c[_0x59e962(0x3c2)];$gameSystem[_0x59e962(0x4e7)](_0x59f7fc);}),PluginManager[_0x292080(0x4be)](pluginData['name'],_0x292080(0x41a),_0x300a8d=>{const _0x509b4a=_0x292080;VisuMZ['ConvertParams'](_0x300a8d,_0x300a8d);const _0xe872a6=(_0x300a8d[_0x509b4a(0x538)]||0x0)-0x1,_0x2855c3=!_0x300a8d[_0x509b4a(0x3c2)],_0x6d21d1=$gamePlayer[_0x509b4a(0x4c8)]()[_0x509b4a(0x189)](_0xe872a6);if(_0x6d21d1)_0x6d21d1[_0x509b4a(0x515)](_0x2855c3);}),PluginManager['registerCommand'](pluginData['name'],_0x292080(0x215),_0x41c25a=>{const _0x11dadc=_0x292080;VisuMZ['ConvertParams'](_0x41c25a,_0x41c25a);const _0x13e458=_0x41c25a[_0x11dadc(0x538)];$gameSystem[_0x11dadc(0x276)](_0x13e458);}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],_0x292080(0x438),_0x5d64f5=>{const _0x818c0c=_0x292080;VisuMZ['ConvertParams'](_0x5d64f5,_0x5d64f5),$gameSystem['setControlledFollowerID'](0x0),$gameSystem['setStopFollowerChasing'](![]);for(const _0x2c812e of $gamePlayer[_0x818c0c(0x4c8)]()[_0x818c0c(0x3c9)]){if(_0x2c812e)_0x2c812e[_0x818c0c(0x515)](![]);}}),PluginManager[_0x292080(0x4be)](pluginData['name'],'SwitchGetSelfSwitchABCD',_0x393e7e=>{const _0x23b9f8=_0x292080;VisuMZ[_0x23b9f8(0x2be)](_0x393e7e,_0x393e7e);const _0x327a58=$gameTemp['getLastPluginCommandInterpreter']();_0x393e7e[_0x23b9f8(0x558)]=_0x393e7e[_0x23b9f8(0x558)]||$gameMap[_0x23b9f8(0x51b)]();const _0x1fca38=[_0x393e7e['MapId'],_0x393e7e[_0x23b9f8(0x3a9)]||_0x327a58[_0x23b9f8(0x35a)](),_0x393e7e[_0x23b9f8(0x1d4)]],_0x37fee5=_0x393e7e[_0x23b9f8(0x311)],_0x115dc4=$gameSelfSwitches[_0x23b9f8(0x226)](_0x1fca38)||![];$gameSwitches[_0x23b9f8(0x368)](_0x37fee5,_0x115dc4);}),PluginManager[_0x292080(0x4be)](pluginData['name'],_0x292080(0x334),_0x170f3f=>{const _0x378dc6=_0x292080;VisuMZ['ConvertParams'](_0x170f3f,_0x170f3f);const _0x500901=$gameTemp[_0x378dc6(0x161)]();_0x170f3f['MapId']=_0x170f3f[_0x378dc6(0x558)]||$gameMap['mapId']();const _0xaaea5d=[_0x170f3f['MapId'],_0x170f3f[_0x378dc6(0x3a9)]||_0x500901['eventId'](),'Self\x20Switch\x20%1'[_0x378dc6(0x193)](_0x170f3f[_0x378dc6(0x348)])],_0x1dd3dd=_0x170f3f[_0x378dc6(0x311)],_0x3e2f91=$gameSelfSwitches['value'](_0xaaea5d)||![];$gameSwitches[_0x378dc6(0x368)](_0x1dd3dd,_0x3e2f91);}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],_0x292080(0x559),_0x5d3f9c=>{const _0x4c1c69=_0x292080;VisuMZ['ConvertParams'](_0x5d3f9c,_0x5d3f9c);const _0x52c197=$gameTemp[_0x4c1c69(0x161)]();_0x5d3f9c[_0x4c1c69(0x558)]=_0x5d3f9c['MapId']||$gameMap[_0x4c1c69(0x51b)]();const _0x4c3fc2=[_0x5d3f9c['MapId'],_0x5d3f9c['EventId']||_0x52c197[_0x4c1c69(0x35a)](),_0x4c1c69(0x154)['format'](_0x5d3f9c[_0x4c1c69(0x21d)])],_0x2c461f=_0x5d3f9c[_0x4c1c69(0x25d)],_0x59f6fe=$gameSelfSwitches[_0x4c1c69(0x226)](_0x4c3fc2)||![];$gameVariables[_0x4c1c69(0x368)](_0x2c461f,_0x59f6fe);}),PluginManager['registerCommand'](pluginData['name'],'MorphEventTo',_0x5aa174=>{const _0xbe6cb0=_0x292080;VisuMZ[_0xbe6cb0(0x2be)](_0x5aa174,_0x5aa174);if(!$gameMap)return;const _0x48c6f4=$gameTemp['getLastPluginCommandInterpreter'](),_0x15df02=_0x5aa174['Step2Preserve'];_0x5aa174[_0xbe6cb0(0x1da)]=_0x5aa174[_0xbe6cb0(0x1da)]||$gameMap['mapId'](),_0x5aa174['Step2MapId']=_0x5aa174[_0xbe6cb0(0x3d6)]||$gameMap[_0xbe6cb0(0x51b)](),_0x5aa174[_0xbe6cb0(0x3a4)]=_0x5aa174[_0xbe6cb0(0x3a4)]['toUpperCase']()[_0xbe6cb0(0x42d)]();if(!_0x15df02&&_0x5aa174[_0xbe6cb0(0x1da)]!==$gameMap['mapId']())return;if($gameMap['mapId']()===_0x5aa174[_0xbe6cb0(0x1da)]){const _0x5b7971=$gameMap[_0xbe6cb0(0x47f)](_0x5aa174[_0xbe6cb0(0x367)]||_0x48c6f4[_0xbe6cb0(0x35a)]());if(!_0x5b7971)return;_0x5aa174['TemplateName']!=='UNTITLED'?_0x5b7971[_0xbe6cb0(0x47e)](_0x5aa174['TemplateName']):_0x5b7971[_0xbe6cb0(0x206)](_0x5aa174['Step2MapId'],_0x5aa174[_0xbe6cb0(0x17c)]||_0x48c6f4['eventId']());}_0x15df02&&$gameSystem['savePreservedMorphEventDataKey'](_0x5aa174[_0xbe6cb0(0x1da)],_0x5aa174[_0xbe6cb0(0x367)],_0x5aa174['TemplateName'],_0x5aa174[_0xbe6cb0(0x3d6)],_0x5aa174[_0xbe6cb0(0x17c)]);}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],_0x292080(0x37e),_0x582430=>{const _0x51b3f0=_0x292080;VisuMZ[_0x51b3f0(0x2be)](_0x582430,_0x582430);if(!$gameMap)return;const _0x2ce238=$gameTemp[_0x51b3f0(0x161)]();_0x582430['MapId']=_0x582430[_0x51b3f0(0x558)]||$gameMap['mapId']();if($gameMap[_0x51b3f0(0x51b)]()===_0x582430[_0x51b3f0(0x558)]){const _0x4f252d=$gameMap['event'](_0x582430[_0x51b3f0(0x3a9)]||_0x2ce238[_0x51b3f0(0x35a)]());_0x4f252d[_0x51b3f0(0x264)]();}_0x582430[_0x51b3f0(0x573)]&&$gameSystem[_0x51b3f0(0x15b)](_0x582430[_0x51b3f0(0x558)],_0x582430[_0x51b3f0(0x3a9)]||_0x2ce238[_0x51b3f0(0x35a)]());}),PluginManager[_0x292080(0x4be)](pluginData['name'],_0x292080(0x543),_0x1b8dd3=>{const _0x3730f9=_0x292080;VisuMZ[_0x3730f9(0x2be)](_0x1b8dd3,_0x1b8dd3),$gameSystem[_0x3730f9(0x2bb)]($gamePlayer,_0x1b8dd3[_0x3730f9(0x384)],_0x1b8dd3[_0x3730f9(0x525)],_0x1b8dd3[_0x3730f9(0x265)],_0x1b8dd3[_0x3730f9(0x2a3)]);}),PluginManager[_0x292080(0x4be)](pluginData['name'],_0x292080(0x2e5),_0x3903fe=>{const _0x201ba4=_0x292080;VisuMZ[_0x201ba4(0x2be)](_0x3903fe,_0x3903fe),$gameSystem[_0x201ba4(0x466)]($gamePlayer);}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],_0x292080(0x3f5),_0x520103=>{const _0x190ac4=_0x292080;VisuMZ[_0x190ac4(0x2be)](_0x520103,_0x520103),$gameSystem['setPlayerControlDisable'](!_0x520103[_0x190ac4(0x338)]);}),PluginManager['registerCommand'](pluginData[_0x292080(0x24f)],_0x292080(0x2d9),_0x3d4e1e=>{const _0x57ac44=_0x292080;VisuMZ['ConvertParams'](_0x3d4e1e,_0x3d4e1e),$gameSystem[_0x57ac44(0x270)](_0x3d4e1e['Setting']);}),PluginManager['registerCommand'](pluginData[_0x292080(0x24f)],_0x292080(0x26e),_0x392f66=>{const _0x368eb8=_0x292080;VisuMZ[_0x368eb8(0x2be)](_0x392f66,_0x392f66);const _0x58bcf3=_0x392f66[_0x368eb8(0x558)]||$gameMap[_0x368eb8(0x51b)]();$gameSelfSwitches['resetSelfSwitchesForMap'](_0x58bcf3);}),PluginManager['registerCommand'](pluginData[_0x292080(0x24f)],_0x292080(0x370),_0x35f89b=>{const _0x54036d=_0x292080;VisuMZ[_0x54036d(0x2be)](_0x35f89b,_0x35f89b);const _0x174e08=$gameTemp['getLastPluginCommandInterpreter']();_0x35f89b[_0x54036d(0x558)]=_0x35f89b[_0x54036d(0x558)]||$gameMap['mapId']();const _0x4de2c2=[_0x35f89b[_0x54036d(0x558)],_0x35f89b[_0x54036d(0x3a9)]||_0x174e08[_0x54036d(0x35a)](),_0x35f89b[_0x54036d(0x1d4)]];switch(_0x35f89b['Value']){case'ON':$gameSelfSwitches[_0x54036d(0x368)](_0x4de2c2,!![]);break;case _0x54036d(0x42a):$gameSelfSwitches[_0x54036d(0x368)](_0x4de2c2,![]);break;case _0x54036d(0x1c4):$gameSelfSwitches[_0x54036d(0x368)](_0x4de2c2,!$gameSelfSwitches[_0x54036d(0x226)](_0x4de2c2));break;}}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],_0x292080(0x1f1),_0x1c928f=>{const _0x5b9c98=_0x292080;VisuMZ[_0x5b9c98(0x2be)](_0x1c928f,_0x1c928f);const _0x8b89a4=$gameTemp[_0x5b9c98(0x161)]();_0x1c928f['MapId']=_0x1c928f[_0x5b9c98(0x558)]||$gameMap[_0x5b9c98(0x51b)]();const _0x344edd=[_0x1c928f['MapId'],_0x1c928f[_0x5b9c98(0x3a9)]||_0x8b89a4['eventId'](),_0x5b9c98(0x13f)[_0x5b9c98(0x193)](_0x1c928f[_0x5b9c98(0x348)])];switch(_0x1c928f[_0x5b9c98(0x327)]){case'ON':$gameSelfSwitches[_0x5b9c98(0x368)](_0x344edd,!![]);break;case _0x5b9c98(0x42a):$gameSelfSwitches['setValue'](_0x344edd,![]);break;case _0x5b9c98(0x1c4):$gameSelfSwitches[_0x5b9c98(0x368)](_0x344edd,!$gameSelfSwitches[_0x5b9c98(0x226)](_0x344edd));break;}}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],'SelfVariableID',_0x431587=>{const _0xb57222=_0x292080;VisuMZ['ConvertParams'](_0x431587,_0x431587);const _0x365c8c=$gameTemp[_0xb57222(0x161)]();_0x431587[_0xb57222(0x558)]=_0x431587[_0xb57222(0x558)]||$gameMap['mapId']();const _0x249a2b=[_0x431587[_0xb57222(0x558)],_0x431587[_0xb57222(0x3a9)]||_0x365c8c[_0xb57222(0x35a)](),_0xb57222(0x154)[_0xb57222(0x193)](_0x431587['VariableId'])],_0x27711f=VisuMZ[_0xb57222(0x389)]($gameSelfSwitches['value'](_0x249a2b),_0x431587[_0xb57222(0x327)],_0x431587[_0xb57222(0x2a4)]);$gameSelfSwitches['setValue'](_0x249a2b,_0x27711f);}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],'SpawnEventAtXY',_0x5d630f=>{const _0x3b0fff=_0x292080;VisuMZ[_0x3b0fff(0x2be)](_0x5d630f,_0x5d630f);const _0x261be3=$gameTemp[_0x3b0fff(0x161)](),_0x1f3fb4={'template':_0x5d630f['TemplateName'],'mapId':_0x5d630f[_0x3b0fff(0x558)]||$gameMap[_0x3b0fff(0x51b)](),'eventId':_0x5d630f[_0x3b0fff(0x3a9)]||_0x261be3[_0x3b0fff(0x35a)](),'x':_0x5d630f['PosX'],'y':_0x5d630f['PosY'],'spawnPreserved':_0x5d630f[_0x3b0fff(0x4c3)],'spawnEventId':$gameMap[_0x3b0fff(0x33f)][_0x3b0fff(0x1bd)]+0x3e8},_0x33796e=_0x5d630f[_0x3b0fff(0x1e3)]||0x0;if(!VisuMZ[_0x3b0fff(0x2b8)][_0x1f3fb4[_0x3b0fff(0x51b)]]&&_0x1f3fb4[_0x3b0fff(0x51b)]!==$gameMap[_0x3b0fff(0x51b)]()){let _0x156c7a='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x3b0fff(0x193)](_0x1f3fb4[_0x3b0fff(0x51b)]);_0x156c7a+=_0x3b0fff(0x4ee),_0x156c7a+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x156c7a+=_0x3b0fff(0x162),_0x156c7a+=_0x3b0fff(0x43c)[_0x3b0fff(0x193)](_0x1f3fb4[_0x3b0fff(0x51b)]),alert(_0x156c7a);return;}const _0x4d5a88=$gameMap[_0x3b0fff(0x328)](_0x1f3fb4,_0x5d630f[_0x3b0fff(0x440)],_0x5d630f[_0x3b0fff(0x3f1)]);_0x33796e&&$gameSwitches[_0x3b0fff(0x368)](_0x33796e,!!_0x4d5a88);}),PluginManager[_0x292080(0x4be)](pluginData['name'],_0x292080(0x352),_0x3a4393=>{const _0x137a36=_0x292080;VisuMZ[_0x137a36(0x2be)](_0x3a4393,_0x3a4393);const _0x417efb=$gameTemp['getLastPluginCommandInterpreter'](),_0x50da0c={'template':_0x3a4393[_0x137a36(0x3a4)],'mapId':_0x3a4393[_0x137a36(0x558)]||$gameMap[_0x137a36(0x51b)](),'eventId':_0x3a4393[_0x137a36(0x3a9)]||_0x417efb['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x3a4393[_0x137a36(0x4c3)],'spawnEventId':$gameMap[_0x137a36(0x33f)][_0x137a36(0x1bd)]+0x3e8},_0x3ab4da=_0x3a4393[_0x137a36(0x1e3)]||0x0;if(!VisuMZ[_0x137a36(0x2b8)][_0x50da0c[_0x137a36(0x51b)]]&&_0x50da0c[_0x137a36(0x51b)]!==$gameMap[_0x137a36(0x51b)]()){let _0x3ed332='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x137a36(0x193)](_0x50da0c[_0x137a36(0x51b)]);_0x3ed332+=_0x137a36(0x4ee),_0x3ed332+=_0x137a36(0x44a),_0x3ed332+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x3ed332+=_0x137a36(0x43c)[_0x137a36(0x193)](_0x50da0c[_0x137a36(0x51b)]),alert(_0x3ed332);return;}const _0x2a1c4c=$gameMap[_0x137a36(0x3aa)](_0x50da0c,_0x3a4393[_0x137a36(0x4f1)],_0x3a4393[_0x137a36(0x440)],_0x3a4393[_0x137a36(0x3f1)]);_0x3ab4da&&$gameSwitches[_0x137a36(0x368)](_0x3ab4da,!!_0x2a1c4c);}),PluginManager['registerCommand'](pluginData[_0x292080(0x24f)],'SpawnEventAtTerrainTag',_0x1a3f34=>{const _0x1b7554=_0x292080;VisuMZ[_0x1b7554(0x2be)](_0x1a3f34,_0x1a3f34);const _0x179a87=$gameTemp[_0x1b7554(0x161)](),_0x45779c={'template':_0x1a3f34[_0x1b7554(0x3a4)],'mapId':_0x1a3f34[_0x1b7554(0x558)]||$gameMap[_0x1b7554(0x51b)](),'eventId':_0x1a3f34[_0x1b7554(0x3a9)]||_0x179a87[_0x1b7554(0x35a)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x1a3f34[_0x1b7554(0x4c3)],'spawnEventId':$gameMap[_0x1b7554(0x33f)][_0x1b7554(0x1bd)]+0x3e8},_0x437f54=_0x1a3f34['SuccessSwitchId']||0x0;if(!VisuMZ[_0x1b7554(0x2b8)][_0x45779c[_0x1b7554(0x51b)]]&&_0x45779c[_0x1b7554(0x51b)]!==$gameMap[_0x1b7554(0x51b)]()){let _0xf1dbc7=_0x1b7554(0x4f6)[_0x1b7554(0x193)](_0x45779c[_0x1b7554(0x51b)]);_0xf1dbc7+=_0x1b7554(0x4ee),_0xf1dbc7+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0xf1dbc7+=_0x1b7554(0x162),_0xf1dbc7+=_0x1b7554(0x43c)[_0x1b7554(0x193)](_0x45779c['mapId']),alert(_0xf1dbc7);return;}const _0x1233c9=$gameMap[_0x1b7554(0x3b2)](_0x45779c,_0x1a3f34[_0x1b7554(0x1bb)],_0x1a3f34[_0x1b7554(0x440)],_0x1a3f34[_0x1b7554(0x3f1)]);_0x437f54&&$gameSwitches[_0x1b7554(0x368)](_0x437f54,!!_0x1233c9);}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],'SpawnEventDespawnEventID',_0x192e1b=>{const _0x2ad53c=_0x292080;VisuMZ[_0x2ad53c(0x2be)](_0x192e1b,_0x192e1b);const _0x2ef9b7=$gameTemp[_0x2ad53c(0x161)]();$gameMap[_0x2ad53c(0x135)](_0x192e1b[_0x2ad53c(0x4bb)]||_0x2ef9b7[_0x2ad53c(0x35a)]());}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],_0x292080(0x488),_0x5904c7=>{const _0x3aac03=_0x292080;VisuMZ[_0x3aac03(0x2be)](_0x5904c7,_0x5904c7);const _0x2a079c=_0x5904c7[_0x3aac03(0x169)],_0x497082=_0x5904c7['PosY'];$gameMap[_0x3aac03(0x214)](_0x2a079c,_0x497082);}),PluginManager[_0x292080(0x4be)](pluginData['name'],_0x292080(0x3ea),_0x384a1c=>{const _0x5c9e25=_0x292080;VisuMZ['ConvertParams'](_0x384a1c,_0x384a1c),$gameMap[_0x5c9e25(0x390)](_0x384a1c[_0x5c9e25(0x4f1)]);}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],_0x292080(0x561),_0x1354da=>{const _0x28e6ee=_0x292080;VisuMZ[_0x28e6ee(0x2be)](_0x1354da,_0x1354da),$gameMap[_0x28e6ee(0x3e8)](_0x1354da[_0x28e6ee(0x1bb)]);}),PluginManager[_0x292080(0x4be)](pluginData[_0x292080(0x24f)],'SpawnEventDespawnEverything',_0x2a0df3=>{const _0x1198cf=_0x292080;VisuMZ[_0x1198cf(0x2be)](_0x2a0df3,_0x2a0df3),$gameMap['despawnEverything']();}),VisuMZ[_0x292080(0x364)][_0x292080(0x4fe)]=Scene_Boot[_0x292080(0x45b)]['onDatabaseLoaded'],Scene_Boot[_0x292080(0x45b)][_0x292080(0x437)]=function(){const _0x3cc834=_0x292080;VisuMZ[_0x3cc834(0x364)]['Scene_Boot_onDatabaseLoaded'][_0x3cc834(0x46f)](this),this[_0x3cc834(0x371)](),this['process_VisuMZ_EventsMoveCore_Switches_Variables']();if(VisuMZ[_0x3cc834(0x364)][_0x3cc834(0x4df)])VisuMZ[_0x3cc834(0x364)][_0x3cc834(0x4df)][_0x3cc834(0x333)]();},VisuMZ['PreloadedMaps']=[],VisuMZ[_0x292080(0x569)]={},Scene_Boot[_0x292080(0x45b)][_0x292080(0x371)]=function(){const _0x58ff2a=_0x292080;if(DataManager[_0x58ff2a(0x168)]()||DataManager[_0x58ff2a(0x4b3)]())return;const _0x228eb1=VisuMZ[_0x58ff2a(0x364)][_0x58ff2a(0x411)][_0x58ff2a(0x4e3)],_0x32754d=_0x228eb1[_0x58ff2a(0x319)][_0x58ff2a(0x397)](0x0);for(const _0x287f69 of _0x228eb1[_0x58ff2a(0x2d3)]){_0x287f69[_0x58ff2a(0x20c)]=_0x287f69[_0x58ff2a(0x20c)][_0x58ff2a(0x4a5)]()[_0x58ff2a(0x42d)](),VisuMZ[_0x58ff2a(0x569)][_0x287f69[_0x58ff2a(0x20c)]]=_0x287f69;if(!_0x32754d[_0x58ff2a(0x539)](_0x287f69[_0x58ff2a(0x1c7)]))_0x32754d[_0x58ff2a(0x3dd)](_0x287f69[_0x58ff2a(0x1c7)]);}for(const _0x4dd97e of _0x32754d){if(VisuMZ[_0x58ff2a(0x2b8)][_0x4dd97e])continue;const _0x39a075=_0x58ff2a(0x145)[_0x58ff2a(0x193)](_0x4dd97e[_0x58ff2a(0x218)](0x3)),_0x1eb1d3=_0x58ff2a(0x1e8)[_0x58ff2a(0x193)](_0x4dd97e);DataManager[_0x58ff2a(0x2ee)](_0x1eb1d3,_0x39a075),setTimeout(this['VisuMZ_Setup_Preload_Map']['bind'](this,_0x4dd97e,_0x1eb1d3),0x64);}},Scene_Boot[_0x292080(0x45b)]['VisuMZ_Setup_Preload_Map']=function(_0x4f7be7,_0x2e22d2){const _0x100583=_0x292080;window[_0x2e22d2]?(VisuMZ['PreloadedMaps'][_0x4f7be7]=window[_0x2e22d2],window[_0x2e22d2]=undefined):setTimeout(this[_0x100583(0x2ef)][_0x100583(0x2ba)](this,_0x4f7be7,_0x2e22d2),0x64);},VisuMZ['AdvancedSwitches']=[],VisuMZ[_0x292080(0x2f6)]=[],VisuMZ['MapSwitches']=[],VisuMZ['AdvancedVariables']=[],VisuMZ[_0x292080(0x24e)]=[],VisuMZ[_0x292080(0x2df)]=[],Scene_Boot['prototype'][_0x292080(0x340)]=function(){const _0x5a28e3=_0x292080;for(let _0x44a6d4=0x1;_0x44a6d4<$dataSystem['switches'][_0x5a28e3(0x1bd)];_0x44a6d4++){if($dataSystem[_0x5a28e3(0x20b)][_0x44a6d4][_0x5a28e3(0x173)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedSwitches'][_0x5a28e3(0x3dd)](_0x44a6d4);if($dataSystem[_0x5a28e3(0x20b)][_0x44a6d4][_0x5a28e3(0x173)](/<SELF>/i))VisuMZ[_0x5a28e3(0x2f6)][_0x5a28e3(0x3dd)](_0x44a6d4);if($dataSystem[_0x5a28e3(0x20b)][_0x44a6d4][_0x5a28e3(0x173)](/<MAP>/i))VisuMZ[_0x5a28e3(0x147)][_0x5a28e3(0x3dd)](_0x44a6d4);}for(let _0x1dc310=0x1;_0x1dc310<$dataSystem[_0x5a28e3(0x3cd)][_0x5a28e3(0x1bd)];_0x1dc310++){if($dataSystem[_0x5a28e3(0x3cd)][_0x1dc310][_0x5a28e3(0x173)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedVariables']['push'](_0x1dc310);if($dataSystem['variables'][_0x1dc310][_0x5a28e3(0x173)](/<SELF>/i))VisuMZ['SelfVariables'][_0x5a28e3(0x3dd)](_0x1dc310);if($dataSystem[_0x5a28e3(0x3cd)][_0x1dc310][_0x5a28e3(0x173)](/<MAP>/i))VisuMZ[_0x5a28e3(0x2df)][_0x5a28e3(0x3dd)](_0x1dc310);}},VisuMZ[_0x292080(0x364)][_0x292080(0x4df)]={},VisuMZ[_0x292080(0x364)]['CustomPageConditions']['initialize']=function(){const _0x358736=_0x292080;this[_0x358736(0x410)]=new Game_CPCInterpreter(),this[_0x358736(0x465)]();},VisuMZ['EventsMoveCore'][_0x292080(0x4df)][_0x292080(0x465)]=function(){const _0x5d7efd=_0x292080;this[_0x5d7efd(0x39a)]=[];for(const _0x4fc16e of $dataCommonEvents){if(!_0x4fc16e)continue;VisuMZ[_0x5d7efd(0x364)][_0x5d7efd(0x4df)][_0x5d7efd(0x576)](_0x4fc16e);if(_0x4fc16e[_0x5d7efd(0x445)]['length']>0x0)this['_commonEvents']['push'](_0x4fc16e['id']);}},VisuMZ[_0x292080(0x364)][_0x292080(0x4df)][_0x292080(0x381)]=function(_0x4320f8,_0xa040ee,_0x239e60){const _0x4a574c=_0x292080;return this[_0x4a574c(0x410)][_0x4a574c(0x366)](_0x4320f8,_0xa040ee),_0x239e60?this[_0x4a574c(0x410)][_0x4a574c(0x1db)](_0x239e60):this[_0x4a574c(0x410)][_0x4a574c(0x281)](),this[_0x4a574c(0x410)]['_cpc'];},VisuMZ[_0x292080(0x364)]['CustomPageConditions']['loadCPC']=function(_0x592ff6){const _0x2c5f54=_0x292080;let _0x3f4ca2=![];_0x592ff6[_0x2c5f54(0x445)]=[];for(const _0x347aa9 of _0x592ff6[_0x2c5f54(0x534)]){if([0x6c,0x198][_0x2c5f54(0x539)](_0x347aa9[_0x2c5f54(0x29f)])){const _0x2d97d4=_0x347aa9[_0x2c5f54(0x42c)][0x0];if(_0x2d97d4[_0x2c5f54(0x173)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x3f4ca2=!![];else _0x2d97d4[_0x2c5f54(0x173)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x3f4ca2=![]);}_0x3f4ca2&&_0x592ff6['CPC'][_0x2c5f54(0x3dd)](_0x347aa9);}},getSelfSwitchValue=function(_0xf86a13,_0x5ea8dd,_0x19a1a3){const _0x27dc3b=_0x292080;let _0x16754b=[_0xf86a13,_0x5ea8dd,'Self\x20Switch\x20%1'[_0x27dc3b(0x193)](_0x19a1a3)];return typeof _0x19a1a3===_0x27dc3b(0x2c6)&&(_0x16754b=[_0xf86a13,_0x5ea8dd,_0x19a1a3['toUpperCase']()['trim']()]),$gameSelfSwitches[_0x27dc3b(0x226)](_0x16754b);},getMapSwitchValue=function(_0x3cf032,_0x3586a8){const _0x344086=_0x292080;let _0x352d46=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x344086(0x193)](_0x3cf032,_0x3586a8)];return $gameSelfSwitches[_0x344086(0x226)](_0x352d46);},getMapVariableValue=function(_0x542c38,_0x38fdb9){const _0x26d4ad=_0x292080;let _0x4a9cdd=[0x0,0x0,_0x26d4ad(0x3da)['format'](_0x542c38,_0x38fdb9)];return $gameSelfSwitches['value'](_0x4a9cdd);},getSelfVariableValue=function(_0x2ccca2,_0xdd392,_0x2c9218){const _0x276109=_0x292080,_0x294aa0=[_0x2ccca2,_0xdd392,_0x276109(0x154)[_0x276109(0x193)](_0x2c9218)];return $gameSelfSwitches['value'](_0x294aa0);},setSelfSwitchValue=function(_0x697fd7,_0x4af052,_0x20e3fe,_0x1362cb){const _0x39a219=_0x292080;let _0x3c7c60=[_0x697fd7,_0x4af052,_0x39a219(0x13f)[_0x39a219(0x193)](_0x20e3fe)];typeof _0x20e3fe===_0x39a219(0x2c6)&&(_0x3c7c60=[_0x697fd7,_0x4af052,_0x20e3fe[_0x39a219(0x4a5)]()['trim']()]),$gameSelfSwitches['setValue'](_0x3c7c60,_0x1362cb);},setSelfVariableValue=function(_0xe27ea6,_0x4f1763,_0x214577,_0x191981){const _0x48e323=_0x292080,_0x1db6c3=[_0xe27ea6,_0x4f1763,_0x48e323(0x154)['format'](_0x214577)];$gameSelfSwitches[_0x48e323(0x368)](_0x1db6c3,_0x191981);},setMapSwitchValue=function(_0x50d01c,_0x5e3dc1,_0x1f2223){const _0x821e79=_0x292080;let _0xefe497=[0x0,0x0,_0x821e79(0x23d)['format'](_0x50d01c,_0x5e3dc1)];$gameSelfSwitches[_0x821e79(0x368)](_0xefe497,_0x1f2223);},setMapVariableValue=function(_0xf0b7f8,_0x3afc3b,_0x2d826e){const _0x2471fa=_0x292080;let _0x2052ec=[0x0,0x0,_0x2471fa(0x3da)['format'](_0xf0b7f8,_0x3afc3b)];$gameSelfSwitches[_0x2471fa(0x368)](_0x2052ec,_0x2d826e);},DataManager[_0x292080(0x424)]=function(_0x111a08){const _0x40a334=_0x292080;if(SceneManager[_0x40a334(0x28c)][_0x40a334(0x1af)]===Scene_Debug)return![];return VisuMZ[_0x40a334(0x3b9)][_0x40a334(0x539)](_0x111a08);},DataManager[_0x292080(0x2cb)]=function(_0x5b228c){const _0x31ce=_0x292080;if(SceneManager[_0x31ce(0x28c)][_0x31ce(0x1af)]===Scene_Debug)return![];return VisuMZ[_0x31ce(0x1ac)][_0x31ce(0x539)](_0x5b228c);},DataManager[_0x292080(0x409)]=function(_0x1639f1){const _0x3e6b20=_0x292080;if(SceneManager['_scene']['constructor']===Scene_Debug)return![];return VisuMZ['SelfSwitches'][_0x3e6b20(0x539)](_0x1639f1);},DataManager['isSelfVariable']=function(_0x21df08){const _0x54be2c=_0x292080;if(SceneManager['_scene'][_0x54be2c(0x1af)]===Scene_Debug)return![];return VisuMZ[_0x54be2c(0x24e)]['includes'](_0x21df08);},DataManager[_0x292080(0x3e3)]=function(_0x4cd669){const _0x228c84=_0x292080;if(BattleManager['isBattleTest']())return![];return VisuMZ[_0x228c84(0x147)]['includes'](_0x4cd669);},DataManager[_0x292080(0x258)]=function(_0x2fa688){const _0x250ec3=_0x292080;if(BattleManager[_0x250ec3(0x168)]())return![];return VisuMZ['MapVariables'][_0x250ec3(0x539)](_0x2fa688);},SceneManager[_0x292080(0x1d1)]=function(){const _0x223860=_0x292080;return this['_scene']&&this['_scene'][_0x223860(0x1af)]===Scene_Map;},VisuMZ['EventsMoveCore'][_0x292080(0x165)]=Game_Temp[_0x292080(0x45b)][_0x292080(0x144)],Game_Temp[_0x292080(0x45b)]['setDestination']=function(_0x59d336,_0x4b166e){const _0x246d10=_0x292080;if(this[_0x246d10(0x245)](_0x59d336,_0x4b166e))return;VisuMZ[_0x246d10(0x364)][_0x246d10(0x165)][_0x246d10(0x46f)](this,_0x59d336,_0x4b166e);},Game_Temp[_0x292080(0x45b)][_0x292080(0x245)]=function(_0x278d02,_0x3dde37){const _0x3e6ed5=_0x292080,_0x4a29e7=$gameMap[_0x3e6ed5(0x508)](_0x278d02,_0x3dde37);for(const _0x21f1d8 of _0x4a29e7){if(_0x21f1d8&&_0x21f1d8[_0x3e6ed5(0x243)]())return _0x21f1d8[_0x3e6ed5(0x339)](),!![];}return TouchInput[_0x3e6ed5(0x426)]()&&_0x4a29e7[_0x3e6ed5(0x1bd)]>0x0&&TouchInput[_0x3e6ed5(0x4b1)](),![];},Game_Temp['prototype'][_0x292080(0x4ff)]=function(_0x2318f3){const _0x13e113=_0x292080;this[_0x13e113(0x428)]=_0x2318f3;},Game_Temp[_0x292080(0x45b)][_0x292080(0x161)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp['prototype'][_0x292080(0x387)]=function(_0x18dfaf){this['_selfTarget']=_0x18dfaf;},Game_Temp[_0x292080(0x45b)][_0x292080(0x566)]=function(){const _0x12963d=_0x292080;this[_0x12963d(0x531)]=undefined;},Game_Temp[_0x292080(0x45b)][_0x292080(0x535)]=function(){return this['_selfTarget'];},VisuMZ[_0x292080(0x364)][_0x292080(0x29b)]=Game_System['prototype'][_0x292080(0x333)],Game_System[_0x292080(0x45b)]['initialize']=function(){const _0x3af2ea=_0x292080;VisuMZ[_0x3af2ea(0x364)][_0x3af2ea(0x29b)][_0x3af2ea(0x46f)](this),this[_0x3af2ea(0x133)](),this['initFollowerController']();},Game_System[_0x292080(0x45b)][_0x292080(0x133)]=function(){const _0x5bd76b=_0x292080;this[_0x5bd76b(0x386)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this['_EventIcons']={},this[_0x5bd76b(0x37f)]=[],this['_PreservedEventMorphData']={},this[_0x5bd76b(0x3b6)]={},this['_DisablePlayerControl']=![],this[_0x5bd76b(0x2ec)]=_0x5bd76b(0x357);},Game_System['prototype'][_0x292080(0x224)]=function(){const _0x15ebf8=_0x292080;if(this[_0x15ebf8(0x386)]===undefined)this[_0x15ebf8(0x133)]();if(this['_EventsMoveCoreSettings']['DashingEnable']===undefined)this['initEventsMoveCore']();return this['_EventsMoveCoreSettings']['DashingEnable'];},Game_System[_0x292080(0x45b)][_0x292080(0x4d3)]=function(_0x1dd69a){const _0x21e2cf=_0x292080;if(this[_0x21e2cf(0x386)]===undefined)this[_0x21e2cf(0x133)]();if(this[_0x21e2cf(0x386)][_0x21e2cf(0x1f8)]===undefined)this[_0x21e2cf(0x133)]();this['_EventsMoveCoreSettings'][_0x21e2cf(0x1f8)]=_0x1dd69a;},Game_System[_0x292080(0x45b)][_0x292080(0x517)]=function(){const _0x1cf57a=_0x292080;if(this[_0x1cf57a(0x386)]===undefined)this['initEventsMoveCore']();if(this[_0x1cf57a(0x386)][_0x1cf57a(0x38f)]===undefined)this['initEventsMoveCore']();return this['_EventsMoveCoreSettings'][_0x1cf57a(0x38f)];},Game_System['prototype'][_0x292080(0x461)]=function(_0x41da80){const _0x591800=_0x292080;if(this['_EventsMoveCoreSettings']===undefined)this[_0x591800(0x133)]();if(this[_0x591800(0x386)][_0x591800(0x38f)]===undefined)this[_0x591800(0x133)]();this[_0x591800(0x386)][_0x591800(0x38f)]=_0x41da80;},Game_System[_0x292080(0x45b)]['eventLabelsVisible']=function(){const _0x27f2f4=_0x292080;if(this[_0x27f2f4(0x386)]===undefined)this[_0x27f2f4(0x133)]();if(this[_0x27f2f4(0x386)]['VisibleEventLabels']===undefined)this['initEventsMoveCore']();return this[_0x27f2f4(0x386)][_0x27f2f4(0x34b)];},Game_System[_0x292080(0x45b)][_0x292080(0x3ce)]=function(_0x3b9ae4){const _0x3d7e5b=_0x292080;if(this[_0x3d7e5b(0x386)]===undefined)this[_0x3d7e5b(0x133)]();if(this[_0x3d7e5b(0x386)][_0x3d7e5b(0x34b)]===undefined)this[_0x3d7e5b(0x133)]();this['_EventsMoveCoreSettings'][_0x3d7e5b(0x34b)]=_0x3b9ae4;},Game_System[_0x292080(0x45b)][_0x292080(0x1ea)]=function(){const _0x583b96=_0x292080;return this['_DisablePlayerControl']===undefined&&(this[_0x583b96(0x401)]=![]),this['_DisablePlayerControl'];},Game_System[_0x292080(0x45b)]['setPlayerControlDisable']=function(_0x32509d){this['_DisablePlayerControl']=_0x32509d;},Game_System[_0x292080(0x45b)]['getPlayerDiagonalSetting']=function(){return this['_PlayerDiagonalSetting'];},Game_System[_0x292080(0x45b)]['setPlayerDiagonalSetting']=function(_0x1c8d69){this['_PlayerDiagonalSetting']=String(_0x1c8d69)['toLowerCase']()['trim']();},Game_System['prototype'][_0x292080(0x17f)]=function(_0x2e4891){const _0x286660=_0x292080;if(this[_0x286660(0x240)]===undefined)this[_0x286660(0x133)]();if(!_0x2e4891)return null;if(_0x2e4891===$gamePlayer)return this[_0x286660(0x240)]['Player'];else{const _0x2b86e4=VisuMZ[_0x286660(0x364)][_0x286660(0x411)],_0xf9e111=_0x286660(0x1e2)[_0x286660(0x193)](_0x2e4891['_mapId'],_0x2e4891['_eventId']);return this[_0x286660(0x240)][_0xf9e111]=this[_0x286660(0x240)][_0xf9e111]||{'iconIndex':0x0,'bufferX':_0x2b86e4['Icon'][_0x286660(0x26c)],'bufferY':_0x2b86e4['Icon']['BufferY'],'blendMode':_0x2b86e4[_0x286660(0x500)][_0x286660(0x347)]},this[_0x286660(0x240)][_0xf9e111];}},Game_System[_0x292080(0x45b)]['setEventIconData']=function(_0x47ae68,_0x4bfa55,_0x5566bc,_0x516464,_0x4fa0e2){const _0x1a07f3=_0x292080;if(this[_0x1a07f3(0x240)]===undefined)this[_0x1a07f3(0x133)]();const _0x31216f=_0x47ae68===$gamePlayer?_0x1a07f3(0x4da):_0x1a07f3(0x1e2)['format'](_0x47ae68[_0x1a07f3(0x225)],_0x47ae68[_0x1a07f3(0x487)]);this[_0x1a07f3(0x240)][_0x31216f]={'iconIndex':_0x4bfa55,'bufferX':_0x5566bc,'bufferY':_0x516464,'blendMode':_0x4fa0e2};},Game_System[_0x292080(0x45b)][_0x292080(0x1ad)]=function(_0x512cc5,_0x3136b5,_0x461a5a,_0x88b838,_0x297ef1,_0x44775f){const _0x556f5c=_0x292080;if(this[_0x556f5c(0x240)]===undefined)this[_0x556f5c(0x133)]();const _0x133f7c='Map%1-Event%2'[_0x556f5c(0x193)](_0x512cc5,_0x3136b5);this[_0x556f5c(0x240)][_0x133f7c]={'iconIndex':_0x461a5a,'bufferX':_0x88b838,'bufferY':_0x297ef1,'blendMode':_0x44775f};},Game_System[_0x292080(0x45b)][_0x292080(0x466)]=function(_0x33d812){const _0x307259=_0x292080;if(this['_EventIcons']===undefined)this[_0x307259(0x133)]();if(!_0x33d812)return null;_0x33d812===$gamePlayer?delete this[_0x307259(0x240)]['Player']:this[_0x307259(0x320)](_0x33d812[_0x307259(0x225)],_0x33d812['_eventId']);},Game_System[_0x292080(0x45b)]['deleteIconsOnEventsDataKey']=function(_0x5891ad,_0x239cbc){const _0x1557a0=_0x292080;if(this['_EventIcons']===undefined)this['initEventsMoveCore']();const _0x5acd93=_0x1557a0(0x1e2)[_0x1557a0(0x193)](_0x5891ad,_0x239cbc);delete this[_0x1557a0(0x240)][_0x5acd93];},Game_System[_0x292080(0x45b)][_0x292080(0x310)]=function(_0x365c15){const _0xa39633=_0x292080;if(this['_SavedEventLocations']===undefined)this['initEventsMoveCore']();if(!_0x365c15)return null;const _0x5de062=_0xa39633(0x1e2)[_0xa39633(0x193)](_0x365c15[_0xa39633(0x225)],_0x365c15[_0xa39633(0x487)]);return this['_SavedEventLocations'][_0x5de062];},Game_System['prototype'][_0x292080(0x560)]=function(_0x234e23){const _0x3b1a5a=_0x292080;if(this['_SavedEventLocations']===undefined)this[_0x3b1a5a(0x133)]();if(!_0x234e23)return;const _0x26221d=_0x3b1a5a(0x1e2)[_0x3b1a5a(0x193)](_0x234e23[_0x3b1a5a(0x225)],_0x234e23[_0x3b1a5a(0x487)]);this[_0x3b1a5a(0x3b6)][_0x26221d]={'direction':_0x234e23[_0x3b1a5a(0x56c)](),'x':Math[_0x3b1a5a(0x460)](_0x234e23['x']),'y':Math[_0x3b1a5a(0x460)](_0x234e23['y']),'pageIndex':_0x234e23[_0x3b1a5a(0x3be)],'moveRouteIndex':_0x234e23[_0x3b1a5a(0x388)]};},Game_System[_0x292080(0x45b)][_0x292080(0x20d)]=function(_0x3b1182){const _0x4a1c07=_0x292080;if(this[_0x4a1c07(0x3b6)]===undefined)this[_0x4a1c07(0x133)]();if(!_0x3b1182)return;this[_0x4a1c07(0x549)](_0x3b1182[_0x4a1c07(0x225)],_0x3b1182[_0x4a1c07(0x487)]);},Game_System[_0x292080(0x45b)][_0x292080(0x549)]=function(_0x4667fb,_0x1fbb03){const _0x3db0bf=_0x292080;if(this[_0x3db0bf(0x3b6)]===undefined)this['initEventsMoveCore']();const _0x5238b0='Map%1-Event%2'[_0x3db0bf(0x193)](_0x4667fb,_0x1fbb03);delete this['_SavedEventLocations'][_0x5238b0];},Game_System[_0x292080(0x45b)][_0x292080(0x382)]=function(_0x595753,_0x345bdc,_0x45ee76,_0x35f541,_0x297339,_0x35ee3e,_0x65c2d6){const _0x4712cb=_0x292080;if(this['_SavedEventLocations']===undefined)this[_0x4712cb(0x133)]();const _0x7adad9=_0x4712cb(0x1e2)[_0x4712cb(0x193)](_0x595753,_0x345bdc);this['_SavedEventLocations'][_0x7adad9]={'direction':_0x297339,'x':Math[_0x4712cb(0x460)](_0x45ee76),'y':Math[_0x4712cb(0x460)](_0x35f541),'pageIndex':_0x35ee3e,'moveRouteIndex':_0x65c2d6};},Game_System[_0x292080(0x45b)]['getPreservedMorphEventData']=function(_0x3543b3){const _0xec8b92=_0x292080;if(this['_PreservedEventMorphData']===undefined)this[_0xec8b92(0x133)]();if(!_0x3543b3)return;const _0x5c8307='Map%1-Event%2'['format'](_0x3543b3[_0xec8b92(0x225)],_0x3543b3[_0xec8b92(0x487)]);return this[_0xec8b92(0x3ac)][_0x5c8307];},Game_System[_0x292080(0x45b)][_0x292080(0x222)]=function(_0x33804d,_0x50fcc2,_0x5d1fcd,_0x4acef2,_0x3b0df2){const _0x3fbe3d=_0x292080;if(this[_0x3fbe3d(0x3ac)]===undefined)this[_0x3fbe3d(0x133)]();const _0x3282df=_0x3fbe3d(0x1e2)[_0x3fbe3d(0x193)](_0x33804d,_0x50fcc2);this[_0x3fbe3d(0x3ac)][_0x3282df]={'template':_0x5d1fcd,'mapId':_0x4acef2,'eventId':_0x3b0df2};},Game_System['prototype'][_0x292080(0x15b)]=function(_0x30652d,_0x575474){const _0xebc112=_0x292080;if(this[_0xebc112(0x3ac)]===undefined)this['initEventsMoveCore']();const _0x40462b='Map%1-Event%2'[_0xebc112(0x193)](_0x30652d,_0x575474);delete this[_0xebc112(0x3ac)][_0x40462b];},Game_System[_0x292080(0x45b)][_0x292080(0x289)]=function(_0xcdc979){const _0x5a2abb=_0x292080;if(this[_0x5a2abb(0x37f)]===undefined)this['initEventsMoveCore']();return this[_0x5a2abb(0x37f)][_0xcdc979]=this[_0x5a2abb(0x37f)][_0xcdc979]||[],this[_0x5a2abb(0x37f)][_0xcdc979];},Game_System[_0x292080(0x45b)]['removeTemporaryMapSpawnedEvents']=function(_0x5f0f1a){const _0x3754c0=_0x292080,_0x16c9e1=this[_0x3754c0(0x289)](_0x5f0f1a);for(const _0x475bbf of _0x16c9e1){if(!_0x475bbf)continue;if(_0x475bbf['_spawnPreserved'])continue;const _0x1984b6=_0x16c9e1[_0x3754c0(0x49e)](_0x475bbf);_0x16c9e1[_0x1984b6]=null;}},Game_System[_0x292080(0x45b)][_0x292080(0x494)]=function(){const _0x48aba5=_0x292080;this[_0x48aba5(0x323)]=0x0,this[_0x48aba5(0x1a3)]=![];},Game_System[_0x292080(0x45b)]['getControlledFollowerID']=function(){const _0x1fd21a=_0x292080;if(this[_0x1fd21a(0x323)]===undefined)this[_0x1fd21a(0x494)]();return this[_0x1fd21a(0x323)];},Game_System[_0x292080(0x45b)]['setControlledFollowerID']=function(_0x6c57d6){const _0x1a4ad9=_0x292080;if(this['_followerControlID']===undefined)this[_0x1a4ad9(0x494)]();this['_followerControlID']=_0x6c57d6;;},VisuMZ[_0x292080(0x364)][_0x292080(0x48a)]=Game_Interpreter[_0x292080(0x45b)]['character'],Game_Interpreter[_0x292080(0x45b)][_0x292080(0x48e)]=function(_0x31e38a){const _0x532491=_0x292080;if(!$gameParty['inBattle']()&&_0x31e38a<0x0){let _0x4d7fcd=$gameSystem[_0x532491(0x21c)]();if(_0x4d7fcd>0x0)return $gamePlayer[_0x532491(0x4c8)]()['follower'](_0x4d7fcd-0x1);}return VisuMZ['EventsMoveCore'][_0x532491(0x48a)][_0x532491(0x46f)](this,_0x31e38a);},Game_System[_0x292080(0x45b)]['isStopFollowerChasing']=function(){const _0x16a959=_0x292080;if(this['_followerChaseOff']===undefined)this[_0x16a959(0x494)]();return this[_0x16a959(0x1a3)];},Game_System['prototype'][_0x292080(0x4e7)]=function(_0x5e9bb3){const _0x580a98=_0x292080;if(this[_0x580a98(0x1a3)]===undefined)this['initFollowerController']();this['_followerChaseOff']=_0x5e9bb3;;},VisuMZ['EventsMoveCore'][_0x292080(0x2d4)]=Game_Followers[_0x292080(0x45b)]['jumpAll'],Game_Followers[_0x292080(0x45b)][_0x292080(0x1e4)]=function(){const _0x4b377c=_0x292080;if($gameSystem[_0x4b377c(0x1f5)]())return;VisuMZ[_0x4b377c(0x364)][_0x4b377c(0x2d4)][_0x4b377c(0x46f)](this);},VisuMZ[_0x292080(0x364)][_0x292080(0x2f7)]=Game_Timer[_0x292080(0x45b)][_0x292080(0x333)],Game_Timer[_0x292080(0x45b)][_0x292080(0x333)]=function(){const _0x104503=_0x292080;VisuMZ[_0x104503(0x364)][_0x104503(0x2f7)][_0x104503(0x46f)](this),this['initEventsMoveCore']();},Game_Timer[_0x292080(0x45b)][_0x292080(0x133)]=function(){const _0x569137=_0x292080;this[_0x569137(0x1c3)]=![],this[_0x569137(0x2ad)]=-0x1,this[_0x569137(0x513)]=0x0;},Game_Timer[_0x292080(0x45b)][_0x292080(0x434)]=function(_0x284092){const _0x259827=_0x292080;if(!_0x284092)return;if(!this[_0x259827(0x34e)])return;if(this['_paused'])return;if(this[_0x259827(0x52b)]<=0x0)return;if(this[_0x259827(0x2ad)]===undefined)this['initEventsMoveCore']();this[_0x259827(0x52b)]+=this['_speed'],this[_0x259827(0x52b)]<=0x0&&this['onExpire']();},VisuMZ['EventsMoveCore'][_0x292080(0x3eb)]=Game_Timer[_0x292080(0x45b)][_0x292080(0x268)],Game_Timer[_0x292080(0x45b)][_0x292080(0x268)]=function(_0xd07b18){const _0x3b4d4a=_0x292080;VisuMZ['EventsMoveCore'][_0x3b4d4a(0x3eb)][_0x3b4d4a(0x46f)](this,_0xd07b18);if(this[_0x3b4d4a(0x1c3)]===undefined)this['initEventsMoveCore']();this[_0x3b4d4a(0x1c3)]=![];},VisuMZ['EventsMoveCore']['Game_Timer_stop']=Game_Timer[_0x292080(0x45b)][_0x292080(0x1aa)],Game_Timer[_0x292080(0x45b)][_0x292080(0x1aa)]=function(){const _0x44759b=_0x292080;VisuMZ['EventsMoveCore'][_0x44759b(0x520)][_0x44759b(0x46f)](this);if(this[_0x44759b(0x1c3)]===undefined)this[_0x44759b(0x133)]();this[_0x44759b(0x1c3)]=![];},Game_Timer[_0x292080(0x45b)]['pause']=function(){const _0x28666c=_0x292080;if(this[_0x28666c(0x52b)]<=0x0)return;this[_0x28666c(0x1c3)]=!![],this['_working']=!![];},Game_Timer['prototype']['resume']=function(){const _0x2199f6=_0x292080;if(this[_0x2199f6(0x52b)]<=0x0)return;this['_paused']=![],this[_0x2199f6(0x34e)]=!![];},Game_Timer[_0x292080(0x45b)][_0x292080(0x27c)]=function(_0x47f748){const _0x435cc8=_0x292080;this['_frames']=this['_frames']||0x0,this['_frames']+=_0x47f748,this[_0x435cc8(0x34e)]=!![],this[_0x435cc8(0x52b)]=Math['max'](0x1,this[_0x435cc8(0x52b)]);},Game_Timer[_0x292080(0x45b)][_0x292080(0x2b5)]=function(_0x1dc791){const _0x1e8bb3=_0x292080;this[_0x1e8bb3(0x52b)]=this[_0x1e8bb3(0x52b)]||0x0,this[_0x1e8bb3(0x52b)]=_0x1dc791,this[_0x1e8bb3(0x34e)]=!![],this[_0x1e8bb3(0x52b)]=Math[_0x1e8bb3(0x13e)](0x1,this[_0x1e8bb3(0x52b)]);},Game_Timer[_0x292080(0x45b)]['changeSpeed']=function(_0x205d05){const _0x4365ae=_0x292080;this['_speed']=_0x205d05,this[_0x4365ae(0x34e)]=!![],_0x205d05>0x0&&(this[_0x4365ae(0x52b)]=Math[_0x4365ae(0x13e)](this[_0x4365ae(0x52b)],0x1));},Game_Timer[_0x292080(0x45b)]['setCommonEvent']=function(_0xe00e4e){const _0x3f24ab=_0x292080;if(this[_0x3f24ab(0x513)]===undefined)this[_0x3f24ab(0x133)]();this['_expireCommonEvent']=_0xe00e4e;},VisuMZ[_0x292080(0x364)][_0x292080(0x481)]=Game_Timer[_0x292080(0x45b)]['onExpire'],Game_Timer[_0x292080(0x45b)][_0x292080(0x553)]=function(){const _0x38ba0b=_0x292080;if(this[_0x38ba0b(0x513)]===undefined)this[_0x38ba0b(0x133)]();this[_0x38ba0b(0x513)]?$gameTemp[_0x38ba0b(0x492)](this[_0x38ba0b(0x513)]):VisuMZ['EventsMoveCore'][_0x38ba0b(0x481)][_0x38ba0b(0x46f)](this);},VisuMZ[_0x292080(0x364)][_0x292080(0x1eb)]=Game_Message[_0x292080(0x45b)][_0x292080(0x2bd)],Game_Message[_0x292080(0x45b)]['add']=function(_0x3cc7ab){const _0xdfabf2=_0x292080;VisuMZ['EventsMoveCore'][_0xdfabf2(0x1eb)]['call'](this,_0x3cc7ab),this['_selfEvent']=$gameTemp[_0xdfabf2(0x535)]();},Game_Message[_0x292080(0x45b)][_0x292080(0x57f)]=function(){const _0x1ccb15=_0x292080;$gameTemp[_0x1ccb15(0x387)](this[_0x1ccb15(0x420)]);},VisuMZ[_0x292080(0x364)]['Game_Switches_value']=Game_Switches[_0x292080(0x45b)][_0x292080(0x226)],Game_Switches[_0x292080(0x45b)][_0x292080(0x226)]=function(_0x280ac0){const _0x4aa9da=_0x292080;if(DataManager[_0x4aa9da(0x424)](_0x280ac0))return!!this[_0x4aa9da(0x1fa)](_0x280ac0);else{if(DataManager[_0x4aa9da(0x409)](_0x280ac0))return!!this[_0x4aa9da(0x417)](_0x280ac0);else return DataManager['isMapSwitch'](_0x280ac0)?!!this['mapValue'](_0x280ac0):VisuMZ[_0x4aa9da(0x364)][_0x4aa9da(0x297)]['call'](this,_0x280ac0);}},Game_Switches[_0x292080(0x3ef)]={},Game_Switches[_0x292080(0x45b)][_0x292080(0x1fa)]=function(_0x56d2f5){const _0x5e6176=_0x292080;if(!Game_Switches[_0x5e6176(0x3ef)][_0x56d2f5]){$dataSystem[_0x5e6176(0x20b)][_0x56d2f5][_0x5e6176(0x173)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x1d86c6='return\x20%1'[_0x5e6176(0x193)](String(RegExp['$1']));Game_Switches[_0x5e6176(0x3ef)][_0x56d2f5]=new Function(_0x5e6176(0x2db),_0x1d86c6);}const _0x199239=$gameTemp[_0x5e6176(0x535)]()||this;return Game_Switches[_0x5e6176(0x3ef)][_0x56d2f5][_0x5e6176(0x46f)](_0x199239,_0x56d2f5);},Game_Switches[_0x292080(0x45b)]['selfValue']=function(_0x5807e1){const _0x4eb501=_0x292080,_0x5211f9=$gameTemp[_0x4eb501(0x535)]()||this;if(_0x5211f9[_0x4eb501(0x1af)]!==Game_Event)return VisuMZ[_0x4eb501(0x364)][_0x4eb501(0x297)][_0x4eb501(0x46f)](this,_0x5807e1);else{const _0x2194a6=[_0x5211f9[_0x4eb501(0x225)],_0x5211f9[_0x4eb501(0x487)],_0x4eb501(0x13f)[_0x4eb501(0x193)](_0x5807e1)];return $gameSelfSwitches[_0x4eb501(0x226)](_0x2194a6);}},Game_Switches['prototype'][_0x292080(0x380)]=function(_0xa2d465){const _0x30cf19=_0x292080,_0x5a02fc=$gameMap?$gameMap[_0x30cf19(0x51b)]():0x0,_0x53b579=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'['format'](_0x5a02fc,_0xa2d465)];return $gameSelfSwitches[_0x30cf19(0x226)](_0x53b579);},VisuMZ[_0x292080(0x364)][_0x292080(0x53f)]=Game_Switches[_0x292080(0x45b)][_0x292080(0x368)],Game_Switches[_0x292080(0x45b)][_0x292080(0x368)]=function(_0x7d5892,_0x3ea23a){const _0x288955=_0x292080;if(DataManager['isSelfSwitch'](_0x7d5892))this['setSelfValue'](_0x7d5892,_0x3ea23a);else DataManager['isMapSwitch'](_0x7d5892)?this[_0x288955(0x14b)](_0x7d5892,_0x3ea23a):VisuMZ[_0x288955(0x364)][_0x288955(0x53f)][_0x288955(0x46f)](this,_0x7d5892,_0x3ea23a);},Game_Switches[_0x292080(0x45b)][_0x292080(0x217)]=function(_0x4454d9,_0x5ebb49){const _0x2b43b3=_0x292080,_0x13a37c=$gameTemp[_0x2b43b3(0x535)]()||this;if(_0x13a37c['constructor']!==Game_Event)VisuMZ[_0x2b43b3(0x364)][_0x2b43b3(0x53f)][_0x2b43b3(0x46f)](this,_0x4454d9,_0x5ebb49);else{const _0x557e3e=[_0x13a37c[_0x2b43b3(0x225)],_0x13a37c['_eventId'],_0x2b43b3(0x13f)[_0x2b43b3(0x193)](_0x4454d9)];$gameSelfSwitches['setValue'](_0x557e3e,_0x5ebb49);}},Game_Switches[_0x292080(0x45b)][_0x292080(0x14b)]=function(_0x1a1645,_0x4406c4){const _0x344511=_0x292080,_0xb7264e=$gameMap?$gameMap['mapId']():0x0,_0x48750b=[0x0,0x0,_0x344511(0x23d)[_0x344511(0x193)](_0xb7264e,_0x1a1645)];return $gameSelfSwitches['setValue'](_0x48750b,_0x4406c4);},VisuMZ[_0x292080(0x364)][_0x292080(0x187)]=Game_Variables[_0x292080(0x45b)][_0x292080(0x226)],Game_Variables['prototype']['value']=function(_0x37209a){const _0x2800c1=_0x292080;if(DataManager[_0x2800c1(0x2cb)](_0x37209a))return this[_0x2800c1(0x1fa)](_0x37209a);else{if(DataManager['isSelfVariable'](_0x37209a))return this[_0x2800c1(0x417)](_0x37209a);else return DataManager[_0x2800c1(0x258)](_0x37209a)?this['mapValue'](_0x37209a):VisuMZ[_0x2800c1(0x364)][_0x2800c1(0x187)][_0x2800c1(0x46f)](this,_0x37209a);}},Game_Variables[_0x292080(0x3ef)]={},Game_Variables[_0x292080(0x45b)]['advancedValue']=function(_0x332b9a){const _0x3ed47b=_0x292080;if(!Game_Variables[_0x3ed47b(0x3ef)][_0x332b9a]){$dataSystem[_0x3ed47b(0x3cd)][_0x332b9a][_0x3ed47b(0x173)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x2cfdfd='return\x20%1'[_0x3ed47b(0x193)](String(RegExp['$1']));Game_Variables[_0x3ed47b(0x3ef)][_0x332b9a]=new Function(_0x3ed47b(0x149),_0x2cfdfd);}const _0x24a7e9=$gameTemp[_0x3ed47b(0x535)]()||this;return Game_Variables[_0x3ed47b(0x3ef)][_0x332b9a]['call'](_0x24a7e9,_0x332b9a);},Game_Variables['prototype'][_0x292080(0x417)]=function(_0x4e0481){const _0x45f2b4=_0x292080,_0xdfc78b=$gameTemp[_0x45f2b4(0x535)]()||this;if(_0xdfc78b[_0x45f2b4(0x1af)]!==Game_Event)return VisuMZ[_0x45f2b4(0x364)]['Game_Variables_value'][_0x45f2b4(0x46f)](this,_0x4e0481);else{const _0x315ac2=[_0xdfc78b[_0x45f2b4(0x225)],_0xdfc78b[_0x45f2b4(0x487)],_0x45f2b4(0x154)[_0x45f2b4(0x193)](_0x4e0481)];return $gameSelfSwitches[_0x45f2b4(0x226)](_0x315ac2);}},Game_Variables[_0x292080(0x45b)]['mapValue']=function(_0x326f62){const _0x4fca17=_0x292080,_0x5ae976=$gameMap?$gameMap['mapId']():0x0,_0x1a9f39=[0x0,0x0,_0x4fca17(0x3da)[_0x4fca17(0x193)](_0x5ae976,_0x326f62)];return $gameSelfSwitches[_0x4fca17(0x226)](_0x1a9f39)||0x0;},VisuMZ['EventsMoveCore'][_0x292080(0x532)]=Game_Variables[_0x292080(0x45b)]['setValue'],Game_Variables['prototype'][_0x292080(0x368)]=function(_0x5b97ba,_0x507db7){const _0x168457=_0x292080;if(DataManager[_0x168457(0x422)](_0x5b97ba))this[_0x168457(0x217)](_0x5b97ba,_0x507db7);else DataManager['isMapVariable'](_0x5b97ba)?this['setMapValue'](_0x5b97ba,_0x507db7):VisuMZ[_0x168457(0x364)][_0x168457(0x532)]['call'](this,_0x5b97ba,_0x507db7);},Game_Variables[_0x292080(0x45b)]['setSelfValue']=function(_0x1e335f,_0xd7137b){const _0x1f0c98=_0x292080,_0x172061=$gameTemp[_0x1f0c98(0x535)]()||this;if(_0x172061['constructor']!==Game_Event)VisuMZ[_0x1f0c98(0x364)][_0x1f0c98(0x532)]['call'](this,_0x1e335f,_0xd7137b);else{const _0x2b2ef4=[_0x172061[_0x1f0c98(0x225)],_0x172061[_0x1f0c98(0x487)],_0x1f0c98(0x154)[_0x1f0c98(0x193)](_0x1e335f)];$gameSelfSwitches[_0x1f0c98(0x368)](_0x2b2ef4,_0xd7137b);}},Game_Variables[_0x292080(0x45b)][_0x292080(0x14b)]=function(_0x2e4c06,_0x40e129){const _0x47122f=_0x292080,_0x1573aa=$gameMap?$gameMap['mapId']():0x0,_0x3c3cc3=[0x0,0x0,_0x47122f(0x3da)[_0x47122f(0x193)](_0x1573aa,_0x2e4c06)];$gameSelfSwitches['setValue'](_0x3c3cc3,_0x40e129);},VisuMZ[_0x292080(0x364)]['Game_SelfSwitches_value']=Game_SelfSwitches[_0x292080(0x45b)][_0x292080(0x226)],Game_SelfSwitches[_0x292080(0x45b)][_0x292080(0x226)]=function(_0x25c2e5){const _0x38e646=_0x292080;if(_0x25c2e5[0x2]['match'](/(?:SELF|MAP)/i))return this[_0x38e646(0x417)](_0x25c2e5);else{return VisuMZ[_0x38e646(0x364)][_0x38e646(0x1df)][_0x38e646(0x46f)](this,_0x25c2e5);;}},Game_SelfSwitches[_0x292080(0x45b)][_0x292080(0x417)]=function(_0x3c9d9d){const _0x52b9a6=_0x292080;return _0x3c9d9d[0x2][_0x52b9a6(0x173)](/VAR/i)?this[_0x52b9a6(0x3c9)][_0x3c9d9d]||0x0:!!this[_0x52b9a6(0x3c9)][_0x3c9d9d];},VisuMZ[_0x292080(0x364)][_0x292080(0x343)]=Game_SelfSwitches[_0x292080(0x45b)][_0x292080(0x368)],Game_SelfSwitches[_0x292080(0x45b)][_0x292080(0x368)]=function(_0xe822db,_0x3a4643){const _0x321345=_0x292080;_0xe822db[0x2][_0x321345(0x173)](/(?:SELF|MAP)/i)?this['setSelfValue'](_0xe822db,_0x3a4643):VisuMZ['EventsMoveCore'][_0x321345(0x343)]['call'](this,_0xe822db,_0x3a4643);},Game_SelfSwitches[_0x292080(0x45b)]['setSelfValue']=function(_0x2bbdfc,_0x33b40f){const _0x299662=_0x292080;this[_0x299662(0x3c9)][_0x2bbdfc]=_0x2bbdfc[0x2][_0x299662(0x173)](/VAR/i)?_0x33b40f:!!_0x33b40f,this['onChange']();},VisuMZ['EventsMoveCore'][_0x292080(0x255)]=Scene_Map[_0x292080(0x45b)][_0x292080(0x482)],Scene_Map[_0x292080(0x45b)][_0x292080(0x482)]=function(){const _0x30c2e3=_0x292080;$gameMap[_0x30c2e3(0x13c)](),VisuMZ[_0x30c2e3(0x364)][_0x30c2e3(0x255)][_0x30c2e3(0x46f)](this);},Game_Map[_0x292080(0x45b)][_0x292080(0x13c)]=function(){const _0x5eea4c=_0x292080;this[_0x5eea4c(0x242)]=this[_0x5eea4c(0x51b)](),this[_0x5eea4c(0x50f)]=undefined;const _0x2c1362=this['events']();for(const _0x431afb of _0x2c1362){if(_0x431afb)$gameSelfSwitches[_0x5eea4c(0x153)](_0x431afb);}},Game_SelfSwitches[_0x292080(0x45b)][_0x292080(0x153)]=function(_0x57a9a5){const _0x59dbc0=_0x292080;if(!_0x57a9a5)return;if(!_0x57a9a5[_0x59dbc0(0x47f)]())return;const _0x42ad5e=_0x57a9a5[_0x59dbc0(0x47f)]()[_0x59dbc0(0x2f3)]||'';if(_0x42ad5e[_0x59dbc0(0x173)](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){const _0x1b5f0e='%1,%2,'['format']($gameMap[_0x59dbc0(0x225)],_0x57a9a5[_0x59dbc0(0x487)]),_0x2f167f=Object[_0x59dbc0(0x3b7)](this[_0x59dbc0(0x3c9)])[_0x59dbc0(0x32c)](_0x53bf12=>_0x53bf12['startsWith'](_0x1b5f0e));while(_0x2f167f['length']>0x0){const _0x30b949=_0x2f167f['shift']();delete this[_0x59dbc0(0x3c9)][_0x30b949];}}},Game_SelfSwitches[_0x292080(0x45b)][_0x292080(0x40e)]=function(_0x11b4ee){const _0x5e725b=_0x292080,_0x1d8c79=_0x5e725b(0x4e6)[_0x5e725b(0x193)]($gameMap[_0x5e725b(0x225)]),_0x2c3cc8=Object[_0x5e725b(0x3b7)](this[_0x5e725b(0x3c9)])['filter'](_0x24b1cf=>_0x24b1cf[_0x5e725b(0x45e)](_0x1d8c79));while(_0x2c3cc8['length']>0x0){const _0x1b5847=_0x2c3cc8[_0x5e725b(0x55e)]();delete this['_data'][_0x1b5847];}_0x11b4ee===$gameMap[_0x5e725b(0x51b)]()&&$gameMap[_0x5e725b(0x40f)]();},VisuMZ[_0x292080(0x364)][_0x292080(0x21f)]=Game_Enemy[_0x292080(0x45b)][_0x292080(0x36c)],Game_Enemy['prototype'][_0x292080(0x36c)]=function(_0x3189b0){const _0x474791=_0x292080;$gameTemp[_0x474791(0x387)](this);const _0x44fe4e=VisuMZ['EventsMoveCore']['Game_Enemy_meetsSwitchCondition'][_0x474791(0x46f)](this,_0x3189b0);return $gameTemp[_0x474791(0x566)](),_0x44fe4e;},VisuMZ['EventsMoveCore'][_0x292080(0x2fb)]=Game_Troop[_0x292080(0x45b)][_0x292080(0x3e2)],Game_Troop[_0x292080(0x45b)][_0x292080(0x3e2)]=function(_0x171b97){const _0x264049=_0x292080;$gameTemp[_0x264049(0x387)](this);const _0x13dc03=VisuMZ[_0x264049(0x364)]['Game_Troop_meetsConditions'][_0x264049(0x46f)](this,_0x171b97);return $gameTemp[_0x264049(0x566)](),_0x13dc03;},VisuMZ[_0x292080(0x364)][_0x292080(0x2f0)]=Game_Map[_0x292080(0x45b)][_0x292080(0x366)],Game_Map[_0x292080(0x45b)][_0x292080(0x366)]=function(_0x2df3f4){const _0x2d5897=_0x292080;this[_0x2d5897(0x35e)](_0x2df3f4),this[_0x2d5897(0x3f0)](),VisuMZ['EventsMoveCore'][_0x2d5897(0x2f0)]['call'](this,_0x2df3f4),this[_0x2d5897(0x3f0)](),this['setupDiagonalSupport'](),this['setupRegionRestrictions'](),this[_0x2d5897(0x12d)](),this['setupSpawnedEvents'](),this['setupPlayerVisibilityOverrides'](),this['setupFollowerVisibilityOverrides'](),this['clearEventCache']();},VisuMZ[_0x292080(0x364)][_0x292080(0x3f9)]=Game_Map[_0x292080(0x45b)]['setupEvents'],Game_Map[_0x292080(0x45b)][_0x292080(0x293)]=function(){const _0x5b55ca=_0x292080;VisuMZ[_0x5b55ca(0x364)][_0x5b55ca(0x3f9)][_0x5b55ca(0x46f)](this),this[_0x5b55ca(0x396)]();},Game_Map[_0x292080(0x2a8)]=0xc8,Game_Map[_0x292080(0x45b)][_0x292080(0x35b)]=function(){const _0xc9d31d=_0x292080,_0x2fec4e=Game_Map[_0xc9d31d(0x2a8)];this[_0xc9d31d(0x4a7)]=this[_0xc9d31d(0x54c)]()[_0xc9d31d(0x1bd)]>_0x2fec4e;if(this[_0xc9d31d(0x4a7)]&&$gameTemp[_0xc9d31d(0x285)]()){}},Game_Map[_0x292080(0x45b)][_0x292080(0x45f)]=function(){return this['_eventOverload'];},Game_Map[_0x292080(0x45b)]['clearEventCache']=function(){const _0xb6bcf3=_0x292080;this[_0xb6bcf3(0x50f)]=undefined;},Game_Map['prototype'][_0x292080(0x203)]=function(){const _0x25c16b=_0x292080;this['_diagonalSupport']=VisuMZ[_0x25c16b(0x364)]['Settings'][_0x25c16b(0x1ec)]['EnableDir8'];const _0x4513f0=$dataMap[_0x25c16b(0x2f3)]||'';if(_0x4513f0[_0x25c16b(0x173)](/<DIAGONAL MOVEMENT: ON>/i))this[_0x25c16b(0x26d)]=!![];else _0x4513f0[_0x25c16b(0x173)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x25c16b(0x26d)]=![]);},Game_Map[_0x292080(0x45b)][_0x292080(0x555)]=function(){const _0x1b54ee=_0x292080,_0x526001=$gameSystem[_0x1b54ee(0x533)]();if(_0x526001===_0x1b54ee(0x3a6))return!![];if(_0x526001===_0x1b54ee(0x2a9))return![];if(this[_0x1b54ee(0x26d)]===undefined)this[_0x1b54ee(0x203)]();return this['_diagonalSupport'];},Game_Map[_0x292080(0x45b)][_0x292080(0x2e4)]=function(_0x246c80,_0x54e276){const _0xec4b28=_0x292080;if([0x1,0x4,0x7][_0xec4b28(0x539)](_0x54e276))_0x246c80-=0x1;if([0x3,0x6,0x9][_0xec4b28(0x539)](_0x54e276))_0x246c80+=0x1;return this[_0xec4b28(0x185)](_0x246c80);},Game_Map[_0x292080(0x45b)][_0x292080(0x157)]=function(_0xd84759,_0x356595){const _0x4f128f=_0x292080;if([0x1,0x2,0x3][_0x4f128f(0x539)](_0x356595))_0xd84759+=0x1;if([0x7,0x8,0x9][_0x4f128f(0x539)](_0x356595))_0xd84759-=0x1;return this[_0x4f128f(0x160)](_0xd84759);},Game_Map['prototype'][_0x292080(0x1c8)]=function(_0x39c210,_0xef670c,_0x1d32bf,_0xbf1f2b){const _0x40ba74=_0x292080;return Math[_0x40ba74(0x13e)](Math[_0x40ba74(0x3f7)](this[_0x40ba74(0x41e)](_0x39c210,_0x1d32bf)),Math[_0x40ba74(0x3f7)](this['deltaY'](_0xef670c,_0xbf1f2b)));},Game_Map[_0x292080(0x45b)][_0x292080(0x54e)]=function(){const _0x35eabf=_0x292080,_0x187cc2=VisuMZ[_0x35eabf(0x364)][_0x35eabf(0x411)]['Region'],_0x80bdc3={},_0x35cc65=[_0x35eabf(0x247),'Forbid',_0x35eabf(0x34f)],_0xcc840f=['All',_0x35eabf(0x19b),'Player',_0x35eabf(0x3cf),_0x35eabf(0x491),_0x35eabf(0x2d0),_0x35eabf(0x335),_0x35eabf(0x2e6)];for(const _0x26b4fd of _0x35cc65){for(const _0x50c89d of _0xcc840f){const _0x58acf4=_0x35eabf(0x360)['format'](_0x50c89d,_0x26b4fd);_0x187cc2[_0x58acf4]&&(_0x80bdc3[_0x58acf4]=_0x187cc2[_0x58acf4][_0x35eabf(0x397)](0x0));}}const _0xc5500e=$dataMap[_0x35eabf(0x2f3)]||'',_0x1d4a1c=_0xc5500e[_0x35eabf(0x173)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x1d4a1c)for(const _0x2212fa of _0x1d4a1c){_0x2212fa[_0x35eabf(0x173)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x3da2de=String(RegExp['$1'])[_0x35eabf(0x4d6)]()['trim'](),_0x8dc2ad=String(RegExp['$2'])[_0x35eabf(0x4d6)]()[_0x35eabf(0x42d)]();const _0x384fbc=JSON[_0x35eabf(0x235)]('['+RegExp['$3'][_0x35eabf(0x173)](/\d+/g)+']');_0x3da2de=_0x3da2de[_0x35eabf(0x166)](0x0)[_0x35eabf(0x4a5)]()+_0x3da2de[_0x35eabf(0x397)](0x1),_0x8dc2ad=_0x8dc2ad['charAt'](0x0)[_0x35eabf(0x4a5)]()+_0x8dc2ad[_0x35eabf(0x397)](0x1);const _0x4f002a=_0x35eabf(0x360)['format'](_0x3da2de,_0x8dc2ad);if(_0x80bdc3[_0x4f002a])_0x80bdc3[_0x4f002a]=_0x80bdc3[_0x4f002a][_0x35eabf(0x16b)](_0x384fbc);}this['_regionRules']=_0x80bdc3;},Game_Map['prototype'][_0x292080(0x254)]=function(_0x553f37,_0x22503e,_0x4eeec6,_0x5b02b5){const _0x512c66=_0x292080,_0x303223=this[_0x512c66(0x2e4)](_0x553f37,_0x4eeec6),_0x5a0625=this[_0x512c66(0x157)](_0x22503e,_0x4eeec6),_0x544398=this[_0x512c66(0x2f9)](_0x303223,_0x5a0625),_0x36f444=this[_0x512c66(0x30e)];if(_0x36f444['AllAllow']['includes'](_0x544398))return!![];else{if(_0x5b02b5===_0x512c66(0x2b4))return _0x36f444['PlayerAllow'][_0x512c66(0x539)](_0x544398)||_0x36f444[_0x512c66(0x3fe)][_0x512c66(0x539)](_0x544398);else{if(_0x5b02b5===_0x512c66(0x47f))return _0x36f444[_0x512c66(0x3d8)][_0x512c66(0x539)](_0x544398)||_0x36f444[_0x512c66(0x3fe)]['includes'](_0x544398);else{if(_0x36f444[_0x512c66(0x55d)]['includes'](_0x544398))return!![];else{const _0x3f234d='%1Allow'[_0x512c66(0x193)](_0x5b02b5[_0x512c66(0x166)](0x0)['toUpperCase']()+_0x5b02b5['slice'](0x1));if(_0x36f444[_0x3f234d])return _0x36f444[_0x3f234d][_0x512c66(0x539)](_0x544398);}}}}return![];},Game_Map['prototype'][_0x292080(0x43a)]=function(_0x5707c9,_0x19cc01,_0xd5c822,_0x4234bc){const _0x185f49=_0x292080,_0x468262=this[_0x185f49(0x2e4)](_0x5707c9,_0xd5c822),_0xd38d1=this[_0x185f49(0x157)](_0x19cc01,_0xd5c822),_0x14c034=this[_0x185f49(0x2f9)](_0x468262,_0xd38d1),_0xeae9f2=this[_0x185f49(0x30e)];if(_0xeae9f2[_0x185f49(0x505)][_0x185f49(0x539)](_0x14c034))return!![];else{if(_0x4234bc===_0x185f49(0x2b4))return _0xeae9f2['PlayerForbid']['includes'](_0x14c034)||_0xeae9f2['WalkForbid'][_0x185f49(0x539)](_0x14c034);else{if(_0x4234bc===_0x185f49(0x47f))return _0xeae9f2[_0x185f49(0x32d)][_0x185f49(0x539)](_0x14c034)||_0xeae9f2[_0x185f49(0x19c)]['includes'](_0x14c034);else{if(_0xeae9f2[_0x185f49(0x49d)][_0x185f49(0x539)](_0x14c034))return!![];else{const _0x34c7ed=_0x185f49(0x453)[_0x185f49(0x193)](_0x4234bc[_0x185f49(0x166)](0x0)[_0x185f49(0x4a5)]()+_0x4234bc[_0x185f49(0x397)](0x1));if(_0xeae9f2[_0x34c7ed])return _0xeae9f2[_0x34c7ed]['includes'](_0x14c034);}}}}return![];},Game_Map[_0x292080(0x45b)][_0x292080(0x3c1)]=function(_0x53696a,_0x546183,_0x29fbfd,_0x490b33){const _0xb67a3a=_0x292080;_0x29fbfd=_0x490b33===_0xb67a3a(0x29a)?0x5:_0x29fbfd;const _0x527328=this[_0xb67a3a(0x2e4)](_0x53696a,_0x29fbfd),_0x29aac4=this[_0xb67a3a(0x157)](_0x546183,_0x29fbfd),_0x1835f4=this['regionId'](_0x527328,_0x29aac4),_0x30b392=this[_0xb67a3a(0x30e)];if(_0x30b392[_0xb67a3a(0x326)][_0xb67a3a(0x539)](_0x1835f4))return!![];else{const _0x4d9176=_0xb67a3a(0x450)[_0xb67a3a(0x193)](_0x490b33[_0xb67a3a(0x166)](0x0)['toUpperCase']()+_0x490b33['slice'](0x1));if(_0x30b392[_0x4d9176])return _0x30b392[_0x4d9176]['includes'](_0x1835f4);}return![];},VisuMZ[_0x292080(0x364)][_0x292080(0x138)]=Game_Map[_0x292080(0x45b)]['refresh'],Game_Map[_0x292080(0x45b)][_0x292080(0x191)]=function(){const _0x3ba3cf=_0x292080;VisuMZ[_0x3ba3cf(0x364)][_0x3ba3cf(0x138)][_0x3ba3cf(0x46f)](this),this[_0x3ba3cf(0x18c)]();},Game_Map[_0x292080(0x45b)][_0x292080(0x18c)]=function(){const _0x1b0efb=_0x292080;this[_0x1b0efb(0x1b4)]=![];if(this[_0x1b0efb(0x54c)]()[_0x1b0efb(0x470)](_0x502c1b=>_0x502c1b[_0x1b0efb(0x3ca)]())){this[_0x1b0efb(0x1b4)]=!![];return;}if(this['events']()[_0x1b0efb(0x470)](_0x2a8545=>_0x2a8545[_0x1b0efb(0x385)]())){this[_0x1b0efb(0x1b4)]=!![];return;}if(this['_commonEvents'][_0x1b0efb(0x470)](_0x46746e=>_0x46746e[_0x1b0efb(0x3ca)]())){this['_needsPeriodicRefresh']=!![];return;}if(this['_commonEvents'][_0x1b0efb(0x470)](_0x88c573=>_0x88c573[_0x1b0efb(0x385)]())){this['_needsPeriodicRefresh']=!![];return;}},VisuMZ[_0x292080(0x364)][_0x292080(0x321)]=Game_Map['prototype']['update'],Game_Map[_0x292080(0x45b)]['update']=function(_0x28fb84){const _0x3b2e41=_0x292080;this[_0x3b2e41(0x2d7)](),VisuMZ[_0x3b2e41(0x364)][_0x3b2e41(0x321)][_0x3b2e41(0x46f)](this,_0x28fb84);},Game_Map['prototype'][_0x292080(0x2d7)]=function(){const _0x14701f=_0x292080;if(!this['_needsPeriodicRefresh'])return;this[_0x14701f(0x391)]=this[_0x14701f(0x391)]||0x3c,this[_0x14701f(0x391)]--,this[_0x14701f(0x391)]<=0x0&&(this[_0x14701f(0x40f)](),this[_0x14701f(0x391)]=0x3c);},VisuMZ['EventsMoveCore']['Game_Map_isDashDisabled']=Game_Map[_0x292080(0x45b)][_0x292080(0x455)],Game_Map[_0x292080(0x45b)]['isDashDisabled']=function(){const _0x464a64=_0x292080;if(!$gameSystem[_0x464a64(0x224)]())return!![];return VisuMZ[_0x464a64(0x364)][_0x464a64(0x39f)][_0x464a64(0x46f)](this);},Game_Map[_0x292080(0x45b)][_0x292080(0x12d)]=function(){const _0x3ed4d5=_0x292080;this['_saveEventLocations']=![];const _0x82fcab=$dataMap['note']||'';_0x82fcab[_0x3ed4d5(0x173)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocations']=!![]);},Game_Map[_0x292080(0x45b)][_0x292080(0x12e)]=function(){const _0x203763=_0x292080;if(this[_0x203763(0x497)]===undefined)this[_0x203763(0x12d)]();return this['_saveEventLocations'];},Game_Map[_0x292080(0x45b)][_0x292080(0x35e)]=function(_0x564b60){const _0x5e4efd=_0x292080;_0x564b60!==this[_0x5e4efd(0x51b)]()&&$gamePlayer&&$gameSystem[_0x5e4efd(0x35e)](this[_0x5e4efd(0x51b)]());},Game_Map[_0x292080(0x45b)][_0x292080(0x316)]=function(){const _0x8d95c8=_0x292080;this['_spawnedEvents']=$gameSystem[_0x8d95c8(0x289)](this[_0x8d95c8(0x51b)]()),this[_0x8d95c8(0x514)]=!![];},VisuMZ[_0x292080(0x364)][_0x292080(0x1a0)]=Game_Map['prototype']['events'],Game_Map[_0x292080(0x45b)][_0x292080(0x54c)]=function(){const _0x356eae=_0x292080;if(this[_0x356eae(0x50f)])return this[_0x356eae(0x50f)];const _0x33015d=VisuMZ[_0x356eae(0x364)][_0x356eae(0x1a0)][_0x356eae(0x46f)](this),_0x5d84fa=_0x33015d[_0x356eae(0x16b)](this[_0x356eae(0x33f)]||[]);return this[_0x356eae(0x50f)]=_0x5d84fa['filter'](_0x305a3e=>!!_0x305a3e),this[_0x356eae(0x50f)];},VisuMZ[_0x292080(0x364)][_0x292080(0x375)]=Game_Map[_0x292080(0x45b)][_0x292080(0x47f)],Game_Map['prototype'][_0x292080(0x47f)]=function(_0x355d0a){const _0x15f778=_0x292080;return _0x355d0a>=0x3e8?(_0x355d0a-=0x3e8,this[_0x15f778(0x33f)][_0x355d0a]):VisuMZ[_0x15f778(0x364)]['Game_Map_event'][_0x15f778(0x46f)](this,_0x355d0a);},Game_Map['prototype']['eraseEvent']=function(_0x39a00c){const _0x45b8f2=_0x292080,_0x1fe3e9=this[_0x45b8f2(0x47f)](_0x39a00c);if(_0x1fe3e9)_0x1fe3e9[_0x45b8f2(0x40d)]();},Game_Map[_0x292080(0x45b)]['setupSpawnTest']=function(){const _0x51b5fd=_0x292080,_0x516dfd={'template':_0x51b5fd(0x26b),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x51b5fd(0x33f)][_0x51b5fd(0x1bd)]+0x3e8};this['createSpawnedEventWithData'](_0x516dfd);},Game_Map[_0x292080(0x45b)][_0x292080(0x472)]=function(_0x529fd2,_0x2e0443){const _0x98d8b1=_0x292080;if(this[_0x98d8b1(0x508)](_0x529fd2,_0x2e0443)[_0x98d8b1(0x1bd)]>0x0)return!![];if($gamePlayer['x']===_0x529fd2&&$gamePlayer['y']===_0x2e0443)return!![];if(this[_0x98d8b1(0x201)]()[_0x98d8b1(0x446)](_0x529fd2,_0x2e0443))return!![];if(this[_0x98d8b1(0x27a)]()[_0x98d8b1(0x446)](_0x529fd2,_0x2e0443))return!![];return![];},Game_Map['prototype']['isSpawnHitboxCollisionOk']=function(_0x58f11a,_0x1a8f8a,_0x48c67f){const _0x89f932=_0x292080;$gameTemp[_0x89f932(0x2c2)]=_0x58f11a;const _0x3209fb=new Game_Event(_0x58f11a[_0x89f932(0x51b)],_0x58f11a['eventId']);$gameTemp[_0x89f932(0x2c2)]=undefined,_0x3209fb[_0x89f932(0x191)]();let _0x3be704=_0x1a8f8a-_0x3209fb[_0x89f932(0x45a)][_0x89f932(0x37c)],_0x52e462=_0x1a8f8a+_0x3209fb[_0x89f932(0x45a)][_0x89f932(0x372)],_0x52d89a=_0x48c67f-_0x3209fb['_addedHitbox']['up'],_0x34d47b=_0x48c67f+_0x3209fb['_addedHitbox']['down'];for(let _0x186991=_0x3be704;_0x186991<=_0x52e462;_0x186991++){for(let _0x35eb95=_0x52d89a;_0x35eb95<=_0x34d47b;_0x35eb95++){if(this[_0x89f932(0x472)](_0x186991,_0x35eb95))return![];}}return!![];},Game_Map[_0x292080(0x45b)]['createSpawnedEventWithData']=function(_0x4e9ecf){const _0x1ed73d=_0x292080;$gameTemp[_0x1ed73d(0x2c2)]=_0x4e9ecf;const _0x1c0bd0=new Game_Event(_0x4e9ecf[_0x1ed73d(0x51b)],_0x4e9ecf['eventId']);$gameTemp[_0x1ed73d(0x2c2)]=undefined,this[_0x1ed73d(0x33f)][_0x1ed73d(0x3dd)](_0x1c0bd0),_0x1c0bd0['setupSpawn'](_0x4e9ecf),this['clearEventCache']();},Game_Map[_0x292080(0x45b)][_0x292080(0x328)]=function(_0x42fa4c,_0x5a1b49,_0x2e293d){const _0x2949d0=_0x292080,_0x1d4266=_0x42fa4c[_0x2949d0(0x498)][_0x2949d0(0x4a5)]()[_0x2949d0(0x42d)]();if(_0x1d4266!==_0x2949d0(0x4db)){const _0x49f356=VisuMZ[_0x2949d0(0x569)][_0x1d4266];_0x49f356&&(_0x42fa4c['mapId']=_0x49f356[_0x2949d0(0x1c7)],_0x42fa4c[_0x2949d0(0x35a)]=_0x49f356[_0x2949d0(0x4bb)]);}const _0x233e7b=_0x42fa4c['x'],_0x3a3d53=_0x42fa4c['y'];if(!this[_0x2949d0(0x1ba)](_0x233e7b,_0x3a3d53))return![];if(_0x5a1b49){if(this[_0x2949d0(0x472)](_0x233e7b,_0x3a3d53))return![];if(!this[_0x2949d0(0x377)](_0x42fa4c,_0x233e7b,_0x3a3d53))return![];}if(_0x2e293d){if(!this['isPassableByAnyDirection'](_0x233e7b,_0x3a3d53))return![];}return this[_0x2949d0(0x2b0)](_0x42fa4c),!![];},Game_Map[_0x292080(0x45b)][_0x292080(0x3aa)]=function(_0x300089,_0x318960,_0x37097b,_0x4af44d){const _0x15f03c=_0x292080,_0x51c50e=_0x300089['template'][_0x15f03c(0x4a5)]()['trim']();if(_0x51c50e!=='UNTITLED'){const _0x1e51d4=VisuMZ[_0x15f03c(0x569)][_0x51c50e];_0x1e51d4&&(_0x300089['mapId']=_0x1e51d4['MapID'],_0x300089[_0x15f03c(0x35a)]=_0x1e51d4[_0x15f03c(0x4bb)]);}const _0x50c820=[],_0x4f1309=this['width'](),_0x87b715=this[_0x15f03c(0x2ea)]();for(let _0x1a93bf=0x0;_0x1a93bf<_0x4f1309;_0x1a93bf++){for(let _0x4e2d78=0x0;_0x4e2d78<_0x87b715;_0x4e2d78++){if(!_0x318960[_0x15f03c(0x539)](this[_0x15f03c(0x2f9)](_0x1a93bf,_0x4e2d78)))continue;if(!this['isValid'](_0x1a93bf,_0x4e2d78))continue;if(_0x37097b){if(this['checkExistingEntitiesAt'](_0x1a93bf,_0x4e2d78))continue;if(!this[_0x15f03c(0x377)](_0x300089,_0x1a93bf,_0x4e2d78))continue;}if(_0x4af44d){if(!this[_0x15f03c(0x13a)](_0x1a93bf,_0x4e2d78))continue;}_0x50c820[_0x15f03c(0x3dd)]([_0x1a93bf,_0x4e2d78]);}}if(_0x50c820[_0x15f03c(0x1bd)]>0x0){const _0x2635f4=_0x50c820[Math['randomInt'](_0x50c820[_0x15f03c(0x1bd)])];return _0x300089['x']=_0x2635f4[0x0],_0x300089['y']=_0x2635f4[0x1],this[_0x15f03c(0x2b0)](_0x300089),!![];}return![];},Game_Map[_0x292080(0x45b)][_0x292080(0x3b2)]=function(_0x51b1df,_0x3d42f3,_0x18cf42,_0xcd20e4){const _0x5a6a47=_0x292080,_0x463a67=_0x51b1df[_0x5a6a47(0x498)][_0x5a6a47(0x4a5)]()[_0x5a6a47(0x42d)]();if(_0x463a67!=='UNTITLED'){const _0x1d6057=VisuMZ[_0x5a6a47(0x569)][_0x463a67];_0x1d6057&&(_0x51b1df['mapId']=_0x1d6057[_0x5a6a47(0x1c7)],_0x51b1df[_0x5a6a47(0x35a)]=_0x1d6057[_0x5a6a47(0x4bb)]);}const _0x53850e=[],_0x4a3987=this[_0x5a6a47(0x474)](),_0x7b41cb=this[_0x5a6a47(0x2ea)]();for(let _0x5de810=0x0;_0x5de810<_0x4a3987;_0x5de810++){for(let _0x5a3aa0=0x0;_0x5a3aa0<_0x7b41cb;_0x5a3aa0++){if(!_0x3d42f3[_0x5a6a47(0x539)](this[_0x5a6a47(0x528)](_0x5de810,_0x5a3aa0)))continue;if(!this['isValid'](_0x5de810,_0x5a3aa0))continue;if(_0x18cf42){if(this[_0x5a6a47(0x472)](_0x5de810,_0x5a3aa0))continue;if(!this['isSpawnHitboxCollisionOk'](_0x51b1df,_0x5de810,_0x5a3aa0))continue;}if(_0xcd20e4){if(!this[_0x5a6a47(0x13a)](_0x5de810,_0x5a3aa0))continue;}_0x53850e['push']([_0x5de810,_0x5a3aa0]);}}if(_0x53850e['length']>0x0){const _0x2af6c5=_0x53850e[Math[_0x5a6a47(0x275)](_0x53850e[_0x5a6a47(0x1bd)])];return _0x51b1df['x']=_0x2af6c5[0x0],_0x51b1df['y']=_0x2af6c5[0x1],this['createSpawnedEventWithData'](_0x51b1df),!![];}return![];},Game_Map[_0x292080(0x45b)][_0x292080(0x13a)]=function(_0x2118d5,_0x259857){const _0x50b7d3=_0x292080;if(this[_0x50b7d3(0x137)](_0x2118d5,_0x259857,0x2))return!![];if(this[_0x50b7d3(0x137)](_0x2118d5,_0x259857,0x4))return!![];if(this[_0x50b7d3(0x137)](_0x2118d5,_0x259857,0x6))return!![];if(this['isPassable'](_0x2118d5,_0x259857,0x8))return!![];return![];},Game_Map['prototype']['despawnEventId']=function(_0x24e6b8){const _0x46c0ad=_0x292080;if(_0x24e6b8<0x3e8)return;if(!this['_spawnedEvents'])return;const _0x5367b0=this[_0x46c0ad(0x47f)](_0x24e6b8);_0x5367b0[_0x46c0ad(0x44c)](-0x1,-0x1),_0x5367b0['erase'](),this[_0x46c0ad(0x33f)][_0x24e6b8-0x3e8]=null,this[_0x46c0ad(0x3f0)]();},Game_Map[_0x292080(0x45b)][_0x292080(0x223)]=function(){for(const _0x22b9e4 of this['_spawnedEvents']){if(_0x22b9e4)return _0x22b9e4;}return null;},Game_Map['prototype'][_0x292080(0x19a)]=function(){const _0x582016=_0x292080,_0x139c59=this[_0x582016(0x223)]();return _0x139c59?_0x139c59['_eventId']:0x0;},Game_Map[_0x292080(0x45b)]['lastSpawnedEvent']=function(){const _0x4002c2=_0x292080,_0x38a761=this[_0x4002c2(0x33f)][_0x4002c2(0x397)](0x0)['reverse']();for(const _0x4692af of _0x38a761){if(_0x4692af)return _0x4692af;}return null;},Game_Map['prototype'][_0x292080(0x3ba)]=function(){const _0x206d46=_0x292080,_0x388e8d=this[_0x206d46(0x47d)]();return _0x388e8d?_0x388e8d[_0x206d46(0x487)]:0x0;},Game_Map[_0x292080(0x45b)][_0x292080(0x214)]=function(_0x1fde1c,_0x35484d){const _0x1ecf5e=_0x292080,_0x3f3690=this[_0x1ecf5e(0x508)](_0x1fde1c,_0x35484d);for(const _0x56ace2 of _0x3f3690){if(!_0x56ace2)continue;if(_0x56ace2[_0x1ecf5e(0x362)]())this[_0x1ecf5e(0x135)](_0x56ace2[_0x1ecf5e(0x487)]);}},Game_Map[_0x292080(0x45b)]['despawnRegions']=function(_0x3241fd){const _0x5411fe=_0x292080;for(const _0x92c46b of this[_0x5411fe(0x33f)]){if(!_0x92c46b)continue;_0x3241fd[_0x5411fe(0x539)](_0x92c46b[_0x5411fe(0x2f9)]())&&this['despawnEventId'](_0x92c46b['_eventId']);}},Game_Map[_0x292080(0x45b)][_0x292080(0x3e8)]=function(_0x2ff286){const _0x2df5da=_0x292080;for(const _0x5ae990 of this[_0x2df5da(0x33f)]){if(!_0x5ae990)continue;_0x2ff286[_0x2df5da(0x539)](_0x5ae990[_0x2df5da(0x528)]())&&this[_0x2df5da(0x135)](_0x5ae990['_eventId']);}},Game_Map[_0x292080(0x45b)][_0x292080(0x512)]=function(){const _0x60b717=_0x292080;for(const _0x500739 of this[_0x60b717(0x33f)]){if(!_0x500739)continue;this['despawnEventId'](_0x500739[_0x60b717(0x487)]);}},VisuMZ[_0x292080(0x364)][_0x292080(0x565)]=Game_Map[_0x292080(0x45b)]['unlockEvent'],Game_Map[_0x292080(0x45b)][_0x292080(0x2e9)]=function(_0x219568){const _0x2e4590=_0x292080;VisuMZ[_0x2e4590(0x364)][_0x2e4590(0x565)][_0x2e4590(0x46f)](this,_0x219568);if(_0x219568>=0x3e8){const _0x591f84=this[_0x2e4590(0x47f)](_0x219568);if(_0x591f84)_0x591f84[_0x2e4590(0x4c9)]();}},Game_Map['prototype'][_0x292080(0x1ef)]=function(){const _0x32c815=_0x292080;this[_0x32c815(0x1f6)]=![],this['_forceHidePlayer']=![];if(!$dataMap)return;const _0x576fb3=$dataMap[_0x32c815(0x2f3)]||'';if(_0x576fb3[_0x32c815(0x173)](/<HIDE PLAYER>/i))this[_0x32c815(0x1f6)]=![],this[_0x32c815(0x563)]=!![];else _0x576fb3[_0x32c815(0x173)](/<SHOW PLAYER>/i)&&(this[_0x32c815(0x1f6)]=!![],this[_0x32c815(0x563)]=![]);},Game_Map['prototype']['isPlayerForceShown']=function(){const _0xf832dd=_0x292080;return this[_0xf832dd(0x1f6)]===undefined&&this['setupPlayerVisibilityOverrides'](),this[_0xf832dd(0x1f6)];},Game_Map[_0x292080(0x45b)]['isPlayerForceHidden']=function(){const _0x5210e8=_0x292080;return this['_forceHidePlayer']===undefined&&this[_0x5210e8(0x1ef)](),this['_forceHidePlayer'];},VisuMZ[_0x292080(0x364)][_0x292080(0x1fe)]=Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x28a)],Game_CharacterBase['prototype'][_0x292080(0x28a)]=function(){const _0x29975b=_0x292080;if(this===$gamePlayer){if($gameMap['isPlayerForceShown']())return![];if($gameMap[_0x29975b(0x45d)]())return!![];}return VisuMZ[_0x29975b(0x364)][_0x29975b(0x1fe)][_0x29975b(0x46f)](this);},Game_Map['prototype'][_0x292080(0x4ae)]=function(){const _0x106275=_0x292080;this[_0x106275(0x31c)]=![],this[_0x106275(0x44d)]=![];if(!$dataMap)return;const _0x31b0c6=$dataMap[_0x106275(0x2f3)]||'';if(_0x31b0c6['match'](/<HIDE FOLLOWERS>/i))this['_forceShowFollower']=![],this[_0x106275(0x44d)]=!![];else _0x31b0c6['match'](/<SHOW FOLLOWERS>/i)&&(this['_forceShowFollower']=!![],this[_0x106275(0x44d)]=![]);},Game_Map['prototype']['areFollowersForceShown']=function(){const _0x16a867=_0x292080;return this['_forceShowFollower']===undefined&&this['setupFollowerVisibilityOverrides'](),this[_0x16a867(0x31c)];},Game_Map[_0x292080(0x45b)][_0x292080(0x48b)]=function(){const _0x4359e7=_0x292080;return this[_0x4359e7(0x44d)]===undefined&&this['setupFollowerVisibilityOverrides'](),this['_forceHideFollower'];},VisuMZ[_0x292080(0x364)]['Game_Followers_isVisible']=Game_Followers[_0x292080(0x45b)]['isVisible'],Game_Followers[_0x292080(0x45b)][_0x292080(0x1cf)]=function(){const _0x1701ac=_0x292080;if($gameMap[_0x1701ac(0x19d)]())return!![];if($gameMap[_0x1701ac(0x48b)]())return![];return VisuMZ[_0x1701ac(0x364)]['Game_Followers_isVisible'][_0x1701ac(0x46f)](this);},Game_CommonEvent['prototype'][_0x292080(0x3ca)]=function(){const _0x32ccb3=_0x292080,_0x109776=this[_0x32ccb3(0x47f)]();return this[_0x32ccb3(0x15f)]()&&_0x109776[_0x32ccb3(0x315)]>=0x1&&DataManager[_0x32ccb3(0x424)](_0x109776['switchId']);},Game_CommonEvent[_0x292080(0x45b)]['hasCPCs']=function(){const _0xd006ea=_0x292080;return VisuMZ[_0xd006ea(0x364)][_0xd006ea(0x4df)][_0xd006ea(0x39a)][_0xd006ea(0x539)](this['_commonEventId']);},VisuMZ[_0x292080(0x364)]['Game_CommonEvent_isActive']=Game_CommonEvent[_0x292080(0x45b)]['isActive'],Game_CommonEvent[_0x292080(0x45b)]['isActive']=function(){const _0x11a492=_0x292080;if(VisuMZ[_0x11a492(0x364)]['Game_CommonEvent_isActive'][_0x11a492(0x46f)](this))return!![];else{const _0x385341=this[_0x11a492(0x47f)]();return VisuMZ[_0x11a492(0x364)][_0x11a492(0x4df)]['metCPC'](this[_0x11a492(0x47f)]()[_0x11a492(0x445)],this['_commonEventId'],_0x385341);}},VisuMZ[_0x292080(0x364)][_0x292080(0x284)]=Game_Map[_0x292080(0x45b)][_0x292080(0x16c)],Game_Map['prototype'][_0x292080(0x16c)]=function(){const _0x3f5488=_0x292080,_0x23c59f=VisuMZ[_0x3f5488(0x364)][_0x3f5488(0x284)]['call'](this),_0x218c7c=VisuMZ[_0x3f5488(0x364)][_0x3f5488(0x4df)]['_commonEvents'][_0x3f5488(0x1b5)](_0x553a4d=>$dataCommonEvents[_0x553a4d]);return _0x23c59f[_0x3f5488(0x16b)](_0x218c7c)['filter']((_0x36d1f3,_0x9cefab,_0x9cb9cd)=>_0x9cb9cd[_0x3f5488(0x49e)](_0x36d1f3)===_0x9cefab);},Game_CharacterBase[_0x292080(0x3ad)]=VisuMZ['EventsMoveCore'][_0x292080(0x411)][_0x292080(0x1ec)]['DashOnLadder']??![],VisuMZ[_0x292080(0x364)]['Game_CharacterBase_initMembers']=Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x28d)],Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x28d)]=function(){const _0x294672=_0x292080;VisuMZ[_0x294672(0x364)][_0x294672(0x1a1)][_0x294672(0x46f)](this),this[_0x294672(0x3ee)]();},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x3ee)]=function(){const _0x3ab63c=_0x292080;this[_0x3ab63c(0x447)]=0x1,this['_scaleBaseY']=0x1,this['_patternLocked']=![],this[_0x3ab63c(0x4f0)](),this[_0x3ab63c(0x3f2)](),this[_0x3ab63c(0x1d0)](),this['clearStepPattern']();},VisuMZ[_0x292080(0x364)][_0x292080(0x462)]=Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x3e7)],Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x3e7)]=function(){const _0x5c60b8=_0x292080;let _0x7d71cb=VisuMZ[_0x5c60b8(0x364)]['Game_CharacterBase_opacity'][_0x5c60b8(0x46f)](this);return _0x7d71cb=this[_0x5c60b8(0x36a)](_0x7d71cb),_0x7d71cb;},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x36a)]=function(_0x5258f2){return _0x5258f2;},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x524)]=function(){const _0x39f99b=_0x292080;if(this[_0x39f99b(0x1af)]===Game_Player&&this[_0x39f99b(0x2a0)]())return this[_0x39f99b(0x195)]()['characterName']()[_0x39f99b(0x173)](/\[VS8\]/i);else return Imported[_0x39f99b(0x551)]&&this[_0x39f99b(0x204)]()?!![]:this[_0x39f99b(0x463)]()['match'](/\[VS8\]/i);},VisuMZ['EventsMoveCore'][_0x292080(0x2c3)]=Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x56c)],Game_CharacterBase[_0x292080(0x45b)]['direction']=function(){const _0x2a7250=_0x292080;if(!$dataMap)return this['_direction']||0x2;if(this['isOnLadder']()&&!this[_0x2a7250(0x4c1)]()&&this[_0x2a7250(0x524)]())return this[_0x2a7250(0x4bc)]();else{if(this[_0x2a7250(0x24d)]()&&!this[_0x2a7250(0x4c1)]())return 0x8;else return this[_0x2a7250(0x17b)]()&&this['isSpriteVS8dir']()?this[_0x2a7250(0x37d)]():VisuMZ[_0x2a7250(0x364)][_0x2a7250(0x2c3)][_0x2a7250(0x46f)](this);}},VisuMZ['EventsMoveCore'][_0x292080(0x1ab)]=Game_CharacterBase[_0x292080(0x45b)]['setDirection'],Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x43d)]=function(_0x52d271){const _0x53b9cc=_0x292080;if(!this['isSpriteVS8dir']())_0x52d271=this[_0x53b9cc(0x2ac)](_0x52d271);VisuMZ[_0x53b9cc(0x364)][_0x53b9cc(0x1ab)]['call'](this,_0x52d271),this[_0x53b9cc(0x329)]();},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x2ac)]=function(_0x113836){const _0x45b080=_0x292080;if(_0x113836===0x1)return this[_0x45b080(0x192)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x113836===0x3)return this[_0x45b080(0x192)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x113836===0x7)return this['canPass'](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x113836===0x9)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x113836;},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x252)]=function(_0x40387c){return[0x1,0x3,0x5,0x7,0x9]['includes'](_0x40387c);},Game_CharacterBase['prototype'][_0x292080(0x1e5)]=function(){return this['_lastMovedDirection']||0x0;},VisuMZ[_0x292080(0x364)][_0x292080(0x52f)]=Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x3c7)],Game_CharacterBase['prototype'][_0x292080(0x3c7)]=function(_0x3aec47){const _0x14b79f=_0x292080;this[_0x14b79f(0x509)]=_0x3aec47,VisuMZ['EventsMoveCore'][_0x14b79f(0x52f)][_0x14b79f(0x46f)](this,_0x3aec47);},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x2da)]=function(_0x582e68){const _0x56daf5=_0x292080;if(!this[_0x56daf5(0x252)](_0x582e68))return this['moveStraight'](_0x582e68);let _0x3a78c0=0x0,_0x1bc1d4=0x0;switch(_0x582e68){case 0x1:_0x3a78c0=0x4,_0x1bc1d4=0x2;break;case 0x3:_0x3a78c0=0x6,_0x1bc1d4=0x2;break;case 0x7:_0x3a78c0=0x4,_0x1bc1d4=0x8;break;case 0x9:_0x3a78c0=0x6,_0x1bc1d4=0x8;break;}if(VisuMZ['EventsMoveCore'][_0x56daf5(0x411)][_0x56daf5(0x1ec)][_0x56daf5(0x29d)]){if(!this[_0x56daf5(0x192)](this['_x'],this['_y'],_0x3a78c0))return this['moveStraight'](_0x1bc1d4);if(!this['canPass'](this['_x'],this['_y'],_0x1bc1d4))return this[_0x56daf5(0x3c7)](_0x3a78c0);if(!this[_0x56daf5(0x3fa)](this['_x'],this['_y'],_0x3a78c0,_0x1bc1d4)){let _0x33dbc4=VisuMZ[_0x56daf5(0x364)][_0x56daf5(0x411)][_0x56daf5(0x1ec)][_0x56daf5(0x41c)]?_0x3a78c0:_0x1bc1d4;return this[_0x56daf5(0x3c7)](_0x33dbc4);}}this[_0x56daf5(0x509)]=_0x582e68,this[_0x56daf5(0x34d)](_0x3a78c0,_0x1bc1d4);},VisuMZ['EventsMoveCore'][_0x292080(0x1d2)]=Game_CharacterBase[_0x292080(0x45b)]['realMoveSpeed'],Game_CharacterBase[_0x292080(0x45b)]['realMoveSpeed']=function(){const _0x400ee3=_0x292080;let _0x2f213a=this['_moveSpeed'];return this[_0x400ee3(0x2fa)]()&&(_0x2f213a+=this[_0x400ee3(0x519)]()),this[_0x400ee3(0x351)](_0x2f213a);},Game_CharacterBase['prototype'][_0x292080(0x519)]=function(){const _0x3de283=_0x292080,_0x2bd5da=VisuMZ[_0x3de283(0x364)]['Settings'][_0x3de283(0x1ec)];return _0x2bd5da[_0x3de283(0x251)]!==undefined?_0x2bd5da[_0x3de283(0x251)]:VisuMZ[_0x3de283(0x364)][_0x3de283(0x1d2)][_0x3de283(0x46f)](this)-this[_0x3de283(0x439)];},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x351)]=function(_0x3fff0f){const _0x4e5b3a=_0x292080,_0x53b93e=VisuMZ[_0x4e5b3a(0x364)][_0x4e5b3a(0x411)]['Movement'];if(!_0x53b93e[_0x4e5b3a(0x49c)])return _0x3fff0f;return[0x1,0x3,0x7,0x9][_0x4e5b3a(0x539)](this[_0x4e5b3a(0x509)])&&(_0x3fff0f*=_0x53b93e[_0x4e5b3a(0x28b)]||0.01),_0x3fff0f;},VisuMZ[_0x292080(0x364)]['Game_CharacterBase_isDashing']=Game_CharacterBase[_0x292080(0x45b)]['isDashing'],Game_CharacterBase[_0x292080(0x45b)]['isDashing']=function(){const _0x10f0e7=_0x292080;if(!Game_CharacterBase[_0x10f0e7(0x3ad)]&&this[_0x10f0e7(0x24d)]())return![];if(this[_0x10f0e7(0x306)])return!![];return VisuMZ[_0x10f0e7(0x364)][_0x10f0e7(0x50d)]['call'](this);},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x1e1)]=function(){const _0x16cd62=_0x292080;return this[_0x16cd62(0x2fa)]()&&this[_0x16cd62(0x3b1)]===0x0;},VisuMZ['EventsMoveCore']['Game_CharacterBase_pattern']=Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x1ff)],Game_CharacterBase[_0x292080(0x45b)]['pattern']=function(){const _0x44c4ca=_0x292080;return this['isPosing']()?this['getPosingCharacterPattern']():VisuMZ[_0x44c4ca(0x364)][_0x44c4ca(0x317)][_0x44c4ca(0x46f)](this);},VisuMZ[_0x292080(0x364)]['Game_CharacterBase_increaseSteps']=Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x2c8)],Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x2c8)]=function(){const _0x50440b=_0x292080;VisuMZ[_0x50440b(0x364)][_0x50440b(0x1b9)]['call'](this),this['clearPose']();},VisuMZ['EventsMoveCore'][_0x292080(0x12a)]=Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x49b)],Game_CharacterBase[_0x292080(0x45b)]['characterIndex']=function(){const _0x6b658b=_0x292080;if(this[_0x6b658b(0x524)]())return this[_0x6b658b(0x53b)]();return VisuMZ[_0x6b658b(0x364)][_0x6b658b(0x12a)][_0x6b658b(0x46f)](this);},Game_CharacterBase[_0x292080(0x45b)]['characterIndexVS8']=function(){const _0x4f5f02=_0x292080,_0x1e5da0=this[_0x4f5f02(0x56c)]();if(this[_0x4f5f02(0x4c1)]()){if([0x2,0x4,0x6,0x8][_0x4f5f02(0x539)](_0x1e5da0))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x1e5da0))return 0x5;}else{if(this['isOnLadder']())return 0x6;else{if(this[_0x4f5f02(0x17b)]())return this[_0x4f5f02(0x37a)]();else{if(this['_forceCarrying']){if([0x2,0x4,0x6,0x8]['includes'](_0x1e5da0))return 0x4;if([0x1,0x3,0x7,0x9][_0x4f5f02(0x539)](_0x1e5da0))return 0x5;}else{if(this[_0x4f5f02(0x2c1)]()&&this[_0x4f5f02(0x349)]()){if([0x2,0x4,0x6,0x8][_0x4f5f02(0x539)](_0x1e5da0))return 0x4;if([0x1,0x3,0x7,0x9][_0x4f5f02(0x539)](_0x1e5da0))return 0x5;}else{if(this[_0x4f5f02(0x1e1)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x1e5da0))return 0x2;if([0x1,0x3,0x7,0x9][_0x4f5f02(0x539)](_0x1e5da0))return 0x3;}else{if([0x2,0x4,0x6,0x8][_0x4f5f02(0x539)](_0x1e5da0))return 0x0;if([0x1,0x3,0x7,0x9][_0x4f5f02(0x539)](_0x1e5da0))return 0x1;}}}}}}},Game_CharacterBase[_0x292080(0x45b)]['useCarryPoseForIcons']=function(){const _0x364a61=_0x292080;return VisuMZ[_0x364a61(0x364)][_0x364a61(0x411)][_0x364a61(0x22a)]['CarryPose'];},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x202)]=function(){const _0x4d2ba0=_0x292080;return this['isOnLadder']()&&this[_0x4d2ba0(0x528)]()===VisuMZ[_0x4d2ba0(0x364)][_0x4d2ba0(0x411)][_0x4d2ba0(0x2f2)][_0x4d2ba0(0x128)];},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x4bc)]=function(){const _0x3a6e0e=_0x292080;return this[_0x3a6e0e(0x202)]()?0x4:0x2;},VisuMZ[_0x292080(0x364)]['Game_CharacterBase_update']=Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x434)],Game_CharacterBase['prototype'][_0x292080(0x434)]=function(){const _0x1e380c=_0x292080;this[_0x1e380c(0x55c)](),VisuMZ[_0x1e380c(0x364)][_0x1e380c(0x2eb)][_0x1e380c(0x46f)](this),this['updatePose']();},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x55c)]=function(){const _0x35b520=_0x292080;this['_scaleX']=this[_0x35b520(0x447)]??0x1,this[_0x35b520(0x379)]=this[_0x35b520(0x155)]??0x1;},VisuMZ[_0x292080(0x364)]['Game_CharacterBase_bushDepth']=Game_CharacterBase[_0x292080(0x45b)]['bushDepth'],Game_CharacterBase[_0x292080(0x45b)]['bushDepth']=function(){const _0x340832=_0x292080;let _0xb627f3=VisuMZ[_0x340832(0x364)]['Game_CharacterBase_bushDepth'][_0x340832(0x46f)](this);return this['_scaleY']!==undefined&&(_0xb627f3/=Math[_0x340832(0x13e)](this[_0x340832(0x379)],0.00001)),Math['floor'](_0xb627f3);},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x3f6)]=function(){const _0x2a8716=_0x292080;this[_0x2a8716(0x48f)]=this['_poseDuration']||0x0;if(this[_0x2a8716(0x48f)]>0x0){this[_0x2a8716(0x48f)]--;if(this[_0x2a8716(0x48f)]<=0x0&&this['_pose']!==_0x2a8716(0x4ac))this[_0x2a8716(0x4f0)]();}},VisuMZ[_0x292080(0x364)][_0x292080(0x38d)]=Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x34d)],Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x34d)]=function(_0x3af3c8,_0x49f9db){const _0x1c5b51=_0x292080;VisuMZ['EventsMoveCore']['Game_CharacterBase_moveDiagonally']['call'](this,_0x3af3c8,_0x49f9db);if(this[_0x1c5b51(0x524)]())this[_0x1c5b51(0x151)](_0x3af3c8,_0x49f9db);},Game_CharacterBase[_0x292080(0x45b)]['setDiagonalDirection']=function(_0x35c266,_0x58ed00){const _0x451b52=_0x292080;if(_0x35c266===0x4&&_0x58ed00===0x2)this[_0x451b52(0x43d)](0x1);if(_0x35c266===0x6&&_0x58ed00===0x2)this[_0x451b52(0x43d)](0x3);if(_0x35c266===0x4&&_0x58ed00===0x8)this[_0x451b52(0x43d)](0x7);if(_0x35c266===0x6&&_0x58ed00===0x8)this[_0x451b52(0x43d)](0x9);},VisuMZ['EventsMoveCore']['Game_CharacterBase_hasStepAnime']=Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x3bd)],Game_CharacterBase['prototype'][_0x292080(0x3bd)]=function(){const _0x4b516a=_0x292080;if(this[_0x4b516a(0x17b)]()&&this[_0x4b516a(0x483)]()===_0x4b516a(0x4ac))return!![];return VisuMZ[_0x4b516a(0x364)][_0x4b516a(0x43b)]['call'](this);},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x3dc)]=function(_0x166f5e,_0x7d2e0d){const _0x1c39ee=_0x292080;if(_0x166f5e['match'](/Z/i))_0x166f5e='ZZZ';if(_0x166f5e[_0x1c39ee(0x173)](/SLEEP/i))_0x166f5e=_0x1c39ee(0x4ac);this[_0x1c39ee(0x524)]()&&(this['_pose']=_0x166f5e[_0x1c39ee(0x4a5)]()['trim'](),this['_poseDuration']=_0x7d2e0d||Infinity);},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x483)]=function(){const _0xe1cf22=_0x292080;return this[_0xe1cf22(0x524)]()?(this[_0xe1cf22(0x412)]||'')[_0xe1cf22(0x4a5)]()[_0xe1cf22(0x42d)]():''[_0xe1cf22(0x4a5)]()[_0xe1cf22(0x42d)]();},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x46c)]=function(_0x5be278,_0x1e713a){const _0x479900=_0x292080;if(this['isSpriteVS8dir']()){const _0x5a7481=['',_0x479900(0x42e),'QUESTION',_0x479900(0x23c),_0x479900(0x47c),_0x479900(0x522),_0x479900(0x164),_0x479900(0x18b),_0x479900(0x2b7),_0x479900(0x475),_0x479900(0x4ac),'','','','',''][_0x5be278];this['setPose'](_0x5a7481,_0x1e713a);}},Game_CharacterBase[_0x292080(0x45b)]['clearPose']=function(){const _0x196c41=_0x292080;this[_0x196c41(0x412)]='',this[_0x196c41(0x48f)]=0x0;},Game_CharacterBase[_0x292080(0x45b)]['isPosing']=function(){const _0x502154=_0x292080;return this[_0x502154(0x524)]()&&!!this[_0x502154(0x412)];},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x37a)]=function(){const _0x52d782=_0x292080,_0x4b7e96=this[_0x52d782(0x412)][_0x52d782(0x4a5)]();switch(this['_pose'][_0x52d782(0x4a5)]()['trim']()){case'ITEM':case _0x52d782(0x280):case _0x52d782(0x369):case'HURT':case'KNEEL':case _0x52d782(0x41b):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase['prototype']['getPosingCharacterDirection']=function(){const _0x4a3f90=_0x292080;switch(this[_0x4a3f90(0x412)][_0x4a3f90(0x4a5)]()){case _0x4a3f90(0x42e):case _0x4a3f90(0x33a):case'MUSIC\x20NOTE':case'!':case'?':return 0x2;break;case _0x4a3f90(0x47c):case _0x4a3f90(0x522):case _0x4a3f90(0x164):return 0x4;break;case _0x4a3f90(0x499):case _0x4a3f90(0x280):case'VICTORY':case _0x4a3f90(0x18b):case _0x4a3f90(0x2b7):case _0x4a3f90(0x475):return 0x6;break;case _0x4a3f90(0x25a):case'KNEEL':case'COLLAPSE':case _0x4a3f90(0x4ac):case _0x4a3f90(0x32a):return 0x8;break;default:return VisuMZ[_0x4a3f90(0x364)]['Game_CharacterBase_setDirection'][_0x4a3f90(0x46f)](this);break;}},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x18d)]=function(){const _0x1bf47a=_0x292080;switch(this['_pose'][_0x1bf47a(0x4a5)]()){case'ITEM':case _0x1bf47a(0x25a):case _0x1bf47a(0x42e):case'!':case _0x1bf47a(0x47c):case _0x1bf47a(0x18b):return 0x0;break;case'HMPH':case _0x1bf47a(0x3e5):case _0x1bf47a(0x33a):case'?':case _0x1bf47a(0x522):case _0x1bf47a(0x2b7):return 0x1;break;case _0x1bf47a(0x369):case'COLLAPSE':case _0x1bf47a(0x23c):case'SWEAT':case _0x1bf47a(0x475):return 0x2;break;default:return VisuMZ[_0x1bf47a(0x364)][_0x1bf47a(0x317)]['call'](this);break;}},Game_CharacterBase[_0x292080(0x45b)]['forceCarrying']=function(){const _0x247dca=_0x292080;this[_0x247dca(0x406)]=!![];},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x504)]=function(){const _0x39d14c=_0x292080;this[_0x39d14c(0x406)]=![];},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x2cd)]=function(){const _0x30fbb4=_0x292080;this[_0x30fbb4(0x306)]=!![];},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x3f2)]=function(){this['_forceDashing']=![];},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x313)]=function(){const _0x553605=_0x292080;if(this[_0x553605(0x283)]())return![];if(this[_0x553605(0x36b)])return![];if(this[_0x553605(0x53e)]==='')return![];if(this[_0x553605(0x1af)]===Game_Vehicle)return![];if(this[_0x553605(0x28a)]())return![];return!![];},Game_CharacterBase['prototype'][_0x292080(0x56a)]=function(){const _0x1455e3=_0x292080;if(this[_0x1455e3(0x24d)]())return!![];if(this[_0x1455e3(0x1af)]===Game_Player&&this[_0x1455e3(0x2a0)]())return!![];return![];},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x16a)]=function(){const _0x3a610d=_0x292080;return VisuMZ[_0x3a610d(0x364)][_0x3a610d(0x411)][_0x3a610d(0x1ec)]['DefaultShadow'];},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x308)]=function(){const _0x59a230=_0x292080;return this[_0x59a230(0x346)]();},Game_CharacterBase['prototype'][_0x292080(0x22d)]=function(){const _0x432190=_0x292080,_0x52ab04=$gameMap['tileHeight']();return Math[_0x432190(0x415)](this['scrolledY']()*_0x52ab04+_0x52ab04);},Game_CharacterBase['DIAGONAL_PATHFINDING_EVENT_LIMIT']=0x64,Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x449)]=function(_0x246c44,_0x335546){const _0x399eb5=_0x292080;if(TouchInput[_0x399eb5(0x4d5)]())return![];if(!$gameMap['isSupportDiagonalMovement']())return![];if($gameMap[_0x399eb5(0x2e3)](_0x246c44,_0x335546)['length']>0x0)return![];if(!$gameMap[_0x399eb5(0x13a)](_0x246c44,_0x335546))return![];const _0x4c565c=$gameMap[_0x399eb5(0x4c5)][_0x399eb5(0x1bd)];if(_0x4c565c>=Game_CharacterBase[_0x399eb5(0x3e0)])return![];return!![];},Game_Character['prototype'][_0x292080(0x4d9)]=function(_0x45536c,_0x4f8099){const _0x1da593=_0x292080;let _0x349d7d=this[_0x1da593(0x282)](_0x45536c,_0x4f8099);if(!this[_0x1da593(0x449)](_0x45536c,_0x4f8099))return _0x349d7d;if(this[_0x1da593(0x31f)](_0x45536c,_0x4f8099))return _0x349d7d;const _0xb3e67e=_0x349d7d;if(_0x349d7d===0x2){if(_0x45536c>this['x']&&this[_0x1da593(0x192)](this['x'],this['y'],0x6))_0x349d7d=0x3;if(_0x45536c<this['x']&&this[_0x1da593(0x192)](this['x'],this['y'],0x4))_0x349d7d=0x1;}else{if(_0x349d7d===0x4){if(_0x4f8099>this['y']&&this[_0x1da593(0x192)](this['x'],this['y'],0x4))_0x349d7d=0x1;if(_0x4f8099<this['y']&&this['canPass'](this['x'],this['y'],0x6))_0x349d7d=0x7;}else{if(_0x349d7d===0x6){if(_0x4f8099>this['y']&&this[_0x1da593(0x192)](this['x'],this['y'],0x4))_0x349d7d=0x3;if(_0x4f8099<this['y']&&this[_0x1da593(0x192)](this['x'],this['y'],0x6))_0x349d7d=0x9;}else{if(_0x349d7d===0x8){if(_0x45536c>this['x']&&this[_0x1da593(0x192)](this['x'],this['y'],0x6))_0x349d7d=0x9;if(_0x45536c<this['x']&&this[_0x1da593(0x192)](this['x'],this['y'],0x4))_0x349d7d=0x7;}}}}const _0x17f870=$gameMap[_0x1da593(0x2e4)](this['x'],_0x349d7d),_0x13f8d6=$gameMap[_0x1da593(0x157)](this['y'],_0x349d7d);if(this['isCollidedWithEvents'](_0x17f870,_0x13f8d6))_0x349d7d=_0xb3e67e;return _0x349d7d;},VisuMZ[_0x292080(0x364)]['Game_CharacterBase_canPass']=Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x192)],Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x192)]=function(_0x13b848,_0x5c7d31,_0x457c5f){const _0x26426e=_0x292080;return this[_0x26426e(0x1a5)]===_0x26426e(0x29a)?this[_0x26426e(0x195)]()[_0x26426e(0x3fc)](_0x13b848,_0x5c7d31,_0x457c5f):VisuMZ[_0x26426e(0x364)][_0x26426e(0x3a5)][_0x26426e(0x46f)](this,_0x13b848,_0x5c7d31,_0x457c5f);},Game_CharacterBase['prototype'][_0x292080(0x1d0)]=function(){const _0x27f4ad=_0x292080;this[_0x27f4ad(0x503)]=0x0,this[_0x27f4ad(0x35f)]=0x0;},VisuMZ[_0x292080(0x364)][_0x292080(0x421)]=Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x346)],Game_CharacterBase[_0x292080(0x45b)]['screenX']=function(){const _0x679f20=_0x292080;return VisuMZ[_0x679f20(0x364)][_0x679f20(0x421)]['call'](this)+(this['_spriteOffsetX']||0x0);},VisuMZ[_0x292080(0x364)][_0x292080(0x1de)]=Game_CharacterBase['prototype'][_0x292080(0x4dc)],Game_CharacterBase[_0x292080(0x45b)]['screenY']=function(){const _0x1a73b3=_0x292080;return VisuMZ[_0x1a73b3(0x364)][_0x1a73b3(0x1de)]['call'](this)+(this[_0x1a73b3(0x35f)]||0x0);},Game_CharacterBase[_0x292080(0x489)]=VisuMZ[_0x292080(0x364)][_0x292080(0x411)][_0x292080(0x1ec)][_0x292080(0x452)]??-0x6,Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x53d)]=function(){const _0x2a6ade=_0x292080;let _0xcfe7df=this[_0x2a6ade(0x4b5)]()?0x0:-Game_CharacterBase['DEFAULT_SHIFT_Y'];return this[_0x2a6ade(0x379)]&&(_0xcfe7df*=this[_0x2a6ade(0x379)]),Math[_0x2a6ade(0x460)](_0xcfe7df);},Game_CharacterBase['prototype'][_0x292080(0x146)]=function(){const _0x1c67fa=_0x292080;this[_0x1c67fa(0x253)]='';},VisuMZ['EventsMoveCore'][_0x292080(0x4a0)]=Game_CharacterBase['prototype']['updatePattern'],Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x49f)]=function(){const _0x36fb60=_0x292080;if(this[_0x36fb60(0x486)])return;if(this[_0x36fb60(0x29c)]())return;VisuMZ[_0x36fb60(0x364)][_0x36fb60(0x4a0)][_0x36fb60(0x46f)](this);},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x29c)]=function(){const _0x5285ac=_0x292080;if(!this[_0x5285ac(0x3bd)]()&&this[_0x5285ac(0x3b1)]>0x0)return![];switch(String(this[_0x5285ac(0x253)])[_0x5285ac(0x4a5)]()[_0x5285ac(0x42d)]()){case _0x5285ac(0x198):this['_pattern']+=0x1;if(this[_0x5285ac(0x3c4)]>0x2)this['setPattern'](0x0);break;case _0x5285ac(0x3e9):this[_0x5285ac(0x3c4)]-=0x1;if(this[_0x5285ac(0x3c4)]<0x0)this[_0x5285ac(0x131)](0x2);break;case _0x5285ac(0x1e6):case'SPIN\x20CW':this['turnRight90']();break;case'SPIN\x20COUNTERCLOCKWISE':case'SPIN\x20CCW':case _0x5285ac(0x259):case _0x5285ac(0x356):this[_0x5285ac(0x272)]();break;default:return![];}return!![];},Game_CharacterBase['prototype'][_0x292080(0x17f)]=function(){return $gameSystem['getEventIconData'](this);},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x2c1)]=function(){const _0x3d05d0=_0x292080,_0x39878a=this[_0x3d05d0(0x17f)]();if(!_0x39878a)return![];return _0x39878a['iconIndex']>0x0;},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x571)]=function(){const _0x18cd81=_0x292080,_0x2a9d6c=this[_0x18cd81(0x56c)]();return $gameMap[_0x18cd81(0x2e4)](this['x'],_0x2a9d6c);},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x527)]=function(){const _0x14044b=_0x292080,_0x26e066=this[_0x14044b(0x56c)]();return $gameMap[_0x14044b(0x157)](this['y'],_0x26e066);},Game_CharacterBase['prototype'][_0x292080(0x57c)]=function(){const _0x4a6baa=_0x292080,_0xd6ae6=this[_0x4a6baa(0x4a8)](this[_0x4a6baa(0x56c)]());return $gameMap['roundXWithDirection'](this['x'],_0xd6ae6);},Game_CharacterBase['prototype']['backY']=function(){const _0x30efd0=_0x292080,_0x5e3dd5=this['reverseDir'](this['direction']());return $gameMap[_0x30efd0(0x157)](this['y'],_0x5e3dd5);},Game_CharacterBase['prototype'][_0x292080(0x423)]=function(){const _0x4bae6e=_0x292080,_0x184b07=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x4bae6e(0x56c)]()];return $gameMap[_0x4bae6e(0x2e4)](this['x'],_0x184b07);},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x47b)]=function(){const _0x3e5a2b=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this['direction']()];return $gameMap['roundYWithDirection'](this['y'],_0x3e5a2b);},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x2f5)]=function(){const _0x2552bd=_0x292080,_0x17ce6d=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x2552bd(0x56c)]()];return $gameMap['roundXWithDirection'](this['x'],_0x17ce6d);},Game_CharacterBase['prototype']['cwY']=function(){const _0x786068=_0x292080,_0x50f1d8=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this['direction']()];return $gameMap[_0x786068(0x157)](this['y'],_0x50f1d8);},VisuMZ[_0x292080(0x364)][_0x292080(0x3bc)]=Game_Character[_0x292080(0x45b)][_0x292080(0x3b0)],Game_Character['prototype'][_0x292080(0x3b0)]=function(_0x4a8138){const _0x302a82=_0x292080;route=JsonEx[_0x302a82(0x28f)](_0x4a8138),VisuMZ['EventsMoveCore'][_0x302a82(0x3bc)][_0x302a82(0x46f)](this,route);},VisuMZ[_0x292080(0x364)]['Game_Character_forceMoveRoute']=Game_Character[_0x292080(0x45b)]['forceMoveRoute'],Game_Character['prototype'][_0x292080(0x502)]=function(_0x184b64){const _0x3b8cae=_0x292080;route=JsonEx[_0x3b8cae(0x28f)](_0x184b64),VisuMZ[_0x3b8cae(0x364)]['Game_Character_forceMoveRoute'][_0x3b8cae(0x46f)](this,route);},VisuMZ[_0x292080(0x364)][_0x292080(0x287)]=Game_Character[_0x292080(0x45b)]['processMoveCommand'],Game_Character[_0x292080(0x45b)][_0x292080(0x51e)]=function(_0x501da0){const _0x2c86df=_0x292080,_0x1811e3=Game_Character,_0x43ad21=_0x501da0['parameters'];if(_0x501da0[_0x2c86df(0x29f)]===_0x1811e3[_0x2c86df(0x3bf)]){let _0x37b550=_0x501da0[_0x2c86df(0x42c)][0x0];_0x37b550=this[_0x2c86df(0x1cc)](_0x37b550),_0x37b550=this['convertSelfVariableValuesInScriptCall'](_0x37b550),this['processMoveCommandEventsMoveCore'](_0x501da0,_0x37b550);}else VisuMZ[_0x2c86df(0x364)][_0x2c86df(0x287)][_0x2c86df(0x46f)](this,_0x501da0);},Game_Character['prototype'][_0x292080(0x1cc)]=function(_0x1bc913){const _0x3d63c4=_0x292080,_0x59f7e5=/\$gameVariables\.value\((\d+)\)/gi,_0x3220a8=/\\V\[(\d+)\]/gi;while(_0x1bc913['match'](_0x59f7e5)){_0x1bc913=_0x1bc913[_0x3d63c4(0x39c)](_0x59f7e5,(_0x27678e,_0x1f561e)=>$gameVariables[_0x3d63c4(0x226)](parseInt(_0x1f561e)));}while(_0x1bc913['match'](_0x3220a8)){_0x1bc913=_0x1bc913[_0x3d63c4(0x39c)](_0x3220a8,(_0x27c22d,_0x2e2214)=>$gameVariables[_0x3d63c4(0x226)](parseInt(_0x2e2214)));}return _0x1bc913;},Game_Character['prototype'][_0x292080(0x27f)]=function(_0xffe969){const _0x20dd65=_0x292080,_0x4ca413=/\\SELFVAR\[(\d+)\]/gi;while(_0xffe969[_0x20dd65(0x173)](_0x4ca413)){_0xffe969=_0xffe969['replace'](_0x4ca413,(_0x365198,_0x4753f4)=>getSelfVariableValue(this['_mapId'],this[_0x20dd65(0x487)],parseInt(_0x4753f4)));}return _0xffe969;},Game_Character['prototype']['processMoveCommandEventsMoveCore']=function(_0x20f48c,_0x48950a){const _0x1a5196=_0x292080;if(_0x48950a['match'](/ANIMATION:[ ](\d+)/i))return this[_0x1a5196(0x178)](Number(RegExp['$1']));if(_0x48950a[_0x1a5196(0x173)](/BALLOON:[ ](.*)/i))return this[_0x1a5196(0x1fd)](String(RegExp['$1']));if(_0x48950a[_0x1a5196(0x173)](/FADE IN:[ ](\d+)/i))return this[_0x1a5196(0x4e4)](Number(RegExp['$1']));if(_0x48950a[_0x1a5196(0x173)](/FADE OUT:[ ](\d+)/i))return this[_0x1a5196(0x44f)](Number(RegExp['$1']));if(_0x48950a[_0x1a5196(0x173)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this['forceCarrying']();if(_0x48950a[_0x1a5196(0x173)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this['clearCarrying']();if(_0x48950a['match'](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x1a5196(0x2cd)]();if(_0x48950a[_0x1a5196(0x173)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x1a5196(0x3f2)]();if(_0x48950a[_0x1a5196(0x173)](/HUG:[ ]LEFT/i))return this['processMoveRouteHugWall'](_0x1a5196(0x37c));if(_0x48950a[_0x1a5196(0x173)](/HUG:[ ]RIGHT/i))return this[_0x1a5196(0x545)]('right');if(_0x48950a[_0x1a5196(0x173)](/INDEX:[ ](\d+)/i))return this[_0x1a5196(0x4a4)](Number(RegExp['$1']));if(_0x48950a['match'](/INDEX:[ ]([\+\-]\d+)/i)){const _0xf25f43=this[_0x1a5196(0x56e)]+Number(RegExp['$1']);return this[_0x1a5196(0x4a4)](_0xf25f43);}if(_0x48950a[_0x1a5196(0x173)](/JUMP FORWARD:[ ](\d+)/i))return this[_0x1a5196(0x237)](Number(RegExp['$1']));if(_0x48950a[_0x1a5196(0x173)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['processMoveRouteJumpTo'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x48950a['match'](/JUMP TO EVENT:[ ](\d+)/i)){const _0x560628=$gameMap[_0x1a5196(0x47f)](Number(RegExp['$1']));return this[_0x1a5196(0x278)](_0x560628);}if(_0x48950a[_0x1a5196(0x173)](/JUMP TO PLAYER/i))return this[_0x1a5196(0x278)]($gamePlayer);if(_0x48950a['match'](/JUMP TO HOME/i)&&this['eventId']){const _0x2f5b3a=this[_0x1a5196(0x359)],_0x3349c0=this[_0x1a5196(0x575)];return this[_0x1a5196(0x43f)](_0x2f5b3a,_0x3349c0);}if(_0x48950a['match'](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x4b20d1=String(RegExp['$1']),_0x434c36=this[_0x1a5196(0x188)](_0x48950a);return this[_0x1a5196(0x4d8)](_0x4b20d1,_0x434c36);}if(_0x48950a[_0x1a5196(0x173)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x37fa0d=Number(RegExp['$1']),_0x1df73e=Number(RegExp['$2']),_0xb0ce30=this[_0x1a5196(0x188)](_0x48950a);return this[_0x1a5196(0x547)](_0x37fa0d,_0x1df73e,_0xb0ce30);}if(_0x48950a[_0x1a5196(0x173)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x4d6aaa=$gameMap[_0x1a5196(0x47f)](Number(RegExp['$1'])),_0x20f8e7=this[_0x1a5196(0x188)](_0x48950a);return this[_0x1a5196(0x4a1)](_0x4d6aaa,_0x20f8e7);}if(_0x48950a[_0x1a5196(0x173)](/MOVE TO PLAYER/i)){const _0x16a3c4=this[_0x1a5196(0x188)](_0x48950a);return this[_0x1a5196(0x4a1)]($gamePlayer,_0x16a3c4);}if(_0x48950a[_0x1a5196(0x173)](/MOVE TO HOME/i)&&this[_0x1a5196(0x35a)]){const _0x132a81=this[_0x1a5196(0x359)],_0x4b21bf=this[_0x1a5196(0x575)],_0x48c593=this[_0x1a5196(0x188)](_0x48950a);return this[_0x1a5196(0x547)](_0x132a81,_0x4b21bf,_0x48c593);}if(_0x48950a[_0x1a5196(0x173)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x1a5196(0x365)](0x1,Number(RegExp['$1']));if(_0x48950a[_0x1a5196(0x173)](/MOVE DOWN:[ ](\d+)/i))return this[_0x1a5196(0x365)](0x2,Number(RegExp['$1']));if(_0x48950a[_0x1a5196(0x173)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x1a5196(0x365)](0x3,Number(RegExp['$1']));if(_0x48950a[_0x1a5196(0x173)](/MOVE LEFT:[ ](\d+)/i))return this[_0x1a5196(0x365)](0x4,Number(RegExp['$1']));if(_0x48950a[_0x1a5196(0x173)](/MOVE RIGHT:[ ](\d+)/i))return this[_0x1a5196(0x365)](0x6,Number(RegExp['$1']));if(_0x48950a['match'](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0x1a5196(0x365)](0x7,Number(RegExp['$1']));if(_0x48950a['match'](/MOVE UP:[ ](\d+)/i))return this[_0x1a5196(0x365)](0x8,Number(RegExp['$1']));if(_0x48950a[_0x1a5196(0x173)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x1a5196(0x365)](0x9,Number(RegExp['$1']));if(_0x48950a['match'](/OPACITY:[ ](\d+)([%％])/i)){const _0x4d00ca=Math[_0x1a5196(0x460)](Number(RegExp['$1'])/0x64*0xff);return this[_0x1a5196(0x53c)](_0x4d00ca[_0x1a5196(0x2c5)](0x0,0xff));}if(_0x48950a[_0x1a5196(0x173)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x34d2c2=this['_opacity']+Math['round'](Number(RegExp['$1'])/0x64*0xff);return this[_0x1a5196(0x53c)](_0x34d2c2['clamp'](0x0,0xff));}if(_0x48950a[_0x1a5196(0x173)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0xa2afe0=this['_opacity']+Number(RegExp['$1']);return this[_0x1a5196(0x53c)](_0xa2afe0['clamp'](0x0,0xff));}if(_0x48950a[_0x1a5196(0x173)](/PATTERN LOCK:[ ](\d+)/i))return this[_0x1a5196(0x4f9)](Number(RegExp['$1']));if(_0x48950a[_0x1a5196(0x173)](/PATTERN UNLOCK/i))return this['_patternLocked']=![];if(_0x48950a[_0x1a5196(0x173)](/POSE:[ ](.*)/i)){const _0x550db1=String(RegExp['$1'])[_0x1a5196(0x4a5)]()[_0x1a5196(0x42d)]();return this[_0x1a5196(0x3dc)](_0x550db1);}if(_0x48950a[_0x1a5196(0x173)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x2b5954=Number(RegExp['$1']),_0x5cc074=Number(RegExp['$2']);return this[_0x1a5196(0x4ef)](_0x2b5954,_0x5cc074);}if(_0x48950a[_0x1a5196(0x173)](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x25edb8=$gameMap[_0x1a5196(0x47f)](Number(RegExp['$1']));return this[_0x1a5196(0x175)](_0x25edb8);}if(_0x48950a[_0x1a5196(0x173)](/STEP TOWARD PLAYER/i))return this[_0x1a5196(0x175)]($gamePlayer);if(_0x48950a[_0x1a5196(0x173)](/STEP TOWARD HOME/i)&&this[_0x1a5196(0x35a)]){const _0x29dc23=this[_0x1a5196(0x359)],_0x56d8f8=this['_randomHomeY'];return this['processMoveRouteStepTo'](_0x29dc23,_0x56d8f8);}if(_0x48950a[_0x1a5196(0x173)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['moveAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x48950a[_0x1a5196(0x173)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x4061f4=$gameMap['event'](Number(RegExp['$1']));return this[_0x1a5196(0x150)](_0x4061f4);}if(_0x48950a[_0x1a5196(0x173)](/STEP AWAY FROM PLAYER/i))return this[_0x1a5196(0x150)]($gamePlayer);if(_0x48950a['match'](/STEP AWAY FROM HOME/i)&&this[_0x1a5196(0x35a)]){const _0x243e61=this['_randomHomeX'],_0x2c480c=this['_randomHomeY'];return this[_0x1a5196(0x562)](_0x243e61,_0x2c480c);}if(_0x48950a['match'](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x1a5196(0x20e)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x48950a[_0x1a5196(0x173)](/TURN TO EVENT:[ ](\d+)/i)){const _0x450813=$gameMap[_0x1a5196(0x47f)](Number(RegExp['$1']));return this[_0x1a5196(0x325)](_0x450813);}if(_0x48950a['match'](/TURN TO PLAYER/i))return this[_0x1a5196(0x325)]($gamePlayer);if(_0x48950a[_0x1a5196(0x173)](/TURN TO HOME/i)&&this[_0x1a5196(0x35a)]){const _0x468186=this[_0x1a5196(0x359)],_0x5f020f=this[_0x1a5196(0x575)];return this['turnTowardPoint'](_0x468186,_0x5f020f);}if(_0x48950a['match'](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['turnAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x48950a[_0x1a5196(0x173)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x44f8bc=$gameMap[_0x1a5196(0x47f)](Number(RegExp['$1']));return this[_0x1a5196(0x1dd)](_0x44f8bc);}if(_0x48950a[_0x1a5196(0x173)](/TURN AWAY FROM PLAYER/i))return this[_0x1a5196(0x1dd)]($gamePlayer);if(_0x48950a[_0x1a5196(0x173)](/TURN AWAY FROM HOME/i)&&this[_0x1a5196(0x35a)]){const _0xbf2959=this[_0x1a5196(0x359)],_0x2bb9a3=this[_0x1a5196(0x575)];return this[_0x1a5196(0x57e)](_0xbf2959,_0x2bb9a3);}if(_0x48950a[_0x1a5196(0x173)](/TURN LOWER LEFT/i))return this[_0x1a5196(0x43d)](0x1);if(_0x48950a[_0x1a5196(0x173)](/TURN LOWER RIGHT/i))return this[_0x1a5196(0x43d)](0x3);if(_0x48950a['match'](/TURN UPPER LEFT/i))return this['setDirection'](0x7);if(_0x48950a[_0x1a5196(0x173)](/TURN UPPER RIGHT/i))return this[_0x1a5196(0x43d)](0x9);if(_0x48950a[_0x1a5196(0x173)](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x1a5196(0x1c2)](RegExp['$1'],RegExp['$2']);if(_0x48950a[_0x1a5196(0x173)](/Self Variable[ ](.*):[ ](.*)/i))return this['processMoveRouteSelfVariable'](RegExp['$1'],RegExp['$2']);if(_0x48950a[_0x1a5196(0x173)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x1a5196(0x3ae)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x48950a[_0x1a5196(0x173)](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x321bb2=$gameMap[_0x1a5196(0x47f)](Number(RegExp['$1']));return this['processMoveRouteTeleportToCharacter'](_0x321bb2);}if(_0x48950a[_0x1a5196(0x173)](/TELEPORT TO PLAYER/i))return this['processMoveRouteTeleportToCharacter']($gamePlayer);if(_0x48950a[_0x1a5196(0x173)](/TELEPORT TO HOME/i)&&this[_0x1a5196(0x35a)]){const _0x270ef7=this[_0x1a5196(0x359)],_0x542c1f=this['_randomHomeY'];return this[_0x1a5196(0x3ae)](_0x270ef7,_0x542c1f);}try{VisuMZ[_0x1a5196(0x364)][_0x1a5196(0x287)][_0x1a5196(0x46f)](this,_0x20f48c);}catch(_0x1adf97){if($gameTemp[_0x1a5196(0x285)]())console[_0x1a5196(0x27d)](_0x1adf97);}},Game_Character[_0x292080(0x45b)][_0x292080(0x178)]=function(_0x12fcb2){const _0x545df8=_0x292080;$gameTemp[_0x545df8(0x246)]([this],_0x12fcb2);},Game_Character['prototype'][_0x292080(0x1fd)]=function(_0x28d0f1){const _0x2dc471=_0x292080;let _0x30ba78=0x0;switch(_0x28d0f1[_0x2dc471(0x4a5)]()[_0x2dc471(0x42d)]()){case'!':case'EXCLAMATION':_0x30ba78=0x1;break;case'?':case _0x2dc471(0x33a):_0x30ba78=0x2;break;case _0x2dc471(0x50a):case _0x2dc471(0x3f4):case _0x2dc471(0x23c):case'MUSIC-NOTE':case _0x2dc471(0x14e):_0x30ba78=0x3;break;case'HEART':case _0x2dc471(0x295):_0x30ba78=0x4;break;case _0x2dc471(0x522):_0x30ba78=0x5;break;case _0x2dc471(0x164):_0x30ba78=0x6;break;case'COBWEB':case _0x2dc471(0x32e):case _0x2dc471(0x4bf):_0x30ba78=0x7;break;case _0x2dc471(0x2b7):case'...':_0x30ba78=0x8;break;case _0x2dc471(0x414):case _0x2dc471(0x1d5):case'LIGHT\x20BULB':case'LIGHT-BULB':case _0x2dc471(0x457):_0x30ba78=0x9;break;case'Z':case'ZZ':case'ZZZ':case _0x2dc471(0x32a):_0x30ba78=0xa;break;case _0x2dc471(0x57d):_0x30ba78=0xb;break;case _0x2dc471(0x3c3):_0x30ba78=0xc;break;case _0x2dc471(0x1dc):_0x30ba78=0xd;break;case _0x2dc471(0x4d0):_0x30ba78=0xe;break;case _0x2dc471(0x41d):_0x30ba78=0xf;break;}$gameTemp['requestBalloon'](this,_0x30ba78);},Game_Character[_0x292080(0x45b)][_0x292080(0x4e4)]=function(_0x203082){const _0x1442e8=_0x292080;_0x203082+=this[_0x1442e8(0x25e)],this[_0x1442e8(0x53c)](_0x203082[_0x1442e8(0x2c5)](0x0,0xff));if(this[_0x1442e8(0x25e)]<0xff)this[_0x1442e8(0x388)]--;},Game_Character['prototype'][_0x292080(0x44f)]=function(_0x202a5d){const _0x2b2f38=_0x292080;_0x202a5d=this[_0x2b2f38(0x25e)]-_0x202a5d,this['setOpacity'](_0x202a5d['clamp'](0x0,0xff));if(this[_0x2b2f38(0x25e)]>0x0)this[_0x2b2f38(0x388)]--;},Game_Character[_0x292080(0x45b)][_0x292080(0x545)]=function(_0x2b7dd1){const _0x821933=_0x292080,_0x474226=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x3a05eb=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x1448cc=this[_0x821933(0x56c)](),_0x147830=(_0x2b7dd1===_0x821933(0x37c)?_0x474226:_0x3a05eb)[_0x1448cc],_0x4719fd=(_0x2b7dd1===_0x821933(0x37c)?_0x3a05eb:_0x474226)[_0x1448cc];if(this[_0x821933(0x192)](this['x'],this['y'],_0x147830))_0x2b7dd1==='left'?this[_0x821933(0x272)]():this[_0x821933(0x45c)]();else!this[_0x821933(0x192)](this['x'],this['y'],this[_0x821933(0x56c)]())&&(this[_0x821933(0x192)](this['x'],this['y'],_0x4719fd)?_0x2b7dd1===_0x821933(0x37c)?this[_0x821933(0x45c)]():this[_0x821933(0x272)]():this['turn180']());this['canPass'](this['x'],this['y'],this[_0x821933(0x56c)]())&&this[_0x821933(0x1c5)]();},Game_Character['prototype'][_0x292080(0x4a4)]=function(_0x39ca1e){const _0xc01664=_0x292080;if(ImageManager[_0xc01664(0x56f)](this['_characterName']))return;_0x39ca1e=_0x39ca1e['clamp'](0x0,0x7),this['setImage'](this[_0xc01664(0x53e)],_0x39ca1e);},Game_Character[_0x292080(0x45b)][_0x292080(0x237)]=function(_0xebfb63){const _0x31a8f7=_0x292080;switch(this[_0x31a8f7(0x56c)]()){case 0x1:this[_0x31a8f7(0x23f)](-_0xebfb63,_0xebfb63);break;case 0x2:this[_0x31a8f7(0x23f)](0x0,_0xebfb63);break;case 0x3:this['jump'](_0xebfb63,_0xebfb63);break;case 0x4:this[_0x31a8f7(0x23f)](-_0xebfb63,0x0);break;case 0x6:this[_0x31a8f7(0x23f)](_0xebfb63,0x0);break;case 0x7:this[_0x31a8f7(0x23f)](-_0xebfb63,-_0xebfb63);break;case 0x8:this[_0x31a8f7(0x23f)](0x0,-_0xebfb63);break;case 0x9:this[_0x31a8f7(0x23f)](_0xebfb63,-_0xebfb63);break;}},Game_Character['prototype'][_0x292080(0x43f)]=function(_0x3b6505,_0x5d13ef){const _0x31d66a=_0x292080,_0x4e07fc=Math[_0x31d66a(0x460)](_0x3b6505-this['x']),_0x1252b0=Math[_0x31d66a(0x460)](_0x5d13ef-this['y']);this['jump'](_0x4e07fc,_0x1252b0);},Game_Character['prototype'][_0x292080(0x278)]=function(_0x93c8b7){const _0x72d0de=_0x292080;if(_0x93c8b7)this[_0x72d0de(0x43f)](_0x93c8b7['x'],_0x93c8b7['y']);},Game_Character[_0x292080(0x45b)][_0x292080(0x4ef)]=function(_0x2ca286,_0x307f91,_0x33af86){const _0x1257f8=_0x292080;let _0xddfee1=0x0;if(_0x33af86)$gameTemp[_0x1257f8(0x209)]=!![];$gameMap[_0x1257f8(0x555)]()?_0xddfee1=this[_0x1257f8(0x4d9)](_0x2ca286,_0x307f91):_0xddfee1=this[_0x1257f8(0x282)](_0x2ca286,_0x307f91);if(_0x33af86)$gameTemp[_0x1257f8(0x209)]=![];this[_0x1257f8(0x2da)](_0xddfee1),this[_0x1257f8(0x425)](!![]);},Game_Character['prototype'][_0x292080(0x175)]=function(_0x369e69){if(_0x369e69)this['processMoveRouteStepTo'](_0x369e69['x'],_0x369e69['y']);},Game_Character['prototype'][_0x292080(0x291)]=function(_0xda8214,_0x46295f){const _0xd823d6=_0x292080,_0x2022aa=this[_0xd823d6(0x2e7)](_0xda8214),_0x268a1d=this[_0xd823d6(0x18a)](_0x46295f);},Game_Character[_0x292080(0x45b)][_0x292080(0x188)]=function(_0x41b888){const _0x400835=_0x292080;if(_0x41b888[_0x400835(0x173)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x41b888[_0x400835(0x173)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ[_0x292080(0x364)][_0x292080(0x46e)]=Game_Event[_0x292080(0x45b)]['isCollidedWithPlayerCharacters'],Game_Event[_0x292080(0x45b)]['isCollidedWithPlayerCharacters']=function(_0x16501d,_0x4bd6fd){const _0x446b44=_0x292080;if($gameTemp[_0x446b44(0x209)])return![];return VisuMZ['EventsMoveCore'][_0x446b44(0x46e)]['call'](this,_0x16501d,_0x4bd6fd);},Game_Character[_0x292080(0x45b)][_0x292080(0x4d8)]=function(_0x2bc7fe,_0xe1f9ef){const _0x589b42=_0x292080,_0xcd7231=['',_0x589b42(0x208),'DOWN',_0x589b42(0x33e),_0x589b42(0x21a),'',_0x589b42(0x2f4),_0x589b42(0x2de),'UP',_0x589b42(0x2fc)],_0x207e79=_0xcd7231[_0x589b42(0x49e)](_0x2bc7fe[_0x589b42(0x4a5)]()['trim']());if(_0x207e79<=0x0)return;if(_0xe1f9ef)$gameTemp['_moveAllowPlayerCollision']=!![];if(this[_0x589b42(0x192)](this['x'],this['y'],_0x207e79)){if(_0xe1f9ef)$gameTemp['_moveAllowPlayerCollision']=![];this[_0x589b42(0x2da)](_0x207e79),this[_0x589b42(0x388)]-=0x1;}if(_0xe1f9ef)$gameTemp['_moveAllowPlayerCollision']=![];},Game_Character[_0x292080(0x45b)][_0x292080(0x547)]=function(_0x24293b,_0x23babf,_0x50aa68){const _0x5a9c3d=_0x292080;this['processMoveRouteStepTo'](_0x24293b,_0x23babf,_0x50aa68);if(this['x']!==_0x24293b||this['y']!==_0x23babf)this[_0x5a9c3d(0x388)]--;},Game_Character[_0x292080(0x45b)]['processMoveRouteMoveToCharacter']=function(_0x41ff49,_0x36cd22){const _0x1f106b=_0x292080;if(_0x41ff49&&!_0x41ff49['_erased']){this[_0x1f106b(0x547)](_0x41ff49['x'],_0x41ff49['y'],_0x36cd22);if(_0x41ff49['isNormalPriority']()&&this[_0x1f106b(0x2ff)]()){const _0x4d38fa=$gameMap[_0x1f106b(0x529)](this['x'],this['y'],_0x41ff49['x'],_0x41ff49['y']);if(_0x4d38fa<=0x1)this[_0x1f106b(0x388)]++;}}},Game_Character['prototype'][_0x292080(0x365)]=function(_0x33faaf,_0x1fe7ec){const _0x169c35=_0x292080;_0x1fe7ec=_0x1fe7ec||0x0;const _0x4fb12a={'code':0x1,'indent':null,'parameters':[]};_0x4fb12a[_0x169c35(0x29f)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x33faaf],this['_moveRoute'][_0x169c35(0x534)][this[_0x169c35(0x388)]]['parameters'][0x0]='';while(_0x1fe7ec--){this[_0x169c35(0x33c)][_0x169c35(0x534)][_0x169c35(0x408)](this['_moveRouteIndex']+0x1,0x0,_0x4fb12a);}},Game_Character[_0x292080(0x45b)][_0x292080(0x4f9)]=function(_0x32d792){const _0x8b6ad4=_0x292080;this[_0x8b6ad4(0x486)]=!![],this[_0x8b6ad4(0x131)](_0x32d792);},Game_Character[_0x292080(0x45b)][_0x292080(0x1c2)]=function(_0x185723,_0x41b5d3){const _0x54eaef=_0x292080;if(this===$gamePlayer)return;const _0x23d5b3=[this[_0x54eaef(0x225)],this[_0x54eaef(0x487)],'A'];_0x185723[_0x54eaef(0x173)](/\b[ABCD]\b/i)?_0x23d5b3[0x2]=String(_0x185723)[_0x54eaef(0x166)](0x0)[_0x54eaef(0x4a5)]()['trim']():_0x23d5b3[0x2]='Self\x20Switch\x20%1'[_0x54eaef(0x193)](_0x185723);switch(_0x41b5d3['toUpperCase']()[_0x54eaef(0x42d)]()){case'ON':case _0x54eaef(0x4e8):$gameSelfSwitches[_0x54eaef(0x368)](_0x23d5b3,!![]);break;case _0x54eaef(0x42a):case'FALSE':$gameSelfSwitches['setValue'](_0x23d5b3,![]);break;case'TOGGLE':$gameSelfSwitches[_0x54eaef(0x368)](_0x23d5b3,!$gameSelfSwitches[_0x54eaef(0x226)](_0x23d5b3));break;}},Game_Character[_0x292080(0x45b)][_0x292080(0x1c1)]=function(_0xd103e7,_0x53ac00){const _0x3ae0b6=_0x292080;if(this===$gamePlayer)return;const _0xa0f3c0=[this[_0x3ae0b6(0x225)],this[_0x3ae0b6(0x487)],_0x3ae0b6(0x154)[_0x3ae0b6(0x193)](_0xd103e7)];$gameSelfSwitches[_0x3ae0b6(0x368)](_0xa0f3c0,Number(_0x53ac00));},Game_Character[_0x292080(0x45b)][_0x292080(0x3ae)]=function(_0x2095ad,_0xed054e){const _0x1344b3=_0x292080;this[_0x1344b3(0x44c)](_0x2095ad,_0xed054e);},Game_Character[_0x292080(0x45b)]['processMoveRouteTeleportToCharacter']=function(_0xf115e7){const _0x2274b3=_0x292080;if(_0xf115e7)this[_0x2274b3(0x3ae)](_0xf115e7['x'],_0xf115e7['y']);},Game_Character['prototype']['turnRight90']=function(){const _0x30a0fe=_0x292080;switch(this[_0x30a0fe(0x56c)]()){case 0x1:this[_0x30a0fe(0x43d)](0x7);break;case 0x2:this['setDirection'](0x4);break;case 0x3:this[_0x30a0fe(0x43d)](0x1);break;case 0x4:this[_0x30a0fe(0x43d)](0x8);break;case 0x6:this[_0x30a0fe(0x43d)](0x2);break;case 0x7:this[_0x30a0fe(0x43d)](0x9);break;case 0x8:this[_0x30a0fe(0x43d)](0x6);break;case 0x9:this['setDirection'](0x3);break;}},Game_Character['prototype']['turnLeft90']=function(){const _0x5bef55=_0x292080;switch(this[_0x5bef55(0x56c)]()){case 0x1:this['setDirection'](0x3);break;case 0x2:this[_0x5bef55(0x43d)](0x6);break;case 0x3:this[_0x5bef55(0x43d)](0x9);break;case 0x4:this[_0x5bef55(0x43d)](0x2);break;case 0x6:this[_0x5bef55(0x43d)](0x8);break;case 0x7:this[_0x5bef55(0x43d)](0x1);break;case 0x8:this[_0x5bef55(0x43d)](0x4);break;case 0x9:this[_0x5bef55(0x43d)](0x7);break;}},Game_Character[_0x292080(0x45b)][_0x292080(0x267)]=function(_0x541204,_0x2693a7,_0x5b45ec){const _0x2bf15d=_0x292080,_0x499d98=this['deltaXFrom'](_0x541204),_0x4f2872=this['deltaYFrom'](_0x2693a7);if($gameMap['isSupportDiagonalMovement']()){if(_0x5b45ec||this[_0x2bf15d(0x524)]()){if(_0x499d98>0x0&&_0x4f2872<0x0)return 0x1;if(_0x499d98<0x0&&_0x4f2872<0x0)return 0x3;if(_0x499d98>0x0&&_0x4f2872>0x0)return 0x7;if(_0x499d98<0x0&&_0x4f2872>0x0)return 0x9;}}if(Math[_0x2bf15d(0x3f7)](_0x499d98)>Math[_0x2bf15d(0x3f7)](_0x4f2872))return _0x499d98>0x0?0x4:0x6;else{if(_0x4f2872!==0x0)return _0x4f2872>0x0?0x8:0x2;}return 0x0;},Game_Character['prototype'][_0x292080(0x336)]=function(_0x20f94f,_0xf2b7f,_0x13238b){const _0x5c5a76=_0x292080,_0xfde7e2=this[_0x5c5a76(0x2e7)](_0x20f94f),_0x243345=this[_0x5c5a76(0x18a)](_0xf2b7f);if($gameMap[_0x5c5a76(0x555)]()){if(_0x13238b||this[_0x5c5a76(0x524)]()){if(_0xfde7e2>0x0&&_0x243345<0x0)return 0x9;if(_0xfde7e2<0x0&&_0x243345<0x0)return 0x7;if(_0xfde7e2>0x0&&_0x243345>0x0)return 0x3;if(_0xfde7e2<0x0&&_0x243345>0x0)return 0x1;}}if(Math[_0x5c5a76(0x3f7)](_0xfde7e2)>Math[_0x5c5a76(0x3f7)](_0x243345))return _0xfde7e2>0x0?0x6:0x4;else{if(_0x243345!==0x0)return _0x243345>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x292080(0x45b)][_0x292080(0x20e)]=function(_0x4b60b3,_0x50ad95){const _0x501485=_0x292080,_0x3f0bd7=this[_0x501485(0x267)](_0x4b60b3,_0x50ad95,!![]);if(_0x3f0bd7)this[_0x501485(0x2da)](_0x3f0bd7);},Game_Character[_0x292080(0x45b)]['moveAwayFromPoint']=function(_0x273618,_0x15f375){const _0x40bf01=_0x292080,_0x559d8c=this[_0x40bf01(0x336)](_0x273618,_0x15f375,!![]);if(_0x559d8c)this[_0x40bf01(0x2da)](_0x559d8c);},Game_Character['prototype'][_0x292080(0x3b5)]=function(_0x4c5255,_0x4d7c0f){const _0xba84ad=_0x292080,_0x2d58fd=this[_0xba84ad(0x267)](_0x4c5255,_0x4d7c0f,![]);if(_0x2d58fd)this[_0xba84ad(0x43d)](_0x2d58fd);},Game_Character[_0x292080(0x45b)][_0x292080(0x57e)]=function(_0x3ce4ca,_0x1be5df){const _0xb0a7b2=this['getDirectionFromPoint'](_0x3ce4ca,_0x1be5df,![]);if(_0xb0a7b2)this['setDirection'](_0xb0a7b2);},Game_Character[_0x292080(0x45b)][_0x292080(0x36f)]=function(_0x4dd0a8){const _0x3ec8c3=_0x292080;if(_0x4dd0a8)this[_0x3ec8c3(0x20e)](_0x4dd0a8['x'],_0x4dd0a8['y']);},Game_Character[_0x292080(0x45b)][_0x292080(0x150)]=function(_0x46e965){const _0x3f10c1=_0x292080;if(_0x46e965)this[_0x3f10c1(0x562)](_0x46e965['x'],_0x46e965['y']);},Game_Character[_0x292080(0x45b)][_0x292080(0x325)]=function(_0x4b4630){const _0x42d8a8=_0x292080;if(_0x4b4630)this[_0x42d8a8(0x3b5)](_0x4b4630['x'],_0x4b4630['y']);},Game_Character[_0x292080(0x45b)][_0x292080(0x1dd)]=function(_0x4b46d8){const _0x182237=_0x292080;if(_0x4b46d8)this[_0x182237(0x57e)](_0x4b46d8['x'],_0x4b46d8['y']);},VisuMZ[_0x292080(0x364)][_0x292080(0x302)]=Game_Player['prototype']['isDashing'],Game_Player[_0x292080(0x45b)][_0x292080(0x2fa)]=function(){const _0xc96090=_0x292080;if(!Game_CharacterBase[_0xc96090(0x3ad)]&&this[_0xc96090(0x24d)]())return![];if(this['_forceDashing'])return!![];return VisuMZ[_0xc96090(0x364)]['Game_Player_isDashing'][_0xc96090(0x46f)](this);},VisuMZ[_0x292080(0x364)][_0x292080(0x3d0)]=Game_Player[_0x292080(0x45b)][_0x292080(0x1a7)],Game_Player[_0x292080(0x45b)][_0x292080(0x1a7)]=function(){const _0x8e2c9a=_0x292080;return $gameMap[_0x8e2c9a(0x555)]()?this[_0x8e2c9a(0x54f)]():VisuMZ['EventsMoveCore'][_0x8e2c9a(0x3d0)][_0x8e2c9a(0x46f)](this);},Game_Player[_0x292080(0x45b)][_0x292080(0x54f)]=function(){const _0x2a3ccb=_0x292080;return Input[_0x2a3ccb(0x239)];},Game_Player[_0x292080(0x45b)][_0x292080(0x38b)]=function(){const _0x464443=_0x292080;if($gameSystem[_0x464443(0x1ea)]())return 0x0;if(!this[_0x464443(0x3ff)]()&&this['canMove']()){let _0x3e9ee3=this[_0x464443(0x1a7)]();if(_0x3e9ee3>0x0)$gameTemp[_0x464443(0x4eb)]();else{if($gameTemp[_0x464443(0x469)]()){const _0x55751b=$gameTemp[_0x464443(0x216)](),_0x161775=$gameTemp[_0x464443(0x261)]();this[_0x464443(0x449)](_0x55751b,_0x161775)?_0x3e9ee3=this[_0x464443(0x4d9)](_0x55751b,_0x161775):_0x3e9ee3=this[_0x464443(0x282)](_0x55751b,_0x161775);}}_0x3e9ee3>0x0?(this[_0x464443(0x236)]=this['_inputTime']||0x0,this[_0x464443(0x227)]()?this[_0x464443(0x43d)](_0x3e9ee3):this[_0x464443(0x432)](_0x3e9ee3),this['_inputTime']++):this[_0x464443(0x236)]=0x0;}},Game_Player['prototype'][_0x292080(0x227)]=function(){const _0x5431a6=_0x292080,_0x2d2e4c=VisuMZ[_0x5431a6(0x364)][_0x5431a6(0x411)][_0x5431a6(0x1ec)];if(!_0x2d2e4c[_0x5431a6(0x196)])return![];if($gameTemp[_0x5431a6(0x469)]())return![];if(this['isDashing']()||this['isMoving']()||this[_0x5431a6(0x24d)]())return![];return this[_0x5431a6(0x236)]<_0x2d2e4c[_0x5431a6(0x393)];},VisuMZ[_0x292080(0x364)][_0x292080(0x286)]=Game_Player[_0x292080(0x45b)][_0x292080(0x432)],Game_Player['prototype']['executeMove']=function(_0x45c5f1){const _0x283fe5=_0x292080;$gameMap[_0x283fe5(0x555)]()?this[_0x283fe5(0x2da)](_0x45c5f1):VisuMZ[_0x283fe5(0x364)][_0x283fe5(0x286)][_0x283fe5(0x46f)](this,_0x45c5f1);},VisuMZ[_0x292080(0x364)][_0x292080(0x3d1)]=Game_Player[_0x292080(0x45b)][_0x292080(0x1a2)],Game_Player[_0x292080(0x45b)]['isMapPassable']=function(_0x21d080,_0xb87a0d,_0x285d23){const _0x3bb8be=_0x292080;if($gameMap[_0x3bb8be(0x254)](_0x21d080,_0xb87a0d,_0x285d23,'player'))return this[_0x3bb8be(0x2a0)]()&&this[_0x3bb8be(0x195)]()?this[_0x3bb8be(0x195)]()[_0x3bb8be(0x1a2)](_0x21d080,_0xb87a0d,_0x285d23):!![];if($gameMap['isRegionForbidPass'](_0x21d080,_0xb87a0d,_0x285d23,'player'))return![];return VisuMZ[_0x3bb8be(0x364)]['Game_Player_isMapPassable'][_0x3bb8be(0x46f)](this,_0x21d080,_0xb87a0d,_0x285d23);},VisuMZ['EventsMoveCore'][_0x292080(0x139)]=Game_Player[_0x292080(0x45b)][_0x292080(0x3bb)],Game_Player[_0x292080(0x45b)][_0x292080(0x3bb)]=function(_0xaf4de5){const _0x55e2d1=_0x292080;VisuMZ['EventsMoveCore'][_0x55e2d1(0x139)][_0x55e2d1(0x46f)](this,_0xaf4de5);if(this['canStartLocalEvents']()){this[_0x55e2d1(0x22b)](_0xaf4de5);if(_0xaf4de5[_0x55e2d1(0x539)](0x0)&&this[_0x55e2d1(0x31d)]()===_0x55e2d1(0x322))this[_0x55e2d1(0x4b7)](this['x'],this['y']);else(_0xaf4de5[_0x55e2d1(0x539)](0x1)||_0xaf4de5[_0x55e2d1(0x539)](0x2))&&this[_0x55e2d1(0x200)]();}},VisuMZ[_0x292080(0x364)][_0x292080(0x416)]=Game_Player[_0x292080(0x45b)][_0x292080(0x574)],Game_Player[_0x292080(0x45b)][_0x292080(0x574)]=function(_0x2721b5){const _0x911a3b=_0x292080;VisuMZ[_0x911a3b(0x364)][_0x911a3b(0x416)]['call'](this,_0x2721b5);if(this[_0x911a3b(0x25c)]()&&_0x2721b5[_0x911a3b(0x539)](0x0)&&this['startMapCommonEventOnOKTarget']()==='front'){const _0x1d69ed=this[_0x911a3b(0x56c)](),_0x42f261=$gameMap[_0x911a3b(0x2e4)](this['x'],_0x1d69ed),_0x18c0fe=$gameMap[_0x911a3b(0x157)](this['y'],_0x1d69ed);this[_0x911a3b(0x4b7)](_0x42f261,_0x18c0fe);}},Game_Player[_0x292080(0x45b)][_0x292080(0x22b)]=function(_0x96448c){const _0x154ea5=_0x292080;if($gameMap[_0x154ea5(0x24a)]())return;if($gameMap['isAnyEventStarting']())return;const _0x22ac3d=$gameMap[_0x154ea5(0x54c)]();for(const _0xcf2719 of _0x22ac3d){if(!_0xcf2719)continue;if(!_0xcf2719['isTriggerIn'](_0x96448c))continue;if(this['meetActivationRegionConditions'](_0xcf2719))return _0xcf2719[_0x154ea5(0x268)]();if(this['meetActivationProximityConditions'](_0xcf2719))return _0xcf2719['start']();}},Game_Player[_0x292080(0x45b)][_0x292080(0x1ee)]=function(_0x1a817e){const _0x7bf2c=_0x292080;if($gameMap['isEventRunning']())return![];if($gameMap[_0x7bf2c(0x273)]())return![];return _0x1a817e[_0x7bf2c(0x4ea)]()['includes'](this[_0x7bf2c(0x2f9)]());},Game_Player['prototype'][_0x292080(0x1f7)]=function(_0x503e63){const _0x17615a=_0x292080;if($gameMap['isEventRunning']())return![];if($gameMap['isAnyEventStarting']())return![];if([_0x17615a(0x3f8),'region'][_0x17615a(0x539)](_0x503e63[_0x17615a(0x292)]()))return![];const _0x15a31b=_0x503e63['activationProximityType'](),_0x52be03=_0x503e63['activationProximityDistance']();switch(_0x15a31b){case _0x17615a(0x1a8):const _0x5214e0=$gameMap[_0x17615a(0x529)](this['x'],this['y'],_0x503e63['x'],_0x503e63['y']);return _0x503e63[_0x17615a(0x2ca)]()>=_0x5214e0;break;case _0x17615a(0x345):return _0x52be03>=Math[_0x17615a(0x3f7)](_0x503e63[_0x17615a(0x2e7)](this['x']))&&_0x52be03>=Math[_0x17615a(0x3f7)](_0x503e63[_0x17615a(0x18a)](this['y']));break;case _0x17615a(0x301):return _0x52be03>=Math[_0x17615a(0x3f7)](_0x503e63['deltaYFrom'](this['y']));break;case _0x17615a(0x552):return _0x52be03>=Math[_0x17615a(0x3f7)](_0x503e63['deltaXFrom'](this['x']));break;case _0x17615a(0x357):return![];break;}},Game_Player[_0x292080(0x45b)][_0x292080(0x4b7)]=function(_0x9d7c9c,_0x52211b){const _0x3552eb=_0x292080;if($gameMap[_0x3552eb(0x24a)]())return;if($gameMap['isAnyEventStarting']())return;let _0x4a4875=VisuMZ['EventsMoveCore'][_0x3552eb(0x411)][_0x3552eb(0x134)],_0x19d8f8=$gameMap[_0x3552eb(0x2f9)](_0x9d7c9c,_0x52211b);const _0x35bcbf=_0x3552eb(0x4f8)[_0x3552eb(0x193)](_0x19d8f8);_0x4a4875[_0x35bcbf]&&$gameTemp[_0x3552eb(0x492)](_0x4a4875[_0x35bcbf]);},Game_Player[_0x292080(0x45b)][_0x292080(0x31d)]=function(){const _0x2f4f77=_0x292080;return VisuMZ[_0x2f4f77(0x364)][_0x2f4f77(0x411)][_0x2f4f77(0x4cc)];},Game_Player[_0x292080(0x45b)][_0x292080(0x200)]=function(){const _0x202cc7=_0x292080;if($gameMap[_0x202cc7(0x24a)]())return;if($gameMap[_0x202cc7(0x273)]())return;let _0xef8814=VisuMZ[_0x202cc7(0x364)]['Settings'][_0x202cc7(0x23a)];const _0x1f8c57=_0x202cc7(0x4f8)[_0x202cc7(0x193)](this[_0x202cc7(0x2f9)]());_0xef8814[_0x1f8c57]&&$gameTemp[_0x202cc7(0x492)](_0xef8814[_0x1f8c57]);},VisuMZ['EventsMoveCore'][_0x292080(0x4ba)]=Game_Player[_0x292080(0x45b)][_0x292080(0x2c8)],Game_Player[_0x292080(0x45b)][_0x292080(0x2c8)]=function(){const _0x3c50e4=_0x292080;VisuMZ[_0x3c50e4(0x364)][_0x3c50e4(0x4ba)][_0x3c50e4(0x46f)](this),VisuMZ[_0x3c50e4(0x4e5)](0x0);},Game_Player[_0x292080(0x45b)][_0x292080(0x329)]=function(){VisuMZ['FaceSynchAllSynchTargets'](0x0);},VisuMZ['EventsMoveCore'][_0x292080(0x52d)]=Game_Follower[_0x292080(0x45b)][_0x292080(0x333)],Game_Follower['prototype']['initialize']=function(_0x5554fa){const _0x513860=_0x292080;VisuMZ['EventsMoveCore']['Game_Follower_initialize'][_0x513860(0x46f)](this,_0x5554fa),this['_chaseOff']=![];},Game_Follower['prototype']['isDashing']=function(){const _0xae2589=_0x292080;if(this[_0xae2589(0x3b3)])return Game_Character['prototype'][_0xae2589(0x2fa)][_0xae2589(0x46f)](this);return $gamePlayer['isDashing']();},Game_Follower['prototype'][_0x292080(0x1e1)]=function(){const _0x3f7fa4=_0x292080;if(this['_chaseOff'])return Game_Character[_0x3f7fa4(0x45b)]['isDashingAndMoving'][_0x3f7fa4(0x46f)](this);return $gamePlayer[_0x3f7fa4(0x1e1)]()&&this['_actuallyMoving'];},Game_Follower[_0x292080(0x45b)][_0x292080(0x3b8)]=function(){const _0x5b8bd5=_0x292080;return $gamePlayer[_0x5b8bd5(0x3b8)]();},Game_Follower[_0x292080(0x45b)][_0x292080(0x3e1)]=function(){const _0x5bd5d4=_0x292080;Game_Character[_0x5bd5d4(0x45b)][_0x5bd5d4(0x3e1)][_0x5bd5d4(0x46f)](this),this[_0x5bd5d4(0x3b1)]>0x0&&(this[_0x5bd5d4(0x2c0)]=![]);},Game_Follower[_0x292080(0x45b)][_0x292080(0x515)]=function(_0x4be672){const _0x3ba6de=_0x292080;this[_0x3ba6de(0x3b3)]=_0x4be672;},VisuMZ[_0x292080(0x364)][_0x292080(0x152)]=Game_Follower['prototype'][_0x292080(0x29e)],Game_Follower['prototype'][_0x292080(0x29e)]=function(_0xc57943){const _0x41a70b=_0x292080;if(this[_0x41a70b(0x3b3)])return;if($gameSystem['isStopFollowerChasing']())return;VisuMZ['EventsMoveCore'][_0x41a70b(0x152)][_0x41a70b(0x46f)](this,_0xc57943),this['_actuallyMoving']=!![];},VisuMZ[_0x292080(0x364)][_0x292080(0x30b)]=Game_Vehicle['prototype'][_0x292080(0x1a2)],Game_Vehicle[_0x292080(0x45b)][_0x292080(0x1a2)]=function(_0x1d17a6,_0x66fc9f,_0x7431a6){const _0x5ca733=_0x292080;if($gameMap['isRegionAllowPass'](_0x1d17a6,_0x66fc9f,_0x7431a6,this['_type']))return!![];if($gameMap[_0x5ca733(0x43a)](_0x1d17a6,_0x66fc9f,_0x7431a6,this['_type']))return![];return VisuMZ[_0x5ca733(0x364)]['Game_Vehicle_isMapPassable'][_0x5ca733(0x46f)](this,_0x1d17a6,_0x66fc9f,_0x7431a6);},Game_Vehicle[_0x292080(0x45b)][_0x292080(0x3fc)]=function(_0x5dc346,_0x38b44d,_0x40caa7){const _0x166ad1=_0x292080;if($gameMap[_0x166ad1(0x254)](_0x5dc346,_0x38b44d,_0x40caa7,this[_0x166ad1(0x490)]))return!![];if($gameMap[_0x166ad1(0x43a)](_0x5dc346,_0x38b44d,_0x40caa7,this['_type']))return![];return VisuMZ[_0x166ad1(0x364)][_0x166ad1(0x3a5)]['call']($gamePlayer,_0x5dc346,_0x38b44d,_0x40caa7);},VisuMZ[_0x292080(0x364)][_0x292080(0x3a1)]=Game_Vehicle[_0x292080(0x45b)][_0x292080(0x31b)],Game_Vehicle[_0x292080(0x45b)][_0x292080(0x31b)]=function(_0x12bdbe,_0x3fc0c5,_0x7fac7b){const _0x6ac672=_0x292080;if($gameMap[_0x6ac672(0x3c1)](_0x12bdbe,_0x3fc0c5,_0x7fac7b,this[_0x6ac672(0x490)]))return!![];const _0xfc7f15=this[_0x6ac672(0x490)]['charAt'](0x0)[_0x6ac672(0x4a5)]()+this[_0x6ac672(0x490)][_0x6ac672(0x397)](0x1),_0xdf44b1=_0x6ac672(0x21e)[_0x6ac672(0x193)](_0xfc7f15);return VisuMZ['EventsMoveCore'][_0x6ac672(0x411)][_0x6ac672(0x4f1)][_0xdf44b1]?![]:VisuMZ[_0x6ac672(0x364)][_0x6ac672(0x3a1)][_0x6ac672(0x46f)](this,_0x12bdbe,_0x3fc0c5,_0x7fac7b);},VisuMZ[_0x292080(0x364)][_0x292080(0x36e)]=Game_Vehicle['prototype'][_0x292080(0x257)],Game_Vehicle['prototype'][_0x292080(0x257)]=function(){const _0x32fdc2=_0x292080;VisuMZ[_0x32fdc2(0x364)]['Game_Vehicle_initMoveSpeed']['call'](this);const _0x226949=VisuMZ[_0x32fdc2(0x364)][_0x32fdc2(0x411)]['Movement'];if(this[_0x32fdc2(0x27b)]()){if(_0x226949['BoatSpeed'])this[_0x32fdc2(0x467)](_0x226949['BoatSpeed']);}else{if(this[_0x32fdc2(0x12b)]()){if(_0x226949[_0x32fdc2(0x3d5)])this[_0x32fdc2(0x467)](_0x226949['ShipSpeed']);}else{if(this[_0x32fdc2(0x266)]()){if(_0x226949[_0x32fdc2(0x2a7)])this[_0x32fdc2(0x467)](_0x226949['AirshipSpeed']);}}}},VisuMZ[_0x292080(0x364)][_0x292080(0x4b9)]=Game_Event['prototype'][_0x292080(0x333)],Game_Event[_0x292080(0x45b)][_0x292080(0x333)]=function(_0x455c03,_0x570318){const _0x16dcb0=_0x292080;VisuMZ['EventsMoveCore']['Game_Event_initialize'][_0x16dcb0(0x46f)](this,_0x455c03,_0x570318),this[_0x16dcb0(0x23b)](),this[_0x16dcb0(0x1f3)](),this['restoreSavedEventPosition']();},Game_Map[_0x292080(0x45b)][_0x292080(0x42b)]=function(_0x3c03d7,_0xed8ea3){const _0x13eb7c=_0x292080;return _0x3c03d7===$gameMap[_0x13eb7c(0x51b)]()?$dataMap['events'][_0xed8ea3]:VisuMZ[_0x13eb7c(0x2b8)][_0x3c03d7]['events'][_0xed8ea3];},VisuMZ[_0x292080(0x364)][_0x292080(0x4a9)]=Game_Event[_0x292080(0x45b)][_0x292080(0x47f)],Game_Event['prototype'][_0x292080(0x47f)]=function(){const _0x30cb96=_0x292080;if(this[_0x30cb96(0x3df)]!==undefined){const _0x312c9d=this[_0x30cb96(0x3df)]['mapId'],_0x39c549=this[_0x30cb96(0x3df)][_0x30cb96(0x35a)];return $gameMap[_0x30cb96(0x42b)](_0x312c9d,_0x39c549);}if(this['_eventCopyData']!==undefined){const _0x5164fb=this[_0x30cb96(0x30c)]['mapId'],_0x3f5adf=this[_0x30cb96(0x30c)][_0x30cb96(0x35a)];return $gameMap[_0x30cb96(0x42b)](_0x5164fb,_0x3f5adf);}if(this[_0x30cb96(0x2b1)]!==undefined){const _0x2f4e39=this['_eventSpawnData'][_0x30cb96(0x51b)],_0x58aa9e=this['_eventSpawnData'][_0x30cb96(0x35a)];return $gameMap[_0x30cb96(0x42b)](_0x2f4e39,_0x58aa9e);}if($gameTemp['_spawnData']!==undefined){const _0x5da3f1=$gameTemp[_0x30cb96(0x2c2)][_0x30cb96(0x51b)],_0x386ae8=$gameTemp[_0x30cb96(0x2c2)]['eventId'];return $gameMap[_0x30cb96(0x42b)](_0x5da3f1,_0x386ae8);}return VisuMZ['EventsMoveCore']['Game_Event_event'][_0x30cb96(0x46f)](this);},Game_Event[_0x292080(0x45b)][_0x292080(0x143)]=function(_0x432e35,_0x32005c){const _0x3ac89b=_0x292080;if(_0x432e35===0x0||_0x32005c===0x0)return![];if(_0x432e35===$gameMap['mapId']())return!![];if(!VisuMZ[_0x3ac89b(0x2b8)][_0x432e35]&&_0x432e35!==$gameMap[_0x3ac89b(0x51b)]())return $gameTemp['isPlaytest']()&&console[_0x3ac89b(0x27d)]('ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.'[_0x3ac89b(0x193)](_0x432e35)),![];return!![];},VisuMZ[_0x292080(0x364)]['Game_Event_start']=Game_Event[_0x292080(0x45b)][_0x292080(0x268)],Game_Event['prototype'][_0x292080(0x268)]=function(){const _0x5dc4ec=_0x292080;VisuMZ['EventsMoveCore'][_0x5dc4ec(0x4ce)][_0x5dc4ec(0x46f)](this),Imported['VisuMZ_1_MessageCore']&&Input[_0x5dc4ec(0x4d5)](VisuMZ[_0x5dc4ec(0x373)][_0x5dc4ec(0x411)][_0x5dc4ec(0x383)][_0x5dc4ec(0x34a)])&&Input['clear']();},Game_Event[_0x292080(0x45b)]['setupCopyEvent']=function(){const _0x1e55ff=_0x292080,_0x4fea14=this['event']()[_0x1e55ff(0x2f3)];if(_0x4fea14==='')return;if(DataManager[_0x1e55ff(0x168)]()||DataManager[_0x1e55ff(0x4b3)]())return;const _0x2762bc=VisuMZ[_0x1e55ff(0x364)]['Settings'][_0x1e55ff(0x4e3)];let _0x4cd63b=null,_0x4eb130=0x0,_0x442bac=0x0;if(_0x4fea14[_0x1e55ff(0x173)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x4eb130=Number(RegExp['$1']),_0x442bac=Number(RegExp['$2']);if(_0x4eb130===0x0)_0x4eb130=$gameMap[_0x1e55ff(0x51b)]();}else{if(_0x4fea14[_0x1e55ff(0x173)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){_0x4eb130=Number(RegExp['$1']),_0x442bac=Number(RegExp['$2']);if(_0x4eb130===0x0)_0x4eb130=$gameMap['mapId']();}else{if(_0x4fea14[_0x1e55ff(0x173)](/<COPY EVENT:[ ](.*?)>/i)){const _0x36b867=String(RegExp['$1'])[_0x1e55ff(0x4a5)]()['trim']();_0x4cd63b=VisuMZ[_0x1e55ff(0x569)][_0x36b867];if(!_0x4cd63b)return;_0x4eb130=_0x4cd63b[_0x1e55ff(0x1c7)],_0x442bac=_0x4cd63b[_0x1e55ff(0x4bb)];}}}if(!this[_0x1e55ff(0x143)](_0x4eb130,_0x442bac))return;_0x2762bc[_0x1e55ff(0x441)]['call'](this,_0x4eb130,_0x442bac,this);if(_0x4cd63b)_0x4cd63b[_0x1e55ff(0x441)][_0x1e55ff(0x46f)](this,_0x4eb130,_0x442bac,this);this[_0x1e55ff(0x30c)]={'mapId':_0x4eb130,'eventId':_0x442bac},this[_0x1e55ff(0x3be)]=-0x2,this['refresh'](),_0x2762bc['PostCopyJS']['call'](this,_0x4eb130,_0x442bac,this);if(_0x4cd63b)_0x4cd63b['PostCopyJS'][_0x1e55ff(0x46f)](this,_0x4eb130,_0x442bac,this);$gameMap['clearEventCache']();},Game_Event[_0x292080(0x45b)][_0x292080(0x1f3)]=function(){const _0xf5e500=_0x292080,_0x488b4a=$gameSystem['getPreservedMorphEventData'](this);if(!_0x488b4a)return;const _0x4ec77c=_0x488b4a[_0xf5e500(0x498)][_0xf5e500(0x4a5)]()[_0xf5e500(0x42d)]();_0x4ec77c!==_0xf5e500(0x4db)?this[_0xf5e500(0x47e)](_0x4ec77c,!![]):this['morphInto'](_0x488b4a[_0xf5e500(0x51b)],_0x488b4a[_0xf5e500(0x35a)],!![]);},Game_Event[_0x292080(0x45b)][_0x292080(0x206)]=function(_0x17d173,_0x50ed6d,_0x577ee4){const _0x27e424=_0x292080;if(!this['checkValidEventerMap'](_0x17d173,_0x50ed6d))return;const _0x2700e4=VisuMZ[_0x27e424(0x364)][_0x27e424(0x411)]['Template'];if(!_0x577ee4)_0x2700e4[_0x27e424(0x3fd)][_0x27e424(0x46f)](this,_0x17d173,_0x50ed6d,this);this[_0x27e424(0x3df)]={'mapId':_0x17d173,'eventId':_0x50ed6d},this[_0x27e424(0x3be)]=-0x2,this[_0x27e424(0x191)]();if(!_0x577ee4)_0x2700e4['PostMorphJS']['call'](this,_0x17d173,_0x50ed6d,this);$gameMap[_0x27e424(0x3f0)]();},Game_Event['prototype'][_0x292080(0x47e)]=function(_0x323f5f,_0x2864af){const _0x2bebe9=_0x292080;_0x323f5f=_0x323f5f[_0x2bebe9(0x4a5)]()[_0x2bebe9(0x42d)]();const _0x519829=VisuMZ['EventTemplates'][_0x323f5f];if(!_0x519829)return;const _0x477cac=_0x519829[_0x2bebe9(0x1c7)],_0x349cb9=_0x519829[_0x2bebe9(0x4bb)];if(!this[_0x2bebe9(0x143)](_0x477cac,_0x349cb9))return;if(!_0x2864af)_0x519829[_0x2bebe9(0x3fd)][_0x2bebe9(0x46f)](this,_0x477cac,_0x349cb9,this);this[_0x2bebe9(0x206)](_0x477cac,_0x349cb9,_0x2864af);if(!_0x2864af)_0x519829[_0x2bebe9(0x3e6)][_0x2bebe9(0x46f)](this,_0x477cac,_0x349cb9,this);if($gameMap)$gameMap[_0x2bebe9(0x3f0)]();},Game_Event[_0x292080(0x45b)]['removeMorph']=function(){const _0x5c0189=_0x292080;this[_0x5c0189(0x3df)]=undefined,this[_0x5c0189(0x3be)]=-0x2,this['refresh']();},Game_Event[_0x292080(0x45b)][_0x292080(0x358)]=function(_0x1466ac){const _0x28d4ad=_0x292080,_0x5eaa0f=VisuMZ[_0x28d4ad(0x364)][_0x28d4ad(0x411)][_0x28d4ad(0x4e3)],_0x343269=_0x1466ac[_0x28d4ad(0x498)][_0x28d4ad(0x4a5)]()['trim'](),_0x2dbe91=!['',_0x28d4ad(0x4db)][_0x28d4ad(0x539)](_0x343269);let _0x22930c=0x0,_0x36dd64=0x0;if(_0x2dbe91){const _0xe875ec=VisuMZ[_0x28d4ad(0x569)][_0x343269];if(!_0xe875ec)return;_0x22930c=_0xe875ec[_0x28d4ad(0x1c7)],_0x36dd64=_0xe875ec[_0x28d4ad(0x4bb)];}else _0x22930c=_0x1466ac[_0x28d4ad(0x51b)],_0x36dd64=_0x1466ac[_0x28d4ad(0x35a)];if(!this[_0x28d4ad(0x143)](_0x22930c,_0x36dd64))return;if(_0x2dbe91){const _0x5dddf2=VisuMZ[_0x28d4ad(0x569)][_0x343269];_0x5dddf2[_0x28d4ad(0x378)][_0x28d4ad(0x46f)](this,_0x22930c,_0x36dd64,this);}_0x5eaa0f[_0x28d4ad(0x378)][_0x28d4ad(0x46f)](this,_0x22930c,_0x36dd64,this),this[_0x28d4ad(0x2b1)]=_0x1466ac,this[_0x28d4ad(0x3be)]=-0x2,this['_mapId']=$gameMap[_0x28d4ad(0x51b)](),this['_eventId']=_0x1466ac[_0x28d4ad(0x4f7)],this[_0x28d4ad(0x294)]=_0x1466ac[_0x28d4ad(0x361)],this[_0x28d4ad(0x44c)](_0x1466ac['x'],_0x1466ac['y']),this[_0x28d4ad(0x43d)](_0x1466ac[_0x28d4ad(0x56c)]),this[_0x28d4ad(0x191)]();if(_0x2dbe91){const _0x3f3700=VisuMZ[_0x28d4ad(0x569)][_0x343269];if(!_0x3f3700)return;_0x3f3700[_0x28d4ad(0x4ca)][_0x28d4ad(0x46f)](this,_0x22930c,_0x36dd64,this);}_0x5eaa0f[_0x28d4ad(0x4ca)]['call'](this,_0x22930c,_0x36dd64,this);const _0x2e9967=SceneManager[_0x28d4ad(0x28c)];if(_0x2e9967&&_0x2e9967[_0x28d4ad(0x2b9)])_0x2e9967[_0x28d4ad(0x2b9)][_0x28d4ad(0x4c4)](this);},Game_Event[_0x292080(0x45b)][_0x292080(0x362)]=function(){return!!this['_eventSpawnData'];},Game_Event[_0x292080(0x45b)][_0x292080(0x268)]=function(){const _0x22ed7e=_0x292080;if(!this[_0x22ed7e(0x534)]())return;const _0x1e5b14=this['list']()[_0x22ed7e(0x32c)](_0x2f7592=>_0x2f7592[_0x22ed7e(0x29f)]!==0x6c&&_0x2f7592[_0x22ed7e(0x29f)]!==0x198);_0x1e5b14[_0x22ed7e(0x1bd)]>0x1&&(this[_0x22ed7e(0x570)]=!![],this[_0x22ed7e(0x2c9)]([0x0,0x1,0x2])&&this['lock']());},VisuMZ[_0x292080(0x364)][_0x292080(0x4cf)]=Game_Event[_0x292080(0x45b)]['clearPageSettings'],Game_Event[_0x292080(0x45b)]['clearPageSettings']=function(){const _0x5d12c9=_0x292080;VisuMZ[_0x5d12c9(0x364)][_0x5d12c9(0x4cf)][_0x5d12c9(0x46f)](this),this['initEventsMoveCoreEffects'](),this[_0x5d12c9(0x50e)]();},VisuMZ[_0x292080(0x364)][_0x292080(0x27e)]=Game_Event[_0x292080(0x45b)][_0x292080(0x49a)],Game_Event[_0x292080(0x45b)][_0x292080(0x49a)]=function(){const _0x36aaac=_0x292080;this['_activationProximityAutoTriggerBypass']=!![],VisuMZ[_0x36aaac(0x364)][_0x36aaac(0x27e)][_0x36aaac(0x46f)](this),this[_0x36aaac(0x46d)](),this['autosaveEventLocation'](),this[_0x36aaac(0x221)]=![];},Game_Event[_0x292080(0x45b)][_0x292080(0x46d)]=function(){const _0x203263=_0x292080;if(!this[_0x203263(0x47f)]())return;this[_0x203263(0x4b2)](),this[_0x203263(0x484)](),this['setupEventsMoveCoreCommentTags'](),this[_0x203263(0x2d1)]();},Game_Event[_0x292080(0x45b)]['setupEventsMoveCoreNotetags']=function(){const _0x5aecee=_0x292080,_0x250813=this[_0x5aecee(0x47f)]()[_0x5aecee(0x2f3)];if(_0x250813==='')return;this['checkEventsMoveCoreStringTags'](_0x250813);},Game_Event[_0x292080(0x45b)]['setupEventsMoveCoreCommentTags']=function(){const _0x46a407=_0x292080;if(!this['page']())return;const _0x27af2b=this[_0x46a407(0x534)]();let _0x1fe4b5='';for(const _0x473f64 of _0x27af2b){if([0x6c,0x198][_0x46a407(0x539)](_0x473f64[_0x46a407(0x29f)])){if(_0x1fe4b5!=='')_0x1fe4b5+='\x0a';_0x1fe4b5+=_0x473f64[_0x46a407(0x42c)][0x0];}}this[_0x46a407(0x2cc)](_0x1fe4b5);},Game_Event['prototype'][_0x292080(0x4b2)]=function(){const _0x2be7cd=_0x292080,_0x526086=VisuMZ[_0x2be7cd(0x364)][_0x2be7cd(0x411)];this['_activationProximity']={'type':_0x2be7cd(0x3f8),'distance':0x0,'regionList':[]},this[_0x2be7cd(0x480)]=![],this[_0x2be7cd(0x332)](),this['_clickTrigger']=![],this[_0x2be7cd(0x32f)]=![],this[_0x2be7cd(0x45a)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x2be7cd(0x207)]=$gameSystem['getEventIconData'](this),this[_0x2be7cd(0x2aa)]={'originalText':'','text':'','visibleRange':_0x526086['Label'][_0x2be7cd(0x4e0)],'offsetX':_0x526086[_0x2be7cd(0x473)][_0x2be7cd(0x52a)],'offsetY':_0x526086[_0x2be7cd(0x473)][_0x2be7cd(0x171)]},this[_0x2be7cd(0x331)]=![],this[_0x2be7cd(0x233)]=[],this[_0x2be7cd(0x501)]={'target':-0x1,'type':_0x2be7cd(0x354),'delay':0x1,'opacityDelta':0x0},this[_0x2be7cd(0x4f3)]=_0x526086[_0x2be7cd(0x1ec)]['RandomMoveWeight']??0x0,this[_0x2be7cd(0x477)]=![],this['_scaleBaseX']=0x1,this['_scaleBaseY']=0x1,this[_0x2be7cd(0x1bf)]={'visible':!![],'filename':_0x526086[_0x2be7cd(0x1ec)][_0x2be7cd(0x4fc)]},this[_0x2be7cd(0x1d0)](),this[_0x2be7cd(0x146)]();},Game_Event[_0x292080(0x45b)][_0x292080(0x2cc)]=function(_0x149b0d){const _0x5bf966=_0x292080;if(_0x149b0d['match'](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x5bf966(0x42f)]['regionList']=JSON[_0x5bf966(0x235)]('['+RegExp['$1'][_0x5bf966(0x173)](/\d+/g)+']'),this['_activationProximity']['type']=_0x5bf966(0x163);else _0x149b0d['match'](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])['toLowerCase']()['trim'](),this['_activationProximity']['type']=type,this[_0x5bf966(0x42f)][_0x5bf966(0x529)]=Number(RegExp['$2']));_0x149b0d[_0x5bf966(0x173)](/<(?:ATTACH PICTURE|PICTURE) FILENAME:[ ](.*?)>/i)&&(this[_0x5bf966(0x15d)]['filename']=String(RegExp['$1']));if(_0x149b0d[_0x5bf966(0x173)](/<(?:ATTACH PICTURE|PICTURE) BLEND MODE:[ ](.*?)>/i)){const _0x7105ac=String(RegExp['$1'])[_0x5bf966(0x4a5)]()[_0x5bf966(0x42d)](),_0x5ea815=['NORMAL',_0x5bf966(0x38e),_0x5bf966(0x46b),_0x5bf966(0x199)];this[_0x5bf966(0x15d)][_0x5bf966(0x402)]=_0x5ea815['indexOf'](_0x7105ac)[_0x5bf966(0x2c5)](0x0,0x3);}_0x149b0d[_0x5bf966(0x173)](/<(?:ATTACH PICTURE|PICTURE) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)&&(this[_0x5bf966(0x15d)][_0x5bf966(0x4b8)]=Number(RegExp['$1']));_0x149b0d[_0x5bf966(0x173)](/<(?:ATTACH PICTURE|PICTURE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x5bf966(0x15d)][_0x5bf966(0x330)]=Number(RegExp['$1']));_0x149b0d[_0x5bf966(0x173)](/<(?:ATTACH PICTURE|PICTURE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this['_attachPicture'][_0x5bf966(0x3d7)]=Number(RegExp['$1']));_0x149b0d['match'](/<(?:ATTACH PICTURE|PICTURE) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x5bf966(0x15d)][_0x5bf966(0x330)]=Number(RegExp['$1']),this[_0x5bf966(0x15d)]['offsetY']=Number(RegExp['$2']));_0x149b0d['match'](/<(?:ATTACH PICTURE|PICTURE) SCALE:[ ](\d+)([%％])>/i)&&(this[_0x5bf966(0x15d)]['scale']=Number(RegExp['$1'])*0.01);_0x149b0d[_0x5bf966(0x173)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x5bf966(0x480)]=!![]);_0x149b0d[_0x5bf966(0x173)](/<CLICK TRIGGER>/i)&&(this['_clickTrigger']=!![]);_0x149b0d[_0x5bf966(0x173)](/<CUSTOM Z:[ ](.*?)>/i)&&(this[_0x5bf966(0x32f)]=Number(RegExp['$1'])||0x0);const _0x565109=_0x149b0d[_0x5bf966(0x173)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x565109)for(const _0xe872f0 of _0x565109){if(_0xe872f0[_0x5bf966(0x173)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x24cc21=String(RegExp['$1'])[_0x5bf966(0x4d6)]()[_0x5bf966(0x42d)](),_0x1a7db1=Number(RegExp['$2']);this['_addedHitbox'][_0x24cc21]=_0x1a7db1;}}_0x149b0d[_0x5bf966(0x173)](/<ICON:[ ](\d+)>/i)&&(this['_eventIcon'][_0x5bf966(0x50c)]=Number(RegExp['$1']));_0x149b0d['match'](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x5bf966(0x207)]['bufferX']=Number(RegExp['$1']));_0x149b0d[_0x5bf966(0x173)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x5bf966(0x207)]['bufferY']=Number(RegExp['$1']));_0x149b0d[_0x5bf966(0x173)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x5bf966(0x207)]['bufferX']=Number(RegExp['$1']),this[_0x5bf966(0x207)][_0x5bf966(0x456)]=Number(RegExp['$2']));if(_0x149b0d[_0x5bf966(0x173)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x1ee7bc=String(RegExp['$1'])[_0x5bf966(0x4a5)]()[_0x5bf966(0x42d)](),_0x44da74=[_0x5bf966(0x16d),'ADDITIVE',_0x5bf966(0x46b),_0x5bf966(0x199)];this['_eventIcon']['blendMode']=_0x44da74[_0x5bf966(0x49e)](_0x1ee7bc)[_0x5bf966(0x2c5)](0x0,0x3);}if(_0x149b0d[_0x5bf966(0x173)](/<LABEL:[ ](.*?)>/i)){let _0x59e63f=String(RegExp['$1'])[_0x5bf966(0x42d)]();this[_0x5bf966(0x2aa)][_0x5bf966(0x1bc)]=_0x59e63f,this[_0x5bf966(0x2aa)][_0x5bf966(0x572)]=_0x59e63f;}if(_0x149b0d[_0x5bf966(0x173)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){let _0x442a85=String(RegExp['$1'])[_0x5bf966(0x42d)]();this[_0x5bf966(0x2aa)]['text']=_0x442a85,this[_0x5bf966(0x2aa)][_0x5bf966(0x572)]=_0x442a85;}_0x149b0d[_0x5bf966(0x173)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x5bf966(0x2aa)]['offsetX']=Number(RegExp['$1']));_0x149b0d[_0x5bf966(0x173)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x5bf966(0x2aa)][_0x5bf966(0x3d7)]=Number(RegExp['$1']));_0x149b0d['match'](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x5bf966(0x330)]=Number(RegExp['$1']),this[_0x5bf966(0x2aa)][_0x5bf966(0x3d7)]=Number(RegExp['$2']));this['updateEventLabelText']();_0x149b0d[_0x5bf966(0x173)](/<LABEL RANGE:[ ](\d+)>/i)&&(this['_labelWindow']['visibleRange']=Number(RegExp['$1']));_0x149b0d[_0x5bf966(0x173)](/<MIRROR SPRITE>/i)&&(this[_0x5bf966(0x331)]=!![]);if(_0x149b0d[_0x5bf966(0x173)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x339b13=JSON[_0x5bf966(0x235)]('['+RegExp['$1'][_0x5bf966(0x173)](/\d+/g)+']');this[_0x5bf966(0x233)]=this['_moveOnlyRegions'][_0x5bf966(0x16b)](_0x339b13),this[_0x5bf966(0x233)]['remove'](0x0);}if(_0x149b0d[_0x5bf966(0x173)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x40f818=String(RegExp['$1']);if(_0x40f818[_0x5bf966(0x173)](/PLAYER/i))this[_0x5bf966(0x501)]['target']=0x0;else _0x40f818['match'](/EVENT[ ](\d+)/i)&&(this[_0x5bf966(0x501)][_0x5bf966(0x435)]=Number(RegExp['$1']));}_0x149b0d[_0x5bf966(0x173)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this['_moveSynch']['type']=String(RegExp['$1'])[_0x5bf966(0x4d6)]()[_0x5bf966(0x42d)]());_0x149b0d['match'](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x5bf966(0x501)]['delay']=Number(RegExp['$1']));_0x149b0d[_0x5bf966(0x173)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this[_0x5bf966(0x501)]['opacityDelta']=Number(RegExp['$1']));if(_0x149b0d[_0x5bf966(0x173)](/<TRUE RANDOM MOVE>/i))this[_0x5bf966(0x4f3)]=0x0;else _0x149b0d['match'](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x5bf966(0x4f3)]=Number(RegExp['$1'])||0x0);_0x149b0d[_0x5bf966(0x173)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x5bf966(0x477)]=!![]);_0x149b0d['match'](/<SCALE X:[ ](\d+)([%％])>/i)&&(this[_0x5bf966(0x447)]=Number(RegExp['$1'])*0.01);_0x149b0d['match'](/<SCALE Y:[ ](\d+)([%％])>/i)&&(this['_scaleBaseY']=Number(RegExp['$1'])*0.01);if(_0x149b0d['match'](/<SCALE:[ ](\d+)([%％])>/i)){const _0x5ec6fa=Number(RegExp['$1'])*0.01;this['_scaleBaseX']=_0x5ec6fa,this[_0x5bf966(0x155)]=_0x5ec6fa;}_0x149b0d['match'](/<HIDE SHADOW>/i)&&(this[_0x5bf966(0x1bf)]['visible']=![]),_0x149b0d['match'](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x5bf966(0x1bf)][_0x5bf966(0x56b)]=String(RegExp['$1'])),_0x149b0d[_0x5bf966(0x173)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetX']=Number(RegExp['$1'])),_0x149b0d[_0x5bf966(0x173)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x5bf966(0x35f)]=Number(RegExp['$1'])),_0x149b0d[_0x5bf966(0x173)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x5bf966(0x503)]=Number(RegExp['$1']),this['_spriteOffsetY']=Number(RegExp['$2'])),_0x149b0d[_0x5bf966(0x173)](/<STEP PATTERN:[ ](.*)>/i)&&(this['_stepPattern']=String(RegExp['$1'])[_0x5bf966(0x4a5)]()[_0x5bf966(0x42d)]());},Game_Event[_0x292080(0x45b)][_0x292080(0x211)]=function(){const _0x2e0c95=_0x292080;$gameTemp[_0x2e0c95(0x387)](this),this['_labelWindow'][_0x2e0c95(0x1bc)]=this[_0x2e0c95(0x2aa)][_0x2e0c95(0x572)];for(;;){if(this[_0x2e0c95(0x2aa)][_0x2e0c95(0x1bc)]['match'](/\\V\[(\d+)\]/gi))this[_0x2e0c95(0x2aa)][_0x2e0c95(0x1bc)]=this[_0x2e0c95(0x2aa)]['originalText'][_0x2e0c95(0x39c)](/\\V\[(\d+)\]/gi,(_0x1f52e5,_0x161c7e)=>$gameVariables['value'](parseInt(_0x161c7e)));else break;}$gameTemp[_0x2e0c95(0x566)]();},Game_Event[_0x292080(0x45b)][_0x292080(0x2d1)]=function(){this['updateShadowChanges']();},Game_Event['prototype'][_0x292080(0x127)]=function(){const _0x551318=_0x292080;if(this[_0x551318(0x480)])return!![];return Game_Character[_0x551318(0x45b)][_0x551318(0x127)][_0x551318(0x46f)](this);},VisuMZ[_0x292080(0x364)]['Game_Event_updateSelfMovement']=Game_Event['prototype']['updateSelfMovement'],Game_Event[_0x292080(0x45b)][_0x292080(0x4af)]=function(){const _0x13c698=_0x292080;if(this[_0x13c698(0x1a9)]())return;VisuMZ[_0x13c698(0x364)][_0x13c698(0x1c6)][_0x13c698(0x46f)](this),this[_0x13c698(0x3ff)]()&&VisuMZ[_0x13c698(0x4e5)](this['_eventId']);},Game_Event['prototype'][_0x292080(0x1a9)]=function(){const _0x3487c9=_0x292080,_0x11766a=VisuMZ[_0x3487c9(0x364)][_0x3487c9(0x411)]['Movement'];if($gameMap[_0x3487c9(0x24a)]()&&_0x11766a['StopAutoMoveEvents'])return!![];if($gameMessage[_0x3487c9(0x556)]()&&_0x11766a[_0x3487c9(0x51f)])return!![];if(!$gameSystem[_0x3487c9(0x517)]())return!![];if(this['moveSynchTarget']()>=0x0)return!![];if(!SceneManager[_0x3487c9(0x28c)][_0x3487c9(0x3ed)])return!![];return![];},Game_Event['prototype'][_0x292080(0x579)]=function(){const _0x4c5894=_0x292080,_0x35bd2c=SceneManager['_scene'][_0x4c5894(0x2b9)];if(_0x35bd2c){const _0x3cbc26=_0x35bd2c['findTargetSprite'](this);_0x3cbc26&&_0x3cbc26[_0x4c5894(0x3f3)]&&_0x3cbc26[_0x4c5894(0x3f3)][_0x4c5894(0x4ed)]!==this[_0x4c5894(0x16a)]()&&(_0x3cbc26['_shadowSprite'][_0x4c5894(0x4ed)]=this[_0x4c5894(0x16a)](),_0x3cbc26[_0x4c5894(0x3f3)][_0x4c5894(0x2a5)]=ImageManager['loadSystem'](_0x3cbc26[_0x4c5894(0x3f3)][_0x4c5894(0x4ed)]));}},Game_Event[_0x292080(0x45b)][_0x292080(0x16a)]=function(){const _0x2cc5c9=_0x292080;return this['_shadowGraphic'][_0x2cc5c9(0x56b)];},Game_Event[_0x292080(0x45b)][_0x292080(0x313)]=function(){const _0x471685=_0x292080;if(!this[_0x471685(0x1bf)][_0x471685(0x46a)])return![];return Game_CharacterBase[_0x471685(0x45b)][_0x471685(0x313)][_0x471685(0x46f)](this);},Game_Event['prototype'][_0x292080(0x4e1)]=function(){return this['_labelWindow']['text'];},Game_Event[_0x292080(0x45b)]['labelWindowRange']=function(){const _0x29f50b=_0x292080;return this[_0x29f50b(0x2aa)][_0x29f50b(0x1b3)];},Game_Event[_0x292080(0x45b)][_0x292080(0x1a2)]=function(_0x1c270d,_0x32a330,_0x107c4b){const _0x59be1d=_0x292080;if(this['hasMoveOnlyRegions']())return this[_0x59be1d(0x55f)](_0x1c270d,_0x32a330,_0x107c4b);if($gameMap[_0x59be1d(0x254)](_0x1c270d,_0x32a330,_0x107c4b,_0x59be1d(0x47f)))return!![];if($gameMap[_0x59be1d(0x43a)](_0x1c270d,_0x32a330,_0x107c4b,_0x59be1d(0x47f)))return![];return Game_Character['prototype'][_0x59be1d(0x1a2)]['call'](this,_0x1c270d,_0x32a330,_0x107c4b);},Game_Event['prototype'][_0x292080(0x342)]=function(){const _0x1fb7f0=_0x292080;if(this[_0x1fb7f0(0x233)]===undefined)this[_0x1fb7f0(0x4b2)]();return this[_0x1fb7f0(0x233)][_0x1fb7f0(0x1bd)]>0x0;},Game_Event[_0x292080(0x45b)][_0x292080(0x55f)]=function(_0x5edb18,_0x1fc003,_0x558487){const _0x524f9f=_0x292080,_0x255295=$gameMap['roundXWithDirection'](_0x5edb18,_0x558487),_0x3c0f65=$gameMap['roundYWithDirection'](_0x1fc003,_0x558487),_0x14c05e=$gameMap[_0x524f9f(0x2f9)](_0x255295,_0x3c0f65);return this['_moveOnlyRegions']['includes'](_0x14c05e);},VisuMZ[_0x292080(0x364)][_0x292080(0x2dd)]=Game_Event['prototype'][_0x292080(0x184)],Game_Event['prototype'][_0x292080(0x184)]=function(){const _0x2a9efa=_0x292080;if(this[_0x2a9efa(0x47f)]()&&!$gameTemp[_0x2a9efa(0x285)]()){if(this[_0x2a9efa(0x47f)]()[_0x2a9efa(0x2f3)][_0x2a9efa(0x173)](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}return this[_0x2a9efa(0x181)]=![],this[_0x2a9efa(0x476)]=![],this[_0x2a9efa(0x47f)]()?VisuMZ['EventsMoveCore'][_0x2a9efa(0x2dd)][_0x2a9efa(0x46f)](this):-0x1;},VisuMZ['EventsMoveCore']['Game_Event_meetsConditions']=Game_Event[_0x292080(0x45b)][_0x292080(0x3e2)],Game_Event[_0x292080(0x45b)][_0x292080(0x3e2)]=function(_0x326069){const _0x21b639=_0x292080;this[_0x21b639(0x1a4)](_0x326069),$gameTemp[_0x21b639(0x387)](this);const _0x5eee2b=VisuMZ['EventsMoveCore'][_0x21b639(0x542)]['call'](this,_0x326069);return $gameTemp[_0x21b639(0x566)](),_0x5eee2b;},Game_Event[_0x292080(0x45b)][_0x292080(0x3ca)]=function(){const _0x1a8d96=_0x292080;return this[_0x1a8d96(0x181)];},Game_Event[_0x292080(0x45b)]['checkAdvancedSwitchVariablePresent']=function(_0x2ec9d3){const _0x195442=_0x292080,_0x36efa8=_0x2ec9d3['conditions'];if(_0x36efa8[_0x195442(0x256)]&&DataManager[_0x195442(0x424)](_0x36efa8[_0x195442(0x277)]))this['_advancedSwitchVariable']=!![];else{if(_0x36efa8[_0x195442(0x430)]&&DataManager[_0x195442(0x424)](_0x36efa8['switch2Id']))this[_0x195442(0x181)]=!![];else _0x36efa8[_0x195442(0x1e7)]&&DataManager[_0x195442(0x2cb)](_0x36efa8[_0x195442(0x149)])&&(this['_advancedSwitchVariable']=!![]);}},Game_Event[_0x292080(0x45b)]['hasClickTrigger']=function(){const _0x34c04f=_0x292080;if(this[_0x34c04f(0x14c)])return![];return this[_0x34c04f(0x140)];},Game_Event[_0x292080(0x45b)][_0x292080(0x339)]=function(){const _0x36c673=_0x292080;$gameTemp[_0x36c673(0x4eb)](),this['start']();},Game_Event[_0x292080(0x45b)][_0x292080(0x1ca)]=function(_0x2c9eb0,_0x5ca0da){const _0x406371=_0x292080;return this[_0x406371(0x45a)]?this[_0x406371(0x2ab)](_0x2c9eb0,_0x5ca0da):Game_Character[_0x406371(0x45b)][_0x406371(0x1ca)]['call'](this,_0x2c9eb0,_0x5ca0da);},Game_Event[_0x292080(0x45b)][_0x292080(0x2ab)]=function(_0x50ffb5,_0x357123){const _0x445a5d=_0x292080;var _0xa926f2=this['x']-this['_addedHitbox'][_0x445a5d(0x37c)],_0x5d69d7=this['x']+this[_0x445a5d(0x45a)][_0x445a5d(0x372)],_0x1ea9a5=this['y']-this['_addedHitbox']['up'],_0x3567d4=this['y']+this[_0x445a5d(0x45a)][_0x445a5d(0x1cd)];return _0xa926f2<=_0x50ffb5&&_0x50ffb5<=_0x5d69d7&&_0x1ea9a5<=_0x357123&&_0x357123<=_0x3567d4;},Game_Event['prototype']['canPass']=function(_0x149744,_0xecf6fb,_0x2b9474){const _0x29e3d4=_0x292080;for(let _0x4ec6e5=-this['_addedHitbox'][_0x29e3d4(0x37c)];_0x4ec6e5<=this['_addedHitbox'][_0x29e3d4(0x372)];_0x4ec6e5++){for(let _0x6ce7d5=-this[_0x29e3d4(0x45a)]['up'];_0x6ce7d5<=this['_addedHitbox'][_0x29e3d4(0x1cd)];_0x6ce7d5++){if(!Game_Character[_0x29e3d4(0x45b)][_0x29e3d4(0x192)][_0x29e3d4(0x46f)](this,_0x149744+_0x4ec6e5,_0xecf6fb+_0x6ce7d5,_0x2b9474))return![];}}return!![];},Game_Event[_0x292080(0x45b)][_0x292080(0x31f)]=function(_0x4a1c08,_0x473f7f){const _0x1f42e5=_0x292080;if(Imported[_0x1f42e5(0x31e)]&&this[_0x1f42e5(0x341)]())return this[_0x1f42e5(0x544)](_0x4a1c08,_0x473f7f);else{const _0x5e46b7=$gameMap[_0x1f42e5(0x2e3)](_0x4a1c08,_0x473f7f)[_0x1f42e5(0x32c)](_0x9acaa6=>_0x9acaa6!==this);return _0x5e46b7['length']>0x0;}},Game_Event[_0x292080(0x45b)]['checkSmartEventCollision']=function(_0xf64568,_0x537146){const _0x213493=_0x292080;if(!this[_0x213493(0x2ff)]())return![];else{const _0x487c9a=$gameMap['eventsXyNt'](_0xf64568,_0x537146)[_0x213493(0x32c)](_0x57e7c3=>_0x57e7c3!==this&&_0x57e7c3[_0x213493(0x2ff)]());return _0x487c9a[_0x213493(0x1bd)]>0x0;}},Game_Event[_0x292080(0x45b)][_0x292080(0x292)]=function(){const _0x512ca0=_0x292080;return this[_0x512ca0(0x42f)][_0x512ca0(0x2a1)]||'none';},Game_Event[_0x292080(0x45b)][_0x292080(0x2ca)]=function(){const _0x394a4b=_0x292080;return this[_0x394a4b(0x42f)][_0x394a4b(0x529)]||0x0;},Game_Event['prototype'][_0x292080(0x4ea)]=function(){const _0x2cb597=_0x292080;return this[_0x2cb597(0x42f)][_0x2cb597(0x324)]||[];},Game_Event[_0x292080(0x45b)]['increaseSteps']=function(){const _0x3e2824=_0x292080;Game_Character['prototype'][_0x3e2824(0x2c8)][_0x3e2824(0x46f)](this);if(['none',_0x3e2824(0x163)][_0x3e2824(0x539)](this['activationProximityType']()))return;$gamePlayer[_0x3e2824(0x22b)]([0x2]);},VisuMZ[_0x292080(0x364)][_0x292080(0x176)]=Game_Event['prototype'][_0x292080(0x3a3)],Game_Event['prototype'][_0x292080(0x3a3)]=function(){const _0x1bfe32=_0x292080;if(this[_0x1bfe32(0x399)]!==0x3)return;if(this[_0x1bfe32(0x221)])return;if(!this[_0x1bfe32(0x38c)](![]))return;if(!this[_0x1bfe32(0x495)](![]))return;VisuMZ[_0x1bfe32(0x364)][_0x1bfe32(0x176)][_0x1bfe32(0x46f)](this);},VisuMZ['EventsMoveCore'][_0x292080(0x53a)]=Game_Event[_0x292080(0x45b)]['updateParallel'],Game_Event[_0x292080(0x45b)][_0x292080(0x518)]=function(){const _0x48e37e=_0x292080;if(!this[_0x48e37e(0x410)])return;if(!this[_0x48e37e(0x38c)](!![]))return;if(!this['checkActivationProximity'](!![]))return;VisuMZ[_0x48e37e(0x364)]['Game_Event_updateParallel']['call'](this);},Game_Event[_0x292080(0x45b)][_0x292080(0x38c)]=function(_0x5cd3a2){const _0x427095=_0x292080;if(!_0x5cd3a2&&$gameMap[_0x427095(0x24a)]())return![];if(!_0x5cd3a2&&$gameMap['isAnyEventStarting']())return![];if(this[_0x427095(0x4ea)]()<=0x0)return!![];return $gamePlayer[_0x427095(0x1ee)](this);},Game_Event[_0x292080(0x45b)][_0x292080(0x495)]=function(_0xcdcb39){const _0x5bc0b4=_0x292080;if(!_0xcdcb39&&$gameMap[_0x5bc0b4(0x24a)]())return![];if(!_0xcdcb39&&$gameMap[_0x5bc0b4(0x273)]())return![];if([_0x5bc0b4(0x3f8),_0x5bc0b4(0x163)][_0x5bc0b4(0x539)](this[_0x5bc0b4(0x292)]()))return!![];return $gamePlayer[_0x5bc0b4(0x1f7)](this);},VisuMZ[_0x292080(0x4e5)]=function(_0x3fc4f9){const _0x5a2532=_0x292080;for(const _0x3e2711 of $gameMap[_0x5a2532(0x54c)]()){if(!_0x3e2711)continue;_0x3e2711['moveSynchTarget']()===_0x3fc4f9&&_0x3e2711[_0x5a2532(0x274)]();}},VisuMZ[_0x292080(0x228)]=function(_0x51f884){const _0x486424=_0x292080;if(_0x51f884===0x0)return $gamePlayer;return $gameMap[_0x486424(0x47f)](_0x51f884);},Game_CharacterBase['prototype']['updateMoveSynchDirection']=function(){},Game_Event['prototype'][_0x292080(0x329)]=function(){const _0x332372=_0x292080;VisuMZ[_0x332372(0x38a)](this[_0x332372(0x487)]);},VisuMZ[_0x292080(0x38a)]=function(_0x6ed433){const _0x1ac0c1=_0x292080;for(const _0x167042 of $gameMap[_0x1ac0c1(0x54c)]()){if(!_0x167042)continue;_0x167042['moveSynchTarget']()===_0x6ed433&&_0x167042['processMoveSynchDirection']();}},Game_Event['prototype']['moveSynchTarget']=function(){const _0x5f4688=_0x292080;return this[_0x5f4688(0x501)]['target'];},Game_Event['prototype'][_0x292080(0x2d2)]=function(){const _0x3bb853=_0x292080;return this[_0x3bb853(0x501)]['type'];},Game_Event[_0x292080(0x45b)][_0x292080(0x3b8)]=function(){const _0xcda3fe=_0x292080;if(this['moveSynchTarget']()>=0x0){const _0x2cbf87=VisuMZ['GetMoveSynchTarget'](this[_0xcda3fe(0x1e0)]());if(_0x2cbf87)return _0x2cbf87[_0xcda3fe(0x3b8)]();}return Game_Character['prototype']['realMoveSpeed'][_0xcda3fe(0x46f)](this);},Game_Event['prototype'][_0x292080(0x274)]=function(){const _0x46c06b=_0x292080;this['_moveSynch'][_0x46c06b(0x3c6)]=this[_0x46c06b(0x501)]['timer']||0x0,this[_0x46c06b(0x501)][_0x46c06b(0x3c6)]--;if(this['_moveSynch'][_0x46c06b(0x3c6)]>0x0)return;this[_0x46c06b(0x501)][_0x46c06b(0x3c6)]=this['_moveSynch'][_0x46c06b(0x1a6)],this[_0x46c06b(0x126)]();},Game_Event[_0x292080(0x45b)][_0x292080(0x36a)]=function(_0x5f2b9a){const _0x4b5846=_0x292080;if(this[_0x4b5846(0x1e0)]()>=0x0){const _0x5035e6=VisuMZ[_0x4b5846(0x228)](this[_0x4b5846(0x1e0)]());if(_0x5035e6){const _0x4e6c41=$gameMap[_0x4b5846(0x529)](this[_0x4b5846(0x19f)],this[_0x4b5846(0x2d5)],_0x5035e6[_0x4b5846(0x19f)],_0x5035e6['_realY'])-0x1,_0x3c5dea=Math[_0x4b5846(0x392)]($gameMap['tileWidth'](),$gameMap['tileHeight']()),_0x106540=this[_0x4b5846(0x501)][_0x4b5846(0x419)]||0x0;_0x5f2b9a-=Math[_0x4b5846(0x13e)](0x0,_0x4e6c41)*_0x3c5dea*_0x106540;}}return _0x5f2b9a;},Game_Event[_0x292080(0x45b)][_0x292080(0x126)]=function(){const _0x358920=_0x292080;switch(this[_0x358920(0x2d2)]()){case _0x358920(0x354):this[_0x358920(0x427)]();break;case _0x358920(0x413):this[_0x358920(0x31a)]();break;case _0x358920(0x1f2):this[_0x358920(0x130)]();break;case _0x358920(0x4c7):this['processMoveSynchCustom']();break;case _0x358920(0x210):case _0x358920(0x485):this[_0x358920(0x14a)]();break;case _0x358920(0x156):case _0x358920(0x3ab):this[_0x358920(0x260)]();break;case _0x358920(0x30a):case'horizontal\x20mirror':case _0x358920(0x55b):case _0x358920(0x132):this[_0x358920(0x2e1)]();break;case'mirror\x20vertical':case _0x358920(0x1b1):case _0x358920(0x279):case _0x358920(0x1b0):this[_0x358920(0x526)]();break;default:this[_0x358920(0x427)]();break;}this[_0x358920(0x434)]();},Game_Event[_0x292080(0x45b)][_0x292080(0x427)]=function(){const _0x2d7626=_0x292080,_0x3649f4=[0x2,0x4,0x6,0x8];$gameMap[_0x2d7626(0x555)]()&&_0x3649f4[_0x2d7626(0x3dd)](0x1,0x3,0x7,0x9);const _0x4f1094=[];for(const _0x2bc1dc of _0x3649f4){if(this[_0x2d7626(0x192)](this['x'],this['y'],_0x2bc1dc))_0x4f1094['push'](_0x2bc1dc);}if(_0x4f1094[_0x2d7626(0x1bd)]>0x0){const _0x2f4568=_0x4f1094[Math[_0x2d7626(0x275)](_0x4f1094[_0x2d7626(0x1bd)])];this[_0x2d7626(0x2da)](_0x2f4568);}},Game_Event[_0x292080(0x45b)][_0x292080(0x31a)]=function(){const _0x30ab88=_0x292080,_0x51b66e=VisuMZ[_0x30ab88(0x228)](this[_0x30ab88(0x1e0)]());this[_0x30ab88(0x36f)](_0x51b66e);},Game_Event['prototype'][_0x292080(0x130)]=function(){const _0x190765=_0x292080,_0x138484=VisuMZ[_0x190765(0x228)](this[_0x190765(0x1e0)]());this[_0x190765(0x150)](_0x138484);},Game_Event['prototype'][_0x292080(0x3d4)]=function(){this['updateRoutineMove']();},Game_Event[_0x292080(0x45b)]['processMoveSynchMimic']=function(){const _0x40924e=_0x292080,_0x304a4f=VisuMZ[_0x40924e(0x228)](this[_0x40924e(0x1e0)]());this[_0x40924e(0x2da)](_0x304a4f['lastMovedDirection']());},Game_Event[_0x292080(0x45b)][_0x292080(0x260)]=function(){const _0x271557=_0x292080,_0x287bb4=VisuMZ[_0x271557(0x228)](this[_0x271557(0x1e0)]());this[_0x271557(0x2da)](this['reverseDir'](_0x287bb4[_0x271557(0x1e5)]()));},Game_Event[_0x292080(0x45b)]['processMoveSynchMirrorHorz']=function(){const _0x59ef78=_0x292080,_0x30e0d4=VisuMZ[_0x59ef78(0x228)](this[_0x59ef78(0x1e0)]()),_0x3063f6=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x30e0d4['lastMovedDirection']()];this[_0x59ef78(0x2da)](_0x3063f6);},Game_Event[_0x292080(0x45b)]['processMoveSynchMirrorVert']=function(){const _0x201ff4=_0x292080,_0x457632=VisuMZ[_0x201ff4(0x228)](this['moveSynchTarget']()),_0x77a6df=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x457632['lastMovedDirection']()];this[_0x201ff4(0x2da)](_0x77a6df);},Game_Event[_0x292080(0x45b)][_0x292080(0x4bd)]=function(){const _0x2d5c4c=_0x292080,_0x502717=VisuMZ[_0x2d5c4c(0x228)](this[_0x2d5c4c(0x1e0)]()),_0x1bce09=_0x502717[_0x2d5c4c(0x56c)]();switch(this[_0x2d5c4c(0x2d2)]()){case'mimic':case _0x2d5c4c(0x485):this['setDirection'](_0x1bce09);break;case _0x2d5c4c(0x156):case _0x2d5c4c(0x3ab):this[_0x2d5c4c(0x43d)](this[_0x2d5c4c(0x4a8)](_0x1bce09));break;case'mirror\x20horizontal':case _0x2d5c4c(0x40a):case'mirror\x20horz':case _0x2d5c4c(0x132):this[_0x2d5c4c(0x43d)]([0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x1bce09]);break;case'mirror\x20vertical':case _0x2d5c4c(0x1b1):case _0x2d5c4c(0x279):case _0x2d5c4c(0x1b0):this[_0x2d5c4c(0x43d)]([0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x1bce09]);break;default:return;}this[_0x2d5c4c(0x434)]();},Game_Event['prototype'][_0x292080(0x244)]=function(){const _0x42641e=_0x292080,_0x2f94f9=$gameSystem[_0x42641e(0x310)](this);if(!_0x2f94f9)return;this[_0x42641e(0x4a2)](_0x2f94f9['x'],_0x2f94f9['y']),this[_0x42641e(0x57a)](),this[_0x42641e(0x43d)](_0x2f94f9[_0x42641e(0x56c)]),this[_0x42641e(0x3be)]===_0x2f94f9['pageIndex']&&(this['_moveRouteIndex']=_0x2f94f9[_0x42641e(0x190)]);},VisuMZ[_0x292080(0x364)]['Game_Event_update']=Game_Event[_0x292080(0x45b)]['update'],Game_Event['prototype']['update']=function(){const _0x5ece18=_0x292080;VisuMZ[_0x5ece18(0x364)][_0x5ece18(0x22e)][_0x5ece18(0x46f)](this),this[_0x5ece18(0x407)]();},Game_Event[_0x292080(0x45b)][_0x292080(0x12c)]=function(){const _0xdbb243=_0x292080;Game_Character['prototype'][_0xdbb243(0x12c)][_0xdbb243(0x46f)](this),this[_0xdbb243(0x50e)]();},Game_Event[_0x292080(0x45b)][_0x292080(0x35c)]=function(){const _0xd6ac2b=_0x292080;if($gameMap[_0xd6ac2b(0x12e)]())return!![];return this[_0xd6ac2b(0x477)];},Game_Event['prototype'][_0x292080(0x50e)]=function(){const _0x29d380=_0x292080;if(!this[_0x29d380(0x35c)]())return;this[_0x29d380(0x560)]();},Game_Event['prototype']['saveEventLocation']=function(){this['_requestSaveEventLocation']=!![];},Game_Event[_0x292080(0x45b)]['updateSaveEventLocation']=function(){const _0x29fb20=_0x292080;this[_0x29fb20(0x33b)]&&this[_0x29fb20(0x4a6)]();},Game_Event['prototype'][_0x292080(0x4a6)]=function(){const _0x32d562=_0x292080;this[_0x32d562(0x33b)]=![],$gameSystem['saveEventLocation'](this);},Game_Event['prototype'][_0x292080(0x344)]=function(){const _0x29fbc5=_0x292080;$gameSystem[_0x29fbc5(0x20d)](this);},Game_Event['prototype'][_0x292080(0x17f)]=function(){const _0x3948d2=_0x292080;return $gameSystem[_0x3948d2(0x17f)](this)?Game_Character[_0x3948d2(0x45b)][_0x3948d2(0x17f)][_0x3948d2(0x46f)](this):{'iconIndex':0x0,'bufferX':settings[_0x3948d2(0x500)][_0x3948d2(0x26c)],'bufferY':settings[_0x3948d2(0x500)][_0x3948d2(0x1d8)],'blendMode':settings[_0x3948d2(0x500)][_0x3948d2(0x347)]};},Game_Event[_0x292080(0x45b)]['hasCPCs']=function(){const _0x11f2fd=_0x292080;return this[_0x11f2fd(0x476)];},VisuMZ['EventsMoveCore'][_0x292080(0x546)]=Game_Event[_0x292080(0x45b)][_0x292080(0x3e2)],Game_Event[_0x292080(0x45b)][_0x292080(0x3e2)]=function(_0x600a0a){const _0x2bafe9=_0x292080,_0x5e56ab=VisuMZ['EventsMoveCore'][_0x2bafe9(0x546)]['call'](this,_0x600a0a);if(!_0x5e56ab)return![];return this['meetsCPC'](_0x600a0a);},Game_Event[_0x292080(0x45b)][_0x292080(0x404)]=function(_0x2e5df0){const _0x14cbef=_0x292080;VisuMZ['EventsMoveCore'][_0x14cbef(0x4df)][_0x14cbef(0x576)](_0x2e5df0),this[_0x14cbef(0x476)]=_0x2e5df0[_0x14cbef(0x445)][_0x14cbef(0x1bd)]>0x0;_0x2e5df0[_0x14cbef(0x445)]===undefined&&VisuMZ[_0x14cbef(0x364)][_0x14cbef(0x4df)][_0x14cbef(0x576)](_0x2e5df0);if(_0x2e5df0[_0x14cbef(0x445)][_0x14cbef(0x1bd)]>0x0)return $gameMap[_0x14cbef(0x47f)](this[_0x14cbef(0x487)])&&VisuMZ[_0x14cbef(0x364)][_0x14cbef(0x4df)][_0x14cbef(0x381)](_0x2e5df0[_0x14cbef(0x445)],this[_0x14cbef(0x487)]);return!![];},VisuMZ[_0x292080(0x364)][_0x292080(0x17e)]=Game_Troop['prototype'][_0x292080(0x3e2)],Game_Troop['prototype']['meetsConditions']=function(_0x1486ce){const _0x31c1dc=_0x292080;var _0x4159ec=VisuMZ[_0x31c1dc(0x364)]['Game_Troop_meetsConditionsCPC']['call'](this,_0x1486ce);return _0x4159ec&&this['CPCsMet'](_0x1486ce);},Game_Troop['prototype'][_0x292080(0x395)]=function(_0x3e859c){const _0x4620f2=_0x292080;_0x3e859c[_0x4620f2(0x445)]===undefined&&VisuMZ[_0x4620f2(0x364)][_0x4620f2(0x4df)][_0x4620f2(0x576)](_0x3e859c);if(_0x3e859c['CPC'][_0x4620f2(0x1bd)]>0x0)return VisuMZ[_0x4620f2(0x364)][_0x4620f2(0x4df)][_0x4620f2(0x381)](_0x3e859c[_0x4620f2(0x445)],0x0);return!![];},VisuMZ[_0x292080(0x364)][_0x292080(0x536)]=Game_Event[_0x292080(0x45b)]['locate'],Game_Event[_0x292080(0x45b)][_0x292080(0x44c)]=function(_0x119df2,_0x834022){const _0x51b9ac=_0x292080;VisuMZ[_0x51b9ac(0x364)][_0x51b9ac(0x536)][_0x51b9ac(0x46f)](this,_0x119df2,_0x834022),this[_0x51b9ac(0x359)]=_0x119df2,this[_0x51b9ac(0x575)]=_0x834022,this['autosaveEventLocation']();},VisuMZ[_0x292080(0x364)]['Game_Event_moveTypeRandom']=Game_Event['prototype']['moveTypeRandom'],Game_Event[_0x292080(0x45b)][_0x292080(0x4de)]=function(){const _0x6c5fbd=_0x292080,_0xa3fd37=$gameMap[_0x6c5fbd(0x529)](this['x'],this['y'],this[_0x6c5fbd(0x359)],this[_0x6c5fbd(0x575)]),_0x2e2018=_0xa3fd37*(this['_randomMoveWeight']||0x0);Math['random']()>=_0x2e2018?VisuMZ[_0x6c5fbd(0x364)]['Game_Event_moveTypeRandom'][_0x6c5fbd(0x46f)](this):this[_0x6c5fbd(0x55a)]();},Game_Event[_0x292080(0x45b)][_0x292080(0x55a)]=function(){const _0x51c5bf=_0x292080,_0x3b4cec=this['deltaXFrom'](this[_0x51c5bf(0x359)]),_0x51e67e=this['deltaYFrom'](this['_randomHomeY']);if(Math[_0x51c5bf(0x3f7)](_0x3b4cec)>Math['abs'](_0x51e67e))this['moveStraight'](_0x3b4cec>0x0?0x4:0x6),!this[_0x51c5bf(0x510)]()&&_0x51e67e!==0x0&&this[_0x51c5bf(0x3c7)](_0x51e67e>0x0?0x8:0x2);else _0x51e67e!==0x0&&(this[_0x51c5bf(0x3c7)](_0x51e67e>0x0?0x8:0x2),!this['isMovementSucceeded']()&&_0x3b4cec!==0x0&&this[_0x51c5bf(0x3c7)](_0x3b4cec>0x0?0x4:0x6));},Game_CharacterBase[_0x292080(0x45b)]['clearAttachPictureSettings']=function(){const _0x30320d=_0x292080;this[_0x30320d(0x15d)]={'filename':'','blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x3c8)]=function(){const _0x3bd389=_0x292080;if(this[_0x3bd389(0x15d)]===undefined)this[_0x3bd389(0x332)]();return this[_0x3bd389(0x15d)];},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x3c0)]=function(){const _0x39ef9c=_0x292080;return this[_0x39ef9c(0x3c8)]()[_0x39ef9c(0x56b)]??'';},Game_CharacterBase[_0x292080(0x45b)]['attachPictureBlendMode']=function(){const _0x55c886=_0x292080;return this['attachPictureSettings']()[_0x55c886(0x402)]??0x0;},Game_CharacterBase[_0x292080(0x45b)][_0x292080(0x44e)]=function(){return this['attachPictureSettings']()['maxSize']??0x0;},Game_CharacterBase[_0x292080(0x45b)]['attachPictureOffsetX']=function(){const _0x173bf5=_0x292080;return this[_0x173bf5(0x3c8)]()[_0x173bf5(0x330)]??0x0;},Game_CharacterBase[_0x292080(0x45b)]['attachPictureOffsetY']=function(){const _0x37a602=_0x292080;return this[_0x37a602(0x3c8)]()[_0x37a602(0x3d7)]??0x0;},Game_CharacterBase[_0x292080(0x45b)]['attachPictureScale']=function(){const _0xcb434b=_0x292080;return this[_0xcb434b(0x3c8)]()[_0xcb434b(0x4ad)]??0x1;},VisuMZ[_0x292080(0x364)][_0x292080(0x1fb)]=Game_Interpreter[_0x292080(0x45b)][_0x292080(0x24c)],Game_Interpreter[_0x292080(0x45b)][_0x292080(0x24c)]=function(){const _0x3e885a=_0x292080;if(this[_0x3e885a(0x238)]===_0x3e885a(0x4b4)){if(window[this['_callEventMap']])this[_0x3e885a(0x238)]='',this[_0x3e885a(0x56d)]();else return!![];}else return VisuMZ[_0x3e885a(0x364)]['Game_Interpreter_updateWaitMode'][_0x3e885a(0x46f)](this);},VisuMZ[_0x292080(0x364)]['Game_Interpreter_executeCommand']=Game_Interpreter['prototype'][_0x292080(0x20f)],Game_Interpreter[_0x292080(0x45b)][_0x292080(0x20f)]=function(){const _0x257397=_0x292080,_0x26bfab=$gameMap&&this['_eventId']?$gameMap[_0x257397(0x47f)](this[_0x257397(0x487)]):null;$gameTemp[_0x257397(0x387)](_0x26bfab);const _0x47d850=VisuMZ['EventsMoveCore'][_0x257397(0x568)][_0x257397(0x46f)](this);return $gameTemp[_0x257397(0x566)](),_0x47d850;},VisuMZ[_0x292080(0x364)][_0x292080(0x2ce)]=Game_Interpreter[_0x292080(0x45b)][_0x292080(0x564)],Game_Interpreter[_0x292080(0x45b)][_0x292080(0x564)]=function(_0x27ec6f){const _0x14ef42=_0x292080;return $gameTemp[_0x14ef42(0x4ff)](this),VisuMZ[_0x14ef42(0x364)][_0x14ef42(0x2ce)][_0x14ef42(0x46f)](this,_0x27ec6f);},Game_Interpreter[_0x292080(0x45b)]['pluginCommandCallEvent']=function(_0x457cc9){const _0x15d1f1=_0x292080;this[_0x15d1f1(0x33d)]=_0x457cc9;const _0x588534=_0x15d1f1(0x145)[_0x15d1f1(0x193)](_0x457cc9[_0x15d1f1(0x51b)]['padZero'](0x3));this['_callEventMap']=_0x15d1f1(0x4c6)+Graphics[_0x15d1f1(0x18f)]+'_'+this[_0x15d1f1(0x35a)](),DataManager['loadDataFile'](this['_callEventMap'],_0x588534),window[this['_callEventMap']]?this[_0x15d1f1(0x56d)]():this[_0x15d1f1(0x1f4)]('CallEvent');},Game_Interpreter[_0x292080(0x45b)][_0x292080(0x56d)]=function(){const _0x1a178f=_0x292080,_0x358105=this[_0x1a178f(0x33d)],_0x477a67=window[this['_callEventMap']],_0x497f00=_0x477a67[_0x1a178f(0x54c)][_0x358105[_0x1a178f(0x35a)]];if(_0x497f00&&_0x497f00[_0x1a178f(0x1c0)][_0x358105[_0x1a178f(0x541)]-0x1]){const _0x4360a9=_0x497f00[_0x1a178f(0x1c0)][_0x358105[_0x1a178f(0x541)]-0x1][_0x1a178f(0x534)];this[_0x1a178f(0x148)](_0x4360a9,this['eventId']());}window[this[_0x1a178f(0x2d8)]]=undefined,this[_0x1a178f(0x2d8)]=undefined,this[_0x1a178f(0x33d)]=undefined;};function _0x2446(){const _0xe3bf26=['NUM','_eventMorphData','DIAGONAL_PATHFINDING_EVENT_LIMIT','updateStop','meetsConditions','isMapSwitch','setItemChoice','KNEEL','PostMorphJS','opacity','despawnTerrainTags','RIGHT\x20TO\x20LEFT','SpawnEventDespawnRegions','Game_Timer_start','updateVS8BalloonOffsets','_active','initEventsMoveCoreSettings','advancedFunc','clearEventCache','Passability','clearDashing','_shadowSprite','NOTE','PlayerMovementChange','updatePose','abs','none','Game_Map_setupEvents','canPassDiagonally','autoEventIconBuffer','isAirshipPassable','PreMorphJS','WalkAllow','isMoving','Sprite_Character_update','_DisablePlayerControl','blendMode','updateScale','meetsCPC','updateText','_forceCarrying','updateSaveEventLocation','splice','isSelfSwitch','horizontal\x20mirror','_selfTargetItemChoice','_cacheVisibility','erase','resetSelfSwitchesForMap','requestRefresh','_interpreter','Settings','_pose','approach','LIGHT','floor','Game_Player_checkEventTriggerThere','selfValue','EventTimerExpireClear','opacityDelta','FollowerSetTargetChase','COLLAPSE','FavorHorz','USER-DEFINED\x205','deltaX','Game_Message_setItemChoice','_selfEvent','Game_CharacterBase_screenX','isSelfVariable','ccwX','isAdvancedSwitch','setMovementSuccess','isLongPressed','processMoveSynchRandom','_lastPluginCommandInterpreter','4695soIYzk','OFF','referEvent','parameters','trim','EXCLAMATION','_activationProximity','switch2Valid','drawText','executeMove','blt','update','target','_dragonbones','onDatabaseLoaded','FollowerReset','_moveSpeed','isRegionForbidPass','Game_CharacterBase_hasStepAnime','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','setDirection','split','processMoveRouteJumpTo','Collision','PreCopyJS','Game_Message_setNumberInput','Seconds','changeSpeed','CPC','posNt','_scaleBaseX','48119amthdr','getDiagonalDestination','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','Window_Message_startMessage','locate','_forceHideFollower','attachPictureMaxSize','processMoveRouteFadeOut','%1Dock','createIconSprite','ShiftY','%1Forbid','50918549FYHIsN','isDashDisabled','bufferY','LIGHTBULB','3640028sCBGdC','EVAL','_addedHitbox','prototype','turnRight90','isPlayerForceHidden','startsWith','isEventOverloaded','round','setAllowEventAutoMovement','Game_CharacterBase_opacity','characterName','setCharacterBitmap','determineCommonEventsWithCPC','deleteIconsOnEventsData','setMoveSpeed','_eventScreenY','isDestinationValid','visible','MULTIPLY','setBalloonPose','setupEventsMoveCoreEffects','Game_Event_isCollidedWithPlayerCharacters','call','some','rotation','checkExistingEntitiesAt','Label','width','LIGHT\x20BULB','_CPCs','_saveEventLocation','fittingHeight','BitmapSmoothing','PageId','ccwY','HEART','lastSpawnedEvent','morphIntoTemplate','event','_alwaysUpdateMove','Game_Timer_onExpire','createDisplayObjects','getPose','setupEventsMoveCoreNotetags','copy','_patternLocked','_eventId','SpawnEventDespawnAtXY','DEFAULT_SHIFT_Y','Game_Interpreter_character','areFollowersForceHidden','EnableDashTilt','createShadow','character','_poseDuration','_type','Vehicle','reserveCommonEvent','description','initFollowerController','checkActivationProximity','556340vanrEW','_saveEventLocations','template','ITEM','setupPageSettings','characterIndex','SlowerSpeed','VehicleForbid','indexOf','updatePattern','Game_CharacterBase_updatePattern','processMoveRouteMoveToCharacter','setPosition','updateTilt','processMoveRouteSetIndex','toUpperCase','processSaveEventLocation','_eventOverload','reverseDir','Game_Event_event','Window_EventItem_onOk','AutoBuffer','ZZZ','scale','setupFollowerVisibilityOverrides','updateSelfMovement','EventTimerResume','clear','initEventsMoveCoreEffects','isEventTest','CallEvent','isObjectCharacter','AutoMoveEvents','startMapCommonEventOnOK','maxSize','Game_Event_initialize','Game_Player_increaseSteps','EventID','directionOnLadderSpriteVS8dir','processMoveSynchDirection','registerCommand','FRUSTRATION','findTargetSprite','isJumping','refreshEventLabels','Preserve','createSpawnedEvent','_events','$callEventMap','custom','followers','unlock','PostSpawnJS','_attachPictureSprite','RegionOkTarget','Frames','Game_Event_start','Game_Event_clearPageSettings','USER-DEFINED\x204','characterPatternY','%1:%2','setDashingEnabled','BalloonOffsetY','isPressed','toLowerCase','mainFontSize','processMoveRouteMoveUntilStop','findDiagonalDirectionTo','Player','UNTITLED','screenY','IconSize','moveTypeRandom','CustomPageConditions','VisibleRange','labelWindowText','_labelWindows','Template','processMoveRouteFadeIn','MoveAllSynchTargets','%1,','setStopFollowerChasing','TRUE','version','activationRegionList','clearDestination','timerText','_filename','of\x20Preloaded\x20Maps.\x0a\x0a','processMoveRouteStepTo','clearPose','Region','TiltVert','_randomMoveWeight','updateBitmapSmoothing','spriteId','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','spawnEventId','Region%1','processMoveRoutePatternLock','isTargetEventValidForLabelWindow','_lastAttachPictureFilename','DefaultShadow','_cpc','Scene_Boot_onDatabaseLoaded','setLastPluginCommandInterpreter','Icon','_moveSynch','forceMoveRoute','_spriteOffsetX','clearCarrying','AllForbid','_characterSprites','_eventPageIndex','eventsXy','_lastMovedDirection','MUSIC','isEventsMoveCoreInvisible','iconIndex','Game_CharacterBase_isDashing','autosaveEventLocation','_eventCache','isMovementSucceeded','Stop','despawnEverything','_expireCommonEvent','_needsRefresh','setChaseOff','Window_NumberInput_processOk','isAllowEventAutoMovement','updateParallel','dashSpeedModifier','EventLocationSave','mapId','Disable','create','processMoveCommand','StopAutoMoveMessages','Game_Timer_stop','getAttachPictureBitmapHeight','ANGER','_proxyWindow','isSpriteVS8dir','IconBufferX','processMoveSynchMirrorVert','frontY','terrainTag','distance','OffsetX','_frames','setupAttachPictureBitmap','Game_Follower_initialize','_visiblePlayerX','Game_CharacterBase_moveStraight','contentsOpacity','_selfTarget','Game_Variables_setValue','getPlayerDiagonalSetting','list','getSelfTarget','Game_Event_locate','Sprite_Character_setTileBitmap','FollowerID','includes','Game_Event_updateParallel','characterIndexVS8','setOpacity','shiftY','_characterName','Game_Switches_setValue','EventTimerPause','pageId','Game_Event_meetsConditions','PlayerIconChange','checkSmartEventCollision','processMoveRouteHugWall','Game_Event_meetsConditionsCPC','processMoveRouteMoveTo','startMessage','deleteSavedEventLocationKey','_eventIconSprite','processOk','events','_visibleEventY','setupRegionRestrictions','getInputDir8','_cacheSystemVisible','VisuMZ_2_DragonbonesUnion','column','onExpire','textSizeEx','isSupportDiagonalMovement','isBusy','anchor','MapId','VariableGetSelfVariableID','moveBackToRandomHome','mirror\x20horz','updateScaleBase','VehicleAllow','shift','isMoveOnlyRegionPassable','saveEventLocation','SpawnEventDespawnTerrainTags','moveAwayFromPoint','_forceHidePlayer','command357','Game_Map_unlockEvent','clearSelfTarget','updateEventIconSprite','Game_Interpreter_executeCommand','EventTemplates','isShadowShrink','filename','direction','startCallEvent','_characterIndex','isBigCharacter','_starting','frontX','originalText','RemovePreserve','checkEventTriggerThere','_randomHomeY','loadCPC','iconWidth','_target','updateShadowChanges','refreshBushDepth','needsAttachPictureUpdate','backX','USER-DEFINED\x201','turnAwayFromPoint','registerSelfEvent','processMoveSynch','isNearTheScreen','Rope','onLoadSuccess','Game_CharacterBase_characterIndex','isShip','updateMove','setupSaveEventLocations','isSaveEventLocations','Sprite_Balloon_updatePosition','processMoveSynchAway','setPattern','horz\x20mirror','initEventsMoveCore','RegionOk','despawnEventId','fontFace','isPassable','Game_Map_refresh','Game_Player_checkEventTriggerHere','isPassableByAnyDirection','drawTextEx','resetExitSelfSwitches','removeChild','max','Self\x20Switch\x20%1','_clickTrigger','TiltRight','Scene_Load_onLoadSuccess','checkValidEventerMap','setDestination','Map%1.json','clearStepPattern','MapSwitches','setupChild','variableId','processMoveSynchMimic','setMapValue','_erased','46NRRPgK','MUSICNOTE','Sprite_Balloon_setup','moveAwayFromCharacter','setDiagonalDirection','Game_Follower_chaseCharacter','resetSelfSwitchesForEvent','Self\x20Variable\x20%1','_scaleBaseY','reverse\x20mimic','roundYWithDirection','_comments','setFrame','1755224CKKfEB','deletePreservedMorphEventDataKey','TiltLeft','_attachPicture','attachPictureBlendMode','isActive','roundY','getLastPluginCommandInterpreter','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','region','SWEAT','Game_Temp_setDestination','charAt','updateAttachPictureSprite','isBattleTest','PosX','shadowFilename','concat','parallelCommonEvents','NORMAL','ARRAYEVAL','updateVisibility','FontSize','OffsetY','isWorking','match','ARRAYSTRUCT','processMoveRouteStepToCharacter','Game_Event_checkEventTriggerAuto','executeCommandCommonEvent','processMoveRouteAnimation','labelWindowRange','EventLocationCreate','isPosing','Step2EventId','initMembersEventsMoveCore','Game_Troop_meetsConditionsCPC','getEventIconData','isRunning','_advancedSwitchVariable','addLoadListener','Window_ScrollText_startMessage','findProperPageIndex','roundX','needsUpdate','Game_Variables_value','checkCollisionKeywords','follower','deltaYFrom','COBWEB','checkNeedForPeriodicRefresh','getPosingCharacterPattern','SpriteBased','frameCount','moveRouteIndex','refresh','canPass','format','EventTimerFramesSet','vehicle','EnableTurnInPlace','Hidden','LEFT\x20TO\x20RIGHT','SCREEN','firstSpawnedEventID','Walk','WalkForbid','areFollowersForceShown','ShowShadows','_realX','Game_Map_events','Game_CharacterBase_initMembers','isMapPassable','_followerChaseOff','checkAdvancedSwitchVariablePresent','_vehicleType','delay','getInputDirection','radius','isPreventSelfMovement','stop','Game_CharacterBase_setDirection','AdvancedVariables','setEventIconDataKey','createShadows','constructor','vert\x20mirror','vertical\x20mirror','_duration','visibleRange','_needsPeriodicRefresh','map','_encounterEffectDuration','addChild','attachPictureOffsetY','Game_CharacterBase_increaseSteps','isValid','TerrainTags','text','length','resume','_shadowGraphic','pages','processMoveRouteSelfVariable','processMoveRouteSelfSwitch','_paused','Toggle','moveForward','Game_Event_updateSelfMovement','MapID','absDistance','createBitmap','pos','defaultFontSize','convertVariableValuesInScriptCall','down','pluginCommandCallEvent','isVisible','clearSpriteOffsets','isSceneMap','Game_CharacterBase_realMoveSpeed','loadSystem','Letter','BULB','apply','onCancel','BufferY','boxWidth','Step1MapId','executeCommonEvent','USER-DEFINED\x203','turnAwayFromCharacter','Game_CharacterBase_screenY','Game_SelfSwitches_value','moveSynchTarget','isDashingAndMoving','Map%1-Event%2','SuccessSwitchId','jumpAll','lastMovedDirection','SPIN\x20CLOCKWISE','variableValid','$preloadedMap_%1','fontSize','isPlayerControlDisabled','Game_Message_add','Movement','5142VKHPvT','meetActivationRegionConditions','setupPlayerVisibilityOverrides','drawIcon','SelfSwitchID','away','setupMorphEvent','setWaitMode','isStopFollowerChasing','_forceShowPlayer','meetActivationProximityConditions','DashingEnable','isLabelVisible','advancedValue','Game_Interpreter_updateWaitMode','onOk','processMoveRouteBalloon','Game_CharacterBase_isTransparent','pattern','startMapCommonEventOnTouch','boat','isOnRope','setupDiagonalSupport','hasDragonbones','AutoBalloon','morphInto','_eventIcon','LOWER\x20LEFT','_moveAllowPlayerCollision','resetFontSettings','switches','Name','deleteSavedEventLocation','moveTowardPoint','executeCommand','mimic','updateEventLabelText','EventLabelVisible','updateOpacity','despawnAtXY','FollowerSetControl','destinationX','setSelfValue','padZero','_eventErased','LEFT','updatePosition','getControlledFollowerID','VariableId','%1DockRegionOnly','Game_Enemy_meetsSwitchCondition','characterPatternYBasic','_activationProximityAutoTriggerBypass','savePreservedMorphEventDataKey','firstSpawnedEvent','isDashingEnabled','_mapId','value','isTurnInPlace','GetMoveSynchTarget','_lastAttachPictureMaxSize','VS8','checkEventTriggerEventsMoveCore','setNumberInput','shadowY','Game_Event_update','createAttachPictureSprite','status','characterPatternYVS8','_visibleEventX','_moveOnlyRegions','updateShadow','parse','_inputTime','processMoveRouteJumpForward','_waitMode','dir8','RegionTouch','setupCopyEvent','MUSIC\x20NOTE','Map\x20%1\x20Switch\x20%2','setCommonEvent','jump','_EventIcons','outlineColor','_lastMapId','hasClickTrigger','restoreSavedEventPosition','isEventClickTriggered','requestAnimation','Allow','679626NtVAnf','243ZuccCr','isEventRunning','Window_NumberInput_start','updateWaitMode','isOnLadder','SelfVariables','name','Window_EventItem_onCancel','DashModifier','isDiagonalDirection','_stepPattern','isRegionAllowPass','Scene_Map_createDisplayObjects','switch1Valid','initMoveSpeed','isMapVariable','SPIN\x20ANTICLOCKWISE','HURT','Visibility','canStartLocalEvents','TargetVariableId','_opacity','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','processMoveSynchReverseMimic','destinationY','innerWidth','isEmptyCharacter','removeMorph','IconBufferY','isAirship','getDirectionToPoint','start','updateEventCustomZ','iconHeight','Button','BufferX','_diagonalSupport','SelfDataResetAll','createLowerLayer','setPlayerDiagonalSetting','ARRAYSTR','turnLeft90','isAnyEventStarting','updateMoveSynch','randomInt','setControlledFollowerID','switch1Id','processMoveRouteJumpToCharacter','mirror\x20vert','ship','isBoat','gainFrames','log','Game_Event_setupPageSettings','convertSelfVariableValuesInScriptCall','HMPH','execute','findDirectionTo','isTile','Game_Map_parallelCommonEvents','isPlaytest','Game_Player_executeMove','Game_Character_processMoveCommand','lineHeight','getMapSpawnedEventData','isTransparent','DiagonalSpeedMultiplier','_scene','initMembers','updateEventsAndMovementCore','makeDeepCopy','Spriteset_Map_createShadow','processMoveRouteStepFrom','activationProximityType','setupEvents','_spawnPreserved','LOVE','Scene_Map_startEncounterEffect','Game_Switches_value','startEncounterEffect','STRUCT','airship','Game_System_initialize','updatePatternEventsMoveCore','StrictCollision','chaseCharacter','code','isInVehicle','type','smooth','IconBlendMode','Operation','bitmap','_reflection','AirshipSpeed','_eventOverloadThreshold','disable','_labelWindow','posEventsMoveCore','correctFacingDirection','_speed','zoomScale','createProxyWindow','createSpawnedEventWithData','_eventSpawnData','Visible','_character','player','setFrames','createCharacterShadow','SILENCE','PreloadedMaps','_spriteset','bind','setEventIconData','_scaleX','add','ConvertParams','49UuiIwF','_actuallyMoving','hasEventIcon','_spawnData','Game_CharacterBase_direction','DashEnableToggle','clamp','string','isAutoBufferIcon','increaseSteps','isTriggerIn','activationProximityDistance','isAdvancedVariable','checkEventsMoveCoreStringTags','forceDashing','Game_Interpreter_PluginCommand','EventTimerSpeed','Boat','updateEventsMoveCoreTagChanges','moveSynchType','List','Game_Followers_jumpAll','_realY','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','updatePeriodicRefresh','_callEventMap','PlayerMovementDiagonal','executeMoveDir8','switchId','Hours','Game_Event_findProperPageIndex','UPPER\x20LEFT','MapVariables','windowPadding','processMoveSynchMirrorHorz','move','eventsXyNt','roundXWithDirection','PlayerIconDelete','Airship','deltaXFrom','padding','unlockEvent','height','Game_CharacterBase_update','_PlayerDiagonalSetting','hideShadows','loadDataFile','VisuMZ_Setup_Preload_Map','Game_Map_setup','opacitySpeed','TerrainTag','note','RIGHT','cwX','SelfSwitches','Game_Timer_initialize','EventLocationDelete','regionId','isDashing','Game_Troop_meetsConditions','UPPER\x20RIGHT','drawing','Minutes','isNormalPriority','_eventScreenX','row','Game_Player_isDashing','_counter','_text','setTileBitmap','_forceDashing','_selfTargetNumberInput','shadowX','updateAttachPictureBitmap','mirror\x20horizontal','Game_Vehicle_isMapPassable','_eventCopyData','JSON','_regionRules','command108','getSavedEventLocation','TargetSwitchId','_tilemap','isShadowVisible','isAllowCharacterTilt','trigger','setupSpawnedEvents','Game_CharacterBase_pattern','IconSet','PreloadMaps','processMoveSynchApproach','isLandOk','_forceShowFollower','startMapCommonEventOnOKTarget','VisuMZ_0_CoreEngine','isCollidedWithEvents','deleteIconsOnEventsDataKey','Game_Map_update','standing','_followerControlID','regionList','turnTowardCharacter','VehicleDock','Value','prepareSpawnedEventAtXY','updateMoveSynchDirection','SLEEP','EventLabelRefresh','filter','EventForbid','ANNOYED','_customZ','offsetX','_mirrorSprite','clearAttachPictureSettings','initialize','SwitchGetSelfSwitchID','Ship','getDirectionFromPoint','FollowerSetGlobalChase','Enable','onClickTrigger','QUESTION','_requestSaveEventLocation','_moveRoute','_callEventData','LOWER\x20RIGHT','_spawnedEvents','process_VisuMZ_EventsMoveCore_Switches_Variables','isSmartEventCollisionOn','hasMoveOnlyRegions','Game_SelfSwitches_setValue','deleteEventLocation','square','screenX','BlendMode','SwitchId','useCarryPoseForIcons','FastForwardKey','VisibleEventLabels','getEventIconIndex','moveDiagonally','_working','Dock','FUNC','adjustDir8MovementSpeed','SpawnEventAtRegion','return\x200','random','contents','SPIN\x20ACW','default','setupSpawn','_randomHomeX','eventId','determineEventOverload','isSaveEventLocation','updateEventMirrorSprite','removeTemporaryMapSpawnedEvents','_spriteOffsetY','%1%2','spawnPreserved','isSpawnedEvent','loadPicture','EventsMoveCore','processMoveRouteMoveRepeat','setup','Step1EventId','setValue','VICTORY','adjustMoveSynchOpacityDelta','_isObjectCharacter','meetsSwitchCondition','resizeWindow','Game_Vehicle_initMoveSpeed','moveTowardCharacter','SelfSwitchABCD','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','right','MessageCore','_seconds','Game_Map_event','Speed','isSpawnHitboxCollisionOk','PreSpawnJS','_scaleY','getPosingCharacterIndex','_lastAttachPictureScale','left','getPosingCharacterDirection','MorphEventRemove','_MapSpawnedEventData','mapValue','metCPC','createSaveEventLocationData','General','IconIndex','hasCPCs','_EventsMoveCoreSettings','registerSelfTarget','_moveRouteIndex','OperateValues','FaceSynchAllSynchTargets','moveByInput','checkRegionEventTrigger','Game_CharacterBase_moveDiagonally','ADDITIVE','EventAutoMovement','despawnRegions','_periodicRefreshTimer','min','TurnInPlaceDelay','BalloonOffsetX','CPCsMet','refreshIfNeeded','slice','_screenZoomScale','_trigger','_commonEvents','_visiblePlayerY','replace','exit','iconSize','Game_Map_isDashDisabled','_event','Game_Vehicle_isLandOk','ARRAYNUM','checkEventTriggerAuto','TemplateName','Game_CharacterBase_canPass','enable','Sprite_Character_setCharacterBitmap','createLabelWindowForTarget','EventId','prepareSpawnedEventAtRegion','reverse\x20copy','_PreservedEventMorphData','ALLOW_LADDER_DASH','processMoveRouteTeleportTo','itemPadding','setMoveRoute','_stopCount','prepareSpawnedEventAtTerrainTag','_chaseOff','CommonEventID','turnTowardPoint','_SavedEventLocations','keys','realMoveSpeed','AdvancedSwitches','lastSpawnedEventID','checkEventTriggerHere','Game_Character_setMoveRoute','hasStepAnime','_pageIndex','ROUTE_SCRIPT','attachPictureFilename','isRegionDockable','Chase','USER-DEFINED\x202','_pattern','Sprite_Character_initMembers','timer','moveStraight','attachPictureSettings','_data','hasAdvancedSwitchVariable','onLoadAttachPicture','Spriteset_Map_createLowerLayer','variables','setEventLabelsVisible','Event','Game_Player_getInputDirection','Game_Player_isMapPassable','createLabelWindows','attachPictureOffsetX','processMoveSynchCustom','ShipSpeed','Step2MapId','offsetY','EventAllow','EventIconChange','Map\x20%1\x20Variable\x20%2','eventLabelsVisible','setPose','push'];_0x2446=function(){return _0xe3bf26;};return _0x2446();}function Game_CPCInterpreter(){const _0x3b2bdb=_0x292080;this['initialize'][_0x3b2bdb(0x1d6)](this,arguments);};Game_CPCInterpreter['prototype']=Object[_0x292080(0x51d)](Game_Interpreter['prototype']),Game_CPCInterpreter[_0x292080(0x45b)][_0x292080(0x1af)]=Game_CPCInterpreter,Game_CPCInterpreter[_0x292080(0x45b)][_0x292080(0x4b1)]=function(){const _0x2b0b71=_0x292080;Game_Interpreter[_0x2b0b71(0x45b)][_0x2b0b71(0x4b1)][_0x2b0b71(0x46f)](this),this['_cpc']=![];},Game_CPCInterpreter[_0x292080(0x45b)][_0x292080(0x281)]=function(){const _0x11f602=_0x292080;while(this[_0x11f602(0x180)]()){this[_0x11f602(0x20f)]();}},Game_CPCInterpreter[_0x292080(0x45b)][_0x292080(0x1db)]=function(_0xfdb3af){while(this['isRunning']()){this['executeCommandCommonEvent'](_0xfdb3af);}},Game_CPCInterpreter[_0x292080(0x45b)][_0x292080(0x177)]=function(_0x625329){const _0x297077=_0x292080,_0x116533=_0x625329;$gameTemp[_0x297077(0x387)](_0x116533);const _0x204303=VisuMZ['EventsMoveCore'][_0x297077(0x568)]['call'](this);return $gameTemp[_0x297077(0x566)](),_0x204303;},Game_CPCInterpreter[_0x292080(0x45b)][_0x292080(0x30f)]=function(_0x4abd5e){const _0x384aba=_0x292080;return Game_Interpreter['prototype']['command108'][_0x384aba(0x46f)](this,_0x4abd5e),this[_0x384aba(0x158)][_0x384aba(0x470)](_0x1352c7=>_0x1352c7[_0x384aba(0x173)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x384aba(0x4fd)]=!![]),!![];},VisuMZ[_0x292080(0x364)][_0x292080(0x296)]=Scene_Map['prototype'][_0x292080(0x298)],Scene_Map[_0x292080(0x45b)][_0x292080(0x298)]=function(){const _0xcd206b=_0x292080;VisuMZ[_0xcd206b(0x364)][_0xcd206b(0x296)][_0xcd206b(0x46f)](this),this['_spriteset'][_0xcd206b(0x2ed)]();},VisuMZ['EventsMoveCore'][_0x292080(0x142)]=Scene_Load[_0x292080(0x45b)][_0x292080(0x129)],Scene_Load[_0x292080(0x45b)][_0x292080(0x129)]=function(){const _0x5cd775=_0x292080;if($gameMap)$gameMap['clearEventCache']();VisuMZ[_0x5cd775(0x364)][_0x5cd775(0x142)][_0x5cd775(0x46f)](this);},VisuMZ['EventsMoveCore']['Sprite_Character_initMembers']=Sprite_Character['prototype'][_0x292080(0x28d)],Sprite_Character['prototype'][_0x292080(0x28d)]=function(){const _0x2ce708=_0x292080;VisuMZ['EventsMoveCore'][_0x2ce708(0x3c5)][_0x2ce708(0x46f)](this),this[_0x2ce708(0x17d)](),this['createAttachPictureSprite'](),this['createIconSprite']();},Sprite_Character['prototype'][_0x292080(0x17d)]=function(){this['_shadowOpacity']=0xff;},Sprite_Character['prototype'][_0x292080(0x22f)]=function(){const _0x63490c=_0x292080;this['_attachPictureSprite']=new Sprite(),this[_0x63490c(0x4cb)][_0x63490c(0x557)]['x']=0.5,this[_0x63490c(0x4cb)]['anchor']['y']=0x1,this[_0x63490c(0x1b7)](this[_0x63490c(0x4cb)]),this[_0x63490c(0x167)]();},Sprite_Character[_0x292080(0x45b)][_0x292080(0x451)]=function(){const _0x22276d=_0x292080;this[_0x22276d(0x54a)]=new Sprite(),this[_0x22276d(0x54a)][_0x22276d(0x2a5)]=ImageManager['loadSystem'](_0x22276d(0x318)),this[_0x22276d(0x54a)][_0x22276d(0x2a5)]['smooth']=![],this[_0x22276d(0x54a)][_0x22276d(0x159)](0x0,0x0,0x0,0x0),this['_eventIconSprite'][_0x22276d(0x557)]['x']=0.5,this['_eventIconSprite'][_0x22276d(0x557)]['y']=0x1,this[_0x22276d(0x1b7)](this[_0x22276d(0x54a)]);},Sprite_Character[_0x292080(0x45b)][_0x292080(0x524)]=function(){const _0x1679a1=_0x292080;return this['_characterName']&&this['_characterName'][_0x1679a1(0x173)](/\[VS8\]/i);},Sprite_Character[_0x292080(0x45b)][_0x292080(0x2c7)]=function(){const _0x2e40bf=_0x292080;return this['isSpriteVS8dir']()&&VisuMZ[_0x2e40bf(0x364)][_0x2e40bf(0x411)][_0x2e40bf(0x22a)][_0x2e40bf(0x4ab)];},VisuMZ[_0x292080(0x364)][_0x292080(0x400)]=Sprite_Character[_0x292080(0x45b)][_0x292080(0x434)],Sprite_Character[_0x292080(0x45b)][_0x292080(0x434)]=function(){const _0x33315e=_0x292080;VisuMZ[_0x33315e(0x364)][_0x33315e(0x400)][_0x33315e(0x46f)](this),this['updateEventsAndMovementCore']();},Sprite_Character[_0x292080(0x45b)]['updateVisibility']=function(){const _0x58ade5=_0x292080;Sprite['prototype'][_0x58ade5(0x16f)]['call'](this),this[_0x58ade5(0x50b)]()&&(this[_0x58ade5(0x46a)]=![]);},Sprite_Character['prototype']['isEventsMoveCoreInvisible']=function(){const _0x45ad5f=_0x292080;if(this[_0x45ad5f(0x34c)]()>0x0)return![];if(this[_0x45ad5f(0x2b3)]){if(this[_0x45ad5f(0x2b3)]['attachPictureFilename']()!=='')return![];}return this[_0x45ad5f(0x263)]()||this[_0x45ad5f(0x2b3)]&&this[_0x45ad5f(0x2b3)][_0x45ad5f(0x28a)]();},Sprite_Character[_0x292080(0x45b)][_0x292080(0x28e)]=function(){const _0x4c6973=_0x292080;this[_0x4c6973(0x55c)](),this[_0x4c6973(0x4a3)](),this[_0x4c6973(0x234)](),this[_0x4c6973(0x567)](),this[_0x4c6973(0x269)](),this[_0x4c6973(0x35d)](),this[_0x4c6973(0x167)]();},VisuMZ[_0x292080(0x364)]['Sprite_Character_setTileBitmap']=Sprite_Character['prototype'][_0x292080(0x305)],Sprite_Character['prototype'][_0x292080(0x305)]=function(){const _0x41f314=_0x292080;VisuMZ[_0x41f314(0x364)][_0x41f314(0x537)]['call'](this),this[_0x41f314(0x2a5)][_0x41f314(0x182)](this[_0x41f314(0x4f4)][_0x41f314(0x2ba)](this));},VisuMZ[_0x292080(0x364)][_0x292080(0x3a7)]=Sprite_Character[_0x292080(0x45b)][_0x292080(0x464)],Sprite_Character[_0x292080(0x45b)][_0x292080(0x464)]=function(){const _0x2ee7fd=_0x292080;VisuMZ[_0x2ee7fd(0x364)][_0x2ee7fd(0x3a7)]['call'](this),this[_0x2ee7fd(0x2a5)][_0x2ee7fd(0x182)](this['updateBitmapSmoothing'][_0x2ee7fd(0x2ba)](this));},Sprite_Character['prototype']['updateBitmapSmoothing']=function(){const _0x5bbdc7=_0x292080;if(!this['bitmap'])return;this[_0x5bbdc7(0x2a5)][_0x5bbdc7(0x2a2)]=!!VisuMZ[_0x5bbdc7(0x364)]['Settings'][_0x5bbdc7(0x1ec)][_0x5bbdc7(0x479)];},VisuMZ['EventsMoveCore']['Sprite_Character_characterPatternY']=Sprite_Character[_0x292080(0x45b)][_0x292080(0x4d1)],Sprite_Character[_0x292080(0x45b)][_0x292080(0x4d1)]=function(){const _0x28d7ff=_0x292080;return this[_0x28d7ff(0x524)]()?this[_0x28d7ff(0x231)]():this[_0x28d7ff(0x220)]();},Sprite_Character['prototype'][_0x292080(0x231)]=function(){const _0x51584f=_0x292080,_0x2e1c7a=this[_0x51584f(0x2b3)][_0x51584f(0x56c)]();let _0x5080e9=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this[_0x51584f(0x2b3)][_0x51584f(0x331)]&&(_0x5080e9=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x5080e9[_0x2e1c7a]-0x2)/0x2;},Sprite_Character[_0x292080(0x45b)][_0x292080(0x220)]=function(){const _0x17d6ce=_0x292080;let _0x177675=this[_0x17d6ce(0x2b3)][_0x17d6ce(0x56c)]();if(this[_0x17d6ce(0x2b3)][_0x17d6ce(0x331)]){if(_0x177675===0x4)_0x177675=0x6;else _0x177675===0x6&&(_0x177675=0x4);}return(_0x177675-0x2)/0x2;},Sprite_Character[_0x292080(0x45b)][_0x292080(0x55c)]=function(){const _0x18ee64=_0x292080;this[_0x18ee64(0x4ad)]['x']=this[_0x18ee64(0x2b3)][_0x18ee64(0x2bc)],this[_0x18ee64(0x4ad)]['y']=this[_0x18ee64(0x2b3)][_0x18ee64(0x379)];},Sprite_Character[_0x292080(0x45b)]['updateTilt']=function(){const _0x5b1822=_0x292080;if(!VisuMZ[_0x5b1822(0x364)][_0x5b1822(0x411)][_0x5b1822(0x1ec)][_0x5b1822(0x48c)])return;this[_0x5b1822(0x471)]=0x0;if(this[_0x5b1822(0x314)]()){const _0x44ed27=VisuMZ['EventsMoveCore'][_0x5b1822(0x411)][_0x5b1822(0x1ec)],_0x422388=this['_character']['direction']();let _0x51bf7f=0x0;if([0x1,0x4,0x7][_0x5b1822(0x539)](_0x422388))_0x51bf7f=_0x44ed27[_0x5b1822(0x15c)];if([0x3,0x6,0x9][_0x5b1822(0x539)](_0x422388))_0x51bf7f=_0x44ed27[_0x5b1822(0x141)];[0x2,0x8][_0x5b1822(0x539)](_0x422388)&&(_0x51bf7f=[-_0x44ed27['TiltVert'],0x0,_0x44ed27[_0x5b1822(0x4f2)]][this[_0x5b1822(0x2b3)]['pattern']()]);if(this[_0x5b1822(0x2a6)])_0x51bf7f*=-0x1;this[_0x5b1822(0x471)]=_0x51bf7f;}},Sprite_Character[_0x292080(0x45b)][_0x292080(0x314)]=function(){const _0x5c072a=_0x292080;if(this[_0x5c072a(0x436)])return![];return this[_0x5c072a(0x2b3)]['isDashingAndMoving']()&&!this[_0x5c072a(0x2b3)][_0x5c072a(0x24d)]()&&!this['_character'][_0x5c072a(0x17b)]()&&this['getEventIconIndex']()===0x0;},Sprite_Character[_0x292080(0x45b)][_0x292080(0x234)]=function(){const _0x4604b1=_0x292080;if(!this[_0x4604b1(0x3f3)])return;this[_0x4604b1(0x3f3)]['x']=this[_0x4604b1(0x2b3)][_0x4604b1(0x308)](),this[_0x4604b1(0x3f3)]['y']=this[_0x4604b1(0x2b3)][_0x4604b1(0x22d)](),this[_0x4604b1(0x3f3)][_0x4604b1(0x3e7)]=this[_0x4604b1(0x3e7)],this[_0x4604b1(0x3f3)][_0x4604b1(0x46a)]=this[_0x4604b1(0x2b3)][_0x4604b1(0x313)](),this['_shadowSprite']['_hidden']=this['_hidden'];if(this['_character']['isShadowShrink']())this[_0x4604b1(0x3f3)][_0x4604b1(0x4ad)]['x']=Math['max'](0x0,this[_0x4604b1(0x3f3)][_0x4604b1(0x4ad)]['x']-0.1),this[_0x4604b1(0x3f3)][_0x4604b1(0x4ad)]['y']=Math[_0x4604b1(0x13e)](0x0,this[_0x4604b1(0x3f3)]['scale']['y']-0.1);else{if(this['_shadowSprite'][_0x4604b1(0x4ad)]['x']!==this['scale']['x']){if(this[_0x4604b1(0x3f3)][_0x4604b1(0x4ad)]['x']>this[_0x4604b1(0x4ad)]['x'])this['_shadowSprite'][_0x4604b1(0x4ad)]['x']=Math[_0x4604b1(0x392)](this[_0x4604b1(0x3f3)][_0x4604b1(0x4ad)]['x']+0.1,this[_0x4604b1(0x4ad)]['x']);if(this['_shadowSprite'][_0x4604b1(0x4ad)]['x']<this[_0x4604b1(0x4ad)]['x'])this[_0x4604b1(0x3f3)]['scale']['x']=Math[_0x4604b1(0x13e)](this['_shadowSprite'][_0x4604b1(0x4ad)]['x']-0.1,this[_0x4604b1(0x4ad)]['x']);}if(this[_0x4604b1(0x3f3)][_0x4604b1(0x4ad)]['y']!==this['scale']['y']){if(this[_0x4604b1(0x3f3)][_0x4604b1(0x4ad)]['y']>this[_0x4604b1(0x4ad)]['y'])this[_0x4604b1(0x3f3)]['scale']['y']=Math['min'](this[_0x4604b1(0x3f3)]['scale']['y']+0.1,this[_0x4604b1(0x4ad)]['y']);if(this['_shadowSprite'][_0x4604b1(0x4ad)]['y']<this['scale']['y'])this['_shadowSprite'][_0x4604b1(0x4ad)]['y']=Math['max'](this[_0x4604b1(0x3f3)][_0x4604b1(0x4ad)]['y']-0.1,this['scale']['y']);}}},Sprite_Character[_0x292080(0x45b)][_0x292080(0x567)]=function(){const _0x422697=_0x292080;if(!this[_0x422697(0x54a)])return;const _0x1e9fc3=this['_eventIconSprite'],_0x11dd4b=this[_0x422697(0x34c)]();if(_0x11dd4b<=0x0)return _0x1e9fc3[_0x422697(0x159)](0x0,0x0,0x0,0x0);else{const _0x1ef0fb=ImageManager['iconWidth'],_0x4faafa=ImageManager[_0x422697(0x26a)],_0x28ad03=_0x11dd4b%0x10*_0x1ef0fb,_0x1e5afc=Math[_0x422697(0x415)](_0x11dd4b/0x10)*_0x4faafa;_0x1e9fc3['setFrame'](_0x28ad03,_0x1e5afc,_0x1ef0fb,_0x4faafa),this[_0x422697(0x46a)]=!![];}const _0x14dc59=this['_character'][_0x422697(0x17f)]();this[_0x422697(0x2c7)]()?this['autoEventIconBuffer'](_0x1e9fc3):(_0x1e9fc3['x']=_0x14dc59?_0x14dc59['bufferX']:0x0,_0x1e9fc3['y']=_0x14dc59?-this[_0x422697(0x2ea)]+_0x14dc59[_0x422697(0x456)]:0x0),_0x1e9fc3[_0x422697(0x402)]=_0x14dc59?_0x14dc59[_0x422697(0x402)]:0x0,this['removeChild'](_0x1e9fc3),this[_0x422697(0x1b7)](_0x1e9fc3),_0x1e9fc3[_0x422697(0x471)]=-this[_0x422697(0x471)];},Sprite_Character[_0x292080(0x45b)][_0x292080(0x269)]=function(){const _0x181f81=_0x292080;if(!this[_0x181f81(0x2b3)])return;if(this['_character']['_customZ']===undefined)return;if(this[_0x181f81(0x2b3)]['_customZ']===![])return;this['z']=this[_0x181f81(0x2b3)]['_customZ'],this['z']<0x0?this[_0x181f81(0x3f3)]['z']=this['z']-0x1:this[_0x181f81(0x3f3)]['z']=0x0;},Sprite_Character[_0x292080(0x45b)][_0x292080(0x35d)]=function(){const _0x650eb7=_0x292080;if(!this['_character'])return;let _0x3f945d=!!this[_0x650eb7(0x2b3)][_0x650eb7(0x331)];this[_0x650eb7(0x4ad)]['x']=Math['abs'](this[_0x650eb7(0x4ad)]['x'])*(_0x3f945d?-0x1:0x1);},Sprite_Character[_0x292080(0x45b)][_0x292080(0x3fb)]=function(_0x40e1e6){const _0x261106=_0x292080;_0x40e1e6['x']=0x0,_0x40e1e6['y']=-this['height']+this[_0x261106(0x2ea)]*0x2/0x5,this[_0x261106(0x2b3)]['pattern']()!==0x1&&(_0x40e1e6['y']+=0x1);},Sprite_Character[_0x292080(0x45b)][_0x292080(0x34c)]=function(){const _0x4581c1=_0x292080;if(!this[_0x4581c1(0x2b3)])return 0x0;if(this[_0x4581c1(0x2b3)][_0x4581c1(0x14c)])return 0x0;const _0x487240=this[_0x4581c1(0x2b3)][_0x4581c1(0x17f)]();return _0x487240?_0x487240[_0x4581c1(0x50c)]||0x0:0x0;},Sprite_Character[_0x292080(0x45b)][_0x292080(0x167)]=function(){const _0x39411d=_0x292080;if(!this['_attachPictureSprite'])return;if(!this['_character'])return;this['setupAttachPictureBitmap'](),this[_0x39411d(0x309)]();},Sprite_Character[_0x292080(0x45b)][_0x292080(0x52c)]=function(){const _0x3fde41=_0x292080;if(!this[_0x3fde41(0x57b)]())return;const _0x460245=this[_0x3fde41(0x2b3)][_0x3fde41(0x3c8)]();this[_0x3fde41(0x4fb)]=_0x460245[_0x3fde41(0x56b)],this[_0x3fde41(0x229)]=_0x460245[_0x3fde41(0x4b8)],this[_0x3fde41(0x37b)]=_0x460245[_0x3fde41(0x4ad)];if(_0x460245[_0x3fde41(0x56b)]!==''){const _0x32a93e=ImageManager[_0x3fde41(0x363)](_0x460245[_0x3fde41(0x56b)]);_0x32a93e[_0x3fde41(0x182)](this[_0x3fde41(0x3cb)]['bind'](this,_0x32a93e));}else this[_0x3fde41(0x4cb)][_0x3fde41(0x2a5)]=new Bitmap(0x1,0x1);},Sprite_Character[_0x292080(0x45b)]['updateAttachPictureBitmap']=function(){const _0x1a484f=_0x292080,_0x355f91=this['_attachPictureSprite'];_0x355f91['x']=this[_0x1a484f(0x2b3)][_0x1a484f(0x3d3)](),_0x355f91['y']=this['_character'][_0x1a484f(0x1b8)](),_0x355f91[_0x1a484f(0x402)]=this[_0x1a484f(0x2b3)][_0x1a484f(0x15e)]();},Sprite_Character[_0x292080(0x45b)][_0x292080(0x57b)]=function(){const _0x34f7a2=_0x292080,_0x4d0e16=this[_0x34f7a2(0x2b3)][_0x34f7a2(0x3c8)]();if(_0x4d0e16){if(this[_0x34f7a2(0x4fb)]!==_0x4d0e16[_0x34f7a2(0x56b)])return!![];if(this['_lastAttachPictureMaxSize']!==_0x4d0e16[_0x34f7a2(0x4b8)])return!![];if(this['_lastAttachPictureScale']!==_0x4d0e16[_0x34f7a2(0x4ad)])return!![];}return![];},Sprite_Character[_0x292080(0x45b)]['onLoadAttachPicture']=function(_0x397e8b){const _0x59f704=_0x292080,_0x4e6b1f=this[_0x59f704(0x4cb)];_0x4e6b1f[_0x59f704(0x2a5)]=_0x397e8b;const _0x4bfd8b=this[_0x59f704(0x2b3)][_0x59f704(0x3c8)](),_0x317447=_0x4bfd8b[_0x59f704(0x4b8)],_0x4a8dba=_0x4bfd8b[_0x59f704(0x4ad)];let _0x33eb5b=0x1;if(_0x317447>0x0){let _0x3514f3=this['getAttachPictureBitmapWidth']()||0x1,_0x32f68c=this[_0x59f704(0x521)]()||0x1;const _0x3544d6=Math[_0x59f704(0x13e)](0x1,_0x3514f3,_0x32f68c);_0x33eb5b=_0x317447/_0x3544d6;}_0x33eb5b*=_0x4a8dba,_0x33eb5b!==0x1&&(this[_0x59f704(0x4cb)][_0x59f704(0x2a5)][_0x59f704(0x2a2)]=!![]),_0x4e6b1f[_0x59f704(0x4ad)]['x']=_0x33eb5b,_0x4e6b1f[_0x59f704(0x4ad)]['y']=_0x33eb5b,this[_0x59f704(0x46a)]=!![],this[_0x59f704(0x309)]();},Sprite_Character[_0x292080(0x45b)]['getAttachPictureBitmapWidth']=function(){const _0x5f52eb=_0x292080,_0x15456d=this[_0x5f52eb(0x4cb)];if(!_0x15456d)return 0x0;return _0x15456d[_0x5f52eb(0x2a5)][_0x5f52eb(0x474)];},Sprite_Character[_0x292080(0x45b)][_0x292080(0x521)]=function(){const _0x5d0355=_0x292080,_0x4e2f25=this[_0x5d0355(0x4cb)];if(!_0x4e2f25)return 0x0;return _0x4e2f25[_0x5d0355(0x2a5)][_0x5d0355(0x2ea)];},VisuMZ['EventsMoveCore'][_0x292080(0x14f)]=Sprite_Balloon['prototype'][_0x292080(0x366)],Sprite_Balloon[_0x292080(0x45b)]['setup']=function(_0x5ba838,_0x4e647d){const _0x51008c=_0x292080;VisuMZ[_0x51008c(0x364)][_0x51008c(0x14f)][_0x51008c(0x46f)](this,_0x5ba838,_0x4e647d),VisuMZ[_0x51008c(0x364)][_0x51008c(0x411)][_0x51008c(0x22a)][_0x51008c(0x205)]&&this[_0x51008c(0x578)]['_character']['setBalloonPose'](_0x4e647d,this[_0x51008c(0x1b2)]);},VisuMZ[_0x292080(0x364)][_0x292080(0x12f)]=Sprite_Balloon[_0x292080(0x45b)]['updatePosition'],Sprite_Balloon['prototype'][_0x292080(0x21b)]=function(){const _0xb30d76=_0x292080;VisuMZ[_0xb30d76(0x364)]['Sprite_Balloon_updatePosition'][_0xb30d76(0x46f)](this),this[_0xb30d76(0x3ec)]();},Sprite_Balloon[_0x292080(0x45b)][_0x292080(0x3ec)]=function(){const _0x360cc2=_0x292080;this[_0x360cc2(0x578)]['_character'][_0x360cc2(0x524)]()&&(this['x']+=VisuMZ['EventsMoveCore'][_0x360cc2(0x411)]['VS8'][_0x360cc2(0x394)],this['y']+=VisuMZ['EventsMoveCore'][_0x360cc2(0x411)][_0x360cc2(0x22a)][_0x360cc2(0x4d4)]);},Sprite_Timer['prototype'][_0x292080(0x1c9)]=function(){const _0x2641c=_0x292080;this[_0x2641c(0x2a5)]=new Bitmap(Math[_0x2641c(0x460)](Graphics[_0x2641c(0x1d9)]/0x2),0x30),this[_0x2641c(0x2a5)][_0x2641c(0x136)]=this['fontFace'](),this[_0x2641c(0x2a5)][_0x2641c(0x1e9)]=this[_0x2641c(0x1e9)](),this['bitmap'][_0x2641c(0x241)]=ColorManager[_0x2641c(0x241)]();},Sprite_Timer[_0x292080(0x45b)][_0x292080(0x4ec)]=function(){const _0x3b15c2=_0x292080,_0x49d29d=Math[_0x3b15c2(0x415)](this[_0x3b15c2(0x374)]/0x3c/0x3c),_0x4bf6ff=Math[_0x3b15c2(0x415)](this[_0x3b15c2(0x374)]/0x3c)%0x3c,_0x49ffd4=this['_seconds']%0x3c;let _0x5dd9ab=_0x4bf6ff[_0x3b15c2(0x218)](0x2)+':'+_0x49ffd4[_0x3b15c2(0x218)](0x2);if(_0x49d29d>0x0)_0x5dd9ab=_0x3b15c2(0x4d2)[_0x3b15c2(0x193)](_0x49d29d,_0x5dd9ab);return _0x5dd9ab;};function Sprite_EventLabel(){this['initialize'](...arguments);}Sprite_EventLabel[_0x292080(0x45b)]=Object[_0x292080(0x51d)](Sprite[_0x292080(0x45b)]),Sprite_EventLabel[_0x292080(0x45b)][_0x292080(0x1af)]=Sprite_EventLabel,Sprite_EventLabel[_0x292080(0x45b)][_0x292080(0x333)]=function(_0x1ab3c4){const _0x3ea7a0=_0x292080;this[_0x3ea7a0(0x3a0)]=_0x1ab3c4,Sprite[_0x3ea7a0(0x45b)][_0x3ea7a0(0x333)][_0x3ea7a0(0x46f)](this),this['initMembers'](),this[_0x3ea7a0(0x2af)]();},Sprite_EventLabel['prototype'][_0x292080(0x28d)]=function(){this['anchor']['x']=0.5,this['anchor']['y']=0x1;},Sprite_EventLabel[_0x292080(0x45b)][_0x292080(0x2af)]=function(){const _0xd29e2b=_0x292080,_0x472d8c=new Rectangle(0x0,0x0,0x1,0x1);this[_0xd29e2b(0x523)]=new Window_Base(_0x472d8c),this[_0xd29e2b(0x523)][_0xd29e2b(0x2e8)]=0x0,this[_0xd29e2b(0x3e7)]=this[_0xd29e2b(0x1f9)]()?0xff:0x0;},Sprite_EventLabel['prototype'][_0x292080(0x434)]=function(){const _0x5d53ce=_0x292080;Sprite[_0x5d53ce(0x45b)]['update']['call'](this),this[_0x5d53ce(0x405)](),this['updateScale'](),this['updatePosition'](),this[_0x5d53ce(0x213)]();},Sprite_EventLabel['prototype'][_0x292080(0x405)]=function(){const _0x40d25a=_0x292080;this[_0x40d25a(0x3a0)]['labelWindowText']()!==this[_0x40d25a(0x304)]&&(this[_0x40d25a(0x304)]=this[_0x40d25a(0x3a0)][_0x40d25a(0x4e1)](),this['refresh']());},Sprite_EventLabel[_0x292080(0x45b)][_0x292080(0x191)]=function(){const _0x152302=_0x292080;if(!this[_0x152302(0x523)])return;this[_0x152302(0x36d)](),this[_0x152302(0x431)]();},Sprite_EventLabel['prototype'][_0x292080(0x36d)]=function(){const _0x371a89=_0x292080,_0x5d258d=this[_0x371a89(0x523)][_0x371a89(0x554)](this[_0x371a89(0x304)]),_0x59fe62=this[_0x371a89(0x523)][_0x371a89(0x3af)](),_0x4d737e=_0x5d258d[_0x371a89(0x474)]+_0x59fe62*0x2,_0x231a45=_0x5d258d[_0x371a89(0x2ea)];this[_0x371a89(0x523)][_0x371a89(0x2e2)](0x0,0x0,_0x4d737e,_0x231a45),this[_0x371a89(0x523)]['createContents'](),this['bitmap']=this[_0x371a89(0x523)][_0x371a89(0x355)];},Sprite_EventLabel['prototype'][_0x292080(0x431)]=function(){const _0x269710=_0x292080,_0x4dfc72=this[_0x269710(0x523)][_0x269710(0x3af)]();this['_proxyWindow'][_0x269710(0x13b)](this['_text'],_0x4dfc72,0x0);},Sprite_EventLabel[_0x292080(0x45b)][_0x292080(0x403)]=function(){const _0x22556d=_0x292080,_0x7fc682=VisuMZ[_0x22556d(0x364)]['Settings'][_0x22556d(0x473)][_0x22556d(0x170)],_0x5e571a=$gameSystem[_0x22556d(0x4d7)]()||0x1;this[_0x22556d(0x4ad)]['x']=this[_0x22556d(0x4ad)]['y']=_0x7fc682/_0x5e571a;},Sprite_EventLabel[_0x292080(0x45b)][_0x292080(0x21b)]=function(){const _0x283ca3=_0x292080;if(!SceneManager[_0x283ca3(0x28c)])return;if(!SceneManager['_scene']['_spriteset'])return;const _0x27f9de=SceneManager[_0x283ca3(0x28c)][_0x283ca3(0x2b9)]['findTargetSprite'](this[_0x283ca3(0x3a0)]);if(!_0x27f9de)return;this['x']=this[_0x283ca3(0x3a0)][_0x283ca3(0x346)](),this['x']+=this[_0x283ca3(0x3a0)][_0x283ca3(0x2aa)]['offsetX'],this['y']=this[_0x283ca3(0x3a0)][_0x283ca3(0x4dc)]()-_0x27f9de['height'],this['y']+=$gameSystem[_0x283ca3(0x2e0)]()*-0.5,this['y']+=this[_0x283ca3(0x3a0)][_0x283ca3(0x2aa)][_0x283ca3(0x3d7)];},Sprite_EventLabel[_0x292080(0x45b)][_0x292080(0x213)]=function(){const _0x1a9ed5=_0x292080;if(this[_0x1a9ed5(0x1f9)]())this['opacity']+=this['opacitySpeed']();else SceneManager['_scene'][_0x1a9ed5(0x1b6)]>0x0?this[_0x1a9ed5(0x3e7)]=0x0:this[_0x1a9ed5(0x3e7)]-=this[_0x1a9ed5(0x2f1)]();},Sprite_EventLabel[_0x292080(0x45b)][_0x292080(0x1f9)]=function(){const _0x1ea7b7=_0x292080;if(!$gameSystem[_0x1ea7b7(0x3db)]())return![];if(this[_0x1ea7b7(0x3a0)]?.[_0x1ea7b7(0x14c)])return![];if(this[_0x1ea7b7(0x3a0)]&&this[_0x1ea7b7(0x3a0)][_0x1ea7b7(0x3be)]<0x0)return![];if(SceneManager['_scene']['_encounterEffectDuration']>0x0)return![];const _0x3a43c3=$gamePlayer['x'],_0x583b33=$gamePlayer['y'],_0x30bbc4=this[_0x1ea7b7(0x3a0)]['x'],_0x65911c=this[_0x1ea7b7(0x3a0)]['y'];if(this[_0x1ea7b7(0x52e)]===_0x3a43c3&&this[_0x1ea7b7(0x39b)]===_0x583b33&&this[_0x1ea7b7(0x232)]===_0x30bbc4&&this[_0x1ea7b7(0x54d)]===_0x65911c)return this['_cacheVisibility'];this[_0x1ea7b7(0x52e)]=$gamePlayer['x'],this[_0x1ea7b7(0x39b)]=$gamePlayer['y'],this[_0x1ea7b7(0x232)]=this[_0x1ea7b7(0x3a0)]['x'],this[_0x1ea7b7(0x54d)]=this[_0x1ea7b7(0x3a0)]['y'];if($gameMap[_0x1ea7b7(0x1c8)](_0x3a43c3,_0x583b33,_0x30bbc4,_0x65911c)>this[_0x1ea7b7(0x3a0)][_0x1ea7b7(0x179)]())return this[_0x1ea7b7(0x40c)]=![],![];return this[_0x1ea7b7(0x40c)]=!![],!![];},Sprite_EventLabel[_0x292080(0x45b)][_0x292080(0x2f1)]=function(){const _0x22275a=_0x292080;return VisuMZ[_0x22275a(0x364)][_0x22275a(0x411)]['Label']['OpacitySpeed'];},VisuMZ[_0x292080(0x364)][_0x292080(0x3cc)]=Spriteset_Map[_0x292080(0x45b)][_0x292080(0x26f)],Spriteset_Map['prototype'][_0x292080(0x26f)]=function(){const _0x2c1b2a=_0x292080;VisuMZ[_0x2c1b2a(0x364)][_0x2c1b2a(0x3cc)][_0x2c1b2a(0x46f)](this),this[_0x2c1b2a(0x3d2)]();},VisuMZ[_0x292080(0x364)][_0x292080(0x290)]=Spriteset_Map[_0x292080(0x45b)][_0x292080(0x48d)],Spriteset_Map[_0x292080(0x45b)]['createShadow']=function(){const _0xfd959b=_0x292080;VisuMZ[_0xfd959b(0x364)][_0xfd959b(0x290)][_0xfd959b(0x46f)](this),this[_0xfd959b(0x1ae)]();},Spriteset_Map[_0x292080(0x45b)][_0x292080(0x1ae)]=function(){const _0x3ee201=_0x292080;if(!VisuMZ[_0x3ee201(0x364)][_0x3ee201(0x411)][_0x3ee201(0x1ec)][_0x3ee201(0x19e)])return;for(const _0x36ed98 of this['_characterSprites']){this[_0x3ee201(0x2b6)](_0x36ed98);}},Spriteset_Map[_0x292080(0x45b)][_0x292080(0x2b6)]=function(_0x3181d4){const _0x4eee1c=_0x292080;_0x3181d4[_0x4eee1c(0x3f3)]=new Sprite(),_0x3181d4[_0x4eee1c(0x3f3)][_0x4eee1c(0x4ed)]=_0x3181d4[_0x4eee1c(0x2b3)]['shadowFilename'](),_0x3181d4[_0x4eee1c(0x3f3)]['bitmap']=ImageManager[_0x4eee1c(0x1d3)](_0x3181d4[_0x4eee1c(0x3f3)][_0x4eee1c(0x4ed)]),_0x3181d4['_shadowSprite'][_0x4eee1c(0x557)]['x']=0.5,_0x3181d4[_0x4eee1c(0x3f3)][_0x4eee1c(0x557)]['y']=0x1,_0x3181d4[_0x4eee1c(0x3f3)]['z']=0x0,this['_tilemap']['addChild'](_0x3181d4[_0x4eee1c(0x3f3)]);},Spriteset_Map[_0x292080(0x45b)][_0x292080(0x2ed)]=function(){const _0x5aaf49=_0x292080;if(!VisuMZ[_0x5aaf49(0x364)][_0x5aaf49(0x411)][_0x5aaf49(0x1ec)][_0x5aaf49(0x19e)])return;for(const _0x677a56 of this['_characterSprites']){this[_0x5aaf49(0x312)][_0x5aaf49(0x13d)](_0x677a56[_0x5aaf49(0x3f3)]);}},Spriteset_Map[_0x292080(0x45b)][_0x292080(0x3d2)]=function(){const _0x41eb6b=_0x292080;this[_0x41eb6b(0x4e2)]=[];for(const _0x3e449c of $gameMap[_0x41eb6b(0x54c)]()){this[_0x41eb6b(0x3a8)](_0x3e449c);}},Spriteset_Map[_0x292080(0x45b)][_0x292080(0x3a8)]=function(_0x5422ff){const _0x4978bc=_0x292080;if(!this[_0x4978bc(0x4fa)](_0x5422ff))return;let _0x5ac603;const _0x330c4a=VisuMZ['EventsMoveCore'][_0x4978bc(0x411)][_0x4978bc(0x473)][_0x4978bc(0x18e)]??!![];_0x5ac603=_0x330c4a?new Sprite_EventLabel(_0x5422ff):new Window_EventLabel(_0x5422ff),_0x5ac603['z']=0x8,_0x5ac603[_0x4978bc(0x4f5)]=Sprite[_0x4978bc(0x303)]++,this[_0x4978bc(0x312)]['addChild'](_0x5ac603),this[_0x4978bc(0x4e2)][_0x4978bc(0x3dd)](_0x5ac603);},Spriteset_Map['prototype'][_0x292080(0x4fa)]=function(_0x589f6d){const _0x30af7b=_0x292080,_0x3e2238=_0x589f6d['event']();if(_0x3e2238['note'][_0x30af7b(0x173)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x3e2238[_0x30af7b(0x2f3)]['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x1b2d90 of _0x3e2238[_0x30af7b(0x1c0)]){let _0x139a77='';for(const _0x369a2f of _0x1b2d90[_0x30af7b(0x534)]){[0x6c,0x198][_0x30af7b(0x539)](_0x369a2f[_0x30af7b(0x29f)])&&(_0x139a77+=_0x369a2f['parameters'][0x0]);}if(_0x139a77['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x139a77[_0x30af7b(0x173)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map['prototype'][_0x292080(0x4c4)]=function(_0x5573d0){const _0x57b38a=_0x292080;this[_0x57b38a(0x506)]=this['_characterSprites']||[];const _0x52dfd2=new Sprite_Character(_0x5573d0);this[_0x57b38a(0x506)][_0x57b38a(0x3dd)](_0x52dfd2),this[_0x57b38a(0x312)][_0x57b38a(0x1b7)](_0x52dfd2),this[_0x57b38a(0x2b6)](_0x52dfd2),this[_0x57b38a(0x3a8)](_0x5573d0),_0x52dfd2['update']();},Spriteset_Map[_0x292080(0x45b)][_0x292080(0x4c2)]=function(){const _0x3f6917=_0x292080;if(!this[_0x3f6917(0x4e2)])return;for(const _0x1d9d70 of this['_labelWindows']){_0x1d9d70&&(_0x1d9d70[_0x3f6917(0x52e)]=undefined,_0x1d9d70[_0x3f6917(0x191)]());}},VisuMZ[_0x292080(0x364)]['Game_Message_setNumberInput']=Game_Message[_0x292080(0x45b)][_0x292080(0x22c)],Game_Message['prototype'][_0x292080(0x22c)]=function(_0x4a8fa8,_0x2bc2b7){const _0x1bb854=_0x292080;this[_0x1bb854(0x307)]=$gameTemp['getSelfTarget'](),VisuMZ[_0x1bb854(0x364)][_0x1bb854(0x442)][_0x1bb854(0x46f)](this,_0x4a8fa8,_0x2bc2b7);},VisuMZ['EventsMoveCore'][_0x292080(0x24b)]=Window_NumberInput[_0x292080(0x45b)][_0x292080(0x268)],Window_NumberInput[_0x292080(0x45b)][_0x292080(0x268)]=function(){const _0x34f350=_0x292080;$gameTemp[_0x34f350(0x387)]($gameMessage[_0x34f350(0x307)]),VisuMZ[_0x34f350(0x364)][_0x34f350(0x24b)][_0x34f350(0x46f)](this),$gameTemp[_0x34f350(0x566)]();},VisuMZ[_0x292080(0x364)]['Window_NumberInput_processOk']=Window_NumberInput['prototype'][_0x292080(0x54b)],Window_NumberInput['prototype']['processOk']=function(){const _0xcb7368=_0x292080;$gameTemp[_0xcb7368(0x387)]($gameMessage[_0xcb7368(0x307)]),VisuMZ['EventsMoveCore'][_0xcb7368(0x516)]['call'](this),$gameTemp[_0xcb7368(0x566)](),$gameMessage[_0xcb7368(0x307)]=undefined;},VisuMZ[_0x292080(0x364)][_0x292080(0x41f)]=Game_Message[_0x292080(0x45b)][_0x292080(0x3e4)],Game_Message[_0x292080(0x45b)][_0x292080(0x3e4)]=function(_0xc90488,_0x1518a3){const _0x4ae97c=_0x292080;this[_0x4ae97c(0x40b)]=$gameTemp[_0x4ae97c(0x535)](),VisuMZ['EventsMoveCore']['Game_Message_setItemChoice'][_0x4ae97c(0x46f)](this,_0xc90488,_0x1518a3);},VisuMZ[_0x292080(0x364)]['Window_EventItem_onOk']=Window_EventItem[_0x292080(0x45b)][_0x292080(0x1fc)],Window_EventItem[_0x292080(0x45b)][_0x292080(0x1fc)]=function(){const _0x3d36fe=_0x292080;$gameTemp[_0x3d36fe(0x387)]($gameMessage['_selfTargetItemChoice']),VisuMZ[_0x3d36fe(0x364)][_0x3d36fe(0x4aa)]['call'](this),$gameTemp[_0x3d36fe(0x566)](),$gameMessage[_0x3d36fe(0x40b)]=undefined;},VisuMZ[_0x292080(0x364)]['Window_EventItem_onCancel']=Window_EventItem['prototype'][_0x292080(0x1d7)],Window_EventItem[_0x292080(0x45b)][_0x292080(0x1d7)]=function(){const _0x3c7dbe=_0x292080;$gameTemp[_0x3c7dbe(0x387)]($gameMessage[_0x3c7dbe(0x40b)]),VisuMZ[_0x3c7dbe(0x364)][_0x3c7dbe(0x250)][_0x3c7dbe(0x46f)](this),$gameTemp[_0x3c7dbe(0x566)](),$gameMessage[_0x3c7dbe(0x40b)]=undefined;},VisuMZ[_0x292080(0x364)]['Window_Message_startMessage']=Window_Message[_0x292080(0x45b)][_0x292080(0x548)],Window_Message[_0x292080(0x45b)][_0x292080(0x548)]=function(){const _0x3b5a91=_0x292080;$gameMessage[_0x3b5a91(0x57f)](),VisuMZ[_0x3b5a91(0x364)][_0x3b5a91(0x44b)][_0x3b5a91(0x46f)](this),$gameTemp['clearSelfTarget']();},VisuMZ[_0x292080(0x364)][_0x292080(0x183)]=Window_ScrollText[_0x292080(0x45b)][_0x292080(0x548)],Window_ScrollText[_0x292080(0x45b)][_0x292080(0x548)]=function(){const _0x39d5ba=_0x292080;$gameMessage[_0x39d5ba(0x57f)](),VisuMZ[_0x39d5ba(0x364)][_0x39d5ba(0x183)][_0x39d5ba(0x46f)](this),$gameTemp['clearSelfTarget']();};function Window_EventLabel(){const _0xd14ab=_0x292080;this[_0xd14ab(0x333)](...arguments);}Window_EventLabel[_0x292080(0x45b)]=Object[_0x292080(0x51d)](Window_Base[_0x292080(0x45b)]),Window_EventLabel[_0x292080(0x45b)][_0x292080(0x1af)]=Window_EventLabel,Window_EventLabel[_0x292080(0x45b)][_0x292080(0x333)]=function(_0xc9fef){const _0x2620c2=_0x292080;this['_event']=_0xc9fef;const _0x13bae2=new Rectangle(0x0,0x0,Graphics[_0x2620c2(0x1d9)]/0x4,this[_0x2620c2(0x478)](0x1));this[_0x2620c2(0x28d)](),Window_Base[_0x2620c2(0x45b)][_0x2620c2(0x333)]['call'](this,_0x13bae2),this[_0x2620c2(0x530)]=0x0,this['setBackgroundType'](0x2),this[_0x2620c2(0x304)]='';},Window_EventLabel['prototype'][_0x292080(0x28d)]=function(){const _0x2398a4=_0x292080;this[_0x2398a4(0x219)]=![],this[_0x2398a4(0x398)]=$gameScreen[_0x2398a4(0x2ae)](),this['_eventScreenX']=this[_0x2398a4(0x3a0)][_0x2398a4(0x346)](),this[_0x2398a4(0x468)]=this['_event'][_0x2398a4(0x4dc)](),this['_eventLabelOffsetX']=this[_0x2398a4(0x3a0)]['_labelWindow'][_0x2398a4(0x330)],this['_eventLabelOffsetY']=this[_0x2398a4(0x3a0)][_0x2398a4(0x2aa)][_0x2398a4(0x3d7)],this[_0x2398a4(0x507)]=this[_0x2398a4(0x3a0)][_0x2398a4(0x3be)],this[_0x2398a4(0x40c)]=this['isLabelVisible'](),this[_0x2398a4(0x550)]=$gameSystem[_0x2398a4(0x3db)](),this[_0x2398a4(0x52e)]=$gamePlayer['x'],this[_0x2398a4(0x39b)]=$gamePlayer['y'],this[_0x2398a4(0x232)]=this['_event']['x'],this[_0x2398a4(0x54d)]=this[_0x2398a4(0x3a0)]['y'];},Window_EventLabel[_0x292080(0x45b)][_0x292080(0x434)]=function(){const _0x4e938f=_0x292080;Window_Base['prototype'][_0x4e938f(0x434)][_0x4e938f(0x46f)](this);if(!this[_0x4e938f(0x186)]())return;this[_0x4e938f(0x405)](),this['updateScale'](),this[_0x4e938f(0x21b)](),this[_0x4e938f(0x213)]();},Window_EventLabel['prototype'][_0x292080(0x186)]=function(){const _0x1749d1=_0x292080;if(!this[_0x1749d1(0x3a0)])return![];if(!this[_0x1749d1(0x3a0)][_0x1749d1(0x2aa)])return![];if(this[_0x1749d1(0x507)]!==this[_0x1749d1(0x3a0)]['_pageIndex'])return!![];if(this[_0x1749d1(0x3a0)][_0x1749d1(0x14c)]&&!this[_0x1749d1(0x219)])return!![];if(this[_0x1749d1(0x3a0)][_0x1749d1(0x2aa)][_0x1749d1(0x1bc)]==='')return![];if(this[_0x1749d1(0x398)]!==$gameScreen['zoomScale']())return!![];if(this[_0x1749d1(0x300)]!==this[_0x1749d1(0x3a0)][_0x1749d1(0x346)]())return!![];if(this[_0x1749d1(0x468)]!==this['_event'][_0x1749d1(0x4dc)]())return!![];if(this['_eventLabelOffsetX']!==this[_0x1749d1(0x3a0)][_0x1749d1(0x2aa)][_0x1749d1(0x330)])return!![];if(this['_eventLabelOffsetY']!==this['_event']['_labelWindow'][_0x1749d1(0x3d7)])return!![];if(this[_0x1749d1(0x52e)]!==$gamePlayer['x'])return!![];if(this['_visiblePlayerY']!==$gamePlayer['y'])return!![];if(this['_visibleEventX']!==this[_0x1749d1(0x3a0)]['x'])return!![];if(this[_0x1749d1(0x54d)]!==this[_0x1749d1(0x3a0)]['y'])return!![];if(this[_0x1749d1(0x550)]!==$gameSystem[_0x1749d1(0x3db)]())return!![];if(this[_0x1749d1(0x40c)]&&this['contentsOpacity']<0xff)return!![];if(!this[_0x1749d1(0x40c)]&&this[_0x1749d1(0x530)]>0x0)return!![];if(SceneManager[_0x1749d1(0x28c)]['_encounterEffectDuration']>0x0)return!![];return![];},Window_EventLabel[_0x292080(0x45b)][_0x292080(0x405)]=function(){const _0x1865a9=_0x292080;this[_0x1865a9(0x3a0)][_0x1865a9(0x4e1)]()!==this[_0x1865a9(0x304)]&&(this[_0x1865a9(0x304)]=this[_0x1865a9(0x3a0)][_0x1865a9(0x4e1)](),this[_0x1865a9(0x191)]());},Window_EventLabel[_0x292080(0x45b)][_0x292080(0x403)]=function(){const _0x5347af=_0x292080;this[_0x5347af(0x4ad)]['x']=0x1/$gameScreen[_0x5347af(0x2ae)](),this[_0x5347af(0x4ad)]['y']=0x1/$gameScreen[_0x5347af(0x2ae)](),this['_screenZoomScale']=$gameScreen['zoomScale']();},Window_EventLabel[_0x292080(0x45b)][_0x292080(0x21b)]=function(){const _0x2ee9fc=_0x292080;if(!SceneManager['_scene'])return;if(!SceneManager[_0x2ee9fc(0x28c)]['_spriteset'])return;const _0x59c1e5=SceneManager['_scene'][_0x2ee9fc(0x2b9)][_0x2ee9fc(0x4c0)](this[_0x2ee9fc(0x3a0)]);if(!_0x59c1e5)return;this['x']=Math['round'](this[_0x2ee9fc(0x3a0)][_0x2ee9fc(0x346)]()-Math[_0x2ee9fc(0x415)](this['width']*this['scale']['x']/0x2)),this['x']+=this[_0x2ee9fc(0x3a0)][_0x2ee9fc(0x2aa)][_0x2ee9fc(0x330)],this['y']=this[_0x2ee9fc(0x3a0)][_0x2ee9fc(0x4dc)]()-_0x59c1e5[_0x2ee9fc(0x2ea)],this['y']+=Math['round']($gameSystem[_0x2ee9fc(0x2e0)]()*0.5),this['y']-=Math[_0x2ee9fc(0x460)](this[_0x2ee9fc(0x2ea)]*this[_0x2ee9fc(0x4ad)]['y']),this['y']+=this[_0x2ee9fc(0x3a0)][_0x2ee9fc(0x2aa)][_0x2ee9fc(0x3d7)],this['_eventErased']=this[_0x2ee9fc(0x3a0)][_0x2ee9fc(0x14c)],this[_0x2ee9fc(0x300)]=this['_event'][_0x2ee9fc(0x346)](),this[_0x2ee9fc(0x468)]=this[_0x2ee9fc(0x3a0)]['screenY'](),this['_eventLabelOffsetX']=this[_0x2ee9fc(0x3a0)][_0x2ee9fc(0x2aa)][_0x2ee9fc(0x330)],this['_eventLabelOffsetY']=this[_0x2ee9fc(0x3a0)][_0x2ee9fc(0x2aa)][_0x2ee9fc(0x3d7)],this[_0x2ee9fc(0x507)]=this[_0x2ee9fc(0x3a0)][_0x2ee9fc(0x3be)],this['_eventErased']&&(this[_0x2ee9fc(0x530)]=0x0);},Window_EventLabel[_0x292080(0x45b)][_0x292080(0x213)]=function(){const _0x157c40=_0x292080;if(this[_0x157c40(0x1f9)]())this[_0x157c40(0x530)]+=this[_0x157c40(0x2f1)]();else SceneManager['_scene'][_0x157c40(0x1b6)]>0x0?this[_0x157c40(0x530)]=0x0:this[_0x157c40(0x530)]-=this[_0x157c40(0x2f1)]();},Window_EventLabel[_0x292080(0x45b)]['isLabelVisible']=function(){const _0x4f1e67=_0x292080;if(!$gameSystem[_0x4f1e67(0x3db)]())return![];if(this[_0x4f1e67(0x3a0)]?.[_0x4f1e67(0x14c)])return![];if(SceneManager[_0x4f1e67(0x28c)][_0x4f1e67(0x1b6)]>0x0)return![];const _0x51520c=$gamePlayer['x'],_0x143173=$gamePlayer['y'],_0xa5512d=this['_event']['x'],_0x21412f=this[_0x4f1e67(0x3a0)]['y'];if(this[_0x4f1e67(0x52e)]===_0x51520c&&this[_0x4f1e67(0x39b)]===_0x143173&&this['_visibleEventX']===_0xa5512d&&this[_0x4f1e67(0x54d)]===_0x21412f)return this[_0x4f1e67(0x40c)];this[_0x4f1e67(0x52e)]=$gamePlayer['x'],this[_0x4f1e67(0x39b)]=$gamePlayer['y'],this[_0x4f1e67(0x232)]=this[_0x4f1e67(0x3a0)]['x'],this[_0x4f1e67(0x54d)]=this[_0x4f1e67(0x3a0)]['y'];if($gameMap[_0x4f1e67(0x1c8)](_0x51520c,_0x143173,_0xa5512d,_0x21412f)>this[_0x4f1e67(0x3a0)][_0x4f1e67(0x179)]())return this[_0x4f1e67(0x40c)]=![],![];return this[_0x4f1e67(0x40c)]=!![],!![];},Window_EventLabel[_0x292080(0x45b)]['opacitySpeed']=function(){const _0x255042=_0x292080;return VisuMZ[_0x255042(0x364)][_0x255042(0x411)][_0x255042(0x473)]['OpacitySpeed'];},Window_EventLabel[_0x292080(0x45b)][_0x292080(0x36d)]=function(){const _0x369779=_0x292080,_0x176d12=this[_0x369779(0x554)](this['_text']);this[_0x369779(0x474)]=_0x176d12[_0x369779(0x474)]+($gameSystem[_0x369779(0x2e0)]()+this['itemPadding']())*0x2,this[_0x369779(0x2ea)]=Math[_0x369779(0x13e)](this[_0x369779(0x288)](),_0x176d12['height'])+$gameSystem['windowPadding']()*0x2,this['createContents']();},Window_EventLabel['prototype'][_0x292080(0x288)]=function(){const _0x3d9b48=_0x292080;return VisuMZ[_0x3d9b48(0x364)][_0x3d9b48(0x411)]['Label']['LineHeight'];},Window_EventLabel[_0x292080(0x45b)]['resetFontSettings']=function(){const _0x1a3527=_0x292080;Window_Base[_0x1a3527(0x45b)][_0x1a3527(0x20a)][_0x1a3527(0x46f)](this),this['contents'][_0x1a3527(0x1e9)]=this['defaultFontSize']();},Window_EventLabel['prototype'][_0x292080(0x1cb)]=function(){const _0x3529d3=_0x292080;return VisuMZ[_0x3529d3(0x364)][_0x3529d3(0x411)][_0x3529d3(0x473)][_0x3529d3(0x170)];},Window_EventLabel[_0x292080(0x45b)][_0x292080(0x191)]=function(){const _0x1ee796=_0x292080;this[_0x1ee796(0x36d)](),this[_0x1ee796(0x355)][_0x1ee796(0x4b1)]();const _0x57cbdc=this[_0x1ee796(0x304)][_0x1ee796(0x43e)](/[\r\n]+/);let _0x268353=0x0;for(const _0x33a894 of _0x57cbdc){const _0x227425=this[_0x1ee796(0x554)](_0x33a894),_0x32529c=Math[_0x1ee796(0x415)]((this[_0x1ee796(0x262)]-_0x227425['width'])/0x2);this[_0x1ee796(0x13b)](_0x33a894,_0x32529c,_0x268353),_0x268353+=_0x227425['height'];}},Window_EventLabel['prototype']['processDrawIcon']=function(_0x1172ca,_0x1ea13a){const _0x390ed7=_0x292080;_0x1ea13a[_0x390ed7(0x2fd)]&&this[_0x390ed7(0x1f0)](_0x1172ca,_0x1ea13a['x']+0x2,_0x1ea13a['y']),_0x1ea13a['x']+=Math['min'](this[_0x390ed7(0x39e)](),ImageManager[_0x390ed7(0x577)])+0x4;},Window_EventLabel[_0x292080(0x45b)]['drawIcon']=function(_0x69a35d,_0x1b3204,_0x29f7b8){const _0x5b2afc=_0x292080,_0x29df3e=ImageManager[_0x5b2afc(0x1d3)](_0x5b2afc(0x318)),_0x94e29b=ImageManager['iconWidth'],_0x3a05fb=ImageManager[_0x5b2afc(0x26a)],_0x218b7b=_0x69a35d%0x10*_0x94e29b,_0x23c9e3=Math[_0x5b2afc(0x415)](_0x69a35d/0x10)*_0x3a05fb,_0x422849=Math['min'](this['iconSize']()),_0x5e3be4=Math['min'](this[_0x5b2afc(0x39e)]());this[_0x5b2afc(0x355)][_0x5b2afc(0x433)](_0x29df3e,_0x218b7b,_0x23c9e3,_0x94e29b,_0x3a05fb,_0x1b3204,_0x29f7b8,_0x422849,_0x5e3be4);},Window_EventLabel[_0x292080(0x45b)]['iconSize']=function(){const _0x16c33b=_0x292080;return VisuMZ['EventsMoveCore']['Settings'][_0x16c33b(0x473)][_0x16c33b(0x4dd)];};