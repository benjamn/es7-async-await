es7-async-await
===============

Transformer that converts `async` functions and `await` expressions into ECMAScript 6 generator functions and `yield` expressions.

Note that this transform is only really useful if you know you're targeting a platform that supports generator functions natively. Otherwise, you're better off using [Regenerator](https://github.com/facebook/regenerator), since it has the ability to transform `async` functions into ES5 without creating immediately-invoked `GeneratorFunction`s.
