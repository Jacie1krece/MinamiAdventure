//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.47;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.47] [EventsMoveCore]
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

const _0x39f07d=_0x2c0c;(function(_0x277ac1,_0x78327e){const _0x543380=_0x2c0c,_0xb5ec99=_0x277ac1();while(!![]){try{const _0x2553b4=parseInt(_0x543380(0x592))/0x1*(parseInt(_0x543380(0x2d6))/0x2)+parseInt(_0x543380(0x2f0))/0x3*(parseInt(_0x543380(0x45d))/0x4)+-parseInt(_0x543380(0x2d7))/0x5*(-parseInt(_0x543380(0x37f))/0x6)+-parseInt(_0x543380(0x20b))/0x7+-parseInt(_0x543380(0x192))/0x8+-parseInt(_0x543380(0x1e0))/0x9*(parseInt(_0x543380(0xa2))/0xa)+parseInt(_0x543380(0x34e))/0xb;if(_0x2553b4===_0x78327e)break;else _0xb5ec99['push'](_0xb5ec99['shift']());}catch(_0x9cd793){_0xb5ec99['push'](_0xb5ec99['shift']());}}}(_0x2db4,0x28705));var label=_0x39f07d(0x41c),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x39f07d(0x48a)](function(_0x259573){const _0x49035f=_0x39f07d;return _0x259573[_0x49035f(0x2c1)]&&_0x259573[_0x49035f(0x2ef)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x39f07d(0x2a4)]||{},VisuMZ[_0x39f07d(0x130)]=function(_0x1ec163,_0xf5eaf9){const _0x51d0fc=_0x39f07d;for(const _0x31b4c3 in _0xf5eaf9){if(_0x51d0fc(0x15e)==='qvwcc'){if(_0x31b4c3[_0x51d0fc(0x17c)](/(.*):(.*)/i)){const _0x44ad35=String(RegExp['$1']),_0x2a2c13=String(RegExp['$2'])[_0x51d0fc(0x321)]()['trim']();let _0x8e91f8,_0x465ba9,_0x4d941c;switch(_0x2a2c13){case _0x51d0fc(0x55b):_0x8e91f8=_0xf5eaf9[_0x31b4c3]!==''?Number(_0xf5eaf9[_0x31b4c3]):0x0;break;case _0x51d0fc(0x407):_0x465ba9=_0xf5eaf9[_0x31b4c3]!==''?JSON[_0x51d0fc(0x8e)](_0xf5eaf9[_0x31b4c3]):[],_0x8e91f8=_0x465ba9[_0x51d0fc(0x189)](_0x44e7c0=>Number(_0x44e7c0));break;case _0x51d0fc(0x492):_0x8e91f8=_0xf5eaf9[_0x31b4c3]!==''?eval(_0xf5eaf9[_0x31b4c3]):null;break;case'ARRAYEVAL':_0x465ba9=_0xf5eaf9[_0x31b4c3]!==''?JSON[_0x51d0fc(0x8e)](_0xf5eaf9[_0x31b4c3]):[],_0x8e91f8=_0x465ba9[_0x51d0fc(0x189)](_0x35e889=>eval(_0x35e889));break;case _0x51d0fc(0x331):_0x8e91f8=_0xf5eaf9[_0x31b4c3]!==''?JSON[_0x51d0fc(0x8e)](_0xf5eaf9[_0x31b4c3]):'';break;case _0x51d0fc(0x2af):_0x465ba9=_0xf5eaf9[_0x31b4c3]!==''?JSON['parse'](_0xf5eaf9[_0x31b4c3]):[],_0x8e91f8=_0x465ba9[_0x51d0fc(0x189)](_0xe76e52=>JSON[_0x51d0fc(0x8e)](_0xe76e52));break;case _0x51d0fc(0x95):_0x8e91f8=_0xf5eaf9[_0x31b4c3]!==''?new Function(JSON[_0x51d0fc(0x8e)](_0xf5eaf9[_0x31b4c3])):new Function(_0x51d0fc(0x51f));break;case _0x51d0fc(0x563):_0x465ba9=_0xf5eaf9[_0x31b4c3]!==''?JSON[_0x51d0fc(0x8e)](_0xf5eaf9[_0x31b4c3]):[],_0x8e91f8=_0x465ba9['map'](_0x2528f6=>new Function(JSON[_0x51d0fc(0x8e)](_0x2528f6)));break;case _0x51d0fc(0x440):_0x8e91f8=_0xf5eaf9[_0x31b4c3]!==''?String(_0xf5eaf9[_0x31b4c3]):'';break;case _0x51d0fc(0x4d7):_0x465ba9=_0xf5eaf9[_0x31b4c3]!==''?JSON[_0x51d0fc(0x8e)](_0xf5eaf9[_0x31b4c3]):[],_0x8e91f8=_0x465ba9[_0x51d0fc(0x189)](_0x46a725=>String(_0x46a725));break;case _0x51d0fc(0x51c):_0x4d941c=_0xf5eaf9[_0x31b4c3]!==''?JSON[_0x51d0fc(0x8e)](_0xf5eaf9[_0x31b4c3]):{},_0x1ec163[_0x44ad35]={},VisuMZ[_0x51d0fc(0x130)](_0x1ec163[_0x44ad35],_0x4d941c);continue;case _0x51d0fc(0x9e):_0x465ba9=_0xf5eaf9[_0x31b4c3]!==''?JSON[_0x51d0fc(0x8e)](_0xf5eaf9[_0x31b4c3]):[],_0x8e91f8=_0x465ba9[_0x51d0fc(0x189)](_0x3de465=>VisuMZ[_0x51d0fc(0x130)]({},JSON['parse'](_0x3de465)));break;default:continue;}_0x1ec163[_0x44ad35]=_0x8e91f8;}}else{if(_0xb3589f)for(const _0x1cd270 of _0x444cfd[_0x51d0fc(0x3c4)]()){_0x1cd270[_0x51d0fc(0x1ce)](),_0x1cd270['updateEventLabelText']();}if(_0x30620c['isSceneMap']()){const _0x602ee2=_0x2bd3ae['_scene'][_0x51d0fc(0x359)];if(_0x602ee2)_0x602ee2[_0x51d0fc(0xe8)]();}}}return _0x1ec163;},(_0x3d2338=>{const _0x314d84=_0x39f07d,_0x491a3e=_0x3d2338[_0x314d84(0x3a5)];for(const _0x2ae2aa of dependencies){if(_0x314d84(0x17a)===_0x314d84(0x27e)){if(this[_0x314d84(0xbd)]===_0x30162b)this['initFollowerController']();this[_0x314d84(0xbd)]=_0x1a7cec;;}else{if(!Imported[_0x2ae2aa]){if(_0x314d84(0x5aa)===_0x314d84(0x5aa)){alert(_0x314d84(0x573)[_0x314d84(0x307)](_0x491a3e,_0x2ae2aa)),SceneManager[_0x314d84(0x460)]();break;}else for(const _0x31a72c of _0xb9a356){const _0x1a1d46=_0x314d84(0x26f)[_0x314d84(0x307)](_0x31a72c,_0x50656c);_0x3a7662[_0x1a1d46]&&(_0xeef37c[_0x1a1d46]=_0x1ef54b[_0x1a1d46][_0x314d84(0x586)](0x0));}}}}const _0x532c08=_0x3d2338[_0x314d84(0x2ef)];if(_0x532c08[_0x314d84(0x17c)](/\[Version[ ](.*?)\]/i)){if(_0x314d84(0x371)!==_0x314d84(0x25c)){const _0x19b883=Number(RegExp['$1']);_0x19b883!==VisuMZ[label][_0x314d84(0x279)]&&(_0x314d84(0x479)===_0x314d84(0x479)?(alert(_0x314d84(0x5c7)[_0x314d84(0x307)](_0x491a3e,_0x19b883)),SceneManager['exit']()):this[_0x314d84(0x110)]=!![]);}else{if(_0x1e19f9[_0x314d84(0x1be)]())return![];if(_0x580a73['isPlayerForceHidden']())return!![];}}if(_0x532c08[_0x314d84(0x17c)](/\[Tier[ ](\d+)\]/i)){if(_0x314d84(0x3da)!=='HqIJl'){const _0xa5a401=Number(RegExp['$1']);if(_0xa5a401<tier){if(_0x314d84(0x31d)===_0x314d84(0x31d))alert(_0x314d84(0x184)['format'](_0x491a3e,_0xa5a401,tier)),SceneManager[_0x314d84(0x460)]();else return this['_forceHideFollower']===_0x2735d1&&this['setupFollowerVisibilityOverrides'](),this[_0x314d84(0x2c7)];}else{if(_0x314d84(0x391)===_0x314d84(0x391))tier=Math[_0x314d84(0x2b0)](_0xa5a401,tier);else{if(!_0x2718f6['EventsMoveCore']['Settings'][_0x314d84(0x258)][_0x314d84(0x1e2)])return;for(const _0x4eaeb8 of this['_characterSprites']){this[_0x314d84(0x7b)](_0x4eaeb8);}}}}else this[_0x314d84(0x2cd)]=_0x12f979,_0x15605d['prototype'][_0x314d84(0x56b)][_0x314d84(0x341)](this),this[_0x314d84(0x4b6)](),this[_0x314d84(0x28f)]();}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x3d2338['parameters']);})(pluginData),VisuMZ[_0x39f07d(0x2ec)]=function(_0x5488d3,_0x371b05,_0x2798f0){switch(_0x2798f0){case'=':return _0x371b05;break;case'+':return _0x5488d3+_0x371b05;break;case'-':return _0x5488d3-_0x371b05;break;case'*':return _0x5488d3*_0x371b05;break;case'/':return _0x5488d3/_0x371b05;break;case'%':return _0x5488d3%_0x371b05;break;}return _0x5488d3;},PluginManager[_0x39f07d(0x340)](pluginData['name'],_0x39f07d(0x234),_0x3baa45=>{const _0x476d5c=_0x39f07d;VisuMZ[_0x476d5c(0x130)](_0x3baa45,_0x3baa45);switch(_0x3baa45[_0x476d5c(0x30f)]){case _0x476d5c(0x2f4):$gameSystem[_0x476d5c(0x449)](!![]);break;case _0x476d5c(0x5b3):$gameSystem['setAllowEventAutoMovement'](![]);break;case _0x476d5c(0x49f):$gameSystem['setAllowEventAutoMovement'](!$gameSystem[_0x476d5c(0x42d)]());break;}}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x19a),_0xf9b203=>{const _0x41575c=_0x39f07d;VisuMZ['ConvertParams'](_0xf9b203,_0xf9b203);const _0x3ec7f7=$gameTemp[_0x41575c(0x82)](),_0x2227b5={'mapId':_0xf9b203[_0x41575c(0x108)],'eventId':_0xf9b203[_0x41575c(0x36d)]||_0x3ec7f7[_0x41575c(0x4e2)](),'pageId':_0xf9b203[_0x41575c(0x200)]};if(_0x2227b5[_0x41575c(0x5cb)]<=0x0)_0x2227b5[_0x41575c(0x5cb)]=$gameMap?$gameMap['mapId']():0x1;$gameTemp[_0x41575c(0x82)]()[_0x41575c(0x5c4)](_0x2227b5);}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x428),_0xf1f3fb=>{const _0x519b6d=_0x39f07d;VisuMZ['ConvertParams'](_0xf1f3fb,_0xf1f3fb);switch(_0xf1f3fb[_0x519b6d(0x30f)]){case'Enable':$gameSystem[_0x519b6d(0x4d9)](!![]);break;case'Disable':$gameSystem[_0x519b6d(0x4d9)](![]);break;case _0x519b6d(0x49f):$gameSystem[_0x519b6d(0x4d9)](!$gameSystem[_0x519b6d(0x1fe)]());break;}}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],'EventIconChange',_0x5b641b=>{const _0x56e42f=_0x39f07d;VisuMZ[_0x56e42f(0x130)](_0x5b641b,_0x5b641b);const _0x56e618=$gameTemp[_0x56e42f(0x82)]();_0x5b641b[_0x56e42f(0x108)]=_0x5b641b['MapId']||$gameMap[_0x56e42f(0x5cb)](),$gameSystem[_0x56e42f(0x3c2)](_0x5b641b[_0x56e42f(0x108)],_0x5b641b[_0x56e42f(0x36d)]||_0x56e618[_0x56e42f(0x4e2)](),_0x5b641b[_0x56e42f(0x365)],_0x5b641b[_0x56e42f(0x217)],_0x5b641b[_0x56e42f(0x23f)],_0x5b641b['IconBlendMode']);}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x168),_0x1442fa=>{const _0x1c9db8=_0x39f07d;VisuMZ[_0x1c9db8(0x130)](_0x1442fa,_0x1442fa);const _0xb6eac7=$gameTemp[_0x1c9db8(0x82)]();_0x1442fa[_0x1c9db8(0x108)]=_0x1442fa[_0x1c9db8(0x108)]||$gameMap[_0x1c9db8(0x5cb)](),$gameSystem[_0x1c9db8(0x580)](_0x1442fa[_0x1c9db8(0x108)],_0x1442fa[_0x1c9db8(0x36d)]||_0xb6eac7[_0x1c9db8(0x4e2)]());}),PluginManager[_0x39f07d(0x340)](pluginData['name'],_0x39f07d(0x163),_0x47fff6=>{const _0x98fbaa=_0x39f07d;if($gameMap){if(_0x98fbaa(0x1f8)===_0x98fbaa(0x1f8))for(const _0x562a78 of $gameMap[_0x98fbaa(0x3c4)]()){_0x562a78[_0x98fbaa(0x1ce)](),_0x562a78[_0x98fbaa(0x2e5)]();}else while(this[_0x98fbaa(0x501)]()){this[_0x98fbaa(0x185)]();}}if(SceneManager[_0x98fbaa(0x323)]()){if(_0x98fbaa(0x571)!==_0x98fbaa(0x571))return this['selfValue'](_0x4d7741);else{const _0x37e4a5=SceneManager['_scene']['_spriteset'];if(_0x37e4a5)_0x37e4a5[_0x98fbaa(0xe8)]();}}}),PluginManager['registerCommand'](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x2b3),_0x3c7498=>{const _0x3e6bb1=_0x39f07d;VisuMZ[_0x3e6bb1(0x130)](_0x3c7498,_0x3c7498);switch(_0x3c7498['Visibility']){case _0x3e6bb1(0x37a):$gameSystem[_0x3e6bb1(0xa9)](!![]);break;case _0x3e6bb1(0x56a):$gameSystem[_0x3e6bb1(0xa9)](![]);break;case _0x3e6bb1(0x49f):$gameSystem[_0x3e6bb1(0xa9)](!$gameSystem[_0x3e6bb1(0x19c)]());break;}}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x442),_0x27c08=>{const _0x47be0a=_0x39f07d;VisuMZ[_0x47be0a(0x130)](_0x27c08,_0x27c08);const _0x48af12=$gameTemp['getLastPluginCommandInterpreter']();if(!$gameMap)return;const _0x1e900a=$gameMap[_0x47be0a(0x3f5)](_0x27c08[_0x47be0a(0x36d)]||_0x48af12[_0x47be0a(0x4e2)]());if(_0x1e900a)_0x1e900a['saveEventLocation']();}),PluginManager[_0x39f07d(0x340)](pluginData['name'],_0x39f07d(0x57d),_0x41d170=>{const _0xf18c92=_0x39f07d;VisuMZ[_0xf18c92(0x130)](_0x41d170,_0x41d170);const _0x415e08=$gameTemp[_0xf18c92(0x82)](),_0x284baa=_0x41d170[_0xf18c92(0x108)]||$gameMap[_0xf18c92(0x5cb)](),_0x474ad6=_0x41d170[_0xf18c92(0x36d)]||_0x415e08[_0xf18c92(0x4e2)](),_0x167683=_0x41d170[_0xf18c92(0x3f7)]||0x0,_0x3d4b40=_0x41d170['PosY']||0x0,_0x5ba667=_0x41d170[_0xf18c92(0x32f)]||0x2,_0x5cd5ac=((_0x41d170[_0xf18c92(0x200)]||0x1)-0x1)['clamp'](0x0,0x13),_0x3bb374=_0x41d170[_0xf18c92(0x3d4)]||0x0;$gameSystem[_0xf18c92(0x33b)](_0x284baa,_0x474ad6,_0x167683,_0x3d4b40,_0x5ba667,_0x5cd5ac,_0x3bb374);}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x5b8),_0x16c283=>{const _0xe9d4d4=_0x39f07d;VisuMZ[_0xe9d4d4(0x130)](_0x16c283,_0x16c283);const _0x43e3e7=$gameTemp[_0xe9d4d4(0x82)](),_0x2a1d55=_0x16c283['MapId']||$gameMap[_0xe9d4d4(0x5cb)](),_0x527516=_0x16c283['EventId']||_0x43e3e7[_0xe9d4d4(0x4e2)]();$gameSystem['deleteSavedEventLocationKey'](_0x2a1d55,_0x527516);}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],'EventTimerExpireEvent',_0xd5b894=>{const _0x319e80=_0x39f07d;VisuMZ[_0x319e80(0x130)](_0xd5b894,_0xd5b894);const _0x54f71b=_0xd5b894[_0x319e80(0x1d9)];$gameTimer[_0x319e80(0x3bc)](_0x54f71b);}),PluginManager['registerCommand'](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x328),_0x25d9f2=>{$gameTimer['setCommonEvent'](0x0);}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x35a),_0x31730d=>{const _0x2884af=_0x39f07d;if(!$gameTimer[_0x2884af(0x9b)]())return;VisuMZ[_0x2884af(0x130)](_0x31730d,_0x31730d);let _0x5c3a6e=0x0;_0x5c3a6e+=_0x31730d[_0x2884af(0xb0)],_0x5c3a6e+=_0x31730d[_0x2884af(0x484)]*0x3c,_0x5c3a6e+=_0x31730d[_0x2884af(0x4f8)]*0x3c*0x3c,_0x5c3a6e+=_0x31730d[_0x2884af(0x2e7)]*0x3c*0x3c*0x3c,$gameTimer[_0x2884af(0x170)](_0x5c3a6e);}),PluginManager['registerCommand'](pluginData['name'],'EventTimerFramesSet',_0x1e7afd=>{const _0x1b425e=_0x39f07d;if(!$gameTimer[_0x1b425e(0x9b)]())return;VisuMZ['ConvertParams'](_0x1e7afd,_0x1e7afd);let _0x217820=0x0;_0x217820+=_0x1e7afd[_0x1b425e(0xb0)],_0x217820+=_0x1e7afd['Seconds']*0x3c,_0x217820+=_0x1e7afd['Minutes']*0x3c*0x3c,_0x217820+=_0x1e7afd['Hours']*0x3c*0x3c*0x3c,$gameTimer[_0x1b425e(0x598)](_0x217820);}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x4bc),_0x39f293=>{const _0x4dfba4=_0x39f07d;if(!$gameTimer[_0x4dfba4(0x9b)]())return;$gameTimer[_0x4dfba4(0xfb)]();}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0xbe),_0x1908f3=>{const _0x4e3442=_0x39f07d;if(!$gameTimer[_0x4e3442(0x9b)]())return;$gameTimer[_0x4e3442(0x3c8)]();}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],'EventTimerSpeed',_0x20e0c9=>{const _0x4be512=_0x39f07d;VisuMZ[_0x4be512(0x130)](_0x20e0c9,_0x20e0c9);const _0x5bb04d=_0x20e0c9[_0x4be512(0x1b0)]||0x0;$gameTimer[_0x4be512(0x528)](_0x5bb04d);}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x4cd),_0x4a8cb5=>{const _0x1422a2=_0x39f07d;VisuMZ[_0x1422a2(0x130)](_0x4a8cb5,_0x4a8cb5);const _0x14bf76=!_0x4a8cb5[_0x1422a2(0x2c4)];$gameSystem['setStopFollowerChasing'](_0x14bf76);}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x1cb),_0x4ebf3e=>{const _0x24d583=_0x39f07d;VisuMZ[_0x24d583(0x130)](_0x4ebf3e,_0x4ebf3e);const _0xa5d29b=(_0x4ebf3e[_0x24d583(0x441)]||0x0)-0x1,_0x4a6dd4=!_0x4ebf3e[_0x24d583(0x2c4)],_0x200e51=$gamePlayer[_0x24d583(0x1df)]()[_0x24d583(0x4d3)](_0xa5d29b);if(_0x200e51)_0x200e51[_0x24d583(0x270)](_0x4a6dd4);}),PluginManager['registerCommand'](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x265),_0x4af299=>{const _0x23eceb=_0x39f07d;VisuMZ['ConvertParams'](_0x4af299,_0x4af299);const _0x412d30=_0x4af299['FollowerID'];$gameSystem[_0x23eceb(0xc4)](_0x412d30);}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x2d0),_0xbcc048=>{const _0x3677c2=_0x39f07d;VisuMZ['ConvertParams'](_0xbcc048,_0xbcc048),$gameSystem[_0x3677c2(0xc4)](0x0),$gameSystem[_0x3677c2(0x3d1)](![]);for(const _0x4aa7a3 of $gamePlayer[_0x3677c2(0x1df)]()[_0x3677c2(0x2b1)]){if(_0x4aa7a3)_0x4aa7a3[_0x3677c2(0x270)](![]);}}),PluginManager['registerCommand'](pluginData['name'],'SwitchGetSelfSwitchABCD',_0xb932d0=>{const _0x2c08e5=_0x39f07d;VisuMZ[_0x2c08e5(0x130)](_0xb932d0,_0xb932d0);const _0x127998=$gameTemp[_0x2c08e5(0x82)]();_0xb932d0[_0x2c08e5(0x108)]=_0xb932d0[_0x2c08e5(0x108)]||$gameMap[_0x2c08e5(0x5cb)]();const _0x384e3a=[_0xb932d0[_0x2c08e5(0x108)],_0xb932d0[_0x2c08e5(0x36d)]||_0x127998[_0x2c08e5(0x4e2)](),_0xb932d0[_0x2c08e5(0x38b)]],_0x50370d=_0xb932d0[_0x2c08e5(0xcf)],_0x45b7af=$gameSelfSwitches[_0x2c08e5(0x319)](_0x384e3a)||![];$gameSwitches['setValue'](_0x50370d,_0x45b7af);}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],'SwitchGetSelfSwitchID',_0x2b4554=>{const _0x2f3aac=_0x39f07d;VisuMZ[_0x2f3aac(0x130)](_0x2b4554,_0x2b4554);const _0x4530f6=$gameTemp[_0x2f3aac(0x82)]();_0x2b4554[_0x2f3aac(0x108)]=_0x2b4554[_0x2f3aac(0x108)]||$gameMap[_0x2f3aac(0x5cb)]();const _0x480fb0=[_0x2b4554[_0x2f3aac(0x108)],_0x2b4554[_0x2f3aac(0x36d)]||_0x4530f6[_0x2f3aac(0x4e2)](),_0x2f3aac(0x4cf)[_0x2f3aac(0x307)](_0x2b4554['SwitchId'])],_0xd163b0=_0x2b4554[_0x2f3aac(0xcf)],_0x1b381a=$gameSelfSwitches[_0x2f3aac(0x319)](_0x480fb0)||![];$gameSwitches['setValue'](_0xd163b0,_0x1b381a);}),PluginManager['registerCommand'](pluginData['name'],_0x39f07d(0x1fb),_0x24809a=>{const _0x214e0b=_0x39f07d;VisuMZ[_0x214e0b(0x130)](_0x24809a,_0x24809a);const _0x2b51e7=$gameTemp[_0x214e0b(0x82)]();_0x24809a[_0x214e0b(0x108)]=_0x24809a['MapId']||$gameMap[_0x214e0b(0x5cb)]();const _0x2d7b2f=[_0x24809a['MapId'],_0x24809a['EventId']||_0x2b51e7[_0x214e0b(0x4e2)](),_0x214e0b(0x24c)[_0x214e0b(0x307)](_0x24809a[_0x214e0b(0x32c)])],_0x5f4b96=_0x24809a[_0x214e0b(0x39a)],_0x5cd29e=$gameSelfSwitches[_0x214e0b(0x319)](_0x2d7b2f)||![];$gameVariables['setValue'](_0x5f4b96,_0x5cd29e);}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x3eb),_0x4626c2=>{const _0x2a1eb1=_0x39f07d;VisuMZ['ConvertParams'](_0x4626c2,_0x4626c2);if(!$gameMap)return;const _0x36ba60=$gameTemp[_0x2a1eb1(0x82)](),_0x5d0530=_0x4626c2['Step2Preserve'];_0x4626c2[_0x2a1eb1(0x1f1)]=_0x4626c2[_0x2a1eb1(0x1f1)]||$gameMap[_0x2a1eb1(0x5cb)](),_0x4626c2[_0x2a1eb1(0x41b)]=_0x4626c2[_0x2a1eb1(0x41b)]||$gameMap[_0x2a1eb1(0x5cb)](),_0x4626c2[_0x2a1eb1(0x5a0)]=_0x4626c2['TemplateName'][_0x2a1eb1(0x321)]()['trim']();if(!_0x5d0530&&_0x4626c2[_0x2a1eb1(0x1f1)]!==$gameMap[_0x2a1eb1(0x5cb)]())return;if($gameMap[_0x2a1eb1(0x5cb)]()===_0x4626c2[_0x2a1eb1(0x1f1)]){const _0x542992=$gameMap[_0x2a1eb1(0x3f5)](_0x4626c2[_0x2a1eb1(0x5a1)]||_0x36ba60[_0x2a1eb1(0x4e2)]());if(!_0x542992)return;_0x4626c2[_0x2a1eb1(0x5a0)]!==_0x2a1eb1(0x8f)?_0x542992['morphIntoTemplate'](_0x4626c2[_0x2a1eb1(0x5a0)]):_0x542992['morphInto'](_0x4626c2[_0x2a1eb1(0x41b)],_0x4626c2['Step2EventId']||_0x36ba60['eventId']());}if(_0x5d0530){if(_0x2a1eb1(0x1ae)!==_0x2a1eb1(0x512))$gameSystem[_0x2a1eb1(0x25d)](_0x4626c2[_0x2a1eb1(0x1f1)],_0x4626c2[_0x2a1eb1(0x5a1)],_0x4626c2[_0x2a1eb1(0x5a0)],_0x4626c2[_0x2a1eb1(0x41b)],_0x4626c2[_0x2a1eb1(0x190)]);else return _0x4a6b2a[_0x2a1eb1(0x41c)][_0x2a1eb1(0x136)][_0x2a1eb1(0x341)](this,_0x3e228e,_0x413d95,_0x57b345);}}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x4fd),_0x38e2c8=>{const _0xbd1c20=_0x39f07d;VisuMZ[_0xbd1c20(0x130)](_0x38e2c8,_0x38e2c8);if(!$gameMap)return;const _0x1cdd46=$gameTemp['getLastPluginCommandInterpreter']();_0x38e2c8['MapId']=_0x38e2c8[_0xbd1c20(0x108)]||$gameMap['mapId']();if($gameMap[_0xbd1c20(0x5cb)]()===_0x38e2c8[_0xbd1c20(0x108)]){const _0x5b4aa7=$gameMap[_0xbd1c20(0x3f5)](_0x38e2c8['EventId']||_0x1cdd46[_0xbd1c20(0x4e2)]());_0x5b4aa7[_0xbd1c20(0x209)]();}_0x38e2c8[_0xbd1c20(0x112)]&&$gameSystem['deletePreservedMorphEventDataKey'](_0x38e2c8[_0xbd1c20(0x108)],_0x38e2c8[_0xbd1c20(0x36d)]||_0x1cdd46[_0xbd1c20(0x4e2)]());}),PluginManager[_0x39f07d(0x340)](pluginData['name'],_0x39f07d(0x111),_0x4f2c09=>{const _0x1491ee=_0x39f07d;VisuMZ[_0x1491ee(0x130)](_0x4f2c09,_0x4f2c09),$gameSystem['setEventIconData']($gamePlayer,_0x4f2c09[_0x1491ee(0x365)],_0x4f2c09[_0x1491ee(0x217)],_0x4f2c09[_0x1491ee(0x23f)],_0x4f2c09[_0x1491ee(0x2dc)]);}),PluginManager['registerCommand'](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x13c),_0x9d4d56=>{const _0x5f0b18=_0x39f07d;VisuMZ[_0x5f0b18(0x130)](_0x9d4d56,_0x9d4d56),$gameSystem[_0x5f0b18(0x98)]($gamePlayer);}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0xe7),_0x30c0cc=>{const _0x5015c5=_0x39f07d;VisuMZ['ConvertParams'](_0x30c0cc,_0x30c0cc),$gameSystem[_0x5015c5(0x539)](!_0x30c0cc[_0x5015c5(0x4a4)]);}),PluginManager['registerCommand'](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x29f),_0x3012e5=>{const _0xc8f88b=_0x39f07d;VisuMZ[_0xc8f88b(0x130)](_0x3012e5,_0x3012e5),$gameSystem[_0xc8f88b(0x3be)](_0x3012e5[_0xc8f88b(0x426)]);}),PluginManager['registerCommand'](pluginData[_0x39f07d(0x3a5)],'SelfDataResetAll',_0x3a2e19=>{const _0x4e82c6=_0x39f07d;VisuMZ[_0x4e82c6(0x130)](_0x3a2e19,_0x3a2e19);const _0x3c5728=_0x3a2e19['MapId']||$gameMap[_0x4e82c6(0x5cb)]();$gameSelfSwitches[_0x4e82c6(0x3fc)](_0x3c5728);}),PluginManager['registerCommand'](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x50b),_0x4929a8=>{const _0x15d617=_0x39f07d;VisuMZ[_0x15d617(0x130)](_0x4929a8,_0x4929a8);const _0x10970a=$gameTemp['getLastPluginCommandInterpreter']();_0x4929a8[_0x15d617(0x108)]=_0x4929a8['MapId']||$gameMap[_0x15d617(0x5cb)]();const _0x2fce6d=[_0x4929a8[_0x15d617(0x108)],_0x4929a8[_0x15d617(0x36d)]||_0x10970a['eventId'](),_0x4929a8[_0x15d617(0x38b)]];switch(_0x4929a8[_0x15d617(0x30f)]){case'ON':$gameSelfSwitches['setValue'](_0x2fce6d,!![]);break;case _0x15d617(0x3fb):$gameSelfSwitches['setValue'](_0x2fce6d,![]);break;case _0x15d617(0x49f):$gameSelfSwitches[_0x15d617(0xf2)](_0x2fce6d,!$gameSelfSwitches[_0x15d617(0x319)](_0x2fce6d));break;}}),PluginManager[_0x39f07d(0x340)](pluginData['name'],_0x39f07d(0x3ed),_0x1edb4b=>{const _0x4a8fd3=_0x39f07d;VisuMZ['ConvertParams'](_0x1edb4b,_0x1edb4b);const _0xe6d7d1=$gameTemp[_0x4a8fd3(0x82)]();_0x1edb4b[_0x4a8fd3(0x108)]=_0x1edb4b['MapId']||$gameMap[_0x4a8fd3(0x5cb)]();const _0x41f86b=[_0x1edb4b[_0x4a8fd3(0x108)],_0x1edb4b[_0x4a8fd3(0x36d)]||_0xe6d7d1[_0x4a8fd3(0x4e2)](),_0x4a8fd3(0x4cf)['format'](_0x1edb4b[_0x4a8fd3(0x346)])];switch(_0x1edb4b[_0x4a8fd3(0x30f)]){case'ON':$gameSelfSwitches[_0x4a8fd3(0xf2)](_0x41f86b,!![]);break;case _0x4a8fd3(0x3fb):$gameSelfSwitches['setValue'](_0x41f86b,![]);break;case _0x4a8fd3(0x49f):$gameSelfSwitches[_0x4a8fd3(0xf2)](_0x41f86b,!$gameSelfSwitches['value'](_0x41f86b));break;}}),PluginManager[_0x39f07d(0x340)](pluginData['name'],'SelfVariableID',_0x5a283f=>{const _0x16d3a3=_0x39f07d;VisuMZ[_0x16d3a3(0x130)](_0x5a283f,_0x5a283f);const _0x3c5c10=$gameTemp[_0x16d3a3(0x82)]();_0x5a283f[_0x16d3a3(0x108)]=_0x5a283f['MapId']||$gameMap['mapId']();const _0x215814=[_0x5a283f[_0x16d3a3(0x108)],_0x5a283f[_0x16d3a3(0x36d)]||_0x3c5c10['eventId'](),_0x16d3a3(0x24c)[_0x16d3a3(0x307)](_0x5a283f['VariableId'])],_0x15b4cd=VisuMZ['OperateValues']($gameSelfSwitches['value'](_0x215814),_0x5a283f[_0x16d3a3(0x30f)],_0x5a283f['Operation']);$gameSelfSwitches[_0x16d3a3(0xf2)](_0x215814,_0x15b4cd);}),PluginManager['registerCommand'](pluginData['name'],_0x39f07d(0x29b),_0x4d19ed=>{const _0x10386d=_0x39f07d;VisuMZ[_0x10386d(0x130)](_0x4d19ed,_0x4d19ed);const _0x33ae2=$gameTemp['getLastPluginCommandInterpreter'](),_0x2f7a64={'template':_0x4d19ed[_0x10386d(0x5a0)],'mapId':_0x4d19ed[_0x10386d(0x108)]||$gameMap['mapId'](),'eventId':_0x4d19ed['EventId']||_0x33ae2[_0x10386d(0x4e2)](),'x':_0x4d19ed[_0x10386d(0x3f7)],'y':_0x4d19ed[_0x10386d(0x122)],'spawnPreserved':_0x4d19ed['Preserve'],'spawnEventId':$gameMap[_0x10386d(0x5b5)][_0x10386d(0x5be)]+0x3e8},_0x50d3fc=_0x4d19ed[_0x10386d(0x1b8)]||0x0;if(!VisuMZ[_0x10386d(0x508)][_0x2f7a64[_0x10386d(0x5cb)]]&&_0x2f7a64[_0x10386d(0x5cb)]!==$gameMap['mapId']()){let _0x366199=_0x10386d(0x1b9)[_0x10386d(0x307)](_0x2f7a64[_0x10386d(0x5cb)]);_0x366199+=_0x10386d(0x311),_0x366199+=_0x10386d(0x4af),_0x366199+=_0x10386d(0x3cb),_0x366199+=_0x10386d(0x5bd)[_0x10386d(0x307)](_0x2f7a64[_0x10386d(0x5cb)]),alert(_0x366199);return;}const _0x18a1cd=$gameMap['prepareSpawnedEventAtXY'](_0x2f7a64,_0x4d19ed[_0x10386d(0x1bb)],_0x4d19ed[_0x10386d(0x47d)]);_0x50d3fc&&$gameSwitches[_0x10386d(0xf2)](_0x50d3fc,!!_0x18a1cd);}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x404),_0xe2b8fc=>{const _0x370f31=_0x39f07d;VisuMZ['ConvertParams'](_0xe2b8fc,_0xe2b8fc);const _0xa37edb=$gameTemp[_0x370f31(0x82)](),_0xb83e9d={'template':_0xe2b8fc[_0x370f31(0x5a0)],'mapId':_0xe2b8fc['MapId']||$gameMap[_0x370f31(0x5cb)](),'eventId':_0xe2b8fc[_0x370f31(0x36d)]||_0xa37edb[_0x370f31(0x4e2)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0xe2b8fc[_0x370f31(0x280)],'spawnEventId':$gameMap['_spawnedEvents'][_0x370f31(0x5be)]+0x3e8},_0x4e253f=_0xe2b8fc[_0x370f31(0x1b8)]||0x0;if(!VisuMZ[_0x370f31(0x508)][_0xb83e9d[_0x370f31(0x5cb)]]&&_0xb83e9d[_0x370f31(0x5cb)]!==$gameMap[_0x370f31(0x5cb)]()){if('sDJCl'!==_0x370f31(0x446)){if(this[_0x370f31(0x523)](_0x3896f6,_0x3a65d8)[_0x370f31(0x5be)]>0x0)return!![];if(_0x4eef32['x']===_0x3fc42e&&_0x9041a8['y']===_0x5ed686)return!![];if(this[_0x370f31(0x556)]()['posNt'](_0x4825bd,_0x2a6642))return!![];if(this[_0x370f31(0x50d)]()['posNt'](_0xdf51a,_0x5d226d))return!![];return![];}else{let _0x37cd0b=_0x370f31(0x1b9)[_0x370f31(0x307)](_0xb83e9d[_0x370f31(0x5cb)]);_0x37cd0b+=_0x370f31(0x311),_0x37cd0b+=_0x370f31(0x4af),_0x37cd0b+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x37cd0b+=_0x370f31(0x5bd)[_0x370f31(0x307)](_0xb83e9d['mapId']),alert(_0x37cd0b);return;}}const _0x16e675=$gameMap[_0x370f31(0xf0)](_0xb83e9d,_0xe2b8fc[_0x370f31(0x35d)],_0xe2b8fc[_0x370f31(0x1bb)],_0xe2b8fc['Passability']);if(_0x4e253f){if(_0x370f31(0x53b)===_0x370f31(0x53b))$gameSwitches[_0x370f31(0xf2)](_0x4e253f,!!_0x16e675);else return this[_0x370f31(0x179)]();}}),PluginManager['registerCommand'](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x437),_0x589c6b=>{const _0x34f9df=_0x39f07d;VisuMZ[_0x34f9df(0x130)](_0x589c6b,_0x589c6b);const _0x2cc662=$gameTemp[_0x34f9df(0x82)](),_0x374d9f={'template':_0x589c6b['TemplateName'],'mapId':_0x589c6b[_0x34f9df(0x108)]||$gameMap[_0x34f9df(0x5cb)](),'eventId':_0x589c6b[_0x34f9df(0x36d)]||_0x2cc662[_0x34f9df(0x4e2)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x589c6b['Preserve'],'spawnEventId':$gameMap[_0x34f9df(0x5b5)][_0x34f9df(0x5be)]+0x3e8},_0x440edf=_0x589c6b[_0x34f9df(0x1b8)]||0x0;if(!VisuMZ[_0x34f9df(0x508)][_0x374d9f[_0x34f9df(0x5cb)]]&&_0x374d9f['mapId']!==$gameMap[_0x34f9df(0x5cb)]()){let _0x4e91fe=_0x34f9df(0x1b9)[_0x34f9df(0x307)](_0x374d9f[_0x34f9df(0x5cb)]);_0x4e91fe+=_0x34f9df(0x311),_0x4e91fe+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x4e91fe+=_0x34f9df(0x3cb),_0x4e91fe+=_0x34f9df(0x5bd)[_0x34f9df(0x307)](_0x374d9f[_0x34f9df(0x5cb)]),alert(_0x4e91fe);return;}const _0x159a28=$gameMap[_0x34f9df(0x1c6)](_0x374d9f,_0x589c6b['TerrainTags'],_0x589c6b[_0x34f9df(0x1bb)],_0x589c6b[_0x34f9df(0x47d)]);_0x440edf&&$gameSwitches['setValue'](_0x440edf,!!_0x159a28);}),PluginManager[_0x39f07d(0x340)](pluginData['name'],_0x39f07d(0x3e0),_0x272d3b=>{const _0x67ea7e=_0x39f07d;VisuMZ[_0x67ea7e(0x130)](_0x272d3b,_0x272d3b);const _0x284084=$gameTemp[_0x67ea7e(0x82)]();$gameMap[_0x67ea7e(0x5a6)](_0x272d3b[_0x67ea7e(0x4b4)]||_0x284084[_0x67ea7e(0x4e2)]());}),PluginManager[_0x39f07d(0x340)](pluginData['name'],_0x39f07d(0x13d),_0x326f8d=>{const _0x445674=_0x39f07d;VisuMZ[_0x445674(0x130)](_0x326f8d,_0x326f8d);const _0x820e49=_0x326f8d['PosX'],_0x5c1db2=_0x326f8d[_0x445674(0x122)];$gameMap[_0x445674(0x54f)](_0x820e49,_0x5c1db2);}),PluginManager[_0x39f07d(0x340)](pluginData[_0x39f07d(0x3a5)],_0x39f07d(0x475),_0x1fc26c=>{const _0x261808=_0x39f07d;VisuMZ['ConvertParams'](_0x1fc26c,_0x1fc26c),$gameMap[_0x261808(0x20f)](_0x1fc26c[_0x261808(0x35d)]);}),PluginManager[_0x39f07d(0x340)](pluginData['name'],'SpawnEventDespawnTerrainTags',_0x36619f=>{const _0x5c7639=_0x39f07d;VisuMZ['ConvertParams'](_0x36619f,_0x36619f),$gameMap[_0x5c7639(0x30c)](_0x36619f['TerrainTags']);}),PluginManager[_0x39f07d(0x340)](pluginData['name'],_0x39f07d(0x40e),_0x22bfbe=>{const _0x511b33=_0x39f07d;VisuMZ[_0x511b33(0x130)](_0x22bfbe,_0x22bfbe),$gameMap[_0x511b33(0x49e)]();}),VisuMZ['EventsMoveCore'][_0x39f07d(0x4a0)]=Scene_Boot[_0x39f07d(0x287)]['onDatabaseLoaded'],Scene_Boot[_0x39f07d(0x287)][_0x39f07d(0x92)]=function(){const _0x1eece3=_0x39f07d;VisuMZ['EventsMoveCore'][_0x1eece3(0x4a0)][_0x1eece3(0x341)](this),this['process_VisuMZ_EventsMoveCore_LoadTemplateMaps'](),this[_0x1eece3(0x282)]();if(VisuMZ[_0x1eece3(0x41c)]['CustomPageConditions'])VisuMZ[_0x1eece3(0x41c)][_0x1eece3(0x504)][_0x1eece3(0x56b)]();},VisuMZ['PreloadedMaps']=[],VisuMZ[_0x39f07d(0x4b9)]={},Scene_Boot['prototype']['process_VisuMZ_EventsMoveCore_LoadTemplateMaps']=function(){const _0x3e2484=_0x39f07d;if(DataManager[_0x3e2484(0x3e5)]()||DataManager[_0x3e2484(0x201)]())return;const _0x5accb6=VisuMZ[_0x3e2484(0x41c)][_0x3e2484(0x2a4)]['Template'],_0x5eff11=_0x5accb6[_0x3e2484(0x4de)][_0x3e2484(0x586)](0x0);for(const _0x2a3f7b of _0x5accb6[_0x3e2484(0xfc)]){_0x2a3f7b[_0x3e2484(0x259)]=_0x2a3f7b[_0x3e2484(0x259)][_0x3e2484(0x321)]()[_0x3e2484(0x577)](),VisuMZ['EventTemplates'][_0x2a3f7b[_0x3e2484(0x259)]]=_0x2a3f7b;if(!_0x5eff11[_0x3e2484(0x310)](_0x2a3f7b[_0x3e2484(0x2d3)]))_0x5eff11[_0x3e2484(0xa6)](_0x2a3f7b[_0x3e2484(0x2d3)]);}for(const _0x4a63e9 of _0x5eff11){if(_0x3e2484(0x470)===_0x3e2484(0x576)){if(!_0x380a07)return;if(!_0x1b8e44['event']())return;const _0x46759d=_0xa74995['event']()[_0x3e2484(0x12b)]||'';if(_0x46759d[_0x3e2484(0x17c)](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){const _0x1597dd=_0x3e2484(0x28a)[_0x3e2484(0x307)](_0x400db0['_mapId'],_0x59f739[_0x3e2484(0x418)]),_0x57db01=_0x446510[_0x3e2484(0x327)](this['_data'])[_0x3e2484(0x48a)](_0x5796f3=>_0x5796f3[_0x3e2484(0xdc)](_0x1597dd));while(_0x57db01[_0x3e2484(0x5be)]>0x0){const _0x3556b3=_0x57db01[_0x3e2484(0x135)]();delete this[_0x3e2484(0x2b1)][_0x3556b3];}}}else{if(VisuMZ[_0x3e2484(0x508)][_0x4a63e9])continue;const _0x52c87c=_0x3e2484(0x4d2)[_0x3e2484(0x307)](_0x4a63e9[_0x3e2484(0x245)](0x3)),_0x3a196a=_0x3e2484(0x38d)[_0x3e2484(0x307)](_0x4a63e9);DataManager[_0x3e2484(0x317)](_0x3a196a,_0x52c87c),setTimeout(this['VisuMZ_Setup_Preload_Map'][_0x3e2484(0x43f)](this,_0x4a63e9,_0x3a196a),0x64);}}},Scene_Boot[_0x39f07d(0x287)][_0x39f07d(0x5a4)]=function(_0x448996,_0x3640c5){const _0x2a7bc5=_0x39f07d;window[_0x3640c5]?(VisuMZ[_0x2a7bc5(0x508)][_0x448996]=window[_0x3640c5],window[_0x3640c5]=undefined):setTimeout(this[_0x2a7bc5(0x5a4)][_0x2a7bc5(0x43f)](this,_0x448996,_0x3640c5),0x64);},VisuMZ[_0x39f07d(0x90)]=[],VisuMZ['SelfSwitches']=[],VisuMZ[_0x39f07d(0x25e)]=[],VisuMZ[_0x39f07d(0x2a2)]=[],VisuMZ['SelfVariables']=[],VisuMZ[_0x39f07d(0x2c3)]=[],Scene_Boot[_0x39f07d(0x287)][_0x39f07d(0x282)]=function(){const _0x405c12=_0x39f07d;for(let _0x41e46f=0x1;_0x41e46f<$dataSystem[_0x405c12(0xe6)][_0x405c12(0x5be)];_0x41e46f++){if(_0x405c12(0x541)!=='PKbdX'){_0x48b186[_0x405c12(0x130)](_0xac68ff,_0x41a285);if(!_0x4d9138)return;const _0x2d5d04=_0x5f4b22[_0x405c12(0x82)]();_0xfb8f7b[_0x405c12(0x108)]=_0x2102a3['MapId']||_0x196a65[_0x405c12(0x5cb)]();if(_0x2db293['mapId']()===_0x2140af[_0x405c12(0x108)]){const _0x59ed84=_0x39584f['event'](_0x2fb086['EventId']||_0x2d5d04[_0x405c12(0x4e2)]());_0x59ed84[_0x405c12(0x209)]();}_0x22b779['RemovePreserve']&&_0x285af9[_0x405c12(0xb8)](_0x55113c[_0x405c12(0x108)],_0x36aa0f[_0x405c12(0x36d)]||_0x2d5d04[_0x405c12(0x4e2)]());}else{if($dataSystem[_0x405c12(0xe6)][_0x41e46f][_0x405c12(0x17c)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x405c12(0x90)][_0x405c12(0xa6)](_0x41e46f);if($dataSystem[_0x405c12(0xe6)][_0x41e46f][_0x405c12(0x17c)](/<SELF>/i))VisuMZ[_0x405c12(0x4f1)][_0x405c12(0xa6)](_0x41e46f);if($dataSystem[_0x405c12(0xe6)][_0x41e46f][_0x405c12(0x17c)](/<MAP>/i))VisuMZ['MapSwitches'][_0x405c12(0xa6)](_0x41e46f);}}for(let _0xde9cdd=0x1;_0xde9cdd<$dataSystem[_0x405c12(0x178)][_0x405c12(0x5be)];_0xde9cdd++){if('ygAEB'!==_0x405c12(0x1d1)){if($dataSystem[_0x405c12(0x178)][_0xde9cdd][_0x405c12(0x17c)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x405c12(0x2a2)][_0x405c12(0xa6)](_0xde9cdd);if($dataSystem[_0x405c12(0x178)][_0xde9cdd][_0x405c12(0x17c)](/<SELF>/i))VisuMZ[_0x405c12(0x4a8)][_0x405c12(0xa6)](_0xde9cdd);if($dataSystem[_0x405c12(0x178)][_0xde9cdd][_0x405c12(0x17c)](/<MAP>/i))VisuMZ['MapVariables'][_0x405c12(0xa6)](_0xde9cdd);}else this['_PlayerDiagonalSetting']=_0x5770f1(_0x51632b)[_0x405c12(0x394)]()[_0x405c12(0x577)]();}},VisuMZ['EventsMoveCore'][_0x39f07d(0x504)]={},VisuMZ[_0x39f07d(0x41c)]['CustomPageConditions'][_0x39f07d(0x56b)]=function(){const _0x1032b4=_0x39f07d;this[_0x1032b4(0x34c)]=new Game_CPCInterpreter(),this['determineCommonEventsWithCPC']();},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x504)]['determineCommonEventsWithCPC']=function(){const _0x23dcd6=_0x39f07d;this[_0x23dcd6(0x4f3)]=[];for(const _0x5819f5 of $dataCommonEvents){if(_0x23dcd6(0xcd)!==_0x23dcd6(0xb1)){if(!_0x5819f5)continue;VisuMZ[_0x23dcd6(0x41c)]['CustomPageConditions']['loadCPC'](_0x5819f5);if(_0x5819f5['CPC'][_0x23dcd6(0x5be)]>0x0)this['_commonEvents'][_0x23dcd6(0xa6)](_0x5819f5['id']);}else{const _0x2be100=this[_0x23dcd6(0x3f5)]();return _0x47fbfc['EventsMoveCore'][_0x23dcd6(0x504)][_0x23dcd6(0x513)](this['event']()[_0x23dcd6(0x2bc)],this[_0x23dcd6(0x4dd)],_0x2be100);}}},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x504)][_0x39f07d(0x513)]=function(_0xb322e3,_0x21cc99,_0x283bc8){const _0x48b904=_0x39f07d;return this['_interpreter'][_0x48b904(0x5ac)](_0xb322e3,_0x21cc99),_0x283bc8?this[_0x48b904(0x34c)][_0x48b904(0x54d)](_0x283bc8):this[_0x48b904(0x34c)]['execute'](),this[_0x48b904(0x34c)][_0x48b904(0x1d2)];},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x504)][_0x39f07d(0x21a)]=function(_0x1d4681){const _0x5dfa53=_0x39f07d;let _0x10a98b=![];_0x1d4681[_0x5dfa53(0x2bc)]=[];for(const _0x1bdbed of _0x1d4681[_0x5dfa53(0x22c)]){if([0x6c,0x198]['includes'](_0x1bdbed['code'])){const _0x13d405=_0x1bdbed['parameters'][0x0];if(_0x13d405[_0x5dfa53(0x17c)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x10a98b=!![];else{if(_0x13d405[_0x5dfa53(0x17c)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)){if('tOfCQ'===_0x5dfa53(0x26a))_0x10a98b=![];else{let _0x5c588a=_0x5dfa53(0x1b9)['format'](_0x4c41b5['mapId']);_0x5c588a+=_0x5dfa53(0x311),_0x5c588a+=_0x5dfa53(0x4af),_0x5c588a+=_0x5dfa53(0x3cb),_0x5c588a+=_0x5dfa53(0x5bd)[_0x5dfa53(0x307)](_0x2330fc['mapId']),_0x1f2fc9(_0x5c588a);return;}}}}if(_0x10a98b){if(_0x5dfa53(0x256)!=='MGgPG'){if(this[_0x5dfa53(0x52b)](_0x1e6915,_0x3b0f16,0x2))return!![];if(this['isPassable'](_0x58b230,_0x4b11b4,0x4))return!![];if(this[_0x5dfa53(0x52b)](_0x341bbf,_0xc3beaa,0x6))return!![];if(this[_0x5dfa53(0x52b)](_0x2df569,_0x2bc84d,0x8))return!![];return![];}else _0x1d4681[_0x5dfa53(0x2bc)][_0x5dfa53(0xa6)](_0x1bdbed);}}},getSelfSwitchValue=function(_0x1b297c,_0x3790f4,_0x5f0a90){const _0x553482=_0x39f07d;let _0x14c651=[_0x1b297c,_0x3790f4,_0x553482(0x4cf)[_0x553482(0x307)](_0x5f0a90)];return typeof _0x5f0a90===_0x553482(0x134)&&('ctglz'===_0x553482(0xba)?_0x14c651=[_0x1b297c,_0x3790f4,_0x5f0a90[_0x553482(0x321)]()[_0x553482(0x577)]()]:[0x6c,0x198]['includes'](_0x2b5b32['code'])&&(_0x41c25d+=_0x471a4f[_0x553482(0x28d)][0x0])),$gameSelfSwitches[_0x553482(0x319)](_0x14c651);},getMapSwitchValue=function(_0x4df80b,_0x2521cc){const _0x2762ca=_0x39f07d;let _0x524c5b=[0x0,0x0,_0x2762ca(0x2e3)[_0x2762ca(0x307)](_0x4df80b,_0x2521cc)];return $gameSelfSwitches[_0x2762ca(0x319)](_0x524c5b);},getMapVariableValue=function(_0x6cf0f,_0x54b666){const _0x5d2e50=_0x39f07d;let _0x1c56af=[0x0,0x0,_0x5d2e50(0x57f)[_0x5d2e50(0x307)](_0x6cf0f,_0x54b666)];return $gameSelfSwitches[_0x5d2e50(0x319)](_0x1c56af);},getSelfVariableValue=function(_0xca2eda,_0x15ca21,_0x28b305){const _0x1015fe=_0x39f07d,_0x10b08b=[_0xca2eda,_0x15ca21,_0x1015fe(0x24c)[_0x1015fe(0x307)](_0x28b305)];return $gameSelfSwitches[_0x1015fe(0x319)](_0x10b08b);},setSelfSwitchValue=function(_0x3d0c32,_0x464d56,_0x3efdda,_0x1e660b){const _0x77a7d=_0x39f07d;let _0x2d68e0=[_0x3d0c32,_0x464d56,'Self\x20Switch\x20%1'[_0x77a7d(0x307)](_0x3efdda)];if(typeof _0x3efdda===_0x77a7d(0x134)){if(_0x77a7d(0x211)!=='KLdlg')_0x2d68e0=[_0x3d0c32,_0x464d56,_0x3efdda[_0x77a7d(0x321)]()[_0x77a7d(0x577)]()];else{if([0x6c,0x198][_0x77a7d(0x310)](_0x490774[_0x77a7d(0x206)])){if(_0x15afca!=='')_0x26a832+='\x0a';_0x5e05e0+=_0x556d31[_0x77a7d(0x28d)][0x0];}}}$gameSelfSwitches[_0x77a7d(0xf2)](_0x2d68e0,_0x1e660b);},setSelfVariableValue=function(_0x24a939,_0x16d895,_0x3ad0ca,_0x580cdd){const _0x36bb14=_0x39f07d,_0x2fb5a0=[_0x24a939,_0x16d895,_0x36bb14(0x24c)[_0x36bb14(0x307)](_0x3ad0ca)];$gameSelfSwitches['setValue'](_0x2fb5a0,_0x580cdd);},setMapSwitchValue=function(_0x13e1a9,_0x39b927,_0x395f4f){const _0x14d8f8=_0x39f07d;let _0x1e1e38=[0x0,0x0,_0x14d8f8(0x2e3)['format'](_0x13e1a9,_0x39b927)];$gameSelfSwitches[_0x14d8f8(0xf2)](_0x1e1e38,_0x395f4f);},setMapVariableValue=function(_0x26f6be,_0x52f2d2,_0x1b618e){const _0x280cb5=_0x39f07d;let _0x364317=[0x0,0x0,_0x280cb5(0x57f)[_0x280cb5(0x307)](_0x26f6be,_0x52f2d2)];$gameSelfSwitches[_0x280cb5(0xf2)](_0x364317,_0x1b618e);},DataManager[_0x39f07d(0x314)]=function(_0xe4d62d){const _0x5c8bb1=_0x39f07d;if(SceneManager[_0x5c8bb1(0x1bd)][_0x5c8bb1(0x113)]===Scene_Debug)return![];return VisuMZ[_0x5c8bb1(0x90)][_0x5c8bb1(0x310)](_0xe4d62d);},DataManager[_0x39f07d(0x1bc)]=function(_0xcf951c){const _0x499b51=_0x39f07d;if(SceneManager[_0x499b51(0x1bd)][_0x499b51(0x113)]===Scene_Debug)return![];return VisuMZ[_0x499b51(0x2a2)][_0x499b51(0x310)](_0xcf951c);},DataManager[_0x39f07d(0x1b4)]=function(_0x24c720){const _0x9d099f=_0x39f07d;if(SceneManager[_0x9d099f(0x1bd)][_0x9d099f(0x113)]===Scene_Debug)return![];return VisuMZ['SelfSwitches'][_0x9d099f(0x310)](_0x24c720);},DataManager[_0x39f07d(0x4f6)]=function(_0x1592a6){const _0x467fa5=_0x39f07d;if(SceneManager[_0x467fa5(0x1bd)][_0x467fa5(0x113)]===Scene_Debug)return![];return VisuMZ[_0x467fa5(0x4a8)][_0x467fa5(0x310)](_0x1592a6);},DataManager[_0x39f07d(0x27d)]=function(_0x481267){const _0x41f279=_0x39f07d;if(BattleManager[_0x41f279(0x3e5)]())return![];return VisuMZ[_0x41f279(0x25e)][_0x41f279(0x310)](_0x481267);},DataManager[_0x39f07d(0x1e4)]=function(_0x479e13){const _0x20a7cc=_0x39f07d;if(BattleManager[_0x20a7cc(0x3e5)]())return![];return VisuMZ[_0x20a7cc(0x2c3)]['includes'](_0x479e13);},SceneManager[_0x39f07d(0x323)]=function(){const _0x5188b4=_0x39f07d;return this[_0x5188b4(0x1bd)]&&this[_0x5188b4(0x1bd)]['constructor']===Scene_Map;},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x533)]=Game_Temp['prototype'][_0x39f07d(0xc8)],Game_Temp[_0x39f07d(0x287)][_0x39f07d(0xc8)]=function(_0x276ac6,_0x5848e7){const _0x1037d2=_0x39f07d;if(this[_0x1037d2(0x194)](_0x276ac6,_0x5848e7))return;VisuMZ[_0x1037d2(0x41c)][_0x1037d2(0x533)][_0x1037d2(0x341)](this,_0x276ac6,_0x5848e7);},Game_Temp['prototype'][_0x39f07d(0x194)]=function(_0x4e9feb,_0x5298f3){const _0x3c1ec8=_0x39f07d,_0x11ef62=$gameMap['eventsXy'](_0x4e9feb,_0x5298f3);for(const _0x4e9af8 of _0x11ef62){if(_0x3c1ec8(0x2e0)==='wkNrT'){if(_0x4e9af8&&_0x4e9af8['hasClickTrigger']())return _0x4e9af8[_0x3c1ec8(0x4b3)](),!![];}else return!!this['mapValue'](_0x34a4be);}return TouchInput[_0x3c1ec8(0x467)]()&&_0x11ef62[_0x3c1ec8(0x5be)]>0x0&&('mfzVA'===_0x3c1ec8(0x215)?(_0x6195fa[_0x3c1ec8(0x332)]=_0x1c7277,_0x36e170[_0x3c1ec8(0x1ce)]()):TouchInput[_0x3c1ec8(0x32d)]()),![];},Game_Temp[_0x39f07d(0x287)][_0x39f07d(0x514)]=function(_0x5cc4e7){this['_lastPluginCommandInterpreter']=_0x5cc4e7;},Game_Temp['prototype'][_0x39f07d(0x82)]=function(){const _0x5fd111=_0x39f07d;return this[_0x5fd111(0x1a9)];},Game_Temp[_0x39f07d(0x287)][_0x39f07d(0x45f)]=function(_0x135037){const _0xdf0056=_0x39f07d;this[_0xdf0056(0x2eb)]=_0x135037;},Game_Temp[_0x39f07d(0x287)][_0x39f07d(0x4ae)]=function(){const _0x3855b5=_0x39f07d;this[_0x3855b5(0x2eb)]=undefined;},Game_Temp['prototype'][_0x39f07d(0x4df)]=function(){const _0xf1fe7c=_0x39f07d;return this[_0xf1fe7c(0x2eb)];},VisuMZ['EventsMoveCore'][_0x39f07d(0x1cc)]=Game_System[_0x39f07d(0x287)][_0x39f07d(0x56b)],Game_System[_0x39f07d(0x287)][_0x39f07d(0x56b)]=function(){const _0x1d808c=_0x39f07d;VisuMZ[_0x1d808c(0x41c)][_0x1d808c(0x1cc)][_0x1d808c(0x341)](this),this[_0x1d808c(0x8b)](),this[_0x1d808c(0x52d)]();},Game_System['prototype'][_0x39f07d(0x8b)]=function(){const _0x224af8=_0x39f07d;this['_EventsMoveCoreSettings']={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this['_EventIcons']={},this[_0x224af8(0x3a0)]=[],this[_0x224af8(0x3c0)]={},this[_0x224af8(0x1ad)]={},this['_DisablePlayerControl']=![],this['_PlayerDiagonalSetting']=_0x224af8(0x480);},Game_System['prototype'][_0x39f07d(0x1fe)]=function(){const _0x2755b4=_0x39f07d;if(this[_0x2755b4(0x564)]===undefined)this[_0x2755b4(0x8b)]();if(this['_EventsMoveCoreSettings'][_0x2755b4(0x119)]===undefined)this['initEventsMoveCore']();return this['_EventsMoveCoreSettings'][_0x2755b4(0x119)];},Game_System[_0x39f07d(0x287)][_0x39f07d(0x4d9)]=function(_0x3d322e){const _0x1c5b0c=_0x39f07d;if(this[_0x1c5b0c(0x564)]===undefined)this[_0x1c5b0c(0x8b)]();if(this[_0x1c5b0c(0x564)][_0x1c5b0c(0x119)]===undefined)this[_0x1c5b0c(0x8b)]();this['_EventsMoveCoreSettings'][_0x1c5b0c(0x119)]=_0x3d322e;},Game_System['prototype'][_0x39f07d(0x42d)]=function(){const _0x57c09e=_0x39f07d;if(this[_0x57c09e(0x564)]===undefined)this[_0x57c09e(0x8b)]();if(this[_0x57c09e(0x564)][_0x57c09e(0x4ac)]===undefined)this[_0x57c09e(0x8b)]();return this['_EventsMoveCoreSettings'][_0x57c09e(0x4ac)];},Game_System[_0x39f07d(0x287)][_0x39f07d(0x449)]=function(_0x13ba72){const _0x3e8bf2=_0x39f07d;if(this['_EventsMoveCoreSettings']===undefined)this[_0x3e8bf2(0x8b)]();if(this[_0x3e8bf2(0x564)][_0x3e8bf2(0x4ac)]===undefined)this['initEventsMoveCore']();this['_EventsMoveCoreSettings'][_0x3e8bf2(0x4ac)]=_0x13ba72;},Game_System[_0x39f07d(0x287)][_0x39f07d(0x19c)]=function(){const _0x1e262d=_0x39f07d;if(this[_0x1e262d(0x564)]===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings'][_0x1e262d(0x2de)]===undefined)this[_0x1e262d(0x8b)]();return this[_0x1e262d(0x564)]['VisibleEventLabels'];},Game_System[_0x39f07d(0x287)]['setEventLabelsVisible']=function(_0x58bff6){const _0x343ddb=_0x39f07d;if(this[_0x343ddb(0x564)]===undefined)this[_0x343ddb(0x8b)]();if(this[_0x343ddb(0x564)][_0x343ddb(0x2de)]===undefined)this[_0x343ddb(0x8b)]();this[_0x343ddb(0x564)][_0x343ddb(0x2de)]=_0x58bff6;},Game_System[_0x39f07d(0x287)][_0x39f07d(0x241)]=function(){const _0x4bccc8=_0x39f07d;return this['_DisablePlayerControl']===undefined&&(this[_0x4bccc8(0x269)]=![]),this[_0x4bccc8(0x269)];},Game_System['prototype']['setPlayerControlDisable']=function(_0x2b1cfa){const _0x33fe13=_0x39f07d;this[_0x33fe13(0x269)]=_0x2b1cfa;},Game_System[_0x39f07d(0x287)][_0x39f07d(0x352)]=function(){const _0x2efcbc=_0x39f07d;return this[_0x2efcbc(0x273)];},Game_System[_0x39f07d(0x287)][_0x39f07d(0x3be)]=function(_0x1be238){const _0x2d8aa2=_0x39f07d;this[_0x2d8aa2(0x273)]=String(_0x1be238)[_0x2d8aa2(0x394)]()['trim']();},Game_System[_0x39f07d(0x287)][_0x39f07d(0x4c5)]=function(_0x52a32a){const _0x5a5912=_0x39f07d;if(this['_EventIcons']===undefined)this[_0x5a5912(0x8b)]();if(!_0x52a32a)return null;if(_0x52a32a===$gamePlayer){if(_0x5a5912(0x10c)!=='hMAZV')return this[_0x5a5912(0x10b)][_0x5a5912(0x2e6)];else{if(!this['isNormalPriority']())return![];else{const _0x10d2c1=_0x4ef3cd[_0x5a5912(0x2ad)](_0x5b911d,_0x37b420)['filter'](_0x18bcbd=>_0x18bcbd!==this&&_0x18bcbd[_0x5a5912(0x36c)]());return _0x10d2c1[_0x5a5912(0x5be)]>0x0;}}}else{if(_0x5a5912(0x47e)!==_0x5a5912(0x47e))this[_0x5a5912(0x1fc)]=0x0;else{const _0x508f28=VisuMZ[_0x5a5912(0x41c)][_0x5a5912(0x2a4)],_0x3fd1f9='Map%1-Event%2'[_0x5a5912(0x307)](_0x52a32a[_0x5a5912(0x1c1)],_0x52a32a['_eventId']);return this[_0x5a5912(0x10b)][_0x3fd1f9]=this['_EventIcons'][_0x3fd1f9]||{'iconIndex':0x0,'bufferX':_0x508f28['Icon']['BufferX'],'bufferY':_0x508f28[_0x5a5912(0x3b2)][_0x5a5912(0x435)],'blendMode':_0x508f28['Icon'][_0x5a5912(0x3b9)]},this['_EventIcons'][_0x3fd1f9];}}},Game_System[_0x39f07d(0x287)]['setEventIconData']=function(_0x4970be,_0x313ae2,_0xf62487,_0x5cd550,_0x52c5fc){const _0x4dadda=_0x39f07d;if(this['_EventIcons']===undefined)this[_0x4dadda(0x8b)]();const _0x1f74e7=_0x4970be===$gamePlayer?_0x4dadda(0x2e6):_0x4dadda(0xa4)[_0x4dadda(0x307)](_0x4970be[_0x4dadda(0x1c1)],_0x4970be['_eventId']);this[_0x4dadda(0x10b)][_0x1f74e7]={'iconIndex':_0x313ae2,'bufferX':_0xf62487,'bufferY':_0x5cd550,'blendMode':_0x52c5fc};},Game_System[_0x39f07d(0x287)]['setEventIconDataKey']=function(_0x34efae,_0x31f911,_0x3b00fa,_0x320f32,_0x475d9c,_0x4a3426){const _0xaf3dfd=_0x39f07d;if(this[_0xaf3dfd(0x10b)]===undefined)this[_0xaf3dfd(0x8b)]();const _0x396287=_0xaf3dfd(0xa4)[_0xaf3dfd(0x307)](_0x34efae,_0x31f911);this['_EventIcons'][_0x396287]={'iconIndex':_0x3b00fa,'bufferX':_0x320f32,'bufferY':_0x475d9c,'blendMode':_0x4a3426};},Game_System[_0x39f07d(0x287)][_0x39f07d(0x98)]=function(_0x34c916){const _0x76ddb3=_0x39f07d;if(this[_0x76ddb3(0x10b)]===undefined)this[_0x76ddb3(0x8b)]();if(!_0x34c916)return null;if(_0x34c916===$gamePlayer){if(_0x76ddb3(0x589)!==_0x76ddb3(0x589)){if(_0x57e1b2[_0x76ddb3(0x178)][_0x15df18][_0x76ddb3(0x17c)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x464f77[_0x76ddb3(0x2a2)][_0x76ddb3(0xa6)](_0x169852);if(_0x5fb7['variables'][_0xcca828]['match'](/<SELF>/i))_0x3d48d3[_0x76ddb3(0x4a8)][_0x76ddb3(0xa6)](_0x517a57);if(_0x159926[_0x76ddb3(0x178)][_0x3ff89c][_0x76ddb3(0x17c)](/<MAP>/i))_0x41ae0d[_0x76ddb3(0x2c3)][_0x76ddb3(0xa6)](_0x2c5a52);}else delete this[_0x76ddb3(0x10b)][_0x76ddb3(0x2e6)];}else this[_0x76ddb3(0x580)](_0x34c916[_0x76ddb3(0x1c1)],_0x34c916['_eventId']);},Game_System['prototype'][_0x39f07d(0x580)]=function(_0x4f2966,_0x1e6ca8){const _0x40df00=_0x39f07d;if(this[_0x40df00(0x10b)]===undefined)this['initEventsMoveCore']();const _0x5e2882=_0x40df00(0xa4)[_0x40df00(0x307)](_0x4f2966,_0x1e6ca8);delete this[_0x40df00(0x10b)][_0x5e2882];},Game_System['prototype'][_0x39f07d(0x14f)]=function(_0x1c0873){const _0x4676f7=_0x39f07d;if(this[_0x4676f7(0x1ad)]===undefined)this[_0x4676f7(0x8b)]();if(!_0x1c0873)return null;const _0x29032a=_0x4676f7(0xa4)[_0x4676f7(0x307)](_0x1c0873[_0x4676f7(0x1c1)],_0x1c0873[_0x4676f7(0x418)]);return this[_0x4676f7(0x1ad)][_0x29032a];},Game_System['prototype']['saveEventLocation']=function(_0x1af08c){const _0x259b53=_0x39f07d;if(this[_0x259b53(0x1ad)]===undefined)this[_0x259b53(0x8b)]();if(!_0x1af08c)return;const _0x10b61f=_0x259b53(0xa4)[_0x259b53(0x307)](_0x1af08c[_0x259b53(0x1c1)],_0x1af08c[_0x259b53(0x418)]);this[_0x259b53(0x1ad)][_0x10b61f]={'direction':_0x1af08c[_0x259b53(0x151)](),'x':Math[_0x259b53(0x289)](_0x1af08c['x']),'y':Math[_0x259b53(0x289)](_0x1af08c['y']),'pageIndex':_0x1af08c['_pageIndex'],'moveRouteIndex':_0x1af08c[_0x259b53(0x5c2)]};},Game_System[_0x39f07d(0x287)]['deleteSavedEventLocation']=function(_0x1015e3){const _0x55879a=_0x39f07d;if(this['_SavedEventLocations']===undefined)this[_0x55879a(0x8b)]();if(!_0x1015e3)return;this[_0x55879a(0x2cc)](_0x1015e3[_0x55879a(0x1c1)],_0x1015e3[_0x55879a(0x418)]);},Game_System[_0x39f07d(0x287)][_0x39f07d(0x2cc)]=function(_0x23a5b9,_0x9f101c){const _0x2343b0=_0x39f07d;if(this[_0x2343b0(0x1ad)]===undefined)this[_0x2343b0(0x8b)]();const _0x1f717a=_0x2343b0(0xa4)[_0x2343b0(0x307)](_0x23a5b9,_0x9f101c);delete this[_0x2343b0(0x1ad)][_0x1f717a];},Game_System['prototype'][_0x39f07d(0x33b)]=function(_0x59ceba,_0x25fa20,_0x52f13,_0x26ad16,_0xd3a06a,_0x331f5f,_0x219c59){const _0x1c6d48=_0x39f07d;if(this['_SavedEventLocations']===undefined)this[_0x1c6d48(0x8b)]();const _0x4cf4ff=_0x1c6d48(0xa4)[_0x1c6d48(0x307)](_0x59ceba,_0x25fa20);this[_0x1c6d48(0x1ad)][_0x4cf4ff]={'direction':_0xd3a06a,'x':Math[_0x1c6d48(0x289)](_0x52f13),'y':Math[_0x1c6d48(0x289)](_0x26ad16),'pageIndex':_0x331f5f,'moveRouteIndex':_0x219c59};},Game_System[_0x39f07d(0x287)][_0x39f07d(0xb2)]=function(_0x4fcedf){const _0x4e71fe=_0x39f07d;if(this[_0x4e71fe(0x3c0)]===undefined)this[_0x4e71fe(0x8b)]();if(!_0x4fcedf)return;const _0x3eaaf8='Map%1-Event%2'[_0x4e71fe(0x307)](_0x4fcedf['_mapId'],_0x4fcedf[_0x4e71fe(0x418)]);return this[_0x4e71fe(0x3c0)][_0x3eaaf8];},Game_System[_0x39f07d(0x287)]['savePreservedMorphEventDataKey']=function(_0x591237,_0x3b3756,_0x231caf,_0x5241cc,_0x324bff){const _0x3e7245=_0x39f07d;if(this[_0x3e7245(0x3c0)]===undefined)this[_0x3e7245(0x8b)]();const _0x489b34=_0x3e7245(0xa4)[_0x3e7245(0x307)](_0x591237,_0x3b3756);this['_PreservedEventMorphData'][_0x489b34]={'template':_0x231caf,'mapId':_0x5241cc,'eventId':_0x324bff};},Game_System[_0x39f07d(0x287)][_0x39f07d(0xb8)]=function(_0xe57dd8,_0x849058){const _0x1202d4=_0x39f07d;if(this['_PreservedEventMorphData']===undefined)this[_0x1202d4(0x8b)]();const _0x2b511c='Map%1-Event%2'[_0x1202d4(0x307)](_0xe57dd8,_0x849058);delete this[_0x1202d4(0x3c0)][_0x2b511c];},Game_System[_0x39f07d(0x287)][_0x39f07d(0x19e)]=function(_0x46c6ad){const _0x1f6e65=_0x39f07d;if(this[_0x1f6e65(0x3a0)]===undefined)this[_0x1f6e65(0x8b)]();return this[_0x1f6e65(0x3a0)][_0x46c6ad]=this[_0x1f6e65(0x3a0)][_0x46c6ad]||[],this[_0x1f6e65(0x3a0)][_0x46c6ad];},Game_System[_0x39f07d(0x287)][_0x39f07d(0x381)]=function(_0x21f613){const _0x5774eb=_0x39f07d,_0x3f035a=this[_0x5774eb(0x19e)](_0x21f613);for(const _0x4f4bb9 of _0x3f035a){if(!_0x4f4bb9)continue;if(_0x4f4bb9[_0x5774eb(0x106)])continue;const _0x5cce1f=_0x3f035a[_0x5774eb(0x362)](_0x4f4bb9);_0x3f035a[_0x5cce1f]=null;}},Game_System[_0x39f07d(0x287)][_0x39f07d(0x52d)]=function(){const _0xe2e0d9=_0x39f07d;this[_0xe2e0d9(0xbd)]=0x0,this['_followerChaseOff']=![];},Game_System[_0x39f07d(0x287)][_0x39f07d(0x432)]=function(){const _0x3684a9=_0x39f07d;if(this[_0x3684a9(0xbd)]===undefined)this[_0x3684a9(0x52d)]();return this[_0x3684a9(0xbd)];},Game_System[_0x39f07d(0x287)][_0x39f07d(0xc4)]=function(_0xb8032b){if(this['_followerControlID']===undefined)this['initFollowerController']();this['_followerControlID']=_0xb8032b;;},VisuMZ[_0x39f07d(0x41c)]['Game_Interpreter_character']=Game_Interpreter[_0x39f07d(0x287)][_0x39f07d(0x333)],Game_Interpreter[_0x39f07d(0x287)][_0x39f07d(0x333)]=function(_0x435be3){const _0x108019=_0x39f07d;if(!$gameParty[_0x108019(0x46e)]()&&_0x435be3<0x0){if(_0x108019(0x3a8)===_0x108019(0x3a8)){let _0x13de52=$gameSystem[_0x108019(0x432)]();if(_0x13de52>0x0){if(_0x108019(0x3f9)===_0x108019(0x3f9))return $gamePlayer[_0x108019(0x1df)]()[_0x108019(0x4d3)](_0x13de52-0x1);else{if(_0x2a336f)this['processMoveRouteTeleportTo'](_0x320b26['x'],_0x42ae98['y']);}}}else this[_0x108019(0x121)](_0xb5e5c1,_0xccee35['x']+0x2,_0x1f7541['y']);}return VisuMZ['EventsMoveCore']['Game_Interpreter_character'][_0x108019(0x341)](this,_0x435be3);},Game_System['prototype'][_0x39f07d(0xce)]=function(){const _0x3d70fc=_0x39f07d;if(this[_0x3d70fc(0x219)]===undefined)this[_0x3d70fc(0x52d)]();return this[_0x3d70fc(0x219)];},Game_System['prototype'][_0x39f07d(0x3d1)]=function(_0x280bfe){const _0x341011=_0x39f07d;if(this[_0x341011(0x219)]===undefined)this[_0x341011(0x52d)]();this['_followerChaseOff']=_0x280bfe;;},VisuMZ['EventsMoveCore']['Game_Followers_jumpAll']=Game_Followers['prototype'][_0x39f07d(0x4b7)],Game_Followers[_0x39f07d(0x287)][_0x39f07d(0x4b7)]=function(){const _0xd29335=_0x39f07d;if($gameSystem[_0xd29335(0xce)]())return;VisuMZ[_0xd29335(0x41c)]['Game_Followers_jumpAll'][_0xd29335(0x341)](this);},VisuMZ['EventsMoveCore'][_0x39f07d(0x443)]=Game_Timer[_0x39f07d(0x287)][_0x39f07d(0x56b)],Game_Timer['prototype']['initialize']=function(){const _0x2d9d09=_0x39f07d;VisuMZ[_0x2d9d09(0x41c)][_0x2d9d09(0x443)][_0x2d9d09(0x341)](this),this[_0x2d9d09(0x8b)]();},Game_Timer['prototype'][_0x39f07d(0x8b)]=function(){const _0x30c17d=_0x39f07d;this[_0x30c17d(0x176)]=![],this[_0x30c17d(0x2aa)]=-0x1,this[_0x30c17d(0x5ab)]=0x0;},Game_Timer[_0x39f07d(0x287)][_0x39f07d(0x12e)]=function(_0x136d75){const _0x6f85fd=_0x39f07d;if(!_0x136d75)return;if(!this[_0x6f85fd(0x291)])return;if(this[_0x6f85fd(0x176)])return;if(this['_frames']<=0x0)return;if(this[_0x6f85fd(0x2aa)]===undefined)this[_0x6f85fd(0x8b)]();this[_0x6f85fd(0x4c0)]+=this[_0x6f85fd(0x2aa)],this['_frames']<=0x0&&this[_0x6f85fd(0x1c8)]();},VisuMZ[_0x39f07d(0x41c)]['Game_Timer_start']=Game_Timer[_0x39f07d(0x287)][_0x39f07d(0xfa)],Game_Timer['prototype'][_0x39f07d(0xfa)]=function(_0xe7fe1d){const _0xc69ec9=_0x39f07d;VisuMZ[_0xc69ec9(0x41c)]['Game_Timer_start'][_0xc69ec9(0x341)](this,_0xe7fe1d);if(this[_0xc69ec9(0x176)]===undefined)this[_0xc69ec9(0x8b)]();this[_0xc69ec9(0x176)]=![];},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x31b)]=Game_Timer[_0x39f07d(0x287)][_0x39f07d(0x58f)],Game_Timer['prototype'][_0x39f07d(0x58f)]=function(){const _0x1e7bdf=_0x39f07d;VisuMZ[_0x1e7bdf(0x41c)][_0x1e7bdf(0x31b)][_0x1e7bdf(0x341)](this);if(this[_0x1e7bdf(0x176)]===undefined)this[_0x1e7bdf(0x8b)]();this[_0x1e7bdf(0x176)]=![];},Game_Timer['prototype']['pause']=function(){const _0x2983bd=_0x39f07d;if(this[_0x2983bd(0x4c0)]<=0x0)return;this['_paused']=!![],this['_working']=!![];},Game_Timer[_0x39f07d(0x287)]['resume']=function(){const _0x22030f=_0x39f07d;if(this['_frames']<=0x0)return;this['_paused']=![],this[_0x22030f(0x291)]=!![];},Game_Timer[_0x39f07d(0x287)][_0x39f07d(0x170)]=function(_0x2b4c75){const _0x1e4751=_0x39f07d;this['_frames']=this[_0x1e4751(0x4c0)]||0x0,this['_frames']+=_0x2b4c75,this[_0x1e4751(0x291)]=!![],this[_0x1e4751(0x4c0)]=Math['max'](0x1,this[_0x1e4751(0x4c0)]);},Game_Timer[_0x39f07d(0x287)][_0x39f07d(0x598)]=function(_0x32345b){const _0x3bdabc=_0x39f07d;this[_0x3bdabc(0x4c0)]=this[_0x3bdabc(0x4c0)]||0x0,this['_frames']=_0x32345b,this[_0x3bdabc(0x291)]=!![],this['_frames']=Math['max'](0x1,this[_0x3bdabc(0x4c0)]);},Game_Timer[_0x39f07d(0x287)][_0x39f07d(0x528)]=function(_0x429156){const _0x44157a=_0x39f07d;this['_speed']=_0x429156,this[_0x44157a(0x291)]=!![],_0x429156>0x0&&(_0x44157a(0x252)!==_0x44157a(0x253)?this[_0x44157a(0x4c0)]=Math[_0x44157a(0x2b0)](this[_0x44157a(0x4c0)],0x1):this[_0x44157a(0x25f)]-=this[_0x44157a(0x231)]());},Game_Timer['prototype'][_0x39f07d(0x3bc)]=function(_0x152d7f){const _0x20b6ff=_0x39f07d;if(this[_0x20b6ff(0x5ab)]===undefined)this[_0x20b6ff(0x8b)]();this[_0x20b6ff(0x5ab)]=_0x152d7f;},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x5b4)]=Game_Timer[_0x39f07d(0x287)][_0x39f07d(0x1c8)],Game_Timer['prototype'][_0x39f07d(0x1c8)]=function(){const _0x3c51eb=_0x39f07d;if(this['_expireCommonEvent']===undefined)this['initEventsMoveCore']();if(this['_expireCommonEvent'])_0x3c51eb(0x377)!==_0x3c51eb(0x5d3)?$gameTemp[_0x3c51eb(0x544)](this[_0x3c51eb(0x5ab)]):(_0x472d9a[_0x3c51eb(0x41c)][_0x3c51eb(0x43b)]['call'](this),_0xcbbfff[_0x3c51eb(0x32a)]&&_0x50c781[_0x3c51eb(0x11f)](_0x346eec[_0x3c51eb(0x1ed)]['Settings']['General']['FastForwardKey'])&&_0x4f1d45['clear']());else{if('tjnQA'===_0x3c51eb(0x37d))VisuMZ[_0x3c51eb(0x41c)]['Game_Timer_onExpire'][_0x3c51eb(0x341)](this);else return this[_0x3c51eb(0x4c6)](_0x3c51eb(0x11e));}},VisuMZ['EventsMoveCore'][_0x39f07d(0x361)]=Game_Message[_0x39f07d(0x287)][_0x39f07d(0x3d5)],Game_Message['prototype'][_0x39f07d(0x3d5)]=function(_0x386f47){const _0x23305b=_0x39f07d;VisuMZ[_0x23305b(0x41c)][_0x23305b(0x361)][_0x23305b(0x341)](this,_0x386f47),this[_0x23305b(0x288)]=$gameTemp[_0x23305b(0x4df)]();},Game_Message[_0x39f07d(0x287)][_0x39f07d(0x1ff)]=function(){const _0x10a6a3=_0x39f07d;$gameTemp[_0x10a6a3(0x45f)](this[_0x10a6a3(0x288)]);},VisuMZ['EventsMoveCore'][_0x39f07d(0x584)]=Game_Switches[_0x39f07d(0x287)]['value'],Game_Switches['prototype'][_0x39f07d(0x319)]=function(_0x41126a){const _0x4db36d=_0x39f07d;if(DataManager[_0x4db36d(0x314)](_0x41126a)){if(_0x4db36d(0x300)!==_0x4db36d(0x300))this[_0x4db36d(0x210)][_0x4db36d(0xad)]=_0x4c460a(_0x465212['$1']);else return!!this[_0x4db36d(0x425)](_0x41126a);}else{if(DataManager[_0x4db36d(0x1b4)](_0x41126a)){if(_0x4db36d(0x4ec)===_0x4db36d(0x4ec))return!!this[_0x4db36d(0x15c)](_0x41126a);else this['x']+=_0x4201c2['EventsMoveCore']['Settings'][_0x4db36d(0x53a)][_0x4db36d(0x595)],this['y']+=_0xf85f9b[_0x4db36d(0x41c)]['Settings'][_0x4db36d(0x53a)][_0x4db36d(0xf1)];}else return DataManager[_0x4db36d(0x27d)](_0x41126a)?_0x4db36d(0x413)===_0x4db36d(0x24e)?![]:!!this['mapValue'](_0x41126a):VisuMZ[_0x4db36d(0x41c)][_0x4db36d(0x584)][_0x4db36d(0x341)](this,_0x41126a);}},Game_Switches['advancedFunc']={},Game_Switches[_0x39f07d(0x287)][_0x39f07d(0x425)]=function(_0x3ded96){const _0x24f068=_0x39f07d;if(!Game_Switches[_0x24f068(0x254)][_0x3ded96]){if(_0x24f068(0x207)==='IuVkg')_0x49556e[_0x24f068(0x1ff)](),_0x569569[_0x24f068(0x41c)][_0x24f068(0x235)]['call'](this),_0x21d618[_0x24f068(0x4ae)]();else{$dataSystem[_0x24f068(0xe6)][_0x3ded96][_0x24f068(0x17c)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x58a318=_0x24f068(0x47a)['format'](String(RegExp['$1']));Game_Switches['advancedFunc'][_0x3ded96]=new Function(_0x24f068(0x429),_0x58a318);}}const _0xd0a37d=$gameTemp[_0x24f068(0x4df)]()||this;return Game_Switches[_0x24f068(0x254)][_0x3ded96][_0x24f068(0x341)](_0xd0a37d,_0x3ded96);},Game_Switches[_0x39f07d(0x287)][_0x39f07d(0x15c)]=function(_0x3f667a){const _0x3c99e2=_0x39f07d,_0x424ed6=$gameTemp[_0x3c99e2(0x4df)]()||this;if(_0x424ed6['constructor']!==Game_Event){if(_0x3c99e2(0x180)===_0x3c99e2(0x2b5)){if(this['isPosing']()&&this[_0x3c99e2(0x1ea)]()===_0x3c99e2(0x46f))return!![];return _0x2ab668['EventsMoveCore']['Game_CharacterBase_hasStepAnime'][_0x3c99e2(0x341)](this);}else return VisuMZ['EventsMoveCore'][_0x3c99e2(0x584)][_0x3c99e2(0x341)](this,_0x3f667a);}else{const _0x5243cb=[_0x424ed6[_0x3c99e2(0x1c1)],_0x424ed6[_0x3c99e2(0x418)],_0x3c99e2(0x4cf)[_0x3c99e2(0x307)](_0x3f667a)];return $gameSelfSwitches['value'](_0x5243cb);}},Game_Switches['prototype'][_0x39f07d(0x35c)]=function(_0x4b444d){const _0x5c4800=_0x39f07d,_0x591c6d=$gameMap?$gameMap[_0x5c4800(0x5cb)]():0x0,_0x1734dd=[0x0,0x0,_0x5c4800(0x2e3)[_0x5c4800(0x307)](_0x591c6d,_0x4b444d)];return $gameSelfSwitches['value'](_0x1734dd);},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x35e)]=Game_Switches[_0x39f07d(0x287)][_0x39f07d(0xf2)],Game_Switches[_0x39f07d(0x287)][_0x39f07d(0xf2)]=function(_0xef79d1,_0x966941){const _0x3c7d56=_0x39f07d;if(DataManager[_0x3c7d56(0x1b4)](_0xef79d1))this[_0x3c7d56(0x40d)](_0xef79d1,_0x966941);else{if(DataManager[_0x3c7d56(0x27d)](_0xef79d1))'fOmPB'!==_0x3c7d56(0x4d5)?this[_0x3c7d56(0x5a8)](_0xef79d1,_0x966941):(_0x2f837a['EventsMoveCore'][_0x3c7d56(0x553)][_0x3c7d56(0x341)](this),this[_0x3c7d56(0x447)](),this['createAttachPictureSprite'](),this['createIconSprite']());else{if(_0x3c7d56(0x3db)===_0x3c7d56(0x366)){if(_0x420d27)this['processMoveRouteJumpTo'](_0x5a4eea['x'],_0x451b20['y']);}else VisuMZ[_0x3c7d56(0x41c)][_0x3c7d56(0x35e)][_0x3c7d56(0x341)](this,_0xef79d1,_0x966941);}}},Game_Switches[_0x39f07d(0x287)][_0x39f07d(0x40d)]=function(_0x29f3c6,_0x41dca0){const _0x290ce1=_0x39f07d,_0x16d471=$gameTemp['getSelfTarget']()||this;if(_0x16d471['constructor']!==Game_Event)VisuMZ[_0x290ce1(0x41c)][_0x290ce1(0x35e)][_0x290ce1(0x341)](this,_0x29f3c6,_0x41dca0);else{if(_0x290ce1(0x53f)===_0x290ce1(0x53f)){const _0x385b96=[_0x16d471[_0x290ce1(0x1c1)],_0x16d471[_0x290ce1(0x418)],'Self\x20Switch\x20%1'[_0x290ce1(0x307)](_0x29f3c6)];$gameSelfSwitches[_0x290ce1(0xf2)](_0x385b96,_0x41dca0);}else{const _0x1ad6da=_0x17b351(_0x53bd59['$1'])[_0x290ce1(0x321)]()[_0x290ce1(0x577)](),_0x14f008=[_0x290ce1(0xe2),_0x290ce1(0x558),_0x290ce1(0x240),_0x290ce1(0x284)];this[_0x290ce1(0x210)][_0x290ce1(0x36b)]=_0x14f008[_0x290ce1(0x362)](_0x1ad6da)['clamp'](0x0,0x3);}}},Game_Switches[_0x39f07d(0x287)][_0x39f07d(0x5a8)]=function(_0x9df7e8,_0x313204){const _0x3fb0d9=_0x39f07d,_0x375ef3=$gameMap?$gameMap['mapId']():0x0,_0xea6238=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x3fb0d9(0x307)](_0x375ef3,_0x9df7e8)];return $gameSelfSwitches['setValue'](_0xea6238,_0x313204);},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x5bc)]=Game_Variables[_0x39f07d(0x287)][_0x39f07d(0x319)],Game_Variables[_0x39f07d(0x287)][_0x39f07d(0x319)]=function(_0x21501f){const _0x4dcfb9=_0x39f07d;if(DataManager[_0x4dcfb9(0x1bc)](_0x21501f)){if(_0x4dcfb9(0x557)!==_0x4dcfb9(0x286))return this[_0x4dcfb9(0x425)](_0x21501f);else this[_0x4dcfb9(0x285)]();}else{if(DataManager[_0x4dcfb9(0x4f6)](_0x21501f))return this[_0x4dcfb9(0x15c)](_0x21501f);else return DataManager[_0x4dcfb9(0x1e4)](_0x21501f)?this[_0x4dcfb9(0x35c)](_0x21501f):VisuMZ[_0x4dcfb9(0x41c)][_0x4dcfb9(0x5bc)][_0x4dcfb9(0x341)](this,_0x21501f);}},Game_Variables['advancedFunc']={},Game_Variables['prototype'][_0x39f07d(0x425)]=function(_0x4e5a68){const _0xf83d64=_0x39f07d;if(!Game_Variables[_0xf83d64(0x254)][_0x4e5a68]){if('Cakfr'!==_0xf83d64(0x3af))return this[_0xf83d64(0x15c)](_0x35881c);else{$dataSystem['variables'][_0x4e5a68][_0xf83d64(0x17c)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x13ca21=_0xf83d64(0x47a)[_0xf83d64(0x307)](String(RegExp['$1']));Game_Variables['advancedFunc'][_0x4e5a68]=new Function(_0xf83d64(0x465),_0x13ca21);}}const _0x3dcd0f=$gameTemp['getSelfTarget']()||this;return Game_Variables[_0xf83d64(0x254)][_0x4e5a68]['call'](_0x3dcd0f,_0x4e5a68);},Game_Variables[_0x39f07d(0x287)][_0x39f07d(0x15c)]=function(_0x5e7bc6){const _0x76da26=_0x39f07d,_0x156431=$gameTemp['getSelfTarget']()||this;if(_0x156431[_0x76da26(0x113)]!==Game_Event)return _0x76da26(0x2a1)==='iLhFA'?this[_0x76da26(0x4eb)]():VisuMZ[_0x76da26(0x41c)][_0x76da26(0x5bc)][_0x76da26(0x341)](this,_0x5e7bc6);else{const _0x2d0a0a=[_0x156431['_mapId'],_0x156431[_0x76da26(0x418)],_0x76da26(0x24c)['format'](_0x5e7bc6)];return $gameSelfSwitches[_0x76da26(0x319)](_0x2d0a0a);}},Game_Variables['prototype'][_0x39f07d(0x35c)]=function(_0x4e9734){const _0x2dce45=_0x39f07d,_0x4a9bf1=$gameMap?$gameMap[_0x2dce45(0x5cb)]():0x0,_0x15fc40=[0x0,0x0,_0x2dce45(0x57f)[_0x2dce45(0x307)](_0x4a9bf1,_0x4e9734)];return $gameSelfSwitches[_0x2dce45(0x319)](_0x15fc40)||0x0;},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x133)]=Game_Variables[_0x39f07d(0x287)][_0x39f07d(0xf2)],Game_Variables[_0x39f07d(0x287)][_0x39f07d(0xf2)]=function(_0x1bea23,_0x52eb43){const _0x95e1b3=_0x39f07d;if(DataManager[_0x95e1b3(0x4f6)](_0x1bea23)){if(_0x95e1b3(0x5c0)!==_0x95e1b3(0x5c0)){if(this['_EventIcons']===_0xd3110a)this[_0x95e1b3(0x8b)]();const _0x1e9263=_0x95e1b3(0xa4)[_0x95e1b3(0x307)](_0x1d8102,_0x21347a);delete this[_0x95e1b3(0x10b)][_0x1e9263];}else this[_0x95e1b3(0x40d)](_0x1bea23,_0x52eb43);}else DataManager[_0x95e1b3(0x1e4)](_0x1bea23)?this[_0x95e1b3(0x5a8)](_0x1bea23,_0x52eb43):VisuMZ['EventsMoveCore'][_0x95e1b3(0x133)][_0x95e1b3(0x341)](this,_0x1bea23,_0x52eb43);},Game_Variables['prototype'][_0x39f07d(0x40d)]=function(_0x59997d,_0x342dee){const _0x3576ca=_0x39f07d,_0xed97d9=$gameTemp['getSelfTarget']()||this;if(_0xed97d9[_0x3576ca(0x113)]!==Game_Event)_0x3576ca(0x524)!==_0x3576ca(0x524)?(this['_starting']=!![],this[_0x3576ca(0x196)]([0x0,0x1,0x2])&&this[_0x3576ca(0x2d8)]()):VisuMZ[_0x3576ca(0x41c)][_0x3576ca(0x133)][_0x3576ca(0x341)](this,_0x59997d,_0x342dee);else{if(_0x3576ca(0x172)!=='ZQZVj')_0x34f443[_0x3576ca(0x287)][_0x3576ca(0x42b)][_0x3576ca(0x341)](this),this[_0x3576ca(0x56e)][_0x3576ca(0x2cf)]=this['defaultFontSize']();else{const _0x20f45c=[_0xed97d9['_mapId'],_0xed97d9[_0x3576ca(0x418)],_0x3576ca(0x24c)[_0x3576ca(0x307)](_0x59997d)];$gameSelfSwitches['setValue'](_0x20f45c,_0x342dee);}}},Game_Variables['prototype']['setMapValue']=function(_0x24e05f,_0x3e2508){const _0x24fa69=_0x39f07d,_0x1b40aa=$gameMap?$gameMap[_0x24fa69(0x5cb)]():0x0,_0x2bef57=[0x0,0x0,_0x24fa69(0x57f)[_0x24fa69(0x307)](_0x1b40aa,_0x24e05f)];$gameSelfSwitches['setValue'](_0x2bef57,_0x3e2508);},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x401)]=Game_SelfSwitches['prototype']['value'],Game_SelfSwitches[_0x39f07d(0x287)]['value']=function(_0x613edd){const _0x678948=_0x39f07d;if(_0x613edd[0x2][_0x678948(0x17c)](/(?:SELF|MAP)/i)){if(_0x678948(0x39d)===_0x678948(0x39d))return this[_0x678948(0x15c)](_0x613edd);else this[_0x678948(0x176)]=![],this['_speed']=-0x1,this[_0x678948(0x5ab)]=0x0;}else{return VisuMZ[_0x678948(0x41c)][_0x678948(0x401)][_0x678948(0x341)](this,_0x613edd);;}},Game_SelfSwitches[_0x39f07d(0x287)]['selfValue']=function(_0xa33422){const _0x1d2e27=_0x39f07d;return _0xa33422[0x2][_0x1d2e27(0x17c)](/VAR/i)?this['_data'][_0xa33422]||0x0:!!this['_data'][_0xa33422];},VisuMZ['EventsMoveCore']['Game_SelfSwitches_setValue']=Game_SelfSwitches[_0x39f07d(0x287)][_0x39f07d(0xf2)],Game_SelfSwitches[_0x39f07d(0x287)]['setValue']=function(_0x16ad62,_0x5b74ae){const _0x4fcf22=_0x39f07d;_0x16ad62[0x2][_0x4fcf22(0x17c)](/(?:SELF|MAP)/i)?this['setSelfValue'](_0x16ad62,_0x5b74ae):_0x4fcf22(0x3ea)!==_0x4fcf22(0x3ea)?_0x5853f1=_0x2c478e[_0x4fcf22(0x2b0)](_0x43f283,_0x77e842):VisuMZ[_0x4fcf22(0x41c)][_0x4fcf22(0x2fb)][_0x4fcf22(0x341)](this,_0x16ad62,_0x5b74ae);},Game_SelfSwitches[_0x39f07d(0x287)]['setSelfValue']=function(_0x5454e3,_0x581a4f){const _0xd627ef=_0x39f07d;this[_0xd627ef(0x2b1)][_0x5454e3]=_0x5454e3[0x2][_0xd627ef(0x17c)](/VAR/i)?_0x581a4f:!!_0x581a4f,this[_0xd627ef(0xa3)]();},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x324)]=Scene_Map['prototype'][_0x39f07d(0x4f4)],Scene_Map[_0x39f07d(0x287)][_0x39f07d(0x4f4)]=function(){const _0x18ac85=_0x39f07d;$gameMap[_0x18ac85(0x376)](),VisuMZ[_0x18ac85(0x41c)]['Scene_Map_createDisplayObjects'][_0x18ac85(0x341)](this);},Game_Map['prototype'][_0x39f07d(0x376)]=function(){const _0x5f294c=_0x39f07d;this[_0x5f294c(0x44c)]=this[_0x5f294c(0x5cb)](),this[_0x5f294c(0xf5)]=undefined;const _0x4437b4=this[_0x5f294c(0x3c4)]();for(const _0x266eaf of _0x4437b4){if(_0x266eaf)$gameSelfSwitches['resetSelfSwitchesForEvent'](_0x266eaf);}},Game_SelfSwitches[_0x39f07d(0x287)][_0x39f07d(0x477)]=function(_0x2f9adc){const _0x4f50cd=_0x39f07d;if(!_0x2f9adc)return;if(!_0x2f9adc['event']())return;const _0x181d67=_0x2f9adc[_0x4f50cd(0x3f5)]()[_0x4f50cd(0x12b)]||'';if(_0x181d67[_0x4f50cd(0x17c)](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){if('QsIar'!==_0x4f50cd(0x1d6)){const _0x4ed582=_0x4f50cd(0x28a)[_0x4f50cd(0x307)]($gameMap[_0x4f50cd(0x1c1)],_0x2f9adc['_eventId']),_0x1d1569=Object['keys'](this[_0x4f50cd(0x2b1)])['filter'](_0x5a7343=>_0x5a7343[_0x4f50cd(0xdc)](_0x4ed582));while(_0x1d1569[_0x4f50cd(0x5be)]>0x0){const _0x140e87=_0x1d1569[_0x4f50cd(0x135)]();delete this[_0x4f50cd(0x2b1)][_0x140e87];}}else{const _0x23bd92=this[_0x4f50cd(0x438)][_0x4f50cd(0x36e)]();this['_proxyWindow'][_0x4f50cd(0x1af)](this[_0x4f50cd(0x3a1)],_0x23bd92,0x0);}}},Game_SelfSwitches['prototype'][_0x39f07d(0x3fc)]=function(_0x9e90e2){const _0x56fa84=_0x39f07d,_0x27920f=_0x56fa84(0x2e9)[_0x56fa84(0x307)]($gameMap[_0x56fa84(0x1c1)]),_0x58e238=Object['keys'](this[_0x56fa84(0x2b1)])[_0x56fa84(0x48a)](_0x4410bf=>_0x4410bf['startsWith'](_0x27920f));while(_0x58e238[_0x56fa84(0x5be)]>0x0){const _0x15c0fe=_0x58e238[_0x56fa84(0x135)]();delete this[_0x56fa84(0x2b1)][_0x15c0fe];}if(_0x9e90e2===$gameMap[_0x56fa84(0x5cb)]()){if('hJUin'===_0x56fa84(0x35b))$gameMap['requestRefresh']();else{if([0x2,0x4,0x6,0x8]['includes'](_0x515af0))return 0x2;if([0x1,0x3,0x7,0x9][_0x56fa84(0x310)](_0x4eee49))return 0x3;}}},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x21b)]=Game_Enemy[_0x39f07d(0x287)]['meetsSwitchCondition'],Game_Enemy[_0x39f07d(0x287)][_0x39f07d(0x12a)]=function(_0x3b8da8){const _0x3b3f7a=_0x39f07d;$gameTemp[_0x3b3f7a(0x45f)](this);const _0x4467fa=VisuMZ['EventsMoveCore']['Game_Enemy_meetsSwitchCondition']['call'](this,_0x3b8da8);return $gameTemp[_0x3b3f7a(0x4ae)](),_0x4467fa;},VisuMZ['EventsMoveCore']['Game_Troop_meetsConditions']=Game_Troop['prototype'][_0x39f07d(0x244)],Game_Troop['prototype'][_0x39f07d(0x244)]=function(_0x2f10f8){const _0x1fae37=_0x39f07d;$gameTemp[_0x1fae37(0x45f)](this);const _0x501930=VisuMZ[_0x1fae37(0x41c)]['Game_Troop_meetsConditions']['call'](this,_0x2f10f8);return $gameTemp['clearSelfTarget'](),_0x501930;},VisuMZ[_0x39f07d(0x41c)]['Game_Map_setup']=Game_Map[_0x39f07d(0x287)][_0x39f07d(0x5ac)],Game_Map[_0x39f07d(0x287)][_0x39f07d(0x5ac)]=function(_0x5afabc){const _0x2d9cc2=_0x39f07d;this[_0x2d9cc2(0x381)](_0x5afabc),this[_0x2d9cc2(0x2bd)](),VisuMZ[_0x2d9cc2(0x41c)][_0x2d9cc2(0x212)][_0x2d9cc2(0x341)](this,_0x5afabc),this[_0x2d9cc2(0x2bd)](),this[_0x2d9cc2(0xea)](),this[_0x2d9cc2(0x5c8)](),this['setupSaveEventLocations'](),this[_0x2d9cc2(0x4da)](),this[_0x2d9cc2(0x81)](),this[_0x2d9cc2(0x251)](),this['clearEventCache']();},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x5b2)]=Game_Map[_0x39f07d(0x287)][_0x39f07d(0x540)],Game_Map[_0x39f07d(0x287)][_0x39f07d(0x540)]=function(){const _0x42a234=_0x39f07d;VisuMZ[_0x42a234(0x41c)][_0x42a234(0x5b2)][_0x42a234(0x341)](this),this[_0x42a234(0x54b)]();},Game_Map['_eventOverloadThreshold']=0xc8,Game_Map[_0x39f07d(0x287)][_0x39f07d(0x139)]=function(){const _0x45a06f=_0x39f07d,_0x5f22d3=Game_Map['_eventOverloadThreshold'];this['_eventOverload']=this[_0x45a06f(0x3c4)]()[_0x45a06f(0x5be)]>_0x5f22d3;if(this[_0x45a06f(0x583)]&&$gameTemp[_0x45a06f(0x144)]()){}},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x153)]=function(){const _0x38e208=_0x39f07d;return this[_0x38e208(0x583)];},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x2bd)]=function(){const _0x514756=_0x39f07d;this[_0x514756(0xf5)]=undefined;},Game_Map[_0x39f07d(0x287)][_0x39f07d(0xea)]=function(){const _0x54f3a0=_0x39f07d;this[_0x54f3a0(0x53d)]=VisuMZ[_0x54f3a0(0x41c)][_0x54f3a0(0x2a4)]['Movement'][_0x54f3a0(0xc1)];const _0x1c308c=$dataMap[_0x54f3a0(0x12b)]||'';if(_0x1c308c['match'](/<DIAGONAL MOVEMENT: ON>/i))this[_0x54f3a0(0x53d)]=!![];else{if(_0x1c308c['match'](/<DIAGONAL MOVEMENT: OFF>/i)){if(_0x54f3a0(0x305)===_0x54f3a0(0x507)){const _0x48345b=_0x54f3a0(0x28a)['format'](_0x18c66f[_0x54f3a0(0x1c1)],_0x158923[_0x54f3a0(0x418)]),_0x5ad71e=_0x3c41d9[_0x54f3a0(0x327)](this[_0x54f3a0(0x2b1)])['filter'](_0x280cc9=>_0x280cc9[_0x54f3a0(0xdc)](_0x48345b));while(_0x5ad71e[_0x54f3a0(0x5be)]>0x0){const _0xd7c7c2=_0x5ad71e['shift']();delete this['_data'][_0xd7c7c2];}}else this['_diagonalSupport']=![];}}},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x457)]=function(){const _0x329430=_0x39f07d,_0x2b995c=$gameSystem[_0x329430(0x352)]();if(_0x2b995c===_0x329430(0x550))return!![];if(_0x2b995c==='disable')return![];if(this[_0x329430(0x53d)]===undefined)this['setupDiagonalSupport']();return this[_0x329430(0x53d)];},Game_Map['prototype'][_0x39f07d(0x57c)]=function(_0x12c39d,_0x37e2a2){const _0x3a4c3b=_0x39f07d;if([0x1,0x4,0x7][_0x3a4c3b(0x310)](_0x37e2a2))_0x12c39d-=0x1;if([0x3,0x6,0x9][_0x3a4c3b(0x310)](_0x37e2a2))_0x12c39d+=0x1;return this['roundX'](_0x12c39d);},Game_Map[_0x39f07d(0x287)]['roundYWithDirection']=function(_0x31555d,_0x55d10f){const _0x1133e0=_0x39f07d;if([0x1,0x2,0x3][_0x1133e0(0x310)](_0x55d10f))_0x31555d+=0x1;if([0x7,0x8,0x9][_0x1133e0(0x310)](_0x55d10f))_0x31555d-=0x1;return this['roundY'](_0x31555d);},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x120)]=function(_0x1713de,_0x5c3cb1,_0x41e194,_0x5f2738){const _0x3f855a=_0x39f07d;return Math[_0x3f855a(0x2b0)](Math[_0x3f855a(0x3cd)](this['deltaX'](_0x1713de,_0x41e194)),Math[_0x3f855a(0x3cd)](this[_0x3f855a(0x30e)](_0x5c3cb1,_0x5f2738)));},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x5c8)]=function(){const _0x14389c=_0x39f07d,_0x4168c0=VisuMZ[_0x14389c(0x41c)][_0x14389c(0x2a4)][_0x14389c(0x35d)],_0x1caf38={},_0x564235=[_0x14389c(0x2f4),_0x14389c(0x161),_0x14389c(0xbb)],_0x3bd994=[_0x14389c(0x29a),'Walk',_0x14389c(0x2e6),_0x14389c(0x127),'Vehicle','Boat',_0x14389c(0x4f7),_0x14389c(0x4d4)];for(const _0x2cbe5c of _0x564235){for(const _0x2ca9d3 of _0x3bd994){if(_0x14389c(0x143)!==_0x14389c(0x13e)){const _0x127b96=_0x14389c(0x26f)[_0x14389c(0x307)](_0x2ca9d3,_0x2cbe5c);_0x4168c0[_0x127b96]&&(_0x1caf38[_0x127b96]=_0x4168c0[_0x127b96][_0x14389c(0x586)](0x0));}else{if(!this[_0x14389c(0x21e)])return;this[_0x14389c(0x59c)]=this[_0x14389c(0x59c)]||0x3c,this['_periodicRefreshTimer']--,this[_0x14389c(0x59c)]<=0x0&&(this[_0x14389c(0x439)](),this['_periodicRefreshTimer']=0x3c);}}}const _0xeed89=$dataMap[_0x14389c(0x12b)]||'',_0x26911b=_0xeed89[_0x14389c(0x17c)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x26911b)for(const _0x2ae73c of _0x26911b){_0x2ae73c[_0x14389c(0x17c)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x45f4a7=String(RegExp['$1'])[_0x14389c(0x394)]()[_0x14389c(0x577)](),_0x38e98c=String(RegExp['$2'])['toLowerCase']()['trim']();const _0xfe2f5d=JSON['parse']('['+RegExp['$3'][_0x14389c(0x17c)](/\d+/g)+']');_0x45f4a7=_0x45f4a7[_0x14389c(0x37c)](0x0)[_0x14389c(0x321)]()+_0x45f4a7[_0x14389c(0x586)](0x1),_0x38e98c=_0x38e98c[_0x14389c(0x37c)](0x0)['toUpperCase']()+_0x38e98c[_0x14389c(0x586)](0x1);const _0x27d034='%1%2'[_0x14389c(0x307)](_0x45f4a7,_0x38e98c);if(_0x1caf38[_0x27d034])_0x1caf38[_0x27d034]=_0x1caf38[_0x27d034][_0x14389c(0x416)](_0xfe2f5d);}this[_0x14389c(0x246)]=_0x1caf38;},Game_Map['prototype'][_0x39f07d(0x3aa)]=function(_0x42222e,_0x568d28,_0x470cec,_0x3c9498){const _0x53b4d0=_0x39f07d,_0x4f38e9=this[_0x53b4d0(0x57c)](_0x42222e,_0x470cec),_0x454132=this[_0x53b4d0(0xd8)](_0x568d28,_0x470cec),_0x5d398a=this[_0x53b4d0(0x3b4)](_0x4f38e9,_0x454132),_0x522c8e=this[_0x53b4d0(0x246)];if(_0x522c8e[_0x53b4d0(0x59b)][_0x53b4d0(0x310)](_0x5d398a))return!![];else{if(_0x3c9498===_0x53b4d0(0x495))return _0x522c8e[_0x53b4d0(0x1bf)][_0x53b4d0(0x310)](_0x5d398a)||_0x522c8e[_0x53b4d0(0x5ca)][_0x53b4d0(0x310)](_0x5d398a);else{if(_0x3c9498==='event')return _0x53b4d0(0x3e7)===_0x53b4d0(0x3e7)?_0x522c8e[_0x53b4d0(0xcb)][_0x53b4d0(0x310)](_0x5d398a)||_0x522c8e[_0x53b4d0(0x5ca)]['includes'](_0x5d398a):_0x17313b['EventsMoveCore'][_0x53b4d0(0x2a4)][_0x53b4d0(0x258)][_0x53b4d0(0x263)];else{if(_0x522c8e[_0x53b4d0(0x3ad)]['includes'](_0x5d398a))return _0x53b4d0(0xfd)===_0x53b4d0(0x587)?this[_0x53b4d0(0x2c2)]()?(this[_0x53b4d0(0x380)]||'')[_0x53b4d0(0x321)]()['trim']():''['toUpperCase']()[_0x53b4d0(0x577)]():!![];else{const _0x4f10b5=_0x53b4d0(0x453)['format'](_0x3c9498[_0x53b4d0(0x37c)](0x0)[_0x53b4d0(0x321)]()+_0x3c9498[_0x53b4d0(0x586)](0x1));if(_0x522c8e[_0x4f10b5])return _0x522c8e[_0x4f10b5]['includes'](_0x5d398a);}}}}return![];},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x19b)]=function(_0xc68f8,_0x43717c,_0x3c8055,_0x24d8b4){const _0x4bc88a=_0x39f07d,_0x3663f3=this[_0x4bc88a(0x57c)](_0xc68f8,_0x3c8055),_0x49a138=this[_0x4bc88a(0xd8)](_0x43717c,_0x3c8055),_0x38cf29=this[_0x4bc88a(0x3b4)](_0x3663f3,_0x49a138),_0x4aa5a1=this[_0x4bc88a(0x246)];if(_0x4aa5a1['AllForbid'][_0x4bc88a(0x310)](_0x38cf29))return!![];else{if(_0x24d8b4===_0x4bc88a(0x495))return _0x4aa5a1[_0x4bc88a(0x152)]['includes'](_0x38cf29)||_0x4aa5a1['WalkForbid']['includes'](_0x38cf29);else{if(_0x24d8b4===_0x4bc88a(0x3f5))return _0x4aa5a1['EventForbid']['includes'](_0x38cf29)||_0x4aa5a1[_0x4bc88a(0x272)]['includes'](_0x38cf29);else{if(_0x4aa5a1[_0x4bc88a(0x4a2)][_0x4bc88a(0x310)](_0x38cf29))return _0x4bc88a(0x3f0)!==_0x4bc88a(0x3f0)?(_0x1afccd['setLastPluginCommandInterpreter'](this),_0x1d2e4b[_0x4bc88a(0x41c)][_0x4bc88a(0x329)][_0x4bc88a(0x341)](this,_0x3d6000)):!![];else{const _0x5df238=_0x4bc88a(0x3e6)[_0x4bc88a(0x307)](_0x24d8b4[_0x4bc88a(0x37c)](0x0)[_0x4bc88a(0x321)]()+_0x24d8b4[_0x4bc88a(0x586)](0x1));if(_0x4aa5a1[_0x5df238])return _0x4aa5a1[_0x5df238][_0x4bc88a(0x310)](_0x38cf29);}}}}return![];},Game_Map['prototype'][_0x39f07d(0x221)]=function(_0x3d98de,_0x5add16,_0x5e7e90,_0x3e5783){const _0x4144b3=_0x39f07d;_0x5e7e90=_0x3e5783===_0x4144b3(0x2b2)?0x5:_0x5e7e90;const _0xf340ec=this['roundXWithDirection'](_0x3d98de,_0x5e7e90),_0x18b76b=this['roundYWithDirection'](_0x5add16,_0x5e7e90),_0x5e2f08=this[_0x4144b3(0x3b4)](_0xf340ec,_0x18b76b),_0x63d1c7=this['_regionRules'];if(_0x63d1c7[_0x4144b3(0x5d4)]['includes'](_0x5e2f08))return!![];else{const _0x1dee70='%1Dock'[_0x4144b3(0x307)](_0x3e5783[_0x4144b3(0x37c)](0x0)[_0x4144b3(0x321)]()+_0x3e5783[_0x4144b3(0x586)](0x1));if(_0x63d1c7[_0x1dee70])return _0x63d1c7[_0x1dee70][_0x4144b3(0x310)](_0x5e2f08);}return![];},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x336)]=Game_Map['prototype']['refresh'],Game_Map[_0x39f07d(0x287)][_0x39f07d(0x1ce)]=function(){const _0x12eee2=_0x39f07d;VisuMZ[_0x12eee2(0x41c)][_0x12eee2(0x336)][_0x12eee2(0x341)](this),this[_0x12eee2(0x565)]();},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x565)]=function(){const _0x240664=_0x39f07d;this[_0x240664(0x21e)]=![];if(this[_0x240664(0x3c4)]()[_0x240664(0x10a)](_0x30bf26=>_0x30bf26[_0x240664(0x554)]())){this['_needsPeriodicRefresh']=!![];return;}if(this['events']()[_0x240664(0x10a)](_0x371bfc=>_0x371bfc[_0x240664(0xb3)]())){this[_0x240664(0x21e)]=!![];return;}if(this[_0x240664(0x4f3)][_0x240664(0x10a)](_0x1f71f3=>_0x1f71f3['hasAdvancedSwitchVariable']())){this[_0x240664(0x21e)]=!![];return;}if(this[_0x240664(0x4f3)][_0x240664(0x10a)](_0xf876b=>_0xf876b[_0x240664(0xb3)]())){this['_needsPeriodicRefresh']=!![];return;}},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x410)]=Game_Map['prototype'][_0x39f07d(0x12e)],Game_Map[_0x39f07d(0x287)]['update']=function(_0xab2116){const _0x3bb25d=_0x39f07d;this[_0x3bb25d(0x597)](),VisuMZ[_0x3bb25d(0x41c)][_0x3bb25d(0x410)][_0x3bb25d(0x341)](this,_0xab2116);},Game_Map[_0x39f07d(0x287)]['updatePeriodicRefresh']=function(){const _0x464da7=_0x39f07d;if(!this[_0x464da7(0x21e)])return;this['_periodicRefreshTimer']=this[_0x464da7(0x59c)]||0x3c,this[_0x464da7(0x59c)]--,this[_0x464da7(0x59c)]<=0x0&&(this[_0x464da7(0x439)](),this[_0x464da7(0x59c)]=0x3c);},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x1b5)]=Game_Map['prototype'][_0x39f07d(0x1b7)],Game_Map[_0x39f07d(0x287)]['isDashDisabled']=function(){const _0x5beae0=_0x39f07d;if(!$gameSystem[_0x5beae0(0x1fe)]())return!![];return VisuMZ['EventsMoveCore'][_0x5beae0(0x1b5)][_0x5beae0(0x341)](this);},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x225)]=function(){const _0x445a38=_0x39f07d;this['_saveEventLocations']=![];const _0x290181=$dataMap[_0x445a38(0x12b)]||'';_0x290181[_0x445a38(0x17c)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x445a38(0x110)]=!![]);},Game_Map['prototype'][_0x39f07d(0x585)]=function(){const _0xb2a62a=_0x39f07d;if(this[_0xb2a62a(0x110)]===undefined)this[_0xb2a62a(0x225)]();return this['_saveEventLocations'];},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x381)]=function(_0x1770fd){const _0x30be00=_0x39f07d;_0x1770fd!==this['mapId']()&&$gamePlayer&&$gameSystem[_0x30be00(0x381)](this[_0x30be00(0x5cb)]());},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x4da)]=function(){const _0x538530=_0x39f07d;this[_0x538530(0x5b5)]=$gameSystem[_0x538530(0x19e)](this[_0x538530(0x5cb)]()),this[_0x538530(0x44a)]=!![];},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x1b3)]=Game_Map[_0x39f07d(0x287)][_0x39f07d(0x3c4)],Game_Map[_0x39f07d(0x287)][_0x39f07d(0x3c4)]=function(){const _0x29400e=_0x39f07d;if(this[_0x29400e(0xf5)])return this[_0x29400e(0xf5)];const _0x2a0a4c=VisuMZ[_0x29400e(0x41c)][_0x29400e(0x1b3)][_0x29400e(0x341)](this),_0xa332b1=_0x2a0a4c[_0x29400e(0x416)](this[_0x29400e(0x5b5)]||[]);return this[_0x29400e(0xf5)]=_0xa332b1[_0x29400e(0x48a)](_0xfa587=>!!_0xfa587),this[_0x29400e(0xf5)];},VisuMZ[_0x39f07d(0x41c)]['Game_Map_event']=Game_Map['prototype'][_0x39f07d(0x3f5)],Game_Map[_0x39f07d(0x287)][_0x39f07d(0x3f5)]=function(_0x3b15e2){const _0x14e5b5=_0x39f07d;return _0x3b15e2>=0x3e8?(_0x3b15e2-=0x3e8,this[_0x14e5b5(0x5b5)][_0x3b15e2]):VisuMZ[_0x14e5b5(0x41c)][_0x14e5b5(0x570)][_0x14e5b5(0x341)](this,_0x3b15e2);},Game_Map['prototype'][_0x39f07d(0x578)]=function(_0x3c06f5){const _0x19a2af=_0x39f07d,_0xe8ccbf=this[_0x19a2af(0x3f5)](_0x3c06f5);if(_0xe8ccbf)_0xe8ccbf[_0x19a2af(0x47b)]();},Game_Map[_0x39f07d(0x287)]['setupSpawnTest']=function(){const _0x24d040=_0x39f07d,_0x34f7c2={'template':_0x24d040(0x3ff),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x24d040(0x5b5)]['length']+0x3e8};this[_0x24d040(0x490)](_0x34f7c2);},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x175)]=function(_0x354927,_0x35da50){const _0x293190=_0x39f07d;if(this[_0x293190(0x523)](_0x354927,_0x35da50)['length']>0x0)return!![];if($gamePlayer['x']===_0x354927&&$gamePlayer['y']===_0x35da50)return!![];if(this['boat']()[_0x293190(0x593)](_0x354927,_0x35da50))return!![];if(this['ship']()[_0x293190(0x593)](_0x354927,_0x35da50))return!![];return![];},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x351)]=function(_0x91d13c,_0x46113a,_0x5483fc){const _0xd24c52=_0x39f07d;$gameTemp[_0xd24c52(0x472)]=_0x91d13c;const _0x36bf0b=new Game_Event(_0x91d13c[_0xd24c52(0x5cb)],_0x91d13c[_0xd24c52(0x4e2)]);$gameTemp[_0xd24c52(0x472)]=undefined,_0x36bf0b[_0xd24c52(0x1ce)]();let _0x2aa49d=_0x46113a-_0x36bf0b['_addedHitbox'][_0xd24c52(0x164)],_0x48b653=_0x46113a+_0x36bf0b['_addedHitbox']['right'],_0x588957=_0x5483fc-_0x36bf0b['_addedHitbox']['up'],_0x181bc0=_0x5483fc+_0x36bf0b[_0xd24c52(0x4e9)]['down'];for(let _0x5bc866=_0x2aa49d;_0x5bc866<=_0x48b653;_0x5bc866++){for(let _0x5a1d82=_0x588957;_0x5a1d82<=_0x181bc0;_0x5a1d82++){if(this['checkExistingEntitiesAt'](_0x5bc866,_0x5a1d82))return![];}}return!![];},Game_Map['prototype']['createSpawnedEventWithData']=function(_0x35fa01){const _0x170ebf=_0x39f07d;$gameTemp[_0x170ebf(0x472)]=_0x35fa01;const _0x439c2f=new Game_Event(_0x35fa01[_0x170ebf(0x5cb)],_0x35fa01[_0x170ebf(0x4e2)]);$gameTemp[_0x170ebf(0x472)]=undefined,this[_0x170ebf(0x5b5)][_0x170ebf(0xa6)](_0x439c2f),_0x439c2f[_0x170ebf(0x22f)](_0x35fa01),this[_0x170ebf(0x2bd)]();},Game_Map[_0x39f07d(0x287)]['prepareSpawnedEventAtXY']=function(_0x4a4250,_0x4a2b34,_0xcda1d0){const _0x22db4a=_0x39f07d,_0x5b0dc2=_0x4a4250[_0x22db4a(0x84)][_0x22db4a(0x321)]()[_0x22db4a(0x577)]();if(_0x5b0dc2!==_0x22db4a(0x8f)){const _0xbca294=VisuMZ[_0x22db4a(0x4b9)][_0x5b0dc2];if(_0xbca294){if(_0x22db4a(0x388)===_0x22db4a(0x29d))return this[_0x22db4a(0x197)](_0x4cc617);else _0x4a4250['mapId']=_0xbca294[_0x22db4a(0x2d3)],_0x4a4250['eventId']=_0xbca294['EventID'];}}const _0x195ef4=_0x4a4250['x'],_0x46b872=_0x4a4250['y'];if(!this[_0x22db4a(0x535)](_0x195ef4,_0x46b872))return![];if(_0x4a2b34){if(_0x22db4a(0x5ad)!=='LVPhT'){_0x406e0a=this['_opacity']-_0x494f50,this['setOpacity'](_0x3cabd2[_0x22db4a(0x330)](0x0,0xff));if(this[_0x22db4a(0x2fc)]>0x0)this[_0x22db4a(0x5c2)]--;}else{if(this[_0x22db4a(0x175)](_0x195ef4,_0x46b872))return![];if(!this[_0x22db4a(0x351)](_0x4a4250,_0x195ef4,_0x46b872))return![];}}if(_0xcda1d0){if(!this['isPassableByAnyDirection'](_0x195ef4,_0x46b872))return![];}return this[_0x22db4a(0x490)](_0x4a4250),!![];},Game_Map[_0x39f07d(0x287)][_0x39f07d(0xf0)]=function(_0xfea91,_0x5ad51c,_0x55d9e8,_0x44c371){const _0x20e60e=_0x39f07d,_0x2a81e7=_0xfea91[_0x20e60e(0x84)][_0x20e60e(0x321)]()[_0x20e60e(0x577)]();if(_0x2a81e7!=='UNTITLED'){const _0x5410bc=VisuMZ[_0x20e60e(0x4b9)][_0x2a81e7];if(_0x5410bc){if('utghB'==='cgOFD'){this[_0x20e60e(0x110)]=![];const _0x3fdfaa=_0x4794b9[_0x20e60e(0x12b)]||'';_0x3fdfaa[_0x20e60e(0x17c)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x20e60e(0x110)]=!![]);}else _0xfea91['mapId']=_0x5410bc[_0x20e60e(0x2d3)],_0xfea91[_0x20e60e(0x4e2)]=_0x5410bc[_0x20e60e(0x4b4)];}}const _0xd3c68a=[],_0x1061ac=this['width'](),_0x4b4179=this[_0x20e60e(0x2db)]();for(let _0x53f6a0=0x0;_0x53f6a0<_0x1061ac;_0x53f6a0++){if(_0x20e60e(0x34f)===_0x20e60e(0x34f))for(let _0x44aad5=0x0;_0x44aad5<_0x4b4179;_0x44aad5++){if(!_0x5ad51c['includes'](this[_0x20e60e(0x3b4)](_0x53f6a0,_0x44aad5)))continue;if(!this['isValid'](_0x53f6a0,_0x44aad5))continue;if(_0x55d9e8){if(this[_0x20e60e(0x175)](_0x53f6a0,_0x44aad5))continue;if(!this[_0x20e60e(0x351)](_0xfea91,_0x53f6a0,_0x44aad5))continue;}if(_0x44c371){if(!this[_0x20e60e(0x3e4)](_0x53f6a0,_0x44aad5))continue;}_0xd3c68a[_0x20e60e(0xa6)]([_0x53f6a0,_0x44aad5]);}else{if(_0x25e6e7[_0x20e60e(0x1bd)][_0x20e60e(0x113)]===_0x271dc6)return![];return _0x30518f[_0x20e60e(0x4f1)][_0x20e60e(0x310)](_0x40f0b9);}}if(_0xd3c68a[_0x20e60e(0x5be)]>0x0){const _0x399bcc=_0xd3c68a[Math[_0x20e60e(0x40b)](_0xd3c68a[_0x20e60e(0x5be)])];return _0xfea91['x']=_0x399bcc[0x0],_0xfea91['y']=_0x399bcc[0x1],this['createSpawnedEventWithData'](_0xfea91),!![];}return![];},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x1c6)]=function(_0x2e4936,_0x55c1d1,_0x1a532d,_0x55040f){const _0x35c8ac=_0x39f07d,_0x26a7b1=_0x2e4936[_0x35c8ac(0x84)][_0x35c8ac(0x321)]()[_0x35c8ac(0x577)]();if(_0x26a7b1!==_0x35c8ac(0x8f)){const _0x237e62=VisuMZ[_0x35c8ac(0x4b9)][_0x26a7b1];if(_0x237e62){if('MIVLF'!==_0x35c8ac(0x529))return this[_0x35c8ac(0xab)](0x3,_0x39152e(_0xe013e['$1']));else _0x2e4936['mapId']=_0x237e62[_0x35c8ac(0x2d3)],_0x2e4936[_0x35c8ac(0x4e2)]=_0x237e62[_0x35c8ac(0x4b4)];}}const _0x51be7d=[],_0x43831d=this[_0x35c8ac(0x5c3)](),_0x4ba2cd=this['height']();for(let _0x5d3391=0x0;_0x5d3391<_0x43831d;_0x5d3391++){for(let _0x37c78c=0x0;_0x37c78c<_0x4ba2cd;_0x37c78c++){if(!_0x55c1d1['includes'](this['terrainTag'](_0x5d3391,_0x37c78c)))continue;if(!this[_0x35c8ac(0x535)](_0x5d3391,_0x37c78c))continue;if(_0x1a532d){if(this[_0x35c8ac(0x175)](_0x5d3391,_0x37c78c))continue;if(!this[_0x35c8ac(0x351)](_0x2e4936,_0x5d3391,_0x37c78c))continue;}if(_0x55040f){if(!this[_0x35c8ac(0x3e4)](_0x5d3391,_0x37c78c))continue;}_0x51be7d[_0x35c8ac(0xa6)]([_0x5d3391,_0x37c78c]);}}if(_0x51be7d[_0x35c8ac(0x5be)]>0x0){const _0x52ff88=_0x51be7d[Math['randomInt'](_0x51be7d[_0x35c8ac(0x5be)])];return _0x2e4936['x']=_0x52ff88[0x0],_0x2e4936['y']=_0x52ff88[0x1],this[_0x35c8ac(0x490)](_0x2e4936),!![];}return![];},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x3e4)]=function(_0x1ba0d1,_0x15c715){const _0x55a650=_0x39f07d;if(this[_0x55a650(0x52b)](_0x1ba0d1,_0x15c715,0x2))return!![];if(this['isPassable'](_0x1ba0d1,_0x15c715,0x4))return!![];if(this[_0x55a650(0x52b)](_0x1ba0d1,_0x15c715,0x6))return!![];if(this[_0x55a650(0x52b)](_0x1ba0d1,_0x15c715,0x8))return!![];return![];},Game_Map['prototype']['despawnEventId']=function(_0x310d12){const _0x4f2025=_0x39f07d;if(_0x310d12<0x3e8)return;if(!this[_0x4f2025(0x5b5)])return;const _0x3f741c=this[_0x4f2025(0x3f5)](_0x310d12);_0x3f741c[_0x4f2025(0x94)](-0x1,-0x1),_0x3f741c['erase'](),this[_0x4f2025(0x5b5)][_0x310d12-0x3e8]=null,this[_0x4f2025(0x2bd)]();},Game_Map[_0x39f07d(0x287)][_0x39f07d(0xef)]=function(){const _0x5cfc57=_0x39f07d;for(const _0x401e50 of this[_0x5cfc57(0x5b5)]){if(_0x401e50)return _0x401e50;}return null;},Game_Map[_0x39f07d(0x287)][_0x39f07d(0xa8)]=function(){const _0x4b1587=_0x39f07d,_0x292d37=this[_0x4b1587(0xef)]();return _0x292d37?_0x292d37[_0x4b1587(0x418)]:0x0;},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x293)]=function(){const _0x2d75c4=_0x39f07d,_0x302297=this['_spawnedEvents'][_0x2d75c4(0x586)](0x0)[_0x2d75c4(0x489)]();for(const _0x3af7cb of _0x302297){if(_0x3af7cb)return _0x3af7cb;}return null;},Game_Map[_0x39f07d(0x287)]['lastSpawnedEventID']=function(){const _0x43cec0=_0x39f07d,_0x2b3fea=this[_0x43cec0(0x293)]();return _0x2b3fea?_0x2b3fea[_0x43cec0(0x418)]:0x0;},Game_Map['prototype'][_0x39f07d(0x54f)]=function(_0x557ebb,_0x35b146){const _0x187bc5=_0x39f07d,_0x35ffeb=this['eventsXy'](_0x557ebb,_0x35b146);for(const _0x46a73a of _0x35ffeb){if(!_0x46a73a)continue;if(_0x46a73a[_0x187bc5(0x536)]())this[_0x187bc5(0x5a6)](_0x46a73a['_eventId']);}},Game_Map['prototype'][_0x39f07d(0x20f)]=function(_0x4eb322){const _0x5aa290=_0x39f07d;for(const _0x49be5c of this['_spawnedEvents']){if(_0x5aa290(0x38a)===_0x5aa290(0x379)){if(this[_0x5aa290(0x564)]===_0x3b369b)this[_0x5aa290(0x8b)]();if(this[_0x5aa290(0x564)][_0x5aa290(0x4ac)]===_0x1543be)this[_0x5aa290(0x8b)]();this[_0x5aa290(0x564)][_0x5aa290(0x4ac)]=_0xbadcc6;}else{if(!_0x49be5c)continue;if(_0x4eb322[_0x5aa290(0x310)](_0x49be5c['regionId']())){if(_0x5aa290(0x260)!==_0x5aa290(0x260)){if(this[_0x5aa290(0x4c0)]<=0x0)return;this['_paused']=!![],this[_0x5aa290(0x291)]=!![];}else this[_0x5aa290(0x5a6)](_0x49be5c[_0x5aa290(0x418)]);}}}},Game_Map[_0x39f07d(0x287)]['despawnTerrainTags']=function(_0x2925cf){const _0x59f00c=_0x39f07d;for(const _0x5056e5 of this['_spawnedEvents']){if(!_0x5056e5)continue;_0x2925cf[_0x59f00c(0x310)](_0x5056e5[_0x59f00c(0x392)]())&&this[_0x59f00c(0x5a6)](_0x5056e5[_0x59f00c(0x418)]);}},Game_Map['prototype'][_0x39f07d(0x49e)]=function(){const _0x4d1958=_0x39f07d;for(const _0x2d6cb3 of this[_0x4d1958(0x5b5)]){if(!_0x2d6cb3)continue;this[_0x4d1958(0x5a6)](_0x2d6cb3[_0x4d1958(0x418)]);}},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x4ad)]=Game_Map['prototype'][_0x39f07d(0x3f8)],Game_Map[_0x39f07d(0x287)]['unlockEvent']=function(_0x2e6f65){const _0x1769f5=_0x39f07d;VisuMZ[_0x1769f5(0x41c)][_0x1769f5(0x4ad)]['call'](this,_0x2e6f65);if(_0x2e6f65>=0x3e8){const _0x2a298c=this[_0x1769f5(0x3f5)](_0x2e6f65);if(_0x2a298c)_0x2a298c['unlock']();}},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x81)]=function(){const _0x4d6f18=_0x39f07d;this[_0x4d6f18(0x123)]=![],this[_0x4d6f18(0x236)]=![];if(!$dataMap)return;const _0x211564=$dataMap[_0x4d6f18(0x12b)]||'';if(_0x211564[_0x4d6f18(0x17c)](/<HIDE PLAYER>/i)){if(_0x4d6f18(0x354)!==_0x4d6f18(0x52e))this[_0x4d6f18(0x123)]=![],this[_0x4d6f18(0x236)]=!![];else{const _0x54f0de=this[_0x4d6f18(0x3bb)](_0x5e2140,_0x41377d,!![]);if(_0x54f0de)this[_0x4d6f18(0x356)](_0x54f0de);}}else _0x211564[_0x4d6f18(0x17c)](/<SHOW PLAYER>/i)&&(this['_forceShowPlayer']=!![],this[_0x4d6f18(0x236)]=![]);},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x1be)]=function(){const _0x49dcba=_0x39f07d;return this['_forceShowPlayer']===undefined&&this[_0x49dcba(0x81)](),this[_0x49dcba(0x123)];},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x1a3)]=function(){const _0x7f1107=_0x39f07d;return this[_0x7f1107(0x236)]===undefined&&this['setupPlayerVisibilityOverrides'](),this[_0x7f1107(0x236)];},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x1db)]=Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x342)],Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x342)]=function(){const _0x10c257=_0x39f07d;if(this===$gamePlayer){if($gameMap[_0x10c257(0x1be)]())return![];if($gameMap['isPlayerForceHidden']())return!![];}return VisuMZ[_0x10c257(0x41c)][_0x10c257(0x1db)][_0x10c257(0x341)](this);},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x251)]=function(){const _0x284f3a=_0x39f07d;this[_0x284f3a(0x4c2)]=![],this[_0x284f3a(0x2c7)]=![];if(!$dataMap)return;const _0x5303a7=$dataMap[_0x284f3a(0x12b)]||'';if(_0x5303a7[_0x284f3a(0x17c)](/<HIDE FOLLOWERS>/i))this[_0x284f3a(0x4c2)]=![],this[_0x284f3a(0x2c7)]=!![];else{if(_0x5303a7[_0x284f3a(0x17c)](/<SHOW FOLLOWERS>/i)){if(_0x284f3a(0x22e)===_0x284f3a(0x56d)){if(this['_SavedEventLocations']===_0x67d895)this[_0x284f3a(0x8b)]();const _0x44607c=_0x284f3a(0xa4)['format'](_0x311a59,_0x4fb4aa);delete this[_0x284f3a(0x1ad)][_0x44607c];}else this[_0x284f3a(0x4c2)]=!![],this[_0x284f3a(0x2c7)]=![];}}},Game_Map['prototype'][_0x39f07d(0xca)]=function(){const _0x527aed=_0x39f07d;return this['_forceShowFollower']===undefined&&this['setupFollowerVisibilityOverrides'](),this[_0x527aed(0x4c2)];},Game_Map[_0x39f07d(0x287)]['areFollowersForceHidden']=function(){const _0x2156fe=_0x39f07d;return this[_0x2156fe(0x2c7)]===undefined&&this['setupFollowerVisibilityOverrides'](),this[_0x2156fe(0x2c7)];},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x1c4)]=Game_Followers[_0x39f07d(0x287)][_0x39f07d(0xff)],Game_Followers[_0x39f07d(0x287)][_0x39f07d(0xff)]=function(){const _0x5428ed=_0x39f07d;if($gameMap[_0x5428ed(0xca)]())return!![];if($gameMap[_0x5428ed(0xc2)]())return![];return VisuMZ['EventsMoveCore'][_0x5428ed(0x1c4)]['call'](this);},Game_CommonEvent['prototype'][_0x39f07d(0x554)]=function(){const _0x2d9205=_0x39f07d,_0x470133=this[_0x2d9205(0x3f5)]();return this[_0x2d9205(0x2b8)]()&&_0x470133[_0x2d9205(0x4d0)]>=0x1&&DataManager[_0x2d9205(0x314)](_0x470133[_0x2d9205(0x429)]);},Game_CommonEvent[_0x39f07d(0x287)]['hasCPCs']=function(){const _0x5be5b1=_0x39f07d;return VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x5be5b1(0x4f3)][_0x5be5b1(0x310)](this[_0x5be5b1(0x4dd)]);},VisuMZ[_0x39f07d(0x41c)]['Game_CommonEvent_isActive']=Game_CommonEvent[_0x39f07d(0x287)][_0x39f07d(0x2b8)],Game_CommonEvent[_0x39f07d(0x287)]['isActive']=function(){const _0x1a157d=_0x39f07d;if(VisuMZ[_0x1a157d(0x41c)][_0x1a157d(0x52c)][_0x1a157d(0x341)](this))return'UEpbn'!==_0x1a157d(0x510)?!![]:this['processMoveRouteSelfVariable'](_0x48b854['$1'],_0xab84ed['$2']);else{if(_0x1a157d(0x599)===_0x1a157d(0x599)){const _0x5d8cd7=this['event']();return VisuMZ[_0x1a157d(0x41c)][_0x1a157d(0x504)][_0x1a157d(0x513)](this['event']()[_0x1a157d(0x2bc)],this[_0x1a157d(0x4dd)],_0x5d8cd7);}else{const _0x4006e9=this[_0x1a157d(0x5b5)][_0x1a157d(0x586)](0x0)['reverse']();for(const _0x3ebd16 of _0x4006e9){if(_0x3ebd16)return _0x3ebd16;}return null;}}},VisuMZ[_0x39f07d(0x41c)]['Game_Map_parallelCommonEvents']=Game_Map['prototype']['parallelCommonEvents'],Game_Map[_0x39f07d(0x287)][_0x39f07d(0x520)]=function(){const _0x399e69=_0x39f07d,_0x214c27=VisuMZ[_0x399e69(0x41c)][_0x399e69(0x23c)][_0x399e69(0x341)](this),_0x2f094f=VisuMZ['EventsMoveCore'][_0x399e69(0x504)][_0x399e69(0x4f3)]['map'](_0x38f465=>$dataCommonEvents[_0x38f465]);return _0x214c27[_0x399e69(0x416)](_0x2f094f)[_0x399e69(0x48a)]((_0x471706,_0x51db9f,_0x3c999b)=>_0x3c999b[_0x399e69(0x362)](_0x471706)===_0x51db9f);},Game_CharacterBase['ALLOW_LADDER_DASH']=VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x2a4)][_0x39f07d(0x258)][_0x39f07d(0x1f7)]??![],VisuMZ['EventsMoveCore'][_0x39f07d(0x3a4)]=Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x4b6)],Game_CharacterBase[_0x39f07d(0x287)]['initMembers']=function(){const _0x5b7b9f=_0x39f07d;VisuMZ['EventsMoveCore'][_0x5b7b9f(0x3a4)]['call'](this),this[_0x5b7b9f(0xdb)]();},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0xdb)]=function(){const _0x597740=_0x39f07d;this['_patternLocked']=![],this[_0x597740(0x44d)](),this['clearDashing'](),this[_0x597740(0xf8)](),this[_0x597740(0xac)]();},VisuMZ['EventsMoveCore'][_0x39f07d(0x3d9)]=Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x15b)],Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x15b)]=function(){const _0x350b5b=_0x39f07d;let _0x27d6b6=VisuMZ[_0x350b5b(0x41c)][_0x350b5b(0x3d9)][_0x350b5b(0x341)](this);return _0x27d6b6=this[_0x350b5b(0x9f)](_0x27d6b6),_0x27d6b6;},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x9f)]=function(_0x517ed9){return _0x517ed9;},Game_CharacterBase[_0x39f07d(0x287)]['isSpriteVS8dir']=function(){const _0x46bef1=_0x39f07d;if(this[_0x46bef1(0x113)]===Game_Player&&this[_0x46bef1(0x549)]())return this['vehicle']()[_0x46bef1(0x2a6)]()[_0x46bef1(0x17c)](/\[VS8\]/i);else{if(Imported['VisuMZ_2_DragonbonesUnion']&&this['hasDragonbones']())return _0x46bef1(0x4a3)===_0x46bef1(0x45b)?_0x8b01f8>0x0?0x2:0x8:!![];else{if(_0x46bef1(0x26d)!==_0x46bef1(0x26d)){const _0x13dee1=_0x5ce06c['EventTemplates'][_0xc65ed4];_0x13dee1&&(_0x87061e[_0x46bef1(0x5cb)]=_0x13dee1[_0x46bef1(0x2d3)],_0x3c18db[_0x46bef1(0x4e2)]=_0x13dee1[_0x46bef1(0x4b4)]);}else return this[_0x46bef1(0x2a6)]()[_0x46bef1(0x17c)](/\[VS8\]/i);}}},VisuMZ[_0x39f07d(0x41c)]['Game_CharacterBase_direction']=Game_CharacterBase['prototype'][_0x39f07d(0x151)],Game_CharacterBase[_0x39f07d(0x287)]['direction']=function(){const _0x1f624f=_0x39f07d;if(!$dataMap)return this[_0x1f624f(0x11a)]||0x2;if(this['isOnLadder']()&&!this[_0x1f624f(0x4d8)]()&&this[_0x1f624f(0x2c2)]()){if(_0x1f624f(0x385)===_0x1f624f(0x487)){const _0x1ba2a0=[_0x1e0619,_0x4196a1,'Self\x20Variable\x20%1'[_0x1f624f(0x307)](_0x2c453e)];_0x16e562[_0x1f624f(0xf2)](_0x1ba2a0,_0x1dd260);}else return this[_0x1f624f(0x337)]();}else{if(this['isOnLadder']()&&!this[_0x1f624f(0x4d8)]())return'QnEda'!=='QnEda'?this[_0x1f624f(0x55f)]()?0x4:0x2:0x8;else{if(this[_0x1f624f(0x1a7)]()&&this[_0x1f624f(0x2c2)]()){if(_0x1f624f(0x198)===_0x1f624f(0x198))return this[_0x1f624f(0x393)]();else{const _0x1ba9e7=this[_0x1f624f(0x3f5)]()[_0x1f624f(0x12b)];if(_0x1ba9e7==='')return;if(_0x2eac18[_0x1f624f(0x3e5)]()||_0x2bfc64['isEventTest']())return;const _0x14ab86=_0x451c31['EventsMoveCore'][_0x1f624f(0x2a4)][_0x1f624f(0x27a)];let _0x34e776=null,_0x2abf72=0x0,_0x3d8add=0x0;if(_0x1ba9e7[_0x1f624f(0x17c)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x2abf72=_0x52e738(_0x10b1a7['$1']),_0x3d8add=_0x55fcfc(_0x4d39b2['$2']);if(_0x2abf72===0x0)_0x2abf72=_0x5942a1[_0x1f624f(0x5cb)]();}else{if(_0x1ba9e7[_0x1f624f(0x17c)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){_0x2abf72=_0x3a1b4b(_0x4f245c['$1']),_0x3d8add=_0x35edfb(_0x3a7599['$2']);if(_0x2abf72===0x0)_0x2abf72=_0x52872e[_0x1f624f(0x5cb)]();}else{if(_0x1ba9e7['match'](/<COPY EVENT:[ ](.*?)>/i)){const _0x4083a8=_0x5283ae(_0xc8890f['$1'])[_0x1f624f(0x321)]()['trim']();_0x34e776=_0x39596e[_0x1f624f(0x4b9)][_0x4083a8];if(!_0x34e776)return;_0x2abf72=_0x34e776[_0x1f624f(0x2d3)],_0x3d8add=_0x34e776[_0x1f624f(0x4b4)];}}}if(!this[_0x1f624f(0x3cc)](_0x2abf72,_0x3d8add))return;_0x14ab86[_0x1f624f(0x343)][_0x1f624f(0x341)](this,_0x2abf72,_0x3d8add,this);if(_0x34e776)_0x34e776[_0x1f624f(0x343)][_0x1f624f(0x341)](this,_0x2abf72,_0x3d8add,this);this[_0x1f624f(0x16a)]={'mapId':_0x2abf72,'eventId':_0x3d8add},this[_0x1f624f(0x5c5)]=-0x2,this['refresh'](),_0x14ab86[_0x1f624f(0x4cc)][_0x1f624f(0x341)](this,_0x2abf72,_0x3d8add,this);if(_0x34e776)_0x34e776[_0x1f624f(0x4cc)][_0x1f624f(0x341)](this,_0x2abf72,_0x3d8add,this);_0x2e31c6[_0x1f624f(0x2bd)]();}}else return VisuMZ[_0x1f624f(0x41c)][_0x1f624f(0x17d)][_0x1f624f(0x341)](this);}}},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x149)]=Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0xa7)],Game_CharacterBase[_0x39f07d(0x287)]['setDirection']=function(_0x11b39d){const _0x4071d7=_0x39f07d;if(!this[_0x4071d7(0x2c2)]())_0x11b39d=this[_0x4071d7(0x5a3)](_0x11b39d);VisuMZ[_0x4071d7(0x41c)][_0x4071d7(0x149)][_0x4071d7(0x341)](this,_0x11b39d);},Game_CharacterBase[_0x39f07d(0x287)]['correctFacingDirection']=function(_0xece4e7){const _0x2d5256=_0x39f07d;if(_0xece4e7===0x1)return this[_0x2d5256(0x2c9)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0xece4e7===0x3)return this[_0x2d5256(0x2c9)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0xece4e7===0x7)return this[_0x2d5256(0x2c9)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0xece4e7===0x9)return this[_0x2d5256(0x2c9)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0xece4e7;},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x12c)]=function(_0x21be95){const _0x2cf9f9=_0x39f07d;return[0x1,0x3,0x5,0x7,0x9][_0x2cf9f9(0x310)](_0x21be95);},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x2a9)]=function(){const _0x5e0cd9=_0x39f07d;return this[_0x5e0cd9(0x102)]||0x0;},VisuMZ['EventsMoveCore'][_0x39f07d(0x303)]=Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x97)],Game_CharacterBase['prototype'][_0x39f07d(0x97)]=function(_0x5e5172){const _0x3d4cac=_0x39f07d;this[_0x3d4cac(0x102)]=_0x5e5172,VisuMZ[_0x3d4cac(0x41c)][_0x3d4cac(0x303)]['call'](this,_0x5e5172);},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x356)]=function(_0xdbcb2d){const _0x599393=_0x39f07d;if(!this['isDiagonalDirection'](_0xdbcb2d))return this['moveStraight'](_0xdbcb2d);let _0x189125=0x0,_0x1cc504=0x0;switch(_0xdbcb2d){case 0x1:_0x189125=0x4,_0x1cc504=0x2;break;case 0x3:_0x189125=0x6,_0x1cc504=0x2;break;case 0x7:_0x189125=0x4,_0x1cc504=0x8;break;case 0x9:_0x189125=0x6,_0x1cc504=0x8;break;}if(VisuMZ['EventsMoveCore'][_0x599393(0x2a4)]['Movement'][_0x599393(0x353)]){if(!this['canPass'](this['_x'],this['_y'],_0x189125))return this[_0x599393(0x97)](_0x1cc504);if(!this['canPass'](this['_x'],this['_y'],_0x1cc504))return this[_0x599393(0x97)](_0x189125);if(!this[_0x599393(0x4aa)](this['_x'],this['_y'],_0x189125,_0x1cc504)){if(_0x599393(0x5b1)==='vCPKB')this['_selfTarget']=_0x3b2503;else{let _0x318312=VisuMZ[_0x599393(0x41c)][_0x599393(0x2a4)]['Movement'][_0x599393(0x543)]?_0x189125:_0x1cc504;return this['moveStraight'](_0x318312);}}}this['_lastMovedDirection']=_0xdbcb2d,this[_0x599393(0x2ed)](_0x189125,_0x1cc504);},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x4f2)]=Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x334)],Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x334)]=function(){const _0x4c294e=_0x39f07d;let _0x25b97b=this['_moveSpeed'];return this[_0x4c294e(0x3fe)]()&&(_0x25b97b+=this['dashSpeedModifier']()),this[_0x4c294e(0x146)](_0x25b97b);},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x19f)]=function(){const _0x3b0c4d=_0x39f07d,_0x16f9c9=VisuMZ[_0x3b0c4d(0x41c)][_0x3b0c4d(0x2a4)][_0x3b0c4d(0x258)];if(_0x16f9c9[_0x3b0c4d(0x3d6)]!==undefined){if(_0x3b0c4d(0x4f5)===_0x3b0c4d(0x389))_0x4f2c50=_0x5eab53[_0x3b0c4d(0x3e9)](_0x4e1ede,(_0xaa285b,_0x54d70c)=>_0x2de158[_0x3b0c4d(0x319)](_0x2ff214(_0x54d70c)));else return _0x16f9c9['DashModifier'];}else{if(_0x3b0c4d(0x43a)!=='PCWei')return VisuMZ[_0x3b0c4d(0x41c)]['Game_CharacterBase_realMoveSpeed'][_0x3b0c4d(0x341)](this)-this['_moveSpeed'];else{const _0x2942b1=this[_0x3b0c4d(0x16a)]['mapId'],_0x368eb6=this['_eventCopyData'][_0x3b0c4d(0x4e2)];return _0xe17fd0[_0x3b0c4d(0x3bd)](_0x2942b1,_0x368eb6);}}},Game_CharacterBase[_0x39f07d(0x287)]['adjustDir8MovementSpeed']=function(_0x26ecfc){const _0x4021e8=_0x39f07d,_0x2bb0e5=VisuMZ[_0x4021e8(0x41c)][_0x4021e8(0x2a4)]['Movement'];if(!_0x2bb0e5['SlowerSpeed'])return _0x26ecfc;if([0x1,0x3,0x7,0x9][_0x4021e8(0x310)](this[_0x4021e8(0x102)])){if(_0x4021e8(0x4e8)==='LKsGM')_0x26ecfc*=_0x2bb0e5['DiagonalSpeedMultiplier']||0.01;else return this['characterPatternYBasic']();}return _0x26ecfc;},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0xcc)]=Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x3fe)],Game_CharacterBase['prototype'][_0x39f07d(0x3fe)]=function(){const _0x16e094=_0x39f07d;if(!Game_CharacterBase[_0x16e094(0x497)]&&this[_0x16e094(0x54c)]())return![];if(this['_forceDashing'])return!![];return VisuMZ[_0x16e094(0x41c)][_0x16e094(0xcc)][_0x16e094(0x341)](this);},Game_CharacterBase[_0x39f07d(0x287)]['isDashingAndMoving']=function(){const _0x4fbd9c=_0x39f07d;return this[_0x4fbd9c(0x3fe)]()&&this[_0x4fbd9c(0x1e8)]===0x0;},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x498)]=Game_CharacterBase[_0x39f07d(0x287)]['pattern'],Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x145)]=function(){const _0x2b50f0=_0x39f07d;return this[_0x2b50f0(0x1a7)]()?this[_0x2b50f0(0x179)]():VisuMZ[_0x2b50f0(0x41c)][_0x2b50f0(0x498)][_0x2b50f0(0x341)](this);},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0xd2)]=Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x3d8)],Game_CharacterBase[_0x39f07d(0x287)]['increaseSteps']=function(){const _0x3a8ab6=_0x39f07d;VisuMZ['EventsMoveCore'][_0x3a8ab6(0xd2)]['call'](this),this[_0x3a8ab6(0x44d)]();},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x182)]=Game_CharacterBase[_0x39f07d(0x287)]['characterIndex'],Game_CharacterBase[_0x39f07d(0x287)]['characterIndex']=function(){const _0x4b6616=_0x39f07d;if(this[_0x4b6616(0x2c2)]())return this[_0x4b6616(0x15f)]();return VisuMZ[_0x4b6616(0x41c)]['Game_CharacterBase_characterIndex'][_0x4b6616(0x341)](this);},Game_CharacterBase['prototype'][_0x39f07d(0x15f)]=function(){const _0x20b8a5=_0x39f07d,_0x154df6=this[_0x20b8a5(0x151)]();if(this['isJumping']()){if([0x2,0x4,0x6,0x8][_0x20b8a5(0x310)](_0x154df6))return 0x4;if([0x1,0x3,0x7,0x9][_0x20b8a5(0x310)](_0x154df6))return 0x5;}else{if(this[_0x20b8a5(0x54c)]())return 0x6;else{if(this[_0x20b8a5(0x1a7)]())return this[_0x20b8a5(0x9d)]();else{if(this['_forceCarrying']){if([0x2,0x4,0x6,0x8][_0x20b8a5(0x310)](_0x154df6))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x154df6))return 0x5;}else{if(this['hasEventIcon']()&&this[_0x20b8a5(0x4ba)]()){if(_0x20b8a5(0x33e)!==_0x20b8a5(0x33e)){const _0x3e57b6=/\\SELFVAR\[(\d+)\]/gi;while(_0x25c606[_0x20b8a5(0x17c)](_0x3e57b6)){_0x185408=_0x3c4bf7['replace'](_0x3e57b6,(_0x33b49c,_0x2b1ea5)=>_0x44679e(this[_0x20b8a5(0x1c1)],this['_eventId'],_0x6726b9(_0x2b1ea5)));}return _0x2702e0;}else{if([0x2,0x4,0x6,0x8][_0x20b8a5(0x310)](_0x154df6))return 0x4;if([0x1,0x3,0x7,0x9][_0x20b8a5(0x310)](_0x154df6))return 0x5;}}else{if(this[_0x20b8a5(0x551)]()){if([0x2,0x4,0x6,0x8][_0x20b8a5(0x310)](_0x154df6))return 0x2;if([0x1,0x3,0x7,0x9][_0x20b8a5(0x310)](_0x154df6))return 0x3;}else{if([0x2,0x4,0x6,0x8][_0x20b8a5(0x310)](_0x154df6))return 0x0;if([0x1,0x3,0x7,0x9][_0x20b8a5(0x310)](_0x154df6))return 0x1;}}}}}}},Game_CharacterBase['prototype']['useCarryPoseForIcons']=function(){const _0x375341=_0x39f07d;return VisuMZ['EventsMoveCore'][_0x375341(0x2a4)]['VS8'][_0x375341(0x384)];},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x55f)]=function(){const _0x41c838=_0x39f07d;return this['isOnLadder']()&&this[_0x41c838(0x392)]()===VisuMZ['EventsMoveCore'][_0x41c838(0x2a4)][_0x41c838(0x249)]['Rope'];},Game_CharacterBase[_0x39f07d(0x287)]['directionOnLadderSpriteVS8dir']=function(){const _0x273b6c=_0x39f07d;if(this['isOnRope']())return _0x273b6c(0x165)===_0x273b6c(0x264)?!![]:0x4;else{if(_0x273b6c(0x427)!==_0x273b6c(0x444))return 0x2;else{if(!_0x176668[_0x273b6c(0x19c)]())return![];if(this[_0x273b6c(0x2cd)]?.['_erased'])return![];if(this['_event']&&this['_event'][_0x273b6c(0x5c5)]<0x0)return![];if(_0x4b3f8e[_0x273b6c(0x1bd)]['_encounterEffectDuration']>0x0)return![];const _0x5e9828=_0x2b8b58['x'],_0x3b4afa=_0xe805c['y'],_0x49e2be=this[_0x273b6c(0x2cd)]['x'],_0x44f6d6=this[_0x273b6c(0x2cd)]['y'];if(this[_0x273b6c(0x332)]===_0x5e9828&&this['_visiblePlayerY']===_0x3b4afa&&this['_visibleEventX']===_0x49e2be&&this[_0x273b6c(0x297)]===_0x44f6d6)return this['_cacheVisibility'];this[_0x273b6c(0x332)]=_0x18a1dd['x'],this[_0x273b6c(0x57b)]=_0xc8a3cb['y'],this[_0x273b6c(0x150)]=this[_0x273b6c(0x2cd)]['x'],this[_0x273b6c(0x297)]=this[_0x273b6c(0x2cd)]['y'];if(_0x1d693b['absDistance'](_0x5e9828,_0x3b4afa,_0x49e2be,_0x44f6d6)>this[_0x273b6c(0x2cd)][_0x273b6c(0x412)]())return this[_0x273b6c(0x14c)]=![],![];return this[_0x273b6c(0x14c)]=!![],!![];}}},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x29e)]=Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x12e)],Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x12e)]=function(){const _0x3153be=_0x39f07d;VisuMZ[_0x3153be(0x41c)][_0x3153be(0x29e)][_0x3153be(0x341)](this),this['updatePose']();},Game_CharacterBase[_0x39f07d(0x287)]['updatePose']=function(){const _0x40c309=_0x39f07d;this[_0x40c309(0x455)]=this['_poseDuration']||0x0;if(this['_poseDuration']>0x0){if(_0x40c309(0x53c)==='UaYGd')this['removeTemporaryMapSpawnedEvents'](_0x283364),this[_0x40c309(0x2bd)](),_0xbd5cb['EventsMoveCore']['Game_Map_setup']['call'](this,_0x5e334a),this['clearEventCache'](),this[_0x40c309(0xea)](),this[_0x40c309(0x5c8)](),this[_0x40c309(0x225)](),this['setupSpawnedEvents'](),this[_0x40c309(0x81)](),this[_0x40c309(0x251)](),this[_0x40c309(0x2bd)]();else{this[_0x40c309(0x455)]--;if(this[_0x40c309(0x455)]<=0x0&&this[_0x40c309(0x380)]!==_0x40c309(0x46f))this['clearPose']();}}},VisuMZ['EventsMoveCore'][_0x39f07d(0xbc)]=Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x2ed)],Game_CharacterBase['prototype']['moveDiagonally']=function(_0x275e00,_0x26618d){const _0x988114=_0x39f07d;VisuMZ[_0x988114(0x41c)][_0x988114(0xbc)][_0x988114(0x341)](this,_0x275e00,_0x26618d);if(this[_0x988114(0x2c2)]())this['setDiagonalDirection'](_0x275e00,_0x26618d);},Game_CharacterBase['prototype'][_0x39f07d(0x147)]=function(_0x263945,_0x1cb4fe){const _0x36e406=_0x39f07d;if(_0x263945===0x4&&_0x1cb4fe===0x2)this[_0x36e406(0xa7)](0x1);if(_0x263945===0x6&&_0x1cb4fe===0x2)this[_0x36e406(0xa7)](0x3);if(_0x263945===0x4&&_0x1cb4fe===0x8)this[_0x36e406(0xa7)](0x7);if(_0x263945===0x6&&_0x1cb4fe===0x8)this['setDirection'](0x9);},VisuMZ['EventsMoveCore']['Game_CharacterBase_hasStepAnime']=Game_CharacterBase['prototype']['hasStepAnime'],Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x37e)]=function(){const _0x3bca1a=_0x39f07d;if(this[_0x3bca1a(0x1a7)]()&&this['getPose']()===_0x3bca1a(0x46f))return!![];return VisuMZ[_0x3bca1a(0x41c)][_0x3bca1a(0x1a1)][_0x3bca1a(0x341)](this);},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x4b2)]=function(_0x578f2b,_0xf46130){const _0x138701=_0x39f07d;if(_0x578f2b[_0x138701(0x17c)](/Z/i))_0x578f2b=_0x138701(0x46f);if(_0x578f2b[_0x138701(0x17c)](/SLEEP/i))_0x578f2b=_0x138701(0x46f);this['isSpriteVS8dir']()&&(this[_0x138701(0x380)]=_0x578f2b['toUpperCase']()[_0x138701(0x577)](),this['_poseDuration']=_0xf46130||Infinity);},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x1ea)]=function(){const _0x1b44cb=_0x39f07d;if(this[_0x1b44cb(0x2c2)]())return(this[_0x1b44cb(0x380)]||'')['toUpperCase']()['trim']();else{if(_0x1b44cb(0x36a)===_0x1b44cb(0x23e))_0x1e8682[_0x150657]=_0x3f9e59[_0xa9b130][_0x1b44cb(0x586)](0x0);else return''[_0x1b44cb(0x321)]()[_0x1b44cb(0x577)]();}},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x103)]=function(_0x2e8bc6,_0x4aa793){const _0x22d761=_0x39f07d;if(this[_0x22d761(0x2c2)]()){const _0x24f6d5=['',_0x22d761(0x375),_0x22d761(0x52a),_0x22d761(0x271),_0x22d761(0x582),_0x22d761(0x2bb),'SWEAT','COBWEB',_0x22d761(0xc3),_0x22d761(0x4e1),_0x22d761(0x46f),'','','','',''][_0x2e8bc6];this[_0x22d761(0x4b2)](_0x24f6d5,_0x4aa793);}},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x44d)]=function(){const _0x853549=_0x39f07d;this['_pose']='',this[_0x853549(0x455)]=0x0;},Game_CharacterBase['prototype']['isPosing']=function(){const _0x24459b=_0x39f07d;return this[_0x24459b(0x2c2)]()&&!!this[_0x24459b(0x380)];},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x9d)]=function(){const _0x25f44e=_0x39f07d,_0x1dbf9d=this[_0x25f44e(0x380)][_0x25f44e(0x321)]();switch(this[_0x25f44e(0x380)]['toUpperCase']()['trim']()){case _0x25f44e(0x294):case _0x25f44e(0x3b8):case _0x25f44e(0x421):case'HURT':case _0x25f44e(0x218):case'COLLAPSE':return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x393)]=function(){const _0x90443e=_0x39f07d;switch(this[_0x90443e(0x380)]['toUpperCase']()){case'EXCLAMATION':case _0x90443e(0x52a):case _0x90443e(0x271):case'!':case'?':return 0x2;break;case _0x90443e(0x582):case _0x90443e(0x2bb):case'SWEAT':return 0x4;break;case _0x90443e(0x294):case'HMPH':case _0x90443e(0x421):case _0x90443e(0x2cb):case _0x90443e(0xc3):case _0x90443e(0x4e1):return 0x6;break;case'HURT':case'KNEEL':case _0x90443e(0x16b):case _0x90443e(0x46f):case _0x90443e(0x325):return 0x8;break;default:return VisuMZ[_0x90443e(0x41c)][_0x90443e(0x149)]['call'](this);break;}},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x179)]=function(){const _0x527a6d=_0x39f07d;switch(this[_0x527a6d(0x380)]['toUpperCase']()){case'ITEM':case _0x527a6d(0x7d):case'EXCLAMATION':case'!':case'HEART':case _0x527a6d(0x2cb):return 0x0;break;case _0x527a6d(0x3b8):case _0x527a6d(0x218):case'QUESTION':case'?':case _0x527a6d(0x2bb):case _0x527a6d(0xc3):return 0x1;break;case _0x527a6d(0x421):case _0x527a6d(0x16b):case _0x527a6d(0x271):case _0x527a6d(0x220):case _0x527a6d(0x4e1):return 0x2;break;default:return VisuMZ[_0x527a6d(0x41c)][_0x527a6d(0x498)]['call'](this);break;}},Game_CharacterBase[_0x39f07d(0x287)]['forceCarrying']=function(){const _0x326baa=_0x39f07d;this[_0x326baa(0x2f3)]=!![];},Game_CharacterBase['prototype'][_0x39f07d(0x4eb)]=function(){this['_forceCarrying']=![];},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x50f)]=function(){const _0x375d9f=_0x39f07d;this[_0x375d9f(0x41e)]=!![];},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x397)]=function(){const _0x3d2fb8=_0x39f07d;this[_0x3d2fb8(0x41e)]=![];},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x41a)]=function(){const _0x330075=_0x39f07d;if(this[_0x330075(0x466)]())return![];if(this['_isObjectCharacter'])return![];if(this[_0x330075(0x16f)]==='')return![];if(this[_0x330075(0x113)]===Game_Vehicle)return![];if(this[_0x330075(0x342)]())return![];return!![];},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x27f)]=function(){const _0x59aa7e=_0x39f07d;if(this[_0x59aa7e(0x54c)]())return!![];if(this[_0x59aa7e(0x113)]===Game_Player&&this[_0x59aa7e(0x549)]())return!![];return![];},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x1d4)]=function(){const _0x34de48=_0x39f07d;return VisuMZ['EventsMoveCore'][_0x34de48(0x2a4)][_0x34de48(0x258)][_0x34de48(0x263)];},Game_CharacterBase['prototype'][_0x39f07d(0x5a2)]=function(){return this['screenX']();},Game_CharacterBase[_0x39f07d(0x287)]['shadowY']=function(){const _0x3d09db=_0x39f07d,_0x4ebd9e=$gameMap[_0x3d09db(0x276)]();return Math['floor'](this['scrolledY']()*_0x4ebd9e+_0x4ebd9e);},Game_CharacterBase[_0x39f07d(0x1fa)]=0x64,Game_CharacterBase['prototype'][_0x39f07d(0x29c)]=function(_0x255714,_0x57312b){const _0x4ff3e4=_0x39f07d;if(TouchInput[_0x4ff3e4(0x11f)]())return![];if(!$gameMap[_0x4ff3e4(0x457)]())return![];if($gameMap['eventsXyNt'](_0x255714,_0x57312b)[_0x4ff3e4(0x5be)]>0x0)return![];if(!$gameMap[_0x4ff3e4(0x3e4)](_0x255714,_0x57312b))return![];const _0xf03190=$gameMap[_0x4ff3e4(0x37b)][_0x4ff3e4(0x5be)];if(_0xf03190>=Game_CharacterBase[_0x4ff3e4(0x1fa)])return'UdQVY'!=='qnnfu'?![]:!![];return!![];},Game_Character[_0x39f07d(0x287)][_0x39f07d(0xc0)]=function(_0x530be0,_0x3b1e98){const _0x95a525=_0x39f07d;let _0x2c3484=this[_0x95a525(0x5b9)](_0x530be0,_0x3b1e98);if(!this[_0x95a525(0x29c)](_0x530be0,_0x3b1e98))return _0x2c3484;if(this[_0x95a525(0xfe)](_0x530be0,_0x3b1e98))return _0x2c3484;const _0xf703ff=_0x2c3484;if(_0x2c3484===0x2){if(_0x95a525(0x2e8)===_0x95a525(0x2e8)){if(_0x530be0>this['x']&&this[_0x95a525(0x2c9)](this['x'],this['y'],0x6))_0x2c3484=0x3;if(_0x530be0<this['x']&&this[_0x95a525(0x2c9)](this['x'],this['y'],0x4))_0x2c3484=0x1;}else _0x2a1c25[_0x95a525(0x41c)]['Game_Event_initialize'][_0x95a525(0x341)](this,_0x172435,_0x46c246),this['setupCopyEvent'](),this[_0x95a525(0x15d)](),this['restoreSavedEventPosition']();}else{if(_0x2c3484===0x4){if(_0x95a525(0x572)==='UKNxN'){if(_0x3b1e98>this['y']&&this[_0x95a525(0x2c9)](this['x'],this['y'],0x4))_0x2c3484=0x1;if(_0x3b1e98<this['y']&&this[_0x95a525(0x2c9)](this['x'],this['y'],0x6))_0x2c3484=0x7;}else return this[_0x95a525(0x1c2)]();}else{if(_0x2c3484===0x6){if(_0x3b1e98>this['y']&&this['canPass'](this['x'],this['y'],0x4))_0x2c3484=0x3;if(_0x3b1e98<this['y']&&this[_0x95a525(0x2c9)](this['x'],this['y'],0x6))_0x2c3484=0x9;}else{if(_0x2c3484===0x8){if(_0x95a525(0x5b0)===_0x95a525(0x5b0)){if(_0x530be0>this['x']&&this[_0x95a525(0x2c9)](this['x'],this['y'],0x6))_0x2c3484=0x9;if(_0x530be0<this['x']&&this[_0x95a525(0x2c9)](this['x'],this['y'],0x4))_0x2c3484=0x7;}else return!![];}}}}const _0x5ae2b9=$gameMap[_0x95a525(0x57c)](this['x'],_0x2c3484),_0x9726bf=$gameMap[_0x95a525(0xd8)](this['y'],_0x2c3484);if(this[_0x95a525(0xfe)](_0x5ae2b9,_0x9726bf))_0x2c3484=_0xf703ff;return _0x2c3484;},VisuMZ[_0x39f07d(0x41c)]['Game_CharacterBase_canPass']=Game_CharacterBase['prototype'][_0x39f07d(0x2c9)],Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x2c9)]=function(_0x24fb2c,_0x12931f,_0x49ecc1){const _0x55ead1=_0x39f07d;if(this[_0x55ead1(0x396)]===_0x55ead1(0x2b2)){if(_0x55ead1(0x100)===_0x55ead1(0x223)){const _0x567c82=_0x4310b9[_0x55ead1(0x41c)][_0x55ead1(0x2a4)]['Label'][_0x55ead1(0x522)],_0x54668a=_0x455a33[_0x55ead1(0x4c1)]()||0x1;this[_0x55ead1(0x7c)]['x']=this[_0x55ead1(0x7c)]['y']=_0x567c82/_0x54668a;}else return this[_0x55ead1(0x140)]()[_0x55ead1(0x115)](_0x24fb2c,_0x12931f,_0x49ecc1);}else{if('PtHdc'===_0x55ead1(0x39c))return VisuMZ[_0x55ead1(0x41c)][_0x55ead1(0x136)][_0x55ead1(0x341)](this,_0x24fb2c,_0x12931f,_0x49ecc1);else{if(this[_0x55ead1(0x175)](_0x176a87,_0x5c8b3d))return![];}}},Game_CharacterBase[_0x39f07d(0x287)]['clearSpriteOffsets']=function(){const _0x7a08fe=_0x39f07d;this[_0x7a08fe(0x1a8)]=0x0,this[_0x7a08fe(0x48f)]=0x0;},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x399)]=Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x1e9)],Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x1e9)]=function(){const _0x5df8b0=_0x39f07d;return VisuMZ[_0x5df8b0(0x41c)][_0x5df8b0(0x399)][_0x5df8b0(0x341)](this)+(this[_0x5df8b0(0x1a8)]||0x0);},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x488)]=Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x26e)],Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x26e)]=function(){const _0x32191b=_0x39f07d;return VisuMZ[_0x32191b(0x41c)][_0x32191b(0x488)][_0x32191b(0x341)](this)+(this[_0x32191b(0x48f)]||0x0);},Game_CharacterBase[_0x39f07d(0x46d)]=VisuMZ['EventsMoveCore']['Settings'][_0x39f07d(0x258)][_0x39f07d(0x17e)]??-0x6,Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x30d)]=function(){const _0x564fc5=_0x39f07d;return this[_0x564fc5(0x50a)]()?0x0:-Game_CharacterBase[_0x564fc5(0x46d)];},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0xac)]=function(){this['_stepPattern']='';},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x309)]=Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x24b)],Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x24b)]=function(){const _0x484740=_0x39f07d;if(this[_0x484740(0x4be)])return;if(this[_0x484740(0x574)]())return;VisuMZ[_0x484740(0x41c)][_0x484740(0x309)][_0x484740(0x341)](this);},Game_CharacterBase['prototype']['updatePatternEventsMoveCore']=function(){const _0x5d342c=_0x39f07d;if(!this[_0x5d342c(0x37e)]()&&this['_stopCount']>0x0)return![];switch(String(this[_0x5d342c(0x1d3)])[_0x5d342c(0x321)]()[_0x5d342c(0x577)]()){case _0x5d342c(0x51b):this[_0x5d342c(0x566)]+=0x1;if(this[_0x5d342c(0x566)]>0x2)this[_0x5d342c(0x3b5)](0x0);break;case _0x5d342c(0x13a):this[_0x5d342c(0x566)]-=0x1;if(this[_0x5d342c(0x566)]<0x0)this['setPattern'](0x2);break;case _0x5d342c(0x12d):case _0x5d342c(0x33f):this['turnRight90']();break;case'SPIN\x20COUNTERCLOCKWISE':case _0x5d342c(0x370):case _0x5d342c(0x4cb):case _0x5d342c(0x4fa):this[_0x5d342c(0x55d)]();break;default:return![];}return!![];},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x4c5)]=function(){const _0x3a1724=_0x39f07d;return $gameSystem[_0x3a1724(0x4c5)](this);},Game_CharacterBase['prototype'][_0x39f07d(0x461)]=function(){const _0x51e60d=_0x39f07d,_0x15c41b=this[_0x51e60d(0x4c5)]();if(!_0x15c41b)return![];return _0x15c41b[_0x51e60d(0x503)]>0x0;},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0xe1)]=function(){const _0x4614ea=_0x39f07d,_0x2d7b8a=this[_0x4614ea(0x151)]();return $gameMap[_0x4614ea(0x57c)](this['x'],_0x2d7b8a);},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x55a)]=function(){const _0x303c01=this['direction']();return $gameMap['roundYWithDirection'](this['y'],_0x303c01);},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x26c)]=function(){const _0xc3bca=_0x39f07d,_0x2cd8a0=this[_0xc3bca(0x4c4)](this['direction']());return $gameMap[_0xc3bca(0x57c)](this['x'],_0x2cd8a0);},Game_CharacterBase['prototype'][_0x39f07d(0x56c)]=function(){const _0x4d7119=_0x39f07d,_0xc96b16=this[_0x4d7119(0x4c4)](this['direction']());return $gameMap['roundYWithDirection'](this['y'],_0xc96b16);},Game_CharacterBase['prototype'][_0x39f07d(0x5bb)]=function(){const _0xe2e9cf=_0x39f07d,_0x81a47b=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this['direction']()];return $gameMap[_0xe2e9cf(0x57c)](this['x'],_0x81a47b);},Game_CharacterBase['prototype'][_0x39f07d(0x525)]=function(){const _0x3e09bf=_0x39f07d,_0x1b3fb3=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x3e09bf(0x151)]()];return $gameMap[_0x3e09bf(0xd8)](this['y'],_0x1b3fb3);},Game_CharacterBase[_0x39f07d(0x287)]['cwX']=function(){const _0x2a4e7f=_0x39f07d,_0x1ed550=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this['direction']()];return $gameMap[_0x2a4e7f(0x57c)](this['x'],_0x1ed550);},Game_CharacterBase[_0x39f07d(0x287)]['cwY']=function(){const _0x31b417=_0x39f07d,_0x2f11c4=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x31b417(0x151)]()];return $gameMap[_0x31b417(0xd8)](this['y'],_0x2f11c4);},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x5c6)]=Game_Character['prototype'][_0x39f07d(0x409)],Game_Character[_0x39f07d(0x287)][_0x39f07d(0x409)]=function(_0x2f1dfe){const _0x4fc4d0=_0x39f07d;route=JsonEx['makeDeepCopy'](_0x2f1dfe),VisuMZ[_0x4fc4d0(0x41c)][_0x4fc4d0(0x5c6)]['call'](this,route);},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x422)]=Game_Character[_0x39f07d(0x287)]['forceMoveRoute'],Game_Character[_0x39f07d(0x287)][_0x39f07d(0x2ea)]=function(_0x4d5a55){const _0x1d9217=_0x39f07d;route=JsonEx['makeDeepCopy'](_0x4d5a55),VisuMZ['EventsMoveCore'][_0x1d9217(0x422)]['call'](this,route);},VisuMZ[_0x39f07d(0x41c)]['Game_Character_processMoveCommand']=Game_Character[_0x39f07d(0x287)]['processMoveCommand'],Game_Character[_0x39f07d(0x287)][_0x39f07d(0x414)]=function(_0x4d6012){const _0x1ce4d0=_0x39f07d,_0x438792=Game_Character,_0x22003f=_0x4d6012[_0x1ce4d0(0x28d)];if(_0x4d6012[_0x1ce4d0(0x206)]===_0x438792['ROUTE_SCRIPT']){if(_0x1ce4d0(0x1d7)!==_0x1ce4d0(0x1d7))return this[_0x1ce4d0(0x123)]===_0x289381&&this[_0x1ce4d0(0x81)](),this[_0x1ce4d0(0x123)];else{let _0x312af6=_0x4d6012[_0x1ce4d0(0x28d)][0x0];_0x312af6=this['convertVariableValuesInScriptCall'](_0x312af6),_0x312af6=this[_0x1ce4d0(0x141)](_0x312af6),this[_0x1ce4d0(0x248)](_0x4d6012,_0x312af6);}}else VisuMZ[_0x1ce4d0(0x41c)][_0x1ce4d0(0x105)][_0x1ce4d0(0x341)](this,_0x4d6012);},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x588)]=function(_0x3dd95d){const _0x38c4a8=_0x39f07d,_0x3dbf23=/\$gameVariables\.value\((\d+)\)/gi,_0x543962=/\\V\[(\d+)\]/gi;while(_0x3dd95d['match'](_0x3dbf23)){if('rVUkz'!=='kkNpL')_0x3dd95d=_0x3dd95d['replace'](_0x3dbf23,(_0x1fab97,_0x1a14c0)=>$gameVariables[_0x38c4a8(0x319)](parseInt(_0x1a14c0)));else return this[_0x38c4a8(0x14c)];}while(_0x3dd95d[_0x38c4a8(0x17c)](_0x543962)){_0x3dd95d=_0x3dd95d[_0x38c4a8(0x3e9)](_0x543962,(_0x1dd9b8,_0x573a25)=>$gameVariables[_0x38c4a8(0x319)](parseInt(_0x573a25)));}return _0x3dd95d;},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x141)]=function(_0x15f9be){const _0x44aa78=_0x39f07d,_0x1cad96=/\\SELFVAR\[(\d+)\]/gi;while(_0x15f9be['match'](_0x1cad96)){if(_0x44aa78(0x3d0)!==_0x44aa78(0x3d0)){const _0x44c406=_0x5e5aef['loadSystem']('IconSet'),_0x175530=_0x2656d1['iconWidth'],_0x3f6744=_0x1bb39d['iconHeight'],_0x24261e=_0x14003e%0x10*_0x175530,_0x26649e=_0x4bac19[_0x44aa78(0x167)](_0x585653/0x10)*_0x3f6744,_0x18273c=_0x5296d0[_0x44aa78(0x18f)](this[_0x44aa78(0x52f)]()),_0x1e6d5d=_0x213f47[_0x44aa78(0x18f)](this['iconSize']());this[_0x44aa78(0x56e)][_0x44aa78(0x518)](_0x44c406,_0x24261e,_0x26649e,_0x175530,_0x3f6744,_0x3bc6f4,_0x2befe0,_0x18273c,_0x1e6d5d);}else _0x15f9be=_0x15f9be['replace'](_0x1cad96,(_0xc359e0,_0x5a573b)=>getSelfVariableValue(this[_0x44aa78(0x1c1)],this[_0x44aa78(0x418)],parseInt(_0x5a573b)));}return _0x15f9be;},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x248)]=function(_0x4b4dd1,_0x2463d8){const _0x3da800=_0x39f07d;if(_0x2463d8[_0x3da800(0x17c)](/ANIMATION:[ ](\d+)/i))return this['processMoveRouteAnimation'](Number(RegExp['$1']));if(_0x2463d8[_0x3da800(0x17c)](/BALLOON:[ ](.*)/i))return this[_0x3da800(0x560)](String(RegExp['$1']));if(_0x2463d8[_0x3da800(0x17c)](/FADE IN:[ ](\d+)/i))return this['processMoveRouteFadeIn'](Number(RegExp['$1']));if(_0x2463d8[_0x3da800(0x17c)](/FADE OUT:[ ](\d+)/i))return this[_0x3da800(0x4a5)](Number(RegExp['$1']));if(_0x2463d8[_0x3da800(0x17c)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this['forceCarrying']();if(_0x2463d8[_0x3da800(0x17c)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x3da800(0x4eb)]();if(_0x2463d8[_0x3da800(0x17c)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this['forceDashing']();if(_0x2463d8[_0x3da800(0x17c)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x3da800(0x397)]();if(_0x2463d8[_0x3da800(0x17c)](/HUG:[ ]LEFT/i)){if(_0x3da800(0x54e)!==_0x3da800(0x101))return this[_0x3da800(0x4c6)]('left');else{if(!this[_0x3da800(0x3cc)](_0x33351c,_0x499d0d))return;const _0xde9f25=_0x5f2e54[_0x3da800(0x41c)][_0x3da800(0x2a4)][_0x3da800(0x27a)];if(!_0x36e6a5)_0xde9f25['PreMorphJS'][_0x3da800(0x341)](this,_0x3d9404,_0x17d84a,this);this[_0x3da800(0x5a7)]={'mapId':_0x2ec5b4,'eventId':_0x306735},this[_0x3da800(0x5c5)]=-0x2,this[_0x3da800(0x1ce)]();if(!_0x11a913)_0xde9f25['PostMorphJS'][_0x3da800(0x341)](this,_0x79fdb6,_0x32201a,this);_0x78eb27['clearEventCache']();}}if(_0x2463d8[_0x3da800(0x17c)](/HUG:[ ]RIGHT/i))return this['processMoveRouteHugWall']('right');if(_0x2463d8[_0x3da800(0x17c)](/INDEX:[ ](\d+)/i))return this['processMoveRouteSetIndex'](Number(RegExp['$1']));if(_0x2463d8['match'](/INDEX:[ ]([\+\-]\d+)/i)){if('RtroY'===_0x3da800(0x49c))_0x326568[_0x3da800(0x130)](_0x7446d,_0xa37de3),_0x5b6fc9[_0x3da800(0x20f)](_0x2d73ce[_0x3da800(0x35d)]);else{const _0x801344=this[_0x3da800(0x34d)]+Number(RegExp['$1']);return this[_0x3da800(0x431)](_0x801344);}}if(_0x2463d8[_0x3da800(0x17c)](/JUMP FORWARD:[ ](\d+)/i))return this['processMoveRouteJumpForward'](Number(RegExp['$1']));if(_0x2463d8[_0x3da800(0x17c)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x3da800(0x257)!==_0x3da800(0x509))return this['processMoveRouteJumpTo'](Number(RegExp['$1']),Number(RegExp['$2']));else _0x24b714['EventsMoveCore'][_0x3da800(0x133)][_0x3da800(0x341)](this,_0xde7411,_0x46a065);}if(_0x2463d8[_0x3da800(0x17c)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x1bac72=$gameMap[_0x3da800(0x3f5)](Number(RegExp['$1']));return this[_0x3da800(0x229)](_0x1bac72);}if(_0x2463d8[_0x3da800(0x17c)](/JUMP TO PLAYER/i))return'snAnJ'===_0x3da800(0x511)?this[_0x3da800(0x3f1)](_0x349e84['$1'],_0x4e251f['$2']):this[_0x3da800(0x229)]($gamePlayer);if(_0x2463d8[_0x3da800(0x17c)](/JUMP TO HOME/i)&&this['eventId']){if(_0x3da800(0x4e5)===_0x3da800(0x4e5)){const _0x50c5f7=this[_0x3da800(0x2be)],_0x20f77f=this[_0x3da800(0x2f1)];return this[_0x3da800(0x38e)](_0x50c5f7,_0x20f77f);}else return this[_0x3da800(0xab)](0x1,_0x5cf220(_0x5b9fbf['$1']));}if(_0x2463d8[_0x3da800(0x17c)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x5e4de5=String(RegExp['$1']),_0x4599b6=this[_0x3da800(0x344)](_0x2463d8);return this[_0x3da800(0x1a6)](_0x5e4de5,_0x4599b6);}if(_0x2463d8['match'](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x5697e6=Number(RegExp['$1']),_0x2c509f=Number(RegExp['$2']),_0x118c47=this[_0x3da800(0x344)](_0x2463d8);return this[_0x3da800(0x1f5)](_0x5697e6,_0x2c509f,_0x118c47);}if(_0x2463d8[_0x3da800(0x17c)](/MOVE TO EVENT:[ ](\d+)/i)){if(_0x3da800(0x148)!==_0x3da800(0x40f)){const _0x115f58=$gameMap[_0x3da800(0x3f5)](Number(RegExp['$1'])),_0x94eb9c=this[_0x3da800(0x344)](_0x2463d8);return this['processMoveRouteMoveToCharacter'](_0x115f58,_0x94eb9c);}else{_0x3f7be8[_0x3da800(0x2bc)]===_0x480111&&_0x1935ee['EventsMoveCore']['CustomPageConditions']['loadCPC'](_0x2f6745);if(_0x3afbdf['CPC'][_0x3da800(0x5be)]>0x0)return _0x5e8b44[_0x3da800(0x41c)]['CustomPageConditions'][_0x3da800(0x513)](_0x5ca592['CPC'],0x0);return!![];}}if(_0x2463d8[_0x3da800(0x17c)](/MOVE TO PLAYER/i)){const _0x4bed14=this[_0x3da800(0x344)](_0x2463d8);return this[_0x3da800(0x239)]($gamePlayer,_0x4bed14);}if(_0x2463d8['match'](/MOVE TO HOME/i)&&this[_0x3da800(0x4e2)]){if(_0x3da800(0x436)===_0x3da800(0x3e1)){if(_0x4770a2)return _0x398558;}else{const _0x9d4ca3=this[_0x3da800(0x2be)],_0x41acf5=this['_randomHomeY'],_0x1c0441=this[_0x3da800(0x344)](_0x2463d8);return this['processMoveRouteMoveTo'](_0x9d4ca3,_0x41acf5,_0x1c0441);}}if(_0x2463d8[_0x3da800(0x17c)](/MOVE LOWER LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x1,Number(RegExp['$1']));if(_0x2463d8[_0x3da800(0x17c)](/MOVE DOWN:[ ](\d+)/i))return this[_0x3da800(0xab)](0x2,Number(RegExp['$1']));if(_0x2463d8[_0x3da800(0x17c)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x3da800(0xab)](0x3,Number(RegExp['$1']));if(_0x2463d8[_0x3da800(0x17c)](/MOVE LEFT:[ ](\d+)/i)){if(_0x3da800(0x48d)===_0x3da800(0x48d))return this[_0x3da800(0xab)](0x4,Number(RegExp['$1']));else{if(_0x349bd9)_0x30c2f7[_0x3da800(0x477)](_0x5b7397);}}if(_0x2463d8[_0x3da800(0x17c)](/MOVE RIGHT:[ ](\d+)/i)){if(_0x3da800(0x596)!==_0x3da800(0x3f2))return this[_0x3da800(0xab)](0x6,Number(RegExp['$1']));else{if(this[_0x3da800(0x54c)]())return!![];if(this[_0x3da800(0x113)]===_0x409719&&this[_0x3da800(0x549)]())return!![];return![];}}if(_0x2463d8[_0x3da800(0x17c)](/MOVE UPPER LEFT:[ ](\d+)/i))return _0x3da800(0x12f)===_0x3da800(0x12f)?this[_0x3da800(0xab)](0x7,Number(RegExp['$1'])):(this['_pose']||'')[_0x3da800(0x321)]()['trim']();if(_0x2463d8[_0x3da800(0x17c)](/MOVE UP:[ ](\d+)/i))return this[_0x3da800(0xab)](0x8,Number(RegExp['$1']));if(_0x2463d8[_0x3da800(0x17c)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x3da800(0xab)](0x9,Number(RegExp['$1']));if(_0x2463d8['match'](/OPACITY:[ ](\d+)([%％])/i)){const _0x1bbe9d=Math[_0x3da800(0x289)](Number(RegExp['$1'])/0x64*0xff);return this[_0x3da800(0x48b)](_0x1bbe9d[_0x3da800(0x330)](0x0,0xff));}if(_0x2463d8[_0x3da800(0x17c)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x2ce136=this['_opacity']+Math[_0x3da800(0x289)](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x2ce136[_0x3da800(0x330)](0x0,0xff));}if(_0x2463d8[_0x3da800(0x17c)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x7e60dc=this[_0x3da800(0x2fc)]+Number(RegExp['$1']);return this[_0x3da800(0x48b)](_0x7e60dc[_0x3da800(0x330)](0x0,0xff));}if(_0x2463d8[_0x3da800(0x17c)](/PATTERN LOCK:[ ](\d+)/i)){if(_0x3da800(0x55e)===_0x3da800(0x55e))return this[_0x3da800(0x31a)](Number(RegExp['$1']));else{this[_0x3da800(0x21e)]=!![];return;}}if(_0x2463d8[_0x3da800(0x17c)](/PATTERN UNLOCK/i))return this['_patternLocked']=![];if(_0x2463d8[_0x3da800(0x17c)](/POSE:[ ](.*)/i)){const _0x14ec94=String(RegExp['$1'])[_0x3da800(0x321)]()[_0x3da800(0x577)]();return this[_0x3da800(0x4b2)](_0x14ec94);}if(_0x2463d8[_0x3da800(0x17c)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x591f11=Number(RegExp['$1']),_0x4216b2=Number(RegExp['$2']);return this[_0x3da800(0x162)](_0x591f11,_0x4216b2);}if(_0x2463d8[_0x3da800(0x17c)](/STEP TOWARD EVENT:[ ](\d+)/i)){if(_0x3da800(0x3a6)==='jyfRQ'){const _0xd2c7e2='%1Allow'[_0x3da800(0x307)](_0x10745d[_0x3da800(0x37c)](0x0)[_0x3da800(0x321)]()+_0x5f37c7[_0x3da800(0x586)](0x1));if(_0x48873f[_0xd2c7e2])return _0x1ac53d[_0xd2c7e2][_0x3da800(0x310)](_0xc5d618);}else{const _0x4076a4=$gameMap[_0x3da800(0x3f5)](Number(RegExp['$1']));return this[_0x3da800(0x290)](_0x4076a4);}}if(_0x2463d8[_0x3da800(0x17c)](/STEP TOWARD PLAYER/i))return this[_0x3da800(0x290)]($gamePlayer);if(_0x2463d8[_0x3da800(0x17c)](/STEP TOWARD HOME/i)&&this['eventId']){const _0x3443ad=this[_0x3da800(0x2be)],_0x25dee9=this[_0x3da800(0x2f1)];return this[_0x3da800(0x162)](_0x3443ad,_0x25dee9);}if(_0x2463d8[_0x3da800(0x17c)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x3da800(0x2b4)===_0x3da800(0x238)){_0x9c5678['EventsMoveCore'][_0x3da800(0x4ad)][_0x3da800(0x341)](this,_0xc56b08);if(_0x5d613f>=0x3e8){const _0x126165=this[_0x3da800(0x3f5)](_0xc9d82b);if(_0x126165)_0x126165[_0x3da800(0x58a)]();}}else return this[_0x3da800(0x59a)](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x2463d8[_0x3da800(0x17c)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x1d6186=$gameMap[_0x3da800(0x3f5)](Number(RegExp['$1']));return this[_0x3da800(0x3ac)](_0x1d6186);}if(_0x2463d8[_0x3da800(0x17c)](/STEP AWAY FROM PLAYER/i)){if('vZHee'!==_0x3da800(0x2b7))_0x394d65[_0x3da800(0x41c)][_0x3da800(0x336)][_0x3da800(0x341)](this),this[_0x3da800(0x565)]();else return this[_0x3da800(0x3ac)]($gamePlayer);}if(_0x2463d8[_0x3da800(0x17c)](/STEP AWAY FROM HOME/i)&&this[_0x3da800(0x4e2)]){if(_0x3da800(0x3f4)!==_0x3da800(0x22a)){const _0x11e602=this['_randomHomeX'],_0x31d78b=this[_0x3da800(0x2f1)];return this[_0x3da800(0x59a)](_0x11e602,_0x31d78b);}else this['opacity']=0x0;}if(_0x2463d8[_0x3da800(0x17c)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x3da800(0x1c0)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x2463d8[_0x3da800(0x17c)](/TURN TO EVENT:[ ](\d+)/i)){if(_0x3da800(0x1d8)!==_0x3da800(0x3ae)){const _0x216c1e=$gameMap['event'](Number(RegExp['$1']));return this['turnTowardCharacter'](_0x216c1e);}else{const _0x4aa79c=_0x358194[_0x3da800(0x3f5)](_0x4b6943(_0x3aefeb['$1']));return this[_0x3da800(0x229)](_0x4aa79c);}}if(_0x2463d8[_0x3da800(0x17c)](/TURN TO PLAYER/i))return this['turnTowardCharacter']($gamePlayer);if(_0x2463d8['match'](/TURN TO HOME/i)&&this[_0x3da800(0x4e2)]){if(_0x3da800(0x496)!==_0x3da800(0x41d)){const _0x2aaaa5=this[_0x3da800(0x2be)],_0x53f1d5=this['_randomHomeY'];return this[_0x3da800(0x44b)](_0x2aaaa5,_0x53f1d5);}else{const _0x4c0ecc=_0x2b63d9(_0x1bbe42['$1']),_0x41fc0=_0x22e9e1(_0x5a5bd9['$2']);return this[_0x3da800(0x162)](_0x4c0ecc,_0x41fc0);}}if(_0x2463d8['match'](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return _0x3da800(0x87)===_0x3da800(0x87)?this['turnAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2'])):_0xd5ce7c[_0x3da800(0x41c)][_0x3da800(0x2a4)][_0x3da800(0x527)][_0x3da800(0x531)];if(_0x2463d8['match'](/TURN AWAY FROM EVENT:[ ](\d+)/i)){if(_0x3da800(0x224)===_0x3da800(0x224)){const _0x3d72df=$gameMap[_0x3da800(0x3f5)](Number(RegExp['$1']));return this[_0x3da800(0x13b)](_0x3d72df);}else{if(!_0x36d4ae['_scene'])return;if(!_0x5b900f[_0x3da800(0x1bd)][_0x3da800(0x359)])return;const _0x14478a=_0x5c23e1[_0x3da800(0x1bd)][_0x3da800(0x359)][_0x3da800(0x93)](this[_0x3da800(0x2cd)]);if(!_0x14478a)return;this['x']=_0x5ceca3[_0x3da800(0x289)](this[_0x3da800(0x2cd)][_0x3da800(0x1e9)]()-_0x25fee6[_0x3da800(0x167)](this[_0x3da800(0x5c3)]*this[_0x3da800(0x7c)]['x']/0x2)),this['x']+=this[_0x3da800(0x2cd)][_0x3da800(0x471)][_0x3da800(0xd6)],this['y']=this[_0x3da800(0x2cd)]['screenY']()-_0x14478a[_0x3da800(0x2db)],this['y']+=_0x2c55e8['round'](_0x272d3e[_0x3da800(0x48c)]()*0.5),this['y']-=_0x2cc255['round'](this['height']*this['scale']['y']),this['y']+=this[_0x3da800(0x2cd)][_0x3da800(0x471)]['offsetY'],this[_0x3da800(0x91)]=this[_0x3da800(0x2cd)][_0x3da800(0x402)],this['_eventScreenX']=this[_0x3da800(0x2cd)][_0x3da800(0x1e9)](),this[_0x3da800(0xf4)]=this[_0x3da800(0x2cd)][_0x3da800(0x26e)](),this[_0x3da800(0x8a)]=this[_0x3da800(0x2cd)][_0x3da800(0x471)][_0x3da800(0xd6)],this[_0x3da800(0xf7)]=this[_0x3da800(0x2cd)][_0x3da800(0x471)][_0x3da800(0xad)],this['_eventPageIndex']=this[_0x3da800(0x2cd)][_0x3da800(0x5c5)],this[_0x3da800(0x91)]&&(this[_0x3da800(0x25f)]=0x0);}}if(_0x2463d8['match'](/TURN AWAY FROM PLAYER/i))return this[_0x3da800(0x13b)]($gamePlayer);if(_0x2463d8[_0x3da800(0x17c)](/TURN AWAY FROM HOME/i)&&this['eventId']){if(_0x3da800(0x204)!==_0x3da800(0x216)){const _0x4596b0=this[_0x3da800(0x2be)],_0x1dbbe9=this[_0x3da800(0x2f1)];return this[_0x3da800(0x450)](_0x4596b0,_0x1dbbe9);}else{this[_0x3da800(0x3a7)][_0x3da800(0x415)]=this[_0x3da800(0x3a7)][_0x3da800(0x415)]||0x0,this[_0x3da800(0x3a7)][_0x3da800(0x415)]--;if(this[_0x3da800(0x3a7)][_0x3da800(0x415)]>0x0)return;this['_moveSynch'][_0x3da800(0x415)]=this['_moveSynch']['delay'],this[_0x3da800(0x3ee)]();}}if(_0x2463d8['match'](/TURN LOWER LEFT/i))return this[_0x3da800(0xa7)](0x1);if(_0x2463d8[_0x3da800(0x17c)](/TURN LOWER RIGHT/i))return this[_0x3da800(0xa7)](0x3);if(_0x2463d8['match'](/TURN UPPER LEFT/i))return this[_0x3da800(0xa7)](0x7);if(_0x2463d8['match'](/TURN UPPER RIGHT/i))return this[_0x3da800(0xa7)](0x9);if(_0x2463d8['match'](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x3da800(0x3f1)](RegExp['$1'],RegExp['$2']);if(_0x2463d8[_0x3da800(0x17c)](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x3da800(0x58e)](RegExp['$1'],RegExp['$2']);if(_0x2463d8[_0x3da800(0x17c)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x3da800(0x226)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x2463d8[_0x3da800(0x17c)](/TELEPORT TO EVENT:[ ](\d+)/i)){if(_0x3da800(0x114)!==_0x3da800(0x114)){if(this[_0x3da800(0x3a0)]===_0x460532)this[_0x3da800(0x8b)]();return this[_0x3da800(0x3a0)][_0x982697]=this['_MapSpawnedEventData'][_0x181efb]||[],this[_0x3da800(0x3a0)][_0xcad22e];}else{const _0x57cd08=$gameMap['event'](Number(RegExp['$1']));return this['processMoveRouteTeleportToCharacter'](_0x57cd08);}}if(_0x2463d8[_0x3da800(0x17c)](/TELEPORT TO PLAYER/i))return this[_0x3da800(0x57a)]($gamePlayer);if(_0x2463d8[_0x3da800(0x17c)](/TELEPORT TO HOME/i)&&this[_0x3da800(0x4e2)]){const _0x424315=this[_0x3da800(0x2be)],_0x31781b=this[_0x3da800(0x2f1)];return this[_0x3da800(0x226)](_0x424315,_0x31781b);}try{VisuMZ[_0x3da800(0x41c)][_0x3da800(0x105)]['call'](this,_0x4b4dd1);}catch(_0xb0c125){if(_0x3da800(0x243)===_0x3da800(0x243)){if($gameTemp[_0x3da800(0x144)]())console[_0x3da800(0x1b1)](_0xb0c125);}else{return _0x188164[_0x3da800(0x41c)][_0x3da800(0x401)][_0x3da800(0x341)](this,_0x47c910);;}}},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x468)]=function(_0x3f27b5){$gameTemp['requestAnimation']([this],_0x3f27b5);},Game_Character['prototype'][_0x39f07d(0x560)]=function(_0x5d6b02){const _0x2fa0ad=_0x39f07d;let _0x12f9ca=0x0;switch(_0x5d6b02['toUpperCase']()[_0x2fa0ad(0x577)]()){case'!':case _0x2fa0ad(0x375):_0x12f9ca=0x1;break;case'?':case _0x2fa0ad(0x52a):_0x12f9ca=0x2;break;case'MUSIC':case _0x2fa0ad(0x499):case _0x2fa0ad(0x271):case _0x2fa0ad(0x5af):case _0x2fa0ad(0x109):_0x12f9ca=0x3;break;case _0x2fa0ad(0x582):case _0x2fa0ad(0x3a9):_0x12f9ca=0x4;break;case _0x2fa0ad(0x2bb):_0x12f9ca=0x5;break;case _0x2fa0ad(0x220):_0x12f9ca=0x6;break;case _0x2fa0ad(0x2cb):case _0x2fa0ad(0x2fe):case _0x2fa0ad(0x403):_0x12f9ca=0x7;break;case _0x2fa0ad(0xc3):case _0x2fa0ad(0x2a8):_0x12f9ca=0x8;break;case _0x2fa0ad(0x4bd):case _0x2fa0ad(0x4fb):case'LIGHT\x20BULB':case _0x2fa0ad(0x1e7):case _0x2fa0ad(0x581):_0x12f9ca=0x9;break;case'Z':case'ZZ':case _0x2fa0ad(0x46f):case'SLEEP':_0x12f9ca=0xa;break;case _0x2fa0ad(0x4ef):_0x12f9ca=0xb;break;case _0x2fa0ad(0x1a2):_0x12f9ca=0xc;break;case _0x2fa0ad(0x417):_0x12f9ca=0xd;break;case'USER-DEFINED\x204':_0x12f9ca=0xe;break;case'USER-DEFINED\x205':_0x12f9ca=0xf;break;}$gameTemp[_0x2fa0ad(0x274)](this,_0x12f9ca);},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x4bb)]=function(_0x34d4a0){const _0x3a9723=_0x39f07d;_0x34d4a0+=this[_0x3a9723(0x2fc)],this[_0x3a9723(0x48b)](_0x34d4a0[_0x3a9723(0x330)](0x0,0xff));if(this[_0x3a9723(0x2fc)]<0xff)this[_0x3a9723(0x5c2)]--;},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x4a5)]=function(_0x360305){const _0xc191ac=_0x39f07d;_0x360305=this['_opacity']-_0x360305,this[_0xc191ac(0x48b)](_0x360305['clamp'](0x0,0xff));if(this['_opacity']>0x0)this['_moveRouteIndex']--;},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x4c6)]=function(_0x3272ea){const _0x210b5b=_0x39f07d,_0x49d799=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x41ca30=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x204be7=this[_0x210b5b(0x151)](),_0x52df00=(_0x3272ea===_0x210b5b(0x164)?_0x49d799:_0x41ca30)[_0x204be7],_0x4852f7=(_0x3272ea===_0x210b5b(0x164)?_0x41ca30:_0x49d799)[_0x204be7];if(this[_0x210b5b(0x2c9)](this['x'],this['y'],_0x52df00)){if('arJxA'===_0x210b5b(0x129)){if(_0x3272ea==='left')this[_0x210b5b(0x55d)]();else{if(_0x210b5b(0xed)!==_0x210b5b(0xed))return!!this[_0x210b5b(0x4c8)];else this[_0x210b5b(0x285)]();}}else _0x1bd207+=this[_0x210b5b(0x19f)]();}else!this[_0x210b5b(0x2c9)](this['x'],this['y'],this['direction']())&&(this[_0x210b5b(0x2c9)](this['x'],this['y'],_0x4852f7)?_0x3272ea===_0x210b5b(0x164)?this[_0x210b5b(0x285)]():this[_0x210b5b(0x55d)]():this[_0x210b5b(0x267)]());if(this['canPass'](this['x'],this['y'],this[_0x210b5b(0x151)]())){if('Zcjrq'===_0x210b5b(0x4c7)){let _0x49d9a1=0x0;if(_0x3bed3e)_0x2cfa80['_moveAllowPlayerCollision']=!![];_0x525bb9['isSupportDiagonalMovement']()?_0x49d9a1=this[_0x210b5b(0xc0)](_0xcbae15,_0x438907):_0x49d9a1=this['findDirectionTo'](_0x1cff53,_0x4e5258);if(_0x33b113)_0x1bf27c['_moveAllowPlayerCollision']=![];this[_0x210b5b(0x356)](_0x49d9a1),this[_0x210b5b(0x4ca)](!![]);}else this[_0x210b5b(0x34b)]();}},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x431)]=function(_0x50bacb){const _0x2b922a=_0x39f07d;if(ImageManager[_0x2b922a(0x5c1)](this[_0x2b922a(0x16f)]))return;_0x50bacb=_0x50bacb['clamp'](0x0,0x7),this[_0x2b922a(0x1a5)](this[_0x2b922a(0x16f)],_0x50bacb);},Game_Character[_0x39f07d(0x287)]['processMoveRouteJumpForward']=function(_0x2f1a41){const _0x122fd0=_0x39f07d;switch(this[_0x122fd0(0x151)]()){case 0x1:this[_0x122fd0(0x1f4)](-_0x2f1a41,_0x2f1a41);break;case 0x2:this[_0x122fd0(0x1f4)](0x0,_0x2f1a41);break;case 0x3:this[_0x122fd0(0x1f4)](_0x2f1a41,_0x2f1a41);break;case 0x4:this['jump'](-_0x2f1a41,0x0);break;case 0x6:this[_0x122fd0(0x1f4)](_0x2f1a41,0x0);break;case 0x7:this[_0x122fd0(0x1f4)](-_0x2f1a41,-_0x2f1a41);break;case 0x8:this['jump'](0x0,-_0x2f1a41);break;case 0x9:this[_0x122fd0(0x1f4)](_0x2f1a41,-_0x2f1a41);break;}},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x38e)]=function(_0x256dc1,_0x45b823){const _0x27efa0=_0x39f07d,_0x33616d=Math['round'](_0x256dc1-this['x']),_0x3a1755=Math['round'](_0x45b823-this['y']);this[_0x27efa0(0x1f4)](_0x33616d,_0x3a1755);},Game_Character[_0x39f07d(0x287)]['processMoveRouteJumpToCharacter']=function(_0x219487){const _0xe006ca=_0x39f07d;if(_0x219487)this[_0xe006ca(0x38e)](_0x219487['x'],_0x219487['y']);},Game_Character['prototype'][_0x39f07d(0x162)]=function(_0x13cad3,_0x8413de,_0x44d29f){const _0x12ac56=_0x39f07d;let _0x126e24=0x0;if(_0x44d29f)$gameTemp['_moveAllowPlayerCollision']=!![];if($gameMap[_0x12ac56(0x457)]()){if(_0x12ac56(0x542)==='ZYNMK'){if(!this[_0x12ac56(0x22c)]())return;const _0x5e6efb=this['list']()[_0x12ac56(0x48a)](_0x5b219a=>_0x5b219a[_0x12ac56(0x206)]!==0x6c&&_0x5b219a[_0x12ac56(0x206)]!==0x198);_0x5e6efb['length']>0x1&&(this[_0x12ac56(0x4a1)]=!![],this['isTriggerIn']([0x0,0x1,0x2])&&this[_0x12ac56(0x2d8)]());}else _0x126e24=this[_0x12ac56(0xc0)](_0x13cad3,_0x8413de);}else _0x126e24=this[_0x12ac56(0x5b9)](_0x13cad3,_0x8413de);if(_0x44d29f)$gameTemp[_0x12ac56(0x126)]=![];this['executeMoveDir8'](_0x126e24),this[_0x12ac56(0x4ca)](!![]);},Game_Character['prototype'][_0x39f07d(0x290)]=function(_0x176813){const _0x2261a7=_0x39f07d;if(_0x176813)this[_0x2261a7(0x162)](_0x176813['x'],_0x176813['y']);},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x1b6)]=function(_0x13ced0,_0x17c319){const _0x3cd0a6=_0x39f07d,_0x45ed7c=this[_0x3cd0a6(0x30b)](_0x13ced0),_0x5d68ce=this[_0x3cd0a6(0x4f9)](_0x17c319);},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x344)]=function(_0x456f99){const _0x12cd8e=_0x39f07d;if(_0x456f99[_0x12cd8e(0x17c)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i)){if('BtsJE'!==_0x12cd8e(0x21d)){this['_forceShowFollower']=![],this['_forceHideFollower']=![];if(!_0x517280)return;const _0x34be5f=_0x5da870[_0x12cd8e(0x12b)]||'';if(_0x34be5f[_0x12cd8e(0x17c)](/<HIDE FOLLOWERS>/i))this[_0x12cd8e(0x4c2)]=![],this[_0x12cd8e(0x2c7)]=!![];else _0x34be5f[_0x12cd8e(0x17c)](/<SHOW FOLLOWERS>/i)&&(this['_forceShowFollower']=!![],this[_0x12cd8e(0x2c7)]=![]);}else return!![];}else return _0x456f99[_0x12cd8e(0x17c)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ[_0x39f07d(0x41c)]['Game_Event_isCollidedWithPlayerCharacters']=Game_Event[_0x39f07d(0x287)][_0x39f07d(0x2e4)],Game_Event['prototype']['isCollidedWithPlayerCharacters']=function(_0x327e80,_0x4ffa5a){const _0x5a226a=_0x39f07d;if($gameTemp['_moveAllowPlayerCollision'])return![];return VisuMZ[_0x5a226a(0x41c)][_0x5a226a(0x5a5)][_0x5a226a(0x341)](this,_0x327e80,_0x4ffa5a);},Game_Character['prototype'][_0x39f07d(0x1a6)]=function(_0x505d0a,_0x3915d9){const _0x377d61=_0x39f07d,_0x591d5b=['',_0x377d61(0x116),'DOWN',_0x377d61(0x35f),_0x377d61(0x132),'',_0x377d61(0x242),'UPPER\x20LEFT','UP',_0x377d61(0x3c1)],_0x10e533=_0x591d5b[_0x377d61(0x362)](_0x505d0a[_0x377d61(0x321)]()['trim']());if(_0x10e533<=0x0)return;if(_0x3915d9)$gameTemp['_moveAllowPlayerCollision']=!![];if(this[_0x377d61(0x2c9)](this['x'],this['y'],_0x10e533)){if(_0x3915d9)$gameTemp[_0x377d61(0x126)]=![];this[_0x377d61(0x356)](_0x10e533),this[_0x377d61(0x5c2)]-=0x1;}if(_0x3915d9)$gameTemp[_0x377d61(0x126)]=![];},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x1f5)]=function(_0x2d17e7,_0x2ee730,_0x121d4e){const _0x584ad1=_0x39f07d;this['processMoveRouteStepTo'](_0x2d17e7,_0x2ee730,_0x121d4e);if(this['x']!==_0x2d17e7||this['y']!==_0x2ee730)this[_0x584ad1(0x5c2)]--;},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x239)]=function(_0x155d52,_0x170981){const _0x490838=_0x39f07d;if(_0x155d52&&!_0x155d52[_0x490838(0x402)]){if(_0x490838(0x4f0)!==_0x490838(0x4f0)){if(this[_0x490838(0x564)]===_0x152239)this['initEventsMoveCore']();if(this[_0x490838(0x564)]['VisibleEventLabels']===_0xc33ae8)this[_0x490838(0x8b)]();this['_EventsMoveCoreSettings']['VisibleEventLabels']=_0x4275de;}else{this[_0x490838(0x1f5)](_0x155d52['x'],_0x155d52['y'],_0x170981);if(_0x155d52[_0x490838(0x36c)]()&&this[_0x490838(0x36c)]()){if(_0x490838(0x485)!==_0x490838(0x485)){const _0xe7bfb7=this[_0x490838(0x4c4)](this[_0x490838(0x151)]());return _0x20978b[_0x490838(0x57c)](this['x'],_0xe7bfb7);}else{const _0x2f9e79=$gameMap['distance'](this['x'],this['y'],_0x155d52['x'],_0x155d52['y']);if(_0x2f9e79<=0x1)this[_0x490838(0x5c2)]++;}}}}},Game_Character[_0x39f07d(0x287)][_0x39f07d(0xab)]=function(_0x2f8a04,_0x18da46){const _0x461dbc=_0x39f07d;_0x18da46=_0x18da46||0x0;const _0x36cbbd={'code':0x1,'indent':null,'parameters':[]};_0x36cbbd['code']=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x2f8a04],this[_0x461dbc(0x3e2)][_0x461dbc(0x22c)][this['_moveRouteIndex']][_0x461dbc(0x28d)][0x0]='';while(_0x18da46--){this[_0x461dbc(0x3e2)][_0x461dbc(0x22c)][_0x461dbc(0x348)](this[_0x461dbc(0x5c2)]+0x1,0x0,_0x36cbbd);}},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x31a)]=function(_0x26f68e){const _0x2137f2=_0x39f07d;this[_0x2137f2(0x4be)]=!![],this[_0x2137f2(0x3b5)](_0x26f68e);},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x3f1)]=function(_0x211226,_0x30ef17){const _0x4e074a=_0x39f07d;if(this===$gamePlayer)return;const _0x51b12a=[this[_0x4e074a(0x1c1)],this[_0x4e074a(0x418)],'A'];_0x211226['match'](/\b[ABCD]\b/i)?_0x51b12a[0x2]=String(_0x211226)[_0x4e074a(0x37c)](0x0)[_0x4e074a(0x321)]()[_0x4e074a(0x577)]():_0x4e074a(0x4a6)==='IbDlP'?_0x51b12a[0x2]=_0x4e074a(0x4cf)[_0x4e074a(0x307)](_0x211226):this[_0x4e074a(0x51d)]['removeChild'](_0x1291b2['_shadowSprite']);switch(_0x30ef17[_0x4e074a(0x321)]()[_0x4e074a(0x577)]()){case'ON':case'TRUE':$gameSelfSwitches[_0x4e074a(0xf2)](_0x51b12a,!![]);break;case'OFF':case _0x4e074a(0x302):$gameSelfSwitches[_0x4e074a(0xf2)](_0x51b12a,![]);break;case'TOGGLE':$gameSelfSwitches[_0x4e074a(0xf2)](_0x51b12a,!$gameSelfSwitches[_0x4e074a(0x319)](_0x51b12a));break;}},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x58e)]=function(_0x52ffb9,_0x26b4b2){const _0x2798c7=_0x39f07d;if(this===$gamePlayer)return;const _0x3450a4=[this[_0x2798c7(0x1c1)],this['_eventId'],_0x2798c7(0x24c)[_0x2798c7(0x307)](_0x52ffb9)];$gameSelfSwitches[_0x2798c7(0xf2)](_0x3450a4,Number(_0x26b4b2));},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x226)]=function(_0x29b894,_0x958f9f){const _0x29e177=_0x39f07d;this[_0x29e177(0x94)](_0x29b894,_0x958f9f);},Game_Character['prototype'][_0x39f07d(0x57a)]=function(_0x1848b6){const _0x36712c=_0x39f07d;if(_0x1848b6)this[_0x36712c(0x226)](_0x1848b6['x'],_0x1848b6['y']);},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x285)]=function(){const _0x2ac3d4=_0x39f07d;switch(this[_0x2ac3d4(0x151)]()){case 0x1:this['setDirection'](0x7);break;case 0x2:this[_0x2ac3d4(0xa7)](0x4);break;case 0x3:this[_0x2ac3d4(0xa7)](0x1);break;case 0x4:this[_0x2ac3d4(0xa7)](0x8);break;case 0x6:this[_0x2ac3d4(0xa7)](0x2);break;case 0x7:this[_0x2ac3d4(0xa7)](0x9);break;case 0x8:this[_0x2ac3d4(0xa7)](0x6);break;case 0x9:this[_0x2ac3d4(0xa7)](0x3);break;}},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x55d)]=function(){const _0x57ba73=_0x39f07d;switch(this['direction']()){case 0x1:this[_0x57ba73(0xa7)](0x3);break;case 0x2:this['setDirection'](0x6);break;case 0x3:this[_0x57ba73(0xa7)](0x9);break;case 0x4:this['setDirection'](0x2);break;case 0x6:this[_0x57ba73(0xa7)](0x8);break;case 0x7:this[_0x57ba73(0xa7)](0x1);break;case 0x8:this['setDirection'](0x4);break;case 0x9:this[_0x57ba73(0xa7)](0x7);break;}},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x1f3)]=function(_0x57f572,_0x44e8e3,_0x23a446){const _0x1124d4=_0x39f07d,_0x48606f=this['deltaXFrom'](_0x57f572),_0x215b06=this[_0x1124d4(0x4f9)](_0x44e8e3);if($gameMap[_0x1124d4(0x457)]()){if(_0x23a446||this[_0x1124d4(0x2c2)]()){if(_0x48606f>0x0&&_0x215b06<0x0)return 0x1;if(_0x48606f<0x0&&_0x215b06<0x0)return 0x3;if(_0x48606f>0x0&&_0x215b06>0x0)return 0x7;if(_0x48606f<0x0&&_0x215b06>0x0)return 0x9;}}if(Math['abs'](_0x48606f)>Math['abs'](_0x215b06))return _0x48606f>0x0?0x4:0x6;else{if(_0x215b06!==0x0)return _0x215b06>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x39f07d(0x287)]['getDirectionFromPoint']=function(_0x55c2be,_0x4843e1,_0x158ed2){const _0x325767=_0x39f07d,_0x28e813=this[_0x325767(0x30b)](_0x55c2be),_0x177f79=this['deltaYFrom'](_0x4843e1);if($gameMap['isSupportDiagonalMovement']()){if(_0x158ed2||this[_0x325767(0x2c2)]()){if(_0x28e813>0x0&&_0x177f79<0x0)return 0x9;if(_0x28e813<0x0&&_0x177f79<0x0)return 0x7;if(_0x28e813>0x0&&_0x177f79>0x0)return 0x3;if(_0x28e813<0x0&&_0x177f79>0x0)return 0x1;}}if(Math[_0x325767(0x3cd)](_0x28e813)>Math[_0x325767(0x3cd)](_0x177f79)){if(_0x325767(0x39e)===_0x325767(0x3f6)){if([0x2,0x4,0x6,0x8][_0x325767(0x310)](_0x10448c))return 0x0;if([0x1,0x3,0x7,0x9][_0x325767(0x310)](_0xb776e3))return 0x1;}else return _0x28e813>0x0?0x6:0x4;}else{if(_0x177f79!==0x0){if(_0x325767(0x5b6)===_0x325767(0xf6)){if(!_0x17328d[_0x325767(0x9b)]())return;_0x5c5cc8[_0x325767(0x3c8)]();}else return _0x177f79>0x0?0x2:0x8;}}return 0x0;},Game_Character[_0x39f07d(0x287)]['moveTowardPoint']=function(_0x184cb9,_0x354e7b){const _0x903c1e=_0x39f07d,_0x5f4ba8=this['getDirectionToPoint'](_0x184cb9,_0x354e7b,!![]);if(_0x5f4ba8)this[_0x903c1e(0x356)](_0x5f4ba8);},Game_Character[_0x39f07d(0x287)]['moveAwayFromPoint']=function(_0x29ffe2,_0x8aee4b){const _0x3ae2f8=_0x39f07d,_0x445b21=this[_0x3ae2f8(0x3bb)](_0x29ffe2,_0x8aee4b,!![]);if(_0x445b21)this[_0x3ae2f8(0x356)](_0x445b21);},Game_Character['prototype']['turnTowardPoint']=function(_0x3e8af1,_0x4ec577){const _0x25ad79=_0x39f07d,_0x4afd5f=this[_0x25ad79(0x1f3)](_0x3e8af1,_0x4ec577,![]);if(_0x4afd5f)this['setDirection'](_0x4afd5f);},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x450)]=function(_0x3db40e,_0x896919){const _0x5aed66=_0x39f07d,_0x59f92b=this[_0x5aed66(0x3bb)](_0x3db40e,_0x896919,![]);if(_0x59f92b)this[_0x5aed66(0xa7)](_0x59f92b);},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x1b2)]=function(_0x34c722){const _0x5aa31a=_0x39f07d;if(_0x34c722)this[_0x5aa31a(0x1c0)](_0x34c722['x'],_0x34c722['y']);},Game_Character['prototype'][_0x39f07d(0x3ac)]=function(_0x434303){if(_0x434303)this['moveAwayFromPoint'](_0x434303['x'],_0x434303['y']);},Game_Character['prototype'][_0x39f07d(0x197)]=function(_0xf8715){const _0x384e1f=_0x39f07d;if(_0xf8715)this[_0x384e1f(0x44b)](_0xf8715['x'],_0xf8715['y']);},Game_Character[_0x39f07d(0x287)][_0x39f07d(0x13b)]=function(_0x5d901c){if(_0x5d901c)this['turnAwayFromPoint'](_0x5d901c['x'],_0x5d901c['y']);},VisuMZ[_0x39f07d(0x41c)]['Game_Player_isDashing']=Game_Player[_0x39f07d(0x287)][_0x39f07d(0x3fe)],Game_Player[_0x39f07d(0x287)][_0x39f07d(0x3fe)]=function(){const _0x5706b3=_0x39f07d;if(!Game_CharacterBase[_0x5706b3(0x497)]&&this[_0x5706b3(0x54c)]())return![];if(this[_0x5706b3(0x41e)])return!![];return VisuMZ[_0x5706b3(0x41c)][_0x5706b3(0x261)][_0x5706b3(0x341)](this);},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x104)]=Game_Player[_0x39f07d(0x287)][_0x39f07d(0x237)],Game_Player['prototype']['getInputDirection']=function(){const _0x1677e0=_0x39f07d;return $gameMap[_0x1677e0(0x457)]()?this[_0x1677e0(0x1c2)]():_0x1677e0(0x107)===_0x1677e0(0x275)?this[_0x1677e0(0x14c)]:VisuMZ['EventsMoveCore'][_0x1677e0(0x104)][_0x1677e0(0x341)](this);},Game_Player['prototype']['getInputDir8']=function(){const _0x3830f6=_0x39f07d;return Input[_0x3830f6(0x4b1)];},Game_Player['prototype']['moveByInput']=function(){const _0x395257=_0x39f07d;if($gameSystem['isPlayerControlDisabled']())return 0x0;if(!this['isMoving']()&&this[_0x395257(0x1d5)]()){let _0x571981=this[_0x395257(0x237)]();if(_0x571981>0x0)$gameTemp['clearDestination']();else{if($gameTemp['isDestinationValid']()){const _0x10c0c0=$gameTemp['destinationX'](),_0x283a74=$gameTemp[_0x395257(0xb4)]();this[_0x395257(0x29c)](_0x10c0c0,_0x283a74)?_0x571981=this[_0x395257(0xc0)](_0x10c0c0,_0x283a74):_0x571981=this[_0x395257(0x5b9)](_0x10c0c0,_0x283a74);}}if(_0x571981>0x0){this[_0x395257(0xaa)]=this[_0x395257(0xaa)]||0x0;if(this[_0x395257(0x45c)]()){if('ELnIU'===_0x395257(0x50c))this[_0x395257(0xa7)](_0x571981);else{if(_0x1932b4<0x3e8)return;if(!this['_spawnedEvents'])return;const _0x6cca8f=this['event'](_0x3a3c0f);_0x6cca8f[_0x395257(0x94)](-0x1,-0x1),_0x6cca8f[_0x395257(0x47b)](),this[_0x395257(0x5b5)][_0x4fe054-0x3e8]=null,this[_0x395257(0x2bd)]();}}else this['executeMove'](_0x571981);this[_0x395257(0xaa)]++;}else this['_inputTime']=0x0;}},Game_Player['prototype'][_0x39f07d(0x45c)]=function(){const _0x933d8=_0x39f07d,_0x1f918f=VisuMZ['EventsMoveCore']['Settings']['Movement'];if(!_0x1f918f[_0x933d8(0x1e5)])return![];if($gameTemp[_0x933d8(0x3ab)]())return![];if(this[_0x933d8(0x3fe)]()||this['isMoving']()||this[_0x933d8(0x54c)]())return![];return this['_inputTime']<_0x1f918f[_0x933d8(0x3b3)];},VisuMZ[_0x39f07d(0x41c)]['Game_Player_executeMove']=Game_Player[_0x39f07d(0x287)][_0x39f07d(0x1fd)],Game_Player[_0x39f07d(0x287)]['executeMove']=function(_0x3ca5b0){const _0x1bc3ca=_0x39f07d;$gameMap[_0x1bc3ca(0x457)]()?this['executeMoveDir8'](_0x3ca5b0):VisuMZ[_0x1bc3ca(0x41c)]['Game_Player_executeMove'][_0x1bc3ca(0x341)](this,_0x3ca5b0);},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x483)]=Game_Player[_0x39f07d(0x287)][_0x39f07d(0x473)],Game_Player['prototype']['isMapPassable']=function(_0x3a74ab,_0x461e5a,_0x2c9952){const _0x49cd34=_0x39f07d;if($gameMap[_0x49cd34(0x3aa)](_0x3a74ab,_0x461e5a,_0x2c9952,_0x49cd34(0x495)))return this[_0x49cd34(0x549)]()&&this[_0x49cd34(0x140)]()?this[_0x49cd34(0x140)]()[_0x49cd34(0x473)](_0x3a74ab,_0x461e5a,_0x2c9952):!![];if($gameMap[_0x49cd34(0x19b)](_0x3a74ab,_0x461e5a,_0x2c9952,'player'))return![];return VisuMZ[_0x49cd34(0x41c)][_0x49cd34(0x483)][_0x49cd34(0x341)](this,_0x3a74ab,_0x461e5a,_0x2c9952);},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0xd5)]=Game_Player[_0x39f07d(0x287)][_0x39f07d(0x44e)],Game_Player[_0x39f07d(0x287)][_0x39f07d(0x44e)]=function(_0xd44bd2){const _0x10c18b=_0x39f07d;VisuMZ[_0x10c18b(0x41c)][_0x10c18b(0xd5)]['call'](this,_0xd44bd2);if(this[_0x10c18b(0x28e)]()){this[_0x10c18b(0x2df)](_0xd44bd2);if(_0xd44bd2['includes'](0x0)&&this['startMapCommonEventOnOKTarget']()===_0x10c18b(0x11d)){if(_0x10c18b(0x2ac)===_0x10c18b(0x2ac))this['startMapCommonEventOnOK'](this['x'],this['y']);else{const _0x116465=_0x5337da[_0x10c18b(0x4df)]()||this;if(_0x116465[_0x10c18b(0x113)]!==_0x19260c)_0x3c2f89[_0x10c18b(0x41c)][_0x10c18b(0x35e)][_0x10c18b(0x341)](this,_0x92d848,_0x5d2d70);else{const _0x454cc3=[_0x116465[_0x10c18b(0x1c1)],_0x116465[_0x10c18b(0x418)],'Self\x20Switch\x20%1'[_0x10c18b(0x307)](_0xe00d87)];_0x2272c9['setValue'](_0x454cc3,_0x11cf0f);}}}else{if(_0xd44bd2[_0x10c18b(0x310)](0x1)||_0xd44bd2[_0x10c18b(0x310)](0x2)){if(_0x10c18b(0x21c)!=='rjGwf')this[_0x10c18b(0x59e)]();else{if(!_0x3f79e4&&_0x5c1fee[_0x10c18b(0x16e)]())return![];if(!_0x5ce5ec&&_0x22e352['isAnyEventStarting']())return![];if(this['activationRegionList']()<=0x0)return!![];return _0x587490[_0x10c18b(0x5cf)](this);}}}}},VisuMZ['EventsMoveCore']['Game_Player_checkEventTriggerThere']=Game_Player[_0x39f07d(0x287)][_0x39f07d(0x4ee)],Game_Player[_0x39f07d(0x287)][_0x39f07d(0x4ee)]=function(_0x156063){const _0x2acc9e=_0x39f07d;VisuMZ[_0x2acc9e(0x41c)][_0x2acc9e(0x54a)][_0x2acc9e(0x341)](this,_0x156063);if(this['canStartLocalEvents']()&&_0x156063[_0x2acc9e(0x310)](0x0)&&this['startMapCommonEventOnOKTarget']()===_0x2acc9e(0x534)){const _0xd1c727=this[_0x2acc9e(0x151)](),_0x487f07=$gameMap['roundXWithDirection'](this['x'],_0xd1c727),_0x5a17ff=$gameMap[_0x2acc9e(0xd8)](this['y'],_0xd1c727);this[_0x2acc9e(0x4c3)](_0x487f07,_0x5a17ff);}},Game_Player[_0x39f07d(0x287)][_0x39f07d(0x2df)]=function(_0x15e8b0){const _0xd0f7cb=_0x39f07d;if($gameMap[_0xd0f7cb(0x16e)]())return;if($gameMap[_0xd0f7cb(0xe5)]())return;const _0x36e604=$gameMap[_0xd0f7cb(0x3c4)]();for(const _0xb3e8a2 of _0x36e604){if(!_0xb3e8a2)continue;if(!_0xb3e8a2[_0xd0f7cb(0x196)](_0x15e8b0))continue;if(this[_0xd0f7cb(0x5cf)](_0xb3e8a2))return _0xb3e8a2['start']();if(this[_0xd0f7cb(0x2e2)](_0xb3e8a2))return _0xb3e8a2[_0xd0f7cb(0xfa)]();}},Game_Player[_0x39f07d(0x287)][_0x39f07d(0x5cf)]=function(_0x3fb753){const _0x132987=_0x39f07d;if($gameMap[_0x132987(0x16e)]())return![];if($gameMap[_0x132987(0xe5)]())return![];return _0x3fb753['activationRegionList']()[_0x132987(0x310)](this[_0x132987(0x3b4)]());},Game_Player[_0x39f07d(0x287)]['meetActivationProximityConditions']=function(_0x14d609){const _0x3b9ca6=_0x39f07d;if($gameMap[_0x3b9ca6(0x16e)]())return![];if($gameMap['isAnyEventStarting']())return![];if(['none',_0x3b9ca6(0x22b)][_0x3b9ca6(0x310)](_0x14d609[_0x3b9ca6(0x459)]()))return![];const _0x567b92=_0x14d609['activationProximityType'](),_0x74eec4=_0x14d609[_0x3b9ca6(0x228)]();switch(_0x567b92){case _0x3b9ca6(0x516):const _0x2cd45d=$gameMap[_0x3b9ca6(0x555)](this['x'],this['y'],_0x14d609['x'],_0x14d609['y']);return _0x14d609['activationProximityDistance']()>=_0x2cd45d;break;case _0x3b9ca6(0x411):return _0x74eec4>=Math['abs'](_0x14d609[_0x3b9ca6(0x30b)](this['x']))&&_0x74eec4>=Math[_0x3b9ca6(0x3cd)](_0x14d609['deltaYFrom'](this['y']));break;case _0x3b9ca6(0x203):return _0x74eec4>=Math[_0x3b9ca6(0x3cd)](_0x14d609['deltaYFrom'](this['y']));break;case _0x3b9ca6(0xdf):return _0x74eec4>=Math[_0x3b9ca6(0x3cd)](_0x14d609[_0x3b9ca6(0x30b)](this['x']));break;case _0x3b9ca6(0x480):return![];break;}},Game_Player[_0x39f07d(0x287)]['startMapCommonEventOnOK']=function(_0x63c75b,_0x39f235){const _0x19253e=_0x39f07d;if($gameMap['isEventRunning']())return;if($gameMap[_0x19253e(0xe5)]())return;let _0x1e2470=VisuMZ[_0x19253e(0x41c)][_0x19253e(0x2a4)]['RegionOk'],_0x1eae56=$gameMap[_0x19253e(0x3b4)](_0x63c75b,_0x39f235);const _0x1ca9b6='Region%1'[_0x19253e(0x307)](_0x1eae56);_0x1e2470[_0x1ca9b6]&&$gameTemp['reserveCommonEvent'](_0x1e2470[_0x1ca9b6]);},Game_Player[_0x39f07d(0x287)][_0x39f07d(0x3fa)]=function(){const _0x2d07e3=_0x39f07d;return VisuMZ[_0x2d07e3(0x41c)][_0x2d07e3(0x2a4)][_0x2d07e3(0x345)];},Game_Player['prototype'][_0x39f07d(0x59e)]=function(){const _0x579111=_0x39f07d;if($gameMap[_0x579111(0x16e)]())return;if($gameMap['isAnyEventStarting']())return;let _0x3c9296=VisuMZ[_0x579111(0x41c)][_0x579111(0x2a4)]['RegionTouch'];const _0x78eba8=_0x579111(0x494)[_0x579111(0x307)](this['regionId']());_0x3c9296[_0x78eba8]&&$gameTemp['reserveCommonEvent'](_0x3c9296[_0x78eba8]);},VisuMZ[_0x39f07d(0x41c)]['Game_Player_increaseSteps']=Game_Player[_0x39f07d(0x287)]['increaseSteps'],Game_Player[_0x39f07d(0x287)]['increaseSteps']=function(){const _0xe07183=_0x39f07d;VisuMZ[_0xe07183(0x41c)][_0xe07183(0xc9)][_0xe07183(0x341)](this),VisuMZ[_0xe07183(0x4e6)](0x0);},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x363)]=Game_Follower[_0x39f07d(0x287)][_0x39f07d(0x56b)],Game_Follower[_0x39f07d(0x287)][_0x39f07d(0x56b)]=function(_0x2aa43c){const _0x5687e7=_0x39f07d;VisuMZ[_0x5687e7(0x41c)][_0x5687e7(0x363)][_0x5687e7(0x341)](this,_0x2aa43c),this[_0x5687e7(0x545)]=![];},Game_Follower[_0x39f07d(0x287)][_0x39f07d(0x3fe)]=function(){const _0x2d0eff=_0x39f07d;if(this[_0x2d0eff(0x545)])return Game_Character['prototype']['isDashing'][_0x2d0eff(0x341)](this);return $gamePlayer['isDashing']();},Game_Follower[_0x39f07d(0x287)][_0x39f07d(0x551)]=function(){const _0x26ca91=_0x39f07d;if(this['_chaseOff'])return Game_Character['prototype'][_0x26ca91(0x551)][_0x26ca91(0x341)](this);return $gamePlayer['isDashingAndMoving']()&&this['_actuallyMoving'];},Game_Follower['prototype'][_0x39f07d(0x334)]=function(){return $gamePlayer['realMoveSpeed']();},Game_Follower[_0x39f07d(0x287)][_0x39f07d(0x5ae)]=function(){const _0x70cdce=_0x39f07d;Game_Character[_0x70cdce(0x287)][_0x70cdce(0x5ae)]['call'](this);if(this[_0x70cdce(0x1e8)]>0x0){if(_0x70cdce(0x43d)!==_0x70cdce(0x43d))return this[_0x70cdce(0x1e9)]();else this['_actuallyMoving']=![];}},Game_Follower[_0x39f07d(0x287)][_0x39f07d(0x270)]=function(_0xa999e4){const _0x3963c5=_0x39f07d;this[_0x3963c5(0x545)]=_0xa999e4;},VisuMZ['EventsMoveCore'][_0x39f07d(0x398)]=Game_Follower[_0x39f07d(0x287)]['chaseCharacter'],Game_Follower[_0x39f07d(0x287)][_0x39f07d(0x292)]=function(_0x38bffc){const _0x39e3ef=_0x39f07d;if(this[_0x39e3ef(0x545)])return;if($gameSystem[_0x39e3ef(0xce)]())return;VisuMZ['EventsMoveCore'][_0x39e3ef(0x398)][_0x39e3ef(0x341)](this,_0x38bffc),this['_actuallyMoving']=!![];},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x51e)]=Game_Vehicle[_0x39f07d(0x287)]['isMapPassable'],Game_Vehicle[_0x39f07d(0x287)][_0x39f07d(0x473)]=function(_0x13f51b,_0x416110,_0x591b02){const _0x339da2=_0x39f07d;if($gameMap[_0x339da2(0x3aa)](_0x13f51b,_0x416110,_0x591b02,this[_0x339da2(0x420)]))return!![];if($gameMap[_0x339da2(0x19b)](_0x13f51b,_0x416110,_0x591b02,this['_type']))return![];return VisuMZ['EventsMoveCore'][_0x339da2(0x51e)][_0x339da2(0x341)](this,_0x13f51b,_0x416110,_0x591b02);},Game_Vehicle[_0x39f07d(0x287)][_0x39f07d(0x115)]=function(_0x2f8056,_0x26bc8a,_0x304b47){const _0x521d1e=_0x39f07d;if($gameMap[_0x521d1e(0x3aa)](_0x2f8056,_0x26bc8a,_0x304b47,this[_0x521d1e(0x420)]))return!![];if($gameMap[_0x521d1e(0x19b)](_0x2f8056,_0x26bc8a,_0x304b47,this['_type']))return![];return VisuMZ[_0x521d1e(0x41c)]['Game_CharacterBase_canPass'][_0x521d1e(0x341)]($gamePlayer,_0x2f8056,_0x26bc8a,_0x304b47);},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x451)]=Game_Vehicle[_0x39f07d(0x287)][_0x39f07d(0x546)],Game_Vehicle[_0x39f07d(0x287)][_0x39f07d(0x546)]=function(_0xebfb04,_0x52558f,_0x1f2364){const _0x2f3ebd=_0x39f07d;if($gameMap['isRegionDockable'](_0xebfb04,_0x52558f,_0x1f2364,this[_0x2f3ebd(0x420)]))return!![];const _0x5d9a3a=this['_type'][_0x2f3ebd(0x37c)](0x0)[_0x2f3ebd(0x321)]()+this['_type'][_0x2f3ebd(0x586)](0x1),_0x3a4d13='%1DockRegionOnly'[_0x2f3ebd(0x307)](_0x5d9a3a);if(VisuMZ[_0x2f3ebd(0x41c)]['Settings'][_0x2f3ebd(0x35d)][_0x3a4d13]){if(_0x2f3ebd(0x405)!==_0x2f3ebd(0x405)){if(_0x4f144d===0x1)return this[_0x2f3ebd(0x2c9)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x20d3e5===0x3)return this[_0x2f3ebd(0x2c9)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x1326f0===0x7)return this[_0x2f3ebd(0x2c9)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x240879===0x9)return this[_0x2f3ebd(0x2c9)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x5f1e56;}else return![];}else return VisuMZ[_0x2f3ebd(0x41c)][_0x2f3ebd(0x451)][_0x2f3ebd(0x341)](this,_0xebfb04,_0x52558f,_0x1f2364);},VisuMZ['EventsMoveCore'][_0x39f07d(0x2dd)]=Game_Vehicle[_0x39f07d(0x287)][_0x39f07d(0x3b7)],Game_Vehicle[_0x39f07d(0x287)]['initMoveSpeed']=function(){const _0x248980=_0x39f07d;VisuMZ['EventsMoveCore'][_0x248980(0x2dd)][_0x248980(0x341)](this);const _0x1a9a28=VisuMZ[_0x248980(0x41c)]['Settings']['Movement'];if(this[_0x248980(0x8c)]()){if(_0x1a9a28[_0x248980(0x3ce)])this['setMoveSpeed'](_0x1a9a28[_0x248980(0x3ce)]);}else{if(this[_0x248980(0x281)]()){if(_0x248980(0x138)==='FyouX'){if(_0x1a9a28[_0x248980(0x2fd)])this[_0x248980(0x491)](_0x1a9a28[_0x248980(0x2fd)]);}else{if(_0x9a5601)return _0x3cc541;}}else{if(this[_0x248980(0x1ee)]()){if(_0x248980(0x2e1)!==_0x248980(0x191)){if(_0x1a9a28[_0x248980(0xb5)])this[_0x248980(0x491)](_0x1a9a28[_0x248980(0xb5)]);}else{if(this['_PreservedEventMorphData']===_0x2692bd)this[_0x248980(0x8b)]();if(!_0x40c566)return;const _0x4199a0=_0x248980(0xa4)[_0x248980(0x307)](_0xe531f0[_0x248980(0x1c1)],_0x528d24[_0x248980(0x418)]);return this[_0x248980(0x3c0)][_0x4199a0];}}}}},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x367)]=Game_Event[_0x39f07d(0x287)][_0x39f07d(0x56b)],Game_Event[_0x39f07d(0x287)][_0x39f07d(0x56b)]=function(_0x32dc22,_0x16d087){const _0x59f3c3=_0x39f07d;VisuMZ[_0x59f3c3(0x41c)][_0x59f3c3(0x367)][_0x59f3c3(0x341)](this,_0x32dc22,_0x16d087),this[_0x59f3c3(0x369)](),this[_0x59f3c3(0x15d)](),this['restoreSavedEventPosition']();},Game_Map[_0x39f07d(0x287)][_0x39f07d(0x3bd)]=function(_0x52ae50,_0x1a5d80){const _0x50ffd4=_0x39f07d;if(_0x52ae50===$gameMap[_0x50ffd4(0x5cb)]())return $dataMap[_0x50ffd4(0x3c4)][_0x1a5d80];else{if('WTsBm'==='WTsBm')return VisuMZ[_0x50ffd4(0x508)][_0x52ae50][_0x50ffd4(0x3c4)][_0x1a5d80];else this['_attachPictureSprite']=new _0x411125(),this[_0x50ffd4(0x47c)]['anchor']['x']=0.5,this[_0x50ffd4(0x47c)][_0x50ffd4(0x23d)]['y']=0x1,this[_0x50ffd4(0x31f)](this[_0x50ffd4(0x47c)]),this[_0x50ffd4(0x2d2)]();}},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x469)]=Game_Event[_0x39f07d(0x287)][_0x39f07d(0x3f5)],Game_Event[_0x39f07d(0x287)][_0x39f07d(0x3f5)]=function(){const _0x5bce16=_0x39f07d;if(this['_eventMorphData']!==undefined){const _0x12901d=this[_0x5bce16(0x5a7)][_0x5bce16(0x5cb)],_0xdf405=this[_0x5bce16(0x5a7)][_0x5bce16(0x4e2)];return $gameMap[_0x5bce16(0x3bd)](_0x12901d,_0xdf405);}if(this[_0x5bce16(0x16a)]!==undefined){if(_0x5bce16(0x57e)!==_0x5bce16(0xc5)){const _0x4fb8ce=this['_eventCopyData']['mapId'],_0xf5c2a8=this[_0x5bce16(0x16a)][_0x5bce16(0x4e2)];return $gameMap[_0x5bce16(0x3bd)](_0x4fb8ce,_0xf5c2a8);}else{const _0x3a87b0=this[_0x5bce16(0x2be)],_0x163b0b=this['_randomHomeY'];return this[_0x5bce16(0x162)](_0x3a87b0,_0x163b0b);}}if(this[_0x5bce16(0x4c8)]!==undefined){const _0x5e2aaa=this[_0x5bce16(0x4c8)][_0x5bce16(0x5cb)],_0x30f0c0=this[_0x5bce16(0x4c8)][_0x5bce16(0x4e2)];return $gameMap['referEvent'](_0x5e2aaa,_0x30f0c0);}if($gameTemp[_0x5bce16(0x472)]!==undefined){const _0x17aed2=$gameTemp[_0x5bce16(0x472)][_0x5bce16(0x5cb)],_0x449b0b=$gameTemp[_0x5bce16(0x472)][_0x5bce16(0x4e2)];return $gameMap['referEvent'](_0x17aed2,_0x449b0b);}return VisuMZ[_0x5bce16(0x41c)][_0x5bce16(0x469)]['call'](this);},Game_Event[_0x39f07d(0x287)]['checkValidEventerMap']=function(_0x5ec539,_0x5581d8){const _0x1f4c4b=_0x39f07d;if(_0x5ec539===0x0||_0x5581d8===0x0)return![];if(_0x5ec539===$gameMap[_0x1f4c4b(0x5cb)]())return!![];if(!VisuMZ['PreloadedMaps'][_0x5ec539]&&_0x5ec539!==$gameMap[_0x1f4c4b(0x5cb)]())return $gameTemp[_0x1f4c4b(0x144)]()&&console[_0x1f4c4b(0x1b1)](_0x1f4c4b(0x16d)['format'](_0x5ec539)),![];return!![];},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x43b)]=Game_Event[_0x39f07d(0x287)]['start'],Game_Event[_0x39f07d(0x287)][_0x39f07d(0xfa)]=function(){const _0x4701eb=_0x39f07d;VisuMZ['EventsMoveCore'][_0x4701eb(0x43b)][_0x4701eb(0x341)](this),Imported[_0x4701eb(0x32a)]&&Input[_0x4701eb(0x11f)](VisuMZ[_0x4701eb(0x1ed)][_0x4701eb(0x2a4)][_0x4701eb(0x4e7)][_0x4701eb(0x4ea)])&&Input[_0x4701eb(0x32d)]();},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x369)]=function(){const _0x30ba68=_0x39f07d,_0x41d326=this[_0x30ba68(0x3f5)]()[_0x30ba68(0x12b)];if(_0x41d326==='')return;if(DataManager[_0x30ba68(0x3e5)]()||DataManager[_0x30ba68(0x201)]())return;const _0x3a9e28=VisuMZ[_0x30ba68(0x41c)][_0x30ba68(0x2a4)]['Template'];let _0x7269ef=null,_0x4a51db=0x0,_0x1abe5a=0x0;if(_0x41d326[_0x30ba68(0x17c)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x4a51db=Number(RegExp['$1']),_0x1abe5a=Number(RegExp['$2']);if(_0x4a51db===0x0)_0x4a51db=$gameMap[_0x30ba68(0x5cb)]();}else{if(_0x41d326[_0x30ba68(0x17c)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){if('nwogp'===_0x30ba68(0x45e)){const _0x6197e1=_0x5ca7ef[_0x30ba68(0x28d)][0x0];if(_0x6197e1[_0x30ba68(0x17c)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x42a385=!![];else _0x6197e1[_0x30ba68(0x17c)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x47375f=![]);}else{_0x4a51db=Number(RegExp['$1']),_0x1abe5a=Number(RegExp['$2']);if(_0x4a51db===0x0)_0x4a51db=$gameMap['mapId']();}}else{if(_0x41d326['match'](/<COPY EVENT:[ ](.*?)>/i)){if(_0x30ba68(0x14b)!==_0x30ba68(0x15a)){const _0x20f418=String(RegExp['$1'])[_0x30ba68(0x321)]()['trim']();_0x7269ef=VisuMZ[_0x30ba68(0x4b9)][_0x20f418];if(!_0x7269ef)return;_0x4a51db=_0x7269ef['MapID'],_0x1abe5a=_0x7269ef['EventID'];}else{const _0x491deb=_0x119132[_0x30ba68(0x4b9)][_0xf1265];_0x491deb['PreSpawnJS'][_0x30ba68(0x341)](this,_0x1cef4c,_0x2b0dbb,this);}}}}if(!this[_0x30ba68(0x3cc)](_0x4a51db,_0x1abe5a))return;_0x3a9e28[_0x30ba68(0x343)]['call'](this,_0x4a51db,_0x1abe5a,this);if(_0x7269ef)_0x7269ef[_0x30ba68(0x343)]['call'](this,_0x4a51db,_0x1abe5a,this);this[_0x30ba68(0x16a)]={'mapId':_0x4a51db,'eventId':_0x1abe5a},this[_0x30ba68(0x5c5)]=-0x2,this[_0x30ba68(0x1ce)](),_0x3a9e28[_0x30ba68(0x4cc)][_0x30ba68(0x341)](this,_0x4a51db,_0x1abe5a,this);if(_0x7269ef)_0x7269ef[_0x30ba68(0x4cc)][_0x30ba68(0x341)](this,_0x4a51db,_0x1abe5a,this);$gameMap[_0x30ba68(0x2bd)]();},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x15d)]=function(){const _0x5e0118=_0x39f07d,_0x214131=$gameSystem[_0x5e0118(0xb2)](this);if(!_0x214131)return;const _0x5d88e4=_0x214131[_0x5e0118(0x84)][_0x5e0118(0x321)]()[_0x5e0118(0x577)]();_0x5d88e4!==_0x5e0118(0x8f)?this[_0x5e0118(0xf9)](_0x5d88e4,!![]):_0x5e0118(0x177)!=='GWulk'?this[_0x5e0118(0x222)](_0x214131['mapId'],_0x214131['eventId'],!![]):_0x5338bd[_0x4fef41]?(_0x472834['PreloadedMaps'][_0x2a336d]=_0x3b0968[_0x4e58cf],_0x535e47[_0x584333]=_0x4b123c):_0x46239b(this['VisuMZ_Setup_Preload_Map'][_0x5e0118(0x43f)](this,_0x5a880d,_0x4f1f78),0x64);},Game_Event['prototype'][_0x39f07d(0x222)]=function(_0x5c65fa,_0x21259f,_0x2a0e1c){const _0x52b799=_0x39f07d;if(!this[_0x52b799(0x3cc)](_0x5c65fa,_0x21259f))return;const _0x36c451=VisuMZ[_0x52b799(0x41c)][_0x52b799(0x2a4)][_0x52b799(0x27a)];if(!_0x2a0e1c)_0x36c451['PreMorphJS'][_0x52b799(0x341)](this,_0x5c65fa,_0x21259f,this);this[_0x52b799(0x5a7)]={'mapId':_0x5c65fa,'eventId':_0x21259f},this[_0x52b799(0x5c5)]=-0x2,this[_0x52b799(0x1ce)]();if(!_0x2a0e1c)_0x36c451[_0x52b799(0xb6)][_0x52b799(0x341)](this,_0x5c65fa,_0x21259f,this);$gameMap['clearEventCache']();},Game_Event[_0x39f07d(0x287)][_0x39f07d(0xf9)]=function(_0xa3221,_0x115c08){const _0x25e034=_0x39f07d;_0xa3221=_0xa3221[_0x25e034(0x321)]()[_0x25e034(0x577)]();const _0x504753=VisuMZ[_0x25e034(0x4b9)][_0xa3221];if(!_0x504753)return;const _0x48b136=_0x504753['MapID'],_0x49c01e=_0x504753['EventID'];if(!this[_0x25e034(0x3cc)](_0x48b136,_0x49c01e))return;if(!_0x115c08)_0x504753[_0x25e034(0x59f)][_0x25e034(0x341)](this,_0x48b136,_0x49c01e,this);this[_0x25e034(0x222)](_0x48b136,_0x49c01e,_0x115c08);if(!_0x115c08)_0x504753[_0x25e034(0xb6)]['call'](this,_0x48b136,_0x49c01e,this);if($gameMap)$gameMap[_0x25e034(0x2bd)]();},Game_Event[_0x39f07d(0x287)]['removeMorph']=function(){const _0x41d5b0=_0x39f07d;this[_0x41d5b0(0x5a7)]=undefined,this['_pageIndex']=-0x2,this[_0x41d5b0(0x1ce)]();},Game_Event['prototype'][_0x39f07d(0x22f)]=function(_0x2336e2){const _0x31d9a6=_0x39f07d,_0x371f24=VisuMZ[_0x31d9a6(0x41c)][_0x31d9a6(0x2a4)]['Template'],_0x5cb9f0=_0x2336e2['template'][_0x31d9a6(0x321)]()[_0x31d9a6(0x577)](),_0x445b6b=!['',_0x31d9a6(0x8f)][_0x31d9a6(0x310)](_0x5cb9f0);let _0xd2500=0x0,_0x3023f4=0x0;if(_0x445b6b){if(_0x31d9a6(0x38f)!==_0x31d9a6(0xe3)){const _0x246850=VisuMZ[_0x31d9a6(0x4b9)][_0x5cb9f0];if(!_0x246850)return;_0xd2500=_0x246850[_0x31d9a6(0x2d3)],_0x3023f4=_0x246850[_0x31d9a6(0x4b4)];}else{if(_0x53d919['AirshipSpeed'])this['setMoveSpeed'](_0x1824c2[_0x31d9a6(0xb5)]);}}else _0x31d9a6(0x464)===_0x31d9a6(0x32e)?this[_0x31d9a6(0x55d)]():(_0xd2500=_0x2336e2[_0x31d9a6(0x5cb)],_0x3023f4=_0x2336e2['eventId']);if(!this[_0x31d9a6(0x3cc)](_0xd2500,_0x3023f4))return;if(_0x445b6b){if(_0x31d9a6(0xd3)!==_0x31d9a6(0xd3)){const _0x2b86c8=_0x34efc8['EventsMoveCore']['Settings'];this[_0x31d9a6(0x575)]={'type':'none','distance':0x0,'regionList':[]},this[_0x31d9a6(0xde)]=![],this['clearAttachPictureSettings'](),this['_clickTrigger']=![],this[_0x31d9a6(0x306)]=![],this['_addedHitbox']={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x31d9a6(0x5ba)]=_0x75007c[_0x31d9a6(0x4c5)](this),this['_labelWindow']={'originalText':'','text':'','visibleRange':_0x2b86c8[_0x31d9a6(0x527)][_0x31d9a6(0x3df)],'offsetX':_0x2b86c8[_0x31d9a6(0x527)]['OffsetX'],'offsetY':_0x2b86c8['Label'][_0x31d9a6(0x1f9)]},this[_0x31d9a6(0x169)]=![],this['_moveOnlyRegions']=[],this['_moveSynch']={'target':-0x1,'type':'random','delay':0x1,'opacityDelta':0x0},this[_0x31d9a6(0x1fc)]=_0x2b86c8[_0x31d9a6(0x258)][_0x31d9a6(0x49a)]??0x0,this[_0x31d9a6(0x4ff)]=![],this['_shadowGraphic']={'visible':!![],'filename':_0x2b86c8[_0x31d9a6(0x258)][_0x31d9a6(0x263)]},this[_0x31d9a6(0xf8)](),this[_0x31d9a6(0xac)]();}else{const _0x323c20=VisuMZ[_0x31d9a6(0x4b9)][_0x5cb9f0];_0x323c20['PreSpawnJS']['call'](this,_0xd2500,_0x3023f4,this);}}_0x371f24[_0x31d9a6(0x49d)][_0x31d9a6(0x341)](this,_0xd2500,_0x3023f4,this),this['_eventSpawnData']=_0x2336e2,this[_0x31d9a6(0x5c5)]=-0x2,this[_0x31d9a6(0x1c1)]=$gameMap[_0x31d9a6(0x5cb)](),this['_eventId']=_0x2336e2[_0x31d9a6(0x26b)],this[_0x31d9a6(0x106)]=_0x2336e2[_0x31d9a6(0x187)],this[_0x31d9a6(0x94)](_0x2336e2['x'],_0x2336e2['y']),this[_0x31d9a6(0xa7)](_0x2336e2[_0x31d9a6(0x151)]),this['refresh']();if(_0x445b6b){if(_0x31d9a6(0x214)===_0x31d9a6(0x214)){const _0x2c8026=VisuMZ[_0x31d9a6(0x4b9)][_0x5cb9f0];if(!_0x2c8026)return;_0x2c8026[_0x31d9a6(0x32b)][_0x31d9a6(0x341)](this,_0xd2500,_0x3023f4,this);}else _0x1fafcb['EventsMoveCore'][_0x31d9a6(0xd2)][_0x31d9a6(0x341)](this),this['clearPose']();}_0x371f24[_0x31d9a6(0x32b)][_0x31d9a6(0x341)](this,_0xd2500,_0x3023f4,this);const _0x1e622b=SceneManager[_0x31d9a6(0x1bd)];if(_0x1e622b&&_0x1e622b[_0x31d9a6(0x359)])_0x1e622b[_0x31d9a6(0x359)][_0x31d9a6(0x569)](this);},Game_Event['prototype'][_0x39f07d(0x536)]=function(){const _0x57fdbf=_0x39f07d;return!!this[_0x57fdbf(0x4c8)];},Game_Event[_0x39f07d(0x287)][_0x39f07d(0xfa)]=function(){const _0x63ccb6=_0x39f07d;if(!this[_0x63ccb6(0x22c)]())return;const _0x2fc5c0=this['list']()[_0x63ccb6(0x48a)](_0x1f308e=>_0x1f308e['code']!==0x6c&&_0x1f308e[_0x63ccb6(0x206)]!==0x198);if(_0x2fc5c0[_0x63ccb6(0x5be)]>0x1){this['_starting']=!![];if(this[_0x63ccb6(0x196)]([0x0,0x1,0x2])){if(_0x63ccb6(0xb7)!=='NUVnk')this['lock']();else{const _0x1a5d9f=this['deltaXFrom'](_0x713ac3),_0x5b55a8=this['deltaYFrom'](_0x5e7ea5);}}}},VisuMZ['EventsMoveCore'][_0x39f07d(0x1c9)]=Game_Event['prototype'][_0x39f07d(0x357)],Game_Event[_0x39f07d(0x287)][_0x39f07d(0x357)]=function(){const _0x248d5a=_0x39f07d;VisuMZ[_0x248d5a(0x41c)][_0x248d5a(0x1c9)][_0x248d5a(0x341)](this),this[_0x248d5a(0x159)](),this[_0x248d5a(0x591)]();},VisuMZ[_0x39f07d(0x41c)]['Game_Event_setupPageSettings']=Game_Event['prototype']['setupPageSettings'],Game_Event['prototype'][_0x39f07d(0x1a0)]=function(){const _0x15c042=_0x39f07d;this['_activationProximityAutoTriggerBypass']=!![],VisuMZ[_0x15c042(0x41c)]['Game_Event_setupPageSettings'][_0x15c042(0x341)](this),this[_0x15c042(0x347)](),this['autosaveEventLocation'](),this['_activationProximityAutoTriggerBypass']=![];},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x347)]=function(){const _0x51e0a8=_0x39f07d;if(!this[_0x51e0a8(0x3f5)]())return;this[_0x51e0a8(0x159)](),this[_0x51e0a8(0x374)](),this[_0x51e0a8(0x30a)](),this[_0x51e0a8(0x559)]();},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x374)]=function(){const _0x169096=_0x39f07d,_0x3f7db7=this[_0x169096(0x3f5)]()[_0x169096(0x12b)];if(_0x3f7db7==='')return;this[_0x169096(0x118)](_0x3f7db7);},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x30a)]=function(){const _0x1c8756=_0x39f07d;if(!this[_0x1c8756(0x3dd)]())return;const _0x9f9d26=this[_0x1c8756(0x22c)]();let _0x2d9d55='';for(const _0x3d935a of _0x9f9d26){if([0x6c,0x198][_0x1c8756(0x310)](_0x3d935a[_0x1c8756(0x206)])){if(_0x2d9d55!=='')_0x2d9d55+='\x0a';_0x2d9d55+=_0x3d935a[_0x1c8756(0x28d)][0x0];}}this[_0x1c8756(0x118)](_0x2d9d55);},Game_Event[_0x39f07d(0x287)]['initEventsMoveCoreEffects']=function(){const _0x122800=_0x39f07d,_0x3971e5=VisuMZ[_0x122800(0x41c)][_0x122800(0x2a4)];this[_0x122800(0x575)]={'type':_0x122800(0x515),'distance':0x0,'regionList':[]},this[_0x122800(0xde)]=![],this[_0x122800(0x23b)](),this[_0x122800(0x1ba)]=![],this['_customZ']=![],this['_addedHitbox']={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this['_eventIcon']=$gameSystem[_0x122800(0x4c5)](this),this[_0x122800(0x471)]={'originalText':'','text':'','visibleRange':_0x3971e5[_0x122800(0x527)]['VisibleRange'],'offsetX':_0x3971e5[_0x122800(0x527)][_0x122800(0x526)],'offsetY':_0x3971e5['Label'][_0x122800(0x1f9)]},this[_0x122800(0x169)]=![],this[_0x122800(0x322)]=[],this['_moveSynch']={'target':-0x1,'type':_0x122800(0x2f8),'delay':0x1,'opacityDelta':0x0},this[_0x122800(0x1fc)]=_0x3971e5[_0x122800(0x258)]['RandomMoveWeight']??0x0,this[_0x122800(0x4ff)]=![],this['_shadowGraphic']={'visible':!![],'filename':_0x3971e5['Movement'][_0x122800(0x263)]},this['clearSpriteOffsets'](),this[_0x122800(0xac)]();},Game_Event['prototype'][_0x39f07d(0x118)]=function(_0x2316fb){const _0x28dde1=_0x39f07d;if(_0x2316fb[_0x28dde1(0x17c)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))_0x28dde1(0x19d)===_0x28dde1(0x1aa)?_0x40ce8a[_0x28dde1(0x41c)][_0x28dde1(0x2da)][_0x28dde1(0x341)](this):(this[_0x28dde1(0x575)][_0x28dde1(0x10f)]=JSON[_0x28dde1(0x8e)]('['+RegExp['$1'][_0x28dde1(0x17c)](/\d+/g)+']'),this[_0x28dde1(0x575)]['type']=_0x28dde1(0x22b));else{if(_0x2316fb['match'](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)){if(_0x28dde1(0x552)!==_0x28dde1(0x552)){const _0x95cda5=_0x55874d['GetMoveSynchTarget'](this[_0x28dde1(0x18d)]());this['executeMoveDir8'](this['reverseDir'](_0x95cda5[_0x28dde1(0x2a9)]()));}else type=String(RegExp['$1'])[_0x28dde1(0x394)]()[_0x28dde1(0x577)](),this[_0x28dde1(0x575)][_0x28dde1(0x1e3)]=type,this[_0x28dde1(0x575)][_0x28dde1(0x555)]=Number(RegExp['$2']);}}if(_0x2316fb['match'](/<(?:ATTACH PICTURE|PICTURE) FILENAME:[ ](.*?)>/i)){if('PSeNI'===_0x28dde1(0x3c6))this[_0x28dde1(0x210)][_0x28dde1(0x326)]=String(RegExp['$1']);else{if(!_0x1b5847[_0x28dde1(0x41c)]['Settings'][_0x28dde1(0x258)][_0x28dde1(0x199)])return;this[_0x28dde1(0x46b)]=0x0;if(this[_0x28dde1(0x278)]()){const _0x309f97=_0x40eee1[_0x28dde1(0x41c)][_0x28dde1(0x2a4)][_0x28dde1(0x258)],_0xa294aa=this['_character']['direction']();let _0x26c022=0x0;if([0x1,0x4,0x7][_0x28dde1(0x310)](_0xa294aa))_0x26c022=_0x309f97['TiltLeft'];if([0x3,0x6,0x9]['includes'](_0xa294aa))_0x26c022=_0x309f97[_0x28dde1(0x41f)];[0x2,0x8][_0x28dde1(0x310)](_0xa294aa)&&(_0x26c022=[-_0x309f97[_0x28dde1(0x538)],0x0,_0x309f97[_0x28dde1(0x538)]][this[_0x28dde1(0x42f)][_0x28dde1(0x145)]()]);if(this[_0x28dde1(0x1cd)])_0x26c022*=-0x1;this['rotation']=_0x26c022;}}}if(_0x2316fb[_0x28dde1(0x17c)](/<(?:ATTACH PICTURE|PICTURE) BLEND MODE:[ ](.*?)>/i)){const _0x351f00=String(RegExp['$1'])[_0x28dde1(0x321)]()[_0x28dde1(0x577)](),_0x267203=[_0x28dde1(0xe2),_0x28dde1(0x558),'MULTIPLY','SCREEN'];this['_attachPicture'][_0x28dde1(0x36b)]=_0x267203['indexOf'](_0x351f00)[_0x28dde1(0x330)](0x0,0x3);}_0x2316fb[_0x28dde1(0x17c)](/<(?:ATTACH PICTURE|PICTURE) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)&&(this[_0x28dde1(0x210)][_0x28dde1(0x548)]=Number(RegExp['$1']));_0x2316fb[_0x28dde1(0x17c)](/<(?:ATTACH PICTURE|PICTURE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x28dde1(0x210)]['offsetX']=Number(RegExp['$1']));_0x2316fb[_0x28dde1(0x17c)](/<(?:ATTACH PICTURE|PICTURE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this['_attachPicture'][_0x28dde1(0xad)]=Number(RegExp['$1']));_0x2316fb['match'](/<(?:ATTACH PICTURE|PICTURE) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x28dde1(0x210)][_0x28dde1(0xd6)]=Number(RegExp['$1']),this['_attachPicture'][_0x28dde1(0xad)]=Number(RegExp['$2']));_0x2316fb[_0x28dde1(0x17c)](/<(?:ATTACH PICTURE|PICTURE) SCALE:[ ](\d+)([%％])>/i)&&(_0x28dde1(0x386)===_0x28dde1(0xee)?this[_0x28dde1(0x210)]['maxSize']=_0x5e439d(_0x4ecd5f['$1']):this[_0x28dde1(0x210)][_0x28dde1(0x7c)]=Number(RegExp['$1'])*0.01);_0x2316fb['match'](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x28dde1(0xde)]=!![]);_0x2316fb[_0x28dde1(0x17c)](/<CLICK TRIGGER>/i)&&(_0x28dde1(0x142)===_0x28dde1(0x125)?(_0x1c071a['x']=_0xeeb0f?_0x409b78[_0x28dde1(0x1e6)]:0x0,_0x41941d['y']=_0x175e55?-this[_0x28dde1(0x2db)]+_0x2ee251[_0x28dde1(0x500)]:0x0):this[_0x28dde1(0x1ba)]=!![]);_0x2316fb['match'](/<CUSTOM Z:[ ](.*?)>/i)&&(this[_0x28dde1(0x306)]=Number(RegExp['$1'])||0x0);const _0x139c87=_0x2316fb[_0x28dde1(0x17c)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x139c87){if('EvgFg'===_0x28dde1(0x2a0)){const _0x55c015=_0x4bec63[_0x28dde1(0x41c)][_0x28dde1(0x2a4)][_0x28dde1(0x258)],_0x2916f8=this[_0x28dde1(0x42f)][_0x28dde1(0x151)]();let _0x40bb1f=0x0;if([0x1,0x4,0x7]['includes'](_0x2916f8))_0x40bb1f=_0x55c015['TiltLeft'];if([0x3,0x6,0x9][_0x28dde1(0x310)](_0x2916f8))_0x40bb1f=_0x55c015[_0x28dde1(0x41f)];[0x2,0x8][_0x28dde1(0x310)](_0x2916f8)&&(_0x40bb1f=[-_0x55c015[_0x28dde1(0x538)],0x0,_0x55c015['TiltVert']][this[_0x28dde1(0x42f)][_0x28dde1(0x145)]()]);if(this[_0x28dde1(0x1cd)])_0x40bb1f*=-0x1;this[_0x28dde1(0x46b)]=_0x40bb1f;}else for(const _0x237c5d of _0x139c87){if(_0x237c5d[_0x28dde1(0x17c)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x1e1bae=String(RegExp['$1'])[_0x28dde1(0x394)]()[_0x28dde1(0x577)](),_0x4446c0=Number(RegExp['$2']);this[_0x28dde1(0x4e9)][_0x1e1bae]=_0x4446c0;}}}_0x2316fb[_0x28dde1(0x17c)](/<ICON:[ ](\d+)>/i)&&(this['_eventIcon'][_0x28dde1(0x503)]=Number(RegExp['$1']));if(_0x2316fb[_0x28dde1(0x17c)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)){if(_0x28dde1(0x18c)==='HcHmg')return this[_0x28dde1(0x575)][_0x28dde1(0x1e3)]||'none';else this['_eventIcon'][_0x28dde1(0x1e6)]=Number(RegExp['$1']);}_0x2316fb['match'](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x28dde1(0x5ba)][_0x28dde1(0x500)]=Number(RegExp['$1']));_0x2316fb[_0x28dde1(0x17c)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x28dde1(0x1e6)]=Number(RegExp['$1']),this['_eventIcon'][_0x28dde1(0x500)]=Number(RegExp['$2']));if(_0x2316fb[_0x28dde1(0x17c)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x430348=String(RegExp['$1'])[_0x28dde1(0x321)]()['trim'](),_0x1507ef=['NORMAL',_0x28dde1(0x558),_0x28dde1(0x240),'SCREEN'];this[_0x28dde1(0x5ba)][_0x28dde1(0x36b)]=_0x1507ef[_0x28dde1(0x362)](_0x430348)[_0x28dde1(0x330)](0x0,0x3);}if(_0x2316fb['match'](/<LABEL:[ ](.*?)>/i)){if(_0x28dde1(0xa0)===_0x28dde1(0xa0)){let _0x451fe5=String(RegExp['$1'])[_0x28dde1(0x577)]();this[_0x28dde1(0x471)]['text']=_0x451fe5,this[_0x28dde1(0x471)]['originalText']=_0x451fe5;}else{const _0x59f543=_0x28eff4;_0x52b88b[_0x28dde1(0x45f)](_0x59f543);const _0x58e809=_0x1f67d0[_0x28dde1(0x41c)][_0x28dde1(0x424)][_0x28dde1(0x341)](this);return _0x4989c5[_0x28dde1(0x4ae)](),_0x58e809;}}if(_0x2316fb[_0x28dde1(0x17c)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if('APOGf'!==_0x28dde1(0x262)){if(this[_0x28dde1(0x1ad)]===_0x459871)this[_0x28dde1(0x8b)]();if(!_0x2770f0)return null;const _0x5ba38e=_0x28dde1(0xa4)[_0x28dde1(0x307)](_0x59ac42['_mapId'],_0x5c1e19[_0x28dde1(0x418)]);return this[_0x28dde1(0x1ad)][_0x5ba38e];}else{let _0x111add=String(RegExp['$1'])[_0x28dde1(0x577)]();this[_0x28dde1(0x471)]['text']=_0x111add,this[_0x28dde1(0x471)][_0x28dde1(0x232)]=_0x111add;}}_0x2316fb[_0x28dde1(0x17c)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x28dde1(0x471)][_0x28dde1(0xd6)]=Number(RegExp['$1']));if(_0x2316fb[_0x28dde1(0x17c)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)){if(_0x28dde1(0x2fa)==='ZFTDZ')return _0x54968f['EventsMoveCore'][_0x28dde1(0x2a4)][_0x28dde1(0x53a)][_0x28dde1(0x384)];else this[_0x28dde1(0x471)]['offsetY']=Number(RegExp['$1']);}_0x2316fb[_0x28dde1(0x17c)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x28dde1(0x471)][_0x28dde1(0xd6)]=Number(RegExp['$1']),this['_labelWindow'][_0x28dde1(0xad)]=Number(RegExp['$2']));this[_0x28dde1(0x2e5)]();_0x2316fb[_0x28dde1(0x17c)](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x28dde1(0x471)]['visibleRange']=Number(RegExp['$1']));_0x2316fb['match'](/<MIRROR SPRITE>/i)&&('YEvBk'!==_0x28dde1(0x390)?this[_0x28dde1(0x169)]=!![]:(_0x4a6ca9['prototype'][_0x28dde1(0x12e)]['call'](this),this[_0x28dde1(0x1c7)](),this['updateScale'](),this['updatePosition'](),this[_0x28dde1(0x7e)]()));if(_0x2316fb['match'](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){if(_0x28dde1(0x13f)==='TFjdb')_0x4aee6d['updateMoveSynch']();else{const _0x30b5a5=JSON[_0x28dde1(0x8e)]('['+RegExp['$1'][_0x28dde1(0x17c)](/\d+/g)+']');this['_moveOnlyRegions']=this[_0x28dde1(0x322)][_0x28dde1(0x416)](_0x30b5a5),this[_0x28dde1(0x322)][_0x28dde1(0x2f9)](0x0);}}if(_0x2316fb['match'](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x17f43b=String(RegExp['$1']);if(_0x17f43b['match'](/PLAYER/i))this[_0x28dde1(0x3a7)][_0x28dde1(0xe9)]=0x0;else _0x17f43b[_0x28dde1(0x17c)](/EVENT[ ](\d+)/i)&&(this[_0x28dde1(0x3a7)][_0x28dde1(0xe9)]=Number(RegExp['$1']));}_0x2316fb[_0x28dde1(0x17c)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x28dde1(0x3a7)]['type']=String(RegExp['$1'])['toLowerCase']()['trim']());_0x2316fb['match'](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x28dde1(0x3a7)]['delay']=Number(RegExp['$1']));if(_0x2316fb[_0x28dde1(0x17c)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)){if('Ctorx'!==_0x28dde1(0x83)){if(_0x5ee3ab)this[_0x28dde1(0x59a)](_0x55e4b3['x'],_0x13c543['y']);}else this[_0x28dde1(0x3a7)][_0x28dde1(0x338)]=Number(RegExp['$1']);}if(_0x2316fb['match'](/<TRUE RANDOM MOVE>/i))this[_0x28dde1(0x1fc)]=0x0;else _0x2316fb['match'](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this['_randomMoveWeight']=Number(RegExp['$1'])||0x0);if(_0x2316fb['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)){if('kFKfs'!==_0x28dde1(0x1f0)){if(this[_0x28dde1(0x315)]!==0x3)return;if(this[_0x28dde1(0x3b6)])return;if(!this[_0x28dde1(0x349)](![]))return;if(!this[_0x28dde1(0x42a)](![]))return;_0x4f86b2[_0x28dde1(0x41c)]['Game_Event_checkEventTriggerAuto'][_0x28dde1(0x341)](this);}else this[_0x28dde1(0x4ff)]=!![];}_0x2316fb[_0x28dde1(0x17c)](/<HIDE SHADOW>/i)&&(this[_0x28dde1(0x33a)][_0x28dde1(0x38c)]=![]);_0x2316fb[_0x28dde1(0x17c)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x28dde1(0x33a)][_0x28dde1(0x326)]=String(RegExp['$1']));_0x2316fb[_0x28dde1(0x17c)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x28dde1(0x1cf)!==_0x28dde1(0x2f5)?this[_0x28dde1(0x1a8)]=Number(RegExp['$1']):this['_eventIcon'][_0x28dde1(0x500)]=_0x1eaf45(_0xbb3860['$1']));_0x2316fb[_0x28dde1(0x17c)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x28dde1(0x48f)]=Number(RegExp['$1']));if(_0x2316fb[_0x28dde1(0x17c)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x28dde1(0xa5)!==_0x28dde1(0x452))this[_0x28dde1(0x1a8)]=Number(RegExp['$1']),this[_0x28dde1(0x48f)]=Number(RegExp['$2']);else{if(this[_0x28dde1(0x3c0)]===_0x56ec4b)this[_0x28dde1(0x8b)]();const _0x8c5ead='Map%1-Event%2'[_0x28dde1(0x307)](_0x3d3b38,_0xba02d4);delete this['_PreservedEventMorphData'][_0x8c5ead];}}_0x2316fb['match'](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x28dde1(0x1d3)]=String(RegExp['$1'])[_0x28dde1(0x321)]()[_0x28dde1(0x577)]());},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x2e5)]=function(){const _0x17af79=_0x39f07d;$gameTemp[_0x17af79(0x45f)](this),this[_0x17af79(0x471)][_0x17af79(0x2ee)]=this[_0x17af79(0x471)][_0x17af79(0x232)];for(;;){if(_0x17af79(0x7f)!==_0x17af79(0x16c)){if(this[_0x17af79(0x471)][_0x17af79(0x2ee)]['match'](/\\V\[(\d+)\]/gi))this['_labelWindow']['text']=this[_0x17af79(0x471)][_0x17af79(0x232)]['replace'](/\\V\[(\d+)\]/gi,(_0x134255,_0x33d2b3)=>$gameVariables['value'](parseInt(_0x33d2b3)));else break;}else this['contentsOpacity']+=this['opacitySpeed']();}$gameTemp[_0x17af79(0x4ae)]();},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x559)]=function(){const _0x4a18cf=_0x39f07d;this[_0x4a18cf(0x4bf)]();},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x2ae)]=function(){const _0x700920=_0x39f07d;if(this['_alwaysUpdateMove'])return!![];return Game_Character[_0x700920(0x287)][_0x700920(0x2ae)][_0x700920(0x341)](this);},VisuMZ[_0x39f07d(0x41c)]['Game_Event_updateSelfMovement']=Game_Event[_0x39f07d(0x287)][_0x39f07d(0x4a9)],Game_Event['prototype'][_0x39f07d(0x4a9)]=function(){const _0x30fe1f=_0x39f07d;if(this[_0x30fe1f(0x47f)]())return;VisuMZ['EventsMoveCore'][_0x30fe1f(0x568)][_0x30fe1f(0x341)](this),this[_0x30fe1f(0x56f)]()&&VisuMZ[_0x30fe1f(0x4e6)](this[_0x30fe1f(0x418)]);},Game_Event['prototype'][_0x39f07d(0x47f)]=function(){const _0x1d2de9=_0x39f07d,_0x420d38=VisuMZ[_0x1d2de9(0x41c)][_0x1d2de9(0x2a4)][_0x1d2de9(0x258)];if($gameMap[_0x1d2de9(0x16e)]()&&_0x420d38[_0x1d2de9(0x462)])return!![];if($gameMessage[_0x1d2de9(0x312)]()&&_0x420d38['StopAutoMoveMessages'])return!![];if(!$gameSystem[_0x1d2de9(0x42d)]())return!![];if(this[_0x1d2de9(0x18d)]()>=0x0)return!![];if(!SceneManager[_0x1d2de9(0x1bd)][_0x1d2de9(0x519)])return!![];return![];},Game_Event[_0x39f07d(0x287)]['updateShadowChanges']=function(){const _0x151b97=_0x39f07d,_0x4c47da=SceneManager[_0x151b97(0x1bd)][_0x151b97(0x359)];if(_0x4c47da){if(_0x151b97(0x482)===_0x151b97(0x567))return this[_0x151b97(0x140)]()[_0x151b97(0x2a6)]()['match'](/\[VS8\]/i);else{const _0x223620=_0x4c47da[_0x151b97(0x93)](this);if(_0x223620&&_0x223620[_0x151b97(0x3c9)]&&_0x223620[_0x151b97(0x3c9)]['_filename']!==this[_0x151b97(0x1d4)]()){if('bTDdX'!==_0x151b97(0x88)){if(this[_0x151b97(0x3f5)]()[_0x151b97(0x12b)]['match'](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}else _0x223620[_0x151b97(0x3c9)][_0x151b97(0x44f)]=this['shadowFilename'](),_0x223620[_0x151b97(0x3c9)][_0x151b97(0x3d7)]=ImageManager[_0x151b97(0x174)](_0x223620[_0x151b97(0x3c9)][_0x151b97(0x44f)]);}}}},Game_Event[_0x39f07d(0x287)]['shadowFilename']=function(){const _0x9563ca=_0x39f07d;return this[_0x9563ca(0x33a)][_0x9563ca(0x326)];},Game_Event['prototype']['isShadowVisible']=function(){const _0x5d0c23=_0x39f07d;if(!this[_0x5d0c23(0x33a)][_0x5d0c23(0x38c)])return![];return Game_CharacterBase[_0x5d0c23(0x287)][_0x5d0c23(0x41a)]['call'](this);},Game_Event[_0x39f07d(0x287)]['labelWindowText']=function(){const _0x456eac=_0x39f07d;return this[_0x456eac(0x471)][_0x456eac(0x2ee)];},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x412)]=function(){const _0x3e580c=_0x39f07d;return this[_0x3e580c(0x471)][_0x3e580c(0x17f)];},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x473)]=function(_0x47f121,_0x326a87,_0x561c7f){const _0x236027=_0x39f07d;if(this[_0x236027(0xda)]())return this[_0x236027(0x18b)](_0x47f121,_0x326a87,_0x561c7f);if($gameMap['isRegionAllowPass'](_0x47f121,_0x326a87,_0x561c7f,'event'))return!![];if($gameMap['isRegionForbidPass'](_0x47f121,_0x326a87,_0x561c7f,'event'))return![];return Game_Character['prototype'][_0x236027(0x473)][_0x236027(0x341)](this,_0x47f121,_0x326a87,_0x561c7f);},Game_Event['prototype'][_0x39f07d(0xda)]=function(){const _0x236303=_0x39f07d;if(this[_0x236303(0x322)]===undefined)this[_0x236303(0x159)]();return this['_moveOnlyRegions']['length']>0x0;},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x18b)]=function(_0x345e18,_0x1558ce,_0x28cd99){const _0x570a63=_0x39f07d,_0x2c2ad8=$gameMap['roundXWithDirection'](_0x345e18,_0x28cd99),_0xed9593=$gameMap[_0x570a63(0xd8)](_0x1558ce,_0x28cd99),_0x29269b=$gameMap[_0x570a63(0x3b4)](_0x2c2ad8,_0xed9593);return this[_0x570a63(0x322)][_0x570a63(0x310)](_0x29269b);},VisuMZ[_0x39f07d(0x41c)]['Game_Event_findProperPageIndex']=Game_Event[_0x39f07d(0x287)]['findProperPageIndex'],Game_Event[_0x39f07d(0x287)][_0x39f07d(0x364)]=function(){const _0x100990=_0x39f07d;if(this[_0x100990(0x3f5)]()&&!$gameTemp['isPlaytest']()){if(this[_0x100990(0x3f5)]()[_0x100990(0x12b)][_0x100990(0x17c)](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}return this[_0x100990(0xaf)]=![],this[_0x100990(0x3de)]=![],this[_0x100990(0x3f5)]()?VisuMZ[_0x100990(0x41c)][_0x100990(0x2d4)][_0x100990(0x341)](this):-0x1;},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x458)]=Game_Event[_0x39f07d(0x287)][_0x39f07d(0x244)],Game_Event[_0x39f07d(0x287)][_0x39f07d(0x244)]=function(_0x463675){const _0x116719=_0x39f07d;this[_0x116719(0x433)](_0x463675),$gameTemp['registerSelfTarget'](this);const _0x1e9461=VisuMZ[_0x116719(0x41c)][_0x116719(0x458)][_0x116719(0x341)](this,_0x463675);return $gameTemp[_0x116719(0x4ae)](),_0x1e9461;},Game_Event['prototype'][_0x39f07d(0x554)]=function(){const _0x5b0c73=_0x39f07d;return this[_0x5b0c73(0xaf)];},Game_Event['prototype'][_0x39f07d(0x433)]=function(_0x1e9a97){const _0x16ae8d=_0x39f07d,_0x1f94cb=_0x1e9a97[_0x16ae8d(0x3a3)];if(_0x1f94cb[_0x16ae8d(0x350)]&&DataManager[_0x16ae8d(0x314)](_0x1f94cb['switch1Id']))this[_0x16ae8d(0xaf)]=!![];else{if(_0x1f94cb[_0x16ae8d(0xc6)]&&DataManager[_0x16ae8d(0x314)](_0x1f94cb['switch2Id'])){if(_0x16ae8d(0x316)===_0x16ae8d(0x316))this[_0x16ae8d(0xaf)]=!![];else{_0x1673ef[_0x16ae8d(0xe6)][_0x5206d4][_0x16ae8d(0x17c)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x2196a9=_0x16ae8d(0x47a)[_0x16ae8d(0x307)](_0x49493b(_0x3bf22e['$1']));_0x219490[_0x16ae8d(0x254)][_0x3a7001]=new _0x335d16('switchId',_0x2196a9);}}else _0x1f94cb[_0x16ae8d(0x160)]&&DataManager[_0x16ae8d(0x1bc)](_0x1f94cb[_0x16ae8d(0x465)])&&(this[_0x16ae8d(0xaf)]=!![]);}},Game_Event['prototype'][_0x39f07d(0x3e3)]=function(){if(this['_erased'])return![];return this['_clickTrigger'];},Game_Event[_0x39f07d(0x287)]['onClickTrigger']=function(){const _0x28c6ab=_0x39f07d;$gameTemp[_0x28c6ab(0x448)](),this[_0x28c6ab(0xfa)]();},Game_Event[_0x39f07d(0x287)]['pos']=function(_0x20499e,_0x2aad0a){const _0x36b756=_0x39f07d;if(this[_0x36b756(0x4e9)])return this[_0x36b756(0x590)](_0x20499e,_0x2aad0a);else{if(_0x36b756(0x486)!=='Hjxzf')_0x1c7fdb['ConvertParams'](_0x33d60e,_0x298735),_0x30f2c9['deleteIconsOnEventsData'](_0x4278f5);else return Game_Character[_0x36b756(0x287)]['pos'][_0x36b756(0x341)](this,_0x20499e,_0x2aad0a);}},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x590)]=function(_0x17a932,_0x229e05){const _0x385f6e=_0x39f07d;var _0x373d69=this['x']-this['_addedHitbox'][_0x385f6e(0x164)],_0x4710ae=this['x']+this[_0x385f6e(0x4e9)][_0x385f6e(0x11e)],_0x37360e=this['y']-this[_0x385f6e(0x4e9)]['up'],_0x43be0d=this['y']+this[_0x385f6e(0x4e9)]['down'];return _0x373d69<=_0x17a932&&_0x17a932<=_0x4710ae&&_0x37360e<=_0x229e05&&_0x229e05<=_0x43be0d;},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x2c9)]=function(_0x3776e7,_0x92e31f,_0x50f3a1){const _0x1e5e0c=_0x39f07d;for(let _0x15dea6=-this[_0x1e5e0c(0x4e9)][_0x1e5e0c(0x164)];_0x15dea6<=this['_addedHitbox'][_0x1e5e0c(0x11e)];_0x15dea6++){for(let _0x544de2=-this[_0x1e5e0c(0x4e9)]['up'];_0x544de2<=this['_addedHitbox'][_0x1e5e0c(0xbf)];_0x544de2++){if(!Game_Character[_0x1e5e0c(0x287)][_0x1e5e0c(0x2c9)][_0x1e5e0c(0x341)](this,_0x3776e7+_0x15dea6,_0x92e31f+_0x544de2,_0x50f3a1))return![];}}return!![];},Game_Event[_0x39f07d(0x287)][_0x39f07d(0xfe)]=function(_0x5bac0d,_0x336d71){const _0x17a0b3=_0x39f07d;if(Imported['VisuMZ_0_CoreEngine']&&this[_0x17a0b3(0x4d6)]())return this[_0x17a0b3(0x171)](_0x5bac0d,_0x336d71);else{if(_0x17a0b3(0xa1)!=='iPbTy'){if(!_0x11d4a2[_0x17a0b3(0x497)]&&this[_0x17a0b3(0x54c)]())return![];if(this[_0x17a0b3(0x41e)])return!![];return _0x415cd7['EventsMoveCore'][_0x17a0b3(0x261)][_0x17a0b3(0x341)](this);}else{const _0x30ee4c=$gameMap[_0x17a0b3(0x2ad)](_0x5bac0d,_0x336d71)[_0x17a0b3(0x48a)](_0x2e99c1=>_0x2e99c1!==this);return _0x30ee4c['length']>0x0;}}},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x171)]=function(_0x1f8152,_0x35dddd){const _0x15b39b=_0x39f07d;if(!this['isNormalPriority']())return![];else{const _0x2de714=$gameMap[_0x15b39b(0x2ad)](_0x1f8152,_0x35dddd)[_0x15b39b(0x48a)](_0x8a90d1=>_0x8a90d1!==this&&_0x8a90d1['isNormalPriority']());return _0x2de714['length']>0x0;}},Game_Event['prototype'][_0x39f07d(0x459)]=function(){const _0x322ea0=_0x39f07d;return this[_0x322ea0(0x575)][_0x322ea0(0x1e3)]||_0x322ea0(0x515);},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x228)]=function(){const _0x38cbc0=_0x39f07d;return this[_0x38cbc0(0x575)][_0x38cbc0(0x555)]||0x0;},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x10e)]=function(){const _0x37fccd=_0x39f07d;return this[_0x37fccd(0x575)]['regionList']||[];},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x3d8)]=function(){const _0x300d65=_0x39f07d;Game_Character[_0x300d65(0x287)][_0x300d65(0x3d8)][_0x300d65(0x341)](this);if([_0x300d65(0x515),_0x300d65(0x22b)][_0x300d65(0x310)](this[_0x300d65(0x459)]()))return;$gamePlayer[_0x300d65(0x2df)]([0x2]);},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x158)]=Game_Event[_0x39f07d(0x287)][_0x39f07d(0x434)],Game_Event[_0x39f07d(0x287)]['checkEventTriggerAuto']=function(){const _0x89ccf2=_0x39f07d;if(this[_0x89ccf2(0x315)]!==0x3)return;if(this[_0x89ccf2(0x3b6)])return;if(!this['checkRegionEventTrigger'](![]))return;if(!this[_0x89ccf2(0x42a)](![]))return;VisuMZ[_0x89ccf2(0x41c)][_0x89ccf2(0x158)][_0x89ccf2(0x341)](this);},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x131)]=Game_Event[_0x39f07d(0x287)]['updateParallel'],Game_Event[_0x39f07d(0x287)]['updateParallel']=function(){const _0x482ad4=_0x39f07d;if(!this['_interpreter'])return;if(!this[_0x482ad4(0x349)](!![]))return;if(!this['checkActivationProximity'](!![]))return;VisuMZ[_0x482ad4(0x41c)][_0x482ad4(0x131)][_0x482ad4(0x341)](this);},Game_Event['prototype']['checkRegionEventTrigger']=function(_0x169c30){const _0x37ca97=_0x39f07d;if(!_0x169c30&&$gameMap['isEventRunning']())return![];if(!_0x169c30&&$gameMap[_0x37ca97(0xe5)]())return![];if(this['activationRegionList']()<=0x0)return!![];return $gamePlayer[_0x37ca97(0x5cf)](this);},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x42a)]=function(_0x433d44){const _0x319477=_0x39f07d;if(!_0x433d44&&$gameMap[_0x319477(0x16e)]())return![];if(!_0x433d44&&$gameMap['isAnyEventStarting']())return![];if([_0x319477(0x515),'region'][_0x319477(0x310)](this[_0x319477(0x459)]()))return!![];return $gamePlayer[_0x319477(0x2e2)](this);},VisuMZ[_0x39f07d(0x4e6)]=function(_0x111e15){const _0xdbb569=_0x39f07d;for(const _0x499d6b of $gameMap[_0xdbb569(0x3c4)]()){if(_0xdbb569(0x502)!==_0xdbb569(0x474)){if(!_0x499d6b)continue;if(_0x499d6b['moveSynchTarget']()===_0x111e15){if(_0xdbb569(0x4b5)==='CmPOZ'){const _0x59d2ba=_0xf41aa4[_0xdbb569(0x135)]();delete this[_0xdbb569(0x2b1)][_0x59d2ba];}else _0x499d6b[_0xdbb569(0x20e)]();}}else{_0x34c41e[_0xdbb569(0x130)](_0x376ed9,_0x249532);const _0x19bd28=_0x53e562[_0xdbb569(0x1b0)]||0x0;_0x321dff[_0xdbb569(0x528)](_0x19bd28);}}},VisuMZ[_0x39f07d(0x14a)]=function(_0x486d7f){const _0x1581e6=_0x39f07d;if(_0x486d7f===0x0)return $gamePlayer;return $gameMap[_0x1581e6(0x3f5)](_0x486d7f);},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x18d)]=function(){return this['_moveSynch']['target'];},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x45a)]=function(){return this['_moveSynch']['type'];},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x334)]=function(){const _0x34d876=_0x39f07d;if(this[_0x34d876(0x18d)]()>=0x0){if(_0x34d876(0x5d1)==='nqDqp'){if(_0xbb9b5e['match'](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x39654d=_0x28f947(_0x7dec20['$1'])['toLowerCase']()['trim'](),_0x56ba26=_0x5460e6(_0x482b86['$2']);this['_addedHitbox'][_0x39654d]=_0x56ba26;}}else{const _0x49bb75=VisuMZ[_0x34d876(0x14a)](this[_0x34d876(0x18d)]());if(_0x49bb75)return _0x49bb75[_0x34d876(0x334)]();}}return Game_Character[_0x34d876(0x287)][_0x34d876(0x334)][_0x34d876(0x341)](this);},Game_Event['prototype'][_0x39f07d(0x20e)]=function(){const _0x14522d=_0x39f07d;this[_0x14522d(0x3a7)][_0x14522d(0x415)]=this[_0x14522d(0x3a7)]['timer']||0x0,this[_0x14522d(0x3a7)][_0x14522d(0x415)]--;if(this['_moveSynch'][_0x14522d(0x415)]>0x0)return;this[_0x14522d(0x3a7)][_0x14522d(0x415)]=this[_0x14522d(0x3a7)][_0x14522d(0xd9)],this[_0x14522d(0x3ee)]();},Game_Event['prototype'][_0x39f07d(0x9f)]=function(_0x3081c5){const _0xfc4534=_0x39f07d;if(this['moveSynchTarget']()>=0x0){const _0x480b3a=VisuMZ[_0xfc4534(0x14a)](this[_0xfc4534(0x18d)]());if(_0x480b3a){const _0x85c237=$gameMap[_0xfc4534(0x555)](this[_0xfc4534(0x2c8)],this[_0xfc4534(0x360)],_0x480b3a[_0xfc4534(0x2c8)],_0x480b3a[_0xfc4534(0x360)])-0x1,_0x41fc66=Math[_0xfc4534(0x18f)]($gameMap[_0xfc4534(0x493)](),$gameMap[_0xfc4534(0x276)]()),_0x56fa0e=this[_0xfc4534(0x3a7)][_0xfc4534(0x338)]||0x0;_0x3081c5-=Math[_0xfc4534(0x2b0)](0x0,_0x85c237)*_0x41fc66*_0x56fa0e;}}return _0x3081c5;},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x3ee)]=function(){const _0x1fc64b=_0x39f07d;switch(this[_0x1fc64b(0x45a)]()){case _0x1fc64b(0x2f8):this[_0x1fc64b(0x395)]();break;case _0x1fc64b(0x530):this[_0x1fc64b(0x11b)]();break;case _0x1fc64b(0x5ce):this['processMoveSynchAway']();break;case'custom':this[_0x1fc64b(0xd7)]();break;case _0x1fc64b(0x5a9):case _0x1fc64b(0x304):this[_0x1fc64b(0x23a)]();break;case _0x1fc64b(0x478):case _0x1fc64b(0x506):this[_0x1fc64b(0x532)]();break;case _0x1fc64b(0x2a3):case _0x1fc64b(0x28b):case'mirror\x20horz':case _0x1fc64b(0x31c):this[_0x1fc64b(0x3ef)]();break;case _0x1fc64b(0x454):case _0x1fc64b(0x42e):case'mirror\x20vert':case'vert\x20mirror':this[_0x1fc64b(0x358)]();break;default:this[_0x1fc64b(0x395)]();break;}this[_0x1fc64b(0x12e)]();},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x395)]=function(){const _0xe6c020=_0x39f07d,_0x14d59b=[0x2,0x4,0x6,0x8];$gameMap[_0xe6c020(0x457)]()&&_0x14d59b[_0xe6c020(0xa6)](0x1,0x3,0x7,0x9);const _0x2d25cd=[];for(const _0x8a08cb of _0x14d59b){if('NINaj'!==_0xe6c020(0x517)){this[_0xe6c020(0x21e)]=!![];return;}else{if(this[_0xe6c020(0x2c9)](this['x'],this['y'],_0x8a08cb))_0x2d25cd['push'](_0x8a08cb);}}if(_0x2d25cd[_0xe6c020(0x5be)]>0x0){if(_0xe6c020(0x43e)!==_0xe6c020(0x1dc)){const _0x22bed3=_0x2d25cd[Math[_0xe6c020(0x40b)](_0x2d25cd[_0xe6c020(0x5be)])];this[_0xe6c020(0x356)](_0x22bed3);}else this[_0xe6c020(0x5ba)][_0xe6c020(0x1e6)]=_0x5528b1(_0x56fcaf['$1']),this['_eventIcon'][_0xe6c020(0x500)]=_0x197531(_0x5ddb4e['$2']);}},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x11b)]=function(){const _0x3ca774=_0x39f07d,_0x5a34d9=VisuMZ['GetMoveSynchTarget'](this[_0x3ca774(0x18d)]());this[_0x3ca774(0x1b2)](_0x5a34d9);},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x3b0)]=function(){const _0x209f98=_0x39f07d,_0x3d75a8=VisuMZ[_0x209f98(0x14a)](this['moveSynchTarget']());this[_0x209f98(0x3ac)](_0x3d75a8);},Game_Event[_0x39f07d(0x287)][_0x39f07d(0xd7)]=function(){const _0xc37ede=_0x39f07d;this[_0xc37ede(0x5d2)]();},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x23a)]=function(){const _0x4ff3b8=_0x39f07d,_0x492046=VisuMZ[_0x4ff3b8(0x14a)](this[_0x4ff3b8(0x18d)]());this[_0x4ff3b8(0x356)](_0x492046[_0x4ff3b8(0x2a9)]());},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x532)]=function(){const _0x4fbcf6=_0x39f07d,_0x5f0fbc=VisuMZ['GetMoveSynchTarget'](this[_0x4fbcf6(0x18d)]());this[_0x4fbcf6(0x356)](this[_0x4fbcf6(0x4c4)](_0x5f0fbc[_0x4fbcf6(0x2a9)]()));},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x3ef)]=function(){const _0x2d6cef=_0x39f07d,_0x2db65e=VisuMZ[_0x2d6cef(0x14a)](this[_0x2d6cef(0x18d)]()),_0x25a901=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x2db65e[_0x2d6cef(0x2a9)]()];this[_0x2d6cef(0x356)](_0x25a901);},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x358)]=function(){const _0x35e512=_0x39f07d,_0x3e12a4=VisuMZ[_0x35e512(0x14a)](this[_0x35e512(0x18d)]()),_0x2b2a5e=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x3e12a4[_0x35e512(0x2a9)]()];this[_0x35e512(0x356)](_0x2b2a5e);},Game_Event[_0x39f07d(0x287)]['restoreSavedEventPosition']=function(){const _0x57513e=_0x39f07d,_0x5f5619=$gameSystem[_0x57513e(0x14f)](this);if(!_0x5f5619)return;this[_0x57513e(0x24d)](_0x5f5619['x'],_0x5f5619['y']),this[_0x57513e(0x4fe)](),this[_0x57513e(0xa7)](_0x5f5619['direction']),this[_0x57513e(0x5c5)]===_0x5f5619[_0x57513e(0x157)]&&(this[_0x57513e(0x5c2)]=_0x5f5619[_0x57513e(0x3cf)]);},VisuMZ['EventsMoveCore'][_0x39f07d(0x99)]=Game_Event[_0x39f07d(0x287)]['update'],Game_Event[_0x39f07d(0x287)]['update']=function(){const _0xffabe8=_0x39f07d;VisuMZ[_0xffabe8(0x41c)][_0xffabe8(0x99)][_0xffabe8(0x341)](this),this[_0xffabe8(0x124)]();},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x4ed)]=function(){const _0x3e7d7f=_0x39f07d;Game_Character[_0x3e7d7f(0x287)][_0x3e7d7f(0x4ed)]['call'](this),this[_0x3e7d7f(0x591)]();},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x2d5)]=function(){const _0x3b40c3=_0x39f07d;if($gameMap[_0x3b40c3(0x585)]())return!![];return this[_0x3b40c3(0x4ff)];},Game_Event['prototype']['autosaveEventLocation']=function(){const _0x4b4eed=_0x39f07d;if(!this['isSaveEventLocation']())return;this[_0x4b4eed(0x5d0)]();},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x5d0)]=function(){const _0x55085a=_0x39f07d;this[_0x55085a(0x28c)]=!![];},Game_Event[_0x39f07d(0x287)]['updateSaveEventLocation']=function(){const _0x329e8c=_0x39f07d;this['_requestSaveEventLocation']&&this[_0x329e8c(0x24a)]();},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x24a)]=function(){const _0x2f8ead=_0x39f07d;this[_0x2f8ead(0x28c)]=![],$gameSystem[_0x2f8ead(0x5d0)](this);},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x423)]=function(){const _0x36607c=_0x39f07d;$gameSystem[_0x36607c(0x2f6)](this);},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x4c5)]=function(){const _0xd25ce4=_0x39f07d;return $gameSystem['getEventIconData'](this)?Game_Character[_0xd25ce4(0x287)][_0xd25ce4(0x4c5)]['call'](this):{'iconIndex':0x0,'bufferX':settings['Icon']['BufferX'],'bufferY':settings[_0xd25ce4(0x3b2)]['BufferY'],'blendMode':settings[_0xd25ce4(0x3b2)]['BlendMode']};},Game_Event[_0x39f07d(0x287)][_0x39f07d(0xb3)]=function(){const _0x16bb5f=_0x39f07d;return this[_0x16bb5f(0x3de)];},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x22d)]=Game_Event[_0x39f07d(0x287)][_0x39f07d(0x244)],Game_Event[_0x39f07d(0x287)][_0x39f07d(0x244)]=function(_0xba5f69){const _0x7a90d2=_0x39f07d,_0x1532b0=VisuMZ[_0x7a90d2(0x41c)][_0x7a90d2(0x22d)][_0x7a90d2(0x341)](this,_0xba5f69);if(!_0x1532b0)return![];return this[_0x7a90d2(0x173)](_0xba5f69);},Game_Event['prototype'][_0x39f07d(0x173)]=function(_0x36d7c3){const _0x29d60d=_0x39f07d;VisuMZ['EventsMoveCore'][_0x29d60d(0x504)]['loadCPC'](_0x36d7c3),this[_0x29d60d(0x3de)]=_0x36d7c3[_0x29d60d(0x2bc)][_0x29d60d(0x5be)]>0x0;if(_0x36d7c3['CPC']===undefined){if(_0x29d60d(0x17b)===_0x29d60d(0x4e4))return!![];else VisuMZ[_0x29d60d(0x41c)][_0x29d60d(0x504)]['loadCPC'](_0x36d7c3);}if(_0x36d7c3[_0x29d60d(0x2bc)]['length']>0x0)return $gameMap['event'](this[_0x29d60d(0x418)])&&VisuMZ['EventsMoveCore']['CustomPageConditions']['metCPC'](_0x36d7c3[_0x29d60d(0x2bc)],this[_0x29d60d(0x418)]);return!![];},VisuMZ['EventsMoveCore'][_0x39f07d(0x3e8)]=Game_Troop[_0x39f07d(0x287)]['meetsConditions'],Game_Troop[_0x39f07d(0x287)][_0x39f07d(0x244)]=function(_0x289e63){const _0x4ea9cb=_0x39f07d;var _0x8affac=VisuMZ['EventsMoveCore'][_0x4ea9cb(0x3e8)][_0x4ea9cb(0x341)](this,_0x289e63);return _0x8affac&&this[_0x4ea9cb(0x1ec)](_0x289e63);},Game_Troop[_0x39f07d(0x287)]['CPCsMet']=function(_0xb9369e){const _0x17d9e4=_0x39f07d;if(_0xb9369e['CPC']===undefined){if(_0x17d9e4(0x3d3)===_0x17d9e4(0x27b)){_0x32a34e[_0x17d9e4(0x130)](_0x3d4ccb,_0x559a19),_0x57a9b6[_0x17d9e4(0xc4)](0x0),_0x196750['setStopFollowerChasing'](![]);for(const _0x4366cb of _0x3a36e3[_0x17d9e4(0x1df)]()[_0x17d9e4(0x2b1)]){if(_0x4366cb)_0x4366cb[_0x17d9e4(0x270)](![]);}}else VisuMZ[_0x17d9e4(0x41c)]['CustomPageConditions'][_0x17d9e4(0x21a)](_0xb9369e);}if(_0xb9369e['CPC'][_0x17d9e4(0x5be)]>0x0){if(_0x17d9e4(0x463)!==_0x17d9e4(0x463))this[_0x17d9e4(0x91)]=![],this[_0x17d9e4(0x561)]=_0x4e3acb[_0x17d9e4(0x2f7)](),this[_0x17d9e4(0x50e)]=this[_0x17d9e4(0x2cd)][_0x17d9e4(0x1e9)](),this[_0x17d9e4(0xf4)]=this[_0x17d9e4(0x2cd)][_0x17d9e4(0x26e)](),this[_0x17d9e4(0x8a)]=this['_event'][_0x17d9e4(0x471)][_0x17d9e4(0xd6)],this[_0x17d9e4(0xf7)]=this['_event'][_0x17d9e4(0x471)][_0x17d9e4(0xad)],this[_0x17d9e4(0x5c9)]=this[_0x17d9e4(0x2cd)][_0x17d9e4(0x5c5)],this[_0x17d9e4(0x14c)]=this[_0x17d9e4(0x21f)](),this[_0x17d9e4(0x301)]=_0x2c0a9c[_0x17d9e4(0x19c)](),this[_0x17d9e4(0x332)]=_0x1d2393['x'],this['_visiblePlayerY']=_0x156a98['y'],this[_0x17d9e4(0x150)]=this['_event']['x'],this[_0x17d9e4(0x297)]=this[_0x17d9e4(0x2cd)]['y'];else return VisuMZ[_0x17d9e4(0x41c)][_0x17d9e4(0x504)][_0x17d9e4(0x513)](_0xb9369e[_0x17d9e4(0x2bc)],0x0);}return!![];},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0xae)]=Game_Event['prototype'][_0x39f07d(0x94)],Game_Event[_0x39f07d(0x287)][_0x39f07d(0x94)]=function(_0x270753,_0x63030d){const _0x31af75=_0x39f07d;VisuMZ[_0x31af75(0x41c)][_0x31af75(0xae)][_0x31af75(0x341)](this,_0x270753,_0x63030d),this[_0x31af75(0x2be)]=_0x270753,this[_0x31af75(0x2f1)]=_0x63030d,this[_0x31af75(0x591)]();},VisuMZ[_0x39f07d(0x41c)]['Game_Event_moveTypeRandom']=Game_Event[_0x39f07d(0x287)]['moveTypeRandom'],Game_Event['prototype'][_0x39f07d(0x339)]=function(){const _0x3710b5=_0x39f07d,_0x64f6e=$gameMap[_0x3710b5(0x555)](this['x'],this['y'],this[_0x3710b5(0x2be)],this[_0x3710b5(0x2f1)]),_0x24eaad=_0x64f6e*(this[_0x3710b5(0x1fc)]||0x0);if(Math[_0x3710b5(0x2f8)]()>=_0x24eaad){if('Uammt'==='Uammt')VisuMZ[_0x3710b5(0x41c)][_0x3710b5(0x2da)][_0x3710b5(0x341)](this);else return _0x2d604b['EventForbid']['includes'](_0x22afd2)||_0x383b53[_0x3710b5(0x272)][_0x3710b5(0x310)](_0x300777);}else _0x3710b5(0x9c)!==_0x3710b5(0x9c)?_0x17a598==='left'?this[_0x3710b5(0x285)]():this[_0x3710b5(0x55d)]():this['moveBackToRandomHome']();},Game_Event[_0x39f07d(0x287)][_0x39f07d(0x18a)]=function(){const _0x4cb7cb=_0x39f07d,_0x5c7f8d=this[_0x4cb7cb(0x30b)](this[_0x4cb7cb(0x2be)]),_0x58b90a=this[_0x4cb7cb(0x4f9)](this[_0x4cb7cb(0x2f1)]);if(Math[_0x4cb7cb(0x3cd)](_0x5c7f8d)>Math['abs'](_0x58b90a)){if(_0x4cb7cb(0x154)===_0x4cb7cb(0x3c5))this['_interpreter'][_0x4cb7cb(0x54d)](_0x20814e);else{this[_0x4cb7cb(0x97)](_0x5c7f8d>0x0?0x4:0x6);if(!this[_0x4cb7cb(0x476)]()&&_0x58b90a!==0x0){if(_0x4cb7cb(0x10d)!==_0x4cb7cb(0x10d)){if(_0x282785[_0x4cb7cb(0x144)]())_0x4a4490[_0x4cb7cb(0x1b1)](_0x144c80);}else this['moveStraight'](_0x58b90a>0x0?0x8:0x2);}}}else{if(_0x58b90a!==0x0){this[_0x4cb7cb(0x97)](_0x58b90a>0x0?0x8:0x2);if(!this[_0x4cb7cb(0x476)]()&&_0x5c7f8d!==0x0){if(_0x4cb7cb(0x156)===_0x4cb7cb(0x4e3)){if(_0x4c11c8[_0x4cb7cb(0x4f6)](_0x1c986c))this[_0x4cb7cb(0x40d)](_0x5f031b,_0x3572bc);else _0x583b36['isMapVariable'](_0x185e4e)?this[_0x4cb7cb(0x5a8)](_0x375aa5,_0x46add7):_0x49090d[_0x4cb7cb(0x41c)][_0x4cb7cb(0x133)][_0x4cb7cb(0x341)](this,_0x40dab3,_0x11260c);}else this['moveStraight'](_0x5c7f8d>0x0?0x4:0x6);}}}},Game_CharacterBase['prototype'][_0x39f07d(0x23b)]=function(){this['_attachPicture']={'filename':'','blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x2a5)]=function(){const _0x17d1a8=_0x39f07d;if(this[_0x17d1a8(0x210)]===undefined)this[_0x17d1a8(0x23b)]();return this[_0x17d1a8(0x210)];},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x2ce)]=function(){const _0x47db68=_0x39f07d;return this[_0x47db68(0x2a5)]()[_0x47db68(0x326)]??'';},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x2f2)]=function(){const _0x527341=_0x39f07d;return this[_0x527341(0x2a5)]()[_0x527341(0x36b)]??0x0;},Game_CharacterBase[_0x39f07d(0x287)][_0x39f07d(0x4ce)]=function(){const _0x1db3fe=_0x39f07d;return this[_0x1db3fe(0x2a5)]()['maxSize']??0x0;},Game_CharacterBase[_0x39f07d(0x287)]['attachPictureOffsetX']=function(){const _0x272e98=_0x39f07d;return this[_0x272e98(0x2a5)]()[_0x272e98(0xd6)]??0x0;},Game_CharacterBase['prototype']['attachPictureOffsetY']=function(){const _0x18afc5=_0x39f07d;return this[_0x18afc5(0x2a5)]()[_0x18afc5(0xad)]??0x0;},Game_CharacterBase['prototype'][_0x39f07d(0x33d)]=function(){const _0x416eb3=_0x39f07d;return this[_0x416eb3(0x2a5)]()[_0x416eb3(0x7c)]??0x1;},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x42c)]=Game_Interpreter[_0x39f07d(0x287)][_0x39f07d(0x46c)],Game_Interpreter[_0x39f07d(0x287)]['updateWaitMode']=function(){const _0x199ce1=_0x39f07d;if(this[_0x199ce1(0x456)]===_0x199ce1(0x19a)){if(_0x199ce1(0x4b8)==='noDiM'){if(_0x42d126['isBattleTest']())return![];return _0x353456[_0x199ce1(0x2c3)][_0x199ce1(0x310)](_0x5e05d4);}else{if(window[this[_0x199ce1(0x318)]])this[_0x199ce1(0x456)]='',this['startCallEvent']();else{if(_0x199ce1(0x36f)===_0x199ce1(0x36f))return!![];else{_0xc69fc0=_0x189979(_0x363e18['$1']),_0x7e61fa=_0x42f43b(_0x1d4682['$2']);if(_0x10794e===0x0)_0x44e474=_0x11c642[_0x199ce1(0x5cb)]();}}}}else return VisuMZ[_0x199ce1(0x41c)][_0x199ce1(0x42c)]['call'](this);},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x424)]=Game_Interpreter['prototype'][_0x39f07d(0x185)],Game_Interpreter[_0x39f07d(0x287)][_0x39f07d(0x185)]=function(){const _0x3a0268=_0x39f07d,_0x3f5f49=$gameMap&&this[_0x3a0268(0x418)]?$gameMap[_0x3a0268(0x3f5)](this[_0x3a0268(0x418)]):null;$gameTemp[_0x3a0268(0x45f)](_0x3f5f49);const _0x125412=VisuMZ['EventsMoveCore'][_0x3a0268(0x424)][_0x3a0268(0x341)](this);return $gameTemp['clearSelfTarget'](),_0x125412;},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x329)]=Game_Interpreter[_0x39f07d(0x287)][_0x39f07d(0x1da)],Game_Interpreter[_0x39f07d(0x287)][_0x39f07d(0x1da)]=function(_0x137ce3){const _0x2ff629=_0x39f07d;return $gameTemp[_0x2ff629(0x514)](this),VisuMZ[_0x2ff629(0x41c)][_0x2ff629(0x329)][_0x2ff629(0x341)](this,_0x137ce3);},Game_Interpreter[_0x39f07d(0x287)]['pluginCommandCallEvent']=function(_0x17f62f){const _0x24d37c=_0x39f07d;this[_0x24d37c(0x5bf)]=_0x17f62f;const _0x475d4='Map%1.json'['format'](_0x17f62f[_0x24d37c(0x5cb)][_0x24d37c(0x245)](0x3));this[_0x24d37c(0x318)]=_0x24d37c(0x193)+Graphics[_0x24d37c(0x58d)]+'_'+this[_0x24d37c(0x4e2)](),DataManager[_0x24d37c(0x317)](this[_0x24d37c(0x318)],_0x475d4),window[this[_0x24d37c(0x318)]]?this[_0x24d37c(0x43c)]():this[_0x24d37c(0x1eb)](_0x24d37c(0x19a));},Game_Interpreter[_0x39f07d(0x287)][_0x39f07d(0x43c)]=function(){const _0x36f70e=_0x39f07d,_0x4ce8da=this[_0x36f70e(0x5bf)],_0x4acc53=window[this[_0x36f70e(0x318)]],_0x48ba3e=_0x4acc53[_0x36f70e(0x3c4)][_0x4ce8da[_0x36f70e(0x4e2)]];if(_0x48ba3e&&_0x48ba3e[_0x36f70e(0x382)][_0x4ce8da[_0x36f70e(0x4db)]-0x1]){const _0x346d06=_0x48ba3e[_0x36f70e(0x382)][_0x4ce8da['pageId']-0x1][_0x36f70e(0x22c)];this[_0x36f70e(0x308)](_0x346d06,this[_0x36f70e(0x4e2)]());}window[this[_0x36f70e(0x318)]]=undefined,this[_0x36f70e(0x318)]=undefined,this[_0x36f70e(0x5bf)]=undefined;};function Game_CPCInterpreter(){const _0xa252f9=_0x39f07d;this[_0xa252f9(0x56b)][_0xa252f9(0xec)](this,arguments);};Game_CPCInterpreter[_0x39f07d(0x287)]=Object[_0x39f07d(0x33c)](Game_Interpreter[_0x39f07d(0x287)]),Game_CPCInterpreter[_0x39f07d(0x287)][_0x39f07d(0x113)]=Game_CPCInterpreter,Game_CPCInterpreter[_0x39f07d(0x287)][_0x39f07d(0x32d)]=function(){const _0x59c662=_0x39f07d;Game_Interpreter[_0x59c662(0x287)]['clear'][_0x59c662(0x341)](this),this[_0x59c662(0x1d2)]=![];},Game_CPCInterpreter['prototype'][_0x39f07d(0x4d1)]=function(){const _0x89dd40=_0x39f07d;while(this[_0x89dd40(0x501)]()){'Pxcxb'!==_0x89dd40(0x85)?this[_0x89dd40(0x185)]():this['_eventIcon'][_0x89dd40(0x1e6)]=_0x473b8c(_0x5cb1a0['$1']);}},Game_CPCInterpreter[_0x39f07d(0x287)][_0x39f07d(0x54d)]=function(_0xaf119a){const _0x2e0359=_0x39f07d;while(this['isRunning']()){this[_0x2e0359(0x3b1)](_0xaf119a);}},Game_CPCInterpreter[_0x39f07d(0x287)]['executeCommandCommonEvent']=function(_0x2fdfb2){const _0x1b4e26=_0x39f07d,_0x1c4e7b=_0x2fdfb2;$gameTemp[_0x1b4e26(0x45f)](_0x1c4e7b);const _0x2558ae=VisuMZ['EventsMoveCore'][_0x1b4e26(0x424)]['call'](this);return $gameTemp[_0x1b4e26(0x4ae)](),_0x2558ae;},Game_CPCInterpreter['prototype'][_0x39f07d(0x5b7)]=function(_0x16749a){const _0x494bd0=_0x39f07d;Game_Interpreter[_0x494bd0(0x287)][_0x494bd0(0x5b7)]['call'](this,_0x16749a);if(this[_0x494bd0(0x373)][_0x494bd0(0x10a)](_0x1cf958=>_0x1cf958[_0x494bd0(0x17c)](/<(?:CONDITION|CONDITIONS) MET>/i))){if(_0x494bd0(0x2ca)==='hagFE')this[_0x494bd0(0x1d2)]=!![];else{if(_0x592a52[_0x494bd0(0x221)](_0x5362ad,_0x1bd913,_0x5b0ed2,this['_type']))return!![];const _0x2fabde=this['_type'][_0x494bd0(0x37c)](0x0)['toUpperCase']()+this[_0x494bd0(0x420)][_0x494bd0(0x586)](0x1),_0x5849c8=_0x494bd0(0x1c5)[_0x494bd0(0x307)](_0x2fabde);return _0x388096[_0x494bd0(0x41c)][_0x494bd0(0x2a4)][_0x494bd0(0x35d)][_0x5849c8]?![]:_0x4095a9[_0x494bd0(0x41c)]['Game_Vehicle_isLandOk'][_0x494bd0(0x341)](this,_0xf9802d,_0x51cd07,_0x57d6a5);}}return!![];},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x1ab)]=Scene_Map['prototype'][_0x39f07d(0x4c9)],Scene_Map['prototype']['startEncounterEffect']=function(){const _0x1b9896=_0x39f07d;VisuMZ['EventsMoveCore'][_0x1b9896(0x1ab)][_0x1b9896(0x341)](this),this[_0x1b9896(0x359)][_0x1b9896(0x18e)]();},VisuMZ['EventsMoveCore'][_0x39f07d(0x400)]=Scene_Load['prototype'][_0x39f07d(0x39b)],Scene_Load[_0x39f07d(0x287)][_0x39f07d(0x39b)]=function(){const _0x56440=_0x39f07d;if($gameMap)$gameMap['clearEventCache']();VisuMZ['EventsMoveCore'][_0x56440(0x400)][_0x56440(0x341)](this);},VisuMZ[_0x39f07d(0x41c)]['Sprite_Character_initMembers']=Sprite_Character['prototype'][_0x39f07d(0x4b6)],Sprite_Character['prototype'][_0x39f07d(0x4b6)]=function(){const _0x5decaa=_0x39f07d;VisuMZ[_0x5decaa(0x41c)][_0x5decaa(0x553)][_0x5decaa(0x341)](this),this['initMembersEventsMoveCore'](),this['createAttachPictureSprite'](),this[_0x5decaa(0x355)]();},Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x447)]=function(){const _0x58aee1=_0x39f07d;this[_0x58aee1(0x4ab)]=0xff;},Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x25b)]=function(){const _0x488386=_0x39f07d;this[_0x488386(0x47c)]=new Sprite(),this[_0x488386(0x47c)]['anchor']['x']=0.5,this[_0x488386(0x47c)][_0x488386(0x23d)]['y']=0x1,this[_0x488386(0x31f)](this[_0x488386(0x47c)]),this[_0x488386(0x2d2)]();},Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x355)]=function(){const _0x16e899=_0x39f07d;this[_0x16e899(0x408)]=new Sprite(),this['_eventIconSprite']['bitmap']=ImageManager[_0x16e899(0x174)](_0x16e899(0x11c)),this[_0x16e899(0x408)][_0x16e899(0x3d7)]['smooth']=![],this[_0x16e899(0x408)][_0x16e899(0x3c3)](0x0,0x0,0x0,0x0),this['_eventIconSprite'][_0x16e899(0x23d)]['x']=0.5,this[_0x16e899(0x408)][_0x16e899(0x23d)]['y']=0x1,this[_0x16e899(0x31f)](this[_0x16e899(0x408)]);},Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x2c2)]=function(){const _0x45f109=_0x39f07d;return this[_0x45f109(0x16f)]&&this[_0x45f109(0x16f)]['match'](/\[VS8\]/i);},Sprite_Character[_0x39f07d(0x287)]['isAutoBufferIcon']=function(){const _0xa594=_0x39f07d;return this[_0xa594(0x2c2)]()&&VisuMZ[_0xa594(0x41c)][_0xa594(0x2a4)][_0xa594(0x53a)][_0xa594(0x208)];},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x2bf)]=Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x12e)],Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x12e)]=function(){const _0x46015f=_0x39f07d;VisuMZ[_0x46015f(0x41c)][_0x46015f(0x2bf)][_0x46015f(0x341)](this),this[_0x46015f(0x3fd)]();},Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x3d2)]=function(){const _0x3a75b9=_0x39f07d;Sprite[_0x3a75b9(0x287)]['updateVisibility'][_0x3a75b9(0x341)](this),this[_0x3a75b9(0x3ec)]()&&(this[_0x3a75b9(0x38c)]=![]);},Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x3ec)]=function(){const _0x411d17=_0x39f07d;if(this['getEventIconIndex']()>0x0)return![];if(this['_character']){if('QWGsA'!==_0x411d17(0x59d)){if(this[_0x411d17(0x42f)][_0x411d17(0x2ce)]()!=='')return![];}else this[_0x411d17(0x3b1)](_0x1227f5);}return this[_0x411d17(0x277)]()||this[_0x411d17(0x42f)]&&this['_character'][_0x411d17(0x342)]();},Sprite_Character[_0x39f07d(0x287)]['updateEventsAndMovementCore']=function(){const _0x3eeb03=_0x39f07d;this[_0x3eeb03(0x14e)](),this[_0x3eeb03(0xc7)](),this[_0x3eeb03(0x1ac)](),this[_0x3eeb03(0x1de)](),this[_0x3eeb03(0xe0)](),this[_0x3eeb03(0x2d2)]();},VisuMZ[_0x39f07d(0x41c)]['Sprite_Character_setTileBitmap']=Sprite_Character['prototype'][_0x39f07d(0x49b)],Sprite_Character[_0x39f07d(0x287)]['setTileBitmap']=function(){const _0xbe6b96=_0x39f07d;VisuMZ[_0xbe6b96(0x41c)][_0xbe6b96(0x89)][_0xbe6b96(0x341)](this),this[_0xbe6b96(0x3d7)][_0xbe6b96(0x372)](this[_0xbe6b96(0x547)][_0xbe6b96(0x43f)](this));},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x24f)]=Sprite_Character[_0x39f07d(0x287)]['setCharacterBitmap'],Sprite_Character['prototype'][_0x39f07d(0x594)]=function(){const _0x56b317=_0x39f07d;VisuMZ[_0x56b317(0x41c)][_0x56b317(0x24f)][_0x56b317(0x341)](this),this['bitmap'][_0x56b317(0x372)](this['updateBitmapSmoothing'][_0x56b317(0x43f)](this));},Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x547)]=function(){const _0x3f96d4=_0x39f07d;if(!this[_0x3f96d4(0x3d7)])return;this['bitmap'][_0x3f96d4(0x1f6)]=!!VisuMZ[_0x3f96d4(0x41c)][_0x3f96d4(0x2a4)]['Movement'][_0x3f96d4(0x3ba)];},VisuMZ['EventsMoveCore']['Sprite_Character_characterPatternY']=Sprite_Character['prototype'][_0x39f07d(0x3bf)],Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x3bf)]=function(){const _0x23157=_0x39f07d;if(this[_0x23157(0x2c2)]())return this['characterPatternYVS8']();else{if(_0x23157(0x1f2)!==_0x23157(0x1f2))this[_0x23157(0x1a8)]=_0x4139bf(_0x44fb5c['$1']);else return this[_0x23157(0x296)]();}},Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x55c)]=function(){const _0x418a24=_0x39f07d,_0xa62ffc=this['_character'][_0x418a24(0x151)]();let _0x30dda5=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];if(this[_0x418a24(0x42f)]['_mirrorSprite']){if(_0x418a24(0x27c)!==_0x418a24(0x2c5))_0x30dda5=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6];else{if(_0x8021cd['isEventRunning']())return;if(_0x116f1b[_0x418a24(0xe5)]())return;let _0x4157a2=_0x54f703[_0x418a24(0x41c)][_0x418a24(0x2a4)][_0x418a24(0x2c6)];const _0x6dd42e=_0x418a24(0x494)[_0x418a24(0x307)](this[_0x418a24(0x3b4)]());_0x4157a2[_0x6dd42e]&&_0x463db5[_0x418a24(0x544)](_0x4157a2[_0x6dd42e]);}}return(_0x30dda5[_0xa62ffc]-0x2)/0x2;},Sprite_Character[_0x39f07d(0x287)]['characterPatternYBasic']=function(){const _0x2c132b=_0x39f07d;let _0x2263f1=this['_character'][_0x2c132b(0x151)]();if(this['_character'][_0x2c132b(0x169)]){if(_0x2263f1===0x4)_0x2263f1=0x6;else{if(_0x2263f1===0x6){if(_0x2c132b(0x283)!=='lGmLV'){const _0x2a37f4=[_0x422b0b,_0x551260,'Self\x20Variable\x20%1'[_0x2c132b(0x307)](_0x3160bc)];return _0x2636e5[_0x2c132b(0x319)](_0x2a37f4);}else _0x2263f1=0x4;}}}return(_0x2263f1-0x2)/0x2;},Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x14e)]=function(){const _0x57b4c2=_0x39f07d;if(!VisuMZ[_0x57b4c2(0x41c)][_0x57b4c2(0x2a4)][_0x57b4c2(0x258)][_0x57b4c2(0x199)])return;this['rotation']=0x0;if(this['isAllowCharacterTilt']()){if('EQJbf'===_0x57b4c2(0x227)){const _0xba552c=VisuMZ[_0x57b4c2(0x41c)][_0x57b4c2(0x2a4)][_0x57b4c2(0x258)],_0xae5f68=this[_0x57b4c2(0x42f)]['direction']();let _0x3f3c9a=0x0;if([0x1,0x4,0x7][_0x57b4c2(0x310)](_0xae5f68))_0x3f3c9a=_0xba552c[_0x57b4c2(0x46a)];if([0x3,0x6,0x9][_0x57b4c2(0x310)](_0xae5f68))_0x3f3c9a=_0xba552c[_0x57b4c2(0x41f)];[0x2,0x8][_0x57b4c2(0x310)](_0xae5f68)&&(_0x3f3c9a=[-_0xba552c[_0x57b4c2(0x538)],0x0,_0xba552c[_0x57b4c2(0x538)]][this['_character'][_0x57b4c2(0x145)]()]);if(this[_0x57b4c2(0x1cd)])_0x3f3c9a*=-0x1;this[_0x57b4c2(0x46b)]=_0x3f3c9a;}else{_0x354700[_0x57b4c2(0x130)](_0x580dc9,_0x192530);const _0x1c3aef=_0x488ae3['getLastPluginCommandInterpreter']();_0x3485a8['MapId']=_0x7c726b[_0x57b4c2(0x108)]||_0x5085a4[_0x57b4c2(0x5cb)]();const _0x46dbda=[_0x33b249[_0x57b4c2(0x108)],_0x2f9ea8[_0x57b4c2(0x36d)]||_0x1c3aef[_0x57b4c2(0x4e2)](),_0x57b4c2(0x24c)[_0x57b4c2(0x307)](_0x6e1294[_0x57b4c2(0x32c)])],_0x57671d=_0x2aae05[_0x57b4c2(0x39a)],_0x57fa48=_0x5f36c9[_0x57b4c2(0x319)](_0x46dbda)||![];_0x231727[_0x57b4c2(0xf2)](_0x57671d,_0x57fa48);}}},Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x278)]=function(){const _0x31501a=_0x39f07d;if(this[_0x31501a(0x387)])return![];return this[_0x31501a(0x42f)][_0x31501a(0x551)]()&&!this[_0x31501a(0x42f)][_0x31501a(0x54c)]()&&!this['_character']['isPosing']()&&this[_0x31501a(0x2a7)]()===0x0;},Sprite_Character[_0x39f07d(0x287)]['updateShadow']=function(){const _0x365fa4=_0x39f07d;if(!this[_0x365fa4(0x3c9)])return;this[_0x365fa4(0x3c9)]['x']=this[_0x365fa4(0x42f)][_0x365fa4(0x5a2)](),this[_0x365fa4(0x3c9)]['y']=this[_0x365fa4(0x42f)][_0x365fa4(0x58b)](),this[_0x365fa4(0x3c9)][_0x365fa4(0x15b)]=this[_0x365fa4(0x15b)],this[_0x365fa4(0x3c9)][_0x365fa4(0x38c)]=this['_character'][_0x365fa4(0x41a)](),this[_0x365fa4(0x3c9)][_0x365fa4(0x51a)]=this[_0x365fa4(0x51a)];if(!this[_0x365fa4(0x42f)]['isShadowShrink']())_0x365fa4(0xb9)!==_0x365fa4(0xeb)?(this[_0x365fa4(0x3c9)][_0x365fa4(0x7c)]['x']=Math[_0x365fa4(0x18f)](0x1,this[_0x365fa4(0x3c9)][_0x365fa4(0x7c)]['x']+0.1),this[_0x365fa4(0x3c9)]['scale']['y']=Math[_0x365fa4(0x18f)](0x1,this[_0x365fa4(0x3c9)][_0x365fa4(0x7c)]['y']+0.1)):this['_alwaysUpdateMove']=!![];else{if('PWZfF'===_0x365fa4(0x250)){if(_0xeb63c2&&_0x26c659[_0x365fa4(0x3e3)]())return _0x3ecd99['onClickTrigger'](),!![];}else this[_0x365fa4(0x3c9)][_0x365fa4(0x7c)]['x']=Math[_0x365fa4(0x2b0)](0x0,this[_0x365fa4(0x3c9)][_0x365fa4(0x7c)]['x']-0.1),this[_0x365fa4(0x3c9)]['scale']['y']=Math[_0x365fa4(0x2b0)](0x0,this[_0x365fa4(0x3c9)][_0x365fa4(0x7c)]['y']-0.1);}},Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x1ac)]=function(){const _0x40cac6=_0x39f07d;if(!this['_eventIconSprite'])return;const _0x5c92b0=this['_eventIconSprite'],_0x4f7e16=this[_0x40cac6(0x2a7)]();if(_0x4f7e16<=0x0)return _0x5c92b0['setFrame'](0x0,0x0,0x0,0x0);else{const _0x18d503=ImageManager[_0x40cac6(0x205)],_0x5decde=ImageManager[_0x40cac6(0x313)],_0x4ff05f=_0x4f7e16%0x10*_0x18d503,_0x469ae7=Math[_0x40cac6(0x167)](_0x4f7e16/0x10)*_0x5decde;_0x5c92b0[_0x40cac6(0x3c3)](_0x4ff05f,_0x469ae7,_0x18d503,_0x5decde),this['visible']=!![];}const _0x2932f0=this[_0x40cac6(0x42f)][_0x40cac6(0x4c5)]();this[_0x40cac6(0x2c0)]()?_0x40cac6(0x335)!==_0x40cac6(0x335)?this[_0x40cac6(0x7b)](_0x4877c7):this['autoEventIconBuffer'](_0x5c92b0):(_0x5c92b0['x']=_0x2932f0?_0x2932f0[_0x40cac6(0x1e6)]:0x0,_0x5c92b0['y']=_0x2932f0?-this[_0x40cac6(0x2db)]+_0x2932f0[_0x40cac6(0x500)]:0x0),_0x5c92b0['blendMode']=_0x2932f0?_0x2932f0['blendMode']:0x0,this[_0x40cac6(0x230)](_0x5c92b0),this[_0x40cac6(0x31f)](_0x5c92b0),_0x5c92b0[_0x40cac6(0x46b)]=-this[_0x40cac6(0x46b)];},Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x1de)]=function(){const _0x731cf=_0x39f07d;if(!this['_character'])return;if(this[_0x731cf(0x42f)][_0x731cf(0x306)]===undefined)return;if(this['_character']['_customZ']===![])return;this['z']=this[_0x731cf(0x42f)][_0x731cf(0x306)],this['z']<0x0?this[_0x731cf(0x3c9)]['z']=this['z']-0x1:this[_0x731cf(0x3c9)]['z']=0x0;},Sprite_Character['prototype'][_0x39f07d(0xe0)]=function(){const _0x2556c9=_0x39f07d;if(!this[_0x2556c9(0x42f)])return;let _0x2ccb89=!!this[_0x2556c9(0x42f)][_0x2556c9(0x169)];this[_0x2556c9(0x7c)]['x']=Math['abs'](this[_0x2556c9(0x7c)]['x'])*(_0x2ccb89?-0x1:0x1);},Sprite_Character[_0x39f07d(0x287)]['autoEventIconBuffer']=function(_0x24a98a){const _0x2c535c=_0x39f07d;_0x24a98a['x']=0x0,_0x24a98a['y']=-this['height']+this[_0x2c535c(0x2db)]*0x2/0x5,this['_character'][_0x2c535c(0x145)]()!==0x1&&('nUJvV'===_0x2c535c(0x14d)?this[_0x2c535c(0x251)]():_0x24a98a['y']+=0x1);},Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x2a7)]=function(){const _0x4cbf7b=_0x39f07d;if(!this[_0x4cbf7b(0x42f)])return 0x0;if(this[_0x4cbf7b(0x42f)][_0x4cbf7b(0x402)])return 0x0;const _0xe6637b=this[_0x4cbf7b(0x42f)][_0x4cbf7b(0x4c5)]();return _0xe6637b?_0xe6637b['iconIndex']||0x0:0x0;},Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x2d2)]=function(){const _0x32a024=_0x39f07d;if(!this[_0x32a024(0x47c)])return;if(!this[_0x32a024(0x42f)])return;this[_0x32a024(0x2d9)](),this[_0x32a024(0x3f3)]();},Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x2d9)]=function(){const _0xefa2cf=_0x39f07d;if(!this['needsAttachPictureUpdate']())return;const _0x1c021b=this['_character'][_0xefa2cf(0x2a5)]();this[_0xefa2cf(0x537)]=_0x1c021b[_0xefa2cf(0x326)],this[_0xefa2cf(0x1ef)]=_0x1c021b[_0xefa2cf(0x548)],this[_0xefa2cf(0x20d)]=_0x1c021b[_0xefa2cf(0x7c)];if(_0x1c021b[_0xefa2cf(0x326)]!==''){const _0x6477ff=ImageManager[_0xefa2cf(0x1c3)](_0x1c021b['filename']);_0x6477ff['addLoadListener'](this[_0xefa2cf(0x39f)]['bind'](this,_0x6477ff));}else this[_0xefa2cf(0x47c)][_0xefa2cf(0x3d7)]=new Bitmap(0x1,0x1);},Sprite_Character['prototype'][_0x39f07d(0x3f3)]=function(){const _0x298d60=_0x39f07d,_0xd44305=this[_0x298d60(0x47c)];_0xd44305['x']=this[_0x298d60(0x42f)][_0x298d60(0x183)](),_0xd44305['y']=this[_0x298d60(0x42f)][_0x298d60(0x3dc)](),_0xd44305[_0x298d60(0x36b)]=this['_character'][_0x298d60(0x2f2)]();},Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x247)]=function(){const _0x35f35c=_0x39f07d,_0x3afd1d=this[_0x35f35c(0x42f)][_0x35f35c(0x2a5)]();if(_0x3afd1d){if(this['_lastAttachPictureFilename']!==_0x3afd1d[_0x35f35c(0x326)])return!![];if(this['_lastAttachPictureMaxSize']!==_0x3afd1d[_0x35f35c(0x548)])return!![];if(this[_0x35f35c(0x20d)]!==_0x3afd1d['scale'])return!![];}return![];},Sprite_Character['prototype']['onLoadAttachPicture']=function(_0x1cb5fa){const _0x32cc34=_0x39f07d,_0x4bd44b=this[_0x32cc34(0x47c)];_0x4bd44b[_0x32cc34(0x3d7)]=_0x1cb5fa;const _0x4d25cd=this[_0x32cc34(0x42f)]['attachPictureSettings'](),_0x3d877f=_0x4d25cd[_0x32cc34(0x548)],_0x48e11b=_0x4d25cd[_0x32cc34(0x7c)];let _0x4386de=0x1;if(_0x3d877f>0x0){if(_0x32cc34(0x579)!==_0x32cc34(0x579)){_0x2b8f5c[_0x32cc34(0x41c)][_0x32cc34(0x54a)][_0x32cc34(0x341)](this,_0x3e53fc);if(this[_0x32cc34(0x28e)]()&&_0x7c5218[_0x32cc34(0x310)](0x0)&&this[_0x32cc34(0x3fa)]()===_0x32cc34(0x534)){const _0x4536bb=this[_0x32cc34(0x151)](),_0x1c963b=_0x5119d7[_0x32cc34(0x57c)](this['x'],_0x4536bb),_0x3c84b0=_0x16868c[_0x32cc34(0xd8)](this['y'],_0x4536bb);this[_0x32cc34(0x4c3)](_0x1c963b,_0x3c84b0);}}else{let _0x486641=this['getAttachPictureBitmapWidth']()||0x1,_0x3d3bc3=this['getAttachPictureBitmapHeight']()||0x1;const _0x36f2c4=Math[_0x32cc34(0x2b0)](0x1,_0x486641,_0x3d3bc3);_0x4386de=_0x3d877f/_0x36f2c4;}}_0x4386de*=_0x48e11b;if(_0x4386de!==0x1){if(_0x32cc34(0x419)!==_0x32cc34(0x419)){if(this[_0x32cc34(0x1ad)]===_0x20a4af)this[_0x32cc34(0x8b)]();if(!_0x9ee75e)return;this[_0x32cc34(0x2cc)](_0x468909[_0x32cc34(0x1c1)],_0x49d6b8['_eventId']);}else this['_attachPictureSprite']['bitmap'][_0x32cc34(0x1f6)]=!![];}_0x4bd44b[_0x32cc34(0x7c)]['x']=_0x4386de,_0x4bd44b[_0x32cc34(0x7c)]['y']=_0x4386de,this['visible']=!![],this[_0x32cc34(0x3f3)]();},Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0x58c)]=function(){const _0x35893e=_0x39f07d,_0x457931=this[_0x35893e(0x47c)];if(!_0x457931)return 0x0;return _0x457931['bitmap'][_0x35893e(0x5c3)];},Sprite_Character[_0x39f07d(0x287)][_0x39f07d(0xd1)]=function(){const _0xb60613=_0x39f07d,_0x538981=this['_attachPictureSprite'];if(!_0x538981)return 0x0;return _0x538981[_0xb60613(0x3d7)]['height'];},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x40a)]=Sprite_Balloon[_0x39f07d(0x287)][_0x39f07d(0x5ac)],Sprite_Balloon[_0x39f07d(0x287)]['setup']=function(_0x144080,_0x1aa68f){const _0x44ced6=_0x39f07d;VisuMZ[_0x44ced6(0x41c)][_0x44ced6(0x40a)][_0x44ced6(0x341)](this,_0x144080,_0x1aa68f),VisuMZ[_0x44ced6(0x41c)][_0x44ced6(0x2a4)][_0x44ced6(0x53a)][_0x44ced6(0x8d)]&&this['_target'][_0x44ced6(0x42f)][_0x44ced6(0x103)](_0x1aa68f,this[_0x44ced6(0x96)]);},VisuMZ['EventsMoveCore'][_0x39f07d(0xd4)]=Sprite_Balloon['prototype']['updatePosition'],Sprite_Balloon[_0x39f07d(0x287)][_0x39f07d(0x1dd)]=function(){const _0x370cda=_0x39f07d;VisuMZ[_0x370cda(0x41c)][_0x370cda(0xd4)][_0x370cda(0x341)](this),this[_0x370cda(0x2b9)]();},Sprite_Balloon[_0x39f07d(0x287)][_0x39f07d(0x2b9)]=function(){const _0x24fc95=_0x39f07d;this[_0x24fc95(0x25a)][_0x24fc95(0x42f)][_0x24fc95(0x2c2)]()&&(this['x']+=VisuMZ[_0x24fc95(0x41c)][_0x24fc95(0x2a4)]['VS8'][_0x24fc95(0x595)],this['y']+=VisuMZ[_0x24fc95(0x41c)][_0x24fc95(0x2a4)][_0x24fc95(0x53a)][_0x24fc95(0xf1)]);},Sprite_Timer[_0x39f07d(0x287)][_0x39f07d(0x320)]=function(){const _0x65b7f7=_0x39f07d;this[_0x65b7f7(0x3d7)]=new Bitmap(Math[_0x65b7f7(0x289)](Graphics[_0x65b7f7(0x295)]/0x2),0x30),this[_0x65b7f7(0x3d7)][_0x65b7f7(0x299)]=this[_0x65b7f7(0x299)](),this[_0x65b7f7(0x3d7)][_0x65b7f7(0x2cf)]=this['fontSize'](),this[_0x65b7f7(0x3d7)]['outlineColor']=ColorManager[_0x65b7f7(0x255)]();},Sprite_Timer[_0x39f07d(0x287)][_0x39f07d(0x2ab)]=function(){const _0x5a6b2b=_0x39f07d,_0x299f00=Math[_0x5a6b2b(0x167)](this[_0x5a6b2b(0x53e)]/0x3c/0x3c),_0x1a918c=Math[_0x5a6b2b(0x167)](this[_0x5a6b2b(0x53e)]/0x3c)%0x3c,_0x4f7bcb=this[_0x5a6b2b(0x53e)]%0x3c;let _0x1d5fb8=_0x1a918c[_0x5a6b2b(0x245)](0x2)+':'+_0x4f7bcb[_0x5a6b2b(0x245)](0x2);if(_0x299f00>0x0)_0x1d5fb8=_0x5a6b2b(0x2ff)[_0x5a6b2b(0x307)](_0x299f00,_0x1d5fb8);return _0x1d5fb8;};function _0x2c0c(_0x4d0403,_0x5b0fdf){const _0x2db4eb=_0x2db4();return _0x2c0c=function(_0x2c0cf7,_0x1fd079){_0x2c0cf7=_0x2c0cf7-0x7b;let _0x55e4df=_0x2db4eb[_0x2c0cf7];return _0x55e4df;},_0x2c0c(_0x4d0403,_0x5b0fdf);}function Sprite_EventLabel(){this['initialize'](...arguments);}function _0x2db4(){const _0x41b945=['getControlledFollowerID','checkAdvancedSwitchVariablePresent','checkEventTriggerAuto','BufferY','VrBEe','SpawnEventAtTerrainTag','_proxyWindow','requestRefresh','hXUWc','Game_Event_start','startCallEvent','TKjPT','tPely','bind','STR','FollowerID','EventLocationSave','Game_Timer_initialize','MtplI','Spriteset_Map_createShadow','sDJCl','initMembersEventsMoveCore','clearDestination','setAllowEventAutoMovement','_needsRefresh','turnTowardPoint','_lastMapId','clearPose','checkEventTriggerHere','_filename','turnAwayFromPoint','Game_Vehicle_isLandOk','jOTam','%1Allow','mirror\x20vertical','_poseDuration','_waitMode','isSupportDiagonalMovement','Game_Event_meetsConditions','activationProximityType','moveSynchType','KvWYE','isTurnInPlace','57464odigcG','rQeMQ','registerSelfTarget','exit','hasEventIcon','StopAutoMoveEvents','XfOos','iKEZX','variableId','isTile','isLongPressed','processMoveRouteAnimation','Game_Event_event','TiltLeft','rotation','updateWaitMode','DEFAULT_SHIFT_Y','inBattle','ZZZ','IjjJd','_labelWindow','_spawnData','isMapPassable','hzegM','SpawnEventDespawnRegions','isMovementSucceeded','resetSelfSwitchesForEvent','reverse\x20mimic','AxLEI','return\x20%1','erase','_attachPictureSprite','Passability','pdwnL','isPreventSelfMovement','default','DNwoa','RIMYh','Game_Player_isMapPassable','Seconds','OwNjm','Hjxzf','dCMno','Game_CharacterBase_screenY','reverse','filter','setOpacity','windowPadding','rhEOF','setBackgroundType','_spriteOffsetY','createSpawnedEventWithData','setMoveSpeed','EVAL','tileWidth','Region%1','player','qhOcI','ALLOW_LADDER_DASH','Game_CharacterBase_pattern','NOTE','RandomMoveWeight','setTileBitmap','kvtLr','PreSpawnJS','despawnEverything','Toggle','Scene_Boot_onDatabaseLoaded','_starting','VehicleForbid','HySGH','Enable','processMoveRouteFadeOut','IbDlP','Game_Message_setNumberInput','SelfVariables','updateSelfMovement','canPassDiagonally','_shadowOpacity','EventAutoMovement','Game_Map_unlockEvent','clearSelfTarget','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','textSizeEx','dir8','setPose','onClickTrigger','EventID','LqfLn','initMembers','jumpAll','IKSgH','EventTemplates','useCarryPoseForIcons','processMoveRouteFadeIn','EventTimerPause','LIGHT','_patternLocked','updateShadowChanges','_frames','mainFontSize','_forceShowFollower','startMapCommonEventOnOK','reverseDir','getEventIconData','processMoveRouteHugWall','NWpyr','_eventSpawnData','startEncounterEffect','setMovementSuccess','SPIN\x20ANTICLOCKWISE','PostCopyJS','FollowerSetGlobalChase','attachPictureMaxSize','Self\x20Switch\x20%1','trigger','execute','Map%1.json','follower','Airship','GaTAI','isSmartEventCollisionOn','ARRAYSTR','isJumping','setDashingEnabled','setupSpawnedEvents','pageId','XtCcK','_commonEventId','PreloadMaps','getSelfTarget','_selfTargetNumberInput','LIGHT\x20BULB','eventId','YeRim','erJyK','fkOZy','MoveAllSynchTargets','General','LKsGM','_addedHitbox','FastForwardKey','clearCarrying','JmPeD','updateMove','checkEventTriggerThere','USER-DEFINED\x201','UOfOJ','SelfSwitches','Game_CharacterBase_realMoveSpeed','_commonEvents','createDisplayObjects','eBnoc','isSelfVariable','Ship','Minutes','deltaYFrom','SPIN\x20ACW','BULB','labelWindowText','MorphEventRemove','refreshBushDepth','_saveEventLocation','bufferY','isRunning','btbmY','iconIndex','CustomPageConditions','Window_NumberInput_start','reverse\x20copy','nIUru','PreloadedMaps','zEVAt','isObjectCharacter','SelfSwitchABCD','ELnIU','ship','_eventScreenX','forceDashing','Dqiza','QXuZw','ycYXN','metCPC','setLastPluginCommandInterpreter','none','radius','NINaj','blt','_active','_hidden','LEFT\x20TO\x20RIGHT','STRUCT','_tilemap','Game_Vehicle_isMapPassable','return\x200','parallelCommonEvents','_counter','FontSize','eventsXy','SSEML','ccwY','OffsetX','Label','changeSpeed','MIVLF','QUESTION','isPassable','Game_CommonEvent_isActive','initFollowerController','UjAdc','iconSize','approach','LineHeight','processMoveSynchReverseMimic','Game_Temp_setDestination','front','isValid','isSpawnedEvent','_lastAttachPictureFilename','TiltVert','setPlayerControlDisable','VS8','gGKJA','OnIQk','_diagonalSupport','_seconds','BKUak','setupEvents','PKbdX','wfGQu','FavorHorz','reserveCommonEvent','_chaseOff','isLandOk','updateBitmapSmoothing','maxSize','isInVehicle','Game_Player_checkEventTriggerThere','refreshIfNeeded','isOnLadder','executeCommonEvent','lUWcZ','despawnAtXY','enable','isDashingAndMoving','gYrkN','Sprite_Character_initMembers','hasAdvancedSwitchVariable','distance','boat','AfmPi','ADDITIVE','updateEventsMoveCoreTagChanges','frontY','NUM','characterPatternYVS8','turnLeft90','yRvat','isOnRope','processMoveRouteBalloon','_screenZoomScale','innerWidth','ARRAYFUNC','_EventsMoveCoreSettings','checkNeedForPeriodicRefresh','_pattern','fpEex','Game_Event_updateSelfMovement','createSpawnedEvent','Hidden','initialize','backY','fSpDH','contents','isMoving','Game_Map_event','PeldQ','UKNxN','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','updatePatternEventsMoveCore','_activationProximity','WAbSL','trim','eraseEvent','OnXSd','processMoveRouteTeleportToCharacter','_visiblePlayerY','roundXWithDirection','EventLocationCreate','BlGHT','Map\x20%1\x20Variable\x20%2','deleteIconsOnEventsDataKey','LIGHTBULB','HEART','_eventOverload','Game_Switches_value','isSaveEventLocations','slice','gcUSe','convertVariableValuesInScriptCall','XQJqD','unlock','shadowY','getAttachPictureBitmapWidth','frameCount','processMoveRouteSelfVariable','stop','posEventsMoveCore','autosaveEventLocation','11309EEfkJm','posNt','setCharacterBitmap','BalloonOffsetX','dKdUN','updatePeriodicRefresh','setFrames','KbpPI','moveAwayFromPoint','AllAllow','_periodicRefreshTimer','DMjnE','startMapCommonEventOnTouch','PreMorphJS','TemplateName','Step1EventId','shadowX','correctFacingDirection','VisuMZ_Setup_Preload_Map','Game_Event_isCollidedWithPlayerCharacters','despawnEventId','_eventMorphData','setMapValue','mimic','dUJiA','_expireCommonEvent','setup','LVPhT','updateStop','MUSIC-NOTE','lFrOL','uetog','Game_Map_setupEvents','Stop','Game_Timer_onExpire','_spawnedEvents','vtIPS','command108','EventLocationDelete','findDirectionTo','_eventIcon','ccwX','Game_Variables_value','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','length','_callEventData','WdSJE','isBigCharacter','_moveRouteIndex','width','pluginCommandCallEvent','_pageIndex','Game_Character_setMoveRoute','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','setupRegionRestrictions','_eventPageIndex','WalkAllow','mapId','Window_ScrollText_startMessage','_characterSprites','away','meetActivationRegionConditions','saveEventLocation','NuTUm','updateRoutineMove','IbnBE','VehicleDock','createCharacterShadow','scale','HURT','updateOpacity','OyStk','updateScale','setupPlayerVisibilityOverrides','getLastPluginCommandInterpreter','Ctorx','template','bdqQx','IconSize','QJvLL','bTDdX','Sprite_Character_setTileBitmap','_eventLabelOffsetX','initEventsMoveCore','isBoat','AutoBalloon','parse','UNTITLED','AdvancedSwitches','_eventErased','onDatabaseLoaded','findTargetSprite','locate','FUNC','_duration','moveStraight','deleteIconsOnEventsData','Game_Event_update','split','isWorking','LGaGa','getPosingCharacterIndex','ARRAYSTRUCT','adjustMoveSynchOpacityDelta','hJSHl','iPbTy','70mRnnQc','onChange','Map%1-Event%2','QgKmk','push','setDirection','firstSpawnedEventID','setEventLabelsVisible','_inputTime','processMoveRouteMoveRepeat','clearStepPattern','offsetY','Game_Event_locate','_advancedSwitchVariable','Frames','BBTLy','getPreservedMorphEventData','hasCPCs','destinationY','AirshipSpeed','PostMorphJS','DHSxG','deletePreservedMorphEventDataKey','dqvnH','ctglz','Dock','Game_CharacterBase_moveDiagonally','_followerControlID','EventTimerResume','down','findDiagonalDirectionTo','EnableDir8','areFollowersForceHidden','SILENCE','setControlledFollowerID','mbfnl','switch2Valid','updateShadow','setDestination','Game_Player_increaseSteps','areFollowersForceShown','EventAllow','Game_CharacterBase_isDashing','ztbji','isStopFollowerChasing','TargetSwitchId','defaultFontSize','getAttachPictureBitmapHeight','Game_CharacterBase_increaseSteps','Rmbdt','Sprite_Balloon_updatePosition','Game_Player_checkEventTriggerHere','offsetX','processMoveSynchCustom','roundYWithDirection','delay','hasMoveOnlyRegions','initEventsMoveCoreSettings','startsWith','dsUgH','_alwaysUpdateMove','column','updateEventMirrorSprite','frontX','NORMAL','rLljB','setNumberInput','isAnyEventStarting','switches','PlayerMovementChange','refreshEventLabels','target','setupDiagonalSupport','wbAbq','apply','xKSOL','IBUDH','firstSpawnedEvent','prepareSpawnedEventAtRegion','BalloonOffsetY','setValue','fittingHeight','_eventScreenY','_eventCache','zkTEq','_eventLabelOffsetY','clearSpriteOffsets','morphIntoTemplate','start','pause','List','XmUMa','isCollidedWithEvents','isVisible','RVfxh','vyjYX','_lastMovedDirection','setBalloonPose','Game_Player_getInputDirection','Game_Character_processMoveCommand','_spawnPreserved','iwmyR','MapId','MUSICNOTE','some','_EventIcons','pvyZT','XOgBS','activationRegionList','regionList','_saveEventLocations','PlayerIconChange','RemovePreserve','constructor','Qowzx','isAirshipPassable','LOWER\x20LEFT','processDrawIcon','checkEventsMoveCoreStringTags','DashingEnable','_direction','processMoveSynchApproach','IconSet','standing','right','isPressed','absDistance','drawIcon','PosY','_forceShowPlayer','updateSaveEventLocation','guCHP','_moveAllowPlayerCollision','Event','wjLHk','arJxA','meetsSwitchCondition','note','isDiagonalDirection','SPIN\x20CLOCKWISE','update','BhYSO','ConvertParams','Game_Event_updateParallel','LEFT','Game_Variables_setValue','string','shift','Game_CharacterBase_canPass','setItemChoice','FyouX','determineEventOverload','RIGHT\x20TO\x20LEFT','turnAwayFromCharacter','PlayerIconDelete','SpawnEventDespawnAtXY','GuEsO','PTygc','vehicle','convertSelfVariableValuesInScriptCall','FclrS','YTvUy','isPlaytest','pattern','adjustDir8MovementSpeed','setDiagonalDirection','osQkE','Game_CharacterBase_setDirection','GetMoveSynchTarget','HnBEJ','_cacheVisibility','RvGzc','updateTilt','getSavedEventLocation','_visibleEventX','direction','PlayerForbid','isEventOverloaded','rTDDL','move','atzIk','pageIndex','Game_Event_checkEventTriggerAuto','initEventsMoveCoreEffects','UJtfJ','opacity','selfValue','setupMorphEvent','qvwcc','characterIndexVS8','variableValid','Forbid','processMoveRouteStepTo','EventLabelRefresh','left','sLucA','Spriteset_Map_createLowerLayer','floor','EventIconDelete','_mirrorSprite','_eventCopyData','COLLAPSE','UYXnA','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','isEventRunning','_characterName','gainFrames','checkSmartEventCollision','ZQZVj','meetsCPC','loadSystem','checkExistingEntitiesAt','_paused','DDsTq','variables','getPosingCharacterPattern','pzUmZ','QJHQo','match','Game_CharacterBase_direction','ShiftY','visibleRange','bblAX','MSSXr','Game_CharacterBase_characterIndex','attachPictureOffsetX','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','executeCommand','claDp','spawnPreserved','lineHeight','map','moveBackToRandomHome','isMoveOnlyRegionPassable','spBiN','moveSynchTarget','hideShadows','min','Step2EventId','oQNVL','39688ZfXenH','$callEventMap','isEventClickTriggered','needsUpdate','isTriggerIn','turnTowardCharacter','FgASz','EnableDashTilt','CallEvent','isRegionForbidPass','eventLabelsVisible','wcitV','getMapSpawnedEventData','dashSpeedModifier','setupPageSettings','Game_CharacterBase_hasStepAnime','USER-DEFINED\x202','isPlayerForceHidden','QagBy','setImage','processMoveRouteMoveUntilStop','isPosing','_spriteOffsetX','_lastPluginCommandInterpreter','OYqHK','Scene_Map_startEncounterEffect','updateEventIconSprite','_SavedEventLocations','LbIFH','drawTextEx','Speed','log','moveTowardCharacter','Game_Map_events','isSelfSwitch','Game_Map_isDashDisabled','processMoveRouteStepFrom','isDashDisabled','SuccessSwitchId','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','_clickTrigger','Collision','isAdvancedVariable','_scene','isPlayerForceShown','PlayerAllow','moveTowardPoint','_mapId','getInputDir8','loadPicture','Game_Followers_isVisible','%1DockRegionOnly','prepareSpawnedEventAtTerrainTag','updateText','onExpire','Game_Event_clearPageSettings','Window_EventItem_onCancel','FollowerSetTargetChase','Game_System_initialize','_reflection','refresh','mCvyn','_labelWindows','nCDVc','_cpc','_stepPattern','shadowFilename','canMove','NjPWT','hhcGr','ZUVzc','CommonEventID','command357','Game_CharacterBase_isTransparent','BVMGy','updatePosition','updateEventCustomZ','followers','245151OJmLQV','EisDH','ShowShadows','type','isMapVariable','EnableTurnInPlace','bufferX','LIGHT-BULB','_stopCount','screenX','getPose','setWaitMode','CPCsMet','MessageCore','isAirship','_lastAttachPictureMaxSize','kFKfs','Step1MapId','pOPwS','getDirectionToPoint','jump','processMoveRouteMoveTo','smooth','DashOnLadder','kJlld','OffsetY','DIAGONAL_PATHFINDING_EVENT_LIMIT','VariableGetSelfVariableID','_randomMoveWeight','executeMove','isDashingEnabled','registerSelfEvent','PageId','isEventTest','processOk','row','OKdGh','iconWidth','code','ftlna','AutoBuffer','removeMorph','FaJlx','1654590mETzvu','createShadow','_lastAttachPictureScale','updateMoveSynch','despawnRegions','_attachPicture','jWtfo','Game_Map_setup','createLabelWindowForTarget','wbZzB','axjBV','XmIhR','IconBufferX','KNEEL','_followerChaseOff','loadCPC','Game_Enemy_meetsSwitchCondition','nlnZo','BtsJE','_needsPeriodicRefresh','isLabelVisible','SWEAT','isRegionDockable','morphInto','Jbzsy','dxjnz','setupSaveEventLocations','processMoveRouteTeleportTo','EQJbf','activationProximityDistance','processMoveRouteJumpToCharacter','BGoJe','region','list','Game_Event_meetsConditionsCPC','daMQa','setupSpawn','removeChild','opacitySpeed','originalText','OpacitySpeed','AutoMoveEvents','Window_Message_startMessage','_forceHidePlayer','getInputDirection','lEjEL','processMoveRouteMoveToCharacter','processMoveSynchMimic','clearAttachPictureSettings','Game_Map_parallelCommonEvents','anchor','qlUDG','IconBufferY','MULTIPLY','isPlayerControlDisabled','RIGHT','dtzMO','meetsConditions','padZero','_regionRules','needsAttachPictureUpdate','processMoveCommandEventsMoveCore','TerrainTag','processSaveEventLocation','updatePattern','Self\x20Variable\x20%1','setPosition','TgUJP','Sprite_Character_setCharacterBitmap','INKQv','setupFollowerVisibilityOverrides','nObKD','gCgse','advancedFunc','outlineColor','MGgPG','cbVjC','Movement','Name','_target','createAttachPictureSprite','pZebh','savePreservedMorphEventDataKey','MapSwitches','contentsOpacity','weKox','Game_Player_isDashing','APOGf','DefaultShadow','pHMVc','FollowerSetControl','Window_NumberInput_processOk','turn180','dFGwp','_DisablePlayerControl','tOfCQ','spawnEventId','backX','aCFUc','screenY','%1%2','setChaseOff','MUSIC\x20NOTE','WalkForbid','_PlayerDiagonalSetting','requestBalloon','DjFrs','tileHeight','isEmptyCharacter','isAllowCharacterTilt','version','Template','fbxui','ntSIX','isMapSwitch','Paiay','isShadowShrink','Preserve','isShip','process_VisuMZ_EventsMoveCore_Switches_Variables','lGmLV','SCREEN','turnRight90','CRkvD','prototype','_selfEvent','round','%1,%2,','horizontal\x20mirror','_requestSaveEventLocation','parameters','canStartLocalEvents','createProxyWindow','processMoveRouteStepToCharacter','_working','chaseCharacter','lastSpawnedEvent','ITEM','boxWidth','characterPatternYBasic','_visibleEventY','padding','fontFace','All','SpawnEventAtXY','getDiagonalDestination','tLpJH','Game_CharacterBase_update','PlayerMovementDiagonal','QuMra','EMWkQ','AdvancedVariables','mirror\x20horizontal','Settings','attachPictureSettings','characterName','getEventIconIndex','...','lastMovedDirection','_speed','timerText','dKxfp','eventsXyNt','isNearTheScreen','ARRAYJSON','max','_data','airship','EventLabelVisible','sfAYO','NpaKZ','createLowerLayer','vZHee','isActive','updateVS8BalloonOffsets','createShadows','ANGER','CPC','clearEventCache','_randomHomeX','Sprite_Character_update','isAutoBufferIcon','status','isSpriteVS8dir','MapVariables','Chase','RHMGa','RegionTouch','_forceHideFollower','_realX','canPass','hagFE','COBWEB','deleteSavedEventLocationKey','_event','attachPictureFilename','fontSize','FollowerReset','_encounterEffectDuration','updateAttachPictureSprite','MapID','Game_Event_findProperPageIndex','isSaveEventLocation','2gspopo','1337005hMmjbP','lock','setupAttachPictureBitmap','Game_Event_moveTypeRandom','height','IconBlendMode','Game_Vehicle_initMoveSpeed','VisibleEventLabels','checkEventTriggerEventsMoveCore','wkNrT','LDCpV','meetActivationProximityConditions','Map\x20%1\x20Switch\x20%2','isCollidedWithPlayerCharacters','updateEventLabelText','Player','Hours','tELEe','%1,','forceMoveRoute','_selfTarget','OperateValues','moveDiagonally','text','description','27UYOzRv','_randomHomeY','attachPictureBlendMode','_forceCarrying','Allow','tmTfr','deleteSavedEventLocation','zoomScale','random','remove','nprZV','Game_SelfSwitches_setValue','_opacity','ShipSpeed','ANNOYED','%1:%2','iYeZy','_cacheSystemVisible','FALSE','Game_CharacterBase_moveStraight','copy','PVkbJ','_customZ','format','setupChild','Game_CharacterBase_updatePattern','setupEventsMoveCoreCommentTags','deltaXFrom','despawnTerrainTags','shiftY','deltaY','Value','includes','of\x20Preloaded\x20Maps.\x0a\x0a','isBusy','iconHeight','isAdvancedSwitch','_trigger','egNHW','loadDataFile','_callEventMap','value','processMoveRoutePatternLock','Game_Timer_stop','horz\x20mirror','tfXnR','waoOX','addChild','createBitmap','toUpperCase','_moveOnlyRegions','isSceneMap','Scene_Map_createDisplayObjects','SLEEP','filename','keys','EventTimerExpireClear','Game_Interpreter_PluginCommand','VisuMZ_1_MessageCore','PostSpawnJS','VariableId','clear','wMayn','Direction','clamp','JSON','_visiblePlayerX','character','realMoveSpeed','WxCOn','Game_Map_refresh','directionOnLadderSpriteVS8dir','opacityDelta','moveTypeRandom','_shadowGraphic','createSaveEventLocationData','create','attachPictureScale','qAHmc','SPIN\x20CW','registerCommand','call','isTransparent','PreCopyJS','checkCollisionKeywords','RegionOkTarget','SwitchId','setupEventsMoveCoreEffects','splice','checkRegionEventTrigger','drawText','moveForward','_interpreter','_characterIndex','2086007NNWplu','FpnQH','switch1Valid','isSpawnHitboxCollisionOk','getPlayerDiagonalSetting','StrictCollision','hvrKb','createIconSprite','executeMoveDir8','clearPageSettings','processMoveSynchMirrorVert','_spriteset','EventTimerFramesGain','hJUin','mapValue','Region','Game_Switches_setValue','LOWER\x20RIGHT','_realY','Game_Message_add','indexOf','Game_Follower_initialize','findProperPageIndex','IconIndex','LAlPT','Game_Event_initialize','startMessage','setupCopyEvent','UYvkT','blendMode','isNormalPriority','EventId','itemPadding','BLRcl','SPIN\x20CCW','iKcFk','addLoadListener','_comments','setupEventsMoveCoreNotetags','EXCLAMATION','resetExitSelfSwitches','CtEdX','Window_EventItem_onOk','kPpcD','Visible','_events','charAt','tjnQA','hasStepAnime','6OrjvCF','_pose','removeTemporaryMapSpawnedEvents','pages','onOk','CarryPose','UqqyG','RjaBn','_dragonbones','AVMLy','pUoAG','FTXIE','Letter','visible','$preloadedMap_%1','processMoveRouteJumpTo','eToiX','KBIoQ','ZctHj','terrainTag','getPosingCharacterDirection','toLowerCase','processMoveSynchRandom','_vehicleType','clearDashing','Game_Follower_chaseCharacter','Game_CharacterBase_screenX','TargetVariableId','onLoadSuccess','PtHdc','UtcOG','CUCpD','onLoadAttachPicture','_MapSpawnedEventData','_text','Game_Message_setItemChoice','conditions','Game_CharacterBase_initMembers','name','ogypr','_moveSynch','JQwJg','LOVE','isRegionAllowPass','isDestinationValid','moveAwayFromCharacter','VehicleAllow','oTIPC','Cakfr','processMoveSynchAway','executeCommandCommonEvent','Icon','TurnInPlaceDelay','regionId','setPattern','_activationProximityAutoTriggerBypass','initMoveSpeed','HMPH','BlendMode','BitmapSmoothing','getDirectionFromPoint','setCommonEvent','referEvent','setPlayerDiagonalSetting','characterPatternY','_PreservedEventMorphData','UPPER\x20RIGHT','setEventIconDataKey','setFrame','events','jpaPh','PSeNI','_selfTargetItemChoice','resume','_shadowSprite','isTargetEventValidForLabelWindow','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','checkValidEventerMap','abs','BoatSpeed','moveRouteIndex','FnUaX','setStopFollowerChasing','updateVisibility','xksAp','MoveRouteIndex','add','DashModifier','bitmap','increaseSteps','Game_CharacterBase_opacity','moQgl','zKaby','attachPictureOffsetY','page','_CPCs','VisibleRange','SpawnEventDespawnEventID','IbzBb','_moveRoute','hasClickTrigger','isPassableByAnyDirection','isBattleTest','%1Forbid','efdyG','Game_Troop_meetsConditionsCPC','replace','Dpcqq','MorphEventTo','isEventsMoveCoreInvisible','SelfSwitchID','processMoveSynch','processMoveSynchMirrorHorz','KocaB','processMoveRouteSelfSwitch','hcwQs','updateAttachPictureBitmap','jwgGq','event','SMMtN','PosX','unlockEvent','LvIze','startMapCommonEventOnOKTarget','OFF','resetSelfSwitchesForMap','updateEventsAndMovementCore','isDashing','Button','Scene_Load_onLoadSuccess','Game_SelfSwitches_value','_erased','FRUSTRATION','SpawnEventAtRegion','gMgwJ','onCancel','ARRAYNUM','_eventIconSprite','setMoveRoute','Sprite_Balloon_setup','randomInt','createContents','setSelfValue','SpawnEventDespawnEverything','ZfBcj','Game_Map_update','square','labelWindowRange','coUvU','processMoveCommand','timer','concat','USER-DEFINED\x203','_eventId','xNOgL','isShadowVisible','Step2MapId','EventsMoveCore','ahuvS','_forceDashing','TiltRight','_type','VICTORY','Game_Character_forceMoveRoute','deleteEventLocation','Game_Interpreter_executeCommand','advancedValue','Setting','dKhCm','DashEnableToggle','switchId','checkActivationProximity','resetFontSettings','Game_Interpreter_updateWaitMode','isAllowEventAutoMovement','vertical\x20mirror','_character','createLabelWindows','processMoveRouteSetIndex'];_0x2db4=function(){return _0x41b945;};return _0x2db4();}Sprite_EventLabel[_0x39f07d(0x287)]=Object[_0x39f07d(0x33c)](Sprite[_0x39f07d(0x287)]),Sprite_EventLabel[_0x39f07d(0x287)][_0x39f07d(0x113)]=Sprite_EventLabel,Sprite_EventLabel[_0x39f07d(0x287)]['initialize']=function(_0x325e6e){const _0x21345d=_0x39f07d;this[_0x21345d(0x2cd)]=_0x325e6e,Sprite[_0x21345d(0x287)][_0x21345d(0x56b)]['call'](this),this[_0x21345d(0x4b6)](),this[_0x21345d(0x28f)]();},Sprite_EventLabel['prototype']['initMembers']=function(){const _0x2685d0=_0x39f07d;this[_0x2685d0(0x23d)]['x']=0.5,this['anchor']['y']=0x1;},Sprite_EventLabel[_0x39f07d(0x287)]['createProxyWindow']=function(){const _0xf2cb9b=_0x39f07d,_0x26a6a4=new Rectangle(0x0,0x0,0x1,0x1);this[_0xf2cb9b(0x438)]=new Window_Base(_0x26a6a4),this[_0xf2cb9b(0x438)][_0xf2cb9b(0x298)]=0x0,this[_0xf2cb9b(0x15b)]=this[_0xf2cb9b(0x21f)]()?0xff:0x0;},Sprite_EventLabel['prototype']['update']=function(){const _0x306eb9=_0x39f07d;Sprite['prototype'][_0x306eb9(0x12e)][_0x306eb9(0x341)](this),this[_0x306eb9(0x1c7)](),this['updateScale'](),this[_0x306eb9(0x1dd)](),this['updateOpacity']();},Sprite_EventLabel[_0x39f07d(0x287)][_0x39f07d(0x1c7)]=function(){const _0x5e7155=_0x39f07d;this[_0x5e7155(0x2cd)][_0x5e7155(0x4fc)]()!==this['_text']&&(this[_0x5e7155(0x3a1)]=this[_0x5e7155(0x2cd)][_0x5e7155(0x4fc)](),this['refresh']());},Sprite_EventLabel[_0x39f07d(0x287)]['refresh']=function(){const _0x258a79=_0x39f07d;if(!this[_0x258a79(0x438)])return;this['resizeWindow'](),this[_0x258a79(0x34a)]();},Sprite_EventLabel[_0x39f07d(0x287)]['resizeWindow']=function(){const _0x553839=_0x39f07d,_0x5b16f8=this['_proxyWindow']['textSizeEx'](this[_0x553839(0x3a1)]),_0x5b36e0=this[_0x553839(0x438)][_0x553839(0x36e)](),_0x2b2cc6=_0x5b16f8['width']+_0x5b36e0*0x2,_0x490773=_0x5b16f8['height'];this[_0x553839(0x438)]['move'](0x0,0x0,_0x2b2cc6,_0x490773),this[_0x553839(0x438)][_0x553839(0x40c)](),this[_0x553839(0x3d7)]=this[_0x553839(0x438)][_0x553839(0x56e)];},Sprite_EventLabel[_0x39f07d(0x287)]['drawText']=function(){const _0x1ee0b7=_0x39f07d,_0xa2c3f7=this[_0x1ee0b7(0x438)]['itemPadding']();this[_0x1ee0b7(0x438)][_0x1ee0b7(0x1af)](this[_0x1ee0b7(0x3a1)],_0xa2c3f7,0x0);},Sprite_EventLabel[_0x39f07d(0x287)][_0x39f07d(0x80)]=function(){const _0x3b7f21=_0x39f07d,_0x5d4716=VisuMZ[_0x3b7f21(0x41c)][_0x3b7f21(0x2a4)][_0x3b7f21(0x527)][_0x3b7f21(0x522)],_0x5e2469=$gameSystem[_0x3b7f21(0x4c1)]()||0x1;this[_0x3b7f21(0x7c)]['x']=this[_0x3b7f21(0x7c)]['y']=_0x5d4716/_0x5e2469;},Sprite_EventLabel[_0x39f07d(0x287)]['updatePosition']=function(){const _0x5a8f3a=_0x39f07d;if(!SceneManager[_0x5a8f3a(0x1bd)])return;if(!SceneManager['_scene'][_0x5a8f3a(0x359)])return;const _0x1111d1=SceneManager[_0x5a8f3a(0x1bd)][_0x5a8f3a(0x359)][_0x5a8f3a(0x93)](this[_0x5a8f3a(0x2cd)]);if(!_0x1111d1)return;this['x']=this[_0x5a8f3a(0x2cd)][_0x5a8f3a(0x1e9)](),this['x']+=this[_0x5a8f3a(0x2cd)][_0x5a8f3a(0x471)]['offsetX'],this['y']=this[_0x5a8f3a(0x2cd)][_0x5a8f3a(0x26e)]()-_0x1111d1[_0x5a8f3a(0x2db)],this['y']+=$gameSystem[_0x5a8f3a(0x48c)]()*-0.5,this['y']+=this[_0x5a8f3a(0x2cd)][_0x5a8f3a(0x471)][_0x5a8f3a(0xad)];},Sprite_EventLabel['prototype']['updateOpacity']=function(){const _0x256b74=_0x39f07d;if(this[_0x256b74(0x21f)]())this[_0x256b74(0x15b)]+=this[_0x256b74(0x231)]();else SceneManager[_0x256b74(0x1bd)][_0x256b74(0x2d1)]>0x0?this[_0x256b74(0x15b)]=0x0:this[_0x256b74(0x15b)]-=this[_0x256b74(0x231)]();},Sprite_EventLabel[_0x39f07d(0x287)][_0x39f07d(0x21f)]=function(){const _0x58321c=_0x39f07d;if(!$gameSystem[_0x58321c(0x19c)]())return![];if(this[_0x58321c(0x2cd)]?.['_erased'])return![];if(this[_0x58321c(0x2cd)]&&this[_0x58321c(0x2cd)][_0x58321c(0x5c5)]<0x0)return![];if(SceneManager['_scene']['_encounterEffectDuration']>0x0)return![];const _0x1d12e7=$gamePlayer['x'],_0x466d95=$gamePlayer['y'],_0x517785=this['_event']['x'],_0x5eed3b=this['_event']['y'];if(this[_0x58321c(0x332)]===_0x1d12e7&&this[_0x58321c(0x57b)]===_0x466d95&&this[_0x58321c(0x150)]===_0x517785&&this['_visibleEventY']===_0x5eed3b)return this[_0x58321c(0x14c)];this[_0x58321c(0x332)]=$gamePlayer['x'],this[_0x58321c(0x57b)]=$gamePlayer['y'],this[_0x58321c(0x150)]=this[_0x58321c(0x2cd)]['x'],this[_0x58321c(0x297)]=this[_0x58321c(0x2cd)]['y'];if($gameMap[_0x58321c(0x120)](_0x1d12e7,_0x466d95,_0x517785,_0x5eed3b)>this[_0x58321c(0x2cd)][_0x58321c(0x412)]())return _0x58321c(0x4dc)===_0x58321c(0x4dc)?(this[_0x58321c(0x14c)]=![],![]):this[_0x58321c(0x1a7)]()?this[_0x58321c(0x179)]():_0x16bb49[_0x58321c(0x41c)][_0x58321c(0x498)][_0x58321c(0x341)](this);return this[_0x58321c(0x14c)]=!![],!![];},Sprite_EventLabel[_0x39f07d(0x287)][_0x39f07d(0x231)]=function(){const _0x3d7887=_0x39f07d;return VisuMZ[_0x3d7887(0x41c)][_0x3d7887(0x2a4)][_0x3d7887(0x527)][_0x3d7887(0x233)];},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x166)]=Spriteset_Map['prototype'][_0x39f07d(0x2b6)],Spriteset_Map['prototype']['createLowerLayer']=function(){const _0x3711fd=_0x39f07d;VisuMZ[_0x3711fd(0x41c)]['Spriteset_Map_createLowerLayer'][_0x3711fd(0x341)](this),this[_0x3711fd(0x430)]();},VisuMZ['EventsMoveCore'][_0x39f07d(0x445)]=Spriteset_Map[_0x39f07d(0x287)][_0x39f07d(0x20c)],Spriteset_Map[_0x39f07d(0x287)][_0x39f07d(0x20c)]=function(){const _0x4f2c69=_0x39f07d;VisuMZ[_0x4f2c69(0x41c)][_0x4f2c69(0x445)][_0x4f2c69(0x341)](this),this[_0x4f2c69(0x2ba)]();},Spriteset_Map[_0x39f07d(0x287)][_0x39f07d(0x2ba)]=function(){const _0x488e6a=_0x39f07d;if(!VisuMZ['EventsMoveCore']['Settings'][_0x488e6a(0x258)][_0x488e6a(0x1e2)])return;for(const _0x1f134e of this[_0x488e6a(0x5cd)]){this[_0x488e6a(0x7b)](_0x1f134e);}},Spriteset_Map[_0x39f07d(0x287)]['createCharacterShadow']=function(_0x15e950){const _0x6487b5=_0x39f07d;_0x15e950[_0x6487b5(0x3c9)]=new Sprite(),_0x15e950[_0x6487b5(0x3c9)][_0x6487b5(0x44f)]=_0x15e950[_0x6487b5(0x42f)][_0x6487b5(0x1d4)](),_0x15e950[_0x6487b5(0x3c9)]['bitmap']=ImageManager[_0x6487b5(0x174)](_0x15e950['_shadowSprite'][_0x6487b5(0x44f)]),_0x15e950['_shadowSprite'][_0x6487b5(0x23d)]['x']=0.5,_0x15e950[_0x6487b5(0x3c9)][_0x6487b5(0x23d)]['y']=0x1,_0x15e950[_0x6487b5(0x3c9)]['z']=0x0,this[_0x6487b5(0x51d)][_0x6487b5(0x31f)](_0x15e950['_shadowSprite']);},Spriteset_Map[_0x39f07d(0x287)][_0x39f07d(0x18e)]=function(){const _0x936d52=_0x39f07d;if(!VisuMZ[_0x936d52(0x41c)][_0x936d52(0x2a4)]['Movement'][_0x936d52(0x1e2)])return;for(const _0x2c0be1 of this[_0x936d52(0x5cd)]){if(_0x936d52(0x20a)===_0x936d52(0x128))return this['attachPictureSettings']()['maxSize']??0x0;else this['_tilemap'][_0x936d52(0x230)](_0x2c0be1[_0x936d52(0x3c9)]);}},Spriteset_Map[_0x39f07d(0x287)][_0x39f07d(0x430)]=function(){const _0x4967ef=_0x39f07d;this['_labelWindows']=[];for(const _0xaf7cfc of $gameMap['events']()){this[_0x4967ef(0x213)](_0xaf7cfc);}},Spriteset_Map[_0x39f07d(0x287)][_0x39f07d(0x213)]=function(_0x16f35d){const _0x361a89=_0x39f07d;if(!this[_0x361a89(0x3ca)](_0x16f35d))return;let _0x322a8b;const _0x42dfcb=VisuMZ['EventsMoveCore'][_0x361a89(0x2a4)][_0x361a89(0x527)]['SpriteBased']??!![];_0x322a8b=_0x42dfcb?new Sprite_EventLabel(_0x16f35d):new Window_EventLabel(_0x16f35d),_0x322a8b['z']=0x8,_0x322a8b['spriteId']=Sprite[_0x361a89(0x521)]++,this[_0x361a89(0x51d)][_0x361a89(0x31f)](_0x322a8b),this['_labelWindows']['push'](_0x322a8b);},Spriteset_Map[_0x39f07d(0x287)]['isTargetEventValidForLabelWindow']=function(_0x2c57fb){const _0x3a52a2=_0x39f07d,_0x462d07=_0x2c57fb[_0x3a52a2(0x3f5)]();if(_0x462d07[_0x3a52a2(0x12b)]['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x462d07['note'][_0x3a52a2(0x17c)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x2f1066 of _0x462d07['pages']){let _0x43628c='';for(const _0x25f2ce of _0x2f1066['list']){if(_0x3a52a2(0xdd)!==_0x3a52a2(0x186))[0x6c,0x198][_0x3a52a2(0x310)](_0x25f2ce[_0x3a52a2(0x206)])&&(_0x43628c+=_0x25f2ce[_0x3a52a2(0x28d)][0x0]);else{if(this[_0x3a52a2(0x175)](_0x5032d5,_0x42c551))return![];if(!this['isSpawnHitboxCollisionOk'](_0x3f5fc3,_0x317635,_0x480bf9))return![];}}if(_0x43628c[_0x3a52a2(0x17c)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x43628c[_0x3a52a2(0x17c)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map[_0x39f07d(0x287)]['createSpawnedEvent']=function(_0x5b978c){const _0x32ddb2=_0x39f07d;this['_characterSprites']=this['_characterSprites']||[];const _0x2c1e37=new Sprite_Character(_0x5b978c);this[_0x32ddb2(0x5cd)][_0x32ddb2(0xa6)](_0x2c1e37),this[_0x32ddb2(0x51d)][_0x32ddb2(0x31f)](_0x2c1e37),this[_0x32ddb2(0x7b)](_0x2c1e37),this[_0x32ddb2(0x213)](_0x5b978c),_0x2c1e37[_0x32ddb2(0x12e)]();},Spriteset_Map[_0x39f07d(0x287)][_0x39f07d(0xe8)]=function(){const _0x31e1fb=_0x39f07d;if(!this[_0x31e1fb(0x1d0)])return;for(const _0x1877c2 of this[_0x31e1fb(0x1d0)]){if(_0x31e1fb(0x1a4)!==_0x31e1fb(0x1a4)){const _0x1fd8de=this[_0x31e1fb(0x438)][_0x31e1fb(0x4b0)](this['_text']),_0x56f6d5=this[_0x31e1fb(0x438)][_0x31e1fb(0x36e)](),_0x3af21a=_0x1fd8de[_0x31e1fb(0x5c3)]+_0x56f6d5*0x2,_0x1131b6=_0x1fd8de[_0x31e1fb(0x2db)];this[_0x31e1fb(0x438)][_0x31e1fb(0x155)](0x0,0x0,_0x3af21a,_0x1131b6),this[_0x31e1fb(0x438)][_0x31e1fb(0x40c)](),this[_0x31e1fb(0x3d7)]=this['_proxyWindow'][_0x31e1fb(0x56e)];}else _0x1877c2&&(_0x1877c2[_0x31e1fb(0x332)]=undefined,_0x1877c2['refresh']());}},VisuMZ['EventsMoveCore']['Game_Message_setNumberInput']=Game_Message['prototype'][_0x39f07d(0xe4)],Game_Message[_0x39f07d(0x287)]['setNumberInput']=function(_0x4cca54,_0x3cc58d){const _0x4a4e8d=_0x39f07d;this['_selfTargetNumberInput']=$gameTemp['getSelfTarget'](),VisuMZ[_0x4a4e8d(0x41c)][_0x4a4e8d(0x4a7)][_0x4a4e8d(0x341)](this,_0x4cca54,_0x3cc58d);},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x505)]=Window_NumberInput[_0x39f07d(0x287)][_0x39f07d(0xfa)],Window_NumberInput[_0x39f07d(0x287)]['start']=function(){const _0x5a9c11=_0x39f07d;$gameTemp[_0x5a9c11(0x45f)]($gameMessage[_0x5a9c11(0x4e0)]),VisuMZ[_0x5a9c11(0x41c)][_0x5a9c11(0x505)][_0x5a9c11(0x341)](this),$gameTemp[_0x5a9c11(0x4ae)]();},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x266)]=Window_NumberInput['prototype'][_0x39f07d(0x202)],Window_NumberInput['prototype']['processOk']=function(){const _0x59ad1a=_0x39f07d;$gameTemp[_0x59ad1a(0x45f)]($gameMessage[_0x59ad1a(0x4e0)]),VisuMZ[_0x59ad1a(0x41c)][_0x59ad1a(0x266)][_0x59ad1a(0x341)](this),$gameTemp[_0x59ad1a(0x4ae)](),$gameMessage['_selfTargetNumberInput']=undefined;},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x3a2)]=Game_Message[_0x39f07d(0x287)][_0x39f07d(0x137)],Game_Message[_0x39f07d(0x287)][_0x39f07d(0x137)]=function(_0x2d21f7,_0x2f73d6){const _0xa6326b=_0x39f07d;this[_0xa6326b(0x3c7)]=$gameTemp[_0xa6326b(0x4df)](),VisuMZ[_0xa6326b(0x41c)]['Game_Message_setItemChoice']['call'](this,_0x2d21f7,_0x2f73d6);},VisuMZ[_0x39f07d(0x41c)]['Window_EventItem_onOk']=Window_EventItem[_0x39f07d(0x287)][_0x39f07d(0x383)],Window_EventItem[_0x39f07d(0x287)][_0x39f07d(0x383)]=function(){const _0x50e21d=_0x39f07d;$gameTemp['registerSelfTarget']($gameMessage['_selfTargetItemChoice']),VisuMZ['EventsMoveCore'][_0x50e21d(0x378)]['call'](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x50e21d(0x3c7)]=undefined;},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x1ca)]=Window_EventItem['prototype'][_0x39f07d(0x406)],Window_EventItem[_0x39f07d(0x287)][_0x39f07d(0x406)]=function(){const _0x516cbd=_0x39f07d;$gameTemp[_0x516cbd(0x45f)]($gameMessage[_0x516cbd(0x3c7)]),VisuMZ[_0x516cbd(0x41c)][_0x516cbd(0x1ca)]['call'](this),$gameTemp[_0x516cbd(0x4ae)](),$gameMessage['_selfTargetItemChoice']=undefined;},VisuMZ[_0x39f07d(0x41c)][_0x39f07d(0x235)]=Window_Message['prototype'][_0x39f07d(0x368)],Window_Message[_0x39f07d(0x287)]['startMessage']=function(){const _0x1c580e=_0x39f07d;$gameMessage['registerSelfEvent'](),VisuMZ[_0x1c580e(0x41c)][_0x1c580e(0x235)][_0x1c580e(0x341)](this),$gameTemp[_0x1c580e(0x4ae)]();},VisuMZ[_0x39f07d(0x41c)]['Window_ScrollText_startMessage']=Window_ScrollText[_0x39f07d(0x287)][_0x39f07d(0x368)],Window_ScrollText[_0x39f07d(0x287)]['startMessage']=function(){const _0xa616a5=_0x39f07d;$gameMessage[_0xa616a5(0x1ff)](),VisuMZ[_0xa616a5(0x41c)][_0xa616a5(0x5cc)][_0xa616a5(0x341)](this),$gameTemp[_0xa616a5(0x4ae)]();};function Window_EventLabel(){const _0x5a4605=_0x39f07d;this[_0x5a4605(0x56b)](...arguments);}Window_EventLabel[_0x39f07d(0x287)]=Object[_0x39f07d(0x33c)](Window_Base[_0x39f07d(0x287)]),Window_EventLabel['prototype'][_0x39f07d(0x113)]=Window_EventLabel,Window_EventLabel['prototype'][_0x39f07d(0x56b)]=function(_0x4ac6ff){const _0x247d25=_0x39f07d;this[_0x247d25(0x2cd)]=_0x4ac6ff;const _0x57d28a=new Rectangle(0x0,0x0,Graphics[_0x247d25(0x295)]/0x4,this[_0x247d25(0xf3)](0x1));this[_0x247d25(0x4b6)](),Window_Base['prototype'][_0x247d25(0x56b)][_0x247d25(0x341)](this,_0x57d28a),this[_0x247d25(0x25f)]=0x0,this[_0x247d25(0x48e)](0x2),this[_0x247d25(0x3a1)]='';},Window_EventLabel[_0x39f07d(0x287)][_0x39f07d(0x4b6)]=function(){const _0x50aeda=_0x39f07d;this[_0x50aeda(0x91)]=![],this['_screenZoomScale']=$gameScreen['zoomScale'](),this[_0x50aeda(0x50e)]=this[_0x50aeda(0x2cd)][_0x50aeda(0x1e9)](),this[_0x50aeda(0xf4)]=this[_0x50aeda(0x2cd)][_0x50aeda(0x26e)](),this['_eventLabelOffsetX']=this[_0x50aeda(0x2cd)][_0x50aeda(0x471)]['offsetX'],this[_0x50aeda(0xf7)]=this['_event']['_labelWindow'][_0x50aeda(0xad)],this[_0x50aeda(0x5c9)]=this[_0x50aeda(0x2cd)][_0x50aeda(0x5c5)],this[_0x50aeda(0x14c)]=this[_0x50aeda(0x21f)](),this[_0x50aeda(0x301)]=$gameSystem[_0x50aeda(0x19c)](),this[_0x50aeda(0x332)]=$gamePlayer['x'],this[_0x50aeda(0x57b)]=$gamePlayer['y'],this[_0x50aeda(0x150)]=this['_event']['x'],this[_0x50aeda(0x297)]=this[_0x50aeda(0x2cd)]['y'];},Window_EventLabel[_0x39f07d(0x287)]['update']=function(){const _0x2d722b=_0x39f07d;Window_Base[_0x2d722b(0x287)][_0x2d722b(0x12e)]['call'](this);if(!this[_0x2d722b(0x195)]())return;this['updateText'](),this[_0x2d722b(0x80)](),this[_0x2d722b(0x1dd)](),this['updateOpacity']();},Window_EventLabel['prototype']['needsUpdate']=function(){const _0x1896a4=_0x39f07d;if(!this['_event'])return![];if(!this[_0x1896a4(0x2cd)][_0x1896a4(0x471)])return![];if(this[_0x1896a4(0x5c9)]!==this['_event'][_0x1896a4(0x5c5)])return!![];if(this[_0x1896a4(0x2cd)][_0x1896a4(0x402)]&&!this[_0x1896a4(0x91)])return!![];if(this[_0x1896a4(0x2cd)][_0x1896a4(0x471)][_0x1896a4(0x2ee)]==='')return![];if(this[_0x1896a4(0x561)]!==$gameScreen[_0x1896a4(0x2f7)]())return!![];if(this[_0x1896a4(0x50e)]!==this[_0x1896a4(0x2cd)][_0x1896a4(0x1e9)]())return!![];if(this['_eventScreenY']!==this[_0x1896a4(0x2cd)][_0x1896a4(0x26e)]())return!![];if(this[_0x1896a4(0x8a)]!==this[_0x1896a4(0x2cd)]['_labelWindow']['offsetX'])return!![];if(this[_0x1896a4(0xf7)]!==this[_0x1896a4(0x2cd)][_0x1896a4(0x471)][_0x1896a4(0xad)])return!![];if(this['_visiblePlayerX']!==$gamePlayer['x'])return!![];if(this[_0x1896a4(0x57b)]!==$gamePlayer['y'])return!![];if(this[_0x1896a4(0x150)]!==this[_0x1896a4(0x2cd)]['x'])return!![];if(this[_0x1896a4(0x297)]!==this[_0x1896a4(0x2cd)]['y'])return!![];if(this[_0x1896a4(0x301)]!==$gameSystem[_0x1896a4(0x19c)]())return!![];if(this[_0x1896a4(0x14c)]&&this[_0x1896a4(0x25f)]<0xff)return!![];if(!this['_cacheVisibility']&&this[_0x1896a4(0x25f)]>0x0)return!![];if(SceneManager[_0x1896a4(0x1bd)][_0x1896a4(0x2d1)]>0x0)return!![];return![];},Window_EventLabel[_0x39f07d(0x287)]['updateText']=function(){const _0x1bbcff=_0x39f07d;this['_event']['labelWindowText']()!==this['_text']&&(this[_0x1bbcff(0x3a1)]=this[_0x1bbcff(0x2cd)][_0x1bbcff(0x4fc)](),this['refresh']());},Window_EventLabel[_0x39f07d(0x287)][_0x39f07d(0x80)]=function(){const _0xd0ddae=_0x39f07d;this[_0xd0ddae(0x7c)]['x']=0x1/$gameScreen[_0xd0ddae(0x2f7)](),this['scale']['y']=0x1/$gameScreen[_0xd0ddae(0x2f7)](),this[_0xd0ddae(0x561)]=$gameScreen[_0xd0ddae(0x2f7)]();},Window_EventLabel['prototype'][_0x39f07d(0x1dd)]=function(){const _0x38b5c9=_0x39f07d;if(!SceneManager[_0x38b5c9(0x1bd)])return;if(!SceneManager[_0x38b5c9(0x1bd)][_0x38b5c9(0x359)])return;const _0xab3c2d=SceneManager[_0x38b5c9(0x1bd)]['_spriteset'][_0x38b5c9(0x93)](this[_0x38b5c9(0x2cd)]);if(!_0xab3c2d)return;this['x']=Math[_0x38b5c9(0x289)](this['_event']['screenX']()-Math[_0x38b5c9(0x167)](this[_0x38b5c9(0x5c3)]*this[_0x38b5c9(0x7c)]['x']/0x2)),this['x']+=this['_event'][_0x38b5c9(0x471)][_0x38b5c9(0xd6)],this['y']=this[_0x38b5c9(0x2cd)][_0x38b5c9(0x26e)]()-_0xab3c2d[_0x38b5c9(0x2db)],this['y']+=Math[_0x38b5c9(0x289)]($gameSystem[_0x38b5c9(0x48c)]()*0.5),this['y']-=Math[_0x38b5c9(0x289)](this[_0x38b5c9(0x2db)]*this[_0x38b5c9(0x7c)]['y']),this['y']+=this['_event'][_0x38b5c9(0x471)][_0x38b5c9(0xad)],this[_0x38b5c9(0x91)]=this[_0x38b5c9(0x2cd)]['_erased'],this['_eventScreenX']=this['_event'][_0x38b5c9(0x1e9)](),this[_0x38b5c9(0xf4)]=this['_event'][_0x38b5c9(0x26e)](),this[_0x38b5c9(0x8a)]=this[_0x38b5c9(0x2cd)]['_labelWindow'][_0x38b5c9(0xd6)],this['_eventLabelOffsetY']=this[_0x38b5c9(0x2cd)]['_labelWindow'][_0x38b5c9(0xad)],this['_eventPageIndex']=this['_event'][_0x38b5c9(0x5c5)];if(this['_eventErased']){if('dFGwp'===_0x38b5c9(0x268))this[_0x38b5c9(0x25f)]=0x0;else{_0x520920[_0x38b5c9(0x41c)][_0x38b5c9(0x31b)][_0x38b5c9(0x341)](this);if(this[_0x38b5c9(0x176)]===_0x4b88a6)this[_0x38b5c9(0x8b)]();this[_0x38b5c9(0x176)]=![];}}},Window_EventLabel[_0x39f07d(0x287)][_0x39f07d(0x7e)]=function(){const _0x1630da=_0x39f07d;if(this[_0x1630da(0x21f)]()){if(_0x1630da(0x1e1)===_0x1630da(0x1e1))this[_0x1630da(0x25f)]+=this[_0x1630da(0x231)]();else return this['moveAwayFromCharacter'](_0x2bf685);}else SceneManager[_0x1630da(0x1bd)][_0x1630da(0x2d1)]>0x0?this['contentsOpacity']=0x0:this[_0x1630da(0x25f)]-=this[_0x1630da(0x231)]();},Window_EventLabel[_0x39f07d(0x287)][_0x39f07d(0x21f)]=function(){const _0x39a7b0=_0x39f07d;if(!$gameSystem['eventLabelsVisible']())return![];if(this['_event']?.['_erased'])return![];if(SceneManager['_scene'][_0x39a7b0(0x2d1)]>0x0)return![];const _0x1a0e9c=$gamePlayer['x'],_0x211833=$gamePlayer['y'],_0x58824a=this['_event']['x'],_0x5d0467=this[_0x39a7b0(0x2cd)]['y'];if(this[_0x39a7b0(0x332)]===_0x1a0e9c&&this[_0x39a7b0(0x57b)]===_0x211833&&this[_0x39a7b0(0x150)]===_0x58824a&&this[_0x39a7b0(0x297)]===_0x5d0467){if(_0x39a7b0(0x181)!==_0x39a7b0(0x181)){const _0x490a9f=_0x3e4119[_0x39a7b0(0x57c)](_0x76c19e,_0x4ecc67),_0x138323=_0x13df50[_0x39a7b0(0xd8)](_0x2424af,_0x10bbb5),_0xe8c4e2=_0x4a4f2e['regionId'](_0x490a9f,_0x138323);return this[_0x39a7b0(0x322)][_0x39a7b0(0x310)](_0xe8c4e2);}else return this[_0x39a7b0(0x14c)];}this['_visiblePlayerX']=$gamePlayer['x'],this[_0x39a7b0(0x57b)]=$gamePlayer['y'],this[_0x39a7b0(0x150)]=this[_0x39a7b0(0x2cd)]['x'],this['_visibleEventY']=this[_0x39a7b0(0x2cd)]['y'];if($gameMap[_0x39a7b0(0x120)](_0x1a0e9c,_0x211833,_0x58824a,_0x5d0467)>this[_0x39a7b0(0x2cd)][_0x39a7b0(0x412)]())return this[_0x39a7b0(0x14c)]=![],![];return this[_0x39a7b0(0x14c)]=!![],!![];},Window_EventLabel[_0x39f07d(0x287)][_0x39f07d(0x231)]=function(){const _0x4efa2c=_0x39f07d;return VisuMZ[_0x4efa2c(0x41c)]['Settings'][_0x4efa2c(0x527)][_0x4efa2c(0x233)];},Window_EventLabel[_0x39f07d(0x287)]['resizeWindow']=function(){const _0x1f483b=_0x39f07d,_0x97a361=this[_0x1f483b(0x4b0)](this[_0x1f483b(0x3a1)]);this[_0x1f483b(0x5c3)]=_0x97a361[_0x1f483b(0x5c3)]+($gameSystem[_0x1f483b(0x48c)]()+this[_0x1f483b(0x36e)]())*0x2,this[_0x1f483b(0x2db)]=Math[_0x1f483b(0x2b0)](this[_0x1f483b(0x188)](),_0x97a361['height'])+$gameSystem[_0x1f483b(0x48c)]()*0x2,this[_0x1f483b(0x40c)]();},Window_EventLabel[_0x39f07d(0x287)]['lineHeight']=function(){const _0x24d2f2=_0x39f07d;return VisuMZ[_0x24d2f2(0x41c)][_0x24d2f2(0x2a4)]['Label'][_0x24d2f2(0x531)];},Window_EventLabel[_0x39f07d(0x287)]['resetFontSettings']=function(){const _0x9c4e64=_0x39f07d;Window_Base['prototype'][_0x9c4e64(0x42b)][_0x9c4e64(0x341)](this),this[_0x9c4e64(0x56e)][_0x9c4e64(0x2cf)]=this[_0x9c4e64(0xd0)]();},Window_EventLabel['prototype'][_0x39f07d(0xd0)]=function(){const _0x2db8a6=_0x39f07d;return VisuMZ['EventsMoveCore'][_0x2db8a6(0x2a4)][_0x2db8a6(0x527)][_0x2db8a6(0x522)];},Window_EventLabel[_0x39f07d(0x287)]['refresh']=function(){const _0x40dbbb=_0x39f07d;this['resizeWindow'](),this[_0x40dbbb(0x56e)][_0x40dbbb(0x32d)]();const _0x40f68e=this['_text'][_0x40dbbb(0x9a)](/[\r\n]+/);let _0x4e753a=0x0;for(const _0xdb9b9f of _0x40f68e){if(_0x40dbbb(0x31e)===_0x40dbbb(0x481)){const _0x26d59e=[_0x1ec5c0['_mapId'],_0x1f5811['_eventId'],_0x40dbbb(0x4cf)[_0x40dbbb(0x307)](_0x2c98b)];return _0x53983e[_0x40dbbb(0x319)](_0x26d59e);}else{const _0x2797f0=this[_0x40dbbb(0x4b0)](_0xdb9b9f),_0x5ba34a=Math[_0x40dbbb(0x167)]((this[_0x40dbbb(0x562)]-_0x2797f0['width'])/0x2);this[_0x40dbbb(0x1af)](_0xdb9b9f,_0x5ba34a,_0x4e753a),_0x4e753a+=_0x2797f0[_0x40dbbb(0x2db)];}}},Window_EventLabel[_0x39f07d(0x287)][_0x39f07d(0x117)]=function(_0x5b67ec,_0x5ee6a6){const _0x37fdba=_0x39f07d;_0x5ee6a6['drawing']&&this[_0x37fdba(0x121)](_0x5b67ec,_0x5ee6a6['x']+0x2,_0x5ee6a6['y']),_0x5ee6a6['x']+=Math[_0x37fdba(0x18f)](this['iconSize'](),ImageManager[_0x37fdba(0x205)])+0x4;},Window_EventLabel['prototype'][_0x39f07d(0x121)]=function(_0x516cf9,_0x590ef1,_0x4bf084){const _0x50753a=_0x39f07d,_0x15ba40=ImageManager['loadSystem']('IconSet'),_0x50e088=ImageManager['iconWidth'],_0x4d547d=ImageManager[_0x50753a(0x313)],_0x1f7b4b=_0x516cf9%0x10*_0x50e088,_0x493321=Math[_0x50753a(0x167)](_0x516cf9/0x10)*_0x4d547d,_0x1009ed=Math[_0x50753a(0x18f)](this['iconSize']()),_0x4539aa=Math[_0x50753a(0x18f)](this[_0x50753a(0x52f)]());this[_0x50753a(0x56e)][_0x50753a(0x518)](_0x15ba40,_0x1f7b4b,_0x493321,_0x50e088,_0x4d547d,_0x590ef1,_0x4bf084,_0x1009ed,_0x4539aa);},Window_EventLabel[_0x39f07d(0x287)][_0x39f07d(0x52f)]=function(){const _0x1a1cba=_0x39f07d;return VisuMZ[_0x1a1cba(0x41c)][_0x1a1cba(0x2a4)][_0x1a1cba(0x527)][_0x1a1cba(0x86)];};