/*:
@target MZ
@author Coelocanth
@plugindesc TPB Predictor Window
(Version 1.0)
@help

This plugin adds a window to the battle scene, showing the expected
turn order.

The following note tags may be used in actors and enemies database entries
in order to customize the appearance of the predictor window.

By default, actors use their current face, and enemies use their battler
graphic.
If you use animated enemy battlers, I recommend creating facesets for your
enemies.

<tpb_predictor_face:file>       - Use this faceset graphic from img/faces
<tpb_predictor_face_index:n>    - Use this face (0-7) from the faceset
                                  graphic
<tpb_predictor_battler:file>    - Use this static battler graphic from
                                  img/enemies or img/sv_enemies
<tpb_predictor_icon:n>          - Use this icon from the icon set.
<tpb_predictor_picture:file>    - Use this graphic from img/pictures

These tags are used with battler and picture settings to pick a specific
part of the image to use. Otherwise the top part of the image is used while
preserving aspect ratio.
<tpb_predictor_center:x,y>      - Use a rectangle centered on this point in
                                  a larger image
<tpb_predictor_rect:x,y,w,h>    - Use a rectangle with the top left at x,y
                                  and width, height as specified.

Compatibility Notes:
If you have other plugins modifying the visual layout of the battle screen,
you should probably use custom placement of the window exactly where you
want it.

If you are using a battle system that radically changes the flow of turns in
battle, the turn order prediction will likely not work without making a
compatibility plugin.
The function Game_Battler.prototype.tpbTicksUntilCharged could be overridden
to return a number based on the other battle system. Lower numbers are
expected to have their turn earlier.

@param position
@text Window Position
@desc Placement of the predictor window
@type select
@option top left
@value start
@option bottom or right
@value end
@option custom
@value custom
@default start

@param position_x
@text X (custom)
@desc position on screen
@parent position
@type number
@default 0

@param position_y
@text Y (custom)
@desc position on screen
@parent position
@type number
@default 0

@param max_battlers
@text Max battlers
@desc number of battlers to show in the action queue (0=auto)
@type number
@default 0

@param size
@text Battler image size
@desc size of each image in the predictor window
@default half_face_66
@type select
@option Full face (144x144)
@value full_face
@option Half face (144x72)
@value half_face
@option Full face 2/3 (96x96)
@value full_face_66
@option Half face 2/3 (96x48)
@value half_face_66
@option Full face 1/2 (72x72)
@value full_face_50
@option Half face 1/2 (72x36)
@value half_face_50
@option Full face 1/3 (48x48)
@value full_face_33
@option Half face 1/3 (48x24)
@value half_face_33
@option Icon (32x32)
@value icon
@option custom
@value custom

@param size_custom_width
@parent size
@text Width (custom)
@desc custom size in pixels
@default 144

@param size_custom_height
@parent size
@text Height (custom)
@desc custom size in pixels
@default 72

@param layout
@text Layout
@type select
@default vertical
@option horizontal
@value horizontal
@option vertical
@value vertical

@param background_color
@text Background color
@desc The color to fill behind actor / enemy graphics
(windowskin color, or html "#rrggbb" / "rgba(r,g,b,a)")
@default 19

@param background_opacity
@text Background opacity
@desc 0 (transparent) - 255 (opaque)
@type number
@default 72
@min 0
@max 255

@param acting_first
@text Acting battler stays first
@desc When true, the acting battler moves to the end of the
queue after completing their action
@type boolean
@default true

@param target_indicator
@text Target indicator
@desc Whether to display an icon on battlers in the queue when being targeted
@type boolean
@default true

@param target_indicator_icon
@parent target_indicator
@text Icon
@desc Icon ID
@type number
@default 129

@param target_indicator_position
@parent target_indicator
@text Position
@desc Placement of an icon 
'auto' will pick the position based on layout
@default auto
@type select
@choice auto
@value auto
@choice top
@value top
@choice left
@value left
@choice right
@value right
@choice bottom
@value bottom
@choice center
@value center
@choice custom
@value custom

@param target_indicator_x
@parent target_indicator_position
@text X (custom)
@desc pixel position of top left of icon relative to top left of image
@type number
@default 0

@param target_indicator_y
@parent target_indicator_position
@text Y (custom)
@desc pixel position of top left of icon relative to top left of image
@type number
@default 0


@param use_gauges
@text TPB gauge overlay
@desc Show TPB gauges as an overlay on each battler in the turn order window
@type boolean
@default true

@param cast_color_1
@parent use_gauges
@text Casting color 1
@desc first color of gradient for casting bar
(windowskin color, or html "#rrggbb" / "rgba(r,g,b,a)")
@default 6

@param cast_color_2
@parent use_gauges
@text Casting color 2
@desc first color of gradient for casting bar
(windowskin color, or html "#rrggbb" / "rgba(r,g,b,a)")
@default 14

@param charge_color_1
@parent use_gauges
@text Charging color 1
@desc first color of gradient for charging bar
(windowskin color, or html "#rrggbb" / "rgba(r,g,b,a)")
@default 26

@param charge_color_2
@parent use_gauges
@text Charging color 2
@desc first color of gradient for charging bar
(windowskin color, or html "#rrggbb" / "rgba(r,g,b,a)")
@default 27

@param gauge_opacity
@parent use_gauges
@text Gauge opacity
@desc 0 (transparent) - 255 (opaque)
@type number
@default 96
@min 0
@max 255
*/
var CC = CC || {};
CC.TPBPredictor = {};
CC.TPBPredictor.Config = {};
(() => {
    const params = PluginManager.parameters("CC_TPBPredictor");
    CC.TPBPredictor.Config.position = params.position || "end";
    CC.TPBPredictor.Config.position_x = parseInt(params.position_x || "0");
    CC.TPBPredictor.Config.position_y = parseInt(params.position_y || "0");
    CC.TPBPredictor.Config.max_battlers = parseInt(params.max_battlers || "0");
    switch (params["size"]) {
        case "full_face":
            CC.TPBPredictor.Config.itemWidth = ImageManager.faceWidth;
            CC.TPBPredictor.Config.itemHeight = ImageManager.faceHeight;
            break;
        case "half_face":
        default:
            CC.TPBPredictor.Config.itemWidth = ImageManager.faceWidth;
            CC.TPBPredictor.Config.itemHeight = Math.floor(ImageManager.faceHeight / 2);
            break;
        case "full_face_66":
            CC.TPBPredictor.Config.itemWidth = Math.floor(ImageManager.faceWidth * 2 / 3);
            CC.TPBPredictor.Config.itemHeight = Math.floor(ImageManager.faceHeight * 2 / 3);
            break;
        case "half_face_66":
            CC.TPBPredictor.Config.itemWidth = Math.floor(ImageManager.faceWidth * 2 / 3);
            CC.TPBPredictor.Config.itemHeight = Math.floor(ImageManager.faceHeight / 3);
            break;
        case "full_face_50":
            CC.TPBPredictor.Config.itemWidth = Math.floor(ImageManager.faceWidth / 2);
            CC.TPBPredictor.Config.itemHeight = Math.floor(ImageManager.faceHeight / 2);
            break;
        case "half_face_50":
            CC.TPBPredictor.Config.itemWidth = Math.floor(ImageManager.faceWidth / 2);
            CC.TPBPredictor.Config.itemHeight = Math.floor(ImageManager.faceHeight / 4);
            break;
        case "full_face_33":
            CC.TPBPredictor.Config.itemWidth = Math.floor(ImageManager.faceWidth / 3);
            CC.TPBPredictor.Config.itemHeight = Math.floor(ImageManager.faceHeight / 3);
            break;
        case "half_face_33":
            CC.TPBPredictor.Config.itemWidth = Math.floor(ImageManager.faceWidth / 3);
            CC.TPBPredictor.Config.itemHeight = Math.floor(ImageManager.faceHeight / 6);
            break;
        case "icon":
            CC.TPBPredictor.Config.itemWidth = ImageManager.iconWidth;
            CC.TPBPredictor.Config.itemHeight = ImageManager.iconHeight;
            break;
        case "custom":
            CC.TPBPredictor.Config.itemWidth = parseInt(size_custom_width);
            CC.TPBPredictor.Config.itemHeight = parseInt(size_custom_height);
            break;
    }
    CC.TPBPredictor.parseColor = function (text) {
        if (/^\s*\d+\s*$/.test(text)) {
            return ColorManager.textColor(parseInt(text));
        }
        return text;
    }

    CC.TPBPredictor.Config.layout_horizontal = (params["layout"] === "horizontal");

    CC.TPBPredictor.Config.use_gauges = (params["use_gauges"] !== "false");
    CC.TPBPredictor.Config.background_color = params["background_color"] || "19";
    CC.TPBPredictor.Config.background_opacity = parseInt(params["background_opacity"] || "96");
    CC.TPBPredictor.Config.gauge_cast_colors = [params["cast_color_1"] || "6", params["cast_color_2"] || "14"];
    CC.TPBPredictor.Config.gauge_charge_colors = [params["charge_color_1"] || "6", params["charge_color_2"] || "14"];
    CC.TPBPredictor.Config.gauge_opacity = parseInt(params["gauge_opacity"] || "72");

    CC.TPBPredictor.Config.acting_first = (params["acting_first"] === "true");

    CC.TPBPredictor.Config.target_indicator = (params["target_indicator"] !== "false");
    CC.TPBPredictor.Config.target_indicator_icon = parseInt(params["target_indicator_icon"]);
    CC.TPBPredictor.Config.target_indicator_x = parseInt(params["target_indicator_x"]);
    CC.TPBPredictor.Config.target_indicator_y = parseInt(params["target_indicator_y"]);
    let position = params["target_indicator_position"];
    if(position === "auto") {
        if(CC.TPBPredictor.Config.layout_horizontal) {
            position = (CC.TPBPredictor.Config.position === "end" ? "top" : "bottom");
        } else {
            position = (CC.TPBPredictor.Config.position === "end" ? "left" : "right");
        }
    }
    switch(position) {
        case "top":
            CC.TPBPredictor.Config.target_indicator_x = Math.floor((CC.TPBPredictor.Config.itemWidth - ImageManager.iconWidth) / 2);
            CC.TPBPredictor.Config.target_indicator_y = 0;
            break;
        case "bottom":
            CC.TPBPredictor.Config.target_indicator_x = Math.floor((CC.TPBPredictor.Config.itemWidth - ImageManager.iconWidth) / 2);
            CC.TPBPredictor.Config.target_indicator_y = CC.TPBPredictor.Config.itemHeight - ImageManager.iconHeight;
            break;
        case "left":
            CC.TPBPredictor.Config.target_indicator_x = 0;
            CC.TPBPredictor.Config.target_indicator_y = Math.floor((CC.TPBPredictor.Config.itemHeight - ImageManager.iconHeight) / 2);
            break;
        case "right":
            CC.TPBPredictor.Config.target_indicator_x = CC.TPBPredictor.Config.itemWidth - ImageManager.iconWidth;
            CC.TPBPredictor.Config.target_indicator_y = Math.floor((CC.TPBPredictor.Config.itemHeight - ImageManager.iconHeight) / 2);
            break;
        case "center":
            CC.TPBPredictor.Config.target_indicator_x = Math.floor((CC.TPBPredictor.Config.itemWidth - ImageManager.iconWidth) / 2);
            CC.TPBPredictor.Config.target_indicator_y = Math.floor((CC.TPBPredictor.Config.itemHeight - ImageManager.iconHeight) / 2);
            break;
    }
})();

BattleManager.predictedTpbOrder = function () {
    battlers = this.allBattleMembers().filter(a => a.canMove());
    battlers.sort((a, b) => a.tpbTicksUntilCharged() - b.tpbTicksUntilCharged());
    return battlers;
}

Game_Battler.prototype.tpbTicksUntilCharged = function () {
    let ticks = (1 - this._tpbChargeTime) / this.tpbAcceleration();
    if (this._tpbState === "acting") {
        if(CC.TPBPredictor.Config.acting_first) {
            ticks = -1000;
        } else {
            ticks = 1 / this.tpbAcceleration();
        }
    }
    if (this._tpbState === "casting") {
        ticks = (this.tpbRequiredCastTime() - this._tpbCastTime) / this.tpbAcceleration();
    }
    if (!this.canMove()) {
        ticks += 1000;
    }
    return ticks;
}

class Window_BattleTpbOrder extends Window_Selectable {
    constructor(rect) {
        super(rect);
        this.padding = 0;
        this.margin = 0;
        this.opacity = 0;
        this.createContents(); // recreate after adjusting padding/margins

        this._data = [];
        this._selectionData = [];
        this._needRefresh = true;
        this.createGauges();
    }
    createGauges() {
        this._gauges = new Map();
        if (!CC.TPBPredictor.Config.use_gauges) {
            return;
        }
        for (const battler of BattleManager.allBattleMembers()) {
            let gauge = new Sprite_TpbOrderGauge();
            gauge.setup(battler, "time");
            this._gauges.set(this.gaugeKey(battler), gauge);
            this.addChild(gauge);
        }
    }
    gaugeKey(battler) {
        return battler;
    }
    update() {
        const battlers = BattleManager.predictedTpbOrder();
        if (!battlers.equals(this._data) ||
            !battlers.map(x => x.isSelected()).equals(this._data.map(x => x.isSelected()))) {
            this._needRefresh = true;
            this._data = battlers;
        }
        if(CC.TPBPredictor.Config.target_indicator) {
            const selectionData = battlers.map(x => x.isSelected());
            if(!selectionData.equals(this._selectionData)) {
                this._needRefresh = true;
                this._selectionData = selectionData;
            }
        }
        if (this._needRefresh) {
            this._needRefresh = false;
            this.refresh();
        }
        this.updateGauges();
    }
    updateGauges() {
        if (!CC.TPBPredictor.Config.use_gauges) {
            return;
        }
        for (const g of this._gauges.values()) {
            g.visible = false;
        }
        const topIndex = this.topIndex();
        for (let i = 0; i < this.maxVisibleItems(); i++) {
            const index = topIndex + i;
            if (index < this.maxItems()) {
                const k = this.gaugeKey(this._data[index]);
                const g = this._gauges.get(k);
                if (g) {
                    const rect = this.itemRect(index);
                    g.x = rect.x;
                    g.y = rect.y + rect.height - g.height;
                    if (g.y < this.innerHeight) {
                        g.visible = true;
                        g.update();
                    }
                }
            }
        }
    }
    drawBackgroundRect(rect) {
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        this.contentsBack.paintOpacity = CC.TPBPredictor.Config.background_opacity;
        this.contentsBack.fillRect(x, y, w, h, CC.TPBPredictor.parseColor(CC.TPBPredictor.Config.background_color));
        this.contentsBack.paintOpacity = 255;
        this.contentsBack.strokeRect(x, y, w, h);
    }
    drawItem(i) {
        const itemRect = this.itemRect(i);
        const battler = this._data[i];
        if (!battler) return;
        if (battler.isActor()) {
            this.drawActor(battler, itemRect);
        } else if (battler.isEnemy()) {
            this.drawEnemy(battler, itemRect);
        }
        if (battler.isSelected()) {
            super.drawIcon(CC.TPBPredictor.Config.target_indicator_icon,
                CC.TPBPredictor.Config.target_indicator_x + itemRect.x,
                CC.TPBPredictor.Config.target_indicator_y + itemRect.y);
        }
    }
    drawActor(actor, itemRect) {
        const meta = actor.actor().meta;
        if (this.drawMeta(meta, itemRect)) return;
        this.drawFace(actor.faceName(), actor.faceIndex(), meta, itemRect);
    }
    drawEnemy(enemy, itemRect) {
        const meta = enemy.enemy().meta;
        if (this.drawMeta(meta, itemRect)) return;
        this.drawBattler(enemy.battlerName(), meta, itemRect);
    }
    drawMeta(meta, itemRect) {
        if (meta.tpb_predictor_face !== undefined) {
            this.drawFace(meta.tpb_predictor_face.trim(), parseInt(meta.tpb_predictor_face_index || "0"), meta, itemRect)
            return true;
        }
        if (meta.tpb_predictor_battler !== undefined) {
            this.drawBattler(meta.tpb_predictor_battler.trim(), meta, itemRect);
            return true;
        }
        if (meta.tpb_predictor_icon !== undefined) {
            this.drawIcon(parseInt(meta.tpb_predictor_icon), meta, itemRect);
            return true;
        }
        if (meta.tpb_predictor_picture !== undefined) {
            this.drawPicture(meta.tpb_predictor_picture.trim(), meta, itemRect);
            return true;
        }
        return false;
    }
    drawFace(faceName, faceIndex, meta, itemRect) {
        const bitmap = ImageManager.loadFace(faceName);
        if (!bitmap.isReady()) {
            this._needRefresh = true;
            return;
        }
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        // source rectangle
        let sw = pw;
        let sh = ph;
        const aspect = itemRect.width / itemRect.height;
        if (aspect > 1) {
            sh = ph / aspect;
        } else if (aspect < 1) {
            sw = pw * aspect;
        }
        let sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
        let sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
        // destination rectangle
        const dx = itemRect.x;
        const dy = itemRect.y;
        const dw = itemRect.width;
        const dh = itemRect.height;

        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
    }
    drawBattler(name, meta, itemRect) {
        let bitmap = null;
        if ($gameSystem.isSideView()) {
            bitmap = ImageManager.loadSvEnemy(name);
        } else {
            bitmap = ImageManager.loadEnemy(name);
        }
        this.drawBitmap(bitmap, meta, itemRect);
    }
    drawPicture(name, meta, itemRect) {
        const bitmap = ImageManager.loadPicture(name);
        this.drawBitmap(bitmap, meta, itemRect);
    }
    drawIcon(iconIndex, meta, itemRect) {
        const bitmap = ImageManager.loadSystem("IconSet");
        const sw = ImageManager.iconWidth;
        const sh = ImageManager.iconHeight;
        const sx = (iconIndex % 16) * sw;
        const sy = Math.floor(iconIndex / 16) * sh;
        // preserve aspect, center icon if destination not square
        const dl = itemRect.width < itemRect.height ? itemRect.width : itemRect.height;
        const aspect = itemRect.x / itemRect.y;
        let dx = itemRect.x + Math.floor((itemRect.width - dl) / 2);
        let dy = itemRect.y + Math.floor((itemRect.height - dl) / 2)
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dl, dl);
    }

    // a generic untiled bitmap
    drawBitmap(bitmap, meta, itemRect) {
        if (!bitmap || !bitmap.isReady()) {
            this._needRefresh = true;
            return;
        }
        let sx = 0;
        let sy = 0;
        let sw = 0;
        let sh = 0;
        if (meta.tpb_predictor_rect !== undefined) {
            let parts = meta.tpb_predictor_rect.split(',');
            if (parts.length != 4) {
                console.warn("tpb_predictor_rect should have 4 values");
                return;
            }
            sx = parseInt(parts[0]);
            sy = parseInt(parts[1]);
            sw = parseInt(parts[2]);
            sh = parseInt(parts[3]);
        } else if (meta.tpb_predictor_center !== undefined) {
            let parts = meta.tpb_predictor_center.split(',');
            if (parts.length != 2) {
                console.warn("tpb_predictor_center should have 2 values");
                return;
            }
            sx = parseInt(parts[0]) - Math.floor(itemRect.width / 2);
            sy = parseInt(parts[1]) - Math.floor(itemRect.height / 2);
            sw = itemRect.width;
            sh = itemRect.height;
        } else {
            // take top of image, trying to preserve aspect ratio (if lucky, the head is included)
            const aspect = itemRect.height / itemRect.width;
            const sl = (bitmap.width > bitmap.height) ? bitmap.height : bitmap.width;
            sx = (bitmap.width > bitmap.height) ? 0 : Math.floor((bitmap.height - bitmap.width) / 2);
            sy = (bitmap.height > bitmap.width) ? 0 : Math.floor((bitmap.width - bitmap.height) / 2);
            sw = sl;
            sh = Math.round(sl * aspect);

        }
        this.contents.blt(bitmap, sx, sy, sw, sh,
            itemRect.x, itemRect.y, itemRect.width, itemRect.height);
    }
    colSpacing() { return 0; }
    rowSpacing() { return 0; }
    itemHeight() { return CC.TPBPredictor.Config.itemHeight; }
    itemWidth() { return CC.TPBPredictor.Config.itemWidth; }
    maxItems() { return this._data ? this._data.length : 0; }
    maxRows() {
        if (!CC.TPBPredictor.Config.layout_horizontal) {
            return super.maxRows();
        }
        return 1;
    }
    maxCols() {
        if (!CC.TPBPredictor.Config.layout_horizontal) {
            return super.maxCols();
        }
        return Math.max(Math.ceil(this.maxItems() / this.maxRows()), 1);
    }
}

class Sprite_TpbOrderGauge extends Sprite_Gauge {
    constructor() {
        super();
        this.opacity = CC.TPBPredictor.Config.gauge_opacity;
    }
    gaugeHeight() { return this.bitmapHeight(); }
    bitmapWidth() { return CC.TPBPredictor.Config.itemWidth; }
    bitmapHeight() { return CC.TPBPredictor.Config.itemHeight; }
    gaugeColor1() {
        if (this._battler && this._battler._tpbState == "casting") {
            return CC.TPBPredictor.parseColor(CC.TPBPredictor.Config.gauge_cast_colors[0]);
        }
        return CC.TPBPredictor.parseColor(CC.TPBPredictor.Config.gauge_charge_colors[0]);
    }
    gaugeColor2() {
        if (CC.TPBPredictor._battler && this._battler._tpbState == "casting") {
            return CC.TPBPredictor.parseColor(CC.TPBPredictor.Config.gauge_cast_colors[1]);
        }
        return CC.TPBPredictor.parseColor(CC.TPBPredictor.Config.gauge_charge_colors[1]);
    }
    currentValue() {
        if (this._battler && this._battler._tpbState == "casting") {
            return this._battler._tpbCastTime;
        }
        return super.currentValue();
    }
    drawGaugeRect = function (x, y, width, height) {
        const rate = this.gaugeRate();
        const fillW = Math.floor((width - 2) * rate);
        const fillH = height - 2;
        const color0 = this.gaugeBackColor();
        const color1 = this.gaugeColor1();
        const color2 = this.gaugeColor2();
        this.bitmap.clearRect(x, y, width, height);
        this.bitmap.gradientFillRect(x + 1, y + 1, fillW, fillH, color1, color2);
        this.bitmap.strokeRect(x, y, width, height, color0);
    };
}

CC.TPBPredictor.Scene_Battle = {};
CC.TPBPredictor.Scene_Battle.createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function () {
    CC.TPBPredictor.Scene_Battle.createAllWindows.call(this);
    this.createTpbOrderWindow();
}

Scene_Battle.prototype.createTpbOrderWindow = function () {
    const rect = this.tpbOrderWindowRect();
    this._tpbOrderWindow = new Window_BattleTpbOrder(rect);
    this.addWindow(this._tpbOrderWindow);
}

Scene_Battle.prototype.tpbOrderWindowRect = function () {
    const spacing = 4; // between and around windows - hardcoded all over base code
    let width = CC.TPBPredictor.Config.itemWidth;
    let height = CC.TPBPredictor.Config.itemHeight;
    let x = 0;
    let y = 0;
    if (CC.TPBPredictor.Config.position === "custom") {
        x = CC.TPBPredictor.Config.position_x;
        y = CC.TPBPredictor.Config.position_y;
    } else if (CC.TPBPredictor.Config.position === "start") {
        x = spacing;
        y = this._helpWindow.y + this._helpWindow.height + spacing;
    } else if (CC.TPBPredictor.Config.layout_horizontal) {
        // lower left, horizontal
        x = spacing
        y = this._statusWindow.y - height - spacing;
    } else {
        // upper right, vertical
        x = Graphics.boxWidth - width - spacing;
        y = this._helpWindow.y + this._helpWindow.height + spacing;
    }
    if (CC.TPBPredictor.Config.layout_horizontal) {
        const iw = width;
        width = CC.TPBPredictor.Config.max_battlers * iw;
        if (!width) {
            let x2 = (ConfigManager.touchUI ? Graphics.boxWidth - 48 : Graphics.boxWidth) - spacing;
            width = Math.floor((x2 - x) / iw) * iw;
        }
    } else {
        const ih = height;
        height = CC.TPBPredictor.Config.max_battlers * ih;
        if (!height) {
            // set height to avoid overlapping status window
            let y2 = this._statusWindow.y - 16;
            height = Math.floor((y2 - y) / ih) * ih;
        }
    }
    // don't overlap the touch cancel button
    if (ConfigManager.touchUI && !CC.TPBPredictor.Config.layout_horizontal && CC.TPBPredictor.Config.position === "end") {
        y += 48;
    }
    return new Rectangle(x, y, width, height);
}

CC.TPBPredictor.Scene_Battle.updateVisibility = Scene_Battle.prototype.updateVisibility;
Scene_Battle.prototype.updateVisibility = function () {
    CC.TPBPredictor.Scene_Battle.updateVisibility.call(this);
    this.updateTpbOrderWindowVisibility();
}

Scene_Battle.prototype.updateTpbOrderWindowVisibility = function () {
    this._tpbOrderWindow.visible = true;
}
