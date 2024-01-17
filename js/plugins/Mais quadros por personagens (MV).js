//=============================================================================
// Mais Quadros de Personagens
// por vm.cabello
//=============================================================================

/*:
 * @plugindesc Permite mais de 3 quadros por personagem
 * @author vm.cabello
 *
 * @help Este plugin não oferece comandos de plugin.
 *
 * Adicione [D L R U] ao nome da sua folha de personagem (com prefixo $) para especificar
 * quantos quadros em cada direção (Baixo, Esquerda, Direita, Cima).
 * Spritesheets com isso adicionado ao nome do arquivo usarão uma animação de quadros
 * em loop, ao invés da animação padrão de vai-e-vem.
 *
 * O primeiro quadro deve ser a pose inativa/parada.
 *
 * Exemplo: $Ralph [8 8 8 8].png
 *     é uma folha de personagem consistindo de 4 linhas com 8 quadros por linha.
 *     A animação irá do quadro 1 ao 8 e então começará novamente no 1.
 */

(function() {

  // Verifica se é um personagem com múltiplos quadros
  ImageManager.isMultiFrameCharacter = function(filename) {
    var frames = filename.match(/\[(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\]/);
    return frames && frames.length === 5;
  };

  // Obtém a contagem de quadros do personagem
  ImageManager.getCharacterFrameCount = function(filename) {
    var frames = filename.match(/\[(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\]/);
    if (!frames) {
      return [3, 3, 3, 3];
    } else {
      return frames.splice(1, 4);
    }
  };

  var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    _Game_CharacterBase_initMembers.call(this);
    this._isMultiFrame = false;
    this._frames = [3, 3, 3, 3];
  };

  // Obtém o padrão máximo de quadros
  var _Game_CharacterBase_maxPattern = Game_CharacterBase.prototype.maxPattern;
  Game_CharacterBase.prototype.maxPattern = function() {
    if (!this._isMultiFrame) {
      return _Game_CharacterBase_maxPattern.call(this);
    } else {
      return this._frames[(this._direction / 2) - 1];
    }
  };

  // Obtém o padrão atual de quadros
  var _Game_CharacterBase_pattern = Game_CharacterBase.prototype.pattern;
  Game_CharacterBase.prototype.pattern = function() {
    if (!this._isMultiFrame) {
      return _Game_CharacterBase_pattern.call(this);
    } else {
      return this._pattern < this._frames[this._direction / 2 - 1] ? this._pattern : 0;
    }
  };

  var _Game_CharacterBase_isOriginalPattern = Game_CharacterBase.prototype.isOriginalPattern;
  Game_CharacterBase.prototype.isOriginalPattern = function() {
    if (!this._isMultiFrame) {
      return _Game_CharacterBase_isOriginalPattern.call(this);
    } else {
      return this.pattern() === 0;
    }
  };

  // Redefine o padrão de quadros
  var _Game_CharacterBase_resetPattern = Game_CharacterBase.prototype.resetPattern;
  Game_CharacterBase.prototype.resetPattern = function() {
    if (!this._isMultiFrame) {
      _Game_CharacterBase_resetPattern.call(this);
    } else {
      this.setPattern(0);
    }
  };

  // Define a imagem do personagem
  var _Game_CharacterBase_setImage = Game_CharacterBase.prototype.setImage;
  Game_CharacterBase.prototype.setImage = function(characterName, characterIndex) {
    _Game_CharacterBase_setImage.call(this, characterName, characterIndex);
    this._isMultiFrame = ImageManager.isMultiFrameCharacter(characterName);
    this._frames = ImageManager.getCharacterFrameCount(characterName);
  };

  var _Game_CharacterBase_setTileImage = Game_CharacterBase.prototype.setTileImage;
  Game_CharacterBase.prototype.setTileImage = function(tileId) {
    _Game_CharacterBase_setTileImage.call(this, tileId);
    this._isMultiFrame = false;
    this._frames = [3, 3, 3, 3];
  };

  Game_CharacterBase.prototype.isMultiFrame = function() {
    return this._isMultiFrame;
  };

  // Obtém os quadros da direção atual
  Game_CharacterBase.prototype.getDirectionFrames = function() {
    return this._frames[this._direction / 2 - 1];
  };

  var _Game_Event_initMembers = Game_Event.prototype.initMembers;
  Game_Event.prototype.initMembers = function() {
    _Game_Event_initMembers.call(this);
    if (this._isMultiFrame) {
      this._originalPattern = 0;
    }
  };

  // Largura do padrão de quadros do personagem
  var _Sprite_Character_patternWidth = Sprite_Character.prototype.patternWidth;
  Sprite_Character.prototype.patternWidth = function() {
    if (!this._character.isMultiFrame()) {
      return _Sprite_Character_patternWidth.call(this);
    } else {
      return this.bitmap.width / this._character.getDirectionFrames();
    }
  };

})();
