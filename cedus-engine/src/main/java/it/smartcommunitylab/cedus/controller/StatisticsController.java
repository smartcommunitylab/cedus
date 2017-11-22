package it.smartcommunitylab.cedus.controller;

import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import it.smartcommunitylab.cedus.common.Utils;
import it.smartcommunitylab.cedus.exception.EntityNotFoundException;
import it.smartcommunitylab.cedus.exception.StorageException;
import it.smartcommunitylab.cedus.exception.UnauthorizedException;
import it.smartcommunitylab.cedus.model.TeachingUnit;
import it.smartcommunitylab.cedus.model.stats.RegistrationStats;
import it.smartcommunitylab.cedus.storage.RepositoryManager;

@Controller
public class StatisticsController {
	private static final transient Logger logger = LoggerFactory.getLogger(StatisticsController.class);
	
	@Autowired
	@Value("${mockup.dir}")	
	private String mockupDir;
	
	@Autowired
	@Value("${csUrl}")	
	private String csUrl;
	
	@Autowired
	@Value("${cedusToken}")	
	private String token;
	
	@Autowired
	private RepositoryManager dataManager;
	
	@RequestMapping(value = "/api/stats/registration", method = RequestMethod.GET)
	public @ResponseBody List<RegistrationStats> getRegistrationStats(
			@RequestParam(required=false) String ordine,
			@RequestParam(required=false) String tipologia,
			@RequestParam(required=false) String indirizzo,
			HttpServletRequest request) throws Exception {
		List<RegistrationStats> result = new ArrayList<RegistrationStats>();
		if(!StringUtils.isEmpty(ordine)) {
			result = getMockupStatsByOrder(ordine);
		} else if(!StringUtils.isEmpty(tipologia)) {
			result = getMockupStatsByTypology(tipologia);
		} else if(!StringUtils.isEmpty(indirizzo)) {
			result = getMockupStatsBySpecialization(indirizzo);
		}
		if(logger.isInfoEnabled()) {
			logger.info(String.format("getRegistrationStats: %s - %s - %s => %s", 
					ordine, tipologia, indirizzo, result.size()));
		}
		return result;
	}

	private List<RegistrationStats> getMockupStatsByOrder(String ordine) throws Exception {
		// data come from a json file
		String path = mockupDir + "/registration_stats_order.json";
		return getRegistrationStatsFromJson(path);
		/*
		//data come from api call
		RestTemplate restTemplate = new RestTemplate();
		//String url = "http://192.168.42.60:6010/cs-engine/api/stats/registration/";
		String url = csUrl+"/api/stats/registration/";
		url += "ordine?" + ((ordine != null) ? ordine : "");
		ResponseEntity<List<RegistrationStats>> res = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<Object>(createHeaders()), new ParameterizedTypeReference<List<RegistrationStats>>(){});
		
		return res.getBody();
		*/
	}
	
	private List<RegistrationStats> getMockupStatsByTypology(String tipologia) throws Exception {
		String path = mockupDir + "/registration_stats_typology.json";
		return getRegistrationStatsFromJson(path);
	}
	
	private List<RegistrationStats> getMockupStatsBySpecialization(String indirizzo) throws Exception {
		// data come from a local json file
		String path = mockupDir + "/registration_stats_specialization.json";
		return getRegistrationStatsFromJson(path);
		/*
		//data come from api call
		RestTemplate restTemplate = new RestTemplate();
		//String url = "http://192.168.42.60:6010/cs-engine/api/stats/registration/";
		String url = csUrl+"/api/stats/registration/";
		url += "indirizzo?" + ((indirizzo != null) ? indirizzo : "");
		ResponseEntity<List<RegistrationStats>> res = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<Object>(createHeaders()), new ParameterizedTypeReference<List<RegistrationStats>>(){});
		
		return res.getBody();
		*/
	}
	
	private List<RegistrationStats> getRegistrationStatsFromJson(String path) throws Exception {
		FileReader fileReader = new FileReader(path);
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		List<RegistrationStats> result = objectMapper.readValue(fileReader, 
				new TypeReference<List<RegistrationStats>>() {});
		return result;
	}

	@ExceptionHandler({EntityNotFoundException.class, StorageException.class})
	@ResponseStatus(value=HttpStatus.BAD_REQUEST)
	@ResponseBody
	public Map<String,String> handleEntityNotFoundError(HttpServletRequest request, Exception exception) {
		logger.error(exception.getMessage());
		return Utils.handleError(exception);
	}
	
	@ExceptionHandler(UnauthorizedException.class)
	@ResponseStatus(value=HttpStatus.FORBIDDEN)
	@ResponseBody
	public Map<String,String> handleUnauthorizedError(HttpServletRequest request, Exception exception) {
		logger.error(exception.getMessage());
		return Utils.handleError(exception);
	}
	
	@ExceptionHandler(Exception.class)
	@ResponseStatus(value=HttpStatus.INTERNAL_SERVER_ERROR)
	@ResponseBody
	public Map<String,String> handleGenericError(HttpServletRequest request, Exception exception) {
		logger.error(exception.getMessage());
		return Utils.handleError(exception);
	}
	@SuppressWarnings("serial")
	HttpHeaders createHeaders() {
		return new HttpHeaders() {
			{
				set("Authorization", "Bearer " + token);
			}
		};
	}
	
}
