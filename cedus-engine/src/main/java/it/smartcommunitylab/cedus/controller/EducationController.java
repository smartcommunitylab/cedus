package it.smartcommunitylab.cedus.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import it.smartcommunitylab.cedus.common.Utils;
import it.smartcommunitylab.cedus.exception.EntityNotFoundException;
import it.smartcommunitylab.cedus.exception.StorageException;
import it.smartcommunitylab.cedus.exception.UnauthorizedException;
import it.smartcommunitylab.cedus.manager.TUManager;
import it.smartcommunitylab.cedus.map.TownsData;
import it.smartcommunitylab.cedus.map.TownsData.SeparationType;
import it.smartcommunitylab.cedus.model.DistrictDistance;
import it.smartcommunitylab.cedus.model.EducationCover;
import it.smartcommunitylab.cedus.model.TeachingUnit;

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
	@Value("${cedusToken}")	
	private String token;		
	
	@Autowired
	private TownsData townsData;

	@Autowired
	private TUManager tuManager;

	@RequestMapping(value = "/api/cover/education", method = RequestMethod.GET)
	public @ResponseBody EducationCover getEducationCover(
			@RequestParam(required=false) String ordine,
			@RequestParam(required=false) String tipologia,
			@RequestParam(required=false) String indirizzo,
			@RequestParam(required=true) SeparationType filter,
			HttpServletRequest request) throws Exception {
		EducationCover result = new EducationCover();

		List<TeachingUnit> tuList = tuManager.getTeachingUnits(ordine, tipologia, indirizzo);
		
		Map<String, DistrictDistance> districtMap = townsData.fillDistrictMap(tuList, filter);
		result.setDistrictMap(districtMap);
		
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
	
	HttpHeaders createHeaders() {
		return new HttpHeaders() {
			{
				set("Authorization", "Bearer " + token);
			}
		};
	}		
	
//	HttpHeaders createHeaders(String bearer) {
//		return new HttpHeaders() {
//			{
//				set("Authorization", bearer);
//			}
//		};
//	}	
	
	
}
