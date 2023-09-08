//=============================================================================
// VisuStella MZ - Proximity Compass
// VisuMZ_4_ProximityCompass.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_ProximityCompass = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ProximityCompass = VisuMZ.ProximityCompass || {};
VisuMZ.ProximityCompass.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.08] [ProximityCompass]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Proximity_Compass_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a RPG Maker MZ plugin that adds a compass to the map screen, marking
 * the position of nearby events and the directions of far away events. Events
 * are represented by icons from the icon set. This can be used to help the
 * player locate objectives, points of interests, NPCs, and more.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Places a compass on the main map screen.
 * * Said compass will show the marked events on it with icons.
 * * Marked events will move around the compass relative to the player's
 *   current position on the map.
 * * Fade out marked events that are too far from the player's location.
 * * Minimap subfeature will display all of the passable tiles under the
 *   compass frame.
 * * Minimap can be toggled to a larger version shown on the middle of the
 *   screen displaying more of the map's data all at once.
 * * Use custom graphics to kit out the minimap to your liking.
 * * The compass can be turned on/off in the Options menu.
 * * The compass can also be resized in the Options menu.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_1_EventsMoveCore
 * 
 * Region marked passability using the Events and Movement Core region
 * restriction notetags will also be counted towards the creation of the
 * minimap. These are the notetags that will affect the minimap:
 * 
 *   <All Allow Region: x>
 *   <Player Allow Region: x>
 *   <All Forbid Region: x>
 *   <Player Forbid Region: x>
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
 * ---
 * 
 * === Map Notetags ===
 * 
 * ---
 *
 * <Hide Compass>
 *
 * - Used for: Map Notetags
 * - Place this notetag inside maps where you don't want the compass to show.
 *
 * ---
 * 
 * <Hide Minimap>
 * 
 * - Used for: Map Notetags
 * - Place this notetag inside maps where you don't want the minimap to show.
 * - The compass, however, can show by itself.
 * - However, if the compass does not show, neither will the minimap.
 * 
 * ---
 * 
 * <Minimap Image: filename>
 * 
 * - Used for: Map Notetags
 * - Place this notetag inside maps that you want to use custom minimaps for
 *   instead of the rendered passability map created by the plugin.
 * - This image will appear in both the compass's minimap and the toggled
 *   large minimap.
 * - This will remove any blend modes used by the large minimap to keep color
 *   consistency in line with the compass.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder.
 *   - Filenames are case sensitive.
 *   - Leave out the filename extension from the notetag.
 * - If the compass does not show, neither will the minimap.
 * 
 * ---
 * 
 * <Explorable>
 * 
 * - Used for: Map Notetags
 * - Place this notetag inside maps that you want to be explorable.
 * - The explorable portion will only appear with the toggled "large" minimap.
 * - This has no effect on maps where the compass does not show.
 * - This overrides the "Default Explorable?" Plugin Parameter settings.
 * 
 * ---
 * 
 * <Already Explored>
 * 
 * - Used for: Map Notetags
 * - Place this notetag inside maps that you want to be already explored.
 * - The whole map will be visible from the getgo when viewing the "large"
 *   version of the minimap.
 * - This has no effect on maps where the compass does not show.
 * - This overrides the "Default Explorable?" Plugin Parameter settings.
 * 
 * ---
 * 
 * === Event Notetags and Comment Tags ===
 * 
 * ---
 *
 * <Compass Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This will assign an icon to the event or the event's page.
 * - Replace 'x' with a number representing the icon index you wish for this
 *   event or event page to appear as in the Proximity Compass.
 * - This notetag effect will take priority over the <Minimap Icon: x> notetag.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Compass Proximity: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This icon will only appear on the compass if the player is within range.
 * - Replace 'x' with the number of tiles the player must be within range of
 *   this event or event page in order to appear in the Proximity Compass.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Minimap Icon: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This icon will only appear if there is no designated compass icon AND
 *   will ONLY appear on the large minimap.
 * - If <Compass Icon: x> is used, then <Compass Icon: x> will take priority.
 * - This is primarily used to mark NPC locations.
 * - This will override the setting found in the Plugin Parameters.
 * - Minimap icons will appear a different size (by default smaller) than
 *   events with <Compass Icon: x>.
 * 
 * ---
 * 
 * <Hide Minimap Icon>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Makes it so that it will not show an icon while on the minimap.
 * - If <Compass Icon: x> is used, then <Compass Icon: x> will take priority.
 * - This is primarily used to hide event locations that would be marked by
 *   default due to the Plugin Parameters.
 * - This will override the setting found in the Plugin Parameters.
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
 * === Compass Plugin Commands ===
 * 
 * ---
 *
 * Compass: Show/Hide Proximity Compass
 * - Show or hide the Proximity Compass.
 * - Does not bypass user settings.
 *
 *   Setting:
 *   - Show or hide the Proximity Compass.
 *   - Does not bypass user settings.
 *
 * ---
 *
 * Compass: Change Player Icon
 * - Change the player icon to a different icon.
 *
 *   Icon Index:
 *   - This is the icon you wish to change the player icon to.
 *
 * ---
 * 
 * === Minimap Plugin Commands ===
 * 
 * ---
 *
 * Minimap: Clear Explored Minimap
 * - Clears target map's exploration progress for the large minimap.
 * - Does not work on maps with <Already Explored> notetag.
 *
 *   Map ID:
 *   - ID of the map you wish to clear exploration progress for.
 *   - Use '0' for current map.
 *   - You may use JavaScript.
 *
 * ---
 *
 * Minimap: Fully Reveal Minimap
 * - Fully reveals the minimap for target map.
 *
 *   Map ID:
 *   - ID of the map you wish to reveal map for.
 *   - Use '0' for current map.
 *   - You may use JavaScript.
 *
 * ---
 *
 * Minimap: Toggle Large Minimap
 * - Show, hide, or toggle the large minimap.
 * - Requires Minimaps to be enabled.
 *
 *   Show/Hide?:
 *   - Show, hide, or toggle the large minimap.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Settings
 * ============================================================================
 *
 * Default settings used for the Proximity Compass.
 *
 * ---
 *
 * Default
 * 
 *   Show by Default:
 *   - Show the Proximity Compass by default?
 * 
 *   Proximity Range:
 *   - Default range from the player to be shown on the Proximity Compass.
 * 
 *   Player Icon:
 *   - Icon used for the player to show on the Proximity Compass.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Compass Settings
 * ============================================================================
 *
 * Compass settings used for the Proximity Compass.
 *
 * ---
 *
 * Position
 * 
 *   Center X:
 *   - Code used to calculate the X position of the compass's center.
 *   - This is NOT the upper left corner of the compass.
 * 
 *   Center Y:
 *   - Code used to calculate the Y position of the compass's center.
 *   - This is NOT the upper left corner of the compass.
 *
 * ---
 *
 * Contents
 * 
 *   Default Event Icons:
 *     
 *     Below Characters:
 *     - Default icon used for events on below characters level.
 *     - These appear on the compass and large minimap.
 * 
 *     Same as Characters:
 *     - Default icon used for events on same as characters level.
 *     - These appear on the compass and large minimap.
 * 
 *     Above Characters:
 *     - Default icon used for events on above characters level.
 *     - These appear on the compass and large minimap.
 * 
 *   Filename:
 *   - The picture used for the compass' frame.
 *   - This will come from the img/pictures/ folder.
 * 
 *   Radius:
 *   - Radius of the Proximity Compass in pixels.
 * 
 *   Tile Scale:
 *   - The scale used to calculate the distance of a tile relative to the
 *     distance on the compass
 * 
 *   Back Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Back Opacity:
 *   - Sets the opacity of the back color.
 *
 * ---
 *
 * Fading
 * 
 *   Close Minimum Opacity:
 *   - Minimum opacity when the player is too close to the compass on the
 *     map screen.
 *   - Hiding the compass during messages and events will make the compass
 *     fully transparent.
 * 
 *   Compass Fade Speed:
 *   - Fade speed of the compass when toggled on/off.
 *   - Lower is slower. Higher is faster.
 * 
 *   Icon Fade Speed:
 *   - Fade speed of the icons when out of range.
 *   - Lower is slower. Higher is faster.
 *
 * ---
 *
 * Hiding
 * 
 *   Hide During Messages:
 *   - If true, hide compass whenever a message is being displayed.
 * 
 *   Hide During Events:
 *   - If true, hide compass whenever an event is running.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Minimap Settings
 * ============================================================================
 *
 * As of the v1.06 update, this plugin now has a Minimap feature. This section
 * governs the minimap feature, if you want to use it, and how it appears.
 * 
 * A keyboard button can be used to toggle the "large" minimap (provided
 * minimaps are enabled for the current map). This minimap will show the areas
 * that are explored and not explored. As the player moves around, the
 * exploration area will enlarge based on the game's screen size.
 * 
 * For mouse toggling, we recommend using VisuStella MZ's Picture Common Events
 * and this plugin's "Minimap: Toggle Large Minimap" Plugin Command for the
 * best customization options.
 * 
 * The minimap used on the compass itself will always be fully revealed due to
 * its limited area of visibility.
 *
 * ---
 *
 * General
 * 
 *   Enable Minimap?:
 *   - Enable the minimap for the game? Cannot disable midgame.
 *   - The <Hide Minimap> map notetag can hide it though.
 *
 * ---
 *
 * Contents
 * 
 *   Filename:
 *   - Use this picture if current map uses a minimap.
 *   - This will come from the img/pictures/ folder.
 *   - If empty, it will use the filename used by the default compass.
 * 
 *   Hide Ceilings:
 *   - Ceiling autotiles are normally passable.
 *   - Hide them in the minimap?
 * 
 *   Tile Color:
 *   - Sets the color of the passable tiles found on the minimap.
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Tile Opacity:
 *   - What is the opacity level for the tiles?
 * 
 *   Tile Sharpness:
 *   - How sharp do you want the passability minimap to be?
 *   - Use a number from 2 to 16.
 *
 * ---
 * 
 * Large Minimap Settings
 * 
 *   Border Buffer:
 *   - Determine the buffer distance from the edge of the map when creating the
 *     large minimap.
 * 
 *   Default Event Icons:
 *     
 *     Below Characters:
 *     - Default icon used for events on below characters level.
 *     - These only appear on the large minimap.
 * 
 *     Same as Characters:
 *     - Default icon used for events on same as characters level.
 *     - These only appear on the large minimap.
 * 
 *     Above Characters:
 *     - Default icon used for events on above characters level.
 *     - These only appear on the large minimap.
 * 
 *   Default Explorable?:
 *   - By default, are maps explorable or already mapped?
 *   - Notetags will override this feature.
 * 
 *   Hide During Messages:
 *   - If true, hide large minimap whenever a message is being displayed.
 * 
 *   Hide During Events:
 *   - If true, hide large minimap whenever an event is running.
 * 
 *   Icon Scaling:
 * 
 *     Player Icon Scale:
 *     - What is the icon scale for the player icon?
 *     - Only applies to the large minimap.
 * 
 *     Compass Icon Scale:
 *     - What is the icon scale for <Compass Icon: x>?
 *     - Only applies to the large minimap.
 * 
 *     Minimap Icon Scale:
 *     - What is the icon scale for <Minimap Icon: x>?
 *     - Only applies to the large minimap.
 * 
 *   Ignore Icon Proximity:
 *   - If true, <Compass Proximity: x> notetag effects are ignored on the
 *     large minimap.
 * 
 *   Toggle Key:
 *   - What key is used to toggle the larger minimap on/off?
 *   - This feature is not usable unless the compass is enabled.
 *   - This feature won't trigger if there is a <Hide Minimap> notetag.
 * 
 * ---
 * 
 * Large Minimap Background Image
 * 
 *   Background Filename:
 *   - Use this picture if for the large minimap's background.
 *   - This will come from the img/pictures/ folder.
 * 
 *   Hide Background Color:
 *   - If true, hide the background color when using the minimap
 *     background image.
 * 
 *   Image Opacity:
 *   - Sets the opacity of the minimap background image.
 * 
 *   Minimap Blend Mode:
 *   - What kind of blend mode do you wish to apply to the rendered
 *     passability minimap?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings used for the Proximity Compass.
 *
 * ---
 *
 * Options
 * 
 *   Add Show Option?:
 *   - Add the 'Show Compass' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *   Add Size Option?:
 *   - Add the 'Compass Size' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
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
 * Version 1.08: October 6, 2022
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: August 11, 2022
 * * Feature Update!
 * ** Minimap can now no-longer be toggled during events and messages if the
 *    other minimap-related settings have it disabled. Update made by Arisu.
 * 
 * Version 1.06: June 16, 2022
 * * Documentation Update!
 * ** List new minimap feature under Introduction.
 * ** Added "VisuStella MZ Compatibility" for VisuMZ_1_EventsMoveCore in
 *    regards to the new Minimap feature.
 * ** Help file updated for new features.
 * ** Split the Notetags section up between "Map Notetags" and "Event Notetags"
 *    for better category searching.
 * ** Added segment to <Compass Icon: x> notetag:
 * *** This notetag effect will take priority over the <Minimap Icon: x>
 *     notetag.
 * * New Features!
 * ** New Plugin Parameter added by Olivia and sponsored by AndyL:
 * *** Plugin Parameters > Compass Settings > Contents > Default Event Icons
 * **** These settings allow you to set the default icons used for the compass
 *      based on their character priority level.
 * *** Plugin Parameters > Compass Settings > Fading > Close Minimum Opacity
 * **** Minimum opacity when the player is too close to the compass on the map
 *      screen. Hiding the compass during messages and events will make the
 *      compass fully transparent.
 * ** New Feature Set: Minimap, added by Olivia and sponsored by AndlyL:
 * *** Plugin Parameters > Minimap Settings
 * **** Read the help file for details.
 * ** New Notetags added by Olivia and sponsored by AndyL:
 * *** <Hide Minimap>
 * *** <Explorable>
 * *** <Already Explored>
 * *** <Minimap Icon: x>
 * *** <Hide Minimap Icon>
 * **** Read the help file for details.
 * ** New Plugin Commands added by Olivia and sponsored by AndyL:
 * *** Minimap: Clear Explored Minimap
 * *** Minimap: Fully Reveal Minimap
 * *** Minimap: Toggle Large Minimap
 * **** Read the help file for details.
 * 
 * Version 1.05: March 31, 2022
 * * Feature Update!
 * ** Spawned events with proximity compass icons will no longer show the whole
 *    spritesheet for a frame. Update made by Olivia.
 * 
 * Version 1.04: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: January 15, 2021
 * * Feature Update!
 * ** Failsafes added in case events added manually through other plugins do
 *    not update with proper events.
 * 
 * Version 1.02: November 15, 2020
 * * Bug Fix!
 * ** Events spawned by the Events & Movement Core will now have their compass
 *    icons displayed upon spawning without requiring a reload of the map. Fix
 *    made by Arisu.
 * 
 * Version 1.01: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 *
 * Version 1.00: October 23, 2020
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
 * @command CompassVisibility
 * @text Compass: Show/Hide Proximity Compass
 * @desc Show or hide the Proximity Compass.
 * Does not bypass user settings.
 *
 * @arg value:eval
 * @text Setting
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the Proximity Compass.
 * Does not bypass user settings.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CompassPlayerIcon
 * @text Compass: Change Player Icon
 * @desc Change the player icon to a different icon.
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @desc This is the icon you wish to change the player icon to.
 * @default 82
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Minimap
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MinimapClearExplored
 * @text Minimap: Clear Explored Minimap
 * @desc Clears target map's exploration progress for the large minimap.
 * Does not work on maps with <Already Explored> notetag.
 *
 * @arg MapID:eval
 * @text Map ID
 * @desc ID of the map you wish to clear exploration progress for.
 * Use '0' for current map. You may use JavaScript.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MinimapFullExplore
 * @text Minimap: Fully Reveal Minimap
 * @desc Fully reveals the minimap for target map.
 *
 * @arg MapID:eval
 * @text Map ID
 * @desc ID of the map you wish to reveal map for.
 * Use '0' for current map. You may use JavaScript.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MinimapToggle
 * @text Minimap: Toggle Large Minimap
 * @desc Show, hide, or toggle the large minimap.
 * Requires Minimaps to be enabled.
 *
 * @arg Value:str
 * @text Show/Hide?
 * @type select
 * @option Show
 * @value show
 * @option Hide
 * @value hide
 * @option Toggle
 * @value toggle
 * @desc Show, hide, or toggle the large minimap.
 * @default toggle
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
 * @param ProximityCompass
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Default:struct
 * @text Default Settings
 * @type struct<Default>
 * @desc Default settings used for the Proximity Compass.
 * @default {"Show:eval":"true","Proximity:num":"1000","PlayerIcon:num":"82"}
 *
 * @param Compass:struct
 * @text Compass Settings
 * @type struct<Compass>
 * @desc Compass settings used for the Proximity Compass.
 * @default {"Position":"","CenterX:str":"Graphics.width - 128 * ConfigManager.compassSize / 100","CenterY:str":"Graphics.height - 128 * ConfigManager.compassSize / 100","Contents":"","DefaultEventIcons":"","DefaultEventIcon_Below:num":"0","DefaultEventIcon_Same:num":"0","DefaultEventIcon_Above:num":"0","Filename:str":"","Radius:num":"100","TileScale:num":"0.25","BackColor:str":"#000000","BackOpacity:num":"200","Fading":"","MinCompassOpacity:num":"128","CompassFadeSpeed:num":"16","IconFadeSpeed:num":"16","Hiding":"","HideMessage:eval":"false","HideEvents:eval":"false"}
 *
 * @param Minimap:struct
 * @text Minimap Settings
 * @type struct<Minimap>
 * @desc Minimap settings used for the Proximity Compass.
 * @default {"General":"","Enable:eval":"true","Contents":"","Filename:str":"","HideCeilingPassability:eval":"true","TileColor:str":"#ccccff","TileOpacity:num":"128","TileSharpness:num":"8","Large":"","BorderBuffer:num":"72","DefaultEventIcons":"","DefaultEventIcon_Below:num":"0","DefaultEventIcon_Same:num":"20","DefaultEventIcon_Above:num":"0","DefaultExplore:eval":"true","HideMessage:eval":"true","HideEvents:eval":"true","IconScale":"","PlayerIconScale:num":"1.00","CompassIconScale:num":"1.00","MinimapIconScale:num":"0.50","IgnoreProximity:eval":"true","ToggleKey:str":"tab","LargeBack":"","BackFilename:str":"","HideBackColor:eval":"true","ImageOpacity:num":"255","PassabilityBlendMode:num":"2"}
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings used for the Proximity Compass.
 * @default {"AddShowOption:eval":"true","ShowName:str":"Show Compass","AddSizeOption:eval":"true","SizeName:str":"Compass Size","AdjustRect:eval":"true"}
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
 * Default Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Default:
 *
 * @param Show:eval
 * @text Show by Default
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Proximity Compass by default?
 * @default true
 *
 * @param Proximity:num
 * @text Proximity Range
 * @type number
 * @min 1
 * @max 1000
 * @desc Default range from the player to be shown on the Proximity Compass.
 * @default 1000
 *
 * @param PlayerIcon:num
 * @text Player Icon
 * @desc Icon used for the player to show on the Proximity Compass.
 * @default 82
 *
 */
/* ----------------------------------------------------------------------------
 * Compass Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Compass:
 *
 * @param Position
 *
 * @param CenterX:str
 * @text Center X
 * @parent Position
 * @desc Code used to calculate the X position of the compass's center.
 * This is NOT the upper left corner of the compass.
 * @default Graphics.width - 128 * ConfigManager.compassSize / 100
 *
 * @param CenterY:str
 * @text Center Y
 * @parent Position
 * @desc Code used to calculate the Y position of the compass's center.
 * This is NOT the upper left corner of the compass.
 * @default Graphics.height - 128 * ConfigManager.compassSize / 100
 *
 * @param Contents
 * 
 * @param DefaultEventIcons
 * @text Default Event Icons
 * @parent Contents
 * 
 * @param DefaultEventIcon_Below:num
 * @text Below Characters
 * @parent DefaultEventIcons
 * @type number
 * @min 0
 * @desc Default icon used for events on below characters level.
 * These appear on the compass and large minimap.
 * @default 0
 * 
 * @param DefaultEventIcon_Same:num
 * @text Same as Characters
 * @parent DefaultEventIcons
 * @type number
 * @min 0
 * @desc Default icon used for events on same as characters level.
 * These appear on the compass and large minimap.
 * @default 0
 * 
 * @param DefaultEventIcon_Above:num
 * @text Above Characters
 * @parent DefaultEventIcons
 * @type number
 * @min 0
 * @desc Default icon used for events on above characters level.
 * These appear on the compass and large minimap.
 * @default 0
 *
 * @param Filename:str
 * @text Filename
 * @parent Contents
 * @type file
 * @dir img/pictures/
 * @desc The picture used for the compass' frame.
 * This will come from the img/pictures/ folder.
 * @default 
 *
 * @param Radius:num
 * @text Radius
 * @parent Contents
 * @type number
 * @min 1
 * @desc Radius of the Proximity Compass in pixels.
 * @default 100
 *
 * @param TileScale:num
 * @text Tile Scale
 * @parent Contents
 * @desc The scale used to calculate the distance of a tile relative to the distance on the compass
 * @default 0.25
 *
 * @param BackColor:str
 * @text Back Color
 * @parent Contents
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #000000
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent Contents
 * @type number
 * @min 1
 * @max 255
 * @desc Sets the opacity of the back color.
 * @default 200
 *
 * @param Fading
 *
 * @param MinCompassOpacity:num
 * @text Close Minimum Opacity
 * @parent Fading
 * @type number
 * @min 0
 * @desc Minimum opacity when the player is too close to the
 * compass on the map screen.
 * @default 128
 *
 * @param CompassFadeSpeed:num
 * @text Compass Fade Speed
 * @parent Fading
 * @type number
 * @min 1
 * @desc Fade speed of the compass when toggled on/off.
 * Lower is slower. Higher is faster.
 * @default 16
 *
 * @param IconFadeSpeed:num
 * @text Icon Fade Speed
 * @parent Fading
 * @type number
 * @min 1
 * @desc Fade speed of the icons when out of range.
 * Lower is slower. Higher is faster.
 * @default 16
 *
 * @param Hiding
 *
 * @param HideMessage:eval
 * @text Hide During Messages
 * @parent Hiding
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide compass whenever a message is being displayed.
 * @default false
 *
 * @param HideEvents:eval
 * @text Hide During Events
 * @parent Hiding
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide compass whenever an event is running.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Minimap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Minimap:
 *
 * @param General
 * 
 * @param Enable:eval
 * @text Enable Minimap?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the minimap for the game? Cannot disable midgame.
 * The <Hide Minimap> map notetag can hide it though.
 * @default true
 *
 * @param Contents
 *
 * @param Filename:str
 * @text Filename
 * @parent Contents
 * @type file
 * @dir img/pictures/
 * @desc Use this picture if current map uses a minimap.
 * This will come from the img/pictures/ folder.
 * @default 
 *
 * @param HideCeilingPassability:eval
 * @text Hide Ceilings
 * @parent Contents
 * @type boolean
 * @on Hide
 * @off Show
 * @desc Ceiling autotiles are normally passable.
 * Hide them in the minimap?
 * @default true
 *
 * @param TileColor:str
 * @text Tile Color
 * @parent Contents
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ccccff
 *
 * @param TileOpacity:num
 * @text Tile Opacity
 * @parent Contents
 * @type number
 * @min 1
 * @max 255
 * @desc What is the opacity level for the tiles?
 * @default 128
 *
 * @param TileSharpness:num
 * @text Tile Sharpness
 * @parent Contents
 * @type number
 * @min 2
 * @max 16
 * @desc How sharp do you want the passability minimap to be?
 * Use a number from 2 to 16.
 * @default 8
 * 
 * @param Large
 * @text Large Minimap Settings
 * 
 * @param BorderBuffer:num
 * @text Border Buffer
 * @parent Large
 * @type number
 * @min 0
 * @desc Determine the buffer distance from the edge of the map
 * when creating the large minimap.
 * @default 72
 * 
 * @param DefaultEventIcons
 * @text Default Event Icons
 * @parent Large
 * 
 * @param DefaultEventIcon_Below:num
 * @text Below Characters
 * @parent DefaultEventIcons
 * @type number
 * @min 0
 * @desc Default icon used for events on below characters level.
 * These only appear on the large minimap.
 * @default 0
 * 
 * @param DefaultEventIcon_Same:num
 * @text Same as Characters
 * @parent DefaultEventIcons
 * @type number
 * @min 0
 * @desc Default icon used for events on same as characters level.
 * These only appear on the large minimap.
 * @default 20
 * 
 * @param DefaultEventIcon_Above:num
 * @text Above Characters
 * @parent DefaultEventIcons
 * @type number
 * @min 0
 * @desc Default icon used for events on above characters level.
 * These only appear on the large minimap.
 * @default 0
 * 
 * @param DefaultExplore:eval
 * @text Default Explorable?
 * @parent Large
 * @type boolean
 * @on Explorable
 * @off Already Mapped
 * @desc By default, are maps explorable or already mapped?
 * Notetags will override this feature.
 * @default true
 *
 * @param HideMessage:eval
 * @text Hide During Messages
 * @parent Large
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide large minimap whenever a message is being displayed.
 * @default true
 *
 * @param HideEvents:eval
 * @text Hide During Events
 * @parent Large
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide large minimap whenever an event is running.
 * @default true
 * 
 * @param IconScale
 * @text Icon Scaling
 * @parent Large
 *
 * @param PlayerIconScale:num
 * @text Player Icon Scale
 * @parent IconScale
 * @desc What is the icon scale for the player icon?
 * Only applies to the large minimap.
 * @default 1.00
 *
 * @param CompassIconScale:num
 * @text Compass Icon Scale
 * @parent IconScale
 * @desc What is the icon scale for <Compass Icon: x>?
 * Only applies to the large minimap.
 * @default 1.00
 *
 * @param MinimapIconScale:num
 * @text Minimap Icon Scale
 * @parent IconScale
 * @desc What is the icon scale for <Minimap Icon: x>?
 * Only applies to the large minimap.
 * @default 0.50
 *
 * @param IgnoreProximity:eval
 * @text Ignore Icon Proximity
 * @parent Large
 * @type boolean
 * @on Ignore
 * @off Normal
 * @desc If true, <Compass Proximity: x> notetag effects are
 * ignored on the large minimap.
 * @default true
 * 
 * @param ToggleKey:str
 * @text Toggle Key
 * @parent Large
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc What key is used to toggle the larger minimap on/off?
 * @default tab
 * 
 * @param LargeBack
 * @text Large Minimap Image
 *
 * @param BackFilename:str
 * @text Background Filename
 * @parent LargeBack
 * @type file
 * @dir img/pictures/
 * @desc Use this picture if for the large minimap's background.
 * This will come from the img/pictures/ folder.
 * @default 
 *
 * @param HideBackColor:eval
 * @text Hide Background Color
 * @parent LargeBack
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide the background color when using the minimap
 * background image.
 * @default true
 * 
 * @param ImageOpacity:num
 * @text Image Opacity
 * @parent LargeBack
 * @type number
 * @min 1
 * @max 255
 * @desc Sets the opacity of the minimap background image.
 * @default 255
 *
 * @param PassabilityBlendMode:num
 * @text Minimap Blend Mode
 * @parent LargeBack
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the
 * rendered passability minimap?
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param AddShowOption:eval
 * @text Add Show Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Compass' option to the Options menu?
 * @default true
 *
 * @param ShowName:str
 * @text Option Name
 * @parent AddShowOption:eval
 * @desc Command name of the option.
 * @default Show Compass
 *
 * @param AddSizeOption:eval
 * @text Add Size Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Compass Size' option to the Options menu?
 * @default true
 *
 * @param SizeName:str
 * @text Option Name
 * @parent AddSizeOption:eval
 * @desc Command name of the option.
 * @default Compass Size
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 */
//=============================================================================

const _0x1730b4=_0x106d;function _0x106d(_0x54ec01,_0x256e63){const _0x2ba72b=_0x2ba7();return _0x106d=function(_0x106d46,_0x1d6650){_0x106d46=_0x106d46-0xda;let _0x471fc6=_0x2ba72b[_0x106d46];return _0x471fc6;},_0x106d(_0x54ec01,_0x256e63);}(function(_0x410169,_0x2e07fc){const _0x2476d9=_0x106d,_0x6072=_0x410169();while(!![]){try{const _0x162a2b=-parseInt(_0x2476d9(0x21d))/0x1+parseInt(_0x2476d9(0x24c))/0x2*(parseInt(_0x2476d9(0x16d))/0x3)+-parseInt(_0x2476d9(0x24d))/0x4+-parseInt(_0x2476d9(0x217))/0x5*(-parseInt(_0x2476d9(0x19a))/0x6)+parseInt(_0x2476d9(0xe1))/0x7+-parseInt(_0x2476d9(0x1c9))/0x8+-parseInt(_0x2476d9(0x205))/0x9;if(_0x162a2b===_0x2e07fc)break;else _0x6072['push'](_0x6072['shift']());}catch(_0x5186fc){_0x6072['push'](_0x6072['shift']());}}}(_0x2ba7,0x9ee9a));var label=_0x1730b4(0x10a),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1730b4(0x1d3)](function(_0x32fb7e){const _0xd1b8a2=_0x1730b4;return _0x32fb7e[_0xd1b8a2(0x10e)]&&_0x32fb7e[_0xd1b8a2(0x102)][_0xd1b8a2(0x1f7)]('['+label+']');})[0x0];VisuMZ[label][_0x1730b4(0xee)]=VisuMZ[label][_0x1730b4(0xee)]||{},VisuMZ[_0x1730b4(0x1c4)]=function(_0x4aba3c,_0x3a0c7f){const _0x3e7e4a=_0x1730b4;for(const _0x3076fb in _0x3a0c7f){if(_0x3076fb[_0x3e7e4a(0x221)](/(.*):(.*)/i)){const _0xb41b06=String(RegExp['$1']),_0x47c8e5=String(RegExp['$2'])[_0x3e7e4a(0x245)]()['trim']();let _0x110c88,_0x303f60,_0x47ecbf;switch(_0x47c8e5){case'NUM':_0x110c88=_0x3a0c7f[_0x3076fb]!==''?Number(_0x3a0c7f[_0x3076fb]):0x0;break;case _0x3e7e4a(0x22e):_0x303f60=_0x3a0c7f[_0x3076fb]!==''?JSON[_0x3e7e4a(0x1ea)](_0x3a0c7f[_0x3076fb]):[],_0x110c88=_0x303f60[_0x3e7e4a(0x1ec)](_0x49188f=>Number(_0x49188f));break;case'EVAL':_0x110c88=_0x3a0c7f[_0x3076fb]!==''?eval(_0x3a0c7f[_0x3076fb]):null;break;case _0x3e7e4a(0x1f2):_0x303f60=_0x3a0c7f[_0x3076fb]!==''?JSON[_0x3e7e4a(0x1ea)](_0x3a0c7f[_0x3076fb]):[],_0x110c88=_0x303f60[_0x3e7e4a(0x1ec)](_0x289194=>eval(_0x289194));break;case'JSON':_0x110c88=_0x3a0c7f[_0x3076fb]!==''?JSON[_0x3e7e4a(0x1ea)](_0x3a0c7f[_0x3076fb]):'';break;case _0x3e7e4a(0x235):_0x303f60=_0x3a0c7f[_0x3076fb]!==''?JSON[_0x3e7e4a(0x1ea)](_0x3a0c7f[_0x3076fb]):[],_0x110c88=_0x303f60['map'](_0x22297e=>JSON[_0x3e7e4a(0x1ea)](_0x22297e));break;case'FUNC':_0x110c88=_0x3a0c7f[_0x3076fb]!==''?new Function(JSON['parse'](_0x3a0c7f[_0x3076fb])):new Function(_0x3e7e4a(0x10b));break;case'ARRAYFUNC':_0x303f60=_0x3a0c7f[_0x3076fb]!==''?JSON[_0x3e7e4a(0x1ea)](_0x3a0c7f[_0x3076fb]):[],_0x110c88=_0x303f60[_0x3e7e4a(0x1ec)](_0x3648bc=>new Function(JSON[_0x3e7e4a(0x1ea)](_0x3648bc)));break;case'STR':_0x110c88=_0x3a0c7f[_0x3076fb]!==''?String(_0x3a0c7f[_0x3076fb]):'';break;case _0x3e7e4a(0x139):_0x303f60=_0x3a0c7f[_0x3076fb]!==''?JSON[_0x3e7e4a(0x1ea)](_0x3a0c7f[_0x3076fb]):[],_0x110c88=_0x303f60['map'](_0xafcb82=>String(_0xafcb82));break;case _0x3e7e4a(0x246):_0x47ecbf=_0x3a0c7f[_0x3076fb]!==''?JSON['parse'](_0x3a0c7f[_0x3076fb]):{},_0x110c88=VisuMZ['ConvertParams']({},_0x47ecbf);break;case _0x3e7e4a(0xf8):_0x303f60=_0x3a0c7f[_0x3076fb]!==''?JSON[_0x3e7e4a(0x1ea)](_0x3a0c7f[_0x3076fb]):[],_0x110c88=_0x303f60['map'](_0x542121=>VisuMZ[_0x3e7e4a(0x1c4)]({},JSON[_0x3e7e4a(0x1ea)](_0x542121)));break;default:continue;}_0x4aba3c[_0xb41b06]=_0x110c88;}}return _0x4aba3c;},(_0x138854=>{const _0x39e58c=_0x1730b4,_0xe1f16d=_0x138854[_0x39e58c(0x1d4)];for(const _0xc2e7f8 of dependencies){if(!Imported[_0xc2e7f8]){alert(_0x39e58c(0xf6)[_0x39e58c(0x249)](_0xe1f16d,_0xc2e7f8)),SceneManager['exit']();break;}}const _0xc6d847=_0x138854['description'];if(_0xc6d847[_0x39e58c(0x221)](/\[Version[ ](.*?)\]/i)){const _0x58a9f0=Number(RegExp['$1']);if(_0x58a9f0!==VisuMZ[label]['version']){if(_0x39e58c(0x23e)!=='XKrfi')return![];else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x39e58c(0x249)](_0xe1f16d,_0x58a9f0)),SceneManager['exit']();}}if(_0xc6d847[_0x39e58c(0x221)](/\[Tier[ ](\d+)\]/i)){if('GPQdF'==='TOOsZ'){this['_ProximityCompassFrameSprite']=new _0xfdb6c0(),this['addChild'](this[_0x39e58c(0x16c)]),this[_0x39e58c(0x16c)][_0x39e58c(0x1fe)]['x']=0.5,this[_0x39e58c(0x16c)][_0x39e58c(0x1fe)]['y']=0.5;const _0x5c4042=this[_0x39e58c(0xdc)]();;_0x5c4042?this[_0x39e58c(0x16c)][_0x39e58c(0x1a8)]=_0x3bf8f6[_0x39e58c(0x1bd)](_0x5c4042):this[_0x39e58c(0x16c)][_0x39e58c(0x1a8)]=_0x2b08d6[_0x39e58c(0x145)];}else{const _0x469e08=Number(RegExp['$1']);if(_0x469e08<tier)_0x39e58c(0x18e)===_0x39e58c(0xe5)?this[_0x39e58c(0x1fa)]+=_0x28bbe3:(alert(_0x39e58c(0x112)[_0x39e58c(0x249)](_0xe1f16d,_0x469e08,tier)),SceneManager['exit']());else{if(_0x39e58c(0x17e)!==_0x39e58c(0x203))tier=Math[_0x39e58c(0x11d)](_0x469e08,tier);else{if(!this[_0x39e58c(0x17d)])return;const _0x4d9efa=this[_0x39e58c(0x17d)][_0x39e58c(0x1a8)];_0x4d9efa['clear'](),this[_0x39e58c(0x211)]=-0x32,this['_lastPlayerY']=-0x32,this[_0x39e58c(0x1c1)]();}}}}VisuMZ[_0x39e58c(0x1c4)](VisuMZ[label][_0x39e58c(0xee)],_0x138854[_0x39e58c(0x163)]);})(pluginData),PluginManager[_0x1730b4(0x1f5)](pluginData['name'],_0x1730b4(0x148),_0x489c78=>{const _0x7d6776=_0x1730b4;VisuMZ[_0x7d6776(0x1c4)](_0x489c78,_0x489c78);const _0x5a1d3d=_0x489c78[_0x7d6776(0x1fb)];$gameSystem[_0x7d6776(0x1e8)](_0x5a1d3d);}),PluginManager[_0x1730b4(0x1f5)](pluginData[_0x1730b4(0x1d4)],_0x1730b4(0x18b),_0x458cc7=>{const _0x4438a3=_0x1730b4;VisuMZ[_0x4438a3(0x1c4)](_0x458cc7,_0x458cc7);const _0x5e78ce=_0x458cc7[_0x4438a3(0x1ce)];$gameSystem[_0x4438a3(0x17c)](_0x5e78ce);}),PluginManager[_0x1730b4(0x1f5)](pluginData[_0x1730b4(0x1d4)],'MinimapClearExplored',_0x245b43=>{const _0xcbc034=_0x1730b4;if(!Sprite_ProximityMinimap[_0xcbc034(0x101)])return;VisuMZ['ConvertParams'](_0x245b43,_0x245b43);let _0x53c6a3=_0x245b43[_0xcbc034(0xed)]||0x0;if(_0x53c6a3<=0x0)_0x53c6a3=$gameMap[_0xcbc034(0x16b)]();$gameMap[_0xcbc034(0x19d)](_0x53c6a3);if(_0x53c6a3===$gameMap[_0xcbc034(0x16b)]()){const _0x17b905=SceneManager[_0xcbc034(0x159)];if(_0x17b905){if(_0xcbc034(0x1bf)==='IeSop'){const _0x237ced=_0x17b905[_0xcbc034(0x1b5)];_0x237ced&&_0x237ced['clearUnexploredMask']();}else{const _0x2cced4=_0x6d3c2f[_0xcbc034(0x192)],_0x205e28='showCompass';this[_0xcbc034(0x243)](_0x2cced4,_0x205e28);}}}}),PluginManager['registerCommand'](pluginData[_0x1730b4(0x1d4)],_0x1730b4(0x242),_0x18a4c4=>{const _0x20c582=_0x1730b4;if(!Sprite_ProximityMinimap[_0x20c582(0x101)])return;VisuMZ[_0x20c582(0x1c4)](_0x18a4c4,_0x18a4c4);let _0x4746f2=_0x18a4c4['MapID']||0x0;if(_0x4746f2<=0x0)_0x4746f2=$gameMap[_0x20c582(0x16b)]();$gameMap['addFullRevealMinimap'](_0x4746f2);if(_0x4746f2===$gameMap[_0x20c582(0x16b)]()){if(_0x20c582(0x1de)!==_0x20c582(0x1de))this['initialize'][_0x20c582(0x10f)](this,arguments);else{const _0x19ee8a=SceneManager[_0x20c582(0x159)];if(_0x19ee8a){const _0x514ecc=_0x19ee8a['_ProximityMinimap'];if(_0x514ecc){if(_0x20c582(0x1cc)!==_0x20c582(0x1cc)){if(!this[_0x20c582(0x231)]())return;const _0x25debf=_0x13dbcc[_0x20c582(0x20c)];this[_0x20c582(0x129)]=new _0x2d2f80(),this['_pictureBackSprite'][_0x20c582(0x1a8)]=_0x471736[_0x20c582(0x1bd)](_0x25debf),this['addChild'](this[_0x20c582(0x129)]),this[_0x20c582(0x129)][_0x20c582(0x1fe)]['x']=0.5,this['_pictureBackSprite'][_0x20c582(0x1fe)]['y']=0.5,this[_0x20c582(0x129)][_0x20c582(0x1fa)]=_0x3c9ec5[_0x20c582(0x135)];}else _0x514ecc['fullRevealUnexploredMask']();}}}}}),PluginManager['registerCommand'](pluginData[_0x1730b4(0x1d4)],_0x1730b4(0x188),_0x2421ff=>{const _0x42a6ea=_0x1730b4;if(!Sprite_ProximityMinimap[_0x42a6ea(0x101)])return;if($gameMap[_0x42a6ea(0x248)]())return;VisuMZ[_0x42a6ea(0x1c4)](_0x2421ff,_0x2421ff);const _0x33bc5f=_0x2421ff['Value'];switch(_0x33bc5f[_0x42a6ea(0x191)]()['trim']()){case _0x42a6ea(0x11b):$gameSystem[_0x42a6ea(0x185)](!![]);break;case'hide':$gameSystem[_0x42a6ea(0x185)](![]);break;case _0x42a6ea(0x1c8):const _0x4e5e18=!$gameSystem[_0x42a6ea(0x195)]();$gameSystem[_0x42a6ea(0x185)](_0x4e5e18);break;}}),ImageManager[_0x1730b4(0x1bc)]=function(){const _0x44b077=_0x1730b4;this[_0x44b077(0x162)]=this[_0x44b077(0x162)]||{};const _0x8b15fa=$gameMap[_0x44b077(0x16b)]();if(!this['_passabilityMinimaps'][_0x8b15fa]){const _0x7c451f=this['createPassabilityMinimap']();this[_0x44b077(0x162)][_0x8b15fa]=_0x7c451f;}return this['_passabilityMinimaps'][_0x8b15fa];},ImageManager['clearPassabilityMinimap']=function(_0x4ea63b){const _0x5a34c4=_0x1730b4;this[_0x5a34c4(0x162)]=this[_0x5a34c4(0x162)]||{},delete this[_0x5a34c4(0x162)][_0x4ea63b];},ImageManager[_0x1730b4(0x1e6)]=function(){const _0x4a959e=_0x1730b4,_0x5b2d4a=$gameMap[_0x4a959e(0x1e3)](),_0x4d8cd4=$gameMap[_0x4a959e(0x225)](),_0x563066=_0x5b2d4a?0x3:0x1,_0x4f1ac8=_0x4d8cd4?0x3:0x1,_0x59fe6c=Sprite_ProximityMinimap['TILE_SIZE'],_0x40e4b8=$gameMap[_0x4a959e(0x167)](),_0x39985e=$gameMap[_0x4a959e(0x223)](),_0x42ef9e=new Bitmap(_0x40e4b8*_0x563066*_0x59fe6c,_0x39985e*_0x4f1ac8*_0x59fe6c);_0x42ef9e[_0x4a959e(0x1ef)]=!![];const _0x7b1775=ColorManager['minimapPassableColor'](),_0xe36093=[0x50,0x51,0x52,0x53,0x54,0x55,0x56,0x57];_0xe36093['push'](0x60,0x61,0x62,0x63,0x64,0x65,0x66,0x67),_0xe36093['push'](0x70,0x71,0x72,0x73,0x74,0x75,0x76,0x77);for(let _0x5f49d8=0x0;_0x5f49d8<_0x40e4b8;_0x5f49d8++){for(let _0xa90fab=0x0;_0xa90fab<_0x39985e;_0xa90fab++){if(_0x4a959e(0x13e)!==_0x4a959e(0x13e))_0x48b619*=_0x20268f[_0x4a959e(0x155)];else{if($gameMap[_0x4a959e(0x200)](_0x5f49d8,_0xa90fab)){if(_0x4a959e(0x1ff)===_0x4a959e(0x1fd)){var _0x8a0bfd=this[_0x4a959e(0x1d7)](),_0x1b7956=_0x481f0b[_0x4a959e(0x204)](this[_0x4a959e(0x12e)][_0x4a959e(0x1a5)],_0x7ed7e6[_0x4a959e(0x1a5)]),_0x7a4509=_0x6dbd4e[_0x4a959e(0x204)](this[_0x4a959e(0x12e)][_0x4a959e(0xe6)],_0x26e3a1['_realY']);const _0xd4affc=_0xde368f[_0x4a959e(0x10a)][_0x4a959e(0xee)][_0x4a959e(0x125)][_0x4a959e(0x228)];_0x8a0bfd>=_0x5b463b[_0x4a959e(0x105)](_0x1b7956)+_0x2e338a[_0x4a959e(0x105)](_0x7a4509)?this[_0x4a959e(0x1fa)]+=_0xd4affc:this[_0x4a959e(0x1fa)]-=_0xd4affc;}else{if(Imported[_0x4a959e(0x1b3)]){const _0x26d3bc=$gameMap[_0x4a959e(0x14f)],_0x2570f7=$gameMap['regionId'](_0x5f49d8,_0xa90fab);if(_0x26d3bc[_0x4a959e(0x190)][_0x4a959e(0x1f7)](_0x2570f7))continue;if(_0x26d3bc[_0x4a959e(0x1c6)][_0x4a959e(0x1f7)](_0x2570f7))continue;}if(Sprite_ProximityMinimap[_0x4a959e(0x1be)]){if(_0xe36093['includes']($gameMap['autotileType'](_0x5f49d8,_0xa90fab,0x0)))continue;if(_0xe36093[_0x4a959e(0x1f7)]($gameMap[_0x4a959e(0x199)](_0x5f49d8,_0xa90fab,0x1)))continue;if(_0xe36093[_0x4a959e(0x1f7)]($gameMap[_0x4a959e(0x199)](_0x5f49d8,_0xa90fab,0x2)))continue;if(_0xe36093[_0x4a959e(0x1f7)]($gameMap[_0x4a959e(0x199)](_0x5f49d8,_0xa90fab,0x3)))continue;if(_0xe36093['includes']($gameMap[_0x4a959e(0x199)](_0x5f49d8,_0xa90fab,0x4)))continue;}for(let _0x177d65=0x0;_0x177d65<_0x563066;_0x177d65++){if(_0x4a959e(0x166)===_0x4a959e(0x1b0))_0x1ea86a[_0x4a959e(0x178)](_0x2c19fd,_0x2f1af9,_0x47b9c9,0x1);else for(let _0x497d7d=0x0;_0x497d7d<_0x4f1ac8;_0x497d7d++){if(_0x4a959e(0xfb)===_0x4a959e(0xfb)){const _0x4e0bfd=(_0x5f49d8+_0x40e4b8*_0x177d65)*_0x59fe6c,_0x3ab795=(_0xa90fab+_0x39985e*_0x497d7d)*_0x59fe6c;_0x42ef9e[_0x4a959e(0x1e1)](_0x4e0bfd,_0x3ab795,_0x59fe6c,_0x59fe6c,_0x7b1775);if(Imported['VisuMZ_1_EventsMoveCore']){const _0x5515eb=$gameMap[_0x4a959e(0x14f)],_0x531a52=$gameMap[_0x4a959e(0x16a)](_0x5f49d8,_0xa90fab);if(_0x5515eb['AllAllow'][_0x4a959e(0x1f7)](_0x531a52))continue;if(_0x5515eb[_0x4a959e(0x1ae)]['includes'](_0x531a52))continue;}!$gameMap['isPassable'](_0x5f49d8,_0xa90fab,0x2)&&_0x42ef9e[_0x4a959e(0x178)](_0x4e0bfd,_0x3ab795+_0x59fe6c-0x1,_0x59fe6c,0x1);!$gameMap[_0x4a959e(0x1ca)](_0x5f49d8,_0xa90fab,0x4)&&_0x42ef9e[_0x4a959e(0x178)](_0x4e0bfd,_0x3ab795,0x1,_0x59fe6c);!$gameMap[_0x4a959e(0x1ca)](_0x5f49d8,_0xa90fab,0x6)&&_0x42ef9e[_0x4a959e(0x178)](_0x4e0bfd+_0x59fe6c-0x1,_0x3ab795,0x1,_0x59fe6c);if(!$gameMap[_0x4a959e(0x1ca)](_0x5f49d8,_0xa90fab,0x8)){if(_0x4a959e(0x12c)===_0x4a959e(0x12c))_0x42ef9e['clearRect'](_0x4e0bfd,_0x3ab795,_0x59fe6c,0x1);else{const _0xf9ddea=_0x43e6b2[_0x4a959e(0x10a)]['Settings']['Compass'],_0x14672d=_0xf9ddea['CompassFadeSpeed'];this[_0x4a959e(0x169)]()?this[_0x4a959e(0x1fa)]+=_0x14672d:this[_0x4a959e(0x1fa)]-=_0x14672d;}}}else return![];}}}}}}}return _0x42ef9e[_0x4a959e(0x1db)]=![],_0x42ef9e;},ColorManager[_0x1730b4(0x201)]=function(_0x28d310){const _0x4976ac=_0x1730b4;_0x28d310=String(_0x28d310);if(_0x28d310[_0x4976ac(0x221)](/#(.*)/i))return'#%1'[_0x4976ac(0x249)](String(RegExp['$1']));else{if(_0x4976ac(0x18d)===_0x4976ac(0x17a))this[_0x4976ac(0x12f)]();else return this['textColor'](Number(_0x28d310));}},ColorManager[_0x1730b4(0x21f)]=function(){const _0x38dc32=_0x1730b4;return ColorManager[_0x38dc32(0x201)](Sprite_ProximityMinimap['TILE_COLOR']);},ConfigManager['showCompass']=!![],ConfigManager[_0x1730b4(0xf2)]=0x64,VisuMZ[_0x1730b4(0x10a)][_0x1730b4(0x1bb)]=ConfigManager[_0x1730b4(0x227)],ConfigManager['makeData']=function(){const _0x2ff75d=_0x1730b4,_0x573628=VisuMZ[_0x2ff75d(0x10a)][_0x2ff75d(0x1bb)][_0x2ff75d(0x1cb)](this);return _0x573628[_0x2ff75d(0x192)]=this[_0x2ff75d(0x192)],_0x573628['compassSize']=this[_0x2ff75d(0xf2)],_0x573628;},VisuMZ[_0x1730b4(0x10a)][_0x1730b4(0x147)]=ConfigManager[_0x1730b4(0x19f)],ConfigManager['applyData']=function(_0x30541e){const _0x450dad=_0x1730b4;VisuMZ[_0x450dad(0x10a)][_0x450dad(0x147)][_0x450dad(0x1cb)](this,_0x30541e);if(_0x450dad(0x192)in _0x30541e){if(_0x450dad(0x22c)===_0x450dad(0x22c))this[_0x450dad(0x192)]=_0x30541e[_0x450dad(0x192)];else{const _0x544ac9=_0x57ffae?_0x378b2a[_0x450dad(0x182)]||'':'';if(_0x544ac9['match'](/<EXPLORABLE>/i))return!![];else{if(_0x544ac9[_0x450dad(0x221)](/<ALREADY EXPLORED>/i))return![];}if(this[_0x450dad(0x15e)]()['includes'](this['mapId']()))return![];return _0xdf79fb[_0x450dad(0x20f)];}}else this[_0x450dad(0x192)]=ConfigManager[_0x450dad(0x192)];_0x450dad(0xf2)in _0x30541e?this['compassSize']=_0x30541e[_0x450dad(0xf2)]:this['compassSize']=ConfigManager[_0x450dad(0xf2)];},SceneManager[_0x1730b4(0x181)]=function(){const _0x39448a=_0x1730b4;return this[_0x39448a(0x159)]&&this[_0x39448a(0x159)]['constructor']===Scene_Map;},TextManager[_0x1730b4(0x192)]=VisuMZ[_0x1730b4(0x10a)][_0x1730b4(0xee)][_0x1730b4(0x1ab)][_0x1730b4(0x150)],TextManager[_0x1730b4(0xf2)]=VisuMZ[_0x1730b4(0x10a)]['Settings']['Options'][_0x1730b4(0x140)],VisuMZ[_0x1730b4(0x10a)][_0x1730b4(0x13c)]=Game_System[_0x1730b4(0x232)]['initialize'],Game_System[_0x1730b4(0x232)][_0x1730b4(0x118)]=function(){const _0x10dc03=_0x1730b4;VisuMZ[_0x10dc03(0x10a)][_0x10dc03(0x13c)]['call'](this),this[_0x10dc03(0x12f)]();},Game_System[_0x1730b4(0x232)]['initializeProximityCompass']=function(){const _0x3fba14=_0x1730b4;this[_0x3fba14(0x130)]=VisuMZ[_0x3fba14(0x10a)]['Settings'][_0x3fba14(0x11a)][_0x3fba14(0x111)],this['_playerCompassIcon']=VisuMZ[_0x3fba14(0x10a)][_0x3fba14(0xee)]['Default'][_0x3fba14(0x136)];},Game_System['prototype']['isShowProximityCompass']=function(){const _0x7d9383=_0x1730b4;if(this[_0x7d9383(0x130)]===undefined){if(_0x7d9383(0x1b2)===_0x7d9383(0x23c))return!![];else this[_0x7d9383(0x12f)]();}return this[_0x7d9383(0x130)];},Game_System['prototype'][_0x1730b4(0x1e8)]=function(_0x3b3a24){const _0x81d02b=_0x1730b4;if(this[_0x81d02b(0x130)]===undefined){if(_0x81d02b(0x106)!==_0x81d02b(0x106))return this['_playerCompassIcon']===_0x5ac443&&this['initializeProximityCompass'](),this['_playerCompassIcon'];else this[_0x81d02b(0x12f)]();}this[_0x81d02b(0x130)]=_0x3b3a24;},Game_System[_0x1730b4(0x232)][_0x1730b4(0x120)]=function(){const _0x5237e5=_0x1730b4;return this[_0x5237e5(0x197)]===undefined&&(_0x5237e5(0xeb)===_0x5237e5(0xeb)?this[_0x5237e5(0x12f)]():(this[_0x5237e5(0x236)](),this['createMinimap'](),this[_0x5237e5(0xec)](),this['createFrame'](),this[_0x5237e5(0x1b7)](),this[_0x5237e5(0x153)]())),this[_0x5237e5(0x197)];},Game_System[_0x1730b4(0x232)][_0x1730b4(0x17c)]=function(_0x3f2b51){const _0x5a1db3=_0x1730b4;this['_playerCompassIcon']===undefined&&this['initializeProximityCompass'](),this[_0x5a1db3(0x197)]=_0x3f2b51;},Game_System[_0x1730b4(0x232)][_0x1730b4(0x185)]=function(_0x544491){const _0xbad436=_0x1730b4;this[_0xbad436(0x1e0)]=_0x544491;},Game_System['prototype'][_0x1730b4(0x195)]=function(){return this['_largeMinimapMode'];},Game_Map[_0x1730b4(0x232)]['isEventOverloaded']=function(){const _0x62b5f4=_0x1730b4;return this[_0x62b5f4(0x1e7)];},Game_Map[_0x1730b4(0x232)][_0x1730b4(0x215)]=function(){const _0xd7b694=_0x1730b4;if(!ConfigManager['showCompass'])return!![];else return!!$dataMap&&!!$dataMap['note']?$dataMap[_0xd7b694(0x182)][_0xd7b694(0x221)](/<HIDE COMPASS>/i):![];},Game_Map['prototype'][_0x1730b4(0x200)]=function(_0x329502,_0x2fa2dc){const _0x14bc53=_0x1730b4;if(Imported[_0x14bc53(0x1b3)]){if(_0x14bc53(0x176)===_0x14bc53(0x176)){const _0x2128c2=this['_regionRules'],_0x222e05=this[_0x14bc53(0x16a)](_0x329502,_0x2fa2dc);if(_0x2128c2[_0x14bc53(0x190)][_0x14bc53(0x1f7)](_0x222e05))return![];if(_0x2128c2[_0x14bc53(0x1c6)][_0x14bc53(0x1f7)](_0x222e05))return![];}else _0x5b33cf['clearRect'](_0x39c8ef+_0x269da2-0x1,_0x4cb43b,0x1,_0x594c5c);}if(this['isPassable'](_0x329502,_0x2fa2dc,0x2))return!![];if(this[_0x14bc53(0x1ca)](_0x329502,_0x2fa2dc,0x4))return!![];if(this[_0x14bc53(0x1ca)](_0x329502,_0x2fa2dc,0x6))return!![];if(this[_0x14bc53(0x1ca)](_0x329502,_0x2fa2dc,0x8))return!![];if(Imported[_0x14bc53(0x1b3)]){const _0x5e3c12=this[_0x14bc53(0x14f)],_0x3024e4=this[_0x14bc53(0x16a)](_0x329502,_0x2fa2dc);if(_0x5e3c12[_0x14bc53(0x1af)]['includes'](_0x3024e4))return!![];if(_0x5e3c12[_0x14bc53(0x1ae)]['includes'](_0x3024e4))return!![];}return![];},Game_Map['prototype'][_0x1730b4(0x248)]=function(){const _0x36b7ca=_0x1730b4;if(!Sprite_ProximityMinimap[_0x36b7ca(0x101)])return!![];else return!!$dataMap&&!!$dataMap[_0x36b7ca(0x182)]?_0x36b7ca(0x173)!==_0x36b7ca(0x173)?![]:$dataMap['note'][_0x36b7ca(0x221)](/<HIDE (?:MINIMAP|MINI-MAP)>/i):![];},Game_Map['prototype'][_0x1730b4(0x180)]=function(){const _0x319e01=_0x1730b4,_0xd0fa4c=$dataMap?$dataMap['note']||'':'';if(_0xd0fa4c[_0x319e01(0x221)](/<EXPLORABLE>/i)){if('kcpIK'!=='xhWlQ')return!![];else this[_0x319e01(0xf2)]=_0x22e9df[_0x319e01(0xf2)];}else{if(_0xd0fa4c[_0x319e01(0x221)](/<ALREADY EXPLORED>/i)){if(_0x319e01(0x1e5)===_0x319e01(0x1e5))return![];else _0x18f3ad=_0x3de6de['max'](_0x52e370,0x0),_0x5687d0=_0x93e03[_0x319e01(0x142)](_0x25c70f,_0x4dac71[_0x319e01(0x223)]()-_0x1ceec6);}}if(this['getFullRevealMinimaps']()['includes'](this['mapId']()))return![];return Sprite_ProximityMinimap[_0x319e01(0x20f)];},Game_Map['prototype'][_0x1730b4(0x12b)]=function(_0x33767b){const _0x519498=_0x1730b4;return this['_minimapExploredTiles']=this[_0x519498(0x1a0)]||{},this[_0x519498(0x1a0)][_0x33767b]=this['_minimapExploredTiles'][_0x33767b]||[],this[_0x519498(0x1a0)][_0x33767b];},Game_Map[_0x1730b4(0x232)][_0x1730b4(0x19d)]=function(_0x10acb6){const _0x115b51=_0x1730b4;this[_0x115b51(0x1a0)]=this[_0x115b51(0x1a0)]||{},this[_0x115b51(0x1a0)][_0x10acb6]=this[_0x115b51(0x1a0)][_0x10acb6]||[],delete this[_0x115b51(0x1a0)][_0x10acb6],this['removeFullRevealMinimap'](_0x10acb6);},Game_Map[_0x1730b4(0x232)]['registerMinimapExploredTiles']=function(_0x58b128,_0x12ab05,_0x55a7f7){const _0xa5df74=_0x1730b4;this['_minimapExploredTiles']=this[_0xa5df74(0x1a0)]||{},this[_0xa5df74(0x1a0)][_0x58b128]=this[_0xa5df74(0x1a0)][_0x58b128]||[];const _0x4cbd12=_0xa5df74(0x1c7)['format'](_0x12ab05,_0x55a7f7);if(this['_minimapExploredTiles'][_0x58b128][_0xa5df74(0x1f7)](_0x4cbd12))return;this[_0xa5df74(0x1a0)][_0x58b128][_0xa5df74(0x1da)](_0x4cbd12),this[_0xa5df74(0x1a0)][_0x58b128][_0xa5df74(0x20a)]();},Game_Map['prototype']['getFullRevealMinimaps']=function(){const _0x2309c9=_0x1730b4;return this['_fullRevealMaps']=this[_0x2309c9(0x174)]||[],this['_fullRevealMaps'];},Game_Map[_0x1730b4(0x232)][_0x1730b4(0x1b6)]=function(_0x10bde0){const _0x1bf527=_0x1730b4;this[_0x1bf527(0x174)]=this['_fullRevealMaps']||[],!this[_0x1bf527(0x174)][_0x1bf527(0x1f7)](_0x10bde0)&&this[_0x1bf527(0x174)]['push'](_0x10bde0);},Game_Map[_0x1730b4(0x232)]['removeFullRevealMinimap']=function(_0x100a78){const _0x15928d=_0x1730b4;this[_0x15928d(0x174)]=this[_0x15928d(0x174)]||[],this['_fullRevealMaps'][_0x15928d(0x19e)](_0x100a78);},Game_Map['prototype'][_0x1730b4(0x1e2)]=function(){const _0x467780=_0x1730b4;this[_0x467780(0x1a0)]=this['_minimapExploredTiles']||{},this[_0x467780(0x1a0)][_0x158d84]=[];const _0x158d84=this[_0x467780(0x16b)]();for(let _0x588354=0x0;_0x588354<this['width']();_0x588354++){if(_0x467780(0x160)!==_0x467780(0x160))return![];else for(let _0x4c030d=0x0;_0x4c030d<this[_0x467780(0x223)]();_0x4c030d++){const _0x1486b2=_0x467780(0x1c7)[_0x467780(0x249)](_0x588354,_0x4c030d);this[_0x467780(0x1a0)][_0x158d84][_0x467780(0x1da)](_0x1486b2);}}},Game_Map['prototype']['isMinimapNormallyVisible']=function(){const _0x58ee96=_0x1730b4,_0x5272c0=VisuMZ[_0x58ee96(0x10a)]['Settings'][_0x58ee96(0x1b8)];if($gameMap['hideCompass']()){if(_0x58ee96(0x20b)!=='YzKYn')return![];else{if(this[_0x58ee96(0x12e)]===_0x50d79c)return _0x5cc2b2[_0x58ee96(0x120)]();else return this[_0x58ee96(0x128)]()?this['_character'][_0x58ee96(0x170)]||this[_0x58ee96(0x12e)][_0x58ee96(0xda)]:this[_0x58ee96(0x12e)][_0x58ee96(0x170)];}}else{if(_0x5272c0['HideMessage']&&$gameMessage[_0x58ee96(0x116)]())return![];else{if(_0x5272c0[_0x58ee96(0x133)]&&$gameMap[_0x58ee96(0x164)]())return![];else{if(!$gameSystem[_0x58ee96(0x195)]()){if(_0x58ee96(0x1f1)!==_0x58ee96(0x1a6))return![];else this[_0x58ee96(0x16c)][_0x58ee96(0x1a8)]=_0x1c5fe1[_0x58ee96(0x145)];}else{if(_0x58ee96(0x1fc)!==_0x58ee96(0x1fc))this['x']=_0x243d79(_0x471732[_0x58ee96(0x10a)]['Settings'][_0x58ee96(0x125)][_0x58ee96(0x1cd)]),this['y']=_0x482956(_0x514f7a['ProximityCompass'][_0x58ee96(0xee)]['Compass'][_0x58ee96(0x24a)]),this[_0x58ee96(0x1fe)]['x']=0.5,this[_0x58ee96(0x1fe)]['y']=0.5,this[_0x58ee96(0x10c)]=0x2,!this['isShow']()&&(this['opacity']=0x0),this[_0x58ee96(0x241)]['x']=_0x322865[_0x58ee96(0xf2)]*0.01,this['scale']['y']=_0xa7ceb3[_0x58ee96(0xf2)]*0.01,this[_0x58ee96(0x1fa)]=this['isShow']()?0xff:0x0;else return $gameSystem[_0x58ee96(0x14d)]();}}}}},Game_Player[_0x1730b4(0x232)][_0x1730b4(0x15b)]=function(){const _0x2d55aa=_0x1730b4;if(!SceneManager[_0x2d55aa(0x181)]())return![];const _0x2aaedf=SceneManager[_0x2d55aa(0x159)][_0x2d55aa(0x14e)];if(!_0x2aaedf)return![];const _0x25c622=_0x2aaedf['x'],_0x40f9e2=_0x2aaedf['y'],_0x2f879=VisuMZ[_0x2d55aa(0x10a)][_0x2d55aa(0xee)]['Compass']['Radius']||0x1,_0x32d20e=_0x2aaedf[_0x2d55aa(0x241)]['x'],_0x14a1fa=new Rectangle(_0x25c622-_0x2f879*_0x32d20e,_0x40f9e2-_0x2f879*_0x32d20e,_0x2f879*_0x32d20e*0x2+$gameMap[_0x2d55aa(0x161)]()/0x2,_0x2f879*_0x32d20e*0x2+$gameMap[_0x2d55aa(0x21b)]()/0x2),_0x1f3521=$gameScreen[_0x2d55aa(0x224)]();return _0x14a1fa[_0x2d55aa(0x1cf)](this[_0x2d55aa(0x1d2)]()*_0x1f3521,this[_0x2d55aa(0xea)]()*_0x1f3521);},VisuMZ['ProximityCompass'][_0x1730b4(0xe8)]=Game_Event[_0x1730b4(0x232)][_0x1730b4(0xe7)],Game_Event['prototype'][_0x1730b4(0xe7)]=function(){const _0x11801c=_0x1730b4;VisuMZ[_0x11801c(0x10a)][_0x11801c(0xe8)]['call'](this),this[_0x11801c(0xef)]();},VisuMZ[_0x1730b4(0x10a)][_0x1730b4(0x11e)]=Game_Event[_0x1730b4(0x232)][_0x1730b4(0x11f)],Game_Event['prototype'][_0x1730b4(0x11f)]=function(){const _0xe6dd01=_0x1730b4;VisuMZ[_0xe6dd01(0x10a)]['Game_Event_setupPageSettings'][_0xe6dd01(0x1cb)](this),this[_0xe6dd01(0x23f)]();},Game_Event[_0x1730b4(0x232)]['setupProximityCompassEffects']=function(){const _0x58e686=_0x1730b4;if(!this[_0x58e686(0x20d)]())return;this[_0x58e686(0xef)](),this[_0x58e686(0x1c0)](),this[_0x58e686(0x15d)]();},Game_Event['prototype'][_0x1730b4(0x1c0)]=function(){const _0x581604=_0x1730b4,_0x4e2812=this[_0x581604(0x20d)]()[_0x581604(0x182)];if(_0x4e2812==='')return;this[_0x581604(0x233)](_0x4e2812);},Game_Event[_0x1730b4(0x232)][_0x1730b4(0x15d)]=function(){const _0x41157b=_0x1730b4;if(!this[_0x41157b(0x1a3)]())return;const _0x38775c=this[_0x41157b(0x244)]();let _0x57c168='';for(const _0x10389e of _0x38775c){if([0x6c,0x198][_0x41157b(0x1f7)](_0x10389e[_0x41157b(0x226)])){if(_0x41157b(0x187)!=='nyDar'){if(_0x57c168!=='')_0x57c168+='\x0a';_0x57c168+=_0x10389e[_0x41157b(0x163)][0x0];}else return this['parent']&&this['parent'][_0x41157b(0x1df)];}}this[_0x41157b(0x233)](_0x57c168);},Game_Event[_0x1730b4(0x232)][_0x1730b4(0xef)]=function(){const _0x1e418a=_0x1730b4;this[_0x1e418a(0x170)]=0x0,this[_0x1e418a(0x23b)]=VisuMZ['ProximityCompass']['Settings'][_0x1e418a(0x11a)][_0x1e418a(0x177)];{const _0x48fd9=VisuMZ['ProximityCompass'][_0x1e418a(0xee)][_0x1e418a(0x125)];this[_0x1e418a(0x170)]=0x0;switch(this[_0x1e418a(0x19c)]){case 0x0:this[_0x1e418a(0x170)]=_0x48fd9[_0x1e418a(0x183)]||0x0;break;case 0x1:this['_compassIconIndex']=_0x48fd9[_0x1e418a(0x1c2)]||0x0;break;case 0x2:this['_compassIconIndex']=_0x48fd9['DefaultEventIcon_Above']||0x0;break;}}{if(_0x1e418a(0x1d0)===_0x1e418a(0x13b))_0x870a50[_0x1e418a(0x10a)][_0x1e418a(0x1b9)][_0x1e418a(0x1cb)](this,_0x1c1edb),this[_0x1e418a(0x1ba)](),this['setupSpawnProximityMinimap']();else{const _0x8900e8=VisuMZ[_0x1e418a(0x10a)][_0x1e418a(0xee)][_0x1e418a(0x1b8)];this[_0x1e418a(0xda)]=0x0;switch(this['_priorityType']){case 0x0:this[_0x1e418a(0xda)]=_0x8900e8[_0x1e418a(0x183)]||0x0;break;case 0x1:this[_0x1e418a(0xda)]=_0x8900e8[_0x1e418a(0x1c2)]||0x0;break;case 0x2:this[_0x1e418a(0xda)]=_0x8900e8['DefaultEventIcon_Above']||0x0;break;}}}},Game_Event[_0x1730b4(0x232)]['checkProximityCompassStringTags']=function(_0x3b91e7){const _0x49a3cc=_0x1730b4;if(_0x3b91e7[_0x49a3cc(0x221)](/<COMPASS ICON: (\d+)>/i)){if(_0x49a3cc(0x1f0)==='XtMDy')this['_compassIconIndex']=parseInt(RegExp['$1']);else{let _0xeea6f2=![];const _0x45b73a=_0x342239?_0xad4559[_0x49a3cc(0x182)]||'':'';if(_0x45b73a['match'](/<MINIMAP IMAGE:[ ](.*)>/i)){const _0x28a701=_0x2dc042['$1'][_0x49a3cc(0x1ac)]();this[_0x49a3cc(0x146)](_0x28a701),_0xeea6f2=!![];}else this[_0x49a3cc(0x1d5)]();this[_0x49a3cc(0x1df)][_0x49a3cc(0x1fe)]['x']=0.5,this['_minimapSprite'][_0x49a3cc(0x1fe)]['y']=0.5,this[_0x49a3cc(0x1df)]['opacity']=_0x4e70ec[_0x49a3cc(0x17b)];const _0x3246c1=_0x31a1f7[_0x49a3cc(0x13f)]*0x2,_0x1199ff=_0x26f2c5[_0x49a3cc(0x1bc)](),_0x191b57=(_0xcbbba7[_0x49a3cc(0x167)]-_0x3246c1-0x2)/(_0x1199ff['width']/(_0x1ba7f6[_0x49a3cc(0x1e3)]()?0x3:0x1)),_0x43af1b=(_0x308e38['height']-_0x3246c1-0x2)/(_0x1199ff['height']/(_0x490b60['isLoopVertical']()?0x3:0x1));this[_0x49a3cc(0x21c)]=_0x4d43bc[_0x49a3cc(0x142)](_0x191b57,_0x43af1b),!_0xeea6f2&&(this[_0x49a3cc(0x1df)][_0x49a3cc(0x241)]['x']=this[_0x49a3cc(0x21c)],this[_0x49a3cc(0x1df)]['scale']['y']=this[_0x49a3cc(0x21c)]);}}_0x3b91e7[_0x49a3cc(0x221)](/<COMPASS PROXIMITY: (\d+)>/i)&&(this[_0x49a3cc(0x23b)]=parseInt(RegExp['$1'])),_0x3b91e7[_0x49a3cc(0x221)](/<MINIMAP ICON: (\d+)>/i)&&(this['_minimapIconIndex']=parseInt(RegExp['$1'])),_0x3b91e7['match'](/<HIDE MINIMAP ICON>/i)&&('CRAQJ'===_0x49a3cc(0x1e4)?(this[_0x49a3cc(0x17d)]=new _0x14d4c7(),this[_0x49a3cc(0x17d)][_0x49a3cc(0x1a8)]=new _0x147834(_0x4625ab[_0x49a3cc(0x167)](),_0x395d7e['height']()),this[_0x49a3cc(0x17d)][_0x49a3cc(0x1a8)]['smooth']=_0xb7b63f[_0x49a3cc(0x1bc)]()[_0x49a3cc(0x1ef)],this[_0x49a3cc(0x189)][_0x49a3cc(0x15a)](this[_0x49a3cc(0x17d)]),this[_0x49a3cc(0x189)][_0x49a3cc(0x100)]=this[_0x49a3cc(0x17d)],this[_0x49a3cc(0x17d)][_0x49a3cc(0x1fe)]['x']=0.5,this['_unexploredMask']['anchor']['y']=0.5,this[_0x49a3cc(0x17d)][_0x49a3cc(0x241)]['x']=this[_0x49a3cc(0x21c)]*_0x2fefa3[_0x49a3cc(0x168)],this[_0x49a3cc(0x17d)][_0x49a3cc(0x241)]['y']=this[_0x49a3cc(0x21c)]*_0x44d7bb[_0x49a3cc(0x168)]):this[_0x49a3cc(0xda)]=0x0);},VisuMZ[_0x1730b4(0x10a)][_0x1730b4(0x1b9)]=Game_Event[_0x1730b4(0x232)][_0x1730b4(0x214)],Game_Event['prototype'][_0x1730b4(0x214)]=function(_0x16a137){const _0x17a66d=_0x1730b4;VisuMZ[_0x17a66d(0x10a)][_0x17a66d(0x1b9)]['call'](this,_0x16a137),this[_0x17a66d(0x1ba)](),this[_0x17a66d(0x219)]();},Game_Event[_0x1730b4(0x232)]['setupSpawnProximityCompass']=function(){const _0x5237b7=_0x1730b4,_0x15a41d=SceneManager[_0x5237b7(0x159)];if(!_0x15a41d)return;const _0x219358=_0x15a41d['_ProximityCompassSprite'];if(!_0x219358)return;const _0x4bffe7=new Sprite_CompassIcon(this);_0x4bffe7[_0x5237b7(0x153)](),_0x219358[_0x5237b7(0x23a)][_0x5237b7(0x1da)](_0x4bffe7),_0x219358[_0x5237b7(0x15a)](_0x4bffe7),_0x219358[_0x5237b7(0x15a)](_0x219358['_playerSprite']);},Game_Event['prototype']['setupSpawnProximityMinimap']=function(){const _0x2ac5a4=_0x1730b4,_0xf25d4e=SceneManager[_0x2ac5a4(0x159)];if(!_0xf25d4e)return;const _0x93e5b2=_0xf25d4e['_ProximityMinimap'];if(!_0x93e5b2)return;const _0x343fce=new Sprite_CompassIcon(this);_0x343fce[_0x2ac5a4(0x107)](_0x93e5b2['_minimapScale']),_0x343fce[_0x2ac5a4(0x153)](),_0x93e5b2[_0x2ac5a4(0x23a)]['push'](_0x343fce),_0x93e5b2[_0x2ac5a4(0x234)][_0x2ac5a4(0x15a)](_0x343fce),_0x93e5b2[_0x2ac5a4(0x234)][_0x2ac5a4(0x15a)](_0x93e5b2[_0x2ac5a4(0x132)]);},VisuMZ['ProximityCompass'][_0x1730b4(0x11c)]=Scene_Map[_0x1730b4(0x232)]['createSpriteset'],Scene_Map[_0x1730b4(0x232)][_0x1730b4(0x222)]=function(){const _0x309029=_0x1730b4;VisuMZ[_0x309029(0x10a)][_0x309029(0x11c)][_0x309029(0x1cb)](this),this[_0x309029(0x237)](),this[_0x309029(0x202)]();},Scene_Map[_0x1730b4(0x232)]['createProximityCompass']=function(){const _0x5750c6=_0x1730b4;if(this[_0x5750c6(0x10d)]!==Scene_Map)return;this[_0x5750c6(0x14e)]=new Sprite_ProximityCompass(),this[_0x5750c6(0x15a)](this['_ProximityCompassSprite']);},Scene_Map[_0x1730b4(0x232)]['createProximityScreenMinimap']=function(){const _0x2b869a=_0x1730b4;if(this[_0x2b869a(0x10d)]!==Scene_Map)return;if($gameMap[_0x2b869a(0x248)]())return;this[_0x2b869a(0x1b5)]=new Sprite_ProximityMinimap(),this['addChild'](this['_ProximityMinimap']);},VisuMZ[_0x1730b4(0x10a)]['Scene_Map_updateMain']=Scene_Map['prototype']['updateMain'],Scene_Map[_0x1730b4(0x232)]['updateMain']=function(){const _0x49f306=_0x1730b4;VisuMZ[_0x49f306(0x10a)][_0x49f306(0x186)][_0x49f306(0x1cb)](this),this[_0x49f306(0xf9)]();},Scene_Map[_0x1730b4(0x232)][_0x1730b4(0xf9)]=function(){const _0x54736e=_0x1730b4;if($gameMap['hideMinimap']())return;if($gameMap[_0x54736e(0x215)]())return;const _0x39a091=VisuMZ[_0x54736e(0x10a)][_0x54736e(0xee)][_0x54736e(0x1b8)];if(_0x39a091[_0x54736e(0xdd)]&&$gameMessage['isBusy']())return;if(_0x39a091['HideEvents']&&$gameMap[_0x54736e(0x164)]())return;if(!$gameSystem[_0x54736e(0x14d)]())return;const _0x175931=VisuMZ['ProximityCompass']['Settings']['Minimap'][_0x54736e(0x1d9)];if(Input[_0x54736e(0x1b4)](_0x175931)){const _0x3d7844=!$gameSystem[_0x54736e(0x195)]();$gameSystem[_0x54736e(0x185)](_0x3d7844);}},VisuMZ[_0x1730b4(0x10a)]['Scene_Options_maxCommands']=Scene_Options['prototype'][_0x1730b4(0xe9)],Scene_Options[_0x1730b4(0x232)]['maxCommands']=function(){const _0x33a017=_0x1730b4;let _0x5c55ea=VisuMZ['ProximityCompass'][_0x33a017(0x20e)][_0x33a017(0x1cb)](this);const _0x200dec=VisuMZ['ProximityCompass'][_0x33a017(0xee)][_0x33a017(0x1ab)];if(_0x200dec[_0x33a017(0x1e9)]){if(_0x200dec[_0x33a017(0x14a)])_0x5c55ea++;if(_0x200dec[_0x33a017(0x126)])_0x5c55ea++;}return _0x5c55ea;};function Sprite_ProximityCompass(){const _0x2119ae=_0x1730b4;this[_0x2119ae(0x118)][_0x2119ae(0x10f)](this,arguments);}Sprite_ProximityCompass['prototype']=Object[_0x1730b4(0x171)](Sprite_Clickable[_0x1730b4(0x232)]),Sprite_ProximityCompass[_0x1730b4(0x232)][_0x1730b4(0x10d)]=Sprite_ProximityCompass,Sprite_ProximityCompass[_0x1730b4(0x232)][_0x1730b4(0x118)]=function(){const _0x3f0e23=_0x1730b4;Sprite_Clickable[_0x3f0e23(0x232)]['initialize'][_0x3f0e23(0x1cb)](this),this[_0x3f0e23(0x165)](),this[_0x3f0e23(0x22d)]();},Sprite_ProximityCompass[_0x1730b4(0x232)][_0x1730b4(0x165)]=function(){const _0x4a8d91=_0x1730b4;this['x']=eval(VisuMZ[_0x4a8d91(0x10a)][_0x4a8d91(0xee)][_0x4a8d91(0x125)]['CenterX']),this['y']=eval(VisuMZ['ProximityCompass']['Settings'][_0x4a8d91(0x125)][_0x4a8d91(0x24a)]),this[_0x4a8d91(0x1fe)]['x']=0.5,this[_0x4a8d91(0x1fe)]['y']=0.5,this[_0x4a8d91(0x10c)]=0x2;if(!this[_0x4a8d91(0x169)]()){if(_0x4a8d91(0x21a)!==_0x4a8d91(0x21a)){this[_0x4a8d91(0x104)]=this[_0x4a8d91(0xfe)]();if(this[_0x4a8d91(0x104)]===0x0)this[_0x4a8d91(0x216)](0x0,0x0,0x0,0x0);else{var _0x1c8cff=_0x544cea[_0x4a8d91(0x193)],_0x401f5e=_0x5a86f['iconHeight'],_0x213cf0=this[_0x4a8d91(0x104)]%0x10*_0x1c8cff,_0xe8d1d8=_0x5aa297[_0x4a8d91(0x198)](this[_0x4a8d91(0x104)]/0x10)*_0x401f5e;this[_0x4a8d91(0x216)](_0x213cf0,_0xe8d1d8,_0x1c8cff,_0x401f5e);}}else this[_0x4a8d91(0x1fa)]=0x0;}this[_0x4a8d91(0x241)]['x']=ConfigManager[_0x4a8d91(0xf2)]*0.01,this[_0x4a8d91(0x241)]['y']=ConfigManager[_0x4a8d91(0xf2)]*0.01,this['opacity']=this['isShow']()?0xff:0x0;},Sprite_ProximityCompass[_0x1730b4(0x232)]['createSprites']=function(){const _0x53afa3=_0x1730b4;this[_0x53afa3(0x236)](),this['createMinimap'](),this[_0x53afa3(0xec)](),this[_0x53afa3(0x151)](),this['createCharacters'](),this[_0x53afa3(0x153)]();},Sprite_ProximityCompass[_0x1730b4(0x232)]['createBackground']=function(){const _0x911d01=_0x1730b4;this[_0x911d01(0x1a1)]=new Sprite(),this['addChild'](this[_0x911d01(0x1a1)]),this[_0x911d01(0x1a1)][_0x911d01(0x1fe)]['x']=0.5,this[_0x911d01(0x1a1)][_0x911d01(0x1fe)]['y']=0.5;const _0x4d8749=VisuMZ[_0x911d01(0x10a)][_0x911d01(0xee)][_0x911d01(0x125)],_0x4a8ba7=_0x4d8749[_0x911d01(0x1dc)];var _0x2d0ca6=_0x4a8ba7*0x2,_0x5e48f6=_0x4a8ba7*0x2,_0x4d8321=_0x4d8749[_0x911d01(0x230)];const _0x236978=new Bitmap(_0x2d0ca6,_0x5e48f6);_0x236978[_0x911d01(0x156)]=_0x4d8749[_0x911d01(0x24e)],_0x236978[_0x911d01(0x1d6)](_0x2d0ca6/0x2,_0x5e48f6/0x2,_0x2d0ca6/0x2,_0x4d8321),this[_0x911d01(0x1a1)]['bitmap']=_0x236978;},Sprite_ProximityCompass['prototype']['createMinimap']=function(){const _0x2cb4d5=_0x1730b4;if($gameMap['hideMinimap']())return;const _0x58a036=VisuMZ[_0x2cb4d5(0x10a)][_0x2cb4d5(0xee)][_0x2cb4d5(0x125)];this[_0x2cb4d5(0x1df)]=new Sprite(),this['_minimapSprite']['bitmap']=ImageManager['getPassabilityMinimap'](),this[_0x2cb4d5(0x15a)](this[_0x2cb4d5(0x1df)]);let _0xf1994a=_0x58a036[_0x2cb4d5(0x124)]*$gameMap[_0x2cb4d5(0x161)]();_0xf1994a/=Sprite_ProximityMinimap['TILE_SIZE'],this[_0x2cb4d5(0x1df)]['scale']['x']=_0xf1994a,this[_0x2cb4d5(0x1df)][_0x2cb4d5(0x241)]['y']=_0xf1994a,this[_0x2cb4d5(0x1df)]['opacity']=Sprite_ProximityMinimap[_0x2cb4d5(0x17b)];const _0x1f03ea=_0x58a036[_0x2cb4d5(0x1dc)]-0x1;this[_0x2cb4d5(0x13a)]=new Sprite(),this[_0x2cb4d5(0x13a)]['bitmap']=new Bitmap(_0x1f03ea*0x2,_0x1f03ea*0x2),this['_minimapMaskSprite'][_0x2cb4d5(0x1a8)][_0x2cb4d5(0x1d6)](_0x1f03ea,_0x1f03ea,_0x1f03ea,_0x2cb4d5(0x15c)),this[_0x2cb4d5(0x13a)][_0x2cb4d5(0x1fe)]['x']=0.5,this[_0x2cb4d5(0x13a)][_0x2cb4d5(0x1fe)]['y']=0.5,this[_0x2cb4d5(0x15a)](this['_minimapMaskSprite']),this[_0x2cb4d5(0x1df)]['mask']=this[_0x2cb4d5(0x13a)];},Sprite_ProximityCompass['prototype']['createCustomMinimap']=function(){const _0xf3018f=_0x1730b4,_0x4c0441=$dataMap?$dataMap['note']||'':'';if(_0x4c0441[_0xf3018f(0x221)](/<MINIMAP IMAGE:[ ](.*)>/i)){const _0x40156a=RegExp['$1']['trim'](),_0x1c3af7=ImageManager['loadPicture'](_0x40156a);_0x1c3af7[_0xf3018f(0x1a9)](this[_0xf3018f(0x18a)][_0xf3018f(0x13d)](this,_0x1c3af7));}},Sprite_ProximityCompass[_0x1730b4(0x232)][_0x1730b4(0x18a)]=function(_0x6b05c0){const _0x751e37=_0x1730b4,_0x37207c=this[_0x751e37(0x1df)][_0x751e37(0x1a8)],_0xe726be=_0x37207c['width']/($gameMap[_0x751e37(0x1e3)]()?0x3:0x1),_0xe9a17c=_0x37207c[_0x751e37(0x223)]/($gameMap[_0x751e37(0x225)]()?0x3:0x1),_0x3b2d4d=_0xe726be/_0x6b05c0['width'],_0x34edd9=_0xe9a17c/_0x6b05c0[_0x751e37(0x223)],_0x307296=$gameMap[_0x751e37(0x1e3)]()?0x2:0x0,_0x5bfbb5=$gameMap[_0x751e37(0x225)]()?0x2:0x0;for(let _0x347f33=0x0;_0x347f33<=_0x307296;_0x347f33++){for(let _0x17f896=0x0;_0x17f896<=_0x5bfbb5;_0x17f896++){const _0x102458=new Sprite();_0x102458[_0x751e37(0x1a8)]=_0x6b05c0,this[_0x751e37(0x1df)]['addChild'](_0x102458),_0x102458[_0x751e37(0x241)]['x']=_0x3b2d4d,_0x102458[_0x751e37(0x241)]['y']=_0x34edd9,_0x102458['x']=_0xe726be*_0x347f33,_0x102458['y']=_0xe9a17c*_0x17f896;}}this[_0x751e37(0x1df)][_0x751e37(0x1a8)]=new Bitmap(0x1,0x1);},Sprite_ProximityCompass[_0x1730b4(0x232)][_0x1730b4(0x151)]=function(){const _0x1b53fc=_0x1730b4;this['_ProximityCompassFrameSprite']=new Sprite(),this[_0x1b53fc(0x15a)](this['_ProximityCompassFrameSprite']),this['_ProximityCompassFrameSprite'][_0x1b53fc(0x1fe)]['x']=0.5,this[_0x1b53fc(0x16c)]['anchor']['y']=0.5;const _0x2a83ac=this[_0x1b53fc(0xdc)]();;if(_0x2a83ac)this['_ProximityCompassFrameSprite']['bitmap']=ImageManager[_0x1b53fc(0x1bd)](_0x2a83ac);else{if(_0x1b53fc(0x220)!==_0x1b53fc(0x220))return!![];else this[_0x1b53fc(0x16c)][_0x1b53fc(0x1a8)]=ImageManager['_emptyBitmap'];}},Sprite_ProximityCompass['prototype'][_0x1730b4(0xdc)]=function(){const _0x35bd17=_0x1730b4;if(this['_minimapSprite'])return Sprite_ProximityMinimap['COMPASS_FRAME']||VisuMZ[_0x35bd17(0x10a)][_0x35bd17(0xee)][_0x35bd17(0x125)][_0x35bd17(0x18c)];else{if('MWeLF'!=='MWeLF')this['_showProximityCompass']=_0x2bb859[_0x35bd17(0x10a)]['Settings']['Default'][_0x35bd17(0x111)],this[_0x35bd17(0x197)]=_0x43a0f9[_0x35bd17(0x10a)]['Settings'][_0x35bd17(0x11a)][_0x35bd17(0x136)];else return VisuMZ['ProximityCompass'][_0x35bd17(0xee)][_0x35bd17(0x125)][_0x35bd17(0x18c)];}},Sprite_ProximityCompass[_0x1730b4(0x232)][_0x1730b4(0x1b7)]=function(){const _0x431a12=_0x1730b4;this[_0x431a12(0x23a)]=[];for(const _0x15d7e8 of $gameMap[_0x431a12(0xf4)]()){if(!_0x15d7e8)continue;this['_characterSprites'][_0x431a12(0x1da)](new Sprite_CompassIcon(_0x15d7e8));}this['_playerSprite']=new Sprite_CompassIcon($gamePlayer),this[_0x431a12(0x23a)][_0x431a12(0x1da)](this[_0x431a12(0x132)]);for(const _0x11d21b of this['_characterSprites']){this['addChild'](_0x11d21b);}this['addChild'](this['_playerSprite']);},Sprite_ProximityCompass[_0x1730b4(0x232)][_0x1730b4(0x153)]=function(){const _0x5a5ae7=_0x1730b4;Sprite_Clickable[_0x5a5ae7(0x232)][_0x5a5ae7(0x153)][_0x5a5ae7(0x1cb)](this),this[_0x5a5ae7(0x12d)](),this[_0x5a5ae7(0x196)]();},Sprite_ProximityCompass[_0x1730b4(0x232)][_0x1730b4(0x12d)]=function(){const _0x4f6641=_0x1730b4,_0x2685e0=VisuMZ[_0x4f6641(0x10a)]['Settings'][_0x4f6641(0x125)],_0x438c7d=_0x2685e0[_0x4f6641(0x12a)];if(this[_0x4f6641(0x169)]()){if('XRfVz'!==_0x4f6641(0x134))this[_0x4f6641(0x1fa)]-=_0x5e44b0;else{if($gamePlayer[_0x4f6641(0x15b)]()){if(_0x4f6641(0x1f8)!==_0x4f6641(0xf0)){const _0x893075=_0x2685e0[_0x4f6641(0x113)]??0x80;this['opacity']=(this[_0x4f6641(0x1fa)]-_0x438c7d)['clamp'](_0x893075,0xff);}else{if(_0x455be9[_0x4f6641(0x248)]())return;if(_0x373913[_0x4f6641(0x215)]())return;const _0xf8394f=_0x51b62e[_0x4f6641(0x10a)][_0x4f6641(0xee)]['Minimap'];if(_0xf8394f[_0x4f6641(0xdd)]&&_0x329293['isBusy']())return;if(_0xf8394f['HideEvents']&&_0x37b30b[_0x4f6641(0x164)]())return;if(!_0x21a85c[_0x4f6641(0x14d)]())return;const _0x920010=_0x2466a6['ProximityCompass'][_0x4f6641(0xee)][_0x4f6641(0x1b8)]['ToggleKey'];if(_0x16dca4[_0x4f6641(0x1b4)](_0x920010)){const _0x1cb52a=!_0x4fae40['getLargeMinimapMode']();_0x43e799[_0x4f6641(0x185)](_0x1cb52a);}}}else this[_0x4f6641(0x1fa)]+=_0x438c7d;}}else this[_0x4f6641(0x1fa)]-=_0x438c7d;},Sprite_ProximityCompass[_0x1730b4(0x232)][_0x1730b4(0x169)]=function(){const _0x4c50f3=_0x1730b4,_0x22273c=VisuMZ['ProximityCompass'][_0x4c50f3(0xee)][_0x4c50f3(0x125)];if($gameMap['hideCompass']())return![];else{if(_0x22273c[_0x4c50f3(0xdd)]&&$gameMessage[_0x4c50f3(0x116)]())return _0x4c50f3(0xf1)===_0x4c50f3(0x119)?(this['_showProximityCompass']===_0x1d1d57&&this['initializeProximityCompass'](),this['_showProximityCompass']):![];else{if(_0x22273c[_0x4c50f3(0x133)]&&$gameMap[_0x4c50f3(0x164)]()){if(_0x4c50f3(0x137)!==_0x4c50f3(0x137)){if(_0x590214['VisuMZ_1_EventsMoveCore']){const _0xf43117=this[_0x4c50f3(0x14f)],_0xb9f66f=this[_0x4c50f3(0x16a)](_0x27b0c9,_0x539bda);if(_0xf43117[_0x4c50f3(0x190)][_0x4c50f3(0x1f7)](_0xb9f66f))return![];if(_0xf43117[_0x4c50f3(0x1c6)][_0x4c50f3(0x1f7)](_0xb9f66f))return![];}if(this[_0x4c50f3(0x1ca)](_0x4bfcbc,_0x49b8aa,0x2))return!![];if(this[_0x4c50f3(0x1ca)](_0x11abe6,_0x40940b,0x4))return!![];if(this[_0x4c50f3(0x1ca)](_0x32ff6f,_0x1b226,0x6))return!![];if(this[_0x4c50f3(0x1ca)](_0x11ab9a,_0x38f4e8,0x8))return!![];if(_0x2c4a59[_0x4c50f3(0x1b3)]){const _0x29c7fd=this[_0x4c50f3(0x14f)],_0xdc2723=this[_0x4c50f3(0x16a)](_0x1f1cae,_0x3d11b6);if(_0x29c7fd[_0x4c50f3(0x1af)][_0x4c50f3(0x1f7)](_0xdc2723))return!![];if(_0x29c7fd['PlayerAllow'][_0x4c50f3(0x1f7)](_0xdc2723))return!![];}return![];}else return![];}else{if(this[_0x4c50f3(0x1df)]&&$gameSystem['getLargeMinimapMode']())return![];else{if(_0x4c50f3(0x103)!=='ZHbVq'){if(this[_0x4c50f3(0x128)]()){if(_0x1859bd['ProximityCompass'][_0x4c50f3(0xee)]['Minimap']['IgnoreProximity'])return 0xf4240;}return this[_0x4c50f3(0x12e)]?this[_0x4c50f3(0x12e)][_0x4c50f3(0x23b)]:0x1;}else return $gameSystem[_0x4c50f3(0x14d)]();}}}}},Sprite_ProximityCompass['prototype']['updateMinimap']=function(){const _0x1911e1=_0x1730b4;if(!this[_0x1911e1(0x1df)])return;const _0x440df1=VisuMZ[_0x1911e1(0x10a)][_0x1911e1(0xee)][_0x1911e1(0x125)];let _0x5bd65c=_0x440df1[_0x1911e1(0x124)]*$gameMap[_0x1911e1(0x161)](),_0xe711f0=$gamePlayer[_0x1911e1(0x1a5)]+0.5;if($gameMap[_0x1911e1(0x1e3)]())_0xe711f0+=$gameMap[_0x1911e1(0x167)]();let _0x1bfda7=$gamePlayer['_realY']+0.5;if($gameMap[_0x1911e1(0x225)]())_0x1bfda7+=$gameMap['height']();this['_minimapSprite']['x']=_0xe711f0*-_0x5bd65c,this[_0x1911e1(0x1df)]['y']=_0x1bfda7*-_0x5bd65c;};function _0x2ba7(){const _0x896fb3=['createContainer','registerCommand','createUnexplored','includes','VyGZh','BACK_IMG_BLENDMODE','opacity','value','HDmmO','cmhPn','anchor','JjnjE','isPlayerPassableByAnyDirection','getColor','createProximityScreenMinimap','rvlnB','deltaX','5711274lCScPO','round','_backgroundSprite','fullRevealUnexploredMask','bVPEj','sort','ZShXj','BACK_FILENAME','event','Scene_Options_maxCommands','DEFAULT_EXPLORE','RiGrV','_lastPlayerX','YepTD','lyLAJ','setupSpawn','hideCompass','setFrame','5pszpJE','clamp','setupSpawnProximityMinimap','LDabW','tileHeight','_minimapScale','62350cewBLu','cos','minimapPassableColor','laVpe','match','createSpriteset','height','zoomScale','isLoopVertical','code','makeData','IconFadeSpeed','loadBitmap','changeProximityCompassSize','onLoadImageMinimap','GRyLW','createSprites','ARRAYNUM','Window_Options_addGeneralOptions','BackColor','usesPictureBack','prototype','checkProximityCompassStringTags','_characterContainer','ARRAYJSON','createBackground','createProximityCompass','addGeneralOptions','psQSn','_characterSprites','_compassProximity','CMoJb','atan2','XKrfi','setupProximityCompassEffects','kHBOx','scale','MinimapFullExplore','addCommand','list','toUpperCase','STRUCT','applyBackgroundScale','hideMinimap','format','CenterY','_lastPlayerY','33154uBWpwm','1811352CuEJZs','BackOpacity','_minimapIconIndex','registerMinimapExploredTiles','getCompassFrameFilename','HideMessage','XjlwU','sqrt','clear','9034333JWqyRZ','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','updateFrame','euZgD','IKYiN','_realY','clearPageSettings','Game_Event_clearPageSettings','maxCommands','screenY','jatBl','createCustomMinimap','MapID','Settings','initProximityCompassEffects','QOknw','rbnfQ','compassSize','addProximityCompassSizeCommand','events','PassabilityBlendMode','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','BackFilename','ARRAYSTRUCT','updateProximityCompassMinimapToggleKey','YsVHW','HzFsC','updatePosition','changeValue','getCompassIcon','CompassIconScale','mask','ENABLE','description','ZHbVq','_iconIndex','abs','lPdEz','setLargeMinimapChild','drawUnexplored','addProximityCompassCommands','ProximityCompass','return\x200','blendMode','constructor','status','apply','sin','Show','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','MinCompassOpacity','PlayerIconScale','addShowProximityCompassCommand','isBusy','TILE_COLOR','initialize','HIinz','Default','show','Scene_Map_createSpriteset','max','Game_Event_setupPageSettings','setupPageSettings','getPlayerCompassIcon','npote','CLcZv','ISnvf','TileScale','Compass','AddSizeOption','qpRuW','isLargeMinimapChild','_pictureBackSprite','CompassFadeSpeed','getMinimapExploredTiles','hYqSf','updateOpacity','_character','initializeProximityCompass','_showProximityCompass','TileColor','_playerSprite','HideEvents','XRfVz','BACK_IMG_OPACITY','PlayerIcon','HGrxn','JetUL','ARRAYSTR','_minimapMaskSprite','fUtoi','Game_System_initialize','bind','SeXrr','BORDER_BUFFER','SizeName','VlJUs','min','IgnoreProximity','ceil','_emptyBitmap','createImageMinimap','ConfigManager_applyData','CompassVisibility','QagBW','AddShowOption','TileOpacity','loadSystem','isShowProximityCompass','_ProximityCompassSprite','_regionRules','ShowName','createFrame','KVExW','update','rUiKG','MinimapIconScale','paintOpacity','Window_Options_changeVolume','DefaultExplore','_scene','addChild','isCloseToCompassScreenPosition','white','setupProximityCompassCommentTags','getFullRevealMinimaps','updatePositionMinimapLarge','qrqLO','tileWidth','_passabilityMinimaps','parameters','isEventRunning','initMembers','fgseN','width','TILE_SIZE','isShow','regionId','mapId','_ProximityCompassFrameSprite','126TcKZXc','vdzkO','LimLf','_compassIconIndex','create','HideCeilingPassability','Zrzpm','_fullRevealMaps','wKszN','NsoCm','Proximity','clearRect','LLfyV','ZyaEE','TILE_OPACITY','setPlayerCompassIcon','_unexploredMask','YrknG','_erased','isMinimapExplorable','isSceneMap','note','DefaultEventIcon_Below','changeVolume','setLargeMinimapMode','Scene_Map_updateMain','jCGPI','MinimapToggle','_maskContainer','onLoadCustomMinimap','CompassPlayerIcon','Filename','TwTlF','TMADt','Enable','AllForbid','toLowerCase','showCompass','iconWidth','createPictureBack','getLargeMinimapMode','updateMinimap','_playerCompassIcon','floor','autotileType','2411922hlBoVy','hrZJq','_priorityType','clearMinimapExploredMapData','remove','applyData','_minimapExploredTiles','_ProximityCompassBackgroundSprite','IconSet','page','qakIy','_realX','eYlvk','hoAAY','bitmap','addLoadListener','split','Options','trim','parent','PlayerAllow','AllAllow','YfGGw','DhdfN','UxOcD','VisuMZ_1_EventsMoveCore','isTriggered','_ProximityMinimap','addFullRevealMinimap','createCharacters','Minimap','Game_Event_setupSpawn','setupSpawnProximityCompass','ConfigManager_makeData','getPassabilityMinimap','loadPicture','IGNORE_CEILING_PASSABILITY','IeSop','setupProximityCompassNotetags','updateExploration','DefaultEventIcon_Same','MlYVD','ConvertParams','_largeMinimapChild','PlayerForbid','%1,%2','toggle','4705280lvxDqt','isPassable','call','hBVLA','CenterX','iconIndex','contains','gAwKd','createMinimap','screenX','filter','name','createDefaultMinimap','drawCircle','getCompassProximity','drawOnUnexploredMask','ToggleKey','push','_customModified','Radius','updatePositionMinimapSmall','LXARh','_minimapSprite','_largeMinimapMode','fillRect','debugTestRevealMap','isLoopHorizontal','KIePv','pmtTV','createPassabilityMinimap','_eventOverload','setShowProximityCompass','AdjustRect','parse','isVolumeSymbol','map','Window_Options_isVolumeSymbol','isMinimapSprite','smooth','XtMDy','SUszC','ARRAYEVAL','igFYG'];_0x2ba7=function(){return _0x896fb3;};return _0x2ba7();}function Sprite_ProximityMinimap(){const _0x505a63=_0x1730b4;this['initialize'][_0x505a63(0x10f)](this,arguments);}Sprite_ProximityMinimap[_0x1730b4(0x232)]=Object[_0x1730b4(0x171)](Sprite_Clickable['prototype']),Sprite_ProximityMinimap[_0x1730b4(0x232)]['constructor']=Sprite_ProximityMinimap,Sprite_ProximityMinimap[_0x1730b4(0x101)]=VisuMZ[_0x1730b4(0x10a)][_0x1730b4(0xee)][_0x1730b4(0x1b8)][_0x1730b4(0x18f)],Sprite_ProximityMinimap['COMPASS_FRAME']=VisuMZ[_0x1730b4(0x10a)]['Settings'][_0x1730b4(0x1b8)][_0x1730b4(0x18c)]||'',Sprite_ProximityMinimap[_0x1730b4(0x117)]=VisuMZ[_0x1730b4(0x10a)]['Settings'][_0x1730b4(0x1b8)][_0x1730b4(0x131)]||0x0,Sprite_ProximityMinimap['TILE_SIZE']=VisuMZ[_0x1730b4(0x10a)][_0x1730b4(0xee)][_0x1730b4(0x1b8)]['TileSharpness']||0x8,Sprite_ProximityMinimap['TILE_OPACITY']=VisuMZ[_0x1730b4(0x10a)][_0x1730b4(0xee)][_0x1730b4(0x1b8)][_0x1730b4(0x14b)]||0x80,Sprite_ProximityMinimap['IGNORE_CEILING_PASSABILITY']=VisuMZ[_0x1730b4(0x10a)][_0x1730b4(0xee)][_0x1730b4(0x1b8)][_0x1730b4(0x172)]||![],Sprite_ProximityMinimap[_0x1730b4(0x13f)]=VisuMZ['ProximityCompass'][_0x1730b4(0xee)][_0x1730b4(0x1b8)]['BorderBuffer']||0x0,Sprite_ProximityMinimap[_0x1730b4(0x20f)]=VisuMZ['ProximityCompass'][_0x1730b4(0xee)]['Minimap'][_0x1730b4(0x158)]||![],Sprite_ProximityMinimap['BACK_FILENAME']=VisuMZ[_0x1730b4(0x10a)]['Settings'][_0x1730b4(0x1b8)][_0x1730b4(0xf7)]||'',Sprite_ProximityMinimap['BACK_IMG_OPACITY']=VisuMZ[_0x1730b4(0x10a)][_0x1730b4(0xee)][_0x1730b4(0x1b8)]['ImageOpacity']||0x1,Sprite_ProximityMinimap[_0x1730b4(0x1f9)]=VisuMZ[_0x1730b4(0x10a)]['Settings'][_0x1730b4(0x1b8)][_0x1730b4(0xf5)]||0x0,Sprite_ProximityMinimap[_0x1730b4(0x232)]['initialize']=function(){const _0x54ac5c=_0x1730b4;Sprite_Clickable[_0x54ac5c(0x232)]['initialize'][_0x54ac5c(0x1cb)](this),this[_0x54ac5c(0x165)](),this['createSprites']();},Sprite_ProximityMinimap[_0x1730b4(0x232)][_0x1730b4(0x165)]=function(){const _0x1070ef=_0x1730b4;this['x']=Math[_0x1070ef(0x206)](Graphics['width']/0x2),this['y']=Math[_0x1070ef(0x206)](Graphics['height']/0x2),this[_0x1070ef(0x1fe)]['x']=0.5,this['anchor']['y']=0.5,this['opacity']=this['isShow']()?0xff:0x0,this[_0x1070ef(0x211)]=-0x32,this[_0x1070ef(0x24b)]=-0x32;},Sprite_ProximityMinimap[_0x1730b4(0x232)][_0x1730b4(0x22d)]=function(){const _0x35697b=_0x1730b4;this[_0x35697b(0x194)](),this[_0x35697b(0x236)](),this[_0x35697b(0x1f4)](),this[_0x35697b(0x1d1)](),this[_0x35697b(0x1f6)](),this[_0x35697b(0x108)](),this[_0x35697b(0x247)](),this[_0x35697b(0x1b7)](),this[_0x35697b(0x153)]();},Sprite_ProximityMinimap[_0x1730b4(0x232)][_0x1730b4(0x194)]=function(){const _0x2446ff=_0x1730b4;if(!this[_0x2446ff(0x231)]())return;const _0x100de5=Sprite_ProximityMinimap[_0x2446ff(0x20c)];this['_pictureBackSprite']=new Sprite(),this[_0x2446ff(0x129)][_0x2446ff(0x1a8)]=ImageManager[_0x2446ff(0x1bd)](_0x100de5),this[_0x2446ff(0x15a)](this[_0x2446ff(0x129)]),this[_0x2446ff(0x129)]['anchor']['x']=0.5,this[_0x2446ff(0x129)][_0x2446ff(0x1fe)]['y']=0.5,this[_0x2446ff(0x129)][_0x2446ff(0x1fa)]=Sprite_ProximityMinimap['BACK_IMG_OPACITY'];},Sprite_ProximityMinimap[_0x1730b4(0x232)][_0x1730b4(0x231)]=function(){const _0x26cf52=_0x1730b4;return Sprite_ProximityMinimap[_0x26cf52(0x20c)]!=='';},Sprite_ProximityMinimap[_0x1730b4(0x232)][_0x1730b4(0x236)]=function(){const _0x578934=_0x1730b4,_0x4d22b7=VisuMZ[_0x578934(0x10a)]['Settings'][_0x578934(0x125)],_0x52d772=_0x4d22b7[_0x578934(0x230)];this[_0x578934(0x207)]=new Sprite(),this[_0x578934(0x15a)](this['_backgroundSprite']),this[_0x578934(0x207)][_0x578934(0x1a8)]=new Bitmap(0x1,0x1),this[_0x578934(0x207)][_0x578934(0x1a8)][_0x578934(0x1e1)](0x0,0x0,0x1,0x1,_0x52d772),this[_0x578934(0x207)][_0x578934(0x1a8)]['smooth']=![],this[_0x578934(0x207)][_0x578934(0x1fe)]['x']=0.5,this[_0x578934(0x207)][_0x578934(0x1fe)]['y']=0.5,this[_0x578934(0x207)]['opacity']=_0x4d22b7[_0x578934(0x24e)],this[_0x578934(0x231)]()&&(this[_0x578934(0x207)][_0x578934(0x1fa)]=0x0);},Sprite_ProximityMinimap['prototype']['createContainer']=function(){const _0x4e00c0=_0x1730b4;this[_0x4e00c0(0x189)]=new Sprite(),this['addChild'](this[_0x4e00c0(0x189)]);},Sprite_ProximityMinimap[_0x1730b4(0x232)]['createMinimap']=function(){const _0x2aaf2f=_0x1730b4;let _0x417d73=![];const _0x25f275=$dataMap?$dataMap['note']||'':'';if(_0x25f275[_0x2aaf2f(0x221)](/<MINIMAP IMAGE:[ ](.*)>/i)){if(_0x2aaf2f(0x1a4)===_0x2aaf2f(0x1a4)){const _0x5582c5=RegExp['$1'][_0x2aaf2f(0x1ac)]();this['createImageMinimap'](_0x5582c5),_0x417d73=!![];}else this[_0x2aaf2f(0x12f)]();}else{if(_0x2aaf2f(0x212)===_0x2aaf2f(0x212))this[_0x2aaf2f(0x1d5)]();else{_0x310e1a[_0x2aaf2f(0x1c4)](_0xecb435,_0x1d6f3f);const _0x2dc088=_0xcad977[_0x2aaf2f(0x1ce)];_0xa3cfe6[_0x2aaf2f(0x17c)](_0x2dc088);}}this['_minimapSprite'][_0x2aaf2f(0x1fe)]['x']=0.5,this[_0x2aaf2f(0x1df)][_0x2aaf2f(0x1fe)]['y']=0.5,this[_0x2aaf2f(0x1df)][_0x2aaf2f(0x1fa)]=Sprite_ProximityMinimap['TILE_OPACITY'];const _0x41ccde=Sprite_ProximityMinimap[_0x2aaf2f(0x13f)]*0x2,_0x43099f=ImageManager[_0x2aaf2f(0x1bc)](),_0x238cc1=(Graphics[_0x2aaf2f(0x167)]-_0x41ccde-0x2)/(_0x43099f[_0x2aaf2f(0x167)]/($gameMap[_0x2aaf2f(0x1e3)]()?0x3:0x1)),_0x4ef22b=(Graphics[_0x2aaf2f(0x223)]-_0x41ccde-0x2)/(_0x43099f['height']/($gameMap[_0x2aaf2f(0x225)]()?0x3:0x1));this[_0x2aaf2f(0x21c)]=Math[_0x2aaf2f(0x142)](_0x238cc1,_0x4ef22b),!_0x417d73&&(_0x2aaf2f(0x121)===_0x2aaf2f(0x121)?(this[_0x2aaf2f(0x1df)][_0x2aaf2f(0x241)]['x']=this[_0x2aaf2f(0x21c)],this[_0x2aaf2f(0x1df)]['scale']['y']=this['_minimapScale']):_0x23ccf1*=_0x39f5c9[_0x2aaf2f(0x114)]);},Sprite_ProximityMinimap[_0x1730b4(0x232)][_0x1730b4(0x146)]=function(_0x1d743c){const _0xc4e96c=_0x1730b4;this[_0xc4e96c(0x1df)]=new Sprite(),this['_minimapSprite']['bitmap']=ImageManager[_0xc4e96c(0x1bd)](_0x1d743c),this[_0xc4e96c(0x189)][_0xc4e96c(0x15a)](this[_0xc4e96c(0x1df)]),this[_0xc4e96c(0x1df)][_0xc4e96c(0x1a8)][_0xc4e96c(0x1a9)](this[_0xc4e96c(0x22b)]['bind'](this));},Sprite_ProximityMinimap[_0x1730b4(0x232)][_0x1730b4(0x22b)]=function(){const _0x14c888=_0x1730b4,_0x68892e=Sprite_ProximityMinimap['BORDER_BUFFER']*0x2,_0x447654=(Graphics['width']-_0x68892e-0x2)/this[_0x14c888(0x1df)][_0x14c888(0x167)],_0x264759=(Graphics[_0x14c888(0x223)]-_0x68892e-0x2)/this['_minimapSprite'][_0x14c888(0x223)],_0x29cf48=Math[_0x14c888(0x142)](_0x447654,_0x264759);this[_0x14c888(0x1df)][_0x14c888(0x241)]['x']=_0x29cf48,this[_0x14c888(0x1df)]['scale']['y']=_0x29cf48;},Sprite_ProximityMinimap[_0x1730b4(0x232)]['createDefaultMinimap']=function(){const _0x5715b1=_0x1730b4;this[_0x5715b1(0x1df)]=new Sprite(),this[_0x5715b1(0x1df)][_0x5715b1(0x1a8)]=ImageManager[_0x5715b1(0x1bc)](),this['_maskContainer']['addChild'](this[_0x5715b1(0x1df)]);const _0x5020d0=$gameMap[_0x5715b1(0x167)]()*Sprite_ProximityMinimap[_0x5715b1(0x168)],_0x30c051=$gameMap[_0x5715b1(0x223)]()*Sprite_ProximityMinimap['TILE_SIZE'],_0xd4ca32=$gameMap[_0x5715b1(0x1e3)]()?_0x5020d0:0x0,_0x598d88=$gameMap['isLoopVertical']()?_0x30c051:0x0;this['_minimapSprite']['setFrame'](_0xd4ca32,_0x598d88,_0x5020d0,_0x30c051);if(this['usesPictureBack']()){if(_0x5715b1(0xde)!==_0x5715b1(0x240)){const _0x1907f3=Sprite_ProximityMinimap[_0x5715b1(0x1f9)];this[_0x5715b1(0x1df)][_0x5715b1(0x10c)]=_0x1907f3;}else this[_0x5715b1(0x1fa)]-=_0x2717e5;}},Sprite_ProximityMinimap[_0x1730b4(0x232)][_0x1730b4(0x1f6)]=function(){const _0x1d9e69=_0x1730b4;this['_unexploredMask']=new Sprite(),this[_0x1d9e69(0x17d)][_0x1d9e69(0x1a8)]=new Bitmap($gameMap[_0x1d9e69(0x167)](),$gameMap['height']()),this[_0x1d9e69(0x17d)][_0x1d9e69(0x1a8)][_0x1d9e69(0x1ef)]=ImageManager['getPassabilityMinimap']()['smooth'],this[_0x1d9e69(0x189)][_0x1d9e69(0x15a)](this['_unexploredMask']),this[_0x1d9e69(0x189)][_0x1d9e69(0x100)]=this['_unexploredMask'],this[_0x1d9e69(0x17d)][_0x1d9e69(0x1fe)]['x']=0.5,this[_0x1d9e69(0x17d)][_0x1d9e69(0x1fe)]['y']=0.5,this['_unexploredMask'][_0x1d9e69(0x241)]['x']=this[_0x1d9e69(0x21c)]*Sprite_ProximityMinimap[_0x1d9e69(0x168)],this['_unexploredMask'][_0x1d9e69(0x241)]['y']=this[_0x1d9e69(0x21c)]*Sprite_ProximityMinimap[_0x1d9e69(0x168)];},Sprite_ProximityMinimap['prototype'][_0x1730b4(0x108)]=function(){const _0x45895e=_0x1730b4;if(!this[_0x45895e(0x17d)])return;if(!$gameMap[_0x45895e(0x180)]()){if('RiGrV'===_0x45895e(0x210)){this[_0x45895e(0x17d)]['bitmap'][_0x45895e(0x1e1)](0x0,0x0,$gameMap[_0x45895e(0x167)](),$gameMap[_0x45895e(0x223)](),_0x45895e(0x15c));return;}else return _0x366382[_0x45895e(0x20c)]!=='';}const _0x1fc92e=$gameMap[_0x45895e(0x12b)]($gameMap[_0x45895e(0x16b)]());for(const _0x5de7f2 of _0x1fc92e){const _0x2314b4=_0x5de7f2[_0x45895e(0x1aa)](',')['map'](_0x39761d=>Number(_0x39761d)||0x0);this['drawOnUnexploredMask'](_0x2314b4[0x0],_0x2314b4[0x1]);}},Sprite_ProximityMinimap[_0x1730b4(0x232)][_0x1730b4(0x247)]=function(){const _0x59704e=_0x1730b4,_0x2917eb=0x2,_0x4e6309=Math['ceil'](this['_minimapScale']*this[_0x59704e(0x1df)][_0x59704e(0x167)])+_0x2917eb,_0x39f7d1=Math[_0x59704e(0x144)](this[_0x59704e(0x21c)]*this[_0x59704e(0x1df)]['height'])+_0x2917eb;this['_backgroundSprite'][_0x59704e(0x241)]['x']=_0x4e6309,this[_0x59704e(0x207)][_0x59704e(0x241)]['y']=_0x39f7d1;},Sprite_ProximityMinimap[_0x1730b4(0x232)][_0x1730b4(0x1b7)]=function(){const _0x33daab=_0x1730b4;this[_0x33daab(0x23a)]=[],this['_characterContainer']=new Sprite(),this['_maskContainer'][_0x33daab(0x15a)](this['_characterContainer']);for(const _0x56a61c of $gameMap['events']()){if(!_0x56a61c)continue;const _0x248aa0=new Sprite_CompassIcon(_0x56a61c);_0x248aa0[_0x33daab(0x107)](this[_0x33daab(0x21c)]),this[_0x33daab(0x23a)][_0x33daab(0x1da)](_0x248aa0);}this[_0x33daab(0x132)]=new Sprite_CompassIcon($gamePlayer),this[_0x33daab(0x132)][_0x33daab(0x107)](this[_0x33daab(0x21c)]),this[_0x33daab(0x23a)][_0x33daab(0x1da)](this[_0x33daab(0x132)]);for(const _0x1a66c4 of this[_0x33daab(0x23a)]){_0x33daab(0xfa)!=='iCWHU'?this[_0x33daab(0x234)][_0x33daab(0x15a)](_0x1a66c4):(_0x5bd670[_0x33daab(0x10a)]['Scene_Map_createSpriteset'][_0x33daab(0x1cb)](this),this[_0x33daab(0x237)](),this[_0x33daab(0x202)]());}this[_0x33daab(0x234)]['addChild'](this['_playerSprite']);},Sprite_ProximityMinimap['prototype'][_0x1730b4(0x153)]=function(){const _0xc99843=_0x1730b4;Sprite_Clickable[_0xc99843(0x232)][_0xc99843(0x153)]['call'](this),this[_0xc99843(0x12d)](),this[_0xc99843(0x1c1)]();},Sprite_ProximityMinimap[_0x1730b4(0x232)][_0x1730b4(0x12d)]=function(){const _0x2e3732=_0x1730b4,_0x765b84=VisuMZ[_0x2e3732(0x10a)][_0x2e3732(0xee)][_0x2e3732(0x125)],_0x18e6fa=_0x765b84[_0x2e3732(0x12a)];this[_0x2e3732(0x169)]()?this[_0x2e3732(0x1fa)]+=_0x18e6fa:this['opacity']-=_0x18e6fa;},Sprite_ProximityMinimap[_0x1730b4(0x232)]['isShow']=function(){const _0x1135cf=_0x1730b4,_0x5498bf=VisuMZ[_0x1135cf(0x10a)][_0x1135cf(0xee)]['Minimap'];if($gameMap[_0x1135cf(0x215)]())return![];else{if(_0x5498bf[_0x1135cf(0xdd)]&&$gameMessage['isBusy']())return![];else{if(_0x5498bf[_0x1135cf(0x133)]&&$gameMap['isEventRunning']())return![];else{if(!$gameSystem[_0x1135cf(0x195)]())return![];else{if(_0x1135cf(0x152)===_0x1135cf(0x152))return $gameSystem[_0x1135cf(0x14d)]();else{const _0x1aaa50=_0x1f9b57[_0x1135cf(0x10a)][_0x1135cf(0x1bb)]['call'](this);return _0x1aaa50[_0x1135cf(0x192)]=this[_0x1135cf(0x192)],_0x1aaa50['compassSize']=this[_0x1135cf(0xf2)],_0x1aaa50;}}}}}},Sprite_ProximityMinimap['prototype'][_0x1730b4(0x1c1)]=function(){const _0x21f754=_0x1730b4;if(!this[_0x21f754(0x17d)])return;if(!$gameMap[_0x21f754(0x180)]())return;if($gamePlayer['x']===this[_0x21f754(0x211)]&&$gamePlayer['y']===this[_0x21f754(0x24b)])return;const _0x5ca2be=$gamePlayer['x'],_0x1c75d0=$gamePlayer['y'];this['_lastPlayerX']=_0x5ca2be,this[_0x21f754(0x24b)]=_0x1c75d0;const _0x1fdddb=$gameMap['mapId']();$gameMap[_0x21f754(0xdb)](_0x1fdddb,_0x5ca2be,_0x1c75d0),this[_0x21f754(0x1d8)](_0x5ca2be,_0x1c75d0);},Sprite_ProximityMinimap[_0x1730b4(0x232)][_0x1730b4(0x1d8)]=function(_0x19ede1,_0x28cd80){const _0x364116=_0x1730b4;if(!this[_0x364116(0x17d)])return;const _0x508294=this['_unexploredMask'][_0x364116(0x1a8)],_0xc0f60d=Math[_0x364116(0x144)](Graphics[_0x364116(0x167)]/$gameMap[_0x364116(0x161)]()),_0x4c2bf9=Math['ceil'](Graphics[_0x364116(0x223)]/$gameMap[_0x364116(0x21b)]()),_0x93dcb0=Math['ceil'](_0xc0f60d/0x2),_0x2e12a3=Math['ceil'](_0x4c2bf9/0x2);let _0x258cd8=_0x19ede1-_0x93dcb0,_0x555fb1=_0x28cd80-_0x2e12a3;!$gameMap[_0x364116(0x1e3)]()&&('qpRuW'===_0x364116(0x127)?(_0x258cd8=Math[_0x364116(0x11d)](_0x258cd8,0x0),_0x258cd8=Math[_0x364116(0x142)](_0x258cd8,$gameMap[_0x364116(0x167)]()-_0xc0f60d)):_0x5cef27=_0x152041['max'](_0x35a0c3,_0x1ec08c));!$gameMap['isLoopVertical']()&&(_0x555fb1=Math['max'](_0x555fb1,0x0),_0x555fb1=Math[_0x364116(0x142)](_0x555fb1,$gameMap['height']()-_0x4c2bf9));_0x508294[_0x364116(0x1e1)](_0x258cd8,_0x555fb1,_0xc0f60d,_0x4c2bf9,'white');const _0x1a0bbe=_0x258cd8;if($gameMap[_0x364116(0x1e3)]()){if(_0x364116(0x239)!=='nDQoK'){if(_0x258cd8<0x0)_0x258cd8+=$gameMap[_0x364116(0x167)]();else _0x258cd8>$gameMap[_0x364116(0x167)]()-_0xc0f60d&&(_0x258cd8-=$gameMap[_0x364116(0x167)]());_0x508294[_0x364116(0x1e1)](_0x258cd8,_0x555fb1,_0xc0f60d,_0x4c2bf9,_0x364116(0x15c));}else this[_0x364116(0x174)]=this[_0x364116(0x174)]||[],this['_fullRevealMaps'][_0x364116(0x19e)](_0xc4fbb7);}if($gameMap[_0x364116(0x225)]()){if(_0x364116(0x154)!==_0x364116(0x209)){if(_0x555fb1<0x0)_0x555fb1+=$gameMap[_0x364116(0x223)]();else _0x555fb1>$gameMap[_0x364116(0x223)]()-_0x4c2bf9&&(_0x555fb1-=$gameMap[_0x364116(0x223)]());_0x508294[_0x364116(0x1e1)](_0x258cd8,_0x555fb1,_0xc0f60d,_0x4c2bf9,_0x364116(0x15c));}else{const _0x486fad=_0x473e63[_0x364116(0x1b5)];_0x486fad&&_0x486fad['clearUnexploredMask']();}}if($gameMap[_0x364116(0x1e3)]()&&$gameMap['isLoopVertical']()&&_0x258cd8!==_0x1a0bbe){if('igFYG'!==_0x364116(0x1f3)){const _0x22eb22=_0x316ba8[_0x364116(0xf2)],_0x565736=_0x364116(0xf2);this['addCommand'](_0x22eb22,_0x565736);}else _0x508294['fillRect'](_0x1a0bbe,_0x555fb1,_0xc0f60d,_0x4c2bf9,_0x364116(0x15c));}},Sprite_ProximityMinimap[_0x1730b4(0x232)]['clearUnexploredMask']=function(){const _0x5cbae2=_0x1730b4;if(!this[_0x5cbae2(0x17d)])return;const _0x5eb1e3=this[_0x5cbae2(0x17d)]['bitmap'];_0x5eb1e3[_0x5cbae2(0xe0)](),this[_0x5cbae2(0x211)]=-0x32,this[_0x5cbae2(0x24b)]=-0x32,this[_0x5cbae2(0x1c1)]();},Sprite_ProximityMinimap[_0x1730b4(0x232)][_0x1730b4(0x208)]=function(){const _0x2b2578=_0x1730b4;if(!this['_unexploredMask'])return;const _0x7753c6=this[_0x2b2578(0x17d)][_0x2b2578(0x1a8)];_0x7753c6[_0x2b2578(0x1e1)](0x0,0x0,_0x7753c6[_0x2b2578(0x167)],_0x7753c6[_0x2b2578(0x223)],_0x2b2578(0x15c));};function Sprite_CompassIcon(){const _0x3522cc=_0x1730b4;this[_0x3522cc(0x118)]['apply'](this,arguments);}Sprite_CompassIcon[_0x1730b4(0x232)]=Object[_0x1730b4(0x171)](Sprite['prototype']),Sprite_CompassIcon[_0x1730b4(0x232)][_0x1730b4(0x10d)]=Sprite_CompassIcon,Sprite_CompassIcon['prototype'][_0x1730b4(0x118)]=function(_0x904284){const _0x11be84=_0x1730b4;this[_0x11be84(0x12e)]=_0x904284,this['_iconIndex']=0x0,Sprite['prototype']['initialize']['call'](this),this[_0x11be84(0x165)](),this[_0x11be84(0x229)](),this['setInitialOpacity']();},Sprite_CompassIcon[_0x1730b4(0x232)][_0x1730b4(0x165)]=function(){const _0x2d46f3=_0x1730b4;this[_0x2d46f3(0x1fe)]['x']=0.5,this[_0x2d46f3(0x1fe)]['y']=0.5;var _0x6d84aa=0x1/(ConfigManager['compassSize']*0.01);this[_0x2d46f3(0x241)]['x']=_0x6d84aa,this[_0x2d46f3(0x241)]['y']=_0x6d84aa,this[_0x2d46f3(0x1c5)]=![],this['_largeMinimapScale']=0x1;},Sprite_CompassIcon[_0x1730b4(0x232)][_0x1730b4(0x229)]=function(){const _0x6bccf6=_0x1730b4;this['bitmap']=ImageManager[_0x6bccf6(0x14c)]('IconSet');},Sprite_CompassIcon['prototype']['setInitialOpacity']=function(){const _0x966c29=_0x1730b4;if(this[_0x966c29(0x12e)]===$gamePlayer)_0x966c29(0x1c3)!==_0x966c29(0x123)?this[_0x966c29(0x1fa)]=0xff:(_0x294236['ProximityCompass'][_0x966c29(0xee)][_0x966c29(0x1ab)][_0x966c29(0x14a)]&&this[_0x966c29(0x115)](),_0x82a70a['ProximityCompass'][_0x966c29(0xee)][_0x966c29(0x1ab)][_0x966c29(0x126)]&&this['addProximityCompassSizeCommand']());else{var _0x1a4b1f=this[_0x966c29(0x1d7)](),_0xaa827c=$gameMap[_0x966c29(0x204)](this[_0x966c29(0x12e)][_0x966c29(0x1a5)],$gamePlayer[_0x966c29(0x1a5)]),_0x344d54=$gameMap[_0x966c29(0x204)](this[_0x966c29(0x12e)][_0x966c29(0xe6)],$gamePlayer[_0x966c29(0xe6)]);_0x1a4b1f>=Math[_0x966c29(0x105)](_0xaa827c)+Math[_0x966c29(0x105)](_0x344d54)?_0x966c29(0x16e)==='kWAUC'?(_0x46728e['ProximityCompass'][_0x966c29(0xe8)][_0x966c29(0x1cb)](this),this['initProximityCompassEffects']()):this[_0x966c29(0x1fa)]=0xff:this[_0x966c29(0x1fa)]=0x0;}},Sprite_CompassIcon['prototype']['getCompassProximity']=function(){const _0x30910a=_0x1730b4;if(this['isLargeMinimapChild']()){if(VisuMZ[_0x30910a(0x10a)]['Settings'][_0x30910a(0x1b8)][_0x30910a(0x143)])return 0xf4240;}return this['_character']?this['_character'][_0x30910a(0x23b)]:0x1;},Sprite_CompassIcon[_0x1730b4(0x232)][_0x1730b4(0x107)]=function(_0x2751f1){const _0x53b168=_0x1730b4;this[_0x53b168(0x1c5)]=!![],this['_largeMinimapScale']=_0x2751f1;},Sprite_CompassIcon['prototype'][_0x1730b4(0x128)]=function(){const _0xa2371=_0x1730b4;return this[_0xa2371(0x1c5)];},Sprite_CompassIcon[_0x1730b4(0x232)]['update']=function(){const _0x704854=_0x1730b4;Sprite[_0x704854(0x232)][_0x704854(0x153)][_0x704854(0x1cb)](this),this[_0x704854(0x12d)](),this[_0x704854(0xe3)](),this[_0x704854(0xfc)](),this['updateScale']();},Sprite_CompassIcon[_0x1730b4(0x232)][_0x1730b4(0x12d)]=function(){const _0x24595f=_0x1730b4;if(this[_0x24595f(0x12e)]===$gamePlayer)this[_0x24595f(0x1fa)]=0xff;else{if(this['_character']&&this[_0x24595f(0x12e)][_0x24595f(0x17f)]){if('tSNIT'===_0x24595f(0x16f))return![];else this[_0x24595f(0x1fa)]=0x0;}else{var _0x4a6b98=this[_0x24595f(0x1d7)](),_0x14e0a2=$gameMap[_0x24595f(0x204)](this[_0x24595f(0x12e)][_0x24595f(0x1a5)],$gamePlayer[_0x24595f(0x1a5)]),_0x270afa=$gameMap['deltaX'](this[_0x24595f(0x12e)][_0x24595f(0xe6)],$gamePlayer[_0x24595f(0xe6)]);const _0x3ed9ca=VisuMZ[_0x24595f(0x10a)][_0x24595f(0xee)][_0x24595f(0x125)]['IconFadeSpeed'];_0x4a6b98>=Math[_0x24595f(0x105)](_0x14e0a2)+Math[_0x24595f(0x105)](_0x270afa)?this['opacity']+=_0x3ed9ca:this[_0x24595f(0x1fa)]-=_0x3ed9ca;}}},Sprite_CompassIcon[_0x1730b4(0x232)]['updateFrame']=function(){const _0x5d6e84=_0x1730b4;this['_iconIndex']=this[_0x5d6e84(0xfe)]();if(this[_0x5d6e84(0x104)]===0x0)this[_0x5d6e84(0x216)](0x0,0x0,0x0,0x0);else{var _0x332e88=ImageManager[_0x5d6e84(0x193)],_0x4d3206=ImageManager['iconHeight'],_0x27aa42=this[_0x5d6e84(0x104)]%0x10*_0x332e88,_0x3d9738=Math[_0x5d6e84(0x198)](this[_0x5d6e84(0x104)]/0x10)*_0x4d3206;this['setFrame'](_0x27aa42,_0x3d9738,_0x332e88,_0x4d3206);}},Sprite_CompassIcon[_0x1730b4(0x232)]['getCompassIcon']=function(){const _0xb869ac=_0x1730b4;if(this['_character']===$gamePlayer)return _0xb869ac(0x175)!==_0xb869ac(0xe4)?$gameSystem[_0xb869ac(0x120)]():_0x14578f[_0xb869ac(0x14d)]();else{if(this[_0xb869ac(0x128)]())return this[_0xb869ac(0x12e)][_0xb869ac(0x170)]||this[_0xb869ac(0x12e)][_0xb869ac(0xda)];else{if(_0xb869ac(0x138)!==_0xb869ac(0x213))return this[_0xb869ac(0x12e)]['_compassIconIndex'];else _0x3f489c(_0xb869ac(0xe2)[_0xb869ac(0x249)](_0x45e70c,_0x70d05a)),_0x1e744f['exit']();}}},Sprite_CompassIcon[_0x1730b4(0x232)][_0x1730b4(0xfc)]=function(){const _0x40c5fa=_0x1730b4;if(this['isLargeMinimapChild']())_0x40c5fa(0x1a7)!==_0x40c5fa(0x141)?this[_0x40c5fa(0x15f)]():_0x3165bc+=_0x179750[_0x40c5fa(0x167)]();else this[_0x40c5fa(0x1ee)]()?this[_0x40c5fa(0x1dd)]():this['updatePositionClassic']();},Sprite_CompassIcon[_0x1730b4(0x232)][_0x1730b4(0x1ee)]=function(){const _0x459796=_0x1730b4;return this[_0x459796(0x1ad)]&&this[_0x459796(0x1ad)][_0x459796(0x1df)];},Sprite_CompassIcon['prototype']['updatePositionClassic']=function(){const _0x1a368b=_0x1730b4,_0x5cdbd9=VisuMZ[_0x1a368b(0x10a)][_0x1a368b(0xee)][_0x1a368b(0x125)];var _0x16c521=_0x5cdbd9['Radius'],_0x553553=_0x5cdbd9['TileScale']*$gameMap[_0x1a368b(0x161)](),_0x143d5f=$gameMap[_0x1a368b(0x204)](this['_character']['_realX'],$gamePlayer[_0x1a368b(0x1a5)])*_0x553553,_0x52d4c8=$gameMap[_0x1a368b(0x204)](this[_0x1a368b(0x12e)]['_realY'],$gamePlayer[_0x1a368b(0xe6)])*_0x553553,_0x43bcdd=Math[_0x1a368b(0xdf)](_0x143d5f*_0x143d5f+_0x52d4c8*_0x52d4c8);if(_0x43bcdd<_0x16c521)this['x']=Math[_0x1a368b(0x206)](_0x143d5f),this['y']=Math['round'](_0x52d4c8);else{var _0x4894df=Math[_0x1a368b(0x23d)](_0x52d4c8,_0x143d5f);this['x']=Math[_0x1a368b(0x206)](_0x16c521*Math[_0x1a368b(0x21e)](_0x4894df)),this['y']=Math['round'](_0x16c521*Math[_0x1a368b(0x110)](_0x4894df));}},Sprite_CompassIcon[_0x1730b4(0x232)][_0x1730b4(0x1dd)]=function(){const _0x282675=_0x1730b4,_0x864eb2=VisuMZ[_0x282675(0x10a)][_0x282675(0xee)][_0x282675(0x125)],_0x1cf2dd=_0x864eb2[_0x282675(0x1dc)],_0x158aaf=_0x864eb2[_0x282675(0x124)]*$gameMap[_0x282675(0x161)](),_0x525592=$gameMap[_0x282675(0x204)](this[_0x282675(0x12e)][_0x282675(0x1a5)],$gamePlayer['_realX'])*_0x158aaf,_0x1dca6c=$gameMap[_0x282675(0x204)](this['_character'][_0x282675(0xe6)],$gamePlayer[_0x282675(0xe6)])*_0x158aaf,_0x298016=Math[_0x282675(0xdf)](_0x525592*_0x525592+_0x1dca6c*_0x1dca6c);this['x']=Math[_0x282675(0x206)](_0x525592),this['y']=Math[_0x282675(0x206)](_0x1dca6c);if(_0x298016>=_0x1cf2dd){const _0x504958=_0x525592[_0x282675(0x218)](-_0x1cf2dd,_0x1cf2dd),_0x1dd11e=_0x1dca6c[_0x282675(0x218)](-_0x1cf2dd,_0x1cf2dd),_0x1e4e3a=Math[_0x282675(0x23d)](_0x1dd11e,_0x504958),_0x3f8aca=Math['cos'](_0x1e4e3a)*_0x1cf2dd,_0xd1d5e0=Math['sin'](_0x1e4e3a)*_0x1cf2dd;this['x']=Math[_0x282675(0x206)](_0x525592)[_0x282675(0x218)](-_0x3f8aca,_0x3f8aca),this['y']=Math[_0x282675(0x206)](_0x1dca6c)[_0x282675(0x218)](-_0xd1d5e0,_0xd1d5e0);}},Sprite_CompassIcon[_0x1730b4(0x232)][_0x1730b4(0x15f)]=function(){const _0x4e0f31=_0x1730b4,_0xe4a187=$gameMap['width'](),_0x531948=$gameMap[_0x4e0f31(0x223)](),_0x30b105=this['_largeMinimapScale'];let _0x1ccee5=this[_0x4e0f31(0x12e)]['_realX']+0.5,_0x19ca46=this[_0x4e0f31(0x12e)]['_realY']+0.5;const _0x44d911=Sprite_ProximityMinimap[_0x4e0f31(0x168)]*_0x30b105;_0x1ccee5*=_0x44d911,_0x19ca46*=_0x44d911,_0x1ccee5-=_0xe4a187/0x2*_0x44d911,_0x19ca46-=_0x531948/0x2*_0x44d911,this['x']=_0x1ccee5,this['y']=_0x19ca46;},Sprite_CompassIcon[_0x1730b4(0x232)]['updateScale']=function(){const _0x5ef2f5=_0x1730b4;let _0x23df0a=0x1/(ConfigManager[_0x5ef2f5(0xf2)]*0.01);if(this[_0x5ef2f5(0x128)]()){const _0x502901=VisuMZ[_0x5ef2f5(0x10a)]['Settings'][_0x5ef2f5(0x1b8)];if(this[_0x5ef2f5(0x12e)]===$gamePlayer)_0x5ef2f5(0x122)!==_0x5ef2f5(0x122)?this[_0x5ef2f5(0x1a8)]=_0x358f89[_0x5ef2f5(0x14c)](_0x5ef2f5(0x1a2)):_0x23df0a*=_0x502901[_0x5ef2f5(0x114)];else{if(this[_0x5ef2f5(0x12e)][_0x5ef2f5(0x170)]>0x0)_0x23df0a*=_0x502901[_0x5ef2f5(0xff)];else{if(this['_character'][_0x5ef2f5(0x170)]<=0x0){if(_0x5ef2f5(0x149)==='QagBW')_0x23df0a*=_0x502901[_0x5ef2f5(0x155)];else{if(_0x4da696[_0x5ef2f5(0x10a)][_0x5ef2f5(0xee)][_0x5ef2f5(0x1b8)][_0x5ef2f5(0x143)])return 0xf4240;}}}}}this[_0x5ef2f5(0x241)]['x']=_0x23df0a,this[_0x5ef2f5(0x241)]['y']=_0x23df0a;},VisuMZ[_0x1730b4(0x10a)][_0x1730b4(0x22f)]=Window_Options[_0x1730b4(0x232)][_0x1730b4(0x238)],Window_Options['prototype'][_0x1730b4(0x238)]=function(){const _0x485578=_0x1730b4;VisuMZ[_0x485578(0x10a)][_0x485578(0x22f)][_0x485578(0x1cb)](this),this[_0x485578(0x109)]();},Window_Options['prototype'][_0x1730b4(0x109)]=function(){const _0x4b2d40=_0x1730b4;VisuMZ[_0x4b2d40(0x10a)][_0x4b2d40(0xee)][_0x4b2d40(0x1ab)][_0x4b2d40(0x14a)]&&('LLfyV'!==_0x4b2d40(0x179)?this['opacity']=0x0:this[_0x4b2d40(0x115)]()),VisuMZ[_0x4b2d40(0x10a)][_0x4b2d40(0xee)][_0x4b2d40(0x1ab)][_0x4b2d40(0x126)]&&this[_0x4b2d40(0xf3)]();},Window_Options[_0x1730b4(0x232)][_0x1730b4(0x115)]=function(){const _0x27eed7=_0x1730b4,_0x576282=TextManager[_0x27eed7(0x192)],_0x597479='showCompass';this['addCommand'](_0x576282,_0x597479);},Window_Options['prototype'][_0x1730b4(0xf3)]=function(){const _0x1b1711=_0x1730b4,_0x333294=TextManager[_0x1b1711(0xf2)],_0x4b43f2='compassSize';this['addCommand'](_0x333294,_0x4b43f2);},VisuMZ[_0x1730b4(0x10a)][_0x1730b4(0x1ed)]=Window_Options[_0x1730b4(0x232)][_0x1730b4(0x1eb)],Window_Options[_0x1730b4(0x232)][_0x1730b4(0x1eb)]=function(_0x59a3c8){const _0x24bf3c=_0x1730b4;if(_0x59a3c8==='compassSize'){if(_0x24bf3c(0x19b)!==_0x24bf3c(0x19b))this['updatePositionClassic']();else return!![];}else return VisuMZ[_0x24bf3c(0x10a)][_0x24bf3c(0x1ed)][_0x24bf3c(0x1cb)](this,_0x59a3c8);},VisuMZ[_0x1730b4(0x10a)][_0x1730b4(0x157)]=Window_Options['prototype'][_0x1730b4(0x184)],Window_Options[_0x1730b4(0x232)][_0x1730b4(0x184)]=function(_0x16aa17,_0x2436ae,_0x302f06){const _0x17fee2=_0x1730b4;_0x16aa17===_0x17fee2(0xf2)?this[_0x17fee2(0x22a)](_0x16aa17,_0x2436ae,_0x302f06):_0x17fee2(0x1b1)!=='DhdfN'?_0x459bc2*=_0x56479a[_0x17fee2(0xff)]:VisuMZ[_0x17fee2(0x10a)][_0x17fee2(0x157)][_0x17fee2(0x1cb)](this,_0x16aa17,_0x2436ae,_0x302f06);},Window_Options[_0x1730b4(0x232)][_0x1730b4(0x22a)]=function(_0x35dcf8,_0x2ea71c,_0x2fe95c){const _0x4ceda2=_0x1730b4,_0x3d4530=this['getConfigValue'](_0x35dcf8),_0x47a046=0xa,_0x120c35=_0x3d4530+(_0x2ea71c?_0x47a046:-_0x47a046);_0x120c35>0x64&&_0x2fe95c?this[_0x4ceda2(0xfd)](_0x35dcf8,0x32):this[_0x4ceda2(0xfd)](_0x35dcf8,_0x120c35[_0x4ceda2(0x218)](0x32,0x64));};