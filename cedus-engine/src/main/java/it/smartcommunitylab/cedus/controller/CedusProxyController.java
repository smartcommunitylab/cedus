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

import java.net.URI;
import java.net.URLDecoder;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

/**
 * @author raman
 *
 */
@Controller
public class CedusProxyController {

	private RestTemplate rest = new RestTemplate();
	
	
	@RequestMapping(value = "/api/proxy", method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody String proxyGet(
			@RequestHeader(name="fiware-service") String svc, 
			@RequestHeader(name="fiware-servicepath") String path, 
			@RequestParam String url) throws Exception 
	{
		HttpHeaders headers = new HttpHeaders();
    	headers.set("fiware-service", svc);
    	headers.set("fiware-servicepath", path);
    	headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
    	HttpEntity<String> entity = new HttpEntity<>(headers);
    	
		return rest.exchange(URI.create(URLDecoder.decode(url, "utf-8")), HttpMethod.GET, entity, String.class).getBody();
	}

}
