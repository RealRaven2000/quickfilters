"use strict";

/* BEGIN LICENSE BLOCK

for detail, please refer to license.txt in the root folder of this extension

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 3
of the License, or (at your option) any later version.

If you use large portions of the code please attribute to the authors
(Axel Grude)

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl-3.0.txt or get a free printed
copy by writing to:
  Free Software Foundation, Inc.,
  51 Franklin Street, Fifth Floor,
  Boston, MA 02110-1301, USA.
  
END LICENSE BLOCK 
*/


quickFilters.Preferences = {
  Prefix: "extensions.quickfilters.",
	service: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch),

	get Debug() {
		return this.getBoolPrefQF("debug");
	},

	isDebugOption: function(option) { // granular debugging
		if(!this.Debug) return false;
		try {return this.getBoolPrefQF("debug." + option);}
		catch(e) {return false;}
	},
	
	getIntPref: function(p) {
		return this.service.getIntPref(p);
	},

	setIntPref: function(p, v) {
		return this.service.setIntPref(p, v);
	},
	
	isAbortAfterCreateFilter: function() {
  	return this.getBoolPrefQF("abortAfterCreate");
	},

	getBoolPref: function(p) {
		try {
			return this.service.getBoolPref(p);
		} catch(e) {
			var s="Err:" +e;
			quickFilters.Util.logToConsole("getBoolPref("+p+") failed:\n" + s);
			return false;
		}
	},

	getBoolPrefQF: function(p) {
		return quickFilters.Preferences.getBoolPref(this.Prefix + p);
	},

	setBoolPrefQF: function(p, v) {
		return quickFilters.Preferences.setBoolPref(this.Prefix + p, v);
	},

	getIntPrefQF: function(p) {
		return quickFilters.Preferences.getIntPref(this.Prefix + p);
	},

	setIntPrefQF: function(p, v) {
		return this.setIntPref(this.Prefix + p, v);
	},

	setBoolPref: function(p, v) {
		try {
			return this.service.setBoolPref(p, v);
		} catch(e) {
			var s="Err:" +e;
			return false;
		}
	} ,

	setCharPrefQF: function(p, v) {
		return this.service.setCharPref(this.Prefix + p, v);
	} ,
	
	getCharPrefQF: function(p) {
		return this.service.getCharPref(this.Prefix + p);
	} ,

	existsCharPref: function(pref) {
		try {
			if(this.service.prefHasUserValue(pref))
				return true;
			if (this.service.getCharPref(pref))
				return true;
		}
		catch (e) {return false; }
		return false;
	},

	existsBoolPref: function(pref) {
		try {
			if(this.service.prefHasUserValue(pref))
				return true;
			if (this.service.getBoolPref(pref))
				return true;
		}
		catch (e) {return false; }
		return false;
	},
	
	get isStarAction() {
	  let pref;
		switch(quickFilters.Util.Application) {
			case 'Thunderbird':
				pref = 'actions.star';
				break;
			case 'SeaMonkey':
				pref = 'actions.flag';
				break;
		}
		return this.getBoolPrefQF(pref);
	} ,
	
  getCurrentFilterTemplate : function()
  {
    return quickFilters.Preferences.service.getCharPref("extensions.quickfilters.filters.currentTemplate");
  } ,
  
  setCurrentFilterTemplate : function(pref)
  {
    return quickFilters.Preferences.service.setCharPref("extensions.quickfilters.filters.currentTemplate", pref);
  } 
  
	

}