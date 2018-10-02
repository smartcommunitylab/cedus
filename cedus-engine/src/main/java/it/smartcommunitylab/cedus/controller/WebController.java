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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author raman
 *
 */
@Controller
public class WebController {

	@Autowired
	@Value("${aac.serverUrl}")	
	private String aacUrl;
	@Autowired
	@Value("${aac.clientId}")	
	private String clientId;
	@Autowired
	@Value("${aac.redirectUri}")	
	private String redirectUri;
	@Autowired
	@Value("${csUrl}")	
	private String csUrl;

	@RequestMapping(value="/web/stats", method=RequestMethod.GET)
	public ModelAndView getStats() {
		ModelAndView mv = new ModelAndView("stats");
		return mv;
	}
	
	@RequestMapping(value="/web/coverage", method=RequestMethod.GET)
	public ModelAndView getCoverage() {
		ModelAndView mv = new ModelAndView("coverage");
		return mv;
	}
	@RequestMapping(value="/web/student", method=RequestMethod.GET)
	public ModelAndView getStudentPage() {
		ModelAndView mv = new ModelAndView("student");
		mv.addObject("aacUrl", aacUrl);
		mv.addObject("clientId", clientId);
		mv.addObject("redirectUri", redirectUri);
		mv.addObject("apiUri", csUrl);
		return mv;
	}
	@RequestMapping(value="/web/professioni", method=RequestMethod.GET)
	public ModelAndView getJobsPage() {
		ModelAndView mv = new ModelAndView("professioni");
		mv.addObject("aacUrl", aacUrl);
		mv.addObject("clientId", clientId);
		mv.addObject("redirectUri", redirectUri);
		mv.addObject("apiUri", csUrl);
		return mv;
	}
	@RequestMapping(value="/web/professioni_search", method=RequestMethod.GET)
	public ModelAndView getJobsSearchPage() {
		ModelAndView mv = new ModelAndView("professioni_search");
		mv.addObject("aacUrl", aacUrl);
		mv.addObject("clientId", clientId);
		mv.addObject("redirectUri", redirectUri);
		mv.addObject("apiUri", csUrl);
		return mv;
	}
	@RequestMapping(value="/web/scuole", method=RequestMethod.GET)
	public ModelAndView getSchoolsPage() {
		ModelAndView mv = new ModelAndView("scuole");
		mv.addObject("aacUrl", aacUrl);
		mv.addObject("clientId", clientId);
		mv.addObject("redirectUri", redirectUri);
		mv.addObject("apiUri", csUrl);
		return mv;
	}
}
