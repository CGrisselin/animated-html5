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
/**
 * Frames per second
 */
var FPS = 50;
/**
 * Time betweend 2 frames
 */
var REFRESH_TIME = 1/FPS;

// A handler to the canvas object
var canvas = null;
// A handler to the canvas context
var context2D = null;
// Background color
var bColor = '#FFFFFF';
//DEBUG 
var g_debug =0;

// Handler to keyboard manager
var g_Keyboard = null;

//player
var g_player = null;

// soil
var img_soil = new Image();
img_soil.src = "sol.png";

// visuals objects
var g_objects = new Array();

var img_briq = new Image();
img_briq.src = "briq.png";

// Set what happen on load
window.onload = init;

// Initial function
function init()
{
	//get the canvas object from the html page and its context
	canvas = document.getElementById('canvas');
	context2D = canvas.getContext('2d');

	var g_tmp = null;
	
	// Soil
	g_tmp = new VisualObject().initializeVisualObject(img_soil, 0, 340);
	g_tmp.SetCollideBox(0,40,600,60);
	g_tmp.solid =true;
	g_objects.push(g_tmp);
	
	// Random objects
	g_tmp = new VisualObject().initializeVisualObject(img_briq, 0, 350);
	g_tmp.SetCollideBox(0,0,40,40);
	g_objects.push(g_tmp);

	g_tmp = new VisualObject().initializeVisualObject(img_briq, 120, 350);
	g_tmp.SetCollideBox(0,0,40,40);
	g_objects.push(g_tmp);

	g_tmp = new VisualObject().initializeVisualObject(img_briq, 160, 300);
	g_tmp.SetCollideBox(0,0,40,40);
	g_objects.push(g_tmp);

	g_tmp = new VisualObject().initializeVisualObject(img_briq, 560, 350);
	g_tmp.SetCollideBox(0,0,40,40);
	g_objects.push(g_tmp);

	g_tmp = new VisualObject().initializeVisualObject(img_briq, 300, 100);
	g_tmp.SetCollideBox(0,0,40,40);
	g_objects.push(g_tmp);

	g_tmp = new VisualObject().initializeVisualObject(img_briq, 300, 320);
	g_tmp.SetCollideBox(0,0,40,40);
	g_objects.push(g_tmp);
	
	//init the keyboard manager
	new KeyboardManager().initKeyboardManager();
	//watch for keyboard events
	document.onkeydown = function(event){g_Keyboard.keyDown(event);}
	document.onkeyup = function(event){g_Keyboard.keyUp(event);}		
	
	//init the player
	g_player = new Player().initPlayer(0,0);
	g_player.y = 11 //canvas.height - g_player.image.height - 20;
	g_player.x = 300;
	g_player.SetCollideBox(3,3,g_player.image.width-3,g_player.image.height-1); 
	g_player.yvelocity = 1;
	
	//set a timer to call the draw function
	setInterval(draw, 1000 / FPS);
}

// main loop
function draw()
{
	var move = false;
	var okmove = true;
	var okjump = false;
	
	var fallspeed = 0.1;
	
	// clear the canvas context
	context2D.clearRect(0, 0, canvas.width, canvas.height);
	// Set fill color
	context2D.fillStyle = bColor;
	// Fill canvas with white
	context2D.fillRect(0, 0, canvas.width, canvas.height);

	// if falling
	if (!(g_player.onground))
	{
		g_player.yvelocity += fallspeed;
	}
	//update player movement
	if (g_player.isjumping)
	{
		if (g_player.yvelocity >= 0)
		{
			g_player.isjumping = false;
		}
	}
	
	// if not jumping
	if (!(g_player.isjumping))
	{
		// check if on ground
		g_player.nexty = g_player.y + 0.05;
		g_player.onground = false;
		for (i in g_objects) {
			if (g_player.WillCollide(g_objects[i])) {
				g_player.onground = true;
				g_player.nexty = g_player.y;
				g_player.yvelocity = 0;
			}
		}
		// if the velocity isn't a null value
		// we check if the move is possible
		if (!(g_player.yvelocity==0))
		{
			g_player.nexty = g_player.y + g_player.yvelocity;
			g_player.onground = false;
			for (i in g_objects) {
				if (g_player.WillCollide(g_objects[i])) g_player.onground = true;
			}
		}
		// in this case, the move isn't possible
		if (g_player.onground && (!(g_player.yvelocity==0))) {
			// so we search for the possible move if there is one
			g_player.onground = false;
			while (!g_player.onground)
			{
				g_player.nexty = g_player.y + 0.05;
				g_player.onground = false;
				for (i in g_objects) {
					if (g_player.WillCollide(g_objects[i])) g_player.onground = true;
				}	
				if (!g_player.onground)
				{
					g_player.y = g_player.nexty;
				}			
			}
			g_player.yvelocity = 0;	
			g_player.nexty = g_player.y;	
		}	
	}else{
		//check if the jump is possible
		g_player.nexty = g_player.y + g_player.yvelocity;
		okjump = true;
		for (i in g_objects) {
			if (g_player.WillCollide(g_objects[i])) {
				okjump = false;
			}
		}
		if (!okjump)
		{
			//search for the possible jump if there is one
			while (!okjump)
			{
				g_player.yvelocity = g_player.yvelocity + 0.05;
				g_player.nexty = g_player.y + g_player.yvelocity;
				if (!g_player.yvelocity>=0)
				{
					okjump = true;
					for (i in g_objects) {
						if (g_player.WillCollide(g_objects[i])) {
							okjump = false;
						}
					}
				}else{
					okjump = true;
					g_player.yvelocity=0;
					g_player.isjumping = false;					
				}
			}		
		}
	}
	
	g_player.ComputeNextPosition(); 	
	if (!(g_player.xvelocity == 0))
	{
		// check if the the move is possible
		for (i in g_objects) {
			if (g_player.WillCollide(g_objects[i])) okmove = false;
		}
		if (!okmove) g_player.nextx = g_player.x;
	}
	
	 
	g_player.ValidateMove();

	if (g_Keyboard.keyA) 
	{
		g_player.DrawBoundingbox = true;
		for (i in g_objects) {
			g_objects[i].DrawBoundingbox = true;
		}
	}
	if (g_Keyboard.keyZ) 
	{
		g_player.DrawBoundingbox = false;
		for (i in g_objects) {
			g_objects[i].DrawBoundingbox = false;
		}
	}
	for (i in g_objects) {
		g_objects[i].Draw(context2D);
	}
	
	// draw the player
	g_player.Draw(context2D);
	
	// keyboard inputs
	if (g_Keyboard.keyup && g_player.onground)
	{
		g_player.isjumping = true;
		g_player.onground = false;
		g_player.yvelocity = -4;
	}
	if (g_Keyboard.keyleft && (!g_Keyboard.keyright))
	{
		g_player.RuntoLeft();		
		move = true;
	}
	if ((!g_Keyboard.keyleft) && g_Keyboard.keyright)
	{
		g_player.RuntoRight();
		move = true;		
	}
	if (g_player.ismoving && (!move))
		g_player.Stop();
}

