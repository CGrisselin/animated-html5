/*	Animated HTML5
	Copyright (C) 2012 - Christophe Grisselin		
 	
 	This JavaScript code in this page is free software: you can
    redistribute it and/or modify it under the terms of the GNU
    General Public License (GNU GPL) as published by the Free Software
    Foundation, either version 3 of the License, or (at your option)
    any later version.  The code is distributed WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

    As additional permission under GNU GPL version 3 section 7, you
    may distribute non-source (e.g., minimized or compacted) forms of
    that code without the copy of the GNU GPL normally required by
    section 4, provided you include this license notice and a URL
    through which recipients can access the Corresponding Source.
 */

function KeyboardManager()
{
	 // Key flags : incates if keys are pushed or not
	this.keyleft = false;
	this.keyright = false;
	this.keyup = false;
	this.keydown = false;
	this.keyA = false;
	this.keyZ = false;
	/**
	 * Constructor
	 */
	this.initKeyboardManager = function()
	{
		g_Keyboard = this;
	}	
		
	/**
	 * When a key is down
	 * @param {Object} event
	 */
	this.keyDown = function(event)
	{
		//DEBUG : to find key code
		//g_debug = event.keyCode;
		// left
		if (event.keyCode == 37)
			this.keyleft = true;
		// right
		if (event.keyCode == 39)
			this.keyright = true;
		// up
		if (event.keyCode == 38)
			this.keyup = true;
		// down
		if (event.keyCode == 40)
			this.keydown = true;
		// A
		if (event.keyCode == 65)
			this.keyA = true;
		// Z
		if (event.keyCode == 90)
			this.keyZ = true;
	}
	
	/**
	 * When a key is up
	 * @param {Object} event
	 */
	this.keyUp = function(event)
	{
		// left
		if (event.keyCode == 37)
			this.keyleft = false;
		// right
		if (event.keyCode == 39)
			this.keyright = false;
		// up
		if (event.keyCode == 38)
			this.keyup = false;
		// down
		if (event.keyCode == 40)
			this.keydown = false;
		// A
		if (event.keyCode == 65)
			this.keyA = false;
		// Z
		if (event.keyCode == 90)
			this.keyZ = false;
	}		
}
