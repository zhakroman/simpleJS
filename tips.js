/**
 * TimeFx
 *
 * @fileoverview Usefull class for working with JS-timers.
 *
 * Copyright (c) 2015 Roman Zhak (zhak55@icloud.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
;((root, factory) => {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define( "TimeFx", [], factory );
    } else {
        // Browser globals
        root.TimeFx = factory();
    }
}(this, () => {
  // private methods
  let regexpTime = /([0-9]+)(m)?s?/i;
  let time = function time() {
    let target = arguments[0] === undefined ? 1000 : arguments[0]
     ,  type ,  number
     if (typeof target === 'number') return target;
      if (typeof target === 'string') {
       target = target.match(regexpTime);
       type = target[2];
       number = type ? +target[1] : +target[1] * 1000;
    } else number = 0;
  return number;
};

 // ES6: create $Event class 
  class $Event {
   constructor() {
     this.stack = {};
  }
  on( type, fn ) {
   !this.stack[type] && ( this.stack[type] = [] );
    this.stack[type].push(fn);
   return this;
  }
  //ES6: Define default parameters
  //ES6: Using rest params like '...args' 
  trigger( type, context = this, ...args) {
   // ES6: 'let' - block scope used
   let $ev = this.stack[type];
    if( $ev ) {
     // ES6: is used interators for ... of
     for( let fn of $ev ) fn.apply( context,  args ); 
    }
   return this; }
}

  // public class 
  class TimeFx extends $Event {
   constructor() {
     super();
       this.__timersList = {};
       this.__index = 0;
      }
    set(over, callback, type, __re) {
      if(typeof over === 'function') {
        callback = over;
        over = 1000;
       }
     let intervalID
      ,  saveIndex = __re === 0 || __re ? __re : this.__index++;
         intervalID = self['set' + (type ?
           'Timeout' : 'Interval')](callback, time(over));
         this.__timersList[saveIndex] = {
           id       : intervalID,
           target   : !!type,
           isCalling: callback,
           delay    : over,
           type     : typeof callback === 'string' 
              ? 'code' : 'function'
          }
        return saveIndex;
      }
    stop(id, drop) {
     let __this = this.__timersList[id];
      self['clear' + (__this.target ?
        'Timeout' : 'Interval')](__this.id);
       return this;
      }
     run(id) {
      if( id in this.__timersList ) {
        let __this = this.__timersList[id];
         this.set(
          __this.delay     ,
          __this.isCalling ,
          __this.target    , id
            )
       }
      return this;
    }
  }
 return TimeFx;
}));
