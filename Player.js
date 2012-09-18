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

// Load sprites
var img_standtoright = new Image();
img_standtoright.src = "standtoright.png";
var img_standtoleft = new Image();
img_standtoleft.src = "standtoleft.png";
var img_runtoright = new Image();
img_runtoright.src = "runtoright.png";
var img_runtoleft = new Image();
img_runtoleft.src = "runtoleft.png";

function Player()
{
	
	/**
	 * Private state value
	 */
	this.state = 0;	
	this.ismoving = false;
	this.onground = true;
	this.isjumping = false;
		
	/**
	 * Constructor
	 */
	this.initPlayer = function(x,y)
	{
		this.initializeAnimatedObject(img_standtoright,x, y, 1);
		return this;
	}	
			
	this.StandtoLeft = function()
	{
		this.state = 1;
		this.SetAnimation(img_standtoleft,1);
		this.ismoving = false;
		this.currentFrame = 0;
		this.xvelocity = 0;
	}
	this.StandtoRight = function()
	{
		this.state = 0;
		this.SetAnimation(img_standtoright,1);
		this.ismoving = false;
		this.currentFrame = 0;
		this.xvelocity = 0;
	}	
	this.RuntoLeft = function()
	{
		this.state = 3;
		this.SetAnimation(img_runtoleft,11);
		this.ismoving = true;
		this.xvelocity = -3; 
		if (this.x<0) this.x =0;
	}
	this.RuntoRight = function()
	{
		this.state = 2;
		this.SetAnimation(img_runtoright,11);
		this.ismoving = true;
		this.xvelocity = 3; 
		if (this.x>(canvas.width - this.frameWidth)) this.x = (canvas.width - this.frameWidth);
	}	
	this.Stop = function()
	{
		if (this.ismoving)
		{
			if (this.state == 2)
				this.StandtoRight();
			if (this.state == 3)
				this.StandtoLeft();				
		}
	}
	
}
Player.prototype = new AnimatedObject;