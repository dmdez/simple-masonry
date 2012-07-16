Simple Masonry
==============

jQuery plugin that manipulates a containers children into a simple and light masonry layout.

The plugin gets the immediate children and applies the masonry logic to only those elements.  From there, the width is dependant on the css given to the children of the masonry container.  For instance, if you want a 4 column masonry layout, give you child elements a '25%' width.. and so on.  This approach was taken so the columns and sizing can be dictated by using css and media queries.

## Markup
```
<div class="masonry">
	<div class="child child1">
		...
	</div>
	<div class="child child2">
		...
	</div>
	<div class="child child3">
		...
	</div>
	...
</div>
```

## Usage
```
$('.masonry').simplemasonry()
```
### animate=false
The simple masonry plugin re-shuffles the containers when the layout changes.  By default they shuffle without any transitions.  To enable transition effects, set `animate` to `true`.

### timeout=800
If animations are turned on, the timeout of the animation can be controlled by adjusting this value.

### easing='__Slide'
If animations are turned on, easing of the animation can be changed here.  You can either use jQuery's default easing options, or you can define your own custom easing and change the easing value to that name.

## Demo
http://dmmendez.github.com/simple-masonry/
