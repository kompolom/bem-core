# keyboard

Блок предназначен для работы с клавиатурным вводом. 

## Обзор

### Элементы блока

| Элемент | Способы использования | Описание |
| --------| --------------------- | -------- |
| <a href="#elems-name">Название элемента</a> (<i>якорь на соответствующий заголовок</i>) | <code>JS</code> | Краткое описание. |

### Свойства и методы элементов блока

| Элемент| Имя | Тип или возвращаемое значение | Описание |
| -------| --- | ----------------------------- | -------- |
| <a href="#elems-codes">codes</a> | BACKSPACE | <code>{String}</code> |  |
| | TAB | <code>{String}</code> | |
| | ENTER | <code>{String}</code> | |
| | CAPS_LOCK | <code>{String}</code> | |
| | ESC | <code>{String}</code> | |
| | SPACE | <code>{String}</code> | |
| | PAGE_UP | <code>{String}</code> | |
| | PAGE_DOWN | <code>{String}</code> | |
| | END | <code>{String}</code> | |
| | HOME | <code>{String}</code> | |
| | LEFT | <code>{String}</code> | |
| | UP | <code>{String}</code> | |
| | RIGHT | <code>{String}</code> | |
| | DOWN | <code>{String}</code> | |
| | INSERT | <code>{String}</code> | |
| | DELETE | <code>{String}</code> | |

### Публичные технологии блока

Блок реализован в технологиях:

* `js`

## Подробности

<a name="elems"></a>
### Элементы блока

<a name="elems-codes"></a>
#### Элемент `codes`

Предоставляет объект, содержащий набор свойств – имен часто используемых клавиатурных кодов.

<a name="elems-codes-fields"></a>
##### Свойства и методы объекта

Тип: `{String}`.

Значениями имен (свойств объекта) являются коды клавиш. Использование осмысленных имен вместо кодов клавиш делает создаваемый код понятнее.

Например, метод `_onKeyDown` использует имена клавиш `UP` и `DOWN` при проверке поля `keyCode` объекта события:

```js
modules.define(
    'test1',
    ['i-bem__dom', 'keyboard__codes'],
    function(provide, BEMDOM, keyCodes) {

provide(BEMDOM.decl(this.name, /** @lends test1.prototype */{
    onSetMod : {
        'js': {
            inited: function() {
                this.bindTo('click', _onKeyDown(e));
            }
        }

    },
    _onKeyDown : function(e) {
        if((e.keyCode === keyCodes.UP || e.keyCode === keyCodes.DOWN) && !e.shiftKey) {
            e.preventDefault();
            this.setMod('opened');
        }
    }

}));
});
```

Доступен следующий набор свойств:

* `BACKSPACE`
* `TAB`
* `ENTER`
* `CAPS_LOCK`
* `ESC`
* `SPACE`
* `PAGE_UP`
* `PAGE_DOWN`
* `END`
* `HOME`
* `LEFT`
* `UP`
* `RIGHT`
* `DOWN`
* `INSERT`
* `DELETE`

Дополнительные примеры использования блока:

* [bem-components/common.blocks/button/button.js](https://github.com/bem/bem-components/blob/v2/common.blocks/button/button.js#L125)
* [bem-components/common.blocks/menu/menu.js](https://github.com/bem/bem-components/blob/v2/common.blocks/menu/menu.js#L97)
* [bem-components/common.blocks/select/select.js](https://github.com/bem/bem-components/blob/v2/common.blocks/select/select.js#L172)
