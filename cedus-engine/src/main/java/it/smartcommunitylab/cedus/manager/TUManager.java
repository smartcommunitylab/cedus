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
package it.smartcommunitylab.cedus.manager;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import it.smartcommunitylab.cedus.map.TownsData;
import it.smartcommunitylab.cedus.model.TeachingUnit;

/**
 * Support service to manage Teaching Unit information
 * 
 * @author raman
 *
 */
@Component
public class TUManager {

	@Autowired
	@Value("${csUrl}")	
	private String csUrl;	
	
	@Autowired
	@Value("${cedusToken}")	
	private String token;		

	@Autowired
	private TownsData townsData;

	private List<TeachingUnit> tuAll = null; 
	
	private static final Logger logger = LoggerFactory.getLogger(TUManager.class);

	
	private Set<String> ordini = new HashSet<>();
	private Set<String> tipologie = new HashSet<>();
	private Set<String> indirizzi = new HashSet<>();
	
	@PostConstruct
	public void init(){
		tuAll = getTeachingUnits(null, null, null);
		if (tuAll == null) tuAll = Collections.emptyList();
		
		tuAll.forEach(tu -> {
			if (!tu.getClassifications().containsKey("ORDINE")) {
				logger.error("NO ORDINE for "+tu.getName());
			} else {
				ordini.add(tu.getClassifications().get("ORDINE").getName());
			}
			if (!tu.getClassifications().containsKey("TIPOLOGIA")) {
				logger.error("NO TIPOLOGIA for "+tu.getName());
			} else {
				tipologie.add(tu.getClassifications().get("TIPOLOGIA").getName());
			}
			if (!tu.getClassifications().containsKey("INDIRIZZO")) {
				logger.error("NO INDIRIZZO for "+tu.getName());
			} else {
				indirizzi.add(tu.getClassifications().get("INDIRIZZO").getName());
			}
		});
	}
	
	
	/**
	 * Search for {@link TeachingUnit} matching the specified classifications
	 * @param ordine
	 * @param tipologia
	 * @param indirizzo
	 * @return list of matched TU objects
	 */
	public List<TeachingUnit> getTeachingUnits(String ordine, String tipologia, String indirizzo) {
		RestTemplate restTemplate = new RestTemplate();
		String url = csUrl + "/api/tu?";
		url += "ordine=" + ((ordine != null) ? ordine : "");
		url += "&tipologia=" + ((tipologia != null) ? tipologia : "");
		url += "&indirizzo=" + ((indirizzo != null) ? indirizzo : "");
		ResponseEntity<List<TeachingUnit>> res = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<Object>(null, createHeaders()), new ParameterizedTypeReference<List<TeachingUnit>>(){});	
		List<TeachingUnit> tuList = res.getBody();
		
		townsData.fillTeachingUnitCoords(tuList);
		return tuList;
	}
	/**
	 * @return list of ORDINE classification values
	 */
	public Set<String> getOrdini() {
		return Collections.unmodifiableSet(ordini);
	}

	/**
	 * @return list of TIPOLOGIA classification values
	 */
	public Set<String> getTipologie() {
		return Collections.unmodifiableSet(tipologie);
	}

	/**
	 * @return list of INDIRIZZO classification values
	 */
	public Set<String> getIndirizzi() {
		return Collections.unmodifiableSet(indirizzi);
	}

	@SuppressWarnings("serial")
	private HttpHeaders createHeaders() {
		return new HttpHeaders() {
			{
				set("Authorization", "Bearer " + token);
			}
		};
	}		
}
