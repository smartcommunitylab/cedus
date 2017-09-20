package it.smartcommunitylab.cedus.controller;

import it.smartcommunitylab.cedus.common.Utils;
import it.smartcommunitylab.cedus.exception.EntityNotFoundException;
import it.smartcommunitylab.cedus.exception.StorageException;
import it.smartcommunitylab.cedus.exception.UnauthorizedException;
import it.smartcommunitylab.cedus.model.EducationCover;
import it.smartcommunitylab.cedus.storage.RepositoryManager;

import java.io.FileReader;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class EducationController {
	private static final transient Logger logger = LoggerFactory.getLogger(EducationController.class);
	
	@Autowired
	@Value("${mockup.dir}")	
	private String mockupDir;
	
	@Autowired
	private RepositoryManager dataManager;
	
	@RequestMapping(value = "/api/cover/education", method = RequestMethod.GET)
	public @ResponseBody EducationCover getEducationCover(
			@RequestParam(required=false) String ordine,
			@RequestParam(required=false) String tipologia,
			@RequestParam(required=false) String indirizzo,
			HttpServletRequest request) throws Exception {
		EducationCover result = new EducationCover();
		if(Utils.isNotEmpty(ordine)) {
			result = getMockupStatsByOrder(ordine);
		} else if(Utils.isNotEmpty(tipologia)) {
			result = getMockupStatsByTypology(tipologia);
		} else if(Utils.isNotEmpty(indirizzo)) {
			result = getMockupStatsBySpecialization(indirizzo);
		}
		if(logger.isInfoEnabled()) {
			logger.info(String.format("getEducationCover: %s - %s - %s => %s", 
					ordine, tipologia, indirizzo, result.getTuList().size()));
		}
		return result;
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
	
}
