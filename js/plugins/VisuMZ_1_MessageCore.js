//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.47;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.47] [MessageCore]
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
 * Text Language Information
 * ============================================================================
 *
 * As of Message Core version 1.46, Text Language has been added. 
 * 
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 *
 * ---
 * 
 * === How to Enable Switching ===
 * 
 * Text Language is NOT enabled by default. Here's what you have to do:
 * 
 * #1. Open up the Message Core's Plugin Parameters
 * #2. Plugin Parameters > Text Language Settings > Enable Switching?
 * #3. Change the "Enable Switching?" parameter setting to "true".
 * #4. Adjust any other settings as needed.
 * #5. Save the Plugin Parameter changes.
 * #6. Save your game.
 * 
 * Now, it's time to get the CSV file that will contain all of the text used to
 * translate your game's script.
 * 
 * #1. Play test your game. Make sure Play test mode is NOT disabled.
 * #2. A popup will appear asking to create a language CSV file.
 * #3. Click "OK" and let the plugin do its thing.
 * #4. The project's /data/ folder will appear with Language.csv made.
 * #5. The plugin will then ask you to restart your game.
 * 
 * ---
 * 
 * === How to Edit the Language CSV ===
 * 
 * The Language CSV is structured as a normal CSV file would be, which also
 * means it can be modified in programs like Microsoft Excel or Google Sheets.
 * We recommend using either of those programs to modify the text.
 * 
 * We do not recommend modifying the CSV file in programs like notepad directly
 * due to the way certain things like commas (,) are handled and how easy it is
 * to be error-prone.
 * 
 * The table will appear something like this at first:
 * 
 *     Key        English    Chinese    Japanese     Korean
 *     Greeting   Hello      你好       こんにちは    안녕하세요
 *     Farewell   Good-bye   再见       さようなら    안녕히
 *     Wow        Wow        哇         ワオ          와우
 * 
 * The "Key" column refers to the reference key used to determine which lines
 * will be inserted into the text. The columns with the languages will utilize
 * the respective phrases for that language.
 * 
 * You can remove columns containing languages that you aren't planning to
 * translate for your game.
 * 
 * ---
 * 
 * === Things to Keep in Mind ===
 * 
 * When adding text to the CSV file via the spreadsheet editor (Excel or Google
 * Sheets), there's a few things to keep in mind.
 * 
 * ---
 * 
 * ==== Line Breaks ====
 * 
 * When you want to insert line breaks into the translated phrases, use the
 * <br> text code. This is best used for text that is to be transferred into
 * the message window or help window.
 * 
 * ==== Text Codes ====
 * 
 * Text codes like \C[2] can be inserted normally. However, they only work in
 * windows that support text codes, such as the message window or help window.
 * Otherwise, the text codes will not transfer over properly.
 * 
 * ==== Semicolons ====
 * 
 * Due to the nature of the CSV file, we used the semicolon (;) as the
 * separator. As such, semicolons should not be used in the text entries.
 * Though some sentences will work with the semicolon, not all of them will. If
 * you do want to use a semicolon, use the text code <semicolon> instead.
 * 
 *   Example:
 * 
 *   "The pancakes were delicious<semicolon> they were fluffy and sweet."
 * 
 * Other variations of the semicolon text code are <semi> and <semi-colon>.
 * The <semicolon> text code and variants only work with the Language CSV and
 * are ignored otherwise when typed in a regular message box entry.
 * 
 * ---
 * 
 * ==== Macros and Language Switches ====
 * 
 * For those using both text macros and text language switches, macros will be
 * converted to text before language switches as it allows for better text
 * transitions that way.
 * 
 * ---
 * 
 * === How to Use the Reference Keys ===
 * 
 * Remember the "Key" column and the reference keys? Those are used to
 * determine which lines will be inserted into the text for the message window
 * and just about any other window. However, there's a specific way these keys
 * must be used in order for them to work.
 * 
 * The "text code" format works like this. Use any of the following:
 * 
 *   \tl{keyName}
 *   \translate{keyName}
 *   \loc{keyName}
 *   \locale{keyName}
 *   \localize{keyName}
 * 
 * or for those coming from different translation plugins but want to switch
 * over to the VisuStella MZ Message Core's translation system:
 * 
 *   ${keyName}
 * 
 * For example, to use one of the default keys made with the Language CSV:
 * 
 *   \tl{Greeting}
 * 
 * This will yield "Hello" in English, "你好" in Chinese, "こんにちは" in
 * Japanese, and "안녕하세요" in Korean.
 * 
 * Key names are not case sensitive and any trailing spaces will be removed
 * from them in order to make sure the CSV table is stable to reference any
 * translated text from.
 * 
 * You can insert these language "text codes" into item names, skill names,
 * etc. as well as system entries like for Attack, Defense, etc.
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
 * <left>               Makes subsequent text left-aligned. *Note1*
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned. *Note1*
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned. *Note1*
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start. Does not work with Word Wrap.
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
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
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
 * <BgColor: x>                   Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' text color. This
 *                                will be combined with a fading
 * <BgColor: x,y>                 Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' to 'y' gradient
 *                                text color.
 * <BgColor: #rrggbb>             Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' color using
 *                                hex color values.
 * <BgColor: #rrggbb, #rrggbb>    Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' gradient
 *                                using hex color values.
 * 
 * <Help> text </Help>            Makes a help window appear and have it show
 *                                'text' in its contents. The help window will
 *                                disappear if no text is displayed.
 * 
 * <Shuffle>                      Shuffles the order of all choices. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 * <Shuffle: x>                   Shuffles the order of all choices and only
 *                                x number of them will appear. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 *                                Hidden choices do not count towards x number.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Background Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <BgImg: filename>              Creates a background image from img/pictures/
 *                                stretched across the choice rectangle.
 * <BgImg LowerLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <BgImg LowerCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <BgImg LowerRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <BgImg MidLeft: filename>      Creates a background image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <BgImg Center: filename>       Creates a background image from img/pictures/
 *                                scaled to the center of choice rect.
 * <BgImg MidRight: filename>     Creates a background image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <BgImg UpperLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <BgImg UpperCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <BgImg UpperRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <BgImg: filename> text code variants, even if the background
 * image is smaller than the choice contents, it will overscale to match its
 * choice rectangle dimensions.
 * 
 * *Note:* Using a background image will clear the dimmed background rectangle
 * that is normally behind each selectable choice.
 * 
 * *Note:* Each choice can only have one background image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the background will appear behind the select cursor.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Foreground Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <FgImg: filename>              Creates a foreground image from img/pictures/
 *                                stretched across the choice rectangle.
 * <FgImg LowerLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <FgImg LowerCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <FgImg LowerRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <FgImg MidLeft: filename>      Creates a foreground image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <FgImg Center: filename>       Creates a foreground image from img/pictures/
 *                                scaled to the center of choice rect.
 * <FgImg MidRight: filename>     Creates a foreground image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <FgImg UpperLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <FgImg UpperCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <FgImg UpperRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <FgImg: filename> text code variants, unlike the background
 * variant, the foreground image will not overscale past its original size.
 * Instead, it will maintain its original size or be smaller, so long as it can
 * be scaled to exist within the choice rectangle unless it is intended to be
 * stretched by using the <FgImg: filename> variant.
 * 
 * *Note:* Text is then written on top of the foreground image.
 * 
 * *Note:* Each choice can only have one foreground image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the foreground will appear behind the select cursor.
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
 * Choices: Distance
 * - Change the distance from choice window to the message window.
 * 
 *   Distance:
 *   - Change distance between the choice and message windows.
 *   - Default distance is 0.
 *   - Use negative to center align with remaining space.
 * 
 * ---
 *
 * Choices: Properties
 * - Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 * 
 *   Minimum Choice Width:
 *   - What is the minimum width size for each choice?
 *   - 96 is the default width.
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
 * === Select Plugin Commands ===
 * 
 * ---
 * 
 * Select: Weapon
 * - Opens the Event Select Item Window to let the player pick a weapon to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected weapon.
 *   - It will result in 0 otherwise.
 * 
 *   Weapon Type ID:
 *   - Reduce all the weapons to a specific weapon type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Armor
 * - Opens the Event Select Item Window to let the player pick an armor to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected armor.
 *   - It will result in 0 otherwise.
 * 
 *   Armor Type ID:
 *   - Reduce all the armors to a specific armor type.
 *   - Leave at 0 to not use filters.
 * 
 *   Equip Type ID:
 *   - Reduce all the armors to a specific equip type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Skill
 * - Opens the Event Select Item Window to let the player pick a skill to
 *   choose from.
 * - Requires VisuMZ_1_SkillsStatesCore!
 * - Can be opened while the Message Window is open.
 * - Skills will not be listed if they are hidden by the actor.
 * - Skills will not be listed if the actor lacks access to their Skill Type.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected skill.
 *   - It will result in 0 otherwise.
 * 
 *   Actor ID:
 *   - Select an actor to get the skill list from.
 *   - Use 0 to select from the party leader.
 * 
 *   Skill Type ID:
 *   - Reduce all the skills to a specific skill type.
 *   - Leave at 0 to not use filters.
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
 *   Each Message Start:
 *   Each Message End:
 *   - This is text that is added at the start/end of each message.
 *   - You may use text codes.
 *   - Keep in mind that if a message extends to a different page (due to word
 *     wrap, excess lines, etc), that does not mean the starting text will
 *     be added to where the next page begins or the ending text will be added
 *     where the previous page ends.
 *   - Can be used for things like adding "<center>" to the start of each 
 *     message without having to type it every time.
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
 *   Minimum Choice Width:
 *   - What is the minimum choice width for each choice?
 *   - 96 is the default width.
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
 * Plugin Parameters: Custom Font Manager
 * ============================================================================
 *
 * Custom fonts that aren't the message or number fonts cannot be used without
 * registration. If you try to use custom fonts in RPG Maker MZ without
 * registering their font family first, you will find out that they will not
 * work. These plugin parameters allow you to register your game's custom fonts
 * here.
 * 
 * ---
 * 
 * Settings:
 * 
 *   Font Family:
 *   - This will be what's used by RPG Maker MZ and plugins to reference this
 *     specific font.
 *   - NO filename extensions!
 * 
 *   Filename:
 *   - What is the filename of the custom font you would like to use?
 *   - Located inside the project's "fonts" folder.
 * 
 * ---
 * 
 * Examples:
 * 
 *   Font Family: WildWords
 *   Filename: WildWords-Regular.ttf
 * 
 * How you would use this in other plugins as a preface to the font face or
 * font family would be to use "WildWords" as the font face/family name. Then
 * RPG Maker MZ will use its own innate FontManager to refer that to the
 * "WildWords-Regular.ttf" file found in the game's "fonts" folder.
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
 * Plugin Parameters: Text Language Settings
 * ============================================================================
 *
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 * 
 * See the "Text Language Information" for more information.
 *
 * ---
 * 
 * Main Settings:
 * 
 *   Enable Switching?:
 *   - Enable language switching settings for this plugin?
 * 
 *   CSV Filename:
 *   - What is the filename of the CSV file to read from?
 *   - Located within the project's /data/ folder.
 * 
 * ---
 * 
 * Options:
 * 
 *   Add Option?:
 *   - Add the 'Text Language' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 * 
 * ---
 * 
 * Languages:
 * 
 *   Default Language:
 *   - What is the default language used for this game?
 * 
 *   Supported Languages:
 *   - What are all the supported languages supported by this game's
 *     script?
 *   - Remove any that aren't translated.
 * 
 * ---
 * 
 * Language Names:
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - How does this language appear in the in-game options?
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
 * spaces.
 * 
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 * 
 * As of the v1.44 update, some Asian languages such as Chinese and Japanese
 * are now supported for word wrap. Korean language is only supported if spaces
 * are used.
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
 * Version 1.47: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Custom Font Manager
 * **** Register custom fonts here.
 * **** Custom fonts that aren't the message or number fonts cannot be used
 *      without registration.
 * **** See help file for more information.
 * 
 * Version 1.46: January 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where script calls used to create message choices would not
 *    work properly. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Text Language Switching added by Irina:
 * *** Plugin Parameters > Text Language Settings
 * **** The "Text Language" feature allows your players to switch between
 *      different languages for your game to allow people from around the globe
 *      to enjoy what story you have to tell.
 * **** Disclaimers: This is not an automatic translation tool. Translations
 *      made through the "Text Language" feature of the VisuStella MZ Message
 *      Core will require manual input by the game developer.
 * **** Read more about it in detail within the "Text Language Information"
 *      section in the help file.
 * ** New Plugin Parameter added by Irina:
 * *** Choices: Distance
 * **** Change the distance from choice window to the message window.
 * ** New parameter added to Plugin Command "Choices: Properties" by Irina:
 * *** Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Plugin Parameter for "Message Window" added by Irina:
 * *** Parameters > Message Window: Choice List Window> Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Text Codes for Choice Window added by Irina:
 * *** <BgImg: filename> and variants
 * *** <FgImg: filename> and variants
 * **** These text codes allow adding a background or foreground image to a
 *      choice rectangle in stretched/scaled size.
 * 
 * Version 1.45: December 14, 2023
 * * Bug Fixes!
 * ** Punctuation was, for some reason, excluded when using Wordwrap with
 *    Japanese and Chinese languages. This should be fixed now. Fixed by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added clarity to the <left>, <center>, and <right> being unable to be
 *    used together with word wrap.
 * *** Word Wrap also cannot be used together with <left>, <center>, or <right>
 *     and will disable itself if text alignment text codes are detected.
 * * Feature Update!
 * ** Wordwrap <br> now works properly with Japanese and Chinese languages.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > General Settings > Each Message Start
 * *** Plugin Parameters > General Settings > Each Message End
 * **** This is text that is added at the start/end of each message.
 * **** Keep in mind that if a message extends to a different page (due to word
 *      wrap, excess lines, etc), that does not mean the starting text will
 *      be added to where the next page begins or the ending text will be added
 *      where the previous page ends.
 * **** Can be used for things like adding "<center>" to the start of each 
 *      message without having to type it every time.
 * 
 * Version 1.44: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated "Plugin Parameters: Word Wrap Settings" section:
 * *** As of the v1.44 update, some Asian languages such as Chinese and
 *     Japanese are now supported for word wrap. Korean language is only
 *     supported if spaces are used.
 * * Feature Update!
 * ** Word Wrap is now supported for Japanese and Chinese languages.
 * ** Feature updated by Irina and sponsored by AndyL.
 * * New Features!
 * ** New text codes added by Irina for "Show Choices" event command.
 * *** <Shuffle>
 * **** Shuffles the order of all choices. Any cancel shortcuts other than
 *      "Branch" will be undone.
 * *** <Shuffle: x>
 * **** Shuffles the order of all choices and only x number of them appear. Any
 *      cancel shortcuts other than "Branch" will be undone. Hidden choices do
 *      not count towards x number.
 * 
 * Version 1.43: April 13, 2023
 * * Compatibility Update!
 * ** Fixed incompatibilities with auto message positioning with the Map Zoom
 *    plugin. Update made by Irina.
 * 
 * Version 1.42: March 16, 2023
 * * Bug Fixes!
 * ** Fixed some text codes that would capture way too much data than intended.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text code added by Irina for Show Choice Window only:
 * *** <Help> text </Help>
 * **** Makes a help window appear and have it show 'text' in its contents.
 * **** The help window will disappear if no text is displayed.
 * ** New Plugin Commands added by Arisu:
 * *** Select: Weapon
 * *** Select: Armor
 * *** Select: Skill
 * **** Opens the Event Select Item Window to let the player pick a weapon,
 *      armor, or skill to choose from. The selected object will have its ID
 *      recorded in a variable. These can be opened while the Message Window is
 *      opened just like the event "Select Item".
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina!
 * *** For the Choice Window Only text codes:
 * **** <BgColor: x>
 * **** <BgColor: x, y>
 * **** <BgColor: #rrggbb>
 * **** <BgColor: #rrggbb, #rrggbb>
 * ***** Requires VisuMZ_0_CoreEngine! Sets the background color of this choice
 *       to 'x' text color, 'x' to 'y' gradient text color, or using '#rrggbb'
 *       hex color values.
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
 * @command Separator_Begin
 * @text -
 * @desc -
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
 * @command Separator_Choice
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowDistance
 * @text Choices: Distance
 * @desc Change the distance from choice window to the message window.
 *
 * @arg Distance:eval
 * @text Distance
 * @desc Change distance between the choice and message windows.
 * Default distance is 0. Use negative to center align.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Choice Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MinWidth:num
 * @text Minimum Choice Width
 * @type number
 * @min 0
 * @desc What is the minimum width size for each choice?
 * 96 is the default width.
 * @default 96
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
 * @command Separator_Select
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectWeapon
 * @text Select: Weapon
 * @desc Opens the Event Select Item Window to let the player
 * pick a weapon to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected weapon. It will result in 0 otherwise.
 * @default 1
 *
 * @arg WeaponTypeID:num
 * @text Weapon Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the weapons to a specific weapon type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectArmor
 * @text Select: Armor
 * @desc Opens the Event Select Item Window to let the player
 * pick an armor to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected armor. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ArmorTypeID:num
 * @text Armor Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific armor type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @arg EquipTypeID:num
 * @text Equip Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific equip type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectSkill
 * @text Select: Skill
 * @desc Opens the Event Select Item Window to let the player
 * pick a skill to choose from. Requires VisuMZ_1_SkillsStatesCore!
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected skill. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select an actor to get the skill list from.
 * Use 0 to select from the party leader.
 * @default 0
 *
 * @arg SkillTypeID:num
 * @text Skill Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the skills to a specific skill type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
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
 * @param CustomFonts:arraystruct
 * @text Custom Font Manager
 * @type struct<CustomFont>[]
 * @desc Register custom fonts here. Custom fonts that aren't the
 * message or number fonts cannot be used without this.
 * @default []
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
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjIcon\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectIcon();\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Code Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * Format style: [MacroName]
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param Localization:struct
 * @text Text Language Settings
 * @type struct<Localization>
 * @desc Text Language settings for this plugin.
 * @default {"Main":"","Enable:eval":"false","CsvFilename:str":"Languages.csv","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Language","Localized":"","DefaultLocale:str":"English","Languages:arraystr":"[\"Bengali\",\"Chinese(Simplified)\",\"Chinese(Traditional)\",\"Czech\",\"Danish\",\"Dutch\",\"English\",\"Finnish\",\"French\",\"German\",\"Greek\",\"Hindi\",\"Hungarian\",\"Indonesian\",\"Italian\",\"Japanese\",\"Korean\",\"Norwegian\",\"Polish\",\"Portuguese\",\"Romanian\",\"Russian\",\"Slovak\",\"Spanish\",\"Swedish\",\"Tamil\",\"Thai\",\"Turkish\"]","LangNames":"","Bengali:str":"বাংলা","Chinese(Simplified):str":"简体中文","Chinese(Traditional):str":"繁體中文","Czech:str":"Čeština","Danish:str":"Dansk","Dutch:str":"Nederlands","English:str":"English","Finnish:str":"Suomi","French:str":"Français","German:str":"Deutsch","Greek:str":"Ελληνικά","Hindi:str":"हिन्दी","Hungarian:str":"Magyar","Indonesian:str":"Bahasa Indo","Italian:str":"Italiano","Japanese:str":"日本語","Korean:str":"한국어","Norwegian:str":"Norsk","Polish:str":"Polski","Portuguese:str":"Português","Romanian:str":"Română","Russian:str":"Русский","Slovak:str":"Slovenčina","Spanish:str":"Español","Swedish:str":"Svenska","Tamil:str":"தமிழ்","Thai:str":"ไทย","Turkish:str":"Türkçe"}
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
 * @param EachMessageStart:json
 * @text Each Message Start
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the start of each message.
 * You may use text codes.
 * @default ""
 *
 * @param EachMessageEnd:json
 * @text Each Message End
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the end of each message.
 * You may use text codes.
 * @default ""
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
 * @param ChoiceWindowMinWidth:num
 * @text Minimum Choice Width
 * @parent ChoiceListWindow
 * @type number
 * @min 0
 * @desc What is the minimum choice width for each choice?
 * 96 is the default width.
 * @default 96
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
 * Custom Font Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomFont:
 *
 * @param FontFamily:str
 * @text Font Family
 * @desc This will be what's used by RPG Maker MZ and plugins to
 * reference this specific font. NO filename extensions!
 * @default Unnamed
 *
 * @param Filename:str
 * @text Filename
 * @desc What is the filename of the custom font you would like to use?
 * Located inside the project's "fonts" folder.
 * @default Unnamed.ttf
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
 * Localization Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Localization:
 *
 * @param Main
 * @text Main Settings
 *
 * @param Enable:eval
 * @text Enable Switching?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable language switching settings for this plugin?
 * @default false
 *
 * @param CsvFilename:str
 * @text CSV Filename
 * @parent Main
 * @desc What is the filename of the CSV file to read from?
 * Located within the project's /data/ folder.
 * @default Languages.csv
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Language' option to the Options menu?
 * @default true
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
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Text Language
 *
 * @param Localized
 * @text Languages
 *
 * @param DefaultLocale:str
 * @text Default Language
 * @parent Localized
 * @type select
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What is the default language used for this game?
 * @default English
 *
 * @param Languages:arraystr
 * @text Supported Languages
 * @parent Localized
 * @type select[]
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What are all the supported languages supported by this
 * game's script? Remove any that aren't translated.
 * @default ["Bengali","Chinese(Simplified)","Chinese(Traditional)","Czech","Danish","Dutch","English","Finnish","French","German","Greek","Hindi","Hungarian","Indonesian","Italian","Japanese","Korean","Norwegian","Polish","Portuguese","Romanian","Russian","Slovak","Spanish","Swedish","Tamil","Thai","Turkish"]
 *
 * @param LangNames
 * @text Language Names
 *
 * @param Bengali:str
 * @text Bengali
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default বাংলা
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 简体中文
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 繁體中文
 * 
 * @param Czech:str
 * @text Czech
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Čeština
 * 
 * @param Danish:str
 * @text Danish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Dansk
 * 
 * @param Dutch:str
 * @text Dutch
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Nederlands
 * 
 * @param English:str
 * @text English
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default English
 * 
 * @param Finnish:str
 * @text Finnish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Suomi
 * 
 * @param French:str
 * @text French
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Français
 * 
 * @param German:str
 * @text German
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Deutsch
 * 
 * @param Greek:str
 * @text Greek
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Ελληνικά
 * 
 * @param Hindi:str
 * @text Hindi
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default हिन्दी
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Magyar
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Bahasa Indo
 * 
 * @param Italian:str
 * @text Italian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Italiano
 * 
 * @param Japanese:str
 * @text Japanese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 日本語
 * 
 * @param Korean:str
 * @text Korean
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 한국어
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Norsk
 * 
 * @param Polish:str
 * @text Polish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Polski
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Português
 * 
 * @param Romanian:str
 * @text Romanian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Română
 * 
 * @param Russian:str
 * @text Russian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Русский
 * 
 * @param Slovak:str
 * @text Slovak
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Slovenčina
 * 
 * @param Spanish:str
 * @text Spanish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Español
 * 
 * @param Swedish:str
 * @text Swedish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Svenska
 * 
 * @param Tamil:str
 * @text Tamil
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default தமிழ்
 * 
 * @param Thai:str
 * @text Thai
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default ไทย
 * 
 * @param Turkish:str
 * @text Turkish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Türkçe
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

function _0x5688(_0x53b43f,_0x2bf6ec){const _0xb9bf0b=_0xb9bf();return _0x5688=function(_0x56888c,_0x3aa4d9){_0x56888c=_0x56888c-0xf0;let _0x28efff=_0xb9bf0b[_0x56888c];return _0x28efff;},_0x5688(_0x53b43f,_0x2bf6ec);}const _0x314eca=_0x5688;(function(_0x25df70,_0x1ac363){const _0xea80d9=_0x5688,_0x445074=_0x25df70();while(!![]){try{const _0x474144=-parseInt(_0xea80d9(0x306))/0x1*(parseInt(_0xea80d9(0x21f))/0x2)+-parseInt(_0xea80d9(0x259))/0x3*(parseInt(_0xea80d9(0x3ad))/0x4)+-parseInt(_0xea80d9(0x16f))/0x5*(-parseInt(_0xea80d9(0x421))/0x6)+-parseInt(_0xea80d9(0x1c2))/0x7+parseInt(_0xea80d9(0x247))/0x8*(-parseInt(_0xea80d9(0x468))/0x9)+parseInt(_0xea80d9(0x251))/0xa*(-parseInt(_0xea80d9(0x452))/0xb)+parseInt(_0xea80d9(0x505))/0xc;if(_0x474144===_0x1ac363)break;else _0x445074['push'](_0x445074['shift']());}catch(_0xe0ce17){_0x445074['push'](_0x445074['shift']());}}}(_0xb9bf,0xa94c0));function _0xb9bf(){const _0x4fbd59=['show','iiNxq','choiceMinWidth','OgWLP','ZFpmC','drawText','windowX','TextStr','_MessageCoreSettings','processCharacter','_positionType','return\x200','cyxoK','hJPgi','format','realPictureId','jRSGe','messageRows','choices','changeVisuMzTextLocale','convertBackslashCharacters','getSkillTypes','stringify','clearAllPictureTexts','txbuo','grey','Window_ChoiceList','_choiceListHelpWindow','_messageOffsetX','lineHeight','processStoredAutoColorChanges','right','SelectArmor','convertMessageCoreEscapeActions','powerDownColor','makeSkillList','textLocale','flushTextState','ppmHM','#fff799','battleUserName','PsNhE','getMessageWindowWidth','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','setMessageWindowRows','isArmor','remove','Portuguese','348dEgMeP','addMessageCommonEvent','setup','bind','Default','setWeaponChoice','map\x20actor','length','_textDelay','<CENTER>','toUpperCase','makeFontSmaller','Window_NameBox_refresh','eBEkw','addWrapBreakAfterPunctuation','processColorLock','_textDelayCount','gsTZn','choiceCancelType','#a186be','Scene_Boot_loadGameFonts','QeeTv','\x1bC[%1]%2\x1bPREVCOLOR[0]','MessageRows','returnPreservedFontSettings','Scene_Boot_onDatabaseLoaded','vCsXh','WORD_WRAP_PADDING','registerActorNameAutoColorChanges','HjaZA','partyMemberName','_pictureTextCache','\x1bITALIC[0]','_cancelButton','changeOutlineColor','Window_Message_isTriggered','prepareShowTextFollowups','_moveTargetHeight','process_VisuMZ_MessageCore_TextMacros','textCodeCheck','\x1bTEXTALIGNMENT[2]','Window_Options_changeVolume','down-center','_interpreter','Adeus','Polish','processControlCharacter','blue','writeFileSync','3626183tBLsGR','Swedish','outlineWidth','textSizeEx','requestPictureTextRefresh','_autoPosRegExp','setRelativePosition','_choiceHelpDescriptions','Padding','Вау','itemHeight','reduce','upper\x20left','duOKI','updateMove','Window_Message_needsNewPage','Game_Screen_erasePicture','bqNzm','Languages.csv','ParseClassNotetags','adjustShowChoiceCancel','random','18MrTvya','_eventId','RozpH','convertFontSettingsEscapeCharacters','leader','<WORDWRAP>','getInputButtonString','Farewell','isBusy','ParseSkillNotetags','YsEFy','onLocalizationXhrError','itemChoiceActor','FastForwardKey','YsyMi','_moveTargetY','vELVe','hlRWE','refresh','getPreservedFontSettings','Distance','setPositionType','Ciao','_subject','\x1bTEXTALIGNMENT[3]','CommonEvent','VisuMZ_1_SkillsStatesCore','NameBoxWindowOffsetX','Italian','choiceIndexArray','WRAPBREAK','drawTextTopAligned','Window_ChoiceList_updatePlacement','CENTERPICTURE','Hej','\x1bTEXTALIGNMENT[0]','</LEFT>','upperleft','defeat','updateBitmap','TDUkV','_resetRect','upper-center','item','setLastGainedItemData','armor','downleft','wtypeId','down','index','preemptive','MJUNv','qWrbr','cancel','randomInt','middleright','FontFamily','visible','_nameBoxWindow','Indonesian','registerResetRect','textCodeResult','autoPositionOffsetX','itemRect','launchMessageCommonEvent','drawPictureText','onDatabaseLoaded','Hejdå','processCommonEvent','getLanguageAt','convertShowChoiceEscapeCodes','gHuST','\x1bTEXTALIGNMENT[1]','none','splice','setSkillChoice','close','inBattle','SkillTypeID','itemChoiceStypeId','anyPictureTextChanges','ParseStateNotetags','setupNumInput','commandName','choiceDistance','push','La\x20revedere','CSV\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.\x0a','YfNOl','onProcessCharacter','Game_Map_initialize','maxFontSizeInLine','convertChoiceMacros','lOuRF','stretchDimmerSprite','Selamat\x20tinggal','LZmsu','General','Norwegian','map\x20player','Game_Map_setupEvents','process_VisuMZ_MessageCore_AutoColor','สวัสดี','mkIAr','registerSelfEvent','AiEJt','_target','map\x20event','easeOut','processWrapBreak','German','obtainEscapeString','rDdup','victory','<B>','ghnHO','NameBoxWindowDefaultColor','OjOje','AddAutoColor','Greeting','_pictureTextWidth','fontFace','isVolumeSymbol','fontSize','PictureTextChange','<RIGHT>','DDLDe','seUQj','setupChoices','contentsBack','_centerMessageWindow','ApFtO','obtainExp','resetWordWrap','bIfCM','processFontChangeBold','round','startY','nextEventCode','addMessageCoreLocalizationCommand','getMessageWindowXyOffsets','max','Sbohem','Name','down-right','changeValue','_action','ARRAYSTR','#fbaf5d','CSV\x20file\x20cannot\x20be\x20created.\x0aPlease\x20enter\x20Playtest\x20mode.\x0a','Japanese','actorName','ShuffleArray','height','setSpeakerName','FXVUr','erasePictureTextBuffer','44568600LzddDq','message','processEscapeCharacter','actor','Uau','Type','process_VisuMZ_MessageCore_TextCodes_Replace','Game_Party_initialize','isHelpWindowWordWrap','processActorNameAutoColorChanges','isBreakShowTextCommands','processFontChangeItalic','</CENTER>','map\x20party','prepareWordWrapEscapeCharacters','STRUCT','down\x20center','Window_Base_processEscapeCharacter','Window_MessageLog','VisuMZ_3_ActSeqCamera','<BR>','FAcoE','fontItalic','CrXIa','ArmorTypeID','lowerright','EsfRQ','convertButtonAssistText','white','பிரியாவிடை','PICTURE','orange','AutoColor','textSizeExTextAlignment','getLocalizedText','SortObjectByKeyLength','choiceTextAlign','#7cc576','itemBackColor2','dirname','itemPadding','messageCoreWindowX','AutoColorBypassList','Chinese(Traditional)','updateDimensions','getLastGainedItemData','JSON','SelectSkill','mainModule','getMessageWindowRows','HelpWindow','anchor','createPictureText','drawBackCenteredPicture','Window_Message_newPage','_index','Hindi','jCYOz','messageCoreLocalization','upcenter','TextCodeReplace','sPZtT','onload','ViQoX','postConvertEscapeCharacters','ZCsKd','안녕히\x20가세요','databaseObjectName','textColor','ParseEnemyNotetags','_textColorStack','Olá','UNDEFINED!','_messageCommonEvents','drawCustomBackgroundColor','addChildAt','setChoiceListHelpWindow','Scene_Message_createChoiceListWindow','messageCoreTextSpeed','lower\x20center','addLoadListener','applyData','makeItemList','selectDefault','substring','AddOption','বিদায়','jbOSw','ExtraEnemyDrops','ldqfv','setColorLock','canMove','isClosing','Items','さようなら','command101','States','ChoiceWindowMinWidth','setHelpWindow','NameBoxWindowOffsetY','_itemChoiceWtypeId','pJiMd','downright','data/','Do\x20widzenia','createContents','xJkVl','updateAutoSizePosition','isSkill','setTextAlignment','KFEZQ','isItem','_macroBypassWordWrap','gray','makeCommandListShuffle','eeHDh','resetRect','prepareForcedPositionEscapeCharacters','_helpWindow','updateEvents','resetPositionX','clamp','outlineColor','gradientFillRect','isClosed','ARJGc','Game_Message_setChoices','midcenter','application/csv','loadDatabase','WepTW','Window_NameBox_updatePlacement','contentsHeight','updateTransform','ว้าว','processAllText','FandS','isTriggered','Farvel','pagedown','onNewPageMessageCore','attachPictureText','WESZy','open\x20.\x5cdata','yYqYf','shift','boxWidth','TextManager_message','isWordWrapEnabled','ConvertParams','processPyTextCode','isVisuMzLocalizationEnabled','ARRAYJSON','isWeapon','_lastPluginCommandInterpreter','processAutoSize','crisis','prepareShowTextPluginCommandFollowups','maxShuffleChoices','choice','isSceneBattle','teSJr','setupItemChoice','yes','MessageWindow','AdjustRect','MaxCols','escapeStart','Wauw','convertTextAlignmentEscapeCharacters','boxHeight','\x1bi[%1]%2','MsgWindowOffsetX','getChoiceListMinChoiceWidth','crisisColor','ParseLocalizationCsv','createTextState','getColor','Vau','Enemies','cQvgo','MJStF','EachMessageStart','_moveDuration','WAIT','faceWidth','mNguD','_relativePosition','WnrkG','Szia','textSizeExRaw','processDrawCenteredPicture','list','event','setChoiceListMinChoiceWidth','CSV\x20file\x20has\x20not\x20been\x20made.\x0a','openLocalizationFolder','Window_Options_addGeneralOptions','nnLbM','Scene_Options_maxCommands','hcZuq','(((','101215pLSCLh','TtwIl','loadPicture','VisuMZ_4_ExtraEnemyDrops','ஆஹா','default','Merhaba','ওহে','convertNewPageTextStateMacros','down\x20left','getChoiceListTextAlign','Localization','PictureTextRefresh','Settings','forEach','\x1bCOLORLOCK[1]','convertMessageCoreEscapeReplacements','_scene','FUNC','Tamil','jQtOL','_autoSizeCheck','\x1bBOLD[0]','Game_System_initialize','EachMessageEnd','#6dcff6','updateAutoPosition','createChoiceListWindow','_maxShuffleChoices','ParseWeaponNotetags','_moveTargetWidth','Window_Options_statusText','calcMoveEasing','obtainEscapeParam','upleft','<I>','textSpeedStatusText','itemBackColor1','switchOutTextForLocalization','getChoiceIndent','lower-center','Zsaen','bitmap','processFsTextCode','MessageCore','constructor','convertLockColorsEscapeCharacters','messageWindowRect','Hallo','Αντίο','startX','isColorLocked','maxLines','French','Window_Base_processControlCharacter','_data','test','isSceneMap','drawChoiceLocationImage','min','trim','red','battle\x20actor','getLastPluginCommandInterpreter','theGu','zrrDS','currentExt','ZtaTI','inputtingAction','STR','Adiós','_texts','updateMessageCommonEvents','code','helpWordWrap','terminateMessage','drawItemNumber','EquipTypeID','load','getRandomTextFromPool','upper\x20center','EVAL','Näkemiin','7410634dCcazF','DataManager_loadDatabase','ChoiceWindowLineHeight','textSizeExWordWrap','name','\x1bCOLORLOCK[0]','_pictureTextSprite','applyDatabaseAutoColor','process_VisuMZ_MessageCore_TextCodes_Action','Chinese(Simplified)','Window_Base_processNewLine','setChoiceListLineHeight','PYItQ','DISABLE','down\x20right','_itemChoiceItypeId','getStartingChoiceWidth','RrUle','Korean','Game_Interpreter_PluginCommand','Wow','_commonEventId','PREVCOLOR','changePaintOpacity','fontBold','isRunning','TextColor','_forcedPosition','yOSKD','Sprite_Picture_updateBitmap','$dataLocalization','VisuMZ_4_ExtraEnemyDrops\x20needs\x20to\x20be\x20updated\x20','isPressed','Window_Message_processEscapeCharacter','itemRectWithPadding','replace','parameters','calcWindowHeight','powerUpColor','drawing','\x1bI[%1]','clear','zoomScale','add','_pictureTextBuffer','updatePlacement','MESSAGE_CORE_PLUGIN_NAME','convertVariableEscapeCharacters','eWODP','wXrnn','Classes','getChoiceListLineHeight','bYMeH','addMessageCoreTextSpeedCommand','Ahoj','setChoiceListTextAlign','changeTextSpeed','processPxTextCode','_textMacroFound','rcJIg','WRAPJPBREAK','_pictureTextHeight','CreateAutoColorFor','contents','akbOo','</I>','uppercenter','SelectWeapon','needsPictureTextRefresh','slice','return\x20\x27','ZRDiR','EndPadding','lower\x20right','RsLtx','CsvFilename','ARRAYSTRUCT','weapon','ANY','changeVolume','drawSkillCost','kIgqE','makeFontBigger','SbsdK','clearFlags','exit','changeTextColor','Hola','_moveEasingType','battle\x20enemy','midleft','ITALIC','Wah','76TRpDVH','anchorPictureText','mccHy','makeData','filter','FontBiggerCap','indent','drawPictureTextZone','version','upper-right','_itemChoiceStypeId','glPaE','Window_EventItem_includes','battleTargetName','easeIn','adjustShowChoiceExtension','unnamed','choiceAlignText','maxCommands','_itemChoiceEtypeId','setChoices','levelUp','isCommandEnabled','moveTo','WordWrap','getLanguageName','MessageWidth','DSJaP','Window_Message_terminateMessage','loadLocalization','\x5c%1','Thai','sort','skills','preConvertEscapeCharacters','sSsjN','drawItem','easeInOut','_itemChoiceVariableId','initialize','745424GpzYri','PictureIDs','makeCommandList','command357','preFlushTextState','outLineColor','JkMMX','processAutoPosition','setLastPluginCommandInterpreter','QqpVc','20eaSbsW','<LINE\x20BREAK>','applyMoveEasing','</WORDWRAP>','Actors','initMessageCore','itemChoiceEtypeId','parseChoiceText','5982SilkEi','loadGameFonts','onerror','floor','Greek','upper-left','choiceLineHeight','midright','itemChoiceWtypeId','WBVWx','processCustomWait','getChoiceListMaxColumns','tPxXn','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_wholeMoveDuration','parseLocalizedText','Bengali','StretchDimmedBg','Weapons','hide','lastGainedObjectName','Window_Message_updatePlacement','addGeneralOptions','findTargetSprite','tOmzn','obtainGold','setHelpWindowWordWrap','choiceCols','drawTextEx','some','getPictureTextBuffer','outputWidth','unshift','isChoiceEnabled','\x1bWrapJpBreak[0]','refreshDimmerBitmap','MAxdy','getTextAlignment','value','gainItem','addCommand','<COLORLOCK>','etypeId','currencyUnit','Window_Base_initialize','_messageOffsetY','VHsSX','Turkish','Romanian','CreateAutoColorRegExpListEntries','quantity','RhSFx','followers','English','VisuMZ_0_CoreEngine','Undefined','hasPictureText','\x1bWrapBreak[0]','Finnish','ALL','वाह','#acacac','SdxMH','paintOpacity','skill','prepareAutoSizeEscapeCharacters','ChoiceWindowMaxCols','maxChoiceWidth','TextJS','CreateAutoColorRegExpLists','Window_ItemList_drawItemNumber','Game_Map_refresh','_itemChoiceActorId','ActorID','Bitmap_drawTextTopAligned','cKkkM','startWait','হ্যালো','send','addedWidth','isAutoColorAffected','isChoiceWindow','<LEFT>','lastGainedObjectIcon','activate','start','_choiceListWindow','convertHardcodedEscapeReplacements','elHRY','_pictureTextRefresh','child_process','Unnamed.ttf','upright','_pictureTextWindow','HTxrw','mainFontFace','requestChoiceForegroundImage','black','こんにちは','updateForcedPlacement','choiceRows','obtainItem','_moveTargetX','defaultColor','You\x20do\x20not\x20have\x20a\x20language\x20CSV\x20set\x20up.\x0a','placeCancelButton','loadCustomFontsMessageCore','ChoiceWindowTextAlign','_dimmerSprite','setPictureText','green','resizePictureText','strokeRect','ParseItemNotetags','Game_Party_gainItem','_list','Tot\x20ziens','ConfigManager_makeData','ActionJS','</COLORLOCK>','Rows','jgiiu','ChoiceWindowDistance','Languages','getConfigValue','JMdsj','charAt','FontChangeValue','addContinuousShowTextCommands','processTextAlignmentChange','OffsetY','makeCommandListScriptCall','up\x20left','#f26c4f','CyaUj','dimColor2','apply','Spanish','callCancelHandler','messagePositionReset','PictureTextErase','convertBaseEscapeCharacters','QfdYl','addedHeight','processAutoColorWords','Bitmap_drawText','SplitJpCnCharacters','ParseAllNotetags','windowWidth','Tcyzh','ZkgaF','numVisibleRows','ElLwD','Au\x20revoir','Bonjour','clearPictureTextRefresh','CyEAz','statusText','MessageWindowXyOffsets','[0]','messageWidth','ehDaP','battleActionName','setupShuffleChoices','battle\x20party','convertButtonAssistEscapeCharacters','scale','itemChoiceAtypeId','अलविदा','IQDRr','Utxfn','outputHeight','MessageWindowProperties','34666RgVuiz','processMessageCoreEscapeActions','fFeiQ','lower-right','openness','_currentAutoSize','processDrawPicture','innerHeight','Window_Help_refresh','_itemChoiceAtypeId','DefaultLocale','fvWAp','changeChoiceBackgroundColor','currentCommand','Viszontlátásra','nQKhy','LineBreakSpace','erasePicture','wVkyb','QrpVU','Key','CheckCompatibility','toLowerCase','blt','itemChoiceItypeId','HIDE','xbCPs','includes','setPictureTextBuffer','gVarO','choiceListHelpWindowRect','Arrivederci','_colorLock','resetTextColor','pageup','Skills','OffsetX','addChoiceDistance','COMMONEVENT','dhGnY','gKmWM','_autoSizeRegexp','Sprite_Picture_update','Would\x20you\x20like\x20the\x20plugin\x20to\x20create\x20the\x20base\x20CSV\x20file?\x0a\x0a','colSpacing','ARRAYNUM','_pictureText','WeaponTypeID','ZuIVN','setMessageWindowWidth','setWaitMode','\x1bTEXTALIGNMENT','updateRelativePosition','processNewLine','_targets','lastGainedObjectQuantity','VariableID','normalColor','isMessageWindowWordWrap','BOLD','parse','psXtf','TextMacros','split','updateNameBoxMove','prepareShowTextCommand','setArmorChoice','bmpzc','rtl','drawBackPicture','rCPEI','description','match','ParseAddedText','setBackground','Window_ChoiceList_windowX','surprise','xIhbB','_textAlignment','setChoiceListMaxRows','createLocalizationCsvFile','instantTextSpeed','GYpkc','updateBackground','ConfigManager_applyData','updateOffsetPosition','addExtraShowChoices','clearRect','नमस्ते','messageWordWrap','updateChoiceListHelpWindowPlacement','VJWvI','_choiceIndexArray','autoPositionOffsetY','_showFast','innerWidth','ChoiceWindowMaxRows','width','requestChoiceBackgroundImage','rmVnj','isContinuePrepareShowTextCommands','getPictureText','setWordWrap','bFQBO','lowerleft','update','newPage','vnPEM','emerge','_messageWindow','_pictures','false','atypeId','menu','ConvertTextAutoColorRegExpFriendly','adjustShowChoiceDefault','updateHelp','text','system','isOptionValid','call','middlecenter','Good-bye','follower','LLeho','OCWMb','maxCols','_messagePositionReset','lowercenter','drawItemContents','_scriptCall','Czech','ceil','convertTextMacros','getPictureTextData','textWidth','TextColor%1','windowPadding','updateOverlappingY','middleleft','addWindow','prototype','isInputting','postFlushTextState','registerCommand','center','_autoColorActorNames','FontSmallerCap','Match','Window_Base_textSizeEx','MsgWindowOffsetY','eRuYT','#c69c6d','indexOf','\x1bi[%1]','left','jYuQe','isSkillTypeMatchForUse','pXeKo','Window_Message_clearFlags','brown','start\x20.\x5cdata','Window_Base_update','setupEvents','<%1>','up-center','upperright','1952oZeKak','setMessageWindowXyOffsets','mRpwP','processPreviousColor','eraseAllPictureTexts','안녕하세요','isRTL','setChoiceListMaxColumns','Game_Interpreter_setupChoices','DefaultOutlineWidth','KKbft','ParseArmorNotetags','clearActorNameAutoColor','updateXyOffsets','requestPictureTextRefreshAll','MinWidth','iconIndex','Window_Message_synchronizeNameBox','downcenter','_wordWrap','clampPlacementPosition','open','TextCodeActions','setChoiceMessageDistance','itemChoiceActorId','</RIGHT>','MdQwe','addContinuousShowChoices','setText','isChoiceVisible','_autoPositionTarget','faceName','lower-left','map','_pictureId','members','textSpeed','initTextAlignement','CwgnA','AutoColorRegExp','Armors','nmcUO','getChoiceListMaxRows','Window_Base_processAllText','up\x20right','tVKMl','path','_lastGainedItemData','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Halo','MaxRows','synchronizeNameBox','Game_Map_updateEvents','type','addMessageCoreCommands','RelativePXPY','Window_Base_changeTextColor','getChoiceMessageDistance','ARRAYFUNC','MessageTextDelay','Window_Options_isVolumeSymbol','makeDeepCopy','TextSpeed','join','COLORLOCK','Salut','_refreshPauseSign','visuMzTextLocaleStatusText'];_0xb9bf=function(){return _0x4fbd59;};return _0xb9bf();}var label='MessageCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x314eca(0x223)](function(_0x2aac06){const _0x442a55=_0x314eca;return _0x2aac06['status']&&_0x2aac06[_0x442a55(0x34d)][_0x442a55(0x321)]('['+label+']');})[0x0];VisuMZ[label][_0x314eca(0x17c)]=VisuMZ[label][_0x314eca(0x17c)]||{},VisuMZ[_0x314eca(0x13a)]=function(_0x1730c4,_0x33807a){const _0x1bc64c=_0x314eca;for(const _0xe79181 in _0x33807a){if(_0xe79181[_0x1bc64c(0x34e)](/(.*):(.*)/i)){const _0x493cf2=String(RegExp['$1']),_0x3c05f5=String(RegExp['$2'])[_0x1bc64c(0x42b)]()[_0x1bc64c(0x1ab)]();let _0x24458a,_0x1dbcee,_0x23315e;switch(_0x3c05f5){case'NUM':_0x24458a=_0x33807a[_0xe79181]!==''?Number(_0x33807a[_0xe79181]):0x0;break;case _0x1bc64c(0x333):_0x1dbcee=_0x33807a[_0xe79181]!==''?JSON[_0x1bc64c(0x342)](_0x33807a[_0xe79181]):[],_0x24458a=_0x1dbcee['map'](_0x210ce9=>Number(_0x210ce9));break;case _0x1bc64c(0x1c0):_0x24458a=_0x33807a[_0xe79181]!==''?eval(_0x33807a[_0xe79181]):null;break;case'ARRAYEVAL':_0x1dbcee=_0x33807a[_0xe79181]!==''?JSON[_0x1bc64c(0x342)](_0x33807a[_0xe79181]):[],_0x24458a=_0x1dbcee[_0x1bc64c(0x3ce)](_0x2dc7fa=>eval(_0x2dc7fa));break;case _0x1bc64c(0x533):_0x24458a=_0x33807a[_0xe79181]!==''?JSON['parse'](_0x33807a[_0xe79181]):'';break;case _0x1bc64c(0x13d):_0x1dbcee=_0x33807a[_0xe79181]!==''?JSON['parse'](_0x33807a[_0xe79181]):[],_0x24458a=_0x1dbcee[_0x1bc64c(0x3ce)](_0x4f76b6=>JSON[_0x1bc64c(0x342)](_0x4f76b6));break;case _0x1bc64c(0x181):_0x24458a=_0x33807a[_0xe79181]!==''?new Function(JSON['parse'](_0x33807a[_0xe79181])):new Function(_0x1bc64c(0x3fc));break;case _0x1bc64c(0x3e7):_0x1dbcee=_0x33807a[_0xe79181]!==''?JSON['parse'](_0x33807a[_0xe79181]):[],_0x24458a=_0x1dbcee[_0x1bc64c(0x3ce)](_0x131dfb=>new Function(JSON[_0x1bc64c(0x342)](_0x131dfb)));break;case _0x1bc64c(0x1b4):_0x24458a=_0x33807a[_0xe79181]!==''?String(_0x33807a[_0xe79181]):'';break;case _0x1bc64c(0x4fb):_0x1dbcee=_0x33807a[_0xe79181]!==''?JSON['parse'](_0x33807a[_0xe79181]):[],_0x24458a=_0x1dbcee['map'](_0x2da0b3=>String(_0x2da0b3));break;case _0x1bc64c(0x514):_0x23315e=_0x33807a[_0xe79181]!==''?JSON[_0x1bc64c(0x342)](_0x33807a[_0xe79181]):{},_0x1730c4[_0x493cf2]={},VisuMZ['ConvertParams'](_0x1730c4[_0x493cf2],_0x23315e);continue;case _0x1bc64c(0x20e):_0x1dbcee=_0x33807a[_0xe79181]!==''?JSON[_0x1bc64c(0x342)](_0x33807a[_0xe79181]):[],_0x24458a=_0x1dbcee[_0x1bc64c(0x3ce)](_0x1677dc=>VisuMZ['ConvertParams']({},JSON[_0x1bc64c(0x342)](_0x1677dc)));break;default:continue;}_0x1730c4[_0x493cf2]=_0x24458a;}}return _0x1730c4;},(_0xe4db8b=>{const _0x10c94f=_0x314eca,_0x372009=_0xe4db8b[_0x10c94f(0x1c6)];for(const _0x555a4f of dependencies){if(!Imported[_0x555a4f]){alert(_0x10c94f(0x3dd)[_0x10c94f(0x3ff)](_0x372009,_0x555a4f)),SceneManager[_0x10c94f(0x217)]();break;}}const _0x31b5dd=_0xe4db8b[_0x10c94f(0x34d)];if(_0x31b5dd[_0x10c94f(0x34e)](/\[Version[ ](.*?)\]/i)){const _0x3286ba=Number(RegExp['$1']);if(_0x3286ba!==VisuMZ[label][_0x10c94f(0x227)]){if(_0x10c94f(0x3b7)==='mjlPo')return![];else alert(_0x10c94f(0x41c)[_0x10c94f(0x3ff)](_0x372009,_0x3286ba)),SceneManager[_0x10c94f(0x217)]();}}if(_0x31b5dd[_0x10c94f(0x34e)](/\[Tier[ ](\d+)\]/i)){const _0x56906d=Number(RegExp['$1']);if(_0x56906d<tier)_0x10c94f(0x319)!==_0x10c94f(0x383)?(alert(_0x10c94f(0x266)[_0x10c94f(0x3ff)](_0x372009,_0x56906d,tier)),SceneManager['exit']()):(_0x2991fc=_0x2cc62b[_0x10c94f(0x4f0)](_0x3c5a78*_0x4e8947),_0x546e73=_0x5dccf8[_0x10c94f(0x4f0)](_0x52f623*_0x3051fc));else{if(_0x10c94f(0x476)!=='YsyMi'){const _0x45b4d6=_0x3db068['$1'][_0x10c94f(0x345)](',')[_0x10c94f(0x3ce)](_0x4d5243=>_0x3378ab(_0x4d5243)||0x0);for(const _0x3ffe55 of _0x45b4d6){if(!_0x2aae05['value'](_0x3ffe55))return![];}return!![];}else tier=Math[_0x10c94f(0x4f5)](_0x56906d,tier);}}VisuMZ[_0x10c94f(0x13a)](VisuMZ[label][_0x10c94f(0x17c)],_0xe4db8b['parameters']);})(pluginData),PluginManager[_0x314eca(0x396)](pluginData[_0x314eca(0x1c6)],_0x314eca(0x2d3),_0x3bf135=>{const _0x541a67=_0x314eca;VisuMZ[_0x541a67(0x13a)](_0x3bf135,_0x3bf135);const _0x5e9a57=Number(_0x3bf135[_0x541a67(0x47c)])||0x0;$gameSystem[_0x541a67(0x3c4)](_0x5e9a57);}),PluginManager[_0x314eca(0x396)](pluginData[_0x314eca(0x1c6)],'ChoiceWindowProperties',_0xe22155=>{const _0x4e7452=_0x314eca;VisuMZ[_0x4e7452(0x13a)](_0xe22155,_0xe22155);const _0x2bea55=_0xe22155['LineHeight']||$gameSystem[_0x4e7452(0x1f5)]()||0x1,_0x50e1f9=_0xe22155[_0x4e7452(0x3bc)]??0x60,_0x110b21=_0xe22155[_0x4e7452(0x3df)]||$gameSystem['getChoiceListMaxRows']()||0x1,_0x5aa7aa=_0xe22155[_0x4e7452(0x14b)]||$gameSystem[_0x4e7452(0x264)]()||0x1,_0x602ff7=_0xe22155['TextAlign'][_0x4e7452(0x31c)]()||_0x4e7452(0x174);$gameSystem[_0x4e7452(0x1cd)](_0x2bea55),$gameSystem[_0x4e7452(0x167)](_0x50e1f9),$gameSystem[_0x4e7452(0x355)](_0x110b21),$gameSystem['setChoiceListMaxColumns'](_0x5aa7aa),$gameSystem[_0x4e7452(0x1f9)](_0x602ff7);}),PluginManager['registerCommand'](pluginData[_0x314eca(0x1c6)],_0x314eca(0x305),_0x3ca0fc=>{const _0x4a034d=_0x314eca;VisuMZ[_0x4a034d(0x13a)](_0x3ca0fc,_0x3ca0fc);const _0x1ad402=_0x3ca0fc[_0x4a034d(0x2d1)]||$gameSystem[_0x4a034d(0x536)]()||0x1,_0xc36734=_0x3ca0fc['Width']||$gameSystem[_0x4a034d(0x41b)]()||0x1;$gameTemp[_0x4a034d(0x4ea)]=!![];const _0x5be0cf=_0x3ca0fc[_0x4a034d(0x237)][_0x4a034d(0x31c)]();$gameSystem[_0x4a034d(0x41d)](_0x1ad402),$gameSystem[_0x4a034d(0x337)](_0xc36734);if(['true',_0x4a034d(0x375)][_0x4a034d(0x321)](_0x5be0cf)){if(_0x4a034d(0x318)!==_0x4a034d(0x318))return _0x5ac310[_0x4a034d(0x1f5)]()+0x8;else $gameSystem['setMessageWindowWordWrap'](eval(_0x5be0cf));}const _0x2163b3=SceneManager['_scene']['_messageWindow'];if(_0x2163b3){if(_0x4a034d(0x51c)!==_0x4a034d(0x51c))return this[_0x4a034d(0x166)]()[_0x4a034d(0x165)];else _0x2163b3[_0x4a034d(0x4ed)](),_0x2163b3['updateDimensions'](),_0x2163b3[_0x4a034d(0x10e)]();}}),PluginManager[_0x314eca(0x396)](pluginData['name'],_0x314eca(0x2f7),_0x31a4dd=>{const _0x206cfc=_0x314eca;VisuMZ[_0x206cfc(0x13a)](_0x31a4dd,_0x31a4dd),$gameSystem['setMessageWindowXyOffsets'](_0x31a4dd[_0x206cfc(0x32a)],_0x31a4dd['OffsetY']);const _0x3e6338=SceneManager[_0x206cfc(0x180)][_0x206cfc(0x373)];_0x3e6338&&(_0x206cfc(0x27d)!=='MAxdy'?this[_0x206cfc(0x3dc)][_0x206cfc(0x3e2)]=0x1:(_0x3e6338[_0x206cfc(0x4ed)](),_0x3e6338[_0x206cfc(0x531)](),_0x3e6338[_0x206cfc(0x10e)]()));}),PluginManager['registerCommand'](pluginData[_0x314eca(0x1c6)],_0x314eca(0x205),_0x2a5075=>{const _0x2161a3=_0x314eca;VisuMZ[_0x2161a3(0x13a)](_0x2a5075,_0x2a5075),$gameMessage[_0x2161a3(0x426)](_0x2a5075[_0x2161a3(0x33e)]||0x0,_0x2a5075[_0x2161a3(0x335)]||0x0);const _0x3a72ee=$gameTemp['getLastPluginCommandInterpreter']();if(_0x3a72ee)_0x3a72ee[_0x2161a3(0x338)]('message');}),PluginManager['registerCommand'](pluginData[_0x314eca(0x1c6)],_0x314eca(0x411),_0x1b4cbc=>{const _0x581522=_0x314eca;VisuMZ['ConvertParams'](_0x1b4cbc,_0x1b4cbc),$gameMessage[_0x581522(0x348)](_0x1b4cbc[_0x581522(0x33e)]||0x0,_0x1b4cbc['ArmorTypeID']||0x0,_0x1b4cbc[_0x581522(0x1bc)]||0x0);const _0x22bf3e=$gameTemp[_0x581522(0x1ae)]();if(_0x22bf3e)_0x22bf3e[_0x581522(0x338)](_0x581522(0x506));}),PluginManager[_0x314eca(0x396)](pluginData['name'],'SelectSkill',_0xce0581=>{const _0x47c0a9=_0x314eca;VisuMZ[_0x47c0a9(0x13a)](_0xce0581,_0xce0581),$gameMessage['setSkillChoice'](_0xce0581[_0x47c0a9(0x33e)]||0x0,_0xce0581[_0x47c0a9(0x2a2)]||0x0,_0xce0581[_0x47c0a9(0x4b6)]||0x0);const _0x541eb6=$gameTemp['getLastPluginCommandInterpreter']();if(_0x541eb6)_0x541eb6[_0x47c0a9(0x338)]('message');}),PluginManager[_0x314eca(0x396)](pluginData[_0x314eca(0x1c6)],_0x314eca(0x4e4),_0x39c9a9=>{const _0x55a8a6=_0x314eca;VisuMZ['ConvertParams'](_0x39c9a9,_0x39c9a9);const _0x502612=_0x39c9a9['PictureIDs']||[],_0x3a572c=_0x39c9a9[_0x55a8a6(0x45a)]||0x0,_0x4b5ab8=[_0x55a8a6(0x48d),'up',_0x55a8a6(0x3ac),_0x55a8a6(0x3a1),_0x55a8a6(0x397),_0x55a8a6(0x410),_0x55a8a6(0x36e),_0x55a8a6(0x498),_0x55a8a6(0x51e)];for(const _0x3f22ea of _0x502612){$gameScreen[_0x55a8a6(0x322)](_0x3f22ea,_0x3a572c);for(const _0x24e00c of _0x4b5ab8){if(_0x39c9a9[_0x24e00c]===undefined)continue;$gameScreen[_0x55a8a6(0x2c6)](_0x3f22ea,_0x39c9a9[_0x24e00c],_0x24e00c);}}}),PluginManager[_0x314eca(0x396)](pluginData[_0x314eca(0x1c6)],_0x314eca(0x2e5),_0x5e4195=>{const _0x5e5709=_0x314eca;VisuMZ[_0x5e5709(0x13a)](_0x5e4195,_0x5e4195);const _0x46a98e=_0x5e4195[_0x5e5709(0x248)]||[];for(const _0x71cf0d of _0x46a98e){'nDAic'==='nDAic'?($gameScreen['eraseAllPictureTexts'](_0x71cf0d),$gameScreen[_0x5e5709(0x504)](_0x71cf0d)):_0x7ad205>=0x0?this['y']-=_0x55d2f3:this['y']=_0x43d9b1[_0x5e5709(0x25c)]((_0x2cbeea-this[_0x5e5709(0x501)]-_0x3e9a04)/0x2);}}),PluginManager[_0x314eca(0x396)](pluginData['name'],_0x314eca(0x17b),_0x375743=>{const _0x338078=_0x314eca;$gameScreen[_0x338078(0x3bb)]();}),VisuMZ['MessageCore'][_0x314eca(0x43a)]=Scene_Boot[_0x314eca(0x393)][_0x314eca(0x4aa)],Scene_Boot[_0x314eca(0x393)][_0x314eca(0x4aa)]=function(){const _0x4b033d=_0x314eca;VisuMZ[_0x4b033d(0x19b)][_0x4b033d(0x43a)][_0x4b033d(0x37e)](this),VisuMZ['MessageCore'][_0x4b033d(0x31b)](),this[_0x4b033d(0x1ca)](),this[_0x4b033d(0x50b)](),this[_0x4b033d(0x447)](),this[_0x4b033d(0x4cd)]();},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x31b)]=function(){const _0x4f0453=_0x314eca;if(Imported[_0x4f0453(0x172)]&&VisuMZ[_0x4f0453(0xfd)]['version']<1.09){if('rCPEI'!==_0x4f0453(0x34c))this['textLocale']=_0xbb2f9b[_0x4f0453(0x19b)][_0x4f0453(0x17c)]['Localization']['DefaultLocale']||'English';else{let _0x459235='';_0x459235+=_0x4f0453(0x1e1),_0x459235+='in\x20order\x20for\x20VisuMZ_1_MessageCore\x20to\x20work.',alert(_0x459235),SceneManager[_0x4f0453(0x217)]();}}},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x528)]=function(_0xb1e69e){const _0x399c8c=_0x314eca,_0x2861ef=VisuMZ[_0x399c8c(0x19b)][_0x399c8c(0x17c)][_0xb1e69e];_0x2861ef['sort']((_0x1ddf3b,_0x180ef1)=>{const _0x475e2b=_0x399c8c;if(_0x475e2b(0x198)!==_0x475e2b(0x22a)){if(!_0x1ddf3b||!_0x180ef1)return-0x1;return _0x180ef1[_0x475e2b(0x39a)]['length']-_0x1ddf3b[_0x475e2b(0x39a)]['length'];}else _0x3fcedd=_0x4fad1f['floor']((this[_0x475e2b(0x501)]-_0x29cdcd[_0x475e2b(0x501)])/0x2);});},Scene_Boot['prototype'][_0x314eca(0x1ca)]=function(){const _0x3e910a=_0x314eca;VisuMZ['MessageCore'][_0x3e910a(0x528)](_0x3e910a(0x3c3));for(const _0x27bb95 of VisuMZ[_0x3e910a(0x19b)][_0x3e910a(0x17c)][_0x3e910a(0x3c3)]){if(_0x3e910a(0x133)===_0x3e910a(0x133)){_0x27bb95[_0x3e910a(0x39a)]=_0x27bb95[_0x3e910a(0x39a)][_0x3e910a(0x42b)](),_0x27bb95[_0x3e910a(0x448)]=new RegExp('\x1b'+_0x27bb95['Match'],'gi'),_0x27bb95[_0x3e910a(0x4a5)]='\x1b'+_0x27bb95['Match'];if(_0x27bb95[_0x3e910a(0x50a)]==='')_0x27bb95['textCodeResult']+='[0]';}else{_0x37a38b=_0x2393b0['replace'](/\x1b!/g,''),_0x1ef737=_0x2d7f1e[_0x3e910a(0x1e5)](/\x1b\|/g,''),_0x345c55=_0xc84ab7[_0x3e910a(0x1e5)](/\x1b\./g,'');const _0x58cb05=this['createTextState'](_0x32235a,0x0,0x0,0x0),_0xaa8ba3=this[_0x3e910a(0x47b)]();return _0x58cb05[_0x3e910a(0x1e9)]=![],this[_0x3e910a(0x12c)](_0x58cb05),this[_0x3e910a(0x439)](_0xaa8ba3),{'width':_0x58cb05[_0x3e910a(0x278)],'height':_0x58cb05['outputHeight']};}}},Scene_Boot[_0x314eca(0x393)][_0x314eca(0x50b)]=function(){const _0x2aaae0=_0x314eca;VisuMZ[_0x2aaae0(0x19b)]['SortObjectByKeyLength'](_0x2aaae0(0x541));for(const _0xa9c695 of VisuMZ['MessageCore'][_0x2aaae0(0x17c)][_0x2aaae0(0x541)]){if(_0x2aaae0(0x315)===_0x2aaae0(0x353)){if(_0x2c20d9[_0x2aaae0(0x470)]())return![];return this[_0x2aaae0(0x347)](_0x194008),this[_0x2aaae0(0x2d9)](_0x5d4211),this[_0x2aaae0(0x445)](_0x57384c),this['setWaitMode']('message'),!![];}else{_0xa9c695['textCodeCheck']=new RegExp('\x1b'+_0xa9c695[_0x2aaae0(0x39a)]+_0xa9c695[_0x2aaae0(0x50a)],'gi');if(_0xa9c695[_0x2aaae0(0x3f8)]!==''&&_0xa9c695[_0x2aaae0(0x3f8)]!==_0x2aaae0(0x290)){if('DTYWJ'===_0x2aaae0(0x417)){_0x5689e0=this['convertChoiceMacros'](_0x557742);if(this[_0x2aaae0(0x3ca)](_0x31f844)){const _0x23c5dc=this[_0x2aaae0(0x258)](_0xbedadb),_0x4694df=this[_0x2aaae0(0x27a)](_0x133e34);this['addCommand'](_0x23c5dc,_0x2aaae0(0x144),_0x4694df,_0x22546c);}_0x11ce34++;}else _0xa9c695[_0x2aaae0(0x4a5)]=new Function(_0x2aaae0(0x208)+_0xa9c695[_0x2aaae0(0x3f8)][_0x2aaae0(0x1e5)](/\\/g,'\x1b')+'\x27');}else{if(_0x2aaae0(0x323)!=='gVarO'){if(this['_MessageCoreSettings']===_0x2a0ff2)this[_0x2aaae0(0x256)]();if(this['_MessageCoreSettings'][_0x2aaae0(0x1b9)]===_0x5b1b6a)this[_0x2aaae0(0x256)]();return this[_0x2aaae0(0x3f9)][_0x2aaae0(0x1b9)];}else _0xa9c695[_0x2aaae0(0x4a5)]=_0xa9c695[_0x2aaae0(0x29d)];}}}},Scene_Boot[_0x314eca(0x393)][_0x314eca(0x447)]=function(){const _0x563b41=_0x314eca;for(const _0x1a76b4 of VisuMZ['MessageCore'][_0x563b41(0x17c)]['TextMacros']){_0x1a76b4['textCodeCheck']=new RegExp('\x5c['+_0x1a76b4[_0x563b41(0x39a)]+'\x5c]','gi');if(_0x1a76b4[_0x563b41(0x3f8)]!==''&&_0x1a76b4[_0x563b41(0x3f8)]!==_0x563b41(0x290)){let _0x1fece2=_0x1a76b4[_0x563b41(0x3f8)];_0x1fece2=_0x1fece2[_0x563b41(0x1e5)](/\\/g,'\x1b'),_0x1fece2=_0x1fece2[_0x563b41(0x1e5)]('\x27','\x5c\x27'),_0x1fece2=_0x1fece2[_0x563b41(0x1e5)]('\x22','\x5c\x22'),_0x1a76b4[_0x563b41(0x4a5)]=new Function(_0x563b41(0x208)+_0x1fece2+'\x27');}else _0x563b41(0x287)!==_0x563b41(0x3f4)?_0x1a76b4[_0x563b41(0x4a5)]=_0x1a76b4[_0x563b41(0x29d)]:(_0x5c7a10[_0x563b41(0x4bd)](_0x50bcb1),_0x59268e='');}},Scene_Boot['prototype'][_0x314eca(0x4cd)]=function(){const _0x17e536=_0x314eca,_0xadccef=VisuMZ[_0x17e536(0x19b)][_0x17e536(0x17c)][_0x17e536(0x525)];!VisuMZ[_0x17e536(0x2ec)]&&(VisuMZ['MessageCore'][_0x17e536(0x4de)]($dataClasses,_0xadccef[_0x17e536(0x1f4)]),VisuMZ[_0x17e536(0x19b)]['AddAutoColor']($dataSkills,_0xadccef[_0x17e536(0x329)]),VisuMZ[_0x17e536(0x19b)][_0x17e536(0x4de)]($dataItems,_0xadccef[_0x17e536(0x102)]),VisuMZ['MessageCore']['AddAutoColor']($dataWeapons,_0xadccef[_0x17e536(0x26b)]),VisuMZ[_0x17e536(0x19b)][_0x17e536(0x4de)]($dataArmors,_0xadccef[_0x17e536(0x3d5)]),VisuMZ[_0x17e536(0x19b)][_0x17e536(0x4de)]($dataEnemies,_0xadccef['Enemies']),VisuMZ['MessageCore']['AddAutoColor']($dataStates,_0xadccef['States'])),VisuMZ[_0x17e536(0x19b)][_0x17e536(0x29e)]();},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x52f)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x314eca(0x4da),'</B>',_0x314eca(0x192),_0x314eca(0x203),_0x314eca(0x2ab),_0x314eca(0x48c),_0x314eca(0x42a),_0x314eca(0x511),_0x314eca(0x4e5),_0x314eca(0x3c6),_0x314eca(0x282),_0x314eca(0x2d0),_0x314eca(0x16e),')))',_0x314eca(0x46d),_0x314eca(0x254),_0x314eca(0x519),_0x314eca(0x252),'PICTURE',_0x314eca(0x489),_0x314eca(0x32c),_0x314eca(0x15d),'SHOW',_0x314eca(0x31f),'ENABLE',_0x314eca(0x1cf),'SWITCH','SWITCHES',_0x314eca(0x294),_0x314eca(0x210)],VisuMZ[_0x314eca(0x19b)][_0x314eca(0x4de)]=function(_0x3a9958,_0x1f0698){const _0x146aa6=_0x314eca;if(_0x1f0698<=0x0)return;const _0x2ed238=_0x3a9958;for(const _0x1fc226 of _0x2ed238){if(!_0x1fc226)continue;VisuMZ[_0x146aa6(0x19b)]['CreateAutoColorFor'](_0x1fc226,_0x1f0698);}},VisuMZ['MessageCore'][_0x314eca(0x29e)]=function(){const _0x309c69=_0x314eca;VisuMZ[_0x309c69(0x19b)][_0x309c69(0x3d4)]=[];for(let _0x2d2b0f=0x1;_0x2d2b0f<=0x1f;_0x2d2b0f++){if('xYbdR'===_0x309c69(0x3c7))return _0x4aa5f4[_0x309c69(0x28f)]&&(_0x1dddc4=_0x16c0c7[_0x309c69(0x1e5)](/<Up (?:KEY|BUTTON)>/gi,this[_0x309c69(0x520)]('up')),_0x5c79d4=_0x1e5149[_0x309c69(0x1e5)](/<Left (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x309c69(0x3a1))),_0xa853bb=_0x198944['replace'](/<Right (?:KEY|BUTTON)>/gi,this[_0x309c69(0x520)](_0x309c69(0x410))),_0x50b6fd=_0x33695b[_0x309c69(0x1e5)](/<Down (?:KEY|BUTTON)>/gi,this[_0x309c69(0x520)]('down')),_0x205a29=_0x2d0507[_0x309c69(0x1e5)](/<Ok (?:KEY|BUTTON)>/gi,this[_0x309c69(0x520)]('ok')),_0x5196ca=_0x46b736[_0x309c69(0x1e5)](/<Cancel (?:KEY|BUTTON)>/gi,this[_0x309c69(0x520)](_0x309c69(0x49d))),_0x3667d6=_0x571448[_0x309c69(0x1e5)](/<Menu (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x309c69(0x377))),_0x49a58d=_0x4925fe['replace'](/<Shift (?:KEY|BUTTON)>/gi,this[_0x309c69(0x520)](_0x309c69(0x136))),_0x2f9ac7=_0x317ca5[_0x309c69(0x1e5)](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this[_0x309c69(0x520)](_0x309c69(0x328))),_0x8e90e7=_0x33b97c[_0x309c69(0x1e5)](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this[_0x309c69(0x520)](_0x309c69(0x130)))),_0x10eebc;else{const _0x4d3f5c=_0x309c69(0x38e)[_0x309c69(0x3ff)](_0x2d2b0f),_0x210622=VisuMZ[_0x309c69(0x19b)][_0x309c69(0x17c)][_0x309c69(0x525)][_0x4d3f5c];_0x210622[_0x309c69(0x23f)]((_0x1010ae,_0x1d11f6)=>{const _0x265703=_0x309c69;if(!_0x1010ae||!_0x1d11f6)return-0x1;return _0x1d11f6['length']-_0x1010ae[_0x265703(0x428)];}),this[_0x309c69(0x28a)](_0x210622,_0x2d2b0f);}}},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x28a)]=function(_0x47a15b,_0x50185a){const _0x51f896=_0x314eca;for(const _0x49e3ae of _0x47a15b){if(_0x51f896(0xfe)===_0x51f896(0x463)){const _0x2ae423=this[_0x51f896(0x230)](),_0x36dedd=_0x2ae423+this[_0x51f896(0x4bb)](_0x22c2f6);let _0x2a9f7e='';if(_0x36dedd[_0x51f896(0x34e)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x2a9f7e=_0x2f0528(_0x160a68['$1'])['trim']();else _0x36dedd['match'](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x2a9f7e=_0x551719(_0x22058c['$2'])[_0x51f896(0x1ab)]());return _0x2a9f7e;}else{if(_0x49e3ae[_0x51f896(0x428)]<=0x0)continue;if(/^\d+$/[_0x51f896(0x1a7)](_0x49e3ae))continue;let _0x25571c=VisuMZ[_0x51f896(0x19b)]['ConvertTextAutoColorRegExpFriendly'](_0x49e3ae);if(_0x49e3ae[_0x51f896(0x34e)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x4ee057=new RegExp(_0x25571c,'i');else{if('VTpjl'!=='gFqjJ')var _0x4ee057=new RegExp('\x5cb'+_0x25571c+'\x5cb','g');else return this[_0x51f896(0x180)]&&this[_0x51f896(0x180)][_0x51f896(0x19c)]===_0x98df18;}VisuMZ[_0x51f896(0x19b)][_0x51f896(0x3d4)][_0x51f896(0x4bd)]([_0x4ee057,_0x51f896(0x437)[_0x51f896(0x3ff)](_0x50185a,_0x49e3ae)]);}}},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x378)]=function(_0x39a60c){const _0x31ca09=_0x314eca;return _0x39a60c=_0x39a60c[_0x31ca09(0x1e5)](/(\W)/gi,(_0x854f61,_0x5c209c)=>_0x31ca09(0x23d)[_0x31ca09(0x3ff)](_0x5c209c)),_0x39a60c;},VisuMZ['MessageCore']['ParseClassNotetags']=VisuMZ[_0x314eca(0x465)],VisuMZ[_0x314eca(0x465)]=function(_0x1e97ff){const _0x4ccd30=_0x314eca;VisuMZ[_0x4ccd30(0x19b)][_0x4ccd30(0x465)]['call'](this,_0x1e97ff);const _0x5471db=VisuMZ[_0x4ccd30(0x19b)][_0x4ccd30(0x17c)][_0x4ccd30(0x525)];VisuMZ[_0x4ccd30(0x19b)][_0x4ccd30(0x200)](_0x1e97ff,_0x5471db['Classes']);},VisuMZ[_0x314eca(0x19b)]['ParseSkillNotetags']=VisuMZ[_0x314eca(0x471)],VisuMZ['ParseSkillNotetags']=function(_0x26bec0){const _0x30c020=_0x314eca;VisuMZ['MessageCore']['ParseSkillNotetags'][_0x30c020(0x37e)](this,_0x26bec0);const _0x5c0cad=VisuMZ[_0x30c020(0x19b)][_0x30c020(0x17c)]['AutoColor'];VisuMZ[_0x30c020(0x19b)][_0x30c020(0x200)](_0x26bec0,_0x5c0cad[_0x30c020(0x329)]);},0x7,VisuMZ[_0x314eca(0x19b)][_0x314eca(0x2ca)]=VisuMZ[_0x314eca(0x2ca)],VisuMZ[_0x314eca(0x2ca)]=function(_0x55e254){const _0x3caeb3=_0x314eca;VisuMZ[_0x3caeb3(0x19b)][_0x3caeb3(0x2ca)][_0x3caeb3(0x37e)](this,_0x55e254);const _0x25c545=VisuMZ['MessageCore'][_0x3caeb3(0x17c)]['AutoColor'];VisuMZ[_0x3caeb3(0x19b)]['CreateAutoColorFor'](_0x55e254,_0x25c545[_0x3caeb3(0x102)]);},VisuMZ['MessageCore'][_0x314eca(0x18c)]=VisuMZ[_0x314eca(0x18c)],VisuMZ[_0x314eca(0x18c)]=function(_0x138dc1){const _0xb3e167=_0x314eca;VisuMZ[_0xb3e167(0x19b)][_0xb3e167(0x18c)][_0xb3e167(0x37e)](this,_0x138dc1);const _0x49b929=VisuMZ[_0xb3e167(0x19b)][_0xb3e167(0x17c)][_0xb3e167(0x525)];VisuMZ[_0xb3e167(0x19b)]['CreateAutoColorFor'](_0x138dc1,_0x49b929[_0xb3e167(0x26b)]);},VisuMZ['MessageCore']['ParseArmorNotetags']=VisuMZ[_0x314eca(0x3b8)],VisuMZ[_0x314eca(0x3b8)]=function(_0x4e5630){const _0x24989e=_0x314eca;VisuMZ['MessageCore'][_0x24989e(0x3b8)]['call'](this,_0x4e5630);const _0x22b18d=VisuMZ[_0x24989e(0x19b)][_0x24989e(0x17c)]['AutoColor'];VisuMZ[_0x24989e(0x19b)]['CreateAutoColorFor'](_0x4e5630,_0x22b18d['Armors']);},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x54a)]=VisuMZ[_0x314eca(0x54a)],VisuMZ[_0x314eca(0x54a)]=function(_0x2d26a3){const _0x4e3643=_0x314eca;VisuMZ[_0x4e3643(0x19b)][_0x4e3643(0x54a)][_0x4e3643(0x37e)](this,_0x2d26a3);const _0x5a9422=VisuMZ[_0x4e3643(0x19b)][_0x4e3643(0x17c)][_0x4e3643(0x525)];VisuMZ[_0x4e3643(0x19b)][_0x4e3643(0x200)](_0x2d26a3,_0x5a9422['Enemies']);},VisuMZ[_0x314eca(0x19b)]['ParseStateNotetags']=VisuMZ[_0x314eca(0x4b9)],VisuMZ[_0x314eca(0x4b9)]=function(_0x5d4a6a){const _0x9e5867=_0x314eca;VisuMZ['MessageCore'][_0x9e5867(0x4b9)][_0x9e5867(0x37e)](this,_0x5d4a6a);const _0x14e42d=VisuMZ[_0x9e5867(0x19b)][_0x9e5867(0x17c)][_0x9e5867(0x525)];VisuMZ[_0x9e5867(0x19b)][_0x9e5867(0x200)](_0x5d4a6a,_0x14e42d[_0x9e5867(0x105)]);},VisuMZ['MessageCore']['CreateAutoColorFor']=function(_0x348bc4,_0x3fb047){const _0x34b369=_0x314eca;if(_0x3fb047<=0x0)return;const _0x2f4f19=VisuMZ[_0x34b369(0x19b)]['Settings'][_0x34b369(0x525)][_0x34b369(0x1dc)+_0x3fb047];let _0x6482c=_0x348bc4[_0x34b369(0x1c6)]['trim']();if(/^\d+$/[_0x34b369(0x1a7)](_0x6482c))return;if(VisuMZ[_0x34b369(0x19b)][_0x34b369(0x52f)][_0x34b369(0x321)](_0x6482c[_0x34b369(0x42b)]()))return;_0x6482c=_0x6482c[_0x34b369(0x1e5)](/\\I\[(\d+)\]/gi,''),_0x6482c=_0x6482c[_0x34b369(0x1e5)](/\x1bI\[(\d+)\]/gi,'');if(_0x6482c['length']<=0x0)return;if(_0x6482c['match'](/-----/i))return;_0x2f4f19[_0x34b369(0x4bd)](_0x6482c);},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x435)]=Scene_Boot[_0x314eca(0x393)][_0x314eca(0x25a)],Scene_Boot[_0x314eca(0x393)][_0x314eca(0x25a)]=function(){const _0x11021a=_0x314eca;VisuMZ['MessageCore'][_0x11021a(0x435)][_0x11021a(0x37e)](this),this[_0x11021a(0x2c3)]();},Scene_Boot[_0x314eca(0x393)][_0x314eca(0x2c3)]=function(){const _0x242094=_0x314eca,_0x10f738=VisuMZ[_0x242094(0x19b)][_0x242094(0x17c)]['CustomFonts']||[];for(const _0x300a4d of _0x10f738){if(!_0x300a4d)continue;const _0x468892=_0x300a4d[_0x242094(0x4a0)];if(_0x468892[_0x242094(0x1ab)]()==='')continue;if(_0x468892[_0x242094(0x31c)]()[_0x242094(0x1ab)]()===_0x242094(0x22f))continue;const _0x213e3b=_0x300a4d['Filename'];if(_0x213e3b===_0x242094(0x2b4))continue;FontManager[_0x242094(0x1bd)](_0x468892,_0x213e3b);}},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x1c3)]=DataManager[_0x314eca(0x126)],DataManager[_0x314eca(0x126)]=function(){const _0x2bb771=_0x314eca;VisuMZ[_0x2bb771(0x19b)]['DataManager_loadDatabase']['call'](this),this[_0x2bb771(0x23c)]();},DataManager[_0x314eca(0x23c)]=function(){const _0x1301cf=_0x314eca;if(!TextManager[_0x1301cf(0x13c)]())return;const _0x427cdc=VisuMZ[_0x1301cf(0x19b)][_0x1301cf(0x17c)][_0x1301cf(0x17a)],_0x10a274=_0x427cdc[_0x1301cf(0x20d)]||'';if(!_0x10a274)return;const _0x415c6d=_0x1301cf(0x1e0),_0x5bf7fb=new XMLHttpRequest(),_0x5543fd=_0x1301cf(0x10c)+_0x10a274;window[_0x415c6d]=null,_0x5bf7fb[_0x1301cf(0x3c2)]('GET',_0x5543fd),_0x5bf7fb['overrideMimeType'](_0x1301cf(0x125)),_0x5bf7fb[_0x1301cf(0x543)]=()=>this['onLocalizationXhrLoad'](_0x5bf7fb,_0x415c6d),_0x5bf7fb[_0x1301cf(0x25b)]=()=>this[_0x1301cf(0x473)](),_0x5bf7fb[_0x1301cf(0x2a7)]();},DataManager['onLocalizationXhrLoad']=function(_0x38a9dd,_0xfaea17){const _0x43254d=_0x314eca;if(_0x38a9dd['status']>=0x190)return;const _0x407cfe=_0x38a9dd['responseText'];window[_0xfaea17]=VisuMZ[_0x43254d(0x19b)][_0x43254d(0x154)](_0x407cfe);},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x154)]=function(_0x4808c){const _0x118cfb=_0x314eca,_0x4f944e=_0x4808c[_0x118cfb(0x345)]('\x0a'),_0xeec869=_0x4f944e[0x0][_0x118cfb(0x345)](';'),_0x5cd86f={};return _0x4f944e[_0x118cfb(0x207)](0x1)[_0x118cfb(0x17d)](_0xec04f4=>{const _0x4e1f46=_0x118cfb;let _0x30eb6e=[],_0x44b864='',_0x2dd1f1=![];for(let _0x5114e8=0x0;_0x5114e8<_0xec04f4['length'];_0x5114e8++){let _0x241eb7=_0xec04f4[_0x5114e8];if(_0x241eb7==='\x22')_0x2dd1f1&&_0xec04f4[_0x5114e8+0x1]==='\x22'?_0x4e1f46(0x4db)===_0x4e1f46(0x4db)?(_0x44b864+=_0x241eb7,_0x5114e8++):(_0x1842ae=_0x4e1f46(0x4bf),_0x5ede47(_0x59279c),this[_0x4e1f46(0x356)](),this['openLocalizationFolder'](),_0x10f1d0=''):_0x2dd1f1=!_0x2dd1f1;else _0x241eb7===';'&&!_0x2dd1f1?(_0x30eb6e[_0x4e1f46(0x4bd)](_0x44b864),_0x44b864=''):_0x4e1f46(0x371)!==_0x4e1f46(0x2b7)?_0x44b864+=_0x241eb7:_0x5a2f0e='CSV\x20file\x20cannot\x20be\x20created.\x0aPlease\x20enter\x20Playtest\x20mode.\x0a';}if(_0x44b864)_0x30eb6e[_0x4e1f46(0x4bd)](_0x44b864);const _0x18cad8=_0x30eb6e[0x0][_0x4e1f46(0x1e5)](/^"|"$/g,'')['toLowerCase']()[_0x4e1f46(0x1ab)]();_0x5cd86f[_0x18cad8]=_0xeec869['slice'](0x1)[_0x4e1f46(0x45d)]((_0x549008,_0x2b7ba6,_0xc8e708)=>{return _0x549008[_0x2b7ba6]=(_0x30eb6e[_0xc8e708+0x1]||'')['replace'](/^"|"$/g,''),_0x549008;},{});}),_0x5cd86f;},DataManager[_0x314eca(0x473)]=function(){const _0x144c3e=_0x314eca;let _0xd695d5='';_0xd695d5+=_0x144c3e(0x2c1),_0xd695d5+=_0x144c3e(0x331);if(confirm(_0xd695d5)){if(_0x144c3e(0x4cf)!==_0x144c3e(0xfc)){if(Utils['isOptionValid'](_0x144c3e(0x1a7)))_0xd695d5=_0x144c3e(0x4bf),alert(_0xd695d5),this[_0x144c3e(0x356)](),this[_0x144c3e(0x169)](),_0xd695d5='';else{if('kPFWg'===_0x144c3e(0x308)){if(this['_pictureText']===_0x1ad76b)this[_0x144c3e(0x408)]();const _0x48358c=this[_0x144c3e(0x400)](_0x1fc02a);return this[_0x144c3e(0x334)][_0x48358c]=this[_0x144c3e(0x334)][_0x48358c]||{},this['_pictureText'][_0x48358c];}else _0xd695d5=_0x144c3e(0x4fd);}}else _0x3084e7['x']-=_0x130979[_0x144c3e(0x1a1)];}else _0xd695d5=_0x144c3e(0x168);_0xd695d5+='Please\x20restart\x20the\x20game.',alert(_0xd695d5),SceneManager[_0x144c3e(0x217)]();},DataManager[_0x314eca(0x356)]=function(){const _0x3c66f8=_0x314eca,_0x10a2d7=[_0x3c66f8(0x31a),'English',_0x3c66f8(0x269),_0x3c66f8(0x1cb),_0x3c66f8(0x530),_0x3c66f8(0x389),'Danish','Dutch',_0x3c66f8(0x293),_0x3c66f8(0x1a4),_0x3c66f8(0x4d6),_0x3c66f8(0x25d),_0x3c66f8(0x53d),'Hungarian',_0x3c66f8(0x4a3),_0x3c66f8(0x484),_0x3c66f8(0x4fe),_0x3c66f8(0x1d4),_0x3c66f8(0x4ca),_0x3c66f8(0x44e),_0x3c66f8(0x420),_0x3c66f8(0x289),'Russian','Slovak',_0x3c66f8(0x2e2),_0x3c66f8(0x453),_0x3c66f8(0x182),_0x3c66f8(0x23e),_0x3c66f8(0x288)],_0x2b49fa=[_0x3c66f8(0x4df),'Hello',_0x3c66f8(0x2a6),'你好','你好','Ahoj','Hej','Hallo','Hei',_0x3c66f8(0x2f3),_0x3c66f8(0x19f),'Γειά\x20σου',_0x3c66f8(0x35e),_0x3c66f8(0x162),_0x3c66f8(0x3de),_0x3c66f8(0x47e),_0x3c66f8(0x2bb),_0x3c66f8(0x3b2),'Hei','Cześć',_0x3c66f8(0x54c),_0x3c66f8(0x3ee),'Привет',_0x3c66f8(0x1f8),_0x3c66f8(0x219),_0x3c66f8(0x48a),'வணக்கம்',_0x3c66f8(0x4ce),_0x3c66f8(0x175)],_0x39d6d0=[_0x3c66f8(0x46f),_0x3c66f8(0x380),_0x3c66f8(0xfb),'再见','再見',_0x3c66f8(0x4f6),_0x3c66f8(0x12f),_0x3c66f8(0x2cd),_0x3c66f8(0x1c1),_0x3c66f8(0x2f2),'Auf\x20Wiedersehen',_0x3c66f8(0x1a0),_0x3c66f8(0x301),_0x3c66f8(0x314),_0x3c66f8(0x4c7),_0x3c66f8(0x325),_0x3c66f8(0x103),_0x3c66f8(0x547),'Ha\x20det',_0x3c66f8(0x10d),_0x3c66f8(0x44d),_0x3c66f8(0x4be),'До\x20свидания','Zbohom',_0x3c66f8(0x1b5),_0x3c66f8(0x4ab),_0x3c66f8(0x522),'ลาก่อน','Hoşça\x20kal'],_0x1c4015=[_0x3c66f8(0x1d6),_0x3c66f8(0x1d6),_0x3c66f8(0x176),'哇','哇','Ó','Wow',_0x3c66f8(0x14d),_0x3c66f8(0x157),'Waouh','Wow','Ουάου',_0x3c66f8(0x295),'Hűha',_0x3c66f8(0x21e),_0x3c66f8(0x1d6),'ワオ','와우','Oi','O',_0x3c66f8(0x509),_0x3c66f8(0x509),_0x3c66f8(0x45b),'Ó','Guau','Oj',_0x3c66f8(0x173),_0x3c66f8(0x12b),'Vay'],_0x5df624=[_0x10a2d7,_0x2b49fa,_0x39d6d0,_0x1c4015],_0x2a9bc1=_0x5df624[_0x3c66f8(0x3ce)](_0x10f88d=>_0x10f88d[_0x3c66f8(0x3ec)](';'))[_0x3c66f8(0x3ec)]('\x0a'),_0x247c26=VisuMZ[_0x3c66f8(0x19b)]['Settings'][_0x3c66f8(0x17a)],_0x39604c=_0x247c26[_0x3c66f8(0x20d)]||_0x3c66f8(0x464),_0xa4c8a9=require(_0x3c66f8(0x3db)),_0x13ea27=_0xa4c8a9[_0x3c66f8(0x52c)](process[_0x3c66f8(0x535)]['filename']),_0x583324=_0xa4c8a9['join'](_0x13ea27,'data/'),_0x40b92d=_0x583324+_0x39604c,_0x49b681=require('fs');return _0x49b681[_0x3c66f8(0x451)](_0x40b92d,_0x2a9bc1),_0x40b92d;},DataManager[_0x314eca(0x169)]=function(){const _0x152df7=_0x314eca,{exec:_0x1b8d41}=require(_0x152df7(0x2b3));_0x1b8d41(_0x152df7(0x3a7)),_0x1b8d41(_0x152df7(0x134));},SceneManager[_0x314eca(0x145)]=function(){const _0x57435f=_0x314eca;return this['_scene']&&this[_0x57435f(0x180)][_0x57435f(0x19c)]===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x531711=_0x314eca;return this[_0x531711(0x180)]&&this[_0x531711(0x180)][_0x531711(0x19c)]===Scene_Map;},ConfigManager[_0x314eca(0x415)]=VisuMZ[_0x314eca(0x19b)]['Settings'][_0x314eca(0x17a)][_0x314eca(0x310)]||_0x314eca(0x28e),ConfigManager[_0x314eca(0x3d1)]=VisuMZ[_0x314eca(0x19b)]['Settings'][_0x314eca(0x3eb)][_0x314eca(0x425)],VisuMZ['MessageCore'][_0x314eca(0x2ce)]=ConfigManager[_0x314eca(0x222)],ConfigManager[_0x314eca(0x222)]=function(){const _0xfc4a80=_0x314eca,_0x2b09c9=VisuMZ[_0xfc4a80(0x19b)][_0xfc4a80(0x2ce)][_0xfc4a80(0x37e)](this);return TextManager[_0xfc4a80(0x13c)]()&&(_0x2b09c9[_0xfc4a80(0x415)]=this[_0xfc4a80(0x415)]),_0x2b09c9[_0xfc4a80(0x3d1)]=this[_0xfc4a80(0x3d1)],_0x2b09c9;},VisuMZ['MessageCore'][_0x314eca(0x35a)]=ConfigManager['applyData'],ConfigManager[_0x314eca(0xf6)]=function(_0x24ecee){const _0x45a2ee=_0x314eca;VisuMZ['MessageCore'][_0x45a2ee(0x35a)][_0x45a2ee(0x37e)](this,_0x24ecee),TextManager[_0x45a2ee(0x13c)]()&&(_0x45a2ee(0x415)in _0x24ecee?this[_0x45a2ee(0x415)]=String(_0x24ecee['textLocale']):this[_0x45a2ee(0x415)]=VisuMZ['MessageCore'][_0x45a2ee(0x17c)][_0x45a2ee(0x17a)][_0x45a2ee(0x310)]||_0x45a2ee(0x28e)),_0x45a2ee(0x3d1)in _0x24ecee?this[_0x45a2ee(0x3d1)]=Number(_0x24ecee['textSpeed'])[_0x45a2ee(0x11e)](0x1,0xb):this['textSpeed']=VisuMZ[_0x45a2ee(0x19b)][_0x45a2ee(0x17c)][_0x45a2ee(0x3eb)][_0x45a2ee(0x425)];},TextManager[_0x314eca(0x53f)]=VisuMZ[_0x314eca(0x19b)]['Settings'][_0x314eca(0x17a)][_0x314eca(0x4f7)],TextManager['messageCoreTextSpeed']=VisuMZ[_0x314eca(0x19b)][_0x314eca(0x17c)][_0x314eca(0x3eb)][_0x314eca(0x4f7)],TextManager[_0x314eca(0x357)]=VisuMZ[_0x314eca(0x19b)][_0x314eca(0x17c)][_0x314eca(0x3eb)]['Instant'],VisuMZ[_0x314eca(0x19b)][_0x314eca(0x138)]=TextManager[_0x314eca(0x506)],TextManager[_0x314eca(0x506)]=function(_0x4e2257){const _0x3ede37=_0x314eca,_0x48a161=['levelUp',_0x3ede37(0x372),_0x3ede37(0x49a),_0x3ede37(0x352),_0x3ede37(0x4d9),_0x3ede37(0x48e),'escapeStart',_0x3ede37(0x4ec),_0x3ede37(0x272),_0x3ede37(0x2be)];let _0x51dad=VisuMZ[_0x3ede37(0x19b)][_0x3ede37(0x138)]['call'](this,_0x4e2257);return _0x48a161['includes'](_0x4e2257)&&('pJiMd'!==_0x3ede37(0x10a)?(_0x1fcab7[_0x3ede37(0x19b)]['Game_Map_refresh']['call'](this),_0x27f764[_0x3ede37(0x3bb)]()):_0x51dad=_0x3ede37(0x254)+_0x51dad),_0x51dad;},TextManager[_0x314eca(0x13c)]=function(){const _0x1c9a3c=_0x314eca;return VisuMZ['MessageCore'][_0x1c9a3c(0x17c)][_0x1c9a3c(0x17a)]['Enable'];},TextManager[_0x314eca(0x268)]=function(_0x45af66){const _0x483057=_0x314eca;if(!this['isVisuMzLocalizationEnabled']())return _0x45af66;return _0x45af66=String(_0x45af66)[_0x483057(0x1e5)](/\$(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x2afd23,_0x3b1bb7)=>this[_0x483057(0x527)](String(_0x3b1bb7))),_0x45af66=String(_0x45af66)[_0x483057(0x1e5)](/\\(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x55bd68,_0x58b311)=>this['getLocalizedText'](String(_0x58b311))),_0x45af66=String(_0x45af66)[_0x483057(0x1e5)](/\x1b(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x539860,_0x10b0f8)=>this[_0x483057(0x527)](String(_0x10b0f8))),_0x45af66;},TextManager[_0x314eca(0x527)]=function(_0x19a629){const _0x215995=_0x314eca;if(!$dataLocalization)return'';const _0x1222f7=$dataLocalization[_0x19a629[_0x215995(0x31c)]()['trim']()];if(!_0x1222f7)return;const _0x4b3bee=ConfigManager[_0x215995(0x415)]||_0x215995(0x28e);let _0x4b4052=_0x1222f7[_0x4b3bee]||'UNDEFINED!';return _0x4b4052=_0x4b4052[_0x215995(0x1e5)](/\\/g,'\x1b'),_0x4b4052=_0x4b4052[_0x215995(0x1e5)](/<SEMI(?:|-COLON|COLON)>/gi,';'),_0x4b4052;},TextManager[_0x314eca(0x238)]=function(_0x52a6b7){const _0x4cd042=_0x314eca;return VisuMZ[_0x4cd042(0x19b)][_0x4cd042(0x17c)]['Localization'][_0x52a6b7]||'';},TextManager['getCurrentLanguage']=function(){const _0x26bc04=_0x314eca,_0x17e045=ConfigManager[_0x26bc04(0x415)]||_0x26bc04(0x28e);return this[_0x26bc04(0x238)](_0x17e045);},TextManager[_0x314eca(0x4ad)]=function(_0x9b0240){const _0x1b577e=_0x314eca,_0x57200c=VisuMZ[_0x1b577e(0x19b)][_0x1b577e(0x17c)][_0x1b577e(0x17a)][_0x1b577e(0x2d4)]||[];let _0x5bbd08=_0x57200c[_0x1b577e(0x39f)](ConfigManager[_0x1b577e(0x415)]||'English');_0x5bbd08+=_0x9b0240;const _0x5e8c93=_0x57200c[_0x5bbd08]||'';return this[_0x1b577e(0x238)](_0x5e8c93);},Game_Temp[_0x314eca(0x393)][_0x314eca(0x24f)]=function(_0x193af6){const _0x26c558=_0x314eca;this[_0x26c558(0x13f)]=_0x193af6;},Game_Temp[_0x314eca(0x393)][_0x314eca(0x1ae)]=function(){const _0x4335fe=_0x314eca;return this[_0x4335fe(0x13f)];},VisuMZ['MessageCore'][_0x314eca(0x1d5)]=Game_Interpreter[_0x314eca(0x393)][_0x314eca(0x24a)],Game_Interpreter['prototype'][_0x314eca(0x24a)]=function(_0x41142b){const _0x59c039=_0x314eca;return $gameTemp[_0x59c039(0x24f)](this),VisuMZ[_0x59c039(0x19b)][_0x59c039(0x1d5)][_0x59c039(0x37e)](this,_0x41142b);},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x186)]=Game_System[_0x314eca(0x393)]['initialize'],Game_System[_0x314eca(0x393)]['initialize']=function(){const _0x46a270=_0x314eca;VisuMZ['MessageCore'][_0x46a270(0x186)][_0x46a270(0x37e)](this),this['initMessageCore']();},Game_System[_0x314eca(0x393)][_0x314eca(0x256)]=function(){const _0x3d29b2=_0x314eca,_0x422075=VisuMZ[_0x3d29b2(0x19b)][_0x3d29b2(0x17c)][_0x3d29b2(0x4c9)],_0x1c5312=VisuMZ['MessageCore']['Settings']['WordWrap'];this[_0x3d29b2(0x3f9)]={'messageRows':_0x422075[_0x3d29b2(0x438)],'messageWidth':_0x422075['MessageWidth'],'messageWordWrap':_0x1c5312['MessageWindow'],'helpWordWrap':_0x1c5312[_0x3d29b2(0x537)],'choiceLineHeight':_0x422075[_0x3d29b2(0x1c4)],'choiceMinWidth':_0x422075[_0x3d29b2(0x106)]??0x60,'choiceRows':_0x422075[_0x3d29b2(0x366)],'choiceCols':_0x422075[_0x3d29b2(0x29b)],'choiceTextAlign':_0x422075[_0x3d29b2(0x2c4)],'choiceDistance':0x0},this[_0x3d29b2(0x40d)]===undefined&&(this[_0x3d29b2(0x40d)]=_0x422075[_0x3d29b2(0x151)],this[_0x3d29b2(0x286)]=_0x422075[_0x3d29b2(0x39c)]);},Game_System[_0x314eca(0x393)]['getMessageWindowRows']=function(){const _0x599f2e=_0x314eca;if(this[_0x599f2e(0x3f9)]===undefined)this[_0x599f2e(0x256)]();if(this['_MessageCoreSettings'][_0x599f2e(0x402)]===undefined)this[_0x599f2e(0x256)]();return this[_0x599f2e(0x3f9)][_0x599f2e(0x402)];},Game_System[_0x314eca(0x393)][_0x314eca(0x41d)]=function(_0x572f51){const _0x54fe13=_0x314eca;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x54fe13(0x3f9)][_0x54fe13(0x402)]===undefined)this[_0x54fe13(0x256)]();this[_0x54fe13(0x3f9)][_0x54fe13(0x402)]=_0x572f51||0x1;},Game_System['prototype'][_0x314eca(0x41b)]=function(){const _0x1cb6a8=_0x314eca;if(this[_0x1cb6a8(0x3f9)]===undefined)this['initMessageCore']();if(this[_0x1cb6a8(0x3f9)][_0x1cb6a8(0x2f9)]===undefined)this['initMessageCore']();return this[_0x1cb6a8(0x3f9)]['messageWidth'];},Game_System['prototype'][_0x314eca(0x337)]=function(_0x334578){const _0x448fea=_0x314eca;if(this[_0x448fea(0x3f9)]===undefined)this[_0x448fea(0x256)]();if(this[_0x448fea(0x3f9)][_0x448fea(0x2f9)]===undefined)this['initMessageCore']();_0x334578=Math[_0x448fea(0x38a)](_0x334578);if(_0x334578%0x2!==0x0)_0x334578+=0x1;this[_0x448fea(0x3f9)][_0x448fea(0x2f9)]=_0x334578||0x2;},Game_System[_0x314eca(0x393)][_0x314eca(0x340)]=function(){const _0x25d2da=_0x314eca;if(this[_0x25d2da(0x3f9)]===undefined)this[_0x25d2da(0x256)]();if(this[_0x25d2da(0x3f9)][_0x25d2da(0x35f)]===undefined)this[_0x25d2da(0x256)]();return this['_MessageCoreSettings'][_0x25d2da(0x35f)];},Game_System[_0x314eca(0x393)]['setMessageWindowWordWrap']=function(_0x447804){const _0x508c15=_0x314eca;if(this['_MessageCoreSettings']===undefined)this[_0x508c15(0x256)]();if(this[_0x508c15(0x3f9)][_0x508c15(0x35f)]===undefined)this[_0x508c15(0x256)]();this['_MessageCoreSettings']['messageWordWrap']=_0x447804;},Game_System[_0x314eca(0x393)][_0x314eca(0x4f4)]=function(){const _0x2d4767=_0x314eca;if(this[_0x2d4767(0x40d)]===undefined){const _0x138486=VisuMZ['MessageCore'][_0x2d4767(0x17c)][_0x2d4767(0x4c9)];this[_0x2d4767(0x40d)]=_0x138486[_0x2d4767(0x151)],this[_0x2d4767(0x286)]=_0x138486[_0x2d4767(0x39c)];}return{'x':this[_0x2d4767(0x40d)]||0x0,'y':this[_0x2d4767(0x286)]||0x0};},Game_System[_0x314eca(0x393)][_0x314eca(0x3ae)]=function(_0x21b8a1,_0x177ce5){const _0x1d5c72=_0x314eca;if(this['_MessageCoreSettings']===undefined)this[_0x1d5c72(0x256)]();this[_0x1d5c72(0x40d)]=_0x21b8a1,this[_0x1d5c72(0x286)]=_0x177ce5;},Game_System['prototype'][_0x314eca(0x50d)]=function(){const _0x430180=_0x314eca;if(this[_0x430180(0x3f9)]===undefined)this[_0x430180(0x256)]();if(this[_0x430180(0x3f9)][_0x430180(0x1b9)]===undefined)this[_0x430180(0x256)]();return this[_0x430180(0x3f9)]['helpWordWrap'];},Game_System[_0x314eca(0x393)][_0x314eca(0x273)]=function(_0x374bf1){const _0x598bd5=_0x314eca;if(this[_0x598bd5(0x3f9)]===undefined)this[_0x598bd5(0x256)]();if(this[_0x598bd5(0x3f9)][_0x598bd5(0x1b9)]===undefined)this['initMessageCore']();this['_MessageCoreSettings'][_0x598bd5(0x1b9)]=_0x374bf1;},Game_System[_0x314eca(0x393)]['getChoiceListLineHeight']=function(){const _0x2c0874=_0x314eca;if(this[_0x2c0874(0x3f9)]===undefined)this[_0x2c0874(0x256)]();if(this[_0x2c0874(0x3f9)][_0x2c0874(0x25f)]===undefined)this[_0x2c0874(0x256)]();return this[_0x2c0874(0x3f9)][_0x2c0874(0x25f)];},Game_System['prototype'][_0x314eca(0x1cd)]=function(_0x33ebb6){const _0x5cc1f6=_0x314eca;if(this[_0x5cc1f6(0x3f9)]===undefined)this[_0x5cc1f6(0x256)]();if(this[_0x5cc1f6(0x3f9)][_0x5cc1f6(0x25f)]===undefined)this[_0x5cc1f6(0x256)]();this[_0x5cc1f6(0x3f9)]['choiceLineHeight']=_0x33ebb6||0x1;},Game_System[_0x314eca(0x393)][_0x314eca(0x152)]=function(){const _0xa07f00=_0x314eca;if(this[_0xa07f00(0x3f9)]===undefined)this['initMessageCore']();return this[_0xa07f00(0x3f9)][_0xa07f00(0x3f3)]??0x60;},Game_System[_0x314eca(0x393)][_0x314eca(0x167)]=function(_0x540763){const _0x16c9f7=_0x314eca;if(this[_0x16c9f7(0x3f9)]===undefined)this[_0x16c9f7(0x256)]();this[_0x16c9f7(0x3f9)][_0x16c9f7(0x3f3)]=_0x540763||0x0;},Game_System['prototype'][_0x314eca(0x3d7)]=function(){const _0x1e19ef=_0x314eca;if(this[_0x1e19ef(0x3f9)]===undefined)this[_0x1e19ef(0x256)]();if(this[_0x1e19ef(0x3f9)][_0x1e19ef(0x2bd)]===undefined)this[_0x1e19ef(0x256)]();return this['_MessageCoreSettings'][_0x1e19ef(0x2bd)];},Game_System[_0x314eca(0x393)]['setChoiceListMaxRows']=function(_0x1eeeba){const _0x47835a=_0x314eca;if(this[_0x47835a(0x3f9)]===undefined)this['initMessageCore']();if(this[_0x47835a(0x3f9)][_0x47835a(0x2bd)]===undefined)this[_0x47835a(0x256)]();this[_0x47835a(0x3f9)]['choiceRows']=_0x1eeeba||0x1;},Game_System['prototype']['getChoiceListMaxColumns']=function(){const _0x21da8f=_0x314eca;if(this[_0x21da8f(0x3f9)]===undefined)this[_0x21da8f(0x256)]();if(this[_0x21da8f(0x3f9)][_0x21da8f(0x274)]===undefined)this['initMessageCore']();return this[_0x21da8f(0x3f9)]['choiceCols'];},Game_System[_0x314eca(0x393)][_0x314eca(0x3b4)]=function(_0x57afe8){const _0x3b6be1=_0x314eca;if(this[_0x3b6be1(0x3f9)]===undefined)this[_0x3b6be1(0x256)]();if(this[_0x3b6be1(0x3f9)][_0x3b6be1(0x274)]===undefined)this[_0x3b6be1(0x256)]();this[_0x3b6be1(0x3f9)][_0x3b6be1(0x274)]=_0x57afe8||0x1;},Game_System[_0x314eca(0x393)][_0x314eca(0x179)]=function(){const _0x2da6f4=_0x314eca;if(this[_0x2da6f4(0x3f9)]===undefined)this[_0x2da6f4(0x256)]();if(this[_0x2da6f4(0x3f9)][_0x2da6f4(0x529)]===undefined)this['initMessageCore']();return this[_0x2da6f4(0x3f9)][_0x2da6f4(0x529)];},Game_System[_0x314eca(0x393)][_0x314eca(0x1f9)]=function(_0x5c9e57){const _0x35e0fb=_0x314eca;if(this[_0x35e0fb(0x3f9)]===undefined)this[_0x35e0fb(0x256)]();if(this['_MessageCoreSettings'][_0x35e0fb(0x529)]===undefined)this[_0x35e0fb(0x256)]();this[_0x35e0fb(0x3f9)][_0x35e0fb(0x529)]=_0x5c9e57[_0x35e0fb(0x31c)]();},Game_System[_0x314eca(0x393)][_0x314eca(0x3e6)]=function(){const _0x33cadb=_0x314eca;if(this[_0x33cadb(0x3f9)]===undefined)this[_0x33cadb(0x256)]();return this[_0x33cadb(0x3f9)][_0x33cadb(0x4bc)]||0x0;},Game_System[_0x314eca(0x393)][_0x314eca(0x3c4)]=function(_0x9a483c){const _0x1cc4fd=_0x314eca;if(this[_0x1cc4fd(0x3f9)]===undefined)this[_0x1cc4fd(0x256)]();this[_0x1cc4fd(0x3f9)]['choiceDistance']=_0x9a483c||0x0;},Game_Message[_0x314eca(0x393)]['setWeaponChoice']=function(_0x1bf030,_0x1e2130){const _0x1115e1=_0x314eca;this[_0x1115e1(0x245)]=_0x1bf030,this[_0x1115e1(0x1d1)]=_0x1115e1(0x20f),this['_itemChoiceWtypeId']=_0x1e2130,this[_0x1115e1(0x232)]=0x0;},Game_Message[_0x314eca(0x393)][_0x314eca(0x261)]=function(){const _0x51864c=_0x314eca;return this[_0x51864c(0x109)]||0x0;},Game_Message[_0x314eca(0x393)][_0x314eca(0x348)]=function(_0x4c2d17,_0x107252,_0x164839){const _0x258889=_0x314eca;this[_0x258889(0x245)]=_0x4c2d17,this['_itemChoiceItypeId']=_0x258889(0x495),this[_0x258889(0x30f)]=_0x107252,this[_0x258889(0x232)]=_0x164839;},Game_Message['prototype'][_0x314eca(0x300)]=function(){const _0x17c384=_0x314eca;return this[_0x17c384(0x30f)]||0x0;},Game_Message['prototype'][_0x314eca(0x257)]=function(){const _0x2b1f72=_0x314eca;return this[_0x2b1f72(0x232)]||0x0;},Game_Message[_0x314eca(0x393)]['setSkillChoice']=function(_0x47254a,_0x1e0ca9,_0x2f8a4b){const _0x44004a=_0x314eca;this[_0x44004a(0x245)]=_0x47254a,this[_0x44004a(0x1d1)]=_0x44004a(0x299),this[_0x44004a(0x2a1)]=_0x1e0ca9,this[_0x44004a(0x229)]=_0x2f8a4b;},Game_Message[_0x314eca(0x393)][_0x314eca(0x3c5)]=function(){return this['_itemChoiceActorId']||0x0;},Game_Message[_0x314eca(0x393)]['itemChoiceActor']=function(){const _0x28efb1=_0x314eca;return $gameActors['actor'](this[_0x28efb1(0x3c5)]())||$gameParty[_0x28efb1(0x46c)]()||null;},Game_Message[_0x314eca(0x393)]['itemChoiceStypeId']=function(){const _0x318925=_0x314eca;return this[_0x318925(0x229)]||0x0;},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x123)]=Game_Message[_0x314eca(0x393)][_0x314eca(0x233)],Game_Message[_0x314eca(0x393)][_0x314eca(0x233)]=function(_0x8cb295,_0x53725c,_0x4ad3c1){const _0x5bfdc5=_0x314eca;this[_0x5bfdc5(0x388)]=!![],VisuMZ[_0x5bfdc5(0x19b)]['Game_Message_setChoices'][_0x5bfdc5(0x37e)](this,_0x8cb295,_0x53725c,_0x4ad3c1);},Game_Message['prototype'][_0x314eca(0x2fc)]=function(){const _0x56544c=_0x314eca;this[_0x56544c(0x388)]=![],this[_0x56544c(0x362)]=[];const _0x421cdd=this['_choices'][_0x56544c(0x428)];this['_maxShuffleChoices']=_0x421cdd;let _0x3747f9=![];for(let _0x3a08a1=0x0;_0x3a08a1<_0x421cdd;_0x3a08a1++){let _0xfe80d=this['_choices'][_0x3a08a1];_0xfe80d[_0x56544c(0x34e)](/<SHUFFLE>/gi)&&(_0x3747f9=!![],_0xfe80d=_0xfe80d[_0x56544c(0x1e5)](/<SHUFFLE>/gi,'')),_0xfe80d[_0x56544c(0x34e)](/<SHUFFLE:[ ](\d+)>/gi)&&(_0x3747f9=!![],this[_0x56544c(0x18b)]=Math['min'](Number(RegExp['$1']),this[_0x56544c(0x18b)]),_0xfe80d=_0xfe80d[_0x56544c(0x1e5)](/<SHUFFLE:[ ](\d+)>/gi,'')),this[_0x56544c(0x362)][_0x56544c(0x4bd)](_0x3a08a1),this['_choices'][_0x3a08a1]=_0xfe80d;}if(_0x3747f9){this['_choiceIndexArray']=VisuMZ[_0x56544c(0x19b)][_0x56544c(0x500)](this[_0x56544c(0x362)]);if(this[_0x56544c(0x433)]()!==-0x2)this['_choiceCancelType']=-0x1;}},VisuMZ['MessageCore']['ShuffleArray']=function(_0x416de1){const _0x19cb62=_0x314eca;var _0x453b57,_0x427ab9,_0x3b0809;for(_0x3b0809=_0x416de1['length']-0x1;_0x3b0809>0x0;_0x3b0809--){_0x453b57=Math['floor'](Math[_0x19cb62(0x467)]()*(_0x3b0809+0x1)),_0x427ab9=_0x416de1[_0x3b0809],_0x416de1[_0x3b0809]=_0x416de1[_0x453b57],_0x416de1[_0x453b57]=_0x427ab9;}return _0x416de1;},Game_Message[_0x314eca(0x393)][_0x314eca(0x485)]=function(){const _0x97c57=_0x314eca;if(!this['_choiceIndexArray'])this[_0x97c57(0x2fc)]();return this[_0x97c57(0x362)];},Game_Message['prototype'][_0x314eca(0x143)]=function(){const _0x38c92c=_0x314eca;if(this['_maxShuffleChoices']===undefined)this[_0x38c92c(0x2fc)]();return this[_0x38c92c(0x18b)];},VisuMZ['MessageCore']['Game_Screen_clearPictures']=Game_Screen['prototype']['clearPictures'],Game_Screen[_0x314eca(0x393)]['clearPictures']=function(){const _0x5db654=_0x314eca;VisuMZ['MessageCore']['Game_Screen_clearPictures'][_0x5db654(0x37e)](this),this[_0x5db654(0x408)]();},Game_Screen['prototype'][_0x314eca(0x408)]=function(){const _0x5e5cae=_0x314eca;this['_pictureText']=[],this['_pictureTextBuffer']=[],this[_0x5e5cae(0x2b2)]=[];},Game_Screen['prototype'][_0x314eca(0x38c)]=function(_0x27e542){const _0x9b1fcc=_0x314eca;if(this['_pictureText']===undefined)this[_0x9b1fcc(0x408)]();const _0x2c6530=this[_0x9b1fcc(0x400)](_0x27e542);return this[_0x9b1fcc(0x334)][_0x2c6530]=this[_0x9b1fcc(0x334)][_0x2c6530]||{},this[_0x9b1fcc(0x334)][_0x2c6530];},Game_Screen[_0x314eca(0x393)]['getPictureText']=function(_0x2d04d1,_0x55053f){const _0x19fa68=_0x314eca;return _0x55053f=_0x55053f['toLowerCase']()[_0x19fa68(0x1ab)](),this[_0x19fa68(0x38c)](_0x2d04d1)[_0x55053f]||'';},Game_Screen[_0x314eca(0x393)]['setPictureText']=function(_0x519fce,_0x1b2088,_0x35ea47){const _0x8f0b8b=_0x314eca;_0x35ea47=_0x35ea47[_0x8f0b8b(0x31c)]()[_0x8f0b8b(0x1ab)](),this[_0x8f0b8b(0x38c)](_0x519fce)[_0x35ea47]=_0x1b2088||'',this[_0x8f0b8b(0x456)](_0x519fce,!![]);},Game_Screen['prototype'][_0x314eca(0x3b1)]=function(_0x5e4763){const _0xeb72b5=_0x314eca;if(this['_pictureText']===undefined)this[_0xeb72b5(0x408)]();const _0xe16848=this['realPictureId'](_0x5e4763);this[_0xeb72b5(0x334)][_0xe16848]=null,this[_0xeb72b5(0x456)](_0x5e4763,!![]);},Game_Screen[_0x314eca(0x393)][_0x314eca(0x277)]=function(_0x14e9ae){const _0x3454f0=_0x314eca;if(this['_pictureText']===undefined)this['clearAllPictureTexts']();const _0x4e2280=this[_0x3454f0(0x400)](_0x14e9ae);return this[_0x3454f0(0x1ee)][_0x4e2280]||0x0;},Game_Screen[_0x314eca(0x393)][_0x314eca(0x322)]=function(_0x4b1aa5,_0x5b3cd2){const _0x7650b2=_0x314eca;if(this[_0x7650b2(0x334)]===undefined)this[_0x7650b2(0x408)]();const _0x312d4a=this[_0x7650b2(0x400)](_0x4b1aa5);this[_0x7650b2(0x1ee)][_0x312d4a]=Math['max'](0x0,_0x5b3cd2);},Game_Screen[_0x314eca(0x393)][_0x314eca(0x504)]=function(_0x4a8fbb){const _0x1cb5ed=_0x314eca;if(this[_0x1cb5ed(0x334)]===undefined)this[_0x1cb5ed(0x408)]();const _0x4efecb=this[_0x1cb5ed(0x400)](_0x4a8fbb);this[_0x1cb5ed(0x1ee)][_0x4efecb]=undefined;},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x462)]=Game_Screen[_0x314eca(0x393)][_0x314eca(0x317)],Game_Screen['prototype'][_0x314eca(0x317)]=function(_0x2ed733){const _0x5bd83c=_0x314eca;VisuMZ['MessageCore'][_0x5bd83c(0x462)]['call'](this,_0x2ed733),this[_0x5bd83c(0x3b1)](_0x2ed733),this['erasePictureTextBuffer'](_0x2ed733),this['requestPictureTextRefresh'](_0x2ed733,!![]);},Game_Screen[_0x314eca(0x393)][_0x314eca(0x3bb)]=function(){const _0x440ce2=_0x314eca;for(const _0x2dddc6 of this[_0x440ce2(0x374)]){if(_0x2dddc6){let _0x498c1a=this[_0x440ce2(0x374)][_0x440ce2(0x39f)](_0x2dddc6);this[_0x440ce2(0x456)](_0x498c1a);}}},Game_Screen[_0x314eca(0x393)][_0x314eca(0x456)]=function(_0x4e8645,_0x1c3fde){const _0x1e3396=_0x314eca;this[_0x1e3396(0x2b2)]=this[_0x1e3396(0x2b2)]||[];if(this[_0x1e3396(0x291)](_0x4e8645)||_0x1c3fde){if(_0x1e3396(0x311)===_0x1e3396(0x311))this[_0x1e3396(0x2b2)][_0x1e3396(0x4bd)](_0x4e8645);else{const _0x252976=_0x5541ab['split'](',')[_0x1e3396(0x3ce)](_0x2a4f56=>_0x374695(_0x2a4f56)||0x0);if(_0x252976[0x0]!==_0x167661)this[_0x1e3396(0x1dd)]['x']=_0x3ba384(_0x252976[0x0]);if(_0x252976[0x1]!==_0x55220d)this[_0x1e3396(0x1dd)]['y']=_0x42d1da(_0x252976[0x1]);return'';}}},Game_Screen[_0x314eca(0x393)][_0x314eca(0x206)]=function(_0x20730d){const _0x489336=_0x314eca;return this[_0x489336(0x2b2)]=this[_0x489336(0x2b2)]||[],this[_0x489336(0x2b2)][_0x489336(0x321)](_0x20730d);},Game_Screen[_0x314eca(0x393)][_0x314eca(0x2f4)]=function(_0x4f3d50){const _0x3e7ece=_0x314eca;this[_0x3e7ece(0x2b2)]=this['_pictureTextRefresh']||[],this[_0x3e7ece(0x2b2)][_0x3e7ece(0x41f)](_0x4f3d50);},Game_Screen['prototype'][_0x314eca(0x291)]=function(_0x28aa1e){const _0x434a71=_0x314eca,_0x2bc836=[_0x434a71(0x48d),'up',_0x434a71(0x3ac),_0x434a71(0x3a1),_0x434a71(0x397),_0x434a71(0x410),_0x434a71(0x36e),'down','lowerright'];return _0x2bc836[_0x434a71(0x276)](_0x2e2838=>this['getPictureText'](_0x28aa1e,_0x2e2838)!=='');},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x50c)]=Game_Party[_0x314eca(0x393)][_0x314eca(0x246)],Game_Party['prototype'][_0x314eca(0x246)]=function(){const _0x85d203=_0x314eca;VisuMZ['MessageCore'][_0x85d203(0x50c)][_0x85d203(0x37e)](this),this[_0x85d203(0x256)]();},Game_Party[_0x314eca(0x393)][_0x314eca(0x256)]=function(){this['_lastGainedItemData']={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x314eca(0x393)][_0x314eca(0x532)]=function(){const _0x537db0=_0x314eca;if(this[_0x537db0(0x3dc)]===undefined)this[_0x537db0(0x256)]();return this['_lastGainedItemData'];},Game_Party[_0x314eca(0x393)][_0x314eca(0x494)]=function(_0x32ae67,_0x17d83a){const _0x2312bf=_0x314eca;if(this[_0x2312bf(0x3dc)]===undefined)this[_0x2312bf(0x256)]();if(!_0x32ae67)return;if(DataManager[_0x2312bf(0x114)](_0x32ae67))this[_0x2312bf(0x3dc)]['type']=0x0;else{if(DataManager[_0x2312bf(0x13e)](_0x32ae67))this[_0x2312bf(0x3dc)][_0x2312bf(0x3e2)]=0x1;else DataManager[_0x2312bf(0x41e)](_0x32ae67)&&(_0x2312bf(0x32d)===_0x2312bf(0x490)?(_0x317aea['MessageCore'][_0x2312bf(0x186)][_0x2312bf(0x37e)](this),this[_0x2312bf(0x256)]()):this[_0x2312bf(0x3dc)][_0x2312bf(0x3e2)]=0x2);}this[_0x2312bf(0x3dc)]['id']=_0x32ae67['id'],this[_0x2312bf(0x3dc)][_0x2312bf(0x28b)]=_0x17d83a;},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x2cb)]=Game_Party[_0x314eca(0x393)][_0x314eca(0x280)],Game_Party['prototype'][_0x314eca(0x280)]=function(_0x517f79,_0xf10b2d,_0x5eeadd){const _0x494272=_0x314eca;VisuMZ[_0x494272(0x19b)][_0x494272(0x2cb)][_0x494272(0x37e)](this,_0x517f79,_0xf10b2d,_0x5eeadd),_0xf10b2d>0x0&&this[_0x494272(0x494)](_0x517f79,_0xf10b2d);},VisuMZ[_0x314eca(0x19b)]['Game_Map_initialize']=Game_Map['prototype'][_0x314eca(0x246)],Game_Map[_0x314eca(0x393)][_0x314eca(0x246)]=function(){const _0x250ac0=_0x314eca;VisuMZ['MessageCore'][_0x250ac0(0x4c2)][_0x250ac0(0x37e)](this),this[_0x250ac0(0x54e)]=[];},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x4cc)]=Game_Map[_0x314eca(0x393)][_0x314eca(0x3a9)],Game_Map[_0x314eca(0x393)][_0x314eca(0x3a9)]=function(){const _0x478725=_0x314eca;VisuMZ[_0x478725(0x19b)][_0x478725(0x4cc)][_0x478725(0x37e)](this),this['_messageCommonEvents']=[];},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x3e1)]=Game_Map[_0x314eca(0x393)][_0x314eca(0x11c)],Game_Map[_0x314eca(0x393)][_0x314eca(0x11c)]=function(){const _0x35b9ac=_0x314eca;VisuMZ['MessageCore'][_0x35b9ac(0x3e1)][_0x35b9ac(0x37e)](this),this['updateMessageCommonEvents']();},Game_Map['prototype'][_0x314eca(0x422)]=function(_0x35ae58){const _0x9ee88e=_0x314eca;if(!$dataCommonEvents[_0x35ae58])return;this[_0x9ee88e(0x54e)]=this[_0x9ee88e(0x54e)]||[];const _0x2bc6bc=this[_0x9ee88e(0x44c)][_0x9ee88e(0x469)],_0x3e57c6=new Game_MessageCommonEvent(_0x35ae58,_0x2bc6bc);this[_0x9ee88e(0x54e)][_0x9ee88e(0x4bd)](_0x3e57c6);},Game_Map[_0x314eca(0x393)][_0x314eca(0x1b7)]=function(){const _0x4c9809=_0x314eca;this[_0x4c9809(0x54e)]=this['_messageCommonEvents']||[];for(const _0x51a810 of this[_0x4c9809(0x54e)]){if(!_0x51a810['_interpreter'])this[_0x4c9809(0x54e)]['remove'](_0x51a810);else{if('jCYOz'===_0x4c9809(0x53e))_0x51a810['update']();else return _0x40b1a1=_0xaa7654[_0x4c9809(0x1e5)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x381510;}}},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x2a0)]=Game_Map[_0x314eca(0x393)][_0x314eca(0x47a)],Game_Map[_0x314eca(0x393)][_0x314eca(0x47a)]=function(){const _0x31d6b9=_0x314eca;VisuMZ[_0x31d6b9(0x19b)][_0x31d6b9(0x2a0)][_0x31d6b9(0x37e)](this),$gameScreen[_0x31d6b9(0x3bb)]();},Game_Interpreter[_0x314eca(0x1f0)]=pluginData[_0x314eca(0x1c6)],Game_Interpreter[_0x314eca(0x393)][_0x314eca(0x104)]=function(_0x37e7e3){const _0x222c7f=_0x314eca;if($gameMessage[_0x222c7f(0x470)]())return![];return this['prepareShowTextCommand'](_0x37e7e3),this[_0x222c7f(0x2d9)](_0x37e7e3),this['prepareShowTextFollowups'](_0x37e7e3),this[_0x222c7f(0x338)](_0x222c7f(0x506)),!![];},Game_Interpreter[_0x314eca(0x393)][_0x314eca(0x347)]=function(_0x4d583c){const _0x317345=_0x314eca;$gameMessage['setFaceImage'](_0x4d583c[0x0],_0x4d583c[0x1]),$gameMessage[_0x317345(0x350)](_0x4d583c[0x2]),$gameMessage[_0x317345(0x47d)](_0x4d583c[0x3]),$gameMessage[_0x317345(0x502)](_0x4d583c[0x4]);},Game_Interpreter[_0x314eca(0x393)]['addContinuousShowTextCommands']=function(_0x358fb4){const _0x5d9930=_0x314eca;while(this['isContinuePrepareShowTextCommands']()){this['_index']++;if(this[_0x5d9930(0x313)]()[_0x5d9930(0x1b8)]===0x191){if(_0x5d9930(0x4d8)===_0x5d9930(0x39d)){const _0xaddc73=_0x5223b9[_0x5d9930(0x403)]()[_0x5d9930(0x3ce)](_0x27b8b2=>this[_0x5d9930(0x4c4)](_0x27b8b2))[_0x5d9930(0x223)](_0x52aa31=>this[_0x5d9930(0x3ca)](_0x52aa31));let _0x920cfe=_0x593aad[_0x5d9930(0x38a)](_0xaddc73['length']/this[_0x5d9930(0x384)]());if(!_0xd43061[_0x5d9930(0x388)]){const _0x545c57=_0x3316ab[_0x5d9930(0x143)]();_0x920cfe=_0x22c8b7['ceil'](_0x2fcb41[_0x5d9930(0x1aa)](_0x545c57,_0xaddc73[_0x5d9930(0x428)])/this['maxCols']());}return _0x1e3be7['max'](0x1,_0x59470e[_0x5d9930(0x1aa)](_0x920cfe,this[_0x5d9930(0x1a3)]()));}else{let _0x19ca55=this[_0x5d9930(0x313)]()[_0x5d9930(0x1e6)][0x0];_0x19ca55=VisuMZ['MessageCore']['ParseAddedText'](_0x19ca55),$gameMessage[_0x5d9930(0x1ed)](_0x19ca55);}}if(this['isBreakShowTextCommands']())break;}},Game_Interpreter['prototype'][_0x314eca(0x36a)]=function(){const _0x131497=_0x314eca;if(this[_0x131497(0x4f2)]()===0x65&&$gameSystem[_0x131497(0x536)]()>0x4)return!![];else{if(_0x131497(0x409)!=='cPfPs')return this[_0x131497(0x4f2)]()===0x191;else this[_0x131497(0x3b9)](),_0x43f83b[_0x131497(0x19b)][_0x131497(0x30e)]['call'](this),this['resetWordWrap']();}},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x34f)]=function(_0x2f3195){const _0x5d9d96=_0x314eca,_0x4ed3e4=VisuMZ[_0x5d9d96(0x19b)][_0x5d9d96(0x17c)][_0x5d9d96(0x4c9)];return _0x2f3195=(_0x4ed3e4[_0x5d9d96(0x15b)]||'')+_0x2f3195+(_0x4ed3e4[_0x5d9d96(0x187)]||''),_0x2f3195=_0x2f3195[_0x5d9d96(0x1e5)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x2f3195=_0x2f3195['replace'](/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi,(_0x4035df,_0x26da10)=>this[_0x5d9d96(0x1be)](_0x26da10)),_0x2f3195;},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x1be)]=function(_0x1c9407){const _0x3e21c1=_0x314eca,_0x55a62b=_0x1c9407[_0x3e21c1(0x345)]('|')[_0x3e21c1(0x3ce)](_0x3f37a2=>_0x3f37a2['trim']())[_0x3e21c1(0x41f)]('')['remove'](null);return _0x55a62b[Math[_0x3e21c1(0x49e)](_0x55a62b[_0x3e21c1(0x428)])];},Game_Interpreter['prototype'][_0x314eca(0x50f)]=function(){const _0x464acc=_0x314eca;if(this[_0x464acc(0x313)]()&&this[_0x464acc(0x313)]()['parameters'][0x0]['match'](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return $gameMessage[_0x464acc(0x1b6)][_0x464acc(0x428)]>=$gameSystem[_0x464acc(0x536)]()&&this[_0x464acc(0x4f2)]()!==0x191;},Game_Interpreter[_0x314eca(0x393)][_0x314eca(0x445)]=function(_0x780cc7){const _0x3a6b29=_0x314eca;switch(this[_0x3a6b29(0x4f2)]()){case 0x66:this['_index']++,this[_0x3a6b29(0x4e8)](this[_0x3a6b29(0x313)]()[_0x3a6b29(0x1e6)]);break;case 0x67:this[_0x3a6b29(0x53c)]++,this[_0x3a6b29(0x4ba)](this[_0x3a6b29(0x313)]()['parameters']);break;case 0x68:this[_0x3a6b29(0x53c)]++,this[_0x3a6b29(0x147)](this['currentCommand']()['parameters']);break;case 0x165:const _0x5b7c63=this[_0x3a6b29(0x2cc)][this[_0x3a6b29(0x53c)]+0x1],_0x1204be=_0x5b7c63['parameters'];_0x1204be[0x0]===Game_Interpreter[_0x3a6b29(0x1f0)]&&this[_0x3a6b29(0x142)](_0x1204be);break;}},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x3b5)]=Game_Interpreter[_0x314eca(0x393)][_0x314eca(0x4e8)],Game_Interpreter[_0x314eca(0x393)]['setupChoices']=function(_0x30288d){const _0x55a874=_0x314eca;_0x30288d=this[_0x55a874(0x3c8)](),VisuMZ[_0x55a874(0x19b)][_0x55a874(0x3b5)][_0x55a874(0x37e)](this,_0x30288d),$gameMessage[_0x55a874(0x2fc)]();},Game_Interpreter['prototype'][_0x314eca(0x3c8)]=function(){const _0xdcaa2f=_0x314eca,_0x208c32=this[_0xdcaa2f(0x53c)],_0x1f5858=[];let _0x597341=0x0;this[_0xdcaa2f(0x53c)]++;while(this['_index']<this[_0xdcaa2f(0x2cc)][_0xdcaa2f(0x428)]){if(_0xdcaa2f(0x297)!==_0xdcaa2f(0x297)){if(_0x169bdd>=0x0)this['y']+=_0xd13ed5;else{const _0x42dc49=_0x11f7b7['boxHeight']-(_0x41fa71+_0x1eff5f+_0x16b2d7);this['y']+=_0x599b0d[_0xdcaa2f(0x25c)]((_0x42dc49-this[_0xdcaa2f(0x501)])/0x2)+_0x30ba23;}}else{if(this['currentCommand']()[_0xdcaa2f(0x225)]===this['_indent']){if(_0xdcaa2f(0x43b)===_0xdcaa2f(0x432))this['setWordWrap'](_0x1b8214['isHelpWindowWordWrap']());else{if(this['currentCommand']()['code']===0x194&&this[_0xdcaa2f(0x4f2)]()!==0x66){if(_0xdcaa2f(0x4af)!=='QmQMW')break;else return this['_itemChoiceActorId']||0x0;}else{if(this[_0xdcaa2f(0x313)]()[_0xdcaa2f(0x1b8)]===0x66)this[_0xdcaa2f(0x22e)](_0x597341,this['currentCommand'](),_0x208c32),this['_index']-=0x2;else this[_0xdcaa2f(0x313)]()['code']===0x192&&(this[_0xdcaa2f(0x313)]()[_0xdcaa2f(0x1e6)][0x0]=_0x597341,_0x597341++);}}}this['_index']++;}}return this['_index']=_0x208c32,this[_0xdcaa2f(0x313)]()[_0xdcaa2f(0x1e6)];},Game_Interpreter[_0x314eca(0x393)][_0x314eca(0x22e)]=function(_0x502425,_0x4bd612,_0x3658e3){const _0x905a6c=_0x314eca;this['adjustShowChoiceDefault'](_0x502425,_0x4bd612,_0x3658e3),this[_0x905a6c(0x466)](_0x502425,_0x4bd612,_0x3658e3),this[_0x905a6c(0x35c)](_0x4bd612,_0x3658e3);},Game_Interpreter[_0x314eca(0x393)][_0x314eca(0x379)]=function(_0x21b7bb,_0x387673,_0x21a532){const _0x52b02f=_0x314eca;if(_0x387673['parameters'][0x2]<0x0)return;const _0x4d96ae=_0x387673[_0x52b02f(0x1e6)][0x2]+_0x21b7bb;this[_0x52b02f(0x2cc)][_0x21a532][_0x52b02f(0x1e6)][0x2]=_0x4d96ae;},Game_Interpreter[_0x314eca(0x393)][_0x314eca(0x466)]=function(_0x107d7c,_0x304f57,_0x1adebc){const _0x3aac81=_0x314eca;if(_0x304f57[_0x3aac81(0x1e6)][0x1]>=0x0){if(_0x3aac81(0x41a)===_0x3aac81(0x15f)){_0x1388dc[_0x3aac81(0x448)]=new _0x2abec8('\x5c['+_0x2fdb90['Match']+'\x5c]','gi');if(_0x88042f[_0x3aac81(0x3f8)]!==''&&_0x54db51[_0x3aac81(0x3f8)]!=='Undefined'){let _0x560ea6=_0x3072ee[_0x3aac81(0x3f8)];_0x560ea6=_0x560ea6['replace'](/\\/g,'\x1b'),_0x560ea6=_0x560ea6[_0x3aac81(0x1e5)]('\x27','\x5c\x27'),_0x560ea6=_0x560ea6[_0x3aac81(0x1e5)]('\x22','\x5c\x22'),_0x30e3c['textCodeResult']=new _0x1198d0(_0x3aac81(0x208)+_0x560ea6+'\x27');}else _0x19c33c[_0x3aac81(0x4a5)]=_0x489943[_0x3aac81(0x29d)];}else{var _0x51d3c9=_0x304f57[_0x3aac81(0x1e6)][0x1]+_0x107d7c;this['_list'][_0x1adebc][_0x3aac81(0x1e6)][0x1]=_0x51d3c9;}}else _0x304f57[_0x3aac81(0x1e6)][0x1]===-0x2&&(_0x3aac81(0x49b)===_0x3aac81(0x49b)?this[_0x3aac81(0x2cc)][_0x1adebc]['parameters'][0x1]=_0x304f57[_0x3aac81(0x1e6)][0x1]:_0x4c86c4[_0x3aac81(0x415)]=this[_0x3aac81(0x415)]);},Game_Interpreter['prototype'][_0x314eca(0x35c)]=function(_0x385b40,_0x3da520){const _0x33739e=_0x314eca;for(const _0x284b85 of _0x385b40['parameters'][0x0]){if('cpnlZ'!==_0x33739e(0x544))this[_0x33739e(0x2cc)][_0x3da520]['parameters'][0x0][_0x33739e(0x4bd)](_0x284b85);else return this[_0x33739e(0x326)];}this[_0x33739e(0x2cc)][_0x33739e(0x4b2)](this[_0x33739e(0x53c)]-0x1,0x2);},Game_Interpreter[_0x314eca(0x393)][_0x314eca(0x142)]=function(_0x5983a0){const _0x530d4d=_0x314eca,_0x13f807=_0x5983a0[0x1];if(_0x13f807===_0x530d4d(0x205))this['_index']++,this['setWeaponChoice'](_0x5983a0);else{if(_0x13f807===_0x530d4d(0x411))_0x530d4d(0x2d6)!==_0x530d4d(0x2d6)?this[_0x530d4d(0x4a8)](_0x506249):(this['_index']++,this['setArmorChoice'](_0x5983a0));else{if(_0x13f807===_0x530d4d(0x534)&&Imported[_0x530d4d(0x482)]){if(_0x530d4d(0x336)===_0x530d4d(0x302)){const _0x179396=_0x1c9470[_0x530d4d(0x19b)][_0x530d4d(0x17c)]['General'],_0x16dcb2=_0x32aeb6[_0x530d4d(0x19b)][_0x530d4d(0x17c)][_0x530d4d(0x237)];this['_MessageCoreSettings']={'messageRows':_0x179396[_0x530d4d(0x438)],'messageWidth':_0x179396[_0x530d4d(0x239)],'messageWordWrap':_0x16dcb2[_0x530d4d(0x149)],'helpWordWrap':_0x16dcb2[_0x530d4d(0x537)],'choiceLineHeight':_0x179396[_0x530d4d(0x1c4)],'choiceMinWidth':_0x179396[_0x530d4d(0x106)]??0x60,'choiceRows':_0x179396[_0x530d4d(0x366)],'choiceCols':_0x179396[_0x530d4d(0x29b)],'choiceTextAlign':_0x179396[_0x530d4d(0x2c4)],'choiceDistance':0x0},this[_0x530d4d(0x40d)]===_0x26b0a3&&(this[_0x530d4d(0x40d)]=_0x179396[_0x530d4d(0x151)],this[_0x530d4d(0x286)]=_0x179396['MsgWindowOffsetY']);}else this['_index']++,this[_0x530d4d(0x4b3)](_0x5983a0);}}}},Game_Interpreter['prototype'][_0x314eca(0x426)]=function(_0x89842f){const _0x30e617=_0x314eca,_0x2359cb=JSON[_0x30e617(0x342)](JSON[_0x30e617(0x407)](_0x89842f[0x3]));VisuMZ['ConvertParams'](_0x2359cb,_0x2359cb),$gameMessage['setWeaponChoice'](_0x2359cb[_0x30e617(0x33e)]||0x0,_0x2359cb[_0x30e617(0x335)]||0x0);},Game_Interpreter[_0x314eca(0x393)][_0x314eca(0x348)]=function(_0x520d37){const _0x8bcbc1=_0x314eca,_0x340cc5=JSON[_0x8bcbc1(0x342)](JSON[_0x8bcbc1(0x407)](_0x520d37[0x3]));VisuMZ[_0x8bcbc1(0x13a)](_0x340cc5,_0x340cc5),$gameMessage[_0x8bcbc1(0x348)](_0x340cc5[_0x8bcbc1(0x33e)]||0x0,_0x340cc5[_0x8bcbc1(0x51d)]||0x0,_0x340cc5['EquipTypeID']||0x0);},Game_Interpreter[_0x314eca(0x393)][_0x314eca(0x4b3)]=function(_0x5766fe){const _0x39433f=_0x314eca,_0x71168=JSON[_0x39433f(0x342)](JSON[_0x39433f(0x407)](_0x5766fe[0x3]));VisuMZ['ConvertParams'](_0x71168,_0x71168),$gameMessage['setSkillChoice'](_0x71168[_0x39433f(0x33e)]||0x0,_0x71168[_0x39433f(0x2a2)]||0x0,_0x71168[_0x39433f(0x4b6)]||0x0);};function Game_MessageCommonEvent(){this['initialize'](...arguments);}Game_MessageCommonEvent[_0x314eca(0x393)][_0x314eca(0x246)]=function(_0x5e7eee,_0x21e6e9){const _0x1dd46b=_0x314eca;this[_0x1dd46b(0x1d7)]=_0x5e7eee,this[_0x1dd46b(0x469)]=_0x21e6e9||0x0,this[_0x1dd46b(0x47a)]();},Game_MessageCommonEvent[_0x314eca(0x393)]['event']=function(){const _0x35fd51=_0x314eca;return $dataCommonEvents[this[_0x35fd51(0x1d7)]];},Game_MessageCommonEvent[_0x314eca(0x393)][_0x314eca(0x165)]=function(){const _0x5c5c87=_0x314eca;return this[_0x5c5c87(0x166)]()[_0x5c5c87(0x165)];},Game_MessageCommonEvent[_0x314eca(0x393)][_0x314eca(0x47a)]=function(){const _0x5f0cd1=_0x314eca;this[_0x5f0cd1(0x44c)]=new Game_Interpreter(),this[_0x5f0cd1(0x44c)][_0x5f0cd1(0x423)](this[_0x5f0cd1(0x165)](),this['_eventId']);},Game_MessageCommonEvent[_0x314eca(0x393)][_0x314eca(0x36f)]=function(){const _0x1264e2=_0x314eca;this[_0x1264e2(0x44c)]&&(this[_0x1264e2(0x44c)][_0x1264e2(0x1db)]()?this[_0x1264e2(0x44c)][_0x1264e2(0x36f)]():this[_0x1264e2(0x1eb)]());},Game_MessageCommonEvent[_0x314eca(0x393)]['clear']=function(){const _0x1b4846=_0x314eca;this[_0x1b4846(0x44c)]=null;},Scene_Message[_0x314eca(0x393)][_0x314eca(0x19e)]=function(){const _0x26d18e=_0x314eca,_0x1d3d81=Math[_0x26d18e(0x1aa)](Graphics[_0x26d18e(0x367)],$gameSystem['getMessageWindowWidth']()),_0x2ff286=$gameSystem[_0x26d18e(0x536)](),_0x7982ed=this[_0x26d18e(0x1e7)](_0x2ff286,![]),_0x37814f=(Graphics[_0x26d18e(0x137)]-_0x1d3d81)/0x2,_0x1b4a3a=0x0;return new Rectangle(_0x37814f,_0x1b4a3a,_0x1d3d81,_0x7982ed);},VisuMZ[_0x314eca(0x19b)][_0x314eca(0xf2)]=Scene_Message[_0x314eca(0x393)][_0x314eca(0x18a)],Scene_Message['prototype'][_0x314eca(0x18a)]=function(){const _0x254ffa=_0x314eca;VisuMZ[_0x254ffa(0x19b)]['Scene_Message_createChoiceListWindow'][_0x254ffa(0x37e)](this),this['createChoiceListHelpWindow']();},Scene_Message[_0x314eca(0x393)]['createChoiceListHelpWindow']=function(){const _0x35500b=_0x314eca,_0x44513d=this[_0x35500b(0x324)](),_0x2c78aa=new Window_Help(_0x44513d);_0x2c78aa[_0x35500b(0x26c)](),this[_0x35500b(0x2af)][_0x35500b(0x107)](_0x2c78aa),this[_0x35500b(0x373)][_0x35500b(0xf1)](_0x2c78aa),this[_0x35500b(0x392)](_0x2c78aa),this[_0x35500b(0x40c)]=_0x2c78aa;},Scene_Message[_0x314eca(0x393)][_0x314eca(0x324)]=function(){const _0x56f2fd=_0x314eca,_0x422f18=0x0,_0x64144a=0x0,_0x5c30ad=Graphics[_0x56f2fd(0x137)],_0x58fe3b=this[_0x56f2fd(0x1e7)](0x2,![]);return new Rectangle(_0x422f18,_0x64144a,_0x5c30ad,_0x58fe3b);},Window_Message[_0x314eca(0x393)][_0x314eca(0xf1)]=function(_0x5013b6){this['_choiceListHelpWindow']=_0x5013b6;},Window_Message[_0x314eca(0x393)][_0x314eca(0x360)]=function(){const _0x2ddfbf=_0x314eca;if(!this[_0x2ddfbf(0x40c)])return;const _0x3f728c=this['_choiceListHelpWindow'];_0x3f728c&&(_0x2ddfbf(0x161)==='OxFiz'?_0x177517[_0x2ddfbf(0x37d)](_0x2ddfbf(0x1a7))?(_0x121180=_0x2ddfbf(0x4bf),_0x329667(_0xf9c1b4),this[_0x2ddfbf(0x356)](),this[_0x2ddfbf(0x169)](),_0x4e044c=''):_0x3cf4b4=_0x2ddfbf(0x4fd):_0x3f728c['y']=this['y']>0x0?0x0:Graphics[_0x2ddfbf(0x14f)]-_0x3f728c[_0x2ddfbf(0x501)]);},VisuMZ[_0x314eca(0x19b)]['Scene_Options_maxCommands']=Scene_Options['prototype'][_0x314eca(0x231)],Scene_Options['prototype'][_0x314eca(0x231)]=function(){const _0x1ef994=_0x314eca;let _0x31cf05=VisuMZ[_0x1ef994(0x19b)][_0x1ef994(0x16c)][_0x1ef994(0x37e)](this);const _0x33d24c=VisuMZ['MessageCore'][_0x1ef994(0x17c)];if(_0x33d24c[_0x1ef994(0x3eb)][_0x1ef994(0x14a)]){if(_0x33d24c[_0x1ef994(0x17a)][_0x1ef994(0xfa)]&&TextManager[_0x1ef994(0x13c)]()){if(_0x1ef994(0x2a4)===_0x1ef994(0x2a4))_0x31cf05++;else{const _0x15bd8a=this[_0x1ef994(0x373)],_0x44e415=_0x15bd8a?_0x15bd8a['y']:0x0,_0x3a63be=_0x15bd8a?_0x15bd8a[_0x1ef994(0x501)]:0x0,_0x4c7d41=_0x24d4e4['boxHeight']/0x2;return _0x44e415<_0x4c7d41&&_0x44e415+_0x3a63be>_0x4c7d41?0x4:_0x14de2c[_0x1ef994(0x3d7)]();}}if(_0x33d24c[_0x1ef994(0x3eb)][_0x1ef994(0xfa)])_0x31cf05++;}return _0x31cf05;},VisuMZ['MessageCore'][_0x314eca(0x1df)]=Sprite_Picture[_0x314eca(0x393)][_0x314eca(0x48f)],Sprite_Picture[_0x314eca(0x393)][_0x314eca(0x48f)]=function(){const _0x3d960c=_0x314eca;VisuMZ[_0x3d960c(0x19b)]['Sprite_Picture_updateBitmap']['call'](this),this[_0x3d960c(0x539)]();},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x330)]=Sprite_Picture[_0x314eca(0x393)]['update'],Sprite_Picture[_0x314eca(0x393)][_0x314eca(0x36f)]=function(){const _0x18dc6a=_0x314eca;VisuMZ[_0x18dc6a(0x19b)][_0x18dc6a(0x330)]['call'](this),this['updatePictureText']();},Sprite_Picture[_0x314eca(0x393)]['updatePictureText']=function(){const _0x20ff65=_0x314eca;if(!this[_0x20ff65(0x4a1)])return;this[_0x20ff65(0x2c8)](),this['anchorPictureText'](),this['drawPictureText'](),this['attachPictureText']();},Sprite_Picture[_0x314eca(0x393)]['createPictureText']=function(){const _0x26fc40=_0x314eca;if(this[_0x26fc40(0x2b6)])return;if(this[_0x26fc40(0x1c8)])return;const _0x2132d3=new Rectangle(0x0,0x0,0x0,0x0);this['_pictureTextWindow']=new Window_Base(_0x2132d3),this['_pictureTextWindow']['padding']=0x0,this[_0x26fc40(0x1c8)]=new Sprite(),this[_0x26fc40(0xf0)](this['_pictureTextSprite'],0x0),this[_0x26fc40(0x4e0)]=0x0,this[_0x26fc40(0x1ff)]=0x0,this[_0x26fc40(0x440)]={};},Sprite_Picture[_0x314eca(0x393)][_0x314eca(0x2c8)]=function(){const _0x5f201a=_0x314eca;if(!this[_0x5f201a(0x2b6)])return;if(this['_pictureTextWidth']===this[_0x5f201a(0x367)]&&this[_0x5f201a(0x1ff)]===this[_0x5f201a(0x501)])return;this[_0x5f201a(0x4e0)]=this[_0x5f201a(0x367)],this[_0x5f201a(0x1ff)]=this[_0x5f201a(0x501)],this[_0x5f201a(0x440)]={},this['_pictureTextWindow']['move'](0x0,0x0,this[_0x5f201a(0x367)],this[_0x5f201a(0x501)]);},Sprite_Picture[_0x314eca(0x393)][_0x314eca(0x220)]=function(){const _0x1d659e=_0x314eca;if(!this[_0x1d659e(0x1c8)])return;this[_0x1d659e(0x1c8)][_0x1d659e(0x538)]['x']=this['anchor']['x'],this['_pictureTextSprite'][_0x1d659e(0x538)]['y']=this[_0x1d659e(0x538)]['y'];},Sprite_Picture[_0x314eca(0x393)][_0x314eca(0x4a9)]=function(){const _0x3eb82f=_0x314eca;if(!this['_pictureTextWindow'])return;if(!this[_0x3eb82f(0x4b8)]())return;const _0xe1d230=[_0x3eb82f(0x48d),'up','upperright','left',_0x3eb82f(0x397),_0x3eb82f(0x410),_0x3eb82f(0x36e),_0x3eb82f(0x498),_0x3eb82f(0x51e)];this['_pictureTextWindow'][_0x3eb82f(0x10e)]();for(const _0x3f1c7c of _0xe1d230){this[_0x3eb82f(0x226)](_0x3f1c7c);}},Sprite_Picture[_0x314eca(0x393)][_0x314eca(0x4b8)]=function(){const _0x11eeb3=_0x314eca;if($gameScreen[_0x11eeb3(0x206)](this[_0x11eeb3(0x3cf)]))return!![];const _0x132a7d=[_0x11eeb3(0x48d),'up',_0x11eeb3(0x3ac),'left',_0x11eeb3(0x397),_0x11eeb3(0x410),'lowerleft',_0x11eeb3(0x498),_0x11eeb3(0x51e)];for(const _0x2ab4f5 of _0x132a7d){const _0x3f9b7b=$gameScreen[_0x11eeb3(0x36b)](this['_pictureId'],_0x2ab4f5);if(this['_pictureTextCache'][_0x2ab4f5]===_0x3f9b7b)continue;return!![];}return![];},Sprite_Picture['prototype'][_0x314eca(0x226)]=function(_0xf69b3d){const _0x4b573a=_0x314eca;$gameScreen['clearPictureTextRefresh'](this[_0x4b573a(0x3cf)]);const _0x45423f=$gameScreen[_0x4b573a(0x36b)](this[_0x4b573a(0x3cf)],_0xf69b3d);this[_0x4b573a(0x440)][_0xf69b3d]=_0x45423f;const _0x31e921=this[_0x4b573a(0x2b6)]['textSizeEx'](_0x45423f);let _0x1d6858=$gameScreen[_0x4b573a(0x277)](this[_0x4b573a(0x3cf)]),_0x5979df=_0x1d6858,_0x3743b0=_0x1d6858;if(['up','center',_0x4b573a(0x498)]['includes'](_0xf69b3d)){if(_0x4b573a(0x2f5)!==_0x4b573a(0x2f5)){if(_0x48ead5[_0x4b573a(0x376)]!==_0x864280)return![];}else _0x5979df=Math[_0x4b573a(0x25c)]((this['width']-_0x31e921[_0x4b573a(0x367)])/0x2);}else['upperright',_0x4b573a(0x410),_0x4b573a(0x51e)][_0x4b573a(0x321)](_0xf69b3d)&&(_0x5979df=Math[_0x4b573a(0x25c)](this[_0x4b573a(0x367)]-_0x31e921[_0x4b573a(0x367)]-_0x1d6858));if([_0x4b573a(0x3a1),_0x4b573a(0x397),_0x4b573a(0x410)][_0x4b573a(0x321)](_0xf69b3d))_0x3743b0=Math[_0x4b573a(0x25c)]((this[_0x4b573a(0x501)]-_0x31e921[_0x4b573a(0x501)])/0x2);else['lowerleft',_0x4b573a(0x498),_0x4b573a(0x51e)]['includes'](_0xf69b3d)&&(_0x3743b0=Math[_0x4b573a(0x25c)](this[_0x4b573a(0x501)]-_0x31e921[_0x4b573a(0x501)]-_0x1d6858));this[_0x4b573a(0x2b6)][_0x4b573a(0x275)](_0x45423f,_0x5979df,_0x3743b0);},Sprite_Picture[_0x314eca(0x393)][_0x314eca(0x132)]=function(){const _0x4623bd=_0x314eca;if(!this[_0x4623bd(0x2b6)])return;if(!this[_0x4623bd(0x1c8)])return;this[_0x4623bd(0x1c8)][_0x4623bd(0x199)]=this[_0x4623bd(0x2b6)]['contents'];},VisuMZ['MessageCore']['Window_Base_initialize']=Window_Base['prototype'][_0x314eca(0x246)],Window_Base[_0x314eca(0x393)][_0x314eca(0x246)]=function(_0x1bc8a5){const _0x159fee=_0x314eca;this[_0x159fee(0x256)](_0x1bc8a5),VisuMZ[_0x159fee(0x19b)][_0x159fee(0x285)][_0x159fee(0x37e)](this,_0x1bc8a5);},Window_Base['prototype'][_0x314eca(0x256)]=function(_0xa29dde){const _0x1948b8=_0x314eca;this[_0x1948b8(0x3d2)](),this['resetWordWrap'](),this['registerResetRect'](_0xa29dde);},Window_Base[_0x314eca(0x393)]['initTextAlignement']=function(){const _0x47ed1b=_0x314eca;this[_0x47ed1b(0x112)](_0x47ed1b(0x174));},Window_Base[_0x314eca(0x393)]['setTextAlignment']=function(_0x4db582){const _0x20d8c0=_0x314eca;this[_0x20d8c0(0x354)]=_0x4db582;},Window_Base[_0x314eca(0x393)]['getTextAlignment']=function(){const _0x5ab8b6=_0x314eca;return this[_0x5ab8b6(0x354)];},VisuMZ[_0x314eca(0x19b)]['Window_Base_textSizeEx']=Window_Base[_0x314eca(0x393)]['textSizeEx'],Window_Base['prototype'][_0x314eca(0x455)]=function(_0x57c4e0){const _0x206d8b=_0x314eca;return this[_0x206d8b(0x4ed)](),VisuMZ['MessageCore']['Window_Base_textSizeEx'][_0x206d8b(0x37e)](this,_0x57c4e0);},Window_Base[_0x314eca(0x393)][_0x314eca(0x163)]=function(_0x12757f){const _0x1581fd=_0x314eca;return VisuMZ[_0x1581fd(0x19b)][_0x1581fd(0x39b)][_0x1581fd(0x37e)](this,_0x12757f);},VisuMZ['MessageCore'][_0x314eca(0x3d8)]=Window_Base[_0x314eca(0x393)][_0x314eca(0x12c)],Window_Base[_0x314eca(0x393)][_0x314eca(0x12c)]=function(_0x36bdd1){const _0x43df88=_0x314eca;VisuMZ[_0x43df88(0x19b)]['Window_Base_processAllText'][_0x43df88(0x37e)](this,_0x36bdd1);if(_0x36bdd1[_0x43df88(0x1e9)])this[_0x43df88(0x112)]('default');},Window_Base['prototype'][_0x314eca(0x4ed)]=function(){const _0x1125c2=_0x314eca;this[_0x1125c2(0x36c)](![]);},Window_Base[_0x314eca(0x393)][_0x314eca(0x139)]=function(){return this['_wordWrap'];},Window_Base[_0x314eca(0x393)][_0x314eca(0x36c)]=function(_0x22f415){const _0x38f8c4=_0x314eca;return this[_0x38f8c4(0x3c0)]=_0x22f415,'';},Window_Base[_0x314eca(0x393)][_0x314eca(0x4a4)]=function(_0x4fa0c9){const _0x555a36=_0x314eca;this[_0x555a36(0x491)]=JsonEx[_0x555a36(0x3ea)](_0x4fa0c9);},Window_Base['prototype']['resetFontSettings']=function(){const _0x45f652=_0x314eca;this[_0x45f652(0x201)][_0x45f652(0x4e1)]=$gameSystem[_0x45f652(0x2b8)](),this[_0x45f652(0x201)][_0x45f652(0x4e3)]=$gameSystem['mainFontSize'](),this['contents'][_0x45f652(0x1da)]=![],this[_0x45f652(0x201)][_0x45f652(0x51b)]=![],this['resetTextColor']();},Window_Base[_0x314eca(0x393)]['resetTextColor']=function(){const _0x4673fe=_0x314eca;this['changeTextColor'](ColorManager[_0x4673fe(0x33f)]()),this[_0x4673fe(0x443)](ColorManager[_0x4673fe(0x11f)]());const _0x3f68e5=VisuMZ[_0x4673fe(0x19b)][_0x4673fe(0x17c)][_0x4673fe(0x4c9)];_0x3f68e5['DefaultOutlineWidth']===undefined&&('MkcZP'===_0x4673fe(0x542)?(this[_0x4673fe(0x160)]=0x0,_0x27240f[_0x4673fe(0x19b)][_0x4673fe(0x42d)][_0x4673fe(0x37e)](this)):_0x3f68e5[_0x4673fe(0x3b6)]=0x3),this[_0x4673fe(0x201)][_0x4673fe(0x454)]=_0x3f68e5['DefaultOutlineWidth'],this['setColorLock'](![]);},Window_Base[_0x314eca(0x393)]['setColorLock']=function(_0x56e93b){const _0x2ddb82=_0x314eca;this[_0x2ddb82(0x326)]=_0x56e93b;},Window_Base['prototype']['isColorLocked']=function(){const _0xebf9ae=_0x314eca;return this[_0xebf9ae(0x326)];},Window_Base['prototype']['isAutoColorAffected']=function(){return![];},Window_Base['prototype']['getPreservedFontSettings']=function(){const _0x4becb1=_0x314eca,_0x39d686=[_0x4becb1(0x4e1),'fontSize',_0x4becb1(0x1da),_0x4becb1(0x51b),_0x4becb1(0x549),_0x4becb1(0x24c),'outlineWidth',_0x4becb1(0x298)];let _0x3d2438={};for(const _0x2fe0d8 of _0x39d686){_0x3d2438[_0x2fe0d8]=this[_0x4becb1(0x201)][_0x2fe0d8];}return _0x3d2438;},Window_Base[_0x314eca(0x393)][_0x314eca(0x439)]=function(_0x5c6862){const _0x15a141=_0x314eca;for(const _0x4fe724 in _0x5c6862){_0x15a141(0x118)!==_0x15a141(0x118)?(this[_0x15a141(0x11a)](_0x297521),this[_0x15a141(0x29a)](_0x5dec1a),this[_0x15a141(0x531)]()):this[_0x15a141(0x201)][_0x4fe724]=_0x5c6862[_0x4fe724];}},VisuMZ[_0x314eca(0x19b)]['Window_Base_update']=Window_Base['prototype']['update'],Window_Base['prototype'][_0x314eca(0x36f)]=function(){const _0xbba9fb=_0x314eca;VisuMZ[_0xbba9fb(0x19b)][_0xbba9fb(0x3a8)][_0xbba9fb(0x37e)](this),this[_0xbba9fb(0x460)]();},Window_Base[_0x314eca(0x393)][_0x314eca(0x100)]=function(){return![];},Window_Base[_0x314eca(0x393)]['updateMove']=function(){const _0x4fefc5=_0x314eca;this[_0x4fefc5(0x15c)]>0x0&&(this[_0x4fefc5(0x100)]()&&(this['x']=this[_0x4fefc5(0x253)](this['x'],this[_0x4fefc5(0x2bf)]),this['y']=this[_0x4fefc5(0x253)](this['y'],this['_moveTargetY']),this['width']=this['applyMoveEasing'](this[_0x4fefc5(0x367)],this[_0x4fefc5(0x18d)]),this[_0x4fefc5(0x501)]=this[_0x4fefc5(0x253)](this[_0x4fefc5(0x501)],this[_0x4fefc5(0x446)]),this[_0x4fefc5(0x3c1)]()),this['_moveDuration']--);},Window_Base[_0x314eca(0x393)][_0x314eca(0x3c1)]=function(_0x1e821b,_0x5a4bee){const _0x310672=_0x314eca;!_0x1e821b&&(this[_0x310672(0x367)]=Math[_0x310672(0x1aa)](this[_0x310672(0x367)],Graphics['width']),this['height']=Math['min'](this[_0x310672(0x501)],Graphics[_0x310672(0x501)]));if(!_0x5a4bee){const _0x16d805=-(Math['floor'](Graphics[_0x310672(0x367)]-Graphics[_0x310672(0x137)])/0x2),_0x1dc195=_0x16d805+Graphics[_0x310672(0x367)]-this[_0x310672(0x367)],_0x10604b=-(Math[_0x310672(0x25c)](Graphics['height']-Graphics[_0x310672(0x14f)])/0x2),_0x201588=_0x10604b+Graphics[_0x310672(0x501)]-this[_0x310672(0x501)];this['x']=this['x'][_0x310672(0x11e)](_0x16d805,_0x1dc195),this['y']=this['y'][_0x310672(0x11e)](_0x10604b,_0x201588);}},Window_Base['prototype'][_0x314eca(0x253)]=function(_0x1d29cc,_0x81c5a8){const _0x3c00d5=_0x314eca,_0x3d8df5=this['_moveDuration'],_0x1d8714=this[_0x3c00d5(0x267)],_0x1d34b7=this[_0x3c00d5(0x18f)]((_0x1d8714-_0x3d8df5)/_0x1d8714),_0x540495=this[_0x3c00d5(0x18f)]((_0x1d8714-_0x3d8df5+0x1)/_0x1d8714),_0x3f2849=(_0x1d29cc-_0x81c5a8*_0x1d34b7)/(0x1-_0x1d34b7);return _0x3f2849+(_0x81c5a8-_0x3f2849)*_0x540495;},Window_Base[_0x314eca(0x393)][_0x314eca(0x18f)]=function(_0x2fc295){const _0x28b5ce=_0x314eca,_0xd9fdaf=0x2;switch(this[_0x28b5ce(0x21a)]){case 0x0:return _0x2fc295;case 0x1:return this[_0x28b5ce(0x22d)](_0x2fc295,_0xd9fdaf);case 0x2:return this[_0x28b5ce(0x4d4)](_0x2fc295,_0xd9fdaf);case 0x3:return this[_0x28b5ce(0x244)](_0x2fc295,_0xd9fdaf);default:if(Imported[_0x28b5ce(0x28f)]){if(_0x28b5ce(0x262)==='WBVWx')return VisuMZ[_0x28b5ce(0x253)](_0x2fc295,this['_moveEasingType']);else this['y']=_0x5b625a['y']+_0x19db12['height'];}else{if(_0x28b5ce(0x369)===_0x28b5ce(0x159)){if(this[_0x28b5ce(0x3f9)]===_0x57ad3d)this[_0x28b5ce(0x256)]();if(this[_0x28b5ce(0x3f9)]['messageRows']===_0x3e1707)this[_0x28b5ce(0x256)]();this['_MessageCoreSettings'][_0x28b5ce(0x402)]=_0xb3c701||0x1;}else return _0x2fc295;}}},Window_Base['prototype'][_0x314eca(0x236)]=function(_0x4d6bbb,_0x2f2327,_0x36df62,_0x50fba1,_0x38b870,_0x456688){const _0x45abd=_0x314eca;this['_moveTargetX']=_0x4d6bbb,this['_moveTargetY']=_0x2f2327,this[_0x45abd(0x18d)]=_0x36df62||this[_0x45abd(0x367)],this['_moveTargetHeight']=_0x50fba1||this['height'],this['_moveDuration']=_0x38b870||0x1;if(this[_0x45abd(0x15c)]<=0x0)this[_0x45abd(0x15c)]=0x1;this['_wholeMoveDuration']=this[_0x45abd(0x15c)],this[_0x45abd(0x21a)]=_0x456688||0x0;if(_0x38b870<=0x0)this[_0x45abd(0x460)]();},Window_Base[_0x314eca(0x393)]['moveBy']=function(_0x4d79be,_0x1ef65e,_0x40b6ca,_0x1d9eab,_0x32f1ea,_0x4bf848){const _0x2de5b5=_0x314eca;this['_moveTargetX']=this['x']+_0x4d79be,this['_moveTargetY']=this['y']+_0x1ef65e,this['_moveTargetWidth']=this['width']+(_0x40b6ca||0x0),this[_0x2de5b5(0x446)]=this['height']+(_0x1d9eab||0x0),this[_0x2de5b5(0x15c)]=_0x32f1ea||0x1;if(this[_0x2de5b5(0x15c)]<=0x0)this[_0x2de5b5(0x15c)]=0x1;this[_0x2de5b5(0x267)]=this['_moveDuration'],this[_0x2de5b5(0x21a)]=_0x4bf848||0x0;if(_0x32f1ea<=0x0)this[_0x2de5b5(0x460)]();},Window_Base[_0x314eca(0x393)][_0x314eca(0x119)]=function(_0x2387a9,_0x3e89a3){const _0x1120a4=_0x314eca;this[_0x1120a4(0x236)](this[_0x1120a4(0x491)]['x'],this[_0x1120a4(0x491)]['y'],this['_resetRect']['width'],this['_resetRect'][_0x1120a4(0x501)],_0x2387a9,_0x3e89a3);},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x3e5)]=Window_Base[_0x314eca(0x393)][_0x314eca(0x218)],Window_Base[_0x314eca(0x393)]['changeTextColor']=function(_0x4cf344){const _0xd023cb=_0x314eca;if(this[_0xd023cb(0x1a2)]())return;_0x4cf344=_0x4cf344[_0xd023cb(0x1e5)](/\,/g,''),this['_textColorStack']=this[_0xd023cb(0x54b)]||[],this[_0xd023cb(0x54b)][_0xd023cb(0x279)](this['contents'][_0xd023cb(0x549)]),VisuMZ[_0xd023cb(0x19b)][_0xd023cb(0x3e5)]['call'](this,_0x4cf344);},Window_Base[_0x314eca(0x393)][_0x314eca(0x3b0)]=function(_0x2c2e1c){const _0x15a4fd=_0x314eca;this['obtainEscapeParam'](_0x2c2e1c);if(this['isColorLocked']())return;_0x2c2e1c[_0x15a4fd(0x1e9)]&&(this[_0x15a4fd(0x54b)]=this['_textColorStack']||[],this[_0x15a4fd(0x201)][_0x15a4fd(0x549)]=this['_textColorStack']['shift']()||ColorManager[_0x15a4fd(0x33f)]());},Window_Base[_0x314eca(0x393)]['convertEscapeCharacters']=function(_0x272f09){const _0x1c009b=_0x314eca;return _0x272f09=this[_0x1c009b(0x38b)](_0x272f09),_0x272f09=this[_0x1c009b(0x405)](_0x272f09),_0x272f09=this[_0x1c009b(0x1f1)](_0x272f09),_0x272f09=this[_0x1c009b(0x2fe)](_0x272f09),_0x272f09=this['preConvertEscapeCharacters'](_0x272f09),_0x272f09=this[_0x1c009b(0x4ae)](_0x272f09),_0x272f09=this['convertFontSettingsEscapeCharacters'](_0x272f09),_0x272f09=this[_0x1c009b(0x14e)](_0x272f09),_0x272f09=this[_0x1c009b(0x19d)](_0x272f09),_0x272f09=this[_0x1c009b(0x2e6)](_0x272f09),_0x272f09=this[_0x1c009b(0x2b0)](_0x272f09),_0x272f09=this[_0x1c009b(0x412)](_0x272f09),_0x272f09=this[_0x1c009b(0x17f)](_0x272f09),_0x272f09=this[_0x1c009b(0x545)](_0x272f09),_0x272f09=this[_0x1c009b(0x1f1)](_0x272f09),_0x272f09=this[_0x1c009b(0x2e9)](_0x272f09),_0x272f09=this[_0x1c009b(0x513)](_0x272f09),_0x272f09;},Window_Base[_0x314eca(0x393)][_0x314eca(0x38b)]=function(_0x1d0db6){const _0x15907b=_0x314eca;this[_0x15907b(0x1fc)]=![];for(const _0x455ae9 of VisuMZ['MessageCore']['Settings'][_0x15907b(0x344)]){_0x1d0db6[_0x15907b(0x34e)](_0x455ae9['textCodeCheck'])&&(this[_0x15907b(0x1fc)]=!![],_0x1d0db6=_0x1d0db6['replace'](_0x455ae9[_0x15907b(0x448)],_0x455ae9[_0x15907b(0x4a5)][_0x15907b(0x424)](this)));}return _0x1d0db6;},Window_Base[_0x314eca(0x393)][_0x314eca(0x405)]=function(_0x435ade){const _0x176293=_0x314eca;return _0x435ade=_0x435ade[_0x176293(0x1e5)](/\\/g,'\x1b'),_0x435ade=_0x435ade[_0x176293(0x1e5)](/\x1b\x1b/g,'\x5c'),_0x435ade;},Window_Base[_0x314eca(0x393)][_0x314eca(0x1f1)]=function(_0x8462f4){const _0x4ee9fd=_0x314eca;for(;;){if(_0x4ee9fd(0x2e7)==='WVDQE'){if(this['_maxShuffleChoices']===_0x51af53)this[_0x4ee9fd(0x2fc)]();return this['_maxShuffleChoices'];}else{if(_0x8462f4['match'](/\\V\[(\d+)\]/gi))_0x8462f4=_0x8462f4['replace'](/\\V\[(\d+)\]/gi,(_0x27134b,_0x4e75f0)=>this[_0x4ee9fd(0x405)](String($gameVariables['value'](parseInt(_0x4e75f0)))));else{if(_0x8462f4[_0x4ee9fd(0x34e)](/\x1bV\[(\d+)\]/gi))_0x8462f4=_0x8462f4[_0x4ee9fd(0x1e5)](/\x1bV\[(\d+)\]/gi,(_0x17e300,_0x274f1f)=>this[_0x4ee9fd(0x405)](String($gameVariables[_0x4ee9fd(0x27f)](parseInt(_0x274f1f)))));else{if(_0x4ee9fd(0x1ce)===_0x4ee9fd(0x1ce))break;else{const _0x2204ce=[_0x4ee9fd(0x234),_0x4ee9fd(0x372),_0x4ee9fd(0x49a),_0x4ee9fd(0x352),_0x4ee9fd(0x4d9),_0x4ee9fd(0x48e),_0x4ee9fd(0x14c),'obtainExp',_0x4ee9fd(0x272),'obtainItem'];let _0x491a8b=_0x39d02f[_0x4ee9fd(0x19b)][_0x4ee9fd(0x138)][_0x4ee9fd(0x37e)](this,_0x14947);return _0x2204ce['includes'](_0xf67947)&&(_0x491a8b=_0x4ee9fd(0x254)+_0x491a8b),_0x491a8b;}}}}}return _0x8462f4;},Window_Base[_0x314eca(0x393)][_0x314eca(0x2fe)]=function(_0x176fc0){const _0x2964b7=_0x314eca;return Imported[_0x2964b7(0x28f)]&&(_0x176fc0=_0x176fc0[_0x2964b7(0x1e5)](/<Up (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('up')),_0x176fc0=_0x176fc0[_0x2964b7(0x1e5)](/<Left (?:KEY|BUTTON)>/gi,this[_0x2964b7(0x520)](_0x2964b7(0x3a1))),_0x176fc0=_0x176fc0[_0x2964b7(0x1e5)](/<Right (?:KEY|BUTTON)>/gi,this[_0x2964b7(0x520)](_0x2964b7(0x410))),_0x176fc0=_0x176fc0[_0x2964b7(0x1e5)](/<Down (?:KEY|BUTTON)>/gi,this[_0x2964b7(0x520)](_0x2964b7(0x498))),_0x176fc0=_0x176fc0['replace'](/<Ok (?:KEY|BUTTON)>/gi,this[_0x2964b7(0x520)]('ok')),_0x176fc0=_0x176fc0[_0x2964b7(0x1e5)](/<Cancel (?:KEY|BUTTON)>/gi,this[_0x2964b7(0x520)]('cancel')),_0x176fc0=_0x176fc0['replace'](/<Menu (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x2964b7(0x377))),_0x176fc0=_0x176fc0['replace'](/<Shift (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x2964b7(0x136))),_0x176fc0=_0x176fc0[_0x2964b7(0x1e5)](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this[_0x2964b7(0x520)](_0x2964b7(0x328))),_0x176fc0=_0x176fc0[_0x2964b7(0x1e5)](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this[_0x2964b7(0x520)](_0x2964b7(0x130)))),_0x176fc0;},Window_Base['prototype'][_0x314eca(0x520)]=function(_0x5bd99a){const _0x3b4e1d=_0x314eca;let _0x48c1cc=TextManager[_0x3b4e1d(0x46e)](_0x5bd99a)||'';return _0x48c1cc=this[_0x3b4e1d(0x405)](_0x48c1cc),_0x48c1cc=this[_0x3b4e1d(0x1f1)](_0x48c1cc),_0x48c1cc[_0x3b4e1d(0x1ab)]();},Window_Base[_0x314eca(0x393)][_0x314eca(0x241)]=function(_0x4bd626){const _0x5704cf=_0x314eca;return _0x4bd626=this[_0x5704cf(0x195)](_0x4bd626),this[_0x5704cf(0x43d)](),_0x4bd626;},Window_Base[_0x314eca(0x393)]['switchOutTextForLocalization']=function(_0xd1932f){const _0x4fc199=_0x314eca;return _0xd1932f=TextManager[_0x4fc199(0x268)](_0xd1932f),_0xd1932f;},VisuMZ['MessageCore']['String_format']=String[_0x314eca(0x393)][_0x314eca(0x3ff)],String[_0x314eca(0x393)][_0x314eca(0x3ff)]=function(){const _0x2ee2d4=_0x314eca;let _0xf9136c=this;return _0xf9136c=TextManager[_0x2ee2d4(0x268)](_0xf9136c),VisuMZ[_0x2ee2d4(0x19b)]['String_format'][_0x2ee2d4(0x2e1)](_0xf9136c,arguments);},VisuMZ[_0x314eca(0x19b)]['Bitmap_drawText']=Bitmap['prototype'][_0x314eca(0x3f6)],Bitmap[_0x314eca(0x393)][_0x314eca(0x3f6)]=function(_0x368b4d,_0x5efbea,_0x27695a,_0x2af7a8,_0x22b084,_0x5023c3){_0x368b4d=TextManager['parseLocalizedText'](_0x368b4d),VisuMZ['MessageCore']['Bitmap_drawText']['call'](this,_0x368b4d,_0x5efbea,_0x27695a,_0x2af7a8,_0x22b084,_0x5023c3);},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x2a3)]=Bitmap[_0x314eca(0x393)][_0x314eca(0x487)],Bitmap[_0x314eca(0x393)]['drawTextTopAligned']=function(_0x1269a8,_0x11512e,_0x3bde9b,_0xd02e46,_0x41eaa8,_0x4085fa){const _0x430411=_0x314eca;_0x1269a8=TextManager[_0x430411(0x268)](_0x1269a8),VisuMZ['MessageCore']['Bitmap_drawTextTopAligned'][_0x430411(0x37e)](this,_0x1269a8,_0x11512e,_0x3bde9b,_0xd02e46,_0x41eaa8,_0x4085fa);},Window_Base[_0x314eca(0x393)]['postConvertEscapeCharacters']=function(_0x380f47){return _0x380f47;},Window_Base[_0x314eca(0x393)][_0x314eca(0x4ae)]=function(_0x3dc059){const _0x4a9ef8=_0x314eca;return this[_0x4a9ef8(0x2aa)]()&&(_0x3dc059=_0x3dc059[_0x4a9ef8(0x1e5)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x3dc059=_0x3dc059[_0x4a9ef8(0x1e5)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x3dc059=_0x3dc059[_0x4a9ef8(0x1e5)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x3dc059=_0x3dc059['replace'](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x3dc059=_0x3dc059[_0x4a9ef8(0x1e5)](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x3dc059=_0x3dc059[_0x4a9ef8(0x1e5)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi,''),_0x3dc059=_0x3dc059[_0x4a9ef8(0x1e5)](/<(?:FG|BG)(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/gi,''),_0x3dc059=_0x3dc059['replace'](/<(?:FG|BG)(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/gi,'')),_0x3dc059;},Window_Base[_0x314eca(0x393)][_0x314eca(0x2aa)]=function(){const _0x431e03=_0x314eca,_0x25d815=[_0x431e03(0x40b),_0x431e03(0x517)];return _0x25d815[_0x431e03(0x321)](this['constructor']['name']);},Window_Base[_0x314eca(0x393)][_0x314eca(0x46b)]=function(_0x2de09f){const _0x11bb60=_0x314eca;return _0x2de09f=_0x2de09f[_0x11bb60(0x1e5)](/<B>/gi,'\x1bBOLD[1]'),_0x2de09f=_0x2de09f[_0x11bb60(0x1e5)](/<\/B>/gi,_0x11bb60(0x185)),_0x2de09f=_0x2de09f['replace'](/<I>/gi,'\x1bITALIC[1]'),_0x2de09f=_0x2de09f[_0x11bb60(0x1e5)](/<\/I>/gi,_0x11bb60(0x441)),_0x2de09f;},Window_Base[_0x314eca(0x393)][_0x314eca(0x14e)]=function(_0x360a25){const _0x45327f=_0x314eca;return _0x360a25=_0x360a25[_0x45327f(0x1e5)](/<LEFT>/gi,_0x45327f(0x4b0)),_0x360a25=_0x360a25[_0x45327f(0x1e5)](/<\/LEFT>/gi,_0x45327f(0x48b)),_0x360a25=_0x360a25[_0x45327f(0x1e5)](/<CENTER>/gi,_0x45327f(0x449)),_0x360a25=_0x360a25[_0x45327f(0x1e5)](/<\/CENTER>/gi,_0x45327f(0x48b)),_0x360a25=_0x360a25['replace'](/<RIGHT>/gi,_0x45327f(0x480)),_0x360a25=_0x360a25[_0x45327f(0x1e5)](/<\/RIGHT>/gi,_0x45327f(0x48b)),_0x360a25;},Window_Base[_0x314eca(0x393)]['convertLockColorsEscapeCharacters']=function(_0xd1631d){const _0x5a3f7a=_0x314eca;return _0xd1631d=_0xd1631d[_0x5a3f7a(0x1e5)](/<COLORLOCK>/gi,_0x5a3f7a(0x17e)),_0xd1631d=_0xd1631d['replace'](/<\/COLORLOCK>/gi,_0x5a3f7a(0x1c7)),_0xd1631d=_0xd1631d[_0x5a3f7a(0x1e5)](/\(\(\(/gi,_0x5a3f7a(0x17e)),_0xd1631d=_0xd1631d[_0x5a3f7a(0x1e5)](/\)\)\)/gi,_0x5a3f7a(0x1c7)),_0xd1631d;},Window_Base['prototype'][_0x314eca(0x2e6)]=function(_0x517981){const _0x358e8f=_0x314eca;return _0x517981=_0x517981[_0x358e8f(0x1e5)](/\x1bN\[(\d+)\]/gi,(_0x595426,_0x2548f1)=>this['actorName'](parseInt(_0x2548f1))),_0x517981=_0x517981[_0x358e8f(0x1e5)](/\x1bP\[(\d+)\]/gi,(_0x20852c,_0x3d4b43)=>this[_0x358e8f(0x43f)](parseInt(_0x3d4b43))),_0x517981=_0x517981[_0x358e8f(0x1e5)](/\x1bG/gi,TextManager[_0x358e8f(0x284)]),_0x517981;},Window_Base['prototype']['convertHardcodedEscapeReplacements']=function(_0x38473c){const _0x284319=_0x314eca;return _0x38473c=_0x38473c[_0x284319(0x1e5)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this['battleTargetName']()),_0x38473c=_0x38473c[_0x284319(0x1e5)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x284319(0x419)]()),_0x38473c=_0x38473c['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x284319(0x2fb)](!![])),_0x38473c=_0x38473c[_0x284319(0x1e5)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x284319(0x2fb)](![])),_0x38473c;},Window_Base['prototype'][_0x314eca(0x22c)]=function(){const _0xbbadfd=_0x314eca;if(!SceneManager[_0xbbadfd(0x145)]())return'';if(BattleManager[_0xbbadfd(0x4d2)])return BattleManager[_0xbbadfd(0x4d2)][_0xbbadfd(0x1c6)]();if(BattleManager['_targets'][0x0])return BattleManager[_0xbbadfd(0x33c)][0x0][_0xbbadfd(0x1c6)]();return'';},Window_Base[_0x314eca(0x393)]['battleUserName']=function(){const _0x4a7e59=_0x314eca;if(!SceneManager[_0x4a7e59(0x145)]())return'';let _0x1f663c=null;return _0x1f663c=BattleManager[_0x4a7e59(0x47f)],!_0x1f663c&&BattleManager['isInputting']()&&(_0x4a7e59(0x401)==='qDrfa'?_0x571db1='</WORDWRAP>'+_0x3f624d:_0x1f663c=BattleManager['actor']()),_0x1f663c?_0x1f663c['name']():'';},Window_Base[_0x314eca(0x393)][_0x314eca(0x2fb)]=function(_0x68e27e){const _0x453b5a=_0x314eca;if(!SceneManager[_0x453b5a(0x145)]())return'';let _0x5d9754=BattleManager[_0x453b5a(0x4fa)]||null;!_0x5d9754&&BattleManager[_0x453b5a(0x394)]()&&(_0x5d9754=BattleManager[_0x453b5a(0x1b3)]());if(_0x5d9754&&_0x5d9754[_0x453b5a(0x493)]()){if('LZpWf'===_0x453b5a(0x202))_0x1823fa+=_0x35a984;else{let _0x434210='';if(_0x68e27e)_0x434210+=_0x453b5a(0x1ea)[_0x453b5a(0x3ff)](_0x5d9754[_0x453b5a(0x493)]()[_0x453b5a(0x3bd)]);return _0x434210+=_0x5d9754[_0x453b5a(0x493)]()['name'],_0x434210;}}return'';},Window_Base[_0x314eca(0x393)][_0x314eca(0x412)]=function(_0xbafafb){const _0x26ca89=_0x314eca;for(const _0x51f83d of VisuMZ[_0x26ca89(0x19b)][_0x26ca89(0x17c)][_0x26ca89(0x3c3)]){if(_0x26ca89(0x4c0)===_0x26ca89(0x209))return this[_0x26ca89(0x3c0)];else{if(_0xbafafb[_0x26ca89(0x34e)](_0x51f83d[_0x26ca89(0x448)])){if(_0x26ca89(0x1f2)===_0x26ca89(0x1f2))_0xbafafb=_0xbafafb[_0x26ca89(0x1e5)](_0x51f83d[_0x26ca89(0x448)],_0x51f83d['textCodeResult']),_0xbafafb=this['convertVariableEscapeCharacters'](_0xbafafb);else{if(_0x2bf70e){let _0x3dd07c=this[_0x26ca89(0x374)][_0x26ca89(0x39f)](_0x1f3f6e);this[_0x26ca89(0x456)](_0x3dd07c);}}}}}return _0xbafafb;},Window_Base[_0x314eca(0x393)][_0x314eca(0x17f)]=function(_0x111194){const _0x1feb0c=_0x314eca;for(const _0x13905a of VisuMZ[_0x1feb0c(0x19b)][_0x1feb0c(0x17c)][_0x1feb0c(0x541)]){_0x111194[_0x1feb0c(0x34e)](_0x13905a[_0x1feb0c(0x448)])&&(_0x111194=_0x111194[_0x1feb0c(0x1e5)](_0x13905a[_0x1feb0c(0x448)],_0x13905a[_0x1feb0c(0x4a5)][_0x1feb0c(0x424)](this)),_0x111194=this[_0x1feb0c(0x1f1)](_0x111194));}return _0x111194;},Window_Base[_0x314eca(0x393)][_0x314eca(0x4ff)]=function(_0x24139d){const _0x2cf66d=_0x314eca,_0x584cd4=_0x24139d>=0x1?$gameActors['actor'](_0x24139d):null,_0x3d45c7=_0x584cd4?_0x584cd4[_0x2cf66d(0x1c6)]():'',_0x493b48=Number(VisuMZ[_0x2cf66d(0x19b)][_0x2cf66d(0x17c)]['AutoColor'][_0x2cf66d(0x255)]);return this[_0x2cf66d(0x2a9)]()&&_0x493b48!==0x0?_0x2cf66d(0x437)[_0x2cf66d(0x3ff)](_0x493b48,_0x3d45c7):_0x3d45c7;},Window_Base['prototype'][_0x314eca(0x43f)]=function(_0x13a826){const _0x5c9c04=_0x314eca,_0x2da4f5=_0x13a826>=0x1?$gameParty[_0x5c9c04(0x3d0)]()[_0x13a826-0x1]:null,_0x2ab2e8=_0x2da4f5?_0x2da4f5[_0x5c9c04(0x1c6)]():'',_0x509a37=Number(VisuMZ[_0x5c9c04(0x19b)][_0x5c9c04(0x17c)][_0x5c9c04(0x525)]['Actors']);if(this[_0x5c9c04(0x2a9)]()&&_0x509a37!==0x0){if('kPxOX'==='kPxOX')return _0x5c9c04(0x437)[_0x5c9c04(0x3ff)](_0x509a37,_0x2ab2e8);else _0x550fb9=_0xb7aa0b[_0x5c9c04(0x156)](_0x386250['$1'])['trim'](),_0x56c2f9=_0x3a8c05[_0x5c9c04(0x156)](_0x19d98e['$2'])['trim'](),_0x579763=!![];}else{if(_0x5c9c04(0x4d1)==='EIJal'){if(_0x302741[_0x5c9c04(0x39a)]===_0x18edf1){if(_0x44898b[_0x5c9c04(0x50a)]==='')this[_0x5c9c04(0x190)](_0x327abf);_0x4a333a[_0x5c9c04(0x2cf)]['call'](this,_0x37f0e6);if(this[_0x5c9c04(0x19c)]===_0x4943e5){const _0xbae9ec=_0x549cba['CommonEvent']||0x0;if(_0xbae9ec>0x0)this[_0x5c9c04(0x4a8)](_0xbae9ec);}}}else return _0x2ab2e8;}},Window_Base[_0x314eca(0x393)][_0x314eca(0x2e9)]=function(_0x488207){const _0x4b91d2=_0x314eca;return this[_0x4b91d2(0x2a9)]()&&(_0x488207=this[_0x4b91d2(0x40f)](_0x488207),_0x488207=this[_0x4b91d2(0x50e)](_0x488207)),_0x488207;},Window_Base[_0x314eca(0x393)][_0x314eca(0x40f)]=function(_0x4aedc1){const _0x3c0df4=_0x314eca;for(autoColor of VisuMZ[_0x3c0df4(0x19b)][_0x3c0df4(0x3d4)]){_0x4aedc1=_0x4aedc1['replace'](autoColor[0x0],autoColor[0x1]);}return _0x4aedc1;},Window_Base['prototype'][_0x314eca(0x3b9)]=function(){this['_autoColorActorNames']=[];},Window_Base[_0x314eca(0x393)][_0x314eca(0x43d)]=function(){const _0x1073a7=_0x314eca;this[_0x1073a7(0x3b9)]();const _0x2d134b=VisuMZ[_0x1073a7(0x19b)][_0x1073a7(0x17c)]['AutoColor'],_0x4a7c46=_0x2d134b[_0x1073a7(0x255)];if(_0x4a7c46<=0x0)return;for(const _0x4dbe13 of $gameActors['_data']){if(!_0x4dbe13)continue;const _0x139338=_0x4dbe13[_0x1073a7(0x1c6)]();if(_0x139338[_0x1073a7(0x1ab)]()[_0x1073a7(0x428)]<=0x0)continue;if(/^\d+$/[_0x1073a7(0x1a7)](_0x139338))continue;if(_0x139338[_0x1073a7(0x34e)](/-----/i))continue;let _0x329ce8=VisuMZ[_0x1073a7(0x19b)]['ConvertTextAutoColorRegExpFriendly'](_0x139338);const _0x49a45d=new RegExp('\x5cb'+_0x329ce8+'\x5cb','g'),_0x165212=_0x1073a7(0x437)['format'](_0x4a7c46,_0x139338);this[_0x1073a7(0x398)][_0x1073a7(0x4bd)]([_0x49a45d,_0x165212]);}},Window_Base[_0x314eca(0x393)][_0x314eca(0x50e)]=function(_0x53609e){const _0x2cd8f7=_0x314eca;if(this[_0x2cd8f7(0x398)]===undefined){if('pXeKo'===_0x2cd8f7(0x3a4))this[_0x2cd8f7(0x43d)]();else return _0x347068;}for(autoColor of this['_autoColorActorNames']){if('rvcsv'!=='nlFrt')_0x53609e=_0x53609e[_0x2cd8f7(0x1e5)](autoColor[0x0],autoColor[0x1]);else{if(this['_pictureText']===_0xe09cca)this[_0x2cd8f7(0x408)]();const _0x4908f5=this[_0x2cd8f7(0x400)](_0x24fcf1);this[_0x2cd8f7(0x334)][_0x4908f5]=null,this[_0x2cd8f7(0x456)](_0x27fe63,!![]);}}return _0x53609e;},Window_Base['prototype'][_0x314eca(0x548)]=function(_0x130ba5,_0x2d047a,_0x348062){const _0x43cf2d=_0x314eca;if(!_0x130ba5)return'';const _0x152871=_0x130ba5[_0x2d047a];let _0x4398a2='';if(_0x152871&&_0x348062&&_0x152871[_0x43cf2d(0x3bd)]){const _0x3249fb=_0x43cf2d(0x150);_0x4398a2=_0x3249fb[_0x43cf2d(0x3ff)](_0x152871[_0x43cf2d(0x3bd)],_0x152871['name']);}else{if(_0x152871)_0x4398a2=_0x152871[_0x43cf2d(0x1c6)];else{if(_0x43cf2d(0x349)!=='frCSD')_0x4398a2='';else return this[_0x43cf2d(0x160)]=_0x5976d3,'';}}return this[_0x43cf2d(0x2a9)]()&&(_0x4398a2=this[_0x43cf2d(0x1c9)](_0x4398a2,_0x130ba5)),_0x4398a2;},Window_Base[_0x314eca(0x393)][_0x314eca(0x2ac)]=function(){const _0x1da199=_0x314eca,_0x5f1281=$gameParty['getLastGainedItemData']();if(_0x5f1281['id']<0x0)return'';let _0x1becf6=null;if(_0x5f1281[_0x1da199(0x3e2)]===0x0)_0x1becf6=$dataItems[_0x5f1281['id']];if(_0x5f1281[_0x1da199(0x3e2)]===0x1)_0x1becf6=$dataWeapons[_0x5f1281['id']];if(_0x5f1281['type']===0x2)_0x1becf6=$dataArmors[_0x5f1281['id']];if(!_0x1becf6)return'';return _0x1da199(0x3a0)['format'](_0x1becf6[_0x1da199(0x3bd)]);},Window_Base[_0x314eca(0x393)][_0x314eca(0x26d)]=function(_0x5c8d28){const _0x47af00=_0x314eca,_0x2bfcb4=$gameParty['getLastGainedItemData']();if(_0x2bfcb4['id']<0x0)return'';let _0x5094a7=null;if(_0x2bfcb4['type']===0x0)_0x5094a7=$dataItems[_0x2bfcb4['id']];if(_0x2bfcb4['type']===0x1)_0x5094a7=$dataWeapons[_0x2bfcb4['id']];if(_0x2bfcb4['type']===0x2)_0x5094a7=$dataArmors[_0x2bfcb4['id']];if(!_0x5094a7)return'';return _0x5c8d28?_0x47af00(0x150)[_0x47af00(0x3ff)](_0x5094a7[_0x47af00(0x3bd)],_0x5094a7[_0x47af00(0x1c6)]):_0x5094a7[_0x47af00(0x1c6)];},Window_Base[_0x314eca(0x393)][_0x314eca(0x33d)]=function(){const _0x29df38=_0x314eca,_0x305a80=$gameParty[_0x29df38(0x532)]();if(_0x305a80['id']<=0x0)return'';return _0x305a80['quantity'];},Window_Base[_0x314eca(0x393)][_0x314eca(0x1c9)]=function(_0x56d8a1,_0xac7ca1){const _0x180476=_0x314eca,_0xbb06a2=VisuMZ[_0x180476(0x19b)]['Settings'][_0x180476(0x525)];let _0x296eef=0x0;if(_0xac7ca1===$dataActors)_0x296eef=_0xbb06a2[_0x180476(0x255)];if(_0xac7ca1===$dataClasses)_0x296eef=_0xbb06a2['Classes'];if(_0xac7ca1===$dataSkills)_0x296eef=_0xbb06a2['Skills'];if(_0xac7ca1===$dataItems)_0x296eef=_0xbb06a2['Items'];if(_0xac7ca1===$dataWeapons)_0x296eef=_0xbb06a2[_0x180476(0x26b)];if(_0xac7ca1===$dataArmors)_0x296eef=_0xbb06a2[_0x180476(0x3d5)];if(_0xac7ca1===$dataEnemies)_0x296eef=_0xbb06a2[_0x180476(0x158)];if(_0xac7ca1===$dataStates)_0x296eef=_0xbb06a2['States'];if(_0x296eef>0x0){if(_0x180476(0x43e)!==_0x180476(0x361))_0x56d8a1=_0x180476(0x437)[_0x180476(0x3ff)](_0x296eef,_0x56d8a1);else var _0x53eeb4=new _0x4ce442('\x5cb'+_0x1d6eb7+'\x5cb','g');}return _0x56d8a1;},Window_Base[_0x314eca(0x393)][_0x314eca(0x513)]=function(_0x36c05e){const _0x5905ae=_0x314eca;if(_0x36c05e[_0x5905ae(0x321)](_0x5905ae(0x339)))return this[_0x5905ae(0x36c)](![]),_0x36c05e=_0x36c05e[_0x5905ae(0x1e5)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x36c05e;_0x36c05e=_0x36c05e[_0x5905ae(0x1e5)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x17cdec,_0x188e0b)=>this[_0x5905ae(0x36c)](!![])),_0x36c05e=_0x36c05e[_0x5905ae(0x1e5)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x3fdd54,_0x58f62b)=>this['setWordWrap'](![])),_0x36c05e=_0x36c05e['replace'](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0xe10733,_0x1f0472)=>this[_0x5905ae(0x36c)](![]));if(_0x36c05e[_0x5905ae(0x34e)](Window_Message['_autoSizeRegexp']))_0x5905ae(0x2f1)!==_0x5905ae(0x2f1)?_0x41f99e=_0x4b755b(_0x2be21a['$1'])[_0x5905ae(0x31c)]()[_0x5905ae(0x1ab)]():this[_0x5905ae(0x36c)](![]);else _0x36c05e[_0x5905ae(0x34e)](Window_Message[_0x5905ae(0x457)])&&this['setWordWrap'](![]);if(!this[_0x5905ae(0x139)]())return _0x36c05e=_0x36c05e[_0x5905ae(0x1e5)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x36c05e;if(_0x36c05e[_0x5905ae(0x428)]<=0x0)return _0x36c05e;return _0x36c05e[_0x5905ae(0x34e)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)&&(_0x36c05e=VisuMZ[_0x5905ae(0x19b)][_0x5905ae(0x2eb)](_0x36c05e)[_0x5905ae(0x3ec)]('')),VisuMZ[_0x5905ae(0x19b)]['Settings']['WordWrap'][_0x5905ae(0x316)]?(_0x36c05e=_0x36c05e['replace'](/[\n\r]+/g,'\x20'),_0x36c05e=_0x36c05e[_0x5905ae(0x1e5)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x36c05e=_0x36c05e[_0x5905ae(0x1e5)](/[\n\r]+/g,''),_0x36c05e=_0x36c05e['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x36c05e=this[_0x5905ae(0x42f)](_0x36c05e),_0x36c05e=_0x36c05e['split']('\x20')[_0x5905ae(0x3ec)](_0x5905ae(0x292)),_0x36c05e=_0x36c05e['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x36c05e=_0x36c05e['replace'](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x36c05e;},VisuMZ['MessageCore'][_0x314eca(0x2eb)]=function(_0x47147f){const _0x4a2e02=_0x314eca;let _0x1be2d6=[],_0x387d1e='';while(_0x47147f[_0x4a2e02(0x428)]>0x0){const _0x3218a0=_0x47147f[_0x4a2e02(0x2d7)](0x0);_0x47147f=_0x47147f[_0x4a2e02(0x207)](0x1);if(_0x3218a0[_0x4a2e02(0x34e)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)){if(_0x387d1e['length']>0x0){if(_0x4a2e02(0x2b1)!==_0x4a2e02(0x2b1))return this[_0x4a2e02(0x4f2)]()===0x191;else _0x1be2d6[_0x4a2e02(0x4bd)](_0x387d1e),_0x387d1e='';}_0x1be2d6[_0x4a2e02(0x4bd)](_0x3218a0+'\x1bWrapJpBreak[0]');}else _0x387d1e+=_0x3218a0;}if(_0x387d1e[_0x4a2e02(0x428)]>0x0){if('PnUTR'==='xvaPP')return _0x1503ab[_0x55f78a]=(_0x172a25[_0x5df7dc+0x1]||'')[_0x4a2e02(0x1e5)](/^"|"$/g,''),_0x5f4b0b;else _0x1be2d6['push'](_0x387d1e),_0x387d1e='';}return _0x1be2d6;},Window_Base['prototype'][_0x314eca(0x42f)]=function(_0x22607c){return _0x22607c;},VisuMZ['MessageCore'][_0x314eca(0x1cc)]=Window_Base[_0x314eca(0x393)][_0x314eca(0x33b)],Window_Base[_0x314eca(0x393)][_0x314eca(0x33b)]=function(_0x38caee){const _0x1bce56=_0x314eca;VisuMZ[_0x1bce56(0x19b)][_0x1bce56(0x1cc)][_0x1bce56(0x37e)](this,_0x38caee),this['processTextAlignmentX'](_0x38caee);},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x1a5)]=Window_Base[_0x314eca(0x393)][_0x314eca(0x44f)],Window_Base['prototype'][_0x314eca(0x44f)]=function(_0xe4fd71,_0x5d2e77){const _0xd2bfcd=_0x314eca;VisuMZ[_0xd2bfcd(0x19b)][_0xd2bfcd(0x1a5)]['call'](this,_0xe4fd71,_0x5d2e77);if(_0x5d2e77===_0xd2bfcd(0x292))this['processWrapBreak'](_0xe4fd71);else _0x5d2e77==='\x1bWrapJpBreak[0]'&&this[_0xd2bfcd(0x4d5)](_0xe4fd71,!![]);},Window_Base[_0x314eca(0x393)][_0x314eca(0x4d7)]=function(_0x1c0f65){const _0x3d3c4c=_0x314eca;var _0x508908=/^\<(.*?)\>/['exec'](_0x1c0f65[_0x3d3c4c(0x37b)][_0x3d3c4c(0x207)](_0x1c0f65[_0x3d3c4c(0x499)]));return _0x508908?(_0x1c0f65[_0x3d3c4c(0x499)]+=_0x508908[0x0][_0x3d3c4c(0x428)],String(_0x508908[0x0][_0x3d3c4c(0x207)](0x1,_0x508908[0x0][_0x3d3c4c(0x428)]-0x1))):'';},VisuMZ[_0x314eca(0x19b)]['Window_Base_processEscapeCharacter']=Window_Base[_0x314eca(0x393)][_0x314eca(0x507)],Window_Base['prototype'][_0x314eca(0x507)]=function(_0x5fb141,_0xb65e8b){const _0x48c2f7=_0x314eca;switch(_0x5fb141){case'C':_0xb65e8b['drawing']?VisuMZ[_0x48c2f7(0x19b)]['Window_Base_processEscapeCharacter'][_0x48c2f7(0x37e)](this,_0x5fb141,_0xb65e8b):this[_0x48c2f7(0x190)](_0xb65e8b);break;case'I':case'{':case'}':VisuMZ['MessageCore'][_0x48c2f7(0x516)][_0x48c2f7(0x37e)](this,_0x5fb141,_0xb65e8b);break;case'FS':this[_0x48c2f7(0x19a)](_0xb65e8b);break;case'PX':this[_0x48c2f7(0x1fb)](_0xb65e8b);break;case'PY':this[_0x48c2f7(0x13b)](_0xb65e8b);break;case _0x48c2f7(0x341):this[_0x48c2f7(0x4ef)](this[_0x48c2f7(0x190)](_0xb65e8b));break;case _0x48c2f7(0x489):this[_0x48c2f7(0x164)](_0xb65e8b);break;case _0x48c2f7(0x3ed):this[_0x48c2f7(0x430)](_0xb65e8b);break;case _0x48c2f7(0x32c):this['processCommonEvent'](_0xb65e8b);break;case _0x48c2f7(0x21d):this['processFontChangeItalic'](this[_0x48c2f7(0x190)](_0xb65e8b));break;case _0x48c2f7(0x523):this[_0x48c2f7(0x30c)](_0xb65e8b);break;case _0x48c2f7(0x1d8):this[_0x48c2f7(0x3b0)](_0xb65e8b);break;case'TEXTALIGNMENT':this[_0x48c2f7(0x2da)](_0xb65e8b);break;case _0x48c2f7(0x15d):this[_0x48c2f7(0x263)](_0xb65e8b);break;case _0x48c2f7(0x486):this['processWrapBreak'](_0xb65e8b);break;case _0x48c2f7(0x1fe):this[_0x48c2f7(0x4d5)](_0xb65e8b,!![]);break;default:this[_0x48c2f7(0x307)](_0x5fb141,_0xb65e8b);}},Window_Base[_0x314eca(0x393)][_0x314eca(0x307)]=function(_0x2109b5,_0x2499ba){const _0xca5869=_0x314eca;for(const _0x510e81 of VisuMZ[_0xca5869(0x19b)][_0xca5869(0x17c)][_0xca5869(0x3c3)]){if(_0xca5869(0x4ee)!==_0xca5869(0x1f3)){if(_0x510e81['Match']===_0x2109b5){if(_0x510e81[_0xca5869(0x50a)]==='')this[_0xca5869(0x190)](_0x2499ba);_0x510e81[_0xca5869(0x2cf)][_0xca5869(0x37e)](this,_0x2499ba);if(this['constructor']===Window_Message){const _0x23c25c=_0x510e81[_0xca5869(0x481)]||0x0;if(_0x23c25c>0x0)this[_0xca5869(0x4a8)](_0x23c25c);}}}else return!![];}},Window_Base['prototype'][_0x314eca(0x214)]=function(){const _0x1bc84d=_0x314eca;this['contents'][_0x1bc84d(0x4e3)]+=VisuMZ['MessageCore'][_0x1bc84d(0x17c)][_0x1bc84d(0x4c9)][_0x1bc84d(0x2d8)],this[_0x1bc84d(0x201)]['fontSize']=Math[_0x1bc84d(0x1aa)](this[_0x1bc84d(0x201)][_0x1bc84d(0x4e3)],VisuMZ[_0x1bc84d(0x19b)]['Settings'][_0x1bc84d(0x4c9)][_0x1bc84d(0x224)]);},Window_Base[_0x314eca(0x393)][_0x314eca(0x42c)]=function(){const _0x597fb3=_0x314eca;this['contents'][_0x597fb3(0x4e3)]-=VisuMZ['MessageCore'][_0x597fb3(0x17c)][_0x597fb3(0x4c9)]['FontChangeValue'],this['contents']['fontSize']=Math['max'](this[_0x597fb3(0x201)]['fontSize'],VisuMZ['MessageCore'][_0x597fb3(0x17c)]['General'][_0x597fb3(0x399)]);},Window_Base[_0x314eca(0x393)][_0x314eca(0x19a)]=function(_0x4e5540){const _0x4974b4=_0x314eca,_0x4a81ca=this[_0x4974b4(0x190)](_0x4e5540);this['contents']['fontSize']=_0x4a81ca[_0x4974b4(0x11e)](VisuMZ[_0x4974b4(0x19b)][_0x4974b4(0x17c)]['General'][_0x4974b4(0x399)],VisuMZ['MessageCore'][_0x4974b4(0x17c)]['General']['FontBiggerCap']);},Window_Base[_0x314eca(0x393)][_0x314eca(0x4c3)]=function(_0x4a3806){const _0x1b045f=_0x314eca;let _0x96be57=this[_0x1b045f(0x201)][_0x1b045f(0x4e3)];const _0x1da315=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){if(_0x1b045f(0x42e)!==_0x1b045f(0x42e)){const _0x36d53a=_0x550a3e[_0x1b045f(0x143)]();_0x22f26c=_0x13021a[_0x1b045f(0x38a)](_0x45ec86[_0x1b045f(0x1aa)](_0x36d53a,_0x33411b[_0x1b045f(0x428)])/this[_0x1b045f(0x384)]());}else{const _0x16acca=_0x1da315['exec'](_0x4a3806);if(!_0x16acca)break;const _0x7bb711=String(_0x16acca[0x1])[_0x1b045f(0x42b)]();if(_0x7bb711==='{')this[_0x1b045f(0x214)]();else{if(_0x7bb711==='}')this[_0x1b045f(0x42c)]();else _0x7bb711==='FS'&&(this[_0x1b045f(0x201)][_0x1b045f(0x4e3)]=parseInt(_0x16acca[0x3])[_0x1b045f(0x11e)](VisuMZ[_0x1b045f(0x19b)][_0x1b045f(0x17c)][_0x1b045f(0x4c9)][_0x1b045f(0x399)],VisuMZ[_0x1b045f(0x19b)][_0x1b045f(0x17c)]['General']['FontBiggerCap']));}this[_0x1b045f(0x201)][_0x1b045f(0x4e3)]>_0x96be57&&(_0x96be57=this[_0x1b045f(0x201)][_0x1b045f(0x4e3)]);}}return _0x96be57;},Window_Base[_0x314eca(0x393)][_0x314eca(0x1fb)]=function(_0x2c4ce2){const _0x18af38=_0x314eca;_0x2c4ce2['x']=this[_0x18af38(0x190)](_0x2c4ce2);if(VisuMZ[_0x18af38(0x19b)][_0x18af38(0x17c)]['General'][_0x18af38(0x3e4)]){if(_0x18af38(0x46a)===_0x18af38(0x46a))_0x2c4ce2['x']+=_0x2c4ce2[_0x18af38(0x1a1)];else return _0x22c16b=this[_0x18af38(0x195)](_0x43d09f),this[_0x18af38(0x43d)](),_0x42cdea;}},Window_Base[_0x314eca(0x393)][_0x314eca(0x13b)]=function(_0xad0b21){const _0x2a0a04=_0x314eca;_0xad0b21['y']=this[_0x2a0a04(0x190)](_0xad0b21),VisuMZ[_0x2a0a04(0x19b)]['Settings']['General'][_0x2a0a04(0x3e4)]&&(_0xad0b21['y']+=_0xad0b21[_0x2a0a04(0x4f1)]);},Window_Base['prototype'][_0x314eca(0x4ef)]=function(_0x15b89c){const _0x206d8d=_0x314eca;this['contents'][_0x206d8d(0x1da)]=!!_0x15b89c;},Window_Base[_0x314eca(0x393)][_0x314eca(0x510)]=function(_0x10422b){const _0x1ed76a=_0x314eca;this[_0x1ed76a(0x201)][_0x1ed76a(0x51b)]=!!_0x10422b;},Window_Base['prototype'][_0x314eca(0x2da)]=function(_0x35f808){const _0x304273=_0x314eca,_0x1c1f4c=this[_0x304273(0x190)](_0x35f808);if(!_0x35f808['drawing'])return;switch(_0x1c1f4c){case 0x0:this['setTextAlignment'](_0x304273(0x174));return;case 0x1:this[_0x304273(0x112)](_0x304273(0x3a1));break;case 0x2:this['setTextAlignment'](_0x304273(0x397));break;case 0x3:this['setTextAlignment']('right');break;}this['processTextAlignmentX'](_0x35f808);},Window_Base['prototype']['processTextAlignmentX']=function(_0x5e0723){const _0x4fee26=_0x314eca;if(!_0x5e0723[_0x4fee26(0x1e9)])return;if(_0x5e0723[_0x4fee26(0x34a)])return;if(this[_0x4fee26(0x27e)]()===_0x4fee26(0x174))return;let _0x32de03=_0x5e0723[_0x4fee26(0x37b)][_0x4fee26(0x39f)]('\x1bTEXTALIGNMENT',_0x5e0723[_0x4fee26(0x499)]+0x1),_0x48557d=_0x5e0723[_0x4fee26(0x37b)][_0x4fee26(0x39f)]('\x0a',_0x5e0723[_0x4fee26(0x499)]+0x1);if(_0x32de03<0x0)_0x32de03=_0x5e0723['text'][_0x4fee26(0x428)]+0x1;if(_0x48557d>0x0)_0x32de03=Math[_0x4fee26(0x1aa)](_0x32de03,_0x48557d);const _0xd74f84=_0x5e0723[_0x4fee26(0x37b)][_0x4fee26(0xf9)](_0x5e0723[_0x4fee26(0x499)],_0x32de03),_0x20d322=this['textSizeExTextAlignment'](_0xd74f84)[_0x4fee26(0x367)],_0x26772c=_0x5e0723[_0x4fee26(0x367)]||this[_0x4fee26(0x365)]-0x8,_0x4959d2=this[_0x4fee26(0x19c)]===Window_Message&&$gameMessage['faceName']()!=='';switch(this['getTextAlignment']()){case'left':_0x5e0723['x']=_0x5e0723['startX'];break;case'center':_0x5e0723['x']=_0x5e0723[_0x4fee26(0x1a1)],_0x5e0723['x']+=Math[_0x4fee26(0x25c)]((_0x26772c-_0x20d322)/0x2);_0x4959d2&&(_0x5e0723['x']-=_0x5e0723[_0x4fee26(0x1a1)]/0x2);break;case _0x4fee26(0x410):_0x5e0723['x']=_0x26772c-_0x20d322+_0x5e0723[_0x4fee26(0x1a1)];_0x4959d2&&(_0x5e0723['x']-=_0x5e0723['startX']);break;}},Window_Base[_0x314eca(0x393)][_0x314eca(0x526)]=function(_0x183986){const _0x5337e7=_0x314eca;_0x183986=_0x183986[_0x5337e7(0x1e5)](/\x1b!/g,''),_0x183986=_0x183986[_0x5337e7(0x1e5)](/\x1b\|/g,''),_0x183986=_0x183986[_0x5337e7(0x1e5)](/\x1b\./g,'');const _0x206660=this[_0x5337e7(0x155)](_0x183986,0x0,0x0,0x0),_0x30023d=this[_0x5337e7(0x47b)]();return _0x206660[_0x5337e7(0x1e9)]=![],this[_0x5337e7(0x12c)](_0x206660),this[_0x5337e7(0x439)](_0x30023d),{'width':_0x206660[_0x5337e7(0x278)],'height':_0x206660[_0x5337e7(0x304)]};},Window_Base[_0x314eca(0x43c)]=VisuMZ[_0x314eca(0x19b)][_0x314eca(0x17c)]['WordWrap'][_0x314eca(0x20a)]||0x0,Window_Base[_0x314eca(0x393)]['processWrapBreak']=function(_0x26ab6c,_0x4df370){const _0x5a41d3=_0x314eca,_0x2fb038=(_0x26ab6c[_0x5a41d3(0x34a)]?-0x1:0x1)*this[_0x5a41d3(0x38d)]('\x20');if(!_0x4df370)_0x26ab6c['x']+=_0x2fb038;if(this[_0x5a41d3(0x190)](_0x26ab6c)>0x0&&!_0x4df370)_0x26ab6c['x']+=_0x2fb038;if(_0x26ab6c[_0x5a41d3(0x34a)])return;let _0x16dc83;_0x4df370?_0x16dc83=_0x26ab6c['text'][_0x5a41d3(0x39f)](_0x5a41d3(0x27b),_0x26ab6c[_0x5a41d3(0x499)]+0x1):_0x5a41d3(0x4eb)===_0x5a41d3(0x135)?(_0x2683fd['MessageCore'][_0x5a41d3(0x4cc)]['call'](this),this[_0x5a41d3(0x54e)]=[]):_0x16dc83=_0x26ab6c['text'][_0x5a41d3(0x39f)](_0x5a41d3(0x292),_0x26ab6c[_0x5a41d3(0x499)]+0x1);let _0x50c960=_0x26ab6c['text'][_0x5a41d3(0x39f)]('\x0a',_0x26ab6c[_0x5a41d3(0x499)]+0x1);if(_0x16dc83<0x0)_0x16dc83=_0x26ab6c[_0x5a41d3(0x37b)][_0x5a41d3(0x428)]+0x1;if(_0x50c960>0x0)_0x16dc83=Math[_0x5a41d3(0x1aa)](_0x16dc83,_0x50c960);const _0x56b73f=_0x26ab6c[_0x5a41d3(0x37b)][_0x5a41d3(0xf9)](_0x26ab6c[_0x5a41d3(0x499)],_0x16dc83),_0x575fbd=this['textSizeExWordWrap'](_0x56b73f)['width'];let _0xcc6dd=_0x26ab6c[_0x5a41d3(0x367)]||this[_0x5a41d3(0x365)];_0xcc6dd-=Window_Base[_0x5a41d3(0x43c)];if(this[_0x5a41d3(0x19c)]===Window_Message){const _0x9c129e=$gameMessage['faceName']()===''?0x0:ImageManager[_0x5a41d3(0x15e)]+0x14;_0xcc6dd-=_0x9c129e,VisuMZ['MessageCore'][_0x5a41d3(0x17c)][_0x5a41d3(0x237)]['TightWrap']&&(_0xcc6dd-=_0x9c129e);}let _0x5293e0=![];_0x26ab6c['x']+_0x575fbd>_0x26ab6c[_0x5a41d3(0x1a1)]+_0xcc6dd&&(_0x5293e0=!![]),_0x575fbd===0x0&&('OaZMe'!=='sMHtV'?_0x5293e0=![]:(_0xbe6b8d+=_0x120a36,_0xe388e7++)),_0x5293e0&&(_0x5a41d3(0x2ee)===_0x5a41d3(0x2ee)?_0x26ab6c[_0x5a41d3(0x37b)]=_0x26ab6c[_0x5a41d3(0x37b)][_0x5a41d3(0x207)](0x0,_0x26ab6c['index'])+'\x0a'+_0x26ab6c[_0x5a41d3(0x37b)]['substr'](_0x26ab6c[_0x5a41d3(0x499)]):_0x48602f=_0x562931[_0x5a41d3(0x1b3)]());},Window_Base['prototype'][_0x314eca(0x1c5)]=function(_0x38071a){const _0x36b0ab=_0x314eca,_0x4ec0d6=this[_0x36b0ab(0x155)](_0x38071a,0x0,0x0,0x0),_0x446c12=this[_0x36b0ab(0x47b)]();return _0x4ec0d6[_0x36b0ab(0x1e9)]=![],this['setWordWrap'](![]),this[_0x36b0ab(0x12c)](_0x4ec0d6),this[_0x36b0ab(0x36c)](!![]),this[_0x36b0ab(0x439)](_0x446c12),{'width':_0x4ec0d6[_0x36b0ab(0x278)],'height':_0x4ec0d6['outputHeight']};},Window_Base[_0x314eca(0x393)][_0x314eca(0x4ac)]=function(_0xd46494){const _0xed6b4a=_0x314eca;return this[_0xed6b4a(0x190)](_0xd46494);},Window_Base[_0x314eca(0x393)][_0x314eca(0x30c)]=function(_0x49d069){const _0x4cbc71=_0x314eca,_0x37491a=this[_0x4cbc71(0x4d7)](_0x49d069)[_0x4cbc71(0x345)](',');if(!_0x49d069[_0x4cbc71(0x1e9)])return;const _0x1c2b6d=_0x37491a[0x0][_0x4cbc71(0x1ab)](),_0x2474a5=_0x37491a[0x1]||0x0,_0x4487ec=_0x37491a[0x2]||0x0,_0x5c6f68=ImageManager['loadPicture'](_0x1c2b6d),_0x33e668=this['contents'][_0x4cbc71(0x298)];_0x5c6f68[_0x4cbc71(0xf5)](this[_0x4cbc71(0x34b)][_0x4cbc71(0x424)](this,_0x5c6f68,_0x49d069['x'],_0x49d069['y'],_0x2474a5,_0x4487ec,_0x33e668));},Window_Base[_0x314eca(0x393)]['drawBackPicture']=function(_0x511fbf,_0x26d9d0,_0x44c819,_0x1cb3d7,_0x8b7962,_0xaf3e82){const _0x2f40ee=_0x314eca;_0x1cb3d7=_0x1cb3d7||_0x511fbf[_0x2f40ee(0x367)],_0x8b7962=_0x8b7962||_0x511fbf[_0x2f40ee(0x501)],this[_0x2f40ee(0x4e9)]['paintOpacity']=_0xaf3e82,this[_0x2f40ee(0x4e9)]['blt'](_0x511fbf,0x0,0x0,_0x511fbf[_0x2f40ee(0x367)],_0x511fbf['height'],_0x26d9d0,_0x44c819,_0x1cb3d7,_0x8b7962),this['contentsBack'][_0x2f40ee(0x298)]=0xff;},Window_Base['prototype'][_0x314eca(0x164)]=function(_0x26983e){const _0x1b969f=_0x314eca,_0x453ba2=this[_0x1b969f(0x4d7)](_0x26983e)[_0x1b969f(0x345)](',');if(!_0x26983e[_0x1b969f(0x1e9)])return;const _0x1ca156=_0x453ba2[0x0][_0x1b969f(0x1ab)](),_0x3c65ad=ImageManager[_0x1b969f(0x171)](_0x1ca156),_0x3a3597=JsonEx[_0x1b969f(0x3ea)](_0x26983e),_0x29a1ad=this[_0x1b969f(0x201)][_0x1b969f(0x298)];_0x3c65ad[_0x1b969f(0xf5)](this[_0x1b969f(0x53a)]['bind'](this,_0x3c65ad,_0x3a3597,_0x29a1ad));},Window_Base[_0x314eca(0x393)]['drawBackCenteredPicture']=function(_0x1d7a1e,_0x106e1a,_0x24db79){const _0x36be98=_0x314eca,_0x243ad7=_0x106e1a[_0x36be98(0x367)]||this[_0x36be98(0x365)],_0x125238=this[_0x36be98(0x53c)]!==undefined?this[_0x36be98(0x45c)]():this[_0x36be98(0x30d)],_0x12b4e8=_0x243ad7/_0x1d7a1e['width'],_0x41274a=_0x125238/_0x1d7a1e[_0x36be98(0x501)],_0x3b28d0=Math[_0x36be98(0x1aa)](_0x12b4e8,_0x41274a,0x1),_0x35538e=this[_0x36be98(0x53c)]!==undefined?(this[_0x36be98(0x1e4)](0x0)['height']-this['lineHeight']())/0x2:0x0,_0x2cfb99=_0x1d7a1e[_0x36be98(0x367)]*_0x3b28d0,_0x122eb9=_0x1d7a1e[_0x36be98(0x501)]*_0x3b28d0,_0x4bc1d1=Math[_0x36be98(0x25c)]((_0x243ad7-_0x2cfb99)/0x2)+_0x106e1a[_0x36be98(0x1a1)],_0x5309f9=Math[_0x36be98(0x25c)]((_0x125238-_0x122eb9)/0x2)+_0x106e1a[_0x36be98(0x4f1)]-_0x35538e*0x2;this[_0x36be98(0x4e9)][_0x36be98(0x298)]=_0x24db79,this[_0x36be98(0x4e9)][_0x36be98(0x31d)](_0x1d7a1e,0x0,0x0,_0x1d7a1e[_0x36be98(0x367)],_0x1d7a1e['height'],_0x4bc1d1,_0x5309f9,_0x2cfb99,_0x122eb9),this['contentsBack'][_0x36be98(0x298)]=0xff;},Window_Base['prototype'][_0x314eca(0x430)]=function(_0x5f3086){const _0x5e2c58=_0x314eca,_0x1a9fe1=this[_0x5e2c58(0x190)](_0x5f3086);if(_0x5f3086[_0x5e2c58(0x1e9)])this[_0x5e2c58(0xff)](_0x1a9fe1>0x0);},Window_Base[_0x314eca(0x393)][_0x314eca(0x263)]=function(_0x7d0725){const _0x42bbbf=_0x314eca,_0x477784=this[_0x42bbbf(0x190)](_0x7d0725);this['constructor']===Window_Message&&_0x7d0725[_0x42bbbf(0x1e9)]&&('lOuRF'===_0x42bbbf(0x4c5)?this[_0x42bbbf(0x2a5)](_0x477784):(this['initMessageCore'](_0x30cb1e),_0x542fa7['MessageCore'][_0x42bbbf(0x285)]['call'](this,_0x53b8ff)));},Window_Help['prototype'][_0x314eca(0x4ed)]=function(){const _0x5e784c=_0x314eca;this[_0x5e784c(0x36c)]($gameSystem[_0x5e784c(0x50d)]());},Window_Help[_0x314eca(0x393)][_0x314eca(0x2a9)]=function(){return!![];},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x30e)]=Window_Help[_0x314eca(0x393)][_0x314eca(0x47a)],Window_Help[_0x314eca(0x393)][_0x314eca(0x47a)]=function(){const _0x3cde35=_0x314eca;this[_0x3cde35(0x3b9)](),VisuMZ[_0x3cde35(0x19b)][_0x3cde35(0x30e)][_0x3cde35(0x37e)](this),this[_0x3cde35(0x4ed)]();},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x16a)]=Window_Options[_0x314eca(0x393)]['addGeneralOptions'],Window_Options[_0x314eca(0x393)][_0x314eca(0x26f)]=function(){const _0x590345=_0x314eca;VisuMZ['MessageCore'][_0x590345(0x16a)]['call'](this),this['addMessageCoreCommands']();},Window_Options[_0x314eca(0x393)][_0x314eca(0x3e3)]=function(){const _0x1ce4a6=_0x314eca;VisuMZ[_0x1ce4a6(0x19b)][_0x1ce4a6(0x17c)][_0x1ce4a6(0x17a)][_0x1ce4a6(0xfa)]&&TextManager[_0x1ce4a6(0x13c)]()&&this[_0x1ce4a6(0x4f3)](),VisuMZ[_0x1ce4a6(0x19b)]['Settings'][_0x1ce4a6(0x3eb)][_0x1ce4a6(0xfa)]&&this[_0x1ce4a6(0x1f7)]();},Window_Options[_0x314eca(0x393)][_0x314eca(0x4f3)]=function(){const _0x4ade9b=_0x314eca,_0x1bc948=TextManager[_0x4ade9b(0x53f)],_0x22109b=_0x4ade9b(0x415);this[_0x4ade9b(0x281)](_0x1bc948,_0x22109b);},Window_Options[_0x314eca(0x393)][_0x314eca(0x1f7)]=function(){const _0x4cba2e=_0x314eca,_0x2e3e93=TextManager[_0x4cba2e(0xf3)],_0xbb0ed8=_0x4cba2e(0x3d1);this['addCommand'](_0x2e3e93,_0xbb0ed8);},VisuMZ[_0x314eca(0x19b)]['Window_Options_statusText']=Window_Options[_0x314eca(0x393)][_0x314eca(0x2f6)],Window_Options[_0x314eca(0x393)][_0x314eca(0x2f6)]=function(_0xda6e8a){const _0x50f241=_0x314eca,_0x36c473=this['commandSymbol'](_0xda6e8a);if(_0x36c473===_0x50f241(0x415))return this['visuMzTextLocaleStatusText']();if(_0x36c473===_0x50f241(0x3d1))return this[_0x50f241(0x193)]();return VisuMZ[_0x50f241(0x19b)][_0x50f241(0x18e)]['call'](this,_0xda6e8a);},Window_Options[_0x314eca(0x393)][_0x314eca(0x3f0)]=function(){const _0x2e5324=_0x314eca,_0x27426c=ConfigManager[_0x2e5324(0x415)];return TextManager[_0x2e5324(0x238)](_0x27426c);},Window_Options[_0x314eca(0x393)][_0x314eca(0x193)]=function(){const _0x5ba329=_0x314eca,_0x4e3623=this[_0x5ba329(0x2d5)]('textSpeed');return _0x4e3623>0xa?TextManager[_0x5ba329(0x357)]:_0x4e3623;},VisuMZ[_0x314eca(0x19b)]['Window_Options_isVolumeSymbol']=Window_Options['prototype'][_0x314eca(0x4e2)],Window_Options[_0x314eca(0x393)][_0x314eca(0x4e2)]=function(_0x38cf14){const _0x532653=_0x314eca;if(_0x38cf14===_0x532653(0x415))return!![];if(_0x38cf14==='textSpeed')return!![];return VisuMZ[_0x532653(0x19b)][_0x532653(0x3e9)]['call'](this,_0x38cf14);},VisuMZ['MessageCore']['Window_Options_changeVolume']=Window_Options[_0x314eca(0x393)]['changeVolume'],Window_Options['prototype'][_0x314eca(0x211)]=function(_0x24ca6b,_0x28ec8b,_0x233499){const _0x2eeaea=_0x314eca;if(_0x24ca6b===_0x2eeaea(0x415))return this[_0x2eeaea(0x404)](_0x28ec8b,_0x233499);if(_0x24ca6b===_0x2eeaea(0x3d1))return this['changeTextSpeed'](_0x24ca6b,_0x28ec8b,_0x233499);VisuMZ['MessageCore'][_0x2eeaea(0x44a)]['call'](this,_0x24ca6b,_0x28ec8b,_0x233499);},Window_Options[_0x314eca(0x393)]['changeVisuMzTextLocale']=function(_0x5463f6,_0x28de5c){const _0x1f8a72=_0x314eca,_0x17764c=VisuMZ[_0x1f8a72(0x19b)]['Settings'][_0x1f8a72(0x17a)]['Languages']||[],_0x25977b=ConfigManager[_0x1f8a72(0x415)];let _0xbe7a1d=_0x17764c[_0x1f8a72(0x39f)](_0x25977b);_0xbe7a1d+=_0x5463f6?0x1:-0x1;if(_0xbe7a1d>=_0x17764c[_0x1f8a72(0x428)])_0xbe7a1d=_0x28de5c?0x0:_0x17764c[_0x1f8a72(0x428)]-0x1;if(_0xbe7a1d<0x0)_0xbe7a1d=_0x28de5c?_0x17764c['length']-0x1:0x0;this[_0x1f8a72(0x4f9)](_0x1f8a72(0x415),_0x17764c[_0xbe7a1d]);},Window_Options[_0x314eca(0x393)][_0x314eca(0x1fa)]=function(_0x3fd901,_0x5afab6,_0x5bbb60){const _0x5746db=_0x314eca,_0x4a1508=this[_0x5746db(0x2d5)](_0x3fd901),_0x129ea9=0x1,_0x1b4ddc=_0x4a1508+(_0x5afab6?_0x129ea9:-_0x129ea9);if(_0x1b4ddc>0xb&&_0x5bbb60){if(_0x5746db(0x24d)===_0x5746db(0x49c))return this[_0x5746db(0x229)]||0x0;else this['changeValue'](_0x3fd901,0x1);}else this[_0x5746db(0x4f9)](_0x3fd901,_0x1b4ddc[_0x5746db(0x11e)](0x1,0xb));},Window_Message[_0x314eca(0x393)][_0x314eca(0x129)]=function(){const _0x5a27a2=_0x314eca;let _0xf04b93=Window_Base[_0x5a27a2(0x393)][_0x5a27a2(0x129)][_0x5a27a2(0x37e)](this);return _0xf04b93-=this[_0x5a27a2(0x2e8)](),_0xf04b93;},Window_Message[_0x314eca(0x393)][_0x314eca(0x27c)]=function(){const _0x32a4ff=_0x314eca;Window_Base[_0x32a4ff(0x393)][_0x32a4ff(0x27c)]['call'](this);if(VisuMZ[_0x32a4ff(0x19b)][_0x32a4ff(0x17c)]['General'][_0x32a4ff(0x26a)]){if('vBotu'==='bkYHR'){_0x4b4946[_0x32a4ff(0x13a)](_0x5a0086,_0xb0e0cf),_0x322441[_0x32a4ff(0x3ae)](_0x42773c[_0x32a4ff(0x32a)],_0x5d5da1[_0x32a4ff(0x2db)]);const _0x481a19=_0x1b3ade[_0x32a4ff(0x180)]['_messageWindow'];_0x481a19&&(_0x481a19['resetWordWrap'](),_0x481a19[_0x32a4ff(0x531)](),_0x481a19[_0x32a4ff(0x10e)]());}else this[_0x32a4ff(0x4c6)]();}},Window_Message[_0x314eca(0x393)]['stretchDimmerSprite']=function(){const _0x52c224=_0x314eca;this[_0x52c224(0x2c5)]['x']=Math[_0x52c224(0x4f0)](this[_0x52c224(0x367)]/0x2),this[_0x52c224(0x2c5)][_0x52c224(0x538)]['x']=0.5,this[_0x52c224(0x2c5)][_0x52c224(0x2ff)]['x']=Graphics[_0x52c224(0x367)];},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x3a5)]=Window_Message[_0x314eca(0x393)]['clearFlags'],Window_Message[_0x314eca(0x393)][_0x314eca(0x216)]=function(){const _0x57ddc7=_0x314eca;VisuMZ['MessageCore'][_0x57ddc7(0x3a5)][_0x57ddc7(0x37e)](this),this['clearActorNameAutoColor'](),this[_0x57ddc7(0x4ed)](),this[_0x57ddc7(0xff)](![]),this[_0x57ddc7(0x112)]('default'),this['setTextDelay'](VisuMZ[_0x57ddc7(0x19b)]['Settings'][_0x57ddc7(0x4c9)][_0x57ddc7(0x3e8)]);},Window_Message['prototype'][_0x314eca(0x4ed)]=function(){const _0x1d7c4b=_0x314eca;this[_0x1d7c4b(0x36c)]($gameSystem['isMessageWindowWordWrap']());},Window_Message[_0x314eca(0x393)][_0x314eca(0x2a9)]=function(){return!![];},Window_Message[_0x314eca(0x393)]['setTextDelay']=function(_0x31942e){const _0x2fe503=_0x314eca,_0xf3c3ba=0xb-ConfigManager['textSpeed'];_0x31942e=Math[_0x2fe503(0x4f0)](_0x31942e*_0xf3c3ba),this[_0x2fe503(0x431)]=_0x31942e,this[_0x2fe503(0x429)]=_0x31942e;},VisuMZ[_0x314eca(0x19b)]['Window_Message_isTriggered']=Window_Message[_0x314eca(0x393)][_0x314eca(0x12e)],Window_Message[_0x314eca(0x393)][_0x314eca(0x12e)]=function(){const _0x2da12e=_0x314eca;return VisuMZ['MessageCore'][_0x2da12e(0x444)][_0x2da12e(0x37e)](this)||Input[_0x2da12e(0x1e2)](VisuMZ[_0x2da12e(0x19b)][_0x2da12e(0x17c)][_0x2da12e(0x4c9)][_0x2da12e(0x475)]);},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x26e)]=Window_Message[_0x314eca(0x393)][_0x314eca(0x1ef)],Window_Message[_0x314eca(0x393)][_0x314eca(0x1ef)]=function(){const _0xe10047=_0x314eca;let _0xbe9246=this['y'];this['x']=Math[_0xe10047(0x4f0)]((Graphics[_0xe10047(0x137)]-this['width'])/0x2),VisuMZ[_0xe10047(0x19b)][_0xe10047(0x26e)]['call'](this);if(this[_0xe10047(0x3cb)])this['y']=_0xbe9246;this[_0xe10047(0x3ba)](),this['updateForcedPlacement'](),this[_0xe10047(0x3c1)](),this[_0xe10047(0x360)]();},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x53b)]=Window_Message[_0x314eca(0x393)][_0x314eca(0x370)],Window_Message[_0x314eca(0x393)][_0x314eca(0x370)]=function(_0x45026c){const _0x423566=_0x314eca;this[_0x423566(0x177)](_0x45026c),this[_0x423566(0x131)](_0x45026c),VisuMZ[_0x423566(0x19b)]['Window_Message_newPage'][_0x423566(0x37e)](this,_0x45026c),this[_0x423566(0x10e)]();},Window_Message['prototype'][_0x314eca(0x177)]=function(_0x19f9d6){const _0x40a1aa=_0x314eca;if(!_0x19f9d6)return;this['_macroBypassWordWrap']=![],_0x19f9d6[_0x40a1aa(0x37b)]=this[_0x40a1aa(0x38b)](_0x19f9d6[_0x40a1aa(0x37b)]),this[_0x40a1aa(0x1fc)]&&(_0x19f9d6['text']=this['prepareWordWrapEscapeCharacters'](_0x19f9d6[_0x40a1aa(0x37b)]),this[_0x40a1aa(0x115)]=!![]);},Window_Message['prototype']['prepareWordWrapEscapeCharacters']=function(_0x162762){const _0x8a80cc=_0x314eca;if(this[_0x8a80cc(0x115)])return _0x162762;return Window_Base[_0x8a80cc(0x393)]['prepareWordWrapEscapeCharacters'][_0x8a80cc(0x37e)](this,_0x162762);},Window_Message[_0x314eca(0x393)][_0x314eca(0x131)]=function(_0x5e88ea){const _0x4eeb0c=_0x314eca;this[_0x4eeb0c(0x11a)](_0x5e88ea),this[_0x4eeb0c(0x29a)](_0x5e88ea),this[_0x4eeb0c(0x531)]();},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x23b)]=Window_Message[_0x314eca(0x393)][_0x314eca(0x1ba)],Window_Message[_0x314eca(0x393)][_0x314eca(0x1ba)]=function(){const _0x49da8c=_0x314eca;VisuMZ[_0x49da8c(0x19b)][_0x49da8c(0x23b)][_0x49da8c(0x37e)](this),this[_0x49da8c(0x216)]();if(this[_0x49da8c(0x385)])this[_0x49da8c(0x2e4)]();},Window_Message['prototype']['updateDimensions']=function(){const _0x5a3ac5=_0x314eca;this[_0x5a3ac5(0x367)]=$gameSystem[_0x5a3ac5(0x41b)]()+this[_0x5a3ac5(0x2a8)]();;this[_0x5a3ac5(0x367)]=Math['min'](Graphics[_0x5a3ac5(0x367)],this['width']);const _0x3cbfa2=$gameSystem[_0x5a3ac5(0x536)]();this[_0x5a3ac5(0x501)]=SceneManager['_scene'][_0x5a3ac5(0x1e7)](_0x3cbfa2,![])+this[_0x5a3ac5(0x2e8)](),this[_0x5a3ac5(0x501)]=Math[_0x5a3ac5(0x1aa)](Graphics[_0x5a3ac5(0x501)],this[_0x5a3ac5(0x501)]);if($gameTemp[_0x5a3ac5(0x4ea)])this[_0x5a3ac5(0x11d)]();},Window_Message['prototype'][_0x314eca(0x2a8)]=function(){return 0x0;},Window_Message[_0x314eca(0x393)][_0x314eca(0x2e8)]=function(){return 0x0;},Window_Message[_0x314eca(0x393)][_0x314eca(0x11d)]=function(){const _0x2e617a=_0x314eca;this['x']=(Graphics[_0x2e617a(0x137)]-this[_0x2e617a(0x367)])/0x2,$gameTemp[_0x2e617a(0x4ea)]=undefined,this[_0x2e617a(0x3c1)]();},Window_Message[_0x314eca(0x393)][_0x314eca(0x460)]=function(){const _0xac4fe3=_0x314eca,_0x4036ce={'x':this['x'],'y':this['y']};Window_Base[_0xac4fe3(0x393)]['updateMove'][_0xac4fe3(0x37e)](this),this[_0xac4fe3(0x346)](_0x4036ce);},Window_Message[_0x314eca(0x393)][_0x314eca(0x100)]=function(){return!![];},Window_Message['prototype'][_0x314eca(0x346)]=function(_0x488460){const _0x32e8f4=_0x314eca;if(this[_0x32e8f4(0x4a2)]){if(_0x32e8f4(0x3af)!==_0x32e8f4(0x3af)){if(this[_0x32e8f4(0x3f9)]===_0x52bbfb)this[_0x32e8f4(0x256)]();if(this[_0x32e8f4(0x3f9)][_0x32e8f4(0x529)]===_0x58c94a)this[_0x32e8f4(0x256)]();return this[_0x32e8f4(0x3f9)][_0x32e8f4(0x529)];}else this[_0x32e8f4(0x4a2)]['x']+=this['x']-_0x488460['x'],this[_0x32e8f4(0x4a2)]['y']+=this['y']-_0x488460['y'];}},Window_Message[_0x314eca(0x393)][_0x314eca(0x119)]=function(_0x2a0dd4,_0xa2bfba){const _0x132cc9=_0x314eca;this[_0x132cc9(0x236)](this[_0x132cc9(0x491)]['x'],this[_0x132cc9(0x3fb)]*(Graphics['boxHeight']-this[_0x132cc9(0x501)])/0x2,this['_resetRect'][_0x132cc9(0x367)],this[_0x132cc9(0x491)]['height'],_0x2a0dd4,_0xa2bfba);},Window_Message['prototype'][_0x314eca(0x4ac)]=function(_0x5eb8d8){const _0xf0aa17=_0x314eca,_0x1cc992=Window_Base[_0xf0aa17(0x393)][_0xf0aa17(0x4ac)][_0xf0aa17(0x37e)](this,_0x5eb8d8);_0x5eb8d8[_0xf0aa17(0x1e9)]&&this[_0xf0aa17(0x4a8)](_0x1cc992);},Window_Message[_0x314eca(0x393)][_0x314eca(0x4a8)]=function(_0x493706){const _0x106d84=_0x314eca;if($gameParty[_0x106d84(0x4b5)]()){}else{if('qxfmE'!==_0x106d84(0x4e6))$gameMap['addMessageCommonEvent'](_0x493706);else{const _0x213fbd=_0x563b21[_0x106d84(0x481)]||0x0;if(_0x213fbd>0x0)this['launchMessageCommonEvent'](_0x213fbd);}}},Window_Message[_0x314eca(0x393)][_0x314eca(0x3fa)]=function(_0x4011ed){const _0x4ad846=_0x314eca;this[_0x4ad846(0x431)]--,this[_0x4ad846(0x431)]<=0x0&&(this[_0x4ad846(0x4c1)](_0x4011ed),Window_Base[_0x4ad846(0x393)][_0x4ad846(0x3fa)][_0x4ad846(0x37e)](this,_0x4011ed));},Window_Message[_0x314eca(0x393)][_0x314eca(0x4c1)]=function(_0xff1536){const _0x184d5c=_0x314eca;this['_textDelayCount']=this[_0x184d5c(0x429)];if(this[_0x184d5c(0x429)]<=0x0)this[_0x184d5c(0x364)]=!![];},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x1e3)]=Window_Message[_0x314eca(0x393)][_0x314eca(0x507)],Window_Message[_0x314eca(0x393)][_0x314eca(0x507)]=function(_0x3c81be,_0x4dd287){const _0x403df1=_0x314eca;!_0x4dd287[_0x403df1(0x1e9)]?Window_Base['prototype'][_0x403df1(0x507)][_0x403df1(0x37e)](this,_0x3c81be,_0x4dd287):_0x403df1(0x3a2)===_0x403df1(0x3a2)?VisuMZ[_0x403df1(0x19b)]['Window_Message_processEscapeCharacter'][_0x403df1(0x37e)](this,_0x3c81be,_0x4dd287):this[_0x403df1(0x15c)]>0x0&&(this[_0x403df1(0x100)]()&&(this['x']=this['applyMoveEasing'](this['x'],this[_0x403df1(0x2bf)]),this['y']=this[_0x403df1(0x253)](this['y'],this[_0x403df1(0x477)]),this[_0x403df1(0x367)]=this['applyMoveEasing'](this['width'],this[_0x403df1(0x18d)]),this[_0x403df1(0x501)]=this[_0x403df1(0x253)](this[_0x403df1(0x501)],this[_0x403df1(0x446)]),this[_0x403df1(0x3c1)]()),this[_0x403df1(0x15c)]--);},VisuMZ['MessageCore'][_0x314eca(0x461)]=Window_Message['prototype']['needsNewPage'],Window_Message[_0x314eca(0x393)]['needsNewPage']=function(_0x13f195){const _0xd8dd70=_0x314eca;if(this['_currentAutoSize'])return![];return VisuMZ['MessageCore']['Window_Message_needsNewPage'][_0xd8dd70(0x37e)](this,_0x13f195);},Window_Message[_0x314eca(0x393)][_0x314eca(0x11a)]=function(_0x3adc0a){const _0x55f98f=_0x314eca;let _0x73033b=_0x3adc0a[_0x55f98f(0x37b)];this['_forcedPosition']={};if(this[_0x55f98f(0x139)]())return _0x73033b;_0x73033b=_0x73033b[_0x55f98f(0x1e5)](/<POSITION:[ ]*(.*?)>/gi,(_0x3962e4,_0x168c7f)=>{const _0x36c71e=_0x55f98f;if(_0x36c71e(0x122)!==_0x36c71e(0x122))_0x1cda01[_0x36c71e(0x19b)][_0x36c71e(0x330)][_0x36c71e(0x37e)](this),this['updatePictureText']();else{const _0x527e03=_0x168c7f[_0x36c71e(0x345)](',')['map'](_0x2e05d8=>Number(_0x2e05d8)||0x0);if(_0x527e03[0x0]!==undefined)this[_0x36c71e(0x1dd)]['x']=Number(_0x527e03[0x0]);if(_0x527e03[0x1]!==undefined)this[_0x36c71e(0x1dd)]['y']=Number(_0x527e03[0x1]);if(_0x527e03[0x2]!==undefined)this[_0x36c71e(0x1dd)][_0x36c71e(0x367)]=Number(_0x527e03[0x2]);if(_0x527e03[0x3]!==undefined)this[_0x36c71e(0x1dd)][_0x36c71e(0x501)]=Number(_0x527e03[0x3]);return'';}}),_0x73033b=_0x73033b[_0x55f98f(0x1e5)](/<COORDINATES:[ ]*(.*?)>/gi,(_0x5c58b8,_0x525fb6)=>{const _0x27a80a=_0x55f98f;if(_0x27a80a(0x183)!=='jQtOL')_0x25f2e1['MessageCore']['Window_ChoiceList_updatePlacement']['call'](this),this[_0x27a80a(0x32b)](),this[_0x27a80a(0x3c1)]();else{const _0x1e37c3=_0x525fb6['split'](',')[_0x27a80a(0x3ce)](_0x45fae3=>Number(_0x45fae3)||0x0);if(_0x1e37c3[0x0]!==undefined)this[_0x27a80a(0x1dd)]['x']=Number(_0x1e37c3[0x0]);if(_0x1e37c3[0x1]!==undefined)this[_0x27a80a(0x1dd)]['y']=Number(_0x1e37c3[0x1]);return'';}}),_0x73033b=_0x73033b[_0x55f98f(0x1e5)](/<DIMENSIONS:[ ]*(.*?)>/gi,(_0x5e7f3f,_0x46d95d)=>{const _0x52de96=_0x55f98f;if(_0x52de96(0x1f6)===_0x52de96(0x1f6)){const _0x421f4e=_0x46d95d[_0x52de96(0x345)](',')[_0x52de96(0x3ce)](_0x39b0fb=>Number(_0x39b0fb)||0x0);if(_0x421f4e[0x0]!==undefined)this['_forcedPosition'][_0x52de96(0x367)]=Number(_0x421f4e[0x2]);if(_0x421f4e[0x1]!==undefined)this['_forcedPosition'][_0x52de96(0x501)]=Number(_0x421f4e[0x3]);return'';}else{let _0x4065ad=this['y'];this['x']=_0x4f0d8a['round']((_0xf5eba3[_0x52de96(0x137)]-this[_0x52de96(0x367)])/0x2),_0x5a121a[_0x52de96(0x19b)][_0x52de96(0x26e)][_0x52de96(0x37e)](this);if(this[_0x52de96(0x3cb)])this['y']=_0x4065ad;this[_0x52de96(0x3ba)](),this['updateForcedPlacement'](),this[_0x52de96(0x3c1)](),this[_0x52de96(0x360)]();}}),_0x73033b=_0x73033b['replace'](/<OFFSET:[ ]*(.*?)>/gi,(_0x41e740,_0x2a6dc1)=>{const _0xa760c0=_0x55f98f,_0x299a96=_0x2a6dc1['split'](',')[_0xa760c0(0x3ce)](_0x4652da=>Number(_0x4652da)||0x0);let _0x404aac=_0x299a96[0x0]||0x0,_0x11a051=_0x299a96[0x1]||0x0;return $gameSystem[_0xa760c0(0x3ae)](_0x404aac,_0x11a051),'';}),_0x3adc0a['text']=_0x73033b;},Window_Message[_0x314eca(0x393)][_0x314eca(0x3ba)]=function(){const _0x55e451=_0x314eca,_0x2cc9aa=$gameSystem[_0x55e451(0x4f4)]();this['x']+=_0x2cc9aa['x'],this['y']+=_0x2cc9aa['y'];},Window_Message[_0x314eca(0x393)][_0x314eca(0x2bc)]=function(){const _0x1e21da=_0x314eca;this[_0x1e21da(0x1dd)]=this[_0x1e21da(0x1dd)]||{};const _0x3e5be7=['x','y',_0x1e21da(0x367),'height'];for(const _0x11339f of _0x3e5be7){if(this['_forcedPosition'][_0x11339f]!==undefined){if(_0x1e21da(0x2fa)!==_0x1e21da(0x4c8))this[_0x11339f]=Number(this['_forcedPosition'][_0x11339f]);else{if(!this[_0x1e21da(0x40c)])return;const _0x2333dc=this[_0x1e21da(0x40c)];_0x2333dc&&(_0x2333dc['y']=this['y']>0x0?0x0:_0x3d1110[_0x1e21da(0x14f)]-_0x2333dc[_0x1e21da(0x501)]);}}}},Window_Message[_0x314eca(0x393)][_0x314eca(0x29a)]=function(_0x4f6efa){const _0x24881c=_0x314eca;this[_0x24881c(0x30b)]=![];let _0x326c18=_0x4f6efa[_0x24881c(0x37b)];_0x326c18=_0x326c18[_0x24881c(0x1e5)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x2e8950=_0x24881c;if(_0x2e8950(0x472)==='YsEFy')return this['processAutoSize'](_0x326c18,!![],!![]),this[_0x2e8950(0x24e)]('none'),'';else{let _0x14ae0b=_0x4e5952[_0x2e8950(0x152)]();const _0x16edac=_0x45058e[_0x2e8950(0x403)]();for(const _0x580da7 of _0x16edac){_0x580da7[_0x2e8950(0x34e)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x14ae0b=_0x484558[_0x2e8950(0x4f5)](_0x14ae0b,_0x48d84b(_0x1edbf8['$1'])));}return _0x4295c8[_0x2e8950(0x4f5)](_0x14ae0b,0x1);}}),_0x326c18=_0x326c18[_0x24881c(0x1e5)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x5c0b67=_0x24881c;return this[_0x5c0b67(0x140)](_0x326c18,!![],![]),this[_0x5c0b67(0x24e)](_0x5c0b67(0x4b1)),'';}),_0x326c18=_0x326c18[_0x24881c(0x1e5)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x4d3377=_0x24881c;return this[_0x4d3377(0x140)](_0x326c18,![],!![]),this[_0x4d3377(0x24e)]('none'),'';});if(SceneManager[_0x24881c(0x145)]())'lngrQ'===_0x24881c(0x2df)?(_0x5cb1b0=_0x4eb2b8[_0x24881c(0x268)](_0x4b9417),_0x150a12[_0x24881c(0x19b)][_0x24881c(0x2ea)][_0x24881c(0x37e)](this,_0x164988,_0x18cfe8,_0xad91d7,_0x6f728f,_0x15c92b,_0x1b7fd9)):(_0x326c18=_0x326c18[_0x24881c(0x1e5)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x7c77c2,_0x596fa3)=>{const _0x1367c1=_0x24881c;return this[_0x1367c1(0x140)](_0x326c18,!![],!![]),this['processAutoPosition'](_0x1367c1(0x1ad),Number(_0x596fa3)||0x1),'';}),_0x326c18=_0x326c18['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x2f927a,_0x7f661a)=>{const _0x104fcf=_0x24881c;return this[_0x104fcf(0x140)](_0x326c18,!![],!![]),this['processAutoPosition'](_0x104fcf(0x2fd),Number(_0x7f661a)||0x0),'';}),_0x326c18=_0x326c18['replace'](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x50b7d7,_0x278d6a)=>{const _0x14ca0c=_0x24881c;return _0x14ca0c(0x242)===_0x14ca0c(0x242)?(this['processAutoSize'](_0x326c18,!![],!![]),this[_0x14ca0c(0x24e)](_0x14ca0c(0x21b),Number(_0x278d6a)||0x0),''):(_0x4ddd57[_0x14ca0c(0x499)]+=_0x54315b[0x0][_0x14ca0c(0x428)],_0x9a2198(_0x47d461[0x0][_0x14ca0c(0x207)](0x1,_0x159e44[0x0]['length']-0x1)));}));else SceneManager[_0x24881c(0x1a8)]()&&(_0x24881c(0x28c)==='RhSFx'?(_0x326c18=_0x326c18[_0x24881c(0x1e5)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x4104e0,_0x22d6ad)=>{const _0x1eb381=_0x24881c;return this[_0x1eb381(0x140)](_0x326c18,!![],!![]),this[_0x1eb381(0x24e)](_0x1eb381(0x4cb),0x0),'';}),_0x326c18=_0x326c18[_0x24881c(0x1e5)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x27b5a2,_0x164cba)=>{const _0x11c7de=_0x24881c;return this['processAutoSize'](_0x326c18,!![],!![]),this['processAutoPosition'](_0x11c7de(0x427),Number(_0x164cba)||0x1),'';}),_0x326c18=_0x326c18['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x2b68ce,_0x18a3c4)=>{const _0x2b0018=_0x24881c;if(_0x2b0018(0x23a)===_0x2b0018(0x3d6)){if(this['isColorLocked']())return;_0x9f6ae8=_0x28563f[_0x2b0018(0x1e5)](/\,/g,''),this[_0x2b0018(0x54b)]=this[_0x2b0018(0x54b)]||[],this[_0x2b0018(0x54b)][_0x2b0018(0x279)](this[_0x2b0018(0x201)]['textColor']),_0x4477f4[_0x2b0018(0x19b)][_0x2b0018(0x3e5)][_0x2b0018(0x37e)](this,_0x40049b);}else return this[_0x2b0018(0x140)](_0x326c18,!![],!![]),this['processAutoPosition'](_0x2b0018(0x512),Number(_0x18a3c4)||0x0),'';}),_0x326c18=_0x326c18[_0x24881c(0x1e5)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x38e10e,_0x143692)=>{const _0x3d0509=_0x24881c;if(_0x3d0509(0x45f)!==_0x3d0509(0x51a))return this[_0x3d0509(0x140)](_0x326c18,!![],!![]),this[_0x3d0509(0x24e)](_0x3d0509(0x4d3),Number(_0x143692)||0x0),'';else _0x126a54[_0x3d0509(0x35d)](_0x1e2264['x']-0x1,_0x13f61d['y']-0x1,_0x351c27[_0x3d0509(0x367)]+0x2,_0x458c66[_0x3d0509(0x501)]+0x2);})):_0x545e49['x']=this[_0x24881c(0x367)]+_0x3629f5);_0x4f6efa['text']=_0x326c18;},Window_Message[_0x314eca(0x32f)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x314eca(0x457)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x314eca(0x393)]['processAutoSize']=function(_0x2d81bf,_0x147f54,_0xfcc4a6){const _0x2abe80=_0x314eca;_0x2d81bf=_0x2d81bf['replace'](Window_Message['_autoSizeRegexp'],''),_0x2d81bf=_0x2d81bf[_0x2abe80(0x1e5)](Window_Message['_autoPosRegExp'],''),this[_0x2abe80(0x184)]=!![],this['_currentAutoSize']=!![],this[_0x2abe80(0x36c)](![]);const _0x34560a=this[_0x2abe80(0x163)](_0x2d81bf);if(_0x147f54){if(_0x2abe80(0x3f5)===_0x2abe80(0x1b0))return!![];else{let _0xd967ef=_0x34560a['width']+$gameSystem[_0x2abe80(0x38f)]()*0x2+0x6;const _0x2be219=$gameMessage[_0x2abe80(0x3cc)]()!=='',_0x36d7af=ImageManager[_0x2abe80(0x15e)],_0x37772e=0x14;_0xd967ef+=_0x2be219?_0x36d7af+_0x37772e:0x4;if(_0xd967ef%0x2!==0x0)_0xd967ef+=0x1;$gameSystem['setMessageWindowWidth'](_0xd967ef);}}if(_0xfcc4a6){let _0x2165aa=Math[_0x2abe80(0x38a)](_0x34560a[_0x2abe80(0x501)]/this[_0x2abe80(0x40e)]());$gameSystem[_0x2abe80(0x41d)](_0x2165aa);}this[_0x2abe80(0x110)](),this[_0x2abe80(0x3ef)](),this[_0x2abe80(0x184)]=![],this[_0x2abe80(0x385)]=!![];},Window_Message['prototype']['updateAutoSizePosition']=function(){const _0x14a9a3=_0x314eca;this[_0x14a9a3(0x531)](),this[_0x14a9a3(0x1ef)](),this[_0x14a9a3(0x11d)](),this[_0x14a9a3(0x12a)](),this[_0x14a9a3(0x201)][_0x14a9a3(0x1eb)](),this[_0x14a9a3(0x10e)]();},Window_Message[_0x314eca(0x393)][_0x314eca(0x24e)]=function(_0x3cdd29,_0x1face0){const _0x568fdd=_0x314eca;switch(_0x3cdd29['toLowerCase']()['trim']()){case _0x568fdd(0x1ad):this[_0x568fdd(0x3cb)]=$gameActors[_0x568fdd(0x508)](_0x1face0);break;case _0x568fdd(0x2fd):this[_0x568fdd(0x3cb)]=$gameParty[_0x568fdd(0x3d0)]()[_0x1face0-0x1];break;case _0x568fdd(0x21b):this[_0x568fdd(0x3cb)]=$gameTroop['members']()[_0x1face0-0x1];break;case _0x568fdd(0x4cb):this[_0x568fdd(0x3cb)]=$gamePlayer;break;case _0x568fdd(0x427):const _0x563817=$gameActors[_0x568fdd(0x508)](_0x1face0)[_0x568fdd(0x499)]();if(_0x563817===0x0)_0x568fdd(0x1af)==='yTeeG'?this['contents']['fontItalic']=!!_0x543038:this[_0x568fdd(0x3cb)]=$gamePlayer;else{if('mbefU'!=='mbefU'){if(_0x48cffc[_0x568fdd(0x497)]!==_0x5f2020)return![];}else this['_autoPositionTarget']=$gamePlayer[_0x568fdd(0x28d)]()[_0x568fdd(0x381)](_0x563817-0x1);}break;case _0x568fdd(0x512):_0x1face0===0x1?this[_0x568fdd(0x3cb)]=$gamePlayer:this['_autoPositionTarget']=$gamePlayer[_0x568fdd(0x28d)]()[_0x568fdd(0x381)](_0x1face0-0x2);break;case'map\x20event':this[_0x568fdd(0x3cb)]=$gameMap['event'](_0x1face0);break;}this[_0x568fdd(0x3cb)]&&this[_0x568fdd(0x189)]();},VisuMZ[_0x314eca(0x19b)]['Window_Message_synchronizeNameBox']=Window_Message[_0x314eca(0x393)]['synchronizeNameBox'],Window_Message[_0x314eca(0x393)][_0x314eca(0x3e0)]=function(){const _0x1540a7=_0x314eca;this[_0x1540a7(0x189)](),VisuMZ[_0x1540a7(0x19b)][_0x1540a7(0x3be)][_0x1540a7(0x37e)](this);},Window_Message[_0x314eca(0x393)][_0x314eca(0x189)]=function(){const _0x345458=_0x314eca;if(!this[_0x345458(0x3cb)])return;const _0x509d8f=SceneManager[_0x345458(0x180)];if(!_0x509d8f)return;const _0x4131e0=_0x509d8f['_spriteset'];if(!_0x4131e0)return;const _0x43cffa=_0x4131e0[_0x345458(0x270)](this[_0x345458(0x3cb)]);if(!_0x43cffa)return;let _0x1a749b=_0x43cffa['x'];if(SceneManager[_0x345458(0x1a8)]())_0x1a749b*=$gameScreen[_0x345458(0x1ec)]();else{if(SceneManager['isSceneBattle']()&&Imported[_0x345458(0x518)]){if('ZtaTI'===_0x345458(0x1b2)){let _0x4f60cc=_0x43cffa['x']-Graphics[_0x345458(0x137)]*_0x4131e0[_0x345458(0x538)]['x'];_0x1a749b+=_0x4f60cc*(_0x4131e0[_0x345458(0x2ff)]['x']-0x1);}else _0x3adb48=_0x29cc7f['name'];}}_0x1a749b-=this[_0x345458(0x367)]/0x2,_0x1a749b-=(Graphics[_0x345458(0x367)]-Graphics['boxWidth'])/0x2,_0x1a749b+=this[_0x345458(0x4a6)]();let _0x5ef40e=_0x43cffa['y'];if(SceneManager['isSceneMap']())_0x5ef40e-=_0x43cffa['height']+0x8,_0x5ef40e*=$gameScreen['zoomScale'](),_0x5ef40e-=this['height']*$gameScreen[_0x345458(0x1ec)]();else{if(SceneManager[_0x345458(0x145)]()&&Imported['VisuMZ_3_ActSeqCamera']){let _0x374d96=_0x43cffa[_0x345458(0x501)]*_0x4131e0[_0x345458(0x2ff)]['y'];_0x5ef40e-=this[_0x345458(0x501)]*_0x4131e0[_0x345458(0x2ff)]['y']+_0x374d96+0x8;let _0x4675c0=_0x43cffa['y']-Graphics[_0x345458(0x14f)]*_0x4131e0['anchor']['y'];_0x5ef40e+=_0x4675c0*(_0x4131e0[_0x345458(0x2ff)]['y']-0x1);}else _0x5ef40e-=_0x43cffa[_0x345458(0x501)]+0x8,_0x5ef40e-=this[_0x345458(0x501)];}_0x5ef40e-=(Graphics[_0x345458(0x501)]-Graphics[_0x345458(0x14f)])/0x2,_0x5ef40e+=this['autoPositionOffsetY']();const _0x3926b7=$gameSystem[_0x345458(0x4f4)]();_0x1a749b+=_0x3926b7['x'],_0x5ef40e+=_0x3926b7['y'],this['x']=Math[_0x345458(0x4f0)](_0x1a749b),this['y']=Math[_0x345458(0x4f0)](_0x5ef40e),this[_0x345458(0x3c1)](!![],![]),this[_0x345458(0x1dd)]=this[_0x345458(0x1dd)]||{},this['_forcedPosition']['x']=this['x'],this['_forcedPosition']['y']=this['y'],this[_0x345458(0x1dd)][_0x345458(0x367)]=this[_0x345458(0x367)],this[_0x345458(0x1dd)][_0x345458(0x501)]=this[_0x345458(0x501)],this[_0x345458(0x4a2)][_0x345458(0x1ef)]();},Window_Message[_0x314eca(0x393)][_0x314eca(0x4a6)]=function(){return 0x0;},Window_Message['prototype'][_0x314eca(0x363)]=function(){return 0x0;},Window_Message[_0x314eca(0x393)]['messagePositionReset']=function(){const _0x3a0632=_0x314eca;this['_messagePositionReset']=![],this[_0x3a0632(0x3cb)]=undefined,$gameSystem[_0x3a0632(0x256)](),this[_0x3a0632(0x110)](),this[_0x3a0632(0x30a)]=0x0;},Window_Message[_0x314eca(0x393)]['preConvertEscapeCharacters']=function(_0x102302){const _0x2adaa5=_0x314eca;return Window_Base[_0x2adaa5(0x393)][_0x2adaa5(0x241)][_0x2adaa5(0x37e)](this,_0x102302);},Window_Message[_0x314eca(0x393)][_0x314eca(0x545)]=function(_0x2468b7){const _0x29915d=_0x314eca;return Window_Base[_0x29915d(0x393)]['postConvertEscapeCharacters'][_0x29915d(0x37e)](this,_0x2468b7);},Window_Message[_0x314eca(0x393)][_0x314eca(0x416)]=function(_0x20efe6){const _0x35c9b5=_0x314eca;this[_0x35c9b5(0x24b)](_0x20efe6),Window_Base[_0x35c9b5(0x393)][_0x35c9b5(0x416)][_0x35c9b5(0x37e)](this,_0x20efe6),this[_0x35c9b5(0x395)](_0x20efe6);},Window_Message[_0x314eca(0x393)][_0x314eca(0x24b)]=function(_0xad8df5){},Window_Message[_0x314eca(0x393)][_0x314eca(0x395)]=function(_0x4299e8){},Window_NameBox[_0x314eca(0x393)][_0x314eca(0x2a9)]=function(){return![];},Window_NameBox['prototype'][_0x314eca(0x327)]=function(){const _0x270d01=_0x314eca;Window_Base[_0x270d01(0x393)]['resetTextColor'][_0x270d01(0x37e)](this),this[_0x270d01(0x218)](this[_0x270d01(0x2c0)]());},Window_NameBox[_0x314eca(0x393)][_0x314eca(0x2c0)]=function(){const _0x2f36dc=_0x314eca,_0x135e4d=VisuMZ[_0x2f36dc(0x19b)][_0x2f36dc(0x17c)][_0x2f36dc(0x4c9)][_0x2f36dc(0x4dc)];return ColorManager[_0x2f36dc(0x549)](_0x135e4d);},VisuMZ['MessageCore']['Window_NameBox_updatePlacement']=Window_NameBox[_0x314eca(0x393)][_0x314eca(0x1ef)],Window_NameBox[_0x314eca(0x393)][_0x314eca(0x1ef)]=function(){const _0x3aaac6=_0x314eca;VisuMZ['MessageCore'][_0x3aaac6(0x128)][_0x3aaac6(0x37e)](this),this[_0x3aaac6(0x33a)](),this[_0x3aaac6(0x35b)](),this[_0x3aaac6(0x3c1)](),this[_0x3aaac6(0x390)]();},Window_NameBox[_0x314eca(0x393)][_0x314eca(0x241)]=function(_0x5dbd2e){const _0x52a024=_0x314eca;return _0x5dbd2e=_0x5dbd2e[_0x52a024(0x1e5)](/<LEFT>/gi,this['setRelativePosition'][_0x52a024(0x424)](this,0x0)),_0x5dbd2e=_0x5dbd2e[_0x52a024(0x1e5)](/<CENTER>/gi,this[_0x52a024(0x458)][_0x52a024(0x424)](this,0x5)),_0x5dbd2e=_0x5dbd2e[_0x52a024(0x1e5)](/<RIGHT>/gi,this[_0x52a024(0x458)]['bind'](this,0xa)),_0x5dbd2e=_0x5dbd2e[_0x52a024(0x1e5)](/<POSITION:[ ](\d+)>/gi,(_0x276544,_0x5ad218)=>this[_0x52a024(0x458)](parseInt(_0x5ad218))),_0x5dbd2e=_0x5dbd2e[_0x52a024(0x1e5)](/<\/LEFT>/gi,''),_0x5dbd2e=_0x5dbd2e[_0x52a024(0x1e5)](/<\/CENTER>/gi,''),_0x5dbd2e=_0x5dbd2e[_0x52a024(0x1e5)](/<\/RIGHT>/gi,''),_0x5dbd2e=_0x5dbd2e[_0x52a024(0x1ab)](),Window_Base[_0x52a024(0x393)][_0x52a024(0x241)]['call'](this,_0x5dbd2e);},Window_NameBox['prototype'][_0x314eca(0x458)]=function(_0xc1a6b6){return this['_relativePosition']=_0xc1a6b6,'';},Window_NameBox[_0x314eca(0x393)]['updateRelativePosition']=function(){const _0x52c6a5=_0x314eca;if($gameMessage[_0x52c6a5(0x3b3)]())return;this[_0x52c6a5(0x160)]=this['_relativePosition']||0x0;const _0x2900eb=this[_0x52c6a5(0x373)],_0x5cc837=Math[_0x52c6a5(0x25c)](_0x2900eb['width']*this[_0x52c6a5(0x160)]/0xa);this['x']=_0x2900eb['x']+_0x5cc837-Math[_0x52c6a5(0x25c)](this[_0x52c6a5(0x367)]/0x2),this['x']=this['x'][_0x52c6a5(0x11e)](_0x2900eb['x'],_0x2900eb['x']+_0x2900eb['width']-this[_0x52c6a5(0x367)]);},Window_NameBox['prototype']['updateOffsetPosition']=function(){const _0x40eca7=_0x314eca;if($gameMessage[_0x40eca7(0x3b3)]())return;this[_0x40eca7(0x160)]=this[_0x40eca7(0x160)]||0x0;const _0x1d774e=VisuMZ[_0x40eca7(0x19b)][_0x40eca7(0x17c)][_0x40eca7(0x4c9)][_0x40eca7(0x483)],_0x23155e=VisuMZ[_0x40eca7(0x19b)][_0x40eca7(0x17c)][_0x40eca7(0x4c9)][_0x40eca7(0x108)],_0xf18ec2=(0x5-this[_0x40eca7(0x160)])/0x5;this['x']+=Math[_0x40eca7(0x25c)](_0x1d774e*_0xf18ec2),this['y']+=_0x23155e;},Window_NameBox[_0x314eca(0x393)][_0x314eca(0x390)]=function(){const _0x1e2027=_0x314eca,_0xf0e36=this['_messageWindow'],_0x41f9b1=_0xf0e36['y'],_0x4fc2d3=VisuMZ[_0x1e2027(0x19b)][_0x1e2027(0x17c)][_0x1e2027(0x4c9)][_0x1e2027(0x108)];_0x41f9b1>this['y']&&_0x41f9b1<this['y']+this[_0x1e2027(0x501)]-_0x4fc2d3&&(_0x1e2027(0x2d2)!=='waopS'?this['y']=_0xf0e36['y']+_0xf0e36[_0x1e2027(0x501)]:this[_0x1e2027(0x1dd)][_0x3ced0d]!==_0x5c68ba&&(this[_0x1e3103]=_0x3521ea(this['_forcedPosition'][_0x472c19])));},VisuMZ['MessageCore']['Window_NameBox_refresh']=Window_NameBox[_0x314eca(0x393)]['refresh'],Window_NameBox[_0x314eca(0x393)][_0x314eca(0x47a)]=function(){const _0x327203=_0x314eca;this[_0x327203(0x160)]=0x0,VisuMZ[_0x327203(0x19b)][_0x327203(0x42d)][_0x327203(0x37e)](this);},Window_ChoiceList['prototype'][_0x314eca(0x139)]=function(){return![];},Window_ChoiceList[_0x314eca(0x393)]['isAutoColorAffected']=function(){return!![];},Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x45c)]=function(){const _0x5260cb=_0x314eca;return $gameSystem[_0x5260cb(0x1f5)]()+0x8;},Window_ChoiceList['prototype']['maxCols']=function(){const _0x24175e=_0x314eca;return $gameSystem[_0x24175e(0x264)]();},Window_ChoiceList['prototype'][_0x314eca(0x2ae)]=function(){const _0xe5c4a9=_0x314eca;this[_0xe5c4a9(0x47a)](),this['selectDefault'](),this['open'](),this[_0xe5c4a9(0x2ad)]();},Window_ChoiceList[_0x314eca(0x393)]['callOkHandler']=function(){const _0x574482=_0x314eca;$gameMessage['onChoice'](this[_0x574482(0x1b1)]()),this['_messageWindow'][_0x574482(0x1ba)](),this[_0x574482(0x4b4)](),this[_0x574482(0x11b)]&&(this['_helpWindow'][_0x574482(0x1eb)](),this[_0x574482(0x11b)][_0x574482(0x26c)]());},VisuMZ[_0x314eca(0x19b)]['Window_ChoiceList_callCancelHandler']=Window_ChoiceList[_0x314eca(0x393)]['callCancelHandler'],Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x2e3)]=function(){const _0x440eae=_0x314eca;VisuMZ[_0x440eae(0x19b)]['Window_ChoiceList_callCancelHandler']['call'](this);if(this[_0x440eae(0x11b)]){if(_0x440eae(0x4dd)!==_0x440eae(0x4dd))return(_0x4b869c[_0x440eae(0x137)]-this[_0x440eae(0x2ed)]())/0x2;else this[_0x440eae(0x11b)][_0x440eae(0x1eb)](),this[_0x440eae(0x11b)][_0x440eae(0x26c)]();}},Window_ChoiceList['prototype'][_0x314eca(0x47a)]=function(){const _0x4801b3=_0x314eca;this['clearCommandList'](),this[_0x4801b3(0x249)](),this['_messageWindow']&&(this[_0x4801b3(0x1ef)](),this[_0x4801b3(0x2c2)]()),this[_0x4801b3(0x10e)](),this[_0x4801b3(0x359)](),this[_0x4801b3(0x27c)](),Window_Selectable[_0x4801b3(0x393)][_0x4801b3(0x47a)][_0x4801b3(0x37e)](this);},Window_ChoiceList['prototype'][_0x314eca(0x249)]=function(){const _0xc76c53=_0x314eca;$gameMessage[_0xc76c53(0x388)]?this[_0xc76c53(0x2dc)]():this[_0xc76c53(0x117)](),this['clearChoiceHelpDescriptions'](),this['applyChoiceHelpDescriptions']();},Window_ChoiceList['prototype']['makeCommandListScriptCall']=function(){const _0x3e47d6=_0x314eca,_0x3e87c0=$gameMessage[_0x3e47d6(0x403)]();let _0x4f6617=0x0;for(let _0x286b49 of _0x3e87c0){_0x286b49=this['convertChoiceMacros'](_0x286b49);if(this[_0x3e47d6(0x3ca)](_0x286b49)){const _0x4d5e2e=this[_0x3e47d6(0x258)](_0x286b49),_0x172592=this[_0x3e47d6(0x27a)](_0x286b49);this[_0x3e47d6(0x281)](_0x4d5e2e,'choice',_0x172592,_0x4f6617);}_0x4f6617++;}},Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x117)]=function(){const _0x33e26f=_0x314eca,_0x58914d=$gameMessage['choices'](),_0x30209b=$gameMessage['choiceIndexArray'](),_0x103e00=$gameMessage['maxShuffleChoices'](),_0x23953e=_0x58914d[_0x33e26f(0x428)];let _0xfb24fa=0x0;for(let _0x512fff=0x0;_0x512fff<_0x23953e;_0x512fff++){if(this[_0x33e26f(0x2cc)][_0x33e26f(0x428)]>=_0x103e00)break;const _0x1ab98b=_0x30209b[_0x512fff];let _0x3acb55=_0x58914d[_0x1ab98b];if(_0x3acb55===undefined)continue;_0x3acb55=this['convertChoiceMacros'](_0x3acb55);if(this[_0x33e26f(0x3ca)](_0x3acb55)){if(_0x33e26f(0x3da)!==_0x33e26f(0x3da)){_0x2c4f9b[_0x33e26f(0x19b)][_0x33e26f(0x528)](_0x33e26f(0x3c3));for(const _0x30acf2 of _0xd1d544[_0x33e26f(0x19b)][_0x33e26f(0x17c)]['TextCodeActions']){_0x30acf2[_0x33e26f(0x39a)]=_0x30acf2[_0x33e26f(0x39a)]['toUpperCase'](),_0x30acf2[_0x33e26f(0x448)]=new _0x62d939('\x1b'+_0x30acf2[_0x33e26f(0x39a)],'gi'),_0x30acf2[_0x33e26f(0x4a5)]='\x1b'+_0x30acf2['Match'];if(_0x30acf2[_0x33e26f(0x50a)]==='')_0x30acf2[_0x33e26f(0x4a5)]+=_0x33e26f(0x2f8);}}else{const _0x3ad0f4=this[_0x33e26f(0x258)](_0x3acb55),_0x32197e=this['isChoiceEnabled'](_0x3acb55);this['addCommand'](_0x3ad0f4,_0x33e26f(0x144),_0x32197e,_0x1ab98b);}}_0xfb24fa++;}},Window_ChoiceList['prototype'][_0x314eca(0x4c4)]=function(_0x1fb121){const _0x3bd5e9=_0x314eca;return Window_Base[_0x3bd5e9(0x393)][_0x3bd5e9(0x38b)]['call'](this,_0x1fb121);},Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x3ca)]=function(_0x170fbf){const _0xbc29db=_0x314eca;if(Imported['VisuMZ_1_EventsMoveCore'])$gameMessage[_0xbc29db(0x4d0)]();if(_0x170fbf[_0xbc29db(0x34e)](/<HIDE>/i))return![];if(_0x170fbf['match'](/<SHOW>/i))return!![];if(_0x170fbf[_0xbc29db(0x34e)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0xbc29db(0x170)===_0xbc29db(0x127))return _0x583208[_0xbc29db(0x253)](_0x4ee339,this['_moveEasingType']);else{const _0x26ee83=RegExp['$1'][_0xbc29db(0x345)](',')[_0xbc29db(0x3ce)](_0x4ffdb7=>Number(_0x4ffdb7)||0x0);for(const _0x2aea72 of _0x26ee83){if(!$gameSwitches['value'](_0x2aea72))return![];}return!![];}}if(_0x170fbf['match'](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x8e2a95=RegExp['$1'][_0xbc29db(0x345)](',')['map'](_0x1b00f7=>Number(_0x1b00f7)||0x0);for(const _0x22e72e of _0x8e2a95){if(_0xbc29db(0x1de)===_0xbc29db(0x113))return this[_0xbc29db(0x109)]||0x0;else{if(!$gameSwitches[_0xbc29db(0x27f)](_0x22e72e))return![];}}return!![];}if(_0x170fbf['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x24f442=RegExp['$1'][_0xbc29db(0x345)](',')[_0xbc29db(0x3ce)](_0x3d7a4f=>Number(_0x3d7a4f)||0x0);for(const _0x2404e5 of _0x24f442){if($gameSwitches['value'](_0x2404e5))return!![];}return![];}if(_0x170fbf[_0xbc29db(0x34e)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x49ebf2=RegExp['$1'][_0xbc29db(0x345)](',')[_0xbc29db(0x3ce)](_0xbd5fe7=>Number(_0xbd5fe7)||0x0);for(const _0x5557a1 of _0x49ebf2){if(_0xbc29db(0x213)===_0xbc29db(0x10f))return _0x5e7a64['prototype'][_0xbc29db(0x545)][_0xbc29db(0x37e)](this,_0x487811);else{if(!$gameSwitches[_0xbc29db(0x27f)](_0x5557a1))return!![];}}return![];}if(_0x170fbf[_0xbc29db(0x34e)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x1cc3dd=RegExp['$1'][_0xbc29db(0x345)](',')[_0xbc29db(0x3ce)](_0x308ca3=>Number(_0x308ca3)||0x0);for(const _0x436094 of _0x1cc3dd){if(!$gameSwitches[_0xbc29db(0x27f)](_0x436094))return!![];}return![];}if(_0x170fbf['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0xbc29db(0x146)==='rZmXA')_0x17952a['textCodeCheck']=new _0x4a006f('\x1b'+_0x434c6f[_0xbc29db(0x39a)]+_0x4310f[_0xbc29db(0x50a)],'gi'),_0x431f71[_0xbc29db(0x3f8)]!==''&&_0x426525[_0xbc29db(0x3f8)]!==_0xbc29db(0x290)?_0x1449be['textCodeResult']=new _0xf94f8e(_0xbc29db(0x208)+_0x57657d[_0xbc29db(0x3f8)][_0xbc29db(0x1e5)](/\\/g,'\x1b')+'\x27'):_0x24e32c[_0xbc29db(0x4a5)]=_0x5e324a[_0xbc29db(0x29d)];else{const _0x3b7480=RegExp['$1']['split'](',')[_0xbc29db(0x3ce)](_0x852cb1=>Number(_0x852cb1)||0x0);for(const _0x37a90d of _0x3b7480){if($gameSwitches[_0xbc29db(0x27f)](_0x37a90d))return![];}return!![];}}return!![];},Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x258)]=function(_0xf28e30){const _0x283a35=_0x314eca;let _0x53f38a=_0xf28e30;return _0x53f38a=_0x53f38a[_0x283a35(0x1e5)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x53f38a=_0x53f38a['replace'](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x53f38a;},Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x27a)]=function(_0x13874d){const _0x4d745a=_0x314eca;if(Imported['VisuMZ_1_EventsMoveCore'])$gameMessage[_0x4d745a(0x4d0)]();if(_0x13874d[_0x4d745a(0x34e)](/<DISABLE>/i))return![];if(_0x13874d[_0x4d745a(0x34e)](/<ENABLE>/i))return!![];if(_0x13874d[_0x4d745a(0x34e)](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x418110=RegExp['$1'][_0x4d745a(0x345)](',')['map'](_0x46dfbe=>Number(_0x46dfbe)||0x0);for(const _0x4a4e7c of _0x418110){if(_0x4d745a(0x382)==='LLeho'){if(!$gameSwitches['value'](_0x4a4e7c))return![];}else this[_0x4d745a(0x100)]()&&(this['x']=this[_0x4d745a(0x253)](this['x'],this[_0x4d745a(0x2bf)]),this['y']=this['applyMoveEasing'](this['y'],this['_moveTargetY']),this[_0x4d745a(0x367)]=this['applyMoveEasing'](this['width'],this[_0x4d745a(0x18d)]),this[_0x4d745a(0x501)]=this['applyMoveEasing'](this[_0x4d745a(0x501)],this[_0x4d745a(0x446)]),this[_0x4d745a(0x3c1)]()),this['_moveDuration']--;}return!![];}if(_0x13874d[_0x4d745a(0x34e)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x3b637a=RegExp['$1'][_0x4d745a(0x345)](',')['map'](_0x4ec4c8=>Number(_0x4ec4c8)||0x0);for(const _0x54cbb3 of _0x3b637a){if(_0x4d745a(0x20c)!=='RsLtx'){if(_0x150a3b[_0x4d745a(0x3b3)]())return;this[_0x4d745a(0x160)]=this[_0x4d745a(0x160)]||0x0;const _0x4884a1=_0x15ede6[_0x4d745a(0x19b)]['Settings'][_0x4d745a(0x4c9)][_0x4d745a(0x483)],_0x566366=_0x4a1acd[_0x4d745a(0x19b)]['Settings'][_0x4d745a(0x4c9)][_0x4d745a(0x108)],_0x1a6d97=(0x5-this['_relativePosition'])/0x5;this['x']+=_0x3b216f[_0x4d745a(0x25c)](_0x4884a1*_0x1a6d97),this['y']+=_0x566366;}else{if(!$gameSwitches[_0x4d745a(0x27f)](_0x54cbb3))return![];}}return!![];}if(_0x13874d[_0x4d745a(0x34e)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x19a565=RegExp['$1'][_0x4d745a(0x345)](',')[_0x4d745a(0x3ce)](_0x1bffeb=>Number(_0x1bffeb)||0x0);for(const _0x16ee82 of _0x19a565){if($gameSwitches[_0x4d745a(0x27f)](_0x16ee82))return!![];}return![];}if(_0x13874d[_0x4d745a(0x34e)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x38ac52=RegExp['$1'][_0x4d745a(0x345)](',')[_0x4d745a(0x3ce)](_0x2c6cc5=>Number(_0x2c6cc5)||0x0);for(const _0x54ce33 of _0x38ac52){if(!$gameSwitches[_0x4d745a(0x27f)](_0x54ce33))return!![];}return![];}if(_0x13874d[_0x4d745a(0x34e)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x4d745a(0x2ef)!==_0x4d745a(0x2ef))this[_0x4d745a(0x1ef)](),this[_0x4d745a(0x2c2)]();else{const _0x52eb2c=RegExp['$1'][_0x4d745a(0x345)](',')[_0x4d745a(0x3ce)](_0x35f233=>Number(_0x35f233)||0x0);for(const _0x424470 of _0x52eb2c){if(!$gameSwitches[_0x4d745a(0x27f)](_0x424470))return!![];}return![];}}if(_0x13874d[_0x4d745a(0x34e)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x31b214=RegExp['$1'][_0x4d745a(0x345)](',')[_0x4d745a(0x3ce)](_0x2425a0=>Number(_0x2425a0)||0x0);for(const _0x527c0a of _0x31b214){if($gameSwitches[_0x4d745a(0x27f)](_0x527c0a))return![];}return!![];}return!![];},Window_ChoiceList[_0x314eca(0x393)]['clearChoiceHelpDescriptions']=function(){const _0x44c64f=_0x314eca;this[_0x44c64f(0x459)]={};if(this['_helpWindow']){if('oYPwE'==='eqPTv'){if(_0x3444e5[_0x44c64f(0x27f)](_0x11fea0))return![];}else this[_0x44c64f(0x11b)]['clear'](),this[_0x44c64f(0x11b)][_0x44c64f(0x26c)]();}},Window_ChoiceList[_0x314eca(0x393)]['applyChoiceHelpDescriptions']=function(){const _0x56140e=_0x314eca,_0x4c36fd=/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i;for(const _0x36207e of this['_list']){if(_0x56140e(0x1fd)!=='rcJIg')_0x2c8761[_0x56140e(0x34e)](_0x26fb90[_0x56140e(0x448)])&&(this[_0x56140e(0x1fc)]=!![],_0x269b67=_0x464dbc[_0x56140e(0x1e5)](_0x4c1a7f['textCodeCheck'],_0x3ea32d[_0x56140e(0x4a5)][_0x56140e(0x424)](this)));else{if(!_0x36207e)continue;const _0x2e7d9f=this[_0x56140e(0x2cc)][_0x56140e(0x39f)](_0x36207e);if(_0x36207e[_0x56140e(0x1c6)][_0x56140e(0x34e)](_0x4c36fd)){if(_0x56140e(0x16d)===_0x56140e(0x16d)){const _0x586650=String(RegExp['$1']);this[_0x56140e(0x459)][_0x2e7d9f]=_0x586650['trim'](),_0x36207e[_0x56140e(0x1c6)]=_0x36207e[_0x56140e(0x1c6)][_0x56140e(0x1e5)](_0x4c36fd,'')[_0x56140e(0x1ab)]();}else return!![];}else this[_0x56140e(0x459)][_0x2e7d9f]='';}}},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x488)]=Window_ChoiceList['prototype']['updatePlacement'],Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x1ef)]=function(){const _0x265696=_0x314eca;VisuMZ[_0x265696(0x19b)][_0x265696(0x488)][_0x265696(0x37e)](this),this['addChoiceDistance'](),this[_0x265696(0x3c1)]();},Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x2c2)]=function(){const _0x533afe=_0x314eca;if(!this[_0x533afe(0x442)])return;const _0x321dfb=0x8,_0x18bd82=this['_cancelButton'],_0x2e3e8a=this['x']+this[_0x533afe(0x367)],_0x4a4d4b=Math['floor']((Graphics[_0x533afe(0x367)]-Graphics[_0x533afe(0x137)])/0x2);if(_0x2e3e8a>=Graphics[_0x533afe(0x137)]+_0x4a4d4b-_0x18bd82[_0x533afe(0x367)]+_0x321dfb)_0x18bd82['x']=-_0x18bd82['width']-_0x321dfb;else{if(_0x533afe(0x3fd)===_0x533afe(0x546)){if(!_0x3fcf8f)return'';const _0x4d4eb3=_0x570e02[_0x13a2ac[_0x533afe(0x31c)]()['trim']()];if(!_0x4d4eb3)return;const _0x52ea48=_0x2fc8bd['textLocale']||_0x533afe(0x28e);let _0x51627b=_0x4d4eb3[_0x52ea48]||_0x533afe(0x54d);return _0x51627b=_0x51627b['replace'](/\\/g,'\x1b'),_0x51627b=_0x51627b[_0x533afe(0x1e5)](/<SEMI(?:|-COLON|COLON)>/gi,';'),_0x51627b;}else _0x18bd82['x']=this['width']+_0x321dfb;}_0x18bd82['y']=this[_0x533afe(0x501)]/0x2-_0x18bd82[_0x533afe(0x501)]/0x2;},VisuMZ['MessageCore'][_0x314eca(0x351)]=Window_ChoiceList['prototype']['windowX'],Window_ChoiceList['prototype'][_0x314eca(0x3f7)]=function(){const _0x1eb123=_0x314eca;if(this['_messageWindow']){if(_0x1eb123(0x250)===_0x1eb123(0x250))return this[_0x1eb123(0x52e)]();else this['y']=_0x104606[_0x1eb123(0x4f0)]((_0x206d84[_0x1eb123(0x14f)]-this[_0x1eb123(0x501)])/0x2);}else return'CwgnA'===_0x1eb123(0x3d3)?VisuMZ[_0x1eb123(0x19b)][_0x1eb123(0x351)]['call'](this):_0x1faa9c;},Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x52e)]=function(){const _0x184176=_0x314eca,_0x5ba57a=$gameMessage['choicePositionType']();if(_0x5ba57a===0x1)return(Graphics['boxWidth']-this['windowWidth']())/0x2;else return _0x5ba57a===0x2?this[_0x184176(0x373)]['x']+this[_0x184176(0x373)]['width']-this[_0x184176(0x2ed)]():this[_0x184176(0x373)]['x'];},Window_ChoiceList['prototype'][_0x314eca(0x2ed)]=function(){const _0x2999c2=_0x314eca,_0x5c8ce5=(this[_0x2999c2(0x29c)]()+this[_0x2999c2(0x332)]())*this['maxCols']()+this['padding']*0x2;return Math[_0x2999c2(0x1aa)](_0x5c8ce5,Graphics['width']);},Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x2f0)]=function(){const _0x4e1ef7=_0x314eca,_0x56aa09=$gameMessage['choices']()[_0x4e1ef7(0x3ce)](_0x25af4b=>this['convertChoiceMacros'](_0x25af4b))[_0x4e1ef7(0x223)](_0x369381=>this[_0x4e1ef7(0x3ca)](_0x369381));let _0x2bc3d1=Math[_0x4e1ef7(0x38a)](_0x56aa09[_0x4e1ef7(0x428)]/this[_0x4e1ef7(0x384)]());if(!$gameMessage[_0x4e1ef7(0x388)]){if(_0x4e1ef7(0x436)===_0x4e1ef7(0x16b)){const _0x44c4ae=_0x21cbb6['$1']['split'](',')[_0x4e1ef7(0x3ce)](_0xab3b1b=>_0x50909e(_0xab3b1b)||0x0);for(const _0x2b8e72 of _0x44c4ae){if(_0x111f1a[_0x4e1ef7(0x27f)](_0x2b8e72))return![];}return!![];}else{const _0x39985e=$gameMessage[_0x4e1ef7(0x143)]();_0x2bc3d1=Math['ceil'](Math[_0x4e1ef7(0x1aa)](_0x39985e,_0x56aa09[_0x4e1ef7(0x428)])/this[_0x4e1ef7(0x384)]());}}return Math[_0x4e1ef7(0x4f5)](0x1,Math[_0x4e1ef7(0x1aa)](_0x2bc3d1,this[_0x4e1ef7(0x1a3)]()));},Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x1a3)]=function(){const _0x2ac33d=_0x314eca,_0x433251=this[_0x2ac33d(0x373)],_0x44c87a=_0x433251?_0x433251['y']:0x0,_0x329e0c=_0x433251?_0x433251[_0x2ac33d(0x501)]:0x0,_0x581c17=Graphics['boxHeight']/0x2;return _0x44c87a<_0x581c17&&_0x44c87a+_0x329e0c>_0x581c17?0x4:$gameSystem[_0x2ac33d(0x3d7)]();},Window_ChoiceList['prototype'][_0x314eca(0x29c)]=function(){const _0x343379=_0x314eca;let _0x31161b=this[_0x343379(0x1d2)]();for(const _0x5b73e4 of this[_0x343379(0x2cc)]){if(_0x343379(0x478)!=='pUbEN'){const _0x329217=_0x5b73e4[_0x343379(0x1c6)],_0x5efe8b=this[_0x343379(0x196)](_0x329217),_0x2befc3=this[_0x343379(0x455)](_0x329217)[_0x343379(0x367)]+_0x5efe8b,_0x3a61cb=Math[_0x343379(0x38a)](_0x2befc3)+this[_0x343379(0x52d)]()*0x2;_0x31161b=Math[_0x343379(0x4f5)](_0x31161b,_0x3a61cb);}else return this[_0x343379(0x13f)];}return _0x31161b;},Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x1d2)]=function(){const _0x5b7d3b=_0x314eca;let _0x32a755=$gameSystem['getChoiceListMinChoiceWidth']();const _0x43fb55=$gameMessage[_0x5b7d3b(0x403)]();for(const _0x5224f8 of _0x43fb55){_0x5224f8[_0x5b7d3b(0x34e)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x5b7d3b(0x343)!==_0x5b7d3b(0x343)?this[_0x5b7d3b(0x201)][_0x5b7d3b(0x1da)]=!!_0x466c61:_0x32a755=Math['max'](_0x32a755,Number(RegExp['$1'])));}return Math[_0x5b7d3b(0x4f5)](_0x32a755,0x1);},Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x32b)]=function(){const _0x33e02a=_0x314eca,_0x28181a=$gameSystem[_0x33e02a(0x3e6)]()||0x0,_0xade233=this[_0x33e02a(0x373)]['y'],_0x5bd932=this[_0x33e02a(0x373)]['height'],_0x453e21=this['_messageWindow'][_0x33e02a(0x4a2)],_0x56722e=_0x453e21[_0x33e02a(0x30a)]>0x0&&_0x453e21['width']>0x0,_0x4c4ef0=_0x56722e?_0x453e21[_0x33e02a(0x501)]:0x0;if(_0x28181a<0x0&&(this[_0x33e02a(0x373)][_0x33e02a(0x121)]()||this[_0x33e02a(0x373)][_0x33e02a(0x101)]()))this['y']=Math[_0x33e02a(0x4f0)]((Graphics[_0x33e02a(0x14f)]-this[_0x33e02a(0x501)])/0x2);else{if(_0xade233>=Graphics[_0x33e02a(0x14f)]/0x2){if(_0x28181a>=0x0)this['y']-=_0x28181a;else{if(_0x33e02a(0x303)!==_0x33e02a(0x303))return this['processAutoSize'](_0x318989,!![],!![]),this[_0x33e02a(0x24e)](_0x33e02a(0x4cb),0x0),'';else this['y']=Math[_0x33e02a(0x25c)]((_0xade233-this[_0x33e02a(0x501)]-_0x4c4ef0)/0x2);}}else{if('FandS'!==_0x33e02a(0x12d))this[_0x33e02a(0x22e)](_0x1bd8c6,this[_0x33e02a(0x313)](),_0x372feb),this[_0x33e02a(0x53c)]-=0x2;else{if(_0x28181a>=0x0)this['y']+=_0x28181a;else{const _0x1e2615=Graphics['boxHeight']-(_0xade233+_0x5bd932+_0x4c4ef0);this['y']+=Math['floor']((_0x1e2615-this[_0x33e02a(0x501)])/0x2)+_0x4c4ef0;}}}}},Window_ChoiceList['prototype'][_0x314eca(0x243)]=function(_0x447aa3){const _0x31b98c=_0x314eca,_0x2dc6c3=this['requestChoiceForegroundImage'](_0x447aa3);if(_0x2dc6c3){if(_0x31b98c(0x503)===_0x31b98c(0x271))this[_0x31b98c(0x47a)](),this[_0x31b98c(0xf8)](),this[_0x31b98c(0x3c2)](),this[_0x31b98c(0x2ad)]();else{const _0x144398=ImageManager[_0x31b98c(0x171)](_0x2dc6c3),_0x352181=this[_0x31b98c(0x230)](),_0x68f756=_0x352181+this[_0x31b98c(0x4bb)](_0x447aa3),_0x5c6b5c=this[_0x31b98c(0x1e4)](_0x447aa3);_0x144398['addLoadListener'](this[_0x31b98c(0x1a9)][_0x31b98c(0x424)](this,_0x447aa3,!![],_0x68f756,_0x5c6b5c,_0x144398));return;}}this[_0x31b98c(0x387)](_0x447aa3);},Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x387)]=function(_0x2c519c){const _0x23f5c7=_0x314eca,_0x4c9b2b=this['itemRectWithPadding'](_0x2c519c),_0x452800=this[_0x23f5c7(0x230)](),_0x41de4e=_0x452800+this[_0x23f5c7(0x4bb)](_0x2c519c);this[_0x23f5c7(0x1d9)](this[_0x23f5c7(0x235)](_0x2c519c));const _0x2ccc14=this[_0x23f5c7(0x455)](_0x41de4e)[_0x23f5c7(0x501)],_0x5ef16e=_0x4c9b2b['x']+this[_0x23f5c7(0x196)](_0x41de4e),_0x121495=Math[_0x23f5c7(0x4f5)](_0x4c9b2b['y'],_0x4c9b2b['y']+Math['round']((_0x4c9b2b[_0x23f5c7(0x501)]-_0x2ccc14)/0x2));this[_0x23f5c7(0x275)](_0x41de4e,_0x5ef16e,_0x121495,_0x4c9b2b[_0x23f5c7(0x367)]),this[_0x23f5c7(0x312)](_0x2c519c),this[_0x23f5c7(0x368)](_0x2c519c,_0x41de4e,_0x4c9b2b);},Window_ChoiceList[_0x314eca(0x393)]['choiceAlignText']=function(){const _0xd79b1f=_0x314eca;return $gameSystem[_0xd79b1f(0x179)]()!==_0xd79b1f(0x174)?_0xd79b1f(0x3aa)['format']($gameSystem[_0xd79b1f(0x179)]()):'';},Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x196)]=function(_0x42702b){const _0x455880=_0x314eca;let _0x4750ad=0x0;return _0x42702b[_0x455880(0x34e)](/<(?:CHOICE|CHOICE |)INDENT:[ ](\d+)>/gi)&&(_0x4750ad=Number(RegExp['$1'])),_0x4750ad;},Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x312)]=function(_0x2b1c26){const _0x50f582=_0x314eca;if(!Imported['VisuMZ_0_CoreEngine'])return;const _0x511be8=this[_0x50f582(0x4bb)](_0x2b1c26);let _0x5b8592=![],_0x397ca5=![],_0x31ef29=ColorManager[_0x50f582(0x194)](),_0x105d1f=ColorManager[_0x50f582(0x52b)]();if(_0x511be8['match'](/<(?:BGCOLOR|BG COLOR):[ ](.*?),(.*?)>/gi)){if('gKmWM'===_0x50f582(0x32e))_0x31ef29=ColorManager['getColor'](RegExp['$1'])[_0x50f582(0x1ab)](),_0x105d1f=ColorManager[_0x50f582(0x156)](RegExp['$2'])[_0x50f582(0x1ab)](),_0x5b8592=!![];else{const _0x1a30eb=_0x38f241['getLastGainedItemData']();if(_0x1a30eb['id']<0x0)return'';let _0x89e686=null;if(_0x1a30eb[_0x50f582(0x3e2)]===0x0)_0x89e686=_0x331c34[_0x1a30eb['id']];if(_0x1a30eb[_0x50f582(0x3e2)]===0x1)_0x89e686=_0x4197cb[_0x1a30eb['id']];if(_0x1a30eb[_0x50f582(0x3e2)]===0x2)_0x89e686=_0x592c43[_0x1a30eb['id']];if(!_0x89e686)return'';return _0x50f582(0x3a0)[_0x50f582(0x3ff)](_0x89e686['iconIndex']);}}else{if(_0x511be8[_0x50f582(0x34e)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi)){if(_0x50f582(0x215)!==_0x50f582(0x479)){let _0x2c70a2=String(RegExp['$1'])[_0x50f582(0x31c)]()[_0x50f582(0x1ab)]();switch(_0x2c70a2){case _0x50f582(0x1ac):_0x31ef29=_0x105d1f=_0x50f582(0x2de),_0x397ca5=!![];break;case _0x50f582(0x524):_0x31ef29=_0x105d1f=_0x50f582(0x4fc),_0x397ca5=!![];break;case'yellow':_0x31ef29=_0x105d1f=_0x50f582(0x418),_0x397ca5=!![];break;case _0x50f582(0x2c7):_0x31ef29=_0x105d1f=_0x50f582(0x52a),_0x397ca5=!![];break;case _0x50f582(0x450):_0x31ef29=_0x105d1f=_0x50f582(0x188),_0x397ca5=!![];break;case'purple':case'violet':_0x31ef29=_0x105d1f=_0x50f582(0x434),_0x397ca5=!![];break;case _0x50f582(0x3a6):_0x31ef29=_0x105d1f=_0x50f582(0x39e),_0x397ca5=!![];break;case'pink':_0x31ef29=_0x105d1f='#ffc8e0',_0x397ca5=!![];break;case _0x50f582(0x521):_0x31ef29=_0x105d1f='#ffffff',_0x397ca5=!![];break;case _0x50f582(0x116):case _0x50f582(0x40a):_0x31ef29=_0x105d1f=_0x50f582(0x296),_0x397ca5=!![];break;case _0x50f582(0x2ba):_0x31ef29=_0x105d1f='#707070',_0x397ca5=!![];break;case _0x50f582(0x148):_0x31ef29=_0x105d1f=ColorManager[_0x50f582(0x1e8)](),_0x397ca5=!![];break;case'no':_0x31ef29=_0x105d1f=ColorManager[_0x50f582(0x413)](),_0x397ca5=!![];break;case _0x50f582(0x37c):_0x31ef29=_0x105d1f=ColorManager['systemColor'](),_0x397ca5=!![];break;case _0x50f582(0x141):_0x31ef29=_0x105d1f=ColorManager[_0x50f582(0x153)](),_0x397ca5=!![];break;default:_0x31ef29=_0x105d1f=ColorManager[_0x50f582(0x156)](_0x2c70a2),_0x397ca5=!![];break;}_0x5b8592=!![];}else _0x59411b[_0x50f582(0x4ed)](),_0x2ebac1['updateDimensions'](),_0x4ead52[_0x50f582(0x10e)]();}}if(!_0x5b8592)return;const _0x349e95=this[_0x50f582(0x4a7)](_0x2b1c26);this[_0x50f582(0x4e9)][_0x50f582(0x35d)](_0x349e95['x'],_0x349e95['y'],_0x349e95[_0x50f582(0x367)],_0x349e95[_0x50f582(0x501)]),this[_0x50f582(0x54f)](_0x349e95,_0x31ef29,_0x105d1f,_0x397ca5);},Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x54f)]=function(_0x5c1bca,_0xc69e38,_0x1aa907,_0x100c86){const _0x3c2a8c=_0x314eca,_0x4b200e=ColorManager[_0x3c2a8c(0x194)](),_0x5a8818=ColorManager[_0x3c2a8c(0x2e0)](),_0x590f25=_0xc69e38??ColorManager[_0x3c2a8c(0x194)](),_0x3ee6cb=_0x1aa907??_0xc69e38,_0x19a00e=_0x5c1bca['x'],_0x3e6ad9=_0x5c1bca['y'],_0x5679c2=_0x5c1bca[_0x3c2a8c(0x367)],_0xd5a1da=_0x5c1bca[_0x3c2a8c(0x501)];this[_0x3c2a8c(0x4e9)][_0x3c2a8c(0x120)](_0x19a00e,_0x3e6ad9,_0x5679c2,_0xd5a1da,_0x590f25,_0x3ee6cb,!![]),_0x100c86&&this['contentsBack'][_0x3c2a8c(0x120)](_0x19a00e,_0x3e6ad9,_0x5679c2,_0xd5a1da,_0x4b200e,_0x3ee6cb,!![]),this[_0x3c2a8c(0x4e9)][_0x3c2a8c(0x2c9)](_0x19a00e,_0x3e6ad9,_0x5679c2,_0xd5a1da,_0x4b200e);},Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x2b9)]=function(_0x526038){const _0x39612c=_0x314eca,_0x3ba9bf=this[_0x39612c(0x230)](),_0x137a26=_0x3ba9bf+this['commandName'](_0x526038);let _0x13ef48='';if(_0x137a26[_0x39612c(0x34e)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x13ef48=String(RegExp['$1'])[_0x39612c(0x1ab)]();else _0x137a26['match'](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x39612c(0x4e7)===_0x39612c(0x4e7)?_0x13ef48=String(RegExp['$2'])[_0x39612c(0x1ab)]():this[_0x39612c(0x4f9)](_0x284d13,0x1));return _0x13ef48;},Window_ChoiceList['prototype'][_0x314eca(0x368)]=function(_0x4849c4,_0x4b3c8c,_0x2a984c){const _0x5f191d=_0x314eca;let _0xb777b0='';if(_0x4b3c8c['match'](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0xb777b0=String(RegExp['$1'])[_0x5f191d(0x1ab)]();else{if(_0x4b3c8c[_0x5f191d(0x34e)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)){if('EsfRQ'!==_0x5f191d(0x51f)){if(!_0x521c4e||!_0x19d1ac)return-0x1;return _0x468b08[_0x5f191d(0x39a)][_0x5f191d(0x428)]-_0x5ed12f[_0x5f191d(0x39a)][_0x5f191d(0x428)];}else _0xb777b0=String(RegExp['$2'])[_0x5f191d(0x1ab)]();}}if(_0xb777b0){if(_0x5f191d(0x3f2)!=='iiNxq')return this['messageCoreWindowX']();else{const _0x4190da=ImageManager[_0x5f191d(0x171)](_0xb777b0);_0x4190da[_0x5f191d(0xf5)](this[_0x5f191d(0x1a9)][_0x5f191d(0x424)](this,_0x4849c4,![],_0x4b3c8c,_0x2a984c,_0x4190da));}}},Window_ChoiceList['prototype'][_0x314eca(0x1a9)]=function(_0x55c532,_0x5cdb9e,_0x4d122a,_0x57afa8,_0x5dce39){const _0x3f7115=_0x314eca,_0x39424d=this[_0x3f7115(0x230)](),_0x312669=_0x39424d+this['commandName'](_0x55c532);if(_0x4d122a!==_0x312669)return;const _0x254933=this[_0x3f7115(0x1e4)](_0x55c532);if(['x','y',_0x3f7115(0x367),_0x3f7115(0x501)][_0x3f7115(0x276)](_0x279d14=>_0x254933[_0x279d14]!==_0x57afa8[_0x279d14]))return;let _0x49b89b=0x0,_0x2f76a0='';if(_0x5cdb9e&&_0x312669['match'](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i)){}else{if(_0x5cdb9e&&_0x312669[_0x3f7115(0x34e)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i))_0x2f76a0=String(RegExp['$1'])[_0x3f7115(0x31c)]()[_0x3f7115(0x1ab)]();else!_0x5cdb9e&&_0x312669['match'](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x2f76a0=String(RegExp['$1'])[_0x3f7115(0x31c)]()[_0x3f7115(0x1ab)]());}switch(_0x2f76a0){case _0x3f7115(0x36e):case _0x3f7115(0x3cd):case'lower\x20left':case _0x3f7115(0x496):case'down-left':case _0x3f7115(0x178):case'1':_0x49b89b=0x1;break;case _0x3f7115(0x386):case _0x3f7115(0x197):case _0x3f7115(0xf4):case _0x3f7115(0x3bf):case _0x3f7115(0x44b):case _0x3f7115(0x515):case _0x3f7115(0x498):case'2':_0x49b89b=0x2;break;case _0x3f7115(0x51e):case _0x3f7115(0x309):case _0x3f7115(0x20b):case _0x3f7115(0x10b):case _0x3f7115(0x4f8):case _0x3f7115(0x1d0):case'3':_0x49b89b=0x3;break;case _0x3f7115(0x21c):case _0x3f7115(0x391):case _0x3f7115(0x3a1):case'4':_0x49b89b=0x4;break;case _0x3f7115(0x124):case _0x3f7115(0x37f):case _0x3f7115(0x397):case'centered':case'5':_0x49b89b=0x5;break;case _0x3f7115(0x260):case _0x3f7115(0x49f):case'right':case'6':_0x49b89b=0x6;break;case _0x3f7115(0x48d):case _0x3f7115(0x25e):case _0x3f7115(0x45e):case _0x3f7115(0x191):case'up-left':case _0x3f7115(0x2dd):case'7':_0x49b89b=0x7;break;case _0x3f7115(0x204):case _0x3f7115(0x492):case _0x3f7115(0x1bf):case _0x3f7115(0x540):case _0x3f7115(0x3ab):case'up\x20center':case'up':case'8':_0x49b89b=0x8;break;case'upperright':case _0x3f7115(0x228):case'upper\x20right':case _0x3f7115(0x2b5):case'up-right':case _0x3f7115(0x3d9):case'9':_0x49b89b=0x9;break;}const _0x27db0d=_0x5cdb9e?this['contents']:this[_0x3f7115(0x4e9)],_0xa77081=this[_0x3f7115(0x4a7)](_0x55c532);!_0x5cdb9e&&_0x27db0d[_0x3f7115(0x35d)](_0xa77081['x']-0x1,_0xa77081['y']-0x1,_0xa77081[_0x3f7115(0x367)]+0x2,_0xa77081[_0x3f7115(0x501)]+0x2);const _0xbe7347=_0xa77081['x']+0x2,_0x4f0d8c=_0xa77081['y']+0x2,_0x3513c4=_0xa77081['width']-0x4,_0x3c28af=_0xa77081[_0x3f7115(0x501)]-0x4,_0x54cb74=_0x5dce39[_0x3f7115(0x367)],_0x39ab08=_0x5dce39[_0x3f7115(0x501)];let _0x1dd055=_0xbe7347,_0x3cc08a=_0x4f0d8c,_0x2ba912=_0x3513c4,_0x1797fa=_0x3c28af;const _0x41a07c=_0x3513c4/_0x54cb74,_0x60c6c4=_0x3c28af/_0x39ab08;let _0x2a20f5=Math[_0x3f7115(0x1aa)](_0x41a07c,_0x60c6c4);if(_0x5cdb9e)_0x2a20f5=Math['min'](_0x2a20f5,0x1);_0x49b89b!==0x0&&(_0x2ba912=Math[_0x3f7115(0x4f0)](_0x54cb74*_0x2a20f5),_0x1797fa=Math[_0x3f7115(0x4f0)](_0x39ab08*_0x2a20f5));switch(_0x49b89b){case 0x1:case 0x4:case 0x7:_0x1dd055=_0xbe7347;break;case 0x2:case 0x5:case 0x8:_0x1dd055+=Math['round']((_0x3513c4-_0x2ba912)/0x2);break;case 0x3:case 0x6:case 0x9:_0x1dd055+=_0x3513c4-_0x2ba912;break;}switch(_0x49b89b){case 0x7:case 0x8:case 0x9:_0x3cc08a=_0x4f0d8c;break;case 0x4:case 0x5:case 0x6:_0x3cc08a+=Math[_0x3f7115(0x4f0)]((_0x3c28af-_0x1797fa)/0x2);break;case 0x1:case 0x2:case 0x3:_0x3cc08a+=_0x3c28af-_0x1797fa;break;}_0x27db0d[_0x3f7115(0x31d)](_0x5dce39,0x0,0x0,_0x54cb74,_0x39ab08,_0x1dd055,_0x3cc08a,_0x2ba912,_0x1797fa),_0x5cdb9e&&this['drawItemContents'](_0x55c532);},Window_ChoiceList[_0x314eca(0x393)][_0x314eca(0x37a)]=function(){const _0x372cfb=_0x314eca;this[_0x372cfb(0x11b)][_0x372cfb(0x1eb)]();if(!this['_choiceHelpDescriptions'])return;const _0x3ab594=this[_0x372cfb(0x499)]();this[_0x372cfb(0x459)][_0x3ab594]?_0x372cfb(0x3fe)==='hJPgi'?(this[_0x372cfb(0x11b)][_0x372cfb(0x3c9)](this[_0x372cfb(0x459)][_0x3ab594]),this[_0x372cfb(0x11b)][_0x372cfb(0x3f1)]()):(this['_itemChoiceVariableId']=_0x3e5e90,this[_0x372cfb(0x1d1)]=_0x372cfb(0x20f),this[_0x372cfb(0x109)]=_0x1edc5b,this['_itemChoiceEtypeId']=0x0):(this[_0x372cfb(0x11b)]['clear'](),this['_helpWindow']['hide']());},Window_EventItem[_0x314eca(0x393)][_0x314eca(0xf7)]=function(){const _0x5c9e72=_0x314eca,_0x286849=$gameMessage[_0x5c9e72(0x31e)]();_0x286849==='skill'&&Imported[_0x5c9e72(0x482)]?this[_0x5c9e72(0x414)]():Window_ItemList['prototype']['makeItemList'][_0x5c9e72(0x37e)](this);},Window_EventItem[_0x314eca(0x393)][_0x314eca(0x414)]=function(){const _0x569412=_0x314eca,_0x4f6205=$gameMessage['itemChoiceActor']();this[_0x569412(0x1a6)]=_0x4f6205?_0x4f6205[_0x569412(0x240)]()[_0x569412(0x223)](_0x332621=>this[_0x569412(0x321)](_0x332621)):[];if(this[_0x569412(0x321)](null)){if(_0x569412(0x320)===_0x569412(0x320))this[_0x569412(0x1a6)][_0x569412(0x4bd)](null);else return _0x2bc0f2[_0x569412(0x508)](this[_0x569412(0x3c5)]())||_0x23036c[_0x569412(0x46c)]()||null;}},VisuMZ['MessageCore']['Window_EventItem_includes']=Window_EventItem[_0x314eca(0x393)]['includes'],Window_EventItem[_0x314eca(0x393)]['includes']=function(_0x4948a3){const _0x57e5f3=_0x314eca,_0x475cb3=$gameMessage['itemChoiceItypeId']();if(_0x475cb3===_0x57e5f3(0x20f)){if(!DataManager['isWeapon'](_0x4948a3))return![];const _0x204f49=$gameMessage[_0x57e5f3(0x261)]();if(_0x204f49>0x0){if(_0x4948a3[_0x57e5f3(0x497)]!==_0x204f49)return![];}return!![];}else{if(_0x475cb3==='armor'){if(!DataManager[_0x57e5f3(0x41e)](_0x4948a3))return![];const _0x5669ed=$gameMessage[_0x57e5f3(0x300)]();if(_0x5669ed>0x0){if(_0x57e5f3(0x36d)===_0x57e5f3(0x265)){if(!this[_0x57e5f3(0x13c)]())return _0x5c2e5e;return _0x431a78=_0x50d5cf(_0xb88c04)['replace'](/\$(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x3eb259,_0x22c56c)=>this[_0x57e5f3(0x527)](_0x250389(_0x22c56c))),_0x41225d=_0x4aee73(_0x34d736)['replace'](/\\(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x14db20,_0x5a53b1)=>this[_0x57e5f3(0x527)](_0x1adb97(_0x5a53b1))),_0x4704be=_0x1316de(_0x22c7da)['replace'](/\x1b(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x24996e,_0xf15c52)=>this['getLocalizedText'](_0x7b7203(_0xf15c52))),_0x42b3c2;}else{if(_0x4948a3['atypeId']!==_0x5669ed)return![];}}const _0x538ec0=$gameMessage['itemChoiceEtypeId']();if(_0x538ec0>0x0){if(_0x57e5f3(0x1d3)===_0x57e5f3(0x221))!_0x248f7f[_0x57e5f3(0x44c)]?this['_messageCommonEvents'][_0x57e5f3(0x41f)](_0x53dcb8):_0x4a2eef['update']();else{if(_0x4948a3[_0x57e5f3(0x283)]!==_0x538ec0)return![];}}return!![];}else{if(_0x475cb3===_0x57e5f3(0x299)){if(_0x57e5f3(0x15a)!=='MJStF'){_0x145e7f[_0x57e5f3(0x17a)][_0x57e5f3(0xfa)]&&_0x1699fe[_0x57e5f3(0x13c)]()&&_0xaf5422++;if(_0xbde069[_0x57e5f3(0x3eb)][_0x57e5f3(0xfa)])_0x346043++;}else{if(!DataManager[_0x57e5f3(0x111)](_0x4948a3))return![];const _0x3940de=$gameMessage['itemChoiceActor']();if(_0x3940de['isSkillHidden'](_0x4948a3))return![];if(!_0x3940de[_0x57e5f3(0x3a3)](_0x4948a3))return![];const _0x2bc588=$gameMessage[_0x57e5f3(0x4b7)]();if(_0x2bc588>0x0){const _0xcaf711=DataManager[_0x57e5f3(0x406)](_0x4948a3);if(!_0xcaf711['includes'](_0x2bc588))return![];}return!![];}}else return'AWJhI'!==_0x57e5f3(0x358)?VisuMZ[_0x57e5f3(0x19b)][_0x57e5f3(0x22b)]['call'](this,_0x4948a3):(_0x3005bf=_0x42027c[_0x57e5f3(0x1e5)](/<COLORLOCK>/gi,'\x1bCOLORLOCK[1]'),_0x552889=_0x35c5e7[_0x57e5f3(0x1e5)](/<\/COLORLOCK>/gi,'\x1bCOLORLOCK[0]'),_0x216fcd=_0xaf5e55[_0x57e5f3(0x1e5)](/\(\(\(/gi,_0x57e5f3(0x17e)),_0xac6129=_0x46f0cd[_0x57e5f3(0x1e5)](/\)\)\)/gi,_0x57e5f3(0x1c7)),_0x2eebc7);}}},VisuMZ[_0x314eca(0x19b)][_0x314eca(0x29f)]=Window_ItemList[_0x314eca(0x393)][_0x314eca(0x1bb)],Window_ItemList[_0x314eca(0x393)]['drawItemNumber']=function(_0x3d6d44,_0x25726d,_0x54c4cb,_0x1ad90e){const _0x427504=_0x314eca,_0x4b8008=$gameMessage[_0x427504(0x31e)]();if(_0x4b8008==='skill'){const _0x50ed9a=$gameMessage[_0x427504(0x474)]();this[_0x427504(0x212)](_0x50ed9a,_0x3d6d44,_0x25726d,_0x54c4cb,_0x1ad90e);}else VisuMZ['MessageCore']['Window_ItemList_drawItemNumber'][_0x427504(0x37e)](this,_0x3d6d44,_0x25726d,_0x54c4cb,_0x1ad90e);};