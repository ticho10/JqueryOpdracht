# Summary

All default settings have been thought to be the **most logic behaviour you could expect in your application**, using jQuery 
properties to dynamically find out how the functions should work at a given moment.

In other words, this is a big wrapper mixing animations display and some logic, to achieve complex HTML elements operations in
one single line.

# Features

## Fade

This function allows to perform fade in and fade out animations

![Screenshot](Gifs/Fade.gif)

#### Usage 

`$(element).FadeTrick(settings)`

#### Settings

* **duration**: animation duration (500 by default)
* **mode**: **'in'** or **'out'**, by default the plugin will check element visibility, if it's invisible the mode will be 'in', 'out' otherwise
* **disappear**: boolean value, indicates if the element should be as 'displayed: none' after fading, **only used when mode is 'out'** (false by default)

## Shake

This function allows to perform shaking animation 

![Screenshot](Gifs/Shake.gif)

#### Usage

`$(element).ShakeTrick(settings)`

#### Settings

* **times**: number of shakes to perform (6 by default), **note that the animation duration will not be altered**, since it's computed according to the shakes number
* **wrapper**: parent wrapper reference (false by default), this setting is useful when you are working on an element you want to animate, but because of
a css framework the shaking is not made as you wanted, here you can give a HTML parent on which the animation should be performed

## Blob

This function applies an effect when hovering the element, enlarging its size and shadowing it

![Screenshot](Gifs/Blob.gif)

#### Usage

`$(element).BlobTrick()`

#### Settings

There is no settings here, note that at each call, the blob class will be added if not present, **or removed if already present**

## Swap

This function allows you to switch between views using sliding fade effects

![Screenshot](Gifs/Swap.gif)

#### Usage

`$(element).SwapTrick(settings)`

#### Settings

* **callback** callback function to execute when all animations are done
* **vertical** boolean value indicating if the animation should be performed in a vertical way, false by default
* **next** reference of the next container to show, by default this can be fetched automatically using class pattern **swappable-${n}**,
with n the container number in the page sequence
* **revert** should the animation be reverted (false by default). If this option is coupled with auto-fetch, the next element selected will be the one matching with the pattern **swappable-${n-1}**
 
