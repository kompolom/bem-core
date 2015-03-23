# next-tick

Блок предоставляет функцию, производящую асинхронный вызов callback-функции, переданной аргументом, в следующем витке событийного цикла. 

`next-tick` – полифил, реализующий:

* симуляцию событийного цикла для старых версий браузеров;
* унифицированный интерфейс для работы с различными браузерами и `node.js`.

Функция подходит для случаев, когда нужно, чтобы callback был выполнен после того, как другие функции в рамках событийного цикла отработали. Например, чтобы убедиться что доступны данные, динамически вычислявшиеся в текущем цикле.

Принимаемые аргументы: 

* `fn` `{Function}` – функция, которую нужно вызвать в следующеь событияйном цикле. Обязательный аргумент.

Не имеет возвращаемого значения.

В блоке `popup` с модификатором `autoclosable`, `next-tick` используется, чтобы убедиться, что событие всплыло до верхнеуровневого элемента:

```js
provide(Popup.decl({ modName : 'autoclosable', modVal : true }, /** @lends popup.prototype */{
    onSetMod : {
        'visible' : {
            'true' : function() {
                this
                    // NOTE: nextTick because of event bubbling to document
                    .nextTick(function() {
                        this.bindToDoc('pointerclick', this._onDocPointerClick);
                    })
                    .__base.apply(this, arguments);
            }
        }
    },

    _onDocPointerClick : function(e) { /* ... */ }
}}));
```


## Порядок вызова callback

В рамках событийного цикла работы блок формирует очередь, добавляя каждую следующую callback функцию в ее конец. Порядок вызова callback сохраняется. Например:

```js
modules.require(['next-tick'], function(nextTick) {
var order = [];

    nextTick(function() { order.push(1); });
    nextTick(function() { order.push(2); });
    nextTick(function() { order.push(3); });
    nextTick(function() { console.log(order)); }; // should be [1, 2, 3]
});
```

## Публичные технологии блока

Блок реализован в технологиях:

* `vanilla.js`
