package it.smartcommunitylab.cedus.common;

import java.util.HashMap;
import java.util.Map;

public class Utils {


	public static Map<String,String> handleError(Exception exception) {
		Map<String,String> errorMap = new HashMap<String,String>();
		errorMap.put(Const.ERRORTYPE, exception.getClass().toString());
		errorMap.put(Const.ERRORMSG, exception.getMessage());
		return errorMap;
	}

}
