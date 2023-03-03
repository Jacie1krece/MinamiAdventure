//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.40;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.40] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Requires VisuMZ_0_CoreEngine)
 * ------------------   -------------------------------------------------------
 * <Up Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Left Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Right Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Down Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * <Ok Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Cancel Button>      Display's VisuMZ_0_CoreEngine's button assist text.
 * <Shift Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Menu Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Up Button>     Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Down Button>   Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * ---
 * 
 * === Random Text Pool ===
 * 
 * <RNG> text1 | text2 | text3 </RNG>
 * 
 * Using the above text code format in a Show Message entry, you can get a
 * random result out of the various inserted texts. Use "|" (without quotes) as
 * a separator between text entries. You can have unlimited entries. The result
 * will have any excess white space trimmed.
 * 
 * This text code cannot be inserted into a macro and parsed properly.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 * 
 * Picture: Refresh Text
 * - Refreshes the text used for all on-screen pictures.
 * - To be used if any dynamic text codes are updated like \n[x].
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces. It does not support any Asian languages that do not utilize spaces,
 * such as Chinese, Japanese, Korean, etc.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * Version 1.40: November 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New text code added by Irina:
 * *** <RNG> text1 | text2 | text3 </RNG>
 * **** Using the above text code format in a Show Message entry, you can get a
 *      random result out of the various inserted texts. Use "|" (without
 *      quotes) as a separator between text entries. You can have unlimited
 *      entries. The result will have any excess white space trimmed.
 * **** This text code cannot be inserted into a macro and parsed properly.
 * 
 * Version 1.39: September 22, 2022
 * * Bug Fixes!
 * ** Macros now support quotes (' and ") in the STR: Text. Fix made by Irina.
 * 
 * Version 1.38: July 21, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.37: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Picture texts with \v[x] text codes are now updated automatically.
 * ** This is the only dynamic text code that updates this way for optimization
 *    purposes and to prevent overabundant CPU usage.
 * ** Everything else will require the new Plugin Command.
 * * New Features!
 * ** New Plugin Command added by Irina:
 * *** Picture: Refresh Text
 * **** Refreshes the text used for all on-screen pictures.
 * **** To be used if any dynamic text codes are updated like \n[x].
 * * New Features!
 * ** New text codes added by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** <Up Button>, <Left Button>, <Right Button>, <Down Button>
 * *** <Ok Button>, <Cancel Button>, <Shift Button>, <Menu Button>
 * *** <Page Up Button>, <Page Down Button>
 * **** Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * Version 1.36: April 7, 2022
 * * Feature Update!
 * ** Auto size related text codes should now automatically disable word wrap
 *    effects as they should have before. Update made by Irina.
 * 
 * Version 1.35: March 31, 2022
 * * Bug Fixes!
 * ** Bug fixed where if autosizing is used and it goes from a message that is
 *    shorter to longer, an extra key press is needed. This should no longer be
 *    the case. Fix made by Irina.
 * 
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextRefresh
 * @text Picture: Refresh Text
 * @desc Refreshes the text used for all on-screen pictures.
 * To be used if any dynamic text codes are updated like \n[x].
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
 * @param MessageCore
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
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x2032d4=_0x5228;(function(_0x4f2640,_0x1a463c){const _0x1bd726=_0x5228,_0x29a305=_0x4f2640();while(!![]){try{const _0xdd6fb5=-parseInt(_0x1bd726(0x1a1))/0x1+-parseInt(_0x1bd726(0x110))/0x2*(-parseInt(_0x1bd726(0x225))/0x3)+-parseInt(_0x1bd726(0x283))/0x4*(parseInt(_0x1bd726(0x30b))/0x5)+parseInt(_0x1bd726(0xdd))/0x6*(-parseInt(_0x1bd726(0x1d1))/0x7)+parseInt(_0x1bd726(0x2f4))/0x8+-parseInt(_0x1bd726(0x200))/0x9*(-parseInt(_0x1bd726(0x1e7))/0xa)+parseInt(_0x1bd726(0x332))/0xb;if(_0xdd6fb5===_0x1a463c)break;else _0x29a305['push'](_0x29a305['shift']());}catch(_0x354fda){_0x29a305['push'](_0x29a305['shift']());}}}(_0x203c,0x63717));function _0x203c(){const _0x35dd01=['maxFontSizeInLine','getTextAlignment','exit','_pictureTextRefresh','FontBiggerCap','3762160sQJLud','openness','_action','emerge','KGPnm','GYHLC','getMessageWindowWidth','convertNewPageTextStateMacros','zcftI','battleTargetName','isColorLocked','isContinuePrepareShowTextCommands','drawing','PictureTextRefresh','updateMessageCommonEvents','Window_Base_textSizeEx','_refreshPauseSign','TextAlign','convertMessageCoreEscapeActions','_autoSizeRegexp','close','floor','fontItalic','10KJGxPj','FontChangeValue','MessageWidth','Window_Base_processEscapeCharacter','onDatabaseLoaded','scale','exec','setChoiceListLineHeight','isCommandEnabled','(((','outLineColor','dYTCG','Window_Message_synchronizeNameBox','parseChoiceText','KPinJ','ONVql','lineHeight','Window_Base_processNewLine','replace','messageCoreWindowX','ParseItemNotetags','defaultColor','split','sJPfg','dDDoX','registerActorNameAutoColorChanges','onNewPageMessageCore','zryxK','ParseAllNotetags','isArmor','createContents','upperleft','isSceneMap','setWordWrap','bitmap','_textDelayCount','_data','_autoPositionTarget','ceil','12150028ccXbCr','autoPositionOffsetX','</LEFT>','KDiOk','description','helpWordWrap','maxCols','isVolumeSymbol','zxecj','preFlushTextState','setMessageWindowWordWrap','outputHeight','contents','newPage','Game_Party_initialize','processAutoColorWords','moveTo',')))','processCustomWait','match','NXkLs','ActionJS','updatePlacement','outlineWidth','convertHardcodedEscapeReplacements','yxUHD','resetTextColor','_moveTargetHeight','placeCancelButton','setTextAlignment','addMessageCommonEvent','Window_NameBox_updatePlacement','gUNnH','Window_Message_isTriggered','surprise','getPictureTextData','initMessageCore','Game_Map_refresh','processAutoPosition','upOnS','<WORDWRAP>','getChoiceListTextAlign','drawPictureText','ChoiceWindowMaxCols','isBreakShowTextCommands','Classes','event','Scene_Options_maxCommands','format','drawItem','requestPictureTextRefreshAll','processTextAlignmentChange','PpnbF','WCoSW','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','VsfSG','NameBoxWindowDefaultColor','mainFontSize','eraseAllPictureTexts','needsNewPage','setPictureText','blt','CommonEvent','isTriggered','updateEvents','erasePicture','NVdMK','setMessageWindowRows','Window_Base_processAllText','addContinuousShowChoices','applyData','YuTYg','drawBackPicture','adjustShowChoiceExtension','DISABLE','<LINE\x20BREAK>','FkXtd','isWordWrapEnabled','SortObjectByKeyLength','StretchDimmedBg','parameters','partyMemberName','innerWidth','_index','MessageWindowXyOffsets','lastGainedObjectName','AXOux','NameBoxWindowOffsetX','\x1bTEXTALIGNMENT[1]','erasePictureTextBuffer','registerSelfEvent','Armors','iconIndex','updateOffsetPosition','currencyUnit','getMessageWindowRows','Actors','DFvIa','processCharacter','findTargetSprite','rRiwQ','AkHEw','createTextState','setChoiceListTextAlign','setRelativePosition','HQdcm','\x1bTEXTALIGNMENT[2]','right','paintOpacity','DGKNf','setChoiceListMaxColumns','LineHeight','xGqPk','PICTURE','call','_textMacroFound','isChoiceEnabled','remove','_targets','ParseClassNotetags','processAutoSize','xLNQO','down','map','inputtingAction','messageCoreTextSpeed','AOeYe','MUqzL','_pictures','_commonEventId','obtainExp','rtl','<B>','index','item','type','Default','Undefined','_moveTargetY','\x1bC[%1]%2\x1bPREVCOLOR[0]','</RIGHT>','textWidth','_autoSizeCheck','toUpperCase','updateNameBoxMove','convertButtonAssistText','SHOW','width','unshift','LZzVE','</COLORLOCK>','getPictureTextBuffer','push','process_VisuMZ_MessageCore_TextCodes_Replace','prepareForcedPositionEscapeCharacters','WORD_WRAP_PADDING','Window_Help_refresh','HelpWindow','addMessageCoreTextSpeedCommand','true','Window_Base_initialize','status','registerCommand','\x5c%1','updateForcedPlacement','_messageOffsetX','wCwaN','textSizeExRaw','MessageCore','isAutoColorAffected','348nRqdyc','Ujwqj','processTextAlignmentX','TextCodeActions','rQdAm','GZVDd','<CENTER>','dHOGd','defeat','CreateAutoColorRegExpListEntries','victory','textCodeResult','Skills','WAIT','ZMyga','actorName','resetRect','prepareAutoSizeEscapeCharacters','ZNnpb','iPapH','rjAtm','ZcDls','setWaitMode','startX','_MessageCoreSettings','updateBitmap','OAzbW','addedWidth','length','Window_Options_addGeneralOptions','DefaultOutlineWidth','clearAllPictureTexts','processCommonEvent','<COLORLOCK>','_currentAutoSize','PictureTextChange','QbWJx','isSceneBattle','caBRS','clearPictureTextRefresh','kPfMZ','convertShowChoiceEscapeCodes','pagedown','_moveTargetX','WRAPBREAK','choice','Sprite_Picture_update','_autoPosRegExp','innerHeight','gainItem','faceWidth','179760ANiLxA','ParseAddedText','false','textSpeed','_texts','levelUp','itemPadding','loadPicture','MaxRows','\x1bWrapBreak[0]','upperright','\x1bCOLORLOCK[0]','ARRAYJSON','FYjNR','messagePositionReset','menu','ENABLE','attachPictureText','Items','BOLD','drawTextEx','hXsxt','drawBackCenteredPicture','AddAutoColor','_messageCommonEvents','adjustShowChoiceDefault','\x1bCOLORLOCK[1]','_positionType','left','shift','ARRAYSTRUCT','ParseArmorNotetags','convertLockColorsEscapeCharacters','updateRelativePosition','TextColor','map\x20actor','ConfigManager_applyData','States','_pictureTextWindow','processPxTextCode','convertVariableEscapeCharacters','vvJhg','getStartingChoiceWidth','_eventId','choiceCols','actor','setLastGainedItemData','\x1bTEXTALIGNMENT[0]','visible','SVDfX','dYMtk','changeTextColor','getPictureText','Weapons','processNewLine','Dqueo','TextMacros','CreateAutoColorRegExpLists','lastGainedObjectQuantity','returnPreservedFontSettings','clearActorNameAutoColor','clearFlags','Game_Map_initialize','VisuMZ_1_EventsMoveCore','aIsFR','_showFast','adjustShowChoiceCancel','setupNumInput','</WORDWRAP>','prepareShowTextCommand','<BR>','\x1bBOLD[1]','contentsHeight','prepareWordWrapEscapeCharacters','ChoiceWindowTextAlign','Elnkz','\x1bi[%1]%2','isMessageWindowWordWrap','ParseStateNotetags','ARRAYNUM','preemptive','convertButtonAssistEscapeCharacters','easeInOut','Window_Base_processControlCharacter','anpOn','clear','_subject','Window_Options_isVolumeSymbol','callOkHandler','updateDimensions','max','jKKoP','postConvertEscapeCharacters','return\x200','[0]','members','join','ConvertTextAutoColorRegExpFriendly','processMessageCoreEscapeActions','ARRAYEVAL','onChoice','drawPictureTextZone','FUNC','isRunning','initialize','windowWidth','OffsetX','updateAutoPosition','updateXyOffsets','Window_Options_changeVolume','Window_Message_clearFlags','</CENTER>','processEscapeCharacter','getLastGainedItemData','setSpeakerName','TIpkb','isChoiceVisible','PictureTextErase','default','ParseEnemyNotetags','setup','ParseSkillNotetags','obtainItem','resizePictureText','parse','_pictureTextBuffer','_wordWrap','applyMoveEasing','fTxki','Window_Message_newPage','inBattle','Window_Base_changeTextColor','fontBold','<LEFT>','FastForwardKey','choiceRows','battle\x20actor','refreshDimmerBitmap','<%1>','_autoColorActorNames','_nameBoxWindow','_pictureTextWidth','hasPictureText','updatePictureText','windowPadding','643722FxCJMr','COMMONEVENT','messageWordWrap','some','clearCommandList','Window_ChoiceList_windowX','normalColor','SaTwu','randomInt','MKEoO','ChoiceWindowMaxRows','outlineColor','AvpTk','battle\x20party','_moveTargetWidth','windowX','RelativePXPY','textColor','map\x20party','realPictureId','Game_Party_gainItem','changeTextSpeed','_textAlignment','return\x20\x27','getRandomTextFromPool','setColorLock','changeValue','convertTextMacros','hZvPF','includes','_messagePositionReset','Xsezt','messageWindowRect','processFontChangeBold','battleUserName','WordWrap','NameBoxWindowOffsetY','nextEventCode','_messageOffsetY','ConvertParams','_dimmerSprite','processColorLock','AutoColor','fontSize','anchor','canMove','Type','initTextAlignement','92904Npfbzo','iDbHG','lQljU','Game_Map_updateEvents','getInputButtonString','setPictureTextBuffer','itemRectWithPadding','<RIGHT>','setMessageWindowXyOffsets','getChoiceListLineHeight','_spriteset','qhEuY','MsgWindowOffsetX','addedHeight','Window_Message_updatePlacement','addCommand','EMdLm','process_VisuMZ_MessageCore_TextMacros','ueJDo','setupEvents','value','height','1750MtjteA','wRgvr','messageWidth','convertBackslashCharacters','stretchDimmerSprite','Window_Options_statusText','faceName','_moveEasingType','myXcA','currentCommand','obtainGold','preConvertEscapeCharacters','followers','trim','Padding','setChoiceListMaxRows','_wholeMoveDuration','PictureIDs','YUkyr','setHelpWindowWordWrap','gZWTP','processFontChangeItalic','KLlwq','<I>','indexOf','24147gNuygu','UlZcS','text','choiceLineHeight','xhodo','xbctu','Window_Message_terminateMessage','UqHtj','TextStr','CreateAutoColorFor','textSizeEx','QCqoy','boxHeight','eCudS','\x1bITALIC[0]','resetFontSettings','addLoadListener','VPWHl','MessageRows','min','WjEko','process_VisuMZ_MessageCore_AutoColor','MsgWindowOffsetY','SWITCHES','none','updateMove','Game_Map_setupEvents','registerResetRect','obtainEscapeParam','_centerMessageWindow','_cancelButton','mopsM','Sprite_Picture_updateBitmap','requestPictureTextRefresh','moveBy','Xnfit','round','9eeVBnQ','contentsBack','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','commandName','Window_ChoiceList_updatePlacement','Game_Interpreter_setupChoices','IVQqF','processWrapBreak','_messageWindow','clearPictures','setFaceImage','maxChoiceWidth','choices','Window_NameBox_refresh','processFsTextCode','_target','cancel','\x1bITALIC[1]','GDfBa','_moveDuration','jszlb','version','makeFontSmaller','flushTextState','getChoiceListMaxColumns','Iuxbb','isPressed','addMessageCoreCommands','bind','Settings','open','substring','clamp','command101','map\x20player','name','AutoColorBypassList','MaxCols','getChoiceListMaxRows','addGeneralOptions','FFiNM','slice','outputWidth','isHelpWindowWordWrap','pageup','choiceTextAlign','FontSmallerCap','_lastGainedItemData','test','\x1bBOLD[0]','changePaintOpacity','ParseWeaponNotetags','instantTextSpeed','NUM','calcMoveEasing','Whsfw','onProcessCharacter','Game_Screen_erasePicture','IcEEN','getConfigValue','easeOut','Window_Message_processEscapeCharacter','processDrawPicture','DVhST','makeFontBigger','vQeFN','EndPadding','statusText','battle\x20enemy','GrXvI','convertEscapeCharacters','Scene_Boot_onDatabaseLoaded','MTxSO','_pictureId','launchMessageCommonEvent','</I>','\x1bTEXTALIGNMENT[3]','bUzLd','fontFace','TextSpeed','AddOption','_scene','toLowerCase','choicePositionType','Match','filter','processAllText','AKVEJ','_textColorStack','synchronizeNameBox','Levtk','Window_Message_needsNewPage','_resetRect','applyDatabaseAutoColor','986332ooVYBC','process_VisuMZ_MessageCore_TextCodes_Action','_textDelay','makeData','Enemies','_list','_macroBypassWordWrap','setupItemChoice','list','VDCNd','processDrawCenteredPicture','sWLqt','_pictureTextHeight','hLBzD','HIDE','kLxHw','convertChoiceMacros','code','processActorNameAutoColorChanges','resetWordWrap','lMBoV','setTextDelay','lowerleft','RxUMC','addExtraShowChoices','General','Game_System_initialize','AutoColorRegExp','addContinuousShowTextCommands','anyPictureTextChanges','_pictureTextCache','ANY','_interpreter','setupChoices','ConfigManager_makeData','_pictureText','center','makeCommandList','getPreservedFontSettings','processStoredAutoColorChanges','createPictureText','CENTERPICTURE','isRTL','prototype','maxLines','ChoiceWindowLineHeight','CHHTF','battleActionName','needsPictureTextRefresh','Name','qerqj','setMessageWindowWidth','update','qHFAv','processControlCharacter','makeDeepCopy','textSizeExWordWrap','addWrapBreakAfterPunctuation','follower','processPyTextCode','gJacU','_relativePosition','colSpacing','calcWindowHeight','convertFontSettingsEscapeCharacters','textCodeCheck','clampPlacementPosition','processPreviousColor','setPositionType','startWait','_colorLock','STR','refresh','prepareShowTextFollowups','terminateMessage','_pictureTextSprite','obtainEscapeString','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','constructor','</B>','convertTextAlignmentEscapeCharacters','Game_Screen_clearPictures','resetPositionX','lHkce','startY','updateAutoSizePosition','boxWidth','VisuMZ_0_CoreEngine','message','numVisibleRows','qCPrS','kzpJO','getChoiceIndent','messageRows','Window_Base_update','lowerright','UcIdF','nGoiP','padding','FGWwg','map\x20event','deROB','_forcedPosition','ARRAYFUNC','MpUZq','maxCommands','TEXTALIGNMENT','itemHeight'];_0x203c=function(){return _0x35dd01;};return _0x203c();}var label=_0x2032d4(0xdb),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2032d4(0x27a)](function(_0xc64748){const _0x152ccd=_0x2032d4;return _0xc64748[_0x152ccd(0xd4)]&&_0xc64748[_0x152ccd(0x336)][_0x152ccd(0x1be)]('['+label+']');})[0x0];VisuMZ[label][_0x2032d4(0x242)]=VisuMZ[label][_0x2032d4(0x242)]||{},VisuMZ['ConvertParams']=function(_0x5d2a58,_0xb2c02d){const _0x3d793f=_0x2032d4;for(const _0x3f42da in _0xb2c02d){if(_0x3d793f(0x1fb)===_0x3d793f(0x1fb)){if(_0x3f42da['match'](/(.*):(.*)/i)){const _0x1d3e5b=String(RegExp['$1']),_0x4722b4=String(RegExp['$2'])[_0x3d793f(0xc2)]()[_0x3d793f(0x1f4)]();let _0x51bf84,_0x44e617,_0x575c4a;switch(_0x4722b4){case _0x3d793f(0x25a):_0x51bf84=_0xb2c02d[_0x3f42da]!==''?Number(_0xb2c02d[_0x3f42da]):0x0;break;case _0x3d793f(0x15f):_0x44e617=_0xb2c02d[_0x3f42da]!==''?JSON['parse'](_0xb2c02d[_0x3f42da]):[],_0x51bf84=_0x44e617[_0x3d793f(0xae)](_0xf22d7=>Number(_0xf22d7));break;case'EVAL':_0x51bf84=_0xb2c02d[_0x3f42da]!==''?eval(_0xb2c02d[_0x3f42da]):null;break;case _0x3d793f(0x173):_0x44e617=_0xb2c02d[_0x3f42da]!==''?JSON[_0x3d793f(0x18c)](_0xb2c02d[_0x3f42da]):[],_0x51bf84=_0x44e617[_0x3d793f(0xae)](_0x55c8cb=>eval(_0x55c8cb));break;case'JSON':_0x51bf84=_0xb2c02d[_0x3f42da]!==''?JSON[_0x3d793f(0x18c)](_0xb2c02d[_0x3f42da]):'';break;case _0x3d793f(0x11c):_0x44e617=_0xb2c02d[_0x3f42da]!==''?JSON['parse'](_0xb2c02d[_0x3f42da]):[],_0x51bf84=_0x44e617['map'](_0x7fb1d8=>JSON['parse'](_0x7fb1d8));break;case _0x3d793f(0x176):_0x51bf84=_0xb2c02d[_0x3f42da]!==''?new Function(JSON['parse'](_0xb2c02d[_0x3f42da])):new Function(_0x3d793f(0x16d));break;case _0x3d793f(0x2ea):_0x44e617=_0xb2c02d[_0x3f42da]!==''?JSON[_0x3d793f(0x18c)](_0xb2c02d[_0x3f42da]):[],_0x51bf84=_0x44e617[_0x3d793f(0xae)](_0x28c8ab=>new Function(JSON[_0x3d793f(0x18c)](_0x28c8ab)));break;case _0x3d793f(0x2ca):_0x51bf84=_0xb2c02d[_0x3f42da]!==''?String(_0xb2c02d[_0x3f42da]):'';break;case'ARRAYSTR':_0x44e617=_0xb2c02d[_0x3f42da]!==''?JSON['parse'](_0xb2c02d[_0x3f42da]):[],_0x51bf84=_0x44e617[_0x3d793f(0xae)](_0x58e70e=>String(_0x58e70e));break;case'STRUCT':_0x575c4a=_0xb2c02d[_0x3f42da]!==''?JSON[_0x3d793f(0x18c)](_0xb2c02d[_0x3f42da]):{},_0x5d2a58[_0x1d3e5b]={},VisuMZ[_0x3d793f(0x1c8)](_0x5d2a58[_0x1d3e5b],_0x575c4a);continue;case _0x3d793f(0x12e):_0x44e617=_0xb2c02d[_0x3f42da]!==''?JSON[_0x3d793f(0x18c)](_0xb2c02d[_0x3f42da]):[],_0x51bf84=_0x44e617['map'](_0xc8188c=>VisuMZ[_0x3d793f(0x1c8)]({},JSON[_0x3d793f(0x18c)](_0xc8188c)));break;default:continue;}_0x5d2a58[_0x1d3e5b]=_0x51bf84;}}else{if(this[_0x3d793f(0xf5)]===_0x229807)this[_0x3d793f(0x356)]();if(this[_0x3d793f(0xf5)][_0x3d793f(0x2e0)]===_0x299365)this['initMessageCore']();this[_0x3d793f(0xf5)]['messageRows']=_0x5cba73||0x1;}}return _0x5d2a58;},(_0x2ef88b=>{const _0x483387=_0x2032d4,_0x202705=_0x2ef88b[_0x483387(0x248)];for(const _0x1e6b6a of dependencies){if(!Imported[_0x1e6b6a]){alert(_0x483387(0x227)[_0x483387(0x362)](_0x202705,_0x1e6b6a)),SceneManager[_0x483387(0x2f1)]();break;}}const _0x3c2420=_0x2ef88b['description'];if(_0x3c2420[_0x483387(0x345)](/\[Version[ ](.*?)\]/i)){if('hLBzD'===_0x483387(0x290)){const _0x318cad=Number(RegExp['$1']);if(_0x318cad!==VisuMZ[label]['version']){if(_0x483387(0x335)!==_0x483387(0x335)){const _0x1b2124=_0x3f9b1d['$1'][_0x483387(0x321)](',')[_0x483387(0xae)](_0x3a5d34=>_0x1f52cd(_0x3a5d34)||0x0);for(const _0x1b4a6e of _0x1b2124){if(!_0x58e79c['value'](_0x1b4a6e))return!![];}return![];}else alert(_0x483387(0x2d0)[_0x483387(0x362)](_0x202705,_0x318cad)),SceneManager['exit']();}}else{const _0x1877ca=_0x14c2ba[_0x483387(0x231)]()[_0x483387(0xae)](_0x53a5da=>this['convertChoiceMacros'](_0x53a5da))[_0x483387(0x27a)](_0x36164f=>this['isChoiceVisible'](_0x36164f)),_0x23abea=_0x33af66[_0x483387(0x331)](_0x1877ca[_0x483387(0xf9)]/this['maxCols']());return _0x139df6[_0x483387(0x16a)](0x1,_0x3caff5['min'](_0x23abea,this[_0x483387(0x2af)]()));}}if(_0x3c2420[_0x483387(0x345)](/\[Tier[ ](\d+)\]/i)){const _0x4b25f6=Number(RegExp['$1']);if(_0x4b25f6<tier){if(_0x483387(0x31a)!=='ONVql'){if(_0x2dd221<=0x0)return;const _0x5f1883=_0x58b445[_0x483387(0xdb)]['Settings']['AutoColor'][_0x483387(0x132)+_0x38cafd];let _0x44d6d4=_0x465c49[_0x483387(0x248)][_0x483387(0x1f4)]();if(/^\d+$/[_0x483387(0x255)](_0x44d6d4))return;if(_0x575586['MessageCore'][_0x483387(0x249)][_0x483387(0x1be)](_0x44d6d4[_0x483387(0xc2)]()))return;_0x44d6d4=_0x44d6d4[_0x483387(0x31d)](/\\I\[(\d+)\]/gi,''),_0x44d6d4=_0x44d6d4[_0x483387(0x31d)](/\x1bI\[(\d+)\]/gi,'');if(_0x44d6d4['length']<=0x0)return;if(_0x44d6d4['match'](/-----/i))return;_0x5f1883[_0x483387(0xcb)](_0x44d6d4);}else alert(_0x483387(0x368)['format'](_0x202705,_0x4b25f6,tier)),SceneManager[_0x483387(0x2f1)]();}else{if(_0x483387(0x207)===_0x483387(0x207))tier=Math[_0x483387(0x16a)](_0x4b25f6,tier);else{if(!_0x48bd74['value'](_0x3b40a2))return![];}}}VisuMZ[_0x483387(0x1c8)](VisuMZ[label][_0x483387(0x242)],_0x2ef88b[_0x483387(0x83)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x2032d4(0x248)],'ChoiceWindowProperties',_0x1101ac=>{const _0xb9f88c=_0x2032d4;VisuMZ[_0xb9f88c(0x1c8)](_0x1101ac,_0x1101ac);const _0x2836fc=_0x1101ac[_0xb9f88c(0xa2)]||$gameSystem[_0xb9f88c(0x1da)]()||0x1,_0x395e39=_0x1101ac[_0xb9f88c(0x118)]||$gameSystem[_0xb9f88c(0x24b)]()||0x1,_0x5c067f=_0x1101ac['MaxCols']||$gameSystem['getChoiceListMaxColumns']()||0x1,_0xf31e23=_0x1101ac[_0xb9f88c(0x305)][_0xb9f88c(0x277)]()||'default';$gameSystem[_0xb9f88c(0x312)](_0x2836fc),$gameSystem[_0xb9f88c(0x1f6)](_0x395e39),$gameSystem[_0xb9f88c(0xa1)](_0x5c067f),$gameSystem[_0xb9f88c(0x9a)](_0xf31e23);}),PluginManager[_0x2032d4(0xd5)](pluginData[_0x2032d4(0x248)],'MessageWindowProperties',_0x54d2de=>{const _0x118c4d=_0x2032d4;VisuMZ[_0x118c4d(0x1c8)](_0x54d2de,_0x54d2de);const _0x3d4102=_0x54d2de['Rows']||$gameSystem[_0x118c4d(0x92)]()||0x1,_0x376ff6=_0x54d2de['Width']||$gameSystem[_0x118c4d(0x2fa)]()||0x1;$gameTemp[_0x118c4d(0x21d)]=!![];const _0x233ea6=_0x54d2de[_0x118c4d(0x1c4)]['toLowerCase']();$gameSystem[_0x118c4d(0x76)](_0x3d4102),$gameSystem[_0x118c4d(0x2b6)](_0x376ff6);if([_0x118c4d(0xd2),_0x118c4d(0x112)][_0x118c4d(0x1be)](_0x233ea6)){if(_0x118c4d(0x211)!=='VPWHl'){const _0x1722ec=_0x20d961['$1'][_0x118c4d(0x321)](',')[_0x118c4d(0xae)](_0x5a6be4=>_0x4bc8aa(_0x5a6be4)||0x0);for(const _0x37e5b2 of _0x1722ec){if(_0x9bd4ac[_0x118c4d(0x1e5)](_0x37e5b2))return!![];}return![];}else $gameSystem['setMessageWindowWordWrap'](eval(_0x233ea6));}const _0x2f3a1b=SceneManager[_0x118c4d(0x276)]['_messageWindow'];_0x2f3a1b&&(_0x2f3a1b['resetWordWrap'](),_0x2f3a1b[_0x118c4d(0x169)](),_0x2f3a1b['createContents']());}),PluginManager[_0x2032d4(0xd5)](pluginData['name'],_0x2032d4(0x87),_0x2b1332=>{const _0x4f592f=_0x2032d4;VisuMZ[_0x4f592f(0x1c8)](_0x2b1332,_0x2b1332),$gameSystem[_0x4f592f(0x1d9)](_0x2b1332[_0x4f592f(0x17a)],_0x2b1332['OffsetY']);const _0x5e7910=SceneManager['_scene'][_0x4f592f(0x22d)];_0x5e7910&&(_0x5e7910[_0x4f592f(0x296)](),_0x5e7910[_0x4f592f(0x169)](),_0x5e7910[_0x4f592f(0x329)]());}),PluginManager[_0x2032d4(0xd5)](pluginData[_0x2032d4(0x248)],_0x2032d4(0x100),_0x393704=>{const _0x2ab2b4=_0x2032d4;VisuMZ[_0x2ab2b4(0x1c8)](_0x393704,_0x393704);const _0x171762=_0x393704[_0x2ab2b4(0x1f8)]||[],_0xf5fece=_0x393704[_0x2ab2b4(0x1f5)]||0x0,_0x13985f=[_0x2ab2b4(0x32a),'up',_0x2ab2b4(0x11a),_0x2ab2b4(0x12c),_0x2ab2b4(0x2a7),'right','lowerleft',_0x2ab2b4(0xad),_0x2ab2b4(0x2e2)];for(const _0x3b9c8e of _0x171762){$gameScreen[_0x2ab2b4(0x1d6)](_0x3b9c8e,_0xf5fece);for(const _0xc99338 of _0x13985f){if(_0x2ab2b4(0x205)!==_0x2ab2b4(0x15b)){if(_0x393704[_0xc99338]===undefined)continue;$gameScreen[_0x2ab2b4(0x6f)](_0x3b9c8e,_0x393704[_0xc99338],_0xc99338);}else this['initTextAlignement'](),this[_0x2ab2b4(0x296)](),this[_0x2ab2b4(0x21b)](_0x506526);}}}),PluginManager[_0x2032d4(0xd5)](pluginData[_0x2032d4(0x248)],_0x2032d4(0x185),_0x2923f1=>{const _0x1c2537=_0x2032d4;VisuMZ[_0x1c2537(0x1c8)](_0x2923f1,_0x2923f1);const _0x3f0812=_0x2923f1[_0x1c2537(0x1f8)]||[];for(const _0x5242ff of _0x3f0812){$gameScreen['eraseAllPictureTexts'](_0x5242ff),$gameScreen[_0x1c2537(0x8c)](_0x5242ff);}}),PluginManager[_0x2032d4(0xd5)](pluginData[_0x2032d4(0x248)],_0x2032d4(0x301),_0x20271e=>{const _0x3f673f=_0x2032d4;$gameScreen[_0x3f673f(0x364)]();}),VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x26c)]=Scene_Boot[_0x2032d4(0x2ae)]['onDatabaseLoaded'],Scene_Boot[_0x2032d4(0x2ae)][_0x2032d4(0x30f)]=function(){const _0x3a92f3=_0x2032d4;VisuMZ['MessageCore']['Scene_Boot_onDatabaseLoaded'][_0x3a92f3(0xa5)](this),this[_0x3a92f3(0x284)](),this[_0x3a92f3(0xcc)](),this['process_VisuMZ_MessageCore_TextMacros'](),this[_0x3a92f3(0x215)]();},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x81)]=function(_0x22b446){const _0x1196f5=_0x2032d4,_0x3e59a6=VisuMZ[_0x1196f5(0xdb)][_0x1196f5(0x242)][_0x22b446];_0x3e59a6['sort']((_0x378200,_0x33279e)=>{const _0x82b5cc=_0x1196f5;if(_0x82b5cc(0xe4)!==_0x82b5cc(0x28e)){if(!_0x378200||!_0x33279e)return-0x1;return _0x33279e[_0x82b5cc(0x279)][_0x82b5cc(0xf9)]-_0x378200[_0x82b5cc(0x279)]['length'];}else{const _0x237bee=_0x3a31c2(_0x464992['$1']);_0x237bee!==_0x4e5e39[_0x214b56][_0x82b5cc(0x23a)]&&(_0x4c8081(_0x82b5cc(0x2d0)[_0x82b5cc(0x362)](_0x2da4ea,_0x237bee)),_0x2bf729['exit']());}});},Scene_Boot[_0x2032d4(0x2ae)][_0x2032d4(0x284)]=function(){const _0x5538be=_0x2032d4;VisuMZ['MessageCore'][_0x5538be(0x81)](_0x5538be(0xe0));for(const _0x718c8e of VisuMZ[_0x5538be(0xdb)]['Settings'][_0x5538be(0xe0)]){_0x718c8e[_0x5538be(0x279)]=_0x718c8e[_0x5538be(0x279)]['toUpperCase'](),_0x718c8e[_0x5538be(0x2c4)]=new RegExp('\x1b'+_0x718c8e[_0x5538be(0x279)],'gi'),_0x718c8e[_0x5538be(0xe8)]='\x1b'+_0x718c8e[_0x5538be(0x279)];if(_0x718c8e[_0x5538be(0x1cf)]==='')_0x718c8e[_0x5538be(0xe8)]+=_0x5538be(0x16e);}},Scene_Boot[_0x2032d4(0x2ae)][_0x2032d4(0xcc)]=function(){const _0x8e43e=_0x2032d4;VisuMZ[_0x8e43e(0xdb)][_0x8e43e(0x81)]('TextCodeReplace');for(const _0x557177 of VisuMZ['MessageCore'][_0x8e43e(0x242)]['TextCodeReplace']){_0x557177[_0x8e43e(0x2c4)]=new RegExp('\x1b'+_0x557177[_0x8e43e(0x279)]+_0x557177['Type'],'gi'),_0x557177[_0x8e43e(0x208)]!==''&&_0x557177[_0x8e43e(0x208)]!==_0x8e43e(0xbc)?_0x557177[_0x8e43e(0xe8)]=new Function('return\x20\x27'+_0x557177[_0x8e43e(0x208)][_0x8e43e(0x31d)](/\\/g,'\x1b')+'\x27'):_0x557177[_0x8e43e(0xe8)]=_0x557177['TextJS'];}},Scene_Boot['prototype'][_0x2032d4(0x1e2)]=function(){const _0x437455=_0x2032d4;for(const _0x3f2cba of VisuMZ[_0x437455(0xdb)][_0x437455(0x242)][_0x437455(0x148)]){_0x3f2cba[_0x437455(0x2c4)]=new RegExp('\x5c['+_0x3f2cba[_0x437455(0x279)]+'\x5c]','gi');if(_0x3f2cba['TextStr']!==''&&_0x3f2cba[_0x437455(0x208)]!==_0x437455(0xbc)){if(_0x437455(0x2eb)===_0x437455(0x2eb)){let _0x306e7e=_0x3f2cba[_0x437455(0x208)];_0x306e7e=_0x306e7e[_0x437455(0x31d)](/\\/g,'\x1b'),_0x306e7e=_0x306e7e[_0x437455(0x31d)]('\x27','\x5c\x27'),_0x306e7e=_0x306e7e[_0x437455(0x31d)]('\x22','\x5c\x22'),_0x3f2cba[_0x437455(0xe8)]=new Function(_0x437455(0x1b8)+_0x306e7e+'\x27');}else _0x203921=_0x48091e[_0x437455(0x309)](this[_0x437455(0x1e6)]-_0x586ac9['height']-_0x3bdee8);}else{if(_0x437455(0x1ad)!=='QJbtB')_0x3f2cba['textCodeResult']=_0x3f2cba['TextJS'];else return this[_0x437455(0x22d)]['x']+this[_0x437455(0x22d)][_0x437455(0xc6)]-this[_0x437455(0x179)]();}}},Scene_Boot[_0x2032d4(0x2ae)][_0x2032d4(0x215)]=function(){const _0x3f6412=_0x2032d4,_0x49c395=VisuMZ[_0x3f6412(0xdb)][_0x3f6412(0x242)][_0x3f6412(0x1cb)];if(!VisuMZ[_0x3f6412(0x327)]){if(_0x3f6412(0x21f)===_0x3f6412(0x29a))return![];else VisuMZ['MessageCore'][_0x3f6412(0x127)]($dataClasses,_0x49c395[_0x3f6412(0x35f)]),VisuMZ[_0x3f6412(0xdb)][_0x3f6412(0x127)]($dataSkills,_0x49c395['Skills']),VisuMZ[_0x3f6412(0xdb)][_0x3f6412(0x127)]($dataItems,_0x49c395[_0x3f6412(0x122)]),VisuMZ[_0x3f6412(0xdb)][_0x3f6412(0x127)]($dataWeapons,_0x49c395[_0x3f6412(0x145)]),VisuMZ[_0x3f6412(0xdb)][_0x3f6412(0x127)]($dataArmors,_0x49c395[_0x3f6412(0x8e)]),VisuMZ[_0x3f6412(0xdb)][_0x3f6412(0x127)]($dataEnemies,_0x49c395[_0x3f6412(0x287)]),VisuMZ['MessageCore'][_0x3f6412(0x127)]($dataStates,_0x49c395[_0x3f6412(0x135)]);}VisuMZ[_0x3f6412(0xdb)][_0x3f6412(0x149)]();},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x249)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x2032d4(0xb7),_0x2032d4(0x2d2),_0x2032d4(0x1fe),_0x2032d4(0x270),_0x2032d4(0x195),_0x2032d4(0x334),_0x2032d4(0xe3),_0x2032d4(0x17f),_0x2032d4(0x1d8),_0x2032d4(0xbf),_0x2032d4(0xfe),_0x2032d4(0xc9),_0x2032d4(0x314),_0x2032d4(0x343),_0x2032d4(0x35a),_0x2032d4(0x154),_0x2032d4(0x156),_0x2032d4(0x7e),_0x2032d4(0xa4),_0x2032d4(0x2ac),_0x2032d4(0x1a2),'WAIT',_0x2032d4(0xc5),_0x2032d4(0x291),_0x2032d4(0x120),_0x2032d4(0x7d),'SWITCH',_0x2032d4(0x217),'ALL',_0x2032d4(0x2a2)],VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x127)]=function(_0x397676,_0x20d247){const _0x2dfabe=_0x2032d4;if(_0x20d247<=0x0)return;const _0x4b10e8=_0x397676;for(const _0x43c785 of _0x4b10e8){if(_0x2dfabe(0x25c)===_0x2dfabe(0x98)){this[_0x2dfabe(0x21c)](_0x59d729);if(this[_0x2dfabe(0x2fe)]())return;_0x184f7f[_0x2dfabe(0x300)]&&(this[_0x2dfabe(0x27d)]=this[_0x2dfabe(0x27d)]||[],this[_0x2dfabe(0x33e)][_0x2dfabe(0x1b2)]=this['_textColorStack'][_0x2dfabe(0x12d)]()||_0x2cc753['normalColor']());}else{if(!_0x43c785)continue;VisuMZ['MessageCore'][_0x2dfabe(0x209)](_0x43c785,_0x20d247);}}},VisuMZ['MessageCore'][_0x2032d4(0x149)]=function(){const _0x176482=_0x2032d4;VisuMZ[_0x176482(0xdb)][_0x176482(0x29e)]=[];for(let _0x302613=0x1;_0x302613<=0x1f;_0x302613++){if('InrAG'!==_0x176482(0xd9)){const _0x47f6a9='TextColor%1'[_0x176482(0x362)](_0x302613),_0x424443=VisuMZ[_0x176482(0xdb)][_0x176482(0x242)][_0x176482(0x1cb)][_0x47f6a9];_0x424443['sort']((_0xcbe7ea,_0x4bc61d)=>{const _0xb06c44=_0x176482;if(!_0xcbe7ea||!_0x4bc61d)return-0x1;return _0x4bc61d['length']-_0xcbe7ea[_0xb06c44(0xf9)];}),this[_0x176482(0xe6)](_0x424443,_0x302613);}else return _0x67bbab;}},VisuMZ['MessageCore']['CreateAutoColorRegExpListEntries']=function(_0x58c7a2,_0x71c79){const _0x2bf0c7=_0x2032d4;for(const _0x1043f4 of _0x58c7a2){if(_0x1043f4[_0x2bf0c7(0xf9)]<=0x0)continue;if(/^\d+$/[_0x2bf0c7(0x255)](_0x1043f4))continue;let _0x5b1f5f=VisuMZ[_0x2bf0c7(0xdb)]['ConvertTextAutoColorRegExpFriendly'](_0x1043f4);if(_0x1043f4[_0x2bf0c7(0x345)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g)){if(_0x2bf0c7(0x359)!=='ndbpz')var _0x274eb9=new RegExp(_0x5b1f5f,'i');else this[_0x2bf0c7(0xcd)](_0x515c10),this['prepareAutoSizeEscapeCharacters'](_0x4d8382),this['updateDimensions']();}else var _0x274eb9=new RegExp('\x5cb'+_0x5b1f5f+'\x5cb','g');VisuMZ[_0x2bf0c7(0xdb)][_0x2bf0c7(0x29e)]['push']([_0x274eb9,_0x2bf0c7(0xbe)[_0x2bf0c7(0x362)](_0x71c79,_0x1043f4)]);}},VisuMZ['MessageCore'][_0x2032d4(0x171)]=function(_0x564590){const _0x1da78f=_0x2032d4;return _0x564590=_0x564590[_0x1da78f(0x31d)](/(\W)/gi,(_0x2b6da1,_0x16f8e1)=>_0x1da78f(0xd6)[_0x1da78f(0x362)](_0x16f8e1)),_0x564590;},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0xaa)]=VisuMZ[_0x2032d4(0xaa)],VisuMZ[_0x2032d4(0xaa)]=function(_0x2c4aba){const _0x54582d=_0x2032d4;VisuMZ[_0x54582d(0xdb)]['ParseClassNotetags']['call'](this,_0x2c4aba);const _0x27d395=VisuMZ[_0x54582d(0xdb)][_0x54582d(0x242)][_0x54582d(0x1cb)];VisuMZ[_0x54582d(0xdb)][_0x54582d(0x209)](_0x2c4aba,_0x27d395[_0x54582d(0x35f)]);},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x189)]=VisuMZ[_0x2032d4(0x189)],VisuMZ[_0x2032d4(0x189)]=function(_0x4e3a94){const _0x455d08=_0x2032d4;VisuMZ[_0x455d08(0xdb)][_0x455d08(0x189)][_0x455d08(0xa5)](this,_0x4e3a94);const _0x2d6ea6=VisuMZ[_0x455d08(0xdb)][_0x455d08(0x242)][_0x455d08(0x1cb)];VisuMZ[_0x455d08(0xdb)][_0x455d08(0x209)](_0x4e3a94,_0x2d6ea6[_0x455d08(0xe9)]);},0x7,VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x31f)]=VisuMZ[_0x2032d4(0x31f)],VisuMZ['ParseItemNotetags']=function(_0x15d98f){const _0x42b62b=_0x2032d4;VisuMZ['MessageCore'][_0x42b62b(0x31f)][_0x42b62b(0xa5)](this,_0x15d98f);const _0xe83d9e=VisuMZ[_0x42b62b(0xdb)][_0x42b62b(0x242)][_0x42b62b(0x1cb)];VisuMZ[_0x42b62b(0xdb)][_0x42b62b(0x209)](_0x15d98f,_0xe83d9e[_0x42b62b(0x122)]);},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x258)]=VisuMZ[_0x2032d4(0x258)],VisuMZ[_0x2032d4(0x258)]=function(_0x3859e4){const _0x4a8b32=_0x2032d4;VisuMZ['MessageCore'][_0x4a8b32(0x258)][_0x4a8b32(0xa5)](this,_0x3859e4);const _0x1ef5ff=VisuMZ[_0x4a8b32(0xdb)][_0x4a8b32(0x242)]['AutoColor'];VisuMZ[_0x4a8b32(0xdb)][_0x4a8b32(0x209)](_0x3859e4,_0x1ef5ff[_0x4a8b32(0x145)]);},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x12f)]=VisuMZ['ParseArmorNotetags'],VisuMZ[_0x2032d4(0x12f)]=function(_0x370966){const _0x51e9bc=_0x2032d4;VisuMZ[_0x51e9bc(0xdb)][_0x51e9bc(0x12f)][_0x51e9bc(0xa5)](this,_0x370966);const _0x9265e3=VisuMZ['MessageCore'][_0x51e9bc(0x242)][_0x51e9bc(0x1cb)];VisuMZ[_0x51e9bc(0xdb)]['CreateAutoColorFor'](_0x370966,_0x9265e3[_0x51e9bc(0x8e)]);},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x187)]=VisuMZ[_0x2032d4(0x187)],VisuMZ[_0x2032d4(0x187)]=function(_0x5792f1){const _0x21ae52=_0x2032d4;VisuMZ[_0x21ae52(0xdb)][_0x21ae52(0x187)][_0x21ae52(0xa5)](this,_0x5792f1);const _0x4359f3=VisuMZ[_0x21ae52(0xdb)][_0x21ae52(0x242)][_0x21ae52(0x1cb)];VisuMZ[_0x21ae52(0xdb)]['CreateAutoColorFor'](_0x5792f1,_0x4359f3[_0x21ae52(0x287)]);},VisuMZ['MessageCore'][_0x2032d4(0x15e)]=VisuMZ[_0x2032d4(0x15e)],VisuMZ[_0x2032d4(0x15e)]=function(_0x3be4a3){const _0x605aab=_0x2032d4;VisuMZ[_0x605aab(0xdb)][_0x605aab(0x15e)][_0x605aab(0xa5)](this,_0x3be4a3);const _0x5c82c1=VisuMZ[_0x605aab(0xdb)]['Settings'][_0x605aab(0x1cb)];VisuMZ[_0x605aab(0xdb)][_0x605aab(0x209)](_0x3be4a3,_0x5c82c1[_0x605aab(0x135)]);},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x209)]=function(_0x43f9f2,_0x3d3cb2){const _0x1ccad9=_0x2032d4;if(_0x3d3cb2<=0x0)return;const _0x35cad9=VisuMZ['MessageCore']['Settings'][_0x1ccad9(0x1cb)][_0x1ccad9(0x132)+_0x3d3cb2];let _0x3322f1=_0x43f9f2[_0x1ccad9(0x248)][_0x1ccad9(0x1f4)]();if(/^\d+$/[_0x1ccad9(0x255)](_0x3322f1))return;if(VisuMZ[_0x1ccad9(0xdb)][_0x1ccad9(0x249)][_0x1ccad9(0x1be)](_0x3322f1[_0x1ccad9(0xc2)]()))return;_0x3322f1=_0x3322f1[_0x1ccad9(0x31d)](/\\I\[(\d+)\]/gi,''),_0x3322f1=_0x3322f1['replace'](/\x1bI\[(\d+)\]/gi,'');if(_0x3322f1[_0x1ccad9(0xf9)]<=0x0)return;if(_0x3322f1[_0x1ccad9(0x345)](/-----/i))return;_0x35cad9['push'](_0x3322f1);},SceneManager[_0x2032d4(0x102)]=function(){const _0x4459f2=_0x2032d4;return this[_0x4459f2(0x276)]&&this[_0x4459f2(0x276)]['constructor']===Scene_Battle;},SceneManager[_0x2032d4(0x32b)]=function(){const _0x1ad786=_0x2032d4;return this['_scene']&&this['_scene'][_0x1ad786(0x2d1)]===Scene_Map;},VisuMZ[_0x2032d4(0xdb)]['TextManager_message']=TextManager[_0x2032d4(0x2db)],TextManager[_0x2032d4(0x2db)]=function(_0x46b485){const _0x2f8793=_0x2032d4,_0x178417=[_0x2f8793(0x115),_0x2f8793(0x2f7),_0x2f8793(0x160),_0x2f8793(0x354),_0x2f8793(0xe7),_0x2f8793(0xe5),'escapeStart',_0x2f8793(0xb5),_0x2f8793(0x1f1),_0x2f8793(0x18a)];let _0x145a53=VisuMZ[_0x2f8793(0xdb)]['TextManager_message'][_0x2f8793(0xa5)](this,_0x46b485);if(_0x178417[_0x2f8793(0x1be)](_0x46b485)){if(_0x2f8793(0x319)===_0x2f8793(0x27c))return this[_0x2f8793(0x2c0)]=_0x54bdce,'';else _0x145a53=_0x2f8793(0x154)+_0x145a53;}return _0x145a53;},ConfigManager[_0x2032d4(0x113)]=VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x242)]['TextSpeed'][_0x2032d4(0xbb)],VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x2a5)]=ConfigManager[_0x2032d4(0x286)],ConfigManager[_0x2032d4(0x286)]=function(){const _0x11d0e3=_0x2032d4,_0x34e305=VisuMZ['MessageCore']['ConfigManager_makeData'][_0x11d0e3(0xa5)](this);return _0x34e305[_0x11d0e3(0x113)]=this['textSpeed'],_0x34e305;},VisuMZ['MessageCore']['ConfigManager_applyData']=ConfigManager[_0x2032d4(0x79)],ConfigManager[_0x2032d4(0x79)]=function(_0x756bdf){const _0x4ac928=_0x2032d4;VisuMZ[_0x4ac928(0xdb)]['ConfigManager_applyData'][_0x4ac928(0xa5)](this,_0x756bdf),_0x4ac928(0x113)in _0x756bdf?this[_0x4ac928(0x113)]=Number(_0x756bdf['textSpeed'])[_0x4ac928(0x245)](0x1,0xb):this[_0x4ac928(0x113)]=VisuMZ[_0x4ac928(0xdb)][_0x4ac928(0x242)]['TextSpeed'][_0x4ac928(0xbb)];},TextManager['messageCoreTextSpeed']=VisuMZ['MessageCore']['Settings']['TextSpeed'][_0x2032d4(0x2b4)],TextManager[_0x2032d4(0x259)]=VisuMZ['MessageCore'][_0x2032d4(0x242)][_0x2032d4(0x274)]['Instant'],VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x29d)]=Game_System[_0x2032d4(0x2ae)][_0x2032d4(0x178)],Game_System[_0x2032d4(0x2ae)][_0x2032d4(0x178)]=function(){const _0x3b86ec=_0x2032d4;VisuMZ[_0x3b86ec(0xdb)][_0x3b86ec(0x29d)][_0x3b86ec(0xa5)](this),this[_0x3b86ec(0x356)]();},Game_System['prototype'][_0x2032d4(0x356)]=function(){const _0x3e74f4=_0x2032d4,_0x3f9062=VisuMZ[_0x3e74f4(0xdb)][_0x3e74f4(0x242)][_0x3e74f4(0x29c)],_0x15e4cb=VisuMZ[_0x3e74f4(0xdb)][_0x3e74f4(0x242)][_0x3e74f4(0x1c4)];this['_MessageCoreSettings']={'messageRows':_0x3f9062[_0x3e74f4(0x212)],'messageWidth':_0x3f9062[_0x3e74f4(0x30d)],'messageWordWrap':_0x15e4cb['MessageWindow'],'helpWordWrap':_0x15e4cb[_0x3e74f4(0xd0)],'choiceLineHeight':_0x3f9062['ChoiceWindowLineHeight'],'choiceRows':_0x3f9062[_0x3e74f4(0x1ab)],'choiceCols':_0x3f9062[_0x3e74f4(0x35d)],'choiceTextAlign':_0x3f9062[_0x3e74f4(0x15a)]},this[_0x3e74f4(0xd8)]===undefined&&('CHHTF'===_0x3e74f4(0x2b1)?(this['_messageOffsetX']=_0x3f9062[_0x3e74f4(0x1dd)],this[_0x3e74f4(0x1c7)]=_0x3f9062[_0x3e74f4(0x216)]):(_0x10239b=this[_0x3e74f4(0x78)](),_0x8acf44[_0x3e74f4(0xdb)][_0x3e74f4(0x22a)][_0x3e74f4(0xa5)](this,_0x304601)));},Game_System[_0x2032d4(0x2ae)][_0x2032d4(0x92)]=function(){const _0x41e68c=_0x2032d4;if(this[_0x41e68c(0xf5)]===undefined)this[_0x41e68c(0x356)]();if(this[_0x41e68c(0xf5)]['messageRows']===undefined)this['initMessageCore']();return this[_0x41e68c(0xf5)][_0x41e68c(0x2e0)];},Game_System[_0x2032d4(0x2ae)][_0x2032d4(0x76)]=function(_0x4aa4c7){const _0xac9f51=_0x2032d4;if(this[_0xac9f51(0xf5)]===undefined)this[_0xac9f51(0x356)]();if(this[_0xac9f51(0xf5)]['messageRows']===undefined)this[_0xac9f51(0x356)]();this[_0xac9f51(0xf5)][_0xac9f51(0x2e0)]=_0x4aa4c7||0x1;},Game_System['prototype'][_0x2032d4(0x2fa)]=function(){const _0x59293a=_0x2032d4;if(this[_0x59293a(0xf5)]===undefined)this[_0x59293a(0x356)]();if(this[_0x59293a(0xf5)][_0x59293a(0x1e9)]===undefined)this[_0x59293a(0x356)]();return this[_0x59293a(0xf5)][_0x59293a(0x1e9)];},Game_System[_0x2032d4(0x2ae)][_0x2032d4(0x2b6)]=function(_0x48cffa){const _0x56d03a=_0x2032d4;if(this['_MessageCoreSettings']===undefined)this[_0x56d03a(0x356)]();if(this[_0x56d03a(0xf5)]['messageWidth']===undefined)this['initMessageCore']();_0x48cffa=Math[_0x56d03a(0x331)](_0x48cffa);if(_0x48cffa%0x2!==0x0)_0x48cffa+=0x1;this[_0x56d03a(0xf5)][_0x56d03a(0x1e9)]=_0x48cffa||0x2;},Game_System[_0x2032d4(0x2ae)][_0x2032d4(0x15d)]=function(){const _0x466659=_0x2032d4;if(this[_0x466659(0xf5)]===undefined)this[_0x466659(0x356)]();if(this[_0x466659(0xf5)][_0x466659(0x1a3)]===undefined)this[_0x466659(0x356)]();return this[_0x466659(0xf5)][_0x466659(0x1a3)];},Game_System[_0x2032d4(0x2ae)][_0x2032d4(0x33c)]=function(_0x194fb7){const _0x28a78e=_0x2032d4;if(this['_MessageCoreSettings']===undefined)this[_0x28a78e(0x356)]();if(this[_0x28a78e(0xf5)][_0x28a78e(0x1a3)]===undefined)this['initMessageCore']();this[_0x28a78e(0xf5)][_0x28a78e(0x1a3)]=_0x194fb7;},Game_System['prototype']['getMessageWindowXyOffsets']=function(){const _0x2edb7d=_0x2032d4;if(this[_0x2edb7d(0xd8)]===undefined){const _0x17a2dc=VisuMZ[_0x2edb7d(0xdb)]['Settings']['General'];this[_0x2edb7d(0xd8)]=_0x17a2dc[_0x2edb7d(0x1dd)],this['_messageOffsetY']=_0x17a2dc[_0x2edb7d(0x216)];}return{'x':this['_messageOffsetX']||0x0,'y':this['_messageOffsetY']||0x0};},Game_System[_0x2032d4(0x2ae)][_0x2032d4(0x1d9)]=function(_0x4bee44,_0x2136dd){const _0x387fa0=_0x2032d4;if(this[_0x387fa0(0xf5)]===undefined)this[_0x387fa0(0x356)]();this['_messageOffsetX']=_0x4bee44,this[_0x387fa0(0x1c7)]=_0x2136dd;},Game_System['prototype']['isHelpWindowWordWrap']=function(){const _0xbfc76a=_0x2032d4;if(this[_0xbfc76a(0xf5)]===undefined)this[_0xbfc76a(0x356)]();if(this[_0xbfc76a(0xf5)][_0xbfc76a(0x337)]===undefined)this[_0xbfc76a(0x356)]();return this[_0xbfc76a(0xf5)][_0xbfc76a(0x337)];},Game_System[_0x2032d4(0x2ae)][_0x2032d4(0x1fa)]=function(_0x2ac866){const _0x153aa7=_0x2032d4;if(this[_0x153aa7(0xf5)]===undefined)this['initMessageCore']();if(this[_0x153aa7(0xf5)]['helpWordWrap']===undefined)this[_0x153aa7(0x356)]();this['_MessageCoreSettings']['helpWordWrap']=_0x2ac866;},Game_System[_0x2032d4(0x2ae)][_0x2032d4(0x1da)]=function(){const _0x4e5656=_0x2032d4;if(this[_0x4e5656(0xf5)]===undefined)this['initMessageCore']();if(this[_0x4e5656(0xf5)]['choiceLineHeight']===undefined)this[_0x4e5656(0x356)]();return this[_0x4e5656(0xf5)]['choiceLineHeight'];},Game_System[_0x2032d4(0x2ae)][_0x2032d4(0x312)]=function(_0x1816ec){const _0x56cbef=_0x2032d4;if(this[_0x56cbef(0xf5)]===undefined)this[_0x56cbef(0x356)]();if(this[_0x56cbef(0xf5)][_0x56cbef(0x203)]===undefined)this[_0x56cbef(0x356)]();this[_0x56cbef(0xf5)][_0x56cbef(0x203)]=_0x1816ec||0x1;},Game_System[_0x2032d4(0x2ae)][_0x2032d4(0x24b)]=function(){const _0x56624c=_0x2032d4;if(this[_0x56624c(0xf5)]===undefined)this[_0x56624c(0x356)]();if(this[_0x56624c(0xf5)]['choiceRows']===undefined)this['initMessageCore']();return this[_0x56624c(0xf5)][_0x56624c(0x197)];},Game_System[_0x2032d4(0x2ae)][_0x2032d4(0x1f6)]=function(_0x155ff8){const _0x396dd6=_0x2032d4;if(this[_0x396dd6(0xf5)]===undefined)this[_0x396dd6(0x356)]();if(this['_MessageCoreSettings'][_0x396dd6(0x197)]===undefined)this['initMessageCore']();this[_0x396dd6(0xf5)][_0x396dd6(0x197)]=_0x155ff8||0x1;},Game_System[_0x2032d4(0x2ae)][_0x2032d4(0x23d)]=function(){const _0x4b46b5=_0x2032d4;if(this[_0x4b46b5(0xf5)]===undefined)this[_0x4b46b5(0x356)]();if(this['_MessageCoreSettings'][_0x4b46b5(0x13c)]===undefined)this['initMessageCore']();return this[_0x4b46b5(0xf5)]['choiceCols'];},Game_System[_0x2032d4(0x2ae)][_0x2032d4(0xa1)]=function(_0x3e7fcf){const _0x3d8907=_0x2032d4;if(this[_0x3d8907(0xf5)]===undefined)this['initMessageCore']();if(this[_0x3d8907(0xf5)][_0x3d8907(0x13c)]===undefined)this[_0x3d8907(0x356)]();this[_0x3d8907(0xf5)][_0x3d8907(0x13c)]=_0x3e7fcf||0x1;},Game_System['prototype'][_0x2032d4(0x35b)]=function(){const _0x55f552=_0x2032d4;if(this[_0x55f552(0xf5)]===undefined)this['initMessageCore']();if(this[_0x55f552(0xf5)]['choiceTextAlign']===undefined)this[_0x55f552(0x356)]();return this[_0x55f552(0xf5)]['choiceTextAlign'];},Game_System[_0x2032d4(0x2ae)]['setChoiceListTextAlign']=function(_0x259e54){const _0x45e40b=_0x2032d4;if(this[_0x45e40b(0xf5)]===undefined)this[_0x45e40b(0x356)]();if(this['_MessageCoreSettings'][_0x45e40b(0x252)]===undefined)this[_0x45e40b(0x356)]();this['_MessageCoreSettings'][_0x45e40b(0x252)]=_0x259e54[_0x45e40b(0x277)]();},VisuMZ['MessageCore'][_0x2032d4(0x2d4)]=Game_Screen['prototype']['clearPictures'],Game_Screen[_0x2032d4(0x2ae)][_0x2032d4(0x22e)]=function(){const _0x221337=_0x2032d4;VisuMZ[_0x221337(0xdb)]['Game_Screen_clearPictures'][_0x221337(0xa5)](this),this[_0x221337(0xfc)]();},Game_Screen[_0x2032d4(0x2ae)][_0x2032d4(0xfc)]=function(){const _0x2655c2=_0x2032d4;this['_pictureText']=[],this[_0x2655c2(0x18d)]=[],this['_pictureTextRefresh']=[];},Game_Screen[_0x2032d4(0x2ae)][_0x2032d4(0x355)]=function(_0x4aef35){const _0x451f83=_0x2032d4;if(this[_0x451f83(0x2a6)]===undefined)this[_0x451f83(0xfc)]();const _0x33e4da=this[_0x451f83(0x1b4)](_0x4aef35);return this[_0x451f83(0x2a6)][_0x33e4da]=this['_pictureText'][_0x33e4da]||{},this['_pictureText'][_0x33e4da];},Game_Screen[_0x2032d4(0x2ae)][_0x2032d4(0x144)]=function(_0x3fa26a,_0x312b30){const _0x596b3a=_0x2032d4;return _0x312b30=_0x312b30[_0x596b3a(0x277)]()['trim'](),this[_0x596b3a(0x355)](_0x3fa26a)[_0x312b30]||'';},Game_Screen[_0x2032d4(0x2ae)][_0x2032d4(0x6f)]=function(_0x215f8f,_0x531824,_0x21911b){const _0x25dacc=_0x2032d4;_0x21911b=_0x21911b[_0x25dacc(0x277)]()[_0x25dacc(0x1f4)](),this[_0x25dacc(0x355)](_0x215f8f)[_0x21911b]=_0x531824||'',this[_0x25dacc(0x221)](_0x215f8f,!![]);},Game_Screen[_0x2032d4(0x2ae)][_0x2032d4(0x36c)]=function(_0x117ab7){const _0x310a7a=_0x2032d4;if(this[_0x310a7a(0x2a6)]===undefined)this[_0x310a7a(0xfc)]();const _0x4f504a=this[_0x310a7a(0x1b4)](_0x117ab7);this[_0x310a7a(0x2a6)][_0x4f504a]=null,this[_0x310a7a(0x221)](_0x117ab7,!![]);},Game_Screen['prototype'][_0x2032d4(0xca)]=function(_0x1f3f9f){const _0x5d4c65=_0x2032d4;if(this['_pictureText']===undefined)this[_0x5d4c65(0xfc)]();const _0x563e36=this[_0x5d4c65(0x1b4)](_0x1f3f9f);return this['_pictureTextBuffer'][_0x563e36]||0x0;},Game_Screen[_0x2032d4(0x2ae)][_0x2032d4(0x1d6)]=function(_0x37e2d9,_0x227f64){const _0x39892c=_0x2032d4;if(this[_0x39892c(0x2a6)]===undefined)this[_0x39892c(0xfc)]();const _0x3fa21e=this[_0x39892c(0x1b4)](_0x37e2d9);this[_0x39892c(0x18d)][_0x3fa21e]=Math[_0x39892c(0x16a)](0x0,_0x227f64);},Game_Screen[_0x2032d4(0x2ae)][_0x2032d4(0x8c)]=function(_0x413404){const _0x16bffd=_0x2032d4;if(this[_0x16bffd(0x2a6)]===undefined)this[_0x16bffd(0xfc)]();const _0x5a7150=this[_0x16bffd(0x1b4)](_0x413404);this['_pictureTextBuffer'][_0x5a7150]=undefined;},VisuMZ[_0x2032d4(0xdb)]['Game_Screen_erasePicture']=Game_Screen[_0x2032d4(0x2ae)][_0x2032d4(0x74)],Game_Screen[_0x2032d4(0x2ae)][_0x2032d4(0x74)]=function(_0x2be682){const _0x2c7148=_0x2032d4;VisuMZ['MessageCore'][_0x2c7148(0x25e)]['call'](this,_0x2be682),this[_0x2c7148(0x36c)](_0x2be682),this[_0x2c7148(0x8c)](_0x2be682),this['requestPictureTextRefresh'](_0x2be682,!![]);},Game_Screen[_0x2032d4(0x2ae)]['requestPictureTextRefreshAll']=function(){const _0xdf8f7a=_0x2032d4;for(const _0x375b8a of this[_0xdf8f7a(0xb3)]){if(_0x375b8a){let _0x55e12d=this[_0xdf8f7a(0xb3)][_0xdf8f7a(0x1ff)](_0x375b8a);this[_0xdf8f7a(0x221)](_0x55e12d);}}},Game_Screen[_0x2032d4(0x2ae)][_0x2032d4(0x221)]=function(_0x5b36ad,_0x50b871){const _0x5f3357=_0x2032d4;this['_pictureTextRefresh']=this[_0x5f3357(0x2f2)]||[],(this[_0x5f3357(0x19e)](_0x5b36ad)||_0x50b871)&&this[_0x5f3357(0x2f2)][_0x5f3357(0xcb)](_0x5b36ad);},Game_Screen[_0x2032d4(0x2ae)]['needsPictureTextRefresh']=function(_0x3fd37e){const _0x5267ea=_0x2032d4;return this[_0x5267ea(0x2f2)]=this['_pictureTextRefresh']||[],this[_0x5267ea(0x2f2)][_0x5267ea(0x1be)](_0x3fd37e);},Game_Screen['prototype'][_0x2032d4(0x104)]=function(_0x566c58){const _0x3a8a1f=_0x2032d4;this[_0x3a8a1f(0x2f2)]=this['_pictureTextRefresh']||[],this[_0x3a8a1f(0x2f2)][_0x3a8a1f(0xa8)](_0x566c58);},Game_Screen[_0x2032d4(0x2ae)][_0x2032d4(0x19e)]=function(_0x13c420){const _0x12966f=_0x2032d4,_0x2be838=[_0x12966f(0x32a),'up',_0x12966f(0x11a),'left',_0x12966f(0x2a7),_0x12966f(0x9e),'lowerleft','down',_0x12966f(0x2e2)];return _0x2be838[_0x12966f(0x1a4)](_0x19887b=>this['getPictureText'](_0x13c420,_0x19887b)!=='');},VisuMZ[_0x2032d4(0xdb)]['Game_Party_initialize']=Game_Party[_0x2032d4(0x2ae)]['initialize'],Game_Party[_0x2032d4(0x2ae)][_0x2032d4(0x178)]=function(){const _0x4c9102=_0x2032d4;VisuMZ[_0x4c9102(0xdb)][_0x4c9102(0x340)][_0x4c9102(0xa5)](this),this[_0x4c9102(0x356)]();},Game_Party[_0x2032d4(0x2ae)][_0x2032d4(0x356)]=function(){const _0x2027c1=_0x2032d4;this[_0x2027c1(0x254)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party['prototype'][_0x2032d4(0x181)]=function(){const _0x7c550e=_0x2032d4;if(this[_0x7c550e(0x254)]===undefined)this[_0x7c550e(0x356)]();return this[_0x7c550e(0x254)];},Game_Party[_0x2032d4(0x2ae)][_0x2032d4(0x13e)]=function(_0x3893c5,_0xd95872){const _0x5a5dc1=_0x2032d4;if(this[_0x5a5dc1(0x254)]===undefined)this[_0x5a5dc1(0x356)]();if(!_0x3893c5)return;if(DataManager['isItem'](_0x3893c5))this[_0x5a5dc1(0x254)]['type']=0x0;else{if(DataManager['isWeapon'](_0x3893c5)){if('yOjUj'!=='yOjUj'){_0x52345c[_0x5a5dc1(0xdb)]['Window_Message_terminateMessage'][_0x5a5dc1(0xa5)](this),this[_0x5a5dc1(0x14d)]();if(this['_messagePositionReset'])this['messagePositionReset']();}else this[_0x5a5dc1(0x254)][_0x5a5dc1(0xba)]=0x1;}else DataManager[_0x5a5dc1(0x328)](_0x3893c5)&&(this[_0x5a5dc1(0x254)][_0x5a5dc1(0xba)]=0x2);}this[_0x5a5dc1(0x254)]['id']=_0x3893c5['id'],this[_0x5a5dc1(0x254)]['quantity']=_0xd95872;},VisuMZ['MessageCore'][_0x2032d4(0x1b5)]=Game_Party['prototype']['gainItem'],Game_Party[_0x2032d4(0x2ae)][_0x2032d4(0x10e)]=function(_0x16a463,_0x2a3119,_0x392179){const _0x5a799a=_0x2032d4;VisuMZ[_0x5a799a(0xdb)]['Game_Party_gainItem'][_0x5a799a(0xa5)](this,_0x16a463,_0x2a3119,_0x392179),_0x2a3119>0x0&&(_0x5a799a(0x264)===_0x5a799a(0x297)?this['initialize'](...arguments):this['setLastGainedItemData'](_0x16a463,_0x2a3119));},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x14e)]=Game_Map[_0x2032d4(0x2ae)][_0x2032d4(0x178)],Game_Map['prototype'][_0x2032d4(0x178)]=function(){const _0x7e5510=_0x2032d4;VisuMZ['MessageCore'][_0x7e5510(0x14e)][_0x7e5510(0xa5)](this),this['_messageCommonEvents']=[];},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x21a)]=Game_Map[_0x2032d4(0x2ae)][_0x2032d4(0x1e4)],Game_Map[_0x2032d4(0x2ae)][_0x2032d4(0x1e4)]=function(){const _0x537d14=_0x2032d4;VisuMZ[_0x537d14(0xdb)][_0x537d14(0x21a)][_0x537d14(0xa5)](this),this[_0x537d14(0x128)]=[];},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x1d4)]=Game_Map[_0x2032d4(0x2ae)]['updateEvents'],Game_Map[_0x2032d4(0x2ae)][_0x2032d4(0x73)]=function(){const _0x3720a3=_0x2032d4;VisuMZ['MessageCore'][_0x3720a3(0x1d4)][_0x3720a3(0xa5)](this),this[_0x3720a3(0x302)]();},Game_Map['prototype'][_0x2032d4(0x350)]=function(_0x113b73){const _0x55b426=_0x2032d4;if(!$dataCommonEvents[_0x113b73])return;this[_0x55b426(0x128)]=this[_0x55b426(0x128)]||[];const _0x221953=this['_interpreter'][_0x55b426(0x13b)],_0x38d837=new Game_MessageCommonEvent(_0x113b73,_0x221953);this[_0x55b426(0x128)][_0x55b426(0xcb)](_0x38d837);},Game_Map['prototype'][_0x2032d4(0x302)]=function(){const _0x3fe865=_0x2032d4;this['_messageCommonEvents']=this[_0x3fe865(0x128)]||[];for(const _0x27108f of this[_0x3fe865(0x128)]){if('CgPJv'==='CgPJv'){if(!_0x27108f['_interpreter']){if(_0x3fe865(0x367)!=='WCoSW'){_0x2308bd[_0x3fe865(0xdb)][_0x3fe865(0x31f)][_0x3fe865(0xa5)](this,_0x3287e5);const _0x1657da=_0x4cea4c['MessageCore'][_0x3fe865(0x242)][_0x3fe865(0x1cb)];_0x2c0aa[_0x3fe865(0xdb)]['CreateAutoColorFor'](_0x1c1c00,_0x1657da['Items']);}else this['_messageCommonEvents']['remove'](_0x27108f);}else _0x27108f[_0x3fe865(0x2b7)]();}else{if(this['_pictureText']===_0x34756b)this[_0x3fe865(0xfc)]();const _0x3956cd=this[_0x3fe865(0x1b4)](_0x481f61);return this[_0x3fe865(0x2a6)][_0x3956cd]=this[_0x3fe865(0x2a6)][_0x3956cd]||{},this[_0x3fe865(0x2a6)][_0x3956cd];}}},VisuMZ['MessageCore']['Game_Map_refresh']=Game_Map['prototype'][_0x2032d4(0x2cb)],Game_Map['prototype'][_0x2032d4(0x2cb)]=function(){const _0x3e9a59=_0x2032d4;VisuMZ[_0x3e9a59(0xdb)][_0x3e9a59(0x357)][_0x3e9a59(0xa5)](this),$gameScreen['requestPictureTextRefreshAll']();},Game_Interpreter['prototype'][_0x2032d4(0x246)]=function(_0x1bcd2b){const _0x1dee03=_0x2032d4;if($gameMessage['isBusy']())return![];return this['prepareShowTextCommand'](_0x1bcd2b),this[_0x1dee03(0x29f)](_0x1bcd2b),this[_0x1dee03(0x2cc)](_0x1bcd2b),this[_0x1dee03(0xf3)](_0x1dee03(0x2db)),!![];},Game_Interpreter[_0x2032d4(0x2ae)][_0x2032d4(0x155)]=function(_0x9185e9){const _0x4cad04=_0x2032d4;$gameMessage[_0x4cad04(0x22f)](_0x9185e9[0x0],_0x9185e9[0x1]),$gameMessage['setBackground'](_0x9185e9[0x2]),$gameMessage[_0x4cad04(0x2c7)](_0x9185e9[0x3]),$gameMessage[_0x4cad04(0x182)](_0x9185e9[0x4]);},Game_Interpreter[_0x2032d4(0x2ae)][_0x2032d4(0x29f)]=function(_0x55cdfc){const _0x31dbd6=_0x2032d4;while(this['isContinuePrepareShowTextCommands']()){if(_0x31dbd6(0x94)!==_0x31dbd6(0x23e)){this['_index']++;if(this[_0x31dbd6(0x1f0)]()[_0x31dbd6(0x294)]===0x191){if(_0x31dbd6(0x89)!=='gMnac'){let _0x25b850=this[_0x31dbd6(0x1f0)]()['parameters'][0x0];_0x25b850=VisuMZ[_0x31dbd6(0xdb)][_0x31dbd6(0x111)](_0x25b850),$gameMessage['add'](_0x25b850);}else{_0x4c6989=_0x1a1101[_0x31dbd6(0x31d)](/\x1b!/g,''),_0x338424=_0x5e3474[_0x31dbd6(0x31d)](/\x1b\|/g,''),_0x50e918=_0x2fff49[_0x31dbd6(0x31d)](/\x1b\./g,'');const _0x403839=this[_0x31dbd6(0x99)](_0x25455c,0x0,0x0,0x0),_0x490162=this[_0x31dbd6(0x2a9)]();return _0x403839['drawing']=![],this[_0x31dbd6(0x27b)](_0x403839),this['returnPreservedFontSettings'](_0x490162),{'width':_0x403839[_0x31dbd6(0x24f)],'height':_0x403839[_0x31dbd6(0x33d)]};}}if(this[_0x31dbd6(0x35e)]())break;}else return this[_0x31dbd6(0x18e)]=_0x43d6da,'';}},Game_Interpreter[_0x2032d4(0x2ae)][_0x2032d4(0x2ff)]=function(){const _0xa3d33c=_0x2032d4;if(this[_0xa3d33c(0x1c6)]()===0x65&&$gameSystem['getMessageWindowRows']()>0x4){if(_0xa3d33c(0xc8)!==_0xa3d33c(0x2b8))return!![];else this['processWrapBreak'](_0x366a32);}else return this['nextEventCode']()===0x191;},VisuMZ[_0x2032d4(0xdb)]['ParseAddedText']=function(_0x5e7a3d){const _0x55ac0e=_0x2032d4;return _0x5e7a3d=_0x5e7a3d[_0x55ac0e(0x31d)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x5e7a3d=_0x5e7a3d['replace'](/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi,(_0x48a7d9,_0x3f69ab)=>this[_0x55ac0e(0x1b9)](_0x3f69ab)),_0x5e7a3d;},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x1b9)]=function(_0x5dec7b){const _0x4724ea=_0x2032d4,_0x51011a=_0x5dec7b[_0x4724ea(0x321)]('|')[_0x4724ea(0xae)](_0x43e2d5=>_0x43e2d5[_0x4724ea(0x1f4)]())[_0x4724ea(0xa8)]('')[_0x4724ea(0xa8)](null);return _0x51011a[Math[_0x4724ea(0x1a9)](_0x51011a[_0x4724ea(0xf9)])];},Game_Interpreter[_0x2032d4(0x2ae)][_0x2032d4(0x35e)]=function(){const _0x33e5a9=_0x2032d4;if(this[_0x33e5a9(0x1f0)]()&&this[_0x33e5a9(0x1f0)]()[_0x33e5a9(0x83)][0x0][_0x33e5a9(0x345)](/<(?:NEXT PAGE|NEXTPAGE)>/gi)){if(_0x33e5a9(0x1ef)!==_0x33e5a9(0x1ef))_0x4e7f8a['x']=this[_0x33e5a9(0xc6)]+_0x11d92d;else return!![];}return $gameMessage[_0x33e5a9(0x114)][_0x33e5a9(0xf9)]>=$gameSystem[_0x33e5a9(0x92)]()&&this['nextEventCode']()!==0x191;},Game_Interpreter[_0x2032d4(0x2ae)][_0x2032d4(0x2cc)]=function(_0x2712e0){const _0x2f6d7d=_0x2032d4;switch(this[_0x2f6d7d(0x1c6)]()){case 0x66:this[_0x2f6d7d(0x86)]++,this[_0x2f6d7d(0x2a4)](this['currentCommand']()[_0x2f6d7d(0x83)]);break;case 0x67:this[_0x2f6d7d(0x86)]++,this[_0x2f6d7d(0x153)](this['currentCommand']()[_0x2f6d7d(0x83)]);break;case 0x68:this[_0x2f6d7d(0x86)]++,this[_0x2f6d7d(0x28a)](this[_0x2f6d7d(0x1f0)]()[_0x2f6d7d(0x83)]);break;}},VisuMZ['MessageCore'][_0x2032d4(0x22a)]=Game_Interpreter['prototype'][_0x2032d4(0x2a4)],Game_Interpreter[_0x2032d4(0x2ae)][_0x2032d4(0x2a4)]=function(_0xf53c68){const _0x14b32a=_0x2032d4;_0xf53c68=this[_0x14b32a(0x78)](),VisuMZ[_0x14b32a(0xdb)][_0x14b32a(0x22a)][_0x14b32a(0xa5)](this,_0xf53c68);},Game_Interpreter['prototype'][_0x2032d4(0x78)]=function(){const _0x4ee200=_0x2032d4,_0x5e56b7=this[_0x4ee200(0x86)],_0x5c032a=[];let _0x2b77d1=0x0;this[_0x4ee200(0x86)]++;while(this['_index']<this[_0x4ee200(0x288)]['length']){if('ErvIt'!==_0x4ee200(0xf2)){if(this['currentCommand']()['indent']===this['_indent']){if(this['currentCommand']()[_0x4ee200(0x294)]===0x194&&this[_0x4ee200(0x1c6)]()!==0x66){if(_0x4ee200(0x2dd)===_0x4ee200(0x1d3)){const _0x29a26b=_0x84bc7b[_0x4ee200(0x321)](',')[_0x4ee200(0xae)](_0x261365=>_0x5dbd66(_0x261365)||0x0);let _0x3ca5c7=_0x29a26b[0x0]||0x0,_0x5ace8e=_0x29a26b[0x1]||0x0;return _0x4b87a0['setMessageWindowXyOffsets'](_0x3ca5c7,_0x5ace8e),'';}else break;}else{if(this['currentCommand']()[_0x4ee200(0x294)]===0x66)_0x4ee200(0x2de)===_0x4ee200(0x323)?(_0x2e73f7[_0x4ee200(0xdb)][_0x4ee200(0x134)][_0x4ee200(0xa5)](this,_0x332562),_0x4ee200(0x113)in _0x739657?this['textSpeed']=_0x30c119(_0x44e66d[_0x4ee200(0x113)])[_0x4ee200(0x245)](0x1,0xb):this[_0x4ee200(0x113)]=_0x47b88e[_0x4ee200(0xdb)][_0x4ee200(0x242)][_0x4ee200(0x274)][_0x4ee200(0xbb)]):(this[_0x4ee200(0x7c)](_0x2b77d1,this['currentCommand'](),_0x5e56b7),this[_0x4ee200(0x86)]-=0x2);else this[_0x4ee200(0x1f0)]()[_0x4ee200(0x294)]===0x192&&(_0x4ee200(0x141)!==_0x4ee200(0x141)?(_0x3e8bd5['MessageCore'][_0x4ee200(0x2e1)][_0x4ee200(0xa5)](this),this[_0x4ee200(0x219)]()):(this['currentCommand']()['parameters'][0x0]=_0x2b77d1,_0x2b77d1++));}}this[_0x4ee200(0x86)]++;}else _0x3ea486=_0x12d295[_0x4ee200(0x309)]((this[_0x4ee200(0x1e6)]-_0x4953e5['height'])/0x2);}return this[_0x4ee200(0x86)]=_0x5e56b7,this[_0x4ee200(0x1f0)]()[_0x4ee200(0x83)];},Game_Interpreter[_0x2032d4(0x2ae)][_0x2032d4(0x7c)]=function(_0x1c8bf8,_0x263115,_0x2a789e){const _0x33782d=_0x2032d4;this[_0x33782d(0x129)](_0x1c8bf8,_0x263115,_0x2a789e),this[_0x33782d(0x152)](_0x1c8bf8,_0x263115,_0x2a789e),this[_0x33782d(0x29b)](_0x263115,_0x2a789e);},Game_Interpreter[_0x2032d4(0x2ae)][_0x2032d4(0x129)]=function(_0x3b035e,_0x469d5a,_0x554a7e){const _0x4b65a7=_0x2032d4;if(_0x469d5a[_0x4b65a7(0x83)][0x2]<0x0)return;const _0x56f6fb=_0x469d5a[_0x4b65a7(0x83)][0x2]+_0x3b035e;this['_list'][_0x554a7e][_0x4b65a7(0x83)][0x2]=_0x56f6fb;},Game_Interpreter[_0x2032d4(0x2ae)][_0x2032d4(0x152)]=function(_0x38c66a,_0x3caded,_0x704101){const _0x1a9be5=_0x2032d4;if(_0x3caded[_0x1a9be5(0x83)][0x1]>=0x0){if('qtRhN'==='qtRhN'){var _0x4d2fd2=_0x3caded[_0x1a9be5(0x83)][0x1]+_0x38c66a;this[_0x1a9be5(0x288)][_0x704101]['parameters'][0x1]=_0x4d2fd2;}else{if(this[_0x1a9be5(0xf5)]===_0x5d11b1)this[_0x1a9be5(0x356)]();if(this[_0x1a9be5(0xf5)]['messageWordWrap']===_0x503a03)this['initMessageCore']();this[_0x1a9be5(0xf5)]['messageWordWrap']=_0x5dc9d0;}}else _0x3caded[_0x1a9be5(0x83)][0x1]===-0x2&&(this[_0x1a9be5(0x288)][_0x704101][_0x1a9be5(0x83)][0x1]=_0x3caded['parameters'][0x1]);},Game_Interpreter[_0x2032d4(0x2ae)][_0x2032d4(0x29b)]=function(_0x2137ba,_0x32802d){const _0xa1aa07=_0x2032d4;for(const _0x5574fe of _0x2137ba['parameters'][0x0]){this['_list'][_0x32802d][_0xa1aa07(0x83)][0x0]['push'](_0x5574fe);}this[_0xa1aa07(0x288)]['splice'](this[_0xa1aa07(0x86)]-0x1,0x2);};function _0x5228(_0x111937,_0x550ba7){const _0x203c63=_0x203c();return _0x5228=function(_0x52287c,_0x4ad8dd){_0x52287c=_0x52287c-0x6e;let _0x372a7b=_0x203c63[_0x52287c];return _0x372a7b;},_0x5228(_0x111937,_0x550ba7);}function Game_MessageCommonEvent(){const _0x29fa7f=_0x2032d4;this[_0x29fa7f(0x178)](...arguments);}Game_MessageCommonEvent[_0x2032d4(0x2ae)][_0x2032d4(0x178)]=function(_0x1a3766,_0x5e9799){const _0x58c9e2=_0x2032d4;this['_commonEventId']=_0x1a3766,this[_0x58c9e2(0x13b)]=_0x5e9799||0x0,this[_0x58c9e2(0x2cb)]();},Game_MessageCommonEvent['prototype'][_0x2032d4(0x360)]=function(){const _0x567699=_0x2032d4;return $dataCommonEvents[this[_0x567699(0xb4)]];},Game_MessageCommonEvent['prototype'][_0x2032d4(0x28b)]=function(){const _0x23e37d=_0x2032d4;return this[_0x23e37d(0x360)]()[_0x23e37d(0x28b)];},Game_MessageCommonEvent[_0x2032d4(0x2ae)][_0x2032d4(0x2cb)]=function(){const _0x3ee252=_0x2032d4;this[_0x3ee252(0x2a3)]=new Game_Interpreter(),this[_0x3ee252(0x2a3)][_0x3ee252(0x188)](this['list'](),this[_0x3ee252(0x13b)]);},Game_MessageCommonEvent[_0x2032d4(0x2ae)][_0x2032d4(0x2b7)]=function(){const _0x3dad4e=_0x2032d4;if(this[_0x3dad4e(0x2a3)]){if(this[_0x3dad4e(0x2a3)][_0x3dad4e(0x177)]())this[_0x3dad4e(0x2a3)][_0x3dad4e(0x2b7)]();else{if('dYTCG'!==_0x3dad4e(0x316))return this['_messageWindow']?this[_0x3dad4e(0x31e)]():_0x387025['MessageCore'][_0x3dad4e(0x1a6)]['call'](this);else this[_0x3dad4e(0x165)]();}}},Game_MessageCommonEvent['prototype'][_0x2032d4(0x165)]=function(){const _0x394b15=_0x2032d4;this[_0x394b15(0x2a3)]=null;},Scene_Message[_0x2032d4(0x2ae)][_0x2032d4(0x1c1)]=function(){const _0x2207e1=_0x2032d4,_0x415806=Math[_0x2207e1(0x213)](Graphics['width'],$gameSystem[_0x2207e1(0x2fa)]()),_0x2f4a52=$gameSystem[_0x2207e1(0x92)](),_0x49a761=this[_0x2207e1(0x2c2)](_0x2f4a52,![]),_0x31ee01=(Graphics[_0x2207e1(0x2d9)]-_0x415806)/0x2,_0xb5757d=0x0;return new Rectangle(_0x31ee01,_0xb5757d,_0x415806,_0x49a761);},VisuMZ[_0x2032d4(0xdb)]['Scene_Options_maxCommands']=Scene_Options['prototype'][_0x2032d4(0x2ec)],Scene_Options[_0x2032d4(0x2ae)][_0x2032d4(0x2ec)]=function(){const _0x1f13e5=_0x2032d4;let _0x4dcca7=VisuMZ[_0x1f13e5(0xdb)][_0x1f13e5(0x361)][_0x1f13e5(0xa5)](this);const _0x1b4fc7=VisuMZ['MessageCore'][_0x1f13e5(0x242)];if(_0x1b4fc7[_0x1f13e5(0x274)][_0x1f13e5(0x275)]&&_0x1b4fc7[_0x1f13e5(0x274)]['AdjustRect'])_0x4dcca7++;return _0x4dcca7;},VisuMZ['MessageCore'][_0x2032d4(0x220)]=Sprite_Picture['prototype'][_0x2032d4(0xf6)],Sprite_Picture[_0x2032d4(0x2ae)][_0x2032d4(0xf6)]=function(){const _0x269c49=_0x2032d4;VisuMZ[_0x269c49(0xdb)][_0x269c49(0x220)][_0x269c49(0xa5)](this),this[_0x269c49(0x2ab)]();},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x10b)]=Sprite_Picture['prototype']['update'],Sprite_Picture[_0x2032d4(0x2ae)]['update']=function(){const _0x23a202=_0x2032d4;VisuMZ['MessageCore'][_0x23a202(0x10b)]['call'](this),this[_0x23a202(0x19f)]();},Sprite_Picture['prototype']['updatePictureText']=function(){const _0xbe786a=_0x2032d4;if(!this[_0xbe786a(0x140)])return;this[_0xbe786a(0x18b)](),this['anchorPictureText'](),this[_0xbe786a(0x35c)](),this[_0xbe786a(0x121)]();},Sprite_Picture[_0x2032d4(0x2ae)][_0x2032d4(0x2ab)]=function(){const _0x282725=_0x2032d4;if(this[_0x282725(0x136)])return;if(this['_pictureTextSprite'])return;const _0x5aaf69=new Rectangle(0x0,0x0,0x0,0x0);this[_0x282725(0x136)]=new Window_Base(_0x5aaf69),this['_pictureTextWindow'][_0x282725(0x2e5)]=0x0,this[_0x282725(0x2ce)]=new Sprite(),this['addChildAt'](this['_pictureTextSprite'],0x0),this['_pictureTextWidth']=0x0,this[_0x282725(0x28f)]=0x0,this[_0x282725(0x2a1)]={};},Sprite_Picture['prototype'][_0x2032d4(0x18b)]=function(){const _0x4af4d7=_0x2032d4;if(!this['_pictureTextWindow'])return;if(this[_0x4af4d7(0x19d)]===this[_0x4af4d7(0xc6)]&&this[_0x4af4d7(0x28f)]===this['height'])return;this['_pictureTextWidth']=this[_0x4af4d7(0xc6)],this[_0x4af4d7(0x28f)]=this[_0x4af4d7(0x1e6)],this[_0x4af4d7(0x2a1)]={},this[_0x4af4d7(0x136)]['move'](0x0,0x0,this[_0x4af4d7(0xc6)],this[_0x4af4d7(0x1e6)]);},Sprite_Picture['prototype']['anchorPictureText']=function(){const _0x41ced7=_0x2032d4;if(!this['_pictureTextSprite'])return;this[_0x41ced7(0x2ce)]['anchor']['x']=this[_0x41ced7(0x1cd)]['x'],this[_0x41ced7(0x2ce)]['anchor']['y']=this[_0x41ced7(0x1cd)]['y'];},Sprite_Picture[_0x2032d4(0x2ae)][_0x2032d4(0x35c)]=function(){const _0x5e6192=_0x2032d4;if(!this['_pictureTextWindow'])return;if(!this[_0x5e6192(0x2a0)]())return;const _0x587280=[_0x5e6192(0x32a),'up','upperright',_0x5e6192(0x12c),_0x5e6192(0x2a7),_0x5e6192(0x9e),_0x5e6192(0x299),_0x5e6192(0xad),_0x5e6192(0x2e2)];this[_0x5e6192(0x136)]['createContents']();for(const _0x37e9a2 of _0x587280){if(_0x5e6192(0x20b)!==_0x5e6192(0x20b)){const _0x86cf4=_0x570f4d['$1'][_0x5e6192(0x321)](',')[_0x5e6192(0xae)](_0x1cf378=>_0x13d97a(_0x1cf378)||0x0);for(const _0x3cacee of _0x86cf4){if(!_0x52fba5[_0x5e6192(0x1e5)](_0x3cacee))return!![];}return![];}else this[_0x5e6192(0x175)](_0x37e9a2);}},Sprite_Picture[_0x2032d4(0x2ae)][_0x2032d4(0x2a0)]=function(){const _0x4910ed=_0x2032d4;if($gameScreen[_0x4910ed(0x2b3)](this[_0x4910ed(0x26e)]))return!![];const _0x2aa649=[_0x4910ed(0x32a),'up',_0x4910ed(0x11a),'left',_0x4910ed(0x2a7),_0x4910ed(0x9e),_0x4910ed(0x299),'down',_0x4910ed(0x2e2)];for(const _0x548d8c of _0x2aa649){const _0x1a3d5a=$gameScreen[_0x4910ed(0x144)](this[_0x4910ed(0x26e)],_0x548d8c);if(this[_0x4910ed(0x2a1)][_0x548d8c]===_0x1a3d5a)continue;return!![];}return![];},Sprite_Picture[_0x2032d4(0x2ae)][_0x2032d4(0x175)]=function(_0x5048a2){const _0x311150=_0x2032d4;$gameScreen[_0x311150(0x104)](this[_0x311150(0x26e)]);const _0x115ec7=$gameScreen[_0x311150(0x144)](this[_0x311150(0x26e)],_0x5048a2);this[_0x311150(0x2a1)][_0x5048a2]=_0x115ec7;const _0x438470=this[_0x311150(0x136)]['textSizeEx'](_0x115ec7);let _0x4c371c=$gameScreen[_0x311150(0xca)](this[_0x311150(0x26e)]),_0xbcd547=_0x4c371c,_0xc09ce=_0x4c371c;if(['up',_0x311150(0x2a7),_0x311150(0xad)][_0x311150(0x1be)](_0x5048a2))_0xbcd547=Math[_0x311150(0x309)]((this[_0x311150(0xc6)]-_0x438470[_0x311150(0xc6)])/0x2);else[_0x311150(0x11a),'right',_0x311150(0x2e2)]['includes'](_0x5048a2)&&('ANahP'==='ANahP'?_0xbcd547=Math[_0x311150(0x309)](this[_0x311150(0xc6)]-_0x438470[_0x311150(0xc6)]-_0x4c371c):(this[_0x311150(0x33e)]['fontFace']=_0x38b03e['mainFontFace'](),this[_0x311150(0x33e)][_0x311150(0x1cc)]=_0x266ecf['mainFontSize'](),this[_0x311150(0x33e)]['fontBold']=![],this[_0x311150(0x33e)]['fontItalic']=![],this[_0x311150(0x34c)]()));if(['left',_0x311150(0x2a7),_0x311150(0x9e)][_0x311150(0x1be)](_0x5048a2))_0xc09ce=Math[_0x311150(0x309)]((this[_0x311150(0x1e6)]-_0x438470[_0x311150(0x1e6)])/0x2);else[_0x311150(0x299),'down',_0x311150(0x2e2)][_0x311150(0x1be)](_0x5048a2)&&(_0xc09ce=Math[_0x311150(0x309)](this['height']-_0x438470['height']-_0x4c371c));this[_0x311150(0x136)][_0x311150(0x124)](_0x115ec7,_0xbcd547,_0xc09ce);},Sprite_Picture[_0x2032d4(0x2ae)]['attachPictureText']=function(){const _0xec17c=_0x2032d4;if(!this[_0xec17c(0x136)])return;if(!this[_0xec17c(0x2ce)])return;this[_0xec17c(0x2ce)][_0xec17c(0x32d)]=this[_0xec17c(0x136)][_0xec17c(0x33e)];},VisuMZ['MessageCore'][_0x2032d4(0xd3)]=Window_Base['prototype']['initialize'],Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x178)]=function(_0x38af04){const _0x4c7820=_0x2032d4;this[_0x4c7820(0x356)](_0x38af04),VisuMZ[_0x4c7820(0xdb)][_0x4c7820(0xd3)]['call'](this,_0x38af04);},Window_Base[_0x2032d4(0x2ae)]['initMessageCore']=function(_0xec3450){const _0x1a6570=_0x2032d4;this[_0x1a6570(0x1d0)](),this[_0x1a6570(0x296)](),this[_0x1a6570(0x21b)](_0xec3450);},Window_Base['prototype'][_0x2032d4(0x1d0)]=function(){const _0x5ffcc3=_0x2032d4;this[_0x5ffcc3(0x34f)](_0x5ffcc3(0x186));},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x34f)]=function(_0x2386e7){const _0x487da5=_0x2032d4;this[_0x487da5(0x1b7)]=_0x2386e7;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x2f0)]=function(){return this['_textAlignment'];},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x303)]=Window_Base['prototype'][_0x2032d4(0x20a)],Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x20a)]=function(_0x31a4fa){const _0x2b7b85=_0x2032d4;return this['resetWordWrap'](),VisuMZ[_0x2b7b85(0xdb)][_0x2b7b85(0x303)][_0x2b7b85(0xa5)](this,_0x31a4fa);},Window_Base[_0x2032d4(0x2ae)]['textSizeExRaw']=function(_0x51fe5e){const _0x4c71ff=_0x2032d4;return VisuMZ[_0x4c71ff(0xdb)][_0x4c71ff(0x303)][_0x4c71ff(0xa5)](this,_0x51fe5e);},VisuMZ['MessageCore'][_0x2032d4(0x77)]=Window_Base[_0x2032d4(0x2ae)]['processAllText'],Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x27b)]=function(_0x3caca4){const _0x542e39=_0x2032d4;VisuMZ[_0x542e39(0xdb)]['Window_Base_processAllText'][_0x542e39(0xa5)](this,_0x3caca4);if(_0x3caca4[_0x542e39(0x300)])this[_0x542e39(0x34f)](_0x542e39(0x186));},Window_Base['prototype']['resetWordWrap']=function(){const _0x3a495b=_0x2032d4;this[_0x3a495b(0x32c)](![]);},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x80)]=function(){const _0x1c06ec=_0x2032d4;return this[_0x1c06ec(0x18e)];},Window_Base['prototype'][_0x2032d4(0x32c)]=function(_0x5b48f0){return this['_wordWrap']=_0x5b48f0,'';},Window_Base['prototype'][_0x2032d4(0x21b)]=function(_0x229bcd){const _0x4f687a=_0x2032d4;this[_0x4f687a(0x281)]=JsonEx[_0x4f687a(0x2ba)](_0x229bcd);},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x20f)]=function(){const _0x29b99c=_0x2032d4;this[_0x29b99c(0x33e)][_0x29b99c(0x273)]=$gameSystem['mainFontFace'](),this[_0x29b99c(0x33e)]['fontSize']=$gameSystem[_0x29b99c(0x36b)](),this[_0x29b99c(0x33e)][_0x29b99c(0x194)]=![],this['contents'][_0x29b99c(0x30a)]=![],this['resetTextColor']();},Window_Base[_0x2032d4(0x2ae)]['resetTextColor']=function(){const _0x5f36d9=_0x2032d4;this[_0x5f36d9(0x143)](ColorManager[_0x5f36d9(0x1a7)]()),this['changeOutlineColor'](ColorManager[_0x5f36d9(0x1ac)]());const _0x288cf8=VisuMZ['MessageCore'][_0x5f36d9(0x242)]['General'];if(_0x288cf8[_0x5f36d9(0xfb)]===undefined){if(_0x5f36d9(0x9c)!==_0x5f36d9(0x201))_0x288cf8['DefaultOutlineWidth']=0x3;else{const _0x3304e1=_0x319f02['MessageCore'][_0x5f36d9(0x2a5)][_0x5f36d9(0xa5)](this);return _0x3304e1[_0x5f36d9(0x113)]=this[_0x5f36d9(0x113)],_0x3304e1;}}this['contents'][_0x5f36d9(0x349)]=_0x288cf8[_0x5f36d9(0xfb)],this[_0x5f36d9(0x1ba)](![]);},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x1ba)]=function(_0x452e79){const _0x21381f=_0x2032d4;this[_0x21381f(0x2c9)]=_0x452e79;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x2fe)]=function(){const _0x19ce3c=_0x2032d4;return this[_0x19ce3c(0x2c9)];},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0xdc)]=function(){return![];},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x2a9)]=function(){const _0x4beba3=_0x2032d4,_0x46155c=[_0x4beba3(0x273),'fontSize',_0x4beba3(0x194),_0x4beba3(0x30a),_0x4beba3(0x1b2),_0x4beba3(0x315),_0x4beba3(0x349),'paintOpacity'];let _0x81fa27={};for(const _0x50b3fb of _0x46155c){_0x81fa27[_0x50b3fb]=this['contents'][_0x50b3fb];}return _0x81fa27;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x14b)]=function(_0x2f538b){const _0x39d70c=_0x2032d4;for(const _0x1ec009 in _0x2f538b){this[_0x39d70c(0x33e)][_0x1ec009]=_0x2f538b[_0x1ec009];}},VisuMZ['MessageCore'][_0x2032d4(0x2e1)]=Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x2b7)],Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x2b7)]=function(){VisuMZ['MessageCore']['Window_Base_update']['call'](this),this['updateMove']();},Window_Base['prototype']['canMove']=function(){return![];},Window_Base['prototype'][_0x2032d4(0x219)]=function(){const _0x2809c8=_0x2032d4;this[_0x2809c8(0x238)]>0x0&&(this[_0x2809c8(0x1ce)]()&&(this['x']=this[_0x2809c8(0x18f)](this['x'],this['_moveTargetX']),this['y']=this['applyMoveEasing'](this['y'],this[_0x2809c8(0xbd)]),this[_0x2809c8(0xc6)]=this[_0x2809c8(0x18f)](this[_0x2809c8(0xc6)],this['_moveTargetWidth']),this['height']=this[_0x2809c8(0x18f)](this[_0x2809c8(0x1e6)],this[_0x2809c8(0x34d)]),this[_0x2809c8(0x2c5)]()),this[_0x2809c8(0x238)]--);},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x2c5)]=function(_0x5d56f1,_0x5119c6){const _0x4b6b73=_0x2032d4;!_0x5d56f1&&(this[_0x4b6b73(0xc6)]=Math['min'](this[_0x4b6b73(0xc6)],Graphics['width']),this[_0x4b6b73(0x1e6)]=Math[_0x4b6b73(0x213)](this[_0x4b6b73(0x1e6)],Graphics[_0x4b6b73(0x1e6)]));if(!_0x5119c6){if(_0x4b6b73(0x97)!=='rRiwQ')_0x144351[_0x4b6b73(0xdb)][_0x4b6b73(0x26c)][_0x4b6b73(0xa5)](this),this[_0x4b6b73(0x284)](),this['process_VisuMZ_MessageCore_TextCodes_Replace'](),this['process_VisuMZ_MessageCore_TextMacros'](),this[_0x4b6b73(0x215)]();else{const _0x43593c=-(Math[_0x4b6b73(0x309)](Graphics[_0x4b6b73(0xc6)]-Graphics[_0x4b6b73(0x2d9)])/0x2),_0x3dbb02=_0x43593c+Graphics['width']-this['width'],_0x49e485=-(Math[_0x4b6b73(0x309)](Graphics[_0x4b6b73(0x1e6)]-Graphics[_0x4b6b73(0x20c)])/0x2),_0x1064ac=_0x49e485+Graphics[_0x4b6b73(0x1e6)]-this[_0x4b6b73(0x1e6)];this['x']=this['x'][_0x4b6b73(0x245)](_0x43593c,_0x3dbb02),this['y']=this['y']['clamp'](_0x49e485,_0x1064ac);}}},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x18f)]=function(_0xaff4e3,_0x3e4414){const _0x3cc29d=_0x2032d4,_0x58f48e=this[_0x3cc29d(0x238)],_0x106e4a=this['_wholeMoveDuration'],_0x280af1=this[_0x3cc29d(0x25b)]((_0x106e4a-_0x58f48e)/_0x106e4a),_0x1d0092=this[_0x3cc29d(0x25b)]((_0x106e4a-_0x58f48e+0x1)/_0x106e4a),_0x14b4cc=(_0xaff4e3-_0x3e4414*_0x280af1)/(0x1-_0x280af1);return _0x14b4cc+(_0x3e4414-_0x14b4cc)*_0x1d0092;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x25b)]=function(_0x2dad5a){const _0x585166=_0x2032d4,_0x263e19=0x2;switch(this[_0x585166(0x1ee)]){case 0x0:return _0x2dad5a;case 0x1:return this['easeIn'](_0x2dad5a,_0x263e19);case 0x2:return this[_0x585166(0x261)](_0x2dad5a,_0x263e19);case 0x3:return this[_0x585166(0x162)](_0x2dad5a,_0x263e19);default:return Imported[_0x585166(0x2da)]?VisuMZ[_0x585166(0x18f)](_0x2dad5a,this[_0x585166(0x1ee)]):_0x2dad5a;}},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x342)]=function(_0xa95e66,_0xe21631,_0x22f1bf,_0xac38c6,_0x4e003e,_0x53105d){const _0x3afeaa=_0x2032d4;this[_0x3afeaa(0x108)]=_0xa95e66,this[_0x3afeaa(0xbd)]=_0xe21631,this[_0x3afeaa(0x1af)]=_0x22f1bf||this['width'],this['_moveTargetHeight']=_0xac38c6||this['height'],this[_0x3afeaa(0x238)]=_0x4e003e||0x1;if(this[_0x3afeaa(0x238)]<=0x0)this[_0x3afeaa(0x238)]=0x1;this[_0x3afeaa(0x1f7)]=this['_moveDuration'],this[_0x3afeaa(0x1ee)]=_0x53105d||0x0;if(_0x4e003e<=0x0)this[_0x3afeaa(0x219)]();},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x222)]=function(_0x309e1e,_0x5738d0,_0x10addc,_0x1f4144,_0x49370a,_0x565fc0){const _0x1cc0e=_0x2032d4;this['_moveTargetX']=this['x']+_0x309e1e,this['_moveTargetY']=this['y']+_0x5738d0,this[_0x1cc0e(0x1af)]=this[_0x1cc0e(0xc6)]+(_0x10addc||0x0),this[_0x1cc0e(0x34d)]=this['height']+(_0x1f4144||0x0),this[_0x1cc0e(0x238)]=_0x49370a||0x1;if(this['_moveDuration']<=0x0)this[_0x1cc0e(0x238)]=0x1;this['_wholeMoveDuration']=this[_0x1cc0e(0x238)],this[_0x1cc0e(0x1ee)]=_0x565fc0||0x0;if(_0x49370a<=0x0)this['updateMove']();},Window_Base[_0x2032d4(0x2ae)]['resetRect']=function(_0x26d569,_0x2fa6a9){const _0x5de5ec=_0x2032d4;this['moveTo'](this[_0x5de5ec(0x281)]['x'],this['_resetRect']['y'],this['_resetRect'][_0x5de5ec(0xc6)],this[_0x5de5ec(0x281)]['height'],_0x26d569,_0x2fa6a9);},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x193)]=Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x143)],Window_Base[_0x2032d4(0x2ae)]['changeTextColor']=function(_0x1fed48){const _0x3328b9=_0x2032d4;if(this['isColorLocked']())return;_0x1fed48=_0x1fed48[_0x3328b9(0x31d)](/\,/g,''),this[_0x3328b9(0x27d)]=this[_0x3328b9(0x27d)]||[],this['_textColorStack'][_0x3328b9(0xc7)](this['contents'][_0x3328b9(0x1b2)]),VisuMZ[_0x3328b9(0xdb)][_0x3328b9(0x193)][_0x3328b9(0xa5)](this,_0x1fed48);},Window_Base['prototype'][_0x2032d4(0x2c6)]=function(_0x2c72fc){const _0x598939=_0x2032d4;this[_0x598939(0x21c)](_0x2c72fc);if(this[_0x598939(0x2fe)]())return;if(_0x2c72fc['drawing']){if(_0x598939(0x2b5)===_0x598939(0x11d))return'\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x2ff781,_0x587e7e);else this[_0x598939(0x27d)]=this['_textColorStack']||[],this['contents'][_0x598939(0x1b2)]=this[_0x598939(0x27d)][_0x598939(0x12d)]()||ColorManager[_0x598939(0x1a7)]();}},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x26b)]=function(_0xcece65){const _0x32b93f=_0x2032d4;return _0xcece65=this[_0x32b93f(0x1bc)](_0xcece65),_0xcece65=this['convertBackslashCharacters'](_0xcece65),_0xcece65=this[_0x32b93f(0x138)](_0xcece65),_0xcece65=this['convertButtonAssistEscapeCharacters'](_0xcece65),_0xcece65=this[_0x32b93f(0x1f2)](_0xcece65),_0xcece65=this['convertShowChoiceEscapeCodes'](_0xcece65),_0xcece65=this[_0x32b93f(0x2c3)](_0xcece65),_0xcece65=this[_0x32b93f(0x2d3)](_0xcece65),_0xcece65=this[_0x32b93f(0x130)](_0xcece65),_0xcece65=this['convertBaseEscapeCharacters'](_0xcece65),_0xcece65=this[_0x32b93f(0x34a)](_0xcece65),_0xcece65=this[_0x32b93f(0x306)](_0xcece65),_0xcece65=this['convertMessageCoreEscapeReplacements'](_0xcece65),_0xcece65=this[_0x32b93f(0x16c)](_0xcece65),_0xcece65=this['convertVariableEscapeCharacters'](_0xcece65),_0xcece65=this['processAutoColorWords'](_0xcece65),_0xcece65=this[_0x32b93f(0x159)](_0xcece65),_0xcece65;},Window_Base['prototype'][_0x2032d4(0x1bc)]=function(_0x4b0dcb){const _0x4ea1a1=_0x2032d4;this[_0x4ea1a1(0xa6)]=![];for(const _0xc9868c of VisuMZ[_0x4ea1a1(0xdb)][_0x4ea1a1(0x242)][_0x4ea1a1(0x148)]){_0x4b0dcb['match'](_0xc9868c['textCodeCheck'])&&(this[_0x4ea1a1(0xa6)]=!![],_0x4b0dcb=_0x4b0dcb[_0x4ea1a1(0x31d)](_0xc9868c[_0x4ea1a1(0x2c4)],_0xc9868c['textCodeResult'][_0x4ea1a1(0x241)](this)));}return _0x4b0dcb;},Window_Base['prototype']['convertBackslashCharacters']=function(_0x1bf9b0){const _0x287802=_0x2032d4;return _0x1bf9b0=_0x1bf9b0['replace'](/\\/g,'\x1b'),_0x1bf9b0=_0x1bf9b0[_0x287802(0x31d)](/\x1b\x1b/g,'\x5c'),_0x1bf9b0;},Window_Base['prototype'][_0x2032d4(0x138)]=function(_0x27b769){const _0x5b7e65=_0x2032d4;for(;;){if(_0x27b769[_0x5b7e65(0x345)](/\\V\[(\d+)\]/gi))_0x27b769=_0x27b769[_0x5b7e65(0x31d)](/\\V\[(\d+)\]/gi,(_0x3c2193,_0x4ff228)=>this[_0x5b7e65(0x1ea)](String($gameVariables[_0x5b7e65(0x1e5)](parseInt(_0x4ff228)))));else{if(_0x27b769['match'](/\x1bV\[(\d+)\]/gi)){if('rQdAm'===_0x5b7e65(0xe1))_0x27b769=_0x27b769[_0x5b7e65(0x31d)](/\x1bV\[(\d+)\]/gi,(_0x164b45,_0x1c7d17)=>this[_0x5b7e65(0x1ea)](String($gameVariables[_0x5b7e65(0x1e5)](parseInt(_0x1c7d17)))));else return'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x5b7e65(0x362)](_0x5b770c,_0x48227e);}else break;}}return _0x27b769;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x161)]=function(_0x512b6d){const _0x202c96=_0x2032d4;return Imported[_0x202c96(0x2da)]&&(_0x512b6d=_0x512b6d['replace'](/<Up (?:KEY|BUTTON)>/gi,this[_0x202c96(0xc4)]('up')),_0x512b6d=_0x512b6d[_0x202c96(0x31d)](/<Left (?:KEY|BUTTON)>/gi,this[_0x202c96(0xc4)](_0x202c96(0x12c))),_0x512b6d=_0x512b6d[_0x202c96(0x31d)](/<Right (?:KEY|BUTTON)>/gi,this[_0x202c96(0xc4)]('right')),_0x512b6d=_0x512b6d['replace'](/<Down (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x202c96(0xad))),_0x512b6d=_0x512b6d[_0x202c96(0x31d)](/<Ok (?:KEY|BUTTON)>/gi,this[_0x202c96(0xc4)]('ok')),_0x512b6d=_0x512b6d[_0x202c96(0x31d)](/<Cancel (?:KEY|BUTTON)>/gi,this[_0x202c96(0xc4)](_0x202c96(0x235))),_0x512b6d=_0x512b6d[_0x202c96(0x31d)](/<Menu (?:KEY|BUTTON)>/gi,this[_0x202c96(0xc4)](_0x202c96(0x11f))),_0x512b6d=_0x512b6d['replace'](/<Shift (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x202c96(0x12d))),_0x512b6d=_0x512b6d[_0x202c96(0x31d)](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this[_0x202c96(0xc4)](_0x202c96(0x251))),_0x512b6d=_0x512b6d[_0x202c96(0x31d)](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this[_0x202c96(0xc4)](_0x202c96(0x107)))),_0x512b6d;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0xc4)]=function(_0x27d57c){const _0x164c3a=_0x2032d4;let _0x351164=TextManager[_0x164c3a(0x1d5)](_0x27d57c)||'';return _0x351164=this['convertBackslashCharacters'](_0x351164),_0x351164=this[_0x164c3a(0x138)](_0x351164),_0x351164[_0x164c3a(0x1f4)]();},Window_Base['prototype'][_0x2032d4(0x1f2)]=function(_0x5df50c){const _0x43ad94=_0x2032d4;return this[_0x43ad94(0x324)](),_0x5df50c;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x16c)]=function(_0x4e65dc){return _0x4e65dc;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x106)]=function(_0x35d7cf){const _0x4b4a85=_0x2032d4;return _0x35d7cf=_0x35d7cf[_0x4b4a85(0x31d)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x35d7cf=_0x35d7cf[_0x4b4a85(0x31d)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x35d7cf=_0x35d7cf[_0x4b4a85(0x31d)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x35d7cf=_0x35d7cf['replace'](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x35d7cf=_0x35d7cf[_0x4b4a85(0x31d)](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x35d7cf;},Window_Base['prototype'][_0x2032d4(0x2c3)]=function(_0x928acc){const _0x28ef6d=_0x2032d4;return _0x928acc=_0x928acc['replace'](/<B>/gi,_0x28ef6d(0x157)),_0x928acc=_0x928acc[_0x28ef6d(0x31d)](/<\/B>/gi,_0x28ef6d(0x256)),_0x928acc=_0x928acc[_0x28ef6d(0x31d)](/<I>/gi,_0x28ef6d(0x236)),_0x928acc=_0x928acc[_0x28ef6d(0x31d)](/<\/I>/gi,_0x28ef6d(0x20e)),_0x928acc;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x2d3)]=function(_0x2d558e){const _0x5371c7=_0x2032d4;return _0x2d558e=_0x2d558e['replace'](/<LEFT>/gi,_0x5371c7(0x8b)),_0x2d558e=_0x2d558e['replace'](/<\/LEFT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x2d558e=_0x2d558e[_0x5371c7(0x31d)](/<CENTER>/gi,'\x1bTEXTALIGNMENT[2]'),_0x2d558e=_0x2d558e[_0x5371c7(0x31d)](/<\/CENTER>/gi,_0x5371c7(0x13f)),_0x2d558e=_0x2d558e['replace'](/<RIGHT>/gi,_0x5371c7(0x271)),_0x2d558e=_0x2d558e[_0x5371c7(0x31d)](/<\/RIGHT>/gi,_0x5371c7(0x13f)),_0x2d558e;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x130)]=function(_0x7a75e3){const _0x2aefbf=_0x2032d4;return _0x7a75e3=_0x7a75e3[_0x2aefbf(0x31d)](/<COLORLOCK>/gi,_0x2aefbf(0x12a)),_0x7a75e3=_0x7a75e3['replace'](/<\/COLORLOCK>/gi,_0x2aefbf(0x11b)),_0x7a75e3=_0x7a75e3['replace'](/\(\(\(/gi,_0x2aefbf(0x12a)),_0x7a75e3=_0x7a75e3[_0x2aefbf(0x31d)](/\)\)\)/gi,'\x1bCOLORLOCK[0]'),_0x7a75e3;},Window_Base[_0x2032d4(0x2ae)]['convertBaseEscapeCharacters']=function(_0x5a4055){const _0x2f1d8c=_0x2032d4;return _0x5a4055=_0x5a4055['replace'](/\x1bN\[(\d+)\]/gi,(_0x15a8e4,_0xe92a56)=>this[_0x2f1d8c(0xec)](parseInt(_0xe92a56))),_0x5a4055=_0x5a4055['replace'](/\x1bP\[(\d+)\]/gi,(_0x526a84,_0x1b9a8e)=>this['partyMemberName'](parseInt(_0x1b9a8e))),_0x5a4055=_0x5a4055[_0x2f1d8c(0x31d)](/\x1bG/gi,TextManager[_0x2f1d8c(0x91)]),_0x5a4055;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x34a)]=function(_0x1bdc2b){const _0x4b103d=_0x2032d4;return _0x1bdc2b=_0x1bdc2b['replace'](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x4b103d(0x2fd)]()),_0x1bdc2b=_0x1bdc2b['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x4b103d(0x1c3)]()),_0x1bdc2b=_0x1bdc2b[_0x4b103d(0x31d)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x4b103d(0x2b2)](!![])),_0x1bdc2b=_0x1bdc2b['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x4b103d(0x2b2)](![])),_0x1bdc2b;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x2fd)]=function(){const _0x1449a5=_0x2032d4;if(!SceneManager['isSceneBattle']())return'';if(BattleManager[_0x1449a5(0x234)])return BattleManager['_target'][_0x1449a5(0x248)]();if(BattleManager[_0x1449a5(0xa9)][0x0])return BattleManager[_0x1449a5(0xa9)][0x0][_0x1449a5(0x248)]();return'';},Window_Base['prototype'][_0x2032d4(0x1c3)]=function(){const _0x5ec194=_0x2032d4;if(!SceneManager[_0x5ec194(0x102)]())return'';let _0x50c953=null;_0x50c953=BattleManager[_0x5ec194(0x166)];if(!_0x50c953&&BattleManager['isInputting']()){if(_0x5ec194(0x7a)===_0x5ec194(0xac))return this['_scene']&&this[_0x5ec194(0x276)][_0x5ec194(0x2d1)]===_0x823085;else _0x50c953=BattleManager[_0x5ec194(0x13d)]();}return _0x50c953?_0x50c953[_0x5ec194(0x248)]():'';},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x2b2)]=function(_0x1feeef){const _0x2390ab=_0x2032d4;if(!SceneManager[_0x2390ab(0x102)]())return'';let _0x44eab5=BattleManager[_0x2390ab(0x2f6)]||null;!_0x44eab5&&BattleManager['isInputting']()&&(_0x44eab5=BattleManager[_0x2390ab(0xaf)]());if(_0x44eab5&&_0x44eab5['item']()){if('hZvPF'===_0x2390ab(0x1bd)){let _0x808c26='';if(_0x1feeef)_0x808c26+='\x1bI[%1]'[_0x2390ab(0x362)](_0x44eab5[_0x2390ab(0xb9)]()[_0x2390ab(0x8f)]);return _0x808c26+=_0x44eab5['item']()[_0x2390ab(0x248)],_0x808c26;}else{const _0xcf67a=_0xe0c6d9[_0x2390ab(0xc6)]||this[_0x2390ab(0x85)],_0x4aad98=this[_0x2390ab(0x86)]!==_0x153923?this['itemHeight']():this[_0x2390ab(0x10d)],_0x56f923=_0xcf67a/_0x334c44[_0x2390ab(0xc6)],_0x177013=_0x4aad98/_0x2ffb98[_0x2390ab(0x1e6)],_0x4e2321=_0x5254ca[_0x2390ab(0x213)](_0x56f923,_0x177013,0x1),_0x424995=this['_index']!==_0x438428?(this['itemRectWithPadding'](0x0)['height']-this[_0x2390ab(0x31b)]())/0x2:0x0,_0x4a9e04=_0x49e010['width']*_0x4e2321,_0x1db4a7=_0x581e81['height']*_0x4e2321,_0x47e53d=_0x151bb0['floor']((_0xcf67a-_0x4a9e04)/0x2)+_0x3e3a7c[_0x2390ab(0xf4)],_0x3a2a6f=_0x31c7fe[_0x2390ab(0x309)]((_0x4aad98-_0x1db4a7)/0x2)+_0x4af70e[_0x2390ab(0x2d7)]-_0x424995*0x2;this['contentsBack'][_0x2390ab(0x9f)]=_0x1ad3f7,this[_0x2390ab(0x226)][_0x2390ab(0x70)](_0x3e4952,0x0,0x0,_0x446c00[_0x2390ab(0xc6)],_0x364e4f[_0x2390ab(0x1e6)],_0x47e53d,_0x3a2a6f,_0x4a9e04,_0x1db4a7),this[_0x2390ab(0x226)]['paintOpacity']=0xff;}}return'';},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x306)]=function(_0x34ad80){const _0x426e77=_0x2032d4;for(const _0x426d5e of VisuMZ[_0x426e77(0xdb)][_0x426e77(0x242)][_0x426e77(0xe0)]){'AJUVc'!=='AJUVc'?(_0x2e219c[_0x426e77(0x296)](),_0x54cbbb[_0x426e77(0x169)](),_0x25ea61['createContents']()):_0x34ad80['match'](_0x426d5e[_0x426e77(0x2c4)])&&(_0x34ad80=_0x34ad80[_0x426e77(0x31d)](_0x426d5e[_0x426e77(0x2c4)],_0x426d5e[_0x426e77(0xe8)]),_0x34ad80=this[_0x426e77(0x138)](_0x34ad80));}return _0x34ad80;},Window_Base['prototype']['convertMessageCoreEscapeReplacements']=function(_0x53ff96){const _0x42949b=_0x2032d4;for(const _0x12b6fe of VisuMZ[_0x42949b(0xdb)][_0x42949b(0x242)]['TextCodeReplace']){_0x53ff96['match'](_0x12b6fe[_0x42949b(0x2c4)])&&(_0x53ff96=_0x53ff96[_0x42949b(0x31d)](_0x12b6fe[_0x42949b(0x2c4)],_0x12b6fe[_0x42949b(0xe8)][_0x42949b(0x241)](this)),_0x53ff96=this['convertVariableEscapeCharacters'](_0x53ff96));}return _0x53ff96;},Window_Base[_0x2032d4(0x2ae)]['actorName']=function(_0x30f672){const _0x2b14ec=_0x2032d4,_0x1bbff6=_0x30f672>=0x1?$gameActors[_0x2b14ec(0x13d)](_0x30f672):null,_0x47601b=_0x1bbff6?_0x1bbff6[_0x2b14ec(0x248)]():'',_0x3d4881=Number(VisuMZ['MessageCore']['Settings'][_0x2b14ec(0x1cb)][_0x2b14ec(0x93)]);return this[_0x2b14ec(0xdc)]()&&_0x3d4881!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x2b14ec(0x362)](_0x3d4881,_0x47601b):_0x47601b;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x84)]=function(_0x219b20){const _0x384389=_0x2032d4,_0x271f8f=_0x219b20>=0x1?$gameParty[_0x384389(0x16f)]()[_0x219b20-0x1]:null,_0x53cb11=_0x271f8f?_0x271f8f[_0x384389(0x248)]():'',_0x1b025a=Number(VisuMZ['MessageCore']['Settings'][_0x384389(0x1cb)][_0x384389(0x93)]);return this[_0x384389(0xdc)]()&&_0x1b025a!==0x0?_0x384389(0xbe)['format'](_0x1b025a,_0x53cb11):_0x53cb11;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x341)]=function(_0x4316ea){const _0xda30e6=_0x2032d4;return this[_0xda30e6(0xdc)]()&&(_0x4316ea=this[_0xda30e6(0x2aa)](_0x4316ea),_0x4316ea=this['processActorNameAutoColorChanges'](_0x4316ea)),_0x4316ea;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x2aa)]=function(_0x247052){const _0x477582=_0x2032d4;for(autoColor of VisuMZ[_0x477582(0xdb)][_0x477582(0x29e)]){_0x247052=_0x247052[_0x477582(0x31d)](autoColor[0x0],autoColor[0x1]);}return _0x247052;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x14c)]=function(){const _0x36116a=_0x2032d4;this[_0x36116a(0x19b)]=[];},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x324)]=function(){const _0x62b839=_0x2032d4;this[_0x62b839(0x14c)]();const _0xcbc8a1=VisuMZ[_0x62b839(0xdb)]['Settings'][_0x62b839(0x1cb)],_0x28bd2b=_0xcbc8a1[_0x62b839(0x93)];if(_0x28bd2b<=0x0)return;for(const _0x5e06ca of $gameActors[_0x62b839(0x32f)]){if(!_0x5e06ca)continue;const _0x37f4e7=_0x5e06ca[_0x62b839(0x248)]();if(_0x37f4e7[_0x62b839(0x1f4)]()[_0x62b839(0xf9)]<=0x0)continue;if(/^\d+$/[_0x62b839(0x255)](_0x37f4e7))continue;if(_0x37f4e7['match'](/-----/i))continue;let _0x4b7a8f=VisuMZ[_0x62b839(0xdb)][_0x62b839(0x171)](_0x37f4e7);const _0x366db3=new RegExp('\x5cb'+_0x4b7a8f+'\x5cb','g'),_0x5ecfc3=_0x62b839(0xbe)[_0x62b839(0x362)](_0x28bd2b,_0x37f4e7);this[_0x62b839(0x19b)][_0x62b839(0xcb)]([_0x366db3,_0x5ecfc3]);}},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x295)]=function(_0x1019fa){const _0x509fb9=_0x2032d4;this[_0x509fb9(0x19b)]===undefined&&this[_0x509fb9(0x324)]();for(autoColor of this[_0x509fb9(0x19b)]){if(_0x509fb9(0x20d)===_0x509fb9(0xde)){if(this['isColorLocked']())return;_0x3240ee=_0x29aa98['replace'](/\,/g,''),this[_0x509fb9(0x27d)]=this[_0x509fb9(0x27d)]||[],this[_0x509fb9(0x27d)][_0x509fb9(0xc7)](this['contents'][_0x509fb9(0x1b2)]),_0x37c88b[_0x509fb9(0xdb)][_0x509fb9(0x193)][_0x509fb9(0xa5)](this,_0x3cc624);}else _0x1019fa=_0x1019fa[_0x509fb9(0x31d)](autoColor[0x0],autoColor[0x1]);}return _0x1019fa;},Window_Base[_0x2032d4(0x2ae)]['databaseObjectName']=function(_0x112298,_0x5ed49b,_0x44c8a7){const _0x3de43c=_0x2032d4;if(!_0x112298)return'';const _0x497a1c=_0x112298[_0x5ed49b];let _0x2960fe='';if(_0x497a1c&&_0x44c8a7&&_0x497a1c[_0x3de43c(0x8f)]){if(_0x3de43c(0x1dc)!==_0x3de43c(0x272)){const _0x238733=_0x3de43c(0x15c);_0x2960fe=_0x238733[_0x3de43c(0x362)](_0x497a1c[_0x3de43c(0x8f)],_0x497a1c[_0x3de43c(0x248)]);}else this['adjustShowChoiceDefault'](_0x39a37d,_0x21758a,_0x30e96a),this[_0x3de43c(0x152)](_0x12caff,_0x493d62,_0x2a1e36),this['addExtraShowChoices'](_0x2a5e47,_0x22558a);}else{if(_0x497a1c)_0x2960fe=_0x497a1c[_0x3de43c(0x248)];else{if(_0x3de43c(0x1d2)!==_0x3de43c(0x326))_0x2960fe='';else{if(_0xd8d78c[_0x3de43c(0x1e5)](_0xc5272e))return![];}}}return this[_0x3de43c(0xdc)]()&&(_0x2960fe=this[_0x3de43c(0x282)](_0x2960fe,_0x112298)),_0x2960fe;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x88)]=function(_0xbbe6f1){const _0x437774=_0x2032d4,_0x10f8c6=$gameParty[_0x437774(0x181)]();if(_0x10f8c6['id']<0x0)return'';let _0x294371=null;if(_0x10f8c6[_0x437774(0xba)]===0x0)_0x294371=$dataItems[_0x10f8c6['id']];if(_0x10f8c6[_0x437774(0xba)]===0x1)_0x294371=$dataWeapons[_0x10f8c6['id']];if(_0x10f8c6['type']===0x2)_0x294371=$dataArmors[_0x10f8c6['id']];if(!_0x294371)return'';return _0xbbe6f1?_0x437774(0x15c)[_0x437774(0x362)](_0x294371[_0x437774(0x8f)],_0x294371[_0x437774(0x248)]):_0x294371[_0x437774(0x248)];},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x14a)]=function(){const _0x4ee0c9=_0x2032d4,_0x2e9536=$gameParty[_0x4ee0c9(0x181)]();if(_0x2e9536['id']<=0x0)return'';return _0x2e9536['quantity'];},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x282)]=function(_0x132008,_0x120810){const _0x7f96d7=_0x2032d4,_0x150aee=VisuMZ[_0x7f96d7(0xdb)]['Settings'][_0x7f96d7(0x1cb)];let _0x47561c=0x0;if(_0x120810===$dataActors)_0x47561c=_0x150aee['Actors'];if(_0x120810===$dataClasses)_0x47561c=_0x150aee[_0x7f96d7(0x35f)];if(_0x120810===$dataSkills)_0x47561c=_0x150aee[_0x7f96d7(0xe9)];if(_0x120810===$dataItems)_0x47561c=_0x150aee[_0x7f96d7(0x122)];if(_0x120810===$dataWeapons)_0x47561c=_0x150aee[_0x7f96d7(0x145)];if(_0x120810===$dataArmors)_0x47561c=_0x150aee[_0x7f96d7(0x8e)];if(_0x120810===$dataEnemies)_0x47561c=_0x150aee[_0x7f96d7(0x287)];if(_0x120810===$dataStates)_0x47561c=_0x150aee[_0x7f96d7(0x135)];return _0x47561c>0x0&&(_0x132008='\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x7f96d7(0x362)](_0x47561c,_0x132008)),_0x132008;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x159)]=function(_0x51ffac){const _0x5d9771=_0x2032d4;_0x51ffac=_0x51ffac[_0x5d9771(0x31d)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x31413c,_0x1aa5bd)=>this[_0x5d9771(0x32c)](!![])),_0x51ffac=_0x51ffac['replace'](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x4554ec,_0x37ad8b)=>this[_0x5d9771(0x32c)](![])),_0x51ffac=_0x51ffac['replace'](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x2b09a2,_0x2688f7)=>this[_0x5d9771(0x32c)](![]));if(_0x51ffac['match'](Window_Message[_0x5d9771(0x307)]))this[_0x5d9771(0x32c)](![]);else _0x51ffac[_0x5d9771(0x345)](Window_Message[_0x5d9771(0x10c)])&&('pOSyR'!==_0x5d9771(0xef)?this[_0x5d9771(0x32c)](![]):_0x2ea829[_0x5d9771(0x345)](_0x2e1262[_0x5d9771(0x2c4)])&&(_0x2cb9f1=_0x118a49[_0x5d9771(0x31d)](_0x2db06a['textCodeCheck'],_0x56d16b['textCodeResult'][_0x5d9771(0x241)](this)),_0x43d896=this[_0x5d9771(0x138)](_0x7db1c8)));if(!this[_0x5d9771(0x80)]())return _0x51ffac;if(_0x51ffac[_0x5d9771(0xf9)]<=0x0)return _0x51ffac;if(VisuMZ[_0x5d9771(0xdb)]['Settings']['WordWrap']['LineBreakSpace'])_0x51ffac=_0x51ffac['replace'](/[\n\r]+/g,'\x20'),_0x51ffac=_0x51ffac['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a');else{if('bMfJG'!==_0x5d9771(0x237))_0x51ffac=_0x51ffac[_0x5d9771(0x31d)](/[\n\r]+/g,''),_0x51ffac=_0x51ffac[_0x5d9771(0x31d)](/<(?:BR|LINEBREAK)>/gi,'\x0a');else{const _0x2fd174=_0x26c843[_0x5d9771(0xdb)][_0x5d9771(0x242)]['General'];this['_messageOffsetX']=_0x2fd174[_0x5d9771(0x1dd)],this[_0x5d9771(0x1c7)]=_0x2fd174['MsgWindowOffsetY'];}}return _0x51ffac=this['addWrapBreakAfterPunctuation'](_0x51ffac),_0x51ffac=_0x51ffac['split']('\x20')[_0x5d9771(0x170)](_0x5d9771(0x119)),_0x51ffac=_0x51ffac[_0x5d9771(0x31d)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x51ffac=_0x51ffac[_0x5d9771(0x31d)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x51ffac;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x2bc)]=function(_0x3f299c){return _0x3f299c;},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x31c)]=Window_Base[_0x2032d4(0x2ae)]['processNewLine'],Window_Base['prototype'][_0x2032d4(0x146)]=function(_0x50a2b7){const _0x13f48c=_0x2032d4;VisuMZ[_0x13f48c(0xdb)]['Window_Base_processNewLine'][_0x13f48c(0xa5)](this,_0x50a2b7),this[_0x13f48c(0xdf)](_0x50a2b7);},VisuMZ[_0x2032d4(0xdb)]['Window_Base_processControlCharacter']=Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x2b9)],Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x2b9)]=function(_0x52761e,_0x4f44bd){const _0x47c8d6=_0x2032d4;VisuMZ[_0x47c8d6(0xdb)][_0x47c8d6(0x163)][_0x47c8d6(0xa5)](this,_0x52761e,_0x4f44bd),_0x4f44bd===_0x47c8d6(0x119)&&this['processWrapBreak'](_0x52761e);},Window_Base['prototype']['obtainEscapeString']=function(_0x198509){const _0x34ccdd=_0x2032d4;var _0x5d544b=/^\<(.*?)\>/[_0x34ccdd(0x311)](_0x198509[_0x34ccdd(0x202)][_0x34ccdd(0x24e)](_0x198509[_0x34ccdd(0xb8)]));if(_0x5d544b)return _0x198509[_0x34ccdd(0xb8)]+=_0x5d544b[0x0][_0x34ccdd(0xf9)],String(_0x5d544b[0x0][_0x34ccdd(0x24e)](0x1,_0x5d544b[0x0][_0x34ccdd(0xf9)]-0x1));else{if(_0x34ccdd(0x34b)==='YkDSW')this[_0x34ccdd(0x34f)](_0x34ccdd(0x186));else return'';}},VisuMZ[_0x2032d4(0xdb)]['Window_Base_processEscapeCharacter']=Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x180)],Window_Base[_0x2032d4(0x2ae)]['processEscapeCharacter']=function(_0x134eb6,_0x872785){const _0x2bae45=_0x2032d4;switch(_0x134eb6){case'C':if(_0x872785[_0x2bae45(0x300)]){if(_0x2bae45(0xf1)!==_0x2bae45(0xf1)){let _0x2b9365=this[_0x2bae45(0x13a)]();for(const _0x26db4c of this['_list']){const _0x44b7af=_0x26db4c['name'],_0x2a273b=this[_0x2bae45(0x2df)](_0x44b7af),_0xbb58de=this[_0x2bae45(0x20a)](_0x44b7af)[_0x2bae45(0xc6)]+_0x2a273b,_0x518a0f=_0x1ba3c[_0x2bae45(0x331)](_0xbb58de)+this[_0x2bae45(0x116)]()*0x2;_0x2b9365=_0x581de0[_0x2bae45(0x16a)](_0x2b9365,_0x518a0f);}return _0x2b9365;}else VisuMZ[_0x2bae45(0xdb)][_0x2bae45(0x30e)][_0x2bae45(0xa5)](this,_0x134eb6,_0x872785);}else _0x2bae45(0x139)===_0x2bae45(0x139)?this[_0x2bae45(0x21c)](_0x872785):(this[_0x2bae45(0xc6)]=_0x1b42cc['min'](this[_0x2bae45(0xc6)],_0x59f6e3['width']),this[_0x2bae45(0x1e6)]=_0x462bc5[_0x2bae45(0x213)](this[_0x2bae45(0x1e6)],_0x5d81b2[_0x2bae45(0x1e6)]));break;case'I':case'{':case'}':VisuMZ[_0x2bae45(0xdb)]['Window_Base_processEscapeCharacter'][_0x2bae45(0xa5)](this,_0x134eb6,_0x872785);break;case'FS':this['processFsTextCode'](_0x872785);break;case'PX':this[_0x2bae45(0x137)](_0x872785);break;case'PY':this['processPyTextCode'](_0x872785);break;case _0x2bae45(0x123):this[_0x2bae45(0x1c2)](this[_0x2bae45(0x21c)](_0x872785));break;case _0x2bae45(0x2ac):this[_0x2bae45(0x28d)](_0x872785);break;case'COLORLOCK':this[_0x2bae45(0x1ca)](_0x872785);break;case _0x2bae45(0x1a2):this[_0x2bae45(0xfd)](_0x872785);break;case'ITALIC':this[_0x2bae45(0x1fc)](this[_0x2bae45(0x21c)](_0x872785));break;case'PICTURE':this[_0x2bae45(0x263)](_0x872785);break;case'PREVCOLOR':this[_0x2bae45(0x2c6)](_0x872785);break;case _0x2bae45(0x2ed):this[_0x2bae45(0x365)](_0x872785);break;case _0x2bae45(0xea):this[_0x2bae45(0x344)](_0x872785);break;case _0x2bae45(0x109):this[_0x2bae45(0x22c)](_0x872785);break;default:this[_0x2bae45(0x172)](_0x134eb6,_0x872785);}},Window_Base[_0x2032d4(0x2ae)]['processMessageCoreEscapeActions']=function(_0x55f158,_0x1b3ae6){const _0x46d6a0=_0x2032d4;for(const _0x5847d1 of VisuMZ['MessageCore'][_0x46d6a0(0x242)]['TextCodeActions']){if(_0x5847d1[_0x46d6a0(0x279)]===_0x55f158){if(_0x5847d1[_0x46d6a0(0x1cf)]==='')this[_0x46d6a0(0x21c)](_0x1b3ae6);_0x5847d1[_0x46d6a0(0x347)][_0x46d6a0(0xa5)](this,_0x1b3ae6);if(this[_0x46d6a0(0x2d1)]===Window_Message){const _0x252b26=_0x5847d1[_0x46d6a0(0x71)]||0x0;if(_0x252b26>0x0)this['launchMessageCommonEvent'](_0x252b26);}}}},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x265)]=function(){const _0x3f25a3=_0x2032d4;this[_0x3f25a3(0x33e)][_0x3f25a3(0x1cc)]+=VisuMZ[_0x3f25a3(0xdb)]['Settings']['General'][_0x3f25a3(0x30c)],this[_0x3f25a3(0x33e)]['fontSize']=Math['min'](this[_0x3f25a3(0x33e)][_0x3f25a3(0x1cc)],VisuMZ[_0x3f25a3(0xdb)][_0x3f25a3(0x242)]['General'][_0x3f25a3(0x2f3)]);},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x23b)]=function(){const _0x19ddd3=_0x2032d4;this[_0x19ddd3(0x33e)][_0x19ddd3(0x1cc)]-=VisuMZ[_0x19ddd3(0xdb)][_0x19ddd3(0x242)][_0x19ddd3(0x29c)][_0x19ddd3(0x30c)],this[_0x19ddd3(0x33e)]['fontSize']=Math[_0x19ddd3(0x16a)](this[_0x19ddd3(0x33e)]['fontSize'],VisuMZ[_0x19ddd3(0xdb)][_0x19ddd3(0x242)][_0x19ddd3(0x29c)]['FontSmallerCap']);},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x233)]=function(_0x7db444){const _0x9b8f5f=_0x2032d4,_0x494d8e=this['obtainEscapeParam'](_0x7db444);this[_0x9b8f5f(0x33e)][_0x9b8f5f(0x1cc)]=_0x494d8e[_0x9b8f5f(0x245)](VisuMZ[_0x9b8f5f(0xdb)][_0x9b8f5f(0x242)][_0x9b8f5f(0x29c)][_0x9b8f5f(0x253)],VisuMZ[_0x9b8f5f(0xdb)][_0x9b8f5f(0x242)][_0x9b8f5f(0x29c)][_0x9b8f5f(0x2f3)]);},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x2ef)]=function(_0x1abcaf){const _0x15e283=_0x2032d4;let _0x21f772=this['contents']['fontSize'];const _0x7da3bd=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x57c739=_0x7da3bd[_0x15e283(0x311)](_0x1abcaf);if(!_0x57c739){if(_0x15e283(0x183)===_0x15e283(0x1e3))_0xa7c695=_0xee231e[_0x15e283(0x31d)](_0xf3a45[0x0],_0x533c21[0x1]);else break;}const _0x3ff155=String(_0x57c739[0x1])[_0x15e283(0xc2)]();if(_0x3ff155==='{')this[_0x15e283(0x265)]();else{if(_0x3ff155==='}')this['makeFontSmaller']();else _0x3ff155==='FS'&&(_0x15e283(0x2d6)!==_0x15e283(0x1e1)?this[_0x15e283(0x33e)]['fontSize']=parseInt(_0x57c739[0x3])[_0x15e283(0x245)](VisuMZ['MessageCore'][_0x15e283(0x242)][_0x15e283(0x29c)][_0x15e283(0x253)],VisuMZ['MessageCore']['Settings'][_0x15e283(0x29c)]['FontBiggerCap']):_0x13bd68[_0x15e283(0x345)](_0x45447c[_0x15e283(0x2c4)])&&(this[_0x15e283(0xa6)]=!![],_0x1d1a8a=_0x13bb91[_0x15e283(0x31d)](_0x3b6dc3[_0x15e283(0x2c4)],_0x204da1[_0x15e283(0xe8)][_0x15e283(0x241)](this))));}if(this[_0x15e283(0x33e)][_0x15e283(0x1cc)]>_0x21f772){if(_0x15e283(0x366)===_0x15e283(0x366))_0x21f772=this['contents'][_0x15e283(0x1cc)];else{let _0xe6183b='';if(_0x41444f)_0xe6183b+='\x1bI[%1]'['format'](_0x42ed7a[_0x15e283(0xb9)]()[_0x15e283(0x8f)]);return _0xe6183b+=_0x271c1f[_0x15e283(0xb9)]()[_0x15e283(0x248)],_0xe6183b;}}}return _0x21f772;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x137)]=function(_0x3ef5d1){const _0x41c331=_0x2032d4;_0x3ef5d1['x']=this[_0x41c331(0x21c)](_0x3ef5d1);if(VisuMZ[_0x41c331(0xdb)][_0x41c331(0x242)]['General'][_0x41c331(0x1b1)]){if(_0x41c331(0xb2)!==_0x41c331(0xb2))return this[_0x41c331(0x1c6)]()===0x65&&_0x3fb68a[_0x41c331(0x92)]()>0x4?!![]:this['nextEventCode']()===0x191;else _0x3ef5d1['x']+=_0x3ef5d1['startX'];}},Window_Base['prototype'][_0x2032d4(0x2be)]=function(_0x30a8af){const _0x100d95=_0x2032d4;_0x30a8af['y']=this['obtainEscapeParam'](_0x30a8af),VisuMZ[_0x100d95(0xdb)][_0x100d95(0x242)][_0x100d95(0x29c)][_0x100d95(0x1b1)]&&(_0x30a8af['y']+=_0x30a8af[_0x100d95(0x2d7)]);},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x1c2)]=function(_0x5cd97a){const _0x4472c4=_0x2032d4;this['contents'][_0x4472c4(0x194)]=!!_0x5cd97a;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x1fc)]=function(_0x2795da){const _0x54f627=_0x2032d4;this['contents'][_0x54f627(0x30a)]=!!_0x2795da;},Window_Base['prototype']['processTextAlignmentChange']=function(_0x2d9b55){const _0x4e1516=_0x2032d4,_0x298431=this[_0x4e1516(0x21c)](_0x2d9b55);if(!_0x2d9b55[_0x4e1516(0x300)])return;switch(_0x298431){case 0x0:this['setTextAlignment'](_0x4e1516(0x186));return;case 0x1:this[_0x4e1516(0x34f)](_0x4e1516(0x12c));break;case 0x2:this['setTextAlignment']('center');break;case 0x3:this[_0x4e1516(0x34f)](_0x4e1516(0x9e));break;}this['processTextAlignmentX'](_0x2d9b55);},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0xdf)]=function(_0x1dd8ae){const _0x1b62de=_0x2032d4;if(!_0x1dd8ae[_0x1b62de(0x300)])return;if(_0x1dd8ae[_0x1b62de(0xb6)])return;if(this[_0x1b62de(0x2f0)]()===_0x1b62de(0x186))return;let _0x30f9c5=_0x1dd8ae[_0x1b62de(0x202)][_0x1b62de(0x1ff)]('\x1bTEXTALIGNMENT',_0x1dd8ae[_0x1b62de(0xb8)]+0x1),_0xf4c416=_0x1dd8ae[_0x1b62de(0x202)][_0x1b62de(0x1ff)]('\x0a',_0x1dd8ae['index']+0x1);if(_0x30f9c5<0x0)_0x30f9c5=_0x1dd8ae[_0x1b62de(0x202)][_0x1b62de(0xf9)]+0x1;if(_0xf4c416>0x0)_0x30f9c5=Math['min'](_0x30f9c5,_0xf4c416);const _0x305e8d=_0x1dd8ae[_0x1b62de(0x202)][_0x1b62de(0x244)](_0x1dd8ae['index'],_0x30f9c5),_0x5c1401=this['textSizeExTextAlignment'](_0x305e8d)[_0x1b62de(0xc6)],_0x3a190a=_0x1dd8ae[_0x1b62de(0xc6)]||this['innerWidth']-0x8,_0x2626c5=this[_0x1b62de(0x2d1)]===Window_Message&&$gameMessage[_0x1b62de(0x1ed)]()!=='';switch(this[_0x1b62de(0x2f0)]()){case'left':_0x1dd8ae['x']=_0x1dd8ae['startX'];break;case _0x1b62de(0x2a7):_0x1dd8ae['x']=_0x1dd8ae[_0x1b62de(0xf4)],_0x1dd8ae['x']+=Math['floor']((_0x3a190a-_0x5c1401)/0x2);_0x2626c5&&('ooCkS'!==_0x1b62de(0x25f)?_0x1dd8ae['x']-=_0x1dd8ae[_0x1b62de(0xf4)]/0x2:this[_0x1b62de(0x165)]());break;case _0x1b62de(0x9e):_0x1dd8ae['x']=_0x3a190a-_0x5c1401+_0x1dd8ae[_0x1b62de(0xf4)];_0x2626c5&&(_0x1dd8ae['x']-=_0x1dd8ae[_0x1b62de(0xf4)]);break;}},Window_Base['prototype']['textSizeExTextAlignment']=function(_0x2e9366){const _0x45da3b=_0x2032d4;_0x2e9366=_0x2e9366[_0x45da3b(0x31d)](/\x1b!/g,''),_0x2e9366=_0x2e9366[_0x45da3b(0x31d)](/\x1b\|/g,''),_0x2e9366=_0x2e9366[_0x45da3b(0x31d)](/\x1b\./g,'');const _0x514b31=this[_0x45da3b(0x99)](_0x2e9366,0x0,0x0,0x0),_0x1a42ae=this['getPreservedFontSettings']();return _0x514b31[_0x45da3b(0x300)]=![],this[_0x45da3b(0x27b)](_0x514b31),this['returnPreservedFontSettings'](_0x1a42ae),{'width':_0x514b31[_0x45da3b(0x24f)],'height':_0x514b31['outputHeight']};},Window_Base['WORD_WRAP_PADDING']=VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x242)][_0x2032d4(0x1c4)][_0x2032d4(0x267)]||0x0,Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x22c)]=function(_0x5d5eb0){const _0x4ea6b9=_0x2032d4,_0x4336e4=(_0x5d5eb0[_0x4ea6b9(0xb6)]?-0x1:0x1)*this[_0x4ea6b9(0xc0)]('\x20');_0x5d5eb0['x']+=_0x4336e4;if(this[_0x4ea6b9(0x21c)](_0x5d5eb0)>0x0)_0x5d5eb0['x']+=_0x4336e4;if(_0x5d5eb0[_0x4ea6b9(0xb6)])return;let _0x51444f=_0x5d5eb0[_0x4ea6b9(0x202)][_0x4ea6b9(0x1ff)]('\x1bWrapBreak[0]',_0x5d5eb0['index']+0x1),_0x577cdc=_0x5d5eb0[_0x4ea6b9(0x202)][_0x4ea6b9(0x1ff)]('\x0a',_0x5d5eb0[_0x4ea6b9(0xb8)]+0x1);if(_0x51444f<0x0)_0x51444f=_0x5d5eb0['text'][_0x4ea6b9(0xf9)]+0x1;if(_0x577cdc>0x0)_0x51444f=Math['min'](_0x51444f,_0x577cdc);const _0x1a84fd=_0x5d5eb0['text'][_0x4ea6b9(0x244)](_0x5d5eb0[_0x4ea6b9(0xb8)],_0x51444f),_0x52bdca=this[_0x4ea6b9(0x2bb)](_0x1a84fd)[_0x4ea6b9(0xc6)];let _0x59e408=_0x5d5eb0[_0x4ea6b9(0xc6)]||this[_0x4ea6b9(0x85)];_0x59e408-=Window_Base[_0x4ea6b9(0xce)];if(this[_0x4ea6b9(0x2d1)]===Window_Message){const _0x1abcd6=$gameMessage[_0x4ea6b9(0x1ed)]()===''?0x0:ImageManager['faceWidth']+0x14;_0x59e408-=_0x1abcd6;if(VisuMZ[_0x4ea6b9(0xdb)][_0x4ea6b9(0x242)]['WordWrap']['TightWrap']){if(_0x4ea6b9(0x322)===_0x4ea6b9(0x28c))return this[_0x4ea6b9(0xab)](_0x14af0e,!![],!![]),this[_0x4ea6b9(0x358)](_0x4ea6b9(0x2e7),_0x5282a6(_0x4ac3fe)||0x0),'';else _0x59e408-=_0x1abcd6;}}let _0x48942d=![];if(_0x5d5eb0['x']+_0x52bdca>_0x5d5eb0['startX']+_0x59e408)_0x48942d=!![];if(_0x52bdca===0x0)_0x48942d=!![];_0x48942d&&(_0x5d5eb0['text']=_0x5d5eb0['text'][_0x4ea6b9(0x24e)](0x0,_0x5d5eb0['index'])+'\x0a'+_0x5d5eb0[_0x4ea6b9(0x202)]['substr'](_0x5d5eb0[_0x4ea6b9(0xb8)]));},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x2bb)]=function(_0x23da0e){const _0x525652=_0x2032d4,_0x12b2f1=this[_0x525652(0x99)](_0x23da0e,0x0,0x0,0x0),_0x3808c3=this['getPreservedFontSettings']();return _0x12b2f1[_0x525652(0x300)]=![],this[_0x525652(0x32c)](![]),this['processAllText'](_0x12b2f1),this['setWordWrap'](!![]),this['returnPreservedFontSettings'](_0x3808c3),{'width':_0x12b2f1[_0x525652(0x24f)],'height':_0x12b2f1[_0x525652(0x33d)]};},Window_Base[_0x2032d4(0x2ae)]['processCommonEvent']=function(_0x483db8){const _0x521257=_0x2032d4;return this[_0x521257(0x21c)](_0x483db8);},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x263)]=function(_0x699ace){const _0x4c3e93=_0x2032d4,_0x5133c8=this[_0x4c3e93(0x2cf)](_0x699ace)['split'](',');if(!_0x699ace[_0x4c3e93(0x300)])return;const _0x5a8610=_0x5133c8[0x0][_0x4c3e93(0x1f4)](),_0x323bbe=_0x5133c8[0x1]||0x0,_0x20c827=_0x5133c8[0x2]||0x0,_0x38cf01=ImageManager[_0x4c3e93(0x117)](_0x5a8610),_0x315312=this[_0x4c3e93(0x33e)][_0x4c3e93(0x9f)];_0x38cf01['addLoadListener'](this[_0x4c3e93(0x7b)][_0x4c3e93(0x241)](this,_0x38cf01,_0x699ace['x'],_0x699ace['y'],_0x323bbe,_0x20c827,_0x315312));},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x7b)]=function(_0x1e4161,_0x1a8d5e,_0x31ced2,_0xd74d67,_0x259eab,_0x56aac1){const _0x5b3346=_0x2032d4;_0xd74d67=_0xd74d67||_0x1e4161[_0x5b3346(0xc6)],_0x259eab=_0x259eab||_0x1e4161[_0x5b3346(0x1e6)],this['contentsBack']['paintOpacity']=_0x56aac1,this[_0x5b3346(0x226)][_0x5b3346(0x70)](_0x1e4161,0x0,0x0,_0x1e4161[_0x5b3346(0xc6)],_0x1e4161[_0x5b3346(0x1e6)],_0x1a8d5e,_0x31ced2,_0xd74d67,_0x259eab),this[_0x5b3346(0x226)]['paintOpacity']=0xff;},Window_Base[_0x2032d4(0x2ae)]['processDrawCenteredPicture']=function(_0x4e3ec4){const _0x2e668d=_0x2032d4,_0x3078b4=this[_0x2e668d(0x2cf)](_0x4e3ec4)[_0x2e668d(0x321)](',');if(!_0x4e3ec4[_0x2e668d(0x300)])return;const _0x5de409=_0x3078b4[0x0][_0x2e668d(0x1f4)](),_0xb9abb2=ImageManager['loadPicture'](_0x5de409),_0x155e73=JsonEx[_0x2e668d(0x2ba)](_0x4e3ec4),_0x102675=this['contents'][_0x2e668d(0x9f)];_0xb9abb2[_0x2e668d(0x210)](this[_0x2e668d(0x126)][_0x2e668d(0x241)](this,_0xb9abb2,_0x155e73,_0x102675));},Window_Base['prototype'][_0x2032d4(0x126)]=function(_0x3c1ae5,_0x3805c4,_0x3501b6){const _0x913050=_0x2032d4,_0x4b7cb3=_0x3805c4[_0x913050(0xc6)]||this[_0x913050(0x85)],_0xcc43aa=this['_index']!==undefined?this[_0x913050(0x2ee)]():this['innerHeight'],_0x333c2b=_0x4b7cb3/_0x3c1ae5[_0x913050(0xc6)],_0x53bd22=_0xcc43aa/_0x3c1ae5['height'],_0x2101b4=Math[_0x913050(0x213)](_0x333c2b,_0x53bd22,0x1),_0x3d1b04=this[_0x913050(0x86)]!==undefined?(this[_0x913050(0x1d7)](0x0)['height']-this['lineHeight']())/0x2:0x0,_0x1179ce=_0x3c1ae5[_0x913050(0xc6)]*_0x2101b4,_0x35e562=_0x3c1ae5['height']*_0x2101b4,_0x845a3a=Math[_0x913050(0x309)]((_0x4b7cb3-_0x1179ce)/0x2)+_0x3805c4[_0x913050(0xf4)],_0x40e189=Math[_0x913050(0x309)]((_0xcc43aa-_0x35e562)/0x2)+_0x3805c4[_0x913050(0x2d7)]-_0x3d1b04*0x2;this[_0x913050(0x226)]['paintOpacity']=_0x3501b6,this[_0x913050(0x226)][_0x913050(0x70)](_0x3c1ae5,0x0,0x0,_0x3c1ae5[_0x913050(0xc6)],_0x3c1ae5[_0x913050(0x1e6)],_0x845a3a,_0x40e189,_0x1179ce,_0x35e562),this[_0x913050(0x226)][_0x913050(0x9f)]=0xff;},Window_Base[_0x2032d4(0x2ae)][_0x2032d4(0x1ca)]=function(_0x5964ff){const _0x32a48c=_0x2032d4,_0x7c7e50=this[_0x32a48c(0x21c)](_0x5964ff);if(_0x5964ff[_0x32a48c(0x300)])this[_0x32a48c(0x1ba)](_0x7c7e50>0x0);},Window_Base['prototype']['processCustomWait']=function(_0x5ede4f){const _0x242c20=_0x2032d4,_0x5ce60f=this[_0x242c20(0x21c)](_0x5ede4f);if(this[_0x242c20(0x2d1)]===Window_Message&&_0x5ede4f[_0x242c20(0x300)]){if('hbXUK'!=='hbXUK'){const _0xf12e47=this[_0x242c20(0x1d7)](_0x59ee5b),_0x1a5a39=_0x4fc412[_0x242c20(0x35b)]()!==_0x242c20(0x186)?'<%1>'[_0x242c20(0x362)](_0x2b002b[_0x242c20(0x35b)]()):'',_0x55209b=_0x1a5a39+this[_0x242c20(0x228)](_0x19761a);this[_0x242c20(0x257)](this[_0x242c20(0x313)](_0x577dc0));const _0x2ee321=this[_0x242c20(0x20a)](_0x55209b)[_0x242c20(0x1e6)],_0x5a4785=_0xf12e47['x']+this[_0x242c20(0x2df)](_0x55209b),_0xa6a9b2=_0x594c4b[_0x242c20(0x16a)](_0xf12e47['y'],_0xf12e47['y']+_0x520af3[_0x242c20(0x224)]((_0xf12e47['height']-_0x2ee321)/0x2));this[_0x242c20(0x124)](_0x55209b,_0x5a4785,_0xa6a9b2,_0xf12e47[_0x242c20(0xc6)]);}else this[_0x242c20(0x2c8)](_0x5ce60f);}},Window_Help[_0x2032d4(0x2ae)]['resetWordWrap']=function(){const _0x8bf001=_0x2032d4;this[_0x8bf001(0x32c)]($gameSystem[_0x8bf001(0x250)]());},Window_Help[_0x2032d4(0x2ae)][_0x2032d4(0xdc)]=function(){return!![];},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0xcf)]=Window_Help[_0x2032d4(0x2ae)][_0x2032d4(0x2cb)],Window_Help[_0x2032d4(0x2ae)]['refresh']=function(){const _0x2d5963=_0x2032d4;this[_0x2d5963(0x14c)](),VisuMZ[_0x2d5963(0xdb)][_0x2d5963(0xcf)][_0x2d5963(0xa5)](this),this[_0x2d5963(0x296)]();},VisuMZ['MessageCore'][_0x2032d4(0xfa)]=Window_Options[_0x2032d4(0x2ae)][_0x2032d4(0x24c)],Window_Options[_0x2032d4(0x2ae)]['addGeneralOptions']=function(){const _0x3260d4=_0x2032d4;VisuMZ[_0x3260d4(0xdb)]['Window_Options_addGeneralOptions'][_0x3260d4(0xa5)](this),this[_0x3260d4(0x240)]();},Window_Options[_0x2032d4(0x2ae)][_0x2032d4(0x240)]=function(){const _0x378453=_0x2032d4;VisuMZ[_0x378453(0xdb)][_0x378453(0x242)][_0x378453(0x274)][_0x378453(0x275)]&&this[_0x378453(0xd1)]();},Window_Options['prototype'][_0x2032d4(0xd1)]=function(){const _0x5829c2=_0x2032d4,_0x375820=TextManager[_0x5829c2(0xb0)],_0x406147=_0x5829c2(0x113);this[_0x5829c2(0x1e0)](_0x375820,_0x406147);},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x1ec)]=Window_Options[_0x2032d4(0x2ae)][_0x2032d4(0x268)],Window_Options[_0x2032d4(0x2ae)][_0x2032d4(0x268)]=function(_0x3b78a0){const _0x530279=_0x2032d4,_0x15088b=this['commandSymbol'](_0x3b78a0);if(_0x15088b===_0x530279(0x113))return this['textSpeedStatusText']();return VisuMZ[_0x530279(0xdb)][_0x530279(0x1ec)][_0x530279(0xa5)](this,_0x3b78a0);},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x167)]=Window_Options[_0x2032d4(0x2ae)][_0x2032d4(0x339)],Window_Options[_0x2032d4(0x2ae)][_0x2032d4(0x339)]=function(_0x3b363e){const _0x1311b5=_0x2032d4;if(_0x3b363e===_0x1311b5(0x113))return!![];return VisuMZ[_0x1311b5(0xdb)][_0x1311b5(0x167)][_0x1311b5(0xa5)](this,_0x3b363e);},Window_Options['prototype']['textSpeedStatusText']=function(){const _0x2b900a=_0x2032d4,_0x107826=this[_0x2b900a(0x260)]('textSpeed');if(_0x107826>0xa){if(_0x2b900a(0x204)===_0x2b900a(0x1aa))_0x3e4db=_0x419881[_0x2b900a(0x31d)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x557f76,_0x108f20)=>{const _0x438109=_0x2b900a;return this[_0x438109(0xab)](_0x576f94,!![],!![]),this[_0x438109(0x358)](_0x438109(0x198),_0x445a43(_0x108f20)||0x1),'';}),_0x1cb8f5=_0x269fa8['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x4a5023,_0x3e4531)=>{const _0x2e227f=_0x2b900a;return this[_0x2e227f(0xab)](_0x772f6,!![],!![]),this[_0x2e227f(0x358)](_0x2e227f(0x1ae),_0x4e250e(_0x3e4531)||0x0),'';}),_0x4fcb21=_0x5ab8c2[_0x2b900a(0x31d)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x99bba7,_0x22ee2d)=>{const _0x2a740a=_0x2b900a;return this[_0x2a740a(0xab)](_0x31ecc7,!![],!![]),this['processAutoPosition'](_0x2a740a(0x269),_0x40f2f6(_0x22ee2d)||0x0),'';});else return TextManager[_0x2b900a(0x259)];}else{if(_0x2b900a(0x214)!==_0x2b900a(0xe2))return _0x107826;else{if(!_0x5f0995['value'](_0x539e2f))return!![];}}},VisuMZ['MessageCore']['Window_Options_changeVolume']=Window_Options['prototype']['changeVolume'],Window_Options[_0x2032d4(0x2ae)]['changeVolume']=function(_0x13e454,_0xa6f3ea,_0x459af0){const _0x5353ed=_0x2032d4;if(_0x13e454==='textSpeed')return this[_0x5353ed(0x1b6)](_0x13e454,_0xa6f3ea,_0x459af0);VisuMZ['MessageCore'][_0x5353ed(0x17d)][_0x5353ed(0xa5)](this,_0x13e454,_0xa6f3ea,_0x459af0);},Window_Options[_0x2032d4(0x2ae)][_0x2032d4(0x1b6)]=function(_0x3de2a0,_0x28d090,_0x5de224){const _0x42c5cb=_0x2032d4,_0x3d1c7b=this[_0x42c5cb(0x260)](_0x3de2a0),_0x49d722=0x1,_0x193fe0=_0x3d1c7b+(_0x28d090?_0x49d722:-_0x49d722);_0x193fe0>0xb&&_0x5de224?_0x42c5cb(0x125)!=='eHAzU'?this['changeValue'](_0x3de2a0,0x1):this[_0x42c5cb(0x17b)]():this[_0x42c5cb(0x1bb)](_0x3de2a0,_0x193fe0[_0x42c5cb(0x245)](0x1,0xb));},Window_Message['prototype'][_0x2032d4(0x158)]=function(){const _0x57c927=_0x2032d4;let _0x725bfe=Window_Base['prototype']['contentsHeight'][_0x57c927(0xa5)](this);return _0x725bfe-=this[_0x57c927(0x1de)](),_0x725bfe;},Window_Message['prototype'][_0x2032d4(0x199)]=function(){const _0x13b84c=_0x2032d4;Window_Base[_0x13b84c(0x2ae)]['refreshDimmerBitmap'][_0x13b84c(0xa5)](this),VisuMZ[_0x13b84c(0xdb)]['Settings']['General'][_0x13b84c(0x82)]&&(_0x13b84c(0x101)===_0x13b84c(0x26d)?(_0x51db76['MessageCore'][_0x13b84c(0x357)][_0x13b84c(0xa5)](this),_0x2c9564[_0x13b84c(0x364)]()):this[_0x13b84c(0x1eb)]());},Window_Message['prototype']['stretchDimmerSprite']=function(){const _0x1f2539=_0x2032d4;this[_0x1f2539(0x1c9)]['x']=Math['round'](this[_0x1f2539(0xc6)]/0x2),this[_0x1f2539(0x1c9)][_0x1f2539(0x1cd)]['x']=0.5,this['_dimmerSprite'][_0x1f2539(0x310)]['x']=Graphics['width'];},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x17e)]=Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x14d)],Window_Message['prototype'][_0x2032d4(0x14d)]=function(){const _0x22dc65=_0x2032d4;VisuMZ[_0x22dc65(0xdb)][_0x22dc65(0x17e)][_0x22dc65(0xa5)](this),this['clearActorNameAutoColor'](),this['resetWordWrap'](),this[_0x22dc65(0x1ba)](![]),this[_0x22dc65(0x34f)](_0x22dc65(0x186)),this[_0x22dc65(0x298)](VisuMZ[_0x22dc65(0xdb)]['Settings']['General']['MessageTextDelay']);},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x296)]=function(){const _0x3d9e6e=_0x2032d4;this[_0x3d9e6e(0x32c)]($gameSystem[_0x3d9e6e(0x15d)]());},Window_Message['prototype'][_0x2032d4(0xdc)]=function(){return!![];},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x298)]=function(_0x3dabd8){const _0x11a0d0=_0x2032d4,_0x5c6d45=0xb-ConfigManager[_0x11a0d0(0x113)];_0x3dabd8=Math['round'](_0x3dabd8*_0x5c6d45),this[_0x11a0d0(0x32e)]=_0x3dabd8,this[_0x11a0d0(0x285)]=_0x3dabd8;},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x353)]=Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x72)],Window_Message['prototype'][_0x2032d4(0x72)]=function(){const _0x2daa97=_0x2032d4;return VisuMZ[_0x2daa97(0xdb)][_0x2daa97(0x353)][_0x2daa97(0xa5)](this)||Input[_0x2daa97(0x23f)](VisuMZ['MessageCore'][_0x2daa97(0x242)][_0x2daa97(0x29c)][_0x2daa97(0x196)]);},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x1df)]=Window_Message['prototype'][_0x2032d4(0x348)],Window_Message[_0x2032d4(0x2ae)]['updatePlacement']=function(){const _0x5b6e83=_0x2032d4;let _0x4f1b86=this['y'];this['x']=Math[_0x5b6e83(0x224)]((Graphics[_0x5b6e83(0x2d9)]-this['width'])/0x2),VisuMZ[_0x5b6e83(0xdb)][_0x5b6e83(0x1df)]['call'](this);if(this[_0x5b6e83(0x330)])this['y']=_0x4f1b86;this['updateXyOffsets'](),this[_0x5b6e83(0xd7)](),this[_0x5b6e83(0x2c5)]();},VisuMZ[_0x2032d4(0xdb)]['Window_Message_newPage']=Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x33f)],Window_Message['prototype'][_0x2032d4(0x33f)]=function(_0x21fea1){const _0x2d005f=_0x2032d4;this[_0x2d005f(0x2fb)](_0x21fea1),this[_0x2d005f(0x325)](_0x21fea1),VisuMZ['MessageCore'][_0x2d005f(0x191)][_0x2d005f(0xa5)](this,_0x21fea1),this[_0x2d005f(0x329)]();},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x2fb)]=function(_0x25c3e3){const _0x4543e0=_0x2032d4;if(!_0x25c3e3)return;this[_0x4543e0(0x289)]=![],_0x25c3e3[_0x4543e0(0x202)]=this[_0x4543e0(0x1bc)](_0x25c3e3[_0x4543e0(0x202)]),this[_0x4543e0(0xa6)]&&(_0x25c3e3['text']=this[_0x4543e0(0x159)](_0x25c3e3['text']),this['_macroBypassWordWrap']=!![]);},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x159)]=function(_0x315d19){const _0xf29795=_0x2032d4;if(this['_macroBypassWordWrap'])return _0x315d19;return Window_Base[_0xf29795(0x2ae)][_0xf29795(0x159)][_0xf29795(0xa5)](this,_0x315d19);},Window_Message[_0x2032d4(0x2ae)]['onNewPageMessageCore']=function(_0x16477a){const _0x48e869=_0x2032d4;this['prepareForcedPositionEscapeCharacters'](_0x16477a),this['prepareAutoSizeEscapeCharacters'](_0x16477a),this[_0x48e869(0x169)]();},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x206)]=Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x2cd)],Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x2cd)]=function(){const _0x25cb11=_0x2032d4;VisuMZ[_0x25cb11(0xdb)][_0x25cb11(0x206)][_0x25cb11(0xa5)](this),this[_0x25cb11(0x14d)]();if(this[_0x25cb11(0x1bf)])this[_0x25cb11(0x11e)]();},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x169)]=function(){const _0x522ea9=_0x2032d4;this[_0x522ea9(0xc6)]=$gameSystem[_0x522ea9(0x2fa)]()+this[_0x522ea9(0xf8)]();;this[_0x522ea9(0xc6)]=Math[_0x522ea9(0x213)](Graphics[_0x522ea9(0xc6)],this[_0x522ea9(0xc6)]);const _0x51138b=$gameSystem[_0x522ea9(0x92)]();this['height']=SceneManager['_scene'][_0x522ea9(0x2c2)](_0x51138b,![])+this[_0x522ea9(0x1de)](),this[_0x522ea9(0x1e6)]=Math['min'](Graphics['height'],this[_0x522ea9(0x1e6)]);if($gameTemp['_centerMessageWindow'])this[_0x522ea9(0x2d5)]();},Window_Message[_0x2032d4(0x2ae)]['addedWidth']=function(){return 0x0;},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x1de)]=function(){return 0x0;},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x2d5)]=function(){const _0x4dc80e=_0x2032d4;this['x']=(Graphics[_0x4dc80e(0x2d9)]-this['width'])/0x2,$gameTemp[_0x4dc80e(0x21d)]=undefined,this['clampPlacementPosition']();},Window_Message[_0x2032d4(0x2ae)]['updateMove']=function(){const _0x594a7c=_0x2032d4,_0x5d2517={'x':this['x'],'y':this['y']};Window_Base['prototype']['updateMove'][_0x594a7c(0xa5)](this),this[_0x594a7c(0xc3)](_0x5d2517);},Window_Message[_0x2032d4(0x2ae)]['canMove']=function(){return!![];},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0xc3)]=function(_0x2fd153){const _0x37c937=_0x2032d4;this[_0x37c937(0x19c)]&&(this[_0x37c937(0x19c)]['x']+=this['x']-_0x2fd153['x'],this[_0x37c937(0x19c)]['y']+=this['y']-_0x2fd153['y']);},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0xed)]=function(_0x3032fc,_0x493610){const _0x34ee69=_0x2032d4;this[_0x34ee69(0x342)](this[_0x34ee69(0x281)]['x'],this[_0x34ee69(0x12b)]*(Graphics[_0x34ee69(0x20c)]-this['height'])/0x2,this[_0x34ee69(0x281)][_0x34ee69(0xc6)],this[_0x34ee69(0x281)][_0x34ee69(0x1e6)],_0x3032fc,_0x493610);},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0xfd)]=function(_0x32f196){const _0x3d3f2c=_0x2032d4,_0x550167=Window_Base['prototype'][_0x3d3f2c(0xfd)][_0x3d3f2c(0xa5)](this,_0x32f196);if(_0x32f196[_0x3d3f2c(0x300)]){if('SaTwu'===_0x3d3f2c(0x1a8))this[_0x3d3f2c(0x26f)](_0x550167);else{!_0x265c71&&(this[_0x3d3f2c(0xc6)]=_0xf31d74[_0x3d3f2c(0x213)](this[_0x3d3f2c(0xc6)],_0x57d0a0[_0x3d3f2c(0xc6)]),this[_0x3d3f2c(0x1e6)]=_0x553cf6[_0x3d3f2c(0x213)](this[_0x3d3f2c(0x1e6)],_0x4e1f4f['height']));if(!_0x3f8482){const _0x47f8ee=-(_0x2e2f93['floor'](_0xcf0cb5[_0x3d3f2c(0xc6)]-_0x1afb56['boxWidth'])/0x2),_0xb0bafc=_0x47f8ee+_0x4de57a[_0x3d3f2c(0xc6)]-this[_0x3d3f2c(0xc6)],_0x273ee2=-(_0x2067fb[_0x3d3f2c(0x309)](_0x7a774f[_0x3d3f2c(0x1e6)]-_0x30de5b[_0x3d3f2c(0x20c)])/0x2),_0x83eb82=_0x273ee2+_0x3400b8['height']-this[_0x3d3f2c(0x1e6)];this['x']=this['x'][_0x3d3f2c(0x245)](_0x47f8ee,_0xb0bafc),this['y']=this['y'][_0x3d3f2c(0x245)](_0x273ee2,_0x83eb82);}}}},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x26f)]=function(_0x47852e){const _0x59cea1=_0x2032d4;if($gameParty[_0x59cea1(0x192)]()){}else $gameMap[_0x59cea1(0x350)](_0x47852e);},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x95)]=function(_0x414e44){const _0x4f9251=_0x2032d4;this[_0x4f9251(0x32e)]--,this[_0x4f9251(0x32e)]<=0x0&&(this[_0x4f9251(0x25d)](_0x414e44),Window_Base[_0x4f9251(0x2ae)][_0x4f9251(0x95)][_0x4f9251(0xa5)](this,_0x414e44));},Window_Message['prototype'][_0x2032d4(0x25d)]=function(_0x548b43){const _0x26b786=_0x2032d4;this[_0x26b786(0x32e)]=this[_0x26b786(0x285)];if(this[_0x26b786(0x285)]<=0x0)this[_0x26b786(0x151)]=!![];},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x262)]=Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x180)],Window_Message[_0x2032d4(0x2ae)]['processEscapeCharacter']=function(_0x25de6,_0x57b33b){const _0x5de1c=_0x2032d4;!_0x57b33b[_0x5de1c(0x300)]?Window_Base[_0x5de1c(0x2ae)][_0x5de1c(0x180)][_0x5de1c(0xa5)](this,_0x25de6,_0x57b33b):VisuMZ[_0x5de1c(0xdb)]['Window_Message_processEscapeCharacter']['call'](this,_0x25de6,_0x57b33b);},VisuMZ['MessageCore'][_0x2032d4(0x280)]=Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x6e)],Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x6e)]=function(_0x3e52d2){const _0x2f840b=_0x2032d4;if(this[_0x2f840b(0xff)])return![];return VisuMZ[_0x2f840b(0xdb)][_0x2f840b(0x280)][_0x2f840b(0xa5)](this,_0x3e52d2);},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0xcd)]=function(_0x6cc862){const _0x124f52=_0x2032d4;let _0x4d4819=_0x6cc862[_0x124f52(0x202)];this[_0x124f52(0x2e9)]={};if(this[_0x124f52(0x80)]())return _0x4d4819;_0x4d4819=_0x4d4819[_0x124f52(0x31d)](/<POSITION:[ ]*(.*)>/gi,(_0x3dda42,_0x3400df)=>{const _0x1eeb7f=_0x124f52;if(_0x1eeb7f(0x2e8)!==_0x1eeb7f(0x2e8))_0x1757b8['x']+=_0x4b7383[_0x1eeb7f(0xf4)];else{const _0x5bf38f=_0x3400df[_0x1eeb7f(0x321)](',')[_0x1eeb7f(0xae)](_0x755ea8=>Number(_0x755ea8)||0x0);if(_0x5bf38f[0x0]!==undefined)this[_0x1eeb7f(0x2e9)]['x']=Number(_0x5bf38f[0x0]);if(_0x5bf38f[0x1]!==undefined)this[_0x1eeb7f(0x2e9)]['y']=Number(_0x5bf38f[0x1]);if(_0x5bf38f[0x2]!==undefined)this[_0x1eeb7f(0x2e9)][_0x1eeb7f(0xc6)]=Number(_0x5bf38f[0x2]);if(_0x5bf38f[0x3]!==undefined)this[_0x1eeb7f(0x2e9)][_0x1eeb7f(0x1e6)]=Number(_0x5bf38f[0x3]);return'';}}),_0x4d4819=_0x4d4819[_0x124f52(0x31d)](/<COORDINATES:[ ]*(.*)>/gi,(_0x2ef081,_0x42677c)=>{const _0x342821=_0x124f52,_0x376ec8=_0x42677c[_0x342821(0x321)](',')[_0x342821(0xae)](_0x311c44=>Number(_0x311c44)||0x0);if(_0x376ec8[0x0]!==undefined)this['_forcedPosition']['x']=Number(_0x376ec8[0x0]);if(_0x376ec8[0x1]!==undefined)this[_0x342821(0x2e9)]['y']=Number(_0x376ec8[0x1]);return'';}),_0x4d4819=_0x4d4819[_0x124f52(0x31d)](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x4b5f70,_0x1f5665)=>{const _0x482ff9=_0x124f52;if(_0x482ff9(0x2fc)!==_0x482ff9(0x147)){const _0x161289=_0x1f5665[_0x482ff9(0x321)](',')[_0x482ff9(0xae)](_0x3eac43=>Number(_0x3eac43)||0x0);if(_0x161289[0x0]!==undefined)this[_0x482ff9(0x2e9)][_0x482ff9(0xc6)]=Number(_0x161289[0x2]);if(_0x161289[0x1]!==undefined)this[_0x482ff9(0x2e9)][_0x482ff9(0x1e6)]=Number(_0x161289[0x3]);return'';}else{let _0x359b03=this[_0x482ff9(0xb3)]['indexOf'](_0x59cced);this['requestPictureTextRefresh'](_0x359b03);}}),_0x4d4819=_0x4d4819[_0x124f52(0x31d)](/<OFFSET:[ ]*(.*)>/gi,(_0xf01ce4,_0x1f1f2c)=>{const _0x56935a=_0x124f52,_0x596b16=_0x1f1f2c['split'](',')[_0x56935a(0xae)](_0xfcb24b=>Number(_0xfcb24b)||0x0);let _0x7e146=_0x596b16[0x0]||0x0,_0x1818aa=_0x596b16[0x1]||0x0;return $gameSystem[_0x56935a(0x1d9)](_0x7e146,_0x1818aa),'';}),_0x6cc862[_0x124f52(0x202)]=_0x4d4819;},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x17c)]=function(){const _0x44b1d3=$gameSystem['getMessageWindowXyOffsets']();this['x']+=_0x44b1d3['x'],this['y']+=_0x44b1d3['y'];},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0xd7)]=function(){const _0xdebdf=_0x2032d4;this[_0xdebdf(0x2e9)]=this[_0xdebdf(0x2e9)]||{};const _0x49ee74=['x','y',_0xdebdf(0xc6),'height'];for(const _0x1b182d of _0x49ee74){this[_0xdebdf(0x2e9)][_0x1b182d]!==undefined&&(this[_0x1b182d]=Number(this[_0xdebdf(0x2e9)][_0x1b182d]));}},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0xee)]=function(_0x23c616){const _0x2edba4=_0x2032d4;this['_currentAutoSize']=![];let _0x557eb5=_0x23c616['text'];_0x557eb5=_0x557eb5[_0x2edba4(0x31d)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x3acc94=_0x2edba4;return _0x3acc94(0x239)===_0x3acc94(0x352)?(_0xa65c13=_0x5acaac['replace'](/<LEFT>/gi,_0x3acc94(0x8b)),_0x2446bb=_0x2bcdf3[_0x3acc94(0x31d)](/<\/LEFT>/gi,_0x3acc94(0x13f)),_0x2cb2c4=_0x2fe6f1[_0x3acc94(0x31d)](/<CENTER>/gi,_0x3acc94(0x9d)),_0x255be7=_0x444433[_0x3acc94(0x31d)](/<\/CENTER>/gi,_0x3acc94(0x13f)),_0x11d876=_0x153258[_0x3acc94(0x31d)](/<RIGHT>/gi,_0x3acc94(0x271)),_0x371ade=_0x519ead[_0x3acc94(0x31d)](/<\/RIGHT>/gi,_0x3acc94(0x13f)),_0xa08a0b):(this[_0x3acc94(0xab)](_0x557eb5,!![],!![]),this[_0x3acc94(0x358)]('none'),'');}),_0x557eb5=_0x557eb5[_0x2edba4(0x31d)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x46392a=_0x2edba4;return this[_0x46392a(0xab)](_0x557eb5,!![],![]),this[_0x46392a(0x358)](_0x46392a(0x218)),'';}),_0x557eb5=_0x557eb5[_0x2edba4(0x31d)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x2b6a87=_0x2edba4;if(_0x2b6a87(0x27f)!==_0x2b6a87(0x27f))!_0x37061c[_0x2b6a87(0x300)]?_0x40652f['prototype']['processEscapeCharacter'][_0x2b6a87(0xa5)](this,_0x1abe10,_0xcb9b6b):_0x346ea0[_0x2b6a87(0xdb)][_0x2b6a87(0x262)]['call'](this,_0x16a49e,_0x2a9f57);else return this[_0x2b6a87(0xab)](_0x557eb5,![],!![]),this[_0x2b6a87(0x358)]('none'),'';});if(SceneManager[_0x2edba4(0x102)]()){if(_0x2edba4(0x2bf)===_0x2edba4(0x2bf))_0x557eb5=_0x557eb5['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x37e114,_0x4daeb4)=>{const _0x576e17=_0x2edba4;return this[_0x576e17(0xab)](_0x557eb5,!![],!![]),this['processAutoPosition'](_0x576e17(0x198),Number(_0x4daeb4)||0x1),'';}),_0x557eb5=_0x557eb5[_0x2edba4(0x31d)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0xecf3fe,_0x2a320c)=>{const _0x5bea1c=_0x2edba4;return this[_0x5bea1c(0xab)](_0x557eb5,!![],!![]),this[_0x5bea1c(0x358)]('battle\x20party',Number(_0x2a320c)||0x0),'';}),_0x557eb5=_0x557eb5['replace'](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x450f15,_0x168747)=>{const _0x48568d=_0x2edba4;return this[_0x48568d(0xab)](_0x557eb5,!![],!![]),this[_0x48568d(0x358)](_0x48568d(0x269),Number(_0x168747)||0x0),'';});else{_0x1613d5['ConvertParams'](_0x375865,_0x4e5421);const _0x4877d6=_0x376176[_0x2edba4(0x1f8)]||[];for(const _0x371619 of _0x4877d6){_0x37f050[_0x2edba4(0x36c)](_0x371619),_0x3847f1['erasePictureTextBuffer'](_0x371619);}}}else{if(SceneManager[_0x2edba4(0x32b)]()){if('IHiXR'!==_0x2edba4(0x22b))_0x557eb5=_0x557eb5[_0x2edba4(0x31d)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x1c9883,_0x1a0e83)=>{const _0x7a99cf=_0x2edba4;return'dxyzE'===_0x7a99cf(0x292)?(this[_0x7a99cf(0xab)](_0x5a7b42,!![],![]),this[_0x7a99cf(0x358)](_0x7a99cf(0x218)),''):(this[_0x7a99cf(0xab)](_0x557eb5,!![],!![]),this[_0x7a99cf(0x358)](_0x7a99cf(0x247),0x0),'');}),_0x557eb5=_0x557eb5[_0x2edba4(0x31d)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x263552,_0x3f438b)=>{const _0x3a8a3c=_0x2edba4;if(_0x3a8a3c(0x1c0)!=='QQAoU')return this[_0x3a8a3c(0xab)](_0x557eb5,!![],!![]),this[_0x3a8a3c(0x358)](_0x3a8a3c(0x133),Number(_0x3f438b)||0x1),'';else this[_0x3a8a3c(0x19c)]&&(this[_0x3a8a3c(0x19c)]['x']+=this['x']-_0x537cfc['x'],this[_0x3a8a3c(0x19c)]['y']+=this['y']-_0xf8a0f['y']);}),_0x557eb5=_0x557eb5[_0x2edba4(0x31d)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x5f4e95,_0xaa3de9)=>{const _0x1abb95=_0x2edba4;return _0x1abb95(0xeb)!==_0x1abb95(0x266)?(this[_0x1abb95(0xab)](_0x557eb5,!![],!![]),this['processAutoPosition'](_0x1abb95(0x1b3),Number(_0xaa3de9)||0x0),''):(this[_0x1abb95(0xab)](_0xe3f242,!![],!![]),this[_0x1abb95(0x358)](_0x1abb95(0x269),_0x491b58(_0x1d00c5)||0x0),'');}),_0x557eb5=_0x557eb5[_0x2edba4(0x31d)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x226452,_0x5e5591)=>{const _0x395e8c=_0x2edba4;return this[_0x395e8c(0xab)](_0x557eb5,!![],!![]),this[_0x395e8c(0x358)]('map\x20event',Number(_0x5e5591)||0x0),'';});else{_0x446d01[_0x2edba4(0x1c8)](_0x2b7502,_0x368a0f);const _0x245289=_0x302f2c[_0x2edba4(0xa2)]||_0x571eff['getChoiceListLineHeight']()||0x1,_0x38ff95=_0x347e8c[_0x2edba4(0x118)]||_0x5d5ee6[_0x2edba4(0x24b)]()||0x1,_0x1cbdfb=_0x56ed50[_0x2edba4(0x24a)]||_0x5d91c9[_0x2edba4(0x23d)]()||0x1,_0x2f8866=_0x5e1cb0[_0x2edba4(0x305)][_0x2edba4(0x277)]()||_0x2edba4(0x186);_0xc27d58[_0x2edba4(0x312)](_0x245289),_0x1a5d7e['setChoiceListMaxRows'](_0x38ff95),_0x57a8a9['setChoiceListMaxColumns'](_0x1cbdfb),_0x2f6ffe[_0x2edba4(0x9a)](_0x2f8866);}}}_0x23c616[_0x2edba4(0x202)]=_0x557eb5;},Window_Message[_0x2032d4(0x307)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x2032d4(0x10c)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0xab)]=function(_0x4d7ae7,_0x33b80f,_0x166341){const _0x429f09=_0x2032d4;_0x4d7ae7=_0x4d7ae7['replace'](Window_Message[_0x429f09(0x307)],''),_0x4d7ae7=_0x4d7ae7[_0x429f09(0x31d)](Window_Message[_0x429f09(0x10c)],''),this[_0x429f09(0xc1)]=!![],this[_0x429f09(0xff)]=!![],this[_0x429f09(0x32c)](![]);const _0x4095b7=this[_0x429f09(0xda)](_0x4d7ae7);if(_0x33b80f){let _0x25509a=_0x4095b7['width']+$gameSystem[_0x429f09(0x1a0)]()*0x2+0x6;const _0x3da855=$gameMessage[_0x429f09(0x1ed)]()!=='',_0x1d3687=ImageManager[_0x429f09(0x10f)],_0x42d0db=0x14;_0x25509a+=_0x3da855?_0x1d3687+_0x42d0db:0x4;if(_0x25509a%0x2!==0x0)_0x25509a+=0x1;$gameSystem[_0x429f09(0x2b6)](_0x25509a);}if(_0x166341){if(_0x429f09(0x164)===_0x429f09(0x164)){let _0x33e8f2=Math[_0x429f09(0x331)](_0x4095b7[_0x429f09(0x1e6)]/this[_0x429f09(0x31b)]());$gameSystem[_0x429f09(0x76)](_0x33e8f2);}else{const _0x5c57e0=_0x164f23[_0x429f09(0x181)]();if(_0x5c57e0['id']<=0x0)return'';return _0x5c57e0['quantity'];}}this[_0x429f09(0x2d8)](),this[_0x429f09(0x304)](),this[_0x429f09(0xc1)]=![],this[_0x429f09(0x1bf)]=!![];},Window_Message['prototype'][_0x2032d4(0x2d8)]=function(){const _0x300fa5=_0x2032d4;this[_0x300fa5(0x169)](),this['updatePlacement'](),this[_0x300fa5(0x2d5)](),this['updateTransform'](),this[_0x300fa5(0x33e)]['clear'](),this[_0x300fa5(0x329)]();},Window_Message['prototype'][_0x2032d4(0x358)]=function(_0x854441,_0x24c598){const _0xc073eb=_0x2032d4;switch(_0x854441[_0xc073eb(0x277)]()[_0xc073eb(0x1f4)]()){case _0xc073eb(0x198):this[_0xc073eb(0x330)]=$gameActors[_0xc073eb(0x13d)](_0x24c598);break;case'battle\x20party':this[_0xc073eb(0x330)]=$gameParty[_0xc073eb(0x16f)]()[_0x24c598-0x1];break;case'battle\x20enemy':this[_0xc073eb(0x330)]=$gameTroop['members']()[_0x24c598-0x1];break;case _0xc073eb(0x247):this[_0xc073eb(0x330)]=$gamePlayer;break;case _0xc073eb(0x133):const _0x5c768a=$gameActors[_0xc073eb(0x13d)](_0x24c598)[_0xc073eb(0xb8)]();_0x5c768a===0x0?this[_0xc073eb(0x330)]=$gamePlayer:this[_0xc073eb(0x330)]=$gamePlayer['followers']()[_0xc073eb(0x2bd)](_0x5c768a-0x1);break;case _0xc073eb(0x1b3):_0x24c598===0x1?this['_autoPositionTarget']=$gamePlayer:this[_0xc073eb(0x330)]=$gamePlayer[_0xc073eb(0x1f3)]()[_0xc073eb(0x2bd)](_0x24c598-0x2);break;case _0xc073eb(0x2e7):this['_autoPositionTarget']=$gameMap[_0xc073eb(0x360)](_0x24c598);break;}this[_0xc073eb(0x330)]&&(_0xc073eb(0xb1)!==_0xc073eb(0x150)?this[_0xc073eb(0x17b)]():(this['_messagePositionReset']=![],this[_0xc073eb(0x330)]=_0x218f84,_0x1d5ae7['initMessageCore'](),this[_0xc073eb(0x2d8)](),this['openness']=0x0));},VisuMZ['MessageCore'][_0x2032d4(0x317)]=Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x27e)],Window_Message[_0x2032d4(0x2ae)]['synchronizeNameBox']=function(){const _0x56cf7c=_0x2032d4;this[_0x56cf7c(0x17b)](),VisuMZ[_0x56cf7c(0xdb)][_0x56cf7c(0x317)][_0x56cf7c(0xa5)](this);},Window_Message['prototype'][_0x2032d4(0x17b)]=function(){const _0x1afe6d=_0x2032d4;if(!this[_0x1afe6d(0x330)])return;const _0x8db50=SceneManager[_0x1afe6d(0x276)];if(!_0x8db50)return;if(!_0x8db50[_0x1afe6d(0x1db)])return;const _0x271049=_0x8db50[_0x1afe6d(0x1db)][_0x1afe6d(0x96)](this[_0x1afe6d(0x330)]);if(!_0x271049)return;let _0x38049d=_0x271049['x'];_0x38049d-=this[_0x1afe6d(0xc6)]/0x2,_0x38049d-=(Graphics[_0x1afe6d(0xc6)]-Graphics[_0x1afe6d(0x2d9)])/0x2,_0x38049d+=this[_0x1afe6d(0x333)]();let _0x23a190=_0x271049['y'];_0x23a190-=this[_0x1afe6d(0x1e6)],_0x23a190-=(Graphics[_0x1afe6d(0x1e6)]-Graphics[_0x1afe6d(0x20c)])/0x2,_0x23a190+=this['autoPositionOffsetY'](),_0x23a190-=_0x271049[_0x1afe6d(0x1e6)]+0x8;const _0x2bd9b2=$gameSystem['getMessageWindowXyOffsets']();_0x38049d+=_0x2bd9b2['x'],_0x23a190+=_0x2bd9b2['y'],this['x']=Math[_0x1afe6d(0x224)](_0x38049d),this['y']=Math[_0x1afe6d(0x224)](_0x23a190),this[_0x1afe6d(0x2c5)](!![],![]),this[_0x1afe6d(0x2e9)]=this[_0x1afe6d(0x2e9)]||{},this[_0x1afe6d(0x2e9)]['x']=this['x'],this[_0x1afe6d(0x2e9)]['y']=this['y'],this['_forcedPosition'][_0x1afe6d(0xc6)]=this[_0x1afe6d(0xc6)],this[_0x1afe6d(0x2e9)][_0x1afe6d(0x1e6)]=this['height'],this[_0x1afe6d(0x19c)][_0x1afe6d(0x348)]();},Window_Message[_0x2032d4(0x2ae)]['autoPositionOffsetX']=function(){return 0x0;},Window_Message['prototype']['autoPositionOffsetY']=function(){return 0x0;},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x11e)]=function(){const _0x3bd0e8=_0x2032d4;this[_0x3bd0e8(0x1bf)]=![],this[_0x3bd0e8(0x330)]=undefined,$gameSystem[_0x3bd0e8(0x356)](),this[_0x3bd0e8(0x2d8)](),this[_0x3bd0e8(0x2f5)]=0x0;},Window_Message['prototype']['preConvertEscapeCharacters']=function(_0x8107ba){const _0x502f96=_0x2032d4;return Window_Base[_0x502f96(0x2ae)]['preConvertEscapeCharacters'][_0x502f96(0xa5)](this,_0x8107ba);},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x16c)]=function(_0x45b522){const _0x2b84ef=_0x2032d4;return Window_Base[_0x2b84ef(0x2ae)][_0x2b84ef(0x16c)][_0x2b84ef(0xa5)](this,_0x45b522);},Window_Message[_0x2032d4(0x2ae)]['flushTextState']=function(_0x55578a){const _0x1ae140=_0x2032d4;this[_0x1ae140(0x33b)](_0x55578a),Window_Base['prototype'][_0x1ae140(0x23c)][_0x1ae140(0xa5)](this,_0x55578a),this['postFlushTextState'](_0x55578a);},Window_Message[_0x2032d4(0x2ae)][_0x2032d4(0x33b)]=function(_0x1b1134){},Window_Message[_0x2032d4(0x2ae)]['postFlushTextState']=function(_0x3fc370){},Window_NameBox[_0x2032d4(0x2ae)][_0x2032d4(0xdc)]=function(){return![];},Window_NameBox[_0x2032d4(0x2ae)][_0x2032d4(0x34c)]=function(){const _0x259661=_0x2032d4;Window_Base[_0x259661(0x2ae)][_0x259661(0x34c)][_0x259661(0xa5)](this),this[_0x259661(0x143)](this[_0x259661(0x320)]());},Window_NameBox['prototype'][_0x2032d4(0x320)]=function(){const _0x2343a3=_0x2032d4,_0x1339ce=VisuMZ[_0x2343a3(0xdb)][_0x2343a3(0x242)][_0x2343a3(0x29c)][_0x2343a3(0x36a)];return ColorManager[_0x2343a3(0x1b2)](_0x1339ce);},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x351)]=Window_NameBox[_0x2032d4(0x2ae)][_0x2032d4(0x348)],Window_NameBox[_0x2032d4(0x2ae)][_0x2032d4(0x348)]=function(){const _0x40e657=_0x2032d4;VisuMZ[_0x40e657(0xdb)][_0x40e657(0x351)][_0x40e657(0xa5)](this),this[_0x40e657(0x131)](),this[_0x40e657(0x90)](),this['clampPlacementPosition'](),this['updateOverlappingY']();},Window_NameBox[_0x2032d4(0x2ae)][_0x2032d4(0x1f2)]=function(_0x2c64c8){const _0x2dab66=_0x2032d4;return _0x2c64c8=_0x2c64c8[_0x2dab66(0x31d)](/<LEFT>/gi,this[_0x2dab66(0x9b)][_0x2dab66(0x241)](this,0x0)),_0x2c64c8=_0x2c64c8[_0x2dab66(0x31d)](/<CENTER>/gi,this['setRelativePosition'][_0x2dab66(0x241)](this,0x5)),_0x2c64c8=_0x2c64c8[_0x2dab66(0x31d)](/<RIGHT>/gi,this[_0x2dab66(0x9b)][_0x2dab66(0x241)](this,0xa)),_0x2c64c8=_0x2c64c8[_0x2dab66(0x31d)](/<POSITION:[ ](\d+)>/gi,(_0x395976,_0x430b69)=>this[_0x2dab66(0x9b)](parseInt(_0x430b69))),_0x2c64c8=_0x2c64c8[_0x2dab66(0x31d)](/<\/LEFT>/gi,''),_0x2c64c8=_0x2c64c8['replace'](/<\/CENTER>/gi,''),_0x2c64c8=_0x2c64c8[_0x2dab66(0x31d)](/<\/RIGHT>/gi,''),Window_Base['prototype'][_0x2dab66(0x1f2)][_0x2dab66(0xa5)](this,_0x2c64c8);},Window_NameBox[_0x2032d4(0x2ae)][_0x2032d4(0x9b)]=function(_0x53adf3){return this['_relativePosition']=_0x53adf3,'';},Window_NameBox[_0x2032d4(0x2ae)][_0x2032d4(0x131)]=function(){const _0x12f921=_0x2032d4;if($gameMessage[_0x12f921(0x2ad)]())return;this[_0x12f921(0x2c0)]=this['_relativePosition']||0x0;const _0x57b0a3=this[_0x12f921(0x22d)],_0x3db900=Math[_0x12f921(0x309)](_0x57b0a3[_0x12f921(0xc6)]*this[_0x12f921(0x2c0)]/0xa);this['x']=_0x57b0a3['x']+_0x3db900-Math['floor'](this[_0x12f921(0xc6)]/0x2),this['x']=this['x'][_0x12f921(0x245)](_0x57b0a3['x'],_0x57b0a3['x']+_0x57b0a3[_0x12f921(0xc6)]-this[_0x12f921(0xc6)]);},Window_NameBox[_0x2032d4(0x2ae)][_0x2032d4(0x90)]=function(){const _0x28da29=_0x2032d4;if($gameMessage['isRTL']())return;this[_0x28da29(0x2c0)]=this[_0x28da29(0x2c0)]||0x0;const _0x23b91f=VisuMZ[_0x28da29(0xdb)][_0x28da29(0x242)][_0x28da29(0x29c)][_0x28da29(0x8a)],_0xe4ab41=VisuMZ[_0x28da29(0xdb)][_0x28da29(0x242)][_0x28da29(0x29c)]['NameBoxWindowOffsetY'],_0x5d9dcb=(0x5-this[_0x28da29(0x2c0)])/0x5;this['x']+=Math['floor'](_0x23b91f*_0x5d9dcb),this['y']+=_0xe4ab41;},Window_NameBox[_0x2032d4(0x2ae)]['updateOverlappingY']=function(){const _0x3c6c78=_0x2032d4,_0x246cba=this[_0x3c6c78(0x22d)],_0x12eb2a=_0x246cba['y'],_0x2d5fbb=VisuMZ[_0x3c6c78(0xdb)][_0x3c6c78(0x242)]['General'][_0x3c6c78(0x1c5)];_0x12eb2a>this['y']&&_0x12eb2a<this['y']+this[_0x3c6c78(0x1e6)]-_0x2d5fbb&&('kPfMZ'!==_0x3c6c78(0x105)?_0x3b36bd[_0x3c6c78(0x33c)](_0x43d18f(_0x456489)):this['y']=_0x246cba['y']+_0x246cba[_0x3c6c78(0x1e6)]);},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x232)]=Window_NameBox[_0x2032d4(0x2ae)]['refresh'],Window_NameBox[_0x2032d4(0x2ae)]['refresh']=function(){const _0x1d3af9=_0x2032d4;this[_0x1d3af9(0x2c0)]=0x0,VisuMZ[_0x1d3af9(0xdb)]['Window_NameBox_refresh']['call'](this);},Window_ChoiceList[_0x2032d4(0x2ae)]['isWordWrapEnabled']=function(){return![];},Window_ChoiceList['prototype']['isAutoColorAffected']=function(){return!![];},Window_ChoiceList[_0x2032d4(0x2ae)][_0x2032d4(0x2ee)]=function(){const _0x1f614c=_0x2032d4;return $gameSystem[_0x1f614c(0x1da)]()+0x8;},Window_ChoiceList[_0x2032d4(0x2ae)][_0x2032d4(0x338)]=function(){return $gameSystem['getChoiceListMaxColumns']();},Window_ChoiceList['prototype']['start']=function(){const _0x1c3ca7=_0x2032d4;this['refresh'](),this['selectDefault'](),this[_0x1c3ca7(0x243)](),this['activate']();},Window_ChoiceList['prototype'][_0x2032d4(0x2cb)]=function(){const _0x2cd718=_0x2032d4;this[_0x2cd718(0x1a5)](),this['makeCommandList'](),this[_0x2cd718(0x22d)]&&(this[_0x2cd718(0x348)](),this[_0x2cd718(0x34e)]()),this['createContents'](),this['updateBackground'](),this[_0x2cd718(0x199)](),Window_Selectable['prototype'][_0x2cd718(0x2cb)][_0x2cd718(0xa5)](this);},Window_ChoiceList[_0x2032d4(0x2ae)][_0x2032d4(0x2a8)]=function(){const _0x294d23=_0x2032d4,_0x5c9cce=$gameMessage[_0x294d23(0x231)]();let _0x7da330=0x0;for(let _0x327bd1 of _0x5c9cce){if(_0x294d23(0x24d)===_0x294d23(0x24d)){_0x327bd1=this[_0x294d23(0x293)](_0x327bd1);if(this['isChoiceVisible'](_0x327bd1)){const _0x2d769f=this[_0x294d23(0x318)](_0x327bd1),_0x10dbeb=this[_0x294d23(0xa7)](_0x327bd1);this['addCommand'](_0x2d769f,_0x294d23(0x10a),_0x10dbeb,_0x7da330);}_0x7da330++;}else{const _0x183718=(this['maxChoiceWidth']()+this[_0x294d23(0x2c1)]())*this['maxCols']()+this['padding']*0x2;return _0x20fe69[_0x294d23(0x213)](_0x183718,_0x2a131d[_0x294d23(0xc6)]);}}},Window_ChoiceList[_0x2032d4(0x2ae)][_0x2032d4(0x293)]=function(_0x450e4a){const _0x3e65e1=_0x2032d4;return Window_Base[_0x3e65e1(0x2ae)][_0x3e65e1(0x1bc)]['call'](this,_0x450e4a);},Window_ChoiceList[_0x2032d4(0x2ae)][_0x2032d4(0x184)]=function(_0x1b4fb8){const _0x4a5132=_0x2032d4;if(Imported[_0x4a5132(0x14f)])$gameMessage[_0x4a5132(0x8d)]();if(_0x1b4fb8[_0x4a5132(0x345)](/<HIDE>/i))return![];if(_0x1b4fb8[_0x4a5132(0x345)](/<SHOW>/i))return!![];if(_0x1b4fb8[_0x4a5132(0x345)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x4299ff=RegExp['$1'][_0x4a5132(0x321)](',')[_0x4a5132(0xae)](_0xa985ef=>Number(_0xa985ef)||0x0);for(const _0xc346ac of _0x4299ff){if('UcIdF'===_0x4a5132(0x2e3)){if(!$gameSwitches[_0x4a5132(0x1e5)](_0xc346ac))return![];}else return!![];}return!![];}if(_0x1b4fb8[_0x4a5132(0x345)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x4a5132(0x2e6)!==_0x4a5132(0x33a)){const _0x1e565a=RegExp['$1'][_0x4a5132(0x321)](',')[_0x4a5132(0xae)](_0x4ddc40=>Number(_0x4ddc40)||0x0);for(const _0xb482f5 of _0x1e565a){if(!$gameSwitches[_0x4a5132(0x1e5)](_0xb482f5))return![];}return!![];}else _0x3c835a=_0x3a3986[_0x4a5132(0x31d)](_0xeb3f0f[_0x4a5132(0x2c4)],_0x5bddce[_0x4a5132(0xe8)]),_0x37a6bf=this['convertVariableEscapeCharacters'](_0x3a78f2);}if(_0x1b4fb8[_0x4a5132(0x345)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x4a5132(0xf7)!==_0x4a5132(0xf7)){const _0x1c6520=this[_0x4a5132(0x238)],_0x41970c=this[_0x4a5132(0x1f7)],_0x5db649=this['calcMoveEasing']((_0x41970c-_0x1c6520)/_0x41970c),_0x584a1f=this[_0x4a5132(0x25b)]((_0x41970c-_0x1c6520+0x1)/_0x41970c),_0x590edd=(_0x426115-_0x3b1ffa*_0x5db649)/(0x1-_0x5db649);return _0x590edd+(_0x1ec676-_0x590edd)*_0x584a1f;}else{const _0x30b4ac=RegExp['$1'][_0x4a5132(0x321)](',')['map'](_0x16ba08=>Number(_0x16ba08)||0x0);for(const _0x289b53 of _0x30b4ac){if(_0x4a5132(0x1e8)!==_0x4a5132(0x346)){if($gameSwitches['value'](_0x289b53))return!![];}else return _0x451bc3;}return![];}}if(_0x1b4fb8['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x4a5132(0x7f)===_0x4a5132(0x7f)){const _0x593a84=RegExp['$1'][_0x4a5132(0x321)](',')[_0x4a5132(0xae)](_0x4fd20e=>Number(_0x4fd20e)||0x0);for(const _0xaf8c4d of _0x593a84){if(!$gameSwitches[_0x4a5132(0x1e5)](_0xaf8c4d))return!![];}return![];}else _0x2206fb[_0x4a5132(0xdb)][_0x4a5132(0x220)][_0x4a5132(0xa5)](this),this[_0x4a5132(0x2ab)]();}if(_0x1b4fb8[_0x4a5132(0x345)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x4a5132(0x26a)===_0x4a5132(0xa0)){const _0x6a70ba=_0x5095aa[_0x4a5132(0xdb)]['Settings'][_0x4a5132(0x29c)],_0x55f0cb=_0x4b5019[_0x4a5132(0xdb)][_0x4a5132(0x242)][_0x4a5132(0x1c4)];this[_0x4a5132(0xf5)]={'messageRows':_0x6a70ba[_0x4a5132(0x212)],'messageWidth':_0x6a70ba[_0x4a5132(0x30d)],'messageWordWrap':_0x55f0cb['MessageWindow'],'helpWordWrap':_0x55f0cb['HelpWindow'],'choiceLineHeight':_0x6a70ba[_0x4a5132(0x2b0)],'choiceRows':_0x6a70ba[_0x4a5132(0x1ab)],'choiceCols':_0x6a70ba['ChoiceWindowMaxCols'],'choiceTextAlign':_0x6a70ba['ChoiceWindowTextAlign']},this[_0x4a5132(0xd8)]===_0x1f888e&&(this[_0x4a5132(0xd8)]=_0x6a70ba['MsgWindowOffsetX'],this[_0x4a5132(0x1c7)]=_0x6a70ba[_0x4a5132(0x216)]);}else{const _0x4c4dc8=RegExp['$1'][_0x4a5132(0x321)](',')['map'](_0x8e8c46=>Number(_0x8e8c46)||0x0);for(const _0x59a622 of _0x4c4dc8){if(_0x4a5132(0x369)!==_0x4a5132(0x369)){const _0xf1831f=_0x49eb20[_0x4a5132(0x181)]();if(_0xf1831f['id']<0x0)return'';let _0x5411ad=null;if(_0xf1831f['type']===0x0)_0x5411ad=_0x3c36b0[_0xf1831f['id']];if(_0xf1831f['type']===0x1)_0x5411ad=_0x4953d6[_0xf1831f['id']];if(_0xf1831f[_0x4a5132(0xba)]===0x2)_0x5411ad=_0x5e2397[_0xf1831f['id']];if(!_0x5411ad)return'';return _0x2a2f05?_0x4a5132(0x15c)['format'](_0x5411ad['iconIndex'],_0x5411ad[_0x4a5132(0x248)]):_0x5411ad[_0x4a5132(0x248)];}else{if(!$gameSwitches[_0x4a5132(0x1e5)](_0x59a622))return!![];}}return![];}}if(_0x1b4fb8['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x27e0ad=RegExp['$1'][_0x4a5132(0x321)](',')['map'](_0x5ad448=>Number(_0x5ad448)||0x0);for(const _0x5e757e of _0x27e0ad){if(_0x4a5132(0x16b)!==_0x4a5132(0x16b)){if(!_0x4d0148[_0x4a5132(0x1e5)](_0x2af26b))return![];}else{if($gameSwitches[_0x4a5132(0x1e5)](_0x5e757e))return![];}}return!![];}return!![];},Window_ChoiceList[_0x2032d4(0x2ae)][_0x2032d4(0x318)]=function(_0x3a7a47){const _0x4a66ea=_0x2032d4;let _0x37d8dc=_0x3a7a47;return _0x37d8dc=_0x37d8dc[_0x4a66ea(0x31d)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x37d8dc=_0x37d8dc['replace'](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x37d8dc;},Window_ChoiceList[_0x2032d4(0x2ae)][_0x2032d4(0xa7)]=function(_0x49d43c){const _0x110ed7=_0x2032d4;if(Imported['VisuMZ_1_EventsMoveCore'])$gameMessage['registerSelfEvent']();if(_0x49d43c[_0x110ed7(0x345)](/<DISABLE>/i))return![];if(_0x49d43c[_0x110ed7(0x345)](/<ENABLE>/i))return!![];if(_0x49d43c[_0x110ed7(0x345)](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x3a0ff1=RegExp['$1']['split'](',')[_0x110ed7(0xae)](_0x5496d7=>Number(_0x5496d7)||0x0);for(const _0x55771e of _0x3a0ff1){if(!$gameSwitches[_0x110ed7(0x1e5)](_0x55771e))return![];}return!![];}if(_0x49d43c['match'](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if('WMfbW'!=='WMfbW'){let _0x35d314=_0x6a75c6[_0x110ed7(0xdb)][_0x110ed7(0x361)][_0x110ed7(0xa5)](this);const _0x20893b=_0x3f5e11[_0x110ed7(0xdb)]['Settings'];if(_0x20893b['TextSpeed'][_0x110ed7(0x275)]&&_0x20893b[_0x110ed7(0x274)]['AdjustRect'])_0x35d314++;return _0x35d314;}else{const _0x2e2c96=RegExp['$1'][_0x110ed7(0x321)](',')[_0x110ed7(0xae)](_0x479207=>Number(_0x479207)||0x0);for(const _0x54bd37 of _0x2e2c96){if(!$gameSwitches[_0x110ed7(0x1e5)](_0x54bd37))return![];}return!![];}}if(_0x49d43c['match'](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x3dffe6=RegExp['$1']['split'](',')[_0x110ed7(0xae)](_0x4648c8=>Number(_0x4648c8)||0x0);for(const _0x5b1a2d of _0x3dffe6){if($gameSwitches['value'](_0x5b1a2d))return!![];}return![];}if(_0x49d43c[_0x110ed7(0x345)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if('fTxki'===_0x110ed7(0x190)){const _0x2ba473=RegExp['$1'][_0x110ed7(0x321)](',')['map'](_0x3e9287=>Number(_0x3e9287)||0x0);for(const _0x49177e of _0x2ba473){if(!$gameSwitches[_0x110ed7(0x1e5)](_0x49177e))return!![];}return![];}else return this[_0x110ed7(0x2c9)];}if(_0x49d43c[_0x110ed7(0x345)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x66a54=RegExp['$1']['split'](',')['map'](_0x53c5f3=>Number(_0x53c5f3)||0x0);for(const _0x2d5606 of _0x66a54){if(_0x110ed7(0x2f9)===_0x110ed7(0x223))return _0x6182ab=_0x33d739[_0x110ed7(0x31d)](/\\/g,'\x1b'),_0x143c94=_0x5470bf[_0x110ed7(0x31d)](/\x1b\x1b/g,'\x5c'),_0x11341c;else{if(!$gameSwitches[_0x110ed7(0x1e5)](_0x2d5606))return!![];}}return![];}if(_0x49d43c[_0x110ed7(0x345)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if('iPapH'!==_0x110ed7(0xf0))return!![];else{const _0x44ccd4=RegExp['$1']['split'](',')[_0x110ed7(0xae)](_0x2534ea=>Number(_0x2534ea)||0x0);for(const _0x524ccd of _0x44ccd4){if(_0x110ed7(0xa3)!==_0x110ed7(0x2f8)){if($gameSwitches[_0x110ed7(0x1e5)](_0x524ccd))return![];}else this['x']=(_0x3b1723[_0x110ed7(0x2d9)]-this[_0x110ed7(0xc6)])/0x2,_0x59d981[_0x110ed7(0x21d)]=_0x518d98,this['clampPlacementPosition']();}return!![];}}return!![];},VisuMZ[_0x2032d4(0xdb)][_0x2032d4(0x229)]=Window_ChoiceList['prototype'][_0x2032d4(0x348)],Window_ChoiceList['prototype'][_0x2032d4(0x348)]=function(){const _0x27ab24=_0x2032d4;VisuMZ['MessageCore']['Window_ChoiceList_updatePlacement'][_0x27ab24(0xa5)](this),this[_0x27ab24(0x2c5)]();},Window_ChoiceList[_0x2032d4(0x2ae)]['placeCancelButton']=function(){const _0x314a7f=_0x2032d4;if(!this[_0x314a7f(0x21e)])return;const _0x3eebfe=0x8,_0x514ed3=this['_cancelButton'],_0x68a34f=this['x']+this[_0x314a7f(0xc6)],_0x3ba850=Math[_0x314a7f(0x309)]((Graphics[_0x314a7f(0xc6)]-Graphics['boxWidth'])/0x2);if(_0x68a34f>=Graphics[_0x314a7f(0x2d9)]+_0x3ba850-_0x514ed3[_0x314a7f(0xc6)]+_0x3eebfe){if('nPBCl'!=='MwUhk')_0x514ed3['x']=-_0x514ed3[_0x314a7f(0xc6)]-_0x3eebfe;else return _0x701b77;}else'IVGoc'!=='rJvtf'?_0x514ed3['x']=this[_0x314a7f(0xc6)]+_0x3eebfe:(_0x450a[_0x314a7f(0x2ae)][_0x314a7f(0x199)]['call'](this),_0x5378b0[_0x314a7f(0xdb)][_0x314a7f(0x242)][_0x314a7f(0x29c)][_0x314a7f(0x82)]&&this[_0x314a7f(0x1eb)]());_0x514ed3['y']=this[_0x314a7f(0x1e6)]/0x2-_0x514ed3[_0x314a7f(0x1e6)]/0x2;},VisuMZ[_0x2032d4(0xdb)]['Window_ChoiceList_windowX']=Window_ChoiceList[_0x2032d4(0x2ae)]['windowX'],Window_ChoiceList[_0x2032d4(0x2ae)][_0x2032d4(0x1b0)]=function(){const _0x1b9b7d=_0x2032d4;return this[_0x1b9b7d(0x22d)]?this[_0x1b9b7d(0x31e)]():VisuMZ[_0x1b9b7d(0xdb)]['Window_ChoiceList_windowX']['call'](this);},Window_ChoiceList['prototype'][_0x2032d4(0x31e)]=function(){const _0x493897=_0x2032d4,_0x1496e4=$gameMessage[_0x493897(0x278)]();if(_0x1496e4===0x1){if(_0x493897(0x2e4)!==_0x493897(0x103))return(Graphics['boxWidth']-this[_0x493897(0x179)]())/0x2;else{let _0x53711e=_0x8705bd[_0x493897(0x1d5)](_0x4b1c5b)||'';return _0x53711e=this[_0x493897(0x1ea)](_0x53711e),_0x53711e=this[_0x493897(0x138)](_0x53711e),_0x53711e[_0x493897(0x1f4)]();}}else{if(_0x1496e4===0x2){if(_0x493897(0x142)!==_0x493897(0x75))return this['_messageWindow']['x']+this[_0x493897(0x22d)]['width']-this[_0x493897(0x179)]();else _0x25bef8='';}else{if(_0x493897(0x1fd)!=='KLlwq')_0x940fd1[_0x493897(0x2b7)]();else return this['_messageWindow']['x'];}}},Window_ChoiceList[_0x2032d4(0x2ae)][_0x2032d4(0x179)]=function(){const _0x8cad57=_0x2032d4,_0x53aa66=(this[_0x8cad57(0x230)]()+this[_0x8cad57(0x2c1)]())*this[_0x8cad57(0x338)]()+this['padding']*0x2;return Math['min'](_0x53aa66,Graphics[_0x8cad57(0xc6)]);},Window_ChoiceList[_0x2032d4(0x2ae)][_0x2032d4(0x2dc)]=function(){const _0xf4f813=_0x2032d4,_0x1b975c=$gameMessage[_0xf4f813(0x231)]()[_0xf4f813(0xae)](_0x32bf6b=>this[_0xf4f813(0x293)](_0x32bf6b))[_0xf4f813(0x27a)](_0x2f4e2f=>this[_0xf4f813(0x184)](_0x2f4e2f)),_0x2dfd63=Math[_0xf4f813(0x331)](_0x1b975c[_0xf4f813(0xf9)]/this[_0xf4f813(0x338)]());return Math[_0xf4f813(0x16a)](0x1,Math[_0xf4f813(0x213)](_0x2dfd63,this['maxLines']()));},Window_ChoiceList[_0x2032d4(0x2ae)]['maxLines']=function(){const _0x3af687=_0x2032d4,_0x3b80f7=this['_messageWindow'],_0x5ee862=_0x3b80f7?_0x3b80f7['y']:0x0,_0x1c1a48=_0x3b80f7?_0x3b80f7['height']:0x0,_0x24bd28=Graphics[_0x3af687(0x20c)]/0x2;if(_0x5ee862<_0x24bd28&&_0x5ee862+_0x1c1a48>_0x24bd28)return 0x4;else{if(_0x3af687(0x1f9)!==_0x3af687(0x1f9))this['_pictureTextRefresh']['push'](_0x539145);else return $gameSystem[_0x3af687(0x24b)]();}},Window_ChoiceList[_0x2032d4(0x2ae)][_0x2032d4(0x230)]=function(){const _0x224f84=_0x2032d4;let _0xf845be=this[_0x224f84(0x13a)]();for(const _0x11a271 of this[_0x224f84(0x288)]){const _0x553453=_0x11a271[_0x224f84(0x248)],_0x387950=this[_0x224f84(0x2df)](_0x553453),_0x269ec0=this['textSizeEx'](_0x553453)[_0x224f84(0xc6)]+_0x387950,_0x3d6abf=Math[_0x224f84(0x331)](_0x269ec0)+this['itemPadding']()*0x2;_0xf845be=Math[_0x224f84(0x16a)](_0xf845be,_0x3d6abf);}return _0xf845be;},Window_ChoiceList['prototype'][_0x2032d4(0x13a)]=function(){const _0x37baf4=_0x2032d4;let _0x3c211b=0x60;const _0x6f1369=$gameMessage[_0x37baf4(0x231)]();for(const _0x4ef4c5 of _0x6f1369){_0x4ef4c5[_0x37baf4(0x345)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x3c211b=Math[_0x37baf4(0x16a)](_0x3c211b,Number(RegExp['$1'])));}return _0x3c211b;},Window_ChoiceList[_0x2032d4(0x2ae)][_0x2032d4(0x363)]=function(_0x3905b0){const _0x1ddce7=_0x2032d4,_0x5c1a67=this[_0x1ddce7(0x1d7)](_0x3905b0),_0x475f7d=$gameSystem[_0x1ddce7(0x35b)]()!==_0x1ddce7(0x186)?_0x1ddce7(0x19a)[_0x1ddce7(0x362)]($gameSystem[_0x1ddce7(0x35b)]()):'',_0x7e8317=_0x475f7d+this['commandName'](_0x3905b0);this[_0x1ddce7(0x257)](this[_0x1ddce7(0x313)](_0x3905b0));const _0x295358=this[_0x1ddce7(0x20a)](_0x7e8317)[_0x1ddce7(0x1e6)],_0x3faed7=_0x5c1a67['x']+this['getChoiceIndent'](_0x7e8317),_0x5d384d=Math[_0x1ddce7(0x16a)](_0x5c1a67['y'],_0x5c1a67['y']+Math[_0x1ddce7(0x224)]((_0x5c1a67[_0x1ddce7(0x1e6)]-_0x295358)/0x2));this['drawTextEx'](_0x7e8317,_0x3faed7,_0x5d384d,_0x5c1a67[_0x1ddce7(0xc6)]);},Window_ChoiceList['prototype'][_0x2032d4(0x2df)]=function(_0x207d41){const _0x93b261=_0x2032d4;let _0x5c104b=0x0;return _0x207d41[_0x93b261(0x345)](/<CHOICE INDENT:[ ](\d+)>/gi)&&(_0x5c104b=Number(RegExp['$1'])),_0x5c104b;},Window_ChoiceList[_0x2032d4(0x2ae)][_0x2032d4(0x168)]=function(){const _0x26b7ea=_0x2032d4;$gameMessage[_0x26b7ea(0x174)](this['currentExt']()),this['_messageWindow'][_0x26b7ea(0x2cd)](),this[_0x26b7ea(0x308)]();};