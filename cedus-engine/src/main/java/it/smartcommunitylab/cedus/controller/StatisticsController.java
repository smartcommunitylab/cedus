package it.smartcommunitylab.cedus.controller;

import it.smartcommunitylab.cedus.common.Utils;
import it.smartcommunitylab.cedus.exception.EntityNotFoundException;
import it.smartcommunitylab.cedus.exception.StorageException;
import it.smartcommunitylab.cedus.exception.UnauthorizedException;
import it.smartcommunitylab.cedus.model.stats.RegistrationStats;
import it.smartcommunitylab.cedus.storage.RepositoryManager;

import java.io.FileReader;
import java.util.List;
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
public class StatisticsController {
	private static final transient Logger logger = LoggerFactory.getLogger(StatisticsController.class);
	
	@Autowired
	@Value("${mockup.dir}")	
	private String mockupDir;
	
	@Autowired
	private RepositoryManager dataManager;
	
	@RequestMapping(value = "/api/stats/registration", method = RequestMethod.GET)
	public @ResponseBody List<RegistrationStats> getRegistrationStats(
			@RequestParam(required=false) String ordine,
			@RequestParam(required=false) String tipologia,
			@RequestParam(required=false) String indirizzo,
			HttpServletRequest request) throws Exception {
		List<RegistrationStats> result = getMockupStats(mockupDir);
		if(logger.isInfoEnabled()) {
			logger.info(String.format("getRegistrationStats: %s - %s - %s => %s", 
					ordine, tipologia, indirizzo, result.size()));
		}
		return result;

	}

	private List<RegistrationStats> getMockupStats(String mockupDir) throws Exception {
		FileReader fileReader = new FileReader(mockupDir + "/registration_stats.json");
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
	
}
