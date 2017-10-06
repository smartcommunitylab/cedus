package it.smartcommunitylab.cedus.controller;

import java.io.FileReader;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
import com.google.common.collect.Lists;

import it.smartcommunitylab.cedus.common.Utils;
import it.smartcommunitylab.cedus.exception.EntityNotFoundException;
import it.smartcommunitylab.cedus.exception.StorageException;
import it.smartcommunitylab.cedus.exception.UnauthorizedException;
import it.smartcommunitylab.cedus.map.TownsData;
import it.smartcommunitylab.cedus.map.TownsData.SeparationType;
import it.smartcommunitylab.cedus.model.DistrictDistance;
import it.smartcommunitylab.cedus.model.EducationCover;
import it.smartcommunitylab.cedus.model.TeachingUnit;
import it.smartcommunitylab.cedus.storage.RepositoryManager;

@Controller
public class EducationController {
	private static final transient Logger logger = LoggerFactory.getLogger(EducationController.class);
	
	@Autowired
	@Value("${mockup.dir}")	
	private String mockupDir;
	
	@Autowired
	@Value("${csUrl}")	
	private String csUrl;	
	
	@Autowired
	private RepositoryManager dataManager;
	
	@Autowired
	private TownsData townsData;
	
	@RequestMapping(value = "/api/cover/education", method = RequestMethod.GET)
	public @ResponseBody EducationCover getEducationCover(
			@RequestParam(required=false) String ordine,
			@RequestParam(required=false) String tipologia,
			@RequestParam(required=false) String indirizzo,
			@RequestParam(required=true) SeparationType filter,
			HttpServletRequest request) throws Exception {
		EducationCover result = new EducationCover();

		String bearer = request.getHeader("Authorization");
		
		RestTemplate restTemplate = new RestTemplate();
		String url = csUrl + "/api/tu?";
		url += "ordine=" + ((ordine != null) ? ordine : "");
		url += "&tipologia=" + ((tipologia != null) ? tipologia : "");
		url += "&indirizzo=" + ((indirizzo != null) ? indirizzo : "");
		ResponseEntity<String> res = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<Object>(null, createHeaders(bearer)), String.class);	

		String data = res.getBody();	
		
		ObjectMapper mapper = new ObjectMapper();
		List<TeachingUnit> tuList = Lists.newArrayList();
		
		List list = mapper.readValue(data, List.class);
		for (Object o: list) {
			TeachingUnit tu = mapper.convertValue(o, TeachingUnit.class);
			tuList.add(tu);
		}
		result.setTuList(tuList);
		
		Map<String, DistrictDistance> districtMap = townsData.fillDistrictMap(tuList, filter);
		result.setDistrictMap(districtMap);
		
		return result;
	}
	
	private void completeDistances(EducationCover ec, SeparationType filter) {
		Map<String, DistrictDistance> districtMap = townsData.fillDistrictMap(ec.getTuList(), filter);
		ec.setDistrictMap(districtMap);
	}

	private EducationCover getMockupStatsByOrder(String ordine) throws Exception {
		String path = mockupDir + "/education_cover_order.json";
		return getEducationCoverStatsFromJson(path);
	}
	
	private EducationCover getMockupStatsByTypology(String tipologia) throws Exception {
		String path = mockupDir + "/education_cover_order.json";
		return getEducationCoverStatsFromJson(path);
	}
	
	private EducationCover getMockupStatsBySpecialization(String tipologia) throws Exception {
		String path = mockupDir + "/education_cover_order.json";
		return getEducationCoverStatsFromJson(path);
	}
	
	private EducationCover getEducationCoverStatsFromJson(String path) throws Exception {
		FileReader fileReader = new FileReader(path);
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		EducationCover result = objectMapper.readValue(fileReader, 
				new TypeReference<EducationCover>() {});
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
	
	HttpHeaders createHeaders(String bearer) {
		return new HttpHeaders() {
			{
				set("Authorization", bearer);
			}
		};
	}	
	
	
}
