Simple Masonry
==============

jQuery plugin that manipulates a containers children into a simple and light masonry layout.

The plugin gets the immediate children and applies the masonry logic to only those elements.  From there, the width is dependant on the css given to the children of the masonry container.  For instance, if you want a 4 column masonry layout, give you child elements a '25%' width.. and so on.  This approach was taken so the columns can be dictated in css using media queries.

## Markup
```
<div class="masonry">
	<div class="child">
		...
	</div>
	...
</div>
```

## Usage
```
$('.masonry').simplemasonry()
```
