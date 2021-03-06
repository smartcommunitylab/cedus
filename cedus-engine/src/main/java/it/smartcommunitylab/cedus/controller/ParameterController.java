/*******************************************************************************
 * Copyright 2015 Fondazione Bruno Kessler
 * 
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 * 
 *        http://www.apache.org/licenses/LICENSE-2.0
 * 
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 ******************************************************************************/
package it.smartcommunitylab.cedus.controller;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import it.smartcommunitylab.cedus.manager.TUManager;
import it.smartcommunitylab.cedus.model.TeachingUnit;
/**
 * @author raman
 *
 */
@Controller
public class ParameterController {

	@Autowired
	private TUManager tuManager;

	@GetMapping(value = "/api/params/ordini")
	public @ResponseBody Set<String> getOrgini() {
		return tuManager.getOrdini();
	}
	@GetMapping(value = "/api/params/indirizzi")
	public @ResponseBody Set<String> getIndirizzi() {
		return tuManager.getIndirizzi();
	}
	
	@GetMapping(value = "/api/params/tipologie")
	public @ResponseBody Set<String> getTipologie() {
		return tuManager.getTipologie();
	}
	
	
	@GetMapping(value = "/api/params/tipologieForOrdine")
	public @ResponseBody Set<String> getTipologieForOrdine(@RequestParam(required=false) String ordine) {
		return tuManager.getTipologieForOrdine(ordine);
	}
	
	@GetMapping(value = "/api/params/teachingunit/{tuId}")
	public @ResponseBody TeachingUnit getTeachingUnitWithID(@PathVariable String tuId) throws Exception {
		return tuManager.getTeachingUnitWithID(tuId);
	} 
	
}
